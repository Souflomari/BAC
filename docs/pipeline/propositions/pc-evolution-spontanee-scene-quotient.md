# spec — manipulable 2D `echelle-des-quotients` (PC · `evolution-spontanee`, **R2**)

**Statut : PROPOSITION, non construite — pas encore revue (vague 1 à faire).**
Écrite le 2026-09-25 par pedagogy-architect.

Il serait le **quinzième manipulable de première partie** et le **neuvième PLAN** si rien
n'est livré entre-temps — compte repris de la spec sœur du plan complexe (« Quatorzième
manipulable de première partie, huitième PLAN »,
`docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md:102`), **non recompté
contre le registre** (§15.1). Mêmes pièces que le banc d'électrolyse, le banc de
modulation, le tremplin, la corde, la cuve et le plan complexe : `"tool": "scene2d"`,
canvas 2D, aucune 3D.

**Ce que ce document est.** Le cadrage pédagogique complet : le trou **mesuré** qui le
justifie, l'arbitrage de notion hôte **écrit** (la scène ne va pas là où la commande la
plaçait, et le motif est un nombre), la frontière officielle, le placement, cinq étapes à
pari, les contrôles, l'état, les lectures avec leur précision, la table de ce qui ne doit
pas être à l'écran avant chaque pari, **un modèle de misconception neuf** avec ses trois
items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose
finale, ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu, le
panneau et le registre de frontend-builder ; les items d'item-author. Le §4 **décrit** les
paragraphes à écrire ; il ne les rédige pas. **Aucun fichier de contenu n'a été touché**
pour l'écrire : ni `lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`, ni une ligne de
code.

Marqueur : `[[embed:echelle-des-quotients]]` · clé de registre : `echelle-des-quotients` ·
sélecteur de porte : `[data-scene="echelle-des-quotients"]`.

**Numérotation des chapitres, mesurée avant d'écrire.** La convention de la notion est
`chapitre N = R(N−1)`, et elle est **écrite par la revue de vague 1** :
`REVIEW-2026-09-19.md:5` — « *Chapitres : 1 = R0 · 2 = R1 · 3 = R2 · 4 = R3 · 5 = R4 ·
6 = R5 · 7 = R6* ». Elle est confirmée par le texte rendu : `lesson.md:145` « *Reviens au
critère du chapitre 3* » depuis R3 désigne bien R2 ✓ ; `lesson.md:152` renvoie au même ✓ ;
`bank.yaml:85` « *(chapitre 3)* » pour l'expression de $Q_r$ ✓. **Donc R2 = chapitre 3**,
et toute prose commandée ici emploie cette numérotation-là, jamais « R2 ».
*Le critique de fidélité de la vague 1 a vérifié « **les 14 renvois numérotés du corpus :
tous justes** » (`REVIEW-2026-09-19.md:6-7`). C'est la notion la plus sûre du corpus sur ce
point, et cette spec ne doit rien y casser.*

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/pc/evolution-spontanee/media/echelle-des-quotients.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/pc/evolution-spontanee/spec-scene-quotient.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/quotient-modele.ts — le modèle (frontend-builder) : Qr, la position logarithmique, le verdict, les espèces
    CHEMIN À CRÉER: web/src/lib/scene2d/quotient-rendu.ts — le rendu 2D (frontend-builder) : l'axe décimal, le pivot K, le repère Qr,i, le bécher et sa lame
    CHEMIN À CRÉER: web/src/components/notion/scene/QuotientPanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-quotient.mjs — le test unitaire du modèle (les 75 états, les trois K)
    CHEMIN À CRÉER: web/scripts/scene-quotient.mjs — la porte de la scène (+ son `--essai-rouge`)

---

## 0. Pourquoi cette notion maintenant — le trou, mesuré

**Aucune spec antérieure n'a pesé `pc/evolution-spontanee`**, ni comme gagnante ni comme
dauphine : `rg -ril "evolution-spontanee" docs/pipeline/propositions/ content/*/*/spec-scene-*.md`
⇒ **0**. Cette proposition doit donc se justifier **entièrement** par un trou **mesuré** —
même règle qu'au banc de diffraction, à la corde, au banc d'électrolyse et au plan
complexe.

**`content/pc/evolution-spontanee/` ne porte aucun `spec.md`** (contenu du dossier :
`lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`,
`REVIEW-2026-09-19.md`, `media/`). Aucune spec n'y a jamais prescrit d'`[[embed:]]` :
`rg -c '\[\[embed:' content/pc/evolution-spontanee/lesson.md` ⇒ **0**. **Cette scène ne
solde donc aucune dette écrite** : `dette-manipulable` ne bouge pas, `media-manipulable`
monte d'une notion.

### 0.1 Les neuf faits, chacun avec la commande qui le produit

| # | le fait | la commande / la citation qui le produit |
|---|---|---|
| **a** | **Les quatre notions de la chaîne du quotient ne portent AUCUN manipulable.** `evolution-spontanee` : 3 figures gelées. `etat-equilibre` : 4. `piles` : 3. `transformations-deux-sens` : 3. **Treize figures, zéro `[[embed:]]`, zéro `.interactive.json`, zéro descripteur de scène.** La seule scène de chimie du dépôt est `banc-electrolyse`, au chapitre **suivant**. | `rg '\[\[(embed\|figure)…' content/pc/{evolution-spontanee,etat-equilibre,piles,transformations-deux-sens}/lesson.md` ⇒ **13 `[[figure:]]`, 0 `[[embed:]]`** ; `ls content/pc/evolution-spontanee/media/` ⇒ 3 `.svg` + 3 `.stages.json`, **aucun `.json` de scène** |
| **b** | **TROIS notions portent la MÊME figure d'axe $Q_r$ / $K$, et aucune ne porte de réglage.** `evolution-spontanee/critere-qr-k` (axe **qualitatif**, aucun nombre), `etat-equilibre/critere-evolution-qr-k` ($K = 1875$, un $Q_{r,i}$), `piles/qr-vs-k-echelle` (log, $Q_{r,i} = 0{,}10$, $K \approx 1{,}8\times10^{37}$). Trois dessins du même axe en trois chapitres consécutifs — **et pas un seul où l'élève place le point**. | les trois `.stages.json`, lus un par un ; et `critere-qr-k.svg:32-42` : « *Cette figure est un axe **QUALITATIF** […] **aucune valeur numérique de $Q_r$ ou de $K$ n'est portée sur l'axe**. La position de $K$ est centrée sur l'axe **uniquement pour la symétrie de la mise en page*** » |
| **c** | **La figure du chapitre déclare elle-même que ses deux points de départ ne veulent rien dire.** « *Les deux points de départ $Q_{r,i}$ (un dans chaque zone) sont des exemples **illustratifs quelconques**, choisis loin de $K$ pour que les flèches soient lisibles — **ils ne représentent pas les valeurs numériques de l'exemple travaillé du rung 2**.* » | `content/pc/evolution-spontanee/media/critere-qr-k.svg:39-42` |
| **d** | **La leçon travaille UN seul mélange, et son cas « sens inverse » est déclaré irréalisable.** R2 calcule $Q_{r,i} = 1{,}0\times10^{-5}$ puis, pour obtenir $Q_{r,i} > K$, pose $[Cu^{2+}]_i = 1{,}0\times10^{-40}$ mol/L — « *une concentration **inaccessible en pratique** — bien moins d'un ion pour des litres de solution* ». **Le second cas du critère n'est jamais montré sur un mélange qui existe.** | `lesson.md:105`, `:119-123` |
| **e** | **L'élève ne s'engage que TROIS fois sur le critère, et jamais sur un mélange qu'il a choisi.** Cinq points d'arrêt en tout, dont trois à R2 (`cp-r2-qr-calcul`, `cp-r2-critere`, `cp-r2-equilibre`) ; les trois énoncés donnent les concentrations. | `rg '^  - id: cp-' content/pc/evolution-spontanee/checkpoints.yaml` ⇒ **5** ; `:120-309` pour les trois de R2 |
| **f** | **Le mélange d'habiletés est à ZÉRO sur la résolution de problème, qui vaut 35 % de l'épreuve.** « ***0 des 29 items ne porte de champ `habilete`*** — le mélange n'est ni piloté ni mesurable — et les 5 points d'arrêt donnent **80 / 20 / 0 %** contre la cible **50 / 15 / 35 %**. La résolution de problème, 35 % de l'examen, est absente. » | `REVIEW-2026-09-19.md:127-130` ; recoupé : `rg -c 'habilete' content/pc/evolution-spontanee/items.yaml` ⇒ **0**, `checkpoints.yaml` ⇒ **5** (4 `utilisation`, 1 `application_experimentale`, **0 `resolution_probleme`**) |
| **g** | **Le sommet de la notion interroge le chapitre SUIVANT sur 75 % de son barème.** « *`exercises.yaml:85` demande « Représenter le schéma conventionnel de la pile » et `:99` la durée maximale via $\mathcal{F}$ : mot pour mot les savoir-faire du chapitre **`piles`**, pas des deux de celui-ci. […] **Seule q1 (0,5 pt sur 2) relève du chapitre.*** » | `REVIEW-2026-09-19.md:93-103` |
| **h** | **La banque de la notion contient UNE entrée, et c'est le sommet lui-même.** `bk-2012-n-x2` est « *repris ici à l'identique* » de `r-bac` — « ***recoupement total assumé*** » ; et « *Aucune autre transcription vérifiée n'existe pour cette notion à ce jour* ». À côté : `piles` en porte **6**, `etat-equilibre` **2**. | `bank.yaml:18-37` ; `rg -c '^  - id: bk-' content/pc/{evolution-spontanee,etat-equilibre,piles}/bank.yaml` ⇒ **1 · 2 · 6** |
| **i** | **Le geste que le bac demande est un ENCHAÎNEMENT en deux temps, et il vaut 0,5 + 0,5 pt à chaque fois.** 2017 N : « *(0,5 pt) Écrire l'expression du quotient de réaction $Q_{r,i}$ à l'état initial puis calculer sa valeur.* » puis « *(0,5 pt) Préciser le sens d'évolution spontanée du système chimique. **Justifier**.* ». Même paire en 2011 R. Et le sujet **nomme lui-même le piège** : « *Ne pas confondre l'exposant $2$ […] avec l'exposant $3$* ». | `content/pc/piles/bank.yaml:756`, `:776`, `:766`, `:914` |

**Le geste que rien n'exerce, et que la scène rend :** *choisir un mélange*, en lire le
quotient, le **poser** face à $K$, et regarder ce qui change **et ce qui ne change pas**
quand on change les quantités, puis quand on change le **couple**. Aucune figure du corpus
ne le fait ; aucun item ne peut le faire faire — un item donne toujours le mélange ; et
c'est exactement l'enchaînement que le bac demande, deux questions de suite, à chaque
occurrence.

### 0.2 Le NOMBRE qui déplace la scène — et l'arbitrage de notion hôte, écrit

La commande proposait : *l'élève règle les quantités initiales sur des crans discrets, parie
sur le sens, puis voit $Q_r$ aller vers $K$ sur une échelle (et, le cas échéant, le sens du
courant de la pile).* **Un nombre mesuré casse la moitié de cette idée, et il faut le dire
avant de dessiner quoi que ce soit.**

**Dans le système de la leçon, le sens ne se retourne pas.** $K \approx 1{,}8\times10^{37}$
(`lesson.md:103`). Sur cinq crans de concentration par solution — de $1{,}0\times10^{-3}$ à
$5{,}0\times10^{-1}$ mol/L, l'amplitude qu'un bécher autorise —, $Q_{r,i} =
[Zn^{2+}]/[Cu^{2+}]$ ne peut aller que de $2{,}0\times10^{-3}$ à $5{,}0\times10^{2}$ :
**25 mélanges sur 25 donnent le sens direct**, et le plus « défavorable » d'entre eux reste
à **34 ordres de grandeur** de $K$. Les annales sont pires : $K = 10^{200}$ (2017 N,
`piles/bank.yaml:752`), $K = 5\times10^{36}$ (2012 N, `exercises.yaml:56`),
$K \approx 4{,}0\times10^{15}$ (ES-21). **Aucune de ces valeurs ne laisse un pari avoir un
contenu**, et la leçon l'écrit : « *avec un $K$ aussi écrasant […] il faudrait des
concentrations extrêmes, presque jamais rencontrées en pratique, pour renverser le
verdict* » (`lesson.md:123`).

> **Une scène qui ne ferait parier que sur le sens, dans ce système-là, enseignerait la
> misconception qu'elle prétend casser** : vingt-cinq fois « le zinc gagne », c'est
> exactement `reactivite-metal-fixe` — « *une propriété qu'on attache au métal lui-même*
> » (`lesson.md:13`). ADR 0041 §6 : *une misconception n'est « servie » que si elle casse
> sur SA propre conséquence.* Il faut donc un couple où le sens **se retourne réellement**.

**Ce couple existe, il est déjà dans la notion, et personne ne l'a jamais fait tourner.**
ES-19 (`items.yaml:1083-1091`) pose $Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$ avec
**$K \approx 2{,}5$**. Sur les mêmes cinq crans, ce couple donne **9 mélanges en sens
inverse, 1 exactement à l'équilibre, 15 en sens direct** (table du §5.3 B). *Le même
couple, les trois verdicts du critère, sans une seule concentration inventée.* L'item, lui,
n'en montre qu'un seul — et son propre `solution` dit ce qui manque : « *même si l'écart
entre $Q_{r,i}$ et $K$ est ici bien plus **modeste** que dans les exemples précédents, le
critère tranche de la même façon* » (`items.yaml:1125-1127`). **Il le dit ; rien ne le fait
voir.**

**Les trois autres notions, pesées et écartées — chacune avec sa mesure.**

1. **`pc/etat-equilibre`, R5 — ÉCARTÉE, et c'est le refus le plus important de ce
   document.** C'est là que le critère est *enseigné pour la première fois*
   (`etat-equilibre/lesson.md:218-242`), avec $K = 1875$ et le système $Fe^{3+}/SCN^-$ où
   **les deux sens sont atteignables** : sur le papier, l'hôte idéal. **Mais ce rung est
   une contestation ouverte au propriétaire.** `etat-equilibre/REVIEW-2026-09-12.md:130-142`
   (§3.1, *les deux critiques indépendamment*) : « *Aucun des quatre `savoir_faire` du
   chapitre `etat_equilibre` ne mentionne un sens d'évolution. C'est le `savoir_faire`
   littéral d'un **autre sous-domaine** — `sens_evolution`, chapitre `evolution_spontanee`
   […] **Emprise chiffrée : R5 + sa figure + 3 items + 1 misconception dédiée + 4
   distracteurs ailleurs, soit environ 11 % de la notion. Supprimer et renvoyer, ou assumer
   l'anticipation et la documenter : c'est un arbitrage de périmètre.*** » **Poser un
   manipulable sur un rung que le propriétaire peut supprimer, c'est financer une dette
   avec une dette.** *Précédent inverse : le tremplin s'est borné à sa PAGE ; ici, c'est la
   page elle-même qui est en litige.* **Refusée tant que §3.1 n'est pas tranchée** — et
   le §13.2 propose la réponse par défaut.
2. **`pc/piles`, R2 — ÉCARTÉE, et la leçon le dit elle-même.** « *On ne le redémontre pas
   ici — **on l'applique** à la réaction de la pile* » (`piles/lesson.md:61`), puis
   « *Comme établi au chapitre sur l'évolution spontanée* » (`:73`). Une scène qui
   enseignerait le critère **deux chapitres après** celui qui le porte le
   ré-enseignerait. *Ce que `piles` mérite est une AUTRE scène — la polarité et le sens du
   courant, §13.9 — et elle n'est pas celle-ci.*
3. **`pc/transformations-deux-sens` — SANS OBJET.** `rg -c 'Q_r|quotient de réaction'
   content/pc/transformations-deux-sens/lesson.md` ⇒ **0**. La notion travaille $\tau$ et
   $x_f$, jamais $Q_r$. Aucun recouvrement, aucune dette.

**Conclusion, et elle est étroite : l'hôte est `pc/evolution-spontanee`, en tête de R2
(chapitre 3)** — la seule des quatre notions dont le cadre nomme le geste comme
`savoir_faire` propre (§1), la seule où le placement ne conteste rien, et celle où le trou
est le plus large (faits **f**, **g**, **h**). **La moitié « pile » de l'idée de départ est
refusée** (§2.6), **et la moitié « $Q_r$ va vers $K$ » est refusée aussi**, pour un motif
mesuré (§2.6 également). Ce qui reste — *poser un quotient face à une constante, sur trois
couples et soixante-quinze mélanges* — est, lui, entièrement neuf.

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- **La couverture des misconceptions N'EST PAS le trou, et je ne peux pas m'en servir.**
  `items.yaml:1845-1859` : `total_items: 29`, `floor: 3`, **`floor_met: true`** — « *Les
  dix-sept misconceptions déclarées sont couvertes, aucune sous le plancher. **Douze y
  siègent EXACTEMENT (3 items) : la marge est nulle et tout retrait d'item la casse.*** »
  Le comptage est au **distracteur**, pas au `primary_misconception` (`:1821-1826`) — mon
  premier relevé, fait au `primary_misconception` seul, donnait **quatre** familles au
  plancher sur dix-sept, et il était **faux** ; la méthode déclarée du fichier est la
  bonne. *Conséquence pour cette spec : le modèle neuf du §8.2 doit se justifier par autre
  chose qu'un plancher, et il le fait.*
- **Le champ `habilete` reste absent des 29 items** (fait **f**). Le mélange 50 / 15 / 35
  est donc **incalculable** sur la couche qui porte le volume. **NON-VERDICT déclaré**, pas
  un vert (ADR 0034). C'est corpus-wide, et cette scène ne le referme pas.
- **La résolution de problème à 0 % n'est PAS réparée par une scène à paris** : un pari est
  un QCM de plus. Les trois items du §8.3 ressemblent à de l'`utilisation` et à de
  l'`application_experimentale`, **aucun à de la résolution de problème**. **Reste dû, et
  c'est le plus gros.**
- **Le sommet qui interroge le chapitre suivant** (fait **g**) est un arbitrage de
  périmètre au propriétaire, pas un défaut de média. **Hors scène. Reste dû.**
- **La précipitation (`lesson.md:197-207`) est absente du cadre** : « *Recherche exhaustive
  sur `docs/cadre/` : **zéro occurrence** de « précipit\* », « solubilit\* », « Ks »,
  « dissolution »* » (`REVIEW-2026-09-19.md:105-113`). **Hors scène** (§9.7), et elle reste
  due comme arbitrage de prose.
- **R3 (« pourquoi ça part en chaleur ») ne correspond à aucun `savoir_faire` et frôle
  l'exclusion « aspects thermodynamiques »** (`REVIEW:123-127`). **Hors scène** (§9.5).
  **Reste dû.**
- **UN DÉFAUT NEUF, TROUVÉ EN MESURANT, QUE JE NE RÉPARE PAS.** `cp-r2-critere`
  (`checkpoints.yaml:196-197` et `:210`) porte encore « *$Fe + 2\,Ag^+
  \rightleftharpoons Fe^{2+} + 2\,Ag$, $K \approx 4{,}0\times10^{15}$* » — la valeur que la
  vague 1 a **corrigée dans ES-1** en $K \approx 1{,}0\times10^{42}$, précisément parce que
  $4{,}0\times10^{15}$ est l'ordre du couple **Cu/Ag**, pas Fe/Ag
  (`REVIEW-2026-09-19.md:13-28`). Le point d'arrêt est déclaré `item_source: clone_of_ES-1`
  (`checkpoints.yaml:192`) : **le clone n'a pas suivi son original.** *Ce n'est pas à cette
  spec de le réparer* (elle ne touche aucun fichier de contenu) — c'est une passe
  d'item-author, et **la conclusion de l'item ne bouge pas** ($3{,}0\times10^{2} \ll K$ dans
  les deux cas). **Signalé au §13.8 et au §15.6.**

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

> ✅ **Provenance, et elle est bonne.** `docs/cadre/curriculum/pc-physique-chimie.yaml`
> porte en en-tête « **STATUS: COMPLETE** — Physics (4/4) + Chemistry (4/4) » et une
> convention de provenance **par champ** : `source: cadre p.N` pour ce qui est imprimé,
> `source: derived` pour ce qui est déduit. **Le `programme` et les `savoir_faire` de ce
> chapitre sont `cadre p.24` et `cadre p.15`** — imprimés, pas reconstruits. *C'est
> l'inverse de la situation du plan complexe, dont les deux fichiers maths portaient
> « PROPOSITION — NON AUTORITATIVE ».* **Les `limites` et les `exclusions` du sous-domaine,
> elles, sont `derived` et portent la mention « THESE NEED HUMAN VALIDATION »**
> (`pc-physique-chimie.yaml:13`) : le §9 est aussi solide que ces lignes-là, et pas
> davantage. §13.1.

- **Filière / matière :** `sciences_physiques` (option SPC) / `physique_chimie`, série
  Sciences Expérimentales, `cadre_annee: 2025` (`:24-27`).
  *Recoupement : l'unique entrée de banque de la notion est `filiere: "SPC"`
  (`bank.yaml:48`), et les six de `piles` aussi. **Toute la preuve d'examen citée ici est
  SPC.***
- **Domaine → sous-domaine → chapitre :** `chimie` → **`sens_evolution`** →
  **`evolution_spontanee`** (`pc-physique-chimie.yaml:483-500`).
- **Poids — et c'est le sous-domaine le plus lourd de la chimie, à égalité :**
  `poids: { part_examen: 10, rang_chimie: 1 }` (`:485`, `source: cadre p.18`, « *tied 1st
  in chimie* »). **10 % de l'épreuve**, soit **2,0 points sur 20**.
- **Habiletés — la cible chiffrée de l'item-author, et le nombre que le critique de
  fidélité doit mesurer.** Exam-wide (`:18-19`, recoupé `docs/cadre/bac-reference.md:97-100`,
  **cadre-confirmed**) : **Utilisation des ressources 50 % · Application expérimentale
  15 % · Résolution de problème 35 %.** Pour ce sous-domaine (`:486-489`) :
  `utilisation_ressources: 5.0` · `application_experimentale: 1.5` *(derived = 15 % × 10 %)*
  · `resolution_probleme: 3.5`.
  **NON-VERDICT DÉCLARÉ** (§0.3, fait **f**) : le champ `habilete` n'existe sur aucun des
  29 items, donc le rapport n'est calculable **ni avant ni après** cette livraison. Ce
  qu'on peut dire à la lecture : des **trois** items neufs du §8.3, ES-30 et ES-31
  ressemblent à de l'**utilisation**, ES-32 à de l'**application expérimentale**, **aucun à
  de la résolution de problème** — et **personne ne peut le mesurer**.
- **`competences_ciblees` du sous-domaine** (`:490-491`, `cadre p.29`) : « *Utiliser le
  **critère d'évolution** pour déterminer le **sens spontané** et récupérer de l'énergie
  électrique (oxydo-réduction) ; analyser une transformation forcée et appliquer
  l'électrolyse […]* »
- **`programme` du chapitre, cité entier** (`:496-497`, `cadre p.24`) :
  > « **Critère d'évolution spontanée : $Q_r$ tend vers $K$ au cours du temps ;
  > illustration sur réactions acido-basiques et d'oxydo-réduction.** »
- **Les DEUX `savoir_faire` du chapitre, cités entiers** (`:498-500`, `cadre p.15`) :
  > 1. « **Calculer $Q_r$ d'un système dans un état donné.** » → **S1, S4** (l'expression et
  >    la valeur), et **S2, S3, S5** en emploi.
  > 2. « **Déterminer le sens d'évolution spontanée d'un système chimique.** » → **S1, S2,
  >    S3, S5**.

  **Le chapitre n'en a que deux, et la scène les sert tous les deux, de bout en bout.**
  *C'est le fait qui décide de l'hôte (§0.2), et il n'a pas d'équivalent dans les trois
  notions voisines : `etat_equilibre` en a quatre, dont **aucun** ne parle de sens
  (`:447-451`, et `etat-equilibre/REVIEW:133-134` le mesure).*
- **`limites` portées en dur.** Le sous-domaine `sens_evolution` porte ses `limites`
  **sous son dernier chapitre** (`:522-525`, sur `transformations_forcees`), alors que leur
  contenu est manifestement transversal. **Je les porte comme si elles étaient du
  sous-domaine, sans corriger le fichier** (RULES : le cadre est autoritatif, une objection
  se signale — §13.1) :
  > 1. « *Piles : couples ion métallique/métal $M^{n+}/M_{(s)}$ ; f.é.m **MESURÉE**
  >    expérimentalement. **Pas de potentiels standards $E^\circ$, pas de relation de
  >    Nernst, pas de calcul de f.é.m à partir des potentiels.*** »
  > 2. « ***Critère d'évolution via $Q_r$ vs $K$ uniquement* ; *pas d'enthalpie libre
  >    $\Delta G$ ni d'approche thermodynamique*.** »
  > 3. « *Aspect quantitatif via $Q = I\cdot t$ et la constante de Faraday.* »

  **Trois conséquences non négociables :** aucun $E^\circ$, aucune échelle de potentiels,
  aucun Nernst **nulle part dans le panneau** (§9.1) — *y compris pour justifier d'où vient
  un $K$ : les trois $K$ de la scène sont **donnés**, comme le bac les donne* ; aucun
  $\Delta G$, aucune thermodynamique (§9.2) ; et **le critère est le SEUL juge affiché**
  (§9.3).
- **`exclusions` du sous-domaine, citées entières** (`:531-535`, `source: derived`) :
  > - « *Potentiels standards d'électrode $E^\circ$, électrode standard à hydrogène,
  >   échelle des potentiels* » — Hors cadre.
  > - « *Relation de Nernst* » — Hors cadre.
  > - « *Enthalpie libre $\Delta G$, lien thermodynamique $\Delta G/K$* » — Hors cadre ;
  >   critère via $Q_r$/$K$ uniquement.
  > - « *Aspects thermodynamiques (entropie, enthalpie)* » — Hors cadre.

  **Elles mordent toutes les quatre**, et elles sont portées au §9.1 et §9.2. *Elles mordent
  d'autant plus fort que **c'est par $E^\circ$ que j'ai vérifié les trois $K$ de la scène**
  (§5.1) : un geste d'AUTEUR, jamais un geste affiché — précédent exact, la vague 1 de
  cette notion, qui a recalculé $K$(Fe/Ag) par $\Delta E^\circ$ pour corriger ES-1
  (`REVIEW:20-23`).*
- **La frontière qui mord le plus fort est INTERNE, et elle est double.**
  1. **Le rang dans la leçon.** La scène est en tête de **R2 (chapitre 3)**. À cet endroit
     l'élève a lu R0 (l'accroche : le zinc, le cuivre, « le zinc est plus réactif ») et R1
     (oxydant/réducteur, couple, demi-équation, combinaison des demi-équations) — **et rien
     d'autre**. Il n'a lu ni l'expression de $Q_r$ pour ce système, ni l'exemple travaillé,
     ni la chaleur (R3), ni la pile (R4), ni l'universalité du critère (R5). La scène
     **peut** poser les questions de R2 (elle vient avant la prose qui explique, ADR 0041
     §6) ; elle **ne peut pas** entrer dans R3, R4 ni R5 (§9.5, §9.6, §9.7).
  2. **Le critère lui-même est un ACQUIS revendiqué, pas un objet neuf.** `lesson.md:81` :
     « *Tu as construit, dans le chapitre sur l'état d'équilibre, l'outil qui prédit le
     sens* ». La scène **s'appuie dessus** ; elle ne le démontre pas. *Ce qu'elle met en
     pari, c'est ce que ce critère DONNE quand on change le mélange, puis le couple — et
     ce n'est écrit nulle part avant `lesson.md:89`, c'est-à-dire après le marqueur.*
     ⚠ *Et cet acquis repose sur un rung contesté (§0.2 point 1). La scène ne l'aggrave
     pas : elle ne cite jamais `etat-equilibre`, et sa consigne de S1 réénonce le critère
     en une ligne, comme `lesson.md:83-85` le fait déjà.*

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les trois médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `critere-qr-k` (3 étapes) | **R2** | l'axe des $Q_r$, $K$ posé en pivot, une flèche vers $K$ à gauche, une à droite | **aucun nombre, nulle part** — l'en-tête du SVG le déclare (fait **c**) ; la position de $K$ est « *uniquement pour la symétrie de la mise en page* » ; les deux $Q_{r,i}$ sont « *illustratifs quelconques* ». **Rien ne se règle, rien ne se calcule** |
| `transfert-direct-chaleur` (3 étapes) | **R3** | le saut des deux électrons à l'échelle atomique, la chaleur dissipée | c'est le **mécanisme**, pas le critère ; aucun quotient, aucune constante |
| `direct-vs-pile` (3 étapes) | **R4** | contact direct vs détour forcé ; « *même réaction, même constante $K$, même critère* » | c'est le **montage** ; aucun nombre de $Q_r$ ni de $K$ |

Et les quatre figures voisines, pesées pour le recouvrement : `etat-equilibre/critere-evolution-qr-k`
(l'axe, $K = 1875$, **un** $Q_{r,i}$, gelé) · `etat-equilibre/quotient-vers-K` ($Q_r(t)$ qui
monte vers $K$, **une** expérience, gelée) · `piles/qr-vs-k-echelle` (l'axe log, **deux**
nombres, gelé) · `etat-equilibre/jauge-avancement-tau` ($\tau$, autre objet).

**Le constat, et il est exact : sur treize figures et quatre notions, pas une seule ne
laisse CHOISIR un mélange.** Le seul réglage de toute la chaîne du quotient est… aucun.

### 2.2 Le motif central : un quotient qui bouge, une constante qui ne bouge pas, et un métal qui ne décide de rien

Le point que la scène existe pour installer, en une phrase :

> Le sens d'évolution ne se lit ni sur le métal, ni sur la taille de $Q_{r,i}$, ni sur le
> seuil $1$ : il se lit sur **la position de $Q_{r,i}$ par rapport à $K$**. $Q_{r,i}$ est
> une propriété du **mélange** — on le change en versant. $K$ est une propriété de la
> **réaction** (et de la température) — on ne le change qu'en changeant de couple. Et quand
> $K$ est petit, **le même couple va dans les deux sens**.

**Trois raisons mesurées pour lesquelles aucune figure ne peut le montrer.**

1. **« $Q_{r,i}$ est une propriété du mélange » ne se voit pas sur un mélange.** Il faut en
   voir plusieurs, du même couple, et constater que le repère glisse pendant que le pivot ne
   bouge pas. Une figure gelée montre un repère et un pivot ; elle ne peut pas montrer
   lequel des deux est libre.
2. **« Ce n'est pas le métal qui décide » est une NON-observation, et le corpus la rend
   invisible.** Sur $Zn/Cu^{2+}$, **25 mélanges sur 25** donnent le même verdict (§0.2) :
   la leçon le dit (`:123`), la figure ne peut pas le dire, et un élève qui ne voit que ce
   couple n'a **aucune raison expérimentale** d'abandonner « le zinc est plus réactif ». Le
   seul geste qui casse le modèle est de **changer de couple sans changer de geste**, et de
   voir le plomb — le métal « moins noble » selon l'intuition courante — se faire oxyder
   dans un mélange et se faire déposer dans un autre.
3. **Le troisième cas du critère ($Q_{r,i} = K$) n'a aucune existence dessinée.** Sur l'axe
   qualitatif, le point $K$ porte la légende « *système déjà à l'équilibre* »
   (`critere-qr-k.svg:96-97`) — mais **aucun mélange du corpus ne s'y trouve**. Il faut un
   cran qui y tombe **exactement**, et il en existe un et un seul (§5.3 B). *C'est la leçon
   de précision de l'ADR 0041 §5 : à un cran trop grossier, douze positions affichaient
   « 24,0 h ».*

**Et la leçon pose les deux moitiés sans jamais les opposer.** R0 fabrique le modèle (« *le
zinc est plus réactif que le cuivre — une propriété qu'on attache au métal lui-même,
presque une hiérarchie à mémoriser, couple par couple* », `:13`) et promet de le mettre à
l'épreuve. R2 le réfute **par un seul calcul, sur un seul mélange, d'un seul couple** — et
avec un $K$ tel que le verdict ne peut pas bouger. La promesse de R0 n'est pas tenue par une
observation ; elle est tenue par une phrase.

### 2.3 L'antidote obligatoire : une chaîne construite en CINQ temps

La relation $Q_{r,i} \lessgtr K$ a l'air d'un seul fait ; elle en contient quatre, et un
retour trop bavard les donne tous d'un coup. Même discipline qu'au banc de diffraction et au
banc d'électrolyse (règle `formule-graduee` ; ADR 0041 : *la relation est un ÉTAT qui
fuit*). **La frontière se pose ÉTAPE PAR ÉTAPE, consigne ET retours.**

- **S1** établit que **le verdict se lit sur la POSITION**, pas sur la taille. Un seul
  mélange, un seul couple. Aucun comptage, aucun deuxième couple, aucun exposant.
- **S2** ajoute que **$Q_{r,i}$ se déplace et $K$ ne bouge pas** : 25 mélanges, un seul
  pivot. Il ne peut pas parler d'un autre couple.
- **S3** ajoute le **deuxième couple** : $K$ change, et le sens se retourne. Il ne peut pas
  écrire d'exposant.
- **S4** ajoute l'**exposant** : $Q_r = [Cu^{2+}]/[Ag^+]^2$. Il ne peut pas parler
  d'équilibre.
- **S5** ajoute le **troisième cas** : $Q_{r,i} = K$, et ce n'est pas un épuisement.

**Contrainte non négociable et mesurable. La table du §7.6 C est la SEULE autorité ; ce qui
suit en est un résumé, et il ne doit jamais la contredire** (leçon de la vague 1 du plan
complexe, fidélité S10) : les chaînes `25 mélanges`, `aucun`, `sur 25` pas avant **S2** ;
`étain`, `Sn`, `plomb`, `Pb`, `2,5` **en position de $K$** pas avant **S3** ; `argent`,
`Ag`, `exposant`, `au carré`, `^2` pas avant **S4** ; `équilibre`, `n'évolue pas`,
`ni dans un sens ni dans l'autre` pas avant **S5**. La porte le lit dans le `textContent`
**rendu**, en remplaçant chaque `.katex` par son **annotation TeX** (leçon du banc
d'électrolyse : le `textContent` d'une formule KaTeX concatène MathML, source et rendu —
« $1{,}1$ volt » s'y lit « 1,11{,}11,1 volt »).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

| geste | où le bac le demande | ce que le corpus en fait |
|---|---|---|
| **Écrire l'expression de $Q_{r,i}$ PUIS la calculer** | 2017 N q1, 0,5 pt (`piles/bank.yaml:756`) ; 2011 R q1, 0,5 pt (`:914`) ; 2012 N q1, 0,5 pt (`evolution-spontanee/bank.yaml:80`) | la leçon l'écrit **une fois**, sur un couple sans exposant (`lesson.md:95`) ; `cp-r2-qr-calcul` le teste **une fois**, sur un couple sans exposant |
| **Porter les coefficients en EXPOSANTS** | 2017 N : le sujet **nomme le piège** — « *Ne pas confondre l'exposant $2$ (celui de $Al^{3+}$) avec l'exposant $3$ (celui de $Cu^{2+}$)* » (`piles/bank.yaml:766`) | `exposants-oublies` est déclaré et tenu à **exactement 3 items** (marge nulle, `items.yaml:1840`) ; **aucun média, aucun point d'arrêt** ne le montre |
| **Justifier le sens par la COMPARAISON, pas par le métal** | 2017 N q2 : « *Préciser le sens d'évolution spontanée. **Justifier**.* » ; et le raisonnement de la maison l'écrit : « *sans qu'il soit besoin de mémoriser quelle électrode « est plus réactive »* » (`piles/bank.yaml:778`) | `reactivite-metal-fixe` a 4 items — **tous sur des systèmes où le verdict ne peut pas bouger** ; le modèle n'est jamais mis en échec par une observation |
| **Reconnaître le cas $Q_{r,i} = K$** | présent dans les trois puces du critère, à chaque énoncé | `cp-r2-equilibre` le sonde **en mots** (`checkpoints.yaml:263-265`) ; **aucun mélange chiffré du corpus ne s'y trouve** |

### 2.5 Ce que la scène ne double pas

- **`banc-electrolyse`** (`pc/electrolyse`, R4) : la tension, la charge, la constante de
  Faraday, la polarité. **Sa frontière §9.9 interdit explicitement `Q_r`, `K =`,
  `constante d'équilibre`, `quotient de réaction`** — les deux scènes sont disjointes par
  construction, chacune gardée dans les deux sens.
- **Les trois figures de la notion** (§2.1) : aucune ne porte un nombre de $Q_r$ ni de $K$.
- **Les quatre figures voisines** (§2.1) : gelées, un mélange chacune.
- **`cuve-a-ondes`, `banc-de-diffraction`, `banc-de-modulation`, `corde-photo-film`,
  `tremplin-circulaire`, `manege-axe-fixe`, `champ-magnetique`, `orbite-geostationnaire`,
  `courbe-et-noyaux`** : physique, aucun recouvrement.
- **`plan-complexe-transformation`, `sphere-plan-droite`, `produit-vectoriel`,
  `solide-de-revolution`** : maths, aucun recouvrement.

### 2.6 Trois idées volontairement écartées — dont deux moitiés de la commande

- **L'animation de $Q_r$ vers $K$, ÉCARTÉE — et c'est la moitié de l'idée de départ.**
  Trois motifs, mesurés. **(1)** Sur le couple de la leçon, $K = 1{,}8\times10^{37}$ : le
  trajet fait **39 décades** et se termine, en pratique, par la consommation quasi totale
  du réactif — une animation de ce trajet est une flèche qui traverse l'écran et ne montre
  rien de gradué. **(2)** Calculer le point d'ARRIVÉE demande l'avancement, $x_f$, le
  tableau d'avancement et $\tau$ — **tout l'appareil du chapitre `etat_equilibre`**, que le
  §9.4 interdit au panneau et que le rang interdit à cet endroit de la page. **(3)** Le
  critère porte sur l'**instant** $i$ : « *à partir des concentrations telles qu'elles sont
  à cet instant* » (`lesson.md:81`) ; il ne prétend rien sur la trajectoire.
  **Ce que la scène garde, et c'est le `programme` du cadre (« $Q_r$ tend vers $K$ ») :**
  une **flèche le long de l'axe**, de $Q_{r,i}$ **vers** $K$, sans temps, sans vitesse et
  **sans point d'arrivée** — apparue seulement après le pari. `temps: false`,
  `course: false`. *§13.4.*
- **Le sens du courant de la pile, ÉCARTÉ — et c'est l'autre moitié.** Le mot « pile », la
  polarité, l'anode, la cathode, le fil et l'ampèremètre appartiennent à **R4 de cette
  leçon** et au chapitre **`piles`**. La revue mesure d'ailleurs que `lesson.md` ne contient
  **aucune** occurrence de « pôle », « anode », « cathode », « conventionnel », « Faraday »
  (`REVIEW:98-100`) : les faire entrer par une scène placée à R2 serait une régression de
  deux chapitres. **Chaînes interdites au §9.6.** *§13.9 propose une scène séparée pour
  `piles`, qui est la suite naturelle de celle-ci, pas son contenu.*
- **Un curseur CONTINU de concentration, ÉCARTÉ.** Tentant, et faux ici : avec une
  concentration quelconque, **aucune lecture n'est exacte** — $Q_{r,i}$ devient un décimal
  de six chiffres, le comptage « 9 sur 25 » n'existe plus, et surtout **le cran qui tombe
  exactement sur $K$ disparaît dans le bruit** (§2.2 point 3 ; ADR 0041 §5). **Cinq crans
  discrets par solution**, choisis pour cela. *§13.5.*

---

## 3. Placement

**En tête de `## R2 — Prédire le sens, par le calcul : $Q_{r,i}$ face à $K$`**
(`lesson.md:79`), entre le titre et le paragraphe « *Tu as construit, dans le chapitre sur
l'état d'équilibre…* » (`lesson.md:81`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:echelle-des-quotients]]
```

précédée du paragraphe d'annonce neutre du §4.1.

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose qui
explique*).

**L'audit de ce qui est AU-DESSUS du marqueur, élargi d'avance à trois sources** (leçon de
la vague 1 du plan complexe, qui n'avait lu que la prose) :

1. **Le TITRE de R2** — « *Prédire le sens, par le calcul : $Q_{r,i}$ face à $K$* »
   (`lesson.md:79`). Il nomme **l'outil** et **le geste**, il ne donne **aucun verdict** :
   il ne répond à aucun des cinq paris. *À comparer au titre de R5 du plan complexe, qui
   nommait les deux réponses de S1 — ici, rien à corriger.* **Vérifié, et c'est une
   différence qui compte.**
2. **R0, l'accroche** (`:5-15`). Elle **pose le modèle** que S3 casse (« *le zinc est plus
   réactif que le cuivre* », `:13`) et annonce « *Garde cette réponse en tête ; on va la
   mettre à l'épreuve* ». **La scène EST cette mise à l'épreuve** : le marqueur est le
   premier endroit de la page où la promesse de R0 peut être tenue par une observation.
   `cp-r0-predict` (`:11`) demande déjà à l'élève de s'engager sur la question — donc son
   engagement existe **avant** la scène, ce qui est exactement la disposition voulue.
3. **R1** (`:19-75`). Il donne oxydant, réducteur, couple, demi-équation, et la **combinaison
   avec multiplication pour égaliser les électrons** — y compris le cas $2\,Al + 3\,Cu^{2+}$
   (`:59-75`). **Donc les coefficients stœchiométriques différents de 1 sont un ACQUIS au
   moment du marqueur**, ce qui autorise le bain $Cu/Ag^+$ de S4 sans rien enseigner de
   neuf sur l'écriture. **Vérifié : c'est la condition qui rend S4 légal.**
4. **Ce que R1 ne donne PAS** : l'expression de $Q_r$ (elle arrive à `:95`), la règle
   d'exclusion des solides (`:97`), et les trois puces du critère (`:83-85`). **Les trois
   sont donc sous le marqueur, et la scène les met en pari.**

**Pourquoi pas plus bas.** Après `:85`, les trois puces du critère sont écrites : le pari de
S1 n'aurait plus rien à casser. Après `:95`, l'expression de $Q_r$ est donnée : S4 n'a plus
d'objet. Après `:107`, l'exemple travaillé a fait le calcul : S1 et S2 sont morts.
**Le marqueur n'a qu'une place possible, et c'est la ligne 80.**

**Conséquence sur les nombres : la scène ne doit PAS reproduire les nombres de l'exemple
travaillé.** `lesson.md:103-105` pose $[Cu^{2+}]_i = 1{,}0\times10^{-1}$,
$[Zn^{2+}]_i = 1{,}0\times10^{-6}$, $Q_{r,i} = 1{,}0\times10^{-5}$. Une scène placée au-dessus
qui afficherait $1{,}0\times10^{-5}$ **donnerait la réponse de l'exemple travaillé avant
l'exemple travaillé**. Les crans du §5.2 s'arrêtent donc à $1{,}0\times10^{-3}$, et la chaîne
`1,0×10^{-6}` comme la chaîne `1,0×10^{-5}` sont **interdites dans le panneau** (§9.10). *Ce
n'est pas une commodité : c'est la cinquième forme de la fuite, par la DONNÉE (précédent de
la corde, `miroir-inerte`).*

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

*Ce §4 décrit les paragraphes ; il ne les rédige pas. Toute la prose commandée ici est
soumise au §9 comme le panneau (leçon de la vague 1 du banc de modulation : **une spec peut
violer sa propre frontière**).*

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

Deux à trois phrases, **neutres**, entre le titre de R2 et le marqueur. Elles disent ce
qu'on va faire avec ses mains et **ne donnent aucun des cinq verdicts** : pas de « le sens
direct », pas de « 25 sur 25 », pas de « l'étain », pas d'exposant, pas d'« équilibre ».
Elles rappellent que le critère est un acquis, en une ligne, et renvoient au chapitre où il
a été construit **sans le renommer** (la notion emploie « le chapitre sur l'état
d'équilibre », `:81` — garder cette formulation exacte).

### 4.2 Le marqueur

```
[[embed:echelle-des-quotients]]
```

### 4.3 Le cœur de R2 — un SECOND couple travaillé, dont le verdict se retourne

Aujourd'hui R2 travaille un seul mélange d'un seul couple. **À ajouter, après le
paragraphe d'universalité (`:89`) et avant l'expression de $Q_r$ (`:91`)** : un court
paragraphe qui installe l'idée que le scène a fait voir — *le verdict dépend de deux nombres,
l'un qu'on prépare et l'autre qu'on subit* — et **un second exemple travaillé sur
$Sn + Pb^{2+}$, $K \approx 2{,}5$**, avec deux mélanges du même couple donnant les deux sens.
Contraintes : les deux mélanges viennent des crans du §5.2 ; la valeur $K \approx 2{,}5$ est
citée **comme une donnée**, exactement comme les énoncés la donnent ; **aucun $E^\circ$**
n'apparaît (§9.1) ; le mot « plus réactif » n'est employé que pour être réfuté.

### 4.4 Le contre-exemple de `:119-123` — à ALLÉGER, pas à supprimer

`lesson.md:119-123` obtient le sens inverse en posant $[Cu^{2+}]_i = 1{,}0\times10^{-40}$
mol/L, et le déclare lui-même « *inaccessible en pratique* ». Une fois le §4.3 écrit,
**ce passage n'est plus le seul accès au second cas du critère**, et il devient ce qu'il
aurait toujours dû être : une remarque sur l'ordre de grandeur de $K$, pas la démonstration
d'un cas. À raccourcir, et à raccorder explicitement au couple $Sn/Pb$ du §4.3 (« *sur un
couple dont le $K$ est modeste, il n'y a rien d'extrême à préparer* »). **Ne pas le
supprimer** : sa conclusion (« *ce n'est pas « le zinc qui a une propriété fixe » : c'est la
comparaison qui décide* », `:123`) est la thèse de la leçon.

### 4.5 Deux puces au récapitulatif (R6)

Une sur *ce que $Q_{r,i}$ et $K$ ne partagent pas* (l'un se prépare, l'autre se subit) ; une
sur *les coefficients qui deviennent des exposants*. Elles ne doivent pas répéter les puces
existantes (`:219-223`), qui portent déjà le critère et les demi-équations.

### 4.6 Aucun nouveau point d'arrêt — mais `cp-r2-critere` doit être REPRIS, et c'est un livrable

Les trois points d'arrêt de R2 restent où ils sont et gardent leur rôle. **Mais
`cp-r2-critere` porte une donnée fausse** (§0.3, dernier point) : `checkpoints.yaml:196-197`
et `:210` annoncent $K \approx 4{,}0\times10^{15}$ pour $Fe + 2\,Ag^+$, là où son original
ES-1 porte désormais $K \approx 1{,}0\times10^{42}$ (`REVIEW:23`). **La reprise est une
tâche d'item-author, commandée ici parce que la scène rend la chose visible** : un élève qui
vient de manipuler trois $K$ et de voir que $K$ dépend du couple **peut** remarquer que deux
couples différents portent la même constante dans le corpus. *§13.8.*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Les trois bains — et d'où vient chaque nombre

**Aucune constante n'est inventée. Les trois couples et leurs trois $K$ sont déjà dans la
notion.**

| bain | équation | $Q_r$ | $K$ | source dans le corpus |
|---|---|---|---|---|
| **A** | $Zn + Cu^{2+} \rightleftharpoons Zn^{2+} + Cu$ | $\dfrac{[Zn^{2+}]}{[Cu^{2+}]}$ | $1{,}8\times10^{37}$ | `lesson.md:103` (l'exemple travaillé de R2) |
| **B** | $Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$ | $\dfrac{[Sn^{2+}]}{[Pb^{2+}]}$ | $2{,}5$ | `items.yaml:1089-1090` (ES-19) ; le couple est aussi celui de `cp-r2-qr-calcul` (`checkpoints.yaml:130-134`) |
| **C** | $Cu + 2\,Ag^+ \rightleftharpoons Cu^{2+} + 2\,Ag$ | $\dfrac{[Cu^{2+}]}{[Ag^+]^2}$ | $4{,}0\times10^{15}$ | `items.yaml:1191-1192` (ES-21), et son `solution` écrit l'expression avec l'exposant (`:1229-1231`) |

**Vérification d'auteur, faite et déclarée — jamais affichée.** $\log K = n\,\Delta
E^\circ/0{,}06$ donne : A, $\Delta E^\circ = 0{,}34-(-0{,}76) = 1{,}10$ V, $n = 2$,
$\log K = 36{,}7$ ✓ ; C, $\Delta E^\circ = 0{,}80-0{,}34 = 0{,}46$ V, $n = 2$,
$\log K = 15{,}3$ ✓ ; B, $\Delta E^\circ = -0{,}13-(-0{,}14) = 0{,}01$ V, $n = 2$,
$\log K = 0{,}33$, soit $K \approx 2{,}1$ — **le corpus dit $2{,}5$, qui correspond à
$\Delta E^\circ = 0{,}0119$ V**, dans l'épaisseur des tables pour ces deux couples.
**Je ne corrige pas le corpus ; je porte sa valeur, et je signale la sensibilité**
(§13.3 et §15.4). *Ce geste est autorisé à l'AUTEUR et interdit au PANNEAU (§1, §9.1) ;
précédent exact : `REVIEW-2026-09-19.md:20-23`.*

**Pourquoi trois bains et pas deux.** A porte le couple de la leçon et l'accroche ; B est le
seul du corpus dont le sens se retourne ; C est le seul du corpus dont $Q_r$ porte un
exposant. **Chacun est irremplaçable par les deux autres**, et aucun n'est là pour le
volume.

### 5.2 Les crans — et pourquoi ces valeurs-là

**Une seule liste de cinq crans, la même pour les deux solutions et pour les trois bains**
(en mol/L) :

$$1{,}0\times10^{-3} \quad\cdot\quad 1{,}0\times10^{-2} \quad\cdot\quad 2{,}5\times10^{-2} \quad\cdot\quad 1{,}0\times10^{-1} \quad\cdot\quad 5{,}0\times10^{-1}$$

Cinq motifs, chacun mesurable :

1. **Le domaine est celui des énoncés.** 2017 N : $6{,}5\times10^{-1}$ mol/L
   (`piles/bank.yaml:739`) ; 2012 N : $1{,}0\times10^{-2}$ (`bank.yaml:22`) ; la leçon :
   $1{,}0\times10^{-1}$ (`:103`) ; ES-21 : $4{,}0\times10^{-2}$ (`items.yaml:1189`). **Les
   cinq crans couvrent cet intervalle, bornes comprises.**
2. **Le cran $2{,}5\times10^{-2}$ existe pour UNE raison : il est le seul qui place un
   mélange EXACTEMENT sur $K$.** Sur le bain B, $2{,}5\times10^{-2}/1{,}0\times10^{-2} =
   2{,}5 = K$, au caractère près. **Un seul couple de crans sur les vingt-cinq y tombe**
   (vérifié : aucun autre rapport de deux crans de la liste ne vaut $2{,}5$). *C'est la
   règle de l'ADR 0041 §5 : la précision d'affichage est un choix pédagogique, et un cran
   trop grossier fabriquerait une PLAGE d'équilibres — la misconception même.*
3. **La liste s'arrête à $1{,}0\times10^{-3}$ par le bas**, et non à $1{,}0\times10^{-6}$,
   pour ne pas reproduire les nombres de l'exemple travaillé qui suit le marqueur (§3,
   dernier paragraphe).
4. **Les cinq valeurs sont toutes à deux chiffres significatifs**, comme les énoncés les
   écrivent — donc tout quotient de deux crans s'écrit exactement (§5.4).
5. **Cinq crans × cinq crans × trois bains = 75 états**, tous énumérables par la porte.
   *§13.6 pose la question de la réduction à 48.*

### 5.3 Les tables de nombres — **toute l'arithmétique de la scène, vérifiée**

*Notation : les crans sont numérotés 1 à 5 dans l'ordre croissant. $p$ = le cran de l'ion
**produit** (celui du numérateur : $Zn^{2+}$, $Sn^{2+}$, $Cu^{2+}$), $o$ = le cran de l'ion
**oxydant réactif** (le dénominateur : $Cu^{2+}$, $Pb^{2+}$, $Ag^+$).*

**A — bain A ($K = 1{,}8\times10^{37}$), $Q_{r,i} = c_p/c_o$.** Les 25 valeurs vont de
$2{,}0\times10^{-3}$ ($p=1$, $o=5$) à $5{,}0\times10^{2}$ ($p=5$, $o=1$).
**Verdict : 25 états sur 25 en sens DIRECT.** Le plus grand $Q_{r,i}$ atteignable reste à
$\log(1{,}8\times10^{37}) - \log(5{,}0\times10^{2}) = 37{,}26 - 2{,}70 =$ **34,6 ordres de
grandeur** de $K$. *Le nombre affiché par la lecture `ecart` est l'entier par défaut : « au
moins 34 ordres de grandeur ».*
États nommés : **S1** pose $p=1$ ($1{,}0\times10^{-3}$), $o=4$ ($1{,}0\times10^{-1}$) ⇒
$Q_{r,i} = 1{,}0\times10^{-2}$, soit **39 ordres de grandeur** sous $K$
($37{,}26+2 = 39{,}26$).

**B — bain B ($K = 2{,}5$), $Q_{r,i} = c_p/c_o$.** Les 25 rapports, triés :

| verdict | nombre | les couples $(p,o)$, par leur rapport |
|---|---|---|
| **sens INVERSE** ($Q_{r,i} > 2{,}5$) | **9** | $500$ (5,1) · $100$ (4,1) · $50$ (5,2) · $25$ (3,1) · $20$ (5,3) · $10$ (2,1) et (4,2) · $5{,}0$ (5,4) · $4{,}0$ (4,3) |
| **ÉQUILIBRE** ($Q_{r,i} = 2{,}5$) | **1** | $2{,}5$ (3,2) — **le seul** |
| **sens DIRECT** ($Q_{r,i} < 2{,}5$) | **15** | les 15 restants, de $1{,}0$ (la diagonale, 5 états) à $2{,}0\times10^{-3}$ (1,5) |

*Total $9+1+15 = 25$ ✓. **Le même couple donne les trois verdicts du critère** — c'est le
fait de S3, et il est arithmétique, pas rhétorique.*
États nommés : **S3** pose $p=4$ ($1{,}0\times10^{-1}$), $o=2$ ($1{,}0\times10^{-2}$) ⇒
$Q_{r,i} = 10$, soit **4 fois $K$**, dans la même décade. **S5** pose $p=3$
($2{,}5\times10^{-2}$), $o=2$ ($1{,}0\times10^{-2}$) ⇒ $Q_{r,i} = 2{,}5 = K$ **exactement**.

**C — bain C ($K = 4{,}0\times10^{15}$), $Q_{r,i} = c_p/c_o^{\,2}$.** Les 25 valeurs vont de
$4{,}0\times10^{-3}$ ($p=1$, $o=5$ : $1{,}0\times10^{-3}/2{,}5\times10^{-1}$) à
$5{,}0\times10^{5}$ ($p=5$, $o=1$ : $5{,}0\times10^{-1}/1{,}0\times10^{-6}$).
**Verdict : 25 états sur 25 en sens DIRECT.**
État nommé : **S4** pose $p=1$ ($[Cu^{2+}]_i = 1{,}0\times10^{-3}$), $o=4$
($[Ag^+]_i = 1{,}0\times10^{-1}$).

**D — les quatre valeurs du pari de S4, chacune recalculée depuis le modèle qui la nomme**
(règle armée par la vague 1 du plan complexe, §14.0 de sa spec) :

| ce que l'élève fait | le calcul | la valeur |
|---|---|---|
| **juste** : $[Cu^{2+}]/[Ag^+]^2$ | $1{,}0\times10^{-3}/(1{,}0\times10^{-1})^2 = 1{,}0\times10^{-3}/1{,}0\times10^{-2}$ | $\mathbf{0{,}10}$ |
| **exposant omis** : $[Cu^{2+}]/[Ag^+]$ | $1{,}0\times10^{-3}/1{,}0\times10^{-1}$ | $\mathbf{1{,}0\times10^{-2}}$ |
| **coefficient en FACTEUR** : $[Cu^{2+}]/(2\,[Ag^+])$ | $1{,}0\times10^{-3}/(2\times1{,}0\times10^{-1})$ | $\mathbf{5{,}0\times10^{-3}}$ |
| **produits et réactifs inversés**, exposant gardé : $[Ag^+]^2/[Cu^{2+}]$ | $1{,}0\times10^{-2}/1{,}0\times10^{-3}$ | $\mathbf{10}$ |

**Les quatre valeurs sont deux à deux distinctes** — condition vérifiée avant d'écrire, et
c'est elle qui a fixé les crans de S4 : avec $[Ag^+]_i = 1{,}0\times10^{-2}$, « exposant
omis » et « inversé » donnaient **tous deux $0{,}10$**, et le pari n'aurait rien mesuré.

**E — le comptage du pari de S2, recalculé pour chaque modèle** (bain A, 25 états) :

| le modèle | ce qu'il compte | la valeur |
|---|---|---|
| **juste** ($Q_{r,i}$ vs $K$) | aucun mélange n'atteint $1{,}8\times10^{37}$ | $\mathbf{0}$ sur 25 |
| `critere-inverse` (petit ⇒ recule) | les 25 sont bien plus petits que $K$, donc les 25 reculent | $\mathbf{25}$ sur 25 |
| `seuil-un-au-lieu-de-k` (**modèle neuf**, §8.2) | ceux où $Q_{r,i} > 1$, c.-à-d. $p > o$ | $\mathbf{10}$ sur 25 |
| `pas-de-critere-predictif` | refuse tout comptage sans observation | *pas de nombre* |

*Le $10$ est exact : le nombre de couples $(p,o)$ avec $p > o$ parmi cinq crans distincts
vaut $\binom{5}{2} = 10$. Et $Q_{r,i} = 1$ exactement sur les 5 états de la diagonale, ce qui
rend le modèle « seuil $1$ » **doublement visible** : il place cinq mélanges pile sur son
propre seuil.*

### 5.4 La précision — exacte, ou deux chiffres significatifs, jamais entre les deux

- **$Q_{r,i}$ s'affiche à deux chiffres significatifs**, en écriture scientifique dès que
  l'exposant sort de $[-2 ; 2]$ — la convention des énoncés (`bank.yaml`, partout).
  *Tous les quotients de deux crans de la liste du §5.2 s'écrivent exactement à deux
  chiffres significatifs* : $2{,}0\times10^{-3}$, $1{,}0\times10^{-2}$, $2{,}5\times10^{-2}$,
  $4{,}0\times10^{-2}$, $0{,}10$, $0{,}20$, $0{,}25$, $0{,}40$, $1{,}0$, $2{,}5$, $4{,}0$,
  $5{,}0$, $10$, $20$, $25$, $50$, $100$, $250$, $500$… **aucun arrondi ne cache un écart
  au seuil.** Vérifié cran par cran : le seul rapport qui vaut $2{,}5$ est $(3,2)$, et il le
  vaut **exactement**, pas « à $0{,}01$ près ».
- **$K$ s'affiche tel que le corpus l'écrit** : `1,8×10^37` · `2,5` · `4,0×10^15`. Jamais
  recalculé, jamais arrondi autrement.
- **`ecart` (le nombre d'ordres de grandeur) s'affiche en ENTIER, par défaut vers le bas**,
  précédé de « au moins » quand il s'agit d'une borne sur plusieurs états. *Un décimal y
  serait un faux — $\log$ n'est pas au programme comme outil de ce chapitre, et le nombre
  n'a de sens que comme ordre de grandeur.*
- **Aucun nombre n'est affiché avec plus de chiffres qu'il n'en a de sens.** La lecture
  `expression` n'affiche **pas** de valeur : elle affiche la **formule littérale** du bain
  courant, en KaTeX.

### 5.5 L'axe — logarithmique, fixe, gradué par décades, et c'est une décision de porte

- **Un seul axe, fixe, de $10^{-3}$ à $10^{38}$** — 41 décades. Il ne change **jamais** de
  bornes : c'est ce qui rend comparables les trois pivots $K$, et c'est ce qui fait voir,
  comme une **longueur**, les « 34 ordres de grandeur » que le corpus n'écrit qu'en mots
  (`piles/qr-vs-k-echelle.stages.json:5` : « *un écart d'environ 38 ordres de grandeur* »).
- **Les décades sont graduées** ; une sur cinq porte son étiquette ($10^{-3}$, $10^{2}$,
  $10^{7}$, …, $10^{37}$), les autres un trait fin. **À largeur réduite (< 540 px), une
  décade sur dix seulement.**
- **L'échelle est STRICTEMENT constante** : la même distance en pixels sépare deux décades
  consécutives partout sur l'axe. *C'est une famille de porte à part entière (§11.2,
  `axe-decades`), et c'est la seule garantie que la longueur affichée VEUT dire quelque
  chose.*
- **Deux marques et deux seulement** : le **pivot $K$** (tige + disque + étiquette, à
  l'encre — c'est l'énoncé) et le **repère $Q_{r,i}$** (pastille + étiquette, à l'encre
  aussi). **L'accent est réservé à la flèche du verdict**, qui n'existe qu'après le pari.
  *Règle du manège, écrite : « une donnée de l'énoncé ne se peint pas dans la couleur de la
  réponse ».*
- **Le bécher.** À côté de l'axe, un bécher avec sa lame métallique et sa solution, dessiné
  **à l'encre** : c'est l'énoncé. Après la révélation, **deux flèches d'accent** montrent qui
  cède et qui capte, et **deux étiquettes** (`oxydé` / `réduit`) se posent. Rien de tout cela
  n'existe avant le pari. *Le bécher est nécessaire à S3 : la bascule du verdict doit se
  voir comme une lame qui change de rôle, pas seulement comme une flèche qui change de
  sens.*

### 5.6 Contrôles (3) — un neuf par étape, et un dont les crans POUSSENT

| contrôle | ouvert à | crans | ce qu'il règle |
|---|---|---|---|
| `oxydant` | **S1** | 5 (§5.2) | la concentration initiale de l'ion **réactif** ($Cu^{2+}$, $Pb^{2+}$, $Ag^+$) |
| `produit` | **S2** | 5 (§5.2) | la concentration initiale de l'ion **produit** ($Zn^{2+}$, $Sn^{2+}$, $Cu^{2+}$) |
| `bain` | **S3** | **2 à S3 (A, B), puis 3 à partir de S4 (A, B, C)** | le couple étudié |

**`bain` est un contrôle dont l'ensemble des crans GRANDIT, et c'est une condition de
non-fuite, pas une commodité.** Si le cran C existait dès S3, l'élève pourrait atteindre
l'exposant — la réponse de S4 — une étape trop tôt. *Précédent exact : le banc de modulation,
dont un étage « n'EXISTE PAS dans le DOM » avant sa révélation ; et le manège, dont un
réglage ouvert répondait au pari suivant (`fuite-inter-etapes`).* **La porte réécrit
elle-même la table des états atteignables avant chaque étape** (§11.2).

### 5.7 État (3 clés) et lectures (6)

**État** — `bain` ∈ {`A`, `B`, `C`} · `c_produit` ∈ les 5 crans · `c_oxydant` ∈ les 5 crans.

**Lectures — et chacune n'apparaît qu'à l'étape qui la DÉCOUVRE ou l'EMPLOIE** (règle du
calme, DÉCISIONS §29 / HANDOFF §11.210) :

| lecture | ce qu'elle écrit | à partir de | avant le pari ? |
|---|---|---|---|
| `equation` | l'équation du bain courant, avec $\rightleftharpoons$ | **S1** | **oui** — c'est l'énoncé |
| `expression` | la formule littérale de $Q_r$ pour ce bain | **S1** | **oui à S1, S2, S3, S5 ; NON à S4** (c'est le pari) |
| `qri` | la valeur de $Q_{r,i}$, 2 c.s. | **S1** | **oui à S1, S2, S3, S5 ; NON à S4** |
| `k` | la valeur de $K$ pour ce bain | **S1** | **oui** — c'est l'énoncé |
| `ecart` | le nombre d'ordres de grandeur entre $Q_{r,i}$ et $K$ | **S2** *(et S2 seulement, plus S4 où il vaut 16)* | oui |
| `sens` | le verdict : « sens direct » / « sens inverse » / « déjà à l'équilibre » | **S1** | **NON, jamais** — c'est la réponse |
| `especes` | qui est oxydé, qui est réduit | **S3** | **NON, jamais** |

**Sept lignes possibles, jamais plus de six à l'écran**, et quatre à S1. *`ecart` n'apparaît
pas à S1 : à S1 le fait est la POSITION, pas la distance ; l'écrire donnerait le contenu de
S2. `especes` n'apparaît ni à S1 ni à S2 : la bascule des rôles est le fait de S3.*

---

## 6. Ni temps ni course — et la langue visuelle

### 6.1 `temps: false`, `course: false` — et le pari reste entier

Rien ne s'anime. Le verdict est **immédiat** : à la révélation, `etat_revele` pose le réglage
que la question interrogeait, la flèche d'accent paraît sur l'axe, les deux flèches
paraissent dans le bécher — **et c'est le dessin qui répond avant le texte** (ADR 0041 §6).

Motifs, déjà écrits : le trajet de $Q_r$ vers $K$ n'est ni calculable ni lisible ici
(§2.6) ; le critère porte sur un instant ; et `validate-content` interdit `revele_apres_h`
sur une scène sans temps. **Conséquence sur les portes : la famille `eclairs` est
structurellement vide — elle est mesurée quand même** (leçon du banc d'électrolyse), et
`sans-mouvement` n'a rien à désactiver.

`etat_revele` s'applique **une fois** à la révélation, et de nouveau au retour sur une étape
déjà révélée. Il est le cœur de S2, S3 et S5 : c'est lui qui fait **sauter le pivot $K$**
d'un bout de l'axe à l'autre quand le bain change, sous les yeux de l'élève, sans qu'il ait
rien touché. *Précédent : le banc de diffraction, où « la révélation pose le réglage que le
pari interrogeait ».*

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **Couleurs lues sur les jetons `--figure-*` à l'exécution**, relues au changement de
  thème. Aucune teinte codée en dur. **Le bain de cuivre n'est PAS peint en bleu « parce
  que c'est du sulfate de cuivre »** : c'est une teinte de jeton, et la porte le mesure en
  **chrominance** (leçon du solide de révolution : une sonde qui lit la luminance classe
  n'importe quel gris sombre comme accentué).
- **L'accent marque une seule chose : la RÉPONSE.** La flèche du verdict sur l'axe, les deux
  flèches du bécher, les deux étiquettes de rôle. **Tout le reste est à l'encre** : l'axe,
  les décades, le pivot $K$, le repère $Q_{r,i}$, le bécher, la lame.
- **Le quadrillage — ici les traits de décade — se peint en couleur OPAQUE**, jamais en
  transparence (leçon du banc de modulation : Chromium compose deux fois les sous-chemins
  qui se croisent, et chaque nœud devient un faux sommet).
- **Les étiquettes se POSENT** (`disposer`, pièce commune de `Plateau.tsx`), jamais ne se
  centrent sur leur ancre : à 390 px, « $Q_{r,i} = 2{,}5$ » et « $K = 2{,}5$ » tombent sur
  **le même point de l'axe** à S5 — c'est le cas le plus serré de la scène, et il est
  obligatoire (§11.2, `etiquettes`).
- **Budget d'étiquettes HTML (KaTeX) : SIX au plus** — $Q_{r,i}$, $K$, les deux noms
  d'espèce du bécher, et les deux rôles après révélation. Les **nombres des décades** sont
  peints sur le canvas (12 px, la police du chrome) : ce sont des puissances de dix, pas des
  formules. *Précédent : le plan complexe, dont les nombres d'axe sont peints.*
- **Les curseurs sont `.curseur`** (48 px, poignée à l'encre douce) ; les trois contrôles
  sont des **listes de boutons radio** en clair, pas des glissières numériques — cinq crans
  nommés se lisent mieux qu'un curseur à cinq positions, et chaque libellé porte son unité.
- **Le focus ne tombe jamais à `<body>` ni hors de l'écran** (pièces communes) ; la colonne
  des réglages ne descend jamais sous 18rem ; toute cible visible ≥ 44 px, `<summary>`
  compris.

---

## 7. Les cinq étapes

*Format : id · titre · ce que la consigne pose · le pari (question + quatre choix, chacun
avec le modèle qu'il nomme et la valeur qu'il produit) · la `suite` (UNE question, UN
geste) · les contrôles ouverts · les lectures · l'état, et l'état révélé.*

### 7.1 S1 — `de-quel-cote` · « De quel côté ? »

**Consigne.** Le bécher de l'accroche, chiffré : une lame de zinc dans une solution où
$[Cu^{2+}]_i = 1{,}0\times10^{-1}$ mol/L, et une trace d'ions $Zn^{2+}$,
$1{,}0\times10^{-3}$ mol/L. L'équation, l'expression de $Q_r$, sa valeur
($1{,}0\times10^{-2}$) et $K$ ($1{,}8\times10^{37}$) sont **écrits à l'encre** — c'est
l'énoncé, exactement comme un sujet le donne. Sur l'axe, les deux marques sont posées.

**Pari — « Ce mélange va évoluer… »**

| | choix | modèle | la valeur que le modèle produit |
|---|---|---|---|
| ✓ | « dans le **sens direct** : le repère est **à gauche** du pivot » | — | direct |
| ✗ | « dans le **sens inverse** : $Q_{r,i}$ est minuscule, la réaction n'a presque pas eu lieu, donc c'est en arrière qu'elle a du chemin » | `critere-inverse` | inverse |
| ✗ | « nulle part : $Q_{r,i}$ et $K$ devraient être égaux pour une même réaction — l'une des deux données est fausse » | `confond-qr-et-k` | aucune évolution |
| ✗ | « on ne peut pas encore conclure : il manque la masse de la lame de zinc dans le quotient » | `solide-dans-qr` | pas de verdict |

**Retour du choix juste** — dit le **mécanisme**, pas le résultat : proportionnellement peu
de produit et beaucoup de réactif par rapport à ce que l'équilibre exige, donc c'est la
réaction directe qui l'emporte. **Ne chiffre aucun écart** (c'est S2), **ne nomme aucun autre
couple** (c'est S3), **n'écrit aucun exposant** (c'est S4).

**`suite`** — une question, un geste : *« Fais varier la solution de $Cu^{2+}$ sur ses cinq
crans. Le repère glisse ; regarde ce que fait le pivot. »* **`etat_revele` : aucun** (le
pari ne portait sur aucun réglage).

**Contrôles** : `oxydant`. **Lectures** : `equation`, `expression`, `qri`, `k`, puis `sens`.

### 7.2 S2 — `vingt-cinq-melanges` · « Vingt-cinq mélanges, un seul verdict »

**Consigne.** Les deux solutions sont maintenant réglables, cinq crans chacune : vingt-cinq
mélanges du **même** couple. On les a tous essayés.

**Pari — « Combien de ces 25 mélanges évoluent dans le sens INVERSE ? »**

| | choix | modèle | la valeur, recalculée (§5.3 E) |
|---|---|---|---|
| ✓ | « **aucun** » | — | 0 sur 25 |
| ✗ | « **les 25** : dans tous, $Q_{r,i}$ est bien plus petit que $K$ — un quotient aussi petit annonce un recul » | `critere-inverse` | 25 sur 25 |
| ✗ | « **10** : ceux où il y a plus d'ions produits que d'ions réactifs, c'est-à-dire $Q_{r,i}$ au-dessus de $1$ » | **`seuil-un-au-lieu-de-k`** (§8.2) | 10 sur 25 |
| ✗ | « on ne peut pas les compter : le sens d'une réaction ne se prédit pas, il s'observe » | `pas-de-critere-predictif` | *pas de nombre* |

**Retour du choix juste.** Le plus « défavorable » des 25 donne $Q_{r,i} = 5{,}0\times10^{2}$
— et il reste à **34 ordres de grandeur** de $K$. **Et voici la phrase à emporter : ce n'est
pas le zinc qui empêche le retournement, c'est le NOMBRE $K$.** *La phrase nomme la
misconception sans la trancher : elle annonce S3, elle ne le donne pas.*
**Retour du choix « 10 ».** Cinq des vingt-cinq mélanges donnent $Q_{r,i} = 1$ **exactement**
— pose-les et regarde : le repère tombe pile sur $1$, et le pivot est quelque part à
trente-sept décades de là. **Le seuil du critère n'est pas $1$ ; c'est $K$, et il change avec
la réaction.**

**`suite`** — *« Cherche le mélange qui pousse $Q_{r,i}$ le plus à droite possible ; lis
l'écart. »*
**`etat_revele`** : `c_produit` = $5{,}0\times10^{-1}$, `c_oxydant` = $1{,}0\times10^{-3}$
(le mélange extrême — la scène se règle elle-même sur la borne dont la réponse parle, et
elle le DIT dans la région vivante).

**Contrôles** : `oxydant`, `produit`. **Lectures** : + `ecart`.

### 7.3 S3 — `un-autre-couple` · « Même geste, autre couple »

**Consigne.** Une lame d'**étain** dans une solution de nitrate de plomb(II) :
$[Sn^{2+}]_i = 1{,}0\times10^{-1}$, $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L. Pour ce couple,
on donne $K \approx 2{,}5$. **L'équation, l'expression, $Q_{r,i} = 10$ et $K = 2{,}5$ sont à
l'encre** ; sur l'axe, **le pivot a sauté** de $10^{37}$ à $2{,}5$, et le repère est
maintenant **à sa droite**.

**Pari — « Ce mélange d'étain et de plomb va évoluer… »**

| | choix | modèle | la valeur que le modèle produit |
|---|---|---|---|
| ✓ | « dans le **sens inverse** : c'est le **plomb** métallique qui est oxydé, et les ions $Sn^{2+}$ qui sont réduits » | — | inverse ; Pb oxydé |
| ✗ | « dans le sens direct : l'étain cède ses électrons, comme le zinc le faisait — c'est ce que sont ces deux métaux » | `reactivite-metal-fixe` | direct ; Sn oxydé |
| ✗ | « dans le sens direct : $Q_{r,i} = 10$ est grand, donc la réaction a déjà bien avancé et elle continue » | `critere-inverse` | direct |
| ✗ | « dans les deux sens à la fois, aussi spontanément l'un que l'autre, puisque $K$ est voisin de $1$ » | `sens-symetrique` | les deux |

**Le pari casse sur sa propre conséquence** (ADR 0041 §6) : la lame de **plomb** se dissout
sous les yeux de celui qui a parié sur l'étain. *Et c'est la seule étape de toute la chaîne
du quotient où un modèle de « réactivité du métal » rencontre une observation qui le
contredit.*

**`suite`** — *« Parcours les 25 mélanges de ce couple-ci et compte les verdicts. »*
La réponse, à trouver et non à lire : **9 en sens inverse, 1 sans évolution, 15 en sens
direct** (§5.3 B).
**`etat_revele`** : aucun réglage à poser — le verdict et les flèches suffisent ; le bain
est déjà posé par `etat`.

**Contrôles** : + `bain` (**deux crans : A, B**). **Lectures** : + `especes` ;
**`ecart` DISPARAÎT** (à $K = 2{,}5$ et $Q_{r,i} = 10$, « 0 ordre de grandeur » est un
nombre vide, et une lecture vide au milieu d'une liste enseigne un trou — règle du plan
complexe, §5.2 B de sa spec).

### 7.4 S4 — `l-exposant` · « Quand les coefficients ne valent pas 1 »

**Consigne.** Troisième bain : de la limaille de cuivre dans une solution de nitrate
d'argent. L'équation, **$Cu + 2\,Ag^+ \rightleftharpoons Cu^{2+} + 2\,Ag$**, est à l'encre ;
les deux concentrations aussi ($[Ag^+]_i = 1{,}0\times10^{-1}$,
$[Cu^{2+}]_i = 1{,}0\times10^{-3}$ mol/L) ; $K$ aussi ($4{,}0\times10^{15}$).
**`expression` et `qri` sont ABSENTS du DOM** : c'est le pari.

**Pari — « Que vaut $Q_{r,i}$ pour ce mélange ? »**

| | choix | modèle | le calcul (§5.3 D) |
|---|---|---|---|
| ✓ | « $0{,}10$ » | — | $[Cu^{2+}]/[Ag^+]^2$ |
| ✗ | « $1{,}0\times10^{-2}$ » | `exposants-oublies` | $[Cu^{2+}]/[Ag^+]$ |
| ✗ | « $5{,}0\times10^{-3}$ » | `exposants-oublies` *(seconde forme : le coefficient en facteur — la description déclarée la couvre explicitement)* | $[Cu^{2+}]/(2\,[Ag^+])$ |
| ✗ | « $10$ » | `qr-produits-reactifs-inverses` | $[Ag^+]^2/[Cu^{2+}]$ |

**Le libellé d'aucun choix ne porte le nombre qui le réfute** (règle de la vague 2) : les
quatre sont des valeurs nues, sans justification chiffrée.

**Retour du choix juste** — l'expression paraît, puis la valeur, puis le verdict. La phrase
à tenir : **un coefficient de l'équation devient une PUISSANCE, jamais un facteur** ; et
c'est l'écriture de l'équation, pas la nature des espèces, qui le décide.
**Retour du choix « $1{,}0\times10^{-2}$ »** — nomme le sujet d'examen qui nomme le piège :
c'est exactement ce que 2017 N met en garde (`piles/bank.yaml:766`), sur un couple où les
deux exposants valent $2$ et $3$.

**`suite`** — *« Change le cran de la solution d'argent d'un rang et regarde de combien
$Q_{r,i}$ bouge. »* Un facteur $10$ sur $[Ag^+]$ déplace $Q_{r,i}$ de **deux** décades, pas
d'une — l'exposant se **voit** comme une double longueur sur l'axe.
**`etat_revele`** : aucun (le pari portait sur une valeur, pas sur un réglage) — **et c'est
déclaré**, comme S4 du banc d'électrolyse.

**Contrôles** : `oxydant`, `produit`, `bain` (**trois crans maintenant : A, B, C**).
**Lectures** : `equation`, `expression`, `qri`, `k`, `ecart`, `sens`, `especes` — **sept, et
c'est l'étape la plus chargée ; `ecart` y revient parce que le retour le cite (16 ordres de
grandeur)**. *Si la revue de calme juge sept lignes de trop, c'est `especes` qui tombe
(§13.7).*

### 7.5 S5 — `pile-sur-le-pivot` · « Et si le repère tombait sur le pivot ? »

**Consigne.** Retour au couple étain / plomb. On prépare un mélange où
$[Sn^{2+}]_i = 2{,}5\times10^{-2}$ et $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L.
$Q_{r,i} = 2{,}5$ — **exactement** $K$. Sur l'axe, les deux marques **se recouvrent**.

**Pari — « Que va-t-il se passer dans ce bécher ? »**

| | choix | modèle | la conséquence que la scène montre |
|---|---|---|---|
| ✓ | « rien, à l'échelle macroscopique : aucun des deux sens ne l'emporte — et pourtant les deux se produisent » | — | aucune flèche nette ; les trois espèces restent |
| ✗ | « la réaction s'est déjà produite en entier : il ne reste plus d'ions $Pb^{2+}$ » | `equilibre-egale-arret-total` | la lecture affiche $[Pb^{2+}] = 1{,}0\times10^{-2}$ mol/L, à l'écran |
| ✗ | « c'est impossible : on vient de préparer le mélange, $Q_{r,i}$ ne peut valoir $K$ qu'à la FIN d'une évolution » | `confond-qr-et-k` | le mélange est là, préparé, et il y est |
| ✗ | « il va quand même évoluer, mais si lentement qu'on ne le verra pas » | `spontane-egale-instantane` | le critère ne parle pas de vitesse ; aucun sens n'est désigné |

**Retour du choix juste.** C'est le **troisième** cas du critère, celui que les énoncés
écrivent en une ligne et qu'on ne rencontre presque jamais : $Q_{r,i} = K$, le système est
**déjà** à l'équilibre. Et il n'y est pas parce qu'un réactif a disparu — les trois
concentrations sont sous tes yeux.

**`suite`** — *« Sur les 75 mélanges, cherches-en un autre où rien ne bouge. »* La réponse,
à trouver : **il n'y en a qu'un**, et c'est celui-ci. *C'est le geste qui fait sentir à quel
point le troisième cas est étroit — et pourquoi un sujet qui le pose l'a toujours fabriqué
exprès.*
**`etat_revele`** : `bain` = B, `c_produit` = $2{,}5\times10^{-2}$,
`c_oxydant` = $1{,}0\times10^{-2}$ — l'état est déjà celui-là par `etat` ; la révélation
n'ajoute que le verdict. **Déclaré : S5 n'a pas d'`etat_revele` distinct.**

**Contrôles** : les trois, tous crans. **Lectures** : `equation`, `expression`, `qri`, `k`,
`sens` — **cinq ; `especes` disparaît** (aucune espèce n'est oxydée ni réduite nettement :
une lecture qui dirait « aucune » serait une lecture vide).

### 7.6 Le contrat « avant le pari », et les cinq formes de la fuite

#### A — la fuite par les RÉGLAGES (`fuite-inter-etapes`)

| avant | `oxydant` | `produit` | `bain` | l'état que cela rend atteignable |
|---|---|---|---|---|
| **S1** | fermé | absent du DOM | absent du DOM | l'état posé, rien d'autre |
| **S2** | ouvert (5) | absent | absent | 5 états du bain A |
| **S3** | ouvert | ouvert (5) | absent | 25 états du bain A — **et aucun autre bain** |
| **S4** | ouvert | ouvert | ouvert **(A, B)** | 50 états — **et jamais le bain C, donc jamais un exposant** |
| **S5** | ouvert | ouvert | ouvert (A, B, C) | 75 états |

**La porte réécrit cette table elle-même contre le descripteur**, et vérifie que le bain C
n'est atteignable qu'à partir de S5 *(c.-à-d. après la révélation de S4)*, et que le bain B
ne l'est qu'à partir de S4 *(après la révélation de S3)*.

#### B — la fuite par les RETOURS (chaque `retour` relu contre le pari SUIVANT)

- Le retour juste de **S1** ne chiffre aucun écart (S2), ne nomme aucun second couple (S3),
  n'écrit aucun exposant (S4), n'emploie pas « équilibre » (S5).
- Le retour juste de **S2** a le droit de dire « ce n'est pas le métal, c'est $K$ » — c'est
  l'annonce de S3, pas sa réponse : il ne nomme **ni l'étain, ni le plomb, ni la valeur
  $2{,}5$**.
- Le retour juste de **S3** ne nomme ni l'argent, ni un exposant, ni l'équilibre.
- Le retour juste de **S4** n'emploie pas « équilibre ».
- Aucun retour n'emploie « pile », « anode », « cathode », « courant » (§9.6) — **à aucune
  étape**.

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

| chaîne (et ses formes) | autorisée à partir de |
|---|---|
| `25 mélanges` · `sur 25` · `aucun des` · `ordres de grandeur` · `ecart` | **S2** |
| `étain` · `Sn` · `plomb` · `Pb` · `2,5` *(en position de $K$)* · `se retourne` · `oxydé` · `réduit` | **S3** |
| `argent` · `Ag` · `exposant` · `puissance` · `au carré` · `^2` · `^{2}` · `coefficient stœchiométrique` | **S4** |
| `équilibre` · `déjà à l'équilibre` · `n'évolue pas` · `ni dans un sens ni dans l'autre` | **S5** |

*Lues dans le `textContent` **rendu**, chaque `.katex` remplacée par son annotation TeX ;
cherchées en **début de mot** et en Unicode (`\b` ignore les accents).*

#### D — la fuite par la DONNÉE

Les crans du §5.2 sont choisis pour que **le seul mélange à $Q_{r,i} = K$** (la réponse de
S5) n'existe **que sur le bain B** — donc hors d'atteinte avant S4. Et ils s'arrêtent à
$1{,}0\times10^{-3}$ pour ne pas reproduire les nombres de l'exemple travaillé de la leçon
(§3). *C'est la forme de fuite que la corde a nommée (`miroir-inerte`) : elle ne passe ni
par un affichage, ni par un réglage, mais par le choix des valeurs.*

#### E — la fuite par les NOTES d'honnêteté

Les lignes de `fit_caveat` sont du texte, et le texte fuit (leçon du banc de modulation).
La ligne qui parle de l'exposant n'est affichée **qu'à partir de S4** ; celle qui parle du
troisième cas, **qu'à partir de S5**. `formule-graduee` lit les notes **avec** le panneau.

---

## 8. Misconceptions

### 8.1 Ce que la scène vise, sur l'inventaire déjà déclaré

**Neuf modèles déclarés de `evolution-spontanee`, tous servis sur LEUR propre conséquence** :

| id (`mc.chemistry.pc_evolution_spontanee.`) | items aujourd'hui | étape | ce qui le casse à l'écran |
|---|---|---|---|
| `critere-inverse` | 5 | **S1, S2, S3** | le repère à gauche du pivot, et pourtant l'évolution va vers la droite |
| `confond-qr-et-k` | 6 | **S1, S5** | un mélange préparé où $Q_{r,i} \ne K$ ; puis un où $Q_{r,i} = K$ dès la préparation |
| `solide-dans-qr` | 3 *(marge nulle)* | **S1** | la lame est dessinée, sa masse n'est jamais demandée, et `expression` ne la porte pas |
| `reactivite-metal-fixe` | 4 | **S2, S3** | le plomb oxydé dans un mélange, déposé dans un autre — **même couple** |
| `sens-symetrique` | 4 | **S3** | sur le bain B, 9 mélanges vont dans un sens et 15 dans l'autre : ce n'est pas une symétrie, c'est une partition |
| `pas-de-critere-predictif` | 3 *(marge nulle)* | **S2** | le comptage se fait sans rien observer, et il est juste |
| `exposants-oublies` | 3 *(marge nulle)* | **S4** | un facteur $10$ sur $[Ag^+]$ déplace $Q_{r,i}$ de **deux** décades |
| `qr-produits-reactifs-inverses` | 3 *(marge nulle)* | **S4** | la valeur inversée tombe **du mauvais côté de $1$**, visiblement |
| `equilibre-egale-arret-total` | 3 *(marge nulle)* | **S5** | $[Pb^{2+}] = 1{,}0\times10^{-2}$ mol/L affiché, à l'équilibre |
| `spontane-egale-instantane` | 3 *(marge nulle)* | **S5** | le critère ne désigne aucun sens, et ne dit rien d'une vitesse |

*Dix modèles servis, sur les dix-sept de la notion. Les sept autres —
`oxydation-reduction-inversees`, `demi-equation-isolee`, `electrons-non-equilibres`
(chapitre 2), `spontane-egale-chaleur` (chapitre 4), `oxydoreduction-egale-pile`,
`fil-jonction-confondus` (chapitre 5), `critere-limite-redox` (chapitre 6) — **sont hors du
rang de la scène**, et c'est écrit plutôt que comblé.*

### 8.2 Le modèle NEUF — et la mesure qui le rend nécessaire

#### `seuil-un-au-lieu-de-k` — « le seuil de comparaison est $1$, pas $K$ »

**La mesure qui le rend nécessaire, en quatre points :**

1. **Il n'est déclaré nulle part dans `evolution-spontanee`.** Les dix-sept descriptions ont
   été relues une par une. Le plus proche, `confond-qr-et-k`, porte « *croit que $Q_r$ n'est
   calculable qu'à l'équilibre, que $Q_{r,i} \ne K$ signifie qu'une donnée est fausse, ou
   que **$K$ seul** (sans comparaison à $Q_r$) renseigne sur l'état du système* » — c'est le
   modèle qui **se passe de $Q_r$**, pas celui qui **remplace $K$ par $1$**. Et
   `critere-inverse` porte « *inverse le sens du critère* » : le seuil y est le bon, c'est la
   flèche qui est retournée.
2. **La notion SŒUR le déclare, et pas celle-ci.** `etat-equilibre/items.yaml:54-56` :
   `critere-evolution-errone` — « *se trompe de sens […], **juge sur la grandeur absolue de
   $Q_{r,i}$ au lieu de le comparer à $K$**, ou croit qu'il faut $\tau$ pour prédire le
   sens* ». **Le modèle est reconnu à un chapitre de distance, sur le même objet, et
   `evolution-spontanee` ne le porte pas.** C'est une asymétrie mesurée, pas une intuition.
3. **La leçon le FABRIQUE.** `lesson.md:130` de la notion sœur construit $Q_r$ comme « *le
   rapport entre les concentrations des produits et celles des réactifs* », et ajoute « *un
   $Q_r$ **petit** signifie qu'il y a encore beaucoup de réactifs et peu de produits* ».
   **« Petit » par rapport à quoi ?** Le seul repère qu'un rapport propose spontanément est
   $1$. Rien, dans la prose, n'interdit de le prendre — et la figure de R2, qui aurait pu
   trancher, n'affiche **aucun nombre** (fait **b**).
4. **La scène le rend MESURABLE pour la première fois.** Le modèle produit un nombre
   distinct, $10$ sur $25$, et il place **cinq mélanges pile sur son propre seuil**
   ($Q_{r,i} = 1$ exactement, la diagonale des crans). Aucun item du corpus ne peut faire
   cela : un item donne un mélange, pas vingt-cinq.

**Déclaration YAML à ajouter à `content/pc/evolution-spontanee/items.yaml`** (bloc
`misconceptions:`, après `critere-inverse` dont il est le voisin) — *c'est une commande pour
item-author, pas une modification faite ici* :

```yaml
  - id: mc.chemistry.pc_evolution_spontanee.seuil-un-au-lieu-de-k
    label: "« Le seuil du critère est 1 : Qr,i > 1 annonce le sens direct (plus de produits que de réactifs), Qr,i < 1 le sens inverse »"
    description: >-
      L'élève compare Qr,i à 1 au lieu de le comparer à K : il lit le quotient
      comme un rapport « produits sur réactifs » dont le point d'équilibre
      naturel serait 1, et conclut sur le sens à partir de cette seule lecture.
      Se manifeste aussi par « Qr,i est grand, donc la réaction a beaucoup
      avancé » sans jamais citer K, ou par un verdict rendu quand K n'est pas
      fourni.
    contradicts_principle: >-
      Le seuil du critère est K, et K seul : il dépend de la réaction et de la
      température, et vaut 2,5 pour un couple et 1,8×10^37 pour un autre. Un
      Qr,i de 1 est loin sous K dans un cas et loin au-dessus dans un autre ;
      la valeur absolue de Qr,i ne dit rien tant qu'on ne l'a pas placée par
      rapport à K.
```

**Un seul modèle neuf, et c'est délibéré.** Deux autres candidats ont été écartés faute de
mesure : « *le sens dépend de la concentration la plus grande* » (couvert par
`seuil-un-au-lieu-de-k` dans ses conséquences chiffrées) et « *$K$ change quand on change le
mélange* » (c'est `k-depend-etat-initial` de la notion sœur, et **rien dans `evolution-spontanee`
ne fait varier l'état initial d'un même couple** — jusqu'à cette scène ; **candidat pour la
vague 1**, §13.10).

### 8.3 Les TROIS items que le modèle neuf exige (specs pour item-author)

*Plancher : ≥ 3 items par modèle, comptés au **distracteur** (`items.yaml:1821-1826`). Les
trois ci-dessous sont des **specs**, pas des items finis : le stem, les quatre valeurs et le
modèle de chaque distracteur sont fixés ; la rédaction est d'item-author. Ids proposés :
**ES-30, ES-31, ES-32** (la banque s'arrête à ES-29).*

**ES-30 — `utilisation`, rung R2, difficulté 2.** *Le seuil, sur un couple à $K$ modeste, du
côté où $1$ et $K$ ne disent pas la même chose.*
Stem : $Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$, $K \approx 2{,}5$ ;
$[Sn^{2+}]_i = 2{,}0$ mol/L… **non** : rester dans le domaine des énoncés —
$[Sn^{2+}]_i = 5{,}0\times10^{-2}$ et $[Pb^{2+}]_i = 5{,}0\times10^{-2}$ mol/L, donc
$Q_{r,i} = 1{,}0$. Question : sens d'évolution ?
Choix : **(A, juste)** $Q_{r,i} = 1{,}0 < K = 2{,}5$ ⇒ **sens direct** ; **(B)** « $Q_{r,i} = 1$ :
autant de produits que de réactifs, le système est à l'équilibre » ⇒
**`seuil-un-au-lieu-de-k`** ; **(C)** « $Q_{r,i} = 1{,}0 < K$ donc sens inverse » ⇒
`critere-inverse` ; **(D)** « il manque la masse des métaux » ⇒ `solide-dans-qr`.
*Le stem est construit pour que $1$ et $K$ donnent des verdicts DIFFÉRENTS — c'est la seule
configuration où le modèle est diagnostique.*

**ES-31 — `utilisation`, rung R2, difficulté 3.** *Le même $Q_{r,i}$, deux couples, deux
verdicts.*
Stem : deux mélanges, tous deux à $Q_{r,i} = 10$ ; l'un sur $Zn/Cu^{2+}$
($K = 1{,}8\times10^{37}$), l'autre sur $Sn/Pb^{2+}$ ($K \approx 2{,}5$). Question : les deux
évoluent-ils dans le même sens ?
Choix : **(A, juste)** non — direct pour le premier, inverse pour le second ; **(B)** « oui,
tous deux dans le sens direct : $Q_{r,i} = 10 > 1$, il y a plus de produits » ⇒
**`seuil-un-au-lieu-de-k`** ; **(C)** « oui, tous deux dans le sens inverse : $10$ est un
quotient élevé » ⇒ `critere-inverse` ; **(D)** « oui : le sens dépend du couple, pas du
mélange — le zinc et l'étain cèdent leurs électrons » ⇒ `reactivite-metal-fixe`.
*C'est l'item que la scène rend possible : il exige de tenir DEUX $K$ à la fois.*

**ES-32 — `application_experimentale`, rung R2, difficulté 4.** *Le verdict rendu sans $K$.*
Stem : un compte rendu de TP donne les concentrations d'un mélange et son quotient,
$Q_{r,i} = 3{,}0\times10^{2}$, mais **la fiche de données est déchirée : $K$ manque**. Un
élève conclut « sens direct, $Q_{r,i}$ est grand ». Que penser, et que faut-il pour
conclure ?
Choix : **(A, juste)** on ne peut pas conclure sans $K$ ; il faut la constante d'équilibre de
cette réaction à cette température ; **(B)** « la conclusion est juste : au-dessus de $1$,
c'est le sens direct » ⇒ **`seuil-un-au-lieu-de-k`** ; **(C)** « la conclusion est
inversée : $Q_{r,i}$ grand annonce le sens inverse » ⇒ `critere-inverse` ; **(D)** « on peut
conclure en observant le bécher, c'est la seule méthode sûre » ⇒
`pas-de-critere-predictif`.
*C'est le seul des trois qui vise `application_experimentale`, l'habileté à 20 % contre une
cible de 15 % — et le seul qui exerce « ce qui manque pour conclure », geste de
`resolution_probleme` sans en atteindre le niveau (§1, non-verdict).*

### 8.4 Le solde de couverture, honnête

- **Le modèle neuf arrive à exactement 3 items — marge NULLE, et c'est déclaré.** Tout
  retrait casse le plancher. *Même situation que douze des dix-sept familles existantes
  (`items.yaml:1856-1859`), donc pas une exception : une régularité du fichier, et un risque
  à connaître.*
- **Aucun des trois items neufs n'est de niveau `resolution_probleme`.** La notion reste à
  **0 %** sur une cible de **35 %** (§0.3). **Cette scène ne referme pas cela**, et ce n'est
  pas faute de l'avoir cherché : un pari à quatre choix est un QCM.
- **Les neuf modèles existants ne gagnent AUCUN item.** La scène les *confronte* ; elle ne
  les *mesure* pas — un pari de scène ne compte pas dans le banc (le modèle apprenant est
  bâti sur le banc de fin seul, `items.yaml:1824-1825`). **Le `pedagogy_wiring.misconceptions`
  du descripteur en nommera DIX** (les neuf + le neuf), et `validate-content` exige
  désormais que chacun soit **déclaré** au moment où la scène est validée (ADR 0041,
  addendum du manège).

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4).

> **On interdit des FORMES, pas des noms** (ADR 0036). Interdire « potentiel standard » sans
> interdire `E°` laisse passer le symbole. Chaque ligne liste les **variantes d'écriture**,
> symbole et forme LaTeX comprises ; la porte les cherche dans le texte **RENDU** (après
> KaTeX, annotations TeX comprises), en **début de mot** et en Unicode.

1. **Aucun potentiel standard, aucune échelle de potentiels, aucun Nernst.** `exclusions`
   (`pc-physique-chimie.yaml:532-533`) et `limites` (`:523`). Interdits : `E°`,
   `E^\circ`, `E^{\circ}`, `E^0`, `E0`, `potentiel standard`, `potentiel d'électrode`,
   `potentiel rédox`, `échelle des potentiels`, `ESH`, `électrode standard`,
   `hydrogène standard`, `Nernst`, `0,059`, `0,06/n`, `\log\frac{[Ox]}{[Red]}`, `RT/nF`,
   `plus noble`, `moins noble`, `classification électrochimique`.
   *C'est la frontière la plus structurante de cette scène : les trois $K$ sont **donnés**,
   comme le bac les donne, et la scène ne dit jamais d'où ils viennent.*
2. **Aucune thermodynamique.** `exclusions` (`:534-535`), `limites` (`:524`). Interdits :
   `\Delta G`, `\Delta_r G`, `enthalpie`, `enthalpie libre`, `entropie`, `\Delta S`,
   `Gibbs`, `spontanéité thermodynamique`, `exergonique`, `endergonique`.
3. **Le critère est le SEUL juge affiché.** `limites` (`:524`, « *critère d'évolution via
   $Q_r$ vs $K$ uniquement* »). Interdits : toute règle concurrente nommée —
   `règle du gamma`, `règle du γ`, `le plus réducteur réagit`, `hiérarchie des couples`,
   `échelle de réactivité`, `série électrochimique`.
4. **Aucun avancement, aucun $\tau$, aucun tableau.** C'est le chapitre `etat_equilibre`, et
   la scène ne calcule aucun état final (§2.6). Interdits : `avancement`, `x_{max}`,
   `x_max`, `x_f`, `\tau`, `τ`, `taux d'avancement`, `tableau d'avancement`,
   `réactif limitant`, `transformation totale`, `transformation limitée`.
5. **Aucune chaleur, aucune énergie — c'est R3 (chapitre 4).** Interdits : `chaleur`,
   `thermique`, `exothermique`, `endothermique`, `température` *(en position de variable
   réglable ; « à la température de l'expérience » est **autorisé**, c'est la formule des
   énoncés)*, `\text{J}`, `joule`, `énergie libérée`, `agitation`, `tiède`, `chauffe`.
6. **Aucune pile, aucun montage électrique — c'est R4 (chapitre 5) et le chapitre
   `piles`.** Interdits : `pile`, `anode`, `cathode`, `borne`, `pôle`, `électrode`,
   `polarité`, `f.é.m`, `fem`, `courant`, `ampèremètre`, `voltmètre`, `circuit`,
   `pont salin`, `jonction`, `fil conducteur`, `schéma conventionnel`, `\ominus`,
   `\oplus`, `\|`, `Faraday`, `\mathcal{F}`, `Q = I`, `coulomb`, `\text{C}`.
   *La mesure de la revue est le garde-fou : `lesson.md` ne contient aucune de ces chaînes
   (`REVIEW:98-100`). Une scène qui les introduirait serait la première.*
7. **Aucune acido-basique, aucune précipitation — c'est R5 (chapitre 6), et la
   précipitation n'est nulle part dans le cadre.** Interdits : `pH`, `pK`, `K_A`, `pK_A`,
   `acide`, `base`, `Brønsted`, `proton`, `H_3O^+`, `HO^-`, `précipit`, `solubilit`,
   `K_s`, `dissolution`, `AgCl`.
8. **Aucun graphe, aucun temps.** La scène n'en a pas (§6.1). Interdits : `en fonction du
   temps`, `t (s)`, `minute`, `pente`, `coefficient directeur`, `axe des abscisses`,
   `courbe`, `Q_r(t)`, `\Delta t`.
9. **Aucune incertitude chiffrée.** La scène a une **précision d'affichage**, pas une
   incertitude de mesure (§5.4). Interdits : `±`, `\pm`, `incertitude`, `écart-type`,
   `\sigma`, `erreur relative`, `intervalle de confiance`.
10. **Aucun nombre hors des trois ensembles déclarés.** Les seules **concentrations**
    affichées sont les cinq crans du §5.2 (et elles seules, avec leur unité `mol/L` ou
    `mol.L^{-1}`) ; les seules **constantes $K$** sont $\{1{,}8\times10^{37} ; 2{,}5 ;
    4{,}0\times10^{15}\}$ ; les seuls **quotients** sont les 75 valeurs des tables du §5.3.
    ⚠ **`1,0×10^{-6}` et `1,0×10^{-5}` sont explicitement interdits** (§3) : ce sont les
    nombres de l'exemple travaillé qui SUIT le marqueur.
    *La porte relève l'ensemble exact des nombres suivis de `mol/L`, de `mol.L`, de
    `mol·L`, et ceux en position de $K$ ou de $Q_r$, et les compare aux trois ensembles.*
11. **La convention de flèche, dans les deux sens — ET ELLE N'EST PAS CELLE DU BANC
    D'ÉLECTROLYSE.** Le banc d'électrolyse impose « *toute ligne contenant `e^-` porte
    $\rightleftharpoons$ ; aucune ligne sans `e^-` n'en porte* » (sa spec §9.17) — règle
    tirée du cadre « *réactions aux électrodes (double flèche) et équation bilan (simple
    flèche)* » (`:511`, `:520`), qui ne vaut que pour les piles et l'électrolyse. **Dans
    cette notion-ci, l'équation bilan s'écrit $\rightleftharpoons$**, et c'est le choix
    constant de la leçon : `lesson.md:51`, `:73`, `:93`, `:189`, `:201` — cinq bilans, cinq
    doubles flèches. **La règle de la scène est donc : toute équation affichée porte
    $\rightleftharpoons$, aucune ne porte `\rightarrow` ni `\to` seuls**, et la porte le
    mesure dans les deux sens. ⚠ **Divergence déclarée entre deux scènes de la même
    matière ; c'est un arbitrage au propriétaire, pas une erreur** — §13.11.
12. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester indéfini même
    panneau OUVERT** — famille de porte à part entière.
13. **La scène n'est pas un TP et ne le prétend jamais.** Interdits : `travaux pratiques`,
    `TP`, `protocole`, `mode opératoire`, `burette`, `pipette`, `fiole jaugée`, `rinçage`.

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points 1 à 4
> seulement**, et ce sont aussi les phrases de légende (échelonnées, §7.6 E). **Les points 5
> à 7 ne sont rendus nulle part** : ce sont des notes de conception.

1. **L'axe est logarithmique : une même longueur y vaut toujours un même FACTEUR, jamais une
   même différence.** Entre $1$ et $10$, la distance dessinée est la même qu'entre $10^{30}$
   et $10^{31}$. C'est ce qui permet de faire tenir $2{,}5$ et $1{,}8\times10^{37}$ sur le
   même axe — et c'est ce qui rend l'écart de trente-sept décades **visible** au lieu d'être
   seulement écrit.
2. **La scène place le mélange ; elle ne le fait pas évoluer.** La flèche dit **vers où**, et
   rien d'autre : ni à quelle vitesse, ni jusqu'où, ni en combien de temps. Ces trois
   questions-là appartiennent à d'autres chapitres, et la scène s'arrête là où le critère
   s'arrête.
3. **Les trois constantes sont DONNÉES, à une température qu'on ne règle pas.** $K$ dépend
   de la réaction **et** de la température ; la scène en montre une seule, comme le fait
   chaque énoncé qui écrit « à la température de l'expérience ». Changer de bain change $K$
   parce qu'on change de **réaction**, jamais de température.
4. **Les concentrations sont celles de l'instant où l'on vient de mélanger.** On suppose la
   solution homogène et la réaction pas encore commencée — c'est exactement l'état $i$ du
   critère, et c'est une idéalisation de bécher, pas une mesure.
5. *(non rendu)* **$K \approx 2{,}5$ pour $Sn/Pb$ est la valeur du corpus (ES-19), et elle
   est SENSIBLE.** Les deux couples sont séparés d'environ $0{,}01$ V : un écart de tables
   de $0{,}005$ V déplace $K$ entre $\approx 1{,}5$ et $\approx 3{,}5$. **Le comptage
   9 / 1 / 15 du §5.3 B change si la valeur change** — c'est la dépendance la plus fragile
   de toute la scène. §13.3.
6. *(non rendu)* **Le bécher est un dessin d'énoncé, pas un instrument.** Les ions n'y sont
   pas comptés, la lame n'y maigrit pas, et rien n'y bouge : la scène n'a ni temps ni
   course. La seule chose que le bécher ajoute à l'axe est **qui** est oxydé — et c'est la
   seule raison pour laquelle il est là.
7. *(non rendu)* **Les trois bains ne sont pas trois expériences « au même titre ».** A est
   celui de la leçon et de l'accroche ; B n'existe dans le corpus que comme **un** item ; C
   que comme **un** item. La scène leur donne un poids égal à l'écran, ce que le corpus ne
   leur donne pas. *C'est délibéré (§5.1), et c'est une décision à connaître.*

---

## 11. La porte (`web/scripts/scene-quotient.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du produit ;
elle trouve son panneau par `[data-scene="echelle-des-quotients"]`, **jamais** par
`[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du champ
magnétique, run 747). Elle se lance **plusieurs fois, à plusieurs largeurs** (1 280 px et
390 px au minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**,
**AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas 2D manque au banc,
elle sort **MUET, en échec**, jamais en vert. Sur une exception, elle **imprime d'abord tout
ce qu'elle a mesuré**, puis l'arrêt lui-même (leçon de la vague 2 du plan complexe : une
porte qui meurt sans rien dire rend « MANQUÉ » sur un sabotage qu'elle avait déjà attrapé).

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES** (règle de la
corde). Elle les recalcule **sans importer aucun module du produit** (ADR 0036), depuis les
seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $Q_{r,i}$ aux **75** états (25 par bain, l'exposant au bain C) | les tables A, B, C du §5.3 | **égalité de chaîne**, 2 c.s., écriture scientifique hors $[-2;2]$ |
| N2 | le **verdict** aux 75 états | bain A : 25 direct · bain B : **9 inverse, 1 équilibre, 15 direct** · bain C : 25 direct | chaîne exacte |
| N3 | **le cran unique de l'équilibre** : sur les 75 états, **exactement un** affiche « déjà à l'équilibre », et c'est (B, $2{,}5\times10^{-2}$, $1{,}0\times10^{-2}$) | — | exact — *un second état à l'équilibre serait un cran mal choisi* |
| N4 | **$K$ ne dépend QUE du bain** : aux 25 états d'un bain, la chaîne `k` est **identique au caractère près** | « 1,8×10^37 » · « 2,5 » · « 4,0×10^15 » | **égalité de chaîne, 75 états, 3 valeurs** — *c'est la garde structurelle du §2.2* |
| N5 | **l'exposant du bain C est STRUCTUREL** : $Q_r(\text{C})$ à $[Ag^+]$ divisé par 10 est multiplié par **100**, aux 5 crans de $[Cu^{2+}]$ | facteur $100$ exact | égalité de chaîne sur les deux valeurs |
| N6 | les **quatre valeurs du pari de S4**, recalculées depuis les quatre modèles nommés | $0{,}10$ · $1{,}0\times10^{-2}$ · $5{,}0\times10^{-3}$ · $10$ | **deux à deux distinctes**, égalité de chaîne avec les libellés |
| N7 | les **deux comptages du pari de S2** | $0$ et $10$ *(et $25$ pour le modèle inverse)* | exact, recomptés sur la grille 5×5 |
| N8 | `ecart` à S2 | « au moins 34 ordres de grandeur » | chaîne exacte ; **entier, jamais décimal** |
| N9 | les **bornes** : `oxydant` 5 crans, `produit` 5 crans, `bain` **2 crans à S4 et 3 à S5** ; aucune valeur intermédiaire | — | exact |
| N10 | **la diagonale** : aux 5 états où les deux crans sont égaux, `qri` vaut exactement « 1,0 » aux bains A et B | — | égalité de chaîne — *c'est ce qui rend `seuil-un-au-lieu-de-k` visible* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de l'axe**, jamais au pixel absolu : le
facteur px/décade est lu sur **deux graduations étiquetées** du dessin (leçon de la porte du
champ magnétique). Lancée à **1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `axe-decades` | l'écart en pixels entre deux décades consécutives est **constant sur tout l'axe**, à $\le 1$ px, aux deux largeurs | un axe dont l'échelle se resserre aux bords doit rougir **seule** ; un axe dont les bornes changent avec le bain aussi |
| `position-qri` | l'abscisse du repère $Q_{r,i}$ $=$ $\log_{10}(Q_{r,i})$ × (px/décade) + origine, à $\le 2$ px, aux **75** états | un repère dessiné depuis un autre nombre que celui affiché doit rougir ; un repère **plafonné** aux bords aussi |
| `position-k` | l'abscisse du pivot $K$, aux **3** bains, même formule ; et **le pivot ne bouge pas** entre les 25 états d'un même bain, à $\le 1$ px | un pivot qui glisse avec le mélange doit rougir **seul** — *c'est la misconception dessinée* |
| `cote-et-verdict` | le repère est **à gauche** du pivot **si et seulement si** `sens` dit « direct » ; à droite ssi « inverse » ; **confondu à $\le 2$ px** ssi « déjà à l'équilibre » — aux 75 états | un verdict qui contredit la position doit rougir **seule** |
| `fleche-du-verdict` | la flèche d'accent part du repère et pointe **vers** le pivot, aux 75 états | une flèche retournée doit rougir **seule** ; une flèche qui dépasse le pivot aussi |
| `becher-et-roles` | après la révélation, l'étiquette `oxydé` est posée sur l'espèce que `especes` nomme, aux 3 bains et aux 2 verdicts du bain B | les deux rôles échangés doivent rougir **seules** ; un rôle attaché au **métal** plutôt qu'au verdict aussi — *c'est `reactivite-metal-fixe` posée dans le code* |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; aucune flèche sur l'axe ; aucune flèche dans le bécher ; aucune étiquette de rôle ; aucune lecture `sens` ni `especes` dans le DOM ; **et à S4, aucune lecture `qri` ni `expression`** | après l'engagement : la flèche, les rôles et les lectures paraissent, et l'accent avec |
| `etiquettes` | aucune étiquette n'en chevauche une autre, n'est barrée par un trait, ne recouvre le DESSIN sous une étiquette sans fond, ni ne sort du cadre — à 1 280 **et** 390 px ; **le cas obligatoire est S5**, où $Q_{r,i}$ et $K$ sont au même point | deux étiquettes superposées doivent rougir ; `disposer` (pièce commune) **obligatoire ici** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.6 contre le descripteur : `bain` absent du DOM avant S4 ; le cran **C** absent avant S5 ; `especes` absente aux étapes 1 et 2 ; `ecart` absente à S1, S3 et S5 | ouvrir `bain` dès S3, ou offrir le cran C dès S4, doit rougir **seule** |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune chaîne interdite de l'étape courante (consigne, retours, lectures, notes et région vivante confondues), et contient bien celles que l'étape emploie | écrire « étain » dans un retour de S2, ou « exposant » dans un retour de S3, doit rougir **seule** |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | un bain peint en bleu « parce que c'est du sulfate de cuivre » doit rougir **seul** |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles,
les autres **absents du DOM** ; `etat_revele` pose bien le réglage annoncé à S2 ; **S1, S4
et S5 n'en ont pas, et c'est déclaré**) · `paris` (4 choix, exactement un juste, un `retour`
par choix, rien dans la région live avant l'engagement) · **`frontiere`** (aucune des
chaînes du §9 dans le panneau ouvert, **une sonde par forme** ; et les trois ensembles de
nombres du §9.10 relevés et comparés exactement) · **`fleches-chimiques`** (§9.11 : **toute
équation affichée porte $\rightleftharpoons$, aucune ne porte `\rightarrow` seul** — mesuré
sur le rendu KaTeX, dans les deux sens) · `eclairs` (**attendu structurellement vide**,
mesuré quand même) · `sans-mouvement` · `katex` (aucun LaTeX brut visible ;
$\rightleftharpoons$, $Q_{r,i}$, $[Ag^+]^2$, `mol·L⁻¹` rendus) · `lectures-entieres` (chaque
formule d'une lecture tient dans sa case et dans sa liste, à 1 280, 390 et au grand texte —
famille née de la vague 2 du plan complexe) · `ergonomie` (pièce commune
`scripts/lib/scene-ergonomie.mjs`, **sans** argument `course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette
commande** (ADR 0034). Sabotages à outiller :

1. poser $Q_r = c_o/c_p$ (inversé) → `nombres` (N1, N6) et `cote-et-verdict` ;
2. poser $Q_r(\text{C}) = c_p/c_o$ (**exposant omis**) → **N1 et N5 seules**, et
   `position-qri` ;
3. poser $Q_r(\text{C}) = c_p/(2c_o)$ (**coefficient en facteur**) → **N5 seule** ;
4. **faire dépendre $K$ du mélange** (recopier $Q_{r,i}$ dans `k`) → **N4 seule**, et
   `position-k` aux pixels ;
5. **retourner le critère** ($Q_{r,i}<K$ ⇒ inverse) → **N2 seule**, et `cote-et-verdict` ;
6. **poser le seuil à $1$** au lieu de $K$ (la misconception `seuil-un-au-lieu-de-k` dans le
   code) → **N2 seule** : le bain A passerait de 25 direct à 15 direct / 10 inverse ;
7. arrondir $Q_{r,i}$ à **un** chiffre significatif → **N1 et N3** : $2{,}5$ deviendrait $2$
   et le cran d'équilibre disparaîtrait ;
8. **ajouter un cran $2{,}5\times10^{-1}$** → **N3 seule** : deux états à l'équilibre au lieu
   d'un ;
9. rendre `ecart` décimal (« 34,6 ») → **N8 seule** ;
10. **faire glisser le pivot avec le mélange** → `position-k` **seule** ;
11. resserrer l'échelle de l'axe aux bords → `axe-decades` **seule** ;
12. plafonner le repère aux bords de l'axe → `position-qri` **seule** ;
13. retourner la flèche du verdict → `fleche-du-verdict` **seule** ;
14. **attacher « oxydé » au métal de la lame quel que soit le verdict** → `becher-et-roles`
    **seule** ;
15. afficher `sens`, ou une flèche, ou une étiquette de rôle **avant** le pari →
    `avant-pari` ;
16. afficher `qri` à S4 avant le pari → `avant-pari` **seule** *(c'est le pari lui-même)* ;
17. ouvrir `bain` dès S3, ou offrir le cran C dès S4 → `fuite-inter-etapes` **seule** ;
18. écrire « étain » dans un retour de S2, « exposant » dans un retour de S3, « équilibre »
    dans un retour de S4, « 1,0×10^{-5} » n'importe où → `formule-graduee` **seule**, **une
    mesure par étape** ;
19. écrire une équation avec `\rightarrow` simple → `fleches-chimiques` **seule** ;
20. peindre un bécher dans une teinte hors jetons → `palette` **seule** ;
21. `import("three")` dans le module de la scène → `pas-de-3d` ;
22. superposer les étiquettes de $Q_{r,i}$ et de $K$ à S5 sans `disposer` → `etiquettes`
    **seule**, **à 390 px** ;
23. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `E°`, `Nernst`, `potentiel
    standard`, `ESH`, `plus noble` · `\Delta G`, `enthalpie`, `entropie` · `règle du gamma`,
    `série électrochimique` · `avancement`, `\tau`, `x_{max}`, `réactif limitant` ·
    `chaleur`, `exothermique`, `joule` · `pile`, `anode`, `cathode`, `borne`, `courant`,
    `Faraday`, `pont salin` · `pH`, `K_A`, `précipit`, `K_s` · `pente`, `en fonction du
    temps` · `±`, `incertitude` · `TP`, `protocole` · **une concentration hors des cinq
    crans**, **un $K$ hors des trois**, **`1,0×10^{-6}` et `1,0×10^{-5}`**.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est
    une **sonde manquante**, pas un produit propre.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui
le garde.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée du banc d'électrolyse, DÉCISIONS §29 point 12) :

```json
"echelle-des-quotients": {
  "temps": false,
  "course": false,
  "dimension": "2d",
  "controles": ["oxydant", "produit", "bain"],
  "etat": ["bain", "c_produit", "c_oxydant"],
  "valeurs": {
    "bain": ["A", "B", "C"],
    "c_produit": ["1.0e-3", "1.0e-2", "2.5e-2", "1.0e-1", "5.0e-1"],
    "c_oxydant": ["1.0e-3", "1.0e-2", "2.5e-2", "1.0e-1", "5.0e-1"]
  },
  "lectures": ["equation", "expression", "qri", "k", "ecart", "sens", "especes"]
}
```

`validate-content` échoue **en dur** sur : une scène inconnue, un contrôle inconnu, un état
hors bornes, un contrôle qu'aucune étape n'ouvre, un `etat_revele` sans pari, un
`revele_apres_h > 0` sur une scène sans temps, et **un id de misconception non déclaré** dans
un pari ou dans `pedagogy_wiring`. *Le dernier point impose que **`seuil-un-au-lieu-de-k`
soit déclaré dans `items.yaml` AVANT que la scène passe la validation** — c'est un ordre de
construction, pas un détail.*

**Descripteur** — `content/pc/evolution-spontanee/media/echelle-des-quotients.json`,
`"tool": "scene2d"`, `"type": "manipulable"`, avec `title_fr`, `caption_fr`, `boundary`
(le §9 en une phrase), `fit_caveat` (les points 1 à 4 du §10), `fallback_note`,
`pedagogy_wiring` (`why_manipulable`, `predict_then_reveal`, **dix** ids de misconception),
`spec_ref`, `adr_ref`, et les cinq `etapes` du §7.

**Ordre de construction, et il n'est pas commutatif :**

1. **item-author** déclare `seuil-un-au-lieu-de-k` dans `items.yaml` et écrit ES-30, ES-31,
   ES-32 *(sans quoi `validate-content` refuse la scène)*.
2. **frontend-builder** écrit `quotient-modele.ts` et son test unitaire
   (`test-quotient.mjs`) : les 75 $Q_{r,i}$, les 75 verdicts, le cran unique d'équilibre,
   l'exposant structurel. **Le modèle est vert avant qu'un pixel soit dessiné.**
3. **frontend-builder** écrit `quotient-rendu.ts`, `QuotientPanel.tsx`, et l'entrée de
   registre.
4. **content-author** écrit le descripteur (les cinq étapes, leurs textes) et la prose du
   §4.
5. **frontend-builder** écrit `scene-quotient.mjs` et sa campagne `--essai-rouge`, et la
   lance **plusieurs fois, à deux largeurs**, avant de la croire.
6. **Vague 1** (deux critiques : pédagogie, fidélité bac), **puis vague 2** (dessin, calme,
   ergonomie, sur des CAPTURES lues).

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

**13.1 — Les `limites` et `exclusions` du cadre PC sont `derived`, et elles sont posées sous
le mauvais chapitre.** Le §9 repose sur `pc-physique-chimie.yaml:522-535`, dont les
`limites` vivent sous `transformations_forcees` alors que leur contenu vaut pour tout le
sous-domaine. **Défaut : je les porte comme sous-domaine, sans toucher au fichier, et je le
déclare.** *Pour défaire :* faire valider les quatre `exclusions` et les trois `limites` par
l'humain (RULES §5), et les remonter au niveau `sous_domaine` — ce qui ne change **aucune**
ligne du §9, seulement sa citation.

**13.2 — `etat-equilibre` R5 : la scène est-elle le bon moment pour trancher §3.1 ?** La
revue de `etat-equilibre` laisse ouvert « supprimer et renvoyer, ou assumer l'anticipation et
la documenter » (11 % de la notion). **Défaut : ne rien trancher, et poser la scène dans
`evolution-spontanee`, qui ne dépend pas de l'issue** (§0.2). *Pour défaire :* si le
propriétaire tranche « supprimer et renvoyer », la scène devient le **seul** lieu où le
critère se manipule, et le §4.1 doit alors le réénoncer plus longuement, pas en une ligne.

**13.3 — $K \approx 2{,}5$ pour $Sn/Pb$ : valeur du corpus, sensibilité déclarée.** Le
comptage 9 / 1 / 15 du §5.3 B en dépend, et l'écart entre les deux couples est de $0{,}01$ V
(§10.5). **Défaut : porter la valeur du corpus (ES-19) sans la corriger**, et l'afficher
comme une donnée, ce qu'elle est. *Pour défaire :* faire trancher la valeur par
research-lead (tables officielles marocaines), puis recompter la table B — **et le cran
d'équilibre du §5.2 point 2 avec elle**, car il est construit sur $2{,}5$ exactement.

**13.4 — La flèche « vers $K$ » sans point d'arrivée : est-ce assez pour honorer le
`programme` (« $Q_r$ tend vers $K$ au cours du temps ») ?** **Défaut : oui** — la flèche dit
la tendance, le reste appartient à `etat_equilibre` (§2.6). *Pour défaire :* une sixième
étape, **sur le bain B seulement** (où l'arrivée est calculable et modeste), avec l'état
final chiffré — mais elle ferait entrer l'avancement, que le §9.4 interdit.

**13.5 — Cinq crans discrets plutôt qu'un curseur continu.** **Défaut : cinq crans** —
c'est le cran d'équilibre exact qui l'impose (§2.6). *Pour défaire :* un balayage **muet**
(sans aucun chiffre) après la révélation d'une étape, comme celui de S3 du plan complexe, qui
laisserait les cinq crans exacts intacts.

**13.6 — 75 états : trop ?** La porte les énumère tous ; l'élève n'en touche qu'une
poignée. **Défaut : les garder** — les comptages de S2 et de la `suite` de S3 (« 9, 1, 15 »)
n'existent que parce que la grille est complète. *Pour défaire :* retirer le cran
$1{,}0\times10^{-2}$, ce qui donne 48 états — **mais détruit le cran d'équilibre**
($2{,}5\times10^{-2}/1{,}0\times10^{-2}$). **Cette réduction-là est impossible ; toute autre
réduction doit préserver ce couple.**

**13.7 — Sept lectures à S4 : une de trop pour le calme ?** **Défaut : sept**, parce que le
retour de S4 cite l'écart (16 ordres de grandeur) et que les rôles sont déjà acquis depuis
S3. *Pour défaire :* retirer `especes` à S4 — une ligne du descripteur, et la famille
`formule-graduee` à réécrire.

**13.8 — `cp-r2-critere` porte une constante que sa source a corrigée.** $K \approx
4{,}0\times10^{15}$ pour $Fe + 2\,Ag^+$, là où ES-1 porte $1{,}0\times10^{42}$ depuis la
vague 1 (§0.3). **Défaut : le signaler et ne pas le réparer ici** (la conclusion de l'item ne
bouge pas). *Pour défaire :* une passe d'item-author qui aligne le clone sur son original —
et qui vérifie **les quatre autres clones** de la même campagne.

**13.9 — Une scène pour `piles` ?** La polarité, le sens du courant et les électrons à
contre-sens sont exactement le genre de fait qu'un manipulable rend — et `piles` porte
**6 entrées de banque**, la couverture d'annales la plus riche de la chaîne. **Défaut : pas
maintenant** ; cette scène-ci s'interdit tout le vocabulaire de la pile (§9.6), ce qui laisse
la place propre. *Pour défaire :* une spec séparée, qui commencerait par mesurer ce que
`courant-vs-electrons.svg` et `pile-daniell.svg` font déjà.

**13.10 — Un second modèle neuf, « $K$ change quand on change le mélange » ?** La notion
sœur le déclare (`k-depend-etat-initial`, 6 items) ; `evolution-spontanee` ne le porte pas,
**et jusqu'à cette scène rien n'y faisait varier l'état initial d'un même couple**. La scène
le rend visible (N4 : trois chaînes `k` pour 75 états). **Défaut : ne PAS le déclarer** — un
seul modèle neuf par scène, et celui-ci n'a pas encore de manifestation mesurée dans
`evolution-spontanee`. *Pour défaire :* le déclarer en vague 1, avec trois items, et lui
donner le quatrième choix de S2.

**13.11 — Deux scènes de chimie, deux règles de flèche opposées.** Le banc d'électrolyse
impose « bilan ⇒ flèche simple » ; cette scène impose « toute équation ⇒ double flèche »
(§9.11). Les deux suivent leur leçon et leur chapitre du cadre. **Défaut : les garder
divergentes, et l'écrire dans les deux specs.** *Pour défaire :* une note de convention
corpus-wide, qui dirait quand le bilan d'une transformation **non totale** s'écrit ⇌ et quand
celui d'une transformation **forcée** s'écrit → — ce qui est un travail de content-lead, pas
de scène.

**13.12 — Le nom `echelle-des-quotients` est proche de la figure `qr-vs-k-echelle` de
`piles`.** Deux objets voisins, deux espaces de noms différents (registre de scènes vs slugs
de médias d'une notion). **Défaut : garder le nom**, qui dit ce que la scène est. *Pour
défaire :* `banc-du-quotient`, qui aligne la famille des « bancs » de chimie.

---

## 14. Fait quand

**La scène est faite quand les onze conditions suivantes sont vraies, et pas avant.**

1. `validate-content` passe : la scène est au registre, ses trois contrôles y sont, ses
   états sont dans les bornes, chaque contrôle est ouvert par au moins une étape, et
   **les dix ids de misconception sont déclarés**.
2. `test-quotient.mjs` est vert : les 75 $Q_{r,i}$, les 75 verdicts, **le cran unique
   d'équilibre**, l'exposant structurel du bain C, et **l'indépendance de $K$ vis-à-vis du
   mélange vérifiée sur les signatures du modèle** (leçon du banc d'électrolyse : la façon la
   plus sûre de tenir « ceci ne compte pas » est structurelle).
3. `scene-quotient.mjs` est **VERTE trois fois de suite**, à 1 280 et à 390 px.
4. `--essai-rouge` : **chacune des 23 lignes du §11.4 fait crier sa famille, et elle seule**.
   Une ligne qui ne fait rien rougir est une sonde manquante.
5. `scene-ergonomie` est verte sur la scène neuve **et sur les quatorze autres** (la pièce
   est commune ; un changement partagé se remesure partout).
6. `latex-nu` est vert, **carte fermée comprise** (leçon de la vague 2 : la carte affichait
   « $M$ », dollars compris, et la règle ne l'entendait pas).
7. La règle des liens est verte : les sept `CHEMIN À CRÉER` de l'en-tête existent, ou sont
   exemptés un par un.
8. **La prose du §4 est écrite**, et le §9 lui est appliqué comme au panneau — y compris
   au texte de cette spec, une fois recopiée sous `content/pc/evolution-spontanee/`.
9. **ES-30, ES-31, ES-32 existent**, et `resume-couverture.mjs` recompte
   `seuil-un-au-lieu-de-k` à **3**.
10. **La vague 1 est passée** : deux critiques (pédagogie, fidélité bac), leurs constats
    triés en « appliqué / décliné avec la mesure / au propriétaire », comme les six specs
    précédentes.
11. **La vague 2 est passée** : dessin, calme, ergonomie, **sur des captures lues**, à
    1 280 px, 390 px et 390 px au grand texte.

---

## 15. Ce que je n'ai pas pu vérifier

**15.1 — Le rang de la scène dans la série.** « Quinzième manipulable, neuvième plan » est
**repris de la spec sœur**, pas recompté contre `scenes.json`. Je n'ai pas énuméré le
registre ; si une scène est livrée entre-temps, le nombre est faux. *À recompter avant de
l'écrire dans un ADR.*

**15.2 — Aucune commande de SHELL n'a été lancée.** Toutes les « commandes » citées au §0.1
et ailleurs sont des recherches **ripgrep** passées par l'outil de recherche de l'agent, plus
des lectures de fichiers ; les comptes (`⇒ 29`, `⇒ 0`, `⇒ 1 · 2 · 6`) sont des comptes
**rendus par l'outil**, pas la sortie d'un terminal. **Je n'ai lancé ni `npm`, ni
`validate-content`, ni aucune porte, ni aucun build.** *Écrit ici parce que la vague 1 du
plan complexe a consigné une faute exactement inverse — un `grep` cité qui n'avait jamais été
lancé.*

**15.3 — Rien de ce document n'a été mesuré sur un RENDU.** Aucune capture, aucune page
servie, aucun pixel. Toutes les affirmations du §11.2 sont des **prescriptions**, pas des
mesures : elles disent ce que la porte devra trouver, jamais ce qu'elle a trouvé.

**15.4 — Les trois $\Delta E^\circ$ du §5.1 viennent de ma connaissance des tables, pas
d'une source du dépôt.** Le dépôt ne porte aucune table de potentiels standards — et c'est
normal, le cadre les exclut. Les trois recoupements ($36{,}7$ · $0{,}33$ · $15{,}3$)
confirment l'**ordre de grandeur** des trois $K$ du corpus ; ils ne les prouvent pas. **La
valeur $2{,}5$ est celle du corpus et reste la seule autorité** (§13.3).

**15.5 — Je n'ai pas lu les 29 items ni les 24 items de `piles` en entier.** J'ai lu les
inventaires de misconceptions, les résumés de couverture, ES-19, ES-21, les trois points
d'arrêt de R2, et les extraits cités. **Une collision de stem entre ES-30/31/32 et un item
existant est donc possible et non écartée** — c'est à item-author de la lever.

**15.6 — Je n'ai pas vérifié les quatre AUTRES clones de la campagne de conversion.**
`cp-r2-critere` est un clone d'ES-1 qui n'a pas suivi la correction de son original (§0.3,
§13.8). `checkpoints.yaml` déclare d'autres `item_source: clone_of_*` ; **je n'ai lu que
celui-là**. Le défaut peut être plus large.

**15.7 — Le comptage « 13 figures, 0 embed » sur les quatre notions repose sur les
marqueurs de `lesson.md`, pas sur le dossier `media/`.** Un média orphelin (présent dans
`media/` et référencé nulle part) ne serait pas compté — précédent avéré :
`maths/nombres-complexes-2/media/rotation-complexe`, orpheline, trouvée par la revue de sa
notion. **Je n'ai pas fait ce croisement ici.**

**15.8 — Je n'ai pas vérifié que `piles`, `etat-equilibre` et `transformations-deux-sens`
n'ont pas de `spec.md` ni de `spec-scene-*.md`.** Le `rg` du §0 portait sur
`docs/pipeline/propositions/` et sur `content/*/*/spec-scene-*.md` ; **il ne cherchait pas
`spec-extension.md`**, forme que deux notions PC emploient (`reactions-acido-basiques`,
`chute-mouvements-plans`). Une prescription d'`[[embed:]]` pourrait donc exister sous cette
forme-là, et faire de cette scène le solde d'une dette écrite plutôt qu'une nouveauté. **À
vérifier avant de dire que `dette-manipulable` ne bouge pas.**

**15.9 — La cible d'habiletés ne sera pas plus mesurable après cette livraison
qu'avant.** `habilete` reste absent des 29 items ; les trois items neufs le porteront, ce
qui donnera **3 items sur 32** avec le champ. **Ce n'est pas un début de mesure, c'est un
échantillon non représentatif** — et le déclarer maintenant évite qu'on le lise comme un
progrès.
