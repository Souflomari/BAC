# spec — manipulable 2D `champ-des-pentes` (Maths · `equations-differentielles`, **R2**)

**Statut : PROPOSITION, non construite — pas encore revue (vague 1 à faire).**
Écrite le 2026-09-25 par pedagogy-architect.

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête, parce que c'est la faute que la spec sœur a dû
> confesser en vague 1 (§15.9 de `maths-nombres-complexes-2-scene-plan.md`).** Les faits du
> §0.1 ont été relevés par **lecture directe des fichiers** : l'outil `Bash` était indisponible
> dans la session qui a écrit ce document. **La commande donnée en regard de chaque fait est
> celle qui le REPRODUIT ; elle n'a pas été lancée ici.** Aucun chiffre de ce document n'est
> attribué à une commande dont je n'aurais pas lu la sortie — quand je n'ai pas pu compter, je
> le dis (§15).

Quinzième manipulable de première partie, **neuvième PLAN** (ADR 0041, `"tool": "scene2d"`,
mêmes pièces que la cuve, la corde, les noyaux, le banc de diffraction, le tremplin, le banc
de modulation, le banc d'électrolyse et le plan complexe). **Deuxième scène de maths sans
3D**, après `plan-complexe-transformation`.

**Ce que ce document est.** Le cadrage pédagogique complet : le trou **mesuré** qui le
justifie (ou ne le justifierait pas), la frontière officielle, le placement, cinq étapes à
pari, les contrôles, l'état, les lectures, la table de ce qui ne doit pas être à l'écran avant
chaque pari, **le refus motivé de déclarer un modèle neuf**, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose finale,
ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu, le panneau et
le registre de frontend-builder ; les items d'item-author. **Aucun fichier de la notion n'a
été touché par cette proposition** — ni `lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`,
ni le code.

Marqueur : `[[embed:champ-des-pentes]]` · clé de registre : `champ-des-pentes` · sélecteur de
porte : `[data-scene="champ-des-pentes"]`.

**Numérotation des chapitres, mesurée avant d'écrire.** La convention de la notion est
`chapitre N = R(N−1)`, et elle est **prouvée par le texte** : `lesson.md:146` « *ramener le
cas général au chapitre 2* » désigne R1 ✓ ; `lesson.md:236` « *la forme $y'=ay+b$ du
chapitre 3* » désigne R2 ✓ ; `lesson.md:376` « *l'oscillateur du chapitre 5* » désigne R4 ✓ ;
`lesson.md:39` « *on la referme au chapitre 4* » désigne R3 ✓. **Donc R2 = chapitre 3**, et
toute prose commandée ici emploie cette numérotation-là, jamais « R2 ».
*Appui : `REVIEW-2026-09-12.md:19-21` — « **les 49 citations « chapitre N » des cinq fichiers
sont justes**, vérifiées une à une par les deux critiques — personne ne doit en « corriger »
une seule. » Cette spec n'en ajoute aucune vers un autre rung.*

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/maths/equations-differentielles/media/champ-des-pentes.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/maths/equations-differentielles/spec-scene-champ-des-pentes.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/champ-pentes-modele.ts — le modèle (frontend-builder) : la pente ay+b, le palier −b/a, la courbe par un point, les valeurs exactes
    CHEMIN À CRÉER: web/src/lib/scene2d/champ-pentes-rendu.ts — le rendu 2D (frontend-builder) : le repère isotrope, le quadrillage opaque, les segments du champ, la ligne du palier, les courbes clippées
    CHEMIN À CRÉER: web/src/components/notion/scene/ChampPentesPanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-champ-pentes.mjs — le test unitaire du modèle (les 60 états)
    CHEMIN À CRÉER: web/scripts/scene-champ-pentes.mjs — la porte de la scène (+ son `--essai-rouge`)

---

## 0. Pourquoi cette notion maintenant — le trou, mesuré

**Aucune spec antérieure n'a pesé `maths/equations-differentielles`.** Recherche sur
`docs/pipeline/propositions/` : un seul fichier contient la chaîne « différentielle », et
c'est `svt-chaines-de-montagnes-scene-foyers.md`, qui n'a rien à voir. *Commande qui le
reproduit :* `grep -ril "différentielle" docs/pipeline/propositions/`.

**`content/maths/equations-differentielles/` ne porte aucun `spec.md`** (contenu du dossier :
`lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`,
`REVIEW-2026-09-12.md`, `media/`). Aucune spec n'y a jamais prescrit d'`[[embed:]]`. **Cette
scène ne solde donc aucune dette écrite** : `dette-manipulable` ne bouge pas,
`media-manipulable` monte d'une notion. *(Affirmé sur lecture, pas sur exécution des deux
instruments — §15.7.)*

### 0.1 Les huit faits, chacun avec la commande qui le reproduit

| # | le fait | la commande / la citation |
|---|---|---|
| **a** | **La notion porte QUATRE médias et AUCUN manipulable.** `refroidissement-modeles`, `famille-solutions`, `oscillateur-periode`, `rc-charge-decharge` : quatre SVG à étapes figées, quatre `.stages.json`. **Aucun `.interactive.json`, aucun descripteur de scène, aucun réglage.** | `ls content/maths/equations-differentielles/media/` ⇒ **4 `.svg` + 4 `.stages.json`, rien d'autre** |
| **b** | **La leçon ne porte aucun marqueur de manipulable**, et le corpus maths n'en porte que quatre en tout (`geometrie-espace` ×2, `calcul-integral` ×1, `nombres-complexes-2` ×1) — **aucun en analyse hors calcul intégral**. | `grep -rn '\[\[embed:' content/maths/` ⇒ 4 occurrences en `lesson.md`, **aucune dans `equations-differentielles`** |
| **c** | **La figure qui porte l'idée centrale est gelée sur UNE équation.** `famille-solutions` trace $T(t)=(T_0-20)e^{-0,1t}+20$ pour $T_0 \in \{90 ; 60 ; 40 ; 0\}$ : **un seul $a$ ($-0{,}1$), un seul $b$ ($2$), un seul palier ($20$)**. Ce qui varie, c'est la condition initiale — **jamais l'équation**. | `media/famille-solutions.svg:3` (`aria-label`) et `:5-30` (l'en-tête de commentaire, qui écrit « $a = -0,1$ et $b = 2$ ») |
| **d** | **Le cluster de modèles le plus lourd de la notion est le PALIER, et il n'est servi que par des formules.** `palier-recopie-b` (5 items), `palier-signe` (4), `palier-oubli` (4) — **13 emplacements d'items sur 30**, plus le point d'arrêt `cp-r2-palier`. **Les treize demandent tous de choisir une ÉCRITURE** ($Ce^{ax}+b$ contre $Ce^{ax}-b/a$…). **Aucun ne demande où la chose se trouve dans le plan.** | `items.yaml:1973-1975` (`coverage_summary`) ; `checkpoints.yaml:130-175` (les quatre choix de `cp-r2-palier` sont quatre formules) |
| **e** | **La leçon ÉNONCE la famille et le palier ; elle ne les fait jamais TROUVER.** R1 pose la question « une fonction, ou une famille de fonctions ? » (`lesson.md:87-91`) et y répond en prose. R2 « Arrête-toi : le palier, ce n'est PAS $b$ » (`lesson.md:180-184`) réfute par le calcul, sur un exemple, **après** avoir donné la formule. La réfutation est excellente — `REVIEW:146-147` la cite comme modèle — **et elle est entièrement verbale.** | `lesson.md:87-91`, `:180-184` ; `REVIEW-2026-09-12.md:146-147` |
| **f** | **Aucun objet de la notion ne montre l'équation AVANT sa solution.** Les quatre figures tracent des **solutions** (courbes $T(t)$, $u_C(t)$, $y=3\cos 4x+2\sin 4x$). **Rien ne dessine ce que l'équation dit d'elle-même** : une pente imposée en chaque point. Le modèle `ed-inconnue-nombre` écrit pourtant le principe mot pour mot — « *reliant $y'$ à $y$ en CHAQUE point* » — et ses 3 items sont des QCM d'écriture. | les quatre `*.stages.json` ; `items.yaml:212-215` |
| **g** | **La notion déclare 22 modèles pour 30 items, plancher 3, et QUINZE modèles siègent exactement au plancher.** Le bloc de couverture a été recompté tag par tag par les deux critiques de vague 1 : « *les 22 lignes tombent juste* », « *le bloc de couverture le plus propre qu'elle ait audité* ». **La marge est nulle : tout retrait d'item casse un plancher.** | `items.yaml:1961-2005` ; `REVIEW-2026-09-12.md:13-17` |
| **h** | **Le champ `habilete` existe sur les 5 points d'arrêt et sur AUCUN des 30 items.** Le mélange d'habiletés est donc **incalculable** sur la couche qui porte le volume. **NON-VERDICT déclaré** (ADR 0034), pas un vert. | `grep -c habilete content/maths/equations-differentielles/items.yaml` ⇒ **0** ; `checkpoints.yaml` ⇒ **5** (lignes `30`, `85`, `132`, `179`, `224`) |

**Le geste que rien n'exerce, et que la scène rend :** régler $a$, régler $b$, poser un point,
**et regarder ce qui bouge et ce qui ne bouge pas** — la ligne plate qui se déplace avec $b$
mais pas là où $b$ est, la pente qui change avec la hauteur et jamais avec l'abscisse, les
courbes qui visent toutes le même palier d'où qu'elles partent. **Aucune figure de la notion
ne fait varier une équation** ; le seul paramètre qui varie dans tout le corpus est une
condition initiale, dans un SVG figé.

### 0.2 Pourquoi R2 et pas R1, R3 ou R4 — l'arbitrage, écrit

**Quatre mesures disent R2 (chapitre 3).**

1. **La masse des modèles est en R2.** Les trois modèles du palier totalisent **13
   emplacements d'items sur 30** (fait **d**) — le plus gros bloc de la notion, loin devant
   l'oscillateur (R4, 5 modèles, 4 items de rung) et la condition initiale (R3, 3 modèles,
   5 items de rung). `ramp_coverage` (`items.yaml:1994-2001`) : R0 4 · R1 6 · **R2 3** · R3 5 ·
   R4 4 · R5 5 · R6 3. *La ligne R2 est la PLUS PAUVRE du banc alors que ses modèles sont les
   plus chargés : les items du palier vivent dans les autres rungs.*
2. **R2 est le seul rung dont la réponse se VOIT.** « Le palier est $-b/a$ » est une
   **position dans le plan**. « La solution est $Ce^{ax}$ » (R1) est une écriture ; « $C$ vaut
   $y_0e^{-ax_0}$ » (R3) est un calcul ; « $r^2-3r+2=0$ » (R4) est un trinôme. **Un seul des
   sept rungs a un contenu que le plan peut trancher, et c'est celui-là.**
3. **La scène y vient AVANT la prose qui explique** (ADR 0041 §6). L'Étape 1 de R2
   (`lesson.md:132-142`) DÉMONTRE $k=-b/a$ en cinq lignes ; posée au-dessus, la scène le fait
   **parier**. Posée à R3 ou plus bas, elle arriverait après la démonstration : plus rien à
   casser.
4. **R1 est trop tôt, R4 est un autre objet.** À R1 il n'y a pas de $b$, donc pas de palier —
   la scène perdrait son cluster. À R4 l'équation est du second ordre : un champ de pentes n'y
   dit rien (il faudrait un plan de phase, hors de tout cadre, §9.7).

**Conséquence non négociable : la scène est bornée par son RANG** (précédent du tremplin,
ADR 0041, addendum du 2026-09-25, point 3). Elle n'écrit **jamais** $Ce^{ax}$, ni « solution
générale », ni « condition initiale », ni $C$, ni $y''$, ni $\omega$, ni $\tau$, ni aucune
unité physique (§9). *Le solide de révolution bornait le PROGRAMME ; le tremplin bornait la
PAGE ; ici, c'est la PAGE aussi.*

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- ⚠ **LE TROU MESURÉ LE PLUS LOURD DE CETTE NOTION N'EST PAS CELUI-CI, ET LA SCÈNE NE LE
  TOUCHE PAS.** `REVIEW-2026-09-12.md:94-100` (F4) : « *Le seul cas attesté dans un sujet
  vérifié est $\Delta=0$ (racine double), et il vaut **0,5 des 1,0 point** que porte la
  notion. Dans la leçon : $\Delta>0$ a l'exemple travaillé complet avec ses contrôles ;
  **$\Delta=0$ a trois lignes, aucune vérification par substitution, aucun exemple travaillé**,
  et aucun item. L'élève rencontre le seul cas que l'examen lui a posé **pour la première fois
  dans l'exercice d'examen lui-même**.* » **C'est de la prose et des items, à R4, et c'est
  routé à content-author + item-author, pas à une scène.** *Si le propriétaire doit choisir UNE
  chose à faire sur cette notion, c'est celle-là, pas celle-ci. §13.1.*
- ⚠ **AUCUNE ANNALE VÉRIFIÉE DE CETTE NOTION NE DEMANDE $y'=ay+b$.** `bank.yaml` ne porte
  **qu'une** entrée — 2022 session normale, **SExp**, « *Résoudre $(E) : y''-2y'+y=0$* », 1,0
  point (`bank.yaml:91-102`, `:136`). L'en-tête du fichier l'écrit : « *Introuvable = absent :
  aucun autre sujet vérifié n'existe pour cette notion à ce jour* » (`:24-25`). **Ce que la
  scène prépare est un savoir-faire que les DEUX cadres listent** (`maths-sm.yaml:156`,
  `maths-sexp.yaml:154`) **et qu'aucune annale du corpus n'atteste.** Déclaré, pas maquillé.
  *Et `REVIEW:23-29` prévient : la notion ne fait **zéro** affirmation de fréquence d'examen,
  et c'est la bonne décision sur un relevé d'un seul exercice. **Cette spec n'en ajoute
  aucune**, et la prose commandée au §4 n'en écrira aucune.*
- **Le champ de pentes N'EST UN OBJET D'AUCUN DES DEUX CADRES.** Ni `maths-sm.yaml:152-159`
  ni `maths-sexp.yaml:150-159` ne nomment un champ de pentes, un champ de directions, une
  courbe intégrale ou une isocline. **La scène enseigne donc du contenu de cadre (le palier,
  la famille, le signe de $a$) à travers une représentation qui n'est pas au cadre.**
  Conséquence dure, portée au §9.6 et au §13.2 : **aucun item ne testera jamais la lecture
  d'un champ de pentes**, et le panneau ne laissera jamais croire que l'examen la demande.
- **Les deux fichiers de cadre maths sont des PROPOSITIONS NON AUTORITATIVES**
  (`maths-sm.yaml:12`, `maths-sexp.yaml:10`), aucune des trois portes de RULES §5 n'est
  passée, et le PDF officiel est un scan sans couche texte — **donc aucune citation `cadre
  p.N` n'existe pour maths**. §1 le porte en tête. §13.3.
- **Le désaccord de filière de la notion n'est pas tranché, et la scène ne le tranche pas.**
  `lesson.md:519-522` : « *Reste ouvert […] le désaccord de filière : cette note dit SM, alors
  que `checkpoints.yaml`, `exercises.yaml` et `bank.yaml` déclarent SExp — et que le seul sujet
  vérifié de la notion est un sujet SExp.* » **Reste dû.**
- **Le cadre est PÉRIMÉ sur le second ordre, et c'est le cadre qui a tort.**
  `REVIEW-2026-09-12.md:71-90` (F2 → research-lead) : `maths-sexp.yaml:158` et `:307`
  interdisent l'équation générale du 2ᵉ ordre en SExp, **et le seul sujet vérifié, SExp, la
  demande**. **Hors périmètre de cette scène** (qui est du premier ordre), **cité pour que
  personne ne croie l'arbitrage clos.**
- **Le champ `habilete` reste absent des 30 items** (fait **h**) : le mélange 50/35/15 (SExp)
  ou 40/40/20 (SM) est **incalculable avant comme après cette livraison**. **NON-VERDICT**,
  pas un vert. Adjugé corpus-wide (`REVIEW:119-120`).
- **Le sidecar « à retenir » est absent** (`REVIEW:127-132`, F-11) : le chapitre 4 retombe sur
  $T(t)=70e^{-0,1t}+20$ — la réponse d'une tasse de café, pas une méthode. **Hors scène.**
  Reste dû.
- **17 des 22 modèles ne sont pas rompus en prose et aucune spec ne consigne la délégation**
  (`REVIEW:105-109`, F-1/F-3/F-8). **Cette spec n'est pas le `spec.md` de la notion** : elle
  revendique **onze** modèles pour un rung et laisse les onze autres non revendiqués. §13.4.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

> ⚠ **RÉSERVE DE PROVENANCE, à porter dans tout ce qui descend de ce document.** Les deux
> fichiers de cadre maths portent en en-tête **« STATUT : PROPOSITION — NON AUTORITATIVE »**
> (`maths-sm.yaml:12-17`, `maths-sexp.yaml:10-16`) et **aucune de leurs trois portes n'est
> passée**. Les `savoir_faire`, **toutes** les `limites` et **toutes** les `exclusions` y sont
> marqués `source: derived` — reconstruits, **non vérifiés verbatim**. Je **ne corrige pas** et
> **ne contourne pas** ces fichiers (RULES : le cadre est autoritatif, une objection se
> signale) ; je **les signale** : *les frontières du §9 sont aussi solides que ces fichiers, et
> pas davantage.* **À faire valider par l'humain avant construction** (§13.3).
> *Et une réserve de plus, propre à CETTE notion : la vague 1 a démontré que le cadre est FAUX
> sur le second ordre SExp (`REVIEW:71-90`). Un fichier dont on a déjà prouvé qu'il se trompe
> une fois est un fichier qu'on cite en le disant.*

- **Filière / matière :** **deux** filières concernées — `sciences_mathematiques` (SM-A/SM-B)
  et `sciences_experimentales` (Sciences Physiques **et** SVT) / `mathematiques`.
  ⚠ **La seule annale de la notion est `filiere: "SExp"`** (`bank.yaml:100`). **Toute la preuve
  d'examen citée ici est donc SExp** — et elle porte sur le second ordre, pas sur l'objet de
  cette scène (§0.3).
- **Domaine → sous-domaine → chapitre :**
  - **SM** : `analyse` → `derivation_etude_fonctions` → **`equations_differentielles`**
    (`maths-sm.yaml:149-159`).
  - **SExp** : `analyse` → `continuite_derivation_fonctions` → **`equations_differentielles`**
    (`maths-sexp.yaml:147-159`).
- **Poids :**
  - **SM** — domaine `analyse` : **`part_examen: 50`** (`maths-sm.yaml:55`). Le sous-domaine
    `derivation_etude_fonctions` porte `poids: { part_domaine: "Analyse", note: "sous-domaine
    le plus lourd (20 capacités, pdfmath)" }` (`:105`) — **aucun `part_examen` chiffré au
    sous-domaine, et aucun au chapitre.**
  - **SExp** — domaine `analyse` : **`part_examen: 55`** (`maths-sexp.yaml:52`). Sous-domaine
    `continuite_derivation_fonctions` : « *sous-domaine le plus lourd de l'Analyse (24
    capacités, pdfmath)* » (`:84`) — **aucun chiffre plus fin.**
  - ⚠ **Le partage interne de l'Analyse n'est publié à aucune granularité** (`maths-sexp.yaml:58`
    le dit en toutes lettres). **Il n'existe donc AUCUN `part_examen` attribuable aux équations
    différentielles.** Le seul chiffre mesuré dont on dispose est celui de l'annale : **1,0
    point sur 20** (`bank.yaml:102`, `bareme_total: 1`), et `REVIEW:31-33` juge ce poids léger
    **juste** : « *ce chapitre pèse 1 point sur 20 dans le seul sujet vérifié. Le « gonfler »
    éloignerait de l'examen.* » **Cette spec ne le gonfle pas.**
- **Habiletés (la cible chiffrée de l'item-author, et le nombre que le critique de fidélité
  doit mesurer) :**
  - **SM** (`maths-sm.yaml:39-42`, recoupé `bac-reference.md:93-94`) : **application directe
    40 % · application non explicite 40 % · synthèse en situation inhabituelle 20 %.**
    *Coefficient 9, 4 h (`:36-37`).*
  - **SExp** (`maths-sexp.yaml:40-43`, recoupé `bac-reference.md:95-96`) : **50 % · 35 % ·
    15 %.** *Coefficient 7 (contesté 7-vs-5), 3 h (`:37-38`).*
  - **NON-VERDICT DÉCLARÉ** : `habilete` n'existe sur aucun des 30 items (fait **h**), donc
    **le rapport n'est calculable ni avant ni après cette livraison**. *Et cette livraison
    n'ajoute AUCUN item (§8.2), donc elle ne le déplace pas — ce qui est, pour une fois, la
    seule chose honnête qu'on puisse dire d'un rapport incalculable.*
- **`competences_ciblees` du sous-domaine :**
  - SM (`:107`) : « *Étudier une fonction […] et **résoudre les équations différentielles
    $y'=ay+b$ et $y''+ay'+by=0$**.* »
  - SExp (`:86`) : « *Étudier une fonction numérique […] et **résoudre des équations
    différentielles simples issues notamment de la physique**.* »
- **`programme` du chapitre, cité entier :**
  - SM (`maths-sm.yaml:153-154`) :
    > « **Équations $y'=ay$ et $y'=ay+b$ : solutions, condition initiale.** »
    > « Équation linéaire du second ordre à coefficients constants $y''+ay'+by=0$ : équation
    > caractéristique, forme des solutions selon le discriminant (cas $y''+\omega^2y=0$
    > inclus). »
  - SExp (`maths-sexp.yaml:151-152`) :
    > « **Équation $y'=a\cdot y$ ; équation $y'=a\cdot y+b$ : ensemble des solutions, solution
    > vérifiant une condition initiale.** »
    > « Équation de l'oscillateur $y''+\omega^2\cdot y=0$ : forme des solutions, condition
    > initiale (lien avec la physique : RC, RL, oscillateur). »

  *Les deux filières écrivent **$y'=ay+b$** à l'identique. C'est l'objet de cette scène, et
  c'est le seul objet de la notion que les deux cadres nomment de la même façon.*
- **Les `savoir_faire` que chaque étape sert :**
  1. SM (`:156`) « **Résoudre $y'=ay+b$ avec condition initiale.** » → **S3, S4, S5**
     (le palier à S3, le comportement à S4, la famille à S5).
  2. SExp (`:154`) « **Résoudre $y'=ay$ et $y'=ay+b$ ; déterminer la solution vérifiant une
     condition initiale.** » → **S1, S2** (la lecture locale de $y'=ay$), **S3, S4, S5**.
  3. SExp (`:156`) « Reconnaître, dans un contexte physique (charge/décharge, oscillateur),
     l'équation différentielle correspondante. » → **hors scène** : c'est R5, et c'est la
     frontière avec la physique du §9.3.
  4. SM (`:157`) « Écrire et résoudre l'équation caractéristique de $y''+ay'+by=0$ […] » →
     **hors scène** : c'est R4 (§9.2), et c'est le trou mesuré du §0.3 que cette scène ne
     referme pas.
- **`limites` portées en dur :**
  - SM (`maths-sm.yaml:158-159`, `source: derived`) :
    > « **SM : équation caractéristique du 2e ordre à coefficients constants et SANS second
    > membre. Pas de second membre non constant (pas de solution particulière/variation de la
    > constante générale).** »
  - SExp (`maths-sexp.yaml:157-159`, `source: derived`, avec un `_flag_derive_fort`) :
    > « **Uniquement : $y'=ay+b$ (1er ordre, coefficients constants) et $y''+\omega^2y=0$ (2e
    > ordre SANS terme du 1er ordre). PAS de $y''+ay'+by=0$ générale (avec amortissement) […]
    > PAS de second membre non constant, pas de variation de la constante.** »

  **Quatre conséquences non négociables :**
  1. **$b$ est une CONSTANTE, à tous les crans, à toutes les étapes** — aucun second membre
     dépendant de $x$, jamais (§9.6). *C'est la seule `limite` des deux cadres qui morde
     directement sur le premier ordre, et elle mord ici : un champ de pentes rend un second
     membre variable trivialement dessinable, donc tentant.*
  2. **Aucune variation de la constante, aucune séparation des variables, aucune intégration**
     (§9.6). *La leçon résout par la fonction auxiliaire $z=ye^{-ax}$ (`lesson.md:65`) et par
     le changement $z=y-y_p$ (`:148`) ; la scène ne résout pas du tout.*
  3. **Aucun second ordre** : ni $y''$, ni $\omega$, ni équation caractéristique, ni
     discriminant (§9.2). *La scène est du premier ordre, et un champ de pentes ne dit rien
     d'une équation du second ordre.*
  4. **Le cas $a=0$ est hors cadre et n'est pas un cran** : la leçon l'écarte elle-même
     (`lesson.md:142` : « *l'équation $y'=b$ se traite directement comme une primitive
     constante, hors du cadre de ce chapitre* »), et $-b/a$ n'y a pas de sens (§9.6).
- **`exclusions_transversales` : elles existent, au NIVEAU DU FICHIER (pas du sous-domaine).**
  **7 entrées** dans `maths-sm.yaml:340-347`, **8** dans `maths-sexp.yaml:300-308`, toutes
  `source: derived — À VALIDER`. **Deux mordent ici**, et elles sont portées en dur au §9 :
  1. `maths-sexp.yaml:307` — « *Équation différentielle $y''+ay'+by=0$ générale (avec
     amortissement) : SExp limité à $y'=ay+b$ et $y''+\omega^2y=0$ ; le cas amorti relève de
     SM.* » → **§9.2** *(et c'est l'exclusion que `REVIEW:71-90` démontre FAUSSE ; la scène ne
     s'en approche pas, donc le désaccord ne l'atteint pas).*
  2. `maths-sm.yaml:341` — « *Développements limités / formule de Taylor : hors 2e Bac* » et
     `maths-sm.yaml:342` — « *Intégrales impropres / généralisées* » → **§9.6** (les deux
     formes qu'un champ de pentes met à portée de main : l'approximation locale et
     l'intégration).

  *Aucune exclusion propre au sous-domaine n'existe ; la granularité diffère de
  `pc-physique-chimie.yaml`, qui porte des `exclusions` par sous-domaine. **Même constat que la
  spec sœur, même routage à research-lead**, et pas une objection de plus. §13.3.*
- **La frontière qui mord le plus fort est INTERNE, et elle est triple.**
  1. **Le rang dans la leçon.** La scène est en tête de **R2 (chapitre 3)**. À cet endroit
     l'élève a lu R0 (la tasse, $T'=-k(T-20)$, le point d'arrêt `cp-r0-predict`) et R1
     ($y'=ay$, la preuve de complétude, $Ce^{ax}$, le sens du signe de $a$, `cp-r1-signe-a`) —
     **et rien d'autre**. Il n'a lu ni $y_p=-b/a$, ni la solution générale de $y'=ay+b$, ni la
     méthode de la condition initiale, ni le second ordre.
  2. **$Ce^{ax}$ est un ACQUIS, pas un objet — et la scène ne l'écrit JAMAIS.** La solution de
     $y'=ay$ est établie et encadrée à `lesson.md:83`. La scène **dessine des courbes** ; elle
     **n'écrit aucune formule de solution**, à aucune étape (§9.1). *Motif : la formule de R2
     est exactement ce que la prose qui suit démontre. Une scène qui l'écrirait volerait la
     démonstration ; une scène qui dessine la met en appétit.*
  3. **La constante $C$ n'existe pas dans la scène.** Ni la lettre, ni la valeur, ni le mot
     « constante d'intégration ». *C'est le cœur de R3 (chapitre 4), et la lettre `C` est déjà
     un point de friction de la notion — `lesson.md:418` note que la capacité est écrite $C_0$
     « pour ne pas la confondre avec la constante d'intégration ».*

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les quatre médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `refroidissement-modeles` (4 étapes) | **R0** | les quatre mesures, le modèle A (droite qui s'arrête net à 12,7 min), le modèle B (la courbe qui ralentit) | **une seule équation**, une seule tasse, un seul palier ($20$). Aucun réglage. Et c'est une figure de MODÉLISATION : elle ne montre aucune équation différentielle, seulement deux courbes candidates |
| `famille-solutions` (3 étapes) | **R3** | **la figure la plus proche de cette scène** : quatre solutions de $T'=-0{,}1T+2$, pour $T_0 \in \{90;60;40;0\}$, convergeant vers le palier $20$ tracé en pointillés | **$a$ et $b$ sont gelés** ($-0{,}1$ et $2$). Ce qui varie est la condition initiale. **La ligne du palier ne se déplace donc JAMAIS** — et c'est précisément la chose que les 13 items du palier demandent de calculer. Aucun réglage |
| `oscillateur-periode` (3 étapes) | **R4** | $y=3\cos 4x+2\sin 4x$, la période $\pi/2$, l'amplitude $\sqrt{13}$ | autre objet (second ordre), hors scène (§9.2) |
| `rc-charge-decharge` (3 étapes) | **R5** | la charge $E(1-e^{-t/RC_0})$ et la décharge $U_0e^{-t/RC_0}$, le palier $E$ en pointillés | autre rung, et **en habits physiques** : hors scène (§9.3) |

**Le constat, et il est exact : aucune figure de la notion ne fait varier une ÉQUATION.** La
seule chose réglable de tout le corpus est une condition initiale, dans un SVG figé, sur une
seule équation, à R3.

### 2.2 Le motif central : une équation qui parle en chaque point, et une ligne plate qui n'est pas là où on croit

Le point que la scène existe pour installer, en une phrase :

> $y'=ay+b$ ne donne pas une courbe : elle donne, **en chaque point du plan**, une pente — et
> cette pente ne dépend **que de la hauteur $y$**, jamais de l'abscisse. Là où cette pente
> s'annule, il y a une **ligne plate** : c'est le palier, il est à la hauteur $-\dfrac{b}{a}$,
> **et ce n'est pas $b$**. Toutes les solutions visent cette même ligne, d'où qu'elles
> partent, et aucune ne la franchit.

**Quatre raisons mesurées pour lesquelles aucune figure ne peut le montrer.**

1. **« Le palier est $-b/a$, pas $b$ » ne se voit pas sur un exemple.** Sur
   `famille-solutions`, $b=2$ et le palier vaut $20$ : les deux nombres sont si éloignés que
   rien ne se joue. Il faut **garder $a$ et promener $b$** et voir la ligne plate se déplacer
   **d'un facteur $-1/a$**, ou l'inverse. Une figure ne fait ni l'un ni l'autre. *Et le corpus
   mesure ce modèle cinq fois (`palier-recopie-b`, 5 items) — c'est le plus couvert des 22.*
2. **Le cas où le modèle faux tombe JUSTE existe, et il est exactement identifiable.** La
   leçon l'écrit en toutes lettres (`lesson.md:184`) : « *si $y(x)=Ce^{ax}+b$ était solution,
   l'identification des deux membres imposerait $b(a+1)=0$ — donc $b=0$ ou $a=-1$
   seulement.* » **Sur la grille de la scène, $a=-1$ est le seul cran où le palier vaut $b$
   à chaque $b$** (§5.3 A). Faire TROUVER cette ligne-là — « le seul réglage où la règle fausse
   ne se fait pas prendre » — est impossible sur une figure, et c'est le geste qui transforme
   une règle apprise en une règle comprise. *C'est aussi un piège de stem, et il est désamorcé
   par construction : **le cran $a=-1$ n'est l'état d'AUCUN pari** (§5.2 A, §7.6 E).*
3. **« La pente ne dépend que de $y$ » est une NON-observation.** On ne peut pas la dessiner
   d'un trait : il faut **regarder deux points à la même hauteur et constater qu'ils portent le
   même segment**, puis deux points à la même abscisse et constater qu'ils n'en portent pas le
   même. C'est exactement le geste que `orbite-geostationnaire` a rendu (« il ne bouge pas au
   pixel près ») et qu'aucune figure plane ne peut porter. *Et c'est le mécanisme de R0 :
   « c'est l'**écart** qui pilote la vitesse » (`lesson.md:31`) — écrit une fois, en prose,
   jamais montré.*
4. **« Toutes visent le même palier » est montré sur UNE équation, et c'est le problème.**
   `famille-solutions` le montre — pour $a=-0{,}1$, $b=2$. Un élève peut en sortir en croyant
   que le palier est une propriété de CETTE tasse. La scène le lui fait vérifier sur douze
   équations.

**Et la leçon pose les deux moitiés sans jamais les opposer.** R1 donne la famille $Ce^{ax}$
et son comportement ; R2 donne le palier par le calcul ; **rien, nulle part, ne met les deux
dans le même plan sous les yeux de l'élève avant `famille-solutions`, qui arrive à R3, après
que tout a été démontré.**

### 2.3 L'antidote obligatoire : une chaîne construite en CINQ temps

$y'=ay+b$ contient quatre réponses (la pente locale, l'invariance en $x$, le palier, le
comportement) ; un retour trop bavard les donne toutes d'un coup. Même discipline qu'au banc
de diffraction (règle `formule-graduee` ; ADR 0041, addendum du 2026-09-24 nuit : *la relation
est un ÉTAT qui fuit*). **La frontière se pose ÉTAPE PAR ÉTAPE, consigne ET retours ET
lectures** — une consigne a le droit d'imprimer ce que son propre énoncé exige.

- **S1** établit que l'équation impose une pente **en un point**, et que cette pente se calcule
  avec le coefficient ET la hauteur. Aucun $b$, aucun palier, aucune courbe.
- **S2** ajoute l'**invariance en $x$** : deux points de même hauteur portent la même pente.
  Il ne peut ni parler de palier, ni tracer une courbe.
- **S3** ajoute le **palier** : $b$ apparaît, et la ligne plate est à $-\dfrac{b}{a}$. Il ne
  peut tracer aucune courbe.
- **S4** ajoute la **courbe** et son comportement : elle s'approche du palier sans l'atteindre,
  et le signe de $a$ décide si elle s'en approche ou s'en écarte. Il ne peut pas montrer
  plusieurs courbes.
- **S5** ajoute la **famille** : plusieurs courbes, un seul palier, aucune intersection.

**Contrainte non négociable et mesurable. La table du §7.6 C est la SEULE autorité ; ce qui
précède en est un résumé et ne doit jamais la contredire** (correctif de vague 1 de la spec
sœur, fidélité S10) : `b`, `palier`, `ligne plate`, `-\dfrac{b}{a}` pas avant **S3** ;
toute COURBE tracée pas avant **S4** ; plus d'une courbe pas avant **S5** ; et **à toutes les
étapes**, les chaînes du §9. La porte le lit dans le `textContent` **rendu**, en remplaçant
chaque `.katex` par son **annotation TeX** (leçon du banc d'électrolyse).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

⚠ **Cette table est plus courte que celle de la spec sœur, et c'est un fait, pas une
omission : la notion ne porte QU'UNE annale vérifiée, et elle ne traite pas $y'=ay+b$**
(§0.3). Les deux premières lignes viennent donc du **cadre**, pas d'annales.

| geste | où il est demandé | ce que le corpus en fait |
|---|---|---|
| **Résoudre $y'=ay+b$ (donc trouver le palier)** | `maths-sm.yaml:156` et `maths-sexp.yaml:154`, savoir-faire des DEUX cadres | 13 emplacements d'items, **tous en choix d'écriture** ; un point d'arrêt, **quatre formules** ; une figure, **un seul palier gelé** (§0.1 d, c) |
| **Reconnaître qu'une équation ne fixe qu'une famille** | `maths-sm.yaml:153` / `maths-sexp.yaml:151` (« ensemble des solutions ») | R1 l'énonce en prose (`lesson.md:87-91`) ; `famille-solutions` le montre sur une équation, à R3, **après la démonstration** |
| **Résoudre $y''+ay'+by=0$ (cas $\Delta=0$)** | **la seule annale vérifiée** : `bank.yaml:136`, 0,5 pt sur les 1,0 de la notion | **trois lignes de prose, aucun exemple travaillé, aucun item** (`REVIEW:94-100`) — **et ce n'est pas le travail de cette scène** (§0.3, §13.1) |

### 2.5 Ce que la scène ne double pas

- **`famille-solutions`** (R3) : une équation figée, la condition initiale seule variable, et
  **placée trois rungs plus bas**. La scène est générique et réglable ; la figure est l'ancrage
  de la tasse de café. *Recouvrement partiel et VOULU sur un seul fait (« toutes visent le même
  palier »), sur deux objets différents : la scène le fait TROUVER sur douze équations à R2, la
  figure le CONSIGNE sur celle de la leçon à R3. §7.5 le vérifie ligne à ligne.*
- **`cp-r2-palier`** (`checkpoints.yaml:130-175`, après R2) : quatre **écritures**
  ($Ce^{4x}+2$, $-8$, $-2$, rien). La scène pose un **lieu** (à quelle hauteur le champ est-il
  plat ?). *Complémentaires, jamais doublons — et le §7.5 le vérifie choix par choix, comme la
  spec sœur a dû le faire après la vague 1.*
- **`cp-r0-predict`** (R0) : les deux modèles de refroidissement, en mots. La scène ne rejoue
  ni la tasse, ni les degrés, ni les minutes (§9.3).
- **`rc-sandbox`** (`pc/rc-charge`, embed PhET) et **`sandbox-chute-frottement`**
  (`pc/chute-mouvements-plans`, SVG + curseur) : **la même équation, en habits physiques,
  dans une autre matière.** §9.3 écrit la frontière et §13.6 la question.
- **`plan-complexe-transformation`, `sphere-plan-droite`, `produit-vectoriel`,
  `solide-revolution`** : autres notions, autres objets. Aucun recouvrement.

### 2.6 Trois idées volontairement écartées

- **L'échelle de temps $-\dfrac{1}{a}$, ÉCARTÉE — et c'était dans le titre de travail.**
  *Trois motifs mesurés.* **(a)** Aucun des deux cadres ne nomme une constante de temps côté
  maths : `maths-sm.yaml:153-157` et `maths-sexp.yaml:151-156` n'écrivent ni $\tau$, ni
  « constante de temps », ni « temps caractéristique ». **(b)** Dans CETTE leçon, $\tau$
  n'apparaît qu'à **R5**, en physique (`lesson.md:460` : $\tau=L/R$), et le modèle `tau-inverse`
  est un modèle de R5 (items EQDIFF-17, -28, -30). Le porter à R2 serait un écart de phase de
  **trois rungs** — exactement ce que la vague 1 du banc d'électrolyse a refusé. **(c)** Le
  seul mot de la leçon pour cette idée est déjà pris par la physique. **Pour défaire :** §13.5
  donne le chemin (une sixième étape en tête de R5, ou une scène PC). *Ce qu'on perd est réel
  et il est écrit : la scène montre QUE la courbe s'approche du palier, jamais À QUELLE
  VITESSE.*
- **Un point $P$ librement déplaçable à la souris, ÉCARTÉ.** Avec un $(x_0;y_0)$ quelconque,
  **aucune lecture n'est exacte** : la pente devient un décimal arbitraire, l'écart au palier
  aussi. *La valeur pédagogique de cette scène tient à ce que tout nombre affiché est exact
  (§5.4).* **Cinq positions discrètes**, choisies pour cela. *§13.7 — et contrairement à la
  scène sœur, **aucun balayage muet n'est proposé ici** : ce que le continu dirait (« la pente
  varie sans à-coup avec la hauteur ») est déjà dit par le champ tout entier, qui est un
  continuum discrétisé. Un balayage n'ajouterait rien qu'un cran n'ajoute.*
- **Une animation de la courbe qui se construit pas à pas depuis le champ, ÉCARTÉE.**
  `temps: false`, `course: false`. *Deux motifs.* **(a)** Le mouvement n'est jamais une raison
  (ADR 0041 §1). **(b)** Plus grave : une courbe **construite pas à pas en suivant les
  segments** EST la méthode d'Euler — au programme de `pc/chute-mouvements-plans`
  (`pc-physique-chimie.yaml:284`) et **de AUCUN des deux cadres maths**. Ce serait une scène
  qui glisse hors du cadre en donnant l'impression d'expliquer. **Interdit au §9.6, avec sa
  sonde.** *§13.8.*

---

## 3. Placement

**En tête de `## R2 — $y' = ay+b$ : ajouter un palier`** (`lesson.md:116`), entre le titre et
`### Pourquoi $y'=ay$ ne suffit pas toujours` (`lesson.md:118`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:champ-des-pentes]]
```

précédée du paragraphe d'annonce neutre du §4.1.

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose qui
explique*).

Vérification étape par étape contre **tout** ce qui est lu au marqueur — la prose
`lesson.md:1-117` (R0 et R1, **titre de R2 compris**) **et** les retours des deux points
d'arrêt situés au-dessus, `cp-r0-predict` (`checkpoints.yaml:28-81`) et `cp-r1-signe-a`
(`:83-128`) :

| étape | ce qui répondrait | où | déjà lu au marqueur ? |
|---|---|---|---|
| **S1** — la pente en un point vaut $a\,y$ | **nulle part.** R1 dérive $Ce^{ax}$ et vérifie $y'=ay$ (`lesson.md:57`), mais **toujours sur la fonction, jamais en un point du plan**. Le principe est écrit dans un registre de misconception (`items.yaml:212-215`), que l'élève ne lit pas | — | ❌ **non** |
| **S2** — la pente ne dépend que de la hauteur | **la règle est DÉRIVABLE** en une ligne de $y'=ay$ ; **mais la lecture « deux points à la même hauteur portent le même segment » n'est écrite nulle part**, et R0 pose explicitement la question inverse (« le rythme a changé du tout au tout », `lesson.md:25`) sans jamais dire de quoi il dépend en un point | — | ❌ **non** *(le mécanisme est à `lesson.md:31`, en mots, sur la tasse ; sa lecture dans un plan, jamais)* |
| **S3** — le palier vaut $-\dfrac{b}{a}$ | `lesson.md:132-142` (Étape 1 de R2) | **R2, APRÈS** le marqueur | ❌ **non** |
| **S4** — la courbe s'approche du palier sans l'atteindre ; le signe de $a$ décide | ⚠ R0 l'écrit **pour la tasse** : « *sans jamais l'atteindre tout à fait* » (`lesson.md:13`, modèle B, et `:29`) ; et R1 « Le sens du signe de $a$ » (`:93-100`) donne $a<0 \Rightarrow e^{ax}\to 0$ | **AVANT**, pour $b=0$ et pour une tasse | ⚠️ **partiellement lu — coût déclaré ci-dessous** |
| **S5** — un seul palier pour toute la famille ; aucune intersection | ⚠ R1 « une fonction, ou une famille de fonctions ? » (`:87-91`) établit **l'infinité de solutions** et annonce qu'une information de plus est nécessaire. **Il n'écrit ni « exactement une par point », ni « elles ne se coupent jamais », ni « elles partagent le palier »** — ce dernier n'arrive qu'à `:256`, à R3 | **AVANT**, pour la moitié | ⚠️ **partiellement lu — coût déclaré** |

**Le coût résiduel, déclaré (deux fois).**

1. **S4.** L'élève arrive en sachant que *cette tasse* ne descend jamais sous $20$ et que, pour
   $b=0$, $a<0$ mène à $0$. **Ce qu'il ne sait pas, c'est que la limite est le palier
   $-b/a$ — et c'est ce que S4 fait choisir** (le distracteur `palier-oubli`, « elle descend
   vers $0$ », est exactement l'élève qui transporte R1 sans $b$). *La force de S4 est
   entamée, pas annulée ; et le distracteur le plus fort de S4 est précisément celui que R1
   fabrique.*
2. **S5.** L'élève sait qu'il y a une infinité de solutions. **Ce qu'il ne sait pas, c'est
   qu'elles partagent un palier et ne se croisent jamais.** *Le pari de S5 porte sur cela seul,
   et ses trois distracteurs le mesurent ; « combien y en a-t-il ? » n'est PAS la question de
   S5, précisément parce que R1 y a déjà répondu.*

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **S1 et S2 sont DÉRIVABLES de R1, et c'est assumé.** Un élève qui a lu $y'(x)=a\,y(x)$
   (`lesson.md:49`) peut en déduire les deux. **Ce que S1 et S2 attrapent, ce n'est pas la
   règle : c'est ce que la notion entière encourage sans le vouloir** — sept rungs qui traitent
   une équation différentielle comme une **formule à trouver**, et pas une seule ligne qui la
   traite comme une **consigne locale**. Le fait **f** du §0.1 le mesure : les quatre figures
   tracent des solutions, aucune ne dessine l'équation.
2. **La scène ne prépare AUCUN geste d'examen directement.** Aucune annale vérifiée ne demande
   $y'=ay+b$, et aucune ne demandera jamais de lire un champ de pentes (§0.3, §9.6). **La scène
   est un instrument d'enseignement, pas d'entraînement**, et c'est écrit dans le
   `fit_caveat` (§10.1) et dans le paragraphe d'annonce (§4.1). *C'est la tension la plus
   sérieuse de cette proposition, et §13.2 la met au propriétaire.*

**Ce que le placement NE fait pas.** `cp-r2-palier` reste où il est, **après** R2
(`lesson.md:186`), et **n'est pas modifié** ; `cp-r1-signe-a` et `cp-r0-predict` non plus.
Le §7.5 vérifie choix par choix que la scène et `cp-r2-palier` ne se doublent pas.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

*Le §4 décrit ; il ne rédige pas. Toute prose commandée ici emploie la numérotation
« chapitre N » établie en tête de document (**R2 = chapitre 3**), la voix du reste de la
notion, et **n'introduit aucune citation « chapitre N » nouvelle** — `REVIEW:19-21` a vérifié
les 49 existantes une à une ; on n'en ajoute pas à vérifier.*

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

**Emplacement :** juste après le titre `## R2` (`lesson.md:116`), avant le marqueur.
**Longueur : 70 à 95 mots. Ton : neutre, il n'annonce aucune réponse.**

Il doit : **(a)** rappeler ce que le chapitre 2 a laissé — une famille de courbes, et rien qui
dise vers quoi elles vont quand un terme constant s'ajoute ; **(b)** dire qu'on va **essayer
avant de démontrer** ; **(c)** **ne nommer ni palier, ni $-b/a$, ni solution constante comme
des résultats** ; **(d)** dire à l'élève, en une phrase, que **ce qu'il va essayer ne démontre
rien** — le plan lui montrera la règle sur une poignée d'équations, et **la démonstration,
c'est le paragraphe qui suit**.

*Formulation possible pour (d), à retravailler par content-author : « Attention à ce que ce
plan est : un banc d'essai, pas une preuve. Douze équations bien choisies ne démontrent rien en
mathématiques — la démonstration vient juste après, et elle vaut pour tous les $a$ et tous les
$b$ à la fois. »* **C'est la seule clause du §4.1 dont le contenu est non négociable** : sans
elle, une scène de maths qui « vérifie » une règle sur soixante états enseigne, en creux, que
vérifier suffit. *Interdit, en revanche : toute phrase de la forme « tu verras que… ».*

### 4.2 Le marqueur

Seul sur sa ligne : `[[embed:champ-des-pentes]]`.

### 4.3 Une phrase de mécanisme dans l'Étape 1 de R2 — APRÈS le marqueur

**Emplacement : dans `### Étape 1 : chercher une solution constante`, après
`lesson.md:142`. 30 à 50 mots.** Elle doit **raccorder la démonstration au plan** en une
phrase, sans le rejouer : la solution constante $y_p=-\dfrac{b}{a}$ est **la ligne où le
plan était plat** — une fonction dont la dérivée est nulle partout, c'est exactement une
courbe qui, en chaque point, reçoit la pente $0$.

*C'est le seul endroit où la prose a le droit de nommer le plan. Elle le fait une fois, en
aval, et jamais comme une preuve.*

### 4.4 Une phrase dans « Arrête-toi : le palier, ce n'est PAS $b$ » — le cas $a=-1$

**Emplacement : `lesson.md:184`, à la suite de « *l'identification des deux membres imposerait
$b(a+1)=0$ — donc $b=0$ ou $a=-1$ seulement* ». 20 à 35 mots.**

La leçon écrit déjà **la** phrase juste. Il lui manque de dire que ce cas **existe** et
**qu'on peut le rencontrer** : quand $a=-1$, recopier $b$ tombe juste **par accident**, et
c'est le pire des cas — une règle fausse qui ne se fait pas prendre. *C'est ce que la `suite`
de S4 fait chercher ; la prose le nomme.*

### 4.5 Une puce dans la fermeture d'arc de R3 — et rien de plus

**Emplacement : `lesson.md:256`, dans le paragraphe qui commente `famille-solutions`. 15 à
30 mots.** Il écrit déjà « *qui partagent toutes le même palier $T_p=-b/a=20$ sans jamais le
franchir* ». Ajouter que c'est **la même chose que dans le plan du chapitre 3**, sur une
équation particulière. *Un raccord, pas une leçon.*

### 4.6 Aucun nouveau point d'arrêt, et aucun item — c'est un livrable NÉGATIF

**Cette spec ne commande AUCUN item et AUCUN point d'arrêt.** *Trois motifs, chacun mesuré.*

1. **Aucun modèle neuf n'est nécessaire** (§8.2) : les onze modèles que la scène confronte
   sont tous déjà déclarés et tous déjà au-dessus du plancher.
2. **`REVIEW:124-126` (F12)** signale déjà deux items quasi jumeaux (EQDIFF-1 / EQDIFF-22,
   tous deux $y'=3y$) et **`honest_state` prévient que la marge est nulle** : ajouter du volume
   QCM dans cette notion n'est pas ce qu'elle demande.
3. **Ce que la notion demande en items est ailleurs** : le cas $\Delta=0$, à R4, sans aucun
   item (`REVIEW:94-100`). **Routé, pas absorbé** (§13.1).

⚠ **Une conséquence dure, et elle est déclarée : la scène enseigne cinq faits que le banc de
fin ne mesure toujours PAS directement.** Les onze modèles qu'elle confronte restent mesurés
par les mêmes 30 QCM d'écriture qu'avant. **La scène déplace la compréhension, pas le modèle
apprenant.** *Si le propriétaire veut que le banc voie la différence, c'est une passe d'items
à part, et §13.9 dit à quoi elle ressemblerait.*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Le repère — isotrope, fixe, gradué, et l'isotropie est ici une question de VÉRITÉ

**Fenêtre de données : $x \in [-2 ; 10]$, $y \in [-6 ; 6]$ — un CARRÉ ($12 \times 12$). Elle ne
change JAMAIS**, à aucune étape, à aucun réglage. `format: "carre"` (`Plateau.tsx:31`,
`:53-60`).

> **L'isotropie n'est pas un confort ici, c'est la condition pour que la scène ne MENTE pas.**
> Un segment de champ est dessiné à l'angle $\arctan(m)$. Si le facteur px/unité diffère entre
> les deux axes, **le segment affiché n'a plus la pente $m$** : une pente $1$ ne fait plus
> $45°$, une pente $0$ reste plate mais une pente $-3$ paraît en valoir $-2$ ou $-5$. La scène
> existe pour faire LIRE une pente sur un trait ; un repère anisotrope la rend fausse au
> premier coup d'œil, tout en restant juste dans les nombres. **C'est le pire genre de défaut :
> cohérent.**
>
> *Le dépôt a déjà payé pour l'avoir oublié — dans une AUTRE notion.*
> `docs/ops/SCENE-CONTRACT.md:186-203` : « *Le repère doit être ISOTROPE […] Défaut RÉEL trouvé
> le 2026-08-14 […] **écart de 36,9 % entre le rayon écran et la distance H-centre** — le
> dessin contredit alors la preuve qu'il illustre.* »
>
> **Donc :** le facteur px/unité est **le même horizontalement et verticalement**, à tout
> instant et à toute largeur. Si la largeur disponible impose un autre rapport, **la fenêtre
> s'ÉTEND symétriquement du côté qui a de la place** — elle ne se redimensionne jamais sur un
> seul axe. **Famille de porte à part entière** (§11.2, `isotropie`), mesurée dans les deux
> sens, et **avec une sonde propre à cette scène : l'angle écran d'un segment de pente connue**
> (§11.2, `segment-a-la-bonne-pente`).

Sont tracés à l'encre, toujours : les deux axes, **les graduations entières**, l'origine $O$,
et **le quadrillage entier, OPAQUE** (règle du banc de modulation, ADR 0041 addendum du
2026-09-25 point 6 : *Chromium compose deux fois les sous-chemins qui se croisent dans un même
trait semi-transparent*). *Le quadrillage n'est pas décoratif : c'est lui qui rend une pente
lisible sans rapporteur — une pente $-3$ descend de trois carreaux pour un carreau à droite,
et c'est ainsi qu'un élève la vérifie.*

**Échelle mesurée — CALCULÉE, pas relevée sur le rendu (§15.1).** Le plateau est carré : son
côté vaut $\min(\text{largeur disponible},\ \text{plafond de hauteur})$. À $1\,280$ px, avec
un plafond de **560 px**, le plateau fait $560 \times 560$ ⟹ $560/12 \approx \mathbf{46{,}7}$
px/unité. **À 390 px : $390/12 = \mathbf{32{,}5}$ px/unité.** *Deux points distants d'une unité
sont donc à 47 px au bureau, 33 px au téléphone.*

### 5.2 Les crans — et pourquoi ces valeurs-là

**A — les trois coefficients $a$** :

| cran | $a$ | ce qu'il fait | pourquoi ce cran |
|---|---|---|---|
| `-1` | $-1$ | décroissance rapide vers le palier | ⚠ **LE CRAN DÉGÉNÉRÉ** : c'est le seul où $-\dfrac{b}{a}=b$ **pour tout $b$** (`lesson.md:184`, $b(a+1)=0$). **Il n'est l'état d'AUCUN pari** ; il est la CIBLE de la `suite` de S4 |
| `-0.5` | $-\dfrac12$ | décroissance plus lente ; palier $=2b$ | **l'état de S3, S4 et S5** : le palier y vaut le DOUBLE de $b$, donc « recopier $b$ » se voit du premier coup d'œil |
| `0.5` | $\dfrac12$ | **croissance** : la courbe FUIT le palier | **le seul $a>0$** — sans lui, `signe-a-comportement` n'a pas de cran où casser, et la moitié du « Sens du signe de $a$ » de R1 (`lesson.md:93-100`) n'existe pas dans la scène |

> **Pourquoi trois et pas quatre ou sept.** Un quatrième cran ($a=-0{,}25$ ou $a=1$) a été
> essayé et **retiré sur un calcul** : avec $a=-0{,}25$ et $b=2$, le palier vaut $8$, **hors
> de la fenêtre** ; avec $a=1$, la courbe issue de $(0;5)$ quitte le cadre par le haut avant
> $x=0{,}3$, ce qui ne montre plus rien. *Trois crans suffisent à tout ce que les cinq étapes
> demandent : un dégénéré, un pédagogique, un de signe opposé.*

**B — les quatre termes constants $b$** : `-2` · `0` · `1` · `2`.

*`0` est indispensable (c'est le cas de R1, et le seul où le palier est l'axe) ; `-2` est le
seul NÉGATIF, et il fait exister le double signe qui produit `palier-signe` ; `1` et `2`
donnent des paliers $2$ et $4$ à $a=-0{,}5$, tous deux bien distincts de $b$.*

**C — les cinq points $P$** (`point`) :

| cran | $(x_0 ; y_0)$ | pourquoi ce cran |
|---|---|---|
| `origine` | $(0 ; 3)$ | **l'état de S1** |
| `decale` | $(4 ; 3)$ | **l'état de S2** — **même hauteur que `origine`, quatre unités plus loin.** C'est le seul couple de la grille qui partage une ordonnée, et il existe pour cela |
| `haut` | $(0 ; 5)$ | **l'état de S4** : au-dessus de tous les paliers (le plus haut vaut $4$) |
| `bas` | $(0 ; -3)$ | sous tous les paliers positifs — la remontée **vers** le palier (le cas « $T_0=0$ » de `famille-solutions`) ; **l'état de S5** |
| `sur` | $(0 ; 2)$ | **exactement SUR le palier** quand $(a;b)=(-1;2)$ ou $(-0{,}5;1)$ ⟹ la solution **constante**, une droite horizontale. *C'est l'Étape 1 de R2, vue* |

**Il n'y a pas de cran $x_0 < 0$, et c'est délibéré** : la leçon travaille des temps qui
démarrent (`lesson.md:194`), et un $x_0$ négatif n'ajoute rien qu'une lecture de plus.

### 5.3 Les tables de nombres — l'arithmétique de la scène, vérifiée

**A — les DOUZE paliers $-\dfrac{b}{a}$** (le cœur de S3) :

| $a \backslash b$ | $-2$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|
| $-1$ | $\mathbf{-2}$ | $\mathbf{0}$ | $\mathbf{1}$ | $\mathbf{2}$ |
| $-\tfrac12$ | $-4$ | $0$ | $2$ | $4$ |
| $\tfrac12$ | $4$ | $0$ | $-2$ | $-4$ |

*Vérifications : $-(-2)/(-1)=-2$ ✓ · $-1/(-1)=1$ ✓ · $-2/(-1)=2$ ✓ · $-(-2)/(-\tfrac12)=-4$ ✓ ·
$-1/(-\tfrac12)=2$ ✓ · $-2/(-\tfrac12)=4$ ✓ · $-(-2)/\tfrac12=4$ ✓ · $-1/\tfrac12=-2$ ✓ ·
$-2/\tfrac12=-4$ ✓.*

> **La première ligne est en gras parce qu'elle EST le piège de la leçon.** À $a=-1$, le palier
> vaut $b$ **aux quatre crans** — c'est $b(a+1)=0$ de `lesson.md:184`, rendu visible. Aux deux
> autres lignes, le palier ne vaut $b$ **qu'à $b=0$**, et c'est une coïncidence d'un seul cran.
> **Conséquence de conception, non négociable : le cran $a=-1$ n'est l'état d'aucun pari**
> (§7.6 E) — sinon le distracteur `palier-recopie-b` atteindrait la **bonne réponse**, ce qui
> est une *contamination de la réponse juste*, un défaut de **stem**. *C'est exactement le
> défaut que la spec sœur a dû corriger à son S2 ; ici il est désamorcé avant d'exister.*

**Tous les paliers tiennent dans $[-4;4]$, donc à $\ge 2$ unités du bord de la fenêtre** ✓.

**B — les pentes $a\,y_0 + b$ aux cinq points** (le cœur de S1 et S2). *Les cinq points n'ont
que **quatre** ordonnées distinctes — $3$ (`origine` et `decale`), $5$, $-3$, $2$ — donc la
table entière tient en quatre colonnes :*

| $(a;b) \backslash y_0$ | $3$ | $5$ | $-3$ | $2$ |
|---|---|---|---|---|
| $(-1;0)$ | $\mathbf{-3}$ | $-5$ | $3$ | $-2$ |
| $(-1;2)$ | $-1$ | $-3$ | $5$ | $\mathbf{0}$ |
| $(-\tfrac12;2)$ | $\tfrac12$ | $\mathbf{-\tfrac12}$ | $\tfrac72$ | $1$ |
| $(\tfrac12;2)$ | $\tfrac72$ | $\tfrac92$ | $\tfrac12$ | $3$ |

*Vérifications : $-1\times3+0=-3$ ✓ · $-1\times2+2=0$ ✓ (le point `sur` est bien FIXE à
$(a;b)=(-1;2)$) · $-\tfrac12\times5+2=-\tfrac12$ ✓ (l'état de S4 : la pente vaut
$a\times(\text{écart au palier})=-\tfrac12\times(5-4)=-\tfrac12$ ✓✓ — **les deux routes
donnent le même nombre, et la porte refait les deux**) · $-\tfrac12\times(-3)+2=\tfrac72$ ✓ ·
$\tfrac12\times3+2=\tfrac72$ ✓.*

> **Toutes les pentes de la scène sont des entiers ou des demi-entiers.** $a \in \{-1;
> -\tfrac12; \tfrac12\}$ et $y_0 \in \{3;5;-3;2\}$ donnent des produits dans
> $\tfrac12\mathbb{Z}$, et $b$ est entier. **C'est une propriété de la grille, pas une
> convention d'affichage, et la porte la mesure** (§11.1 N5 : aucune lecture `pente` hors de
> $\tfrac12\mathbb{Z}$). *Une pente affichée $-1{,}33$ est un bug avant d'être une faute de
> goût.*

**C — les trois courbes de S5** ($a=-\tfrac12$, $b=2$, palier $4$) :

| point de passage | la courbe | à $x=0$ | à $x=10$ | où elle quitte le cadre |
|---|---|---|---|---|
| `haut` $(0;5)$ | descend vers $4$ | $5$ | $\approx 4{,}007$ | par la GAUCHE, vers $x \approx -1{,}4$ *(elle dépasse $6$)* |
| `sur` $(0;2)$ | monte vers $4$ | $2$ | $\approx 3{,}99$ | jamais : elle reste dans le cadre sur tout $[-2;10]$ |
| `bas` $(0;-3)$ | monte vers $4$ | $-3$ | $\approx 3{,}95$ | par la GAUCHE, vers $x \approx -0{,}6$ *(elle passe sous $-6$)* |

*Vérifications : l'écart au palier est multiplié par $e^{ax}$ ; à $x=10$ et $a=-\tfrac12$,
$e^{-5}\approx 0{,}0067$, donc $5 \to 4+0{,}0067 \approx 4{,}007$ ✓, $2 \to 4-2\times0{,}0067
\approx 3{,}987$ ✓, $-3 \to 4-7\times0{,}0067 \approx 3{,}953$ ✓. À gauche : $4+e^{-x/2}=6$
donne $x=-2\ln 2 \approx -1{,}39$ ✓ ; $4-7e^{-x/2}=-6$ donne $e^{-x/2}=\tfrac{10}{7}$, soit
$x=-2\ln\tfrac{10}{7}\approx -0{,}71$ ✓.*

> **Les courbes sont CLIPPÉES au cadre, jamais PLAFONNÉES.** Une courbe qui sort continue hors
> champ ; elle ne s'aplatit pas sur le bord. *C'est une distinction que la porte doit tenir
> (§11.2, `courbe-clippee-pas-plafonnee`) : une courbe plafonnée dessine un palier qui n'existe
> pas — le pire mensonge possible dans CETTE scène.*
> **Et avec $a=\tfrac12$, toute courbe finit par sortir. C'est la vérité d'une croissance
> exponentielle, et la porte vérifie qu'elle SORT** — une courbe qui resterait sagement dans le
> cadre à $a>0$ serait le bug, pas l'inverse.

**D — les 60 états.** $3\ (a) \times 4\ (b) \times 5\ (\text{points}) = \mathbf{60}$. *Le test
unitaire du §14.2 les refait tous — la pente, le palier, l'écart, et le point de sortie de la
courbe. **Les tables A, B, C ci-dessus sont un contrôle ponctuel, jamais la source** (leçon de
la spec sœur, §11.1 N3).*

### 5.4 La précision — **exacte, ou rien**

> **Aucune lecture de cette scène n'affiche un nombre arrondi.** Les paliers sont des entiers
> ($-4$ à $4$) ; les pentes, des entiers ou des demi-entiers ; les écarts au palier, des
> entiers ou des demi-entiers. **Aucun « ≈ », aucune troncature, aucun chiffre de plus que le
> nombre n'en a.**

> ⚠ **Et c'est une règle DIFFÉRENTE de celle de la spec sœur, délibérément.** Le plan complexe
> interdisait tout décimal, parce que ses arguments sont des fractions de $\pi$ et que le bac
> les écrit ainsi. **Ici, la leçon elle-même écrit des décimaux** — $y'=-0{,}5y$
> (`lesson.md:104`), $-0{,}1$ (`:238`), $T(5)\approx 62{,}5$ (`:250`). Interdire le décimal
> serait interdire la langue de la leçon. **La règle honnête n'est donc pas « pas de décimal »,
> c'est « EXACT » :** $-\tfrac12$ s'écrit $-0{,}5$ **ou** $-\dfrac12$, jamais $-0{,}50$ ni
> $\approx -0{,}5$. *Décision déclarée, et §13.10 la met au propriétaire (une seule écriture, ou
> les deux ?). **Défaut : la fraction pour les demi-entiers ($-\tfrac12$, $\tfrac72$), le
> décimal pour $a$ sur son badge ($-0{,}5$), parce que c'est ainsi que la leçon écrit les
> deux.***

**Trois précisions d'écriture, non négociables :**
1. **Les nombres de la scène sont sans unité, à toutes les étapes.** Ni degré, ni minute, ni
   volt, ni seconde (§9.3). *Les axes sont $x$ et $y$, les lettres de la leçon
   (`lesson.md:47-49`).*
2. **La valeur $-\dfrac{b}{a}$ n'est JAMAIS écrite comme une formule avant la révélation de
   S3.** Avant, elle n'existe pas ; après, la lecture `palier` affiche **le nombre** ($4$), et
   c'est le **retour** du pari qui écrit une fois la route ($0=ak+b$). *La lecture affiche un
   lieu, le retour donne le mécanisme — deux objets, deux endroits.*
3. **Aucune formule de solution, à aucune étape** : ni $Ce^{ax}$, ni $e$, ni « exponentielle ».
   *§9.1, et c'est la frontière de rang la plus dure de cette scène.*

### 5.5 Contrôles (5) — un neuf par étape

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `point` | $P$ | `origine` · `decale` · `haut` · `bas` · `sur` | **S1**, S5 *(rouvert)* |
| `champ` | la densité du champ tracé | `aucun` · `un-point` · `ligne` · `plan` | **S2**, S5 *(rouvert)* |
| `b` | le terme constant | `-2` · `0` · `1` · `2` | **S3**, S4 *(rouvert)*, S5 |
| `a` | le coefficient | `-1` · `-0.5` · `0.5` | **S4**, S5 |
| `famille` | combien de courbes sont tracées | `aucune` · `une` · `trois` | **S5** |

**Aucun curseur continu. Aucune borne.** *Tout est en crans discrets, pour la raison du §5.4.*
**Aucune clé de `bornes` dans le registre** — deuxième scène du dépôt dans ce cas, après
`plan-complexe-transformation` (§12).

**`point` est FERMÉ à S4, et c'est une décision de non-fuite, pas un oubli.** À S4 la clé
`famille` vaut `une` après la révélation ; si `point` était rouvert, promener $P$ redessinerait
une courbe après l'autre, **toutes visant le même palier — c'est-à-dire la réponse de S5**
(§7.6 A). *C'est exactement l'anti-motif du manège (ADR 0041, addendum du 2026-09-24 soir :
une étape révélée qui ouvre le réglage répondant au pari SUIVANT).*

### 5.6 État (5 clés) et lectures (4)

**État :** `a`, `b`, `point`, `champ`, `famille`. **Aucune clé posée sans contrôle.** La
fenêtre du repère, le pas du quadrillage et la longueur des segments sont des **constantes du
modèle** : aucun contrôle ne les atteint.

| id | ce qui s'affiche | forme | à partir de |
|---|---|---|---|
| `pente` | la pente que l'équation impose au point $P$ : $a\,y_0+b$ | entier ou demi-entier **exact** | **S1** |
| `pentes-comparees` | les pentes aux **deux** points que la consigne cite, **l'une sous l'autre** | deux valeurs exactes | **S2** |
| `palier` | la hauteur où le champ est plat | entier **exact** ; « — » si l'étape ne l'a pas découvert | **S3** |
| `ecart-au-palier` | $y_0 - \left(-\dfrac{b}{a}\right)$ | entier ou demi-entier exact | **S4** |

**`pentes-comparees` est la lecture double du banc de modulation, transposée** (ADR 0041,
addendum du 2026-09-25, point 2 : *« là où une méthode de lecture SATURE, la scène affiche les
deux lectures, l'une sous l'autre »*). Ici la « méthode qui sature » est **lire la pente en
supposant qu'elle dépend de l'avancement** : elle donne le bon résultat **exactement quand les
deux points ont la même ordonnée** — c'est-à-dire tout le temps, à S2 — et s'écroule dès que
les ordonnées diffèrent. **La porte exige les DEUX sens** (§11.1 N3) : identiques à ordonnée
égale, différentes sinon. *Une scène où les deux lignes seraient toujours égales, ou jamais,
doit rougir.*

**`ecart-au-palier` est la lecture du MÉCANISME, et elle est autorisée parce que R0 l'a déjà
écrite.** `lesson.md:33` pose $T'(t)=-k\big(T(t)-20\big)$ : la vitesse est proportionnelle à
l'écart. La lecture affiche **le nombre** $y_0 - y_p$, à côté de `pente` — et l'élève voit,
sans qu'une ligne de prose le lui dise, que `pente` $= a \times$ `ecart-au-palier`. *Elle
n'apparaît qu'à **S4**, après que le palier a été trouvé : avant, elle n'a pas de sens.*

**Aucune lecture ne répète ce que le DESSIN montre déjà** (leçon de la vague 2 du banc
d'électrolyse). Le partage est strict et mesuré :

| ce qui vit SUR le plan (jamais dans la liste) | ce qui vit dans la LISTE (jamais sur le plan) |
|---|---|
| l'équation $y'=ay+b$ **avec ses valeurs**, sur son badge · le point $P$ et ses coordonnées · les segments du champ · la **ligne du palier** (tirets d'accent) · les courbes | `pente` · `pentes-comparees` · `palier` *(le NOMBRE — la ligne est sur le plan, sa hauteur est dans la liste)* · `ecart-au-palier` |

*La porte le vérifie **dans les deux sens** : la liste ne contient pas l'équation (le badge la
porte), et le plan ne porte aucun des quatre nombres de la liste. **Une exception déclarée :**
la hauteur du palier est à la fois une lecture et l'ordonnée d'une ligne dessinée — c'est le
seul doublon, et il est voulu, parce que la ligne sans son nombre ne dit pas lequel des quatre
paris est juste (exactement l'exception de l'arc dans la spec sœur).*

**Ce que la scène n'affiche PAS, et il faut le dire :**
- **Aucune formule de solution**, à aucune étape, sous aucune forme (§9.1).
- **Aucune constante $C$**, ni lettre, ni valeur (§9.1).
- **Aucun palier quand $a$ le rendrait indéfini** : le cas $a=0$ n'est pas un cran, donc la
  lecture `palier` a toujours une valeur — **il n'y a aucun « — » à afficher**, et c'est une
  propriété de la grille, pas un hasard.
- **Aucune pente en un point qui ne serait pas $P$** : le champ montre des directions, la
  liste ne chiffre que celle de $P$ (et celle du second point cité à S2).

---

## 6. Ni temps ni course — et la langue visuelle

### 6.1 `temps: false`, `course: false` — et le pari reste entier

Même régime que `plan-complexe-transformation`, `sphere-plan-droite` et
`banc-de-diffraction` : le verdict est **immédiat**, et c'est `etat_revele` qui fait répondre
la **scène avant le texte** (ADR 0041, addendum du 2026-09-24 nuit, point 1).
`validate-content` interdit `revele_apres_h > 0` sur une scène sans temps ; **il n'y en a
aucun ici**.

**Comment le pari reste avant tout :**
- tant que l'élève n'a pas choisi, **le contrôle de l'étape n'existe pas dans le DOM**, ni le
  verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : le repère, le quadrillage, le badge de l'équation avec
  ses valeurs, le point $P$ avec ses coordonnées — **et rien de plus** ;
- **aucun segment de champ au-delà de ce que l'étape déclare, aucune ligne de palier, aucune
  courbe, aucun pixel d'accent, à aucun moment, avant l'engagement** (§7.6) ;
- après l'engagement : le champ s'étend, la ligne du palier se pose, la courbe se trace, les
  lectures de l'étape s'écrivent. **C'est le plan qui répond, avant le texte.**

**TROIS étapes portent un `etat_revele`, et c'est une différence avec la scène sœur (qui n'en
avait aucun).** S2 (`champ: "ligne"`), S3 (`champ: "plan"`), S4 (`famille: "une"`), S5
(`famille: "trois"`) — **quatre, en fait, et il faut le compter juste** : la révélation ne
change aucun **réglage d'équation**, elle **ouvre le dessin**. *C'est le geste du banc de
modulation (« une révélation peut faire APPARAÎTRE un étage du schéma ») transposé : ici,
l'étage est une densité de champ ou un nombre de courbes.* **La porte mesure les deux temps**
(§11.3, `etapes`).

**Éclairs et mouvement réduit.** Rien n'anime : la famille `eclairs` est **attendue
structurellement vide**, et **mesurée quand même** (§11.3) — *une chose n'est prouvée absente
que si l'on a énuméré ses formes* (ADR 0036). **Aucune courbe tracée en mouvement**, donc
aucune grille glissante à surveiller (règle de la corde). **Aucune trace entre étapes** :
chaque étape repart de son état déclaré. **Aucune VUE** : la scène est plane.

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : les deux axes et leurs graduations, le **quadrillage
  opaque**, l'origine, le **badge de l'équation** portant $y' = ay+b$ **avec ses valeurs
  numériques**, le **point $P$** avec ses coordonnées, et **les segments du champ que l'étape
  a déjà ouverts**.
  *Corollaire du manège, appliqué à la lettre : une donnée de l'énoncé ne se peint jamais dans
  la couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : les **segments neufs** que la révélation
  ajoute, la **ligne du palier** (tirets), les **courbes**, et les lectures de l'étape.
- **La ligne du palier n'a AUCUNE existence d'énoncé avant S3.** Règle 2 du tremplin (ADR 0041,
  addendum du 2026-09-25) : *l'objet-réponse peut n'avoir aucune existence d'énoncé.* Elle
  n'est **ni dessinée, ni nommée, ni décrite, ni atteignable par un réglage** avant la
  révélation de S3 — `avant-pari` y mesure une **absence TOTALE**, pas une absence d'accent
  (§11.2).
- **Les segments du champ ont une LONGUEUR FIXE à l'écran** (22 px au bureau, 16 px au
  téléphone), indépendante de la pente. *Sinon un segment de pente $-5$ serait cinq fois plus
  long qu'un segment de pente $-1$, et le champ raconterait une intensité qui n'existe pas.
  C'est une exagération, elle est constante, et le `fit_caveat` la dit (§10.4).*
- **Le pas du champ est de 1 unité au-dessus de 600 px, de 2 unités en dessous.** À $46{,}7$
  px/unité et 22 px de segment, les traits laissent 25 px entre eux ✓ ; à $32{,}5$ px/unité ils
  se toucheraient — d'où le pas de 2. *Soit $13 \times 13 = 169$ segments au bureau,
  $7 \times 7 = 49$ au téléphone. **Mesuré par `etiquettes` et `champ-lisible` aux deux
  largeurs** (§11.2).*
- **Aucune teinte hors jetons** : toutes les couleurs sont lues sur les jetons `--figure-*` à
  l'exécution (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui importerait three), et
  relues au changement de thème.
- **Tous les nombres passent par KaTeX**, jamais par la police du chrome : $y'$, $-\dfrac12$,
  $-\dfrac{b}{a}$, $\tfrac72$. *Exception, comme au plan complexe : **les nombres des
  graduations sont peints sur le canvas** (12 px, la police du chrome) — ce sont des entiers.*
- **Les étiquettes se posent avec `disposer`, jamais `poser`** (`Plateau.tsx:258`),
  **obligatoire ici** : le badge de l'équation, le nom de $P$, ses coordonnées et l'étiquette
  du palier peuvent tomber dans le même voisinage (à $b=2$, $a=-0{,}5$, `point: "haut"`, le
  palier est à $4$ et $P$ à $5$ — **une unité d'écart, soit 47 px au bureau et 33 px au
  téléphone**). *Famille `etiquettes` à $1\,280$ **et** à 390 px.*
- **Budget d'étiquettes, mesuré.** Au plus **quatre** étiquettes HTML simultanées : le badge de
  l'équation, $P$, ses coordonnées, l'étiquette du palier. **Sous 600 px, les nombres des axes
  passent de tous les $1$ à tous les $2$** ; les quatre étiquettes restent.
- **La valeur qu'on règle et la valeur qu'on lit vont ENSEMBLE sur la scène collante** (leçon
  du banc de diffraction) : $a$ et $b$ sur le badge de l'équation, $P$ sur le plan. La liste
  des lectures défile ; le plan, non.

<!--SUITE-->


