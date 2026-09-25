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

<!--SUITE-->
