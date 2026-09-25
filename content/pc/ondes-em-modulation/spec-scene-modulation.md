# spec — manipulable 2D `banc-de-modulation` (PC · `ondes-em-modulation`, R3)

**Statut : LIVRÉE (2026-09-25, HANDOFF §11.207)** ; les réponses par défaut du §13 ont
été appliquées (DÉCISIONS §27), chacune reste réversible — les deux BLOQUANTS de la
`REVIEW-2026-09-12`, eux, restent ouverts. Écrite le 2026-09-25 par
pedagogy-architect, rangée d'abord sous `docs/pipeline/propositions/`, elle a rejoint le
dossier de la notion dans le commit qui livre la scène. Les chemins qu'elle nommait
existent : le descripteur `content/pc/ondes-em-modulation/media/banc-de-modulation.json`,
le modèle `web/src/lib/scene2d/modulation-modele.ts` (et son test unitaire
`web/scripts/test-modulation.mjs`), le rendu `web/src/lib/scene2d/modulation-rendu.ts`,
le panneau `web/src/components/notion/scene/ModulationPanel.tsx`, la porte
`web/scripts/scene-modulation.mjs`.

**Ce que la construction, la porte et les revues ont changé à cette spec, écrit ici
plutôt que corrigé en douce :**
- **Le détecteur est une récurrence sur les DEUX extrema de chaque période de
  porteuse** (§5.2 la posait sur les seules crêtes positives, avec $|1 + m\sin|$).
  Identique tant que $m < 1$ ; sous la bosse retournée ($m > 1$), la crête positive
  est à l'instant IMPAIR, et la récurrence du §5.2 chargeait le condensateur sur une
  crête négative. **Entre deux crêtes**, le tracé vaut $\max(\text{décharge}, u_S)$ :
  la diode idéale remonte le flanc de la porteuse (les oscillogrammes des sujets le
  dessinent ainsi) au lieu de sauter à la verticale. La porte refait les deux.
- **Le crochet de comptage couvre TOUTE la largeur** (« 20 oscillations », et non
  « 2 oscillations » sous une division) : c'est le geste que les retours de S1
  prescrivent (« compte sur toute la largeur »), et il tombe sur un entier aux quatre
  crans ; sous une division, il aurait compté 0,6 oscillation à 1,2 kHz.
- **`amplitude-a` affiche l'amplitude LUE et l'amplitude RÉGLÉE**, comme les deux
  taux : $(U_{max}+U_{min})/2$ cesse d'être $A$ dès que $m > 1$ (1,25 V contre 1,00 V).
- **Les notes d'honnêteté suivent la chaîne** : la ligne sur $m$ à partir de S2, celle
  du détecteur une fois l'étage branché (§7.6 : le texte fuit) ; deux lignes de plus —
  la phase (les formules s'écrivent avec cos, l'écran est décalé d'un quart de
  période) et les quatre traits fins (§10.7 et §10.9, rendus sur la revue de fidélité).
- **Les textes de la spec qui violaient son propre §9 sont réécrits** : « montage de
  TP » (§9.15) → « montage d'électronique », « banc d'essai » ; « 5 % » de la sortie
  du détecteur (§9.12) → « presque rien » ; « ondulation » → « petites dents de scie » ;
  « au demi-carreau près » (§9.13) retiré ; « déphasée » → « changée de signe ».
- **Les erreurs de la spec, corrigées** : le retour « différence » de S2 (à 2 V/div,
  les crêtes ne deviennent pas 6 et 2 V — ce sont les divisions qui changent ; et ce
  bouton n'existe pas dans la scène : il rompt maintenant sur le curseur de $S_m$) ;
  « une descente qui dure un quart de période » → une demi ; « 8,06 div » → 8,08 ;
  la formule du retour juste de S2 écrite avec cos, comme les sujets.
- **La vague 1 (fidélité bac, pédagogie)** : la sous-section de notation contredisait
  la leçon qu'elle devait réconcilier — les deux conventions sont maintenant NOMMÉES,
  et la définition de $m$ en R3 ne dit plus « l'amplitude de la porteuse » ; « on ne
  lit ni $S_m$ ni $U_0$ » vaut pour la SORTIE seulement ; $A$ n'est pas lisible en
  divisions (seul $m$ l'est) ; les consignes de S2, S3 et S5 ne lisent plus les crêtes
  à la place de l'élève ; le titre et la consigne de S5 ne répondent plus à ses choix ;
  le titre de S4 ne dit plus « fenêtre » ; OEM-28 en forme de sujet (vérifier et
  conclure). Le §4.4 est posé APRÈS le paragraphe de la surmodulation (et non entre la
  définition de $m$ et « $m < 1$ ») : il parle de $m \ge 1$.
- **Le plateau est carré, le montage en bande au-dessus de l'écran**, l'écran calé à
  gauche : la marge de droite porte les noms des voies et les cotes, comme un
  oscilloscope. Au téléphone, le montage fait au moins 80 px et le fil de $u(t)$ est à
  24 px sous son haut (son nom passait sous la légende) ; $R_0$ se nomme à GAUCHE de sa
  résistance (à droite, il tombait sur le rail).
- **Le quadrillage et les axes sont peints en couleur OPAQUE** (le voile de l'encre
  douce sur la surface) : en transparence, les nœuds de la grille, composés deux fois,
  étaient des points plus sombres qu'elle — de faux sommets pour qui lit l'écran, la
  porte comprise.
- **Une étiquette qui répond n'a de TEXTE qu'après sa révélation** ($U_{max}$,
  $U_{min}$, $u_C$, $R_0$, $C_0$, les cotes, « ici, elle ne suit plus ») : cachée, elle
  restait dans le texte du panneau, et le texte fuit (§7.6). Le repère de S5 dit « ici,
  $C_0$ se vide » : « ici, le condensateur se vide » faisait six divisions au téléphone
  et couvrait la crête de $u_C$ que l'étape fait regarder ; les cercles d'accent sont
  des obstacles pour les étiquettes. **Ce qui n'est pas armé** : M3 (la frontière exacte du décrochage) —
  cinq crans de rhéostat n'en approchent aucun à 5 % ; écrit dans l'en-tête de la porte.

**Ce que ce document est.** Le cadrage pédagogique complet du **douzième**
manipulable de première partie et du **sixième PLAN** (ADR 0041, `"tool": "scene2d"`,
mêmes pièces que la cuve, la corde, les noyaux, le banc de diffraction et le
tremplin) : sa justification mesurée, sa frontière officielle, son placement, ses
cinq étapes à pari, ses contrôles, ses lectures avec leurs unités et leur précision,
la table de ce qui ne doit pas être à l'écran avant chaque pari, les lignes
d'honnêteté, un huitième modèle de misconception avec ses items, et le contrat de
porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la
prose finale, ni les items finaux. Le descripteur est de content-author ; le modèle,
le rendu, le panneau et le registre de frontend-builder ; les items d'item-author.
Le §4 **décrit** les paragraphes à écrire ; il ne les rédige pas.

Marqueur : `[[embed:banc-de-modulation]]` · clé de registre : `banc-de-modulation` ·
sélecteur de porte : `[data-scene="banc-de-modulation"]`.

---

## 0. Pourquoi cette notion maintenant — et la réponse à l'objection écrite contre elle

**L'objection existe, elle est écrite, et elle est de bonne foi.** La spec du banc de
diffraction (`content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md` §0) a
pesé cette notion et l'a écartée en ces termes :

> « `ondes-em-modulation` | élec **21 %** | 4 [entrées] | « aucun des 24 items ne rend
> de figure, aucun n'exerce la lecture d'oscillogramme — geste exigé par 7 sujets
> réels sur 7 » | **bloqué** : BLOQUANT propriétaire non tranché ($F_p = 2$ kHz publié
> contre $1003 \pm 15$ Hz mesuré, « 2 kHz est à 66 σ ») **et** conflit de modèle non
> arbitré ($m = S_m/U_0$ contre $m = S_m/P_m$). »
>
> « *`ondes-em-modulation` a le meilleur poids et le geste d'examen le plus absent, et
> elle reste **bloquée** par deux décisions de propriétaire ; la construire maintenant
> serait bâtir une porte sur un désaccord.* »

**La réponse, en trois points mesurés.**

### 0.1 Le premier BLOQUANT ne touche pas cette scène — et la scène s'écarte de lui exprès

Le litige vit à **deux endroits exactement**, et ce sont deux endroits que cette
livraison **ne touche pas** :

- `content/pc/ondes-em-modulation/exercises.yaml:46` (l'`intro` de `r-bac`, rendue au
  sommet R6) : « *on relève la période de l'oscillation rapide : $T_p = 0{,}5$ ms* »,
  d'où $F_p = 2$ kHz à `:75` ;
- `content/pc/ondes-em-modulation/bank.yaml:242` (`bk-2017-n-x3` q2), qui reprend la
  même valeur, avec l'avertissement de vingt lignes en tête de fichier
  (`bank.yaml:81-131`).

**La scène n'emploie aucune valeur du sujet 2017 N pour la porteuse**, et elle
**exclut $2{,}0$ kHz de ses crans** : ses quatre fréquences de porteuse sont
**1,2 · 2,4 · 4,0 · 8,0 kHz** (§5.3). Ce n'est pas un hasard de tirage, c'est une
décision de conception que la porte garde comme une frontière (§9.14) : *une scène
n'affiche pas un nombre qui est en arbitrage.* Le BLOQUANT ressort de cette livraison
**intact et pas aggravé** : aucun fichier qui le porte n'est modifié.

*Ce que la scène emprunte à 2017 N, en revanche, est la partie du drapeau qui a été
**levée** :* les extrema d'enveloppe $3\ \text{V}$ / $1\ \text{V}$, « *confirmé
(2,989 V et 0,986 V mesurés)* » (`REVIEW-2026-09-12`), d'où $m = 0{,}50$ — qui est
aussi le $m$ de 2023 N. C'est l'état de départ de S1 et de S2 (§5.4).

### 0.2 Le second BLOQUANT n'est pas contourné : il est **armé**

Le conflit de modèle est réel et le REVIEW le chiffre :

> « **Le multiplieur n'existe nulle part** (`grep` ⇒ 0 dans lesson/items/checkpoints)
> alors qu'il est le formalisme d'entrée du sommet et de 5 des 7 entrées. Risque
> chiffrable : dans le modèle de la leçon $U_0$ est « l'amplitude de la porteuse » ;
> dans le modèle multiplieur c'est la composante continue de la modulante, et
> $A = k\,P_m\,U_0 \neq U_0$. Un élève fidèle à la leçon calcule $m = S_m/P_m$ —
> faux. »

**Une scène est exactement l'instrument qui rend ce conflit visible** au lieu de le
laisser dormir : elle affiche, côte à côte et à des valeurs **différentes**,
$U_0 = 4{,}0$ V (la composante continue de l'entrée) et $A = 2{,}0$ V (l'amplitude
globale du signal de sortie). Un élève qui croit $A = U_0$ le voit tomber sur le
premier écran.

Mais **c'est une décision de propriétaire**, et cette spec la **pose** (§13.2) au lieu
de la supposer : elle commande une sous-section de prose (§4.3) qui réconcilie les
deux écritures en une ligne — *le taux $m$ compare toujours $S_m$ à la **composante
continue de la modulante**, jamais à l'amplitude de la porteuse ; les deux modèles ne
diffèrent que par le facteur $kP_m$* — et elle écrit le repli si le propriétaire
refuse (§13.2, réponse alternative). **Rien n'est construit avant l'arbitrage.**

### 0.3 Le trou, lui, est le plus gros du corpus PC sur ce point précis

Quatre faits, chacun vérifiable en une commande.

1. **Dix entrées de banque, neuf années distinctes.** `bank.yaml` porte
   `bk-2010-n-x3b`, `bk-2012-r-x3b`, `bk-2015-n-x3b`, `bk-2017-n-x3`,
   `bk-2021-n-x4`, `bk-2022-r-x3c`, `bk-2023-n-x3`, `bk-2023-r-x3c`,
   `bk-2025-n-x3`, `bk-2025-r-x3b`. Le chapitre tombe **à chaque session relevée**,
   pour **1,25 à 1,75 pt** (barèmes lus : 1,75 · 1,5 · 1,25 · 1,75 · 1,75).
2. **Sept de ces dix entrées exigent de LIRE un oscillogramme** — et le corpus ne
   l'exerce nulle part. `REVIEW-2026-09-12` : « *aucun des 24 items ne porte de champ
   `habilete`, aucun ne rend de figure, aucun n'exerce la lecture d'oscillogramme —
   geste exigé par 7 sujets réels sur 7 et pesé 15 % par le cadre.* » Les **5** points
   d'arrêt sont **tous** `habilete: utilisation`. **Application expérimentale mesurée :
   0 %, cible du cadre : 3,15 % de l'examen** (§1).
3. **Les cinq médias de la notion mentent sur l'échelle de temps sans dire de
   combien** (§2.1) : `modulation-amplitude.svg` réduit $f_p/f_{signal}$ **à 6** au
   lieu de 300 et l'avoue dans un **commentaire SVG** (l. 26-29) que l'élève ne lit
   pas ; sa note de bas de figure dit « rapport réduit ici pour la lisibilité » **sans
   donner le facteur**. `bonne-surmodulation.svg` fait pire : **rapport 4**, même aveu
   non chiffré. C'est le défaut exact que la spec du banc de diffraction avait trouvé
   dans `diffraction-fente.svg` (facteur 54 tu) — ici il est **double** et **déclaré à
   moitié**.
4. **Le critère chiffré de démodulation n'est écrit nulle part**, et un sujet vérifié
   l'exige. `bank.yaml:794-806`, drapeau pédagogique de `bk-2025-n-x3` q3-3 :
   « *le rung 4 décrit qualitativement le compromis charge-rapide / décharge-lente
   (« elle rattrape le sommet suivant ») mais n'énonce nulle part, sous forme explicite
   testable, la double inégalité $1/f_p \ll R_0C_0 \ll 1/f_s$ que cette question exige
   de vérifier numériquement.* » Le sujet 2025 N y répond **non** (borne de droite
   violée). **Un manipulable qui fait échouer le détecteur dans les deux sens est
   littéralement l'instrument que ce drapeau réclame.**

### 0.4 Les autres candidates, pesées

| notion | poids | ce qui la départage |
|---|---|---|
| **`ondes-em-modulation`** | élec **21 %** (rang 2 phys.) | **10 entrées, 9 années, 7/7 lectures d'oscillogramme, 0 item qui l'exerce, 0 % d'application expérimentale, 5 médias figés dont 2 mentent sur l'échelle sans la chiffrer, 1 critère de sujet enseigné nulle part** |
| `rlc-serie` | élec 21 % | `rc-sandbox` et `rlc-sandbox` manipulent **déjà** l'exponentielle et l'oscillation à côté ; et la `limite` du cadre (pas de solution analytique du cas amorti) interdit la moitié de ce qu'une scène voudrait montrer |
| `dipole-rl` | élec 21 % | notation en arbitrage ouvert ($R$ totale contre $R$ conducteur) : chaque étiquette serait en litige ; même exponentielle déjà manipulée |
| `lois-de-newton` | méca 27 % | **servie** : `tremplin-circulaire` vient d'y être livrée (2026-09-25) |

**Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme**
(ADR 0035) :

- **Le spectre de fréquences** est un `savoir_faire` **imprimé** du cadre
  (`pc-physique-chimie.yaml:236` : « connaître et exploiter le **spectre de
  fréquences** »), il est demandé par 2023 N q3 (0,5 pt), et `checkpoints.yaml:39-41`
  l'**interdit** en garde de périmètre — une garde qui **contredit le cadre**. Cette
  scène est un instrument du **domaine temporel** et **n'entame pas** le spectre
  (§9.1) ; elle ne corrige pas non plus la garde. **Reste dû**, et c'est une décision
  de propriétaire (§13.7).
- **Le circuit accordé** (4 entrées sur 10) est de l'algèbre sur
  $f_0 = 1/(2\pi\sqrt{LC})$, pas un geste de manipulation. **Hors scène** (§9.7).
- **Le champ `habilete` n'existe sur aucun des 24 items** de la notion (`grep` ⇒ 0).
  Les quatre items neufs du §8 le porteront ; le mélange 50 / 15 / 35 restera
  **incalculable** — c'est `DECISIONS-EN-ATTENTE` §3, et cette livraison ne la tranche
  pas (§13.9).
- **`dette-manipulable` ne bouge pas.** `content/pc/ondes-em-modulation/` ne porte
  **aucun `spec.md`** (contenu du dossier : `lesson.md`, `items.yaml`,
  `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`, `REVIEW-2026-09-12.md`,
  `media/`) : aucune spec n'y a jamais prescrit d'`embed`, et `grep '\[\[embed:'` sur
  le dossier donne **0**. Comme la corde, comme le banc, comme le tremplin, cette
  scène **ne doit pas être comptée comme un paiement** ; `media-manipulable` monte
  d'une notion.

### 0.5 Une attente du commanditaire, **overrulée par la mesure** : le trapèze

La commande demandait « *le taux de modulation $m$ et sa lecture par le TRAPÈZE en
mode XY (un classique du bac)* ». **Mesuré : le trapèze n'existe nulle part dans ce
dépôt.**

```
rg -i 'trapèz|trapez|Lissajous|mode XY|X-Y'  docs/sujets/   →  1 occurrence
```

…et cette unique occurrence est `docs/sujets/_incoming/pc-2012-n.md:751`, où
« trapèze » décrit **le socle d'un tube dans une figure** (« *un socle noir plein
(trapèze/bande épaisse remplie)* »). Aucune occurrence dans `content/`, aucune dans
`docs/cadre/`. Le mode XY, Lissajous : **zéro**.

**Ce que le bac marocain demande réellement, lui, est mesuré et unanime : la lecture
des EXTREMA de l'enveloppe sur un oscillogramme en fonction du temps.**

$$m = \frac{U_{max} - U_{min}}{U_{max} + U_{min}} \qquad\text{et}\qquad A = \frac{U_{max} + U_{min}}{2}$$

- `bank.yaml:583` (2023 N q2a) : $m = \dfrac{6-2}{6+2} = 0{,}5$ ;
- `bank.yaml:991` (2025 R q2) : $m = \dfrac{1{,}6-0{,}4}{1{,}6+0{,}4} = 0{,}60$ ;
- `bank.yaml:1253` (2015 N q2-3) : $m = \dfrac{5{,}0-1{,}0}{5{,}0+1{,}0}$ ;
- `bank.yaml:248` (2017 N q3) et `exercises.yaml:85` (`r-bac` q3) : $m = \dfrac{3-1}{3+1} = 0{,}5$ ;
- `bank.yaml:364` (2021 N q3) : par $m = S_m/U_0$, lu sur les **deux voies d'entrée**.

**La scène est donc construite sur les extrema, pas sur le trapèze.** Si le
propriétaire sait que le trapèze est enseigné dans les manuels marocains hors dépôt,
c'est une décision de **cadre**, pas de scène (§13.12, §15.4) — et il faudrait alors
l'écrire d'abord dans `lesson.md`, la scène ensuite. *Ne jamais laisser une scène
élargir le programme depuis une intuition.*

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`electricite`** →
  **`applications_modulation`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 225-239).
- **Poids :** `poids: { part_examen: 21, rang_physique: 2 }` (cadre p. 18) — le
  **deuxième** sous-domaine de la physique, derrière la mécanique.
  **Habiletés du sous-domaine** (cadre p. 19, YAML l. 154-157) :
  **utilisation des ressources 10,5 %**, **application expérimentale 3,15 %**,
  **résolution de problème 7,35 %**. *C'est la cible chiffrée de l'item-author et le
  nombre que le critique de fidélité doit mesurer. Le corpus de cette notion est
  aujourd'hui à **0 %** d'application expérimentale (§0.3).*
- **`competences_ciblees` du sous-domaine** (cadre p. 29, la seconde) : « **Interpréter
  les constituants et le rôle des éléments d'une chaîne d'émission** ; être conscient
  de son intérêt dans la communication. »
- **`programme` du chapitre** (cadre p. 21), cité entier :
  > « Ondes électromagnétiques — transmission d'informations ; **modulation d'une
  > tension sinusoïdale** ; **modulation d'amplitude (principe de modulation et de
  > démodulation)** ; réalisation d'un récepteur radio AM. »

  *La **démodulation** est nommée dans la même parenthèse que la modulation : les
  étapes S4 et S5 ne débordent pas le chapitre, elles en occupent la seconde moitié.*
- **`savoir_faire` que la scène sert** (cadre p. 9, YAML l. 229-237) :
  - « **Modulation d'amplitude : amplitude du signal modulé = fonction affine de la
    tension modulante ; conditions anti-surmodulation.** » — **S2, S3**. *C'est la
    ligne centrale de la scène : « fonction affine de la tension modulante » est
    exactement $U_{max} = kP_m\,(U_0 + S_m)$, et « conditions anti-surmodulation » est
    S3.*
  - « **Reconnaître les étapes de modulation/démodulation ; exploiter les courbes
    expérimentales ; reconnaître les étages à partir d'un schéma.** » — **S1, S4,
    S5**. *« Exploiter les courbes expérimentales » est le geste à **0 %** du corpus
    (§0.3) ; « reconnaître les étages à partir d'un schéma » est le montage dessiné à
    gauche de l'écran, qui gagne son étage de détection à S4.*
  - « Connaître l'expression d'une tension sinusoïdale… » — **acquis** (R2) ; la
    consigne de S1 la **rappelle** sans l'enseigner.
  - « Connaître le rôle des **filtres** ; connaître et exploiter le **spectre de
    fréquences**. » — **hors scène** : le spectre est un domaine fréquentiel, la scène
    est temporelle (§9.1, §13.7).
  - « Antenne émettrice/réceptrice… » · « Connaître le rôle sélectif du **circuit
    bouchon LC**… » · « vitesse de transmission » — **hors scène** (R1 et R5 ; §9.7,
    §9.10).
- **`travaux_pratiques` du sous-domaine** (cadre p. 26, le quatrième) : « **Ondes
  électromagnétiques → modulation d'amplitude, démodulation, réaliser un récepteur AM
  simple.** » La scène **n'est pas** un TP et ne prétend jamais l'être (§10.2) — elle
  en répète le **geste** : brancher un multiplieur, régler un signal, lire un écran,
  ajouter un détecteur, régler un rhéostat.
- **`limites` du chapitre portées en dur** (l. 238-239) :
  > « **Traitement QUALITATIF et fonctionnel : rôle des filtres, étages, spectre. PAS
  > de fonction de transfert, PAS de diagramme de Bode, PAS de conception quantitative
  > de filtre.** »

  Trois conséquences non négociables :
  1. **Le détecteur de crête est un ÉTAGE, pas un filtre calculé.** La scène affiche
     $R_0C_0$, $1/F$ et $1/f$ **côte à côte** — la comparaison d'ordres de grandeur que
     les sujets demandent — et **jamais** un gain, une atténuation, une fréquence de
     coupure, un décibel (§9.6).
  2. **Aucune ondulation chiffrée en pourcentage n'est affichée.** Elle est calculée
     (le modèle en a besoin) ; elle n'est ni lue, ni nommée, ni commentée à l'écran.
     *La porte, elle, a le droit de la mesurer — règle de la cuve à ondes (ADR 0041,
     addendum du 2026-09-24, point 3).*
  3. **La frontière exacte du décrochage, $R_0C_0 = 1/(2\pi f m)$, n'est jamais
     affichée** (§10.5) : ce serait une conception quantitative de filtre.
- **`exclusions` du sous-domaine `electricite` portées en dur** (l. 247-251) :
  1. « Régime sinusoïdal forcé d'un RLC (**résonance forcée, impédance, déphasage,
     phaseurs**) » ;
  2. « **Notation complexe / phaseurs** pour les circuits » ;
  3. « **Puissance en régime alternatif** (active/réactive, facteur de puissance) » ;
  4. « **Composants actifs comme objets d'étude** (transistor, amplificateur
     opérationnel) — seuls condensateur et bobine sont étudiés comme dipôles ».

  **La quatrième mord directement, et elle décide d'un choix de dessin :** le
  multiplieur est **un rectangle marqué « X »**, deux entrées, une sortie — exactement
  la figure 3 de 2025 R et la figure 5 de 2021 N. **Jamais de schéma interne, jamais
  le mot « amplificateur opérationnel », jamais « transistor »** (§9.5). Le
  multiplieur est une **boîte noire**, comme dans tous les sujets. La première mord
  sur le vocabulaire (§9.2).
- **La frontière qui mord ensuite est INTERNE, et elle est de RANG** (précédent :
  le tremplin, ADR 0041 addendum du 2026-09-25, point 3). La scène est posée **en tête
  de R3**, donc :
  1. **Avant** que R3 énonce $f_p \gg f_{signal}$, $m = S_m/U_0$ et la surmodulation ;
  2. **Avant** que R4 décrive le détecteur de crête ;
  3. **Avant** que R5 pose le circuit accordé.

  Ce n'est pas une prudence d'auteur : c'est le rang de la scène dans la page, et la
  porte le garde forme par forme (§9).

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les six médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `antenne-quart-onde` (stagé) | R1 | $\lambda/4$ et la taille d'antenne | hors sujet ici |
| `construction-modulation` (**motion**, 4 temps) | R2 | porteuse seule → signal seul → leur produit et son enveloppe → l'enveloppe isolée | **c'est un film** : rien ne se règle ; **aucun quadrillage, aucune sensibilité, aucune valeur lisible** ; le rapport $f_p/f_{signal}$ n'est **pas déclaré du tout** |
| **`modulation-amplitude`** (2 étapes) | **R2** | $s(t)$, son enveloppe en pointillés, un repère $U_0$ | **rapport $f_p/f_{signal}$ RÉDUIT à 6** (au lieu de 300) — l'aveu chiffré est dans un **commentaire SVG** (l. 26-29), et la note de bas de figure **rendue** dit seulement « rapport réduit ici pour la lisibilité », **sans le facteur** · **aucun quadrillage, aucune sensibilité, aucun $U_{max}$/$U_{min}$, aucun $m$** · **rien ne varie** |
| **`bonne-surmodulation`** (3 étapes) | **R3** | deux panneaux figés, $m = 0{,}5$ à gauche et $m \approx 1{,}33$ à droite, le pincement, la formule $m = S_m/U_0$ | **rapport réduit à 4** (commentaire l. 22-24), même aveu **non chiffré** en bas de figure · **deux valeurs de $m$, pas un réglage** · aucun quadrillage, aucune lecture d'extrema · une seule période de signal par panneau |
| **`detecteur-crete`** (3 étapes) | **R4** | $s(t)$, l'alternance redressée, $u_C$ qui retrace l'enveloppe, et le schéma diode + $R$ + $C$ | **une seule constante de temps**, jamais nommée ni chiffrée · **aucun des deux échecs** · « charge rapide / décharge lente » **sans critère** — exactement le drapeau de `bk-2025-n-x3` |
| `circuit-accorde-selection` | R5 | le circuit bouchon et la sélection | hors sujet ici (§9.7) |

**Le constat, et il est exact :** la notion possède **trois** figures de signal modulé.
Aucune ne porte de **quadrillage**, aucune ne porte de **sensibilité** (V/div, ms/div),
aucune n'affiche **$U_{max}$ ni $U_{min}$**, aucune ne laisse varier **quoi que ce
soit** — et **deux d'entre elles déforment l'échelle de temps d'un facteur qu'elles
taisent**. Or les **sept** entrées de banque qui font travailler une courbe font
**exactement** ces trois choses : quadrillage, calibration, extrema.

### 2.2 Le motif central : une enveloppe qui NE BOUGE PAS pendant que la porteuse s'épaissit

Le point que la scène existe pour installer, en une phrase :

> Quand on change la fréquence de la porteuse, **l'enveloppe ne bouge pas d'un
> pixel** : même période, mêmes renflements, mêmes resserrements, mêmes crêtes à
> $3{,}00$ et $1{,}00$ division. Seul le nombre d'oscillations rapides sous
> l'enveloppe change — de **6** à **40** sur le même écran. L'information n'est pas
> dans la fréquence ; elle est dans l'amplitude, et l'écran le prouve en ne changeant
> rien d'autre.

C'est **la misconception la mieux servie du chapitre** (`porteuse-vs-signal-modulant`,
4 items + `cp-r2-porteuse-signal` + la confusion avec la FM), et **aucune figure ne
peut la casser**, parce que le fait à montrer est *qu'une chose reste identique
pendant qu'une autre change*. Il faut **deux images du même signal à deux fréquences
de porteuse**, superposables au pixel près sur leur enveloppe. Une figure en montre
une. Un curseur en montre quatre, et la porte le mesure dans les deux sens (§11.2,
`enveloppe-inerte`).

Et le même curseur, poussé vers le bas, **casse la condition 1 sans l'énoncer** : à
$F/f = 3$, il ne reste que trois oscillations par période d'enveloppe, et l'enveloppe
cesse d'être une courbe — exactement l'image que `lesson.md:117` décrit en mots
(« *comme dessiner une courbe douce avec seulement deux ou trois points* ») et que
rien ne montre.

### 2.3 L'antidote obligatoire : une relation construite en QUATRE temps

Le chapitre ne porte pas une relation mais une **chaîne**, et un retour trop bavard la
donnerait d'un coup. Même discipline qu'au banc de diffraction (sa §2.3, la règle
`formule-graduee` ; ADR 0041, addendum de la nuit du 2026-09-24 : *la relation est un
ÉTAT qui fuit, par son TEXTE*) :

- **S1** établit **la lecture des deux périodes** sur la calibration : $T$ = (durée
  connue) / (nombre compté), puis $F = 1/T$ et $f = 1/T_{env}$, et le rapport $F/f$.
  Le retour n'écrit **ni $m$, ni $U_{max}$, ni $A$**.
- **S2** ajoute **les extrema** : $U_{max} = A(1+m)$, $U_{min} = A(1-m)$, d'où
  $A = \dfrac{U_{max}+U_{min}}{2}$ et $m = \dfrac{U_{max}-U_{min}}{U_{max}+U_{min}}$,
  et l'identité avec $m = S_m/U_0$. Le retour n'écrit **ni « $m<1$ », ni
  « surmodulation », ni rien du détecteur**.
- **S3** ajoute **le seuil** : $m < 1$, la surmodulation, le pincement — et le fait
  que la lecture graphique **sature à 1,00**. Le retour n'écrit **rien du détecteur**.
- **S4** ajoute **la fenêtre du détecteur** : $\dfrac{1}{F} \ll R_0C_0 \ll \dfrac{1}{f}$.
- **S5** ne rajoute rien : elle **assemble les trois conditions** et montre qu'elles ne
  sont pas indépendantes.

**Contrainte non négociable et mesurable** (§11.2, `formule-graduee`) : les chaînes
`U_{max}`, `U_{min}`, `taux`, `m =` n'apparaissent **nulle part** dans le panneau avant
la révélation de S2 ; `m < 1`, `surmodulation`, `pincement` pas avant celle de S3 ;
`R_0C_0`, `\ll`, `détecteur`, `diode` pas avant celle de S4. La porte le lit dans le
`textContent` **rendu**, annotations TeX de KaTeX comprises (ADR 0039).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

| sujet | ce qu'il exige | ce que le corpus en fait |
|---|---|---|
| **2025 R** (`bank.yaml:921-1014`) | lire $F$ et $f$ par **comptage de crêtes sur un nombre connu de carreaux**, avec une **double flèche de calibration** ; puis $U_{max}$ et $U_{min}$ **là où les crêtes culminent réellement** (9,7 et 2,4 carreaux), **pas** sur les lignes chiffrées | le `reasoning` nomme **deux pièges** (l. 959, l. 1001) que **rien n'exerce** |
| **2023 N** (`bank.yaml:549-596`) | un QCM à 4 propositions où **A et D échangent porteuse et modulante** ; puis $m$ et $U_0$ par les extrema, lus au **repère en L** | aucun item n'a jamais fait lire un repère d'échelle |
| **2015 N** (`bank.yaml:1227-1261`) | lire $f$ et $F$ sur un oscillogramme dont la seule calibration est l'annotation « **1div** » ; le `reasoning` prévient : « *croire qu'il faut connaître les volts par division pour calculer $m$* » | rien n'exerce ce geste |
| **2021 N** (`bank.yaml:333-367`) | lire $S_m$ et $U_0$ **sur la voie d'entrée**, pas sur la sortie | la leçon « *ne modélise nulle part, pas à pas, ce cas de figure* » (SCOPE NOTE, `bank.yaml:139-151`) |
| **2025 N** (`bank.yaml:838-853`) | **vérifier numériquement** $1/f_p \ll R_0C_0 \ll 1/f_s$ et conclure **non** | « *le rung lui-même ne la formule jamais explicitement comme critère chiffré* » (drapeau, l. 794-806) |

**Le geste que rien n'exerce, et que la scène rend :** poser un doigt sur un
quadrillage, compter, multiplier par une sensibilité, et **conclure sur la qualité** —
puis changer un réglage et recommencer.

### 2.5 Trois idées volontairement écartées

- **Le spectre de fréquences, ÉCARTÉ par le domaine de l'instrument.** Il est au
  cadre, il est demandé par 2023 N (0,5 pt), et `checkpoints.yaml:39-41` l'interdit à
  tort. Mais un oscilloscope en fonction du temps **ne montre pas un spectre** : une
  scène qui en dessinerait un changerait d'instrument au milieu d'elle-même.
  **Chaîne interdite dans le panneau** (§9.1) et **question au propriétaire** (§13.7,
  avec la correction de la garde de périmètre, qui est un défaut **indépendant** de
  cette scène).
- **Le circuit accordé et la sélection de station, ÉCARTÉS par le rang.** C'est R5,
  après ; et c'est de l'algèbre ($C = 1/(4\pi^2f^2L)$), pas de la manipulation. La
  scène ne dessine **aucune antenne, aucune bobine, aucun condensateur variable**
  (§9.7).
- **La démodulation par multiplication (synchrone), ÉCARTÉE faute de source.** Aucune
  entrée de banque, aucune ligne de `lesson.md`, aucun `savoir_faire` ne l'emploie :
  les dix sujets démodulent tous par **détecteur de crête**. *Ce n'est pas une
  exclusion imprimée du cadre — c'est une frontière de scène, et elle est écrite comme
  telle* (§9.9).

---

## 3. Placement

**En tête de `## R3 — La condition de bonne modulation` (`lesson.md:111`)**, entre le
titre et le paragraphe d'annonce existant « *Pour que la modulation fonctionne
vraiment…* » (`lesson.md:113`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:banc-de-modulation]]
```

précédée d'un paragraphe d'annonce neuf et strictement neutre (§4.1).

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la
prose qui explique*). Vérification étape par étape :

| étape | la prose (ou l'item) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| S1 — lire $F$ et $f$ sur le quadrillage | **rien, nulle part** : le mot « oscilloscope » n'apparaît qu'une fois dans toute la leçon (`:101`, « *Si tu observais $s(t)$ à l'oscilloscope…* ») et aucune calibration n'y est jamais posée | — | ❌ non |
| S2 — $m$ par les extrema | **rien** : `lesson.md:135` donne $m = S_m/U_0$ **en R3, après** ; la forme graphique $(U_{max}-U_{min})/(U_{max}+U_{min})$ n'existe **nulle part** dans `lesson.md` ni dans `items.yaml` | R3, `:135` — **APRÈS** | ❌ non |
| S3 — surmodulation | `lesson.md:141` et `:157-161` | R3, **APRÈS** | ❌ non |
| S4 — la fenêtre du détecteur | R4 décrit le détecteur en mots ; le critère chiffré n'est **nulle part** | R4, `:179-185` — **APRÈS** | ❌ non |
| S5 — les trois conditions ensemble | le récapitulatif de R6 | R6, `:259-263` — **APRÈS** | ❌ non |

**Le seul placement qui laisse les cinq paris entiers est la tête de R3.**

**Trois tensions réelles, écrites plutôt que maquillées.**

1. **`cp-r2-porteuse-signal` (`lesson.md:107`) est AVANT le marqueur, et il répond
   déjà au distracteur A de S1.** Son choix juste dit « *L'information est portée par
   l'enveloppe $U_0 + s_m(t)$… La fréquence $f_p$ ne change jamais* ». Un élève qui
   vient de le faire ne choisira pas « le signal modulant est à 4,0 kHz ». **C'est
   assumé** : A est le distracteur le moins cher de S1 ; le mordant de S1 est dans **C
   et D**, qui sont des erreurs de **lecture** (demi-période, inversion
   oscillations/division) qu'aucun point d'arrêt ne sonde. *Et le balayage de
   `porteuse` qui suit la révélation donne à `cp-r2-porteuse-signal` sa preuve
   visuelle, qu'il n'avait pas.*
2. **Le marqueur coupe R3 avant son paragraphe d'annonce.** Ce paragraphe dit « *deux
   conditions doivent être respectées* » sans les nommer ; il reste **après** le
   marqueur, où il devient le résumé de ce que la scène vient de faire découvrir.
   *Si le propriétaire préfère un rung à part (« R2bis »), §13.4.*
3. **La consigne de S1 doit poser du vocabulaire que la prose n'a pas encore écrit** :
   multiplieur, entrées $E_1$/$E_2$, sortie, oscilloscope, division, sensibilité,
   renflement, resserrement. Même prix que le banc de diffraction (fente, écran,
   tache) et que les noyaux ($N_0$). Acceptable pour la même raison : ces mots sont
   **descriptifs** (ce qu'on voit sur la paillasse), pas **explicatifs** (pourquoi le
   tracé a cette forme). En revanche « taux de modulation », « surmodulation »,
   « détecteur de crête », « enveloppe fidèle » sont **explicatifs** : les consignes
   **ne les emploient pas** avant l'étape qui les construit (§7.6, `formule-graduee`).
   *Une exception nommée : le mot **enveloppe** est employé dès S1 — il est posé par
   R2 (`lesson.md:87`, `:101`) et par la figure `modulation-amplitude`, donc il est
   acquis, pas introduit.*

**Ce qui ne bouge pas :** `cp-r3-taux-modulation` (`:165`), `cp-r4-condensateur`
(`:197`), les six figures et le motion. La scène **n'en déplace aucun** et n'en modifie
aucun caractère.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

**Ce §4 décrit ; il ne rédige pas.** Chaque bloc porte son **ancre exacte**, son
**travail**, les **faits qu'il doit contenir**, ce qu'il **ne doit pas contenir**, et
une **longueur cible**. Les phrases finales sont de content-author.

**Interdit dans tout ce qui précède le marqueur :** rien qui réponde à un pari (§7.6).
4.1 est **avant** et strictement neutre ; 4.3 à 4.7 sont **après**.

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

*Ancre : après le titre `## R3 — La condition de bonne modulation` (`lesson.md:111`),
avant `Pour que la modulation fonctionne vraiment…` (`:113`).*

- **Travail :** présenter la paillasse et donner les seules données numériques dont S1
  a besoin, sans rien affirmer.
- **Doit contenir :** (a) qu'on va **voir** le signal du chapitre précédent, sur un
  écran, avant d'en tirer des conditions ; (b) le montage : un **multiplieur**, deux
  entrées — la tension à transmettre et la porteuse —, une sortie branchée sur un
  **oscilloscope** ; (c) la calibration qu'on va lire : **1,00 V par division**,
  **0,50 ms par division**, écran de **10 × 8 divisions** ; (d) l'annonce du geste :
  « tu paries d'abord, l'écran répond ensuite ».
- **Ne doit PAS contenir :** « taux de modulation », « $m$ », « $U_{max}$ »,
  « $U_{min}$ », « surmodulation », « détecteur », « diode », « $R_0C_0$ », ni aucune
  valeur de fréquence, ni « $f_p \gg f_{signal}$ ».
- **Longueur :** 60 à 90 mots.

### 4.2 Le marqueur

Seul sur sa ligne, immédiatement après 4.1.

### 4.3 Le cœur — « Le montage du TP : un multiplieur, et la forme que les sujets demandent » (APRÈS le marqueur)

*Nouvelle sous-section `###`, immédiatement après le marqueur, avant
`### Condition 1 : $f_p \gg f_{signal}$` (`:115`).*

**C'est le bloc qui arme la décision de propriétaire du §13.2.** Il n'efface aucune
phrase existante ; il en ajoute une couche.

- **Travail :** écrire le formalisme d'entrée de **5 des 7** entrées de banque et des
  **deux** exercices du sommet, qui est absent de `lesson.md`, `items.yaml` et
  `checkpoints.yaml` (`grep` « multiplieur » ⇒ **0**).
- **Doit contenir, dans cet ordre :**
  1. **Le montage.** Un circuit intégré **multiplieur** $(X)$, deux entrées, une
     sortie ; on applique $u(t) = U_0 + S_m\cos(2\pi f t)$ sur l'une et
     $p(t) = P_m\cos(2\pi F t)$ sur l'autre ; il délivre
     $u_S(t) = k\,u(t)\,p(t)$, avec $k$ une constante du composant. *Transcrit de
     `exercises.yaml:44` et `bank.yaml:907-915`.*
  2. **La mise en facteur, qui est tout le geste.**
     $$u_S(t) = k\,P_m\,U_0\left[1 + \frac{S_m}{U_0}\cos(2\pi f t)\right]\cos(2\pi F t)$$
     d'où $\boxed{A = k\,P_m\,U_0}$ et $\boxed{m = \dfrac{S_m}{U_0}}$. *Écrit
     identiquement à `exercises.yaml:56-63`, pour que le renvoi du sommet tombe juste
     au symbole près.*
  3. **LA PHRASE QUI DÉSAMORCE LE PIÈGE, et elle doit être explicite :** dans
     $m = S_m/U_0$, **$U_0$ est la composante continue de la tension MODULANTE**, pas
     l'amplitude de la porteuse. L'amplitude de la porteuse s'appelle $P_m$, elle
     n'entre jamais dans $m$, et elle n'entre dans $A$ que multipliée par $k$.
     **$A \neq U_0$**, sauf dans le cas d'école où $kP_m = 1$.
  4. **La réconciliation avec ce que R2 a écrit**, en deux lignes : la forme
     $s(t) = (U_0 + s_m(t))\cos(2\pi f_p t)$ du chapitre 3 est **le même signal**, écrit
     une fois que tout est regroupé ; elle correspond à $kP_m = 1$. **Le taux $m$ est
     le même dans les deux écritures**, parce qu'il compare toujours $S_m$ à la
     composante continue de la modulante.
  5. **La note de notation, une parenthèse :** les sujets n'échangent pas seulement les
     lettres, ils échangent les **entrées** — 2025 R met la modulante sur $E_1$ et la
     porteuse sur $E_2$ (`bank.yaml:907-909`), 2017 N et 2021 N font l'inverse
     (`exercises.yaml:44`, `bank.yaml:311-312`). Repérer **quelle tension porte la
     composante continue**, jamais le numéro de l'entrée.
- **Ne doit PAS contenir :** aucun schéma interne du multiplieur, aucun
  « amplificateur opérationnel », aucun « transistor » (exclusion du cadre) ; aucun
  spectre ; aucune valeur de $F_p$ empruntée à 2017 N.
- **Longueur :** 200 à 260 mots, équations comprises.

### 4.4 « Condition 2 » gagne sa lecture graphique

*Ancre : dans `### Condition 2 : le taux de modulation $m < 1$`, **après**
$$m = \frac{S_m}{U_0}$$ (`lesson.md:135`) et **avant** « La condition $S_m < U_0$ se
réécrit… » (`:137`).*

- **Travail :** rendre exploitable le geste que **cinq** entrées de banque exigent et
  que `lesson.md` n'écrit nulle part.
- **Doit contenir :** (a) sur un oscillogramme on ne lit ni $S_m$ ni $U_0$ : on lit
  **deux hauteurs de crête**, $U_{max}$ au renflement et $U_{min}$ au resserrement ;
  (b) comme $U_{max} = A(1+m)$ et $U_{min} = A(1-m)$, leur **somme** élimine $m$ et
  leur **différence sur leur somme** élimine $A$ :
  $$A = \frac{U_{max}+U_{min}}{2} \qquad m = \frac{U_{max}-U_{min}}{U_{max}+U_{min}}$$
  (c) **le contrôle qui fait gagner du temps le jour de l'examen** : $m$ est un
  **rapport**, donc il se calcule **directement en divisions**, sans jamais convertir
  en volts — c'est le piège que `bank.yaml:1259` nomme ; (d) une phrase sur la limite
  de la méthode : dès que $m \ge 1$, l'enveloppe **touche zéro**, $U_{min}$ vaut $0$, et
  la formule rend **exactement 1,00** quel que soit le vrai $m$ — c'est pourquoi les
  sujets demandent alors de **conclure sur la qualité**, pas de mesurer un nombre.
- **Longueur :** 140 à 180 mots.

### 4.5 R4 gagne le critère chiffré du détecteur — la dette de `bk-2025-n-x3`

*Ancre : dans `### Le principe : ne garder que l'enveloppe`, **après** la troisième
puce (« *Le résultat : la tension aux bornes du condensateur monte en flèche…* »,
`lesson.md:183`) et **avant** « Il ne reste plus qu'à retirer la composante
continue… » (`:185`).*

- **Travail :** écrire la double inégalité que 2025 N q3-3 exige de vérifier
  numériquement et que le rung ne formule jamais (drapeau `bank.yaml:794-806`).
- **Doit contenir :** (a) les **deux** exigences, chacune avec l'échec qu'elle évite —
  la décharge doit être **lente devant la période de la porteuse** ($R_0C_0 \gg 1/F$),
  sinon le condensateur se vide entre deux sommets et **retombe sur la porteuse** ; et
  **rapide devant la période du signal** ($R_0C_0 \ll 1/f$), sinon elle **rate la
  descente** de l'enveloppe et s'en va tout droit ; (b) la forme compacte, écrite
  **une fois avec les deux notations** que les sujets emploient :
  $$\frac{1}{F} \ll R_0C_0 \ll \frac{1}{f} \qquad\text{c'est-à-dire}\qquad T_p \ll R_0C_0 \ll T_s$$
  (c) **le contrôle numérique sur les valeurs du banc ci-dessus** (jamais sur celles
  d'un sujet, qui doivent rester à trouver) : $1/F = 0{,}125$ ms, $R_0C_0 = 0{,}50$ ms,
  $1/f = 2{,}50$ ms — quatre fois l'une, cinq fois moins que l'autre ; (d) la
  conséquence que la scène fait découvrir et que rien n'écrit : **la fenêtre n'existe
  que si $F \gg f$**. Si la porteuse n'est que trois fois plus rapide que le signal,
  il n'y a **aucune** valeur de $R_0C_0$ qui convienne — la condition 1 n'est pas un
  confort de lisibilité, c'est ce qui **ouvre** la fenêtre du détecteur.
- **Ne doit PAS contenir :** aucune fréquence de coupure, aucun décibel, aucun gain,
  aucune fonction de transfert, aucun pourcentage d'ondulation (`limites` du cadre,
  §1) ; aucune reprise des nombres de 2025 N ($162$ kHz, $5$ kHz, $1{,}5$ kΩ,
  $1\ \mu$F) — ils sont la réponse d'une carte de banque.
- **Longueur :** 160 à 200 mots.

### 4.6 Deux puces au récapitulatif (R6)

*Ancre : `lesson.md:259-263`, « Récapitulatif express ».*

- **Après la puce sur la bonne modulation (`:261`)**, ajouter une puce portant la
  **lecture graphique** : sur un oscillogramme, $A = (U_{max}+U_{min})/2$ et
  $m = (U_{max}-U_{min})/(U_{max}+U_{min})$, lisibles **en divisions**, sans convertir ;
  et le signe visible de la surmodulation, l'enveloppe qui **touche l'axe**.
- **Après la puce sur la démodulation (`:262`)**, ajouter une puce portant la **double
  inégalité** $1/F \ll R_0C_0 \ll 1/f$ et ses deux échecs nommés (« suit la
  porteuse » / « rate la descente »).
- *Ne pas toucher aux cinq puces existantes.*

### 4.7 Aucun nouveau point d'arrêt, et une légende laissée intacte

- **(a) Aucun `[[checkpoint:]]` neuf.** Les **cinq paris** de la scène jouent le rôle
  de porte d'engagement dans R3 ; `checkpoints.yaml` n'est pas touché. *§13.13 si le
  propriétaire veut une porte écrite en plus.*
- **(b) `media/detecteur-crete.stages.json` ne bouge pas.** Sa légende d'étape 3
  (« charge rapide / décharge lente ») reste **qualitative** : c'est la prose du §4.5
  qui porte le critère, pas la figure. *§13.11.*
- **(c) Les notes de bas de figure de `modulation-amplitude.svg` et de
  `bonne-surmodulation.svg` restent non chiffrées — et c'est une dette, pas un
  choix.** Elles disent « rapport réduit ici pour la lisibilité » sans donner 6 ni 4
  (§2.1). La scène, elle, **déclare son rapport à l'écran** (§10.1). *Aligner les deux
  figures est une retouche à commander séparément : §13.10.*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 L'écran — et pourquoi quatre sous-graduations, pas cinq

| grandeur | valeur | d'où elle vient |
|---|---|---|
| largeur de l'écran | **10 divisions** | 2021 N, figure 6 : « quadrillage de **10 divisions en largeur** et 8 divisions en hauteur » (`bank.yaml:320`) |
| hauteur de l'écran | **8 divisions**, axe des temps sur la ligne médiane (±4 div) | même figure ; idem 2023 N (`bank.yaml:548`) |
| sensibilité verticale | **1,00 V/div** | 2021 N (`bank.yaml:316`) **et** 2015 N (`bank.yaml:1227` : « 1 V/div et 0,5 ms/div ») |
| balayage horizontal | **0,50 ms/div** | 2015 N, même ligne |
| durée affichée | $10 \times 0{,}50 = \mathbf{5{,}00\ \text{ms}}$ | déduit |
| pleine échelle verticale | $\pm 4{,}00$ V | déduit |
| **sous-graduations** | **4 par division** — soit **0,25 V** et **0,125 ms** | **choix pédagogique, voir ci-dessous** |

> **Les quatre sous-graduations sont une décision d'honnêteté, pas une convention.**
> Un oscilloscope réel en porte **cinq** (0,20 div). Or les neuf couples
> $(U_{max}, U_{min})$ que la scène peut afficher valent 1,50 · 2,00 · 2,50 · 3,00 ·
> 3,50 V et 0,00 · 0,50 · 1,00 · 1,50 V : à cinq sous-graduations, **1,50 ; 2,50 ;
> 3,50 et 0,50 tombent ENTRE deux traits**, et l'élève lirait un « presque » que la
> scène appellerait une mesure. À **quatre**, les neuf couples tombent **exactement**
> sur un trait. C'est le précédent de la sphère (ADR 0041, addendum du 2026-09-23 :
> le pas de 0,1 pour que $d = R$ soit atteint EXACTEMENT) et celui de l'orbite
> (la précision d'affichage est un choix pédagogique). *L'écart à la convention des
> oscilloscopes réels est déclaré au §10.6 ; la porte vérifie les quatre traits.*

### 5.2 Le modèle — cinq lignes, et rien d'autre

**Les deux entrées du multiplieur :**

$$u(t) = U_0 + S_m\sin(2\pi f t) \qquad\qquad p(t) = P_m\cos(2\pi F t)$$

**La sortie :**

$$u_S(t) = k\,u(t)\,p(t) = A\big[1 + m\sin(2\pi f t)\big]\cos(2\pi F t)
\qquad A = k\,P_m\,U_0 \qquad m = \frac{S_m}{U_0}$$

**L'enveloppe** — la courbe que les crêtes touchent, et la seule chose que la scène
*lit* :

$$E(t) = A\,\big|\,1 + m\sin(2\pi f t)\,\big|$$

**Le détecteur de crête** (diode idéale + $R_0$ en parallèle avec $C_0$), posé comme
une **récurrence exacte sur les instants de crête** $t_n = n\,T_p$, $T_p = 1/F$ :

$$u_C(t_{n+1}) = \max\Big(E(t_{n+1})\,,\ u_C(t_n)\,e^{-T_p/\tau}\Big)
\qquad \tau = R_0\,C_0$$

**entre deux crêtes**, $u_C$ décroît exponentiellement de $u_C(t_n)$ vers $t_{n+1}$.

> **Pourquoi cette écriture, et ce qu'elle achète à la porte.** Un détecteur simulé
> par intégration pas à pas serait une SIMULATION : la porte ne pourrait en établir
> que des invariants (règle de la cuve). Écrit en **récurrence fermée sur les instants
> de crête**, il est **analytique** : une seconde implémentation, écrite depuis cette
> spec seule, retrouve **le même nombre** à $10^{-12}$ près. La porte refait donc les
> NOMBRES (règle de la corde, ADR 0041, addendum du 2026-09-24 après-midi, point 1).

**Le sinus plutôt que le cosinus, déclaré :** les sujets écrivent $\cos$. Écrire
$\sin$ n'est qu'un **décalage de l'origine des temps**, choisi pour une seule raison
mesurée : il place les **quatre** extrema d'enveloppe à **1,25 · 3,75 · 6,25 ·
8,75 divisions**, tous à l'intérieur du cadre, au lieu d'en coller deux sur les bords.
$A$, $m$, $F$, $f$, $U_{max}$, $U_{min}$ et toutes les lectures sont **identiques**.
*Déclaré au §10.7 ; la porte vérifie les quatre positions.*

**Le régime établi du détecteur, déclaré :** la récurrence est amorcée **une période
d'enveloppe complète avant le bord gauche de l'écran** ($u_C = E$ à l'amorçage), pour
que le tracé affiché soit en régime établi et ne porte aucun transitoire d'allumage.
La porte refait l'amorçage à l'identique.

### 5.3 Les constantes — d'où vient chaque nombre

| grandeur | valeur | d'où elle vient |
|---|---|---|
| $f$, fréquence du signal modulant | **400 Hz**, **fixe** | choisie : c'est la seule valeur telle que $T_{env} = 2{,}50$ ms $= \mathbf{5{,}00}$ divisions exactement, soit **deux périodes pleines** sur l'écran de 10 divisions. Ordre de grandeur des sujets : 100 Hz (2017 N) · 125 Hz (2021 N) · 200 Hz (2023 N) · 250 Hz (2015 N) |
| $P_m$, amplitude de la porteuse | **2,00 V** | choisie ; **jamais donnée par un sujet** (le rapport des extrema l'élimine) — §10.8 |
| $k$, constante du multiplieur | **0,250 V⁻¹** | choisie de sorte que $k\,P_m = \mathbf{0{,}500}$ : c'est **le seul réglage qui rend $A \neq U_0$ tout en gardant les neuf couples d'extrema sur des demi-divisions** (§5.1). *Sans lui, $A = U_0$ et le piège du §4.3 se referme tout seul.* |
| $C_0$, condensateur du détecteur | **100 nF** $= 1{,}00\times10^{-7}$ F | choisie : avec les cinq crans de rhéostat, elle donne cinq constantes de temps rondes (§5.5). Ordre de grandeur d'un détecteur réel |
| $F$, fréquence de la porteuse | **1,2 · 2,4 · 4,0 · 8,0 kHz** (contrôle) | choisies pour que **le nombre d'oscillations sur l'écran soit un ENTIER** (6 · 12 · 20 · 40) — c'est la méthode de comptage des sujets (2025 R : « 13 crêtes sur 12 carreaux » ; 2023 N : « comptage des sommets sur l'ensemble du tracé »). **2,0 kHz est écarté EXPRÈS** : c'est la valeur en litige du sujet 2017 N (BLOQUANT, §0.1) |
| $U_0$, composante continue | **2,0 · 3,0 · 4,0 V** (contrôle) | choisies ; **4,0 V est la valeur de 2023 N** (`bank.yaml:593` : $U_0 = (6+2)/2 = 4$ V) |
| $S_m$, amplitude de la modulante | **1,0 · 2,0 · 3,0 V** (contrôle) | choisies ; le couple $(4{,}0\ ;\ 2{,}0)$ donne $U_{max} = 3{,}00$ V et $U_{min} = 1{,}00$ V, soit **exactement les extrema confirmés de 2017 N** (`REVIEW-2026-09-12` : « 2,989 V et 0,986 V mesurés ») et $m = 0{,}50$, **le $m$ de 2017 N ET de 2023 N** |
| $R_0$, rhéostat du détecteur | **0,5 · 2,0 · 5,0 · 10 · 25 kΩ** (contrôle) | choisies pour donner des $\tau$ ronds ; **le rhéostat $R$ en parallèle sur $C_0$ est exactement la figure 4 de 2025 N** (`bank.yaml:814` : « de $B$, un rhéostat $R$ descend vers la masse $M$ … le condensateur $C_0$ descend également vers $M$ ») |

**Bornage des crans, et pourquoi** (précédent : le champ magnétique borné à 3,0 mT,
ADR 0041 — *on borne le réglage plutôt que de plafonner ce qu'on dessine, parce qu'un
tracé plafonné mentirait à son plafond*) : le pire couple est
$(U_0 = 4{,}0\ ;\ S_m = 3{,}0)$, qui donne $U_{max} = 0{,}500 \times 7{,}0 =
\mathbf{3{,}50}$ V $= 3{,}50$ divisions — **une demi-division sous le bord du cadre**.
Aucun réglage de la scène ne peut faire sortir le tracé de l'écran, et **la porte le
mesure aux neuf couples**.

### 5.4 La table des extrema — **toute l'arithmétique de la scène, vérifiée**

$U_{max} = k P_m\,(U_0 + S_m) = 0{,}500\,(U_0+S_m)$ ·
$U_{min} = k P_m\,|U_0 - S_m| = 0{,}500\,|U_0-S_m|$ **si $m < 1$, et $0$ si $m \ge 1$**
(l'enveloppe traverse zéro) · $A = 0{,}500\,U_0$ ·
$m = S_m/U_0$ · $m_{lu} = \dfrac{U_{max}-U_{min}}{U_{max}+U_{min}}$.

| $U_0$ (V) | $S_m$ (V) | $A$ (V) | $U_{max}$ (V = div) | $U_{min}$ (V = div) | $m = S_m/U_0$ | $m_{lu}$ |
|---|---|---|---|---|---|---|
| 2,0 | 1,0 | 1,00 | **1,50** | **0,50** | 0,50 | 0,50 |
| 2,0 | 2,0 | 1,00 | **2,00** | **0,00** | **1,00** | 1,00 |
| 2,0 | 3,0 | 1,00 | **2,50** | **0,00** | **1,50** | **1,00** |
| 3,0 | 1,0 | 1,50 | **2,00** | **1,00** | 0,33 | 0,33 |
| 3,0 | 2,0 | 1,50 | **2,50** | **0,50** | 0,67 | 0,67 |
| 3,0 | 3,0 | 1,50 | **3,00** | **0,00** | **1,00** | 1,00 |
| 4,0 | 1,0 | 2,00 | **2,50** | **1,50** | 0,25 | 0,25 |
| **4,0** | **2,0** | **2,00** | **3,00** | **1,00** | **0,50** | **0,50** |
| 4,0 | 3,0 | 2,00 | **3,50** | **0,50** | 0,75 | 0,75 |

*Vérifications, une par ligne critique.*
$0{,}500\times(4{,}0+2{,}0) = 3{,}00$ ✓ et $0{,}500\times(4{,}0-2{,}0) = 1{,}00$ ✓ —
**c'est le couple 3 V / 1 V de 2017 N**, et $(3-1)/(3+1) = 0{,}50 = 2/4$ ✓
(`exercises.yaml:85`) ·
$0{,}500\times7{,}0 = 3{,}50$ ✓, $0{,}500\times1{,}0 = 0{,}50$ ✓,
$(3{,}5-0{,}5)/(3{,}5+0{,}5) = 3/4 = 0{,}75 = 3/4$ ✓ ·
$0{,}500\times5{,}0 = 2{,}50$ ✓ et $m = 3/2 = 1{,}50$, mais
$m_{lu} = (2{,}5-0)/(2{,}5+0) = \mathbf{1{,}00}$ ✗ **— la saturation, §5.6** ·
$A = 0{,}500\times4{,}0 = 2{,}00$ V contre $U_0 = 4{,}0$ V : **$A$ vaut la moitié de
$U_0$, et c'est visible sur le premier écran** (§4.3).

**Les neuf couples tombent tous sur un trait de la grille** (pas de 0,25 V) :
1,50 = 6 traits · 2,00 = 8 · 2,50 = 10 · 3,00 = 12 · 3,50 = 14 · 0,00 = 0 ·
0,50 = 2 · 1,00 = 4 ✓.

**Les valeurs de $m$ atteignables : 0,25 · 0,33 · 0,50 · 0,67 · 0,75 · 1,00 · 1,50** —
sept, dont **deux à la frontière exacte** ($m = 1{,}00$, atteint par deux couples
différents) et **une au-delà**. *À comparer aux $m$ des dix entrées de banque :
0,33 · 0,50 · 0,50 · 0,60 · 0,67 — **tous inférieurs à 1** (§10.5).*

### 5.5 La table du temps — **l'autre moitié de l'arithmétique**

$T_{env} = 1/f = 1/400 = 2{,}500$ ms $= \mathbf{5{,}00}$ divisions. Sur les
10 divisions de l'écran : **deux périodes pleines**.

**Positions des extrema d'enveloppe** (avec le $\sin$ du §5.2) : maxima à
$T_{env}/4 = 0{,}625$ ms et $3{,}125$ ms, soit **1,25 div** et **6,25 div** ; minima à
$1{,}875$ ms et $4{,}375$ ms, soit **3,75 div** et **8,75 div**. *Écart entre deux
extrema de même type : **5,00 div** ✓. Écart max→min : **2,50 div** — c'est le piège
de la demi-période, et il est atteignable.* Les quatre tombent sur un trait fin
(0,125 ms) : 10 · 30 · 50 · 70 sous-graduations ✓.

| `porteuse` $F$ | $T_p = 1/F$ | $T_p$ en div | **oscillations sur les 10 div** | par période d'enveloppe | $F/f$ |
|---|---|---|---|---|---|
| **1,2 kHz** | 0,833 ms | 1,667 | **6** | 3 | **3** |
| **2,4 kHz** | 0,417 ms | 0,833 | **12** | 6 | **6** |
| **4,0 kHz** | **0,250 ms** | **0,500** | **20** | 10 | **10** |
| **8,0 kHz** | **0,125 ms** | **0,250** | **40** | 20 | **20** |

*Vérifications :* $1{,}2\times5{,}00 = 6$ ✓ · $2{,}4\times5 = 12$ ✓ ·
$4{,}0\times5 = 20$ ✓ · $8{,}0\times5 = 40$ ✓ ; $1/1200 = 8{,}33\times10^{-4}$ s ✓ ;
$1200/400 = 3$ ✓, $8000/400 = 20$ ✓. *À 8,0 kHz, $T_p = 0{,}125$ ms vaut **exactement
une sous-graduation** ✓.*

**La chaîne de lecture de S1, à $F = 4{,}0$ kHz** — celle que la porte refait :

$$T_p = \frac{10\ \text{div} \times 0{,}50\ \text{ms/div}}{20\ \text{oscillations}} = 0{,}250\ \text{ms}
\quad\Longrightarrow\quad F = \frac{1}{0{,}250\times10^{-3}} = \mathbf{4{,}00\ \text{kHz}}$$

$$T_{env} = 5{,}00\ \text{div} \times 0{,}50\ \text{ms/div} = 2{,}50\ \text{ms}
\quad\Longrightarrow\quad f = \frac{1}{2{,}50\times10^{-3}} = \mathbf{400\ \text{Hz}}$$

*Les deux pièges chiffrés que S1 met dans ses distracteurs :* la demi-période,
$2{,}50\ \text{div} \times 0{,}50 = 1{,}25$ ms $\Rightarrow$ **800 Hz** ✓ ; et
l'inversion oscillations/division, « 2 oscillations par division donc $T_p = 2$
divisions » $= 1{,}00$ ms $\Rightarrow$ **1,00 kHz** ✓.

### 5.6 La saturation de la lecture graphique — le fait exact de S3

Dès que $m \ge 1$, $1 + m\sin(2\pi ft)$ **change de signe** : l'enveloppe
$E = A|1+m\sin|$ **touche zéro** deux fois par période, et entre les deux zéros elle
remonte à un **petit maximum secondaire** de hauteur $A\,(m-1)$, sous lequel
l'oscillation rapide est **en opposition de phase** (c'est le pincement que
`bonne-surmodulation.svg` dessine déjà, l. 39-51).

**Au réglage $U_0 = 2{,}0$ V, $S_m = 3{,}0$ V ($m = 1{,}50$, $A = 1{,}00$ V) :**

| grandeur | valeur | vérification |
|---|---|---|
| $U_{max} = A(1+m)$ | **2,50 V** = 2,50 div | $1{,}00\times2{,}50$ ✓ |
| $U_{min}$ lu sur l'écran | **0,00 V** | l'enveloppe traverse zéro ✓ |
| bosse secondaire $A(m-1)$ | **0,50 V** = 0,50 div | $1{,}00\times0{,}50$ ✓ |
| zéros de l'enveloppe | $\sin(2\pi ft) = -1/m = -0{,}667$ | $t = 1{,}540$ ms et $2{,}210$ ms → **3,08 div** et **4,42 div** (puis 8,06 et 9,42 div) ✓ |
| $m_{lu} = \dfrac{U_{max}-U_{min}}{U_{max}+U_{min}}$ | $\dfrac{2{,}50-0}{2{,}50+0} = \mathbf{1{,}00}$ | **la lecture graphique SATURE** |

*Vérification des zéros :* $\arcsin(0{,}6667) = 0{,}7297$ rad ;
$2\pi f t = \pi + 0{,}7297 = 3{,}8713 \Rightarrow t = 1{,}5403$ ms $\Rightarrow$
3,081 div ✓ ; $2\pi f t = 2\pi - 0{,}7297 = 5{,}5535 \Rightarrow t = 2{,}2096$ ms
$\Rightarrow$ 4,419 div ✓. **Le pincement mesure 1,34 division** et tombe en plein
milieu de l'écran : visible aux deux largeurs.

> **C'est un fait, pas une astuce, et il doit être DIT.** La lecture par les extrema
> ne peut **jamais** rendre plus que 1,00 ; elle vaut exactement 1,00 **à la
> frontière** ($m = 1$) **et au-delà**. C'est pourquoi les sujets, dès qu'ils
> soupçonnent la surmodulation, demandent de **conclure sur la qualité** et non de
> mesurer un nombre — et pourquoi le signe à chercher est **l'enveloppe qui touche
> l'axe** (`bank.yaml:999` : « *si $m$ avait atteint ou dépassé 1, l'enveloppe
> inférieure aurait touché ou franchi l'axe $u_S = 0$, signe visible de
> surmodulation* »). La scène affiche donc **les deux lectures côte à côte** à S3 :
> `taux-lu` = 1,00 et `taux-regle` = 1,50.

### 5.7 La table du détecteur — les cinq régimes, vérifiés

$\tau = R_0\,C_0$ avec $C_0 = 100$ nF. Le facteur de décroissance entre deux crêtes
est $e^{-T_p/\tau}$.

**À $F = 8{,}0$ kHz ($T_p = 0{,}125$ ms), $U_0 = 4{,}0$ V, $S_m = 2{,}0$ V ($m = 0{,}50$, $A = 2{,}00$ V) :**

| `detecteur` $R_0$ | $\tau = R_0C_0$ | $T_p/\tau$ | $e^{-T_p/\tau}$ | chute entre deux crêtes | ce qu'on voit |
|---|---|---|---|---|---|
| **0,5 kΩ** | **0,0500 ms** | 2,500 | 0,0821 | **91,8 %** | **le tracé retombe sur la porteuse** : $\tau < T_p$, le condensateur se vide entre deux sommets |
| **2,0 kΩ** | **0,200 ms** | 0,625 | 0,5353 | 46,5 % | dents de scie profondes ; l'enveloppe se devine, mal |
| **5,0 kΩ** | **0,500 ms** | 0,250 | 0,7788 | 22,1 % | **le tracé épouse l'enveloppe** en dents de scie fines |
| **10 kΩ** | **1,00 ms** | 0,125 | 0,8825 | 11,8 % | **il rate la descente** : il s'en va presque tout droit |
| **25 kΩ** | **2,50 ms** | 0,050 | 0,9512 | 4,9 % | il rate franchement la descente et rattrape au creux suivant |

*Vérifications :* $500\times10^{-7} = 5{,}00\times10^{-5}$ s ✓ ·
$5000\times10^{-7} = 5{,}00\times10^{-4}$ s ✓ · $2{,}5\times10^{4}\times10^{-7} =
2{,}50\times10^{-3}$ s ✓ ; $e^{-2{,}5} = 0{,}08208$ ✓, $e^{-0{,}625} = 0{,}53526$ ✓,
$e^{-0{,}25} = 0{,}77880$ ✓, $e^{-0{,}125} = 0{,}88250$ ✓, $e^{-0{,}05} = 0{,}95123$ ✓.

**La fenêtre que la scène AFFICHE** (celle des sujets), à $F = 8{,}0$ kHz :

$$\frac{1}{F} = 0{,}125\ \text{ms} \quad\ll\quad R_0C_0 \quad\ll\quad \frac{1}{f} = 2{,}50\ \text{ms}$$

$R_0C_0 = 0{,}500$ ms est **4 fois** la borne de gauche et **5 fois moins** que celle
de droite : c'est le seul cran qui tient les deux.

**Et à $F = 1{,}2$ kHz — l'argument de S5 :** $1/F = 0{,}833$ ms et $1/f = 2{,}50$ ms.
**Entre les deux, il n'y a qu'un facteur 3 : il n'y a pas de place pour un
« $\ll \dots \ll$ ».** Les cinq crans, à cette porteuse :

| $R_0$ | $\tau$ | contre $1/F = 0{,}833$ ms | contre $1/f = 2{,}50$ ms | verdict |
|---|---|---|---|---|
| 0,5 kΩ | 0,0500 ms | **16 fois plus PETIT** ✗ | — | suit la porteuse |
| 2,0 kΩ | 0,200 ms | 4 fois plus petit ✗ | — | suit la porteuse |
| 5,0 kΩ | 0,500 ms | encore plus petit ✗ | — | suit la porteuse |
| 10 kΩ | 1,00 ms | à peine 1,2 fois plus grand ✗ | 2,5 fois plus petit ✗ | rate la descente **et** ondule |
| 25 kΩ | 2,50 ms | 3 fois plus grand (à peine) | **égal** ✗ | rate la descente |

**Aucun réglage ne convient.** C'est la découverte de S5, et c'est ce qui relie la
condition 1 à la démodulation : *$F \gg f$ n'est pas un confort de lisibilité, c'est
ce qui OUVRE la fenêtre du détecteur.* Rien, dans `lesson.md`, dans `items.yaml` ni
dans les dix entrées de banque, ne fait ce lien.

### 5.8 Contrôles (4) — un neuf par étape, **un seul ouvert par étape**

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `porteuse` | $F$, la fréquence de la porteuse | **1,2 · 2,4 · 4,0 · 8,0** kHz | **S1**, S5 |
| `modulante` | $S_m$, l'amplitude du signal à transmettre | **1,0 · 2,0 · 3,0** V | **S2**, S5 |
| `continue` | $U_0$, la composante continue de l'entrée modulante | **2,0 · 3,0 · 4,0** V | **S3**, S5 |
| `detecteur` | $R_0$, le rhéostat du détecteur de crête ($C_0 = 100$ nF, fixe) | **0,5 · 2,0 · 5,0 · 10 · 25** kΩ | **S4**, S5 |

**Des crans, pas des curseurs continus**, et c'est délibéré : sur une paillasse, un
GBF se règle sur des valeurs affichées et un rhéostat a des repères ; surtout, **les
neuf couples d'extrema et les quatre comptages d'oscillations ne sont exacts que sur
des valeurs choisies** (§5.1, §5.5). *Deux crans voisins n'affichent jamais la même
valeur de $m$, de $F$ ni de $\tau$ — le défaut de l'orbite (« douze positions
affichant 24,0 h ») ne peut pas se reproduire.*

### 5.9 État (6 clés)

`F_khz`, `Sm_v`, `U0_v`, `R0_kohm` — les quatre que les contrôles règlent — plus
**deux clés posées par l'étape, sans contrôle** (précédents : `vue` et `reference` au
banc de diffraction, `support` dans les noyaux) :

- **`sortie`** (`modulee` | `modulee-et-detectee`) décide si **l'étage de détection
  existe** : le schéma de la diode, de $R_0$ et de $C_0$ dans le montage, **et** le
  second tracé $u_C(t)$ sur l'écran. Il ne vaut `modulee-et-detectee` qu'**à partir
  de la révélation de S4**. *C'est un outil de non-fuite : on ne peut pas répondre au
  pari du détecteur depuis une étape où le détecteur n'existe pas dans le DOM.*
- **`reference`** (`aucune` | `depart`) décide si l'**enveloppe du réglage initial de
  l'étape** reste dessinée, à l'encre, en trait interrompu, à côté de l'enveloppe
  courante. Employé à **S3** seulement, pour rendre visible le « avant / après » du
  passage $U_0 : 4{,}0 \to 2{,}0$ V. *Avant le pari, la référence coïncide avec le
  réglage courant : elle ne révèle rien.*

$P_m$, $k$, $C_0$ et $f$ sont des **constantes du modèle**, pas des clés d'état :
aucun contrôle ne les atteint. $f$ et $C_0$ sont **affichés** (ce sont des données
d'énoncé) ; $P_m$ et $k$ sont affichés **une fois**, dans la légende du montage
(§10.8).

### 5.10 Lectures — définitions exactes, unité, précision

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `calibration` | « 1,00 V/div · 0,50 ms/div · 10 × 8 divisions » | — | — | **l'énoncé** : visible à toutes les étapes, avant tout pari |
| `comptage-porteuse` | « **N** oscillations complètes sur les 10 divisions » | — | entier | 6 · 12 · 20 · 40 ; c'est la méthode de 2025 R et de 2023 N |
| `porteuse-lue` | $T_p$ puis $F$ | ms / kHz | 3 c.s. | 0,833 / 0,417 / 0,250 / 0,125 ms ; 1,20 / 2,40 / 4,00 / 8,00 kHz |
| `signal-lu` | $T_{env}$ (div → ms) puis $f$ | div / ms / Hz | 3 c.s. | 5,00 div → 2,50 ms → 400 Hz |
| `rapport-frequences` | $F/f$ | — | entier | 3 · 6 · 10 · 20 |
| `extrema` | $U_{max}$ et $U_{min}$, **en divisions PUIS en volts** | div / V | 2 déc. | le geste des sujets : compter des carreaux, puis convertir — et voir que $m$ n'a pas besoin de la conversion |
| `amplitude-a` | $A = \dfrac{U_{max}+U_{min}}{2}$ | V | 2 déc. | 1,00 · 1,50 · 2,00 ; **à côté de `entrees`, pour que $A \neq U_0$ se voie** |
| `taux-lu` | $m_{lu} = \dfrac{U_{max}-U_{min}}{U_{max}+U_{min}}$ | — | **2 déc.** | 0,25 → 1,00 ; deux décimales parce que 0,33 et 0,67 doivent se distinguer de 0,25 et 0,75 |
| `entrees` | $U_0$ et $S_m$ | V | 1 déc. | les deux réglages, rappelés pour fermer la chaîne |
| `taux-regle` | $m = \dfrac{S_m}{U_0}$ | — | 2 déc. | **à côté de `taux-lu`** : identiques si $m<1$, divergents si $m \ge 1$ (§5.6) |
| `constante-temps` | $R_0 C_0$, avec $R_0$ et $C_0$ écrits | ms | 3 c.s. | 0,0500 · 0,200 · 0,500 · 1,00 · 2,50 |
| `fenetre` | la chaîne « $1/F$ · $R_0C_0$ · $1/f$ », les trois durées alignées | ms | 3 c.s. | **exactement la comparaison de 2025 N q3-3** ; aucun verdict n'est écrit — c'est l'élève qui conclut |

> **Ce que la scène n'affiche JAMAIS comme lecture :** aucun verdict
> « bonne/mauvaise modulation », aucun verdict « bonne/mauvaise démodulation », aucun
> pourcentage d'ondulation, aucune fréquence de coupure. Les verdicts appartiennent
> aux **retours de pari** (où ils sont argumentés) et à l'élève. *Deux raisons : la
> `limite` du cadre (traitement qualitatif et fonctionnel, §1) et le fait que la
> frontière exacte du décrochage dépend de $m$ (§10.5) — une pastille « bon/mauvais »
> mentirait aux réglages marginaux de l'étape libre.*

---

## 6. Pas de temps, pas de course — et la langue visuelle

- **Aucun temps, aucune course.** `temps: false`, **pas de clé `course`** : un
  oscilloscope en régime établi ne « démarre » pas, et animer un balayage serait du
  mouvement décoratif (DESIGN-BIBLE §5 : *motion serves comprehension, never
  decoration*). Les cinq verdicts sont **immédiats** ; puis le contrôle de l'étape
  s'ouvre. *(Même régime que la sphère, le produit vectoriel et le banc de
  diffraction. `validate-content` interdit `revele_apres_h > 0` sur une scène sans
  temps ; aucun `revele_apres_course` non plus.)*
- **Rien ne bouge qui n'ait été réglé.** Aucune boucle de rendu : on redessine quand
  un contrôle change ou qu'un pari est révélé, jamais autrement (ADR 0041 §4).
- **Le critère des éclairs (WCAG 2.3.1) est structurellement satisfait — et mesuré
  quand même.** Rien ne clignote, rien ne défile, aucune paire de variations opposées
  n'existe dans le temps. *Une chose n'est prouvée absente que si l'on a énuméré ses
  formes* (ADR 0036) : la porte le mesure (§11.4, `immobile`), **attendu
  structurellement vide**. *C'est une différence nette avec la cuve à ondes, dont
  l'onde animée à 40 Hz avait fait rougir cette famille sur 63 % de l'écran : ici il
  n'y a pas d'animation, et le tracé dense de 40 oscillations est un motif **fixe**,
  qui relève de la lisibilité (§15.2), pas du critère des éclairs.*
- **Mouvement réduit** : il n'y a rien à honorer ; la famille `immobile` vérifie
  qu'aucune transition n'est introduite.
- **Aucune trace entre étapes** : chaque étape repart de son état déclaré.

**La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4).**

- **À l'ENCRE — c'est l'ÉNONCÉ** : le montage (le rectangle « X » du multiplieur, ses
  deux entrées nommées, sa sortie, le fil vers l'oscilloscope, la masse) ; le
  **cadre de l'écran, son quadrillage et ses sous-graduations** ; les deux **axes**
  médians ; les **étiquettes de calibration** ; le **tracé $u_S(t)$** (encre douce) ;
  le **tracé $u_C(t)$ du détecteur** quand il existe (encre pleine, plus appuyée) ;
  l'**enveloppe de référence** (`reference: depart`) en trait interrompu.
  *Corollaire du manège : une donnée de l'énoncé ne se peint jamais dans la couleur de
  la réponse — sans quoi « aucun pixel d'accent avant le pari » devient intenable.*
- **À l'ACCENT — et seulement après la révélation** : la **double flèche** entre deux
  extrema d'enveloppe de même type et sa cote ; le **crochet** qui compte les
  oscillations de porteuse ; les **deux traits horizontaux** à $U_{max}$ et $U_{min}$
  avec leur cote ; les **marqueurs de pincement** (les deux points où l'enveloppe
  touche l'axe) et la **bosse retournée** entourée ; le **repère de décrochage** sur la
  courbe du détecteur (« ici elle ne suit plus »).
- **Deux tracés, deux épaisseurs, une seule encre.** $u_S$ en **encre douce, trait
  fin** ; $u_C$ en **encre, trait épais**. Ils ne sont **jamais** distingués par la
  couleur (l'accent marque une seule chose : la réponse), et leurs noms — « $u_S$ » et
  « $u_C$ » — sont posés par `disposer`, jamais par `poser` (§11.4, `etiquettes`).
  *C'est le point de rendu le plus fragile de cette scène, et il est signalé comme tel
  au §15.3.*
- **Le quadrillage fait partie de l'énoncé** : il est visible **avant** chaque pari, et
  il n'est **jamais** plus contrasté que les tracés.
- **Toutes les couleurs sont LUES sur les jetons `--figure-*`** à l'exécution, et
  relues au changement de thème (`lib/jetons-figure.ts`, **jamais**
  `scene3d/palette.ts`, qui importerait three).
- **$u_S$, $u_C$, $U_{max}$, $U_{min}$, $R_0C_0$, $\ll$ passent par KaTeX**, jamais par
  la police du chrome (ADR 0030, addendum : Geist dessine $\omega$ comme $\Omega$ ; le
  même piège guette les indices).
- **Toutes les échelles sont linéaires.** Aucune échelle logarithmique, nulle part
  (§9.6).

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant que
l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce qui dépend
de l'ISSUE attend la révélation*).

### 7.1 S1 — `deux-rythmes` · « Deux rythmes sur un seul écran »

- **État :** `F_khz: "4.0"`, `Sm_v: "2.0"`, `U0_v: "4.0"`, `R0_kohm: "5.0"` *(inerte :
  pas de détecteur)*, `sortie: "modulee"`, `reference: "aucune"`.
- **`etat_revele` :** aucun — le pari porte sur une lecture du tracé déjà affiché.
- **Contrôle ouvert :** `porteuse` (**neuf**).
- **Lectures :** `calibration` — et `comptage-porteuse`, `porteuse-lue`, `signal-lu`,
  `rapport-frequences` **après révélation seulement**.
- **Consigne (voix) :** « Un montage de TP, vu en schéma. À gauche, un circuit intégré
  **multiplieur**, le rectangle marqué X : on lui envoie, sur une entrée, la tension à
  transmettre, et sur l'autre, une tension sinusoïdale rapide — la porteuse. Sa sortie
  part dans un **oscilloscope**, dont tu vois l'écran à droite : dix divisions en
  largeur, huit en hauteur, quatre traits fins par division. Les réglages sont écrits
  dessous : **1,00 volt par division** en vertical, **0,50 milliseconde par division**
  en horizontal. Sur l'écran, un tracé : une oscillation très rapide, dont les sommets
  montent et descendent lentement — l'enveloppe, celle du chapitre précédent. Deux
  rythmes cohabitent, et c'est tout l'exercice de lecture. »
- **Pari :** « Choisis la bonne proposition. » *(La forme est celle du QCM réel de
  2023 N q1, `bank.yaml:553-560`.)*

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `roles-echanges` | « La fréquence du **signal modulant** est $4{,}0$ kHz. » | non | **`porteuse-vs-signal-modulant`** | « Le nombre est juste, c'est le nom qui est faux : $4{,}0$ kHz, c'est le rythme **rapide** — vingt oscillations serrées sur les dix divisions. Le signal modulant, lui, est le rythme **lent**, celui qui fait monter et descendre les sommets, et l'écran vient de le chiffrer : $400$ hertz, dix fois moins. Retiens l'ordre de grandeur : en modulation d'amplitude, la porteuse est toujours la **haute** fréquence, et c'est elle qui ne change jamais. » |
| `porteuse-4k` | « La fréquence de la **porteuse** est $4{,}0$ kHz. » | **oui** | — | « Oui. Et retiens la **chaîne** de lecture, parce que c'est elle que les sujets notent, pas le résultat. Pour la porteuse, on **compte** : vingt oscillations complètes sur les dix divisions, soit $T_p = \dfrac{10 \times 0{,}50}{20} = 0{,}250$ ms, donc $F = 4{,}00$ kHz. Pour l'enveloppe, on **repère deux extrema de même type** : d'un resserrement au resserrement suivant, exactement $5{,}00$ divisions, soit $T_{env} = 2{,}50$ ms, donc $f = 400$ Hz. Jamais deux extrema de types différents. Le rapport vaut $F/f = 10$. » |
| `demi-periode` | « La fréquence du **signal modulant** est $800$ Hz. » | non | **`lecture-oscillogramme`** *(nouveau, §8.2 ; forme « une période = d'un extremum à l'extremum voisin »)* | « Tu as compté $2{,}50$ divisions, soit $1{,}25$ ms — et c'est bien une distance réelle sur l'écran : celle qui sépare un **renflement** du **resserrement** voisin. Mais ce n'est qu'une **demi**-période : pour revenir au même état, l'enveloppe doit remonter. D'un resserrement au resserrement suivant, la scène vient de le mesurer : $5{,}00$ divisions, $2{,}50$ ms, $400$ Hz. C'est le piège exact que le sujet 2025 de rattrapage signale dans son propre corrigé. **Règle : une période va d'un extremum à l'extremum de MÊME type.** » |
| `division-inversee` | « La fréquence de la **porteuse** est $1{,}00$ kHz : elle fait deux oscillations par division, donc sa période vaut deux divisions. » | non | **`lecture-oscillogramme`** *(forme « oscillations par division » lu à l'envers)* | « La première moitié est juste — il y a bien deux oscillations par division — et la seconde est retournée. Deux oscillations **dans** une division, c'est une oscillation dans une **demi**-division : $T_p = 0{,}500$ div $= 0{,}250$ ms, donc $4{,}00$ kHz. Ta lecture donnerait une oscillation tous les deux carreaux, c'est-à-dire **quatre fois moins serré** que ce que tu vois. Le contrôle qui ne trompe jamais : compte sur **toute** la largeur — vingt oscillations pour $5{,}00$ ms. » |

*(Arithmétique des retours, vérifiée. $10\times0{,}50/20 = 0{,}250$ ms ✓, $1/0{,}250$ ms
$= 4{,}00$ kHz ✓. $5{,}00\times0{,}50 = 2{,}50$ ms ✓, $1/2{,}50$ ms $= 400$ Hz ✓.
$2{,}50\times0{,}50 = 1{,}25$ ms ✓, $1/1{,}25$ ms $= 800$ Hz ✓. $2$ div $= 1{,}00$ ms
$\Rightarrow 1{,}00$ kHz ✓, et $4{,}00/1{,}00 = 4$ ✓. $F/f = 4000/400 = 10$ ✓.)*

- **Ce que la révélation AJOUTE à l'écran** (à l'accent) : une **double flèche**
  horizontale entre les deux resserrements (3,75 et 8,75 div), cotée « 5,00 div =
  2,50 ms » ; un **crochet** sous une division, coté « 2 oscillations » ; et les quatre
  lectures.
- **`suite` (40 mots) :** « Maintenant promène la porteuse sur ses quatre crans :
  $1{,}2$ ; $2{,}4$ ; $4{,}0$ ; $8{,}0$ kilohertz. Compte à chaque fois — $6$, $12$,
  $20$, $40$ oscillations. Et surveille l'enveloppe : elle ne bouge pas. »
- **CE QUE LE BALAYAGE PROUVE, et c'est le cœur de la scène (§2.2) :** aux quatre
  crans, l'enveloppe est **identique au pixel près** — même période (5,00 div), mêmes
  extrema (3,00 et 1,00 div), mêmes positions (1,25 · 3,75 · 6,25 · 8,75 div). Seule la
  densité du tracé rapide change. **L'information n'est pas dans la fréquence.** Et au
  cran le plus bas, $F/f = 3$ : il ne reste que **trois** oscillations par période
  d'enveloppe, et l'enveloppe cesse d'être une courbe — la condition 1 **vue**, pas
  énoncée.
- **⟂-avant-pari :** les quatre lectures ; la **double flèche** et sa cote ; le
  **crochet** de comptage ; le verdict ; tout pixel d'accent (mesuré en
  **chrominance**) ; la description lue au lecteur d'écran ne doit contenir ni
  « $4{,}0$ kHz », ni « $400$ Hz », ni « porteuse » suivi d'un nombre, ni « vingt ».
  **Reste visible (l'énoncé) :** le montage entier à l'encre, l'écran, le quadrillage
  et ses quatre sous-graduations, les deux axes, **les étiquettes de calibration**, le
  tracé $u_S$ à l'encre douce, et la lecture `calibration`.
- **Interdit dans les retours de S1** (§2.3) : `U_{max}`, `U_{min}`, `taux`, `m =`,
  `A =`, `surmodulation`, `détecteur`, `diode`, `R_0C_0`.

### 7.2 S2 — `le-taux-par-deux-cretes` · « Le taux de modulation, lu sur deux crêtes »

- **État :** `F_khz: "4.0"`, `Sm_v: "2.0"`, `U0_v: "4.0"`, `R0_kohm: "5.0"`,
  `sortie: "modulee"`, `reference: "aucune"`.
- **`etat_revele` :** aucun.
- **Contrôle ouvert :** `modulante` (**neuf**).
- **Lectures :** `calibration`, `porteuse-lue`, `signal-lu` *(acquis de S1)* — et
  `extrema`, `amplitude-a`, `taux-lu`, `entrees`, `taux-regle` **après révélation
  seulement**.
- **Consigne :** « Même écran, même réglage, même sensibilité : $1{,}00$ volt par
  division. Regarde maintenant les **hauteurs**. Aux renflements, les crêtes de
  l'oscillation rapide culminent à **3,00 divisions** au-dessus de l'axe ; aux
  resserrements, elles ne montent qu'à **1,00 division**. Ce sont les deux seules
  mesures que ce genre de courbe donne — on les note $U_{max}$ et $U_{min}$. Tu as
  aussi, sous l'écran, les deux réglages d'entrée : la composante continue
  $U_0 = 4{,}0$ V et l'amplitude du signal $S_m = 2{,}0$ V. »
- **Pari :** « Que vaut le taux de modulation ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `difference-sur-somme` | $m = \dfrac{3{,}00-1{,}00}{3{,}00+1{,}00} = 0{,}50$ | **oui** | — | « Oui, et voici **pourquoi** cette combinaison-là et pas une autre. La sortie du multiplieur s'écrit $u_S = A\big[1+m\sin(2\pi ft)\big]\cos(2\pi Ft)$ : au renflement la parenthèse vaut $1+m$, au resserrement $1-m$. Donc $U_{max} = A(1+m)$ et $U_{min} = A(1-m)$. Leur **somme** fait $2A$ : elle efface $m$ et donne $A = \dfrac{3{,}00+1{,}00}{2} = 2{,}00$ V. Leur **différence sur leur somme** efface $A$ et ne laisse que $m$. Et remarque ce que ça te fait gagner le jour de l'examen : $m$ est un **rapport**, tu peux le calculer **en divisions**, sans jamais convertir en volts. » |
| `rapport-des-extrema` | $m = \dfrac{1{,}00}{3{,}00} = 0{,}33$ | non | **`taux-modulation-calcul`** *(forme « le rapport des deux extrema »)* | « Le rapport brut $U_{min}/U_{max}$ est une grandeur qui existe, mais ce n'est pas $m$. Vérifie sur tes propres réglages : $S_m/U_0 = 2{,}0/4{,}0 = 0{,}50$, pas $0{,}33$. L'écart vient de $A$ : les deux extrema le contiennent tous les deux, et un simple rapport ne l'élimine pas — il faut passer par $\dfrac{(1+m)-(1-m)}{(1+m)+(1-m)} = \dfrac{2m}{2} = m$. Fais glisser $S_m$ sur ses trois crans et compare les deux colonnes : $0{,}25$ / $0{,}50$ / $0{,}75$ d'un côté, et de l'autre $0{,}60$ / $0{,}33$ / $0{,}14$ — la seconde suite ne veut rien dire. » |
| `difference` | $m = 3{,}00 - 1{,}00 = 2{,}00$ | non | **`taux-modulation-calcul`** *(forme « différence au lieu de rapport »)* | « Une différence de deux tensions est une **tension**, en volts : ton résultat vaudrait « 2,00 volts », et un taux de modulation est un nombre **sans unité**. Le test qui tranche en une seconde : change la sensibilité de l'oscilloscope — passe à $2$ volts par division, et les mêmes crêtes deviennent $6{,}00$ et $2{,}00$ volts. Ta différence doublerait ; $m$, lui, ne bouge pas : $\dfrac{6-2}{6+2} = 0{,}50$. Une grandeur qui dépend du bouton de l'oscilloscope n'est pas une propriété du signal. » |
| `impossible` | « On ne peut pas : $m = S_m/U_0$, et un écran ne donne ni $S_m$ ni $U_0$. » | non | **`taux-modulation-calcul`** *(forme « $m$ ne s'obtient que depuis les entrées »)* | « La définition que tu cites est la bonne, et c'est justement ce que l'écran vient de retrouver **sans** elle : $U_{max} = kP_m(U_0+S_m)$ et $U_{min} = kP_m(U_0-S_m)$, donc leur différence sur leur somme vaut $\dfrac{2S_m}{2U_0} = \dfrac{S_m}{U_0}$ — **la constante $kP_m$ disparaît**. Les deux lectures sont affichées côte à côte : $0{,}50$ et $0{,}50$. C'est exactement pour cela que les sujets ne donnent jamais $k$ ni $P_m$ : le rapport les élimine. » |

*(Arithmétique vérifiée. $(3{,}00-1{,}00)/(3{,}00+1{,}00) = 2/4 = 0{,}50$ ✓ et
$S_m/U_0 = 2{,}0/4{,}0 = 0{,}50$ ✓ — **c'est le $m$ de 2017 N (`exercises.yaml:85`) et
de 2023 N (`bank.yaml:583`)**. $A = (3+1)/2 = 2{,}00$ V ✓ contre $U_0 = 4{,}0$ V.
$U_{min}/U_{max}$ aux trois crans de $S_m$ à $U_0 = 4{,}0$ : $1{,}50/2{,}50 = 0{,}60$ ✓,
$1{,}00/3{,}00 = 0{,}333$ ✓, $0{,}50/3{,}50 = 0{,}143$ ✓. À $2$ V/div :
$3{,}00$ div $\to 6{,}00$ V et $1{,}00$ div $\to 2{,}00$ V,
$(6-2)/(6+2) = 0{,}50$ ✓.)*

- **Ce que la révélation AJOUTE** (à l'accent) : deux **traits horizontaux** aux
  hauteurs $3{,}00$ et $1{,}00$ div, chacun coté ; un **crochet vertical** entre les
  deux ; et les cinq lectures.
- **`suite` (42 mots) :** « Fais glisser $S_m$ sur ses trois crans, à $U_0 = 4{,}0$ V.
  Les crêtes passent à $2{,}50$/$1{,}50$ puis $3{,}00$/$1{,}00$ puis
  $3{,}50$/$0{,}50$ : $m$ vaut $0{,}25$ ; $0{,}50$ ; $0{,}75$. Et regarde $A$ :
  $2{,}00$ V, immobile, **moitié moins que $U_0$**. »
- **CE QUE LE BALAYAGE PROUVE :** $A$ **ne dépend pas de $S_m$** (il vaut
  $kP_mU_0 = 2{,}00$ V aux trois crans) alors que $U_{max}$ et $U_{min}$ bougent tous
  les deux — et **$A \neq U_0$** ($2{,}00$ contre $4{,}0$). C'est le désamorçage du
  piège de notation (§4.3), obtenu par un réglage plutôt que par une phrase.
- **LA NON-FUITE QUI DÉCIDE DU RÉGLAGE DE S2 :** à $U_0 = 4{,}0$ V, les trois crans de
  `modulante` donnent $m = 0{,}25$ ; $0{,}50$ ; $0{,}75$ — **jamais $m \ge 1$**. La
  surmodulation, qui est l'issue du pari de S3, reste **inatteignable depuis S2**.
  *C'est la raison, et la seule, pour laquelle S2 tourne à $U_0 = 4{,}0$ et non à
  $2{,}0$ ou $3{,}0$ ; la porte le réécrit contre le descripteur (§11.4,
  `fuite-inter-etapes`).*
- **⟂-avant-pari :** les lectures `extrema`, `amplitude-a`, `taux-lu`, `entrees`,
  `taux-regle` ; les deux traits horizontaux et le crochet ; le verdict ; tout pixel
  d'accent ; la description lue ne doit contenir ni « $0{,}50$ », ni « taux », ni
  « $2{,}00$ V ».
  **Reste visible :** le montage, l'écran et son tracé (les crêtes **sont** à 3,00 et
  1,00 div : c'est l'énoncé que la consigne vient d'annoncer), la calibration, et les
  lectures de S1.
- **Interdit dans les retours de S2** (§2.3) : `m < 1`, `m \geq 1`, `surmodulation`,
  `pincement`, `bonne modulation`, `détecteur`, `diode`, `R_0C_0`.

### 7.3 S3 — `on-baisse-la-continue` · « On baisse la composante continue »

- **État :** `F_khz: "4.0"`, `Sm_v: "3.0"`, **`U0_v: "4.0"`**, `R0_kohm: "5.0"`,
  `sortie: "modulee"`, **`reference: "depart"`**.
  *(Donc à l'ouverture : $m = 0{,}75$, $U_{max} = 3{,}50$ div, $U_{min} = 0{,}50$ div.)*
- **`etat_revele` :** **`{ "U0_v": "2.0" }`** — la révélation **applique** le
  changement que la question décrit, et la scène répond **avant** le texte
  (ADR 0041, addendum de la nuit du 2026-09-24, point 1). La région vivante **dit**
  que le réglage a été posé.
- **Contrôle ouvert :** `continue` (**neuf**).
- **Lectures :** `extrema`, `amplitude-a`, `taux-lu`, `entrees`, `taux-regle`
  *(acquises de S2)* — toutes recalculées à la révélation.
- **Consigne :** « On a monté le signal à $S_m = 3{,}0$ volts, et l'écran donne
  $3{,}50$ et $0{,}50$ division : $m$ vaut $0{,}75$. Le resserrement est devenu
  étroit — il s'en faut de peu que les crêtes touchent l'axe. **On ne va pas toucher au
  signal.** On va baisser l'autre réglage, la composante continue, de $4{,}0$ volts à
  $2{,}0$ volts. Le message, lui, reste exactement le même : $3{,}0$ volts
  d'amplitude, $400$ hertz. »
- **Pari :** « En baissant $U_0$ de $4{,}0$ à $2{,}0$ V, le tracé va… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `pincement` | « se **pincer** : l'enveloppe descendra jusqu'à **toucher l'axe**, deux fois par période, et entre les deux pincements une petite bosse **retournée** apparaîtra. » | **oui** | — | « Oui — regarde-la. L'enveloppe touche zéro à $3{,}08$ et $4{,}42$ divisions, remonte à une petite bosse de $0{,}50$ division, puis retouche zéro. Sous cette bosse, l'oscillation rapide est **en opposition de phase** : elle est là, mais retournée. C'est ce que $U_0 + s_m(t)$ « voudrait » être — négatif — et une amplitude ne l'est jamais. On appelle ça la **surmodulation**, et la frontière est nette : elle commence quand $S_m$ atteint $U_0$, c'est-à-dire quand $\boxed{m = S_m/U_0}$ atteint $\boxed{1}$. Ici $m = 3{,}0/2{,}0 = 1{,}50$. **Et lis les deux taux côte à côte** : l'écran affiche $1{,}00$, le réglage affiche $1{,}50$. La lecture par les extrema ne peut **jamais** dépasser $1$, puisque $U_{min}$ ne descend pas sous zéro. C'est pour ça que les sujets, dans ce cas, demandent de **conclure sur la qualité** et non de mesurer un nombre. » |
| `plus-bas-mais-fidele` | « rester fidèle : l'enveloppe descendra simplement plus bas, et le message passera aussi bien. » | non | **`surmodulation-nature`** | « L'enveloppe ne descend pas « plus bas » : elle **s'arrête à zéro** et **remonte**. Regarde la forme obtenue : entre deux renflements, il n'y a plus un creux mais **deux zéros encadrant une bosse**. Cette bosse n'existe dans aucun signal de départ — le message, lui, fait une descente et une remontée, pas trois. Compare avec le trait interrompu, l'enveloppe d'avant : elle avait **un** creux par période. Ce n'est pas la même forme, donc ce n'est plus le même message. » |
| `mieux-module` | « s'améliorer : $m$ passe de $0{,}75$ à $1{,}50$, et plus $m$ est grand, plus l'information est marquée. » | non | **`surmodulation-nature`** *(forme « plus $m$ est grand, mieux c'est » — le distracteur D de `cp-r3-taux-modulation`)* | « Le calcul est juste et la conclusion est retournée. Jusqu'à $m = 1$, oui : plus $m$ est grand, plus l'enveloppe est contrastée. **Au-delà, elle se replie.** Ce que tu as gagné en contraste, tu l'as perdu en **forme** : deux zéros et une bosse là où le message n'a qu'un creux. Et ce n'est pas rattrapable à la réception, parce que l'information détruite n'est plus dans le signal — elle a été perdue **à l'émission**. C'est un défaut d'émetteur, pas de récepteur. » |
| `disparait` | « disparaître par endroits : là où $U_0 + s_m(t)$ serait négatif, l'amplitude n'existe pas, et l'écran restera vide sur ces intervalles. » | non | **`surmodulation-nature`** *(forme « amplitude négative = plus de signal »)* | « L'intuition n'est pas absurde — une amplitude négative n'existe pas — mais l'écran n'est pas vide : regarde entre $3{,}08$ et $4{,}42$ divisions. Il y a du signal, et il est **retourné**. Ce que le produit $k\,u(t)\,p(t)$ fabrique quand $u(t)$ devient négatif, ce n'est pas rien : c'est la porteuse **changée de signe**, c'est-à-dire déphasée d'un demi-tour. Une amplitude n'est jamais négative ; un **produit**, si. » |

*(Arithmétique vérifiée, §5.6. $U_0 = 2{,}0$, $S_m = 3{,}0$ : $A = 0{,}500\times2{,}0 =
1{,}00$ V ✓ ; $U_{max} = A(1+m) = 1{,}00\times2{,}50 = 2{,}50$ V $= 2{,}50$ div ✓ ;
bosse secondaire $A(m-1) = 1{,}00\times0{,}50 = 0{,}50$ div ✓ ; zéros à
$\sin = -1/1{,}5 = -0{,}667$, soit $t = 1{,}540$ et $2{,}210$ ms → **3,08** et
**4,42 div** ✓ ; $m_{lu} = 2{,}50/2{,}50 = 1{,}00$ ✓ ; $m = 3{,}0/2{,}0 = 1{,}50$ ✓.
État de départ : $U_{max} = 0{,}500\times7{,}0 = 3{,}50$ ✓,
$U_{min} = 0{,}500\times1{,}0 = 0{,}50$ ✓, $m = 3/4 = 0{,}75$ ✓.)*

- **Ce que la révélation AJOUTE** (à l'accent) : les **deux marqueurs de pincement**
  (3,08 et 4,42 div, et leurs jumeaux à 8,06 et 9,42 div), la **bosse retournée**
  entourée, et les deux lectures `taux-lu` / `taux-regle` **côte à côte**. *À
  l'encre, en trait interrompu :* l'enveloppe de départ ($m = 0{,}75$), que
  `reference: "depart"` conserve.
- **`suite` (40 mots) :** « Remonte $U_0$ cran par cran, sans toucher au signal. À
  $3{,}0$ V, $m$ vaut exactement $1{,}00$ : l'enveloppe **effleure** l'axe, un point par
  creux, plus de bosse. À $4{,}0$ V, $m = 0{,}75$ : le creux se rouvre. »
- **CE QUE LE BALAYAGE PROUVE :** à $S_m = 3{,}0$ V fixé, les trois crans de `continue`
  donnent $m = 1{,}50$ (deux zéros et une bosse) · $m = 1{,}00$ (**un** point de
  contact exact, aucune bosse) · $m = 0{,}75$ (creux ouvert). **La frontière $m = 1$
  est ATTEINTE exactement**, pas approchée — c'est la règle de la sphère (ADR 0041,
  addendum du 2026-09-23 : *que le cas tangent soit atteint EXACTEMENT, et que la scène
  ne montre jamais un « presque » qu'elle appellerait une tangence*).
- **⟂-avant-pari :** l'enveloppe de $U_0 = 2{,}0$ V ; les marqueurs de pincement ; la
  bosse entourée ; **toute** lecture recalculée ; le verdict ; tout pixel d'accent ; la
  description lue ne doit contenir ni « pince », ni « zéro », ni « $1{,}50$ », ni
  « surmodulation ».
  **Reste visible :** le montage, l'écran, le tracé **du réglage de départ**
  ($m = 0{,}75$, crêtes à 3,50 et 0,50 div), la calibration, et les lectures de S2 à
  leur valeur de départ. *La référence coïncide alors avec le réglage courant : elle
  ne révèle rien.*
- **Interdit dans les retours de S3** (§2.3) : `R_0C_0`, `\ll`, `détecteur`, `diode`,
  `décharge`, `condensateur`.

### 7.4 S4 — `la-fenetre-du-detecteur` · « Le détecteur, et la fenêtre qu'il exige »

- **État :** **`F_khz: "8.0"`**, `Sm_v: "2.0"`, `U0_v: "4.0"` *(retour à une bonne
  modulation, $m = 0{,}50$ : on ne démodule pas un signal surmodulé)*,
  **`R0_kohm: "25"`**, `sortie: "modulee"`, `reference: "aucune"`.
- **`etat_revele` :** **`{ "sortie": "modulee-et-detectee" }`** — la révélation
  **branche l'étage** : le schéma gagne sa diode, son $R_0$ et son $C_0$, et l'écran
  gagne le second tracé. La région vivante le **dit**.
- **Contrôle ouvert :** `detecteur` (**neuf**).
- **Lectures :** `porteuse-lue`, `signal-lu` — et `constante-temps`, `fenetre` **après
  révélation seulement**.
- **Consigne :** « On passe à la réception, et on monte la porteuse à $8{,}0$ kilohertz
  pour se rapprocher d'un vrai montage : quarante oscillations sur l'écran, vingt par
  période d'enveloppe. La modulation est bonne — $m = 0{,}50$. Derrière le multiplieur,
  on branche l'étage qui retrouve le message : une **diode**, qui ne laisse passer que
  les alternances positives, puis un **condensateur** $C_0 = 100$ nanofarads en
  parallèle avec un **rhéostat** réglé sur $R_0 = 25$ kilohms. Le condensateur se
  charge à chaque crête et se décharge dans le rhéostat entre deux crêtes — la
  décharge d'un RC, comme au chapitre du dipôle RC. Sa constante de temps vaut
  $R_0C_0 = 2{,}50$ millisecondes. Deux durées, sur l'écran, à garder en tête : la
  porteuse fait une oscillation en $0{,}125$ milliseconde, l'enveloppe une période en
  $2{,}50$ millisecondes. »
- **Pari :** « Quand on affichera la tension aux bornes du condensateur, on verra… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `epouse` | « une courbe qui **épouse l'enveloppe** : c'est le principe même du montage, il est fait pour ça. » | non | **`demodulation-detecteur-crete`** *(forme « le détecteur marche toujours »)* | « Le montage est fait pour ça, et il ne le fait pas à ce réglage — c'est exactement ce que les sujets font vérifier. Regarde la descente : l'enveloppe plonge, la courbe du condensateur **s'en va presque tout droit** et ne la rejoint qu'au creux suivant. La raison est un nombre : $R_0C_0 = 2{,}50$ ms, c'est **la période entière de l'enveloppe**. Un condensateur qui met une période à se vider ne peut pas suivre une descente qui dure un quart de période. » |
| `suit-porteuse` | « une courbe qui **suit la porteuse**, crête par crête, en dents de scie profondes : le condensateur se vide entre deux sommets. » | non | **`demodulation-detecteur-crete`** *(forme « l'échec de l'autre côté »)* | « C'est le bon échec, au mauvais moment : celui-là arrive quand la constante de temps est **trop petite**, et ici elle est **énorme** — $2{,}50$ ms contre $0{,}125$ ms entre deux crêtes, soit vingt fois plus. Entre deux sommets, le condensateur ne perd que $5$ % de sa charge : la courbe est presque lisse. Descends le rhéostat à $0{,}5$ kilohm tout à l'heure, et tu verras exactement ce que tu viens de décrire. **Deux échecs opposés, deux bornes.** » |
| `rate-la-descente` | « une courbe qui **monte** avec l'enveloppe mais **rate la descente** : elle s'en va presque en ligne droite et ne rattrape l'enveloppe qu'au creux suivant. » | **oui** | — | « Oui. Le condensateur monte instantanément à chaque nouvelle crête — ça, il sait faire —, mais il ne peut **descendre** qu'à la vitesse que lui impose $R_0C_0$. Ici $R_0C_0 = 2{,}50$ ms, c'est la période entière de l'enveloppe : beaucoup trop lent. D'où la **fenêtre** que tout détecteur de crête exige, et qu'il faut savoir vérifier : $$\frac{1}{F} \ll R_0C_0 \ll \frac{1}{f}$$ Assez **grande** devant la période de la porteuse pour ne pas se vider entre deux crêtes ; assez **petite** devant la période du signal pour ne pas rater ses descentes. Les trois durées sont affichées sous l'écran : $0{,}125$ ms · $2{,}50$ ms · $2{,}50$ ms. La borne de droite n'est pas respectée — elle est **atteinte**. » |
| `constante` | « une tension **constante** : chargé au premier sommet, le condensateur ne se décharge plus. » | non | **`demodulation-detecteur-crete`** *(forme « le condensateur mémorise »)* | « Il se décharge : il y a un rhéostat en parallèle, et c'est tout son rôle. La courbe **descend** — regarde-la — simplement trop lentement. Chiffre-le : en une période d'enveloppe, soit $2{,}50$ ms, la décharge fait perdre un facteur $e^{-1}$, c'est-à-dire près des deux tiers de la tension. Une décharge de deux tiers par période n'est pas « rien » ; c'est seulement la mauvaise forme. Enlève le rhéostat, alors, et la tension resterait en haut — et le message serait perdu pour de bon. » |

*(Arithmétique vérifiée, §5.7. $R_0C_0 = 2{,}5\times10^{4}\times1{,}00\times10^{-7} =
2{,}50\times10^{-3}$ s ✓. $1/F = 1/8000 = 1{,}25\times10^{-4}$ s $= 0{,}125$ ms ✓.
$1/f = 2{,}50$ ms ✓ — **égal** à $R_0C_0$. Décroissance entre deux crêtes :
$e^{-0{,}125/2{,}50} = e^{-0{,}05} = 0{,}951$, soit $4{,}9$ % ✓. Sur une période
d'enveloppe : $e^{-2{,}50/2{,}50} = e^{-1} = 0{,}368$, soit **63 % perdus** ✓.
À $0{,}5$ kΩ : $e^{-0{,}125/0{,}050} = e^{-2{,}5} = 0{,}082$, soit $91{,}8$ % perdus
entre deux crêtes ✓, et $0{,}050$ ms est bien **2,5 fois plus petit** que $0{,}125$ ms ✓.)*

- **Ce que la révélation AJOUTE :** à l'**encre pleine**, le second tracé $u_C(t)$ et
  l'étage de détection dans le schéma ; à l'**accent**, un **repère de décrochage** sur
  la première descente (« ici elle ne suit plus »), et les deux lectures
  `constante-temps` et `fenetre`.
- **`suite` (44 mots) :** « Descends le rhéostat cran par cran, et regarde la même
  descente. À $10$ kΩ elle décroche encore. À $5{,}0$ kΩ elle épouse l'enveloppe, en
  dents de scie fines. À $2{,}0$ puis $0{,}5$ kΩ le condensateur se vide entre deux
  sommets et la courbe retombe sur la porteuse. Trois régimes, deux échecs, un
  réglage. »
- **⟂-avant-pari :** le second tracé $u_C(t)$ ; **l'étage de détection dans le
  schéma** (diode, $R_0$, $C_0$ dessinés) ; le repère de décrochage ; les lectures
  `constante-temps` et `fenetre` ; le verdict ; tout pixel d'accent ; la description
  lue ne doit contenir ni « descente », ni « décroche », ni « suit ».
  **Reste visible :** le montage **sans** l'étage de détection, l'écran avec le seul
  tracé $u_S$, la calibration, et les lectures `porteuse-lue` et `signal-lu`. *Les
  trois durées ($0{,}125$ ; $2{,}50$ ; $2{,}50$ ms) sont **dans la consigne**, pas
  dans les lectures : c'est l'énoncé qui les donne, comme un sujet.*
- **Interdit dans les retours de S4 :** rien de nouveau ; la relation est complète.
  Restent interdites les formes du §9.

### 7.5 S5 — `libre` · « Le taux est bon, et rien ne marche »

- **État :** **`F_khz: "1.2"`**, `Sm_v: "2.0"`, `U0_v: "4.0"`, `R0_kohm: "5.0"`,
  **`sortie: "modulee-et-detectee"`**, `reference: "aucune"`.
  *(Donc : $m = 0{,}50$ — bonne modulation ; $F/f = 3$ ; $T_p = 0{,}833$ ms ;
  $\tau = 0{,}500$ ms **plus petite** que $T_p$.)*
- **`etat_revele` :** aucun.
- **Contrôles ouverts :** les **quatre**, tous rouverts. **Pas de contrôle neuf** — S5
  est l'étape de synthèse, et sa `suite` est une manœuvre en trois vérifications qui a
  besoin des quatre réglages. *(Même choix qu'au banc de diffraction, à la cuve et à la
  corde ; les noyaux, eux, gardaient un contrôle neuf. Écrit ici plutôt que découvert à
  la revue.)*
- **Lectures :** les **douze**.
- **Consigne :** « Dernier écran, et une situation qui n'a rien d'artificiel — c'est
  celle d'un élève qui a tout vérifié et qui échoue quand même. Le taux de modulation
  vaut $0{,}50$ : tu peux le lire, les crêtes sont à $3{,}00$ et $1{,}00$ division.
  La modulation, de ce côté-là, est bonne. Le détecteur est branché, le rhéostat est sur
  $5{,}0$ kilohms — le réglage qui marchait à l'étape précédente. Et pourtant la courbe
  du condensateur est un désastre : elle retombe sur la porteuse. Une seule chose a
  changé depuis l'étape précédente : la porteuse est descendue à $1{,}2$ kilohertz. »
- **Pari :** « Pourquoi la démodulation échoue-t-elle ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `m-trop-petit` | « Parce que $m = 0{,}50$ est trop petit : il faut un taux proche de $1$ pour que le détecteur ait assez de signal à suivre. » | non | **`surmodulation-nature`** *(forme « plus $m$ est grand, mieux c'est », rejouée côté réception)* | « Monte $S_m$ et regarde : à $m = 0{,}75$, la courbe du condensateur est **exactement aussi mauvaise**, et à $m = 1{,}50$ elle est pire, parce que le signal lui-même est déformé. Le taux décide de la **hauteur** de l'enveloppe ; il ne décide pas de la **vitesse** à laquelle le condensateur peut la suivre. Ces deux questions sont indépendantes — c'est pour ça que les sujets les posent séparément. » |
| `porteuse-trop-lente` | « Parce que la porteuse est trop lente : sa période, $0{,}833$ ms, est **plus grande** que la constante de temps $R_0C_0 = 0{,}500$ ms. Le condensateur se vide entre deux crêtes. » | **oui** | — | « Oui, et va jusqu'au bout du raisonnement, parce que c'est la conclusion la plus utile du chapitre. La borne de gauche exige $R_0C_0 \gg 1/F = 0{,}833$ ms : il faudrait monter le rhéostat. Essaie — à $10$ kΩ, $R_0C_0 = 1{,}00$ ms, et la courbe **rate la descente**. À $25$ kΩ, $2{,}50$ ms : c'est $1/f$ tout entier, pire encore. **Aucun** des cinq crans ne convient, et ce n'est pas un défaut du rhéostat : entre $0{,}833$ ms et $2{,}50$ ms il n'y a qu'un facteur trois, et un « $\ll \dots \ll$ » n'y tient pas. **La fenêtre du détecteur n'existe que si $F \gg f$.** La première condition de bonne modulation n'est donc pas un confort de lisibilité : c'est elle qui rend la démodulation possible. Remonte la porteuse à $8{,}0$ kHz, laisse le rhéostat sur $5{,}0$ kΩ, et tout rentre dans l'ordre. » |
| `constante-trop-grande` | « Parce que la constante de temps est **trop grande** : $R_0C_0$ dépasse la période du signal. » | non | **`demodulation-detecteur-crete`** *(forme « la mauvaise borne »)* | « Les trois durées sont affichées ; lis-les dans l'ordre : $1/F = 0{,}833$ ms, $R_0C_0 = 0{,}500$ ms, $1/f = 2{,}50$ ms. La constante de temps est **cinq fois plus petite** que la période du signal : la borne de droite est largement respectée. C'est la borne de **gauche** qui est violée, et de façon spectaculaire — $R_0C_0$ n'est même pas plus grande que $1/F$, elle est plus **petite**. Regarde la forme, elle le dit aussi : une courbe qui rate la descente s'en va **tout droit** ; une courbe qui se vide entre deux crêtes fait des **dents de scie**. Tu as des dents de scie. » |
| `augmenter-r` | « Parce que le rhéostat est mal réglé, et cela n'a rien à voir avec la porteuse : il suffit de l'augmenter. » | non | **`demodulation-detecteur-crete`** *(forme « les deux bornes sont indépendantes »)* | « Fais-le, c'est le meilleur moyen de voir pourquoi non. À $10$ kΩ, la courbe cesse de faire des dents de scie — et se met à **rater la descente**. À $25$ kΩ, elle la rate franchement. Tu as échangé un échec contre l'autre, sans jamais passer par un réglage correct : il n'existe pas ici. La raison est arithmétique : il faudrait une constante de temps à la fois **bien plus grande** que $0{,}833$ ms et **bien plus petite** que $2{,}50$ ms. Entre les deux il y a un facteur trois. **Ce n'est pas le rhéostat qu'il faut changer, c'est la porteuse.** » |

*(Arithmétique vérifiée, §5.7. À $F = 1{,}2$ kHz : $T_p = 1/1200 = 0{,}833$ ms ✓ ;
$\tau = 5000\times10^{-7} = 5{,}00\times10^{-4}$ s, soit $0{,}500$ ms ✓, soit $T_p/\tau = 1{,}667$ et
$e^{-1{,}667} = 0{,}189$ → **81 % perdus entre deux crêtes** ✓ : dents de scie
profondes. À $10$ kΩ, $\tau = 1{,}00$ ms et $T_p/\tau = 0{,}833$,
$e^{-0{,}833} = 0{,}435$ ; la descente maximale de l'enveloppe est
$A\,m\,2\pi f = 2{,}00\times0{,}50\times2513 = 2513$ V/s $= 2{,}51$ V/ms, contre une
décharge de $u_C/\tau \le 3{,}00/1{,}00 = 3{,}00$ V/ms au sommet mais
$2{,}00/1{,}00 = 2{,}00$ V/ms à mi-descente : **elle décroche** ✓. Rapport
$1/f$ sur $1/F$ : $2{,}50/0{,}833 = 3{,}00$ ✓.)*

- **Ce que la révélation AJOUTE :** un **repère d'accent** sur les dents de scie
  (« le condensateur se vide ici »), et les trois durées de `fenetre` alignées.
- **`suite` (48 mots) :** « Trois vérifications, dans cet ordre. Un : $F/f$ — il faut
  qu'il soit grand ; à $8{,}0$ kHz il vaut $20$. Deux : $m = S_m/U_0$ — il faut qu'il
  soit sous $1$. Trois : les trois durées de la fenêtre. Trouve le seul réglage où les
  trois passent. »
- **LA NON-FUITE QUI DÉCIDE DU RÉGLAGE DE S5 :** S4 tourne à $F = 8{,}0$ kHz et n'ouvre
  que `detecteur` ; S1 ouvre `porteuse` mais à `sortie: "modulee"` — **le détecteur
  n'existe pas dans le DOM**. Le couple (**porteuse à $1{,}2$ kHz** ET **détecteur
  branché**) est donc **inatteignable avant S5** (§7.6). *Une fuite molle demeure, et
  elle est écrite : un élève qui a fait S4 sait à quoi ressemblent les deux échecs. Ce
  n'est pas une fuite au sens de la règle — la règle interdit d'**atteindre l'état**
  qu'un pari fait deviner, pas de comprendre la physique qui y mène. Et ce que S5
  demande n'est ni l'un ni l'autre des échecs connus : c'est **la cause**, et elle est
  ailleurs que dans le rhéostat.*
- **⟂-avant-pari :** le repère d'accent sur les dents de scie ; la lecture `fenetre` ;
  le verdict ; tout pixel d'accent ; la description lue ne doit contenir ni
  « porteuse trop lente », ni « borne de gauche », ni « $0{,}833$ ».
  **Reste visible :** le montage **complet** (l'étage de détection est acquis de S4),
  l'écran avec **les deux tracés à l'encre** — celui du condensateur en dents de scie,
  qui est l'**énoncé** de cette étape —, la calibration, et toutes les lectures **du
  réglage courant** sauf `fenetre`.

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes.** Tout ce qui dépend de l'ISSUE attend la
révélation : la **double flèche** et le **crochet** de S1, les **traits d'extrema** de
S2, les **marqueurs de pincement** de S3, le **second tracé** et le **repère de
décrochage** de S4, le repère de S5 ; **toute lecture qui est une réponse** ; le
verdict ; et la phrase lue au lecteur d'écran. Ce qui reste, c'est **l'énoncé** : le
montage à l'encre, l'écran, **le quadrillage et ses quatre sous-graduations** (la
graduation est l'instrument, pas la réponse), les **étiquettes de calibration**, le
tracé du réglage que la consigne vient de décrire, et les valeurs qu'elle vient
d'énoncer.

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du 2026-09-24 soir) : *ce
qu'une étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT fait
deviner.* **La porte réécrit elle-même cette table contre le descripteur** (§11.4,
`fuite-inter-etapes`) :

| étape | contrôle ouvert | ce qu'il peut atteindre | pari suivant mis en danger ? |
|---|---|---|---|
| **S1** | `porteuse` seul (4 crans) | les quatre densités de porteuse, **à $U_0 = 4{,}0$, $S_m = 2{,}0$**, **sans détecteur** (`sortie: "modulee"`) | **non** pour S2 : `modulante` fermé, et les extrema (3,00 / 1,00 div) sont l'ÉNONCÉ de S2, pas son issue — l'issue est la **combinaison**. **non** pour S3 : `continue` fermé, $m$ ne peut pas quitter $0{,}50$. **non** pour S4 et S5 : `sortie: "modulee"`, **le détecteur n'est pas dans le DOM**. |
| **S2** | `modulante` seul (3 crans) | $m \in \{0{,}25 ; 0{,}50 ; 0{,}75\}$ **à $U_0 = 4{,}0$** | **non** pour S3 : `continue` fermé ⇒ **$m \ge 1$ est INATTEIGNABLE**. *C'est la raison du réglage $U_0 = 4{,}0$ à S2 (§7.2).* **non** pour S4/S5 : pas de détecteur. |
| **S3** | `continue` seul (3 crans) | $m \in \{1{,}50 ; 1{,}00 ; 0{,}75\}$ **à $S_m = 3{,}0$**, sans détecteur | **non** pour S4 : pas de détecteur dans le DOM. **non** pour S5 : `porteuse` fermé ⇒ $F$ reste à $4{,}0$ kHz. |
| **S4** | `detecteur` seul (5 crans) | les cinq régimes **à $F = 8{,}0$ kHz** | **non** pour S5 : `porteuse` fermé ⇒ **le couple ($1{,}2$ kHz, détecteur branché) reste hors d'atteinte**. |
| **S5** | les quatre | tout | — |

**La fuite par le TEXTE — la quatrième forme** (ADR 0041, addendum de la nuit du
2026-09-24, point 2 ; règle `formule-graduee`). La chaîne du chapitre contient quatre
réponses ; si un retour l'écrit trop tôt, les étapes suivantes meurent.

| après la révélation de… | chaînes **autorisées** dans le panneau | chaînes **interdites** |
|---|---|---|
| **S1** | `T_p`, `T_{env}`, `F = 1/T`, `f = 1/T`, `F/f`, « oscillations par division » | `U_{max}`, `U_{min}`, `Umax`, `Umin`, `taux`, `m =`, `m=`, `A =`, `A=`, `surmodulation`, `pincement`, `détecteur`, `diode`, `R_0C_0`, `R0C0`, `\ll` |
| **S2** | `U_{max}`, `U_{min}`, `A = \frac{U_{max}+U_{min}}{2}`, `m = \frac{U_{max}-U_{min}}{U_{max}+U_{min}}`, `m = S_m/U_0`, `A = kP_mU_0` | `m < 1`, `m<1`, `m \geq 1`, `surmodulation`, `pincement`, `bonne modulation`, `mauvaise modulation`, `détecteur`, `diode`, `R_0C_0`, `\ll` |
| **S3** | `m < 1`, `surmodulation`, `pincement`, `opposition de phase`, la saturation de $m_{lu}$ | `R_0C_0`, `R0C0`, `\ll`, `détecteur`, `diode`, `décharge`, `condensateur`, `rhéostat` |
| **S4** | tout, y compris `\frac{1}{F} \ll R_0C_0 \ll \frac{1}{f}` | — |
| **S5** | tout | — |

*La porte lit ces chaînes dans le `textContent` **rendu**, **annotations TeX de KaTeX
comprises** — c'est la forme que le produit ÉCRIT (ADR 0039) — et **dans les deux
sens** : absentes avant, présentes après.*

**Une symétrie du réglage qui est une condition de non-fuite** (règle de la corde,
`miroir-inerte`) : à S1, l'enveloppe doit rester **identique** aux quatre crans de
`porteuse`. Si le modèle faisait dépendre l'enveloppe de $F$ — ne serait-ce que par un
artefact d'échantillonnage du tracé —, le balayage de S1 montrerait une enveloppe qui
change, c'est-à-dire **le contraire** de ce que le retour affirme. La porte le mesure
aux pixels (§11.3, `enveloppe-inerte`), et c'est la mesure la plus importante de cette
scène.

---

## 8. Les misconceptions — l'inventaire existant, et un huitième modèle

### 8.1 Ce que les paris servent, sur l'inventaire déjà déclaré

`items.yaml:13-41` déclare **sept** modèles ; `coverage_summary` (`:1543-1574`) donne
`total_items: 24`, plancher 3 **atteint** sur les sept.

| étape | choix faux | modèle visé |
|---|---|---|
| **S1** | `roles-echanges` | `porteuse-vs-signal-modulant` |
| **S1** | `demi-periode`, `division-inversee` | **`lecture-oscillogramme`** *(nouveau, §8.2)* |
| **S2** | `rapport-des-extrema`, `difference`, `impossible` | `taux-modulation-calcul` |
| **S3** | `plus-bas-mais-fidele`, `mieux-module`, `disparait` | `surmodulation-nature` |
| **S4** | `epouse`, `suit-porteuse`, `constante` | `demodulation-detecteur-crete` |
| **S5** | `m-trop-petit` | `surmodulation-nature` |
| **S5** | `constante-trop-grande`, `augmenter-r` | `demodulation-detecteur-crete` |

**Cinq des sept modèles déclarés sont servis** ; `antenne-taille-vs-longueur-onde` et
`lambda-relation-cf` (R1) et `circuit-accorde-selection` (R5) sont **hors scène**, par
rang (§9.7, §9.10).

*Rappel de règle (ADR 0041 §6) : une misconception n'est « servie » que si elle casse
sur **SA** propre conséquence. Ici : `taux-modulation-calcul` casse sur le changement
de sensibilité (une grandeur qui dépend du bouton de l'oscilloscope n'est pas une
propriété du signal) ; `surmodulation-nature` casse sur la **forme** obtenue (deux
zéros et une bosse contre un creux) ; `demodulation-detecteur-crete` casse sur **l'autre
échec**, atteint en tournant le même rhéostat ; `lecture-oscillogramme` casse sur le
**comptage sur toute la largeur**, qui ne dépend d'aucune interprétation.*

### 8.2 Le huitième modèle : `lecture-oscillogramme` — la mesure qui le rend nécessaire

**Ce n'est pas un modèle de confort.** Quatre faits, chacun vérifiable :

1. **Sept des dix entrées de banque exigent de lire une courbe**, et `REVIEW-2026-09-12`
   le mesure : « *aucun des 24 items ne rend de figure, aucun n'exerce la lecture
   d'oscillogramme — geste exigé par 7 sujets réels sur 7 et pesé 15 % par le cadre.* »
2. **Les sept modèles déclarés sont tous des modèles de RÔLE ou de FORMULE**
   (`items.yaml:13-41` : l'antenne, $\lambda = c/f$, porteuse/modulante, le calcul de
   $m$, la nature de la surmodulation, le détecteur, le circuit accordé). **Aucun ne
   décrit une erreur de LECTURE.** Un élève qui compte une demi-période n'a ni inversé
   les rôles, ni inversé la formule : il a lu un graphique comme s'il n'avait pas de
   calibration.
3. **La banque nomme l'erreur trois fois, en toutes lettres, dans ses propres
   « pièges »** — sans qu'aucun item ne la tague :
   - `bank.yaml:959` (2025 R q1) : « *Compter une distance entre un extremum de bord et
     l'extremum voisin sans vérifier qu'il s'agit bien de deux extrema de MÊME type
     consécutifs… Deuxième piège : confondre la double flèche de calibration avec une
     flèche de période.* »
   - `bank.yaml:1001` (2025 R q2) : « *Lire les extrema sur les lignes chiffrées de la
     figure 4 plutôt qu'à l'endroit RÉEL où les crêtes culminent.* »
   - `bank.yaml:1259` (2015 N q2-3) : « *Croire qu'il faut connaître les volts par
     division pour calculer $m$.* »
4. **Le modèle sous-jacent est nommable**, ce qui en fait une misconception et non un
   simple manque d'entraînement : *« un oscillogramme se lit comme un graphe dont les
   axes sont déjà gradués en unités physiques »* — d'où l'on tire une durée sans passer
   par la sensibilité, on prend les lignes chiffrées de l'axe pour des repères de la
   courbe, et on confond « oscillations par division » avec « divisions par
   oscillation ».

**Proposition d'entrée d'inventaire** (à écrire par item-author dans
`items.yaml:misconceptions`) :

```
- id: mc.physics.pc_ondes_em_modulation.lecture-oscillogramme
  label: "« Un oscillogramme se lit comme un graphe déjà gradué : sans calibration,
           entre deux extrema quelconques, ou en inversant oscillations/division »"
  description: "L'élève lit une durée ou une tension directement en carreaux sans la
    multiplier par la sensibilité ; prend une flèche ou une ligne chiffrée de
    l'écran pour un repère de la courbe ; compte une « période » entre deux extrema
    de types DIFFÉRENTS (donc une demi-période) ; ou inverse « N oscillations par
    division » en « N divisions par oscillation »."
  contradicts_principle: "Un oscillogramme ne porte aucune unité : il porte des
    divisions et deux sensibilités (V/div, ms/div). Toute durée se lit
    (nombre de divisions) × (ms/div) et toute tension (nombre de divisions) × (V/div).
    Une période va d'un extremum à l'extremum de MÊME type. Et un rapport de deux
    tensions (comme m) se calcule directement en divisions, sans conversion."
```

*Décision humaine — elle touche l'inventaire et un `coverage_summary` généré : §13.3.
Réversible : une entrée d'inventaire, quatre étiquettes d'items, deux choix de paris.*

### 8.3 Trois items pour le huitième modèle — plancher ≥ 3

**Obstacle mesuré, et il n'a pas bougé depuis la spec du banc de diffraction :**

> **Aucun item du corpus entier ne porte de figure.** Recherche sur les `items.yaml` de
> `content/` (`[[figure:`, `figure_slug`, `figure:`) : **zéro occurrence**. Le schéma
> d'item est textuel.

D'où trois items qui exercent le **même geste sous la forme que le schéma permet : un
oscillogramme DÉCRIT en mots**, exactement comme les `intro` des entrées de banque le
font déjà (`bank.yaml:921` : « *cadre de 27 carreaux de large… 1 carreau $= 0{,}165$ V…* »).

**OEM-25** — `rung: "R3"`, `difficulty_level: 3`,
`habilete: application_experimentale`,
`primary_misconception: mc.physics.pc_ondes_em_modulation.lecture-oscillogramme`

- *stem :* Un signal modulé en amplitude est observé sur un oscilloscope réglé à
  **2,0 ms/div** en horizontal. L'écran fait 10 divisions de large. On relève : un
  renflement de l'enveloppe à 1,0 division du bord gauche, un resserrement à
  4,0 divisions, le renflement suivant à 7,0 divisions. **Que vaut la fréquence du
  signal modulant ?**
- *clé (A) :* $83$ Hz — d'un renflement au renflement suivant il y a $6{,}0$ divisions,
  soit $T_s = 6{,}0 \times 2{,}0 = 12$ ms, donc $f_s = 1/(12\times10^{-3}) \approx 83$ Hz.
- *distracteurs :*
  - (B) « $167$ Hz : d'un renflement au resserrement voisin il y a $3{,}0$ divisions,
    soit $6{,}0$ ms » → **`lecture-oscillogramme`** *(demi-période)*. `feedback` : trois
    divisions séparent bien un renflement du resserrement voisin, mais l'enveloppe n'est
    revenue à son état de départ qu'au renflement **suivant** : il faut aller de
    renflement à renflement, $6{,}0$ divisions. Une période va toujours d'un extremum à
    l'extremum de **même type**.
  - (C) « $0{,}17$ Hz : la période vaut $6{,}0$ » → **`lecture-oscillogramme`**
    *(sensibilité oubliée)*. `feedback` : $6{,}0$ est un nombre de **divisions**, pas une
    durée. Une division vaut $2{,}0$ ms : la période est $12$ ms, pas $6{,}0$ s. Sur un
    oscillogramme, rien ne se lit sans passer par la sensibilité.
  - (D) « $500$ Hz : la période vaut $2{,}0$ ms, la valeur du réglage horizontal » →
    **`lecture-oscillogramme`** *(la sensibilité prise pour la période)*. `feedback` :
    $2{,}0$ ms/div est l'échelle de l'écran, pas une durée du signal — c'est la même
    confusion que prendre une flèche de calibration pour une flèche de période. La durée
    se **construit** : (nombre de divisions) × (ms/div).
- *solution :* $6{,}0$ div entre deux renflements ; $T_s = 6{,}0 \times 2{,}0 = 12$ ms ;
  $f_s = 1/(12\times10^{-3}) = 83{,}3 \approx 83$ Hz. *Contrôle : $83$ Hz est bien une
  fréquence audible basse, cohérente avec un signal modulant.*

**OEM-26** — `rung: "R3"`, `difficulty_level: 3`,
`habilete: application_experimentale`, même `primary_misconception`

- *stem :* Sur l'oscillogramme d'un signal modulé, l'axe vertical ne porte que trois
  valeurs chiffrées : $-1{,}0$ V, $0$ et $+1{,}0$ V, et l'écart de $0$ à $+1{,}0$ V
  couvre **2 divisions**. Aux renflements, les crêtes culminent à **3,0 divisions**
  au-dessus de l'axe ; aux resserrements, à **1,0 division**. **Que valent $U_{max}$ et
  le taux de modulation $m$ ?**
- *clé (A) :* 1 division $= 0{,}50$ V, donc $U_{max} = 1{,}5$ V et $U_{min} = 0{,}50$ V ;
  $m = \dfrac{1{,}5-0{,}50}{1{,}5+0{,}50} = 0{,}50$.
- *distracteurs :*
  - (B) « $U_{max} = 1{,}0$ V, la plus haute valeur chiffrée de l'axe ; $m$ ne peut pas
    se calculer » → **`lecture-oscillogramme`** *(la ligne chiffrée prise pour la
    crête — le piège de `bank.yaml:1001`)*. `feedback` : $+1{,}0$ V est un repère
    **d'axe**, il marque une hauteur, pas un sommet du tracé. Les crêtes montent à
    $3{,}0$ divisions, c'est-à-dire **au-dessus** de ce repère : $1{,}5$ V.
  - (C) « $U_{max} = 3{,}0$ V : les crêtes sont à 3,0 divisions » →
    **`lecture-oscillogramme`** *(divisions prises pour des volts)*. `feedback` :
    $3{,}0$ est un nombre de divisions. L'énoncé donne l'échelle autrement que
    d'habitude — $0$ à $1{,}0$ V sur **2** divisions, donc $0{,}50$ V par division — et
    $3{,}0 \times 0{,}50 = 1{,}5$ V.
  - (D) « $U_{max} = 1{,}5$ V et $m = 0{,}33$ : $m = U_{min}/U_{max}$ » →
    **`taux-modulation-calcul`**. `feedback` : la conversion est juste, la combinaison
    non. $U_{max} = A(1+m)$ et $U_{min} = A(1-m)$ : c'est la **différence sur la
    somme** qui élimine $A$. Ici $(1{,}5-0{,}5)/(1{,}5+0{,}5) = 0{,}50$.
- *solution :* 2 div $= 1{,}0$ V ⇒ $0{,}50$ V/div ; $U_{max} = 3{,}0\times0{,}50 =
  1{,}5$ V, $U_{min} = 1{,}0\times0{,}50 = 0{,}50$ V ; $m = 1{,}0/2{,}0 = 0{,}50 < 1$ :
  bonne modulation. *Le raccourci qui fait gagner du temps : $m$ est un rapport, donc
  $(3{,}0-1{,}0)/(3{,}0+1{,}0) = 0{,}50$ **en divisions**, sans convertir.*

**OEM-27** — `rung: "R3"`, `difficulty_level: 4`,
`habilete: application_experimentale`, même `primary_misconception`

- *stem :* Sur le même oscillogramme, réglé à **0,20 ms/div**, on compte **5
  oscillations de la porteuse par division**. **Que vaut la fréquence $F$ de la
  porteuse ?**
- *clé (A) :* $25$ kHz — une oscillation occupe $1/5$ de division, soit
  $T = 0{,}20/5 = 0{,}040$ ms, donc $F = 25$ kHz.
- *distracteurs :*
  - (B) « $1{,}0$ kHz : la période vaut 5 divisions, soit $1{,}0$ ms » →
    **`lecture-oscillogramme`** *(oscillations/division lu à l'envers)*. `feedback` :
    cinq oscillations **dans** une division, c'est une oscillation dans un **cinquième**
    de division. Ta lecture décrit un tracé **vingt-cinq fois** plus lâche. Le contrôle
    qui ne trompe pas : sur un écran de 10 divisions on verrait alors **deux**
    oscillations, pas cinquante.
  - (C) « $5{,}0$ kHz : une oscillation par division, $T = 0{,}20$ ms » →
    **`lecture-oscillogramme`** *(la sensibilité prise pour la période)*. `feedback` :
    $0{,}20$ ms est la durée d'**une division**, pas celle d'une oscillation — et
    l'énoncé dit qu'il y en a **cinq** par division.
  - (D) « $250$ Hz : $F = f_s \times 5$, puisque la porteuse fait cinq oscillations
    par cycle du signal » → **`porteuse-vs-signal-modulant`**. `feedback` : « cinq par
    division » n'est pas « cinq par cycle du signal » — la division est une unité de
    l'écran, le cycle du signal en occupe plusieurs. Et une porteuse à $250$ Hz serait
    **plus lente** qu'un signal audible : la condition $F \gg f$ serait violée.
- *solution :* $T = 0{,}20/5 = 0{,}040$ ms $= 4{,}0\times10^{-5}$ s ;
  $F = 1/(4{,}0\times10^{-5}) = 2{,}5\times10^{4}$ Hz $= 25$ kHz. *Contrôle : sur
  l'écran entier, $10 \times 5 = 50$ oscillations — un tracé très serré, cohérent avec
  ce qu'on voit sur les figures des sujets.*

### 8.4 Un quatrième item : la double inégalité du détecteur

Le drapeau de `bk-2025-n-x3` (`bank.yaml:794-806`) demande explicitement l'arbitrage :
« *à arbitrer si R4 doit gagner cette formulation explicite (c'est un classique des
sujets de démodulation)* ». Le §4.5 l'écrit dans la prose ; il faut un item qui
l'exerce.

**OEM-28** — `rung: "R4"`, `difficulty_level: 4`, `habilete: resolution_probleme`,
`primary_misconception: mc.physics.pc_ondes_em_modulation.demodulation-detecteur-crete`

- *stem :* Un signal modulé porte une porteuse de fréquence $F = 20$ kHz et un signal
  modulant de fréquence $f = 500$ Hz. On le démodule par un détecteur de crête dont le
  condensateur vaut $C_0 = 47$ nF. **Parmi les quatre résistances proposées, laquelle
  donne une démodulation correcte ?** ($R = 1{,}0$ kΩ · $10$ kΩ · $100$ kΩ · $1{,}0$ MΩ)
- *clé (B), $R = 10$ kΩ :* $RC_0 = 0{,}47$ ms. Il faut
  $1/F = 0{,}050$ ms $\ll RC_0 \ll 1/f = 2{,}0$ ms : $0{,}47$ ms est environ **9 fois**
  la borne de gauche et **4 fois moins** que celle de droite. C'est la seule des quatre
  qui tienne les deux.
- *distracteurs :*
  - (A) « $1{,}0$ kΩ, soit $RC_0 = 0{,}047$ ms : plus la décharge est rapide, mieux le
    condensateur suit les variations » → `demodulation-detecteur-crete` *(borne de
    gauche violée)*. `feedback` : $0{,}047$ ms est **plus petit** que $1/F = 0{,}050$ ms :
    entre deux crêtes de porteuse, le condensateur se vide presque entièrement. Sa
    tension **retombe sur la porteuse** au lieu de suivre l'enveloppe — c'est
    exactement ce qu'on cherchait à effacer.
  - (C) « $100$ kΩ, soit $RC_0 = 4{,}7$ ms : une décharge lente garantit qu'on ne perd
    aucune crête » → `demodulation-detecteur-crete` *(borne de droite violée)*.
    `feedback` : $4{,}7$ ms dépasse $1/f = 2{,}0$ ms, la période entière du signal. Le
    condensateur ne perd aucune crête, c'est vrai — et il **rate toutes les
    descentes** : sa tension s'en va presque tout droit et n'a plus la forme de
    l'enveloppe.
  - (D) « $1{,}0$ MΩ, soit $RC_0 = 47$ ms : c'est la plus grande, donc la plus sûre » →
    `demodulation-detecteur-crete` *(« lente = mieux », poussé à bout)*. `feedback` :
    $47$ ms vaut **vingt-trois périodes** du signal. La tension du condensateur ne
    descendrait pratiquement plus : on obtiendrait une quasi-constante, et le message
    serait entièrement perdu. « Décharge lente » ne veut pas dire « la plus lente
    possible » : il y a **deux** bornes, pas une.
- *solution / arithmétique (vérifiée) :* $1/F = 1/(2{,}0\times10^{4}) = 5{,}0\times10^{-5}$ s
  $= 0{,}050$ ms ; $1/f = 1/500 = 2{,}0\times10^{-3}$ s $= 2{,}0$ ms.
  $RC_0$ : $10^{3}\times4{,}7\times10^{-8} = 4{,}7\times10^{-5}$ s $= 0{,}047$ ms ·
  $10^{4}\times4{,}7\times10^{-8} = 4{,}7\times10^{-4}$ s $= 0{,}47$ ms ·
  $10^{5}\times4{,}7\times10^{-8} = 4{,}7\times10^{-3}$ s $= 4{,}7$ ms ·
  $10^{6}\times4{,}7\times10^{-8} = 4{,}7\times10^{-2}$ s $= 47$ ms ✓.
  Seul $0{,}47$ ms vérifie $0{,}050 \ll 0{,}47 \ll 2{,}0$ ✓. *Aucun de ces nombres ne
  coïncide avec ceux de `bk-2025-n-x3` ($162$ kHz, $5$ kHz, $1{,}5$ kΩ, $1\ \mu$F), dont
  la réponse doit rester à trouver.*

### 8.5 Le solde de couverture, honnête

**Après application** (`node web/scripts/resume-couverture.mjs` régénère) :

| | avant | après |
|---|---|---|
| `total_items` | 24 | **28** |
| `lecture-oscillogramme` | — | **3** (OEM-25, 26, 27) — **plancher atteint, marge nulle** |
| `demodulation-detecteur-crete` | 3 | **4** (+ OEM-28) |
| les six autres modèles | inchangés | inchangés |
| `ramp_coverage` R3 | 4 | **7** |
| `ramp_coverage` R4 | 4 | **5** |

**Ce que ce paquet NE referme pas, et il faut le dire.** Le champ `habilete` **n'existe
sur aucun des 24 items existants** ; les quatre neufs le porteront
(3 × `application_experimentale`, 1 × `resolution_probleme`), ce qui **ne rend pas** le
mélange 50 / 15 / 35 calculable — c'est `DECISIONS-EN-ATTENTE` §3, et cette livraison
ne la tranche pas (§13.9). Ce qu'elle change est réel et plus modeste : **un geste que
sept sujets sur sept exigent et qu'aucun item n'exerçait est enfin exercé**, et **le
critère que `bk-2025-n-x3` réclame depuis son drapeau est enfin enseigné et testé**.

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.4,
`frontiere`), **et chacune avec son essai rouge** (§11.5, sabotage 16).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée absente
> que si l'on a énuméré ses formes*). Interdire « spectre » sans interdire « raie »
> laisse passer la phrase ; interdire « résonance » sans interdire « facteur de
> qualité » laisse passer la formule. Chaque ligne liste donc les **variantes
> d'écriture**, symbole et forme LaTeX comprises, et la porte les cherche dans le texte
> **rendu** (après KaTeX), pas dans la source. *Rappel de la porte des noyaux : `\b`
> ignore les accents — chercher en **début de mot** et en Unicode.*

1. **Aucun spectre, aucune bande latérale.** *Ce n'est PAS une exclusion du cadre* — le
   cadre liste « connaître et exploiter le **spectre de fréquences** »
   (`pc-physique-chimie.yaml:236`) et 2023 N q3 le demande (0,5 pt). **C'est une
   frontière d'INSTRUMENT** : un oscilloscope en fonction du temps ne montre pas un
   spectre, et une scène qui en dessinerait un changerait d'appareil au milieu
   d'elle-même. Interdits : `spectre`, `spectral`, `raie`, `bande latérale`,
   `bandes latérales`, `f_p \pm f_s`, `f_p - f_s`, `f_p + f_s`, `F \pm f`,
   `produit-somme`, `Fourier`, `domaine fréquentiel`, `largeur de bande`,
   `encombrement spectral`. *Dette signalée, pas soldée : §0.3, §13.7.*
2. **Aucun régime sinusoïdal forcé, aucune résonance, aucune impédance.** Exclusion
   n° 1 du sous-domaine. Interdits : `résonance`, `résonant`, `impédance`, `Z =`,
   `réactance`, `déphasage`, `phaseur`, `facteur de qualité`, `bande passante`,
   `Q =`, `pulsation propre`, `\omega_0`.
3. **Aucune notation complexe.** Exclusion n° 2. Interdits : `\underline{u}`,
   `j\omega`, `nombre complexe`, `module et argument`, `partie imaginaire`,
   `exponentielle complexe`.
4. **Aucune puissance en régime alternatif.** Exclusion n° 3. Interdits :
   `puissance active`, `puissance réactive`, `facteur de puissance`, `valeur efficace`,
   `U_{eff}`, `RMS`, `watt`, `\text{W}` **en position d'unité**.
5. **Aucun composant actif comme objet d'étude.** Exclusion n° 4 — **et c'est elle qui
   décide du dessin du multiplieur** : un rectangle marqué « X », deux entrées, une
   sortie, **jamais de schéma interne**. Interdits : `transistor`,
   `amplificateur opérationnel`, `ampli op`, `AO`, `gain différentiel`,
   `push-pull`, `alimentation symétrique`, `circuit interne`.
6. **Aucune fonction de transfert, aucun Bode, aucune conception de filtre.** `limites`
   du chapitre : « *PAS de fonction de transfert, PAS de diagramme de Bode, PAS de
   conception quantitative de filtre* ». Interdits : `fonction de transfert`, `H(j`,
   `Bode`, `décibel`, `dB`, `gain`, `atténuation`, `fréquence de coupure`, `f_c`,
   `passe-bas`, `passe-haut`, `passe-bande`, `premier ordre`, `logarithmique`,
   `semi-log`, `log`. *Le mot **filtre** seul n'est PAS interdit — il est au cadre ; ce
   sont ses formes quantitatives qui le sont. La scène, elle, n'en a pas besoin et ne
   l'emploie pas.*
7. **Aucun circuit accordé, aucune sélection de station.** C'est R5, **après** —
   frontière de RANG (précédent : le tremplin, ADR 0041 addendum du 2026-09-25,
   point 3). Interdits : `circuit bouchon`, `circuit accordé`, `circuit d'accord`,
   `accord`, `accordé`, `f_0`, `\frac{1}{2\pi\sqrt{LC}}`, `2\pi\sqrt{LC}`, `LC`,
   `bobine`, `inductance`, `condensateur variable`, `station`, `antenne`,
   `récepteur radio`, `sélection`, `sélectif`.
   *Le mot **condensateur** seul est autorisé à partir de S4 : c'est $C_0$, le
   condensateur du détecteur. La sonde distingue `condensateur variable` de
   `condensateur`.*
8. **Aucune modulation de fréquence ni de phase.** Hors chapitre. Interdits : `FM`,
   `modulation de fréquence`, `modulation de phase`, `excursion`, `bande étroite`.
9. **Aucune démodulation synchrone, aucun changement de fréquence.** *Ce n'est pas une
   exclusion imprimée : c'est une frontière de scène, justifiée par une mesure* — les
   dix entrées de banque démodulent **toutes** par détecteur de crête, et ni
   `lesson.md` ni le cadre ne nomment autre chose (§2.5). Interdits :
   `démodulation synchrone`, `démodulation cohérente`, `oscillateur local`,
   `hétérodyne`, `superhétérodyne`, `fréquence intermédiaire`, `battement`,
   `multiplication par la porteuse`, `mélangeur`.
10. **Aucune antenne, aucune longueur d'onde, aucun $\lambda/4$.** C'est R1, avant ; la
    scène est une paillasse entre un multiplieur et un oscilloscope. Interdits :
    `\lambda`, `\lambda/4`, `quart d'onde`, `longueur d'onde`, `c = 3`,
    `3{,}00\times10^{8}`, `rayonne`, `rayonnement`, `onde électromagnétique`,
    `propagation`.
11. **Aucune vitesse de transmission, aucun débit.** `savoir_faire` du chapitre, mais
    pas de cette scène. Interdits : `débit`, `bit/s`, `bits par seconde`, `bauds`,
    `vitesse de transmission`, `numérique`, `échantillonnage`.
12. **Aucun pourcentage d'ondulation, aucune frontière chiffrée de décrochage.**
    `limites` du cadre (traitement qualitatif et fonctionnel) et §10.5. Interdits :
    `ondulation`, `taux d'ondulation`, `ripple`, `2\pi f m`, `\frac{1}{2\pi f m}`, et
    tout `%` **appliqué à la sortie du détecteur**.
13. **Aucune incertitude, aucun ±.** L'écran est parfait et le dit autrement (§10.2).
    Interdits : `incertitude`, `±`, `\pm`, `erreur de lecture`, `précision de`,
    `demi-carreau près`.
14. **Aucune valeur en arbitrage du sujet 2017 N.** §0.1. Interdits : `2017`,
    `T_p = 0{,}5\ \text{ms}`, `F_p = 2`, `2 kHz` **en position de fréquence de
    porteuse**, `2000 Hz`, `2{,}0\ \text{kHz}`.
    *Mesuré : les quatre crans de `porteuse` sont 1,2 · 2,4 · 4,0 · 8,0 kHz —
    2,0 kHz n'est pas atteignable, et la porte le vérifie sur le registre ET sur le
    rendu.* **La chaîne « 0,50 ms » existe légitimement deux fois dans le panneau** (le
    balayage `0,50 ms/div` et la constante $R_0C_0 = 0{,}500$ ms) : la sonde de cette
    ligne cherche `0,5 ms` **au voisinage de** `T_p`, `période de la porteuse` ou
    `F_p`, jamais la chaîne nue.
15. **La scène ne remplace pas le TP.** Le cadre en liste un (« modulation d'amplitude,
    démodulation, réaliser un récepteur AM simple ») ; la scène en répète le **geste**
    et le dit (§10.2). Interdits dans les champs rendus : `travaux pratiques`, `TP`,
    `on a mesuré au laboratoire`, `manipulation réelle`.
16. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester indéfini
    même panneau OUVERT** — famille de porte à part entière (§11.4, `pas-de-3d`).

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus dangereuse. Et
ici, le défaut mesuré des médias existants est **exactement** un défaut d'échelle de
temps à moitié tu (§2.1) : cette scène n'a pas le droit de le refaire.

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points 1 à 4
> SEULEMENT**, et ce sont aussi les phrases de légende. **Les points 5 à 9 ne sont
> rendus nulle part** : ce sont des notes de conception, pour l'auteur et pour la revue.

1. **C'est un banc de TP, pas un émetteur de radio — et le rapport est ÉCRIT.** La
   porteuse de cette scène va de $1{,}2$ à $8{,}0$ kHz, soit un rapport $F/f$ de **3 à
   20**. C'est exactement ce que montrent les oscillogrammes des sujets (2023 N :
   $4$ kHz / $200$ Hz ; 2015 N : $5{,}0$ kHz / $250$ Hz ; 2025 R : $20$ kHz /
   $1{,}7$ kHz ; 2021 N : $\approx 1{,}5$ kHz / $125$ Hz). Une vraie porteuse de radio
   AM — les $900$ kHz du chapitre 2 — ferait **450 oscillations par division** : aucun
   écran ne la dessine. *Légende :* « Banc de TP : la porteuse est à quelques
   kilohertz, comme sur les oscillogrammes des sujets. Une porteuse de radio (900 kHz)
   ferait 450 oscillations par division — indessinable. »
   *Vérification du chiffre : $9{,}00\times10^{5} \times 0{,}50\times10^{-3} = 450$
   oscillations par division ✓, soit **112 fois** la densité du cran le plus serré de
   la scène (4 par division à $8{,}0$ kHz : $450/4 = 112{,}5$) et **750 fois** celle du
   plus lâche (0,6 par division à $1{,}2$ kHz : $450/0{,}6 = 750$).*
2. **Les crêtes sont calculées, pas mesurées.** L'écran est parfait : aucun bruit,
   aucune épaisseur de trait, aucune dérive, aucune base de temps qui glisse. Sur un
   vrai oscilloscope on lit $U_{max}$ et $U_{min}$ **au demi-carreau près**, et $m$ est
   connu à quelques pour cent. *Légende :* « Oscilloscope idéal : les hauteurs sont
   calculées. Sur un vrai écran, on lit au demi-carreau près, et $m$ à quelques pour
   cent. »
3. **La lecture se fait sur l'ENVELOPPE, la courbe que les crêtes touchent.** Sur un
   vrai oscillogramme, la crête la plus haute effectivement tracée n'atteint pas tout à
   fait le maximum de l'enveloppe, parce que la porteuse n'échantillonne pas exactement
   l'instant du maximum ; l'écart est d'autant plus petit que $F/f$ est grand. La scène
   lit l'enveloppe — **c'est aussi ce que font les sujets** (`bank.yaml:928` : « *aux
   maxima d'enveloppe les crêtes culminent à $\approx 9{,}7$ carreaux* »). *Légende :*
   « On lit l'enveloppe — la courbe que les sommets touchent —, comme le font les
   sujets. »
4. **Le détecteur est idéal, et même au meilleur réglage il ondule.** Diode parfaite
   (aucune tension de seuil, aucune résistance directe), condensateur parfait, charge
   instantanée à chaque crête. Et à $F/f = 20$, le meilleur réglage laisse encore une
   ondulation visible entre deux crêtes : c'est le prix d'une porteuse **dessinable**.
   Sur une radio réelle ($F/f \approx 300$), la même ondulation serait environ quinze
   fois plus fine. *Légende :* « Diode et condensateur parfaits. L'ondulation qui reste
   au meilleur réglage vient de ce que la porteuse n'est que 20 fois plus rapide que le
   signal ; sur une vraie radio elle l'est 300 fois. »
5. *(non rendu — note de conception)* **La frontière exacte du décrochage est
   $R_0C_0 = \dfrac{1}{2\pi f m}$** — le condensateur décroche quand sa vitesse de
   décharge, $u_C/\tau$, tombe sous la pente maximale de l'enveloppe, $A\,m\,2\pi f$.
   À $f = 400$ Hz : **0,796 ms** pour $m = 0{,}50$ ; $1{,}59$ ms pour $m = 0{,}25$ ;
   $0{,}53$ ms pour $m = 0{,}75$. **Jamais affichée** (§9.12) : le cadre traite la
   démodulation de façon qualitative et fonctionnelle, et les sujets écrivent la double
   inégalité en ordres de grandeur. *La porte, elle, a le droit de la mesurer — règle de
   la cuve.* **Conséquence assumée :** à l'étape libre, un élève peut tomber sur un
   réglage marginal (par exemple $m = 0{,}75$ avec $R_0C_0 = 0{,}500$ ms, à $6$ % de la
   frontière). **C'est pour cela que la scène n'affiche AUCUN verdict « bonne / mauvaise
   démodulation » comme lecture** (§5.10) : elle affiche trois durées et laisse
   conclure.
6. *(non rendu)* **La lecture graphique de $m$ sature à 1,00** (§5.6). Aucune entrée de
   banque ne demande un $m$ numérique supérieur à 1 (mesuré : 0,33 · 0,50 · 0,50 · 0,60
   · 0,67 — **les cinq sont inférieurs à 1**). La scène affiche les deux lectures côte à
   côte à S3 précisément pour que l'élève voie **où** la méthode s'arrête.
7. *(non rendu)* **Le $\sin$ au lieu du $\cos$** (§5.2) : un simple changement d'origine
   des temps, choisi pour que les quatre extrema d'enveloppe tombent à l'intérieur du
   cadre. Aucune lecture n'en dépend. *Si un jour la scène doit reproduire la figure
   d'un sujet au pixel, ce choix devra être revu — les sujets écrivent $\cos$.*
8. *(non rendu)* **$k$ et $P_m$ ne sont jamais donnés par les sujets**, parce que le
   rapport des extrema les élimine. La scène les donne ($k = 0{,}250$ V⁻¹,
   $P_m = 2{,}00$ V, donc $kP_m = 0{,}500$) **pour une seule raison pédagogique** :
   rendre $A$ calculable et rendre **visible** que $A \neq U_0$ (§4.3). C'est un choix
   d'enseignement, pas une donnée de sujet — et c'est la décision de propriétaire
   §13.5.
9. *(non rendu)* **Quatre sous-graduations par division, et non cinq** (§5.1) : un écart
   à la convention des oscilloscopes réels, pris pour que les neuf couples d'extrema
   tombent exactement sur un trait. *Si le propriétaire préfère la fidélité matérielle à
   l'exactitude de lecture, il faut changer les crans de $U_0$ et de $S_m$, pas la
   grille — et refaire la table du §5.4.* §13.6.

---

## 11. La porte (`web/scripts/scene-modulation.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="banc-de-modulation"]`, **jamais**
par `[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du champ
magnétique, run 747). Elle se lance **plusieurs fois, à plusieurs largeurs**
(**1 280 px et 390 px** au minimum) avant d'être crue. Quatre verdicts honnêtes
(ADR 0034 / 0038) : **ROUGE**, **AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le
contexte Canvas 2D n'est pas disponible au banc, elle sort **MUET, en échec**, jamais
en vert.

**Le calcul de cette scène est ANALYTIQUE de bout en bout — y compris le détecteur
(§5.2) — donc la porte refait les NOMBRES** (règle de la corde, ADR 0041, addendum du
2026-09-24 après-midi : *une seconde voie analytique recalcule des nombres ; une
simulation n'établit que des invariants*). Elle les recalcule **sans importer aucun
module du produit** (ADR 0036 : une porte qui importe le module se donne raison),
depuis les seules constantes de cette spec, et exige l'**égalité de CHAÎNE** sur les
valeurs **affichées**.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $U_{max}$ et $U_{min}$ aux **9** couples $(U_0, S_m)$ | la table du §5.4 | **égalité de chaîne** avec `extrema`, en div **et** en V |
| N2 | $A = kP_mU_0$ aux 3 valeurs de $U_0$ | 1,00 · 1,50 · 2,00 V | égalité de chaîne avec `amplitude-a` ; **et $A \neq U_0$ aux trois** |
| N3 | $m_{lu} = \dfrac{U_{max}-U_{min}}{U_{max}+U_{min}}$ aux 9 couples | 0,25 · 0,33 · 0,50 (×2) · 0,67 · 0,75 · **1,00** (×3) | égalité de chaîne avec `taux-lu`, 2 déc. |
| N4 | $m = S_m/U_0$ aux 9 couples | 0,25 → **1,50** | égalité de chaîne avec `taux-regle` ; **et `taux-lu` $\neq$ `taux-regle` aux 3 couples où $m > 1$, égaux aux 6 autres** |
| N5 | $T_p$, $F$, le comptage, $T_{env}$, $f$, $F/f$ aux **4** crans de `porteuse` | la table du §5.5 | égalité de chaîne ; **le comptage est un ENTIER** (6 · 12 · 20 · 40) |
| N6 | $\tau = R_0C_0$ aux **5** crans | 0,0500 · 0,200 · 0,500 · 1,00 · 2,50 ms | égalité de chaîne avec `constante-temps`, 3 c.s. |
| N7 | la chaîne `fenetre` : $1/F$, $R_0C_0$, $1/f$ aux $4\times5 = 20$ couples | 0,125 → 0,833 ms · 0,0500 → 2,50 ms · 2,50 ms | égalité de chaîne, 3 c.s. |
| N8 | **la récurrence du détecteur** (§5.2), rejouée depuis la spec, aux 20 couples × 9 réglages d'entrée | la courbe $u_C$ point par point | **$10^{-9}$** sur chaque valeur de crête ; l'amorçage refait à l'identique |
| N9 | les **zéros de l'enveloppe** aux 3 couples surmodulés | $\sin = -1/m$ ; à $m=1{,}50$ : 3,08 · 4,42 · 8,06 · 9,42 div ; à $m=1{,}00$ : **un point de contact**, 3,75 et 8,75 div | 0,02 div |
| N10 | les **positions des 4 extrema d'enveloppe** | 1,25 · 3,75 · 6,25 · 8,75 div, **à tous les réglages** | 0,02 div — *c'est la mesure du $\sin$ déclaré, §5.2* |
| N11 | le **plein-écran** : $\max U_{max}$ aux 9 couples | **3,50 div $<$ 4,00 div** | exact — aucun réglage ne sort du cadre |
| N12 | les **bornes** : `porteuse` a 4 valeurs, `modulante` 3, `continue` 3, `detecteur` 5 ; **$2{,}0$ kHz n'est PAS dans `porteuse`** | — | exact, lu sur le registre **et** sur le DOM |

### 11.2 Ce que la porte a le droit de mesurer et que le produit n'a pas le droit d'enseigner

Règle de la cuve (ADR 0041, addendum du 2026-09-24, point 3).

| # | ce que la porte mesure | attendu |
|---|---|---|
| M1 | l'**ondulation** du détecteur entre deux crêtes, $1-e^{-T_p/\tau}$, sur les pixels du tracé $u_C$ | 91,8 · 46,5 · 22,1 · 11,8 · 4,9 % à $F = 8{,}0$ kHz (§5.7), à 2 points de pourcentage |
| M2 | le **décrochage** : $u_C$ au-dessus de l'enveloppe de plus de 0,10 div pendant la descente | **absent** à $\tau = 0{,}500$ ms ; **présent** à $1{,}00$ et $2{,}50$ ms ; *(à $0{,}0500$ et $0{,}200$ ms, $u_C$ redescend sous l'enveloppe entre les crêtes — c'est l'autre échec, mesuré par M1)* |
| M3 | la **frontière exacte** $1/(2\pi f m)$ : $\tau$ juste au-dessous / juste au-dessus fait basculer M2 | cohérent à 5 % — *jamais affiché par le produit (§9.12)* |

### 11.3 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de la grille de la scène**, jamais au pixel
absolu : le facteur px/division est **lu sur le quadrillage** (leçon de la porte du
champ magnétique — « une sonde qui lit un détail de dessin se règle sur l'ÉCHELLE, pas
sur le pixel »). Lancée à **1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`enveloppe-inerte`** | **LA MESURE CENTRALE (§2.2).** Aux **4** crans de `porteuse`, à $U_0$ et $S_m$ fixés : la **colonne-maximum** du tracé (l'ordonnée de la crête la plus haute de chaque colonne de pixels) est **identique** d'un cran à l'autre, à $\le 1$ px, en **tous** les points où les deux tracés ont une crête ; et les 4 extrema tombent à 1,25 · 3,75 · 6,25 · 8,75 div | une enveloppe qui change de période, d'amplitude ou de phase avec $F$ doit rougir **seule** |
| `cretes-et-grille` | la hauteur **en pixels** des crêtes aux renflements et aux resserrements $=$ `extrema` × (px/div lus sur la grille), à $\le 1$ px, aux **9** couples | une crête dessinée depuis un autre nombre que celui affiché doit rougir |
| `comptage` | le nombre de **maxima locaux** du tracé $u_S$ sur la largeur de l'écran vaut exactement 6 · 12 · 20 · 40 | un tracé dont la densité ne suit pas $F$ doit rougir |
| `grille` | 10 colonnes × 8 lignes de divisions, **4 sous-graduations** par division, équidistantes à $\le 1$ px ; les deux axes médians tombent **sur** une ligne majeure ; les étiquettes `1,00 V/div` et `0,50 ms/div` présentes | 5 sous-graduations, un pas irrégulier, un axe entre deux traits, ou une calibration absente doivent rougir |
| `pincement` | **aux 3 couples surmodulés** : le tracé **touche l'axe** (ordonnée à $\le 1$ px de l'axe) en 3,08 · 4,42 · 8,06 · 9,42 div ($m = 1{,}50$) ; la **bosse secondaire** culmine à 0,50 div ; et **la crête qui la compose est en opposition de phase** (son signe est inversé par rapport aux crêtes voisines) | **aux 6 couples $m < 1$** : le tracé **ne touche jamais** l'axe. Une enveloppe qui se replierait sans changer la phase de la porteuse doit rougir **seule** |
| `contact-exact` | **à $m = 1{,}00$ exactement** (deux couples) : **un seul** point de contact par creux, à 3,75 et 8,75 div, **aucune bosse secondaire** | un « presque tangent » (contact à $\ge 2$ px de l'axe, ou deux contacts) doit rougir — *règle de la sphère* |
| `deux-traces` | quand `sortie: "modulee-et-detectee"` : **deux** tracés distinguables — $u_C$ **partout $\ge 0$** et **partout $\ge$** la colonne-maximum de $u_S$ à $\le 1$ px près sur les crêtes ; $u_S$ **symétrique** autour de l'axe ; leurs deux noms posés sans chevauchement | un seul tracé, ou un $u_C$ qui descend sous zéro, ou deux tracés confondus (indiscernables sur toute colonne située entre deux crêtes) doivent rougir |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**, jamais en luminance — ADR 0041, cinquième scène) ; aucune double flèche ; aucun crochet ; aucun trait d'extremum ; aucun marqueur de pincement ; **à S4, aucun tracé $u_C$ et aucun étage de détection dans le schéma** ; aucune lecture-réponse dans le DOM | après l'engagement : chacun de ces éléments apparaît, et l'accent avec |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème ; **$u_S$ et $u_C$ n'ont AUCUNE différence de teinte** (ils ne diffèrent que par l'épaisseur) | distinguer les deux tracés par la couleur doit rougir **seule** (§6) |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.4 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucune boucle) ·
`etapes` (chaque étape pose son état, n'ouvre que **son** contrôle, les autres
**absents du DOM** ; `etat_revele` appliqué à la révélation **et** au retour sur une
étape déjà révélée ; la région vivante **dit** le réglage posé à S3 et à S4) ·
`paris` (4 choix, exactement un juste, un `retour` par choix, rien dans la région live
avant l'engagement) ·
**`formule-graduee`** (la table du §7.6, lue dans le `textContent` **rendu**,
annotations TeX comprises, **dans les deux sens** : absente avant, présente après —
**une sonde par chaîne**) ·
**`fuite-inter-etapes`** (la porte **réécrit elle-même** la table du §7.6 contre le
descripteur : `porteuse` n'est ouvert qu'à S1 et S5, `modulante` qu'à S2 et S5,
`continue` qu'à S3 et S5, `detecteur` qu'à S4 et S5 ; **`sortie: "modulee-et-detectee"`
n'existe qu'à partir de la révélation de S4** ; et **le couple ($F = 1{,}2$ kHz,
détecteur branché) est inatteignable avant S5**) ·
`frontiere` (aucune des chaînes du §9 dans le panneau ouvert, **une sonde par forme**,
cherchée en début de mot et en Unicode) ·
`immobile` (rien ne bouge au repos : la scène n'a ni temps ni course ; aucune fenêtre
de 10° ne s'éclaire — **attendu structurellement vide**, mesuré quand même ;
`prefers-reduced-motion` : rien à honorer, aucune transition introduite) ·
`katex` (aucun LaTeX brut visible ; $u_S$, $u_C$, $U_{max}$, $U_{min}$, $R_0C_0$,
$\ll$ rendus par KaTeX — jamais par la police du chrome, ADR 0030) ·
`etiquettes` (aucune étiquette n'en chevauche une autre, n'est barrée par un trait, ne
se pose sur de l'encre, ni ne sort du cadre — à 1 280 **et** à 390 px ; pièce commune
`disposer`, **obligatoire ici** : « $u_S$ », « $u_C$ », les cotes de $U_{max}$ et
$U_{min}$ et la double flèche de période se croisent au réglage $m = 0{,}75$) ·
`ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs` : ouvrir, parier, avancer,
revenir **au clavier** sans perdre le focus ni le pousser hors de l'écran ; toute cible
$\ge 44$ px, `<summary>` compris ; colonne de réglages $\ge$ 18rem ;
`scroll-margin-top` **vérifié en donnant le focus**) ·
`console` (aucune erreur).

### 11.5 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette
commande** (ADR 0034). Sabotages à outiller, un par famille :

1. poser $U_{min} = kP_m(U_0 - S_m)$ **sans valeur absolue ni plancher à 0** (donc
   négatif quand $m>1$) → `nombres` (N1, N3), `pincement` ;
2. poser $m_{lu} = U_{min}/U_{max}$ (le distracteur de S2 réalisé) → `nombres`
   (N3) **seule** ;
3. poser $A = U_0$ (oublier $kP_m$) → `nombres` (N2) **seule** — *le sabotage qui
   réalise le BLOQUANT n° 2 dans le code* ;
4. faire dépendre l'enveloppe de $F$ (un facteur $1/F$ glissé dans l'amplitude) →
   **`enveloppe-inerte`** **seule** ;
5. rendre le comptage de porteuse non entier (échantillonner le tracé sur une grille
   qui glisse avec $F$) → `comptage`, `nombres` (N5) ;
6. supprimer l'opposition de phase sous la bosse de surmodulation (dessiner
   $A(1+m\sin)$ en valeur absolue **sans** retourner la porteuse) → `pincement`
   **seule** ;
7. dessiner un contact « presque tangent » à $m = 1{,}00$ (arrondir $U_{min}$ à
   0,02 div au lieu de 0) → `contact-exact` **seule** ;
8. inverser les deux bornes du détecteur (décharger de $e^{+T_p/\tau}$) → `nombres`
   (N8), M1, M2 ;
9. supprimer la décharge entre les crêtes ($u_C$ en escalier qui ne redescend jamais) →
   M1, M2, `deux-traces` ;
10. poser $\tau = R_0/C_0$ au lieu de $R_0C_0$ → `nombres` (N6, N7) ;
11. faire descendre $u_C$ sous zéro → `deux-traces` **seule** ;
12. distinguer $u_S$ et $u_C$ par la **couleur** → `palette` **seule** ;
13. passer la grille à **5 sous-graduations** par division → `grille` **seule** — *et
    c'est le sabotage qui prouve que le choix du §5.1 est mesuré, pas décoratif* ;
14. décaler la phase de l'enveloppe (revenir au $\cos$) → `enveloppe-inerte` (N10)
    **seule** ;
15. afficher la double flèche, un trait d'extremum, un marqueur de pincement, le tracé
    $u_C$ ou l'étage de détection **avant** le pari → `avant-pari` ;
16. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR
    FORME**, jamais une seule pour la liste entière (ADR 0036). La porte déclare une
    sonde nommée par forme, et l'essai rouge les parcourt toutes : `spectre`, `raie`,
    `bande latérale`, `f_p + f_s`, `Fourier` · `résonance`, `impédance`, `déphasage`,
    `facteur de qualité` · `j\omega`, `nombre complexe` · `valeur efficace`, `RMS` ·
    `transistor`, `amplificateur opérationnel` · `fonction de transfert`, `Bode`, `dB`,
    `fréquence de coupure`, `passe-bas` · `circuit bouchon`, `accord`, `f_0`, `LC`,
    `bobine`, `antenne`, `station` · `FM`, `modulation de fréquence` ·
    `démodulation synchrone`, `oscillateur local`, `hétérodyne` · `\lambda`,
    `quart d'onde`, `rayonne` · `débit`, `bauds` · `ondulation`, `ripple` ·
    `incertitude`, `\pm` · `2017`, `F_p = 2`, `2{,}0\ \text{kHz}` · `TP`,
    `travaux pratiques`. **Chacune doit faire rougir `frontiere` SEULE** ; une forme
    qui ne fait rien rougir est une sonde manquante, pas un produit propre ;
17. écrire « $m = \frac{U_{max}-U_{min}}{U_{max}+U_{min}}$ » dans le retour de S1, ou
    « surmodulation » dans celui de S2, ou « $R_0C_0$ » dans celui de S3 →
    `formule-graduee` **seule**, **une mesure par ligne de la table du §7.6** ;
18. ouvrir `modulante` dès S1, ou poser `sortie: "modulee-et-detectee"` à S1, ou régler
    S2 à $U_0 = 2{,}0$ (ce qui rendrait $m \ge 1$ atteignable avant S3) →
    `fuite-inter-etapes` **seule** ;
19. ajouter `2.0` aux crans de `porteuse` → `nombres` (N12), `frontiere` (forme
    `2{,}0\ \text{kHz}`) ;
20. `import("three")` dans le module de la scène → `pas-de-3d` ;
21. faire sortir le tracé du cadre (retirer le bornage du §5.3, par exemple en ajoutant
    $S_m = 4{,}0$) → `nombres` (N11), `cretes-et-grille`.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que
**la** porte qui le garde : si le sabotage 4 fait aussi rougir `cretes-et-grille`,
c'est que les deux familles mesurent la même chose et qu'il faut en resserrer une.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la
question héritée, §13.14) :

```json
"banc-de-modulation": {
  "temps": false,
  "dimension": "2d",
  "controles": ["porteuse", "modulante", "continue", "detecteur"],
  "etat": ["F_khz", "Sm_v", "U0_v", "R0_kohm", "sortie", "reference"],
  "valeurs": {
    "F_khz": ["1.2", "2.4", "4.0", "8.0"],
    "Sm_v": ["1.0", "2.0", "3.0"],
    "U0_v": ["2.0", "3.0", "4.0"],
    "R0_kohm": ["0.5", "2.0", "5.0", "10", "25"],
    "sortie": ["modulee", "modulee-et-detectee"],
    "reference": ["aucune", "depart"]
  },
  "lectures": ["calibration", "comptage-porteuse", "porteuse-lue", "signal-lu",
               "rapport-frequences", "extrema", "amplitude-a", "taux-lu",
               "entrees", "taux-regle", "constante-temps", "fenetre"]
}
```

*Aucune clé `course`, aucune clé `bornes` : la scène n'a ni temps ni course (§6), et
tous ses réglages sont des **énumérations de chaînes** — exactement comme `a_mm` au
banc, `f_hz` à la cuve, `v_ms` à la corde et `t_demi_j` aux noyaux. **Aucune machinerie
nouvelle dans `validate-content`.***

**Table des états, à recopier dans le descripteur :**

| étape | `F_khz` | `Sm_v` | `U0_v` | `R0_kohm` | `sortie` | `reference` | `etat_revele` | contrôle neuf |
|---|---|---|---|---|---|---|---|---|
| **S1** | **`4.0`** | `2.0` | `4.0` | `5.0` | `modulee` | `aucune` | — | `porteuse` |
| **S2** | `4.0` | **`2.0`** | `4.0` | `5.0` | `modulee` | `aucune` | — | `modulante` |
| **S3** | `4.0` | `3.0` | **`4.0`** | `5.0` | `modulee` | **`depart`** | **`{ "U0_v": "2.0" }`** | `continue` |
| **S4** | **`8.0`** | `2.0` | `4.0` | **`25`** | `modulee` | `aucune` | **`{ "sortie": "modulee-et-detectee" }`** | `detecteur` |
| **S5** | **`1.2`** | `2.0` | `4.0` | `5.0` | **`modulee-et-detectee`** | `aucune` | — | — *(les quatre rouverts)* |

**Champs du descripteur, au-delà des étapes** (modèle : `banc-de-diffraction.json`) :
`slug`, `tool: "scene2d"`, `type: "manipulable"`, `scene: "banc-de-modulation"`,
`title_fr`, `caption_fr`, `boundary` (le §9 en une phrase dense), `fit_caveat` (les
points **1 à 4** du §10 **seulement**), `fallback_note`, `pedagogy_wiring`
(`why_manipulable`, `predict_then_reveal`, `misconceptions` — la liste des ids employés
par les paris, **`lecture-oscillogramme` comprise**), `spec_ref`, `adr_ref`.

**`title_fr` proposé :** « Le banc de modulation : un multiplieur, un écran, un
détecteur ».

**`fallback_note` proposée :** « Sans JavaScript et à l'impression, le panneau
disparaît. Les figures `modulation-amplitude` (R2) et `bonne-surmodulation` (R3)
couvrent les deux formes statiques — une bonne modulation, une surmodulation — et
`detecteur-crete` (R4) couvre le principe du détecteur. **Aucune** figure du corpus ne
porte de quadrillage, de sensibilité, d'extrema chiffrés, ni de réglage : c'est
précisément ce que le banc apporte, et c'est pourquoi les retouches de prose des §4.4
et §4.5 l'écrivent en toutes lettres. »

**Ordre de construction, et ce qui doit être vert avant l'étape suivante :**

1. **`items.yaml`** — déclarer `lecture-oscillogramme` (§8.2) et écrire **OEM-25 à
   OEM-28** (§8.3, §8.4) ; régénérer `coverage_summary` (`total_items: 28`).
   **`validate-content --strict` vert avant la suite** : depuis le manège, un pari de
   scène doit nommer un modèle **DÉCLARÉ** (ADR 0041, addendum du 2026-09-24), et la
   scène ne validera pas sans lui.
2. **`web/src/lib/scene2d/modulation-modele.ts`** — le produit, l'enveloppe, les
   extrema, les périodes, et **la récurrence du détecteur** (§5.2) ; aucun rendu,
   aucune couleur. **Le plancher de $U_{min}$ à 0 quand $m \ge 1$ est STRUCTUREL**
   (une branche explicite), jamais obtenu par un arrondi — précédent : le moment nul du
   manège. Test unitaire `web/scripts/test-modulation.mjs` : les 9 couples du §5.4, les
   4 crans du §5.5, les 5 régimes du §5.7, les zéros du §5.6, à $10^{-12}$.
3. **`web/src/lib/scene2d/modulation-rendu.ts`** — le montage, l'écran, **la grille à 4
   sous-graduations**, les deux tracés à deux épaisseurs, les cotes ; palette lue dans
   les jetons (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui importerait
   three) ; **courbes tracées sur une grille de pixels FIXE** (règle de la corde : une
   grille qui glisse fait trembler les sommets) ; étiquettes posées par `disposer`,
   jamais par `poser`.
4. **`web/src/components/notion/scene/ModulationPanel.tsx`** — les contrôles, les
   lectures, les paris.
5. **`scenes.json`** + le descripteur `media/banc-de-modulation.json`.
6. **Les six blocs de prose (§4)**, **le §4.1 avant le marqueur**.
7. **`web/scripts/scene-modulation.mjs`** — la porte, **avec son `--essai-rouge`** ;
   lancée **deux fois** à **quatre** largeurs avant d'être crue.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut

1. **Cette notion, malgré les deux BLOQUANTS ?** (§0). **Recommandation : oui.** Le
   premier ne touche **aucun fichier** de cette livraison et la scène s'en écarte
   **mesurablement** (2,0 kHz absent de ses crans, gardé par la porte, §9.14) ; le
   second n'est pas contourné mais **armé** (§0.2, §13.2). Et le trou est le plus gros
   du corpus PC sur ce point : 10 entrées, 9 années, 7/7 lectures d'oscillogramme,
   0 item qui l'exerce, 0 % d'application expérimentale contre 3,15 % de cible.
   *Réversible : cette spec ne touche rien tant qu'elle n'est pas adoptée.*
2. **LA QUESTION CENTRALE — la réconciliation de notation $U_0$ / $P_m$ / $A$** (§4.3,
   §0.2). La leçon écrit « $U_0$ est **son amplitude** » en parlant de la **porteuse**
   (`lesson.md:73`) ; les sujets appellent $U_0$ la **composante continue de la
   modulante** et notent $P_m$ l'amplitude de la porteuse. **Recommandation :
   adopter la réconciliation du §4.3 telle qu'écrite** — elle n'efface aucune phrase
   existante, elle ajoute une sous-section qui dit : *le taux $m$ compare toujours
   $S_m$ à la composante continue de la modulante ; les deux écritures ne diffèrent que
   par le facteur $kP_m$, qui vaut 1 dans le cas d'école de R2.* C'est la réponse
   directe au risque chiffré du `REVIEW-2026-09-12`. **Réponse alternative, si le
   propriétaire refuse :** poser $k = 0{,}500$ V⁻¹ et $P_m = 2{,}00$ V de sorte que
   $kP_m = 1{,}00$, retirer la lecture `amplitude-a` et le §4.3 — la scène reste
   entière, elle perd seulement le désamorçage du piège, et les tables du §5.4 doivent
   être refaites ($U_{max} = U_0+S_m$, donc les crans de $U_0$ et $S_m$ doivent être
   divisés par deux pour tenir dans le cadre).
3. **Le huitième modèle `lecture-oscillogramme`** (§8.2) : l'ouvrir avec ses trois
   items, ou élargir un modèle existant ? **Recommandation : ouvrir.** Les sept modèles
   déclarés sont tous des modèles de **rôle** ou de **formule** ; aucun ne décrit une
   erreur de **lecture**, et la banque nomme l'erreur trois fois dans ses propres
   « pièges » sans qu'aucun item ne la tague. *Réversible : une entrée d'inventaire,
   quatre étiquettes d'items, deux choix de paris.*
4. **Le placement en tête de R3** (§3), qui fait ouvrir le chapitre par un manipulable,
   impose de nommer multiplieur, division et sensibilité **dans la consigne** avant que
   la prose ne les écrive, et loge une sous-section « le multiplieur » dans un rung
   intitulé « la condition de bonne modulation ». **Recommandation : garder.** C'est le
   seul placement qui laisse les **cinq** paris entiers (table du §3), et les trois
   points d'arrêt existants n'y bougent pas d'un caractère. *Alternative écrite : un
   rung « R2bis » à part, qui coûterait une renumérotation des ~45 renvois
   « chapitre N » de `bank.yaml` — **à ne pas faire à la légère**, la campagne #18 a
   déjà corrompu une note de cette notion par une substitution de ce genre
   (`REVIEW-2026-09-12`, O5).*
5. **Afficher $k = 0{,}250$ V⁻¹ et $P_m = 2{,}00$ V ?** (§10.8). Aucun sujet ne les
   donne. **Recommandation : oui, une fois, dans la légende du montage** — sans eux,
   $A = U_0$ et le piège du §13.2 se referme tout seul. *Lié à §13.2 : si la
   réconciliation est refusée, cette question tombe.*
6. **Quatre sous-graduations par division, au lieu des cinq d'un oscilloscope réel**
   (§5.1, §10.9). **Recommandation : garder les quatre.** C'est le seul pas qui fait
   tomber les **neuf** couples d'extrema exactement sur un trait ; à cinq, quatre
   valeurs sur neuf tomberaient entre deux traits et la scène montrerait un « presque »
   qu'elle appellerait une mesure. *Si le propriétaire préfère la fidélité matérielle,
   il faut changer les crans de $U_0$ et de $S_m$ — pas la grille — et refaire le
   §5.4.*
7. **Le spectre de fréquences — une dette à trois faces, qui n'est PAS celle de cette
   scène** (§0.3, §2.5, §9.1). Mesuré : le cadre le liste comme `savoir_faire`
   (`pc-physique-chimie.yaml:236`) ; 2023 N q3 le demande (0,5 pt) et son `reasoning`
   admet « *aucun chapitre à citer ici* » ; **et `checkpoints.yaml:39-41` l'INTERDIT en
   garde de périmètre** — une garde qui **contredit le cadre**.
   **Recommandation : corriger la garde de périmètre (une phrase) dans le même commit,
   et commander la prose du spectre séparément.** La scène n'entame pas le spectre, et
   elle ne doit pas servir de prétexte à trancher cette question-là.
8. **Écarter 2,0 kHz des crans de porteuse** (§0.1, §9.14). **Recommandation : garder
   l'évitement.** Il ne coûte rien (1,2 · 2,4 · 4,0 · 8,0 donnent des comptages entiers
   tout aussi propres) et il garantit qu'aucun élève ne lira, dans la scène, le nombre
   exact qui est en litige dans le sommet de la même leçon.
9. **Le champ `habilete` sur les quatre items neufs**, alors que les 24 existants n'en
   ont aucun (§8.5). **Recommandation : le poser sur les quatre neufs**
   (3 × `application_experimentale`, 1 × `resolution_probleme`), **en écrivant
   explicitement** que le mélange 50 / 15 / 35 reste **incalculable** tant que les 24
   autres n'en portent pas. C'est `DECISIONS-EN-ATTENTE` §3, et cette livraison ne la
   tranche pas.
10. **Chiffrer les notes de bas de figure de `modulation-amplitude.svg` (rapport 6) et
    de `bonne-surmodulation.svg` (rapport 4) ?** (§2.1, §4.7c). Elles disent « rapport
    réduit ici pour la lisibilité » sans donner le facteur ; l'aveu chiffré est dans un
    commentaire SVG. La scène, elle, déclare son rapport à l'écran. **Recommandation :
    oui, deux mots dans chaque note (« réduit à 6 » / « réduit à 4 »)** — c'est une
    retouche de deux lignes qui aligne trois médias sur la même honnêteté. *Mais c'est
    une retouche de figure, pas de scène : elle peut partir séparément.*
11. **Ajouter le critère à la légende de `detecteur-crete.stages.json` ?** (§4.7b).
    **Recommandation : non.** La figure reste **qualitative** (c'est ce que le cadre
    demande d'elle) ; c'est la prose du §4.5 qui porte le critère chiffré. *Une figure
    qui porterait le critère sans pouvoir le faire varier serait la quatrième figure
    figée du chapitre.*
12. **Le trapèze en mode XY** (§0.5). **Mesuré absent du dépôt entier** — 0 occurrence
    utile dans `docs/sujets/`, `content/` et `docs/cadre/`. **Recommandation : ne pas
    l'introduire**, et **le signaler comme un point de cadre à vérifier auprès de la
    source**. Si le propriétaire sait qu'il est enseigné dans les manuels marocains, il
    faut l'écrire dans `lesson.md` d'abord et la scène ensuite — *jamais laisser une
    scène élargir le programme depuis une intuition.*
13. **Aucun nouveau point d'arrêt** (§4.7a). Les **cinq paris** jouent le rôle de porte
    d'engagement dans R3. **Recommandation : garder.** *Si le propriétaire veut une
    porte écrite en plus, le meilleur emplacement est après le §4.5 (R4), sur la double
    inégalité — c'est le seul endroit où la leçon gagne un contenu vraiment neuf.*
14. **`tool: "scene2d"` et le nom du dossier.** Question héritée des specs de la cuve,
    de la corde, des noyaux, du banc et du tremplin : faut-il renommer
    `web/src/lib/scene3d/` (+ `scenes.json`) en `scene/` ? **Recommandation :** oui,
    mais dans un commit **mécanique séparé**, jamais dans celui de la scène.
15. **Couper une étape, si l'on en veut quatre ?** **Recommandation : la coupable est
    S5.** Les quatre premières portent chacune un savoir-faire du cadre et une
    misconception déclarée ; S5 est une synthèse. **Je la garde par défaut pour une
    raison mesurée** : c'est la **seule** étape qui relie la condition 1 ($F \gg f$) à
    la fenêtre du détecteur — un lien que **rien** dans `lesson.md`, dans `items.yaml`
    ni dans les dix entrées de banque n'établit, et qui explique *pourquoi* la première
    condition existe. *À l'inverse, S1 n'est pas coupable malgré son distracteur A
    pré-répondu par `cp-r2-porteuse-signal` : c'est elle qui porte le geste à 0 %.*

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/ondes-em-modulation` passe
  — **ce qui suppose que `lecture-oscillogramme` soit déclaré dans `items.yaml` au
  moment où la scène est validée** (§8.2, ADR 0041 addendum du 2026-09-24 : *un pari de
  scène nomme un modèle DÉCLARÉ*), sans quoi la scène part sur la voie de repli.
- `node web/scripts/scene-modulation.mjs --porte` : **toutes** les familles vertes, sur
  un rendu réel, relancé à **quatre** largeurs d'écran, **au moins deux fois**.
- `node web/scripts/scene-modulation.mjs --essai-rouge` : **chaque** famille crie, avec
  le vert qui l'a précédée, même dossier, même commande ; et chaque sabotage ne fait
  rougir que la famille qui le garde (§11.5, 21 sabotages).
- `node web/scripts/test-modulation.mjs` : les 9 couples du §5.4, les 4 crans du §5.5,
  les 5 régimes du §5.7, les zéros et la bosse du §5.6, à $10^{-12}$.
- `node web/scripts/resume-couverture.mjs` régénéré : `total_items` passe à **28**,
  `lecture-oscillogramme` à **3**, `demodulation-detecteur-crete` à **4**.
- **Aucune forme du §9 n'apparaît dans le panneau rendu**, une sonde par forme, et
  `--essai-rouge` les parcourt toutes. En particulier : **aucun « spectre », aucune
  « raie », aucune « résonance », aucun « circuit bouchon », aucun « 2017 », aucune
  porteuse à 2,0 kHz** — ni dans la scène, ni dans les quatre items, ni dans les six
  blocs de prose.
- **`enveloppe-inerte` est verte aux quatre crans de `porteuse`, aux deux largeurs
  d'écran** — c'est la mesure centrale de cette scène (§2.2, §11.3) ; si elle ne tient
  pas, la scène n'a pas de raison d'exister.
- Les six blocs de prose (§4) sont posés **aux six ancres nommées**, et **aucun ne
  précède le marqueur en répondant à un pari**.
- **`cp-r2-porteuse-signal`, `cp-r3-taux-modulation` et `cp-r4-condensateur` sont
  inchangés, au caractère près.**
- **Les deux fichiers du BLOQUANT n° 1 sont inchangés, au caractère près :**
  `exercises.yaml` et `bank.yaml`. *(`git diff --stat` le montre ; c'est une condition
  de livraison, pas une intention.)*
- `dette-manipulable` : **inchangée**. Cette scène ne solde aucune dette écrite — le
  dossier de la notion ne porte **aucun `spec.md`** et **aucun `[[embed:`** avant cette
  livraison. Elle ne doit donc **pas** être comptée comme un paiement, et le cliquet ne
  bouge pas. `media-manipulable` monte d'une notion.
- La scène ne compte pour **livrée** que si elle est enregistrée dans `scenes.json`
  (ADR 0041 §3).

---

## 15. Ce que je n'ai pas pu vérifier

Écrit ici plutôt que supposé ailleurs. Rien de ce qui suit n'est un défaut connu : ce
sont des **mesures à faire**, pas des affirmations à croire.

1. **Je n'ai lu aucun scan.** Les dix entrées de banque sont des **transcriptions** :
   quatre sont « vérifié » dans `docs/sujets/pc/ondes-em-modulation.md` (2017 N, 2021 N,
   2023 N, 2025 N), trois le sont dans `docs/sujets/_incoming/` (2022 R, 2023 R,
   2025 R), et trois (2010 N, 2015 N, 2012 R) le sont par des passes adversariales
   notées dans le fichier. **Les nombres de la scène ne dépendent d'aucune d'elles** :
   ils sont **choisis** (§5.3). Les seules valeurs empruntées sont $U_{max}/U_{min} =
   3{,}00\ /\ 1{,}00$ V et $m = 0{,}50$, qui coïncident avec 2017 N (extrema confirmés
   au pixel par le `REVIEW`) et avec 2023 N ; et $U_0 = 4{,}0$ V, qui est celui de
   2023 N.
2. **Le rendu de 40 oscillations à 390 px n'a pas été regardé.** Estimation : avec une
   grille d'environ 330 px de large, cela fait **~8 px par oscillation** ; à 1 280 px
   (grille ~660 px), ~16 px. **C'est une estimation, pas une mesure.** Si c'est un
   code-barres au téléphone, il faut **borner `porteuse` à 4,0 kHz sous une certaine
   largeur, ou raccourcir la fenêtre de temps — et la porte doit rougir**, jamais la
   tolérance s'élargir. *Précédent : les 22 traits dans 90 px du graphe du banc de
   diffraction, et les 13 nombres de sa règle à 1 280 px.*
3. **La distinction des deux tracés par la seule ÉPAISSEUR n'a pas été essayée** (§6,
   §11.3 `deux-traces`). C'est le point de rendu **le plus fragile** de cette scène :
   deux courbes d'encre qui se touchent aux crêtes, à distinguer sans couleur.
   Solutions de repli, dans l'ordre de préférence si la mesure échoue : (a) un liseré de
   fond sur $u_C$ ; (b) $u_S$ à l'encre très douce et $u_C$ à l'encre pleine ; (c) en
   dernier recours, deux voies décalées verticalement avec une sensibilité déclarée par
   voie — **au prix d'une table du §5.4 à refaire**. *À trancher **en regardant
   l'image**, comme le cadrage du produit vectoriel et la flèche du champ magnétique.*
4. **Le trapèze en mode XY : je n'ai pas pu vérifier hors dépôt.** Mesuré absent de
   `docs/sujets/`, de `content/` et de `docs/cadre/` (§0.5). Je n'ai pas accès aux
   manuels marocains. Si le propriétaire sait qu'il est enseigné, c'est une décision de
   **cadre** (§13.12), et cette spec devient fausse sur ce point.
5. **Les `limites` et les `exclusions` du sous-domaine électricité sont marquées
   `source: derived`** dans `pc-physique-chimie.yaml` — **elles n'ont pas été imprimées
   dans le Cadre, elles en ont été inférées**, et le fichier lui-même dit qu'elles
   « need human validation ». Deux d'entre elles portent une grande part du §9 (« PAS de
   fonction de transfert / de Bode / de conception quantitative de filtre » et
   « composants actifs comme objets d'étude »). **À faire valider par le propriétaire
   avant construction.** *Je n'ai pas relu la source PDF du Cadre : le §1 recopie le
   YAML, qui est l'autorité (ADR 0018).*
6. **Le champ `habilete` reste absent des 24 items existants**, et je n'ai pas tranché
   la question de schéma (`DECISIONS-EN-ATTENTE` §3). Le chiffre « application
   expérimentale 0 % » du §0.3 est donc mesuré sur les **cinq points d'arrêt** (tous
   `utilisation`) et sur l'**absence** du champ dans les 24 items ; il ne peut pas être
   calculé item par item.
7. **`validate-content` accepte-t-il un `etat_revele` qui fait APPARAÎTRE une partie du
   dessin** (`sortie: "modulee-et-detectee"` à S4) ? Le banc de diffraction a posé un
   `etat_revele` sur un curseur, le tremplin sur une énumération ; **aucun n'a fait
   apparaître un étage entier du schéma**. La combinaison n'a pas été essayée. *À
   vérifier avant d'écrire une ligne de rendu — c'est le seul endroit où cette scène
   sort du gabarit des onze précédentes.*
8. **Les barèmes des dix entrées n'ont pas tous été relevés.** J'en ai lu cinq (1,75 ·
   1,5 · 1,25 · 1,75 · 1,75). L'affirmation « 1,25 à 1,75 pt » du §0.3 porte sur ces
   cinq-là, pas sur les dix.
9. **La lisibilité des quatre sous-graduations à 390 px n'est pas mesurée.** Une grille
   de 10 × 8 divisions avec 4 sous-graduations fait 40 × 32 traits fins ; sur ~330 px de
   large, une sous-graduation vaut ~8 px. C'est probablement lisible, **ce n'est pas
   vérifié**, et c'est la même famille de risque que le point 2.
10. **Je n'ai pas mesuré si l'ordre des notions place `rc-charge` et `dipole-rl` avant
    `ondes-em-modulation`.** La consigne de S4 s'appuie dessus (« la décharge d'un RC,
    comme au chapitre du dipôle RC ») et `lesson.md:182` le fait déjà (« *un peu comme
    le condensateur du chapitre RC* ») — donc le renvoi existe déjà dans la leçon et
    n'est pas une invention de cette spec. Mais **l'ordre affiché du programme n'a pas
    été relu** ; si `ondes-em-modulation` précédait `rc-charge`, ce renvoi tomberait —
    dans la leçon comme dans la scène.
