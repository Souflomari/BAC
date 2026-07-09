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
| M1 | maths | calcul-integral, denombrement, derivabilite-etude-fonctions, equations-differentielles, fonction-exponentielle | done (16 STAGE / 18 DECLINE, 16 figures, validated, dom-truth 155/155) |
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

### Wave M1 — maths: calcul-integral, denombrement, derivabilite-etude-fonctions, equations-differentielles, fonction-exponentielle

**Judgment** (pedagogy-architect × 5):

| Lesson | Chapter | Verdict | Reason / slug |
|---|---|---|---|
| calcul-integral | R0 | DECLINE | predict-first hook, payload delivered by existing R1 figure |
| calcul-integral | R2 | DECLINE | linearity proved purely symbolically, no load-bearing graph |
| calcul-integral | R3 | STAGE | `chasles-decoupage-aire` — Chasles area-splitting, graph auto-staged |
| calcul-integral | R4 | STAGE | `comparaison-aires-nichees` — nested-region comparison, graph |
| calcul-integral | R5 | STAGE | `inegalite-moyenne-rectangles` — sandwiched-rectangles, graph |
| calcul-integral | R6 | STAGE | `valeur-moyenne-rectangle` — equal-area flattening, graph |
| calcul-integral | R7 | DECLINE | IPP is pure symbolic method, no area to read |
| calcul-integral | R9 | DECLINE | practice chapter, would duplicate R1/R6/R8 gestures |
| denombrement | R0 | DECLINE | narrative hook, deliberately withholds the count until R2 |
| denombrement | R2 | STAGE | `p-liste-cadenas` — slot diagram, replacement-invariance gesture |
| denombrement | R3 | STAGE | `arrangement-reservoir` — depleting-reservoir contrast to R2 |
| denombrement | R4 | DECLINE | permutation is p=n endpoint of R3's mechanism, no new gesture |
| denombrement | R6 | STAGE | `triangle-pascal` — triangle built by its own recurrence relation |
| denombrement | R7 | STAGE | `urne-deux-couleurs` — two-color urn, confronts ET/× misconception |
| denombrement | R8 | DECLINE | practice chapter, reuses R7's two-pool decomposition |
| derivabilite-etude-fonctions | R0 | DECLINE | secant/tangent gesture already staged one chapter later at R1 |
| derivabilite-etude-fonctions | R2 | STAGE | `regle-produit-aire` — product-rule area construction, confronts (uv)'=u'v' misconception |
| derivabilite-etude-fonctions | R3 | DECLINE | chain rule intuition already stated vividly by gear analogy in prose |
| derivabilite-etude-fonctions | R5 | STAGE | `etude-fonction-rationnelle` — full-study graph, culminating méthode complète |
| derivabilite-etude-fonctions | R6 | DECLINE | practice chapter, student produces the table themselves (AttemptFirst) |
| equations-differentielles | R0 | STAGE | `refroidissement-modeles` — predict-then-reveal, constant-rate vs decay graph |
| equations-differentielles | R1 | DECLINE | algebraic uniqueness proof, family-of-curves already at R3 |
| equations-differentielles | R2 | DECLINE | palier-family visualization already carried by R3's existing figure |
| equations-differentielles | R4 | STAGE | `oscillateur-periode` — period/amplitude read on y''+ω²y=0 solution |
| equations-differentielles | R5 | STAGE | `rc-charge-decharge` — RC charge/discharge palier contrast |
| equations-differentielles | R6 | DECLINE | practice chapter, would pre-solve or duplicate R4/R5 |
| fonction-exponentielle | R0 | DECLINE | predict-first hook, spoils R1's reciprocity reveal |
| fonction-exponentielle | R1 | STAGE | `exp-reciproque-de-ln` — two-track number-line reciprocity diagram |
| fonction-exponentielle | R2 | DECLINE | pure algebraic property-building, no structural layers |
| fonction-exponentielle | R3 | DECLINE | derivative established algebraically, geometry owned by R5 |
| fonction-exponentielle | R4 | STAGE | `exp-au-dessus-de-x-plus-1` — global inequality e^x ≥ x+1, graph |
| fonction-exponentielle | R6 | DECLINE | antiderivative pattern-matching, no structural content |
| fonction-exponentielle | R7 | DECLINE | procedural equation-solving by injectivity |
| fonction-exponentielle | R8 | STAGE | `etude-f-e-x-plus-x-moins-2` — TVI existence/uniqueness graph |

**Wave M1 judgment tally: 16 STAGE / 18 DECLINE** (34 chapters judged).

**Build** (diagram-author × 5):

| Lesson | Figure slug | Chapter | Stages |
|---|---|---|---|
| calcul-integral | chasles-decoupage-aire | R3 | 3 |
| calcul-integral | comparaison-aires-nichees | R4 | 3 |
| calcul-integral | inegalite-moyenne-rectangles | R5 | 3 |
| calcul-integral | valeur-moyenne-rectangle | R6 | 3 |
| denombrement | p-liste-cadenas | R2 | 3 |
| denombrement | arrangement-reservoir | R3 | 3 |
| denombrement | triangle-pascal | R6 | 3 |
| denombrement | urne-deux-couleurs | R7 | 3 |
| derivabilite-etude-fonctions | regle-produit-aire | R2 | 4 |
| derivabilite-etude-fonctions | etude-fonction-rationnelle | R5 | 5 |
| equations-differentielles | refroidissement-modeles | R0 | 4 |
| equations-differentielles | oscillateur-periode | R4 | 3 |
| equations-differentielles | rc-charge-decharge | R5 | 3 |
| fonction-exponentielle | exp-reciproque-de-ln | R1 | 4 |
| fonction-exponentielle | exp-au-dessus-de-x-plus-1 | R4 | 4 |
| fonction-exponentielle | etude-f-e-x-plus-x-moins-2 | R8 | 4 |

**Verification:**
- `validate-content.mjs content/maths/<slug>` — pass ×5 (all clean)
- anti-contract grep (`#[0-9a-fA-F]{3,6}|currentColor|foreignObject`) — pass ×5 (all clean)
- `npm run build` — clean
- `dom-truth.mjs` — 155/155, 0 fail
- screenshot spot-check (light+dark) — `denombrement` R6 `triangle-pascal`: renders correctly both themes, construction-rule feeder arrows and symmetry axis read clearly

**Commit:** pending (this wave commits together with this ledger update).

**Running tally: 5/47 lessons done, 34/266 chapters judged, 16 STAGE / 18 DECLINE.**

