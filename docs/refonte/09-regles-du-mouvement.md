# 09 — Les règles du mouvement

> Pour tout auteur d’une scène animée (humain ou modèle), en complément de
> [`07-regles-du-format.md`](07-regles-du-format.md) et [`08-kit-de-lecon.md`](08-kit-de-lecon.md).
> Chaque règle tient en une phrase, suivie d’un exemple dans nos maquettes (`web/src/components/pilote/maquettes/`)
> et d’un contre-exemple dans une leçon actuelle (cité par la **clé** `cle` de l’étape).

---

## Les neuf règles

### M1 — Quand une scène bouge, et quand elle reste fixe
**Une scène ne bouge que lorsqu’une cause continue, une transformation géométrique ou un changement d’échelle est l’idée même de l’étape ; elle reste strictement immobile pendant la lecture d’un énoncé, d’une question ou d’une dérivation algébrique `.deriv`.**
- *Exemple* : dans `MaquetteSuites.tsx` (L157–L158), le trait rouge monte verticalement vers $\mathcal{C}_f$ puis se rabat horizontalement sur $y = x$, avant de rester figé pour laisser lire l’écart $|u_n - 3|$.
- *Contre-exemple* : dans `noyaux-moteur.js` (étapes `bilan-masse`, `fission-bilan`), la scène `calcul` répète des lignes d’équations au lieu de montrer l’assemblage physique des nucléons, obligeant l’élève à lire deux fois la même algèbre.

### M2 — Deux représentations couplées par un curseur commun
**Dès qu’un phénomène relie un mécanisme physique ou géométrique à une grandeur mesurée, les deux vues partagent le même paramètre et avancent au même instant, sans jamais coupler deux idées sans lien causal direct.**
- *Exemple* : dans `MaquetteDipoleRc.tsx` (L94–L129), le même paramètre $\theta = t/\tau$ pilote à la fois les porteurs dans les fils, les charges sur A et B, la flèche $i(t)$ et les deux chronogrammes `repU` et `repI` ; dans `MaquetteRadioactivite.tsx`, le paramètre `u` couple la transmutation du neutron dans $^{14}_{6}\text{C}$ au saut diagonal $(-1 ; +1)$ sur $(N, Z)$.
- *Contre-exemple* : dans `dipole-rc-moteur.js`, le circuit (scène `circuit`, clés `armatures` à `allure`) et la courbe $u_C(t)$ (scène `courbe`, clés `verif` à `cinq-tau`) sont séparés par vingt étapes et ne bougent jamais ensemble.

### M3 — L’état déterministe `etat(u)` et les paliers nommés
**Toute scène animée est une fonction pure d’un seul paramètre continu `u` dont les valeurs entières correspondent à des paliers nommés (un titre court et une phrase de sens par palier), afin qu’aller, retour, pause et saut direct donnent exactement la même image.**
- *Exemple* : `computeMeioseState(u)` dans `MaquetteMeiose.tsx` (L76–L161) calcule toutes les positions, opacités et division cytoplasmique depuis `u ∈ [0, 5]`, résolu en palier nommé par `trouverPalier(PALIERS, u)` (`outils.ts`, L214).
- *Contre-exemple* : une animation impérative dépendante de l’historique des clics ou d’un minuteur interne ne peut ni se rembobiner au curseur ni reprendre proprement après un changement d’étape.

### M4 — Le pilotage par l’élève et `prefers-reduced-motion`
**Rien ne démarre seul au chargement, tout se rejoue d’un clic, l’élève dispose toujours du pas-à-pas et d’un curseur continu, et sous `prefers-reduced-motion: reduce` toute transition continue cède la place à des sauts francs entre paliers sans perte d’information.**
- *Exemple* : `useLectureAnimee` dans `outils.ts` (L67–L162) initialise au repos (`u = 0` ou $K$ ouvert à $\theta = -0{,}2$), fournit `togglePlay`, `lancerVers`, `rejouer` et `fixer`, et saute directement au palier suivant lorsque `useReducedMotion()` vaut `true`.
- *Contre-exemple* : dans `MaquetteDipoleRc.tsx` (avant extraction), un oubli de test `reducedMotion` aurait laissé les porteurs se déplacer ; dans une vidéo `.mp4` (`bk-2019-n-x1/full.mp4`), l’élève ne contrôle ni les paliers ni les grandeurs.

### M5 — La lisibilité mesurée à `390 px`, la densité et l’unique rouge
**Tout texte SVG doit mesurer au moins `11 px` réels sur un écran de `390 px` de large, sans aucun chevauchement de boîtes englobantes, avec au plus une dizaine d’étiquettes utiles à l’écran et un seul accent rouge (`--color-signal`) réservé à l’élément qui agit.**
- *Méthode de mesure obligatoire* (à exécuter dans Playwright à `390 × 844`, jamais estimée à l’œil ni confondue avec `getBoundingClientRect().height` qui inclut l’interligne) :
  $$\text{taille réelle (px)} = \text{parseFloat}(\text{getComputedStyle}(\text{text}).\text{fontSize}) \times \frac{\text{svg.getBoundingClientRect().width}}{\text{svg.viewBox.baseVal.width}}$$
  Dans un `viewBox="0 0 760 500"` occupant `~348 px` sur téléphone (`échelle ≈ 0,458`), la constante `SVG_FS = 25` (`outils.ts`, L10) garantit `25 × 0,458 ≈ 11,4 px ≥ 11 px`. On vérifie simultanément que chaque `getBBox()` reste dans `[2, 758] × [2, 498]` et qu’aucune paire de boîtes ne s’intersecte.
- *Exemple* : les neuf maquettes utilisent `SVG_FS = 25`, uniquement les classes liées aux jetons (`mq-f-ink`, `mq-f-sec`, `mq-f-dim`, `mq-f-sig`) et passent le contrôle automatique à `≥ 11,4 px` réels sans collision.
- *Contre-exemple* : la première version de `MaquetteDipoleRc.tsx` utilisait `fontSize={23}` dans un `viewBox` de `760 × 510` avec marges larges (descendant sous `10,3 px` de corps et `~8 px` de hauteur de capitale au téléphone) ; dans `suites-scenes-a.js` (étape `escalier`), des étiquettes secondaires en gris trop pâle (`k-dim` / faible contraste) se confondent avec le quadrillage.

### M6 — L’exactitude scientifique avant l’effet visuel
**Aucune simplification visuelle n’est tolérée si elle contredit le programme : dans le doute, on signale l’hypothèse en note de bas de scène au lieu de dessiner un phénomène faux, et toute valeur numérique provient du module `*-outils.js` de la leçon.**
- *Exemple* : dans `MaquetteDipoleRc.tsx` (L31–L38, L108), les porteurs circulent uniquement sur les polylignes métalliques `WIRE_TOP` / `WIRE_BOT` (jamais à travers l’isolant du condensateur) ; dans `MaquetteMeiose.tsx` (L163–L192), chaque chromosome conserve ses deux chromatides unies par un centromère intact en méiose I ; dans `MaquetteSuites.tsx` (L118), le repère est strictement carré (`358 × 358` pour $[0 ; 6{,}2]^2$) afin que $y = x$ soit bien à $45°$ ; dans `MaquetteNoyaux.tsx` et `MaquetteExpressionGenetique.tsx`, masses, énergies et traduction sont importées directement de `noyaux-outils.js` et `expression-genetique-code.js`.
- *Contre-exemple* : dans `meiose-scenes-a.js` (étape `anaphase1` avant correction), des bâtons horizontaux empilés sans centromère explicite ne distinguaient plus deux chromatides sœurs d’une paire d’homologues.

### M7 — La règle du tunnel (au plus cinq étapes immobiles)
**Une leçon ne laisse jamais plus de cinq étapes consécutives devant une scène qui ne change ni de géométrie ni de mise en valeur ; au-delà, on introduit soit un changement de paramètre visible (`set` / `seq`), soit une manipulation pilotée, soit une vue couplée.**
- *Exemple* : dans `expression-genetique-moteur.js` (39 % d’étapes statiques seulement), les manipulations et animations régulières (`polymerase`, `ribo`, `atelier`, `decalage`) cassent les longues séquences d’explication.
- *Contre-exemple* : dans `transmission-moteur.js` (clés `echiquier` à `f2-16`) et `dipole-rc-moteur.js` (clés `verif` à `cinq-tau`), des séries de 9 à 13 étapes restent devant la même figure quasi figée.

### M8 — Le budget poids (téléphone moyen et forfait prépayé marocain)
**Une scène animée SVG pèse au plus `5 Ko` compressés (code + géométrie) et une leçon complète reste sous `250 Ko` ; aucune vidéo `.mp4` passive ni librairie graphique lourde n’entre dans le cœur d’une leçon.**
- *Exemple* : les neuf maquettes réunies sous `/pilote/maquettes` tiennent en une poignée de kilo-octets de code SVG/React sans dépendance externe ni fichier média.
- *Contre-exemple* : la vidéo Manim `web/public/explications/maths/geometrie-espace/bk-2019-n-x1/full.mp4` pèse `2,5 Mo` à elle seule (plus de 250 fois le poids d’une maquette interactive) pour un calcul purement écrit.

### M9 — La place de la question et du pari
**Avant la réponse de l’élève, la scène montre uniquement la situation initiale ou l’énigme à prédire sans dévoiler l’issue ; c’est la validation du pari (`reveal`) ou le clic explicite de l’élève qui déclenche le mouvement qui tranche.**
- *Exemple* : dans `MaquetteDipoleRc.tsx`, l’interrupteur $K$ est ouvert au départ (`theta = -0.2`, courbes vides) ; dans `MaquetteTransmission.tsx`, l’échiquier démarre vide et ne fait glisser les gamètes dans une case qu’après le choix de l’élève.
- *Contre-exemple* : dans `meiose-moteur.js` (avant correction sur `orientation`), afficher déjà les quatre cellules finales au-dessus de la question *« Que produit l’orientation aléatoire ? »* vend la réponse avant que l’élève n’ait agi.

---

## Primitives communes extraites (`web/src/components/pilote/maquettes/outils.ts`)

Conformément à la règle du mandat (**une primitive n’entre dans `outils.ts` que si au moins deux maquettes s’en servent**) :

| Primitive | Rôle | Maquettes utilisatrices |
|---|---|---|
| `SVG_FS` (`25`), `ty()`, `frNum()`, `lerp()`, `clamp()`, `easeCalm()`, `useReducedMotion()` | Taille plancher `≥ 11 px` à `390 px`, typographie française, nombres, courbe sans rebond, accessibilité | Les 9 maquettes |
| `useLectureAnimee(...)` | Lecture, pause, rejouer, transition vers un palier, saut franc sous `prefers-reduced-motion` | Les 9 maquettes |
| `creerRepere(...)` | Repère cartésien SVG (`X`, `Y`, `tracerCourbe` borné) | `dipole-rc`, `suites`, `exponentielle`, `radioactivite` (4) |
| `calculerJauge(...)` | Largeur proportionnelle bornée et pourcentage entier | `dipole-rc`, `suites`, `exponentielle`, `noyaux` (4) |
| `trouverPalier(...)` | Résolution du palier nommé actif pour un paramètre continu `u` | `meiose`, `logarithme`, `radioactivite`, `noyaux`, `expression-genetique` (5) |

*Restent volontairement locaux (utilisés par une seule maquette à ce stade)* : `ChromosomeBichromatidien` dans `MaquetteMeiose.tsx` et la géométrie de circuit `pointOnPolyline` dans `MaquetteDipoleRc.tsx`. Ils monteront dans `outils.ts` dès qu’une seconde leçon (ex. mitose/brassage intrachromosomique ou dipôle RL/RLC) en aura besoin.
