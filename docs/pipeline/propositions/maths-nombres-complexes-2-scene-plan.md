# spec — manipulable 2D `plan-complexe-transformation` (Maths · `nombres-complexes-2`, **R5**)

**Statut : LIVRÉE (2026-09-25) — spec révisée après la vague 1, amendée par la construction,
puis par la vague 2 (deux blocs suivants).** Écrite le 2026-09-25 par pedagogy-architect.

> ## Ce que la vague 2 a changé (dessin, calme, ergonomie — HANDOFF §11.210, DÉCISIONS §29)
>
> 1. **Les lectures de S4 et S5 ne portent plus que ce que l'étape découvre ou emploie** (règle
>    du calme) : S4 → distances, angle, point fixe, écriture ; S5 → distances, rapport, angle,
>    point fixe, écriture, rapport inverse (six, pas neuf — les distances parce qu'un retour de
>    S5 les cite, l'angle parce que c'est lui qui trace l'arc). Le §11 se lit en conséquence :
>    N2, N4 et N5 se mesurent aux 35 couples **à S3**.
> 2. **Le fantôme « départ » n'existe plus** (clé d'état `reference` retirée du descripteur, du
>    registre et du rendu) : il marquait une histoire qu'aucune question ne posait, et n'avait
>    pas d'étiquette. Les points 3 et 4 du bloc suivant qui le nomment sont caducs sur ce point.
> 3. **Les suites de S3 et S5** : une question et un geste (S3 : les deux lectures d'angle aux
>    cinq positions, puis le balayage ; S5 : une formule travaillée, $z' = iz + 2 - 2i$, et le
>    rapport inverse). La consigne de S3 ne raconte plus le dessin.
> 4. **Le balayage** avance par crans de 5° (au cran de 1°, une flèche ne déplaçait rien de
>    visible) ; son début et son relâchement sont dits par la région vivante ; « Échap » est
>    dans le libellé visible.
> 5. **Le dessin** : le nombre d'un axe qu'un point recouvrirait est omis ; l'affixe empilée
>    perd sa double parenthèse ; les filets évitent de couper un trait ; le centre et $M$ se
>    placent dans l'ordre qui laisse le moins de conflits.

> ## Ce que la construction a changé — cinq décisions, chacune écrite là où elle agit
>
> 1. **`argument-image` n'existe qu'au centre $O$, en mode `coefficient`.** Ailleurs, l'argument
>    de $z'$ n'est pas une fraction de $\pi$ ($5+3i$ à S5 : $\arctan\tfrac35$) et le §5.4
>    interdit le décimal : la ligne DISPARAÎT plutôt que d'écrire « — » (une lecture vide au
>    milieu d'une liste enseigne un trou, §5.2 B). Elle vit donc à S3, et à S5 au seul cran
>    `enonce: coefficient` avec le centre $O$. *`PlanComplexePanel.tsx`, `argumentsExacts`.*
> 2. **Le BALAYAGE n'efface que ce qui dépend de la POSITION** — les affixes de $M$ et $M'$ sur
>    le plan, et `argument-image`. **Les invariants restent écrits** : $|c|$, les distances
>    ($M$ glisse sur son cercle : $\Omega M$ ne change pas), le rapport, $\arg(c)$, l'écart et
>    l'étiquette de l'arc. Ils sont EXACTS à chaque position — c'est la règle même qui le
>    garantit — et les voir immobiles pendant que les deux directions tournent EST le fait de
>    S3. Le §6.1 effaçait tout pour qu'aucun décimal ne paraisse ; l'intention tient (aucun
>    nombre inexact ne s'écrit), la règle est plus fine. *Porte : la famille du §11.2 devient
>    `balayage-invariants` — pendant, les lectures positionnelles valent « — » et les
>    invariantes sont IDENTIQUES au caractère près ; relâché, tout revient. L'essai n° 22 ter
>    devient « une lecture positionnelle chiffrée pendant le balayage ».* Content-author a
>    signalé la contradiction avec le §6.1 avant qu'elle ne soit écrite ici : il avait raison
>    de ne pas l'appliquer sans source.
>    **Au clavier**, le balayage ne se relâche pas au `keyup` (un appui de flèche ne montrerait
>    qu'un éclair) : $M$ reste déplacé jusqu'à Échap ou la sortie du curseur. **Sous
>    `prefers-reduced-motion`, rien ne change** : le balayage est une manipulation DIRECTE — rien
>    ne bouge sans la main —, pas une animation (WCAG 2.3.3 vise le mouvement déclenché, pas
>    celui qu'on tient) ; les « trois positions discrètes » du §6.1 ne sont pas construites.
> 3. **Une sixième clé d'état, `image` (`cachee` | `donnee`)**, posée par les étapes comme
>    `reference` : elle dit si $M'$ est l'ÉNONCÉ (S3, S5 : à l'encre avant le pari). Les deux
>    exceptions du §7.6 sont ainsi écrites dans le DESCRIPTEUR, pas devinées par le code.
> 4. **Les nombres des axes et les noms $\vec u$, $\vec v$ sont peints sur le canvas** (12 px,
>    la police du chrome, comme les graduations du banc de diffraction) : ce sont des entiers et
>    deux lettres, pas des formules. Les étiquettes HTML (KaTeX) sont $M$, $M'$, le centre
>    quand il n'est pas $O$, l'angle et « départ » — **cinq au plus**, sous le budget de six
>    du §6.2. Les noms $\vec u$, $\vec v$ disparaissent avec les graduations fines (côté
>    < 540 px).
> 5. **`pedagogy_wiring.misconceptions` compte ONZE ids, pas dix** (content-author, recompté sur
>    les vingt choix du §7) ; et l'inventaire des décimales du §9.8 oubliait $0{,}79$ (S5,
>    `roles-intervertis`), en position « ordre de grandeur » comme les autres.

> ## Ce que la vague 1 a changé
>
> **Deux critiques, verdict commun : construire, mais pas telle qu'écrite.**
>
> **Deux BLOQUANTS pédagogiques, tous deux appliqués.**
> **B1** — `quart-de-tour` (S1) portait `mult-par-i-non-rotation`, dont le sens déclaré est
> l'erreur **inverse** ; la sur-généralisation que R0 fabrique n'était **déclarée nulle
> part**. → **Second modèle neuf** `multiplication-rotation-par-defaut` (§8.2 a) **+ trois
> items** (NBCOMPLEX2-39, -40, -41) ; §2.2, §3 et le registre du §8.1 corrigés ; le choix
> faible `angle-deux` remplacé par `agrandissement-nul`.
> **B2** — un distracteur de S2 affichait une valeur qui ne se déduisait pas de son propre
> modèle ($\times\pi$ au lieu de $\times\tfrac{\pi}{2}$). → corrigé, **et la règle est armée
> au §14.0** : *la valeur de chaque choix se recalcule depuis le modèle que son étiquette
> nomme.*
>
> **Un défaut de fidélité qui touche ma propre honnêteté d'instrument (S1).** J'avais écrit
> « aucune clé `exclusions` dans les fichiers maths » **en citant un `grep` que je n'avais pas
> lancé** — et `exclusions_transversales` existe (7 entrées SM, 8 SExp), dont **quatre
> mordent ici**. Corrigé au §1, au §9.5, au §9.6 et au §13.1 ; **consigné au §15.9**.
>
> **Un défaut de géométrie (S5) qui a produit une règle.** Trois des 70 états atteignables
> tombaient **hors du cadre** ; mon audit n'avait lu que la moitié d'entre eux. Cause : la
> **forme** du cadre. → **la fenêtre devient CARRÉE** ($[-9;9]^2$) et un cran de point change
> ($-2+2i \to 1-i$). **Règle écrite pour les scènes à venir : l'ensemble atteignable d'une
> scène de rotation est stable par rotation, donc il se borne par un DISQUE — son cadre est
> carré, ou il ment** (§5.1).
>
> **Deux décisions retournées.** Le mot « **similitude** » est désormais autorisé **une fois
> dans la prose**, marqué SM (fidélité S3) — **le panneau reste interdit**. Et le refus du
> continu devient un **HYBRIDE** (pédagogie I6) : un **balayage muet** à S3, sans aucun
> chiffre, qui laisse les cinq crans exacts intacts.
>
> **Sept items au lieu de quatre, 41 au total**, tous les planchers recomptés (§8.4) ; **cinq
> essais rouges de plus** ; **trois questions au propriétaire de plus** (§13.13 à §13.15) ;
> **cinq entrées d'honnêteté de plus** (§15.9 à §15.13).
>
> *Tout ce que les critiques ont demandé de garder n'a pas bougé : la structure en cinq
> étapes, le placement en tête de R5, la chaîne graduée du §2.3, la frontière de rang, le
> contrat de porte, et la précision exacte.*
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

1. **La masse des modèles déclarés est en R5.** Famille R5 : **huit** modèles
   (`mult-par-i-non-rotation`, `similitude-module-argument-roles`,
   `homothetie-rapport-complexe`, `reel-positif-donne-rotation`,
   `transformation-centre-oublie`, `rotation-sens-inverse`,
   `rotation-angle-comme-coefficient`, `ecriture-complexe-oubli-constante`), **11 items**.
   Famille R6 : **deux** modèles (`lecture-w-module-argument`,
   `ensemble-points-locus-confondu`), **5 items**.
   *Précision de vague 1 : des huit, **la scène n'en sert que sept** —
   `mult-par-i-non-rotation` en est retiré, sa définition déclarée décrivant l'erreur inverse
   de celle que R5 produit (§8.1, correctif B1). **En revanche la scène en déclare deux
   neufs**, ce qui porte à neuf les modèles de la famille R5, et à dix ceux que la scène
   sert (en recrutant `produit-modules-additionnes` à S2).*
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
  ⚠ **SIGNAL, non un constat clos (fidélité S10) :** les deux cadres assignent cet outil au
  chapitre **de cette leçon-ci** — `maths-sm.yaml:221` (`lesson_slug: nombres-complexes-2`) et
  `:224` (« *Résolution d'équations dans ℂ (second degré à coefficients complexes…)* ») ;
  `maths-sexp.yaml:247` et `:249` (« *second degré à coefficients réels…* »). L'arbitrage
  propriétaire l'a placé dans la leçon **sœur**. **Ce n'est donc pas une divergence réglée,
  c'est une divergence cadre ↔ corpus qui subsiste, et elle se route à `research-lead`**, pas
  se consigne comme acquise.
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
  ⚠ **Mais les DIX entrées de banque de cette notion sont `filiere: "SM"`** (`bank.yaml:22`,
  « *Filière SCIENCES MATHÉMATIQUES (A) et (B), BIOF, pour les dix* »). **Toute la preuve
  d'examen citée dans ce document est donc SM.** *Aucun sujet SExp de nombres complexes n'est
  dans le corpus de la notion ; ce que la scène « prépare » pour un élève SExp est déduit du
  cadre, pas mesuré sur des annales. Déclaré, pas maquillé (fidélité S2).*
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
    dire à la lecture : des **sept** items neufs du §8.3, NBCOMPLEX2-35, -36 et -39
    ressemblent à de l'**application directe**, -37, -38, -40 et -41 à de l'**application non
    explicite**, **aucun à de la synthèse de niveau 3** (§8.4, fidélité S7), et **personne ne
    peut le mesurer**.
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
- **`exclusions` : elles EXISTENT, et ma première version disait le contraire.**

  > ⚠ **Correction (vague 1, fidélité S1) — et c'est une faute d'instrument, pas une faute de
  > lecture.** La première version de ce §1 écrivait : « *ni `maths-sm.yaml` ni
  > `maths-sexp.yaml` ne portent de clé `exclusions` […] `grep -n "exclusions"
  > docs/cadre/curriculum/maths-*.yaml` ⇒ **0*** ». **La commande citée n'a jamais été
  > lancée** — et si elle l'avait été, elle aurait trouvé, puisque `exclusions_transversales`
  > **contient** la chaîne cherchée. J'ai cherché une chose sous **une seule de ses formes**,
  > puis j'ai attribué à un grep un résultat que je n'avais pas mesuré. C'est ADR 0036 au mot
  > près, plus une citation de commande fabriquée. **Réparé ici ; §15.9 le consigne.**

  Les deux fichiers portent une clé **`exclusions_transversales`** au **niveau du fichier**
  (pas du sous-domaine) : **7 entrées** dans `maths-sm.yaml:340-347`, **8** dans
  `maths-sexp.yaml:300-308`, toutes `source: derived — À VALIDER`. **Quatre mordent ici**, et
  elles sont portées en dur au §9 :
  1. `maths-sexp.yaml:305` — « *Racines n-ièmes générales / résolution de zⁿ=a dans ℂ :
     **SPÉCIFIQUE SM**. SExp : second degré à coefficients réels seulement.* » → **§9.5**.
  2. `maths-sexp.yaml:302` — « *Structures algébriques (lois de composition, groupes,
     anneaux, corps, **espaces vectoriels**) : **SPÉCIFIQUE SM**. Absent du cadre SExp.* »
     et `maths-sm.yaml:343` — « *Réduction d'endomorphismes (valeurs propres,
     diagonalisation) : **Hors 2e Bac** ; les espaces vectoriels s'arrêtent aux
     bases/dimension/applications linéaires.* » → **§9.6**.
  3. `maths-sexp.yaml:306` — « *Produit mixte / déterminant 3×3 […]* » → **§9.6** également
     (la forme `déterminant`).
  4. `maths-sm.yaml:347` — « *Géométrie de l'espace comme objet d'EXAMEN NATIONAL* » : sans
     objet ici (scène plane), **cité pour mémoire**.

  *Ce qui reste à router vers research-lead n'est donc PAS « les fichiers maths n'ont pas
  d'exclusions » — c'est, plus étroitement : **la granularité diffère de
  `pc-physique-chimie.yaml`**, qui porte des `exclusions` **par sous-domaine** là où les
  fichiers maths n'en portent qu'au niveau du fichier. Aucune exclusion propre au
  sous-domaine `nombres_complexes` n'existe ; les bornes fines de ce chapitre vivent dans ses
  `limites` (toutes `derived`). §13.1.*
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
départager.

> **Correction de vague 1 (pédagogie B1) — l'erreur que R0 fabrique n'est PAS celle que
> l'inventaire déclare.** La première version de ce paragraphe concluait « *un élève sort de
> là avec « multiplier, c'est tourner », et `items.yaml:2302` le mesure :
> `mult-par-i-non-rotation` est à 3 items* ». **C'est faux, et dans le sens exactement
> opposé.** Le modèle déclaré (`items.yaml:15-18`) dit : « *L'élève interprète $z \mapsto iz$
> […] comme un changement de taille, un déplacement, ou une symétrie axiale, **au lieu d'une
> rotation** d'un quart de tour* » — c'est **l'échec à VOIR une rotation**. Ses quatre choix
> de point d'arrêt le confirment (`checkpoints.yaml:91-122` : agrandissement, translation,
> symétrie). **L'erreur que R0 fabrique est la réciproque : « toute multiplication fait
> tourner, et d'un quart de tour, parce que c'est ce que $i$ a fait » — l'argument de $c$
> n'est jamais lu. Elle n'est déclarée nulle part, et rien ne la mesure. §8.2 la déclare.**
>
> **Et R0 n'est pas muet sur le module, contrairement à ce que ce §2.2 laissait croire** :
> `checkpoints.yaml:98-100`, au-dessus du marqueur, écrit déjà « *Comme $\vert i\vert = 1$, la
> multiplication par $i$ ne change aucune longueur : elle fait seulement tourner.* » **Le
> principe est donc ÉNONCÉ avant la scène ; ce qui manque, c'est le second cas** — un $c$ dont
> le module n'est pas $1$, sur lequel la phrase se retourne. *L'audit du §3 porte désormais
> cette citation, et le coût résiduel de S1 y est déclaré.*

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

**Contrainte non négociable et mesurable. La table du §7.6 C est la SEULE autorité ; ce qui
suit en est un résumé, et il ne doit jamais la contredire** (correctif de vague 1,
fidélité S10 : ce résumé interdisait `\arg(c)` avant S3 pendant que la table du §7.6 C
l'autorisait à S1 sous la forme $\arg(2)=0$ — deux règles pour une seule mesure) :
`rapport`, `AM'/AM`, `|c| =` pas avant **S2** ; **la LECTURE `argument-c`, l'`angle`,
$\dfrac{\pi}{6}$ et $e^{i\theta}$ en position de coefficient** pas avant **S3** — *la seule
occurrence autorisée plus tôt est la chaîne littérale $\arg(2) = 0$ dans le retour juste de
S1, qui justifie l'absence de rotation et ne chiffre aucun angle* ; `centre`, `point fixe`,
`invariant`, `z' - z_\Omega` pas avant **S4** ; `z' = az + b`, `\omega`,
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
explique*).

> **L'audit a été ÉLARGI par la vague 1 (pédagogie I4).** Sa première version ne lisait que
> la **prose** de `lesson.md:1-268`. Elle laissait dehors deux sources qui sont **au-dessus du
> marqueur** et que l'élève a lues : **(a) le TITRE de R5 lui-même** — « *R5 —
> Interprétation géométrique : **rotation et homothétie*** » (`lesson.md:269`), qui **nomme
> les deux réponses de S1 avant toute étape** ; **(b) les retours des points d'arrêt situés
> au-dessus**, en particulier `checkpoints.yaml:98-100` (`cp-r0-predict`, choix B) : « *Comme
> $\vert i\vert = 1$, la multiplication par $i$ ne change aucune longueur : elle fait
> seulement tourner.* » **Le principe « le module décide de la longueur » est donc déjà écrit,
> sur un cas.**

Vérification étape par étape contre **tout** ce qui est lu au marqueur — prose
(`lesson.md:1-269`, R0 à R4 **titre de R5 compris**) **et** retours de `cp-r0-predict` et
`cp-r4-racines` :

| étape | ce qui répondrait | où | déjà lu au marqueur ? |
|---|---|---|---|
| **S1** — $c=2$ : ça agrandit, ça ne tourne pas | `lesson.md:295` ; **le TITRE de R5 (`:269`) nomme « rotation et homothétie »** ; `checkpoints.yaml:98-100` pose déjà « $\vert i\vert=1$ ⟹ aucune longueur ne change » | `:295` **APRÈS** ; le titre et le retour **AVANT** | ⚠️ **partiellement lu — coût déclaré ci-dessous** |
| **S2** — le rapport des longueurs | $\vert zz'\vert = \vert z\vert\vert z'\vert$ à `:129` ; `checkpoints.yaml:98-100` sur le cas $\vert c\vert = 1$ | R2 et R0, **AVANT** | ⚠️ **la formule et un cas sont lus ; la longueur MULTIPLIÉE ne l'est pas** |
| **S3** — l'angle est un ÉCART | **la règle est DÉRIVABLE** ($\arg(zz') = \arg z + \arg z'$, `:129`, se retourne en une ligne) ; **mais la LECTURE GÉOMÉTRIQUE — « cet écart est l'arc qu'on mesure de $OM$ à $OM'$ » — n'est écrite nulle part** dans R0–R4, et l'exemple de R5 ne peut pas la distinguer de $\arg(z')$ (fait **d**) | — | ❌ **non** *(formulation corrigée, pédagogie M1 : ce n'est pas la règle qui manque, c'est sa lecture sur la figure)* |
| **S4** — le centre, et le point qui ne bouge pas | `:285-293` | **R5, APRÈS** | ❌ non |
| **S5** — caractériser $z' = az + b$ | **nulle part dans la notion** (`REVIEW:100-105`, 0/34 items) | — | ❌ **non** |

**Le coût résiduel, déclaré (pédagogie I4).** Le titre de R5 donne les deux MOTS que S1 fait
choisir. **Je ne le retire pas** — renommer un titre de rung dépasse cette spec — mais je le
déclare, et je **commande une alternative** à content-author : **un titre en forme de
question**, par exemple « *R5 — Que fait, géométriquement, une multiplication par un complexe
fixe ?* », qui reprend l'accroche de R0 (`lesson.md:9`) et n'énonce aucune des deux réponses.
*Si le titre n'est pas changé, S1 perd une partie de sa force et cela reste vrai : un élève
qui lit le titre sait qu'il y a une homothétie quelque part. **Ce qu'il ne sait toujours pas,
c'est laquelle des deux agit, ni sur quoi** — et c'est ce que S1 fait choisir.* **§13.13.**

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **S1 et S2 sont DÉRIVABLES de R2, et c'est assumé.** Un élève qui a bien lu
   $|zz'| = |z||z'|$ et $\arg(zz') = \arg z + \arg z'$ (`:129`) peut en déduire les deux.
   **Ce que S1 et S2 attrapent, ce n'est pas la règle : c'est ce que R0 encourage sans le
   vouloir.** R0 donne **un seul** coefficient géométrique, $i$, de module $1$
   (`lesson.md:15-23`), et conclut « *multiplier par $i$ […] ça **fait tourner** tout le plan*
   » (`:23`). Sa question de sortie l'admet elle-même : « *Est-ce que tout nombre complexe
   produit, de la même façon, une rotation — **et peut-être aussi un agrandissement*** ? »
   (`:25`). **Le « peut-être aussi » attend quatre rungs sa réponse, et la reçoit en prose.**
   La scène la rend en un pari. *Le modèle que cette généralisation abusive produit
   — « toute multiplication fait tourner, et d'un quart de tour » — **n'est PAS**
   `mult-par-i-non-rotation`, qui décrit l'erreur inverse : il est **déclaré neuf au §8.2**
   (correctif de vague 1, pédagogie B1).*
2. **S1, S2 et S3 posent les questions du chapitre où elles SONT ; S4 aussi ; S5 pose une
   question qu'aucun chapitre ne pose.** C'est un écart de phase **inverse** de celui que la
   vague 1 du banc d'électrolyse a refusé : là-bas la scène enseignait le chapitre SUIVANT ;
   ici S5 enseigne un savoir-faire de cadre que **la notion entière** ne porte pas (fait
   **f**). **La conséquence est écrite et chiffrée : la scène ne part qu'accompagnée de la
   prose du §4.4.** Une étape qui exerce un geste qu'aucun paragraphe ne pose est exactement
   l'anti-motif que `REVIEW:132-137` (S8) reproche déjà à `cp-ensemble-points` — « *méthode
   dans la réponse, l'anti-motif* ». **On ne le refait pas.**

   **Et ce n'est pas un geste inventé : l'examen le demande, et la banque le porte déjà.**
   `bank.yaml:1985` (2017 N, q1b2) : « *Montrer que $M_1$ est l'image de $M_2$ par la
   rotation de centre le point $\Omega$ d'affixe $\omega = \dfrac{1+i}{2}$ et d'angle
   $\dfrac{\pi}{2}$* », et son raisonnement (`:1987`) écrit **exactement la route de S5** :
   « *La relation $z_1 = iz_2+1$ […] est une application affine $z \mapsto iz+1$ […] Le
   multiplicateur $i$ a pour module $1$ et pour argument $\dfrac{\pi}{2}$ […] c'est le signe
   d'une rotation d'angle $\dfrac{\pi}{2}$, **de centre le point fixe de cette application,
   solution de $\omega = i\omega+1$*** » — la résolution étant posée à `:1989`.
   **Un sujet national fait donc déjà, en 0,5 point, ce qu'aucun paragraphe de la notion
   n'enseigne.** *C'est l'argument le plus fort du §0.1 f, et il manquait à la première
   version de ce document.*

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
**Longueur : 70 à 95 mots** *(budget relevé en vague 1, pédagogie M3 : il doit désormais
porter quatre choses, pas trois).* **Ton : neutre, il n'annonce aucune réponse.**

Il doit : (a) rappeler la question laissée ouverte au chapitre 1 (`lesson.md:25`) ; (b) dire
qu'on va la trancher **en essayant**, avant de la démontrer ; (c) **ne nommer ni rotation, ni
homothétie, ni rapport, ni angle, ni centre comme des résultats** ; et **(d) — clause
déplacée ici depuis le `fit_caveat` (§10.1), parce qu'une réserve qui ne vit que dans un champ
de métadonnées n'est lue par personne — dire à l'élève, en une phrase, que *ce qu'il va
essayer ne démontre rien* : le plan lui montrera la règle sur une poignée de cas, et **la
démonstration, c'est le paragraphe qui suit**.**

*Formulation possible pour (d), à retravailler par content-author : « Attention à ce que ce
plan est : un banc d'essai, pas une preuve. Quelques cas bien choisis ne démontrent rien en
mathématiques — la démonstration vient juste après, et elle vaut pour tous les complexes à la
fois. »* **C'est la seule clause du §4.1 dont le contenu est non négociable** : sans elle,
une scène de maths qui « vérifie » une règle sur 70 cas enseigne, en creux, que vérifier
suffit. *Interdit, en revanche : toute phrase de la forme « tu verras que… ». C'est le
correctif « pédagogie 8 » du banc d'électrolyse.*

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

**Le mot « similitude directe » est employé UNE fois, et une seule, explicitement marqué SM**
*(décision retournée en vague 1, fidélité S3).* La première version l'interdisait partout ;
c'était trop. Le cadre SM **le nomme** comme savoir-faire (`maths-sm.yaml:229`), neuf entrées
de banque sur dix sont SM, et un élève SM qui rencontre le mot pour la première fois dans un
énoncé d'examen est mal servi. **La prose écrit donc, une fois, une phrase de la forme :**
> « En filière Sciences Mathématiques, cette transformation porte un nom : une **similitude
> directe** de rapport $\vert a\vert$, d'angle $\arg(a)$ et de centre $\omega$. »

**Trois contraintes qui vont avec, et qui sont mesurables :** le mot apparaît **une** fois, il
est **marqué de filière**, il arrive **après** que les trois grandeurs ont été construites
(jamais avant), et il **ne devient jamais une condition de compréhension** — tout le
paragraphe se lit sans lui. *`items.yaml:2067` l'emploie déjà sans l'avoir défini
(`REVIEW:104`) : cette phrase le régularise au passage.*

⚠️ **L'interdiction reste ENTIÈRE dans le PANNEAU** (§9.2) — la scène ne l'écrit jamais, et
son essai rouge reste armé. *La prose peut nommer ce qu'un élève lira dans un sujet ; une
scène servie aux deux filières, non. §13.2.*

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

### 4.7 Aucun nouveau point d'arrêt — mais `cp-r5-ecriture` gagne sa REPRISE, et c'est un livrable

`cp-r5-ecriture` **garde ses quatre choix inchangés**, à sa place (`lesson.md:313`). *Motif :
la scène porte cinq paris ; ajouter un sixième QCM au même rung serait de la redondance, et
`REVIEW:201-204` (D13) dit que ce dont ce rung manque n'est pas un QCM de plus.*

**Mais une chose change, et c'est un livrable de cette spec** *(vague 1, pédagogie I2 + I7)*.
`REVIEW:196-198` (D11) relève que les points d'arrêt R4/R5/R6 sont des **marqueurs nus**,
sans phrase de cadrage avant ni de reprise après — contrairement à R0. **Ici, le manque est
aggravé par la scène** : S5 enseigne la forme **développée** $z' = az+b$, et
`cp-r5-ecriture` n'interroge que la forme **factorisée**. Sans reprise, le rung se termine sur
une compétence que la scène a construite et que rien ne referme.

**Livrable, à content-author (la phrase) et à item-author (le contenu) :**

- **Une phrase de cadrage AVANT le marqueur** (15 à 25 mots), qui dit ce qu'on va vérifier —
  l'**écriture**, pas le lieu — et distingue explicitement la question de celle du plan
  (« *le plan t'a fait trouver **où** arrive un point ; ici, on vérifie **comment on
  l'écrit*** »).
- **Une REPRISE APRÈS le point d'arrêt** (30 à 45 mots) qui **pose la question de la forme
  développée sur le même exemple** : *« Et si on te donnait la même transformation écrite
  $z' = iz + 2 - 2i$ ? C'est la même : développe $z' - 2 = i(z-2)$ et tu retrouves les deux
  termes. Le centre, lui, ne se lit plus — il se cherche. »*
  **Contraintes :** la reprise emploie **les nombres de S4** ($z_A = 2$, angle
  $\dfrac{\pi}{2}$, $a = i$, $b = 2-2i$) ; elle **ne redonne pas** $\omega = \dfrac{b}{1-a}$
  (déjà écrit au §4.4, deux sous-sections plus haut) ; et elle renvoie explicitement à
  NBCOMPLEX2-38 pour l'entraînement.
- **Coût résiduel, déclaré :** ce n'est **pas** un cinquième choix ajouté au point d'arrêt.
  `cp-r5-ecriture` reste **quatre choix sur la forme factorisée seulement** ; un élève qui
  réussit le point d'arrêt n'a toujours **rien** démontré sur $z'=az+b$ — cela ne se mesure
  que sur NBCOMPLEX2-38 (§8.3), au banc de fin. *Si le propriétaire veut que le point d'arrêt
  le mesure, c'est un cinquième choix ou un `cp-r5-forme-developpee` — une décision d'item, et
  je ne la prends pas ici.* **§13.14.**

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Le repère — isotrope, fixe, gradué, et c'est une décision de porte

**Fenêtre de données : $x \in [-9 ; 9]$, $y \in [-9 ; 9]$ — un CARRÉ. Elle ne change
JAMAIS**, à aucune étape, à aucun réglage.

> **Corrigée en vague 1 (fidélité S5), et la règle qui en sort vaut pour les scènes à venir.**
> La première version proposait une fenêtre **paysage**, $18 \times 10$. Le critique a trouvé
> **trois états atteignables sur 70 dont l'image tombe hors du cadre** — et il avait raison :
> mon audit des bornes n'avait lu que les 35 états de centre $O$, et **même là j'avais manqué
> $c = 2i$, $z = 4 \Rightarrow z' = 8i$** en affirmant que l'ordonnée extrême valait $4$.
>
> **La cause n'est pas l'arithmétique, c'est la FORME du cadre.** Dans une scène de rotation,
> l'ensemble atteignable est **stable par les rotations du coefficient** : si un point est
> atteignable à distance $8$ sur l'axe réel, alors son image par un $c$ d'argument
> $\dfrac{\pi}{2}$ est atteignable à distance $8$ sur l'axe imaginaire. **Un cadre
> rectangulaire laisse donc toujours sortir quelque chose — il suffit de tourner.** Règle,
> écrite pour les scènes suivantes : **l'ensemble atteignable d'une scène de rotation se borne
> par un DISQUE ; son cadre est CARRÉ, ou il ment.** *La porte le mesure (§11.2,
> `isotropie`, second volet : demi-largeur $=$ demi-hauteur au pixel près).*
>
> *Un cran a changé avec la fenêtre (§5.2 B) : le point $-2+2i$ devient $1-i$, sans quoi
> $c=-2$ le projetterait en $10-4i$ depuis le centre $A$. Les **70** états sont recomptés au
> §5.3, et l'excursion maximale y est écrite.*

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

**Échelle mesurée, refaite pour le cadre carré.** Le plateau est **carré** : son côté vaut
$\min(\text{largeur disponible},\ \text{hauteur plafond})$. À $1\,280$ px, avec un plafond de
hauteur de **560 px** (la scène est collante, ADR 0041 §7 : elle ne doit pas manger l'écran),
le plateau fait $560 \times 560$ ⟹ $560/18 \approx \mathbf{31}$ px/unité, et la colonne des
réglages occupe le reste de la largeur. **À 390 px : $390 \times 390$ ⟹ $390/18 \approx
\mathbf{21{,}7}$ px/unité** — *identique à la fenêtre paysage précédente, parce que c'est la
largeur qui contraint au téléphone.* Deux points distants d'une unité sont à 22 px ; le cercle
unité fait 43 px de diamètre.

*Conséquences à budgéter (§6.2) : sous 600 px, les nombres des axes ne sont tracés que tous
les **2** unités, et seules les étiquettes de $M$, $M'$, du centre et de l'angle subsistent.
**Et le plateau ne remplit plus la largeur au bureau** — c'est le choix du produit vectoriel
(« cadrer le pire cas laissait la moitié du canvas vide », ADR 0041, addendum de la quatrième
scène) : un cadre stable vaut mieux qu'un cadre plein.*

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

| cran | $z$ | $\vert z\vert$ | $\arg(z)$ | $\vert z - 2\vert$ *(distance à $A$)* | pourquoi ce cran |
|---|---|---|---|---|---|
| `1+i` | $1+i$ | $\sqrt2$ | $\dfrac{\pi}{4}$ | $\sqrt2$ | l'état de S1 ; **et le centre $\Omega$ de S5** |
| `2i` | $2i$ | $2$ | $\dfrac{\pi}{2}$ | $2\sqrt2$ | l'état de S3 ; **hors de l'axe réel** |
| `2` | $2$ | $2$ | $0$ | $0$ | **sur l'axe réel** (le cas dégénéré de S3) ; **et le centre $A$ de S4** |
| `4` | $4$ | $4$ | $0$ | $2$ | l'état de S4, à distance $2$ de $A$ |
| **`1-i`** | $1-i$ | $\sqrt2$ | $-\dfrac{\pi}{4}$ | $\sqrt2$ | **l'état de S2** ; le **seul argument NÉGATIF** de la grille |

> **Ce cran a changé en vague 1 (fidélité S5) : `-2+2i` → `1-i`.** Motif mesuré : depuis le
> centre $A(2)$, $-2+2i$ est à $2\sqrt5 \approx 4{,}47$, et $c = -2$ l'y projetait en
> $10-4i$, $c = 2i$ en $-2-8i$ — deux des trois états hors cadre. $1-i$ est à $\sqrt2$ de $A$
> et à $\sqrt2$ de $O$ : **il ne sort jamais.**
>
> **Ce qu'on perd, écrit :** le seul point du **deuxième quadrant** de la grille, et la ligne
> $\arg(z) = \dfrac{3\pi}{4}$ de la table de S3. *La grille ne couvre donc plus que les
> quadrants I, IV et l'axe imaginaire positif.* **Ce qu'on gagne :** le **seul argument
> négatif** de la scène — qui fait exister, sur un cran réel, la convention
> $]-\pi;\pi]$ que le §5.4 impose et que la porte mesure (fidélité S6). *Les IMAGES, elles,
> visitent les quatre quadrants : $c = -2$ envoie $1+i$ en $-2-2i$ (quadrant III).*

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

> ⚠ **`les-deux` est de PROFONDEUR SM, et c'est une décision déclarée** *(vague 1,
> fidélité S2)*. Le cran `les-deux` ($a = 1+i$ : $\vert a\vert \neq 1$ **et**
> $\arg(a) \neq 0$) est le cas **mixte** — rotation ET homothétie de même centre. Or
> `maths-sexp.yaml:258` borne SExp ainsi : « *Similitudes/compositions de transformations
> approfondies : plutôt SM. **SExp reste à translation/homothétie/rotation via z'=az+b**.* »
> **Le cas mixte est donc, en toute rigueur, de profondeur SM.**
>
> **Les deux autres crans couvrent SEULS le périmètre SExp** : `rotation-A`
> ($\vert a\vert = 1$, rotation pure) et `homothetie-A` ($a$ réel positif, homothétie pure).
>
> **`les-deux` reste néanmoins l'état de S5, et c'est un CHOIX, pas un oubli.** Trois motifs :
> (a) la leçon elle-même enseigne le cas mixte aux deux filières — `lesson.md:279` écrit
> « *la composée de ces deux-là* » sans marquer de filière, et le corpus n'a **aucune**
> métadonnée `filiere` (`REVIEW:113-120`) ; (b) les **dix** entrées de banque sont SM
> (§1) ; (c) un cran mixte est le seul où le pari de S5 peut faire choisir **entre** rapport
> et angle — avec $\vert a\vert = 1$, la moitié des distracteurs s'effondre.
> **Conséquence si le scoping de filière est un jour tranché : `les-deux` devient le cran
> SM, et S5 bascule sur `rotation-A` pour SExp — c'est un changement d'`etat`, rien de
> plus.** *§10.8, §13.11.*

**E — la référence** (`reference`) : `aucune` · `depart` (trace en tirets l'image obtenue au
réglage initial de l'étape). *État sans contrôle, posé par les étapes — même contrat qu'au
banc de diffraction (`reference` dans `etat`, absent de `controles`).*

### 5.3 Les tables de nombres — **toute l'arithmétique de la scène, vérifiée**

**A — les $7 \times 5 = 35$ images, en mode `coefficient`, centre $O$** (le produit $cz$) :

| $c \backslash z$ | $1+i$ | $2i$ | $2$ | $4$ | $1-i$ |
|---|---|---|---|---|---|
| $2$ | $2+2i$ | $4i$ | $4$ | $\mathbf{8}$ | $2-2i$ |
| $\tfrac12$ | $\tfrac12+\tfrac12 i$ | $i$ | $1$ | $2$ | $\tfrac12-\tfrac12 i$ |
| $i$ | $-1+i$ | $-2$ | $2i$ | $4i$ | $1+i$ |
| $-2$ | $-2-2i$ | $-4i$ | $-4$ | $\mathbf{-8}$ | $-2+2i$ |
| $1+i$ | $2i$ | $-2+2i$ | $2+2i$ | $4+4i$ | $2$ |
| $2i$ | $-2+2i$ | $-4$ | $4i$ | $\mathbf{8i}$ | $2+2i$ |
| $\sqrt3+i$ | $(\sqrt3-1)+(\sqrt3+1)i$ | $-2+2\sqrt3\,i$ | $2\sqrt3+2i$ | $\mathbf{4\sqrt3+4i}$ | $(\sqrt3+1)+(1-\sqrt3)i$ |

*Vérifications des neuf cases non triviales : $i(1+i) = i+i^2 = -1+i$ ✓ ·
$i(1-i) = i-i^2 = 1+i$ ✓ · $(1+i)(1+i) = 1+2i+i^2 = 2i$ ✓ ·
$(1+i)(2i) = 2i+2i^2 = -2+2i$ ✓ · $(1+i)(1-i) = 1-i^2 = 2$ ✓ · $(2i)(2i) = 4i^2 = -4$ ✓ ·
$(2i)(1-i) = 2i-2i^2 = 2+2i$ ✓ ·
$(\sqrt3+i)(1+i) = \sqrt3+\sqrt3 i + i + i^2 = (\sqrt3-1)+(\sqrt3+1)i$ ✓ ·
$(\sqrt3+i)(1-i) = \sqrt3-\sqrt3 i + i - i^2 = (\sqrt3+1)+(1-\sqrt3)i$ ✓ ·
$(\sqrt3+i)(2i) = 2\sqrt3 i + 2i^2 = -2+2\sqrt3 i$ ✓.*

**Bornes du dessin — les 70 états vérifiés, et l'excursion maximale écrite**
*(refait en vague 1, fidélité S5 : la première version n'auditait que les 35 états de centre
$O$, et y manquait $8i$)* :

| | états | excursion maximale $\vert z'\vert$ | les cases extrêmes | marge au cadre $[-9;9]^2$ |
|---|---|---|---|---|
| **centre $O$** | 35 | $\mathbf{8}$ $\;(= \vert c\vert_{\max}\times\vert z\vert_{\max} = 2\times4)$ | $8$ · $-8$ · $8i$ · $4i$ · $4\sqrt3+4i$ *(module $8$ : $\sqrt{48+16}$)* | **1 unité** |
| **centre $A(2)$** | 35 | $\mathbf{2 + 4\sqrt2 \approx 7{,}66}$ $\;(\vert z'-2\vert \le 2\times2\sqrt2)$ | $6-4i$ · $-2-4i$ · $-2+4i$ · $6$ | **$\ge 1{,}3$ unité** |

*Le cas extrême de centre $A$ est $z = 2i$ (le plus éloigné de $A$, à $2\sqrt2$) avec un $c$ de
module $2$ : $2 + (-2)(-2+2i) = 6-4i$ ✓ · $2 + 2i(-2+2i) = -2-4i$ ✓ · $2 + 2(-2+2i) = -2+4i$ ✓.*
**Aucun des 70 états ne sort du cadre, et la porte le vérifie aux 70** (§11.1 N1, §11.2
`point-a-sa-place`).

**B — les modules, en mode `coefficient`, centre $O$** ($|z'| = |c|\,|z|$). *Les sept
coefficients n'ont que **QUATRE** modules distincts — $2$ (quatre crans : `2`, `-2`, `2i`,
`sqrt3+i`), $\tfrac12$, $1$, $\sqrt2$ — donc la table entière tient en **quatre** lignes
(correctif de vague 1, fidélité S9 : la version précédente annonçait « trois » puis en
listait quatre, **et omettait la ligne $\sqrt2$**) :*

| $\vert c\vert \;\backslash\; \vert z\vert$ | $\sqrt2$ *(`1+i`, `1-i`)* | $2$ *(`2i`)* | $2$ *(`2`)* | $4$ *(`4`)* |
|---|---|---|---|---|
| $2$ | $2\sqrt2$ | $4$ | $4$ | $8$ |
| $\tfrac12$ | $\tfrac{\sqrt2}{2}$ | $1$ | $1$ | $2$ |
| $1$ | $\sqrt2$ | $2$ | $2$ | $4$ |
| $\boldsymbol{\sqrt2}$ *(`1+i`)* | $\mathbf{2}$ | $\mathbf{2\sqrt2}$ | $\mathbf{2\sqrt2}$ | $\mathbf{4\sqrt2}$ |

*Vérifications de la ligne neuve : $\sqrt2 \times \sqrt2 = 2$ ✓ · $\sqrt2 \times 2 = 2\sqrt2$ ✓ ·
$\sqrt2 \times 4 = 4\sqrt2$ ✓. Et les deux crans de module $\sqrt2$ (`1+i`, `1-i`) partagent
toute la première colonne.*

**C — les arguments, avec $c = \sqrt3+i$ ($\arg c = \dfrac{\pi}{6}$) — LA TABLE DE S3 :**

| $z$ | $\arg(z)$ | $z' = (\sqrt3+i)z$ | $\arg(z')$ | **écart $\arg(z')-\arg(z)$** |
|---|---|---|---|---|
| $1+i$ | $\dfrac{\pi}{4}$ | $(\sqrt3-1)+(\sqrt3+1)i$ | $\dfrac{5\pi}{12}$ | $\dfrac{\pi}{6}$ |
| $2i$ | $\dfrac{\pi}{2}$ | $-2+2\sqrt3\,i$ | $\dfrac{2\pi}{3}$ | $\dfrac{\pi}{6}$ |
| $2$ | $0$ | $2\sqrt3+2i$ | $\dfrac{\pi}{6}$ | $\dfrac{\pi}{6}$ |
| $4$ | $0$ | $4\sqrt3+4i$ | $\dfrac{\pi}{6}$ | $\dfrac{\pi}{6}$ |
| $1-i$ | $-\dfrac{\pi}{4}$ | $(\sqrt3+1)+(1-\sqrt3)i$ | $-\dfrac{\pi}{12}$ | $\dfrac{\pi}{6}$ |

*Vérifications : $\dfrac{\pi}{4}+\dfrac{\pi}{6} = \dfrac{3\pi}{12}+\dfrac{2\pi}{12} =
\dfrac{5\pi}{12}$ ✓ · $\dfrac{\pi}{2}+\dfrac{\pi}{6} = \dfrac{3\pi}{6}+\dfrac{\pi}{6} =
\dfrac{2\pi}{3}$ ✓ (et $-2+2\sqrt3 i$ est en deuxième quadrant, module $\sqrt{4+12}=4$,
$\cos = -\tfrac12$, $\sin = \tfrac{\sqrt3}{2}$ ⟹ $\dfrac{2\pi}{3}$ ✓) ·
$-\dfrac{\pi}{4}+\dfrac{\pi}{6} = -\dfrac{3\pi}{12}+\dfrac{2\pi}{12} = -\dfrac{\pi}{12}$ ✓
(et $(\sqrt3+1)+(1-\sqrt3)i \approx (2{,}732\,;\,-0{,}732)$, module $\sqrt{8}=2\sqrt2$,
$\arctan\!\left(\dfrac{-0{,}732}{2{,}732}\right) = -0{,}2618$ rad $= -\dfrac{\pi}{12}$ ✓).*

> **La ligne $1-i$ est neuve (fidélité S5) et elle rend un service que l'ancienne ne rendait
> pas : c'est le seul argument NÉGATIF de la table.** Elle fait exister, sur un cran réel, la
> convention $]-\pi;\pi]$ du §5.4 — et la lecture `argument-image` y affiche
> $-\dfrac{\pi}{4}$ **sous** $-\dfrac{\pi}{12}$, deux négatifs dont l'écart est positif.
> *Ce que la table a perdu : la ligne $\dfrac{3\pi}{4} \to \dfrac{11\pi}{12}$, seul point du
> deuxième quadrant. Déclaré au §5.2 B.*

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
| $1+i$ | $-1+i$ | $1 - i$ | $\sqrt2$ | $\sqrt2$ |
| $2i$ | $-2+2i$ | $-2i$ | $2\sqrt2$ | $2\sqrt2$ |
| $2$ | $0$ | $2$ — **le point ne bouge pas** | $0$ | $0$ |
| $4$ | $2$ | $2+2i$ | $2$ | $2$ |
| $1-i$ | $-1-i$ | $3-i$ | $\sqrt2$ | $\sqrt2$ |

*Vérifications : $i(-1+i) = -i + i^2 = -1-i$, donc $z' = 2-1-i = 1-i$ ✓, et
$|1-i-2| = |-1-i| = \sqrt2 = |{-1+i}|$ ✓ · $i(-2+2i) = -2i+2i^2 = -2-2i$, donc
$z' = 2-2-2i = -2i$ ✓, et $|-2i-2| = |-2-2i| = 2\sqrt2 = |-2+2i|$ ✓ ·
$i(-1-i) = -i-i^2 = 1-i$, donc $z' = 2+1-i = 3-i$ ✓, et $|3-i-2| = |1-i| = \sqrt2 =
|-1-i|$ ✓.*
**Tous ces points tiennent dans la fenêtre** (excursion maximale $|-2i| = 2$) ✓.

**La colonne $AM = AM'$ est exacte aux cinq lignes, et c'est le fait de S4** : $|c| = |i| = 1$,
donc la rotation **conserve les distances au centre**, y compris la distance nulle du point
fixe. *La porte le mesure comme une égalité de chaîne (§11.1 N3).*

**E — le mode `les-deux` : $z' = (1+i)z + 1-i$, centre $\Omega(1;1)$ — S5 :**

| $z$ | $z'$ | $z-\omega$ | $z'-\omega$ | $\Omega M$ | $\Omega M'$ | $\dfrac{\Omega M'}{\Omega M}$ | $\dfrac{z'-\omega}{z-\omega}$ |
|---|---|---|---|---|---|---|---|
| $1+i$ | $1+i$ | $0$ | $0$ | $0$ | $0$ | — | — (**point fixe**) |
| $2i$ | $-1+i$ | $-1+i$ | $-2$ | $\sqrt2$ | $2$ | $\sqrt2$ | $1+i$ |
| $2$ | $3+i$ | $1-i$ | $2$ | $\sqrt2$ | $2$ | $\sqrt2$ | $1+i$ |
| $4$ | $5+3i$ | $3-i$ | $4+2i$ | $\sqrt{10}$ | $2\sqrt5$ | $\sqrt2$ | $1+i$ |
| $1-i$ | $3-i$ | $-2i$ | $2-2i$ | $2$ | $2\sqrt2$ | $\sqrt2$ | $1+i$ |

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
= 1+i$ ✓ · $z=1-i \Rightarrow (1+i)(1-i) = 2$, donc $2+1-i = 3-i$ ✓ ;
$z-\omega = 1-i-1-i = -2i$, $z'-\omega = 3-i-1-i = 2-2i$, et
$\dfrac{2-2i}{-2i} = \dfrac{(2-2i)\,i}{-2i\cdot i} = \dfrac{2i+2}{2} = 1+i$ ✓.*

**Le fait que la scène existe pour montrer, en une ligne :** la dernière colonne est
**constante**. $\dfrac{z'-\omega}{z-\omega} = a$ pour tout $M$, et c'est la définition même du
centre. *La porte le mesure comme une **égalité de chaîne** aux cinq points, aux trois
transformations (§11.1, N7).*

**Bornes du dessin en mode `enonce`, les $3 \times 5 = 15$ états vérifiés :** l'excursion
extrême est $(5;3)$ (`les-deux`, $z=4$) et $(6;0)$ (`homothetie-A`, $z=4 \Rightarrow z'=6$) ;
`rotation-A` reproduit exactement la table **D** (c'est la même transformation). **Tout tient
dans $[-9;9]^2$ avec au moins 3 unités de marge** ✓. *Les deux autres crans, vérifiés :
`homothetie-A` ($z'=2z-2$) donne $2i$, $-2+4i$, $\mathbf{2}$ (fixe), $6$, $-2i$ ;
`rotation-A` ($z'=iz+2-2i$) donne $1-i$, $-2i$, $\mathbf{2}$ (fixe), $2+2i$, $3-i$.*

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
2. **Les arguments sont donnés dans $\,]-\pi ; \pi]$, et l'ÉCART est RAMENÉ dans le même
   intervalle — modulo $2\pi$, avec $-\pi$ écrit $+\pi$** *(règle explicitée en vague 1,
   fidélité S6 : la première version disait « les écarts aussi » sans dire comment)*.
   *Motif : c'est la convention de tous les corrigés de la banque (`bank.yaml:348` écrit
   $-\dfrac{\pi}{2}$, pas $\dfrac{3\pi}{2}$). Un écart négatif s'affiche négatif.*

   **La règle, écrite comme un calcul** : `angle` $= \arg(z'-z_\Omega) - \arg(z-z_\Omega)$,
   **puis** ramené par $+2k\pi$ dans $]-\pi;\pi]$, et **la borne $-\pi$ est réécrite $+\pi$**
   (l'intervalle est ouvert à gauche, fermé à droite).

   **Ce n'est pas une précaution théorique : la grille la déclenche.** Les deux arguments
   vivant chacun dans $]-\pi;\pi]$, leur différence brute vit dans $]-2\pi;2\pi[$, et **deux
   états de la grille tombent exactement sur $-\pi$** :
   $c=-2$, $z=1+i$ ($\arg z' = -\dfrac{3\pi}{4}$, $\arg z = \dfrac{\pi}{4}$, différence brute
   $-\pi$) et $c=-2$, $z=2i$ ($-\dfrac{\pi}{2} - \dfrac{\pi}{2} = -\pi$). **La scène doit y
   afficher $+\pi$**, qui est aussi $\arg(-2)$ ✓ — sans la règle, elle afficherait $-\pi$ et
   contredirait sa propre lecture `argument-c`. *Porte : §11.1 N6 ; essai rouge : §11.4, n° 8
   bis.*

   *Déclaré : **aucun état de la grille ne produit une différence brute strictement hors de
   $[-\pi;\pi]$** — je l'ai cherché sur les 70 et n'en ai trouvé aucun. La réduction n'est
   donc exercée qu'à la **borne**. C'est un vrai cas, et c'est le seul (§15.10).*
3. **Les deux formes de $c$ ne sont jamais affichées au même endroit.** La forme **algébrique**
   est sur la scène, près du badge du coefficient ; les deux moitiés exponentielles
   ($|c|$ et $\arg c$) sont des **lectures**, et elles apparaissent à des étapes
   différentes (§2.3). *C'est la graduation, et c'est mesuré.*

### 5.5 Contrôles (5) — un neuf par étape, plus le balayage de S3

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `coefficient` | $c$ | `2` · `0.5` · `i` · `-2` · `1+i` · `2i` · `sqrt3+i` | **S1**, **S3** *(rouvert)*, S5 |
| `point` | $z$ | `1+i` · `2i` · `2` · `4` · **`1-i`** | **S2**, **S3** *(rouvert)*, S4, S5 |
| `centre` | $z_\Omega$ | `O` · `A` | **S4**, S5 |
| `enonce` | la forme donnée | `coefficient` · `rotation-A` · `homothetie-A` · `les-deux` | **S5** |
| **`balayage`** | un glissement **continu** de $M$ sur son cercle | *aucun cran, aucune borne d'état* | **S3 seulement, et seulement APRÈS la révélation** |

**Aucun curseur continu. Aucune borne.** *Tout est en crans discrets, pour la raison du §5.4 :
un réglage continu produirait des nombres que la scène ne saurait afficher exactement.*
**Aucune clé de `bornes` dans le registre** — c'est la première scène du dépôt dans ce cas, et
c'est déclaré (§12).

**S3 n'ouvre aucun contrôle neuf qui RÈGLE quoi que ce soit**, et c'est voulu : son pari porte
sur une **lecture** (quel angle mesure-t-on ?), pas sur un réglage. Elle **rouvre**
`coefficient` et `point` pour que sa `suite` puisse promener les deux et faire constater
l'invariance de l'écart. *Précédent explicite : le banc d'électrolyse, S4 (« son pari porte
sur une lecture, pas un réglage »). La non-fuite est tenue par les **lectures**, pas par les
réglages (§7.6 A).*

**Et elle ouvre `balayage`, qui est un contrôle d'un genre neuf** *(ajouté en vague 1,
pédagogie I6)* : il **explore sans régler** — aucun cran, aucune clé d'`etat`, aucune lecture
chiffrée pendant qu'il agit, et l'état retrouvé intact au relâchement (§6.1). *Il ne compte
donc pas comme « le contrôle neuf de l'étape » au sens de l'ADR 0041 §4 : il n'ouvre aucun
état que la table du §7.6 A doive énumérer. **C'est une pièce que le dépôt n'a pas encore, et
le §15.12 le déclare.***

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

**Une exception, et une seule : le BALAYAGE de S3** *(décision de vague 1, pédagogie I6 —
l'hybride, adopté par défaut)*. À S3, **après la révélation**, un contrôle
supplémentaire permet de faire glisser $M$ **continûment** sur le cercle de rayon $\vert
z\vert$, et **pendant ce glissement toutes les lectures chiffrées sont remplacées par
« — »** : seuls les deux segments et l'arc bougent. **Le balayage ne s'arrête sur rien, ne
pose aucun cran, et ne modifie pas l'état** — quand on le relâche, la scène est exactement où
elle était.

> **Pourquoi c'est le bon compromis, et pourquoi ce n'est pas un reniement du §2.6.** Ce que
> le §2.6 refuse, c'est un $z$ **quelconque avec des lectures chiffrées** — parce qu'alors la
> scène afficherait « $0{,}52$ rad » là où le bac écrit $\dfrac{\pi}{6}$. **Le balayage
> n'affiche aucun nombre** : il ne sert qu'à faire voir, en un geste, que **l'arc garde son
> ouverture pendant que les deux directions tournent**. C'est précisément le fait de S3, et
> c'est le seul endroit de la scène où un continuum dit quelque chose qu'aucun cran ne dit.
> **Les cinq crans exacts restent intacts, et toutes les valeurs restent exactes.**
>
> **Deux conséquences dures :** (a) la famille de porte **`aucune-lecture-chiffree-pendant-le-balayage`**
> (§11.2), mesurée dans les deux sens — aucun chiffre pendant, tous les chiffres après ;
> (b) le balayage **n'existe pas avant la révélation de S3** (`fuite-inter-etapes`), et
> **il n'existe à aucune autre étape**.

**Éclairs et mouvement réduit.** Hors balayage, rien n'anime : la famille `eclairs` est
**attendue structurellement vide**, et **mesurée quand même** (§11.3) — *une chose n'est
prouvée absente que si l'on a énuméré ses formes* (ADR 0036). **Le balayage, lui, est un
mouvement réel et il est mesuré comme tel** : deux traits fins et un arc qui glissent ne
produisent aucune paire de variations opposées sur une fenêtre de 10° (le critère WCAG 2.3.1
porte sur des surfaces, pas sur des traits) — *attendu vide, mesuré quand même, et sous
`prefers-reduced-motion` le balayage est remplacé par **trois positions discrètes
supplémentaires**, sans continuum.* **Aucune courbe tracée**, donc aucune grille glissante
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

> **Table refaite en vague 1 (pédagogie B1 + M4).** Deux choix ont changé. **(a)**
> `quart-de-tour` était rattaché à `mult-par-i-non-rotation` : **faux, et dans le sens
> opposé** — le modèle déclaré (`items.yaml:15-18`) décrit l'élève qui **ne voit pas** une
> rotation, pas celui qui en **invente** une. Il est rattaché au **modèle neuf du §8.2**.
> **(b)** `angle-deux` (« tourné de $2$ radians ») est **supprimé** : deux erreurs
> superposées, et « $2$ radians » est un registre que la notion n'emploie **jamais** (elle
> écrit en fractions de $\pi$). Il est remplacé par `rapport-nul`, qui instancie
> `similitude-module-argument-roles` **proprement et sur un point exact**.

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `meme-direction` | en $2+2i$ — **deux fois plus loin** de $O$, dans **exactement la même direction** | **oui** | — | « Oui, et **retiens le mécanisme, pas le résultat** : $c = 2$ est un réel **positif**, son argument vaut $0$, donc il n'ajoute **aucun** angle. Ce qu'il fait, il le fait sur la **longueur** : $OM$ passe de $\sqrt2$ à $2\sqrt2$. Le chapitre 1 t'avait montré l'autre moitié de l'idée, avec $i$ ; en voici la première. Un nombre complexe porte **deux** informations, et elles ne servent pas à la même chose. » |
| `demi-tour` | en $-2-2i$ — un **demi-tour**, puis deux fois plus loin | non | **`reel-positif-donne-rotation`** | « Regarde le plan : $M'$ est en $2+2i$, sur la **même** demi-droite issue de $O$. Le demi-tour existe bien, mais il appartient à un **autre** coefficient : essaie $c = -2$, tu l'obtiendras exactement. Un réel **positif** ne fait tourner de rien ; c'est un réel **négatif** qui fait le demi-tour. » |
| `quart-de-tour` | en $-2+2i$ — un **quart de tour**, puis deux fois plus loin : multiplier, c'est tourner | non | **`multiplication-rotation-par-defaut`** *(modèle neuf, §8.2)* | « Le plan dit $2+2i$ : rien n'a tourné. Le quart de tour n'était pas une propriété de « multiplier » — c'était une propriété de **$i$**, et de lui seul. Le chapitre 1 te l'avait même écrit : *comme $\vert i\vert = 1$, la multiplication par $i$ ne change aucune longueur*. C'est une phrase sur **$i$**, pas sur la multiplication. L'angle ne se devine pas : il se **lit** sur le coefficient. Ici $\arg(2) = 0$, donc aucun tour. » |
| `agrandissement-nul` | en $O$ — ce qui agrandit, c'est $\arg(2) = 0$ : tout se ramène à l'origine | non | **`similitude-module-argument-roles`** | « Prends ton modèle au sérieux une seconde : agrandir par **zéro** écraserait le plan entier sur un seul point, et il n'y aurait plus rien à regarder. Le plan, lui, montre $M'$ à $2\sqrt2$ de $O$. Les deux nombres de $c$ ne sont pas interchangeables : c'est le **module** qui agit sur les longueurs, et un argument n'est pas une longueur. » |
| | *(le mot « **rapport** » est volontairement absent de ce choix et de son retour : il est interdit à S1 par le §7.6 C, parce que c'est S2 qui le construit comme un **quotient**)* | | | |

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

> **Deux corrections de nombres, l'une trouvée en écrivant, l'autre par la vague 1.**
>
> **(a) Un défaut de stem.** Le premier jet posait $M$ en $2i$ ($OM = 2$) avec $|c| = 2$ :
> **la somme et le produit y valent tous deux $4$**, et le distracteur « on additionne »
> atteignait la **bonne réponse**. C'est une *contamination de la réponse juste* — un défaut
> de **stem**, à corriger, et non un co-étiquetage de distracteur, qui lui serait légitime.
>
> **(b) Un distracteur dont la valeur ne venait pas de son propre modèle** *(fidélité /
> pédagogie B2, BLOQUANT)*. Le choix `argument-rapport` porte l'étiquette « *on multiplie la
> distance par l'**argument** de $c$* » et affichait $2\sqrt2 \times \pi$ — or
> $\arg(2i) = \dfrac{\pi}{2}$, **pas $\pi$**. Le nombre ne se déduisait pas du modèle que son
> propre texte annonce. **Corrigé, et la règle est armée au §14 : la valeur de chaque choix
> de pari est RECALCULÉE depuis le modèle que son étiquette nomme.**
>
> **$M$ passe en $1-i$** — le cran neuf du §5.2 B, non atteignable à S1 (où `point` est
> verrouillé sur $1+i$).

- **État :** `c: "2i"`, `z: "1-i"`, `centre: "O"`, `enonce: "coefficient"`,
  `reference: "depart"`.
- **`etat_revele` :** aucun (la révélation pose $M'$).
- **Contrôle ouvert :** `point` (**neuf**). *`coefficient` est **absent du DOM** : $c$ est
  verrouillé sur $2i$.* **Lectures :** `module-c`, `distances`, `rapport`.
- **Les nombres :** $OM = |1-i| = \sqrt2$ · $z' = (2i)(1-i) = 2i - 2i^2 = 2+2i$ ·
  $OM' = |2+2i| = 2\sqrt2$ ✓ · rapport $= \dfrac{2\sqrt2}{\sqrt2} = 2 = |2i|$ ✓. *Le point
  $(2;2)$ tient dans la fenêtre ✓.*
- **Les quatre valeurs, recalculées chacune depuis SON modèle, et distinctes :** produit
  $2\sqrt2 \approx 2{,}83$ · somme $2+\sqrt2 \approx 3{,}41$ ·
  « distance $\times \arg(c)$ » $= \sqrt2 \times \dfrac{\pi}{2} = \dfrac{\pi\sqrt2}{2}
  \approx 2{,}22$ · « distance $\times c$ » $= 2\sqrt2\,i$ **(non réel)**. ✓
- **Consigne (voix) :** « Nouveau coefficient : $c = 2i$. Son module vaut $2$ — la scène
  l'affiche. Le point $M$ est en $1-i$, au point $(1;-1)$ : il est à la distance
  $OM = \sqrt2$ de l'origine. On ne demande pas encore **où** il va ; on demande **à quelle
  distance de $O$**. »
- **Pari :** « Après la multiplication par $c = 2i$, la distance $OM'$ vaudra… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `produit` | $2\sqrt2$ — la distance est **multipliée** par $\vert c\vert = 2$ | **oui** | — | « Oui. $\dfrac{OM'}{OM} = \dfrac{2\sqrt2}{\sqrt2} = 2 = \vert c\vert$ : un **quotient de deux longueurs**, un réel positif, sans unité. C'est ce qu'on appellera le **rapport**. Et note ce qu'il ne dit pas : rien sur la direction. » |
| `somme` | $2 + \sqrt2$ — on **ajoute** le module de $c$ à la distance de départ | non | **`produit-modules-additionnes`** | « La scène affiche $2\sqrt2 \approx 2{,}83$, pas $2+\sqrt2 \approx 3{,}41$. L'addition serait la règle si multiplier deux complexes additionnait leurs modules — or le chapitre 3 a établi le contraire : $\vert zz'\vert = \vert z\vert \times \vert z'\vert$. Et il y a un test que tu peux faire toi-même : une somme ajoute **toujours la même chose**, quel que soit le point de départ ; un produit, non. Promène le point et regarde lequel des deux comportements tu vois. » |
| `argument-rapport` | $\dfrac{\pi\sqrt2}{2}$ — la distance est multipliée par l'**argument** de $c$, qui vaut $\dfrac{\pi}{2}$ | non | **`similitude-module-argument-roles`** | « La scène affiche $2\sqrt2 \approx 2{,}83$ ; ton modèle prédit $\approx 2{,}22$, donc un point **plus près** de $O$ qu'il ne l'est. L'argument de $c$ est un **angle** ; multiplier une longueur par un angle ne donne pas une longueur. Les deux nombres de $c$ ne sont pas interchangeables : le **module** agit sur les longueurs, et c'est tout ce que cette étape demande. » |
| `rapport-complexe` | $2\sqrt2\,i$ — le rapport vaut $2i$, donc $OM' = \sqrt2 \times 2i$ | non | **`homothetie-rapport-complexe`** | « Ce nombre n'est pas une distance : une distance est un **réel positif**, et $2\sqrt2\,i$ ne l'est pas. C'est le cœur de l'erreur, et il vaut pour tout le chapitre : le nombre complexe $c$ **code** l'agrandissement, il n'**est** pas l'agrandissement. Ce qui agrandit, c'est son **module**, $\vert 2i\vert = 2$. » |

- **`suite` — une RECHERCHE, pas un relevé** (36 mots) *(correctif de vague 1, pédagogie I5 :
  la version précédente imprimait la suite des quotients, c'est-à-dire l'invariant lui-même —
  il ne restait rien à trouver)* : « Garde le coefficient et promène le point sur les cinq
  positions. **Combien y en a-t-il où le quotient $\dfrac{OM'}{OM}$ ne vaut pas $2$ ?** Lis
  les deux distances à chaque fois avant de répondre. »
  *Réponse : **zéro** — vérifié sur la table B du §5.3, $|c| = 2$ donc $OM' = 2\,OM$ aux cinq
  points. **C'est la même grammaire qu'en S1 et en S4** : l'élève cherche, il ne relit pas.*
- **⟂-avant-pari :** $M'$, son affixe, son segment ; les lectures `distances` et `rapport` ;
  tout arc ; le verdict ; tout pixel d'accent ; et la phrase lue ne contient ni « $4\sqrt2$ »,
  ni « deux fois ».

### 7.3 S3 — `l-angle-est-un-ecart` · « L'angle : par rapport à quoi ? »

- **État :** `c: "sqrt3+i"`, `z: "2i"`, `centre: "O"`, `enonce: "coefficient"`,
  `reference: "aucune"`.
- **`etat_revele` :** aucun. *La révélation **trace l'arc** et ouvre les trois lectures
  d'angle ; elle ne change aucun réglage.*
- **Contrôles :** `coefficient` et `point` **rouverts** (§5.5, déclaré) ; **et un contrôle
  neuf, `balayage`** *(décision de vague 1, pédagogie I6)* — un glissement **continu** de $M$
  sur son cercle de rayon $\vert z\vert$, **ouvert seulement après la révélation**, **pendant
  lequel toutes les lectures chiffrées affichent « — »**, qui ne pose aucun cran et ne modifie
  pas l'état (§6.1). *C'est le seul continuum de la scène, et il est muet.*
  **Lectures :** `module-c`, `distances`, `rapport`, **`argument-c`**, **`angle`**,
  **`argument-image`**.
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

- **`suite` — une RECHERCHE en trois temps** (58 mots) *(correctif de vague 1, pédagogie I5 :
  la version précédente imprimait la suite des cinq $\arg(z')$ et l'invariant, il ne restait
  rien à chercher)* :
  1. « Promène le point sur les cinq positions, coefficient inchangé. **Sur combien d'entre
     elles les deux lectures d'angle affichent-elles le MÊME nombre ?** »
     *Réponse : **deux** — les deux points de l'axe réel, $z = 2$ et $z = 4$
     (table C du §5.3 : $\arg(z') = \dfrac{\pi}{6} = $ l'écart). **C'est la charnière de toute
     la scène** : ces deux points-là sont exactement le cas de l'exemple travaillé que
     l'élève lira trois paragraphes plus bas (`lesson.md:299`, $z = 3$, $\arg z = 0$), et
     c'est la `suite` qui le lui fait TROUVER au lieu de le lui dire.*
  2. « **Et sur combien l'écart change-t-il ?** »
     *Réponse : **zéro** — l'écart vaut $\dfrac{\pi}{6}$ aux cinq (table C ✓).*
  3. « Maintenant **fais glisser** $M$ avec le balayage, sans lâcher : les deux directions
     tournent, et l'ouverture de l'arc, elle, ne bouge pas. »
     *C'est le seul moment où le continuum dit quelque chose qu'aucun cran ne dit — et il le
     dit **sans un chiffre** (§6.1).*
- **Et un second parcours, à écrire dans la même `suite` :** « Garde le point et promène le
  **coefficient**. **Trouve les deux qui laissent la distance finale inchangée, et les deux
  qui laissent l'arc inchangé — ce ne sont pas les mêmes paires.** »
  *Réponses : même distance finale ⟹ même module ⟹ $\{2 ; -2 ; 2i ; \sqrt3+i\}$, quatre crans
  de module $2$ (§5.3 B) ; même arc ⟹ même argument ⟹ $\{i ; 2i\}$ (tous deux
  $\dfrac{\pi}{2}$) et $\{2 ; \tfrac12\}$ (tous deux $0$). **La formulation « les deux » est
  donc FAUSSE pour la distance, qui en a quatre** — texte à écrire : « **combien** laissent la
  distance finale inchangée ? **et combien laissent l'arc inchangé ?** ». Vérifié au §5.2 A.*
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

#### S4 confrontée à `cp-r5-ecriture`, choix par choix

*Le §3 affirmait que les deux sont « complémentaires, jamais doublons » **sans jamais le
vérifier** — la vague 1 l'a relevé (pédagogie I7). Voici la vérification, et elle change une
conclusion.*

| modèle | le choix de S4 | le choix de `cp-r5-ecriture` (`checkpoints.yaml:210-247`) | doublon ? |
|---|---|---|---|
| `transformation-centre-oublie` | `autour-de-O` : **un LIEU**, $4i$ — « où le point arrive si l'on tourne autour de $O$ » | B : **une ÉCRITURE**, $z' = i\,z$ — « quelle formule » | **non** : l'un se lit sur le plan, l'autre sur la page. *Mais ils nomment le même défaut, et l'élève qui échoue aux deux échoue deux fois au même endroit — ce qui est **voulu** : c'est le modèle le plus lourd de R5.* |
| `rotation-angle-comme-coefficient` | `angle-coefficient` : $2+\pi$, **un point de l'axe réel** — l'absurdité se VOIT | D : $z' - 2 = \dfrac{\pi}{2}(z-2)$, **une formule** — l'absurdité se raisonne | **non** |
| `ecriture-complexe-oubli-constante` | `oubli-constante` : $2i$, le **vecteur** pris pour l'affixe | **absent** de `cp-r5-ecriture` | **non** — *et c'est S4 seule qui le sert ici* |
| `rotation-sens-inverse` | **absent** de S4 (le quatrième choix est `angle-coefficient`) | C : $z'-2 = -i(z-2)$ | **non** — *et c'est le point d'arrêt seul qui le sert* |

**Conclusion, corrigée : ils ne se doublent pas, et ils se COMPLÈTENT exactement** — chacun
sert un modèle que l'autre laisse de côté (`ecriture-complexe-oubli-constante` pour la scène,
`rotation-sens-inverse` pour le point d'arrêt), et ils partagent les deux autres **dans deux
registres différents** (lieu / écriture). *C'est ce que le §3 affirmait ; c'est maintenant
mesuré.*

**Le coût résiduel, lui aussi mesuré :** **ni l'un ni l'autre n'interroge la forme développée
$z' = az+b$**, que S5 enseigne. C'est le motif du livrable §4.7 (la reprise) et de
NBCOMPLEX2-38 (§8.3). **Rien, dans le rung, ne mesure ce savoir-faire avant le banc de fin.**
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
  $z'$. Le point $M$ est en $4$ ; son image est en $5 + 3i$, la scène la montre.
  **Un centre, tu viens de voir ce que c'est : le point qui ne bouge pas. Sers-t'en.** »
  *(La dernière phrase est un ajout de vague 1, pédagogie I1 : elle **réactive S4** au lieu
  de laisser l'élève affronter une question neuve sans rappel. **Contrainte :** elle ne nomme
  ni $\omega$, ni $\dfrac{b}{1-a}$, ni « résoudre » — elle rappelle une **propriété**, pas une
  méthode, et le §7.6 C l'autorise explicitement à S5 comme à S4.)*
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
| **S3** | $M'$, son affixe, son segment, **et les DEUX valeurs $\arg(z) = \dfrac{\pi}{2}$ et $\arg(z') = \dfrac{2\pi}{3}$** — le tout **à l'ENCRE** | la consigne **donne** les deux directions ; **le pari ne porte pas sur leurs valeurs, mais sur LAQUELLE des trois quantités qu'on peut former avec elles est l'angle de la transformation** | rien : l'**arc**, la lecture `angle`, la lecture `argument-c` et la lecture `argument-image` restent absents. *Précision ajoutée en vague 1 (pédagogie M2) : la version précédente ne listait que $M'$, alors que la consigne énonce déjà les deux arguments — l'exception était plus large que ce que la table déclarait, ce qui aurait fait rougir `avant-pari` sur un produit conforme à la spec.* |
| **S5** | $M'$, son affixe, son segment, **à l'ENCRE** | la consigne **donne** $z' = 5+3i$ ; le pari porte sur la **nature** de la transformation | rien : $\Omega$, l'anneau, `point-fixe`, `rapport-inverse`, `module-c`, `argument-c` et l'écriture factorisée restent absents |

> **Et une distinction que la porte doit tenir à S3 : « la valeur est ÉNONCÉE » n'est pas
> « la LECTURE existe ».** $\arg(z) = \dfrac{\pi}{2}$ et $\arg(z') = \dfrac{2\pi}{3}$ sont
> **écrits dans la consigne**, à l'encre ; la **lecture `argument-image`**, qui les range
> l'une sous l'autre en regard de `angle`, **n'existe pas dans le DOM avant la révélation**.
> *Ce sont deux objets différents : un texte d'énoncé et une ligne de mesure. La famille
> `avant-pari` mesure la seconde, pas le premier, et la table ci-dessus est ce qui le lui
> dit.*

#### A — la fuite par les RÉGLAGES

*La porte **réécrit elle-même** cette table contre le descripteur (§11.2,
`fuite-inter-etapes`) : elle énumère, avant chaque étape, tous les états ATTEIGNABLES (l'état
posé, sa révélation, puis chaque contrôle ouvert sur tous ses crans) et vérifie qu'aucun ne
produit la réponse d'un pari ultérieur.*

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `coefficient` seul (7) | les 7 coefficients, **sur le seul point $1+i$**, centre $O$ | **non** pour S2 : `point` est fermé — l'état de S2 ($z = 1-i$) est **hors d'atteinte** — et **`distances` et `rapport` n'existent dans le DOM à aucune étape antérieure à S2**. **non** pour S3 : `angle`, `argument-c`, `argument-image` absents, **aucun arc tracé**. **non** pour S4/S5 : `centre` et `enonce` fermés. |
| **S2** | `point` seul (5) | les 5 points, **au seul coefficient $2i$**, centre $O$ | **non** pour S3 : le coefficient $\sqrt3+i$ est hors d'atteinte, et les trois lectures d'angle n'existent pas. **non** pour S4/S5 : contrôles et lectures absents. |
| **S3** | `balayage` (**neuf, et seulement APRÈS la révélation**) ; `coefficient` et `point` **rouverts** | les 35 couples, centre $O$, **plus un continuum de positions de $M$ sur son cercle** | **non** pour S4 : `centre` est fermé — **tout est centré en $O$**, et `point-fixe` et `ecriture` n'existent pas. **non** pour S5 : `enonce` fermé, `rapport-inverse` absent. **Et le balayage n'ajoute aucun état atteignable au sens de la table : il n'affiche AUCUN chiffre et ne pose AUCUN cran** (§6.1) — la porte le vérifie comme une absence, famille `aucune-lecture-chiffree-pendant-le-balayage`. |
| **S4** | `centre` (neuf) + `point` (rouvert) | 2 centres × 5 points, **au seul coefficient $i$** | **non** pour S5 : `enonce` est fermé, donc **aucune transformation de la forme $z'=az+b$ n'existe** ; `rapport-inverse` absent ; et la forme **développée** de `ecriture` n'est écrite nulle part. |
| **S5** | les quatre contrôles de réglage *(pas `balayage`, qui reste propre à S3)* | tout | — |

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
| **S1** | « deux effets séparés », $\arg(2) = 0$, « essaie $c=-2$ », « $OM$ passe de $\sqrt2$ à $2\sqrt2$ », « agrandir par zéro écraserait le plan », « l'angle se **lit** sur le coefficient » | ⚠️ **deux quasi-fuites, tranchées.** (a) Le retour juste écrit « *$OM$ passe de $\sqrt2$ à $2\sqrt2$* » — c'est un rapport de $2$, donc le fait de S2. **Phrase conservée**, parce qu'elle est la **conséquence directe du pari de S1** (« deux fois plus loin » est le choix même) et qu'elle ne nomme ni « rapport », ni « quotient », ni une division ; **règle posée : aucun retour de S1 n'écrit le mot « rapport » ni une division.** (b) Le retour de `quart-de-tour` écrit « *l'angle ne se devine pas : il se lit sur le coefficient* » — cela ne donne **pas** le pari de S3, qui ne demande pas d'**où** vient l'angle mais **laquelle** des trois quantités de l'écran il est. **Conservé, et vérifié mot à mot : aucun retour de S1 ne contient « écart », « différence », ni $\arg(z')$.** *§11.2, `formule-graduee`, S1.* |
| **S2** | $\dfrac{OM'}{OM} = \vert c\vert$, « rien sur la direction », « une somme ajoute toujours la même chose », « un argument est un angle » | ⚠️ **une fuite trouvée et supprimée.** Le retour de `somme` annonçait « *ce qui s'**additionne**, tu le verras à l'étape suivante, ce sont les **arguments*** » — il donnait l'objet de S3 **et** son opération. **Phrase retirée** et remplacée par un test que l'élève peut faire **à S2** (« une somme ajoute toujours la même chose ; un produit, non »). **Règle : aucun retour de S2 ne dit ce qui arrive aux ANGLES.** *Le mot « angle » subsiste dans le retour de `argument-rapport` (« l'argument de $c$ est un **angle** ») — c'est une phrase sur ce qu'un argument EST, pas sur ce qu'il fait, et le §7.6 C l'autorise nommément à S2.* |
| **S3** | l'écart, $\arg(z')-\arg(z) = \arg(c)$, le sens direct, l'accident de l'axe réel | **non** : aucun ne nomme un centre, un point fixe ni une écriture. *Vérifié mot à mot : les quatre retours ne contiennent ni « centre », ni « fixe », ni « $z_A$ ».* |
| **S4** | le point fixe, $z'-z_A = c(z-z_A)$, « le coefficient ne dit rien du centre » | **non** : aucun n'écrit $z' = az+b$ ni $\omega = \dfrac{b}{1-a}$, et aucun ne dit qu'on peut **retrouver** un centre à partir d'une formule. *C'est même le contraire : S4 **donne** le centre, S5 le fait **chercher**.* |
| **S5** | tout | — |

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*La frontière se pose **par étape**, consigne **et** retours **et** lectures — pas « après la
révélation de… ». Une consigne a le droit d'imprimer ce que son propre énoncé exige.*

| pendant l'étape… | **autorisé** (consigne + retours + lectures) | **interdit** |
|---|---|---|
| **S1** | `rotation`, `homothétie`, `agrandir`, `tourner`, `module`, `\vert c\vert`, `argument` **et la chaîne littérale $\arg(2) = 0$** *(en position de justification : pourquoi il n'y a pas de rotation)*, `demi-tour`, `quart de tour`, `angle` *(dans « l'angle se lit sur le coefficient », jamais chiffré)* | `rapport`, `quotient`, `\dfrac{OM'}{OM}`, `÷`, `/` *(entre deux longueurs)*, `écart`, `différence`, `\arg(z')`, `\arg(z)`, **toute fraction de $\pi$ autre que le littéral $0$**, `centre`, `point fixe`, `z' - z_A`, `z' = az`, `\omega` |
| **S2** | + `rapport`, `quotient`, `\dfrac{OM'}{OM}`, `\vert zz'\vert = \vert z\vert\vert z'\vert`, `distance`, `longueur`, **`\arg(c)` et sa valeur $\dfrac{\pi}{2}$** *(le distracteur `argument-rapport` doit pouvoir nommer le nombre qu'il emploie — correctif B2 : une valeur de choix se recalcule depuis son modèle, donc elle doit être écrite)*, `angle` *(dans « un argument est un angle », jamais comme grandeur de la transformation)* | `\arg(z')`, `\arg(z)`, `écart`, `différence`, `angle de la transformation`, `arc`, `direct`, `horaire`, `centre`, `point fixe`, `\omega`, `az + b` |
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
| ~~`mult-par-i-non-rotation`~~ | 3 | **AUCUNE ÉTAPE — ligne RETIRÉE en vague 1 (pédagogie B1)** | *La première version rattachait `quart-de-tour` (S1) à ce modèle. **C'est l'erreur inverse** : le modèle déclaré (`items.yaml:15-18`) décrit l'élève qui prend $z \mapsto iz$ pour un agrandissement, un déplacement ou une symétrie **au lieu d'une rotation**. À S1, la bonne réponse **est** un agrandissement sans rotation : le modèle n'y a aucun distracteur possible. **La scène ne le sert pas, et il reste à 3 items, tous en R0.*** |
| **`multiplication-rotation-par-defaut`** *(modèle NEUF, §8.2)* | **0 → 3** | **S1**, choix `quart-de-tour` | le plan affiche $2+2i$ : rien n'a tourné. Le quart de tour était une propriété de **$i$** — et `checkpoints.yaml:98-100`, au-dessus du marqueur, le disait déjà en toutes lettres pour $\vert i\vert = 1$. La `suite` fait trouver les **deux** crans qui ne tournent pas |
| `reel-positif-donne-rotation` | 3 | **S1**, choix `demi-tour` | le demi-tour existe, et il appartient à $c = -2$ : la `suite` le fait **produire** exprès |
| `similitude-module-argument-roles` | 3 | **S1** (`agrandissement-nul`), **S2** (`argument-rapport`), **S5** (`roles-intervertis`) | un ordre de grandeur suffit : agrandir par $0$ écraserait le plan, et $\dfrac{\pi}{4} < 1$ rapprocherait $M'$ — l'écran montre le contraire dans les deux cas |
| `homothetie-rapport-complexe` | 4 | **S2** (`rapport-complexe`), **S5** (`rapport-complexe`) | $\sqrt2 \times 2i$ n'est pas une distance ; l'écran affiche $2\sqrt2$, un réel |
| `produit-modules-additionnes` | 3 | **S2**, choix `somme` | $2+\sqrt2 \approx 3{,}41 \neq 2\sqrt2 \approx 2{,}83$, et la `suite` fait chercher **combien** de points démentent le quotient (réponse : zéro) |
| `produit-quotient-argument-operation` | 3 | **S3**, choix `somme` | l'addition **est déjà faite** : $\dfrac{\pi}{6}+\dfrac{\pi}{2} = \dfrac{2\pi}{3}$ est à l'écran |
| `rotation-sens-inverse` | 3 | **S3**, choix `horaire` | l'arc **tracé** va de $\dfrac{\pi}{2}$ vers $\dfrac{2\pi}{3}$ : il augmente |
| `transformation-centre-oublie` | 3 | **S4** (`autour-de-O`), **S5** (`centre-O`) | bascule le centre sur $O$ et **obtiens** $4i$ ; à S5, l'image de $0$ vaut $1-i$ — $O$ bouge |
| `ecriture-complexe-oubli-constante` | 3 | **S4**, choix `oubli-constante` | $2i$ est le **vecteur** $\overrightarrow{AM'}$, pas l'affixe : depuis $A(2;0)$, monter de $2$ mène en $(2;2)$ |
| `rotation-angle-comme-coefficient` | 4 | **S4**, choix `angle-coefficient` | une rotation d'un quart de tour qui laisse le point sur l'axe réel est une contradiction visible |

**Dix modèles servis — huit de l'inventaire existant, deux neufs — et aucun n'est servi deux
fois pour la même raison.** *Les quinze autres modèles de l'inventaire (argument/quadrant,
module, conjugué, exponentielle, Moivre, périodicité, racines, **multiplication par $i$ prise
pour autre chose qu'une rotation**, lecture de $w$, lieux) ne sont **pas** visés : ils
appartiennent à R0, R1, R3, R4, R6 et R7. **La scène ne les touche pas, et c'est déclaré.***

### 8.2 Les DEUX modèles neufs — et la mesure qui rend chacun nécessaire

*La première version n'en déclarait qu'un. La vague 1 (pédagogie B1, BLOQUANT) a montré que le
second était déjà **utilisé** par la scène sous une étiquette qui décrit l'erreur inverse.*

#### 8.2 a — `multiplication-rotation-par-defaut` (neuf, vague 1)

**Ce que R0 fabrique, et que rien ne nomme.** Le chapitre 1 travaille **un seul** coefficient
géométrique, $i$, et conclut « *multiplier par $i$ […] ça **fait tourner** tout le plan d'un
quart de tour* » (`lesson.md:23`). L'élève en sort avec une règle sur-généralisée :
**toute multiplication fait tourner, et d'un quart de tour, parce que c'est ce qu'on a vu** —
**l'argument du coefficient n'est jamais lu.**

**Pourquoi ce n'est PAS `mult-par-i-non-rotation`.** Ce modèle-là décrit l'erreur **inverse** :
« *L'élève interprète $z \mapsto iz$ […] comme un changement de taille, un déplacement, ou une
symétrie axiale, **au lieu d'une rotation** d'un quart de tour* » (`items.yaml:15-18`), et ses
quatre choix de point d'arrêt le confirment (`checkpoints.yaml:91-122` : agrandissement,
translation, symétrie). **Un élève qui invente une rotation là où il n'y en a pas n'est pas
cet élève-là.**

**Pourquoi ce n'est PAS non plus `reel-positif-donne-rotation`.** Celui-ci est **borné au cas
$c$ réel strictement positif** et sa forme canonique est l'angle $\pi$ (`items.yaml:169-174` :
« *souvent d'angle $\pi$* »). Le modèle neuf est plus large : il s'applique **quel que soit**
$c$, et sa signature est le **quart de tour par défaut**, transféré de $i$. *Les deux se
croisent à S1, et les deux distracteurs y sont séparés proprement : `demi-tour` → l'angle
$\pi$ du modèle borné ; `quart-de-tour` → le quart de tour par défaut du modèle neuf.*

**Et rien ne le mesure aujourd'hui.** `grep` sur les 23 modèles : aucun `contradicts_principle`
ne porte « l'argument décide de l'angle » ; le seul énoncé proche du corpus est
`checkpoints.yaml:98-100`, qui dit la moitié **module** de la règle, sur le seul cas
$\vert i\vert = 1$.

**Déclaration à ajouter à `items.yaml` (bloc `misconceptions:`) :**

```yaml
  - id: mc.math.maths_complexes_trigo.multiplication-rotation-par-defaut
    label: >-
      « Toute multiplication fait tourner — et d'un quart de tour : l'angle est
      celui de i, jamais celui qu'on lit sur le coefficient »
    description: >-
      Ayant vu que z ↦ iz est une rotation d'un quart de tour, l'élève
      généralise : toute multiplication par un complexe ferait tourner, et
      d'un quart de tour par défaut. Il applique une rotation là où le
      coefficient n'en porte aucune (c réel positif), ou un quart de tour là
      où l'argument du coefficient vaut tout autre chose (π/6, π/4). Le
      symptôme mécanique est constant : arg(c) n'est jamais calculé.
    contradicts_principle: >-
      L'angle d'une multiplication par c est arg(c), et rien d'autre : il se
      LIT sur le coefficient, il ne se suppose pas. i = e^{iπ/2} fait tourner
      d'un quart de tour parce que SON argument vaut π/2 ; un c d'argument 0
      (réel positif) ne fait tourner de rien, un c d'argument π/6 fait tourner
      de π/6. Le quart de tour est une propriété de i, pas de la
      multiplication.
```

#### 8.2 b — `angle-lu-depuis-l-axe` (neuf) — la mesure qui le rend nécessaire

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

### 8.3 Les SEPT items que les deux modèles exigent (specs pour item-author)

**Plancher : ≥ 3 items par modèle neuf.** Trois items portent `angle-lu-depuis-l-axe` en
`primary_misconception` (**-35, -36, -37**) ; **trois portent
`multiplication-rotation-par-defaut`** (**-39, -40, -41**, ajoutés en vague 1) ; un
septième (**-38**) solde le savoir-faire de cadre à 0/34 (§0.1 f).
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
> $A$, $M$ et $M'$ ont pour affixes $z_A = 1$, $z = 2$ et $z' = 1+i$. $M'$ est l'image de
> $M$ par une **rotation de centre $A$**. Quel est l'angle de cette rotation ?

| | texte | misconception |
|---|---|---|
| **A** | $\dfrac{\pi}{2}$ | **juste** |
| B | $\dfrac{\pi}{4}$ | `angle-lu-depuis-l-axe` *(c'est $\arg(z')$)* |
| C | $\dfrac{3\pi}{4}$ | `angle-lu-depuis-l-axe` *(c'est $\arg(z'-z)$, la direction du déplacement)* |
| D | $-\dfrac{\pi}{2}$ | `rotation-sens-inverse` |

*Vérifications : $\dfrac{z'-z_A}{z-z_A} = \dfrac{i}{1} = i$, d'argument $\dfrac{\pi}{2}$ ✓ ;
$\arg(1+i) = \dfrac{\pi}{4}$ ✓ ; $z'-z = 1+i-2 = -1+i$, d'argument $\dfrac{3\pi}{4}$ ✓
(deuxième quadrant, $\cos = -\tfrac{\sqrt2}{2}$, $\sin = \tfrac{\sqrt2}{2}$) ;
$|z-z_A| = |z'-z_A| = 1$ — **c'est bien une rotation** ✓. **Les trois angles proposés sont des
angles de la table de R1** (`lesson.md:71-74`), donc tous plausibles.*

> **Nombres changés en vague 1 (pédagogie I3).** La première version posait $z_A = 2$,
> $z = 4$, $z' = 2+2i$ — **l'état exact de S4**, au caractère près. Un item de banque qui
> rejoue la position d'une étape ne mesure plus le modèle, il mesure la mémoire de l'écran.
> Le triplet $(1\,;\,2\,;\,1+i)$ conserve les trois arguments de table et n'apparaît nulle
> part dans la scène.

**Deux distracteurs sur le même modèle, et c'est voulu** : ce sont les **deux directions
fausses** que le dessin offre, et un élève qui les prend toutes deux pour plausibles n'a pas
un demi-modèle, il a le modèle entier.

**NBCOMPLEX2-38 — R5, application non explicite (caractériser $z' = az+b$).**
*(`primary_misconception: transformation-centre-oublie`)* — **c'est l'item qui solde le
savoir-faire de cadre à 0/34** (`maths-sm.yaml:229`, `maths-sexp.yaml:254`).
> La transformation du plan qui, à tout point $M$ d'affixe $z$, associe le point $M'$
> d'affixe $z' = (1-i)\,z + 2i$, est la composée d'une rotation et d'une homothétie de même
> centre. Lesquelles ?

| | texte | misconception |
|---|---|---|
| **A** | rotation d'angle $-\dfrac{\pi}{4}$, homothétie de rapport $\sqrt2$, **de centre le point d'affixe $2$** | **juste** |
| B | rotation d'angle $-\dfrac{\pi}{4}$, homothétie de rapport $\sqrt2$, **de centre $O$** | `transformation-centre-oublie` |
| C | rotation d'angle $-\dfrac{\pi}{4}$, homothétie **de rapport $1-i$**, de centre le point d'affixe $2$ | `homothetie-rapport-complexe` |
| D | rotation d'angle $\boldsymbol{+\dfrac{\pi}{4}}$, homothétie de rapport $\sqrt2$, de centre le point d'affixe $2$ | `rotation-sens-inverse` |

*Vérifications : $a = 1-i$, $b = 2i$ ; $\omega = \dfrac{b}{1-a} = \dfrac{2i}{1-(1-i)} =
\dfrac{2i}{i} = 2$ ✓, **recoupé par la définition** : $(1-i)\cdot 2 + 2i = 2-2i+2i = 2$ ✓ ;
$\vert a\vert = \vert 1-i\vert = \sqrt2$ ✓ ; $\arg(1-i) = -\dfrac{\pi}{4}$ ✓ (quatrième
quadrant, $\cos = \tfrac{\sqrt2}{2}$, $\sin = -\tfrac{\sqrt2}{2}$).*

> **Item refait en vague 1, pour trois motifs distincts.**
>
> **(a) Il rejouait un paragraphe** (pédagogie I3). Sa version précédente, $z' = iz+2-2i$,
> était **mot pour mot l'exemple travaillé commandé au §4.4**. Un item de banque qui reprend
> l'exemple de sa propre leçon mesure la mémoire, pas le savoir-faire.
>
> **(b) Il n'exerçait que deux grandeurs sur trois** (fidélité S4). Avec $\vert a\vert = 1$,
> le **rapport** ne se jouait jamais — alors que le savoir-faire de cadre en nomme trois :
> « *Caractériser une similitude directe (**rapport, angle, centre**)* »
> (`maths-sm.yaml:229`). $a = 1-i$ met les trois en jeu, et **un angle négatif** par-dessus.
>
> **(c) Son choix C n'instanciait pas le modèle qu'il portait** (fidélité S8). « Le $b$ pris
> pour le centre » n'est pas `transformation-centre-oublie`, dont la description est précise :
> « *L'élève écrit $z' = c\cdot z$ (centrée en $O$) pour une transformation de centre $A$,
> **oubliant les termes $z - z_A$*** » (`items.yaml:178-180`). **C devient un distracteur de
> rapport**, et `transformation-centre-oublie` n'est plus servi qu'une fois par item —
> proprement, en B.
>
> **`centre-lu-sur-b` est consigné comme modèle CANDIDAT, pas déclaré.** *Motif, et c'est un
> refus mesuré : je n'ai **aucune** donnée de fréquence. Aucune entrée de banque de cette
> notion ne demande de caractériser un $z'=az+b$ **donné** — les deux qui en approchent
> (`bank.yaml:1987`, `:1176`) **construisent** le centre depuis un couple point/image, elles
> ne le lisent pas sur une formule. Déclarer un troisième modèle neuf sur une intuition, dans
> la même livraison que deux modèles mesurés, serait exactement ce que le §8.2 reproche à
> l'inventaire existant.* **Porté au §13.3 comme candidat de la scène R6.**
>
> **$\omega = 2$ est conservé** : c'est le centre de `cp-r5-ecriture`
> (`checkpoints.yaml:204-205`) et celui de S4. *L'écho scène ↔ prose passe désormais par
> l'exemple travaillé du §4.4 ($z' = iz + 2-2i$) et par la reprise du §4.7 — **plus par
> l'item**.*

---

**Les TROIS items que le second modèle neuf exige** *(`multiplication-rotation-par-defaut`,
§8.2 a ; plancher ≥ 3)*.

**NBCOMPLEX2-39 — R5, application directe.**
*(`primary_misconception: multiplication-rotation-par-defaut`)*
> La transformation qui, à tout point $M$ d'affixe $z$, associe $M'$ d'affixe $z' = 3z$ est…

| | texte | misconception |
|---|---|---|
| **A** | une homothétie de centre $O$ et de rapport $3$, **sans aucune rotation** | **juste** |
| B | la composée d'une rotation d'un **quart de tour** et d'une homothétie de rapport $3$ | `multiplication-rotation-par-defaut` |
| C | une rotation de centre $O$ et d'**angle $3$** | `similitude-module-argument-roles` |
| D | la composée d'une rotation d'**angle $\pi$** et d'une homothétie de rapport $3$ | `reel-positif-donne-rotation` |

*Vérifications : $\vert 3\vert = 3$, $\arg(3) = 0$ ⟹ homothétie seule ✓. Le choix D est la
**forme canonique** du modèle qu'il porte (`items.yaml:169-174` : « *souvent d'angle $\pi$* »)
et le choix B en est la forme « quart de tour par défaut ». **Les deux sont donc bien
distingués.***

**NBCOMPLEX2-40 — R5, application non explicite.**
*(`primary_misconception: multiplication-rotation-par-defaut`)*
> On associe à tout point $M$ d'affixe $z$ le point $M'$ d'affixe $z' = (1+i\sqrt3)\,z$. De
> quel angle la direction $\big(\vec u, \overrightarrow{OM}\big)$ tourne-t-elle ?

| | texte | misconception |
|---|---|---|
| **A** | de $\dfrac{\pi}{3}$ | **juste** |
| B | d'un **quart de tour**, $\dfrac{\pi}{2}$ | `multiplication-rotation-par-defaut` |
| C | de $-\dfrac{\pi}{3}$ | `rotation-sens-inverse` |
| D | cela **dépend du point $M$** : l'angle n'est pas le même pour tous | `angle-lu-depuis-l-axe` |

*Vérifications : $\vert 1+i\sqrt3\vert = \sqrt{1+3} = 2$, $\cos = \tfrac12$,
$\sin = \tfrac{\sqrt3}{2}$ ⟹ $\arg = \dfrac{\pi}{3}$ ✓ (table `lesson.md:71-74`).
**Le choix D est exactement l'autre modèle neuf** : un élève qui croit que l'angle est une
**direction** croit aussi qu'il change avec le point. C'est le co-étiquetage légitime — deux
modèles atteignant un même distracteur —, pas un défaut de stem.*

**NBCOMPLEX2-41 — R5, application non explicite (lire $\arg(c)$ quand il n'est pas évident).**
*(`primary_misconception: multiplication-rotation-par-defaut`)*
> On multiplie tout le plan par $c = -1 + i$. De quel angle le plan tourne-t-il ?

| | texte | misconception |
|---|---|---|
| **A** | $\dfrac{3\pi}{4}$ | **juste** |
| B | $\dfrac{\pi}{2}$ — un quart de tour | `multiplication-rotation-par-defaut` |
| C | $-\dfrac{\pi}{4}$ | `argument-un-seul-signe` |
| D | $\sqrt2$ | `similitude-module-argument-roles` |

*Vérifications : $\vert -1+i\vert = \sqrt2$ ; $\cos\theta = -\dfrac{\sqrt2}{2}$,
$\sin\theta = \dfrac{\sqrt2}{2}$ ⟹ $\theta = \dfrac{3\pi}{4}$ ✓ ; l'angle de référence
$\arctan\!\left(\dfrac{1}{-1}\right) = -\dfrac{\pi}{4}$ est **exactement** ce que produit
`argument-un-seul-signe` (`items.yaml:26-32` : « *l'angle de référence […] sans vérifier
séparément les signes de $\cos$ et de $\sin$* ») ✓. **Cet item est le seul du paquet à
recruter un modèle de R1** : il relie le savoir-faire « lire un argument » au savoir-faire
« reconnaître une rotation », et c'est voulu — le symptôme du modèle neuf est que
**$\arg(c)$ n'est jamais calculé**, donc un item qui l'oblige à le calculer *pour de bon* est
le plus diagnostique des trois.*

### 8.4 Le solde de couverture, honnête

*Recompté intégralement après la vague 1. Comptes au niveau **ITEM** (un item compte une fois
par modèle, qu'il le porte en `primary_misconception` ou dans un distracteur) — c'est la
méthode déclarée d'`items.yaml:2294-2301`.*

| modèle | avant | après | items ajoutés | marge au plancher (3) |
|---|---|---|---|---|
| **`angle-lu-depuis-l-axe`** *(neuf b)* | — | **4** | -35, -36, -37 *(primaires)*, -40 D | **1** |
| **`multiplication-rotation-par-defaut`** *(neuf a)* | — | **3** | -39, -40, -41 *(primaires)* | **0 — déclarée** |
| `transformation-centre-oublie` | 3 | **4** | -38 *(primaire)* | 1 |
| `rotation-sens-inverse` | 3 | **6** | -37 D, -38 D, -40 C | 3 |
| `homothetie-rapport-complexe` | 4 | **6** | -36 D, -38 C | 3 |
| `similitude-module-argument-roles` | 3 | **5** | -39 C, -41 D | 2 |
| `produit-quotient-argument-operation` | 3 | **4** | -35 C | 1 |
| `produit-modules-additionnes` | 3 | **4** | -36 C | 1 |
| `reel-positif-donne-rotation` | 3 | **4** | -39 D | 1 |
| `argument-un-seul-signe` *(modèle de R1, recruté)* | 3 | **4** | -41 C | 1 |
| `mult-par-i-non-rotation` | 3 | **3** | *(aucun — §8.1)* | 0 |
| **`total_items`** | **34** | **41** | **+7** | — |

**Aucun item n'est retiré.** *`items.yaml:2302-2324` porte **onze** modèles à exactement 3 ;
tout retrait casserait un plancher, et cette livraison n'en fait aucun. **Elle en sort trois
de la marge nulle** (`similitude-module-argument-roles`, `reel-positif-donne-rotation`,
`argument-un-seul-signe`) **et en crée un** (`multiplication-rotation-par-defaut`).*

**Ce que ce paquet NE referme pas :**
- **`mult-par-i-non-rotation` reste à 3 items, tous en R0** — et **la scène ne le sert plus du
  tout** depuis le correctif B1 (§8.1). *La première version prétendait le viser à S1 ;
  c'était faux.* **Reste dû, et il est désormais moins couvert qu'on ne le croyait.**
- **`multiplication-rotation-par-defaut` part à marge nulle**, comme
  `angle-lu-depuis-l-axe` dans la version précédente. *Un modèle neuf à exactement trois items
  n'est confidence-bearing qu'au plancher : le moindre retrait le casse.* **Déclaré.**
- ⚠️ **Le paquet ajoute 0 % de niveau 3 contre une cible SM de 20 %** *(fidélité S7)*.
  `bac-reference.md:127-128` : « *Mathématiques : plusieurs exercices, avec une **question de
  synthèse terminale** portant la demande de niveau 3.* » **Les sept items neufs sont
  d'application (directe ou non explicite) ; aucun ne demande une synthèse en situation
  inhabituelle**, et par construction un QCM à quatre choix s'y prête mal. *La cible SM est
  40 / 40 / **20***(`maths-sm.yaml:39-42`)*, et cette livraison sert les deux premiers tiers
  seulement.* **C'est un manque déclaré, pas un verdict** — le champ `habilete` n'existant
  sur aucun item, **le rapport reste incalculable avant comme après** (§0.3, non-verdict
  ADR 0034). *Ce qui porterait le niveau 3 dans cette notion, c'est le sommet
  `[[exercise:r-bac]]`, pas le banc.*
- **Aucun des sept items neufs ne porte de champ `habilete`** : `DECISIONS-EN-ATTENTE` §3 /
  `REVIEW:107` (S5), tranché pour les 62 notions à la fois.
- **Les sept items neufs sont des QCM.** `REVIEW:201-204` (D13) dit que la lacune structurelle
  de cette notion est l'absence de rung en **réponse construite**. **Sept QCM de plus ne la
  referment pas**, et je ne prétends pas le contraire.

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
2. **Le mot « similitude » et ses dérivés — INTERDITS DANS LE PANNEAU, autorisés UNE fois
   dans la PROSE.** `maths-sexp.yaml:258` le réserve à SM ; `maths-sm.yaml:232` en exclut la
   forme indirecte ; `items.yaml:2067` l'emploie déjà sans le définir (`REVIEW:104`).
   Interdits **dans le panneau** : `similitude`, `similitudes`, `similaire` *(en position de
   transformation)*, `semblable` *(idem)*. **La scène dit : rotation, homothétie, rapport,
   angle, centre.**
   > **Décision retournée en vague 1 (fidélité S3), et la frontière n'est plus la même des
   > deux côtés.** La première version interdisait le mot **partout**, prose comprise. C'était
   > trop : le cadre SM le **nomme** comme savoir-faire (`maths-sm.yaml:229`), les dix
   > entrées de banque sont SM, et un élève SM qui découvre le mot dans un énoncé d'examen est
   > mal servi. **La prose l'emploie donc une fois, marquée de filière (§4.4) ; le panneau,
   > jamais.** *Motif de l'asymétrie : la prose peut porter une marque de filière en clair ; un
   > panneau servi aux deux filières, sans métadonnée `filiere` dans tout le corpus
   > (`REVIEW:113-120`), ne le peut pas.* **L'essai rouge du §11.4 reste armé sur le panneau.**
   *§13.2.*
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
5. **Aucune racine n-ième, aucune équation $z^n = a$.** **`exclusions_transversales`**,
   `maths-sexp.yaml:305` : « *Racines n-ièmes générales / résolution de zⁿ=a dans ℂ :
   SPÉCIFIQUE SM. SExp : second degré à coefficients réels seulement.* » ; recoupé par la
   `limite` du chapitre, `maths-sexp.yaml:257`. **Sans objet en R5**, et interdit quand même.
   Interdits : `racine n-ième`, `racine $n$-ième`, `racines de l'unité`, `z^n =`, `z^{n}`,
   `\rho e^{i\alpha}`, `2k\pi/n`, `k = 0,1`, `polygone régulier`.
   *(Citation corrigée en vague 1, fidélité S1 : la première version ne citait que la
   `limite` du chapitre et ignorait l'exclusion de niveau fichier, qu'elle déclarait
   inexistante.)*
6. **Aucune algèbre linéaire, aucune matrice.** **`exclusions_transversales`**,
   `maths-sexp.yaml:302` : « *Structures algébriques (lois de composition, groupes, anneaux,
   corps, **espaces vectoriels**) : SPÉCIFIQUE SM. Absent du cadre SExp.* » — et
   `maths-sm.yaml:343` : « *Réduction d'endomorphismes (valeurs propres, diagonalisation) :
   **Hors 2e Bac** ; les espaces vectoriels s'arrêtent aux bases/dimension/applications
   linéaires.* » ; plus `maths-sexp.yaml:306` pour le **déterminant**. *Côté SM,
   `structures_algebriques` est de surcroît un **autre** sous-domaine (`maths-sm.yaml:235`),
   et `espaces_vectoriels` y porte `lesson_slug: null` (`:258`) : il n'est enseigné nulle
   part.* Interdits : `matrice`, `\begin{pmatrix}`, `\begin{bmatrix}`, `déterminant`, `\det`,
   `application linéaire`, `endomorphisme`, `noyau`, `vecteur propre`, `base canonique`,
   `\mathbb{R}^2`.
7. **Aucune trigonométrie au-delà de la table de R1.** Interdits : `linéaris`, `Euler`,
   `e^{i\theta}+e^{-i\theta}`, `angle moitié`, `\cos^2`, `\cos^3`, `\sin^2`, `\sin^3`,
   `\tan`, `arctan`, `formule d'addition` *(la leçon l'emploie à `:123` ; la SCÈNE ne
   l'emploie pas)*. *§0.3 : la linéarisation est un savoir-faire à 0 %, et ce n'est pas le
   travail de cette scène.*
8. **Aucun décimal dans une lecture, aucun degré.** *C'est la frontière de PRÉCISION du §5.4,
   et elle est spécifique à cette scène.* La porte relève, **dans les lectures uniquement**,
   toute occurrence de `,` ou `.` entre deux chiffres, et toute occurrence de `°`, `degré`,
   `deg`. **Et pendant le balayage de S3, les lectures chiffrées n'affichent que « — »**
   (§6.1) — *une lecture vide n'est pas un décimal, et c'est précisément pour cela que le
   continuum est admis.*
   *Les **retours de pari** ont le droit d'écrire « environ $2{,}83$ » et « environ $115°$ » :
   ce sont des arguments d'ordre de grandeur adressés à un modèle faux, et ils sont **déclarés
   ici** pour que la porte les cherche au bon endroit — dans les lectures, pas dans le panneau
   entier. **Relu après la vague 1 : la seule occurrence de « $115°$ » disparaît avec le choix
   `angle-deux`, supprimé de S1 (§7.1) ; les décimales qui subsistent dans les retours sont
   $2{,}83$, $3{,}41$ et $2{,}22$ (S2) et $1{,}57$ (S4), toutes en position « ordre de
   grandeur ».***
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
   ($7 \times 5$ coefficients-points $\times\, 2$ centres), plus **15** en mode `enonce` —
   c'est un échantillon, pas une preuve. **La démonstration est la prose de R5, qui vient
   juste après** (`lesson.md:273-293`).
   *C'est le seul endroit du dépôt où cette réserve est structurelle : en physique, une scène
   qui vérifie une loi sur dix réglages est convaincante ; en mathématiques, dix cas ne
   prouvent rien, et un élève de SM le sait.*
   ⚠️ **Cette clause ne vit PLUS seulement ici : elle est REMONTÉE dans le paragraphe
   d'annonce du §4.1, adressée à l'élève, avant le marqueur** *(correctif de vague 1,
   pédagogie M3)*. *Motif : une réserve qui n'existe que dans un champ `fit_caveat` de
   descripteur n'est lue par personne — et celle-ci est la seule qui change ce que l'élève
   croit avoir obtenu en sortant de la scène. Elle reste ici **aussi**, pour le critique et
   pour la porte.*
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
8. **Le cran `les-deux` est de profondeur SM** (`maths-sexp.yaml:258` : « *SExp reste à
   translation/homothétie/rotation via $z'=az+b$* ») **et c'est l'état de S5.** Les deux
   autres crans — `rotation-A` ($\vert a\vert = 1$) et `homothetie-A` ($a$ réel positif) —
   **couvrent seuls le périmètre SExp**. *Décision déclarée au §5.2 D, pas un oubli ; §13.11
   dit comment la défaire.* **Et toute la preuve d'examen de ce document est SM**
   (`bank.yaml:22`, dix entrées sur dix) : ce que la scène « prépare » pour un élève SExp est
   **déduit du cadre, jamais mesuré sur des annales**.
9. **La scène ne prépare PAS la route inverse la plus fréquente du bac** *(sous-couverture
   relevée en vague 1)*. Elle enseigne à trouver le centre **à partir d'une formule**
   ($\omega = \dfrac{b}{1-a}$). Or deux entrées de banque sur dix demandent l'autre route :
   **le centre d'une rotation d'angle donné qui envoie un point sur un autre**,
   $\omega = \dfrac{z' - e^{i\theta}z}{1 - e^{i\theta}}$ — `bank.yaml:475` (2020 N, où elle
   est « *résolue en $p$ une fois pour toutes* ») et `bank.yaml:1176` (2021 N, qui la pose en
   toutes lettres et renvoie explicitement au sujet 2020). **Aucune étape ne la fait faire, et
   aucun des sept items neufs ne la demande.** *C'est le même geste algébrique — un point fixe
   qu'on résout — appliqué à une donnée différente. **Reste dû**, et c'est de la prose et des
   items, pas de la scène.*

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
| N3 | $\Omega M$, $\Omega M'$ et leur quotient **aux 70 états** ($35 \times 2$ centres), **recalculés par la seconde implémentation de la porte pour CHACUN** — les tables **B** et **D** de la spec ne sont qu'un **contrôle ponctuel**, jamais la source | tables **B** et **D** en contrôle | égalité de chaîne avec `distances` et `rapport` ; **« — » quand $M = \Omega$**. *(Reformulé en vague 1, fidélité S9 : la première rédaction laissait croire que la porte comparait à une table de cinq lignes.)* |
| N4 | $\arg(c)$ aux 7 crans | $0$ · $0$ · $\tfrac{\pi}{2}$ · $\pi$ · $\tfrac{\pi}{4}$ · $\tfrac{\pi}{2}$ · $\tfrac{\pi}{6}$ | égalité de chaîne, **fractions de $\pi$**, dans $]-\pi;\pi]$ |
| **N5** | **LA LIGNE DU MODÈLE NEUF** : `angle` et `argument-image` sont **deux lectures distinctes**, aux 35 couples — **égales exactement aux points $z \in \{2 ; 4\}$ (axe réel) et différentes aux trois autres** | table **C** du §5.3 | **égalité de chaîne dans les DEUX sens** ; *une scène où `angle` = `argument-image` partout, ou jamais, doit rougir* |
| N6 | l'**invariance de l'écart** : à $c$ fixé, `angle` est **identique au caractère près** aux 5 points ; à $\vert c\vert$ fixé, `rapport` est identique aux 5 points. **ET la RÉDUCTION mod $2\pi$** : à $c = -2$, l'écart brut vaut $-\pi$ aux points $1+i$ et $2i$, et la scène doit afficher $\boldsymbol{+\pi}$ | $\tfrac{\pi}{6}$ ; $2$ ; **$+\pi$ jamais $-\pi$** | **égalité de chaîne exacte**, aux 7 coefficients et aux 35 couples ; *toute lecture `angle` hors de $]-\pi;\pi]$ fait rougir* (§5.4, fidélité S6) |
| N7 | en mode `enonce` : $z'$, $\omega$, $\vert a\vert$, $\arg(a)$ et $\dfrac{z'-\omega}{z-\omega}$ aux **15** états ($3 \times 5$), **tous recalculés par la seconde implémentation** — **$z'$ depuis $a$ ET $b$, jamais depuis $a$ et $\omega$** (§5.3 E), et $\omega$ recalculé **deux fois** (par $\dfrac{b}{1-a}$ **et** par la résolution de $\omega = a\omega+b$) | table **E** du §5.3 et §5.2 D **en contrôle ponctuel** | égalité de chaîne ; **$\dfrac{z'-\omega}{z-\omega}$ identique au caractère près aux 4 points non fixes**, aux 3 transformations |
| N8 | le **point fixe** : `point-fixe` vaut $z_\Omega$, et l'image du point fixe est **le point fixe lui-même** | $2$ (S4, `rotation-A`, `homothetie-A`) · $1+i$ (`les-deux`) | égalité de chaîne, **et** $z' = z$ au caractère près |
| N9 | les **crans** : `coefficient` en a exactement 7, `point` 5, `centre` 2, `enonce` 4 ; **aucune valeur intermédiaire, aucune borne continue** | — | exact |
| N10 | **aucun décimal, aucun degré** dans les neuf lectures, aux 70 états | — | §9.8 ; *relevé sur les lectures seules, pas sur le panneau* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/unité est lu sur **les graduations entières des deux axes** (leçon de la porte du
champ magnétique). Lancée à $1\,280$ **et** 390 px au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`isotropie`** | **deux volets.** (a) le facteur px/unité mesuré sur l'axe des réels et sur l'axe des imaginaires est **identique à $\le 0{,}5\%$**, aux deux largeurs, et le **cercle unité** mesure le même nombre de pixels horizontalement et verticalement à $\le 1$ px ; (b) **le cadre est CARRÉ** — demi-largeur $=$ demi-hauteur de la fenêtre de données, et le plateau lui-même est carré au pixel près | un repère où `x_length/x_span ≠ y_length/y_span` doit rougir **seul** — *c'est le défaut RÉEL du 2026-08-14 dans cette notion (`SCENE-CONTRACT.md:186-203`, 36,9 % d'écart)* ; **et une fenêtre paysage doit rougir sur le volet (b) seul** — *c'est le défaut de la première version de cette spec (§5.1)* |
| **`aucune-lecture-chiffree-pendant-le-balayage`** | **pendant** le balayage de S3 : les neuf lectures affichent **« — »** et **aucun chiffre** n'apparaît dans le panneau qui n'y était pas avant ; les deux segments et l'arc, eux, **bougent** (mesuré aux pixels sur trois positions du balayage) | **après** le relâchement : les lectures redeviennent **exactement** celles d'avant (même chaîne, au caractère près) et l'état n'a pas changé. **Un balayage qui afficherait un décimal doit rougir ; un balayage inerte aux pixels aussi** ; *et le balayage présent à une autre étape que S3, ou avant la révélation de S3, fait rougir `fuite-inter-etapes`* |
| `point-a-sa-place` | $M$ et $M'$ sont dessinés **à la position que leur affixe demande**, à $\le 2$ px, aux 70 états | un $M'$ dessiné depuis un autre nombre que celui affiché doit rougir ; une position **plafonnée** au bord du cadre aussi |
| `longueurs-au-rapport` | le rapport des **longueurs en pixels** des segments $\Omega M'$ et $\Omega M$ égale la lecture `rapport`, à $\le 2\%$, aux 70 états | un segment dessiné à une autre échelle que l'autre doit rougir **seule** |
| **`arc-entre-les-bonnes-directions`** | l'arc tracé **part de la direction $\Omega M$ et arrive à la direction $\Omega M'$** — mesuré aux pixels, en lisant les deux extrémités de l'arc et en les comparant aux deux directions ; son **sens** suit le signe de `angle` | **un arc tracé depuis l'AXE RÉEL doit rougir** *(c'est la misconception `angle-lu-depuis-l-axe` posée dans le code, et c'est le sabotage le plus important de la campagne)* ; un arc tracé dans le sens inverse aussi |
| `point-fixe-immobile` | aux 5 points, l'image du point fixe est **au même pixel** que lui ($\le 1$ px) ; et **hors** du point fixe, $M'$ est à $\ge 8$ px de $M$ | un point fixe qui bouge doit rougir ; un $M'$ confondu avec $M$ ailleurs aussi — *les deux sens, comme le géostationnaire* |
| `une-seule-etiquette-au-point-fixe` | quand $M' = M$, **une seule** étiquette est dessinée, et elle porte « $M = M'$ » | deux étiquettes superposées doivent rougir **seules** |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**, leçon du solide de révolution) ; aucun arc ; aucun anneau ; aucune lecture-réponse dans le DOM. **À S5 : aucun $\Omega$ — ni point, ni étiquette, ni affixe, ni mention dans la description lue** (absence TOTALE, règle du tremplin). **À S3 et S5 : $M'$ EST présent, à l'ENCRE** (§7.6) | après l'engagement : $M'$, l'arc, l'anneau et les lectures apparaissent, et l'accent avec. **À S3 et S5, un $M'$ ABSENT avant le pari doit rougir aussi** — l'exception est mesurée dans les deux sens |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une couleur posée en dur doit rougir **seule** |
| `quadrillage-opaque` | les **nœuds** du quadrillage ont la même valeur que ses **lignes**, à $\le 2$ niveaux | un quadrillage peint en transparence trait par trait doit rougir *(règle du banc de modulation)* |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune des chaînes interdites de l'étape courante (consigne, retours, lectures et région vivante confondues), et contient bien celles que l'étape autorise et emploie | écrire « rapport » dans un retour de S1, ou « centre » dans un retour de S3, doit rougir **seule** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.6 contre le descripteur, et énumère les états ATTEIGNABLES avant chaque étape : `coefficient` ouvert à S1, S3, S5 ; `point` à S2, S3, S4, S5 ; `centre` **qu'à S4 et S5** ; `enonce` **qu'à S5** ; **`balayage` QU'À S3, et seulement après la révélation** ; et `angle`/`argument-c`/`argument-image` **absents du DOM avant S3**, `point-fixe`/`ecriture` **avant S4**, `rapport-inverse` **avant S5** | ouvrir `centre` dès S3, faire exister `rapport-inverse` à S4, ou ouvrir `balayage` à S2 ou avant la révélation de S3, doit rougir |
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
8 bis. **supprimer la réduction mod $2\pi$** (afficher l'écart brut) → **N6 seule**, et
    **seulement à $c = -2$** : l'écart y tombe à $-\pi$ au lieu de $+\pi$, aux points $1+i$ et
    $2i$ (§5.4, fidélité S6). *Un sabotage qui ne rougirait à aucun autre coefficient est le
    signe que la sonde est au bon endroit ;*
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
22 bis. **rendre la fenêtre PAYSAGE** ($18 \times 10$, la première version de cette spec) →
    **`isotropie` volet (b) seule**, *et `point-a-sa-place` sur les trois états que le critique
    a trouvés : centre $O$ / $c=2i$ / $z=4$ ; centre $A$ / $c=-2$ ou $c=2i$ / avec l'ancien
    cran $-2+2i$. **Ce sabotage est le seul de la campagne à reproduire un défaut RÉEL de la
    spec, et il doit être joué avec l'ancien jeu de crans*** ;
22 ter. **faire afficher un chiffre pendant le balayage** (n'importe lequel des neuf) →
    **`aucune-lecture-chiffree-pendant-le-balayage` seule** ;
22 quater. **rendre le balayage inerte** (le contrôle existe, rien ne bouge aux pixels) →
    **la même famille, dans l'autre sens** ; *un contrôle qui ne fait rien enseigne qu'il est
    décoratif (leçon du bouton de tension au banc d'électrolyse)* ;
22 quinquies. **ouvrir le balayage à S2, ou avant la révélation de S3** →
    **`fuite-inter-etapes` seule** ;
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
  "controles": ["coefficient", "point", "centre", "enonce", "balayage"],
  "etat": ["c", "z", "centre", "enonce", "reference"],
  "valeurs": {
    "c": ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"],
    "z": ["1+i", "2i", "2", "4", "1-i"],
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
> crans **sauf le balayage**, qui n'a pas de bornes déclarables au sens du registre : il
> parcourt un **cercle**, il ne pose aucun état, et il n'écrit aucune clé d'`etat`
> (§6.1). *Conséquence : `balayage` est un contrôle qu'aucune clé d'état ne suit — c'est la
> **deuxième** particularité à vérifier contre `validate-content`, qui exige aujourd'hui
> qu'un contrôle ouvert par une étape corresponde à quelque chose de réglable (§15.4). Si le
> validateur le refuse, **c'est lui qu'il faut étendre** : un contrôle d'exploration muet est
> une pièce nouvelle, pas une irrégularité.*

**Descripteur** (`content/maths/nombres-complexes-2/media/plan-complexe-transformation.json`),
mêmes clés qu'au banc de diffraction : `slug`, `tool: "scene2d"`, `type: "manipulable"`,
`scene`, `title_fr`, `caption_fr`, `etapes[]` (`id`, `titre`, `consigne`, `pari{question,
choix[]}`, `suite`, `controles[]`, `lectures[]`, `etat{}`, **pas d'`etat_revele`**),
`boundary`, `boundary_guard_details`, `fit_caveat`, `param_manipulation_guide`,
`fallback_note`, `pedagogy_wiring{why_manipulable, predict_then_reveal, misconceptions[]}`,
`spec_ref`, `adr_ref`.

**`pedagogy_wiring.misconceptions` (dix ids : les huit existants du §8.1 + les DEUX neufs)**
— *`validate-content` exige qu'un pari de scène nomme un modèle DÉCLARÉ (ADR 0041, addendum du
manège) : **`angle-lu-depuis-l-axe` ET `multiplication-rotation-par-defaut` doivent être
déclarés dans `items.yaml` AVANT que la scène soit validée**, sans quoi la porte de validation
échoue en dur. **`mult-par-i-non-rotation` n'y figure PAS** (§8.1).*

**`fallback_note` à écrire :** sans JavaScript et à l'impression, le panneau disparaît. **La
figure `rotation-homothetie`, plus bas dans le chapitre, couvre le cas $c = 1+i$, $z = 3$,
centre $O$** — c'est-à-dire **exactement le cas qui ne distingue pas l'angle de l'argument de
l'image** (§0.1 d). *L'élève sans JavaScript perd donc les trois faits centraux : le rapport
comme quotient, l'angle comme écart, et le centre comme point fixe. **Le coût est réel et il
est écrit** ; §13.10 dit ce qu'il faudrait commander pour le payer.*

**Ordre de construction :**
1. **item-author** déclare **les DEUX modèles neufs** dans `items.yaml` (§8.2 a et b) et écrit
   les **sept** items (§8.3). *Sans cela, rien d'autre ne valide.*
1 bis. **content-author** écrit la **reprise de `cp-r5-ecriture`** (§4.7) — c'est un livrable
   de cette spec, et il ne dépend d'aucun code.
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
   trois portes de RULES §5 non passées, le PDF officiel scanné sans couche texte.
   **Défaut : on construit quand même, et on le déclare** — les `limites` **et les
   `exclusions_transversales`** citées au §1 sont toutes `source: derived — À VALIDER`.
   *Pour défaire :* faire passer les trois portes **avant** de construire. **Coût du défaut :
   si une borne dérivée est fausse, le §9 interdit des formes que le programme autorise (perte
   pédagogique silencieuse) ou autorise des formes qu'il interdit (brèche de cadre).**
   **C'est la décision la plus lourde de ce document, et elle appartient à l'humain.**
   > ⚠️ **Corrigé en vague 1 (fidélité S1) : cette entrée affirmait « aucune clé `exclusions`
   > dans les deux fichiers ». C'était faux** — `exclusions_transversales` existe au niveau du
   > fichier (7 entrées SM, 8 SExp), et quatre mordent sur cette scène (§1). **Ce qui reste à
   > router vers research-lead est plus étroit** : la **granularité** diffère de
   > `pc-physique-chimie.yaml`, qui porte des `exclusions` **par sous-domaine** ; les fichiers
   > maths n'en ont qu'au niveau fichier, et **aucune borne propre au sous-domaine
   > `nombres_complexes`**.
2. **Le mot « similitude » : interdit où ?** (§9.2, §4.4.) **Défaut RETOURNÉ en vague 1
   (fidélité S3) : interdit dans le PANNEAU, autorisé UNE fois dans la PROSE, marqué SM.**
   *Motifs : `maths-sm.yaml:229` le nomme comme savoir-faire, les dix entrées de banque sont
   SM (`bank.yaml:22`), et `items.yaml:2067` l'emploie déjà sans l'avoir défini
   (`REVIEW:104`) — la prose du §4.4 régularise cet emploi au passage.* *Pour défaire dans un
   sens :* le réinterdire partout (c'était la version 1) — **coût : un élève SM rencontre le
   mot pour la première fois dans un sujet d'examen.** *Pour défaire dans l'autre :* l'ouvrir
   au panneau — **coût : un panneau servi aux deux filières écrit un mot que le cadre réserve
   à l'une, sans qu'aucune métadonnée `filiere` n'existe dans le corpus pour l'en empêcher.**
3. **Une sixième étape sur la lecture de $w$ ?** (§0.2, §2.6, §9.1.) **Défaut : NON dans
   cette scène — et une SECONDE SCÈNE, PRÉVUE ENSUITE** *(passée de « recommandée » à
   « prévue » en vague 1)*. C'est R6, et la scène est en R5 ; l'écart de phase est exactement
   ce que la vague 1 du banc d'électrolyse a refusé.
   **Le cahier des charges de la scène R6, déjà connu :** trois points et le rapport
   $w = \dfrac{z_C-z_A}{z_B-z_A}$, sur le même moteur et les mêmes pièces ; les misconceptions
   `lecture-w-module-argument` (3 items) et `ensemble-points-locus-confondu` (3 items) y
   trouveraient enfin autre chose qu'un triangle gelé ; **elle porterait le savoir-faire
   `bank.yaml:475` / `:1176`** — le centre d'une rotation reconstruit depuis un couple
   point/image, $\omega = \dfrac{z' - e^{i\theta}z}{1-e^{i\theta}}$, que **cette** scène ne
   prépare pas (§10.9) ; et elle est le **seul endroit sensé** pour trancher le modèle
   candidat **`centre-lu-sur-b`** (§8.3, NBCOMPLEX2-38), dont la fréquence n'est aujourd'hui
   mesurée par rien. *Elle refermerait aussi `REVIEW:132-137` (S8), le lieu « rapport
   imaginaire pur ⟹ cercle de diamètre » enseigné pour la première fois dans un retour
   d'item.*
4. **Le point $M$ doit-il être librement déplaçable ?** (§2.6, §5.2 B, §6.1, §10.6.)
   **Défaut RETOURNÉ en vague 1 (pédagogie I6) : l'HYBRIDE.** Trois options, et la raison de
   chacune :

   | option | ce que c'est | ce qu'on gagne | ce qu'on perd |
   |---|---|---|---|
   | **(a) discret pur** *(version 1)* | cinq positions, rien d'autre | toute lecture exacte, une porte simple | on ne voit jamais l'arc garder son ouverture **pendant** que les directions tournent — le fait même de S3 |
   | **(b) HYBRIDE — DÉFAUT** | les cinq crans **plus** un balayage continu **muet** à S3, après la révélation, pendant lequel les neuf lectures affichent « — » | le geste continu **là où il dit quelque chose**, sans un seul décimal ; les crans exacts intacts | une famille de porte de plus, et un contrôle qui n'écrit aucune clé d'état (§12) |
   | **(c) libre avec décimales** | $M$ traîné partout, lectures arrondies | le confort d'un GeoGebra | **la scène afficherait « $0{,}52$ rad » là où le bac écrit $\dfrac{\pi}{6}$** — elle enseignerait la mauvaise écriture |

   *Pour défaire vers (a) :* retirer le contrôle `balayage`, sa famille de porte et ses trois
   essais rouges (22 ter, quater, quinquies) ; **rien d'autre ne bouge** — c'est un ajout
   strictement additif. *Pour défaire vers (c) :* lever le §9.8 et la ligne N10 de la porte.
   **Je ne recommande toujours pas (c)** : c'est précisément ce qui distingue une scène de
   maths d'une scène de physique.
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
   **Défaut : ce document NE l'est PAS.** Il revendique **huit** modèles existants pour un
   rung et en déclare **deux** neufs ; **quinze restent non revendiqués**. *Pour défaire :*
   une passe pedagogy-architect sur la notion entière, avec assignation rung par rung —
   **c'est un travail distinct, plus gros que cette scène**, et la REVIEW le route déjà.
   **Reste dû.**
8. **`angle-lu-depuis-l-axe` doit-il être UN modèle ou DEUX ?** (§8.2 b.) **Défaut : UN**,
   parce que les deux
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
11. **La scène est-elle servie aux élèves SExp — et S5 est-elle de profondeur SM ?** (§0.3,
    §5.2 D, §10.8, `REVIEW:113-120`, S6 ; fidélité S2.) **Défaut : OUI servie, et OUI, l'état
    de S5 (`les-deux`) est de profondeur SM — déclaré, pas caché.**
    *Le cœur de la scène est dans les deux cadres* (`maths-sexp.yaml:250` écrit `z' = az + b`
    en toutes lettres), *contrairement à R4 qui est une exclusion SExp.* **Mais le cas MIXTE**
    ($\vert a\vert \neq 1$ **et** $\arg a \neq 0$) **est réservé à SM par
    `maths-sexp.yaml:258`**, et c'est l'état de départ de S5. **`rotation-A` et
    `homothetie-A` couvrent seuls le périmètre SExp**, et ils sont tous deux des crans réels
    de la scène.
    *Pour défaire, si le scoping filière est un jour tranché :* **S5 bascule sur
    `rotation-A` pour SExp — c'est un changement d'`etat` dans le descripteur, rien de plus.**
    *Coût de ce défaut-là : le pari de S5 perd la moitié de ses distracteurs, puisque avec
    $\vert a\vert = 1$ le rapport ne se joue plus.* **Et rappel : les dix entrées de banque
    sont SM (`bank.yaml:22`) — ce que la scène prépare pour un élève SExp est déduit du cadre,
    jamais mesuré.**
12. **Le dossier `web/src/lib/scene3d/` s'appelle toujours `scene3d` alors qu'il porte
    huit scènes PLANES sur quatorze.** **Défaut : on n'y touche pas** — c'est une question
    héritée, déjà posée par le banc d'électrolyse (son §13.14). *Pour défaire :* un renommage
    en `scenes/`, qui touche quatorze portes, quatorze panneaux et le registre. **Décision de
    propriétaire, à prendre indépendamment de cette scène, et de préférence entre deux
    livraisons.**
13. **Le TITRE de R5 nomme les deux réponses de S1.** (§3, pédagogie I4.)
    `lesson.md:269` : « *R5 — Interprétation géométrique : **rotation et homothétie*** ».
    **Défaut : on ne le change pas, et on déclare le coût** — renommer un titre de rung
    dépasse le périmètre d'une spec de scène. *Pour défaire :* content-author remplace le
    titre par une **question**, par exemple « *Que fait, géométriquement, une multiplication
    par un complexe fixe ?* », qui reprend l'accroche de R0 (`lesson.md:9`) et n'énonce
    aucune des deux réponses. **Coût du défaut : un élève qui lit le titre sait qu'il y a une
    homothétie quelque part — il ne sait toujours pas laquelle des deux moitiés agit, ni sur
    quoi, et c'est cela que S1 fait choisir. Coût du correctif : une ligne, et une passe de
    cohérence sur les renvois « chapitre 6 » du corpus.**
14. **`cp-r5-ecriture` doit-il mesurer la forme développée $z' = az+b$ ?** (§4.7, §7.4,
    pédagogie I2/I7.) **Défaut : NON pour le point d'arrêt, OUI pour la reprise et pour le
    banc.** Le point d'arrêt garde ses quatre choix sur la forme **factorisée** ; une
    **reprise** (30 à 45 mots) pose la question de la forme développée sans l'évaluer ;
    **NBCOMPLEX2-38 est le seul objet qui la MESURE**, et il est au banc de fin. *Pour
    défaire :* un cinquième choix au point d'arrêt, ou un `cp-r5-forme-developpee` séparé —
    **décision d'item, que je ne prends pas ici.** **Coût du défaut, mesuré au §7.4 : un élève
    qui réussit `cp-r5-ecriture` n'a rien démontré sur $z'=az+b$, et rien dans le rung ne le
    lui dit.**
15. **L'arbitrage « second degré dans $\mathbb{C}$ » est-il clos ?** (§0.3, fidélité S10.)
    **Défaut : NON — c'est un SIGNAL ouvert, pas un fait acquis, et il sort du périmètre de
    cette scène.** Les deux cadres assignent l'outil au chapitre **de cette leçon**
    (`maths-sm.yaml:221`, `:224` ; `maths-sexp.yaml:247`, `:249`) ; l'arbitrage propriétaire
    consigné dans `bank.yaml:77-95` l'a placé dans la **leçon sœur**. **La divergence
    cadre ↔ corpus subsiste**, et elle se route à `research-lead`. *Cette spec n'y touche
    pas ; elle refuse seulement de l'écrire comme réglée, ce que sa première version faisait.*

---

## 14. Fait quand

La scène est **faite** quand, et seulement quand :

0. ⚠️ **RÈGLE ARMÉE EN VAGUE 1 (pédagogie B2), à vérifier AVANT tout le reste : la valeur de
   CHAQUE choix de pari est recalculée depuis le modèle que son étiquette nomme.** Pour les
   vingt choix de la scène (5 étapes × 4) **et** pour les vingt-huit choix des sept items
   neufs, on refait le calcul que le texte du choix annonce, et on vérifie (a) qu'il donne
   bien le nombre affiché, (b) qu'il **diffère de la bonne réponse**. *Motif : le choix
   `argument-rapport` de S2 annonçait « on multiplie par l'argument de $c$ » et affichait un
   nombre obtenu avec $\pi$ au lieu de $\dfrac{\pi}{2}$ — le distracteur ne pointait plus vers
   son modèle. **Un distracteur dont la valeur ne se déduit pas de son propre modèle ne
   diagnostique rien : il est du bruit qui ressemble à un diagnostic.*** *Et le sous-cas (b)
   est le défaut de stem attrapé au §7.2 a.*
1. **Les DEUX modèles neufs** sont **déclarés** dans `items.yaml` (§8.2 a et b) et les
   **sept** items du §8.3 existent, chaque distracteur portant un `misconception:` nommé.
   **Et `mult-par-i-non-rotation` n'apparaît NI dans `pedagogy_wiring`, NI dans un choix de la
   scène** (§8.1).
1 bis. La **reprise de `cp-r5-ecriture`** (§4.7) est écrite, et la phrase de cadrage avant le
   marqueur aussi.
2. Le test unitaire `test-plan-complexe.mjs` passe sur **les cinq tables du §5.3**, en formes
   exactes **et** en flottants, **et sur les 70 + 15 états**, pas seulement sur les lignes
   tabulées.
3. `validate-content` passe : scène enregistrée, contrôles connus, **tout contrôle ouvert par
   au moins une étape**, aucun `revele_apres_h`, aucun `etat_revele` (déclaré), chaque pari
   nommant un modèle déclaré.
4. La porte `scene-plan-complexe.mjs` sort **VERT** à $1\,280$ **et** à 390 px, **lancée trois
   fois** (une porte instable est pire qu'une porte absente).
5. `--essai-rouge` : **les 29 sabotages du §11.4 font crier la famille annoncée, et elle
   seule** (24 + les cinq ajoutés en vague 1 : 8 bis, 22 bis à 22 quinquies). Un sabotage qui
   n'atteint pas la porte sort **AMBIGU**, jamais vert. **Le n° 22 bis — la fenêtre paysage —
   se rejoue avec l'ANCIEN jeu de crans**, sans quoi il ne reproduit pas le défaut qu'il
   garde.
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
   nombres de $21{,}7$ px/unité à 390 px et de $31$ px/unité à $1\,280$ px supposent un
   **plafond de hauteur de plateau de 560 px** que j'ai **choisi**, pas relevé sur le rendu
   (§5.1).
2. **Je n'ai pas lu le code des panneaux existants.** `disposer`, `useSceneRendu`, `usePari`,
   `Plateau`, `jetons-figure.ts` sont nommés d'après l'ADR 0041 et les specs sœurs ; je n'ai
   vérifié ni leurs signatures, ni qu'un plateau **CARRÉ** s'y insère sans retouche — **et
   c'est plus contraignant qu'un plateau paysage**, puisque les huit scènes planes livrées
   sont toutes en format large. **À vérifier par frontend-builder avant de commencer.**
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

*Ajouts de la vague 1 — ce que la révision a appris sur sa propre honnêteté :*

9. ⚠️ **J'ai cité une commande que je n'avais pas lancée, et elle disait le contraire du
   vrai.** La version 1 du §1 écrivait « *`grep -n "exclusions" docs/cadre/curriculum/maths-*.yaml`
   ⇒ **0*** » pour conclure que les fichiers maths n'ont pas d'exclusions. **La chaîne
   cherchée est contenue dans `exclusions_transversales`** : si la commande avait tourné, elle
   aurait trouvé. **Deux fautes en une** — chercher une chose sous **une seule de ses formes**
   (ADR 0036), et **attribuer à un instrument un résultat qu'on n'a pas mesuré** (ADR 0040 :
   *« vérifier le BANC avant le produit »*). *Corrigé au §1 et au §13.1. **Toutes les autres
   commandes citées dans ce document ont été relancées pendant la révision** ; celles du §0.1
   sont des `grep` et des `ls` dont j'ai relu la sortie.*
10. **La réduction mod $2\pi$ n'est exercée qu'à la BORNE.** J'ai cherché sur les 70 états un
    écart brut strictement hors de $[-\pi;\pi]$ : **je n'en ai trouvé aucun**. Les deux seuls
    cas sont $-\pi$ exactement ($c=-2$ sur $1+i$ et sur $2i$). *La règle du §5.4 est donc
    juste et sa porte utile, mais elle ne garde qu'un cas limite — **pas** un cas général, et
    je ne veux pas laisser croire le contraire.*
11. **Je n'ai pas revérifié les 70 états un par un après le changement de cran.** J'ai
    recalculé **les bornes** (par $\vert c\vert_{\max} \times \vert z\vert_{\max}$ et par
    $2 + \vert c\vert_{\max}\vert z-2\vert_{\max}$) et **les cases extrêmes**, pas les 70
    images. *C'est ce raisonnement-là qui avait échoué la première fois, parce que je l'avais
    appliqué à un cadre rectangulaire ; il est valide sur un cadre carré, mais **c'est le test
    unitaire du §14.2 qui doit le prouver, pas ce document**.*
12. **Le balayage de S3 est une pièce NEUVE du dépôt** : un contrôle qui n'écrit aucune clé
    d'état et n'affiche aucun nombre. Aucune des treize scènes livrées n'en a. *Je n'ai
    vérifié ni que `validate-content` l'accepte, ni que `usePari`/`Plateau` savent ouvrir un
    contrôle après une révélation sans le compter comme un réglage d'étape (§12, §15.4).*
13. **Je n'ai pas mesuré la fréquence de `centre-lu-sur-b`** (§8.3). C'est précisément
    pourquoi il est consigné comme **candidat** et non déclaré : refuser de déclarer un modèle
    faute de mesure est le seul geste honnête disponible, et il est écrit à côté des deux
    modèles que j'ai déclarés parce que je les ai mesurés.
