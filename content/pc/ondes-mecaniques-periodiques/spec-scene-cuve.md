# Spec — manipulable 2D « la cuve à ondes » (`pc/ondes-mecaniques-periodiques`)

**Objet :** une scène de première partie **en deux dimensions** — un champ d'onde
numérique calculé en direct dans le navigateur, vu de dessus — pour le chapitre
R5 « La diffraction des ondes mécaniques », 2ème Bac PC/SM.
**Statut :** spec pédagogique, **construite le 2026-09-24** sur les réponses par
défaut aux questions du §13 (écrites, avec les écarts de la construction, dans
`docs/DECISIONS.md` §21) — chacune reste réversible par le propriétaire.
**Date :** 2026-09-24. **Auteur :** pedagogy-architect.
**Correction (2026-09-24, construction) :** la spec renvoyait la dispersion au
« chapitre 8 » ; c'est le chapitre 7 (R6 — chapitre 1 = R0, REVIEW-2026-09-19).
Corrigé ici, dans la légende et dans le `fit_caveat`.

**Ce qu'elle paie.** Une **dette de manipulation écrite**
(`docs/audits/dette-manipulable-2026-09-20.md`) : la spec d'extension de la
notion prescrivait un embed `cuve-a-ondes-diffraction`, « *l'élève réduit la
largeur de la fente et voit l'étalement croître* » ; la leçon rend une figure
STATIQUE, dont l'en-tête nomme lui-même ce qui a été perdu (« *cuve à ondes
manipulable, largeur de fente réglable en direct* »). La `REVIEW-2026-09-19`
ajoute l'argument décisif : **ici c'est le cadre qui exige la manipulation**
(« mise en évidence expérimentale de la diffraction »).

**Pourquoi ce n'est PAS une scène 3D.** L'ADR 0041, première entrée de
« Retractions and Corrections » : *« la diffraction par une fente, dans une
cuve, est un phénomène PLAN, et une scène 3D y ajouterait du relief sans rien
ajouter à l'idée. Elle reste une dette de manipulation, à payer par un
manipulable 2D. »* Cette spec exécute cette phrase : **on reprend l'appareillage
pédagogique de l'ADR 0041** (opt-in au clic, étapes, pari avant tout, contrôle
unique par étape, porte qui lit les pixels) **et on n'en reprend ni la 3D, ni la
caméra, ni three.js.**

**Fichiers que cette spec commande** (aucun n'est écrit par elle) :

| Fichier | Rôle |
|---|---|
| `content/pc/ondes-mecaniques-periodiques/media/cuve-a-ondes.json` | le descripteur (pédagogie : étapes, paris, états) |
| `web/src/lib/scene3d/scenes.json` | l'entrée de registre `cuve-a-ondes` (voir §12 et la question 1) |
| `web/src/lib/scene2d/cuve.ts` (+ `fdtd.ts`, le solveur) | le calcul et le rendu Canvas 2D |
| `web/scripts/scene-cuve.mjs` | la porte (§11) |
| `content/pc/ondes-mecaniques-periodiques/lesson.md` | 4 retouches de prose (§4) |
| `content/pc/ondes-mecaniques-periodiques/items.yaml` | 1 misconception + 3 items (§8), **sous réserve d'accord** |
| `content/pc/ondes-mecaniques-periodiques/media/cuve-a-ondes-diffraction.svg` | 1 ligne d'en-tête (la dette est payée, la figure devient le chemin imprimé) |

Marqueur : `[[embed:cuve-a-ondes]]` · clé de registre : `cuve-a-ondes` ·
sélecteur de porte : `[data-scene="cuve-a-ondes"]`.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`ondes`** →
  **`ondes_periodiques`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 37–69).
- **Poids :** `poids.part_examen: 11 %`, **rang 3 de la physique**. Habiletés du
  sous-domaine : **utilisation 5,5 %**, **application expérimentale 1,65 %**,
  **résolution de problème 3,85 %** (le 50 / 15 / 35 de l'examen appliqué aux
  11 %).
- **Savoir-faire que la scène sert** (cadre p. 5-6) :
  - « Connaître la **condition de diffraction** : dimension de l'ouverture ≤
    longueur d'onde ; connaître les **caractéristiques de l'onde diffractée**. »
  - « **Exploiter des documents expérimentaux** pour reconnaître la diffraction
    et ses caractéristiques. »
  - « **Proposer un montage** de diffraction (ondes sonores/ultrasonores). »
  - (en soutien) « Connaître et exploiter $\lambda = v\,T$ » — la scène affiche
    $\lambda = c/f$ à chaque réglage, jamais comme une formule à appliquer mais
    comme la longueur que le vibreur fabrique.
- **Travaux pratiques du cadre (p. 26), directement visés :** « **Diffraction
  d'une onde sonore/ultrasonore ; valeurs max/min de l'amplitude.** » C'est la
  ligne qui autorise — et qui exige — la lecture sur l'arc de l'étape 4 (§7.4).
- **`limites` portées en dur.** `ondes_periodiques` est **le seul chapitre du
  sous-domaine sans bloc `limites:`** (la `REVIEW-2026-09-19` le signale et
  demande un retour au cadre). En l'absence de bloc, **les limites tenues ici
  sont celles qu'écrit la spec d'extension et que la leçon exécute déjà** :
  - la diffraction mécanique est traitée **qualitativement / expérimentalement** :
    condition $a \lesssim \lambda$, caractéristiques conservées, montage ;
  - **$\theta = \lambda/a$ appartient au chapitre `onde_lumineuse`** (cadre p. 6 :
    « Connaître et exploiter $\theta = \lambda/a$ »). La leçon le dit en clair
    dans « Ce qui reste hors de cette leçon ». **La scène n'en approche pas.**
- **`exclusions` du sous-domaine portées en dur** (cadre l. 91–96) :
  **interférences lumineuses** (Young, interfrange, cohérence — « seule la
  DIFFRACTION est traitée ») · **effet Doppler** · **réseaux de diffraction** ·
  **équation de propagation / résolution de la PDE** · **polarisation**.

**Un point de cadre à dire clairement, parce qu'il est piégeux.** La scène
*résout numériquement* l'équation d'onde pour produire son image. L'exclusion
« résolution de l'équation d'onde » porte sur ce qu'on **enseigne à l'élève**,
pas sur ce qu'une machine calcule pour dessiner : l'élève ne voit ni l'équation,
ni un schéma numérique, ni le mot « équation de propagation ». C'est exactement
le précédent de la cinquième scène (ADR 0041, addendum du 2026-09-24) : les
tranches empilées sont une IMAGE, aucune somme n'est calculée ni affichée. Ici :
**le champ est une image, aucune équation n'est affichée**, et la porte le garde
(§11, famille `frontiere`).

---

## 2. Pourquoi un manipulable — et pourquoi il n'y a pas de figure qui suffise

### 2.1 Le critère, honnêtement

La notion porte déjà **deux** figures de diffraction, et elles sont bonnes :

- `diffraction-fente-fronts.svg` — deux panneaux côte à côte, la **même** onde
  incidente, **seule la largeur de l'ouverture change** entre A et B, avec les
  repères $a$ et $\lambda$ annotés ;
- `cuve-a-ondes-diffraction.svg` — un panneau, le cas $a \le \lambda$ seul,
  « photographié d'en haut », sans étiquette.

Ce que ces deux figures montrent : **deux points d'une famille à un paramètre**.
Ce qu'elles ne peuvent pas montrer : **la famille**. Et c'est précisément ce que
la leçon affirme en toutes lettres, sans jamais le rendre :

> « Ce qui décide si la diffraction est notable ou non **n'est jamais une valeur
> absolue de $a$** : c'est une comparaison entre deux longueurs. »

Une comparaison ne se montre pas en fixant les deux termes. Les deux figures
font varier $a$ à $\lambda$ **constante** — les deux, du même côté. **Aucune
image du corpus ne fait varier $\lambda$ à $a$ constante.** L'élève sort donc de
R5 avec un modèle qui répond juste à `cp-r5-diffraction` et à OMPP-19, et qui
tombe dès qu'on lui change l'onde sans toucher à la fente : *la fente décide*.

**C'est le critère du §1 de l'ADR 0041, transposé au plan :** *la manipulation
entre quand elle révèle ce qu'une figure fixe énonce sans le montrer.* Ici, la
grandeur à révéler n'est ni un plan ni un sens — c'est un **rapport**, et un
rapport ne devient visible que si l'on peut bouger ses deux termes **séparément**.
Deux étapes sur cinq en vivent (S1 puis S2) ; les trois autres sont justifiées
séparément ci-dessous, et l'une est **coupable en premier**.

### 2.2 Le motif central : la même fente, deux ondes — **CONFIRMÉ**, colonne vertébrale

Vérifié dans le dépôt : `grep -i "même fente\|même ouverture"` sur tout
`content/pc/ondes-mecaniques-periodiques/` ne renvoie **aucune** occurrence ; et
sur les 25 items, **aucun ne fait varier $\lambda$ à $a$ fixée** — OMPP-19 pose
la condition, OMPP-20 compare deux fentes à une onde, OMPP-21 conserve $f$, $\lambda$, $c$.
La leçon, ses figures, ses items et son point d'arrêt attaquent tous la
condition **par le même côté**.

Ce n'est pas une élégance, c'est un **défaut actif**, et il est mesurable : un
élève qui tient « c'est la petite fente qui diffracte » coche la bonne réponse
partout dans le corpus actuel. La scène le prend en défaut en **quatre
secondes** : ouverture verrouillée à $1{,}0\ \text{cm}$, vibreur ralenti de
$40$ à $5{,}0\ \text{Hz}$, et le couloir presque droit devient un éventail.

### 2.3 L'antidote obligatoire : l'étape 1 fabrique la faute que l'étape 2 casse

La tentation est de commencer par « rétrécir la fente », parce que c'est ce que
la leçon fait. **C'est justement pour cela qu'il faut commencer par là** — mais
en sachant qu'on installe une fausse règle. L'étape 1 laisse l'élève balayer la
largeur à $\lambda$ **fixée**, voir le couloir s'ouvrir en éventail, et en tirer
« c'est la largeur qui commande ». Sa `suite` écrit cette règle **avec sa
clause de validité** (« à longueur d'onde fixée ») — vraie, donc honnête, et
assez discrète pour que l'étape 2 ait quelque chose à casser.

C'est la relation S1 → S2 du manège (`spec-scene-manege.md` §2.3), au mot près :
*la deuxième étape est l'antidote de la première.*

### 2.4 La conservation de $f$, $\lambda$, $c$ — **PAS un motif de manipulation ; gardée comme MESURE**

Réponse franche : « la diffraction ne change ni $f$, ni $\lambda$, ni $c$ » ne
mérite pas un manipulable à elle seule. C'est une conséquence de deux phrases
déjà acquises (la source fixe $f$, le milieu fixe $c$) et la leçon la démontre
correctement en prose.

Elle est gardée comme **troisième étape**, pour trois raisons opposables :

1. la scène existe déjà, pour le motif du §2.2 : l'étape ne **paie** pas le
   manipulable, elle en **profite** ;
2. c'est la seule fois du corpus où cette conservation est **mesurée** au lieu
   d'être affirmée — deux règles posées de part et d'autre de la paroi, et un
   comptage de crêtes à la sonde ;
3. le pari ne porte pas sur « est-ce conservé ? » (un élève qui a lu la leçon
   répondrait oui sans réfléchir) mais sur **deux mécanismes alternatifs
   nommés** — l'ouverture qui « comprime » les fronts, et le « goulot
   d'étranglement » qui accélère l'eau. Ce second est une image que **la leçon
   emploie elle-même** (« comme un goulot d'étranglement qui accélérerait un
   fluide ») : la scène la reprend et la casse sur sa propre conséquence.

### 2.5 La lecture sur l'arc — **OUI, et c'est la strate qui manque le plus**

La question posée : la lecture d'amplitude sur un arc (le récepteur du montage à
ultrasons) a-t-elle sa place dans une cuve à ondes ? **Oui, et c'est l'apport le
mieux justifié de toute la scène après le §2.2.** Trois raisons, chacune
vérifiable :

1. **Le cadre l'écrit comme TP** : « Diffraction d'une onde sonore/ultrasonore ;
   **valeurs max/min de l'amplitude** ». L'amplitude en fonction de la direction
   *est* le résultat du TP officiel.
2. **La `REVIEW-2026-09-19` chiffre le trou** : « un seul item sur 25 porte
   `application_experimentale` (4 % contre 15 % visés) », et le savoir-faire
   « **proposer un montage** de diffraction » est *« enseigné mais jamais
   évalué — le seul du chapitre dans ce cas »*.
3. **Sans elle, la scène n'est qu'une jolie image.** Une figure d'onde se
   contemple ; une courbe qu'on trace en déplaçant soi-même le récepteur se
   **lit**. C'est le troisième mode du profil PC (conceptuel, procédural,
   **expérimental**), et c'est le seul endroit de la notion où il existe.

**Bornes non négociables** (détail en §9) : le profil n'est **jamais pré-dessiné**
— il se construit point par point sous le balayage ; **aucune largeur angulaire
n'est affichée en nombre** ; le seul angle affiché est **la position du
récepteur**, c'est-à-dire la valeur du réglage que l'élève a posée.

### 2.6 Une idée volontairement écartée : l'obstacle au lieu de l'ouverture

La leçon écrit « la dimension $a$ de l'ouverture **(ou de l'obstacle)** ». Une
sixième étape — le même écran, mais une barre au milieu au lieu d'un trou —
montrerait que l'onde se referme derrière l'obstacle quand $a \lesssim \lambda$.
**Coupée** : elle exige un mode de paroi supplémentaire et un contrôle de plus,
pour une idée qui recouvre exactement celle de S1 et S2 (le même rapport, la
même conclusion). À rouvrir seulement si une étape est coupée (question 5, §13).

Également écartées, et pour une raison de cadre, pas de place : **deux fentes**
(interférences — exclusion du sous-domaine), **source mobile** (Doppler —
exclusion), **changement de profondeur** (réfraction — hors chapitre),
**milieu dispersif réglable** (c'est le chapitre R6, et cela détruirait
l'argument « on n'a changé QUE $\lambda$ » de S2).

---

## 3. Placement

**Chapitre 6 de la leçon rendue = `## R5 — La diffraction des ondes
mécaniques…`**, **immédiatement après la ligne
`[[checkpoint:cp-r5-diffraction]]` et AVANT le paragraphe « L'expérience
tranche, et elle va à l'encontre de l'intuition du jet d'eau. »**

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:cuve-a-ondes]]
```

**Pourquoi là** (ADR 0041 §6 : la scène vient AVANT la prose qui explique).
Comptage des étapes qui cassent une prose **non encore lue**, à ce placement :

| étape | la prose qui répondrait | déjà lue ici ? |
|---|---|---|
| S1 — l'ouverture large | « L'expérience tranche… » + `diffraction-fente-fronts` | ❌ non |
| S2 — la même fente, une autre onde | **nulle part dans le corpus** | ✅ jamais dite |
| S3 — ce qui ne change pas | « Ce que la diffraction change, et ce qu'elle ne change jamais » | ❌ non |
| S4 — le récepteur sur l'arc | « Le montage » + `montage-diffraction-ultrasons` | ❌ non |
| S5 — libre | l'exemple travaillé (40 kHz, 5 mm / 0,8 m) | ❌ non |

**Une réserve, écrite parce qu'elle est réelle.** Le point d'arrêt
`cp-r5-diffraction` est juste **au-dessus** du marqueur, et ses `feedback`
révèlent la condition $a \lesssim \lambda$ — y compris pour un élève qui se
trompe. Conséquence assumée : **aucun pari de la scène ne pose la question du
point d'arrêt.** S1 ne demande pas « à quelle condition ? » mais « quelle
FORME ? » ; S2 demande ce que le point d'arrêt ne dit pas. Le point d'arrêt
déclare par ailleurs `lesson_placement: after_R5` alors qu'il est rendu au
milieu de R5 (la `REVIEW` l'y a remonté, à bon droit). Cette tension est une
décision de propriétaire — question 3, §13 — pas un correctif d'architecte.

Conséquences acceptées de ce placement :

- la figure statique `cuve-a-ondes-diffraction` tombe **juste en dessous** de la
  scène : elle cesse d'être une substitution et devient **le chemin imprimé et
  le chemin sans JavaScript**. Son en-tête doit le dire (§4.5) ;
- le montage à ultrasons (S4) est **en avance** sur la prose de « Le montage ».
  Traité en §4.4 : la leçon gagne deux phrases qui **ramènent** l'élève à la
  scène quand le montage arrive.

---

## 4. Les retouches de prose (texte prêt à insérer)

### 4.1 Le paragraphe d'annonce, juste avant le marqueur

> Avant de lire la réponse, va la chercher. La cuve ci-dessous est une vraie
> cuve à ondes vue de dessus : une règle qui bat à une extrémité, des rides
> droites qui avancent, une paroi percée d'une seule ouverture au milieu. Rien
> n'y est dessiné à l'avance — l'eau est calculée, ride après ride, pendant que
> tu regardes. Tu paries d'abord, la cuve répond ensuite.

(Neutre exprès : elle décrit l'appareil, elle n'annonce aucun résultat.)

### 4.2 La phrase qui manque à « La condition » — **exigée par la scène**

Dans `### La condition : comparer deux longueurs, jamais une valeur isolée`,
**après** le paragraphe « Tant que $a$ reste très grand devant $\lambda$… »,
**ajouter** :

> Et la comparaison se lit dans les **deux** sens, ce qui est moins évident :
> on peut rendre une ouverture « étroite » sans y toucher, simplement en
> allongeant l'onde. Une ouverture de $1{,}0\ \text{cm}$ traversée par des rides
> de $0{,}50\ \text{cm}$ vaut deux longueurs d'onde : l'onde passe presque tout
> droit. La **même** ouverture de $1{,}0\ \text{cm}$, traversée par des rides de
> $4{,}0\ \text{cm}$, ne vaut plus qu'un quart de longueur d'onde : la même
> ouverture, devenue étroite, fait maintenant diffracter nettement. Rien n'a
> bougé du côté de la paroi. C'est pourquoi « grande ouverture » et « petite
> ouverture » ne veulent rien dire tout seuls : ils ne veulent dire quelque
> chose que **devant une longueur d'onde**.

**Pourquoi c'est exigé et pas souhaitable.** C'est la seule phrase du corpus qui
fasse varier $\lambda$ à $a$ fixée. Sans elle, le chemin imprimé et le chemin
sans JavaScript perdent **exactement** ce que la scène existe pour apporter
(§2.2) — et le `fallback_note` du descripteur ne pourrait pas être écrit
honnêtement.

### 4.3 « Ce que la diffraction change » : rendre l'image du goulot réfutable

Dans `### Ce que la diffraction change, et ce qu'elle ne change jamais`,
**remplacer**

> On pourrait se dire que rétrécir le passage change quelque chose à l'onde
> elle-même — comme un goulot d'étranglement qui accélérerait un fluide qui le
> traverse.

**par**

> On pourrait se dire que rétrécir le passage change quelque chose à l'onde
> elle-même — comme un goulot d'étranglement qui accélérerait un fluide qui le
> traverse. L'image est tentante et elle est fausse pour une raison de fond :
> dans un goulot, c'est de la **matière** qui s'écoule, et elle doit bien passer
> quelque part. Dans une onde, rien ne s'écoule — l'eau reste sur place et c'est
> la perturbation qui avance (leçon précédente : une onde transporte de
> l'énergie, jamais de la matière). Un obstacle percé ne peut donc pas
> « comprimer » l'onde : il décide seulement **par où** elle peut passer.

### 4.4 Deux rappels qui ramènent l'élève à la scène

- Dans `### Le montage`, après la phrase « …on voit le domaine angulaire […]
  s'élargir » :
  > C'est exactement la courbe que la cuve du début de ce chapitre te faisait
  > tracer à la main, en promenant le récepteur sur son arc : un pic étroit
  > autour de $0°$ quand l'ouverture est large devant $\lambda$, un plateau qui
  > s'étend jusqu'au bout de l'arc quand elle est étroite devant $\lambda$. Tu
  > peux y retourner maintenant, en sachant ce que le banc à ultrasons mesure.
- Dans le `### Récapitulatif express` de R7, **compléter** la puce
  « Diffraction » par :
  > …et cette condition se lit dans les deux sens : à ouverture fixée, allonger
  > l'onde suffit à faire apparaître la diffraction.

### 4.5 L'en-tête du SVG statique — une ligne, parce qu'une dette payée doit se voir

Dans `media/cuve-a-ondes-diffraction.svg`, remplacer la première phrase du
commentaire d'en-tête (« Remplace l'ancien `[[embed:…]]`… ») par :

> Figure d'appui de R5, **et chemin imprimé / sans JavaScript** du manipulable
> `[[embed:cuve-a-ondes]]` posé juste au-dessus (spec-scene-cuve.md). Elle ne
> remplace plus rien : la substitution du 2026-09-20 est levée. Ce qu'elle ne
> peut toujours pas montrer, et que la scène montre : la **même** ouverture
> traversée par deux ondes différentes.

**Interdit dans ces retouches :** ne rien écrire, **avant** le marqueur, qui
réponde à un pari (§7.6). Les cinq blocs ci-dessus respectent la contrainte —
4.1 est neutre, 4.2 à 4.5 sont **après** la scène.

---

## 5. La cuve, les contrôles, l'état, les lectures

### 5.1 La cuve et ses constantes (toutes déclarées, toutes affichables)

| grandeur | valeur | d'où elle vient |
|---|---|---|
| dimensions utiles (vue de dessus) | $24{,}0 \times 16{,}0\ \text{cm}$ | une petite cuve à ondes de laboratoire |
| profondeur d'eau | $\approx 4{,}1\ \text{mm}$ | choisie pour donner la célérité ci-dessous |
| **célérité $c$** | **$0{,}20\ \text{m/s} = 20\ \text{cm/s}$** | $c \approx \sqrt{gh}$ en eau peu profonde ; $\sqrt{9{,}8 \times 0{,}0041} = 0{,}200$ |
| paroi | à $9{,}0\ \text{cm}$ de la règle vibrante, épaisseur $2{,}0\ \text{mm}$, rigide | une lame de laboratoire |
| arc de mesure | centré sur le centre de l'ouverture, rayon $7{,}0\ \text{cm}$, $\pm 60°$ | tient dans la cuve à $60°$ ($7{,}0\sin 60° = 6{,}1\ \text{cm} < 8{,}0$) |
| bords | bandes absorbantes de $2{,}0\ \text{cm}$ sur les quatre côtés | les berges inclinées d'une vraie cuve, et pour la même raison |

### 5.2 Contrôles (4)

| id | ce qu'il règle | valeurs / bornes | pas | ouvert par |
|---|---|---|---|---|
| `fente` | $a$, la largeur de l'unique ouverture | $[0{,}50\ ;\ 4{,}0]$ cm | **0,25 cm** | S1, **S4** (rouvert), S5 |
| `frequence` | $f$, le battement de la règle vibrante | `40` · `20` · `10` · `5` Hz (**quatre crans, pas un curseur**) | — | S2, S5 |
| `sonde` | la position d'un flotteur **sur l'axe** | $[-6{,}0\ ;\ +14{,}0]$ cm (0 = la paroi) | **0,25 cm** | S3, S5 |
| `recepteur` | la position du récepteur **sur l'arc** | $[-60\ ;\ +60]°$ | **5°** | S4, S5 |

**La célérité n'est PAS un contrôle.** C'est l'eau qui la fixe, et la scène
l'affiche comme une constante. C'est ce qui rend l'argument de S2 étanche : en
changeant `frequence`, l'élève ne change **que** $\lambda$.

**Le pas est un choix pédagogique (ADR 0041 §5), et ici il est arithmétique.**
Le solveur travaille sur une grille de **$0{,}5\ \text{mm}$**. Avec un pas de
$0{,}25\ \text{cm}$ sur `fente`, **toutes** les largeurs atteignables font un
nombre **entier** de cellules ($10, 15, 20, \dots, 80$) ; avec les quatre
fréquences ci-dessous, **toutes** les longueurs d'onde aussi ($10, 20, 40, 80$).
La cuve n'affiche donc jamais « $a = 2{,}0\ \text{cm}$ » en simulant
$2{,}03\ \text{cm}$. Un curseur continu, ou un pas de $0{,}3\ \text{cm}$, casse
cette propriété — et la porte le voit (§11.2, famille `grille-exacte`).

**`frequence` est un sélecteur à quatre crans, pas un curseur**, et c'est le
choix le plus important de cette section :

| cran | $f$ | $\lambda = c/f$ | en cellules |
|---|---|---|---|
| 1 | $40\ \text{Hz}$ | **$0{,}50\ \text{cm}$** | 10 |
| 2 | $20\ \text{Hz}$ | **$1{,}0\ \text{cm}$** | 20 |
| 3 | $10\ \text{Hz}$ | **$2{,}0\ \text{cm}$** | 40 |
| 4 | $5{,}0\ \text{Hz}$ | **$4{,}0\ \text{cm}$** | 80 |

Un curseur au hertz près afficherait $\lambda = 1{,}43\ \text{cm}$ face à une
ouverture de $2{,}25\ \text{cm}$ : l'élève ne pourrait plus comparer les deux
longueurs **de tête**, et la comparaison EST la leçon. Quatre crans en rapport
$2$, quatre longueurs d'onde rondes, et un rapport $a/\lambda$ qui se lit sans
calculer.

**La grille atteignable de $a/\lambda$** (le tableau que l'élève parcourt) :

| $a$ ↓ \ $\lambda$ → | $0{,}50$ cm | $1{,}0$ cm | $2{,}0$ cm | $4{,}0$ cm |
|---|---|---|---|---|
| $0{,}50$ cm | **1** | $0{,}5$ | $0{,}25$ | **$0{,}125$** |
| $1{,}0$ cm | **2** | **1** | $0{,}5$ | $0{,}25$ |
| $2{,}0$ cm | **4** | **2** | **1** | $0{,}5$ |
| $4{,}0$ cm | **8** | **4** | **2** | **1** |

Amplitude totale du rapport : **$0{,}125$ à $8$**, soit **64 : 1**. Les valeurs
intermédiaires de `fente` (1,25 · 1,50 · … · 3,75 cm) remplissent la grille sans
jamais la trouer.

### 5.3 État (6 clés)

`a_cm`, `f_hz`, `chemin` (`aucun` | `axe` | `arc`), `sonde_cm`,
`recepteur_deg`, `reference` (`aucune` | `40Hz`).

Deux clés **sans contrôle**, posées par l'étape (le précédent existe :
`occupants` dans le manège, `trace_B_mT` dans `champ-magnetique`) :

- **`chemin`** décide quel instrument de mesure existe : aucun (S1, S2), le
  flotteur sur l'axe (S3), le récepteur sur l'arc (S4, S5). Un instrument qui
  n'est pas celui de l'étape n'est **pas dans le DOM**.
- **`reference`** décide si la course joue d'abord une **phase de référence**.
  Seule S2 la pose (`40Hz`) : sa course montre la même ouverture deux fois, avec
  deux ondes. C'est ce qui rend l'argument « on n'a changé que $\lambda$ »
  **visible** au lieu d'être mémorisé (§6).

### 5.4 Lectures, définitions exactes, unités, précision

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `largeur` | $a$, la largeur de l'ouverture | cm | **2 déc.** | le pas vaut $0{,}25\ \text{cm}$ : deux décimales sont exactes, une seule afficherait $1{,}3$ pour $1{,}25$ |
| `longueur-onde` | $\lambda = c/f$, la longueur des rides | cm | **2 déc.** | $0{,}50$ · $1{,}00$ · $2{,}00$ · $4{,}00$ — exactes |
| `comparaison` | **deux segments dessinés à la même échelle** ($a$ et $\lambda$), plus une phrase : « $a = 4\lambda$ » ou « $a = \lambda/4$ » | — | rapport à **2 c.s.** | c'est LA grandeur du chapitre. Elle est rendue d'abord **en longueurs**, ensuite en mots : concret avant abstrait |
| `lambda-mesuree` | $\lambda$ **mesurée sur le champ**, de part et d'autre de la paroi | cm | **2 c.s.** | voir l'encadré ci-dessous |
| `periode-sonde` | le comptage de crêtes à la sonde, rendu en Hz | Hz | **2 c.s.** | la leçon écrit $40\ \text{Hz}$, $25\ \text{kHz}$ ; deux chiffres suffisent et le troisième serait du bruit |
| `amplitude` | amplitude au point de mesure, **en % du maximum sur l'axe** | % | **entier** | c'est ce que lit le TP du cadre (« valeurs max/min ») ; un % évite d'inventer une unité de hauteur d'eau que la scène ne mesure pas |
| `angle` | position du récepteur sur l'arc | ° | **entier** (pas $5°$) | c'est un **réglage posé par l'élève**, jamais un angle calculé (§9.1) |
| `celerite` | $c$, constante de la cuve | m/s | **2 déc.** | $0{,}20$ |

> **La précision de `lambda-mesuree` est une décision pédagogique, et c'est la
> plus délicate de la spec.** Le solveur travaille à $10$ cellules par longueur
> d'onde au cran le plus fin : sa dispersion numérique est de l'ordre de $1\ \%$.
> À **trois** chiffres significatifs, la lecture afficherait
> « $2{,}00\ \text{cm}$ » avant la paroi et « $1{,}98\ \text{cm}$ » après — et
> l'élève en conclurait que l'ouverture **raccourcit un peu** l'onde. C'est
> OND-DIF-2, **fabriquée par la grille**, à l'étape même qui existe pour la
> casser. À **deux** chiffres significatifs, les deux lectures affichent
> « $2{,}0\ \text{cm}$ » : la précision retenue est celle à laquelle la
> simulation dit vrai. C'est la leçon du géostationnaire (ADR 0041 §5 : douze
> positions affichaient « 24,0 h ») prise par l'autre bout.
>
> Corollaire non négociable pour la porte : elle ne vérifie **pas** que les deux
> chaînes affichées sont égales — elle vérifie que les deux valeurs **brutes**
> (exposées en `data-*`) diffèrent de moins de $2\ \%$, et qu'elles ne sont
> **pas** égales au bit près à $c/f$ (§11.1, famille `mesure-pas-echo`).

---

## 6. La course

- **Temps réel 1:1.** La règle bat à sa vraie fréquence, l'onde avance à
  $20\ \text{cm/s}$ : le front atteint la paroi à $0{,}45\ \text{s}$, le bord
  opposé à $1{,}2\ \text{s}$, et le motif est établi vers $2{,}0\ \text{s}$.
  **Course standard : $2{,}5\ \text{s}$ de temps de cuve.** Aucun facteur
  d'échelle temporelle à déclarer, donc aucun à mal lire. Si la machine ne suit
  pas, la scène **écrit** son facteur de ralentissement (`data-facteur-temps`),
  elle ne le tait pas.
- **La course de S2 a deux phases** (`reference: 40Hz`) : $2{,}0\ \text{s}$ à
  $40\ \text{Hz}$ (la référence — le réglage que l'élève connaît déjà), un
  effacement du champ de $0{,}5\ \text{s}$, puis $2{,}5\ \text{s}$ à
  $5{,}0\ \text{Hz}$. **`revele_apres_course: 1` = après les deux.** La phase de
  référence ne répond pas au pari : elle montre l'ancien réglage, le pari porte
  sur le nouveau.
- **La course de S4 a deux phases aussi** : $2{,}5\ \text{s}$ d'établissement,
  puis un **balayage scripté** du récepteur de $0°$ à $60°$ en $2{,}0\ \text{s}$,
  le profil se traçant point par point sous le curseur. Le balayage EST la
  révélation.
- **Fin de course : la scène se fige et l'écrit** — « image arrêtée à
  $2{,}5\ \text{s}$ ; la règle continuerait à battre, la cuve n'en montre pas la
  suite ». Sans cette mention, un élève lit « ça s'est arrêté ».
- **Les bords absorbent**, et la légende le dit une fois : « les bords de la
  cuve absorbent l'onde, comme les berges inclinées d'une vraie cuve — sinon les
  rides reviendraient et brouilleraient tout ». C'est vrai de l'appareil réel et
  vrai du calcul : la même phrase couvre les deux.
- **Aucune trace entre étapes.** Contrairement au manège, la scène n'empile pas
  les motifs : deux champs d'onde superposés seraient illisibles, et
  ressembleraient à une interférence — **le mot même que le cadre exclut**. La
  comparaison entre deux réglages se fait par la **course à deux phases** (S2)
  ou par le **profil sur l'arc** (S4, S5), jamais par superposition d'images.

**La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4).**

- **Le champ d'onde est à l'encre** : une échelle divergente lue sur les jetons
  `--figure-ink` / `--figure-ink-soft` à l'exécution, crête sombre, creux clair,
  eau au repos = le fond. Pas de bleu de piscine, pas de dégradé arc-en-ciel,
  pas d'ombre portée, pas de reflet.
- **L'accent ne marque que ce qui répond au pari**, et seulement **après** la
  révélation : l'enveloppe de l'amplitude, les deux règles de $\lambda$, la
  limite de l'ombre géométrique, le point de mesure, le profil tracé sur l'arc.
- **Les deux longueurs comparées sont l'ÉNONCÉ, donc à l'encre** — le crochet de
  $a$ sur la paroi et la règle de $\lambda$ sous les rides incidentes, dessinés
  **à la même échelle de pixels**, visibles **avant** le pari. C'est le
  corollaire écrit par l'ADR 0041 pour le manège : *une donnée de l'énoncé ne se
  peint pas dans la couleur de la réponse*, sinon « aucun pixel d'accent avant
  le pari » devient intenable.
- **Aucun mouvement hors course.** Le champ ne « respire » pas, le curseur ne
  pulse pas, rien ne clignote. Entre deux courses, l'image est fixe.

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant
que l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir).

### 7.1 S1 — `ouverture-large` · « Une large ouverture, est-ce mieux ? »

- **État :** `a_cm: 4.0`, `f_hz: "40"` ($\lambda = 0{,}50\ \text{cm}$, donc
  $a = 8\lambda$), `chemin: aucun`, `reference: aucune`.
- **Contrôle ouvert :** `fente`. **Lectures :** `largeur`, `longueur-onde`,
  `comparaison`, `celerite`.
- **`revele_apres_course: 1`** (les $2{,}5\ \text{s}$ entières : il faut voir le
  front traverser).
- **Consigne (voix) :** « Une cuve à ondes, vue de dessus. À gauche, une règle
  vibrante bat $40$ fois par seconde et envoie des rides bien droites, toutes
  parallèles. Dans cette eau — quatre millimètres de fond — une ride avance à
  $0{,}20\ \text{m/s}$, et deux crêtes voisines sont espacées de
  $0{,}50\ \text{cm}$ : c'est le petit segment dessiné sous les rides. Au milieu
  de la cuve, une paroi percée d'une seule ouverture, large de $4{,}0\ \text{cm}$
  — le grand segment, huit fois le petit. Pour l'instant l'eau est immobile. »
- **Pari :** « Quand la règle se mettra à battre, derrière cette large
  ouverture, l'onde… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `etalee` | s'étalera largement des deux côtés : l'ouverture est grande, elle laisse bien passer l'onde, donc l'effet sera marqué | non | **OND-DIF-1** | « Regarde ce que la cuve vient de faire. Derrière l'ouverture, les rides sont restées **droites**, dans un couloir large exactement comme l'ouverture ; à cinq centimètres sur le côté, l'eau n'a pratiquement pas bougé. « Bien laisser passer » et « s'étaler », ce ne sont pas la même chose : une grande ouverture laisse passer beaucoup d'onde, et elle la laisse passer **tout droit**. » |
| `couloir` | continuera presque tout droit, dans un couloir large comme l'ouverture | **oui** | — | « Oui. Huit longueurs d'onde tiennent dans cette ouverture : pour une ride de $0{,}50\ \text{cm}$, une porte de $4{,}0\ \text{cm}$ est immense, et l'onde la traverse comme un rayon traverse une fenêtre. Retiens la formulation exacte : ce n'est pas « l'ouverture est grande », c'est « l'ouverture est grande **devant la longueur d'onde** ». Le petit segment dessiné à côté n'est pas une décoration : c'est l'autre terme de la comparaison. » |
| `resserree` | ressortira resserrée, en un faisceau plus fin que l'ouverture, comme un jet d'eau forcé par un goulot | non | **OND-DIF-3** | « Mesure le couloir qui sort sur l'image : il fait exactement la largeur de l'ouverture, ni plus fin, ni plus large. Une onde n'est pas un jet qu'on comprime — rien, dans une paroi percée, ne pousse l'onde vers l'axe. Une ouverture ne concentre jamais. » |

- **`suite` :** « Fais glisser la largeur de l'ouverture, de $4{,}0$ jusqu'à
  $0{,}50\ \text{cm}$, et relance à chaque fois. Le couloir droit s'ouvre, puis
  se déforme, puis devient un éventail d'arcs qui contourne les deux bords de la
  paroi. **À longueur d'onde fixée**, c'est donc bien la largeur de l'ouverture
  qui commande l'étalement. Note-le, et règle l'ouverture sur $1{,}0\ \text{cm}$
  avant de continuer : l'étape suivante n'y touchera plus. »
- **⟂-avant-pari :** l'eau en mouvement, quelle qu'elle soit (le champ est
  **plat**, variance nulle) ; la lecture `comparaison` et sa phrase ; toute
  enveloppe d'amplitude ; la limite de l'ombre géométrique ; le bouton de course ;
  le verdict et les retours ; tout pixel d'accent (mesuré en **chrominance**,
  pas en luminance) ; la description lue au lecteur d'écran ne doit contenir ni
  « tout droit », ni « s'étale », ni « couloir », ni « diffraction ».
  **Reste visible (l'énoncé) :** la cuve, la règle vibrante et sa fréquence, la
  paroi, l'ouverture avec son crochet de largeur coté $4{,}0\ \text{cm}$, la
  règle de $\lambda$ cotée $0{,}50\ \text{cm}$ **à la même échelle**, la
  célérité.

### 7.2 S2 — `meme-fente-autre-onde` · « La même fente, une autre onde »

C'est **l'étape centrale** (§2.2) : la seule du corpus entier où $\lambda$ varie
à $a$ fixée.

- **État :** `a_cm: 1.0`, `f_hz: "5"` ($\lambda = 4{,}0\ \text{cm}$, donc
  $a = \lambda/4$), `chemin: aucun`, **`reference: "40Hz"`**.
- **Contrôle ouvert :** `frequence`. **Lectures :** `longueur-onde`,
  `comparaison`, `celerite`.
- **`revele_apres_course: 1`** — course en **deux phases** (§6) : d'abord
  $40\ \text{Hz}$, puis $5{,}0\ \text{Hz}$, **avec la même ouverture**.
- **Consigne :** « L'ouverture est réglée sur $1{,}0\ \text{cm}$, et **on n'y
  touchera plus** : ni maintenant, ni pendant la course. On change une seule
  chose, la règle vibrante : elle battait $40$ fois par seconde, elle battra
  $5{,}0$ fois par seconde. Même cuve, même eau, même fond — donc même célérité,
  $0{,}20\ \text{m/s}$. Seule la longueur des rides change : $4{,}0\ \text{cm}$
  au lieu de $0{,}50$. La course te montrera d'abord l'ancien réglage, puis le
  nouveau, avec la même ouverture. »
- **Pari :** « Derrière cette ouverture qui n'a pas bougé, le motif… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `inchange` | sera le même : l'ouverture n'a pas changé, et c'est elle qui décide de la diffraction | non | **OND-DIF-4** *(proposé, §8.2 ; repli : OND-DIF-1)* | « La cuve vient de te montrer les deux, l'un après l'autre, avec la **même** ouverture de $1{,}0\ \text{cm}$ : un couloir presque droit, puis un éventail d'arcs qui contourne les deux bords de la paroi. L'ouverture n'a pas bougé d'un dixième de millimètre. Ce qui a changé, c'est l'onde — et donc la **comparaison** : $1{,}0\ \text{cm}$ valait deux longueurs d'onde, il n'en vaut plus qu'un quart. Une ouverture n'est jamais « large » ou « étroite » toute seule ; elle l'est **devant une longueur d'onde**. » |
| `plus-etale` | s'étalera beaucoup plus | **oui** | — | « Oui — et c'est le point le plus important du chapitre. L'ouverture est restée à $1{,}0\ \text{cm}$ ; c'est l'onde qui est passée de $0{,}50$ à $4{,}0\ \text{cm}$. La même ouverture était **large** pour la première ($a = 2\lambda$) et **étroite** pour la seconde ($a = \lambda/4$). La condition ne porte donc jamais sur $a$ seule : elle compare $a$ et $\lambda$, et on peut la faire basculer en ne touchant qu'à l'une des deux. » |
| `moins-etale` | se resserrera : une ride de $4{,}0\ \text{cm}$ passe mal par une ouverture de $1{,}0\ \text{cm}$, elle ressortira donc plus concentrée | non | **OND-DIF-3** | « Regarde la seconde moitié de la course. L'onde longue ne « passe pas mal » : elle passe, et elle s'ouvre en éventail, jusque derrière les bords de la paroi — là où la géométrie dirait qu'il n'y a rien. Plus l'ouverture est petite **devant** la longueur d'onde, plus l'onde s'étale. Jamais l'inverse. » |

- **`suite` :** « Repasse les quatre crans du vibreur sans toucher à l'ouverture :
  $40$, $20$, $10$, $5{,}0\ \text{Hz}$, c'est-à-dire des rides de $0{,}50$,
  $1{,}0$, $2{,}0$ et $4{,}0\ \text{cm}$. La même ouverture de $1{,}0\ \text{cm}$
  vaut successivement $2\lambda$, $\lambda$, $\lambda/2$, $\lambda/4$ — et
  l'éventail s'ouvre à chaque cran. »
- **⟂-avant-pari :** tout mouvement, **y compris la phase de référence** ; la
  lecture `comparaison` ; toute enveloppe ; le verdict. **Reste visible :** la
  cuve, l'ouverture cotée $1{,}0\ \text{cm}$, la règle de $\lambda$ cotée
  $4{,}0\ \text{cm}$ **à la même échelle** (les deux segments côte à côte disent
  déjà tout l'énoncé), la fréquence, la célérité.

### 7.3 S3 — `ce-qui-ne-change-pas` · « Ce que l'ouverture ne touche pas »

- **État :** `a_cm: 0.5`, `f_hz: "10"` ($\lambda = 2{,}0\ \text{cm}$, donc
  $a = \lambda/4$), `chemin: axe`, `sonde_cm: -4.0`.
- **Contrôle ouvert :** `sonde`. **Lectures :** `lambda-mesuree`,
  `periode-sonde`, `amplitude`, `celerite`.
- **`revele_apres_course: 1`** ($2{,}5\ \text{s}$).
- **Consigne :** « Ouverture de $0{,}50\ \text{cm}$, rides de $2{,}0\ \text{cm}$ :
  l'onde va largement s'étaler, tu le sais maintenant. Un flotteur — la sonde —
  est posé sur l'axe, $4{,}0\ \text{cm}$ **avant** la paroi ; il enregistre la
  hauteur de l'eau sous lui. La cuve mesurera aussi, sur l'image, l'écart entre
  deux crêtes voisines, **de chaque côté** de la paroi. »
- **Pari :** « De l'autre côté de l'ouverture, l'onde s'étale largement. Mais son
  rythme et l'écart entre ses crêtes… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `tout-conserve` | sont les mêmes qu'avant la paroi — $10$ crêtes par seconde, $2{,}0\ \text{cm}$ d'écart, $0{,}20\ \text{m/s}$ — et seule la direction a changé | **oui** | — | « Oui, et la raison est déjà dans ton cours. Le rythme vient de la règle vibrante, et la paroi n'est pas une règle vibrante : c'est un obstacle percé, qui ne bat rien du tout. La célérité vient de l'eau, et c'est la même eau des deux côtés. Comme $\lambda = c/f$ et que ni $c$ ni $f$ n'ont changé, $\lambda$ non plus. La diffraction ne change que la **géométrie**. » |
| `lambda-comprimee` | les crêtes ressortent plus serrées : l'ouverture, quatre fois plus étroite qu'une longueur d'onde, a comprimé l'onde en la laissant passer | non | **OND-DIF-2** (forme $\lambda$) | « Compare les deux règles que la cuve vient de poser : $2{,}0\ \text{cm}$ avant la paroi, $2{,}0\ \text{cm}$ après, mesurés sur les arcs. Rien n'a été comprimé. Une ouverture n'agit pas sur l'onde comme une pince sur un ressort : elle décide seulement **par où** l'onde peut passer, jamais à quel rythme elle bat. » |
| `c-goulot` | l'eau accélère en franchissant l'ouverture, comme dans un goulot d'étranglement : la célérité augmente derrière la paroi | non | **OND-DIF-2** (forme $c$) | « La sonde tranche : la première crête met le même temps pour parcourir $4{,}0\ \text{cm}$ avant la paroi et $4{,}0\ \text{cm}$ après — $0{,}20\ \text{s}$ dans les deux cas, soit $0{,}20\ \text{m/s}$. Le goulot d'étranglement est une image de **fluide qui s'écoule** ; ici rien ne s'écoule. L'eau reste sur place, et c'est la perturbation qui avance, à la vitesse que l'eau lui impose. » |

- **`suite` :** « Fais glisser la sonde le long de l'axe, d'un bout à l'autre :
  $4{,}0\ \text{cm}$ avant la paroi, $14\ \text{cm}$ après. Le comptage ne bouge
  pas — $10$ crêtes par seconde partout. L'écart entre crêtes non plus —
  $2{,}0\ \text{cm}$ partout. Ce qui baisse en s'éloignant, c'est
  **l'amplitude** : la même onde se répartit sur un domaine de plus en plus
  large. Elle s'étale ; elle ne ralentit pas, et elle ne change pas de rythme. »
- **⟂-avant-pari :** les deux règles de $\lambda$ ; le comptage ; l'amplitude ;
  tout mouvement ; le verdict. **Reste visible :** la cuve, l'ouverture, le
  flotteur à sa position de départ (sans lecture), la fréquence de la règle
  vibrante, la célérité.

### 7.4 S4 — `sur-l-arc` · « Le récepteur sur l'arc »

- **État :** `a_cm: 4.0`, `f_hz: "40"` ($\lambda = 0{,}50\ \text{cm}$, donc
  $a = 8\lambda$), `chemin: arc`, `recepteur_deg: 0`.
- **Contrôles ouverts :** `recepteur` (**neuf**) et `fente` (**rouvert**,
  justification en §7.6). **Lectures :** `amplitude`, `angle`, `comparaison`.
- **`revele_apres_course: 1`** — course en deux phases (§6) : établissement, puis
  **balayage scripté** de $0°$ à $60°$, profil tracé point par point.
- **Consigne :** « C'est le montage du cours, transposé dans la cuve. Un arc de
  cercle centré sur l'ouverture, à $7{,}0\ \text{cm}$ d'elle, et un récepteur
  qu'on déplace dessus pour mesurer l'amplitude reçue **selon la direction** ;
  $0°$, c'est droit devant l'ouverture. L'ouverture est large — $4{,}0\ \text{cm}$
  — pour des rides de $0{,}50\ \text{cm}$. Après la course, la cuve promènera
  elle-même le récepteur de $0°$ à $60°$ et tracera ce qu'il lit. »
- **Pari :** « Pendant ce balayage, le récepteur va mesurer… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `partout-pareil` | la même amplitude dans toutes les directions : une fois passée l'ouverture, l'onde rayonne de partout | non | **OND-DIF-1** | « Le profil que la cuve vient de tracer tombe très vite : à $20°$ le récepteur ne lit plus que quelques pour cent de ce qu'il lisait à $0°$, et à $40°$ presque rien. Une ouverture **large devant la longueur d'onde** ne rayonne pas dans toutes les directions — elle envoie l'onde tout droit. Ce que tu décris serait vrai d'une ouverture étroite devant $\lambda$ ; celle-ci en vaut huit. » |
| `pic-puis-chute` | beaucoup droit devant, puis une chute rapide dès qu'on s'écarte de l'axe de l'ouverture | **oui** | — | « Oui. Un pic étroit autour de $0°$, puis quelques petites bosses bien plus faibles : c'est la signature d'une ouverture large devant la longueur d'onde. Et c'est **cette courbe**, pas une photographie, que donne le banc à ultrasons décrit plus loin dans le chapitre — un récepteur qu'on promène sur un arc et dont on note l'amplitude direction par direction. » |
| `zero-hors-axe` | exactement zéro dès qu'on sort du prolongement de l'ouverture : en dehors, il n'y a rien | non | **OND-DIF-3** | « Regarde les valeurs entre $20°$ et $40°$ : elles sont petites, mais elles ne sont pas nulles — le récepteur détecte encore. C'est déjà de la diffraction, même ici, même faiblement. Le « zéro net » serait vrai si l'onde suivait des lignes droites ; aucune onde ne fait exactement ça, et c'est précisément pour ça que ce chapitre existe. » |

- **`suite` :** « Réduis maintenant l'ouverture — $1{,}0\ \text{cm}$, puis
  $0{,}50\ \text{cm}$ — et refais le balayage à la main, cran par cran. À
  $4{,}0\ \text{cm}$, le récepteur avait perdu le signal avant $30°$ ; à
  $0{,}50\ \text{cm}$, il en trouve encore au bout de l'arc, à $60°$. C'est mot
  pour mot ce que dit le montage à ultrasons du cours : en réduisant $a$, le
  domaine de directions où le récepteur détecte encore quelque chose
  **s'élargit**. »
- **⟂-avant-pari :** le profil, entier ou partiel ; l'amplitude ; l'enveloppe ;
  tout mouvement du récepteur ; le verdict. **Reste visible :** la cuve,
  l'ouverture cotée, la règle de $\lambda$, **l'arc vide** et le récepteur posé à
  $0°$ (l'appareil est l'énoncé ; ce qu'il lit est la réponse).

### 7.5 S5 — `libre` · « À toi : l'ouverture, l'onde, les deux instruments »

- **État :** `a_cm: 2.0`, `f_hz: "10"` ($\lambda = 2{,}0\ \text{cm}$, donc
  $a = \lambda$), `chemin: arc`, `recepteur_deg: 0`, `sonde_cm: 6.0`.
- **Contrôles ouverts :** les quatre. **Lectures :** les huit.
- **Pas de `revele_apres_course`** — le pari compare **trois réglages** ; une
  seule course ne pourrait pas le trancher. Verdict immédiat, puis les contrôles
  s'ouvrent et l'élève va vérifier les trois. (Écart assumé avec les quatre
  autres étapes ; c'est l'étape où l'échafaudage tombe. Même choix que le manège.)
- **Consigne :** « Tout s'ouvre : la largeur de l'ouverture, de $0{,}50$ à
  $4{,}0\ \text{cm}$ ; les quatre battements du vibreur, de $5{,}0$ à
  $40\ \text{Hz}$ ; la sonde sur l'axe et le récepteur sur l'arc. La célérité,
  elle, ne se règle pas : c'est l'eau qui la fixe, $0{,}20\ \text{m/s}$, la même
  pour tous les réglages. »
- **Pari :** « Tu veux que l'onde s'étale le plus largement possible derrière la
  paroi. Deux réglages à choisir : la largeur de l'ouverture, et le battement du
  vibreur. Le meilleur, c'est… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `tout-grand` | l'ouverture la plus large ($4{,}0\ \text{cm}$) **et** le battement le plus lent ($5{,}0\ \text{Hz}$, rides de $4{,}0\ \text{cm}$) : une grande ouverture et une grande onde, tout est grand | non | **OND-DIF-1** | « Essaie ce réglage, puis garde le même vibreur et referme l'ouverture jusqu'à $0{,}50\ \text{cm}$ : le récepteur passe de « plus rien après $40°$ » à « du signal jusqu'au bout de l'arc ». Ici $a$ et $\lambda$ valent tous les deux $4{,}0\ \text{cm}$ : leur rapport vaut $1$, et l'étalement n'est que moyen. « Grand » n'est pas une qualité qui s'additionne — c'est le **rapport** des deux longueurs qui décide. » |
| `etroite-et-lente` | l'ouverture la plus étroite ($0{,}50\ \text{cm}$) **et** le battement le plus lent ($5{,}0\ \text{Hz}$, rides de $4{,}0\ \text{cm}$) | **oui** | — | « Oui : $a = 0{,}50\ \text{cm}$ pour $\lambda = 4{,}0\ \text{cm}$, soit $a = \lambda/8$ — le plus petit rapport que cette cuve puisse atteindre, et le plus large éventail. Le récepteur trouve du signal jusqu'au bout de l'arc, à $60°$. » |
| `etroite-et-rapide` | l'ouverture la plus étroite ($0{,}50\ \text{cm}$) **et** le battement le plus rapide ($40\ \text{Hz}$, rides de $0{,}50\ \text{cm}$) : la fente la plus fine possible, donc le maximum d'étalement | non | **OND-DIF-4** *(proposé, §8.2 ; repli : OND-DIF-1)* | « Tu as choisi la fente la plus fine de toute la cuve — et pourtant l'éventail y est plus **étroit** qu'avec la même fente réglée sur l'onde la plus longue. Garde l'ouverture à $0{,}50\ \text{cm}$ et change seulement le vibreur, de $40$ à $5{,}0\ \text{Hz}$ : le récepteur gagne tout le haut de l'arc. Dans ton réglage, $a$ et $\lambda$ valaient tous les deux $0{,}50\ \text{cm}$ — rapport $1$. Dans le bon, $a = \lambda/8$. Ce n'est pas la fente la plus fine qui gagne : c'est la fente la plus fine **devant la longueur d'onde**. » |

- **`suite` :** « Vérifie les trois, un par un, en lisant l'amplitude à $60°$ :
  le signal y est faible avec les deux premiers réglages, net avec le bon. Puis
  fais l'expérience qui résume tout le chapitre : garde l'ouverture fixe et
  parcours les quatre vibrations, puis garde le vibreur fixe et parcours les
  largeurs. Les deux manœuvres produisent le même effet, parce qu'elles agissent
  toutes les deux sur la **même** chose — le rapport entre la largeur de
  l'ouverture et la longueur d'onde. »
- **⟂-avant-pari :** les huit lectures ; le profil sur l'arc ; l'enveloppe ; tout
  mouvement ; le verdict.

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes.** Tout ce qui dépend de l'ISSUE attend
la révélation : **l'eau en mouvement** (le champ est plat, et c'est la forme la
plus visible de la règle ici), l'enveloppe d'amplitude, le profil sur l'arc, les
règles de $\lambda$, la limite de l'ombre géométrique, toute lecture, le verdict,
et la phrase lue au lecteur d'écran. Ce qui reste, c'est **l'énoncé** : la cuve,
la paroi, l'ouverture cotée, la règle de $\lambda$ cotée à la même échelle, les
instruments **vides**.

**Une différence avec les scènes 3D, à noter :** il n'y a **pas d'exception de
vues**. Les scènes 3D gardent trois vues prédéfinies disponibles avant le pari
parce qu'elles sont l'équivalent clavier du glisser (WCAG 2.4.11). Ici il n'y a
ni caméra, ni glisser, ni point de vue : la cuve se regarde de dessus,
orthogonalement, à une seule échelle. **Le contrat avant-pari est donc entier,
sans exception à faire valider.**

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du 2026-09-24 soir) :
*ce qu'une étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT
fait deviner.* Table écrite étape par étape, à re-vérifier par la porte contre
le descripteur :

| étape | contrôles ouverts | ce qu'ils peuvent atteindre | pari suivant mis en danger ? |
|---|---|---|---|
| S1 | `fente` seul, à $\lambda = 0{,}50\ \text{cm}$ | $a/\lambda \in [1\ ;\ 8]$, **une seule onde** | **non** : le pari de S2 demande le contraire — $a$ figée, $\lambda$ qui change. Aucun réglage de S1 n'y donne accès. |
| S2 | `frequence` seul, à $a = 1{,}0\ \text{cm}$ | $a/\lambda \in [0{,}25\ ;\ 2]$ | **non** : S3 se joue sur des lectures (`lambda-mesuree`, comptage) qu'aucun réglage de S2 n'allume ; S4 exige l'arc, absent du DOM ; l'état gagnant de S5 ($0{,}50$ cm ; $4{,}0$ cm) est hors d'atteinte, `fente` étant fermée. |
| S3 | `sonde` seul, **contrainte à l'axe** | des lectures, en un point, sur l'axe | **non** : la sonde ne change rien au champ, et **ne quitte pas l'axe** — elle ne peut donc rien dire du domaine angulaire, qui est le pari de S4. |
| S4 | `recepteur` (neuf) + **`fente` rouvert**, à $\lambda = 0{,}50\ \text{cm}$ | $a/\lambda \in [1\ ;\ 8]$ | **non** : les trois réglages du pari de S5 exigent $\lambda = 4{,}0$ ou $0{,}50\ \text{cm}$ **avec** une largeur donnée ; `frequence` est fermée, donc $(0{,}50\ ;\ 4{,}0)$ — la bonne réponse — est inatteignable. |
| S5 | les quatre | tout | — |

**Pourquoi `fente` est rouvert en S4, et pourquoi c'est légitime.** La `suite`
de S4 est la manœuvre du TP : *réduire $a$ et voir le domaine s'élargir*. Sans
`fente`, elle serait une phrase au lieu d'un geste — et le savoir-faire
« proposer un montage » resterait, encore une fois, enseigné sans être pratiqué.
Ce n'est pas un contrôle **neuf** (l'élève le connaît depuis S1) ; la règle
« un contrôle neuf par étape » de l'ADR 0041 §4 est respectée : le neuf, c'est
`recepteur`. Le précédent existe (manège S5 rouvre `force` et `distance`).

**Le cas limite, dit franchement.** Un élève qui a compris S1 et S2 peut
*déduire* la réponse de S5 sans rien manipuler. Ce n'est pas une fuite : la
règle interdit d'**atteindre l'état** qu'un pari fait deviner, pas de
comprendre la physique qui y mène. S5 est la consolidation ; elle doit être
gagnable par le raisonnement.

---

## 8. Misconceptions

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions déclarées visées |
|---|---|
| S1 | `OND-DIF-1` (« grande ouverture ⇒ effet marqué ») · `OND-DIF-3` (le jet d'eau, forme « l'ouverture concentre ») |
| S2 | **`OND-DIF-4` proposé** (repli `OND-DIF-1`) · `OND-DIF-3` |
| S3 | `OND-DIF-2` (deux formes : $\lambda$ comprimée, $c$ accélérée par le goulot) |
| S4 | `OND-DIF-1` (forme « ça rayonne partout ») · `OND-DIF-3` (forme « zéro hors de l'axe ») |
| S5 | `OND-DIF-1` · **`OND-DIF-4` proposé** (repli `OND-DIF-1`) |

**Co-attribution assumée.** Le distracteur `moins-etale` de S2 est atteignable
par deux modèles : l'intuition de concentration (`OND-DIF-3`) et « la fente seule
décide » (`OND-DIF-4`). Ce n'est **pas** un défaut d'énoncé — c'est une
co-attribution cible-distracteur entre modèles, qui demande un **double
étiquetage**, pas une réécriture. (La distinction est celle du standard : une
contamination de la **bonne** réponse serait un défaut ; une co-attribution de
**distracteur** n'en est pas un.)

### 8.2 « La fente seule décide » est-elle couverte ? — non, et c'est le trou que la scène révèle

Les trois modèles de diffraction déclarés sont :

- `OND-DIF-1` : **condition inversée** — « il faut $a \gg \lambda$ ».
- `OND-DIF-2` : l'onde diffractée **change** $f$, $\lambda$ ou $c$.
- `OND-DIF-3` : intuition **jet d'eau** — une ouverture plus petite **concentre**.

Le modèle que S2 et S5 débusquent n'est aucun des trois. Il est **beaucoup plus
difficile à voir** parce qu'il **coche la bonne réponse partout dans le corpus
actuel** : l'élève qui croit que *la diffraction se décide sur la seule valeur
de $a$* répond juste à OMPP-19 (« $a$ de l'ordre de $\lambda$, ou inférieure »),
juste à `cp-r5-diffraction`, juste à OMPP-20 (deux fentes, une onde) et juste à
OMPP-21. Il a retenu « petite fente ⇒ diffraction » et **la phrase du cours le
lui confirme**, parce qu'aucune question ne bouge jamais $\lambda$.

Ce n'est pas `OND-DIF-1` : la condition n'est pas inversée, elle est **amputée
de son second terme**. Les deux élèves ne font pas la même erreur et ne se
rattrapent pas de la même façon — fusionner les deux sous une étiquette, c'est
un compteur qui ne dit plus lequel tourne (même argument que le manège, §8.2 de
sa spec).

**Recommandation : ouvrir un quatrième modèle de diffraction.** Proposition
complète :

```yaml
  - id: OND-DIF-4
    description: >
      Condition AMPUTÉE (et non inversée) : l'élève retient « petite ouverture
      ⇒ diffraction » et décide sur la seule valeur de $a$, sans jamais la
      comparer à $\lambda$. Formes : croire qu'à ouverture inchangée le motif
      ne peut pas changer (changer la fréquence de la source ne changerait
      rien derrière la fente) ; croire que la fente la plus étroite donne
      toujours le plus grand étalement, quelle que soit l'onde ; parler d'une
      ouverture « large » ou « étroite » dans l'absolu, en millimètres, sans
      second terme. Ce modèle répond CORRECTEMENT à toute question où
      $\lambda$ est fixée et seule $a$ varie : il ne se révèle qu'en faisant
      varier $\lambda$ à $a$ constante.
```

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige désormais qu'un `misconception:` employé par un pari de
scène soit **déclaré dans `items.yaml` au moment où la scène est validée**. Si
le quatrième modèle n'est pas accepté, **la scène part avec `OND-DIF-1` sur les
deux choix concernés** et une seule ligne change à l'adoption.

### 8.3 Les trois items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** où au moins un distracteur porte le
modèle. **Les paris de la scène ne comptent pas** — le modèle apprenant est bâti
sur le banc de fin seul (`coverage_summary.method`).

**OMPP-26** — `rung: R5`, `difficulty_level: 3`,
`habilete: utilisation`, `primary_misconception: OND-DIF-4`

- *stem :* Dans une cuve à ondes, une paroi est percée d'une ouverture de
  largeur $a = 1{,}0\ \text{cm}$ ; le vibreur bat à $40\ \text{Hz}$ et la
  célérité des rides vaut $0{,}20\ \text{m/s}$. **Sans toucher à l'ouverture**,
  on ramène le vibreur à $5{,}0\ \text{Hz}$. Que devient l'étalement de l'onde
  derrière l'ouverture ?
- *clé :* il augmente nettement — $\lambda$ passe de $0{,}50$ à $4{,}0\ \text{cm}$,
  donc $a$ passe de $2\lambda$ à $\lambda/4$.
- *distracteurs :* « il ne change pas : l'ouverture n'a pas bougé, et c'est elle
  qui fixe la diffraction » → **OND-DIF-4** · « il diminue : une onde plus
  longue passe moins bien par une ouverture étroite » → `OND-DIF-3` ·
  « impossible à dire sans connaître l'amplitude du vibreur » →
  `OND-CALC-1` *(voir la réserve du §8.5)*.

**OMPP-27** — `rung: R5`, `difficulty_level: 3`,
**`habilete: application_experimentale`**, même `primary_misconception`

- *stem :* Sur un banc à ultrasons (émetteur, fente réglable, récepteur mobile
  sur un arc), on relève le domaine angulaire dans lequel le récepteur détecte
  encore un signal, pour quatre réglages :

  | réglage | $a$ | $f$ | domaine détecté |
  |---|---|---|---|
  | 1 | $2{,}0\ \text{cm}$ | $40\ \text{kHz}$ | étroit |
  | 2 | $2{,}0\ \text{cm}$ | $20\ \text{kHz}$ | moyen |
  | 3 | $1{,}0\ \text{cm}$ | $40\ \text{kHz}$ | moyen |
  | 4 | $1{,}0\ \text{cm}$ | $20\ \text{kHz}$ | large |

  ($c \approx 340\ \text{m/s}$.) Quelle grandeur classe ces quatre réglages ?
- *clé :* le rapport $a/\lambda$ — il vaut $2{,}4$ · $1{,}2$ · $1{,}2$ · $0{,}59$,
  et les réglages 2 et 3, qui ont le même rapport, donnent le même domaine.
- *distracteurs :* « la largeur de la fente seule : $2{,}0\ \text{cm}$ donne
  toujours moins que $1{,}0\ \text{cm}$ » → **OND-DIF-4** *(et le tableau le
  réfute : les réglages 2 et 3 ont des largeurs différentes et le même
  domaine)* · « la fréquence seule » → `OND-DIF-4` (forme symétrique) ·
  « l'amplitude émise » → `OND-DIF-2`.
- *exigence de rédaction :* aucun distracteur ne nomme sa propre faute ; chaque
  `feedback` donne la **raison**, jamais l'étiquette.

**OMPP-28** — `rung: R5`, `difficulty_level: 4`,
`habilete: resolution_probleme`, même `primary_misconception`
(co-étiquetage assumé avec `OND-DIF-1` sur un distracteur)

- *stem :* Une porte ouverte de $0{,}80\ \text{m}$ laisse passer, depuis la
  pièce voisine, une voix ($f \approx 300\ \text{Hz}$) et un sifflement aigu
  ($f \approx 8\ \text{kHz}$) ; $c \approx 340\ \text{m/s}$. On se place dans le
  couloir, **hors de l'alignement de la porte**. Qu'entend-on ?
- *clé :* la voix nettement, le sifflement très peu : $\lambda_{voix} \approx
  1{,}1\ \text{m} > a$ (diffraction marquée), $\lambda_{sifflement} \approx
  4{,}3\ \text{cm} \ll a$ (l'onde file tout droit). **Une seule et même
  ouverture**, deux comportements.
- *distracteurs :* « les deux pareil : c'est la même porte » → **OND-DIF-4** ·
  « le sifflement mieux : plus la fréquence est haute, mieux l'onde contourne »
  → `OND-DIF-1` · « ni l'un ni l'autre : hors de l'alignement de la porte, il
  n'y a pas de son » → `OND-DIF-3`.

### 8.4 Ce que ces trois items font au reste du fichier

- `OND-DIF-4` : **3** (OMPP-26, 27, 28) — plancher atteint, marge nulle.
- `OND-DIF-1` : 3 → **4** · `OND-DIF-2` : 3 → **4** · `OND-DIF-3` : 3 → **5**
  · `OND-CALC-1` : voir la réserve du §8.5.
- `ramp_coverage` R5 : 3 → **6** · `total_items` : 25 → **28**.
- **Deux dettes chiffrées de la `REVIEW-2026-09-19` reculent** : OMPP-27 porte
  `application_experimentale` (1 item sur 25, soit 4 %, contre 15 % visés →
  2 sur 28, soit 7 % ; **le trou n'est pas comblé, il est entamé** — voir la
  question 7) ; et le savoir-faire « **proposer un montage** de diffraction »
  cesse d'être le seul savoir-faire enseigné sans être évalué.
- **`coverage_summary` est un tableau GÉNÉRÉ** : le régénérer par
  `node web/scripts/resume-couverture.mjs`, ne jamais le retoucher à la main.

### 8.5 Voie de repli (si le propriétaire refuse un quatrième modèle)

1. amender la `description` d'`OND-DIF-1` pour y écrire la forme amputée :
   « …ou **décide sur la seule valeur de $a$, sans la comparer à $\lambda$ — et
   croit donc qu'à ouverture inchangée le motif ne peut pas changer** » ;
2. étiqueter OMPP-26/27/28 et les deux choix concernés de la scène sur
   `OND-DIF-1` ;
3. accepter la perte diagnostique et l'**écrire** dans `coverage_summary`, comme
   la `REVIEW` l'a fait pour la réserve `OND-CALC-1`.

*Réserve héritée à ne pas aggraver :* la `REVIEW-2026-09-19` §6 signale que
`OND-CALC-1` sert déjà de fourre-tout pour des « refus de conclure » qui ne sont
pas des inversions. Le distracteur « impossible à dire sans… » d'OMPP-26 tombe
dans la même catégorie. **À trancher avec la même décision** — ne pas l'ajouter
en silence.

---

## 9. La frontière — ce que la scène ne montre ni ne calcule

Chaque interdit est **gardé par la porte** (§11, famille `frontiere`) : une
frontière que seule la retenue de l'auteur tient se perd à la première retouche
(ADR 0041, addendum du 2026-09-24).

1. **Aucune relation quantitative de diffraction.** Ni $\theta$, ni
   $\theta = \lambda/a$, ni $\sin\theta$, ni « demi-largeur angulaire », ni
   « largeur de la tache », ni aucune **largeur angulaire affichée en nombre**.
   Le **seul** angle affiché est la position du récepteur, et elle est **égale au
   réglage** que l'élève a posé : la porte vérifie que l'ensemble des valeurs en
   degrés présentes dans le panneau est inclus dans $\{$la valeur du contrôle
   `recepteur`$\}$.
   *Corollaire à écrire, parce qu'il surprend :* **la porte, elle, a le droit de
   mesurer ce que le produit n'a pas le droit d'enseigner.** Elle calcule des
   largeurs angulaires pour vérifier des monotonies (§11.1) ; le produit n'en
   affiche aucune.
2. **Aucune diffraction de la lumière.** Ni écran, ni tache centrale, ni frange,
   ni ordre, ni couleur. Le renvoi de la leçon vers `propagation-onde-lumineuse`
   reste un renvoi.
3. **Aucune interférence** (exclusion du sous-domaine) : **l'ouverture est
   toujours unique**, aucun réglage ne peut en produire deux, aucun mot de la
   famille « interférence / interfrange / Young / cohérence » n'apparaît. Et
   **aucune superposition de deux motifs** à l'image (§6, « aucune trace entre
   étapes ») : deux champs superposés ressembleraient à ce que le cadre exclut.
4. **Aucun formalisme de Huygens–Fresnel.** Ni « principe de Huygens », ni
   sources secondaires **dessinées**, ni somme de sources affichée. La phrase de
   la leçon — « comme si l'ouverture était devenue une nouvelle source » — est la
   seule formulation autorisée, et c'est une **image**, pas une construction.
   Le champ est obtenu en résolvant l'équation d'onde, jamais en sommant des
   ondelettes visibles à l'écran.
5. **Aucune équation de propagation affichée.** Ni $\partial^2 u/\partial t^2$,
   ni laplacien, ni schéma numérique, ni le mot « équation d'onde » (§1, dernier
   paragraphe).
6. **Aucune dispersion.** La célérité est la même pour les quatre fréquences,
   affichée comme constante, et la scène **n'offre pas de milieu dispersif** :
   c'est le chapitre R6, et un tel réglage détruirait l'argument « on n'a changé
   que $\lambda$ » de S2. La limite du modèle est dite en légende (§10).
7. **Aucun changement de milieu, aucune réfraction, aucune réflexion étudiée.**
   Une seule profondeur, une seule eau, des bords absorbants — et pas de
   « coefficient de réflexion » affiché.
8. **Aucune amplitude en unité physique.** L'amplitude est **relative**, en
   pourcentage du maximum sur l'axe. Pas de millimètres de hauteur d'eau, pas
   d'« intensité », pas de décibels, aucune loi de décroissance affichée.
9. **Aucun effet Doppler** : la règle vibrante ne se déplace jamais.
10. **Aucune 3D.** Vue de dessus, orthogonale, une seule échelle, pas de caméra,
    pas de perspective, pas de glisser-pour-tourner. **`window.__THREE__` doit
    rester indéfini même panneau OUVERT** — c'est une famille de porte à part
    entière (§11.2), et c'est la traduction mesurable de la rétractation de
    l'ADR 0041.
11. **La scène ne remplace pas le TP.** Elle *ressemble* au montage du cadre et
    peut en nourrir des items de lecture de données ; elle **n'est pas** une
    mesure réelle, et la légende ne prétend jamais le contraire.

---

## 10. Ce que cette simulation peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus dangereuse.
Ce paragraphe est à reprendre **mot pour mot** dans le champ `fit_caveat` du
descripteur, et ses deux premiers points doivent apparaître **en légende**, sous
la cuve, en une phrase chacun.

1. **La cuve est idéalement non dispersive, et ce n'est pas tout à fait vrai
   d'une vraie cuve.** La scène pose $c = 0{,}20\ \text{m/s}$ pour les quatre
   fréquences. Dans une vraie cuve de $4\ \text{mm}$ de fond, une ride de
   $4\ \text{cm}$ avance à environ $0{,}19\ \text{m/s}$ et une ride de
   $0{,}5\ \text{cm}$ à environ $0{,}12\ \text{m/s}$ : les vagues à la surface de
   l'eau sont **légèrement dispersives**, ce que le chapitre 7 (R6) de cette même
   leçon dit explicitement. Le choix est assumé, pour deux raisons : c'est le
   modèle du chapitre 3 ($\lambda = c/f$, $c$ fixée par le milieu), et c'est la
   **seule** hypothèse qui permette de dire honnêtement, à l'étape 2, « on n'a
   changé que $\lambda$ ». Sur un banc à ultrasons — l'air étant quasi non
   dispersif — cette hypothèse serait exacte.
   *Légende, une phrase :* « Cuve idéalisée : ici toutes les fréquences avancent
   à la même célérité. Dans une vraie cuve, la célérité dépend un peu de la
   longueur d'onde — c'est le chapitre 7. »
2. **Les bords absorbent, et une vraie cuve aussi.** Sans bandes absorbantes, les
   rides reviendraient des quatre côtés et brouilleraient le motif. Les vraies
   cuves ont des berges inclinées pour exactement cette raison. Ce n'est donc pas
   un artifice de calcul caché : c'est l'appareil.
   *Légende, une phrase :* « Les bords absorbent l'onde, comme les berges
   inclinées d'une vraie cuve. »
3. **La grille est finie, et elle est exactement divisible.** Le champ est
   calculé sur des cellules de $0{,}5\ \text{mm}$. Toutes les largeurs
   d'ouverture et toutes les longueurs d'onde atteignables font un nombre entier
   de cellules : la cuve ne montre jamais un « presque $2{,}0\ \text{cm}$ »
   qu'elle appellerait $2{,}0\ \text{cm}$. En revanche, à $10$ cellules par
   longueur d'onde (le cran le plus fin), le calcul introduit environ $1\ \%$
   d'erreur sur la vitesse : d'où les **deux chiffres significatifs** des
   lectures mesurées (§5.4), qui est la précision à laquelle la simulation dit
   vrai.
4. **L'arc est à $7{,}0\ \text{cm}$, ce qui est loin pour une ride de
   $0{,}5\ \text{cm}$ et proche pour une ride de $4\ \text{cm}$.** Les profils
   relevés à deux fréquences très différentes ne sont donc pas rigoureusement
   comparables entre eux. **Ce qui est comparable — et c'est ce que la scène et
   la porte affirment — ce sont les deux monotonies** : à onde fixée, resserrer
   l'ouverture élargit le domaine ; à ouverture fixée, allonger l'onde
   l'élargit aussi. La scène ne prétend nulle part que deux réglages de même
   rapport $a/\lambda$ donneraient un profil identique : ce serait faux dans une
   cuve de taille fixe, et rien dans les retours ne le dit.
5. **L'amplitude est relative.** Le profil est normalisé par sa valeur à $0°$
   pour chaque réglage. C'est ce que fait un expérimentateur qui cherche un
   **domaine** de directions ; c'est aussi ce qui empêche de comparer la force
   absolue de deux réglages, et la légende de l'arc le dit : « $100\ \%$ = ce que
   le récepteur lit droit devant, pour ce réglage-là ».
6. **Ce qu'une vraie cuve montrerait de plus, et qui manque ici :** les
   réflexions parasites, l'amortissement visqueux réel, la tension superficielle
   aux très courtes longueurs d'onde, et le fait qu'une vraie image de cuve est
   **bruitée**. La scène est plus propre que la réalité. Elle ne doit donc jamais
   servir d'argument contre une image de TP moins nette : la légende de la figure
   statique, juste en dessous, garde ce rôle.

---

## 11. La porte (`web/scripts/scene-cuve.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code
du produit ; elle trouve son panneau par `[data-scene="cuve-a-ondes"]`,
**jamais** par `[data-scene]` seul (précédent : la porte de l'orbite ouvrant le
chapitre du champ magnétique, run 747). Elle se lance **plusieurs fois, à
plusieurs largeurs** (1 280 px et 390 px au minimum) avant d'être crue. Quatre
verdicts honnêtes (ADR 0034/0038) : **ROUGE**, **AVERTISSEMENT-vu**,
**VERT-ambigu**, **MUET**. Si le canvas 2D n'est pas disponible au banc, elle
sort **MUET, en échec**, jamais en vert.

### 11.1 Les nombres et les invariants qu'une SECONDE voie doit établir

**Une règle neuve, à écrire ici parce qu'elle n'existait pas.** Les portes des
six scènes précédentes recalculent les nombres affichés par une seconde
implémentation. **Une simulation ne se recalcule pas ainsi** : un second
solveur, avec les mêmes approximations, ne prouverait rien de plus — et avec
d'autres approximations, il donnerait d'autres chiffres. Ce qu'une seconde voie
peut établir ici, ce sont les **invariants physiques que le champ doit
satisfaire quelle que soit sa numérique**. La porte les mesure **sur le rendu**,
avec ses propres constantes ($c = 0{,}20\ \text{m/s}$, la grille, les quatre
fréquences), sans importer **aucun** module du produit.

| # | invariant | mesure | attendu |
|---|---|---|---|
| I1 | **analytique** : $\lambda = c/f$ | recalculé dans la porte | $4{,}00$ · $2{,}00$ · $1{,}00$ · $0{,}50$ cm |
| I2 | **analytique** : $a/\lambda$ affiché | recalculé pour les 5 états d'étape | $8$ · $0{,}25$ · $0{,}25$ · $8$ · $1$ |
| I3 | **grille exacte** | $a/\Delta x$ et $\lambda/\Delta x$ à **toutes** les positions du curseur | **entiers**, sans exception |
| I4 | **$\lambda$ conservée** | $\lambda$ mesurée devant vs derrière la paroi (`data-*` bruts) | écart $< 2\ \%$ |
| I5 | **$\lambda$ juste** | $\lambda$ mesurée vs $c/f$ | écart $< 3\ \%$ **et $\neq 0$** (voir `mesure-pas-echo`) |
| I6 | **$f$ conservée** | comptage de crêtes à la sonde, devant et derrière | écart $< 1\ \%$ |
| I7 | **$c$ juste** | temps d'arrivée de la première crête à deux sondes distantes de $d$ | $d/c$ à une cellule près |
| I8 | **monotonie en $a$** (S1) | $A_{60}$, l'amplitude à $60°$ rapportée à celle à $0°$, à $\lambda = 0{,}50\ \text{cm}$, pour $a = 4{,}0 \to 0{,}50\ \text{cm}$ | **strictement croissante** |
| I9 | **monotonie en $\lambda$** (S2) | $A_{60}$ à $a = 0{,}50\ \text{cm}$, pour $\lambda = 0{,}50 \to 4{,}0\ \text{cm}$ | **strictement croissante** |
| I10 | **symétrie** | $A(+\theta)$ vs $A(-\theta)$ sur tout l'arc | écart $< 2\ \%$ |
| I11 | **bords absorbants** | `data-reflexion-max` (max $|u|$ dans la bande de bord, rapporté à l'incident, en fin de course) | $< 0{,}10$ **et $> 0$** |
| I12 | **stabilité** | max $|u|$ sur toute la course | borné ; aucune divergence |

I8 et I9 **sont les deux phrases du chapitre**, mesurées. Elles sont robustes au
champ proche (§10.4), ce que ne serait pas une monotonie globale en $a/\lambda$ :
la porte ne mesure donc **pas** celle-là, et ce refus est écrit ici à côté de ce
qu'elle mesure (ADR 0035 : la décision de NE PAS armer s'écrit à côté du motif
voisin).

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `va-tout-droit` | $a = 4{,}0$, $\lambda = 0{,}50\ \text{cm}$ : en fin de course, moins de $5\ \%$ des pixels « agités » (variance non nulle) se trouvent **hors du couloir géométrique** de l'ouverture | $a = 0{,}50$, $\lambda = 4{,}0\ \text{cm}$ : **plus de $40\ \%$** y sont |
| `zone-d-ombre` | cas étroit : le point situé **derrière la paroi**, à $5\ \text{cm}$ hors de l'axe, est agité | cas large : le même point est **au repos** |
| `lambda-conservee` | l'écart entre crêtes mesuré **en pixels** sur les rides incidentes et sur les arcs sortants coïncide à $3\ \%$ près | un rendu qui redimensionne l'onde sortante de $0{,}8$ doit rougir |
| `deux-segments` | le crochet de $a$ et la règle de $\lambda$ ont des longueurs **en pixels** dans le rapport $a/\lambda$, à $2\ \%$ près | deux échelles différentes doivent rougir |
| `avant-pari` | avant l'engagement, à chaque étape : **le champ est plat** (variance des pixels de la zone d'eau sous un seuil), **zéro** pixel d'accent (mesuré en **chrominance**, pas en luminance), aucune lecture dans le DOM, aucun bouton de course, aucun profil, aucune enveloppe | après l'engagement : le champ s'anime et l'accent apparaît |
| `profil-construit` | S4 : au début du balayage, le profil compte **un** point ; à la fin, il en compte autant que d'angles visités | un profil **complet dès l'établissement** doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |
| `grille-exacte` | `data-cellules-a` et `data-cellules-lambda` entiers à **toutes** les positions | un pas de $0{,}3\ \text{cm}$ doit rougir |
| `mesure-pas-echo` | `data-lambda-mesuree-brute` diffère de $c/f$ d'une quantité **non nulle** et $< 3\ \%$ | une valeur **égale au bit près** à $c/f$ doit rougir : la lecture serait un écho du réglage, pas une mesure (ADR 0039 : deux valeurs qui devraient différer et sont égales à l'octet près sont un défaut de mesure) |
| `une-seule-ouverture` | quel que soit le réglage, la paroi présente **exactement un** intervalle agité | deux ouvertures doivent rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucun solveur, aucune boucle
d'animation) · `etapes` (chaque étape pose son état, n'ouvre que ses contrôles,
les autres **absents du DOM**) · `paris` (2–4 choix, exactement un juste, un
`retour` par choix, rien dans la région live avant l'engagement) ·
`fuite-inter-etapes` (§7.6 : la porte **écrit elle-même** la table « quel
réglage atteint quel état », contre le descripteur — c'est un jugement sur ce
que chaque pari demande, pas une copie de la liste des contrôles) ·
`frontiere` (aucune des chaînes interdites du §9 dans le panneau ouvert ;
l'ensemble des valeurs en degrés affichées ⊆ {valeur du contrôle `recepteur`}) ·
`katex` (aucun LaTeX brut visible) · `etiquettes` (aucune étiquette n'en
chevauche une autre, n'est barrée par un trait, ni ne sort du cadre — à 1 280 et
à 390 px ; pièce commune `disposer`) · `clavier` et `ergonomie` (pièce commune
`scripts/lib/scene-ergonomie.mjs` : ouvrir, parier, avancer, revenir AU CLAVIER
sans perdre le focus ; toute cible ≥ 44 px ; chaque contrôle porte son
`scroll-margin-top`, **vérifié en donnant le focus**) · `console` (aucune
erreur) · `performance` (`data-facteur-temps` = $1{,}00$ au banc ; s'il ne l'est
pas, **AVERTISSEMENT-vu**, jamais un vert muet).

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec
cette commande** (ADR 0034). Sabotages à outiller, un par famille :

1. dessiner des arcs sortants quel que soit $a/\lambda$ → `va-tout-droit`,
   `zone-d-ombre` ;
2. multiplier la longueur d'onde sortante par $0{,}8$ → `lambda-conservee`,
   `nombres` (I4, I5) ;
3. faire dépendre l'étalement de $a$ **seul** (piloter l'ouverture comme une
   source ponctuelle dès que $a < 1\ \text{cm}$, quelle que soit $\lambda$) →
   `nombres` (I9) **seule** : c'est la misconception même, posée dans le code ;
4. afficher une lecture, ou animer l'eau, avant le pari → `avant-pari` ;
5. dessiner le crochet de $a$ et la règle de $\lambda$ à deux échelles →
   `deux-segments` ;
6. importer `three` dans le module de la scène → `pas-de-3d` ;
7. passer le pas de `fente` à $0{,}3\ \text{cm}$ → `grille-exacte` ;
8. recopier $c/f$ dans `lambda-mesuree` au lieu de mesurer → `mesure-pas-echo` ;
9. ajouter une ligne « $\theta = \lambda/a$ » ou une largeur angulaire en degrés
   au panneau → `frontiere` ;
10. retirer les bandes absorbantes → `nombres` (I11) et, par contagion visible,
    `lambda-conservee` ;
11. ouvrir `frequence` à l'étape 4 → `fuite-inter-etapes` ;
12. décentrer l'arc d'un centimètre → `nombres` (I10, symétrie) ;
13. tracer le profil complet dès la fin de l'établissement →
    `profil-construit` ;
14. percer une seconde ouverture → `une-seule-ouverture` et `frontiere`.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir
que **la** porte qui le garde : si le sabotage 3 fait aussi rougir
`va-tout-droit`, c'est que les deux familles mesurent la même chose et qu'il
faut en resserrer une.

---

## 12. Entrée de registre et champs du descripteur

**Registre** (`web/src/lib/scene3d/scenes.json` — voir la question 1 sur le nom
du fichier) :

```json
"cuve-a-ondes": {
  "temps": false,
  "course": true,
  "dimension": "2d",
  "controles": ["fente", "frequence", "sonde", "recepteur"],
  "etat": ["a_cm", "f_hz", "chemin", "sonde_cm", "recepteur_deg", "reference"],
  "bornes": {
    "a_cm": [0.5, 4.0],
    "sonde_cm": [-6.0, 14.0],
    "recepteur_deg": [-60, 60]
  },
  "valeurs": {
    "f_hz": ["40", "20", "10", "5"],
    "chemin": ["aucun", "axe", "arc"],
    "reference": ["aucune", "40Hz"]
  },
  "lectures": ["largeur", "longueur-onde", "comparaison", "lambda-mesuree",
               "periode-sonde", "amplitude", "angle", "celerite"]
}
```

*`f_hz` est une énumération de **chaînes**, exactement comme `force` dans le
manège : quatre crans, aucune valeur intermédiaire, aucune machinerie nouvelle
dans `validate-content`.*

Vérifications que `validate-content` fera, et qui passent par construction :
chaque étape a `id`/`titre`/`consigne` et **au moins un contrôle** ; chaque
contrôle déclaré est ouvert par une étape (`fente` → S1, S4, S5 · `frequence` →
S2, S5 · `sonde` → S3, S5 · `recepteur` → S4, S5) ; la première étape pose un
état ; chaque pari a 2–4 choix, **exactement un** `juste`, et **un `retour` par
choix** ; chaque `misconception` citée est **déclarée dans `items.yaml`** (§8.2,
note de séquencement) ; `revele_apres_course` ∈ ]0,1] et la scène est bien une
scène à course ; `temps: false` donc **aucun** `revele_apres_h` ; tous les états
sont dans les bornes et les valeurs.

**Table des états, à recopier telle quelle dans le descripteur :**

| étape | a_cm | f_hz | λ | a/λ | chemin | sonde_cm | recepteur_deg | reference | révélation |
|---|---|---|---|---|---|---|---|---|---|
| `ouverture-large` | 4.0 | "40" | 0,50 cm | **8** | `aucun` | — | — | `aucune` | course 1 |
| `meme-fente-autre-onde` | 1.0 | "5" | 4,0 cm | **0,25** | `aucun` | — | — | **`40Hz`** | course 1 (2 phases) |
| `ce-qui-ne-change-pas` | 0.5 | "10" | 2,0 cm | **0,25** | `axe` | −4.0 | — | `aucune` | course 1 |
| `sur-l-arc` | 4.0 | "40" | 0,50 cm | **8** | `arc` | — | 0 | `aucune` | course 1 (2 phases) |
| `libre` | 2.0 | "10" | 2,0 cm | **1** | `arc` | 6.0 | 0 | `aucune` | immédiate |

**Champs de fin du descripteur** (mêmes rubriques que les scènes existantes) :

- `boundary` = le §9 résumé ;
- `boundary_guard_details` = les chaînes interdites et la règle « degrés affichés
  ⊆ {valeur de `recepteur`} » ;
- **`fit_caveat` = le §10 en entier** (ses points 1 et 2 aussi en légende) ;
- `param_manipulation_guide` = la grille $a \times \lambda$ du §5.2 et la raison
  du pas ;
- `fallback_note` = **sans JavaScript et à l'impression, le panneau disparaît ;
  les deux figures statiques couvrent le cas « $a$ varie à $\lambda$ fixée »,
  et AUCUNE ne couvre « $\lambda$ varie à $a$ fixée » — c'est précisément ce que
  le manipulable apporte, et c'est pourquoi la retouche de prose du §4.2 est
  exigée, pas optionnelle** ;
- `pedagogy_wiring` avec `why_manipulable` (le §2.1), `predict_then_reveal` et la
  liste des misconceptions visées ;
- `spec_ref` = ce fichier ;
- `adr_ref` = `docs/decisions/0041-scenes-3d-de-premiere-partie.md` (dont la
  première entrée de « Retractions and Corrections » commande cette scène).

**Taxonomie de sourçage (ADR 0017, amendé par ADR 0041) :**
`type: manipulable` · **`tool: scene2d`** — première partie, Canvas 2D, aucune
dépendance tierce, chaque mot affiché écrit par nous. `scene2d` est une **valeur
nouvelle** : voir la question 1. Les valeurs `geogebra/desmos/phet` sont fermées
aux nouveaux embeds depuis l'amendement du 2026-07-07 ; `scene3d` serait un
mensonge dans un fichier dont l'ADR dit justement que la cuve **n'est pas** une
scène 3D.

---

## 13. Ce que cette spec ne tranche pas — questions au propriétaire

1. **`tool: "scene2d"` et le nom du dossier.** La taxonomie d'ADR 0017 doit-elle
   accueillir `scene2d` ? Et faut-il renommer `web/src/lib/scene3d/` (+
   `scenes.json`) en `scene/`, puisqu'il hébergerait une scène qui n'est pas en
   3D ? **Recommandation :** accepter `scene2d` ; renommer le dossier dans un
   commit mécanique **séparé**, jamais dans celui de la scène (une porte verte
   sur un renommage est le seul moyen de savoir lequel des deux a cassé).
2. **Le quatrième modèle de misconception** (§8.2) : ouvrir `OND-DIF-4` avec ses
   trois items, ou amender la `description` d'`OND-DIF-1` ? **Recommandation :
   ouvrir.** C'est le seul modèle du chapitre qui coche la bonne réponse partout
   dans le corpus actuel ; le fusionner, c'est garder le compteur aveugle.
   Décision humaine : elle touche l'inventaire et un `coverage_summary` généré.
3. **Le point d'arrêt `cp-r5-diffraction`** (§3) : il est rendu **au-dessus** du
   marqueur et ses `feedback` révèlent la condition avant que la scène ait parlé ;
   son propre champ dit pourtant `lesson_placement: after_R5`. Le laisser là
   (les paris de la scène ont été écrits pour ne pas le doubler) ou le remettre
   après R5 ? **Recommandation : le laisser**, et trancher la contradiction de
   champ séparément — mais la question est pédagogique, pas technique.
4. **La cuve idéalisée non dispersive** (§10.1) : la légende doit-elle nommer la
   tension avec le chapitre 7 (« les ondes à la surface de l'eau sont
   dispersives ») en une phrase, ou rester silencieuse ? **Recommandation :
   nommer.** Un élève attentif verra la contradiction ; mieux vaut qu'il la
   trouve écrite que trouvée par lui contre le produit.
5. **Couper une étape ?** S1 est la seule dont le pari est en partie doublé par
   le point d'arrêt qui la précède (§3) : c'est **l'étape coupable en premier**
   si le propriétaire veut une scène à quatre étapes. Je la garde par défaut,
   parce qu'elle installe la fausse règle que S2 casse (§2.3) — mais la décision
   est pédagogique. Si elle tombe, l'étape « obstacle » du §2.6 redevient
   candidate.
6. **La normalisation de l'amplitude** (§10.5) : $100\ \%$ = la lecture à $0°$
   **pour ce réglage-là**, ce qui rend les domaines comparables et les forces
   absolues incomparables. C'est le geste du TP ; à valider quand même.
7. **Les items expérimentaux.** OMPP-27 fait passer `application_experimentale`
   de $4\ \%$ à $7\ \%$ (cible : $15\ \%$) et solde « proposer un montage ».
   Faut-il commander à item-author, **dans la même passe**, deux items
   expérimentaux de plus (lecture d'un profil relevé sur l'arc ; choix d'un
   réglage de fente pour un $\lambda$ donné) ? **Recommandation : oui**, mais
   c'est une commande distincte de la scène.
8. **Une règle à graver, ou pas.** §11.1 pose que *la seconde voie d'une
   simulation établit des invariants, pas des nombres* — et que *la porte peut
   mesurer ce que le produit n'a pas le droit d'enseigner* (§9.1). Ce sont deux
   règles générales, nées ici. Méritent-elles un addendum à l'ADR 0041, ou
   restent-elles dans cette spec jusqu'à la deuxième scène 2D ?

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/ondes-mecaniques-periodiques` passe.
- `node web/scripts/scene-cuve.mjs --porte` : **toutes** les familles vertes, sur
  un rendu réel, relancé à quatre largeurs d'écran, **au moins deux fois**.
- `node web/scripts/scene-cuve.mjs --essai-rouge` : **chaque** famille crie, avec
  le vert qui l'a précédée, même dossier, même commande ; et chaque sabotage ne
  fait rougir que la famille qui le garde (§11.4).
- `node web/scripts/resume-couverture.mjs` régénéré si §8.3 est appliqué.
- `dette-manipulable` recompté : **6 → 5 substitutions écrites**, le cliquet
  redescendu à 5 (ADR 0041 : *un cliquet qu'on ne resserre pas quand une dette
  est payée laisse la place à la suivante, en silence*). La scène ne compte pour
  livrée **que** si elle est enregistrée dans `scenes.json`.
- L'en-tête de `cuve-a-ondes-diffraction.svg` ne dit plus « remplace l'ancien
  `[[embed:…]]` » (§4.5) : une dette payée dont le registre parle encore au
  présent est un faux rouge qui apprend à ignorer les vrais.
