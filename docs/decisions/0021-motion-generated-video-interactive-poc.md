# ADR 0021 — Motion, generated video, and the interactive POC (PhET)

**Status.** Accepted, 2026. Extends ADR 0017 (visual-sourcing taxonomy).
Triggered by the first human editorial review of a rendered notion
(`rlc_serie`), which surfaced the missing *experience* layer: motion,
figure-driven explanation, a clearer interactive, and a more finished
layout. Partially resolves CLAUDE.md open-decision #4 (generative-content
tooling) — the motion/video half. ElevenLabs narration remains undecided.

**Relates to.** ADR 0016 (Next.js frontend), ADR 0017 (visual-sourcing
taxonomy — this extends it), ADR 0020 (agent roster; `motion-author` and the
wave-2 critics are activated here). VISION + DESIGN-BIBLE (the calm core, the
no-engagement-theater line).

---

## Context

The `rlc_serie` notion converged through the WAVE-1 pipeline (content +
pedagogy correct, structural figures correct). The editorial review judged
the **content good** but the **experience flat**: static figures that
"stall," equations asserted rather than visibly derived, a circuit
interactive (Falstad) that did not land, and a narrow centered column that
read as unfinished. The reviewer pointed to the *Imprint* app (figure-first,
one-idea-per-card, animated) and to *TED / Crash Course* explainer style as
references — while explicitly **not** wanting to become a shallow
microlearning app. This ADR records the tooling decisions that the design
pass will build on.

## Decision

1. **Two motion modalities, both sanctioned, with different jobs.**
   - **Coded motion** (`motion-author`: Manim, or SVG/CSS animation) is for
     **exact** content — animated derivations (how `u_C = q/C` and the loi des
     mailles are built, term by term), the energy-pendulum exchange, the
     regime traces forming. Deterministic, version-controlled, exact, and
     `prefers-reduced-motion`-safe.
   - **Generated video** (Google **Veo**, via the Gemini media lane) is for
     **atmospheric / intuition / TED-style framing** clips only — the
     "balancement," the felt intuition before the math.

2. **The hard line (non-negotiable).** Generation **never substitutes** for:
   (a) a precise derivation, figure, or label where exactness matters — those
   are **coded** (reaffirms ADR 0017: the garbled probability tree proved
   generation cannot render exact structure or math); or (b) a **manipulable
   interactive** where manipulation *is* the pedagogy. Veo clips are intuition
   and atmosphere, never the precise core, and never a fake interactive. A
   generated asset that carries load-bearing content is a defect.

3. **Interactive POC = PhET embed; custom build = the target.** The design
   pass uses a **PhET** simulation (Circuit Construction Kit: AC is the
   closest fit) as the manipulable, as a **proof-of-concept** that proves the
   right interaction. The **long-term intent is to build our own** interactive
   (live `u_C(t)` trace + energy view) — not for licensing reasons (see 4) but
   for **design control** (no third-party brand in the calm core, no external
   hosting dependency) and **pedagogical fit** (PhET has no dedicated
   RLC-free-oscillation sim with a clean `u_C(t)` trace).

4. **PhET licensing finding (researched).** PhET HTML5 simulations are
   licensed **CC-BY 4.0**, which **permits commercial use** with attribution.
   Any embed MUST carry the attribution "Simulation by PhET Interactive
   Simulations, University of Colorado Boulder, licensed under CC BY 4.0" and
   keep the PhET logo visible and unaltered. The **PhET name/logo/brand is
   trademarked** and may **not** be used in our marketing/promotion/advertising
   without a separate license — so we embed sims, we do not brand the app with
   PhET. PhET-iO (the instrumented partnership product) is separately paid and
   is **not** used. Conclusion: PhET is commercially shippable here; the
   build-our-own intent is a design/fit choice, not a legal necessity.

5. **`motion-author` and the Veo lane are now ACTIVE.** This records the
   sanctioned uses and the hard line for the motion/video half of
   open-decision #4. ElevenLabs narration is still **not** decided — revisit
   when narration is actually needed.

## Consequences

- **ADR 0017's taxonomy is extended:** atmospheric → Gemini image / Veo;
  structural/labelled → coded `svg+katex`; **motion → coded (Manim/CSS) for
  exact content, Veo for intuition**; manipulable → embed (PhET POC → custom
  build). The "structural diagrams are coded, never generated" rule stands.
- **Wave-2 critics are now commissioned for the first time.** ADR 0020 staged
  them to fire *after* wave-1 converges once; `rlc_serie` has now converged, so
  `visual-design-critic`, `ergonomics-flow-critic`, `calm-load-critic`, and
  `coherence-critic` join the loop for the design pass. The **calm-load critic
  is the explicit adversary** that guards against the new motion/video becoming
  engagement-theater or microlearning — directly answering the reviewer's
  "hold attention, but do not become a microlearning app" tension.
- Every PhET embed renders the CC-BY attribution and preserves the PhET logo.
- The design pass treats the PhET interactive as **disposable** at the
  component boundary, so swapping it for the custom build later is a localized
  change.

## Retractions and Corrections

None.
