# Re-establishment State Report

**Branch:** `reestablish-state`
**Date:** 2026-06-22
**Author:** automated re-establishment audit (read-and-report pass)
**Mandate:** reconstruct the true current state after an extended dormancy,
reconcile it against the documented state, surface all drift. **No
production changes, no migrations run, no merges, no deployments, no edits
to the grounding docs.** Decisions are surfaced, not resolved.

---

## Executive summary

The project is **dormant but internally consistent**, parked mid-way
through a clean, well-documented body of work. The last production-touching
commit is `111b7f7` on `main` (2026-05-18) — the submit-answer misconception
write path + edge-function assurance mechanism (ADR 0013). Everything the
misconception **foundation** needed shipped to production: RLS was closed
(mig 040), the SMA/SMB prerequisite DAG was backfilled (mig 041–042), the
misconception schema landed (mig 043–044), the encoder ran and produced the
first content + items (mig 045–046), and the write-path RPC + edge function
went live (mig 047). All of migrations 040–047 are on `main`, each with a
`feat` commit, and the ADRs claim post-push production verification for them.

What is parked is **slice 2 proper** — the second misconception vertical
slice (`sma_limit_ops`). It exists only as branch-local preparatory work:
JSON drafts, design docs, audits, and an agent (pr-reviewer). It produced
**zero production changes**. Migration 048 (the slice-2 misconception
migration) was never authored — it is a deliberate hard-stop, documented in
`backend/seed/misconceptions/_slice_2_skill_choice.md`. The encoder never
ran for slice 2. The `slice-2-prep` integration branch is a clean linear
descendant of `main` (8 unmerged commits, no divergence), with four
single-commit sub-branches forked off it, none merged.

The grounding docs (`docs/grounding/architecture.md`,
`schema-reconciliation.md`, `known-issues.md`) are **materially stale**:
they were written during the original reconciliation audit and predate
migrations 040–047. Their three top-priority findings — RLS, prereq
backfill, misconception schema — have all since landed, but the docs still
describe them as open. Proposed-reconciliation notes for each are filed
alongside this report; the grounding docs themselves are left untouched per
mandate.

The single most important caveat: **production sync cannot be verified in
this read-only pass.** There is hard precedent for prod drifting from the
migration history — migration 041 exists specifically to recover **73
out-of-band prerequisite edges** that were in prod but not in any migration
file (the "73-edge finding"). That class of drift can only be ruled out by
a supervised `supabase migration list` / `schema_migrations` diff, which
must happen before migration 048 ever ships.

---

# Part 1 — Repository state inventory

## 1.1 File tree (excluding node_modules, build artifacts, .git)

418 tracked files. Directory-level map (file counts in parentheses):

```
F:\APP
├── ARCHITECTURE.md, CHANGELOG.md, CONTRIBUTING.md, GO_LIVE.md,
│   HANDOFF.md, PROJECT_STATUS.md (972 lines), README.md   ← root docs
├── slice-2-prep-report.md            ← prior batch report (tracked, root)
├── .github/workflows/                ← ci.yml
├── .audit-logs/                      ← branch-test + edge-smoke run logs (22 files)
├── .claude/Agents/ (7)               ← agent kit — see §1.4
├── admin/exam_importer/              ← one index.html, exploratory
├── backend/
│   ├── seed/ (129)                   ← 20 Dart/Python encoders + JSON sources + generated
│   │   └── misconceptions/           ← sma_limit_calc.json, sma_limit_ops.json, _slice_2_skill_choice.md
│   ├── supabase/
│   │   ├── migrations/ (45 + 1 helper) ← see §1.2
│   │   ├── functions/ (9 files, 5 fns + _shared) ← see Part 2
│   │   └── config.toml
│   └── setup-database.ps1
├── curriculum/                       ← EMPTY (untracked, 0 files) — see §1.6
├── docs/
│   ├── architecture.md               ← (older, separate from grounding)
│   ├── architecture/agent-workflow-v2.mermaid
│   ├── content-guide.md, quiz-demo.html
│   ├── decisions/ (12)               ← ADRs 0003–0014 — see §1.3
│   └── grounding/ (4)                ← architecture.md, schema-reconciliation.md,
│                                        known-issues.md, dislike-list.md
├── mobile/bac_app/ (178)             ← Flutter Web app, 152 .dart files, ~55k lines
├── mockups/ (6)                      ← historical static HTML, not wired
├── scripts/                          ← branch-test.ps1, edge-function-smoke-test.ps1
└── shared/                           ← skill_map_*.json ×4, validate_skill_map.dart, types/

UNTRACKED (working tree):
├── sma_stems.json                    ← see Part 4 §4.3
└── supabase/.temp/                   ← Supabase CLI local state — see Part 3
```

Three architecture-named documents coexist: root `ARCHITECTURE.md`,
`docs/architecture.md`, and `docs/grounding/architecture.md`. The
authoritative current-state one is the grounding copy; the root and
`docs/` copies are older. This redundancy is itself a documentation hazard.

## 1.2 Migration inventory

Location: `backend/supabase/migrations/`. **45 numbered files** (001–047
with two gaps) plus one helper. Append-only; uniformly idempotent
(`ON CONFLICT`, `IF NOT EXISTS`, `DROP POLICY` before `CREATE`).

| #   | File | One-line summary |
|-----|------|------------------|
| 001 | initial_schema | Core schema: profiles, user_skill_states, items, skills, topics, subjects, RLS on user tables, triggers, item_type enum |
| 002 | bac_exams | Exam corpus: bac_exams, exam_questions, user_exam_progress/favorites |
| 003 | add_interactive_item_types | Appends graph/simulate/dragPoint/adjustSlider to item_type enum |
| 004 | exam_analytics_and_sync | Bookmarks, offline answers, `get_user_weak_areas` RPC (**latent bug — see Part 2**) |
| 005 | rpc_functions | increment_xp, upsert_daily_activity, add_session_minutes, compute_strength, etc. |
| 006 | daily_quests | daily_quests table + quest RPCs |
| 007 | lesson_column | Adds `skills.lesson` JSONB |
| 008 | expanded_lessons | v1 lesson card content (129 KB) |
| 009 | items_math | ~299 math item inserts (245 KB) |
| 010 | items_physics_svt | ~288 physics + SVT item inserts (271 KB) |
| 011 | lesson_visual_widgets | Patches widgetType onto v1 first cards |
| 012 | seed_sma_skills_and_lessons | 108 SMA skills (prefixed codes) + lessons via json_encode_sma.dart |
| 013 | long_lessons_sma | v2 long-form SMA lessons |
| 014 | long_lessons_sma_complete | v2 SMA lessons completed (167 KB) |
| 015 | user_lesson_progress | user_lesson_progress.passed_keys checkpoint state |
| 016 | storage_avatars | `avatars` storage bucket + policies |
| 017 | long_lessons_smb | v2 SMB long-form lessons |
| 018 | items_sma_specific | 129 SMA-specific items (UUID range `…-aaaa-0000-…`) |
| **019** | — | **GAP — intentional** (reserved for SMB items not needed) |
| 020 | smb_annales | 8 SMB exam papers + 24 placeholder questions |
| 021 | exam_questions_rich | 80 SMB exam questions |
| 022 | exam_questions_sma_rich | 80 SMA exam questions |
| 023 | exam_solutions_smb_expanded | Expands SMB solutions |
| 024 | exam_solutions_sma_expanded | Expands SMA solutions |
| 025 | lessons_sma_expanded_solutions | SMA lesson solution expansion |
| 026 | lessons_smb_expanded_solutions | SMB lesson solution expansion |
| 027 | items_sma_expanded | UPDATE: expands 129 SMA item explanations ~5× |
| 028 | lessons_sma_expanded_solutions | Further SMA lesson expansion |
| 029 | exam_paper_column | Adds `skills.exam_paper` JSONB (synthetic Bac papers) |
| 030 | exam_papers_sma | SMA synthetic exam papers (220 KB) |
| 031 | exam_papers_smb | SMB synthetic exam papers |
| 032 | seed_pc_skills | 28 PC skills + 21 prereq edges |
| 033 | long_lessons_pc | v2 PC lessons |
| 034 | exam_papers_pc | PC synthetic exam papers |
| **035** | — | **GAP — intentional** (reserved for PC items not yet authored) |
| 036 | seed_svt_skills | 25 SVT skills + 9 prereq edges |
| 037 | long_lessons_svt | v2 SVT lessons |
| 038 | exam_papers_svt | 25 SVT synthetic exam papers |
| 039 | items_svt | ~200 SVT item inserts |
| 040 | enable_rls_curriculum_tables | **Closes the RLS sev-1**: ENABLE RLS on the 7 curriculum tables (ADR-grounded; schema-reconciliation §5.1) |
| 041 | recover_smb_humanities_prereqs | **Recovers 73 out-of-band SMB+humanities prereq edges** into versioned history (ADR 0003 — the "73-edge finding") |
| 042 | seed_sma_prereqs | SMA prerequisite edges (closes E-1) via extended json_encode_sma.dart (ADR 0004) |
| 043 | misconception_schema | Adds `skills.common_misconceptions`, `items.distractor_misconceptions`, `user_misconception_states` table + RLS (ADR 0007) |
| 044 | misconception_entry_shape | Promotes `distinguishing_mcq_stem` to a structured DB field (ADR 0009) |
| 045 | misconceptions_sma_limit_calc | First content migration: misconceptions for sma_limit_calc via json_encode_misconceptions.dart (ADR 0010) |
| 046 | items_sma_limit_calc_misconception_driven | 4 misconception-driven MCQ items on sma_limit_calc, UUID range `…-aaaa-0001-…` (ADR 0011/0012) |
| 047 | rpc_record_misconception_exhibited | `record_misconception_exhibited` RPC for the submit-answer write path (ADR 0013) |
| — | `_apply_002_to_006_idempotent.sql` | Helper, not a numbered migration (remediation re-apply of 002–006) |

**Numbering gaps:** 019 and 035 only. Both are documented as **intentional**
(architecture.md §4.1; schema-reconciliation.md §7). No corruption. **There
is no migration 048** — confirmed deliberate (Part 4 §4.1).

## 1.3 ADR inventory

Location: `docs/decisions/`. 12 files, **0003 → 0014**.

| ADR | Title | Status | One-line | Forward-refs |
|-----|-------|--------|----------|--------------|
| 0003 | Out-of-band prerequisites recovery + new rule | Accepted 2026-05-15 | The 73-edge recovery (mig 041); adds a provenance rule | — |
| 0004 | SMA prereq backfill + encoder acyclicity check | Accepted 2026-05-15 | Extends encoder to emit SMA edges (mig 042) | — |
| 0005 | Branch-test workflow (Path A: 2nd Supabase project) | Accepted 2026-05-15, amended 05-16 | Establishes the staging branch-test harness (`scripts/branch-test.ps1`) | — |
| 0006 | SMB prereq reconciliation | Accepted 2026-05-15 | JSON aligned; no migration needed | flags "a future ADR" for unversioned items |
| 0007 | Misconception schema (Stage 4) | Accepted 2026-05-15 | 3-agent joint design → mig 043 | "next ADR-tracked" for branch-test additions |
| 0008 | Misconception authoring conventions | Accepted 2026-05-16 | Misconception ID format + JSON file shape; supersedes 0007's authoring brief | — |
| 0009 | Misconception schema amendment + cut audit | Accepted 2026-05-16 | distinguishing_mcq_stem → DB field (mig 044); 2 cuts | "forthcoming" double-application investigation |
| 0010 | Misconception encoder + mig 045 | Accepted 2026-05-16 | Dart encoder; first content-shape migration | "deferred" pedagogy-auditor forward request |
| 0011 | Distractor tagging strategy (author new) | Accepted 2026-05-18 | Path B; the FK-semantic / dual-bank surprise | "a future ADR specifies the shape" |
| 0012 | Misconception items on sma_limit_calc | Accepted 2026-05-18 | The 4 items (mig 046) + within-skill cross-contamination matrix | — |
| 0013 | submit-answer write path + edge-fn assurance | Accepted 2026-05-18 | RPC (mig 047) + edge function + smoke test; **prod-deployed** | "a future ADR may add a corrective migration" |
| 0014 | pr-reviewer agent | **DRAFT** 2026-05-23 | Mechanical PR-review agent; trust-building period not started | **cites "ADR 0015 (forthcoming)" ×4** |

**ADR 0001 / 0002 absent** — the sequence starts at 0003. Almost certainly
because the foundational decisions were captured as the grounding-doc audit
rather than as numbered ADRs (the ADR practice begins with the prereq-recovery
work). **Flag for confirmation**, not a defect.

**"Forthcoming" forward-references:**
- **ADR 0015 (across-skill cross-contamination rule)** — referenced as
  forthcoming by ADR 0014, `pedagogy-auditor.md`, `pr-reviewer.md`, and
  `sma_limit_ops.json`. **Intentionally not yet written.** Commit `b9262bb`
  states explicitly: "ADR 0015 itself is not written in this commit — it
  lands when slice 2 ships." This is a *deliberate deferral*, **not drift**.
  The `b9262bb` commit only renumbered the citations from "ADR 0014
  (forthcoming)" to "ADR 0015 (forthcoming)" because the pr-reviewer agent
  claimed the 0014 slot.
- **The pr-reviewer trust-building audit ADR** (ADR 0014 §Decision C step 3)
  — forthcoming, will be the next free number after the trust-building
  PRs run. Not started (no PRs; no `origin` remote).
- ADR 0006 / 0007 / 0009 / 0010 / 0011 / 0013 each gesture at a "future ADR"
  for smaller deferred items; none are load-bearing gaps.

## 1.4 Agent roster

Location: `.claude/Agents/` (note: capital **A**). 7 files. All are
registered/loadable agent types; only one is non-active.

| Agent | Status | One-line purpose |
|-------|--------|------------------|
| bac-curriculum | **Active** | Domain authority on the Moroccan 2ème Bac curriculum (cadre de référence) |
| exam-ingestion | **Active** | Turns official exam PDFs into structured, queryable data |
| flutter-widgets | **Active** | Owns the Flutter Web interactive practice surface (the 33 widgets) |
| learner-model | **Active** | Mastery estimation, scheduling, "what to study today" |
| pedagogy-auditor | **Active** | Pedagogical-quality authority; scored content backlog |
| supabase-architect | **Active** | Owns schema, migrations, RLS, storage, auth |
| **pr-reviewer** | **DRAFTED — NOT ACTIVE** | Mechanical PR review; informational-only until a trust-building audit ADR promotes it (ADR 0014 Decision C). The file's own "Trust status" header confirms this. |

**Roster drift — a `nextjs-frontend` ghost.** Four agent files
(`flutter-widgets`, `learner-model`, `pedagogy-auditor`,
`supabase-architect`) and all four grounding docs reference a
**`nextjs-frontend`** agent that **does not exist as a file** in
`.claude/Agents/`. `flutter-widgets` describes itself as co-owning "the
shell ↔ iframe boundary with `nextjs-frontend`, who owns the shell side."
This implies the §6 stack question was effectively resolved toward the
**hybrid** model (Next.js shell + Flutter iframe), the `flutter-widgets`
agent was created for the Flutter side, but the `nextjs-frontend` agent was
never authored (or was removed). See Part 2 §2.4 and Part 4 for why this is
the second-most-load-bearing open question.

## 1.5 Branch inventory

`HEAD` is on **`reestablish-state`** (created for this audit off
`slice-2-prep`). `git merge-base main slice-2-prep` == `main` HEAD, so
**`slice-2-prep` is a clean linear descendant of `main`** — no divergence,
no rebase needed. **No `origin` remote is configured**; every branch is
local-only.

| Branch | HEAD | Rel. to main | Unmerged work |
|--------|------|--------------|---------------|
| `main` | 111b7f7 (2026-05-18) | — | The production line. ADR 0013 work (submit-answer) is the tip. |
| `slice-2-prep` | b9262bb (2026-05-23) | +8 commits | The slice-2 integration branch. All 8 commits unmerged → main. |
| `reestablish-state` | b9262bb + this report | = slice-2-prep | This audit. |
| `slice-2-prep--architecture-5.5-cleanup` | 03671f3 | +1 over slice-2-prep | **Task 5** — §5.5 three-shape rewrite of grounding/architecture.md. **Stranded** (see Part 2 §2.4). |
| `slice-2-prep--migration-049-design` | bcdb459 | +1 over slice-2-prep | **Task 4** — `docs/designs/migration-049-…md`. **Invalidated** by b38011b's M2 stem change (Part 4 §4.1). |
| `slice-2-prep--sma-asymptotes-draft` | ac1128b | +1 over slice-2-prep | **Task 2** — slice-3 prep: sma_asymptotes misconceptions draft. |
| `slice-2-prep--sma-limit-calc-dual-tagging-audit` | f9450f8 | +1 over slice-2-prep | **Task 3** — `docs/audits/sma-limit-calc-items-dual-tagging.md` (the dual-tag/co-attribution audit). |

The 8 commits on `slice-2-prep` beyond `main` (oldest→newest): `5c02602`,
`b62a59e`, `4c51b1c`, `4424b9f` (the prior batch report), `b38011b`
(cross-contamination rule + M2 stem replacement), `246d3ee` (pr-reviewer +
ADR 0014 draft), `c550a67` (pr-reviewer refine), `b9262bb` (ADR-0015
renumber). The first four are the "5-task batch" documented in
`slice-2-prep-report.md`; the last four are a **second wave** (pr-reviewer
agent + cross-contamination hardening) that the prior report does **not**
cover.

`docs/designs/` and `docs/audits/` **do not exist on the mainline** — they
live only on their respective sub-branches. A reader on
`slice-2-prep`/`reestablish-state` sees the *report's description* of Tasks
3 and 4 but not the artifacts themselves.

## 1.6 Other observations

- `curriculum/` is an **empty directory** (0 files; untracked, hence absent
  from `git status`). The `bac-curriculum` agent specifies it as canonical;
  it has never been populated. Consistent with grounding/architecture.md §2.
- `.audit-logs/` holds **20 branch-test logs** (2026-05-15 → 05-18) and **2
  edge-smoke logs** (2026-05-18) — evidence the ADR 0005 branch-test and ADR
  0013 smoke-test harnesses were genuinely exercised. No logs after
  2026-05-18: consistent with the dormancy onset. `.audit-logs/pr-reviews/`
  (where ADR 0014 §2 routes pr-reviewer reports) **does not exist** —
  consistent with the agent never having run.

---

# Part 2 — Documented-vs-actual reconciliation

## 2.1 Grounding-doc staleness assessment

All three grounding docs were written during the **original reconciliation
audit** and have not been meaningfully updated since the misconception work
(mig 040–047) landed. They are **stale in the same direction**: they
describe as "open / to-do" three things that have since shipped. Full
proposed corrections are in the three companion notes; summary here.

### `docs/grounding/architecture.md` — STALE (counts + RLS + §5.5 stranded)

| Claim in doc | Actual now | Verdict |
|---|---|---|
| §2 / §4.1: "36 numbered migrations" | 45 numbered (001–047, gaps 019/035) | **Stale** |
| §2: "docs/decisions/, docs/grounding/ empty before this audit" | 12 ADRs + 4 grounding docs | **Stale** (describes pre-audit state) |
| §4.2: "live count: 17" tables | +`user_misconception_states` (mig 043) → 18 | **Stale** |
| §4.2/§4.4: curriculum tables "RLS not enabled" | RLS enabled by mig 040 | **Stale** (now fixed) |
| §4.6: RPC list | missing `record_misconception_exhibited` (mig 047) | **Stale** (incomplete) |
| §5.1: SMA 0 / SMB 0 prereq edges | SMA seeded (042), 73 SMB/humanities recovered (041) | **Stale** |
| §5.5: "two banks for **every** scientific-subject skill" | per-skill, **three shapes** (A/B/C) — Task 5 correction | **Stale & stranded** (fix lives only on unmerged `…--architecture-5.5-cleanup`) |
| §7: "misconception-tagged distractors… no stable id, no per-student state" | all landed (043–047) | **Stale** |

The §5.5 case is the subtle one: the correct three-shape framing **was
authored** (Task 5, commit `03671f3`) but on a sub-branch that was never
merged. On the mainline the doc still claims the over-generalised
"two-banks-for-every-skill" model that `_slice_2_skill_choice.md` and
b38011b both disproved.

### `docs/grounding/schema-reconciliation.md` — STALE (P0–P3 shipped)

This doc's entire "migration sequencing" (§8) lists P0 (RLS), P1 (prereq
backfill), P2/P3 (misconception schema) as forthcoming. **P0, P1, and the
schema half of P3 have all shipped** (mig 040, 041–042, 043–044). §5.1's
"let's call it 040" RLS migration is now literally migration 040. §3.2's
"what is missing" misconception state is now present. §2.2's "0 edges" is
backfilled. Still-accurate parts: the down-migration gap (§7) remains real;
the §6 frontend decision is reframed (see §2.4); the open questions in §10
are mostly still open.

### `docs/grounding/known-issues.md` — STALE (top-3 priorities closed)

The §L prioritisation table's top three actionable items are **done**:
- Priority 1 (J-2, RLS) → mig 040. **Closed.**
- Priority 2 (E-1, SMA+SMB prereq backfill) → mig 041 + 042. **Closed.**
- Priority 3 (D-1/F-1, misconception schema) → mig 043–047. **Schema closed**;
  per-slice *tagging* continues (slice 1 done, slice 2 parked).

Still-accurate: **K-1** (`get_user_weak_areas` references nonexistent
columns) — verified **still unfixed and still dead** (only in mig 004; not
referenced by any Dart or edge function). **K-2** is half-closed (branch
workflow now exists via ADR 0005; down migrations still absent).

`docs/grounding/dislike-list.md` is the **source input** (the original user
complaint list), not a state document — it does not "go stale" and needs no
reconciliation note.

## 2.2 Does the migration history reproduce the schema the ADRs claim? (ADRs 0007–0015)

**Yes, for every ADR that claims a migration shipped.** Walk:

| ADR | Claims | Migration present? | Content matches? |
|-----|--------|--------------------|--------------------|
| 0007 | mig 043 adds the misconception schema | ✅ 043 | ✅ `common_misconceptions` (skills) + `distractor_misconceptions` (items) + `user_misconception_states` table with `ENABLE ROW LEVEL SECURITY` — verified by reading the DDL |
| 0008 | authoring conventions (no migration; sets ID format + file shape) | n/a (conventions) | ✅ ID format `mc.<subject>.<skill>.<label>` used in 045 |
| 0009 | mig 044 promotes `distinguishing_mcq_stem` to a structured field | ✅ 044 | ✅ header + amendment cite ADR 0009 |
| 0010 | mig 045, encoder-generated misconception content for sma_limit_calc | ✅ 045 | ✅ "Auto-generated by json_encode_misconceptions.dart"; 30 misconception-content matches |
| 0011 | Path B (author new items, not tag existing) | (decision; realized in 046) | ✅ — |
| 0012 | mig 046: 4 misconception-driven items on sma_limit_calc | ✅ 046 | ✅ 4 items in UUID range `…-aaaa-0001-…`, distractor_misconceptions populated |
| 0013 | mig 047 RPC + submit-answer edge fn + smoke test; **prod-deployed** | ✅ 047 + `functions/submit-answer/` + `_shared/misconception_event*.ts` + `scripts/edge-function-smoke-test.ps1` | ✅ RPC `record_misconception_exhibited`; ADR's "Prod deploy" section |
| 0014 | pr-reviewer agent (Draft); no schema change | n/a (agent) | ✅ `.claude/Agents/pr-reviewer.md` present, Draft |
| 0015 | (forthcoming — across-skill cross-contamination rule) | **n/a — not yet authored, by design** | The *rule* exists in `pedagogy-auditor.md` (landed in b38011b); only the *ADR formalization* is deferred to slice-2 ship |

The misconception schema the ADRs describe **is fully reproduced** by
migrations 043–047, all of which are on `main`. No phantom schema; no ADR
claiming a migration that is absent.

## 2.3 Last live work and next intended step

- **Most recent commit:** `b9262bb` (2026-05-23 01:13, `slice-2-prep`) — the
  ADR-0015 citation renumber. Mechanically small.
- **Most recent *substantive* work:** the second wave on `slice-2-prep`
  (2026-05-23 00:19 → 01:11): `b38011b` (across-skill cross-contamination
  rule + M2 stem replacement), `246d3ee` (pr-reviewer agent + ADR 0014
  draft), `c550a67` (pr-reviewer refinement).
- **Most recent *production* work:** `111b7f7` on `main` (2026-05-18) — ADR
  0013 submit-answer write path. This is the true production tip.
- **Next intended step (per ADRs + TODO trails)** — two parallel tracks:
  1. **Workflow track:** start the pr-reviewer trust-building period (ADR
     0014 Decision C): human review of the agent file → 3–4 supervised PRs
     → audit ADR that promotes or revises it. Blocked on: no `origin`
     remote, no PRs, dormancy.
  2. **Content track (slice 2):** answer the 5 deferred design-doc questions
     → **redraft** the migration-049 design doc against the corrected M2
     stem (it is currently invalidated) → author migration 048 (encoder run
     for sma_limit_ops misconceptions) → migration 049 (items) → branch-test
     → push. Plus the deferred slice-4 dual-tag UPDATE.

## 2.4 The frontend-stack decision — moved but unrecorded

The grounding docs' single biggest open question (schema-reconciliation §6,
known-issues A-1) is the Flutter-vs-Next.js-vs-hybrid frontend call, framed
as an unresolved `human` decision. **The agent roster shows the decision has
effectively moved to the hybrid (Option C) model**: `flutter-widgets` exists
and owns "the Flutter Web interactive practice surface… the iframe contract
with the Next.js shell," explicitly co-owning "the shell ↔ iframe boundary
with `nextjs-frontend`, who owns the shell side." Yet:
- there is **no `nextjs-frontend` agent file**;
- there is **no ADR** recording the stack decision;
- the grounding docs still call it open.

This is genuine drift between the agent kit (which assumes hybrid) and the
decision record (which says undecided). It needs a human ruling — see Part 4.

---

# Part 3 — Production-state question (read-only)

## 3.1 What is verifiable read-only

- `supabase/.temp/project-ref` = **`iwoydyudjondihzzsqay`** (EU-Central),
  matching grounding/architecture.md §1. The Supabase CLI was linked to this
  project; `.temp/` also records the prod Postgres version (17.6.1.084),
  pooler URL, and gotrue/rest/storage versions — i.e. the CLI talked to prod
  at some point, but `.temp/` caches **server metadata, not applied-migration
  state**.
- The local migration history is **001–047** (Part 1 §1.2), all committed to
  `main` at or before `111b7f7`.
- The ADRs assert post-push production verification for the key migrations:
  ADR 0007 ("Verification against production (post-push)" for 043), ADR 0013
  ("Prod deploy" for 047 + the edge function), and the prereq/RLS work (ADR
  0003/0004, mig 040–042).

## 3.2 What is NOT verifiable here — production sync is UNVERIFIED

There is **no read-only way, from this clone, to confirm that prod's
`supabase_migrations.schema_migrations` matches local 001–047.** Doing so
requires `supabase migration list` or a direct query, which needs the
service token (gitignored: `.supabase_token*`) and a live connection — i.e.
a network write-path to production. That is out of scope for this read-only,
unsupervised pass, and I did not attempt it.

**Explicit flag:** production-vs-local migration sync is **unverified** and
**must be checked in a supervised session — via `supabase migration list`
against project `iwoydyudjondihzzsqay` — before any new migration (048)
ships.** Until then, assume prod *might* differ from the local history.

## 3.3 Out-of-band / untraceable-change evidence (the 73-edge pattern)

The "73-edge finding" the brief references **is real, already discovered,
and already remediated** — and it is the canonical precedent for exactly the
risk in §3.2:

- **Migration 041** (`recover_smb_humanities_prereqs`) exists specifically
  because, after migration 040, a diagnostic found **prod held 103
  `skill_prerequisites` edges while the migration files accounted for fewer**
  — ~73 SMB + humanities edges existed in production with **no migration to
  trace them to**. ADR 0003 documents the recovery; migration 041 folds
  those edges back into versioned history so the file history reproduces
  prod.

This proves prod **has** drifted from the migration history before
(out-of-band seed inserts, almost certainly from an early ungoverned
`seed_data.sql` run). The remediation closed the *known* instance. It does
**not** guarantee no *new* out-of-band change has occurred since 2026-05-18.
A fresh `schema_migrations` diff (supervised) is the only way to rule it out.
ADR 0003 also added the provenance rule meant to prevent recurrence — that
rule's effectiveness is itself unverified without a prod read.

No untracked schema/data drift is observable from the repo alone beyond the
already-recovered case. The untracked working-tree files (Part 4 §4.3) are
*local* cruft, not prod drift.

---

# Part 4 — Drift and risk report

## 4.1 Where did slice 2 actually stop?

Slice 2 (`sma_limit_ops` misconception vertical) stopped **after authoring
the input JSON, before any code-gen or production touch** — a deliberate,
documented hard stop. From `_slice_2_skill_choice.md`: *"No encoder run, no
migration 048, no production push, no function deploy."*

Concretely, slice 2 produced (all branch-local, zero prod):
- `backend/seed/misconceptions/sma_limit_ops.json` (4 misconceptions, on
  `slice-2-prep`);
- the 5-task preparatory batch (`slice-2-prep-report.md` + four sub-branches);
- a second wave: the across-skill cross-contamination **rule** (in
  `pedagogy-auditor.md`), an M2-stem replacement in the JSON, and the
  pr-reviewer agent + ADR 0014.

**Did the co-attribution / dual-tagging refinement land?** **No.** Two
distinct dual-tagging threads, neither shipped to prod:
1. **Task 3 audit** (`slice-2-prep--sma-limit-calc-dual-tagging-audit`,
   `docs/audits/…`) found Item 001 distractor D=1 should carry a **secondary
   M1 tag** (`forme-indeterminee-valeur-nulle`). The fix is a one-statement
   `UPDATE` on `public.items`, explicitly **deferred to slice 4** and **not
   written**. The audit doc itself lives only on that unmerged sub-branch.
2. **b38011b** landed an "M1 dual-tagging note" — but as *documentation* in
   the JSON / agent file, not as a migration.
So the co-attribution refinement exists only as **notes and an audit**, never
as a production change.

**Did the encoder ever run?** **Yes — for slice 1, no — for slice 2.** The
misconception encoder (`json_encode_misconceptions.dart`) ran for
`sma_limit_calc` and produced migration 045. It has **not** run for
`sma_limit_ops` — that run is gated behind the (unauthored) migration 048.

**Does migration 048 (or equivalent) exist?** **No.** The migrations stop at
047. Migration 048 (sma_limit_ops misconceptions) was never authored — a
deliberate hard-stop. There is a **design doc for migration 049** (items) on
`slice-2-prep--migration-049-design`, but: (a) it is design-only, no SQL;
and (b) it is **invalidated** — `b38011b`'s commit message carries a "TASK 4
INVALIDATION FLAG": the doc was written against the prior M2 stem (0/0 form),
which b38011b replaced, so its dual-tagging plan, cross-contamination check,
and ≥2 of its 5 open questions are stale and **must be redrafted before the
questions can be answered**.

**Did anything from slice 2 reach production?** **No.** Zero `db push`, zero
`functions deploy`, zero merge to `main`. The misconception *foundation*
(mig 040–047, what one might call slice 1 + the edge-function step) did reach
production — but that predates and is distinct from slice 2.

## 4.2 State of the pr-reviewer agent

**Drafted-but-inactive; never promoted.** ADR 0014 is **Draft**. The agent
file's own "Trust status" header says its report is *informational only
until the audit ADR (forthcoming, post-trust-building) promotes it.* The
trust-building period (human review of the file → 3–4 supervised PRs →
audit ADR) has **not started** — there are no PRs, no `origin` remote, and
`.audit-logs/pr-reviews/` does not exist. The agent is loadable but, by its
own and ADR 0014's terms, **not load-bearing**.

## 4.3 Uncommitted / untracked / stale working-tree state

Working tree is clean except for two **untracked** items (deferred across
several prior rounds):
- **`sma_stems.json`** (root, 25 KB, dated 2026-05-09). A stem-length
  extraction dump — rows of `{code, old_len, stem}` for `sma_*` skills,
  evidently a query export used to audit lesson/item stem lengths. **Two
  issues:** (a) its first line is stray tooling noise — `Initialising login
  role...` — so the file is **not valid JSON**; (b) it is undocumented,
  untracked, contains DB-derived content, and is not in `.gitignore`. Almost
  certainly disposable analysis cruft, but it should be a human call to
  delete vs. archive — I did not touch it.
- **`supabase/.temp/`** (root). Supabase CLI local cache for the linked prod
  project (project-ref, versions, pooler URL). Only `backend/supabase/.temp/`
  is gitignored; this **root** `supabase/.temp/` is not, so it surfaces as
  untracked. Harmless local state; candidate for `.gitignore` (`supabase/`)
  or deletion. The `pooler-url` does embed the prod connection string's
  user/host — mild hygiene note, no secret (no password).

No stash entries. No modified tracked files. No partial merges.

## 4.4 Prioritized list — what needs human decision before work resumes

**P0 — gates any new migration:**
1. **Verify production migration sync** (supervised). Run `supabase migration
   list` against `iwoydyudjondihzzsqay`; diff against local 001–047. The
   73-edge precedent (mig 041) proves prod has drifted before. **Nothing
   that writes to prod should proceed until this is green.**

**P1 — gates slice-2 content resumption:**
2. **Redraft the invalidated migration-049 design doc** against the
   corrected M2 stem (per the b38011b invalidation flag), then **answer the
   5 deferred Task-4 questions** (stem register; difficulty tier; M2 stem
   confirmation; 048+049 as one migration or two; PR shape).
3. **Decide the sub-branch disposition.** Four unmerged sub-branches carry
   real artifacts (the §5.5 fix, the dual-tag audit, the mig-049 design, the
   asymptotes draft). Decide merge/cherry-pick order — notably whether to
   land Task 5's §5.5 correction so the mainline grounding doc stops carrying
   the disproven "two-banks-for-every-skill" framing.

**P1 — decision record integrity:**
4. **Rule on the frontend stack and record it.** The agent kit assumes the
   hybrid (Next.js shell + Flutter iframe) model, but there is no
   `nextjs-frontend` agent file and no ADR. Either author the ADR + the
   missing agent, or correct the agent kit. This reframes a large slice of
   downstream planning still described as "open" in the grounding docs.

**P2 — workflow + hygiene:**
5. **pr-reviewer:** decide whether to begin the trust-building period (ADR
   0014 Decision C) — which first requires an `origin` remote + a PR flow.
6. **Apply the grounding-doc reconciliations** (the three companion notes)
   once reviewed, so the docs stop misreporting RLS / prereq / misconception
   state as open.
7. **Write the deferred ADRs:** ADR 0015 (across-skill cross-contamination,
   on slice-2 ship) and the pr-reviewer trust-building audit ADR.
8. **Dispose of untracked cruft** (`sma_stems.json`, root `supabase/.temp/`)
   and `.gitignore` the latter.
9. **Confirm intentional gaps:** ADR 0001/0002 absence and migration
   019/035 gaps (believed intentional; confirm).
10. **Carry-over backlog still open from the original audit:** down
    migrations (none exist), `get_user_weak_areas` dead code (mig 004),
    telemetry/PostHog provisioning, SMB v0 / SVT SME passes — all
    unchanged since the grounding docs.

## 4.5 Hard-stops honored by this pass

No production changes. No migrations run. No connection to production. No
merges to `main`. No agent deployed/promoted. No edits to the grounding docs
(`docs/grounding/*`) — corrections are *proposed* in the companion notes
only. No resolution of any decision: all surfaced for the human.

---

## Companion artifacts

Proposed reconciliations (review-only; the grounding docs themselves are
untouched):
- `docs/reestablish-state/proposed-reconciliation--grounding-architecture.md`
- `docs/reestablish-state/proposed-reconciliation--schema-reconciliation.md`
- `docs/reestablish-state/proposed-reconciliation--known-issues.md`
