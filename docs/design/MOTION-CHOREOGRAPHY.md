# Motion Choreography — Authoring Contract

> **Authority:** ADR 0022. This document is what the `motion-author` agent
> reads before authoring any beat spec or SVG. It defines the vocabulary,
> rules, layout discipline, and prohibitions. The generic engine that plays
> these specs is `web/src/components/notion/MotionStage.tsx` (built in
> Phase 2). This contract governs both documents.
>
> **Token references:** `docs/design/TOKENS.md`. All colors must come from
> the figure palette; all durations from the token scale.

---

## 0. The one principle: motion serves comprehension, never decoration

Every animation in this product must do at least one of:
- Provide feedback to a learner action
- Guide attention to the next idea
- Show a physical process or state change that would be hard to convey statically

If an animation is not doing one of the three, it does not exist.
The best motion often goes unnoticed — it just makes things feel coherent.

---

## 1. Beat-verb vocabulary

A beat is a unit of choreography: one primary motion that plays when the
learner clicks "Suivant," settles to a stable end-state, and pauses.
Each beat is typed by its verb.

### `draw`

**What:** Strokes a path on-screen via DrawSVGPlugin (pathLength 0→1).
**Use for:** Circuit wires, arrows, axis lines, signal traces being drawn
on a graph.
**Ease:** `power2.out` (GSAP) / `ease-standard-svg` (CSS fallback).
**Duration:** scales with path length — 500ms for ~200px, 800ms for full
width. Never exceed 900ms.
**End state:** stroke fully visible at 100% pathLength.

### `fill`

**What:** A bar, area, or enclosed region grows from 0 to its target
dimension (height or width, depending on orientation).
**Use for:** Energy bars ($E_C$, $E_L$), histogram fills, shaded regions.
**Ease:** `power2.out`.
**Duration:** 400–700ms, scaling with final magnitude.
**End state:** bar/area at its target value, stable.

### `trace`

**What:** A curve is drawn left-to-right via pathLength animation.
Semantically distinct from `draw` in that `trace` implies a time-domain
process unfolding (a waveform appearing as if written by an oscilloscope).
**Use for:** Oscillation waveforms, regime traces (periodic/pseudo/aperiodic).
**Ease:** `power2.out` with a very slight easeIn leading edge to mimic
physical pen momentum (0.1 of total duration as ease-in, remainder ease-out).
**Duration:** 600–900ms.
**End state:** full waveform visible.

### `assemble`

**What:** A staggered entrance of KaTeX math terms or diagram labels.
Each element fades in and rises ~8px (no X travel), staggered 60–90ms
between elements.
**Use for:** Building an equation term by term; labeling a diagram
progressively.
**Ease per element:** `emphasized` (`cubic-bezier(0.2, 0, 0, 1)`).
**Duration per element:** 350ms.
**Stagger:** 70ms between elements (adjust to 60ms for >6 elements, 90ms
for ≤3 elements).
**End state:** all assembled elements fully opaque, at rest position.

### `fade`

**What:** An element transitions opacity 0→1 (in) or 1→0 (out), optionally
with a directional displacement.
**Parameters:** `from` direction — `above` (element falls 8px into place),
`below` (rises 8px), `left`, `right` (8px travel), or `none` (pure fade).
**Use for:** Equation result reveals, callout boxes, annotation text.
**Ease:** `emphasized` for entering; `ease-leave` for departing.
**Duration:** 250ms (no displacement) to 400ms (with displacement).
**End state:** fully opaque at final position.

### `morph`

**What:** One SVG path shape transitions to another via MorphSVGPlugin.
Both paths must have the same number of points, or the engine will
auto-subdivide.
**Use for:** A component changing shape (e.g., a straight wire bending
into a coil, or one circuit topology becoming another).
**Ease:** `power2.inOut` (symmetric — no preferred direction for a
shape mutation).
**Duration:** 600–800ms.
**End state:** the target path, fully settled.

### `pulse-settle`

**What:** A one-shot highlight pulse — element briefly brightens/enlarges
then settles to a target opacity, color, or scale. **Not a loop.** Plays
once and stops.
**Use for:** Drawing attention to a completed label, a "this is the key
insight" moment, confirming a value is now set.
**Ease:** `power2.out` for the pulse peak; `power1.in` for the settle.
Total: a two-tween mini-sequence (0→peak→rest).
**Duration:** 300ms total (150ms up, 150ms settle).
**End state:** element at its stable final state (not at peak).

### `settle` (implicit terminal)

**What:** The final beat in every motion sequence. Not authored explicitly;
the engine appends it. All elements reach their definitive end states:
labels fully opaque, strokes fully drawn, bars at correct height. Nothing
moves after `settle`.
**Duration:** 0ms (state assertion, not animation).
**Purpose:** guarantees reduced-motion fallback can jump directly to settled
state at zero duration.

---

## 2. Choreography rules

### 2.1 Duration scales with travel distance and element size

- Small element moving ~8px: 250ms
- Medium element, standard state change: 400–600ms
- Large element, full-width stroke or trace: 700–900ms
- Default band for a single beat: **500–900ms**
- Hard ceiling for any single beat: **900ms** (learner cannot feel the beat
  is worth waiting for above this threshold)

### 2.2 Stagger for multi-element entrances

When multiple elements enter in the same beat (e.g., `assemble`):
- Stagger: 60–90ms between elements
- Start the stagger from the most semantically primary element
- Never fire all elements simultaneously (reads as "pop", not choreography)

### 2.3 One primary motion per beat

Each beat has exactly one verb as its primary motion. Secondary elements
(a label fading in alongside a `draw` stroke) are permitted but must be
subordinate — shorter duration, lower opacity delta, no competing trajectory.

### 2.4 Everything settles and pauses

Every beat ends in a paused GSAP timeline. The learner clicks "Suivant" to
advance. There is **no autoplay, no scroll-trigger, no timer**. The engine
waits indefinitely at each beat end-state.

### 2.5 Which eases to use by verb

| Verb | GSAP ease | CSS ease (SVG wrapper hover/fills) |
|---|---|---|
| `draw` | `power2.out` | `ease-standard-svg` |
| `fill` | `power2.out` | `ease-standard-svg` |
| `trace` | `power2.out` (with micro easeIn lead) | `ease-standard-svg` |
| `assemble` | `power3.out` (≈ `emphasized`) | `ease-emphasized` |
| `fade` (enter) | `power3.out` | `ease-emphasized` |
| `fade` (exit) | `power2.in` | `ease-leave` |
| `morph` | `power2.inOut` | `ease-between` |
| `pulse-settle` | peak: `power2.out`, settle: `power1.in` | — |

**Never use:** `elastic`, `bounce`, `back` (overshoot) ease families in GSAP,
or any `cubic-bezier` with `y1 > 1` or `y2 > 1`.

---

## 3. Layout discipline — the structural overlap fix

The blunt `max-height` cap and cumulative absolute-positioned SVG layers
that caused "writing over writing" are replaced by three named layout
models. Each clip declares its model in the `.motion.json` spec.

### `reserved-regions` (default)

**How it works:** The SVG viewBox is divided into named, disjoint rectangular
bands before authoring. Each beat writes to one or more named regions. Two
beats cannot write content to overlapping regions within the same stage.

```
Example viewBox 800×500, four regions:
  header:    { x:0, y:0,   w:800, h:60  }  — title / problem statement
  figure:    { x:0, y:60,  w:800, h:280 }  — circuit / graph / diagram
  equation:  { x:0, y:340, w:800, h:100 }  — working equations
  verdict:   { x:0, y:440, w:800, h:60  }  — result / conclusion label
```

**When to use:** Default for all clips. Most RLC figures (energy exchange,
circuit schematic build, regime overlay) fit cleanly into reserved regions.

**Author contract:** define regions first, in the `.motion.json` `layout.regions`
field. The engine validates that no beat's `targets` reference elements
outside their declared region.

### `replace`

**How it works:** A named slot holds exactly one current equation, annotation,
or verdict. When a new beat writes to the slot, the prior content fades out
first (250ms, `ease-leave`), then the new content fades in (`assemble` or
`fade`). The slot dimension is fixed; content within it may vary.

**When to use:** When the same logical "thing" (e.g., "the current equation
at this step") evolves through multiple beats without accumulating on screen.
The loi-des-mailles build (terms adding to one equation) is the canonical
`replace` use case.

**Author contract:** declare `layout.model: "replace"` and name the slot(s).
Each beat that writes to a slot must declare `slot: "<name>"`.

### `reflow`

**How it works:** The engine measures the bounding boxes of visible elements
after each beat, computes the minimal viewBox that contains them, and animates
the SVG's `viewBox` attribute to reframe. Use sparingly — the viewBox animation
is expensive and can feel unsettling if overdone.

**When to use:** Rare. Only when the diagram genuinely grows in a way that
cannot be anticipated in a fixed viewBox (e.g., a derivation that builds
progressively and cannot be pre-planned into a fixed grid). Always prefer
`reserved-regions` with generous pre-allocated space.

**Author contract:** declare `layout.model: "reflow"`. The engine will apply
smooth viewBox interpolation (`power2.inOut`, 400ms).

---

## 4. Hard prohibitions

These are architectural rules, not style preferences. A single violation is
a blocking critic issue.

1. **No bounce / overshoot / elastic.** No GSAP `elastic`, `bounce`, or
   `back` eases. No CSS `cubic-bezier` with control points outside `[0,1]`
   on the y-axis. Spring physics and confetti are game textures.

2. **No ambient / looping / idle motion.** Nothing moves unless the learner
   advanced a beat. No idle pulsing, no looping traces, no breathing
   animations. The SVG is static between beats.

3. **No autoplay.** The engine does not advance beats on a timer or on scroll
   intersection. All advancement is explicit learner action (click / key).

4. **No motion that competes with reading.** If the learner is reading an
   adjacent prose block, the figure is static. Motion plays only in the
   figure's own beat sequence, on demand.

5. **Reduced-motion fallback.** When `prefers-reduced-motion: reduce` is
   reported, the engine skips to the final `settle` state at zero duration
   for every beat. The Suivant/Précédent controls remain functional (they
   advance between settled states) but no animation plays. This is tested as
   part of every clip's QA.

---

## 5. Worked examples

### 5.1 Energy exchange clip (E_C and E_L bars)

**Physical concept:** In an undamped LC circuit, energy oscillates between
capacitor ($E_C$) and inductor ($E_L$) in antiphase. When one is maximum,
the other is zero.

**Layout model:** `reserved-regions`
```
regions:
  graph:    { x:0,   y:0,   w:400, h:400 }  — oscillation trace (left half)
  bars:     { x:420, y:0,   w:380, h:400 }  — energy bar chart (right half)
  equation: { x:0,   y:410, w:800, h:60  }  — current equation label
```

**Beat list:**
```
Beat 1 — "Introduire le circuit"
  verb: fade
  from: none
  targets: [#circuit-schematic]
  duration: 400ms

Beat 2 — "E_C plein, E_L nul (t=0)"
  verb: fill
  targets: [#bar-E_C]          — grows to 100% height, color: --figure-energy-C
  targets: [#bar-E_L]          — stays at 0% height
  verb: assemble
  targets: [#label-ec-max]
  duration: 600ms

Beat 3 — "Transfert vers L (t=T/4)"
  verb: fill
  targets: [#bar-E_C]          — shrinks 100%→0%, color: --figure-energy-C
  targets: [#bar-E_L]          — grows 0%→100%, color: --figure-energy-L
  verb: trace
  targets: [#trace-quarter]    — plots first quarter of oscillation on graph
  duration: 800ms

Beat 4 — "E_L plein, E_C nul"
  verb: pulse-settle
  targets: [#bar-E_L]          — brief highlight, settles at 100%
  verb: assemble
  targets: [#label-el-max]
  duration: 400ms

Beat 5 — "Retour (t=T/2)"
  verb: fill
  targets: [#bar-E_C]          — grows 0%→100%
  targets: [#bar-E_L]          — shrinks 100%→0%
  verb: trace
  targets: [#trace-half]       — extends trace to half-period
  duration: 800ms

[settle] — engine appends; all elements at definitive end state
```

### 5.2 Loi des mailles build (equation assembly via `replace`)

**Physical concept:** Kirchhoff's voltage law for an RLC series circuit:
$$e(t) = u_R + u_L + u_C$$

**Layout model:** `replace`, single slot named `equation-slot`

**Beat list:**
```
Beat 1 — "La source de tension"
  verb: fade, from: below
  targets: [#source-label]        — "e(t) ="
  slot: equation-slot
  duration: 300ms

Beat 2 — "Résistance"
  verb: assemble
  targets: [#term-uR]             — "+ u_R" assembles into equation-slot
  slot: equation-slot
  duration: 350ms

Beat 3 — "Bobine"
  verb: assemble
  targets: [#term-uL]             — "+ u_L"
  slot: equation-slot
  duration: 350ms

Beat 4 — "Condensateur"
  verb: assemble
  targets: [#term-uC]             — "+ u_C" — equation now complete
  slot: equation-slot
  duration: 350ms

Beat 5 — "Développer chaque terme"
  layout: replace (prior equation fades, new form assembles)
  prior: [#term-uR, #term-uL, #term-uC]  → fade out 250ms
  verb: assemble
  targets: [#eq-expanded]         — "Ri + L(di/dt) + q/C"
  slot: equation-slot
  duration: 600ms

Beat 6 — "Équation différentielle"
  layout: replace
  verb: assemble
  targets: [#eq-differential]     — "L(d²q/dt²) + R(dq/dt) + q/C = e(t)"
  slot: equation-slot
  duration: 600ms

[settle]
```

**Key point:** the `replace` model means Beat 5 does NOT add text below Beat 4's
equation. It fades out the prior state and replaces in the same slot. No overlap,
ever, by structural guarantee.
