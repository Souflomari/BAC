# B4 — Items Coverage Fan-Out Ledger (≥3 questions per chapter)

**Status:** IN PROGRESS. The second track of the "question generator" campaign
(after B3 pilot). Goal: every lesson chapter (`## R<n>`) carries **≥3
diagnostic items** in `items.yaml`, keyed by `rung`, rendered inline per
chapter by the `ChapterQuestions` component (commit `74badaf`, the inline
per-chapter UI).

**Precedent (B3 pilot):** `maths/arithmetique` (`46ff296`) and
`pc/lois-de-newton` (`35e3f2f`) — each brought from 6 items to 27 (every
chapter to exactly 3), every distractor mapped to a named student
misconception. Human approved proceeding to fan-out ("ok, proceed"), chose
the **inline per-chapter UI** and **maths + pc + philo** scope.

**Out of scope (deferred by owner):** all **svt** lessons — the SVT content
trips Fable's guardrails ("the svt part launches fable guardrails, lets
continue with everything else, setting svt aside for now"). The svt items
design for `theorie-tectonique-plaques` was produced but NOT written/shipped.

**Method:** one `item-author` agent per lesson reads `lesson.md` + `items.yaml`,
tops up every chapter below 3 to **exactly 3** (only exceeding 3 when a
chapter has 3+ distinct high-value misconceptions), preserving all existing
items and matching the file's ID scheme + encoding convention. Each distractor
diagnoses a specific named error. R0 accroche chapters may take lighter
comprehension/prediction checks; synthesis chapters take application items.
Verify per lesson: `validate-content.mjs` clean + re-tally every rung ≥3.
One commit per wave, matière-pure, pushed immediately.

**Note on charter:** for this 48-lesson top-up the item-author agents both
design (misconception-mapped distractors) and write — an operational extension
of the item-author charter for the fan-out, justified because there is no
STAGE/DECLINE judgment to protect (unlike visuals) and every lesson is verified.

---

## Gap map (measured 2026-07-10, items counted by `rung` occurrence)

`NEEDS +N` = items to add to reach 3 everywhere; `R<n>(c)` = chapter's current count.

### maths (13 lessons)
| Lesson | +N | Under-3 chapters |
|---|---|---|
| calcul-integral | 24 | R0(0) R1(1) R2(1) R3(0) R4(1) R5(0) R6(1) R7(1) R8(1) R9(0) |
| denombrement | 21 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(0) R7(1) R8(0) |
| derivabilite-etude-fonctions | 15 | R0(0) R1(2) R2(1) R3(1) R4(1) R5(1) R6(0) |
| equations-differentielles | 15 | R0(0) R1(1) R2(1) R3(1) R4(2) R5(1) R6(0) |
| fonction-exponentielle | 21 | R0(0) R1(1) R2(2) R3(1) R4(1) R5(0) R6(0) R7(1) R8(0) |
| fonction-logarithme | 18 | R0(0) R1(1) R2(2) R3(1) R4(1) R5(0) R6(1) R7(0) |
| geometrie-espace | 27 | R0(0) R1(0) R2(1) R3(1) R4(1) R5(0) R6(1) R7(1) R8(1) R9(0) R10(0) |
| limites-continuite | 15 | R0(0) R1(1) R2(1) R3(2) R4(1) R5(1) R6(0) |
| nombres-complexes-1 | 15 | R0(0) R1(1) R2(1) R3(2) R4(1) R5(1) R6(0) |
| nombres-complexes-2 | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| probabilites-conditionnelles | 3 | R0(0) — note: R1-R5 are nested `### ` (orphan-net renders them) |
| structures-algebriques | 18 | R0(0) R1(0) R2(2) R3(2) R4(0) R5(1) R6(1) R7(0) |
| suites-numeriques | 27 | R0(0) R1(1) R2(0) R3(1) R4(0) R5(1) R6(1) R7(0) R8(1) R9(1) R10(0) |

### pc (24 lessons)
| Lesson | +N | Under-3 chapters |
|---|---|---|
| aspects-energetiques | 15 | R0(0) R1(0) R2(0) R3(2) R5(1) R6(0) |
| atome-mecanique-newton | 12 | R0(0) R1(2) R2(2) R3(2) R4(0) R5(0) |
| chute-mouvements-plans | 18 | R0(0) R1(1) R2(1) R3(0) R4(2) R5(1) R6(1) R7(0) |
| controle-catalyse | 12 | R0(0) R1(2) R2(1) R3(1) R4(2) R5(0) |
| decroissance-radioactive | 15 | R0(0) R1(2) R2(2) R3(1) R4(1) R5(0) R6(0) |
| dipole-rl | 12 | R0(0) R1(2) R2(1) R3(2) R4(1) R5(0) |
| electrolyse | 15 | R0(0) R1(2) R2(2) R3(0) R4(2) R5(0) R6(0) |
| esterification-hydrolyse | 15 | R0(0) R1(1) R2(1) R3(0) R4(2) R5(2) R6(0) |
| etat-equilibre | 18 | R0(0) R1(2) R2(0) R3(0) R4(2) R5(1) R6(1) R7(0) |
| evolution-spontanee | 15 | R0(0) R1(0) R2(2) R3(2) R4(2) R5(0) R6(0) |
| noyaux-masse-energie | 12 | R0(0) R1(1) R2(2) R3(2) R4(1) R5(0) |
| ondes-em-modulation | 15 | R0(0) R1(1) R2(1) R4(0) R5(1) R6(0) |
| ondes-mecaniques-periodiques | 12 | R0(0) R1(1) R2(2) R3(2) R4(1) R5(0) |
| ondes-mecaniques-progressives | 12 | R0(0) R1(2) R2(1) R3(2) R4(1) R5(0) |
| piles | 18 | R0(0) R1(0) R2(0) R3(2) R4(2) R5(0) R6(2) R7(0) |
| propagation-onde-lumineuse | 15 | R0(0) R1(1) R2(1) R3(2) R4(1) R5(1) R6(0) |
| rc-charge | 13 | R0(0) R1(0) R3(1) R4(1) R5(0) |
| reactions-acido-basiques | 21 | R0(0) R1(0) R2(0) R3(2) R4(2) R5(0) R6(2) R7(0) R8(0) |
| rlc-serie | 8 | R0(0) R7(2) R8(1) R9(1) |
| rotation-axe-fixe | 18 | R0(0) R1(1) R2(2) R3(2) R4(1) R5(0) R6(0) R7(0) |
| suivi-temporel-vitesse | 12 | R0(0) R1(2) R2(2) R3(1) R4(1) R5(0) |
| systemes-oscillants | 18 | R0(0) R1(1) R2(2) R3(2) R4(0) R5(1) R6(0) R7(0) |
| transformations-deux-sens | 9 | R0(0) R2(1) R3(2) R4(0) |
| transformations-lentes-rapides | 12 | R0(0) R1(1) R2(1) R3(2) R4(2) R5(0) |

### philo (11 lessons) — comprehension / argument-analysis items
| Lesson | +N | Under-3 chapters |
|---|---|---|
| autrui | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| l-etat | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| l-histoire | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| la-liberte | 11 | R0(0) R1(0) R2(1) R4(0) |
| la-personne | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| la-verite | 24 | R0(0) R1(0) R2(1) R3(1) R4(1) R5(1) R6(1) R7(1) R8(0) R9(0) |
| la-violence | 21 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(0) R6(1) R7(1) R8(0) |
| le-bonheur | 15 | R0(0) R1(1) R2(1) R3(2) R4(1) R5(1) R6(0) |
| le-devoir | 11 | R0(0) R1(0) R2(2) R3(2) R4(0) |
| le-droit-la-justice | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |
| theorie-experience | 18 | R0(0) R1(1) R2(1) R3(1) R4(1) R5(1) R6(1) R7(0) |

**Total to add: ~769 items across 48 lessons.**

---

## Wave log

_(appended per wave)_
