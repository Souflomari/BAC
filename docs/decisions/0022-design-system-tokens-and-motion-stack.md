# ADR 0022 — Design-system craft layer + the GSAP/Framer motion stack + beat-spec architecture

**Status.** Accepted, 2026. Triggered by the human's editorial review of the rendered
`rlc_serie` notion: the content is correct and converged, but the UI "still doesn't feel
professional — not Google-grade, not Apple-grade," the motion is "images that appear after
images" (not animated), and stepped figures overlap ("writing over writing"). This ADR
settles the missing craft layer and the motion technology so they are not re-litigated.

**Relates to.** VISION, RULES, DESIGN-BIBLE (this discharges the DESIGN-BIBLE appendix's
explicitly-deferred "concrete tokens — the first concrete step of building the UI, not yet
settled"). ADR 0016 (Next.js frontend), ADR 0017 (visual-sourcing taxonomy — reaffirmed),
ADR 0020 (agent roster), ADR 0021 (motion/video tooling — **partially superseded**, see
Retractions). Living references: `docs/design/TOKENS.md`,
`docs/design/MOTION-CHOREOGRAPHY.md`, `docs/design/COMPONENT-STATES.md`.

---

## Context

The DESIGN-BIBLE is principles-strong (calm core, no engagement theater, restrained
palette, motion-serves-comprehension) but **silent on the craft layer** that separates a
"correct/templated" UI from an Apple/Google/TED-Ed-grade one: concrete design tokens, a
depth/elevation language, component interaction states, and micro-motion choreography. Its
own appendix flags the concrete tokens as the not-yet-settled first build step.

Two concrete defects also surfaced. (1) **Motion is not animation.** The `MotionDiagram`
component toggled `display:none` on cumulative `<g id="step-N">` groups with a 350ms opacity
fade — no draw-on, tween, morph, or continuous motion. (2) **Overlap.** The `*.motion.svg`
files placed cumulative content at fixed absolute Y-coordinates that pile up under a blunt
`max-height` cap, clipping and overprinting earlier content.

ADR 0021 sanctioned **Manim** as the coded-motion tool. Manim renders to **video**, which is
wrong for *in-product, learner-paced, click-to-advance* motion (no interactivity, can't pause
a beat, large files, can't co-exist with live KaTeX). A web-native, interactive motion stack
is required.

## Decision

1. **Settle the concrete craft layer as living references + tokens.** Create and maintain
   `docs/design/TOKENS.md` (canonical tokens), `docs/design/MOTION-CHOREOGRAPHY.md` (the
   motion-craft + authoring contract), and `docs/design/COMPONENT-STATES.md` (interaction
   states). Implement the new tokens in `web/src/app/globals.css` + `web/tailwind.config.ts`:
   a **5-step elevation scale** (tinted shadows in light, layered-luminance in dark), two
   craft easing curves added to the existing set, a shared `focusRing` utility, measure
   tokens, and a **single figure palette unified with the app tokens** (the motion SVGs had
   drifted to a foreign warm palette). This discharges the DESIGN-BIBLE appendix's open item.

2. **In-product motion stack = GSAP 3 (Core + DrawSVGPlugin + MorphSVGPlugin, free since
   2025) + Framer Motion (motion-react).** GSAP owns the SVG beat timelines (draw-on,
   fills, pathLength traces, KaTeX-term assembly, morphs); Framer Motion handles React-state
   entrances and section/page transitions. Dynamically imported in the client engine so they
   never enter the server bundle. This **supersedes ADR 0021's "motion → Manim" for
   in-product motion** (see Retractions).

3. **Declarative beat-spec architecture (data, not bespoke code).** A generic client engine,
   `web/src/components/notion/MotionStage.tsx`, plays a declarative **beat spec**
   (`content/<subject>/<slug>/media/<slug>.motion.json`) over an inline SVG with stable
   element ids. Each beat is a paused GSAP timeline of typed tweens (`draw`, `fill`, `trace`,
   `assemble`, `fade`, `morph`, `pulse-settle`, terminal `settle`). "Suivant" plays the beat,
   it settles, and waits — no autoplay/scroll-trigger/timer (preserves the click-to-advance
   contract + DESIGN-BIBLE §5/§7). Reduced-motion → final settled state, zero duration.
   `motion-author` authors the SVG (stable ids) + the `.motion.json` data; the engine is
   built once and reused across notions.

4. **Layout discipline is the standing overlap fix.** Beat specs declare a layout model —
   `reserved-regions` (default: disjoint named rectangles, two beats cannot write to
   overlapping bands), `replace` (a slot holds exactly one current equation/annotation/
   verdict; new content replaces prior in-place), or `reflow` (rare; engine measures bboxes
   and animates the viewBox). The blunt `max-height` cap is dropped; the SVG renders at its
   true viewBox/aspect. Overlap becomes structurally impossible, not a per-clip hazard.

5. **Gemini atmospheric usage (reaffirms ADR 0017).** Generated imagery is permitted only as
   a low-opacity **atmospheric/illustrative backdrop**, never for structural/exact content
   (circuits, equations, traces, labels stay coded — the garbled-tree smoke test stands).
   Used at the orchestrator's discretion where it adds value, **gated by the calm-load
   critic** (cut if it competes for attention).

## Consequences

- The visual-design / ergonomics / calm-load / coherence critics now judge against concrete
  references (`docs/design/*.md`), not prose alone — the "premium" bar becomes checkable.
- `motion-author` is redirected from Manim to authoring **beat-spec data + stable-id SVGs**;
  its agent file and the ROSTER entry are updated accordingly.
- New frontend dependencies (`gsap`, `@gsap/react`, `framer-motion`) enter `web/package.json`.
  This is content-lane (the file-based app, deployed to the **preview**); production/DB stay
  human-gated.
- "Premium" is defined as **considered craft** (depth, easing, typography, micro-interaction),
  NOT engagement theater — the calm-load critic remains the adversary; no confetti/streaks/XP/
  ambient motion ever enters the learning core.

## Retractions and Corrections

- **Supersedes ADR 0021, Decision 1's "coded motion → Manim" line for *in-product* motion.**
  In-product, learner-paced click-to-advance motion is now GSAP + Framer Motion via the
  beat-spec engine (Decisions 2–3 above). Manim is retained **only** as a future option for
  pre-rendered explainer *video* (a non-interactive "watch this" clip), should one ever be
  wanted — not for the interactive learning core. All other ADR 0021 decisions (the
  coded-vs-generated hard line, Gemini-atmospheric-only, PhET POC, Veo intuition-only) stand.
