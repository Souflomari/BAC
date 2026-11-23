# Spec v3 : méiose, fécondation et brassages (`svt/meiose-fecondation-brassages`)

> **Choix de la notion, en une ligne.** Dans le cadre PC, la sous-partie qui suit immédiatement l'expression
> (`svt-pc 2.2`) est la transmission par reproduction sexuée (`svt-pc 2.3`). Dans le cadre SVT, c'est le
> génie génétique (`svt-svt 2.3`), mais il est absent du cadre PC (`svt-pc.yaml`, en-tête et notes). La
> première notion qui suit l'expression **dans les deux filières** est donc la méiose (`svt-svt 3.1`) :
> c'est elle qu'on prend. Le génie génétique fera une leçon pour la seule filière SVT (§8, question 1).
>
> Plan d'auteur pour la leçon pilote `/pilote/meiose`, suite de `/pilote/expression-genetique`.
> Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèle de ton et de rythme :
> `web/src/components/pilote/expression-genetique-moteur.js`. Fiche : bible T1 (`docs/bible/04-svt.md`),
> avec G1 pour les prérequis (chromatide, quantité d'ADN). L'auteur suit ce plan étape par étape ; il
> rédige les textes, il ne décide ni l'ordre, ni les paris, ni les leurres. Tout nombre cité ici est à
> **recalculer par le code** (`meiose-outils.js` : 2ⁿ, 2²³, 2²³ × 2²³, quantités d'ADN, comptes de
> chromosomes et de chromatides par phase).
>
> **Scène d'un type nouveau demandée : une seule, `meiose`** (la figure-clé : des chromosomes qu'on voit
> se dupliquer, s'apparier, s'aligner, se séparer, échanger un segment ; et que l'élève retourne). Aucune
> scène existante ne déplace de chromosomes : `zoom` dessine un chromosome non dupliqué, immobile ;
> `atelier` travaille sur des séquences. La bible (T1, Représentations) fait de cette simulation la
> représentation centrale de la notion. Décision du propriétaire (07 §3, point 3). Toutes les autres
> scènes sont des copies adaptées de scènes existantes (§3.2).

---

## 1. Périmètre

### 1.1 Capacités officielles couvertes

| Filière | Id | Libellé (cadre 2025, mot pour mot) | Où |
|---|---|---|---|
| SVT | `svt-svt 3.1.1` | Décrire et reconnaitre les phases de la méiose ; | parties 3, 4, 9 |
| PC | `svt-pc 2.3.1` | Décrire et reconnaitre les phases de la méiose ; | idem |
| SVT | `svt-svt 3.1.2` | Analyser des caryotypes d'espèces diploïdes ; | partie 2 |
| PC | `svt-pc 2.3.2` | Analyser des caryotypes d'espèces diploïdes ; | idem |
| SVT | `svt-svt 3.1.3` | Déduire le rôle de la méiose et de la fécondation dans le brassage des allèles et dans le maintien du caryotype chez la même espèce de génération en génération et leur rôle dans la diversité génétique et ce à partir de l'exploitation de données de l'observation et de l'expérimentation ; | parties 1, 5, 6, 7, 8, 9 |
| PC | `svt-pc 2.3.3` | (même libellé) | idem |
| SVT | `svt-svt 3.1.4` | Réaliser des schémas en relation avec les phases de la méiose. | parties 4 (`schema-phases`), 9 |
| PC | `svt-pc 2.3.4` | Réaliser des schémas en relation avec les phases de la méiose. | idem |
| SVT | `svt-svt 3.2.3` | Schématiser le brassage interchromosomique et le brassage intrachromosomique, selon l'exemple étudié ; | **en partie** : le schéma au niveau des chromosomes et des gamètes (parties 5, 6), sans croisement ni échiquier (T2, T3) |
| PC | `svt-pc 2.4.3` | (même libellé) | idem |

Capacités réutilisées, enseignées ailleurs (prérequis, non testées seules ici) : phases de la mitose et
cycle cellulaire `svt-svt 2.1.2`, `2.1.3`, `svt-pc 2.1.2`, `2.1.3` (G1) ; relation chromosome-ADN
`svt-svt 2.1.6`, `svt-pc 2.1.6` ; notions de gène et d'allèle (`2.1` « Les notions de caractère
héréditaire, de gène, d'allèle et de mutation », vues dans la leçon expression).

### 1.2 Une seule séance

**« Moitié et hasard »** (58 étapes) : le caryotype et les paires d'homologues, la méiose en deux
divisions (réductionnelle, équationnelle), la quantité d'ADN, le brassage interchromosomique et la loi
2ⁿ, le crossing-over et le brassage intrachromosomique, la fécondation qui rétablit 2n et multiplie les
combinaisons, le retour à l'énigme, un document du bac. La suite (annoncée au bilan) : `transmission-
caracteres` (T2, ce que la méiose fait aux allèles dans un croisement) puis la leçon gènes liés et carte
factorielle (T3), qui mesure le crossing-over vu ici.

### 1.3 Hors périmètre, qu'on n'enseigne pas

Les sous-stades de la prophase I (leptotène, zygotène, pachytène, diplotène, diacinèse : absents des trois
cadres) ; le complexe synaptonémal ; l'ovogenèse et la spermatogenèse détaillées (globules polaires :
cités une fois, sans être interrogés) ; **les anomalies de nombre et la non-disjonction** (T5,
`svt-svt 3.3.2`, filière SVT seulement : un renvoi au bilan, pas d'étape) ; les **cycles de
développement** (SM-A seulement, `svt-sma 1.1.3`) ; le calcul d'une distance entre gènes et la carte
factorielle (T3, `3.2.4`) ; les croisements et l'échiquier (T2). Le mot « recombiné » est employé pour un
chromosome ou un gamète, jamais pour une classe de descendants (c'est T3).

### 1.4 Filières

| | SVT | PC | SM-A |
|---|---|---|---|
| Leçon | entière | entière | utilisable (`svt-sma 1.1.1`, `1.1.2`, `1.1.4`, `1.1.5` en partie), **sans** les cycles de développement : à ne pas présenter comme complète en SM-A |
| Poids | génétique 45-50 % (C-S1 p. 22) | domaine 2, 25 % (C-S2 p. 19) | domaine 1, 50 % |
| Formes vues aux sujets | Partie I 2024 N (bible T1) | Partie I 2024 R : crossing-over en prophase I, quatre cellules haploïdes (verification-svt §5) | Partie I 2024 N et 2026 N (QCM : anaphase II, métaphase équationnelle, crossing-over en division réductionnelle) |

Les exercices ne distinguent pas les filières, sauf le gabarit 4 (caryotypes : l'exemple humain avec
formule gonosomique sert aux trois ; aucun écart de cadre).

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** 1883 : Édouard Van Beneden, à Liège, observe la fécondation chez l'*Ascaris*,
un ver parasite du cheval [V]. Dans la variété qu'il étudie, l'œuf fécondé porte **4** chromosomes. Le
noyau venu du spermatozoïde et celui de l'ovule sont encore séparés, on peut les compter. **Combien de
chromosomes apporte chacun ?** L'élève parie, puis la scène compte : 2 et 2 [V]. D'où le problème :
si les gamètes étaient fabriqués comme les autres cellules (par mitose), ils auraient 4 chromosomes,
l'œuf 8, puis 16… **Deux questions laissées ouvertes : comment une cellule divise-t-elle exactement son
nombre de chromosomes par deux ? Et quelle moitié garde-t-elle : toujours la même ?** (la seconde est
le pari `quelle-moitie`, tranché aux parties 5 et 8).

**Le retour (partie 8).** Les deux questions tombent avec les outils de la leçon :
1. la moitié exacte : la première division sépare les deux chromosomes de chaque paire ; le gamète
   reçoit **un chromosome de chaque paire** (2 pour l'*Ascaris*, 23 pour l'Homme) ;
2. quelle moitié : le hasard de l'orientation de chaque paire, plus le crossing-over ; d'où des
   gamètes presque tous différents, et deux frères (non jumeaux) presque jamais identiques ; la
   probabilité qu'un père transmette deux fois exactement la même combinaison de chromosomes est
   1/2²³ (sans compter le crossing-over).

Le fil rouge : « la moitié, prise au hasard, une paire après l'autre » (partie 5) est la règle qui sera
le cœur des croisements (T2) : un parent A//a donne ½ A et ½ a.

---

## 3. La chaîne des idées

1. Ce qu'on sait du chromosome (rappel : une ou deux chromatides, quantité d'ADN doublée en phase S) →
2. l'énigme : un gamète a moitié moins de chromosomes → 3. les chromosomes vont par paires
d'homologues, l'un du père, l'autre de la mère ; n et 2n ; le caryotype → 4. la première division
sépare les homologues (c'est elle qui réduit) → 5. la seconde sépare les chromatides (comme une mitose,
mais dans une cellule haploïde) ; la courbe de la quantité d'ADN → 6. chaque paire s'oriente au hasard :
2ⁿ combinaisons (brassage interchromosomique) → 7. les homologues appariés échangent des segments :
crossing-over (brassage intrachromosomique) → 8. la fécondation rétablit 2n et multiplie les
combinaisons → 9. ces outils résolvent l'énigme → 10. le bac.

**Figure-clé : la méiose d'une cellule à 2n = 4** (scène `meiose`, 13 étapes, un changement chacune) :
`interphase` (réplication), `appariement`, `tetrade` (partie 3), `metaphase1`, `anaphase1`,
`telophase1` (partie 3), `metaphase2`, `anaphase2`, `quatre-cellules` (partie 4), `orientation`,
`une-cellule` (partie 5), `chiasma`, `echange` (partie 6). Ses trois paris : `metaphase1`,
`anaphase1`, `chiasma`. Le choix de 2n = 4 reprend l'*Ascaris* de l'énigme ; les chromosomes sont
schématiques (une grande paire, une petite) : la scène ne prétend pas montrer ceux du ver.

**Les allèles de la figure** (posés partie 5, gardés jusqu'au bac) : grande paire, deux gènes, A//a et
D//d, en position AD (chromosome paternel) et ad (maternel) ; petite paire, B//b. Sans crossing-over,
quatre types de gamètes : AD B, AD b, ad B, ad b ; avec un crossing-over entre A et D, s'ajoutent
Ad et aD. Notation à double trait de la leçon `transmission-caracteres` ; **à vérifier** : l'écriture
des génotypes à deux gènes indépendants dans les sujets (A//a B//b, ou AB//ab séparés par un point).

**Convention de quantité d'ADN** : le gamète vaut q ; une cellule 2n en G1 vaut 2q, en G2 4q (bible T1,
piège de copie : « une cellule 2n en G2 = 4q si le gamète vaut q, QCM SM-A 2024 »). **À trancher** : la
fiche G1 écrit le cycle d'une cellule somatique q → 2q → q ; les deux leçons doivent dire laquelle des
conventions elles prennent, et la leçon G1 future doit être alignée (§8, question 3).

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 3 |
| 1 | L'énigme | Énigme | 5 |
| 2 | Les paires | Paires | 5 |
| 3 | La première division | Division I | 7 |
| 4 | La seconde division | Division II | 6 |
| 5 | Le hasard des paires | Hasard | 8 |
| 6 | Le crossing-over | Crossing-over | 6 |
| 7 | La fécondation | Fécondation | 4 |
| 8 | Retour à l'énigme | Retour | 3 |
| 9 | Au bac | Bac | 7 |
| 10 | Bilan | Bilan | 4 |

58 étapes. Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`). Dans les options : ✓ juste ; ✗ fausse, suivie de la conception affrontée
puis de l'idée du retour (B2 : nommer l'erreur, donner le bon geste ; l'indice est la question qui
ramène à ce geste). **Contrôle B3 (« un leurre mène à un résultat faux »)** fait sur chaque question
chiffrée : les valeurs de n sont choisies pour que 2ⁿ, 2 × n, n² et 2n ne coïncident jamais (n = 1, 2
et 4 sont exclus des questions qui opposent ces règles : 2¹ = 2 × 1 ; 2² = 2 × 2 = 2² ; 2⁴ = 4²).

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `zoom` | **réutilisée telle quelle** du pilote expression (`expression-genetique-scenes-a.js`) | cellule → noyau → chromosome ; « 46 chromosomes » |
| `meiose` | **nouvelle** | voir ci-dessous (figure-clé, caryotype, fécondation) |
| `adn` | copie adaptée de `loi` (`radioactivite-scenes-b.js`) | la courbe de la quantité d'ADN par cellule, en paliers (les « marches » de `loi`), axe vertical q, 2q, 4q ; phases sous l'axe |
| `table` | copie adaptée du pilote logarithme | n paires → 2ⁿ types de gamètes, lu de haut en bas ; une colonne « couple » 2ⁿ × 2ⁿ |
| `schema` | copie adaptée du pilote expression (`expression-genetique-scenes-c.js`) | six petites cellules en division, repères 1 à 6 à légender (même contrôle `schema`) |
| `bac` | copie adaptée du pilote expression | le document : une courbe d'ADN et trois cellules a, b, c |
| `quiz`, `end` | copies du pilote expression | les trois pièges ; le bilan |

Les scènes du pilote expression sont exportées par fichiers (`scenesA(ctx)`…) : `zoom` s'importe ; les
autres se **copient** dans `meiose-scenes-a.js` / `-b.js` / `-c.js`, comme pour l'exponentielle.

**Scène nouvelle `meiose`** (décision du propriétaire, 07 §3.3).
- Montre : une cellule à 2n = 4, une grande paire et une petite ; dans chaque paire, le chromosome
  d'origine paternelle en `k-a`, celui d'origine maternelle en `k-ink` (deux classes de trait, aucune
  couleur en dur) ; chaque chromosome dessiné avec une ou deux chromatides et un centromère ; les
  allèles écrits au crayon de la scène (`t-lab`) ; la plaque équatoriale en pointillé (`k-dim`).
- Paramètres :
  - `ph` (0 → 8, continu, une phase par unité : 0 G1, 1 après la phase S, 2 prophase I (appariement),
    3 métaphase I, 4 anaphase I, 5 fin de division I (deux cellules), 6 métaphase II, 7 anaphase II,
    8 quatre cellules) ; entre deux entiers, les chromosomes glissent (le moteur interpole) ;
  - `plq` (plaque équatoriale) ; `tet` (contour des bivalents, étiquette « tétrade : 4 chromatides ») ;
  - `al` (allèles affichés) ; `or2` (0 ou 1 : orientation de la petite paire en métaphase I ; 0.5
    interdit, l'animation fait un demi-tour visible) ; `gam` (sous chaque cellule finale, son génotype :
    « AD B ») ;
  - `co` (0 → 1 : sur la grande paire, deux chromatides non sœurs se croisent (chiasma), puis les
    segments portant D et d s'échangent) ; `chi` (étiquette « chiasma ») ;
  - `cnt` (compteur « n chromosomes · c chromatides · quantité d'ADN » sous chaque cellule, calculé) ;
  - `mit` (en vignette, à droite : la métaphase d'une mitose de la même cellule, chromosomes alignés un
    par un ; sert au reveal de `metaphase1`) ;
  - `kar` (mode caryotype : les chromosomes rangés par paires, numérotés, étiquette « 2n = … » ; l'espèce
    est un paramètre `esp` : `ascaris4`, `droso8`, `homme46`, avec la ligne des gonosomes pour la
    drosophile et l'Homme) ;
  - `fec` (mode fécondation : deux noyaux, « mâle » et « femelle », chromosomes masqués tant que
    `fcnt` vaut 0 ; puis comptés un par un) ; `zyg` (les deux lots réunis, 2n).
- L'élève manipule : à l'étape `orientation`, un bouton « Retourner la petite paire » (`ctl:'orient'`) ;
  la scène rejoue anaphase I → quatre cellules et écrit les génotypes ; un compteur liste les types de
  gamètes déjà obtenus (« AD B · ad b · … »). `need` : les deux orientations essayées (ou « Montre-moi »
  après deux essais ou 20 s, comme `curseur` de l'exponentielle).
- Lisibilité à 390 px : à la phase 8, quatre cellules sur une rangée de 4 × 220 ; les allèles en
  `t-lab` (taille du pilote expression) ; à vérifier sur capture.

---

### Partie 0 : Ce qu'il faut savoir (scènes `zoom`, `meiose`, `adn`)

- **`v-savoir`** · scène `zoom`, `z:3` · un test : réussi du premier coup, on passe le rappel (comme le
  pilote expression, bouton « Passer à l'énigme »). **V** « Un chromosome en forme de X, c'est… »
  ✓ un chromosome dupliqué : deux chromatides identiques. ✗ deux chromosomes collés : confondre
  chromatide et chromosome (bible G1) → indice « Les deux bras du X sont-ils des copies l'un de
  l'autre ? ». ✗ la forme de tout chromosome : croire qu'un chromosome a toujours la forme d'un X
  (bible G1) → en dehors de la division, il n'a qu'une chromatide.
- **`sav-chromatides`** · scène `meiose`, `ph:0→1` · un chromosome non dupliqué (une chromatide, une
  molécule d'ADN) ; pendant la phase S, l'ADN est copié : deux chromatides sœurs, identiques, reliées
  par le centromère. `fort` : les chromatides sœurs sont des copies. Pas d'action.
- **`sav-adn`** · scène `adn`, mode `mit:1` (cycle d'une cellule somatique, convention §3 : 2q → 4q →
  2q) · la quantité d'ADN double en phase S, et la mitose la partage : deux cellules identiques, même
  nombre de chromosomes que la mère. Pas d'action.

### Partie 1 : L'énigme (scène `meiose`, mode fécondation)

- **`ascaris`** · tag `1883 · Van Beneden` · `fec:1, fcnt:0` · le ver, l'œuf fécondé à 4
  chromosomes, les deux noyaux encore séparés. **P** « Combien de chromosomes apporte le noyau du
  spermatozoïde ? » options : « 4, comme toute cellule du ver » / « 2 » / « 1 ». `reveal` : `fcnt:1`,
  les chromosomes de chaque noyau se comptent, 2 et 2. Retours (tous) : ce que Van Beneden a vu, 2 et
  2 ; le retour de « 4 » ajoute « 4 + 4 ferait 8 dans l'œuf ».
- **`doublement`** · `zyg:1` · **Q** « Si chaque gamète avait 4 chromosomes, combien en aurait l'œuf ? »
  ✓ 8. ✗ 4 : croire que la fécondation réunit sans additionner → deux noyaux se réunissent, leurs
  chromosomes s'ajoutent. ✗ 16 : multiplier les deux lots → on réunit 4 et 4 chromosomes, on ne les
  multiplie pas. Retour du ✓ : 16 à la génération suivante, puis 32 ; or le nombre de chromosomes
  d'une espèce ne change pas.
- **`humain`** · scène `zoom`, `z:3` · **V** « Une cellule humaine a 46 chromosomes. Un spermatozoïde
  en porte… » ✓ 23 chromosomes. ✗ 23 paires de chromosomes : 23 paires, c'est 46 → le gamète a un
  chromosome de chaque paire. ✗ 46, comme toute cellule : c'est le cas de l'*Ascaris* à 4 → l'œuf en
  aurait 92.
- **`quelle-moitie`** · scène `meiose`, `kar:1, esp:'ascaris4'` (les deux paires rangées) · **P** « Le
  gamète ne garde que la moitié. Laquelle ? » options : « toujours la même moitié (par exemple les
  chromosomes venus du grand-père) » / « un chromosome de chaque paire, pris au hasard » / « deux
  chromosomes quelconques, même d'une seule paire ». Retour identique : « Pari noté. La méiose va
  répondre, et tu verras toi-même dans la figure. » (forme de `gene-chr` du pilote expression).
- **`deux-questions`** · `kar:0, fec:0` · deux frères nés des mêmes parents ne sont presque jamais
  identiques (sauf les vrais jumeaux) ; `fort` : « Comment une cellule divise-t-elle exactement par deux
  ? Et pourquoi chaque gamète est-il différent ? La leçon va répondre. » Pas d'action.

### Partie 2 : Les paires (scène `meiose`, mode caryotype)

- **`caryotype`** · `kar:1, esp:'droso8'` · un [[caryotype|caryotype]] : les chromosomes d'une cellule,
  photographiés en métaphase de mitose, rangés par paires de même taille et de même forme. **Q** « Chez
  la drosophile, une cellule a 8 chromosomes, en 4 paires. Que valent 2n et n ? » ✓ 2n = 8 et n = 4.
  ✗ 2n = 4 et n = 2 : prendre le nombre de paires pour 2n → 2n compte les chromosomes. ✗ 2n = 16 et
  n = 8 : doubler encore → 2n est le nombre de chromosomes de la cellule, n celui du gamète.
- **`homologues`** · `esp:'droso8', al:1` · chaque paire réunit deux [[homologue|chromosomes
  homologues]] : l'un vient du père, l'autre de la mère ; ils portent les mêmes gènes, aux mêmes
  places, mais pas forcément les mêmes allèles (A sur l'un, a sur l'autre). `fort`. Pas d'action.
- **`homo-soeurs`** · scène `meiose`, `kar:0, ph:1, al:1` (après la phase S, avant tout crossing-over :
  la nuance arrive partie 6) · bible T1, deuxième conception · **Q** « Les
  deux chromatides d'un chromosome dupliqué, et les deux chromosomes d'une paire : lesquels portent
  forcément les mêmes allèles ? » ✓ les deux chromatides sœurs (des copies). ✗ les deux homologues :
  confondre homologues et chromatides sœurs → l'un vient du père, l'autre de la mère, ils peuvent
  différer (A et a). ✗ les deux : les sœurs sont des copies, les homologues non.
- **`gonosomes`** · `kar:1, esp:'homme46'` · 22 paires d'[[autosome|autosomes]] et une paire de
  [[gonosome|chromosomes sexuels]] : XX chez la femme, XY chez l'homme ; formules 2n = 44A + XX et
  2n = 44A + XY (forme des sujets, bible T5 : « 2n = 44A + XXY »). **Q** « Formule d'un spermatozoïde
  humain ? » ✓ n = 22A + X, ou n = 22A + Y. ✗ n = 22A + XY : garder la paire XY ensemble → X et Y
  sont homologues, ils se séparent comme les autres. ✗ n = 23A + X : diviser 46 au lieu de 44 → 44
  autosomes donnent 22, le gonosome est compté à part.
- **`v-haploide`** · `esp:'droso8'` · **V** « Une cellule haploïde de drosophile (n = 4) contient… »
  ✓ un chromosome de chaque paire, 4 en tout. ✗ 4 paires : 4 paires font 8 chromosomes, c'est 2n.
  ✗ 2 paires : n = 4 compte des chromosomes, pas des paires. `apres` : les deux mots, avec leur fiche :
  [[diploide|diploïde]] (2n, des paires), [[haploide|haploïde]] (n, un de chaque paire).

### Partie 3 : La première division (scène `meiose`, figure-clé ; `adn`)

- **`interphase`** · `kar:0, ph:0→1, cnt:1` · avant la [[meiose|méiose]], comme avant une mitose, l'ADN
  est copié en phase S. **Q** « Une cellule 2n = 4 vaut 2q en G1 (le gamète vaudra q). Après la
  phase S ? » ✓ 4q, chaque chromosome a deux chromatides. ✗ 2q : croire que la quantité d'ADN suit le
  nombre de chromosomes (bible G1, « 2n et quantité d'ADN confondus ») → le nombre reste 4, chaque
  chromosome a doublé. ✗ q : croire que la cellule se prépare déjà à diviser par deux → la réplication
  double toujours l'ADN. `reveal` : `cnt` passe à « 4 chromosomes · 8 chromatides · 4q ».
- **`appariement`** · `ph:1→2` · prophase I : les homologues se rapprochent et s'accolent sur toute
  leur longueur. Chaque paire devient un [[bivalent|bivalent]], ou tétrade : 4 chromatides. Ce qui ne
  se voit jamais en mitose. Pas d'action.
- **`tetrade`** · `tet:1` · forme de QCM (bible T1 : « le nombre de tétrades ») · **Q** « En
  prophase I, une cellule de drosophile (2n = 8) contient combien de tétrades ? » ✓ 4 (une par paire).
  ✗ 8 : compter des chromosomes → une tétrade, c'est une paire. ✗ 16 : compter des chromatides → 16
  chromatides, 4 par tétrade.
- **`metaphase1`** · pari de la figure 1/3 · `ph:2, plq:1` · bible T1, première conception (« la
  méiose, c'est deux mitoses ») · **P** « Les chromosomes rejoignent la plaque équatoriale. Comment
  s'y placent-ils ? » options : « un par un, alignés, comme en mitose » / « par paires, un homologue de
  chaque côté de la plaque » / « en désordre ». `reveal` : `ph:2→3`, puis `mit:1` (la vignette de
  mitose, un par un) : la différence se voit côte à côte. Retours : le retour de « comme en mitose »
  nomme la conception (« ce serait vrai si la méiose était deux mitoses ») ; les trois donnent le fait :
  en métaphase I, les paires se placent de part et d'autre de la plaque.
- **`anaphase1`** · pari de la figure 2/3 · `mit:0` · **Q** « Que va séparer l'anaphase I ? » ✓ les deux
  homologues de chaque paire, chacun avec ses deux chromatides. ✗ les chromatides sœurs : c'est ce
  que fait la mitose (bible T1, première conception) → en métaphase I, ce sont les paires qui sont à
  cheval sur la plaque. ✗ rien, les paires restent entières : alors aucune cellule ne serait haploïde
  → la réduction exige qu'on sépare les paires. `reveal` : `ph:3→4`, les homologues partent vers les
  pôles, toujours bichromatidiens.
- **`telophase1`** · `ph:4→5, cnt:1` · deux cellules, chacune avec 2 chromosomes, un de chaque paire,
  encore à deux chromatides. C'est la [[reductionnelle|division réductionnelle]] : 2n → n. `fort`.
  **V** « Chaque cellule obtenue contient… » ✓ n = 2 chromosomes à deux chromatides (2q). ✗ 2n = 4
  chromosomes à une chromatide : penser mitose, séparer les chromatides → ce sont les homologues qui
  sont partis. ✗ n = 2 chromosomes à une chromatide : croire qu'haploïde veut dire une chromatide
  (bible T1, quatrième conception) → les chromatides ne se sont pas encore séparées.
- **`adn-i`** · scène `adn`, segments G1 → S → division I (`seg:3`) · la quantité d'ADN : 2q → 4q →
  2q. Pas d'action. (A7 : précédée de `telophase1` V, suivie de `metaphase2` Q.)

### Partie 4 : La seconde division (scènes `meiose`, `adn`, `schema`)

- **`metaphase2`** · scène `meiose`, `ph:5→6` · forme de QCM SM-A 2026 (« métaphase équationnelle :
  cellule haploïde à chromosomes bichromatidiens », verification-svt §6) · **Q** « En métaphase II,
  chaque cellule est… » ✓ haploïde, à chromosomes à deux chromatides. ✗ diploïde, puisque chaque
  chromosome a deux chromatides : compter des chromatides comme des chromosomes → 2 chromosomes, aucun
  homologue : n. ✗ haploïde, à chromosomes à une chromatide (bible T1, quatrième conception) → la
  seconde division n'a pas encore eu lieu.
- **`anaphase2`** · **Q** « Que sépare l'anaphase II ? » ✓ les deux chromatides sœurs de chaque
  chromosome. ✗ les homologues : il n'y a plus de paire dans la cellule → n = 2, un de chaque paire.
  ✗ rien : alors les quatre cellules auraient des chromosomes à deux chromatides et 2q → le gamète vaut
  q. `reveal` : `ph:6→7`.
- **`quatre-cellules`** · `ph:7→8, cnt:1` · quatre cellules haploïdes, chromosomes à une chromatide,
  q chacune. C'est la [[equationnelle|division équationnelle]] : le nombre de chromosomes ne change
  pas (n → n), comme dans une mitose. `fort` : une réplication, deux divisions. Pas d'action.
- **`ou-reduction`** · bible T1, troisième conception (« la réduction a lieu à la deuxième division »,
  le QCM SM-A 2026 joue là-dessus) · **V** « À quel moment le nombre de chromosomes est-il divisé par
  deux ? » ✓ à l'anaphase I. ✗ à l'anaphase II : c'est la quantité d'ADN qui y est divisée par deux,
  pas le nombre de chromosomes (n → n). ✗ deux fois, à chaque division : 2n → n → n.
- **`courbe`** · scène `adn`, `seg:5, hl:0` · la courbe entière 2q → 4q → 2q → q. **Q** « Sur cette
  courbe, que représente la chute de 2q à q ? » ✓ l'anaphase II : les chromatides sœurs se séparent.
  ✗ la réduction du nombre de chromosomes : elle a eu lieu avant, à la première chute → la seconde
  chute ne change pas n. ✗ la phase S : la phase S fait monter la courbe. `reveal` : `hl` surligne la
  chute, l'étiquette « anaphase II ».
- **`schema-phases`** · scène `schema` · **M** `ctl:'schema'`, `need` : les six repères légendés ·
  forme de Partie I (« légender un schéma », C-S1 p. 23) et `svt-svt 3.1.4` · six cellules dessinées :
  prophase I, métaphase I, anaphase I, métaphase II, anaphase II, fin de division II ; une légende fausse
  reçoit un indice (« Les chromosomes sont-ils par paires ? Ont-ils deux chromatides ? ») et se grise
  (comportement du contrôle `schema` du pilote expression).

### Partie 5 : Le hasard des paires (scènes `adn`, `meiose`, `table`)

- **`rappel`** · scène `adn`, `seg:5` · `sujet:'les chromosomes à chaque phase'` · texte : mi-parcours,
  c'est le bon moment pour une pause ; un rappel avant de repartir. **V** « Drosophile, 2n = 8 : en
  métaphase II, chaque cellule contient… » ✓ 4 chromosomes à deux chromatides. ✗ 8 chromosomes : la
  réduction a eu lieu à la division I → 4. ✗ 4 chromosomes à une chromatide : les chromatides se
  séparent seulement à l'anaphase II.
- **`alleles`** · scène `meiose`, `ph:3, al:1, or2:0` · on écrit les allèles : grande paire AD
  (paternel) et ad (maternel), petite paire B (paternel) et b (maternel). Dans cette orientation, les
  deux chromosomes paternels partent du même côté. `seq` : `ph:3→8`, `gam:1` : deux types de gamètes,
  AD B et ad b. Pas d'action.
- **`orientation`** · tag `1903 · Sutton` · **M** `ctl:'orient'`, `need` : les deux orientations · la
  question de Sutton : chaque paire s'oriente-t-elle indépendamment des autres ? Retourner la petite
  paire, regarder les gamètes. Sutton (1903) écrit que la position de chaque paire sur la plaque est
  une affaire de hasard [S, §8]. La scène écrit « orientation 2 : AD b et ad B ». Le compteur atteint
  4 types.
- **`une-cellule`** · `ph:8, gam:1` · conception « une cellule donne tous les gamètes possibles »
  (ajoutée ici, voir §5) · **Q** « Une seule cellule de ce type fait sa méiose, sans crossing-over. Combien de types de
  gamètes produit-elle ? » ✓ 2 : elle n'a qu'une orientation à la métaphase I. ✗ 4 : confondre une
  cellule et l'ensemble des cellules → les 4 types viennent de cellules différentes, orientées
  différemment. ✗ 1 : les deux homologues d'une paire partent dans des cellules différentes.
- **`deux-paires`** · scène `table`, `rows:2` · **P** « Avec ces 2 paires, chez l'individu entier (des
  milliers de cellules), dans quelles proportions sortent les 4 types ? » options : « ¼ chacun » /
  « surtout AD B et ad b, les chromosomes du même parent restent ensemble » / « au hasard, sans
  proportion fixe ». `reveal` : la ligne « 2 paires : 4 types, ¼ chacun » (deux orientations également
  probables). Le retour de la deuxième option nomme la conception (« les gamètes gardent les
  chromosomes d'un même parent », pari `quelle-moitie`). (B3 : on ne demande pas ici « combien de
  types ? » : avec 2 paires, 2ⁿ = 2 × n = n² = 4 ; c'est `trois-paires` qui tranche.)
- **`trois-paires`** · `rows:3` · **Q** « Avec 3 paires, combien de types de gamètes ? » ✓ 8 (2 × 2 ×
  2 : chaque paire double le nombre). ✗ 6 : additionner, 2 par paire → chaque paire double le nombre
  de combinaisons, elle ne l'augmente pas de 2. ✗ 9 : 3² → c'est 2 choix par paire, 3 fois. `apres` :
  tex 2ⁿ types de gamètes pour n paires (sans crossing-over).
- **`humain-2-23`** · `rows:23, big:1` · **Q** « L'Homme : n = 23. Combien de types de spermatozoïdes un
  homme peut-il produire, sans compter le crossing-over ? » ✓ 2²³ ≈ 8,4 millions. ✗ 46 (2 × 23) :
  la règle additive de `trois-paires`. ✗ 529 (23²). `apres` : « C'est le [[brassage-inter|brassage
  interchromosomique]] : le hasard de l'orientation de chaque paire en métaphase I. » (`fort` dans
  l'`apres`.)
- **`v-inter`** · conception « le brassage crée de nouveaux allèles » (ajoutée, voir §5) · **V** « Le
  brassage interchromosomique fait apparaître… » ✓ de nouvelles combinaisons d'allèles qui existaient
  déjà. ✗ de nouveaux allèles : confondre brassage et mutation (leçon expression) → seule une mutation
  crée un allèle. ✗ de nouveaux chromosomes : chaque chromosome passe entier dans un gamète, sans
  changer (en l'absence de crossing-over).

### Partie 6 : Le crossing-over (scène `meiose`)

- **`chiasma`** · pari de la figure 3/3 · tag `1909 · Janssens` · `ph:2, al:1, chi:1` · en
  prophase I, au microscope, deux chromatides de la tétrade se croisent : un [[chiasma|chiasma]].
  Janssens y voit un échange de segments (1909). Bible T1, deuxième conception · **Q** « L'échange se
  fait entre quelles chromatides ? » ✓ deux chromatides non sœurs, une de chaque homologue. ✗ deux
  chromatides sœurs : confondre homologues et chromatides sœurs → échanger deux copies identiques ne
  changerait rien. ✗ deux chromosomes de paires différentes : seuls les homologues sont accolés en
  prophase I. `reveal` : `co:0→1`, le segment portant D passe sur la chromatide maternelle, d sur la
  paternelle.
- **`echange`** · `co:1, ph:2→8, gam:1` · la méiose se poursuit ; quatre cellules : AD, Ad, aD, ad
  (grande paire seule montrée). C'est le [[crossing-over|crossing-over]] : le [[brassage-intra|brassage
  intrachromosomique]]. `fort` : il crée sur un même chromosome des combinaisons qui n'existaient chez
  aucun des deux parents. Retour sur `une-cellule` : avec un crossing-over, une seule cellule donne
  4 types pour la grande paire, au lieu de 2. Pas d'action.
- **`recombines`** · bible T1, représentation (« combien des 4 gamètes sont recombinés ? (2) ») · **Q**
  « Après un crossing-over entre A et D, combien des 4 chromatides portent une combinaison nouvelle ? »
  ✓ 2 (Ad et aD). ✗ 4 : croire que toute la tétrade est échangée → seules les deux chromatides du
  croisement changent. ✗ 1 : un échange se fait à deux, chacune reçoit le segment de l'autre.
- **`quand-co`** · forme de QCM (PC 2024 R : « crossing-over en prophase I » ; SM-A 2026 :
  « crossing-over en division réductionnelle », verification-svt §5-6) · **V** « Le crossing-over a
  lieu… » ✓ en prophase I. ✗ en anaphase II : en division II il n'y a plus d'homologues dans la
  cellule. ✗ en mitose : les homologues ne s'apparient pas en mitose.
- **`v-intra`** · `co:1, gam:1` · **V** « Lesquels de ces gamètes n'existeraient pas sans crossing-over
  ? » (AD B, Ad B, aD b, ad b) ✓ Ad B et aD b. ✗ AD B et ad b : ce sont les combinaisons des
  chromosomes parentaux → le crossing-over sépare A de D. ✗ tous les quatre : AD et ad existent sans
  crossing-over, ce sont les chromosomes du père et de la mère.
- **`deux-brassages`** · `table`, colonne « avec crossing-over » · les deux brassages s'ajoutent : 2ⁿ
  combinaisons de chromosomes, et chaque chromosome peut lui-même être recombiné ; chaque gamète est
  presque unique. Pas d'action. (A7 : précédée de `v-intra`, suivie de `fecondation` Q.)

### Partie 7 : La fécondation (scènes `meiose`, `table`, `adn`)

- **`fecondation`** · `meiose`, `fec:1, zyg:1, esp:'homme46'` · la [[fecondation|fécondation]] réunit
  un spermatozoïde et un ovule. **Q** « n = 23 et n = 23 donnent… » ✓ une cellule-œuf à 2n = 46. ✗ 23 :
  croire que la fécondation garde le nombre du gamète → deux noyaux s'unissent, les chromosomes
  s'ajoutent (`doublement`). ✗ 92 : compter des chromatides, ou partir de 46 par gamète (`humain`).
- **`hasard-fec`** · `table`, colonne « couple » · n'importe quel spermatozoïde peut rencontrer
  n'importe quel ovule. **Q** « Combien de combinaisons de chromosomes différentes un couple peut-il
  donner à un enfant, sans crossing-over ? » ✓ 2²³ × 2²³ ≈ 7,0 × 10¹³. ✗ 2 × 2²³ ≈ 1,7 × 10⁷ :
  additionner les gamètes des deux parents → chaque spermatozoïde se combine avec chaque ovule, on
  multiplie. ✗ 2²³ ≈ 8,4 millions : croire que la fécondation n'ajoute rien → la mère brasse aussi.
- **`cycle`** · scène `adn`, `fec:1` (la courbe se prolonge : q → 2q à la fécondation) · méiose et
  fécondation alternent : 2n → n → 2n. `fort` : le caryotype de l'espèce se maintient de génération en
  génération (`svt-svt 3.1.3`). Pas d'action.
- **`v-cycle`** · **V** « Sans la méiose, que ferait la fécondation au nombre de chromosomes ? » ✓ elle
  le doublerait à chaque génération. ✗ rien : deux lots de 2n réunis font 4n → c'est l'énigme de
  l'*Ascaris*. ✗ elle le diviserait par deux : la fécondation réunit, elle ne partage pas.

### Partie 8 : Retour à l'énigme (scène `meiose`)

- **`retour-moitie`** · `fec:1, fcnt:1, esp:'ascaris4'` · texte dépendant du pari `quelle-moitie`
  (forme de `faux-sens` du pilote expression : « Ton pari du début était le bon » ou « Tu avais parié
  … ») : le gamète de l'*Ascaris* reçoit un chromosome de chaque paire ; lequel des deux, c'est le
  hasard de l'orientation. **Q** « Pourquoi le spermatozoïde de l'*Ascaris* a-t-il 2 chromosomes ? »
  ✓ l'anaphase I a séparé les deux paires d'homologues. ✗ l'anaphase II a séparé ses chromatides : la
  division II garde n → c'est la division I qui réduit. ✗ il en a perdu deux au hasard : un de chaque
  paire, jamais deux de la même.
- **`retour-freres`** · **Q** « Un père a déjà eu un fils. Probabilité qu'un second fils reçoive de lui
  exactement les mêmes chromosomes (sans crossing-over) ? » ✓ 1/2²³, environ 1 sur 8,4 millions. ✗ 1/2 :
  raisonner sur une seule paire → les 23 paires s'orientent chacune au hasard. ✗ 1/23 : une chance par
  paire → chaque paire donne ½, et les 23 se multiplient (½ × ½ × … , 23 fois). `apres` : avec le crossing-over et la mère,
  c'est encore beaucoup moins : deux frères ne sont presque jamais identiques. `fort` : l'énigme est
  résolue.
- **`retour-mendel`** · ce que ça a changé : Sutton (1902-1903) voit dans les paires d'homologues qui se
  séparent « the physical basis of the Mendelian law of heredity » [V] ; un parent A//a donne ½ A et
  ½ a : c'est la loi des croisements de la prochaine leçon. **Q** « Un parent A//a produit des gamètes…
  » ✓ ½ A et ½ a. ✗ ¼ A, ¼ a, ½ Aa : un gamète ne porte jamais les deux allèles d'une paire → un
  chromosome de chaque paire. ✗ tous A, si A est dominant : la dominance concerne l'individu, pas la
  méiose.

### Partie 9 : Au bac (scène `bac`) — voir §6

`bac-doc`, `bac-phases`, `bac-courbe`, `bac-copie`, `bac-2`, `bac-2-suite`, `bac-erreur`.

### Partie 10 : Bilan (scènes `quiz`, `end`)

- **`q1`** · haploïde et chromatides · **Q** « Une cellule haploïde peut-elle avoir des chromosomes à
  deux chromatides ? » ✓ oui, en métaphase II. ✗ non, haploïde veut dire une chromatide (bible T1) →
  haploïde compte les chromosomes (un de chaque paire), pas les chromatides. ✗ oui, mais seulement en
  prophase I : en prophase I, la cellule est diploïde.
- **`q2`** · la loi 2ⁿ · **Q** « Une espèce à 2n = 10 : combien de types de gamètes, sans
  crossing-over ? » ✓ 32 (2⁵). ✗ 10 : 2 × 5 (ou 2n) → chaque paire double le nombre. ✗ 25 : 5² → 2
  choix par paire, 5 fois.
- **`q3`** · le crossing-over · **Q** « Le crossing-over se produit entre… » ✓ deux chromatides non
  sœurs de deux homologues. ✗ deux chromatides sœurs : elles sont identiques, l'échange ne changerait
  rien. ✗ deux chromosomes non homologues : ils ne s'apparient pas.
- **`fin`** · scène `end` (cinq lignes : 2n et n, les paires d'homologues ; division I réductionnelle,
  division II équationnelle ; 2q → 4q → 2q → q ; 2ⁿ et le crossing-over ; la fécondation rétablit 2n et
  multiplie les combinaisons) · la fin de séance (forme de `finHTML` du pilote expression) : « Vérifie »
  réussies, les paris `ascaris`, `quelle-moitie`, `metaphase1`, `deux-paires` rappelés, le lien vers les
  exercices, la suite annoncée (T2 puis T3 ; en filière SVT, T5 pour les erreurs de méiose), et le
  renvoi piège par piège (B7) : haploïde et chromatides → gabarit 2 ; 2ⁿ → gabarit 5 ; crossing-over →
  gabarit 8.

---

## 4. La pause et le rappel (A8)

La pause est proposée à la frontière des parties 4 et 5, dans le texte de l'étape **`rappel`**,
27ᵉ étape sur 58 (47 %, dans la fourchette 30 % à 70 %). Sa question « Vérifie » : **drosophile, 2n = 8 :
en métaphase II, chaque cellule contient… ?** (✓ 4 chromosomes à deux chromatides ; leurres « 8
chromosomes » et « 4 chromosomes à une chromatide », ci-dessus). Elle mêle la réduction (partie 3) et
l'état des chromatides (partie 4).

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari, « Vérifie » ni question est de 2
(`sav-chromatides`, `sav-adn` ; `homologues` seule ; `appariement` seule ; `quatre-cellules` seule ;
`alleles` puis `orientation` (M) ; `echange` seule ; `deux-brassages` seule ; `cycle` seule). Les
manipulations `orientation` et `schema-phases` comptent comme étapes sans pari : la plus longue suite
reste 2. A6 : aucune option « je ne sais pas ».

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Les six de la fiche bible T1 d'abord, puis celles de G1 qui servent ici, puis celles ajoutées par ce plan.

| Conception | Source | Étapes |
|---|---|---|
| « La méiose, c'est deux mitoses » (la division I n'est pas vue comme réductionnelle) | bible T1 | `metaphase1`, `anaphase1`, `telophase1` |
| « Homologues = chromatides sœurs » | bible T1 | `homo-soeurs`, `chiasma`, `q3` |
| « La réduction a lieu à la deuxième division » | bible T1 | `ou-reduction`, `courbe`, `retour-moitie` |
| « Une cellule haploïde a des chromosomes à une seule chromatide » | bible T1 | `telophase1`, `metaphase2`, `rappel`, `q1`, `bac-erreur` |
| « Les gamètes d'une même personne sont identiques » | bible T1 | `quelle-moitie`, `deux-paires`, `humain-2-23`, `retour-freres` |
| Quantités d'ADN : une cellule 2n en G2 = 4q si le gamète vaut q (piège de copie) | bible T1 | `interphase`, `courbe`, `bac-courbe` |
| « Un chromosome a toujours la forme d'un X » | bible G1 | `v-savoir` |
| « Chromatide et chromosome, c'est pareil » | bible G1 | `v-savoir`, `tetrade`, `metaphase2` |
| 2n et quantité d'ADN confondus | bible G1 | `interphase` |
| « Le crossing-over se fait entre chromatides sœurs » | bible T1 (le pari proposé) | `chiasma`, `q3` |
| « Après un crossing-over, les 4 gamètes sont recombinés » | bible T1 (représentation) | `recombines` |
| « Le crossing-over a lieu en division II, ou en mitose » | QCM PC 2024 R, SM-A 2026 (verification-svt §5-6) | `quand-co` |
| La fécondation réunit sans additionner (n + n = n) | ajouté ici | `doublement`, `fecondation`, `v-cycle` |
| Un gamète porte 23 paires (ou 46 chromosomes) | ajouté ici | `humain`, `v-haploide`, `caryotype` |
| La paire XY reste ensemble dans le gamète ; 46 divisé au lieu de 44 | ajouté ici (forme des formules, bible T5) | `gonosomes` |
| Une seule cellule donne tous les types de gamètes | ajouté ici | `une-cellule` |
| Les chromosomes d'un même parent restent ensemble dans le gamète | ajouté ici | `quelle-moitie`, `deux-paires` |
| Le nombre de combinaisons s'additionne (2 × n, et 2ⁿ + 2ⁿ à la fécondation) | ajouté ici | `trois-paires`, `humain-2-23`, `hasard-fec`, `q2`, `bac-2-suite` |
| Le brassage crée de nouveaux allèles (confusion avec la mutation) | ajouté ici | `v-inter` |
| Un gamète peut porter les deux allèles d'une paire ; la dominance agit sur la méiose | ajouté ici (inventaire de `transmission-caracteres`, « pureté des gamètes ») | `retour-mendel` |

---

## 6. Au bac (B6)

**Aucun sujet de SVT n'est dans `docs/sujets/`** (le dépôt n'y a que maths, PC et philosophie). Les
seules formes vérifiées pour la méiose sont des lignes de Partie I relevées dans
`docs/bible/sources/verification-svt.md` (PC 2024 R ; SM-A 2024 N ; SM-A 2026 N, QCM « anaphase II »,
« métaphase équationnelle », « crossing-over en division réductionnelle »), **sans énoncé complet ni
barème par question**. Il n'y a donc pas d'exemple tiré d'un vrai sujet : les deux exemples ci-dessous
sont des **exercices types**, écrits comme tels à l'écran (« exercice type »), et **tout point est
« indicatif »** (B6). La forme suit la méthode des sujets (bible §2 : exploiter un document, puis
déduire) et le découpage au quart de point des corrigés 2026 (bible §2.2). **À faire avant la mise en
ligne** : retrouver un exercice de Partie II sur la méiose (filière SVT ou PC, 2016-2026) et remplacer
l'exemple commenté s'il en existe un (§8, question 2).

**L'exemple commenté** (exercice type ; animal à 2n = 4, la cellule de la figure) — document 1 : la
courbe de la quantité d'ADN par cellule pendant la formation des gamètes (2q, 4q, 2q, q) ; document 2 :
trois cellules a (paires de part et d'autre de la plaque, chromosomes à deux chromatides), b (2
chromosomes à une chromatide vers chaque pôle), c (2 chromosomes à deux chromatides alignés un par un).
Questions : 1. nommer la phase de chaque cellule en justifiant (0,75 indicatif) ; 2. situer a, b, c sur
la courbe (0,75 indicatif) ; 3. montrer que la méiose produit des gamètes haploïdes et génétiquement
différents (1 indicatif).

- **`bac-doc`** · scène `bac`, `doc:1` · « Premier geste ? » · **P** (forme décidée pour
  l'exponentielle, §9.6 : retours sans `ok`, `reveal`). Options : « Pour chaque cellule, compter les
  chromosomes, voir s'ils sont par paires, et s'ils ont deux chromatides » (le bon réflexe : trois
  observations décident de la phase) ; « Réciter les phases de la méiose » (bible §2.4 : réciter le
  cours au lieu d'exploiter le document) ; « Lire d'abord la courbe » (la courbe ne distingue pas les
  phases d'une même division ; les cellules, si). `reveal` : `e1:1`, une grille sous chaque cellule :
  nombre, paires, chromatides.
- **`bac-phases`** · **D** · lignes : a : 4 chromosomes, par paires de part et d'autre de la plaque, à
  deux chromatides (r : seule la métaphase I place des paires) → métaphase I ; b : 2 chromosomes à une
  chromatide vers chaque pôle, aucune paire (r : on sépare des chromatides dans une cellule haploïde) →
  anaphase II ; c : 2 chromosomes à deux chromatides, alignés un par un (r : haploïde et
  bichromatidienne) → métaphase II. (0,25 indicatif par cellule.)
- **`bac-courbe`** · `e2:1` · **Q** « Sur la courbe, où placer la cellule c ? » ✓ sur le palier à 2q,
  entre les deux chutes. ✗ sur le palier à q : croire que haploïde vaut q → ses chromatides ne sont pas
  encore séparées. ✗ sur le palier à 4q : 4q, c'est avant la division I, quand la cellule a encore ses
  paires.
- **`bac-copie`** · `html` (forme de `bac-redaction` du pilote expression), la rédaction attendue de la
  question 3 en quatre lignes : la division I sépare les homologues (2n → n) ; la division II sépare
  les chromatides (n → n, q) ; l'orientation de chaque paire en métaphase I est due au hasard : 2² = 4
  types de gamètes ; un crossing-over en prophase I en ajoute. Barème : « indicatif », 0,25 par ligne.
  Pas d'action.

**Le second exemple, que l'élève complète** (exercice type) — une cellule d'un animal à 2n = 6, dessinée
en anaphase : 3 chromosomes à deux chromatides vers chaque pôle.

- **`bac-2`** · **Q** « La première ligne de la copie ? » ✓ « Anaphase I : 3 chromosomes à deux
  chromatides vers chaque pôle, les homologues se séparent. » ✗ « Anaphase II, car des chromosomes se
  séparent » : en anaphase II, ce sont des chromatides qui partent, une seule par chromosome → ici,
  chaque chromosome a encore ses deux chromatides. ✗ « Anaphase de mitose » : en mitose, chaque pôle
  recevrait 6 chromosomes à une chromatide.
- **`bac-2-suite`** · **Q** « La deuxième ligne : combien de types de gamètes cet animal produit-il,
  sans crossing-over ? » ✓ 2³ = 8. ✗ 6 : additionner, ou prendre 2n → 2 choix par paire, 3 fois. ✗ 9 :
  3² → l'exposant est le nombre de paires. (B3 : 6, 8 et 9 sont trois nombres distincts.)

**La copie fautive** — sur la cellule c de l'exemple commenté :

- **`bac-erreur`** · **V** « Une copie écrit : "c a des chromosomes à deux chromatides, donc elle est
  diploïde : c'est une métaphase de mitose." Où est l'erreur ? » ✓ deux chromatides ne font pas
  diploïde : c n'a aucune paire, elle est haploïde (métaphase II). ✗ c'est bien une mitose, mais il
  fallait dire prophase : les chromosomes sont alignés sur la plaque, c'est une métaphase. ✗ l'erreur
  est de compter les chromatides : compter les chromatides est utile, c'est la conclusion « diploïde »
  qui est fausse. Aucune phrase sur ce que « le correcteur » fait.

---

## 7. Les exercices générés (`components/pilote/exercices/meiose.js`)

Format de `expression-genetique.js` et `exponentielle.js` : réponse calculée, chaque leurre porte `fb`
et `erreur` (le nom de la conception, celui du §5). **Règle commune aux tirages** : le gabarit rejette
tout tirage où deux options ont la même valeur (cas 2ⁿ = 2n = n² pour n = 2, 2ⁿ = n² pour n = 4,
2ⁿ = 2 × n pour n = 1 et 2). Espèces admises (2n, gonosomes) : *Ascaris* de la leçon (4), drosophile
(8, XX / XY), Homme (46, XX / XY) ; **à vérifier** avant d'en ajouter : pois (14), maïs (20), une
espèce ZW. Les nombres de chromosomes autres que l'Homme (46, [V] Tjio-Levan, bible T5) et l'*Ascaris*
(4, [V] §8) sont **à vérifier** sur une source citable avant la mise en ligne.

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `meiose-phase` | 1 | 2n ∈ {4, 6, 8} ; une cellule dessinée à une phase tirée parmi 8 (prophase I à télophase II, plus métaphase et anaphase de mitose comme intrus) ; nommer la phase | `svt-svt 3.1.1`, `svt-pc 2.3.1` | « deux mitoses » (métaphase I lue comme métaphase de mitose) ; anaphase I et II confondues ; haploïde lu comme diploïde (chromatides comptées) |
| 2 | `meiose-comptes` | 2 | 2n ∈ {4, 6, 8, 46} ; phase tirée ; donner nombre de chromosomes, de chromatides, quantité d'ADN (q = gamète) | `svt-svt 3.1.1`, `svt-pc 2.3.1` | haploïde = une chromatide ; quantité d'ADN qui suit le nombre de chromosomes ; tétrades comptées comme chromosomes |
| 3 | `meiose-courbe` | 2 | une courbe d'ADN (avec ou sans fécondation), unité tirée (q ou valeurs en UA, 2 à 20 pg **à vérifier** : rester en q si pas de source) ; un segment surligné : le nommer, ou placer une cellule décrite | `svt-svt 3.1.1`, `svt-svt 3.1.3`, `svt-pc 2.3.1`, `svt-pc 2.3.3` | réduction placée à la division II ; phase S confondue avec une chute ; fécondation oubliée |
| 4 | `caryotype-formule` | 1 | espèce tirée (liste ci-dessus) ; sexe tiré ; écrire 2n, n, la formule de la cellule et celle des gamètes | `svt-svt 3.1.2`, `svt-pc 2.3.2` | 2n pris pour le nombre de paires ; XY gardés ensemble dans le gamète ; 2n/2 calculé sur le total au lieu des autosomes |
| 5 | `gametes-2n` | 2 | n ∈ {3, 5, 6, 7, 8, 23} (jamais 1, 2, 4) ; nombre de types de gamètes sans crossing-over | `svt-svt 3.1.3`, `svt-pc 2.3.3` | 2 × n (addition) ; n² ; 2n |
| 6 | `gametes-genotype` | 2 | k gènes, chacun sur une paire différente, k ∈ {2, 3, 4}, h hétérozygotes tirés, 1 ≤ h ≤ k, au moins un homozygote si k ≥ 3 ; lister ou compter les types de gamètes | `svt-svt 3.1.3`, `svt-pc 2.3.3`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | 2ᵏ au lieu de 2ʰ (homozygotes comptés) ; gamète à deux allèles d'un même gène ; « une cellule donne tous les types » |
| 7 | `anaphase-alleles` | 2 | une cellule 2n = 4 en anaphase I ou II, allèles A/a et B/b, orientation tirée ; écrire les génotypes des cellules filles | `svt-svt 3.1.4`, `svt-pc 2.3.4`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | chromatides séparées en anaphase I ; homologues séparés en anaphase II ; les deux chromosomes paternels toujours ensemble |
| 8 | `crossing-over` | 2 | deux gènes A/a, D/d sur la même paire, phase AD//ad ou Ad//aD (tirée) ; un crossing-over entre eux ou en dehors (tiré) ; quels gamètes sont recombinés ? | `svt-svt 3.1.3`, `svt-pc 2.3.3`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | échange entre chromatides sœurs ; 4 recombinés sur 4 ; « recombiné = phénotype nouveau » quand la phase est Ad//aD (bible T3) ; crossing-over hors intervalle compté |
| 9 | `fecondation-combinaisons` | 2 | n ∈ {3, 5, 6, 23} ; combinaisons pour un couple (2ⁿ × 2ⁿ), ou probabilité qu'un parent transmette deux fois la même combinaison (1/2ⁿ) | `svt-svt 3.1.3`, `svt-pc 2.3.3` | 2 × 2ⁿ (addition) ; 2ⁿ (la fécondation n'ajoute rien) ; 1/2 ou 1/n |
| 10 | `cycle-caryotype` | 1 | espèce tirée ; un gamète ou un zygote décrit ; nombre de chromosomes de l'autre ; ce qui se passerait sans méiose (2n → 4n) | `svt-svt 3.1.3`, `svt-pc 2.3.3` | n + n = n ; 23 paires dans le gamète ; fécondation qui partage |
| 11 | `brassage-identifier` | 3 | un parent et ses gamètes donnés (tableau) ; gènes sur deux paires, ou sur une seule ; dire quel brassage explique chaque type nouveau | `svt-svt 3.1.3`, `svt-pc 2.3.3`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | inter et intra confondus ; « mutation » pour une combinaison nouvelle ; tout type nouveau attribué au crossing-over |
| 12 | `meiose-document` | 3 | l'exercice type du §6, 2n ∈ {4, 6}, trois cellules tirées, courbe avec ou sans fécondation ; marqué « exercice type », barème « indicatif » | `svt-svt 3.1.1`, `svt-svt 3.1.3`, `svt-pc 2.3.1`, `svt-pc 2.3.3` | réciter au lieu d'exploiter (bible §2.4) ; haploïde = q ; phase sans justification |

B7 : aucun gabarit ne teste la distance entre gènes (`3.2.4`), un croisement, ni une anomalie de nombre.
Le gabarit 8 s'arrête aux gamètes (T3 fera les descendants et les pourcentages).

---

## 8. À vérifier, et questions pour le relecteur

**Histoire (≤ 3 places).**
1. **Van Beneden, 1883** (ouverture `ascaris`, `doublement` ; retour `retour-moitie`). [V] Florkin,
   *Complete Dictionary of Scientific Biography*, notice « Beneden, Edouard Van »
   ([Encyclopedia.com](https://www.encyclopedia.com/science/dictionaries-thesauruses-pictures-and-press-releases/beneden-edouard-van)) :
   travaux sur *Ascaris megalocephala* dont le premier est publié en 1883 ; dans la variété *bivalens*,
   « two chromosomes in each of the pronuclei, and of four in the zygote » ; la variété *univalens* n'a
   que deux chromosomes. [V] Université de Liège, « Meiosis: divide and multiply »
   ([uliege.be](https://www.uliege.be/cms/c_9853164/en/s.gif)) : Liège, *Ascaris* « ver parasite du
   cheval », livre de 1883, les deux pronoyaux « ne fusionnent jamais » ; le mot méiose date de 1905
   (Farmer et Moore, [V] [Meiosis](https://en.wikipedia.org/wiki/Meiosis)). **À vérifier** : que l'œuf
   fécondé de *bivalens* a bien 4 chromosomes **et** que les cellules du ver en ont 4 (la notice parle
   du zygote) ; ne pas montrer à l'élève le fait que les pronoyaux ne fusionnent pas (vrai chez
   l'*Ascaris*, faux en général pour l'image « deux noyaux qui s'unissent » : la scène montre les deux
   lots réunis dans la cellule-œuf, sans dire « fusion des noyaux »).
2. **Sutton, 1902-1903** (`orientation`, `retour-mendel`). [V] [Boveri–Sutton](https://en.wikipedia.org/wiki/Boveri%E2%80%93Sutton_chromosome_theory) :
   chez la sauterelle (*Brachystola magna*, titre de l'article de 1902), paires de chromosomes maternels
   et paternels qui se séparent à la méiose et « may constitute the physical basis of the Mendelian law
   of heredity ». [S] « The chromosomes in heredity », *Biological Bulletin* 4 (1903) : 231-251, d'après
   un texte numérisé dont la reconnaissance de caractères est fautive : la position de chaque bivalent
   sur la plaque y est « purely a matter of chance », et le nombre de combinaisons y est donné par une
   formule en 2ⁿ. **À vérifier sur le scan original** avant de citer la phrase ; d'ici là, le texte de
   l'étape dit « Sutton parie que l'orientation de chaque paire est due au hasard », sans guillemets.
   Pas de nombre de paires pour *Brachystola* (non vérifié).
3. **Janssens, 1909** (`chiasma`). [V] [Chromosomal crossover](https://en.wikipedia.org/wiki/Chromosomal_crossover) :
   il décrit le phénomène en 1909 et l'appelle « chiasmatypie » ; Morgan en fait la théorie (citation de
   1912 sur la page) ; la preuve physique est de Creighton et McClintock, 1931. **Facultatif** dans le
   fil : le tag `1909 · Janssens` sert le pari (« entre quelles chromatides ? »), sinon il part en fiche
   `chiasma`.
- Écartée, à vérifier si on la veut : **Eleanor Carothers (1913)**, première preuve physique que des
  homologues de taille inégale se répartissent indépendamment du chromosome sexuel chez une sauterelle
  ([S] Wikipédia ; article *Journal of Morphology* 24, 1913, non lu). Un pari historique possible pour
  `deux-paires` (« le petit homologue suit-il le X dans 0 %, 50 % ou 100 % des cellules ? »), mais le
  chiffre n'a pas été trouvé dans l'article de 1913 lui-même (un 48,7 % vient d'un extrait d'un article
  ultérieur, non identifié avec certitude). Ne pas l'utiliser tant que ce n'est pas lu.

**Exactitude.**
- Toutes les valeurs (2²³ = 8 388 608 ; 2²³ × 2²³ ≈ 7,04 × 10¹³ ; 2 × 2²³ ≈ 1,68 × 10⁷ ; 1/2²³ ;
  comptes de chromosomes, chromatides et q par phase) sont à produire par `meiose-outils.js`, aucune
  écrite à la main ; les arrondis affichés (« 8,4 millions », « 7,0 × 10¹³ ») aussi.
- Homme 2n = 46, 44 autosomes + XX ou XY : [V] Tjio et Levan (bible T5) ; n = 23 :
  [V] [Meiosis](https://en.wikipedia.org/wiki/Meiosis). Drosophile 2n = 8 (dont XX / XY) : [S], **à
  sourcer** avant la mise en ligne.
- La convention de quantité d'ADN (gamète = q) : d'après la bible T1 et un QCM SM-A 2024 ; **à vérifier**
  sur un sujet de filière SVT ou PC (certains manuels notent Q pour la cellule en G1).
- Le crossing-over « en prophase I, entre chromatides non sœurs » : [V] [Meiosis](https://en.wikipedia.org/wiki/Meiosis),
  [Chromosomal crossover](https://en.wikipedia.org/wiki/Chromosomal_crossover) ; et c'est la forme du QCM
  PC 2024 R (verification-svt §5).
- « Deux frères ne sont presque jamais identiques, sauf les vrais jumeaux » : formulation de la bible T1
  (Pour aller plus loin) ; le calcul 1/2²³ est fait sans crossing-over et le dit.
- Le vocabulaire « division réductionnelle », « division équationnelle », « tétrade », « bivalent » :
  celui de la bible T1 et des QCM cités ; **à vérifier** que « bivalent » et « tétrade » sont tous deux
  employés par les sujets marocains (sinon n'en garder qu'un, l'autre en fiche).

**Pour le relecteur.**
1. **La notion choisie** : la méiose (commune SVT et PC) plutôt que le génie génétique (SVT seul), qui
   suit pourtant l'expression dans le cadre de la filière SVT. Le génie génétique fait-il la leçon
   suivante, pour la seule filière SVT ?
2. **Aucun vrai sujet** pour l'exemple du bac : les deux exemples sont des exercices types, barème
   « indicatif ». Faut-il bloquer l'écriture de la partie 9 jusqu'à ce qu'un sujet soit trouvé et versé
   dans `docs/sujets/` (un dossier `svt/` à créer) ?
3. **Convention q / 2q / 4q** (gamète = q) contre q → 2q → q (fiche G1) : laquelle pour toutes les
   leçons de génétique ?
4. **Scène nouvelle `meiose`** (une seule) : à accorder. Elle porte trois modes (division, caryotype,
   fécondation) ; faut-il en faire trois scènes ?
5. **« Premier geste » au bac** : pari de prédiction (décision de l'exponentielle, §9.6) ou question à
   bonne réponse (choix du pilote expression, `bac-doc`) ? Les deux pilotes divergent ; ce plan suit
   l'exponentielle.
6. **SM-A** : la leçon sert aussi `svt-sma 1.1.1`, `1.1.2`, `1.1.4`, mais pas les cycles de
   développement (`1.1.3`, `1.1.5` en partie). Une partie SM-A en plus (la « roue du cycle » de la bible,
   *Allomyces* 2026), ou une leçon à part ?
7. **Les anomalies de nombre** (non-disjonction, T5) sont la suite naturelle de `ou-reduction` ; elles
   sont hors cadre PC. Les laisser à T5 (proposé), ou une étape d'enrichissement marquée, filière SVT ?
8. Le contrôle `ctl:'orient'` demande que le noyau sache verrouiller « Suivant » tant que `need` n'est
   pas atteint et rejouer une animation à la demande : le pilote expression le fait pour `ribo`
   (`tweenK`) ; même mécanisme à copier, sans toucher `noyau.js`.

## 9. Décisions du relecteur (2026-11-23)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **La notion** : la méiose, la fécondation et les brassages, commune aux filières SVT et PC. Le
   génie génétique fera une leçon à part, filière SVT seule.
2. **Au bac** : l'écriture n'attend pas. Les deux exemples sont des exercices types, dits tels à
   l'écran, barème « indicatif ». Un vrai sujet vérifié remplacera le premier dès qu'il sera versé
   dans le dossier des sujets de SVT (recherche lancée à part) ; la leçon n'est pas montrée aux élèves avant.
3. **Quantité d'ADN** : le gamète vaut q (2q → 4q → 2q → q), partout. La future leçon sur le cycle
   cellulaire s'aligne sur cette convention.
4. **Scène `meiose`** : accordée, une seule scène à trois modes. L'auteur la construit d'abord, seule,
   et regarde ses captures (ordinateur et 390 px) avant d'écrire les étapes.
5. **« Premier geste » au bac** : un pari de prédiction, comme dans l'exponentielle et le logarithme.
6. **SM-A** : pas de partie propre. La leçon est déclarée pour SVT et PC ; les cycles de développement
   de la SM-A feront une leçon à part.
7. **Anomalies de nombre** : laissées à leur notion. Aucune étape ici.
8. **Contrôle `orient`** : oui, avec `need` et « Montre-moi », sur le modèle du curseur de
   l'exponentielle ; `noyau.js` ne se modifie pas.
9. **Faits non vérifiés** : Van Beneden, on ne parle que de l'œuf (4 chromosomes, 2 par noyau), jamais
   des cellules du ver. Sutton, aucune citation entre guillemets à l'écran : « Sutton, 1903 » et l'idée
   suffisent. Drosophile 2n = 8 : gardé, source à inscrire en tête du fichier d'outils. « Tétrade » et
   « bivalent » : une fiche de mot chacun, la leçon dit « tétrade ». Génotypes à deux gènes
   indépendants : A//a B//b, à confirmer sur un vrai sujet avant la mise en ligne.
