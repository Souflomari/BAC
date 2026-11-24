# Spec v3 : les lois statistiques de la transmission des caractères (`svt/transmission-caracteres`)

> **Le nom et le périmètre, d'après les documents.** Le nom officiel est le même dans les deux cadres :
> « Les lois statistiques de la transmission des caractères héréditaires chez les diploïdes. »
> (`svt-svt 3.2`, C-S1 p. 12 ; `svt-pc 2.4`, C-S2 p. 11). Les quatre capacités ont **le même libellé**
> dans les deux filières (§1.1). Ce que les documents ajoutent à la description de la commande :
> **le gène létal, la codominance et l'hérédité liée au sexe** sont au cadre (connaissances et
> capacité `3.2.1` / `2.4.1`) ; **la carte factorielle aussi** (`3.2.4` / `2.4.4`). La bible coupe le
> sous-domaine en deux fiches, T2 (un gène, létal, codominance, lié au sexe, deux gènes indépendants)
> et T3 (gènes liés, crossing-over, carte), et le plan de la méiose (§1.2) annonçait deux leçons.
> **Ce plan fait une leçon, et en laisse une deuxième** : il garde tout ce qui est commun aux deux filières et
> vu aux quatre sujets transcrits (dominance, test-cross, gène létal, gènes indépendants, gènes liés,
> distance, carte), et il laisse **l'hérédité liée au sexe et la codominance** à une leçon suivante
> (§1.3, §8 question 1). La capacité `3.2.1` / `2.4.1` est donc couverte **en partie** (le gène non lié
> au sexe).
>
> **Ce qui est propre à chaque filière.** Rien, dans cette leçon. Les capacités sont identiques. Les
> écarts sont dans la colonne « Connaissances » : la filière SVT écrit « Dominance et codominance et
> gène létal ; » et « Gènes indépendants, gènes liés ; » ; la filière PC écrit « Dominance et
> codominance ; », « Le gène létal ; » sur deux lignes, et **n'a pas** de ligne « Gènes indépendants,
> gènes liés » (sa capacité `2.4.2` les cite pourtant ; `svt-pc.yaml`, notes de lecture : « lecture à
> confirmer sur un meilleur scan »). Les poids diffèrent (génétique 45-50 % en SVT, domaine 2 à 25 % en
> PC). **Aucune partie n'est réservée à une filière** : pas de ligne « ce n'est pas à ton programme »,
> pas de bouton « passer ». La SM-A a les mêmes capacités (`svt-sma 1.2.1` à `1.2.4`) ; comme pour la
> méiose (spec méiose §9.6), la leçon est déclarée pour SVT et PC.
>
> Plan d'auteur pour la leçon pilote `/pilote/transmission`, suite de `/pilote/meiose`. Règles :
> [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèle de ton et de rythme :
> `web/src/components/pilote/meiose-moteur.js`. Fiches : bible T2 et T3 (`docs/bible/04-svt.md`).
> Sujets : `docs/sujets/svt/meiose-fecondation-brassages.md` (quatre exercices de Partie II, statut
> « transcrit, à vérifier » : **la leçon ne sera montrée aux élèves qu'après leur vérification**).
> L'auteur suit ce plan étape par étape ; il rédige les textes, il ne décide ni l'ordre, ni les
> paris, ni les leurres. Tout nombre cité ici est à **recalculer par le code**
> (`transmission-outils.js` : fractions des échiquiers, rapports, pourcentages, distances).
>
> **Scène d'un type nouveau demandée : une seule, `echiquier`** (§3.2). Justification : les quatre
> exercices transcrits demandent tous « à l'aide d'un échiquier de croisement » (2022 N Q3, 2024 R
> Q2, 2024 N Q1 et Q3, PC 2024 R Q3.b), et les corrigés officiels lui donnent 0,5 pt à chaque fois ;
> aucune scène existante ne dessine une grille à deux entrées (`table` est une liste à une colonne,
> `bac` montre des documents) ; la bible (T2, Représentations) en fait la représentation « commune à
> toute la génétique », réutilisable par la génétique humaine et Hardy-Weinberg. Décision du
> propriétaire (07 §3, point 3). La scène `meiose` est **réutilisée**, avec un paramètre de plus (les
> noms des allèles, §3.2 et §8 question 3) ; `carte` est une copie adaptée de `rule`.

---

## 0. La leçon livrée (état au 2026-11-24)

Ce plan a été écrit avant la leçon. La leçon livrée (`web/src/components/pilote/transmission-moteur.js`) compte **53 étapes** : la relecture pédagogique et visuelle du 2026-11-24 en a fusionné, retiré ou déplacé plusieurs. **Le fichier de la leçon fait foi** ; les sections 1 à 8 ci-dessous restent le plan d'origine (raisons, sources, leurres), avec ses comptes d'étapes d'alors. L'ordre livré :

| # | Partie | Étapes (clés, dans l'ordre) |
|---|---|---|
| 0 | Ce qu’il faut savoir | `sav-notation`, `sav-lignee`, `v-savoir` |
| 1 | L’énigme | `mendel`, `f2`, `ratio` |
| 2 | Un caractère | `dominance`, `echiquier`, `derniere-case`, `rapports`, `lisses-purs`, `produit` |
| 3 | Le test-cross | `testeur`, `deux-hypotheses`, `v-testcross` |
| 4 | Un rapport inattendu | `jaunes`, `deux-pour-un`, `letal-calc` |
| 5 | Deux gènes, deux paires | `deux-genes`, `orientation`, `tc-indep`, `f2-16`, `retour-556`, `demarche`, `demarche-ecrire` |
| 6 | Le test-cross des souris | `rappel`, `souris-f1`, `absolu-tc`, `absolu-f2`, `vrai-tc`, `quatre-classes`, `crossing-over`, `deux-sur-quatre`, `pourcentage`, `parentaux-recombines`, `cinquante` |
| 7 | La distance et la carte | `double`, `centimorgan`, `total`, `trois-genes`, `v-carte` |
| 8 | Au bac | `bac-doc`, `bac-q1`, `bac-q2`, `bac-gametes`, `bac-erreur`, `bac-2`, `bac-2-cases`, `bac-2-suite` |
| 9 | Bilan | `q1`, `q2`, `q3`, `fin` |

## 1. Périmètre

### 1.1 Capacités officielles couvertes

| Filière | Id | Libellé (cadre 2025, mot pour mot) | Où |
|---|---|---|---|
| SVT | `svt-svt 3.2.1` | Analyser et interpréter les résultats de la transmission d'un couple d'allèles à partir de l'étude d'un exemple précis (cas d'un gène lié au sexe et cas d'un gène non lié au sexe) ; | **en partie** : le gène non lié au sexe (parties 1 à 4) ; le gène lié au sexe va à la leçon suivante |
| PC | `svt-pc 2.4.1` | (même libellé) | idem |
| SVT | `svt-svt 3.2.2` | Analyser et interpréter les résultats de la transmission de deux couples d'allèles à partir de l'étude d'un exemple précis (cas de deux gènes indépendants et cas de deux gènes liés) ; | parties 5, 6, 8, 9 |
| PC | `svt-pc 2.4.2` | (même libellé) | idem |
| SVT | `svt-svt 3.2.3` | Schématiser le brassage interchromosomique et le brassage intrachromosomique, selon l'exemple étudié ; | parties 5 (`orientation`), 6 (`crossing-over`), 9 |
| PC | `svt-pc 2.4.3` | (même libellé) | idem |
| SVT | `svt-svt 3.2.4` | Calculer la distance entre les gènes et établir la carte factorielle. | partie 7, 9 |
| PC | `svt-pc 2.4.4` | (même libellé) | idem |

Connaissances du cadre enseignées ici (mot pour mot, `svt-svt 3.2`) : « Les lois de Mendel de la
transmission des caractères héréditaires ; », « Monohybridisme et dihybridisme ; », « Lignée pure et
lignée sauvage, l'homozygotie et l'hétérozygotie, hybridation, croisement-test (test-cross/
croisement en retour) ; », « Echiquiers de croisement ; », « Dominance et codominance et gène létal ; »
(**sans** la codominance), « Gènes indépendants, gènes liés ; », « Enjambement (crossing-over),
brassage intrachromosomique et diversité génétique ; », « La carte factorielle. ». Laissée :
« Hérédité non liée au sexe et hérédité liée au sexe ; » (seulement la moitié « non liée », étape
`reciproques`).

Capacités réutilisées, enseignées ailleurs : la méiose et les deux brassages au niveau des
chromosomes (`svt-svt 3.1.3`, `svt-pc 2.3.3`, leçon méiose, parties 5 et 6) ; gène et allèle (leçon
expression).

### 1.2 Une seule séance

**« Compter les descendants »** (60 étapes) : un caractère (dominance, première et deuxième lois,
échiquier), le test-cross, le gène létal, deux gènes sur deux paires (troisième loi, 1:1:1:1 et
9:3:3:1), deux gènes sur une même paire (linkage absolu, linkage relatif, parentaux et recombinés),
la distance et la carte factorielle, le retour à l'énigme, deux exercices du bac. La suite (annoncée
au bilan) : l'hérédité liée au sexe et la codominance (leçon à écrire), puis la génétique humaine
(`genetique-humaine`, T4).

### 1.3 Hors périmètre, qu'on n'enseigne pas

**L'hérédité liée au sexe** (X, Y, notation `X^N Y`, croisements réciproques qui diffèrent) et **la
codominance** : leçon suivante (§8 question 1) ; ici, une seule étape dit ce que donnent des
croisements réciproques pour un gène **non** lié au sexe (`reciproques`), parce que les corrigés
donnent un point à « non lié au sexe ». Le test du χ² (absent des trois cadres) ; la double
recombinaison et la fonction de cartographie (hors cadre ; la leçon dit « pour des gènes proches »
et le gabarit borne les distances) ; l'interférence ; les gènes liés au sexe chez la drosophile
(Morgan) ; la liaison totale du mâle de drosophile (bible T3, « à vérifier », non vue aux sujets).
Le mot « recombiné » désigne ici un **gamète** ou une **classe de descendants d'un test-cross**,
toujours par rapport aux chromosomes du parent hybride.

### 1.4 Filières

| | SVT | PC | SM-A |
|---|---|---|---|
| Leçon | entière | entière | utilisable (`svt-sma 1.2.1` à `1.2.4`, mêmes libellés), non déclarée |
| Poids | génétique 45-50 % (C-S1 p. 22) ; un exercice de croisements chaque année, 3 à 4,5 pts (bible T2) | domaine 2, 25 % (C-S2 p. 19) | domaine 1, 50 % |
| Sujets transcrits | 2022 N Ex. 2 (gènes liés, carte, 4,5 pts dont 3 pts de génétique) ; 2024 R Ex. 3 (linkage absolu réfuté, 3 pts) ; 2024 N Ex. 3 (gène létal, deux gènes indépendants, 3 pts) | 2024 R Ex. 2 Partie II (gène létal, gènes indépendants, test-cross, 4 pts) | aucun transcrit (bible T3 : fève 2026 N, test-cross 49/49/1/1) |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Vers 1856-1863, à Brno, Gregor Mendel croise des pois [V]. Une lignée pure
à graines **lisses** et une lignée pure à graines **ridées** donnent des graines F1 : l'élève parie
sur leur forme (`mendel`), puis la scène les montre, toutes lisses [S]. Le ridé a-t-il disparu ? Les
plantes F1 s'autofécondent ; l'élève parie sur la part de graines ridées en F2 (`f2`), puis la scène
compte : **5 474 lisses et 1 850 ridées** [S], environ 3 pour 1. **Trois questions restent ouvertes :
pourquoi le ridé revient-il ? pourquoi un quart, et pas une autre fraction ? et que se passe-t-il
quand on suit deux caractères à la fois ?**

**Le retour (partie 8).**
1. Le quart : chaque plante F1 est L//ℓ ; elle donne ℓ avec la probabilité ½ ; une graine ℓ//ℓ
   reçoit ℓ des deux côtés : ½ × ½ = ¼ (`retour-quart`, texte dépendant du pari `f2`).
2. Deux caractères : Mendel a compté 315 / 108 / 101 / 32 graines [S] (forme et couleur) ; le code
   calcule 9/16, 3/16, 3/16, 1/16 de 556 ; la classe [L, J] est la plus grande **sans** que les gènes
   soient liés (`retour-556`).
3. Ce que Mendel ne pouvait pas voir : si ses deux gènes avaient été proches sur un même chromosome,
   sa F2 aurait ressemblé à ¾ / ¼ (`retour-lies`, qui renvoie à la partie 6).

Le fil rouge : « un allèle par gamète, au hasard ; on multiplie » (partie 2) ; puis « le test-cross
montre les gamètes du parent hybride » (partie 3), qui sert jusqu'au bac.

---

## 3. La chaîne des idées

1. Ce qu'on sait (leçon méiose) : un parent A//a donne ½ A et ½ a ; génotype et phénotype ; lignée
pure → 2. l'énigme : un caractère caché en F1 revient au quart en F2 → 3. la F1 dit quel allèle
domine, et que les parents sont de lignée pure (première loi) → 4. la F1 est hybride ; ses gamètes
½ et ½, l'échiquier, ¾ et ¼ (deuxième loi : un allèle par gamète) → 5. même phénotype, deux génotypes
possibles : le test-cross les sépare, car il montre les gamètes du parent testé → 6. un rapport 2 pour
1 n'est pas une erreur : une case de l'échiquier meurt (gène létal) → 7. deux gènes sur deux paires :
quatre gamètes à ¼ (brassage interchromosomique), test-cross 1:1:1:1, F2 9:3:3:1 (troisième loi) →
la démarche du bac → 8. deux gènes sur une même paire : deux gamètes seulement (linkage absolu), ou
quatre gamètes inégaux (linkage relatif : crossing-over, brassage intrachromosomique) ; parentaux et
recombinés → 9. la part de recombinés mesure une distance (cM) ; trois distances font une carte →
10. ces outils résolvent l'énigme → 11. le bac.

**Figure-clé : l'interprétation chromosomique d'un croisement à deux gènes** (scènes `meiose` et
`echiquier` en alternance, 12 étapes, un changement chacune) : `deux-genes` (deux gènes posés sur
deux paires différentes), `orientation` (la petite paire se retourne : quatre gamètes),
`tc-indep` (l'échiquier du test-cross, 4 × 1 ; **pari 1**), `f2-16` (l'échiquier F1 × F1, 4 × 4),
`souris-f1` (les deux gènes posés sur la grande paire), `absolu-tc` (méiose sans crossing-over : deux
gamètes), `absolu-f2` (échiquier 2 × 2), `vrai-tc` (les quatre classes réelles, inégales ; **pari 2**),
`quatre-classes` (les cases prennent une aire proportionnelle à leur pourcentage), `crossing-over`
(`co` sur la grande paire : les gamètes recombinés), `parentaux-recombines` (la phase inversée,
G ℓ // g L), `pourcentage` (les deux cases recombinées surlignées, leur somme). Le troisième pari de
la figure, `double`, suit sur la scène `carte` (la distance).

**Les allèles et les symboles** (ceux des sujets, NB imprimés, §3.3) :
- pois de Mendel (parties 1, 2, 5, 8) : forme **L** (lisse) / **ℓ** (ridé) ; couleur **J** (jaune) /
  **j** (vert). Symboles choisis par ce plan (aucun sujet transcrit ne porte sur ce pois) ; le **ℓ**
  cursif est celui des sujets 2024 (NB : « L et ℓ ») ;
- souris du sujet PC 2024 R (partie 4) : couleur **G** (jaune) / **g** (gris) ;
- souris du sujet SVT 2024 R (partie 6) : couleur **G** (gris) / **g** (blanc), pelage **L** (lisse) /
  **ℓ** (crépu) ;
- drosophile du sujet 2022 N (partie 9) : **vg⁺** / **vg** (ailes), **b⁺** / **b** (corps) ;
- bovins du sujet 2024 N (partie 9) : **D** / **d** (pattes), **R** / **r** (cornes).

La même lettre G n'a pas le même sens dans les deux souris (jaune en partie 4, gris en partie 6) :
chaque étape rappelle la légende de ses symboles, comme les NB des sujets ; l'auteur ne fait jamais
voisiner les deux souris dans une même étape.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 3 |
| 1 | L'énigme | Énigme | 4 |
| 2 | Un caractère | Un gène | 8 |
| 3 | Le test-cross | Test-cross | 4 |
| 4 | Le gène létal | Létal | 4 |
| 5 | Deux gènes, deux paires | Indépendants | 6 |
| 6 | Deux gènes, une paire | Liés | 9 |
| 7 | La distance et la carte | Carte | 7 |
| 8 | Retour à l'énigme | Retour | 3 |
| 9 | Au bac | Bac | 8 |
| 10 | Bilan | Bilan | 4 |

**60 étapes.** Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`). Dans les options : ✓ juste ; ✗ fausse, suivie de la conception affrontée
puis de l'idée du retour (B2). **Contrôle B3 fait sur chaque question chiffrée** : la valeur juste et
les valeurs des leurres sont écrites à côté de chaque étape, et sont toutes distinctes. Les rapports
qui coïncident d'une règle à l'autre, et qu'aucune question ne doit opposer : ½ / ½ (test-cross d'un
gène, test-cross de deux gènes en linkage absolu, test-cross d'un double hétérozygote dont un gène
est homozygote) ; ¾ / ¼ (F2 d'un gène, F2 de deux gènes en linkage absolu en phase L J // ℓ j) ; ¼
(une classe d'un test-cross 1:1:1:1, la classe récessive d'une F2 à un gène). Aucune étape ne pose
une question dont deux de ces règles donneraient la même réponse.

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `echiquier` | **nouvelle** | voir ci-dessous (croisement P × P → F1, échiquier, cases barrées, aires) |
| `meiose` | **réutilisée** de `meiose-scenes-a.js`, avec un paramètre `lab` (noms des allèles) à ajouter | les allèles sur les chromosomes, l'orientation de la petite paire, le crossing-over |
| `carte` | copie adaptée de `rule` (`logarithme-moteur.js`) | un chromosome en règle graduée en cM, des loci, un curseur ; le pourcentage de recombinés calculé |
| `bac` | copie adaptée de `bac` (`meiose-scenes-c.js`) | l'énoncé (NB des symboles), le document 1 de 2022 N redessiné, les résultats, les lignes de copie |
| `quiz`, `end` | copies de `meiose-scenes-c.js` | les trois pièges ; le bilan |

**Scène nouvelle `echiquier`** (décision du propriétaire, 07 §3.3).
- Montre, selon le mode :
  - `crx` : le schéma de croisement des sujets, sur trois lignes : « Parents : [L] × [ℓ] »,
    « Génotypes : … », puis la génération obtenue (F1, F2 ou F'₂) en effectifs. Pour le pois, une
    graine est un petit contour (lisse : un cercle ; ridée : un contour ondulé) ; la couleur des
    graines est **écrite** (« jaune », « verte »), jamais peinte : aucune couleur en dur, et aucun
    texte ne renvoie à une couleur de la scène ;
  - `grille` : l'échiquier à deux entrées, gamètes d'un parent en colonne, de l'autre en ligne, avec
    leur proportion (« ½ L/ », « 40,5 % vg⁺ b⁺ ») ; chaque case : génotype puis phénotype entre
    crochets, et sa fraction. Taille 1 × 1 à 4 × 4 ;
- Paramètres : `g1`, `g2` (listes de gamètes et proportions, fournies par l'étape, calculées par
  `transmission-outils.js`) ; `fill` (nombre de cases remplies, ou toutes) ; `phe` (phénotypes
  affichés) ; `cls` (une classe de phénotype surlignée, en `k-a`) ; `bar` (cases barrées d'une croix,
  forme des corrigés 2024 N et PC 2024 R pour les homozygotes létaux) ; `aire` (0 → 1 : les lignes et
  colonnes prennent une largeur proportionnelle à la proportion du gamète : le « carré des aires » de
  la bible T2) ; `obs` (une colonne « observé » à côté des fractions attendues) ; `tot` (le compte
  par phénotype, « 9 cases sur 16 »).
- L'élève manipule : à l'étape `echiquier`, il touche chaque case pour la remplir (`ctl:'case'`,
  `need` : les 4 cases) ; à l'étape `f2-16`, il touche un phénotype de la légende pour surligner ses
  cases et lire leur nombre (`ctl:'classe'`, `need` : les 4 classes). « Montre-moi » après deux essais
  ou 20 s, comme le curseur de l'exponentielle.
- Lisibilité à 390 px : un 4 × 4 de génotypes à deux gènes (« L//ℓ J//j ») ne tient pas lisiblement ;
  à 390 px, les cases n'affichent que le phénotype (« [L, J] »), le génotype s'affiche sous la grille
  pour la case touchée. **À vérifier sur capture** avant d'écrire les étapes (même consigne que la
  scène `meiose`, spec méiose §9.4).

**Réutilisation de `meiose`.** Les allèles sont aujourd'hui écrits en dur (`CHR`, `meiose-scenes-a.js` :
A et D sur le grand chromosome paternel, a et d sur le maternel, B et b sur la petite paire). Il faut un
paramètre `lab` (par chromosome : `G1`, `G2`, `P1`, `P2`, une liste d'étiquettes, vide permis), par
défaut celui d'aujourd'hui, pour que la leçon méiose ne change pas. Le crossing-over (`co`) échange
déjà le segment qui porte la deuxième étiquette de la grande paire : avec `lab` = G L / g ℓ, il donne
G ℓ et g L sans autre changement. Le compteur de types de gamètes du contrôle `orient` lit les
étiquettes. **Décision demandée** (§8 question 3) : ajouter ce paramètre à la scène commune (les
captures de la leçon méiose sont alors à refaire), ou la copier.

**`carte`** (copie adaptée de `rule`) : un chromosome horizontal gradué de 0 à 50 cM, des loci
nommés, un curseur qu'on fait glisser (`ctl:'curseur'`, copie du curseur de l'exponentielle) ;
sous la règle, « distance = d cM → recombinés attendus : d %, soit d/2 % par classe », calculé ;
au-delà de 30 cM, la scène écrit « pour des gènes éloignés, cette règle simple ne suffit plus »
(et le curseur s'arrête à 30). Mode `trois` : trois loci à placer, trois distances affichées.

### 3.3 La notation (relevée dans les corrigés officiels transcrits)

| Objet | Écriture des corrigés | Où |
|---|---|---|
| génotype, un gène | `D//d`, `R//r`, `G//g` | 2024 N Q1-Q2 ; PC 2024 R |
| gamète, un gène | `½ D/` et `½ d/` (un trait après l'allèle) | 2024 N Q1 |
| génotype, deux gènes indépendants | `R//r D//d` ; `G//g ℓ // ℓ` (PC) | 2024 N Q3 ; PC 2024 R Q3.a ; 2024 R Q1 (« Si les deux gènes sont indépendants : G//g L//ℓ ») |
| gamète, deux gènes indépendants | `¼ R/ D/` ; `1/2 G/ ℓ /` | 2024 N Q3 ; PC 2024 R Q3.b |
| génotype, deux gènes liés | `vg⁺ b⁺ // vg b` ; `G L // g ℓ` (imprimé **en fraction**, deux traits ; rendu « // » par la transcription) | 2022 N Q2-Q3 ; 2024 R Q1-Q2 |
| gamète, deux gènes liés | `vg⁺ b⁺ (40,5%)` ; `½ G L` (sans trait dans la transcription) | 2022 N Q3 ; 2024 R Q2 |
| phénotype | `[D]`, `[vg⁺, b⁺]`, `[G, L]`, `[R, D]` (virgule) ; `[G ; L]` (point-virgule, PC) | tous |
| case létale | barrée d'une croix | 2024 N ; PC 2024 R |
| lois | « selon la 1ère loi de Mendel » (F1 homogène → parents de race pure) ; « compatibles avec la 3ème loi de Mendel » | 2022 N, 2024 R, 2024 N ; PC 2024 R |

La leçon écrit comme les corrigés : `//` pour un génotype, un trait après chaque allèle pour un
gamète de gènes indépendants, les deux allèles d'un même chromosome côte à côte pour des gènes liés,
les crochets à virgule pour un phénotype. **À vérifier** sur l'image des corrigés : la forme exacte du
gamète de gènes liés (une fraction à un trait ?) et l'écriture en fraction des génotypes liés, que la
leçon peut rendre en KaTeX (`\dfrac{G\ L}{g\ \ell}` à deux traits) ou en ligne (`G L // g ℓ`) (§8
question 4). Le nom de la « deuxième loi » n'apparaît dans aucun corrigé transcrit : la leçon dit
« deuxième loi de Mendel : la pureté des gamètes » sans en faire une ligne de copie notée.

**La mise en page de l'interprétation chromosomique** est celle des quatre corrigés : « Parents ·
Phénotypes · Génotypes · Gamètes · Échiquier de croisement · résultats ». Toute copie montrée par la
leçon (`demarche`, partie 9) la suit, ligne pour ligne.

---

### Partie 0 : Ce qu'il faut savoir (scènes `meiose`, `echiquier`)

- **`v-savoir`** · scène `meiose`, `ph:3, al:1`, `lab` : petite paire G (paternel) / g (maternel),
  grande paire sans étiquette · un test : réussi du premier coup, on passe le rappel (bouton « Passer
  à l'énigme », comme la méiose, `ctl:'saut'`). **V** « Un individu G//g, hétérozygote, produit des
  gamètes… » ✓ ½ G et ½ g. ✗ ¼ G, ¼ g et ½ Gg : croire qu'un gamète peut porter les deux allèles
  d'un gène → un gamète a un chromosome de chaque paire. ✗ tous G, puisque G domine : appliquer la
  dominance à la méiose → la dominance concerne l'individu. (Les deux conceptions sont celles de
  `retour-mendel`, leçon méiose.)
- **`sav-notation`** · scène `echiquier`, `crx:1` (une ligne : « Génotype : G//g · Phénotype : [G] »)
  · le [[genotype|génotype]] : les deux allèles d'un gène, un par chromosome de la paire, séparés par
  les deux traits ; le [[phenotype|phénotype]] : ce qu'on observe, entre crochets. Majuscule pour
  l'allèle [[dominant|dominant]], minuscule pour le [[recessif|récessif]] ; au bac, l'énoncé donne
  les symboles (« NB : Utilisez les symboles… », les quatre sujets). Pas d'action.
- **`sav-lignee`** · **Q** « Une [[lignee-pure|lignée pure]], G//G, produit des gamètes… » ✓ tous G.
  ✗ ½ G et ½ g : croire que tout individu donne deux types de gamètes → un
  [[homozygote|homozygote]] n'a qu'un allèle à donner. ✗ ¾ G et ¼ g : prendre un rapport de
  descendants pour un rapport de gamètes → ¾ et ¼ viendront d'un croisement, partie 2.

### Partie 1 : L'énigme (scène `echiquier`, mode `crx`)

- **`mendel`** · tag `1865 · Mendel` · `crx:1, gen:'P'` · de 1856 à 1863, Mendel cultive des pois ;
  il présente ses résultats à Brno en 1865 [V]. Il croise une lignée pure à graines lisses et une
  lignée pure à graines ridées. **P** « Les graines F1 seront… » options : « toutes lisses » /
  « toutes d'une forme intermédiaire, un peu ridées » / « moitié lisses, moitié ridées ». `reveal` :
  la ligne F1 s'écrit, toutes lisses [S]. Retours : celui de « intermédiaire » nomme la conception
  (« deux allèles différents donnent un intermédiaire » : il faut le lire dans les résultats, pas le
  supposer, bible T2) ; celui de « moitié » : les F1 sont toutes pareilles ; les trois donnent le
  fait.
- **`f2`** · `gen:'F2', fcnt:0` · les plantes F1 s'autofécondent. **P** « Parmi les graines F2, les
  ridées seront… » options : « absentes : le ridé a disparu en F1 » / « environ 1 sur 4 » /
  « environ 1 sur 2 ». `reveal` : `fcnt:1`, 5 474 lisses et 1 850 ridées [S]. Le retour de
  « absentes » nomme la conception (« deux parents lisses ne peuvent pas donner une graine ridée »,
  forme de la bible T2 : « deux parents gris ne peuvent pas avoir un petit blanc »).
- **`ratio`** · **Q** « 5 474 lisses pour 1 850 ridées : c'est environ… » ✓ 3 lisses pour 1 ridée,
  donc un quart de ridées. ✗ 1 ridée sur 3 graines : lire « 3 pour 1 » comme un tiers → sur 4
  graines, 3 lisses et 1 ridée. ✗ 1 ridée sur 2 : il y a trois fois plus de lisses. Indice commun :
  « Sur 4 graines, combien de ridées si le rapport est 3 pour 1 ? ». (B3 : ¼, ⅓ et ½ sont distincts ;
  l'observé, 1 850 / 7 324 ≈ 25,3 %, calculé, ne tombe que sur ¼.)
- **`deux-questions`** · la couleur des graines donne le même rapport : 6 022 jaunes, 2 001 vertes
  [S] (rapport calculé : 3,01). `fort` : « Pourquoi le ridé revient-il ? Pourquoi un quart ? Et que
  donnent deux caractères suivis ensemble ? La leçon va répondre. » Pas d'action.

### Partie 2 : Un caractère (scènes `echiquier`, `meiose`)

- **`dominance`** · `crx:1, gen:'F1'` · seul le caractère d'un parent paraît en F1 : son allèle est
  dominant (L, lisse), l'autre est récessif (ℓ, ridé), masqué. **Q** « Le génotype d'une graine F1 ? »
  ✓ L//ℓ. ✗ L//L : « même phénotype, même génotype » (bible T2) → chaque F1 a reçu ℓ du parent
  ridé. ✗ L : oublier que la cellule a deux exemplaires de chaque chromosome → deux homologues,
  deux allèles.
- **`uniformite`** · la [[premiere-loi|première loi de Mendel]] : deux lignées pures donnent une F1
  homogène. Au bac, on s'en sert à l'envers : « F1 homogène → les parents sont de race pure selon la
  1ère loi de Mendel » (corrigés 2024 R et 2024 N). **V** « Un croisement donne une F1 hétérogène. Les
  parents… » ✓ au moins l'un des deux est hétérozygote. ✗ sont de lignée pure : c'est une F1
  homogène qui le dit → deux lignées pures ne donnent qu'un type de descendant. ✗ portent tous deux
  l'allèle récessif à l'état homozygote : ils seraient de lignée pure, la F1 serait homogène. (Forme
  du corrigé PC 2024 R : « F₁ hétérogène → les parents sont hybrides (hétérozygotes) ».)
- **`reciproques`** · `crx:1`, deux schémas côte à côte, ♀ et ♂ échangés · bible T2 (« les
  croisements réciproques donnent toujours la même F1 ») · **V** « Un croisement et son réciproque
  (les sexes des parents échangés) donnent la même F1. On peut conclure que… » ✓ le gène n'est pas lié
  au sexe. ✗ rien, c'est toujours le cas : faux quand le gène est sur le chromosome X ; c'est
  justement le test, prochaine leçon. ✗ l'allèle du père domine : échanger les sexes ne change pas la
  dominance. `apres` : « Au bac, dire si un gène est lié au sexe vaut une ligne de copie (2022 N, Q1 :
  « portés par un autosome donc les deux caractères ne sont pas liés au sexe », 0,25 pt). »
- **`echiquier`** · scène `echiquier`, `grille:1`, `g1 = g2 = [½ L/, ½ ℓ/]`, `fill:0` · **M**
  `ctl:'case'`, `need` : les 4 cases · F1 × F1 : chaque parent donne ½ L/ et ½ ℓ/ (l'écriture des
  corrigés). L'[[echiquier|échiquier de croisement]] réunit chaque gamète d'un parent avec chaque
  gamète de l'autre. « Touche chaque case. » La case se remplit : génotype, phénotype, ¼.
- **`rapports`** · `fill:4, phe:1` · **Q** « Les phénotypes de la F2 ? » ✓ ¾ [L] et ¼ [ℓ]. ✗ ¼ [L],
  ½ [L//ℓ], ¼ [ℓ] : prendre le rapport des génotypes pour celui des phénotypes → L//ℓ est lisse,
  comme L//L. ✗ ½ [L] et ½ [ℓ] : c'est le rapport d'un test-cross (partie 3) → ici les deux parents
  sont hybrides. `apres` : à comparer avec 5 474 et 1 850.
- **`lisses-purs`** · `cls:'[L]'` (les trois cases lisses s'allument) · **Q** « Parmi les graines
  lisses de F2, quelle part est de lignée pure, L//L ? » ✓ 1 sur 3. ✗ toutes : « même phénotype,
  même génotype » → deux des trois cases lisses sont L//ℓ. ✗ 1 sur 4 : compter sur les 4 cases →
  la question ne porte que sur les lisses. (B3 : ⅓, 1 et ¼ distincts.)
- **`disjonction`** · scène `meiose`, `lab` : petite paire L / ℓ, `ph:3→8, gam:1` · la
  [[deuxieme-loi|deuxième loi de Mendel]] : à la méiose, les deux allèles d'un gène se séparent ;
  chaque gamète n'en reçoit qu'un (la « pureté des gamètes »). `fort` : « Un allèle par gamète, au
  hasard : moitié L, moitié ℓ. » Pas d'action.
- **`produit`** · scène `echiquier` · bible T2 (« on additionne les probabilités pour "et" ») · **V**
  « Probabilité qu'une graine F2 soit ℓ//ℓ ? » ✓ ½ × ½ = ¼ : il faut ℓ venu du pollen **et** ℓ venu
  de l'ovule. ✗ ½ : ne regarder qu'un parent → les deux doivent donner ℓ. ✗ ½ + ½ = 1 : additionner
  pour « et » → deux conditions à la fois se multiplient.

### Partie 3 : Le test-cross (scène `echiquier`)

- **`testeur`** · `crx:1` (une graine lisse : « L//L ou L//ℓ ? ») · items.yaml (test-cross mal
  compris) · **Q** « Avec quelle plante la croiser pour connaître son génotype ? » ✓ une plante
  ridée, ℓ//ℓ. ✗ une lignée pure lisse, L//L : tous les descendants seraient lisses, quel que soit le
  génotype testé → le partenaire ne doit rien masquer. ✗ une autre plante lisse : elle peut être
  hybride ; ses propres gamètes brouilleraient la lecture.
- **`deux-hypotheses`** · `grille:1`, deux grilles 2 × 1 côte à côte (L//L × ℓ//ℓ ; L//ℓ × ℓ//ℓ),
  `fill:0` · le [[test-cross|test-cross]] (croisement-test, croisement en retour : les trois noms du
  cadre) se fait avec un homozygote récessif. **Q** « Si la plante testée est L//ℓ, ses descendants
  seront… » ✓ ½ [L] et ½ [ℓ]. ✗ ¾ [L] et ¼ [ℓ] : appliquer le rapport de la F2 à tout croisement
  (items.yaml, rapport mal attribué) → le testeur ne donne que ℓ/. ✗ tous [L] : c'est le résultat si
  elle est L//L. `reveal` : les deux grilles se remplissent.
- **`lecture-tc`** · `cls` (la colonne du parent testé) · `fort` : « Le testeur ne donne que ℓ/ :
  chaque descendant montre le gamète venu du parent testé. Les proportions d'un test-cross sont celles
  de ses gamètes. » Pas d'action. (C'est la phrase qui sert aux parties 5, 6 et 7.)
- **`v-testcross`** · **V** « Test-cross : 52 lisses et 48 ridées. La plante testée est… » ✓ L//ℓ.
  ✗ L//L : une seule graine ridée exclut L//L → elle a reçu ℓ du parent testé. ✗ impossible à dire,
  52 n'est pas 50 : exiger un rapport exact → un compte réel s'écarte un peu de l'attendu (le
  corrigé PC 2024 R juge 24,33 % et 25,22 % « proches de 25 % »).

### Partie 4 : Le gène létal (scène `echiquier`)

- **`jaunes`** · `crx:1` · sujet PC 2024 R, croisement 1, la couleur seule (le sujet suit aussi la
  longueur des poils, que l'étape ne montre pas) : souris jaunes × souris jaunes → 102 jaunes et
  49 grises. Symboles du sujet : G (jaune), g (gris). **Q** « Que disent ces résultats ? » ✓ jaune
  domine, et les deux parents sont G//g. ✗ gris domine : un caractère absent chez les deux parents et
  présent chez des descendants était masqué chez eux → il est récessif. ✗ deux souris jaunes ne
  peuvent pas avoir de petit gris ; c'est une mutation : (bible T2) les parents sont hybrides et
  cachent g.
- **`deux-pour-un`** · `obs:1` (attendu ¾ et ¼ ; observé 102 et 49 ; rapport calculé ≈ 2,1 pour 1) ·
  bible T2, pari proposé (« 3:1 attendu, 2:1 observé : que manque-t-il ? ») · **P** « On attend 3
  jaunes pour 1 grise ; on en compte 2 pour 1. Pourquoi ? » options : « une erreur d'expérience, trop
  peu de souris » / « les embryons G//G meurent avant la naissance » / « il naît plus de souris grises
  que prévu ». `reveal` : grille 2 × 2, la case G//G barrée d'une croix (forme des corrigés) ; restent
  deux cases [G], une case [g]. Le retour de « erreur » nomme la conception (« un rapport 2 pour 1
  serait une erreur d'expérience » : c'est la signature d'un [[gene-letal|gène létal]]) ; celui de
  « plus de grises » : ce sont des jaunes qui manquent. Tous donnent le fait, mot du corrigé :
  « gène létal … à l'état homozygote pour l'allèle dominant : G//G ».
- **`letal-calc`** · `bar:1` · **Q** « Parmi les souriceaux nés, quelle part est jaune ? » ✓ 2/3.
  ✗ 2/4 = ½ : compter sur 4 cases alors qu'une est vide → on compte sur les cases des vivants.
  ✗ ¾ : oublier la case barrée. (B3 : ⅔, ½, ¾ distincts.) `apres` : 102 / 151 ≈ 67,5 % (calculé ;
  voir §8 pour le chiffre imprimé du corrigé).
- **`v-letal`** · **V** « Dans cet élevage, les souris jaunes sont… » ✓ toutes G//g. ✗ G//G ou G//g,
  comme pour un gène ordinaire : ici les G//G ne naissent pas. ✗ toutes G//G : ce sont elles qui
  meurent. `apres` : « D'où : on n'obtient jamais de lignée pure jaune. »

### Partie 5 : Deux gènes, deux paires (scènes `meiose`, `echiquier`, `bac`)

- **`deux-genes`** · figure-clé 1/12 · scène `meiose`, `ph:1`, `lab` : grande paire L (paternel) / ℓ
  (maternel), petite paire J / j · Mendel suit aussi deux caractères à la fois : lignée pure lisse et
  jaune × lignée pure ridée et verte ; la F1 est lisse et jaune [S]. Les deux gènes sont ici sur deux
  paires différentes. **Q** « Comment écrire le génotype de F1 ? » ✓ L//ℓ J//j. ✗ L J // ℓ j : c'est
  l'écriture de deux gènes sur un même chromosome → ici, deux paires, deux génotypes côte à côte
  (corrigé 2024 R, Q1). ✗ L//J ℓ//j : mettre face à face deux gènes différents → les deux traits
  séparent les deux allèles d'un même gène.
- **`orientation`** · figure-clé 2/12 · `ph:3, al:1, or2:0` · **M** `ctl:'orient'` (copie du contrôle
  de la méiose, `need` : les deux orientations, « Montre-moi ») · « Retourne la petite paire. » La
  scène rejoue la méiose et écrit les gamètes : L/ J/ et ℓ/ j/, puis L/ j/ et ℓ/ J/. C'est le
  [[brassage-inter|brassage interchromosomique]] (leçon méiose), schématisé (`3.2.3` / `2.4.3`).
- **`tc-indep`** · figure-clé 3/12, **pari 1/3** · scène `echiquier`, `grille:1`, quatre gamètes à ¼
  en ligne, le testeur ℓ//ℓ j//j (un seul gamète ℓ/ j/) en colonne, `fill:0` · **P** « Test-cross de
  F1 : combien de classes de descendants, et dans quelles proportions ? » options : « 4 classes, ¼
  chacune » / « 4 classes : 9/16, 3/16, 3/16, 1/16 » / « 2 classes, ½ chacune ». `reveal` : `fill:4`.
  Retours : « 9/16… » nomme la conception (« appliquer à tout croisement le rapport d'une F2 »,
  items.yaml) ; « 2 classes » : ce serait vrai si F1 ne donnait que L/ J/ et ℓ/ j/, or l'orientation
  en donne quatre. `apres` : la [[troisieme-loi|troisième loi de Mendel]], la ségrégation
  indépendante : au test-cross, quatre classes égales sont « compatibles avec la 3ème loi de
  Mendel » (corrigé PC 2024 R, Q4).
- **`f2-16`** · figure-clé 4/12 · `grille:1`, 4 × 4, `fill:16, phe:1` · **M** `ctl:'classe'`, `need` :
  les 4 classes · F1 × F1 : 16 cases. « Touche un phénotype : ses cases s'allument. » Le compte
  s'écrit : 9, 3, 3, 1.
- **`produit-16`** · **Q** « Sans compter les cases : la part de graines ridées et vertes, [ℓ, j] ? »
  ✓ ¼ × ¼ = 1/16. ✗ ¼ + ¼ = ½ : additionner pour « et » → ridée **et** verte se multiplient. ✗ ¼ :
  ne suivre qu'un caractère, ou reprendre le test-cross → deux conditions à la fois. (B3 : 1/16, ½,
  ¼ distincts.) `apres` : tex des quatre produits, ¾ × ¾ = 9/16, ¾ × ¼ = 3/16, ¼ × ¾ = 3/16,
  ¼ × ¼ = 1/16.
- **`demarche`** · scène `bac`, mode `dm:1` (l'énoncé de Mendel en trois lignes, plus un test-cross
  d'exemple, dit tel : « supposons qu'un test-cross de F1 donne quatre classes proches de 25 % ») ·
  **D** puis **Q** (B3 : l'élève choisit la ligne 3) · la démarche du bac, en quatre gestes :
  1. Lire : la F1 est homogène, [L, J]. (r : on lit les résultats avant de rien déduire.)
  2. Déduire : lisse et jaune dominent ; les parents sont de lignée pure (1ère loi). (r : F1 homogène.)
  - Question « Ligne 3 ? » ✓ « Déduire : test-cross à quatre classes égales, les gènes sont
    indépendants. » ✗ « Génotype de F1 : L//L J//J, comme son phénotype » : « même phénotype, même
    génotype » → F1 a reçu ℓ et j de l'autre parent. ✗ « Génotype de F1 : L J // ℓ j » : écrire des
    gènes liés avant de l'avoir montré → c'est le test-cross qui tranche, et il dit « indépendants ».
  - `apres` : 4. Écrire : génotypes, gamètes (¼ L/ J/, ¼ L/ j/, ¼ ℓ/ J/, ¼ ℓ/ j/), échiquier, dans la
    mise en page des corrigés ; 5. Conclure : « les résultats théoriques sont conformes aux résultats
    expérimentaux » (forme du corrigé PC 2024 R, Q3.b, qui écrit la phrase inverse quand ils ne le
    sont pas). `fort` (dans l'`apres`) : « Lire, déduire, écrire, conclure. »

### Partie 6 : Deux gènes, une paire (scènes `echiquier`, `meiose`)

- **`rappel`** · scène `echiquier` · `sujet:'test-cross et F2 d'un gène'` · texte : mi-parcours, le
  bon moment pour une pause ; un rappel avant de repartir. **V** « L//ℓ × ℓ//ℓ : la descendance ? »
  ✓ ½ [L] et ½ [ℓ]. ✗ ¾ [L] et ¼ [ℓ] : c'est la F2, L//ℓ × L//ℓ → ici, le testeur ne donne que ℓ/.
  ✗ toutes [L] : la moitié des descendants reçoit ℓ/ du parent testé.
- **`souris-f1`** · figure-clé 5/12 · scène `meiose`, `ph:1`, `lab` : grande paire G L (paternel) /
  g ℓ (maternel), petite paire sans étiquette · sujet SVT 2024 R : souris grises à pelage lisse ×
  souris blanches à pelage crépu → F1 grises et lisses. Symboles du sujet : G (gris) / g (blanc),
  L (lisse) / ℓ (crépu). Le corrigé écrit deux génotypes possibles, un par hypothèse. **Q** « Si les
  deux gènes sont sur le même chromosome, F1 s'écrit… » ✓ G L // g ℓ. ✗ G//g L//ℓ : c'est l'écriture
  de deux paires. ✗ G g // L ℓ : mettre les deux allèles d'un gène sur un même chromosome → chaque
  chromosome porte un allèle de chaque gène.
- **`absolu-tc`** · figure-clé 6/12 · `ph:3→8, gam:1, co:0` · l'hypothèse du sujet : « linkage
  absolu », aucun crossing-over entre les deux gènes. **Q** « Sous cette hypothèse, F1 produit… »
  ✓ ½ G L et ½ g ℓ. ✗ ¼ de chacun des quatre types : c'est le cas de deux paires → l'orientation ne
  sépare pas deux gènes d'un même chromosome. ✗ ½ G g et ½ L ℓ : un gamète porte un allèle de chaque
  gène.
- **`absolu-f2`** · figure-clé 7/12 · scène `echiquier`, 2 × 2 · la question 2 du sujet (« à l'aide
  d'un échiquier… les proportions phénotypiques attendues en F2 ») · **Q** « F1 × F1, sous cette
  hypothèse : la F2 ? » ✓ ¾ [G, L] et ¼ [g, ℓ] (le corrigé, mot pour mot). ✗ 9/16, 3/16, 3/16,
  1/16 : la troisième loi exige deux paires → ici, deux gamètes, un échiquier 2 × 2. ✗ ½ [G, L] et
  ½ [g, ℓ] : c'est le test-cross. (B3 : trois répartitions distinctes ; aucune autre règle de la
  question ne donne ¾ / ¼.)
- **`vrai-tc`** · figure-clé 8/12, **pari 2/3** · `grille:1`, 4 × 1, `fill:0` · le sujet fait le
  test-cross, F1 × g ℓ // g ℓ. **P** « Qu'observera-t-on ? » options : « 2 classes à ½ : l'hypothèse
  est juste » / « 4 classes à ¼ : les gènes sont indépendants » / « 4 classes, deux grandes et deux
  petites ». `reveal` : `fill:4, obs:1` : 48,29 % [G, L], 48,71 % [g, ℓ], 1,29 % [G, ℓ], 1,71 % [g, L]
  (imprimé au sujet). Retours : chaque option reçoit le fait, et celle qui l'a prédit le lien
  « deux grandes classes : les chromosomes du parent ; deux petites : il s'est passé autre chose ».
- **`quatre-classes`** · figure-clé 9/12 · `aire:1` (les cases prennent l'aire de leur pourcentage)
  · bible T3 (« Quatre classes, donc gènes indépendants ») · **Q** « Quatre classes : les gènes
  sont-ils indépendants ? » ✓ non, ils sont liés : les classes sont très inégales. ✗ oui, il y a
  quatre classes → des gènes indépendants donneraient quatre classes égales. ✗ liés sans
  crossing-over, l'hypothèse est vérifiée : 3 % de souris ne viennent ni de G L ni de g ℓ →
  l'hypothèse est réfutée (corrigé Q3 : « linkage relatif », « L'hypothèse proposée est réfutée »).
- **`crossing-over`** · figure-clé 10/12 · scène `meiose`, `ph:2, chi:1, co:0→1`, puis `ph:2→8,
  gam:1` · en prophase I, un [[crossing-over|crossing-over]] tombe entre les deux loci : deux
  chromatides deviennent G ℓ et g L. C'est le [[linkage-relatif|linkage relatif]], le brassage
  intrachromosomique (leçon méiose). `fort` : « Les deux petites classes viennent de gamètes
  recombinés. » Pas d'action.
- **`parentaux-recombines`** · figure-clé 11/12 · `lab` inversé : G ℓ (paternel) / g L (maternel) ·
  bible T3, pari proposé (« dans ce croisement, quelles classes sont recombinées ? ») · les gamètes
  [[parentaux|parentaux]] portent les combinaisons des chromosomes du parent hybride ; les
  [[recombines|recombinés]], les autres. **Q** « Une souris G ℓ // g L (née d'un parent gris crépu
  et d'un parent blanc lisse) fait un test-cross. Quelles classes sont recombinées ? » ✓ [G, L] et
  [g, ℓ]. ✗ [G, ℓ] et [g, L], qui « mélangent » les caractères : « les recombinés sont les phénotypes
  nouveaux » (bible T3) → on juge par rapport aux chromosomes du parent hybride. ✗ les quatre :
  deux classes seulement demandent un crossing-over. `apres` : « Ce sont aussi les deux petites
  classes. »
- **`cinquante`** · scène `meiose`, `co:1` · bible T3 (« un crossing-over se produit toujours entre
  deux gènes liés ») · **V** « Si un crossing-over avait lieu entre G et L à chaque méiose, quelle
  serait la part de recombinés ? » ✓ 50 % : chaque méiose donne 2 chromatides recombinées sur 4.
  ✗ 100 % : le crossing-over ne change que 2 des 4 chromatides (leçon méiose, `recombines`). ✗ 3 %,
  comme ici : 3 % veut dire justement qu'il n'a lieu que dans peu de méioses. `apres` : « Avec deux
  gènes liés, moins de 50 % de recombinés. » (Raisonnement à un seul crossing-over ; §8, à sourcer.)

### Partie 7 : La distance et la carte (scènes `echiquier`, `carte`)

- **`pourcentage`** · figure-clé 12/12 · scène `echiquier`, `aire:1, cls:'rec'` · **Q** « Dans le
  test-cross des souris, la part de recombinés ? » ✓ 1,29 + 1,71 = 3 %. ✗ 1,5 % : la moyenne des deux
  classes, ou une seule → les recombinés sont les deux classes ensemble. ✗ 97 % : ce sont les
  parentaux. (Calculé ; le sujet ne demande pas ce calcul : la leçon le fait pour la suite.)
- **`centimorgan`** · scène `carte`, `cur:3` · plus deux gènes sont éloignés, plus un crossing-over a
  de chances de tomber entre eux. Par définition, 1 % de recombinés = 1 [[centimorgan|centimorgan]]
  (cM) [V] : G et L sont à 3 cM. `fort`. Pas d'action.
- **`double`** · **pari 3/3** · `carte`, `cur:3` · bible T3, pari proposé (« à distance double, deux
  fois plus de recombinés ? ») · **P** « Si L était deux fois plus loin de G, les recombinés
  seraient… » options : « deux fois plus nombreux » / « aussi nombreux : liés, c'est liés » / « quatre
  fois plus nombreux ». `reveal` : le curseur passe à 6 cM ; la scène écrit 6 %. Le retour de « aussi
  nombreux » nomme la conception (« la part de recombinés ne dépend pas de la place des gènes »,
  ajoutée) ; tous ajoutent « tant que les gènes restent proches ».
- **`curseur`** · **M** `ctl:'curseur'`, `need` : trois positions (ou « Montre-moi ») · « Fais glisser
  L. » La scène calcule à chaque position les recombinés (d %) et chaque classe (d/2 %) ; au-delà de
  30 cM, la phrase de la scène (§3.2).
- **`total`** · scène `echiquier`, `obs:1` · un test-cross d'exemple, dit tel à l'écran : 410 [A, B],
  390 [a, b], 105 [A, b], 95 [a, B], sur 1 000 · bible T3 (« la distance se calcule sur les seuls
  recombinés » : faux, sur le total) · **Q** « La distance entre A et B ? » ✓ 200 / 1 000 = 20 cM.
  ✗ 25 cM : diviser par les seuls parentaux (800) → on divise par tous les descendants. ✗ 10,5 cM :
  ne compter qu'une classe recombinée → les deux classes rares ensemble. (B3 : 20, 25, 10,5.)
- **`trois-genes`** · tag `1913 · Sturtevant` · `carte`, mode `trois` · Sturtevant, étudiant chez
  Morgan, publie en 1913 la première [[carte-factorielle|carte factorielle]] : des gènes de la
  drosophile rangés sur une ligne d'après les pourcentages de recombinés [V]. **Q** « A-B = 8 cM, B-C
  = 5 cM, A-C = 13 cM. Quel gène est au milieu ? » ✓ B, car 8 + 5 = 13. ✗ C : mettre au milieu le
  gène de la plus petite distance → au milieu, celui dont les deux distances font la troisième. ✗ A :
  suivre l'ordre des lettres → l'ordre se déduit des distances. `apres` : la scène place A, B, C ;
  « les distances s'additionnent, pour des gènes proches ».
- **`v-carte`** · `carte`, `cur:12` · prépare la question 3 de 2022 N · **V** « Deux gènes à 12 cM ;
  test-cross de l'hybride A B // a b. La part attendue de [A, b] ? » ✓ 6 %. ✗ 12 % : donner à une
  classe la part des deux → les 12 % se partagent entre deux classes égales. ✗ 44 % : c'est une
  classe parentale, (100 − 12) / 2. (B3 : 6, 12, 44.)

### Partie 8 : Retour à l'énigme (scène `echiquier`)

- **`retour-quart`** · `crx:1` puis `grille:1` · texte dépendant du pari `f2` (forme de
  `retour-moitie`, leçon méiose : « Ton pari du début était le bon » ou « Tu avais parié … »). **Q**
  « Pourquoi un quart de graines ridées en F2 ? » ✓ chaque plante F1, L//ℓ, donne ℓ/ une fois sur
  deux : ½ × ½. ✗ le ridé avait disparu, une mutation l'a fait revenir : il était masqué en F1, pas
  perdu (L//ℓ). ✗ parce que l'échiquier a 4 cases : ce sont les proportions des gamètes qui font les
  probabilités, pas le nombre de cases (partie 6 : la case [G, L] du test-cross des souris vaut
  48,29 %, pas ¼).
- **`retour-556`** · `obs:1` : 315 [L, J], 108 [L, j], 101 [ℓ, J], 32 [ℓ, j] [S] ; attendu, calculé
  sur 556 : 312,75 ; 104,25 ; 104,25 ; 34,75 · **Q** « La classe [L, J] est de loin la plus grande.
  Les deux gènes sont-ils liés ? » ✓ non : en F2, 9/16 de [L, J] est attendu pour deux gènes
  indépendants. ✗ oui, la classe des deux dominants domine : « classe majoritaire, donc gènes
  liés » (ajoutée) → c'est au test-cross que des classes inégales disent « liés ». ✗ on ne peut rien
  dire, les comptes ne tombent pas juste : 315 pour 312,75 attendus, l'écart est faible.
- **`retour-lies`** · **Q** « Si les deux gènes de Mendel avaient été tout proches sur un même
  chromosome, sa F2 aurait ressemblé à… » ✓ presque ¾ [L, J] et ¼ [ℓ, j]. ✗ 9/16, 3/16, 3/16,
  1/16 : la troisième loi exige deux paires. ✗ ½ [L, J] et ½ [ℓ, j] : c'est un test-cross. `apres`,
  `fort` : « L'énigme est résolue. » (B3 : la ¾ / ¼ coïncide avec la F2 d'un gène, que la question
  n'oppose pas.)

### Partie 9 : Au bac (scènes `bac`, `echiquier`) — voir §6

`bac-doc`, `bac-q1`, `bac-q2`, `bac-gametes`, `bac-echiquier`, `bac-erreur`, `bac-2`,
`bac-2-suite`.

### Partie 10 : Bilan (scènes `quiz`, `end`)

- **`q1`** · quatre classes · **Q** « Test-cross d'un double hétérozygote : 42 %, 41 %, 9 %, 8 %. Les
  gènes sont… » ✓ liés, à 17 cM. ✗ indépendants : il y a quatre classes → quatre classes égales,
  seulement. ✗ liés, à 8,5 cM : une seule classe recombinée comptée. (B3 : 17 et 8,5 distincts.)
- **`q2`** · le gène létal · **Q** « Des individus [A] croisés entre eux donnent ⅔ [A] et ⅓ [a]. Les
  [A] sont… » ✓ tous A//a. ✗ A//A ou A//a : les A//A ne naissent pas. ✗ des A//A, et le ⅓ est une
  erreur : 2 pour 1 est la signature d'un gène létal.
- **`q3`** · la distance · **Q** « Test-cross : 460, 440, 52 et 48 descendants. La distance ? »
  ✓ 10 cM (100 sur 1 000). ✗ 11,1 cM : divisé par les parentaux (900). ✗ 5,2 cM : une seule classe.
- **`fin`** · scène `end` (cinq lignes : un allèle par gamète, on multiplie ; F1 homogène → dominance
  et lignées pures ; test-cross = les gamètes du parent testé ; 2 pour 1 = gène létal ; quatre
  classes égales → indépendants, inégales → liés, recombinés % = distance en cM) · la fin de séance
  (forme de `finHTML`, leçon méiose) : « Vérifie » réussies, les paris `f2`, `deux-pour-un`,
  `tc-indep`, `vrai-tc`, `double` rappelés, le lien vers les exercices, la suite annoncée (hérédité
  liée au sexe et codominance, puis génétique humaine), et le renvoi piège par piège (B7) :
  rapports mal attribués → gabarit 2 ; 2 pour 1 → gabarit 4 ; quatre classes → gabarit 7 ;
  recombinés « nouveaux » → gabarit 9 ; distance sur le total → gabarit 10.

---

## 4. La pause et le rappel (A8)

La pause est proposée à la frontière des parties 5 et 6, dans le texte de l'étape **`rappel`**, 30ᵉ
étape sur 60 (50 %, dans la fourchette 30 % à 70 %). Sa question « Vérifie » : **L//ℓ × ℓ//ℓ : la
descendance ?** (✓ ½ [L] et ½ [ℓ] ; leurres « ¾ et ¼ » et « toutes [L] »). Elle mêle la F2 (partie 2)
et le test-cross (partie 3), dont la partie 6 a besoin.

Contrôle A7 fait sur la liste (V, Q, P, D, M ou rien, dans l'ordre) : 1 V · 2 – · 3 Q · 4 P · 5 P ·
6 Q · 7 – · 8 Q · 9 V · 10 V · 11 M · 12 Q · 13 Q · 14 – · 15 V · 16 Q · 17 Q · 18 – · 19 V · 20 Q ·
21 P · 22 Q · 23 V · 24 Q · 25 M · 26 P · 27 M · 28 Q · 29 D+Q · 30 V · 31 Q · 32 Q · 33 Q · 34 P ·
35 Q · 36 – · 37 Q · 38 V · 39 Q · 40 – · 41 P · 42 M · 43 Q · 44 Q · 45 V · 46 Q · 47 Q · 48 Q ·
49 P · 50 D · 51 Q · 52 Q · 53 – · 54 V · 55 Q · 56 Q · 57 Q · 58 Q · 59 Q · 60 –. Les manipulations et
les `deriv` comptent comme étapes sans pari : la plus longue suite sans pari ni « Vérifie » est de 1.
A6 : aucune option « je ne sais pas ». Paris de prédiction (sans `ok`) : `mendel`, `f2`,
`deux-pour-un`, `tc-indep`, `vrai-tc`, `double`, `bac-doc`.

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Celles de la fiche bible T2, puis T3, puis l'inventaire de la leçon actuelle (`items.yaml`,
`mc.svt.svt_transmission_caracteres.*`), puis celles ajoutées par ce plan. Une seule ne l'est pas ici,
et le dit : la notation `X^N Y`, qui part avec l'hérédité liée au sexe.

| Conception | Source | Étapes |
|---|---|---|
| « Même phénotype, même génotype » | bible T2 ; items `genotype-phenotype-confondus` | `dominance`, `lisses-purs`, `demarche`, `bac-q2` |
| « Deux parents gris ne peuvent pas avoir un petit blanc » | bible T2 | `f2`, `jaunes` |
| « Deux allèles différents donnent un intermédiaire » (à déduire, pas à supposer) | bible T2 | `mendel` (la codominance elle-même : leçon suivante) |
| « Un rapport 2:1, c'est une erreur d'expérience » | bible T2 (pari proposé) | `deux-pour-un`, `q2` |
| « Les croisements réciproques donnent toujours la même F1 » | bible T2 | `reciproques` (en partie : la leçon dit que c'est faux pour l'X, la suivante le montre) |
| « On additionne les probabilités » pour « et » | bible T2 ; items `probabilites-combinees-mal-calculees` | `produit`, `produit-16` |
| Notation : crochets pour les phénotypes, double trait pour les génotypes | bible T2 | `sav-notation`, `deux-genes`, `souris-f1`, `bac-2` ; `X^N Y` : leçon suivante |
| « Quatre classes, donc gènes indépendants » | bible T3 | `vrai-tc`, `quatre-classes`, `q1` |
| « Les recombinés sont les phénotypes "nouveaux" » (répulsion) | bible T3 (pari proposé) | `parentaux-recombines` |
| « La distance se calcule sur les seuls recombinés » (et non sur le total) | bible T3 | `total`, `q3` |
| « Un crossing-over se produit toujours entre deux gènes liés » | bible T3 | `cinquante` |
| Liaison totale : deux classes seulement | bible T3 (« à vérifier : présence dans les sujets ») ; **trouvée** : SVT 2024 R, hypothèse « linkage absolu » | `absolu-tc`, `absolu-f2`, `quatre-classes` |
| Appliquer la dominance à la méiose ; gamète à deux allèles | items `dominance-mal-appliquee` ; leçon méiose | `v-savoir`, `absolu-tc` |
| Rapport d'un croisement appliqué à un autre (¾ / ¼ au test-cross, 9:3:3:1 partout) | items `rapport-de-croisement-mal-attribue` | `rapports`, `deux-hypotheses`, `tc-indep`, `absolu-f2`, `rappel`, `bac-2-suite` |
| Test-cross avec un partenaire dominant ou hybride | items `test-cross-mal-compris` | `testeur`, `v-testcross` |
| Tout individu donne deux types de gamètes (même une lignée pure) | ajouté | `sav-lignee` |
| « 3 pour 1 » lu comme un tiers | ajouté | `ratio` |
| Exiger des proportions exactes (52 / 48 n'est pas ½) | ajouté | `v-testcross`, `retour-556` |
| F1 hétérogène et parents de lignée pure | ajouté (corrigé PC 2024 R) | `uniformite` |
| Gène létal : compter sur 4 cases, ou barrer sans recompter | ajouté | `letal-calc`, `bac-2-suite` |
| Écriture des gènes indépendants et des gènes liés confondues ; deux allèles d'un gène sur un chromosome | ajouté (corrigé 2024 R, Q1) | `deux-genes`, `souris-f1`, `bac-q2`, `bac-2` |
| « La part de recombinés ne dépend pas de la place des gènes » | ajouté | `double` |
| Lire la position d'un locus comme une distance ; donner à une classe la part des deux | ajouté (forme du document 2022 N) | `bac-gametes`, `v-carte` |
| « Classe majoritaire en F2, donc gènes liés » | ajouté | `retour-556` |
| Réciter le cours, ou faire l'échiquier avant d'avoir déduit dominance et liaison | bible §2.4 | `bac-doc`, `demarche` |
| Le nombre de cases fait la probabilité (oubli des proportions des gamètes) | ajouté (bible T2 : « carré des aires ») | `quatre-classes`, `retour-quart` |

---

## 6. Au bac (B6)

Les quatre exercices de Partie II transcrits dans `docs/sujets/svt/meiose-fecondation-brassages.md`
sont au statut « transcrit, à vérifier par un second lecteur ». La partie 9 est bâtie sur eux, citée
exactement ; **la leçon n'est montrée qu'après leur vérification**. Les points cités sont ceux
**imprimés au corrigé officiel** ; leur rattachement ligne à ligne est celui de la transcription. Deux
sujets servent déjà dans le corps de la leçon (PC 2024 R en partie 4, SVT 2024 R en partie 6) ; les
deux exemples ci-dessous sont les deux autres.

**L'exemple commenté : SVT, 2022, session normale, Exercice 2 (4,5 pts, code NS 32F), questions 1 à 3
(0,75 + 1 + 1,25 = 3 pts)** ; corrigé NR 32F, p. 3. Drosophile : lignées A et B aux ailes longues et
corps clair, lignée C aux ailes vestigiales et corps noir ; croisement 1 (A × C) : F1 toute [vg⁺, b⁺] ;
document 1 : le chromosome 2, couleur du corps à 48, taille des ailes à 67, « Distance entre les
gènes en cM » ; croisement 2 (B × C) : deux phénotypes parentaux, deux recombinés ; NB des symboles
(vg⁺, vg) et (b⁺, b). Les questions 4 et 5 (sélection naturelle, 1,5 pt) ne sont pas montrées.

- **`bac-doc`** · scène `bac`, `doc:1` (l'énoncé, le document 1 redessiné d'après sa description
  transcrite, le NB) · « Premier geste ? » · **P** (décision des specs méiose et noyaux §9 : un pari
  de prédiction, `reveal` sans `ok`). Options : « Lire le croisement 1 et le document 1 : F1
  homogène, deux gènes sur le chromosome 2 » / « Faire tout de suite l'échiquier du croisement 2 » /
  « Réciter les trois lois de Mendel ». `reveal` : `e1:1`, les deux informations soulignées. Retours :
  l'échiquier d'abord, c'est écrire des gamètes avant de savoir si les gènes sont liés ; réciter,
  c'est le cours sans le document (bible §2.4).
- **`bac-q1`** · **D** (les lignes du corrigé, points imprimés) :
  1. F1 homogène [vg⁺, b⁺] : vg⁺ (ailes longues) et b⁺ (corps clair) dominants, vg et b récessifs
     (r : un seul phénotype parental en F1) · 0,25 pt ;
  2. les deux gènes sont sur le même chromosome n° 2 : ils sont liés (r : document 1) · 0,25 pt ;
  3. ils sont sur un autosome : les caractères ne sont pas liés au sexe (r : partie 2,
     `reciproques`) · 0,25 pt.
- **`bac-q2`** · **Q** « Le génotype de la lignée B ? (même phénotype que A ; croisée avec C, elle donne
  quatre phénotypes) » ✓ vg⁺ b⁺ // vg b. ✗ vg⁺ b⁺ // vg⁺ b⁺, comme A : « même phénotype, même
  génotype » → C est pure ; quatre phénotypes exigent que B soit hétérozygote pour les deux gènes
  (justification du corrigé). ✗ vg⁺//vg b⁺//b : l'écriture de deux gènes indépendants, contraire au
  document 1. `apres` : A : vg⁺ b⁺ // vg⁺ b⁺, C : vg b // vg b (0,25 pt), justification « lignée pure
  selon la première loi de Mendel » (0,25 pt) ; B (0,25 pt) et sa justification (0,25 pt).
- **`bac-gametes`** · **Q** « Les gènes sont à 48 et à 67 cM. Quel pourcentage de gamètes vg b⁺ la
  lignée B produit-elle ? » ✓ 9,5 % : 67 − 48 = 19 cM de recombinés, partagés entre deux gamètes. ✗
  19 % : c'est la part des deux gamètes recombinés ensemble. ✗ 48 % : lire la position d'un locus
  comme une distance → la distance est l'écart des deux positions. (B3 : 9,5 ; 19 ; 48.) `apres` :
  la ligne du corrigé, « Gamètes : vg b (100%) · vg⁺ b⁺ (40,5%) ; vg b⁺ (9,5%) ; vg⁺ b (9,5%) ; vg b
  (40,5%) » · 0,5 pt. Le corrigé n'écrit pas le calcul 67 − 48 : la leçon le donne comme raison, pas
  comme ligne notée.
- **`bac-echiquier`** · scène `echiquier`, 1 × 4, `aire:1` · `html` (forme de `bac-copie`, leçon
  méiose) : la mise en page du corrigé (Parents · Phénotypes · Génotypes · Gamètes), l'échiquier
  (0,5 pt), puis la conclusion (0,25 pt) : parentaux 40,5 % [vg⁺, b⁺] et 40,5 % [vg, b] ; recombinés
  9,5 % [vg, b⁺] et 9,5 % [vg⁺, b]. Pas d'action.
- **`bac-erreur`** · **V** « Une copie écrit : "Gamètes de B : ¼ vg⁺ b⁺, ¼ vg⁺ b, ¼ vg b⁺, ¼ vg b."
  Où est l'erreur ? » ✓ les gènes sont liés : les gamètes parentaux sont majoritaires, 40,5 %
  chacun. ✗ il fallait ½ et ½ : deux gamètes seulement voudraient dire aucun crossing-over → le
  croisement 2 donne quatre phénotypes. ✗ aucune, si l'échiquier est bien rempli : un échiquier juste
  sur des gamètes faux donne des proportions fausses. Aucune phrase sur ce que fait « le
  correcteur ».

**Le second exemple, que l'élève complète : SVT, 2024, session normale, Exercice 3 (3 points, code
NS 32F), question 3 (1,25 pt)** ; corrigé NR 32F, p. 3-4. Bovins : race Dexter (pattes courtes) ;
question 1 : Dexter × Dexter → 2/3 Dexter, 1/3 Kerry, gène létal, Dexter D//d ; question 2 : sans
cornes dominant, F1 R//r ; question 3 : F1 sans cornes et Dexter, croisées entre elles, « en
considérant que les deux gènes sont indépendants ». L'étape `bac-2` montre les réponses 1 et 2 comme
données.

- **`bac-2`** · scène `bac`, `ex2:1` · **Q** « Ligne 1 de la copie : les génotypes des parents ? »
  ✓ R//r D//d × R//r D//d (0,25 pt). ✗ R D // r d × R D // r d : l'énoncé dit « indépendants » →
  l'écriture de deux paires. ✗ R//r D//D × R//r D//D : un Dexter D//D ne naît pas (question 1) → les
  Dexter sont D//d. `apres` : les gamètes, ¼ R/ D/ · ¼ r/ d/ · ¼ R/ d/ · ¼ r/ D/ (0,25 pt), et
  l'échiquier 4 × 4 aux quatre cases D//D barrées (0,5 pt), scène `echiquier`, `bar:1`.
- **`bac-2-suite`** · `grille:1`, 4 × 4, `bar:1` · **Q** « La dernière ligne : les proportions des
  phénotypes ? » ✓ 6/12 [R, D] ; 3/12 [R, d] ; 2/12 [r, D] ; 1/12 [r, d] (0,25 pt ; le corrigé,
  mot pour mot, dans un autre ordre). ✗ 9/16, 3/16, 3/16, 1/16 : oublier le gène létal. ✗ 6/16,
  3/16, 2/16, 1/16 : barrer les cases sans recompter sur les 12 qui restent. (B3 : les trois
  répartitions sont distinctes ; contrôle de A5 sur la longueur des trois options, de même forme.)

---

## 7. Les exercices générés (`components/pilote/exercices/transmission.js`)

Format de `meiose.js` : réponse calculée, chaque leurre porte `fb` et `erreur` (le nom de la
conception, celui du §5). **Règles communes aux tirages** : le gabarit calcule la valeur de chaque
leurre et rejette tout tirage où deux options ont la même valeur ; les comptes « observés » sont tirés
autour de l'attendu avec un écart d'au plus 8 % par classe (jamais l'attendu exact plus d'une fois sur
trois) ; les caractères et symboles viennent d'une liste fermée, celle des sujets transcrits (pois
L/ℓ, J/j ; souris G/g, L/ℓ ; drosophile vg⁺/vg, b⁺/b ; bovins D/d, R/r) avec leur NB à l'énoncé ; **à
vérifier** avant d'en ajouter un : sa dominance réelle. Aucun gabarit ne porte sur un gène lié au sexe
ni sur la codominance (B7).

**Les coïncidences interdites (B3)**, que chaque gabarit concerné rejette : le test-cross d'un parent
hétérozygote pour un seul des deux gènes (½ / ½) quand la question oppose « linkage absolu » et
« indépendants » ; la fraction des hétérozygotes d'une F2 à un gène (½) quand un leurre est « le
rapport du test-cross » ; une distance de 50 cM ou plus (indiscernable de l'indépendance) ; deux
distances égales dans une carte à trois gènes quand la question est l'ordre.

| # | id | Niveau | Tirage | Capacités | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `f1-dominance` | 1 | deux lignées pures, un caractère tiré ; F1 homogène (ou, une fois sur quatre, hétérogène, un parent hybride) ; parfois le croisement réciproque, identique ; dire l'allèle dominant, les génotypes des parents et de F1, « lié au sexe ou non » | `svt-svt 3.2.1`, `svt-pc 2.4.1` | même phénotype, même génotype ; récessif pris pour dominant ; F1 hétérogène → lignées pures ; un seul allèle par individu ; « réciproques toujours identiques » |
| 2 | `f2-monohybride` | 2 | F1 × F1, N ∈ multiples de 4 entre 80 et 800 ; demander la fraction ou l'effectif d'un phénotype, d'un génotype, ou des homozygotes parmi les dominants | `svt-svt 3.2.1`, `svt-pc 2.4.1` | 1:2:1 pris pour les phénotypes ; ¼ au lieu de ⅓ (calcul sur le total) ; ½ du test-cross ; addition pour « et » |
| 3 | `test-cross-un-gene` | 2 | le parent testé, homozygote ou hétérozygote (tiré) ; comptes observés ; ou bien choisir le testeur | `svt-svt 3.2.1`, `svt-pc 2.4.1` | testeur dominant ou hybride ; rapport exact exigé ; ¾ / ¼ attendus au test-cross |
| 4 | `gene-letal` | 2 | allèle dominant létal à l'état homozygote (seul cas des sujets) ; N tiré ; comptes ≈ 2 : 1 ; interpréter, génotype des [A], part des [A] parmi les vivants, effectif attendu | `svt-svt 3.2.1`, `svt-pc 2.4.1` | erreur d'expérience ; compter sur 4 cases ; oublier la case barrée ; [A] = A//A ou A//a |
| 5 | `gametes-genotype` | 1 | un génotype écrit comme au bac : deux gènes indépendants, liés en linkage absolu, ou liés à d cM (d ∈ [2, 30]) ; donner les gamètes et leurs proportions | `svt-svt 3.2.2`, `svt-pc 2.4.2`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | ¼ chacun pour des gènes liés ; deux gamètes pour des gènes indépendants ; d au lieu de d/2 par gamète recombiné ; gamète à deux allèles d'un gène |
| 6 | `notation` | 1 | deux gènes, sur une ou deux paires (tiré), parents de lignées pures décrits (phase cis ou trans) ; écrire le génotype de F1 et ses gamètes dans la notation des corrigés | `svt-svt 3.2.2`, `svt-pc 2.4.2` | écritures indépendants / liés confondues ; phase inversée mal écrite ; allèles d'un même gène face à face ; oubli du trait des gamètes |
| 7 | `test-cross-deux-genes` | 2 | le parent testé, toujours double hétérozygote ; le modèle tiré : indépendants (1:1:1:1), linkage absolu (deux classes), linkage relatif (d ∈ [2, 30] cM, phase tirée) ; comptes ; conclure | `svt-svt 3.2.2`, `svt-pc 2.4.2` | « quatre classes, donc indépendants » ; « deux grandes classes, donc linkage absolu » ; rapport exact exigé |
| 8 | `f2-deux-genes` | 2 | gènes indépendants ; F1 × F1, ou F1 × un parent hétérozygote pour un seul gène (3/8, 3/8, 1/8, 1/8) ; fraction d'une classe | `svt-svt 3.2.2`, `svt-pc 2.4.2` | addition ; 9:3:3:1 appliqué à tout croisement ; un seul caractère suivi |
| 9 | `parentaux-recombines` | 2 | phase cis ou trans (tirée), parents de F1 décrits, test-cross ; quelles classes sont parentales, lesquelles recombinées | `svt-svt 3.2.2`, `svt-pc 2.4.2`, `svt-svt 3.2.3`, `svt-pc 2.4.3` | recombinés = phénotypes nouveaux ; recombinés = classes majoritaires |
| 10 | `distance` | 2 | comptes d'un test-cross (total 200 à 2 000), d ∈ [2, 30] ; la distance en cM | `svt-svt 3.2.4`, `svt-pc 2.4.4` | division par les parentaux ; une seule classe ; distance doublée |
| 11 | `distance-proportions` | 2 | une distance, ou deux positions sur une carte (forme du document 2022 N, écart ∈ [2, 30]) ; les pourcentages attendus des gamètes ou des classes d'un test-cross | `svt-svt 3.2.4`, `svt-pc 2.4.4`, `svt-svt 3.2.2`, `svt-pc 2.4.2` | lire une position comme une distance ; d donné à une classe ; parentaux à 100 − d |
| 12 | `carte-trois-genes` | 3 | trois gènes, deux distances tirées (2 à 25 cM, somme ≤ 40), la troisième leur somme ; l'ordre, puis la carte | `svt-svt 3.2.4`, `svt-pc 2.4.4` | la plus petite distance au milieu ; ordre des lettres ; distances non additionnées |
| 13 | `deux-genes-letal` | 3 | deux gènes indépendants dont un létal dominant à l'état homozygote ; F1 × F1 (forme 2024 N Q3) ou croisement d'un hybride (forme PC 2024 R) ; proportions après élimination | `svt-svt 3.2.1`, `svt-pc 2.4.1`, `svt-svt 3.2.2`, `svt-pc 2.4.2` | oubli du létal ; cases barrées sans recompter ; individus D//D comptés |
| 14 | `interpretation-complete` | 3 | un exercice type sur le modèle des sujets (énoncé, NB, F1, puis test-cross ou F2), indépendants ou liés ; l'élève choisit trois lignes de la démarche et de la mise en page « Parents · Phénotypes · Génotypes · Gamètes · Échiquier · résultats » ; dit « exercice type », barème « indicatif » | toutes les capacités de la leçon | réciter au lieu d'exploiter (bible §2.4) ; échiquier avant la déduction ; génotype des parents copié sur leur phénotype ; conclusion sans comparer théorie et résultats |

---

## 8. À vérifier, et questions pour le relecteur

**Histoire (2 places sur 3 permises).**
1. **Mendel** (énigme `mendel`, `f2`, `ratio`, `deux-questions` ; `deux-genes` ; retour `retour-556`).
   [V] de 1856 à 1863, environ 28 000 plantes ; Brno, 8 février et 8 mars 1865 ; publié en 1866 ;
   redécouvert en 1900 par de Vries, Correns et Tschermak (02 §5.3,
   [Gregor Mendel](https://en.wikipedia.org/wiki/Gregor_Mendel)). [S] les comptes : 5 474 lisses /
   1 850 ridées (7 324 graines), 6 022 jaunes / 2 001 vertes (8 023), et en dihybridisme 315 [lisse,
   jaune] / 108 [lisse, vert] / 101 [ridé, jaune] / 32 [ridé, vert] (556) : Hanneman, Suza, Lee,
   Kohmetscher, *Genetics, Agriculture, and Biotechnology*, Iowa State University Digital Press, ch.
   1.13, tableaux 1 et 5 ([LibreTexts](https://bio.libretexts.org/Bookshelves/Genetics/Genetics_Agriculture_and_Biotechnology_(Suza_and_Lee)/01%3A_Chapters/1.13%3A_Introduction_to_Mendelian_Genetics)) ;
   pour les deux premiers comptes, aussi UNL PASSEL, « Mendel's Peas », tableau 1
   ([passel2.unl.edu](https://passel2.unl.edu/view/lesson/a3e40516d9f6/6)). F1 toute lisse (et toute
   jaune) : [S], même source (colonne des caractères de la descendance). **Le mémoire de 1866 n'a pas
   été lu** (MendelWeb et ESP : erreur 503 pendant cette session) : comptes, F1 et autofécondation
   des F1 à vérifier sur une traduction du texte avant la mise en ligne. Le chiffre de 253 plantes
   hybrides vient d'un extrait de recherche non identifié : non utilisé.
2. **Sturtevant, 1913** (`trois-genes`). [V] « Morgan's student Alfred Sturtevant developed the first
   genetic map in 1913 » ; la légende de la figure : six gènes liés au sexe
   ([Thomas Hunt Morgan](https://en.wikipedia.org/wiki/Thomas_Hunt_Morgan)). La phrase « I went home,
   and spent most of the night… » est [V] en 02 §5.3, mais **ne s'affiche pas** (décision générale :
   aucune citation entre guillemets à l'écran) ; le texte dit l'idée, sans la nuit ni les mots.
- Écartées : **Morgan, 1911** (liaison et crossing-over : [V] qu'il en a fait l'hypothèse, même page,
  mais aucun compte vérifié pour un pari) ; **Bateson, Saunders et Punnett, 1905**, pois de senteur
  ([V] l'expérience, [Genetic linkage](https://en.wikipedia.org/wiki/Genetic_linkage) ; aucun compte
  lu). Les deux parties où elles iraient (6 et 7) sont bâties sur des données de sujets.

**Exactitude.**
- Toutes les fractions, rapports, pourcentages et distances sont à produire par
  `transmission-outils.js` (échiquiers par produit des proportions des gamètes, jamais par comptage
  de cases écrites à la main) : 5 474 / 1 850 ≈ 2,96 ; 1 850 / 7 324 ≈ 25,3 % ; 6 022 / 2 001 ≈ 3,01 ;
  556 × 9/16 = 312,75 ; 102 / 151 ≈ 67,5 % ; 1,29 + 1,71 = 3 ; 67 − 48 = 19 ; (100 − 19) / 2 = 40,5.
- **Écarts d'arrondi des corrigés**, à vérifier sur l'image : PC 2024 R, le corrigé imprime
  « 67,54% » et « 32,45% » (102/151 = 67,55 % à l'arrondi) et « 24.33% » (110/452 = 24,34 % à
  l'arrondi) : il tronque, semble-t-il. L'étape `letal-calc` affiche la valeur calculée (« environ
  67,5 % ») et ne recopie pas le chiffre du corrigé.
- Centimorgan, « 1 % de recombinés » : [V] [Genetic linkage](https://en.wikipedia.org/wiki/Genetic_linkage)
  (« A centimorgan (cM) is a unit that describes a recombination frequency of 1% »).
- **À sourcer** : la borne de 50 % de recombinés (`cinquante`) ; la règle « croisements réciproques
  identiques → gène non lié au sexe » (`reciproques`), énoncée par la bible T2 pour le sujet 2026
  (non transcrit) ; aucun corrigé transcrit ne la formule ainsi (2022 N déduit « non lié au sexe »
  d'un document).
- Le nom « deuxième loi de Mendel » et son contenu (pureté des gamètes) : dans aucun corrigé transcrit
  (les corrigés citent la 1ère et la 3ème loi) ; à vérifier sur un manuel marocain.
- Les dominances des caractères des gabarits : celles des sujets (imprimées au corrigé) ; pour le pois,
  [S] comme ci-dessus.
- Notation : la forme exacte, sur l'image, des génotypes liés (fraction à deux traits) et des gamètes
  liés ; la virgule (SVT) ou le point-virgule (PC) dans les crochets.

**Pour le relecteur.**
1. **Le périmètre** : une leçon pour le sous-domaine entier **sauf** l'hérédité liée au sexe et la
   codominance (une leçon suivante, commune aux deux filières, sur le hamster 2026 de la bible T2).
   La capacité `3.2.1` / `2.4.1` reste alors « en partie » jusqu'à cette leçon. Ou bien deux séances
   dans cette leçon (T2 puis T3), ce qui porterait l'ensemble à environ 110 étapes ?
2. **Scène nouvelle `echiquier`** : à accorder. Elle porte deux modes (schéma de croisement,
   grille) ; le 4 × 4 n'est lisible à 390 px qu'en n'affichant que les phénotypes (§3.2).
3. **La scène `meiose`** a ses allèles écrits en dur : ajouter un paramètre `lab` à la scène commune
   (défaut inchangé ; captures de la leçon méiose à refaire), ou la copier dans
   `transmission-scenes-a.js` ?
4. **Notation** : génotypes liés en fraction (KaTeX, comme les corrigés) ou en ligne « G L // g ℓ »
   (comme la transcription) ? Crochets à virgule partout, en disant que les corrigés PC mettent un
   point-virgule ?
5. **Les sujets dans le corps de la leçon** : PC 2024 R (partie 4) et SVT 2024 R (partie 6) y servent
   de données réelles avant la partie « au bac ». C'est le plus fidèle au bac, mais l'élève les aura
   vus avant les exercices. D'accord ?
6. **`cinquante`** (au plus 50 % de recombinés) : ce n'est écrit dans aucun cadre ; c'est la réponse à
   une conception de la bible T3. Garder, ou marquer « pour aller plus loin » ?
7. **`reciproques`** dit qu'un réciproque différent signale un gène sur l'X sans le montrer : la leçon
   suivante le fera. Garder cette étape (elle sert la ligne « non lié au sexe » des corrigés) ?
8. **La lettre G** veut dire « jaune » chez les souris de la partie 4 (sujet PC) et « gris » chez
   celles de la partie 6 (sujet SVT) : les deux sujets l'imposent. Garder les symboles des sujets
   (proposé), ou en changer un dans la leçon ?
9. **60 étapes**, le haut de la fourchette. Si l'on coupe, les candidates sont `uniformite` et
   `retour-lies`.
10. **Route** : `/pilote/transmission` ; la leçon actuelle `content/svt/transmission-caracteres/` est
    remplacée, et les notes `notions_app` des trois cadres (« gènes liés différés ») seront à mettre à
    jour quand la leçon sera faite.

## 9. Décisions du relecteur (2026-11-24)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **Périmètre** : une seule séance. L'hérédité liée au sexe et la codominance feront la leçon
   suivante ; la capacité correspondante est dite « couverte en partie » dans la remise.
2. **Scène nouvelle `echiquier`** : accordée. L'auteur la construit d'abord, seule, et regarde ses
   captures : à 390 px, une grille 4 × 4 n'affiche que les phénotypes dans les cases.
3. **Scène `meiose`** : copiée dans les fichiers de scènes de cette leçon, avec les noms d'allèles en
   paramètre. Les fichiers de la leçon sur la méiose ne se modifient pas.
4. **Génotypes liés** : en fraction dans le panneau (comme les corrigés officiels) ; en ligne,
   « G L // g ℓ », dans les textes de scène.
5. **Deux questions d'examen comme données avant la partie « au bac »** : oui, citées exactement
   (année, session, filière, exercice).
6. **Étape `cinquante`** : gardée, une seule étape, sans chiffre autre que 50 %.
7. **Étape `reciproques`** : retirée, elle appartient à la leçon suivante. La leçon compte 59 étapes.
8. **Symboles** : ceux des sujets, redéfinis à chaque exercice (G n'a pas le même sens dans les deux
   exercices sur la souris : l'étape le dit).
9. **Coupes** : aucune autre.
10. **Route** : `/pilote/transmission`. L'ancienne leçon reste en place jusqu'au lancement.
11. **Mendel** : les effectifs (5 474 et 1 850 ; 315, 108, 101, 32) sont gardés, marqués [S] en tête du
    fichier d'outils, à relire sur le mémoire de 1866 avant la mise en ligne. « Deuxième loi » ne
    s'écrit pas à l'écran : la leçon dit « la ségrégation indépendante ».
12. **Arrondis** : dans l'exemple du bac, la valeur imprimée par le corrigé officiel fait foi, dite
    « valeur du corrigé » ; ailleurs, le code calcule.
