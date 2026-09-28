# Spec — scène 3D « le manège » (`pc/rotation-axe-fixe`)

**Objet :** une scène three.js de première partie (ADR 0041) pour la notion
« Rotation autour d'un axe fixe », 2ème Bac PC/SM.
**Statut :** spec pédagogique, à valider par le propriétaire avant construction.
**Date :** 2026-09-24. **Auteur :** pedagogy-architect.
**Fichiers que cette spec commande** (aucun n'est écrit par elle) :

| Fichier | Rôle |
|---|---|
| `content/pc/rotation-axe-fixe/media/manege-axe-fixe.json` | le descripteur (pédagogie : étapes, paris, états) |
| `web/src/lib/scene3d/scenes.json` | l'entrée de registre `manege-rotation` |
| `web/src/lib/scene3d/manege.ts` (+ physique) | le rendu et le calcul |
| `web/scripts/scene-manege.mjs` | la porte (§10) |
| `content/pc/rotation-axe-fixe/lesson.md` | 4 retouches de prose (§4) |
| `content/pc/rotation-axe-fixe/items.yaml` | 1 misconception + 3 items (§8), **sous réserve d'accord** |

Marqueur : `[[embed:manege-axe-fixe]]` · clé de registre : `manege-rotation`.

> **Amendement du 2026-09-24, après construction (revue des captures).**
> L'étape 3 ouvre `instant` — l'instant de la course, parcouru à la main — et
> non plus `distance`. Le curseur des sièges y déplaçait des MASSES, donc $J$,
> donc l'angle : la `suite` qui promettait « l'angle non plus » était fausse,
> et en poussant les sièges à $1{,}50\ \text{m}$ l'élève lisait
> $\omega = 1{,}0\ \text{rad/s}$ — la réponse exacte du pari de l'étape 4,
> une étape avant qu'il soit posé. Le §2.5 disait déjà ce qu'il fallait :
> « cette étape n'a pas besoin de profondeur, elle a besoin de **temps** ».
> Changements : §5.1 (un cinquième contrôle), §7.3 (contrôle et `suite`),
> §7.6 (le contrat vaut ENTRE les étapes), §10.3 (deux familles), §11
> (registre). Le reste de la spec est inchangé.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Sous-domaine :** `mecanique` — `poids.part_examen: 27 %`, rang 1 de la physique.
  Habiletés du sous-domaine : **utilisation 13,5 %**, **application expérimentale
  4,05 %**, **résolution de problème 9,45 %** (soit le 50 / 15 / 35 de l'examen
  appliqué aux 27 %).
- **Chapitre :** `rotation_axe_fixe` (`docs/cadre/curriculum/pc-physique-chimie.yaml`, l. 295–307).
- **Savoir-faire que la scène sert :** repérer un point par son abscisse
  angulaire ; connaître l'accélération angulaire et son unité ; exploiter
  $a_T$ en fonction des grandeurs angulaires ; appliquer
  $\Sigma\mathcal{M}_\Delta = J\ddot\theta$ ; connaître l'unité du moment
  d'inertie ; rotation uniformément variée et équations horaires (la course de
  la scène EST un mouvement uniformément varié : $\omega = \ddot\theta\,t$,
  $\theta = \frac12\ddot\theta\,t^2$ — un savoir-faire que la REVIEW du
  2026-09-19 signale comme **couvert nulle part** dans la notion ; la scène le
  met enfin sous les yeux, sans le remplacer par un cours).
- **`limites` portées en dur :** $J$ est **donné** (aucune intégrale de $J$) ;
  rotation autour d'un **axe fixe** via $\Sigma\mathcal{M}_\Delta = J\ddot\theta$
  seulement ; **pas** de théorème du moment cinétique vectoriel ; **pas** de
  dynamique du solide libre (gyroscopes).
- **`exclusions` du sous-domaine portées en dur :** régime sinusoïdal forcé
  analytique (amplitude de résonance, facteur de qualité, déphasage) ;
  oscillations de grande amplitude / non linéaires ; mécanique lagrangienne.
  Depuis `systemes_oscillants` : **petites oscillations uniquement**, pas de
  solution close du régime amorti.

**Un point de cadre à dire clairement.** Le **moment d'une force** n'est nommé
dans AUCUN `savoir_faire` de `rotation_axe_fixe` : c'est un acquis antérieur
(tronc commun / 1ère Bac) que $\Sigma\mathcal{M}_\Delta$ présuppose. R2 le
ré-enseigne déjà, à juste titre, comme l'outil de la RFD. **Compléter l'énoncé
des cas de moment nul n'ajoute donc aucun savoir-faire** : c'est réparer un
rappel incomplet. La scène n'entre ni dans le moment vectoriel, ni dans
$\vec{r}\wedge\vec{F}$ — voir §9.

---

## 2. Pourquoi la 3D (ADR 0041 §1) — et le verdict sur les quatre pistes

### 2.1 Le critère, honnêtement

La figure plane de la notion (`media/moment-force.svg`) dessine l'axe $\Delta$
**comme un point** (le symbole ⊙, axe perpendiculaire à la page) et toutes les
forces **dans le plan de la page**. Dans cette représentation :

- le bras de levier est « la distance d'un point à une droite », dans le plan —
  ce qui est correct **et incomplet** ;
- **une force parallèle à l'axe est littéralement indessinable** : vue de
  dessus, elle se réduit à un point ; vue de côté, elle ressemble à un énorme
  bras de levier. La figure plane ne peut pas poser la question, encore moins y
  répondre ;
- **l'axe n'apparaît jamais comme une DROITE**, alors que c'est exactement ce
  qui décide : le moment se calcule par rapport à une droite orientée, et la
  même force donne $0$ ou $mgd$ selon la direction de cette droite.

C'est le critère du §1 au mot près : *changer de point de vue révèle ce qu'une
figure plane énonce sans le montrer*. Deux des cinq étapes en vivent (S1, S2) ;
les trois autres sont justifiées séparément ci-dessous, et l'une d'elles est
explicitement **coupable en premier** si le propriétaire veut une scène à
quatre étapes.

### 2.2 Piste 1 — « une force parallèle à l'axe n'a pas de moment » : **CONFIRMÉE**, et elle devient la colonne vertébrale

Vérifié dans le dépôt : `grep -i "parallèle"` sur tout
`content/pc/rotation-axe-fixe/` ne renvoie **aucune** occurrence. La leçon
énumère « Deux façons d'avoir un moment nul » (force sur l'axe, force radiale)
— **les deux cas où la droite d'action rencontre l'axe**. L'énoncé marocain
standard en compte trois : *le moment d'une force par rapport à un axe est nul
si sa droite d'action rencontre l'axe **ou lui est parallèle***. Le cas
parallèle manque, et c'est **le seul que la 3D peut montrer**.

Ce n'est pas une élégance : c'est un **défaut actif**. La leçon définit
$\mathcal{M}_\Delta(\vec F) = \pm\,d\cdot F$ avec $d$ « la distance entre l'axe
$\Delta$ et la droite d'action de $\vec F$ ». Appliquée telle quelle au poids
de l'enfant assis au bord (axe vertical), cette formule donne
$1{,}50 \times 245 = 367{,}5\ \text{N}\cdot\text{m}$ — **la distance à la droite
d'action est bien de 1,50 m, et le moment est pourtant nul**. La leçon se
protège par une incise (« pour une force dirigée tangentiellement »), que
l'élève ne retient pas. La scène fait commettre l'erreur, puis la casse sur sa
propre conséquence : le manège ne bouge pas d'un degré en 4,0 s.

**Verdict : oui, la leçon doit gagner une phrase** (texte prêt en §4.2), et
« Deux façons » doit devenir « Trois façons ». **Aucun dépassement de cadre** :
voir §1, dernier paragraphe.

### 2.3 Piste 2 — basculer l'axe (le pendule pesant) : **GARDÉE**, sous bornes strictes

La tentation est de la couper comme « hors sujet à R2 ». C'est l'inverse :
**sans elle, l'étape 1 fabrique une nouvelle misconception.** Un élève qui vient
de voir qu'un poids de 245 N à 1,50 m ne fait rien tourner en tire, presque
mécaniquement, « un poids ne fait jamais tourner » — et il refusera son moment
au pendule pesant du chapitre 7. La deuxième étape est **l'antidote de la
première**, et elle donne au chapitre sa thèse en une ligne :

> **Le nombre que l'élève a écarté à l'étape 1 est le bon à l'étape 2 :
> 367,5 N·m. Ni la force, ni le point d'application, ni la distance n'ont
> changé. Seul l'axe a changé de direction.**

C'est la démonstration la plus forte que le moment n'est pas une propriété de la
force, mais d'un couple (force, axe) — et elle est **purement spatiale**.

**Bornes non négociables** (détail en §9) : un seul enfant ; siège placé à
l'horizontale ; la course **s'arrête à la position d'équilibre** (siège au plus
bas), donc **aucune oscillation, aucune période, aucune amplitude** ; la scène
n'affiche là ni $J$, ni $\ddot\theta$. Elle montre **un moment qui existe, puis
un bras de levier qui se raccourcit jusqu'à zéro** — ce qui est, en prime, le
premier cas de moment nul de la leçon, vu en mouvement.

### 2.4 Piste 3 — la répartition de la masse ($J$) et la même poussée : **PAS spatiale ; gardée comme PAYOFF**

Réponse franche à la question posée : **non, cette idée ne mérite pas la 3D à
elle seule.** « $J$ plus grand ⇒ $\ddot\theta$ plus petit » est un fait scalaire
qu'un graphique 2D montrerait aussi bien. Réduite à cette étape, la scène
tomberait sous l'interdit du §1 (« le relief n'est jamais une raison »).

Elle est gardée comme **la dernière étape enseignée**, pour trois raisons
écrites ici pour être opposables :

1. la scène existe déjà, pour le motif spatial de S1/S2 : l'étape ne **paie**
   pas la 3D, elle en **profite** ;
2. c'est la question de l'accroche (R0) et de `cp-r0-predict` — la scène est le
   seul endroit du produit où cette question reçoit une **mesure** au lieu d'une
   affirmation ;
3. **le pari est ré-visé sur le FACTEUR, pas sur le sens**, précisément parce
   que R0 donne déjà le sens (« près du centre, ça s'élance plus vite »). Les
   trois choix (×5, ×2,5, ×25) sont tous d'accord sur le sens : R0 ne peut plus
   pré-répondre, et les deux mauvais sont deux modèles déclarés et distincts
   (dépendance linéaire en $d$ ; $d^2$ appliqué en oubliant la part du disque).

### 2.5 Piste 4 — $\omega$ commune, $v = r\omega$ différentes : **PAS spatiale non plus ; c'est la COURSE qui la porte**

Honnêteté : cette étape n'a pas besoin de profondeur, elle a besoin de **temps**.
Ce qu'aucune figure fixe ne fait — ni `omega-vitesse-point.svg`, qui est bonne —
c'est montrer **deux arcs qui s'allongent à des vitesses différentes pendant que
l'angle reste commun**, et surtout **le rayon peint qui reste droit** : si le
bord tournait « plus vite » en angle que l'enfant, le rayon se tordrait et le
solide ne serait plus rigide. C'est l'argument de rigidité de R1, rendu
observable.

Deuxième honnêteté : **R1 a déjà donné la réponse en prose.** Cette étape
consolide et engage, elle ne casse pas une prose non lue. **C'est donc l'étape à
couper en premier** si le propriétaire veut une scène à quatre étapes — et la
seule.

### 2.6 Une cinquième idée, volontairement écartée

« La position **le long** de l'axe ne compte pas » (un enfant qui monterait sur
un mât ne changerait pas $J$ ; la leçon le dit du cylindre en R3) est la même
idée spatiale que S1 — l'axe est une **droite**, seule la distance
perpendiculaire compte — et elle vise une forme déclarée de
`repartition-masse-mal-comprise`. **Coupée** : elle exigerait une sixième étape
et un contrôle de hauteur, pour un gain qui recouvre S1. À rouvrir seulement si
S3 est coupée.

---

## 3. Placement

**Chapitre 3 de la leçon rendue = `## R2 — Le moment d'une force…`**, dans la
sous-section « Construire le moment d'une force », **immédiatement après la
ligne `[[figure:moment-force]]` et AVANT `### Deux façons d'avoir un moment
nul`.**

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:manege-axe-fixe]]
```

**Pourquoi là, et pas ailleurs** (ADR 0041 §6 : la scène vient AVANT la prose
qui explique). Comptage des étapes qui cassent une prose **non encore lue** :

| Placement | S1 | S2 | S3 | S4 | S5 | total |
|---|---|---|---|---|---|---|
| **R2, après `[[figure:moment-force]]`** | ✅ (la phrase n'existe pas encore — ni nulle part) | ✅ (R6 non lu) | ❌ (R1 lu) | ✅ (R3/R4 non lus) | ✅ (jamais dit en prose) | **4/5** |
| R4, avant la RFD | ❌ | ❌ | ❌ | ✅ | ✅ | 2/5 |

Conséquences acceptées de ce placement :

- la figure plane (`moment-force`) est **juste au-dessus** de la scène : « la
  figure plane dit, la scène montre » — l'enchaînement est voulu ;
- l'exemple travaillé de R2 (45 et 6,0 N·m) vient **après** : le contrôle `bras`
  de l'étape libre le préfigure, il ne le répète pas ;
- $J_\Delta$ et $\ddot\theta$ sont **en avance** sur la leçon. Traité en §5.4 :
  S4 n'affiche que $\omega$, $\theta$ et $J_\Delta$ (décomposé $67{,}5 + 2\times
  25\,r^2$, c'est-à-dire l'additivité de R3 montrée avant d'être nommée), et
  seule l'étape libre ouvre $\ddot\theta$, avec un renvoi explicite au chapitre 5.
  La leçon gagne en retour deux phrases de rappel (§4.4) qui **ramènent** l'élève
  à la scène quand les nombres arrivent.

---

## 4. Les retouches de prose (texte prêt à insérer)

### 4.1 Le paragraphe d'annonce, juste avant le marqueur

> Avant d'aller plus loin, une question. Un enfant de $25\ \text{kg}$ assis tout
> au bord du manège pèse $245\ \text{N}$ — huit fois la poussée de
> $30\ \text{N}$ dont on vient de parler — et il est à $1{,}50\ \text{m}$ de
> l'axe, la plus grande distance possible sur ce disque. Que vaut le moment de
> son poids par rapport à $\Delta$ ? La scène ci-dessous te fait parier avant de
> montrer, puis te laisse tourner autour de la situation pour voir ce qu'une
> figure plane ne peut pas dire.

(Neutre exprès : elle pose la question, elle ne suggère pas que c'est un piège.)

### 4.2 « Deux façons » → « Trois façons » — le titre et le troisième cas

Remplacer le titre `### Deux façons d'avoir un moment nul` par
`### Trois façons d'avoir un moment nul`, **ajouter un troisième point** après
le point « radialement », puis la phrase de synthèse :

> - Si la droite d'action de la force est **parallèle à l'axe**, son moment est
>   nul lui aussi — et cette fois, ce n'est pas parce qu'elle serait « près » de
>   l'axe : elle peut en être très loin. Le poids d'un enfant assis au bord du
>   manège vaut $245\ \text{N}$ et s'exerce à $1{,}50\ \text{m}$ de l'axe, et il
>   ne fait pas tourner le manège d'un degré. La raison est la même que pour les
>   deux autres cas, dite dans l'autre sens : ce qui fait tourner un solide
>   autour de $\Delta$, c'est ce que la force a **dans le plan perpendiculaire à
>   l'axe** — et une force parallèle à l'axe n'y a rien du tout.
>
> On retient les trois cas d'un seul coup, comme le fait l'énoncé classique :
> **le moment d'une force par rapport à un axe est nul dès que sa droite
> d'action rencontre l'axe ou lui est parallèle.** Les deux premiers cas (force
> appliquée sur l'axe, force radiale) sont deux façons de rencontrer l'axe ; le
> troisième est le cas parallèle.
>
> Attention, du coup, à la portée de la formule : dans
> $\mathcal{M}_\Delta(\vec F) = \pm\,d\cdot F$, $d$ est le bras de levier de ce
> que la force a **dans le plan perpendiculaire à l'axe**. Appliquer $d\cdot F$
> à une force parallèle à l'axe — $1{,}50 \times 245 = 367{,}5$ pour le poids de
> l'enfant — c'est multiplier une distance par une force qui ne fait rien : le
> nombre sort, et il ne veut rien dire.

### 4.3 R4 : la parenthèse qui escamote la raison

Dans l'exemple travaillé de `## R4`, **remplacer**

> (la réaction de l'axe a un moment nul, le poids et la réaction verticale du
> sol n'ont pas de moment tangentiel utile ici)

**par**

> (la réaction de l'axe a un moment nul — elle s'applique sur l'axe lui-même ;
> quant aux poids du disque et des enfants, ils sont verticaux, donc
> **parallèles à l'axe** : leur moment par rapport à $\Delta$ est nul aussi, où
> que l'on soit assis)

Deux gains : la « réaction verticale du sol » disparaît (le manège repose sur
son axe, pas sur le sol — l'objet n'existe pas dans la situation décrite), et le
troisième cas devient **porteur** au lieu d'être décoratif.

### 4.4 Deux rappels qui ramènent l'élève à la scène

- Dans `## R3`, après $J_{total,B} = 180{,}0$ :
  > Ces deux nombres, $72{,}0$ et $180{,}0\ \text{kg}\cdot\text{m}^2$, sont ceux
  > que la scène du chapitre 3 affichait quand tu faisais glisser les sièges :
  > tu peux y retourner maintenant, en sachant d'où ils viennent.
- Dans `## R4`, après $\omega_A$ et $\omega_B$ :
  > Là encore : $0{,}625$ et $0{,}250\ \text{rad}\cdot\text{s}^{-2}$, puis
  > $2{,}5$ et $1{,}0\ \text{rad/s}$ après $4{,}0\ \text{s}$ — ce sont
  > exactement les nombres que la scène du chapitre 3 mesurait sur ses courses.

**Interdit dans ces retouches :** ne rien écrire, avant le marqueur, qui réponde
à un pari (§7.6). Les quatre blocs ci-dessus ont été rédigés sous cette
contrainte ; 4.2 est **après** la scène, 4.4 est **deux et trois chapitres
après**.

---

## 5. Contrôles, état, lectures

### 5.1 Contrôles (5)

| id | ce qu'il règle | valeurs / bornes | pas | ouvert par |
|---|---|---|---|---|
| `force` | la force considérée, appliquée au bord ou au siège | `poids` (245 N, verticale) · `radiale` (30 N, horizontale vers l'axe) · `tangentielle` (30 N, horizontale ⟂ rayon) | — | S1, S5 |
| `axe` | la direction de l'axe fixe $\Delta$ | `vertical` · `horizontal` | — | **S2 seulement** |
| `distance` | $r_{sièges}$, distance des deux sièges à l'axe | $[0{,}10\ ;\ 1{,}50]$ m | **0,10 m** | S4, S5 *(S3 jusqu'à l'amendement)* |
| `bras` | $r_{poussée}$, distance du point de poussée à l'axe | $[0{,}20\ ;\ 1{,}50]$ m | **0,10 m** | S5 |
| `instant` | $t$, l'instant de la course, parcouru à la main (la course s'arrête) | $[0\ ;\ 4{,}0]$ s | **0,1 s** | **S3 seulement** |

**`instant` (amendement du 2026-09-24).** Le pas de 0,1 s rend **exactement**
atteignable $t = 3{,}2\ \text{s}$, où $\omega = 2{,}0\ \text{rad/s}$ et où la
fiche affiche $0{,}60$ et $3{,}00\ \text{m/s}$ — les nombres de R1 ; en temps
réel, « mets en pause autour de 3,2 s » demandait un réflexe, pas une lecture.
Il ne change ni la force, ni les sièges, ni la poussée : il parcourt la course
que l'élève vient de voir, et rien d'autre. **Pourquoi pas `distance` en S3 :**
une étape révélée ne doit pas pouvoir atteindre l'état qu'un pari SUIVANT fait
deviner (§7.6) ; les sièges répondent au pari de S4, la poussée départage celui
de S5.

**Le pas est un choix pédagogique (ADR 0041 §5).** 0,10 m rend **exactement**
atteignables les quatre valeurs de la leçon — $0{,}30$ et $1{,}50$ pour les
sièges ($J = 72{,}0$ et $180{,}0$), $0{,}20$ et $1{,}50$ pour la poussée
($\mathcal{M} = 6{,}0$ et $45{,}0$). Un pas de 0,05 ou un curseur continu
offrirait $J = 71{,}8$ : un élève qui refait l'exemple travaillé ne retrouverait
plus son nombre, et la scène cesserait d'être la même situation que la leçon.

**`axe` n'est PAS ouvert par l'étape libre**, exprès : l'axe basculé est une
excursion d'une étape, pas un bac à sable. Cela borne la scène à des états où le
moment affiché est soit exactement nul, soit $d\cdot F$ avec une force
**entièrement** dans le plan perpendiculaire à l'axe (§9).

### 5.2 État (6 clés)

`force`, `axe`, `r_sieges`, `r_poussee`, `occupants` (`deux` | `un`), `vue`
(`dessus` | `biais` | `cote`).

`occupants` est **une clé d'état sans contrôle** (le précédent existe :
`trace_B_mT` dans `champ-magnetique`). Seules S1 et S2 la posent à `un` — pour
que le poids étudié soit celui d'**un** enfant, et pour que l'étape 2 ne tombe
pas dans le piège de deux moments opposés qui se compensent (deux enfants face à
face, axe horizontal : $+367{,}5$ et $-367{,}5$, et il ne se passe rien — vrai,
fascinant, et destructeur pour une étape dont la thèse est « maintenant ça
tourne »). La consigne de S1 le dit en clair : « un enfant s'assoit au bord » ;
celle de S3 fait revenir le second.

### 5.3 Vues (§4, §7)

`cote` (regard horizontal), `dessus` (regard vertical — « la figure du manuel »),
`biais` (trois-quarts). **Quand `axe = horizontal`, l'axe pointe vers la caméra
`cote`** : cette vue est alors exactement la figure du pendule pesant de R6
(`media/pendule-pesant-bras-levier.svg`). Les trois vues restent accessibles au
clavier à tout moment, y compris avant un pari — voir §7.6, dernier point, qui
argumente cette exception.

### 5.4 Lectures, définitions exactes, unités, précision

| id | ce qui s'affiche | unité | précision | justification (§5) |
|---|---|---|---|---|
| `moment` | $\mathcal{M}_\Delta(\vec F)$ de la force sélectionnée | N·m | **1 déc.** | la leçon écrit $6{,}0$ et $45$ ; le cas nul doit lire **« 0,0 »** exactement, jamais un arrondi. Le zéro est **structurel** : la scène calcule le moment comme (bras de levier) × (composante de $\vec F$ dans le plan perpendiculaire à $\Delta$), et cette composante est nulle par construction pour une force parallèle à l'axe. |
| `inertie` | $J_\Delta$, **décomposé** : $67{,}5\ (\text{disque}) + 2\times 25\,r^2\ (\text{enfants})$ | kg·m² | **1 déc.** | la leçon écrit $67{,}5$, $72{,}0$, $180{,}0$. La décomposition EST l'additivité de R3, montrée avant d'être nommée. |
| `acceleration` | $\ddot\theta = \Sigma\mathcal{M}_\Delta / J_\Delta$ | rad·s⁻² | **3 déc.** | la leçon écrit $0{,}625$ ; à 2 décimales la scène afficherait $0{,}63$, un nombre que l'élève ne retrouve dans aucun exemple travaillé. |
| `omega` | $\omega = \ddot\theta\,t$ (courante pendant la course) | rad/s | **1 déc.** | la leçon écrit $2{,}5$ et $1{,}0$ ; une deuxième décimale clignoterait pendant la course sans rien ajouter. |
| `angle` | $\theta = \frac12\ddot\theta\,t^2$, **en radians**, suivi du degré entre parenthèses | rad (et °) | **1 déc.** (rad) ; **entier** (°) | le radian est l'unité de la leçon et la clé de $v = d\omega$ ; le degré n'est qu'une aide pour l'œil, et il est marqué comme telle. |
| `points` | fiche des deux points marqués (le siège à $r$, le bord à $1{,}50$) : $d$, $v = d\,\omega$, arc parcouru $s = d\,\theta$ | m, m/s, m | **2 déc.** | la leçon écrit $3{,}75\ \text{m/s}$ (R4) et $0{,}60$ / $3{,}0\ \text{m/s}$ (R1) ; deux décimales les rendent tous lisibles. |

Les nombres que la scène affiche, tous issus des constantes de la leçon
($M = 60$ kg, $R = 1{,}50$ m, $2\times 25$ kg, $F = 30$ N, $g = 9{,}8$
m·s⁻², $t = 4{,}0$ s) :

| situation | $J_\Delta$ | $\Sigma\mathcal{M}_\Delta$ | $\ddot\theta$ | $\omega(4{,}0)$ | $\theta(4{,}0)$ |
|---|---|---|---|---|---|
| sièges 0,30 · poussée 1,50 | **72,0** | **45,0** | **0,625** | **2,5** | **5,0 rad (286°)** |
| sièges 1,50 · poussée 1,50 | **180,0** | **45,0** | **0,250** | **1,0** | **2,0 rad (115°)** |
| sièges 0,30 · poussée 0,20 | 72,0 | **6,0** | 0,083 | 0,3 | 0,7 rad (38°) |
| poids, axe vertical | — | **0,0** | 0 | 0 | **0,0 rad** |
| poids, axe horizontal, siège à l'horizontale | — | **367,5** | (non affiché) | — | (jusqu'à 90°) |

Deux propriétés à noter, parce que la porte en vit : **aucune course ne dépasse
un tour** (286° au maximum), donc l'angle final se lit en pixels **sans
ambiguïté modulo $2\pi$ ; et pendant la course de S3, la fiche `points` passe
par $0{,}60$ et $3{,}0\ \text{m/s}$ à $t = 3{,}2\ \text{s}$ (où
$\omega = 2{,}0$) — les deux nombres de l'exemple travaillé de R1.

---

## 6. La course

- **Durée : $t = 4{,}0$ s de temps simulé, en temps réel (1:1)** — la durée de
  poussée de l'exemple travaillé de R4. Aucun facteur d'échelle temporelle à
  déclarer, donc aucun à mal lire.
- **Ce qui agit pendant la course :** la seule force sélectionnée par `force`.
  Les autres forces extérieures (poids du disque, réaction de l'axe) ont un
  moment nul par rapport à $\Delta$ ; elles ne sont pas dessinées, et la légende
  le dit une fois.
- **Fin de course, axe vertical :** la scène **se fige** et l'écrit —
  « poussée terminée, image arrêtée à $t = 4{,}0\ \text{s}$ ». Sans cette
  mention, un élève lit « ça s'est arrêté » et repart avec
  `relation-fondamentale-mal-appliquee` (« $\Sigma\mathcal{M} = 0$ ⇒ ça
  s'arrête »). La légende ajoute : *sans frottement, le manège continuerait à
  tourner à $\omega$ constante ; la scène n'en montre pas la suite.* Une phrase,
  pas une simulation.
- **Fin de course, axe basculé :** la course **s'arrête à la position
  d'équilibre** (siège au plus bas, atteint en ≈ 1,1 s), et la scène l'écrit —
  « arrêtée à l'équilibre ; l'oscillation est l'objet du chapitre 7 ». À cet
  instant la droite d'action du poids passe par $\Delta$, le bras de levier
  dessiné a fondu à zéro, et la lecture `moment` affiche **0,0** : le premier
  cas de moment nul de la leçon, vu en mouvement.
- **Trace :** après une course, la position finale du rayon peint reste dessinée
  **en pointillé**, étiquetée par le réglage qui l'a produite. Elle est effacée
  au changement d'étape, **jamais affichée avant le premier pari**, et ce n'est
  pas une clé d'état (aucune étape ne la pose).
- **Échelle des flèches :** une seule, **1,00 m de flèche pour 100 N**
  (245 N → 2,45 m ; 30 N → 0,30 m). Deux échelles auraient été plus jolies et
  auraient menti sur le rapport $8:1$ — or ce rapport est l'argument : la grande
  force ne fait rien, la petite fait tourner. La caméra cadre le **pire cas**
  (disque + flèche de poids) et **ne recadre pas** pendant une course
  (précédent : l'addendum « produit vectoriel »).

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant
que l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir).

### 7.1 S1 — `poids-parallele` · « Ce poids fait-il tourner le manège ? »

- **État :** `force: poids`, `axe: vertical`, `r_sieges: 1.5`,
  `r_poussee: 1.5`, `occupants: un`, `vue: cote`.
- **Contrôle ouvert :** `force`. **Lectures :** `moment`, `angle`.
- **`revele_apres_course: 1`** (les 4,0 s entières : la preuve, ici, c'est la
  durée pendant laquelle il ne se passe rien).
- **Consigne (voix) :** « Le manège est un disque libre de tourner autour de son
  axe vertical : rien ne le freine. Un enfant de $25\ \text{kg}$ s'assoit tout
  au bord, à $1{,}50\ \text{m}$ de l'axe. Son poids vaut $245\ \text{N}$ —
  huit fois la poussée dont on parlait. Tu regardes la scène de côté, comme on
  la verrait depuis la cour. »
- **Pari :** « Le moment de ce poids par rapport à l'axe $\Delta$ vaut… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `dF` | $1{,}50 \times 245 = 367{,}5\ \text{N}\cdot\text{m}$ : une grande force, au bout du plus grand bras de levier du disque | non | `moment-force-direction-vs-axe` (repli : `moment-force-sans-bras-de-levier`) | « Tu as multiplié une distance par une force sans regarder **la direction de cette force par rapport à l'axe**. Regarde ce que la course vient de donner : $4{,}0$ secondes, et l'angle est resté à $0{,}0$ rad. Tourne maintenant la vue au-dessus : le poids est parallèle à l'axe — d'en haut, il se réduit à un point, il ne pousse vers aucun côté du cercle. » |
| `nul` | $0$ : ce poids ne fait pas tourner le manège | **oui** | — | « Oui. Sa droite d'action est verticale, comme l'axe : elle lui est parallèle, et elle n'a rien dans le plan où le manège peut tourner. Attention quand même à la bonne raison : ce n'est pas parce que l'axe « retient » le disque — l'axe le retient aussi quand tu pousses tangentiellement, et là il part. » |
| `petit` | un moment plus petit que $367{,}5$, parce qu'une partie seulement du poids agit | non | `moment-force-direction-vs-axe` (repli : idem) | « L'idée de regarder une **partie** de la force est la bonne. Mais regarde la scène d'en haut : la part du poids qui se trouve dans le plan de rotation n'est pas petite, elle est **nulle**. Une force entièrement parallèle à l'axe n'a aucune composante dans ce plan. » |

- **`suite` :** « Passe la force en **radiale** : $30\ \text{N}$ horizontale,
  droit vers l'axe — elle non plus ne le fait pas tourner, et sa droite d'action
  passe par $\Delta$. Puis en **tangentielle** : la même $30\ \text{N}$, tournée
  d'un quart de tour, et il part. Trois forces, une seule qui fait tourner — et
  ce n'est pas la plus grande. »
- **⟂-avant-pari :** la lecture `moment` ; la lecture `angle` ; la décomposition
  du poids (composante dans le plan / le long de l'axe) ; tout segment de bras de
  levier ; le bouton de course et toute rotation ; le verdict et le retour ; la
  trace pointillée ; tout pixel d'accent (mesuré en **chrominance**, pas en
  luminance — addendum du 2026-09-24) ; la description lue au lecteur d'écran ne
  doit pas contenir « nul », « ne tourne pas », ni la valeur du moment.
  **Reste visible (l'énoncé) :** le disque, l'axe dessiné **comme une droite**,
  le siège, l'enfant, la flèche du poids avec sa valeur en newtons, le rayon peint.

### 7.2 S2 — `axe-bascule` · « Le même poids, un autre axe »

- **État :** `force: poids`, `axe: horizontal`, `r_sieges: 1.5`,
  `r_poussee: 1.5`, `occupants: un`, `vue: biais`.
- **Contrôle ouvert :** `axe`. **Lectures :** `moment`, `angle`.
- **`revele_apres_course: 1`** (course courte : elle s'arrête à l'équilibre).
- **Consigne :** « On bascule l'axe. Le manège devient une roue verticale : le
  même disque, le même enfant, toujours à $1{,}50\ \text{m}$ de l'axe, toujours
  $245\ \text{N}$. Son siège est arrêté à l'horizontale, à hauteur de l'axe. Rien
  n'a changé du poids ni de la distance. L'axe, lui, a changé de direction. »
- **Pari :** « Le moment de son poids par rapport à $\Delta$ vaut maintenant… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `encore-nul` | $0$, comme tout à l'heure : un poids ne fait jamais tourner | non | `moment-force-direction-vs-axe` (repli : `moment-force-sans-bras-de-levier`) | « C'est la généralisation que l'étape précédente rendait tentante, et c'est celle qu'il faut casser : lance la course, la roue part. Le moment n'est pas une propriété de la force toute seule — il se calcule **par rapport à un axe**, et cet axe-là n'a plus la même direction. » |
| `mgd` | $1{,}50 \times 245 = 367{,}5\ \text{N}\cdot\text{m}$ | **oui** | — | « Oui — et c'est **exactement le nombre que tu as écarté à l'étape 1**. Ni la force, ni le point d'application, ni la distance n'ont changé : seul l'axe a tourné. Le poids est maintenant perpendiculaire à l'axe, donc entièrement dans le plan de rotation, et son bras de levier vaut les $1{,}50\ \text{m}$ dessinés. » |
| `force-brute` | $245\ \text{N}\cdot\text{m}$ : c'est la valeur du poids | non | `moment-force-sans-bras-de-levier` | « $245$ est une **force**, en newtons ; un moment est en newton-mètres. Regarde le segment tracé de l'axe jusqu'à la droite d'action : $1{,}50\ \text{m}$. C'est lui qui multiplie la force, $1{,}50 \times 245 = 367{,}5$. » |

- **`suite` :** « Rebascule l'axe à la verticale, et regarde la lecture passer de
  $367{,}5$ à $0{,}0$ sans que le poids ait bougé d'un newton. Puis relance avec
  l'axe horizontal et suis le **segment du bras de levier** : il raccourcit à
  mesure que le siège descend, et il est nul quand le siège arrive sous l'axe —
  la droite d'action passe alors par $\Delta$. C'est la position d'équilibre du
  pendule pesant, que le chapitre 7 étudiera. »
- **⟂-avant-pari :** identique à S1, plus : le segment du bras de levier, la
  valeur $367{,}5$ où qu'elle apparaisse, et tout début de mouvement du siège.

### 7.3 S3 — `deux-points` · « Deux points, un seul angle »

- **État :** `force: tangentielle`, `axe: vertical`, `r_sieges: 0.3`,
  `r_poussee: 1.5`, `occupants: deux`, `vue: biais`.
- **Contrôle ouvert :** `instant` *(amendement du 2026-09-24 ; c'était
  `distance`)*. **Lectures :** `points`, `angle`, `omega`.
- **`revele_apres_course: 1`** (les arcs doivent être complets).
- **Consigne :** « Le deuxième enfant s'assoit en face, comme dans l'accroche ;
  tous les deux sont maintenant à $0{,}30\ \text{m}$ de l'axe. On pousse le bord
  tangentiellement, $30\ \text{N}$, pendant $4{,}0\ \text{s}$. Deux points sont
  marqués : le siège, à $0{,}30\ \text{m}$ de l'axe, et un repère peint sur le
  bord, à $1{,}50\ \text{m}$. Regarde-les partir ensemble. »
- **Pari :** « Pendant ces $4{,}0$ secondes, le repère du bord et le siège… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `meme-angle` | tournent du même angle, mais le bord parcourt un chemin bien plus long | **oui** | — | « Oui : même angle — $5{,}0\ \text{rad}$ pour les deux — et deux chemins très différents, $1{,}50\ \text{m}$ contre $7{,}50\ \text{m}$. C'est $s = d\,\theta$, donc $v = d\,\omega$ : une seule vitesse angulaire, autant de vitesses linéaires que de distances à l'axe. » |
| `meme-vitesse` | vont à la même vitesse : ils sont sur le même disque, qui tourne d'un seul bloc | non | `omega-uniforme-vs-v-variable` | « Regarde les deux arcs à l'arrivée : $1{,}50\ \text{m}$ et $7{,}50\ \text{m}$, parcourus dans le **même** temps. Deux chemins différents dans le même temps, ce ne peut pas être la même vitesse. Ce qui est commun au disque, c'est $\omega$, en **rad/s** — pas $v$, en m/s. » |
| `bord-plus-angle` | le bord tourne d'un plus grand angle que le siège : il va plus vite | non | `omega-uniforme-vs-v-variable` | « Regarde le rayon peint pendant toute la course : il reste **droit**. Si le bord tournait d'un plus grand angle que le siège, ce rayon se tordrait — le manège ne serait plus un solide rigide. L'angle est commun ; c'est le chemin qui ne l'est pas. » |

- **`suite` :** « Fais glisser l'instant, en avant, en arrière : le rayon peint
  reste droit, les deux points gardent le même angle, et le bord parcourt
  toujours cinq fois le chemin du siège — il est cinq fois plus loin de l'axe.
  Arrête-toi à $t = 3{,}2\ \text{s}$ : $\omega$ y vaut $2{,}0\ \text{rad/s}$, et la
  fiche affiche $0{,}60$ et $3{,}00\ \text{m/s}$ — les deux nombres de l'exemple
  travaillé du chapitre 2. »
  *(Amendement du 2026-09-24. La première `suite` disait « Fais glisser les
  sièges et relance : l'arc du siège change, celui du bord jamais, et l'angle
  non plus » — faux : déplacer les sièges déplace des masses, $J$ change, et
  l'angle au bout de $4{,}0\ \text{s}$ avec. La porte ne le voyait pas : elle
  vérifiait les nombres affichés, qui étaient justes, pas la phrase qui les
  annonçait.)*
- **⟂-avant-pari :** la fiche `points` ; `omega` ; `angle` ; les deux arcs
  dessinés ; tout mouvement ; la trace ; le verdict. **Reste visible :** les deux
  repères, le rayon peint, la flèche de poussée.

### 7.4 S4 — `repartition` · « Les mêmes enfants, cinq fois plus loin »

- **État :** `force: tangentielle`, `axe: vertical`, `r_sieges: 1.5`,
  `r_poussee: 1.5`, `occupants: deux`, `vue: dessus`.
- **Contrôle ouvert :** `distance`. **Lectures :** `omega`, `angle`, `inertie`.
- **`revele_apres_course: 1`**.
- **Consigne :** « À l'étape précédente, la même poussée pendant $4{,}0$
  secondes a amené le manège à $2{,}5\ \text{rad/s}$, soit $5{,}0\ \text{rad}$
  parcourus, avec les enfants à $0{,}30\ \text{m}$ de l'axe. Ils vont maintenant
  s'asseoir tout au bord, à $1{,}50\ \text{m}$ — **cinq fois plus loin**. Même
  poussée, même durée, même masse totale embarquée : $110\ \text{kg}$ dans les
  deux cas. Tu regardes d'en haut, pour lire les angles. »
- **Pari :** « À la fin des mêmes $4{,}0$ secondes, la vitesse angulaire sera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `lineaire` | cinq fois plus petite ($0{,}5\ \text{rad/s}$) : la distance est multipliée par cinq | non | `repartition-masse-mal-comprise` | « La distance compte au **carré**, pas proportionnellement : cinq fois plus loin, la part des enfants est multipliée par $25$ — elle passe de $4{,}5$ à $112{,}5$. Mais le disque, lui, n'a pas bougé : ses $67{,}5$ restent. Le total ne fait donc que $2{,}5$ fois plus, et $\omega$ tombe à $1{,}0$, pas à $0{,}5$. » |
| `deux-et-demi` | deux fois et demie plus petite ($1{,}0\ \text{rad/s}$) | **oui** | — | « Oui : $5{,}0\ \text{rad}$ tout à l'heure, $2{,}0\ \text{rad}$ maintenant. La grandeur affichée à droite passe de $72{,}0$ à $180{,}0$ — le disque y met toujours $67{,}5$, et les enfants passent de $4{,}5$ à $112{,}5$. Elle a un nom, un symbole et une unité : c'est l'objet du chapitre 4. » |
| `vingt-cinq` | vingt-cinq fois plus petite ($0{,}1\ \text{rad/s}$) : la distance compte au carré | non | `moment-inertie-additivite-erronee` | « Le carré, tu l'as vu juste. Mais tu l'as appliqué à **tout** le système : le disque n'a pas déménagé, sa part ne change pas d'un gramme. Seule la part des enfants est multipliée par $25$ ($4{,}5 \to 112{,}5$), et le total passe de $72{,}0$ à $180{,}0$ — $2{,}5$ fois, pas $25$. » |

- **`suite` :** « Fais glisser les sièges d'un bout à l'autre et relance :
  $67{,}5 + 2\times 25\,r^2$, et la course répond. À $0{,}30\ \text{m}$ tu
  retrouves $72{,}0$ ; à $1{,}50\ \text{m}$, $180{,}0$. La trace pointillée garde
  la position finale de l'essai précédent : les deux angles restent côte à
  côte. »
- **⟂-avant-pari :** `omega`, `angle`, `inertie` ; tout mouvement ; la trace de
  l'essai de S3 ; le verdict. **Reste visible :** le disque vu de dessus, les
  deux sièges au bord, la flèche de poussée, le rayon peint à sa position de
  départ.

### 7.5 S5 — `libre` · « À toi : où t'assoir, où pousser »

- **État :** `force: tangentielle`, `axe: vertical`, `r_sieges: 1.5`,
  `r_poussee: 1.5`, `occupants: deux`, `vue: biais`.
- **Contrôles ouverts :** `force`, `distance`, `bras`. **Lectures :** les six.
- **Pas de `revele_apres_course`** — le pari compare **trois réglages** ; une
  seule course ne pourrait pas le trancher. Verdict immédiat, puis les contrôles
  s'ouvrent et l'élève va vérifier les trois. (Écart assumé avec les quatre
  autres étapes ; c'est l'étape où l'échafaudage tombe.)
- **Consigne :** « Tout s'ouvre. Tu choisis où les enfants s'assoient et où tu
  pousses ; la force vaut toujours $30\ \text{N}$, la poussée dure toujours
  $4{,}0\ \text{s}$. Deux lectures de plus s'allument, avec des noms que tu ne
  connais pas encore : $J_\Delta$ et $\ddot\theta$. Tu peux jouer sans elles —
  et revenir ici au chapitre 4, où $J_\Delta = 67{,}5 + 2\times 25\,r^2$ est
  exactement le calcul que tu feras, puis au chapitre 5, où
  $\ddot\theta = \Sigma\mathcal{M}_\Delta / J_\Delta$ sera démontrée. »
- **Pari :** « Tu veux que le manège démarre le plus vite possible. Deux réglages
  à choisir : où s'assoient les enfants, et où tu pousses. Le meilleur, c'est… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `tout-au-bord` | enfants au bord ($1{,}50$) **et** poussée au bord ($1{,}50$) : loin de l'axe, tout est plus efficace | non | `repartition-masse-mal-comprise` | « Loin de l'axe, c'est meilleur pour la **force** et pire pour la **masse** : le levier multiplie l'efficacité d'une poussée, mais une masse éloignée **résiste** davantage. Essaie : $\ddot\theta = 0{,}250$ ici, contre $0{,}625$ en rapprochant seulement les enfants. Le même mot « loin » ne fait pas la même chose aux deux. » |
| `enfants-pres` | enfants près de l'axe ($0{,}30$) **et** poussée au bord ($1{,}50$) | **oui** | — | « Oui : le plus grand moment ($45{,}0\ \text{N}\cdot\text{m}$) et la plus petite résistance ($72{,}0$). $\ddot\theta = 0{,}625\ \text{rad}\cdot\text{s}^{-2}$ — le maximum atteignable sur cette scène. La distance joue deux rôles opposés : loin pour la force, près pour la masse. » |
| `tout-pres` | enfants près de l'axe ($0{,}30$) **et** poussée près de l'axe ($0{,}20$) | non | `moment-force-sans-bras-de-levier` | « Tu as rapproché les enfants — bien — et tu as rapproché la poussée aussi, ce qui l'écrase : $6{,}0\ \text{N}\cdot\text{m}$ au lieu de $45{,}0$. Essaie : $\ddot\theta = 0{,}083$, presque huit fois moins que le meilleur réglage. Près de l'axe, une force perd son levier. » |

- **`suite` :** « Vérifie les trois, un par un : $0{,}625$ · $0{,}250$ · $0{,}083$
  rad·s⁻². Puis repasse la force en **poids** : à la verticale de l'axe, elle a
  beau valoir $245\ \text{N}$, la lecture reste à $0{,}0$ et le manège ne part
  pas. »
- **⟂-avant-pari :** les six lectures ; tout mouvement ; la trace ; le verdict.

### 7.6 Le contrat « avant le pari » (famille de porte)

Règle générale, valable aux cinq étapes : **tout ce qui dépend de l'ISSUE
attend la révélation** — le dessin qui la montre (décomposition, bras de levier,
arcs, trace), la fiche qui la coche (toute lecture), le verdict qui la dit, la
phrase accessible qui la décrit, et la course qui la produit (le bouton de
lancement n'existe pas avant l'engagement). Ce qui reste, c'est **l'énoncé** :
la scène telle que l'étape la pose.

**Une exception, argumentée, à faire valider :** les **trois vues prédéfinies
restent disponibles avant le pari**. Raison : elles sont l'équivalent clavier du
glisser (§7 de l'ADR, WCAG 2.4.11) et les retirer casserait l'accessibilité ;
et un élève qui tourne lui-même autour de l'objet et y voit la réponse n'a pas
été *répondu* par le produit, il a *exploré*. Ce que la scène **ajoute** pour
répondre reste interdit. La vue d'ouverture de S1 est `cote` — la plus
favorable à l'erreur, jamais celle qui trahit.

**Le contrat vaut ENTRE les étapes (amendement du 2026-09-24).** Ce qu'une
étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT fait
deviner : un réglage est le seul chemin vers un état. Les sièges (`distance`)
répondent au pari de S4 — fermés avant lui ; la poussée (`bras`) départage
celui de S5 — fermée avant lui. Famille `fuite-inter-etapes` de la porte, qui
écrit cette table elle-même, contre le descripteur : c'est un jugement sur ce
que chaque pari demande, pas une copie de la liste des contrôles.

---

## 8. Misconceptions

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions déclarées visées |
|---|---|
| S1 | `moment-force-sans-bras-de-levier` (forme « direction », voir 8.2) |
| S2 | `moment-force-sans-bras-de-levier` (sur-généralisation + unités) |
| S3 | `omega-uniforme-vs-v-variable` (2 formes) |
| S4 | `repartition-masse-mal-comprise` · `moment-inertie-additivite-erronee` |
| S5 | `repartition-masse-mal-comprise` · `moment-force-sans-bras-de-levier` |

### 8.2 L'erreur « parallèle à l'axe » est-elle couverte ? — oui *textuellement*, non *diagnostiquement*

`moment-force-sans-bras-de-levier` dit, dans sa `description` : « …**ou ne teste
pas si la force a une composante tangentielle avant de lui attribuer un moment
non nul** ». Une force parallèle à l'axe n'a aucune composante tangentielle :
l'erreur tombe littéralement sous cette clause. **Mais** son
`contradicts_principle` n'énumère que deux cas nuls — « appliquée exactement sur
l'axe, ou dirigée radialement » — c'est-à-dire **exactement le trou de la
leçon**, recopié dans l'inventaire.

Et surtout, comme **instrument de diagnostic**, la fusion coûte cher : l'élève
qui répond $367{,}5$ pour le poids **n'ignore pas** le bras de levier — il
l'applique correctement et échoue sur la **direction**. Deux modèles distincts
sous une même étiquette, c'est un compteur qui ne dit plus lequel tourne.

**Recommandation : ouvrir un dixième modèle.** Proposition complète ci-dessous ;
la voie de repli, si le propriétaire la refuse, est en 8.5.

```yaml
  - id: mc.physics.pc_rotation_axe_fixe.moment-force-direction-vs-axe
    label: >-
      « Une force loin de l'axe a forcément un moment : sa DIRECTION par
      rapport à l'axe ne change rien »
    description: >-
      L'élève calcule $d\cdot F$ sans regarder la direction de la force par
      rapport à l'AXE. Formes : attribuer un moment non nul à une force
      parallèle à l'axe (le poids d'un enfant assis au bord d'un manège
      horizontal, « $1{,}50 \times 245$ ») ; prendre la distance du point
      d'application à l'axe pour bras de levier alors que la droite d'action
      est parallèle à l'axe ; croire que le moment est une propriété de la
      force seule, indépendante de l'axe choisi. Forme SYMÉTRIQUE, née de la
      correction de la première : après avoir vu qu'un poids ne fait pas
      tourner un manège d'axe vertical, généraliser « un poids ne fait jamais
      tourner » et refuser son moment au pendule pesant, dont l'axe est
      horizontal.
    contradicts_principle: >-
      Le moment d'une force par rapport à un axe $\Delta$ est nul dès que sa
      droite d'action RENCONTRE l'axe ou lui est PARALLÈLE ; seule la
      composante de la force située dans le plan perpendiculaire à $\Delta$
      peut faire tourner, et le bras de levier est la distance de $\Delta$ à
      la droite d'action de cette composante. Le moment n'est donc pas une
      propriété de la force seule : la même force, au même point, à la même
      distance, donne $0$ avec un axe vertical et $mgd$ avec un axe
      horizontal.
```

### 8.3 Les trois items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** où au moins un distracteur porte le
modèle. Les paris de la scène **ne comptent pas** (le modèle apprenant est bâti
sur le banc de fin seul — `coverage_summary.method`).

**ROT-26** — `rung: R2`, `difficulty_level: 2`,
`primary_misconception: …moment-force-direction-vs-axe`

- *stem :* Un manège est un disque horizontal qui tourne autour d'un axe
  vertical fixe $\Delta$ passant par son centre. Un enfant de $25\ \text{kg}$
  s'assoit tout au bord, à $1{,}50\ \text{m}$ de l'axe. On prend
  $g = 9{,}8\ \text{m}\cdot\text{s}^{-2}$. Que vaut le moment de son poids par
  rapport à $\Delta$ ?
- *clé :* $0\ \text{N}\cdot\text{m}$ — la droite d'action du poids est
  verticale, donc parallèle à l'axe.
- *distracteurs :* $367{,}5\ \text{N}\cdot\text{m}$ (« $1{,}50 \times 245$ »)
  → **direction-vs-axe** · $245\ \text{N}\cdot\text{m}$ (la force recopiée en
  moment) → `moment-force-sans-bras-de-levier` · « impossible sans la masse du
  disque » → `mecanisme-alternatif-ou-donnees-invoquees-a-tort`.
- *exigence de rédaction (REVIEW §« la moitié du banc s'auto-dénonce ») :*
  aucun distracteur ne nomme sa propre faute ; chaque `feedback` donne la
  **raison**, pas l'étiquette.

**ROT-27** — `rung: R2`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* Sur le même manège (axe vertical $\Delta$), on applique au même point
  $A$, situé à $1{,}20\ \text{m}$ de l'axe, trois forces successives de même
  intensité $F = 100\ \text{N}$ : $\vec F_1$ verticale vers le bas, $\vec F_2$
  horizontale dirigée droit vers l'axe, $\vec F_3$ horizontale perpendiculaire
  au rayon $\Delta A$. Laquelle fait tourner le manège ?
- *clé :* $\vec F_3$ seule ($120\ \text{N}\cdot\text{m}$) ; $\vec F_1$ est
  parallèle à l'axe, la droite d'action de $\vec F_2$ rencontre l'axe.
- *distracteurs :* « $\vec F_1$ et $\vec F_3$ : les deux sont à $1{,}20\ \text{m}$
  de l'axe » → **direction-vs-axe** · « les trois : même intensité, même point
  d'application, donc même moment $120\ \text{N}\cdot\text{m}$ » →
  `moment-force-sans-bras-de-levier` · « indécidable sans le moment d'inertie du
  manège » → `mecanisme-alternatif-ou-donnees-invoquees-a-tort`.

**ROT-28** — `rung: R6`, `difficulty_level: 3`, même `primary_misconception`
(co-étiquetage assumé avec la famille pendule pesant : c'est un
**co-attribution cible-distracteur entre compétences**, pas un défaut d'énoncé)

- *stem :* Une même barre homogène ($m = 2{,}0\ \text{kg}$, $\Delta G = 0{,}50\
  \text{m}$, $g = 9{,}8$) tourne autour d'un axe fixe $\Delta$ passant par une
  extrémité. **Cas 1 :** $\Delta$ est vertical (la barre balaie un plan
  horizontal). **Cas 2 :** $\Delta$ est horizontal et l'on maintient la barre à
  l'horizontale avant de la lâcher. Comparer le moment du poids dans les deux cas.
- *clé :* cas 1 : $0$ ; cas 2 : $2{,}0 \times 9{,}8 \times 0{,}50 = 9{,}8\
  \text{N}\cdot\text{m}$. Le poids n'a pas changé ; c'est la direction de l'axe
  qui décide.
- *distracteurs :* « les deux valent $9{,}8$ : mêmes poids et même $\Delta G$ »
  → **direction-vs-axe** · « les deux valent $0$ : un poids ne fait jamais
  tourner, il tire vers le bas » → **direction-vs-axe** (forme symétrique) ·
  « cas 2 : $19{,}6\ \text{N}\cdot\text{m}$, avec la longueur $1{,}0\ \text{m}$
  comme bras de levier » → `pendule-pesant-bras-de-levier-et-periode-errones`.

### 8.4 Ce que ces trois items font au reste du fichier

- `moment-force-direction-vs-axe` : **3** (ROT-26, 27, 28) — plancher atteint,
  marge nulle (comme six autres familles ; la REVIEW le signale déjà).
- `moment-force-sans-bras-de-levier` : 4 → **6** · `pendule-pesant…` : 3 → **4**
  · `mecanisme-alternatif…` : 12 → **14**.
- `ramp_coverage` : R2 : 3 → **5** · R6 : 3 → **4** · `total_items` : 25 → **28**.
- **`coverage_summary` est un tableau GÉNÉRÉ** : le régénérer par
  `node web/scripts/resume-couverture.mjs`, ne jamais le retoucher à la main.

### 8.5 Voie de repli (si le propriétaire refuse un dixième modèle)

1. amender le seul `contradicts_principle` de `moment-force-sans-bras-de-levier`
   pour y écrire le troisième cas : « …appliquée exactement sur l'axe, dirigée
   radialement, **ou parallèle à l'axe (sa droite d'action ne rencontrant jamais
   l'axe mais ne pouvant pas non plus le faire tourner)** … » ;
2. étiqueter ROT-26/27/28 et les deux paris concernés de la scène sur ce modèle ;
3. accepter la perte diagnostique, et l'écrire dans `note_banc_herite`.

**Contrainte de séquencement, dans les deux cas :** un `misconception:` employé
par le descripteur de scène doit être **déclaré dans `items.yaml` au moment où
la scène est validée**. Si le dixième modèle n'est pas encore accepté, la scène
part avec `moment-force-sans-bras-de-levier` sur S1/S2, et une seule ligne
change à l'adoption.

---

## 9. La frontière — ce que la scène ne montre ni ne calcule

Chaque interdit est **gardé par la porte** (§10, famille `frontiere`) : une
frontière que seule la retenue de l'auteur tient se perd à la première retouche
(addendum du 2026-09-24).

1. **Aucun moment cinétique, aucune formulation vectorielle.** Ni $\vec L$, ni
   $\vec{r}\wedge\vec F$, ni le symbole $\wedge$, ni « produit vectoriel ». Le
   moment affiché est un **scalaire signé par rapport à un axe**.
2. **Aucun calcul de $J$ par intégrale.** $J_\Delta$ est **donné** :
   $\frac12 MR^2 = 67{,}5$ pour le disque (valeur de la table de R3), plus
   $\sum m_i d_i^2$ pour les deux enfants. Aucun $\int$, aucun $\Sigma$ affiché
   autrement que dans la notation $\Sigma\mathcal{M}_\Delta$ de la leçon.
3. **Aucun solide libre, aucun gyroscope.** L'axe est **fixe** dans les deux
   orientations : le palier tient le disque, la scène le dit une fois, et rien
   ne bascule tout seul.
4. **Aucune oscillation, aucune période, aucune amplitude.** La course à axe
   basculé **s'arrête à l'équilibre**. Interdits d'affichage : $T_0$,
   « période », « pseudo », « amplitude », « harmonique », « isochronisme ». La
   scène n'entre pas dans le chapitre 7, elle y **renvoie**.
5. **Aucun modèle de frottement.** Frottements nuls, dit une fois en légende ;
   aucun coefficient, aucune courbe d'amortissement.
6. **Aucun moment calculé à partir d'une force oblique.** Les seules valeurs de
   `force` sont `poids`, `radiale`, `tangentielle`, et `axe` n'est pas ouvert
   par l'étape libre : dans **tout** état atteignable, le moment affiché est soit
   exactement $0$, soit $d \times F$ avec une force entièrement contenue dans le
   plan perpendiculaire à $\Delta$. La décomposition n'est montrée que pour
   **rendre le zéro évident**, jamais pour calculer.
7. **Aucun système composé** (solide en translation + solide en rotation, fil,
   poulie) : c'est le savoir-faire dominant des trois annales et il manque à la
   leçon (REVIEW, « non appliqué ») — mais il n'est **pas spatial**, et le mettre
   ici déplacerait la scène hors de son motif. **À traiter par de la prose et des
   items, pas par cette scène.**
8. **Aucun $a_N$.** L'accélération normale est un savoir-faire du cadre non
   couvert par la notion (REVIEW) ; la scène ne la dessine pas et ne prétend pas
   la couvrir. Signalé, non absorbé.
9. **La scène ne remplace pas la strate expérimentale.** Elle *ressemble* au TP
   du cadre (« $\Sigma M$ et accélération angulaire → vérifier la RFD ») et peut
   en nourrir des items de lecture de données ; elle **n'est pas** une mesure
   réelle, et la légende ne prétend jamais le contraire.

---

## 10. La porte (`web/scripts/scene-manege.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium/SwiftShader),
jamais le code du produit ; elle trouve son panneau par
`[data-scene="manege-rotation"]`, **jamais** par `[data-scene]` seul (une leçon
peut porter plusieurs scènes) ; sans WebGL au banc elle sort **MUET, en échec**,
jamais en vert.

### 10.1 Les nombres qu'une SECONDE implémentation doit recalculer

La porte recalcule à partir de **ses propres constantes**, écrites depuis la
leçon ($M = 60$, $R = 1{,}50$, $m = 25$, $F = 30$, $g = 9{,}8$, $t = 4{,}0$), et
n'importe **aucun** module du produit :

| grandeur | seconde voie exigée | valeurs à retrouver |
|---|---|---|
| $J_\Delta(r)$ | $\frac12MR^2 + 2mr^2$ recomposé dans la porte | $68{,}0$ ($r=0{,}10$) · $72{,}0$ ($0{,}30$) · $99{,}5$ ($0{,}80$) · $180{,}0$ ($1{,}50$) |
| $\mathcal{M}_\Delta$ tangentiel | $F \times r_{poussée}$ | $6{,}0$ ($0{,}20$) · $45{,}0$ ($1{,}50$) |
| $\mathcal{M}_\Delta$ nul | **égalité de chaîne** sur « 0,0 », pour `poids`+`vertical` **et** pour `radiale`, à **toutes** les valeurs de `distance` et de `bras` | `0,0` |
| $\mathcal{M}_\Delta$ du poids, axe basculé | $m\,g\,d$ | $367{,}5$ |
| $\ddot\theta$ | $\mathcal{M}/J$ | $0{,}625$ · $0{,}250$ · $0{,}083$ |
| $\omega(4{,}0)$ | $\ddot\theta\,t$ | $2{,}5$ · $1{,}0$ · $0{,}3$ |
| $\theta(4{,}0)$ | $\frac12\ddot\theta\,t^2$ | $5{,}0$ rad (286°) · $2{,}0$ rad (115°) · $0{,}7$ rad (38°) |
| fiche `points` | $v = d\omega$, $s = d\theta$ | fin de course A : $0{,}75$ / $3{,}75$ m/s, $1{,}50$ / $7{,}50$ m |
| point de passage | à $t = 3{,}2$ s (où $\omega = 2{,}0$) | $0{,}60$ et $3{,}0$ m/s — les nombres de R1 |

### 10.2 Les faits de PIXELS, mesurés dans les deux sens

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `ne-tourne-pas` | `force: poids`, `axe: vertical` : après la course entière, le rayon peint est **au même pixel** qu'à $t=0$ (écart angulaire < 0,5°) ; idem pour `radiale` | `force: tangentielle` : le rayon peint **a bougé** |
| `angle-mesure` | `tangentielle`, sièges $0{,}30$ : angle du rayon peint = **286° ± 2°** (= $\frac12\ddot\theta t^2$) ; sièges $1{,}50$ : **115° ± 2°** | les deux angles **diffèrent** entre eux d'au moins 100° (une scène qui ignorerait $J$ les rendrait égaux) |
| `axe-bascule` | `axe: horizontal` : le siège **descend** (son $y$ pixel augmente) et l'angle final vaut **90° ± 2°** | `axe: vertical`, même force : **aucun** déplacement |
| `poids-vu-de-dessus` | vue `cote` : la flèche du poids a une hauteur de boîte englobante > 20 × sa largeur | vue `dessus` : la même flèche s'écrase (hauteur ≈ largeur, à l'échelle de la scène — mesurée en **fractions du rayon du disque**, jamais au pixel absolu : leçon de la sonde du glyphe ⊗/⊙) |
| `bras-de-levier` | axe basculé : la longueur du segment de bras de levier **décroît** de façon monotone pendant la course et finit **à moins de 2 % du rayon** | axe vertical, `force: poids` : **aucun** segment de bras de levier dessiné (le dessiner serait enseigner l'erreur) |
| `avant-pari` | avant l'engagement, à chaque étape : **zéro** pixel d'accent (mesuré en **chrominance**, pas en luminance), aucune lecture dans le DOM, aucun bouton de course, aucune trace | après l'engagement : l'accent apparaît |

### 10.3 Les autres familles

`rien-avant-le-clic` (`window.__THREE__` indéfini panneau fermé) ·
`etapes` (chaque étape pose son état, n'ouvre que son contrôle, les autres
absents du DOM) · `paris` (2–4 choix, exactement un juste, chaque choix un
retour, rien dans la région live avant l'engagement) ·
`frontiere` (aucune des chaînes interdites du §9 dans le panneau ouvert ;
$J$ affiché toujours égal à $67{,}5 + 2\times25r^2$) ·
`katex` (aucun LaTeX brut visible) · `clavier` (les trois vues atteignables, et
chaque contrôle porte son `scroll-margin-top` — **vérifié en donnant le focus**,
pas en lisant la feuille de style : une déclaration présente et sans effet ne
prouve rien) · `sans-webgl` (paris, réglages et calculs conservés) ·
`console` (aucune erreur).

**Ajoutées le 2026-09-24, après la revue des captures :**
`fuite-inter-etapes` (§7.6 : aucune étape révélée n'ouvre un réglage qui
atteint l'état d'un pari suivant) · `etiquettes` (deux étiquettes de texte ne
se chevauchent pas, aucune n'est barrée par la flèche, le bras de levier ou le
rayon peint, aucune ne sort du canvas — à 1 280 px et à 390 px ; la trace dit
ce qui a CHANGÉ entre les deux essais). Vue du dessus — celle que le retour du
pari S1 demande —, « 245 N » et « dans le plan de rotation : 0 N » tombaient
au même point.

### 10.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec
cette commande** (ADR 0034). Sabotages à outiller, un par famille :

1. calculer le moment du poids par $d\times F$ (367,5 au lieu de 0) → `nombres`
   et `ne-tourne-pas` doivent rougir ;
2. faire tourner le manège sous la force parallèle → `ne-tourne-pas` ;
3. oublier les $67{,}5$ du disque dans $J$ → `nombres` et `angle-mesure` ;
4. écrire $\ddot\theta = \mathcal{M}\times J$ → `nombres` ;
5. dessiner un bras de levier pour la force parallèle → `bras-de-levier` ;
6. afficher une lecture avant le pari → `avant-pari` ;
7. laisser la course à axe basculé dépasser l'équilibre → `axe-bascule` et
   `frontiere` (le mot « oscillation » finirait par apparaître) ;
8. arrondir $\ddot\theta$ à 2 décimales → `nombres` (0,63 ≠ 0,625).

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, AMBIGU (ADR 0038). Et la porte se lance **plusieurs fois,
à plusieurs largeurs d'écran**, avant d'être crue.

---

## 11. Entrée de registre (`web/src/lib/scene3d/scenes.json`)

```json
"manege-rotation": {
  "temps": false,
  "course": true,
  "controles": ["force", "axe", "distance", "bras", "instant"],
  "etat": ["force", "axe", "r_sieges", "r_poussee", "occupants", "vue"],
  "bornes": { "r_sieges": [0.1, 1.5], "r_poussee": [0.2, 1.5] },
  "valeurs": {
    "force": ["poids", "radiale", "tangentielle"],
    "axe": ["vertical", "horizontal"],
    "occupants": ["deux", "un"],
    "vue": ["dessus", "biais", "cote"]
  },
  "lectures": ["moment", "inertie", "acceleration", "omega", "angle", "points"]
}
```

Vérifications que `validate-content` fera, et qui passent par construction :
chaque étape a `id`/`titre`/`consigne` et **au moins un contrôle** ; chaque
contrôle déclaré est ouvert par une étape (`force` → S1, S5 · `axe` → S2 ·
`distance` → S4, S5 · `bras` → S5 · `instant` → S3) ; la première étape pose un état ; chaque
pari a 2–4 choix, **exactement un** `juste`, et **un `retour` par choix** ;
`revele_apres_course` ∈ ]0,1] et la scène est bien une scène à course ;
`temps: false` donc **aucun** `revele_apres_h` ; tous les états sont dans les
bornes et les valeurs.

**Table des états, à recopier telle quelle dans le descripteur :**

| étape | force | axe | r_sieges | r_poussee | occupants | vue | révélation |
|---|---|---|---|---|---|---|---|
| `poids-parallele` | `poids` | `vertical` | 1.5 | 1.5 | `un` | `cote` | course 1 |
| `axe-bascule` | `poids` | `horizontal` | 1.5 | 1.5 | `un` | `biais` | course 1 |
| `deux-points` | `tangentielle` | `vertical` | 0.3 | 1.5 | `deux` | `biais` | course 1 |
| `repartition` | `tangentielle` | `vertical` | 1.5 | 1.5 | `deux` | `dessus` | course 1 |
| `libre` | `tangentielle` | `vertical` | 1.5 | 1.5 | `deux` | `biais` | immédiate |

**Champs de fin du descripteur** (mêmes rubriques que les quatre scènes
existantes) : `boundary` = le §9 résumé ; `fit_caveat` = le pas de 0,10 m,
l'échelle unique des flèches (1,00 m pour 100 N), le temps réel 1:1, l'arrêt de
course et son motif, $P = mg = 245\ \text{N}$ avec le $g = 9{,}8$ du chapitre 7,
frottements nuls ; `fallback_note` = **sans WebGL, le panneau garde les paris,
les réglages et les calculs ; la figure `moment-force`, juste au-dessus, couvre
le cas plan mais PAS le cas parallèle — c'est précisément ce que la 3D apporte,
et c'est pourquoi la prose du §4.2 doit exister** ; `pedagogy_wiring` avec
`why_3d`, `predict_then_reveal` et la liste des misconceptions ; `spec_ref` =
ce fichier ; `adr_ref` = `docs/decisions/0041-scenes-3d-de-premiere-partie.md`.

**Taxonomie de sourçage (ADR 0017, amendé par ADR 0041) :**
`type: manipulable` · `tool: scene3d` (three.js de première partie, licence MIT,
version épinglée, chargée au clic). Les valeurs `geogebra/desmos/phet` de la
taxonomie d'origine sont **fermées aux nouveaux embeds** depuis l'amendement du
2026-07-07 ; `scene3d` est leur successeur vérifiable. À déclarer tel quel.

---

## 12. Ce que cette spec ne tranche pas — questions au propriétaire

1. **Le dixième modèle de misconception** (§8.2) : ouvrir
   `moment-force-direction-vs-axe` avec ses trois items, ou amender le
   `contradicts_principle` existant ? Recommandation : **ouvrir**. Décision
   humaine, parce qu'elle touche l'inventaire et un `coverage_summary` généré.
2. **Les trois retouches de prose** (§4.2, §4.3, §4.4) : elles modifient une
   leçon déjà auditée et sans spec pédagogique. Recommandation : appliquer les
   trois ; la §4.2 est **exigée** par la scène (sans elle, le chemin imprimé et
   le chemin sans WebGL perdent le cas parallèle).
3. **Couper S3 ?** C'est la seule étape qui ne casse aucune prose non lue
   (§2.5). Une scène à quatre étapes reste cohérente ; je la garde par défaut
   pour l'engagement et pour les arcs, mais la décision est pédagogique.
4. **Les vues disponibles avant le pari** (§7.6) : exception argumentée à
   valider — accessibilité contre pureté du contrat.
5. **Trois manques de cadre que cette scène ne comble pas** et qui restent
   ouverts (REVIEW du 2026-09-19) : le **mouvement uniformément varié** (la scène
   le *montre* mais la leçon ne l'*écrit* toujours pas), **$a_N$**, et le
   **système composé** (translation + rotation), exigé par les trois annales.
   Ce sont des travaux de prose et d'items, à ordonner séparément.

---

## 13. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/rotation-axe-fixe` passe.
- `node web/scripts/scene-manege.mjs --porte` : **toutes** les familles vertes,
  sur un rendu réel, relancé à quatre largeurs d'écran.
- `node web/scripts/scene-manege.mjs --essai-rouge` : **chaque** famille crie,
  avec le vert qui l'a précédée, même dossier, même commande.
- `node web/scripts/resume-couverture.mjs` régénéré si §8.3 est appliqué.
- `dette-manipulable` recompté : la scène ne compte pour livrée **que** si elle
  est enregistrée dans `scenes.json`.
