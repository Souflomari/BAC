# Spec v3 : noyaux, masse et énergie (`pc/noyaux-masse-energie`)

> Plan d'auteur pour la leçon pilote `/pilote/noyaux`, suite directe de `/pilote/radioactivite`.
> Règles : [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; modèle de ton, de rythme et de fichiers :
> `web/src/components/pilote/radioactivite-moteur.js` (+ `-outils.js`, `-scenes-{a,b,c}.js`). Fiche :
> bible N2 (`docs/bible/02-physique.md`). L'auteur suit ce plan étape par étape ; il rédige les textes,
> il ne décide ni l'ordre, ni les paris, ni les leurres. Tout nombre cité ici est à **recalculer par
> le code** (`noyaux-outils.js`, données et sources au §8.1) ; les valeurs écrites ci-dessous sont des
> contrôles faits à la main, pas des valeurs à recopier.
>
> **Scène d'un type nouveau demandée : une seule, `niveaux`** (le diagramme d'énergie, §3.2). Toutes
> les autres sont des copies adaptées de scènes existantes.

---

## 0. La leçon livrée (état au 2026-11-24)

Ce plan a été écrit avant la leçon. La leçon livrée (`web/src/components/pilote/noyaux-moteur.js`) compte **54 étapes** : la relecture pédagogique et visuelle du 2026-11-24 en a fusionné, retiré ou déplacé plusieurs. **Le fichier de la leçon fait foi** ; les sections 1 à 8 ci-dessous restent le plan d'origine (raisons, sources, leurres), avec ses comptes d'étapes d'alors. L'ordre livré :

| # | Partie | Étapes (clés, dans l'ordre) |
|---|---|---|
| 0 | Ce qu’il faut savoir | `sav-test`, `sav-rappel` |
| 1 | L’énigme | `soleil`, `charbon`, `gravite`, `aston`, `eddington` |
| 2 | Masse et énergie | `einstein`, `pile`, `un-gramme`, `mev-ev`, `u-mev` |
| 3 | Le défaut de masse | `peser`, `dm-def`, `calc-dm`, `v-dm` |
| 4 | L’énergie de liaison | `axe-energie`, `sens`, `formation`, `dm-inverse` |
| 5 | Comparer les noyaux | `par-nucleon`, `rn-po`, `u-par-nucleon`, `aston-courbe`, `aston-lire` |
| 6 | Le bilan d’une réaction | `rappel`, `trois-niveaux`, `bilan-masse`, `signe`, `deux-routes` |
| 7 | Fission et fusion | `deux-voies`, `fer-fer`, `fission-eq`, `fission-bilan`, `gramme`, `type` |
| 8 | Retour à l’énigme | `retour-eq`, `retour-de`, `retour-duree` |
| 9 | Usages et dangers | `usages`, `dangers` |
| 10 | Au bac | `bac`, `bac-elib`, `bac-dm-ecart`, `bac-dm`, `bac-copie`, `bac-2022-lit`, `bac-2022-num`, `bac-2b`, `bac-erreur` |
| 11 | Pour finir | `q1`, `q2`, `q3`, `fin` |

## 1. Périmètre

### 1.1 Capacités officielles couvertes

Chapitre « 2- Noyaux- Masse et énergie » du sous-domaine « Transformation nucléaires » (cadres 2025,
p. 6-7). Les identifiants PC et SM sont les mêmes ; **ceux de SVT sont décalés** à partir du 6ᵉ tiret
(le cadre SVT n'a ni fission ni fusion, voir 1.4).

| PC, SM | SVT | Libellé (cadre 2025, mot pour mot) | Où |
|---|---|---|---|
| `1.2.2.1` | `1.2.2.1` | Définir et calculer le défaut de masse et l'énergie de liaison. | parties 3, 4 |
| `1.2.2.2` | `1.2.2.2` | Définir et calculer l'énergie de liaison par nucléon et l'exploiter. | partie 5 |
| `1.2.2.3` | `1.2.2.3` | Utiliser les différentes unités de masse et d'énergie et les relations entre ces unités. (SM : « de masse, d'énergie et les relations… ») | parties 2, 4, 10 |
| `1.2.2.4` | `1.2.2.4` | Exploiter la courbe d'Aston pour identifier les noyaux les plus stables. | partie 5 |
| `1.2.2.5` | `1.2.2.5` | Connaître la relation d'équivalence masse-énergie et calculer l'énergie de masse. | partie 2 |
| `1.2.2.6` | — | Définir la fission et la fusion. | partie 7 |
| `1.2.2.7` | — | Analyser la courbe d'Aston pour dégager l'intérêt énergétique de la fission et la fusion. | partie 7 |
| `1.2.2.8` | — | Ecrire les équations des réactions nucléaires de fission et de fusion en appliquant les deux lois de conservation. | parties 7, 8 |
| `1.2.2.9` | — | Reconnaître le type de réaction nucléaire à partir de l'équation de la réaction. | partie 7 |
| `1.2.2.10` | `1.2.2.6` | Faire le bilan énergétique ΔE d'une réaction nucléaire en utilisant : les énergies de masse ; les énergies de liaisons ; le diagramme d'énergie. | parties 6, 8, 10 |
| `1.2.2.11` | `1.2.2.7` | Calculer l'énergie libérée (produite) par une réaction nucléaire : E_libérée = \|ΔE\| . | parties 6, 7, 10 |
| `1.2.2.12` | `1.2.2.8` | Reconnaître quelques applications de la radioactivité. | partie 9 |
| `1.2.2.13` | `1.2.2.9` | Connaître quelques dangers de la radioactivité. | partie 9 |

Préfixes : `pc-pc`, `pc-sm`, `pc-svt` (fichiers `docs/referentiel/pc-*.yaml`). Le dossier des exercices
ne peut pas reprendre le `CAP(...)` de `exercices/radioactivite.js` (même id dans les trois filières) :
il faut une table de correspondance PC/SM → SVT (§7).

Capacités réutilisées, enseignées dans la leçon voisine (prérequis, non testées seules ici) :
notation ᴬ_Z X et composition `1.2.1.1` ; les deux lois de conservation `1.2.1.6` ; écrire une
équation `1.2.1.8` ; reconnaître α, β⁻, β⁺ `1.2.1.9` ; le diagramme (N, Z) `1.2.1.3`, `1.2.1.4` ;
l'activité `1.2.1.10`, `1.2.1.11` (gabarit 12 seulement). Chimie de tronc commun : la mole et N_A.

### 1.2 Une seule séance

**Séance unique, « D'où vient l'énergie des noyaux »** (59 étapes) : l'énergie de masse, les unités
(u, MeV/c², eV, J), le défaut de masse, l'énergie de liaison et son sens, E_ℓ/A et la courbe d'Aston,
le bilan ΔE par les trois routes du cadre (énergies de masse, énergies de liaison, diagramme), la
fission et la fusion, le retour au Soleil, applications et dangers, deux sujets du bac. Le chapitre
tient en une séance : il n'y a pas, comme en maths, de second bloc de capacités réservé à une filière.

### 1.3 Hors programme, qu'on n'enseigne pas

La relativité restreinte (E = mc² est posée, pas démontrée) ; la formule de masse semi-empirique
(Bethe-Weizsäcker) et le modèle de la goutte liquide ; la réaction en chaîne, la masse critique, la
modération (aucun tiret du cadre ; une phrase au plus dans la fiche de mot `fission`) ; l'effet
tunnel et la température de fusion ; les neutrinos (absents des équations du cadre, comme dans la
leçon voisine pour β⁺) ; le détail de la chaîne proton-proton (on écrit seulement le bilan
4 ¹H → ⁴He + 2 e⁺, partie 8) ; les unités de dose (gray, sievert : aucun tiret). **Enrichissement
marqué comme tel** : « le nickel 62, et non le fer 56, est le noyau le plus lié par nucléon » (§8.2,
[V]) ; la leçon dit « vers le fer et le nickel » et n'en fait pas un pari.

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 6, 9 à 11 | entières | entières | entières |
| Partie 7 (fission, fusion) | entière | entière | **hors cadre** : sautée (bouton « passer », forme de `saut`) ou lue en « pour aller plus loin » ; à trancher, §8.3 |
| Partie 8 (retour) | `retour-eq` : l'élève écrit l'équation | idem | l'équation est donnée (variante de texte) ; `retour-de` reste (c'est un bilan ΔE, `pc-svt 1.2.2.6`) |
| Exemple du bac | 2020 N et 2023 N (sujets PC) | idem | idem (sujets PC : le cadre SVT a les mêmes tirets 1 à 5 et le bilan) |

`noyau.js` ne connaît pas de filière (aucune occurrence) : la partie 7 ne peut pas être masquée par
profil sans une demande à part (08 §1). La fiche bible pose déjà la question (« À trancher ») ;
§8.3, question 2.

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** Le Soleil brille depuis 4,6 milliards d'années [V]. En 1862, Kelvin écrit
que le feu chimique le plus énergétique, sur toute la masse du Soleil, ne donnerait « qu'environ
3 000 ans » de chaleur [V] ; même la contraction sous son propre poids ne lui en donne que 30 millions
[V]. **L'élève parie** sur la durée d'un Soleil chimique (`charbon`), voit l'échelle des durées
s'ouvrir sur six ordres de grandeur, puis **parie sur la pesée d'Aston (1920)** : quatre noyaux
d'hydrogène contre un noyau d'hélium (`aston`). Les quatre hydrogènes pèsent plus [V]. Eddington en
tire l'idée : le Soleil change de l'hydrogène en hélium, et la masse qui manque devient sa lumière
[V]. **Deux questions restent ouvertes : combien d'énergie vaut une masse qui manque ? et est-ce
assez pour 4,6 milliards d'années ?**

**Le retour (partie 8).** Les deux questions tombent avec les outils de la leçon :
1. l'équation 4 ¹₁H → ⁴₂He + 2 ⁰₁e s'écrit par les deux lois de conservation (Z impose 2 positons) ;
2. le bilan par les énergies de masse donne ΔE ≈ −24,7 MeV par hélium formé : environ 0,66 % de la
   masse de départ devient énergie ;
3. à ce taux, la masse du Soleil (1,988 × 10³⁰ kg) et sa puissance (3,828 × 10²⁶ W) donnent de
   l'ordre de 100 milliards d'années si tout son hydrogène y passait : des dizaines de millions de
   fois les 3 000 ans de Kelvin, et largement 4,6 milliards (Bahcall rapporte le même ordre pour le
   raisonnement d'Eddington, « about a 100 billion years » [V]).

Le fil rouge : « la masse qui manque est l'énergie qui sort ». Il revient dans le défaut de masse
(partie 3 : la masse qui manque au noyau est l'énergie qui est sortie quand il s'est formé), dans le
bilan (partie 6) et dans la fission de Meitner (partie 7 : « un cinquième de proton » de masse
manquante, environ 200 MeV [V]).

---

## 3. La chaîne des idées

1. Ce qu'on sait des noyaux (écrire une équation, les deux lois) → 2. l'énigme : aucune énergie
connue en 1862 ne fait briller le Soleil assez longtemps ; Aston trouve qu'une masse manque →
3. une masse au repos est une énergie : E = mc² ; elle s'exprime en u, MeV/c², J, eV ; 1 u ↔ 931,5 MeV
→ 4. un noyau pèse moins que ses nucléons séparés : le défaut de masse Δm > 0 → 5. sur une échelle
d'énergie, Δm·c² est la marche à **monter** pour défaire le noyau : l'énergie de liaison E_ℓ, à
fournir, pas une réserve → 6. pour comparer des noyaux de tailles différentes on divise par A : E_ℓ/A ;
portée en fonction de A, c'est la courbe d'Aston, au sommet vers le fer et le nickel → 7. une
réaction fait passer d'un niveau d'énergie à un autre : ΔE = (Σm produits − Σm réactifs)c², qu'on
lit aussi par les énergies de liaison ou sur un diagramme ; ΔE < 0 : énergie libérée, E_lib = |ΔE|
→ 8. monter vers le sommet de la courbe libère de l'énergie : casser un lourd (fission) ou unir
deux légers (fusion), pas deux noyaux du sommet → 9. ces outils résolvent l'énigme → 10. ce que la
radioactivité permet et ce qu'elle coûte → 11. le bac.

**Figure-clé : l'échelle d'énergie** (scène `niveaux`, 12 étapes, un changement chacune) :

| # | Étape | Le changement |
|---|---|---|
| 1 | `aston` (partie 1) | deux niveaux en **masse** (u) : « 4 ¹H » en haut ; le niveau « ⁴He » se révèle plus bas |
| 2 | `peser` (partie 3) | nouveau couple : « 2 p + 2 n séparés » seul ; le niveau du noyau ⁴He apparaît au `reveal` |
| 3 | `dm-def` | l'accolade Δm entre les deux niveaux |
| 4 | `calc-dm` | la valeur de Δm s'écrit sur l'accolade (après la saisie de l'élève) |
| 5 | `axe-energie` (partie 4) | l'axe change d'unité : u × 931,5 → MeV ; Δm devient Δm·c² |
| 6 | `sens` | la flèche montante « à fournir : E_ℓ » |
| 7 | `formation` | la flèche descendante « libérée à la formation » |
| 8 | `trois-niveaux` (partie 6) | nouveau diagramme : « nucléons séparés » en haut, « ²H + ³H » dessous ; le niveau « ⁴He + n » apparaît au `reveal` |
| 9 | `deux-routes` | le chemin en deux flèches : monter de ΣE_ℓ(réactifs), descendre de ΣE_ℓ(produits) |
| 10 | `deux-routes` (`apres`) | la flèche ΔE, des réactifs aux produits, orientée vers le bas |
| 11 | `retour-de` (partie 8) | le diagramme du Soleil : « 4 ¹H » et « ⁴He + 2 e⁺ » |
| 12 | `bac` (partie 10) | le diagramme du sujet 2020, valeurs absolues (énergies de masse en 10⁵ MeV), axe coupé |

Ses trois paris : `peser` (la taille de l'écart), `sens` (le sens de la flèche), `trois-niveaux` (où
tombent les produits). `aston` est le pari de l'énigme, posé sur la même figure.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 2 |
| 1 | L'énigme | Énigme | 6 |
| 2 | Masse et énergie | Masse | 5 |
| 3 | Le défaut de masse | Défaut | 6 |
| 4 | L'énergie de liaison | Liaison | 4 |
| 5 | Comparer les noyaux | Aston | 7 |
| 6 | Le bilan d'une réaction | Bilan | 6 |
| 7 | Fission et fusion | Fission | 7 |
| 8 | Retour à l'énigme | Retour | 3 |
| 9 | Usages et dangers | Usages | 2 |
| 10 | Au bac | Bac | 7 |
| 11 | Bilan | Bilan | 4 |

**59 étapes.** Notation des actions : **Q** question (une option `ok`, indice et second essai) ;
**P** pari de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ;
**M** manipulation (`ctl`, avec `need`). Dans les options : ✓ juste ; ✗ fausse, suivie de la
conception affrontée puis de l'idée du retour (B2). Les étiquettes de conception (B-1, I-3…) renvoient
au tableau du §5.

### 3.2 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `desint` | copie adaptée de `radioactivite-scenes-a.js` | deux cas seulement : polonium 210 → plomb 206 + α (partie 0, sujet 2020) ; n + uranium 235 → strontium 94 + xénon 140 + 2 n (partie 7) |
| `soleil` | copie adaptée de `choix` (`radioactivite-scenes-c.js`) | un axe logarithmique des durées, de 1 an à 10¹¹ ans ; des repères qui apparaissent un à un |
| `niveaux` | **nouvelle, type nouveau** | voir ci-dessous (la figure-clé) |
| `calcul` | copie adaptée de `masse` (`radioactivite-scenes-c.js`) | un encadré de données (lignes `fx`), une ligne de résultat masquée, révélée par `ok` |
| `nz` | copie adaptée de `nz` (`radioactivite-scenes-c.js`) | la vallée, sans flèche β⁻ ; trois points nommés : ⁴He, ⁵⁶Fe, ²³⁸U |
| `aston` | copie adaptée de `horloge` / `loi` (type existant « courbe avec lecture graphique ») | voir ci-dessous |
| `quiz`, `end` | copies de `radioactivite-scenes-c.js` | les pièges des copies ; le bilan (cinq lignes) |

Les scènes de la radioactivité s'enregistrent par module (`scenesA(ctx, O)`…) avec leur contenu :
on les **copie** dans `noyaux-scenes-a.js` / `-b.js`, on ne les importe pas. Les **outils** de
`radioactivite-outils.js` (`outilsScene`, `fr`, `sciF`, `TN`, `TS`, `nucT`) s'importent tels quels :
ce sont des fonctions sans contenu de leçon.

**Scène nouvelle `niveaux`** (diagramme d'énergie ; décision du propriétaire, 07 §3.3).
- *Pourquoi un type nouveau* : aucune scène existante ne dessine des niveaux horizontaux reliés par
  des flèches verticales cotées. Or c'est la forme exacte du bac (« le diagramme d'énergie »,
  `1.2.2.10` ; sujets 2020 N, SM N 2026 selon la bible), et la même figure porte les quatre idées
  du chapitre : masse manquante, E_ℓ à fournir, ΔE, lecture d'un diagramme. Elle remplace la
  « balance du noyau » de la bible (une balance serait un second type nouveau, pour une seule idée).
- Montre : un axe vertical à gauche (unité `u` ou `MeV`, graduations calculées) ; jusqu'à trois
  niveaux horizontaux (trait `k-ink`, étiquette du système à droite : « 2 p + 2 n séparés »,
  « noyau ⁴He »…, valeur à gauche) ; une accolade cotée entre deux niveaux ; des flèches verticales
  cotées (`k-a` pour celle du pari en cours, `k-ink` sinon) ; un axe coupé (deux traits obliques)
  quand les valeurs sont absolues et proches (sujet 2020 : 1,9553 à 1,9718 × 10⁵ MeV).
- Paramètres : `jeu` (le jeu de niveaux : `'H4'`, `'He'`, `'DT'`, `'soleil'`, `'po2020'`) ; `lvA`,
  `lvB`, `lvC` (0→1, chaque niveau descend à sa place) ; `dm` (accolade) ; `dmv` (valeur sur
  l'accolade) ; `axe` (0 : u ; 1 : MeV, les graduations se recalculent) ; `up`, `down` (flèches
  E_ℓ) ; `route` (les deux flèches par les nucléons séparés) ; `de` (flèche ΔE) ; `cut` (axe coupé).
  Toutes les positions viennent des valeurs de `noyaux-outils.js` ; les écarts trop petits pour se
  voir à l'échelle (Δm/m ≈ 0,75 %) sont **dilatés et le disent** : l'axe porte « échelle dilatée »
  dans le sous-titre, comme la flèche β⁻ « grossie dix fois » de la scène `nz`.
- L'élève ne manipule rien : la scène sert aux paris (les niveaux se placent au `reveal`).

**Scène copiée et adaptée `aston`** (la courbe d'Aston).
- Montre : A en abscisse (0 à 240), E_ℓ/A en ordonnée (0 à 9 MeV/nucléon), les points réels de
  15 noyaux (§8.1), puis la courbe qui les relie ; un curseur qui met en évidence un noyau et écrit
  « ⁵⁶Fe : 8,79 MeV/nucléon » ; une bande « les plus stables » ; deux flèches, fusion (de la gauche,
  vers le haut) et fission (de la droite, vers le haut) ; un point fantôme A = 112 (`fer-fer`).
- Paramètres : `pts` (les points apparaissent de gauche à droite), `curve`, `nuc` (indice du noyau
  désigné), `top` (bande des plus stables), `fu`, `fi` (flèches), `ff` (le pari fer + fer), `fiU`
  (les trois points U 235, Sr 94, Xe 140 surlignés), `inv` (option : tracé de −E_ℓ/A, pour les
  exercices, §8.3 question 7).
- L'élève manipule : le curseur à crans `nuc` (étape `aston-lire`), verrouillé tant que le pari
  `aston-courbe` n'est pas posé (comme le curseur `n` de l'exponentielle).

---

### Partie 0 : Ce qu'il faut savoir (scène `desint`, cas polonium)

- **`sav-test`** · `ctl:'saut'` · réussi du premier coup, on passe à `soleil` (forme de `sav-test` de
  la radioactivité). **V** sujet 2020 N, Ex. III, Q1 (0,5 pt) : « ²¹⁰₈₄Po → ᴬ_Z Pb + ⁴₂He : A et Z ? »
  ✓ A = 206, Z = 82. ✗ A = 206, Z = 84 : « α ne change que A » (I-5) → α emporte 2 protons. ✗ A = 208,
  Z = 82 : α emporte 4 nucléons, pas 2. ✗ A = 214, Z = 86 : on a ajouté au lieu de retrancher → les
  nucléons du père se partagent entre le fils et α.
- **`sav-rappel`** · deux rappels : les deux lois de conservation (A et Z, valables pour toute
  réaction nucléaire, fiche `soddy` copiée) ; une énergie se mesure en joules. Pas d'action.

### Partie 1 : L'énigme (scènes `soleil`, `niveaux`)

- **`soleil`** · scène `soleil`, repère « âge du Soleil : 4,6 milliards d'années » · le Soleil rayonne
  3,828 × 10²⁶ J chaque seconde, et depuis 4,6 milliards d'années (datation des météorites, la
  méthode de la leçon voisine). Pas d'action.
- **`charbon`** · tag `1862` · **P** « Si le Soleil était un immense feu chimique (le meilleur
  combustible, tout l'oxygène nécessaire), il aurait brillé… » options : « quelques milliers
  d'années » / « quelques millions d'années » / « quelques milliards d'années ». `reveal` : le repère
  « feu chimique : ≈ 3 000 ans (Kelvin, 1862) » se pose, six ordres de grandeur sous l'âge réel.
  Retours sans jugement (forme de `tiroir`) ; celui de la 3ᵉ option : « C'est ce qu'il faudrait. Le
  calcul de Kelvin donne mille fois moins que ton estimation la plus basse. » Conception affrontée :
  « l'énergie d'une réaction chimique est du même ordre que celle des étoiles » (I-7).
- **`gravite`** · repère « contraction : ≈ 30 millions d'années » · Kelvin cherche ailleurs : le
  Soleil qui se tasse sous son poids. Toujours 150 fois trop court. `fort` : en 1862, aucune énergie
  connue ne suffit. Pas d'action.
- **`aston`** · tag `1920` · scène `niveaux`, `jeu:'H4'`, `lvA:1` · Aston pèse les atomes un par un
  avec un spectrographe qu'il a construit. **P** « Il compare 4 noyaux d'hydrogène (4 protons) et 1
  noyau d'hélium (4 nucléons, dont 2 neutrons). » options : « les 4 hydrogènes pèsent plus » /
  « exactement pareil : 4 nucléons de chaque côté » / « l'hélium pèse plus : ses neutrons sont plus
  lourds que des protons ». `reveal` : `lvB:1`, le niveau ⁴He se pose plus bas ; « il manque moins
  de 1 % ». Conception affrontée : « la masse se conserve, comme en chimie » (B-1). La 3ᵉ option est
  défendable (m_n > m_p, vrai) : le retour le dit, puis montre que l'écart va dans l'autre sens.
- **`eddington`** · tag `1920 · Cardiff` [S] · **Q** « Eddington en tire une idée sur le Soleil. La
  masse qui manque… » ✓ est devenue de l'énergie : la lumière du Soleil. ✗ est une erreur de mesure :
  l'écart est le même à chaque pesée (B-2 « la masse manquante a disparu ») → elle ne disparaît pas,
  elle sort sous une autre forme. ✗ est restée cachée dans le noyau d'hélium : le niveau pesé est
  celui du noyau entier, rien n'y est caché.
- **`question`** · `fort` : « Combien d'énergie vaut une masse qui manque ? Assez pour 4,6 milliards
  d'années ? La leçon va le calculer. » Pas d'action.

### Partie 2 : Masse et énergie (scène `calcul`)

- **`einstein`** · la relation d'équivalence masse-énergie : tout système de masse m, au repos,
  possède l'[[energiemasse|énergie de masse]] E = mc² (Einstein ; c = 2,998 × 10⁸ m·s⁻¹). Si un
  système perd l'énergie ΔE, sa masse varie de Δm = ΔE/c². tex. **Q** « Une pile neuve se vide en
  allumant une lampe. Sa masse… » ✓ diminue, d'une quantité bien trop petite pour une balance.
  ✗ ne change pas : E = mc² ne concerne que les noyaux (I-1) → la relation vaut pour tout système ;
  à l'échelle chimique, Δm est infime. ✗ diminue de la masse des électrons partis dans le circuit :
  les électrons reviennent à la pile, le circuit est fermé.
- **`un-gramme`** · **V** « L'énergie de masse de 1 g de matière ? » ✓ ≈ 9 × 10¹³ J. ✗ ≈ 9 × 10¹⁶ J :
  m doit être en kilogrammes, 1 g = 10⁻³ kg (I-6). ✗ ≈ 3 × 10⁵ J : c est élevée au carré.
  Pas de comparaison « de la vie courante » dans les retours sans source chiffrée (B9).
- **`unite-u`** · l'[[uma|unité de masse atomique]] : 1 u = 1/12 de la masse d'un atome de carbone 12
  = 1,660 54 × 10⁻²⁷ kg, de l'ordre de la masse d'un nucléon. tex. Pas d'action.
- **`u-mev`** · **D** puis Q (B3) · lignes données : E = 1 u × c² = 1,660 54 × 10⁻²⁷ × (2,998 × 10⁸)²
  (r : E = mc² pour m = 1 u) ; E ≈ 1,492 × 10⁻¹⁰ J (r : le calcul). Pari « En MeV, sachant
  1 MeV = 1,602 × 10⁻¹³ J ? » ✓ E ≈ 931,5 MeV (on divise par 1,602 × 10⁻¹³). ✗ E ≈ 9,315 × 10⁸ MeV :
  on a divisé par 1,602 × 10⁻¹⁹, la valeur de 1 eV (B-7) → c'est 9,315 × 10⁸ **eV**. ✗ E ≈
  2,39 × 10⁻²³ MeV : multiplier au lieu de diviser → une énergie en J divisée par la taille d'un MeV.
  `apres` : tex 1 u ↔ 931,5 MeV/c² ; `html` : « Les sujets donnent 931,41, 931,49 ou 931,5 : prends
  celle de l'énoncé. » (2020 N, 2025 N, 2022 N, `docs/sujets/pc/`.)
- **`mev-ev`** · **V** « 1 MeV = ? J » ✓ 1,602 × 10⁻¹³ J. ✗ 1,602 × 10⁻¹⁹ J : c'est 1 eV (B-7) →
  méga = 10⁶. ✗ 1,602 × 10⁻²⁵ J : on a divisé par 10⁶ au lieu de multiplier.

### Partie 3 : Le défaut de masse (scènes `niveaux`, `calcul`)

- **`peser`** · pari de la figure 1/3 · `jeu:'He'`, `lvA:1` (« 2 p + 2 n séparés : 4,031 88 u ») ·
  **P** « Les mêmes 2 protons et 2 neutrons, assemblés en noyau d'hélium. Il pèse… » options :
  « autant : ce sont les mêmes nucléons » / « moins, de moins de 1 % » / « moins, d'environ un quart ».
  `reveal` : `lvB:1` (« noyau ⁴He : 4,001 51 u »). Conception B-1. Retour de la 3ᵉ option : l'écart
  est de 0,75 %, pas de 25 % ; une masse « manquante » de 25 % serait un nucléon entier.
- **`dm-def`** · `dm:1` · le [[defautmasse|défaut de masse]] d'un noyau ᴬ_Z X : tex
  Δm = Z·m_p + (A − Z)·m_n − m(ᴬ_Z X) ; `fort` : Δm > 0 pour tout noyau. Pas d'action.
- **`calc-dm`** · **M** `ctl:'dm'` (copie du contrôle `n0` de la radioactivité : saisie, « Vérifier »,
  « Voir le calcul ») · `need` · scène `calcul` avec m_p = 1,007 28 u, m_n = 1,008 66 u,
  m(⁴He) = 4,001 51 u · « Calcule Δm(⁴He), en u. » Juste : ≈ 0,030 37 u (`dmv:1` sur la figure).
  Retours ciblés (forme de `noteN0`) : 0,027 61 → « tu as compté 4 protons » ; −0,030 37 → « le noyau
  moins les nucléons : l'ordre est inversé » ; 8,033 39 → « tu as additionné le noyau » ; 0,001 38 →
  « m_n − m_p n'est pas Δm ».
- **`n-neutrons`** · **Q** « Uranium 235 (Z = 92) : Δm = 92 m_p + ? × m_n − m(U) » ✓ 143. ✗ 235 :
  A compte tous les nucléons, pas les neutrons (I-5) → N = A − Z. ✗ 92 : un noyau lourd n'a pas autant
  de neutrons que de protons → N = 235 − 92.
- **`atomique`** · **Q** « Un tableau donne la masse de l'*atome* d'hélium, 4,002 60 u, et tu la
  places dans Δm avec m_p et m_n. Le résultat… » ✓ est faux : l'atome compte aussi 2 électrons, il
  faut la masse du noyau. ✗ est juste : les électrons ne pèsent presque rien (B-8) → 2 électrons,
  c'est 0,001 1 u, plus de 3 % de Δm (0,029 28 u au lieu de 0,030 37). ✗ est juste si l'on ajoute
  les électrons à la masse de l'atome : on s'éloigne encore, il faut les retirer. **[À VÉRIFIER :
  convention des sujets (masses de noyaux ou d'atomes) avant d'écrire cette étape ; §8.2.]**
- **`v-dm`** · **V** « Défaut de masse du tritium ³₁H (m = 3,015 50 u) ? » ✓ 0,009 10 u. ✗ 0,007 72 u :
  Z et N inversés (2 protons, 1 neutron) (I-5). ✗ 0,006 34 u : trois protons comptés → 1 proton et
  2 neutrons. ✗ −0,009 10 u : l'ordre de la soustraction (B-1) → Δm > 0.

### Partie 4 : L'énergie de liaison (scène `niveaux`)

- **`axe-energie`** · `axe:1` · l'axe passe des u aux MeV (× 931,5) ; l'écart Δm devient une marche
  d'énergie Δm·c². `fort` : masse et énergie, une seule échelle. Pas d'action.
- **`sens`** · pari de la figure 2/3 · **P** « Le noyau est 28,3 MeV sous ses nucléons séparés. Pour
  le défaire en 4 nucléons libres… » options : « il faut lui fournir 28,3 MeV » / « il libère
  28,3 MeV » / « rien : il suffit d'attendre qu'il se défasse ». `reveal` : `up:1`, la flèche monte.
  `apres` : l'[[energieliaison|énergie de liaison]] E_ℓ = Δm·c², tex. Conception B-3 (« E_ℓ est une
  réserve que le noyau libère »). Retour de la 3ᵉ option : un noyau d'hélium ne se défait jamais seul :
  il est en bas de la marche.
- **`formation`** · `down:1` · la même marche, descendue : 28,3 MeV sortent quand les nucléons
  s'assemblent ; c'est l'énergie qu'il faudra rendre pour les séparer. **V** « Un noyau d'hélium au
  repos, laissé seul… » ✓ ne libère rien. ✗ libère peu à peu ses 28,3 MeV (B-3) → E_ℓ n'est pas en
  lui : elle est sortie à sa formation. ✗ se défait en ses 4 nucléons : il faudrait lui fournir E_ℓ.
- **`el-calc`** · **D** puis Q · ligne donnée : E_ℓ = Δm·c² avec Δm = 0,030 37 u (r : la définition).
  Pari « La ligne suivante ? » ✓ E_ℓ = 0,030 37 × 931,5 ≈ 28,29 MeV. ✗ E_ℓ = 0,030 37 × (3,00 × 10⁸)²
  ≈ 2,7 × 10¹⁵ J : u traité comme kg (I-6, B-6). ✗ E_ℓ = 0,030 37 / 931,5 ≈ 3,3 × 10⁻⁵ MeV : le
  facteur dans le mauvais sens (B-6). `apres` : tex E_ℓ(⁴He) ≈ 28,3 MeV.

### Partie 5 : Comparer les noyaux (scènes `nz`, `calcul`, `aston`)

- **`stables`** · scène `nz`, trois points ⁴He, ⁵⁶Fe, ²³⁸U · pont avec la leçon voisine : le diagramme
  (N, Z) dit si un noyau est stable ; il ne dit pas lequel tient le mieux ses nucléons. Pas d'action.
- **`rn-po`** · scène `calcul` · sujet 2019 N, Ex. II, Q1 (0,5 pt), données réécrites en E_ℓ :
  E_ℓ(²²²Rn) = 1 707,2 MeV ; E_ℓ(²¹⁸Po) = 1 685,1 MeV. **P** « Lequel est le plus stable ? » options :
  « le radon : il faut plus d'énergie pour le défaire » / « le polonium » / « on ne peut pas savoir
  sans A ». `reveal` : divisé par A : 7,69 contre 7,73 MeV/nucléon (les valeurs imprimées dans le
  sujet). Conception B-4 (« plus E_ℓ est grande, plus le noyau est stable »). Le leurre « radon »
  mène bien à une réponse fausse (le sujet attend le polonium).
- **`par-nucleon`** · l'[[energieliaisonnucleon|énergie de liaison par nucléon]] E_ℓ/A, en
  MeV/nucléon ; tex. `fort` : on compare E_ℓ/A ; plus elle est grande, plus le noyau est stable.
  Pas d'action.
- **`u-par-nucleon`** · **V** « Uranium 235 : E_ℓ ≈ 1 784 MeV, Z = 92. E_ℓ/A ? » ✓ ≈ 7,59 MeV/nucléon.
  ✗ ≈ 19,4 : divisé par Z → A compte tous les nucléons. ✗ ≈ 12,5 : divisé par N. (E_ℓ(²³⁵U) à
  vérifier, §8.1.)
- **`aston-courbe`** · scène `aston`, `pts:0→1` en 2 s (points sans noms d'axe superflus) · **P**
  « Porte E_ℓ/A en fonction de A, pour tous les noyaux. Les plus liés par nucléon sont… » options :
  « les plus lourds, à droite » / « au milieu, vers A ≈ 60 » / « les plus légers, à gauche ».
  `reveal` : `curve:1, top:1`. Conceptions I-3 (« les légers sont en haut ») et « plus lourd, plus
  stable ». `apres` : la [[aston|courbe d'Aston]] ; sommet vers le fer et le nickel.
- **`aston-lire`** · **M** `ctl:'nuc'`, crans sur les 15 noyaux · `need` : trois noyaux désignés dont
  un de A > 100 (ou « Montre-moi » après 20 s) · la scène écrit « ²³⁵U : 7,59 MeV/nucléon ». Idée :
  la courbe monte vite, culmine, redescend lentement.
- **`v-aston`** · **V** « Le plus stable : ¹²C, ⁵⁶Fe ou ²³⁸U ? » ✓ ⁵⁶Fe. ✗ ²³⁸U : la plus grande E_ℓ,
  pas la plus grande E_ℓ/A (B-4). ✗ ¹²C : petit n'est pas solide ; il est sur la montée de la
  courbe (I-3).

### Partie 6 : Le bilan d'une réaction (scènes `calcul`, `niveaux`)

- **`rappel`** · scène `calcul` · `sujet:'E_ℓ et E_ℓ/A'` · texte : mi-parcours, c'est le bon moment
  pour une pause ; un rappel avant de repartir. **V** « ²⁰⁸Pb : E_ℓ ≈ 1 636 MeV ; ⁵⁶Fe : E_ℓ ≈ 492 MeV.
  Le plus stable ? » ✓ le fer (8,79 contre 7,87 MeV/nucléon). ✗ le plomb : E_ℓ totale (B-4).
  ✗ « on ne compare pas des noyaux de tailles différentes » : c'est justement ce que permet E_ℓ/A.
- **`bilan-masse`** · **D** puis Q · une réaction entre deux noyaux légers, nommée en partie 7 :
  ²₁H + ³₁H → ⁴₂He + ¹₀n. Lignes données : ΔE = Δm·c² avec Δm = Σm(produits) − Σm(réactifs)
  (r : la masse qui change, après moins avant) ; Σm(réactifs) = 2,013 55 + 3,015 50 = 5,029 05 u.
  Pari « Σm(produits) ? » ✓ 4,001 51 + 1,008 66 = 5,010 17 u. ✗ 4,001 51 u : le neutron émis oublié
  (B-9) → Δm ≈ −1,028 u, ΔE ≈ −957 MeV, absurde. ✗ 4,001 51 + 2 × 1,008 66 = 6,018 83 u : un neutron
  de trop → vérifie A : 2 + 3 = 4 + 1. `apres` : Δm ≈ −0,018 88 u ; ΔE ≈ −17,59 MeV.
- **`signe`** · **Q** « ΔE ≈ −17,6 MeV. Ce signe veut dire… » ✓ le système perd 17,6 MeV : elle est
  libérée. ✗ la réaction absorbe 17,6 MeV (I-8, B-5) → ΔE < 0 : le système finit plus bas. ✗ rien, seule
  la valeur compte : le signe dit le sens de l'échange. `apres` : tex E_lib = |ΔE| ([[energieliberee]]).
- **`trois-niveaux`** · pari de la figure 3/3 · `jeu:'DT'`, `lvA:1` (nucléons séparés), `lvB:1`
  (²H + ³H, 10,71 MeV dessous) · **P** « Où placer ⁴He + n, faits des mêmes 5 nucléons ? » options :
  « plus bas que ²H + ³H » / « plus haut » / « au même niveau : mêmes nucléons ». `reveal` : `lvC:1`
  (28,30 MeV sous les nucléons séparés). Conception B-1, transposée (mêmes nucléons, même énergie).
- **`deux-routes`** · **D** puis Q · `route:1` · lignes : réactifs → nucléons séparés : on fournit
  E_ℓ(²H) + E_ℓ(³H) (r : on défait les réactifs) ; nucléons séparés → produits : on récupère E_ℓ(⁴He)
  (r : on assemble les produits ; E_ℓ(n) = 0). Pari « Donc ΔE = ? » ✓ [E_ℓ(²H) + E_ℓ(³H)] − E_ℓ(⁴He)
  = 2,225 + 8,482 − 28,296 ≈ −17,59 MeV. ✗ E_ℓ(⁴He) − [E_ℓ(²H) + E_ℓ(³H)] ≈ +17,59 MeV : le sens
  inversé (B-5) → on monte de ce qu'on défait, on descend de ce qu'on forme. ✗ 1,112 + 2,827 − 7,074
  ≈ −3,14 MeV : des E_ℓ/A additionnées (« E_ℓ/A additionnées », ajouté) → ce sont les E_ℓ qui
  s'additionnent. `apres` : `de:1` ; `fort` : la même valeur que par les masses ; tex
  ΔE = ΣE_ℓ(réactifs) − ΣE_ℓ(produits).
- **`v-neutron`** · **V** « Dans ce bilan, E_ℓ du neutron vaut… » ✓ 0 : un nucléon seul n'a rien à
  défaire. ✗ 939,6 MeV : c'est son énergie de masse, pas une énergie de liaison. ✗ 7,07 MeV, comme
  un nucléon de l'hélium : hors d'un noyau, aucune liaison.

### Partie 7 : Fission et fusion (scènes `aston`, `desint`, `calcul`) · PC, SM

- **`deux-voies`** · `fu:1, fi:1` · deux façons de monter vers le sommet : la [[fusion]] (deux noyaux
  légers s'unissent ; la réaction de la partie 6 en est une) et la [[fission]] (un noyau lourd,
  frappé par un neutron, se casse en deux noyaux moyens). `fort` : monter sur la courbe, c'est
  descendre sur l'échelle d'énergie. Pas d'action.
- **`fer-fer`** · `ff:1` · **P** « Deux noyaux de fer 56 fusionnent en un noyau de A = 112. De
  l'énergie est-elle libérée ? » options : « oui : toute fusion libère de l'énergie » / « non : à
  A = 112, on est plus bas sur la courbe » / « oui, mais moins qu'avec de l'hydrogène ». `reveal` :
  le point fantôme à A = 112 (≈ 8,5 MeV/nucléon, à vérifier) sous le fer (8,79). Conception I-2
  (« fusion et fission libèrent toujours »). Retour : il faudrait fournir de l'énergie.
- **`hahn`** · tag `1938 · Kungälv` · scène `desint`, cas fission, `rv:0` · fin 1938, Hahn trouve du
  baryum dans de l'uranium bombardé de neutrons. Meitner et Frisch comprennent : le noyau s'est cassé,
  et les morceaux pèsent environ un cinquième de proton de moins. **Q** « Quelle énergie pour une
  seule cassure ? » ✓ environ 190 MeV (0,2 × 1,007 u × 931,5). ✗ environ 0,2 MeV : u pris pour MeV
  (B-6) → 1 u ↔ 931,5 MeV. ✗ environ 1,8 × 10¹⁶ J : u pris pour kg dans mc² (I-6). Retour du ✓ :
  « Ils trouvent environ 200 MeV, par deux calculs différents. » `reveal` : `rv:1`.
- **`fission-eq`** · **Q** « ¹₀n + ²³⁵₉₂U → ⁹⁴₃₈Sr + ¹⁴⁰₅₄Xe + x ¹₀n : x ? » ✓ 2 (1 + 235 = 94 + 140 + 2).
  ✗ 1 : le neutron incident oublié dans le compte de A (I-5, B-9). ✗ 0 : seule la loi de Z appliquée,
  qui ne voit pas les neutrons → les deux lois, ensemble. `apres` : tex de l'équation.
- **`fission-bilan`** · scène `aston`, `fiU:1` · **D** puis Q · lignes : E_ℓ(²³⁵U) ≈ 1 783,9 MeV ;
  E_ℓ(⁹⁴Sr) ≈ 807,8 MeV ; E_ℓ(¹⁴⁰Xe) ≈ 1 160,7 MeV (r : A × E_ℓ/A, lus sur la courbe ; à vérifier,
  §8.1). Pari « E_lib ? » ✓ 807,8 + 1 160,7 − 1 783,9 ≈ 184,6 MeV. ✗ 8,59 + 8,29 − 7,59 ≈ 9,3 MeV :
  E_ℓ/A additionnées. ✗ 807,8 + 1 160,7 + 1 783,9 ≈ 3 752 MeV : tout additionné → on fournit E_ℓ
  du père, on récupère celles des fils.
- **`gramme`** · scène `calcul` · **Q** « 1 g d'uranium 235 : N = (1/235) × 6,02 × 10²³ ≈ 2,6 × 10²¹
  noyaux. S'ils fissionnent tous, à 185 MeV chacun : E ≈ ? » ✓ ≈ 7,6 × 10¹⁰ J. ✗ ≈ 4,7 × 10²³ J :
  des MeV écrits comme des joules (B-7) → × 1,602 × 10⁻¹³. ✗ ≈ 7,6 × 10⁴ J : converti avec la valeur
  de l'eV (B-7). `apres` : `html` « Une combustion du carbone libère environ 4 eV par réaction ; une
  fission, environ 185 MeV : quarante millions de fois plus. » (valeur chimique : §8.1, à vérifier).
  Conception I-7.
- **`type`** · **V** (capacité `1.2.2.9`) « Laquelle est une fission ? » ✓ ¹₀n + ²³⁵₉₂U → ⁹⁴₃₈Sr +
  ¹⁴⁰₅₄Xe + 2 ¹₀n. ✗ ²³⁸₉₂U → ²³⁴₉₀Th + ⁴₂He : un noyau lourd perd aussi des nucléons, mais c'est une
  désintégration α spontanée (I-4) → la fission, provoquée par un neutron, donne deux noyaux moyens.
  ✗ ²₁H + ³₁H → ⁴₂He + ¹₀n : deux légers s'unissent, c'est une fusion (I-4).

### Partie 8 : Retour à l'énigme (scènes `niveaux`, `soleil`)

- **`retour-eq`** · **Q** (PC, SM ; en SVT l'équation est donnée et l'étape devient une phrase,
  §1.4) « Dans le Soleil, au bout d'une suite de réactions : 4 ¹₁H → ⁴₂He + 2 X. X ? » ✓ un positon
  ⁰₁e (Z : 4 = 2 + 2 × 1). ✗ un électron ⁰₋₁e : la charge ne se conserve pas, 4 ≠ 2 − 2 (I-5).
  ✗ un neutron ¹₀n : le nombre de nucléons ne se conserve pas, 4 ≠ 4 + 2.
- **`retour-de`** · `jeu:'soleil'` · **D** puis Q · ligne : Δm = m(⁴He) + 2 m(e) − 4 m(p) (r : après
  moins avant). Pari « ΔE ? » ✓ (4,001 51 + 2 × 0,000 55 − 4 × 1,007 28) × 931,5 ≈ −24,7 MeV. ✗ ≈
  −25,7 MeV : les deux positons oubliés (B-9, transposé). ✗ ≈ +24,7 MeV : réactifs moins produits
  (B-5). `apres` : environ 0,66 % de la masse d'hydrogène devient énergie.
- **`retour-duree`** · scène `soleil`, repère « fusion de l'hydrogène : ≈ 100 milliards d'années, si
  tout l'hydrogène y passait » · texte dépendant du pari `charbon` (forme de `rappelEnigme`) ; `fort` :
  « Moins de 1 % de masse changée en énergie suffit : des dizaines de millions de fois le feu de
  Kelvin. » Pas d'action. Ce que ça a changé : la lumière des étoiles, puis l'énergie nucléaire.

### Partie 9 : Usages et dangers (scène `quiz`, copie adaptée)

- **`usages`** · texte : quelques [[applications]] : produire de l'électricité (fission) ; soigner
  (iode 131) et voir l'intérieur du corps (fluor 18, imagerie TEP) ; dater (carbone 14) ; alimenter un
  stimulateur cardiaque (plutonium 238, sujet 2021). (Sources : `radioactivite-outils.js` 7, 8 ; OMS.)
  **Q** « Le stimulateur au plutonium 238 tire son énergie… » ✓ des désintégrations α du plutonium.
  ✗ de fissions : désintégration et fission confondues (I-4) → aucun neutron ne casse le noyau. ✗
  d'une pile chimique ordinaire : c'est justement une source nucléaire, de longue durée.
- **`dangers`** · texte : les rayonnements ionisants abîment les tissus ; à forte dose : brûlures,
  syndrome d'irradiation aiguë ; à faible dose : un risque accru de cancer à long terme [V OMS].
  **Q** « Un ouvrier inhale des poussières radioactives. Par rapport à une source posée loin de
  lui… » ✓ l'exposition continue même s'il s'éloigne : la source est en lui (contamination interne).
  ✗ s'éloigner de la zone suffit à l'arrêter : c'est vrai de l'irradiation externe, pas d'une
  source inhalée. ✗ aucun risque, les rayonnements ne traversent pas la peau : ici, ils n'ont pas à
  la traverser. Conception : « irradiation et contamination, c'est pareil » (ajoutée, source OMS).

### Partie 10 : Au bac (scènes `niveaux`, `calcul`) — voir §6

`bac`, `bac-elib`, `bac-dm`, `bac-copie`, `bac-2a`, `bac-2b`, `bac-erreur`.

### Partie 11 : Bilan (scènes `quiz`, `end`)

- **`q1`** · QCM du bac 2023 N, Ex. 2, Q1-1 (items D et E) · **Q** « Laquelle est juste ? » ✓ « Lors
  d'une réaction de fission nucléaire, de la masse est convertie en énergie. » ✗ « La masse d'un noyau
  atomique est égale à la somme des masses de ses nucléons. » (B-1) → Δm > 0. ✗ « aucune des deux » :
  la première est la définition même du bilan.
- **`q2`** · la stabilité · **Q** « Le plus stable de deux noyaux est celui qui a la plus grande… »
  ✓ E_ℓ/A. ✗ E_ℓ (B-4). ✗ masse : la masse ne dit rien de la liaison.
- **`q3`** · le signe · **Q** « Une réaction a ΔE = +3,2 MeV. » ✓ il faut lui fournir 3,2 MeV. ✗ elle
  libère 3,2 MeV (I-8, B-5). ✗ elle libère |ΔE| = 3,2 MeV, comme toutes : E_lib = |ΔE| ne vaut que si
  ΔE < 0.
- **`fin`** · scène `end` (cinq lignes : E = mc², 1 u ↔ 931,5 MeV/c² ; un noyau pèse moins que ses
  nucléons ; E_ℓ est à fournir ; on compare E_ℓ/A, sommet vers le fer ; ΔE < 0 : E_lib = |ΔE|, fission
  et fusion montent vers le sommet) · la fin de séance (forme de `profileHTML`) : « Vérifie » réussies,
  les paris `charbon`, `aston`, `sens`, `rn-po`, `fer-fer` rappelés, le lien vers les exercices, et le
  renvoi piège par piège (B7) : masse conservée → gabarits 3 et 14 ; E_ℓ contre E_ℓ/A → 5 ; signe de
  ΔE → 9 ; E_ℓ/A additionnées → 10 ; unités et 931,5 → 1 et 11 ; neutrons oubliés → 7.

---

## 4. La pause et le rappel (A8)

La pause est proposée à la frontière des parties 5 et 6, dans le texte de l'étape **`rappel`**,
31ᵉ étape sur 59 (53 %, dans la fourchette 30 % à 70 %). Sa question « Vérifie » : **²⁰⁸Pb
(E_ℓ ≈ 1 636 MeV) ou ⁵⁶Fe (E_ℓ ≈ 492 MeV) : le plus stable ?** (✓ le fer ; leurres ci-dessus). Elle
mêle l'énergie de liaison (partie 4) et sa division par A (partie 5), et rejoue la conception B-4
sur un autre couple que `rn-po`.

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 2
(`sav-rappel`, `soleil` ; `dm-def`, `calc-dm` ; `stables` seul ; `deux-voies` seul ; `retour-duree`
seul). Les manipulations `calc-dm` et `aston-lire` ne comptent pas comme actions pour A7 et ne sont
jamais deux de suite. A6 : aucune option « je ne sais pas ».

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Sources : bible N2, « Conceptions erronées et pièges » (B-) ; `content/pc/noyaux-masse-energie/items.yaml`,
cinq `misconceptions` (I-) ; ajoutées ici, avec leur raison.

| # | Conception | Source | Étapes |
|---|---|---|---|
| B-1 | le noyau assemblé pèse autant que ses nucléons (la masse se conserve) | bible ; items `defaut-masse-et-equivalence` | `aston`, `peser`, `v-dm`, `trois-niveaux`, `q1` |
| B-2 | la masse manquante a disparu (erreur de mesure, détruite) | bible ; items idem | `eddington`, `q1` |
| B-3 | l'énergie de liaison est une réserve que le noyau libère | bible ; items `energie-liaison-par-nucleon-et-aston` | `sens`, `formation`, `bac-2a` |
| B-4 | plus E_ℓ est grande, plus le noyau est stable | bible ; items idem | `rn-po`, `v-aston`, `rappel`, `q2` |
| B-5 | signe de ΔE et sens des flèches du diagramme | bible ; items `signe-delta-m-bilan` | `signe`, `deux-routes`, `retour-de`, `bac`, `q3` |
| B-6 | 931,5 MeV par u mal utilisé | bible ; items `unites-et-ordres-de-grandeur` | `el-calc`, `hahn`, `bac-dm` |
| B-7 | MeV et eV confondus | bible ; items idem | `u-mev`, `mev-ev`, `gramme` |
| B-8 | masses atomiques au lieu de masses nucléaires, sans le dire | bible (« À VÉRIFIER ») | `atomique` (étape suspendue à la vérification, §8.2) |
| B-9 | oublier les neutrons émis (ou une particule) dans le bilan | bible (piège de copie) ; items `signe-delta-m-bilan` (« réactif/produit oublié ») | `bilan-masse`, `fission-eq`, `retour-de` |
| I-1 | E = mc² réservé aux noyaux | items `defaut-masse-et-equivalence` | `einstein` |
| I-2 | fusion et fission « libèrent toujours » | items `energie-liaison-par-nucleon-et-aston` | `fer-fer` |
| I-3 | les noyaux légers sont en haut de la courbe | items idem | `aston-courbe`, `v-aston` |
| I-4 | fission et fusion confondues (et avec une désintégration) | items idem | `type`, `usages` |
| I-5 | une loi de Soddy oubliée ; neutron incident oublié ; A pris pour N ; Z(n) = 1 | items `conservation-A-Z` | `sav-test`, `n-neutrons`, `v-dm`, `fission-eq`, `retour-eq` |
| I-6 | une masse en u (ou en g) mise dans mc² avec c en m/s | items `unites-et-ordres-de-grandeur` | `un-gramme`, `el-calc`, `hahn` |
| I-7 | l'écart chimique / nucléaire mal estimé (10 ou 10¹² au lieu de ~10⁶ à 10⁸) | items idem | `charbon`, `gramme` |
| I-8 | Δm > 0 (ou ΔE > 0) lu comme énergie libérée | items `signe-delta-m-bilan` | `signe`, `q3` |
| + | E_ℓ/A additionnées dans un bilan | ajouté : c'est le leurre 7,11 MeV du QCM 2019 N, Q3 | `deux-routes`, `fission-bilan`, `bac-2b`, `bac-erreur` |
| + | E_ℓ du neutron non nulle (confondue avec son énergie de masse) | ajouté : leurre naturel de la route par les E_ℓ | `v-neutron` |
| + | lire l'écart le plus grand d'un diagramme comme E_lib | ajouté : forme du sujet 2020 | `bac`, `bac-elib` |
| + | irradiation et contamination confondues | ajouté (OMS, §8.1) | `dangers` |

Toutes les conceptions de la fiche bible sont affrontées. B-8 l'est par une étape que le relecteur
peut suspendre tant que la convention des sujets n'est pas établie (§8.2) : dans ce cas B-8 n'est
couverte que par la fiche de mot `masse du noyau`, et c'est une limite connue de B5 pour cette leçon.

---

## 6. Au bac (B6)

**L'exemple commenté** — bac PC 2020, session normale (NS28F), Exercice III « Désintégration du
polonium 210 », Q2-1 (0,5 pt) et Q2-2 (0,5 pt), barème imprimé en marge
(`docs/sujets/pc/noyaux-masse-energie.md`, statut vérifié) : à l'aide du diagramme d'énergie, calculer
l'énergie libérée par la désintégration d'un noyau, puis le défaut de masse Δm du polonium 210 en kg.
Données du sujet : 1 u = 931,41 MeV/c² ; 1 u = 1,66 × 10⁻²⁷ kg ; niveaux 1,971 820 × 10⁵ MeV (126 n +
84 p), 1,955 372 × 10⁵ MeV (²¹⁰₈₄Po), 1,955 318 × 10⁵ MeV (²⁰⁶₈₂Pb + ⁴₂He).

- **`bac`** · scène `niveaux`, `jeu:'po2020'`, `cut:1` · « Premier geste ? » (pari sans `ok`, comme
  `bac-geste` de la radioactivité et `bac` de l'exponentielle ; `reveal` : les trois niveaux s'étiquettent). Options : « Nommer chaque niveau,
  puis repérer l'écart entre le noyau père et les produits » (le bon réflexe : chaque écart est une
  grandeur différente) ; « Soustraire le niveau le plus bas du plus haut » (c'est E_ℓ des produits,
  pas l'énergie libérée) ; « Convertir d'abord les trois niveaux en kilogrammes » (inutile : on
  soustrait d'abord, on convertit un seul résultat).
- **`bac-elib`** · **Q** « E_lib ? » ✓ 1,955 372 × 10⁵ − 1,955 318 × 10⁵ = 5,4 MeV. ✗ 1 650,2 MeV :
  nucléons séparés moins produits, c'est E_ℓ(Pb) + E_ℓ(He). ✗ 1 644,8 MeV : nucléons séparés moins
  noyau père, c'est E_ℓ(Po) (elle sert à la question suivante). `apres` : tex E_lib = |ΔE| = 5,4 MeV.
- **`bac-dm`** · **D** puis Q · lignes : E_ℓ(Po) = (1,971 820 − 1,955 372) × 10⁵ = 1 644,8 MeV (r :
  nucléons séparés moins noyau) ; Δm = E_ℓ/c² = 1 644,8 MeV/c² (r : E_ℓ = Δm·c²). Pari « En kg ? »
  ✓ 1 644,8 / 931,41 ≈ 1,766 u, puis × 1,66 × 10⁻²⁷ ≈ 2,93 × 10⁻²⁷ kg. ✗ 1 644,8 × 1,66 × 10⁻²⁷ ≈
  2,73 × 10⁻²⁴ kg : des MeV/c² traités comme des u (B-6). ✗ 1 644,8 × 931,41 × 1,66 × 10⁻²⁷ ≈
  2,54 × 10⁻²¹ kg : le facteur 931,41 dans le mauvais sens (B-6).
- **`bac-copie`** · `html` (forme de `bac-copie` de la radioactivité) : la rédaction attendue en quatre
  lignes (E_lib = E(Po) − E(Pb + He) = 5,4 MeV ; E_ℓ(Po) = E(126 n + 84 p) − E(Po) ; Δm = E_ℓ/c² ;
  conversion). Barème : 0,5 + 0,5 (cité du sujet). « La formule littérale avant l'application
  numérique » : consigne imprimée des sujets (radioactivite-outils, source 10). Pas d'action.

**Le second exemple, que l'élève complète** — bac PC 2023, session normale (NS 28F), Exercice 2, §2
« Réaction de fusion du tritium et de deutérium », 2-1 a- (0,25 pt), 2-1 b- (0,25 pt), 2-2 (0,5 pt),
barème imprimé en marge (même fichier, statut vérifié, passe adversariale). Données du sujet :
E_ℓ(²H) = 2,366 MeV ; E_ℓ(³H) = 8,475 MeV ; E_ℓ(⁴He) = 28,296 MeV. L'élève choisit deux lignes :

- **`bac-2a`** · **Q** 2-1 a- « Vrai ou faux, en justifiant : l'énergie qu'il faut fournir à un noyau de
  tritium au repos pour le dissocier en ses nucléons au repos est de 8,475 MeV. » ✓ « Vrai : c'est la
  définition de E_ℓ(³H). » ✗ « Faux : il faut fournir E_ℓ/A = 2,825 MeV » : E_ℓ/A est une moyenne par
  nucléon, on défait tout le noyau. ✗ « Faux : c'est le noyau qui libère 8,475 MeV en se dissociant »
  (B-3). `apres` : 2-1 b- en une ligne : E_ℓ/A = 2,825 MeV pour ³H contre 1,183 pour ²H : vrai.
- **`bac-2b`** · **Q** 2-2 « E_lib = |ΔE| ? » ✓ |2,366 + 8,475 − 28,296| = 17,455 MeV. ✗ 2,366 + 8,475
  + 28,296 = 39,137 MeV : tout additionné. ✗ |1,183 + 2,825 − 7,074| = 3,066 MeV : E_ℓ/A additionnées.
  `apres` : tex et rédaction.

Contrôle B3 sur ces deux lignes : chaque leurre donne une valeur ou un verdict faux. Le leurre « E_ℓ
totale » n'est **pas** utilisé pour 2-1 b- : avec les valeurs du sujet (8,475 > 2,366), il mène à la
bonne conclusion ; c'est pourquoi b- est montré, pas demandé.

**La copie fautive** — bac PC 2019, session normale (NS28F), Exercice II, partie 2, Q3 (0,5 pt),
QCM imprimé (`docs/sujets/pc/decroissance-radioactive.md`, statut vérifié) :

- **`bac-erreur`** · **V** « ²²²Rn → ²¹⁸Po + ⁴He, avec E_ℓ/A = 7,69 ; 7,73 ; 7,07 MeV/nucléon. Une copie
  coche E_lib = 7,11 MeV. Son erreur ? » ✓ elle a additionné des E_ℓ/A (7,73 + 7,07 − 7,69) : il faut
  A × E_ℓ/A, d'où 6,24 MeV. ✗ une erreur de signe : |ΔE| ne dépend pas du sens. ✗ elle a oublié la
  particule α : les trois noyaux y sont. Retour du ✓ : « 3 420,6 MeV, autre case du QCM, c'est la
  somme des trois E_ℓ. » Aucune phrase sur ce que « le correcteur » fait.

**À signaler** : le sujet 2023 donne E_ℓ(²H) = 2,366 MeV ; la valeur de référence est 2,2246 MeV
(CODATA 2022, calcul §8.1). Dans les étapes du bac, on garde les valeurs imprimées (« prends celles de
l'énoncé ») ; partout ailleurs, les valeurs de `noyaux-outils.js`. Ne rien afficher de cet écart à
l'élève (B9) ; décision au relecteur (§8.3).

Sujets 2026 (PC RS : fission en ¹³⁸Te et ⁹⁵Zr ; SM N : diagramme du potassium 40) : cités par la bible
et `docs/bible/sources/verification-pc.md` §6, mais **non transcrits** dans `docs/sujets/` (ni
questions, ni barème) : ils ne servent pas d'exemple ici.

---

## 7. Les exercices générés (`components/pilote/exercices/noyaux.js`)

Format de `radioactivite.js` : réponse calculée, chaque leurre porte `fb` et `erreur`. **Capacités** :
une fonction `CAPN(id)` qui rend `pc-pc id`, `pc-sm id` et, si l'id existe en SVT, `pc-svt id'` selon
la table : 1.2.2.1→1, .2→2, .3→3, .4→4, .5→5, .10→6, .11→7, .12→8, .13→9 ; 1.2.2.6 à 1.2.2.9 : aucun
équivalent SVT, et le gabarit porte `filieres: ['PC', 'SM']`. **Règle de tirage commune (B3)** : un
tirage où un leurre calculé coïncide avec la réponse à 1 % près est rejeté et retiré (cas connus
signalés ci-dessous). Données : uniquement celles de `noyaux-outils.js` ; facteur 1 u ↔ c² tiré dans
{931,41 ; 931,49 ; 931,5} MeV/c² et écrit dans l'énoncé, comme les sujets.

| # | id | Niveau | Tirage | Capacités (PC/SM) | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `nme-unites` | 1 | une masse m ∈ {0,001 ; 0,03 ; 1 ; 4,0015 ; 235,0439} u → kg et MeV/c² ; une énergie E ∈ {5,4 ; 17,6 ; 200} MeV → J ; 1 eV ↔ J | 1.2.2.3 | 931,5 oublié (u lu comme MeV) ; MeV et eV (×10⁶ dans le mauvais sens) ; diviser au lieu de multiplier |
| 2 | `nme-energie-masse` | 1 | m ∈ {1 µg, 1 mg, 1 g, 1 kg} ou m = 1 u ; E = mc², c = 3,00 × 10⁸ m·s⁻¹ | 1.2.2.5 | g non converti en kg ; c non élevée au carré ; c en km·s⁻¹ |
| 3 | `nme-defaut-masse` | 2 | un noyau parmi ²H, ³H, ³He, ⁴He, ⁷Li, ¹⁶O, ⁵⁶Fe, ²³⁵U (masses de noyaux, §8.1) ; Δm en u puis en kg | 1.2.2.1, 1.2.2.3 | N = A (A neutrons) ; Z et N inversés (**leurre retiré si Z = N** : ⁴He, ¹⁶O, sinon il coïncide) ; signe inversé |
| 4 | `nme-liaison` | 2 | même liste ; E_ℓ en MeV puis E_ℓ/A | 1.2.2.1, 1.2.2.2, 1.2.2.3 | Δm non converti (× 931,5 oublié) ; divisé par Z ; divisé par N (**un seul des deux si Z = N**) ; E_ℓ non divisée |
| 5 | `nme-stabilite` | 2 | deux ou trois noyaux réels donnés par (A, E_ℓ) ; **contrainte : l'ordre des E_ℓ est l'inverse de celui des E_ℓ/A** (sinon le leurre retombe juste) ; couples admis : Rn 222 / Po 218 (2019), Pb 208 / Fe 56, U 235 / Kr 92, U 238 / Sr 94 | 1.2.2.2, 1.2.2.4 | comparer E_ℓ (B-4) ; comparer A ; comparer Δm (même ordre que E_ℓ) |
| 6 | `nme-aston` | 2 | la courbe d'Aston (option `inv` une fois sur deux, §8.3) ; quatre réactions proposées : 2 légers → 1 ; 1 lourd → 2 moyens ; 2 noyaux de A ≈ 56 → 1 ; 1 noyau de A ≈ 60 → 2 ; dire si de l'énergie est libérée | 1.2.2.4, 1.2.2.7 · `filieres: ['PC','SM']` | « toute fusion libère » (I-2) ; « plus lourd, plus stable » ; fission et fusion confondues (I-4) |
| 7 | `nme-equation` | 2 | fissions n + ²³⁵U → X + Y + x n avec (X, Y, x) ∈ {(⁹⁴Sr, ¹⁴⁰Xe, 2), (⁹²Kr, ¹⁴¹Ba, 3), (⁹⁵Zr, ¹³⁸Te, 3)} ; fusions ²H + ³H → ⁴He + n, ²H + ²H → ³He + n, ²H + ²H → ³H + p ; inconnue : x, ou A et Z d'un produit | 1.2.2.8 · `filieres: ['PC','SM']` | neutron incident oublié ; Z(n) = 1 ; une seule des deux lois (I-5) |
| 8 | `nme-type` | 1 | une équation parmi α, β⁻, β⁺ (leçon voisine), fission, fusion | 1.2.2.9 (+ 1.2.1.9) · `filieres: ['PC','SM']` | α prise pour une fission ; fusion prise pour une fission (deux noyaux à gauche) ; β⁺ prise pour une fusion (4 ¹H → ⁴He + 2 e⁺ exclue du tirage : ambiguë au niveau du cadre) |
| 9 | `nme-bilan-masses` | 3 | masses de noyaux données ; réaction : α du ²¹⁰Po, du ²²²Rn ; β⁻ du ¹³¹I ; fusion ²H + ³H (toutes filières) ; fission ²³⁵U (PC, SM seulement) ; ΔE signé, puis E_lib | 1.2.2.10, 1.2.2.11, 1.2.2.3 | produits − réactifs inversé (ΔE de signe faux) ; neutron ou particule oubliés (B-9) ; × 931,5 oublié |
| 10 | `nme-bilan-liaisons` | 3 | table de E_ℓ ou de E_ℓ/A (forme 2019) pour une α ou une fusion ; E_lib | 1.2.2.10, 1.2.2.11, 1.2.2.2 | E_ℓ/A additionnées (leurre 7,11 de 2019) ; tout additionné (3 420,6) ; E_ℓ du neutron non nulle ; sens inversé quand on demande ΔE |
| 11 | `nme-diagramme` | 3 | un diagramme à trois niveaux (forme 2020) construit depuis les masses d'une α (²¹⁰Po, ²²²Rn, ²³⁸U), valeurs absolues en 10⁵ MeV ou relatives ; E_lib, E_ℓ(père), Δm(père) en u et en kg | 1.2.2.1, 1.2.2.3, 1.2.2.10, 1.2.2.11 | écart le plus grand lu comme E_lib ; E_ℓ des produits prise pour celle du père ; MeV/c² lus comme u ; facteur 931,5 inversé |
| 12 | `nme-echantillon` | 3 | m ∈ {1 g, 1 kg} d'uranium 235 (PC, SM) ou m ∈ {1 µg, 1 mg} de polonium 210 (toutes filières) ; N = (m/M)·N_A ; E = N·E_lib en J | 1.2.2.11, 1.2.2.3 | N_A oublié (calcul en moles) ; MeV non convertis en J ; g et kg |
| 13 | `nme-usages-dangers` | 1 | quatre affirmations parmi une liste sourcée (§8.1 : OMS ; applications de la leçon) ; vrai ou faux | 1.2.2.12, 1.2.2.13 | désintégration prise pour une fission (stimulateur) ; irradiation et contamination confondues |
| 14 | `nme-vrai-faux` | 2 | forme 2023 : trois affirmations à juger avec justification (définition de E_ℓ, stabilité par E_ℓ/A, « de la masse est convertie », « la masse d'un noyau est la somme… ») ; valeurs tirées dans la table | 1.2.2.1, 1.2.2.2, 1.2.2.5 | E_ℓ vue comme réserve (B-3) ; masse conservée (B-1) ; E_ℓ totale comparée (**ne tirer que des couples où elle mène au faux**) |

Niveaux : 1 = restituer ou convertir ; 2 = appliquer une définition à un cas ; 3 = enchaîner deux
routes ou trois grandeurs (format d'une question du bac à 0,5 pt). Chaque question porte `sujet`
(B7). Aucun gabarit de séance 2.

---

## 8. À vérifier, et questions pour le relecteur

### 8.1 Les données (pour `noyaux-outils.js`)

En tête du fichier, comme `radioactivite-outils.js` : chaque donnée avec sa source et son statut.

| Donnée | Valeur | Source | Statut |
|---|---|---|---|
| m_p | 1,007 276 466 5789 u | NIST, CODATA 2022 (https://physics.nist.gov/cgi-bin/cuu/Value?mpu) | [V] |
| m_n | 1,008 664 916 06 u | NIST, CODATA 2022 (`Value?mnu`) | [V] |
| m_e | 5,485 799 090 441 × 10⁻⁴ u | NIST, CODATA 2022 (`Value?meu`) | [V] |
| m(⁴He noyau), particule α | 4,001 506 179 129 u | NIST, CODATA 2022 (`Value?malu`) | [V] |
| m(²H noyau), deutéron | 2,013 553 212 544 u | NIST, CODATA 2022 (`Value?mdu`) | [V] |
| m(³H noyau), triton | 3,015 500 715 97 u | NIST, CODATA 2022 (`Value?mtu`) | [V] |
| 1 u | 1,660 539 068 92 × 10⁻²⁷ kg | NIST, CODATA 2022 (`Value?ukg`) | [V] |
| 1 u × c² | 931,494 103 72 MeV | NIST, CODATA 2022 (`Value?muc2mev`) | [V] |
| c ; e | 299 792 458 m·s⁻¹ ; 1,602 176 634 × 10⁻¹⁹ C (exactes) | définition du SI (2019) | [V] (connues ; brochure SI non relue ici) |
| définition de u (1/12 d'un atome de ¹²C) | — | brochure SI, 9ᵉ éd. | à vérifier (citation) |
| E_ℓ/A de ⁵⁶Fe, ⁵⁸Fe, ⁶²Ni | 8,7903 ; 8,7922 ; 8,7945 MeV/nucléon | Wikipédia, [Nickel-62](https://en.wikipedia.org/wiki/Nickel-62) | [V] sur la page ; AME2020 à confirmer |
| E_ℓ/A de ⁶Li, ⁷Li, ¹²C, ¹⁶O, ⁴⁰Ca, ⁹²Kr, ⁹⁴Sr, ¹⁴⁰Xe, ¹⁴¹Ba, ¹³⁸Te, ⁹⁵Zr, A = 112, ²⁰⁸Pb, ²³⁵U, ²³⁸U | valeurs de mémoire (5,332 ; 5,606 ; 7,680 ; 7,976 ; 8,551 ; – ; 8,594 ; 8,291 ; – ; – ; – ; ≈ 8,5 ; 7,867 ; 7,591 ; 7,570) | AME2020 (Wang et al., Chinese Physics C 45, 030003, 2021), table `mass_1.mas20` de l'AMDC | **à vérifier, toutes** (non relues ici) |
| masses de noyaux de ²¹⁰Po, ²⁰⁶Pb, ²²²Rn, ²¹⁸Po, ²³⁸U, ²³⁴Th, ¹³¹I, ¹³¹Xe, ²³⁵U, ⁹⁴Sr, ¹⁴⁰Xe | à tirer de l'AME2020 (masse atomique − Z·m_e) | AME2020 | **à vérifier** ; la soustraction néglige l'énergie de liaison des électrons (quelques keV à ~0,8 MeV pour U, à signaler) |
| âge du Soleil 4,6 × 10⁹ ans ; Kelvin 1862 « about 3,000 years' heat » ; 30 millions d'années (gravitation) ; Aston 1920 ; Eddington 1920, ≈ 0,7 %, « about a 100 billion years » | — | J. N. Bahcall, « How the Sun Shines », Nobel e-Museum, 2000 ; arXiv:astro-ph/0009259, p. 4, 5, 7 | [V] (lu) |
| L☉ = 3,828 × 10²⁶ W | — | UAI, résolution B3 (2015), via Wikipédia [Solar luminosity](https://en.wikipedia.org/wiki/Solar_luminosity) | [V] |
| M☉ = 1,988 416 × 10³⁰ kg (nominale) | — | Wikipédia [Solar mass](https://en.wikipedia.org/wiki/Solar_mass) | [V] sur la page |
| Meitner et Frisch : « about one-fifth the mass of a proton », « about 200 MeV », Kungälv, Noël 1938, marche dans la neige ; *Nature*, 11 février 1939 | — | Wikipédia [Lise Meitner](https://en.wikipedia.org/wiki/Lise_Meitner) | [V] sur la page |
| ΔfH°(CO₂, g) ≈ −393,5 kJ·mol⁻¹ → ≈ 4,08 eV par réaction | — | NIST Chemistry WebBook | **à vérifier** (non relu ; sert au seul `apres` de `gramme`) |
| OMS : usages (médecine, industrie, énergie) ; irradiation externe (cesse quand la source est écartée ou protégée) ; contamination interne (inhalation, ingestion) ; brûlures, syndrome aigu à forte dose ; risque de cancer à faible dose | — | OMS, aide-mémoire [Ionizing radiation and health effects](https://www.who.int/news-room/fact-sheets/detail/ionizing-radiation-and-health-effects), 27 juillet 2023 | [V] |
| E_ℓ du sujet 2023 (2,366 ; 8,475 ; 28,296 MeV), E_ℓ/A du sujet 2019 (7,07 ; 7,69 ; 7,73), niveaux du sujet 2020 | — | `docs/sujets/pc/noyaux-masse-energie.md`, `decroissance-radioactive.md` (statut vérifié) | [V] ; à n'utiliser que dans les étapes qui citent ces sujets |

Contrôles faits à la main (le code les refera) : E_ℓ(⁴He) = 28,296 MeV (CODATA) ; Δm(⁴He) = 0,030 377 u,
0,753 % de la masse des nucléons ; E_ℓ(²H) = 2,2246 MeV ; E_ℓ(³H) = 8,4818 MeV ; ²H + ³H : ΔE =
−17,589 MeV par les masses comme par les E_ℓ ; 4 ¹H → ⁴He + 2 e⁺ : Δm = −0,026 503 u, ΔE = −24,69 MeV,
0,658 % ; sans les positons −25,71 MeV ; M☉c²/L☉ ≈ 1,48 × 10¹³ ans, × 0,006 58 ≈ 9,7 × 10¹⁰ ans ;
1 u × c² = 1,4924 × 10⁻¹⁰ J ; 0,2 m_p × c² ≈ 187,7 MeV ; 1 g de ²³⁵U à 184,6 MeV : 7,58 × 10¹⁰ J ;
sujet 2020 : E_lib 5,4 MeV, E_ℓ(Po) 1 644,8 MeV, Δm 1,7659 u = 2,931 × 10⁻²⁷ kg ; sujet 2023 :
17,455 MeV ; sujet 2019 : 6,24 MeV (leurres 7,11 et 3 420,6 expliqués ; **22,56 MeV, autre case du
QCM, d'origine non identifiée** : ne pas l'expliquer à l'élève).

Chaque leurre de calcul du plan a été recalculé : aucun ne retombe sur la bonne valeur. Les deux cas
où un leurre aurait coïncidé ont été écartés : Z et N inversés pour un noyau à Z = N (gabarits 3, 4 ;
l'étape `v-dm` prend le tritium, Z ≠ N) ; « comparer les E_ℓ » sur le couple ²H / ³H du sujet 2023
(montré, pas demandé). Le signe inversé ne change pas E_lib = |ΔE| : partout où il sert de leurre,
la question porte sur ΔE, pas sur E_lib.

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **Les E_ℓ/A et masses AME2020** de tous les noyaux autres que ¹H, ²H, ³H, ⁴He, ⁵⁶Fe, ⁵⁸Fe, ⁶²Ni
   (tableau ci-dessus) : non relues. Elles portent `rappel` (Pb 208), `u-par-nucleon` (U 235),
   `fer-fer` (A = 112), `fission-bilan` (U 235, Sr 94, Xe 140), la courbe `aston` et les gabarits 3 à
   12.
2. **Masses de noyaux ou d'atomes dans les sujets** (bible : « À VÉRIFIER : convention des sujets ») :
   2022 N et 2025 N donnent m(β⁻) à côté des masses, ce qui suggère des masses de noyaux, sans le dire.
   L'étape `atomique` et le leurre B-8 en dépendent.
3. **La date et le lieu d'Eddington** : « 24 août 1920, Cardiff » vient d'un billet de B. Schutz
   (bfschutz.com, 24 août 2020) [S] ; Bahcall dit seulement « his 1920 presidential address to the
   British Association » [V]. Tag proposé `1920` seul si non confirmé.
4. **Hahn et le baryum** (étape `hahn`) : connu, mais non relu ici (Wikipédia *Nuclear fission* ne
   l'a pas confirmé dans la partie lue). Le « 1/5 de proton » et les 200 MeV sont [V].
5. **La valeur chimique « environ 4 eV »** (`gramme`) : à relire au NIST WebBook, ou à retirer.
6. **0,66 % ou 0,7 %** : le calcul de la leçon (masses de noyaux, deux positons, sans annihilation ni
   neutrinos) donne 0,66 % ; Bahcall écrit « about 0.7% » (masses d'atomes, annihilation comprise).
   La leçon écrit « moins de 1 % » et « environ 0,66 % » : à confirmer.
7. **« 100 milliards d'années »** suppose que tout le Soleil est de l'hydrogène changé en hélium
   (Bahcall : « in principle »). Le texte doit le dire (« si tout son hydrogène y passait »).
8. **E_ℓ(²H) du sujet 2023** : 2,366 MeV imprimé, 2,2246 MeV de référence. Transcription vérifiée deux
   fois : c'est la valeur du sujet, pas une erreur de copie.
9. **Fe ou Ni au sommet** : [V] Ni 62 ; [L] « le fer 56 est le noyau le plus stable », formule courante
   (Wikipédia *Nickel-62* la signale comme fréquente). La leçon dit « vers le fer et le nickel ».

**Histoire (≤ 3 places).**
1. **Kelvin, 1862** (`charbon`, `gravite`) [V] : citation dans Bahcall 2000, p. 4. Retour en partie 8.
2. **Aston et Eddington, 1920** (`aston`, `eddington`) [V] Bahcall p. 7 (« Aston found that four
   hydrogen nuclei were heavier than a helium nucleus » ; la figure 2 de Bahcall est une balance) ;
   spectrographe d'Aston 1919, Nobel de chimie 1922 [V] Wikipédia *Francis William Aston* ; date et
   ville du discours [S], point 3 ci-dessus.
3. **Meitner et Frisch, Kungälv, Noël 1938** (`hahn`) [V] Wikipédia *Lise Meitner*. Les 49
   nominations au Nobel : [V], mais ne servent aucun pari : fiche de mot `meitner` seulement (B4, B8).

Einstein est nommé dans `einstein` sans date ni lieu (c'est le nom de la relation) ; ce n'est pas une
place d'histoire.

### 8.3 Pour le relecteur

1. **Scène nouvelle `niveaux`** (diagramme d'énergie) : décision du propriétaire (07 §3.3). Elle
   remplace la « balance du noyau » de la bible et sert la figure-clé, le retour et l'exemple du bac.
2. **Filière SVT** : la partie 7 (7 étapes) et l'écriture de l'équation en `retour-eq` sont hors du
   cadre SVT. `noyau.js` n'a pas de profil de filière. Choisir : (a) bouton « passer » en tête de
   partie 7 pour tous, avec une phrase « hors programme en SVT » ; (b) demande à part pour un champ
   `filieres` sur les étapes ; (c) garder la partie entière pour SVT en « pour aller plus loin ».
   Avec (a), une élève de SVT passe de 59 à 52 étapes et la pause reste à 31/52 = 60 %.
3. **Applications et dangers** : deux étapes seulement (`usages`, `dangers`), sourcées par l'OMS et les
   données de la leçon voisine. Le cadre dit « quelques ». Suffisant ?
4. **E_ℓ(²H) du sujet 2023** (2,366 MeV contre 2,2246) : garder la valeur imprimée dans `bac-2b` sans
   commentaire (règle « la valeur se prend dans l'énoncé »), ou choisir un autre sujet ?
5. **`atomique` (B-8)** : écrire l'étape maintenant, ou attendre que la convention des sujets soit
   établie (§8.2, 2) ?
6. **`aston`** : copie adaptée de `horloge` / `loi` (type « courbe avec lecture graphique ») ou type
   nouveau ? Le plan la classe comme copie ; elle ajoute un curseur à crans et deux flèches.
7. **Orientation de la courbe d'Aston** : la leçon trace E_ℓ/A vers le haut (bible : « à vérifier que
   l'inversion n'embrouille pas ») ; certains manuels tracent −E_ℓ/A. Les sujets transcrits n'ont pas
   de courbe d'Aston. Faut-il l'option `inv` dans le gabarit 6 ?
8. **Premier geste du bac** en pari sans `ok`, comme la radioactivité et la décision 6 de la spec de
   l'exponentielle : à confirmer.
9. **Gabarit 12** (énergie d'un échantillon) rattaché à `1.2.2.11` : le cadre ne dit pas « par
   échantillon », mais les sujets le demandent (RS 2026 en joules, SM 2026 par seconde, selon la
   bible). À confirmer.
10. **Nom de la route** : `/pilote/noyaux` (fichiers `noyaux-*.js`) ou `/pilote/noyaux-masse-energie` ?

## 9. Décisions du relecteur (2026-11-23)

Réponses aux questions du §8, pour que l'auteur n'ait rien à trancher :

1. **Scène nouvelle `niveaux`** (le diagramme d'énergie) : accordée. L'auteur la construit d'abord,
   seule, et regarde ses captures (ordinateur et 390 px) avant d'écrire les étapes.
2. **Filière SVT** : la partie fission et fusion s'ouvre par une ligne « Filières PC et SM. En SVT,
   ce n'est pas à ton programme » et un bouton « Passer à la suite », sur le modèle du bouton
   « Passer à l'énigme » de l'exponentielle (`data-aller`). `noyau.js` ne se modifie pas. L'écriture
   de l'équation dans `retour-eq` reste : elle sert l'énigme, sans être évaluée.
3. **Usages et dangers** : deux étapes sourcées suffisent.
4. **`aston`** : copie adaptée, pas un type nouveau.
5. **Sujet 2023** : on garde 2,366 MeV, tel qu'imprimé, dit « donnée du sujet » à l'écran. Hors de
   l'étape du bac, la leçon n'affiche pas d'autre valeur pour ce noyau.
6. **Étape `atomique`** : l'auteur lit d'abord les sujets transcrits de physique : si leurs données
   sont des masses de noyaux, l'étape le dit en une phrase ; sinon elle n'est pas écrite. Rien
   d'invérifié à l'écran.
7. **Courbe d'Aston** : tracée en −E_ℓ/A, la forme des sujets ; le gabarit garde l'option inverse.
8. **« Premier geste » au bac** : un pari de prédiction, comme dans la radioactivité.
9. **Gabarit 12** : rattaché à `1.2.2.11`, confirmé.
10. **Route** : `/pilote/noyaux`.
11. **Valeurs** : priorité aux données imprimées dans les sujets transcrits ; sinon une table sourcée
    en tête du fichier d'outils, chaque ligne marquée [V] ou « à vérifier ». Toute valeur dérivée est
    recalculée par le code. Une valeur « à vérifier » empêche de montrer la leçon aux élèves, pas de
    l'écrire. Eddington : « 1920 » suffit, ni jour ni lieu à l'écran.
