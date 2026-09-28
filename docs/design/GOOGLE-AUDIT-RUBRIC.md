# Google-grade Hybrid Audit Rubric

> **Purpose.** The single source the audit scores against. Establishes Google's
> design rules **front by front**, derived from Material Design 3 (styles +
> foundations) and Google's stated product-design principles, then defines a
> **/20 scoring band per front**. The audit grades every front, fixes the
> weaknesses, and re-grades until **every front is 18–19**.
>
> **Stance = HYBRID** (decided with the human). We adopt Google's *universal
> craft* and the calm-compatible Material *mechanisms* (state layers, tonal
> surfaces, M3 transition patterns, Material Symbols, adaptive window-size
> classes, content rules) **on top of our locked warm-editorial identity**. We
> do **not** become a Material app (no Roboto, dynamic color, ripple, FAB,
> overshoot, scroll-driven motion, full-width). VISION + ADRs 0017/0022/0023 hold.

---

## How each rule is tagged

- **[U] Universal craft** — any premium UI must meet it; graded on conformance.
- **[H] Hybrid-adopt** — a Material *mechanism* we are pulling in this pass.
- **[P] Identity-protected** — a deliberate BAC choice. **Graded on the CRAFT of
  our execution, never on conformance to Material's look.** Not having
  ripple/FAB/dynamic-color/Roboto/overshoot is **never** a deduction. Deduct only
  for poor execution of *our* choice (e.g. inconsistent accent, weak surface
  separation, sloppy serif tracking).

## The /20 band (applies to every front)

| Band | Meaning |
|---|---|
| **20** | Exemplary — best-in-class on this front; further change is diminishing returns. |
| **18–19** | **TARGET.** SOTA: systematic, complete, crafted; only hairline refinements remain. |
| **15–17** | Strong, with named gaps — good foundation, some inconsistency or missing rigor. |
| **11–14** | Competent / templated — meets basics, lacks system or craft. |
| **6–10** | Weak — visible gaps, inconsistency, or violations. |
| **0–5** | Broken or absent. |

**Protected-identity grading rule (read before scoring).** A front is NOT capped
below 18 because we diverge from Material's identity. If the [P] criteria are
executed with craft, that front can reach 20. Graders that deduct for "no dynamic
color / no ripple / serif instead of Roboto / bounded measure" are scoring wrong.

---

## The protected identity (never regress; [P] everywhere)

Warm ivory/charcoal palette · deep-teal single signature accent · muted (non-neon)
semantics · Source Serif 4 + IBM Plex Sans editorial pairing · bounded 65ch
measure · shadow-first hairline cards · **no ripple · no FAB · no bottom-nav · no
overshoot/bounce · learner-paced (no autoplay/scroll-trigger) motion** · calm core
/ no engagement theater · one-primary-action-per-surface.

---

## Front 1 — Color

**Rules.**
- [U] Text contrast ≥ 4.5:1 (body) / ≥ 3:1 (large ≥18px or ≥14px bold); non-text
  UI/graphics ≥ 3:1. Verified in **both themes**, every token pair.
- [U] Perceptible surface luminance separation (base → raised → overlay) so depth
  reads without relying on borders alone.
- [U] Complete, named color-role coverage (surface, on-surface ×3, border ×2,
  accent ×4, semantic ×3 + subtle, figure tokens) — no ad-hoc hex in components.
- [H] **Surface-container tonal ladder** (M3 tone-based surfaces): extend surfaces
  so elevation can read through *tone* as well as shadow — a fuller container set
  (e.g. lowest/low/container/high/highest) mapped to our warm ramp.
- [P] Warm ivory/charcoal, single deep-teal accent used once per surface, muted
  semantics separated from the accent hue. (Craft: is the accent disciplined? are
  semantics legible-but-calm? is the warm world cohesive?)

**18–19 requires:** every pair passes contrast in both themes; a complete tonal
surface ladder gives unmistakable depth; the accent leads exactly once per
surface; semantics are calm and never collide with teal; zero ad-hoc hex.

## Front 2 — Typography

**Rules.**
- [U] A complete type scale mapped to clear roles; hierarchy carried by size +
  weight (not color/decoration); optical tracking (tighter as size grows).
- [U] Line-height appropriate per role (display/headline tight; body generous).
- [H] Cross-check coverage against M3 roles (Display/Headline/Title/Body/Label L/M/S)
  — confirm no missing role and a deliberate "emphasized" (heavier) tier exists.
- [P] Source Serif 4 for prose + headings, IBM Plex Sans for chrome/figures/labels,
  bounded 65ch measure, 17px prose, generous leading. (Craft: is the pairing
  consistent? tracking tuned? the masthead/rung hierarchy unambiguous?)

**18–19 requires:** every text role is covered and consistently applied; tracking
+ leading are tuned per size; serif/sans split is followed everywhere with no
leaks; one clear title-per-fold; KaTeX optically aligned with the serif.

## Front 3 — Layout, grid & spacing

**Rules.**
- [U] Strict 8 dp grid (4 dp half-step only for icon-label pairs); consistent
  paddings, gaps, and section rhythm; nothing off-grid.
- [U] Clear alignment spines; margins/gutters consistent and intentional.
- [H] Apply M3 margin/gutter conventions per window class (compact/medium/expanded).
- [P] Bounded reading column + rail-as-margin structure.

**18–19 requires:** every spacing value resolves to the grid; one masthead spine;
consistent card padding and inter-section rhythm site-wide; margins scale sensibly
across breakpoints.

## Front 4 — Adaptive / responsive

**Rules.**
- [H] Formal **window-size classes**: compact (<600 dp), medium (600–839 dp),
  expanded (840 dp+). Every surface audited at all three.
- [U] Content **reflows, never hides**; touch targets and type scale adapt; no
  horizontal scroll, no clipped content, no overlap at any width.
- [H] A real **medium/tablet** layout (today's gap: only a 900px desktop split +
  mobile). Canonical list-detail thinking for rail + content.
- [P] Desktop-primary, but must not break or degrade on medium/compact.

**18–19 requires:** home + notion + 404 all hold cleanly at compact, medium, and
expanded; the rail/content relationship adapts gracefully at medium; no reflow
breakage, clipping, or overlap in either theme.

## Front 5 — Elevation & depth

**Rules.**
- [U] A consistent, legible depth hierarchy (rest < hover < floating < overlay);
  one elevation logic across the app.
- [H] **Tonal-surface + shadow** elevation (M3): surfaces step in tone as they
  rise, *with* the shadow — depth reads even where shadows are subtle.
- [P] Shadow-first hairline cards (no drawn borders), warm shadows in light, warm
  inset top-edge luminance in dark. (Craft: do cards read lifted-not-boxed in both
  themes? is the ring/shadow tuned, not muddy?)

**18–19 requires:** every elevated surface uses the scale (no one-off shadows);
tone + shadow agree on depth; light and dark both read with crisp, lifted cards.

## Front 6 — Shape

**Rules.**
- [U] A rationalized corner-radius scale; per-component radius is consistent and
  intentional (focus outline radius matches host).
- [H] Map our radii to M3's shape logic (xs/s/m/l…); nesting radii are concentric.
- [P] Gentler max radius (no 28 dp+ pills) suiting the editorial register.

**18–19 requires:** one coherent radius system; no mismatched corners (button vs
focus vs inner content); nested elements use concentric radii.

## Front 7 — Motion

**Rules.**
- [U] Easing + duration come from tokens (no ad-hoc ms/curves); `prefers-reduced-
  motion` fully honored everywhere.
- [H] Adopt M3 **transition patterns in no-overshoot form**: fade-through
  (unrelated view changes), shared-axis (peer nav), container-transform (the embed
  expand-in-place). Built from our existing easing tokens.
- [P] No bounce/overshoot anywhere; learner-paced beat motion (no autoplay/scroll-
  trigger); no ripple. (Craft: is motion meaningful, continuous, and calm?)

**18–19 requires:** every transition uses a named pattern + a token curve/duration;
view/route/embed transitions feel continuous and considered; reduced-motion is
flawless; nothing bounces, autoplays, or ripples.

## Front 8 — Interaction states & feedback  *(the biggest rigor win)*

**Rules.**
- [H] A **systematic state-layer model**: defined hover / focus-visible / pressed /
  dragged / disabled treatments (warm accent/on-color overlays following M3 opacity
  logic — hover ~8%, focus/pressed ~10%, dragged ~16%, disabled ~38%), applied
  **uniformly across every interactive element** (buttons, options, rail, stepper,
  header links, embed toggle, cards). Replaces today's ad-hoc per-component feedback.
- [U] Every interactive element has visible, distinct hover/focus/pressed/disabled;
  focus-visible is keyboard-only and unmistakable.
- [P] Feedback is overlay + shadow + (rarely) scale — **never ripple**.

**18–19 requires:** one consistent state language across the whole app; every
control responds identically in spirit; focus is jewel-clear; disabled is
unmistakable; zero components left on bespoke ad-hoc feedback.

## Front 9 — Iconography

**Rules.**
- [H] One consistent icon system — **Material Symbols** tuned to our stroke
  (weight/grade/optical-size) *or* a rationalized in-house set with one stroke
  language — sized on the 4 dp grid (20/24… dp), `currentColor`.
- [U] Icons are consistent in weight, corner, and metaphor; decorative icons are
  `aria-hidden`; meaningful icons have labels.
- [P] Minimal, quiet, never decorative clutter.

**18–19 requires:** every glyph shares one stroke weight + optical language;
consistent sizes; no mismatched ad-hoc SVGs; semantics correct.

## Front 10 — Accessibility

**Rules.**
- [U] WCAG 2.2 AA contrast (both themes); 48 dp touch targets; visible focus;
  full keyboard operability; `prefers-reduced-motion`; color-not-alone; 200% text
  zoom without breakage; correct ARIA/roles/landmarks; live math as text.
- [P] We already meet/exceed (larger focus ring + halo; reduced-motion preserves
  learner control). Verify nothing regresses across new surfaces + mechanisms.

**18–19 requires:** every checklist item verified on home + notion + 404 in both
themes and all breakpoints; state-layer + new icons keep contrast; 200% zoom clean.

## Front 11 — Content & writing

**Rules.**
- [H] M3 content principles — concise, second-person, scannable, present tense,
  no shouting (exclamation restraint), no needless punctuation/parentheses —
  **adapted to French typographic convention** (guillemets « », thin spaces before
  `; : ! ?`, French capitalization), **not** blind English sentence-case.
- [U] Labels/buttons are clear, consistent verbs; empty/loading/error copy is calm
  and helpful; terminology is consistent.
- [P] French-first warm tutor voice (calm, patient, never hype).

**18–19 requires:** all chrome/label/button/caption copy is concise, consistent,
French-correct, calm, and second-person; no shouting, no stray punctuation,
consistent terminology across the site.

## Front 12 — Component quality & consistency

**Rules.**
- [U] Every component meets the state model (Front 8), the elevation logic (Front
  5), token-only styling, and the a11y floor (Front 10); peers are consistent
  (two cards look like one family; two eyebrows are one component).
- [P] Calm-core component behavior (no theater).

**18–19 requires:** no component is an outlier; shared patterns are shared
components (Eyebrow, card, button, option); states/elevation/tokens consistent
across the whole library.

## Front 13 — Overall cohesion / "Google-feel"

**Rules.**
- [U] The Google pillars: **simple, fast, beautiful, intentional, user-centered** —
  restraint with purpose, clear hierarchy, meaningful motion, nothing accidental.
- [U] The whole reads as **one systematic, considered** product — not a set of
  individually-polished screens.
- [P] Calm, editorial, scholarly — our register, executed to a systematic bar.

**18–19 requires:** home, notion, and 404 feel like one system; every choice reads
as intentional; the product feels systematic *and* warm; a designer would call it
"considered," and a Google reviewer would call it "rigorous."

---

## Scorecard template (emitted each round)

| # | Front | Score /20 | Top weakness (file:line) | Fix |
|---|-------|-----------|--------------------------|-----|
| 1 | Color | | | |
| 2 | Typography | | | |
| 3 | Layout/grid/spacing | | | |
| 4 | Adaptive/responsive | | | |
| 5 | Elevation/depth | | | |
| 6 | Shape | | | |
| 7 | Motion | | | |
| 8 | Interaction states | | | |
| 9 | Iconography | | | |
| 10 | Accessibility | | | |
| 11 | Content/writing | | | |
| 12 | Component quality | | | |
| 13 | Overall cohesion | | | |

**Done = every row ≥ 18** (push 19+), calm-load critic passes (blocking), and the
human approves the whole-site set.
