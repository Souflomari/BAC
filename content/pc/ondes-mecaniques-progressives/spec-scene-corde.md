# Spec — manipulable 2D « la corde : la photo et le film » (`pc/ondes-mecaniques-progressives`)

**Objet :** une scène de première partie **en deux dimensions** (une corde, donc un
milieu à **une** dimension, dessiné dans le plan) — la corde calculée
**analytiquement** en direct dans le navigateur, avec ses **deux** représentations
graphiques : la **photo** ($y$ en fonction de $x$, à un instant figé) et le **film**
($y_M$ en fonction de $t$, à une abscisse figée). Chapitre 4 de la leçon rendue
= **R3 « Célérité, retard, et la relation $y_M(t) = y_S(t-\tau)$ »**, 2ème Bac PC/SM.
**Statut :** spec pédagogique, **à valider par le propriétaire** (§13 : chaque
question porte sa réponse par défaut, chacune reste réversible).
**Date :** 2026-09-24. **Auteur :** pedagogy-architect.
**Correction (2026-09-24, construction) :** l'exercice filmé de la banque est `bk-2015-r-x2` (session de rattrapage 2015), pas `bk-2018-n-x2` (des ultrasons dans un liquide) — relevé par la critique de fidélité au bac, corrigé ici et dans la `suite` de S3. Son ébranlement est une crête PUIS un creux : « le même geste » est retiré.

**Ce qu'elle paie : rien.** Il faut le dire d'entrée, parce que c'est l'inverse de
la cuve à ondes. `docs/audits/dette-manipulable-2026-09-20.md` **ne nomme pas cette
notion** : aucune spec n'a jamais prescrit ici un manipulable qu'une figure figée
aurait remplacé. Cette scène ne solde donc aucune dette écrite — elle doit se
justifier **entièrement** par le critère du §1 de l'ADR 0041 transposé au plan, et
par des trous **mesurés** (`REVIEW-2026-09-19`, §2 ci-dessous). Une scène qui
n'acquitte rien doit être plus dure avec elle-même, pas moins.

**Pourquoi ce n'est PAS une scène 3D.** ADR 0041 §1 : la 3D n'entre que si l'idée
est **spatiale** (un plan, un sens, un référentiel). Ici l'idée est **plane, et même
linéaire** : une corde est un milieu à une dimension, et tout le chapitre se joue sur
deux **axes de graphique** ($x$ ou $t$), pas sur un point de vue. Le précédent est
écrit : la cuve à ondes (ADR 0041, addendum de la nuit du 2026-09-24) — *« une scène
plane reprend TOUT l'appareillage, sauf la 3D »*. On reprend donc l'opt-in au clic,
les étapes, le pari avant tout, le contrôle neuf par étape, l'état posé, la porte qui
lit les pixels ; on ne reprend ni caméra, ni three.js.

**Fichiers que cette spec commande** (aucun n'est écrit par elle) :

| Fichier | Rôle |
|---|---|
| `content/pc/ondes-mecaniques-progressives/media/corde-photo-film.json` | le descripteur (pédagogie : étapes, paris, états) |
| `web/src/lib/scene3d/scenes.json` | l'entrée de registre `corde-photo-film` (§12 ; question 1) |
| `web/src/lib/scene2d/corde.ts` (+ `corde-modele.ts`, la corde analytique) | le calcul et le rendu Canvas 2D |
| `web/scripts/scene-corde.mjs` | la porte (§11) |
| `content/pc/ondes-mecaniques-progressives/lesson.md` | 4 retouches de prose (§4) |
| `content/pc/ondes-mecaniques-progressives/items.yaml` | 1 misconception + 3 items (§8), **sous réserve d'accord** |

Marqueur : `[[embed:corde-photo-film]]` · clé de registre : `corde-photo-film` ·
sélecteur de porte : `[data-scene="corde-photo-film"]`.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`ondes`** →
  **`ondes_mecaniques_progressives`**
  (`docs/cadre/curriculum/pc-physique-chimie.yaml`, l. 48–57).
- **Poids :** `poids.part_examen: 11 %`, **rang 3 de la physique**. Habiletés du
  sous-domaine : **utilisation 5,5 %**, **application expérimentale 1,65 %**,
  **résolution de problème 3,85 %** (le 50 / 15 / 35 de l'examen appliqué aux 11 %).
- **Programme (cadre p. 20) :** « Définition d'une onde mécanique, célérité ; ondes
  longitudinales/transversales et caractéristiques ; **onde progressive à une
  dimension — notion de retard temporel**. »
- **Savoir-faire que la scène sert** (cadre p. 5) :
  - « Connaître la **relation d'élongation source/point du milieu** :
    $y_M(t) = y_S(t-\tau)$. » — **S1**, et toute la scène.
  - « **Exploiter la relation** entre retard temporel, distance et célérité. » —
    **S1** (`suite`), **S5**.
  - « **Exploiter des documents/données** pour déterminer une distance, un retard
    temporel, une célérité. » — **S2** (lire une photo), **S3** (deux photos).
  - « **Proposer un montage de mesure** du retard temporel ou de la célérité. » —
    **S3**. *C'est le savoir-faire que la `REVIEW-2026-09-19` mesure à **0 %** :
    « recherche exhaustive sur `montage|proposer|protocole|dispositif` : une seule
    occurrence, et c'est du texte de sujet transcrit où le montage est donné ».*
  - « Définir une onde mécanique et sa célérité » — **S4** (la célérité comme
    propriété du **milieu**).
- **Travaux pratiques du cadre (p. 26), directement visés :** « **Célérité d'une
  onde mécanique (corde, surface de l'eau, onde sonore) ; montrer l'indépendance
  vis-à-vis de la forme de l'onde.** » Cette seule ligne autorise — et exige — **S3**
  (la mesure) **et S4** (l'indépendance), qui sont ses deux moitiés.
- **`limites` portées en dur — ATTENTION, le bloc est ABSENT.** Le chapitre
  `ondes_mecaniques_progressives` **ne porte aucun bloc `limites:`** dans le fichier
  de cadre. C'est exactement ce que la `REVIEW-2026-09-19` de la notion voisine
  signalait pour `ondes_periodiques`. **Je ne l'invente pas.** Les limites tenues ici
  sont celles que la leçon **exécute déjà** et que `checkpoints.yaml` **garde
  activement** :
  - **la perturbation n'est pas périodique.** Pas de période $T$, pas de fréquence,
    pas de longueur d'onde, pas de $\lambda = v\,T$ : c'est le chapitre suivant
    (`ondes_periodiques`), et `cp-r3-periodicite` est un `boundary_guard` explicite.
    **La source de la scène ne fait donc JAMAIS qu'un seul geste par course** (§9.1).
  - la relation enseignée est $y_M(t) = y_S(t-\tau)$ **avec $\tau = d/v$** — jamais
    une fonction à deux variables $y(x,t)$ écrite comme telle (§9.2, et **question 1
    du §13** : c'est une décision de frontière, pas un détail de rédaction).
- **`exclusions` du sous-domaine portées en dur** (cadre l. 91–96) :
  **interférences lumineuses** · **effet Doppler** · **réseaux de diffraction** ·
  **équation de propagation / résolution de la PDE** · **polarisation**.

**Un point de cadre à dire clairement, parce qu'il est piégeux — et il se résout
mieux ici que dans la cuve.** L'exclusion « résolution de l'équation d'onde » porte
sur ce qu'on **enseigne**, pas sur ce qu'une machine calcule pour dessiner. Mais la
cuve devait résoudre une PDE en différences finies ; **cette scène n'a rien à
résoudre** : la corde idéale (sans amortissement, sans dispersion, sans réflexion) a
une solution **fermée**, $y(x,t) = y_S(t - x/v)$ pour $t \ge x/v$ et $0$ sinon. Le
produit **calcule une translation**, il ne résout aucune équation ; aucun schéma
numérique, aucun laplacien, aucun symbole $\partial$ n'existe dans le code de la
scène. C'est la forme la plus propre de respect de l'exclusion : il n'y a rien à
cacher. La porte le garde quand même (§11, famille `frontiere`).

---

## 2. Pourquoi un manipulable — et pourquoi aucune figure ne suffit

### 2.1 Le critère, honnêtement, contre les trois médias qui existent déjà

La notion porte **trois** médias, et ils sont bons :

| média | rung | ce qu'il montre |
|---|---|---|
| `bouchon-oscille-sur-place.svg` (3 étapes) | R0 | le bouchon monte, redescend, revient |
| `onde-qui-avance.motion.json` (4 temps) | R1 | **animé** : la perturbation avance, **M oscille sur place** |
| `onde-propagation-retard.stages.json` (2 étapes) | R3 | la corde à $t_1$, puis à $t_1+\tau$ ; $d = v\,\tau$ |
| `transverse-longitudinal.svg`, `front-onde-dimensions.svg` | R2, R4 | la comparaison des deux directions ; 1D/2D/3D |

Ces cinq images ont **une chose en commun, et c'est le trou** : elles dessinent
toutes la corde **dans l'espace**. Le corpus entier de cette notion — cinq médias,
21 items, cinq points d'arrêt, sept entrées de banque — **ne contient pas un seul
graphe d'élongation en fonction du TEMPS**. Vérifié : `grep` sur `y_M(t)`, `y(x`,
« aspect de la corde », « allure de la corde » dans tout
`content/pc/ondes-mecaniques-progressives/` ne renvoie **aucune** occurrence en
dehors de la formule $y_M(t) = y_S(t-\tau)$ écrite en ligne dans `lesson.md`.

Or la leçon **affirme** en toutes lettres, sans jamais le rendre :

> « Cette relation dit exactement ce que montrait le mécanisme : la courbe $y_M(t)$
> est la courbe $y_S(t)$, **identique dans sa forme**, seulement décalée dans le
> temps de $\tau$. »

**Une courbe affirmée n'est pas une courbe vue.** Et la deuxième chose que le corpus
ne contient pas est pire : nulle part on ne dit à l'élève que **la photo de la corde
et le film d'un point sont deux graphiques différents**, dont l'un est le **miroir**
temporel de l'autre. C'est pourtant la question de bac la plus répétée du chapitre
(« *représenter l'aspect de la corde à l'instant $t_1$* ») et la source d'une faute
de copie massive : l'élève **recopie** $y_S(t)$ le long de la corde.

**C'est le critère de l'ADR 0041 §1, transposé au plan :** *la manipulation entre
quand elle révèle ce qu'une figure fixe énonce sans le montrer.* Ici la grandeur à
révéler n'est ni un plan ni un sens — c'est **le lien entre deux représentations**,
et ce lien ne devient visible que si l'on peut **bouger séparément** ce que chacune
fixe : l'abscisse du point ($d$, donc $\tau$) pour le film, l'instant du cliché
($t_1$, donc la position du front) pour la photo. Deux figures fixes donnent deux
points d'une famille à deux paramètres ; elles ne donnent pas la famille.

### 2.2 Le motif central : le MIROIR — colonne vertébrale, et il est neuf

Le point que la scène existe pour installer, et que rien n'enseigne aujourd'hui :

> En parcourant la corde **de $S$ vers l'avant**, on **remonte le temps du geste** de
> la source. Le point le plus éloigné de $S$ est celui qui a été atteint en
> **dernier** ; il ne rejoue donc que le **début** du geste. La photo est le graphe
> du geste **retourné**.

Avec le geste de l'exemple travaillé de la leçon (montée linéaire $0 \to 3{,}0$ cm en
$0{,}10\ \text{s}$, **puis maintien**), le miroir est **visible à l'œil** : à
$t_1 = 0{,}25\ \text{s}$, la corde est à $3{,}0\ \text{cm}$ de $S$ jusqu'à
$0{,}60\ \text{m}$, **redescend** en pente jusqu'à zéro à $1{,}00\ \text{m}$ (le
front), et est plate au-delà. L'élève qui recopie le graphe du geste dessine
exactement l'inverse. **Un seul réglage — le geste — décide si le miroir est
visible ou invisible** : avec une bosse symétrique, il n'y a rien à voir. C'est cette
propriété qui structure toute la scène (§2.3) et qui rend une porte possible (§11.2).

### 2.3 L'antidote obligatoire : S1 installe, S2 casse

La tentation serait d'ouvrir par la photo, parce que c'est ce que le bac demande.
**Il faut ouvrir par le film**, et pour la même raison que la cuve ouvre par la
fente (`spec-scene-cuve.md` §2.3) : **la première étape doit installer, honnêtement,
la règle que la deuxième va borner.**

- **S1 (le film)** installe : *« $M$ rejoue le geste de $S$, à l'identique, plus tard
  de $\tau$ »*. C'est **vrai**, c'est la relation du cadre, et sa `suite` l'écrit avec
  sa clause de validité : *« sur le film — c'est-à-dire sur un graphe dont l'abscisse
  est le temps »*.
- **S2 (la photo)** casse la généralisation silencieuse : *« …donc la corde a la
  même allure »*. Non : sur un graphe dont l'abscisse est une **distance**, la même
  histoire se lit **à l'envers**.

**Condition technique non négociable de cet enchaînement :** le geste de S1 doit être
**symétrique** (la bosse : montée $0{,}10\ \text{s}$, descente $0{,}10\ \text{s}$),
sinon la corde dessinée pendant S1 **répond au pari de S2** avant qu'il soit posé.
Une bosse symétrique est son propre miroir : elle ne contient **aucune** information
sur le sens de lecture. C'est une contrainte de fuite inter-étapes (§7.6), pas une
préférence esthétique, et la porte la mesure dans les deux sens (§11.2,
`miroir-inerte`).

### 2.4 La mesure de la célérité sur deux photos — **OUI, et c'est le savoir-faire à 0 %**

`REVIEW-2026-09-19`, « Pour le propriétaire — non appliqué » :

> « Le `savoir_faire` « **proposer un montage de mesure** » est à **0 %**. […] C'est
> le seul des cinq non couvert, et il porte la part `application_experimentale`. »

et, deux lignes plus bas :

> « Les 21 items sont des **QCM textuels, sans un seul document** — alors que six des
> sept entrées de banque font lire un oscillogramme, une courbe, des photos ou un
> tableau. »

**S3 répare les deux à la fois**, et elle n'invente rien : elle rejoue le montage de
l'entrée de banque `bk-2015-r-x2` (*« une caméra numérique réglée sur la prise de 25
images par seconde […] les photos N°8 et N°12 »*), avec la manœuvre que l'élève doit
savoir **proposer**, pas seulement subir. Le pari ne porte pas sur le calcul (le
calcul est un item, `OMP-13` le fait déjà) mais sur **ce qu'il faut mesurer** — la
question qu'un banc pose vraiment, et la seule des trois modes du profil PC
(conceptuel / procédural / **expérimental**) que cette notion ne pratique nulle part.

### 2.5 L'indépendance vis-à-vis de la source — **gardée, parce que le cadre en fait un TP**

« Montrer l'**indépendance vis-à-vis de la forme de l'onde** » est la seconde moitié
de la ligne TP du cadre. Elle vaut une étape (S4) pour trois raisons :

1. `celerite-depend-source` est la **troisième** famille de la notion en volume
   (11 étiquettes de distracteur, 4 items) et la leçon la traite en **une phrase**
   (« *Ce qui ne change rien à $v$ : la source elle-même* ») ;
2. c'est la seule fois du corpus où l'indépendance est **montrée** au lieu d'être
   affirmée — deux courses, deux amplitudes, **un seul instant de départ** ;
3. le pari ne porte pas sur « est-ce indépendant ? » (l'élève qui a lu la leçon dirait
   oui sans réfléchir — mais la scène est **avant** la leçon, §3) : il porte sur
   **deux mécanismes alternatifs nommés**, « plus ample donc plus fort donc plus
   vite » et « $M$ monte deux fois plus haut dans le même temps donc tout va deux fois
   plus vite ». Le second est une co-attribution assumée avec
   `celerite-est-vitesse-point` (§8.1).

### 2.6 Deux idées volontairement écartées

- **Le ruban noué en $M$ (« voyage-t-il avec la bosse ? »), COUPÉ.** C'était le
  candidat le plus évident, et il échoue au critère. `onde-transporte-matiere` est le
  modèle **le plus servi** de toute la notion : le point d'arrêt d'accroche
  (`cp-r0-predict`), le point d'arrêt de rupture (`cp-r1-transport`), la figure de R0,
  **le média animé de R1 qui montre exactement cela** (`onde-qui-avance` : « *Le point
  M, lui, n'a pas bougé* »), et 6 items. Une cinquième redite ne **révèle** rien —
  elle **re-dit**. Ce qui restait neuf (le **nombre** : $M$ parcourt $3{,}0$ cm à
  $0{,}30\ \text{m/s}$ pendant que la perturbation parcourt $1{,}2\ \text{m}$ à
  $4{,}0\ \text{m/s}$) ne vaut pas une étape : **c'est une lecture et une `suite`**,
  et c'est ainsi qu'elle est livrée (S1, lectures `vitesse-M` et l'encart **à
  l'échelle vraie**). La porte, elle, garde le fait quand même : le marqueur de $M$ ne
  bouge **pas d'un pixel** en abscisse pendant toute une course (§11.2,
  `M-n-avance-pas`) — un fait gardé sans étape dépensée.
- **Un mode « ressort » (longitudinal), ÉCARTÉ.** Il confronterait
  `confusion-transversale-longitudinale` (13 étiquettes, 4 items, et la `REVIEW` la
  compte parmi les **quatre modèles jamais confrontés**). Mais il exige un second
  milieu, un second rendu, et il **coupe la colonne vertébrale** de la scène : la
  photo et le film sont une affaire de graphes, pas de directions. C'est une **autre**
  scène, pour R2, et elle reste à écrire. La dette est nommée ici pour ne pas
  disparaître (question 8, §13).
- Écartées pour raison de **cadre**, pas de place : une source **périodique**
  (chapitre suivant), une **réflexion** au bout de la corde (dans aucun
  `savoir_faire` ; la `REVIEW` §« SCOPE NOTES » signale déjà `bk-2011-r-x2` qui en
  construit une), un **milieu dispersif** (chapitre suivant), une **seconde source**
  (interférences — exclusion du sous-domaine).

---

## 3. Placement

**Chapitre 4 de la leçon rendue = `## R3 — Célérité, retard, et la relation
$y_M(t) = y_S(t - \tau)$`**, **tout en tête du chapitre** : après le titre
(`lesson.md:104`), après le paragraphe d'annonce du §4.1, et **AVANT**
`### La célérité : de quoi elle dépend, et de quoi elle ne dépend pas`
(`lesson.md:106`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:corde-photo-film]]
```

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la
prose qui explique* ; la scène de l'orbite, posée derrière les paragraphes qui
donnaient les réponses, ne cassait rien). R3 est un chapitre dont **chaque
sous-section répond à un pari** :

| étape | la prose (ou le point d'arrêt) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| S1 — le film de $M$ | « La relation $y_M(t) = y_S(t-\tau)$ — et pourquoi elle est vraie » | R3, §5 | ❌ non |
| S2 — la photo à $t_1$ | **nulle part dans le corpus** | — | ✅ jamais dite |
| S3 — deux photos, une célérité | `bk-2015-r-x2` (banque, hors leçon) ; « Mesurer une célérité avec deux microphones » | R4 | ❌ non |
| S4 — le même geste en plus grand | « Ce qui ne change **rien** à $v$ : la source elle-même » + `cp-r3-celerite-vs-point` (choix D) | R3, §1 | ❌ non |
| S5 — libre (le rapport $d/v$) | « Le retard $\tau$ » + l'exemple travaillé | R3, §4 et §6 | ❌ non |

**Le seul placement qui laisse les cinq paris ouverts est la tête du chapitre.**
N'importe quel autre en désamorce au moins deux.

Conséquences acceptées, écrites parce qu'elles sont réelles :

1. **Le chapitre s'ouvre sur un manipulable.** C'est nouveau dans le corpus. Le
   paragraphe d'annonce (§4.1) doit donc faire deux choses qu'aucune autre annonce de
   scène n'a eu à faire : **nommer l'élongation** ($y_S$, $y_M$ — le mot n'est défini
   que plus bas, `lesson.md:164`) et **donner $\tau = 0{,}30\ \text{s}$ comme un fait
   mesuré de l'appareil**, pas comme le résultat d'une formule que l'élève n'a pas
   encore. La formule $\tau = d/v$ arrive **après**, et la `suite` de S1 l'a déjà fait
   **découvrir** (l'élève déplace $M$ et voit le décalage suivre la distance).
2. **Les trois points d'arrêt de R3 sont après la scène** (`cp-r3-celerite-vs-point`,
   `cp-r3-retard`, `cp-r3-periodicite`). C'est le **bon** sens — l'inverse de la
   réserve écrite pour la cuve, dont le point d'arrêt précédait le marqueur et
   révélait la condition. Ici le point d'arrêt devient la **reprise** de ce que la
   scène a montré, ce qui est exactement son rôle.
3. **L'exemple travaillé de R3** ($v = 4\ \text{m/s}$, $d = 1{,}2\ \text{m}$,
   $\tau = 0{,}3\ \text{s}$, geste $0 \to 3\ \text{cm}$ en $0{,}1\ \text{s}$) porte
   **les nombres de la scène**, à l'unité près. L'élève qui refait l'exemple
   retrouve la corde qu'il a manipulée. C'est la règle d'honnêteté de l'ADR 0041 §5,
   et ici elle est gratuite : les nombres existaient déjà.
4. **R2 vient d'être lu** (transversale / longitudinale). La corde de la scène est
   transversale, et rien dans la scène ne le contredit ni ne le rejoue.

---

## 4. Les retouches de prose (texte prêt à insérer)

**Interdit dans ces retouches :** ne rien écrire, **avant** le marqueur, qui réponde
à un pari (§7.6). 4.1 est **avant** et strictement neutre ; 4.2 à 4.4 sont **après**.

### 4.1 Le paragraphe d'annonce, juste avant le marqueur

*À insérer après le titre `## R3 — Célérité, retard, et la relation
$y_M(t) = y_S(t - \tau)$` (`lesson.md:104`), suivi de la ligne du marqueur, le tout
avant `### La célérité : de quoi elle dépend…` (`lesson.md:106`).*

> Avant de lire quoi que ce soit de ce chapitre, va le chercher. Ci-dessous, une
> corde tendue de quatre mètres : à gauche, la main $S$ qui va lui donner une
> secousse ; plus loin, un point $M$ que tu peux déplacer. On appellera
> **élongation** la hauteur d'un point au-dessus de sa position de repos —
> $y_S(t)$ pour la main, $y_M(t)$ pour le point $M$. La corde n'est dessinée à
> l'avance nulle part : sa forme est calculée pendant que tu regardes, à partir du
> seul geste de la main. Deux appareils t'attendent : un **film**, qui trace
> l'élongation d'un point au fil du temps, et une **photo**, qui fige la corde
> entière à un instant choisi. Tu paries d'abord, la corde répond ensuite.
>
> Une donnée de l'appareil, mesurée une fois pour toutes et affichée en
> permanence : sur cette corde-là, une secousse met $0{,}30\ \text{s}$ pour aller
> de $S$ jusqu'à $M$, qui est à $1{,}2\ \text{m}$. Ce qui **fixe** cette durée est
> précisément l'objet de ce chapitre.

*(Neutre exprès : elle décrit l'appareil et donne $\tau$ comme une **mesure**. Elle
n'annonce ni le sens du décalage, ni la forme de la corde, ni ce qui fixe $v$.)*

### 4.2 La sous-section qui manque — **exigée par la scène**

*À insérer après le paragraphe « Cette relation dit exactement ce que montrait le
mécanisme […] il rejoue, en retard, ce que $S$ a déjà fait. » (`lesson.md:178`) et
**avant** `[[figure:onde-propagation-retard]]` (`lesson.md:180`).*

> ### La photo et le film : deux graphiques, deux questions
>
> Il y a deux façons de dessiner ce qui se passe sur la corde, et l'examen les
> demande toutes les deux. Avant de lire un graphe, pose-toi **une seule** question :
> qu'y a-t-il sur l'axe horizontal ?
>
> - **Le film d'un point.** En abscisse, le **temps** $t$. On choisit un point — $M$,
>   par exemple — et on note sa hauteur seconde après seconde. C'est la courbe
>   $y_M(t)$, et c'est elle que décrit la relation $y_M(t) = y_S(t-\tau)$ : la même
>   courbe que celle de la main, décalée vers la **droite** de $\tau$. Vers la droite,
>   c'est-à-dire **plus tard** : $M$ ne peut pas bouger avant d'avoir été atteint.
> - **La photo de la corde.** En abscisse, la **distance** $x$ depuis $S$. On fige le
>   temps à un instant $t_1$ et on dessine la corde entière. C'est ce qu'un sujet
>   appelle « l'aspect de la corde à l'instant $t_1$ ».
>
> Et voici ce qui piège tout le monde : **la photo n'est pas le geste recopié — c'est
> le geste retourné.** La raison tient en une phrase. Le point le plus éloigné de $S$
> qui bouge est celui qui vient **juste** d'être atteint : il ne rejoue donc que le
> tout **début** du geste. Le point juste à côté de $S$, lui, a été atteint depuis
> longtemps : il en rejoue la **fin**. En parcourant la corde de $S$ vers l'avant, on
> **remonte le temps** du geste.
>
> Reprends la main de l'exemple travaillé : elle monte de $0$ à $3\ \text{cm}$ en
> $0{,}1\ \text{s}$, puis elle **reste** en haut ; la célérité vaut $4\ \text{m/s}$.
> Photographions la corde à $t_1 = 0{,}25\ \text{s}$. Le front — le point le plus
> avancé — est à $v\,t_1 = 4 \times 0{,}25 = 1{,}00\ \text{m}$ de $S$, et il est
> exactement à zéro : il vient d'être atteint. Le geste de montée a duré
> $0{,}1\ \text{s}$, soit $4 \times 0{,}1 = 0{,}40\ \text{m}$ de corde : la pente
> occupe donc les $40\ \text{cm}$ situés entre $0{,}60$ et $1{,}00\ \text{m}$.
> Avant $0{,}60\ \text{m}$, tous les points ont fini de monter : la corde y est
> plate, à $3\ \text{cm}$. Au-delà de $1{,}00\ \text{m}$, la perturbation n'est pas
> encore arrivée : la corde y est plate, à zéro. **Un plateau haut du côté de la
> main, une pente qui descend vers l'avant, rien au-delà du front** — l'exact
> retourné du graphe du geste.
>
> Le contrôle qui ne coûte rien, et qui sauve la question à l'examen : sur une
> photo, **la largeur d'une déformation est une distance**, pas une durée. Pour
> passer de l'une à l'autre, on divise ou on multiplie par $v$ — jamais autre chose.

**Pourquoi c'est exigé et pas souhaitable.** C'est la seule prose du corpus qui
distingue les deux graphes. Sans elle, le chemin **imprimé** et le chemin **sans
JavaScript** perdent exactement ce que la scène existe pour apporter (§2.2), et le
`fallback_note` du descripteur ne pourrait pas être écrit honnêtement.

### 4.3 L'exemple travaillé gagne sa question de bac

*À insérer dans « Calcule un retard, puis décris le mouvement », après le paragraphe
qui décrit $y_M(t)$ (`lesson.md:192`) et avant `[[checkpoint:cp-r3-retard]]`
(`lesson.md:194`).*

> *Et la même situation, vue par l'autre axe.* Un sujet demande souvent la suite :
> « représenter l'aspect de la corde à l'instant $t_1 = 0{,}25\ \text{s}$ ». Deux
> gestes, dans cet ordre. **Un :** où est le front ? À $v\,t_1 = 1{,}00\ \text{m}$
> de $S$ — au-delà, la corde n'a pas encore bougé, et $M$, à $1{,}2\ \text{m}$, est
> encore parfaitement au repos (cohérent : son retard est $0{,}30\ \text{s}$, et il
> n'est que $0{,}25$). **Deux :** de quel côté la pente ? Du côté du **front**,
> puisque le front rejoue le début du geste. La corde est donc à $3\ \text{cm}$ de
> $S$ jusqu'à $0{,}60\ \text{m}$, redescend jusqu'à zéro à $1{,}00\ \text{m}$, et
> reste plate ensuite.

### 4.4 Le récapitulatif express

*Dans `### Récapitulatif express` de R5, **après** la puce « Retard $\tau = d/v$… »
(`lesson.md:247`), **ajouter une puce** :*

> - Deux graphes à ne jamais confondre : le **film** d'un point ($y$ en fonction du
>   **temps** : la courbe de $S$ décalée vers la droite de $\tau$) et la **photo** de
>   la corde ($y$ en fonction de la **distance** : le geste **retourné**, front à
>   $v\,t$, rien au-delà). Sur une photo, une largeur est une distance ; on passe à
>   une durée en divisant par $v$.

---

## 5. La corde, les contrôles, l'état, les lectures

### 5.1 La corde et ses constantes (toutes déclarées, toutes affichables)

| grandeur | valeur | d'où elle vient |
|---|---|---|
| longueur utile | $4{,}00\ \text{m}$ | tient la course de $1{,}00\ \text{s}$ à $4{,}0\ \text{m/s}$ |
| source $S$ | à $x = 0$, **immobile en abscisse** | une main, un vibreur à l'arrêt |
| **célérité $c$ de la corde** | **$4{,}0\ \text{m/s}$** (cran 1) · **$8{,}0\ \text{m/s}$** (cran 2) | **le cran 1 EST l'exemple travaillé de R3** |
| extrémité lointaine | **absorbante** (sable / support amortisseur) | aucune onde ne revient — dit en légende |
| exagération verticale | **$\times 20$** (déclarée, §6) | $3{,}0$ cm sur $4{,}00$ m est invisible |
| pas de temps du modèle | $\Delta t = 5{,}0\ \text{ms}$ de temps de corde | divise **exactement** tous les $\tau$ et tous les instants atteignables (§5.2) |

**La corde est ANALYTIQUE.** $y(x,t) = y_S(t - x/v)$ si $t \ge x/v$, et $0$ sinon.
Pas de solveur, pas de grille spatiale, pas de dispersion numérique, **pas d'erreur**.
C'est une différence de nature avec la cuve à ondes, et elle a deux conséquences
qu'il faut écrire : (a) les lectures sont **exactes**, pas approchées — on peut donc
afficher plus de chiffres sans mentir (§5.4) ; (b) la porte peut **recalculer les
nombres** par une seconde implémentation, ce que la porte de la cuve s'interdisait
(§11.1). *Règle générale née ici, complémentaire de celle de la cuve : **une seconde
voie ANALYTIQUE recalcule des nombres ; une SIMULATION n'établit que des
invariants.*** (question 9, §13 : mérite-t-elle un addendum à l'ADR 0041 ?)

**Les quatre gestes de la source** (aucun n'est périodique — §1, `limites`) :

| id | geste | durée | longueur sur la corde à $4{,}0\ \text{m/s}$ | symétrique ? |
|---|---|---|---|---|
| `bosse` | $0 \to 3{,}0$ cm en $0{,}10$ s, puis $3{,}0 \to 0$ cm en $0{,}10$ s | $0{,}20$ s | $0{,}80$ m | **oui** (son propre miroir) |
| `rampe` | $0 \to 3{,}0$ cm en $0{,}10$ s, **puis maintenu** | (permanent) | pente de $0{,}40$ m | **non** |
| `rampe-haute` | $0 \to 6{,}0$ cm en $0{,}10$ s, puis maintenu | (permanent) | pente de $0{,}40$ m | non |
| `rampe-lente` | $0 \to 3{,}0$ cm en $0{,}20$ s, puis maintenu | (permanent) | pente de $0{,}80$ m | non |

`rampe` **est** le geste de l'exemple travaillé de la leçon, au dixième de
centimètre près. `bosse` est une bosse simple, son propre miroir — pas l'ébranlement
de `bk-2015-r-x2`, qui est une crête PUIS un creux (voir la correction en tête).

### 5.2 Contrôles (5)

| id | ce qu'il règle | valeurs / bornes | pas | ouvert par |
|---|---|---|---|---|
| `point_m` | $d = SM$, l'abscisse du point filmé | $[0{,}4\ ;\ 3{,}2]$ m | **0,4 m** | S1, S5 |
| `instant` | $t_1$, l'instant où la photo est prise | $[0\ ;\ 1{,}00]$ s | **0,05 s** | S2, S5 |
| `camera` | l'écart entre les deux photos, **en nombre d'intervalles** | `1` · `2` · `4` · `5` | — | S3 |
| `geste` | le geste de la main $S$ | `bosse` · `rampe` · `rampe-haute` · `rampe-lente` | — | S4, S5 |
| `tension` | la tension de la corde, **donc sa célérité** | `4` · `8` (m/s) | — | **S5** |

**Le pas est un choix pédagogique (ADR 0041 §5), et ici il est arithmétique.** Avec
$d$ au pas de $0{,}4\ \text{m}$ et $v \in \{4{,}0\ ;\ 8{,}0\}$, **tous** les retards
atteignables tombent **exactement** au centième de seconde :

| $d$ (m) | 0,4 | 0,8 | 1,2 | 1,6 | 2,0 | 2,4 | 2,8 | 3,2 |
|---|---|---|---|---|---|---|---|---|
| $\tau$ à $4{,}0$ m/s | 0,10 | 0,20 | **0,30** | 0,40 | 0,50 | 0,60 | 0,70 | 0,80 |
| $\tau$ à $8{,}0$ m/s | 0,05 | 0,10 | 0,15 | **0,20** | 0,25 | 0,30 | 0,35 | 0,40 |

De même, la position du front $v\,t_1$ au pas de $0{,}05\ \text{s}$ tombe sur
$0{,}20\ \text{m}$ (ou $0{,}40$) près : jamais un « presque $1{,}00\ \text{m}$ »
appelé $1{,}00\ \text{m}$. Et $\Delta t = 5\ \text{ms}$ divise exactement chaque
$\tau$, chaque $t_1$ et chaque durée de geste. Un pas de $0{,}3\ \text{m}$ ou de
$0{,}04\ \text{s}$ casse la propriété — **et la porte le voit** (§11.2,
`grille-exacte`).

**La célérité n'est PAS réglable par le geste, et c'est tout l'argument.** Seul
`tension` la change, et il n'ouvre qu'à la **dernière** étape. C'est ce qui rend
l'argument de S4 étanche : en changeant `geste`, l'élève ne change **que** la forme
de la perturbation.

**La caméra tourne à $20$ images par seconde**, les photos numérotées à partir de
$\text{n}°0$ ($t = 0$). S3 fige la photo $\text{n}°4$ ($t = 0{,}20\ \text{s}$) et la
photo $\text{n}°(4+n)$, $n$ = la valeur de `camera` :

| `camera` | photos | $\Delta t$ | avance du front à $4{,}0$ m/s |
|---|---|---|---|
| 1 | n°4 et n°5 | $0{,}05$ s | $0{,}20$ m |
| 2 | n°4 et n°6 | $0{,}10$ s | $0{,}40$ m |
| **4** (défaut) | n°4 et n°8 | $0{,}20$ s | $0{,}80$ m |
| 5 | n°4 et n°9 | $0{,}25$ s | $1{,}00$ m |

*(L'entrée de banque `bk-2015-r-x2` filme à $25$ images/s et garde les photos n°8 et
n°12 : **le même écart de quatre intervalles**. La `suite` de S3 le dit — et dit
aussi le piège que le sujet officiel tend : entre n°4 et n°8 il y a **quatre
intervalles**, pas cinq photos.)*

### 5.3 État (7 clés)

`d_m`, `geste`, `v_ms`, `vue` (`film` | `photo` | `photos`), `instant_s`,
`camera_n`, `reference` (`aucune` | `rampe`).

Trois clés **sans contrôle**, posées par l'étape (le précédent existe : `chemin` et
`reference` dans la cuve, `occupants` dans le manège) :

- **`vue`** décide quel **appareil** existe : le film (S1, S4, S5), la photo unique
  (S2), les deux photos de la caméra (S3). Un appareil qui n'est pas celui de
  l'étape n'est **pas dans le DOM**. C'est l'outil principal de non-fuite (§7.6) :
  **on ne peut pas répondre au pari de la photo depuis une étape qui n'a pas de
  photo.**
- **`geste`** est posé par chaque étape **avant** d'être ouvert en S4 — c'est ce qui
  garantit que S1 tourne sur une bosse **symétrique** (§2.3).
- **`reference`** décide si la course joue d'abord une **phase de référence**. Seule
  S4 la pose (`rampe`) : sa course montre le même montage deux fois, avec deux
  amplitudes, et le film **garde les deux tracés**. C'est ce qui rend « l'instant de
  départ n'a pas bougé » **visible** au lieu d'être mémorisé.
  *Limite écrite :* la superposition n'a lieu que sur les **axes du film** (deux
  courbes sur un même graphe, la pratique normale). **La corde, elle, n'est jamais
  superposée** — deux cordes empilées seraient illisibles et suggéreraient une
  addition d'ondes, c'est-à-dire le mot que le sous-domaine exclut.

### 5.4 Lectures, définitions exactes, unités, précision

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `distance` | $d = SM$ | m | **1 déc.** | le pas vaut $0{,}4\ \text{m}$ : exact |
| `celerite` | $v$, fixée par la corde | m/s | **1 déc.** | $4{,}0$ · $8{,}0$ — exactes |
| `retard` | $\tau = d/v$ | s | **2 déc.** | **toutes** les valeurs atteignables sont exactes à $0{,}01\ \text{s}$ (§5.2) |
| `instant` | $t_1$, l'instant du cliché | s | **2 déc.** | pas de $0{,}05\ \text{s}$ |
| `front` | $x_{\text{front}} = v\,t$, l'abscisse du point le plus avancé qui bouge | m | **2 déc.** | exact ; **c'est une RÉPONSE**, jamais visible avant un pari (§7) |
| `elongation-M` | $y_M$ à l'instant courant | cm | **1 déc.** | multiples de $1{,}5\ \text{cm}$ sur la grille : exact |
| `duree-geste` | la durée du geste de $S$ | s | **2 déc.** | $0{,}10$ · $0{,}20$ |
| `vitesse-M` | vitesse **moyenne de $M$ pendant sa montée** = hauteur / durée de la montée | m/s | **2 déc.** | $0{,}30$ m/s. **Définition à afficher en toutes lettres** à côté du nombre : c'est une moyenne, pas une vitesse instantanée |
| `mesure-v` | $\dfrac{x_B - x_A}{\Delta t}$, calculée **sur les deux positions affichées** | m/s | **1 déc.** | $4{,}0$ — voir l'encadré |

> **La précision est ici l'inverse du problème de la cuve, et c'est une bonne
> nouvelle qu'il faut quand même surveiller.** La cuve devait *abaisser* sa précision
> (deux chiffres significatifs) parce que sa grille fabriquait, à trois chiffres, la
> misconception même qu'elle combattait. La corde étant **analytique**, ses lectures
> sont exactes : rien ne force à arrondir. Le danger est symétrique — une valeur
> **trop** précise ferait croire à une mesure là où il n'y a qu'un calcul. D'où deux
> règles : (a) les lectures gardent la précision des **données de la leçon**
> ($4{,}0\ \text{m/s}$, $0{,}30\ \text{s}$, $3{,}0\ \text{cm}$), jamais plus ; (b) la
> lecture `mesure-v`, qui **prétend** être une mesure, est calculée à partir des deux
> positions **affichées** et de $\Delta t$, et la porte vérifie la **chaîne**
> ($x_B$, $x_A$, $\Delta t$ affichés ⟹ la valeur affichée, par SA propre
> arithmétique). Elle **ne** vérifie **pas** que `mesure-v` diffère de `celerite` —
> ici l'égalité est la vérité, pas un écho (l'inverse de `mesure-pas-echo` dans la
> cuve). Ce qu'une vraie mesure sur un vrai film aurait en plus — l'incertitude de
> lecture — est dit dans le `fit_caveat` (§10.5), pas simulé.

---

## 6. La course

- **Ralenti $\times 5$, déclaré.** Le front traverse les $4{,}00\ \text{m}$ en
  $1{,}00\ \text{s}$ de temps de corde ; **la course standard vaut
  $1{,}00\ \text{s}$ de temps de corde, soit $5{,}0\ \text{s}$ à l'écran.** Pourquoi
  ralentir, alors que le manège tournait en temps réel : là-bas la **preuve était la
  durée** (quatre secondes pendant lesquelles il ne se passe rien) ; ici la preuve
  est une **forme** et un **décalage**, et les deux durent moins d'une demi-seconde
  ($0{,}10\ \text{s}$ de montée, $0{,}30\ \text{s}$ de retard). À vitesse réelle, sur
  un écran à 60 images par seconde, la montée de $M$ occupe **six images** : l'élève
  voit un clignement, pas une courbe qui se trace. À $\times 5$ elle occupe une demi-
  seconde, et le retard une seconde et demie — tous deux **lisibles**. Le facteur est
  écrit sur la scène (`data-facteur-temps = 5,00`) et **mesuré contre l'horloge**, pas
  contre le nombre de pas demandés (leçon n°6 de la porte de la cuve).
- **Les courses par étape :** S1 $1{,}00\ \text{s}$ · S2 jusqu'à $t_1$ puis **gel**
  (défaut $0{,}25\ \text{s}$) · S3 jusqu'à la seconde photo, puis les deux clichés
  côte à côte · S4 **deux phases** de $0{,}50\ \text{s}$ (référence `rampe`, puis
  `rampe-haute`), effacement de la corde entre les deux, `revele_apres_course: 1` =
  **après les deux** · S5 $1{,}00\ \text{s}$.
- **Fin de course : la scène se fige et l'écrit** — « image arrêtée à
  $1{,}00\ \text{s}$ ; la corde continuerait, le bout lointain absorbe ». Sans cette
  mention, un élève lit « ça s'est arrêté ».
- **Le bout lointain absorbe**, et la légende le dit une fois : « l'extrémité
  lointaine est amortie — aucune onde ne revient, comme sur une corde dont le bout
  plonge dans le sable ». C'est vrai de l'appareil réel **et** vrai du calcul : la
  même phrase couvre les deux. (Et c'est une frontière : la réflexion n'est dans
  aucun `savoir_faire` du chapitre — §9.5.)
- **Après le gel de S2, la photo ne s'anime pas.** Déplacer `instant` fait **sauter**
  la corde d'un cliché au suivant, sans interpolation : c'est un **album de photos**,
  pas un film au ralenti. Deux raisons : le mot « photo » doit rester vrai, et un
  balayage animé rapproche la scène du critère des éclairs pour rien.
- **Le critère des éclairs (WCAG 2.3.1) est structurellement satisfait, et mesuré
  quand même.** La source ne fait **qu'un seul geste** par course : aucun point de la
  corde ne change d'état plus de **deux** fois. Il n'y a donc pas de motif
  d'éclairs possible — contrairement à la cuve, dont l'onde à $40\ \text{Hz}$ au
  ralenti $\times 5$ inversait chaque point huit fois par seconde. La porte le mesure
  malgré tout (§11.3, famille `eclairs`) : *une chose n'est prouvée absente que si
  l'on a énuméré ses formes* (ADR 0036).
- **Mouvement réduit honoré :** si le système le demande, la scène **calcule sans
  animer** et montre l'image finale ; un bouton « Image finale » existe pour tous.
- **Aucune trace entre étapes**, sauf la référence explicite de S4 (§5.3).

**La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4).**

- **La corde, les axes, les graduations, le marqueur de $M$, la main $S$ et le tracé
  de $y_S$ sont à l'ENCRE** : ce sont l'**énoncé**. Corollaire écrit par l'ADR 0041
  pour le manège : *une donnée de l'énoncé ne se peint pas dans la couleur de la
  réponse*, sinon « aucun pixel d'accent avant le pari » devient intenable.
- **L'accent ne marque que ce qui répond au pari**, et seulement **après** la
  révélation : le tracé de $y_M$, le segment du décalage $\tau$ sur l'axe du temps,
  le front et sa cote, la pente de la photo, la règle de mesure entre les deux
  photos, l'instant de départ commun aux deux courbes de S4.
- **Une seule échelle horizontale** pour la corde et pour la photo ; une seule
  échelle verticale, **exagérée $\times 20$ et déclarée sur l'image** (« échelle
  verticale dilatée 20 fois : $3\ \text{cm}$ y paraissent $60\ \text{cm}$ »).
  L'**encart à l'échelle vraie** de S1 est la contrepartie honnête (§7.1).
- **Aucun mouvement hors course.** La corde ne « respire » pas, rien ne pulse, rien
  ne clignote. Entre deux courses, l'image est fixe.

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant que
l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce qui
dépend de l'ISSUE attend la révélation*).

### 7.1 S1 — `le-film-de-M` · « Le film de $M$ »

- **État :** `d_m: 1.2`, `geste: "bosse"`, `v_ms: "4"`, `vue: "film"`,
  `reference: "aucune"`.
- **Contrôle ouvert :** `point_m` (**neuf**). **Lectures :** `distance`, `celerite`,
  `retard`, `duree-geste`.
- **`revele_apres_course: 1`** (la course entière : il faut voir la ligne de $M$
  rester plate, puis se lever).
- **Consigne (voix) :** « Une corde tendue, quatre mètres, vue de côté. La main $S$,
  à gauche, va donner **une seule** secousse : elle monte de $0$ à $3{,}0\ \text{cm}$
  en un dixième de seconde, puis redescend en un dixième de seconde, et plus rien.
  Le point $M$ est à $1{,}2\ \text{m}$ de $S$ ; sur cette corde, une secousse met
  $0{,}30\ \text{s}$ pour aller de $S$ à $M$. En dessous, deux axes : le temps en
  abscisse, l'élongation en ordonnée. La courbe de la main, $y_S(t)$, y sera tracée
  en direct ; celle de $M$, $y_M(t)$, aussi. Pour l'instant la corde est immobile et
  les deux axes sont vides. »
- **Pari :** « Sur ces axes, la courbe de $M$ sera… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `avance` | la même courbe que celle de la main, décalée de $0{,}30\ \text{s}$ vers la **gauche** : il y a un retard, donc on l'**ajoute** au temps, $y_M(t) = y_S(t+\tau)$ | non | **`retard-relation-fausse`** | « Regarde le film que la corde vient de tracer, et regarde surtout le **début**. À $t = 0{,}10\ \text{s}$, la main est déjà au sommet — et la ligne de $M$ est encore **parfaitement plate**. $M$ n'a rien fait, parce que rien ne l'avait encore atteint : la secousse était à $0{,}40\ \text{m}$, il est à $1{,}2$. Une courbe décalée vers la gauche dirait que $M$ bouge **avant** $S$, c'est-à-dire avant la cause. Le retard **repousse** vers la droite : $y_M(t) = y_S(t-\tau)$. Le signe moins n'est pas une convention à retenir, c'est l'ordre des choses. » |
| `retard` | la même courbe, **à l'identique**, décalée de $0{,}30\ \text{s}$ vers la **droite** | **oui** | — | « Oui. Deux choses à retenir séparément, parce que l'examen les demande séparément. **La forme** : identique — même hauteur $3{,}0\ \text{cm}$, même montée d'un dixième de seconde, même descente. $M$ n'invente rien, il **rejoue**. **La position** : plus tard de $0{,}30\ \text{s}$, jamais plus tôt. C'est tout ce que dit $y_M(t) = y_S(t-\tau)$ : à l'instant $t$, $M$ affiche ce que $S$ affichait $\tau$ plus tôt. » |
| `oscille` | la même montée, puis une oscillation régulière : une fois atteint, $M$ monte et descend sans arrêt tant que dure l'expérience | non | **`periodicite-hors-cadre`** | « Compte les allers-retours sur le film : $M$ en fait **un**, exactement un, puis sa ligne redevient plate. C'est logique — la main n'a donné **qu'une** secousse. Un point ne fabrique rien tout seul : il rejoue ce qu'on lui envoie, et on ne lui a envoyé qu'un aller-retour. Les points qui oscillent sans fin existent, mais il faut une source qui vibre sans fin : c'est le chapitre suivant, celui des ondes **périodiques**. » |

- **`suite` :** « Fais glisser $M$ le long de la corde, de $0{,}4$ jusqu'à
  $3{,}2\ \text{m}$, et relance à chaque fois. Deux choses ne bougent pas : la
  **forme** de la courbe de $M$ (toujours la même bosse, jamais plus basse, jamais
  plus étalée) et la **façon** dont elle est décalée (toujours vers la droite). Une
  seule bouge : **de combien**. Note trois valeurs au passage — $0{,}4\ \text{m}$ :
  $0{,}10\ \text{s}$ ; $1{,}2\ \text{m}$ : $0{,}30\ \text{s}$ ; $2{,}4\ \text{m}$ :
  $0{,}60\ \text{s}$. Deux fois plus loin, deux fois plus tard. Tu viens de trouver
  tout seul ce que la suite du chapitre va écrire.
  Et un dernier chiffre, celui qu'on oublie toujours : pendant que la secousse a
  parcouru $1{,}2\ \text{m}$, **$M$, lui, a parcouru $3{,}0\ \text{cm}$ vers le haut,
  puis $3{,}0\ \text{cm}$ vers le bas** — sa vitesse moyenne de montée vaut
  $0{,}30\ \text{m/s}$, **treize fois moins** que les $4{,}0\ \text{m/s}$ de la
  perturbation. L'encart « à l'échelle vraie », sous la corde, montre la même
  histoire **sans** la dilatation verticale : on y voit presque une ligne droite. Ce
  sont deux vitesses différentes, et seule la seconde s'appelle la célérité. »
- **⟂-avant-pari :** le tracé de $y_M$ **et** celui de $y_S$ (les axes sont vides —
  la courbe de la main est **aussi** une réponse, puisque c'est elle que $M$ recopie) ;
  le segment du décalage ; la lecture `vitesse-M` ; l'encart à l'échelle vraie ; toute
  corde déformée ; le bouton de course ; le verdict ; tout pixel d'accent (mesuré en
  **chrominance**, pas en luminance) ; la description lue au lecteur d'écran ne doit
  contenir ni « plus tard », ni « décalée », ni « retard de la courbe ».
  **Reste visible (l'énoncé) :** la corde au repos, la main $S$, le marqueur de $M$
  coté $1{,}2\ \text{m}$, les deux axes **vides** et gradués, et les lectures
  `distance`, `celerite`, `retard`, `duree-geste` — *le retard est donné dans la
  consigne comme une mesure de l'appareil ; le pari ne porte pas sur sa valeur mais
  sur le **sens** du décalage.*

### 7.2 S2 — `la-photo-a-t1` · « La photo de la corde »

C'est **l'étape centrale** (§2.2) : la seule du corpus entier où l'on demande
l'aspect de la corde.

- **État :** `d_m: 1.2`, **`geste: "rampe"`**, `v_ms: "4"`, **`vue: "photo"`**,
  `instant_s: 0.25`, `reference: "aucune"`.
- **Contrôle ouvert :** `instant` (**neuf**). **Lectures :** `instant`, `celerite`,
  `duree-geste`, `front` *(après révélation uniquement)*.
- **`revele_apres_course: 1`** — la course part de la corde plate et **gèle** à
  $t_1 = 0{,}25\ \text{s}$.
- **Consigne :** « On change le geste de la main, et **seulement** le geste : la
  corde est la même, la célérité aussi, $4{,}0\ \text{m/s}$. Jusqu'ici la main
  montait puis redescendait ; maintenant elle monte de $0$ à $3{,}0\ \text{cm}$ en
  $0{,}10\ \text{s}$ et **elle reste en haut**. Son mouvement est tracé à côté, en
  petit : une montée droite, puis un palier. On ne filme plus un point : on
  **photographie la corde entière** à un instant choisi, $t_1 = 0{,}25\ \text{s}$. En
  abscisse, ce n'est plus le temps — c'est la **distance à $S$**, en mètres. »
- **Pari :** « Sur cette photo, la corde ressemblera à… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `recopie` | au graphe du geste, recopié le long de la corde : zéro juste après $S$, puis une pente qui **monte** jusqu'à $3{,}0\ \text{cm}$ à l'endroit le plus avancé, et plus rien au-delà | non | **`photo-film-confondus`** *(nouveau, §8.2 ; repli : `retard-relation-fausse`)* | « La photo dit exactement le contraire, et la raison est imparable. Le point le plus avancé — celui qui est à $1{,}00\ \text{m}$ — vient **juste** d'être atteint : il n'a eu le temps de rejouer que le tout **début** du geste, c'est-à-dire **zéro**. Et le point juste à côté de la main a été atteint il y a $0{,}25\ \text{s}$ : il a eu le temps de rejouer **toute** la montée, il est donc à $3{,}0\ \text{cm}$. En parcourant la corde de $S$ vers l'avant, tu **remontes** le temps du geste : la photo est le graphe du geste **retourné**. Le piège est qu'un graphe ressemble à un graphe — regarde toujours ce qu'il y a sur l'axe horizontal. » |
| `retournee` | à ce même graphe **retourné** : déjà $3{,}0\ \text{cm}$ juste après $S$, une pente qui **descend** jusqu'à zéro à l'endroit le plus avancé, et plus rien au-delà | **oui** | — | « Oui, et c'est la question de bac la plus répétée du chapitre. Refais le raisonnement à voix haute, parce que c'est lui qu'on te demandera : **où est le front ?** À $v\,t_1 = 4{,}0 \times 0{,}25 = 1{,}00\ \text{m}$ — au-delà, la corde n'a pas encore bougé. **De quel côté la pente ?** Du côté du front, parce que le front rejoue le **début** du geste. **Quelle largeur ?** La montée a duré $0{,}10\ \text{s}$, soit $4{,}0 \times 0{,}10 = 0{,}40\ \text{m}$ de corde : la pente va de $0{,}60$ à $1{,}00\ \text{m}$. Remarque au passage que $M$, à $1{,}2\ \text{m}$, est encore **au repos** sur cette photo — normal, son retard est $0{,}30\ \text{s}$ et il n'est que $0{,}25$. » |
| `tout-pres` | à une corde déformée seulement sur les tout premiers centimètres : en $0{,}25\ \text{s}$, la perturbation n'a eu le temps de parcourir que $0{,}25 / 4{,}0 = 0{,}06\ \text{m}$ | non | **`retard-relation-fausse`** | « Vérifie l'opération sur les **unités**, c'est le contrôle le moins cher de la physique : des secondes divisées par des mètres par seconde donnent des $\text{s}^2/\text{m}$ — pas une longueur. Pour savoir **jusqu'où** la perturbation est allée en $0{,}25\ \text{s}$, on **multiplie** : $4{,}0 \times 0{,}25 = 1{,}00\ \text{m}$. On divise pour passer d'une distance à une durée, on multiplie pour l'inverse ; la photo montre le front à $1{,}00\ \text{m}$, exactement. » |

- **`suite` :** « Fais glisser l'instant de la photo, de $0$ à $1{,}00\ \text{s}$,
  cran par cran. Deux observations à faire, dans cet ordre. **Un :** la forme ne se
  déforme **jamais** — le même palier, la même pente de $0{,}40\ \text{m}$ ; elle se
  contente d'avancer, de $0{,}20\ \text{m}$ tous les $0{,}05\ \text{s}$. **Deux :**
  cherche l'instant où le front touche exactement $M$. Tu trouveras
  $0{,}30\ \text{s}$ — et c'est le retard que le film t'a montré à l'étape
  précédente. La photo et le film racontent la même histoire ; ils ne la racontent
  simplement pas sur le même axe. »
- **⟂-avant-pari :** toute corde déformée (la corde est **plate**, variance nulle) ;
  la lecture `front` ; la cote du front ; la pente ; la limite du plateau ; le
  verdict. **Reste visible (l'énoncé) :** la corde au repos, la main, le marqueur de
  $M$, l'axe des distances gradué, **le petit graphe du geste $y_S(t)$ à l'encre**
  (c'est la donnée, pas la réponse — corollaire du manège), `instant`, `celerite`,
  `duree-geste`.

### 7.3 S3 — `deux-photos` · « Mesurer la célérité avec deux photos »

- **État :** `d_m: 1.2`, `geste: "bosse"`, `v_ms: "4"`, **`vue: "photos"`**,
  `camera_n: "4"`, `reference: "aucune"`.
- **Contrôle ouvert :** `camera` (**neuf**). **Lectures :** `instant` (les deux),
  `front`, `mesure-v`, `duree-geste`.
- **`revele_apres_course: 1`** — la course va jusqu'à la seconde photo, puis les deux
  clichés s'affichent l'un au-dessus de l'autre, **à la même échelle**, avec la règle.
- **Consigne :** « On revient au geste bref — une bosse, montée et descente en deux
  dixièmes de seconde — et on filme la corde avec une caméra réglée sur **$20$ images
  par seconde**. On gardera deux images : la photo $\text{n}°4$ et la photo
  $\text{n}°8$. Elles seront affichées l'une sous l'autre, avec la même règle
  graduée en dessous. Objectif : en tirer la célérité, sans qu'on te la donne. »
- **Pari :** « Pour obtenir la célérité à partir de ces deux photos, il faut
  mesurer… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `avance-du-sommet` | de combien le **sommet de la bosse a avancé le long de la corde** entre les deux photos, puis diviser cette distance par la durée qui sépare les deux photos | **oui** | — | « Oui — et remarque que tu peux suivre **n'importe quel** repère de la bosse, son sommet, son bord avant, son bord arrière : elle ne se déforme pas, donc tous donnent la même avance. Ici $1{,}60 - 0{,}80 = 0{,}80\ \text{m}$ en $0{,}20\ \text{s}$, soit $4{,}0\ \text{m/s}$. Attention au dénominateur, c'est là que les points se perdent : entre la photo $\text{n}°4$ et la photo $\text{n}°8$, il y a **quatre intervalles** — $4 \times 1/20 = 0{,}20\ \text{s}$ — et non cinq photos. C'est le nombre d'**intervalles** qui compte le temps, jamais le nombre d'images. » |
| `montee` | de combien le sommet de la bosse est **monté**, puis diviser par la durée entre les deux photos | non | **`celerite-est-vitesse-point`** | « Tu mesurerais la vitesse avec laquelle un **point de la corde** monte et descend — une vitesse réelle, mais ce n'est pas celle qu'on cherche. Sur les deux photos, la bosse a exactement la **même hauteur** : ce quotient vaudrait zéro. Ce qui s'est déplacé entre les deux clichés, c'est la **déformation**, le long de la corde. La célérité est la vitesse de cette déformation, jamais celle d'un point. » |
| `depuis-S` | la distance entre $S$ et la bosse **sur la seconde photo**, puis diviser par la durée entre les deux photos | non | **`retard-relation-fausse`** | « Tu mélanges deux histoires : une distance comptée depuis le **début** de l'expérience, et une durée comptée entre les **deux photos**. Le quotient $1{,}60 / 0{,}20 = 8{,}0\ \text{m/s}$ est faux d'un facteur deux — et il le serait d'un autre facteur avec un autre écart de photos, ce qui est le meilleur signe qu'une méthode ne tient pas. Une vitesse se calcule toujours avec la distance **parcourue pendant la durée qu'on divise** : mêmes bornes en haut et en bas. » |

- **`suite` :** « Refais la mesure avec les autres écarts de la caméra — $1$, $2$,
  $5$ intervalles. Les deux nombres changent tous les deux ($0{,}20\ \text{m}$ en
  $0{,}05\ \text{s}$, $1{,}00\ \text{m}$ en $0{,}25\ \text{s}$), et leur **quotient**
  ne change pas : $4{,}0\ \text{m/s}$ à chaque fois. C'est la signature d'une
  méthode juste. Tu viens de faire, à la main, l'exercice du bac 2015 (rattrapage) : une corde
  filmée à $25$ images par seconde, les photos $\text{n}°8$ et $\text{n}°12$ — le
  même écart de quatre intervalles. »
- **⟂-avant-pari :** les deux photos ; la règle de mesure ; `front` ; `mesure-v` ;
  toute corde déformée ; le verdict. **Reste visible :** la corde au repos, la main,
  la caméra et son réglage ($20$ images/s), les numéros des deux photos qui seront
  gardées, la règle graduée **vide**.

### 7.4 S4 — `le-meme-geste-en-plus-grand` · « Le même geste, deux fois plus haut »

- **État :** `d_m: 1.2`, **`geste: "rampe-haute"`**, `v_ms: "4"`, `vue: "film"`,
  **`reference: "rampe"`**.
- **Contrôle ouvert :** `geste` (**neuf**). **Lectures :** `retard`, `celerite`,
  `elongation-M`, `duree-geste`.
- **`revele_apres_course: 1`** — course en **deux phases** (§6) : d'abord la rampe de
  $3{,}0\ \text{cm}$ (la référence, le réglage déjà connu), puis celle de
  $6{,}0\ \text{cm}$. Le film **garde les deux tracés**.
- **Consigne :** « Même corde, même tension, même point $M$ à $1{,}2\ \text{m}$. On
  refait exactement le geste de tout à l'heure — monter puis rester en haut, en
  $0{,}10\ \text{s}$ — mais **deux fois plus haut** : $6{,}0\ \text{cm}$ au lieu de
  $3{,}0$. La course te montrera d'abord l'ancien geste, puis le nouveau, et le film
  gardera les deux courbes l'une sur l'autre. »
- **Pari :** « Avec ce geste deux fois plus ample, $M$ commencera à bouger… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `plus-tot` | plus tôt : une perturbation plus ample est plus « forte », elle pousse davantage la corde, donc elle avance plus vite | non | **`celerite-depend-source`** | « Les deux courbes du film partent **au même instant**, $0{,}30\ \text{s}$, au pixel près : la grande commence exactement là où la petite avait commencé. Ce qui fixe la vitesse de la perturbation, ce n'est pas ce que tu fais à la corde, c'est **la corde** — sa nature et son état. Une secousse plus ample transporte plus d'énergie et fait monter $M$ plus haut ; elle ne le prévient pas plus tôt. » |
| `meme-instant` | au même instant, $0{,}30\ \text{s}$ : seule la corde décide de la vitesse à laquelle la perturbation avance | **oui** | — | « Oui. Regarde ce qui a changé et ce qui n'a pas changé, c'est tout le chapitre en une image. **Ce qui change** avec le geste : la hauteur ($6{,}0$ au lieu de $3{,}0\ \text{cm}$). **Ce qui ne change pas** : l'instant de départ, la durée de la montée, la forme. Retiens la formule exacte : la célérité est une propriété du **milieu** — la corde, sa tension, sa masse — jamais de la source. Essaie les autres gestes avec le contrôle qui vient de s'ouvrir : tu peux rendre la secousse plus haute ou plus longue, $M$ démarrera toujours à $0{,}30\ \text{s}$. » |
| `deux-fois-plus-tot` | deux fois plus tôt, à $0{,}15\ \text{s}$ : $M$ doit monter deux fois plus haut dans le même dixième de seconde, il va donc deux fois plus vite — et l'onde avec lui | non | **`celerite-est-vitesse-point`** + **`celerite-depend-source`** *(double étiquetage, §8.1)* | « La première moitié de ton raisonnement est **juste** : $M$ monte bel et bien deux fois plus vite, $0{,}60\ \text{m/s}$ au lieu de $0{,}30$ — la lecture le dit. C'est la seconde moitié qui casse : cette vitesse-là est celle d'un **point qui monte et descend sur place**, et elle n'a aucun rapport avec la vitesse à laquelle la déformation **avance le long de la corde**. Deux vitesses, deux noms, deux valeurs : $0{,}60\ \text{m/s}$ pour le point, $4{,}0\ \text{m/s}$ pour la perturbation — et seule la seconde s'appelle la célérité. Les deux courbes démarrent au même instant. » |

- **`suite` :** « Parcours les quatre gestes sans toucher à rien d'autre : la bosse,
  la rampe, la rampe deux fois plus haute, la rampe deux fois plus **lente**. Le film
  change de forme à chaque fois — et l'instant de départ de $M$ ne bouge **jamais**
  de $0{,}30\ \text{s}$. Le dernier geste est le plus instructif : une montée deux
  fois plus lente donne une pente deux fois plus **longue** sur la corde
  ($0{,}80\ \text{m}$ au lieu de $0{,}40$), sans rien changer à la vitesse du front.
  La forme de la perturbation façonne **ce qui** voyage ; elle ne décide pas de la
  vitesse à laquelle ça voyage. »
- **⟂-avant-pari :** les deux tracés, **y compris celui de la référence** ; le
  marqueur d'instant de départ ; `elongation-M` ; tout mouvement ; le verdict.
  **Reste visible :** la corde au repos, la main, $M$ coté $1{,}2\ \text{m}$, la
  célérité de la corde, la **description écrite** des deux gestes (l'énoncé), les axes
  vides.

### 7.5 S5 — `libre` · « À toi : la distance, le geste, et la corde elle-même »

- **État :** `d_m: 1.6`, `geste: "bosse"`, `v_ms: "4"`, `vue: "film"`,
  `instant_s: 0.40`, `reference: "aucune"`.
- **Contrôles ouverts :** **`tension` (neuf)** + `point_m`, `instant`, `geste`
  (rouverts). **Lectures :** les neuf.
- **Pas de `revele_apres_course`** — le pari compare **deux réglages** que la même
  course ne peut pas montrer ensemble. Verdict immédiat, puis les contrôles s'ouvrent
  et l'élève va vérifier les deux. (Écart assumé avec les quatre autres étapes ; c'est
  l'étape où l'échafaudage tombe. Même choix que le manège et que la cuve.)
- **Consigne :** « Tout s'ouvre, y compris la corde elle-même : un second cran de
  tension existe, sur lequel la perturbation avance à $8{,}0\ \text{m/s}$ au lieu de
  $4{,}0$. (Il a fallu **quadrupler** la tension pour doubler la célérité ; la
  relation qui le dit, $v = \sqrt{F/\mu}$, est citée plus loin dans ce chapitre —
  ici, c'est une donnée de l'appareil.) Deux montages, donc. **Montage A :** $M$ à
  $1{,}6\ \text{m}$, sur la corde du cours, $4{,}0\ \text{m/s}$. **Montage B :** $M$
  à $3{,}2\ \text{m}$, sur la corde plus tendue, $8{,}0\ \text{m/s}$. Même geste dans
  les deux cas. »
- **Pari :** « Dans lequel des deux montages $M$ commence-t-il à bouger le
  premier ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `le-plus-proche` | dans le montage A : $M$ y est deux fois plus près de la source, il est donc prévenu le premier | non | **`retard-relation-fausse`** *(forme « $d$ seule »)* | « Tu n'as regardé qu'un des deux termes. Le retard n'est pas une distance, c'est une distance **divisée par** une célérité : $\tau = d/v$. Dans A, $1{,}6 / 4{,}0 = 0{,}40\ \text{s}$. Dans B, la distance est bien deux fois plus grande — mais la corde va deux fois plus vite : $3{,}2 / 8{,}0 = 0{,}40\ \text{s}$. Vérifie les deux avec les contrôles : les deux films démarrent au même instant. Quand les deux termes d'un rapport doublent ensemble, le rapport ne bouge pas. » |
| `le-plus-tendu` | dans le montage B : la corde y est plus tendue, elle transmet plus vite, et c'est la vitesse qui commande | non | **`retard-relation-fausse`** *(forme « $v$ seule »)* | « Tu n'as regardé que l'autre terme — c'est l'erreur symétrique de la précédente, et elle tombe sur le même récif. La corde de B transmet bien deux fois plus vite ; seulement $M$ y est deux fois plus loin. $3{,}2 / 8{,}0 = 0{,}40\ \text{s}$, exactement comme $1{,}6 / 4{,}0$. Ni la distance seule, ni la célérité seule : c'est leur **rapport** qui fait le retard. » |
| `en-meme-temps` | dans les deux au même instant, $0{,}40\ \text{s}$ : $1{,}6/4{,}0 = 3{,}2/8{,}0$ | **oui** | — | « Oui. Et c'est la bonne façon de tenir la relation $\tau = d/v$ en tête : elle ne dit pas « plus loin, plus tard » ni « plus tendu, plus tôt », elle dit **un rapport**. Deux réglages différents peuvent donner exactement le même retard, et deux réglages identiques sur un seul terme peuvent tout changer. Vérifie-le : garde la corde tendue et ramène $M$ à $1{,}6\ \text{m}$ — le retard tombe à $0{,}20\ \text{s}$. » |

- **`suite` :** « Trois manœuvres pour finir, dans cet ordre. **Une :** vérifie le
  pari — les deux montages, le même $0{,}40\ \text{s}$. **Deux :** garde $M$ où il
  est et parcours les quatre gestes, sur l'une puis l'autre corde : l'instant de
  départ ne dépend **jamais** du geste, toujours de la corde et de la distance.
  **Trois :** passe à la photo, sur la corde tendue, et cherche encore l'instant où
  le front touche $M$ — tu retrouveras au centième près le retard que le film
  t'avait donné. Deux appareils, deux axes, un seul nombre. »
- **⟂-avant-pari :** les neuf lectures — **`retard` compris** ; les tracés ; le
  verdict ; tout mouvement. **Reste visible :** la corde au repos, la main, $M$ coté,
  la **description écrite** des deux montages (l'énoncé : les deux distances et les
  deux célérités sont dans la consigne), les axes vides.
  *Note :* `distance` et `celerite` sont ici **de l'énoncé** (ils redisent la
  consigne) ; `retard` est **la réponse**. La frontière passe entre les deux.

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes.** Tout ce qui dépend de l'ISSUE attend la
révélation : **la corde déformée** (la corde est plate — c'est la forme la plus
visible de la règle ici), les **tracés** du film (les deux, celui de $S$ comme celui
de $M$), les **photos**, le front et sa cote, la règle de mesure, toute lecture qui
est une réponse, le verdict, et la phrase lue au lecteur d'écran. Ce qui reste, c'est
**l'énoncé** : la corde au repos, la main, le marqueur de $M$ coté, les axes gradués
et **vides**, les appareils **vides**, et le petit graphe du geste $y_S(t)$ en S2 (la
donnée dont tout part).

**Pas d'exception de vues**, comme dans la cuve : il n'y a ni caméra, ni glisser, ni
point de vue — la corde se regarde de côté, à une seule échelle. Le contrat
avant-pari est donc **entier**.

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du 2026-09-24 soir) : *ce
qu'une étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT fait
deviner.* Table écrite étape par étape, à re-vérifier par la porte contre le
descripteur :

| étape | contrôles ouverts | ce qu'ils peuvent atteindre | pari suivant mis en danger ? |
|---|---|---|---|
| S1 | `point_m` seul, sur **`bosse` symétrique**, `vue: film` | des retards de $0{,}10$ à $0{,}80\ \text{s}$, **une seule corde, un seul geste, un seul appareil** | **non** pour S2 : le geste est **symétrique**, donc la corde dessinée ne porte **aucune** information de miroir (§2.3), et `vue: photo` n'existe pas dans le DOM. **non** pour S3 : aucune caméra, aucune seconde image. **non** pour S4 : `geste` est fermé. **non** pour S5 : `tension` est fermé — et le pari de S5 se tranche **précisément** sur la tension. |
| S2 | `instant` seul, `geste: rampe`, `vue: photo` | la corde figée à tout instant, le front partout | **non** pour S3 : une photo **unique**, sans règle de mesure, sans seconde image, sans caméra — la question « que faut-il mesurer sur **deux** photos » n'a pas d'objet atteignable. **non** pour S4 : `geste` fermé. **non** pour S5 : `tension` fermé. |
| S3 | `camera` seul | des paires de photos, toutes sur le même geste et la même corde | **non** pour S4 : `geste` fermé, donc l'amplitude ne peut pas varier. **non** pour S5 : `tension` fermé. |
| S4 | `geste` seul, $d$ fixée, `vue: film` | quatre formes de perturbation, **un seul $d$, une seule corde** | **non** pour S5 : les deux montages du pari exigent $(1{,}6\ \text{m}\ ;\ 4{,}0)$ **et** $(3{,}2\ \text{m}\ ;\ 8{,}0)$ ; `point_m` **et** `tension` sont fermés. |
| S5 | les quatre + `tension` | tout | — |

**Une fuite molle, écrite franchement.** La `suite` de S1 fait découvrir que le
retard **suit la distance** ($0{,}4\ \text{m} \to 0{,}10\ \text{s}$ ;
$2{,}4\ \text{m} \to 0{,}60\ \text{s}$). Un élève qui a fait ce travail arrive à S5
en sachant la moitié de la réponse. **Ce n'est pas une fuite au sens de la règle** :
la règle interdit d'**atteindre l'état** qu'un pari fait deviner, pas de comprendre
la physique qui y mène — et l'état qui tranche S5 (la corde tendue) reste
inatteignable jusqu'à S5. C'est le « cas limite » écrit par la spec de la cuve
(§7.6), et il est ici volontaire : **S5 doit être gagnable par le raisonnement**,
c'est une étape de consolidation.

**Pourquoi `point_m`, `instant` et `geste` sont rouverts en S5, et pourquoi c'est
légitime.** La `suite` de S5 est la manœuvre de synthèse (vérifier les deux montages,
puis croiser geste et corde, puis repasser du film à la photo). Sans ces trois
contrôles, elle serait une phrase au lieu d'un geste. Le contrôle **neuf** de S5 est
`tension`, et la règle « un contrôle neuf par étape » (ADR 0041 §4) est respectée. Le
précédent existe (manège S5, cuve S4 et S5).

---

## 8. Misconceptions

Les dix modèles déclarés de la notion vivent dans `items.yaml` sous le préfixe
`mc.physics.pc_omp.`. Les comptes ci-dessous sont **au niveau ITEM**, méthode
`coverage_summary` (une misconception compte un item dès qu'un de ses distracteurs
la porte, **une seule fois** par item ; les points d'arrêt ne comptent pas, **et les
paris de scène non plus**).

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions visées |
|---|---|
| S1 | `retard-relation-fausse` (forme **$+\tau$**, causalité) · `periodicite-hors-cadre` (le point qui « continue d'osciller ») |
| S2 | **`photo-film-confondus` proposé** (repli : `retard-relation-fausse`) · `retard-relation-fausse` (forme **rapport inversé**, $t/v$ au lieu de $v\,t$) |
| S3 | `celerite-est-vitesse-point` · `retard-relation-fausse` (forme **bornes incohérentes**) |
| S4 | `celerite-depend-source` · **double étiquetage** `celerite-est-vitesse-point` + `celerite-depend-source` |
| S5 | `retard-relation-fausse` (deux formes distinctes : « $d$ seule », « $v$ seule ») |

**Co-attribution assumée, et ce n'en est pas un défaut.** Le distracteur
`deux-fois-plus-tot` de S4 est atteignable par **deux** modèles — confondre la
vitesse d'un point avec la célérité, et croire que la source fixe la célérité. C'est
une co-attribution **cible-distracteur** entre modèles, qui demande un **double
étiquetage**, pas une réécriture. (La distinction du standard : une contamination de
la **bonne** réponse serait un défaut d'énoncé ; une co-attribution de **distracteur**
n'en est pas un.)

**Deux distracteurs sur un même modèle, dans une même question** (S5, et S2/S3 pour
`retard-relation-fausse`) : assumé aussi, parce que les **formes** diffèrent et que
les `retour` diffèrent. Le compteur d'exposition ne s'en trouve pas faussé — le
plancher se compte sur les **items**, pas sur les paris.

**Ce que la scène ne confronte PAS, écrit à côté de ce qu'elle confronte** (ADR 0035
— *la décision de ne pas armer s'écrit à côté du motif voisin*) :
`onde-transporte-matiere` (§2.6 : déjà servi cinq fois ; la porte le garde quand même
sans dépenser d'étape), `onde-sans-energie`, `onde-sans-milieu`,
`confusion-transversale-longitudinale` (§2.6 : demanderait un mode ressort),
`front-onde-dimension` et `son-nature` (une corde est un milieu à **une** dimension —
une scène 1D ne peut rien dire d'un front sphérique sans mentir). Les quatre derniers
sont précisément ceux que la `REVIEW-2026-09-19` compte comme **jamais confrontés** :
**cette scène n'en répare aucun**, et il faut le dire plutôt que de le laisser croire.

### 8.2 « La photo est le geste recopié » — un modèle neuf, et voici pourquoi

Les modèles déclarés qui touchent au graphe sont :

- `retard-relation-fausse` : le **calcul** du retard est faux (rapport inversé,
  produit, unités, signe $+\tau$).
- `periodicite-hors-cadre` : on importe $\lambda = v\,T$ hors du cadre périodique.
- `celerite-est-vitesse-point` : on confond deux **vitesses**.

Le modèle que S2 débusque n'est aucun des trois, et il est **difficile à voir** parce
qu'il **coche la bonne réponse partout dans le corpus actuel** : l'élève qui lit un
graphe sans identifier son axe des abscisses répond **juste** à OMP-13 (calcul de
$\tau$), **juste** à `cp-r3-retard`, **juste** à OMP-5 et OMP-16, et **juste** à toute
question purement numérique — parce qu'aucune question du corpus ne lui demande
jamais de **dessiner ou de lire une corde**. Il tombe uniquement le jour où un sujet
écrit « représenter l'aspect de la corde à l'instant $t_1$ » — c'est-à-dire le jour
de l'examen.

Ce n'est pas `retard-relation-fausse` : le calcul de l'élève est **juste**, c'est sa
**lecture du graphe** qui est fausse. Les deux élèves ne font pas la même erreur et ne
se rattrapent pas de la même façon — fusionner les deux, c'est un compteur qui ne dit
plus lequel tourne (même argument que le manège, §8.2 de sa spec).

**Recommandation : ouvrir un onzième modèle.** Proposition complète, au format et
avec les trois champs de `items.yaml` :

```yaml
  - id: mc.physics.pc_omp.photo-film-confondus
    label: "« Confondre la PHOTO de la corde (élongation en fonction de la distance x, à un instant figé) et le FILM d'un point (élongation en fonction du temps t, à une abscisse figée) »"
    description: "L'élève lit ou dessine un graphe sans identifier son axe des abscisses. Formes : recopier le geste de la source y_S(t) tel quel comme aspect de la corde, au lieu de son MIROIR (le point le plus éloigné de S rejoue ce que S a fait en PREMIER) ; lire une durée sur une photo (ou une distance sur un film) sans passer par la célérité ; conclure d'un graphe qu'un point « monte puis descend » alors que le graphe montre une corde, ou l'inverse. Ce modèle répond CORRECTEMENT à toute question purement numérique sur τ = d/v : il ne se révèle qu'en demandant de LIRE ou de DESSINER une corde."
    contradicts_principle: "Une photo et un film sont deux coupes différentes du même phénomène : la photo fige le temps et parcourt l'espace, le film fige l'espace et parcourt le temps. Sur une photo, une largeur est une DISTANCE (on passe à une durée en divisant par v) et la forme est le geste de la source RETOURNÉ, parce qu'on remonte le temps du geste en s'éloignant de S. Sur un film, l'abscisse est une DURÉE et la courbe de M est celle de S décalée de +τ vers la droite."
```

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige qu'un `misconception:` employé par un pari de scène soit
**déclaré dans `items.yaml` au moment où la scène est validée**. Si le onzième modèle
n'est pas accepté, **la scène part avec `retard-relation-fausse` sur le choix
`recopie` de S2** et une seule ligne change à l'adoption (§8.5).

### 8.3 Les trois items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** où au moins un distracteur porte le modèle.
**Les paris de la scène ne comptent pas** — le modèle apprenant est bâti sur le banc
de fin seul (`coverage_summary.method`).

**Conventions de ce fichier, à respecter à la lettre :** les items portent
`id`, `rung`, `difficulty_level`, `skill_code`, `tags`, `primary_misconception`,
`stem`, `type: mcq`, `choices` (chacun `id` A/B/C/D, `text`, `correct`, et pour les
faux `misconception:` + `feedback:`), `correct_feedback`, `solution`.
**`items.yaml` de cette notion ne porte AUCUN champ `habilete:`** (seul
`checkpoints.yaml` en porte un) : **ne pas en ajouter** — ce serait un changement de
schéma, pas une décision d'item. **Piège de YAML déjà payé ici** (`REVIEW` §5) : dans
un bloc **plié** (`feedback: >`), `\\tau` reste littéral et KaTeX le lit comme un saut
de ligne ; utiliser `"… \\tau …"` entre guillemets doubles, ou un bloc **littéral**.

---

**OMP-22** — `rung: "R3"`, `difficulty_level: 3`,
`primary_misconception: mc.physics.pc_omp.photo-film-confondus`

- *stem :* La source $S$, à l'extrémité d'une corde tendue, monte de $0$ à
  $3{,}0\ \text{cm}$ en $0{,}10\ \text{s}$, **puis reste immobile en position
  haute**. La célérité des perturbations sur cette corde vaut $4{,}0\ \text{m/s}$.
  On **photographie la corde entière** à l'instant $t_1 = 0{,}25\ \text{s}$. Quel est
  l'aspect de la corde sur cette photo ?
- *clé (A) :* la corde est à $3{,}0\ \text{cm}$ depuis $S$ jusqu'à
  $0{,}60\ \text{m}$, **descend** en pente jusqu'à $0$ à $1{,}00\ \text{m}$, et est
  au repos au-delà.
- *distracteurs :*
  - (B) « la corde est au repos jusqu'à $0{,}60\ \text{m}$, **monte** en pente
    jusqu'à $3{,}0\ \text{cm}$ à $1{,}00\ \text{m}$, et reste à $3{,}0\ \text{cm}$
    au-delà » → **`photo-film-confondus`** *(le graphe du geste recopié le long de
    $x$)*. `feedback` : le point le plus avancé vient d'être atteint, il ne rejoue
    que le début du geste — donc zéro ; et rien ne peut bouger **au-delà** du front.
  - (C) « la corde est déformée sur les $6\ \text{cm}$ qui suivent $S$, le reste est
    au repos » → **`retard-relation-fausse`** *(l'élève calcule
    $0{,}25/4{,}0 = 0{,}0625\ \text{m}$)*. `feedback` : contrôle d'unités —
    $\text{s} \div (\text{m}/\text{s})$ n'est pas une longueur ; on **multiplie**.
  - (D) « toute la corde est déformée, l'élongation décroissant progressivement à
    mesure qu'on s'éloigne de $S$ » → **`retard-relation-fausse`** *(célérité
    implicitement infinie : pas de front)*. `feedback` : la célérité est finie, donc
    il existe un point le plus avancé, à $v\,t_1 = 1{,}00\ \text{m}$ ; au-delà, la
    corde n'a **rien** reçu.
- *solution :* les trois gestes dans l'ordre — le front à $v\,t_1$, le sens de la
  pente (le front rejoue le début), la largeur de la pente ($v \times$ durée du
  geste).

**OMP-23** — `rung: "R3"`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* Sur une corde de célérité $v = 5{,}0\ \text{m/s}$, un élève dispose du
  graphe ci-contre (transcrit dans l'énoncé) : **en abscisse, la distance $x$ à la
  source, en mètres** ; la corde y est déformée entre $x = 0{,}60\ \text{m}$ et
  $x = 1{,}10\ \text{m}$, et au repos partout ailleurs. Il en conclut : « la
  perturbation a duré $0{,}50\ \text{s}$ ». Que penser de cette conclusion ?
- *clé (A) :* elle est fausse : sur ce graphe l'abscisse est une **distance**, et
  $0{,}50\ \text{m}$ n'est pas $0{,}50\ \text{s}$. La durée du geste s'obtient en
  divisant par la célérité : $0{,}50 / 5{,}0 = 0{,}10\ \text{s}$.
- *distracteurs :*
  - (B) « il a raison : la largeur de la déformation **est** la durée du geste »
    → **`photo-film-confondus`**.
  - (C) « il a tort, il fallait multiplier par la célérité :
    $0{,}50 \times 5{,}0 = 2{,}5\ \text{s}$ » → **`retard-relation-fausse`**.
  - (D) « on ne peut rien conclure sans connaître la fréquence de la source »
    → **`periodicite-hors-cadre`**.
- *exigence de rédaction :* aucun distracteur ne nomme sa propre faute ; chaque
  `feedback` donne la **raison**, jamais l'étiquette. Et l'énoncé doit dire
  explicitement ce qu'il y a sur l'axe — c'est précisément le geste qu'on évalue.

**OMP-24** — `rung: "R3"`, `difficulty_level: 4`, même `primary_misconception`
*(co-étiquetage assumé avec `celerite-depend-source` sur un distracteur)*

- *stem :* Le **film** du point $M$ d'une corde montre une montée **rapide**
  ($0{,}05\ \text{s}$) suivie d'une descente **lente** ($0{,}15\ \text{s}$). On
  photographie ensuite la corde à un instant où la perturbation la parcourt en
  entier. De quel côté se trouve le **flanc raide** de la bosse sur cette photo ?
- *clé (A) :* du côté du **front**, c'est-à-dire le plus loin de $S$ : le front
  rejoue ce que $S$ a fait en **premier**, donc la montée rapide. La corde présente
  un flanc raide vers l'avant et une longue traîne vers $S$.
- *distracteurs :*
  - (B) « du côté de $S$, puisque c'est là que la montée rapide a été faite »
    → **`photo-film-confondus`**.
  - (C) « la photo montrerait exactement le film : montée raide à gauche, descente
    douce à droite » → **`photo-film-confondus`** *(seconde forme : le film recopié
    tel quel)*.
  - (D) « le flanc raide s'adoucit en avançant, parce que l'avant d'une bosse va plus
    vite que son arrière » → **`celerite-depend-source`**. `feedback` : sur cette
    corde, **tous** les points de la perturbation avancent à la même célérité — elle
    ne dépend que du milieu ; la bosse se translate **sans se déformer**.

### 8.4 Ce que ces trois items font au reste du fichier

- `photo-film-confondus` : **3** (OMP-22, 23, 24) — plancher atteint, **marge nulle**.
- `retard-relation-fausse` : 4 → **6** (OMP-22, 23) · `periodicite-hors-cadre` :
  3 → **4** (OMP-23) · `celerite-depend-source` : 4 → **5** (OMP-24).
- `ramp_coverage` R3 : 4 → **7** · `total_items` : 21 → **24**.
- **Deux dettes chiffrées de la `REVIEW-2026-09-19` reculent :** les items cessent
  d'être *« 21 QCM textuels, sans un seul document »* (OMP-23 fait lire un graphe
  transcrit, OMP-22 et 24 en font construire un) ; et le trou « lecture de document »
  du moteur de maîtrise est **entamé, pas comblé** — la banque reste seule à porter
  les oscillogrammes.
- **Ce que ces items NE font PAS reculer, et qu'il faut relire :** la `REVIEW`
  signale qu'une étiquette de distracteur (OMP-20 D) tient à elle seule le plancher
  de `celerite-est-vitesse-point` (3 items) et que la corriger le ferait tomber à 2.
  **La scène ne le répare pas** (les paris ne comptent pas). Question 7, §13.
- **`coverage_summary` est un tableau GÉNÉRÉ** : le régénérer par
  `node web/scripts/resume-couverture.mjs`, ne jamais le retoucher à la main. *(Et
  pendant qu'on y est : la `REVIEW` signale un bloc d'en-tête périmé qui déclare
  « le plancher n'est PAS atteint » à côté de `floor_met: true`. C'est une décision de
  registre — owner — pas un correctif d'architecte.)*

### 8.5 Voie de repli (si le propriétaire refuse un onzième modèle)

1. amender la `description` de `retard-relation-fausse` pour y écrire la forme
   graphique : « …ou **lit un graphe sans identifier son axe : recopie $y_S(t)$ le
   long de la corde au lieu de son miroir, lit une durée sur une photo** » ;
2. étiqueter OMP-22/23/24 et le choix `recopie` de S2 sur `retard-relation-fausse` ;
3. accepter la perte diagnostique et l'**écrire** dans `coverage_summary` — un
   compteur qui agrège deux modèles doit dire qu'il le fait.

---

## 9. La frontière — ce que la scène ne montre ni ne calcule

Chaque interdit est **gardé par la porte** (§11, famille `frontiere`) : une frontière
que seule la retenue de l'auteur tient se perd à la première retouche (ADR 0041,
addendum du 2026-09-24).

1. **Aucune périodicité.** La source ne fait **qu'un seul geste par course** ; aucune
   répétition, aucune sinusoïde, aucun train d'ondes. Aucun des mots ni symboles
   suivants dans le panneau : « longueur d'onde », « $\lambda$ », « période »,
   « fréquence », « Hz », « sinusoïdal », « $T$ ». C'est **la** frontière du chapitre
   (`cp-r3-periodicite` est un `boundary_guard`), et elle est mesurable dans les deux
   sens : aucun point de la corde ne repasse par sa position de repos plus de deux
   fois pendant une course.
2. **Aucune fonction à deux variables affichée.** La relation montrée est
   $y_M(t) = y_S(t-\tau)$ avec $\tau = d/v$ — la formulation exacte du cadre. La
   photo se lit **graphiquement** (« le point le plus éloigné rejoue ce que $S$ a fait
   en premier »), jamais par une écriture $y(x,t)$ ni $y_S(t - x/v)$. La porte
   interdit les chaînes `y(x`, `x/v`, `∂`, `partial`. *C'est une décision de
   frontière assumée — question 1, §13.*
3. **Aucune équation de propagation, aucun schéma numérique.** Il n'y a rien à
   cacher : la corde est une **translation** calculée en forme fermée (§1).
4. **Aucune interférence, aucune seconde source.** Une seule main, à $x = 0$,
   toujours (exclusion du sous-domaine). Et **aucune superposition de deux cordes** à
   l'image : deux cordes empilées suggéreraient une addition d'ondes.
5. **Aucune réflexion, aucun aller-retour.** L'extrémité lointaine **absorbe**, et la
   légende le dit. Aucun « coefficient de réflexion », aucune onde qui revient — la
   réflexion n'est dans aucun `savoir_faire` du chapitre.
6. **Aucune dispersion, aucun amortissement.** La perturbation se translate **sans se
   déformer** ; la célérité est la même pour tous les gestes. Le milieu dispersif est
   le chapitre suivant. La limite du modèle est dite en légende et en `fit_caveat`
   (§10.1).
7. **Aucun effet Doppler :** la main $S$ ne se déplace **jamais** le long de la corde.
8. **Aucune onde à deux ou trois dimensions.** Une corde est un milieu à **une**
   dimension : ni cercle, ni sphère, ni front circulaire. C'est le chapitre 5 (R4), et
   la figure `front-onde-dimensions` s'en charge.
9. **Aucune énergie chiffrée.** La leçon dit qu'une onde transporte de l'énergie ; la
   scène ne la quantifie jamais (pas de joule, pas de puissance, pas de « la moitié de
   l'énergie »).
10. **Aucun angle, aucune pente chiffrée.** L'échelle verticale est **dilatée
    $\times 20$** : toute pente lue à l'écran serait fausse d'un facteur 20. La scène
    n'affiche donc **aucun angle** et **aucune pente**, et la porte vérifie qu'aucune
    valeur en degrés n'apparaît dans le panneau.
11. **Aucune 3D.** Vue de côté, orthogonale, une seule échelle, pas de caméra, pas de
    perspective, pas de glisser-pour-tourner. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière (§11.2).
12. **La scène ne remplace pas le TP.** Elle *ressemble* au montage du cadre (une
    corde, une caméra) et peut en nourrir des items de lecture ; elle **n'est pas**
    une mesure réelle, et la légende ne prétend jamais le contraire.

---

## 10. Ce que cette simulation peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus dangereuse.
Ce paragraphe est à reprendre **mot pour mot** dans le champ `fit_caveat` du
descripteur, et ses points 1, 2 et 3 doivent apparaître **en légende**, sous la
corde, en une phrase chacun.

1. **L'échelle verticale est dilatée $\times 20$, et c'est le mensonge le plus utile
   de la scène.** $3{,}0\ \text{cm}$ sur $4{,}00\ \text{m}$ de corde, c'est un
   rapport de $1$ à $133$ : à l'échelle vraie, on ne verrait **rien**. La scène
   dilate donc la verticale d'un facteur $20$ et **l'écrit sur l'image**. Deux
   conséquences honnêtes : (a) toute **pente** vue à l'écran est fausse d'un facteur
   $20$, donc la scène n'en affiche aucune et n'en demande jamais (§9.10) ; (b) le
   rapport que S1 met en jeu — la perturbation parcourt $1{,}2\ \text{m}$ pendant que
   $M$ parcourt $3{,}0\ \text{cm}$ — est précisément celui que la dilatation écrase.
   D'où l'**encart à l'échelle vraie** ($\times 1$) sous la corde à la révélation de
   S1 : la même corde, la même secousse, presque une ligne droite. *Légende, une
   phrase :* « Échelle verticale dilatée 20 fois : sans cela, une secousse de 3 cm
   sur 4 m de corde serait invisible. »
2. **Le temps est ralenti $\times 5$, et c'est écrit.** Le front traverse la corde en
   $1{,}00\ \text{s}$ réelle ; la course dure $5{,}0\ \text{s}$ à l'écran. Sans ce
   ralenti, la montée de $M$ occuperait six images. *Légende, une phrase :*
   « Ralenti 5 fois : en vrai, tout ce que tu vois ici dure une seconde. »
3. **Le bout de la corde absorbe, et une vraie corde de TP aussi.** Sans quoi
   l'onde reviendrait et brouillerait la lecture. Les montages de laboratoire
   terminent la corde par un amortisseur exactement pour cette raison : ce n'est pas
   un artifice de calcul caché, c'est l'appareil. *Légende, une phrase :*
   « L'extrémité lointaine est amortie : aucune onde ne revient. »
4. **La corde est idéale : ni amortissement, ni dispersion.** La perturbation se
   translate sans perdre un dixième de millimètre ni changer de forme. Une vraie
   corde amortit (la bosse s'aplatit un peu) et disperse légèrement (les parties
   fines de la perturbation n'avancent pas tout à fait comme les larges). Le choix
   est assumé pour deux raisons : c'est **le modèle du chapitre** ($v$ fixée par le
   milieu, perturbation qui se relaie sans se déformer), et c'est la seule hypothèse
   qui permette d'affirmer honnêtement, en S4, « on n'a changé **que** le geste ».
5. **La « mesure » de S3 n'a aucune incertitude, et une vraie en a une.** La corde
   étant calculée exactement, les deux positions lues sont exactes et le quotient
   tombe sur $4{,}0\ \text{m/s}$ pile, à chaque écart de photos. Sur un vrai film, on
   lit une position **au pixel près sur un quadrillage** — l'entrée de banque
   `bk-2015-r-x2` en porte la trace, avec sa réserve écrite sur une lecture d'auteur
   jamais re-mesurée. Ce que la scène enseigne, c'est la **méthode** (quoi mesurer,
   quel dénominateur) ; ce qu'elle ne montre pas, c'est la **dispersion des mesures**.
6. **La célérité de la corde tendue est une donnée, pas une démonstration.** Passer
   de $4{,}0$ à $8{,}0\ \text{m/s}$ demande de **quadrupler** la tension
   ($v = \sqrt{F/\mu}$, relation citée plus loin dans le même chapitre). La scène
   l'affiche comme une propriété de l'appareil et ne la démontre pas.
7. **Ce qu'une vraie corde montrerait de plus, et qui manque ici :** le bruit, la
   raideur de flexion aux petites échelles, le fait qu'une main humaine ne fait jamais
   deux fois exactement le même geste. La scène est **plus propre que la réalité**.
   Elle ne doit donc jamais servir d'argument contre une image de TP moins nette.

---

## 11. La porte (`web/scripts/scene-corde.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="corde-photo-film"]`, **jamais**
par `[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du
champ magnétique, run 747). Elle se lance **plusieurs fois, à plusieurs largeurs**
(1 280 px et 390 px au minimum) avant d'être crue. Quatre verdicts honnêtes
(ADR 0034/0038) : **ROUGE**, **AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le
canvas 2D n'est pas disponible au banc, elle sort **MUET, en échec**, jamais en vert.

### 11.1 Les nombres qu'une SECONDE voie doit établir

**La règle de la cuve ne s'applique PAS ici, et il faut dire pourquoi.** La porte de
la cuve refusait de recalculer les nombres d'une **simulation** (un second solveur ne
prouve rien de plus) et n'établissait que des **invariants**. La corde, elle, est
**analytique** : une seconde implémentation, écrite dans la porte à partir de la
**spec** (les quatre gestes, $v \in \{4{,}0 ; 8{,}0\}$, $\Delta t = 5\ \text{ms}$) et
**sans importer aucun module du produit**, calcule les mêmes nombres **exactement**.
Un écart quelconque est un défaut, pas du bruit.

| # | ce qui est recalculé par la porte | attendu | tolérance |
|---|---|---|---|
| N1 | $\tau = d/v$ pour les **16** couples $(d, v)$ | $0{,}05$ à $0{,}80\ \text{s}$ | **égalité de chaîne** avec la lecture affichée |
| N2 | $x_{\text{front}} = v\,t$ pour les 21 instants × 2 célérités | $0{,}00$ à $4{,}00\ \text{m}$ | égalité de chaîne |
| N3 | $y_M(t)$ aux instants de la grille, pour les 4 gestes | exact | égalité de chaîne (1 déc. en cm) |
| N4 | la position **en pixels** du front, du sommet, du pied de pente | — | $\le 1{,}5$ px |
| N5 | $\Delta t$ de la caméra = (nombre d'**intervalles**) / 20 | $0{,}05$ · $0{,}10$ · $0{,}20$ · $0{,}25$ s | égalité de chaîne |
| N6 | `mesure-v` recalculée par la porte à partir des **deux positions affichées** et de $\Delta t$ affiché | $4{,}0$ m/s | égalité de chaîne — *chaîne de calcul, pas valeur isolée* |
| N7 | `vitesse-M` = hauteur du geste / durée de sa montée | $0{,}30$ ou $0{,}60$ m/s | égalité de chaîne |
| N8 | la grille exacte : $\tau/\Delta t$, $t_1/\Delta t$, (durée de geste)$/\Delta t$ | **entiers**, sans exception, à **toutes** les positions des contrôles | exact |

**Ce que la porte NE mesure PAS, écrit à côté de ce qu'elle mesure** (ADR 0035) : la
**pente** de la corde en degrés ou en pixels/pixel — elle est dilatée $\times 20$ et
n'a aucun sens physique à l'écran (§9.10). Elle mesure les **positions** et les
**hauteurs**, jamais les angles.

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `miroir` | S2, `geste: rampe`, $t_1 = 0{,}25\ \text{s}$ : la hauteur dessinée à $x = 0{,}20\ \text{m}$ vaut **$\ge 95\ \%$** du maximum, celle à $x = 0{,}90\ \text{m}$ **$\le 30\ \%$** — la corde **descend** vers le front | une corde dessinée **non retournée** ($y_S(x/v)$ au lieu de $y_S(t - x/v)$) doit rougir : les deux mesures s'échangent |
| `miroir-inerte` | S1, `geste: bosse` : les hauteurs à gauche et à droite du sommet coïncident à **$2\ \%$** près — la bosse est **son propre miroir**, elle ne peut **rien** dire du sens de lecture (§2.3) | un geste **asymétrique** posé à l'étape 1 doit rougir : il ferait fuiter le pari de S2 |
| `front-net` | au-delà de $x_{\text{front}} + 2$ px, la corde est **exactement** à sa ligne de repos (variance nulle) | un calcul **non causal** (une valeur pour $t < x/v$) doit rougir |
| `retard-signe` | sur le film, le premier pixel non nul du tracé de $M$ est à droite de celui de $S$, de $\tau \times$ (px par seconde), à **$\le 2$ px** | un décalage $+\tau$ **vers la gauche** doit rougir ; un décalage nul aussi |
| `forme-conservee` | la hauteur maximale et la largeur en pixels du tracé de $M$ égalent celles du tracé de $S$ à **$2\ \%$** près | un tracé **atténué** ($\times 0{,}8$) ou **étiré** dans le temps doit rougir |
| `M-n-avance-pas` | l'abscisse **en pixels** du marqueur de $M$ est **identique**, image par image, sur toute une course | un marqueur **advecté** avec la bosse doit rougir *(le fait gardé sans dépenser d'étape — §2.6)* |
| `celerite-independante` | $x_{\text{front}}$ en pixels au même instant, pour `rampe` et `rampe-haute` : **identique à $\le 1$ px** | une célérité mise à l'échelle de l'amplitude doit rougir |
| `exageration` | (px par cm en vertical) / (px par m en horizontal) $= 20{,}0 \pm 2\ \%$ ; dans l'encart à l'échelle vraie, $\le 1\ \%$ de la longueur dessinée | deux échelles incohérentes, ou un encart « vrai » qui ne l'est pas, doivent rougir |
| `avant-pari` | à chaque étape, avant l'engagement : la corde est **plate** (variance des pixels sous un seuil), **zéro** pixel d'accent (mesuré en **chrominance**, pas en luminance), aucun tracé sur les axes, aucune photo, aucune lecture-réponse dans le DOM, aucun bouton de course | après l'engagement : la corde bouge et l'accent apparaît |
| `photos-distinctes` | S3 : **deux** clichés dans le DOM, à la même échelle horizontale (px par mètre identiques à $1\ \%$), la bosse déplacée de $v\,\Delta t$ | deux clichés à des échelles différentes, ou identiques, doivent rougir |
| `une-seule-source` | un seul point d'émission, à $x = 0$, à tous les réglages | une seconde source doit rougir |
| `pas-de-retour` | après le passage du front à l'extrémité, le maximum de $|y|$ sur la moitié gauche reste sous $2\ \%$ de l'amplitude | une **réflexion** au bout doit rougir |
| `pas-de-periodicite` | pendant une course, chaque colonne de pixels de la corde change de côté **au plus deux fois** | une source **répétée** doit rougir |
| `grille-exacte` | `data-tau-pas`, `data-instant-pas`, `data-cellules-*` entiers à **toutes** les positions | un pas de $0{,}3\ \text{m}$ sur `point_m` ou de $0{,}04\ \text{s}$ sur `instant` doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucune boucle d'animation) ·
`etapes` (chaque étape pose son état, n'ouvre que ses contrôles, les autres
**absents du DOM** ; l'appareil d'une autre étape — photo, caméra, second cliché —
absent lui aussi) · `paris` (3 choix, exactement un juste, un `retour` par choix,
rien dans la région live avant l'engagement) · `fuite-inter-etapes` (§7.6 : la porte
**écrit elle-même** la table « quel réglage atteint quel état », contre le
descripteur — et vérifie en particulier que **S1 tourne sur un geste symétrique** et
que `tension` n'est ouvert **qu'**en S5) · `frontiere` (aucune des chaînes interdites
du §9 dans le panneau ouvert : `λ`, `longueur d'onde`, `période`, `fréquence`, `Hz`,
`sinusoïd`, `y(x`, `x/v`, `∂`, `réflexion`, `interférence`, `Doppler`, `°`) ·
`eclairs` (aucune fenêtre de 10° ne s'éclaire plus de trois fois par seconde pendant
une course — **attendu structurellement vide**, mesuré quand même, §6) ·
`sans-mouvement` (`prefers-reduced-motion` : la scène calcule sans animer et montre
l'image finale ; le bouton « Image finale » existe pour tous) · `katex` (aucun LaTeX
brut visible) · `etiquettes` (aucune étiquette n'en chevauche une autre, n'est barrée
par un trait, ni ne sort du cadre — à 1 280 et à 390 px ; pièce commune `disposer`) ·
`clavier` et `ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs` : ouvrir,
parier, avancer, revenir AU CLAVIER sans perdre le focus ; toute cible $\ge 44$ px ;
chaque contrôle porte son `scroll-margin-top`, **vérifié en donnant le focus**) ·
`console` (aucune erreur) · `performance` (`data-facteur-temps` $= 5{,}00$ **mesuré
contre l'horloge**, pas contre les pas demandés ; sinon **AVERTISSEMENT-vu**, jamais
un vert muet ; page au premier plan, leçon n°6 de la porte de la cuve).

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette
commande** (ADR 0034). Sabotages à outiller, un par famille :

1. dessiner la corde **non retournée** ($y_S(x/v)$) → `miroir`, `nombres` (N4) ;
2. poser un geste **asymétrique** à l'étape 1 → `miroir-inerte`, `fuite-inter-etapes` ;
3. décaler le tracé de $M$ de **$+\tau$ vers la gauche** → `retard-signe` **seule**
   (c'est la misconception même, posée dans le code) ;
4. atténuer le tracé de $M$ de $20\ \%$ → `forme-conservee` ;
5. faire avancer le marqueur de $M$ avec la bosse → `M-n-avance-pas` **seule** ;
6. multiplier la célérité par l'amplitude du geste → `celerite-independante`,
   `nombres` (N2) ;
7. afficher une lecture-réponse, ou animer la corde, avant le pari → `avant-pari` ;
8. dessiner l'encart « à l'échelle vraie » à l'échelle dilatée → `exageration` ;
9. compter les **images** au lieu des **intervalles** dans $\Delta t$ →
   `nombres` (N5, N6) **seule** — c'est l'erreur du sujet officiel, posée dans le
   code ;
10. mesurer `mesure-v` depuis $S$ au lieu de l'avance entre les deux photos →
    `nombres` (N6) ;
11. passer le pas de `point_m` à $0{,}3\ \text{m}$ → `grille-exacte` ;
12. importer `three` dans le module de la scène → `pas-de-3d` ;
13. réfléchir l'onde au bout de la corde → `pas-de-retour` ;
14. répéter le geste de la source → `pas-de-periodicite`, `frontiere` ;
15. ouvrir `tension` à l'étape 4 → `fuite-inter-etapes` ;
16. ajouter au panneau une ligne « $\lambda = v\,T$ » ou un angle en degrés →
    `frontiere`.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que
**la** porte qui le garde : si le sabotage 3 fait aussi rougir `forme-conservee`,
c'est que les deux familles mesurent la même chose et qu'il faut en resserrer une.

---

## 12. Entrée de registre et champs du descripteur

**Registre** (`web/src/lib/scene3d/scenes.json` — voir la question 2 sur le nom du
dossier) :

```json
"corde-photo-film": {
  "temps": false,
  "course": true,
  "dimension": "2d",
  "controles": ["point_m", "instant", "camera", "geste", "tension"],
  "etat": ["d_m", "geste", "v_ms", "vue", "instant_s", "camera_n", "reference"],
  "bornes": {
    "d_m": [0.4, 3.2],
    "instant_s": [0, 1.0]
  },
  "valeurs": {
    "geste": ["bosse", "rampe", "rampe-haute", "rampe-lente"],
    "v_ms": ["4", "8"],
    "vue": ["film", "photo", "photos"],
    "camera_n": ["1", "2", "4", "5"],
    "reference": ["aucune", "rampe"]
  },
  "lectures": ["distance", "celerite", "retard", "instant", "front",
               "elongation-M", "duree-geste", "vitesse-M", "mesure-v"]
}
```

*`v_ms` et `camera_n` sont des énumérations de **chaînes**, exactement comme `f_hz`
dans la cuve et `force` dans le manège : des crans, aucune valeur intermédiaire,
aucune machinerie nouvelle dans `validate-content`.*

Vérifications que `validate-content` fera, et qui passent par construction : chaque
étape a `id`/`titre`/`consigne` et **au moins un contrôle** ; chaque contrôle déclaré
est ouvert par une étape (`point_m` → S1, S5 · `instant` → S2, S5 · `camera` → S3 ·
`geste` → S4, S5 · `tension` → S5) ; la première étape pose un état ; chaque pari a
2–4 choix, **exactement un** `juste`, et **un `retour` par choix** ; chaque
`misconception` citée est **déclarée dans `items.yaml`** (§8.2, note de séquencement)
— **c'est le point bloquant tant que `photo-film-confondus` n'est pas adopté** ;
`revele_apres_course` $\in\ ]0,1]$ et la scène est bien une scène à course ;
`temps: false` donc **aucun** `revele_apres_h` ; tous les états sont dans les bornes
et les valeurs.

**Table des états, à recopier telle quelle dans le descripteur :**

| étape | d_m | geste | v_ms | vue | instant_s | camera_n | reference | $\tau$ | révélation |
|---|---|---|---|---|---|---|---|---|---|
| `le-film-de-M` | 1.2 | `bosse` | "4" | `film` | — | — | `aucune` | **0,30 s** | course 1 |
| `la-photo-a-t1` | 1.2 | **`rampe`** | "4" | **`photo`** | 0.25 | — | `aucune` | 0,30 s | course 1 (gel à $t_1$) |
| `deux-photos` | 1.2 | `bosse` | "4" | **`photos`** | — | "4" | `aucune` | 0,30 s | course 1 (2 clichés) |
| `le-meme-geste-en-plus-grand` | 1.2 | **`rampe-haute`** | "4" | `film` | — | — | **`rampe`** | 0,30 s | course 1 (2 phases) |
| `libre` | **1.6** | `bosse` | "4" | `film` | 0.40 | — | `aucune` | 0,40 s | **immédiate** |

**Champs de fin du descripteur** (mêmes rubriques que les scènes existantes) :

- `boundary` = le §9 résumé ;
- `boundary_guard_details` = les chaînes interdites du §9 et la règle « aucune valeur
  en degrés, aucune pente chiffrée » ;
- **`fit_caveat` = le §10 en entier** (ses points 1, 2 et 3 aussi en légende) ;
- `param_manipulation_guide` = la table $\tau(d, v)$ du §5.2, la table de la caméra,
  et la raison des pas ;
- `fallback_note` = **sans JavaScript et à l'impression, le panneau disparaît ; la
  figure `onde-propagation-retard` couvre la corde à deux instants, et AUCUNE figure
  du corpus ne montre un graphe en fonction du TEMPS ni l'aspect de la corde — c'est
  précisément ce que le manipulable apporte, et c'est pourquoi la sous-section de
  prose du §4.2 est exigée, pas optionnelle** ;
- `pedagogy_wiring` avec `why_manipulable` (le §2.1), `predict_then_reveal` et la
  liste des misconceptions visées ;
- `spec_ref` = ce fichier ;
- `adr_ref` = `docs/decisions/0041-scenes-3d-de-premiere-partie.md`.

**Taxonomie de sourçage (ADR 0017, amendé par ADR 0041 ; les deux champs sont
obligatoires) :**
**`type: manipulable`** · **`tool: scene2d`** — première partie, Canvas 2D, aucune
dépendance tierce, chaque mot affiché écrit par nous. `scene2d` est la valeur
introduite par la cuve à ondes (question 1 de sa spec) ; `scene3d` serait un mensonge
dans un fichier dont le §1 dit que la scène **n'est pas** en 3D, et
`geogebra/desmos/phet` sont fermés aux nouveaux embeds depuis l'amendement du
2026-07-07.

---

## 13. Ce que cette spec ne tranche pas — questions au propriétaire

1. **Le MIROIR est-il dans le cadre de ce chapitre ?** **C'est la question
   principale.** Le chapitre `ondes_mecaniques_progressives` **ne porte aucun bloc
   `limites:`** ; ses `savoir_faire` nomment $y_M(t) = y_S(t-\tau)$ et « exploiter des
   documents/données », jamais explicitement « représenter l'aspect de la corde ».
   L'aspect de la corde **est** une question de bac récurrente, et le miroir en est la
   conséquence directe — mais c'est une **inférence**, pas une ligne imprimée.
   **Recommandation : OUI, l'enseigner**, borné comme suit — lecture **graphique**
   seulement, $y_M(t) = y_S(t-\tau)$ avec $\tau = d/v$ affichée, **jamais** une
   écriture $y(x,t)$ ni $y_S(t-x/v)$ (§9.2). *Et une demande à part : que le
   propriétaire fasse remonter au cadre l'absence de bloc `limites:` sur ce chapitre —
   la `REVIEW-2026-09-19` de la notion voisine l'a déjà demandé pour
   `ondes_periodiques`. Deux chapitres sans limites, c'est un motif, pas un oubli.*
2. **`tool: "scene2d"` et le nom du dossier.** Question héritée de la spec de la cuve
   (sa question 1) : faut-il renommer `web/src/lib/scene3d/` (+ `scenes.json`) en
   `scene/` ? **Recommandation :** oui, mais dans un commit mécanique **séparé**,
   jamais dans celui de la scène — une porte verte sur un renommage est le seul moyen
   de savoir lequel des deux a cassé.
3. **Le onzième modèle de misconception** (§8.2) : ouvrir `photo-film-confondus`
   avec ses trois items, ou amender la `description` de `retard-relation-fausse` ?
   **Recommandation : ouvrir.** C'est le seul modèle du chapitre qui coche la bonne
   réponse **partout** dans le corpus actuel ; le fusionner, c'est garder le compteur
   aveugle. Décision humaine : elle touche l'inventaire et un `coverage_summary`
   généré.
4. **Le placement en tête de R3** (§3), qui fait ouvrir le chapitre par un
   manipulable et impose de donner $\tau = 0{,}30\ \text{s}$ comme une **mesure** de
   l'appareil avant que $\tau = d/v$ soit écrite. **Recommandation : garder.** C'est
   le seul placement qui laisse les cinq paris ouverts, et la `suite` de S1 fait
   **découvrir** la proportionnalité que la prose écrira dix lignes plus bas — ce qui
   est mieux que de la lire.
5. **L'exagération verticale $\times 20$ et le ralenti $\times 5$** (§6, §10.1-2) :
   deux déformations déclarées. **Recommandation : garder les deux**, avec l'encart à
   l'échelle vraie comme contrepartie. L'alternative (échelle vraie partout) rendrait
   la scène illisible ; l'alternative (temps réel) rendrait S1 illisible.
6. **Le cran de tension** (`tension`, $4{,}0 \to 8{,}0\ \text{m/s}$, §5.2) : il
   introduit « ce qui fixe $v$ » avant que la prose ne le dise, et il oblige à
   mentionner que la tension a été **quadruplée**. **Recommandation : garder**, avec
   la mention en consigne — sans lui, S5 n'a plus de pari qui ne soit déjà atteignable
   depuis S1 (§7.6).
7. **Une dette d'items voisine, à trancher dans la même passe ou pas.** La `REVIEW`
   signale qu'OMP-20 D porte une étiquette (`celerite-est-vitesse-point`) que son
   propre `feedback` contredit, et que la corriger ferait tomber cette famille sous le
   plancher. La scène la confronte (S3, S4) mais **ne la compte pas**.
   **Recommandation : commander un item de plus (OMP-25) sur
   `celerite-est-vitesse-point` dans la même passe** — c'est une commande distincte de
   la scène, mais c'est le moment où elle coûte le moins cher.
8. **La scène « ressort » (transversale / longitudinale), à ouvrir ou à classer**
   (§2.6). Quatre modèles déclarés de cette notion ne sont **jamais** confrontés, et
   deux d'entre eux (`confusion-transversale-longitudinale`, `son-nature`) tiennent à
   R2 et R4, qui n'ont **aucun** point d'arrêt. Ce n'est pas cette scène ; est-ce une
   prochaine ? **Recommandation : l'inscrire comme candidate**, pas la construire
   maintenant.
9. **Deux règles générales nées ici, à graver ou à garder en spec.** (a) *Une seconde
   voie **analytique** recalcule des **nombres** ; une **simulation** n'établit que des
   **invariants**.* (b) *Une **symétrie** du réglage d'une étape peut être la condition
   de non-fuite d'une étape suivante* (§2.3, `miroir-inerte`) — une forme de fuite que
   ni le manège ni la cuve n'avaient rencontrée, parce qu'elle ne passe ni par un
   affichage ni par un réglage, mais par **la donnée elle-même**. Méritent-elles un
   addendum à l'ADR 0041 ?
10. **Couper une étape ?** Si le propriétaire veut une scène à quatre étapes, la
    **coupable en premier est S4** (`le-meme-geste-en-plus-grand`) : son modèle
    (`celerite-depend-source`) est le mieux servi des quatre par les items (4) et par
    `cp-r3-celerite-vs-point` (choix D), et sa manœuvre survit dans la `suite` de S5.
    Je la garde par défaut, parce qu'elle est la moitié d'une ligne de TP du cadre
    (§2.5) — mais la décision est pédagogique.

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/ondes-mecaniques-progressives`
  passe — **ce qui suppose que `photo-film-confondus` soit déclaré dans `items.yaml`
  au moment où la scène est validée** (§8.2), sans quoi la scène part sur la voie de
  repli du §8.5.
- `node web/scripts/scene-corde.mjs --porte` : **toutes** les familles vertes, sur un
  rendu réel, relancé à quatre largeurs d'écran, **au moins deux fois**.
- `node web/scripts/scene-corde.mjs --essai-rouge` : **chaque** famille crie, avec le
  vert qui l'a précédée, même dossier, même commande ; et chaque sabotage ne fait
  rougir que la famille qui le garde (§11.4).
- `node web/scripts/resume-couverture.mjs` régénéré si §8.3 est appliqué ;
  `total_items` passe à **24**, `photo-film-confondus` à **3**.
- Les quatre retouches de prose du §4 sont posées **aux quatre ancres nommées**, et
  aucune ne précède le marqueur en répondant à un pari (§4, dernier paragraphe).
- `dette-manipulable` : **inchangée**. Cette scène ne solde rien — elle ne doit donc
  **pas** être comptée comme un paiement, et le cliquet ne bouge pas. *(Un cliquet
  qu'on desserre pour une scène qui n'acquittait aucune dette est un cliquet qui ment
  dans l'autre sens.)*
- La scène ne compte pour **livrée** que si elle est enregistrée dans `scenes.json`
  (ADR 0041 §3).
