# Spec v3 : nombres complexes, forme algébrique (`maths/nombres-complexes-1`)

> **Pourquoi cette notion.** L'exercice de complexes est dans **tous** les sujets transcrits : 6 sujets
> PC/SVT sur 6 (3 à 5 points, `docs/sujets/maths/nombres-complexes-1.md`) et chaque sujet SM
> (3,5 points, `docs/sujets/maths/nombres-complexes-2.md` ; bible B1 : 29 sur 29). Il s'ouvre très
> souvent sur une équation du second degré : SExp 2018, 2019, 2020, 2021 ; SM 2017, 2018, 2019, 2022,
> 2024, 2025. Le poids est de 30 % pour « nombres complexes + probabilités » en PC/SVT
> (`maths-sexp.yaml`, sous-domaines 2.4 et 2.5) et de 35 % pour « nombres complexes + structures » en
> SM (`maths-sm.yaml`, sous-domaines 2.2 et 2.4).
>
> Ce plan d'auteur sert à la leçon pilote `/pilote/complexes` (route à confirmer, §9). Les règles sont
> dans [`07-regles-du-format.md`](../07-regles-du-format.md), [`08-kit-de-lecon.md`](../08-kit-de-lecon.md)
> et [`09-regles-du-mouvement.md`](../09-regles-du-mouvement.md). Le modèle de forme est
> [`suites-numeriques.md`](suites-numeriques.md) et le modèle de ton
> `web/src/components/pilote/suites-moteur.js`. La fiche est la bible B1 (`docs/bible/01-maths.md`). La
> leçon ancienne à miner est `content/maths/nombres-complexes-1/lesson.md`, avec ses conceptions dans
> `content/maths/nombres-complexes-1/items.yaml`. L'auteur suit ce plan étape par étape : il rédige
> les textes, mais ne choisit ni l'ordre, ni les paris, ni les leurres. **Le code recalcule chaque
> nombre de ce plan** (`complexes-outils.js`, à créer, en arithmétique exacte sur les fractions et
> les radicaux). Aucun nombre n'est écrit à la main dans le moteur.
>
> **Scènes nouvelles demandées.** Une seule d'un type nouveau : **`plan`**, le plan complexe, qui porte
> la figure-clé « multiplier par i, c'est tourner d'un quart de tour » (§3.2). Aucune scène existante
> ne place un point par son affixe ni ne le fait tourner autour de O. **`cardan`** est une copie
> adaptée de `loi` (`web/src/components/pilote/radioactivite-scenes-b.js`) : une courbe avec lecture
> graphique, sans type nouveau. Ce dernier point reste à confirmer (§9).

---

## 0. La leçon livrée (état au 2026-11-25)

La leçon livrée (`web/src/components/pilote/complexes-moteur.js`) compte **55 étapes**, dans l'ordre et sous les clés du plan : **le fichier de la leçon fait foi** ; les sections 1 à 9 ci-dessous restent le plan d'origine (raisons, sources, leurres). Route `/pilote/complexes`, titre « Nombres complexes : forme algébrique et équations », 12 gabarits d'exercices (`exercices/complexes.js`, la médiatrice retirée), catalogue d'apprentissage `complexes` (43 questions, 12 gabarits, 37 conceptions `cx.*` dans `graphe-transversal.ts`). Le rappel (`rappel`) est la 25ᵉ étape sur 55 (45 %).

| # | Partie | Étapes (clés, dans l'ordre) |
|---|---|---|
| 0 | Ce qu'il faut savoir | `savoir`, `sav-rappel` |
| 1 | L'énigme | `cubique`, `formule`, `fausse`, `bombelli` |
| 2 | Où vivent ces nombres | `droite`, `quart`, `axe-i`, `quatre-quarts`, `point-z`, `partie-imag`, `egalite`, `fois-i`, `fois-i-curseur` |
| 3 | Calculer | `somme`, `produit`, `carre` |
| 4 | Le conjugué | `conjugue`, `ou-zzbar`, `zzbar`, `z-plus-zbar`, `conj-prop`, `diviser` |
| 5 | Le module et la distance | `rappel`, `module`, `module-calc`, `module-somme`, `distance`, `cercle` |
| 6 | Le second degré | `somme-carres`, `x2-moins`, `canonique`, `formule-delta`, `conjuguees`, `bicarree` |
| 7 | Filière SM : coefficients complexes | `sm-signe`, `sm-delta`, `sm-resoudre`, `sm-somme-produit` |
| 8 | Retour à l'énigme | `retour-cube`, `retour-conj`, `retour-somme`, `retour-pourquoi` |
| 9 | Au bac | `bac`, `bac-a`, `bac-b`, `bac-c`, `bac-copie`, `bac-2`, `bac-2-racines` |
| 10 | Bilan | `q1`, `q2`, `q3`, `fin` |

**Écarts au plan** (chacun a une raison : la relecture « la réponse ne se lit nulle part avant la question », ou une décision du propriétaire).

- **Histoire.** Seuls Cardan, 1545, √−121 et x = 4 s'affichent. Les plaques `1572` et `1797`, le nom de Bombelli, Wessel, Argand et Descartes, la phrase « plus sophistique que vrai » : retirés (`bombelli` ne nomme personne ; `axe-i` n'a plus de phrase d'histoire).
- **Titre de la partie 2.** « Où vivent ces nombres » (nom court « Lieu ») et non « Le plan et le quart de tour » : le titre, toujours visible dans la barre, nommait la réponse du pari `quart`. Les noms courts « Conjugué » et « Équation » deviennent « Miroir » et « Racines » (onze parties et un titre long ne tenaient pas dans la barre à 1280 px ; un resserrement CSS propre à la leçon couvre aussi 1100 à 1599 px).
- **Scène `plan`.** Écrite comme prévu : repère orthonormé, un geste par étape. L'état est une fonction de paramètres : discrets (`geste`, `pts`, `cercles`, `vue`, lectures `t1`/`t2`), numériques, et trois paramètres animés, un seul à la fois dans une étape (`u` pour le point, `cu` pour le cercle, `su` pour le segment AB) au lieu du seul `u` de la spécification. Deux cadres (`vue` 0 : x de −5,5 à 7,5 ; `vue` 1 : x de −3 à 14,5, nécessaire pour z z̄ = 13, que la fenêtre de la spécification ne contenait pas). Le cadre large n'est posé qu'à la révélation de `ou-zzbar` : la fenêtre ne dit pas où tombe le produit. `cardan` : copie de `loi`, courbe de x³ − 15x − 4 ; `savoir`, `quiz`, `end` : copies.
- **Réponse lue avant la question.** `quatre-quarts` : l'animation s'arrête en −1, le cycle s'achève à la révélation, et la formule i³ = −i passe de `tex` à `apres`. `zzbar` : la figure ne montre plus le produit (13) avant la réponse, et `ou-zzbar` n'écrit plus 13 ; 2 ; 13 (étiquette chiffrée à la révélation de `zzbar`). `bac` : la révélation s'arrête à |z − d| = 2 (le plan donnait DM = |z + 2|, réponse de `bac-a`). `somme-carres` : x² + 16 au lieu de x² + 4 (la factorisation donnait les solutions de la question suivante, z² = −4). `partie-imag` : Im(4 − 6i) au lieu de Im(3 − 5i) (y = −5 à la question suivante). `module-calc` : |−5 + 12i| = 13 (point non dessiné) et `distance` : A(−2 + 4i), B(4 − 4i), AB = 10, au lieu de 5 et 5 (le 5 de `module-somme`, vu à l'étape d'avant). `retour-somme` : la phrase « Le détour par l'impossible ramène à 4 » passe à `retour-pourquoi`. `bac-2-racines` : la consigne ne nomme plus les deux pièges.
- **Questions sans oui/non.** `savoir`, `module-somme`, `sm-signe`, `q2` : « Quelles sont… », « Que valent… », « Que dire de… » (la spécification posait des questions auxquelles on répond par oui ou non).
- **Leurres.** `bombelli` : conflit entre deux règles (le texte pose (√−1)² = −1), mêmes erreurs. `module-somme` : trois paires de valeurs (5 et 7 ; 7 et 7 ; 25 et 7). `bac-b` : le pari porte sur la première ligne (le conjugué du réel 2, Pythagore appliqué à une somme) ; les lignes suivantes sont dans `apres`. `bac-c`, `q1` : options de même longueur. `q2` : le troisième leurre est « 4 et 2 » (module sans racine). `q3` : z² + 6z + 13 (la spécification donnait z² + 2z + 10, dont les solutions −1 ± 3i sont le leurre de `bac-2-racines`).
- **Ordre des options des paris de prédiction** (`fausse`, `quart`, `fois-i`, `ou-zzbar`, `conjuguees`) : la vraie n'est jamais la première. `fois-i` : A échange, B quart de tour, C demi-tour.
- **`retour-somme` / `cardan`** : la phrase du plan « puis scène `cardan`, `quatre:1` » est portée par `retour-pourquoi` (une étape n'a qu'une scène).
- **Exercices.** Gabarit 7 : cercles seulement, centres réels ou imaginaires purs ou généraux. Gabarit 9 : options de forme semblable (écriture ±), pour que la bonne ne soit ni la plus longue ni l'union des leurres. Gabarit 11 : un leurre « δ mal choisi ».

**Ce qui reste « à vérifier »** (la liste complète est dans le rapport de remise) : la forme exacte de la formule de Cardan telle qu'il l'écrit (l'écran la donne en notation moderne) ; l'ordre « le plan est venu après le calcul avec √−1 » (`retour-pourquoi`, sans date) ; les quatre points de programme du §8 ; la lecture à voix haute de z̄ (le mot « barre » est lu).

---

## 1. Périmètre

### 1.1 Capacités officielles couvertes (cadres 2025, mot pour mot)

| Filière | Id | Libellé | Où |
|---|---|---|---|
| PC, SVT | `sexp 2.4.1` | Maitriser le calcul algébrique sur les nombres complexes (dans ses différentes écritures : algébrique, trigonométrique et exponentielle). | écriture **algébrique** seulement (parties 2 à 5) ; trigonométrique et exponentielle : B2 |
| PC, SVT | `sexp 2.4.4` | Traduire les notions géométriques suivantes : distance de deux points, mesure des angles, alignement de points, colinéarité et orthogonalité de vecteurs, en utilisant l'outil complexe. | **distance** (partie 5) ; **orthogonalité** de OM et OM′ pour z′ = iz, lue sur les coordonnées (partie 2). Angles, alignement, colinéarité : B2 |
| PC, SVT | `sexp 2.4.8` | Résoudre l'équation az² + bz + c = 0 dans l'ensemble des nombres complexes où a , b et c sont des nombres réels | partie 6 |
| PC, SVT | `sexp 2.4.9` | Résoudre des équations dont la résolution se ramène à la résolution d'une équation du second degré à une seule inconnue à coefficients réels. | partie 6 (`bicarree`), gabarit 9 |
| SM | `sm 2.2.1` | Maitriser le calcul algébrique sur les nombres complexes (dans chacune de leurs écritures : algébrique, trigonométrique et exponentielle). | écriture algébrique (parties 2 à 5) |
| SM | `sm 2.2.3` | Interpréter géométriquement des expressions complexes. | z̄, −z, iz, z + w, \|z\|, \|z − a\| (parties 2 à 5) |
| SM | `sm 2.2.5` | Résoudre une équation du deuxième degré à une inconnue. | partie 6 (coefficients réels) ; **partie 7, SM seulement** (coefficients complexes, δ² = Δ) |
| SM | `sm 2.2.6` | Résoudre des équations dont la résolution se ramène à celle d'une équation du deuxième degré à une inconnue. | partie 6, gabarit 9 |

Capacités réutilisées, enseignées ailleurs : le discriminant et les identités remarquables, vus avant
le 2ème Bac (bible B1, prérequis) ; la distance dans un repère orthonormé (tronc commun).

### 1.2 Où s'arrêter : la frontière avec B2

Cette leçon s'arrête **avant** l'argument. On ne parle ni d'argument, ni de forme trigonométrique ou
exponentielle, ni de Moivre et Euler, ni d'écriture complexe d'une rotation, d'une translation ou
d'une homothétie (`sexp 2.4.2`, `2.4.3`, `2.4.5` à `2.4.7` ; `sm 2.2.2`, `2.2.4`, `2.2.7` à
`2.2.10`). Tout cela relève de B2 (`nombres-complexes-2`).

**Le quart de tour de i** est montré sur les coordonnées : i(a + ib) = −b + ia, donc
(a ; b) devient (−b ; a), à la même distance de O, et OM est orthogonal à OM′ (produit scalaire
a·(−b) + b·a = 0, tronc commun). Le mot « rotation » est dit une fois, et l'écran ne montre aucune
formule z′ = e^{iθ}z. B2 reprendra la même scène pour généraliser. **C'est un emprunt à l'image-clé de
B2** (la bible y place « 1 → i → −1 → −i → 1 »), à trancher (§9, décision 2).

### 1.3 Hors programme, qu'on n'enseigne pas

La formule de Cardan : elle est **montrée** dans l'énigme comme un fait historique, jamais enseignée
ni testée. Les racines cubiques d'un complexe et leur choix ; la construction formelle de ℂ
(couples de réels) ; l'absence d'ordre sur ℂ comme théorème (une phrase en partie 7, SM) ; le
théorème fondamental de l'algèbre.

### 1.4 Filières

| | PC, SVT | SM |
|---|---|---|
| Parties 0 à 6, 8 à 10 | entières | entières |
| Partie 7 (coefficients complexes, δ² = Δ, somme et produit des racines) | sautée : la ligne « Filière SM. En PC et SVT, ce n'est pas à ton programme » et un bouton « Passer à la suite » (`data-aller`, comme le saut de l'exponentielle) | entière |
| Gabarits 10, 11 | absents (`filieres: ['SM']`) | présents |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** L'équation x³ = 15x + 4 a une solution évidente : x = 4, car 64 = 60 + 4.
Or la formule de Cardan (*Ars Magna*, 1545) donne x = ∛(2 + √−121) + ∛(2 − √−121). Cardan avait
obtenu √−121 en résolvant cette équation, tout en sachant que x = 4 la vérifie [V : MacTutor, §8].
**La formule est-elle fausse, ou cette expression vaut-elle 4 ?** L'élève parie. La courbe de
y = x³ − 15x − 4 montre alors trois solutions, **toutes réelles** : aucune solution n'est
« imaginaire », et la formule passe pourtant par √−121. Bombelli (1572) ose calculer avec √−1
« comme avec une lettre », avec une seule règle : (√−1)² = −1 [V pour 1572 et le cas irréductible ;
S pour le calcul précis (2 + √−1)³, §8].

**Trois questions restent ouvertes :** peut-on calculer ainsi sans contradiction ? Où vivent ces
nombres ? L'expression vaut-elle vraiment 4 ?

**Le retour (partie 8).** Les trois questions tombent avec les outils de la leçon.
1. On calcule sans contradiction, parce que la règle √a·√b = √(ab) est abandonnée pour les nombres
   négatifs. On écrit i, et i² = −1 (partie 1, `bombelli`).
2. Ces nombres vivent dans un plan, et i est le quart de tour (partie 2).
3. L'expression vaut 4 : (2 + i)³ = 2 + 11i se calcule par le produit (partie 3). (2 − i)³ = 2 − 11i
   s'obtient sans calcul, par le conjugué d'un produit (partie 4). Enfin (2 + i) + (2 − i) = 4 = 2 Re,
   parce que z + z̄ est réel (partie 4). **Le détour par l'impossible ramène au réel.**

Le fil rouge est le plan : chaque calcul de la leçon se lit comme un geste dans le plan. Une somme est
une translation, ×(−1) un demi-tour, ×i un quart de tour, le conjugué un miroir, le module une
distance.

**Correction de la leçon ancienne.** Elle ouvrait sur « on a inventé i pour résoudre x² = −1 », un
récit faux (bible B1 ; `02-comprendre-en-profondeur.md` §5.4). Cette leçon le remplace par Cardan et
Bombelli, et l'affronte en question (`retour-pourquoi`).

---

## 3. La chaîne des idées

Elle suit l'ordre de la compréhension, pas celui du manuel (la leçon ancienne n'arrivait au plan
qu'en R5, après tout le calcul).

1. Le discriminant négatif : un mur, dans ℝ (rappel) → 2. une formule réelle passe par √−121 et
semble pourtant juste → 3. on ose un nombre i avec i² = −1, en renonçant à √a·√b = √(ab) → 4. où le
placer ? ×(−1) est un demi-tour, donc ×i, fait deux fois, est un demi-tour : c'est un quart de tour,
et i sort de la droite. Le plan apparaît → 5. un complexe est un point, a + ib ↔ (a ; b). Deux
complexes sont égaux si leurs parties le sont → 6. calculer : la somme est une translation, et le
produit se développe avec i² = −1 → 7. le conjugué est un miroir, z·z̄ = a² + b² est réel, ce qui
permet de diviser → 8. le module : \|z\| = √(z z̄) est la distance OM, et \|z_B − z_A\| = AB, d'où les
cercles → 9. z z̄ = a² + b², lu à l'envers : une somme de deux carrés se factorise dans ℂ, donc le
second degré à Δ < 0 a deux solutions, conjuguées → 10. (SM) les coefficients complexes : δ² = Δ →
11. l'énigme se résout → 12. le bac.

**Figure-clé : le quart de tour** (scène `plan`, **14 étapes**, un changement chacune) :
`droite` (la droite réelle, ×(−1) en demi-tour), `quart` (pari), `axe-i` (l'axe vertical et i),
`quatre-quarts` (1 → i → −1 → −i → 1), `point-z` (z = 3 + 2i), `fois-i` (pari), `fois-i-curseur`
(z libre), `somme` (la translation), `conjugue` (le miroir), `ou-zzbar` (pari), `module` (le cercle
de rayon \|z\|), `distance` (le segment AB), `cercle` (\|z + 2\| = 2), `conjuguees` (les deux
solutions de part et d'autre de l'axe). Ses **trois paris** : `quart`, `fois-i` et `ou-zzbar`.
`conjuguees` est un quatrième pari de prédiction, hors de la figure-clé. D'autres étapes montrent la
scène sans y ajouter d'élément (`partie-imag`, `egalite`, `produit`, le retour, le bac).

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 4 |
| 2 | Le plan et le quart de tour | Plan | 9 |
| 3 | Calculer | Calcul | 3 |
| 4 | Le conjugué | Conjugué | 6 |
| 5 | Le module et la distance | Module | 6 |
| 6 | Le second degré | Équation | 6 |
| 7 | Filière SM : coefficients complexes | SM | 4 |
| 8 | Retour à l'énigme | Retour | 4 |
| 9 | Au bac | Bac | 7 |
| 10 | Bilan | Bilan | 4 |

**55 étapes.** Les actions sont notées : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`). Dans les options, ✓ marque la bonne et ✗ une fausse, suivie de la
conception affrontée puis de l'idée du retour (B2). **Règle B5 tenue ici : chaque pari et chaque
question nomme une seule conception**, celle du §5. Couleurs : aucun texte ne nomme une couleur ;
on dit « le point M », « l'axe des réels », « le cercle pointillé ».

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `savoir` | copie adaptée de `suites-scenes-a.js` | le test du discriminant, puis trois rappels |
| `cardan` | **copie adaptée de `loi`** (`radioactivite-scenes-b.js`) | la courbe de y = x³ − 15x − 4, l'expression de Cardan dans un cartouche |
| `plan` | **nouvelle (type nouveau)** | voir ci-dessous |
| `quiz`, `end` | copies de `suites-scenes-c.js` | les trois pièges ; le bilan |

Les scènes des pilotes vivent dans leur fermeture : on les **copie** dans `complexes-scenes-a.js`,
`-b.js` et `-c.js` (à créer), on ne les importe pas. Le bac n'a pas de scène `bac` propre : `plan`
porte les cercles de 2022 et les racines de 2018, et la copie s'affiche dans le panneau (`html`).

**Scène `cardan`** (copie adaptée de `loi`, même repère, même lecture d'abscisses).
- Montre : x ∈ [−5 ; 5], la courbe de y = x³ − 15x − 4, tracée sur demande. Un cartouche en haut :
  « x³ = 15x + 4 » puis, au paramètre `form`, « Cardan, 1545 : x = ∛(2 + √−121) + ∛(2 − √−121) ».
- Paramètres : `cb` (0 → 1, tracé), `x4` (le point (4 ; 0) marqué « 4 »), `form` (le cartouche de la
  formule), `trois` (les trois points d'intersection avec l'axe, abscisses calculées par le code :
  −2 − √3 ≈ −3,73 ; −2 + √3 ≈ −0,27 ; 4), `quatre` (au retour : la valeur 4 entourée).
- Garde (M9) : `trois` reste à 0 tant que le pari `fausse` n'est pas posé.

**Scène `plan`** (type nouveau, la figure-clé ; la bible B1 demande le plan comme image-clé et le
manipulable « glisser z et voir son conjugué, son opposé, son module ». Les fichiers
`content/maths/nombres-complexes-1/media/plan-complexe.stages.json`, `module-argument.stages.json` et
`content/maths/nombres-complexes-2/media/multiplication-par-i.stages.json` en ont des versions
statiques à miner).
- Montre : un repère **orthonormé** (même unité sur les deux axes, sinon le quart de tour se voit
  déformé : M6), x et y ∈ [−5 ; 5], quadrillage discret. L'axe des réels, puis l'axe des imaginaires
  (absent avant le pari `quart`). Les points sont étiquetés par leur affixe (« 3 + 2i »), jamais par
  leurs coordonnées seules.
- **État déterministe (M3).** L'état est `etat(cfg, u)`. `cfg` est la configuration discrète posée
  par l'étape (`set`) : quels objets existent et quel geste est en cours. `u ∈ [0 ; 1]` est **le seul
  paramètre animé**, avec des paliers nommés par geste :

  | geste | u = 0 | u = 1 | mouvement |
  |---|---|---|---|
  | `demi` | le point z | −z | arc de cercle de centre O, angle u·π |
  | `quart` | le point z | iz | arc de centre O, angle u·π/2, et l'équerre en O à u = 1 |
  | `trans` | le point z | z + w | translation de u·w, la flèche de w posée à l'origine de z |
  | `miroir` | le point z | z̄ | ordonnée (1 − 2u)·b, l'axe des réels en pointillé renforcé |
  | `cercle` | rien | le cercle de centre ω et de rayon r | tracé d'arc de 0 à 2π·u |
  | `segment` | rien | le segment [AB] et sa longueur | tracé de A vers B |

  Aller, retour, pause et saut donnent la même image. Sous `prefers-reduced-motion`, la scène saute
  d'un palier à l'autre (M4).
- `cfg` (liste fermée) : `z` (l'affixe du point principal, dans une liste de crans :
  3 + 2i, 1 + i, −2 + i, 2 − 3i, 4, 2i), `w` (1 − 4i pour la somme), `axeI` (0/1), `geste`, `pts`
  (points supplémentaires : 1, i, −1, −i ; 1 ± 2i ; 2 ± i ; −½ ± (3/2)i), `cercles` (liste
  {ω, r} : {0, √13}, {−2, 2}, {0, 4}), `ab` (A = 2 + 5i, B = 6 + 2i), `opts` (pour un pari : 2 ou 3
  emplacements candidats marqués A, B, C, sans étiquette d'affixe).
- L'élève manipule (`fois-i-curseur`) : le cran de z. Le point iz suit, la scène écrit « z = … ;
  iz = … », valeurs calculées par le code. `need` : deux crans essayés, ou « Montre-moi » après deux
  essais ou 20 s (mécanisme du curseur de l'exponentielle, `noyau.js` inchangé).
- **Garde contre la réponse (M9).** Avant `quart`, la scène n'a ni axe vertical ni i. Avant `fois-i`,
  elle n'a ni le point iz ni l'équerre. Avant `ou-zzbar`, z·z̄ n'est pas placé. Avant `cercle` et
  `conjuguees`, ni cercle ni racines. Pendant `bac`, le point d'intersection −4 reste caché jusqu'à
  `bac-c`.
- Règles 08 §3 et 09 : une idée par geste ; positions calculées ; texte d'au moins 11 px réels à
  390 px (M5) ; au plus une dizaine d'étiquettes ; un seul accent, réservé à l'objet qui bouge ;
  poids ≤ 5 Ko compressés (M8). **L'auteur construit d'abord cette scène, seule, et regarde ses
  captures (ordinateur et 390 px) avant d'écrire les étapes**, comme pour `toile`.

---

### Partie 0 : Ce qu'il faut savoir (scène `savoir`)

- **`savoir`** · `ctl:'saut'` · un test ; s'il est réussi du premier coup, on passe le rappel.
  **V** « x² − 2x + 5 = 0 a-t-elle des solutions réelles ? » (la question-test de la bible B1).
  ✓ « non : Δ = 4 − 20 = −16 < 0 ». ✗ « oui : Δ = 4 + 20 = 24 » : le signe de −4ac est perdu → Δ =
  b² − 4ac, et ici 4ac = 20. ✗ « oui : x = 1 ± 2, en prenant √16 » : un Δ négatif traité comme
  positif → x = 3 donne 9 − 6 + 5 = 8 ≠ 0.
- **`sav-rappel`** · trois rappels, un par ligne : Δ = b² − 4ac et ses trois cas dans ℝ ;
  (A + B)(A − B) = A² − B² ; AB = √((x_B − x_A)² + (y_B − y_A)²). Pas d'action.

### Partie 1 : L'énigme (scène `cardan`)

- **`cubique`** · `cb:0→1, x4:1` · l'équation x³ = 15x + 4. x = 4 la vérifie : 4³ = 64 et
  15 × 4 + 4 = 64. Pas d'action.
- **`formule`** · tag `1545` · `form:1` · Cardan publie une formule pour ce type d'équation. Elle
  donne x = ∛(2 + √−121) + ∛(2 − √−121) (tex). « Tu n'as pas à connaître cette formule. » Pas
  d'action.
- **`fausse`** · **P** « x = 4 est solution. La formule passe par √−121, qui n'est pas un réel.
  Alors… » options : « la formule est fausse pour cette équation » / « la formule désigne une autre
  solution, qui n'est pas réelle » / « l'expression vaut 4, si l'on ose calculer avec √−121 ». Retour
  identique : « Pari noté. Regarde la courbe. » `reveal` : `trois:1`, et les trois solutions sont
  réelles. Conception affrontée : « une racine d'un nombre négatif signale une solution qui
  n'existe pas » (ajoutée ici). Le pari reste ouvert entre la première et la troisième option, et le
  retour tranche (partie 8).
- **`bombelli`** · tag `1572` · Bombelli calcule avec √−1 comme avec une lettre, avec une seule
  règle : (√−1)² = −1. **Q** « Si √−1 suivait la règle √a × √b = √(ab), on aurait
  √−1 × √−1 = √1 = 1. Donc… » ✓ « cette règle ne vaut pas pour les négatifs : on note i, et i² = −1 ».
  ✗ « i² = 1 » (bible B1 : i² = 1) → indice « On a posé (√−1)² = −1 : les deux ne tiennent pas
  ensemble. » ✗ « √−1 n'existe pas, il faut s'arrêter » : c'est le pari 1 de la première option, et
  la courbe dit que la solution 4 est bien là → on garde le nombre et on abandonne la règle. `apres` :
  `fort` « Trois questions : peut-on calculer ainsi ? Où vivent ces nombres ? L'expression vaut-elle
  4 ? »

### Partie 2 : Le plan et le quart de tour (scène `plan`, figure-clé)

- **`droite`** · `axeI:0, z:2, geste:'demi'`, `seq` u 0 → 1 · la droite des réels. Multiplier par −1
  envoie 2 sur −2 : on le dessine comme un demi-tour autour de O. Deux demi-tours ramènent au départ.
  Pas d'action.
- **`quart`** · pari de la figure 1/3 · tag `1797` · Wessel, un arpenteur, se pose la question en
  1797. **P** « Multiplier deux fois par i, c'est multiplier par i² = −1 : un demi-tour. Multiplier
  une fois par i, c'est donc… » options : « un quart de tour : 1 quitte la droite » / « aller à
  mi-chemin sur la droite, vers 0 » / « multiplier par −½, à mi-chemin de 1 et −1 ». Conception
  affrontée : « tous les nombres sont sur une droite » (ajoutée ici). `reveal` : `geste:'quart'`,
  z = 1 tourne et l'axe vertical apparaît. (Retour de l'option 2 : « 0 × 0 = 0, pas −1 ». Option 3 :
  « (−½)² = ¼, pas −1 ».)
- **`axe-i`** · `axeI:1, pts:[1,i]` · le nom, comme réponse : l'axe des [[imaginaire|imaginaires]],
  et i au point (0 ; 1). « Wessel publie en 1799, en danois ; Argand, à Paris, publie la même idée en
  1806. » (fiche de mot `plan-complexe`, §8). Pas d'action.
- **`quatre-quarts`** · `seq` : 1 → i → −1 → −i → 1, quatre quarts de tour · tex i² = −1, i³ = −i,
  i⁴ = 1. **V** « i³ = ? » ✓ −i (trois quarts de tour). ✗ i : le cycle mal compté
  (`items.yaml`, puissance-i-cycle-errone) → i³ = i² × i = −i. ✗ −1 : c'est i², deux quarts de tour.
- **`point-z`** · `z:3+2i` · le nom : le complexe z = a + ib a pour [[image|image]] le point M(a ; b),
  et z est l'[[affixe|affixe]] de M. Re(z) = a, Im(z) = b, deux réels. C'est la forme algébrique.
  Pas d'action.
- **`partie-imag`** · **Q** « Im(3 − 5i) = ? » ✓ −5. ✗ −5i (`items.yaml`, im-inclut-i) → Im(z) est
  un réel, le coefficient de i. ✗ 3 (`items.yaml`, confond-re-im) → 3 est la partie réelle,
  l'abscisse.
- **`egalite`** · deux complexes sont égaux s'ils ont la même image, donc les mêmes parties réelles et
  les mêmes parties imaginaires. **Q** « (2x − 1) + (y + 3)i = 5 − 2i, avec x, y réels. » ✓ x = 3,
  y = −5. ✗ x = −½, y = 2 : réel identifié à imaginaire (confond-re-im) → abscisse avec abscisse.
  ✗ « y = −3 − 2i » : le i gardé dans la partie imaginaire (im-inclut-i) → y + 3 = −2.
- **`fois-i`** · pari de la figure 2/3 · `z:3+2i, opts:[−2+3i, 2+3i, −3−2i]` (A, B, C, sans
  étiquette) · **P** « Où va le point de z = 3 + 2i quand on multiplie par i ? » options : « en A, un
  quart de tour » / « en B, Re et Im échangés » / « en C, un demi-tour ». Conception affrontée :
  « multiplier par i, c'est échanger les parties » (ajoutée ici). `reveal` : la ligne
  i(3 + 2i) = 3i + 2i² = −2 + 3i, puis `geste:'quart'` et l'équerre en O.
- **`fois-i-curseur`** · **M** `ctl:'z'` · `need` deux crans · « Fais glisser z. » iz est toujours à
  la même distance de O, à angle droit (coordonnées (−b ; a)). `fort` : « Multiplier par i, c'est
  tourner d'un quart de tour. »

### Partie 3 : Calculer (scène `plan`)

- **`somme`** · `z:3+2i, w:1−4i, geste:'trans'` · **Q** « (3 + 2i) + (1 − 4i) = ? » ✓ 4 − 2i. ✗ 4 + 6i :
  le signe de −4i perdu (`items.yaml`, signe-parties-perdu) → 2 + (−4) = −2. ✗ 2 : on a tout additionné
  (confond-re-im) → réels ensemble, imaginaires ensemble. `reveal` : la translation. `apres` :
  « Ajouter w, c'est translater par la flèche de w. »
- **`produit`** · **D** puis Q (B3) · lignes : (3 − 2i)(1 + 4i) = 3 + 12i − 2i − 8i² (r : on développe
  comme (a + b)(c + d)). Pari « La ligne suivante ? » ✓ 11 + 10i (−8i² = +8). ✗ −5 + 10i : i² = +1
  (`items.yaml`, i2-egale-plus-un) → i² = −1, donc −8i² = 8. ✗ 3 − 8i : produit terme à terme
  (`items.yaml`, produit-non-developpe) → il y a quatre termes, pas deux.
- **`carre`** · **V** « (2 + i)² = ? » ✓ 3 + 4i. ✗ 3 : (a + b)² lu a² + b² → le double produit 4i
  manque. ✗ 5 + 4i : i² = +1. (Ce calcul sert au retour.)

### Partie 4 : Le conjugué (scène `plan`)

- **`conjugue`** · `geste:'miroir'` · le nom : le [[conjugue|conjugué]] de z = a + ib est
  z̄ = a − ib, et son image est le symétrique de M par rapport à l'axe des réels. Pas d'action.
- **`ou-zzbar`** · pari de la figure 3/3 · `z:3+2i` · **P** « Le produit z × z̄, sur le plan, tombe… »
  options : « sur l'axe des réels » / « sur l'axe des imaginaires » / « n'importe où, selon z ».
  Conception affrontée : « un produit de deux complexes non réels n'est jamais réel » (ajoutée ici).
  `reveal` : trois crans de z (3 + 2i, 1 + i, 2 − 3i) et z z̄ = 13, 2, 13, tous sur l'axe des réels,
  à droite de O.
- **`zzbar`** · **D** puis Q · ligne : (a + ib)(a − ib) = a² − (ib)² (r : l'identité
  (A + B)(A − B)). Pari « La ligne suivante ? » ✓ a² + b², un réel positif. ✗ a² − b² : le i² oublié
  (i2-egale-plus-un) → (ib)² = i²b² = −b². ✗ a² − b² + 2iab : c'est z², pas z z̄
  (`items.yaml`, conjugue-somme-vs-difference, face « on confond les écritures ») → il y a un signe
  moins dans le second facteur.
- **`z-plus-zbar`** · **Q** « z + z̄ = ? » ✓ 2a, un réel. ✗ 2ib : c'est z − z̄ (conjugue-somme-vs-difference)
  → dans la somme, les parties imaginaires s'annulent. ✗ 0 : z et z̄ ne sont pas opposés → −z est
  l'opposé, symétrique par rapport à O. `apres` : z réel ⇔ z = z̄ ; z imaginaire pur ⇔ z̄ = −z.
- **`conj-prop`** · **V** « (2 + i)² = 3 + 4i. Alors (2 − i)² = ? » ✓ 3 − 4i : le conjugué d'un
  produit est le produit des conjugués. ✗ 3 + 4i : « le carré efface le signe », lu comme pour les
  réels → recalcule 4 − 4i + i². ✗ 5 : c'est (2 + i)(2 − i), le produit par le conjugué.
- **`diviser`** · **D** puis Q · lignes : (2 + 3i)/(1 − 2i) = (2 + 3i)(1 + 2i) / ((1 − 2i)(1 + 2i))
  (r : on multiplie en haut et en bas par le conjugué du dénominateur) ; = (−4 + 7i)/((1 − 2i)(1 + 2i)).
  Pari « Le dénominateur, puis le résultat ? » ✓ 5, donc −4/5 + (7/5)i. ✗ −3, donc 4/3 − (7/3)i :
  1 − 4 au lieu de 1 + 4 (i² oublié) → c'est a² + b². ✗ (2 + 3i)/5 : le conjugué n'a multiplié que le
  dénominateur (`items.yaml`, quotient-conjugue-incomplet) → haut et bas, sinon la valeur change.

### Partie 5 : Le module et la distance (scène `plan`)

- **`rappel`** · `sujet:'calculer avec i'` · le texte propose la pause : on est au milieu de la leçon.
  **V** « i(1 + 2i) = ? » ✓ −2 + i. ✗ 2 + i : i² = +1. ✗ 3i : i × 2i lu 2i → i × 2i = 2i² = −2.
  Elle reprend les parties 2 et 3.
- **`module`** · `z:3+2i, geste:'cercle'` (centre O, rayon \|z\|) · le nom : le [[module|module]]
  \|z\| = √(a² + b²) = √(z z̄), la distance OM. z̄, −z et iz sont sur le même cercle. Pas d'action.
- **`module-calc`** · **Q** « \|−3 + 4i\| = ? » ✓ 5. ✗ 7 (`items.yaml`, module-lineaire) → c'est
  Pythagore, pas une somme. ✗ 25 (`items.yaml`, module-oubli-racine) → la racine manque.
- **`module-somme`** · `z:3, w:4i` · **Q** « \|3 + 4i\| et \|3\| + \|4i\| : égaux ? » ✓ « non : 5 et
  7 ». ✗ « oui, comme la valeur absolue » (bible B1 ; `items.yaml`, module-produit-additif, face
  « somme ») → les deux côtés d'un triangle ne font pas le troisième. ✗ « oui, si l'on compte les
  parties » : c'est encore 3 + 4 = 7 → \|3 + 4i\| = √25. `apres` : pour un produit, en revanche,
  \|zw\| = \|z\| × \|w\| (gabarit 6).
- **`distance`** · `ab:1, geste:'segment'` · **Q** « A(2 + 5i), B(6 + 2i). AB = ? » ✓ 5
  (\|z_B − z_A\| = \|4 − 3i\|). ✗ 2√10 = \|z_B\| (`items.yaml`, distance-affixe-brute) → c'est OB ;
  il faut la différence. ✗ 7 : module-lineaire.
- **`cercle`** · **Q** « Les points M d'affixe z tels que \|z + 2\| = 2 forment… » ✓ « le cercle de
  centre le point d'affixe −2, de rayon 2 ». ✗ « …de centre le point d'affixe 2 » : \|z + 2\| lu
  comme distance à 2 → \|z + 2\| = \|z − (−2)\|. ✗ « le cercle de centre O, de rayon 2 » : \|z + 2\|
  lu \|z\| + 2 (module-produit-additif) → la distance de M à un point fixe. `reveal` :
  `geste:'cercle'`, {−2, 2}. (Ce cercle revient au bac.)

### Partie 6 : Le second degré (scène `plan`)

- **`somme-carres`** · retour sur `zzbar`, lu à l'envers · **Q** « x² + 4 se factorise en… »
  ✓ (x + 2i)(x − 2i). ✗ (x + 2)² : il manque le double produit 4x. ✗ « elle ne se factorise pas » :
  c'était vrai dans ℝ → z z̄ = a² + b², avec a = x et b = 2.
- **`x2-moins`** · **Q** « Les solutions de z² = −4 ? » ✓ 2i et −2i. ✗ −2 (bible B1 : √(−4) = −2) →
  (−2)² = 4. ✗ 2i seulement : il manque −2i → (−2i)² = −4 aussi.
- **`canonique`** · **D** puis Q · l'équation de `savoir` revient · lignes : z² − 2z + 5 = (z − 1)² + 4
  (r : forme canonique) ; = (z − 1)² − (2i)² (r : 4 = −(2i)²). Pari « Donc les solutions ? »
  ✓ 1 + 2i et 1 − 2i. ✗ « aucune : Δ = −16 < 0 » (`items.yaml`, delta-negatif-aucune-solution) → le
  mur de ℝ tombe dans ℂ. ✗ −1 + 2i et −1 − 2i : le signe de (z − 1) perdu → z − 1 = ±2i. `apres` :
  `fort` « Dans ℂ, Δ < 0 n'est plus un mur. »
- **`formule-delta`** · le nom, comme réponse : si a, b, c sont réels et Δ < 0, les solutions sont
  z = (−b + i√(−Δ))/(2a) et son conjugué. Δ = 0 : une solution double ; Δ > 0 : comme dans ℝ. tex.
  Pas d'action.
- **`conjuguees`** · `pts:[]` (les racines cachées) · **P** « Sur le plan, les deux solutions
  1 + 2i et 1 − 2i sont… » options : « symétriques par rapport à l'axe des réels » / « symétriques par
  rapport à O » / « sans lien entre elles ». Conception affrontée : « oublier que les racines d'une
  équation à coefficients réels sont conjuguées » (bible B1). `reveal` : les deux points, et le
  miroir de `conjugue` en pointillé. `apres` : « Coefficients réels : si z₀ est solution, z̄₀ l'est. »
- **`bicarree`** · `sexp 2.4.9`, `sm 2.2.6` · **Q** « z⁴ + 5z² + 4 = 0. On pose Z = z² :
  Z² + 5Z + 4 = 0, Z = −1 ou Z = −4. Les solutions en z ? » ✓ i, −i, 2i, −2i. ✗ −1 et −4 : Z n'est pas
  l'inconnue (`items.yaml`, changement-inconnue-retour-incomplet, face A) → reviens à z² = Z. ✗ i et
  2i : une seule racine par Z (même id, face B) → z² = Z en a deux, opposées.

### Partie 7 : Filière SM, coefficients complexes (scène `plan`)

Ouverte par « Filière SM. En PC et SVT, ce n'est pas à ton programme » et « Passer à la suite »
(`data-aller` vers `retour-cube`).

- **`sm-signe`** · Δ peut ne plus être réel ; on cherche alors un δ tel que δ² = Δ. **Q** « Δ = −2i.
  Δ < 0 ? » ✓ « la question n'a pas de sens : on ne compare pas les complexes ». ✗ « oui, il y a un
  signe moins » : discuter le signe d'un Δ non réel (leçon ancienne, R4b) → la seule question est
  Δ = 0 ou non. ✗ « non, un imaginaire pur est positif » : même conception → i > 0 et i < 0 donnent
  tous deux i² > 0, or i² = −1.
- **`sm-delta`** · **D** puis Q · Δ = 3 + 4i, δ = x + iy · lignes : x² − y² = 3 et 2xy = 4 (r :
  égalité de deux complexes, `egalite`) ; x² + y² = \|Δ\| = 5 (r : \|δ\|² = \|Δ\|). Pari « Donc δ = ? »
  ✓ 2 + i (ou −2 − i). ✗ 2 − i : le signe de xy perdu (`items.yaml`, carre-parfait-signe-oppose) →
  2xy = 4 > 0, x et y de même signe. ✗ √3 + 2i : la racine prise partie par partie → (√3 + 2i)² =
  −1 + 4√3 i.
- **`sm-resoudre`** · **Q** « z² − (3 + i)z + 2 + 2i = 0. Δ = −2i = (1 − i)². Les solutions ? »
  ✓ 2 et 1 + i. ✗ 1 + i et 1 − i : racines conjuguées par réflexe (`items.yaml`,
  racines-conjuguees-hors-reels) → les coefficients ne sont pas réels. ✗ 2 + i et 1 : δ = 1 + i, dont
  le carré est 2i (carre-parfait-signe-oppose) → vérifie δ² avant de l'employer.
- **`sm-somme-produit`** · `apres` de la factorisation a(z − z₁)(z − z₂) · **V** (SM 2024, I.2,
  0,5 pt) « z² − 2iz + α = 0. z₁ + z₂ et z₁z₂ ? » ✓ 2i et α. ✗ −2i et α : la somme vaut −b/a, ici
  −(−2i) (`items.yaml`, viete-somme-produit-inverses, face « signe ») → recontrôle sur
  z² − 3z + 2 = 0, de racines 1 et 2. ✗ α et 2i : somme et produit échangés (même id).

### Partie 8 : Retour à l'énigme (scènes `plan`, puis `cardan`)

- **`retour-cube`** · `plan`, `pts:[2+i]` · **D** puis Q · lignes : (2 + i)² = 3 + 4i (r : `carre`) ;
  (2 + i)³ = (3 + 4i)(2 + i) = 6 + 3i + 8i + 4i² (r : on développe). Pari « Donc (2 + i)³ = ? »
  ✓ 2 + 11i, et 11i = √−121 (car (11i)² = −121). ✗ 10 + 11i : i² = +1. ✗ 6 + 11i : le terme 4i²
  oublié → quatre termes. `apres` : 2 + i est un nombre dont le cube vaut 2 + √−121.
- **`retour-conj`** · **Q** « Et (2 − i)³, sans calcul ? » ✓ 2 − 11i : le conjugué d'un produit
  (`conj-prop`). ✗ 2 + 11i : le cube lu comme s'il effaçait le signe → (2 − i)³ est le conjugué de
  (2 + i)³. ✗ −2 − 11i : conjugué confondu avec opposé (`items.yaml`, conjugue-mauvais-axe) → z̄
  change le signe de Im seulement.
- **`retour-somme`** · `pts:[2+i, 2−i]`, puis scène `cardan`, `quatre:1` · **Q** « Donc
  ∛(2 + √−121) + ∛(2 − √−121) = (2 + i) + (2 − i) = ? » ✓ 4. ✗ 4 + 2i : les parties imaginaires
  ajoutées (conjugue-somme-vs-difference) → z + z̄ = 2 Re(z). ✗ 2i : c'est z − z̄. `apres` : texte
  dépendant du pari `fausse`, et `fort` « Le détour par l'impossible ramène à 4. » Repli `html` :
  « Un complexe a trois racines cubiques ; la formule demande de les apparier (ici,
  (2 + i)(2 − i) = 5). Hors programme. »
- **`retour-pourquoi`** · **Q** « Pourquoi les mathématiciens ont-ils fini par accepter √−1 ? »
  ✓ « un calcul avec √−121 menait à une vraie solution réelle, 4 ». ✗ « pour donner une solution à
  x² = −1 » (bible B1 ; `02-comprendre-en-profondeur.md` §5.4) → x² = −1 sans solution n'inquiétait
  personne ; la formule de Cardan, si. ✗ « parce qu'on les a placés dans un plan » : Wessel et Argand
  viennent plus de deux siècles après Bombelli → le plan les a rendus visibles, pas acceptables.
  L'énigme est résolue.

### Partie 9 : Au bac (scène `plan`), voir §6

`bac`, `bac-a`, `bac-b`, `bac-c`, `bac-copie`, `bac-2`, `bac-2-racines`.

### Partie 10 : Bilan (scènes `quiz`, `end`)

- **`q1`** · i · **Q** « √(−9) = ? » ✓ « l'écriture n'a pas de sens ; z² = −9 a pour solutions 3i et
  −3i ». ✗ −3 : (−3)² = 9. ✗ 3i seulement : −3i aussi.
- **`q2`** · le module · **Q** « \|1 + i\| + \|1 − i\| et \|(1 + i) + (1 − i)\| : égaux ? » ✓ non :
  2√2 et 2. ✗ « oui, le module d'une somme est la somme des modules ». ✗ « oui, car ce sont des
  conjugués » → conjugués, même module, mais la somme ne suit pas.
- **`q3`** · le second degré · **Q** « z² + 2z + 10 = 0 ? » ✓ −1 + 3i et −1 − 3i. ✗ « aucune
  solution, Δ < 0 ». ✗ 1 ± 3i : le signe de −b.
- **`fin`** · scène `end`, cinq lignes : i² = −1 et le quart de tour ; un complexe est un point ; le
  conjugué est un miroir, et z z̄ = a² + b² ; \|z_B − z_A\| = AB ; Δ < 0 donne deux solutions
  conjuguées. La fin de séance (forme de `profileHTML`) : les « Vérifie » réussies ; les paris
  `fausse`, `quart`, `fois-i`, `ou-zzbar`, `conjuguees` rappelés ; le lien vers les exercices ; B2
  annoncée. Puis le renvoi piège par piège (B7) : i² et produit → gabarit 2 ; conjugué et division →
  4 et 5 ; module et distance → 6 et 7 ; Δ < 0 → 8 ; changement d'inconnue → 9.

---

## 4. La pause et le rappel (A8)

La pause est proposée dans le texte de **`rappel`**, la **25ᵉ étape sur 55 (45 %, dans la fourchette
de 30 % à 70 %)**, à la frontière des parties 4 et 5. Sa question « Vérifie » est **i(1 + 2i) = ?**
(✓ −2 + i ; leurres 2 + i et 3i). Elle reprend le quart de tour et le produit.

Contrôle A7 sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » compte 3 étapes
(`sav-rappel`, `cubique`, `formule`). M7 (tunnel) : la scène `plan` change de géométrie ou de geste à
chaque étape des parties 2 à 6. A6 : aucune option « je ne sais pas ».

---

## 5. Conceptions erronées → étape qui les affronte (B5)

| Conception | Source | Étapes |
|---|---|---|
| i² = 1 ; √a·√b = √(ab) pour les négatifs | bible B1 ; `items.yaml` i-derive-par-racine-usuelle | `bombelli`, `q1` |
| √(−4) = −2 | bible B1 | `x2-moins`, `q1` |
| on a inventé i pour résoudre x² = −1 | bible B1 ; 02 §5.4 | `retour-pourquoi` |
| une racine d'un négatif signale une solution qui n'existe pas | ajoutée ici | `fausse` |
| tous les nombres sont sur une droite | ajoutée ici | `quart` |
| multiplier par i, c'est échanger Re et Im | ajoutée ici | `fois-i` |
| la partie imaginaire contient le i | `items.yaml` im-inclut-i | `partie-imag`, `egalite` |
| Re et Im échangés | `items.yaml` confond-re-im | `partie-imag`, `egalite`, `somme` |
| i² = +1 dans un produit | `items.yaml` i2-egale-plus-un | `produit`, `carre`, `zzbar`, `rappel`, `retour-cube` |
| produit terme à terme | `items.yaml` produit-non-developpe | `produit` |
| signe d'une partie perdu | `items.yaml` signe-parties-perdu | `somme` |
| cycle des puissances de i | `items.yaml` puissance-i-cycle-errone | `quatre-quarts` |
| un produit de non-réels n'est jamais réel | ajoutée ici | `ou-zzbar` |
| z + z̄ et z − z̄ confondus | `items.yaml` conjugue-somme-vs-difference | `z-plus-zbar`, `retour-somme` |
| conjugué et opposé confondus | `items.yaml` conjugue-mauvais-axe | `retour-conj` |
| diviser sans le conjugué, ou à moitié | bible B1 ; `items.yaml` quotient-conjugue-incomplet | `diviser` |
| module = a + b, ou sans racine | `items.yaml` module-lineaire, module-oubli-racine | `module-calc`, `distance` |
| module d'une somme = somme des modules | bible B1 ; `items.yaml` module-produit-additif | `module-somme`, `cercle`, `q2` |
| AB lu sur \|z_B\| | `items.yaml` distance-affixe-brute | `distance` |
| Δ < 0, donc aucune solution | `items.yaml` delta-negatif-aucune-solution | `savoir`, `canonique`, `q3` |
| oublier que les racines (coefficients réels) sont conjuguées | bible B1 | `conjuguees` |
| racines conjuguées même à coefficients complexes | `items.yaml` racines-conjuguees-hors-reels | `sm-resoudre` |
| le retour de Z à z incomplet | `items.yaml` changement-inconnue-retour-incomplet | `bicarree` |
| signe d'un Δ non réel discuté | leçon ancienne, R4b | `sm-signe` |
| mauvais carré pour δ | `items.yaml` carre-parfait-signe-oppose | `sm-delta`, `sm-resoudre` |
| somme et produit des racines échangés, ou −b/a lu b/a | `items.yaml` viete-somme-produit-inverses | `sm-somme-produit` |
| a oublié dans le discriminant ou dans 2a | `items.yaml` viete-coefficient-a-oublie (même mécanisme) | `bac-2`, `bac-2-racines` |
| \|w\|² développé sans conjugué | ajoutée ici | `bac-b` |

Conceptions d'`items.yaml` laissées aux exercices seulement : imaginaire-pur-mauvaise-partie
(gabarit 1), milieu-sans-moyenne (gabarit 6). Conceptions qui relèvent de B2 (module-argument-vs-parties,
algebrique-exponentielle-conversion) et de l'accroche ancienne (extension-equation-mal-appariee,
carre-reel-peut-etre-negatif) : non reprises.

---

## 6. Au bac (B6)

### 6.1 L'exemple commenté

Bac **SExp 2022, session normale, exercice 2** (3 points), **question 4** : a) 0,25, b) 0,5, c) 0,25
(`docs/sujets/maths/nombres-complexes-1.md`, statut vérifié). (Γ) est le cercle de centre D(d = −2)
et de rayon 2, (Γ′) celui de centre O et de rayon 4. M d'affixe z est sur les deux cercles. a)
vérifier \|z + 2\| = 2 ; b) prouver z + z̄ = −8 (« remarquer que \|z\| = 4 ») ; c) en déduire que les
cercles se coupent en un point unique. On n'y emploie que des outils de cette leçon. L'écran rappelle
d = −2 comme « donné par la question 1 ».

- **`bac`** · `plan`, `cercles:[{−2,2},{0,4}]`, sans le point d'intersection · « Premier geste ? »
  (pari de prédiction, comme dans les specs précédentes) : « traduire “M ∈ (Γ)” par une distance :
  \|z − d\| = 2 » / « poser z = x + iy et développer tout de suite » (cela aboutit, mais plus
  longuement, et le sujet guide par z + z̄) / « lire le point commun sur la figure » (une figure ne
  prouve pas l'unicité). `reveal` : la ligne DM = \|z − d\| = \|z + 2\|.
- **`bac-a`** · **Q** « Pourquoi \|z + 2\| = 2 ? » ✓ « DM = \|z − (−2)\| et DM est le rayon ».
  ✗ « \|z\| + 2 = 2 » : module d'une somme → la distance à D. ✗ « \|z − 2\| = 2 » : le signe de d →
  z − d = z + 2.
- **`bac-b`** · **D** puis Q · lignes : \|z + 2\|² = (z + 2)(z̄ + 2) (r : \|w\|² = w w̄, et le
  conjugué de z + 2 est z̄ + 2) ; = z z̄ + 2(z + z̄) + 4 (r : on développe). Pari « Avec z z̄ = 16… »
  ✓ 16 + 2(z + z̄) + 4 = 4, donc z + z̄ = −8. ✗ « \|z\|² + 2² = 16 + 4 = 4, impossible » : Pythagore
  appliqué à une somme quelconque → les termes 2z + 2z̄ manquent. ✗ « (z + 2)(z̄ − 2) » : le conjugué
  appliqué au réel 2 → 2̄ = 2.
- **`bac-c`** · **Q** « z + z̄ = −8 et \|z\| = 4. Donc… » ✓ Re(z) = −4, puis Im(z)² = 16 − 16 = 0 :
  z = −4, un seul point. ✗ z = −8 : z + z̄ lu z (conjugue-somme-vs-difference) → z + z̄ = 2 Re(z).
  ✗ « z = −4 + 4i ou −4 − 4i » : \|z\| = 4 lu \|Im z\| = 4 → Re² + Im² = 16. `reveal` : le point −4,
  où les cercles sont tangents.
- **`bac-copie`** · `html` (forme de `bac-copie` dans l'exponentielle) · la rédaction attendue en
  trois blocs a), b), c). Barème du sujet : 0,25 + 0,5 + 0,25. Pas d'action, et aucune phrase sur
  ce que « le correcteur » fait.

### 6.2 Le second exemple, que l'élève complète

Bac **SExp 2018, session normale, exercice 2, question 1** (0,75 point) : résoudre
2z² + 2z + 5 = 0 (même fichier, statut vérifié avec correction de fond : a = −½ + (3/2)i est la racine
de partie imaginaire positive, réutilisée en 2b).

- **`bac-2`** · **Q** « Δ = ? » ✓ −36. ✗ −16 : a = 1 supposé (4 × 1 × 5) → ici a = 2. ✗ 44 : le
  signe de −4ac.
- **`bac-2-racines`** · `reveal` : les deux points sur `plan` · **Q** « Les solutions ? »
  ✓ −½ + (3/2)i et −½ − (3/2)i. ✗ −1 ± 3i : divisé par 2 au lieu de 2a = 4. ✗ ½ ± (3/2)i : le signe
  de −b. `apres` : « Barème du sujet : 0,75. La question 2b réutilise la première solution. »

**Les autres sujets transcrits pour la notion** (servent aux exercices) : SExp 2019 Q1
z² − 2z + 4 = 0 (0,75) ; SExp 2021 Q1 z² − √3 z + 1 = 0 (0,75) ; SExp 2020 Q1
z² − 2(√2 + √6)z + 16 = 0 avec Δ = −4(√6 − √2)² à vérifier (0,5 + 1) ; SM 2017 Partie 1
Δ = (2im)² (0,5 + 0,5) ; SM 2018 I.1 Δ = (im − 2i)² (0,25 + 0,5) ; SM 2019 I.1 (0,25 + 0,5) ; SM 2024
I.1-2 (0,25 + 0,25 + 0,5). Les autres questions de ces sujets (argument, rotation, alignement)
relèvent de B2.

---

## 7. Les exercices générés (`components/pilote/exercices/complexes.js`, à créer)

Format d'`exponentielle.js` : la réponse est calculée et chaque leurre porte `fb` et `erreur` (l'id
de la conception, §5). **Tout tirage est rejeté si un leurre égale la réponse.** Par exemple, le leurre
« i² = +1 » d'un produit (a + ib)(c + id) égale la réponse si bd = 0, d'où b, d ≠ 0. Les valeurs sont
exactes (fractions, radicaux simplifiés k√m) dans les deux filières : le cadre n'exige pas de valeur
approchée ici.

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `forme-algebrique` | 1 | Re, Im de a + ib, a, b ∈ {−6…6}∖{0} ; égalité (px + q) + (ry + s)i = u + vi ; imaginaire pur pour (m − k) + (m + j)i | `sexp 2.4.1`, `sm 2.2.1` | im-inclut-i ; confond-re-im ; signe-parties-perdu ; imaginaire-pur-mauvaise-partie |
| 2 | `produit` | 1 | (a + ib)(c + id), a, c ∈ {−5…5}, b, d ∈ {−5…5}∖{0} ; (a + ib)² ; iⁿ, n ∈ {5…40} | `sexp 2.4.1`, `sm 2.2.1` | i2-egale-plus-un ; produit-non-developpe ; (a + b)² = a² + b² ; puissance-i-cycle-errone |
| 3 | `quart-de-tour` | 1 | z = a + ib, a, b ∈ {−4…4} non tous deux nuls : affixe de iz, −z, z̄ ; le point sur le plan | `sm 2.2.3`, `sexp 2.4.4` | « échanger Re et Im » (b + ia) ; conjugue-mauvais-axe (−z pour z̄) ; demi-tour pour quart de tour |
| 4 | `conjugue` | 2 | z z̄, z + z̄, z − z̄, conjugué d'un produit ; z = a + ib tiré | `sexp 2.4.1`, `sm 2.2.1` | conjugue-somme-vs-difference ; a² − b² ; z² pour z z̄ |
| 5 | `quotient` | 2 | (a + ib)/(c + id), c² + d² ∈ {2, 5, 10, 13, 17, 25} | `sexp 2.4.1`, `sm 2.2.1` | quotient-conjugue-incomplet (dénominateur seul ; c² − d²) ; i2-egale-plus-un ; fraction renversée |
| 6 | `module-distance` | 2 | \|a + ib\| (triplets pythagoriciens ou √n) ; AB = \|z_B − z_A\| ; milieu ; \|zw\| | `sexp 2.4.4`, `sm 2.2.3` | module-lineaire ; module-oubli-racine ; distance-affixe-brute ; milieu-sans-moyenne ; module-produit-additif |
| 7 | `ensemble-points` | 2 | \|z − ω\| = r (ω ∈ {±k, ±ki, a + ib}, r ∈ {1…5}) → cercle ; \|z − a\| = \|z − b\| → médiatrice | `sexp 2.4.4`, `sm 2.2.3` | centre de signe opposé ; rayon r² ; \|z\| + k pour \|z + k\| |
| 8 | `second-degre-reel` | 2 | on tire les racines p ± iq (p ∈ {−3…3} par demis, q ∈ {½…4} ou q = k√3), puis a ∈ {1, 2, 4} et les coefficients entiers a(z² − 2pz + p² + q²) ; types des sujets 2018, 2019, 2021 | `sexp 2.4.8`, `sm 2.2.5` | delta-negatif-aucune-solution ; a oublié dans 4ac ou dans 2a ; signe de −b ; √(−Δ) sans i (racines réelles p ± q) |
| 9 | `se-ramene` | 3 | (z − r)(z² + bz + c) = 0, r réel, Δ < 0 ; ou bicarrée (Z − Z₁)(Z − Z₂) avec Z₁, Z₂ ∈ {−1, −4, −9, 1, 4} distincts | `sexp 2.4.9`, `sm 2.2.6` | changement-inconnue-retour-incomplet (faces A et B) ; delta-negatif-aucune-solution (Z < 0 rejeté) |
| 10 | `racine-de-delta` | 3 | Δ = (x + iy)², x, y ∈ {−4…4}∖{0} ; trouver δ | `sm 2.2.5` ; `filieres: ['SM']` | carre-parfait-signe-oppose ; racine partie par partie |
| 11 | `second-degre-complexe` | 3 | racines z₁, z₂ entiers de Gauss non conjugués, a = 1 ; Δ = (z₁ − z₂)² donné à vérifier (forme des sujets SM 2017, 2018) ; somme et produit | `sm 2.2.5`, `sm 2.2.6` ; `filieres: ['SM']` | racines-conjuguees-hors-reels ; viete-somme-produit-inverses ; viete-coefficient-a-oublie ; signe d'un Δ non réel |
| 12 | `deux-cercles` | 3 | type SExp 2022 Q4 : d réel ∈ {±2, ±3}, r₁ ∈ {1, 2, 3}, r₂ = \|d\| + r₁ (tangence) ; z + z̄ = (r₂² + d² − r₁²)/d, puis le point unique | `sexp 2.4.4`, `sexp 2.4.1`, `sm 2.2.3` | conjugué appliqué à un réel ; \|w\|² développé sans conjugué ; \|z\| lu \|Im z\| |

Toutes les capacités citées sont enseignées dans la leçon (B7). Le gabarit 7 (médiatrice) étend
`cercle` d'un pas : à confirmer (§9).

---

## 8. À vérifier, et questions pour le relecteur

**Histoire et sources (au plus 3 places).**
1. **Cardan et x³ = 15x + 4** (`formule`, `fausse`, retour). [V] MacTutor, *Quadratic, cubic and
   quartic equations* (https://mathshistory.st-andrews.ac.uk/HistTopics/Quadratic_etc_equations/) :
   « When solving x^3 = 15x + 4 he obtained an expression involving √-121 » ; Cardan savait que
   x = 4 est solution, et en écrivit à Tartaglia en 1539 ; *Ars Magna* paraît en 1545. Le calcul
   q²/4 − p³/27 = 4 − 125 = −121 est aussi dans *Casus irreducibilis* (Wikipedia), qui donne
   2 ± 11i et la racine cubique 2 + i. **À vérifier : la forme exacte de la formule telle que
   Cardan l'écrit.** L'écran l'écrit en notation moderne, sans guillemets.
2. **Bombelli, 1572** (`bombelli`, `retour-pourquoi`). [V] MacTutor, biographie
   (https://mathshistory.st-andrews.ac.uk/Biographies/Bombelli/) : les trois premiers livres de
   l'*Algebra* paraissent en 1572 ; il emploie les complexes pour tirer des solutions réelles de la
   formule de Cardan-Tartaglia ; « appeared to me more sophistic than true ». [V] Wikipedia, *Rafael
   Bombelli* : 1572, « plus of minus » pour i. **[S] le calcul précis (2 + √−1)³ = 2 + √−121
   attribué à Bombelli** : aucune des pages lues ne le montre. Il ne s'affiche pas comme fait
   historique : l'écran dit « Bombelli calcule avec √−1 », et le calcul de `retour-cube` est celui de
   l'élève. **À vérifier : ce que la phrase « plus sophistique que vrai » désigne exactement** ; elle
   ne s'affiche pas tant que ce n'est pas tranché.
3. **Wessel (1797, 1799) et Argand (1806)** (`quart`, `axe-i`). [V] Wikipedia, *Caspar Wessel* :
   présenté en 1797 à l'Académie royale danoise, publié en 1799, en danois, passé inaperçu près d'un
   siècle, retraduit en français en 1897 ; arpenteur. [V] Wikipedia, *Jean-Robert Argand* :
   publication privée en 1806 à Paris, alors qu'il tenait une librairie ; i comme rotation de 90°.
   Ce sont des sources tertiaires : **à confirmer** sur MacTutor avant la mise en ligne.

Hors du fil, en fiche de mot seulement : Descartes et le mot « imaginaire » (1637) [S] (Wikipedia,
*Complex number* : « coined by Descartes in 1637 »). **« par dérision » n'est pas sourcé** : la page
dit seulement qu'il insistait sur leur caractère irréel, donc l'écran ne le dit pas. Le duel
Fior-Tartaglia (1535) [V, MacTutor Bombelli] n'entre que dans la fiche `cardan` : il ne sert aucun
pari (B8).

**Exactitude** (tout est à produire par `complexes-outils.js`) :
- x³ − 15x − 4 = (x − 4)(x² + 4x + 1), racines 4 et −2 ± √3 ; (2 + i)² = 3 + 4i ;
  (2 + i)³ = 2 + 11i ; (2 + i)(2 − i) = 5 = 15/3 (l'appariement des racines cubiques, en repli
  seulement) ; i(3 + 2i) = −2 + 3i ; (3 − 2i)(1 + 4i) = 11 + 10i ; (2 + 3i)/(1 − 2i) = −4/5 + (7/5)i ;
  \|−3 + 4i\| = 5 ; AB = 5 ; z z̄ = 13, 2, 13 pour les crans de `ou-zzbar` ; les racines 1 ± 2i,
  −½ ± (3/2)i, −1 ± 3i ; Δ = −2i = (1 − i)² ; (2 + i)² = 3 + 4i pour `sm-delta`.
- Chaque leurre a été vérifié à la main contre une coïncidence avec la bonne réponse. Une seule a été
  trouvée et écartée : dans `bac-b`, le leurre « \|z + 2\|² = (z + 2)² » menait à z ∈ {0 ; −4}, qui
  contient la bonne réponse. Il est remplacé par « Pythagore appliqué à une somme ». Le code doit
  refaire ce contrôle.
- La transcription SExp 2018 a été corrigée une fois (a = −½ + (3/2)i et non −½ + (√3/2)i) ; la
  question 1 elle-même n'est pas touchée.
- **Programme, et non cadre d'examen, à confirmer** : (1) en SM, la recherche de δ par
  x² − y², 2xy, x² + y² (les sujets SM donnent presque toujours Δ sous forme de carré) ; (2) la
  somme et le produit des racines, demandés en SM 2024 mais absents du cadre PC/SVT : ils sont mis en
  partie SM ; (3) la factorisation par une racine connue (gabarit 9) en PC/SVT ; (4) l'interprétation
  de iz comme quart de tour au chapitre B1.

**Pour le relecteur.**
1. **Scène nouvelle `plan`** : type nouveau, décision du propriétaire (07 §3.3). B2 la reprendra
   (rotations, argument). **`cardan`** : copie adaptée de `loi`, à confirmer que ce n'est pas un type
   nouveau.
2. **Le quart de tour dans B1.** La bible le place en image-clé de B2. Ce plan le met dans B1, sur
   les coordonnées et sans argument, parce qu'il donne un sens à i² = −1 dès l'ouverture (02 §1.3 :
   « la géométrie n'arrive qu'en R5 »). Accepté, ou faut-il garder B1 sans rotation ?
3. **Le pari `fausse`** n'est tranché qu'en partie 8 (la courbe n'élimine qu'une option). Est-ce
   accepté, comme un pari qui revient (07 §4, point 4) ?
4. **La formule de Cardan à l'écran**, hors programme, montrée et jamais testée : acceptée ?
5. **La partie SM dans la leçon**, avec un saut pour PC/SVT, plutôt qu'une séance 2 : la partie ne
   compte que 4 étapes.
6. **Le second exemple du bac** (SExp 2018 Q1) est court (0,75 point), mais l'élève y choisit deux
   lignes (Δ, puis les racines). Faut-il plutôt SExp 2019 Q1, ou une question SM ?
7. **La médiatrice** (\|z − a\| = \|z − b\|) en gabarit 7 : elle n'a pas d'étape propre dans la leçon.
   Faut-il la garder (B7) ou la retirer ?
8. **Route** : `/pilote/complexes` (fichiers `complexes-*.js`) ou `/pilote/nombres-complexes` ?

## 9. Décisions à trancher (récapitulatif)

1. Accorder la scène de type nouveau `plan` ; confirmer que `cardan` est une copie de `loi`.
2. Le quart de tour dans B1 (emprunt à l'image-clé de B2).
3. Le pari d'ouverture tranché seulement au retour.
4. La formule de Cardan montrée à l'écran.
5. La partie SM intégrée avec un saut.
6. Le second exemple du bac.
7. La médiatrice dans les exercices.
8. La route.
9. Les quatre points de programme du §8 (« Exactitude »), à confirmer contre le programme officiel
   avant la mise en ligne, sans bloquer l'écriture.
