# Spec v3 : les suites numériques (`maths/suites-numeriques`)

> **Pourquoi cette notion.** Les suites ouvrent l'analyse, qui pèse **55 %** en PC/SVT
> (`maths-sexp.yaml`, p. 5) et **50 %** en SM (`maths-sm.yaml`, p. 6). Elles sont dans les **6 sujets
> PC/SVT transcrits sur 6** (fin du problème en 2019, 2022, 2023 ; exercice séparé de 3 à 4 points en
> 2020, 2021, 2024) et dans le problème SM 2019. Quand la suite est u_{n+1} = f(u_n), f est bâtie sur
> exp ou ln (SExp 2019, 2022, 2023 ; SM 2019) : c'est la suite directe des deux pilotes, et aucune
> leçon v3 ne la couvre. (Le calcul intégral, autre candidat, attend les primitives : §8.)
>
> Plan d'auteur pour la leçon pilote `/pilote/suites`, après `/pilote/logarithme` et
> `/pilote/exponentielle`. Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers
> et champs : [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèle de ton et de rythme :
> `web/src/components/pilote/exponentielle-moteur.js`. Fiche : bible A1 (`docs/bible/01-maths.md`).
> L'auteur suit ce plan étape par étape. Il rédige les textes, mais ne décide ni l'ordre, ni les
> paris, ni les leurres. Tout nombre cité ici est à **recalculer par le code** (`suites-outils.js`).
>
> **Scènes nouvelles demandées.** Une seule d'un type nouveau : **`toile`**, la figure-clé
> (l'escalier ou la spirale entre la courbe de f et la droite y = x), voir §3.2. Aucune scène
> existante n'itère une fonction. `miroir` a la droite y = x mais n'itère rien, et `interets` dessine
> un escalier en fonction du temps, pas entre une courbe et la diagonale. Une scène **`doses`** est
> une copie adaptée de `interets`, pas un type nouveau : à confirmer (§8).

---

## 1. Périmètre

### 1.1 Capacités officielles couvertes

| Filière | Id | Libellé (cadre 2025, mot pour mot) | Où |
|---|---|---|---|
| PC, SVT | `sexp 1.1.1` | Utiliser les suites géométriques et les suites arithmétiques pour étudier des exemples de suites de la forme : u_{n+1} = a·u_n + b ou u_{n+1} = (a·u_n + b)/(c·u_n + d) | séance 1 : la forme a·u_n + b (parties 1, 8) ; séance 2 : la forme homographique |
| PC, SVT | `sexp 1.1.2` | Utiliser les limites des suites de référence et les critères de convergence pour déterminer la limite d'une suite numérique. | séance 1 (parties 5, 7) ; séance 2 (comparaison, encadrement) |
| PC, SVT | `sexp 1.1.3` | Déterminer la limite de la composée d'une suite et d'une fonction continue (suites de type v_n = f(u_n)) | séance 1 (partie 6) |
| PC, SVT | `sexp 1.1.4` | Etudier la convergence d'une suite (u_n) de la forme u_{n+1} = f(u_n) où f est une fonction continue sur un intervalle I et qui vérifie f(I) ⊂ I et déterminer sa limite. | séance 1 (parties 2 à 6, 9) |
| PC, SVT | `sexp 1.1.5` | Utiliser les suites pour résoudre des problèmes variés issus de domaines différents. | séance 1 (l'énigme, partie 8 ; Malthus, partie 7) |
| SM | `sm 1.1.1` | Utiliser les suites géométriques et les suites arithmétiques dans l'étude de suites récurrentes. | séance 1 ; séance 2 |
| SM | `sm 1.1.2` | Utiliser les limites des suites de référence, les critères de convergence et la notion de suites adjacentes pour déterminer les limites de suites numériques. | séance 1 sans les suites adjacentes ; séance 2 (adjacentes) |
| SM | `sm 1.1.3` | Etudier la limite de la composée d'une suite et d'une fonction continue (suite de la forme (f(u_n))_n ). | séance 1 |
| SM | `sm 1.1.4` | Etudier la limite des suites de la forme u_{n+1} = f(u_n) où f est une fonction continue sur un intervalle I et vérifiant f(I) ⊂ I . | séance 1 |
| SM | `sm 1.1.5` | Utiliser les suites pour résoudre des problèmes variés issus de différents domaines. | séance 1 |
| SM | `sm 1.3.17` | Appliquer le théorème de Rolle, le théorème des accroissements finis et l'inégalité des accroissements finis dans l'étude de suites numériques du type u_{n+1} = f(u_n) (…) | **séance 2 seulement**, partie réservée SM |

Capacités réutilisées, enseignées ailleurs (prérequis, non testées seules ici) : inéquations
logarithmiques `sexp 1.2.17`, `sm 1.3.10` (le nombre de jours, partie 8) ; limites de base de exp
`sexp 1.2.21`, `sm 1.3.14` (qⁿ = e^{n ln q}, partie 7) ; monotonie d'une fonction `sexp 1.2.7`,
`sm 1.3.3` (f croissante garde l'ordre, partie 3). Le raisonnement par récurrence est de 1ère Bac
(bible A1, prérequis) : on le reprend ici en entier, car c'est la première question de chaque suite
du bac.

### 1.2 Découpage en deux séances

La notion est trop large pour une séance. On coupe selon la forme du bac.

- **Séance 1, « La machine u_{n+1} = f(u_n) »** (cette leçon, **59 étapes**). La chaîne complète
  de la fin du problème d'analyse : calculer des termes, l'escalier entre la courbe et y = x, le
  point fixe, la récurrence (u_n ∈ I), la monotonie (signe de f(x) − x sur I), le critère de
  convergence monotone, la limite par ℓ = f(ℓ) (f continue), la limite de f(u_n), les suites de
  référence qⁿ (par e^{n ln q}), la suite auxiliaire géométrique de u_{n+1} = a·u_n + b, un seuil
  par ln, et deux fins de problème réelles du bac.
- **Séance 2, « Encadrer, comparer »** (leçon à venir, annoncée au bilan). Les suites
  homographiques et leur suite auxiliaire : les **trois exercices séparés** PC/SVT 2020, 2021 et 2024
  (§6.3). Le quotient u_{n+1}/u_n (avec la positivité), la majoration par une géométrique
  (0 < u_{n+1} ≤ k·u_n donne u_n ≤ u_0·kⁿ), les théorèmes de comparaison et d'encadrement, la limite
  de v_n = ln(3 − 2u_n) (2021), la divergence par minoration (SM 2019, Q3). **Partie SM seulement**,
  ouverte par la ligne « Filière SM. En PC et SVT, ce n'est pas à ton programme » et un bouton
  « Passer à la suite » (`data-aller`, comme le saut de l'exponentielle) : l'inégalité des
  accroissements finis |u_{n+1} − α| ≤ k|u_n − α| (`sm 1.3.17`), puis les suites adjacentes
  (`sm 1.1.2`).

### 1.3 Hors programme, qu'on n'enseigne pas

La définition de la limite en ε ; la démonstration du théorème de la limite monotone (il est
**admis**, comme critère de convergence, `sexp 1.1.2`) ; les suites de Cauchy, la borne supérieure ;
la vitesse de convergence et les points fixes attractifs ou répulsifs comme théorie (la partie 6
montre un point fixe qui n'attire pas, sans le nommer) ; les suites définies implicitement par
f_n(x_n) = 0 (elles relèvent du TVI, §8) ; la méthode de Héron (bible, « pour aller plus loin »).

### 1.4 Filières

| | PC, SVT | SM |
|---|---|---|
| Séance 1 | entière | entière |
| Séance 2 | sans accroissements finis ni suites adjacentes | avec |
| Calcul | calculatrice non programmable : ln 100 / ln 2 ≈ 6,64 se calcule | sans calculatrice : l'énoncé donne ln 2 ≈ 0,69 et ln 10 ≈ 2,30 |

Les exercices de séance 1 ne distinguent pas les filières, sauf la consigne d'arrondi du gabarit 10
(champ `filieres`).

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Une situation à prédire, concrète et sourcée : la prise répétée d'un
médicament [V : cours de pharmacologie de l'université de Lausanne, « Repeated administration »,
https://sepia2.unil.ch/pharmacology/repeated-administration : « accumulation occurs when the drug is
administered before the previous dose is completely eliminated », le niveau atteint un plateau, et le
temps pour l'atteindre est fixé par la demi-vie]. Le modèle de la leçon est **simplifié**, et la
scène l'écrit : « un comprimé chaque matin ; en 24 heures, le corps en élimine la moitié ». On note
u_n la quantité (en comprimés) juste après la n-ième prise, avec u_0 = 0 : u_1 = 1, u_2 = 1,5,
u_3 = 1,75. **Chaque matin en ajoute un. Pendant des mois, la quantité grandit-elle sans limite ?**
L'élève parie, puis fait glisser le nombre de jours : la quantité plafonne près de 2. D'où **trois
questions laissées ouvertes : pourquoi jamais au-dessus de 2 ? pourquoi 2 ? et combien de jours pour
en être à 1 % près ?**

**Le retour (partie 8).** Les trois questions tombent avec les outils de la leçon :
1. jamais au-dessus : la récurrence de la partie 3 (0 ≤ u_n < 2) ;
2. exactement 2 : 2 est le point fixe (½·2 + 1 = 2). La suite v_n = u_n − 2 est géométrique de
   raison ½, donc u_n = 2 − 2(½)ⁿ tend vers 2 (`sexp 1.1.1`) ;
3. le nombre de jours : 2 − u_n ≤ 0,02 ⇔ (½)ⁿ ≤ 0,01 ⇔ n ≥ ln 100 / ln 2 ≈ 6,64, donc 7 jours.
   C'est une inéquation résolue par ln, avec le sens renversé car ln ½ < 0 (`sexp 1.1.5`).
   Le dernier pas : doubler la dose double le plateau, mais ne change pas les 7 jours. La dose fixe
   la hauteur, la demi-vie fixe le temps [V, même source].

Le fil rouge : « la machine » u_{n+1} = f(u_n). La partie 2 la dessine (l'escalier), et toutes les
preuves de la leçon se lisent ensuite sur ce dessin.

---

## 3. La chaîne des idées

1. Ce qu'on sait des suites arithmétiques et géométriques (rappel) → 2. l'énigme pose une suite qui
n'est ni l'une ni l'autre → 3. une suite récurrente est une machine u_{n+1} = f(u_n). On la dessine
par l'escalier entre la courbe de f et la droite y = x, et les marches vont au point fixe → 4. ce que
montre le dessin, on le prouve. D'abord rester dans I, par récurrence (calculer des termes ne prouve
rien) → 5. puis le sens de variation, qui se lit sur le signe de f(x) − x sur I et non sur le sens de
f → 6. croissante et majorée, donc convergente. Mais ni « croissante » seul, ni « majorée » seul, et
un majorant n'est pas la limite → 7. la limite, si elle existe, vérifie ℓ = f(ℓ) (f continue) ; un
point fixe seul ne prouve rien → 8. les suites de référence qⁿ, lues par e^{n ln q} → 9. ces outils
résolvent l'énigme, avec une suite auxiliaire géométrique et un ln → 10. le bac.

**Figure-clé : l'escalier de la machine** (scène `toile`, **13 étapes**, un changement chacune) :
`machine` (la courbe de f), `premiere-marche` (u_0, monter à la courbe, reporter par y = x),
`escalier` (trois marches de plus), `ou-vont` (le zoom), `point-fixe` (ℓ marqué), `depart`
(u_0 = 5), `u0-curseur` (u_0 libre) en partie 2 ; `lecture` (les zones f(x) > x et f(x) < x),
`spirale` et `spirale-vu` (f = e^{−x}) en partie 4 ; `pas-retrecissent` (f = x + e^{−x}) en
partie 5 ; `piege-2u` (f = 2x − 1) et `sans-point-fixe` en partie 6. Ses **trois paris** : `ou-vont`,
`depart`, `spirale`. D'autres étapes (`dominos`, `v-recurrence`, `difference`, `depart-mono`, le bac)
montrent la scène sans y ajouter d'élément nouveau.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 6 |
| 2 | La machine et son escalier | Machine | 7 |
| 3 | La récurrence | Récurrence | 7 |
| 4 | Le sens de variation | Variation | 5 |
| 5 | Converger | Converger | 5 |
| 6 | La limite | Limite | 5 |
| 7 | Les suites de référence | Référence | 4 |
| 8 | Retour à l'énigme | Retour | 5 |
| 9 | Au bac | Bac | 9 |
| 10 | Bilan | Bilan | 4 |

**59 étapes.** Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`). Dans les options : ✓ juste ; ✗ fausse, suivie de la conception affrontée
puis de l'idée du retour. B2 s'applique : nommer l'erreur, puis donner le bon geste. L'indice est la
question qui ramène à ce geste. **Couleurs** : aucun texte ne nomme une couleur. On dit « la
courbe », « la droite pointillée y = x », « l'escalier », « la zone hachurée ».

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `savoir` | copie adaptée du pilote exponentielle | le test u_5, puis trois rappels |
| `doses` | **copie adaptée de `interets`** | voir ci-dessous |
| `toile` | **nouvelle (type nouveau)** | voir ci-dessous |
| `table` | copie adaptée du pilote exponentielle | deux ou trois colonnes de termes (n, w_n ; n, 2ⁿ, n + 1) |
| `quiz`, `end` | copies du pilote exponentielle | les trois pièges ; le bilan |

Les scènes des pilotes vivent dans leur fermeture : on les **copie** dans `suites-scenes-a.js` /
`-b.js` / `-c.js`, on ne les importe pas. L'étape du bac n'a pas de scène `bac` propre : la scène
`toile` porte les deux fonctions du bac, et la copie s'affiche dans le panneau (`html`), comme
`bac-copie` dans l'exponentielle.

**Scène `doses`** (copie adaptée de `interets` : même repère temps-valeur, même escalier tracé au
fil des jours, même droite pointillée du plafond, même curseur verrouillé tant que le pari n'est pas
posé).
- Montre : un repère temps t ∈ [0 ; 30] jours, quantité q ∈ [0 ; 2,6]. La courbe en dents de scie
  de la quantité : un saut de +1 chaque matin, puis une décroissance continue q(t) = u_n·e^{−(t−n) ln 2}
  jusqu'au matin suivant. Le lien avec exp est écrit une fois : e^{−ln 2} = ½. Les points (n ; u_n)
  sont au sommet de chaque dent. La valeur courante est écrite au bout.
- Paramètres : `n` (jours tracés), `saw` (0→1, tracé de la dent de scie), `pts` (les sommets u_n),
  `fin` (étiquette « jour n : u_n ≈ … »), `plaf` (droite y = 2, étiquette « 2 »), `bas` (droite
  y = 1, les creux), `tab` (petit tableau n → u_n : 1, 2, 3, 4, 7, 10, 20), `dose2` (la même scène
  pour u_{n+1} = ½u_n + 2, plafond 4).
- L'élève manipule : un curseur à crans n ∈ {1, 2, 3, 4, 5, 7, 10, 15, 20, 30}. Verrouillé tant que
  le pari `plateau` n'est pas posé ; `need` : n ≥ 20 atteint, ou « Montre-moi » après deux essais ou
  20 s (comme `curseur` de l'exponentielle).

**Scène `toile`** (type nouveau, la figure-clé ; la bible A1 la demande en image-clé et en figure
pas à pas, et `content/maths/suites-numeriques/media/suite-escalier.*` en a une version statique à
miner).
- Montre : un repère **orthonormé** (même unité sur les deux axes : sinon le report par y = x ne se
  voit pas). La courbe de f (`k-ink`), la droite y = x (`k-dim`, pointillée). L'escalier ou la
  spirale (`k-a`) : de (u_k ; 0) monter à (u_k ; f(u_k)), aller à (f(u_k) ; f(u_k)) sur la droite,
  et ainsi de suite. Les termes u_0, u_1, u_2… sont reportés sur l'axe horizontal avec leurs
  étiquettes. Le point fixe est marqué, son abscisse écrite.
- Une liste fermée de fonctions, chacune avec sa fenêtre calculée (dans `suites-outils.js`) :
  `dose` f(x) = ½x + 1, x ∈ [−1 ; 6] ; `expm` f(x) = e^{−x}, x ∈ [−0,2 ; 1,4] ; `pas`
  f(x) = x + e^{−x}, x ∈ [0 ; 4] ; `double` f(x) = 2x − 1, x ∈ [0 ; 10] ; `bac22`
  f(x) = x(e^{x/2} − 1)², x ∈ [−0,2 ; 1,6] ; `bac19` f(x) = x + ½ − ln x + ½(ln x)²,
  x ∈ [0,8 ; 3].
- Paramètres : `f` (la fonction), `cb` (0→1, tracé de la courbe), `diag`, `u0`, `k` (nombre de
  marches tracées, animé de 0 à K), `zoom` (resserre la fenêtre autour du point fixe), `fixe`
  (point fixe et son étiquette), `zone` (entre la courbe et la droite : hachures « f(x) > x : les
  marches montent » et « f(x) < x : les marches descendent »), `ecart` (le segment vertical
  f(u_n) − u_n au terme courant), `axeU` (étiquettes u_0, u_1… sur l'axe), `bornes` (l'intervalle I
  surligné sur les deux axes, par exemple ]0 ; ln 4[).
- L'élève manipule : le curseur `u0` (partie 2), à crans {−1 ; 0 ; 1 ; 3 ; 5 ; 6} pour `dose`. La
  scène écrit « u_0 = 5 : u_10 ≈ … ». `need` : deux positions essayées, ou « Montre-moi ».
- Règles de 08 §3 : une idée (itérer f), positions calculées, lisible à 390 px. Rien ne bouge seul :
  les marches s'ajoutent sur `seq` ou à la demande. **L'auteur construit d'abord cette scène, seule,
  et regarde ses captures (ordinateur et 390 px) avant d'écrire les étapes**, comme pour `miroir` et
  `niveaux`.

---

### Partie 0 : Ce qu'il faut savoir (scène `savoir`)

- **`savoir`** · `ctl:'saut'` · un test. S'il est réussi du premier coup, on passe le rappel (comme
  dans l'exponentielle). **V** « u_0 = 3 et u_{n+1} = 2u_n : u_5 ? » (la question-test de la bible
  A1). ✓ 96 (3 × 2⁵). ✗ 13 : traiter une géométrique comme une arithmétique (3 + 5 × 2) → on
  multiplie par 2 à chaque pas, on n'ajoute pas 2. ✗ 192 : un pas de trop (3 × 2⁶) → de u_0 à u_5, il
  y a 5 pas.
- **`sav-rappel`** · trois rappels, un par ligne de scène : arithmétique u_n = u_0 + nr ;
  géométrique u_n = u_0·qⁿ ; si f est croissante sur I, alors a ≤ b dans I entraîne f(a) ≤ f(b). Pas
  d'action.

### Partie 1 : L'énigme (scène `doses`)

- **`comprime`** · `n:1, saw:1, pts:1, fin:1` · le modèle : un comprimé chaque matin ; en 24 heures,
  le corps élimine la moitié de ce qu'il contient (« modèle simplifié », écrit sur la scène). u_0 = 0
  avant la première prise, u_1 = 1. Pas d'action.
- **`deuxieme-jour`** · `n:1` · **Q** « Le deuxième matin, juste après la prise : u_2 = ? »
  ✓ 1,5 (la moitié de 1, plus 1). ✗ 2 : oublier l'élimination, comme si chaque jour ajoutait 1
  (arithmétique) → la nuit divise par 2 avant la prise. ✗ 1 : ajouter puis diviser, ½(1 + 1)
  (l'ordre des opérations) → on divise d'abord (la nuit), on ajoute ensuite (le matin). `reveal` :
  `n:2`.
- **`relation`** · `n:3` · la règle, pour tout n : tex u_{n+1} = ½u_n + 1, u_0 = 0. u_3 = 1,75.
  « Ni arithmétique, ni géométrique : chaque terme se calcule à partir du précédent. » Pas d'action.
- **`plateau`** · `n:3, tab:0` · **P** « Chaque matin en ajoute un. Pendant des mois, la quantité… »
  options : « grandit sans limite » / « s'approche d'un plafond » / « grandit, puis finit par
  redescendre ». Retour identique : « Pari noté. Fais l'expérience. » Conception affrontée :
  « croissante, donc elle tend vers +∞ » (bible A1).
- **`jours`** · **M** `ctl:'n'` · `need` n ≥ 20 · « Fais glisser le nombre de jours. » L'élève voit
  1,9375 au jour 5 ; 1,998… au jour 10. Le creux de chaque dent tend vers 1. Pas d'autre action.
- **`questions`** · `n:30, plaf:1` · texte dépendant du pari `plateau` (forme de `plafond` dans
  l'exponentielle) : la quantité s'approche de 2 sans le dépasser. La nuit enlève la moitié : plus
  il y en a, plus elle enlève, jusqu'à enlever 1, autant que le matin ajoute. `fort` : « Pourquoi jamais au-dessus de 2 ?
  Pourquoi 2 ? En combien de jours à 1 % près ? La leçon va répondre. » Pas d'action.

### Partie 2 : La machine et son escalier (scène `toile`, figure-clé)

- **`machine`** · `f:'dose', cb:0→1` · une suite récurrente est une machine : on entre u_n, elle
  rend u_{n+1} = f(u_n), ici f(x) = ½x + 1. La courbe de f est une droite. Pas d'action.
- **`premiere-marche`** · `u0:0, k:0`, puis `seq` : la verticale de (0 ; 0) à (0 ; 1). u_1 = f(0)
  = 1 se lit en hauteur (u_0 = 0 : cette première verticale est sur l'axe, la scène la trace en
  `k-a` par-dessus l'axe en `k-dim`, pour qu'elle se voie). **Q** « Pour calculer u_2 = f(u_1), il faut placer u_1 sur l'axe
  horizontal. Comment, sans calcul ? » ✓ « en allant horizontalement jusqu'à la droite y = x, puis en
  descendant ». ✗ « en redescendant à la verticale » : on revient sur u_0, pas sur u_1 → la droite
  y = x échange hauteur et abscisse. ✗ « en lisant u_1 sur l'axe vertical, c'est assez » : f se lit
  à partir d'une abscisse → il faut que u_1 devienne une abscisse. `reveal` : `diag:1`, puis le
  segment horizontal, puis `axeU:1` (u_1 sur l'axe).
- **`escalier`** · `seq` : `k` de 1 à 4 · trois marches de plus ; u_2 = 1,5, u_3 = 1,75 et
  u_4 = 1,875 apparaissent sur l'axe, comme dans l'énigme. Pas d'action.
- **`ou-vont`** · pari de la figure 1/3 · **P** « Les marches continuent. Elles vont… » options :
  « vers le point où la courbe coupe la droite y = x » / « toujours plus haut, une marche de plus à
  chaque fois » / « jusqu'au bord, puis elles redescendent ». Conception affrontée : « chaque pas
  ajoute, donc on monte sans fin ». `reveal` : `k` jusqu'à 12, puis `zoom:1`.
- **`point-fixe`** · `fixe:1` · le nom, comme réponse : le [[point-fixe|point fixe]] ℓ, où la
  courbe coupe la droite, vérifie f(ℓ) = ℓ. Ici ½ℓ + 1 = ℓ, donc ℓ = 2 (tex). `fort` : « Les marches
  s'empilent vers le point fixe. » Pas d'action.
- **`depart`** · pari de la figure 2/3 · `u0:5, k:0` · un patient a reçu une forte dose au départ :
  u_0 = 5. **P** « Avec u_0 = 5, les marches vont vers… » options : « 2, comme avant » / « un
  plafond plus haut que 2, car on part plus haut » / « 5 : la suite reste près de son départ ».
  Conception affrontée : « la limite dépend du terme initial » (`items.yaml`,
  limite-liee-terme-initial). `reveal` : l'escalier descend vers 2.
- **`u0-curseur`** · **M** `ctl:'u0'` · `need` : deux positions essayées · « Fais glisser u_0. » Du
  dessous ou du dessus, les marches vont à 2. Pas d'autre action.

### Partie 3 : La récurrence (scènes `table`, `toile`)

- **`pas-assez`** · scène `table`, colonnes n, u_n (n de 0 à 30) · le dessin et le tableau
  montrent u_n < 2. **Q** « 31 termes calculés, tous < 2. Est-ce prouvé pour tout n ? » ✓ « non :
  31 termes ne disent rien du 32ᵉ ». ✗ « oui, 31 termes suffisent » (`items.yaml`,
  preuve-par-termes-calcules) → indice « La suite w_n = 0,1 × 1,5ⁿ : w_0 à w_7 sont < 2. Et w_8 ? »
  (≈ 2,56). ✗ « oui, car les termes se stabilisent » : se stabiliser à l'œil n'est pas une preuve,
  et w_n semble lente au début → il faut un argument valable pour tout n.
- **`dominos`** · scène `toile`, `f:'dose', u0:0` · la [[recurrence|récurrence]] en deux pièces :
  l'initialisation (la propriété est vraie au rang 0) et l'hérédité (si elle est vraie à **un** rang
  n, elle l'est au rang n + 1). tex du principe. Pas d'action. (al-Karaji : fiche de mot seulement,
  §8.)
- **`initialisation`** · P(n) : « 0 ≤ u_n < 2 ». u_0 = 0, et 0 ≤ 0 < 2 : P(0) est vraie. Pas
  d'action.
- **`heredite-debut`** · **Q** « L'hérédité commence par… » ✓ « Soit n un entier tel que
  0 ≤ u_n < 2. Montrons que 0 ≤ u_{n+1} < 2. » ✗ « Supposons que 0 ≤ u_n < 2 pour tout n » : c'est ce
  qu'on veut prouver (bible A1, l'hérédité qui démontre ce qu'elle suppose) → on suppose la
  propriété à **un** rang n. ✗ « Montrons que 0 ≤ u_{n+1} < 2, sans rien supposer » : sans
  hypothèse, rien ne borne u_{n+1} → l'hérédité part de P(n).
- **`heredite`** · **D** puis Q (B3) · ligne donnée : 0 ≤ u_n < 2 (r : l'hypothèse de récurrence).
  Pari `label` « La ligne suivante ? » ✓ 0 ≤ ½u_n < 1 (on multiplie par ½ > 0). ✗ « ½u_n + 1 < 2,
  car ½x + 1 < 2 pour tout réel x » : c'est faux (x = 3 donne 2,5), une hérédité sans hypothèse
  (`items.yaml`, recurrence-etape-manquante). ✗ 0 ≤ ½u_{n+1} < 1 : on ne sait encore rien de
  u_{n+1} (`items.yaml`, ordre-notation-recurrence, la confusion u_n / u_{n+1}). `apres` : tex
  1 ≤ ½u_n + 1 < 2, donc 0 ≤ u_{n+1} < 2 : P(n + 1). Conclusion : pour tout n, 0 ≤ u_n < 2.
- **`init-oubliee`** · **Q** « Une copie démontre : si u_n > 2, alors ½u_n + 1 > 2. Elle conclut :
  u_n > 2 pour tout n. » « Qu'en penses-tu ? » ✓ « faux : u_0 = 0, l'initialisation manque ».
  ✗ « juste : l'hérédité suffit » → une hérédité seule démontre ici une propriété fausse. ✗ « juste,
  car la suite est croissante » : c'est sans rapport, et u_0 = 0 < 2. `apres` : sans
  initialisation, la récurrence ne démarre pas.
- **`v-recurrence`** · `toile`, `u0:5` · **V** « Avec u_0 = 5, laquelle se démontre par
  récurrence ? » ✓ « u_n > 2 pour tout n » (initialisation 5 > 2, même hérédité). ✗ « u_n < 2 » :
  l'initialisation est fausse. ✗ « u_n ≥ 5 » : l'hérédité ne marche pas, u_1 = 3,5.

### Partie 4 : Le sens de variation (scène `toile`)

- **`difference`** · `f:'dose', u0:0, ecart:1` · **D** puis Q · ligne donnée :
  u_{n+1} − u_n = ½u_n + 1 − u_n (r : la relation de récurrence). Pari « La ligne suivante ? »
  ✓ = ½(2 − u_n) > 0, car u_n < 2 (partie 3). ✗ « > 0, car f est croissante » : le sens de f ne dit
  pas celui de la suite → on étudie le signe de u_{n+1} − u_n. ✗ « u_n − u_{n+1} = ½(2 − u_n) > 0,
  donc croissante » : on a inversé la différence, et ce signe dirait « décroissante ». `apres` :
  (u_n) est croissante.
- **`lecture`** · `zone:1` · la différence u_{n+1} − u_n = f(u_n) − u_n est l'écart vertical entre
  la courbe et la droite y = x. `fort` : « Le signe de f(x) − x se lit là où vivent les u_n. » Pas
  d'action.
- **`depart-mono`** · `u0:5, k:4` · **Q** « Avec u_0 = 5, f est toujours croissante. La suite est… »
  ✓ décroissante (u_n > 2, donc f(u_n) − u_n = ½(2 − u_n) < 0). ✗ « croissante, car f l'est »
  (bible A1, confondre « f croissante » et « (u_n) croissante ») → indice « u_1 = 3,5 et u_0 = 5 :
  qui est le plus grand ? ». ✗ « ni l'une ni l'autre » : u_n reste au-dessus de 2, où la courbe est
  sous la droite.
- **`spirale`** · pari de la figure 3/3 · `f:'expm', u0:0, k:0` · une autre machine :
  u_{n+1} = e^{−u_n}, u_0 = 0. f(x) = e^{−x} est décroissante. **P** « La suite (u_n) est… »
  options : « décroissante, comme f » / « croissante » / « ni l'une ni l'autre ». Conception
  affrontée : « f décroissante, donc (u_n) décroissante » (bible A1, troisième conception). `reveal` :
  `k` jusqu'à 8, la spirale.
- **`spirale-vu`** · `axeU:1, fixe:1` · les termes alternent : 0 ; 1 ; 0,37 ; 0,69 ; 0,50 ;
  0,61… autour de ≈ 0,567, solution de e^{−x} = x (valeur calculée par le code). Une fonction
  décroissante renverse l'ordre : u_0 < u_2 entraîne u_1 > u_3. `fort` : « f décroissante : la suite
  n'est pas monotone, elle tourne. » Pas d'action. (Les suites de terme pair et impair relèvent de la
  séance 2, ou sortent du périmètre : §8.)

### Partie 5 : Converger (scènes `doses`, `toile`, `table`)

- **`rappel`** · scène `doses`, `n:3` · `sujet:'calculer des termes'` · texte : mi-parcours, c'est le
  bon moment pour une pause ; un rappel avant de repartir. **V** « u_0 = 0, u_{n+1} = ½u_n + 1 :
  u_3 ? » ✓ 1,75. ✗ 1,5 : c'est u_2 (un pas de moins). ✗ 3 : on a ajouté 1 chaque jour sans
  diviser.
- **`theoreme`** · scène `toile`, `f:'dose', zoom:0` · le critère, admis : toute suite croissante et
  majorée converge ; toute suite décroissante et minorée converge. tex. `fort` : « Les deux à la
  fois. » Pas d'action.
- **`majorant-3`** · **Q** « Pour u_0 = 0, on a aussi u_n < 3 pour tout n (vrai, car u_n < 2).
  Croissante et majorée par 3, donc… » ✓ « elle converge, vers une limite ≤ 3 ». ✗ « elle converge
  vers 3 » (`items.yaml`, majorant-atteint-ou-limite) → indice « La limite est 2. Un majorant est-il
  unique ? ». ✗ « elle tend vers +∞, car elle est croissante » : un majorant l'en empêche.
- **`bornee-oscille`** · scène `table`, colonnes n, (−1)ⁿ · **Q** « (−1)ⁿ reste entre −1 et 1.
  Converge-t-elle ? » ✓ « non : elle saute de −1 à 1 sans se fixer ». ✗ « oui, vers 0, entre ses
  bornes » (`items.yaml`, monotone-hypothese-partielle : majorée, ou bornée, ne suffit pas) → il
  faut aussi la monotonie. ✗ « oui, car une suite bornée est monotone » (`items.yaml`,
  bornee-implique-monotone) → (−1)ⁿ n'est ni croissante ni décroissante.
- **`pas-retrecissent`** · scène `toile`, `f:'pas', u0:0` · une machine dont les marches
  rétrécissent : w_{n+1} = w_n + e^{−w_n}, w_0 = 0 ; chaque pas e^{−w_n} est plus petit que le
  précédent. **P** « La suite (w_n)… » options : « converge : les pas rétrécissent » / « tend vers
  +∞ » / « oscille ». Conception affrontée : « ralentir, c'est converger » (ajoutée ici ; le même
  piège que « ln plafonne » dans le logarithme). `reveal` : la scène écrit w_10, w_1000, w_1000000
  (calculés par le code ; w_n reste au-dessus de ln(n + 1), voir `sans-point-fixe`). La question
  « pourquoi ? » est laissée ouverte, la partie 6 y répond.

### Partie 6 : La limite (scène `toile`)

- **`continuite`** · `f:'dose', fixe:1` · si u_n → ℓ et f est continue en ℓ, alors f(u_n) → f(ℓ)
  (`sexp 1.1.3`). Or f(u_n) = u_{n+1}, qui tend aussi vers ℓ. Donc ℓ = f(ℓ). tex, avec ses
  conditions : f continue sur I, f(I) ⊂ I, u_0 ∈ I, (u_n) convergente (`sexp 1.1.4`). Pas d'action.
- **`limite-dose`** · **V** « (u_n) converge et ℓ = ½ℓ + 1. La limite ? » ✓ 2. ✗ 0 : c'est u_0, et
  la limite ne dépend pas du départ (le curseur de la partie 2). ✗ 1 : c'est la dose ; le plateau
  vaut dose ÷ (1 − ½).
- **`piege-2u`** · `f:'double', u0:2` · **Q** « v_0 = 2 et v_{n+1} = 2v_n − 1. On résout
  ℓ = 2ℓ − 1 : ℓ = 1. Donc… » ✓ « on ne peut rien conclure sans prouver la convergence ». ✗ « v_n
  tend vers 1 » (`items.yaml`, point-fixe-prouve-convergence ; bible A1, « la limite se calcule en
  remplaçant n par ∞ ») → indice « Calcule v_1, v_2, v_3. ». ✗ « v_n tend vers 2, son départ » :
  v_1 = 3, v_2 = 5. `reveal` : l'escalier s'écarte du point fixe ; `apres` : v_n = 1 + 2ⁿ → +∞.
  `fort` : « ℓ = f(ℓ) dit où aller, si l'on y va. »
- **`sans-point-fixe`** · `f:'pas'` · retour au pari `pas-retrecissent` · **D** puis Q · lignes :
  (w_n) est croissante (w_{n+1} − w_n = e^{−w_n} > 0) ; si elle convergeait vers ℓ, on aurait
  ℓ = ℓ + e^{−ℓ} (r : f continue). Pari « Donc… » ✓ e^{−ℓ} = 0, impossible : (w_n) ne converge pas,
  et croissante sans converger, elle tend vers +∞. ✗ « e^{−ℓ} = 0 donne ℓ = 0 » : e⁰ = 1 ≠ 0 → eˣ > 0
  pour tout x. ✗ « ℓ = +∞ est la solution » : +∞ n'est pas un réel, l'équation n'a pas de solution
  → on conclut par l'absurde. `apres` : la courbe ne coupe jamais la droite. Une suite croissante non
  majorée tend vers +∞ : tex. *Enrichissement, en `html` repliable* : e^{w_{n+1}} ≥ e^{w_n} + 1 (par
  eˣ ≥ 1 + x, leçon exponentielle), donc w_n ≥ ln(n + 1).
- **`v-lim-composee`** · `f:'dose'` · **V** « u_n → 2. lim ln(u_n) ? » ✓ ln 2 ≈ 0,69 (ln est
  continue en 2). ✗ 2 : on a oublié le ln. ✗ −∞ : on a pris ln(u_0) = ln 0 → c'est la limite qui
  compte, pas le départ.

### Partie 7 : Les suites de référence (scène `table`)

- **`geo-exp`** · `table` (n, (½)ⁿ) · pour q > 0, qⁿ = e^{n ln q} (leçon exponentielle). **Q**
  « 0 < q < 1 : ln q < 0, donc n ln q → −∞. Donc qⁿ tend vers… » ✓ 0 (lim_{X→−∞} e^X = 0). ✗ −∞ :
  confondre l'exposant et la valeur → e^X > 0. ✗ 1 : qⁿ reste entre 0 et 1 sans s'arrêter à 1
  ((½)¹⁰ ≈ 0,001). `apres` : tex des quatre cas (q > 1 : +∞ ; q = 1 : 1 ; −1 < q < 1 : 0 ; q ≤ −1 :
  pas de limite).
- **`q-negatif`** · `table` (n, (−½)ⁿ) · **Q** « lim (−½)ⁿ ? » ✓ 0 (|(−½)ⁿ| = (½)ⁿ → 0). ✗ « pas de
  limite : le signe alterne » (`items.yaml`, limite-liee-terme-initial : « q < 0 empêche la
  convergence ») → c'est |q| < 1 qui décide. ✗ −∞ : les termes alternent et rétrécissent.
- **`malthus`** · tag `1798` · `table` (n, 2ⁿ, 1 + n, n de 0 à 9) · Malthus compare une population
  qui double tous les 25 ans à des vivres qui augmentent d'une même quantité tous les 25 ans, en
  partant de 1 et 1 [V, §8]. **Q** « En deux siècles et quart (9 périodes de 25 ans), population et
  vivres sont dans le rapport… » ✓ 512 à 10. ✗ 19 à 10 : la population traitée en arithmétique
  (1 + 2 × 9) (`items.yaml`, arith-geom-confondues). ✗ 1024 à 10 : une période de trop (2¹⁰) → 9
  périodes, donc 2⁹ (`items.yaml`, bornes-somme-mal-comptees : pas et termes). Aucune phrase sur la
  justesse de sa prédiction (§8).
- **`malthus-loi`** · **V** « lim 2ⁿ/n ? » ✓ +∞ (2ⁿ/n = ln 2 × e^{n ln 2}/(n ln 2), et eˣ/x → +∞,
  leçon exponentielle). ✗ 0 : les croissances comparées à l'envers. ✗ 1 : « ∞/∞ = 1 » n'est pas une
  règle. `apres` : « une géométrique de raison > 1 dépasse toute arithmétique ».

### Partie 8 : Retour à l'énigme (scène `doses`)

- **`retour-plafond`** · `n:30, plaf:1` · texte dépendant du pari `plateau` : première question
  résolue, 0 ≤ u_n < 2 pour tout n (partie 3), la suite est croissante (partie 4), elle converge
  (partie 5), vers 2 (partie 6). Reste à voir comment. Pas d'action.
- **`retour-vn`** · **D** puis Q · lignes : on pose v_n = u_n − 2 (r : l'écart au plateau) ;
  v_{n+1} = u_{n+1} − 2 = ½u_n + 1 − 2 = ½u_n − 1 (r : la relation). Pari « La ligne suivante ? »
  ✓ = ½(u_n − 2) = ½v_n : géométrique de raison ½. ✗ « = ½u_n − 1 : géométrique de raison
  ½u_n − 1 » : une raison est un nombre fixe, pas une expression en u_n (`items.yaml`,
  arith-geom-confondues). ✗ « v_{n+1} = ½v_n + 1, la même relation que u » : v_0 = −2 donnerait
  v_1 = 0, or v_1 = u_1 − 2 = −1.
- **`retour-formule`** · **Q** « v_0 = −2. Donc u_n = ? » ✓ 2 − 2(½)ⁿ. ✗ 2 − (½)ⁿ : v_0 oublié
  (n = 0 donnerait 1, or u_0 = 0). ✗ −2(½)ⁿ : c'est v_n, on n'a pas rajouté 2 (n = 0 donnerait −2).
  `apres` : (½)ⁿ → 0, donc u_n → 2, et 2 − u_n = 2(½)ⁿ > 0 : jamais au-dessus.
- **`retour-jours`** · **Q** « À 1 % près, c'est 2 − u_n ≤ 0,02, soit (½)ⁿ ≤ 0,01. En prenant ln :
  n ln ½ ≤ ln 0,01. À partir de quel jour ? » ✓ le 7ᵉ (n ≥ ln 100 / ln 2 ≈ 6,64, car ln ½ < 0
  renverse le sens). ✗ le 6ᵉ : arrondir vers le bas, or u_6 = 1,96875 est à 0,03125 de 2. ✗ « les
  6 premiers jours seulement » : le sens n'a pas été renversé en divisant par ln ½ < 0. Consigne SM :
  ln 2 ≈ 0,69 et ln 10 ≈ 2,30 donnés.
- **`retour-dose`** · `dose2:1` · **V** « Deux comprimés chaque matin : u_{n+1} = ½u_n + 2. Le
  plateau ? » ✓ 4, atteint à 1 % près au même 7ᵉ jour. ✗ 2 : la dose compte, ℓ = ½ℓ + 2 donne 4.
  ✗ 3 : on a ajouté 1 au plateau au lieu de résoudre ℓ = f(ℓ). `fort` du retour : « La dose fixe la
  hauteur, la demi-vie fixe le temps. » L'énigme est résolue.

### Partie 9 : Au bac (scène `toile`) — voir §6

`bac`, `bac-heredite`, `bac-mono`, `bac-lim`, `bac-copie`, `bac-2`, `bac-2-mono`, `bac-2-lim`,
`bac-erreur`.

### Partie 10 : Bilan (scènes `quiz`, `end`)

- **`q1`** · la convergence · **Q** « (u_n) est croissante et majorée par 5. Alors… » ✓ « elle
  converge, vers une limite ≤ 5 ». ✗ « elle converge vers 5 » : un majorant n'est pas la limite.
  ✗ « elle tend vers +∞ » : majorée, elle ne le peut pas.
- **`q2`** · le sens · **Q** « f(x) = ½x + 1 est croissante, et u_0 = 6. La suite est… »
  ✓ décroissante (f(6) = 4 < 6). ✗ croissante, car f l'est. ✗ « on ne peut pas savoir sans 30
  termes » : le signe de f(x) − x sur l'intervalle des u_n suffit.
- **`q3`** · le point fixe · **Q** « ℓ = f(ℓ) a une solution. La suite converge-t-elle ? » ✓ « pas
  forcément : il faut d'abord prouver la convergence ». ✗ « oui, vers cette solution » : v_n = 1 + 2ⁿ
  (partie 6). ✗ « oui, vers u_0 » : la limite ne dépend pas du départ.
- **`fin`** · scène `end`, cinq lignes : la machine et son escalier ; la récurrence
  (initialisation + hérédité) ; le signe de f(x) − x sur I ; monotone et bornée, donc convergente ;
  ℓ = f(ℓ) après la convergence. La fin de séance (forme de `profileHTML`) : les « Vérifie » réussies,
  les paris `plateau`, `ou-vont`, `depart`, `spirale`, `pas-retrecissent` rappelés, le lien vers les
  exercices, la séance 2 annoncée (§1.2), et le renvoi piège par piège (B7) : récurrence → gabarit
  2 ; majorant et convergence → 5 ; f croissante → 4 ; point fixe → 6.

---

## 4. La pause et le rappel (A8)

La pause est proposée à la frontière des parties 4 et 5, dans le texte de l'étape **`rappel`**,
**28ᵉ étape sur 59 (47 %, dans la fourchette 30 % à 70 %)**. Sa question « Vérifie » :
**u_0 = 0, u_{n+1} = ½u_n + 1 : u_3 ?** (✓ 1,75 ; leurres 1,5 et 3, ci-dessus). Elle reprend
l'énigme et le rang (partie 1, partie 3).

Contrôle A7 fait sur la liste. La plus longue suite d'étapes sans pari ni « Vérifie » est de 3 :
`jours` (manipulation), `questions`, `machine`. Les autres suites sont de 2 au plus (`dominos`,
`initialisation`). A6 : aucune option « je ne sais pas ».

---

## 5. Conceptions erronées → étape qui les affronte (B5)

| Conception | Source | Étapes |
|---|---|---|
| croissante, donc tend vers +∞ | bible A1 | `plateau`, `ou-vont`, `majorant-3`, `q1` |
| la limite se calcule en remplaçant n par ∞ / avant la convergence | bible A1 | `piege-2u`, `q3` |
| f croissante (ou décroissante), donc (u_n) aussi | bible A1 | `difference`, `depart-mono`, `spirale`, `bac-mono`, `bac-2-mono`, `bac-erreur`, `q2` |
| l'hérédité qui démontre ce qu'elle suppose | bible A1 | `heredite-debut` |
| une seule étape de récurrence suffit (initialisation oubliée, hérédité sans hypothèse) | `items.yaml` recurrence-etape-manquante | `heredite`, `init-oubliee`, `v-recurrence`, `bac-heredite` |
| quelques termes calculés prouvent pour tout n | `items.yaml` preuve-par-termes-calcules | `pas-assez`, `bac` |
| bornée, donc monotone | `items.yaml` bornee-implique-monotone | `bornee-oscille` |
| un majorant est atteint, ou il est la limite | `items.yaml` majorant-atteint-ou-limite | `majorant-3`, `bac-lim`, `q1` |
| le signe de f(x) − x se lit sur n'importe quel intervalle | `items.yaml` signe-fx-mauvais-domaine | `lecture`, `bac-mono` |
| une seule hypothèse du critère monotone suffit | `items.yaml` monotone-hypothese-partielle | `bornee-oscille`, `majorant-3` |
| résoudre ℓ = f(ℓ) prouve la convergence | `items.yaml` point-fixe-prouve-convergence | `piege-2u`, `q3` |
| arithmétique et géométrique confondues ; une raison qui dépend de n | `items.yaml` arith-geom-confondues | `savoir`, `deuxieme-jour`, `malthus`, `retour-vn` |
| la limite dépend du terme initial ; q < 0 empêche la convergence | `items.yaml` limite-liee-terme-initial | `depart`, `u0-curseur`, `limite-dose`, `q-negatif`, `bac-lim`, `bac-2-lim` |
| erreur de rang ou d'ordre des opérations | `items.yaml` ordre-notation-recurrence | `deuxieme-jour`, `heredite`, `rappel` |
| la tendance des premiers termes donne la limite | `items.yaml` tendance-implique-limite | `plateau`, `pas-retrecissent` |
| pas et termes confondus | `items.yaml` bornes-somme-mal-comptees | `savoir`, `malthus` |
| ralentir, c'est converger | ajoutée ici | `pas-retrecissent`, `sans-point-fixe` |
| e^{−ℓ} = 0 a une solution | ajoutée ici | `sans-point-fixe` |
| le sens d'une inéquation gardé en divisant par ln q < 0 | ajoutée ici | `retour-jours` |
| appliquer ln au lieu de f dans l'hérédité | ajoutée ici | `bac-2` |
| **séance 2** : quotient sans positivité ; encadrement mal appliqué ; forme indéterminée | `items.yaml` (trois ids) | séance 2 (gabarits 12, 13) |
| **séance 2, SM** : accroissements finis sur un intervalle instable ; k ≥ 1 ; adjacence incomplète | `items.yaml` (trois ids) | séance 2, partie SM (gabarit 14) |
| **hors des deux séances** : TVI sans stricte monotonie ; x_n et x_{n+1} comparés à vue | `items.yaml` (deux ids) | à rattacher à la leçon TVI (§8) |

Chaque pari et chaque question nomme **une** conception dans son retour (B5). La liste
« conception → étape » ci-dessus est celle que l'auteur rend avec la leçon.

---

## 6. Au bac (B6)

### 6.1 L'exemple commenté

Bac **SExp 2022, session normale, problème** (8,5 points), **question 8**, a) 0,5, b) 0,5,
c) 0,25, d) 0,5 (`docs/sujets/maths/fonction-exponentielle.md`, statut « corrigé (conforme au
scan) »). f(x) = x(e^{x/2} − 1)², u_0 = 1, u_{n+1} = f(u_n). Q8a : montrer par récurrence que
0 < u_n < ln 4. Q8b : montrer que (u_n) est décroissante. Q8c : en déduire que (u_n) est
convergente. Q8d : calculer sa limite. Ce que la partie I du sujet a établi, rappelé à l'écran comme
« donné par les questions précédentes » : f est croissante sur ℝ (Q4) ; le signe de f(x) − x (Q3b) ;
f(0) = 0 et f(ln 4) = ln 4 (calcul de la leçon : (e^{ln 2} − 1)² = 1).

- **`bac`** · `toile`, `f:'bac22', bornes:1` (]0 ; ln 4[ surligné) · « Premier geste ? » (pari de
  prédiction, sans `ok`, décision §9 des specs précédentes). Options : « chercher, dans les questions
  précédentes, ce que f fait de l'intervalle ]0 ; ln 4[ » (le bon réflexe : f croissante, f(0) = 0,
  f(ln 4) = ln 4) ; « calculer u_1, u_2, u_3 et constater » (des termes ne prouvent rien) ;
  « étudier le signe de u_{n+1} − u_n » (c'est la question b, et il faut d'abord savoir où vivent
  les u_n). `reveal` : `cb:1`, puis `k:3`.
- **`bac-heredite`** · **D** puis Q · lignes : initialisation u_0 = 1, et 0 < 1 < ln 4 ≈ 1,39 ;
  hypothèse 0 < u_n < ln 4 pour un n fixé. Pari « La ligne suivante ? » ✓ f(0) < f(u_n) < f(ln 4),
  car f est strictement croissante. ✗ f(0) > f(u_n) > f(ln 4) : l'ordre renversé convient à une
  fonction décroissante ; f est croissante (cela donnerait 0 > u_{n+1}). ✗ « u_{n+1} = f(u_n) < ln 4,
  car f(x) < ln 4 pour tout réel x » : c'est faux, f(2) ≈ 5,90, une hérédité sans hypothèse.
  `apres` : 0 < u_{n+1} < ln 4.
- **`bac-mono`** · **Q** « u_{n+1} − u_n = f(u_n) − u_n = u_n e^{u_n/2}(e^{u_n/2} − 2). Son signe ? »
  ✓ négatif : u_n > 0 et e^{u_n/2} < 2, car u_n < ln 4. ✗ « positif, car f(x) − x > 0 sur ]−∞ ; 0[ » :
  ce n'est pas là que vivent les u_n → la suite serait croissante, or u_1 ≈ 0,42 < u_0 = 1. ✗ « positif,
  car f est croissante » : le sens de f ne dit pas celui de la suite. `apres` : (u_n) est décroissante.
- **`bac-lim`** · **Q** « Décroissante et minorée par 0, (u_n) converge vers ℓ, avec 0 ≤ ℓ ≤ 1. Et
  f(ℓ) = ℓ ⇔ ℓ = 0 ou ℓ = ln 4. La limite ? » ✓ 0 (ln 4 > 1 = u_0). ✗ ln 4 : c'est un majorant, et
  une suite décroissante partie de 1 ne remonte pas à 1,39. ✗ 1 : c'est u_0, et f(1) ≈ 0,42 ≠ 1.
  (« décroissante et minorée, donc convergente » est la Q8c : elle est dite dans l'énoncé de l'étape,
  sans question propre.)
- **`bac-copie`** · `html` (forme de `bac-copie` de l'exponentielle) · la rédaction attendue, en
  quatre blocs a), b), c), d). En d), elle cite les hypothèses : f continue sur I = [0 ; ln 4],
  f(I) ⊂ I, (u_n) convergente, donc ℓ = f(ℓ). Barème du sujet : 0,5 + 0,5 + 0,25 + 0,5. Pas
  d'action.

### 6.2 Le second exemple, que l'élève complète

Bac **SExp 2019, session normale, problème** (11 points), **deuxième partie** : Q1a 0,5, Q1b 0,5,
Q1c 0,5, Q2 0,75 (`docs/sujets/maths/fonction-logarithme.md`, statut vérifié). C'est un vrai sujet,
et c'est ln après exp. f(x) = x + ½ − ln x + ½(ln x)², u_0 = 1. Donné par la première partie : f
croissante sur [1 ; +∞[ (Q3), f(x) − x = ½(ln x − 1)² (Q5a), f(1) = 3/2, f(e) = e.

- **`bac-2`** · `toile`, `f:'bac19', bornes:1` ([1 ; e]) · **Q** « Q1a, hérédité : 1 ≤ u_n ≤ e.
  La ligne suivante ? » ✓ f(1) ≤ f(u_n) ≤ f(e), car f est croissante sur [1 ; e], soit
  3/2 ≤ u_{n+1} ≤ e. ✗ « ln 1 ≤ ln u_n ≤ ln e, donc 0 ≤ u_{n+1} ≤ 1 » : c'est ln qu'on a appliqué,
  pas f, et u_1 = 3/2 > 1. ✗ « f(e) ≤ f(u_n) ≤ f(1) » : l'ordre renversé, pour une fonction
  croissante (e ≤ u_{n+1} ≤ 3/2 est impossible).
- **`bac-2-mono`** · **Q** « Q1b : u_{n+1} − u_n = ? » ✓ ½(ln u_n − 1)² ≥ 0 : croissante.
  ✗ « f′(u_n) ≥ 0, donc croissante » : c'est le sens de f, pas celui de la suite. ✗ « u_n − u_{n+1}
  = ½(ln u_n − 1)² ≥ 0, donc décroissante » : la différence est inversée (u_1 = 1,5 > u_0).
- **`bac-2-lim`** · `k` jusqu'à 8 · **Q** « Q1c-Q2 : croissante et majorée par e, (u_n) converge vers
  ℓ ∈ [1 ; e]. Avec ½(ln ℓ − 1)² = 0, ℓ = ? » ✓ e. ✗ 1 : c'est u_0, et la suite croît. ✗ +∞ : elle
  est majorée. **Pas de leurre « le majorant »** : ici la limite est le majorant e, ce leurre
  tomberait juste. Le retour du ✓ le dit : « Ici la limite est le majorant. C'est un hasard du sujet :
  pour la dose, on avait aussi u_n < 3, et la limite était 2. » La scène montre que la suite monte
  lentement (la courbe est tangente à y = x en e).
- **`bac-erreur`** · **V** « Une copie écrit pour Q1b : f est croissante, donc (u_n) est croissante.
  Où est l'erreur ? » ✓ « le sens de f ne donne pas celui de la suite : il faut le signe de
  u_{n+1} − u_n ». ✗ « il fallait écrire f strictement croissante » : cela ne change rien, la dose
  partie de 5 décroît avec f strictement croissante. ✗ « aucune erreur » : même contre-exemple.
  Barème cité : 0,5 + 0,5 + 0,5 + 0,75. Aucune phrase sur ce que « le correcteur » fait.

### 6.3 Les autres sujets transcrits sur la notion (pour les exercices et la séance 2)

- SExp 2020 N, exercice 1 (4 pts) : u_0 = 3/2, u_{n+1} = 2u_n/(2u_n + 5) ; v_n = 4u_n/(2u_n + 3)
  géométrique de raison 2/5 → séance 2, gabarit 12.
- SExp 2021 N, exercice 2 (4 pts) : u_{n+1} = u_n/(3 − 2u_n) ; u_{n+1}/u_n ≤ ½ ;
  v_n = ln(3 − 2u_n) ; 1/u_{n+1} − 1 = 3(1/u_n − 1) → séance 2, gabarits 12 et 13.
- SExp 2024 N, exercice 1 (3 pts) : u_{n+1} = (4u_n − 2)/(1 + u_n) ; v_n = (2 − u_n)/(1 − u_n) de
  raison 2/3 → séance 2.
- SExp 2023 N, problème Q7 (0,5 + 0,5 + 0,75) : u_0 ∈ ]α ; 1[, α < u_n < 1, croissante → gabarit 11
  (même chaîne que l'exemple commenté).
- SM 2019 N, exercice 4, partie II (u_{n+1} = f(u_n) + u_n ; u_n ≤ u_0 + n f(u_0)) → séance 2.

---

## 7. Les exercices générés (`components/pilote/exercices/suites.js`)

Format de `exponentielle.js` : réponse calculée ; chaque leurre porte `fb` et `erreur` (l'id de la
conception, §5). **Chaque tirage est rejeté si un leurre égale la réponse** (la leçon de
l'exponentielle : e^{2x} lu 2eˣ retombait sur la bonne solution). Les valeurs sont exactes en SM et
arrondies au centième en PC/SVT, sauf indication.

**Séance 1**

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `suites-base` | 1 | (a) explicite : u_0 ∈ {−3…5}∖{0}, r ∈ {−3…4}∖{0} ou q ∈ {−2, ½, 2, 3}, k ∈ {4…8}, calculer u_k ; (b) récurrente : u_{n+1} = a·u_n + b, a ∈ {½, ⅓, 2, 3}, b ∈ {−3…4}∖{0}, u_0 ∈ {−2…5}, calculer u_2 | `sexp 1.1.1`, `sm 1.1.1` | arith-geom-confondues ; bornes-somme-mal-comptees (u_0·q^{k+1}) ; ordre-notation-recurrence (a(u_n + b)) |
| 2 | `recurrence-affine` | 2 | u_{n+1} = a·u_n + b, a ∈ {½, ⅓, ⅔, ¾}, ℓ = b/(1 − a) entier, u_0 < ℓ ou u_0 > ℓ ; choisir la ligne manquante d'une récurrence de « u_n < ℓ » (ou « > ») | `sexp 1.1.4`, `sm 1.1.4` | recurrence-etape-manquante (hérédité sans hypothèse, initialisation oubliée) ; hérédité circulaire ; rang n + 1 utilisé |
| 3 | `recurrence-f-croissante` | 2 | f dans une liste fermée, croissante sur I = [a ; b] avec f(a), f(b) calculés dans I : √(x + c), c ∈ {2, 6, 12} (ℓ = 2, 3, 4) ; 1 + ln x sur [1 ; e] ; ½x + b ; écrire l'hérédité | `sexp 1.1.4`, `sm 1.1.4` | ordre renversé (traiter f comme décroissante) ; « f(x) < b pour tout x » ; ln appliqué au lieu de f |
| 4 | `monotonie` | 2 | même liste, u_0 tiré au-dessus ou au-dessous du point fixe ; signe de u_{n+1} − u_n sur I | `sexp 1.1.4`, `sm 1.1.4` | f croissante donc suite croissante ; signe-fx-mauvais-domaine ; différence inversée |
| 5 | `critere-convergence` | 2 | un énoncé « croissante / décroissante / bornée / majorée par M / minorée par m » avec la limite réelle connue et M ≠ limite (tiré strictement au-delà) ; que conclure ? | `sexp 1.1.2`, `sm 1.1.2` | majorant-atteint-ou-limite ; croissante donc +∞ ; monotone-hypothese-partielle ; bornee-implique-monotone |
| 6 | `point-fixe` | 2 | (a) convergence admise : affine (ℓ = b/(1 − a)), √(x + c) (racine négative à rejeter), 1 + ln x (ℓ = 1), f bac22 (ℓ ∈ {0 ; ln 4}, choix par les bornes) ; (b) une fois sur quatre, a ∈ {2, 3, −2} et u_0 ≠ ℓ : la suite diverge | `sexp 1.1.4`, `sm 1.1.4`, `sexp 1.1.2` | point-fixe-prouve-convergence (réponse ℓ en (b)) ; limite-liee-terme-initial ; racine négative gardée ; majorant pris pour limite |
| 7 | `limite-geometrique` | 1 | lim (a·qⁿ + b), q ∈ {−3/2, −1, −½, ⅓, 1, 3/2, 2, e^{−1}, e}, a ∈ {−3…3}∖{0}, b ∈ {−2…4} | `sexp 1.1.2`, `sm 1.1.2` | q < 0 donc pas de limite (pour |q| < 1) ; qⁿ → 0 pour q ≤ −1 ; 1ⁿ → +∞ ; −∞ au lieu de 0 |
| 8 | `limite-composee` | 2 | lim g(u_n), g ∈ {ln, exp, √, x ↦ 1/x, x ↦ ln(c − 2x)}, lim u_n = ℓ tiré (ℓ = 0 avec ln : réponse −∞) | `sexp 1.1.3`, `sm 1.1.3` | g(u_0) au lieu de g(ℓ) ; g oubliée ; continuité en ℓ non regardée |
| 9 | `suite-auxiliaire-affine` | 3 | u_{n+1} = a·u_n + b, a ∈ {½, ⅓, 2/3, 2, 3}, ℓ entier ; v_n = u_n − ℓ ; raison, v_n, u_n, lim u_n | `sexp 1.1.1`, `sm 1.1.1`, `sexp 1.1.2` | raison b au lieu de a ; v_0 pris pour u_0 ; u_n = ℓ + aⁿ (v_0 oublié) ; raison qui dépend de n |
| 10 | `seuil-ln` | 2 | u_n = ℓ − c·qⁿ, q ∈ {½, ⅓, 0,9, e^{−1}}, ε ∈ {0,01 ; 0,001 ; 10⁻⁴} ; plus petit n tel que |u_n − ℓ| ≤ ε ; tirage rejeté si le quotient des ln est entier ; `filieres` : SM (ln donnés), PC/SVT (calculatrice) | `sexp 1.1.5`, `sm 1.1.5`, `sexp 1.2.17`, `sm 1.3.10` | sens gardé en divisant par ln q < 0 ; arrondi vers le bas ; ln(a/b) = ln a / ln b |
| 11 | `fin-de-probleme` | 3 | la chaîne du bac en 4 questions (récurrence, monotonie, convergence, limite) sur une f de la liste (bac22, bac19, 1 + ln x, √(x + c)), données de « partie I » fournies | `sexp 1.1.4`, `sm 1.1.4`, `sexp 1.1.3` | toutes celles des gabarits 3 à 6 |

**Séance 2** (`seance: 2`, annoncée comme telle, comme `exponentielle.js`)

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 12 | `homographique` | 3 | u_{n+1} = (a·u_n + b)/(c·u_n + d) à deux points fixes α, β entiers ou à un point fixe ; v_n = (u_n − α)/(u_n − β) ou 1/u_n − 1 (types 2020, 2021, 2024) | `sexp 1.1.1`, `sm 1.1.1` | raison mal calculée ; v_0 pris pour u_0 ; inversion de v en u fausse ; forme-indeterminee-mal-geree |
| 13 | `majoration-geometrique` | 2 | 0 < u_{n+1} ≤ k·u_n, k ∈ {⅓, ½, 2/5}, puis u_n ≤ u_0·kⁿ, puis la limite par encadrement | `sexp 1.1.2`, `sm 1.1.2` | quotient-monotonie-sans-positivite ; gendarmes-comparaison-mal-applique ; exposant n + 1 / n |
| 14 | `accroissements-finis` | 3 | |f′| ≤ k sur I stable, k ∈ {½, ⅓, ¼} ; |u_{n+1} − α| ≤ k|u_n − α| ⇒ |u_n − α| ≤ kⁿ|u_0 − α| ; `filieres: ['SM']` | `sm 1.3.17`, `sm 1.1.4` | iaf-intervalle-instable ; contraction-k-pas-strict ; exposant décalé |

---

## 8. À vérifier, et questions pour le relecteur

**Histoire et sources (≤ 3 places).**
1. **La prise répétée d'un médicament** (énigme `comprime` à `questions`, retour partie 8).
   [V] UNIL, *Pharmacology*, « Repeated administration »
   (https://sepia2.unil.ch/pharmacology/repeated-administration) : accumulation tant que la dose
   précédente n'est pas éliminée, plateau, et un temps pour l'atteindre fixé par la demi-vie. Même
   page : 88 % du plateau après trois demi-vies, 94 % après quatre (exemple du phénobarbital). Le
   modèle de la leçon redonne ces nombres : 1 − (½)³ = 87,5 %, 1 − (½)⁴ = 93,75 %. **Le modèle « la
   moitié en 24 heures » est un modèle de leçon, pas un médicament réel** : l'écran le dit, et ne nomme
   aucun médicament. La règle « environ cinq demi-vies » ne s'affiche pas : sa source (StatPearls,
   NCBI NBK553132) n'a pas pu être lue (page bloquée par une vérification de navigateur).
2. **Malthus, 1798** (`malthus`, tag `1798`). [V] *An Essay on the Principle of Population*,
   chapitre 2, transcription marxists.org
   (https://www.marxists.org/reference/subject/economics/malthus/ch02.htm) : population doublant
   tous les 25 ans, séries 1, 2, 4, 8… et 1, 2, 3, 4… ; « in two centuries and a quarter, the
   population would be to the means of subsistence as 512 to 10 ». Le principe des deux rapports est
   aussi dans l'extrait de Fordham (https://sourcebooks.web.fordham.edu/mod/1798malthus.asp). Aucune
   phrase à l'écran sur la justesse de la prédiction (non vérifiée). Aucune citation entre guillemets
   à l'écran : l'idée et « 512 à 10 » suffisent.
3. **al-Karaji (953 - vers 1029)** et la récurrence. [V] MacTutor
   (https://mathshistory.st-andrews.ac.uk/Biographies/Al-Karaji/) : « a form of mathematical
   induction », « not induction proper ». **Fiche de mot `recurrence` seulement**, hors du fil : il
   ne sert aucun pari (B8). Pascal (1654, selon la bible) : **non vérifié**, ne s'affiche pas.

**Exactitude.**
- Toutes les valeurs sont à produire par `suites-outils.js`, aucune écrite à la main : u_n de la dose
  (1 ; 1,5 ; 1,75 ; 1,875 ; 1,9375 ; u_6 = 1,96875 ; u_7 = 1,984375), w_n = 0,1 × 1,5ⁿ (w_7 ≈ 1,71,
  w_8 ≈ 2,56), la spirale e^{−u_n} (1 ; 0,368 ; 0,692 ; 0,500 ; 0,606…) et son point fixe ≈ 0,5671,
  w_10, w_1000 et w_1000000 de w_{n+1} = w_n + e^{−w_n}, ln 100 / ln 2 ≈ 6,64, f(1) ≈ 0,4208 et
  f(2) ≈ 5,905 pour bac22, les termes de bac19 (1 ; 1,5 ; 1,677 ; 1,793…).
- Les leurres ont été vérifiés un à un contre une coïncidence avec la bonne réponse. Une seule a été
  trouvée et écartée : « la limite est le majorant » tombe juste en SExp 2019 (limite e = majorant)
  et en SExp 2022 (limite 0 = minorant). Ce leurre n'est donc offert que sur la dose majorée par 3
  (`majorant-3`, `q1`), et en `bac-lim` avec ln 4, qui n'est pas la limite.
- Le théorème « croissante et majorée, donc convergente » est **admis**. Le cadre dit « critères de
  convergence » sans les énumérer : à confirmer contre le programme officiel (pas le cadre
  d'examen).
- « Croissante non majorée, donc tend vers +∞ » (`sans-point-fixe`) est supposé connu : à confirmer
  dans le programme officiel.
- Le cadre exige f continue sur I et f(I) ⊂ I (`sexp 1.1.4`). `continuite` et `bac-copie` écrivent
  les deux conditions. Pour bac22, f([0 ; ln 4]) = [0 ; ln 4] découle de la croissance et de
  f(0) = 0, f(ln 4) = ln 4.
- La transcription de SExp 2022 a été corrigée une fois (description de la figure de g, sans effet
  sur Q8). La question 8 elle-même est conforme au scan.

**Pour le relecteur.**
1. **Scène nouvelle `toile`** : type nouveau, décision du propriétaire (07 §3.3). **`doses`** :
   copie adaptée de `interets` (la dent de scie remplace l'escalier) ; à confirmer que ce n'est pas
   un type nouveau.
2. **L'énigme n'est pas historique**, elle est concrète et sourcée (pharmacologie). Malthus est la
   seule histoire du fil. Est-ce accepté, ou faut-il une énigme historique en ouverture ?
3. **Le poids des suites homographiques** : elles font les trois exercices séparés PC/SVT (3 à 4
   points), mais vont en séance 2. La séance 1 couvre la fin du problème, présente dans les deux
   épreuves. Faut-il inverser ?
4. **Les suites implicites f_n(x_n) = 0** (deux conceptions d'`items.yaml`) : leçon TVI, séance 2,
   ou hors des deux ?
5. **Les sous-suites paires et impaires** (après la spirale) : hors périmètre, ou séance 2 ?
6. **B7** : les gabarits 12 à 14 testent des capacités que la séance 1 n'enseigne pas, comme dans le
   logarithme et l'exponentielle. Marqués `seance: 2`, selon la décision déjà prise.
7. **« Premier geste » au bac** : pari de prédiction, comme dans les trois specs précédentes. Ici, la
   question dit déjà « par récurrence » : le geste porte donc sur ce qu'il faut chercher dans la
   partie I. À confirmer.
8. Le moteur sait-il donner deux curseurs à `need` dans une même leçon (`n` dans `doses`, `u0` dans
   `toile`) ? Même mécanisme que `curseur` de l'exponentielle, sans toucher `noyau.js`.
9. **Route** : `/pilote/suites` (fichiers `suites-*.js`) ou `/pilote/suites-numeriques` ?
10. **Le choix de la notion.** Le calcul intégral (`sexp 1.3.1`-`1.3.4`, `sm 1.4.1`-`1.4.7`) est
    lui aussi dans chaque problème et s'appuie sur ln et exp. On a pris les suites parce qu'elles
    sont dans les 6 sujets PC/SVT transcrits, et parce que les intégrales demandent d'abord les
    primitives (`sexp 1.2.14`-`1.2.15`), qui n'ont pas encore de leçon v3. Le nombre de points par
    sujet des deux notions n'a pas été compté : à faire si le choix est discuté.

## 9. Décisions du relecteur (2026-11-24)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **Scène nouvelle `toile`** : accordée. L'auteur la construit d'abord, seule, et regarde ses
   captures (ordinateur et 390 px). `doses` est une copie adaptée de `interets`, pas un type nouveau.
2. **L'énigme** (un comprimé chaque matin) : acceptée, concrète et sourcée. Malthus reste un pari
   dans le fil ; al-Karaji dans une fiche de mot ; aucune date non vérifiée à l'écran.
3. **Ordre des séances** : inchangé. La séance 1 donne les outils généraux (récurrence, monotonie,
   convergence, limite) ; les suites homographiques et les encadrements font la séance 2.
4. **Suites définies par f_n(x_n) = 0** : hors des deux séances, elles iront avec le théorème des
   valeurs intermédiaires.
5. **Sous-suites paires et impaires** : hors périmètre. La spirale est montrée, pas étudiée.
6. **Théorème de convergence monotone** : dit « admis » à l'écran. « Croissante et non majorée, donc
   tend vers +∞ » est rappelé en une phrase. Les deux sont à confirmer dans le programme officiel
   avant la mise en ligne, sans bloquer l'écriture.
7. **Deux curseurs obligatoires** (`n` et `u0`) : oui, chacun dans son étape, avec `need` et
   « Montre-moi », comme le curseur de l'exponentielle ; `noyau.js` ne se modifie pas.
8. **Route** : `/pilote/suites`.
9. **« Premier geste » de la question 8** : confirmé, le pari porte sur ce qu'on va chercher dans la
   partie I.
10. **Leurre « la limite est le majorant »** : jamais proposé sur les sujets 2019 et 2022, où il
    tomberait juste ; l'auteur le vérifie par le code sur chaque suite de la leçon et des exercices.
