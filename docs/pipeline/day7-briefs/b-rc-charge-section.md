# Brief (b) — author one template-v2 lesson section: dipôle RC, la charge

**Task.** Start the notion `content/pc/rc-charge/` (« Dipôle RC — réponse à
un échelon de tension », 2ème Bac PC, the chapter that precedes the RLC
free-oscillations chapter) by authoring ONE lesson section: **the mechanism
rung — why the capacitor's charge slows as it fills** (qualitative mechanism
through to the differential-equation setup; the time-constant intuition
τ = RC belongs here, its formal derivation does not).

**Scope is section-level, deliberately.** You are NOT building the full
notion apparatus — no items.yaml, no checkpoints, no exercises, no
misconception ledger, no media assets. One `## R<n> — <title>` section in a
new `lesson.md` (with the notion's `# h1` title line above it), sized like
one rung of the existing RLC lesson. The boxes you are building to:

- **Voice** — tu/on tutor register, written to be spoken.
- **Mechanism-why** — every relation carries its "pourquoi c'est vrai";
  a student asking « mais pourquoi ? » finds the answer in the rung.
- **Reasoning-annotation** — any worked step exposes the expert's decision,
  not just clean algebra.
- **Display-math discipline** — see the template; chained one-line algebra
  is a failure.

**Governing docs (read in this order):**

1. `docs/pipeline/NOTION-TEMPLATE-V2.md` — the boxes above are defined
   there; build until yours are checkable.
2. `docs/pipeline/EXEMPLARS.md` — gold-standard executions to imitate.
3. `content/pc/rlc-serie/lesson.md` — the house grammar in situ (section
   shape, math conventions, French orthotypography). Note it references
   « le chapitre condensateur » / « le circuit RC » — your section is from
   that chapter, so stay consistent with how RLC leans on it.
4. `docs/product/VISION.md` L48–96 (the notion anatomy your section serves).

**Physics guardrails (cadre):** 2ème Bac PC level. Charging a capacitor
through a resistor from an ideal DC source: loop law, i = dq/dt, q = C·u_C,
the differential equation RC·du_C/dt + u_C = E. No complex impedances, no
Laplace, nothing beyond the national program.

**Deliverables.**

- `content/pc/rc-charge/lesson.md` — `# Dipôle RC — réponse à un échelon de
  tension` + your single `## R<n> — …` section.

**Acceptance boxes:**

- [ ] `cd web && npm run build` passes and `/notions/pc/rc-charge` renders.
- [ ] The four boxes above are checkable against your text (be ready to
      cite line numbers).
- [ ] No invented sourcing, no references to assets that don't exist
      (enhancement slots must be explicit comments, per the template).
- [ ] French orthotypography (curly apostrophes; the pipeline handles
      spacing — don't hand-insert U+202F).

**Report back:** the section you wrote, which rung number you chose and
why, per-box line citations, and any question the docs should have
answered but did not.
