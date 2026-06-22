# ADR 0016 — Frontend rebuild on Next.js/React; retire Flutter; supersede the hybrid

**Status.** Accepted, 2026 (post-dormancy resumption).
**Supersedes.** The hybrid architecture decision (Option C — Next.js shell +
Flutter Web iframe for interactive practice), which was decided in
conversation but never built and never recorded as its own ADR. The
`flutter-widgets` agent (`.claude/agents/flutter-widgets.md`) was the only
artifact of that decision to land in the repo; it is retired by this ADR.

---

## Context

The frontend was a Flutter Web build (~55k lines of Dart, 33 interactive
widgets) deployed to Vercel. The backend is Supabase and is **not affected by
this decision**.

The product vision (`docs/product/VISION.md`) was locked after an extended
dormancy. The vision makes specific demands the prior Flutter Web build does
not serve well:

- **A calm, web-native feel.** The single most-cited complaint about the
  original MVP was that it "feels like an app put on a bigger screen, not a
  real website." That texture is intrinsic to Flutter Web's canvas-rendering
  model (CanvasKit draws to a `<canvas>` rather than to the DOM), not a tuning
  defect.
- **Deeply text-and-explanation-heavy content** (the décortiquer, exposed
  reasoning, narration scripts) — where DOM-based rendering is strongest and
  canvas rendering is weakest.
- **The richest possible set of interactive and media modalities** — Desmos,
  GeoGebra, PhET embeds, custom manipulables, generated imagery and video,
  narration — layered per concept. The largest such ecosystem is the web/React
  ecosystem.
- **Per-lesson shareable, searchable pages** — a student may land on a specific
  lesson via search or a shared link. SEO and deep-linking are weak under
  Flutter Web.

The deadline was explicitly dropped: this is a "however long it takes to get
it right" project. That removes the only argument that previously favored
keeping Flutter — the sunk cost of existing Dart code.

## Decision

**Rebuild the frontend in Next.js + React + TypeScript, deployed to Vercel, as
a single web-native codebase. Retire Flutter entirely. Do not pursue the
hybrid.**

The Supabase backend — schema, all migrations (001–047), the misconception
layer, the curriculum data, the edge functions — is kept unchanged. This is a
frontend rebuild, not a product redesign.

## Why this is the "best outcome" target, not merely a preference

Every relevant vector points the same way:

- The vision is *web-shaped* (calm, rich, text-and-media learning environment),
  not *app-shaped*.
- The #1 user complaint is *caused* by Flutter Web's non-web-native rendering;
  a DOM-native stack dissolves it at the root rather than mitigating it.
- The richest-needed modality ecosystem *is* the web/React ecosystem.
- The deployment target (Vercel) is React/Next.js's home turf.
- The only force that ever favored Flutter was "we already have Flutter code" —
  the sunk-cost argument, which the dropped deadline explicitly overrides.

## Why this supersedes the hybrid (Option C)

The hybrid existed solely to *preserve the Flutter widgets* while gaining a
web-native shell — paying the cost of two runtimes, two state stores, and a
sync boundary to avoid a rewrite. Once the widgets are rebuilt in React anyway,
the hybrid's entire reason to exist evaporates. A single web-native codebase
with no iframe boundary is a strictly cleaner foundation than the hybrid would
ever have been. The hybrid is therefore not deferred — it is abandoned, because
its motivating constraint no longer holds.

## Consequences

- **The `flutter-widgets` agent is retired.** Removed from the active roster.
- **The `nextjs-frontend` agent stops being a phantom.** It was referenced by
  the hybrid but had no file; it now becomes the real, and only, frontend
  agent. Its definition is to be written as part of the roster revision.
- **The frontend is rebuilt.** The 33 widgets do not port; they are re-created
  in React. This is real work, bounded by the fact that the interactive layer
  was being reconceived under the new vision regardless of stack — much of that
  work would have happened anyway.
- **The agent roster simplifies.** No two-runtime split to manage; no sync
  boundary to own.
- **The backend is untouched.** No migration, no schema change, no data
  migration follows from this decision.
- **The named risk is rewrite-scope-creep, not the stack choice.** Rewrites
  have a known failure mode — the "second system" that chases perfection and
  never ships. The guard is twofold: the vision is locked and concrete (it
  bounds *what* gets built), and the backend plus content model are already
  proven (this rebuilds *one layer*, not the whole product). The forthcoming
  rules of work (`docs/RULES.md`) should carry an explicit guard against
  rewrite-scope-creep.

## What this does not change

- The Supabase backend and all migrations.
- The misconception schema, curriculum data, and edge functions.
- The product vision — this decision *serves* it; it does not alter it.
- The production-safety non-negotiables.
- Vercel as the deployment target.

## Retractions and Corrections

None — but note this ADR itself supersedes the (unrecorded) hybrid decision.
If a future ADR reverses *this* decision, it should reference 0016 explicitly.

## Open follow-ups

- Write the real `nextjs-frontend` agent definition (roster revision).
- Remove `.claude/agents/flutter-widgets.md` from the active roster (retired).
- Decide the React stack specifics (component library, styling, math rendering,
  state management) — a sub-decision of the rebuild, to be recorded when made.
- Decide the disposition of the existing Flutter codebase in the repo (archive
  vs. remove) — keep it readable for reference during the rebuild, then remove.
