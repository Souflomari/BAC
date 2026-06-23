# The Rules of Work

> *How we work.* The build discipline, the operating procedure, the
> safety non-negotiables, and the cadence. Where `VISION.md` says *what*
> the product is and `DESIGN-BIBLE.md` says *how it looks and feels*, this
> document says *how the work gets done* — safely, and in a way a fresh
> Claude Code session can read and act on without guessing.
>
> It **evolves** as the build is figured out, and is kept separate from the
> vision so that changing how we work never muddies what we're building.
> When a rule here and the vision conflict, the vision wins.
>
> **Authority order: VISION → RULES → agents.** The vision is the north
> star; these rules serve it; the agents operate within these rules.

---

## 0. The two kinds of work — the principle everything rests on

All work on this project is one of two kinds, and they are governed
differently because their **failure modes are different**.

**Content production** — authoring lessons, exercises, the décortiquer,
worked examples, the graduated ramp; generating imagery, diagrams, video;
drafting documents and ADRs; mining old content; processing source
material. This is roughly **90% of the work**. Its failure mode is
**recoverable**: a weak explanation, a poor exercise, an off illustration
is caught on review and regenerated. Nothing breaks, no student data is
lost, no production system is corrupted. **Content production can run
autonomously between sessions.**

**Production-touching code** — database migrations, schema changes, the
write-path (RPCs, edge functions that write user data), and deployments.
This is roughly **10% of the work**. Its failure mode is **silent and
unrecoverable**: a migration can appear to succeed while corrupting data,
with no error, discovered only weeks later. This class has caused real
incidents in this project's history. **Production-touching code is always
human-gated and is never run autonomously.**

The asymmetry is deliberate and is the foundation of everything below:
**autonomy where failure is cheap; gating where failure is catastrophic.**
When unsure which kind a task is, treat it as production-touching and ask.

---

## 1. The human's role — editor-in-chief, not code reviewer

The project owner has limited coding knowledge. This is not a problem to
work around; it *defines* the division of labor.

- **The human is the editor-in-chief and product owner.** Their judgment is
  spent where it is irreplaceable: *is this lesson good for a struggling
  student? does this match the vision? is this calm or busy? is this the
  right thing to build next?* These are product and pedagogy judgments, not
  coding judgments, and the human is uniquely equipped to make them.
- **The human is NOT the code reviewer.** Asking the human to approve a
  migration they cannot read is *theater* — it feels like a safety check but
  isn't, because the checker cannot detect the problem. We do not build
  safety on theater.
- **Technical safety comes from automated machinery, not human code review.**
  Branch-tests, verify blocks asserting cardinality, RLS, smoke tests — the
  machinery is the technical safety check. The human's authorization to push
  is a *decision* ("the automated check is green, proceed"), not a code
  review.

Claude's role is the **technical partner**: it does the code, explains
decisions in terms the human can evaluate (product/pedagogy impact, not
line-by-line syntax), surfaces real risks plainly, and pushes back honestly
when something is a bad idea rather than just agreeing.

---

## 2. What the gate actually is

**For production / technical work**, the gate is a sequence, not a
code-read:

1. The change is built and tested against the **staging** environment.
2. The **branch-test passes** (exits clean): per-stream/state assertions,
   RLS checks, cardinality assertions — all green.
3. The human **authorizes the push** as a decision — "the automated safety
   check passed, proceed" — without needing to read the code.

The human's judgment in this gate is *whether to proceed*, informed by the
machinery's verdict and a plain-language summary of what the change does and
why — never a line-by-line code review.

**For content work**, the gate is **editorial**:

1. Claude builds a large chunk of content autonomously.
2. The human **uses the app as a student**, experiences the content the way
   the actual user will.
3. The human **writes an evaluation** — what's good, what's weak, what to
   redo.
4. Claude **iterates** on that evaluation.

This is where the human's judgment is the whole point, and where they should
be deeply involved.

---

## 3. Production-safety non-negotiables

These are absolute. Each derives from a real incident in this project's
history. They hold regardless of anything else.

- **Production pushes are human-gated. Always.** No autonomous push to
  production, ever, under any framing.
- **No production push without a passing branch-test** against the staging
  project.
- **Every migration ships a verify block that asserts post-state
  cardinality, not just structure.** A migration that appears to succeed
  while silently doing nothing (e.g., a no-op from an unexpected conflict) is
  the failure mode this prevents.
- **RLS enabled in the creating migration**; per-user-state write RPCs get
  **service_role-only grants**. Authenticated grants on write-RPCs require an
  explicit ADR justifying them.
- **No out-of-band changes to production.** All schema and seed data flow
  through migration files. The production dashboard SQL editor is read-only.
- **Never edit a migration that has already run on production** — write a new
  one. Migrations are append-only history.
- **Production sync is currently UNVERIFIED** after an extended dormancy.
  Before any new migration ships, the production migration state must be
  checked against local history in a supervised step. Until that check
  happens, no migration ships.
- **Content migrations assert content identity, not just presence.** A
  migration that lands content must verify *the right content* landed (e.g.,
  the expected count *and* the expected identifiers), not merely that *some*
  content is present.

---

## 4. The working loop and cadence

The rhythm of work:

1. The human and Claude **decide** the next chunk of work (a planning step —
   what to build, scoped).
2. Claude **builds the chunk** — large, autonomous for content; synchronous
   and gated for anything production-touching.
3. The human **evaluates** — as a student for content; as the authorizer for
   production.
4. Claude **iterates** on the evaluation.

Between sessions, **non-production work can run autonomously**; the human
does not need to be present for it. **Production work happens synchronously**
with the human present to authorize. Sessions are bounded — work is dispatched
in chunks that reach a reviewable state, not open-ended.

`[STATUS: not yet decided]` — the precise session cadence (how often, how
long) and the exact size of a "chunk" are not yet pinned down. They will be
calibrated as the rebuild gets underway and recorded here when settled.

---

## 5. The multi-model architecture

Work routes to the best-fit model across **three separate budgets**, to
maximize capability without wasting any one budget.

- **Opus** — orchestration and hard-reasoning/judgment work: the
  orchestrator that plans and routes, the pedagogy-design judgment calls, the
  curriculum/correctness review, the schema/migration design (the risky
  10%). Reserved for work where being subtly wrong is costly and hard to
  catch.
- **Sonnet** — high-volume structured execution *from Opus's specs*: content
  authoring, exercise authoring, frontend component building. The thinking is
  done upstream by Opus; Sonnet executes it faithfully, fast, at quality.
- **Gemini** (via API key) — media generation (imagery, diagrams, video) and
  long-context bulk processing (ingesting curriculum documents, the exam
  corpus, source material). A separate budget; pure additive capacity.

The Opus→Sonnet handoff quality depends entirely on the spec quality: Opus
must produce specs detailed enough that Sonnet executes faithfully rather
than guessing. This handoff quality is to be **verified early** (author
sample content both ways, compare), not assumed.

Narration (**ElevenLabs**) is **deferred** — content is authored
*voice-ready* (written to be spoken aloud) now, so narration drops in cleanly
later.

`[STATUS: not yet decided]` — the exact agent roster, each agent's specific
model assignment, and the precise mechanics of how a single notion flows
through the agents (the content-production pipeline) are being designed and
will be recorded here and as actual files in `.claude/agents/` when settled.
The fate of the previously-drafted-but-never-activated `pr-reviewer` agent is
also undecided.

---

## 6. Documentation discipline

- **Decisions are recorded as ADRs** in `docs/decisions/`, numbered
  sequentially and append-only. Each carries a "Retractions and Corrections"
  section, present even when empty — so that correcting a prior finding is a
  normal part of the discipline, not an exception.
- **Grounding docs** (`docs/grounding/`: architecture, schema-reconciliation,
  known-issues) describe the *current true state*. They are reconciled
  whenever they drift, and **always after a dormancy or a major change**.
  They are not write-once.
- **The vision wins conflicts.** When a build decision and the vision
  conflict, the vision wins — or the vision is revisited *deliberately* and
  recorded as such, never overridden by accident.
- **`CLAUDE.md`** (repo root) is the short auto-read index that points to all
  of the above. It carries only the most essential always-on facts; it does
  not duplicate the vision, the design bible, or these rules.

---

## 7. The rebuild discipline

The project is mid-rebuild. The old content grew into a mess (duplicate
lessons, two instances of limits, a tangled curriculum tree) and is being
rebuilt clean on the locked vision, the new design system, and the new
frontend (Next.js, per ADR 0016).

- **Wipe the content artifacts; preserve the foundation.** Wiped: the messy
  curriculum tree, duplicate and repetitive lessons, old exercises, the
  retired Flutter frontend. Preserved: the Supabase backend and auth, the
  misconception schema and framework, the pedagogy and cadre knowledge, the
  ADR trail, and the vision.
- **Standing rule — dead Flutter platform:** The Flutter frontend was retired
  (ADR 0016, Next.js rebuild). Any remaining Flutter artifacts (the `mobile/`
  directory, the Flutter CI workflow) are to be DELETED, never patched or nursed
  back to green. When a Flutter-related failure surfaces (e.g. a CI failure), the
  response is removal, not a dependency patch. Git history preserves everything —
  including the toolchain-fix commit `f61bff6` — so deletion is non-destructive.
- **Mine before wiping.** Nothing is deleted until the old version has been
  checked for anything worth recovering. Git history makes the wipe safe —
  nothing is ever truly lost once it's in history — but the recovery pass
  happens *before* the working copy is wiped.
- **Rebuild in phases**: (1) extract the true canonical curriculum structure
  from the official Cadre de référence, validated hard by the human + Opus;
  (2) gather source material per notion; (3) mine the old project; (4) rebuild
  clean via the agent pipeline. **Start subject: SMA** — it has the
  hardest/most-developed content, so building to its standard first and
  propagating down is easier than the reverse.
- **Guard against rewrite-scope-creep.** The famous failure mode of a rewrite
  is the "second system" that chases perfection and never ships. The guard:
  the vision is locked and concrete (it bounds *what* gets built), and the
  backend and content model are already proven (the rebuild touches *one
  layer at a time*, not the whole product). Do not expand scope beyond what
  the vision and the proven foundation require. When tempted to rebuild
  something that already works (the backend, the schema), stop — that's
  scope-creep.

---

## 8. How a fresh Claude Code session should behave

A new session reads `CLAUDE.md`, which points to this document and the
others. From them, it should be able to orient *and act safely* without the
human re-explaining the guardrails each time. Specifically:

- **Read the foundation first**: `CLAUDE.md`, `VISION.md`, `DESIGN-BIBLE.md`,
  this document, the latest grounding/state docs, and the relevant ADRs.
- **Do not take initiative on building, wiping, migrating, or deploying.**
  Propose; let the human decide. The autonomy to *run* a content chunk comes
  *after* the human has dispatched it, not on the session's own initiative.
- **Never touch production** (migrations, deploys, the write-path) without
  explicit human authorization and a passing branch-test — and not at all
  until production sync is verified (§3).
- **When a task is ambiguous, or you are tempted to act on something not
  explicitly asked, stop and ask.** Surprise is signal: investigate
  anomalies before proceeding rather than working around them.
- **Stay in lane.** Each agent owns a scope and routes rather than reaching
  outside it (roster forthcoming, §5).

---

## Status summary

**Settled and in force:** the two-kinds-of-work principle (§0), the human's
role (§1), the gate definitions (§2), the production-safety non-negotiables
(§3), the documentation discipline (§6), the rebuild discipline (§7), and the
fresh-session behavior (§8).

**Not yet decided (marked above):** the precise session cadence and chunk
size (§4); the exact agent roster, per-agent model assignments, the
content-production pipeline mechanics, and the `pr-reviewer` fate (§5). These
are filled in here as they're settled, each with an ADR.
