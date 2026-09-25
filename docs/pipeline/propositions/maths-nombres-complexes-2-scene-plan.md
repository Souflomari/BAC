# spec — manipulable 2D `plan-complexe-transformation` (Maths · `nombres-complexes-2`, **R5**)

**Statut : PROPOSITION, non construite.** Écrite le 2026-09-25 par pedagogy-architect.
Quatorzième manipulable de première partie, **huitième PLAN** (ADR 0041, `"tool": "scene2d"`,
mêmes pièces que la cuve, la corde, les noyaux, le banc de diffraction, le tremplin, le banc
de modulation et le banc d'électrolyse). **Première scène de maths sans 3D** — les trois
scènes de maths livrées (`sphere-plan-droite`, `produit-vectoriel`, `solide-revolution`) sont
toutes en 3D, et toutes en géométrie de l'espace.

**Ce que ce document est.** Le cadrage pédagogique complet : le trou **mesuré** qui le
justifie, la frontière officielle, le placement, cinq étapes à pari, les contrôles, l'état,
les lectures avec leur précision, la table de ce qui ne doit pas être à l'écran avant chaque
pari, **un modèle de misconception neuf** avec ses items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose
finale, ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu, le
panneau et le registre de frontend-builder ; les items d'item-author. Le §4 **décrit** les
paragraphes à écrire ; il ne les rédige pas.

Marqueur : `[[embed:plan-complexe-transformation]]` · clé de registre :
`plan-complexe-transformation` · sélecteur de porte :
`[data-scene="plan-complexe-transformation"]`.

**Numérotation des chapitres, mesurée avant d'écrire.** La convention de la notion est
`chapitre N = R(N−1)`, et elle est **prouvée par le texte rendu** : `lesson.md:275` « *Par la
règle du produit du chapitre 3* » désigne R2 ✓ ; `lesson.md:325` « *Par les règles du
quotient (chapitre 4)* » désigne R3 ✓ ; `bank.yaml:312` « *z ↦ e^{iπ/2}z = iz (chapitre 6)* »
désigne **R5** ✓ ; `bank.yaml:239` et `:340` « *(chapitre 7)* » pour la lecture du rapport
désignent **R6** ✓. **Donc R5 = chapitre 6, R6 = chapitre 7**, et toute prose commandée ici
emploie cette numérotation-là, jamais « R5 » ni « R6 ».
*Réserve : `REVIEW-2026-09-11.md:69-80` (S1) démontre que ce schéma est appliqué de façon
auto-contradictoire ailleurs dans la notion, avec des citations franchement fausses
(`lesson.md:94,167,183`). **Ce n'est pas à cette spec de le réparer** — c'est une passe
holistique de content-author, routée par la REVIEW. Cette spec s'aligne sur les citations
JUSTES et n'en ajoute aucune nouvelle.*

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/maths/nombres-complexes-2/media/plan-complexe-transformation.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/maths/nombres-complexes-2/spec-scene-plan-complexe.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/plan-complexe-modele.ts — le modèle (frontend-builder) : le produit, l'image, le point fixe, les lectures exactes
    CHEMIN À CRÉER: web/src/lib/scene2d/plan-complexe-rendu.ts — le rendu 2D (frontend-builder) : le repère isotrope, le cercle unité, M, M′, les segments, l'arc
    CHEMIN À CRÉER: web/src/components/notion/scene/PlanComplexePanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-plan-complexe.mjs — le test unitaire du modèle (les formes exactes)
    CHEMIN À CRÉER: web/scripts/scene-plan-complexe.mjs — la porte de la scène (+ son `--essai-rouge`)

---

## 0. Pourquoi cette notion maintenant — le trou, mesuré

**Aucune spec antérieure n'a pesé `maths/nombres-complexes-2`**, ni comme gagnante ni comme
dauphine : `grep -ril "complexe" docs/pipeline/propositions/ content/*/*/spec-scene-*.md` ⇒
**0**. Cette proposition doit donc se justifier **entièrement** par un trou **mesuré** — même
règle qu'au banc de diffraction, à la corde et au banc d'électrolyse.

**`content/maths/nombres-complexes-2/` ne porte aucun `spec.md`** (contenu du dossier :
`lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`,
`REVIEW-2026-09-11.md`, `media/`). Aucune spec n'y a jamais prescrit d'`[[embed:]]` :
`grep -c '\[\[embed:' content/maths/nombres-complexes-2/lesson.md` ⇒ **0**. **Cette scène ne
solde donc aucune dette écrite** : `dette-manipulable` ne bouge pas, `media-manipulable`
monte d'une notion.

### 0.1 Les huit faits, chacun avec la commande qui le produit

| # | le fait | la commande / la citation qui le produit |
|---|---|---|
| **a** | **La notion porte SEPT médias et UN SEUL manipulable — et ce manipulable sert R4.** `racines-unite.interactive.json` est un curseur sur $n \in [3;8]$ qui recalcule les points, le polygone et la formule. Les six autres (`multiplication-par-i`, `argument-forme-trigo`, `spirale-moivre`, `racines-unite`, `rotation-homothetie`, `nature-triangle-w`, plus l'orpheline `rotation-complexe`) sont des **SVG à étapes figées**. | `ls content/maths/nombres-complexes-2/media/` ⇒ **7 `.svg` + 7 `.stages.json` + 1 `.interactive.json`** |
| **b** | **Pour un élève de Sciences Expérimentales, la notion n'a AUCUN manipulable.** Le seul manipulable sert les **racines n-ièmes**, que le cadre SExp déclare hors périmètre : « *RACINES n-ièmes générales […] : HORS cœur SExp — spécifique SM. La leçon nombres-complexes-2 (R4 racines n-ièmes) n'est donc que PARTIELLEMENT dans le périmètre SExp.* » | `docs/cadre/curriculum/maths-sexp.yaml:257` |
| **c** | **Les quatre figures géométriques sont gelées sur UN exemple chacune.** R0 : trois points fixes (2, 3i, 1+i) et leurs images. R5 : **un seul** $c = 1+i$ et **un seul** $z = 3$. R6 : **un seul** triangle ($z_A=1$, $z_B=1+i$, $z_C=2$). Aucune ne porte de réglage. | les `*.stages.json` : `multiplication-par-i` (3 étapes), `rotation-homothetie` (3 étapes, légendes citant $z=3$ et $c=1+i$), `nature-triangle-w` (3 étapes, légendes citant $A(1)$, $B(1+i)$, $C(2)$) |
| **d** | **L'exemple travaillé de R5 est centré en $O$ ET posé sur un point de l'axe réel** — donc il ne peut PAS distinguer l'angle de la transformation de l'argument de l'image. `lesson.md:299` : « *Soit $c=1+i$. Déterminer l'image du point $M$ d'affixe $z=3$* ». $\arg(z) = 0$, donc $\arg(z') = \arg(c) = \pi/4$ : les deux lectures coïncident, et la figure `rotation-homothetie` dessine exactement ce cas. | `lesson.md:299-309` + `media/rotation-homothetie.stages.json` |
| **e** | **Le défaut est déjà ÉCRIT dans la notion, par la revue de vague 1.** « *R5 n'écrit ni ne travaille jamais la forme que le checkpoint et le sommet exigent : la spécialisation rotation pure $z'-z_A=e^{i\theta}(z-z_A)$ est absente, l'exemple travaillé est centré en O, puis `cp-r5-ecriture` teste trois règles jamais énoncées.* » | `REVIEW-2026-09-11.md:184-188` (D8) |
| **f** | **Un savoir-faire NOMMÉ du cadre est à 0/34 items.** « *Caractériser une similitude directe (rapport, angle, centre)* » (`maths-sm.yaml:229`). La revue : « *S4 · Similitude directe (rapport, angle, centre) : jamais enseignée, jamais nommée, 0/34 items. […] la forme générale $z'=az+b$ et le geste INVERSE ($\omega=b/(1-a)$, rapport $\vert a\vert$, angle $\arg a$) sont absents et non testés.* » | `REVIEW-2026-09-11.md:100-105` |
| **g** | **La moitié du banc diagnostique porte sur la lecture géométrique, servie par des figures gelées.** **16 items sur 34** déclarent comme `primary_misconception` un modèle de transformation ou de configuration (`mult-par-i-non-rotation`, `similitude-module-argument-roles`, `homothetie-rapport-complexe`, `reel-positif-donne-rotation`, `transformation-centre-oublie`, `ecriture-complexe-oubli-constante`, `lecture-w-module-argument`, `ensemble-points-locus-confondu`) — **17 si l'on compte NBCOMPLEX2-33, qui la porte en distracteur**. **Onze** de ces seize sont de la famille R5 (la transformation) : NBCOMPLEX2-5, -7, -8, -9, -18, -19, -22, -29, -30, -31, -34. | `grep -n "    primary_misconception:" content/maths/nombres-complexes-2/items.yaml` ⇒ 34 lignes, relevées une à une contre `items.yaml:2302-2324` |
| **h** | **Les DIX entrées de banque — 100 % des annales vérifiées de la notion — demandent une lecture géométrique.** Six nomment une **rotation ou une homothétie de centre donné** (`bank.yaml:308`, `:312`, `:624`, `:884`, `:982`, `:1018`, `:1176`, `:1909`, `:1985`, `:1993`) ; six écrivent en toutes lettres que **le rapport de deux affixes ENCODE deux informations** (`:239`, `:340`, `:511`, `:886`, `:1457`, `:1819`) ; les dix concluent sur une configuration (perpendiculaire, isocèle, équilatéral, aligné, cocyclique). | `grep -c "rotation de centre" bank.yaml` ⇒ **10 occurrences** ; `grep -o "rapport de deux affixes"` ⇒ **8 occurrences dans 6 entrées** |

**Le geste que rien n'exerce, et que la scène rend :** poser un point, changer le
coefficient, changer le centre, **et regarder ce qui bouge et ce qui ne bouge pas**. Aucune
figure du corpus ne le fait ; aucun item ne peut le faire faire ; et c'est exactement le
geste que dix entrées de banque sur dix demandent à l'écrit.

### 0.2 Pourquoi R5 et pas R6 — l'arbitrage, écrit

R6 (la lecture de $w = \dfrac{z_C-z_A}{z_B-z_A}$) est le rung où le bac atterrit. On pourrait
croire que c'est là qu'il faut poser la scène. **Quatre mesures disent R5.**

1. **La masse des modèles déclarés est en R5.** Famille R5 : **sept** modèles
   (`mult-par-i-non-rotation`, `similitude-module-argument-roles`,
   `homothetie-rapport-complexe`, `reel-positif-donne-rotation`,
   `transformation-centre-oublie`, `rotation-sens-inverse`,
   `rotation-angle-comme-coefficient`, plus `ecriture-complexe-oubli-constante` — huit avec
   lui), **11 items**. Famille R6 : **deux** modèles (`lecture-w-module-argument`,
   `ensemble-points-locus-confondu`), **5 items**.
2. **Le défaut de R5 est écrit et mesuré** (fait **e**) ; celui de R6 ne l'est pas — la revue
   juge R6 « mécanisme central expédié sur le mot *précisément* » (D10), un défaut de PROSE,
   pas de manipulation.
3. **R6 se lit AVEC les outils de R5.** $\arg(w)$ est un écart d'arguments ; un élève qui n'a
   pas vu qu'un angle de transformation est un **écart** lira $w$ de travers quel que soit le
   nombre de triangles qu'on lui montre. **La scène attaque l'amont.**
4. **Un savoir-faire de cadre à 0/34 est en R5** (fait **f**), aucun ne l'est en R6.

**Conséquence non négociable : la scène est bornée par son RANG** (précédent du tremplin,
ADR 0041, addendum du 2026-09-25, point 3). Elle n'écrit **jamais** $w$, ni « nature du
triangle », ni « isocèle », ni « équilatéral », ni « aligné », ni « cocyclique », ni
« ensemble de points » (§9.1). *Le solide de révolution bornait le PROGRAMME ; le tremplin
bornait la PAGE ; ici, c'est la PAGE aussi.*

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- **Le fichier de cadre maths est une PROPOSITION NON AUTORITATIVE**, et la scène est écrite
  contre lui. `maths-sm.yaml:12-17` et `maths-sexp.yaml:10-16` : « *STATUT : PROPOSITION —
  NON AUTORITATIVE. Ne devient fiable qu'après les TROIS portes (RULES §5) : relecture longue
  Gemini ; research-challenger ; validation humaine.* » **Aucune des trois n'est passée.** Le
  PDF officiel est un scan sans couche texte, donc **aucune citation `cadre p.N` n'existe
  pour maths** — à la différence de `pc-physique-chimie.yaml`. *C'est la réserve la plus
  lourde de ce document, et elle est en tête du §1.*
- **Le champ `habilete` reste absent des 34 items** (`grep -c habilete items.yaml` ⇒ **0** ;
  `checkpoints.yaml` ⇒ **5**). Le mélange SM 40 / 40 / 20 est donc **incalculable** sur la
  couche qui porte le volume. **NON-VERDICT déclaré**, pas un vert (ADR 0034). `REVIEW:107`
  (S5) l'escalade au propriétaire : c'est corpus-wide.
- **Aucun scoping de filière.** `REVIEW:113-120` (S6) : ni `lesson.md` ni `items.yaml` ne
  déclarent `filiere:`, et `maths-sexp.yaml:247` mappe pourtant `nombres-complexes-2` dans
  l'arbre SExp alors que R4 en est une exclusion. **La scène n'ouvre pas ce dossier** ; elle
  se borne à ne jamais écrire le mot que le cadre réserve à SM (§9.2). **Reste dû.**
- **La linéarisation ($\cos^n$, $\sin^n$, relations d'Euler, factorisation par l'angle
  moitié)** est un savoir-faire de cadre (`maths-sm.yaml:223,227`) enseigné **nulle part** et
  exigé **deux fois** au sommet (`REVIEW:82-90`, S2/D4). **Hors scène** (§9.9). **Reste dû**,
  et c'est de la prose.
- **Les équations du second degré dans $\mathbb{C}$** : arbitrage rendu vers la leçon sœur
  (`bank.yaml:77-95`), passe de raccordement due sur huit entrées. **Hors scène** (§9.10).
- **R1, R2, R3 n'exigent toujours aucun engagement** (`REVIEW:160-163`, D2 : trois rungs, zéro
  `[[checkpoint:]]`). La scène est en R5 ; elle ne referme rien de cela. **Reste dû.**
- **La marche en réponse construite** entre 34 items QCM et un sujet SM à neuf questions
  (`REVIEW:201-204`, D13, « la lacune structurelle centrale ») **n'est pas comblée par une
  scène à paris** : un pari est un QCM de plus. **Reste dû, et c'est le plus gros.**

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

> ⚠ **RÉSERVE DE PROVENANCE, à porter dans tout ce qui descend de ce document.** Les deux
> fichiers de cadre maths portent en en-tête **« STATUT : PROPOSITION — NON AUTORITATIVE »**
> (`maths-sm.yaml:12`, `maths-sexp.yaml:10`) et **aucune de leurs trois portes n'est
> passée**. Les `savoir_faire`, **toutes** les `limites` et **toutes** les `exclusions` y sont
> marquées `source: derived` — reconstruites, **non vérifiées verbatim**. Je **ne corrige pas**
> et **ne contourne pas** ce fichier (RULES : le cadre est autoritatif, une objection se
> signale). Je **le signale** : *les frontières du §9 sont aussi solides que ce fichier, et pas
> davantage.* **À faire valider par l'humain avant construction** (§13.1).

- **Filière / matière :** **deux** filières concernées — `sciences_mathematiques` (SM-A/SM-B)
  et `sciences_experimentales` (Sciences Physiques) / `mathematiques`.
- **Domaine → sous-domaine → chapitre :**
  - **SM** : `algebre_geometrie` → **`nombres_complexes`** → **`complexes_moivre_racines_transformations`** (`maths-sm.yaml:193-232`).
  - **SExp** : `algebre_geometrie` → **`nombres_complexes`** → **`complexes_equations_geometrie`** (`maths-sexp.yaml:226-258`).
- **Poids :**
  - **SM** — `poids: { part_examen_bloc: 35 }` (`maths-sm.yaml:205`) : le bloc
    « Complexes + Structures algébriques » vaut **≈ 35 %** de l'épreuve ; *le partage interne
    entre les deux sous-domaines est `derived`, donc **non sourcé** (`:395`)*. Domaine
    `algebre_geometrie` : **50 %** (`:195`).
  - **SExp** — `poids: { part_examen: 15 }` (`maths-sexp.yaml:228`) : « ≈ moitié du bloc
    *Complexes + Probabilités = 30 %* » ; *le 30 % est `research-consensus`, le partage
    interne est `derived` (`:352`)*.
- **Habiletés (la cible chiffrée de l'item-author, et le nombre que le critique de fidélité
  doit mesurer) :**
  - **SM** (`maths-sm.yaml:39-42`, recoupé `bac-reference.md:93-94`) : **application directe
    40 % · application non explicite 40 % · synthèse en situation inhabituelle 20 %**.
    *Coefficient 9, 4 h — l'épreuve la plus dense du bac scientifique marocain (`:9`).*
  - **SExp** (`maths-sexp.yaml:40-43`, recoupé `bac-reference.md:95-96`, **cadre-confirmé**) :
    **50 % · 35 % · 15 %**. *Coefficient 7 (contesté 7-vs-5), 3 h.*
  - **NON-VERDICT DÉCLARÉ** : le champ `habilete` n'existe sur aucun des 34 items, donc **le
    rapport n'est calculable ni avant ni après cette livraison** (§0.3). Tout ce qu'on peut
    dire à la lecture : des quatre items neufs du §8.3, NBCOMPLEX2-35 et -36 ressemblent à de
    l'**application directe**, -37 et -38 à de l'**application non explicite**, et **personne
    ne peut le mesurer**.
- **`competences_ciblees` du sous-domaine :**
  - SM (`:207`) : « *Maîtriser les formes d'un complexe, la formule de Moivre et les racines
    n-ièmes, résoudre des équations dans ℂ, et **exploiter les transformations géométriques
    (rotation, homothétie, similitude)**.* »
  - SExp (`:230`) : « *Maîtriser les formes d'un nombre complexe, résoudre des équations dans
    ℂ, et **exploiter l'interprétation géométrique (module, argument, transformations)**.* »
- **`programme` du chapitre, cité entier :**
  - SM (`maths-sm.yaml:225`) :
    > « **Interprétation géométrique : module/argument comme distance/angle ; transformations
    > (translation, homothétie, ROTATION, similitude directe z'=az+b) ; nature de
    > configurations (triangle, cercle, alignement).** »
  - SExp (`maths-sexp.yaml:250`) :
    > « **Interprétation géométrique : affixe, module |z−z'| (distance), argument (angle) ;
    > transformations (translation, homothétie, rotation) via z' = az + b.** »

  *Les deux filières écrivent **`z' = az + b`**. C'est le seul objet de ce document que les
  deux cadres nomment identiquement, et c'est celui qui est à **0/34 items**.*
- **Les `savoir_faire` que chaque étape sert :**
  1. SM (`:229`) « **Caractériser une similitude directe (rapport, angle, centre)** ;
     démontrer une propriété de configuration par les affixes. » → **S1, S2, S3, S4, S5**
     (le rapport à S2, l'angle à S3, le centre à S4 et S5).
  2. SExp (`:254`) « Interpréter $|z-z'|$ et $\arg((z-a)/(z-b))$ géométriquement ;
     **caractériser une transformation $z'=az+b$**. » → **S5** (et S4 pour le centre).
  3. SExp (`:255`) « Déterminer la nature d'un triangle, un alignement, à partir d'affixes. »
     → **hors scène** : c'est R6, et c'est la frontière de rang du §0.2.
- **`limites` portées en dur :**
  - SM (`maths-sm.yaml:231-232`, `source: derived`) :
    > 1. « SM va jusqu'aux racines n-ièmes générales, aux équations à coefficients COMPLEXES
    >    et aux similitudes — profondeur absente de SExp. »
    > 2. « **Pas de similitudes indirectes/antidéplacements approfondis (au-delà de
    >    z ↦ conjugué) ; pas de géométrie projective.** »
  - SExp (`maths-sexp.yaml:257-258`, `source: derived`) :
    > 1. « **RACINES n-ièmes générales […] : HORS cœur SExp — spécifique SM.** »
    > 2. « **Similitudes/compositions de transformations approfondies : plutôt SM. SExp reste
    >    à translation/homothétie/rotation via z'=az+b.** »

  **Quatre conséquences non négociables :**
  1. **Aucune similitude indirecte, aucun antidéplacement, aucune réflexion** (§9.4).
  2. **Aucune composition de deux transformations nommées** — la scène en montre **une** à la
     fois (§9.5). *Le mot « composée » reste autorisé pour dire ce qu'est une
     rotation-homothétie de même centre : c'est la phrase de la leçon (`lesson.md:279`).*
  3. **Le mot « similitude » n'apparaît jamais dans le panneau** : il est marqué SM par les
     deux fichiers, la notion ne le définit nulle part, et `REVIEW:104` relève qu'il est
     **employé sans être défini** dans un retour d'item (`items.yaml:2067`). La scène dit
     « rotation », « homothétie », « rapport », « angle », « centre » — jamais le mot
     (§9.2). *§13.2.*
  4. **Aucune racine n-ième, aucune équation $z^n = a$** dans le panneau : exclusion SExp
     explicite, et sans objet ici (§9.6).
- **`exclusions` :** ni `maths-sm.yaml` ni `maths-sexp.yaml` **ne portent de clé
  `exclusions`** — à la différence de `pc-physique-chimie.yaml`. **Constaté, pas contourné :**
  `grep -n "exclusions" docs/cadre/curriculum/maths-*.yaml` ⇒ **0**. Les seules bornes
  disponibles sont les `limites` ci-dessus, toutes `derived`. *C'est un écart de structure
  entre fichiers de cadre, à router vers research-lead (§13.1).*
- **La frontière qui mord le plus fort est INTERNE, et elle est double.**
  1. **Le rang dans la leçon.** La scène est en tête de **R5 (chapitre 6)**. À cet endroit
     l'élève a lu R0 (la multiplication par $i$), R1 (argument, forme trigonométrique), R2
     (forme exponentielle, **règle du produit**), R3 (quotient, Moivre) et R4 (racines
     n-ièmes) — **et rien d'autre**. Il n'a lu ni $z'-z_A = c(z-z_A)$, ni $w$, ni la table des
     configurations. La scène **peut** poser les questions de R5 (elle vient avant la prose
     qui explique, ADR 0041 §6) ; elle **ne peut pas** entrer dans R6 (§9.1).
  2. **La règle du produit est un ACQUIS, pas un objet.** $|zz'|=|z||z'|$ et
     $\arg(zz')=\arg z+\arg z'$ sont établies à `lesson.md:129`. La scène **s'appuie
     dessus** ; elle ne les ré-enseigne pas et ne les met jamais en pari. *Ce qu'elle met en
     pari, c'est le passage de **deux nombres** à un **mouvement** — et il n'est écrit nulle
     part avant `lesson.md:279`, c'est-à-dire après le marqueur.*

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les sept médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `multiplication-par-i` (3 étapes) | **R0** | trois points fixes ($2$, $3i$, $1+i$), leurs images par $\times i$, trois cercles pointillés | **un seul coefficient**, $i$, de module $1$ : la moitié « agrandissement » de l'idée n'existe pas dans la figure. Rien ne varie |
| `argument-forme-trigo` (staged) | **R1** | l'angle $\theta$, $r$, les projections | aucun produit, aucune image, aucun mouvement |
| `spirale-moivre` (staged) | **R3** | les puissances successives d'un même $z$ | **un seul $z$** ; c'est Moivre, pas la transformation du plan |
| `racines-unite` + **`racines-unite.interactive.json`** | **R4** | **LE SEUL MANIPULABLE** : curseur $n \in [3;8]$, pas $1$, recalcule les points, le polygone et la formule | **il sert le rung que le cadre SExp exclut** (`maths-sexp.yaml:257`) ; il ne touche ni au module, ni à l'argument d'un produit, ni à un centre |
| `rotation-homothetie` (3 étapes) | **R5** | $c=1+i$ appliqué à $z=3$ : la rotation, puis l'homothétie, puis $M' = 3+3i$ | **un seul $c$, un seul $z$, et $z$ est sur l'axe réel** ($\arg z = 0$) : la figure ne peut pas distinguer l'angle de la transformation de l'argument de l'image. **Centre $O$ uniquement.** Aucun point fixe marqué |
| `nature-triangle-w` (3 étapes) | **R6** | un seul triangle, $w=-i$ | hors scène (§9.1) |
| `rotation-complexe` | — | **orpheline**, non référencée | `REVIEW:139-141` (S9) ; classe « remplacée par un frère référencé » |

**Le constat, et il est exact :** **aucune figure de la notion ne fait varier un coefficient,
ne déplace un point, ni ne change un centre.** Le seul réglage du corpus est un entier $n$,
dans le rung que le cadre SExp exclut.

### 2.2 Le motif central : un seul nombre, deux effets, et un point qui ne bouge pas

Le point que la scène existe pour installer, en une phrase :

> Un nombre complexe $c$ porte **deux** informations qui agissent sur **deux** grandeurs
> différentes : $|c|$ multiplie une **longueur**, $\arg(c)$ ajoute un **angle** — et cet angle
> est un **ÉCART** entre deux directions, jamais la direction d'un seul point. Changer le
> **centre** ne change ni l'un ni l'autre : cela change **quel point ne bouge pas**.

**Trois raisons mesurées pour lesquelles aucune figure ne peut le montrer.**

1. **« $|c|$ multiplie une longueur » ne se voit pas sur un exemple.** Sur la figure de R5,
   $|c| = \sqrt2$ et $OM = 3$ : l'élève voit $M'$ plus loin, sans pouvoir séparer « plus loin
   parce que $\sqrt2$ » de « plus loin parce que $3$ ». Il faut **garder $c$ et bouger $M$**,
   ou l'inverse. Une figure ne fait ni l'un ni l'autre.
2. **« L'angle est un écart » est INVISIBLE sur l'exemple travaillé de la leçon** — parce que
   $\arg(z) = 0$ y rend l'écart et l'argument de l'image **égaux** (fait **d** du §0.1). C'est
   la seule chose qui distingue les deux lectures : **sortir de l'axe réel**. Aucune figure du
   corpus ne le fait.
3. **« Le centre est le point qui ne bouge pas » est une NON-observation.** On ne peut pas la
   dessiner : il faut **essayer plusieurs points** et constater qu'un seul reste. C'est
   exactement le geste que `orbite-geostationnaire` a rendu (« il ne bouge pas au pixel
   près ») et qu'aucune figure plane ne peut porter.

**Et la leçon pose les deux moitiés sans jamais les opposer.** R0 donne un $c$ de module $1$
(« ça fait tourner, ça n'agrandit pas », `lesson.md:23`) ; R2 donne deux **formules** ; R5
donne un exemple où les deux effets arrivent ensemble sur un point qui ne permet pas de les
départager. Un élève sort de là avec « multiplier, c'est tourner », et `items.yaml:2302` le
mesure : `mult-par-i-non-rotation` est à **3 items**, tous en R0.

### 2.3 L'antidote obligatoire : une chaîne construite en CINQ temps

$z' - z_\Omega = c\,(z - z_\Omega)$ contient quatre réponses ; un retour trop bavard les donne
toutes d'un coup. Même discipline qu'au banc de diffraction (règle `formule-graduee` ;
ADR 0041, addendum du 2026-09-24 nuit : *la relation est un ÉTAT qui fuit*). **La frontière se
pose ÉTAPE PAR ÉTAPE, consigne ET retours** — une consigne a le droit d'imprimer ce que son
propre énoncé exige (correctif de vague 1 du banc d'électrolyse).

- **S1** établit qu'un coefficient peut **agrandir sans tourner**. Aucun rapport chiffré,
  aucun angle chiffré, aucun centre.
- **S2** ajoute le **rapport** : $AM' = |c|\,AM$, donc $\dfrac{AM'}{AM} = |c|$. Il ne peut pas
  écrire d'angle.
- **S3** ajoute l'**angle**, et **seulement là** $\arg(c)$ apparaît — à côté de $\arg(z)$ et
  $\arg(z')$, **l'un sous l'autre**, pour que l'élève voie que l'écart est constant quand les
  deux autres bougent. Il ne peut pas parler de centre.
- **S4** ajoute le **centre** et l'écriture **factorisée** $z' - z_\Omega = c\,(z-z_\Omega)$.
  Il ne peut pas écrire $z' = az+b$.
- **S5** ajoute la forme **développée** $z' = az+b$, le geste inverse $\omega = \dfrac{b}{1-a}$,
  et le rapport $\dfrac{z'-\omega}{z-\omega}$.

**Contrainte non négociable et mesurable** (table exacte au §7.6 C, mesurée au §11.2
`formule-graduee`) : `rapport`, `AM'/AM`, `|c| =` pas avant **S2** ; `\arg(c)`, `angle`,
`\pi/6`, `e^{i\theta}` **en position de coefficient** pas avant **S3** ; `centre`, `point
fixe`, `invariant`, `z' - z_\Omega` pas avant **S4** ; `z' = az + b`, `\omega`,
`\dfrac{b}{1-a}` pas avant **S5**. La porte le lit dans le `textContent` **rendu**, en
remplaçant chaque `.katex` par son **annotation TeX** (leçon du banc d'électrolyse : le
`textContent` d'une formule KaTeX concatène MathML, source et rendu).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

| geste | où le bac le demande | ce que le corpus en fait |
|---|---|---|
| **Lire un angle comme un ÉCART de directions** | `bank.yaml:340` : « *son **module** est le rapport des longueurs $\frac{AB}{O\Omega}$, et son **argument** est l'angle $(\vec{O\Omega}, \vec{AB})$* » ; même phrase à `:511`, `:886`, `:1457`, `:1819` | la leçon l'écrit une fois (`:327-329`) et l'illustre sur **un** triangle ; l'exemple travaillé de R5 est **incapable** de le distinguer (fait **d**) |
| **Appliquer une rotation de centre donné** | six entrées sur dix (`:308`, `:624`, `:884`, `:1176`, `:1909`, `:1985`) | R5 démontre la forme (`:287-293`) et **n'en travaille aucun exemple** : l'exemple est centré en $O$ (`REVIEW:184-188`, D8) |
| **Caractériser $z' = az+b$ (rapport, angle, centre)** | `maths-sm.yaml:229`, `maths-sexp.yaml:254` | **0/34 items, 0 ligne de prose** (`REVIEW:100-105`, S4) |

### 2.5 Ce que la scène ne double pas

- **`racines-unite.interactive.json`** : un curseur sur $n$, en R4, sur un autre objet
  (les racines). **Aucun recouvrement.**
- **Les huit scènes Manim de la notion** (`animations/scenes/maths/nombres-complexes-2/bk-*.py`)
  **expliquent un exercice déjà posé, après coup** : elles ne font rien manipuler et ne sont
  placées dans aucun rung. *Le dépôt sait pourtant que ce geste compte : `docs/ops/SCENE-CONTRACT.md:61`
  inscrit « rotation → multiplication par $e^{i\theta}$ + arc de trajectoire + **angle
  dessiné** » dans sa table des gestes de sens validés. **Le geste existe dans la voie
  « explication », et nulle part dans la voie « manipulation ».***
- **`sphere-plan-droite`, `produit-vectoriel`, `solide-revolution`** : géométrie de l'espace
  et calcul intégral, en 3D. Aucun recouvrement.
- **`cuve-a-ondes`, `banc-de-diffraction`** : autres matières.

### 2.6 Trois idées volontairement écartées

- **La lecture de $w$ et la nature d'un triangle, ÉCARTÉE par le RANG** (§0.2). C'est R6, et
  la scène est en R5. **Chaînes interdites au §9.1.** *§13.3 propose une sixième étape, posée
  en tête de R6, en extension — c'est la suite naturelle de cette scène, pas son contenu.*
- **Un point $M$ librement déplaçable à la souris, ÉCARTÉ.** Tentant, et faux ici : avec un
  $z$ quelconque, **aucune lecture n'est exacte** — $\arg(z)$ devient un décimal, l'écart
  aussi, et la scène se met à afficher « $0{,}52$ rad » là où le bac écrit $\dfrac{\pi}{6}$.
  *La valeur pédagogique de cette scène tient à ce que **tout nombre affiché est une forme
  exacte** (§5.4).* **Cinq positions discrètes**, choisies pour cela. *§13.4.*
- **Une animation du point le long de son arc, ÉCARTÉE.** `temps: false`, `course: false` :
  l'angle se **lit**, il ne se **parcourt** pas. *Motif : le mouvement n'est pas une raison
  (transposition du §1 de l'ADR 0041, « le relief n'est jamais une raison ») ; et une scène
  sans course n'a ni facteur d'échelle temporelle à déclarer, ni famille `eclairs` à
  instruire au-delà du vide structurel.* *§13.5.*

---

## 3. Placement

**En tête de `## R5 — Interprétation géométrique : rotation et homothétie`**
(`lesson.md:269`), entre le titre et `### Ce que fait, en général, la multiplication par un
complexe fixe` (`lesson.md:271`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:plan-complexe-transformation]]
```

précédée du paragraphe d'annonce neutre du §4.1.

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose qui
explique*). Vérification étape par étape contre le texte **déjà lu** au marqueur
(`lesson.md:1-268`, soit R0 à R4 en entier) :

| étape | la prose (ou le point d'arrêt) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| **S1** — $c=2$ : ça agrandit, ça ne tourne pas | `lesson.md:295` (« *si $c$ est un réel strictement positif […] seulement une homothétie* ») | **R5, APRÈS** le marqueur | ⚠️ **dérivable de R2, jamais montré — écrit franchement ci-dessous** |
| **S2** — le rapport des longueurs | $\vert zz'\vert = \vert z\vert\vert z'\vert$ à `:129` | R2, avant | ⚠️ **la formule est lue ; la longueur multipliée ne l'est pas** |
| **S3** — l'angle est un ÉCART | **nulle part** : `:277` écrit $\arg(z') = \theta + \arg(z)$, **jamais** $\arg(z') - \arg(z) = \theta$, et l'exemple ne peut pas les distinguer (fait **d**) | — | ❌ **non** |
| **S4** — le centre, et le point qui ne bouge pas | `:285-293` | **R5, APRÈS** | ❌ non |
| **S5** — caractériser $z' = az + b$ | **nulle part dans la notion** (`REVIEW:100-105`, 0/34 items) | — | ❌ **non** |

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **S1 et S2 sont DÉRIVABLES de R2, et c'est assumé.** Un élève qui a bien lu
   $|zz'| = |z||z'|$ et $\arg(zz') = \arg z + \arg z'$ (`:129`) peut en déduire les deux.
   **Ce que S1 et S2 attrapent, ce n'est pas la règle : c'est ce que R0 encourage sans le
   vouloir.** R0 donne **un seul** coefficient géométrique, $i$, de module $1$
   (`lesson.md:15-23`), et conclut « *multiplier par $i$ […] ça **fait tourner** tout le plan*
   » (`:23`). Sa question de sortie l'admet elle-même : « *Est-ce que tout nombre complexe
   produit, de la même façon, une rotation — **et peut-être aussi un agrandissement*** ? »
   (`:25`). **Le « peut-être aussi » attend quatre rungs sa réponse, et la reçoit en prose.**
   La scène la rend en un pari. *Et le modèle est déclaré, avec trois items :
   `mult-par-i-non-rotation` (`items.yaml:2302`).*
2. **S1, S2 et S3 posent les questions du chapitre où elles SONT ; S4 aussi ; S5 pose une
   question qu'aucun chapitre ne pose.** C'est un écart de phase **inverse** de celui que la
   vague 1 du banc d'électrolyse a refusé : là-bas la scène enseignait le chapitre SUIVANT ;
   ici S5 enseigne un savoir-faire de cadre que **la notion entière** ne porte pas (fait
   **f**). **La conséquence est écrite et chiffrée : la scène ne part qu'accompagnée de la
   prose du §4.4.** Une étape qui exerce un geste qu'aucun paragraphe ne pose est exactement
   l'anti-motif que `REVIEW:132-137` (S8) reproche déjà à `cp-ensemble-points` — « *méthode
   dans la réponse, l'anti-motif* ». **On ne le refait pas.**

**Ce que le placement NE fait pas.** `cp-r5-ecriture` reste où il est, **après** R5
(`lesson.md:313`), et **n'est pas modifié** : il teste l'**écriture** (quelle formule ?), la
scène teste le **lieu** (où arrive le point ?). Complémentaires, jamais doublons — et le §7.4
le vérifie choix par choix.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

*Le §4 décrit ; il ne rédige pas. Toute prose commandée ici emploie la numérotation
« chapitre N » établie en tête de document (**R5 = chapitre 6**), la voix du reste de la
notion, et n'introduit **aucune** citation « chapitre N » nouvelle vers un autre rung
(`REVIEW:69-80`, S1).*

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

**Emplacement :** juste après le titre `## R5` (`lesson.md:269`), avant le marqueur.
**Longueur : 40 à 60 mots. Ton : neutre, il n'annonce aucune réponse.**

Il doit : (a) rappeler la question laissée ouverte au chapitre 1 (`lesson.md:25`) ; (b) dire
qu'on va la trancher **en essayant**, avant de la démontrer ; (c) **ne nommer ni rotation, ni
homothétie, ni rapport, ni angle, ni centre comme des résultats**. *Interdit : toute phrase de
la forme « tu verras que… ». C'est le correctif « pédagogie 8 » du banc d'électrolyse.*

### 4.2 Le marqueur

Seul sur sa ligne : `[[embed:plan-complexe-transformation]]`.

### 4.3 Le cœur de R5 — **un second exemple travaillé, hors de l'axe réel** (APRÈS le marqueur)

**Motif : le défaut mesuré (fait d).** L'exemple actuel (`lesson.md:299-309`, $c=1+i$, $z=3$)
**reste** — il est juste, il est simple, et il est cité ailleurs. On lui **adjoint** un second
exemple, 90 à 130 mots, sur **$z = 2i$** avec le même $c = 1+i$ :

$$z' = (1+i)(2i) = 2i + 2i^2 = -2 + 2i$$

et la prose doit faire lire, dans cet ordre : $|z| = 2$, $|z'| = 2\sqrt2$, le rapport
$\dfrac{|z'|}{|z|} = \sqrt2 = |c|$ ; puis $\arg(z) = \dfrac{\pi}{2}$,
$\arg(z') = \dfrac{3\pi}{4}$, et **l'écart** $\dfrac{3\pi}{4} - \dfrac{\pi}{2} =
\dfrac{\pi}{4} = \arg(c)$.

*Vérifications : $|{-2+2i}| = \sqrt{4+4} = 2\sqrt2$ ✓ ; $2\sqrt2/2 = \sqrt2$ ✓ ;
$-2+2i$ est dans le deuxième quadrant, $\cos = -\dfrac{\sqrt2}{2}$, $\sin = \dfrac{\sqrt2}{2}$
⟹ $\arg = \dfrac{3\pi}{4}$ ✓ ; $\dfrac{3\pi}{4}-\dfrac{\pi}{2} = \dfrac{3\pi}{4}-\dfrac{2\pi}{4}
= \dfrac{\pi}{4}$ ✓.*

**Et une phrase de mécanisme, non négociable**, à écrire juste après :
> l'angle d'une rotation est une **différence** de deux directions, pas la direction de
> l'image ; sur le premier exemple les deux coïncident **parce que** $\arg(3) = 0$, et c'est un
> hasard de l'exemple, pas une règle.

*C'est la phrase que la scène fait DÉCOUVRIR à S3 ; la prose la POSE. L'ordre est celui de
l'ADR 0041 §6.*

### 4.4 Une sous-section neuve — « Reconnaître une transformation écrite $z' = az + b$ »

**C'est la contrepartie obligatoire de S5** (§3, tension 2), et elle solde un savoir-faire de
cadre à **0/34** (`maths-sm.yaml:229`, `maths-sexp.yaml:254`, `REVIEW:100-105`).
**Emplacement : après la sous-section « Centrer la transformation ailleurs qu'en $O$ »
(`lesson.md:283-295`), avant l'exemple travaillé. Longueur : 150 à 220 mots.**

Elle doit établir, dans cet ordre et **en montrant le mécanisme**, jamais en l'affirmant :
1. développer $z' - \omega = a(z-\omega)$ donne $z' = az + \underbrace{\omega(1-a)}_{b}$ —
   **toute** transformation de la forme $z'-\omega = a(z-\omega)$ s'écrit $z' = az+b$ ;
2. réciproquement, pour $a \neq 1$, **le centre est le point qui ne bouge pas** : on le cherche
   en écrivant $\omega = a\omega + b$, d'où $\omega = \dfrac{b}{1-a}$. *Le « pourquoi » à
   écrire : on ne devine pas le centre, on le **résout** — c'est la définition « point fixe »
   qui fournit l'équation* ;
3. le rapport est $|a|$ (un **réel positif**), l'angle est $\arg(a)$ ;
4. les deux cas dégénérés, une phrase chacun : $a$ réel strictement positif ⟹ homothétie
   seule ; $|a| = 1$ ⟹ rotation seule. *(Ils sont déjà écrits à `lesson.md:295` pour la forme
   factorisée ; ici on les relit sur $a$.)*
5. **le cas $a = 1$ est nommé et écarté en une phrase** : il n'y a alors aucun point fixe et
   $z' = z + b$ est une **translation** — la transformation du chapitre 1
   (`lesson.md:7`). *Sans cette phrase, $\omega = \dfrac{b}{1-a}$ est une division par zéro
   non signalée.*

**Un exemple travaillé complet**, avec la voix experte (« ce qu'on cherche et pourquoi ce
geste ») : **$z' = iz + 2 - 2i$**.
$a = i$, $b = 2-2i$, $|a| = 1$, $\arg(a) = \dfrac{\pi}{2}$,
$\omega = \dfrac{2-2i}{1-i} = \dfrac{2(1-i)}{1-i} = 2$ ⟹ **la rotation de centre le point
d'affixe $2$ et d'angle $\dfrac{\pi}{2}$**. **Vérification par la seconde route**, comme le
fait le reste de la notion : $z' - 2 = iz + 2 - 2i - 2 = iz - 2i = i(z-2)$ ✓.

*Le mot « **similitude** » n'est PAS employé dans ce paragraphe* (§9.2, `maths-sexp.yaml:258`
le réserve à SM ; la notion ne le définit nulle part et `items.yaml:2067` l'emploie déjà sans
le définir). *§13.2 dit comment défaire.*

### 4.5 Une phrase de raccord en tête de R6 — et rien de plus

**Emplacement : `lesson.md:321`, avant « Soient $A$, $B$, $C$… ». 25 à 40 mots.** Elle doit
dire que le rapport $\dfrac{z_C-z_A}{z_B-z_A}$ **est le coefficient du chapitre 6, lu à
l'envers** : on ne découvre pas un outil, on retourne celui d'avant. *Elle ne donne aucune
ligne de la table de R6.*

### 4.6 Deux puces au récapitulatif (R7)

`lesson.md:368` liste les outils du chapitre. Ajouter : (a) « $|c|$ multiplie une longueur,
$\arg(c)$ **ajoute** un angle — et cet angle est un **écart**, jamais la direction d'un
point » ; (b) « une transformation écrite $z' = az+b$ se caractérise par $|a|$, $\arg(a)$ et
$\omega = \dfrac{b}{1-a}$ ».

### 4.7 Aucun nouveau point d'arrêt

`cp-r5-ecriture` reste tel quel, à sa place (`lesson.md:313`). *Motif : la scène porte cinq
paris ; ajouter un sixième QCM au même rung serait de la redondance, et `REVIEW:201-204` (D13)
dit que ce dont ce rung manque n'est pas un QCM de plus.* **En revanche, `REVIEW:196-198`
(D11) reste dû** : `cp-r5-ecriture` est un marqueur nu, sans phrase de cadrage ni de reprise.
**Cette spec ne le referme pas.**

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Le repère — isotrope, fixe, gradué, et c'est une décision de porte

**Fenêtre de données : $x \in [-9 ; 9]$, $y \in [-5 ; 5]$. Elle ne change JAMAIS**, à aucune
étape, à aucun réglage.

> **L'isotropie est la décision de rendu la plus lourde de cette scène, et le dépôt a déjà
> payé pour l'avoir oubliée — DANS CETTE NOTION.** `docs/ops/SCENE-CONTRACT.md:186-203` :
> « *Le repère doit être ISOTROPE (même échelle en x et en y) dès qu'une figure illustre un
> CERCLE ou un ANGLE DROIT […] Défaut RÉEL trouvé le 2026-08-14
> (`nombres-complexes-2/bk-2025-n-x2.py`, question de cocyclicité K/I/H/J : **écart de 36,9 %
> entre le rayon écran et la distance H-centre**, alors que le produit scalaire en espace de
> données valait ≈0) — **le dessin contredit alors la preuve qu'il illustre**.* »
>
> **Donc :** le facteur px/unité est **le même horizontalement et verticalement**, à tout
> instant et à toute largeur. Si la largeur disponible impose un autre rapport que $18{:}10$,
> **la fenêtre s'ÉTEND symétriquement du côté qui a de la place** — elle ne se redimensionne
> jamais sur un seul axe. **Famille de porte à part entière** (§11.2, `isotropie`), mesurée
> dans les deux sens.

Sont tracés à l'encre, toujours : les deux axes avec leur nom ($\vec u$ horizontal,
$\vec v$ vertical, comme `lesson.md:39`), **les graduations entières**, l'origine $O$, et
**le cercle unité**. *Le cercle unité n'est pas décoratif : c'est l'étalon qui rend « $|c|=1$ »
lisible sans lire un nombre, et c'est la vérification visuelle de l'isotropie.*

**Échelle mesurée :** à $1\,280$ px de large, le plateau fait $\approx 1\,150$ px ⟹
$\approx 64$ px/unité. **À 390 px : $\approx 21{,}7$ px/unité** — deux points distants d'une
unité sont à 22 px. *Conséquence à budgéter (§6.2) : sous 600 px, les nombres des axes ne sont
tracés que tous les **2** unités, et seules les étiquettes de $M$, $M'$, du centre et de
l'angle subsistent.*

### 5.2 Les crans — et pourquoi ces valeurs-là

**A — les sept coefficients** (`c`). Chacun a un module ET un argument **exacts** :

| cran | $c$ | $|c|$ | $\arg(c)$ | forme exponentielle | pourquoi ce cran |
|---|---|---|---|---|---|
| `2` | $2$ | $2$ | $0$ | $2e^{i0}$ | **l'état de S1** : agrandir sans tourner |
| `0.5` | $\dfrac12$ | $\dfrac12$ | $0$ | $\tfrac12 e^{i0}$ | le seul qui **rapproche** — un rapport $<1$ est un rapport |
| `i` | $i$ | $1$ | $\dfrac{\pi}{2}$ | $e^{i\pi/2}$ | **le coefficient de R0**, relu avec ses deux nombres |
| `-2` | $-2$ | $2$ | $\pi$ | $2e^{i\pi}$ | le réel **négatif** : c'est LUI le demi-tour, pas le positif |
| `1+i` | $1+i$ | $\sqrt2$ | $\dfrac{\pi}{4}$ | $\sqrt2\,e^{i\pi/4}$ | **le $c$ de l'exemple travaillé** (`lesson.md:299`) |
| `2i` | $2i$ | $2$ | $\dfrac{\pi}{2}$ | $2e^{i\pi/2}$ | **l'état de S2** : même module que `2`, même argument que `i` |
| `sqrt3+i` | $\sqrt3 + i$ | $2$ | $\dfrac{\pi}{6}$ | $2e^{i\pi/6}$ | **l'état de S3** : un angle qui n'est ni $0$ ni un quart de tour |

*Vérifications : $|\sqrt3+i| = \sqrt{3+1} = 2$ ✓, $\cos\theta = \dfrac{\sqrt3}{2}$,
$\sin\theta = \dfrac12$ ⟹ $\theta = \dfrac{\pi}{6}$ ✓ (table `lesson.md:71-74`) ·
$|1+i| = \sqrt2$, $\cos = \sin = \dfrac{\sqrt2}{2}$ ⟹ $\dfrac{\pi}{4}$ ✓ (c'est l'exemple
travaillé de `lesson.md:84-90`).*

> **Le couple `2` / `2i` / `i` est construit pour être lu en croix** : `2` et `2i` ont le même
> **module**, `i` et `2i` ont le même **argument**. C'est ce qui permet à la `suite` de S3 de
> dire « change le module, l'angle ne bouge pas ; change l'argument, la distance ne bouge
> pas » **sans une seule phrase d'auteur** — deux réglages le montrent.

**B — les cinq points** (`z`) :

| cran | $z$ | $|z|$ | $\arg(z)$ | pourquoi ce cran |
|---|---|---|---|---|
| `1+i` | $1+i$ | $\sqrt2$ | $\dfrac{\pi}{4}$ | l'état de S1 ; **et le centre $\Omega$ de S5** |
| `2i` | $2i$ | $2$ | $\dfrac{\pi}{2}$ | l'état de S2 et de S3 ; **hors de l'axe réel** |
| `2` | $2$ | $2$ | $0$ | **sur l'axe réel** (le cas dégénéré de S3) ; **et le centre $A$ de S4** |
| `4` | $4$ | $4$ | $0$ | l'état de S4, à distance $2$ de $A$ |
| `-2+2i` | $-2+2i$ | $2\sqrt2$ | $\dfrac{3\pi}{4}$ | le deuxième quadrant |

**Il n'y a pas de cran $z = 0$, et c'est délibéré** : $\arg(0)$ n'est pas défini
(`lesson.md:43`), et une lecture d'argument vide au milieu d'une liste enseignerait un trou au
lieu d'une règle. **Le point fixe d'une transformation centrée en $O$ est marqué sur le
dessin, jamais posé comme $M$.** *§13.6.*

**C — les deux centres** (`centre`) : `O` ($z_\Omega = 0$) et `A` ($z_\Omega = 2$).
*$z_A = 2$ est **la valeur de `cp-r5-ecriture`* (`checkpoints.yaml:204-205`) : la scène et le
point d'arrêt parlent du même point, ce qui est le seul moyen que le second se lise comme la
suite du premier.*

**D — les quatre énoncés** (`enonce`) :

| cran | ce qui est donné | $a$ | $b$ | $\omega = \dfrac{b}{1-a}$ | $|a|$ | $\arg(a)$ |
|---|---|---|---|---|---|---|
| `coefficient` | $c$ **et** le centre (mode direct, S1–S4) | — | — | le cran `centre` | — | — |
| `rotation-A` | $z' = iz + 2 - 2i$ | $i$ | $2-2i$ | $2$ | $1$ | $\dfrac{\pi}{2}$ |
| `homothetie-A` | $z' = 2z - 2$ | $2$ | $-2$ | $2$ | $2$ | $0$ |
| `les-deux` | $z' = (1+i)z + 1 - i$ | $1+i$ | $1-i$ | $1+i$ | $\sqrt2$ | $\dfrac{\pi}{4}$ |

*Vérifications du point fixe, par la définition (et non par la formule — la porte refait les
deux) :
`rotation-A` : $i\cdot 2 + 2 - 2i = 2i + 2 - 2i = 2$ ✓, et $\dfrac{2-2i}{1-i} = \dfrac{2(1-i)}{1-i} = 2$ ✓ ·
`homothetie-A` : $2\cdot 2 - 2 = 2$ ✓, et $\dfrac{-2}{1-2} = 2$ ✓ ·
`les-deux` : $(1+i)(1+i) + 1 - i = 2i + 1 - i = 1+i$ ✓, et
$\dfrac{1-i}{1-(1+i)} = \dfrac{1-i}{-i} = \dfrac{(1-i)\,i}{-i\cdot i} = \dfrac{i+1}{1} = 1+i$ ✓.*

> **`rotation-A` est, mot pour mot, la transformation de S4 écrite autrement.** C'est ce qui
> permet à la `suite` de S5 de fermer la boucle sans une ligne de prose : *« c'est la
> transformation de l'étape précédente ; son centre est le $A$ que tu avais posé. »*

**E — la référence** (`reference`) : `aucune` · `depart` (trace en tirets l'image obtenue au
réglage initial de l'étape). *État sans contrôle, posé par les étapes — même contrat qu'au
banc de diffraction (`reference` dans `etat`, absent de `controles`).*

### 5.3 Les tables de nombres — **toute l'arithmétique de la scène, vérifiée**

**A — les $7 \times 5 = 35$ images, en mode `coefficient`, centre $O$** (le produit $cz$) :

| $c \backslash z$ | $1+i$ | $2i$ | $2$ | $4$ | $-2+2i$ |
|---|---|---|---|---|---|
| $2$ | $2+2i$ | $4i$ | $4$ | $8$ | $-4+4i$ |
| $\tfrac12$ | $\tfrac12+\tfrac12 i$ | $i$ | $1$ | $2$ | $-1+i$ |
| $i$ | $-1+i$ | $-2$ | $2i$ | $4i$ | $-2-2i$ |
| $-2$ | $-2-2i$ | $-4i$ | $-4$ | $-8$ | $4-4i$ |
| $1+i$ | $2i$ | $-2+2i$ | $2+2i$ | $4+4i$ | $-4$ |
| $2i$ | $-2+2i$ | $-4$ | $4i$ | $8i$ | $-4-4i$ |
| $\sqrt3+i$ | $(\sqrt3-1)+(\sqrt3+1)i$ | $-2+2\sqrt3\,i$ | $2\sqrt3+2i$ | $4\sqrt3+4i$ | $(-2\sqrt3-2)+(2\sqrt3-2)i$ |

*Vérifications des sept cases non triviales : $i(1+i) = i+i^2 = -1+i$ ✓ ·
$(1+i)(1+i) = 1+2i+i^2 = 2i$ ✓ · $(1+i)(2i) = 2i+2i^2 = -2+2i$ ✓ ·
$(1+i)(-2+2i) = -2+2i-2i+2i^2 = -4$ ✓ · $(2i)(2i) = 4i^2 = -4$ ✓ ·
$(\sqrt3+i)(2i) = 2\sqrt3 i + 2i^2 = -2+2\sqrt3 i$ ✓ ·
$(\sqrt3+i)(1+i) = \sqrt3+\sqrt3 i + i + i^2 = (\sqrt3-1)+(\sqrt3+1)i$ ✓ ·
$(\sqrt3+i)(-2+2i) = -2\sqrt3+2\sqrt3 i -2i+2i^2 = (-2\sqrt3-2)+(2\sqrt3-2)i$ ✓.*

**Bornes du dessin, vérifiées case par case :** l'abscisse extrême est $\pm 8$
($c = \pm 2$, $z = 4$), l'ordonnée extrême $\pm 4$ ($c=\pm2$, $z=2i$ ou $-2+2i$ ;
$c=2i$, $z=-2+2i$). **Tout tient dans $[-9;9]\times[-5;5]$**, avec une unité de marge
partout. *C'est la fenêtre qui a été choisie POUR cela, et la porte le vérifie aux 35 cases.*

**B — les modules, en mode `coefficient`, centre $O$** ($|z'| = |c|\,|z|$) :

| $|c| \backslash |z|$ | $\sqrt2$ | $2$ | $2$ | $4$ | $2\sqrt2$ |
|---|---|---|---|---|---|
| $2$ | $2\sqrt2$ | $4$ | $4$ | $8$ | $4\sqrt2$ |
| $\tfrac12$ | $\tfrac{\sqrt2}{2}$ | $1$ | $1$ | $2$ | $\sqrt2$ |
| $1$ | $\sqrt2$ | $2$ | $2$ | $4$ | $2\sqrt2$ |

*Les sept coefficients n'ont que **trois** modules ($2$, $\tfrac12$, $1$, et $\sqrt2$ pour
`1+i`) : la table se lit en quatre lignes. $\sqrt2 \times \sqrt2 = 2$ ✓,
$\sqrt2 \times 2\sqrt2 = 4$ ✓, $\sqrt2 \times 4 = 4\sqrt2$ ✓.*

**C — les arguments, avec $c = \sqrt3+i$ ($\arg c = \dfrac{\pi}{6}$) — LA TABLE DE S3 :**

| $z$ | $\arg(z)$ | $z' = (\sqrt3+i)z$ | $\arg(z')$ | **écart $\arg(z')-\arg(z)$** |
|---|---|---|---|---|
| $1+i$ | $\dfrac{\pi}{4}$ | $(\sqrt3-1)+(\sqrt3+1)i$ | $\dfrac{5\pi}{12}$ | $\dfrac{\pi}{6}$ |
| $2i$ | $\dfrac{\pi}{2}$ | $-2+2\sqrt3\,i$ | $\dfrac{2\pi}{3}$ | $\dfrac{\pi}{6}$ |
| $2$ | $0$ | $2\sqrt3+2i$ | $\dfrac{\pi}{6}$ | $\dfrac{\pi}{6}$ |
| $4$ | $0$ | $4\sqrt3+4i$ | $\dfrac{\pi}{6}$ | $\dfrac{\pi}{6}$ |
| $-2+2i$ | $\dfrac{3\pi}{4}$ | $(-2\sqrt3-2)+(2\sqrt3-2)i$ | $\dfrac{11\pi}{12}$ | $\dfrac{\pi}{6}$ |

*Vérifications : $\dfrac{\pi}{4}+\dfrac{\pi}{6} = \dfrac{3\pi}{12}+\dfrac{2\pi}{12} =
\dfrac{5\pi}{12}$ ✓ · $\dfrac{\pi}{2}+\dfrac{\pi}{6} = \dfrac{3\pi}{6}+\dfrac{\pi}{6} =
\dfrac{2\pi}{3}$ ✓ (et $-2+2\sqrt3 i$ est en deuxième quadrant, module $\sqrt{4+12}=4$,
$\cos = -\tfrac12$, $\sin = \tfrac{\sqrt3}{2}$ ⟹ $\dfrac{2\pi}{3}$ ✓) ·
$\dfrac{3\pi}{4}+\dfrac{\pi}{6} = \dfrac{9\pi}{12}+\dfrac{2\pi}{12} = \dfrac{11\pi}{12}$ ✓.*

> **Les deux lignes $z = 2$ et $z = 4$ sont le cœur de S3, et il faut les regarder en
> face :** ce sont les deux seules où $\arg(z')$ **EST** $\dfrac{\pi}{6}$, c'est-à-dire où
> l'argument de l'image et l'angle de la transformation se confondent. **Ce sont exactement
> les points de l'exemple travaillé que l'élève lira trois paragraphes plus bas**
> (`lesson.md:299`, $z = 3$). La `suite` de S3 le dit en toutes lettres. *Une scène qui ne
> montrerait que des points hors de l'axe cacherait le piège au lieu de le désamorcer.*

**D — les distances au centre $A$ (affixe $2$), rotation d'angle $\dfrac{\pi}{2}$ — S4 :**
pour $z = 4$, $z - z_A = 2$, $z' - z_A = i\cdot 2 = 2i$, donc $z' = 2+2i$. $AM = AM' = 2$,
rapport $1$, angle $\dfrac{\pi}{2}$.

| $z$ | $z - 2$ | $z' = 2 + i(z-2)$ | $AM$ | $AM'$ |
|---|---|---|---|---|
| $1+i$ | $-1+i$ | $2 + i(-1+i) = 1 - i$ | $\sqrt2$ | $\sqrt2$ |
| $2i$ | $-2+2i$ | $2 + i(-2+2i) = -2i$ … soit $0-2i$ | $2\sqrt2$ | $2\sqrt2$ |
| $2$ | $0$ | $2$ — **le point ne bouge pas** | $0$ | $0$ |
| $4$ | $2$ | $2+2i$ | $2$ | $2$ |
| $-2+2i$ | $-4+2i$ | $2 + i(-4+2i) = -4i$ … soit $0-4i$ | $2\sqrt5$ | $2\sqrt5$ |

*Vérifications : $i(-1+i) = -i + i^2 = -1-i$, donc $z' = 2-1-i = 1-i$ ✓, et
$|1-i-2| = |-1-i| = \sqrt2 = |{-1+i}|$ ✓ · $i(-2+2i) = -2i+2i^2 = -2-2i$, donc
$z' = 2-2-2i = -2i$ ✓, et $|-2i-2| = |-2-2i| = 2\sqrt2 = |-2+2i|$ ✓ ·
$i(-4+2i) = -4i+2i^2 = -2-4i$, donc $z' = 2-2-4i = -4i$ ✓, et $|-4i-2| = |-2-4i| =
\sqrt{4+16} = 2\sqrt5 = |-4+2i|$ ✓.*
**Tous ces points tiennent dans la fenêtre** ($y$ minimal $-4$) ✓.

**E — le mode `les-deux` : $z' = (1+i)z + 1-i$, centre $\Omega(1;1)$ — S5 :**

| $z$ | $z'$ | $z-\omega$ | $z'-\omega$ | $\Omega M$ | $\Omega M'$ | $\dfrac{\Omega M'}{\Omega M}$ | $\dfrac{z'-\omega}{z-\omega}$ |
|---|---|---|---|---|---|---|---|
| $1+i$ | $1+i$ | $0$ | $0$ | $0$ | $0$ | — | — (**point fixe**) |
| $2i$ | $-1+i$ | $-1+i$ | $-2$ | $\sqrt2$ | $2$ | $\sqrt2$ | $1+i$ |
| $2$ | $3+i$ | $1-i$ | $2$ | $\sqrt2$ | $2$ | $\sqrt2$ | $1+i$ |
| $4$ | $5+3i$ | $3-i$ | $4+2i$ | $\sqrt{10}$ | $2\sqrt5$ | $\sqrt2$ | $1+i$ |
| $-2+2i$ | $-3-i$ | $-3+i$ | $-4-2i$ | $\sqrt{10}$ | $2\sqrt5$ | $\sqrt2$ | $1+i$ |

> **Un défaut de cette spec, trouvé en la vérifiant et écrit ici plutôt que corrigé en
> douce.** Le premier jet de cette table donnait $z=2i \Rightarrow z' = -2+2i$ (l'image par
> $\times(1+i)$ **sans** le $+\,b$ — c'est-à-dire, mot pour mot, la misconception
> `ecriture-complexe-oubli-constante` que la scène combat, commise par son propre auteur).
> Le bon calcul : $(1+i)(2i)+1-i = -2+2i+1-i = \mathbf{-1+i}$. *Leçon, pour la porte : la
> ligne N7 doit recalculer $z'$ **depuis $a$ et $b$**, jamais depuis $a$ et $\omega$, et le
> sabotage 3 du §11.4 est exactement cet oubli.*

*Vérifications, $z=2i$ compris : $(1+i)(2i) = 2i+2i^2 = -2+2i$, $+1-i \Rightarrow -1+i$ ✓ ;
$-1+i-(1+i) = -2$ ✓ ; $\dfrac{-2}{-1+i} = \dfrac{-2(-1-i)}{(-1)^2+1^2} = \dfrac{2+2i}{2} =
1+i$ ✓.
Les trois autres lignes : $z=2 \Rightarrow (1+i)2+1-i = 2+2i+1-i = 3+i$ ✓,
$\dfrac{2}{1-i} = \dfrac{2(1+i)}{2} = 1+i$ ✓ · $z=4 \Rightarrow 4+4i+1-i = 5+3i$ ✓,
$\dfrac{4+2i}{3-i} = \dfrac{(4+2i)(3+i)}{9+1} = \dfrac{12+4i+6i+2i^2}{10} = \dfrac{10+10i}{10}
= 1+i$ ✓ · $z=-2+2i \Rightarrow (1+i)(-2+2i) = -4$, donc $-4+1-i = -3-i$ ✓,
$\dfrac{-4-2i}{-3+i} = \dfrac{(-4-2i)(-3-i)}{9+1} = \dfrac{12+4i+6i+2i^2}{10} = 1+i$ ✓.*

**Le fait que la scène existe pour montrer, en une ligne :** la dernière colonne est
**constante**. $\dfrac{z'-\omega}{z-\omega} = a$ pour tout $M$, et c'est la définition même du
centre. *La porte le mesure comme une **égalité de chaîne** aux cinq points, aux trois
transformations (§11.1, N7).*

**Bornes du dessin en mode `enonce` :** le point extrême est $(5;3)$ (`les-deux`, $z=4$) et
$(6;0)$ (`homothetie-A`, $z=4 \Rightarrow z' = 6$). Tout tient ✓.

### 5.4 La précision — **exacte, ou rien**

> **Aucune lecture de cette scène n'affiche un décimal.** Tous les modules sont des entiers
> ou des radicaux ($2$, $\sqrt2$, $2\sqrt5$, $\sqrt{10}$) ; tous les arguments sont des
> fractions de $\pi$ ($\dfrac{\pi}{6}$, $\dfrac{5\pi}{12}$, $\dfrac{11\pi}{12}$) ; tous les
> affixes sont des combinaisons entières de $1$, $i$ et $\sqrt3$. **C'est la raison pour
> laquelle les crans sont discrets** (§2.6) et **c'est une frontière mesurée** (§9.8) : la
> porte relève tout nombre décimal affiché dans une lecture et rougit.

**Trois précisions d'écriture, non négociables :**
1. **Les arguments sont en radians, en fraction de $\pi$** — jamais en degrés, jamais en
   décimal. *La leçon travaille en radians (`lesson.md:39`) ; elle emploie « $90°$ » et « un
   quart de tour » **en mots** à `:21`. Les retours de pari ont donc le droit d'écrire « un
   quart de tour » ; **aucune lecture** n'a le droit d'écrire un degré (§9.8).*
2. **Les arguments sont donnés dans $\,]-\pi ; \pi]$**, et les écarts aussi. *Motif : c'est
   la convention de tous les corrigés de la banque (`bank.yaml:348` écrit
   $-\dfrac{\pi}{2}$, pas $\dfrac{3\pi}{2}$). Un écart négatif s'affiche négatif.*
3. **Les deux formes de $c$ ne sont jamais affichées au même endroit.** La forme **algébrique**
   est sur la scène, près du badge du coefficient ; les deux moitiés exponentielles
   ($|c|$ et $\arg c$) sont des **lectures**, et elles apparaissent à des étapes
   différentes (§2.3). *C'est la graduation, et c'est mesuré.*

### 5.5 Contrôles (4) — un neuf par étape, sauf une, déclarée

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `coefficient` | $c$ | `2` · `0.5` · `i` · `-2` · `1+i` · `2i` · `sqrt3+i` | **S1**, **S3** *(rouvert)*, S5 |
| `point` | $z$ | `1+i` · `2i` · `2` · `4` · `-2+2i` | **S2**, **S3** *(rouvert)*, S4, S5 |
| `centre` | $z_\Omega$ | `O` · `A` | **S4**, S5 |
| `enonce` | la forme donnée | `coefficient` · `rotation-A` · `homothetie-A` · `les-deux` | **S5** |

**Aucun curseur continu. Aucune borne.** *Tout est en crans discrets, pour la raison du §5.4 :
un réglage continu produirait des nombres que la scène ne saurait afficher exactement.*
**Aucune clé de `bornes` dans le registre** — c'est la première scène du dépôt dans ce cas, et
c'est déclaré (§12).

**S3 n'ouvre AUCUN contrôle neuf**, et c'est voulu : son pari porte sur une **lecture** (quel
angle mesure-t-on ?), pas sur un réglage. Elle **rouvre** `coefficient` et `point` pour que sa
`suite` puisse promener les deux et faire constater l'invariance de l'écart. *Précédent
explicite : le banc d'électrolyse, S4 (« son pari porte sur une lecture, pas un réglage »).
La non-fuite est tenue par les **lectures**, pas par les réglages (§7.6 A).*

### 5.6 État (5 clés) et lectures (9)

**État :** `c`, `z`, `centre`, `enonce`, `reference`. **Aucune clé posée sans contrôle**,
sauf `reference` (posée par les étapes, comme au banc de diffraction). La fenêtre du repère,
le cercle unité et le pas des graduations sont des **constantes du modèle** : aucun contrôle
ne les atteint.

| id | ce qui s'affiche | forme | à partir de |
|---|---|---|---|
| `module-c` | $\vert c\vert$ | entier ou radical **exact** | **S1** |
| `distances` | $\Omega M$ et $\Omega M'$ | radicaux exacts | **S2** |
| `rapport` | $\dfrac{\Omega M'}{\Omega M}$ | exact ; « — » si $M = \Omega$ | **S2** |
| `argument-c` | $\arg(c)$ | fraction de $\pi$, dans $]-\pi;\pi]$ | **S3** |
| `angle` | l'angle $\left(\overrightarrow{\Omega M}, \overrightarrow{\Omega M'}\right)$ | fraction de $\pi$ | **S3** |
| `argument-image` | $\arg(z)$ **et** $\arg(z')$, **l'un sous l'autre** | fractions de $\pi$ | **S3** |
| `point-fixe` | l'affixe du point qui ne bouge pas | exacte | **S4** |
| `ecriture` | l'écriture complexe de la transformation | **S4 : factorisée seule ; S5 : les deux formes** | **S4** |
| `rapport-inverse` | $\dfrac{z'-\omega}{z-\omega}$ | exact | **S5** |

**`argument-image` est la lecture double du banc de modulation, transposée** (ADR 0041,
addendum du 2026-09-25, point 2 : *« là où une méthode de lecture SATURE, la scène affiche les
deux lectures, l'une sous l'autre »*). Ici la « méthode qui sature » est **lire l'angle depuis
l'axe réel** : elle donne le bon résultat **exactement quand $\arg(z) = 0$**, et s'écroule
partout ailleurs. **Le `angle` et l'`argument-image` sont donc affichés ensemble, toujours,
à partir de S3** — identiques sur `2` et `4`, différents sur les trois autres points. *La
porte exige les DEUX sens (§11.1 N5).*

**Aucune lecture ne répète ce que le DESSIN montre déjà** (leçon de la vague 2 du banc
d'électrolyse : *`intensite` quitte les cinq étapes, l'ampèremètre l'affiche*). Le partage est
strict et mesuré :

| ce qui vit SUR le plan (jamais dans la liste) | ce qui vit dans la LISTE (jamais sur le plan) |
|---|---|
| $z$ étiqueté à côté de $M$ · $z'$ étiqueté à côté de $M'$ · le nom et l'affixe du centre · $c$ **en forme algébrique** sur son badge · l'écriture $z' = az+b$ sur son badge (S5) · l'**arc** et son étiquette d'angle | $\vert c\vert$ · $\arg(c)$ · $\Omega M$ et $\Omega M'$ · leur quotient · $\arg(z)$ et $\arg(z')$ · l'affixe du **point fixe** · l'**écriture** factorisée · $\dfrac{z'-\omega}{z-\omega}$ |

*La porte le vérifie **dans les deux sens** : la liste ne contient pas $z'$ (le dessin le
porte), et le dessin ne porte pas $\vert c\vert$ (la liste le porte). **Une exception
déclarée :** l'**étiquette de l'arc** porte la valeur de `angle`, qui est aussi une lecture —
c'est le seul doublon, et il est voulu, parce que c'est la seule lecture dont la position sur
le dessin **est** l'argument (l'arc sans son nombre ne dit pas lequel des quatre paris est
juste).*

**Ce que la scène n'affiche PAS, et il faut le dire :**
- **$\arg(z')$ n'est jamais donné comme « l'angle de la transformation »**, à aucune étape et
  sous aucune formulation. Il est étiqueté « *argument de l'image (depuis l'axe réel)* » ;
  `angle` est étiqueté « *angle de la transformation (écart des deux directions)* ». *Deux
  étiquettes, deux mots, et ce sont eux que la porte lit (§11.1 N5).*
- **Aucune valeur en mode `enonce` ≠ `coefficient` n'est affichée pour $c$** : le coefficient
  est $a$, et il se lit sur l'écriture. *Sinon S5 se répondrait à elle-même.*
- **Aucun rapport quand $M = \Omega$** (le point fixe) : la scène écrit « — », et la ligne
  `point-fixe` dit pourquoi. *$\dfrac{0}{0}$ ne s'affiche pas.*

---

## 6. Ni temps ni course — et la langue visuelle

### 6.1 `temps: false`, `course: false` — et le pari reste entier

Même régime que `sphere-plan-droite` et `banc-de-diffraction` : le verdict est **immédiat**,
et c'est `etat_revele` qui fait répondre la **scène avant le texte** (ADR 0041, addendum du
2026-09-24 nuit, point 1). `validate-content` interdit `revele_apres_h > 0` sur une scène sans
temps ; **il n'y en a aucun ici**.

**Comment le pari reste avant tout :**
- tant que l'élève n'a pas choisi, **le contrôle de l'étape n'existe pas dans le DOM**, ni le
  verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : le repère, le cercle unité, le centre de l'étape, le
  point $M$ avec son affixe, et le coefficient (ou l'écriture) que la consigne vient
  d'énoncer ;
- **aucun $M'$, aucun segment vers $M'$, aucun arc, aucune marque de point fixe, aucun pixel
  d'accent, à aucun moment, avant l'engagement** (§7.6) ;
- après l'engagement : $M'$ se pose, son segment se trace, l'arc apparaît, les lectures de
  l'étape s'écrivent. **C'est le plan qui répond, avant le texte.**

**Éclairs et mouvement réduit.** Rien n'anime : la famille `eclairs` est **attendue
structurellement vide**, et **mesurée quand même** (§11.3) — *une chose n'est prouvée absente
que si l'on a énuméré ses formes* (ADR 0036). Sous `prefers-reduced-motion`, rien ne change :
il n'y a aucune transition à supprimer. **Aucune courbe tracée**, donc aucune grille glissante
à surveiller (règle de la corde).

**Aucune trace entre étapes** : chaque étape repart de son état déclaré. **Aucune VUE** : la
scène est plane et n'a qu'un point de vue — *pas de `vue` dans l'état, et c'est le premier
plan du dépôt à ne pas en avoir besoin même en option.*

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : les deux axes et leurs noms, **les graduations entières**,
  $O$, **le cercle unité**, le **centre** de l'étape avec son nom et son affixe **quand la
  consigne le donne** (S1 à S4), le point **$M$** avec son affixe, le **segment** du centre à
  $M$, et le **badge du coefficient** portant $c$ **en forme algébrique** (ou l'écriture
  $z'=az+b$ à S5).
  *Corollaire du manège, appliqué à la lettre : une donnée de l'énoncé ne se peint jamais dans
  la couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : **$M'$** et son affixe, le **segment**
  du centre à $M'$, l'**arc** de l'angle et son étiquette, la **marque de point fixe**
  (un anneau) quand elle est la réponse, et les lectures de l'étape.
- **À S5, le centre $\Omega$ n'a AUCUNE existence d'énoncé.** Règle 2 du tremplin (ADR 0041,
  addendum du 2026-09-25) : *l'objet-réponse peut n'avoir aucune existence d'énoncé.* $\Omega$
  n'est **ni dessiné, ni nommé, ni décrit, ni atteignable par un réglage** avant la révélation
  de S5 — `avant-pari` y mesure une **absence TOTALE**, pas une absence d'accent (§11.2).
- **L'arc est dessiné à un rayon FIXE**, indépendant de $\Omega M$ — sinon un arc de rayon
  $\Omega M$ deviendrait invisible pour les points proches du centre et sortirait du cadre pour
  les points lointains. *C'est une exagération, elle est constante, et le `fit_caveat` la dit
  (§10.4).*
- **Quand $M' = M$ (le point fixe), une SEULE étiquette est tracée** : « $M = M'$ ». *Règle
  transposée du tremplin (« de deux flèches colinéaires, la plus courte est dessinée
  dessus ») : deux étiquettes sur le même pixel ne se lisent pas, et celle qui compte est la
  phrase, pas le doublon. La porte le mesure aux trois points fixes ($z=2$ à S4 ; $z=1+i$ en
  mode `les-deux` ; $z=2$ en modes `rotation-A` et `homothetie-A`).*
- **Aucune teinte hors jetons** : toutes les couleurs sont lues sur les jetons `--figure-*` à
  l'exécution (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui importerait three), et
  relues au changement de thème.
- **Le quadrillage se peint OPAQUE**, jamais en transparence trait par trait. *Règle du banc
  de modulation (ADR 0041, addendum du 2026-09-25, point 6) : Chromium compose deux fois les
  sous-chemins qui se croisent dans un même trait semi-transparent, et chaque nœud d'une grille
  à 30 % devient un point à 51 % — un faux sommet pour qui lit l'écran, la porte comprise.*
  **La dette écrite de cet addendum (`diffraction-rendu.ts`, `noyaux-rendu.ts`) n'est pas
  reprise ici ; cette scène naît du bon côté.**
- **Tous les nombres passent par KaTeX**, jamais par la police du chrome : $\sqrt2$,
  $\dfrac{\pi}{6}$, $\overrightarrow{\Omega M}$, $z'$, $\omega$, $\arg$. *ADR 0030 : Geist
  dessine $\omega$ comme $\Omega$ — et cette scène affiche les DEUX. C'est le piège exact, et
  il est nommé ici pour que personne ne le retrouve à la vague 2.*
- **Les étiquettes se posent avec `disposer`, jamais `poser`**, **obligatoire ici** : $M$,
  $M'$, le centre, l'angle et jusqu'à trois nombres d'axes peuvent tomber dans le même
  voisinage (au réglage $c = \tfrac12$, $M'$ est à mi-chemin de $M$ et du centre). *Famille
  `etiquettes` à $1\,280$ **et** à 390 px.*
- **La valeur qu'on règle et la valeur qu'on lit vont ENSEMBLE sur la scène collante** (leçon
  du banc de diffraction) : $c$ sur son badge, $z$ à côté de $M$, $z'$ à côté de $M'$. La liste
  des lectures défile ; le plan, non.
- **Budget d'étiquettes, mesuré.** Au plus **six** étiquettes HTML simultanées : $M$, $M'$, le
  centre, l'angle, le badge de $c$, et le nom d'un axe. **Sous 600 px de large, les nombres des
  axes passent de tous les $1$ à tous les $2$**, et les deux noms d'axes sont retirés ; les six
  autres restent. *Mesuré par `etiquettes` aux deux largeurs.*

---

## 7. Les cinq étapes

**Agrandir sans tourner → le rapport → l'angle est un écart → le centre → lire à l'envers.**
Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant que l'élève
n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce qui dépend de l'ISSUE
attend la révélation*).

### 7.1 S1 — `agrandir-sans-tourner` · « Agrandir, ou tourner ? »

- **État :** `c: "2"`, `z: "1+i"`, `centre: "O"`, `enonce: "coefficient"`, `reference: "depart"`.
- **`etat_revele` :** aucun. *Le verdict est immédiat ; c'est la révélation qui POSE $M'$ sur
  le plan. **S1 n'a pas d'`etat_revele`, et c'est déclaré** (§15.3).*
- **Contrôle ouvert :** `coefficient` (**neuf**). **Lectures :** `module-c`.
- **Consigne (voix) :** « Le plan complexe, son cercle de rayon $1$, et un point $M$ d'affixe
  $z = 1+i$ — au point $(1;1)$. Au chapitre 1, tu as vu ce que fait la multiplication par
  $i$ : elle fait tourner d'un quart de tour, sans changer les distances. La question laissée
  ouverte était : **est-ce que tous les nombres complexes font ça ?** On commence par le plus
  simple. Le coefficient est $c = 2$. »
- **Pari :** « On multiplie $z$ par $c = 2$. Le point $M$ arrive… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `meme-direction` | en $2+2i$ — **deux fois plus loin** de $O$, dans **exactement la même direction** | **oui** | — | « Oui, et **retiens le mécanisme, pas le résultat** : $c = 2$ est un réel **positif**, son argument vaut $0$, donc il n'ajoute **aucun** angle. Ce qu'il fait, il le fait sur la **longueur** : $OM$ passe de $\sqrt2$ à $2\sqrt2$. Le chapitre 1 t'avait montré l'autre moitié de l'idée, avec $i$ ; en voici la première. Un nombre complexe porte **deux** informations, et elles ne servent pas à la même chose. » |
| `demi-tour` | en $-2-2i$ — un **demi-tour**, puis deux fois plus loin | non | **`reel-positif-donne-rotation`** | « Regarde le plan : $M'$ est en $2+2i$, sur la **même** demi-droite issue de $O$. Le demi-tour existe bien, mais il appartient à un **autre** coefficient : essaie $c = -2$, tu l'obtiendras exactement. Un réel **positif** ne fait tourner de rien ; c'est un réel **négatif** qui fait le demi-tour. » |
| `quart-de-tour` | en $-2+2i$ — un **quart de tour**, puis deux fois plus loin : multiplier, c'est tourner | non | **`mult-par-i-non-rotation`** | « Le plan dit $2+2i$. Le quart de tour n'était pas une propriété de « multiplier » : c'était une propriété de **$i$**, et le chapitre 1 le disait déjà — $|i| = 1$, donc rien ne s'éloignait. Essaie $c = i$ puis $c = 2$ : le premier tourne sans agrandir, le second agrandit sans tourner. **Ce sont deux effets séparés.** » |
| `angle-deux` | à la **même distance** de $O$, tourné de $2$ radians : le $2$ est l'angle | non | **`similitude-module-argument-roles`** | « Deux erreurs se recouvrent ici, et c'est la seconde qui compte. La première : $M'$ est deux fois plus loin, la distance a changé. La seconde, plus profonde : **$2$ n'est pas un angle ici**. Deux radians, ce sont environ $115°$ — plus d'un quart de tour ; le plan n'a pas tourné d'un degré. Le nombre qui donne un angle, ce sera l'**argument** de $c$, et $\arg(2) = 0$. » |

- **`suite` (36 mots) :** « Promène le coefficient sur les sept crans, sans rien changer
  d'autre. **Deux** d'entre eux laissent $M$ sur sa demi-droite ; **un seul** le rapproche de
  $O$ ; **un seul** l'envoie exactement à l'opposé, de l'autre côté de $O$. Trouve-les. »
  *Vérifié cran par cran contre le §5.2 A : sur la demi-droite ($\arg c = 0$) $= \{2 ;
  \tfrac12\}$ ✓ **deux** ; rapproche ($|c| < 1$) $= \{\tfrac12\}$ ✓ **un** ; à l'opposé
  ($\arg c = \pi$) $= \{-2\}$ ✓ **un**. Chaque nombre annoncé par la `suite` est compté sur la
  table des crans, jamais estimé.*
- **⟂-avant-pari :** $M'$ et son affixe ; le segment $O \to M'$ ; tout arc ; toute marque de
  point fixe ; la lecture `module-c` ; le verdict ; **tout pixel d'accent** (mesuré en
  **chrominance**, leçon du solide de révolution) ; et la description lue au lecteur d'écran
  ne doit contenir ni « $2+2i$ », ni « plus loin », ni « tourne ».

### 7.2 S2 — `le-rapport` · « De combien plus loin ? »

> **Un choix de nombres, pris contre un défaut de stem trouvé en écrivant.** Le premier jet
> posait $M$ en $2i$ ($OM = 2$) avec $|c| = 2$ : **la somme et le produit y valent tous deux
> $4$**, et le distracteur « on additionne » atteignait la **bonne réponse**. C'est une
> *contamination de la réponse juste* — un défaut de **stem**, à corriger, et non un
> co-étiquetage de distracteur, qui lui serait légitime. **$M$ passe donc en $-2+2i$** :
> $OM = 2\sqrt2$, produit $= 4\sqrt2$, somme $= 2+2\sqrt2$, distincts ✓.

- **État :** `c: "2i"`, `z: "-2+2i"`, `centre: "O"`, `enonce: "coefficient"`,
  `reference: "depart"`.
- **`etat_revele` :** aucun (la révélation pose $M'$).
- **Contrôle ouvert :** `point` (**neuf**). *`coefficient` est **absent du DOM** : $c$ est
  verrouillé sur $2i$.* **Lectures :** `module-c`, `distances`, `rapport`.
- **Les nombres :** $OM = |-2+2i| = 2\sqrt2$ · $z' = (2i)(-2+2i) = -4i + 4i^2 = -4-4i$ ·
  $OM' = |-4-4i| = 4\sqrt2$ ✓ · rapport $= 2 = |2i|$ ✓. *Le point $(-4;-4)$ tient dans la
  fenêtre ✓.*
- **Consigne (voix) :** « Nouveau coefficient : $c = 2i$. Son module vaut $2$ — la scène
  l'affiche. Le point $M$ est en $-2+2i$, au point $(-2;2)$ : il est à la distance
  $OM = 2\sqrt2$ de l'origine. On ne demande pas encore **où** il va ; on demande **à quelle
  distance de $O$**. »
- **Pari :** « Après la multiplication par $c = 2i$, la distance $OM'$ vaudra… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `produit` | $4\sqrt2$ — la distance est **multipliée** par $\vert c\vert = 2$ | **oui** | — | « Oui. $\dfrac{OM'}{OM} = \dfrac{4\sqrt2}{2\sqrt2} = 2 = \vert c\vert$ : un **quotient de deux longueurs**, un réel positif, sans unité. C'est ce qu'on appellera le **rapport**. Et note ce qu'il ne dit pas : rien sur la direction. » |
| `somme` | $2 + 2\sqrt2$ — on **ajoute** le module de $c$ à la distance de départ | non | **`produit-modules-additionnes`** | « La scène affiche $4\sqrt2$, pas $2+2\sqrt2$. L'addition serait la règle si multiplier deux complexes additionnait leurs modules — or le chapitre 3 a établi le contraire : $\vert zz'\vert = \vert z\vert \times \vert z'\vert$. Ce qui s'**additionne**, tu le verras à l'étape suivante, ce sont les **arguments**. Deux opérations, deux grandeurs. » |
| `argument-rapport` | $2\sqrt2 \times \pi$ — la distance est multipliée par l'**argument** de $c$ | non | **`similitude-module-argument-roles`** | « La scène affiche $4\sqrt2$. L'argument de $c$ est un **angle** ; multiplier une longueur par un angle ne donne pas une longueur. Les deux nombres de $c$ ne sont pas interchangeables : le **module** agit sur les longueurs, et c'est tout ce que cette étape demande. » |
| `rapport-complexe` | $2\sqrt2 \times 2i$ — le rapport vaut $2i$ | non | **`homothetie-rapport-complexe`** | « Ce nombre n'est pas une distance : une distance est un **réel positif**. C'est le cœur de l'erreur, et il vaut pour tout le chapitre : le nombre complexe $c$ **code** l'agrandissement, il n'**est** pas l'agrandissement. Ce qui agrandit, c'est son **module**, $\vert 2i\vert = 2$. » |

- **`suite` (34 mots) :** « Garde le coefficient et promène le point sur les cinq positions.
  Lis les deux distances à chaque fois, et fais leur quotient : $\sqrt2 \to 2\sqrt2$,
  $2 \to 4$, $4 \to 8$. **Toujours $2$.** »
  *Vérifié sur la table B du §5.3 : $|c| = 2$, donc $OM' = 2\,OM$ aux cinq points ✓.*
- **⟂-avant-pari :** $M'$, son affixe, son segment ; les lectures `distances` et `rapport` ;
  tout arc ; le verdict ; tout pixel d'accent ; et la phrase lue ne contient ni « $4\sqrt2$ »,
  ni « deux fois ».

### 7.3 S3 — `l-angle-est-un-ecart` · « L'angle : par rapport à quoi ? »

- **État :** `c: "sqrt3+i"`, `z: "2i"`, `centre: "O"`, `enonce: "coefficient"`,
  `reference: "aucune"`.
- **`etat_revele` :** aucun. *La révélation **trace l'arc** et ouvre les trois lectures
  d'angle ; elle ne change aucun réglage.*
- **Contrôle ouvert :** **aucun de neuf** ; `coefficient` et `point` sont **rouverts**
  (§5.5, déclaré). **Lectures :** `module-c`, `distances`, `rapport`, **`argument-c`**,
  **`angle`**, **`argument-image`**.
- **Consigne (voix) :** « Coefficient $c = \sqrt3 + i$ ; son module vaut $2$, la scène
  l'affiche. Le point $M$ est en $2i$, donc sa direction depuis $O$ fait un angle de
  $\dfrac{\pi}{2}$ avec l'axe réel. Son image $M'$ est en $-2 + 2\sqrt3\,i$, et **la direction
  de $M'$ depuis $O$ fait un angle de $\dfrac{2\pi}{3}$ avec l'axe réel**. Ces deux nombres
  sont sur le plan. La question porte sur un troisième. »
- **Pari :** « De quel angle le plan a-t-il **tourné** ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `ecart` | $\dfrac{\pi}{6}$ — l'**écart** entre les deux directions : $\dfrac{2\pi}{3} - \dfrac{\pi}{2}$ | **oui** | — | « Oui, et c'est **la** chose à retenir de ce chapitre : l'angle d'une transformation est une **différence de deux directions**, jamais la direction d'un point. La scène vient de tracer l'arc : il part de $OM$, il arrive à $OM'$, et il mesure $\dfrac{\pi}{6}$ — qui est exactement $\arg(c)$. Le chapitre 3 l'écrivait déjà, mais dans l'autre sens : $\arg(z') = \arg(c) + \arg(z)$. Retourne l'égalité, tu obtiens $\arg(z') - \arg(z) = \arg(c)$. » |
| `arg-image` | $\dfrac{2\pi}{3}$ — c'est l'angle de $M'$, lu depuis l'axe réel | non | **`angle-lu-depuis-l-axe`** *(modèle neuf, §8.2)* | « $\dfrac{2\pi}{3}$ est bien un angle du dessin, mais ce n'est pas celui-là : c'est la **direction** de $M'$, mesurée depuis l'axe réel. Or $M$ ne partait pas de l'axe réel — il partait de $\dfrac{\pi}{2}$. Il n'a donc pas parcouru $\dfrac{2\pi}{3}$, il a parcouru ce qui **reste** : $\dfrac{2\pi}{3} - \dfrac{\pi}{2} = \dfrac{\pi}{6}$. Change le point et regarde : la direction de $M'$ change à chaque fois, l'arc ne change jamais. » |
| `somme` | $\dfrac{7\pi}{6}$ — on additionne les deux directions, $\dfrac{2\pi}{3} + \dfrac{\pi}{2}$ | non | **`produit-quotient-argument-operation`** | « L'addition est la bonne opération, mais elle est déjà faite. Le chapitre 3 dit $\arg(z') = \arg(c) + \arg(z)$ : c'est $\arg(z')$ qui **est** la somme — $\dfrac{\pi}{6} + \dfrac{\pi}{2} = \dfrac{2\pi}{3}$, tu peux le vérifier sur l'écran. Pour retrouver $\arg(c)$ à partir des deux autres, il faut donc **soustraire**, pas additionner encore. » |
| `horaire` | $-\dfrac{\pi}{6}$ — le même angle, mais dans le sens **horaire** | non | **`rotation-sens-inverse`** | « La grandeur est juste, le sens ne l'est pas — et le signe est ce que les correcteurs lisent en premier. Regarde l'arc : il va de $OM$ **vers** $OM'$, c'est-à-dire de $\dfrac{\pi}{2}$ vers $\dfrac{2\pi}{3}$, donc dans le sens qui **augmente** l'angle : le sens direct, positif. Un $-\dfrac{\pi}{6}$ enverrait $M$ vers $\dfrac{\pi}{3}$, de l'autre côté. » |

- **`suite` (52 mots) :** « Promène le point sur les cinq positions, coefficient inchangé.
  $\arg(z')$ vaut tour à tour $\dfrac{5\pi}{12}$, $\dfrac{2\pi}{3}$, $\dfrac{\pi}{6}$,
  $\dfrac{\pi}{6}$, $\dfrac{11\pi}{12}$ — **et l'écart ne bouge jamais de $\dfrac{\pi}{6}$.**
  Regarde surtout les deux points de l'axe réel : là, et là seulement, les deux lectures
  **se confondent**. C'est un accident de ces deux points-là. »
  *Vérifié sur la table C du §5.3 ✓. **Cette phrase est la charnière de toute la scène** : elle
  désamorce par avance l'exemple travaillé que l'élève lira trois paragraphes plus bas
  (`lesson.md:299`, $z=3$, $\arg z = 0$).*
- **Et un second balayage, à écrire dans la même `suite` :** « Puis garde le point et promène
  le **coefficient** : $c = 2$ et $c = 2i$ ont le même module — la distance finale est la
  même, l'arc non. $c = i$ et $c = 2i$ ont le même argument — l'arc est le même, la distance
  non. » *Vérifié : $|2| = |2i| = 2$ ✓ ; $\arg(i) = \arg(2i) = \dfrac{\pi}{2}$ ✓ (§5.2 A).*
- **⟂-avant-pari :** l'**arc** et son étiquette ; les lectures `argument-c`, `angle` et
  `argument-image` ; le verdict ; tout pixel d'accent ajouté par rapport à l'état d'énoncé.
  *$M'$ et son affixe **sont ici l'ÉNONCÉ** — la consigne les donne — donc ils sont à
  l'ENCRE dès avant le pari, comme les forces du manège. **C'est la seule étape dans ce cas**,
  et la table générique du §7.6 porte l'exception.*

### 7.4 S4 — `le-point-qui-ne-bouge-pas` · « Et si on tournait ailleurs qu'autour de $O$ ? »

- **État :** `c: "i"`, `z: "4"`, **`centre: "A"`**, `enonce: "coefficient"`,
  `reference: "depart"`.
- **`etat_revele` :** aucun réglage ; **la révélation pose la marque de POINT FIXE** sur $A$
  et ouvre la lecture `point-fixe`. *C'est la scène qui répond, avant le texte.*
- **Contrôle ouvert :** `centre` (**neuf**). *`point` est **rouvert** (la `suite` en a besoin
  pour faire chercher le point fixe) ; `coefficient` est **absent** — $c$ verrouillé sur la
  rotation d'angle $\dfrac{\pi}{2}$.* **Lectures :** `module-c`, `argument-c`, `distances`,
  `rapport`, `angle`, **`point-fixe`**, **`ecriture`** *(forme factorisée seule)*.
- **Consigne (voix) :** « Jusqu'ici, tout tournait autour de $O$. On change une seule chose :
  le **centre**. Voici $A$, au point $(2;0)$. On applique **une rotation d'angle
  $\dfrac{\pi}{2}$, de centre $A$** — pas de centre $O$. Le point $M$ est en $4$, sur l'axe
  réel, donc à la distance $2$ de $A$. »
- **Pari :** « $M$ arrive… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `autour-de-A` | en $2+2i$ — un quart de tour **autour de $A$**, à distance $2$ de $A$ | **oui** | — | « Oui, et regarde ce que la scène vient d'ajouter : un anneau sur $A$. **$A$ est le seul point du plan qui ne bouge pas.** C'est ça, un centre — pas un décor, pas une origine : le **point fixe**. Le calcul s'écrit $z' - z_A = e^{i\pi/2}(z - z_A)$, c'est-à-dire $z' - 2 = i\,(4-2) = 2i$, donc $z' = 2 + 2i$. Les $z - z_A$ des deux côtés sont exactement ce qui fixe $A$. » |
| `autour-de-O` | en $4i$ — un quart de tour, donc $z' = i\,z = 4i$ | non | **`transformation-centre-oublie`** | « $4i$ est l'image par la rotation de centre **$O$** : tu as bien tourné d'un quart de tour, mais autour du mauvais point. Bascule le centre sur $O$ et tu obtiendras exactement $4i$ — puis reviens sur $A$ : $2+2i$. Le coefficient donne l'**angle** ; il ne dit rien du **centre**, qui doit être écrit à part : $z' - z_A = c\,(z - z_A)$. » |
| `oubli-constante` | en $2i$ — on calcule $i\,(z - z_A) = i\,(4-2) = 2i$ | non | **`ecriture-complexe-oubli-constante`** | « Le geste est bon jusqu'à l'avant-dernière ligne : $i(z - z_A)$ vaut bien $2i$. Mais ce $2i$ n'est pas $z'$ — c'est $z' - z_A$, le **vecteur** $\overrightarrow{AM'}$, pas l'affixe du point. Il reste à **repartir de $A$** : $z' = z_A + 2i = 2 + 2i$. Vérifie sur le plan : depuis $A(2;0)$, monter de $2$ mène en $(2;2)$, pas en $(0;2)$. » |
| `angle-coefficient` | en $2 + \pi$ sur l'axe réel — on multiplie par l'angle : $z' = 2 + \dfrac{\pi}{2}(4-2)$ | non | **`rotation-angle-comme-coefficient`** | « Ce point ne quitte pas l'axe réel : une rotation d'un quart de tour qui laisse le point sur sa droite, c'est déjà une contradiction. L'angle $\dfrac{\pi}{2}$ n'est pas le coefficient — le coefficient est $e^{i\pi/2} = i$, de module $1$, et c'est son **argument** qui vaut $\dfrac{\pi}{2}$. Multiplier par $\dfrac{\pi}{2}$ (environ $1{,}57$) ne fait qu'agrandir un peu. » |

- **`suite` (44 mots) :** « Cherche le point qui ne bouge pas. Promène $M$ sur les cinq
  positions : à chaque fois, $AM' = AM$ et l'arc vaut $\dfrac{\pi}{2}$ — **sauf en une
  position**. Trouve-la. Puis bascule le centre sur $O$ : le point fixe change de place, la
  rotation non. »
  *Vérifié sur la table D du §5.3 : $AM' = AM$ aux cinq points ✓ ; la position exceptionnelle
  est $z = 2$, où $M = A$ et où $AM = AM' = 0$ ✓ ; le rapport y affiche « — » (§5.6).*
- **⟂-avant-pari :** $M'$, son affixe, son segment ; **l'anneau de point fixe** ; l'arc ; les
  lectures `angle`, `point-fixe`, `ecriture` ; le verdict ; tout pixel d'accent. *$A$, son nom
  et son affixe **sont l'ÉNONCÉ** (la consigne les donne) : ils restent à l'ENCRE. **Ce qui
  attend la révélation, c'est l'anneau** — la marque qui dit « il ne bouge pas », qui est la
  réponse.*

### 7.5 S5 — `lire-a-l-envers` · « On te donne la formule : retrouve la transformation »

- **État :** **`enonce: "les-deux"`** ($z' = (1+i)z + 1 - i$), `z: "4"`, `reference: "aucune"`.
  *En mode `enonce` ≠ `coefficient`, les clés `c` et `centre` sont **calculées** et leurs
  contrôles sont **absents** (§5.2 D).*
- **`etat_revele` :** aucun réglage ; la révélation **pose $\Omega$ sur le plan** (il n'existe
  pas avant, §6.2) et ouvre `point-fixe`, `rapport-inverse` et la forme **factorisée** de
  `ecriture`.
- **Contrôle ouvert :** `enonce` (**neuf**). *`point` rouvert ; `coefficient` et `centre`
  rouverts **seulement** au cran `enonce: "coefficient"`.* **Lectures : les neuf.**
- **Consigne (voix) :** « Dernière question, et c'est celle que les sujets d'examen posent. On
  ne te donne plus un coefficient et un centre : on te donne **une formule**, et une seule —
  $z' = (1+i)\,z + 1 - i$. À tout point $M$ d'affixe $z$, elle associe le point $M'$ d'affixe
  $z'$. Le point $M$ est en $4$ ; son image est en $5 + 3i$, la scène la montre. »
- **Pari :** « Cette transformation est… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `omega-racine2-pi4` | une rotation d'angle $\dfrac{\pi}{4}$ **et** une homothétie de rapport $\sqrt2$, **de centre le point d'affixe $1+i$** | **oui** | — | « Oui. Les deux premiers nombres se lisent sur $a = 1+i$ : $\vert a\vert = \sqrt2$ est le **rapport**, $\arg(a) = \dfrac{\pi}{4}$ est l'**angle**. Le troisième ne se lit pas, il se **cherche** : le centre est le point qui ne bouge pas, donc celui qui vérifie $\omega = a\omega + b$. On résout, et $\omega = \dfrac{b}{1-a} = \dfrac{1-i}{-i} = 1+i$. Mets $M$ en $1+i$ : il ne bougera pas. » |
| `centre-O` | une rotation d'angle $\dfrac{\pi}{4}$ et une homothétie de rapport $\sqrt2$, **de centre $O$** | non | **`transformation-centre-oublie`** | « Teste-le sur le plan : si le centre était $O$, alors $O$ ne bougerait pas. Or l'image de $z = 0$ par cette formule vaut $b = 1-i$ — $O$ bouge. Le $+\,b$ est précisément ce qui déplace le centre hors de l'origine ; sans lui, on aurait $z' = az$, et là seulement le centre serait $O$. » |
| `rapport-complexe` | une rotation d'angle $\dfrac{\pi}{4}$ et une homothétie **de rapport $1+i$**, de centre le point d'affixe $1+i$ | non | **`homothetie-rapport-complexe`** | « Le centre est juste, le rapport ne l'est pas : un rapport d'homothétie est toujours un **réel**. $1+i$ est le coefficient **entier** — il code les deux effets à la fois, et c'est bien pour ça qu'on doit le **séparer** : son module $\sqrt2$ pour l'agrandissement, son argument $\dfrac{\pi}{4}$ pour la rotation. Lis les distances sur l'écran : $\Omega M = \sqrt{10}$, $\Omega M' = 2\sqrt5$, leur quotient est $\sqrt2$. » |
| `roles-intervertis` | une rotation d'angle $\sqrt2$ et une homothétie de rapport $\dfrac{\pi}{4}$, **de centre $O$** | non | **`similitude-module-argument-roles`** | « Les deux rôles sont échangés, et le centre avec. Un test d'ordre de grandeur suffit : un rapport de $\dfrac{\pi}{4} \approx 0{,}79$ **rapprocherait** $M'$ du centre, et l'écran montre le contraire. Le **module** est une longueur, donc un rapport ; l'**argument** est un angle, donc l'angle. Ils ne sont pas interchangeables. » |

- **`suite` (58 mots) :** « Trois formules, le même geste. Sur $z' = 2z - 2$ : $a = 2$, réel
  positif — **aucune** rotation, et $\omega = \dfrac{-2}{1-2} = 2$. Sur $z' = iz + 2 - 2i$ :
  $\vert a\vert = 1$ — **aucun** agrandissement, et $\omega = 2$. **Cette dernière, c'est la
  transformation de l'étape précédente, écrite autrement** : son centre est le $A$ que tu
  avais posé. »
  *Vérifié au §5.2 D ✓.*
- **Et un second balayage :** « Sur chacune des trois, promène $M$ et lis
  $\dfrac{z'-\omega}{z-\omega}$ : c'est **toujours $a$**, à tous les points. C'est la
  définition du centre, retournée. »
  *Vérifié sur la table E du §5.3 : $1+i$ aux quatre points non fixes ✓.*
- **⟂-avant-pari :** **$\Omega$ n'existe pas** — ni point, ni nom, ni affixe, ni anneau, ni
  dans la description lue ; la forme factorisée de `ecriture` ; `point-fixe` ;
  `rapport-inverse` ; `module-c` et `argument-c` *(ils donneraient $\sqrt2$ et
  $\dfrac{\pi}{4}$, soit deux des trois réponses)* ; le verdict ; tout pixel d'accent.
  *$M$ et $M'$ **sont l'ÉNONCÉ** ici (la consigne donne les deux) : ils sont à l'encre.
  **`avant-pari` mesure à S5 une absence TOTALE de $\Omega$**, pas une absence d'accent —
  règle 2 du tremplin.*

### 7.6 Le contrat « avant le pari », et les cinq formes de la fuite

**Règle générale, valable aux cinq étapes.** Ce qui dépend de l'ISSUE — $M'$, son segment,
l'arc, l'anneau de point fixe, $\Omega$, et toute lecture que la consigne n'a pas énoncée —
**n'existe pas dans le DOM avant l'engagement**, ni dans le rendu, ni dans la phrase lue au
lecteur d'écran. Ce qui reste, c'est l'énoncé.

**Deux exceptions, déclarées, et chacune motivée** (corollaire du manège : *une donnée de
l'énoncé ne se peint jamais dans la couleur de la réponse — sinon la règle « aucun pixel
d'accent avant le pari » devient impossible à tenir honnêtement*) :

| étape | ce qui est visible AVANT le pari, en plus | pourquoi | ce que ça coûte |
|---|---|---|---|
| **S3** | $M'$, son affixe, son segment, **à l'ENCRE** | la consigne **donne** $\arg(z') = \dfrac{2\pi}{3}$ ; le pari ne porte pas sur où va $M$, mais sur **quel angle on mesure** | rien : l'arc, `angle`, `argument-c` et `argument-image` restent absents |
| **S5** | $M'$, son affixe, son segment, **à l'ENCRE** | la consigne **donne** $z' = 5+3i$ ; le pari porte sur la **nature** de la transformation | rien : $\Omega$, l'anneau, `point-fixe`, `rapport-inverse`, `module-c`, `argument-c` et l'écriture factorisée restent absents |

#### A — la fuite par les RÉGLAGES

*La porte **réécrit elle-même** cette table contre le descripteur (§11.2,
`fuite-inter-etapes`) : elle énumère, avant chaque étape, tous les états ATTEIGNABLES (l'état
posé, sa révélation, puis chaque contrôle ouvert sur tous ses crans) et vérifie qu'aucun ne
produit la réponse d'un pari ultérieur.*

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `coefficient` seul (7) | les 7 coefficients, **sur le seul point $1+i$**, centre $O$ | **non** pour S2 : `point` est fermé — l'état de S2 ($z = -2+2i$) est **hors d'atteinte** — et **`distances` et `rapport` n'existent dans le DOM à aucune étape antérieure à S2**. **non** pour S3 : `angle`, `argument-c`, `argument-image` absents, **aucun arc tracé**. **non** pour S4/S5 : `centre` et `enonce` fermés. |
| **S2** | `point` seul (5) | les 5 points, **au seul coefficient $2i$**, centre $O$ | **non** pour S3 : le coefficient $\sqrt3+i$ est hors d'atteinte, et les trois lectures d'angle n'existent pas. **non** pour S4/S5 : contrôles et lectures absents. |
| **S3** | aucun neuf ; `coefficient` et `point` **rouverts** | les 35 couples, centre $O$ | **non** pour S4 : `centre` est fermé — **tout est centré en $O$**, et `point-fixe` et `ecriture` n'existent pas. **non** pour S5 : `enonce` fermé, `rapport-inverse` absent. |
| **S4** | `centre` (neuf) + `point` (rouvert) | 2 centres × 5 points, **au seul coefficient $i$** | **non** pour S5 : `enonce` est fermé, donc **aucune transformation de la forme $z'=az+b$ n'existe** ; `rapport-inverse` absent ; et la forme **développée** de `ecriture` n'est écrite nulle part. |
| **S5** | les quatre | tout | — |

**L'héritage est DÉCLARÉ**, comme au banc d'électrolyse : `point` est rouvert à S3, S4 et S5 ;
`coefficient` à S3 et S5. *Sans lui, aucune `suite` ne pourrait faire constater un
invariant — et l'invariant est ce que la scène enseigne.* **La non-fuite est tenue par les
LECTURES**, et la table ci-dessus dit laquelle à chaque ligne.

#### B — la fuite par les RETOURS (chaque `retour` relu contre le pari SUIVANT)

*Cinquième forme de la fuite (ADR 0036), trouvée au banc d'électrolyse : **le retour d'une
étape qui annonce la suivante**. Elle ne se voit qu'en relisant les textes les uns contre les
autres.*

| les retours de… | ce qu'ils disent | menacent-ils le pari suivant ? |
|---|---|---|
| **S1** | « deux effets séparés », $\arg(2) = 0$, « essaie $c=-2$ », « $OM$ passe de $\sqrt2$ à $2\sqrt2$ » | ⚠️ **une quasi-fuite, tranchée.** Le retour juste écrit « *$OM$ passe de $\sqrt2$ à $2\sqrt2$* » — c'est un rapport de $2$, donc le fait de S2. **Phrase conservée**, parce qu'elle est la **conséquence directe du pari de S1** (« deux fois plus loin » est le choix même) et qu'elle ne nomme ni « rapport », ni « quotient », ni $|c|$ ; **règle posée : aucun retour de S1 n'écrit le mot « rapport » ni une division.** *§11.2, `formule-graduee`, S1.* |
| **S2** | $\dfrac{OM'}{OM} = \vert c\vert$, « rien sur la direction », « ce qui s'additionne, ce sont les arguments » | ⚠️ **une fuite trouvée et supprimée.** Le retour de `somme` annonçait « *tu le verras à l'étape suivante* » et nommait les arguments comme la grandeur qui s'additionne — il donnait l'objet de S3 **et** son opération. **Membre de phrase retiré** ; le retour s'arrête à « *le chapitre 3 a établi le contraire : $\vert zz'\vert = \vert z\vert\vert z'\vert$* ». **Règle : aucun retour de S2 ne nomme un ANGLE.** |
| **S3** | l'écart, $\arg(z')-\arg(z) = \arg(c)$, le sens direct, l'accident de l'axe réel | **non** : aucun ne nomme un centre, un point fixe ni une écriture. *Vérifié mot à mot : les quatre retours ne contiennent ni « centre », ni « fixe », ni « $z_A$ ».* |
| **S4** | le point fixe, $z'-z_A = c(z-z_A)$, « le coefficient ne dit rien du centre » | **non** : aucun n'écrit $z' = az+b$ ni $\omega = \dfrac{b}{1-a}$, et aucun ne dit qu'on peut **retrouver** un centre à partir d'une formule. *C'est même le contraire : S4 **donne** le centre, S5 le fait **chercher**.* |
| **S5** | tout | — |

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*La frontière se pose **par étape**, consigne **et** retours **et** lectures — pas « après la
révélation de… ». Une consigne a le droit d'imprimer ce que son propre énoncé exige.*

| pendant l'étape… | **autorisé** (consigne + retours + lectures) | **interdit** |
|---|---|---|
| **S1** | `rotation`, `homothétie`, `agrandir`, `tourner`, `module`, `\vert c\vert`, `argument` *(seulement dans « $\arg(2)=0$ », en position de justification)*, `demi-tour`, `quart de tour` | `rapport`, `quotient`, `\dfrac{OM'}{OM}`, `÷`, `/` *(entre deux longueurs)*, `angle de la transformation`, `écart`, `\arg(z')`, `centre`, `point fixe`, `z' - z_A`, `z' = az`, `\omega` |
| **S2** | + `rapport`, `quotient`, `\dfrac{OM'}{OM}`, `\vert zz'\vert = \vert z\vert\vert z'\vert`, `distance`, `longueur` | `angle`, `\arg(c)`, `\arg(z')`, `écart`, `\pi/`, `e^{i`, `direct`, `horaire`, `centre`, `point fixe`, `\omega`, `az + b` |
| **S3** | + `angle`, `écart`, `\arg(c)`, `\arg(z)`, `\arg(z')`, `\pi/6`, `e^{i\theta}`, `sens direct`, `arc` | `centre`, `point fixe`, `invariant`, `ne bouge pas`, `z' - z_A`, `z_\Omega`, `\omega`, `az + b`, `b/(1-a)` |
| **S4** | + `centre`, `point fixe`, `ne bouge pas`, `z' - z_A = c\,(z - z_A)` **(factorisée seule)** | `z' = az + b`, `az+b`, `\omega =`, `\dfrac{b}{1-a}`, `développ`, `\dfrac{z'-\omega}{z-\omega}` |
| **S5** | tout | — |

**À toutes les étapes, sans exception : les chaînes du §9** (la frontière de rang et les
frontières de programme). *La porte cherche ces formes-là dans le `textContent` **rendu**, en
remplaçant chaque `.katex` par son **annotation TeX** — leçon du banc d'électrolyse — et en
début de mot, en Unicode (leçon des noyaux : `\b` ignore les accents).*

#### D — la fuite par la DONNÉE, et la fuite par la RELATION

- **Par la DONNÉE** (règle de la corde) : **aucune**. Les cinq points et les sept coefficients
  sont sans symétrie cachée qui donnerait une réponse ultérieure. *Le seul candidat serait un
  $c$ de module $1$ **et** d'argument $0$ — c'est-à-dire $c = 1$ — qui rendrait le point fixe
  trivial partout ; **il n'est pas dans les crans** (§5.2 A).*
- **Par la RELATION** (règle du banc de diffraction) : c'est exactement la table C ci-dessus.
  $z' - \omega = c\,(z-\omega)$ a **quatre** facteurs de sens — le rapport, l'angle, le centre,
  la forme développée — et **chaque étape n'écrit que ceux qu'elle a fait varier**.

**Une fuite molle, écrite franchement.** Un élève qui a fait S2 arrive à S3 en sachant que
$c$ porte deux nombres ; un élève qui a fait S4 arrive à S5 en sachant qu'un centre est un
point fixe. **Ce n'est pas une fuite au sens de la règle** : la règle interdit d'**atteindre
l'état** qu'un pari fait deviner, pas de comprendre la mathématique qui y mène. **S3, S4 et S5
doivent être gagnables par le raisonnement** — c'est même le but.

---

## 8. Misconceptions

Les **23** modèles déclarés de la notion vivent dans `items.yaml:11-232` sous le préfixe
`mc.math.maths_complexes_trigo.`. Les comptes sont **au niveau ITEM**, méthode
`coverage_summary` déclarée en fin de fichier (`items.yaml:2294-2325`) : **34 items**.
*`REVIEW:156-159` (D1) prévient que, faute de `spec.md`, ces 23 lignes sont **formellement
non revendiquées** — ledger reconstruit par le critique : **5 PASS, 6 WEAK, 12
non-revendiquées-en-prose**. **Cette spec n'est pas le `spec.md` de la notion** ; elle
revendique **neuf** de ces modèles pour un rung, et laisse les quatorze autres non
revendiqués. §13.7.*

### 8.1 Ce que la scène vise, sur l'inventaire déjà déclaré

| modèle existant | compte actuel | où la scène le casse | **sur quelle conséquence il casse** |
|---|---|---|---|
| `mult-par-i-non-rotation` | 3 | **S1**, choix `quart-de-tour` | le plan affiche $2+2i$ : le quart de tour n'était pas une propriété de « multiplier », mais de $i$ — et la `suite` de S1 fait trouver les **deux** crans qui ne tournent pas |
| `reel-positif-donne-rotation` | 3 | **S1**, choix `demi-tour` | le demi-tour existe, et il appartient à $c = -2$ : la `suite` le fait **produire** exprès |
| `similitude-module-argument-roles` | 3 | **S1** (`angle-deux`), **S2** (`argument-rapport`), **S5** (`roles-intervertis`) | un ordre de grandeur suffit : $\dfrac{\pi}{4} < 1$ rapprocherait $M'$, et l'écran montre le contraire |
| `homothetie-rapport-complexe` | 4 | **S2** (`rapport-complexe`), **S5** (`rapport-complexe`) | $2\sqrt2 \times 2i$ n'est pas une distance ; l'écran affiche $4\sqrt2$, un réel |
| `produit-modules-additionnes` | 3 | **S2**, choix `somme` | $2+2\sqrt2 \neq 4\sqrt2$, et la `suite` fait refaire le quotient aux cinq points |
| `produit-quotient-argument-operation` | 3 | **S3**, choix `somme` | l'addition **est déjà faite** : $\dfrac{\pi}{6}+\dfrac{\pi}{2} = \dfrac{2\pi}{3}$ est à l'écran |
| `rotation-sens-inverse` | 3 | **S3**, choix `horaire` | l'arc **tracé** va de $\dfrac{\pi}{2}$ vers $\dfrac{2\pi}{3}$ : il augmente |
| `transformation-centre-oublie` | 3 | **S4** (`autour-de-O`), **S5** (`centre-O`) | bascule le centre sur $O$ et **obtiens** $4i$ ; à S5, l'image de $0$ vaut $1-i$ — $O$ bouge |
| `ecriture-complexe-oubli-constante` | 3 | **S4**, choix `oubli-constante` | $2i$ est le **vecteur** $\overrightarrow{AM'}$, pas l'affixe : depuis $A(2;0)$, monter de $2$ mène en $(2;2)$ |
| `rotation-angle-comme-coefficient` | 4 | **S4**, choix `angle-coefficient` | une rotation d'un quart de tour qui laisse le point sur l'axe réel est une contradiction visible |

**Dix modèles servis, et aucun n'est servi deux fois pour la même raison.** *Les treize autres
modèles de l'inventaire (argument/quadrant, module, conjugué, exponentielle, Moivre,
périodicité, racines, lecture de $w$, lieux) ne sont **pas** visés : ils appartiennent à R1,
R3, R4, R6 et R7. **La scène ne les touche pas, et c'est déclaré.***

### 8.2 Le modèle neuf : `angle-lu-depuis-l-axe` — la mesure qui le rend nécessaire

**Aucun des 23 modèles ne nomme l'erreur que S3 attrape.** Les deux plus proches sont
`similitude-module-argument-roles` (les rôles de $|c|$ et $\arg(c)$ **intervertis**) et
`produit-quotient-argument-operation` (la mauvaise **opération** sur les arguments). Ici, la
bonne grandeur et la bonne opération sont en place : ce qui manque, c'est le **point de
départ de la mesure**. L'élève lit une **direction** là où la question demande un **écart**.

**Et la notion fabrique cette erreur elle-même**, sur les deux seuls objets qui enseignent
la transformation :
- l'exemple travaillé de R5 (`lesson.md:299-309`) prend $z = 3$, donc $\arg(z) = 0$ :
  $\arg(z')$ **est** $\arg(c)$, et la distinction n'existe pas ;
- la figure `rotation-homothetie` dessine exactement ce cas, et sa légende d'étape 2 écrit
  « *$M$ tourne autour de $O$ d'un angle $\pi/4$, jusqu'au point intermédiaire d'affixe
  $3e^{i\pi/4}$* » — où l'angle du mouvement et l'argument du point affiché **portent le même
  nombre**.

**Déclaration à ajouter à `items.yaml` (bloc `misconceptions:`) :**

```yaml
  - id: mc.math.maths_complexes_trigo.angle-lu-depuis-l-axe
    label: >-
      « Angle d'une transformation lu comme une DIRECTION (depuis l'axe réel)
      au lieu de l'ÉCART entre deux directions »
    description: >-
      Devant M et son image M′, l'élève donne arg(z′) — la direction de
      l'image mesurée depuis l'axe réel — comme angle de la rotation ; ou
      donne arg(z′ − z), la direction du déplacement. Forme jumelle sur les
      longueurs : il donne OM′ pour le rapport de l'homothétie, au lieu du
      quotient OM′/OM. Dans les deux cas la grandeur et l'opération sont les
      bonnes ; c'est le point de départ de la mesure qui est faux.
    contradicts_principle: >-
      L'angle d'une rotation (ou d'une rotation-homothétie) de centre Ω est
      l'ÉCART arg(z′ − z_Ω) − arg(z − z_Ω) = arg((z′ − z_Ω)/(z − z_Ω)) =
      arg(c), et son rapport est le QUOTIENT ΩM′/ΩM = |c|. arg(z′) ne donne
      l'angle que si arg(z − z_Ω) = 0, et OM′ ne donne le rapport que si
      ΩM = 1 : deux cas particuliers, pas la règle.
```

**Pourquoi UN modèle et non deux.** La forme « longueur » (prendre $OM'$ pour le rapport) et
la forme « angle » (prendre $\arg(z')$ pour l'angle) ont **le même mécanisme** — lire une
valeur absolue là où il faut une valeur relative — et se corrigent par **le même geste** :
ramener la mesure au centre. *Le banc d'électrolyse a scindé un modèle en deux à la vague 1
parce que ses deux formes **contredisaient deux principes différents** ; ici elles
contredisent le même. **Si la vague 1 juge le contraire, le scindement est propre** : forme A
= angles (items -35, -37), forme B = longueurs (item -36). §13.8.*

### 8.3 Les quatre items que ce modèle exige (specs pour item-author)

**Plancher : ≥ 3 items par modèle neuf.** Trois items portent `angle-lu-depuis-l-axe` en
`primary_misconception` ; un quatrième solde le savoir-faire de cadre à 0/34 (§0.1 f).
*Chaque distracteur porte un `misconception:` nommé, comme le reste du fichier.*

**NBCOMPLEX2-35 — R5, application directe.** *(`primary_misconception:
angle-lu-depuis-l-axe`)*
> Dans le plan complexe, $M$ a pour affixe $z = 2i$ et son image $M'$ par une **rotation de
> centre $O$** a pour affixe $z' = -1 + \sqrt3\,i$. Quel est l'angle de cette rotation ?

| | texte | misconception |
|---|---|---|
| **A** | $\dfrac{\pi}{6}$ | **juste** |
| B | $\dfrac{2\pi}{3}$ | `angle-lu-depuis-l-axe` |
| C | $\dfrac{7\pi}{6}$ | `produit-quotient-argument-operation` |
| D | $-\dfrac{\pi}{6}$ | `rotation-sens-inverse` |

*Vérifications : $|2i| = 2$ et $|-1+\sqrt3 i| = \sqrt{1+3} = 2$ — **c'est bien une rotation**
(les modules sont égaux) ✓ ; $\arg(2i) = \dfrac{\pi}{2}$ ; $-1+\sqrt3 i$ est au deuxième
quadrant, $\cos = -\dfrac12$, $\sin = \dfrac{\sqrt3}{2}$ ⟹ $\arg = \dfrac{2\pi}{3}$ ✓ ;
écart $= \dfrac{2\pi}{3}-\dfrac{\pi}{2} = \dfrac{\pi}{6}$ ✓ ; somme $= \dfrac{7\pi}{6}$ ✓.
**L'égalité des modules est délibérée** : un énoncé qui dit « rotation » sans que les modules
soient égaux serait faux, et le distracteur B ne serait plus diagnostique.*

**NBCOMPLEX2-36 — R5, application directe (la forme « longueur »).**
*(`primary_misconception: angle-lu-depuis-l-axe`)*
> $M$ a pour affixe $z = 1+i$ et son image $M'$ par une **homothétie de centre $O$** a pour
> affixe $z' = 3+3i$. Quel est le rapport de cette homothétie ?

| | texte | misconception |
|---|---|---|
| **A** | $3$ | **juste** |
| B | $3\sqrt2$ | `angle-lu-depuis-l-axe` *(forme longueur : $OM'$ pris pour le rapport)* |
| C | $2\sqrt2$ | `produit-modules-additionnes` *(la différence $OM' - OM$)* |
| D | $3+3i$ | `homothetie-rapport-complexe` |

*Vérifications : $OM = \sqrt2$, $OM' = \sqrt{9+9} = 3\sqrt2$ ✓ ; quotient $= 3$ ✓ ;
différence $= 3\sqrt2 - \sqrt2 = 2\sqrt2$ ✓.*

**NBCOMPLEX2-37 — R5, application non explicite (centre $\neq O$).**
*(`primary_misconception: angle-lu-depuis-l-axe`)*
> $A$, $M$ et $M'$ ont pour affixes $z_A = 2$, $z = 4$ et $z' = 2+2i$. $M'$ est l'image de
> $M$ par une **rotation de centre $A$**. Quel est l'angle de cette rotation ?

| | texte | misconception |
|---|---|---|
| **A** | $\dfrac{\pi}{2}$ | **juste** |
| B | $\dfrac{\pi}{4}$ | `angle-lu-depuis-l-axe` *(c'est $\arg(z')$)* |
| C | $\dfrac{3\pi}{4}$ | `angle-lu-depuis-l-axe` *(c'est $\arg(z'-z)$, la direction du déplacement)* |
| D | $-\dfrac{\pi}{2}$ | `rotation-sens-inverse` |

*Vérifications : $\dfrac{z'-z_A}{z-z_A} = \dfrac{2i}{2} = i$, d'argument $\dfrac{\pi}{2}$ ✓ ;
$\arg(2+2i) = \dfrac{\pi}{4}$ ✓ ; $z'-z = 2+2i-4 = -2+2i$, d'argument $\dfrac{3\pi}{4}$ ✓ ;
$|z-z_A| = |z'-z_A| = 2$ — **c'est bien une rotation** ✓.*
**Deux distracteurs sur le même modèle, et c'est voulu** : ce sont les **deux directions
fausses** que le dessin offre, et un élève qui les prend toutes deux pour plausibles n'a pas
un demi-modèle, il a le modèle entier.

**NBCOMPLEX2-38 — R5, application non explicite (caractériser $z' = az+b$).**
*(`primary_misconception: transformation-centre-oublie`)* — **c'est l'item qui solde le
savoir-faire de cadre à 0/34** (`maths-sm.yaml:229`, `maths-sexp.yaml:254`).
> La transformation du plan qui, à tout point $M$ d'affixe $z$, associe le point $M'$
> d'affixe $z' = i\,z + 2 - 2i$, est…

| | texte | misconception |
|---|---|---|
| **A** | la rotation de centre le point d'affixe $2$ et d'angle $\dfrac{\pi}{2}$ | **juste** |
| B | la rotation de centre $O$ et d'angle $\dfrac{\pi}{2}$ | `transformation-centre-oublie` |
| C | la rotation de centre le point d'affixe $2-2i$ et d'angle $\dfrac{\pi}{2}$ *(le $b$ pris pour le centre)* | `transformation-centre-oublie` |
| D | la rotation de centre le point d'affixe $2$ et d'angle $-\dfrac{\pi}{2}$ | `rotation-sens-inverse` |

*Vérifications : $\omega = \dfrac{b}{1-a} = \dfrac{2-2i}{1-i} = \dfrac{2(1-i)}{1-i} = 2$ ✓,
recoupé par la définition : $i\cdot 2 + 2-2i = 2$ ✓ ; $|a| = |i| = 1$ ⟹ **rotation pure**,
aucun agrandissement ✓ ; $\arg(i) = \dfrac{\pi}{2}$ ✓. **C'est exactement l'exemple travaillé
commandé au §4.4** — l'item le réutilise, comme la notion réutilise ses propres exemples.*
⚠️ **Note pour item-author : un cinquième item serait nécessaire si l'on voulait un
distracteur `similitude-module-argument-roles` ici ; il n'y en a pas, parce qu'avec
$|a| = 1$ intervertir les rôles donnerait « rotation d'angle $1$, homothétie de rapport
$\dfrac{\pi}{2}$ » — grammaticalement plausible mais visuellement absurde, et surtout déjà
servi trois fois par la scène. Déclaré, pas oublié.**

### 8.4 Le solde de couverture, honnête

| modèle | avant | après | marge au plancher (3) |
|---|---|---|---|
| **`angle-lu-depuis-l-axe`** *(neuf)* | — | **3** (-35, -36, -37) | **0 — déclarée** |
| `transformation-centre-oublie` | 3 | **5** (+ -38 primaire, + -38 distracteur C) — **compté 4 au niveau ITEM** | 1 |
| `rotation-sens-inverse` | 3 | **5** (+ -37 D, + -38 D) | 2 |
| `produit-quotient-argument-operation` | 3 | **4** (+ -35 C) | 1 |
| `produit-modules-additionnes` | 3 | **4** (+ -36 C) | 1 |
| `homothetie-rapport-complexe` | 4 | **5** (+ -36 D) | 2 |
| **`total_items`** | **34** | **38** | — |

**Aucun item n'est retiré.** *`items.yaml:2302-2324` porte **onze** modèles à exactement 3 ;
tout retrait casserait un plancher, et cette livraison n'en fait aucun.*

**Ce que ce paquet NE referme pas :**
- **`mult-par-i-non-rotation` reste à 3 items, tous en R0** : la scène le vise à S1 mais
  n'ajoute aucun item pour lui. **Reste dû.**
- **`reel-positif-donne-rotation` reste à 3.** Idem.
- **Aucun des quatre items neufs ne porte de champ `habilete`** : c'est
  `DECISIONS-EN-ATTENTE` §3 / `REVIEW:107` (S5), et cela se tranche pour les 62 notions à la
  fois. La conséquence est **déclarée** au §0.3 comme un non-verdict, pas maquillée.
- **Les quatre items neufs sont des QCM.** `REVIEW:201-204` (D13) dit que la lacune
  structurelle de cette notion est l'absence de rung en **réponse construite**. **Quatre QCM
  de plus ne la referment pas**, et je ne prétends pas le contraire.

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée absente que si
> l'on a énuméré ses FORMES*). Chaque ligne liste les **variantes d'écriture**, symbole et
> forme LaTeX comprises. La porte les cherche dans le texte **RENDU** — en remplaçant chaque
> `.katex` par son **annotation TeX** (leçon du banc d'électrolyse : le `textContent` d'une
> formule KaTeX concatène MathML, source et rendu) — **en début de mot et en Unicode** (leçon
> des noyaux : `\b` ignore les accents).
>
> **Et la frontière s'applique AUX TEXTES DE CETTE SPEC**, qui ne sont qu'une proposition de
> plus (leçon du banc de modulation, point 4). *Relu : le §7 n'écrit aucune forme du §9.*

1. **FRONTIÈRE DE RANG — rien de R6 ni de R7.** *Ne vient d'aucune `limite` du cadre : vient
   de ce que la scène précède le chapitre 6 et que le chapitre 7 n'est pas lu (§0.2).*
   Interdits : `w =`, `w=`, `\dfrac{z_C - z_A}{z_B - z_A}`, `z_C`, `z_B`, `nature du
   triangle`, `triangle`, `isocèle`, `équilatéral`, `rectangle en`, `aligné`, `alignement`,
   `colinéaire`, `cocyclique`, `birapport`, `ensemble des points`, `ensemble de points`,
   `lieu`, `médiatrice`, `cercle de diamètre`, `angle inscrit`, `Thalès`.
   *Le mot « **cercle** » seul est autorisé — la scène en dessine un, le cercle unité — mais
   `cercle de` suivi d'un nom de construction ne l'est pas. La porte cherche les syntagmes.*
2. **Le mot « similitude » et ses dérivés.** `maths-sexp.yaml:258` le réserve à SM ;
   `maths-sm.yaml:232` en exclut la forme indirecte ; la notion ne le définit nulle part et
   `items.yaml:2067` l'emploie sans le définir (`REVIEW:104`). Interdits dans le panneau :
   `similitude`, `similitudes`, `similaire` *(en position de transformation)*, `semblable`
   *(idem)*. **La scène dit : rotation, homothétie, rapport, angle, centre.** *§13.2.*
3. **Aucune similitude indirecte, aucun antidéplacement.** `maths-sm.yaml:232` :
   « *Pas de similitudes indirectes/antidéplacements approfondis (au-delà de z ↦ conjugué) ;
   pas de géométrie projective.* » Interdits : `indirecte`, `antidéplacement`,
   `\bar z \mapsto`, `z \mapsto \bar z`, `réflexion`, `symétrie glissée`, `symétrie axiale`,
   `retournement`, `projectif`, `projective`, `birapport`, `inversion`.
4. **Aucune composition de deux transformations nommées.** `maths-sexp.yaml:258` (« pas de
   compositions approfondies »). Interdits : `composée de deux`, `composition de`, `\circ`
   *(entre deux noms de transformations)*, `puis la rotation`, `suivie de`, `groupe des`,
   `conjuguée par`. *La phrase « **composée d'une rotation et d'une homothétie de même
   centre** » est **autorisée** : c'est la phrase de la leçon (`lesson.md:279`), et elle
   décrit **une** transformation, pas l'enchaînement de deux.*
5. **Aucune racine n-ième, aucune équation $z^n = a$.** Exclusion SExp explicite
   (`maths-sexp.yaml:257`), et sans objet en R5. Interdits : `racine n-ième`, `racine
   $n$-ième`, `racines de l'unité`, `z^n =`, `z^{n}`, `\rho e^{i\alpha}`, `2k\pi/n`,
   `k = 0,1`, `polygone régulier`.
6. **Aucune algèbre linéaire, aucune matrice.** *Le sous-domaine `structures_algebriques` est
   un AUTRE sous-domaine (`maths-sm.yaml:235`), et `espaces_vectoriels` y porte
   `lesson_slug: null` (`:258`) : il n'est enseigné nulle part.* Interdits : `matrice`,
   `\begin{pmatrix}`, `\begin{bmatrix}`, `déterminant`, `\det`, `application linéaire`,
   `endomorphisme`, `noyau`, `vecteur propre`, `base canonique`, `\mathbb{R}^2`.
7. **Aucune trigonométrie au-delà de la table de R1.** Interdits : `linéaris`, `Euler`,
   `e^{i\theta}+e^{-i\theta}`, `angle moitié`, `\cos^2`, `\cos^3`, `\sin^2`, `\sin^3`,
   `\tan`, `arctan`, `formule d'addition` *(la leçon l'emploie à `:123` ; la SCÈNE ne
   l'emploie pas)*. *§0.3 : la linéarisation est un savoir-faire à 0 %, et ce n'est pas le
   travail de cette scène.*
8. **Aucun décimal dans une lecture, aucun degré.** *C'est la frontière de PRÉCISION du §5.4,
   et elle est spécifique à cette scène.* La porte relève, **dans les lectures uniquement**,
   toute occurrence de `,` ou `.` entre deux chiffres, et toute occurrence de `°`, `degré`,
   `deg`. *Les **retours de pari** ont le droit d'écrire « environ $115°$ » et « environ
   $1{,}57$ » : ce sont des arguments d'ordre de grandeur adressés à un modèle faux, et ils
   sont **déclarés ici** pour que la porte les cherche au bon endroit — dans les lectures, pas
   dans le panneau entier.*
9. **Aucune équation du second degré dans $\mathbb{C}$.** C'est la leçon sœur
   (`bank.yaml:77-95`). Interdits : `discriminant`, `\Delta =`, `a z^2`, `az^2`,
   `second degré`, `Viète`, `somme et produit des racines`, `\delta^2`.
10. **Aucun repère nommé autrement, aucune coordonnée polaire nommée.** Interdits :
    `coordonnées polaires`, `repère polaire`, `\rho`, `(r, \theta)` *(en position de couple
    de coordonnées)*. *La scène dit « module » et « argument », les mots du programme.*
11. **Aucune 3D.** Canvas 2D, aucune caméra, aucune vue. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière (§11.3, `pas-de-3d`).
12. **Aucun nombre hors des trois grilles.** Les seuls **coefficients** affichés sont les sept
    du §5.2 A ; les seuls **points**, les cinq du §5.2 B ; les seules **transformations**, les
    trois du §5.2 D. *La porte relève l'ensemble exact des affixes et des arguments affichés
    et le compare aux tables du §5.3. Un nombre qui n'y est pas est soit un bug, soit une
    frontière franchie.*

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Un plan calculé est plus crédible qu'une figure dessinée, donc plus dangereux. Et celui-ci
affiche des **valeurs exactes** — l'affichage qui ressemble le plus à une preuve.

1. **La scène ne démontre rien : elle exhibe.** Elle montre la règle sur **70 états**
   ($7 \times 5$ en mode direct, $\times 2$ centres, plus $3 \times 5$ en mode `enonce`) —
   c'est un échantillon, pas une preuve. **La démonstration est la prose de R5, qui vient
   juste après** (`lesson.md:273-293`), et le paragraphe d'annonce du §4.1 doit le dire.
   *C'est le seul endroit du dépôt où cette réserve est structurelle : en physique, une scène
   qui vérifie une loi sur dix réglages est convaincante ; en mathématiques, dix cas ne
   prouvent rien, et un élève de SM le sait.*
2. **Les nombres sont exacts ; le DESSIN est arrondi au pixel.** Le point
   $(\sqrt3-1) + (\sqrt3+1)i$ est affiché exactement et **tracé** à $0{,}73$ et $2{,}73$
   unités, donc à $\pm\,0{,}5$ px. Les lectures affirment des valeurs exactes ; le dessin
   n'affirme qu'une position.
3. **L'échelle est isotrope et constante** (§5.1) : une longueur se compare à une longueur
   sur toute la scène, et le cercle unité est l'étalon. *C'est une propriété du rendu, pas une
   convention d'auteur, et elle est gardée par une porte.*
4. **L'arc de l'angle est dessiné à un rayon FIXE**, indépendant de $\Omega M$ : l'arc de
   $M(1+i)$ et celui de $M(4)$ ont la même taille à l'écran alors que les deux points sont à
   des distances très différentes du centre. **C'est une exagération, elle est constante, et
   elle est déclarée.** *Sans elle, l'arc d'un point proche du centre serait invisible.*
5. **La scène ne montre qu'UNE transformation à la fois**, jamais deux composées (§9.4). Un
   sujet d'examen en compose parfois ; la scène ne prépare pas ce geste-là.
6. **Le point $M$ ne se déplace pas librement.** Cinq positions, choisies pour que toute
   lecture soit exacte (§2.6). Un élève qui voudrait « voir ce qui se passe entre deux
   positions » ne le peut pas — c'est le prix de l'exactitude, et il est payé sciemment.
7. **La scène ne dit rien de la translation.** Le cas $a = 1$ (aucun point fixe) est **nommé
   par la prose commandée au §4.4, point 5**, et **n'est pas un cran de la scène** : un mode
   sans point fixe ferait afficher « — » à trois lectures sur neuf, et enseignerait un trou.
   *§13.9.*

---

## 11. La porte (`web/scripts/scene-plan-complexe.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du produit ;
elle trouve son panneau par `[data-scene="plan-complexe-transformation"]`, **jamais** par
`[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du champ magnétique,
run 747). Elle se lance **plusieurs fois, à plusieurs largeurs** ($1\,280$ px et 390 px au
minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**,
**AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas disponible
au banc, elle sort **MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES** (règle de la
corde : *une seconde voie analytique recalcule des NOMBRES ; une simulation n'établit que des
invariants*). Elle les recalcule **sans importer aucun module du produit** (ADR 0036), depuis
les seules constantes de cette spec.

> **Une particularité, et elle est neuve dans le dépôt : la porte compare des FORMES EXACTES,
> pas des flottants.** « $2\sqrt5$ » et « $4{,}47$ » sont le même nombre et **pas la même
> réponse** (§5.4). La porte fait donc **deux** mesures à chaque ligne : (a) l'**égalité de
> chaîne** sur la forme rendue, contre la table de cette spec ; (b) une **égalité numérique à
> $10^{-9}$** entre l'évaluation de la chaîne lue et le calcul flottant refait — *pour attraper
> le cas où la scène afficherait une belle forme exacte qui ne vaut pas le bon nombre.*

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $z' = c\,z$ aux **35** couples, centre $O$ | la table **A** du §5.3 | **égalité de chaîne** sur l'étiquette de $M'$, **plus** égalité numérique à $10^{-9}$ |
| N2 | $\vert c\vert$ aux 7 crans | $2$ · $\tfrac12$ · $1$ · $2$ · $\sqrt2$ · $2$ · $2$ | égalité de chaîne avec `module-c` |
| N3 | $\Omega M$, $\Omega M'$ et leur quotient aux 35 couples × 2 centres | tables **B** et **D** | égalité de chaîne avec `distances` et `rapport` ; **« — » quand $M = \Omega$** |
| N4 | $\arg(c)$ aux 7 crans | $0$ · $0$ · $\tfrac{\pi}{2}$ · $\pi$ · $\tfrac{\pi}{4}$ · $\tfrac{\pi}{2}$ · $\tfrac{\pi}{6}$ | égalité de chaîne, **fractions de $\pi$**, dans $]-\pi;\pi]$ |
| **N5** | **LA LIGNE DU MODÈLE NEUF** : `angle` et `argument-image` sont **deux lectures distinctes**, aux 35 couples — **égales exactement aux points $z \in \{2 ; 4\}$ (axe réel) et différentes aux trois autres** | table **C** du §5.3 | **égalité de chaîne dans les DEUX sens** ; *une scène où `angle` = `argument-image` partout, ou jamais, doit rougir* |
| N6 | l'**invariance de l'écart** : à $c$ fixé, `angle` est **identique au caractère près** aux 5 points ; à $\vert c\vert$ fixé, `rapport` est identique aux 5 points | $\tfrac{\pi}{6}$ ; $2$ | **égalité de chaîne exacte**, aux 7 coefficients |
| N7 | en mode `enonce` : $z'$, $\omega$, $\vert a\vert$, $\arg(a)$ et $\dfrac{z'-\omega}{z-\omega}$ aux **3 × 5** états — **$z'$ recalculé depuis $a$ ET $b$**, $\omega$ recalculé **deux fois** (par $\dfrac{b}{1-a}$ et par la résolution de $\omega = a\omega+b$) | table **E** du §5.3 et §5.2 D | égalité de chaîne ; **$\dfrac{z'-\omega}{z-\omega}$ identique au caractère près aux 4 points non fixes**, aux 3 transformations |
| N8 | le **point fixe** : `point-fixe` vaut $z_\Omega$, et l'image du point fixe est **le point fixe lui-même** | $2$ (S4, `rotation-A`, `homothetie-A`) · $1+i$ (`les-deux`) | égalité de chaîne, **et** $z' = z$ au caractère près |
| N9 | les **crans** : `coefficient` en a exactement 7, `point` 5, `centre` 2, `enonce` 4 ; **aucune valeur intermédiaire, aucune borne continue** | — | exact |
| N10 | **aucun décimal, aucun degré** dans les neuf lectures, aux 70 états | — | §9.8 ; *relevé sur les lectures seules, pas sur le panneau* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/unité est lu sur **les graduations entières des deux axes** (leçon de la porte du
champ magnétique). Lancée à $1\,280$ **et** 390 px au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`isotropie`** | le facteur px/unité mesuré sur l'axe des réels et sur l'axe des imaginaires est **identique à $\le 0{,}5\%$**, aux deux largeurs ; et le **cercle unité** mesure le même nombre de pixels horizontalement et verticalement à $\le 1$ px | un repère où `x_length/x_span ≠ y_length/y_span` doit rougir **seul** — *c'est le défaut RÉEL du 2026-08-14 dans cette notion (`SCENE-CONTRACT.md:186-203`, 36,9 % d'écart), et la porte existe pour qu'il ne revienne pas* |
| `point-a-sa-place` | $M$ et $M'$ sont dessinés **à la position que leur affixe demande**, à $\le 2$ px, aux 70 états | un $M'$ dessiné depuis un autre nombre que celui affiché doit rougir ; une position **plafonnée** au bord du cadre aussi |
| `longueurs-au-rapport` | le rapport des **longueurs en pixels** des segments $\Omega M'$ et $\Omega M$ égale la lecture `rapport`, à $\le 2\%$, aux 70 états | un segment dessiné à une autre échelle que l'autre doit rougir **seule** |
| **`arc-entre-les-bonnes-directions`** | l'arc tracé **part de la direction $\Omega M$ et arrive à la direction $\Omega M'$** — mesuré aux pixels, en lisant les deux extrémités de l'arc et en les comparant aux deux directions ; son **sens** suit le signe de `angle` | **un arc tracé depuis l'AXE RÉEL doit rougir** *(c'est la misconception `angle-lu-depuis-l-axe` posée dans le code, et c'est le sabotage le plus important de la campagne)* ; un arc tracé dans le sens inverse aussi |
| `point-fixe-immobile` | aux 5 points, l'image du point fixe est **au même pixel** que lui ($\le 1$ px) ; et **hors** du point fixe, $M'$ est à $\ge 8$ px de $M$ | un point fixe qui bouge doit rougir ; un $M'$ confondu avec $M$ ailleurs aussi — *les deux sens, comme le géostationnaire* |
| `une-seule-etiquette-au-point-fixe` | quand $M' = M$, **une seule** étiquette est dessinée, et elle porte « $M = M'$ » | deux étiquettes superposées doivent rougir **seules** |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**, leçon du solide de révolution) ; aucun arc ; aucun anneau ; aucune lecture-réponse dans le DOM. **À S5 : aucun $\Omega$ — ni point, ni étiquette, ni affixe, ni mention dans la description lue** (absence TOTALE, règle du tremplin). **À S3 et S5 : $M'$ EST présent, à l'ENCRE** (§7.6) | après l'engagement : $M'$, l'arc, l'anneau et les lectures apparaissent, et l'accent avec. **À S3 et S5, un $M'$ ABSENT avant le pari doit rougir aussi** — l'exception est mesurée dans les deux sens |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une couleur posée en dur doit rougir **seule** |
| `quadrillage-opaque` | les **nœuds** du quadrillage ont la même valeur que ses **lignes**, à $\le 2$ niveaux | un quadrillage peint en transparence trait par trait doit rougir *(règle du banc de modulation)* |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune des chaînes interdites de l'étape courante (consigne, retours, lectures et région vivante confondues), et contient bien celles que l'étape autorise et emploie | écrire « rapport » dans un retour de S1, ou « centre » dans un retour de S3, doit rougir **seule** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.6 contre le descripteur, et énumère les états ATTEIGNABLES avant chaque étape : `coefficient` ouvert à S1, S3, S5 ; `point` à S2, S3, S4, S5 ; `centre` **qu'à S4 et S5** ; `enonce` **qu'à S5** ; et `angle`/`argument-c`/`argument-image` **absents du DOM avant S3**, `point-fixe`/`ecriture` **avant S4**, `rapport-inverse` **avant S5** | ouvrir `centre` dès S3, ou faire exister `rapport-inverse` à S4, doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles, les
autres **absents du DOM** ; **S1, S2, S3, S4 et S5 n'ont aucun `etat_revele`, et c'est
déclaré**, §15.3) · `paris` (4 choix, exactement un juste, un `retour` par choix, rien dans la
région live avant l'engagement) · **`frontiere`** (aucune des chaînes du §9 dans le panneau
ouvert, **une sonde par forme**) · `eclairs` (**attendu structurellement vide**, mesuré quand
même, §6.1) · `sans-mouvement` · `katex` (aucun LaTeX brut visible ; $\sqrt{\phantom{x}}$,
$\dfrac{\pi}{6}$, $\overrightarrow{\Omega M}$, $\omega$, $\Omega$, $\arg$ rendus — **et
$\omega$ distinct de $\Omega$ à l'œil**, ADR 0030) · `etiquettes` (aucune étiquette n'en
chevauche une autre, **ni le DESSIN sous une étiquette sans fond**, n'est barrée par un trait,
ni ne sort du cadre — à $1\,280$ **et** à 390 px ; pièce commune `disposer`, **obligatoire**
ici ; **et le budget du §6.2 vérifié : ≤ 6 étiquettes simultanées, graduations tous les 2 sous
600 px**) · `ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs`, **sans** l'argument
`course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette commande**
(ADR 0034). Sabotages à outiller :

1. poser $z' = c + z$ au lieu de $c\,z$ → `nombres` (N1) et `point-a-sa-place` ;
2. poser $|z'| = |c| + |z|$ → **N3 seule**, et `longueurs-au-rapport` ;
3. **en mode `enonce`, calculer $z'$ depuis $a$ et $\omega$ en oubliant de repartir de
   $\omega$** (c'est-à-dire $z' = a(z-\omega)$, la misconception
   `ecriture-complexe-oubli-constante` posée dans le code — **et c'est le défaut que l'auteur
   de cette spec a lui-même commis**, §5.3 E) → **N7 et N8 seules** ;
4. poser $\omega = \dfrac{b}{1+a}$, ou $\omega = b$ → **N7 et N8 seules** ;
5. **tracer l'arc depuis l'AXE RÉEL au lieu de la direction $\Omega M$** (la misconception
   `angle-lu-depuis-l-axe` posée dans le code) → **`arc-entre-les-bonnes-directions` seule**,
   et **N5** si la lecture suit le tracé ;
6. **faire afficher à `angle` la valeur de `argument-image`** → **N5 seule** ;
7. **faire afficher à `angle` la même valeur partout, y compris sur l'axe réel** → **N5 seule
   dans l'autre sens** *(une porte qui n'exigerait que « les deux diffèrent » resterait
   verte)* ;
8. inverser le signe de `angle` → **N4 / N5** et `arc-entre-les-bonnes-directions` ;
9. arrondir une lecture à deux décimales ($1{,}41$ pour $\sqrt2$, $0{,}52$ pour
   $\dfrac{\pi}{6}$) → **N10 seule** ;
10. afficher un angle en degrés → **N10 seule** ;
11. afficher une forme exacte qui ne vaut pas le bon nombre ($\sqrt3$ au lieu de $\sqrt2$) →
    **le volet (b) de la double mesure du §11**, jamais le volet (a) ;
12. **rendre le repère anisotrope** (allonger `y_length` de 20 %) → **`isotropie` seule** ;
    *le cercle unité devient une ellipse, et rien d'autre ne rougit — c'est exactement le
    défaut du 2026-08-14* ;
13. dessiner $M'$ à une position plafonnée au bord du cadre → `point-a-sa-place` **seule** ;
14. faire bouger le point fixe d'un pixel → `point-fixe-immobile` **seule** ;
15. dessiner deux étiquettes superposées au point fixe →
    `une-seule-etiquette-au-point-fixe` **seule** ;
16. peindre le quadrillage en transparence trait par trait → `quadrillage-opaque` **seule** ;
17. afficher $M'$, ou l'arc, ou une lecture-réponse, **avant** le pari → `avant-pari` ;
18. **retirer $M'$ avant le pari de S3 ou de S5** → `avant-pari` **dans l'autre sens** *(les
    deux exceptions du §7.6 sont mesurées, sinon elles ne sont qu'une intention)* ;
19. **faire exister $\Omega$ avant la révélation de S5**, même en encre douce, même dans la
    seule description lue → `avant-pari` **seule** ;
20. ouvrir `centre` dès S3, ou faire exister `rapport-inverse` à S4 → `fuite-inter-etapes`
    **seule** ;
21. écrire « rapport » dans un retour de S1, « angle » dans un retour de S2, « centre » dans
    un retour de S3, ou « $z' = az+b$ » dans un retour de S4 → `formule-graduee` **seule**,
    **une mesure par étape** ;
22. ajouter un cran $c = 1$ → **N9 seule** ;
23. `import("three")` dans le module de la scène → `pas-de-3d` ;
24. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `w =`, `z_C`, `isocèle`,
    `équilatéral`, `aligné`, `cocyclique`, `médiatrice`, `cercle de diamètre`, `Thalès` ·
    `similitude`, `semblable` · `indirecte`, `antidéplacement`, `réflexion`, `projective`,
    `inversion` · `composée de deux`, `\circ`, `suivie de`, `groupe des` · `racine n-ième`,
    `racines de l'unité`, `z^n =`, `2k\pi/n` · `matrice`, `\begin{pmatrix}`, `déterminant`,
    `application linéaire` · `linéaris`, `Euler`, `angle moitié`, `\cos^3`, `\tan`,
    `arctan` · `discriminant`, `\Delta =`, `Viète` · `coordonnées polaires`, `\rho` ·
    `°`, `degré` · **un affixe hors des tables A et E du §5.3**.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est une
    **sonde manquante**, pas un produit propre.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui le
garde.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée, §13.12) :

```json
"plan-complexe-transformation": {
  "temps": false,
  "dimension": "2d",
  "controles": ["coefficient", "point", "centre", "enonce"],
  "etat": ["c", "z", "centre", "enonce", "reference"],
  "valeurs": {
    "c": ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"],
    "z": ["1+i", "2i", "2", "4", "-2+2i"],
    "centre": ["O", "A"],
    "enonce": ["coefficient", "rotation-A", "homothetie-A", "les-deux"],
    "reference": ["aucune", "depart"]
  },
  "lectures": [
    "module-c", "distances", "rapport", "argument-c", "angle",
    "argument-image", "point-fixe", "ecriture", "rapport-inverse"
  ]
}
```

> **Pas de clé `bornes`, et c'est une première.** Les treize scènes livrées en ont toutes une
> (sauf `banc-de-modulation` et `banc-electrolyse`, entièrement en crans). Ici **tout** est en
> crans, pour la raison du §5.4. *`validate-content` doit accepter une scène sans `bornes` —
> à vérifier avant construction (§15.4) ; si elle ne l'accepte pas, c'est le validateur qu'il
> faut corriger, pas la scène qu'il faut doter d'un curseur.*

**Descripteur** (`content/maths/nombres-complexes-2/media/plan-complexe-transformation.json`),
mêmes clés qu'au banc de diffraction : `slug`, `tool: "scene2d"`, `type: "manipulable"`,
`scene`, `title_fr`, `caption_fr`, `etapes[]` (`id`, `titre`, `consigne`, `pari{question,
choix[]}`, `suite`, `controles[]`, `lectures[]`, `etat{}`, **pas d'`etat_revele`**),
`boundary`, `boundary_guard_details`, `fit_caveat`, `param_manipulation_guide`,
`fallback_note`, `pedagogy_wiring{why_manipulable, predict_then_reveal, misconceptions[]}`,
`spec_ref`, `adr_ref`.

**`pedagogy_wiring.misconceptions` (dix ids)** — *`validate-content` exige qu'un pari de scène
nomme un modèle DÉCLARÉ (ADR 0041, addendum du manège) : **`angle-lu-depuis-l-axe` doit être
déclaré dans `items.yaml` AVANT que la scène soit validée**, sans quoi la porte de validation
échoue en dur.*

**`fallback_note` à écrire :** sans JavaScript et à l'impression, le panneau disparaît. **La
figure `rotation-homothetie`, plus bas dans le chapitre, couvre le cas $c = 1+i$, $z = 3$,
centre $O$** — c'est-à-dire **exactement le cas qui ne distingue pas l'angle de l'argument de
l'image** (§0.1 d). *L'élève sans JavaScript perd donc les trois faits centraux : le rapport
comme quotient, l'angle comme écart, et le centre comme point fixe. **Le coût est réel et il
est écrit** ; §13.10 dit ce qu'il faudrait commander pour le payer.*

**Ordre de construction :**
1. **item-author** déclare `angle-lu-depuis-l-axe` dans `items.yaml` (§8.2) et écrit les
   quatre items (§8.3). *Sans cela, rien d'autre ne valide.*
2. **frontend-builder** écrit `plan-complexe-modele.ts` (les formes exactes : un petit type
   « entier + entier·$i$ + entier·$\sqrt3$ », pas des flottants) et son test unitaire
   `test-plan-complexe.mjs` contre les tables du §5.3.
3. **frontend-builder** écrit `plan-complexe-rendu.ts` (repère isotrope d'abord, quadrillage
   opaque, cercle unité, `disposer` pour les étiquettes), puis `PlanComplexePanel.tsx`, puis
   l'entrée de registre.
4. **content-author** écrit le descripteur (§7) et la prose (§4).
5. **frontend-builder** écrit la porte `scene-plan-complexe.mjs` et sa campagne
   `--essai-rouge` (§11.4) — **vert d'abord, puis rouge, dans ce dossier, avec cette
   commande**.
6. **vague 1** : bac-fidelity-critic + pedagogy-critic. **vague 2** : dessin, calme,
   ergonomie, captures relues.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

1. **LE CADRE MATHS N'EST PAS AUTORITATIF, et toute cette spec en dépend.** (§0.3, §1.)
   `maths-sm.yaml:12-17` et `maths-sexp.yaml:10-16` : « PROPOSITION — NON AUTORITATIVE », les
   trois portes de RULES §5 non passées, le PDF officiel scanné sans couche texte, **aucune
   clé `exclusions`** dans les deux fichiers. **Défaut : on construit quand même, et on le
   déclare** — les `limites` citées au §1 sont toutes `derived`, donc reconstruites.
   *Pour défaire :* faire passer les trois portes **avant** de construire. **Coût du défaut :
   si une `limite` dérivée est fausse, le §9 interdit des formes que le programme autorise
   (perte pédagogique silencieuse) ou autorise des formes qu'il interdit (brèche de cadre).
   **C'est la décision la plus lourde de ce document, et elle appartient à l'humain.**
2. **Le mot « similitude » est-il interdit dans le panneau ?** (§9.2, §4.4.) **Défaut : OUI,
   interdit** — `maths-sexp.yaml:258` le réserve à SM, la notion ne le définit nulle part, et
   `items.yaml:2067` l'emploie déjà sans le définir (`REVIEW:104`). *Pour défaire :* le
   définir d'abord en prose (une phrase dans la sous-section du §4.4), le déclarer SM-only, et
   retirer la ligne 2 du §9 **plus** son essai rouge. **Coût du défaut : la scène nomme un
   objet du programme SM par une périphrase (« rotation et homothétie de même centre ») là où
   un sujet écrira « similitude directe ». Ce n'est pas rien.**
3. **Une sixième étape sur la lecture de $w$ ?** (§0.2, §2.6, §9.1.) **Défaut : NON** — c'est
   R6, et la scène est en R5 ; l'écart de phase est exactement ce que la vague 1 du banc
   d'électrolyse a refusé. *Pour défaire :* **une SECONDE scène**, en tête de R6, sur le même
   moteur et les mêmes pièces : trois points, le rapport $w$, et la table des configurations
   — les misconceptions `lecture-w-module-argument` et `ensemble-points-locus-confondu` y
   trouveraient enfin autre chose qu'un triangle gelé. **C'est la suite naturelle de ce
   document, et je la recommande** — mais pas dans la même scène.
4. **Le point $M$ doit-il être librement déplaçable ?** (§2.6, §5.2 B, §10.6.) **Défaut :
   NON — cinq positions discrètes.** *Motif : avec un $z$ quelconque, aucune lecture n'est
   exacte, et la scène afficherait « $0{,}52$ rad » là où le bac écrit $\dfrac{\pi}{6}$
   (§5.4).* *Pour défaire :* accepter les décimales, lever le §9.8 et la ligne N10 de la
   porte. **Je ne le recommande pas** : c'est précisément ce qui distingue une scène de maths
   d'une scène de physique.
5. **La scène doit-elle ANIMER le point le long de son arc ?** (§2.6, §6.1.) **Défaut : NON**
   — `temps: false`, `course: false`, l'angle se lit. *Pour défaire :* ajouter
   `course: true` et `revele_apres_course: 1`, un facteur de ralenti déclaré, la famille
   `eclairs` instruite pour de bon, et la règle de la grille de pixels fixe. **Coût : une
   demi-journée de porte, pour un gain pédagogique que je n'arrive pas à démontrer** — et la
   règle du dépôt est que le mouvement n'est jamais une raison en soi.
6. **Faut-il un cran $z = 0$ ?** (§5.2 B.) **Défaut : NON** — $\arg(0)$ n'est pas défini
   (`lesson.md:43`), et trois lectures sur neuf afficheraient un vide. *Pour défaire :* le
   cas est **pédagogiquement intéressant** (c'est le point fixe de toute transformation
   centrée en $O$) ; il faudrait alors écrire, à côté de la lecture vide, la phrase de la
   leçon — « *pour $z=0$, aucune direction n'a de sens* ». **Coût : une ligne de rendu et une
   ligne de porte ; gain : un cas limite nommé.** *Réversible à tout moment.*
7. **Faut-il écrire le `spec.md` manquant de la notion ?** (§8, `REVIEW:156-159`, D1.)
   **Défaut : ce document NE l'est PAS.** Il revendique **neuf** modèles pour un rung et en
   déclare un dixième ; **quatorze restent non revendiqués**. *Pour défaire :* une passe
   pedagogy-architect sur la notion entière, avec assignation rung par rung — **c'est un
   travail distinct, plus gros que cette scène**, et la REVIEW le route déjà. **Reste dû.**
8. **Le modèle neuf doit-il être UN ou DEUX ?** (§8.2.) **Défaut : UN**, parce que les deux
   formes (angle, longueur) contredisent **le même** principe et se corrigent par **le même**
   geste. *Pour défaire :* scinder en `angle-lu-depuis-l-axe` (items -35, -37) et
   `longueur-lue-depuis-l-origine` (item -36) — **et alors le second tombe à 1 item, donc
   sous le plancher**, ce qui exigerait deux items de plus. **Coût du scindement : deux items
   supplémentaires ; gain : une granularité diagnostique que je ne sais pas justifier.**
9. **La scène doit-elle montrer la TRANSLATION ($a = 1$) ?** (§10.7, §4.4 point 5.)
   **Défaut : NON dans la scène, OUI dans la prose.** *Motif : sans point fixe, trois
   lectures affichent « — », et une scène qui montre trois trous enseigne un trou.* *Pour
   défaire :* un cinquième cran `enonce` (`translation`, $z' = z + 2i$) et une ligne
   `point-fixe` qui écrit « **aucun** — la transformation n'a pas de point fixe ». **Coût :
   une valeur d'état et trois lectures conditionnelles ; gain : le cas $a=1$ vu, pas
   seulement lu.**
10. **Faut-il une figure figée de repli pour l'élève sans JavaScript ?** (§12,
    `fallback_note`.) **Défaut : NON, et le coût est écrit** — la figure existante
    (`rotation-homothetie`) couvre **exactement le cas dégénéré**, donc le repli est
    mauvais. *Pour défaire :* commander une **huitième figure** à trois étapes (le même $c$
    sur deux points dont un hors de l'axe réel ; le même point à deux centres ; le point fixe
    marqué), posée juste après le marqueur. **Coût : un SVG + son `.stages.json`, dans une
    notion qui en porte déjà sept dont une orpheline.** *Et cela réglerait au passage l'orpheline
    `rotation-complexe` (`REVIEW:139-141`, S9), si on la remplace plutôt que d'en ajouter une.*
11. **La scène est-elle servie aux élèves SExp ?** (§0.3, `REVIEW:113-120`, S6.) **Défaut :
    OUI, et sans métadonnée** — comme le reste de la notion, qui ne déclare aucune `filiere`.
    *Le contenu de la scène est dans les deux cadres* (`maths-sexp.yaml:250` écrit
    `z' = az + b`), *contrairement à R4 qui est une exclusion SExp.* *Pour défaire :* le
    scoping filière est une décision de schéma corpus-wide, escaladée par la REVIEW au
    propriétaire et à research-lead. **Cette scène ne l'ouvre pas — mais elle est, par
    construction, du bon côté de la frontière.**
12. **Le dossier `web/src/lib/scene3d/` s'appelle toujours `scene3d` alors qu'il porte
    huit scènes PLANES sur quatorze.** **Défaut : on n'y touche pas** — c'est une question
    héritée, déjà posée par le banc d'électrolyse (son §13.14). *Pour défaire :* un renommage
    en `scenes/`, qui touche quatorze portes, quatorze panneaux et le registre. **Décision de
    propriétaire, à prendre indépendamment de cette scène, et de préférence entre deux
    livraisons.**

---

## 14. Fait quand

La scène est **faite** quand, et seulement quand :

1. `angle-lu-depuis-l-axe` est **déclaré** dans `items.yaml` et les quatre items du §8.3
   existent, chaque distracteur portant un `misconception:` nommé.
2. Le test unitaire `test-plan-complexe.mjs` passe sur **les cinq tables du §5.3**, en formes
   exactes **et** en flottants.
3. `validate-content` passe : scène enregistrée, contrôles connus, **tout contrôle ouvert par
   au moins une étape**, aucun `revele_apres_h`, aucun `etat_revele` (déclaré), chaque pari
   nommant un modèle déclaré.
4. La porte `scene-plan-complexe.mjs` sort **VERT** à $1\,280$ **et** à 390 px, **lancée trois
   fois** (une porte instable est pire qu'une porte absente).
5. `--essai-rouge` : **les 24 sabotages du §11.4 font crier la famille annoncée, et elle
   seule**. Un sabotage qui n'atteint pas la porte sort **AMBIGU**, jamais vert.
6. La prose du §4 est écrite, **et l'exemple travaillé hors de l'axe réel (§4.3) est en
   place** — sans lui, la scène enseigne quelque chose que le chapitre contredit trois
   paragraphes plus bas.
7. **Vague 1** (bac-fidelity-critic : chaque nombre recalculé, chaque citation de cadre
   vérifiée à la ligne ; pedagogy-critic : la rampe, les paris, les retours relus les uns
   contre les autres) **et vague 2** (captures relues à deux largeurs, ergonomie au clavier,
   étiquettes) sont passées, et ce que chacune change est écrit **ici**, pas corrigé en
   douce.

---

## 15. Ce que je n'ai pas pu vérifier

1. **Je n'ai pas exécuté le produit.** Toutes les positions de pixels, les budgets
   d'étiquettes et les facteurs px/unité de cette spec sont **calculés**, pas mesurés. Les
   nombres de $21{,}7$ px/unité à 390 px et de $64$ px/unité à $1\,280$ px supposent une
   largeur de plateau que je n'ai pas relevée sur le rendu.
2. **Je n'ai pas lu le code des panneaux existants.** `disposer`, `useSceneRendu`, `usePari`,
   `Plateau`, `jetons-figure.ts` sont nommés d'après l'ADR 0041 et les specs sœurs ; je n'ai
   vérifié ni leurs signatures, ni qu'un plateau **carré-ish** (18 × 10 unités) s'y insère
   sans retouche. **À vérifier par frontend-builder avant de commencer.**
3. **`etat_revele` absent aux cinq étapes : est-ce accepté ?** Le banc de diffraction, le
   tremplin et le banc de modulation l'emploient ; la sphère ne l'a pas. Je **déclare** que
   cette scène n'en a pas — la révélation ne change aucun réglage, elle **ajoute** du dessin
   et des lectures — mais je n'ai pas relu `validate-content` pour confirmer qu'une étape sans
   `etat_revele` passe.
4. **Une scène sans clé `bornes` : est-ce accepté ?** (§12.) Je n'ai pas relu le validateur.
   *Si elle ne l'est pas, c'est le validateur qu'il faut corriger.*
5. **Je n'ai pas vérifié que les huit scènes Manim de cette notion ne montrent pas déjà, dans
   une de leurs étapes, l'écart d'arguments de S3.** J'ai lu leur contrat
   (`SCENE-CONTRACT.md:61`) et la liste des fichiers, **pas leur code**. *Si l'une d'elles le
   fait, cela ne retire rien au trou — elles sont dans la voie « explication après coup », pas
   dans la leçon — mais cela mérite d'être su.*
6. **La numérotation « chapitre 6 = R5 » est établie par trois citations concordantes**
   (`lesson.md:275`, `:325`, `bank.yaml:312`), **et la REVIEW démontre que le schéma est
   incohérent ailleurs**. Je n'ai pas relu les ~15 occurrences. *Toute prose commandée ici
   suit les citations justes ; aucune n'est ajoutée vers un autre rung.*
7. **Je n'ai pas mesuré l'effet de cette scène sur `media-manipulable` ni sur
   `dette-manipulable`.** J'affirme au §0 que la première monte d'une notion et que la seconde
   ne bouge pas, **sur la base de `grep` et non d'une exécution des deux instruments.**
8. **Le cadre est une proposition non validée** (§13.1). C'est écrit trois fois dans ce
   document parce que c'est la chose qu'il ne faut pas oublier.
