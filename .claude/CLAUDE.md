# CLAUDE.md

> This file is read automatically by Claude Code at the start of every
> session. It is an **index and orientation file** — it points to the
> deeper documents and carries only the most essential always-on facts.
> It deliberately does NOT contain the full product vision or the full
> rules of work; those live in their own documents (linked below) to
> keep this file short and to avoid burning context re-reading it.

---

## What this project is

A Moroccan baccalauréat preparation app for science-stream students
(SM-A, SM-B, Sciences Physiques, SVT — 2ème Bac, French first). The goal
is to replace private tutoring with a more effective, far cheaper
solution: a patient, omniscient, infinitely-available tutor that takes a
struggling student to excelling at the bac.

**Read `docs/product/VISION.md` before making any product decision.** It
is the canonical statement of what the app is and why; every decision
answers to it.

---

## The documentation map

Read the right document for the task at hand:

- **`docs/product/VISION.md`** — *why and what.* The product vision. The
  north star the whole project serves. Read before any product decision.
- **`docs/RULES.md`** — *how we work.* The build discipline and rules of
  work. **[STATUS: not yet written — being defined. Until it exists, the
  production-safety non-negotiables below apply.]**
- **`.claude/agents/*.md`** — *who does what.* The specialist subagents.
  Loaded per task. **[STATUS: roster under revision to match the locked
  vision and pending architecture decisions — see "Open decisions" below.]**
- **`docs/grounding/`** — *where we are.* Current-state documents:
  `architecture.md`, `schema-reconciliation.md`, `known-issues.md`.
  **[STATUS: stale — reconciliation proposed in
  `docs/reestablish-state/`, pending human review and merge.]**
- **`docs/decisions/*.md`** — *what we decided and why.* The ADR trail.
  Numbered, append-only history. Referenced for context on past
  decisions.

---

## Stack (current, verified)

- **Frontend:** Flutter Web, deployed to **Vercel**.
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions),
  project ref `iwoydyudjondihzzsqay`, EU-Central.
- **Note:** a hybrid model (Next.js shell + Flutter Web for interactive
  practice) was discussed but the shell does not exist and the decision
  is **not yet recorded** — see "Open decisions."

---

## Production-safety non-negotiables (always in force)

These hold regardless of what else is or isn't decided. They are derived
from hard-won lessons in the ADR trail; violating them has caused real
incidents.

- **Production pushes are human-gated. Always.** No autonomous push to
  production, ever.
- **No production push without a passing branch-test** against the
  staging project, via `scripts/branch-test.ps1`. (See ADR 0005.)
- **Every migration ships a verify block that asserts post-state
  cardinality, not just structure.** A migration that appears to succeed
  while silently doing nothing is the failure mode this prevents.
  (Lesson: migration 046.)
- **RLS enabled in the creating migration**; per-user-state write RPCs
  get **service_role-only grants**. (Lessons: migrations 040, 047.)
- **No out-of-band changes to production.** All schema and seed data flow
  through migration files. The dashboard SQL editor is read-only on
  production. (Lesson: the 73 untracked edges, ADR 0003.)
- **Never edit a migration that has already run on production** — write a
  new one. Migrations are append-only history.
- **Production sync is currently UNVERIFIED** after a long dormancy.
  Before any new migration ships, confirm the production migration state
  matches local history in a supervised session.

---

## How work is documented

- Cross-cutting decisions get an **ADR** in `docs/decisions/`, numbered
  sequentially, with a "Retractions and Corrections" section (present
  even when empty).
- Grounding docs are reconciled when they drift — and always after a
  dormancy or major change. They are not write-once.

---

## Open decisions (resolve before resuming build)

These are known-unresolved and block a clean resumption. Do not paper
over them.

1. **The rules of work (`docs/RULES.md`).** The build discipline — cadence,
   how agents operate, whether the prior "vertical slice" model survives,
   how the generative-content pipeline runs — is being redefined and is
   not yet written.
2. **The frontend architecture.** Flutter-on-Vercel today; a hybrid
   (Next.js shell + Flutter practice) was discussed but never built or
   recorded. The agent roster references a `nextjs-frontend` shell agent
   that has no file. Decide and record.
3. **The agent roster.** Needs revision to match the locked vision and
   the generative-content tooling (see below). Some agents may merge,
   some may be added.
4. **Generative-content tooling.** Gemini (imagery, video) and ElevenLabs
   (narration) are intended production tools. Their sanctioned uses — and
   the hard line that generated assets never substitute for a manipulable
   interactive where the pedagogy requires manipulation — need to be
   written into the rules and the relevant agents.
5. **Production sync verification.** See non-negotiables above.

---

## The one-line reminder

Everything here serves the vision in `docs/product/VISION.md`: a calm,
deep, infinitely-patient tutor that takes a struggling student to bac
mastery. When a build decision and the vision conflict, the vision wins —
or the vision gets revisited deliberately, never overridden by accident.
