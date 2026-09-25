# spec — manipulable 2D `echelle-des-quotients` (PC · `evolution-spontanee`, **R2**)

**Statut : PROPOSITION révisée après la vague 1 — non construite.**
Écrite le 2026-09-25 par pedagogy-architect ; révisée le 2026-09-25 après les deux
critiques de vague 1 (pédagogie, fidélité bac), qui ont toutes deux rendu **CONSTRUIRE
APRÈS CORRECTIONS**.

---

## Ce que la vague 1 a changé

*Les deux critiques ont validé le trou mesuré, l'arbitrage de notion hôte, la lecture du
cadre, l'arithmétique des 75 états et les trois refus (pas d'animation $Q_r \to K$, pas de
vocabulaire de pile, crans discrets). **Rien de tout cela n'est redessiné.** Ce qui suit est
la liste des changements de fond, chacun avec l'endroit où il vit désormais.*

| # | ce que la vague 1 a trouvé | ce qui a changé, et où |
|---|---|---|
| **1** | **Les deux critiques, B1 — le plomb n'est pas dans le bécher.** Le sens inverse du bain B consomme $Pb_{(s)}$ ; la consigne ne posait qu'une lame d'étain. La rupture qui casse `reactivite-metal-fixe` était mise en scène sur une observation impossible. | **Le bain B porte les DEUX métaux** — lame d'étain **et** dépôt de plomb « laissé par un essai précédent », le procédé exact d'ES-19 (`items.yaml:1087-1088`). Consigne (§7.3, §7.5), dessin (§5.5), porte `becher-et-roles` (§11.2), et **ES-31 dont le stem avait le même défaut** (§8.3). La phrase d'équilibre dynamique de S5 n'arrive **qu'après** ça (§7.5). |
| **2** | **Fidélité B2 — `seuil-un-au-lieu-de-k` déclaré dans une polarité, employé dans l'autre.** La polarité déclarée ($Q_{r,i}>1 \Rightarrow$ direct) ne se distingue pas de `critere-inverse` sur les items ; la polarité employée ($Q_{r,i}>1 \Rightarrow$ inverse) est le vrai modèle de substitution de seuil. | **Une seule polarité, l'employée.** Label et `description` YAML réécrits (§8.2) ; **ES-31 et ES-32 rebâtis** pour que le modèle prédise autre chose que `critere-inverse` ; **chaque item est posé sur une configuration où $1$ et $K$ ne disent pas la même chose** (§8.3). |
| **3** | **Pédagogie B2 + fidélité I4 — l'axe fixe ne peut pas montrer S3.** $0{,}6$ décade sur 41 fait ~5 px à 390 px, et la tolérance « confondu » est à 2 px : S3 et S5 sont la même image. | **Une bande de travail centrée sur $K$** (§5.5), alignée sur l'axe d'ensemble, à px/décade déclaré et constant ; **ses propres mesures à 1 280 et 390 px** et une porte à deux sens : à 390 px, la paire de S3 **nettement séparée**, celle de S5 **nettement confondue** (§11.2 `bande-de-travail`). |
| **4** | **Pédagogie B3 — cinq lignes du registre que rien ne casse à l'écran.** | **Chaque ligne re-méritée ou rayée, une par une** (§8.1) : `solide-dans-qr` **rayée** ; `reactivite-metal-fixe` **retirée de S2** (la bonne réponse l'y récompense) et laissée à S3 ; `qr-produits-reactifs-inverses` re-méritée sans l'appel au seuil $1$, avec la conséquence de verdict nommée sur le bain B (4,2) ; `equilibre-egale-arret-total` re-méritée par une **lecture `melange` neuve** ; `spontane-egale-instantane` **rayée**, sa limite déclarée. |
| **5** | **Fidélité I2 — $K = 2{,}5$ est porteur.** Les tables donnent $\approx 2{,}2$–$2{,}4$ ; la partition 9/1/15 et l'unique équilibre de S5 n'existent qu'à $2{,}5$ exactement. | **$K$ est présenté comme une DONNÉE**, écrit « $K = 2{,}5$ » comme les sujets l'écrivent (§5.4) ; **N3 est formulée sur la constante déclarée**, pas sur l'étain et le plomb (§11.1) ; **§13.3 devient un drapeau ROUGE au propriétaire**, avec la plage recalculée. |
| **6** | **Fidélité I1 — un sujet national ne « nomme » aucun piège.** La phrase citée est la voix éditoriale de la maison, dans un bloc `reasoning:`. | **Retiré du §0.1 fait i, du §2.4 et du retour de S4** (§7.4), remplacé par ce qui est vérifiable : *un sujet national a posé ce calcul sur une équation à exposants 2 et 3* (`piles/bank.yaml:750`, `:756`). |
| **7** | **Pédagogie I1–I8, fidélité I3/I5 et les MINEURs.** | S4 **parie sur l'EXPRESSION** (§7.4) ; la suite de S3 devient **le geste unique** — même mélange, autre couple (§7.3) ; S1 n'est plus gagnable en recopiant le dessin (§7.1) ; S5 **ouvre sur un cran voisin** et n'annonce plus sa découverte (§7.5) ; le contrôle `bain` est réglé **en atteignabilité**, pas en présence (§5.6, §7.6 A) ; **ES-33**, un item d'`application_experimentale` réellement mérité, sur la ligne TP du cadre (§8.3) ; les **formes de flèche** sont énumérées pour la porte, et les repères **(1)/(2)** sont portés (§9.11). |
| **8** | **Un défaut neuf, trouvé en révisant, que la vague 1 n'a pas vu.** §8.1 comptait « **neuf** modèles déclarés » puis « **dix** modèles servis » sur une table de **dix** lignes, et §8.4/§12/§14 commandaient **dix** ids à `pedagogy_wiring`. | **Le compte juste est dix modèles existants + le modèle neuf = ONZE.** Corrigé au §8.1, §8.4, §12 et §14. *Aucune des deux critiques ne l'a relevé ; il vient de la relecture ligne à ligne du registre.* |

**Ce qui a été REFUSÉ à la vague 1, avec la mesure** (§16, en fin de document) : trois
attributions de preuve inexactes et une lecture de portée trop courte.

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
critère du chapitre 3* » depuis R3 désigne bien R2 ✓ ; `lesson.md:203` « *(chapitre 3, et
déjà vu dans le chapitre état d'équilibre)* » depuis R5 désigne le même ✓ *(corrigé en
vague 1, fidélité M5 : la première rédaction citait `lesson.md:152`, qui **ne porte aucun
numéro de chapitre** — la phrase y est « *Le seul juge de la spontanéité reste le critère
$Q_{r,i}$ face à $K$* ». **La conclusion était juste, la preuve était la mauvaise ligne.**)* ;
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
| **i** | **Le geste que le bac demande est le même enchaînement — expression, valeur, sens — et il prend DEUX FORMES d'énoncé, toutes deux à 0,5 pt.** *(corrigé en vague 1, fidélité M2.)* **Forme 1, la paire :** 2017 N pose « *(0,5 pt) Écrire l'expression du quotient de réaction $Q_{r,i}$ à l'état initial puis calculer sa valeur.* » (q1), **puis** « *(0,5 pt) Préciser le sens d'évolution spontanée du système chimique. **Justifier**.* » (q2) — 0,5 + 0,5. **Forme 2, la question unique qui demande les deux :** 2011 R pose « *(0,5 pt) **1-** Préciser, **en calculant le quotient de réaction $Q_{r,i}$ à l'état initial**, le sens spontané d'évolution* » — un seul demi-point pour les deux gestes. **Dans les deux formes, l'élève doit enchaîner expression → valeur → verdict sans qu'on le lui redécoupe.** | `content/pc/piles/bank.yaml:756` + `:776` (forme 1) ; `:914` (forme 2). *Ce que le fait ne dit PLUS : que le sujet « nomme le piège des exposants ». La phrase citée à `:766` s'ouvre par « Le piège nommé de cette question » et vit dans le bloc `reasoning:` — c'est la voix éditoriale de la maison, pas celle de l'examen (fidélité I1).* |

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
**$K \approx 2{,}5$** *(la notation d'ES-19 ; le panneau, lui, écrit « $K = 2{,}5$ » comme
les sujets écrivent une donnée — §5.4)*. Sur les mêmes cinq crans, ce couple donne
**9 mélanges en sens inverse, 1 exactement à l'équilibre, 15 en sens direct** (table
du §5.3 B) — **et cette partition n'existe qu'à $K = 2{,}5$ au chiffre près : c'est le
drapeau rouge du §13.3.** *Le même couple, les trois verdicts du critère, sans une seule
concentration inventée.* L'item, lui,
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
  un QCM de plus. Les **quatre** items du §8.3 sont de l'`utilisation` et de
  l'`application_experimentale`, **aucun n'est de la résolution de problème**. **Reste dû, et
  c'est le plus gros.**
  **Le chiffre, écrit d'avance et à la main** *(fidélité I3 ; le mélange n'est calculable que
  sur la couche qui porte le champ, c'est-à-dire les 5 points d'arrêt)* : **aujourd'hui
  4 `utilisation` · 1 `application_experimentale` · 0 `resolution_probleme` = 80 / 20 / 0.**
  **Après livraison des quatre items neufs** (ES-30, ES-31, ES-32 en `utilisation` — ES-32
  **relabellisé**, §8.3 — et ES-33 en `application_experimentale`) : **7 · 2 · 0 sur 9, soit
  78 / 22 / 0** contre la cible **50 / 15 / 35**. *Si l'on s'en tenait aux trois items de la
  première rédaction, c'était **75 / 25 / 0** : l'`application_experimentale` s'éloignait de
  sa cible par le HAUT sur un item qui ne la méritait pas. **ES-33 la mérite** (protocole,
  observation, donnée manquante) ; elle reste au-dessus de 15 %, et la résolution de problème
  reste à zéro.* **Écrit comme un chiffre, pas comme une impression.**
- **Le sommet qui interroge le chapitre suivant** (fait **g**) est un arbitrage de
  périmètre au propriétaire, pas un défaut de média. **Hors scène. Reste dû.**
- **La précipitation (`lesson.md:197-207`) est absente du cadre** : « *Recherche exhaustive
  sur `docs/cadre/` : **zéro occurrence** de « précipit\* », « solubilit\* », « Ks »,
  « dissolution »* » (`REVIEW-2026-09-19.md:105-113`). **Hors scène** (§9.7), et elle reste
  due comme arbitrage de prose.
- **R3 (« pourquoi ça part en chaleur ») ne correspond à aucun `savoir_faire` et frôle
  l'exclusion « aspects thermodynamiques »** (`REVIEW:123-127`). **Hors scène** (§9.5).
  **Reste dû.**
- **UN DÉFAUT NEUF, TROUVÉ EN MESURANT — TROUVÉ DEUX FOIS, ET RÉPARÉ DEUX FOIS.
  C'est un RELEVÉ, plus un livrable.** *(Réécrit après la vague 1 ; la première rédaction en
  faisait une tâche en attente, et la critique de fidélité a mesuré que le fichier visé était
  déjà propre — voir §16, refus 1 : c'est la moitié de son B3 qui était juste.)*
  1. **Ce que j'ai trouvé.** `cp-r2-critere` portait « *$Fe + 2\,Ag^+ \rightleftharpoons
     Fe^{2+} + 2\,Ag$, $K \approx 4{,}0\times10^{15}$* » — la valeur que la vague 1 de la
     notion avait **corrigée dans ES-1** en $1{,}0\times10^{42}$, précisément parce que
     $4{,}0\times10^{15}$ est l'ordre du couple **Cu/Ag**, pas Fe/Ag
     (`REVIEW-2026-09-19.md:13-28`). Le point d'arrêt est un `item_source: clone_of_ES-1`
     (`checkpoints.yaml:192`) : **le clone n'avait pas suivi son original.**
     **RÉPARÉ par l'orchestrateur, commit `00a1a829`** — `checkpoints.yaml:197` et `:210`
     portent aujourd'hui $K \approx 1{,}0\times10^{42}$ (relu ligne à ligne).
  2. **Ce que la critique de fidélité a trouvé ENSUITE, et que je n'avais pas cherché.**
     Le stem d'ES-1 avait bien été corrigé, mais **pas son `correct_feedback` ni sa
     `solution`** : `items.yaml:135` et `:142` portaient encore $4{,}0\times10^{15}$. **Un
     même item montrait donc deux constantes différentes pour la même réaction** — et la
     mauvaise est celle du bain C de cette scène.
     **RÉPARÉ, commit `84fe0ac1`** — `items.yaml:135` et `:142` portent aujourd'hui
     $1{,}0\times10^{42}$ (relu ligne à ligne).
  3. **Ce qui reste vrai après les deux réparations.** La conclusion de l'item n'a jamais
     bougé ($3{,}0\times10^{2} \ll K$ dans les deux cas) ; et **les autres clones de la même
     campagne n'ont toujours pas été relus** (§15.6). *La leçon à garder : la première
     mesure a trouvé le clone et manqué l'original ; la seconde a trouvé l'original et cru
     le clone encore faux. **Aucune des deux n'avait tort sur le fond ; chacune avait cherché
     une seule des FORMES du défaut** (ADR 0036). Le défaut avait deux nids, et il a fallu
     deux passes.*

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
  **NON-VERDICT DÉCLARÉ sur la couche qui porte le volume** (§0.3, fait **f**) : le champ
  `habilete` n'existe sur aucun des 29 items de `items.yaml`, donc le rapport n'y est
  calculable **ni avant ni après** cette livraison.
  **VERDICT CALCULABLE, en revanche, sur la couche des points d'arrêt**, qui porte le champ
  aux cinq lignes (`checkpoints.yaml:56`, `:122`, `:188`, `:256`, `:318`) — et il faut
  l'écrire, parce qu'il ne va pas dans le bon sens *(fidélité I3)* :
  **avant : 4 · 1 · 0 = 80 / 20 / 0 ; après les quatre items neufs du §8.3 : 7 · 2 · 0 sur 9
  = 78 / 22 / 0.** L'`application_experimentale` reste **au-dessus** de sa cible de 15 %, et
  la **résolution de problème reste à 0 % contre 35 %**, c'est-à-dire **3,5 points d'examen**
  que rien de cette livraison ne touche. **ES-32 est relabellisé `utilisation`** — un compte
  rendu déchiré n'est pas un protocole (§8.3) — et **ES-33 est ajouté** pour que
  l'`application_experimentale` revendiquée soit **méritée** sur la ligne `travaux_pratiques`
  du cadre (`:527-528`).
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
| **Écrire l'expression de $Q_{r,i}$ PUIS la calculer** | **2017 N q1, 0,5 pt** — « *Écrire l'expression […] **puis** calculer sa valeur* » (`piles/bank.yaml:756`) ; **2011 R q1, 0,5 pt** — « *Préciser, **en calculant** le quotient […], le sens spontané* » (`:914`), une seule question pour les deux gestes. *(Corrigé en vague 1 : `evolution-spontanee/bank.yaml:80` est **retiré de cette ligne** — il demande « Préciser le sens d'évolution spontané », **pas** l'expression ; celle-ci n'apparaît que dans le `reasoning` de la maison, `:82-85`. Fidélité M2.)* | la leçon l'écrit **une fois**, sur un couple sans exposant (`lesson.md:95`) ; `cp-r2-qr-calcul` le teste **une fois**, sur un couple sans exposant |
| **Porter les coefficients en EXPOSANTS** | **2017 N pose le calcul sur une équation à exposants $2$ et $3$** — $3\,Cu^{2+} + 2\,Al \rightleftarrows 3\,Cu + 2\,Al^{3+}$ (`piles/bank.yaml:750`), puis « *Écrire l'expression […] puis calculer sa valeur* » (`:756`). *(Corrigé en vague 1 : la première rédaction disait « le sujet **nomme le piège** ». Faux. La phrase « Ne pas confondre l'exposant $2$ […] avec l'exposant $3$ » est à `:766`, **dans le bloc `reasoning:` de la maison**, et s'ouvre par « Le piège nommé de cette question ». **Un sujet national ne commente pas ses propres pièges** ; il pose l'équation et demande le calcul. Fidélité I1.)* | `exposants-oublies` est déclaré et tenu à **exactement 3 items** (marge nulle, `items.yaml:1840`) ; **aucun média, aucun point d'arrêt** ne le montre |
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
$Sn + Pb^{2+}$, $K = 2{,}5$**, avec deux mélanges du même couple donnant les deux sens.
Contraintes : les deux mélanges viennent des crans du §5.2 ; la valeur $K = 2{,}5$ est
citée **comme une donnée**, exactement comme les énoncés la donnent — **avec le signe
« $=$ », pas « $\approx$ »** (§5.4, fidélité I2) ; **aucun $E^\circ$** n'apparaît (§9.1) ; le
mot « plus réactif » n'est employé que pour être réfuté.
**Et le bécher du mélange « sens inverse » porte les DEUX métaux** — lame d'étain et dépôt
de plomb, « *laissé par un essai précédent* », le procédé exact d'ES-19
(`items.yaml:1087-1088`). *Sans quoi la prose écrit, comme le faisait la première version de
la scène, une évolution dont un réactif est absent du bécher (§7.3, vague 1 B1).*

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

### 4.6 Aucun nouveau point d'arrêt — et la constante de `cp-r2-critere` est RÉPARÉE, aux deux endroits

*(Réécrit après la vague 1. La première rédaction commandait ici un livrable ; il n'y a plus
rien à livrer, il y a un relevé à garder.)*

Les trois points d'arrêt de R2 restent où ils sont et gardent leur rôle. **Aucun n'est à
réécrire.**

Ce que cette spec a déclenché, et qui est **fait** : `cp-r2-critere` annonçait
$K \approx 4{,}0\times10^{15}$ pour $Fe + 2\,Ag^+$ là où son original ES-1 porte
$1{,}0\times10^{42}$ (`REVIEW:23`) — **réparé, commit `00a1a829`** (`checkpoints.yaml:197`,
`:210`) ; puis la critique de fidélité a mesuré que le `correct_feedback` et la `solution`
**d'ES-1 lui-même** portaient encore l'ancienne valeur — **réparé, commit `84fe0ac1`**
(`items.yaml:135`, `:142`). **Les deux nids du même défaut sont bouchés** (§0.3).

**Ce que la scène y ajoute, et c'est la seule raison de garder ce paragraphe :** un élève qui
vient de manipuler trois $K$ et de voir que $K$ ne dépend **que** du couple **remarquerait**
que deux couples différents portent la même constante dans le corpus. *La scène est donc un
détecteur de ce défaut-là ; elle en a déjà trouvé deux occurrences avant d'être construite.*
**Reste dû, et hors de cette spec :** les autres `item_source: clone_of_*` de la même
campagne, jamais relus (§13.8, §15.6).

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Les trois bains — et d'où vient chaque nombre

**Aucune constante n'est inventée. Les trois couples et leurs trois $K$ sont déjà dans la
notion.**

| bain | équation | $Q_r$ | $K$ | source dans le corpus |
|---|---|---|---|---|
| **A** | $Zn + Cu^{2+} \rightleftharpoons Zn^{2+} + Cu$ | $\dfrac{[Zn^{2+}]}{[Cu^{2+}]}$ | $1{,}8\times10^{37}$ | `lesson.md:103` (l'exemple travaillé de R2) |
| **B** | $Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$ | $\dfrac{[Sn^{2+}]}{[Pb^{2+}]}$ | $2{,}5$ **(donnée, §13.3 ROUGE)** | `items.yaml:1089-1090` (ES-19) ; le couple est aussi celui de `cp-r2-qr-calcul` (`checkpoints.yaml:130-134`), dont le retour dit déjà « *L'étain et **le plomb métalliques, tous deux solides**, n'entrent pas dans $Q_r$* » (`:145-146`) — **le corpus met donc déjà les deux métaux dans le bécher ; la première version de cette scène ne le faisait pas** (vague 1 B1) |
| **C** | $Cu + 2\,Ag^+ \rightleftharpoons Cu^{2+} + 2\,Ag$ | $\dfrac{[Cu^{2+}]}{[Ag^+]^2}$ | $4{,}0\times10^{15}$ | `items.yaml:1191-1192` (ES-21), et son `solution` écrit l'expression avec l'exposant (`:1229-1231`) |

**Vérification d'auteur, faite et déclarée — jamais affichée.** *(Refaite après la vague 1 :
la première rédaction employait $0{,}06$ au dénominateur et posait trois ✓ dont deux
n'étaient pas mérités — fidélité M1. **La constante juste est $0{,}059$**, celle qu'emploie
la revue de la notion, `REVIEW-2026-09-19.md:21-23`.)*
$\log K = n\,\Delta E^\circ/0{,}059$ donne :

| bain | $\Delta E^\circ$ | $n$ | $\log K$ calculé | $K$ calculé | $K$ du corpus | verdict |
|---|---|---|---|---|---|---|
| **A** | $0{,}34-(-0{,}76) = 1{,}10$ V | 2 | $37{,}29$ | $1{,}9\times10^{37}$ | $1{,}8\times10^{37}$ | **✓ à 6 %** |
| **C** | $0{,}80-0{,}34 = 0{,}46$ V | 2 | $15{,}59$ | $3{,}9\times10^{15}$ | $4{,}0\times10^{15}$ | **✓ à 3 %** |
| **B** | $-0{,}126-(-0{,}1375) = 0{,}0115$ V | 2 | $0{,}390$ | $\approx 2{,}45$ | $2{,}5$ | **✓, mais voir ci-dessous** |
| **B**, valeurs scolaires à 2 décimales | $-0{,}13-(-0{,}14) = 0{,}010$ V | 2 | $0{,}339$ | $\approx 2{,}2$ | $2{,}5$ | **plage $2{,}2$–$2{,}5$** |

*Avec $0{,}06$, A donnait $36{,}7$ (facteur $3{,}6$ d'écart avec le corpus) et C $15{,}3$
(facteur $2$) : les deux ✓ étaient faux, et c'est la mesure de la vague 1 qui les a repris.
Avec $0{,}059$, les deux tombent sur le nez.*

**$K = 2{,}5$ est une donnée défendable — et elle est PORTEUSE.** La plage plausible des
tables est **$2{,}2$–$2{,}5$**, et **la partition 9 / 1 / 15 du §5.3 B n'existe qu'à $2{,}5$
exactement** : à $2{,}2$ ou $2{,}4$ elle devient **10 / 0 / 15** — *l'état d'équilibre
unique, qui est tout le contenu de S5, disparaît.* **Je ne corrige pas le corpus ; je porte
sa valeur, je la présente comme une DONNÉE (§5.4), et je promeus la question en drapeau
ROUGE au propriétaire (§13.3), avec la plage recalculée.** *Ce geste de vérification est
autorisé à l'AUTEUR et interdit au PANNEAU (§1, §9.1) ; précédent exact :
`REVIEW-2026-09-19.md:20-23`.*

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
$Q_{r,i} = 10$, soit **4 fois $K$**, **à moins d'une décade d'écart** ($\log 10 - \log 2{,}5
= 0{,}602$). *(Corrigé en vague 1, fidélité M3 : la première rédaction disait « dans la même
décade ». Faux — $2{,}5$ est dans $[1;10)$ et $10$ dans $[10;100)$. **Et c'est précisément
ce $0{,}602$ qui impose la bande de travail du §5.5** : sur l'axe d'ensemble, à 390 px, il ne
fait que ~5 px.)*
**S5 ouvre** sur $p=2$ ($1{,}0\times10^{-2}$), $o=2$ ($1{,}0\times10^{-2}$) ⇒
$Q_{r,i} = 1{,}0$ — *le cran voisin, choisi parce qu'il est exactement le seuil du modèle
`seuil-un-au-lieu-de-k` ($0{,}398$ décade à GAUCHE du pivot)* — et **le geste de S5 est de
monter `produit` d'un cran** jusqu'à $p=3$ ($2{,}5\times10^{-2}$) ⇒ $Q_{r,i} = 2{,}5$, égal à
la valeur donnée de $K$. *(Réécrit après la vague 1, pédagogie I7 : la première rédaction
posait d'emblée l'état d'équilibre et l'annonçait en consigne — la découverte était dépensée
avant le pari.)*

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
- **$K$ s'affiche avec le signe « $=$ », et jamais « $\approx$ »** — `K = 1,8×10^37` ·
  `K = 2,5` · `K = 4,0×10^15`. **Les valeurs sont celles du corpus ; la notation est celle
  des SUJETS**, qui donnent la constante comme une donnée sèche : « *est $K = 5\times10^{36}$* »
  (`bank.yaml:75`, 2012 N), « *est $K = 10^{200}$* » (`piles/bank.yaml:752`, 2017 N),
  « *$K = 10^{18}$* » (`:904`, 2011 R) — **trois sujets transcrits, trois fois « $=$ »**.
  *(Réécrit après la vague 1, fidélité I2 : la première rédaction disait « $K$ s'affiche tel
  que le corpus l'écrit », et le corpus écrit « $K \approx 2{,}5$ » (`items.yaml:1090`) —
  ce qui mettait la règle en tension avec le `2,5` nu du panneau. Le « $\approx$ » des items
  de la maison signale une valeur arrondie ; **le panneau, lui, donne une DONNÉE, et une
  donnée d'énoncé ne s'excuse pas**. Jamais recalculé, jamais arrondi autrement.)*
- **`ecart` (le nombre d'ordres de grandeur) est une lecture PAR ÉTAT, en ENTIER, par défaut
  vers le bas.** Elle vaut **39** à l'état de S1, **34** au mélange extrême de S2, **16** à
  l'état de S4, et elle change quand l'élève balaie. *(Tranché après la vague 1, pédagogie
  M3 : la première rédaction laissait la lecture ambiguë entre le per-état et une borne
  globale « au moins 34 ». **La borne globale n'est pas une lecture : c'est une phrase du
  RETOUR de S2**, où elle porte sur les 25 mélanges à la fois. La lecture, elle, décrit
  toujours l'état affiché. N8 est réécrite en conséquence (§11.1).)* *Un décimal y serait un
  faux — $\log$ n'est pas au programme comme outil de ce chapitre, et le nombre n'a de sens
  que comme ordre de grandeur.*
- **Aucun nombre n'est affiché avec plus de chiffres qu'il n'en a de sens.** La lecture
  `expression` n'affiche **pas** de valeur : elle affiche la **formule littérale** du bain
  courant, en KaTeX.

### 5.5 Le dessin — l'axe d'ensemble (A), la bande de travail (B), le bécher (C)

> **Ce §5.5 est réécrit après la vague 1.** Les deux critiques ont trouvé le même défaut, par
> deux chemins (pédagogie B2, fidélité I4) : **un seul axe ne peut pas faire les deux
> métiers.** Les 34 décades de S2 exigent un axe long ; les $0{,}602$ décade de S3 et les
> $0$ décade de S5 exigent un axe fin. Sur 41 décades à 390 px — 42 avec la borne élargie,
> donc légèrement pire — S3 fait ~5 px et la
> tolérance « confondu » de `cote-et-verdict` est à 2 px : **S3 et S5 sont la même image, et
> la porte certifierait « équilibre » tout ce qui est à un facteur $\approx 1{,}8$ de $K$ —
> c'est-à-dire exactement la PLAGE d'équilibres que le §5.2 point 2 interdit.** D'où
> **deux** objets, déclarés séparément : **l'axe d'ensemble** et **la bande de travail**.

#### A — l'axe d'ensemble

- **Un seul axe, fixe, de $10^{-4}$ à $10^{38}$** — **42 décades**. Il ne change **jamais** de
  bornes : c'est ce qui rend comparables les trois pivots $K$, et c'est ce qui fait voir,
  comme une **longueur**, les « 34 ordres de grandeur » que le corpus n'écrit qu'en mots
  (`piles/qr-vs-k-echelle.stages.json:5` : « *un écart d'environ 38 ordres de grandeur* »).
  *(La borne basse descend de $10^{-3}$ à $10^{-4}$ après la vague 1, pédagogie M6 : le plus
  petit quotient atteignable, $2{,}0\times10^{-3}$, était à $0{,}30$ décade du bord — ~2,5 px
  à 390 px, où l'étiquette n'a nulle part où aller et où le sabotage « repère plafonné au
  bord » devient dégénéré. **Aucun état n'est ajouté** : le minimum reste
  $2{,}0\times10^{-3}$ aux bains A et B, $4{,}0\times10^{-3}$ au bain C.)*
- **Les décades sont graduées** ; une sur cinq porte son étiquette ($10^{-4}$, $10^{1}$,
  $10^{6}$, …, $10^{36}$), les autres un trait fin. **À largeur réduite (< 540 px), une
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

#### B — la bande de travail (NEUVE, vague 1)

- **Une seconde règle, alignée sous l'axe d'ensemble, large de HUIT décades, centrée sur le
  $K$ du bain courant** : $[\log K - 4 \,;\, \log K + 4]$. Pour le bain B ($K = 2{,}5$) :
  de $2{,}5\times10^{-4}$ à $2{,}5\times10^{4}$ — **les 25 quotients du bain B y tiennent
  tous** (min $2{,}0\times10^{-3}$, max $500$), ce qui est la condition qui a fixé la largeur
  à huit et non à six.
- **Ce n'est pas un changement de bornes de l'axe, c'est un ENCART.** L'axe d'ensemble garde
  ses 42 décades et ses trois pivots comparables ; un **crochet à l'encre** posé sur l'axe
  d'ensemble montre quelle portion la bande agrandit. *Les deux objets sont lus par la porte
  séparément, et le crochet doit couvrir exactement les huit décades de la bande.*
- **Le px/décade de la bande est CONSTANT et DÉCLARÉ**, comme celui de l'axe — c'est une
  famille de porte à part entière (§11.2, `bande-de-travail`), **mesurée à 1 280 et à
  390 px**. À 390 px, sur une bande de ~330 px, cela fait ~41 px/décade, donc :
  **la paire de S3 ($0{,}602$ décade) est à ~25 px — nettement séparée ; la paire de S5
  ($0$ décade) est à 0 px — nettement confondue.** *C'est le critère d'acceptation, et il
  est écrit comme un nombre : **à 390 px, S3 $\ge$ 16 px et S5 $\le$ 2 px**, les deux mesurés
  et imprimés.*
- **Quand le repère est HORS de la bande** — c'est le cas aux bains A et C, dont aucun
  mélange n'approche $K$ à moins de 15 décades — **aucune pastille n'est dessinée dans la
  bande.** À sa place, un **chevron de bord**, graphiquement distinct de la pastille, qui
  porte « *à 34 décades à gauche* ». **Ce n'est PAS un repère plafonné** (le sabotage 12), et
  la porte doit savoir les distinguer : une pastille au bord rougit, un chevron non.
  *Et la bande vide aux bains A et C **dit quelque chose** : sur ce couple-là, rien de ce
  qu'on peut préparer n'arrive à huit décades de $K$. C'est le motif du §2.2, dessiné.*
- **La bande paraît à S3** (avec le bain B) et ne disparaît plus. Avant S3, elle est
  **absente du DOM** — §7.6 A la porte, et `fuite-inter-etapes` la mesure.

#### C — le bécher

- **À côté de l'axe, un bécher avec sa ou ses lames métalliques et sa solution, dessiné à
  l'encre** : c'est l'énoncé. Après la révélation, **deux flèches d'accent** montrent qui
  cède et qui capte, et **deux étiquettes** (`oxydé` / `réduit`) se posent. Rien de tout cela
  n'existe avant le pari. *Le bécher est nécessaire à S3 : la bascule du verdict doit se
  voir comme un métal qui change de rôle, pas seulement comme une flèche qui change de
  sens.*
- **RÈGLE NEUVE, NON NÉGOCIABLE (vague 1, B1 des deux critiques) : tout bain dont les 25
  états contiennent un verdict INVERSE porte les DEUX solides dans le bécher, avant le
  pari.** Concrètement : **le bain B est dessiné avec une lame d'étain ET un dépôt de plomb**
  (grains gris au fond, ou seconde lame), présents dès la consigne.
  **Le motif est physique, pas décoratif** : le sens inverse de $Sn + Pb^{2+}
  \rightleftharpoons Sn^{2+} + Pb$ consomme $Pb_{(s)}$. Sans plomb solide dans le bécher,
  $Q_{r,i} > K$ annonce une évolution **dont un réactif est absent** : rien ne se passerait,
  et la scène montrerait une lame qui se dissout alors qu'elle n'est pas là. *C'était le
  défaut le plus grave de la première rédaction, et il tombait sur **la seule étape de toute
  la chaîne du quotient où un modèle de « réactivité du métal » rencontre une observation qui
  le contredit**. Une rupture mise en scène sur une impossibilité n'est pas une rupture.*
  **Le procédé d'énoncé est celui du corpus, mot pour mot :** ES-19 écrit « *(l'étain a
  partiellement déjà réagi lors d'un essai précédent)* » (`items.yaml:1087-1088`) pour
  justifier une espèce présente à l'instant initial ; la scène emploie le même pour le dépôt
  de plomb. *Précision d'auteur, à ne pas recopier de travers : ES-19 emploie ce procédé pour
  justifier la présence d'**ions** $Sn^{2+}$, et son propre verdict est direct — ES-19 n'a
  donc pas besoin de $Pb_{(s)}$. **C'est le PROCÉDÉ qui est repris, pas une lecture d'ES-19.***
  Et `cp-r2-qr-calcul` raisonne déjà sur les deux : « *L'étain et le plomb métalliques, tous
  deux solides, n'entrent pas dans $Q_r$* » (`checkpoints.yaml:145-146`).
  **Les bains A et C n'ont pas besoin des deux solides** : 25 états sur 25 y sont directs, le
  second métal n'y est qu'un produit. **La règle est conditionnée au verdict atteignable, pas
  au décor**, et c'est sous cette forme que la porte la mesure (§11.2, `becher-et-roles`).

### 5.6 Contrôles (3) — et la règle est l'ATTEIGNABILITÉ, pas la présence

| contrôle | crans | ce qu'il règle |
|---|---|---|
| `oxydant` | 5 (§5.2) | la concentration initiale de l'ion **réactif** ($Cu^{2+}$, $Pb^{2+}$, $Ag^+$) |
| `produit` | 5 (§5.2) | la concentration initiale de l'ion **produit** ($Zn^{2+}$, $Sn^{2+}$, $Cu^{2+}$) |
| `bain` | **2 puis 3** (A, B ; le cran C à partir de la révélation de S4) | le couple étudié |

> **Réécrit après la vague 1 (pédagogie I6), parce que la première table était
> CONTRADICTOIRE et, telle quelle, NON IMPLÉMENTABLE.** Elle disait à la fois « le cran C est
> **absent** du DOM avant S5 » (§11.2, sabotage 17) et « **l'état de S4 EST le bain C** »
> (§7.4). Un contrôle qui doit afficher l'état courant sans l'offrir n'existe pas, et la
> porte aurait été écrite depuis la table fausse.

**La règle juste, en une phrase : un état est POSÉ par l'étape (`etat`) ; un état est
ATTEIGNABLE seulement si un contrôle ouvert y mène.** Ce qui doit être impossible n'est pas
qu'un bain soit *affiché* avant son étape — c'est qu'il soit **atteint** depuis l'étape
précédente.

**Trois conséquences, et la troisième referme une fuite que personne n'avait vue :**

1. **`bain` est absent du DOM jusqu'à la révélation de S3.** L'état de S3 (bain B) est posé
   par `etat`, sans contrôle : l'élève ne peut pas en sortir pendant son pari. À la
   révélation de S3, le contrôle **paraît avec deux crans (A, B)** — et c'est exactement ce
   dont le geste de S3 a besoin (§7.3). Le cran **C** n'est offert qu'à la révélation de
   **S4** ; depuis S3, C reste donc **inatteignable**, ce qui est la garantie recherchée.
   *Précédent exact : le banc de modulation, dont un étage « n'EXISTE PAS dans le DOM » avant
   sa révélation ; et le manège, dont un réglage ouvert répondait au pari suivant.*
2. **Un contrôle peut se FERMER quand son geste est fait.** `oxydant` et `produit`, ouverts à
   S1 et S2, sont **fermés pendant S3 et S4** — sans quoi le geste de S3 ne serait plus *un*
   geste mais trois. *C'est la règle de la maison appliquée à la lettre (une question, un
   geste — DÉCISIONS §29, HANDOFF §11.210), et c'est la pièce qui rend le geste de S3
   (pédagogie I3) lisible : à cet instant, **un seul réglage est ouvert dans toute la
   scène**. Un contrôle qui se ferme est neuf dans la maison ; il est déclaré ici, mesuré au
   §11.2, et saboté au §11.4.*
3. **Et c'est ce qui referme la fuite.** L'état d'équilibre du bain B — le cœur de S5 —
   demande `produit` $= 2{,}5\times10^{-2}$. Avec `produit` fermé de S3 jusqu'à S5,
   **cet état est hors d'atteinte avant S5**, et la lecture `sens` ne peut donc jamais écrire
   « déjà à l'équilibre » trop tôt. *Vérifié : après la révélation de S4, `oxydant` rouvre
   mais `produit` reste figé à $1{,}0\times10^{-3}$ (l'état de S4) ; sur le bain B, les cinq
   quotients alors atteignables valent $1{,}0$, $0{,}10$, $0{,}040$, $0{,}010$ et
   $2{,}0\times10^{-3}$ — **aucun ne vaut $2{,}5$**. La première rédaction, elle, rouvrait
   tout dès S3 et rendait la réponse de S5 atteignable deux étapes trop tôt ; ni l'une ni
   l'autre des critiques ne l'avait relevé, c'est la table corrigée qui l'a fait apparaître.*

**La porte réécrit elle-même la table des états atteignables, avant ET après chaque étape**
(§7.6 A, §11.2).

### 5.7 État (3 clés) et lectures (8 déclarées, jamais plus de 6 à l'écran)

**État** — `bain` ∈ {`A`, `B`, `C`} · `c_produit` ∈ les 5 crans · `c_oxydant` ∈ les 5 crans.

**Lectures — et chacune n'apparaît qu'à l'étape qui la DÉCOUVRE ou l'EMPLOIE** (règle du
calme, DÉCISIONS §29 / HANDOFF §11.210) :

| lecture | ce qu'elle écrit | présente à | avant le pari ? |
|---|---|---|---|
| `equation` | l'équation du bain courant, double flèche et repères **(1)/(2)** (§9.11) | S1 · S2 · S3 · S4 · S5 | **oui** — c'est l'énoncé |
| `expression` | la formule littérale de $Q_r$ pour ce bain | S1 · S2 · S3 ; **S4 après la révélation** ; **absente à S5** | **oui, sauf à S4** (c'est le pari) |
| `qri` | la valeur de $Q_{r,i}$, 2 c.s. | S1 · S2 · S3 · S5 ; **S4 après la révélation** | **oui, sauf à S4** |
| `k` | la valeur de $K$, avec « $=$ » (§5.4) | S1 · S2 · S3 · S4 · S5 | **oui** — c'est l'énoncé |
| `ecart` | l'écart en ordres de grandeur **pour l'état affiché**, entier | S2 ; **S4 après la révélation** | oui à S2 |
| **`melange`** *(NEUVE, vague 1)* | les deux concentrations de l'instant $i$, avec leur unité | **S5** | **oui** — c'est l'énoncé |
| `sens` | le verdict : « sens direct (1) » / « sens inverse (2) » / « déjà à l'équilibre » | S1 · S2 · S3 · S4 · S5 | **NON, jamais** — c'est la réponse |
| `especes` | qui est oxydé, qui est réduit *(ou « aucune, à l'échelle macroscopique » sur l'état d'équilibre)* | S3 · S5 ; **absente à S4** | **NON, jamais** |

**Le compte, par étape** — *et il descend, il ne monte pas* :
**S1 : 4 + 1 = 5** · **S2 : 5 + 1 = 6** · **S3 : 4 + 2 = 6** · **S4 : 2 + 4 = 6** ·
**S5 : 4 + 2 = 6**. *(À gauche les lignes d'encre, à droite celles qui paraissent à la
révélation.)* **Jamais plus de six, cinq à S1.**

**Ce que la vague 1 a changé ici, et pourquoi :**
- **`melange` est neuve, et elle répare une preuve qui n'existait pas** (pédagogie B3.4).
  Le distracteur `equilibre-egale-arret-total` de S5 était réfuté par « *la lecture affiche
  $[Pb^{2+}] = 1{,}0\times10^{-2}$ mol/L, à l'écran* » — **et aucune des sept lectures
  déclarées n'affichait une concentration.** La réfutation citait un écran qui n'existait
  pas. `melange` n'apparaît **qu'à S5**, là où elle est la preuve ; partout ailleurs les
  concentrations vivent dans la consigne et dans les libellés des boutons radio (§6.2), qui
  les portent avec leur unité.
- **`especes` tombe à S4** (pédagogie M4) : sept lignes à l'étape où l'élève doit en plus
  choisir une expression, c'était la ligne de trop, et les rôles sont acquis depuis S3.
  *§13.7 est tranché par là, et il n'est plus une question au propriétaire.*
- **`expression` tombe à S5** : elle est identique à celle de S3 et l'objet de S5 est la
  coïncidence de deux NOMBRES.
- **`especes` revient à S5**, et sur l'état d'équilibre elle écrit « *aucune, à l'échelle
  macroscopique* ». *Ce n'est pas une lecture vide — c'est le contenu du troisième cas, et
  il est légal à partir de S5. Avant S5, l'état d'équilibre est inatteignable (§5.6 point 3),
  donc la chaîne ne peut pas fuir.*
- *`ecart` n'apparaît pas à S1 : à S1 le fait est la POSITION, pas la distance ; l'écrire
  donnerait le contenu de S2. Elle disparaît à S3 et à S5, où « 0 ordre de grandeur » serait
  un nombre vide.*

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
  **LES LIBELLÉS EXACTS, spécifiés ici parce que content-author ne peut pas les deviner sans
  violer une des deux règles** *(vague 1, pédagogie M5 : le §6.2 exige « le nom des boutons
  radio en clair » et le §7.6 C interdit `argent`/`Ag` avant S4 — les deux étaient
  inconciliables tant que les chaînes n'étaient pas écrites)* :
  - **`oxydant` et `produit`** : la valeur et l'unité, rien d'autre —
    « $1{,}0\times10^{-3}$ mol/L » … « $5{,}0\times10^{-1}$ mol/L ». *Le nom de l'espèce
    n'est PAS dans le libellé : il est dans le titre du groupe, qui suit le bain courant
    (« solution de $Pb^{2+}$ », « solution de $Ag^+$ »), et qui n'existe donc jamais avant
    l'étape qui pose ce bain.*
  - **`bain`** : « **A — zinc / cuivre** », « **B — étain / plomb** », « **C — cuivre /
    argent** ». **Aucun conflit** : le contrôle n'a que A et B à partir de S3, et le cran C —
    seul à contenir `argent` — n'entre qu'à S4, où la chaîne est autorisée (§7.6 C).
  *`formule-graduee` lit ces libellés **avec** le panneau : ils sont du texte, et le texte
  fuit.*
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
$[Cu^{2+}]_i = 1{,}0\times10^{-1}$ mol/L, avec **une faible concentration d'ions $Zn^{2+}$
déjà présente**, $1{,}0\times10^{-3}$ mol/L. *(Formulation corrigée en vague 1, pédagogie
M1 : la première rédaction disait « une trace », mot que `lesson.md:103` emploie quatre
écrans plus bas pour $1{,}0\times10^{-6}$ — mille fois moins. Deux « traces » à trois ordres
de grandeur d'écart, c'est un mot qui ne veut plus rien dire.)* L'équation, l'expression de
$Q_r$, sa valeur ($1{,}0\times10^{-2}$) et $K$ ($1{,}8\times10^{37}$) sont **écrits à
l'encre** — c'est l'énoncé, exactement comme un sujet le donne. Sur l'axe, les deux marques
sont posées.

**Pari — « Ce mélange va évoluer… »**

| | choix | modèle | la valeur que le modèle produit |
|---|---|---|---|
| ✓ | « dans le **sens direct** : $Q_{r,i}$ est plus petit que $K$ » | — | direct |
| ✗ | « dans le **sens inverse** : $Q_{r,i}$ est minuscule, la réaction n'a presque pas eu lieu, donc c'est en arrière qu'elle a du chemin » | `critere-inverse` | inverse |
| ✗ | « nulle part : $Q_{r,i}$ et $K$ devraient être égaux pour une même réaction — l'une des deux données est fausse » | `confond-qr-et-k` | aucune évolution |
| ✗ | « on ne peut pas encore conclure : il manque la masse de la lame de zinc dans le quotient » | `solide-dans-qr` | pas de verdict |

> **Le choix juste ne décrit plus le DESSIN** *(vague 1, pédagogie I4).* Il disait
> « *le repère est **à gauche** du pivot* » — une position **déjà visible avant le pari**,
> qu'aucun des trois autres choix ne mentionnait. **L'élève n'avait qu'à recopier l'image :
> le pari était décidable sans le critère**, ce qui est exactement ce qu'il est censé
> exercer. Les quatre choix sont désormais **quatre raisons**, et aucune n'est une légende du
> dessin. *C'est le jumeau côté texte de la règle d'encre de la maison (« une donnée de
> l'énoncé ne se peint pas dans la couleur de la réponse ») : **une donnée de l'énoncé ne
> s'écrit pas non plus dans le libellé de la bonne réponse**.*

**Retour du choix juste** — dit le **mécanisme**, pas le résultat : proportionnellement peu
de produit et beaucoup de réactif par rapport à ce que l'équilibre exige, donc c'est la
réaction directe qui l'emporte. **Ne chiffre aucun écart** (c'est S2), **ne nomme aucun autre
couple** (c'est S3), **n'écrit aucun exposant** (c'est S4).

**`suite`** — une question, un geste : *« Fais varier la solution de $Cu^{2+}$ sur ses cinq
crans. Le repère glisse ; regarde ce que fait le pivot. »* **`etat_revele` : aucun** (le
pari ne portait sur aucun réglage).

**Contrôles** : `oxydant` — **fermé pendant le pari, ouvert à la révélation** (c'est la
suite). `produit` et `bain` absents du DOM.
**Lectures** : `equation`, `expression`, `qri`, `k` à l'encre, puis `sens` — **cinq**.

### 7.2 S2 — `vingt-cinq-melanges` · « Vingt-cinq mélanges, un seul verdict »

**Consigne.** Les deux solutions sont maintenant réglables, cinq crans chacune : vingt-cinq
mélanges du **même** couple. On les a tous essayés.

**Pari — « Combien de ces 25 mélanges évoluent dans le sens INVERSE ? »**

| | choix | modèle | la valeur, recalculée (§5.3 E) |
|---|---|---|---|
| ✓ | « **aucun** » | — | 0 sur 25 |
| ✗ | « **les 25** : dans tous, $Q_{r,i}$ est bien plus petit que $K$ — un quotient aussi petit annonce un recul » | `critere-inverse` | 25 sur 25 |
| ✗ | « **10** : ceux où il y a plus d'ions produits que d'ions réactifs — $Q_{r,i}$ au-dessus de $1$, donc trop de produits : ça recule » | **`seuil-un-au-lieu-de-k`** (§8.2) | 10 sur 25 |
| ✗ | « on ne peut pas les compter : le sens d'une réaction ne se prédit pas, il s'observe » | `pas-de-critere-predictif` | *pas de nombre* |

> **Le libellé du troisième choix porte maintenant la CONCLUSION du modèle, pas seulement son
> ensemble** *(vague 1, pédagogie I5a + fidélité B2)*. Il se contentait de décrire les dix
> mélanges (« *ceux où $Q_{r,i}$ est au-dessus de $1$* ») sans dire pourquoi ils reculeraient
> — et pendant ce temps le label YAML du modèle disait l'inverse ($Q_{r,i}>1 \Rightarrow$
> **direct**). **Le raisonnement imprimé à l'élève contredisait le modèle diagnostiqué.**
> Une seule polarité désormais, celle-ci, et elle est écrite des deux côtés (§8.2).

**Retour du choix juste.** Le plus « défavorable » des 25 donne $Q_{r,i} = 5{,}0\times10^{2}$
— et il reste à **au moins 34 ordres de grandeur** de $K$ *(phrase du retour, pas une
lecture : §5.4)*.
**Puis, et c'est neuf :** *« Tu as peut-être répondu « aucun » pour une raison qui n'est pas
la bonne — parce que « le zinc gagne toujours ». **Garde ta raison en tête** : à l'étape
suivante, on change de couple sans rien changer d'autre. »*
**Enfin, la phrase à emporter : ce n'est pas le zinc qui empêche le retournement, c'est le
NOMBRE $K$.** *Elle nomme la misconception sans la trancher : elle annonce S3, elle ne le
donne pas — elle ne nomme ni l'étain, ni le plomb, ni la valeur $2{,}5$.*

> **Pourquoi cette phrase neuve, et pourquoi S2 ne compte PLUS comme une confrontation de
> `reactivite-metal-fixe`** *(vague 1, pédagogie B3.2)*. À S2, la bonne réponse est
> « **aucun** » — **et c'est exactement ce que prédit celui qui croit que « le zinc gagne
> toujours »**. S2 **récompense** donc le modèle une étape avant que S3 ne l'attaque, et le
> §0.2 l'avait lui-même écrit sans en tirer la conséquence : « *vingt-cinq fois « le zinc
> gagne », c'est exactement `reactivite-metal-fixe`* ». **C'est de la contamination de la
> BONNE réponse** — le genre de défaut de stem qui se corrige, pas une co-attribution de
> distracteur (qui, elle, se double-étiquette et ne se corrige pas). **Elle est ici
> irréductible** : sur un couple à $K$ écrasant, le tenant du modèle a raison par accident,
> et c'est précisément pourquoi le corpus n'arrive pas à le casser. **Donc on ne la cache
> pas : on la nomme et on s'en sert.** La phrase demande à l'élève de **tenir sa propre
> raison** ; S3 l'encaisse. Et **la ligne du registre (§8.1) ne réclame plus S2** : seul S3
> confronte ce modèle.
**Retour du choix « 10 ».** Cinq des vingt-cinq mélanges donnent $Q_{r,i} = 1$ **exactement**
— pose-les et regarde : le repère tombe pile sur $1$, et le pivot est quelque part à
trente-sept décades de là. **Le seuil du critère n'est pas $1$ ; c'est $K$, et il change avec
la réaction.**

**`suite`** — un geste : *« Essaie de pousser $Q_{r,i}$ encore plus à droite que ce
réglage-là. »* **On ne peut pas** — c'est déjà l'extrême, et l'écart y reste d'au moins 34
ordres de grandeur. *(Formulation resserrée : la révélation **pose** déjà le mélange extrême,
donc demander de « chercher le mélange le plus à droite » aurait été demander ce qui est
déjà fait. Le geste est de tenter de faire mieux et de buter sur la borne.)*
**`etat_revele`** : `c_produit` = $5{,}0\times10^{-1}$, `c_oxydant` = $1{,}0\times10^{-3}$
(le mélange extrême — la scène se règle elle-même sur la borne dont la réponse parle, et
elle le DIT dans la région vivante).

**Contrôles** : `oxydant` ouvert pendant le pari ; `produit` **paraît à la révélation**
(c'est la suite) ; `bain` absent du DOM.
**Lectures** : `equation`, `expression`, `qri`, `k`, `ecart`, puis `sens` — **six**.

### 7.3 S3 — `un-autre-couple` · « Même geste, autre couple »

**Consigne.** *(Réécrite après la vague 1 sur trois points : les deux métaux (B1), la
consigne qui ne raconte plus le dessin (M2), et $K$ écrit en donnée (I2).)*

> **Dans le même bécher : une lame d'**étain**, et au fond un **dépôt de plomb**, laissé par
> un essai précédent. La solution contient $[Sn^{2+}]_i = 1{,}0\times10^{-1}$ et
> $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L. Pour cette réaction, à la température de
> l'expérience, on donne $K = 2{,}5$.**

**L'équation, l'expression, $Q_{r,i} = 10$ et $K = 2{,}5$ sont à l'encre.** La bande de
travail (§5.5 B) paraît ici pour la première fois, centrée sur $2{,}5$.
**La consigne ne dit RIEN de ce que le dessin fait** — ni que le pivot a sauté, ni de quel
côté le repère est tombé. *La première rédaction écrivait « *sur l'axe, le pivot a sauté de
$10^{37}$ à $2{,}5$, et le repère est maintenant à sa droite* » : c'est la phrase que la
vague 2 du plan complexe a retirée de son S3 (DÉCISIONS §29 — « *la consigne de S3 ne raconte
plus le dessin* »). **Le dessin répond avant le texte** (ADR 0041 §6) ; une consigne qui le
double le désarme.*

**Pourquoi les deux métaux — et pourquoi c'est BLOQUANT, pas cosmétique.** Le sens inverse de
$Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$ consomme $Pb_{(s)}$. La première rédaction ne
posait qu'une lame d'étain, **et faisait ensuite « se dissoudre la lame de plomb »** : un
objet absent du bécher. Dans le système réellement écrit, $Q_{r,i} > K$ aurait annoncé une
évolution **sans réactif**, donc rien n'aurait bougé. **Et c'est ici, à cette étape et nulle
part ailleurs, que `reactivite-metal-fixe` rencontre enfin une observation qui le contredit
— une rupture montée sur une impossibilité n'est pas une rupture.** Le procédé (« *après un
essai précédent* ») est celui d'ES-19, `items.yaml:1087-1088`. §5.5 C.

**Pari — « Ce mélange d'étain et de plomb va évoluer… »**

| | choix | modèle | la prédiction complète du modèle |
|---|---|---|---|
| ✓ | « dans le **sens inverse** : c'est le **plomb** du dépôt qui est oxydé, et les ions $Sn^{2+}$ qui sont réduits » | — | inverse ; Pb oxydé |
| ✗ | « dans le sens direct : l'étain cède ses électrons, comme le zinc le faisait — c'est ce que sont ces deux métaux » | `reactivite-metal-fixe` | direct ; Sn oxydé |
| ✗ | « dans le sens direct : $Q_{r,i} = 10$ est grand, donc la réaction a déjà bien avancé et elle continue » | `critere-inverse` | direct ; Sn oxydé |
| ✗ | « dans les **deux sens à la fois** : si l'étain peut réduire les ions $Pb^{2+}$, le plomb peut tout aussi bien réduire les ions $Sn^{2+}$ — les deux réactions sont spontanées » | `sens-symetrique` | les deux |

> **Le quatrième choix est réécrit** *(vague 1, pédagogie I5b)*. Il disait « *puisque $K$ est
> voisin de $1$* » — un raisonnement **tiré du seuil $1$**, c'est-à-dire une phrase de
> `seuil-un-au-lieu-de-k` portant l'étiquette d'un autre modèle. Or `sens-symetrique` est
> déclaré comme « *suppose une symétrie automatique […] **sans recalculer $Q_{r,i}$*** »
> (`items.yaml:27`) : **il ne raisonne sur aucun nombre.** Le nouveau libellé ne cite ni $K$,
> ni $1$, ni $Q_{r,i}$ — il est **recalculable depuis le modèle qu'il nomme**, ce qui est la
> règle armée par la vague 1 du plan complexe (§14.0 de sa spec).
> *Note de co-attribution, assumée : les deuxième et troisième choix prédisent la MÊME chose
> (direct, Sn oxydé) par deux raisons différentes. Ce n'est pas un défaut — un distracteur
> atteignable par plus d'un modèle se double-étiquette, il ne se supprime pas ; c'est la
> contamination de la BONNE réponse qui se corrige, et la bonne réponse est ici la seule qui
> dise « inverse ».*

**Le pari casse sur sa propre conséquence** (ADR 0041 §6) : **le dépôt de plomb se dissout
sous les yeux de celui qui a parié sur l'étain**, et les deux étiquettes de rôle s'échangent
par rapport au bain A. *C'est la seule étape de toute la chaîne du quotient où un modèle de
« réactivité du métal » rencontre une observation qui le contredit — et elle n'est possible
que parce que les deux métaux sont dans le bécher.*

**Retour du choix juste — et il porte désormais la partition, qui n'est plus une tâche.**
*« Sur ce couple-ci, les vingt-cinq mélanges ne vont pas tous du même côté : **9 en sens
inverse, 1 sans évolution, 15 en sens direct**. Ce n'est pas une symétrie — c'est une
partition, et c'est le mélange qui décide de quel côté on tombe. »* (§5.3 B.)
*C'est aussi ce qui casse `sens-symetrique` : 9 contre 15 n'est pas « aussi spontané dans les
deux sens ».*

**`suite` — UN geste, et c'est le meilleur de la scène** *(vague 1, pédagogie I3)* :
> *« Sans rien changer au mélange, passe au bain A. Regarde ce qui bouge, et ce qui ne bouge
> pas. »*

Le mélange $(1{,}0\times10^{-1}\,;\,1{,}0\times10^{-2})$ donne **$Q_{r,i} = 10$ sur le bain A
comme sur le bain B** *(vérifié : $[Zn^{2+}]/[Cu^{2+}] = 10$ et $[Sn^{2+}]/[Pb^{2+}] = 10$)*.
**Le repère ne bouge pas d'un pixel ; le pivot saute de trente-sept décades ; le verdict
change.** *Le motif du §2.2 en un clic — « $Q_{r,i}$ est une propriété du mélange, $K$ une
propriété de la réaction » — et ES-31 (§8.3) rendu physique.*
*La première rédaction demandait ici « **parcours les 25 mélanges de ce couple-ci et compte
les verdicts** » : vingt-cinq manipulations à deux réglages plus un décompte mental sans
compteur à l'écran. Ce n'est pas un geste, c'est un recensement — et c'est là, pas au pari de
S2, que la scène enseignait l'énumération. **La partition est un fait sur la grille : elle
appartient au retour, pas à la main de l'élève.***

**`etat_revele`** : aucun réglage à poser — le verdict, les flèches et les rôles suffisent ;
le bain est déjà posé par `etat`.

**Contrôles** : **aucun pendant le pari** (`oxydant` et `produit` **fermés**, `bain` absent
du DOM) ; **à la révélation, `bain` PARAÎT avec deux crans (A, B)** et il est le seul ouvert
— c'est le geste de la suite. *§5.6 point 2.*
**Lectures** : `equation`, `expression`, `qri`, `k`, puis `sens` et `especes` — **six** ;
**`ecart` DISPARAÎT** (à $K = 2{,}5$ et $Q_{r,i} = 10$, « 0 ordre de grandeur » est un
nombre vide, et une lecture vide au milieu d'une liste enseigne un trou — règle du plan
complexe, §5.2 B de sa spec).

### 7.4 S4 — `l-exposant` · « Quand les coefficients ne valent pas 1 »

**Consigne.** Troisième bain : de la limaille de cuivre dans une solution de nitrate
d'argent. L'équation, **$Cu + 2\,Ag^+ \rightleftharpoons Cu^{2+} + 2\,Ag$**, est à l'encre ;
les deux concentrations aussi ($[Ag^+]_i = 1{,}0\times10^{-1}$,
$[Cu^{2+}]_i = 1{,}0\times10^{-3}$ mol/L) ; $K$ aussi ($4{,}0\times10^{15}$).
**`expression` et `qri` sont ABSENTS du DOM** : c'est le pari.

**Pari — « Quelle est l'expression de $Q_{r,i}$ pour cette réaction ? »**

| | choix | modèle | la valeur que le modèle produit (§5.3 D) |
|---|---|---|---|
| ✓ | $\dfrac{[Cu^{2+}]}{[Ag^+]^2}$ | — | $\mathbf{0{,}10}$ |
| ✗ | $\dfrac{[Cu^{2+}]}{[Ag^+]}$ | `exposants-oublies` | $1{,}0\times10^{-2}$ |
| ✗ | $\dfrac{[Cu^{2+}]}{2\,[Ag^+]}$ | `exposants-oublies` *(seconde forme : le coefficient en facteur — la description déclarée la couvre explicitement, `items.yaml:63`)* | $5{,}0\times10^{-3}$ |
| ✗ | $\dfrac{[Ag^+]^2}{[Cu^{2+}]}$ | `qr-produits-reactifs-inverses` | $10$ |

> **Le pari porte sur l'EXPRESSION, plus sur la valeur** *(vague 1, pédagogie I1 et I2)*.
> Il demandait « *Que vaut $Q_{r,i}$ ?* » avec quatre nombres — **c'est la question d'ES-20
> (`items.yaml:1136-1145`) en costume**, et l'argument central du §0 (« *un item donne
> toujours le mélange* ») ne la couvrait pas, puisque ici la scène donne le mélange elle
> aussi. **Le seul aperçu que cette scène-là peut produire et qu'aucun item ne peut produire
> — l'exposant qui se VOIT comme une double longueur sur l'axe — était relégué dans la
> `suite`, sans engagement.** La priorité était inversée.
> **Les quatre choix restent les quatre modèles du §5.3 D, et les quatre valeurs restent
> deux à deux distinctes** : elles ne disparaissent pas, elles passent du libellé à la
> **révélation**. *Et c'est ce qui donne enfin l'enchaînement que le bac demande
> (§0.1 fait i, §2.4) : **expression → valeur → verdict, dans cet ordre, en une étape.**
> Nulle part ailleurs dans la scène il n'était couru : à S1 les deux sont de l'encre, et à S4
> l'expression était la réponse cachée.*
> **Le libellé d'aucun choix ne porte le nombre qui le réfute** (règle de la vague 2) : les
> quatre sont des formules nues, sans valeur ni justification.
> ⚠ **Note de porte, à ne pas manquer :** `avant-pari` exige qu'à S4 « aucune lecture `qri`
> ni `expression` » ne soit au DOM. **Les quatre choix ne sont pas des lectures.** La sonde
> lit les nœuds `[data-lecture]`, **jamais la liste des choix** — sans quoi la porte rougit
> sur sa propre conception.

**Retour du choix juste** — **l'expression paraît, puis la valeur ($0{,}10$), puis le repère
se pose sur l'axe, puis le verdict.** La phrase à tenir : **un coefficient de l'équation
devient une PUISSANCE, jamais un facteur** ; et c'est l'écriture de l'équation, pas la nature
des espèces, qui le décide.
**Et le confront est là, pas dans la suite :** *« Regarde où serait tombée la marque sans
l'exposant : **deux décades plus à droite**, pas une. Un facteur $10$ sur $[Ag^+]$ déplace
$Q_{r,i}$ de deux décades, parce que la concentration y est **au carré**. »* La révélation
**déplace la marque** entre les deux positions, une fois.

**Retour du choix « $\dfrac{[Cu^{2+}]}{[Ag^+]}$ »** — *(réécrit, vague 1 fidélité I1)* :
**« un sujet national a déjà posé ce calcul sur une équation à exposants $2$ et $3$ — la pile
aluminium-cuivre, session normale 2017 »** (`piles/bank.yaml:750`, `:756`). *La première
rédaction disait que « le sujet **nomme le piège** ». C'est faux : la mise en garde citée
vit dans le bloc `reasoning:` de la maison (`:766`), pas dans l'énoncé. **On n'attribue pas
à un examen national une phrase qu'il n'a pas écrite**, surtout dans un panneau rendu.*

**Retour du choix $\dfrac{[Ag^+]^2}{[Cu^{2+}]}$** — *(réécrit, vague 1 pédagogie B3.3 :
l'appel au seuil $1$ est SUPPRIMÉ)* : *« Inverser le quotient met un **réactif** au
numérateur. La marque tombe deux décades de l'autre côté, et les deux rôles du bécher
s'échangent. Sur ce bain-ci le verdict ne change pas — $0{,}10$ et $10$ sont tous deux
écrasés par $K$. **Mais reviens au bain B avec le mélange de tout à l'heure
($1{,}0\times10^{-1}$ ; $1{,}0\times10^{-2}$) : le quotient juste vaut $10$ et le critère dit
« inverse » ; le quotient inversé vaut $0{,}10$ et il dirait « direct ». Là, inverser coûte
le VERDICT. »*** *§8.1 : c'est sur cet état-là que la ligne du registre est ancrée.*

**`suite`** — *« Change le cran de la solution d'argent d'un rang et vérifie : combien de
décades la marque a-t-elle parcourues ? »* **Deux, pas une.**
**`etat_revele`** : aucun réglage à poser (le pari portait sur une expression) — **et c'est
déclaré**, comme S4 du banc d'électrolyse.

**Contrôles** : **aucun ouvert pendant le pari** (`bain` est au DOM et affiche C, posé par
`etat` ; il n'offre pas encore le cran C — §5.6). **À la révélation** : `bain` gagne le
cran C (trois crans, A/B/C) et `oxydant` rouvre (c'est la suite) ; **`produit` reste fermé**.
**Lectures** : `equation`, `k` à l'encre ; puis, à la révélation, `expression`, `qri`,
`ecart` (16 ordres de grandeur) et `sens` — **six. `especes` tombe à S4** (vague 1,
pédagogie M4 : sept lignes à l'étape où l'élève choisit une expression, c'était la ligne de
trop, et les rôles sont acquis depuis S3). *§13.7 est donc tranché, et n'est plus une
question au propriétaire.*

### 7.5 S5 — `pile-sur-le-pivot` · « Et si le repère tombait sur le pivot ? »

**Consigne.** *(Réécrite après la vague 1 : S5 n'annonce plus sa propre découverte —
pédagogie I7.)*

> **Retour au bécher étain / plomb — la lame et le dépôt, tous deux présents. On repart d'un
> mélange voisin : $[Sn^{2+}]_i = 1{,}0\times10^{-2}$ et $[Pb^{2+}]_i = 1{,}0\times10^{-2}$
> mol/L. Un seul réglage est ouvert, celui de la solution de $Sn^{2+}$.
> **Amène la marque exactement sur le pivot.** Puis parie.**

**L'état d'ouverture donne $Q_{r,i} = 1{,}0$ — et ce n'est pas un hasard de cran.** C'est
**le seuil du modèle `seuil-un-au-lieu-de-k`** : celui qui le tient croit être déjà sur le
pivot, alors que la bande de travail (§5.5 B) montre la marque **$0{,}40$ décade à gauche**
de $K = 2{,}5$. **Le geste — monter `produit` d'un cran, jusqu'à $2{,}5\times10^{-2}$ — fait
glisser la marque sur le pivot** ; cinq positions seulement sont atteignables ($0{,}10$,
$1{,}0$, $2{,}5$, $10$, $50$), donc la recherche est **bornée et se fait en un geste**.

*La première rédaction posait d'emblée l'état d'équilibre et écrivait en consigne :
« $Q_{r,i} = 2{,}5$ — **exactement** $K$. Sur l'axe, les deux marques **se recouvrent** ».
**Le temps de la tentative était dépensé avant le pari** : rien n'était trouvé, la
coïncidence était annoncée, et la recherche était reléguée dans la `suite`.*

**Pari — « Que va-t-il se passer dans ce bécher ? »**

| | choix | modèle | la conséquence que la scène montre |
|---|---|---|---|
| ✓ | « rien ne change, à l'échelle où l'on regarde : ni le dépôt de plomb, ni la lame d'étain, ni les concentrations » | — | aucune flèche nette ; `melange` inchangée ; les deux métaux restent |
| ✗ | « la réaction s'est déjà produite en entier : il ne reste plus d'ions $Pb^{2+}$ » | `equilibre-egale-arret-total` | **la lecture `melange` affiche $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L, à l'écran** |
| ✗ | « c'est impossible : on vient de préparer le mélange, $Q_{r,i}$ ne peut valoir $K$ qu'à la FIN d'une évolution » | `confond-qr-et-k` | le mélange est là, préparé, et il y est |
| ✗ | « il va quand même évoluer, mais si lentement qu'on ne le verra pas » | `spontane-egale-instantane` | *(voir l'encadré : la scène ne peut PAS le réfuter, et c'est déclaré)* |

> **Deux choses ont changé dans cette table, et elles viennent de la vague 1.**
> **(a) Le choix juste est TRIMÉ** *(pédagogie I7)*. Il portait « *— et pourtant les deux se
> produisent* » : la phrase de l'équilibre dynamique microscopique, que **la scène, sans
> temps, ne peut pas montrer**, et qui faisait du bon choix le plus long et le plus savant
> des quatre — un tell reconnaissable. **Elle passe au RETOUR.** *Et elle y est légitime,
> contre ce que la critique en craignait : « *à l'échelle microscopique, les réactions
> directe et inverse continuent à la même vitesse* » est le `contradicts_principle` déclaré
> de cette notion-ci (`items.yaml:80`), pas un emprunt à `etat_equilibre`. **Elle n'est
> légitime que depuis que les deux métaux sont dans le bécher** (§5.5 C) : sans plomb
> solide, « les deux se produisent » serait faux.*
> **(b) Le quatrième distracteur reste, sa ligne de registre est RAYÉE** *(pédagogie B3.5)*.
> Dans une scène à `temps: false`, « *il évolue, mais si lentement qu'on ne le verra pas* »
> est **infalsifiable par la scène** : la réponse « le critère ne parle pas de vitesse » est
> un **argument**, pas une observation. Le distracteur est une vraie erreur d'élève à cet
> instant précis, donc **il reste** ; mais **le §8.1 ne réclame plus cette ligne**, et la
> limite est écrite au §10.8.

**Retour du choix juste.** C'est le **troisième** cas du critère : $Q_{r,i} = K$, le système
est **déjà** à l'équilibre. Et il n'y est pas parce qu'un réactif a disparu — **les deux
concentrations sont sous tes yeux, et les deux métaux sont dans le bécher.** *(C'est ici,
et seulement ici, que la phrase microscopique arrive : à l'échelle des ions, les deux
réactions continuent — elles se compensent exactement, et c'est pour cela que rien ne bouge à
l'échelle où l'on regarde.)*

**Et la phrase qui empêche une misconception NEUVE de naître** *(vague 1, pédagogie I8)* :
> *« Un mélange préparé **exactement** sur le pivot est rare — il faut le fabriquer exprès,
> et c'est pour cela que les sujets qui le posent l'ont toujours construit. Mais $Q_r = K$
> n'est pas rare **à l'arrivée** : c'est là que finit **toute** évolution spontanée. Rare à
> **préparer**, inévitable à **atteindre**. »*
*Sans elle, « il n'y en a qu'un sur 75 » enseigne « l'équilibre n'arrive presque jamais »,
en contradiction directe avec l'image centrale du chapitre — « $Q_r$ grimpe vers $K$ »
(`lesson.md:115`) — et avec la flèche que la scène dessine à chaque état.*

**`suite` — bornée, un geste** *(vague 1, pédagogie I3)* :
> *« Change **un seul** cran, dans un sens ou dans l'autre, et regarde ce que devient le
> verdict. »*

De part et d'autre du pivot, le verdict bascule au premier cran : **la coïncidence se sent
comme un fil**, au lieu de se chasser.
*La première rédaction demandait « **Sur les 75 mélanges, cherches-en un autre où rien ne
bouge** » — une recherche non bornée dont la réponse est un **négatif** (« il n'y en a
qu'un »), qu'aucun échantillonnage ne peut établir. Le fait d'unicité est un fait sur la
grille ; il appartient au retour, et il y est.*

**`etat_revele`** : aucun réglage n'est posé par la révélation — **c'est l'élève qui a amené
l'état** (`bain` = B, `c_produit` = $2{,}5\times10^{-2}$, `c_oxydant` = $1{,}0\times10^{-2}$).
**Déclaré : S5 n'a pas d'`etat_revele`.** *Conséquence de porte : la révélation de S5 ne
doit être atteignable que si `qri` et `k` portent la même chaîne — sinon le pari porte sur
un autre état que celui dont il parle.*

**Contrôles** : **`produit` seul pendant le pari** (le geste) ; `oxydant` et `bain` fermés,
le bain B posé par `etat`. **À la révélation : les trois ouverts, tous crans — les 75 états.**
**Lectures** : `equation`, `melange`, `qri`, `k` à l'encre ; puis `sens` et `especes` —
**six. `expression` disparaît** (identique à celle de S3 ; l'objet de S5 est la coïncidence de
deux nombres). *`especes` écrit ici « aucune, à l'échelle macroscopique » — ce n'est pas une
lecture vide, c'est le contenu du troisième cas, et il est légal à partir de S5.*

### 7.6 Le contrat « avant le pari », et les cinq formes de la fuite

#### A — la fuite par les RÉGLAGES (`fuite-inter-etapes`) — **table refaite, vague 1 (I6)**

*Deux colonnes par étape, parce qu'un contrôle peut s'ouvrir **à la révélation** : la
première dit ce qui est ouvert **pendant le pari**, la seconde ce qui l'est **après**. Les
états atteignables se comptent sur la seconde.*

| étape | pendant le pari | après la révélation | états atteignables ensuite |
|---|---|---|---|
| **S1** | `oxydant` **fermé** ; `produit` et `bain` **absents du DOM** | `oxydant` ouvert (5) | **5** — bain A, `produit` figé à $1{,}0\times10^{-3}$ |
| **S2** | `oxydant` ouvert (5) ; `produit` et `bain` absents | + `produit` **paraît**, ouvert (5) | **25** — le bain A entier |
| **S3** | **rien d'ouvert** : `oxydant` et `produit` **fermés**, `bain` **absent** (le bain B est posé par `etat`) | `bain` **paraît**, 2 crans (A, B), **seul ouvert** | **2** — le même mélange sur A et sur B : *le geste de S3* |
| **S4** | **rien d'ouvert** ; `bain` est au DOM et **affiche** C (posé par `etat`) **sans l'offrir** | `bain` gagne le cran **C** (3) ; `oxydant` rouvre (5) ; `produit` **reste fermé** | **15** — 5 crans d'oxydant × 3 bains, `produit` figé à $1{,}0\times10^{-3}$ |
| **S5** | **`produit` seul ouvert** (5) ; `oxydant` fermé, `bain` fermé sur B | les trois ouverts, tous crans | **75** |

**Ce que la porte doit établir, et c'est formulé en ATTEIGNABILITÉ, pas en présence :**

1. **le cran C n'est ATTEIGNABLE qu'après la révélation de S4** — il peut être *affiché*
   pendant S4, puisque c'est l'état posé ;
2. **le bain B n'est atteignable qu'après la révélation de S3** ;
3. **`produit` = $2{,}5\times10^{-2}$ n'est atteignable qu'à S5** — donc **l'état
   d'équilibre du bain B est hors d'atteinte avant S5**, et `sens` ne peut jamais écrire
   « déjà à l'équilibre » trop tôt (§5.6 point 3) ;
4. **pendant les paris de S3 et de S4, aucun contrôle n'est ouvert** — un contrôle qui se
   ferme est aussi une garantie, et elle se mesure ;
5. **la bande de travail est absente du DOM avant S3** (§5.5 B) — elle entre avec le bain B,
   et pas avant.

*La table précédente était contradictoire (« le cran C absent avant S5 » / « l'état de S4 EST
le bain C ») et laissait, sans que personne l'ait vu, la réponse de S5 atteignable dès S3 :
`produit` y était ouvert en même temps que le bain B était posé.* **La porte réécrit cette
table elle-même contre le descripteur, ligne à ligne, dans les deux colonnes.**

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
| `étain` · `Sn` · `plomb` · `Pb` · `dépôt` · `essai précédent` · `2,5` *(en position de $K$)* · `se retourne` · `oxydé` · `réduit` · `9` et `15` *(en position de comptage)* | **S3** |
| `argent` · `Ag` · `exposant` · `puissance` · `au carré` · `^2` · `^{2}` · `coefficient stœchiométrique` · `2017` · `aluminium` | **S4** |
| `équilibre` · `déjà à l'équilibre` · `n'évolue pas` · `ni dans un sens ni dans l'autre` · `microscopique` · `se compensent` · `aucune, à l'échelle` | **S5** |

*Trois ajustements de vague 1 : `dépôt` et `essai précédent` entrent à S3 avec les deux
métaux (§5.5 C) ; `9` / `15` y entrent parce que la partition passe du `suite` au **retour**
(§7.3) ; `2017` et `aluminium` entrent à S4 avec le retour réécrit (§7.4, fidélité I1). Et
`microscopique` / `se compensent` entrent à S5, où la phrase d'équilibre dynamique descend du
choix juste vers le retour (§7.5).*

*Lues dans le `textContent` **rendu**, chaque `.katex` remplacée par son annotation TeX ;
cherchées en **début de mot** et en Unicode (`\b` ignore les accents).*

#### D — la fuite par la DONNÉE

Les crans du §5.2 sont choisis pour que **le seul mélange à $Q_{r,i} = K$** n'existe **que
sur le bain B**. Et ils s'arrêtent à $1{,}0\times10^{-3}$ pour ne pas reproduire les nombres
de l'exemple travaillé de la leçon (§3). *C'est la forme de fuite que la corde a nommée
(`miroir-inerte`) : elle ne passe ni par un affichage, ni par un réglage, mais par le choix
des valeurs.*

⚠ **Corrigé en vague 1, et ce n'est pas une nuance de rédaction.** La première version
concluait que cet état était « *hors d'atteinte avant S4* ». **C'était faux.** L'état de S3
**est** le bain B, et `oxydant` et `produit` y étaient tous deux ouverts : l'élève pouvait
donc poser $(2{,}5\times10^{-2}\,;\,1{,}0\times10^{-2})$ **dès S3**, et lire, après la
révélation de S3, la chaîne « déjà à l'équilibre » — c'est-à-dire le cœur de S5, deux étapes
trop tôt. **Ni l'une ni l'autre des critiques ne l'a vu** ; c'est la table d'atteignabilité
refaite (§7.6 A) qui l'a fait apparaître. **La garantie ne vient donc pas du choix des
valeurs seul, mais du choix des valeurs ET de la fermeture de `produit` entre S3 et S5**
(§5.6 point 3). *Deux serrures sur la même porte, et il en fallait deux.*

#### E — la fuite par les NOTES d'honnêteté

Les lignes de `fit_caveat` sont du texte, et le texte fuit (leçon du banc de modulation).
La ligne qui parle de l'exposant n'est affichée **qu'à partir de S4** ; celle qui parle du
troisième cas, **qu'à partir de S5** ; **et la ligne neuve qui explique la bande de travail
(§10.5), qu'à partir de S3**, avec la bande elle-même. `formule-graduee` lit les notes
**avec** le panneau.

---

## 8. Misconceptions

### 8.1 Ce que la scène vise, sur l'inventaire déjà déclaré

> **Ce §8.1 est refait ligne à ligne après la vague 1 (pédagogie B3).** La règle de la maison
> est qu'**une ligne de registre non honorée est un constat au niveau de gravité maximal** :
> une ligne dit qu'un modèle **casse à l'écran**, et une absence n'est pas une cassure. Cinq
> des dix lignes ne tenaient pas. **Chacune est re-méritée ou RAYÉE, une par une, avec la
> raison.**
>
> **Et un défaut d'arithmétique que la vague 1 n'a pas relevé : le compte était faux.** Le
> paragraphe annonçait « **neuf** modèles déclarés » au-dessus d'une table de **dix** lignes,
> puis concluait « **dix** modèles servis » en incluant le modèle neuf — et §8.4, §12 et §14
> commandaient **dix** ids à `pedagogy_wiring`. **Le compte juste est : dix modèles existants
> touchés + `seuil-un-au-lieu-de-k` = ONZE ids.** *(Recompté sur `items.yaml:12-80` : la
> notion en déclare **dix-sept**, et les sept hors rang listés plus bas font bien
> $17 - 10 = 7$.)*

**Dix modèles déclarés de `evolution-spontanee` sont touchés par la scène. HUIT cassent sur
leur propre conséquence ; DEUX sont présents comme distracteurs sans être confrontés, et
c'est écrit.**

| id (`mc.chemistry.pc_evolution_spontanee.`) | items | étape | ce qui le casse à l'écran — **ou pourquoi la ligne est rayée** |
|---|---|---|---|
| `critere-inverse` | 5 | **S1, S2, S3** | le repère à gauche du pivot, et pourtant l'évolution va vers la droite |
| `confond-qr-et-k` | 6 | **S1, S5** | un mélange préparé où $Q_{r,i} \ne K$ ; puis un que l'élève AMÈNE lui-même à $Q_{r,i} = K$ dès la préparation |
| ~~`solide-dans-qr`~~ | 3 *(marge nulle)* | **— (rayée)** | **RAYÉE.** « *la lame est dessinée, sa masse n'est jamais demandée* » est une **absence**, pas une confrontation : celui qui croit que la masse entre dans $Q_r$ ne voit rien qui le contredise — **on ne le lui demande simplement pas**. Le distracteur reste à S1 (c'est une vraie erreur à cet instant) ; **la scène ne revendique plus de le casser**. *La confrontation existe ailleurs et elle est bonne : `cp-r2-qr-calcul` (`checkpoints.yaml:120-134`, `primary_misconception` = ce modèle) et `lesson.md:97`. Une piste pour la re-mériter est chiffrée au §13.13 — et refusée par défaut.* |
| `reactivite-metal-fixe` | 4 | **S3 seul** *(S2 retiré)* | **S3 :** le plomb oxydé dans un mélange, déposé dans un autre — **même couple, deux métaux présents**. **S2 est retiré de cette ligne :** la bonne réponse y est « aucun », c'est-à-dire **exactement ce que prédit le modèle** ; S2 le récompense au lieu de le casser (§7.2). Le rôle de S2 est désormais **d'amorcer** — il demande à l'élève de tenir sa propre raison, et S3 l'encaisse. |
| `sens-symetrique` | 4 | **S3** | sur le bain B, **9 mélanges vont dans un sens et 15 dans l'autre** : ce n'est pas une symétrie, c'est une partition — et le retour de S3 le chiffre désormais |
| `pas-de-critere-predictif` | 3 *(marge nulle)* | **S2** | le comptage se fait sans rien observer, et il est juste |
| `exposants-oublies` | 3 *(marge nulle)* | **S4** | **le pari porte sur l'expression** : choisir celle sans exposant fait tomber la marque **deux décades** plus loin, et la révélation déplace la marque entre les deux positions |
| `qr-produits-reactifs-inverses` | 3 *(marge nulle)* | **S4**, ancré sur le bain B (4,2) | **RE-MÉRITÉE, et l'appel au seuil $1$ est supprimé.** L'expression inversée met un **réactif** au numérateur : la marque tombe deux décades de l'autre côté et les deux rôles du bécher s'échangent. **Et la conséquence de VERDICT est nommée sur l'état où elle existe** : bain B, $(1{,}0\times10^{-1}\,;\,1{,}0\times10^{-2})$ — le quotient juste vaut $10 > K$ (inverse), l'inversé vaut $0{,}10 < K$ (**direct**). *La première rédaction réfutait l'inversion **par le seuil $1$** — c'est-à-dire par la misconception que la scène introduit au §8.2 — et sur le bain C, où les deux valeurs sont écrasées par $K$ et donnent le même verdict : l'inversion y était invisible dans le critère.* |
| `equilibre-egale-arret-total` | 3 *(marge nulle)* | **S5** | **RE-MÉRITÉE par une lecture neuve.** `melange` affiche $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L **à l'écran**, sur l'état d'équilibre. *La première rédaction citait cette lecture — **et aucune des sept lectures déclarées n'affichait de concentration**. La réfutation pointait un écran qui n'existait pas (§5.7).* |
| ~~`spontane-egale-instantane`~~ | 3 *(marge nulle)* | **— (rayée)** | **RAYÉE.** Dans une scène à `temps: false`, « *il évolue, mais si lentement qu'on ne le verra pas* » est **infalsifiable par la scène** : « le critère ne parle pas de vitesse » est un argument, pas une observation. Le distracteur reste à S5 ; **la limite est déclarée au §10.8**. *Aucune couverture n'est perdue : le modèle est déjà sondé par `cp-r6-vitesse` et par ES-9 / ES-24 / ES-29.* |

**Le solde honnête : huit modèles existants CONFRONTÉS, deux PRÉSENTS-mais-non-confrontés,
plus le modèle neuf du §8.2 = ONZE ids à déclarer.** *Les sept autres —
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

> **UNE SEULE POLARITÉ, ET C'EST CELLE-CI — corrigé en vague 1 (fidélité B2).** La première
> rédaction **déclarait** le modèle dans un sens ($Q_{r,i} > 1 \Rightarrow$ **direct**) et
> l'**employait** dans l'autre ($Q_{r,i} > 1 \Rightarrow$ **inverse**, §5.3 E, S2, et le
> sabotage 6 du §11.4). Les deux étaient dans le même document.
>
> **La polarité employée est la bonne, et elle est la seule qui soit distincte.** Le modèle
> juste est « comparer $Q_{r,i}$ à $K$ » ; **`seuil-un-au-lieu-de-k` garde la flèche et
> remplace $K$ par $1$** : trop de produits ⇒ ça recule. **`critere-inverse` fait le
> contraire** : il garde $K$ et **retourne la flèche** (`items.yaml:15-16` :
> « *$Q_{r,i} < K$ […] c'est la réaction DIRECTE qui l'emporte […] $Q_{r,i} > K$ impose au
> contraire le sens INVERSE* » — donc le modèle prédit direct au-dessus de $K$). **Les deux
> erreurs sont orthogonales : l'une déplace le seuil, l'autre inverse le sens.**
> *La polarité déclarée, elle, prédisait « grand ⇒ direct » — la même chose que
> `critere-inverse` sur toute la région où vivaient les trois items. Non diagnostique.*
>
> **Conséquence, et elle est une condition de construction : chaque item porte une
> configuration où $1$ et $K$ ne disent PAS la même chose** — soit $1 < Q_{r,i} < K$ (ou
> $K < Q_{r,i} < 1$), soit $Q_{r,i} = 1$ exactement avec $K \ne 1$. **Ailleurs, le modèle est
> d'accord avec la vérité par accident et ne mesure rien** (§8.3).

```yaml
  - id: mc.chemistry.pc_evolution_spontanee.seuil-un-au-lieu-de-k
    label: "« Le seuil du critère est 1 : Qr,i > 1 annonce le sens inverse (trop de produits, ça recule), Qr,i < 1 le sens direct, et Qr,i = 1 l'équilibre »"
    description: >-
      L'élève garde le bon sens de comparaison mais remplace K par 1 : il lit
      Qr comme un rapport « produits sur réactifs » dont le point d'équilibre
      naturel serait 1, et conclut à partir de cette seule lecture — au-dessus
      de 1, il y aurait « trop de produits », donc le système reculerait ; en
      dessous, il avancerait ; à 1 exactement, il serait à l'équilibre. Se
      manifeste aussi par un verdict rendu alors que K n'est pas fourni, ou par
      « Qr,i est grand » / « Qr,i est petit » employés sans jamais citer K.
      À distinguer de critere-inverse, qui garde K comme seuil et retourne le
      sens de la conclusion : ici le sens est bon, c'est le SEUIL qui est faux.
    contradicts_principle: >-
      Le seuil du critère est K, et K seul : il dépend de la réaction et de la
      température, et vaut 2,5 pour un couple et 1,8×10^37 pour un autre. Un
      Qr,i de 1 est très loin SOUS K dans un cas et très loin AU-DESSUS dans un
      autre — le même quotient y donne donc deux verdicts opposés. La valeur
      absolue de Qr,i ne dit rien tant qu'on ne l'a pas placée par rapport à K,
      et 1 n'est un repère que pour l'arithmétique, jamais pour la chimie.
```

**Ce que la nouvelle polarité change dans les comptages de la scène, vérifié :** sur le
bain A, le modèle compte **10 mélanges en sens inverse** (ceux où $Q_{r,i} > 1$, soit
$\binom{5}{2} = 10$) là où `critere-inverse` en compte **25** et la vérité **0** — *trois
nombres distincts, c'est ce qui fait tenir le pari de S2* (§5.3 E). Et il place **cinq
mélanges pile sur son propre seuil** ($Q_{r,i} = 1$, la diagonale). **Aucun de ces chiffres
ne bouge** : ils avaient été calculés avec la bonne polarité depuis le début — c'est la
déclaration seule qui était fausse.

**Un seul modèle neuf, et c'est délibéré.** Deux autres candidats ont été écartés faute de
mesure : « *le sens dépend de la concentration la plus grande* » (couvert par
`seuil-un-au-lieu-de-k` dans ses conséquences chiffrées) et « *$K$ change quand on change le
mélange* » (c'est `k-depend-etat-initial` de la notion sœur, et **rien dans `evolution-spontanee`
ne fait varier l'état initial d'un même couple** — jusqu'à cette scène ; **candidat pour la
vague 1**, §13.10).

### 8.3 Les QUATRE items à écrire (specs pour item-author) — refaites en vague 1

*Plancher : ≥ 3 items par modèle, comptés au **distracteur** (`items.yaml:1821-1826`). Les
quatre ci-dessous sont des **specs**, pas des items finis : le stem, les valeurs et le modèle
de chaque distracteur sont fixés ; la rédaction est d'item-author. Ids proposés :
**ES-30, ES-31, ES-32, ES-33** (la banque s'arrête à ES-29).*

> **Les trois règles de construction, toutes issues de la vague 1 :**
> **(1)** chaque item est posé sur une configuration où **$1$ et $K$ ne disent pas la même
> chose** — sinon `seuil-un-au-lieu-de-k` a raison par accident et ne mesure rien
> (fidélité B2) ;
> **(2)** **le modèle neuf et `critere-inverse` doivent produire des prédictions
> DIFFÉRENTES** dans chaque item, sans quoi deux distracteurs disent la même chose ;
> **(3)** **tout stem dont le verdict est « inverse » sur $Sn/Pb$ met les DEUX métaux dans
> le bécher** — c'est le défaut B1 de la scène, et **ES-31 l'avait aussi**.
>
> *Arithmétique de séparation, faite une fois pour toutes et valable pour les quatre :*
> `seuil-un` *et* `critere-inverse` *prédisent la MÊME chose quand $1 < Q_{r,i} < K$, et des
> choses OPPOSÉES en dehors. **Un item qui doit séparer les deux a donc besoin d'un état de
> chaque côté** — c'est pourquoi ES-31 et ES-33 sont à deux mélanges, et pourquoi ES-30 se
> pose exactement sur $Q_{r,i} = 1$, où* `seuil-un` *dit « équilibre » et où personne d'autre
> ne le dit.*

**ES-30 — `utilisation`, rung R2, difficulté 2.** *Le quotient tombe pile sur le faux seuil.*
Stem : $Sn + Pb^{2+} \rightleftharpoons Sn^{2+} + Pb$, à la température de l'expérience
**$K = 2{,}5$** ; une lame d'étain, $[Sn^{2+}]_i = 5{,}0\times10^{-2}$ et
$[Pb^{2+}]_i = 5{,}0\times10^{-2}$ mol/L, donc $Q_{r,i} = 1{,}0$. Question : sens d'évolution ?
Choix : **(A, juste)** $Q_{r,i} = 1{,}0 < K = 2{,}5$ ⇒ **sens direct** ; **(B)** « $Q_{r,i} = 1$ :
autant de produits que de réactifs, le système est **à l'équilibre**, il n'évolue pas » ⇒
**`seuil-un-au-lieu-de-k`** ; **(C)** « $Q_{r,i} = 1{,}0 < K$, donc sens **inverse** » ⇒
`critere-inverse` ; **(D)** « on ne peut pas conclure : il manque la masse de la lame
d'étain » ⇒ `solide-dans-qr`.
*Trois prédictions distinctes : direct / équilibre / inverse. Le verdict est direct, donc
**un seul métal suffit** dans le bécher — la règle (3) ne mord pas ici.* **Inchangé par la
vague 1 : c'est le seul des trois d'origine qui était diagnostique sous les deux polarités.**

**ES-31 — `utilisation`, rung R2, difficulté 3. RECONSTRUIT.** *Le même $Q_{r,i}$, deux
couples, deux verdicts.*
Stem : deux béchers, tous deux à $Q_{r,i} = 10$. **Bécher 1** : $Zn/Cu^{2+}$,
$K = 1{,}8\times10^{37}$. **Bécher 2** : $Sn/Pb^{2+}$, $K = 2{,}5$ — **avec une lame d'étain
ET un dépôt de plomb, laissé par un essai précédent**. Question : les deux évoluent-ils dans
le même sens ?
Choix : **(A, juste)** **non** — sens direct pour le premier, sens **inverse** pour le
second ; **(B)** « **oui, tous deux dans le sens inverse** : $Q_{r,i} = 10$ est au-dessus de
$1$, il y a trop de produits, ça recule » ⇒ **`seuil-un-au-lieu-de-k`** ; **(C)** « non, mais
l'inverse : sens **inverse** pour le premier ($Q_{r,i} \ll K$), sens **direct** pour le second
($Q_{r,i} > K$) » ⇒ `critere-inverse` ; **(D)** « oui : le sens dépend du couple et non du
mélange — le zinc et l'étain cèdent leurs électrons » ⇒ `reactivite-metal-fixe`.
*Quatre prédictions deux à deux distinctes ✓.* **Deux corrections de vague 1 :** le
distracteur `seuil-un` disait « tous deux dans le sens **direct** » — la polarité déclarée,
c'est-à-dire la prédiction de `critere-inverse` ; **et le stem plaçait un sens inverse sur
$Sn/Pb$ sans plomb solide**, exactement le défaut B1 de la scène. *C'est l'item que la scène
rend possible : il exige de tenir DEUX $K$ à la fois — et c'est la `suite` de S3, sur papier.*

**ES-32 — `utilisation` *(relabellisé)*, rung R2, difficulté 4. RECONSTRUIT.** *Le verdict
rendu sans $K$.*
Stem : un compte rendu donne les concentrations d'un mélange et son quotient,
**$Q_{r,i} = 4{,}0\times10^{2}$**, mais **la fiche de données est déchirée : $K$ manque**. Un
élève conclut tout de même. Que penser, et que faut-il pour conclure ?
Choix : **(A, juste)** on ne peut pas conclure sans $K$ ; il faut la constante d'équilibre de
**cette** réaction **à cette température** ; **(B)** « on peut conclure sans la fiche :
$Q_{r,i}$ est au-dessus de $1$, il y a trop de produits — **sens inverse** » ⇒
**`seuil-un-au-lieu-de-k`** ; **(C)** « la fiche est inutile : $K$, c'est la valeur que prend
$Q_r$ — donc $K = 4{,}0\times10^{2}$ et le système est à l'équilibre » ⇒ `confond-qr-et-k` ;
**(D)** « on ne peut conclure qu'en regardant le bécher, c'est la seule méthode sûre » ⇒
`pas-de-critere-predictif`.
**Trois corrections de vague 1.** *(i)* Le distracteur `seuil-un` concluait « sens direct »
(polarité déclarée) ; il conclut désormais « sens inverse ». *(ii)* Le distracteur
`critere-inverse` est **remplacé par `confond-qr-et-k`** : **sans $K$, `critere-inverse` n'a
rien à inverser** — le choix n'était atteignable que par un raisonnement de seuil absolu,
c'est-à-dire par le modèle neuf lui-même. *(iii)* **L'étiquette d'habileté passe de
`application_experimentale` à `utilisation`** (fidélité I3) : une fiche déchirée n'est ni un
protocole, ni une mesure, ni un appareil — *c'est de l'`utilisation` en costume
expérimental*, et c'était la seule `application_experimentale` revendiquée par la livraison.
*(iv)* La valeur passe de $3{,}0\times10^{2}$ à $4{,}0\times10^{2}$ : $3{,}0\times10^{2}$ est
déjà le quotient d'ES-1 (`items.yaml:94`) **et** de `cp-r2-critere` (`checkpoints.yaml:199`).
**item-author vérifie la collision sur l'ensemble des 29 items avant d'écrire** (§15.5).

**ES-33 — `application_experimentale` MÉRITÉE, rung R2, difficulté 4. NEUF (vague 1,
fidélité I3).** *Prévoir une observation, et dire quelle donnée était indispensable.*
**Sa ligne de cadre, citée :** `travaux_pratiques` du sous-domaine,
`pc-physique-chimie.yaml:528` — « *Constituants et fonctionnement d'une pile → réaliser des
piles (couples $M^{n+}/M$) et **déduire le sens spontané des transformations*** ». **C'est la
seconde moitié de cette ligne qui est exercée ici — « déduire le sens spontané » — sur un
contact direct, sans aucun vocabulaire de pile** (§9.6 vaut pour le panneau ; l'item reste à
l'écart du chapitre `piles` par construction).
Stem : un binôme prépare **deux béchers du même couple** $Sn/Pb^{2+}$, chacun avec **une lame
d'étain et un dépôt de plomb** laissé par un essai précédent. **Bécher 1** :
$[Sn^{2+}]_i = 2{,}0\times10^{-2}$, $[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L
($Q_{r,i} = 2{,}0$). **Bécher 2** : $[Sn^{2+}]_i = 1{,}0\times10^{-1}$,
$[Pb^{2+}]_i = 1{,}0\times10^{-2}$ mol/L ($Q_{r,i} = 10$). Fiche : $K = 2{,}5$.
Question : **avant de regarder**, prévoir pour chaque bécher si le dépôt de plomb va grossir
ou diminuer — et dire **quelle donnée de la fiche était indispensable** à la prévision.
Choix : **(A, juste)** bécher 1 : le dépôt **grossit** ($2{,}0 < 2{,}5$, sens direct) ;
bécher 2 : il **diminue** ($10 > 2{,}5$, sens inverse) ; la donnée indispensable est **$K$ à
la température de l'essai** ; **(B)** « les deux diminuent : dans les deux, $Q_{r,i}$ est
au-dessus de $1$, donc trop de produits » ⇒ **`seuil-un-au-lieu-de-k`** ; **(C)** « bécher 1 :
il diminue ; bécher 2 : il grossit » ⇒ `critere-inverse` ; **(D)** « les deux grossissent :
l'étain est le plus réducteur des deux, c'est toujours lui qui s'oxyde » ⇒
`reactivite-metal-fixe`.
*Pourquoi ces deux crans-là, et pas ceux de la scène :* **$Q_{r,i} = 2{,}0$ est dans
l'intervalle $(1\,;\,2{,}5)$ — la seule zone où $1$ et $K$ donnent des verdicts opposés — et
**aucun rapport de deux crans de la grille n'y tombe** (les 25 rapports du bain B sautent de
$1$ à $2{,}5$). *L'item n'est pas lié à la grille ; la scène l'est. C'est justement le geste
qu'un item peut faire et que la scène ne peut pas.* **Et les quatre prédictions sont deux à
deux distinctes** : (grossit, diminue) / (diminue, diminue) / (diminue, grossit) /
(grossit, grossit) ✓.
*Pourquoi l'habileté est **méritée** ici et ne l'était pas à ES-32 : il y a un protocole
(deux béchers préparés), une **observable** (le dépôt), une prévision **antérieure** à
l'observation, et une question sur **la donnée nécessaire** — c'est un geste expérimental à
l'intérieur de ce chapitre.*

**Le solde d'habiletés après ces quatre items** (§0.3, §1) : **7 `utilisation` ·
2 `application_experimentale` · 0 `resolution_probleme` sur 9 lignes portant le champ =
78 / 22 / 0**, contre la cible 50 / 15 / 35. **La résolution de problème reste à zéro** :
un pari à quatre choix est un QCM, et quatre QCM de plus n'en font pas un problème.

### 8.4 Le solde de couverture, honnête

- **Le modèle neuf arrive à QUATRE items — une marge de un, et c'est neuf.** *(La première
  rédaction en prévoyait trois, marge nulle ; ES-33 en ajoute un quatrième, qui porte le
  modèle sur deux mélanges à la fois.)* **Un retrait d'item ne casse plus le plancher** —
  situation meilleure que celle de douze des dix-sept familles existantes, qui siègent
  exactement à 3 avec « *la marge est nulle* » (`items.yaml:1856-1859`).
- **Aucun des quatre items neufs n'est de niveau `resolution_probleme`.** La notion reste à
  **0 %** sur une cible de **35 %**, soit **3,5 points d'examen** (§0.3, §1). **Cette scène
  ne referme pas cela**, et ce n'est pas faute de l'avoir cherché : un pari à quatre choix
  est un QCM.
- **Le déplacement de couverture, chiffré et assumé** *(fidélité I3, biais secondaire)* :
  les quatre items neufs sont **tous au rung R2**, déjà le rung le plus chargé
  (`items.yaml:1851`, `R2: 6`), et **trois d'entre eux portent un distracteur
  `critere-inverse`**, qui passe de **5 à 8**. *Ce n'est pas un défaut de plancher — un
  plancher se casse par le bas, pas par le haut — mais c'est un déséquilibre à connaître, et
  il est écrit plutôt que subi. ES-32 rend d'ailleurs son `critere-inverse` : sans $K$, le
  modèle n'a rien à inverser (§8.3).*
- **Les dix modèles existants ne gagnent AUCUN item.** La scène en *confronte* huit ; elle
  n'en *mesure* aucun — un pari de scène ne compte pas dans le banc (le modèle apprenant est
  bâti sur le banc de fin seul, `items.yaml:1824-1825`).
  **Le `pedagogy_wiring.misconceptions` du descripteur en nommera ONZE** — les **dix**
  modèles existants touchés (les huit confrontés **plus** `solide-dans-qr` et
  `spontane-egale-instantane`, dont les distracteurs restent à l'écran) **plus le modèle
  neuf**. *Corrigé en vague 1 : le document annonçait DIX, en partant d'un « neuf modèles
  déclarés » qui comptait mal une table de dix lignes (§8.1).* `validate-content` exige que
  **chacun des onze** soit **déclaré** dans `items.yaml` au moment où la scène est validée
  (ADR 0041, addendum du manège) — **y compris les deux dont la ligne de registre est
  rayée**, puisqu'un distracteur qui les nomme reste à l'écran.

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
    ⚠ **ET, NEUF EN VAGUE 1 (fidélité M4) : AUCUNE UNITÉ à côté d'un $Q_r$ ou d'un $K$.**
    « *$Q_r$ est une grandeur **sans unité**, par convention* »
    (`etat-equilibre/lesson.md:132`) — et $K$ ne fait que prendre la valeur de $Q_r$ à
    l'équilibre. **Rien, dans la liste ci-dessus, ne l'interdisait** : la règle admettait
    `mol/L`, `mol.L` et `mol·L` dans le panneau **pour les concentrations**, et les lectures
    `qri` et `k` vivaient dans la même liste — un « $Q_{r,i} = 0{,}10$ mol/L » serait passé
    au vert. **Forme interdite, mesurée sur le nœud :** tout jeton d'unité (`mol/L`,
    `mol.L`, `mol·L`, `mol⋅L`, `\text{mol}`, `M`, `g/L`, `g.L`) **à l'intérieur ou
    immédiatement adjacent** d'un nœud `[data-lecture="qri"]` ou `[data-lecture="k"]`.
    *Les unités restent **obligatoires** sur les libellés des boutons radio et dans la
    lecture `melange` (§6.2, §5.7) : ce sont des concentrations. La sonde est donc scopée au
    NŒUD, jamais au panneau entier.* **Son essai rouge est au §11.4, ligne 24.**
11. **La convention de flèche, dans les deux sens — ET ELLE N'EST PAS CELLE DU BANC
    D'ÉLECTROLYSE.** Le banc d'électrolyse impose « *toute ligne contenant `e^-` porte
    $\rightleftharpoons$ ; aucune ligne sans `e^-` n'en porte* » (sa spec §9.17) — règle
    tirée du cadre « *réactions aux électrodes (double flèche) et équation bilan (simple
    flèche)* » (`:511`, `:520`), qui ne vaut que pour les piles et l'électrolyse. **Dans
    cette notion-ci, l'équation bilan s'écrit $\rightleftharpoons$**, et c'est le choix
    constant de la leçon : `lesson.md:51`, `:73`, `:93`, `:189`, `:201` — cinq bilans, cinq
    doubles flèches.
    **ET LES SUJETS TRANSCRITS TRANCHENT DANS LE MÊME SENS — mesuré en vague 1
    (fidélité I5) :** `evolution-spontanee/bank.yaml:73` (2012 N) écrit
    `\underset{2}{\overset{1}{\rightleftarrows}}` ; `piles/bank.yaml:750` (2017 N) écrit
    `\underset{(2)}{\overset{(1)}{\rightleftarrows}}` ; `piles/bank.yaml:906` (2011 R) écrit
    `\rightleftharpoons`. **Trois bilans officiels, trois doubles flèches** — et la ligne
    `derived` du cadre « *l'équation bilan (simple flèche)* » (`pc-physique-chimie.yaml:511`,
    `:520`) est donc **contredite par les sujets qu'elle prétend décrire**. *À consigner : ces
    lignes-là portent « THESE NEED HUMAN VALIDATION » (§13.1).*
    **La règle de la scène est donc : toute équation affichée porte une double flèche, aucune
    ne porte `\rightarrow` ni `\to` seuls**, et la porte le mesure dans les deux sens.
    ⚠ **LA PORTE ÉNUMÈRE LES FORMES, sinon elle est aveugle** (ADR 0036 : *une chose n'est
    prouvée ABSENTE que si l'on a énuméré ses FORMES*). **Les trois formes acceptées, à
    chercher dans le rendu KaTeX ET dans l'annotation TeX :**
    `\rightleftharpoons` · `\rightleftarrows` · **la forme numérotée
    `\underset{…}{\overset{…}{\rightleftarrows}}`**, avec ou sans parenthèses autour des
    chiffres. *La première rédaction ne nommait que `\rightleftharpoons` : une équation
    écrite à la manière de 2017 N aurait fait rougir la porte, ou pire, une simple flèche
    déguisée serait passée.*
    ✅ **Et un gain de fidélité gratuit, pris en vague 1 : la scène porte les repères
    (1)/(2)** sur l'équation affichée, et la lecture `sens` écrit « **sens direct (1)** » /
    « **sens inverse (2)** ». *Justification exacte, et il faut être précis : **le numérotage
    vient des ÉNONCÉS transcrits** (2012 N et 2017 N le portent sur la flèche) ; la
    **formulation** « le système évolue dans le sens direct (1) » qu'on lit à `bank.yaml:91`,
    `piles/bank.yaml:780` et `:922` est, elle, **de la maison** — elle vit dans des blocs
    `reasoning:` et `steps[].note`. **On ne redira donc pas que « l'examen écrit sa réponse
    ainsi » ; on dira que deux sujets sur trois numérotent les deux sens sur la flèche, et
    que c'est la notation que l'élève doit savoir produire.*** *(2011 R ne numérote pas :
    `piles/bank.yaml:906`.)*
    ⚠ **Divergence déclarée entre deux scènes de la même matière ; c'est un arbitrage au
    propriétaire, pas une erreur** — §13.11.
12. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester indéfini même
    panneau OUVERT** — famille de porte à part entière.
13. **La scène n'est pas un TP et ne le prétend jamais.** Interdits : `travaux pratiques`,
    `TP`, `protocole`, `mode opératoire`, `burette`, `pipette`, `fiole jaugée`, `rinçage`.

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points 1 à 5
> seulement**, et ce sont aussi les phrases de légende (échelonnées, §7.6 E). **Les points 6
> à 9 ne sont rendus nulle part** : ce sont des notes de conception.

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
5. **RENDU, NEUF (vague 1) — la bande de travail est un AGRANDISSEMENT, pas un second axe.**
   Elle montre huit décades autour de $K$ à une échelle plus fine ; le crochet posé sur
   l'axe d'ensemble dit exactement quelle portion elle agrandit. **Quand le repère n'y est
   pas, c'est qu'aucun mélange préparable n'approche $K$ d'aussi près** — et c'est un fait sur
   le couple, pas un défaut d'affichage. *Phrase de légende, échelonnée : elle n'est affichée
   qu'à partir de S3, avec la bande.*
6. *(non rendu)* **$K = 2{,}5$ pour $Sn/Pb$ est la valeur du corpus (ES-19), et elle est
   PORTEUSE — c'est le drapeau rouge du §13.3.** Les deux couples sont séparés d'environ
   $0{,}011$ V ; les tables usuelles donnent $K \approx 2{,}2$ (valeurs à deux décimales) à
   $\approx 2{,}4$ (valeurs à trois décimales). **La partition du §5.3 B ne survit pas au
   changement :** $K = 2{,}2$ ou $2{,}4$ ⇒ **10 / 0 / 15** ; $K = 2{,}5$ ⇒ **9 / 1 / 15** ;
   $K = 3{,}0$ ⇒ **9 / 0 / 16**. *(Vérifié : aucun des 25 rapports de crans ne tombe dans
   $(1\,;\,2{,}5)$ ni dans $(2{,}5\,;\,4)$.)* **L'état d'équilibre unique — tout le contenu de
   S5, sa `suite`, la porte N3, la porte N10 et le cas obligatoire d'`etiquettes` — n'existe
   que si $K$ vaut $2{,}5$ au chiffre près.** *La première rédaction écrivait « le comptage
   change si la valeur change » et laissait la note **non rendue** : c'était vrai et trop
   doux. **C'est une dépendance structurelle, pas une sensibilité.** §13.3.*
7. *(non rendu)* **Le bécher est un dessin d'énoncé, pas un instrument.** Les ions n'y sont
   pas comptés, les métaux n'y maigrissent pas, et rien n'y bouge : la scène n'a ni temps ni
   course. La seule chose que le bécher ajoute à l'axe est **qui** est oxydé — et c'est la
   seule raison pour laquelle il est là. *Les deux solides du bain B y sont pour une raison
   physique, pas décorative (§5.5 C).*
8. *(non rendu)* **La scène ne peut RIEN dire d'une vitesse, et donc rien opposer à
   « ça évolue, mais trop lentement pour se voir ».** `temps: false` : le distracteur
   `spontane-egale-instantane` de S5 est une vraie erreur d'élève, et **la scène ne le
   réfute pas — elle lui oppose un argument** (le critère ne contient aucune grandeur
   temporelle). **C'est pourquoi sa ligne de registre est rayée** (§8.1), et pourquoi la
   mesure de ce modèle reste chez `cp-r6-vitesse` et ES-9 / ES-24 / ES-29.
9. *(non rendu)* **Les trois bains ne sont pas trois expériences « au même titre ».** A est
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
| N3 | **le cran unique de l'équilibre, formulé sur la CONSTANTE DÉCLARÉE** : sur les 75 états, **exactement un** porte le verdict « déjà à l'équilibre », et c'est le seul où les chaînes `qri` et `k` sont **identiques au caractère près** ; il se trouve à (B, $2{,}5\times10^{-2}$, $1{,}0\times10^{-2}$) | — | exact. ⚠ **La propriété est celle du couple (liste de crans, constante déclarée), JAMAIS celle de l'étain et du plomb** *(vague 1, fidélité I2)* : elle tient parce que $K$ **vaut $2{,}5$ dans le descripteur**, et elle tomberait à $2{,}2$ comme à $3{,}0$. La porte doit donc **lire la constante dans le descripteur** et refaire le décompte, jamais la coder en dur — sans quoi elle répondrait vert à une question plus étroite que son en-tête (ADR 0033). §13.3 |
| N4 | **$K$ ne dépend QUE du bain** : aux 25 états d'un bain, la chaîne `k` est **identique au caractère près** | « 1,8×10^37 » · « 2,5 » · « 4,0×10^15 » | **égalité de chaîne, 75 états, 3 valeurs** — *c'est la garde structurelle du §2.2* |
| N5 | **l'exposant du bain C est STRUCTUREL** : $Q_r(\text{C})$ à $[Ag^+]$ divisé par 10 est multiplié par **100**, aux 5 crans de $[Cu^{2+}]$ | facteur $100$ exact | égalité de chaîne sur les deux valeurs |
| N6 | les **quatre EXPRESSIONS du pari de S4** et la valeur que chacune produit, recalculées depuis les quatre modèles nommés | $\frac{[Cu^{2+}]}{[Ag^+]^2} \to 0{,}10$ · $\frac{[Cu^{2+}]}{[Ag^+]} \to 1{,}0\times10^{-2}$ · $\frac{[Cu^{2+}]}{2[Ag^+]} \to 5{,}0\times10^{-3}$ · $\frac{[Ag^+]^2}{[Cu^{2+}]} \to 10$ | les quatre **formules** deux à deux distinctes **et** les quatre **valeurs** deux à deux distinctes ; égalité de chaîne avec les libellés *(le pari porte désormais sur l'expression, §7.4 — la porte vérifie les deux colonnes)* |
| N7 | les **trois comptages du pari de S2** | vérité $0$ · `critere-inverse` $25$ · `seuil-un-au-lieu-de-k` $10$ | exact, recomptés sur la grille 5×5, **avec la polarité déclarée au §8.2** — *si le label YAML et le comptage divergent, la porte sort ROUGE : c'est le défaut de vague 1 outillé* |
| N8 | **`ecart` est une lecture PAR ÉTAT** : entier, jamais décimal, aux 75 états ; et **la phrase du retour de S2** est mesurée à part | lecture : **39** à l'état de S1, **34** au mélange extrême de S2, **16** à l'état de S4 · retour de S2 : « au moins 34 ordres de grandeur » | chaîne exacte des deux côtés. *Réécrite en vague 1 (pédagogie M3) : l'ancienne N8 épinglait « au moins 34 » comme si c'était la LECTURE, ce qui aurait figé une borne globale dans une ligne qui décrit l'état affiché* |
| N9 | **la table d'ATTEIGNABILITÉ du §7.6 A, dans ses deux colonnes** : ce qui est ouvert pendant chaque pari, ce qui l'est après chaque révélation, et l'ensemble des états joignables à chaque instant | 1 · 5 · 25 · 2 · 15 · 75 | exact. **Trois interdits mesurés séparément :** le cran C inatteignable depuis S3 ; le bain B inatteignable depuis S2 ; **`produit` $= 2{,}5\times10^{-2}$ inatteignable avant S5**, donc l'état d'équilibre hors d'atteinte |
| N10 | **la diagonale** : aux 5 états où les deux crans sont égaux, `qri` vaut exactement « 1,0 » aux bains A et B | — | égalité de chaîne — *c'est ce qui rend `seuil-un-au-lieu-de-k` visible* |
| **N11** | **la bande de travail** : pour chacun des 3 bains, ses bornes sont $[\log K - 4\,;\,\log K + 4]$ ; et les 25 quotients du bain B y tiennent tous | bain B : de $2{,}5\times10^{-4}$ à $2{,}5\times10^{4}$ ; **25/25 dedans** | exact, **recalculé depuis la constante déclarée**, pas codé en dur |
| **N12** | **la lecture `melange`** : aux 75 états, elle porte exactement les deux crans de l'état, avec leur unité — et **elle n'existe qu'à S5** | — | égalité de chaîne avec les libellés des contrôles |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de l'axe**, jamais au pixel absolu : le
facteur px/décade est lu sur **deux graduations étiquetées** du dessin (leçon de la porte du
champ magnétique). Lancée à **1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `axe-decades` | l'écart en pixels entre deux décades consécutives est **constant sur tout l'axe**, à $\le 1$ px, aux deux largeurs | un axe dont l'échelle se resserre aux bords doit rougir **seule** ; un axe dont les bornes changent avec le bain aussi |
| `position-qri` | l'abscisse du repère $Q_{r,i}$ $=$ $\log_{10}(Q_{r,i})$ × (px/décade) + origine, à $\le 2$ px, aux **75** états | un repère dessiné depuis un autre nombre que celui affiché doit rougir ; un repère **plafonné** aux bords aussi |
| `position-k` | l'abscisse du pivot $K$, aux **3** bains, même formule ; et **le pivot ne bouge pas** entre les 25 états d'un même bain, à $\le 1$ px | un pivot qui glisse avec le mélange doit rougir **seul** — *c'est la misconception dessinée* |
| **`bande-de-travail`** *(NEUVE, vague 1 : pédagogie B2 + fidélité I4)* | **(a)** l'écart en pixels entre deux décades consécutives **de la bande** est constant à $\le 1$ px, aux deux largeurs ; **(b)** le px/décade de la bande est **déclaré** et la mesure le confirme ; **(c)** le crochet posé sur l'axe d'ensemble couvre **exactement** les huit décades de la bande ; **(d) le critère qui compte, à 390 px : à l'état de S3, les deux marques sont à $\ge 16$ px ; à l'état d'équilibre de S5, à $\le 2$ px** — *les deux valeurs mesurées sont IMPRIMÉES, vertes ou non* ; **(e)** hors bande, **aucune pastille** n'est dessinée : un **chevron de bord** distinct porte l'écart en décades | une bande dont l'échelle n'est pas constante doit rougir **seule** ; une bande dont la largeur change avec le bain aussi ; **une séparation de S3 qui tombe sous 16 px à 390 px doit rougir** ; une paire de S5 dessinée écartée aussi ; **une pastille plafonnée au bord de la bande** doit rougir (et non le chevron, qui est légitime) |
| `cote-et-verdict` | le repère est **à gauche** du pivot **si et seulement si** `sens` dit « direct » ; à droite ssi « inverse » ; **confondu à $\le 2$ px** ssi « déjà à l'équilibre » — aux 75 états, **et sur la BANDE quand elle est présente**, jamais sur le seul axe d'ensemble | un verdict qui contredit la position doit rougir **seule**. ⚠ *Sans la bande, cette famille était **verte sur une distinction que personne ne peut voir** : à 390 px les $0{,}602$ décade de S3 font ~5 px sur l'axe d'ensemble, contre une tolérance « confondu » de 2 px — la porte aurait certifié « équilibre » tout ce qui est à un facteur $\approx 1{,}8$ de $K$, c'est-à-dire **la PLAGE d'équilibres que le §5.2 point 2 interdit et pour laquelle le curseur continu a été refusé**. La tolérance se lit désormais sur la bande, où elle vaut $\le 2$ px pour $0$ décade et non pour $0{,}05$ décade.* |
| `fleche-du-verdict` | la flèche d'accent part du repère et pointe **vers** le pivot, aux 75 états | une flèche retournée doit rougir **seule** ; une flèche qui dépasse le pivot aussi |
| `becher-et-roles` | **(a) RÈGLE NEUVE, vague 1 B1 — la présence des solides : tout bain dont les 25 états contiennent un verdict INVERSE porte les DEUX espèces solides dans le DOM du bécher AVANT le pari.** La porte calcule elle-même quels bains sont concernés (ici : **B seul**) et vérifie la présence ; **(b)** après la révélation, l'étiquette `oxydé` est posée sur l'espèce que `especes` nomme, aux 3 bains et **aux 2 verdicts du bain B** | **un bain B dessiné avec le seul étain doit rougir** — *c'était le défaut de la première rédaction, et il rendait la porte (b) littéralement insatisfaisable de bonne foi* ; les deux rôles échangés doivent rougir **seules** ; un rôle attaché au **métal** plutôt qu'au verdict aussi — *c'est `reactivite-metal-fixe` posée dans le code, et avec deux métaux présents le sabotage devient enfin détectable* |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; aucune flèche sur l'axe ni dans la bande ; aucune flèche dans le bécher ; aucune étiquette de rôle ; aucune lecture `sens` ni `especes` dans le DOM ; **et à S4, aucune lecture `qri` ni `expression`** — ⚠ **la sonde lit les nœuds `[data-lecture]`, JAMAIS la liste des choix** : à S4 les quatre choix *sont* des expressions, et une sonde qui les compterait rougirait sur la conception même (§7.4) | après l'engagement : la flèche, les rôles et les lectures paraissent, et l'accent avec |
| `etiquettes` | aucune étiquette n'en chevauche une autre, n'est barrée par un trait, ne recouvre le DESSIN sous une étiquette sans fond, ni ne sort du cadre — à 1 280 **et** 390 px ; **le cas obligatoire est S5**, où $Q_{r,i}$ et $K$ sont au même point **sur l'axe comme dans la bande** | deux étiquettes superposées doivent rougir ; `disposer` (pièce commune) **obligatoire ici** |
| `fuite-inter-etapes` | la porte **réécrit elle-même la table A du §7.6, dans ses DEUX colonnes** (pendant le pari / après la révélation) : `bain` absent du DOM jusqu'à la révélation de S3 ; **cran C offert seulement après la révélation de S4** (mais **affiché** pendant S4 : c'est l'état posé) ; **`oxydant` et `produit` FERMÉS pendant les paris de S3 et de S4** ; **`produit` = $2{,}5\times10^{-2}$ inatteignable avant S5** ; la **bande** absente du DOM avant S3 ; `especes` absente à S1, S2 et S4 ; `ecart` absente à S1, S3 et S5 | ouvrir `bain` dès S3, **offrir** le cran C dès S3, **laisser `produit` ouvert pendant S3** (ce qui rend l'état d'équilibre atteignable deux étapes trop tôt), ou afficher la bande dès S1 — **chacun doit rougir SEUL**. ⚠ *La règle est l'**atteignabilité**, pas la présence : « le cran C absent pendant S4 » était l'ancienne formulation, et elle était **inimplémentable** puisque l'état de S4 EST le bain C (§5.6)* |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune chaîne interdite de l'étape courante (consigne, retours, lectures, notes et région vivante confondues), et contient bien celles que l'étape emploie | écrire « étain » dans un retour de S2, ou « exposant » dans un retour de S3, doit rougir **seule** |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | un bain peint en bleu « parce que c'est du sulfate de cuivre » doit rougir **seul** |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles —
ceux qui ne sont pas encore parus sont **absents du DOM**, ceux dont le geste est fait sont
**fermés** (§5.6 point 2) ; `etat_revele` pose bien le réglage annoncé **à S2, qui est la
seule étape à en avoir un** ; **S1, S3, S4 et S5 n'en ont pas, et c'est déclaré** — *S5 en
particulier : c'est l'élève qui amène l'état, et la révélation ne doit être atteignable que
si `qri` et `k` portent la même chaîne*) · `paris` (4 choix, exactement un juste, un `retour`
par choix, rien dans la région live avant l'engagement) · **`frontiere`** (aucune des
chaînes du §9 dans le panneau ouvert, **une sonde par forme** ; les trois ensembles de
nombres du §9.10 relevés et comparés exactement ; **et l'interdit d'unité scopé aux nœuds
`[data-lecture="qri"]` et `[data-lecture="k"]`**) · **`fleches-chimiques`** (§9.11 : **toute
équation affichée porte une double flèche, aucune ne porte `\rightarrow` ni `\to` seul** —
**les TROIS formes sont énumérées** : `\rightleftharpoons`, `\rightleftarrows`, et la forme
numérotée `\underset{…}{\overset{…}{\rightleftarrows}}` avec ou sans parenthèses ; mesuré sur
le rendu KaTeX **et** sur l'annotation TeX, dans les deux sens. *Une seule forme cherchée,
c'est la cécité de l'ADR 0036 : la porte aurait rougi sur une équation écrite comme celle de
2017 N*) · `eclairs` (**attendu structurellement vide**,
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
   code, **dans sa polarité déclarée au §8.2** : au-dessus de $1$, ça recule) → **N2 seule** :
   le bain A passerait de 25 direct à 15 direct / **10 inverse** ;
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
16. afficher `qri` ou `expression` **en LECTURE** à S4 avant le pari → `avant-pari` **seule**
    *(c'est le pari lui-même ; et le contre-essai obligatoire : **les quatre CHOIX de S4, qui
    sont des expressions, ne doivent faire rougir personne** — sinon la sonde confond un choix
    et une lecture)* ;
17. **ouvrir `bain` pendant le pari de S3**, ou **offrir le cran C depuis S3** → `fuite-inter-etapes`
    **seule**. *(Réécrit : l'ancienne ligne saboyait « offrir le cran C dès S4 », ce qui
    n'était pas un défaut mais l'état posé de S4 — un sabotage qui n'atteint pas la porte sort
    en quatrième verdict AMBIGU, ADR 0038.)* ;
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

**Huit sabotages NEUFS, nés de la vague 1** *(numérotation continue)* :

24. **coller une unité à une lecture sans unité** — écrire « $Q_{r,i} = 0{,}10$ **mol/L** »
    ou « $K = 2{,}5$ **mol/L** » → **`frontiere` seule** *(fidélité M4 : rien ne l'interdisait,
    et `etat-equilibre/lesson.md:132` écrit « $Q_r$ est une grandeur **sans unité** »)* ; et le
    **contre-essai** : l'unité sur un libellé de bouton radio et dans `melange` ne doit rien
    faire rougir ;
25. **dessiner le bain B avec la seule lame d'étain** (retirer le dépôt de plomb du DOM) →
    **`becher-et-roles` seule** *(vague 1 B1)* ;
26. **resserrer ou étirer l'échelle de la bande de travail** aux bords →
    **`bande-de-travail` seule** ;
27. **faire varier la largeur de la bande avec le bain** (six décades ici, dix là) →
    **`bande-de-travail` seule** ;
28. **rapprocher artificiellement les deux marques de S3 dans la bande** jusqu'à ~5 px, comme
    le faisait l'axe d'ensemble → **`bande-de-travail` seule, à 390 px** *(c'est le défaut
    B2/I4 lui-même, mis dans le code)* ;
29. **plafonner la pastille au bord de la bande** au lieu de dessiner le chevron →
    **`bande-de-travail` seule** ; et le **contre-essai** : le chevron légitime ne doit rien
    faire rougir ;
30. **laisser `produit` ouvert pendant le pari de S3** (ce qui rend l'état d'équilibre du
    bain B atteignable dès S3) → **`fuite-inter-etapes` seule** *(la fuite que la table
    corrigée a révélée, §7.6 D)* ;
31. **écrire une équation à la manière de 2017 N**,
    `\underset{(2)}{\overset{(1)}{\rightleftarrows}}` → **rien ne doit rougir.** *C'est un
    contre-essai, et c'est le plus important des huit : une porte qui ne connaît qu'une forme
    de la double flèche rougirait ici sur un produit correct. Si elle rougit, la sonde est
    fausse, pas le produit* (ADR 0036, ADR 0034 : *un essai rouge ambigu est la moitié du
    temps la faute du test*).

**Trente et un sabotages, et chacun doit faire rougir SA famille et elle seule.**
**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). *Et trois des lignes ci-dessus (16, 29, 31) sont des
**contre-essais** : ce qui doit rester VERT. Une campagne qui n'a que des rouges ne prouve
pas que la porte distingue — elle prouve qu'elle crie.*

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
  "lectures": ["equation", "melange", "expression", "qri", "k", "ecart", "sens", "especes"]
}
```

*`melange` est la lecture neuve de la vague 1 (§5.7) : **huit lectures déclarées, jamais plus
de six à l'écran**. Les crans restent les cinq du §5.2 — ce qui change n'est pas l'ensemble
des valeurs mais **le moment où chaque cran devient atteignable**, et cela vit dans les
`etapes` du descripteur, pas dans le registre (§5.6).*

`validate-content` échoue **en dur** sur : une scène inconnue, un contrôle inconnu, un état
hors bornes, un contrôle qu'aucune étape n'ouvre, un `etat_revele` sans pari, un
`revele_apres_h > 0` sur une scène sans temps, et **un id de misconception non déclaré** dans
un pari ou dans `pedagogy_wiring`. *Le dernier point impose que **`seuil-un-au-lieu-de-k`
soit déclaré dans `items.yaml` AVANT que la scène passe la validation** — c'est un ordre de
construction, pas un détail.*

**Descripteur** — `content/pc/evolution-spontanee/media/echelle-des-quotients.json`,
`"tool": "scene2d"`, `"type": "manipulable"`, avec `title_fr`, `caption_fr`, `boundary`
(le §9 en une phrase), `fit_caveat` (les points **1 à 5** du §10), `fallback_note`,
`pedagogy_wiring` (`why_manipulable`, `predict_then_reveal`, **ONZE** ids de misconception —
*corrigé en vague 1, §8.1 : dix modèles existants touchés plus le modèle neuf*),
`spec_ref`, `adr_ref`, et les cinq `etapes` du §7.

**Ordre de construction, et il n'est pas commutatif :**

1. **item-author** déclare `seuil-un-au-lieu-de-k` dans `items.yaml` **dans la polarité
   du §8.2** et écrit ES-30, ES-31, ES-32, **ES-33** *(sans quoi `validate-content` refuse la
   scène)*. ⚠ **C'est un verrou d'ordonnancement, et la vague 1 l'a rappelé : la déclaration
   fausse serait celle qui part en production.** Le label, la `description` et les libellés
   des distracteurs doivent porter **la même polarité**, et c'est vérifiable à la lecture
   avant qu'une ligne de code existe.
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

**13.3 — 🔴 DRAPEAU ROUGE — $K = 2{,}5$ pour $Sn/Pb$ n'est pas une hypothèse de confort :
S5 n'existe que si cette valeur est exacte au chiffre près.** *(Promu de « sensibilité
déclarée » à drapeau rouge en vague 1, fidélité I2 — la première rédaction disait vrai et
trop doux, et laissait la note **non rendue**.)*

**Les chiffres, recalculés :** les deux couples sont séparés de $\approx 0{,}011$ V ; avec
$\log K = n\,\Delta E^\circ/0{,}059$, les tables usuelles donnent **$K \approx 2{,}2$**
(valeurs scolaires à deux décimales, $-0{,}13$ / $-0{,}14$) à **$K \approx 2{,}4$** (valeurs
à trois décimales, $-0{,}126$ / $-0{,}1375$). Le corpus dit **$2{,}5$** (ES-19,
`items.yaml:1090`).

**Ce qui bascule avec la valeur** — *vérifié : aucun des 25 rapports de crans ne tombe dans
$(1\,;\,2{,}5)$ ni dans $(2{,}5\,;\,4)$, donc la partition est une fonction en escalier* :

| $K$ | inverse / équilibre / direct | S5 existe-t-il ? |
|---|---|---|
| $2{,}2$ ou $2{,}4$ | **10 / 0 / 15** | **NON** |
| **$2{,}5$ (corpus)** | **9 / 1 / 15** | **oui, et un seul état** |
| $3{,}0$ | **9 / 0 / 16** | **NON** |

**Ce qui tombe si S5 tombe :** l'étape S5 entière, sa `suite`, la porte **N3**, la porte
**N10**, le cas obligatoire d'`etiquettes`, le critère « confondu à $\le 2$ px » de
`bande-de-travail`, et la conclusion du §13.6 (« *cette réduction-là est impossible* »).
**C'est la dépendance la plus structurelle de toute la scène, et elle tient à un chiffre.**

**Défaut : porter la valeur du corpus sans la corriger, la présenter comme une DONNÉE
(« $K = 2{,}5$ », §5.4), et formuler la porte N3 sur la CONSTANTE DÉCLARÉE** — de sorte
qu'un changement de valeur fasse **rougir la porte** au lieu de laisser la scène mentir
en silence.
*Pour défaire :* faire trancher la valeur par research-lead (tables officielles marocaines).
**Si la réponse n'est pas $2{,}5$, ce n'est pas un recomptage, c'est une reconception de S5**
— il faudrait alors ajouter un sixième cran de concentration choisi pour tomber exactement
sur la nouvelle valeur, ce qui change la grille, les 75 états et tous les comptages.

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

**13.7 — ~~Sept lectures à S4 ?~~ TRANCHÉ EN VAGUE 1, plus une question.** La réponse est
**six** : `especes` tombe à S4 (pédagogie M4). Sept lignes à l'étape où l'élève doit en plus
choisir une expression, c'était la ligne de trop, et les rôles sont acquis depuis S3.
**La scène est à six lectures maximum partout, et à cinq à S1** (§5.7). *Reste à vérifier en
vague 2, sur captures : à 390 px, S4 porte six lectures ET quatre libellés de formule ; c'est
l'étape à regarder.*

**13.8 — ~~`cp-r2-critere` porte une constante que sa source a corrigée.~~ RÉPARÉ, DEUX
FOIS.** `checkpoints.yaml:197` / `:210` — **commit `00a1a829`** ; `items.yaml:135` / `:142`
(le `correct_feedback` et la `solution` d'ES-1 lui-même, trouvés par la critique de fidélité)
— **commit `84fe0ac1`**. **Les deux portent aujourd'hui $K \approx 1{,}0\times10^{42}$**
(relu ligne à ligne). *Ce n'est plus une question au propriétaire ; c'est un relevé (§0.3,
§4.6).*
**Ce qui RESTE dû, et c'est la vraie question :** `checkpoints.yaml` déclare d'autres
`item_source: clone_of_*`, et **aucun n'a été relu** — ni par moi, ni par les deux critiques
(qui le déclarent toutes deux). **Défaut : une passe d'item-author sur TOUS les clones de la
campagne de conversion**, pas seulement sur celui-ci. *Le défaut avait deux nids ; rien ne
dit qu'il n'en a pas un troisième.*

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

**13.13 — NEUF (vague 1) : faut-il un quatrième contrôle pour re-mériter `solide-dans-qr` ?**
La ligne de registre est **rayée** (§8.1) parce que la scène ne fait que *ne pas nourrir* le
modèle : elle ne le contredit pas. **Il existe un moyen de le contredire vraiment, et il est
chiffré ici parce qu'un refus s'écrit à côté de son motif** (ADR 0035/0036).
*La pièce :* un contrôle `lame` à deux crans (« une lame fine » / « une lame épaisse »), qui
**change le dessin et RIEN d'autre** — `expression`, `qri`, `sens` restent identiques **au
caractère près**. Ce serait le seul endroit du corpus où « un solide pur n'entre pas dans
$Q_r$ » se **voit** au lieu de s'énoncer, et la porte serait triviale à écrire (« aux 2 crans
de `lame`, trois chaînes identiques »).
*Le coût, honnête :* **+1 contrôle** (quatre au total, contre trois partout ailleurs),
**+1 clé d'état**, **150 états** à énumérer au lieu de 75, et un réglage de plus dans une
colonne dont le §6.2 dit qu'elle ne descend jamais sous 18rem.
**Défaut : NON.** La confrontation existe déjà, bien faite, à un point d'arrêt de la même
page (`cp-r2-qr-calcul`), et la scène n'a pas à la doubler ; et **le calme de la colonne des
réglages vaut plus qu'une dixième confrontation**. *Pour défaire :* si la vague 2 juge que le
panneau a de la place, la pièce est spécifiée ci-dessus et coûte une étape de plus à la
porte, pas une reconception.

---

## 14. Fait quand

**La scène est faite quand les douze conditions suivantes sont vraies, et pas avant.**

1. `validate-content` passe : la scène est au registre, ses trois contrôles y sont, ses
   états sont dans les bornes, chaque contrôle est ouvert par au moins une étape, et
   **les ONZE ids de misconception sont déclarés** *(compte corrigé en vague 1, §8.1)*.
2. `test-quotient.mjs` est vert : les 75 $Q_{r,i}$, les 75 verdicts, **le cran unique
   d'équilibre recalculé depuis la constante DÉCLARÉE** (jamais codée en dur, §13.3),
   l'exposant structurel du bain C, **les bornes de la bande de travail aux trois bains**, et
   **l'indépendance de $K$ vis-à-vis du mélange vérifiée sur les signatures du modèle** (leçon
   du banc d'électrolyse : la façon la plus sûre de tenir « ceci ne compte pas » est
   structurelle).
3. `scene-quotient.mjs` est **VERTE trois fois de suite**, à 1 280 et à 390 px.
4. `--essai-rouge` : **chacune des 31 lignes du §11.4 fait crier sa famille, et elle seule** —
   **sauf les trois contre-essais (16, 29, 31), qui doivent rester VERTS**. Une ligne qui ne
   fait rien rougir est une sonde manquante ; un contre-essai qui rougit est une sonde fausse.
4bis. **Les deux mesures de la bande de travail sont IMPRIMÉES à 390 px** : la séparation de
   S3 ($\ge$ 16 px attendus) et celle de S5 ($\le$ 2 px attendus). *Un chiffre imprimé, pas un
   badge vert : une porte qui ne publie pas ce qu'elle a mesuré ne prouve rien.*
5. `scene-ergonomie` est verte sur la scène neuve **et sur les quatorze autres** (la pièce
   est commune ; un changement partagé se remesure partout).
6. `latex-nu` est vert, **carte fermée comprise** (leçon de la vague 2 : la carte affichait
   « $M$ », dollars compris, et la règle ne l'entendait pas).
7. La règle des liens est verte : les sept `CHEMIN À CRÉER` de l'en-tête existent, ou sont
   exemptés un par un.
8. **La prose du §4 est écrite**, et le §9 lui est appliqué comme au panneau — y compris
   au texte de cette spec, une fois recopiée sous `content/pc/evolution-spontanee/`.
9. **ES-30, ES-31, ES-32 et ES-33 existent**, et `resume-couverture.mjs` recompte
   `seuil-un-au-lieu-de-k` à **4** *(et non 3 : ES-33 lui donne sa marge, §8.3)*.
10. ✅ **La vague 1 est passée** — **FAIT le 2026-09-25** : deux critiques (pédagogie,
    fidélité bac), toutes deux **CONSTRUIRE APRÈS CORRECTIONS** ; leurs constats triés en
    « appliqué / réfuté avec la mesure / au propriétaire » — le tri est en tête de document
    (« Ce que la vague 1 a changé ») et au §16 (les réfutations).
11. **La vague 2 est passée** : dessin, calme, ergonomie, **sur des captures lues**, à
    1 280 px, 390 px et 390 px au grand texte. *Points à regarder en priorité, désignés par
    la vague 1 : **S4** (six lectures plus quatre libellés de formule), et **la bande de
    travail à 390 px**, qui est la pièce neuve non mesurée.*
12. **Les quatre chiffres d'honnêteté sont écrits dans le rapport de livraison, pas
    seulement dans cette spec** : le mélange d'habiletés **78 / 22 / 0** (§0.3), la
    **résolution de problème à 0 %** contre 35 %, le **NON-VERDICT** sur les 29 items sans
    champ `habilete`, et le **drapeau rouge sur $K = 2{,}5$** (§13.3).

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
d'une source du dépôt — et la critique de fidélité est arrivée à la même conclusion par la
même route, donc ce n'est PAS un recoupement indépendant.** Le dépôt ne porte aucune table de
potentiels standards — et c'est normal, le cadre les exclut (`:532`). **Deux calculs de tête
qui s'accordent ne font pas une source.** Les recoupements refaits à $0{,}059$
($37{,}29$ · $0{,}390$ · $15{,}59$, §5.1) confirment l'**ordre de grandeur** des trois $K$ du
corpus ; ils ne les prouvent pas. **La valeur $2{,}5$ est celle du corpus et reste la seule
autorité** — et c'est précisément pourquoi elle est un drapeau **rouge** et non une note de
bas de page (§13.3).

**15.5 — Je n'ai pas lu les 29 items ni les 24 items de `piles` en entier.** J'ai lu les
inventaires de misconceptions, les résumés de couverture, ES-19, ES-21, les trois points
d'arrêt de R2, et les extraits cités. **Une collision de stem entre ES-30/31/32 et un item
existant est donc possible et non écartée** — c'est à item-author de la lever.

**15.6 — Je n'ai pas vérifié les AUTRES clones de la campagne de conversion — et la vague 1
ne les a pas vérifiés non plus, les deux critiques le déclarent.** Le défaut de constante
avait **deux** nids, tous deux bouchés (`checkpoints.yaml:197`/`:210`, commit `00a1a829` ;
`items.yaml:135`/`:142`, commit `84fe0ac1`, §0.3). `checkpoints.yaml` déclare d'autres
`item_source: clone_of_*` ; **personne n'en a lu un seul.** *Le point qui reste vrai après
les réparations : **ce qui a cassé n'est pas une valeur, c'est le lien clone → original**.
Tant que ce lien n'est pas mesuré, un troisième nid est possible.* §13.8.

**15.7 — Le comptage « 13 figures, 0 embed » sur les quatre notions repose sur les
marqueurs de `lesson.md`, pas sur le dossier `media/`.** Un média orphelin (présent dans
`media/` et référencé nulle part) ne serait pas compté — précédent avéré :
`maths/nombres-complexes-2/media/rotation-complexe`, orpheline, trouvée par la revue de sa
notion. **Je n'ai pas fait ce croisement ici.**

**15.8 — ~~Je n'ai pas vérifié qu'il n'existe pas de `spec-extension.md`.~~ FERMÉ EN VAGUE 1,
et en faveur de la spec.** La crainte était qu'une prescription d'`[[embed:]]` existe sous
une forme que mon `rg` ne cherchait pas (`spec-extension.md`, employée par
`reactions-acido-basiques` et `chute-mouvements-plans`) — ce qui aurait fait de cette scène
le **solde d'une dette écrite** plutôt qu'une nouveauté. **Recompté : les quatre notions de
la chaîne du quotient ne contiennent, en `.md`, que leur `lesson.md` et leur REVIEW.** Aucun
`spec.md`, aucun `spec-extension.md`, aucun `spec-scene-*.md`. **Aucun `[[embed:]]` n'a jamais
été prescrit : `dette-manipulable` ne bouge effectivement pas, et `media-manipulable` monte
d'une notion.** *(Recoupé indépendamment par la critique de fidélité, M6.)*
*La leçon à garder est celle de l'ADR 0036 : ce n'est pas la chose qui a changé, c'est que je
ne l'avais cherchée que sous UNE de ses formes. La question était bonne ; c'est la recherche
qui était trop étroite.*

**15.9 — La cible d'habiletés ne sera pas plus mesurable après cette livraison
qu'avant.** `habilete` reste absent des 29 items ; les **quatre** items neufs le porteront,
ce qui donnera **4 items sur 33** avec le champ. **Ce n'est pas un début de mesure, c'est un
échantillon non représentatif** — et le déclarer maintenant évite qu'on le lise comme un
progrès. *Le seul chiffre honnêtement calculable reste celui des points d'arrêt, et il passe
de 80 / 20 / 0 à **78 / 22 / 0** contre la cible 50 / 15 / 35 (§0.3, §1).*

**15.10 — Rien de la vague 1 n'a été LANCÉ non plus.** Les deux critiques déclarent
explicitement n'avoir exécuté ni `validate-content`, ni une porte, ni un build, ni un rendu.
**Aucune assertion de pixel de ce document n'a été mesurée par qui que ce soit** — y compris
les deux nombres neufs de la bande de travail (16 px et 2 px à 390 px), qui sont des
**conséquences géométriques calculées** des dimensions du §5.5, jamais des lectures d'écran.
**Ils sont des prescriptions, et la vague 2 les mesurera.**

---

## 16. Ce que je RÉFUTE de la vague 1, avec la mesure

*Règle de la maison : un constat qu'on décline se réfute **par écrit et avec sa preuve**,
jamais par le silence. Quatre réfutations, dont trois d'attribution de preuve. **Aucune ne
renverse un BLOQUANT** : les cinq blocages restent appliqués intégralement.*

**16.1 — Fidélité B3, première moitié : « le défaut neuf n'existe pas ».** ❌ **Réfuté sur le
fond, accepté sur l'état du fichier.** Le constat dit que `checkpoints.yaml:197`/`:210`
« *portent aujourd'hui $1{,}0\times10^{42}$* » et en conclut que « *le clone A BIEN suivi son
original* » et que la spec commande une réparation inutile. **Les deux moitiés ne se
suivent pas.** Le fichier est propre **parce que ce document a signalé le défaut et que
l'orchestrateur l'a réparé entre l'écriture de la spec et sa lecture** (commit `00a1a829`).
**Le défaut a existé ; la spec l'a trouvé ; le clone n'avait pas suivi son original.** *La
critique mesurait un fichier déjà corrigé et en tirait que le constat était faux — c'est le
piège classique de la mesure après coup.* **Ce qui est accepté, et c'est la moitié utile :**
le constat était devenu **périmé** en tant que livrable, et **la critique a trouvé le second
nid, qu'aucune des deux passes précédentes n'avait vu** (`items.yaml:135`/`:142`) — réparé à
son tour (`84fe0ac1`). **Le §0.3, le §4.6 et le §13.8 sont donc réécrits en RELEVÉ de deux
défauts trouvés et réparés, pas en livrable pendant.** *Aucune des deux passes n'avait tort ;
chacune n'avait cherché qu'une des FORMES du même défaut (ADR 0036).*

**16.2 — Fidélité I5 (b) : « le libellé de réponse de l'examen est “le sens direct (1)” ».**
❌ **Réfuté — et la réfutation est exactement le constat I1 de la même critique, retourné
contre elle.** Les trois références citées à l'appui (`bank.yaml:91`, `piles/bank.yaml:780`,
`:922`) sont **de la maison, pas de l'examen** : `:91` est un `steps[].note`, `:780` et
`:922` vivent dans des blocs `reasoning:`. **Un examen national n'écrit pas ses propres
corrigés dans nos fichiers.** *C'est le même geste que celui que I1 reproche — à juste titre —
à la première rédaction de cette spec, à propos de `piles/bank.yaml:766`.*
✅ **La recommandation est néanmoins APPLIQUÉE, pour un motif qui tient :** le **numérotage
des deux sens sur la flèche** vient bien des **énoncés transcrits** — `bank.yaml:73` (2012 N,
`\underset{2}{\overset{1}{}}`) et `piles/bank.yaml:750` (2017 N, `\underset{(2)}{\overset{(1)}{}}`).
**Deux sujets sur trois** le portent ; 2011 R (`piles/bank.yaml:906`) ne le porte pas.
**La scène porte donc les repères (1)/(2) parce que deux ÉNONCÉS officiels les posent, pas
parce qu'un corrigé les emploie** (§9.11).

**16.3 — Fidélité B1 : « ES-19 écrit “après un essai précédent” précisément pour rendre le
DÉPÔT solide plausible ».** ⚠ **Réfuté sur la lecture, accepté sur le procédé — et le
BLOQUANT est appliqué en entier.** Relu : ES-19 (`items.yaml:1083-1091`) emploie la
parenthèse pour justifier la présence d'**ions $Sn^{2+}$** à l'instant initial, et **son
verdict est DIRECT** ($Q_{r,i} = 0{,}50 < 2{,}5$) — **ES-19 n'a donc jamais eu besoin de
$Pb_{(s)}$**, et il n'en met pas. *La phrase « le corpus avait été soigneux ici » est donc
trop généreuse envers le corpus.* ✅ **Mais le fond est juste et le blocage est intégralement
appliqué** : c'est le **procédé d'énoncé** d'ES-19 que la scène reprend, pour justifier cette
fois un dépôt de plomb (§5.5 C, §7.3). *Et le meilleur appui n'était pas ES-19 mais
`cp-r2-qr-calcul`, dont le retour raisonne déjà sur « **l'étain et le plomb métalliques, tous
deux solides** » (`checkpoints.yaml:145-146`) — même page, même couple, les deux solides
présents. Il est désormais cité à sa place.*

**16.4 — Pédagogie B3.3 : « attacher la ligne `qr-produits-reactifs-inverses` à ES-19
choix C, qui fait la même chose ».** ⚠ **Réfuté sur l'exemple, accepté sur la correction.**
ES-19 choix C (`items.yaml:1105`) inverse bien le quotient — mais à son mélange, le quotient
juste vaut $0{,}50$ et l'inversé $2{,}0$ : **tous deux sous $K = 2{,}5$**. **Le verdict ne
bascule pas** ; ce qui bascule est l'**espèce oxydée** (« *mais c'est le plomb qui est
oxydé* »). **L'état de la scène est strictement plus fort** : bain B,
$(1{,}0\times10^{-1}\,;\,1{,}0\times10^{-2})$ — juste $10 > K$ (inverse), inversé
$0{,}10 < K$ (**direct**) : **là, l'inversion coûte le verdict.** ✅ **Les deux corrections
demandées sont appliquées** : la ligne est ancrée sur cet état-là, et **l'appel au seuil $1$
est supprimé** (§8.1, §7.4) — c'était le défaut réel, et il était grave : la scène réfutait
une misconception **au moyen de celle qu'elle introduit**.

**16.5 — Ce que la vague 1 a MANQUÉ, et que la révision a trouvé.** *Écrit ici parce qu'une
revue qui ne se mesure pas elle-même est une rumeur.*
1. **Le compte des misconceptions était faux** : « neuf déclarés », « dix servis », dix ids
   à `pedagogy_wiring`, au-dessus d'une table de dix lignes. **Le compte juste est onze**
   (§8.1, §8.4, §12, §14).
2. **La réponse de S5 était atteignable dès S3** : `oxydant` et `produit` étaient ouverts
   pendant que l'état de S3 posait le bain B, donc l'élève pouvait poser
   $(2{,}5\times10^{-2}\,;\,1{,}0\times10^{-2})$ deux étapes trop tôt et lire
   « déjà à l'équilibre » après la révélation de S3. **Ni l'une ni l'autre des critiques ne
   l'a vu** ; c'est la table d'atteignabilité refaite pour la pédagogie I6 qui l'a fait
   apparaître (§5.6 point 3, §7.6 D). *Une correction demandée pour une raison en a révélé
   une autre — c'est la raison d'être d'une révision, pas un bonus.*
