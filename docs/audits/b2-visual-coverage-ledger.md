# B2 — Visual Coverage Fan-Out Ledger

**Status:** IN PROGRESS. Sibling to `docs/audits/fable-day3-ledger.md`,
scoped strictly to Part B2 of the chapter-level visual-coverage campaign —
building StagedFigures for the 47 lessons remaining after the B1 pilot
(maths ×13 / pc ×24 / svt ×10, 266 gap chapters). Contract:
`docs/design/LESSON-EXPERIENCE-SPEC.md` §2.5 — every verdict below traces
to a §2.5 clause (graph → always staged; schema/diagram → ≥3 layers +
genuine teaching gesture; trivial/narrative → whole prose, honest decline).

**Precedent (B1 pilot):** commits `1911aa2` (svt/theorie-tectonique-plaques),
`7432db8` (svt/theorie-tectonique-plaques, corrected below), `97255f0`
(pc/lois-de-newton), plus the maths/arithmetique commit. 23 chapters
judged, 15 STAGE / 8 DECLINE, `validate-content.mjs` clean,
`dom-truth.mjs` 155/155, screenshots confirmed light+dark. Human approved
proceeding to B2 fan-out ("OK, proceed").

**Out of scope:** philosophie (11 lessons, 84 chapters) — deliberate
zero-visual decision, `docs/audits/fable-day3-ledger.md` §16. Not touched
by this campaign.

**Update discipline:** this ledger is appended after EVERY wave closes,
not just at the end (`docs/pipeline/post-fable-work-order.md` Item 3's own
rule, carried forward here).

**Structural flags carried into every relevant wave's agent prompts:**
- `content/maths/probabilites-conditionnelles/lesson.md` (wave M3): R1–R5
  are nested `### ` headings under one `## Décortiquer` container, not flat
  `## R<n>`.
- `content/pc/rlc-serie/lesson.md` (wave P4): has an anomalous
  `R9 — Variation fraîche` (an `[[exercise:]]` stub, no prose) — judged on
  its own merits, not assumed STAGE or DECLINE.
- SVT capstone "Pour t'entraîner" chapters (waves S1/S2) are NOT exempt by
  convention — every capstone is judged normally.

---

## Wave plan

| Wave | Matière | Lessons | Status |
|---|---|---|---|
| M1 | maths | calcul-integral, denombrement, derivabilite-etude-fonctions, equations-differentielles, fonction-exponentielle | pending |
| M2 | maths | fonction-logarithme, geometrie-espace, limites-continuite, nombres-complexes-1 | pending |
| M3 | maths | nombres-complexes-2, probabilites-conditionnelles, structures-algebriques, suites-numeriques | pending |
| P1 | pc | aspects-energetiques, atome-mecanique-newton, chute-mouvements-plans, controle-catalyse, decroissance-radioactive | pending |
| P2 | pc | dipole-rl, electrolyse, esterification-hydrolyse, etat-equilibre, evolution-spontanee | pending |
| P3 | pc | noyaux-masse-energie, ondes-em-modulation, ondes-mecaniques-periodiques, ondes-mecaniques-progressives, piles | pending |
| P4 | pc | propagation-onde-lumineuse, rc-charge, reactions-acido-basiques, rlc-serie, rotation-axe-fixe | pending |
| P5 | pc | suivi-temporel-vitesse, systemes-oscillants, transformations-deux-sens, transformations-lentes-rapides | pending |
| S1 | svt | chaines-de-montagnes, dysfonctionnements-immunitaires, genetique-humaine, genetique-populations, granitisation-deformation | pending |
| S2 | svt | liberation-energie-matiere-organique, moyens-de-defense, role-enzymes, soi-non-soi, transmission-caracteres | pending |

---

## Wave log
