# ADR 0024 — Hybrid-Material mechanism adoption (Google-grade rigor, warm-editorial identity kept)

**Status.** Accepted, 2026. Triggered by the human's editorial verdict after the
ADR 0023 warm-editorial pass: *"it doesn't feel great, it doesn't feel Google
great. While it is much better than what we had before… we're going to run
through all the Google design rules, establish them one by one, and then run an
audit, grade it on multiple fronts, fix the weaknesses, rerun another audit, etc.,
until we get 18 or 19 on everything."* This ADR settles **which Material Design 3
mechanisms we adopted, which identity we protected, and why**, so the Hybrid
position is not re-litigated.

**Relates to.** VISION, RULES, `docs/product/DESIGN-BIBLE.md`, ADR 0023
(warm-editorial typography + palette — **extended, not superseded**), ADR 0022
(tokens + motion stack — the elevation scale, easing curves, beat-spec engine all
stand), ADR 0017 (coded-figure rule — reaffirmed). Living references updated
alongside: `docs/design/TOKENS.md`, `docs/design/COMPONENT-STATES.md`,
`docs/design/GOOGLE-AUDIT-RUBRIC.md` (the scoring source this ADR's audit ran on).

---

## Context

ADR 0023 reached a Linear/Stripe/editorial bar (~9/10 on that scale). The human's
verdict was that it still lacked the **systematic rigor and craft of Google's own
design system** — *"Google great."* The request was explicit and process-shaped:
establish the Google/Material rules **front by front**, then a repeated
**multi-front audit graded /20 per front, iterated until every front is 18–19.**

Three decisions were locked with the human before any build:

1. **Identity = HYBRID.** Adopt Google's *universal* craft **and** specific
   Material *mechanisms* that raise quality — **while keeping** the warm-editorial
   identity (serif + ivory + deep teal + calm core). **NOT** full Material: no
   Roboto, no dynamic color, no ripple, no FAB, no bottom-nav, no overshoot. The
   VISION holds.
2. **Rubric = the full 13 fronts**, each scored /20 (Color, Typography, Layout,
   Adaptive, Elevation, Shape, Motion, Interaction-states, Iconography,
   Accessibility, Content, Component-quality, Overall-cohesion).
3. **Scope = whole site** — home + RLC notion + 404 — in light + dark, at
   compact / medium / expanded breakpoints.

The crucial framing decision: **the rubric grades protected-identity choices on
the CRAFT of their execution, never on Material conformance.** Penalizing the warm
serif palette for not looking like Material would make 18 unreachable without
becoming a Material clone — which the human did not choose. Every rule in
`GOOGLE-AUDIT-RUBRIC.md` is tagged `[U]niversal` / `[H]ybrid-adopt` /
`[P]rotected` so graders apply the right standard.

## Decision — the Material *mechanisms* we adopted

We pulled in the *logic* of these M3 systems, not their loud parts:

1. **A systematic state-layer model (the biggest rigor win).** One `.state-layer`
   utility — a neutral on-surface `::after` wash whose opacity steps on
   hover/pressed — replaces the ad-hoc per-component hover treatments. Token set:
   `--state-hover .06 / --state-pressed .10 / --state-dragged .16 (reserved) /
   --state-disabled .38`, plus a single `.state-disabled` treatment. The wash is
   **neutral (text-color), not accent** — the accent still leads in exactly one
   place per surface — and capped at ~10% (above that it mutes the content reading
   through it). Applied to **every** interactive control: cards, option rows, the
   stepper, header links, embed links, the `<summary>` disclosure, the shared
   transport buttons, and the filled `.btn-primary` (an on-accent overlay).
   **Never a ripple.** Focus stays the accent ring + jewel halo, not an overlay.

2. **A surface-container tonal ladder.** `--color-surface-container-{lowest, low,
   container, high, highest}` (warm, M3 tone-based surfaces) so **elevation reads
   through tone as well as shadow** — a higher tier sits on a lighter warm surface
   — layered onto the ADR 0023 shadow-first hairline-card model. Cards step UP in
   tone (`container-high`), code wells recess to `container-lowest`.

3. **Adaptive window-size classes.** Formal M3 breakpoints — compact `<600` /
   medium `600–839` / expanded `≥840` (`bp-medium` / `bp-expanded` tailwind
   screens) — replacing the single bespoke 900px split. The notion page now has
   **three genuinely distinct layouts** (single column / 52px rail / 64px rail);
   the named "medium/tablet gap" is closed for the list-detail surface.

4. **M3 transition patterns — adopted, then REMOVED when they collided with the
   protected identity (the clearest illustration of this ADR's thesis).**
   `fade-through` and `container-transform` (no-overshoot, token-driven) were
   built in the Hybrid pass. But the only places they could attach were
   **mount/route events** (page entry, embed open), where they read as
   unsolicited **autoplay** motion — and the calm-load adversary (the blocking
   guardian of the protected identity) flagged both. The protected
   *"learner-paced, no autoplay/scroll-trigger"* line WON: there is no genuinely
   learner-triggered transition to host them today, so the keyframes/classes were
   removed (not left as dead CSS). If a real learner-initiated expand control ever
   lands, `container-transform` is the sanctioned pattern — gated on the explicit
   user action, never on mount. `shared-axis` was likewise never built (no
   peer-axis navigation exists). **Adopting a mechanism does not mean keeping it
   when it conflicts with the calm core; the identity is not negotiable.**

5. **One icon system.** A single `Icon.tsx` module — one normalized 24×24 viewBox,
   one stroke language (width 2, round caps, `currentColor`), 4 dp sizing — that
   every product glyph routes through (the lone exception is the sanctioned brand
   GlyphMark). All ad-hoc inline `<svg>` glyphs were migrated out, including the
   shared `TransportButton` extracted from the two motion engines.

6. **French-aware content rules.** M3 content principles (concise, second-person,
   present tense, scannable, no shouting) **adapted to French orthotypography**:
   curly apostrophe U+2019 and the narrow no-break space U+202F before `; : ! ?`
   and inside guillemets, applied via `frenchTypography()` / a remark plugin —
   including the screen-reader-announced layer (figure / control aria strings).

## What we PROTECTED (graded on craft, never on Material conformance)

Warm ivory/charcoal palette · deep-teal single signature accent · muted (non-neon)
semantics · Source Serif 4 + IBM Plex Sans editorial pairing · bounded 65ch
measure · shadow-first hairline cards · **no ripple · no FAB · no bottom-nav · no
overshoot/bounce · learner-paced motion (no autoplay / no scroll-trigger)** · calm
core / no engagement theater · one-primary-action-per-surface. (VISION; ADRs
0017/0022/0023.) The calm-load critic ran as a **blocking adversary every round**
so no mechanism leaked engagement theater.

## How it was verified — the audit-to-18 loop

A Workflow fanned out **13 front-auditors** (each scoring /20 against the rubric
with file:line weaknesses) + a calm-load adversary + a synthesizer, against the
whole-site shot matrix and component crops. Four fix rounds:

| | Baseline | R1 | R2 | R3 | R4 |
|---|---|---|---|---|---|
| **min front score** | 14 | 17 | 17 | 17 | **18** |
| **average** | 16.2 | 17.4 | 17.6 | 18.1 | **18.4** |

**Round 4 result: every front ≥18, four at 19** (Color, Typography, Iconography,
Accessibility). The last front under the bar — Interaction-states — crossed 17→18
once the final color-only controls gained the state-layer and the `.btn-primary`
hover was calmed (overlay + fill-shift, no elevation leap). The converged
scorecard lives at `docs/design/AUDIT-SCORECARD.md`.

## Consequences

- The 13-front rubric (`GOOGLE-AUDIT-RUBRIC.md`) + the re-runnable audit Workflow
  (`web/scripts/audit-round*-wf.js`) are now standing instruments: any future UI
  change can be re-graded against the same bar.
- The state-layer model is the **single interaction-feedback language**; new
  interactive components MUST adopt `.state-layer` (and the 8px-host focus-radius
  convention) rather than inventing a hover treatment — this is now a
  component-quality gate, documented in `COMPONENT-STATES.md`.
- Depth is a **two-signal system** (tone ladder + shadow scale); they must agree
  (a raised chip is toned at/above its host, never below).
- Content-lane only (rendered to the **preview**; the `bac-pink` Vercel preview).
  Production / DB stay human-gated — this ADR ships no schema or production change.

## Retractions and Corrections

- **Extends, does not supersede, ADR 0023.** The warm-editorial identity (serif,
  ivory, teal, muted semantics, shadow-first cards, one primary action) is
  unchanged and remains protected. This ADR adds the Material *mechanisms* around
  that identity.
- **Supersedes ADR 0023's ad-hoc per-component interaction feedback** with the one
  systematic `.state-layer` model.
- **Supersedes the single bespoke ~900px breakpoint** with the formal M3
  compact/medium/expanded window-size classes.
- `--state-dragged` is declared but **reserved** — this product has no draggable
  surfaces today; kept so the scale is complete if a drag control ever lands.
- `shared-axis` is intentionally **not** implemented (no peer-axis navigation to
  justify it). If peer navigation (e.g. items ↔ exam) is ever added, it is the
  sanctioned pattern.
