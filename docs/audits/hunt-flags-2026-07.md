# Hunt flags — extension session (2026-07-06)

Owner-gated findings from the adversarial content hunt (3 flag-only critics
over all 61 lessons, every worked number recomputed). **Nothing here is
silently corrected** — substantive physics/maths/bio and corpus-wide
orthotypography are the owner's domain gate (RULES §2). Each flag is
quote-checked against the file; where I could verify the arithmetic myself,
the verdict says CONFIRMED.

## P1 — a student would learn something false

| # | file:line | Concern | Verdict |
|---|---|---|---|
| 1 | `content/pc/atome-mecanique-newton/lesson.md:215-217` | Exercice He⁺ : formule $v=\sqrt{2ke^2/m_e r}$ correctement posée, mais le résultat affiché **3,1×10⁶ m/s est faux** — la vraie valeur est **4,4×10⁶ m/s** (le 3,1×10⁶ correspond à avoir perdu le facteur 2). Et donc $T$ à la ligne 217 : **5,3×10⁻¹⁷ s devrait être 3,7×10⁻¹⁷ s**. | **CONFIRMÉ** (recalcul Fable : √(2·9,0e9·(1,6e-19)²/(9,1e-31·2,6e-11)) = 4,41×10⁶ ; T = 2πr/v = 3,70×10⁻¹⁷). Le reste du corpus PC (chaîne nucléaire complète, RC/RL/RLC, datation C-14, acido-basique, piles, modulation, le modèle de Bohr de l'hydrogène lui-même) recalculé exact — seule cette variante He⁺ dérape. |
| 2 | `content/svt/genetique-populations/lesson.md:192-220` | Hardy-Weinberg présenté avec **« quatre conditions »** (grand effectif, absence de migration/mutation/sélection) ; la **panmixie** (union aléatoire) est traitée comme prémisse du modèle, pas comptée. Le programme marocain SM énonce classiquement **cinq** conditions (panmixie incluse). | **Jugement de domaine** — la leçon est *interne­ment cohérente* (dit quatre, liste quatre, et le déficit d'hétérozygotes du R3 nomme bien le manque de panmixie). Mais un élève restituant « quatre » à l'examen peut être compté incomplet. Décision de cadrage : compter la panmixie comme 5ᵉ condition, ou garder le modèle-à-quatre en explicitant que la panmixie est la prémisse. **Owner.** |

## P2 — confus ou dégradé

| # | file:line | Concern |
|---|---|---|
| 3 | `content/maths/structures-algebriques/lesson.md:251-259` | La définition d'`anneau` omet l'axiome de l'élément neutre multiplicatif (R5 dit explicitement que × peut ne pas avoir de neutre), or la définition de `corps` au R6 (« tout élément non nul a un symétrique pour × ») présuppose un 1 que R5 n'a pas garanti. Convention SM marocaine : anneau **unitaire**. Trou R5/R6. |
| 4 | `content/svt/role-enzymes/lesson.md:223` | Les protéases intestinales (trypsine) sont dites actives « à pH proche de la neutralité » ; la digestion pancréatique se fait en milieu **alcalin** (pH ≈ 8). « Neutre » peut être compté faux. |

## P3 — finition

| # | file / portée | Concern |
|---|---|---|
| 5 | **corpus-wide** (pc/piles, electrolyse, evolution-spontanee, esterification-hydrolyse, etat-equilibre, transformations-deux-sens ~35–51 occ. chacun ; **mais aussi** rc-charge et d'autres leçons de physique ~20 occ.) | Dérive orthotypographique : le tiret d'incise est tantôt « — » (cadratin) tantôt « - » (trait d'union entouré d'espaces). **N'est PAS propre à la chimie** — la physique mélange aussi (correction du diagnostic initial). Donc : normalisation **à l'échelle du corpus**, pas un patch chimie (qui créerait une nouvelle asymétrie). **Fix mécanique mais délicat** : remplacer ` - ` → ` — ` UNIQUEMENT hors des spans `$…$` (13–25 occurrences par leçon de chimie vivent DANS du math inline — un remplacement aveugle casse les équations). Recette sûre = masquer les spans math/`[[marqueurs]]` puis substituer dans le reste. Reporté à une passe dédiée. |
| 6 | `content/svt/genetique-humaine/lesson.md:46` | Drépanocytose qualifiée de « maladie génétique rare » — c'est l'une des monogéniques les plus répandues (et présente au Maroc). Sans incidence sur le mécanisme récessif correctement enseigné. |
| 7 | `content/svt/genetique-humaine/lesson.md:7` | « beaucoup moins d'une femme sur deux cents » pour le daltonisme sous-estime (~0,5 % ≈ 1/200) et est en légère tension avec la logique q² de la leçon. |

## Investigué et écarté (ne pas re-signaler)

- **`content/maths/probabilites-conditionnelles/lesson.md:182`** — `$P(B\|A)$` dans une cellule de tableau markdown. Soupçon d'un rendu ‖ (double barre). **FAUX POSITIF vérifié** : le `\|` est l'échappement markdown correct de la cellule ; KaTeX reçoit `|` ; le HTML servi rend `P(B|A)` (barre simple) et la page porte **0 `.katex-error`**. La vérité rendue prime sur la lecture de la source.

## Corpus autrement sain

Les critiques ont recalculé CHAQUE exemple travaillé des 61 leçons. Aucun autre
P1. Toute la chaîne nucléaire, les Bayes/Hardy-Weinberg numériques, Mendel
9:3:3:1, les intégrales/IPP, Moivre/racines n-ièmes, les suites, la géométrie
dans l'espace — exacts. Les 11 leçons de philo : chaque auteur, date, œuvre et
citation vérifiés justes. C'est un résultat, pas un défaut d'effort.
