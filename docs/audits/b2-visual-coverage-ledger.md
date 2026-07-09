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
| M2 | maths | fonction-logarithme, geometrie-espace, limites-continuite, nombres-complexes-1 | done (14 STAGE / 13 DECLINE, 14 figures, validated, dom-truth 155/155) |
| M3 | maths | nombres-complexes-2, probabilites-conditionnelles, structures-algebriques, suites-numeriques | done (15 STAGE / 10 DECLINE, 15 figures, validated, dom-truth 155/155) |
| P1 | pc | aspects-energetiques, atome-mecanique-newton, chute-mouvements-plans, controle-catalyse, decroissance-radioactive | judged (12 STAGE / 12 DECLINE), build in progress |
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

**Commit:** `bcb1309` — pushed y.

**Running tally: 5/47 lessons done, 34/266 chapters judged, 16 STAGE / 18 DECLINE.**

### Wave M2 — maths: fonction-logarithme, geometrie-espace, limites-continuite, nombres-complexes-1

**Judgment** (pedagogy-architect × 4):

| Lesson | Chapter | Verdict | Reason / slug |
|---|---|---|---|
| fonction-logarithme | R0 | DECLINE | narrative hook, would pre-empt R2's product→sum mechanism reveal |
| fonction-logarithme | R1 | STAGE | `ln-aire-sous-courbe` — area-under-1/t, unique geometric payload for ln's sign |
| fonction-logarithme | R2 | DECLINE | pure algebraic derivation chain, no graph |
| fonction-logarithme | R3 | DECLINE | procedural chain-rule application, no curve constructed in prose |
| fonction-logarithme | R4 | STAGE | `croissances-comparees-ln` — ln vs x growth-race graph, distinct from R5 |
| fonction-logarithme | R6 | DECLINE | procedural equation-solving, no geometric schema |
| fonction-logarithme | R7 | DECLINE | practice chapter, would undercut attempt-first exercises |
| geometrie-espace | R0 | STAGE | `cube-diagonales` — shared referent for R0/R1/R2 arc, visual-intuition-fails hook |
| geometrie-espace | R1 | STAGE | `distance-deux-pythagore` — distance formula via two stacked Pythagoras |
| geometrie-espace | R2 | DECLINE | algebraic dot-product content, geometric payoff already at R0 |
| geometrie-espace | R3 | STAGE | `produit-vectoriel-aire` — cross product orthogonality + area mechanism |
| geometrie-espace | R4 | STAGE | `parallelepipede-volume` — volume = base × height via projection |
| geometrie-espace | R5 | STAGE | `droite-point-direction` — parametric line, confronts "line = segment" misconception |
| geometrie-espace | R7 | STAGE | `positions-droite-droite` — parallel/secant/skew trichotomy, the hardest 3D-specific idea |
| geometrie-espace | R8 | STAGE | `distance-point-plan` — perpendicular-projection distance mechanism |
| geometrie-espace | R10 | DECLINE | practice chapter, would reveal the method the exercises test |
| limites-continuite | R0 | STAGE | `limite-trou` — open-circle ghost-point graph, seeds R1/R3 |
| limites-continuite | R2 | STAGE | `indetermination-trois-courbes` — three ∞−∞ functions, three different limits |
| limites-continuite | R3 | DECLINE | symbol-level algebraic FI-lifting, geometry owned by R0/R1 |
| limites-continuite | R4 | STAGE | `trois-discontinuites` — 3-panel graph, one per failing continuity condition |
| limites-continuite | R6 | STAGE | `cubique-trois-racines` — TVI on 3 monotone pieces, three root crossings |
| nombres-complexes-1 | R0 | STAGE | `tour-des-ensembles` — nested ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ set-extension diagram |
| nombres-complexes-1 | R1 | DECLINE | single-layer Re/Im formula callout, not a teaching-gesture build |
| nombres-complexes-1 | R2 | DECLINE | procedural algebra, vector interpretation deliberately deferred to R5 |
| nombres-complexes-1 | R3 | DECLINE | conjugate's one figure-worthy idea (reflection) deferred to R5 |
| nombres-complexes-1 | R4 | DECLINE | module kept algebraic here, geometric meaning deferred to R5 |
| nombres-complexes-1 | R6 | DECLINE | practice chapter, lesson itself says no drawing needed |

**Wave M2 judgment tally: 14 STAGE / 13 DECLINE** (27 chapters judged).

**Build** (diagram-author × 4):

| Lesson | Figure slug | Chapter | Stages |
|---|---|---|---|
| fonction-logarithme | ln-aire-sous-courbe | R1 | 4 |
| fonction-logarithme | croissances-comparees-ln | R4 | 4 |
| geometrie-espace | cube-diagonales | R0 | 3 |
| geometrie-espace | distance-deux-pythagore | R1 | 4 |
| geometrie-espace | produit-vectoriel-aire | R3 | 3 |
| geometrie-espace | parallelepipede-volume | R4 | 3 |
| geometrie-espace | droite-point-direction | R5 | 3 |
| geometrie-espace | positions-droite-droite | R7 | 3 |
| geometrie-espace | distance-point-plan | R8 | 3 |
| limites-continuite | limite-trou | R0 | 3 |
| limites-continuite | indetermination-trois-courbes | R2 | 3 |
| limites-continuite | trois-discontinuites | R4 | 4 |
| limites-continuite | cubique-trois-racines | R6 | 3 |
| nombres-complexes-1 | tour-des-ensembles | R0 | 5 |

**Verification:**
- `validate-content.mjs content/maths/<slug>` — pass ×4 (all clean)
- anti-contract grep (`#[0-9a-fA-F]{3,6}|currentColor|foreignObject`) — pass ×4 (all clean)
- `npm run build` — clean
- App-code fix: registered `trois-discontinuites: 4` in `MediaDiagram.tsx`'s `VERTICALLY_STACKED_PANELS` allowlist (the 4-panel figure needed viewBox cropping to avoid blank canvas during early stages — same class of fix as the B1 pilot's flagged `frontieres-plaques-quatre-types` gap; confirmed the 700px viewBox divides evenly into 4×175 panels before registering)
- `dom-truth.mjs` — 155/155, 0 fail (also caught and fixed an unrelated stale-server issue: an orphaned prior server instance on port 4173 was serving cached HTML referencing pre-rebuild chunk hashes, causing ChunkLoadErrors on deep-linked chapter navigation; killed via `fuser -k 4173/tcp` and restarted clean — dom-truth itself runs its own self-managed server on a separate port so was unaffected throughout)
- screenshot spot-check (light+dark) — `limites-continuite` R4 `trois-discontinuites`: confirmed the crop fix works (stage 1 shows only panel 1, no blank space; final stage shows all 4 panels correctly). `geometrie-espace` R0 `cube-diagonales`: cavalière projection, dashed hidden edges, and the ⊥? callout all render correctly

**Commit:** `c025506` — pushed y.

**Running tally: 9/47 lessons done, 61/266 chapters judged, 30 STAGE / 31 DECLINE.**

### Wave M3 — maths: nombres-complexes-2, probabilites-conditionnelles, structures-algebriques, suites-numeriques

**Judgment** (pedagogy-architect × 4):

| Lesson | Chapter | Verdict | Reason / slug |
|---|---|---|---|
| nombres-complexes-2 | R0 | STAGE | `multiplication-par-i` — predict-then-reveal, 90° rotation reading |
| nombres-complexes-2 | R1 | STAGE | `argument-forme-trigo` — foundational Argand construction, (a,b)↔(r,θ) |
| nombres-complexes-2 | R2 | DECLINE | algebraic derivation, geometric meaning already at R0/R5 |
| nombres-complexes-2 | R3 | STAGE | `spirale-moivre` — power spiral, confronts "argument × n" misconception |
| nombres-complexes-2 | R5 | STAGE | `rotation-homothetie` — two-step transformation, R0's payoff |
| nombres-complexes-2 | R6 | STAGE | `nature-triangle-w` — grounds the reading-table in a concrete configuration |
| probabilites-conditionnelles | R0 | DECLINE | predict-then-reveal hook, payload deferred to R5 |
| probabilites-conditionnelles | R1 | STAGE | `univers-restreint` — proportional-area mosaic, conditioning = shrinking universe |
| probabilites-conditionnelles | R3 | STAGE | `independant-vs-incompatible` — unit-square contrast, confronts core misconception |
| structures-algebriques | R0 | DECLINE | narrative hook, single-layer, precedent `congruence-horloge` |
| structures-algebriques | R1 | DECLINE | single-layer table observation, duplicates R2's staged table |
| structures-algebriques | R3 | STAGE | `symetries-rectangle` — geometric symmetry group, vertex-permutation composition |
| structures-algebriques | R4 | DECLINE | commutativity mechanism already staged at R2 |
| structures-algebriques | R5 | STAGE | `table-multiplication-modulo4` — distinct table, bridges anneau→corps |
| structures-algebriques | R6 | STAGE | `echelle-structures` — cumulative-strengthening ladder synthesis |
| structures-algebriques | R7 | DECLINE | practice chapter, would pre-reveal attempt-first tables |
| suites-numeriques | R0 | STAGE | `reservoir-premiers-termes` — predict-then-reveal, terms-plot payoff |
| suites-numeriques | R1 | DECLINE | domino cascade is atmospheric metaphor, not a structural diagram |
| suites-numeriques | R2 | DECLINE | algebraic/procedural, no graph invoked |
| suites-numeriques | R3 | STAGE | `suite-bornee-non-monotone` — confronts "bounded ≠ monotone" misconception |
| suites-numeriques | R4 | DECLINE | purely algebraic monotonicity method |
| suites-numeriques | R6 | STAGE | `theoreme-gendarmes` — canonical squeeze theorem graph |
| suites-numeriques | R7 | STAGE | `convergence-monotone-plancher` — confronts "L ≠ minorant" misconception |
| suites-numeriques | R9 | STAGE | `suites-adjacentes-etau` — closing-vise graph, matches prose metaphor |
| suites-numeriques | R10 | DECLINE | practice chapter, would duplicate R7/R8 |

**Wave M3 judgment tally: 15 STAGE / 10 DECLINE** (25 chapters judged).

**Build** (diagram-author × 4):

| Lesson | Figure slug | Chapter | Stages |
|---|---|---|---|
| nombres-complexes-2 | multiplication-par-i | R0 | 3 |
| nombres-complexes-2 | argument-forme-trigo | R1 | 3 |
| nombres-complexes-2 | spirale-moivre | R3 | 4 |
| nombres-complexes-2 | rotation-homothetie | R5 | 3 |
| nombres-complexes-2 | nature-triangle-w | R6 | 3 |
| probabilites-conditionnelles | univers-restreint | R1 | 4 |
| probabilites-conditionnelles | independant-vs-incompatible | R3 | 3 |
| structures-algebriques | symetries-rectangle | R3 | 3 |
| structures-algebriques | table-multiplication-modulo4 | R5 | 4 |
| structures-algebriques | echelle-structures | R6 | 4 |
| suites-numeriques | reservoir-premiers-termes | R0 | 3 |
| suites-numeriques | suite-bornee-non-monotone | R3 | 3 |
| suites-numeriques | theoreme-gendarmes | R6 | 3 |
| suites-numeriques | convergence-monotone-plancher | R7 | 3 |
| suites-numeriques | suites-adjacentes-etau | R9 | 3 |

**Verification:**
- `validate-content.mjs content/maths/<slug>` — pass ×4 (all clean)
- anti-contract grep — pass ×4 (probabilites-conditionnelles' pre-existing `arbre-pondere.svg` carries legacy hex colors predating the token system, untouched by this wave; both new files in that lesson confirmed clean on their own)
- `npm run build` — clean
- `dom-truth.mjs` — 155/155, 0 fail (learned from wave M2's stale-server incident — used `fuser -k 4173/tcp` before restarting this time, no recurrence)
- screenshot spot-check (light+dark) — `nombres-complexes-2` R3 `spirale-moivre` and `probabilites-conditionnelles` R1 `univers-restreint`: both render correctly, correct geometry, correct probability readings boxed clearly

**Known non-blocking gap flagged by the nombres-complexes-2 build agent:** `NotionBody.tsx`'s `FIGURE_ARIA_LABELS` map (a manually-curated slug → French aria-label lookup) has only 5 entries, all from the original pc/rlc-serie StagedFigure work; every other figure in the 90+-figure corpus — including all of B1's and B2's new figures — already falls back to `figureAriaLabel()`'s `slug.replace(/-/g," ")` default, which is plain but functional (not broken). This is a pre-existing condition across the whole corpus, not a regression from this campaign; retroactively curating entries for 90+ slugs is out of scope for content-only diagram-author agents and is not blocking. Worth a dedicated accessibility-polish pass at some point, tracked here rather than actioned mid-campaign.

**Commit:** pending (this wave commits together with this ledger update).

**Running tally: 13/47 lessons done, 86/266 chapters judged, 45 STAGE / 41 DECLINE. Maths matière COMPLETE (13/13 remaining lessons done, plus the arithmetique pilot — all 14 maths lessons now have full chapter-level visual judgment).**

### Wave P1 — pc: aspects-energetiques, atome-mecanique-newton, chute-mouvements-plans, controle-catalyse, decroissance-radioactive

**Judgment** (pedagogy-architect × 5):

| Lesson | Chapter | Verdict | Reason / slug |
|---|---|---|---|
| aspects-energetiques | R0 | DECLINE | narrative hook, payoff already lives at R3 |
| aspects-energetiques | R1 | STAGE | `ec-parabole` — Ec vs v graph, confronts linear-vs-quadratic intuition |
| aspects-energetiques | R2 | STAGE | `travail-force-signe` — work-sign tool, motrice/nulle/résistante |
| aspects-energetiques | R5 | STAGE | `plan-incline-travaux` — energetic reading of incline, d→Δz=d·sinα |
| aspects-energetiques | R6 | DECLINE | practice chapter, would pre-reveal the exercise's answer |
| atome-mecanique-newton | R0 | DECLINE | narrative paradox hook, payload at R2 |
| atome-mecanique-newton | R1 | DECLINE | order-of-magnitude comparison, table already carries it |
| atome-mecanique-newton | R2 | STAGE | `bilan-forces-orbite` — centripetal force balance, 4-stage construction |
| atome-mecanique-newton | R3 | STAGE | `spirale-rayonnement` — radiation-collapse paradox, causal sequence |
| atome-mecanique-newton | R5 | DECLINE | practice chapter, reapplies R2's method |
| chute-mouvements-plans | R0 | DECLINE | narrative hook, deliberately withholds the answer |
| chute-mouvements-plans | R1 | STAGE | `symetrie-montee-descente` — 2-panel graph, montée=descente symmetry |
| chute-mouvements-plans | R3 | DECLINE | algebraic elimination of t, result already visualized at R4 |
| chute-mouvements-plans | R7 | DECLINE | practice chapter, duplicates R4/R6 |
| controle-catalyse | R0 | DECLINE | narrative hook, no structure to build |
| controle-catalyse | R1 | STAGE | `anhydride-alcool` — atom-tracked mechanism, no-water-byproduct |
| controle-catalyse | R3 | STAGE | `trois-catalyses` — phase-classification, 3-panel homogène/hétérogène/enzymatique |
| controle-catalyse | R4 | STAGE | `savon-amphiphile` — structure-property link, hydrophile/hydrophobe |
| controle-catalyse | R5 | DECLINE | practice chapter, click-theater risk |
| decroissance-radioactive | R0 | DECLINE | narrative hook, payload at R3's motion figure |
| decroissance-radioactive | R1 | STAGE | `vallee-stabilite` — (Z,N) valley, confronts "gros=instable" misconception |
| decroissance-radioactive | R2 | STAGE | `desintegrations-nz` — decay-displacement on the valley, β⁻/β⁺ trap |
| decroissance-radioactive | R5 | STAGE | `datation-c14` — dating graph, living-equilibrium plateau + inverse read |
| decroissance-radioactive | R6 | DECLINE | practice chapter, would duplicate R4/R5 |

**Wave P1 judgment tally: 12 STAGE / 12 DECLINE** (24 chapters judged).

**Build:** in progress.

