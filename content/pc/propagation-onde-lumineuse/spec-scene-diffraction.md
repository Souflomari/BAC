# spec — manipulable 2D `banc-de-diffraction` (PC · `propagation-onde-lumineuse`, R3)

**Statut : LIVRÉE (2026-09-24, HANDOFF §11.204)** ; les réponses par défaut du §13 ont
été appliquées, chacune reste réversible. Écrite le 2026-09-24 par pedagogy-architect,
rangée d'abord sous `docs/pipeline/propositions/` tant qu'elle n'était pas construite
(DÉCISIONS §19 : dans le dossier d'une notion, `dette-manipulable` lit toute spec comme
une PRESCRIPTION), elle a rejoint le dossier de la notion dans le commit qui livre la
scène. Les chemins qu'elle nommait existent : le descripteur
`content/pc/propagation-onde-lumineuse/media/banc-de-diffraction.json`, le modèle
`web/src/lib/scene2d/diffraction-modele.ts` (et son test unitaire
`web/scripts/test-diffraction.mjs`), le rendu `web/src/lib/scene2d/diffraction-rendu.ts`,
le panneau `web/src/components/notion/scene/DiffractionPanel.tsx`, la porte
`web/scripts/scene-diffraction.mjs`.

**Ce que la construction a changé à cette spec, écrit ici plutôt que corrigé en douce :**
- **Un nombre du §7.1 était faux.** Le retour de `image-de-la-fente` disait qu'une tache
  « image de la fente » de $0{,}100$ mm serait « un dix-millième » de ce que la règle
  affiche : $0{,}100$ mm contre $24$ mm, c'est **deux cent quarante fois moins**. Corrigé
  dans le descripteur.
- **La révélation POSE le réglage que le pari interrogeait** — une clé neuve du
  descripteur, `etat_revele` (validée par `validate-content` : mêmes clés, mêmes bornes,
  jamais sans pari). Sans elle, le retour de S1 (« lis la règle : 2,40 cm ») aurait
  parlé d'un réglage que l'écran ne montrait pas encore.
- **La règle est graduée au demi-centimètre, pas au millimètre** (§5.7 disait « 10 fines
  par cm ») : à 390 px un millimètre vaut ~1,5 px — le §15.3 l'avait prévu. Chiffrée tous
  les deux centimètres (vague 2 : au centimètre, treize nombres à 1 280 px).
- **Les lectures n'existent qu'après le pari**, comme dans les neuf autres scènes : les
  valeurs de départ que le §7 voulait « visibles avant » sont dans la consigne. Et la
  lecture `distance` n'est pas doublée quand le curseur, qui porte déjà la valeur, est là.
- **Les fins du graphe ne sont tracés que s'ils restent à 5 px l'un de l'autre** : au
  téléphone, 22 traits dans 90 px faisaient un code-barres. À l'étape 3, le plateau passe
  au CARRÉ sur grand écran, et le graphe prend 55 % de la hauteur.
- **Les rayons de bord s'arrêtent à la face de la bande de l'écran** : ils y arrivent aux
  bords de la tache, et la bande reste lisible — c'est là que la porte mesure les bords.
- **Le quatrième point du `fit_caveat` rendu ne dit pas « ±1 mm »** (la frontière §9.15
  l'interdit) : « on lit la règle au millimètre près ».
- **Les noms posés sur la scène** : le laser se nomme sous son boîtier, le cheveu en haut à
  gauche de l'axe (au premier passage, « laser » chevauchait « fente » au téléphone, et
  « cheveu » l'arc de θ).
- **Le §2.1, point 4, nomme la cuve à ondes sans son marqueur** : dans le dossier d'une
  notion, `dette-manipulable` lit tout `[[embed:…]]` d'une spec comme une prescription
  faite à CETTE notion — la cuve y devenait une promesse tombée (batterie, au moment de
  livrer).
- **La porte** : `tache-et-regle` ne juge que les taches d'au moins 8 px (à $1{,}000$ mm et
  $450$ nm, la tache fait 3,4 px — ses bords ne se lisent pas au pixel ; ses nombres sont
  gardés par N1, son sens par `plus-etroite-plus-large`) ; `secondaires` exige aussi que la
  tache voisine SE VOIE (≥ 15 % du centre) — sans quoi le sabotage 20 (l'éclaircissement
  supprimé) passait ; `eclairs` et `sans-mouvement` deviennent une seule famille,
  `immobile` (rien ne bouge au repos : la scène n'a ni temps ni course).

**Ce que la vague 2 (calme, dessin, ergonomie — HANDOFF §11.204) a changé ensuite :**
- **La tache reste à l'encre, à toutes les phases.** Le §6 la voulait à l'accent après la
  révélation : c'étaient cinq taches d'accent (la centrale et quatre voisines dont la scène
  n'affirme rien) en plus des rayons, de l'arc et du crochet. L'accent marque ce qui
  RÉPOND — l'éventail, θ, le crochet L, les points du graphe.
- **L porte sa valeur sur la scène** (« L = 2,40 cm », comme « D = 2,00 m » sur la cote) :
  la scène collante reste sous les yeux quand on règle, la liste des lectures non.
- **La consigne de S1 ouvre sur les nombres** ; l'avertissement du symbole de fente vit
  dans la légende et l'encadré, la présentation du banc dans la leçon, juste au-dessus.
  Le retour juste de S1 s'arrête à θ (la phrase de la fenêtre était une troisième idée) ;
  celui de S3 garde la conversion $a = 6{,}0\times10^{-5}$ m, sans la substitution en
  fractions empilées (la lecture « longueur d'onde déduite » donne le résultat).
- **S5 : cinq lectures, pas huit** — ni « bords » ni « rapport » (restes de S1 et S3), la
  pente seulement quand la droite est à l'écran, $L/(2D)$ juste sous θ ; et la suite dit
  « $L/(2D)$ ne bouge pas » (la lecture qui existe), non plus « $L/D$ ». À l'étape libre,
  les lectures PRÉCÈDENT les quatre groupes de réglages.
- **Le plateau est carré aussi au téléphone quand le graphe est là** (`carre-partout`, et
  la marge du focus qui suit : `MARGE_FOCUS_CARRE`) : en 4:3, l'axe de L tenait en ~70 px.
- **La règle est chiffrée tous les deux centimètres** tant qu'un centimètre fait moins de
  28 px (13 nombres à 1 280 px) ; le texte du dessin passe de 11 à 12 px ; les traits forts
  du graphe à 3,6:1 (2,9:1 à l'opacité 0,6) ; le titre « D (cm) » sous la rangée des
  nombres, où il tombait sous « 200 ».
- **La révélation dit le réglage qu'elle pose** au lecteur d'écran ; le curseur de D ne
  parle qu'une fois par cran (L dans son `aria-valuetext`).

**Ce que ce document est.** Le cadrage pédagogique complet d'un manipulable PLAN
de première partie (ADR 0041, `"tool": "scene2d"`, mêmes pièces que la cuve, la
corde et les noyaux) : sa justification mesurée, sa frontière officielle, son
placement, ses cinq étapes à pari, ses contrôles, ses lectures avec leurs unités
et leur précision, la liste de ce qui ne doit pas être à l'écran avant chaque
pari, les lignes d'honnêteté, un huitième modèle de misconception avec ses
items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la
prose finale, ni les items finaux. Le descripteur est de content-author, le rendu
et le registre de frontend-builder, les items d'item-author.

Marqueur : `[[embed:banc-de-diffraction]]` · clé de registre : `banc-de-diffraction` ·
sélecteur de porte : `[data-scene="banc-de-diffraction"]`.

---

## 0. Le classement — pourquoi cette notion, et pourquoi pas l'autre

`content/pc/propagation-onde-lumineuse/` **ne porte aucun `spec.md`** (dossier
listé : `lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`,
`exercises.yaml`, `REVIEW-2026-09-20.md`). Aucune spec n'y a donc jamais prescrit
d'`[[embed:]]` : cette scène **ne solde aucune dette écrite**, et elle doit se
justifier **entièrement** par un trou **mesuré** (même règle qu'aux §23 et §24 de
`DECISIONS-EN-ATTENTE`). Voici les quatre candidates pesées, et la mesure de
chacune.

| notion | poids cadre | entrées de banque (annales) | trou MESURÉ, avec son fichier | manipulation ? |
|---|---|---|---|---|
| **`propagation-onde-lumineuse`** | **ondes 11 %** (rang 3 phys.) | **5** — 2012 R, 2015 N, 2021 N, 2023 R, 2025 R (`bank.yaml`), dont **4 lisent une figure** (`docs/audits/lectures-graphiques.md` : 9, 6, 3 et 1 mentions, **3 sur 4 « source rouverte : non »**) | **cinq faits, tous vérifiables en une commande** — (a) **aucun `[[embed:]]` dans `lesson.md`** ; (b) `media/diffraction-fente.svg` porte **zéro valeur numérique** et un angle **exagéré d'un facteur 54**, que **rien à l'écran ne déclare** (l'aveu vit dans un commentaire SVG) ; (c) `exercises.yaml:98` **donne la lecture** que sa propre q6 réclame — idem `bank.yaml:376` ; (d) **`habilete` : 0 occurrence dans `items.yaml`** et les **5** points d'arrêt sont **tous** `utilisation` → application expérimentale **0 %**, cible **15 %** ; (e) le savoir-faire « **proposer un montage** » : le mot *montage* n'apparaît **pas une fois** dans `lesson.md` | **oui, et quatre gestes distincts** : rétrécir la fente, changer de laser, **reculer l'écran**, remplacer la fente par un fil. Aucune figure étagée n'en rend un seul. |
| `lois-de-newton` | **méca 27 %** (rang 1) | 1 (+1 incertain) | `REVIEW-2026-09-12` : « trois `savoir_faire` du cadre ne sont couverts **nulle part** : la base de **Freinet** (`grep` ⇒ 0), le produit $\vec a\cdot\vec v$, les équations aux dimensions » | oui — **inscrite comme candidate suivante** par `spec-scene-noyaux.md` §13.10 |
| `ondes-em-modulation` | élec **21 %** | 4 | `REVIEW-2026-09-12` : « aucun des 24 items ne rend de figure, aucun n'exerce la lecture d'oscillogramme — geste exigé par 7 sujets réels sur 7 » | **bloqué** : BLOQUANT propriétaire non tranché ($F_p = 2$ kHz publié contre $1003 \pm 15$ Hz mesuré, « 2 kHz est à 66 σ ») **et** conflit de modèle non arbitré ($m = S_m/U_0$ contre $m = S_m/P_m$) |
| `dipole-rl` | élec **21 %** | 4 | `REVIEW-2026-09-12` F6 : « la leçon travaille vers l'avant ($R, L \to \tau$), les 10 sujets travaillent en arrière » | la même exponentielle est **déjà manipulée à côté** (`rc-sandbox`, `rlc-sandbox`) ; notation en arbitrage ouvert ($R$ totale contre $R$ conducteur) — chaque étiquette serait en litige |

**Pourquoi la gagnante gagne.** Quatre raisons, dans l'ordre de leur force.

1. **Le critère du §1 de l'ADR 0041 est rempli au mot près, et sur la
   misconception la plus servie du chapitre.** L'idée est **spatiale** : $\theta$
   est un **angle**, ouvert à la fente ; $L$ est une **longueur**, lue sur
   l'écran ; le triangle qui les relie est toute la question. Les items disent
   exactement où ça casse — POL-14 D, POL-21 D et `cp-r3-diffraction` D portent
   tous les trois « $\theta$ dépend de $D$ ». Or **reculer l'écran le long d'un
   éventail qui ne bouge pas** est un geste qu'aucune figure plane ne fait : la
   figure montre UN écran, à UNE distance. La scène montre l'éventail **fixe** et
   l'écran qui glisse dedans.
2. **Le trou n'est pas une absence, c'est une contradiction.** La seule figure de
   diffraction du corpus (`media/diffraction-fente.svg`) dessine un angle de
   $0{,}1622$ rad là où l'exemple travaillé de la même page calcule
   $3{,}00\times10^{-3}$ rad — **54 fois plus** — et les quatre légendes rendues
   (`diffraction-fente.stages.json`) **ne le disent nulle part**. La même figure
   dessine $L/a = 3$ là où l'exemple donne $L/a = 60$ (120 px contre 40 px ;
   $12\ \text{mm}/0{,}2\ \text{mm} = 60$). Et `exercises.yaml:98` écrit
   « on peut y lire, par exemple, $L = 2{,}4\ \text{cm}$ pour $D = 120\ \text{cm}$ »
   **juste avant** de demander « en exploitant cette courbe, montrer que
   $\lambda = 600$ nm » : la lecture graphique la plus fréquente du chapitre est
   posée, et sa réponse est écrite sur la ligne au-dessus. *Exactement le défaut
   que la spec des noyaux avait trouvé dans `decroissance-radioactive` — et il
   est ici sur un sujet **vérifié**.*
3. **Un TP listé par le cadre, sans aucun instrument dans le dépôt.**
   `travaux_pratiques` du sous-domaine `ondes` : « **Diffraction des ondes
   lumineuses ; vérifier $\theta = \lambda/a$.** » Le corpus n'a ni règle, ni
   mesure, ni tableau de mesures pour ce chapitre — et le champ `habilete` est
   **absent des 22 items**, tandis que les 5 points d'arrêt sont **tous**
   `utilisation`. Application expérimentale mesurée : **0 %**.
4. **Elle ne double pas la cuve à ondes.** `pc/ondes-mecaniques-periodiques` R5
   porte déjà la scène `cuve-a-ondes`, qui traite la diffraction **mécanique**,
   **qualitative** : la condition $a \lesssim \lambda$, ce que l'onde conserve
   ($f$, $\lambda$, $c$), le récepteur sur un arc. Son `boundary` l'écrit :
   « **aucune relation quantitative de diffraction (ni $\theta$, ni
   $\theta = \lambda/a$ — chapitre de l'onde lumineuse), aucune largeur angulaire
   affichée en nombre** ». La cuve s'est **interdit** ce que cette scène doit
   faire. Les deux se tiennent par la main sans se recouvrir : la cuve installe
   la comparaison, le banc la chiffre.

**Pourquoi la dauphine perd — et l'honnêteté du solde.** `lois-de-newton` porte
**plus de poids d'examen** (27 % contre 11 %) et elle était **déjà inscrite**
comme candidate suivante. Si le propriétaire veut le poids avant tout, elle
gagne. Mais son trou est un trou de **couverture** — trois savoir-faire
*absents* — et un manipulable ne referme pas une absence : il faut d'abord de la
**prose** et des **items**. Construire la scène avant le contenu qu'elle
illustrerait, ce serait décorer un vide. Ici, au contraire, le contenu existe,
il est dense (22 items, 5 points d'arrêt, 5 entrées de banque, 2 exercices de
sommet) et c'est **l'instrument** qui manque.

*Écrit à côté de ce qui est armé (ADR 0035) :* `ondes-em-modulation` a le
meilleur poids et le geste d'examen le plus absent, et elle reste **bloquée** par
deux décisions de propriétaire ; la construire maintenant serait bâtir une porte
sur un désaccord.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`ondes`** →
  **`onde_lumineuse`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 71–83).
- **Poids :** `poids: { part_examen: 11, rang_physique: 3 }` (cadre p. 18).
  **Habiletés du sous-domaine** (cadre p. 19, le 50 / 15 / 35 de l'examen appliqué
  aux 11 %) : **utilisation 5,5 %**, **application expérimentale 1,65 %**,
  **résolution de problème 3,85 %**. *C'est la cible chiffrée que l'item-author
  doit viser et que le critique de fidélité au bac doit mesurer.*
- **`programme` du chapitre** (cadre p. 20) : « **Mise en évidence expérimentale
  de la diffraction de la lumière** ; modèle ondulatoire ; propagation dans les
  milieux transparents (indice, dispersion par un prisme). »
- **`savoir_faire` que la scène sert** (cadre p. 6) :
  - « Savoir que la lumière a un aspect ondulatoire (diffraction) ; **influence de
    la dimension de l'ouverture/obstacle** ; exploiter un document/figure de
    diffraction. » — **S1, S2, S4**. *Noter « ouverture**/obstacle** » : le fil
    est dans le cadre, explicitement.*
  - « **Connaître et exploiter $\theta = \lambda/a$ (unité et signification de
    $\theta$ et $\lambda$) ; exploiter des mesures pour vérifier
    $\theta = \lambda/a$.** » — **S1, S2, S3, S5**. *C'est la ligne que la notion
    n'exerce nulle part par une mesure : les six items de diffraction sont tous
    des applications directes de la formule.*
  - « Proposer un montage de mise en évidence de la diffraction de la lumière. »
    — **la scène EST ce montage** ; le mot *montage* est **absent de
    `lesson.md`** (mesuré).
  - « Connaître et exploiter $\lambda = c/\nu$ » · « $n = c/v$ » · mono/poly-
    chromatique · spectre visible : **hors scène** (R2, R4, R5).
- **`travaux_pratiques` du sous-domaine** (cadre p. 26) : « **Diffraction des
  ondes lumineuses ; vérifier $\theta = \lambda/a$.** » La scène n'est **pas** un
  TP et ne prétend jamais l'être (§10.4) — elle en répète le **geste**.
- **`limites` portées en dur** (l. 82-83) :
  > « **Diffraction traitée via $\theta = \lambda/a$ (demi-largeur angulaire de la
  > tache centrale), de façon qualitative/expérimentale. Pas d'intégrale de
  > diffraction, pas de réseaux.** »

  Deux conséquences, non négociables :
  1. **$\theta$ est la DEMI-largeur angulaire** — de l'axe jusqu'au **bord** de la
     tache centrale. La scène l'écrit ainsi partout, et c'est ce qui donne
     $L/2 = D\theta$, donc $L = 2\lambda D/a$. *Point de fidélité à signaler :
     `lesson.md:99` écrit « s'étale sur un écart angulaire $\theta$ » sans dire
     **demi** — la ligne 121 le rattrape (« la **moitié** de la largeur… vaut
     $D\theta$ »), les quatre entrées de banque l'écrivent explicitement
     (« $\theta$ est le DEMI-angle »), et les deux figures du bac le dessinent
     entre l'axe et le bord. Retouche proposée au §4.2.*
  2. **Aucune intégrale de diffraction.** Le profil lumineux est un **choix de
     RENDU**, jamais un contenu : aucune formule d'intensité n'est affichée,
     nommée, ni mesurée à l'écran (§9.3, §10.5).
- **`exclusions` du sous-domaine portées en dur** (l. 91–96) :
  **interférences lumineuses (Young, interfrange, cohérence)** · **effet
  Doppler** · **réseaux de diffraction** · **équation de propagation /
  résolution de l'équation d'onde** · **polarisation de la lumière**.
  La première et la troisième mordent ici : la scène ne montre **jamais** deux
  fentes, ne prononce **jamais** « frange », « interfrange », « ordre $k$ »,
  « réseau » (§9.1, §9.2).
- **Frontière interne à la leçon, aussi dure que celle du cadre :** la scène est
  en tête de **R3** ; elle **n'entre pas** dans R4 (couleur, $\lambda_0$,
  $\nu$ invariante, $\lambda = \lambda_0/n$) ni dans R5 (prisme, dispersion).
  Tout s'y passe **dans l'air**, avec des lasers. C'est ce qui interdit — et
  c'est un vrai renoncement — l'étape « on plonge le montage dans un liquide »
  du sujet **2025 R** (§2.5).

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les quatre médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `cloche-a-vide-son-lumiere` | R0 | la clochette sous cloche | hors sujet ici |
| **`diffraction-fente`** (4 étapes) | **R3** | le montage ; la prédiction de l'optique géométrique ; l'étalement $\pm\theta$ ; l'écran, $L$ et $D$ | **aucune valeur numérique** : les seuls textes sont `λ`, `a`, `D`, `L`, `θ` et deux phrases · **l'angle est exagéré d'un facteur 54** ($0{,}1622$ rad dessiné contre $3{,}00\times10^{-3}$ rad calculé quinze lignes plus bas) et **aucune des quatre légendes rendues ne le dit** — l'aveu est dans un commentaire SVG, que l'élève ne lit pas · **$L/a$ dessiné à 3** (120 px / 40 px) là où l'exemple travaillé donne **60** · **rien ne varie** : ni $a$, ni $\lambda$, ni $D$ |
| `lambda-nu-changement-milieu` | R4 | $\lambda_0$, $\nu$, $n$ | hors sujet ici |
| `dispersion-prisme` | R5 | le prisme et son spectre | hors sujet ici |

**Ce que la figure de R3 fait très bien, et qu'il ne faut pas casser :** elle
oppose la prédiction géométrique (étape 2) au phénomène réel (étape 3). C'est le
bon geste d'enseignement. **Ce qu'elle ne peut pas faire**, et c'est le trou :
rien n'y bouge, aucun nombre n'y est lisible, et **son échelle ment sans le
dire**.

### 2.2 Le motif central : un ÉVENTAIL qui ne bouge pas, un écran qui recule

Le point que la scène existe pour installer :

> L'éventail sort de la fente avec une ouverture **fixée par la fente et par la
> couleur**, et par rien d'autre. Reculer l'écran ne l'ouvre pas davantage : cela
> l'intercepte **plus loin**. C'est pourquoi $L$ double quand $D$ double, et
> pourquoi $\theta$, lui, ne bouge pas d'un millionième de radian.

C'est exactement ce que trois distracteurs du corpus nient (POL-14 D, POL-21 D,
`cp-r3-diffraction` D : « $\theta$ ne dépend que de $D$ » / « c'est $D$ qui
détermine l'écart angulaire »). Un éventail immobile dans lequel un écran glisse,
avec deux rayons de bord qui ne bougent pas et un crochet $L$ qui s'allonge :
**c'est ce qu'une figure ne peut pas montrer et qu'un curseur montre en trois
secondes.** Et la porte le mesure en pixels, dans les deux sens (§11.2,
`eventail-fixe`).

### 2.3 L'antidote obligatoire : une formule construite en trois temps

Même structure que la cuve (S1 la fente, S2 la longueur d'onde) et que les
noyaux (S1 installe, S2 borne) — mais poussée plus loin, parce qu'ici la formule
est un **produit de trois dépendances** et qu'un retour trop bavard les donnerait
toutes d'un coup :

- **S1** établit $a$ : la tache est **inversement** proportionnelle à la largeur
  de la fente. Le retour écrit *« $a$ au dénominateur »*, **et rien de plus**.
- **S2** ajoute $\lambda$ : le retour peut alors écrire $\theta = \lambda/a$.
- **S3** ajoute $D$ : le retour écrit enfin $L = 2\lambda D/a$ **entière**.

**Contrainte non négociable, et elle est mesurable :** la chaîne `2λD` ne doit
apparaître **nulle part** dans le panneau avant la révélation de S3, et `λ/a` pas
avant celle de S2. Sans cela, le retour de S1 donne les réponses de S2 et de S3
— une fuite qui ne passe ni par un affichage, ni par un réglage, mais par le
**TEXTE** (troisième forme de la fuite, après celle du solide de révolution et
celle du manège). La porte la garde : §11.2, `formule-graduee`.

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

Cinq entrées de banque, cinq fois le même montage, et **deux gestes** que les
items n'exercent jamais :

- **Lire une pente.** `bank.yaml:376` (2021 N q6) : « on peut lire, par exemple,
  $L = 2{,}4\ \text{cm}$ pour $D = 120\ \text{cm}$ » — puis la question demande
  d'exploiter la courbe. `exercises.yaml:98` fait la même chose, mot pour mot.
  **La lecture est donnée ; il ne reste que la division.** S3 rend le geste :
  l'élève pose lui-même les points et lit lui-même la pente.
- **Mesurer un objet invisible.** `exercises.yaml:108` (q7, cheveu) et
  `bank.yaml` (2012 R q4, fil métallique) : $d = 2\lambda D/L$. Le corpus le
  **calcule** ; personne ne le **mesure**. S4 pose le cheveu à la place de la
  fente, et l'élève lit $L$ sur la règle avant de conclure.

Et le troisième geste, celui du cadre : « **exploiter des mesures pour vérifier
$\theta = \lambda/a$** ». S5 affiche côte à côte $\lambda/a$ et $L/(2D)$, calculés
depuis deux bouts différents de la chaîne. *Leur égalité est construite, pas
découverte — et c'est écrit au §10.4.*

### 2.5 Quatre idées volontairement écartées

- **Le montage plongé dans un liquide (2025 R), ÉCARTÉ par le placement.**
  `bank.yaml:820` : même laser, même fente, même $D$, et $L$ divisée par $n$ —
  un pari magnifique, qui relie la diffraction à $\lambda = \lambda_0/n$. Mais
  $\lambda = \lambda_0/n$ est **R4**, après. Une étape qui l'emploierait
  enseignerait R4 dans R3. *Renvoyé au propriétaire : §13.5 propose une
  **sixième** étape, placée dans R4, comme extension.*
- **La couleur peinte sur la tache, ÉCARTÉE par le contrat de calme.** ADR 0041
  §4 : les couleurs sont **lues sur les jetons `--figure-*`** et « l'accent marque
  une seule chose ». Peindre une tache rouge et une tache bleue ferait entrer
  deux teintes hors jetons, et — pire — inviterait à lire la cause dans la
  couleur (« le rouge est plus gros ») au lieu du nombre. Le laser est nommé
  (« rouge, 650 nm ») ; sa tache est à l'accent, comme tout le reste. *§13.3.*
- **Le critère chiffré $\lambda/a > 10^{-3}$, ÉCARTÉ faute de source de leçon.**
  Le corrigé arabe de 2012 R l'écrit (`docs/sujets/_incoming/pc-2012-r.md`
  l. 1386 : « le critère usuel du programme $\frac{\lambda}{a} > 10^{-3}$ »), mais
  **ni le cadre ni `lesson.md` ne le posent**. L'introduire serait élargir le
  programme depuis un corrigé. Chaîne interdite dans le panneau (§9.10) et
  question au propriétaire (§13.6).
- **Le profil d'intensité comme objet d'étude, ÉCARTÉ par la `limite` du cadre.**
  La scène **dessine** un profil (il faut bien peindre quelque chose), elle ne
  l'**enseigne** pas : aucune formule, aucun nom, aucune lecture d'intensité,
  aucune largeur de tache secondaire affichée (§9.3). *La porte, elle, a le droit
  de mesurer où tombent les zéros — règle de la cuve.*

---

## 3. Placement

**En tête de `## R3 — La diffraction de la lumière`** (`lesson.md:87`), entre le
titre et `### Le phénomène, et sa condition` (`lesson.md:89`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:banc-de-diffraction]]
```

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la
prose qui explique*). Chaque sous-section de R3 répond à un pari :

| étape | la prose (ou le point d'arrêt) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| S1 — fente ÷ 2 ⇒ tache × 2 | « plus l'ouverture $a$ est petite comparée à $\lambda$, plus l'écart angulaire $\theta$ est grand » + « Arrête-toi — plus l'ouverture est grande, MOINS on diffracte » | R3, `:103` et `:131` | ❌ non |
| S2 — même fente, autre laser | rien d'explicite dans R3 ; $\lambda$ au numérateur de `:101` ; POL-14 | R3, `:101` | ❌ non |
| S3 — l'écran qui recule | l'exemple travaillé $L/2 = D\theta$ | R3, `:121-125` | ❌ non |
| S4 — le cheveu | « ou l'obstacle (un fil très fin) » — **nommé, jamais exploité** | R3, `:93` | ❌ non |
| S5 — la synthèse | le récapitulatif de R6 | R6, `:242` | ❌ non |

**Le seul placement qui laisse les cinq paris entiers est la tête du chapitre.**
Le point d'arrêt `cp-r3-diffraction` (`:133`) est **après** : il devient la
reprise de ce que la scène a montré — et la `REVIEW-2026-09-20` §2 signale qu'il
porte un **indice de discrimination de 1,00**, le meilleur du corpus. **Il ne
doit pas bouger d'un caractère.**

**Les deux tensions réelles, écrites plutôt que maquillées.**

1. **La cuve à ondes a déjà installé la condition, sur l'eau.** Un élève qui a
   fait `pc/ondes-mecaniques-periodiques` R5 sait déjà qu'une ouverture plus
   étroite étale **plus**. S1 ne re-pose donc **pas** la question qualitative :
   elle demande un **facteur** (« deux fois plus large ? deux fois plus étroite ?
   quatre fois ? »), et ses quatre choix sont construits pour attraper l'élève
   qui a retenu le sens sans le rapport. *C'est aussi pourquoi la consigne de S1
   renvoie explicitement à la cuve : la continuité est un acquis, pas un risque.*
2. **La consigne de S1 doit poser le vocabulaire que la prose n'a pas encore
   écrit** — fente, écran, tache centrale, largeur $L$. C'est le même prix que la
   scène des noyaux a payé en tête de R4 (donner $N_0$ et la définition de la
   demi-vie dans la consigne). Il est acceptable ici parce que ces mots sont
   **descriptifs** (ce qu'on voit) et non **explicatifs** (pourquoi on le voit).

---

## 4. Les retouches de prose (texte prêt à insérer)

**Interdit dans ces retouches :** ne rien écrire, **avant** le marqueur, qui
réponde à un pari (§7.6). 4.1 est **avant** et strictement neutre ; 4.2 à 4.5
sont **après**.

### 4.1 Le paragraphe d'annonce, juste avant le marqueur

*À insérer après le titre `## R3 — La diffraction de la lumière` (`lesson.md:87`),
suivi de la ligne du marqueur, le tout avant `### Le phénomène, et sa condition`
(`lesson.md:89`).*

> Avant de lire ce chapitre, va le chercher. Ci-dessous, un banc d'optique vu en
> coupe : un laser, une plaque percée d'une fente fine, et un écran sur lequel on
> peut poser une règle graduée. Tu as déjà vu, dans la cuve à ondes, ce qu'une
> ouverture étroite fait à des rides sur l'eau. Ici, c'est de la lumière, et on
> va **mesurer** : la largeur de la fente en millimètres, celle de la tache en
> centimètres, la distance à l'écran en mètres. Tu paries d'abord, le banc répond
> ensuite.

*(Neutre exprès : il décrit l'appareil et les unités. Il ne dit ni ce qui se
passe quand la fente rétrécit, ni ce que fait la couleur, ni ce que fait la
distance, ni ce qu'un fil donnerait.)*

### 4.2 $\theta$ est une DEMI-largeur — la ligne de fidélité au cadre

*À insérer dans « La formule de l'écart angulaire », **après** l'équation
$\theta = \lambda/a$ (`lesson.md:101`) et **avant** le paragraphe « où $\lambda$
est la longueur d'onde… » (`lesson.md:103`).*

> Lis bien ce que $\theta$ désigne, parce que tous les sujets le dessinent de la
> même façon et qu'une moitié oubliée coûte un facteur deux : $\theta$ va de
> l'**axe** — le prolongement direct du faisceau — jusqu'au **bord** de la tache
> centrale, jamais d'un bord à l'autre. C'est une **demi**-largeur angulaire.
> C'est exactement l'angle que le banc ci-dessus fait apparaître à la sortie de
> la fente, et c'est pour cela que la tache entière, sur l'écran, mesurera deux
> fois ce que cet angle découpe.

### 4.3 L'exemple travaillé gagne son geste de mesure

*À insérer dans « Exemple : calculer un écart angulaire, puis la largeur de la
tache », après `$$L \approx 1{,}2\times10^{-2}\ \text{m} = 1{,}2\ \text{cm}$$`
(`lesson.md:125`) et **avant** « Une fente de $0{,}2\ \text{mm}$… »
(`lesson.md:127`).*

> Et voici le contrôle que tu viens de faire au banc, celui qui rend le résultat
> vérifiable au lieu de le croire. Multiplie la largeur de la fente par la
> largeur de la tache : $0{,}200 \times 1{,}20 = 0{,}240$ (en millimètres fois
> centimètres). Recommence avec une fente de $0{,}100$ mm, qui donne $2{,}40$ cm :
> $0{,}100 \times 2{,}40 = 0{,}240$. Avec $0{,}060$ mm, qui donne $4{,}00$ cm :
> $0{,}060 \times 4{,}00 = 0{,}240$. Le produit ne bouge pas, parce qu'il vaut
> $2\lambda D$ — deux grandeurs qu'on n'a pas touchées. Un produit constant, c'est
> la signature d'une proportionnalité **inverse**, et c'est ce que « $a$ au
> dénominateur » veut dire quand on le mesure.

### 4.4 « Arrête-toi » gagne son ordre de grandeur

*À insérer à la fin de « Arrête-toi — plus l'ouverture est grande, MOINS on
diffracte, pas l'inverse » (`lesson.md:131`), en dernière phrase du paragraphe.*

> Chiffre-le une fois, et tu ne l'oublieras plus. Avec le même laser
> ($\lambda = 600$ nm) et le même écran à $D = 2{,}0$ m, une fente de $1{,}0$ mm
> — l'épaisseur d'une mine de crayon — donne déjà une tache de $2{,}4$ mm
> seulement. Et une porte de $80$ cm donnerait
> $L = 2\lambda D/a = 3{,}0\times10^{-6}$ m, soit **3,0 micromètres** : vingt-sept
> fois plus fin qu'un cheveu, donc rigoureusement invisible. La diffraction n'a
> pas disparu par une porte ; elle est là, et elle est trop petite pour qu'un œil
> la rencontre.

### 4.5 Le récapitulatif express (R6) — deux lignes à ajouter

*Dans « Récapitulatif express » (`lesson.md:238-244`), **remplacer** la puce
existante sur la diffraction (`:242`) par les deux puces suivantes.*

> - La diffraction de la lumière par une fente ou un fil de largeur $a$ n'est
>   observable que si $a$ est du même ordre de grandeur que $\lambda$ ; le
>   **demi**-écart angulaire vaut $\theta = \lambda/a$ (en radians), et sur un
>   écran placé à la distance $D$ la tache centrale mesure $L = 2\lambda D/a$.
>   Retiens les trois sens : $L$ **grandit** quand la fente rétrécit, quand la
>   longueur d'onde s'allonge, et quand l'écran recule.
> - $\theta$ ne dépend **jamais** de $D$ : reculer l'écran n'ouvre pas
>   l'éventail, il l'intercepte plus loin. C'est $L$, et $L$ seule, qui dépend de
>   $D$ — d'où la droite $L = f(D)$ passant par l'origine, dont la pente
>   $p = 2\lambda/a$ donne $\lambda$. Et un **fil** diffracte comme une **fente de
>   même largeur** : c'est ce qui permet de mesurer le diamètre d'un cheveu avec
>   une règle graduée en centimètres.

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Les constantes — toutes tirées de la leçon, des exercices ou des annales

| grandeur | valeurs | d'où elles viennent |
|---|---|---|
| $\lambda$ (dans l'air) | **450** · **532** · **600** · **650** nm | 450 et 650 : POL-14 (« bleu » / « rouge ») · 532 : `exercises.yaml:133` (r-variation, laser vert) et POL-19 · 600 : `lesson.md:109` (exemple travaillé) **et** `r-bac` q6 (sujet 2021 N, vérifié) |
| $a$ (fente) | **0,060** · **0,080** · **0,100** · **0,150** · **0,200** · **0,300** · **1,000** mm | 0,060 : sujets **2021 N** et **2012 R** · 0,100 : `exercises.yaml:139` (r-variation) et POL-22 · 0,150 : POL-14 · 0,200 : `lesson.md:109` · 0,300 : POL-19 · 0,080 : le diamètre du cheveu de `r-bac` q7 · 1,000 : le cran « objet courant », pour que la misconception tombe sur son propre chiffre |
| $D$ | $[0{,}40\ ;\ 2{,}00]$ m, **pas de 0,10 m** (17 positions) | 2,0 m : `r-bac` q7 et `r-variation` q1 · 1,5 m : 2012 R · 1,4 m : 2023 R · 0,40 à 1,50 m : la plage du graphe $L = f(D)$ de 2021 N (abscisses 50, 100, 150 cm) |
| $d$ (cheveu) | **0,080 mm = 80 µm**, **constante**, sans contrôle | `r-bac` q7 : $d = 2\lambda D_i/L_i = 2\times600\times10^{-9}\times 2 / (3\times10^{-2}) = 8{,}0\times10^{-5}$ m. Ordre de grandeur réel d'un cheveu (50 à 100 µm) |
| relation du modèle | $\theta = \dfrac{\lambda}{a}$ (rad) ; $\dfrac{L}{2} = D\tan\theta \approx D\theta$ ; $L = \dfrac{2\lambda D}{a}$ | `lesson.md:101`, `:121-125` ; `exercises.yaml:92-95` |

**L'approximation des petits angles est employée, et elle est vraie ici.** Le plus
grand $\theta$ de la scène est $\lambda/a = 6{,}50\times10^{-7}/6{,}0\times10^{-5}
= 1{,}083\times10^{-2}$ rad ($0{,}62°$) : $\tan\theta = 1{,}0837\times10^{-2}$,
soit un écart de **0,004 %**. La scène calcule donc $L = 2D\theta$ sans tangente,
comme la leçon, et la porte le recalcule de même.

### 5.2 La table des largeurs — **toute l'arithmétique de la scène, vérifiée**

$L = \dfrac{2\lambda D}{a}$. À $D = 2{,}00$ m, le numérateur $2\lambda D$ vaut
$1{,}80\times10^{-6}$ (450 nm) · $2{,}128\times10^{-6}$ (532) ·
$2{,}40\times10^{-6}$ (600) · $2{,}60\times10^{-6}$ m² (650).

**$L$ en centimètres, à $D = 2{,}00$ m** (3 chiffres significatifs) :

| $a$ (mm) | 450 nm | 532 nm | **600 nm** | 650 nm |
|---|---|---|---|---|
| **0,060** | 3,00 | 3,55 | **4,00** | 4,33 |
| **0,080** | 2,25 | 2,66 | **3,00** | 3,25 |
| **0,100** | **1,80** | **2,13** | **2,40** | **2,60** |
| **0,150** | 1,20 | 1,42 | **1,60** | 1,73 |
| **0,200** | 0,900 | 1,06 | **1,20** | 1,30 |
| **0,300** | 0,600 | 0,709 | **0,800** | 0,867 |
| **1,000** | 0,180 | 0,213 | **0,240** | 0,260 |

*Vérifications, une par colonne critique :*
$1{,}80\times10^{-6}/6{,}0\times10^{-5} = 3{,}00\times10^{-2}$ m ✓ ·
$2{,}128\times10^{-6}/6{,}0\times10^{-5} = 3{,}5467\times10^{-2} \to 3{,}55$ cm ✓ ·
$2{,}40\times10^{-6}/2{,}00\times10^{-4} = 1{,}20\times10^{-2}$ m — **c'est le
résultat de l'exemple travaillé de `lesson.md:125`** ✓ ·
$2{,}128\times10^{-6}/1{,}00\times10^{-4} = 2{,}128\times10^{-2} \to 2{,}13$ cm —
**c'est le résultat de `exercises.yaml:145`** (r-variation q1, « $\approx 2{,}1$ cm ») ✓ ·
$2{,}60\times10^{-6}/6{,}0\times10^{-5} = 4{,}333\times10^{-2} \to 4{,}33$ cm ✓ ·
$2{,}40\times10^{-6}/1{,}00\times10^{-3} = 2{,}40\times10^{-3}$ m $= 0{,}240$ cm ✓.

**L'invariant que la colonne 600 nm rend exact — et c'est pour lui que les
lectures sont à trois chiffres :**

| $a$ (mm) | 0,060 | 0,080 | 0,100 | 0,150 | 0,200 | 0,300 | 1,000 |
|---|---|---|---|---|---|---|---|
| $L$ (cm) | 4,00 | 3,00 | 2,40 | 1,60 | 1,20 | 0,800 | 0,240 |
| $a \times L$ | **0,240** | **0,240** | **0,240** | **0,240** | **0,240** | **0,240** | **0,240** |

$0{,}060\times4{,}00 = 0{,}240$ · $0{,}080\times3{,}00 = 0{,}240$ ·
$0{,}100\times2{,}40 = 0{,}240$ · $0{,}150\times1{,}60 = 0{,}240$ ·
$0{,}200\times1{,}20 = 0{,}240$ · $0{,}300\times0{,}800 = 0{,}240$ ·
$1{,}000\times0{,}240 = 0{,}240$. **Sept crans, sept fois le même produit, à
l'affichage près.** *À deux chiffres significatifs, $0{,}709$ s'écrirait $0{,}71$
et le produit tomberait à $0{,}213$ : l'invariant serait faux à l'écran. C'est la
raison, et la seule, des trois chiffres.*

**$\theta = \lambda/a$ en radians** (3 c.s.), les valeurs employées :

| $a$ (mm) | $\lambda = 450$ | $532$ | **$600$** | $650$ |
|---|---|---|---|---|
| 0,060 | $7{,}50\times10^{-3}$ | $8{,}87\times10^{-3}$ | $\mathbf{1{,}00\times10^{-2}}$ | $1{,}08\times10^{-2}$ |
| 0,100 | $4{,}50\times10^{-3}$ | $\mathbf{5{,}32\times10^{-3}}$ | $6{,}00\times10^{-3}$ | $6{,}50\times10^{-3}$ |
| 0,200 | $2{,}25\times10^{-3}$ | $2{,}66\times10^{-3}$ | $\mathbf{3{,}00\times10^{-3}}$ | $3{,}25\times10^{-3}$ |
| 1,000 | $4{,}50\times10^{-4}$ | $5{,}32\times10^{-4}$ | $6{,}00\times10^{-4}$ | $6{,}50\times10^{-4}$ |

*Les deux gras de la colonne 600 sont les nombres de la leçon
($3{,}00\times10^{-3}$, `lesson.md:117`) ; $5{,}32\times10^{-3}$ est celui de
`exercises.yaml:143`. La scène ne produit donc aucun nombre que l'élève ne
retrouvera pas sur sa page.*

**$a/\lambda$, la comparaison faite nombre** (entier, lecture `rapport`), à
$\lambda = 600$ nm : **100** (0,060) · 133 (0,080) · **167** (0,100) · 250 (0,150)
· 333 (0,200) · 500 (0,300) · **1 667** (1,000). *Et, hors scène, pour la porte de
`lesson.md` : une porte de 80 cm donne $a/\lambda = 1{,}33\times10^{6}$.*

**Le graphe de S3** — $a = 0{,}060$ mm, $\lambda = 600$ nm : $L(\text{cm}) =
2{,}00 \times D(\text{m})$, donc la pente $p = L/D$ (les deux dans la **même**
unité) vaut $\dfrac{4{,}00\ \text{cm}}{200\ \text{cm}} = \mathbf{2{,}00\times10^{-2}}$,
**sans dimension**, à chacune des 17 positions. *C'est exactement la pente du
sujet 2021 : $2{,}4/120 = 2{,}0\times10^{-2}$.* Et
$\lambda = \dfrac{p\,a}{2} = \dfrac{2{,}00\times10^{-2}\times 6{,}0\times10^{-5}}{2}
= 6{,}00\times10^{-7}$ m $= \mathbf{600}$ nm ✓.

Les cinq points de mesure posés par la révélation :

| $D$ (m) | 0,40 | 0,80 | 1,20 | 1,60 | 2,00 |
|---|---|---|---|---|---|
| $L$ (cm) | **0,800** | **1,60** | **2,40** | **3,20** | **4,00** |

*(Le point $(1{,}20\ ;\ 2{,}40)$ est celui que le sujet 2021 donne à lire.)*

**Le cheveu de S4** — $\lambda = 600$ nm, $D = 2{,}00$ m, $L = 3{,}00$ cm :
$d = \dfrac{2\lambda D}{L} = \dfrac{2{,}40\times10^{-6}}{3{,}00\times10^{-2}}
= 8{,}00\times10^{-5}$ m $= \mathbf{80{,}0}$ µm ✓ (`r-bac` q7 : $80$ µm).
Et $d/\lambda = 8{,}00\times10^{-5}/6{,}00\times10^{-7} = \mathbf{133}$ — le
« environ 126 fois » de POL-21, calculé ici à 600 nm au lieu de 632,8.

### 5.3 Les deux échelles du dessin, et le facteur d'exagération

**C'est la décision d'honnêteté la plus lourde de cette scène**, parce que le
défaut mesuré au §2.1 est exactement celui-là.

Un banc réel ne se dessine pas à l'échelle : $D = 2{,}0$ m et $L = 4{,}0$ cm sont
dans un rapport 50, et $a = 0{,}060$ mm est 33 000 fois plus petit que $D$. La
scène pose donc **deux échelles, déclarées à l'écran, et une seule
exagération** :

- **le long du banc** (horizontal) : l'échelle des **distances** ;
- **en travers** (vertical) : l'échelle des **largeurs**, **dix fois plus
  grande** ;
- d'où : **tout angle est dessiné dix fois trop ouvert**, et c'est écrit sur la
  scène, en toutes lettres : « **largeurs ×10** — sans quoi la tache serait plus
  fine qu'un trait ».

**Ce que cette exagération garantit, et c'est tout l'argument :** le facteur est
**constant**, à tous les réglages et à toutes les largeurs d'écran. Les
**rapports** dessinés sont donc **vrais** — si $\theta$ double, l'angle dessiné
double ; si $L$ est deux fois plus grande, le trait est deux fois plus long. Seule
la valeur absolue de l'angle est fausse, d'un facteur connu et affiché. *La porte
le mesure comme un invariant, aux 28 combinaisons (§11.2, `exageration-constante`)
— et c'est précisément ce qu'un facteur choisi « pour que ça rende bien » à chaque
figure ne peut pas offrir.*

**Ordres de grandeur, pour fixer :** à $\theta = 1{,}00\times10^{-2}$ rad
($a = 0{,}060$ mm, 600 nm), l'angle **réel** vaut $0{,}573°$ ; dessiné, il en fait
$5{,}7$. À $\theta = 6{,}00\times10^{-4}$ ($a = 1{,}000$ mm), le réel vaut
$0{,}034°$ et le dessiné $0{,}34°$ : le faisceau **paraît droit**, ce qui est la
vérité du régime de l'optique géométrique. *La scène n'affiche jamais un angle en
degrés (§9.12) : l'arc de $\theta$ ne porte qu'une valeur en radians, celle du
modèle.*

**La fente, elle, n'est à AUCUNE des deux échelles.** À l'échelle des largeurs,
$0{,}060$ mm ferait **un dixième de pixel** et $\lambda$ **un millième**. Le trait
de la fente est donc un **symbole**, de largeur **constante**, et c'est écrit.
Conséquence dure, que la porte garde : **la largeur dessinée de la fente ne change
JAMAIS avec $a$** (§11.2, `fente-symbole`) — un symbole qui varierait un peu
inviterait à lire une proportion qui n'existe pas.

> **La phrase à dire, et qui sépare ce chapitre de la cuve :** on ne peut pas
> dessiner $a$ et $\lambda$ sur la même image. Dans la cuve à ondes, $a/\lambda$
> allait de $0{,}125$ à $8$ et les deux segments tenaient côte à côte ; ici il va
> de **100 à 1 667**. C'est pourquoi la comparaison, pour la lumière, se lit en
> **nombre** (`rapport`) et jamais en dessin. *À écrire dans le `fit_caveat` et à
> dire dans la consigne de S1.*

### 5.4 L'image de la tache : ce qu'elle est, ce qu'elle n'affirme pas

L'écran est dessiné comme une **bande** (un écran vu en coupe n'a pas d'épaisseur ;
on lui en donne une pour peindre dessus — déclaré au §10.3). La bande porte la
tache centrale et **deux taches voisines de chaque côté**, comme les figures des
sujets 2012 R, 2023 R et 2025 R (« une grande ellipse et quatre plus petites »).

- **Les bords de la tache centrale tombent à $\pm\lambda D/a$ de l'axe**, ce qui
  fait $L = 2\lambda D/a$ : c'est la seule chose que la scène **affirme**.
- Les extinctions suivantes tombent à $\pm k\lambda D/a$. **Aucune formule
  d'intensité n'est affichée, nommée ni mesurée** (§9.3) ; aucune largeur de
  tache **secondaire** n'est lue, affichée ou commentée.
- **L'image est éclaircie, et c'est déclaré** : sur un vrai écran, la première
  tache voisine est environ **vingt fois** moins lumineuse que la centrale. Le
  rendu applique une échelle déclarée pour qu'elle reste visible. *La scène
  affirme des **largeurs**, jamais des luminosités* (§10.3).

### 5.5 Contrôles (4) — un neuf par étape

| id | ce qu'il règle | valeurs / bornes | pas | ouvert par |
|---|---|---|---|---|
| `fente` | $a$, la largeur de la fente | `0.060` · `0.080` · `0.100` · `0.150` · `0.200` · `0.300` · `1.000` (mm) | — | **S1**, S5 |
| `couleur` | $\lambda$, le laser | `450` · `532` · `600` · `650` (nm) | — | **S2**, S5 |
| `distance` | $D$, la position de l'écran | $[0{,}40\ ;\ 2{,}00]$ m | **0,10 m** | **S3**, S5 |
| `objet` | ce qu'on met sur le trajet | `fente` · `cheveu` | — | **S4**, S5 |

**Le pas de `distance` est un choix pédagogique (ADR 0041 §5), et ici il est
arithmétique.** Au pas de $0{,}10$ m sur $[0{,}40\ ;\ 2{,}00]$ : **17 positions**,
et à $a = 0{,}060$ mm, $\lambda = 600$ nm, $L$ avance de $0{,}200$ cm exactement
d'un cran à l'autre — soit **une graduation fine** du papier du graphe (§5.7).
**Aucune position ne tombe entre deux traits**, et les cinq points de mesure
(0,40 · 0,80 · 1,20 · 1,60 · 2,00) sont **atteignables exactement**. *Deux
positions voisines n'affichent jamais la même valeur de $L$ à trois chiffres —
le défaut de l'orbite (« douze positions affichant 24,0 h ») ne peut pas se
reproduire.*

**Les sept crans de `fente` ne sont pas un curseur continu**, et c'est
délibéré : une fente de TP est une pièce, pas un réglage ; les sept valeurs sont
celles du corpus (§5.1) ; et l'invariant $a\times L$ ne se lit que sur des valeurs
rondes.

### 5.6 État (6 clés)

`a_mm`, `lambda_nm`, `D_m`, `objet` — les quatre que les contrôles règlent — plus
**deux clés posées par l'étape, sans contrôle** (précédents : `support` et
`fenetre_j` dans les noyaux, `chemin` dans la cuve) :

- **`vue`** (`banc` | `banc-et-graphe`) décide si le **papier du graphe** existe
  dans le DOM. Il n'existe qu'en **S3** (et au choix de l'élève en S5, par une
  VUE, comme l'appareil des noyaux). *C'est un outil de non-fuite : on ne peut
  pas répondre au pari du graphe depuis une étape qui n'a pas de graphe.*
- **`reference`** (`aucune` | `depart`) décide si le réglage **initial de
  l'étape** reste dessiné, à l'encre, en trait interrompu, à côté du réglage
  courant. C'est ce qui rend la comparaison « avant / après » visible en S1, S2 et
  S4. *Avant le pari, la référence coïncide avec le réglage courant : elle ne
  révèle rien.*

Le diamètre du cheveu (**80 µm**) est une **constante du modèle**, pas une clé
d'état : aucun contrôle ne l'atteint, et il n'est affiché qu'après la révélation
de S4.

### 5.7 Lectures — définitions exactes, unité, précision

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `largeur-fente` | $a$ | mm | 3 déc. (`0,060` … `1,000`) | une même écriture pour les sept crans ; le sujet écrit « 0,06 mm », c'est le même nombre |
| `longueur-onde` | $\lambda$, avec son nom de couleur | nm | entier | `450` (bleu) · `532` (vert) · `600` · `650` (rouge) |
| `distance` | $D$ | m | 2 déc. | pas de 0,10 m : exact |
| `largeur-tache` | $L$, largeur de la tache centrale, lue sur la règle | cm | **3 c.s.** | §5.2 : c'est la précision qui rend l'invariant $a \times L$ vrai à l'écran |
| `bords` | les deux abscisses des bords de la tache **sur la règle** | cm | 2 déc. | le geste de TP : deux lectures, une soustraction (S3, S5) |
| `ecart-angulaire` | $\theta = \lambda/a$, **demi-écart angulaire** | **rad** | 3 c.s. | le cadre : « unité et signification de $\theta$ » — **jamais un degré** (§9.12) |
| `rapport` | $a/\lambda$ : « la fente vaut **N** fois la longueur d'onde » | — | entier | la condition faite nombre, là où le dessin ne peut pas (§5.3) |
| `pente` | $p = L/D$, $L$ et $D$ **dans la même unité** | — (sans dimension) | 3 c.s. | $2{,}00\times10^{-2}$ ; S3 **après révélation** |
| `lambda-deduite` | $\lambda = p\,a/2$ | nm | entier | $600$ ; S3 **après révélation** — c'est la réponse de `r-bac` q6 |
| `diametre-deduit` | $d = 2\lambda D/L$ | µm | 3 c.s. | $80{,}0$ ; S4 **après révélation** — la réponse de `r-bac` q7 |
| `theta-mesure` | $L/(2D)$, calculé depuis la mesure | rad | 3 c.s. | **S5 seulement**, à côté de `ecart-angulaire` : c'est le geste « vérifier $\theta = \lambda/a$ » |

> **La précision est ici un arbitrage entre deux mensonges.** Trop de chiffres, et
> une valeur **calculée** se déguiserait en **mesure** (le danger des noyaux) ;
> trop peu, et l'invariant $a \times L$ deviendrait faux à l'écran. **Trois
> chiffres significatifs sur $L$** est le seul réglage qui tienne les deux, et il
> coïncide avec ce que les exercices de la notion écrivent ($2{,}1$ cm ;
> $1{,}2$ cm ; $3$ cm).

**Le papier du graphe (S3)** — repris de la figure 3 du sujet 2021, à l'échelle
près :

| axe | traits **majeurs** (chiffrés) | traits **fins** | cadre |
|---|---|---|---|
| $D$ (abscisses) | tous les **50 cm** — chiffrés **50, 100, 150, 200** | tous les **10 cm** | jusqu'à **210 cm** |
| $L$ (ordonnées) | tous les **0,8 cm** — chiffrés **0,8 ; 1,6 ; 2,4 ; 3,2 ; 4,0** | tous les **0,2 cm** | jusqu'à **4,4 cm** |

Ce que cette grille rend **exact** : le point $(120\ ;\ 2{,}4)$ — celui que le
sujet donne à lire — tombe sur un **majeur d'ordonnée** et un **fin d'abscisse**,
exactement comme sur la figure 3 ; les cinq points de mesure tombent tous sur des
croisements ; et un cran de `distance` avance d'**une graduation fine**.

**Langue visuelle du quadrillage** (contrainte de porte) : traits à l'**encre
douce**, majeurs plus appuyés que les fins, et **jamais** plus contrastés que les
points. Il fait partie de l'**énoncé** — il est donc visible **avant** le pari de
S3, vide de tout point.

---

## 6. La course, et la langue visuelle

- **Aucune course, aucun temps.** `temps: false`, et **pas de clé `course`** : la
  lumière ne met rien de mesurable à traverser deux mètres, et prétendre le
  contraire serait une animation décorative. Les cinq verdicts sont **immédiats** ;
  puis le contrôle de l'étape s'ouvre. *(Même régime que la sphère et le produit
  vectoriel. `validate-content` interdit `revele_apres_h > 0` sur une scène sans
  temps ; aucun `revele_apres_course` non plus.)*
- **Rien ne bouge qui n'ait été réglé.** Aucune boucle de rendu : on redessine
  quand un contrôle change, jamais autrement (ADR 0041 §4).
- **Le critère des éclairs (WCAG 2.3.1) est structurellement satisfait — et
  mesuré quand même.** Rien ne clignote, rien n'oscille, rien ne défile : il
  n'existe aucune paire de variations opposées. *Une chose n'est prouvée absente
  que si l'on a énuméré ses formes* (ADR 0036) : la porte le mesure (§11.3,
  `eclairs`), **attendu structurellement vide**.
- **Mouvement réduit** : il n'y a rien à honorer ; la scène est déjà statique. La
  famille `sans-mouvement` vérifie qu'aucune transition n'est introduite.
- **Aucune trace entre étapes** : chaque étape repart de son état déclaré.

**La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4).**

- **À l'ENCRE — c'est l'ÉNONCÉ** : le boîtier du laser et son faisceau incident,
  la plaque et le trait de la fente (ou le trait du cheveu), l'écran et sa bande,
  **la règle graduée et ses chiffres**, la cote de $D$, l'**axe optique** en trait
  interrompu, le **quadrillage** du graphe et ses axes chiffrés, **la tache du
  réglage de départ** (c'est la donnée de la consigne), la référence
  (`reference: depart`) une fois qu'elle n'est plus le réglage courant.
  *Corollaire du manège : une donnée de l'énoncé ne se peint jamais dans la
  couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : les **deux rayons de bord**
  qui vont de la fente aux bords de la tache, l'**arc de $\theta$** et son
  étiquette, le **crochet $L$** et sa cote, la **tache du nouveau réglage**, les
  **points** posés sur le graphe et la **droite** qui les joint.
- **Les rayons de bord sont la RÉPONSE, jamais l'énoncé.** C'est la contrainte la
  plus fine de cette scène : deux rayons tracés depuis la fente montrent, à eux
  seuls, que l'éventail est fixe et que $L$ croît avec $D$ — c'est-à-dire la
  réponse de S3, dessinée. Avant chaque pari, **le faisceau s'arrête à la fente**
  et la bande de l'écran porte la tache du réglage courant, sans qu'aucun trait
  ne les relie.
- **Aucune teinte spectrale.** La tache est à l'accent, quelle que soit la couleur
  du laser (§2.5, §13.3). Toutes les couleurs sont **lues sur les jetons
  `--figure-*`** à l'exécution, et relues au changement de thème.
- **Toutes les échelles sont linéaires**, les deux axes du graphe compris (§9.13).
- **$\lambda$ et $\theta$ passent par KaTeX**, jamais par la police du chrome
  (ADR 0030, addendum : Geist dessine $\omega$ comme $\Omega$ — le même piège
  guette $\lambda$ et $\theta$).

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant
que l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce
qui dépend de l'ISSUE attend la révélation*).

### 7.1 S1 — `fente-deux-fois-plus-fine` · « Une fente deux fois plus fine »

- **État :** `a_mm: "0.200"`, `lambda_nm: "600"`, `D_m: 2.00`, `objet: "fente"`,
  `vue: "banc"`, `reference: "depart"`.
- **Contrôle ouvert :** `fente` (**neuf**). **Lectures :** `largeur-fente`,
  `largeur-tache`, `rapport` — et `ecart-angulaire` **après révélation
  seulement**.
- **Consigne (voix) :** « Un banc d'optique, vu en coupe. À gauche un laser ; au
  milieu une plaque percée d'une fente fine, large de $0{,}200$ millimètre ; à
  droite un écran, à $2{,}00$ mètres de la fente, avec une règle graduée posée
  dessus. Sur l'écran, une tache centrale lumineuse encadrée de taches plus
  petites : la règle donne $L = 1{,}20$ centimètre pour la centrale. Tu as vu,
  dans la cuve à ondes, qu'une ouverture plus étroite étale **plus**. Ici on ne
  demande pas le sens : on demande **de combien**. Une remarque avant de parier,
  et elle compte : la fente est dessinée comme un **symbole**, jamais à l'échelle.
  À l'échelle des largeurs, $0{,}200$ millimètre ferait un demi-pixel — et la
  longueur d'onde, un millième. C'est le nombre affiché à côté, pas le dessin, qui
  dit la comparaison. »
- **Pari :** « On remplace la fente par une fente **deux fois plus fine**,
  $0{,}100$ mm. Même laser, même écran, même distance. La tache centrale
  mesurera… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `image-de-la-fente` | $0{,}60$ cm — deux fois moins : la tache est l'**image** de la fente, elle rétrécit avec elle | non | **`figure-ombre-geometrique`** *(nouveau, §8.2 ; forme « la tache reproduit l'ouverture »)* | « Lis la règle : $2{,}40$ cm, deux fois **plus** large qu'avant. Et vérifie l'idée elle-même sur les nombres qu'elle prédit : si la tache était l'image de la fente, elle mesurerait $0{,}100$ millimètre — un **dix-millième** de ce que la règle affiche. Un écran n'est pas un mur d'ombres : ce qui arrive dessus n'a pas la forme de l'objet, il a la forme de l'**étalement** que l'objet provoque. Et l'étalement, lui, grandit quand l'ouverture rétrécit. » |
| `deux-fois-plus-large` | $2{,}40$ cm — deux fois plus | **oui** | — | « Oui, et retiens la forme exacte de ce résultat : la largeur de la fente est **au dénominateur**. La diviser par deux multiplie la tache par deux. Regarde ce que la scène vient d'ajouter : deux rayons partent de la fente vers les bords de la tache, et l'angle qu'ils font avec l'axe — $\theta$, le **demi**-écart angulaire, de l'axe au bord, jamais d'un bord à l'autre — vient de passer de $3{,}00\times10^{-3}$ à $6{,}00\times10^{-3}$ radian. Deux fois plus grand, lui aussi. Un dernier chiffre, celui qui explique pourquoi on n'a jamais vu ça par une fenêtre : cette fente vaut **167 fois** la longueur d'onde, et c'est déjà beaucoup. » |
| `inchangee` | $1{,}20$ cm — inchangée : c'est la distance à l'écran qui fixe la largeur de la tache, pas la fente | non | **`diffraction-formule-theta`** *(forme « $\theta$ dépend de $D$ »)* | « La règle dit $2{,}40$ cm, et on n'a pas touché à l'écran : il est resté à $2{,}00$ m pendant tout le changement. La distance décide de la **taille** de ce qu'on voit, pas de l'**ouverture** de l'éventail — et l'ouverture, c'est la fente qui la fixe. Fais glisser les sept crans sans bouger l'écran : la tache passe de $4{,}00$ à $0{,}240$ cm. Si $D$ décidait seul, rien de tout cela ne bougerait. » |
| `quatre-fois` | $4{,}80$ cm — quatre fois plus : diviser la fente par deux double l'angle, et la tache s'élargit **des deux côtés** | non | **`diffraction-formule-theta`** *(forme « le facteur 2 compté deux fois »)* | « Le raisonnement contient une vraie idée et un doublon. L'idée juste : l'angle double, il passe de $3{,}00\times10^{-3}$ à $6{,}00\times10^{-3}$ radian. Le doublon : « des deux côtés » est **déjà** dans la tache de départ — $1{,}20$ cm, c'était déjà l'axe plus $0{,}60$ d'un côté et $0{,}60$ de l'autre. On ne le compte qu'une fois. La règle tranche : $2{,}40$ cm. Repère bien les deux grandeurs, parce que les sujets jouent dessus : $\theta$ va de l'axe au **bord**, $L$ va d'un bord à l'**autre**. » |

*(Arithmétique des retours, vérifiée. $L(0{,}100) = 2{,}40\times10^{-6}/1{,}00\times10^{-4}
= 2{,}40\times10^{-2}$ m ✓. $\theta(0{,}200) = 6{,}00\times10^{-7}/2{,}00\times10^{-4}
= 3{,}00\times10^{-3}$ rad, valeur de `lesson.md:117` ✓ ;
$\theta(0{,}100) = 6{,}00\times10^{-3}$ ✓. $a/\lambda = 1{,}00\times10^{-4}/6{,}00\times10^{-7}
= 167$ ✓. Les deux extrêmes cités : $4{,}00$ cm à $0{,}060$ mm et $0{,}240$ cm à
$1{,}000$ mm ✓, §5.2.)*

- **`suite` (35 mots) :** « Promène la fente sur les sept crans et multiplie à
  chaque fois les deux largeurs affichées : $0{,}060 \times 4{,}00$ ;
  $0{,}100 \times 2{,}40$ ; $0{,}300 \times 0{,}800$. Toujours $0{,}240$. Au
  dernier cran, un millimètre : la tache tombe à $2{,}4$ millimètres. »
- **⟂-avant-pari :** la lecture `ecart-angulaire` ; **les deux rayons de bord** ;
  l'**arc de $\theta$** et son étiquette ; le **crochet $L$** et sa cote ; la
  tache du **nouveau** réglage ; le verdict ; tout pixel d'accent (mesuré en
  **chrominance**) ; la description lue au lecteur d'écran ne doit contenir ni
  « deux fois », ni « $2{,}40$ », ni « plus large ».
  **Reste visible (l'énoncé) :** le banc entier à l'encre, le faisceau **jusqu'à
  la fente**, la plaque, l'écran, **la règle graduée et ses chiffres**, la cote de
  $D$, l'axe optique en trait interrompu, **la tache de $1{,}20$ cm** (c'est la
  mesure que la consigne vient d'énoncer), et les lectures `largeur-fente`,
  `largeur-tache`, `rapport` à leur valeur de départ.
- **Interdit dans les retours de S1 :** la chaîne `\lambda/a` et la chaîne
  `2\lambda D/a` (§2.3). S1 n'établit qu'**une** dépendance ; l'écrire toute
  entière donnerait les paris de S2 et de S3.

### 7.2 S2 — `meme-fente-autre-laser` · « La même fente, un autre laser »

- **État :** `a_mm: "0.100"`, **`lambda_nm: "450"`**, `D_m: 2.00`,
  `objet: "fente"`, `vue: "banc"`, `reference: "depart"`.
- **Contrôle ouvert :** `couleur` (**neuf**). **Lectures :** `longueur-onde`,
  `largeur-tache`, `rapport`, `ecart-angulaire`.
- **Consigne :** « La fente est réglée sur $0{,}100$ millimètre, et **on n'y
  touchera plus**. L'écran reste à $2{,}00$ mètres. On change une seule chose : le
  laser. Celui qui éclaire en ce moment est **bleu**, de longueur d'onde
  $450$ nanomètres, et sa tache centrale mesure $1{,}80$ centimètre sur la règle.
  On va le remplacer par un laser **rouge**, $650$ nanomètres — la même fente,
  le même écran, une autre couleur. »
- **Pari :** « Avec le laser rouge, la tache centrale… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `plus-large` | sera **plus large**, $2{,}60$ cm : la longueur d'onde est plus grande, et l'étalement grandit avec elle | **oui** | — | « Oui. Et voici la relation entière, maintenant qu'on a fait varier les deux termes : $\theta = \dfrac{\lambda}{a}$. La longueur d'onde est **au numérateur**, la largeur de la fente **au dénominateur**. Vérifie-le sur les deux nombres que la règle vient de donner : $\dfrac{1{,}80}{2{,}60} = 0{,}692$ et $\dfrac{450}{650} = 0{,}692$ — le même rapport, à trois chiffres. La tache suit la longueur d'onde **proportionnellement**. Et remarque ce que ça dit de la comparaison : cette fente vaut $222$ fois le bleu, mais seulement $154$ fois le rouge. La même fente est « moins large » pour le rouge. » |
| `plus-etroite` | sera **plus étroite**, $1{,}25$ cm : le rouge a la plus grande longueur d'onde, il passe plus difficilement par une fente fine et ressort plus concentré | non | **`diffraction-formule-theta`** *(forme « fraction inversée / le bleu diffracte plus »)* | « La règle dit $2{,}60$ cm : plus large, pas plus étroite. L'image du « passage difficile » vient d'un fluide qu'on force dans un tuyau ; une onde ne s'écoule pas — rien, dans une plaque percée, ne pousse la lumière vers l'axe. Et regarde ce que ton modèle demanderait d'écrire : $\theta = a/\lambda$, la fraction retournée. Elle donnerait ici $154$ radians, soit vingt-quatre tours complets. Un angle pareil aurait dû t'alerter. » |
| `inchangee` | restera la **même**, $1{,}80$ cm : c'est la fente qui décide de l'étalement, et elle n'a pas bougé d'un millième de millimètre | non | **`diffraction-formule-theta`** *(forme « $\theta$ indépendant de $\lambda$ » — POL-14 C)* | « La fente n'a effectivement pas bougé, et la tache a changé quand même : $1{,}80$ puis $2{,}60$ centimètres. Parcours les quatre lasers sans y toucher — $450$, $532$, $600$, $650$ nanomètres donnent $1{,}80$ ; $2{,}13$ ; $2{,}40$ ; $2{,}60$ centimètres. Une ouverture n'est jamais « fine » toute seule : elle l'est **devant une longueur d'onde**. C'est la phrase de la cuve à ondes, et c'est la même ici, avec des nombres mille fois plus petits. » |

*(Arithmétique vérifiée. $L(450) = 1{,}80\times10^{-6}/1{,}00\times10^{-4}
= 1{,}80$ cm ✓ ; $L(650) = 2{,}60$ cm ✓. Le distracteur `plus-etroite` suppose
$L \propto 1/\lambda$ : $1{,}80 \times 450/650 = 1{,}246 \to 1{,}25$ cm ✓.
$1{,}80/2{,}60 = 0{,}6923$ et $450/650 = 0{,}6923$ ✓. $a/\lambda$ :
$1{,}00\times10^{-4}/4{,}50\times10^{-7} = 222$ ✓ ;
$1{,}00\times10^{-4}/6{,}50\times10^{-7} = 154$ ✓. Le « $154$ radians » du retour
est bien $a/\lambda$, et $154/(2\pi) = 24{,}5$ tours ✓.)*

- **`suite` (40 mots) :** « Repasse les quatre lasers sans toucher à la fente :
  $450$, $532$, $600$, $650$ nanomètres donnent $1{,}80$ ; $2{,}13$ ; $2{,}40$ ;
  $2{,}60$ centimètres. Les deux suites de nombres sont dans le même rapport — la
  tache suit la longueur d'onde. »
- **⟂-avant-pari :** la tache du laser rouge ; la référence une fois qu'elle
  diffère du courant ; les rayons de bord et l'arc de $\theta$ **du nouveau
  réglage** ; le verdict ; tout pixel d'accent ; la description lue ne doit
  contenir ni « plus large », ni « $2{,}60$ ».
  **Reste visible :** le banc à l'encre, la tache de $1{,}80$ cm, la règle, et les
  lectures du **réglage bleu** (`longueur-onde` $= 450$ nm, `largeur-tache`
  $= 1{,}80$ cm, `rapport` $= 222$, `ecart-angulaire` $= 4{,}50\times10^{-3}$ rad
  — *acquis de S1 : l'angle existe et se lit ; ce qu'on ignore, c'est ce que la
  couleur en fait*).
- **Interdit dans les retours de S2 :** la chaîne `2\lambda D` (§2.3). S2 peut
  écrire $\theta = \lambda/a$ ; elle ne peut pas écrire $L = 2\lambda D/a$.

### 7.3 S3 — `ecran-qui-recule` · « L'écran qui recule »

C'est **l'étape centrale** (§2.2), et celle du cadre (« exploiter des mesures »).

- **État :** `a_mm: "0.060"`, `lambda_nm: "600"` **mais non affiché**,
  **`D_m: 0.40`**, `objet: "fente"`, **`vue: "banc-et-graphe"`**,
  `reference: "aucune"`.
- **Contrôle ouvert :** `distance` (**neuf**). **Lectures :** `distance`,
  `largeur-tache`, `bords` — et `pente`, `lambda-deduite`, `ecart-angulaire`
  **après révélation seulement**. **`longueur-onde` et `rapport` sont ABSENTS de
  toute l'étape** : la longueur d'onde est l'**inconnue**, comme dans le sujet.
- **Consigne :** « Changement de dispositif, et changement de but. La fente
  mesure $0{,}060$ millimètre — c'est la fente du sujet national de 2021. Le laser,
  lui, est **inconnu** : on ne connaît pas sa longueur d'onde, et c'est justement
  ce qu'on va chercher. L'écran est tout près, à $0{,}40$ mètre, et la règle donne
  $L = 0{,}800$ centimètre. À droite, une feuille de papier quadrillé, vide : en
  abscisse la distance $D$ en centimètres, en ordonnée la largeur $L$ en
  centimètres. On va reculer l'écran jusqu'à $2{,}00$ mètres en portant chaque
  mesure sur la feuille. »
- **Pari :** « Pendant qu'on recule l'écran, de $0{,}40$ à $2{,}00$ mètres — cinq
  fois plus loin — les points vont… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `constante` | s'aligner sur une **horizontale** : $L$ ne change pas. L'écart angulaire $\theta = \lambda/a$ ne dépend ni de $D$ ni de rien d'autre, donc la tache non plus | non | **`diffraction-formule-theta`** *(forme « $L$ ne dépend pas de $D$ »)* | « Ta première phrase est **juste** et ta conclusion ne l'est pas : $\theta$ ne dépend effectivement pas de $D$ — c'est le seul choix qui l'a dit. Mais un angle constant ne donne pas une longueur constante : regarde les deux rayons de bord que la scène vient de tracer. Ils partent de la fente avec une ouverture fixe, et plus l'écran est loin, plus ils se sont écartés quand il les rencontre. $0{,}800$ cm à $0{,}40$ m, $4{,}00$ cm à $2{,}00$ m. L'éventail n'a pas bougé ; c'est l'écran qui l'a coupé plus loin. » |
| `proportionnelle` | s'aligner sur une **droite passant par l'origine** : $L$ est multipliée par cinq, $4{,}00$ cm à $2{,}00$ mètres | **oui** | — | « Oui, et cette droite est exactement la figure 3 du sujet 2021. Voici la relation entière, maintenant qu'on a fait varier les trois grandeurs : $\theta = \dfrac{\lambda}{a}$ et $\dfrac{L}{2} = D\theta$, donc $\boxed{L = \dfrac{2\lambda D}{a}}$. C'est de la forme $L = p\,D$ : une droite par l'origine, de pente $p = \dfrac{2\lambda}{a}$. Lis la pente sur n'importe quel point — $\dfrac{4{,}00}{200} = 2{,}00\times10^{-2}$, sans unité, les deux longueurs étant en centimètres — puis retourne la relation : $\lambda = \dfrac{p\,a}{2} = \dfrac{2{,}00\times10^{-2} \times 6{,}0\times10^{-5}}{2} = 6{,}00\times10^{-7}$ m. **Le laser inconnu émet à 600 nanomètres.** Tu viens de mesurer une longueur d'onde avec une règle. » |
| `theta-grandit` | s'aligner sur une **courbe qui monte de plus en plus vite** : en s'éloignant, la lumière a plus de place pour s'étaler, donc l'écart angulaire $\theta$ augmente lui aussi avec $D$ | non | **`diffraction-formule-theta`** *(forme « $\theta$ dépend de $D$ » — POL-14 D, POL-21 D, `cp-r3-diffraction` D)* | « Mesure l'angle toi-même, aux deux bouts : à $0{,}40$ m, $L/(2D) = \dfrac{0{,}800}{80{,}0} = 1{,}00\times10^{-2}$ ; à $2{,}00$ m, $\dfrac{4{,}00}{400} = 1{,}00\times10^{-2}$. **Le même nombre.** L'angle est décidé à la fente, par la fente et par la couleur, et il ne sait rien de ce qu'il y a plus loin — l'écran pourrait ne pas être là du tout. Ce qui grandit, c'est ce qu'un angle fixe découpe de plus en plus loin, et cela grandit **proportionnellement**, jamais plus vite. » |
| `droite-decalee` | s'aligner sur une droite, mais qui **ne passe pas par l'origine** : à $D = 0$ la tache a déjà la largeur de la fente, et l'étalement ne fait que s'y ajouter | non | **`figure-ombre-geometrique`** *(forme « la tache part de l'image de l'objet »)* | « L'idée est qu'à distance nulle on verrait l'ouverture elle-même, et que la diffraction viendrait l'élargir ensuite. Chiffre-la : la fente mesure $0{,}060$ millimètre, soit $0{,}0060$ centimètre. Sur cette feuille, où une graduation fine vaut $0{,}2$ centimètre, ce décalage ferait **un trentième** de la plus petite division — invisible. Et surtout, le point le plus bas mesuré, $0{,}800$ cm à $0{,}40$ m, est déjà **133 fois** plus large que la fente. Ce n'est pas l'ombre de la fente, élargie ; c'est autre chose, et cette autre chose part de zéro. » |

*(Arithmétique vérifiée. $L(0{,}40) = 2\times6{,}00\times10^{-7}\times0{,}40/6{,}0\times10^{-5}
= 4{,}80\times10^{-7}/6{,}0\times10^{-5} = 8{,}00\times10^{-3}$ m $= 0{,}800$ cm ✓ ;
$L(2{,}00) = 4{,}00$ cm ✓, soit exactement $\times 5$.
$\theta$ mesuré : $0{,}800\ \text{cm}/(2\times40{,}0\ \text{cm}) = 1{,}00\times10^{-2}$ ✓ et
$4{,}00/(2\times200) = 1{,}00\times10^{-2}$ ✓ — égal à $\lambda/a = 6{,}00\times10^{-7}/6{,}0\times10^{-5}$ ✓.
Pente : $4{,}00/200 = 2{,}00\times10^{-2}$ ✓, la pente du sujet ($2{,}4/120$).
$\lambda = 2{,}00\times10^{-2}\times6{,}0\times10^{-5}/2 = 6{,}00\times10^{-7}$ m ✓.
Décalage du distracteur : $0{,}0060$ cm $/ 0{,}2$ cm $= 1/33$ ✓ ; et
$0{,}800\ \text{cm}/0{,}0060\ \text{cm} = 133$ ✓.)*

- **`suite` (40 mots) :** « Refais les mesures toi-même, cran par cran, et regarde
  le point se poser. Cinq points, une droite, l'origine dedans. Lis la pente sur
  deux points quelconques : toujours $2{,}00\times10^{-2}$. C'est elle qui porte
  la longueur d'onde. »
- **⟂-avant-pari :** **tout point** sur le quadrillage ; la **droite** ; les rayons
  de bord ; l'arc de $\theta$ ; le crochet $L$ ; `pente` ; `lambda-deduite` ;
  `ecart-angulaire` ; le contrôle `distance` ; le verdict ; tout pixel d'accent ;
  la description lue ne doit contenir ni « proportionnel », ni « origine », ni
  « $600$ ».
  **Reste visible :** le banc à l'encre avec l'écran à $0{,}40$ m, la tache de
  $0{,}800$ cm, la règle, **le quadrillage entier avec ses axes chiffrés** (c'est
  le papier, pas la réponse), et les lectures `distance` et `largeur-tache`.
  **Absents de toute l'étape :** `longueur-onde` et `rapport` — ils **donneraient
  l'inconnue**.

### 7.4 S4 — `le-cheveu` · « Le cheveu à la place de la fente »

- **État :** `a_mm: "0.060"`, `lambda_nm: "600"`, `D_m: 2.00`,
  **`objet: "fente"`**, `vue: "banc"`, `reference: "depart"`.
- **Contrôle ouvert :** `objet` (**neuf**). **Lectures :** `largeur-fente`,
  `longueur-onde`, `distance`, `largeur-tache` — et `diametre-deduit`
  **après révélation seulement**.
- **Consigne :** « On connaît maintenant le laser : $600$ nanomètres. La fente de
  $0{,}060$ millimètre est en place, l'écran à $2{,}00$ mètres, et la règle donne
  $L = 4{,}00$ centimètres. On va retirer la plaque et poser, **exactement à sa
  place**, un **cheveu** : non plus une ouverture, mais un **obstacle** — un fil
  opaque de quelques dizaines de micromètres, dont on ne connaît pas le
  diamètre. »
- **Pari :** « Sur l'écran, avec le cheveu, on verra… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `ombre-nette` | l'**ombre** du cheveu : un trait sombre fin, large comme lui, au milieu du faisceau — et rien d'autre | non | **`figure-ombre-geometrique`** *(forme « un obstacle fait une ombre »)* | « Regarde l'écran : la même figure qu'avec la fente — une tache centrale large, encadrée de taches plus petites — et la règle donne $3{,}00$ centimètres. L'ombre que tu décris mesurerait quelques centièmes de millimètre. Ce qui se passe derrière un obstacle fin n'est pas une ombre portée : la lumière qui passe **à côté** s'étale, exactement comme celle qui passe **au travers**. Retiens la règle que les sujets emploient sans la démontrer : **un fil diffracte comme une fente de même largeur.** » |
| `rien` | rien de comparable : un cheveu fait environ **130 fois** la longueur d'onde, il est bien trop gros pour diffracter | non | **`diffraction-condition-taille`** *(forme POL-21 B)* | « Le rapport que tu cites est juste — $8{,}00\times10^{-5}/6{,}00\times10^{-7} = 133$ — et la conclusion ne l'est pas. « Du même ordre de grandeur » ne veut pas dire « rapport voisin de 1 » : $0{,}080$ millimètre reste de l'ordre du dixième de millimètre, et la règle le prouve en affichant $3{,}00$ centimètres. Compare d'ailleurs avec la fente que tu viens de quitter : $0{,}060$ millimètre, soit $100$ fois la longueur d'onde — à peine moins que le cheveu, et personne ne doutait qu'elle diffracte. » |
| `meme-figure` | la **même figure** qu'avec une fente : une tache centrale large, encadrée de taches plus petites — et sa largeur permettra de remonter au diamètre du cheveu | **oui** | — | « Oui, et c'est exactement ce que fait le sujet national de 2021. La règle donne $L = 3{,}00$ centimètres ; on garde la même relation en remplaçant la largeur de fente par le diamètre du fil : $d = \dfrac{2\lambda D}{L} = \dfrac{2 \times 600\times10^{-9} \times 2{,}00}{3{,}00\times10^{-2}} = 8{,}00\times10^{-5}$ m, soit **80 micromètres**. Mesure l'ordre de grandeur de ce que tu viens de faire : tu as déterminé une épaisseur de huit centièmes de millimètre avec une **règle graduée en centimètres**, sans microscope. Le facteur d'agrandissement, c'est $2D/L$ — ici $133$. » |
| `plus-large` | une figure de diffraction, mais **plus large** que celle de la fente : le cheveu est plus gros, il gêne davantage le passage | non | **`diffraction-formule-theta`** *(forme « le sens de la variation »)* | « Les deux nombres sont sur la règle : $4{,}00$ centimètres avec la fente, $3{,}00$ avec le cheveu. C'est bien **plus étroit**, et tu peux en tirer une conclusion sans calcul : puisque la tache est au dénominateur de ce qui donne la largeur de l'objet, le cheveu est **plus gros** que la fente. $80$ micromètres contre $60$. Ton intuition sur la taille était juste ; c'est le sens de la variation qui est retourné — plus gros, tache plus **étroite**. » |

*(Arithmétique vérifiée. $L(\text{cheveu}) = 2{,}40\times10^{-6}/8{,}00\times10^{-5}
= 3{,}00\times10^{-2}$ m ✓, c'est le $L_i = 3$ cm de `r-bac` q7.
$d = 2{,}40\times10^{-6}/3{,}00\times10^{-2} = 8{,}00\times10^{-5}$ m ✓.
$d/\lambda = 133$ ✓ ; $a/\lambda = 100$ ✓ ; $2D/L = 400/3{,}00 = 133$ ✓.)*

- **`suite` (40 mots) :** « Bascule entre la fente de $0{,}060$ mm et le cheveu,
  plusieurs fois. Même figure, deux largeurs : $4{,}00$ et $3{,}00$ centimètres.
  Le cheveu est le plus **large** des deux objets, et c'est sa tache qui est la
  plus **étroite**. »
- **⟂-avant-pari :** la figure du cheveu ; la lecture `diametre-deduit` ; la
  référence une fois qu'elle diffère du courant ; le verdict ; tout pixel
  d'accent ; la description lue ne doit contenir ni « même », ni « $3{,}00$ », ni
  « $80$ ».
  **Reste visible :** le banc à l'encre avec la **fente** et sa tache de
  $4{,}00$ cm, la règle, et les lectures du réglage courant. *La consigne dit que
  le cheveu est un obstacle de « quelques dizaines de micromètres » — c'est
  l'énoncé ; son diamètre exact est la réponse, et la frontière passe entre les
  deux.*

### 7.5 S5 — `libre` · « Tout s'ouvre, et une dernière comparaison »

- **État :** `a_mm: "0.100"`, `lambda_nm: "600"`, `D_m: 2.00`, `objet: "fente"`,
  `vue: "banc"` (l'élève peut passer à `banc-et-graphe` par une VUE),
  `reference: "aucune"`.
- **Contrôles ouverts :** les **quatre** (`fente`, `couleur`, `distance`,
  `objet`), tous rouverts. **Lectures :** les onze, `theta-mesure` comprise.
- **Pas de contrôle neuf** — S5 est l'étape de synthèse, et sa `suite` est une
  manœuvre en trois vérifications qui a besoin des quatre réglages. *(Même choix
  que la cuve et la corde à leur étape libre ; les noyaux, eux, gardaient un
  contrôle neuf pour S5. Écrit ici plutôt que découvert à la revue.)*
- **Verdict immédiat, puis les contrôles s'ouvrent** — le pari compare **trois
  réglages** qu'un seul état ne peut pas montrer ensemble.
- **Consigne :** « Tout s'ouvre : les sept fentes, les quatre lasers, l'écran de
  $0{,}40$ à $2{,}00$ mètres, et le cheveu. Une nouvelle lecture apparaît à côté
  de l'écart angulaire : $L/(2D)$, l'angle **calculé depuis la mesure**. C'est le
  contrôle que demande un TP de diffraction — on mesure la tache, on la divise par
  deux fois la distance, et on compare à $\lambda/a$. »
- **Pari :** « Tu veux la tache centrale **la plus large possible** sur cet écran.
  L'écran est à $2{,}00$ mètres dans les trois cas. Le meilleur réglage, c'est… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `fine-et-bleu` | la fente la plus fine ($0{,}060$ mm) avec le laser **bleu** ($450$ nm) : la plus petite longueur d'onde passe le mieux par la plus petite ouverture | non | **`diffraction-formule-theta`** *(forme « le bleu diffracte plus »)* | « Tu as choisi la bonne fente et le mauvais laser : $3{,}00$ centimètres, contre $4{,}33$ avec le rouge sur la **même** fente. Garde la fente et parcours les quatre couleurs : $3{,}00$ ; $3{,}55$ ; $4{,}00$ ; $4{,}33$. La longueur d'onde est au **numérateur** de $\theta = \lambda/a$ : c'est la plus **grande** qui étale le plus, et dans le visible c'est le rouge. » |
| `fine-et-rouge` | la fente la plus fine ($0{,}060$ mm) avec le laser **rouge** ($650$ nm) | **oui** | — | « Oui : $4{,}33$ centimètres, le maximum que ce banc puisse produire. Le plus petit dénominateur avec le plus grand numérateur. Et vérifie la chaîne entière sur ce réglage, c'est le geste que le programme demande : $\lambda/a = \dfrac{6{,}50\times10^{-7}}{6{,}0\times10^{-5}} = 1{,}08\times10^{-2}$ rad, et $\dfrac{L}{2D} = \dfrac{4{,}33}{400} = 1{,}08\times10^{-2}$. Deux chemins, deux bouts de la relation, le même nombre. » |
| `large-et-rouge` | la fente la plus **large** ($1{,}000$ mm) avec le laser rouge : une grande ouverture laisse passer beaucoup plus de lumière | non | **`diffraction-condition-taille`** | « « Laisser passer » et « étaler », ce ne sont pas la même chose — c'est la phrase de la cuve à ondes, et elle vaut ici avec des nombres mille fois plus petits. Cette fente-là donne $0{,}260$ centimètre, seize fois moins que la plus fine. Elle vaut $1\,538$ fois la longueur d'onde du rouge : à ce rapport, la lumière va pratiquement tout droit, et c'est ce que tu vois — un faisceau presque droit, le régime de l'optique géométrique. » |
| `les-trois-pareils` | les trois donnent la même tache : l'écran est à $2{,}00$ mètres dans les trois cas, et c'est la distance qui fixe la largeur | non | **`diffraction-formule-theta`** *(forme « $D$ décide seule »)* | « Les trois réglages donnent $4{,}33$ ; $3{,}00$ ; $0{,}260$ centimètre, avec **le même** écran, à la même place. La distance multiplie ; elle ne décide pas. Ce qu'elle multiplie, c'est l'angle $\theta = \lambda/a$, qui est fixé bien avant l'écran, à la sortie de la fente. Fais le test qui tranche : garde un réglage et promène l'écran — la tache change, et $L/(2D)$ ne bouge pas d'un chiffre. » |

*(Arithmétique vérifiée, $D = 2{,}00$ m. $L(0{,}060 ; 650) = 2{,}60\times10^{-6}/6{,}0\times10^{-5}
= 4{,}333\times10^{-2} \to 4{,}33$ cm ✓ ; $L(0{,}060 ; 450) = 3{,}00$ cm ✓ ;
$L(1{,}000 ; 650) = 2{,}60\times10^{-6}/1{,}00\times10^{-3} = 2{,}60\times10^{-3}$ m
$= 0{,}260$ cm ✓. Rapport $4{,}33/0{,}260 = 16{,}7$ ✓ (« seize fois moins »).
$a/\lambda = 1{,}00\times10^{-3}/6{,}50\times10^{-7} = 1\,538$ ✓.
$L/(2D) = 4{,}333/400 = 1{,}083\times10^{-2}$ et $\lambda/a = 1{,}083\times10^{-2}$ ✓.
Les quatre couleurs à $a = 0{,}060$ : $3{,}00$ ; $3{,}55$ ; $4{,}00$ ; $4{,}33$ ✓, §5.2.)*

- **`suite` (36 mots) :** « Trois vérifications. Fente fixe, laser fixe : $L/D$ ne
  bouge pas. Laser fixe, écran fixe : $a \times L$ ne bouge pas. Fente fixe, écran
  fixe : $L/\lambda$ ne bouge pas. Trois constantes, une seule relation. »
- **⟂-avant-pari :** **toute** lecture d'un réglage autre que le courant ; les
  rayons de bord ; l'arc de $\theta$ ; le crochet $L$ ; `theta-mesure` ; le
  verdict ; tout pixel d'accent.
  **Reste visible :** le banc à l'encre au réglage de départ ($0{,}100$ mm,
  $600$ nm, $2{,}00$ m), sa tache de $2{,}40$ cm, la règle, et la **description
  écrite** des trois réglages dans le pari — *c'est l'énoncé ; les trois largeurs
  sont la réponse.*

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes.** Tout ce qui dépend de l'ISSUE attend
la révélation : les **deux rayons de bord**, l'**arc de $\theta$**, le **crochet
$L$**, la **tache d'un réglage qu'on n'a pas encore appliqué**, les **points** et
la **droite** du graphe, toute lecture qui est une réponse, le verdict, et la
phrase lue au lecteur d'écran. Ce qui reste, c'est **l'énoncé** : le banc à
l'encre, la **règle graduée** (la graduation est l'instrument, pas la réponse), le
**quadrillage vide**, la tache du réglage que la consigne vient de décrire, et les
valeurs qu'elle vient d'énoncer.

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du 2026-09-24 soir) :
*ce qu'une étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT
fait deviner.* La porte **réécrit elle-même** cette table contre le descripteur
(§11.3) :

| étape | contrôle ouvert | ce qu'il peut atteindre | pari suivant mis en danger ? |
|---|---|---|---|
| **S1** | `fente` seul (7 crans) | les sept taches du **laser 600 nm**, à **$D = 2{,}00$ m**, avec une **fente** | **non** pour S2 : `couleur` fermé, une seule longueur d'onde. **non** pour S3 : `distance` fermé, et **aucun quadrillage dans le DOM** (`vue: "banc"`). **non** pour S4 : `objet` fermé. **non** pour S5 : ni couleur ni distance. |
| **S2** | `couleur` seul (4 crans) | les quatre taches de la **fente 0,100 mm**, à $D = 2{,}00$ m | **non** pour S3 : `distance` fermé, pas de quadrillage. **non** pour S4 : `objet` fermé. **non** pour S5 : le pari de S5 se tranche sur un couple (fente, couleur) que S2 ne peut pas former — sa fente est bloquée à $0{,}100$ mm, jamais $0{,}060$ ni $1{,}000$. |
| **S3** | `distance` seul (17 crans) | la droite $L = f(D)$ d'**un seul** couple (fente, laser) | **non** pour S4 : `objet` fermé. **non** pour S5 : `fente` et `couleur` fermés. |
| **S4** | `objet` seul (2 valeurs) | la fente $0{,}060$ mm et le cheveu, à $600$ nm et $2{,}00$ m | **non** pour S5 : ni `fente` ni `couleur` ouverts. |
| **S5** | les quatre | tout | — |

**Une fuite molle, écrite franchement.** S1 fait comprendre que $a$ est au
dénominateur et S2 que $\lambda$ est au numérateur ; un élève qui les a faites
arrive à S5 en sachant que « fine + rouge » gagne. **Ce n'est pas une fuite au
sens de la règle** : la règle interdit d'**atteindre l'état** qu'un pari fait
deviner, pas de comprendre la physique qui y mène — et l'état qui tranche S5
(fente $0{,}060$ **et** laser rouge simultanément) reste inatteignable jusqu'à S5.
C'est volontaire : **S5 doit être gagnable par le raisonnement.**

**Une fuite par le TEXTE, elle, est réelle — et c'est la nouveauté de cette
scène.** La relation $L = 2\lambda D/a$ contient les trois réponses. Si le retour
de S1 l'écrit, S2 et S3 sont mortes. D'où la règle du §2.3, gardée par la porte :

| après la révélation de… | chaînes **autorisées** dans le panneau | chaînes **interdites** |
|---|---|---|
| **S1** | « au dénominateur », `\theta` comme **nombre lu** | `\lambda/a`, `λ/a`, `2\lambda D`, `2λD`, `L = 2` |
| **S2** | `\theta = \lambda/a` | `2\lambda D`, `2λD`, `L = 2` |
| **S3, S4, S5** | tout, y compris $L = \dfrac{2\lambda D}{a}$ et $d = \dfrac{2\lambda D}{L}$ | — |

---

## 8. Misconceptions

Les **sept** modèles déclarés de la notion vivent dans `items.yaml` sous le
préfixe `mc.physics.pc_propagation_onde_lumineuse.`. Les comptes sont **au niveau
ITEM**, méthode `coverage_summary` déclarée en fin de fichier (« item-level, by
`primary_misconception` ») : **22 items**, plancher **3**, `floor_met: true`.
*Les paris de scène ne comptent pas.*

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions visées | compte actuel (items) |
|---|---|---|
| S1 | **`figure-ombre-geometrique` proposé** · `diffraction-formule-theta` (deux formes) | **0 — à créer** · 3 |
| S2 | `diffraction-formule-theta` (deux formes) | 3 |
| S3 | `diffraction-formule-theta` (deux formes) · **`figure-ombre-geometrique` proposé** | 3 · **0** |
| S4 | **`figure-ombre-geometrique` proposé** · `diffraction-condition-taille` · `diffraction-formule-theta` | **0** · 3 · 3 |
| S5 | `diffraction-formule-theta` (deux formes) · `diffraction-condition-taille` | 3 · 3 |

**Deux distracteurs sur un même modèle dans une même question** (S1, S2, S3, S5) :
assumé, parce que les **formes** diffèrent et que les `retour` diffèrent — même
arbitrage que la spec des noyaux. Le compteur d'exposition ne s'en trouve pas
faussé : le plancher se compte sur les **items**.

**Ce que la scène ne confronte PAS, écrit à côté de ce qu'elle confronte**
(ADR 0035) :

- `lumiere-onde-em-niee` et `son-lumiere-memes-proprietes` (R0, R1) : la scène ne
  démontre rien sur le vide ni sur le son. Hors chapitre.
- `indice-vitesse-erronee` (R2) et `lambda-nu-changement-milieu` (R4) : tout se
  passe **dans l'air**, la scène ne change jamais de milieu (§1, §9.7). *Et c'est
  un renoncement réel : le sujet 2025 R fait exactement cela, et il faudrait une
  sixième étape placée dans R4 (§13.5).*
- `dispersion-prisme` (R5) : aucun prisme, aucune lumière blanche (§9.8).

### 8.2 « La figure est l'ombre portée » — un huitième modèle, et voici pourquoi

Les deux modèles de diffraction déclarés sont `diffraction-condition-taille`
(« il faut une **grande** ouverture », ou « la taille n'a pas d'importance ») et
`diffraction-formule-theta` (fraction inversée, unités, $\theta$ pris pour une
longueur, $\theta$ dépendant de $D$). **Aucun des deux ne dit ce que S1, S3 et S4
débusquent** : l'élève qui accepte parfaitement la condition et la formule, et qui
croit malgré tout que **ce qui arrive sur l'écran a la FORME de l'objet** —
l'ouverture, reproduite et un peu floutée ; le fil, projetant son ombre.

Ce modèle est difficile à voir, parce qu'il **coche la bonne réponse partout dans
le corpus actuel** : l'élève qui le porte répond **juste** à POL-3, **juste** à
POL-22, **juste** à `cp-r3-diffraction`, **juste** à POL-4 et POL-19 (des
applications numériques de $\theta = \lambda/a$) — parce qu'**aucune question du
corpus ne demande jamais à quoi la figure ressemble, ni ce que devient un
obstacle**. Il tombe le jour où un sujet remplace la fente par un fil (2021 N q7,
2012 R q4 : **deux sujets sur cinq**), ou demande ce que l'expérience prouve de la
nature de la lumière (2025 R 2-1, 2012 R q2 : *« si la lumière était un flux de
corpuscules allant en ligne droite, une fente étroite en laisserait passer un
mince pinceau… jamais un étalement »* — `bank.yaml:774`, qui **nomme ce modèle
sans qu'aucun item ne le tague**).

Ce n'est ni `diffraction-condition-taille` (qui porte sur la **comparaison
$a$/$\lambda$**, et que l'élève peut réciter correctement) ni
`diffraction-formule-theta` (qui porte sur le **maniement de la relation**, que
l'élève peut appliquer sans erreur). Fusionner, c'est un compteur qui ne dit plus
lequel tourne — même argument que le manège et que les noyaux.

**Recommandation : ouvrir un huitième modèle.** Proposition complète, au format
et avec les quatre champs de `items.yaml` :

```yaml
  - id: mc.physics.pc_propagation_onde_lumineuse.figure-ombre-geometrique
    label: "« La figure observée sur l'écran est l'ombre portée de l'objet » — la tache reproduit la fente (ou le fil), tout au plus un peu floutée"
    description: "L'élève garde le modèle de l'optique géométrique pour l'ÉCRAN, même après avoir accepté la condition de diffraction et la formule. Trois formes. Forme A : la tache centrale est l'IMAGE de l'ouverture, donc elle rétrécit quand la fente rétrécit (au lieu de s'élargir). Forme B : la largeur observée est celle de l'objet PLUS un étalement qui s'y ajoute — d'où une droite L = f(D) qui ne partirait pas de l'origine, ou une tache qui ne pourrait jamais être plus fine que la fente. Forme C : un OBSTACLE (fil, cheveu) ne peut que projeter une ombre ; seule une OUVERTURE diffracterait. Ce modèle répond CORRECTEMENT à toute question de condition (a comparable à λ) et à toute application numérique de θ = λ/a : il ne se révèle qu'en demandant à quoi la figure RESSEMBLE, ce que devient un obstacle, ou d'où part la droite L = f(D)."
    contradicts_principle: "Derrière une ouverture ou un obstacle de dimension a comparable à λ, l'écran ne reçoit pas l'image de l'objet mais une figure de diffraction dont la largeur est gouvernée par l'ÉTALEMENT : L = 2λD/a, sans aucun terme en a qui s'y ajouterait. La tache centrale est donc d'autant plus LARGE que l'objet est FIN, elle est sans commune mesure avec lui (à 0,060 mm, 2,0 m et 600 nm, elle est 667 fois plus large), et la droite L = f(D) passe par l'origine. Un fil diffracte comme une fente de même largeur : c'est ce qui permet de mesurer le diamètre d'un cheveu à la règle."
```

*(Vérification du « 667 fois » : $L = 4{,}00$ cm $= 40{,}0$ mm et $a = 0{,}060$ mm,
donc $40{,}0/0{,}060 = 667$ ✓.)*

**Note de rédaction pour item-author, à ne pas perdre.** Ces deux champs sont des
méta-données d'auteur, jamais rendues. Ils sont écrits **sans le mot « Babinet »**
et **sans argument de complémentarité**, exprès : le cadre autorise le **fait**
(« influence de la dimension de l'ouverture/**obstacle** ») et pas sa
démonstration (§9.9).

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige qu'un `misconception:` employé par un **pari de scène**
soit **déclaré dans `items.yaml` au moment où la scène est validée**.

**Voie de repli si le modèle n'est pas adopté** (quatre lignes changent) : les
quatre choix qui le portent (S1 `image-de-la-fente`, S3 `droite-decalee`,
S4 `ombre-nette`) passent sous `diffraction-condition-taille`, dont la
`description` doit alors être amendée pour couvrir « la tache reproduit l'objet ».
*Je ne la recommande pas* : ce serait mettre sous une même étiquette une erreur de
**comparaison de longueurs** et une erreur de **modèle de la lumière**.

### 8.3 Les trois items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** dont le `primary_misconception` est le
modèle. **Les paris de la scène ne comptent pas.** Total après : **3, plancher
atteint, marge nulle.**

**Conventions de ce fichier, à respecter à la lettre :** les items portent `id`,
`rung`, `difficulty_level`, `skill_code`, `tags`, `primary_misconception`, `stem`,
`type: mcq`, `choices` (chacun `id` A/B/C/D, `text`, `correct`, et pour les faux
`misconception:` + `feedback:`), `correct_feedback`, `solution`.
**`items.yaml` de cette notion ne porte AUCUN champ `habilete:` (0 occurrence sur
22 items) : ne pas en ajouter** — ce serait un changement de schéma, pas une
décision d'item (`DECISIONS-EN-ATTENTE` §3). **`skill_code:
pc_propagation_onde_lumineuse`**, comme les 22 autres. Deux cliquets armés :
`indice-refus` (aucun distracteur qui **refuse** de conclure) et `indice-absolu`
(pas de « jamais » / « toujours » comme indice de forme).

---

**POL-23** — `rung: "R3"`, `difficulty_level: 2`,
`primary_misconception: mc.physics.pc_propagation_onde_lumineuse.figure-ombre-geometrique`

- *stem :* Un laser de longueur d'onde $\lambda = 600\ \text{nm}$ éclaire une
  fente fine de largeur $a = 0{,}060\ \text{mm}$ ; un écran est placé à
  $D = 2{,}0\ \text{m}$. On mesure à la règle la largeur de la tache centrale.
  Que vaut-elle, et que faut-il en conclure sur ce qui arrive sur l'écran ?
- *clé (A) :* $L = 2\lambda D/a = 4{,}0\ \text{cm}$ — environ **670 fois** la
  largeur de la fente : la figure n'a aucun rapport de forme avec l'ouverture,
  c'est l'étalement qui en fixe la taille.
- *distracteurs :*
  - (B) « $L = 0{,}060\ \text{mm}$, la largeur de la fente : l'écran reçoit
    l'image de l'ouverture, un peu floutée sur les bords »
    → **`figure-ombre-geometrique`** *(forme A)*. `feedback` : la mesure donne
    $4{,}0$ cm, soit près de sept cents fois la fente ; ce que l'écran reçoit
    n'est pas une image de l'ouverture mais la figure de l'étalement, et cet
    étalement est d'autant plus large que l'ouverture est fine.
  - (C) « $L = 4{,}0\ \text{cm} + 0{,}060\ \text{mm}$ : c'est la largeur de la
    fente **plus** l'étalement de part et d'autre »
    → **`figure-ombre-geometrique`** *(forme B)*. `feedback` : il n'y a pas de
    terme en $a$ qui s'ajoute — $L = 2\lambda D/a$, et rien d'autre ; le
    « supplément » proposé vaudrait $0{,}0060$ cm, soit un millième de ce qu'on
    mesure, et il n'existe pas.
  - (D) « $L = \lambda D/a = 2{,}0\ \text{cm}$ : la tache est vue depuis la fente
    sous l'angle $\theta = \lambda/a$ » → **`diffraction-formule-theta`**.
    `feedback` : $\theta$ est la **demi**-largeur angulaire, de l'axe jusqu'au
    bord ; $D\theta$ donne donc $L/2$, et la tache entière vaut le double.
- *solution :* $\theta = \lambda/a = 6{,}00\times10^{-7}/6{,}0\times10^{-5}
  = 1{,}0\times10^{-2}$ rad ; $L/2 = D\theta = 2{,}0\times10^{-2}$ m ; d'où
  $L = 4{,}0\times10^{-2}$ m $= 4{,}0$ cm. Le rapport à la fente vaut
  $40\ \text{mm}/0{,}060\ \text{mm} \approx 670$ : une figure de diffraction n'est
  jamais l'ombre portée de l'objet.

**POL-24** — `rung: "R3"`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* On éclaire une fente de largeur $a$ avec un laser, puis on retire la
  plaque et on tend **exactement à sa place** un fil fin (un cheveu) de diamètre
  $d = a$, sans rien changer d'autre. Que voit-on sur l'écran ?
- *clé (A) :* la **même** figure de diffraction, avec la **même** largeur de
  tache centrale : un fil diffracte comme une fente de même largeur.
- *distracteurs :*
  - (B) « l'ombre du fil : un trait sombre fin sur le faisceau, et rien d'autre —
    un obstacle arrête la lumière, il ne l'étale pas »
    → **`figure-ombre-geometrique`** *(forme C)*. `feedback` : la lumière qui
    passe **à côté** d'un obstacle fin s'étale exactement comme celle qui passe
    **au travers** d'une ouverture fine ; c'est ce qui permet de mesurer le
    diamètre d'un cheveu par diffraction, un calcul que les sujets demandent
    régulièrement.
  - (C) « une figure de diffraction, mais **plus large** qu'avec la fente : un
    obstacle gêne davantage le passage qu'une ouverture »
    → **`diffraction-formule-theta`**. `feedback` : à $d = a$ égaux, la relation
    $L = 2\lambda D/a$ donne exactement la même largeur ; et le sens de la
    variation est inverse de l'intuition invoquée — c'est l'objet le plus **fin**
    qui donne la tache la plus **large**.
  - (D) « rien du tout : un cheveu est plus de cent fois plus large que la
    longueur d'onde, il est trop gros pour diffracter »
    → **`diffraction-condition-taille`**. `feedback` : « du même ordre de
    grandeur » n'exige pas un rapport voisin de 1 ; à $0{,}08$ mm, la tache
    centrale mesure encore plusieurs centimètres à deux mètres — largement
    observable.
- *solution :* la relation de diffraction ne distingue pas l'ouverture de
  l'obstacle : elle ne retient que la **dimension** $a$ transverse au faisceau.
  Avec $d = a$, $\theta = \lambda/d = \lambda/a$ et $L = 2\lambda D/d$ est
  inchangée. C'est ce qui rend possible la mesure d'un diamètre de cheveu avec une
  règle graduée en centimètres.
- *interdit de rédaction :* le mot **Babinet**, et tout argument
  d'« écrans complémentaires » (§9.9). Le fait s'énonce, il ne se démontre pas à
  ce niveau.

**POL-25** — `rung: "R6"`, `difficulty_level: 4`, même `primary_misconception`

- *stem :* Avec un laser de longueur d'onde $\lambda$ et une fente de largeur
  $a = 0{,}10\ \text{mm}$, on mesure la largeur $L$ de la tache centrale pour
  plusieurs positions de l'écran. On porte les points sur un graphe $L = f(D)$.
  Quelle allure a ce graphe, et pourquoi ?
- *clé (A) :* une **droite passant par l'origine**, car $L = 2\lambda D/a$ est de
  la forme $L = p\,D$ ; sa pente vaut $p = 2\lambda/a$, et c'est elle qui permet
  de remonter à $\lambda$.
- *distracteurs :*
  - (B) « une droite qui coupe l'axe des ordonnées en $L = a = 0{,}10\
    \text{mm}$ : à distance nulle, la tache a déjà la largeur de la fente, et
    l'étalement s'y ajoute ensuite »
    → **`figure-ombre-geometrique`** *(forme B)*. `feedback` : la relation
    $L = 2\lambda D/a$ ne contient aucun terme additif en $a$ ; l'ordonnée à
    l'origine est nulle. Le « supplément » proposé vaudrait $0{,}010$ cm — un
    centième de la plus petite mesure typique, invisible sur n'importe quel
    graphe.
  - (C) « une courbe qui monte de plus en plus vite : en s'éloignant, la lumière
    a plus d'espace pour s'étaler, donc $\theta$ augmente avec $D$ »
    → **`diffraction-formule-theta`**. `feedback` : $\theta = \lambda/a$ ne
    contient pas $D$ — l'angle est fixé à la sortie de la fente. Reculer l'écran
    ne l'ouvre pas davantage : cela l'intercepte plus loin, ce qui donne une
    croissance **proportionnelle**, donc une droite.
  - (D) « une horizontale : l'écart angulaire $\theta = \lambda/a$ ne dépend pas
    de $D$, donc la largeur de la tache non plus »
    → **`diffraction-formule-theta`**. `feedback` : la prémisse est exacte et la
    conclusion ne suit pas. Un angle constant intercepté à une distance deux fois
    plus grande découpe une longueur deux fois plus grande :
    $L = 2D\theta$ croît avec $D$ alors même que $\theta$ est fixe.
- *solution :* $L = 2\lambda D/a$, donc $L$ est proportionnelle à $D$ à $\lambda$
  et $a$ fixés : droite par l'origine, de pente $p = 2\lambda/a$. On en tire
  $\lambda = p\,a/2$ — c'est exactement l'exploitation demandée par le sujet
  national de 2021.

### 8.4 Un quatrième item : la LECTURE DE MESURES, et l'obstacle de schéma

Le trou que cette spec invoque (« application expérimentale **0 %** », §0) ne se
referme pas avec une scène seule : **il faut que la livraison le referme.** Or il
y a un obstacle mesuré, déjà nommé par la spec des noyaux et toujours vrai :

> **Aucun item du corpus entier ne porte de figure.** Recherche sur les
> `items.yaml` de `content/` (`[[figure:`, `figure_slug`, `figure:`) : **zéro
> occurrence**. Le schéma d'item est textuel ; il n'y a pas de champ où accrocher
> un graphe.

D'où un item qui exerce **le même geste sous la forme que le schéma permet : un
TABLEAU de mesures.** « Exploiter des mesures pour vérifier $\theta = \lambda/a$ »
n'exige pas un dessin.

**POL-26** — `rung: "R6"`, `difficulty_level: 4`,
`primary_misconception: mc.physics.pc_propagation_onde_lumineuse.diffraction-formule-theta`
*(lecture de mesures — le geste « exploiter la courbe $L = f(D)$ » du sujet 2021)*

- *stem :* On éclaire une fente de largeur $a = 0{,}060\ \text{mm}$ avec un laser
  de longueur d'onde inconnue, et on mesure la largeur $L$ de la tache centrale
  pour cinq positions de l'écran. **Déterminer $\lambda$.**

  | $D$ (cm) | 50 | 75 | 100 | 125 | 150 |
  |---|---|---|---|---|---|
  | $L$ (cm) | 1,00 | 1,50 | 2,00 | 2,50 | 3,00 |

- *clé (A) :* $\lambda = 600\ \text{nm}$ — les mesures donnent
  $L/D = 2{,}00\times10^{-2}$ à chaque fois ; cette pente vaut $2\lambda/a$, d'où
  $\lambda = p\,a/2$.
- *distracteurs :*
  - (B) « $\lambda = 1\,200\ \text{nm}$ : la pente vaut $\lambda/a$, donc
    $\lambda = p\,a$ » → **`diffraction-formule-theta`** *(facteur 2 oublié)*.
    `feedback` : la pente de $L = f(D)$ vaut $2\lambda/a$, pas $\lambda/a$, parce
    que $\theta$ est la **demi**-largeur angulaire et que $L$ en compte deux ;
    $1\,200$ nm est d'ailleurs hors du visible, ce qui aurait dû alerter pour un
    laser qu'on voit.
  - (C) « $\lambda = 2{,}00\ \text{cm}$ : c'est la largeur de la tache mesurée à
    $D = 100\ \text{cm}$ » → **`diffraction-formule-theta`** *($\theta$ ou $p$
    pris pour une longueur d'onde)*. `feedback` : le tableau donne des largeurs
    de tache, pas des longueurs d'onde ; $2$ cm est cinquante mille fois trop
    grand pour une lumière visible. Ce qu'on tire des mesures, c'est une
    **pente**, qu'il faut ensuite relier à $\lambda$ par $a$ — deux étapes, pas
    une.
  - (D) « $\lambda = 6{,}0\ \text{mm}$ : on divise $2a$ par la pente »
    → **`diffraction-formule-theta`** *(fraction inversée)*. `feedback` : la
    relation $p = 2\lambda/a$ s'inverse en $\lambda = p\,a/2$ — on **multiplie**
    la pente par $a$. Diviser donne $6{,}0$ mm, une longueur d'onde de
    micro-ondes : l'ordre de grandeur suffit à écarter la piste.
- *solution :* les cinq rapports $L/D$ valent tous $2{,}00\times10^{-2}$ (par
  exemple $3{,}00/150 = 2{,}00\times10^{-2}$) : les points sont alignés sur une
  droite passant par l'origine, de pente $p = 2\lambda/a$. D'où
  $\lambda = \dfrac{p\,a}{2} = \dfrac{2{,}00\times10^{-2}\times 6{,}0\times10^{-5}}{2}
  = 6{,}0\times10^{-7}$ m $= 600$ nm. Contrôle : $600$ nm est bien une longueur
  d'onde du visible.
- *arithmétique (vérifiée) :* $L = 2\lambda D/a = 2\times6{,}00\times10^{-7}\times
  D/6{,}0\times10^{-5} = 2{,}00\times10^{-2}\,D$, donc $D = 50$ cm $\Rightarrow$
  $L = 1{,}00$ cm ; $75 \Rightarrow 1{,}50$ ; $100 \Rightarrow 2{,}00$ ;
  $125 \Rightarrow 2{,}50$ ; $150 \Rightarrow 3{,}00$ ✓. Distracteur B :
  $p\,a = 2{,}00\times10^{-2}\times6{,}0\times10^{-5} = 1{,}2\times10^{-6}$ m
  $= 1\,200$ nm ✓. Distracteur D : $2a/p = 1{,}2\times10^{-4}/2{,}00\times10^{-2}
  = 6{,}0\times10^{-3}$ m ✓.

**Après application :** `total_items: **26**` ;
`figure-ombre-geometrique: 3` (POL-23, 24, 25 — plancher atteint, **marge
nulle**) ; `diffraction-formule-theta: 4` (+ POL-26) ; les cinq autres modèles
inchangés. `ramp_coverage` : R3 passe de 4 à **6**, R6 de 3 à **5**.
`coverage_summary` régénéré par `node web/scripts/resume-couverture.mjs`.

**Ce que ce paquet NE referme pas, et il faut le dire.** Le champ `habilete`
**n'existe sur aucun des 22 items** de cette notion ; ajouter les quatre nouveaux
ne rend donc **pas** le mélange 50 / 15 / 35 calculable — c'est la décision de
propriétaire du `DECISIONS-EN-ATTENTE` §3, et cette livraison ne la tranche pas.
Ce qu'elle change est réel et plus modeste : **un modèle que cinq sujets sur cinq
sollicitent et qu'aucun item ne taguait est enfin nommé** ; **un item exerce une
lecture de mesures**, là où la notion n'en avait aucun.

**Une dette voisine, signalée sans être commandée ici :** le savoir-faire
« **proposer un montage** de mise en évidence de la diffraction » n'est couvert
par **aucun** item ni aucune ligne de `lesson.md` (mesuré). La scène **est** ce
montage, mais un manipulable ne compte pas dans la couverture. *§13.7.*

---

## 9. La frontière de programme — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3,
`frontiere`), **et chacune avec son essai rouge** (§11.4, sabotage 15).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée
> absente que si l'on a énuméré ses formes*). Interdire « interférence » sans
> interdire « interfrange » laisse passer la phrase ; interdire « intensité » sans
> interdire `I(\theta)` laisse passer la formule. Chaque ligne liste donc les
> **variantes d'écriture**, symbole et forme LaTeX comprises, et la porte les
> cherche dans le texte **rendu** (après KaTeX), pas dans la source. *Rappel de
> la porte des noyaux : `\b` ignore les accents — chercher en **début de mot** et
> en Unicode.*

1. **Aucune interférence.** Exclusion du sous-domaine (« Interférences lumineuses
   (Young, interfrange, cohérence) — seule la DIFFRACTION est traitée »).
   Interdits : `interférence`, `interfére`, `interfèr`, `interfrange`, `Young`,
   `fentes de Young`, `bifente`, `deux fentes`, `cohéren`, `déphasage`,
   `différence de marche`, `franges brillantes`, **`frange`** *(les sujets
   l'emploient — « la frange centrale » de 2012 R —, la scène écrit **tache**,
   comme 2021 N et comme la leçon)*.
   **La scène ne montre qu'UNE seule ouverture, toujours**, et jamais deux objets
   à la fois.
2. **Aucun réseau.** Exclusion. Interdits : `réseau`, `traits par mm`,
   `pas du réseau`, `ordre k`, `ordre 1`, `d\sin\theta`, `k\lambda`.
3. **Aucune intégrale de diffraction, aucun profil nommé.** `limites` du cadre :
   « Pas d'intégrale de diffraction ». Interdits : `sinc`, `sin(u)/u`,
   `\operatorname{sinc}`, `intensité`, `éclairement`, `I(\theta)`, `I_0`,
   `amplitude complexe`, `Huygens`, `Fresnel`, `Fraunhofer`, `source secondaire`,
   `minimum d'ordre`, `annulation`, `extinction`, `intégrale`.
   *Le profil est un choix de RENDU (§5.4, §10.5) : il n'est ni nommé, ni écrit,
   ni mesuré à l'écran. Aucune **largeur de tache secondaire** n'est affichée.*
4. **Aucune polarisation.** Exclusion. Interdits : `polaris`.
5. **Aucun effet Doppler.** Exclusion. Interdits : `Doppler`.
6. **Aucune équation de propagation.** Exclusion. Interdits :
   `équation d'onde`, `équation de propagation`, `d'Alembert`, `laplacien`,
   `\partial^2`, `dérivée partielle`.
7. **Aucun changement de milieu, aucun indice.** C'est R2 et R4, et la scène est
   en R3. Interdits : `indice`, `n = c/v`, `\lambda_0/n`, `réfraction`,
   `réfracté`, `milieu transparent`, `plongé dans`, `liquide`, `eau`, `verre`.
   **Tout se passe dans l'air**, et $\lambda$ y est celle du vide à
   $3\times10^{-4}$ près (§10.6).
8. **Aucune couleur de la lumière au sens de R4, aucun prisme.** Interdits :
   `monochromatique`, `polychromatique`, `lumière blanche`, `spectre`,
   `arc-en-ciel`, `prisme`, `dispersion`, `dispersif`, `\lambda_0`, `\nu`,
   `fréquence`. *La scène dit « un laser, qui n'émet qu'une seule longueur
   d'onde » — la chose, pas le mot que R4 définira.*
9. **Aucun théorème de Babinet, aucun argument de complémentarité.** Le **fait**
   est au cadre (« ouverture/**obstacle** ») ; sa **démonstration** ne l'est pas.
   Interdits : `Babinet`, `complémentaire`, `écrans complémentaires`,
   `principe de complémentarité`.
10. **Aucun critère chiffré de diffraction.** $\lambda/a > 10^{-3}$ est dans un
    corrigé (2012 R), **ni dans le cadre ni dans la leçon** (§2.5). Interdits :
    `> 10^{-3}`, `10^{-3}` **en position de seuil**, `critère`, `seuil`,
    `condition chiffrée`.
11. **Aucune photométrie.** La scène affirme des **largeurs**. Interdits :
    `luminosité`, `brillance`, `puissance`, `watt`, `W/m`, `lux`, `énergie`,
    `flux lumineux`, `photon`, `quantique`.
12. **Aucun angle en degrés.** Le cadre demande « unité et signification de
    $\theta$ » : $\theta$ est en **radians**, et le dessin est exagéré (§5.3) —
    l'étiqueter en degrés serait afficher un angle faux. Interdits : `°`,
    `degré`, `\deg`, `rad` **suivi d'une conversion**. *La porte le lit sur
    l'étiquette de l'arc, pas seulement dans la fiche.*
13. **Aucune échelle logarithmique.** Les deux axes du graphe sont **linéaires**,
    toujours. Interdits : `log`, `semi-log`, `logarithmique`, `linéarisation`.
    La porte le mesure aussi en pixels (graduations équidistantes).
14. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière.
15. **La scène ne remplace pas le TP.** Le cadre en liste un (« Diffraction des
    ondes lumineuses ; vérifier $\theta = \lambda/a$ ») ; la scène en répète le
    **geste** et le dit (§10.4). Interdits dans les champs rendus : `travaux
    pratiques`, `TP`, `on a mesuré au laboratoire`, `incertitude`, `± 1 mm`.

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus dangereuse.
Et ici, le défaut mesuré du média existant est **exactement** un défaut d'échelle
tue (§2.1) : cette scène n'a pas le droit de le refaire.

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points
> 1 à 4 SEULEMENT**, et ce sont aussi les phrases de légende. **Les points 5 à 8
> ne sont rendus nulle part** : ce sont des notes de conception, pour l'auteur et
> pour la revue.

1. **L'angle est exagéré, d'un facteur déclaré et constant.** Les largeurs sont
   dessinées **dix fois plus grandes** que les distances ; tout angle paraît donc
   dix fois trop ouvert. Le facteur est le **même** à tous les réglages : les
   **rapports** dessinés sont vrais, les angles ne le sont pas. Sur un vrai banc,
   l'angle le plus ouvert de cette scène vaut $0{,}62°$ — un demi-degré, qu'aucun
   dessin à l'échelle ne montrerait. *Légende :* « Largeurs ×10 : sans cela la
   tache serait plus fine qu'un trait. Les rapports sont exacts, les angles non. »
2. **La fente n'est à aucune des deux échelles : c'est un symbole, de largeur
   constante.** À l'échelle des largeurs, $0{,}060$ mm ferait un dixième de pixel
   et une longueur d'onde un millième. **On ne peut pas dessiner $a$ et $\lambda$
   sur la même image** — c'est ce qui sépare ce chapitre de la cuve à ondes, où
   on le pouvait ($a/\lambda$ y allait de $0{,}125$ à $8$ ; ici, de **100 à
   1 667**). La comparaison se lit donc en **nombre**, jamais en dessin.
   *Légende :* « Le trait de la fente est un symbole : sa largeur dessinée ne
   change pas. Le nombre à côté, si. »
3. **L'image de la tache est éclaircie.** Sur un vrai écran, la première tache
   voisine est environ **vingt fois** moins lumineuse que la centrale ; le rendu
   applique une échelle déclarée pour qu'elle reste visible. Ce que la scène
   affirme, ce sont les **largeurs** — les bords de la tache centrale, à
   $\pm\lambda D/a$ de l'axe — jamais les **luminosités**. *Légende :* « Les
   taches voisines sont éclaircies pour rester visibles ; en vrai, elles sont
   environ vingt fois plus faibles. »
4. **La règle est parfaite : $L$ est calculée, pas mesurée.** Sur un vrai banc on
   lit à un millimètre près, et $\theta = \lambda/a$ se vérifie à quelques pour
   cent, pas au chiffre. La scène enseigne le **geste** — lire les deux bords,
   soustraire, diviser par $2D$ — et **l'accord entre $\lambda/a$ et $L/(2D)$ y
   est construit, pas découvert**. *Légende :* « Banc idéal : les largeurs sont
   calculées. Sur un vrai montage, la règle donne ±1 mm et l'accord n'est jamais
   parfait. »
5. *(non rendu — note de conception)* **Le profil dessiné est celui d'une fente
   simple éclairée par une onde plane** ; ses extinctions tombent en
   $k\lambda D/a$, ce qui fixe la tache centrale à $2\lambda D/a$. C'est un choix
   de **rendu**, jamais un contenu : aucune formule d'intensité n'est affichée ni
   nommée (§9.3), et la largeur des taches secondaires n'est ni lue ni commentée.
   *La porte, elle, a le droit de mesurer où tombent les zéros — règle de la
   cuve.*
6. *(non rendu)* **Tout se passe dans l'air, et la scène ne le dit pas parce
   qu'elle n'a pas encore le vocabulaire** (R4). $\lambda$ affichée est la
   longueur d'onde dans l'air, qui vaut celle du vide à $3\times10^{-4}$ près.
   Aucun changement de milieu (§9.7).
7. *(non rendu)* **Un vrai laser n'est pas une onde plane parfaite** : son
   faisceau a une largeur finie et une divergence propre, la fente n'est pas
   infiniment longue, et les bords de la tache centrale ne sont nets que si le
   faisceau couvre bien la fente. La scène est **plus propre que la réalité** ;
   elle ne doit jamais servir d'argument contre une photo de TP moins nette.
8. *(non rendu)* **Le cheveu n'est ni un cylindre parfait ni parfaitement
   opaque**, et $80$ µm est une **valeur de sujet** (`r-bac` q7), pas une mesure.
   Un cheveu réel va de 50 à 100 µm selon les personnes.

---

## 11. La porte (`web/scripts/scene-diffraction.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="banc-de-diffraction"]`,
**jamais** par `[data-scene]` seul (précédent : la porte de l'orbite ouvrant le
chapitre du champ magnétique, run 747). Elle se lance **plusieurs fois, à
plusieurs largeurs** (1 280 px et 390 px au minimum) avant d'être crue. Quatre
verdicts honnêtes (ADR 0034/0038) : **ROUGE**, **AVERTISSEMENT-vu**,
**VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas disponible au banc,
elle sort **MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES**
(règle de la corde, ADR 0041 : *une seconde voie analytique recalcule des nombres ;
une simulation n'établit que des invariants*). Elle les recalcule **sans importer
aucun module du produit** (ADR 0036 : une porte qui importe le module se donne
raison), depuis les seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $L = 2\lambda D/a$ aux **28** combinaisons (7 fentes × 4 lasers) à $D = 2{,}00$ m | la table du §5.2 | **égalité de chaîne** avec `largeur-tache`, 3 c.s. |
| N2 | $L$ aux **17** positions de `distance` ($a = 0{,}060$ mm, 600 nm) | $0{,}800 \to 4{,}00$ cm | égalité de chaîne, 3 c.s. |
| N3 | $\theta = \lambda/a$ aux 28 combinaisons | $4{,}50\times10^{-4} \to 1{,}08\times10^{-2}$ | égalité de chaîne, 3 c.s. ; **unité `rad` affichée, aucun `°` nulle part** |
| N4 | le produit $a \times L$ aux **7** crans, **sur les valeurs AFFICHÉES** | **0,240** sept fois | égalité de chaîne — *chaîne de calcul, pas valeur isolée* |
| N5 | `pente` $= L/D$ aux 17 positions, puis $\lambda = p\,a/2$ | $2{,}00\times10^{-2}$ et **600 nm** | égalité de chaîne |
| N6 | `diametre-deduit` $= 2\lambda D/L$ depuis le $L$ **affiché** en S4 | **80,0 µm** | égalité de chaîne |
| N7 | la cohérence interne `theta-mesure` $= L/(2D)$ contre `ecart-angulaire` $= \lambda/a$, aux 28 combinaisons | identiques | 0,5 % — *les deux viennent de bouts différents de la chaîne* |
| N8 | `rapport` $= a/\lambda$, **entier** | 100 · 133 · 167 · 250 · 333 · 500 · 1 667 (à 600 nm) | exact |
| N9 | le $L$ du **cheveu** contre le $L$ d'une fente de $0{,}080$ mm, mêmes $\lambda$ et $D$ | **identiques au bit près** | exact — *l'équivalence fil/fente est STRUCTURELLE dans le code (une seule fonction, une seule dimension transverse), jamais un cas particulier recopié* |
| N10 | les **bornes** : `distance` ne sort pas de $[0{,}40 ; 2{,}00]$, `fente` n'a que 7 valeurs, `couleur` que 4 | — | exact |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au
pixel absolu : le facteur px/cm est **lu sur les graduations de la règle**, et le
facteur px/m sur la cote de $D$ (leçon de la porte du champ magnétique — « une
sonde qui lit un détail de dessin se règle sur l'ÉCHELLE, pas sur le pixel »).
Lancée à **1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `tache-et-regle` | la largeur **en pixels** de la bande centrale peinte $=$ `largeur-tache` × (px/cm lus sur la règle), à $\le 1$ px, aux 28 combinaisons | une tache dessinée depuis un autre nombre que celui affiché doit rougir |
| `plus-etroite-plus-large` | **trois balayages, trois sens** : à $\lambda$ et $D$ fixés, la largeur en px **décroît strictement** quand $a$ passe de $0{,}060$ à $1{,}000$ mm ; à $a$ et $D$ fixés, elle **croît strictement** quand $\lambda$ passe de 450 à 650 ; à $a$ et $\lambda$ fixés, elle **croît strictement** avec $D$ | $L \propto a$ (la misconception posée dans le code), $L$ indépendante de $\lambda$, ou $L$ indépendante de $D$ — **chacun doit faire rougir SON sens seul** |
| `eventail-fixe` | S3 : sur les 17 positions de `distance`, la **pente en pixels** des deux rayons de bord (leur écartement divisé par la distance parcourue) est **constante** à $\le 1$ % ; et largeur en px $/$ $D$ en px est constante à $\le 1$ % | un éventail qui s'ouvre avec $D$, ou une tache qui ne suit pas $D$, doivent rougir. **C'est la famille qui garde la misconception centrale (§2.2)** |
| `exageration-constante` | (demi-angle dessiné, mesuré sur les pixels des deux rayons) $/$ $\theta$ $= \mathbf{10{,}0}$ à $\le 2$ % aux **28** combinaisons **et aux deux largeurs d'écran** ; et le facteur **écrit** sur la scène vaut bien 10 | un facteur qui change d'un réglage à l'autre (un cadrage « pour que ça rende bien ») doit rougir **seul** — *c'est le défaut exact de `diffraction-fente.svg`, §2.1* |
| `fente-symbole` | la largeur **dessinée** du trait de la fente est **identique** aux 7 crans, à $\le 1$ px | une fente dessinée proportionnelle à $a$ doit rougir : elle inviterait à lire une échelle qui n'existe pas (§5.3) |
| `regle-graduee` | les graduations majeures de la règle sont équidistantes à $\le 1$ px, chiffrées en cm, **10 fines par cm** ; l'axe optique tombe **sur** une graduation majeure | un pas irrégulier, un axe entre deux traits, ou une règle non chiffrée doivent rougir |
| `graphe-droite` | S3 : les **5** points sont colinéaires à $\le 1$ px ; la droite passe par l'**origine** à $\le 1$ px ; les graduations des deux axes sont équidistantes ($\le 1$ px) ; le point $(120 ; 2{,}4)$ tombe sur un croisement majeur/fin | une droite décalée de l'origine ($L = a + 2\lambda D/a$, le distracteur `droite-decalee` posé dans le code) doit rougir **seule** ; une échelle logarithmique doit rougir |
| `secondaires` | les extinctions peintes tombent à $k \times$ (px/cm × $\lambda D/a$) de l'axe pour $k = 1, 2, 3$, à $\le 2$ px | un motif deux fois trop large (zéros en $k\lambda D/2a$) doit rougir **seule** — *la tache centrale, elle, resterait juste : c'est le cas que seule cette famille attrape* |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**, jamais en luminance — ADR 0041, cinquième scène) ; aucun rayon de bord ; aucun arc ; aucun crochet ; aucun point sur le quadrillage ; aucune lecture-réponse dans le DOM | après l'engagement : les rayons, l'arc, le crochet et les points apparaissent, et l'accent avec |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une tache peinte en teinte spectrale (rouge/vert/bleu selon $\lambda$) doit rougir **seule** (§2.5) |
| `formule-graduee` | le panneau **ne contient pas** `\lambda/a` ni `λ/a` avant la révélation de S2, ni `2\lambda D` ni `2λD` avant celle de S3 ; et les contient **après** | écrire la relation entière dans un retour de S1 doit rougir **seule** — *la fuite par le TEXTE, §2.3* |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table du §7.6 contre le descripteur : `couleur` n'est ouvert qu'à partir de S2, `distance` qu'à partir de S3, `objet` qu'à partir de S4 ; `vue: "banc-et-graphe"` n'existe qu'en S3 et S5 | ouvrir `couleur` en S1, ou poser le quadrillage en S1, doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucune boucle) · `etapes`
(chaque étape pose son état, n'ouvre que **son** contrôle, les autres **absents du
DOM** ; le quadrillage absent hors S3/S5) · `paris` (3 ou 4 choix, exactement un
juste, un `retour` par choix, rien dans la région live avant l'engagement) ·
`frontiere` (aucune des chaînes du §9 dans le panneau ouvert, **une sonde par
forme**) · `eclairs` (aucune fenêtre de 10° ne s'éclaire plus de trois fois par
seconde — **attendu structurellement vide**, mesuré quand même, §6) ·
`sans-mouvement` (`prefers-reduced-motion` : rien à honorer, et aucune transition
introduite) · `katex` (aucun LaTeX brut visible ; $\lambda$, $\theta$, $a$, $D$,
$L$ rendus — jamais par la police du chrome, ADR 0030) · `etiquettes` (aucune
étiquette n'en chevauche une autre, n'est barrée par un trait, ni ne sort du
cadre — à 1 280 **et** à 390 px ; pièce commune `disposer`, obligatoire ici : les
étiquettes `laser`, `fente`/`cheveu`, `écran`, `D`, `L`, `θ` se croisent quand
l'écran est à $0{,}40$ m) · `ergonomie` (pièce commune
`scripts/lib/scene-ergonomie.mjs` : ouvrir, parier, avancer, revenir **au
clavier** sans perdre le focus ; toute cible $\ge 44$ px ; `.curseur` sur
`distance` ; colonne de réglages $\ge$ 18rem ; `scroll-margin-top` **vérifié en
donnant le focus**) · `console` (aucune erreur).

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec
cette commande** (ADR 0034). Sabotages à outiller, un par famille :

1. poser $L = \lambda D/a$ (**facteur 2 manquant** — l'erreur de copie la plus
   fréquente du chapitre) → `nombres` (N1, N2, N5, N6), `tache-et-regle` ;
2. poser $L \propto a$ (la misconception `diffraction-condition-taille` dans le
   code) → `plus-etroite-plus-large` (sens $a$) **seule** ;
3. rendre $L$ indépendante de $\lambda$ → `plus-etroite-plus-large` (sens
   $\lambda$), `nombres` (N1) ;
4. rendre $L$ indépendante de $D$ → `plus-etroite-plus-large` (sens $D$),
   `eventail-fixe`, `graphe-droite` ;
5. poser $\theta = a/\lambda$ (fraction inversée) → `nombres` (N3),
   `exageration-constante` ;
6. faire varier le facteur d'exagération avec $a$ (recadrer à chaque cran) →
   `exageration-constante` **seule** ;
7. étiqueter l'arc de $\theta$ en **degrés** → `frontiere` (forme `°`),
   `nombres` (N3, unité) ;
8. dessiner la fente proportionnelle à $a$ → `fente-symbole` **seule** ;
9. décaler la graduation de la règle d'un demi-pas, ou poser l'axe optique entre
   deux traits → `regle-graduee` **seule** ;
10. faire partir la droite du graphe de $L = a$ au lieu de l'origine (le
    distracteur `droite-decalee` réalisé) → `graphe-droite` **seule** ;
11. poser les extinctions en $k\lambda D/(2a)$ (motif deux fois trop large,
    **tache centrale juste**) → `secondaires` **seule** ;
12. afficher les rayons de bord, l'arc, le crochet ou un point du graphe **avant**
    le pari → `avant-pari` ;
13. peindre la tache en teinte spectrale selon $\lambda$ → `palette` **seule** ;
14. écrire « $L = 2\lambda D/a$ » dans le retour de S1 → `formule-graduee`
    **seule** ;
15. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE
    PAR FORME**, jamais une seule pour la liste entière (ADR 0036). La porte
    déclare une sonde nommée par forme, et l'essai rouge les parcourt toutes :
    `interférence`, `interfrange`, `Young`, **`frange`**, `cohéren` ·
    `réseau`, `ordre k` · `sinc`, `intensité`, `Huygens`, `Fraunhofer`,
    `source secondaire` · `polaris` · `Doppler` · `équation d'onde` ·
    `indice`, `réfract`, `\lambda_0/n`, `liquide` · `monochromatique`,
    `polychromatique`, `lumière blanche`, `prisme`, `dispersion` · `Babinet`,
    `complémentaire` · `> 10^{-3}`, `critère` · `luminosité`, `photon` · `°`,
    `degré` · `semi-log`, `logarithmique`. **Chacune doit faire rougir
    `frontiere` SEULE** ; une forme qui ne fait rien rougir est une sonde
    manquante, pas un produit propre ;
16. ouvrir `couleur` dès S1, ou poser `vue: "banc-et-graphe"` en S1 →
    `fuite-inter-etapes` **seule** ;
17. faire du cheveu un cas particulier (un $L$ recopié au lieu de la même
    fonction) → `nombres` (N9) **seule** ;
18. `import("three")` dans le module de la scène → `pas-de-3d` ;
19. passer l'axe $L$ du graphe en échelle logarithmique → `graphe-droite`,
    `frontiere` ;
20. supprimer l'éclaircissement des taches voisines (elles disparaissent) →
    `secondaires` **seule** — *le sabotage dans l'autre sens : la scène montrerait
    une seule tache, et sa légende continuerait de parler de « taches plus
    petites ».*

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir
que **la** porte qui le garde : si le sabotage 6 fait aussi rougir
`tache-et-regle`, c'est que les deux familles mesurent la même chose et qu'il faut
en resserrer une.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la
question héritée, §13.9) :

```json
"banc-de-diffraction": {
  "temps": false,
  "dimension": "2d",
  "controles": ["fente", "couleur", "distance", "objet"],
  "etat": ["a_mm", "lambda_nm", "D_m", "objet", "vue", "reference"],
  "bornes": {
    "D_m": [0.40, 2.00]
  },
  "valeurs": {
    "a_mm": ["0.060", "0.080", "0.100", "0.150", "0.200", "0.300", "1.000"],
    "lambda_nm": ["450", "532", "600", "650"],
    "objet": ["fente", "cheveu"],
    "vue": ["banc", "banc-et-graphe"],
    "reference": ["aucune", "depart"]
  },
  "lectures": ["largeur-fente", "longueur-onde", "distance", "largeur-tache",
               "bords", "ecart-angulaire", "rapport", "pente",
               "lambda-deduite", "diametre-deduit", "theta-mesure"]
}
```

*Aucune clé `course` : la scène n'en a pas (§6), et aucune étape ne porte
`revele_apres_course` ni `revele_apres_h`.*
*`a_mm` et `lambda_nm` sont des énumérations de **chaînes**, exactement comme
`f_hz` dans la cuve, `v_ms` dans la corde et `t_demi_j` dans les noyaux : des
crans, aucune valeur intermédiaire, **aucune machinerie nouvelle** dans
`validate-content`.*

**Table des états, à recopier dans le descripteur :**

| étape | `a_mm` | `lambda_nm` | `D_m` | `objet` | `vue` | `reference` | contrôle neuf |
|---|---|---|---|---|---|---|---|
| S1 | **`0.200`** | `600` | 2.00 | `fente` | `banc` | `depart` | `fente` |
| S2 | `0.100` | **`450`** | 2.00 | `fente` | `banc` | `depart` | `couleur` |
| S3 | `0.060` | `600` *(non affiché)* | **0.40** | `fente` | **`banc-et-graphe`** | `aucune` | `distance` |
| S4 | `0.060` | `600` | 2.00 | **`fente`** | `banc` | `depart` | `objet` |
| S5 | `0.100` | `600` | 2.00 | `fente` | `banc` | `aucune` | — *(les quatre rouverts)* |

**Champs du descripteur, au-delà des étapes** (modèle : `cuve-a-ondes.json`) :
`slug`, `tool: "scene2d"`, `type: "manipulable"`, `scene: "banc-de-diffraction"`,
`title_fr`, `caption_fr`, `boundary` (le §9 en une phrase dense), `fit_caveat`
(les points 1 à 4 du §10 **seulement**), `fallback_note`, `pedagogy_wiring`
(`why_manipulable`, `predict_then_reveal`, `misconceptions` — la liste des ids
employés par les paris), `spec_ref`, `adr_ref`.

**`fallback_note` proposée :** « Sans JavaScript et à l'impression, le panneau
disparaît. La figure `diffraction-fente` plus bas dans le chapitre couvre la
géométrie (fente, $\theta$, écran, $L$) ; **aucune** figure du corpus ne couvre la
variation de $a$, celle de $\lambda$, celle de $D$, ni le passage de la fente au
fil — c'est précisément ce que le banc apporte, et c'est pourquoi les retouches de
prose du §4.3 et du §4.5 l'écrivent en toutes lettres. »

**Ordre de construction, et ce qui doit être vert avant l'étape suivante :**

1. `items.yaml` — déclarer `figure-ombre-geometrique` (§8.2) et écrire **POL-23 à
   POL-26** (§8.3, §8.4) ; régénérer `coverage_summary` (`total_items: 26`).
   **`validate-content --strict` vert avant la suite** (la scène ne validera pas
   sans le modèle).
2. `web/src/lib/scene2d/diffraction-modele.ts` — $\theta$, $L$, les bords, la
   pente, $\lambda$ déduite, $d$ déduit, **et le profil de rendu** ; aucun rendu,
   aucune couleur. **Une seule fonction pour la fente et pour le fil** (N9). Test
   unitaire `web/scripts/test-diffraction.mjs` : les 28 valeurs du §5.2 et
   l'invariant $a\times L$ à $10^{-12}$.
3. `web/src/lib/scene2d/diffraction-rendu.ts` — le banc, **les deux échelles et
   leur facteur déclaré** (§5.3), la règle graduée, la bande de l'écran, le
   quadrillage du graphe ; palette lue dans les jetons (`lib/jetons-figure.ts`,
   **pas** `scene3d/palette.ts`, qui importerait three) ; étiquettes posées par
   `disposer`, jamais `poser`.
4. `scenes.json` + le descripteur `media/banc-de-diffraction.json`.
5. Les cinq retouches de prose (§4), **le §4.1 avant le marqueur**.
6. `web/scripts/scene-diffraction.mjs` — la porte, **avec son `--essai-rouge`** ;
   lancée deux fois à quatre largeurs avant d'être crue.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut

1. **Cette notion, ou `lois-de-newton` ?** (§0). `lois-de-newton` porte **27 %**
   contre **11 %**, et elle était déjà inscrite comme candidate suivante.
   **Recommandation : la diffraction**, parce que son trou est un **instrument
   manquant sur un contenu dense**, tandis que celui de `lois-de-newton` est un
   **contenu manquant** (trois savoir-faire à zéro) — qu'un manipulable ne
   referme pas. *Réversible : cette spec ne touche rien tant qu'elle n'est pas
   adoptée.*
2. **Le huitième modèle de misconception** (§8.2) : ouvrir
   `figure-ombre-geometrique` avec ses trois items, ou amender
   `diffraction-condition-taille` ? **Recommandation : ouvrir.** C'est le seul
   modèle du chapitre qui **coche la bonne réponse partout** dans le corpus
   actuel, et `bank.yaml:774` le décrit déjà en toutes lettres (« si la lumière
   était un flux de corpuscules… ») sans qu'aucun item ne le tague. Décision
   humaine : elle touche l'inventaire et un `coverage_summary` généré.
   *Réversible : trois étiquettes d'items, quatre choix de paris, une
   `description` à amender.*
3. **Faut-il teinter la tache selon $\lambda$ ?** (§2.5, §6). **Recommandation :
   non.** ADR 0041 §4 impose les jetons `--figure-*` et « l'accent marque une
   seule chose » ; une teinte simulée sur un écran non calibré est de toute façon
   un mensonge sur la couleur ; et elle inviterait à lire la cause dans la teinte
   (« le rouge est plus gros ») au lieu du nombre. Le laser est **nommé**
   (« rouge, 650 nm »). *Si le propriétaire tranche l'inverse, la famille
   `palette` change de sens et le sabotage 13 disparaît.*
4. **Le facteur d'exagération ×10** (§5.3). **Recommandation : garder.** À ×10, la
   fente la plus fine ouvre un angle dessiné de $5{,}7°$ (lisible) et la fente
   d'un millimètre reste **visiblement droite** (0,34°), ce qui est la vérité du
   régime géométrique. Plus grand, la scène crierait ; plus petit, les crans
   larges deviendraient indiscernables. *C'est un nombre rond, déclarable en trois
   mots, et la porte le mesure comme un invariant.*
5. **Une sixième étape « le montage plongé dans un liquide », placée dans R4 ?**
   (§2.5). Le sujet **2025 R** fait exactement cela : même laser, même fente,
   même $D$, et $L$ divisée par $n$ ; c'est le seul endroit du corpus où
   diffraction et indice se rencontrent. **Recommandation : la préparer, ne pas la
   construire maintenant** — elle appartient à R4 (`lambda-nu-changement-milieu`),
   et une scène ne doit pas enseigner le chapitre suivant. *Si elle est adoptée,
   elle ajoute une clé d'état `milieu` et un second marqueur dans R4, pas une
   étape de plus dans R3.*
6. **Le critère $\lambda/a > 10^{-3}$** (§2.5, §9.10). Il est dans le **corrigé
   officiel** de 2012 R (« le critère usuel du programme »), **absent du cadre et
   de la leçon**. **Recommandation : ne pas l'introduire**, et **le signaler comme
   un point de cadre à vérifier auprès de la source** — si le propriétaire
   confirme qu'il est attendu des élèves, il faut l'écrire dans `lesson.md`
   d'abord, la scène ensuite. *Ne jamais laisser une scène élargir le programme
   depuis un corrigé.*
7. **Le savoir-faire « proposer un montage »** (§1, §8.4) : le mot *montage* est
   **absent de `lesson.md`**. **Recommandation : un item de plus (POL-27), non
   spécifié ici**, du type « quel dispositif permet de mettre en évidence la
   diffraction de la lumière ? » avec des distracteurs qui font varier l'ordre des
   éléments (écran avant la fente), la nature de la source (lampe à
   incandescence sans fente fine) et l'échelle ($a$ de l'ordre du centimètre).
   *À commander à item-author séparément : ce n'est pas une dette de cette scène.*
8. **$\theta$, « écart angulaire » ou « demi-écart angulaire » ?** (§1, §4.2).
   `lesson.md:99` écrit « un écart angulaire $\theta$ » ; le cadre écrit
   « **demi**-largeur angulaire de la tache centrale » ; les cinq entrées de
   banque écrivent « $\theta$ est le DEMI-angle ». **Recommandation : poser la
   retouche du §4.2** — une phrase, et la scène et la leçon disent alors le même
   mot. *La porte lit le libellé affiché : elle rougira le jour où les deux
   divergeront.*
9. **`tool: "scene2d"` et le nom du dossier.** Question héritée des specs de la
   cuve, de la corde et des noyaux : faut-il renommer `web/src/lib/scene3d/`
   (+ `scenes.json`) en `scene/` ? **Recommandation :** oui, mais dans un commit
   mécanique **séparé**, jamais dans celui de la scène.
10. **Le placement en tête de R3** (§3), qui fait ouvrir le chapitre par un
    manipulable et impose de nommer fente, écran et tache centrale **dans la
    consigne** avant que la prose ne les écrive. **Recommandation : garder.**
    C'est le seul placement qui laisse les **cinq** paris entiers, et le point
    d'arrêt `cp-r3-diffraction` (discrimination **1,00**, la meilleure du corpus)
    devient la reprise naturelle de la scène — **sans qu'il soit touché**.
11. **Couper une étape ?** Si le propriétaire veut une scène à quatre étapes, la
    **coupable en premier est S2** (la couleur) : son modèle
    (`diffraction-formule-theta`) est déjà servi par trois items et par
    `cp-r3-diffraction`, et son geste survit dans la `suite` de S5. Je la garde
    par défaut pour une raison mesurée : **c'est la seule étape qui fait varier
    $\lambda$ à $a$ fixée**, et c'est exactement ce que la cuve à ondes a établi
    pour l'eau et que rien n'établit pour la lumière — POL-14 le teste, aucune
    figure ne le montre. *À l'inverse, S4 (le cheveu) n'est pas coupable : deux
    sujets sur cinq le demandent.*
12. **Une règle générale née ici, à graver ou à garder en spec** (§2.3, §11.2
    `formule-graduee`) : *quand une scène construit une relation à plusieurs
    facteurs, l'écriture de la relation est elle-même un ÉTAT qui fuit — le
    retour d'une étape ne doit contenir que les facteurs que cette étape a fait
    varier.* C'est la **quatrième forme** de la fuite, après l'affichage
    (ADR 0041 §6), le réglage ouvert (`fuite-inter-etapes`) et la donnée
    (`miroir-inerte` de la corde). Mérite-t-elle un addendum à l'ADR 0041 ?

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/propagation-onde-lumineuse`
  passe — **ce qui suppose que `figure-ombre-geometrique` soit déclaré dans
  `items.yaml` au moment où la scène est validée** (§8.2), sans quoi la scène part
  sur la voie de repli.
- `node web/scripts/scene-diffraction.mjs --porte` : **toutes** les familles
  vertes, sur un rendu réel, relancé à **quatre** largeurs d'écran, **au moins
  deux fois**.
- `node web/scripts/scene-diffraction.mjs --essai-rouge` : **chaque** famille
  crie, avec le vert qui l'a précédée, même dossier, même commande ; et chaque
  sabotage ne fait rougir que la famille qui le garde (§11.4).
- `node web/scripts/test-diffraction.mjs` : les 28 largeurs du §5.2, les 17
  positions de `distance`, l'invariant $a \times L$ et l'identité fente/fil, à
  $10^{-12}$.
- `node web/scripts/resume-couverture.mjs` régénéré : `total_items` passe à
  **26**, `figure-ombre-geometrique` à **3**, `diffraction-formule-theta` à **4**.
- **Aucune forme du §9 n'apparaît dans le panneau rendu**, une sonde par forme, et
  `--essai-rouge` les parcourt toutes. En particulier : **aucun `°`, aucun
  « frange », aucun « interférence », aucun « Babinet », aucun « indice »** — ni
  dans la scène, ni dans les quatre items, ni dans les cinq retouches de prose.
- Les cinq retouches de prose (§4) sont posées **aux cinq ancres nommées**, et
  aucune ne précède le marqueur en répondant à un pari.
- **`cp-r3-diffraction` est inchangé, au caractère près** (`REVIEW-2026-09-20` §2 :
  indice de discrimination 1,00).
- `dette-manipulable` : **inchangée**. Cette scène ne solde aucune dette écrite —
  elle ne doit donc **pas** être comptée comme un paiement, et le cliquet ne bouge
  pas. `media-manipulable` monte d'une notion.
- La scène ne compte pour **livrée** que si elle est enregistrée dans
  `scenes.json` (ADR 0041 §3).

---

## 15. Ce que je n'ai pas pu vérifier

Écrit ici plutôt que supposé ailleurs. Rien de ce qui suit n'est un défaut connu :
ce sont des **mesures à faire**, pas des affirmations à croire.

1. **Les quatre annales de diffraction autres que 2021 N ne sont pas vérifiées à
   la source.** `bank.yaml` porte `bk-2012-r-x2`, `bk-2023-r-x2`, `bk-2025-r-x2`
   et `bk-2015-n-x2` ; `docs/sujets/pc/propagation-onde-lumineuse.md` **ne
   contient que 2021 N**. J'ai lu les transcriptions de banque et le fichier
   `_incoming/pc-2012-r.md` (statut « vérifié »), **pas les scans**. Les nombres
   de la scène ne dépendent d'aucune d'elles : ils viennent de 2021 N (vérifié),
   de `lesson.md` et de `exercises.yaml`.
2. **Le facteur d'exagération ×10 n'a jamais été regardé à l'écran.** Il est
   calculé (§5.3), pas vu. La revue de cadrage du produit vectoriel a montré
   qu'un cadrage se décide **en regardant l'image** : si à ×10 la fente de
   1,000 mm paraît trop plate ou la plus fine trop ouverte, le nombre doit
   changer — et la porte avec lui, **par le nombre déclaré**, jamais par une
   tolérance élargie.
3. **La lisibilité de la règle à 390 px n'est pas mesurée.** 16 cm de règle
   graduée au millimètre sur un téléphone, c'est 160 traits : il faudra
   probablement n'en chiffrer qu'un sur deux, ou raccourcir la règle. Le geste
   « lire les deux bords » est le cœur de S3 ; s'il ne tient pas au téléphone, la
   scène doit changer, pas la porte.
4. **Le rendu du profil (taches voisines) n'a pas été essayé.** Le facteur
   d'éclaircissement « pour que la première voisine reste visible » est déclaré au
   §10.3 mais pas **choisi** : c'est un réglage à décider **contre les mots de
   l'étape** (règle n°4 de la porte de la cuve), donc en regardant l'image, pas
   en calculant.
5. **`validate-content` accepte-t-il une scène sans `course` ni `temps` avec une
   clé d'état posée par l'étape (`vue`) et une VUE d'étape libre ?** La sphère et
   le produit vectoriel sont sans temps ; les noyaux ont une VUE d'étape libre.
   La **combinaison** n'a pas été essayée. *À vérifier avant d'écrire une ligne de
   rendu — c'est le seul endroit où cette scène sort du gabarit des neuf
   précédentes.*
6. **Le champ `habilete` reste absent des items de la notion**, et je n'ai pas
   tranché la question de schéma (`DECISIONS-EN-ATTENTE` §3). Le chiffre
   « application expérimentale 0 % » du §0 est donc mesuré sur les **cinq points
   d'arrêt** (tous `utilisation`) et sur l'**absence** du champ dans les 22
   items ; il ne peut pas être calculé item par item.
7. **Je n'ai pas relu la source du Cadre.** Le §1 recopie
   `docs/cadre/curriculum/pc-physique-chimie.yaml`, qui est l'autorité (ADR 0018).
   Les `limites` et les `exclusions` de ce sous-domaine y sont marquées
   `source: derived` — **elles n'ont pas été imprimées dans le Cadre, elles en ont
   été inférées**, et le fichier lui-même dit qu'elles « need human validation ».
   Deux d'entre elles portent tout le poids du §9 (« pas d'intégrale de
   diffraction », « interférences hors cadre ») : **à faire valider par le
   propriétaire avant construction.**
8. **L'ordre des chapitres entre notions n'a pas été re-mesuré.** Je suppose que
   `ondes-mecaniques-periodiques` (et donc la cuve à ondes) précède
   `propagation-onde-lumineuse` — c'est l'ordre du cadre et celui que `lesson.md`
   suppose (« Reprends l'idée de la leçon précédente »). Les consignes de S1 et
   les retours de S2 et S5 y renvoient explicitement ; si l'ordre de programme
   affiché disait autre chose, ces renvois devraient tomber.
