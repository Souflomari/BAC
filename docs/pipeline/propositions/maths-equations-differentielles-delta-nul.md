# spec — le cas $\Delta = 0$ (Maths · `equations-differentielles`, **R4 = chapitre 5**)

**Statut : CONSTRUITE le 2026-09-25** (commit `b70f9a41` : exemple travaillé, deux lignes de
mécanisme, `racine-double-sans-x`, EQDIFF-31 à 33, `cp-r4-racine-double`) ; les sept questions
du §6 sont tranchées par défaut et écrites dans `docs/audits/DECISIONS-EN-ATTENTE.md` §30.
*Écart de construction* : la clé d'EQDIFF-33 raccourcie de 224 à 145 caractères (`eleve-ruse`).
Écrite le 2026-09-25 par pedagogy-architect. **Petite spec** : un exemple travaillé, un modèle
d'erreur, trois items, un point d'arrêt. Rien d'autre.

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête.** `Bash` était indisponible dans la session qui a
> écrit ce document. **Tous les faits du §0 ont été relevés par lecture directe des fichiers et
> par l'outil `Grep` ; la commande shell donnée en regard est celle qui les REPRODUIT, elle n'a
> pas été lancée ici.** Aucun chiffre n'est attribué à une sortie que je n'aurais pas lue. Ce
> que je n'ai pas pu vérifier est au §6.

**Ce que ce document est.** Le cadrage de la seule chose que la vague 1 a désignée comme le trou
le plus lourd de la notion (`REVIEW-2026-09-12.md:94-100`, F4) : **l'examen ne connaît qu'un cas,
$\Delta = 0$, et c'est le seul que la leçon n'enseigne pas.**

**Ce que ce document n'est pas.** Il n'écrit ni la prose finale (content-author), ni les items
finaux (item-author), ni le YAML livré. **Aucun fichier de la notion n'a été touché** — ni
`lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`, ni `bank.yaml`, ni `exercises.yaml`.

**Numérotation des chapitres, mesurée avant d'écrire.** La convention de la notion est
`chapitre N = R(N−1)`, prouvée par le texte : `lesson.md:376` « *l'oscillateur du chapitre 5* »
désigne R4 ✓. **Donc R4 = chapitre 5**, et toute prose commandée ici écrit « chapitre 5 »,
jamais « R4 ». *`REVIEW:19-21` : les 49 citations « chapitre N » des cinq fichiers sont justes,
vérifiées une à une — cette spec n'en ajoute aucune vers un autre rung.*

---

## 0. Le trou, mesuré — chaque fait avec la commande qui le montre

| # | le fait | la commande / la citation qui le reproduit |
|---|---|---|
| **a** | **Le seul cas attesté par un sujet vérifié est $\Delta=0$, et il vaut 0,5 des 1,0 point de la notion.** 2022 session normale, SExp : « *Résoudre $(E) : y''-2y'+y=0$* » **(0,5 pt)**, puis « *Montrer que $h(x)=(x+1)e^{x}$ est la solution qui vérifie $h(0)=1$ et $h'(0)=2$* » **(0,5 pt)**. La chaîne de résolution est écrite en entier : $r^2-2r+1=0$, $\Delta=0$, $r=1$, $y=(Ax+B)e^{x}$. | `bank.yaml:102` (`bareme_total: 1`), `:136`, `:141-149`, `:153` |
| **b** | **Dans la leçon, $\Delta>0$ a l'exemple travaillé complet ; $\Delta=0$ a trois lignes.** Cas 2 = `lesson.md:366-368` (**une phrase + une formule encadrée**) ; l'exemple travaillé de la fin du chapitre 5 = `lesson.md:388-406` (énoncé, trinôme, discriminant, racines, solution générale, conditions initiales, **contrôle**) et il traite $y''-3y'+2y=0$, **donc $\Delta>0$**. | `sed -n '360,410p' content/maths/equations-differentielles/lesson.md` |
| **c** | **Le piège est NOMMÉ et jamais exercé.** `lesson.md:408` : « *Oublier le facteur $x$ du cas $\Delta=0$ et écrire $y=Ae^{r_0x}$ tout court. Il ne resterait qu'**une** constante libre, alors qu'une équation du second ordre en demande deux […]. Le compte des constantes est le contrôle qui débusque l'erreur avant tout calcul.* » **C'est un paragraphe de prose, suivi d'un `---` et du chapitre 6.** Aucun exemple, aucune substitution, aucun item. | `sed -n '408,412p' …/lesson.md` |
| **d** | **`items.yaml` ne parle jamais de ce cas — quatre formes cherchées, zéro occurrence.** `racine double`, `\Delta = 0`, `discriminant nul`, `racine_double` : **0**. Et les mots voisins qui existent ne désignent pas cette chose : « racine » n'y signifie jamais que $\sqrt{\omega^2}$ (`:124`, `:129`, `:411`), « caract… » jamais que « caractérise » ou « temps caractéristique » (`:684`, `:1411`, `:1821`, `:1896`). **Ni équation caractéristique, ni discriminant, ni racine double, nulle part.** | `grep -nic 'racine double\|\\Delta = 0\|discriminant nul\|racine_double' …/items.yaml` ⇒ **0** ; `grep -ni 'racine\|discriminant\|caract\|\\Delta' …/items.yaml` ⇒ 8 lignes, **aucune sur le second ordre général** |
| **e** | **`checkpoints.yaml` non plus — une seule occurrence, et c'est un COMMENTAIRE.** `checkpoints.yaml:24` (le *boundary guard* d'en-tête) écrit « second ordre à coefficients constants (équation caractéristique) ». **Aucun des cinq points d'arrêt ne porte la chose dans son contenu.** | `grep -ni 'racine\|delta\|discriminant\|caract' …/checkpoints.yaml` ⇒ **1**, ligne 24, en commentaire |
| **f** | **Aucun des 22 modèles déclarés ne couvre le facteur $x$ oublié.** Les 22 `id` sont à `items.yaml:11-206`, lus un par un : cinq portent le second ordre (`omega-vs-omega2`, `signe-second-membre-second-ordre`, `oscillateur-B-sans-omega`, `oscillateur-A-B-roles`, `periode-omega`) et **les cinq portent l'oscillateur $y''+\omega^2y=0$, aucun le cas général.** | `grep -n 'id: mc\.' …/items.yaml` ⇒ 22 |
| **g** | **Les 4 items de R4 ne testent que l'oscillateur.** EQDIFF-4 ($y''+9y=0$), EQDIFF-5 ($y''+4y=0$), EQDIFF-16 ($x''+36x=0$), EQDIFF-27 ($y''+9y=0$). `ramp_coverage.R4: 4`. | `items.yaml:391`, `:446`, `:1040`, `:1691` ; `:1999` |
| **h** | **Quinze modèles sur 22 siègent EXACTEMENT au plancher de 3.** `honest_state` : « *la marge est nulle et tout retrait d'item la casse* ». **Conséquence directe pour cette spec : on ajoute, on ne déplace rien.** | `items.yaml:1968-2005` |
| **i** | **Le champ `habilete` est sur les 5 points d'arrêt et sur AUCUN des 30 items.** | `grep -c habilete …/items.yaml` ⇒ **0** ; `…/checkpoints.yaml` ⇒ **5** (`:30`, `:85`, `:132`, `:179`, `:224`) |

**Le constat en une phrase, celui de la vague 1 :** *« L'élève rencontre le seul cas que l'examen
lui a posé pour la première fois dans l'exercice d'examen lui-même. »* (`REVIEW:98-100`.)

---

## 1. Le cadre — lu avant d'écrire, avec ses réserves

> ⚠ **RÉSERVE DE PROVENANCE.** Les deux fichiers maths portent en en-tête **« STATUT :
> PROPOSITION — NON AUTORITATIVE »** (`maths-sm.yaml:12`, `maths-sexp.yaml:10`) et **aucune de
> leurs trois portes (RULES §5) n'est passée**. Le PDF officiel est un scan sans couche texte :
> **aucune citation `cadre p.N` n'existe pour maths** (`maths-sm.yaml:25-26`). Je ne corrige ni
> ne contourne ces fichiers ; je les cite en le disant.

- **Filière / matière.** La seule annale de la notion est `filiere: "SExp"` (`bank.yaml:100`).
  La notion se déclare SExp (`checkpoints.yaml`, `exercises.yaml`, `bank.yaml`) tandis que
  `lesson.md:292` écrit « 2ᵉ Bac SM ». **Non tranché ici — §5, §6 Q5.**
- **Poids.** `analyse` : `part_examen: 50` en SM (`maths-sm.yaml:55`), `55` en SExp
  (`maths-sexp.yaml:52`). **Aucun chiffre n'est publié plus fin que le domaine** ; il n'existe
  donc **aucun `part_examen` attribuable aux équations différentielles**. Le seul poids mesuré
  est celui de l'annale : **1,0 point sur 20**, dont **0,5 pour le cas $\Delta=0$**
  (`bank.yaml:102`, `:136`). *`REVIEW:31-33` juge ce poids léger JUSTE : le gonfler éloignerait
  de l'examen. **Cette spec ne le gonfle pas** — elle rééquilibre l'intérieur du point.*
- **Habiletés (cible chiffrée de l'item-author).** SM `maths-sm.yaml:39-42` : **40 / 40 / 20**
  (application directe · application non explicite · synthèse). SExp `maths-sexp.yaml:40-43` :
  **50 / 35 / 15**. ⚠ **NON-VERDICT (ADR 0034)** : `habilete` n'existe sur aucun item de la
  notion (fait **i**), et le vocabulaire du champ sur les points d'arrêt (`utilisation`,
  `raisonnement`) **ne parle la langue d'aucun cadre**. Adjugé corpus-wide
  (`REVIEW:119-120`). **Cette spec n'ajoute pas le champ aux items** (§5).
- **Le savoir-faire servi, mot pour mot.** `maths-sm.yaml:157` (`source: derived`) :
  > « **Écrire et résoudre l'équation caractéristique de $y''+ay'+by=0$ ; donner la forme des
  > solutions ($\Delta>0$, $\Delta=0$, $\Delta<0$) et fixer les constantes.** »

  **C'est exactement, et seulement, ce que cette spec sert.** On ne va pas au-delà.
- **`limites` portées en dur.** `maths-sm.yaml:158-159` : « *2e ordre à coefficients constants et
  **SANS second membre**. Pas de second membre non constant (pas de solution
  particulière/variation de la constante).* » → **rien de tout cela n'apparaît**, à aucune ligne
  commandée ici.
- ⚠ **Le cadre SExp INTERDIT ce que l'examen SExp DEMANDE, et c'est le cadre qui a tort.**
  `maths-sexp.yaml:158` (limite, avec un `_flag_derive_fort` à `:159`) et `:307` (exclusion
  transversale, `source: derived — À VALIDER`) excluent $y''+ay'+by=0$ générale ;
  `maths-sm.yaml:151` affirme que cette leçon « ne couvre PAS » ce cas. **Les quatre lignes sont
  démenties par le seul sujet vérifié — SExp, 2022 N, $y''-2y'+y=0$.** Verdict de la vague 1,
  que je partage : *la notion a raison, le fichier de cadre a tort ; le contenu R4 ne doit PAS
  être retiré* (`REVIEW:71-90`, F2 → **research-lead**). **Cette spec ne tranche pas
  l'arbitrage ; elle écrit dessus et le route (§5, §6 Q5).**

---

## 2. Où ça va dans `lesson.md`, et ce que content-author écrit

### 2.1 L'ancre, exacte

**Après le paragraphe « Le piège nommé de ce cas général » (`lesson.md:408`), avant le `---` de
`lesson.md:410`.** Rien d'autre ne bouge : le Cas 2 de `lesson.md:366-368` **reste tel quel**
(c'est l'énoncé du résultat, il est juste), le Cas 1 et le Cas 3 ne sont pas touchés, le titre
`## R5` (`:412`) ne bouge pas.

**Ordre voulu, et c'est le motif du placement :** le piège est **nommé d'abord** (`:408`,
déjà écrit), **puis** l'exemple le fait échouer sous les yeux de l'élève, **puis** le point
d'arrêt vérifie qu'il a tenu. *Prédire → confronter → contrôler, dans cet ordre.*

Deux insertions, et **elles doivent atterrir ensemble** (l'en-tête de `checkpoints.yaml:10` pose
que les `id` correspondent aux marqueurs de `lesson.md`) :

1. un titre de niveau 3 : `### Exemple travaillé — la racine double ($\Delta = 0$)` ;
2. après l'exemple, seul sur sa ligne : `[[checkpoint:cp-r4-racine-double]]`.

*Le marqueur est le **sixième** point d'arrêt de la leçon ; les cinq existants sont à
`lesson.md:17`, `:112`, `:186`, `:258`, `:488`. **R4 n'en a aucun aujourd'hui** — le seul rung
qui porte un savoir-faire attesté par l'examen est le seul rung sans contrôle formatif.*

### 2.2 L'exemple travaillé — cahier des charges

**Au niveau de l'exemple $\Delta>0$ existant (`lesson.md:388-406`), pas en dessous :** même
ouverture « *Ce qu'on cherche ici, et pourquoi ce geste* », mêmes intertitres en gras (**Le
trinôme. · Le discriminant. · La solution générale. · Les conditions initiales. · Le
contrôle.**), même encadré `\boxed{}` sur le résultat, **plus** ce que l'exemple $\Delta>0$ n'a
pas à faire et que celui-ci doit faire : **la vérification par substitution** et **la raison du
facteur $x$**.

**Les nombres, fixés ici — content-author ne les choisit pas.**

$$(E_2)\ :\ y'' + 6y' + 9y = 0, \qquad y(0) = 1, \quad y'(0) = -1$$

$$r^2+6r+9=(r+3)^2 \quad\Longrightarrow\quad \Delta = 36-36 = 0, \quad r_0 = -\tfrac{b}{2a} = -3$$

$$\boxed{\,y(x) = (2x+1)e^{-3x}\,}$$

**Non-duplication, vérifiée équation par équation :** $y''+6y'+9y=0$ n'est **ni** l'annale
($y''-2y'+y=0$, `bank.yaml:136` — *elle doit rester un test frais*), **ni** l'exemple $\Delta>0$
de la leçon ($y''-3y'+2y=0$, `lesson.md:392`), **ni** la variation `r-variation`
(`exercises.yaml:103`, **la même** que la leçon — c'est le défaut F5, *hors périmètre*, §5),
**ni** aucune équation d'oscillateur du corpus ($y''+16y=0$ `:320`, $y''+9y=0$, $y''+4y=0$,
$x''+36x=0$). **La racine $r_0=-3$ est négative là où celle de l'annale est $+1$ ; la réponse a
la forme $(2x+1)e^{-3x}$ là où l'annale a $(x+1)e^{x}$** : aucun nombre de l'examen n'est
transférable.

**Les six temps, dans cet ordre.**

1. **Le trinôme.** $a=1$, $b=6$, $c=9$ → $r^2+6r+9=0$.
2. **Le discriminant.** $\Delta = 6^2-4\times1\times9 = 36-36 = 0$ : **racine double**
   $r_0 = -\dfrac{b}{2a} = -\dfrac{6}{2} = -3$. *Une ligne, et une seule, sur la lecture
   « $r^2+6r+9=(r+3)^2$ » — un carré parfait, c'est à ça que ressemble $\Delta=0$.*
3. **Le piège, mis à l'épreuve AVANT de donner la forme — c'est le cœur de l'exemple.** Si l'on
   écrivait $y(x)=Ce^{-3x}$ (le piège de `lesson.md:408`), alors $y(0)=C=1$ **force** $C=1$, et
   il ne reste plus rien à régler : $y'(x)=-3e^{-3x}$ donne $y'(0)=-3$, **alors que l'énoncé
   demande $-1$**. *Une constante ne peut pas encaisser deux conditions.* **Le compte des
   constantes de `:408` devient ici un nombre qui tombe faux** — c'est exactement ce que le
   paragraphe nommé annonce et n'a jamais montré.
4. **Ce que le facteur $x$ apporte — par substitution.** $y(x)=xe^{-3x}$ est **elle aussi**
   solution, et elle n'est pas un multiple de $e^{-3x}$ :
   $$y' = (1-3x)e^{-3x}, \qquad y'' = (9x-6)e^{-3x}$$
   $$y''+6y'+9y = \bigl[(9x-6) + 6(1-3x) + 9x\bigr]e^{-3x} = \bigl[(9-18+9)x + (-6+6)\bigr]e^{-3x} = 0$$
   *La moitié manquante existe, et on vient de la vérifier.* **D'où la forme du cas 2 :**
   $y(x)=(Ax+B)e^{-3x}$, **deux** constantes.
5. **Les conditions initiales.** $y(0)=B=1$. Puis
   $y'(x) = Ae^{-3x}-3(Ax+B)e^{-3x} = (A-3Ax-3B)e^{-3x}$, donc $y'(0)=A-3B=-1$, d'où $A=2$.
   $$\boxed{y(x) = (2x+1)e^{-3x}}$$
   *Une phrase, obligatoire, sur le geste : $A$ ne se lit pas directement sur $y'(0)$ — la
   dérivée d'un produit fait apparaître $A-3B$, pas $A$ seul.*
6. **Le contrôle, à faire systématiquement — DEUX niveaux.** *(L'exemple $\Delta>0$ n'en a
   qu'un ; c'est ce que F4 reproche.)*
   - **Les conditions.** $y(0)=1$ ✔ ; $y'(x)=(2-6x-3)e^{-3x}=-(6x+1)e^{-3x}$, donc
     $y'(0)=-1$ ✔.
   - **L'équation elle-même, par substitution.** $y''=(18x-3)e^{-3x}$, et
     $$y''+6y'+9y = \bigl[(18x-3)+6(-6x-1)+9(2x+1)\bigr]e^{-3x} = \bigl[(18-36+18)x + (-3-6+9)\bigr]e^{-3x} = 0 \ ✔$$
     **La phrase qui doit être écrite :** *deux annulations séparées — celle des termes en $x$
     et celle des constantes. C'est précisément ce que le facteur $x$ permet, et ce qu'une seule
     exponentielle ne pourrait pas faire.*

**Longueur visée : 200 à 280 mots + les affichages.** Pas un mot de plus que l'exemple
$\Delta>0$ ne s'en accorde, plus les deux blocs (3) et (6b) qui sont la raison d'être du
morceau.

### 2.3 Une ligne de mécanisme, OPTIONNELLE et bornée

En deux lignes au plus, après le temps (4), si le propriétaire la veut (§6 Q6) : en substituant
$y=xe^{rx}$ dans $ay''+by'+cy$, il reste
$\bigl[(ar^2+br+c)\,x + (2ar+b)\bigr]e^{rx}$ — la première parenthèse s'annule dès que $r$ est
racine, **la seconde seulement si $r=-\frac{b}{2a}$, c'est-à-dire exactement quand la racine est
double**. *C'est pour ça que le facteur $x$ n'apparaît QUE dans le cas 2.*

**Bornes non négociables** : deux lignes, **présentées comme une vérification, jamais comme une
preuve de complétude** — la leçon **ADMET** la réciproque et le dit
(`lesson.md:290-292`, « on **admet** ici… ») ; ne pas contredire cette économie. *Et c'est la
même parenthèse $(2ar+b)$ qui explique les retours des items EQDIFF-32 (§4.2).*

### 2.4 Média

**Aucun média neuf n'est commandé.** La notion porte quatre figures et aucun manipulable ; le
manque mesuré ici est **de la prose et des items**, pas une image — et l'idée à installer (le
compte des constantes) est **arithmétique**, pas spatiale. *Si le propriétaire en voulait une
plus tard, ce serait `type: structural-diagram` / `tool: svg+katex` (deux constantes contre une,
étiquettes exactes) — **jamais** `gemini`, qui ne rend pas une étiquette mathématique juste
(ADR 0017).*

---

## 3. Le modèle d'erreur — à déclarer

**Bloc à insérer dans `misconceptions:` de `items.yaml`, après le 22ᵉ (`:206`), au format exact
des 22 existants (quatre champs : `id`, `label`, `description`, `contradicts_principle` — aucun
autre champ n'existe dans ce fichier) :**

```yaml
  - id: mc.math.maths_equations_differentielles.racine-double-sans-x
    label: "Cas Δ=0 : le facteur x n'est pas relié à la racine double"
    description: >-
      L'élève ne relie pas le facteur $x$ au cas $\Delta=0$ : il écrit
      $y=Ae^{r_0x}$ (ou $Ae^{r_0x}+Be^{r_0x}$, qui se réduit à une seule
      constante) quand la racine est double, ou au contraire transporte le
      facteur $x$ dans un cas à deux racines distinctes. La forme est choisie
      sans que le discriminant décide.
    contradicts_principle: >-
      Une équation du second ordre a DEUX constantes libres. Quand la racine
      est double, la seconde ne peut venir que du facteur $x$ : $xe^{r_0x}$ est
      alors solution, et $(Ax+B)e^{r_0x}$ est la forme complète. Ce facteur ne
      se justifie QUE là — substitué dans une équation à racines distinctes, il
      laisse un reste non nul.
```

**Pourquoi il est distinct des deux modèles voisins — vérifié en les lisant.**

- **`solution-fonction-unique` (`items.yaml:11-20`)** : l'élève rend **une fonction isolée** au
  lieu d'une famille — *aucune* constante libre (le cas $C=1$). Ici, l'élève rend bien une
  **famille**, avec une constante libre : sa faute porte sur **le nombre** de constantes que
  réclame le **second** ordre, pas sur l'existence de la famille. **Deux diagnostics, deux
  remédiations** : l'un se casse par « une équation ne fixe jamais une courbe », l'autre par
  « deux conditions, donc deux constantes ».
- **`nombre-solutions-condition` (`items.yaml:114-121`)** : l'élève juge mal **combien de
  solutions passent par un point donné** (réponse attendue : une seule). C'est une affaire de
  **condition initiale au premier ordre**, pas de **forme de la solution générale** au second
  ordre. *Les deux se croisent dans un seul stem — EQDIFF-33 — et y sont séparés par
  construction (§4.3).*
- **Frontière avec `oscillateur-A-B-roles`, écrite pour qu'on ne la franchisse pas.** Le choix
  D d'EQDIFF-4 (`items.yaml:425-433`, « $y=A\cos(3x)$ ») porte, en habits d'oscillateur, une
  parenté réelle : une seule constante pour une équation du second ordre. **Ne PAS le
  re-taguer** : il encode le choix $\cos$/$\sin$, pas le facteur $x$, et le re-taguer ferait
  tomber `oscillateur-A-B-roles` de 4 à 3 tout en déplaçant le modèle apprenant (même arbitrage
  que F-6, `REVIEW:110-114`). **§6 Q3.**

**Deux modèles voisins que cette spec ne déclare PAS, et qui restent une dette écrite**
(ADR 0035 : ce qu'on n'arme pas s'écrit à côté de ce qu'on arme) :

1. **le signe de $r_0=-\frac{b}{2a}$** (écrire $+3$ pour $b=6$) ;
2. **$A$ lu directement sur $y'(0)$**, sans le terme $-r_0B$ que la dérivée du produit impose —
   l'analogue exact, au cas $\Delta=0$, de `oscillateur-B-sans-omega`.

**Aucun des deux n'est déclaré ici** : chacun demanderait ses **≥3 items** propres, ce qui
double la taille de la livraison. **Ils ne sont donc portés par AUCUN distracteur des trois
items** — et c'est voulu : un distracteur non tagué, ou tagué à un modèle dont le principe ne
le couvre pas, est exactement le défaut F-6. **§6 Q2.**

---

## 4. Les trois items + le point d'arrêt — cahier des charges pour item-author

**Plancher visé : 3 items pour le nouveau modèle** (`coverage_summary.floor: 3`), atteint
exactement par les trois ci-dessous. **Identifiants : EQDIFF-31, -32, -33** (le dernier existant
est EQDIFF-30, `items.yaml:1887`). **Rung : R4 pour les trois.** **Pas de champ `habilete` sur
les items** (le fichier n'en porte aucun — fait **i** ; en ajouter trois créerait une quatrième
case à moitié pleine). Format : `id`, `rung`, `difficulty_level`, `skill_code`, `tags`,
`primary_misconception`, `stem`, `type: mcq`, `choices`, `correct_feedback`, `solution`.

**`coverage_summary` : à RÉGÉNÉRER, jamais à éditer à la main** — le tableau est généré contre
`web/scripts/lib/couverture-compte.mjs` et gardé par `web/scripts/resume-couverture.mjs`
(`items.yaml:1959-1967`). Deltas attendus : `total_items` 30 → **33** ; `ramp_coverage.R4`
4 → **7** ; nouveau modèle **3** ; `solution-fonction-unique` 3 → **5** ;
`signe-second-membre-second-ordre` 4 → **5** ; `nombre-solutions-condition` 3 → **4**.
**Aucun compte ne baisse.**

### 4.1 EQDIFF-31 — la forme · `difficulty_level: 3` · tags `[second_ordre, racine_double]`

**Stem.** « Les solutions sur $\mathbb{R}$ de l'équation différentielle
$y'' - 10y' + 25y = 0$ sont les fonctions : » *(ici $\Delta = 100-100 = 0$, $r_0 = 5$ ;
$r^2-10r+25=(r-5)^2$.)*

| choix | texte | le modèle derrière | la valeur, recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $y(x)=(Ax+B)e^{5x}$, $A,B\in\mathbb{R}$ | — | $\Delta=0$, $r_0=\frac{10}{2}=5$, deux constantes |
| **B ✘** | $y(x)=Ae^{5x}$, $A\in\mathbb{R}$ | `racine-double-sans-x` | racine juste ($r_0=5$), **facteur $x$ omis** → **une** constante. Retour : $y=Ae^{5x}$ ne peut satisfaire $y(0)$ **et** $y'(0)$, puisque $y'(0)=5\,y(0)$ est imposé d'avance |
| **C ✘** | $y(x)=Ae^{5x}+Be^{5x}$, $A,B\in\mathbb{R}$ | `racine-double-sans-x` (2ᵉ surface) | le gabarit de $\Delta>0$ appliqué avec la racine écrite deux fois : $Ae^{5x}+Be^{5x}=(A+B)e^{5x}$ — **deux lettres, une seule constante**. Retour : le faire réduire |
| **D ✘** | $y(x)=xe^{5x}$ | `solution-fonction-unique` | le représentant $A=1$, $B=0$ : **une** fonction, **aucune** constante libre. Retour : c'est bien *une* solution, ce n'est pas *l'ensemble* |

*Contamination vérifiée : aucun des trois modèles ne produit A. Un élève qui tient
`racine-double-sans-x` ne peut pas écrire $(Ax+B)e^{5x}$.*

### 4.2 EQDIFF-32 — le sens inverse · `difficulty_level: 4` · tags `[second_ordre, racine_double, discriminant]`

**Stem.** « Parmi les équations suivantes, laquelle admet pour ensemble de solutions exactement
les fonctions $x \mapsto (Ax+B)e^{2x}$, $A,B\in\mathbb{R}$ ? » *(lecture de la solution vers
l'équation : le geste que ni la leçon ni le banc ne demandent jamais.)*

| choix | texte | le modèle derrière | la valeur, recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $y''-4y'+4y=0$ | — | $\Delta=16-16=0$, $r_0=2$, $(r-2)^2$ ✔ |
| **B ✘** | $y''-5y'+6y=0$ | `racine-double-sans-x` (sens miroir) | $\Delta=25-24=1>0$, racines $2$ **et** $3$ : la racine $2$ est là, l'élève y accroche $(Ax+B)$. Retour par **substitution** : $y=(Ax+B)e^{2x}$ donne $y''-5y'+6y=-Ae^{2x}\neq0$ dès que $A\neq0$ — **c'est le facteur $x$, et lui seul, que l'équation refuse** |
| **C ✘** | $y''-4y=0$ | `racine-double-sans-x` (sens miroir) | $\Delta=0+16=16>0$, racines $\pm2$ : même accrochage. Substitution : $y''-4y=4Ae^{2x}\neq0$ dès que $A\neq0$ |
| **D ✘** | $y''+4y=0$ | `signe-second-membre-second-ordre` | l'élève lit $\sqrt{4}=2$ comme un **taux exponentiel** alors que $\Delta=-16<0$ donne $A\cos(2x)+B\sin(2x)$. Substitution : $y=e^{2x}$ donne $y''+4y=8e^{2x}\neq0$ |

*Le reste laissé par $(Ax+B)e^{rx}$ vaut $(2ar+b)Ae^{rx}$ : nul **exactement** quand
$r=-\frac{b}{2a}$. Les trois retours disent la même chose avec trois nombres différents
($-A$, $4A$, et un cas où il n'y a même pas de racine réelle) — c'est le §2.3.*

### 4.3 EQDIFF-33 — le compte des constantes · `difficulty_level: 4` · tags `[second_ordre, racine_double, conditions_initiales]`

**Stem.** « Pour résoudre $(E) : y'' + 8y' + 16y = 0$, un élève écrit : *le discriminant est nul,
la racine double est $r_0=-4$, donc les solutions sont $y(x)=Ce^{-4x}$, $C\in\mathbb{R}$*. On lui
demande ensuite la solution qui vérifie $y(0)=1$ et $y'(0)=0$. Que faut-il en conclure ? »
*(ici $\Delta=64-64=0$, $r_0=-4$ ; la solution cherchée est $y(x)=(4x+1)e^{-4x}$ —
$B=y(0)=1$, $A-4B=0$ donc $A=4$ ; contrôle : $y'(x)=-16x\,e^{-4x}$, $y'(0)=0$ ✔.)*

| choix | texte | le modèle derrière | la valeur, recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | « Son écriture est incomplète : avec une seule constante, $y(0)=1$ impose $C=1$ et alors $y'(0)=-4$, ce qui contredit $y'(0)=0$. La forme du cas $\Delta=0$ est $(Ax+B)e^{-4x}$, et la solution cherchée est $y(x)=(4x+1)e^{-4x}$. » | — | $B=1$, $A=y'(0)-r_0B=0+4=4$ |
| **B ✘** | « Son écriture est juste : aucune fonction ne vérifie les deux conditions à la fois, car une racine double ne donne qu'une constante — seule $y(0)$ peut être imposée. » | `racine-double-sans-x` | l'élève **tient** la forme à une constante et en tire que l'énoncé est impossible : $C=1$, puis $y'(0)=-4\neq0$, donc « pas de solution ». **La signature exacte du modèle.** |
| **C ✘** | « Une infinité de fonctions vérifient les deux conditions : deux conditions ne suffisent pas à fixer une solution du second ordre. » | `nombre-solutions-condition` | mauvais jugement du **nombre** de solutions sous condition : deux conditions fixent $A$ et $B$ **à une seule valeur chacune** |
| **D ✘** | « $y(x)=e^{-4x}$ convient : c'est LA solution de $(E)$, et les conditions ne servent qu'à la vérifier. » | `solution-fonction-unique` | l'équation est traitée comme déterminant **une** fonction : $C=1$ est calculé, la contradiction sur $y'(0)$ n'est pas relevée |

*Séparation B / C, voulue et vérifiée : **B nie l'existence** (le modèle cible), **C nie
l'unicité** (le modèle voisin). Un élève qui tient le modèle cible ne peut pas atteindre A : A
nomme le facteur qui manque.*

### 4.4 `cp-r4-racine-double` — le point d'arrêt (R4 n'en a aucun)

**Oui, ce rung en a besoin :** les cinq points d'arrêt existants couvrent R0, R1, R2, R3 et
« avant le sommet » (`checkpoints.yaml:10-21`) ; **R4 — le seul rung dont un sujet vérifié
atteste le savoir-faire — n'en a aucun.**

```yaml
  - id: cp-r4-racine-double
    rung: "R4"
    habilete: utilisation
    skill_code: maths_equations_differentielles
    tags: [checkpoint, formative, misconception_driven, maths_equations_differentielles, second_ordre, racine_double]
    primary_misconception: mc.math.maths_equations_differentielles.racine-double-sans-x
    item_source: clone_of_EQDIFF-31
    lesson_placement: after_R4
```

**Stem.** « Quel est l'ensemble des solutions sur $\mathbb{R}$ de $y'' - 6y' + 9y = 0$ ? »
*($\Delta=36-36=0$, $r_0=+3$ — **le miroir de signe de l'exemple de la leçon**, $y''+6y'+9y=0$
et $r_0=-3$ : mêmes chiffres, $r_0=-\frac{b}{2a}$ doit être recalculé, pas recopié.)*

Quatre choix, clonés d'EQDIFF-31 avec $r_0=3$ : **A ✔** $(Ax+B)e^{3x}$ · **B ✘** $Ae^{3x}$
(`racine-double-sans-x`) · **C ✘** $Ae^{3x}+Be^{3x}$ (`racine-double-sans-x`, à faire réduire en
$(A+B)e^{3x}$) · **D ✘** $xe^{3x}$ (`solution-fonction-unique`).

**Rappel de comptage :** les points d'arrêt **ne comptent pas** dans le plancher
(`checkpoints.yaml:6-8`, `items.yaml:1965`). Celui-ci **n'ajoute rien** au `coverage_summary`.
Les retours doivent, comme les cinq autres, **nommer le modèle** (« Modèle détecté : … »).
⚠ La valeur `utilisation` suit la convention des quatre points d'arrêt d'application
(`:85`, `:132`, `:179`) ; **elle ne correspond à aucun niveau d'habileté des deux cadres**
(§1) — on suit le fichier, on ne prétend pas mesurer le mélange d'examen.

---

## 5. Ce qu'il ne faut PAS faire

1. **Ne pas toucher au cas $\Delta<0$** (`lesson.md:370-372`) ni à l'encadré « Arrête-toi :
   l'oscillateur du chapitre 5 est le cas 3 » (`:376-386`). Ils sont justes, et R4 est déjà le
   rung le plus chargé en modèles neufs.
2. **Ne pas toucher au Cas 2 de `lesson.md:366-368`.** L'énoncé du résultat est correct ;
   ce qui manque vient **après**, pas à sa place.
3. **Aucune numérotation de chapitre neuve.** R4 = **chapitre 5**, point. `REVIEW:19-21` a
   vérifié les 49 citations existantes une à une : n'en ajouter aucune à vérifier, n'en
   « corriger » aucune.
4. **Ne pas arbitrer SM contre SExp, ni corriger les fichiers de cadre.** La contradiction
   (`maths-sexp.yaml:158`/`:307` contre `bank.yaml:136`) est **F2 → research-lead**
   (`REVIEW:71-90`) ; le désaccord de filière (`lesson.md:292` « SM » contre une notion déclarée
   SExp) est **ouvert** (`lesson.md:519-522`). **Cette spec écrit du contenu qui reste valide
   dans les deux issues** ; elle ne referme ni l'un ni l'autre. **Router, pas absorber.**
5. **Ne pas changer l'équation de l'annale**, ni la reprendre en exemple, ni en item, ni en
   point d'arrêt. $y''-2y'+y=0$ **doit rester un test frais** — c'est le sommet `r-bac`
   (`lesson.md:494`) et la seule annale vérifiée de la notion.
6. **Ne pas éditer `coverage_summary` à la main** : il est **généré** (`items.yaml:1959`). Le
   régénérer et lire la sortie.
7. **Ne re-taguer aucun distracteur existant** — en particulier pas le choix D d'EQDIFF-4
   (§3). Quinze modèles siègent exactement au plancher (fait **h**) : tout déplacement casse un
   compte, et re-taguer déplace le modèle apprenant.
8. **Ne pas ajouter `habilete` aux items.** Zéro aujourd'hui (fait **i**) ; trois sur 33 ne
   rendraient pas le mélange calculable, et donneraient un vert là où il faut un **NON-VERDICT**.
9. **Ne pas corriger F5 ici** (`exercises.yaml:103` duplique l'équation $\Delta>0$ de la leçon).
   *Note de jugement, à verser au dossier : une fois $\Delta=0$ travaillé, le reproche « la
   variation re-travaille le mauvais cas » tombe — il ne reste que la duplication d'équation,
   qui est un acte d'auteur séparé (`REVIEW:101-104`).*
10. **Ne pas renuméroter les items existants**, ne pas réordonner `misconceptions:` : on ajoute
    en fin de liste (`items.yaml:206`) et en fin de banc (`:1952`).

---

## 6. Questions au propriétaire — avec leur défaut

| # | question | défaut si pas de réponse |
|---|---|---|
| **Q1** | **Un modèle ou deux ?** Le bloc du §3 réunit les deux sens (facteur $x$ **oublié** en $\Delta=0$ ; facteur $x$ **transporté** en $\Delta>0$). Les séparer donnerait deux modèles, chacun à nourrir jusqu'à 3 items — soit six items au lieu de trois. | **UN modèle, deux manifestations.** Précédent du fichier : `oscillateur-A-B-roles` (`items.yaml:150-158`) réunit l'échange, le signe et le choix $\cos$/$\sin$. |
| **Q2** | **Les deux modèles NON déclarés** (signe de $r_0=-\frac{b}{2a}$ ; $A$ lu directement sur $y'(0)$) : les armer maintenant ? | **Non.** Dette écrite au §3, à reprendre dans une spec propre (≥3 items chacun). *Ce sont, à mon jugement d'enseignement, les deux erreurs suivantes par fréquence — je ne les invente pas, je ne les chiffre pas non plus : je n'ai aucune annale pour les mesurer (§7).* |
| **Q3** | **EQDIFF-4 choix D** (`$y=A\cos(3x)$`, tagué `oscillateur-A-B-roles`) porte la même parenté « une constante pour une équation du second ordre ». Re-taguer ? | **Non, laisser** (§5.7). |
| **Q4** | **Où poser `[[checkpoint:cp-r4-racine-double]]` ?** Après le nouvel exemple (fin du chapitre 5) ou après le chapitre 6 (R5) ? | **Fin du chapitre 5**, avant le `---` de `lesson.md:410` — au plus près de ce qu'il contrôle. |
| **Q5** | **L'arbitrage de filière et le cadre périmé** (§1, §5.4). | **Ne rien trancher ici.** Le contenu commandé est valide dans les deux issues : il sert `maths-sm.yaml:157` mot pour mot, et il enseigne ce que le seul sujet SExp vérifié demande. **→ research-lead.** |
| **Q6** | **La ligne de mécanisme $(2ar+b)$ du §2.3** : la garder ? | **Oui, deux lignes, en vérification** — elle est ce qui transforme « il faut un $x$ » en « voilà pourquoi il n'y en a que là ». À couper en premier si la longueur pose problème. |
| **Q7** | **Les nombres du §2.2** ($y''+6y'+9y=0$, $y(0)=1$, $y'(0)=-1$) : validés ? | **Oui** — non-duplication vérifiée équation par équation (§2.2), et les deux annulations du contrôle (termes en $x$, constantes) tombent juste. |

---

## 7. Ce que je n'ai pas pu vérifier — dit, pas maquillé

- **Aucune commande n'a été exécutée** (`Bash` indisponible) : les chiffres du §0 viennent de
  lectures et de `Grep`, les commandes shell sont là pour **reproduire**, pas pour attester.
  *Les portes du dépôt (`resume-couverture.mjs`, la porte des liens, les portes de rendu) n'ont
  donc **pas** été lancées sur cette proposition.*
- **La fréquence d'examen du cas $\Delta=0$ est inconnue** : **une seule annale vérifiée existe
  pour toute la notion** (`bank.yaml:24-25` : « *Introuvable = absent* »). Un relevé d'un seul
  exercice ne fonde aucune affirmation de fréquence — **la prose commandée ici n'en écrit
  aucune**, conformément à `REVIEW:23-29`.
- **Le cadre est une proposition non autoritative** et il est **prouvé faux une fois** sur ce
  chapitre précis (§1). Les frontières du §1 sont aussi solides que ces fichiers, **et pas
  davantage**.
- **Je n'ai pas mesuré ce que les 30 items existants encodent réellement** (F-6,
  `REVIEW:110-114` : plusieurs distracteurs n'encodent pas le modèle qu'ils portent). Les
  deltas de couverture du §4 supposent que le compteur généré compte comme il dit ; **c'est à
  la régénération de le dire, pas à moi.**
- **Le plancher de 3 est un plancher de construction, pas une preuve de diagnostic.** Trois
  items neufs rendent le compte exhibé *porteur de confiance* ; ils ne prouvent pas que le
  modèle est le bon. **C'est l'expérience d'enseignement du propriétaire qui tranche ça, et
  elle n'est pas remplaçable** (§6 Q1, Q2).
