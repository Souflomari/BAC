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
- **`docs/Rules/RULES.md`** — *how we work.* The build discipline,
  operating procedure, safety non-negotiables, and cadence. Authority
  order: VISION → RULES → agents. A living document that evolves as the
  build is figured out.
- **`.claude/agents/*.md`** — *who does what.* The specialist subagents.
  Loaded per task. **[STATUS: roster under revision to match the locked
  vision and pending architecture decisions — see "Open decisions" below.]**
- **`docs/grounding/`** — *where we are.* Current-state documents:
  `architecture.md`, `schema-reconciliation.md`, `known-issues.md`.
  **[STATUS, 2026-09-05: `architecture.md` RÉCONCILIÉ — re-mesuré contre le
  dépôt et réécrit ; la version précédente décrivait encore l'application
  Flutter comme l'état courant et affirmait que « Next.js n'apparaît nulle
  part dans le dépôt ». Elle est archivée sous `docs/archive/`. Le blocage
  invoqué par la proposition de 2026-06 (« ne pas toucher au cadrage
  frontend tant que la décision de pile n'est pas actée ») était levé depuis
  l'ADR 0016. `known-issues.md` porte désormais une ÉTIQUETTE DE STATUT
  vérifiée : six entrées re-mesurées contre le dépôt (une résolue, une
  toujours vraie mais morte, une à moitié, une devenue sans objet), le reste
  laissé au jugement du propriétaire. `schema-reconciliation.md` porte lui aussi une ÉTIQUETTE
  DE STATUT vérifiée : son JUGEMENT était juste et a été exécuté ; ce qui a
  vieilli est le temps des verbes, et le §6 (la pile frontend) est tranché
  par l'ADR 0016.]**
- **`docs/decisions/*.md`** — *what we decided and why.* The ADR trail.
  Numbered, append-only history. Referenced for context on past
  decisions. **ADR 0025 consolidates the July-2026 sprint's first arc**
  (rendered/deployed-truth discipline, page anatomy, honest-state,
  template v2, the component set, the portability protocol, the
  external-audit event). **ADR 0026 consolidates the second arc and the
  Fable close** (site skeleton, the 61-lesson fill, the D10 media layer,
  Lesson Experience v2, the handoff corpus — HANDOFF §5, the post-Fable
  work order, DASHBOARD-SPEC, THEME-ARCHITECTURE, the three skills).
- **`docs/HANDOFF.md`** — *start here after the July-2026 sprint.* The
  open-gates list (owner decisions pending), the external-audit triage,
  and the "how not to regress this" invariants — written as the sprint's
  last act for the next maintainer.

---

## Stack (current, verified)

- **Frontend:** **Next.js** (App Router) + React + Tailwind, deployed to
  **Vercel**. This is the whole frontend — the Flutter Web MVP was retired
  in the rebuild (ADR 0016); there is no shell/hybrid and no Flutter left in
  the running app.
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions),
  project ref `iwoydyudjondihzzsqay`, EU-Central.
- **Design system:** single source of truth in `web/src/lib/tokens.ts`
  (generates the CSS vars + Tailwind config); component code speaks named
  token aliases only, enforced by `scripts/token-gate.mjs` (Phase A).

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

1. **The rules of work — RESOLVED.** Written and now living at
   `docs/Rules/RULES.md` (the two-kinds-of-work split, the human gate,
   cadence and working loop, the multi-model architecture, and the
   documentation/rebuild discipline). A living document that continues to
   evolve as the build is figured out.
2. **The frontend architecture — RESOLVED.** Next.js (App Router) on
   Vercel is the whole frontend (ADR 0016). There is no hybrid and no
   `nextjs-frontend` shell agent — `frontend-builder` IS the frontend
   agent (`docs/agents/ROSTER.md` §3, the roster refresh ADR).
3. **The agent roster — RESOLVED.** Refreshed for the 5-family model
   (Fable 5 orchestration / Opus 5 judgment / Sonnet 5 volume / Gemini
   media lane) and recorded as-lived in `docs/agents/ROSTER.md` v2 + the
   roster ADR. No new agents added; the lean roster held.
4. **Generative-content tooling.** Gemini (imagery, video) and ElevenLabs
   (narration) are intended production tools. Their sanctioned uses — and
   the hard line that generated assets never substitute for a manipulable
   interactive where the pedagogy requires manipulation — need to be
   written into the rules and the relevant agents. **[Phase E of the
   perfect-product plan resolves this.]**
5. **Production sync verification.** See non-negotiables above.

---

## The one-line reminder

Everything here serves the vision in `docs/product/VISION.md`: a calm,
deep, infinitely-patient tutor that takes a struggling student to bac
mastery. When a build decision and the vision conflict, the vision wins —
or the vision gets revisited deliberately, never overridden by accident.
