# RLC design pass — brief (from the first editorial review)

> **What this is.** The reviewer's editorial feedback on the rendered
> `rlc_serie` notion, turned into a concrete brief for the **design pass** —
> the first time the design/experience layer (layout, motion, figure-driven
> explanation, a better interactive, in-lesson practice) is built, and the
> first time the **wave-2 critics** fire (ADR 0020, ADR 0021). The wave-1
> content/pedagogy is sound and stays; this pass adds the layer on top.
>
> **Reference the reviewer gave.** The *Imprint* app (figure-first, one-idea-
> per-card, animated dot-distributions) and *TED / Crash Course* explainer
> style — for **figure-craft and attention-holding**. **Hard constraint:** do
> NOT become a shallow microlearning app. The target is Imprint's craft *with*
> our depth. The calm-load critic is the adversary that polices this balance.

---

## Design targets (the remarks, made actionable)

1. **Layout — use the width; look finished.** The narrow centered column with
   large empty sides reads as unprofessional. Fix with the standard pattern:
   **prose at a readable measure, but figures / interactives / motion break to
   full width**, plus an optional margin rail (progress, "where am I"). Calm
   reading is kept (DESIGN-BIBLE §1) — the empty-canvas feel is what changes.
   *Owner: frontend-builder + visual-design-critic + ergonomics-flow-critic.*

2. **Motion — figures should move.** Static figures "stall" and don't hold
   attention. Add **coded motion** (Manim/CSS) to the key figures: the energy
   pendulum (C↔L exchange), the regime traces forming, the loi-des-mailles
   build. Reduced-motion-safe. *Owner: motion-author + diagram-author.*

3. **Figure density — lighter, progressive, not "charged."** The current
   diagrams are correct but ask the student to decipher a lot at once. Break
   dense figures into **progressive reveals** (one idea at a time) rather than
   one packed schematic. *Owner: diagram-author + pedagogy-architect.*

4. **Derive the equations, don't assert them.** e.g. *where does `u_C = q/C`
   come from?* Show it (Crash-Course/TED intuition + a coded derivation).
   Pair with target 5. *Owner: content-author + motion-author + pedagogy-architect.*

5. **Derive WITH the figure.** At R2 ("écrire la loi des mailles"), a labelled
   schematic shows where `u_C`, `u_L`, `u_R` sit, and the equation is **built
   term-by-term on the picture** so the student sees what each symbol is.
   *Owner: diagram-author + content-author (+ motion-author for the build).*

6. **Interactive — clearer, with graphs.** Falstad does not land. Replace with
   a **PhET embed** (Circuit Construction Kit: AC) as the POC (ADR 0021), with
   guidance/captions and CC-BY attribution; the long-term target is a custom
   build with a clean `u_C(t)` trace + energy view. *Owner: interactive-author.*

7. **Practice during the lesson.** Interleave a few **checkpoint questions**
   inside the lesson (not all items at the end) so the student practices as he
   goes. *Owner: pedagogy-architect (placement) + item-author + frontend-builder.*

## Explicitly deferred (reviewer's call: "after I've reviewed everything")

- **Decomposing the chapter into inner sub-chapters / concept units.** Do this
  *after* the full review, once the whole notion is seen. Not in this pass.
- A full ElevenLabs narration track (ADR 0021 leaves narration undecided).

## Generated-video (Veo) usage in this pass

Per ADR 0021: at most **one or two short atmospheric/intuition clips** (e.g.
the "balancement" felt-intuition before the math). **Never** load-bearing —
no derivation, no exact structure, no fake interactive in a Veo clip.

## Sequence

- **A. Records (done):** ADR 0021; this brief.
- **B. Re-spec:** pedagogy-architect revises the `rlc_serie` spec for
  derive-with-figure beats, progressive figures, motion callouts, checkpoint
  placements; frontend-builder establishes the new layout/shell.
- **C. Produce (parallel):** motion-author (coded animations), diagram-author
  (progressive + labelled-build figures), interactive-author (PhET POC),
  content-author (trim density, derive equations, checkpoint prompts),
  item-author (in-lesson checkpoints), Veo lane (1–2 intuition clips).
- **D. Render:** frontend-builder — new layout, motion components, video embed,
  PhET embed, inline checkpoints.
- **E. Evaluate:** wave-1 (bac-fidelity, pedagogy) **+ wave-2 for the first
  time** (visual-design, ergonomics-flow, calm-load, coherence). Convergence
  loop with the same cap/thrash check.
- **F. Re-review** by the human.
