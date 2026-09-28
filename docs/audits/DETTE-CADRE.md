# La dette de cadre — ce que le programme officiel nomme et que le corpus n'enseigne pas

**Relevé du 2026-09-28.** La question retournée de `DETTE-EXAMEN.md` : non plus « que demande un
sujet vérifié que la leçon ne montre pas ? », mais **« chaque ligne du cadre a-t-elle un chapitre qui
l'enseigne et un item qui la teste ? »**. Un audit bâti sur les banques ne peut pas voir ce qu'aucune
banque n'atteste (ADR 0036) — il avait manqué un tiers de l'arithmétique SM (la numération). Le
rapport détaillé, ligne de cadre par ligne de cadre, avec les fichiers relus et les commandes :
`docs/audits/cadre-couverture.md`.

## Le compte

| cadre | lignes lues | couvert | enseigné, non testé | énoncé seulement | absent |
|---|---|---|---|---|---|
| `maths-sm.yaml` | 77 | 50 | 3 | 4 | 20 |
| `maths-sexp.yaml` | 80 | 73 | 0 | 2 | 5 |
| `pc-physique-chimie.yaml` | 186 | 163 | 2 | 11 | 10 |
| **total** | **343** | **286** | **5** | **17** | **35** |

*Rejoué avant d'être cru* (ADR 0036, « un diagnostic non rejoué est une rumeur ») : les absences les
plus lourdes ont été re-cherchées sous plusieurs formes avant d'écrire ce registre — espaces vectoriels
(`lesson_slug: null` au cadre, et le sujet vérifié bk-2023-n-x5 demande un sous-espace vectoriel),
logarithme de base a / `a^x` / `x^α` / racine n-ième (aucune occurrence dans les deux leçons), PPCM
(nommé seulement par un point d'arrêt), linéarisation (aucune occurrence).

## Deux réserves, écrites avant le plan

1. **Le cadre maths est une PROPOSITION** : ses lignes `savoir_faire` sont dérivées (« À VALIDER »).
   Une absence sur une ligne `research-consensus` ou imprimée au cadre PC pèse plus qu'une absence sur
   une ligne dérivée. Le plan commence par les premières.
2. **Deux exclusions hors leçon contredisent le cadre** et relèvent du propriétaire, pas d'un auteur :
   `calcul-integral/checkpoints.yaml:78` (« pas de sommes de Riemann » — garde calibrée SExp, alors que
   le cadre SM les nomme et que bk-2024-r-x2 les demande) et `pc-physique-chimie.yaml:480`
   (« dosages d'oxydo-réduction quantitatifs » exclus, alors que la p. 14 du cadre imprime le suivi
   temporel par titrage). La première est levée pour SM seulement (la garde reste en SExp) ; la
   seconde est mise en `DECISIONS-EN-ATTENTE.md` §37.

## Le plan, par vague

| vague | notion | ce qui manque | état |
|---|---|---|---|
| G1 | arithmétique [SM] | systèmes de numération (2.1.4–2.1.6) ; PPCM | spec en cours (`docs/pipeline/propositions/maths-arithmetique-numeration.md`) |
| G2 | structures algébriques [SM] | **espaces vectoriels** (sous-espace, famille libre/génératrice, base, dimension, application linéaire) ; noyau et image d'un morphisme ; items sous-groupe et anneau intègre | spec à écrire (un sous-domaine entier) |
| G3 | calcul intégral | sommes de Riemann [SM] ; primitives `u'·uⁿ` [commun], `u'·cos u`, `u'·sin u`, primitive sous condition [SM] | à écrire |
| G4 | exponentielle / logarithme [SM] | logarithme décimal et de base a ; `a^x = e^{x ln a}` ; `x^α` ; racine n-ième | à écrire |
| G5 | limites et continuité [commun] | image d'un segment ; dichotomie | à écrire |
| G6 | complexes [SM] | linéarisation ; équations se ramenant au second degré | à écrire |
| G7 | probabilités [commun] | variance, écart-type | à écrire |
| G8 | équations différentielles, suites | Δ < 0 avec α ≠ 0 travaillé ; Δ > 0 testé ; sommes arithmétiques et géométriques travaillées [SExp] | à écrire |
| H1 | systèmes oscillants [PC] | ressort vertical et incliné, frottement solide ; types et régimes d'amortissement ; pendule simple synchrone ; oscillateur composé | à écrire |
| H2 | noyaux, décroissance [PC] | choisir le radioélément pour dater ; applications et dangers ; usages de l'énergie nucléaire ; bilan ΔE testé | à écrire |
| H3 | RC, RL, RLC [PC] | brancher l'oscilloscope (quelle tension sur quelle voie) ; convention récepteur ; associations de condensateurs | à écrire |
| H4 | rotation, atome [PC] | θ(t) uniformément varié ; a_N et a_T en grandeurs angulaires ; ΔE = hν travaillé | à écrire |
| H5 | chimie [PC] | G = k·σ et σ = Σλᵢ[Xᵢ] ; retrouver l'acide et l'alcool d'un ester ; chaîne de transmission de l'information | à écrire |

*La règle de reprise de `DETTE-EXAMEN.md` vaut ici* : un « énoncé seulement » se paie par un exemple
travaillé ; un « enseigné, non testé » par un item ; un ABSENT par les deux. Et depuis la carte des
chapitres scellée (`carte-chapitres.mjs`), un chapitre `##` inséré oblige à relire chaque renvoi
« chapitre N » qui le suit : on préfère une section `###` dans un chapitre existant quand elle suffit.
