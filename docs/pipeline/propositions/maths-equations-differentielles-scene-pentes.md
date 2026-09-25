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

---

## 7. Les cinq étapes

**La pente en un point → elle ne regarde que la hauteur → la ligne plate → la courbe →
la famille.** Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant
que l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce qui dépend de
l'ISSUE attend la révélation*).

> **RÈGLE ARMÉE AVANT LES TABLES (leçon B2 de la spec sœur) : la valeur de CHAQUE choix est
> recalculée depuis le modèle que son étiquette nomme, et elle DIFFÈRE de la bonne réponse.**
> Les vingt choix qui suivent ont été refaits un par un sur cette règle ; le §14.0 la remet en
> tête de la liste de livraison.

### 7.1 S1 — `la-pente-en-un-point` · « Que dit l'équation, ici ? »

- **État :** `a: "-1"`, `b: "0"`, `point: "origine"` $(0;3)$, `champ: "un-point"`,
  `famille: "aucune"`.
- **`etat_revele` :** aucun. *La révélation **trace le segment** en $P$ et ouvre `pente` ; elle
  ne change aucun réglage.*
- **Contrôle ouvert :** `point` (**neuf**). **Lectures :** `pente`.
- **Consigne (voix) :** « Le plan, ses graduations, et un point $P$ au coordonnées
  $(0\,;\,3)$. L'équation du chapitre 2, $y' = -y$. Tu sais déjà à quoi ressemblent ses
  solutions. **Oublie-les une minute.** Avant toute courbe, l'équation dit **une seule chose en
  chaque point du plan** : quelle pente aurait une solution qui passerait par là. »
- **Pari :** « Une solution passe par $P(0\,;\,3)$. Quelle pente l'équation lui impose-t-elle
  en ce point ? »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `produit` | $-3$ — la pente vaut $a\,y$, c'est-à-dire $-1 \times 3$ | **oui** | — | « Oui, et **retiens le mécanisme, pas le résultat** : l'équation $y'=-y$ se lit « la pente vaut moins la hauteur ». Elle a besoin de **deux** choses pour répondre — le coefficient, et **l'endroit où tu te tiens**. Pose $P$ ailleurs et relis : la pente change, alors que l'équation n'a pas bougé d'une lettre. » |
| `coefficient-seul` | $-1$ — l'équation dit $y' = -1$ : la pente est le coefficient | non | **`ed-comme-primitive`** | « Le plan dit $-3$. Ton modèle traite $y'=-y$ comme s'il s'agissait de $y'=-1$, c'est-à-dire d'une **primitive à trouver** — et une primitive de $-1$ est une droite, pas ce que le chapitre 2 a démontré. Le membre de droite ne dépend pas de $x$ : il dépend de **$y$**, donc de l'endroit. Change $P$ et regarde : si la pente valait $-1$, elle ne bougerait jamais. » |
| `signe-recopie` | $+3$ — $y'=-y$ se récrit $y'+y=0$ : le coefficient est $1$, donc la pente vaut $1 \times 3$ | non | **`signe-exposant`** | « Le geste est juste, la lecture est faite trop tôt. $y'+y=0$ est la **même** équation, mais le coefficient ne se lit **qu'une fois l'équation mise sous la forme $y'=ay$** : ici $y'=-y$, donc $a=-1$, pas $+1$. Le plan le confirme : le segment **descend**. Un $+3$ ferait monter une solution que le chapitre 2 fait tendre vers $0$. » |
| `pente-nulle` | $0$ — résoudre une équation, c'est chercher où quelque chose s'annule : la pente cherchée est $0$ | non | **`ed-inconnue-nombre`** | « Regarde le segment : il n'est pas plat. Ce que ton modèle cherche — **un point** où quelque chose s'annule — n'est pas ce qu'une équation différentielle demande : son inconnue n'est ni un nombre ni un point, c'est une **fonction entière**, et l'équation relie $y'$ à $y$ **en chaque point**, pas seulement là où c'est nul. *Il y aura bien une hauteur où la pente est nulle ; elle n'a rien à voir avec « résoudre », et ce n'est pas encore la question.* » |

- **`suite` (34 mots) :** « Promène $P$ sur les cinq positions, l'équation inchangée. **Sur
  combien d'entre elles la pente est-elle la même ?** Lis-la à chaque fois avant de répondre. »
  *Réponse : **deux** — `origine` $(0;3)$ et `decale` $(4;3)$, les deux seules qui partagent une
  ordonnée (table B du §5.3 : pente $-3$ aux deux ✓). **C'est la charnière vers S2** : l'élève
  TROUVE l'invariance avant qu'on la lui demande, et la `suite` ne la nomme pas.*
- **⟂-avant-pari :** le segment en $P$ ; la lecture `pente` ; **tout autre segment de champ** ;
  toute ligne de palier ; toute courbe ; le verdict ; **tout pixel d'accent** (mesuré en
  **chrominance**, leçon du solide de révolution) ; et la description lue au lecteur d'écran ne
  doit contenir ni « $-3$ », ni « descend », ni « pente ».

### 7.2 S2 — `la-hauteur-seule-decide` · « Et quatre unités plus loin ? »

- **État :** `a: "-1"`, `b: "0"`, `point: "decale"` $(4;3)$, `champ: "un-point"`,
  `famille: "aucune"`.
- **`etat_revele` :** **`champ: "ligne"`** — la révélation **étend le champ à toute la
  horizontale $y=3$**, treize segments parallèles. *C'est la scène qui répond, avant le texte.*
- **Contrôle ouvert :** `champ` (**neuf**). *`point` est **absent du DOM** : $P$ est verrouillé
  sur `decale`.* **Lectures :** `pentes-comparees`.
- **Consigne (voix) :** « Même équation, $y'=-y$. À l'étape précédente, en $(0\,;\,3)$, elle
  imposait la pente $-3$. Voici maintenant $Q$, en $(4\,;\,3)$ : **même hauteur, quatre unités
  plus loin.** »
- **Pari :** « Quelle pente l'équation impose-t-elle en $Q$ ? »
- **Les quatre valeurs, recalculées chacune depuis SON modèle, et distinctes :** $-3$ ·
  $-0{,}75$ ($-3$ divisé par $4$) · $0$ (arrivé au palier, arrêté) · $-1$ (le coefficient). ✓

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `identique` | $-3$ — la **même** qu'en $(0;3)$ : l'équation ne regarde que la hauteur | **oui** | — | « Oui, et c'est **la** chose à retenir de cette étape : dans $y'=ay+b$, l'abscisse n'apparaît **nulle part**. L'équation ne sait pas où tu en es ; elle ne sait que **à quelle hauteur** tu es. Le champ vient de se déplier sur toute la ligne : treize segments, tous parallèles. » |
| `amortie` | $-0{,}75$ — quatre unités plus tard, la pente s'est amortie : elle a été divisée par $4$ | non | **`modele-sans-ecart`** | « Le plan affiche $-3$, comme au départ. Ton modèle fait dépendre la pente **du temps écoulé** — et c'est exactement ce que le chapitre 1 a démenti sur la tasse : le rythme ralentit, oui, mais **pas parce que le temps passe**. Il ralentit parce que la **température** se rapproche de celle de la pièce. Ici, la hauteur n'a pas bougé, donc la pente non plus. » |
| `arretee` | $0$ — au bout de quatre unités, la solution est arrivée en bas et s'est arrêtée : sa pente est nulle | non | **`modele-taux-constant`** | « Prends ton modèle au sérieux une seconde : s'il descendait de $3$ par unité et s'arrêtait en arrivant, il serait arrivé avant $x=1$ — et $Q$, lui, est encore à la hauteur $3$. Le plan te le montre. **Une solution ne « s'arrête » jamais net** : elle ralentit à mesure qu'elle approche, et c'est pour cela qu'elle n'arrive pas. » |
| `coefficient-seul` | $-1$ — la pente vaut le coefficient, partout et toujours | non | **`ed-comme-primitive`** | « Le plan affiche $-3$. Si la pente valait $-1$ partout, **tous** les segments du champ seraient parallèles, y compris à des hauteurs différentes — étends le champ à tout le plan et regarde : ils ne le sont pas. Ce que tu viens de voir de vrai, c'est qu'ils sont parallèles **sur une même ligne horizontale**, et seulement là. » |

- **`suite` (40 mots) :** « Ouvre le champ sur tout le plan. Parcours une **horizontale** :
  **combien de directions différentes rencontres-tu ?** Parcours une **verticale** : même
  question. »
  *Réponses : **une** sur l'horizontale (la pente ne dépend que de $y$) ; **treize** sur la
  verticale, une par graduation entière — au pas de 1 sur $y \in [-6;6]$ (§6.2). **C'est le
  même geste qu'en S1** : l'élève compte, il ne relit pas.*
- **⟂-avant-pari :** le segment en $Q$ ; **tout segment ailleurs qu'en $Q$** ; la lecture
  `pentes-comparees` ; toute ligne de palier ; toute courbe ; le verdict ; tout pixel
  d'accent ; et la phrase lue ne contient ni « $-3$ », ni « même », ni « parallèle ».
  *La pente en $(0;3)$ est **ÉNONCÉE dans la consigne**, à l'encre — le pari ne porte pas sur
  elle, mais sur ce qu'elle devient ailleurs. **C'est la première des deux exceptions du
  §7.6**, et « la valeur est ÉNONCÉE » n'est pas « la LECTURE existe » : `pentes-comparees`
  n'est pas dans le DOM avant la révélation.*

### 7.3 S3 — `la-ligne-plate` · « À quelle hauteur le champ est-il plat ? »

- **État :** `a: "-0.5"`, `b: "2"`, `point: "haut"` $(0;5)$, **`champ: "aucun"`**,
  `famille: "aucune"`.
- **`etat_revele` :** **`champ: "plan"`** — la révélation **déplie le champ entier ET pose la
  ligne du palier** à $y=4$, en tirets d'accent. *C'est le moment le plus « la scène répond
  avant le texte » de toute la scène.*
- **Contrôle ouvert :** `b` (**neuf**). *`champ` est **absent du DOM** — l'ouvrir répondrait au
  pari (§7.6 A) ; `point` et `a` aussi.* **Lectures :** `pente`, **`palier`**.
- **Consigne (voix) :** « L'équation change : $y' = -0{,}5\,y + 2$. Un terme constant est
  apparu. **Et on efface le champ** : c'est à toi de dire, avant de le revoir, ce qu'il fait.
  Quelque part dans ce plan, il y a une hauteur où les segments sont **horizontaux** — une
  solution qui passerait par là ne monterait ni ne descendrait. »
- **Pari :** « À quelle hauteur le champ est-il plat ? »
- **Les quatre valeurs, recalculées chacune depuis SON modèle, et distinctes :**
  $-\dfrac{b}{a} = 4$ · $b = 2$ · $+\dfrac{b}{a} = -4$ · $0$ (comme si $b=0$). ✓
  *Les quatre sont dans la fenêtre $[-6;6]$ et sur une graduation entière : les quatre sont
  DÉSIGNABLES sur le plan, et c'est ce qui rend la révélation lisible.*

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `moins-b-sur-a` | à la hauteur $4$ | **oui** | — | « Oui. Et voici **pourquoi**, en une ligne : une solution plate est une fonction **constante**, $y=k$ ; sa dérivée est nulle partout ; l'équation devient donc $0 = a\,k + b$, et il n'y a qu'un $k$ possible : $k = -\dfrac{b}{a} = -\dfrac{2}{-0{,}5} = 4$. **On ne devine pas cette hauteur : on la résout.** Le paragraphe qui suit cette scène la démontre pour tous les $a$ et tous les $b$. » |
| `recopie-b` | à la hauteur $2$ — c'est la valeur de $b$ | non | **`palier-recopie-b`** | « Le plan vient de tracer la ligne plate à $4$, pas à $2$. Vérifie-le toi-même sans le plan : si $y=2$ était plat, on aurait $0 = -0{,}5\times 2 + 2 = 1$ — et $1 \neq 0$. À la hauteur $2$, le champ **monte** (la lecture affiche $+1$). Le terme $b$ ne se recopie pas : il se **divise**, et il change de signe. » |
| `signe` | à la hauteur $-4$ | non | **`palier-signe`** | « La route est la bonne, le signe non — et c'est l'erreur la plus coûteuse du chapitre, parce qu'elle donne un nombre qui **ressemble** à la réponse. $-\dfrac{b}{a} = -\dfrac{2}{-0{,}5}$ : **deux** signes moins, donc un résultat **positif**, $+4$. Le contrôle qui ne trompe jamais : réinjecte. À $y=-4$, la pente vaut $-0{,}5\times(-4)+2 = +4$ — la ligne monte à pic, elle n'est pas plate. » |
| `zero` | à la hauteur $0$ — comme au chapitre 2 | non | **`palier-oubli`** | « C'était vrai **tant que $b$ valait $0$** — et c'est exactement ce qui vient de changer. À $y=0$, la pente vaut maintenant $-0{,}5\times 0 + 2 = 2$ : le champ y **monte**. Le terme constant est précisément ce qui décolle la ligne plate de l'axe. Remets $b$ à $0$ et tu retrouveras ta réponse. » |

- **`suite` (42 mots) :** « Promène $b$ sur ses quatre crans, l'équation gardant le même
  $a$. La ligne plate se déplace à chaque fois. **Sur combien de crans tombe-t-elle exactement
  sur la valeur de $b$ ?** Et où va-t-elle quand $b$ est négatif ? »
  *Réponses : **un seul**, et c'est $b=0$ — à $a=-0{,}5$ les paliers valent $-4$, $0$, $2$, $4$
  pour $b=-2$, $0$, $1$, $2$ (table A du §5.3 ✓), donc la seule coïncidence est la triviale.
  Et à $b=-2$ la ligne passe **sous** l'axe, à $-4$ ✓. **L'élève cherche, il ne relit pas.***
- **⟂-avant-pari :** **le champ tout entier** (aucun segment, nulle part — l'état est
  `champ: "aucun"`) ; **la ligne du palier**, sous toutes ses formes : ni trait, ni étiquette,
  ni nombre, ni mention dans la description lue (**absence TOTALE**, règle du tremplin) ; la
  lecture `palier` ; la lecture `pente` ; le verdict ; tout pixel d'accent.
  *$P$, ses coordonnées et le badge de l'équation **sont l'ÉNONCÉ** : ils restent à l'encre.*

### 7.4 S4 — `elle-n-y-arrive-jamais` · « On part au-dessus : que fait la courbe ? »

- **État :** `a: "-0.5"`, `b: "2"` (palier $4$), `point: "haut"` $(0;5)$, `champ: "plan"`,
  `famille: "aucune"`.
- **`etat_revele` :** **`famille: "une"`** — la révélation **trace la courbe qui passe par
  $P$**, et ouvre `ecart-au-palier`.
- **Contrôle ouvert :** `a` (**neuf**). *`b` est **rouvert** (la `suite` en a besoin) ;
  `point`, `champ` et `famille` sont **absents** (§5.5 : rouvrir `point` ici donnerait la
  réponse de S5).* **Lectures :** `pente`, `palier`, **`ecart-au-palier`**.
- **Consigne (voix) :** « Même équation. Tu viens de trouver la ligne plate : elle est à $4$.
  Le point $P$ est en $(0\,;\,5)$ — **juste au-dessus**, d'une unité. Les segments autour de
  lui descendent doucement ; plus bas, près de la ligne, ils sont presque plats. »
- **Pari :** « La solution qui passe par $P$… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `approche` | descend vers $4$ et s'en approche **sans jamais l'atteindre** | **oui** | — | « Oui — et regarde les deux lectures l'une sous l'autre, c'est là qu'est le mécanisme : l'écart au palier vaut $1$, la pente vaut $-0{,}5$. **La pente est l'écart multiplié par $a$.** Plus la courbe s'approche, plus l'écart est petit, donc plus elle est plate, donc plus elle s'approche lentement : elle ne peut pas arriver. C'est mot pour mot le modèle B de la tasse du chapitre 1 — *le refroidissement ralentit à mesure que le café se rapproche de la température de la pièce*. » |
| `droite-puis-stop` | descend **en ligne droite** jusqu'à $4$, puis s'arrête net | non | **`modele-taux-constant`** | « C'est le modèle A du chapitre 1, et le champ le dément sous tes yeux : une droite garderait la même pente, or les segments **changent d'inclinaison à chaque hauteur** — raides en haut, presque plats près de $4$. Une courbe qui suit ce champ ne peut pas être droite, et rien dans le plan ne lui dit de « s'arrêter ». » |
| `vers-zero` | descend vers $0$, comme au chapitre 2 | non | **`palier-oubli`** | « C'était la réponse **avant** que $b$ n'existe. Regarde le champ à la hauteur $0$ : les segments y **montent** (pente $+2$). Une courbe qui arriverait là serait repoussée vers le haut. Ce qui l'attend n'est pas l'axe, c'est la ligne que tu viens de trouver. » |
| `vers-moins-infini` | descend **sans limite** : $a$ est négatif, donc la solution décroît indéfiniment | non | **`signe-a-comportement`** | « $a<0$ ne veut pas dire « ça descend toujours » : ça veut dire « ça **se rapproche** ». Le test est à un cran : mets $P$ sous la ligne plate — avec $a<0$, la courbe **monte**. Ce que le signe de $a$ décide, c'est si la courbe **vise** le palier ou le **fuit**, pas le sens dans lequel elle va. » |

- **`suite` (56 mots) :** « Bascule $a$ sur $+0{,}5$, $b$ inchangé : la ligne plate saute de
  $4$ à $-4$, et la courbe **s'enfuit** au lieu de s'approcher. Puis mets $a$ sur $-1$ et
  promène $b$ : **la ligne plate tombe sur la valeur de $b$ à chaque cran.** Cherche pourquoi —
  et vérifie que c'est le seul $a$ de la scène où « le palier, c'est $b$ » tombe juste. »
  *Vérifié sur la table A du §5.3 : à $a=0{,}5$, $b=2$, palier $=-4$ ✓ ; à $a=-1$, palier
  $=b$ aux quatre crans ✓ ; et **à $a=-0{,}5$ comme à $a=0{,}5$, la coïncidence n'a lieu qu'à
  $b=0$** ✓. **C'est $b(a+1)=0$ de `lesson.md:184`, trouvé au lieu d'être lu** — et c'est la
  seule chose de cette scène qu'une figure ne pourrait pas remplacer même en dix étapes.*
- **⟂-avant-pari :** **toute courbe** ; la lecture `ecart-au-palier` ; le verdict ; tout pixel
  d'accent ajouté par rapport à l'état d'énoncé. *Le champ, la ligne du palier, $P$ et le badge
  **sont l'ÉNONCÉ** ici — la consigne les donne, et le pari porte sur ce qu'une COURBE fait
  dedans. **C'est la seconde des deux exceptions du §7.6.***

### 7.5 S5 — `toutes-la-meme-ligne` · « Trois départs, trois courbes : que font-elles ? »

- **État :** `a: "-0.5"`, `b: "2"` (palier $4$), `point: "bas"` $(0;-3)$, `champ: "plan"`,
  **`famille: "aucune"`**.
- **`etat_revele` :** **`famille: "trois"`** — la révélation trace les **trois** courbes
  passant par $(0;5)$, $(0;2)$ et $(0;-3)$.
- **Contrôle ouvert :** `famille` (**neuf**). *`point`, `a`, `b` et `champ` sont **rouverts**.*
  **Lectures :** `pente`, `palier`.
- **Consigne (voix) :** « Dernière question. Même équation, même ligne plate à $4$. On marque
  **trois** départs : $(0\,;\,5)$ au-dessus, $(0\,;\,2)$ en dessous, $(0\,;\,-3)$ bien en
  dessous. Une solution part de chacun. »
- **Pari :** « Ces trois courbes… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `meme-ligne` | s'approchent **toutes les trois** de la même hauteur $4$, et **ne se coupent jamais** | **oui** | — | « Oui, et c'est ce que l'équation a d'étrange et de puissant : **la ligne plate ne dépend que de $a$ et de $b$**, jamais du point de départ. Les trois courbes viennent de trois endroits, elles visent le même $4$, et aucune ne traverse une autre — traverser voudrait dire deux pentes différentes au même point, ce que le champ ne permet pas. Promène $P$ : tu ne trouveras pas de départ qui change la ligne. » |
| `se-coupent` | se croisent quelque part, puisqu'elles vont toutes au même endroit | non | **`nombre-solutions-condition`** | « Regarde le point où elles se couperaient : le champ n'y donne **qu'une** direction. Deux courbes qui se croisent auraient, en ce point, deux pentes différentes — l'équation ne le permet pas. C'est pour cela qu'**un point donné ne détermine qu'une seule solution**, et pas deux ni une infinité : la pente y est imposée, et de proche en proche tout le reste avec. » |
| `une-seule-vraie` | une seule des trois est **la** solution de l'équation ; les deux autres n'en sont pas | non | **`solution-fonction-unique`** | « Les trois suivent le champ partout, donc les trois sont des solutions — le chapitre 2 le disait déjà : une équation différentielle ne détermine pas **une** fonction mais une **famille**. Ce qui choisit un membre de la famille, c'est le **point de départ**, pas l'équation. Change `famille` et regarde-les apparaître : rien ne distingue l'une des autres. » |
| `celle-du-bas-descend` | celle qui part de $-3$ **descend** : $a$ est négatif, donc toute solution décroît | non | **`signe-a-comportement`** | « Regarde-la : elle **monte**. Sous la ligne plate, le champ pointe vers le haut — à la hauteur $-3$ la pente vaut $-0{,}5\times(-3)+2 = 3{,}5$, et la lecture l'affiche. $a<0$ ne dit pas « décroît » : il dit « **revient vers la ligne** », par en haut ou par en bas. C'est exactement la tasse du chapitre 1, et son jumeau : un objet à $0\ °$C posé dans une pièce à $20\ °$C **se réchauffe**, avec la même équation. » |

- **`suite` (48 mots) :** « Garde les trois courbes et promène $b$, puis $a$. **Combien de
  lignes plates différentes trouves-tu pour un même jeu de trois départs ?** Puis mets $P$ sur
  $(0\,;\,2)$ avec $a = -1$ et $b = 2$ : **une des trois courbes devient une droite.** Trouve
  laquelle, et dis pourquoi. »
  *Réponses : **une seule** ligne plate par équation, quelle que soit la famille (table A ✓) ;
  et à $(a;b)=(-1;2)$ le palier vaut $2$, donc la courbe passant par $(0;2)$ est la solution
  **constante** — sa pente y vaut $-1\times 2+2 = 0$ (table B ✓), et elle reste plate partout.
  **C'est l'Étape 1 de R2, trouvée.***
- **⟂-avant-pari :** **toute courbe** (l'état est `famille: "aucune"`) ; le verdict ; tout pixel
  d'accent. *Les trois **points** de départ, le champ, la ligne du palier et le badge sont
  l'ÉNONCÉ — la consigne donne les trois. **Ce qui attend la révélation, ce sont les
  courbes.***

#### S5 et `famille-solutions` (R3) — confrontés, parce que c'est le seul vrai recouvrement de cette spec

| ce qui est montré | la scène, S5 (R2) | la figure `famille-solutions` (R3) | doublon ? |
|---|---|---|---|
| plusieurs solutions d'une même équation | **trois**, sur **douze** équations réglables | **quatre**, sur **une** équation gelée ($a=-0{,}1$, $b=2$) | **non** : l'une fait varier l'équation, l'autre la condition initiale |
| le palier partagé | **trouvé** par un pari, puis vérifié en promenant $a$ et $b$ | **consigné** dans une légende, après la démonstration | **non** — et l'ordre compte : la scène précède la preuve, la figure la referme |
| la condition initiale qui choisit un membre | **jamais nommée** (§9.1) : la scène montre le fait géométrique, pas la méthode | **c'est son sujet** : la courbe en accent, $T(0)=90$, $C=70$ | **non** : deux objets distincts, et la frontière de rang tient |
| le cas « départ sous le palier » | le cran `bas` $(0;-3)$, et c'est le distracteur de S5 | la courbe $T_0=0$, en ink-soft, sans commentaire | **non** — *et la scène fait ce que la figure ne fait pas : elle en fait une QUESTION* |

**Conclusion : ils ne se doublent pas, et ils se complètent — la scène fait TROUVER à R2 ce que
la figure CONSIGNE à R3.** *Le §4.5 commande la phrase de raccord qui le dit à l'élève.*

#### S3 confrontée à `cp-r2-palier`, choix par choix

*La spec sœur a dû faire cette vérification APRÈS la vague 1, faute de l'avoir faite. Elle est
faite ici.*

| modèle | le choix de S3 | le choix de `cp-r2-palier` (`checkpoints.yaml:141-175`) | doublon ? |
|---|---|---|---|
| `palier-recopie-b` | `recopie-b` : **une HAUTEUR**, $2$ — « où la ligne plate se trouve » | B : **une ÉCRITURE**, $y=Ce^{4x}-8$ — « quelle formule » | **non** : l'un se lit sur le plan, l'autre sur la page. *Ils nomment le même défaut, et l'élève qui échoue aux deux échoue deux fois au même endroit — ce qui est **voulu** : c'est le modèle le plus lourd de la notion (5 items)* |
| `palier-signe` | `signe` : $-4$, **un lieu du plan** où l'on voit le champ monter à pic | C : $Ce^{4x}-2$, **une formule** | **non** |
| `palier-oubli` | `zero` : $0$, **l'axe**, et le champ y monte | D : $Ce^{4x}$, **une formule sans terme** | **non** |
| les nombres | $a=-0{,}5$, $b=2$, palier $4$ | $a=4$, $b=-8$, palier $2$ | **non — et c'est délibéré** : aucun nombre commun, donc le point d'arrêt ne peut pas être réussi de mémoire *(leçon I3 de la spec sœur : un item qui rejoue l'état d'une étape mesure la mémoire de l'écran)* |

**Le coût résiduel, mesuré :** `cp-r2-palier` reste **après** R2 et garde ses quatre choix ;
**rien, dans le rung, ne mesure la lecture du palier comme un LIEU**. La scène l'enseigne, le
banc ne la voit pas (§4.6).

### 7.6 Le contrat « avant le pari », et les cinq formes de la fuite

**Règle générale, valable aux cinq étapes.** Ce qui dépend de l'ISSUE — un segment de champ
au-delà de ce que l'étape déclare, la ligne du palier, toute courbe, et toute lecture que la
consigne n'a pas énoncée — **n'existe pas dans le DOM avant l'engagement**, ni dans le rendu,
ni dans la phrase lue au lecteur d'écran.

**Deux exceptions, déclarées, et chacune motivée :**

| étape | ce qui est visible AVANT le pari, en plus | pourquoi | ce que ça coûte |
|---|---|---|---|
| **S2** | **la valeur $-3$, la pente en $(0;3)$, écrite dans la CONSIGNE** | la consigne **donne** le point de comparaison ; le pari ne porte pas sur elle, mais sur ce qu'elle devient quatre unités plus loin | rien : le segment en $Q$, la lecture `pentes-comparees` et tout le reste du champ restent absents. *« La valeur est ÉNONCÉE » n'est pas « la LECTURE existe » — la porte mesure la seconde* |
| **S4** | **le champ entier et la ligne du palier, à l'ENCRE** | la consigne les **donne** (« tu viens de trouver la ligne plate : elle est à $4$ ») ; le pari porte sur ce qu'une COURBE y fait | rien : toute courbe, `ecart-au-palier` et l'accent restent absents. ⚠ **Et le pari reste gagnable par le raisonnement depuis le champ — c'est le but** (§7.6 D) |

#### A — la fuite par les RÉGLAGES

*La porte **réécrit elle-même** cette table contre le descripteur (§11.2,
`fuite-inter-etapes`) : elle énumère, avant chaque étape, tous les états ATTEIGNABLES (l'état
posé, sa révélation, puis chaque contrôle ouvert sur tous ses crans) et vérifie qu'aucun ne
produit la réponse d'un pari ultérieur.*

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `point` seul (5) | les 5 points, **à la seule équation $y'=-y$**, `champ` verrouillé sur `un-point` | **non** pour S2 : `champ` est fermé — **le champ ne peut pas s'étendre**, donc l'invariance ne se VOIT pas ; elle se DÉDUIT en promenant $P$, et c'est ce que la `suite` demande. **non** pour S3/S4/S5 : `b`, `a`, `famille` fermés — **$b$ vaut $0$, donc il n'y a pas de palier à trouver** |
| **S2** | `champ` seul (4) | les quatre densités, **au seul point `decale` et à la seule équation $y'=-y$** | **non** pour S3 : `b` est fermé, donc le palier est l'axe et la lecture `palier` **n'existe pas dans le DOM**. **non** pour S4/S5 : `famille` fermé, **aucune courbe n'est traçable** |
| **S3** | `b` seul (4) | les quatre $b$, **au seul $a=-0{,}5$**, `champ` fermé (donc `aucun` avant la révélation, `plan` après) | **non** pour S4 : `famille` fermé, aucune courbe. **non** pour S5 : idem, et `point` fermé |
| **S4** | `a` (neuf) + `b` (rouvert) | 3 × 4 = 12 équations, **au seul point `haut`**, `famille` figée à `une` après révélation | **non** pour S5 : **`point` est FERMÉ** — on ne peut pas faire naître une seconde courbe ailleurs, donc « elles visent toutes le même palier » n'est pas atteignable. *C'est la raison d'être de la fermeture (§5.5)* |
| **S5** | les cinq contrôles | tout | — |

**L'héritage est DÉCLARÉ** : `b` est rouvert à S4 et S5 ; `point`, `a` et `champ` à S5.
*Sans lui, aucune `suite` ne pourrait faire constater un invariant — et l'invariant est ce que
la scène enseigne.* **La non-fuite est tenue par les CONTRÔLES FERMÉS et par les LECTURES**, et
la table ci-dessus dit lesquels à chaque ligne.

#### B — la fuite par les RETOURS (chaque `retour` relu contre le pari SUIVANT)

*Cinquième forme de la fuite (ADR 0036), trouvée au banc d'électrolyse : **le retour d'une
étape qui annonce la suivante**. Elle ne se voit qu'en relisant les textes les uns contre les
autres.*

| les retours de… | menacent-ils le pari suivant ? |
|---|---|
| **S1** | ⚠ **une quasi-fuite, tranchée.** Le retour de `pente-nulle` écrit « *il y aura bien une hauteur où la pente est nulle ; elle n'a rien à voir avec « résoudre », et ce n'est pas encore la question* ». Il **annonce l'existence** du palier — deux étapes en avance. **Phrase CONSERVÉE**, parce qu'elle est nécessaire pour ne pas laisser croire que $y'=0$ n'arrive jamais, **et bornée par une règle** : *aucun retour de S1 ne nomme $b$, ne chiffre une hauteur, ni n'emploie les mots « palier » ou « plat ».* Le retour de `produit` écrit « *la pente change, alors que l'équation n'a pas bougé* » — c'est la conséquence directe du pari de S1, pas l'invariance de S2 : **vérifié mot à mot, aucun retour de S1 ne contient « même hauteur », « horizontale », « parallèle » ni « abscisse »** |
| **S2** | ⚠ **une fuite trouvée et bornée.** Le retour de `coefficient-seul` écrit « *étends le champ à tout le plan et regarde : ils ne le sont pas* » — il invite à l'action que la `suite` demande, ce qui est légitime, **mais il ne doit pas dire ce qu'on y verra de plus**. **Règle : aucun retour de S2 ne nomme $b$, un palier, une hauteur plate, ni une courbe.** *Le mot « hauteur » subsiste (c'est l'objet même de S2) ; « plate » est interdit* |
| **S3** | **non** : aucun ne trace ni ne décrit de courbe, et aucun ne dit ce qu'une solution FAIT du palier. *Vérifié mot à mot : les quatre retours ne contiennent ni « courbe », ni « atteint », ni « s'approche », ni « famille ». Le retour juste écrit « le paragraphe qui suit cette scène la démontre » — c'est un renvoi à la PROSE, autorisé et même commandé (§4.1 d)* |
| **S4** | **non** : aucun ne montre ni ne nomme une seconde courbe. *Le retour de `vers-moins-infini` écrit « mets $P$ sous la ligne plate » — mais `point` est FERMÉ à S4 (§5.5), donc c'est une invitation à faire à S5, pas un état atteignable.* ⚠ **Coût déclaré : ce retour annonce une moitié du fait de S5** (« sous la ligne, ça monte »). **Phrase conservée** — sans elle, `signe-a-comportement` casse sur rien — **et le pari de S5 ne porte PAS sur le sens de la courbe du bas, mais sur le palier partagé et l'absence d'intersection.** *Le choix `celle-du-bas-descend` en est affaibli ; déclaré, et §13.11 le met au propriétaire* |
| **S5** | tout | — |

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*La frontière se pose **par étape**, consigne **et** retours **et** lectures. Une consigne a le
droit d'imprimer ce que son propre énoncé exige.*

| pendant l'étape… | **autorisé** (consigne + retours + lectures) | **interdit** |
|---|---|---|
| **S1** | `pente`, `coefficient`, `hauteur`, `y' = ay`, `y' = -y`, `y' + y = 0`, `point`, `segment`, `fonction`, `primitive` *(dans le seul retour de `ed-comme-primitive`, pour nommer le modèle qu'il casse)* | `b`, `+ b`, `palier`, `plat`, `horizontal`, `parallèle`, `abscisse`, `courbe`, `famille`, `-\dfrac{b}{a}`, toute valeur de hauteur autre que celles de $P$ |
| **S2** | + `abscisse`, `même hauteur`, `horizontale`, `parallèle`, `ne dépend que de`, `champ` | `b`, `+ b`, `palier`, `plat`, `courbe`, `famille`, `solution qui passe par`, `-\dfrac{b}{a}` |
| **S3** | + `b`, `terme constant`, `palier`, `plat`, `horizontal`, `solution constante`, `0 = ak+b`, `-\dfrac{b}{a}` | `courbe`, `trajectoire`, `s'approche`, `atteint`, `tend vers`, `famille`, `plusieurs solutions`, `écart au palier` |
| **S4** | + `courbe`, `s'approche`, `n'atteint jamais`, `écart au palier`, `signe de a`, `fuit` | `famille`, `plusieurs`, `toutes les solutions`, `se coupent`, `d'où qu'elles partent` |
| **S5** | tout | — |

**À toutes les étapes, sans exception : les chaînes du §9.** *La porte cherche ces formes-là
dans le `textContent` **rendu**, en remplaçant chaque `.katex` par son **annotation TeX** —
leçon du banc d'électrolyse — et en début de mot, en Unicode (leçon des noyaux : `\b` ignore
les accents).*

#### D — la fuite par la DONNÉE, et la fuite par la RELATION

- **Par la DONNÉE** (règle de la corde) : **une seule, et elle est déclarée.** Les cinq points
  contiennent `origine` $(0;3)$ et `decale` $(4;3)$, qui partagent une ordonnée — **c'est la
  réponse de S2, posée dans la grille de S1**. *Elle n'est pas atteignable comme un ÉTAT (à S1
  la lecture `pente` s'affiche pour un point à la fois, jamais deux), mais un élève attentif
  qui promène $P$ à S1 verra deux fois $-3$. **C'est voulu : la `suite` de S1 le lui demande
  explicitement.** Ce n'est pas une fuite, c'est la rampe.*
- **Par la RELATION** (règle du banc de diffraction) : c'est la table C ci-dessus.
  $y'=ay+b$ a **quatre** facteurs de sens — la pente locale, l'invariance en $x$, le palier, le
  comportement — et **chaque étape n'écrit que ceux qu'elle a fait varier**.

#### E — la fuite par le STEM : le cran $a=-1$

**Le cran $a=-1$ n'est l'état de PARI d'aucune étape** (S1 et S2 l'emploient avec $b=0$, où
aucun palier n'est en jeu ; S3, S4 et S5 sont à $a=-0{,}5$ ou le laissent au réglage). *Motif,
et il est arithmétique (§5.3 A) : à $a=-1$, $-\dfrac{b}{a}=b$, donc le distracteur
`palier-recopie-b` atteindrait la **bonne réponse** — une **contamination de la réponse
juste**, qui est un défaut de **stem**, à corriger et non à co-étiqueter.* **La porte le
vérifie sur le descripteur : aucune étape dont un choix porte `palier-recopie-b` ne pose
`a: "-1"`** (§11.3, `stem-non-contamine`).

---

## 8. Misconceptions

Les **22** modèles déclarés de la notion vivent dans `items.yaml:11-215` sous le préfixe
`mc.math.maths_equations_differentielles.`. Les comptes sont **au niveau ITEM**, méthode
`coverage_summary` déclarée en fin de fichier (`items.yaml:1961-1967`) : **30 items, plancher
3, `floor_met: true`, quinze modèles EXACTEMENT au plancher** (`:2002-2005`).
*`REVIEW:13-17` : les deux critiques de vague 1 ont recompté les 22 lignes tag par tag sur les
90 distracteurs — **elles tombent juste**, et l'une le qualifie du « bloc de couverture le plus
propre qu'elle ait audité ». **On ne touche pas à ce fichier.***

### 8.1 Ce que la scène vise — ONZE modèles, tous DÉJÀ déclarés

| modèle existant | compte actuel | où la scène le casse | **sur quelle conséquence il casse** |
|---|---|---|---|
| `ed-comme-primitive` | 3 | **S1** (`coefficient-seul`), **S2** (`coefficient-seul`) | promène $P$ : si la pente valait $a$, elle ne bougerait jamais — et le champ entier serait un seul faisceau de parallèles. **Il ne l'est pas** |
| `signe-exposant` | 3 | **S1**, choix `signe-recopie` | le segment **descend** : $y'+y=0$ est la même équation, mais le coefficient ne se lit qu'après l'avoir écrite $y'=-y$ |
| `ed-inconnue-nombre` | 3 | **S1**, choix `pente-nulle` | le segment n'est pas plat ; l'équation parle en **chaque** point, pas seulement là où quelque chose s'annule |
| `modele-sans-ecart` | 3 | **S2**, choix `amortie` | la hauteur n'a pas bougé, donc la pente non plus — c'est l'**écart**, jamais le temps écoulé, qui pilote |
| `modele-taux-constant` | 3 | **S2** (`arretee`), **S4** (`droite-puis-stop`) | le champ **change d'inclinaison à chaque hauteur** : une courbe qui le suit ne peut pas être une droite, et rien ne lui dit de s'arrêter |
| `palier-recopie-b` | **5** | **S3**, choix `recopie-b` | la ligne plate est à $4$, pas à $2$ — et à la hauteur $2$ la lecture `pente` affiche $+1$ : le champ y **monte** |
| `palier-signe` | 4 | **S3**, choix `signe` | à $y=-4$, la pente vaut $+4$ : la ligne monte à pic. Réinjecter tranche en une ligne |
| `palier-oubli` | 4 | **S3** (`zero`), **S4** (`vers-zero`) | à $y=0$, le champ **monte** (pente $+2$) : une courbe qui y arriverait serait repoussée |
| `signe-a-comportement` | 3 | **S4** (`vers-moins-infini`), **S5** (`celle-du-bas-descend`) | sous la ligne plate, avec le même $a<0$, la courbe **monte**. $a<0$ ne dit pas « décroît », il dit « revient vers la ligne » |
| `nombre-solutions-condition` | 3 | **S5**, choix `se-coupent` | au point d'intersection supposé, le champ ne donne **qu'une** direction — deux courbes n'y tiennent pas |
| `solution-fonction-unique` | 3 | **S5**, choix `une-seule-vraie` | les trois suivent le champ partout : les trois sont des solutions |

**Onze modèles servis, ZÉRO neuf.** *Les onze autres de l'inventaire ne sont **pas** visés, et
c'est déclaré : `coefficient-a-mal-identifie` porte sur la **forme écrite** de la solution, que
la scène n'écrit jamais (§9.1) ; `condition-initiale-sans-decalage`,
`condition-initiale-exposant-sans-a` et `resolution-exponentielle-lineaire` sont R3 ;
`omega-vs-omega2`, `signe-second-membre-second-ordre`, `oscillateur-B-sans-omega`,
`oscillateur-A-B-roles` et `periode-omega` sont R4 ; `charge-decharge-confondues` et
`tau-inverse` sont R5. **La scène ne les touche pas.***

### 8.2 Pourquoi AUCUN modèle neuf — le refus, et ce qui le fonde

*La spec sœur en a déclaré deux. **Celle-ci n'en déclare aucun, et c'est un résultat, pas une
paresse.***

**Trois mesures, dans cet ordre.**

1. **L'inventaire de cette notion est déjà, et de loin, le plus complet du corpus maths que
   j'aie lu : 22 modèles pour 7 rungs, tous au-dessus du plancher, recomptés et validés par
   deux critiques** (`REVIEW:13-17`). *Comparaison : `nombres-complexes-2` déclare 23 modèles
   pour un corpus deux fois plus gros, et sa spec de scène a dû en ajouter deux.*
2. **Les vingt choix des cinq étapes ont été construits d'abord, puis confrontés un par un à
   l'inventaire** — pas l'inverse. **Les vingt trouvent un modèle déclaré dont la
   `description` couvre le distracteur ET dont la valeur se recalcule** (§8.1). *Deux exemples
   où la couverture était douteuse et a été retenue APRÈS lecture de la `description` :*
   - `signe-exposant` (S1) : sa description écrit « *ou **recopie $y'+ay=0$ tel quel sans
     l'écrire $y'=-ay$ avant de lire $a$*** » (`items.yaml:25-26`) — **le distracteur
     `signe-recopie` est littéralement ce texte.**
   - `modele-sans-ecart` (S2) : sa description écrit « *fait dépendre la vitesse […] de $T$
     seule (palier $0$) **ou du temps $t$*** » (`items.yaml:199-200`) — **le distracteur
     `amortie` est « la pente dépend du temps écoulé ».** *Réserve déclarée : la `description`
     est rédigée dans les variables de la tasse ($T$, $t$, $20$), et la scène est abstraite
     ($x$, $y$). **Je juge que le mécanisme est le même et que l'habillage est un habillage ;
     si la vague 1 juge le contraire, c'est LÀ qu'un modèle neuf serait nécessaire**, et §13.12
     en écrit la déclaration prête à l'emploi.*
3. **Un modèle neuf coûte trois items, et cette notion est la dernière où il faut en ajouter.**
   Quinze modèles y siègent à marge nulle (`items.yaml:2002-2005`) et deux items sont déjà
   quasi jumeaux (`REVIEW:124-126`). **Ajouter du volume QCM ici, c'est ajouter du bruit à un
   banc qui est propre.**

### 8.3 Les DEUX modèles CANDIDATS — consignés, pas déclarés

*Refuser de déclarer un modèle faute de mesure est le seul geste honnête disponible, et il
s'écrit à côté de ce qu'on arme (ADR 0035). Précédent : `centre-lu-sur-b` dans la spec sœur.*

**Candidat A — « le palier cru fixé par le point de départ ».** Un élève qui croit qu'une
solution partie plus haut tend vers un palier plus haut, ou qu'une solution partie SOUS le
palier ne peut pas y monter. *Ce qui le rend plausible :* `famille-solutions.svg` existe
**uniquement** pour montrer que quatre $T_0$ différents visent un seul palier — l'auteur de la
figure a donc jugé la confusion réelle. *Ce qui manque pour le déclarer :* **aucune donnée de
fréquence**. Aucun des 30 items ne l'attrape, aucune annale ne l'éclaire (il n'y en a qu'une,
et elle est du second ordre), et je n'ai pas l'expérience d'enseignement qui trancherait.
**La scène le confronte quand même, par le fait** (S5, choix `meme-ligne` et sa `suite`) —
**sans distracteur étiqueté**, ce qui est précisément la limite de ce refus. *§13.12 donne au
propriétaire la déclaration YAML prête et ses trois items ; par défaut, elle n'est pas écrite.*

**Candidat B — « la pente lue comme l'ordonnée seule » ($a$ oublié).** Répondre $3$ à S1 au
lieu de $-3$. *Ce qui manque :* aucune donnée, et le modèle est peut-être un simple lapsus
plutôt qu'un modèle. **Écarté des choix de S1 pour cette raison** — c'est ce qui a mené à la
table finale du §7.1, où les quatre choix sont tous couverts. *Consigné pour mémoire.*

### 8.4 Le solde de couverture, honnête

| | avant | après |
|---|---|---|
| modèles déclarés | **22** | **22** *(inchangé)* |
| items | **30** | **30** *(inchangé)* |
| modèles à marge nulle | **15** | **15** *(inchangé)* |
| modèles **revendiqués par une spec, rung par rung** | 0 *(la notion n'a pas de `spec.md` — `REVIEW:105-109`)* | **11**, pour le seul R2 |

**Ce que ce paquet NE referme pas :**
- **Le banc de fin ne verra aucune différence.** Onze modèles sont confrontés par la scène et
  mesurés, comme avant, par des QCM d'écriture (§4.6). **Déclaré.**
- **Onze modèles restent non revendiqués** (`coefficient-a-mal-identifie` et les dix de R3,
  R4, R5). **Cette spec n'est pas le `spec.md` de la notion.** §13.4.
- ⚠ **`REVIEW:110-114` (F-6) signale que plusieurs distracteurs n'ENCODENT pas le modèle dont
  ils portent l'étiquette, et qu'« *au recompte honnête une famille tomberait sous le
  plancher* ».** **Cette spec n'a pas re-audité les 90 distracteurs existants** ; elle s'appuie
  sur les `description` telles qu'écrites. *Si ce recompte a lieu un jour et déplace une
  famille, les rattachements du §8.1 sont à relire.* **Déclaré, §15.5.**
- **Zéro item de niveau 3 ajouté, contre une cible de 15 % (SExp) ou 20 % (SM)** — puisque zéro
  item est ajouté. *Et le rapport reste **incalculable**, `habilete` n'existant sur aucun item
  (§1). **NON-VERDICT**, pas un vert.*

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée absente que si
> l'on a énuméré ses FORMES*). La porte les cherche dans le texte **RENDU** — en remplaçant
> chaque `.katex` par son **annotation TeX** — **en début de mot et en Unicode**.
>
> **Et la frontière s'applique AUX TEXTES DE CETTE SPEC**, qui ne sont qu'une proposition de
> plus (leçon du banc de modulation, point 4). *Relu : le §7 n'écrit aucune forme interdite.
> Les §0, §1, §2 et §13 en écrivent plusieurs — ils parlent du cadre, pas à l'élève, et la
> porte ne lit que le PANNEAU.*

1. **FRONTIÈRE DE RANG — aucune formule de solution, aucune constante.** *Ne vient d'aucune
   `limite` du cadre : vient de ce que la scène précède l'Étape 2 de R2 (§0.2).*
   Interdits : `Ce^{ax}`, `Ce^{`, `C e^{`, `\exp`, `e^{ax}`, `e^{-ax}`, `exponentielle`,
   `solution générale`, `ensemble des solutions`, `C \in \mathbb{R}`, `constante
   d'intégration`, `y(x) =`, `y = C`, `-\dfrac{b}{a}` **en position de formule affichée par une
   LECTURE** *(la lecture `palier` affiche un NOMBRE ; le retour de S3 a le droit d'écrire la
   route une fois — §5.4 point 2)*.
   *Le symbole `e` seul n'est pas cherché : il est dans « pente », « écart », partout. **La
   porte cherche `e^` et `\exp`, jamais `e`.** Leçon des noyaux, transposée.*
2. **FRONTIÈRE DE RANG — rien de R3.** Interdits : `condition initiale`, `y(x_0)`, `y_0 =`,
   `x_0`, `déterminer C`, `fixer la constante`, `épingler`, `passe par le point` *(en position
   de méthode ; « une solution passe par $P$ » reste autorisé, c'est l'énoncé de S1 —
   **la porte cherche le syntagme `pour que la courbe passe par`, pas le verbe seul**)*.
3. **FRONTIÈRE DE RANG — rien de R4, rien de R5, et AUCUNE unité physique.**
   Interdits R4 : `y''`, `y^{\prime\prime}`, `second ordre`, `équation caractéristique`,
   `discriminant`, `\Delta =`, `racine double`, `\omega`, `pulsation`, `\cos`, `\sin`,
   `période`, `oscill`.
   Interdits R5 et physique : `RC`, `RL`, `u_C`, `i(t)`, `\tau`, `constante de temps`,
   `condensateur`, `bobine`, `résistance`, `charge`, `décharge`, `circuit`, `intensité`,
   `tension`, `volt`, `ampère`, `ohm`, `farad`, `henry`, `seconde`, `minute`, `°C`, `degré`,
   `°`, `température`, `café`, `tasse`, `refroidi`, `radioactiv`, `\lambda`, `N_0`, `N(t)`.
   *La scène est sans unité et sans histoire : ses axes sont $x$ et $y$ (§5.4 point 1). **C'est
   la frontière la plus large de ce document, et le §9.3 dit pourquoi elle est si large.***
4. **Aucun second membre non constant.** **`limite` des DEUX cadres** (`maths-sm.yaml:159`,
   `maths-sexp.yaml:158`) : « *PAS de second membre non constant, pas de variation de la
   constante.* » Interdits : `y' = ay + f(x)`, `f(x)`, `g(x)`, `second membre`, `+ x`,
   `+ \cos`, `+ e^{`, `variation de la constante`, `solution particulière` *(le mot est de la
   leçon, `lesson.md:142`, mais il appartient à la PROSE de R2 qui suit ; la scène dit « ligne
   plate » et « palier »)*.
   ⚠ **C'est la `limite` qui mord le plus fort ici, et pour une raison propre au champ de
   pentes : un champ rend un second membre variable trivialement dessinable, donc tentant.**
   *Un $b$ qui dépendrait de $x$ inclinerait le champ le long des horizontales — un joli
   dessin, hors cadre.*
5. **Aucune méthode de résolution.** Interdits : `séparation des variables`, `séparer les
   variables`, `\dfrac{dy}{y}`, `\int`, `intégrer`, `primitive` *(sauf dans le seul retour de
   `ed-comme-primitive` à S1 — **exception déclarée, une occurrence, une étape**, §7.6 C)*,
   `logarithme`, `\ln`, `fonction auxiliaire`, `z = y e^{`.
6. **Aucune approximation, aucune construction pas à pas.** **`exclusions_transversales`**,
   `maths-sm.yaml:341` (« *Développements limités / formule de Taylor : hors 2e Bac* ») et
   `:342` (« *Intégrales impropres* ») ; **et la frontière de matière du §9.3.**
   Interdits : `Euler`, `méthode d'Euler`, `pas à pas`, `pas de discrétisation`, `\Delta x`,
   `\Delta t`, `approximation`, `approché`, `tangente successive`, `Taylor`,
   `développement limité`.
   ⚠ **C'est l'interdit le plus important de ce §9, et il n'est pas théorique.** La méthode
   d'Euler est **au cadre PC** (`pc-physique-chimie.yaml:284`), elle a **déjà un manipulable
   livré** (`content/pc/chute-mouvements-plans/media/euler-taille-de-pas.interactive.json`,
   un curseur sur $\Delta t \in [0{,}01 ; 0{,}05]$), et **elle n'est au cadre maths d'aucune
   des deux filières**. Une scène de champ de pentes est à un geste d'elle. *§2.6 l'a écartée ;
   ici elle est gardée.*
7. **Aucun vocabulaire de systèmes dynamiques.** *Ne vient d'aucune `limite` : vient de ce
   qu'aucun des deux cadres ne nomme ces objets (§0.3), et qu'un mot qu'un élève ne reverra
   jamais est un mot qui coûte sans rendre.* Interdits : `champ de vecteurs`, `champ de
   directions`, `courbe intégrale`, `isocline`, `portrait de phase`, `plan de phase`,
   `point d'équilibre`, `équilibre stable`, `stabilité`, `attracteur`, `autonome`,
   `flot`, `Cauchy-Lipschitz`, `théorème de Cauchy`, `unicité` *(le FAIT est l'objet de S5 ; le
   MOT est hors cadre — la scène dit « une seule »)*.
   *Le nom « champ des pentes » lui-même n'est employé QUE dans le titre et la légende de la
   carte ; **le panneau ne le présente jamais comme un terme à retenir**, et aucune consigne ne
   demande de « lire un champ de pentes ». §13.2.*
8. **Aucune algèbre linéaire, aucun système.** Interdits : `matrice`, `\begin{pmatrix}`,
   `système différentiel`, `dérivée partielle`, `\partial`, `vecteur propre`.
9. **Aucun cas $a=0$.** `lesson.md:142` l'écarte (« *hors du cadre de ce chapitre* ») et
   $-\dfrac{b}{a}$ n'y a pas de sens. Interdits : `a = 0`, `a=0`, `y' = b`, `y'=b`.
   *Sans objet sur la grille (aucun cran), et interdit quand même.*
10. **Aucun nombre hors des trois grilles.** Les seuls $a$ affichés sont les trois du §5.2 A ;
    les seuls $b$, les quatre du §5.2 B ; les seuls points, les cinq du §5.2 C ; les seuls
    paliers, les six valeurs de la table A ; les seules pentes, celles de $\tfrac12\mathbb{Z}$
    calculées à la table B. *La porte relève l'ensemble exact des nombres affichés dans les
    lectures et le compare. Un nombre qui n'y est pas est soit un bug, soit une frontière
    franchie.*
11. **Aucune 3D.** Canvas 2D, aucune caméra, aucune vue. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière (§11.2, `pas-de-3d`).

### 9.3 La frontière avec la PHYSIQUE — la question posée, et la réponse

**La même équation vit dans trois notions PC, et la leçon de maths le dit elle-même**
(`lesson.md:526-528`) : « *R5 […] suppose que les équations différentielles physiques
($RC\,u_C'+u_C=E$, $L\,i'+Ri=E$, $L\,q''+q/C=0$) sont déjà établies côté physique […] cette
leçon ne les re-dérive pas, elle les RECONNAÎT.* »

**Mesuré, côté PC :**

| notion | ce qu'elle a déjà | mesure |
|---|---|---|
| `pc/rc-charge` | **un manipulable**, `rc-sandbox` — un **embed PhET** (`"tool": "phet"`, CCK:AC), marqueur `[[embed:rc-sandbox]]` à `lesson.md:323`. **Et il se déclare POC** : « *la cible long terme reste un interactif RC **propriétaire**, pour la maîtrise du design et l'autonomie de l'hébergement* » | `media/rc-sandbox.json:3`, `:25` (`poc_status`) |
| `pc/chute-mouvements-plans` | **deux manipulables SVG+curseur** : `sandbox-chute-frottement` (curseur sur $m$, qui redessine $v(t)$, **son asymptote $v_{lim}$ et son $\tau$**) et `euler-taille-de-pas` (curseur sur $\Delta t$) | `media/sandbox-chute-frottement.interactive.json`, `media/euler-taille-de-pas.interactive.json` |
| `pc/dipole-rl` | **AUCUN manipulable** : 5 SVG, 4 `.stages.json`, rien d'autre | `ls content/pc/dipole-rl/media/` |

**La réponse, en trois points.**

1. **La SCÈNE n'est pas partagée. Le MOTEUR peut l'être.** `champ-pentes-modele.ts` calcule une
   pente $ay+b$, un palier $-b/a$ et une courbe par un point : **rien là-dedans n'est
   mathématique plutôt que physique**. Une future scène PC (`rc-charge`, en remplacement du POC
   PhET) pourrait l'importer et n'ajouter qu'une couche d'unités et d'habillage. *Mais un
   moteur partagé n'est pas une scène partagée, et les deux ne se décident pas ensemble.*
2. **La frontière côté maths est NETTE : aucune unité physique, jamais** (§9.3 des interdits
   ci-dessus, point 3). *Trois motifs.* **(a)** Habiller la scène en volts et en millisecondes
   ferait entrer le palier ($E$) et l'échelle de temps ($\tau$), c'est-à-dire **R5** — trois
   rungs plus bas. **(b)** Le cadre PC n'attend pas d'un élève qu'il explore un champ de
   pentes : il attend « *Établir l'équation différentielle et vérifier sa solution* »
   (`pc-physique-chimie.yaml:173` pour RC, `:192` pour RL) — **établir et vérifier, pas
   explorer**. **(c)** `rc-sandbox` porte déjà des `boundary_guard_details` qui interdisent la
   bobine, l'alternatif et l'impédance dans son montage : une scène partagée devrait porter
   **les deux frontières à la fois**, celle du cadre maths et celle du cadre PC, sur un même
   panneau servi à quatre filières. *C'est la manière la plus sûre de se tromper deux fois.*
3. **Le PONT existe déjà, et il est en PROSE, à sa place.** R5 (`lesson.md:412-478`) fait
   exactement le travail : il RECONNAÎT $y'=ay+b$ dans $RC_0u_C'+u_C=E$ et dans $Li'+Ri=E$, et
   il calcule les paliers $E$ et $E/R$ **avec la formule $-b/a$ du chapitre 3**. **Le pont est
   donc déjà bâti, il est textuel, et il est du bon côté.** *La scène n'a rien à y ajouter, et
   §4 ne commande aucune prose à R5.*

**Ce qui reste dû, et qui n'est pas de cette spec :** `pc/dipole-rl` n'a aucun manipulable ;
`pc/rc-charge` en a un qui se déclare POC et qui dépend d'un hébergeur tiers.
**Ces deux faits appartiennent à la matière PC**, et une proposition de scène PC les traiterait
avec le cadre PC sous les yeux. **Routé, pas absorbé.** *§13.6.*

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Un plan calculé est plus crédible qu'une figure dessinée, donc plus dangereux. Et celui-ci
affiche des **valeurs exactes** — l'affichage qui ressemble le plus à une preuve.

1. **La scène ne démontre rien : elle exhibe.** Elle montre la règle sur **60 états**
   ($3\ a \times 4\ b \times 5$ points) — c'est un échantillon, pas une preuve. **La
   démonstration est la prose de R2, qui vient juste après** (`lesson.md:132-164`).
   *C'est structurel en mathématiques : en physique, une scène qui vérifie une loi sur dix
   réglages est convaincante ; ici, soixante cas ne prouvent rien, et un élève de 2ᵉ Bac le
   sait.* ⚠ **Cette clause ne vit PAS seulement ici : elle est REMONTÉE dans le paragraphe
   d'annonce du §4.1, adressée à l'élève, avant le marqueur.** *Une réserve qui n'existe que
   dans un champ `fit_caveat` n'est lue par personne.*
2. **La scène n'entraîne à AUCUN geste d'examen.** Aucune annale vérifiée de la notion ne
   demande $y'=ay+b$ (§0.3), et **aucune ne demandera jamais de lire un champ de pentes**, qui
   n'est au cadre d'aucune des deux filières (§9.7). **C'est un instrument d'enseignement, pas
   d'entraînement** — et ce qu'il enseigne (le palier, la famille, le signe de $a$) est, lui,
   au cadre des deux. *C'est la réserve la plus lourde de ce document après le §1, et §13.2 la
   met au propriétaire.*
3. **Les nombres sont exacts ; le DESSIN est arrondi au pixel.** Une pente $\tfrac72$ est
   affichée exactement et **tracée** à $\pm\,0{,}5$ px. Les lectures affirment des valeurs
   exactes ; le dessin n'affirme qu'une direction.
4. **Les segments du champ ont une longueur FIXE**, indépendante de la pente (§6.2). Un
   segment de pente $-5$ et un segment de pente $-\tfrac12$ ont la même longueur à l'écran.
   **C'est une exagération, elle est constante, et elle est déclarée.** *Sans elle, le champ
   raconterait une « intensité » que l'équation ne dit pas.*
5. **Le champ est ÉCHANTILLONNÉ** : un segment par point entier (par deux unités au
   téléphone). **L'équation, elle, impose une pente en chaque point du plan, y compris entre
   les segments.** *Le `fit_caveat` doit le dire à l'élève en une phrase, sans quoi la scène
   enseigne, en creux, qu'une équation différentielle parle sur une grille.*
6. **Le point $P$ ne se déplace pas librement.** Cinq positions, choisies pour que toute
   lecture soit exacte (§2.6). Un élève qui voudrait « voir ce qui se passe entre deux
   positions » ne le peut pas — c'est le prix de l'exactitude, payé sciemment.
7. **La scène ne montre qu'une équation à la fois, et toujours à coefficients constants.**
   Aucun second membre variable, aucun système, aucun second ordre (§9.4, §9.8, §9.3).
8. **La scène ne dit rien de la VITESSE d'approche.** Elle montre QUE la courbe s'approche du
   palier, jamais en combien de temps : l'échelle $-1/a$ est hors scène et hors cadre maths
   (§2.6). *Un élève qui sortirait d'ici en croyant que toutes les décroissances se valent
   n'aurait pas été détrompé par la scène ; c'est R5 et la physique qui le font.*
9. **Les courbes à $a>0$ quittent le cadre, et c'est la vérité, pas un défaut de dessin.**
   Elles sont **clippées**, jamais aplaties sur le bord (§5.3 C). *Une courbe plafonnée
   dessinerait un palier qui n'existe pas — le seul mensonge que cette scène ne peut pas se
   permettre, et la porte le garde dans les deux sens.*

---

## 11. La porte (`web/scripts/scene-champ-pentes.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du produit ;
elle trouve son panneau par `[data-scene="champ-des-pentes"]`, **jamais** par `[data-scene]`
seul (précédent : la porte de l'orbite ouvrant le chapitre du champ magnétique, run 747). Elle
se lance **plusieurs fois, à plusieurs largeurs** ($1\,280$ px et 390 px au minimum) avant
d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**, **AVERTISSEMENT-vu**,
**VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas disponible au banc, elle sort
**MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES** (règle de la
corde). Elle les recalcule **sans importer aucun module du produit** (ADR 0036 : *une porte qui
importe le module du produit se donne raison*), depuis les seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | la **pente** $a\,y_0+b$ aux **60 états**, **recalculée pour chacun** — la table B du §5.3 n'est qu'un **contrôle ponctuel, jamais la source** | table **B** en contrôle | **égalité de chaîne** avec la lecture `pente`, **plus** égalité numérique à $10^{-9}$ |
| N2 | le **palier** $-\dfrac{b}{a}$ aux **12 équations**, recalculé **deux fois** : par $-b/a$ **et** en résolvant $0=ak+b$ | table **A** du §5.3 | égalité de chaîne avec `palier` ; *les deux routes doivent donner le même caractère* |
| **N3** | **LA LIGNE DE L'INVARIANCE** : `pentes-comparees` affiche **deux valeurs IDENTIQUES au caractère près quand les deux points ont la même ordonnée**, et **DIFFÉRENTES sinon** | table **B** | **égalité de chaîne dans les DEUX sens** ; *une scène où les deux lignes seraient toujours égales, ou jamais, doit rougir* |
| N4 | l'**écart au palier** $y_0 - \left(-\dfrac{b}{a}\right)$ aux 60 états, **ET la relation** `pente` $= a \times$ `ecart-au-palier` | tables **A** et **B** | égalité de chaîne, **et** égalité numérique de la relation à $10^{-9}$ |
| **N5** | **aucune lecture `pente` hors de $\tfrac12\mathbb{Z}$, aucune lecture `palier` hors de $\mathbb{Z}$**, aux 60 états | §5.3 B et A | exact ; *c'est une propriété de la GRILLE, pas d'un arrondi — une valeur à trois décimales est un bug de modèle* |
| N6 | **aucun arrondi, aucun « ≈ », aucun zéro de queue** dans les quatre lectures, aux 60 états | §5.4 | `-0{,}50`, `≈ 4`, `3{,}500` font rougir |
| N7 | la **courbe** : aux 3 points de S5 et aux 12 équations, la valeur de la courbe en 200 abscisses, recalculée depuis $a$, $b$ et le point de passage | table **C** en contrôle | égalité numérique à $10^{-9}$ contre la position des pixels tracés, converties par l'échelle lue sur les graduations |
| N8 | le **point fixe** : quand $y_0 = -\dfrac{b}{a}$ (cran `sur` à $(a;b)=(-1;2)$ et $(-0{,}5;1)$), `pente` vaut **$0$** et la courbe est **horizontale au pixel près** sur toute la largeur | §5.3 B | égalité de chaîne (`0`), **et** écart vertical $\le 1$ px entre les deux bords |
| N9 | les **crans** : `a` en a exactement 3, `b` 4, `point` 5, `champ` 4, `famille` 3 ; **aucune valeur intermédiaire, aucune borne continue** | §5.2, §5.5 | exact |
| N10 | **la ligne du cran dégénéré** : à $a=-1$, `palier` **égale** $b$ aux quatre crans ; **aux deux autres $a$, elle ne l'égale qu'à $b=0$** | table **A** | **égalité de chaîne dans les DEUX sens** ; *c'est l'arithmétique qui porte la `suite` de S4, et une scène qui la raterait enseignerait le contraire de `lesson.md:184`* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/unité est lu sur **les graduations entières des deux axes**. Lancée à $1\,280$
**et** 390 px au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`isotropie`** | le facteur px/unité mesuré sur l'axe des $x$ et sur celui des $y$ est **identique à $\le 0{,}5\%$**, aux deux largeurs ; **et le cadre est CARRÉ** — demi-largeur $=$ demi-hauteur de la fenêtre de données | un repère où `x_length/x_span ≠ y_length/y_span` doit rougir **seul** — *c'est le défaut RÉEL du 2026-08-14 (`SCENE-CONTRACT.md:186-203`, 36,9 % d'écart)* |
| **`segment-a-la-bonne-pente`** | **la sonde propre à cette scène** : pour chaque segment du champ, l'**angle mesuré aux pixels** (par les deux extrémités du trait) égale $\arctan(a\,y+b)$ **à $\le 1°$**, aux 12 équations, aux deux largeurs | un champ dessiné à un facteur d'échelle vertical différent doit rougir **seul** ; **un champ dont tous les segments sont parallèles aussi** *(c'est `ed-comme-primitive` posé dans le code)* ; **et un champ dont les segments varient le long d'une HORIZONTALE aussi** *(c'est `modele-sans-ecart` posé dans le code, et c'est le sabotage le plus important de la campagne)* |
| `segment-longueur-fixe` | tous les segments d'un même rendu ont la **même longueur en pixels**, à $\le 1$ px, quelle que soit leur pente | une longueur proportionnelle à la pente doit rougir **seule** |
| `champ-lisible` | le pas du champ est de **1 unité au-dessus de 600 px et de 2 en dessous** ; **aucun segment n'en touche un autre** (écart $\ge 6$ px entre extrémités voisines) | un pas de 1 à 390 px doit rougir **seul** |
| **`ligne-du-palier`** | la ligne de tirets est tracée **exactement à l'ordonnée $-\dfrac{b}{a}$**, à $\le 2$ px, aux 12 équations ; **et les segments du champ qui la touchent sont HORIZONTAUX** (angle $\le 1°$) | une ligne tracée à $b$ doit rougir **seule** *(c'est `palier-recopie-b` posé dans le code)* ; une ligne à $+\dfrac{b}{a}$ aussi ; **une ligne juste au-dessus d'un champ non plat aussi** — les deux faits sont mesurés SÉPARÉMENT |
| **`courbe-clippee-pas-plafonnee`** | une courbe qui sort du cadre **est coupée au bord et ne reparaît pas** ; **elle ne longe jamais le bord** (aucun segment horizontal de plus de 3 px au ras du cadre) | une courbe **plafonnée** au bord doit rougir **seule** — *elle dessinerait un palier qui n'existe pas* ; **et à $a=\tfrac12$, une courbe qui NE SORT PAS doit rougir aussi** (les deux sens) |
| `courbes-jamais-confondues` | à S5 révélée, les trois courbes sont **séparées de $\ge 3$ px** en tout $x$ du cadre, **et aucune n'en croise une autre** ; **et aucune ne franchit la ligne du palier** | deux courbes qui se croisent doivent rougir ; une courbe qui passe de l'autre côté du palier aussi — *les deux sens, comme le géostationnaire* |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; **aucune courbe** ; **aucun segment au-delà de ce que l'`etat` déclare** ; aucune lecture-réponse dans le DOM. **À S3 : aucune ligne de palier — ni trait, ni étiquette, ni nombre, ni mention dans la description lue** (absence TOTALE, règle du tremplin). **À S3 : ZÉRO segment de champ** | après l'engagement : le champ s'étend, la ligne se pose, les courbes apparaissent, l'accent avec. **À S2 et S4, le champ (ou la ligne) EST présent avant le pari, à l'ENCRE — un champ ABSENT y doit rougir aussi** : les deux exceptions du §7.6 sont mesurées dans les deux sens |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une couleur posée en dur doit rougir **seule** |
| `quadrillage-opaque` | les **nœuds** du quadrillage ont la même valeur que ses **lignes**, à $\le 2$ niveaux | un quadrillage peint en transparence trait par trait doit rougir *(règle du banc de modulation)* |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune des chaînes interdites de l'étape courante (consigne, retours, lectures et région vivante confondues) | écrire « palier » dans un retour de S1, ou « famille » dans un retour de S4, doit rougir **seule** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.6 contre le descripteur : `point` ouvert à **S1 et S5 seulement** ; `champ` à **S2 et S5** ; `b` à **S3, S4, S5** ; `a` à **S4 et S5** ; `famille` **qu'à S5** ; et `palier` **absent du DOM avant S3**, `ecart-au-palier` **avant S4** | ouvrir `point` à S4, ou faire exister `famille` à S4, doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles, les
autres **absents du DOM** ; **S2, S3, S4 et S5 portent un `etat_revele` et S1 non**, et c'est
déclaré, §6.1) · `paris` (4 choix, exactement un juste, un `retour` par choix, rien dans la
région live avant l'engagement) · **`stem-non-contamine`** (*famille propre à cette scène* :
aucune étape dont un choix porte `palier-recopie-b` ne pose `a: "-1"` ; et plus généralement,
pour chaque étape, **les quatre valeurs de choix sont distinctes deux à deux** — §7, §14.0) ·
**`frontiere`** (aucune des chaînes du §9 dans le panneau ouvert, **une sonde par forme**) ·
`eclairs` (**attendu structurellement vide**, mesuré quand même, §6.1) · `sans-mouvement` ·
`katex` (aucun LaTeX brut visible ; $y'$, $-\dfrac{b}{a}$, $\tfrac72$ rendus) · `etiquettes`
(aucune étiquette n'en chevauche une autre, **ni le DESSIN sous une étiquette sans fond**,
n'est barrée par un trait, ni ne sort du cadre — à $1\,280$ **et** à 390 px ; pièce commune
`disposer` (`Plateau.tsx:258`), **obligatoire** ici ; **et le budget du §6.2 vérifié :
$\le 4$ étiquettes simultanées, graduations tous les 2 sous 600 px**) · `lectures-entieres`
(chaque formule d'une lecture tient entre les bords de sa liste, à $1\,280$, 390 et au grand
texte — *mesure née de la vague 2 de la scène sœur*) · `ergonomie` (pièce commune
`scripts/lib/scene-ergonomie.mjs`, **sans** l'argument `course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette commande**
(ADR 0034). Sabotages à outiller :

1. poser la pente $= a + y$ au lieu de $a\,y+b$ → **N1** et `segment-a-la-bonne-pente` ;
2. poser la pente $= a$ (tous les segments parallèles) → **`segment-a-la-bonne-pente` seule**,
   dans son second sens *(c'est `ed-comme-primitive` posé dans le code)* ;
3. **faire dépendre la pente de $x$** (par exemple pente $= a\,y+b$ divisée par $1+x$) →
   **`segment-a-la-bonne-pente` seule**, dans son troisième sens, **et N3** *(c'est
   `modele-sans-ecart` posé dans le code — **le sabotage le plus important de la campagne**,
   parce que c'est le fait de S2)* ;
4. **faire afficher à `pentes-comparees` deux valeurs toujours égales**, y compris à ordonnées
   différentes → **N3 seule** ;
5. **faire afficher à `pentes-comparees` deux valeurs toujours différentes**, y compris à
   ordonnée égale → **N3 seule, dans l'autre sens** *(une porte qui n'exigerait que « les deux
   sont égales » resterait verte sur un produit qui ne mesure rien)* ;
6. **tracer la ligne du palier à $b$** → **`ligne-du-palier` seule** et **N2** *(c'est
   `palier-recopie-b` posé dans le code)* ;
7. **tracer la ligne du palier à $+\dfrac{b}{a}$** → **les mêmes, et seulement elles**
   *(`palier-signe`)* ;
8. **tracer la ligne du palier à $0$** → **les mêmes** *(`palier-oubli`)* ;
9. **tracer la ligne du palier au bon endroit mais laisser le champ non plat dessus** (par
   exemple en calculant la ligne par $-b/a$ et le champ par $ay$) → **le second volet de
   `ligne-du-palier` seul** *(un sabotage qui ne rougirait que sur le premier volet est le
   signe que les deux faits ne sont pas mesurés séparément)* ;
10. **plafonner une courbe au bord du cadre** → **`courbe-clippee-pas-plafonnee` seule** ;
11. **empêcher les courbes de sortir à $a=\tfrac12$** (en bornant $y$) → **la même famille,
    dans l'autre sens** ;
12. **faire franchir le palier à une courbe** (en calculant la courbe depuis $a$ et le point
    sans le palier, c'est-à-dire $y=y_0e^{ax}$) → **`courbes-jamais-confondues` seule**, et
    **N7** *(c'est `palier-oubli` posé dans le code)* ;
13. **faire bouger le point fixe** : à $(a;b)=(-1;2)$ et $P=(0;2)$, incliner la courbe d'un
    pixel → **N8 seule** ;
14. **rendre le repère anisotrope** (allonger `y_length` de 20 %) → **`isotropie` seule**,
    *et `segment-a-la-bonne-pente` — deux familles, et c'est attendu : l'anisotropie EST une
    fausse pente. **Le sabotage doit faire rougir les deux et rien d'autre*** ;
15. **donner aux segments une longueur proportionnelle à la pente** →
    `segment-longueur-fixe` **seule** ;
16. **passer le pas du champ à 1 unité à 390 px** → `champ-lisible` **seule** ;
17. arrondir une lecture à deux décimales ($3{,}50$ pour $\tfrac72$) → **N6 seule** ;
18. faire afficher à `pente` une valeur à trois décimales → **N5 seule** ;
19. afficher la courbe, ou la ligne du palier, ou une lecture-réponse, **avant** le pari →
    `avant-pari` ;
20. **retirer le champ avant le pari de S2, ou la ligne du palier avant celui de S4** →
    `avant-pari` **dans l'autre sens** *(les deux exceptions du §7.6 sont mesurées, sinon elles
    ne sont qu'une intention)* ;
21. **faire exister un segment de champ à S3 avant la révélation**, même en encre douce →
    `avant-pari` **seule** ;
22. ouvrir `point` à S4, ou faire exister `famille` à S4 → `fuite-inter-etapes` **seule** ;
23. écrire « palier » dans un retour de S1, « famille » dans un retour de S4, ou « courbe »
    dans un retour de S3 → `formule-graduee` **seule**, **une mesure par étape** ;
24. **poser `a: "-1"` comme état d'une étape dont un choix porte `palier-recopie-b`** →
    **`stem-non-contamine` seule** *(c'est le défaut de stem du §7.6 E, et il doit être
    attrapé par une porte et non par une relecture)* ;
25. **donner à deux choix d'une même étape la même valeur** → **la même famille, second
    volet** ;
26. ajouter un cran $a = 0$ → **N9 seule**, *et `frontiere` sur la forme `y' = b`* ;
27. `import("three")` dans le module de la scène → `pas-de-3d` ;
28. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `Ce^{ax}`, `\exp`, `exponentielle`,
    `solution générale`, `C \in \mathbb{R}` · `condition initiale`, `x_0`, `déterminer C` ·
    `y''`, `équation caractéristique`, `discriminant`, `\omega`, `\cos` · `RC`, `u_C`, `\tau`,
    `condensateur`, `volt`, `seconde`, `°C`, `café` · `second membre`, `f(x)`,
    `variation de la constante` · `séparation des variables`, `\int`, `\ln` · **`Euler`,
    `méthode d'Euler`, `pas à pas`, `\Delta t`, `approximation`** · `champ de vecteurs`,
    `courbe intégrale`, `isocline`, `point d'équilibre`, `Cauchy-Lipschitz`, `unicité` ·
    `matrice`, `système différentiel` · `a = 0`, `y' = b` · **un nombre hors des grilles du
    §9.10**.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est une
    **sonde manquante**, pas un produit propre.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui le
garde.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée, §13.13) :

```json
"champ-des-pentes": {
  "temps": false,
  "dimension": "2d",
  "controles": ["point", "champ", "b", "a", "famille"],
  "etat": ["a", "b", "point", "champ", "famille"],
  "valeurs": {
    "a": ["-1", "-0.5", "0.5"],
    "b": ["-2", "0", "1", "2"],
    "point": ["origine", "decale", "haut", "bas", "sur"],
    "champ": ["aucun", "un-point", "ligne", "plan"],
    "famille": ["aucune", "une", "trois"]
  },
  "lectures": ["pente", "pentes-comparees", "palier", "ecart-au-palier"]
}
```

> **Pas de clé `bornes`, comme au plan complexe** : tout est en crans, il n'y a aucun
> continuum. *Deuxième scène du dépôt dans ce cas ; la première a livré, donc le validateur
> l'accepte — **mais je ne l'ai pas relu** (§15.3).*

**Descripteur** (`content/maths/equations-differentielles/media/champ-des-pentes.json`), mêmes
clés qu'au plan complexe : `slug`, `tool: "scene2d"`, `type: "manipulable"`, `scene`,
`title_fr`, `caption_fr`, `etapes[]` (`id`, `titre`, `consigne`, `pari{question, choix[]}`,
`suite`, `controles[]`, `lectures[]`, `etat{}`, **`etat_revele{}` à S2, S3, S4 et S5**),
`boundary`, `boundary_guard_details`, `fit_caveat`, `param_manipulation_guide`,
`fallback_note`, `pedagogy_wiring{why_manipulable, predict_then_reveal, misconceptions[]}`,
`spec_ref`, `adr_ref`.

**Callouts médias de cette spec (ADR 0017 + ADR 0041), avec leurs deux champs obligatoires :**

| ce qui est prescrit | `type` | `tool` | statut |
|---|---|---|---|
| `champ-des-pentes` — le champ de pentes réglable | **`manipulable`** | **`scene2d`** *(première partie, ADR 0041 ; l'amendement d'ADR 0017 du 2026-07-07 a fermé les nouveaux embeds tiers)* | **PROPOSÉ, non construit** |
| `famille-solutions` — la famille de la tasse, à R3 | `structural-diagram` | `svg+katex` | **EXISTE** (`media/famille-solutions.svg`), inchangé par cette spec |
| `refroidissement-modeles`, `oscillateur-periode`, `rc-charge-decharge` | `structural-diagram` | `svg+katex` | **EXISTENT**, inchangés |

*Aucune illustration d'ambiance, aucune scène `manim`, aucune 3D n'est prescrite ici : l'idée
n'est ni atmosphérique, ni spatiale, ni dynamique — elle est **locale et réglable**, ce qui est
exactement le critère d'un manipulable plan.*

**`pedagogy_wiring.misconceptions` (ONZE ids, tous EXISTANTS)** — `validate-content` exige
qu'un pari de scène nomme un modèle DÉCLARÉ (ADR 0041, addendum du manège) : **les onze le sont
déjà dans `items.yaml`, donc rien ne bloque la validation, et item-author n'a RIEN à livrer
avant la construction.** *C'est la différence structurelle avec la scène sœur, dont les deux
modèles neufs bloquaient tout le reste.*

```
mc.math.maths_equations_differentielles.ed-comme-primitive
mc.math.maths_equations_differentielles.signe-exposant
mc.math.maths_equations_differentielles.ed-inconnue-nombre
mc.math.maths_equations_differentielles.modele-sans-ecart
mc.math.maths_equations_differentielles.modele-taux-constant
mc.math.maths_equations_differentielles.palier-recopie-b
mc.math.maths_equations_differentielles.palier-signe
mc.math.maths_equations_differentielles.palier-oubli
mc.math.maths_equations_differentielles.signe-a-comportement
mc.math.maths_equations_differentielles.nombre-solutions-condition
mc.math.maths_equations_differentielles.solution-fonction-unique
```

**`fallback_note` à écrire :** sans JavaScript et à l'impression, le panneau disparaît. **La
figure `famille-solutions`, trois rungs plus bas (R3), couvre une partie de l'idée** — une
famille, un palier partagé — **sur UNE équation figée, et APRÈS la démonstration.** *L'élève
sans JavaScript perd donc les trois faits que cette scène installe : l'équation comme loi
locale, l'invariance en $x$, et le palier qui se DÉPLACE quand $b$ change. **Le coût est réel
et il est écrit** ; §13.14 dit ce qu'il faudrait commander pour le payer.*

**Ordre de construction** *(noter ce qui n'y est pas : aucune étape item-author)* :
1. **frontend-builder** écrit `champ-pentes-modele.ts` (la pente, le palier par **deux
   routes**, la courbe par un point — en rationnels exacts pour les lectures, en flottants pour
   le tracé) et son test unitaire `test-champ-pentes.mjs` contre **les 60 états**, pas
   seulement contre les tables du §5.3.
2. **frontend-builder** écrit `champ-pentes-rendu.ts` (repère isotrope d'abord, quadrillage
   opaque, puis les segments à longueur fixe, puis la ligne du palier, puis les courbes
   clippées ; `disposer` pour les étiquettes), puis `ChampPentesPanel.tsx`, puis l'entrée de
   registre.
3. **content-author** écrit le descripteur (§7) et la prose (§4.1, §4.3, §4.4, §4.5).
4. **frontend-builder** écrit la porte `scene-champ-pentes.mjs` et sa campagne `--essai-rouge`
   (§11.4) — **vert d'abord, puis rouge, dans ce dossier, avec cette commande**.
5. **vague 1** : bac-fidelity-critic + pedagogy-critic. **vague 2** : dessin, calme, ergonomie,
   captures relues.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

1. ⚠ **FAUT-IL CONSTRUIRE CETTE SCÈNE PLUTÔT QUE DE PAYER LA DETTE MESURÉE DE LA NOTION ?**
   (§0.3.) C'est la première question, et elle passe avant toutes les autres.
   `REVIEW-2026-09-12.md:94-100` mesure un défaut **plus lourd** que celui que cette scène
   comble : **le seul cas attesté par un sujet d'examen ($\Delta=0$, 0,5 des 1,0 point de la
   notion) n'a ni exemple travaillé, ni item** — « *l'élève rencontre le seul cas que l'examen
   lui a posé pour la première fois dans l'exercice d'examen lui-même* ».
   **Défaut : la dette d'abord, la scène ensuite.** *Motif : une scène améliore la
   compréhension d'un rung que l'examen, dans le seul relevé dont on dispose, ne demande pas ;
   la dette porte sur le seul rung qu'il demande.* *Pour défaire :* construire d'abord — **coût
   : un élève de cette notion continue de rencontrer $\Delta=0$ pour la première fois en
   examen.** *Les deux ne s'excluent pas ; c'est un ORDRE, pas un choix.*
2. ⚠ **UNE SCÈNE PEUT-ELLE ENSEIGNER PAR UNE REPRÉSENTATION QUI N'EST PAS AU CADRE ?**
   (§0.3, §9.7, §10.2.) Le champ de pentes n'est nommé par **aucun** des deux fichiers de
   cadre. La scène l'emploie comme **moyen** (le palier, la famille, le signe de $a$ sont, eux,
   au cadre des deux filières) et **jamais comme fin**.
   **Défaut : OUI, avec trois verrous** — (a) aucun item ne teste jamais la lecture d'un champ
   de pentes (§4.6) ; (b) le panneau ne présente jamais l'expression comme un terme à retenir
   (§9.7) ; (c) le `fit_caveat` et le paragraphe d'annonce le disent (§10.2, §4.1).
   *Pour défaire :* renoncer — **coût : on renonce au seul objet capable de faire VOIR le
   palier, et le cluster le plus lourd de la notion (13 emplacements d'items) reste servi par
   des choix de formules.** **C'est une décision de doctrine, pas de scène, et elle vaudra pour
   toutes les scènes de maths à venir.**
3. **LE CADRE MATHS N'EST PAS AUTORITATIF, et toute cette spec en dépend.** (§0.3, §1.)
   `maths-sm.yaml:12-17`, `maths-sexp.yaml:10-16` : « PROPOSITION — NON AUTORITATIVE », les
   trois portes de RULES §5 non passées, le PDF officiel scanné sans couche texte.
   **Défaut : on construit quand même, et on le déclare** — les `limites` et les
   `exclusions_transversales` citées au §1 sont toutes `source: derived — À VALIDER`.
   ⚠ **Et ici, contrairement à la scène sœur, on SAIT déjà que le fichier se trompe une fois**
   (`REVIEW:71-90`, le second ordre SExp). *Pour défaire :* faire passer les trois portes
   **avant** de construire. **Coût du défaut : si une borne dérivée est fausse, le §9 interdit
   des formes que le programme autorise, ou l'inverse.**
4. **Faut-il écrire le `spec.md` manquant de la notion ?** (§8.4, `REVIEW:105-109`.)
   **Défaut : ce document NE l'est PAS.** Il revendique **onze** modèles pour un rung ; **onze
   restent non revendiqués**, et `REVIEW` relève que « *17 des 22 lignes du registre ne sont
   pas rompues en prose et aucune spec ne consigne la délégation* ». *Pour défaire :* une passe
   pedagogy-architect sur la notion entière — **un travail distinct, plus gros que cette
   scène.** **Reste dû.**
5. **L'échelle de temps $-\dfrac{1}{a}$ doit-elle entrer ?** (§2.6, §10.8 — **et c'était dans
   le titre de travail de la commande**.) **Défaut : NON.** *Trois motifs mesurés au §2.6 :
   aucun cadre maths ne nomme une constante de temps ; dans cette leçon $\tau$ est un objet de
   **R5**, trois rungs plus bas ; et le modèle `tau-inverse` est un modèle de R5.*
   *Pour défaire, deux chemins :* **(a)** une **sixième étape**, posée en tête de **R5** et non
   de R2, qui ferait lire $-1/a$ sur le champ **une fois les habits physiques mis** — c'est une
   autre scène, ou une extension datée ; **(b)** une **scène PC** (§13.6). **Coût du défaut,
   écrit : la scène montre QUE la courbe s'approche, jamais à quelle vitesse** (§10.8).
6. **Faut-il partager la scène avec la physique ?** (§9.3.) **Défaut : NON pour la SCÈNE, OUI
   pour le MOTEUR — et la frontière côté maths est « aucune unité physique, jamais ».**
   *Mesuré : `pc/rc-charge` a un manipulable qui se déclare POC PhET et vise un interactif
   propriétaire (`rc-sandbox.json:25`) ; `pc/chute-mouvements-plans` a deux manipulables SVG,
   dont un qui montre déjà $v_{lim}$ et $\tau$ ; `pc/dipole-rl` n'en a aucun. Et le PONT
   maths↔physique existe déjà, en prose, à R5.* *Pour défaire :* une **proposition de scène
   PC** distincte, écrite avec `pc-physique-chimie.yaml` sous les yeux, qui réutiliserait
   `champ-pentes-modele.ts` et ajouterait une couche d'unités. **Coût du défaut : rien n'est
   perdu côté maths ; côté PC, `dipole-rl` reste sans manipulable et `rc-charge` reste sur un
   hébergeur tiers.** *Routé à une autre proposition, pas absorbé ici.*
7. **Le point $P$ doit-il être librement déplaçable ?** (§2.6, §5.2 C, §10.6.)
   **Défaut : NON — cinq crans.** *Motif : la valeur de la scène tient à ce que tout nombre
   affiché est exact (§5.4) ; un $(x_0;y_0)$ libre donnerait des pentes arbitraires.*
   ⚠ **Et contrairement à la scène sœur, aucun balayage muet n'est proposé** : ce qu'un
   continuum dirait ici (« la pente varie sans à-coup avec la hauteur ») est **déjà dit par le
   champ**, qui est un continuum échantillonné. *Pour défaire :* un balayage vertical de $P$,
   lectures à « — » pendant — **coût : une famille de porte de plus, pour un fait déjà
   montré.* **Je ne le recommande pas.**
8. **La scène doit-elle construire la courbe pas à pas en suivant les segments ?** (§2.6,
   §9.6.) **Défaut : NON, et c'est un interdit gardé, pas une préférence** — une construction
   pas à pas EST la **méthode d'Euler**, au cadre **PC** (`pc-physique-chimie.yaml:284`), avec
   un manipulable déjà livré (`euler-taille-de-pas`), et **au cadre maths d'aucune des deux
   filières**. *Pour défaire :* il faudrait d'abord que le cadre maths le porte. **Coût du
   défaut : on perd le geste le plus spectaculaire que cette scène pourrait faire — et c'est
   précisément pour ça qu'il fallait l'écrire comme un interdit et non comme un oubli.**
9. **Faut-il des items qui mesurent ce que la scène enseigne ?** (§4.6, §8.4.)
   **Défaut : NON, aucun item dans cette livraison.** *Motifs : aucun modèle neuf (§8.2) ;
   quinze modèles à marge nulle et deux items déjà quasi jumeaux (`REVIEW:124-126`) ; et ce que
   la notion demande en items est ailleurs (§13.1).*
   ⚠ **Coût déclaré et mesurable : le banc de fin ne verra aucune différence.** *Pour défaire :*
   une passe d'items « lieu » plutôt qu'« écriture » — par exemple « *Sur le graphe ci-contre,
   à quelle hauteur la courbe se stabilise-t-elle ?* » —, **qui exigerait des figures et non des
   QCM de formules, et qui est un travail d'item-author avec content-author.** **Coût : trois à
   six items ; gain : le modèle apprenant voit enfin la compétence que la scène construit.**
10. **Fractions ou décimaux ?** (§5.4.) La leçon écrit les deux ($-0{,}5$ à `lesson.md:104`,
    $-\dfrac{b}{a}$ partout). **Défaut : la FRACTION pour les demi-entiers d'une lecture
    ($-\tfrac12$, $\tfrac72$), le DÉCIMAL pour $a$ sur son badge ($-0{,}5$)** — parce que c'est
    ainsi que la leçon écrit chacun des deux. *Pour défaire :* tout en décimal, ou tout en
    fraction. **Coût : une ligne de rendu et une ligne de porte. Réversible.** *La règle qui ne
    bouge pas, quoi qu'il arrive : **exact, jamais arrondi, jamais « ≈ »**.*
11. **Le retour de S4 annonce-t-il trop de S5 ?** (§7.6 B.) Le retour de `vers-moins-infini`
    écrit « mets $P$ sous la ligne plate : avec $a<0$, la courbe monte » — c'est une moitié du
    distracteur `celle-du-bas-descend` de S5. **Défaut : on garde la phrase et on déclare le
    coût.** *Motif : sans elle, `signe-a-comportement` casse sur rien à S4 ; et le pari de S5
    ne porte pas sur le SENS de la courbe du bas mais sur le palier partagé et l'absence
    d'intersection.* *Pour défaire :* retirer la seconde moitié de la phrase — **coût : le
    retour de S4 n'a plus de contre-exemple, et le modèle le plus transverse de la scène (servi
    deux fois) perd sa cassure la plus nette.**
12. **`modele-sans-ecart` couvre-t-il un distracteur écrit en $x$ et $y$ ?** (§8.2, §8.3.)
    Sa `description` nomme « *le temps $t$* » dans les variables de la tasse
    (`items.yaml:199-200`) ; le distracteur `amortie` de S2 dit « la pente dépend du temps
    écoulé » dans un plan abstrait. **Défaut : OUI, le mécanisme est le même et l'habillage est
    un habillage — AUCUN modèle neuf.**
    *Pour défaire, si la vague 1 juge le contraire, voici la déclaration prête (à n'écrire que
    sur décision) :*
    ```yaml
      - id: mc.math.maths_equations_differentielles.pente-selon-x
        label: "La pente d'une solution crue dépendante de x (du temps écoulé), pas de y"
        description: >-
          Devant y'=ay+b, l'élève fait dépendre la pente de l'ABSCISSE : plus
          loin en x, donc plus douce (« ça s'amortit ») ou plus raide. Il donne
          deux pentes différentes à deux points de même ordonnée. Forme jumelle :
          il croit qu'une solution « finit par s'arrêter » au bout d'un certain x.
        contradicts_principle: >-
          Dans y'=ay+b, l'abscisse n'apparaît pas : la pente imposée en un point
          ne dépend que de l'ordonnée. Deux points de même hauteur portent la
          même pente, aussi éloignés soient-ils ; c'est la hauteur qui change la
          pente, jamais le chemin parcouru.
    ```
    *Et ses trois items, esquissés : (i) deux points de même ordonnée, quelle pente en chacun ;
    (ii) une courbe solution donnée, où sa pente est-elle la plus forte ; (iii) deux solutions
    de la même équation qui passent par la même ordonnée à des $x$ différents — que peut-on
    dire de leurs pentes.* **Coût du « pour défaire » : trois items dans une notion à marge
    nulle. Gain : un modèle abstrait là où il n'y a qu'un modèle habillé en café.**
13. **Le dossier `web/src/lib/scene3d/` s'appelle toujours `scene3d` alors qu'il porterait
    NEUF scènes PLANES sur quinze.** **Défaut : on n'y touche pas** — question héritée, déjà
    posée par le banc d'électrolyse et par le plan complexe. *Pour défaire :* un renommage qui
    touche quinze portes, quinze panneaux et le registre. **Décision de propriétaire, à prendre
    entre deux livraisons.**
14. **Faut-il une figure figée de repli pour l'élève sans JavaScript ?** (§12,
    `fallback_note`.) **Défaut : NON, et le coût est écrit** — `famille-solutions` couvre une
    partie de l'idée, sur une équation gelée, trois rungs plus bas. *Pour défaire :* commander
    une **cinquième figure** à trois étapes, posée juste après le marqueur : (1) le champ d'une
    équation, (2) le même champ avec $b$ changé et la ligne plate déplacée, (3) trois courbes
    visant la même ligne. **Coût : un SVG + son `.stages.json` dans une notion qui en porte
    déjà quatre ; gain : l'élève sans JavaScript garde les trois faits.**
15. **La scène est-elle servie aux DEUX filières ?** (§1, `lesson.md:519-522`.)
    **Défaut : OUI, et sans marque de filière** — les deux cadres écrivent $y'=ay+b$ à
    l'identique (§1), et c'est le seul objet de la notion dans ce cas. ⚠ **Mais le désaccord de
    filière de la notion n'est pas tranché** (la note de validation dit SM, les trois fichiers
    de données disent SExp, et la seule annale est SExp). **La scène n'ouvre pas ce dossier** ;
    elle se borne à ne rien écrire qu'un cadre réserve à l'autre. **Reste dû.**

---

## 14. Fait quand

La scène est **faite** quand, et seulement quand :

0. ⚠ **RÈGLE EN TÊTE (leçon B2 de la spec sœur) : la valeur de CHAQUE choix de pari est
   recalculée depuis le modèle que son étiquette nomme.** Pour les **vingt** choix (5 étapes ×
   4), on refait le calcul que le texte du choix annonce, et on vérifie **(a)** qu'il donne
   bien le nombre ou le comportement affiché, **(b)** qu'il **diffère de la bonne réponse**, et
   **(c)** que la `description` du modèle nommé **couvre** le distracteur. *Le sous-cas (b) est
   le défaut de stem du §7.6 E, armé par la famille `stem-non-contamine`.*
1. **Aucun modèle neuf n'est écrit et aucun item n'est ajouté** (§8.2, §4.6) : `items.yaml`,
   `checkpoints.yaml`, `bank.yaml` et `exercises.yaml` sortent de cette livraison **au
   caractère près** comme ils y sont entrés. *Si l'un d'eux a bougé, la livraison a dépassé sa
   commande.*
2. Le test unitaire `test-champ-pentes.mjs` passe sur **les 60 états**, pas seulement sur les
   tables du §5.3, en **valeurs exactes** ET en flottants — **et il vérifie les DEUX routes du
   palier** ($-b/a$ et la résolution de $0=ak+b$), qui doivent donner le même caractère.
3. `validate-content` passe : scène enregistrée, contrôles connus, **tout contrôle ouvert par
   au moins une étape**, aucun `revele_apres_h`, les quatre `etat_revele` acceptés, chaque pari
   nommant un modèle **déjà déclaré**.
4. La porte `scene-champ-pentes.mjs` sort **VERT** à $1\,280$ **et** à 390 px, **lancée trois
   fois** (une porte instable est pire qu'une porte absente).
5. `--essai-rouge` : **les 28 sabotages du §11.4 font crier la famille annoncée, et elle
   seule.** Un sabotage qui n'atteint pas la porte sort **AMBIGU**, jamais vert. **Le n° 3 —
   la pente qui dépend de $x$ — est le sabotage de référence de cette campagne** : s'il ne
   rougit pas, la scène ne mesure pas le fait de S2, qui est sa moitié.
6. La prose du §4 est écrite, **et le paragraphe d'annonce porte sa clause (d)** — sans elle,
   une scène de maths qui « vérifie » une règle sur soixante états enseigne que vérifier suffit.
7. **Vague 1** (bac-fidelity-critic : chaque nombre recalculé, chaque citation de cadre
   vérifiée à la ligne, **et les rattachements de modèles du §8.1 relus un par un contre les
   `description` d'`items.yaml`** ; pedagogy-critic : la rampe, les paris, les retours relus les
   uns contre les autres) **et vague 2** (captures relues à deux largeurs, ergonomie au
   clavier, étiquettes, **et la lisibilité du champ à 390 px**) sont passées, et ce que chacune
   change est écrit **ici**, pas corrigé en douce.

---

## 15. Ce que je n'ai pas pu vérifier

1. **Je n'ai exécuté ni le produit, ni aucune commande.** L'outil `Bash` était indisponible
   dans la session qui a écrit ce document ; **tous les faits du §0.1 viennent de lectures de
   fichiers, et les commandes citées en regard n'ont pas été lancées** (avertissement en tête).
   Les positions de pixels, les budgets d'étiquettes et les facteurs px/unité du §5.1 ($46{,}7$
   px/unité à $1\,280$ px, $32{,}5$ à 390 px) sont **calculés**, pas mesurés, et supposent un
   **plafond de hauteur de plateau de 560 px que j'ai CHOISI**, pas relevé sur le rendu.
2. **Je n'ai pas lu le code des panneaux existants en entier.** J'ai lu les **signatures**
   exportées de `web/src/components/notion/scene/` (`Plateau`, `Etiquette`, `poser`,
   `disposer`, `boiteLegende`, `PariBloc`, `ConsigneEtape`, `TransportEtapes`, `SceneOptIn`,
   `usePari`, `useSceneRendu`, `commun.ts` avec `MARGE_FOCUS_CARRE` et `GRILLE_SCENE`) et
   l'en-tête de `Plateau.tsx` (qui documente `format: "carre" | "paysage" | "paysage-haut" |
   "carre-partout"`). **Je n'ai vérifié ni qu'un champ de 169 segments s'y rende sans
   retouche, ni le coût de rendu de ces segments à chaque changement d'état.** À vérifier par
   frontend-builder avant de commencer.
3. **Quatre `etat_revele` et aucune clé `bornes` : est-ce accepté ?** Je n'ai **pas relu
   `validate-content`**. La scène sœur a livré sans `bornes`, donc le validateur l'accepte ;
   pour les `etat_revele`, d'autres scènes en portent. *Si l'un des deux est refusé, c'est à
   vérifier avant la construction, pas pendant.*
4. **Je n'ai pas vérifié les 60 états un par un.** J'ai recalculé **les douze paliers** (table
   A), **seize pentes** (table B) et **les trois courbes de S5** avec leurs points de sortie
   (table C). Les 60 pentes, les 60 écarts et les 60 tracés **sont l'affaire du test unitaire
   du §14.2, pas de ce document** — et c'est exactement le raisonnement qui avait échoué à la
   spec sœur quand elle avait audité 35 états sur 70.
5. ⚠ **Je n'ai pas re-audité les 90 distracteurs existants d'`items.yaml`.** `REVIEW:110-114`
   (F-6) signale que plusieurs n'encodent pas le modèle dont ils portent l'étiquette et
   qu'« *au recompte honnête une famille tomberait sous le plancher* ». **Les rattachements du
   §8.1 s'appuient sur les `description` telles qu'écrites, pas sur les items.** *Si ce
   recompte a lieu, ils sont à relire.*
6. **Je n'ai pas vérifié que les scènes Manim de cette notion — s'il en existe — ne montrent
   pas déjà un champ de pentes.** Je n'ai pas cherché dans `animations/scenes/maths/`. *Si l'une
   d'elles le fait, cela ne retire rien au trou — elles sont dans la voie « explication après
   coup », pas dans la leçon — mais cela mérite d'être su.*
7. **Je n'ai pas mesuré l'effet de cette scène sur `media-manipulable` ni sur
   `dette-manipulable`.** J'affirme au §0 que la première monte d'une notion et que la seconde
   ne bouge pas, **sur la base de lectures de fichiers et non d'une exécution des deux
   instruments** (`web/scripts/media-manipulable.mjs`, `web/scripts/dette-manipulable.mjs`
   existent tous deux).
8. **Le poids d'examen de ce chapitre n'est mesurable par RIEN.** Aucun `part_examen` n'existe
   sous le domaine (§1), et le seul chiffre est le barème d'une annale unique (1,0 point). **Je
   ne l'ai pas estimé et je ne l'estime pas** : ce serait exactement l'affirmation de fréquence
   que `REVIEW:23-29` félicite la notion de n'avoir jamais faite.
9. **La couverture de `modele-sans-ecart` sur un distracteur abstrait est un JUGEMENT, pas une
   mesure** (§8.2, §13.12). C'est le point le plus attaquable du §8, et il est écrit là où il
   agit, avec sa déclaration de repli prête.
10. **Le cadre est une proposition non validée, et on sait déjà qu'il se trompe une fois**
    (§1, §13.3). C'est écrit trois fois dans ce document parce que c'est la chose qu'il ne faut
    pas oublier.






