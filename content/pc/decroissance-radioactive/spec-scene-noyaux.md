# Spec — manipulable 2D « la courbe et les noyaux » (`pc/decroissance-radioactive`)

**Objet :** une scène de première partie **en deux dimensions** (Canvas 2D, pas de
three.js) posée au **chapitre 5 = R4 « Activité, demi-vie et constante de temps »**.
Elle porte **deux appareils** : une **courbe de décroissance graduée en nombres** que
l'élève lit lui-même (curseur, crochet de demi-vie, bascule $N \leftrightarrow a$), et
une **grille de noyaux** dont chacun tire sa désintégration au sort en direct. La
première est **analytique** (nombres exacts) ; la seconde est **stochastique**
(invariants seulement).
**Statut :** spec pédagogique, **à valider par le propriétaire** (§13 : chaque question
porte sa réponse par défaut, chacune reste réversible).
**Date :** 2026-09-24. **Auteur :** pedagogy-architect.

Marqueur : `[[embed:courbe-et-noyaux]]` · clé de registre : `courbe-et-noyaux` ·
sélecteur de porte : `[data-scene="courbe-et-noyaux"]` · porte :
`web/scripts/scene-noyaux.mjs`.

---

## 0. Le classement — pourquoi cette notion, et pourquoi pas l'autre

`content/pc/decroissance-radioactive/` **ne porte aucun `spec.md`** (dossier listé :
`lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`,
`REVIEW-2026-09-11.md`). Aucune spec n'y a donc jamais prescrit d'`[[embed:]]` : cette
scène **ne solde aucune dette écrite** (`docs/audits/dette-manipulable-2026-09-20.md`
ne la nomme pas ; il ne reste d'ailleurs qu'une substitution, `lecture-Ve-courbe-dosage`,
`DECISIONS-EN-ATTENTE` §22). Elle doit donc se justifier **entièrement** par un trou
**mesuré** — DÉCISIONS §23. Voici les cinq candidats pesés, et la mesure de chacun.

| notion | poids cadre | annales **dédiées** (`docs/sujets/pc/CENSUS.md` §3) | trou MESURÉ, avec son fichier | manipulation ou vidéo ? |
|---|---|---|---|---|
| **`decroissance-radioactive`** | nucléaire **8 %** (rang 4 phys.) | **6** — 2019, 2021, 2022, 2023, 2024, 2025 N (+1 cross) : **le plus examiné des cinq** | `REVIEW-2026-09-11` fid-F3/F6 : *« application expérimentale = 0 % (mix ≈68/0/35), aucun item de lecture de courbe ; les questions "déterminer graphiquement" livrées SANS graphe »* · `exercises.yaml:118` remplace la courbe par une phrase qui **donne la réponse** de sa propre q2 · `media/decroissance-courbe.svg` n'a **aucune graduation chiffrée** (axes `N₀`, `N₀/2`, `t½`, `2t½`) · fid-F20 : `media/population-aleatoire.motion.json` montre **exactement** la moitié à chaque temps (64→32→16→8) · péd-F1 : *« le fait CENTRAL est asserté, jamais rupturé »* | **manipulation** : relancer donne un autre tirage ; déplacer l'instant de départ garde la même largeur ; agrandir la population rétrécit l'écart. Aucune vidéo ne fait les trois. |
| `ondes-em-modulation` | élec. **21 %** | 4 — 2017, 2021, 2023, 2025 N | `REVIEW-2026-09-12` : *« aucun des 24 items ne rend de figure, aucun n'exerce la lecture d'oscillogramme — geste exigé par 7 sujets réels sur 7 »* | oui — mais **bloqué** |
| `dipole-rl` | élec. **21 %** | 4 — 2017, 2020, 2023, 2024 N | `REVIEW-2026-09-12` F6 : *« la leçon travaille vers l'avant (R, L → τ) , les 10 sujets travaillent en arrière (lire la courbe → r, L) »* | oui — mais **déjà manipulé à côté** |
| `lois-de-newton` | méca. **27 %** (rang 1) | **1** (+1 incertain) — 2019 N | `REVIEW-2026-09-12` : *« trois savoir_faire du cadre ne sont couverts nulle part : la base de Freinet (grep ⇒ 0), le produit $\vec a\cdot\vec v$, les équations aux dimensions »* | oui, et c'est un très bon candidat |
| `etat-equilibre` | chimie **10 %** (rang 1 ex æquo) | 2 dédiés + 6 cross | `REVIEW-2026-09-12` §3.4 : *« Application expérimentale : 0 %, cible 15 % »* ; 4 figures étagées, 0 manipulable | moyen : $Q_r \to K$ se dit bien en figure étagée |

**Pourquoi la gagnante gagne.** Elle est la seule des cinq à cumuler les **quatre**
critères : (1) la fréquence d'examen la plus haute **mesurée dans le dépôt** — 6 annales
dédiées, six des sept sessions cartographiées ; (2) un trou qui n'est pas une absence
mais une **contradiction** — le seul média animé de la notion enseigne la lecture
*déterministe* (exactement la moitié, toujours) de la loi que la leçon appelle
*statistique*, et les deux sommets posent « déterminer graphiquement $t_{1/2}$ » sur une
courbe **qui n'existe pas** ; (3) la manipulation est irremplaçable — *relancer*,
*choisir son instant de départ*, *changer la taille de la population* sont trois gestes
qu'aucune image ni aucune vidéo ne rend ; (4) huit modèles déclarés de la notion sont
atteignables, dont les deux que la leçon assène sans les casser
(`noyau-vieillit`, `noyau-fraicheur-instable`).

**Pourquoi la dauphine perd.** `ondes-em-modulation` a le meilleur poids (21 %) et un
geste d'examen à 0 % — mais sa `REVIEW-2026-09-12` porte un **BLOQUANT owner non
tranché** qui vit exactement dans les nombres qu'une scène afficherait ($F_p = 2$ kHz
publié contre $1003 \pm 15$ Hz mesuré, *« 2 kHz est à 66 σ »*), **et** un conflit de
modèle non arbitré (*« dans le modèle de la leçon $U_0$ est l'amplitude de la porteuse ;
dans le modèle multiplieur c'est la composante continue… un élève fidèle à la leçon
calcule $m = S_m/P_m$ — faux »*). Une scène doit choisir $m = S_m/U_0$ **ou**
$m = S_m/P_m$ avant que le propriétaire l'ait fait : on bâtirait la porte sur le
désaccord. `dipole-rl` perd pour deux raisons : le produit **manipule déjà** la même
exponentielle à côté (`pc/rc-charge/rc-sandbox`, `pc/rlc-serie/rlc-sandbox`), et sa
notation est en arbitrage ouvert ($R$ = totale contre $R$ = conducteur), c'est-à-dire
que **chaque étiquette de la scène est en litige**. `lois-de-newton` est le meilleur
candidat **suivant** — deux savoir-faire à 0 % dans le sous-domaine le plus lourd — et
il est inscrit comme tel (§13, question 9).

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`transformations_nucleaires`** →
  **`decroissance_radioactive`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 99–123).
- **Poids :** `poids.part_examen: 8`, rang 4 de la physique. Habiletés du sous-domaine :
  **utilisation 4,0 %**, **application expérimentale 1,2 %**, **résolution de problème
  2,8 %** (le 50 / 15 / 35 de l'examen appliqué aux 8 %).
- **Savoir-faire que la scène sert** (cadre p. 6-7) :
  - « **Connaître et exploiter la loi de décroissance et sa courbe** ; savoir que
    1 Bq = 1 désintégration/s. » — **S1, S2, S4**. *C'est la ligne exacte que la notion
    n'exerce nulle part : sa `REVIEW` mesure l'application expérimentale à **0 %**.*
  - « **Définir $\tau$ et la demi-vie $t_{1/2}$ ; exploiter les relations entre $\tau$,
    $\lambda$, $t_{1/2}$** » — **S1, S5**.
  - « Connaître la signification du symbole … » et la stabilité : **hors scène**.
  - « Déterminer le radioélément convenable pour dater un événement » : **hors scène**
    (R5, après le marqueur).
- **`limites` portées en dur** (le bloc est écrit sous `masse_energie`, l. 136 ; la
  `REVIEW` fid-F16 signale que **c'est un défaut de rangement du cadre** et qu'il régit
  en réalité ce chapitre — je le porte donc ici sans le corriger dans le fichier) :
  - « **Loi $N(t) = N_0 e^{-\lambda t}$ exploitée ; on ne résout pas l'équation
    différentielle $dN/dt = -\lambda N$ au-delà de la connaissance de sa solution.** »
    → La scène **n'intègre rien**. Elle n'affiche que (a) la **forme fermée**
    $N(t) = N_0\,2^{-t/t_{1/2}}$ et (b) des **tirages de Bernoulli** indépendants, noyau
    par noyau, qui sont l'hypothèse du chapitre — pas un schéma numérique. Aucune
    méthode d'Euler, aucun « pas de calcul » affiché, aucun $dN/dt$ à l'écran (§9.1).
- **`exclusions` du sous-domaine portées en dur** (l. 142–146) : **filiations
  radioactives / équilibre séculaire** · **sections efficaces, neutronique** · **modèles
  nucléaires quantitatifs** · **physique des particules**.
  La première mord ici : la grille montre une case **éteinte**, jamais un noyau fils qui
  se désintégrerait à son tour. Une seule étape de désintégration, toujours (§9.2).
- **Frontière interne à la leçon, aussi dure que celle du cadre :** la scène est en tête
  de R4 ; elle **n'entre pas** dans R5 (datation) ni dans `noyaux-masse-energie`
  (défaut de masse, énergie de liaison, MeV, fission, fusion) — §9.

**Un point de cadre à dire franchement.** Le `savoir_faire` « connaître et exploiter la
loi de décroissance **et sa courbe** » exige une courbe **chiffrée** : une courbe sans
graduations ne se *lit* pas, elle s'illustre. Le corpus n'en possède aucune (§2.1). La
scène n'élargit donc pas le programme : elle rend enfin faisable une ligne imprimée.

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les cinq médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `vallee-stabilite` (3 ét.) | R1 | le diagramme (N, Z) | hors sujet ici |
| `desintegrations-nz` (3 ét.) | R2 | α, β⁻, β⁺, γ sur (N, Z) | hors sujet ici |
| `population-aleatoire.motion` (4 temps) | R3 | 64 noyaux, **exactement** 32 puis 16 puis 8 | **ne se relance pas** ; ne montre **aucune** fluctuation ; la moitié tombe juste à chaque temps — la loi y paraît **déterministe** (`REVIEW` fid-F20) |
| `decroissance-courbe` (3 ét.) | R4 | $N_0$, $N_0/2$, $N_0/4$, $N_0/8$ à $t_{1/2}$, $2t_{1/2}$, $3t_{1/2}$ | **aucune graduation chiffrée** (vérifié dans le SVG : les seuls textes d'axe sont `N`, `t`, `0`, `N₀`, `N₀/2`, `N₀/4`, `N₀/8`, `t½`, `2t½`, `3t½`) ; les repères partent **tous de l'origine** ; et la légende **dit** la conclusion (« à intervalles de temps toujours égaux ») au lieu de la faire trouver |
| `tangente-tau` (3 ét.) | R4 | la tangente à l'origine coupe en $\tau$ ; 37 % à $\tau$ | la construction n'est enseignée **qu'en légende** (`REVIEW` péd-F13/14) ; rien à lire soi-même |
| `datation-c14` (3 ét.) | R5 | le report horizontal puis vertical | chapitre suivant |

**Ce que les cinq ont en commun, et c'est le trou : aucune n'est LUE par l'élève.**
Chacune porte une légende qui commence par « **La lecture :** … » et qui donne le
résultat. Or l'examen, lui, demande le geste :

- `docs/sujets/pc/decroissance-radioactive.md` l. 97, **2021 N Ex III** (fichier ouvert) :
  « **(0,5) Déterminer graphiquement la demi-vie $t_{1/2}$ du plutonium 238.** » — sur une
  **courbe d'activité** $a(t)$ ;
- même fichier l. 375, **2022 N Ex 2 P2** : « **3.1. (0,25) Déterminer graphiquement la
  demi-vie $t_{1/2}$ de l'iode 131.** »

Et voici comment le dépôt les livre aujourd'hui :

- `exercises.yaml` en-tête l. 22 : « **La figure (courbe $a(t)$ en Bq) est transcrite EN
  TEXTE dans l'intro** — pas de `[[figure:]]` orpheline » ;
- `exercises.yaml:118` (la variation fraîche) : « *La courbe part de $A_0$ à $t = 0$ et
  décroît exponentiellement ; **on lit que l'activité tombe à sa moitié,
  $A_0/2 = 2{,}0\times10^{8}$ Bq, à la date $t = 8$ jours**.* » — puis q2 (l. 136)
  demande « **Déterminer la demi-vie de l'iode 131 à partir de la courbe** », et son
  `reasoning` (l. 138) répond : « *L'énoncé indique que $A$ passe de $A_0$ à $A_0/2$ à la
  date $t = 8$ jours — **cette date EST la demi-vie**.* »

**La question de lecture graphique la plus fréquente du chapitre est posée, et sa réponse
est écrite trois lignes au-dessus.** Ce n'est pas une négligence d'auteur : c'est ce que
la `REVIEW` a nommé (« ne sont pas attaquables ») et renvoyé — *« → figure codée
(diagram-author) + items »*. Une figure codée règlerait la moitié du problème (il y aurait
une courbe) ; elle ne réglerait pas l'autre — **une figure ne se lit pas, elle se
regarde**. Le geste de bac est : *poser l'ordonnée moitié, rejoindre la courbe,
redescendre sur l'axe des temps*. Il se pratique avec un curseur.

### 2.2 Le motif central : une LARGEUR qui ne bouge pas

Le point que la scène existe pour installer :

> Le crochet qui mesure une demi-vie garde **exactement la même largeur** où qu'on le
> pose sur la courbe. Sa hauteur s'effondre — de $4{,}0\times10^{14}$ à
> $5{,}0\times10^{13}$ noyaux — et sa largeur ne bouge pas d'un pixel : $8{,}0$ jours,
> aux vingt-cinq positions.

C'est la conséquence **chiffrée** de la phrase que R3 assène (« sans mémoire ») et que R4
répète en une ligne (`lesson.md:260` : « quel que soit l'instant de départ choisi, il
reste $N_0/2^n$ »). Un crochet fixe qui glisse sur une courbe qui s'écrase : **c'est
exactement ce qu'une figure ne peut pas montrer et qu'un curseur montre en trois
secondes.** Et la porte le mesure en pixels, dans les deux sens (§11.2,
`crochet-invariant`).

### 2.3 L'antidote obligatoire : S1 installe, S2 borne

Même structure que la corde (S1 le film, S2 la photo) et que la cuve (S1 la fente, S2 la
longueur d'onde) :

- **S1** installe, honnêtement, le geste de lecture : *« on repère l'ordonnée moitié, on
  rejoint la courbe, on redescend »* — vrai, et c'est la ligne du cadre.
- **S2** casse la généralisation silencieuse : *« …parce que c'est le début de la
  courbe »*. Non : la même largeur se lit de n'importe où.

**Condition technique non négociable de l'enchaînement :** la fenêtre de S1 s'arrête à
**10 jours** — la courbe elle-même n'est tracée que jusqu'à 10 j et le curseur ne va pas
plus loin. Sans cela, un élève qui promène le curseur en S1 lit $N(16) = 1{,}0\times10^{14}$
et $N(24) = 5{,}0\times10^{13}$, **c'est-à-dire la réponse du pari de S2**. C'est une
contrainte de fuite inter-étapes (§7.6), pas un choix de cadrage, et la porte la mesure
(§11.2, `fenetre-s1`).

### 2.4 La population comptable — ce que le média animé de R3 dit à l'envers

`population-aleatoire.motion.json` fait passer 64 noyaux à 32, puis 16, puis 8 — **la
moitié exacte à chaque temps**, et sa légende conclut : « *les survivants ne sont pas
usés* ». La conclusion est juste ; **l'image dit le contraire de ce que la leçon
enseigne** : une loi qui tombe juste au noyau près n'est pas une loi statistique, c'est
une horloge. La `REVIEW` l'a relevé (fid-F20) sans le corriger, parce qu'un média étagé
ne peut pas faire autrement : **une image ne se relance pas.**

S3 est la réparation, et elle tient en un geste : **relancer**. À 64 noyaux, on obtient
29, puis 35, puis 31 — jamais deux fois les mêmes cases, jamais deux fois le même nombre,
et toujours autour de 32. Puis on monte à 256, à 1024, et l'écart relatif se resserre
comme $1/\sqrt{N_0}$ (§5.4). C'est **le mécanisme rendu évident** que R3 promet en prose
(« de l'hypothèse statistique à la loi de décroissance ») : une seule hypothèse posée
sur un seul noyau, et la courbe des étapes 1 et 2 **sort toute seule** de la foule.

### 2.5 Trois idées volontairement écartées

- **La tangente à l'origine, ÉCARTÉE comme étape.** `tangente-tau` la montre déjà, et la
  `REVIEW` demande surtout qu'elle soit *enseignée ailleurs qu'en légende* — c'est un
  travail de prose (§4.3), pas une étape. Elle survit comme **distracteur** de S1 (le
  choix `tangente`, qui donne $\tau = 11{,}5$ j au lieu de $t_{1/2} = 8{,}0$ j) et comme
  **lecture** de S5. *Écrit à côté de ce qui est armé, ADR 0035.*
- **L'influence de la température, ÉCARTÉE — et c'est une question d'honnêteté, pas de
  place.** `lambda-depend-conditions-externes` est le modèle le **plus servi** de la
  notion (12 items, 4 checkpoints sur 5). Un pari « chauffe l'échantillon » serait
  pourtant **malhonnête** : la scène ne simule aucune thermique, elle ne ferait
  qu'afficher par décret ce qu'on lui a demandé d'afficher. *Une scène ne doit jamais
  « montrer » un résultat qu'elle n'a aucun mécanisme pour produire.* La scène ne
  confronte donc **pas** ce modèle, et il faut le dire plutôt que de le laisser croire.
- **La semi-log / linéarisation $\ln N$ contre $t$, ÉCARTÉE par le cadre.** Aucun
  `savoir_faire` ne la nomme ; chaîne interdite dans le panneau (§9.6).

---

## 3. Placement

**Chapitre 5 de la leçon rendue = `## R4 — Activité, demi-vie et constante de temps`
(`lesson.md:220`), tout en tête**, entre le titre et
`### L'activité : ce que mesure vraiment un détecteur` (`lesson.md:222`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:courbe-et-noyaux]]
```

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose
qui explique*). Chaque sous-section de R4 répond à un pari :

| étape | la prose (ou le point d'arrêt) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| S1 — où lire $t_{1/2}$ | « La demi-vie $t_{1/2}$ » + la définition | R4, `:238-240` | ❌ non |
| S2 — la largeur invariante | « quel que soit l'instant de départ choisi, il reste $N_0/2^n$ » | R4, `:260` | ❌ non |
| S3 — la loi de population | « la loi statistique s'applique dès qu'on a assez de noyaux pour que les fluctuations s'effacent » | R3, `:208` — **⚠ AVANT le marqueur** (voir ci-dessous) | ⚠ à moitié |
| S4 — $N$ contre $a$ | « L'activité… $A(t) = \lambda N(t)$ » + `cp-r4-activite-noyaux` | R4, `:224-236` | ❌ non |
| S5 — $\lambda$ double | « $t_{1/2} = \ln 2/\lambda$ », « $\tau = 1/\lambda$ » + `cp-r4-demi-vie-lambda` | R4, `:258-274` | ❌ non |

**Le seul placement qui laisse quatre paris entiers et le cinquième ouvert est la tête du
chapitre 5.** Les trois points d'arrêt qui reprennent la scène (`cp-r4-activite-noyaux`,
`cp-r4-demi-vie-lambda`) sont **après** le marqueur : c'est le bon sens — le point d'arrêt
devient la reprise de ce que la scène a montré.

**Les deux tensions réelles, écrites plutôt que maquillées.**

1. **R3 énonce le principe que S2 fait chiffrer.** `lesson.md:150-152` écrit « sans
   mémoire » et nomme le modèle de l'ampoule ; `cp-r0-predict` fait même **s'engager**
   l'élève dessus dès R0. S2 ne re-pose donc **pas** le principe : elle demande une
   **durée**, que rien n'a écrite avant le marqueur (le mot « demi-vie » n'est
   *nommé* qu'en passant, `:206`, « on définit précisément ce terme au chapitre
   suivant », et jamais défini). C'est pourquoi S2 porte **quatre** choix dont deux
   prédisent « plus long » et un donne un **nombre** ($\approx 6$ jours) : un élève qui a
   retenu la phrase de R3 sans l'avoir comprise tombe encore, parce que le piège est
   **arithmétique** (« il part quatre fois moins de noyaux par jour, donc il faut plus
   longtemps ») et non verbal.
2. **`lesson.md:208` dit déjà « dès qu'on a assez de noyaux pour que les fluctuations
   individuelles s'effacent ».** C'est la phrase de S3 — asséné en incise, jamais montré,
   et **contredit par l'image qui la suit trente lignes plus haut** (§2.4). S3 la met à
   l'épreuve au lieu de la répéter : le pari ne porte pas sur « y a-t-il des
   fluctuations ? » mais sur **ce qu'on obtiendra**, et le distracteur « exactement 32 »
   est précisément ce que le média animé de R3 a montré à l'élève quinze minutes plus tôt.
   *La scène corrige un média du produit, ce qui est la meilleure raison de la placer
   après lui.*

---

## 4. Les retouches de prose (texte prêt à insérer)

**Interdit dans ces retouches :** ne rien écrire, **avant** le marqueur, qui réponde à un
pari (§7.6). 4.1 est **avant** et strictement neutre ; 4.2 à 4.4 sont **après**.

### 4.1 Le paragraphe d'annonce, juste avant le marqueur

*À insérer après le titre `## R4 — Activité, demi-vie et constante de temps`
(`lesson.md:220`), suivi de la ligne du marqueur, le tout avant `### L'activité…`
(`lesson.md:222`).*

> Avant de lire ce chapitre, va le chercher. Ci-dessous, deux appareils et un seul
> échantillon d'iode 131 — le même que celui de l'exercice qui clôt cette leçon :
> $N_0 = 4{,}0\times10^{14}$ noyaux à l'instant $0$. Le premier appareil est une
> **courbe graduée** : le nombre de noyaux qui n'ont pas encore désintégré, jour après
> jour, avec un curseur que tu déplaces et des graduations que tu lis toi-même. Le second
> est une **grille** : quelques dizaines de noyaux, un par case, chacun tirant sa
> désintégration au sort sous tes yeux — parce qu'on ne peut pas dessiner
> $4{,}0\times10^{14}$ cases. Tu paries d'abord, les appareils répondent ensuite.

*(Neutre exprès : elle décrit les deux appareils et donne $N_0$. Elle ne dit ni ce qu'est
une demi-vie, ni où on la lit, ni ce que compte un détecteur, ni ce qui arrive quand on
change de population.)*

### 4.2 La phrase de `:260` gagne son geste

*À insérer dans « La demi-vie $t_{1/2}$ », après le paragraphe encadré « **Une propriété
qu'il faut retenir précisément…** » (`lesson.md:260`) et **avant**
`[[figure:decroissance-courbe]]` (`lesson.md:262`).*

> Et voici le geste qui le rend visible, celui que tu viens de faire. Prends un crochet
> dont la pointe gauche se pose sur la courbe et dont la pointe droite se pose là où il
> ne reste que la moitié de ce que la gauche indiquait. Pose-le à $t = 0$ : il mesure
> $8{,}0$ jours. Pose-le à $t = 16$ jours, où il ne reste plus qu'un quart de
> l'échantillon : il mesure encore $8{,}0$ jours. Sa **hauteur** s'effondre à chaque fois
> qu'on le déplace vers la droite ; sa **largeur** ne bouge jamais. C'est cela, « sans
> mémoire », traduit en une durée : l'horloge de la demi-vie repart à zéro à chaque
> instant où tu décides de la regarder, parce qu'aucun noyau ne sait depuis combien de
> temps il existe.

### 4.3 La construction de la tangente sort de la légende

*À insérer dans « La constante de temps $\tau$ », après « **La demi-vie est donc plus
courte que la constante de temps…** » (`lesson.md:270`) et **avant**
`[[figure:tangente-tau]]` (`lesson.md:272`).*

> La construction, en trois gestes, parce qu'un sujet peut la demander : on trace la
> **tangente à la courbe au point de départ** ; on suit cette droite jusqu'à ce qu'elle
> coupe l'**axe des temps** ; l'abscisse de ce point est $\tau$. Ne confonds pas les deux
> lectures : la **demi-vie** se lit à l'**ordonnée moitié** (on part de l'axe vertical),
> la **constante de temps** se lit **au bout de la tangente** (on part de la courbe). Sur
> l'iode 131, cela donne $t_{1/2} = 8{,}0$ jours et $\tau = 11{,}5$ jours : deux durées
> différentes, sur la même courbe, séparées par le facteur $\ln 2 \approx 0{,}693$.

### 4.4 Le récapitulatif express (R6)

*Dans le récapitulatif de R6, **ajouter une puce** :*

> - Sur une courbe, la demi-vie est une **largeur**, et cette largeur est la même où
>   qu'on la mesure : de $N_0$ à $N_0/2$, ou de $N_0/4$ à $N_0/8$. Elle se lit aussi bien
>   sur une courbe d'**activité** que sur une courbe de **noyaux** — $a = \lambda N$ ne
>   fait que changer les graduations, jamais les instants. Et $t_{1/2}$ n'est ni
>   $\lambda$, ni $1/\lambda$ : $t_{1/2} = \ln 2/\lambda = \tau \ln 2$.

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Les constantes — toutes tirées de la leçon, aucune inventée

`exercises.yaml` (r-variation, la variation fraîche de cette notion) porte **exactement**
ces nombres : `:118` donne $A_0 = 4{,}0\times10^{8}$ Bq et $t_{1/2} = 8$ jours ; `:161`
écrit $N_0 = \frac{4{,}0\times10^{8}}{1{,}00\times10^{-6}} \approx 4{,}0\times10^{14}$
noyaux. L'élève qui refait l'exercice retrouve, chiffre pour chiffre, l'échantillon qu'il
a manipulé. (ADR 0041 §5 — et ici c'est gratuit : les nombres existaient déjà.)

| grandeur | valeur | arithmétique (vérifiée) |
|---|---|---|
| échantillon | **iode 131**, $N_0 = 4{,}0\times10^{14}$ noyaux | `exercises.yaml:161` |
| demi-vie A | $t_{1/2} = \mathbf{8{,}0}$ **jours** | `lesson.md:278`, `exercises.yaml:140` |
| $\lambda_A$ | $\mathbf{0{,}0866}\ \text{j}^{-1}$ | $\ln 2 / 8{,}0 = 0{,}693147/8 = 0{,}0866434$ |
| $\lambda_A$ en s⁻¹ | $\mathbf{1{,}00\times10^{-6}}\ \text{s}^{-1}$ | $0{,}0866434/86\,400 = 1{,}00282\times10^{-6}$ — la valeur que `exercises.yaml:161` emploie |
| $\tau_A$ | $\mathbf{11{,}5}$ **j** | $1/0{,}0866434 = 11{,}5416$ ; contrôle : $11{,}5416 \times 0{,}693147 = 8{,}0000 = t_{1/2}$ ✓ |
| $a_0$ | $\mathbf{4{,}0\times10^{8}}$ **Bq** | $1{,}00282\times10^{-6} \times 4{,}0\times10^{14} = 4{,}011\times10^{8}$ → 2 c.s. |
| demi-vie B | $t_{1/2} = \mathbf{4{,}0}$ **j** | échantillon du **second isotope**, S5 |
| $\lambda_B$ | $\mathbf{0{,}173}\ \text{j}^{-1}$ | $\ln 2/4{,}0 = 0{,}173287 = \mathbf{2\lambda_A}$ **exactement** |
| $\tau_B$ | $\mathbf{5{,}77}$ **j** | $1/0{,}173287 = 5{,}7708$ |
| $a_{0,B}$ | $\mathbf{8{,}0\times10^{8}}$ **Bq** | $2{,}00563\times10^{-6} \times 4{,}0\times10^{14} = 8{,}022\times10^{8}$ |
| populations comptables | **64** · **256** · **1024** | $8\times8$, $16\times16$, $32\times32$ |
| pas de temps du modèle | $\Delta t = \mathbf{0{,}25}$ **jour** | divise **exactement** $8{,}0$ (32 pas), $4{,}0$ (16 pas), le pas de `depart` (4 pas) et celui de `instant` (2 pas) |

Valeurs de la courbe A aux repères — toutes **exactes** :

| $t$ (j) | 0 | 4,0 | **8,0** | 11,5 ($\approx\tau$) | **16** | **24** | **32** |
|---|---|---|---|---|---|---|---|
| $N$ | $4{,}0\times10^{14}$ | $2{,}83\times10^{14}$ | $\mathbf{2{,}0\times10^{14}}$ | $1{,}47\times10^{14}$ | $1{,}0\times10^{14}$ | $5{,}0\times10^{13}$ | $2{,}5\times10^{13}$ |
| $N/N_0$ | 100 % | 70,7 % | **50,0 %** | 36,8 % | 25,0 % | 12,5 % | 6,25 % |
| $a$ (Bq) | $4{,}0\times10^{8}$ | $2{,}83\times10^{8}$ | $\mathbf{2{,}0\times10^{8}}$ | $1{,}47\times10^{8}$ | $1{,}0\times10^{8}$ | $5{,}0\times10^{7}$ | $2{,}5\times10^{7}$ |

*($2^{-0{,}5} = 0{,}70711$ ; $e^{-1} = 0{,}36788$ — le « environ 37 % » de `lesson.md:270`.)*

### 5.2 Les deux voies de calcul, et pourquoi elles cohabitent

**Voie 1 — la COURBE est analytique.** $N(t) = N_0\,2^{-t/t_{1/2}}$, forme fermée. Aucun
solveur, aucune grille temporelle, **aucune erreur** : les lectures sont exactes, et la
porte peut **recalculer les nombres** par une seconde implémentation (§11.1).

**Voie 2 — la GRILLE est stochastique.** Chaque noyau encore présent tire, à chaque pas
$\Delta t = 0{,}25$ j, sa désintégration avec la probabilité

$$p = 1 - e^{-\lambda\,\Delta t}$$

— **jamais** $\lambda\,\Delta t$ (§11.4, sabotage n°1). Vérification :
$\lambda_A \Delta t = 0{,}0216609$, donc $p_A = 1 - e^{-0{,}0216609} = 0{,}0214279$ ; et
$(1-p_A)^{32} = e^{-32 \times 0{,}0216609} = e^{-0{,}693147} = \mathbf{0{,}500000}$ —
**exactement** une demi-vie en 32 pas. Pour B : $p_B = 1 - e^{-0{,}0433217} = 0{,}0423967$
et $(1-p_B)^{16} = e^{-0{,}693147} = 0{,}5$ ✓.

**Conséquence, et c'est une règle neuve (§13, question 8) :** *une scène peut porter les
deux voies, à condition que **chaque lecture déclare de laquelle elle vient**, et que la
porte applique à chacune sa propre exigence* — nombres exacts recalculés pour
l'analytique (règle de la corde), **invariants seulement** pour la simulation (règle de
la cuve). Concrètement : `noyaux`, `activite`, `demi-vie`, `duree-de-moitie`, `lambda`,
`tau` viennent de la **loi** ; `restants-comptes` et `ecart-relatif` viennent du
**tirage**, et l'écran les distingue par leur libellé (« la loi prévoit » / « on compte »).

### 5.3 Contrôles (5) — un neuf par étape

| id | ce qu'il règle | valeurs / bornes | pas | ouvert par |
|---|---|---|---|---|
| `instant` | $t$, le curseur de lecture sur la courbe | $[0\ ;\ 10]$ j | **0,5 j** | **S1**, S5 |
| `depart` | $t_1$, l'instant où se pose la pointe gauche du crochet | $[0\ ;\ 24]$ j | **1,0 j** | **S2**, S5 |
| `population` | $N_0$ de l'échantillon **comptable** | `64` · `256` · `1024` | — | **S3**, S5 |
| `grandeur` | ce que porte l'axe vertical | `noyaux` · `activite` | — | **S4**, S5 |
| `isotope` | la demi-vie de l'échantillon, en jours | `8` · `4` | — | **S5** |

**Le pas est un choix pédagogique (ADR 0041 §5), et ici il est arithmétique.**

- `depart` au pas de $1{,}0$ j sur $[0\ ;\ 24]$ : **25 positions**, et
  $\text{depart} + 8{,}0 \le 32$ à toutes — la pointe droite du crochet ne sort jamais de
  l'axe. À chacune, `duree-de-moitie` affiche **8,0 j**, *exactement*, parce que
  $N(t_1+8)/N(t_1) = 2^{-1}$ ne dépend pas de $t_1$. C'est l'invariant le plus fort que
  la scène puisse offrir, et la porte le lit par **égalité de chaîne** aux 25 positions.
- `instant` au pas de $0{,}5$ j : la lecture change de $2^{-0{,}0625} = 0{,}9576$ d'un cran
  à l'autre, soit $-4{,}24\ \%$ — **jamais deux positions n'affichent la même valeur à
  3 chiffres significatifs** (c'est le défaut de l'orbite, « douze positions affichant
  24,0 h », qu'on ne veut pas reproduire).
- $\Delta t = 0{,}25$ j divise exactement $1{,}0$ ; $0{,}5$ ; $4{,}0$ et $8{,}0$ : **toute
  position de contrôle tombe sur un pas de simulation**, sans interpolation.

**Bornes de `instant` : $[0\ ;\ 10]$ j PARTOUT, y compris en S5.** Ce n'est pas une
restriction d'étape (que le registre ne saurait pas exprimer) mais une borne globale,
justifiée par l'appareil : *l'enregistrement fin ne couvre que les dix premiers jours*.
C'est ce qui rend la non-fuite S1 → S2 **structurelle** plutôt que déclarative (§7.6). Ce
qu'on perd : en S5, la lecture au curseur ne va pas au-delà de 10 j — `depart` (jusqu'à
24 j) et le crochet couvrent le reste. *Question 2 du §13.*

### 5.4 État (6 clés)

`t_demi_j` (`8` | `4`), `instant_j`, `depart_j`, `population_n`, `grandeur`,
`support` (`courbe` | `grille`) — plus `fenetre_j` (`10` | `32`), **sans contrôle**.

Deux clés posées par l'étape, sans contrôle (précédents : `vue` et `reference` dans la
corde, `occupants` dans le manège) :

- **`support`** décide quel **appareil existe dans le DOM** : la courbe graduée (S1, S2,
  S4, S5) ou la grille de noyaux (S3, et S5 en second plateau). C'est l'outil principal
  de non-fuite : **on ne peut pas répondre au pari de la grille depuis une étape qui n'a
  pas de grille.**
- **`fenetre_j`** décide jusqu'où **la courbe est tracée et l'axe gradué** : 10 jours en
  S1, 32 jours ensuite. C'est la condition du §2.3.

### 5.5 Lectures — définitions exactes, voie, unité, précision

| id | ce qui s'affiche | voie | unité | précision | justification |
|---|---|---|---|---|---|
| `instant` | $t$ du curseur | — | j | 1 déc. | pas de 0,5 j : exact |
| `noyaux` | $N(t)$ **prévu par la loi** | loi | noyaux | 2 c.s. | la donnée $N_0$ est à 2 c.s. |
| `activite` | $a(t) = \lambda N(t)$ | loi | Bq | 2 c.s. | $a_0 = 4{,}0\times10^{8}$, donnée de `exercises.yaml` |
| `fraction` | $N(t)/N_0$ | loi | % | 1 déc. | 100,0 · 70,7 · 50,0 · 25,0 · 12,5 · 6,3 |
| `depart` | $t_1$ | — | j | 1 déc. | pas de 1,0 j |
| `restants-depart` | $N(t_1)$ | loi | noyaux | 2 c.s. | |
| `duree-de-moitie` | la durée pour passer de $N(t_1)$ à $N(t_1)/2$ | loi | j | **1 déc.** | **8,0 aux 25 positions ; 4,0 sur l'isotope B** — c'est une RÉPONSE, jamais visible avant le pari de S2 |
| `demi-vie` | $t_{1/2}$ de l'échantillon | loi | j | 1 déc. | 8,0 · 4,0 — **réponse** en S1 |
| `lambda` | $\lambda = \ln 2/t_{1/2}$, en $\text{j}^{-1}$ **et** en $\text{s}^{-1}$ | loi | — | 3 c.s. | 0,0866 j⁻¹ / 1,00×10⁻⁶ s⁻¹ |
| `tau` | $\tau = 1/\lambda$ | loi | j | 3 c.s. | 11,5 · 5,77 — **S5 seulement** |
| `population` | $N_0$ de l'échantillon comptable | — | noyaux | entier | 64 · 256 · 1024 |
| `restants-comptes` | noyaux **encore allumés** dans la grille | **tirage** | noyaux | entier | c'est un **comptage** : exact par nature |
| `ecart-relatif` | $\lvert$comptés $-$ prévus$\rvert$ / prévus | **tirage** | % | 1 déc. | varie d'une course à l'autre, et c'est le propos |

> **La précision est ici l'inverse du problème de l'orbite.** L'orbite devait *augmenter*
> sa précision pour qu'une seule position du curseur coche la condition ; la courbe, elle,
> est analytique et pourrait afficher dix chiffres. Le danger est symétrique : afficher
> $4{,}011\times10^{8}$ Bq ferait croire à une mesure là où il n'y a qu'un produit de deux
> données à 2 et 3 chiffres. **Règle : les lectures gardent la précision des données de la
> leçon, jamais plus.** Et la lecture `restants-comptes`, qui est un vrai comptage, est
> entière — c'est la seule de la scène qui n'a pas de chiffres significatifs, parce qu'un
> noyau ne se compte pas à 2 c.s.

**La fluctuation, chiffrée.** À une demi-vie, le nombre restant suit une binomiale
$\mathcal{B}(N_0, 1/2)$ : moyenne $N_0/2$, écart-type $\sqrt{N_0}/2$. L'écart **relatif**
vaut donc $\dfrac{\sqrt{N_0}/2}{N_0/2} = \dfrac{1}{\sqrt{N_0}}$ :

| $N_0$ | 64 | 256 | 1024 | $4{,}0\times10^{14}$ |
|---|---|---|---|---|
| moyenne à $t_{1/2}$ | 32 | 128 | 512 | $2{,}0\times10^{14}$ |
| écart-type | 4 | 8 | 16 | $1{,}0\times10^{7}$ |
| **écart relatif $1/\sqrt{N_0}$** | **12,5 %** | **6,25 %** | **3,125 %** | **$5{,}0\times10^{-8}$** |

**Multiplier la population par 4 divise l'écart relatif par 2** — exact, et c'est la
`suite` de S3. Et $\sqrt{4{,}0\times10^{14}} = 2{,}0\times10^{7}$ : sur l'échantillon réel,
l'écart relatif vaut cinq cent-millionièmes, **c'est pourquoi la courbe des étapes 1 et 2
est lisse**. La boucle se referme.

---

## 6. La course, et la langue visuelle

- **Une seule étape a une course : S3.** Les quatre autres lisent un **document** (la
  courbe est donnée, comme au bac) : le verdict est immédiat, la construction se dessine,
  rien ne bouge. La course de S3 va de $0$ à $16$ jours — **deux** demi-vies.
- **L'échelle de temps est déclarée : 1 jour d'échantillon = 0,25 seconde à l'écran**,
  donc la course dure **4,0 s**. Écrite sur la scène (`data-facteur-temps`) et **mesurée
  contre l'horloge**, jamais contre le nombre de pas demandés (leçon n°6 de la porte de la
  cuve).
- **Fin de course : la scène se fige et l'écrit** — « image arrêtée à 16 jours ; les
  noyaux restants continueraient de partir, un par un ».
- **Aucune case ne se rallume, jamais.** Une case éteinte est un noyau désintégré : l'état
  est irréversible dans la course. C'est à la fois la physique et la condition du critère
  des éclairs (§11.3, `eclairs`).
- **Le critère des éclairs (WCAG 2.3.1) est structurellement satisfait, et mesuré quand
  même.** Chaque case change d'état **au plus une fois** par course ; il n'existe donc
  aucune paire de variations opposées dans une même région — contrairement à la cuve, dont
  l'onde inversait chaque point huit fois par seconde. *Une chose n'est prouvée absente que
  si l'on a énuméré ses formes* (ADR 0036) : la porte le mesure.
- **Mouvement réduit honoré :** la scène **calcule sans animer** et montre l'image finale ;
  un bouton « Image finale » existe pour tous.
- **Aucune trace entre étapes**, aucune course conservée.

**La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4).**

- **À l'ENCRE — c'est l'ÉNONCÉ** : les axes et leurs graduations chiffrées, **la courbe
  elle-même** (c'est le document que le sujet fournit), le repère $N_0$, la grille de
  cases au départ, le curseur au repos. *Corollaire du manège : une donnée de l'énoncé ne
  se peint pas dans la couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : la construction de lecture (le guide
  horizontal depuis l'ordonnée moitié, le guide vertical, le tick sur l'axe des temps), le
  **crochet** de S2 et sa cote, les cases **éteintes** de S3, le second tracé de S5.
- **Une case éteinte ne disparaît pas : elle change de traitement** (contour conservé,
  intérieur vidé). Une case qui s'efface ferait croire que le noyau a quitté l'échantillon
  — il est toujours là, c'est un autre noyau.
- **Aucun mouvement hors course.** La courbe ne respire pas, rien ne pulse, rien ne
  clignote.
- **Les échelles sont linéaires**, les deux axes, toujours (§9.6).

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant que l'élève
n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce qui dépend de l'ISSUE
attend la révélation*).

### 7.1 S1 — `ou-lire-la-demi-vie` · « Où se lit la demi-vie »

- **État :** `t_demi_j: "8"`, `support: "courbe"`, `fenetre_j: 10`, `grandeur: "noyaux"`,
  `instant_j: 0`, `depart_j: 0`.
- **Contrôle ouvert :** `instant` (**neuf**). **Lectures :** `instant`, `noyaux`,
  `fraction` — et `demi-vie` **après révélation seulement**.
- **Pas de course** : verdict immédiat, puis la construction se dessine.
- **Consigne (voix) :** « Un échantillon d'iode 131, préparé à l'instant zéro : il contient
  $4{,}0\times10^{14}$ noyaux radioactifs. Un appareil a enregistré pendant dix jours le
  nombre de noyaux qui n'ont **pas encore** désintégré, et voici sa courbe. En abscisse, le
  temps en jours ; en ordonnée, le nombre de noyaux, gradué. On appelle **demi-vie** la
  durée au bout de laquelle il n'en reste plus que la moitié. Un curseur te laisse lire la
  courbe point par point. »
- **Pari :** « Pour lire cette demi-vie sur la courbe, il faut… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `ordonnee-moitie` | repérer sur l'axe vertical la moitié de $4{,}0\times10^{14}$, soit $2{,}0\times10^{14}$, rejoindre la courbe horizontalement, puis redescendre sur l'axe des temps | **oui** | — | « Oui — et c'est le geste exact que demandent les sujets : *« déterminer graphiquement la demi-vie »*. Trois mouvements, dans cet ordre. **Un :** l'ordonnée moitié, $2{,}0\times10^{14}$ — on part de l'axe **vertical**, pas de la courbe. **Deux :** on rejoint la courbe à l'horizontale. **Trois :** on redescend à la verticale et on lit $8{,}0$ jours. Retiens que la demi-vie est une **abscisse** qu'on obtient en partant d'une **ordonnée** : c'est pour ça qu'on la lit toujours en deux temps. » |
| `zero-de-la-courbe` | chercher l'instant où la courbe touche l'axe des temps — là où l'échantillon a fini de se désintégrer — et en prendre la moitié | non | **`demi-vie-egale-duree-de-vie-totale`** | « Promène le curseur jusqu'au bout de l'enregistrement et regarde la lecture : à dix jours, il reste encore $1{,}68\times10^{14}$ noyaux, 42 % du départ. Cette courbe ne touche l'axe **nulle part** : à chaque jour qui passe, ce qui reste est **divisé** par quelque chose, jamais **retranché** — et une division ne donne jamais zéro. Il n'existe donc pas d'instant « où c'est fini », et la demi-vie ne peut pas en être la moitié. » |
| `moitie-du-temps` | prendre la moitié de la durée enregistrée : l'appareil a tourné dix jours, la demi-vie est donc de cinq jours | non | **`demi-vie-egale-duree-de-vie-totale`** *(forme « la moitié du temps »)* | « Pose le curseur à cinq jours : il reste $2{,}59\times10^{14}$ noyaux, soit **65 %** — pas la moitié. Et vérifie le raisonnement lui-même : si on avait arrêté l'appareil à six jours, ta méthode donnerait trois jours ; à vingt jours, dix. La demi-vie changerait avec la durée du branchement, ce qui n'a aucun sens — c'est une propriété de l'iode 131, pas de l'appareil. La moitié dont il est question est une moitié de **noyaux**, jamais de durée. » |
| `tangente` | tracer la tangente à la courbe au départ et lire où elle coupe l'axe des temps | non | **`confond-demi-vie-constante-lambda`** | « Cette construction existe, elle est juste, et elle donne **autre chose** : la tangente au départ coupe l'axe à $\tau = 11{,}5$ jours, la **constante de temps**. La demi-vie vaut $8{,}0$ jours. Les deux se lisent sur la même courbe et ne sont pas la même durée : $t_{1/2} = \tau \ln 2 \approx 0{,}693\,\tau$. Le chapitre te montrera la construction de $\tau$ ; retiens surtout le départ de chacune — la demi-vie part de l'**ordonnée moitié**, $\tau$ part de la **courbe**. » |

*(Arithmétique des trois retours, vérifiée. `zero-de-la-courbe` :
$N(10) = 4{,}0\times10^{14} \times 2^{-1{,}25} = 4{,}0\times10^{14} \times 0{,}42045
= 1{,}68\times10^{14}$, soit **42,0 %**. `moitie-du-temps` :
$2^{-5/8} = 2^{-0{,}625} = 0{,}64842$, donc $2{,}59\times10^{14}$, soit **64,8 %** →
affiché 65 %. `tangente` : $\tau = 1/0{,}0866434 = 11{,}5416$ → **11,5 j**, et
$8{,}0/11{,}5416 = 0{,}6932 = \ln 2$ ✓. Piège évité au passage : **71 % est la valeur à
$4{,}0$ j**, pas à $5{,}0$ j.)*

- **`suite` :** « Promène le curseur sur les dix jours et note trois couples : à $0$,
  $4{,}0\times10^{14}$ ; à $4{,}0$ jours, $2{,}83\times10^{14}$, soit 71 % ; à $8{,}0$
  jours, $2{,}0\times10^{14}$, soit 50,0 %. Regarde le milieu : à la moitié du temps, il
  ne reste pas les trois quarts ni la moitié, mais 71 % — la courbe n'est pas une droite,
  et c'est pour ça qu'on ne lit jamais une demi-vie « au jugé ». »
- **⟂-avant-pari :** la lecture `demi-vie` ; **toute** construction (guide horizontal,
  guide vertical, tick, cote) ; le curseur posé ailleurs qu'à $t = 0$ ; le verdict ; tout
  pixel d'accent (mesuré en **chrominance**) ; la description lue au lecteur d'écran ne
  doit contenir ni « moitié », ni « 8,0 jours ».
  **Reste visible (l'énoncé) :** les axes **gradués en chiffres**, la courbe à l'encre
  jusqu'à 10 j, le repère $N_0 = 4{,}0\times10^{14}$, le curseur à $t = 0$, et les lectures
  `instant`, `noyaux`, `fraction` à leur position de départ.

### 7.2 S2 — `et-si-on-part-plus-tard` · « Et si on ne part pas du début »

C'est **l'étape centrale** (§2.2).

- **État :** `t_demi_j: "8"`, `support: "courbe"`, **`fenetre_j: 32`**, `grandeur: "noyaux"`,
  **`depart_j: 16`**.
- **Contrôle ouvert :** `depart` (**neuf**). **Lectures :** `depart`, `restants-depart`,
  `demi-vie` — et `duree-de-moitie` **après révélation seulement**.
- **Pas de course** : verdict immédiat, puis le crochet se pose.
- **Consigne :** « Même échantillon, même courbe — mais l'enregistrement va maintenant
  jusqu'à trente-deux jours. On se place à $t_1 = 16$ jours. Il reste
  $1{,}0\times10^{14}$ noyaux : le **quart** du départ, ce qui est cohérent, seize jours
  font deux demi-vies. On oublie tout ce qui précède et on repart de là, comme d'un
  nouveau départ. »
- **Pari :** « Pour que ces survivants soient à leur tour réduits de moitié — de
  $1{,}0\times10^{14}$ à $5{,}0\times10^{13}$ — il faudra… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `six-jours` | environ **6 jours** : à cet instant il part quatre fois moins de noyaux par jour qu'au départ ; à ce rythme, perdre $5{,}0\times10^{13}$ noyaux prend environ six jours | non | **`division-lineaire-demi-vies`** | « Ton calcul est juste et ton hypothèse ne l'est pas. Le rythme actuel est bien $\lambda N = 0{,}0866 \times 1{,}0\times10^{14} = 8{,}7\times10^{12}$ noyaux par jour, et $5{,}0\times10^{13} / 8{,}7\times10^{12} = 5{,}8$ jours. Mais ce rythme **ne reste pas constant pendant la fenêtre** : il diminue au fur et à mesure qu'il y a moins de noyaux. Regarde d'ailleurs ce que donne ta méthode ailleurs : elle rend **toujours** $5{,}8$ jours, où que tu poses le départ — c'est $\tau/2$, et $\tau$ ne dépend pas de l'instant. Une méthode qui donne la même réponse en ignorant ce qui change n'a pas décrit ce qui change. La vraie durée est $8{,}0$ jours. » |
| `moins-car-uses` | moins de huit jours : ces noyaux ont seize jours de plus que ceux du départ, ils sont plus près de leur fin | non | **`noyau-vieillit`** | « Regarde la largeur du crochet : $8{,}0$ jours, exactement comme celui qu'on aurait posé à l'instant zéro. Et déplace le point de départ : $0$, $7$, $19$ jours — toujours $8{,}0$. Si les noyaux « vieillissaient », cette largeur rétrécirait à mesure qu'on avance ; elle ne bouge pas d'un pixel. Un noyau n'a pas de pièces qui s'usent : il ne sait pas depuis combien de temps il existe, donc l'horloge de la demi-vie repart à zéro à chaque instant où tu décides de la regarder. » |
| `huit-jours` | exactement **8,0 jours**, comme la première fois | **oui** | — | « Oui. Et regarde ce qui change et ce qui ne change pas, c'est tout le chapitre en une image. **Ce qui change** : la hauteur du crochet — il partait de $4{,}0\times10^{14}$, il part maintenant de $1{,}0\times10^{14}$. **Ce qui ne change pas** : sa **largeur**, $8{,}0$ jours. La demi-vie n'est pas « le temps que met le premier quart à partir » : c'est le temps que met **n'importe quelle** population de ces noyaux à être divisée par deux. Essaie le contrôle qui vient de s'ouvrir : vingt-cinq positions de départ, vingt-cinq fois $8{,}0$. » |
| `plus-car-robustes` | plus de huit jours : les noyaux les plus fragiles sont partis les premiers, il ne reste que les plus solides | non | **`noyau-fraicheur-instable`** | « C'est un raisonnement de tri, et il suppose que les noyaux **diffèrent entre eux** : des fragiles, des solides. Ils ne diffèrent pas. Ce sont $1{,}0\times10^{14}$ noyaux d'iode 131 rigoureusement identiques, et rigoureusement identiques à ceux du départ : même $\lambda$, même chance par jour. Il n'y a rien à trier, donc rien à épuiser — et la largeur du crochet le dit : $8{,}0$ jours, à chacune des vingt-cinq positions. » |

- **`suite` :** « Fais glisser l'instant de départ, de zéro à vingt-quatre jours, cran par
  cran, et regarde **deux** choses à la fois. La **hauteur** du crochet s'effondre :
  $4{,}0\times10^{14}$, puis $2{,}0$, puis $1{,}0$, puis $5{,}0\times10^{13}$. Sa
  **largeur** ne bouge jamais : $8{,}0$ jours, vingt-cinq fois sur vingt-cinq. C'est la
  phrase « sans mémoire » traduite en une durée qu'on peut mesurer — et c'est aussi la
  raison pour laquelle on peut dater un objet : la demi-vie de l'iode 131 est la même
  aujourd'hui qu'au premier jour de l'échantillon, et la même dans un échantillon vieux de
  mille ans. »
- **⟂-avant-pari :** le **crochet** et sa cote ; `duree-de-moitie` ; le second repère sur
  la courbe ; tout guide ; le verdict ; tout pixel d'accent ; la description lue ne doit
  contenir ni « huit », ni « même », ni « inchangé ».
  **Reste visible :** les axes gradués jusqu'à 32 j, la courbe entière à l'encre, le repère
  $t_1 = 16$ j **et** la lecture `restants-depart` $= 1{,}0\times10^{14}$ — *ce sont les
  données de la consigne, pas la réponse ; le pari porte sur une durée, pas sur un
  nombre de noyaux.*

### 7.3 S3 — `la-loi-est-une-loi-de-population` · « Soixante-quatre noyaux »

- **État :** **`support: "grille"`**, **`population_n: 64`**, `t_demi_j: "8"`,
  `grandeur: "noyaux"`.
- **Contrôle ouvert :** `population` (**neuf**). **Lectures :** `population`,
  `restants-comptes`, `noyaux` *(ce que la loi prévoit)*, `ecart-relatif`.
- **`revele_apres_course: 1`** — la course va de $0$ à $16$ jours (4,0 s à l'écran), et le
  verdict attend la **fin**.
- **Consigne :** « On change d'échelle, et **c'est tout ce qui change**. Jusqu'ici
  l'échantillon comptait $4{,}0\times10^{14}$ noyaux — bien trop pour les dessiner. En
  voici soixante-quatre, un par case. La règle est exactement la même pour chacun : à
  chaque instant, la même chance de se désintégrer, quels que soient son âge et ce qu'ont
  fait ses voisins. Une case qui se vide est un noyau qui vient de se désintégrer — il
  reste là, mais il n'est plus de l'iode 131. La course couvre deux demi-vies, seize
  jours. »
- **Pari :** « Au bout de $8{,}0$ jours — une demi-vie — il restera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `exactement-32` | **exactement 32** cases pleines : la loi dit qu'il en reste la moitié | non | **`loi-population-vs-noyau`** *(nouveau, §8.2 ; forme « la loi est exacte case par case »)* | « Compte : la course vient d'en laisser un nombre qui n'est presque jamais 32. Relance : tu obtiendras encore autre chose, et jamais les mêmes cases. La loi ne **commande** à aucun noyau ; elle dit ce que fait une **foule**. Avec soixante-quatre individus, la foule est trop petite pour que sa moyenne tombe juste — l'écart typique est de quatre cases, soit 12 %. Monte à 1024 avec le contrôle qui vient de s'ouvrir : l'écart relatif tombe à 3 %, et la loi paraît exacte sans l'être davantage. » |
| `autour-de-32` | un nombre **proche de 32**, et différent à chaque fois qu'on relance | **oui** | — | « Oui, et c'est le cœur du chapitre. Deux affirmations qui semblent s'exclure et qui sont vraies ensemble : **aucun** noyau n'est prévisible — on ne sait dire ni lequel partira, ni quand — et **la population** obéit à une loi si régulière qu'on s'en sert pour dater des os. Ce qui fait le pont entre les deux, c'est le **nombre**. À soixante-quatre noyaux, l'écart typique vaut $\sqrt{64}/2 = 4$ cases sur 32, soit 12 %, et il se voit. Sur $4{,}0\times10^{14}$ noyaux, il vaut cinq cent-millionièmes, et la courbe des étapes précédentes paraît parfaitement lisse. Elle ne l'est pas : elle est **grande**. » |
| `n-importe-quoi` | n'importe quel nombre entre 0 et 64 : puisque chaque noyau tire au sort, **aucun** résultat n'est prévisible | non | **`loi-population-vs-noyau`** *(forme « hasard = pas de loi »)* | « Relance cinq fois et note les cinq nombres : ils tiennent tous dans une poignée de cases autour de 32 — tu ne verras ni 5, ni 60. Le hasard d'un individu n'interdit pas la régularité d'une foule ; il la **produit**. Chacun des soixante-quatre tire sa pièce, et la somme de soixante-quatre tirages se serre autour de la moitié : l'écart typique vaut quatre cases, pas trente. C'est ce resserrement qui rend la loi utilisable — et il est d'autant plus fort que les noyaux sont nombreux. » |

- **`suite` :** « Trois manœuvres, dans cet ordre. **Une :** relance trois fois à
  soixante-quatre et note les trois nombres — ils diffèrent, et les cases éteintes ne sont
  jamais les mêmes. **Deux :** passe à 256, puis à 1024, en relançant à chaque fois.
  L'écart à la moitié, **en proportion**, se resserre : environ 12 % à 64 (4 cases sur 32),
  6 % à 256 (8 sur 128), 3 % à 1024 (16 sur 512). Il vaut exactement
  $1/\sqrt{N_0}$ : multiplie la population par quatre, et il est divisé par deux.
  **Trois :** applique-le à l'échantillon des étapes 1 et 2 —
  $\sqrt{4{,}0\times10^{14}} = 2{,}0\times10^{7}$, donc un écart relatif de cinq
  cent-millionièmes. Voilà pourquoi sa courbe était lisse : non pas parce que la loi est
  exacte, mais parce que l'échantillon est **grand**. »
- **⟂-avant-pari :** **toute case éteinte** (les 64 sont pleines, sans exception) ; le
  bouton de course ; `restants-comptes` ; `ecart-relatif` ; la courbe superposée ; le
  verdict ; tout pixel d'accent.
  **Reste visible :** la grille pleine à l'encre, la lecture `population` $= 64$, la
  légende de l'appareil (« une case = un noyau »), la durée de la course.

### 7.4 S4 — `ce-que-compte-le-detecteur` · « Ce qu'un détecteur compte vraiment »

- **État :** **`support: "courbe"`**, `fenetre_j: 32`, **`grandeur: "noyaux"`**,
  `t_demi_j: "8"`.
- **Contrôle ouvert :** `grandeur` (**neuf**). **Lectures :** `noyaux`, `activite`,
  `demi-vie`, `lambda`.
- **Pas de course** : verdict immédiat, puis l'axe bascule.
- **Consigne :** « Retour à l'échantillon réel, et une question d'appareil. Un détecteur ne
  compte pas les noyaux : il ne peut pas, ils sont enfermés dans la matière. Il compte les
  **désintégrations**, une par une, et affiche combien il en compte **par seconde** : c'est
  l'**activité**, en becquerels. Sur cet échantillon, il affiche $4{,}0\times10^{8}$ Bq à
  l'instant zéro. Un bouton va te laisser changer ce que porte l'axe vertical : le nombre
  de noyaux, ou l'activité. »
- **Pari :** « Sur la courbe de l'**activité**, la demi-vie se lira… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `au-meme-endroit` | au même endroit, $8{,}0$ jours — mais l'axe portera d'autres nombres : $4{,}0\times10^{8}$, $2{,}0\times10^{8}$, $1{,}0\times10^{8}$ becquerels | **oui** | — | « Oui, et c'est pour cela que les sujets donnent presque toujours une courbe d'**activité**. La raison tient en une ligne : $a = \lambda N$, avec $\lambda$ **constante**. Multiplier toute une courbe par un nombre fixe ne déplace **aucun** instant : quand $N$ est divisé par deux, $a$ l'est au même moment. Deux sujets nationaux demandent exactement ce geste — 2021, sur une courbe d'activité de plutonium ; 2022, sur l'iode 131. Note quand même le facteur : $\lambda = 1{,}00\times10^{-6}\ \text{s}^{-1}$, donc $4{,}0\times10^{14}$ noyaux donnent $4{,}0\times10^{8}$ becquerels — **un million de fois moins**, pas le même nombre. » |
| `pas-lisible` | nulle part : la demi-vie se définit sur un nombre de **noyaux**, elle n'a pas de sens sur une activité | non | **`confond-activite-nombre-noyaux`** | « Bascule l'axe et compare les deux tracés : ils ont **exactement** la même forme, et la demi-vie s'y lit au même endroit. La demi-vie n'est pas attachée à une grandeur particulière, elle est attachée à une **division par deux** : puisque $a$ est proportionnelle à $N$, tout ce qui divise $N$ par deux divise $a$ par deux, au même instant. Ce que ta réponse touche juste, c'est que $a$ et $N$ **ne sont pas la même chose** — mais elles sont proportionnelles, et c'est ce qui sauve la lecture. » |
| `meme-courbe` | au même endroit, et la courbe sera la **même en valeur** : $4{,}0\times10^{14}$ becquerels au départ, puisque l'activité compte les noyaux | non | **`confond-activite-nombre-noyaux`** *(forme « le becquerel compte des noyaux »)* | « Lis les deux axes l'un après l'autre : $4{,}0\times10^{14}$ noyaux d'un côté, $4{,}0\times10^{8}$ becquerels de l'autre. Un becquerel, c'est **une désintégration par seconde** — pas un noyau. Sur cet échantillon, environ quatre cents millions de noyaux partent chaque seconde, sur quatre cents mille milliards présents : le rapport est $\lambda$ exprimée en $\text{s}^{-1}$, soit $1{,}00\times10^{-6}$. L'instant de la demi-vie, lui, est bien le même — c'est la seule chose que les deux courbes partagent. » |

- **`suite` :** « Bascule d'une grandeur à l'autre en regardant **l'axe**, pas la courbe :
  le tracé ne bouge pas d'un pixel, ce sont les graduations qui changent —
  $4{,}0\times10^{14} / 2{,}0\times10^{14} / 1{,}0\times10^{14}$ d'un côté,
  $4{,}0\times10^{8} / 2{,}0\times10^{8} / 1{,}0\times10^{8}$ de l'autre. C'est le réflexe
  qui sauve la question à l'examen : avant de lire un graphe, lis ce qu'il y a sur les
  **deux** axes. Et repose le crochet de l'étape précédente sur la courbe d'activité : il
  fait toujours $8{,}0$ jours de large, où qu'on le pose. »
- **⟂-avant-pari :** la courbe d'activité ; les graduations de l'axe des becquerels ; la
  lecture `activite` ; le verdict ; tout pixel d'accent.
  **Reste visible :** la courbe des noyaux à l'encre, son axe gradué, la **valeur
  d'énoncé** $a_0 = 4{,}0\times10^{8}$ Bq **écrite dans la consigne** (elle est donnée par
  l'appareil, pas déduite), `demi-vie` $= 8{,}0$ j *(acquis des étapes 1 et 2)*.

### 7.5 S5 — `libre` · « Un autre isotope, et tout s'ouvre »

- **État :** `t_demi_j: "8"` au départ, `support: "courbe"`, `fenetre_j: 32`,
  `grandeur: "noyaux"`, `depart_j: 0`, `population_n: 256`.
- **Contrôles ouverts :** **`isotope` (neuf)** + `instant`, `depart`, `population`,
  `grandeur` (rouverts). **Lectures :** les treize, `tau` compris.
- **Pas de `revele_apres_course`** — le pari compare **deux réglages** qu'une seule course
  ne peut pas montrer ensemble. Verdict immédiat, puis les contrôles s'ouvrent et l'élève
  va vérifier les deux. *(Même choix que le manège, la cuve et la corde à leur étape
  libre.)*
- **Consigne :** « Tout s'ouvre, et un second échantillon apparaît : **même** nombre de
  noyaux au départ, $4{,}0\times10^{14}$, **même** appareil — mais un autre isotope, dont
  la constante radioactive $\lambda$ est **deux fois plus grande** : chacun de ses noyaux a
  deux fois plus de chances de se désintégrer par jour. »
- **Pari :** « Sa demi-vie sera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `deux-fois-plus-grande` | deux fois plus grande, $16$ jours : $\lambda$ double, donc la demi-vie double | non | **`confond-demi-vie-constante-lambda`** | « Prends le sens physique avant la formule : $\lambda$ est une **chance de partir par jour**. Doubler cette chance, c'est vider l'échantillon **plus vite**, donc atteindre la moitié **plus tôt**. Ta réponse dit l'inverse. La formule le confirme, et c'est la place de $\lambda$ qui décide : $t_{1/2} = \ln 2 / \lambda$ — $\lambda$ est au **dénominateur**. Deux fois plus grande en bas, c'est deux fois plus petit en haut : $4{,}0$ jours. » |
| `deux-fois-plus-petite` | deux fois plus petite, $4{,}0$ jours | **oui** | — | « Oui. Mets les trois nombres côte à côte, c'est le récapitulatif du chapitre : $\lambda = 0{,}173\ \text{j}^{-1}$ au lieu de $0{,}0866$ ; $t_{1/2} = 4{,}0$ jours au lieu de $8{,}0$ ; $\tau = 1/\lambda = 5{,}77$ jours au lieu de $11{,}5$. Et remarque une chose qui tombe souvent à l'examen : sur le **premier** échantillon, $1/\lambda$ vaut $11{,}5$ jours et la demi-vie $8{,}0$ — elles ne sont **pas** inverses l'une de l'autre, il y a le facteur $\ln 2 \approx 0{,}693$ entre les deux. Trois grandeurs, trois valeurs, une seule relation : $t_{1/2} = \ln 2/\lambda = \tau \ln 2$. » |
| `inchangee` | inchangée, $8{,}0$ jours : $\lambda$ règle la vitesse de départ, la demi-vie est une autre propriété, indépendante | non | **`confond-demi-vie-constante-lambda`** *(forme « deux grandeurs sans lien »)* | « Elles ne sont pas indépendantes : elles disent la **même** chose deux fois, dans deux unités. $\lambda$ se mesure en $\text{j}^{-1}$, $t_{1/2}$ en jours — l'une est l'inverse de l'autre, au facteur $\ln 2$ près. Bascule d'un échantillon à l'autre et regarde les deux courbes : celle du second plonge deux fois plus vite, et elle coupe l'ordonnée moitié à $4{,}0$ jours. Un seul nombre caractérise un isotope ; on peut l'écrire en $\lambda$, en $t_{1/2}$ ou en $\tau$, jamais indépendamment. » |

- **`suite` :** « Quatre manœuvres pour finir. **Une :** pose le crochet sur l'échantillon
  rapide et promène-le — $4{,}0$ jours à chacune des vingt-cinq positions, la même
  invariance avec une autre valeur. **Deux :** bascule sur l'activité : $8{,}0\times10^{8}$
  becquerels au départ, **deux fois plus** que le premier échantillon pour le **même**
  nombre de noyaux — normal, $a_0 = \lambda N_0$ et c'est $\lambda$ qui a doublé.
  **Trois :** passe à la grille, à 1024, sur l'isotope rapide : la course couvre maintenant
  **quatre** demi-vies en seize jours, et il reste environ 64 cases sur 1024. **Quatre :**
  refais ce dernier tirage trois fois, et regarde le petit nombre bouger — c'est le même
  hasard, sur une foule devenue petite. »
- **⟂-avant-pari :** **toute** lecture du second échantillon (`demi-vie`, `lambda`, `tau`,
  `activite`, `duree-de-moitie`) ; sa courbe ; le verdict ; tout pixel d'accent.
  **Reste visible :** la courbe du premier échantillon à l'encre, ses axes gradués, et la
  **description écrite** du second dans la consigne ($N_0$ identique, $\lambda$ doublée) —
  *c'est l'énoncé ; la demi-vie est la réponse. La frontière passe entre les deux.*

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes.** Tout ce qui dépend de l'ISSUE attend la
révélation : les **constructions** de lecture (guides, ticks, crochet, cotes), les
**cases éteintes**, la **seconde courbe**, toute lecture qui est une réponse, le verdict,
et la phrase lue au lecteur d'écran. Ce qui reste, c'est **l'énoncé** : les axes
**gradués** (la graduation est le document, pas la réponse), la courbe **du premier
échantillon** (idem), la grille **pleine**, les valeurs que la consigne vient d'énoncer.

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du 2026-09-24 soir) : *ce qu'une
étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT fait deviner.* La
porte **réécrit elle-même** cette table contre le descripteur (§11.3) :

| étape | contrôle ouvert | ce qu'il peut atteindre | pari suivant mis en danger ? |
|---|---|---|---|
| **S1** | `instant` seul, bornes $[0\ ;\ 10]$ j, **`fenetre_j: 10`** (la courbe n'est tracée que jusqu'à 10 j) | $N(t)$ sur les dix premiers jours, une seule courbe, un seul axe | **non** pour S2 : la deuxième demi-vie est à $16$ j — **hors de la fenêtre tracée ET hors des bornes du curseur** ; le crochet n'existe pas ; `depart` est fermé. **non** pour S3 : aucune grille dans le DOM (`support: courbe`). **non** pour S4 : `grandeur` fermé, aucun becquerel affiché. **non** pour S5 : `isotope` fermé. |
| **S2** | `depart` seul | toutes les fenêtres de demi-vie du premier échantillon, de $0$ à $24$ j | **non** pour S3 : aucune grille. **non** pour S4 : `grandeur` fermé. **non** pour S5 : `isotope` fermé — et le pari de S5 se tranche **précisément** sur l'isotope. |
| **S3** | `population` seul | trois tailles d'échantillon comptable, **un seul** isotope, **une seule** grandeur | **non** pour S4 : `grandeur` fermé ; la grille n'affiche aucune activité. **non** pour S5 : `isotope` fermé. |
| **S4** | `grandeur` seul | les deux axes du **premier** échantillon | **non** pour S5 : `isotope` fermé, donc $\lambda$ ne peut pas varier. |
| **S5** | les cinq | tout | — |

**Une fuite molle, écrite franchement.** La `suite` de S2 fait comprendre que la demi-vie
ne dépend pas de l'instant où l'on regarde ; un élève qui l'a faite arrive à S5 en sachant
que $t_{1/2}$ est une propriété de l'isotope. **Ce n'est pas une fuite au sens de la
règle** : la règle interdit d'**atteindre l'état** qu'un pari fait deviner, pas de
comprendre la physique qui y mène — et l'état qui tranche S5 (le second isotope) reste
inatteignable jusqu'à S5. C'est le cas limite écrit par les specs de la cuve et de la
corde, et il est ici volontaire : **S5 doit être gagnable par le raisonnement.**

**Pourquoi quatre contrôles sont rouverts en S5.** La `suite` de S5 est la manœuvre de
synthèse (le crochet sur l'isotope rapide, l'activité doublée, la grille à 1024, le tirage
refait). Sans eux, elle serait une phrase au lieu d'un geste. Le contrôle **neuf** de S5
est `isotope`, et la règle « un contrôle neuf par étape » (ADR 0041 §4) est respectée.

---

## 8. Misconceptions

Les **dix-neuf** modèles déclarés de la notion vivent dans `items.yaml` sous le préfixe
`mc.physics.decroissance_radioactive.`. Les comptes ci-dessous sont **au niveau ITEM**,
méthode `coverage_summary` (une misconception compte un item dès qu'un de ses distracteurs
la porte, **une seule fois** par item ; les points d'arrêt ne comptent pas, **et les paris
de scène non plus**). Total actuel : **31 items**, plancher **3**, `floor_met: true`.

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions visées | compte actuel |
|---|---|---|
| S1 | `demi-vie-egale-duree-de-vie-totale` (deux formes) · `confond-demi-vie-constante-lambda` | 6 · 4 |
| S2 | `noyau-vieillit` · `noyau-fraicheur-instable` · `division-lineaire-demi-vies` | 8 · 7 · 7 |
| S3 | **`loi-population-vs-noyau` proposé** (deux formes) | **0 — à créer** |
| S4 | `confond-activite-nombre-noyaux` (deux formes) | **3 — exactement au plancher** |
| S5 | `confond-demi-vie-constante-lambda` (deux formes) | 4 |

**Deux distracteurs sur un même modèle dans une même question** (S1, S4, S5) : assumé,
parce que les **formes** diffèrent et que les `retour` diffèrent. Le compteur d'exposition
ne s'en trouve pas faussé — le plancher se compte sur les **items**, pas sur les paris.

**Ce que la scène ne confronte PAS, écrit à côté de ce qu'elle confronte** (ADR 0035 — *la
décision de ne pas armer s'écrit à côté du motif voisin*) :

- `lambda-depend-conditions-externes` — le modèle **le plus servi** de la notion (12 items,
  4 checkpoints sur 5) et **délibérément écarté** : la scène n'a aucun mécanisme
  thermique, elle ne pourrait qu'afficher par décret (§2.5). *Une scène ne montre jamais un
  résultat qu'elle n'a aucun moyen de produire.*
- Les onze modèles de R1 et R2 (isotopes, stabilité, lois de Soddy, $\gamma$) : hors
  chapitre.
- `oubli-lambda-dans-exponentielle` (8 items) : c'est une erreur d'**écriture** de la loi,
  et la scène n'écrit aucune loi à trous.

### 8.2 « La loi est exacte noyau par noyau » — un vingtième modèle, et voici pourquoi

Les modèles déclarés qui touchent au caractère aléatoire sont `noyau-vieillit`,
`noyau-fraicheur-instable` (l'âge d'un noyau) et `lambda-depend-conditions-externes` (ce
qui l'entoure). **Aucun des trois ne dit ce que S3 débusque** : la confusion entre ce que
la loi promet à une **foule** et ce qu'elle promettrait à un **individu**.

Ce modèle est difficile à voir, parce qu'il **coche la bonne réponse partout dans le
corpus actuel** : l'élève qui croit que « à chaque demi-vie il part exactement la moitié »
répond **juste** à DECRO-6, DECRO-14, DECRO-15, DECRO-16 (toutes les questions de
divisions successives), **juste** à `cp-r3-loi`, **juste** aux deux sommets — parce
qu'aucune question du corpus ne fait jamais varier le **nombre** de noyaux. Il tombe le
jour où un sujet demande pourquoi on ne peut rien dire d'un noyau isolé, ou pourquoi une
mesure d'activité faible est bruitée.

Et **le corpus l'enseigne activement** : `media/population-aleatoire.motion.json` fait
64 → 32 → 16 → 8, la moitié exacte à chaque temps (`REVIEW` fid-F20).

Ce n'est ni `noyau-vieillit` (le calcul de l'élève est juste, c'est sa lecture du
**statut** de la loi qui est fausse) ni `division-lineaire-demi-vies` (qui porte sur la
forme géométrique contre linéaire). Fusionner, c'est un compteur qui ne dit plus lequel
tourne — même argument que le manège (§8.2 de sa spec) et que la cuve.

**Recommandation : ouvrir un vingtième modèle.** Proposition complète, au format et avec
les quatre champs de `items.yaml` :

```yaml
  - id: mc.physics.decroissance_radioactive.loi-population-vs-noyau
    label: "« La loi de décroissance vaut noyau par noyau » — ou, à l'inverse, « puisque c'est le hasard, aucun nombre n'est prévisible »"
    description: "L'élève ne distingue pas ce que la loi promet à une POPULATION de ce qu'elle promettrait à un INDIVIDU. Deux formes opposées, un seul modèle. Forme A (déterministe) : à chaque demi-vie il partirait EXACTEMENT la moitié des noyaux, au noyau près, et un échantillon de 64 noyaux en laisserait exactement 32 — l'élève traite N(t) = N0·e^(−λt) comme une horloge, pas comme une espérance. Forme B (nihiliste) : puisque chaque noyau tire au sort, aucun résultat n'est prévisible et n'importe quel nombre est possible — l'élève conclut du hasard individuel à l'absence de loi collective. Ce modèle répond CORRECTEMENT à toute question de divisions successives (N0/2, N0/4, N0/8) : il ne se révèle qu'en faisant varier le NOMBRE de noyaux, ou en demandant ce qu'on peut affirmer d'un noyau unique."
    contradicts_principle: "La loi de décroissance est une loi STATISTIQUE : elle donne l'espérance du nombre de noyaux restants, pas une valeur certaine. Pour un échantillon de N0 noyaux, le nombre restant après une demi-vie fluctue autour de N0/2 avec un écart-type √N0/2, soit un écart RELATIF de 1/√N0 — 12 % pour 64 noyaux, 5×10⁻⁸ pour 4,0×10¹⁴. Le hasard individuel ne détruit donc pas la loi : c'est le grand nombre qui la rend exacte en pratique, et c'est pourquoi elle est inutilisable sur un noyau isolé et parfaitement fiable sur un échantillon macroscopique."
```

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige qu'un `misconception:` employé par un pari de scène soit
**déclaré dans `items.yaml` au moment où la scène est validée**.

**Voie de repli si le modèle n'est pas adopté** (une ligne change) : les deux distracteurs
de S3 portent `division-lineaire-demi-vies`, dont la `description` doit alors être amendée
pour couvrir « la loi tombe juste au noyau près ». *Je ne la recommande pas* : ce serait
mettre sous une même étiquette une erreur d'algèbre (soustraire au lieu de diviser) et une
erreur d'épistémologie (confondre espérance et certitude).

### 8.3 Les trois items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** où au moins un distracteur porte le modèle. **Les
paris de la scène ne comptent pas.**

**Conventions de ce fichier, à respecter à la lettre :** les items portent `id`, `rung`,
`difficulty_level`, `skill_code`, `tags`, `primary_misconception`, `stem`, `type: mcq`,
`choices` (chacun `id` A/B/C/D, `text`, `correct`, et pour les faux `misconception:` +
`feedback:`), `correct_feedback`, `solution`.
**`items.yaml` de cette notion ne porte AUCUN champ `habilete:` (0 occurrence sur 31
items) : ne pas en ajouter** — ce serait un changement de schéma, pas une décision d'item
(`DECISIONS-EN-ATTENTE` §3). **`skill_code: decroissance_radioactive`** — pas
`pc_decroissance_radioactive`, la dérive corrigée par fid-F13. Et deux cliquets armés :
`indice-refus` (aucun distracteur qui **refuse** de conclure) et `indice-absolu` (pas de
« jamais » / « toujours » comme indice de forme).

---

**DECRO-32** — `rung: "R3"`, `difficulty_level: 2`,
`primary_misconception: mc.physics.decroissance_radioactive.loi-population-vs-noyau`

- *stem :* Un échantillon contient exactement **100** noyaux radioactifs d'un isotope de
  demi-vie $t_{1/2} = 2{,}0$ heures. Deux heures plus tard, on compte les noyaux qui n'ont
  pas encore désintégré. Que peut-on affirmer ?
- *clé (A) :* on en comptera un nombre **voisin de 50**, généralement entre 40 et 60, et
  une seconde expérience identique donnerait un autre nombre.
- *distracteurs :*
  - (B) « on en comptera **exactement 50** : c'est ce que dit la loi de décroissance »
    → **`loi-population-vs-noyau`** *(forme déterministe)*. `feedback` : la loi donne la
    valeur **moyenne** ; avec 100 noyaux, l'écart typique est de $\sqrt{100}/2 = 5$ noyaux,
    et deux expériences identiques ne donnent pas le même compte.
  - (C) « on ne peut rien affirmer : chaque noyau tire au sort, donc tout nombre entre 0 et
    100 est également possible » → **`loi-population-vs-noyau`** *(forme nihiliste)*.
    `feedback` : le hasard individuel **produit** la régularité collective ; les valeurs se
    serrent autour de 50 à quelques unités près, et 5 ou 95 ne se rencontrent pas.
  - (D) « on en comptera exactement 50 si l'échantillon est resté à température constante »
    → **`lambda-depend-conditions-externes`**. `feedback` : $\lambda$ ne dépend d'aucune
    condition extérieure ; ce n'est pas la température qui empêche de trouver 50 tout rond,
    c'est le nombre.
- *solution :* la loi donne une espérance ; l'écart-type vaut $\sqrt{N_0}/2$, soit 5 ici ;
  l'écart **relatif** $1/\sqrt{N_0}$ vaut 10 % sur 100 noyaux et devient négligeable sur un
  échantillon réel.

**DECRO-33** — `rung: "R4"`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* Deux échantillons du même isotope sont préparés au même instant : le premier
  contient $1{,}0\times10^{4}$ noyaux, le second $1{,}0\times10^{16}$. Après une demi-vie,
  on compare, **pour chacun**, le nombre restant à la valeur prévue par la loi. Que
  constate-t-on ?
- *clé (A) :* les deux s'écartent de la prévision, mais l'écart **relatif** est bien plus
  grand pour le petit échantillon : environ 1 % contre $10^{-8}$.
- *distracteurs :*
  - (B) « les deux tombent exactement sur la prévision : la loi ne dépend pas du nombre de
    noyaux » → **`loi-population-vs-noyau`**. `feedback` : la loi ne dépend pas du nombre,
    mais **sa précision, si** — l'écart relatif vaut $1/\sqrt{N_0}$.
  - (C) « l'écart est le même pour les deux, puisque c'est le même isotope et le même
    $\lambda$ » → **`loi-population-vs-noyau`**. `feedback` : $\lambda$ fixe la **moyenne**,
    pas la dispersion ; celle-ci ne dépend que du nombre.
  - (D) « le grand échantillon s'écarte davantage : il a plus de noyaux, donc plus
    d'occasions de s'écarter » → **`loi-population-vs-noyau`** *(confusion écart absolu /
    écart relatif)*. `feedback` : en nombre **absolu** de noyaux, oui — l'écart-type croît
    comme $\sqrt{N_0}$ ; **rapporté** à la population, il décroît comme $1/\sqrt{N_0}$, et
    c'est ce rapport qui décide de la qualité de la loi.
- *exigence de rédaction :* aucun distracteur ne nomme sa propre faute ; chaque `feedback`
  donne la **raison**, jamais l'étiquette.

**DECRO-34** — `rung: "R4"`, `difficulty_level: 4`, même `primary_misconception`
*(co-étiquetage assumé avec `confond-activite-nombre-noyaux` sur un distracteur)*

- *stem :* Un détecteur placé devant une source très faible compte, minute après minute :
  18, 24, 15, 21, 19, 26 désintégrations. Un élève conclut : « ces mesures sont fausses,
  l'activité devrait être constante d'une minute à l'autre ». Que répondre ?
- *clé (A) :* les mesures sont **compatibles** avec une activité constante : ce sont des
  comptages d'événements aléatoires, et pour une moyenne d'environ 20 par minute, la
  dispersion attendue est de l'ordre de $\sqrt{20} \approx 4{,}5$ — exactement ce qu'on
  observe.
- *distracteurs :*
  - (B) « il a raison : à activité constante, le détecteur doit afficher le même nombre
    chaque minute » → **`loi-population-vs-noyau`**.
  - (C) « il a raison, et la cause est l'échauffement du détecteur, qui modifie $\lambda$ »
    → **`lambda-depend-conditions-externes`**.
  - (D) « les mesures sont fausses parce qu'un détecteur compte des **noyaux**, et le
    nombre de noyaux ne peut que décroître, jamais remonter de 15 à 21 » →
    **`confond-activite-nombre-noyaux`** *(co-étiqueté `loi-population-vs-noyau`)*.
- *solution :* l'activité est une **espérance** de comptage ; sur une source faible, la
  dispersion en $\sqrt{n}$ est visible, et c'est précisément pourquoi on allonge le temps
  de comptage pour mesurer une faible activité.

**Après application :** `total_items: 34`, `loi-population-vs-noyau: 3` (plancher atteint,
marge nulle), `confond-activite-nombre-noyaux: 4` (DECRO-34 D), `coverage_summary`
régénéré par `node web/scripts/resume-couverture.mjs`.

**Une dette voisine, signalée sans être commandée ici :** la `REVIEW` péd-F4 note que
$\beta^+$ contre $\beta^-$ (« le piège le plus courant » selon `lesson.md:126`) n'est testé
par **aucun** item. Ce n'est pas cette scène, et il ne faut pas que ce document le fasse
oublier.

---

## 9. La frontière de programme — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`).
Chacune porte sa raison.

1. **Aucune résolution d'équation différentielle.** `limites` du cadre : la loi est
   *exploitée*, jamais re-dérivée numériquement. Interdits : `Euler`, `dN/dt`, `d N / d t`,
   `pas de calcul`, `schéma`, `intégration`, `résoudre l'équation`. La scène n'affiche que
   la forme fermée et des tirages ; il n'y a rien à cacher, et la porte le garde quand
   même.
2. **Aucune filiation, aucune chaîne.** Exclusion du sous-domaine. Une case éteinte est un
   noyau **désintégré**, point ; elle ne redevient jamais active, et aucun « noyau fils »
   n'est nommé ni compté. Interdits : `filiation`, `chaîne de désintégration`,
   `équilibre séculaire`, `noyau petit-fils`, `famille radioactive`.
3. **Aucune énergie.** C'est `noyaux-masse-energie`. Interdits : `défaut de masse`,
   `énergie de liaison`, `MeV`, `u (unité de masse`, `E = mc`, `fission`, `fusion`,
   `courbe d'Aston`.
4. **Aucune datation.** C'est R5, **après** le marqueur : la scène ne remonte jamais du
   présent vers une date. Interdits : `datation`, `âge de l'échantillon`,
   `depuis la mort`, `carbone 14`.
5. **Aucune physique des particules, aucune section efficace.** Exclusions du
   sous-domaine. Interdits : `section efficace`, `neutronique`, `quark`, `interaction
   faible`, `antineutrino`.
6. **Aucune linéarisation, aucune échelle logarithmique.** Aucun `savoir_faire` ne la
   nomme. Interdits : `ln(N`, `semi-log`, `logarithmique`, `linéarisation`,
   `droite de pente −λ`. Les deux axes sont **linéaires**, toujours, et la porte le
   mesure aussi en pixels (les graduations sont équidistantes).
7. **Aucune 3D.** Canvas 2D, vue de face, aucune caméra. **`window.__THREE__` doit rester
   indéfini même panneau OUVERT** — famille de porte à part entière (§11.2).
8. **Aucune incertitude de mesure chiffrée, aucun « écart-type » affiché.** Le mot
   *écart-type* n'est pas au programme de PC. La scène affiche `ecart-relatif`, un simple
   pourcentage, et la `suite` de S3 parle d'« écart typique » en **cases**. Interdits :
   `écart-type`, `σ`, `binomial`, `loi normale`, `intervalle de confiance`.
   *(La porte, elle, a le droit de mesurer ce que le produit n'a pas le droit d'enseigner —
   règle de la cuve, ADR 0041 : ses bandes de tolérance sont en $\sigma$, §11.2.)*
9. **La scène ne remplace pas un TP.** Le cadre ne liste **aucun** travail pratique pour ce
   sous-domaine (`travaux_pratiques: []`, l. 140). La légende ne prétend donc jamais qu'il
   s'agit d'une mesure réelle : c'est un **appareil simulé**, et c'est écrit (§10).

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus dangereuse. Ce
paragraphe est à reprendre **mot pour mot** dans le champ `fit_caveat` du descripteur, et
ses points 1, 2 et 3 doivent apparaître **en légende**, une phrase chacun.

1. **La courbe n'est pas une mesure : c'est la loi tracée.** Elle est calculée en forme
   fermée à partir de $N_0 = 4{,}0\times10^{14}$ et $t_{1/2} = 8{,}0$ j. Une vraie courbe
   de laboratoire est obtenue point par point avec un détecteur, et chaque point porte une
   incertitude de comptage. Ce que la scène enseigne, c'est la **lecture** (quelle
   ordonnée, quel report, quel axe) ; ce qu'elle ne montre pas, c'est la **dispersion des
   points de mesure**. *Légende :* « Courbe calculée avec les valeurs de la leçon ; sur un
   vrai enregistrement, les points sont un peu dispersés. »
2. **La grille montre un échantillon impossible.** Soixante-quatre, 256 ou 1024 noyaux :
   aucun échantillon réel n'en contient si peu — un microgramme d'iode 131 en contient
   $10^{15}$. La petite population est un **choix pédagogique**, et c'est exactement ce que
   la scène veut faire voir : à ces effectifs, la loi bruite ; aux effectifs réels, non.
   *Légende :* « Une case = un noyau. Un échantillon réel en contient mille milliards de
   fois plus — c'est pourquoi sa courbe, elle, paraît lisse. »
3. **Le temps est accéléré, et c'est écrit.** Un jour d'échantillon = $0{,}25$ seconde à
   l'écran ; la course de seize jours dure quatre secondes. Facteur affiché
   (`data-facteur-temps`) et **mesuré contre l'horloge**. *Légende :* « Seize jours en
   quatre secondes : un jour vaut un quart de seconde. »
4. **Le tirage est une vraie simulation, pas une animation.** Chaque noyau tire à chaque
   pas avec $p = 1 - e^{-\lambda \Delta t}$ ; personne ne décide à l'avance combien
   partiront. C'est la différence exacte avec le média animé de R3, et c'est ce qui rend
   S3 possible.
5. **Rien dans la scène ne démontre que $\lambda$ est indépendante de la température.**
   La scène **suppose** $\lambda$ constante : c'est son hypothèse, pas son résultat
   (§2.5). Un élève ne doit pas croire qu'il vient de le vérifier.
6. **Les deux échantillons de S5 diffèrent par $\lambda$, et la scène ne nomme pas le
   second isotope.** Doubler $\lambda$ est un réglage d'appareil, pas un nuclide réel
   choisi — l'honnêteté commande de ne pas inventer un noyau (*question 5, §13*).
7. **Ce qu'un vrai détecteur montrerait de plus, et qui manque ici :** le bruit de fond, le
   temps mort, l'efficacité de détection (un compteur ne voit pas toutes les
   désintégrations). L'activité affichée est l'activité **de la source**, pas le taux de
   comptage d'un appareil. La scène est **plus propre que la réalité** ; elle ne doit
   jamais servir d'argument contre une figure de TP moins nette.

---

## 11. La porte (`web/scripts/scene-noyaux.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="courbe-et-noyaux"]`, **jamais** par
`[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du champ
magnétique, run 747). Elle se lance **plusieurs fois, à plusieurs largeurs** (1 280 px et
390 px au minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**,
**AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas
disponible au banc, elle sort **MUET, en échec**, jamais en vert.

### 11.1 Les nombres de la voie ANALYTIQUE, recalculés par une seconde implémentation

Écrite **dans la porte**, à partir de la spec ($N_0$, $t_{1/2} \in \{8{,}0 ; 4{,}0\}$,
$\ln 2$), **sans importer aucun module du produit** (ADR 0036 : une porte qui importe le
module se donne raison). Un écart quelconque est un défaut, pas du bruit.

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $N(t) = N_0\,2^{-t/t_{1/2}}$ aux **21** positions de `instant` × 2 isotopes | $4{,}0\times10^{14}$ → $1{,}68\times10^{14}$ | **égalité de chaîne** avec la lecture affichée, à 2 c.s. |
| N2 | $a(t) = \lambda N(t)$, $\lambda = \ln 2/(t_{1/2}\times 86\,400)$ | $4{,}0\times10^{8}$ → … Bq | égalité de chaîne, 2 c.s. |
| N3 | `fraction` $= N(t)/N_0$ | 100,0 → 42,0 % | égalité de chaîne, 1 déc. |
| N4 | `duree-de-moitie` aux **25** positions de `depart` × 2 isotopes | **8,0 j** (A) · **4,0 j** (B), **sans exception** | égalité de chaîne, chaîne littérale `8,0` |
| N5 | `lambda` en $\text{j}^{-1}$ **et** en $\text{s}^{-1}$ ; `tau` ; `demi-vie` | 0,0866 / $1{,}00\times10^{-6}$ / 11,5 / 8,0 — et 0,173 / $2{,}01\times10^{-6}$ / 5,77 / 4,0 | égalité de chaîne, 3 c.s. |
| N6 | la cohérence interne $t_{1/2} = \tau \ln 2$ **sur les valeurs AFFICHÉES** | $11{,}5 \times 0{,}693 = 7{,}97 \approx 8{,}0$ | 1 % — *chaîne de calcul, pas valeur isolée* |
| N7 | la grille exacte : $t_{1/2}/\Delta t$, (pas de `depart`)$/\Delta t$, (pas de `instant`)$/\Delta t$ lus dans `data-pas-*` | **entiers** : 32, 16, 4, 2 | exact |
| N8 | la probabilité par pas, lue dans `data-p-pas`, recalculée $1 - e^{-\lambda\Delta t}$ | **0,0214279** (A) · **0,0423967** (B) | $10^{-6}$ absolu |

**N8 mérite sa justification, parce qu'elle est le seul moyen honnête.** Un biais de 1 %
sur la probabilité par pas (le sabotage n°1, $p = \lambda\Delta t$) décale la survie à
$8{,}0$ j de $0{,}5000$ à $0{,}4962$ — soit, sur 1024 noyaux, **3,9 noyaux de moins pour un
écart-type de 16** : **0,24 σ**. Aucun nombre de courses raisonnable ne le distingue du
bruit. **La porte ne peut donc pas l'attraper en comptant, et elle le dit** : elle
**lit** la probabilité que le produit expose et la recalcule elle-même. *Une porte qui ne
peut pas voir un défaut doit écrire qu'elle ne le peut pas, et le garder autrement*
(ADR 0034).

### 11.2 Les faits de PIXELS et les INVARIANTS de la voie stochastique, mesurés dans les deux sens

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `crochet-invariant` | S2 : la **largeur en pixels** du crochet est identique aux 25 positions de `depart`, à $\le 1$ px (à 17,5 px/j, 8,0 j = 140 px) ; sur l'isotope B, elle vaut **exactement la moitié**, à $\le 2$ px | un crochet dont la largeur suit $N(t_1)$, ou une demi-vie calculée en $1/\lambda$ (qui donnerait 11,5 j = 202 px), doivent rougir |
| `lecture-t-demi` | S1 : le guide horizontal part de l'ordonnée $2{,}0\times10^{14}$ ($\le 2$ px du tick gradué), rejoint la courbe, et le tick vertical tombe sur $8{,}0$ j ($\le 2$ px) | un guide partant de la **courbe** (construction de $\tau$) doit rougir |
| `courbe-juste` | la courbe est **strictement décroissante et convexe** : sur 33 abscisses échantillonnées, différences premières $< 0$ et secondes $> 0$ ; et elle passe par $N_0/2$ à $t_{1/2}$ à $\le 2$ px | une décroissance **linéaire**, ou une exponentielle de mauvaise demi-vie, doivent rougir |
| `axes-lineaires` | les graduations de chaque axe sont équidistantes à $\le 1$ px | une échelle **logarithmique** doit rougir (§9.6) |
| `grille-comptee` | S3 : le nombre de cases **vidées**, compté sur les pixels (par chrominance), égale `restants-comptes` **exactement** ; à $t = 0$, **zéro** case vidée | un affichage qui compte autre chose que ce qu'il dessine doit rougir |
| `tirage-vivant` | S3 : sur 2 courses, le **motif** des cases vidées diffère — mesuré sur l'ensemble des cases, **jamais sur le compte** *(deux courses donnent le même compte environ 3 % du temps ; exiger que les comptes diffèrent rendrait la porte instable, ADR 0036)* | une grille qui éteint **exactement la moitié**, ou toujours les mêmes cases, doit rougir (c'est le défaut du média animé de R3, posé dans le code) |
| `tirage-juste` | sur 5 courses × 3 populations, `restants-comptes` à $t_{1/2}$ tombe dans $\pm 5\sigma$ : $[12 ; 52]$ à 64, $[88 ; 168]$ à 256, $[432 ; 592]$ à 1024. *Probabilité d'échec par mesure $\approx 5{,}7\times10^{-7}$, soit $\approx 9\times10^{-6}$ sur les 15 — le seuil est choisi pour que la porte ne soit pas instable* | un tirage **biaisé** de plus de 6 % doit rougir |
| `dispersion-decroit` | l'écart-type de `restants-comptes` sur **20 courses** à $N_0 = 64$, divisé par celui à $N_0 = 1024$, **rapporté** à leurs moyennes, vaut $4{,}0$ ; bande à 3 σ sur un rapport d'écarts-types à 20 tirages : **$[2{,}0 ; 8{,}0]$** | un bruit **indépendant de la population** (même écart relatif partout) doit rougir |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **chrominance**, pas en luminance — ADR 0041, cinquième scène) ; aucune construction ; aucune case vidée ; aucune lecture-réponse dans le DOM ; aucun bouton de course | après l'engagement : la construction apparaît et l'accent avec |
| `fenetre-s1` | S1 : la courbe tracée s'arrête à $10{,}0$ j ($\le 2$ px) et l'axe n'est gradué que jusque-là ; le curseur ne dépasse pas $10{,}0$ j | une fenêtre à 32 j en S1 doit rougir — **c'est la condition de non-fuite du §2.3** |
| `un-seul-echantillon` | S1 à S4 : **une seule** courbe dans le canvas ; S3 : **une seule** grille | une seconde courbe avant S5 doit rougir |
| `case-ne-se-rallume-pas` | sur toute une course, aucune case ne repasse de vide à pleine | une case qui scintille doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucune boucle) · `etapes` (chaque étape
pose son état, n'ouvre que **son** contrôle, les autres **absents du DOM** ; l'appareil
d'une autre étape — grille, second axe, seconde courbe — absent lui aussi) · `paris`
(3 ou 4 choix, exactement un juste, un `retour` par choix, rien dans la région live avant
l'engagement) · `fuite-inter-etapes` (§7.6 : la porte **écrit elle-même** la table « quel
réglage atteint quel état » contre le descripteur, et vérifie en particulier que
`fenetre_j` vaut **10** en S1 et que `isotope` n'est ouvert **qu'**en S5) · `frontiere`
(aucune des chaînes interdites du §9 dans le panneau ouvert) · `eclairs` (aucune fenêtre de
10° ne s'éclaire plus de trois fois par seconde pendant une course — **attendu
structurellement vide**, mesuré quand même, §6) · `sans-mouvement`
(`prefers-reduced-motion` : la scène calcule sans animer et montre l'image finale ; le
bouton « Image finale » existe pour tous) · `katex` (aucun LaTeX brut visible ; $\lambda$,
$\tau$, $t_{1/2}$ rendus) · `etiquettes` (aucune étiquette n'en chevauche une autre, n'est
barrée par un trait, ni ne sort du cadre — à 1 280 **et** à 390 px ; pièce commune
`disposer`) · `ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs` : ouvrir,
parier, avancer, revenir **au clavier** sans perdre le focus ; toute cible $\ge 44$ px ;
chaque contrôle porte son `scroll-margin-top`, **vérifié en donnant le focus**) · `console`
(aucune erreur) · `performance` (`data-facteur-temps` mesuré **contre l'horloge**, page au
premier plan — leçon n°6 de la porte de la cuve ; sinon **AVERTISSEMENT-vu**, jamais un
vert muet).

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette
commande** (ADR 0034). Sabotages à outiller, un par famille :

1. poser $p = \lambda\Delta t$ au lieu de $1 - e^{-\lambda\Delta t}$ → **`nombres` (N8)
   seule** — *et c'est tout l'intérêt : aucune famille statistique ne le voit* (§11.1) ;
2. calculer la demi-vie en $1/\lambda$ (oubli du $\ln 2$) → `crochet-invariant`,
   `nombres` (N4, N5) ;
3. faire dépendre la largeur du crochet de $N(t_1)$ → `crochet-invariant` **seule** —
   c'est la misconception `noyau-vieillit` posée dans le code ;
4. ouvrir S1 avec `fenetre_j: 32` → `fenetre-s1`, `fuite-inter-etapes` **seules** ;
5. éteindre **exactement** la moitié des cases à chaque demi-vie (le défaut du média animé
   de R3, réimplanté) → `tirage-vivant` **seule** ;
6. biaiser le tirage de 20 % → `tirage-juste` ;
7. donner à toutes les populations le même écart **relatif** → `dispersion-decroit`
   **seule** ;
8. tracer une décroissance linéaire → `courbe-juste`, `lecture-t-demi` ;
9. passer l'axe vertical en échelle logarithmique → `axes-lineaires`, `frontiere` ;
10. afficher la construction (ou `duree-de-moitie`) avant le pari → `avant-pari` ;
11. faire de l'activité $a = N$ (mêmes graduations) → `nombres` (N2) **seule** — c'est la
    misconception `confond-activite-nombre-noyaux` posée dans le code ;
12. ouvrir `isotope` à l'étape 4 → `fuite-inter-etapes` ;
13. ajouter au panneau une ligne « on résout $dN/dt = -\lambda N$ par la méthode d'Euler »
    ou « noyau fils » → `frontiere` ;
14. rallumer une case en fin de course → `case-ne-se-rallume-pas`, `eclairs` ;
15. importer `three` dans le module de la scène → `pas-de-3d`.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui
le garde : si le sabotage 3 fait aussi rougir `courbe-juste`, c'est que les deux familles
mesurent la même chose et qu'il faut en resserrer une.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée de la cuve, §13 question 3) :

```json
"courbe-et-noyaux": {
  "temps": false,
  "course": true,
  "dimension": "2d",
  "controles": ["instant", "depart", "population", "grandeur", "isotope"],
  "etat": ["t_demi_j", "instant_j", "depart_j", "population_n", "grandeur", "support", "fenetre_j"],
  "bornes": {
    "instant_j": [0, 10],
    "depart_j": [0, 24]
  },
  "valeurs": {
    "t_demi_j": ["8", "4"],
    "population_n": ["64", "256", "1024"],
    "grandeur": ["noyaux", "activite"],
    "support": ["courbe", "grille"],
    "fenetre_j": ["10", "32"]
  },
  "lectures": ["instant", "noyaux", "activite", "fraction", "depart",
               "restants-depart", "duree-de-moitie", "demi-vie", "lambda",
               "tau", "population", "restants-comptes", "ecart-relatif"]
}
```

*`t_demi_j`, `population_n` et `fenetre_j` sont des énumérations de **chaînes**, exactement
comme `v_ms` dans la corde, `f_hz` dans la cuve et `force` dans le manège : des crans,
aucune valeur intermédiaire, **aucune machinerie nouvelle** dans `validate-content`.*

**Table des états, à recopier dans le descripteur :**

| étape | `support` | `fenetre_j` | `t_demi_j` | `grandeur` | `instant_j` | `depart_j` | `population_n` | contrôle neuf | `revele_apres_course` |
|---|---|---|---|---|---|---|---|---|---|
| S1 | `courbe` | `10` | `8` | `noyaux` | 0 | 0 | — | `instant` | — |
| S2 | `courbe` | `32` | `8` | `noyaux` | 0 | **16** | — | `depart` | — |
| S3 | **`grille`** | `32` | `8` | `noyaux` | 0 | 0 | **`64`** | `population` | **1** |
| S4 | `courbe` | `32` | `8` | `noyaux` | 0 | 0 | — | `grandeur` | — |
| S5 | `courbe` | `32` | `8` | `noyaux` | 0 | 0 | `256` | `isotope` | — |

**Point à vérifier avec `validate-content` avant tout code** (question 4, §13) : la scène
déclare `course: true` mais **une seule** de ses cinq étapes porte `revele_apres_course`.
Le validateur accepte-t-il une scène à course **mixte** ? Si non, deux replis, dans
l'ordre de préférence : (a) assouplir le validateur (`revele_apres_course` facultatif par
étape sur une scène à course) ; (b) donner aux quatre autres étapes une « course » de durée
nulle, ce qui serait un mensonge de descripteur — **à refuser**.

**Ordre de construction, et ce qui doit être vert avant l'étape suivante :**

1. `items.yaml` — déclarer `loi-population-vs-noyau` (§8.2) et écrire DECRO-32/33/34
   (§8.3) ; régénérer `coverage_summary`. **`validate-content --strict` vert avant la
   suite** (la scène ne validera pas sans le modèle).
2. `web/src/lib/scene2d/noyaux-modele.ts` — la loi (forme fermée) **et** le tirage
   (Bernoulli, $p = 1 - e^{-\lambda\Delta t}$), sans aucun rendu, avec `data-p-pas` exposé.
   Un test unitaire : $(1-p_A)^{32} = 0{,}5$ à $10^{-12}$.
3. `web/src/lib/scene2d/noyaux-rendu.ts` — la courbe graduée, le crochet, la grille ;
   palette lue dans les jetons (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui
   importerait three).
4. `scenes.json` + le descripteur `media/courbe-et-noyaux.json`.
5. Les quatre retouches de prose (§4), **le §4.1 avant le marqueur**.
6. `web/scripts/scene-noyaux.mjs` — la porte, **avec son `--essai-rouge`** ; lancée deux
   fois à quatre largeurs avant d'être crue.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut

1. **Le vingtième modèle de misconception** (§8.2) : ouvrir `loi-population-vs-noyau` avec
   ses trois items, ou amender `division-lineaire-demi-vies` ? **Recommandation : ouvrir.**
   C'est le seul modèle du chapitre qui coche la bonne réponse **partout** dans le corpus
   actuel, et c'est le seul que le produit **enseigne activement à l'envers** (le média de
   R3 montre exactement la moitié). Décision humaine : elle touche l'inventaire et un
   `coverage_summary` généré. *Réversible : trois étiquettes d'items, deux choix de paris,
   une `description` à amender.*
2. **Les bornes de `instant` à $[0\ ;\ 10]$ jours partout** (§5.3), y compris en S5.
   **Recommandation : garder.** C'est ce qui rend la non-fuite S1 → S2 **structurelle** au
   lieu d'être une promesse. Le coût est réel et petit : en S5, le curseur fin ne va pas
   au-delà de dix jours. L'alternative — une borne par étape — demande un champ que le
   registre n'a pas.
3. **`tool: "scene2d"` et le nom du dossier.** Question héritée des specs de la cuve et de
   la corde : faut-il renommer `web/src/lib/scene3d/` (+ `scenes.json`) en `scene/` ?
   **Recommandation :** oui, mais dans un commit mécanique **séparé**, jamais dans celui de
   la scène.
4. **Une scène à course MIXTE** (§12) : une seule étape sur cinq porte
   `revele_apres_course`. **Recommandation : assouplir le validateur**, et surtout
   **vérifier ce point avant d'écrire une ligne de rendu** — c'est le seul endroit où cette
   scène sort du gabarit des sept précédentes.
5. **Le second échantillon de S5 n'est pas nommé** (§10.6) : « un autre isotope, de $\lambda$
   deux fois plus grande », $t_{1/2} = 4{,}0$ j. **Recommandation : garder l'anonymat.**
   Aucun nuclide du programme n'a une demi-vie de $4{,}0$ jours exactement, et inventer un
   nom serait la seule contre-vérité de la scène. Si le propriétaire préfère un nuclide
   réel, il faut accepter une demi-vie non ronde (le radon 222 : $3{,}8$ j, valeur que
   `docs/sujets/pc/decroissance-radioactive.md` l. 33 atteste pour 2019 N) — et alors
   $\lambda_B/\lambda_A = 2{,}11$, ce qui affaiblit le pari « deux fois ».
6. **Le placement en tête de R4** (§3), qui fait ouvrir le chapitre par un manipulable et
   impose de donner $N_0$ et la définition de la demi-vie **dans la consigne** avant que la
   prose ne les écrive. **Recommandation : garder.** C'est le seul placement qui laisse
   quatre paris entiers.
7. **La tension avec R3** (§3, tension n°1) : faut-il **déplacer** le paragraphe
   « sans mémoire » (`lesson.md:150-152`) après la scène ? **Recommandation : non.** Il
   répond à `cp-r0-predict`, qui est à R0 : le laisser en suspens sur tout un chapitre
   serait pire. S2 demande une **durée**, pas le principe, et ses quatre distracteurs sont
   construits pour attraper l'élève qui a retenu la phrase sans l'avoir comprise.
8. **Une règle générale née ici, à graver ou à garder en spec** (§5.2) : *une scène peut
   porter **deux voies de calcul** — analytique et stochastique — à condition que chaque
   lecture déclare de laquelle elle vient, et que la porte applique à chacune son exigence
   (nombres exacts recalculés pour l'une, invariants pour l'autre).* Corollaire mesuré,
   qui vaut d'être écrit : **« deux courses diffèrent » se mesure sur le MOTIF, jamais sur
   le COMPTE** (deux courses donnent le même compte environ 3 % du temps — une porte
   instable est pire qu'une porte absente). Mérite-t-elle un addendum à l'ADR 0041 ?
9. **La prochaine scène est déjà nommée : `pc/lois-de-newton`** (§0). Deux `savoir_faire`
   du cadre y sont à **0 %** — la base de **Freinet** et le produit $\vec a \cdot \vec v$
   pour la nature du mouvement — dans le sous-domaine le plus lourd de l'examen (**27 %**).
   L'idée est plane (un point sur une trajectoire, deux vecteurs, une décomposition) : une
   scène **2D**, pas une 3D. **Recommandation : l'inscrire comme candidate**, ne pas la
   construire maintenant.
10. **Couper une étape ?** Si le propriétaire veut une scène à quatre étapes, la
    **coupable en premier est S4** (`ce-que-compte-le-detecteur`) : son modèle
    (`confond-activite-nombre-noyaux`) est déjà servi par `cp-r4-activite-noyaux` et par
    trois items, et son geste survit dans la `suite` de S5. Je la garde par défaut, pour
    une raison mesurée : **les deux questions « déterminer graphiquement $t_{1/2}$ » des
    annales ouvertes se lisent toutes deux sur une courbe d'ACTIVITÉ**
    (`docs/sujets/pc/decroissance-radioactive.md` l. 97 et l. 375), et sans S4 la scène
    n'entraîne jamais ce cas-là.

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/decroissance-radioactive`
  passe — **ce qui suppose que `loi-population-vs-noyau` soit déclaré dans `items.yaml` au
  moment où la scène est validée** (§8.2), sans quoi la scène part sur la voie de repli.
- `node web/scripts/scene-noyaux.mjs --porte` : **toutes** les familles vertes, sur un rendu
  réel, relancé à quatre largeurs d'écran, **au moins deux fois** (une porte statistique se
  relance : l'instabilité éventuelle est le premier défaut à chercher, et les seuils du
  §11.2 ont été choisis pour qu'elle n'en ait pas).
- `node web/scripts/scene-noyaux.mjs --essai-rouge` : **chaque** famille crie, avec le vert
  qui l'a précédée, même dossier, même commande ; et chaque sabotage ne fait rougir que la
  famille qui le garde (§11.4).
- `node web/scripts/resume-couverture.mjs` régénéré : `total_items` passe à **34**,
  `loi-population-vs-noyau` à **3**, `confond-activite-nombre-noyaux` à **4**.
- Les quatre retouches de prose (§4) sont posées **aux quatre ancres nommées**, et aucune
  ne précède le marqueur en répondant à un pari.
- `dette-manipulable` : **inchangée**. Cette scène ne solde aucune dette écrite — elle ne
  doit donc **pas** être comptée comme un paiement, et le cliquet ne bouge pas. *(Un
  cliquet qu'on desserre pour une scène qui n'acquittait aucune dette est un cliquet qui
  ment dans l'autre sens.)*
- La scène ne compte pour **livrée** que si elle est enregistrée dans `scenes.json`
  (ADR 0041 §3).
