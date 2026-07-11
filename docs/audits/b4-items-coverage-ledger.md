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

### Wave 1 — maths batch 1 (6 lessons) — DONE

All brought to ≥3/chapter, validate-content clean, one commit each:
- calcul-integral (+24, R0-R9), denombrement (+21, R0-R8),
  derivabilite-etude-fonctions (+15, R0-R6), equations-differentielles
  (+15, R0-R6), fonction-exponentielle (+21, R0-R8), fonction-logarithme
  (+18, R0-R7).
- Every distractor mapped to a named misconception; numbers hand-verified;
  correct-answer positions varied (several lessons' legacy items skewed to A).

### Wave 2 — maths batch 2 (7 lessons) — launched

geometrie-espace (+27, R0-R10), limites-continuite (+15, R0-R6),
nombres-complexes-1 (+15, R0-R6), nombres-complexes-2 (+18, R0-R7),
probabilites-conditionnelles (+3, R0 only — R1-R5 nested `###`, existing
items render via the orphan net), structures-algebriques (+18, R0-R7),
suites-numeriques (+27, R0-R10). Closes the maths matière (13 lessons).

### Waves P1–P5 — pc (24 lessons) — DONE

All 24 pc lessons brought to ≥3/chapter, `validate-content.mjs` clean, one
commit each. Every distractor names a specific physics error; solutions kept
concise; correct-answer positions varied. Large lessons (≥8 chapters or large
gaps) were authored in two Edit passes to stay under the output-token limit;
`geometrie-espace` (maths) was split into part A (R0–R5) + part B (R6–R10) for
the same reason.

- aspects-energetiques, atome-mecanique-newton, chute-mouvements-plans,
  controle-catalyse, decroissance-radioactive, dipole-rl, electrolyse,
  esterification-hydrolyse, etat-equilibre, evolution-spontanee,
  noyaux-masse-energie, ondes-em-modulation, ondes-mecaniques-periodiques,
  ondes-mecaniques-progressives, piles, propagation-onde-lumineuse, rc-charge,
  reactions-acido-basiques, rlc-serie, rotation-axe-fixe, suivi-temporel-vitesse,
  systemes-oscillants, transformations-deux-sens, transformations-lentes-rapides.
- `rlc-serie` respected its formal misconception inventory: R0's accroche
  introduced one new misconception (`confond-oscillation-avec-decharge-rc`) to
  reach the ≥3 floor, and the WAVE-1 `coverage_summary` was recounted honestly
  (several pre-existing undercounts corrected).
- One escaping fix along the way (`evolution-spontanee` line 627,
  single-backslash `\rightleftharpoons` → doubled inside a double-quoted
  `text:`), caught by `validate-content.mjs` and re-validated clean.

### Waves PH1–PH2 — philo (11 lessons) — DONE

All 11 philo lessons brought to ≥3/chapter, `validate-content.mjs` clean, one
commit each. Philo items are a **different genre**: comprehension /
argument-analysis MCQs with `misconceptions: []` (no formal inventory, no math).
Each distractor names a specific philosophical error — confusing one author's
thesis with another's, asserting the inverse of an author's actual thesis, or
conflating two concepts — mined largely from each lesson's own
`> Erreur à éviter:` callouts. R0 accroche chapters took lighter comprehension
checks; R-final "Pour t'entraîner" chapters took dissertation-method items.

- autrui, l-etat, l-histoire, la-liberte, la-personne, la-verite (+24, the
  largest, authored in three small passes), la-violence (+21, two passes),
  le-bonheur, le-devoir, le-droit-la-justice, theorie-experience.
- A mid-wave session rate-limit (resets 1am UTC) killed six PH1 agents; three
  had already written complete files (autrui, l-histoire, theorie-experience),
  three had written only pass 1 (R0–R4: l-etat, la-personne, le-droit-la-justice).
  The three complete files were committed as-is; the three partials were finished
  with small R5–R7 top-up agents after the reset — no work discarded.

### Deliberate exception — probabilites-conditionnelles nested `### R1`

`content/maths/probabilites-conditionnelles/lesson.md` is the pilot lesson whose
R1–R5 are nested `### ` under one `## Décortiquer` container, not flat `## R<n>`.
`NotionBody` chapterizes only flat `## R<n>` headings, so R1–R5 items are
**orphans**: the orphan net pools them (24 items) into the last rendered chapter.
Every *rendered* chapter therefore already carries ≥3 questions (R0 = 3, orphan
pool = 24). The file is also a formally-structured pilot with per-misconception
ceilings and an asserted `coverage_summary: floor_met: true`; its
`transpose-conditionnel` misconception sits at the documented 6-item ceiling.
The nested-`### R1` metadata count of 2 has **no separate rendered surface**, so
it was left untouched rather than forcing a redundant item that would break the
file's own invariants. This is the single deliberate exception in the campaign.

---

## Closing summary — B4 COMPLETE

**48 / 48 lessons** brought to ≥3 items per rendered chapter: **maths 13/13,
pc 24/24, philo 11/11.** (SVT deferred by owner — Fable guardrails.)

Verification at close:
- `validate-content.mjs` clean on every touched lesson (YAML + KaTeX + markers).
- Corpus-wide sweep: **zero** flat `## R<n>` chapters below 3 items across
  maths/pc/philo (the one nested-`###` case documented above).
- `npm run build` clean (all 61 notions prerender); build also verified under a
  1 GB Node heap cap (rules out any build-memory regression from the added
  items).
- `dom-truth.mjs` 155/155 after the pc/maths waves; item additions change only
  the count of `<li>` rendered inside each chapter's `ChapterQuestions` block,
  not page structure.

Method notes carried forward for any future top-up:
- Wave discipline (matière-pure batches, one commit per lesson, validate +
  re-tally before each commit) survived two provider-side session rate-limits
  and a 64k output-token limit without losing or corrupting a single file.
- Large lessons (≥8 chapters or large gaps) MUST be authored in 2–3 Edit passes;
  a single-pass +24/+27 lesson exceeds the output-token limit.
