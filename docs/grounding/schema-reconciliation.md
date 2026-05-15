# schema-reconciliation.md — the verdict

**The question this document answers, copied verbatim from the audit
brief:**

> Can the existing model adopt the curriculum DAG and learner-model state
> incrementally, or is part of it a rewrite?

**Short answer.**

The data model is recoverable incrementally — every schema gap the six
agents identify is either an additive extension or an expand-contract
migration on top of the live schema. **No part of the database is a
rewrite.**

The frontend is the open question. The codebase is Flutter Web, not the
Next.js the `nextjs-frontend` agent assumes. The dislike list's #1
complaint — "feels like an app put on a bigger screen" — is a textbook
description of Flutter Web's UX. That decision (keep Flutter, pivot to
Next.js, or run both) is not a schema question, but it dominates every
downstream plan and is treated as the cross-cutting verdict in §6.

This document goes domain by domain, then handles the cross-cutters.

---

## 1. Reading guide

Each domain section produces a **verdict** with one of four values:

- **Greenfield within brownfield.** The agent's schema is not yet
  expressed at all; what is needed is new tables / new columns with no
  conflict against existing data. Lowest-risk class of change.
- **Additive extension.** New fields on existing tables, new lookup
  tables, with no rewrite of existing columns. Idempotent, reversible.
- **Expand-contract.** Existing columns change shape over multiple
  migrations. New shape lands first, old shape stays until it's confirmed
  unread, then drops. Slower; touches the live read path.
- **Rewrite.** Existing data has to be discarded or transformed beyond
  recognition. Avoided wherever possible.

For each domain, the verdict is followed by **what changes**, **what
breaks if we get it wrong**, and **the migration sequence**.

---

## 2. Curriculum DAG (`bac-curriculum`)

**Verdict: additive extension. No rewrite. Two distinct gaps, one with
pure data work and one with schema work.**

### 2.1 Taxonomy depth — 3 levels vs 6 levels

The agent specifies six levels: **Filière → Matière → Unité → Chapitre →
Section → Notion**. The live schema carries three:

```
subjects   (≈ Matière)
   └── topics  (≈ Chapitre)
          └── skills  (≈ Section ∪ Notion, collapsed)
                 └── items
```

Filière is encoded by two parallel conventions: the `stream_subjects`
many-to-many table, and a code-prefix convention (`sma_*`, `pc_*`,
`svt_*`, unprefixed for SMB). Both work, but the prefix convention is
why an unprefixed skill code can't safely be reused across filières.

The two missing levels:

- **Unité** (between Matière and Chapitre). The cadre de référence
  groups chapitres into unités (e.g. "Analyse" groups limites,
  dérivation, primitives, intégrales). Today this layer is implicit —
  `topics.display_order` produces a visual grouping but no first-class
  unit object. Not load-bearing for the scheduler, but bac-curriculum
  needs it to map cleanly to the cadre de référence PDFs.
- **Notion** (below Section). The agent treats a Notion as the atomic
  examinable skill (e.g. `limite-fonction-composee`, distinct from the
  broader `calcul-de-limites`). Today the deepest atom is `skills`,
  whose granularity is closer to the agent's *Section* (a sub-chapter
  topic that bundles several notions). Roughly: today's 108 SMA skills
  correspond to perhaps 250–400 leaf notions once decomposed.

**Two viable adoption paths.** Pick one and stick with it; the choice is
a one-way door.

| Path | What it looks like | When it wins |
|---|---|---|
| **A. Compress.** Treat `skills` as the leaf and rebind "Notion" to mean "skill". Add a `units` table between subjects and topics. Stop there. | One new table (`units`), one new FK column on `topics`, optional. Curriculum content essentially untouched. Misconception + diagnostic state stays at the skill grain. | The simplest path. Defensible if a `skill` is small enough that misconceptions and SR state at skill grain actually localize a student's weakness. |
| **B. Decompose.** Add a `notions` table below `skills`, plus an `items.notion_id` FK and a `user_notion_states` analogue. Every `skills.lesson` block carries a `notion_id` tag. | Substantial content refactor — every long-form lesson section needs its blocks tagged. Migration is otherwise additive (no destructive change). | The pedagogy-auditor's diagnosis localizes better. If "calcul de limites" decomposes into 4 notions (forme indéterminée, limite à droite, etc.), a student missing only one gets routed to that one, not back to the whole skill. |

The audit cannot pick between A and B — that is a content-strategy
decision for Soufiane + bac-curriculum. The schema side is identical in
cost. The expensive part of (B) is *tagging existing content*, not
*migrating the database*.

**Recommendation.** Start with path A as the v1, but reserve the
`notions` table name and the FK shape so (B) can be added later as
another additive extension. If path (A) holds, no follow-up is needed;
if it doesn't, the path (B) migration is non-breaking. This keeps the
schema future-compatible without paying the tagging cost up front.

### 2.2 Prerequisite edges — the largest data gap

`skill_prerequisites` exists with the right shape `(skill_id,
prerequisite_skill_id)` and a CHECK that prevents self-edges. Coverage:

| Stream | Source JSON has prereqs | DB has edges |
|---|---|---|
| SMA | 89 / 108 skills | **0 edges** |
| SMB | 22 / 32 skills | **0 edges** |
| PC | 19 / 31 skills | 21 edges |
| SVT | 9 / 25 skills | 9 edges |

The PC and SVT encoders propagate prereqs; the SMA encoder
(`json_encode_sma.dart`) and whatever produced the legacy SMB seed do
not. This is the dominant cause of dislike-list §4–§5: there is no
prerequisite frontier to surface to the student because the DB doesn't
know what is prerequisite to what.

**Fix shape.** Extend `json_encode_sma.dart` (and write an equivalent
for SMB) to emit `INSERT INTO public.skill_prerequisites ... ON CONFLICT
DO NOTHING` from the source JSON's `prerequisites` array. Ship as a new
numbered migration (not by editing 012 in place). Estimated landing
volume: ~111 edges for SMA + SMB combined. Verify the DAG is acyclic
before applying — the JSON has not been validated for cycles.

**Risk if we get this wrong.** A bad edge silently routes a student to
a prerequisite that does not actually unlock the current skill. The
scheduler walks the DAG; a cycle locks the student. **Mitigation:**
acyclicity check in the encoder, before SQL emission.

### 2.3 Cadre de référence metadata + examinability

The agent requires per-entity `cadre_ref` (`in` / `out` / `partial`),
`exam_frequency`, and the developed-vs-précis distinction. None of
these are in the live schema.

**Verdict: additive.** Three new columns on the appropriate level
(probably `skills`, since the agent's *Notion* maps to today's *Skill*
under path A):

- `cadre_ref` ENUM('in', 'out', 'partial', 'unknown') DEFAULT
  'unknown'.
- `exam_frequency` NUMERIC NULL (populated later by exam-ingestion).
- `common_misconceptions` JSONB DEFAULT `'[]'` — a list of
  `{id, label_fr, label_ar, prerequisite_misconception_id?}`.

Add a `notion_summaries` table (or a `precis` JSONB column on
`skills`) for the compressed précis representation that pedagogy spine
#7 requires. The audit suggests a JSONB column to match the existing
`lesson` / `exam_paper` pattern.

**Idempotent backfill.** All three columns are nullable / default-empty;
`UPDATE ... WHERE cadre_ref = 'unknown'` is the safe write path until
the cadre de référence PDFs are parsed.

### 2.4 ID stability

The bac-curriculum agent's hard rule: "IDs are immutable once `status:
validated`." The live schema uses UUID PKs on `subjects`, `topics`,
`skills`, plus a `code` field for human readability. The UUIDs are
deterministic in the seeds
(`33333333-aaaa-...` for SMA, `33333333-cccc-...` for PC,
`33333333-dddd-...` for SVT) and stable across migrations. UUID
immutability is already the de facto pattern; no change needed beyond
documenting it.

The agent's proposed string ID scheme (`n.math.limite-fonction-composee`)
can ride on top of `skills.code` (which is already populated and
unique-per-topic). Re-keying to string IDs would be an expand-contract
operation across every FK, every JSONB tag, every analytics event —
not justified by current evidence. Keep UUID PKs; treat `code` as the
human-readable ID.

---

## 3. Per-student learner-model state (`learner-model`)

**Verdict: additive extension. The existing `user_skill_states` carries
most of the agent's required state. Two additions complete it.**

### 3.1 What already exists

`user_skill_states` carries the SRS minimum and then some:

| Agent requirement | Column |
|---|---|
| mastery / strength estimate | `mastery` (enum) + `estimated_ability` (numeric, 1–5) |
| retrievability — decays with time | `half_life_hours` + `last_reviewed_at`, decayed by `compute_strength(...)` |
| last-reviewed timestamp | `last_reviewed_at` |
| reps | `num_attempts` (and `num_correct`) |
| lapses | — (derivable as `num_attempts - num_correct - current_streak_init`, but not stored) |

This is closer to FSRS/SM-2 than the agent's "start simple" framing
requires. It is *fine*: the v1 logic doesn't have to use the
sophistication, but the data model supports it.

`user_lesson_progress.passed_keys` (mig 015) carries within-lesson
checkpoint state and is the right grain for tracking which checkpoints
inside a lesson the student has cleared. Don't conflate it with the
SR state above — it is intentionally separate.

`user_item_history` carries every answer with `user_answer` JSONB and
`is_correct` — the raw substrate for diagnosis.

### 3.2 What is missing

Two things, both additive:

1. **`lapses` column** on `user_skill_states`. Pure bookkeeping. One
   column added; the `submit-answer` edge function bumps it when an
   answer transitions a row from correct-recent to incorrect.
2. **Misconception state.** The agent's diagnosis is "student running
   misconception X on notion Y", not "student weak at notion Y". This
   needs three new pieces:
   - `common_misconceptions` JSONB on `skills` (or on the new `notions`
     table under path 2.1.B), enumerating misconception IDs with FR
     labels. Owned by `bac-curriculum`.
   - `items.distractor_misconceptions` JSONB — a map from MCQ choice
     index to misconception ID. Authored by `pedagogy-auditor`.
   - `user_misconception_states` table: `(user_id, skill_id,
     misconception_id, exhibited_count, last_exhibited_at)`. RLS like
     `user_skill_states`.

   The submit-answer edge function reads `distractor_misconceptions`
   and bumps `user_misconception_states` when a tagged distractor is
   picked. The scheduler reads it to surface "you are running
   misconception X" instead of "skill is weak".

**This unlocks dislike-list §5** (no diagnosis of what the student has
mastered, no forgetting-risk surface). The data substrate exists; what's
missing is the targeting layer.

### 3.3 Backfill plan

For existing users (assumed to exist on the live DB), the additive
columns default to safe values (`lapses = 0`,
`distractor_misconceptions = '{}'`, `user_misconception_states` empty).
No backfill required. The diagnosis quality starts at "coarse"
(correct/incorrect only) and improves as
distractor-misconception tagging lands per-skill — exactly the
incremental loop the agents specify.

### 3.4 Risk

The `learner-model` agent's hard rule "never schedule a notion over an
unmet prerequisite" is enforceable today *only for PC and SVT* because
those are the streams with prereq edges. The dominant filière (SMA, 108
skills, vast majority of MVP usage) cannot enforce the rule until §2.2
ships. **Schema is fine; the prereq backfill is the gating dependency
for §3 logic to behave correctly.**

---

## 4. Exam corpus (`exam-ingestion`)

**Verdict: greenfield-within-brownfield for the pipeline; the
destination tables already exist and accept the agent's data shape
unchanged.**

### 4.1 Destination tables map cleanly

`bac_exams` carries year, session, stream, subject, pdf_url. Matches
the agent's "Acquire and organize" stage output.

`exam_questions` carries `exam_id`, optional `skill_id`,
`question_number` + `subquestion_letter` + `part_number`, JSONB
`question` (stem, figure, item_type) and `answer` (steps[],
final_answer, grading_notes, common_mistakes, tips). This is the
agent's "structure extraction" stage output — almost field-for-field.

What's missing on the destination side:

- **`provenance` JSONB column.** The agent's hard rule "provenance
  recorded for every document". Add to `bac_exams` (and arguably
  `exam_questions` for per-question source tracking — e.g. when the
  sujet came from one PDF and the corrigé from another).
- **`extraction_confidence` numeric and `needs_review` boolean.** The
  agent's "low-confidence extractions are flagged, never emitted as
  clean". Today every row in `exam_questions` is treated as clean — the
  24 placeholder rows in mig 020 are tagged via `tags[]` but there is
  no structured confidence signal.
- **`notion_ids` UUID[] column** on `exam_questions`, replacing the
  current single `skill_id`. A real Bac question tags onto multiple
  notions; modelling it as a single FK loses information. Today's
  `skill_id` becomes the *primary* tag, an array column carries the
  rest. Or, cleanly: a join table `exam_question_notions`.

All three are additive. None breaks existing data.

### 4.2 The dual exam surface

A subtlety the agent doesn't address: there are **two distinct exam
surfaces** in the MVP:

- `bac_exams` + `exam_questions` — real past Bac papers (24 SMA + 8
  SMB + whatever exists for PC/SVT). This is the agent's primary target.
- `skills.exam_paper` (mig 029) — synthetic Bac-style papers, one per
  skill, authored by the existing encoders. 95 papers live, plus 25
  SVT in mig 038.

These do not conflict — they serve different needs (real past exams for
practice and `exam_frequency` analytics; synthetic papers for ensuring
every skill has a Bac-style practice surface). **Keep both.** The
exam-ingestion pipeline only writes to the first; the second stays
authored.

Risk: a user looking at "annales" probably wants the real past papers,
not the synthetic ones. The frontend currently appends `exam_paper` to
the long-lesson screen; the `/exams` browser reads `bac_exams`. They
are kept separate in the routing; verify that the UX copy distinguishes
them.

### 4.3 Storage bucket

No bucket exists for exam PDFs. `bac_exams.pdf_url` strings are
placeholders pointing to URLs that don't resolve. The exam-ingestion
pipeline needs a Storage bucket `exam_pdfs` (private read, service-role
write) and a URL-rewrite when populating `pdf_url`. Add in the same
migration that creates the provenance columns.

---

## 5. Cross-cutting infrastructure

### 5.1 RLS gap — sev-1, one-line fix per table

Migration 001 declares public-read policies on `subjects`,
`stream_subjects`, `topics`, `skills`, `skill_prerequisites`, `items`,
`badges` — but never calls `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
on any of them. The policies are inert. Supabase's default grants
(`anon` and `authenticated` carry SELECT/INSERT/UPDATE/DELETE on tables
in `public`) mean **any authenticated user can modify the curriculum**.

This is the `supabase-architect`'s explicit sev-1: "A table without RLS
is a defect." The fix is mechanical:

```sql
-- one numbered migration (let's call it 040)
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
-- the public-read policies already exist; they activate automatically.
-- add explicit write policies for the service_role (the seed migrations
-- run via service_role anyway, but make it explicit):
CREATE POLICY "service_role manages curriculum" ON public.subjects
  FOR ALL TO service_role USING (true) WITH CHECK (true);
-- repeat per table.
```

**Risk if rushed.** Activating RLS while the curriculum policies are
SELECT-only locks out the seed migrations themselves. The seed
migrations run as `postgres` / `service_role`, which bypasses RLS — so
they continue to work — but verify on a branch or copy first. The fix
is one migration; the test is unmissable.

**Risk if left.** Any authenticated client (including a curious student
opening DevTools) can `DELETE FROM skills;`. Treat as urgent regardless
of whether real exploitation has happened.

### 5.2 `auth.users` ↔ `public.profiles` separation — clean

Trigger `handle_new_user` on `auth.users` INSERT creates the
`profiles` row. The client (`api_service.dart`) never queries
`auth.users` — confirmed by grep. The one mention of `auth.users` in
`lib/` is a code comment in `api_service.dart:95` describing the
service-role cascade-delete flow.

**Nothing to change here.** The pattern is exactly what supabase-architect
asks for.

### 5.3 Latent bug: `get_user_weak_areas`

Migration 004 defines `get_user_weak_areas(uuid)` which references
`uss.mastery_percentage` and `uss.correct` — columns that do not exist
on `user_skill_states`. The actual columns are `mastery` (enum) and
no `correct` column (correctness lives on `user_item_history`).

The function will throw at call time. Either:

- It is dead code (not called from any edge function or client) — safe
  to keep, but useless. Drop or fix.
- It is called somewhere and is silently swallowing errors — much worse.

**Action:** grep the edge functions + Dart for `get_user_weak_areas`; if
unreferenced, drop or rewrite. If referenced, fix before any new
diagnosis logic is layered on.

### 5.4 Telemetry — schema-ready, event-empty

PostHog and Sentry SDKs are wired; the env keys are unset; nothing
emits. The learner-model agent's aggregate-improvement loop reads
telemetry; the dislike-list "perceived sluggishness" check would benefit
from real Lighthouse / Web Vitals data; the pedagogy-auditor's
"underperforming explanation" signal depends on it.

Schema impact: none. PostHog stores its own events. The work is in the
frontend — instrumenting `lesson_screen`, `long_lesson_screen`,
`session_screen`, `exam_paper_view` to fire the events the agents need.
Defer until the stack-pivot decision (§6) is taken — different stacks
have different event-emission shapes.

### 5.5 Item-type enum drift — not a defect

§4.3 of `architecture.md` covers it. The 30+ Dart enum values are
dispatch keys read from JSONB, not stored in the `item_type` enum
column. No schema action.

---

## 6. The cross-cutting verdict the audit cannot resolve alone

The whole agent architecture — and the dislike list's #1 complaint —
turns on whether the frontend stays Flutter or pivots to Next.js. The
audit cannot make this call; it can only frame it.

### 6.1 Why this is the load-bearing question

The `nextjs-frontend` agent has no codebase to act on today. Either:

- The agent is renamed `flutter-frontend` and its responsibilities are
  rewritten to match Dart conventions. The schema work continues
  unchanged.
- A Next.js codebase is created — alongside or replacing the Flutter
  build — and the agent becomes accurate.

The schema is identical under either choice. The pedagogy-auditor's
backlog is mostly identical (the requirements are pedagogical, not
frontend-stack-specific). The bac-curriculum, learner-model, and
exam-ingestion agents are unaffected.

What is affected is dislike-list **§7 + §8 + §11** — the "feels like an
app on a bigger screen / perceived sluggishness / doesn't feel modern"
cluster. The dislike list itself flags these as a single underlying
theme, and the audit confirms: this is what Flutter Web is. The
compositor draws to a `<canvas>`, not the DOM; scrolling has a custom
implementation; the first-paint bundle includes the Dart runtime
(~1.5–3 MB minified gzipped, varies by build); links into deep routes
require hydration of the entire app. This is fundamental to the
toolchain, not a tuning problem.

### 6.2 Three options, briefly

| Option | What it costs | What it buys |
|---|---|---|
| **A. Keep Flutter, tune.** Lazy-load the 33 widgets via deferred imports (already flagged but deferred), implement SSG for the marketing surface, harden the service-worker. Rename `nextjs-frontend` → `flutter-frontend`. | Weeks of tuning. The "feels like an app" complaint won't fully resolve because the compositor model is what it is. 33 widgets unchanged. | Lowest disruption. 55 k lines of Dart preserved. 33 widgets preserved. The differentiator stays intact. |
| **B. Pivot to Next.js.** Ground-up rewrite of the frontend. Schema and content survive. The 33 interactive widgets need to be re-implemented in React (or wrapped — see option C). | 3–6 months solo dev. Risk of regressing the v2 lesson reader's polish. | The dislike-list §7/§8/§11 cluster resolves at the root. SEO-able pages. Web-native feel. Matches the agents as written. |
| **C. Hybrid.** Next.js for marketing, lesson reading, exam browsing, dashboard (the *shell* — where the "app on a bigger screen" complaint lands). Flutter Web for interactive practice sessions only (the *differentiator* — where the 33 widgets live), embedded as an iframe or via Flutter's `addEntrypointModuleLoader`. | More architectural complexity. Two builds, two state stores, a sync boundary. But avoids re-implementing 33 widgets. | Resolves the dislike list's shell-level complaints (the bulk of #7/#8/#11) without throwing away the widgets that are the actual product moat. |

Option A is the cheapest and the most likely to leave the user's #1
complaint unresolved. Option C is engineering-heavy but is the only path
that addresses #1 without paying the widget rewrite cost. Option B is
the cleanest but the most expensive.

**The audit's recommendation is to take this decision explicitly,
before any of the six agents writes a line of code.** The risk of not
deciding is that work proceeds on either side of the boundary and the
choice gets made by default — usually the most expensive way.

### 6.3 What the audit can do regardless

Three threads of work are stack-agnostic and can begin immediately:

1. The SMA + SMB prerequisite backfill (§2.2). Pure data, pure
   migration, no frontend involvement.
2. The RLS enablement (§5.1). One migration, defends the data.
3. The misconception schema (§2.3 + §3.2). Two new columns / one new
   table. Tagging the content can begin without the frontend rendering
   any of it yet.

These three improve the data foundation for any stack choice. Run them
first.

---

## 7. Migration discipline — gaps to close

The MVP follows part of the supabase-architect's hard rules and skips
others.

| Rule | Status |
|---|---|
| Idempotent migrations | ✓ Uniformly. ON CONFLICT, IF NOT EXISTS, DROP POLICY ahead of CREATE. |
| Append-only ordering | ✓ Gaps at 019 and 035 are intentional, not corrupt. |
| Down migrations | **✗ Missing.** Not a single migration ships a `DOWN` block. |
| Expand-contract for in-place changes | **Partial.** New columns are added cleanly; no rename-in-place was observed. But seed encoders rewrite migration files instead of writing new ones, which is the same anti-pattern at the encoder layer. |
| Tested on a branch / copy before prod | **Unknown.** No mention of Supabase branching in the deploy runbook. `PROJECT_STATUS.md` describes pushing directly via CLI. |
| Backfill plan for new NOT NULL columns | ✓ The recent migrations use nullable columns with defaults. No NOT NULL on a populated table was attempted. |
| RLS in the creating migration | **✗ Defect.** §5.1. |
| Validated IDs are stable FKs | ✓ UUID PKs are deterministic and stable across migrations. |

The two failing rules — down migrations and a tested-on-branch
workflow — are infrastructure changes, not schema changes. Address them
before the first non-additive migration ships. Until they are in place,
every new migration carries higher risk than it should.

---

## 8. Migration sequencing — what blocks what

Diagram-style ordering. Items at the same indent level can run in
parallel; deeper indents depend on their parent.

```
P0. Infra
  • Enable RLS on subjects/topics/skills/items/badges/stream_subjects/
    skill_prerequisites (one migration, ~10 ALTER TABLE statements).
  • Establish a Supabase branch + copy-of-prod workflow for migration
    testing. Until this is done, no expand-contract migration ships.
  • Drop or fix get_user_weak_areas (latent bug in 004).

P1. Data backfill (no schema change)
  • SMA + SMB prerequisite edges, emitted by extending the encoders.
    Acyclicity check before SQL emission.
  • One migration per stream, idempotent inserts.

P2. Curriculum schema additions (additive)
  • units table (between subjects and topics).
  • cadre_ref / exam_frequency / common_misconceptions columns on
    skills.
  • Optional notions table (path 2.1.B) — feature-flag, not blocking.

P3. Learner-model schema additions (additive)
  • lapses column on user_skill_states.
  • distractor_misconceptions JSONB column on items.
  • user_misconception_states table with RLS.

P4. Exam corpus extensions (additive)
  • provenance, extraction_confidence, needs_review columns on
    bac_exams + exam_questions.
  • Either notion_ids[] column on exam_questions OR an
    exam_question_notions join table (one-way decision).
  • exam_pdfs storage bucket with policies.

P5. Logic / runtime (frontend + edge fns)
  • Submit-answer reads distractor_misconceptions, writes
    user_misconception_states.
  • Scheduler edge function (or its first version) walks the DAG,
    consumes prereq + retrievability + exam_frequency, returns "what
    to study today".
  • Telemetry events for readiness pass rates / stalls / explanation
    success rates. Provision PostHog if it isn't.

P6. UI (gated on §6 decision)
  • Whatever the chosen stack is, render the scheduler output,
    weakness map, "back to basics" surface, two-representation
    toggle, diagram-construction interactions for SVT, etc.
```

P0–P4 are stack-agnostic and ~6 migrations of work. P5 touches edge
functions and is partially stack-agnostic (the edge function in Deno
either way). P6 is the entire frontend; cost and timeline depend on §6.

---

## 9. Hard "no" — things the audit explicitly rejects

For the avoidance of doubt, the following are *not* changes the audit
endorses, even though some of them might surface as plausible
suggestions later:

- **A full schema rewrite to mirror the 6-level taxonomy verbatim.** The
  3-level taxonomy serves; extending it is cheaper and lower-risk than
  replacing it.
- **Renaming `skills` to `notions` in place.** Every downstream FK,
  JSONB tag, edge function, RPC, and frontend query would have to
  follow. Use `code` for human ID; keep UUID for stability; rename via
  comment, not via DDL.
- **Dropping `skills.lesson` v1 cards before SMB content migrates to
  v2.** v1 is still rendering for ~32 SMB chapters; the dispatcher in
  `lesson_screen.dart` decides per row. Remove v1 only after every SMB
  skill has v2 content authored.
- **Merging `skills.exam_paper` (synthetic) into `bac_exams +
  exam_questions` (real).** They model different things (practice vs
  real Bac corpus); merging loses the distinction the product depends
  on.
- **Editing existing migrations in place rather than appending new
  ones.** Including the seed encoders' habit of regenerating the
  migration file. Every change ships as a new numbered migration. The
  encoders should emit *additive patch* migrations when re-run on top of
  prod, not full-replace migrations.

---

## 10. Open questions for the human

The schema verdict above is robust under most plausible choices. The
following decisions, however, gate concrete next steps and the audit
cannot make them alone:

1. **The frontend stack (§6).** Keep Flutter, pivot to Next.js, or
   hybrid? This is the dominant decision and should be made before any
   P5 / P6 work begins.
2. **Notion granularity (§2.1).** Path A (compress: skill = notion) or
   path B (decompose: notions under skills)? The schema reserves space
   for B either way, but the content-tagging cost differs by an order
   of magnitude.
3. **Notion ID scheme.** Keep UUID-as-PK with `code` for human ID, or
   add a string ID layer (`n.math.limite-fonction-composee`)? The audit
   recommends the former.
4. **Live-data assumption confirmation.** Are there real students on
   `bacapp.vercel.app` today, or only test accounts? The supabase-
   architect's caution stands either way, but the actual answer changes
   the urgency on §5.1 (RLS) from "very high" to "absolute".
5. **Exam-corpus year window.** How far back into past Bac papers does
   the corpus go? The exam-ingestion agent's open TODO; affects neither
   schema nor verdict, but affects the ingestion pipeline shape.
6. **Migration workflow.** Is Supabase branching available on the
   current plan? If not, how is a copy-of-prod test environment
   established before the first non-additive migration runs?

Answers to (1) and (2) shape the next sprint. Answers to (3)–(6) shape
operational discipline.

---

## 11. Bottom line

**The data model is incrementally adoptable.** Six additive migrations
plus one RLS-enablement migration get the schema to the state the agents
need. Real-data backfill (SMA + SMB prereq edges) is one focused
encoder change. The misconception layer is additive. The exam corpus
shape already exists.

**The frontend question is not a schema question.** Pretending
otherwise is the single biggest risk to the plan. The dislike list's
#1 complaint, the dormant `nextjs-frontend` agent, and the 33
interactive widgets that are the product's actual moat all converge on
the same call: keep Flutter, replace it, or run both — pick one.

**Order of operations:**

1. Make the §6 frontend call.
2. Land the RLS migration (one day's work).
3. Land the SMA + SMB prerequisite backfill (one to two days).
4. Add the misconception schema (two to three days, including
   updating one edge function).
5. Begin tagging notions / misconceptions per the bac-curriculum and
   pedagogy-auditor backlogs, one vertical slice at a time.

Everything in `known-issues.md` slots into this sequence with severity
scoring.
