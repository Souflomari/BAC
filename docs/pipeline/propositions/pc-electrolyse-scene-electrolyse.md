# spec — manipulable 2D `banc-electrolyse` (PC · `electrolyse`, **R4**)

**Statut : PROPOSITION (2026-09-25), non construite — RÉVISÉE après la vague 1.** Écrite
par pedagogy-architect, rangée sous `docs/pipeline/propositions/` tant qu'elle n'est pas
construite (DÉCISIONS §19 : dans le dossier d'une notion, `dette-manipulable` lit toute
spec comme une PRESCRIPTION). À la livraison, elle rejoint le dossier de la notion sous
`content/pc/electrolyse/spec-scene-electrolyse.md`, dans le commit qui livre la scène.

---

## Ce que la vague 1 a changé (2026-09-25)

Deux critiques. **Fidélité au bac :** aucune brèche d'`exclusion`, les treize citations du
cadre exactes à la ligne, tous les nombres se recalculent — douze correctifs demandés.
**Pédagogie :** « solide, pas encore enseignable » — deux BLOQUANTS et dix points.
Réponses par défaut appliquées ; **chacune reste réversible, et le §13 dit comment.**

### Appliqué

1. **LE PLACEMENT CHANGE : la scène quitte R3 pour la tête de R4** (fidélité F2 ;
   pédagogie 4 et 12, convergentes). C'est la branche « pour défaire » que l'ancien §13.2
   écrivait lui-même, prise comme **défaut**. **L'étape du seuil (ancienne S1) est
   supprimée** et le paragraphe de prose §4.3 (le cas $U = E$) avec elle. *Motif : le bloc
   du seuil n'est dans aucun `savoir_faire` (cadre l. 518-521) et sa fréquence d'examen
   mesurée est **0/31** (`REVIEW-2026-09-19.md:84-95`) ; R4 est le chapitre où
   $Q = I\,\Delta t$, $n(e^-)$ et $F$ s'enseignent — **l'écart de phase disparaît**.* Le
   §3 est re-vérifié étape par étape contre le nouveau placement. **Le distracteur
   `zero` de l'ancienne S1 et la règle de chiffrage de l'ancien §5.5 sont conservés par
   écrit comme chemin de retour (§13.1).**
2. **« à courant maintenu constant » est ajouté partout où la spec affirme que la tension
   ne décide pas de la quantité** (fidélité F1, BLOQUANT) : §2.2, §4.4 point 3, §4.6
   puce (a), le distracteur `inchangee` de S2, le distracteur `depend-de-la-tension` de
   S5, et **en tête de la `contradicts_principle` du nouveau modèle** (§8.2). *Sans ces
   mots, l'affirmation est fausse : à tension doublée sur un montage libre, le courant
   monte et le dépôt avec.*
3. **La scène DÉMONTRE désormais la thèse au lieu de l'énoncer** (pédagogie, BLOQUANT 1).
   **S5 est l'étape de l'invariance** : on double la tension du générateur pendant que le
   rhéostat tient $I$, et **la balance, la charge et le quotient ne bougent d'aucun
   chiffre**. La phrase-thèse vit dans le **retour du choix JUSTE** (un élève qui parie
   juste ne lit aucun distracteur). Ligne de porte neuve **N12** : $m$, $Q$ et $F$
   identiques **au caractère près** aux trois tensions, pour les neuf couples
   $(I ; \Delta t)$. Ce que l'élève RÈGLE et ce qui RESTE constant sont dits (§5.5) ;
   **aucune loi $I(U)$ nulle part** (§9.3).
4. **Le comptage des électrons devient un PARI** (pédagogie, BLOQUANT 2 + MAJEUR 3). La
   consigne de S4 **ne donne plus** $n(e^-) = 2m/M$ : elle donne la masse, la masse
   molaire et la demi-équation, et demande **combien de moles d'électrons ont traversé**.
   Trois distracteurs : $n(e^-) = n(Zn)$ et $n(e^-) = n(Zn)/2$ →
   `faraday-stoechiometrie-electronique` (§8.1 réclame cette ligne) ; la charge prise pour
   une quantité de matière → `faraday-calcul-unites`. **L'universalité de $F$ passe à S5,
   à sa `suite` et aux items.** Les cinq étapes deviennent : **câblage → durée → courant →
   comptage → invariance**.
5. **`formule-graduee` est rendue cohérente avec ce que chaque consigne IMPRIME**
   (pédagogie 5) : la table du §7.6 est réécrite **par étape** (consigne **et** retours),
   plus par révélation — une consigne a le droit d'imprimer ce que son propre énoncé
   exige. §2.3, §7.6 et §11.2 disent maintenant la même chose.
6. **L'inventaire est scindé** (pédagogie 6 + fidélité F5). La **forme B** (« au-dessus du
   seuil, plus on dépasse, plus c'est poussé ») est **retirée** de
   `tension-decide-la-quantite` — elle doublait `seuil-tension-continu`. La **forme D**
   devient un modèle à part entière, **`faraday-constante-universelle`**, avec ses items.
   Les choix sont re-pointés, les planchers recomptés : `tension-decide-la-quantite` **4
   items, marge 1** ; `faraday-constante-universelle` **3 items, marge 0 — déclarée**.
7. **Sept correctifs de détail.** La phrase de mécanisme (courant tenu ⇒ chaque seconde
   apporte autant que la précédente) passe dans le retour **JUSTE** de S2 (pédagogie 7) ;
   « tu peux lancer la course pour le revoir » est **retiré** de la consigne de S1
   (pédagogie 8) ; le **coût réel du repli sans JavaScript** est écrit au §13.6
   (pédagogie 9) ; le distracteur `rien` de l'étape du courant est **re-pointé** — il
   nourrissait `seuil-tension-continu`, un modèle qui porte sur le SENS, pour une erreur
   qui porte sur une QUANTITÉ ; il passe sous la forme C du modèle neuf, dont la
   `description` le nomme explicitement (pédagogie 10, dit au §8.1) ; le §7.6 gagne une
   table qui **relit chaque `retour` contre le pari SUIVANT** — et elle a trouvé une
   fuite réelle (pédagogie 11, voir ci-dessous).
8. **Cinq correctifs d'items** (fidélité). **F3** — ELECTROLYSE-27 devient l'item
   d'**application expérimentale** : trois essais (270 C → 0,091 g ; 540 C → 0,183 g ;
   2 160 C → 0,732 g), lequel donne le $F$ le plus fiable et pourquoi. **F6** —
   ELECTROLYSE-25 gagne « *un rhéostat placé en série permet de maintenir l'intensité à
   $I = 0{,}50$ A dans les deux essais* ». **F7** — ELECTROLYSE-26 cherche désormais une
   **durée** ($I' = 0{,}400$ A ⇒ $\Delta t' = 1\,350$ s $= 22{,}5$ min). **F9** — le
   distracteur D de ELECTROLYSE-25 dit « davantage d'énergie électrique », plus « trois
   fois plus ». **F10** — les nombres sont retirés du distracteur B de ELECTROLYSE-26
   (« Doubler la tension du générateur »).
9. **Quatre correctifs de montage et de déclaration** (fidélité). **F4** — les lames
   portent « **(A)** » et « **(B)** » à côté de leur nom, et une phrase **rendue** du
   `fit_caveat` dit que les sujets dessinent le plus souvent **un seul récipient (tube
   en U)** avec deux électrodes dans la même solution. **F8** — les trois tensions
   ($2{,}0$ · $6{,}0$ · $12{,}0$ V) sont **déclarées au §9.16** et la porte relève
   `volt|volts` en plus de `V`. **F11** — une puce au §0.3 : l'**avancement**, listé par
   le savoir-faire (cadre l. 521), n'est enseigné nulle part (`grep` « avancement » sur la
   notion ⇒ **1 seule ligne, un commentaire de `bank.yaml:123` qui parle d'une AUTRE
   notion**) et la scène **ne l'ouvre pas** : reste dû. **F12** — §0.3 déclare qu'**aucun
   verdict sur le mélange d'habiletés n'est possible** sur cette notion (non-verdict
   déclaré, ADR 0034).

**Ce que la nouvelle table du §7.6 a trouvé, et qui était une vraie fuite.** Le retour du
distracteur `quadruple` de l'étape de la durée se terminait par « *par exemple 1 h 30 avec
**deux fois plus de courant**, ce que tu pourras essayer à l'étape suivante* » — il
donnait le sens de variation du pari de l'étape du courant, une étape avant qu'il soit
posé. **Phrase supprimée.** C'est la cinquième forme de la fuite (ADR 0036, après
l'affichage, le réglage ouvert, la donnée et la relation) : **le retour d'une étape qui
annonce la suivante**, et elle ne se voit qu'en relisant les textes les uns contre les
autres. §7.6, table B.

### NON appliqué, et pourquoi

- **Rien de ce que les deux critiques ont demandé de garder n'a bougé** : la règle de
  chiffrage (§5.5, réécrite pour le nouveau montage mais **de même nature**), l'arbitrage
  du milligramme et l'écart de $9{,}70\times10^{4}$ gardé **comme un nombre** (§5.8, §11.1
  N6, §11.4 sabotage 7), « retiens le mécanisme, pas le résultat » (S1), la structure de
  graduation du §2.3, le §15 entier, le rôle d'ELECTROLYSE-27, et la liste de formes
  interdites du §9 — ajustée **seulement** pour le changement de rung.
- **La suppression de l'étape du seuil ne s'accompagne PAS d'un retrait dans R3.** La
  REVIEW demande de « réduire et redistribuer » le chapitre 4 ; la scène s'en va, elle ne
  le coupe pas. *Motif : un retrait de contenu est une décision de propriétaire, pas un
  effet de bord d'une scène. La part de `seuil-tension-continu` dans la
  couverture-distracteur passe tout de même de $7/24 = 29{,}2\%$ à $8/29 = 27{,}6\%$.*
  **Reste dû** (§13.2).
- **Le distracteur « le courant nul à $U = E$ » n'est pas recasé ailleurs.** Il était le
  meilleur de l'ancienne S1, et c'est le seul fait du chapitre 4 que la leçon n'écrit
  nulle part (`items.yaml:770-776` le porte seul). **Il sort de la scène avec son
  étape** ; le §13.1 dit exactement comment le faire revenir, et **la prose du §4.3
  supprimé reste rédigée là, prête à poser** si le propriétaire préfère garder le seuil
  dans la scène.
- **Aucun item n'est retiré.** Les trois modèles à marge nulle
  (`electrolyse-source-energie`, `sens-courant-electrons`, `bilan-matiere-electrodes`)
  restent à trois items ; le scindement en ajoute un quatrième à marge nulle
  (`faraday-constante-universelle`). *Motif : `items.yaml:1499-1502` prévient que tout
  retrait casse un plancher, et cette livraison n'en retire aucun.*
- **Le champ `habilete` n'est toujours pas ajouté** (fidélité F12) : c'est
  `DECISIONS-EN-ATTENTE` §3, et cela se tranche pour les 62 notions à la fois. La
  conséquence est **déclarée** au §0.3 comme un non-verdict, pas maquillée.

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/pc/electrolyse/media/banc-electrolyse.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/pc/electrolyse/spec-scene-electrolyse.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/electrolyse-modele.ts — le modèle (frontend-builder) : la charge, les deux masses, le comptage des électrons, la mesure de F
    CHEMIN À CRÉER: web/src/lib/scene2d/electrolyse-rendu.ts — le rendu 2D (frontend-builder) : les deux béchers, le pont salin, le générateur, le rhéostat, les deux lames, les instruments
    CHEMIN À CRÉER: web/src/components/notion/scene/ElectrolysePanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-electrolyse.mjs — le test unitaire du modèle
    CHEMIN À CRÉER: web/scripts/scene-electrolyse.mjs — la porte de la scène (+ son `--essai-rouge`)

**Ce que ce document est.** Le cadrage pédagogique complet du **treizième** manipulable de
première partie et du **septième PLAN** (ADR 0041, `"tool": "scene2d"`, mêmes pièces que
la cuve, la corde, les noyaux, le banc de diffraction, le tremplin et le banc de
modulation) : sa justification mesurée, sa frontière officielle, son placement, ses cinq
étapes à pari, ses contrôles, ses lectures avec leurs unités et leur précision, la table
de ce qui ne doit pas être à l'écran avant chaque pari, les lignes d'honnêteté, **deux**
modèles de misconception neufs avec leurs cinq items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose
finale, ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu,
le panneau et le registre de frontend-builder ; les items d'item-author. Le §4 **décrit**
les paragraphes à écrire ; il ne les rédige pas.

Marqueur : `[[embed:banc-electrolyse]]` · clé de registre : `banc-electrolyse` ·
sélecteur de porte : `[data-scene="banc-electrolyse"]`.

**Numérotation des chapitres, mesurée avant d'écrire.** `REVIEW-2026-09-19.md:3` :
« *7 titres `## `, ch.1 = R0 … ch.7 = R6* ». Donc **R3 = chapitre 4** et **R4 =
chapitre 5**, et c'est la numérotation qu'emploient déjà les renvois internes de la notion
(`lesson.md:243` « *le mécanisme calculé au chapitre 5* » désigne R4 ;
`checkpoints.yaml:98` « *tu le verras au chapitre 4* » désigne R3). **Toute prose
commandée ici emploie cette numérotation-là**, jamais « R3 » ni « R4 ».

---

## 0. Pourquoi cette notion maintenant — la mesure, et l'objection écrite qui existe

**Aucune spec antérieure n'a pesé `pc/electrolyse`**, ni comme gagnante ni comme dauphine
(`grep -ri "electrolyse\|électrolyse" docs/pipeline/propositions/
content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md` ⇒ **0**). Cette
proposition doit donc se justifier **entièrement** par un trou **mesuré** — même règle
qu'au banc de diffraction (son §0) et qu'à la corde.

`content/pc/electrolyse/` **ne porte aucun `spec.md`** (contenu du dossier : `lesson.md`,
`items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`, `REVIEW-2026-09-19.md`,
`media/`). Aucune spec n'y a jamais prescrit d'`[[embed:]]` :
`grep -rc '\[\[embed:' content/pc/electrolyse/` ⇒ **0**. **Cette scène ne solde donc
aucune dette écrite** : `dette-manipulable` ne bouge pas, `media-manipulable` monte d'une
notion.

### 0.1 Les cinq faits, chacun avec la commande qui le produit

| # | le fait | la commande qui le produit |
|---|---|---|
| **a** | **Le TP du cadre est couvert à 0 %.** Le cadre liste, pour ce sous-domaine, « *Électrolyse en solution aqueuse → réaliser des transformations forcées ; **déterminer la constante de Faraday*** » (`docs/cadre/curriculum/pc-physique-chimie.yaml:529`). La chaîne « déterminer la constante de Faraday » n'apparaît **nulle part** dans la notion — sauf dans la REVIEW qui la signale comme trou. $F$ est **donnée** partout où elle sert : `bank.yaml:193`, `:1087`, `:1343`, `lesson.md:155`, et dans le `stem` de chacun des six items qui l'emploient. | `grep -rn "déterminer la constante de Faraday" content/pc/electrolyse/` ⇒ **1 seule ligne, `REVIEW-2026-09-19.md:104`** |
| **b** | **Aucun des 24 items ne déclare son `habilete`.** Le mélange 50 / 15 / 35 du cadre est donc **incalculable** sur la couche qui porte le volume. Les **5** points d'arrêt en portent un (4 `utilisation`, 1 `application`) — c'est tout ce que la notion sait d'elle-même. | `grep -c habilete content/pc/electrolyse/items.yaml` ⇒ **0** ; `grep -c habilete content/pc/electrolyse/checkpoints.yaml` ⇒ **5** |
| **c** | **Les trois médias de la notion sont FIGÉS**, et aucun n'a de réglage : `cellule-electrolyse` (4 étapes), `seuil-tension-electrolyse` (3 étapes), `electrolyse-eau-cellule`. Aucun ne montre une grandeur qui **change** quand on touche quelque chose, **aucun ne porte un nombre**, aucun ne porte une **durée**, aucun ne porte une **masse**. | `ls content/pc/electrolyse/media/` ⇒ **3 SVG + 3 `.stages.json`, 0 descripteur de manipulable** |
| **d** | **R4 (chapitre 5) enseigne la chaîne de Faraday en UN exemple et dans UN seul sens.** `lesson.md:165-181` : un couple $(I ; \Delta t)$, une masse. **Ni $I$ ni $\Delta t$ n'y varient jamais** — donc rien, dans toute la notion, ne montre que c'est leur **produit** qui décide. | `grep -n "0,200\|200 mA\|5400" content/pc/electrolyse/lesson.md` ⇒ `:167` seulement |
| **e** | **La chaîne de Faraday n'est enseignée que dans le sens direct**, et quatre questions réelles — dont **l'exercice sommet** — l'exigent à l'envers (REVIEW l. 97-102). | `REVIEW-2026-09-19.md:97-102`, recoupé par `bank.yaml:311` (2019 N : $m \rightarrow \Delta t$) et `bank.yaml:649` (2022 R : $m \rightarrow \Delta t$) |

### 0.2 L'objection écrite — et le placement la désamorce au lieu de lui répondre

Elle est dans la notion elle-même, adressée au propriétaire
(`REVIEW-2026-09-19.md:84-95`) :

> « **Le chapitre du seuil de tension n'est dans aucun `savoir_faire`, et sa fréquence
> d'examen mesurée est 0/31.** […] Or ce contenu consomme un chapitre sur sept, un asset
> média sur trois, 3 items sur 24, et **29 % de la couverture-distracteur du banc**. […]
> C'est un arbitrage : réduire et redistribuer vers les savoir-faire réellement listés, ou
> garder en le déclarant hors-cadre. Ne pas laisser l'état actuel non déclaré. »

**Je l'ai recomptée moi-même, et elle est juste.** `items.yaml:1476` :
`seuil-tension-continu: { count: 7 }` sur `total_items: 24` ⇒ $7/24 = 0{,}2917$ →
**29 %** ✓. Et `primary_misconception` vaut `seuil-tension-continu` sur exactement trois
items (ELECTROLYSE-12, 13, 14) ⇒ **3 sur 24** ✓.

**La première version de cette spec posait la scène en tête de R3 et lui donnait une étape
de seuil.** La vague 1 l'a refusée des deux côtés à la fois — fidélité F2 (« on arme un
bloc hors savoir-faire »), pédagogie 4 et 12 (« l'écart de phase : quatre étapes sur cinq
enseignent le chapitre suivant »). **La scène part donc en tête de R4, et l'étape du seuil
disparaît.** Trois conséquences, toutes mesurées :

1. **Les cinq étapes servent désormais les `savoir_faire` listés, sans exception** (cadre
   l. 518-521) : reconnaître anode et cathode connaissant le sens imposé (S1), établir la
   relation entre quantités de matière, intensité et durée (S2, S3, S4), et le **TP à 0 %**
   (S5).
2. **L'écart de phase disparaît.** À la tête de R4, l'élève a lu le mécanisme (ch. 2), la
   polarité (ch. 3) et le seuil (ch. 4) ; il n'a lu ni $Q = I\,\Delta t = n(e^-)F$, ni les
   gaz. La scène pose exactement les questions du chapitre **où elle est**.
3. **Le déséquilibre que la REVIEW signale baisse un peu, et ne se referme pas.** La part
   de `seuil-tension-continu` passe de $7/24 = 29{,}2\%$ à $8/29 = 27{,}6\%$ (§8.3) —
   **1,6 point**. La redistribution demandée est un **retrait** de contenu ; cette
   livraison n'en fait aucun. **Reste dû** (§13.2).

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- **Le champ `habilete`** reste absent des 24 items, et des 5 items neufs
  (`DECISIONS-EN-ATTENTE` §3). **Non tranché ici** (§13.10).
- **Aucun verdict sur le mélange d'habiletés n'est possible sur cette notion, et c'est un
  NON-VERDICT déclaré, pas un vert** (ADR 0034). La cible du sous-domaine est
  **utilisation 5,0 % / application expérimentale 1,5 % / résolution 3,5 %** (§1) ; sur la
  couche qui porte le volume, le champ n'existe pas, donc **le rapport n'est pas
  calculable — ni avant, ni après cette livraison**. Tout ce qu'on peut dire à la lecture :
  ELECTROLYSE-27 (trois essais à comparer, §8.4) est le seul des cinq items neufs qui
  ressemble à une **application expérimentale**, et personne ne peut le mesurer.
- **L'AVANCEMENT est listé par le savoir-faire et enseigné nulle part.** Le cadre écrit
  « *l'utiliser pour déterminer d'autres grandeurs (**avancement**, variation de masse,
  volume de gaz)* » (`pc-physique-chimie.yaml:521`). `grep -rn "avancement"
  content/pc/electrolyse/` ⇒ **une seule ligne, `bank.yaml:123`, un commentaire d'auteur
  qui parle d'une AUTRE notion**. **La scène ne l'ouvre pas** — elle compte des masses et
  des électrons, jamais un avancement. **Reste dû**, et c'est de la prose et des items.
- **La redistribution du chapitre du seuil** (REVIEW, « pour le propriétaire ») reste
  **entière** : aucune ligne de R3 n'est retirée par cette proposition, et la scène n'y
  est plus.
- **La chaîne de Faraday vers une DURÉE** ($m \rightarrow \Delta t$) est entamée par
  ELECTROLYSE-26 (§8.4) mais **aucune étape de scène ne la demande**. **Reste dû.**
- **Les gaz** (R5, $V = n\,V_m$) sont **hors scène** (§9.7) : la scène dépose un métal. Or
  **cinq entrées de banque sur neuf demandent un volume de gaz**. **Reste dû**, et c'est un
  travail de prose et d'items, pas de scène.
- **Le recoupement `bk-2019-n-x1` / `r-bac`** (en-tête de `bank.yaml`, l. 21-31) reste
  ouvert : la scène ne le touche pas.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** chimie → **`sens_evolution`** →
  **`transformations_forcees`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 514-525).
- **Poids :** `poids: { part_examen: 10, rang_chimie: 1 }` (cadre p. 18, YAML l. 485) —
  **premier sous-domaine de la chimie, à égalité**. **Habiletés du sous-domaine** (YAML
  l. 486-489, le 50 / 15 / 35 de l'examen appliqué aux 10 %) : **utilisation des ressources
  5,0 %**, **application expérimentale 1,5 %**, **résolution de problème 3,5 %**. *C'est la
  cible chiffrée de l'item-author et le nombre que le critique de fidélité doit mesurer —
  et elle est **incalculable** sur les 24 items (§0.3, non-verdict déclaré).*
- **`competences_ciblees` du sous-domaine** (cadre p. 29, YAML l. 491) : « Utiliser le
  critère d'évolution pour déterminer le sens spontané et récupérer de l'énergie
  électrique (oxydo-réduction) ; **analyser une transformation forcée et appliquer
  l'électrolyse** (charger des accumulateurs, purifier les métaux, protéger de la
  rouille). »
- **`programme` du chapitre** (cadre p. 24, YAML l. 517), cité entier :
  > « **Mise en évidence de l'inversion du sens d'évolution par un courant imposé**
  > (transformation forcée) ; réactions aux électrodes (anode/cathode) ; application à
  > l'électrolyse (principe, applications courantes et industrielles). »

  Noter les trois mots qui décident du placement (§3) : *mise en évidence*, *par un
  **courant** imposé*. Le programme parle d'un **courant**, jamais d'une tension seuil —
  et c'est la première raison, dans le cadre lui-même, pour laquelle la scène a quitté R3.
- **Les trois `savoir_faire` du chapitre** (cadre p. 16, YAML l. 518-521), et ce que chaque
  étape en sert :
  1. « Savoir qu'une électrolyse est une transformation forcée ; **reconnaître anode
     (oxydation) et cathode (réduction) connaissant le sens du courant imposé**. » →
     **S1**.
  2. « Schématiser le montage d'électrolyse ; écrire les réactions aux électrodes
     (**double flèche**) et l'équation bilan (**simple flèche**). » → **S1** (le montage est
     la scène ; les demi-équations sont posées, avec leur double flèche, par les retours).
     *La convention de flèche est un savoir-faire imprimé, et la notion l'a déjà payée cher :
     33 sites corrigés, `REVIEW-2026-09-19.md:8-36`. La scène l'applique au caractère près
     (§9.17).*
  3. « **Établir la relation entre quantités de matière, intensité et durée de
     l'électrolyse** ; l'utiliser pour déterminer d'autres grandeurs (avancement, variation
     de masse, volume de gaz). » → **S2, S3, S4, S5**. *L'« avancement » de cette ligne
     n'est pas servi : §0.3.*
- **`travaux_pratiques` du sous-domaine** (cadre p. 28, YAML l. 527-529) :
  > « Électrolyse en solution aqueuse → réaliser des transformations forcées ;
  > **déterminer la constante de Faraday**. »

  **Couverture actuelle : 0 %** (§0.1 a). **La scène n'est pas un TP et ne le prétend
  jamais** (§10.4) — elle en répète le **geste** : peser, compter les électrons par la
  demi-équation, diviser la charge.
- **`limites` portées en dur** (YAML l. 522-525, `source: derived`) :
  > 1. « **Piles : couples ion métallique/métal Mⁿ⁺/M(s) ; f.é.m MESURÉE
  >    expérimentalement. Pas de potentiels standards E°, pas de relation de Nernst, pas de
  >    calcul de f.é.m à partir des potentiels.** »
  > 2. « Critère d'évolution via Qr vs K uniquement ; pas d'enthalpie libre ΔG ni
  >    d'approche thermodynamique. »
  > 3. « **Aspect quantitatif via Q = I·t et la constante de Faraday.** »

  **Trois conséquences non négociables :**
  1. **La f.é.m. propre de la cellule est une grandeur MESURÉE, jamais calculée.** La scène
     l'affiche comme une **lecture de voltmètre, générateur débranché** (§5.4) — c'est un
     acquis du chapitre 4, rappelé, jamais interrogé. Tout chemin qui passerait par des
     $E^\circ$ est fermé (§9.1).
  2. **L'aspect quantitatif est $Q = I\,t$ et $F$, et rien d'autre.** Pas d'énergie
     chiffrée, pas de rendement faradique (§9.4, §9.6).
  3. **Aucun modèle de courant en fonction de la tension.** Le cadre ne pose aucune relation
     $I(U)$ pour une cellule électrolytique, aucun sujet n'en donne, et la leçon n'en écrit
     pas. **Le banc tient donc le courant au rhéostat, et l'ampèremètre affiche la même
     valeur aux trois tensions** (§5.5) — c'est la décision de conception la plus lourde de
     cette scène, et c'est elle qui rend la démonstration de S5 honnête. La porte la garde
     (§9.3, §11.1 N8 et N12).
- **`exclusions` du sous-domaine portées en dur** (YAML l. 531-535, `source: derived`) :
  **potentiels standards d'électrode $E^\circ$, électrode standard à hydrogène, échelle des
  potentiels** · **relation de Nernst** · **enthalpie libre $\Delta G$** · **aspects
  thermodynamiques (entropie, enthalpie)**. Les quatre mordent ici et vivent au §9.
- **Une garde de périmètre déjà écrite dans la notion, et elle va plus loin que le cadre**
  (`checkpoints.yaml:37-41`) : « *Pas de potentiels standard, **pas de cinétique
  électrochimique, pas de surtension**.* » **Portée en dur au §9.2.** *C'est la maison qui
  se l'est écrite ; la scène la respecte et la porte la mesure.*
- **La frontière qui mord le plus fort est INTERNE, et elle est double.**
  1. **Le rang dans la leçon.** La scène est en tête de **R4** (chapitre 5). À cet endroit,
     l'élève a lu R0 (l'inversion observée), R1 (le mécanisme), R2 (la polarité inversée) et
     **R3 (le seuil de tension)** — et rien d'autre. Il n'a lu ni
     $Q = I\,\Delta t = n(e^-)\,F$, ni les gaz et le volume molaire (R5, chapitre 6). La
     scène **peut** poser les questions de R4 (elle vient avant la prose qui explique,
     ADR 0041 §6) ; elle **ne peut pas** entrer dans R5 : pas de gaz, pas de $V_m$, pas de
     galvanoplastie nommée, pas d'aluminium (§9.7, §9.8).
  2. **Le seuil est désormais un ACQUIS, pas un objet.** La consigne de S1 le **déclare**
     en une phrase (« le générateur est réglé au-dessus du seuil de la cellule, comme le
     chapitre 4 vient de l'établir ») et **n'y revient jamais** ; les trois tensions de la
     scène sont **toutes au-dessus** de $E \approx 1{,}1$ V (§5.3). *La scène ne
     ré-enseigne pas le chapitre précédent ; elle s'appuie dessus.*

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les trois médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `cellule-electrolyse` (4 étapes) | **R2** | la cellule nue ; le générateur qui impose le sens ; la conséquence (borne − ⇒ cathode) ; la migration des ions | **rien ne varie** : un seul câblage, aucune durée, aucun nombre. Ses quatre légendes (`*.stages.json`) ne portent **aucune valeur numérique** |
| `seuil-tension-electrolyse` (3 étapes) | **R3** | le seuil $E \approx 1{,}1$ V ; $U = 0{,}9$ V ; $U = 6$ V | rien ne bouge, aucune masse, aucune durée — et la scène **ne le double plus** (§0.2) |
| `electrolyse-eau-cellule` | R5 | la cellule à électrodes inertes, $H_2$ et $O_2$ | hors sujet ici (§9.7) |

**Le constat, et il est exact :** **aucun des trois médias ne porte une masse, une durée
ou une intensité** — c'est-à-dire aucune des trois grandeurs du seul savoir-faire
quantitatif du chapitre (cadre l. 521). Le chapitre 5 les enseigne **en un exemple, à un
seul réglage** (`lesson.md:167`), et rien ne les fait varier nulle part.

### 2.2 Le motif central : DEUX boutons, DEUX rôles, et la leçon n'en sépare jamais les rôles

Le point que la scène existe pour installer, en une phrase — **et les quatre mots en gras
sont la condition sans laquelle elle est fausse** :

> La tension décide **si** la transformation forcée a lieu, et dans quel sens. **À courant
> maintenu constant**, la charge $Q = I\,\Delta t$ décide de **combien**. Ce sont deux
> questions différentes, réglées par deux boutons différents, et
> $m = \dfrac{M\,I\,\Delta t}{z\,F}$ **ne contient aucune tension**.

**La condition n'est pas une précaution d'auteur : c'est ce que les sujets écrivent.**
Cinq entrées de banque sur neuf posent « *un courant électrique d'**intensité
constante*** » (`bank.yaml:311`, `:649`, `:823`, `:1091`, `:1404`). Sur un montage libre,
doubler la tension **ferait** monter le courant, donc le dépôt ; ce que la scène montre,
c'est le montage du TP et du sujet — **rhéostat en série, intensité tenue** — et elle le
dit à chaque fois (§5.5). *Sans ces mots, l'affirmation centrale de la scène serait un
contresens de physique (fidélité F1, BLOQUANT de la vague 1).*

**La leçon pose les deux moitiés et ne les oppose jamais.** R3 (chapitre 4) traite le
seuil, R4 (chapitre 5) traite la charge, et **aucune phrase du corpus ne dit qu'une fois le
seuil franchi, à courant maintenu, la tension ne figure plus dans le calcul**
(`grep -n "tension" content/pc/electrolyse/lesson.md` ⇒ 6 occurrences, toutes dans R0 et
R3, **aucune dans R4**). Un élève sort du chapitre 4 avec « il faut beaucoup de volts »
et, à la page suivante, calcule une masse sans jamais avoir su ce que les volts y font.
**C'est le modèle de misconception du §8.2**, et il est **structurellement invisible** dans
le corpus actuel : les 24 items et les 31 questions de banque donnent tous $I$ et
$\Delta t$, jamais $U$ — **un élève qui croit que $U$ décide de la quantité répond juste
partout**.

**Aucune figure ne peut le montrer**, parce que le fait à montrer est *qu'un bouton qu'on
tourne ne change rien au nombre qui compte*. Il faut **deux réglages, un chronomètre et une
balance**, et **voir la balance rester immobile pendant qu'on double la tension** (S5).
C'est le critère du §1 de l'ADR 0041 rempli sans relief : l'idée est **causale et
temporelle** — deux commandes, deux effets disjoints, et une durée qui s'écoule.

### 2.3 L'antidote obligatoire : une chaîne construite en CINQ temps

$F = \dfrac{Q}{n(e^-)} = \dfrac{I\,\Delta t}{z\,m/M}$ contient quatre réponses ; un retour
trop bavard les donne toutes d'un coup. Même discipline qu'au banc de diffraction (sa
§2.3, sa règle `formule-graduee` ; ADR 0041, addendum de la nuit du 2026-09-24 : *la
relation est un ÉTAT qui fuit*) — **et la vague 1 a corrigé le découpage : la frontière se
pose ÉTAPE PAR ÉTAPE (consigne ET retours), pas à la révélation**, parce qu'une consigne a
le droit d'imprimer ce que son propre énoncé exige (pédagogie 5).

- **S1** établit que le **nom** de l'électrode suit la **borne** : anode, cathode,
  oxydation, réduction, les deux demi-équations. **Aucune quantité** : ni masse, ni durée,
  ni intensité, ni charge.
- **S2** ajoute la **durée** : le retour écrit « *à courant maintenu, la masse déposée est
  proportionnelle à la durée* ». Il ne peut pas écrire le produit.
- **S3** ajoute l'**intensité**, donc le **produit** : le retour écrit enfin
  $Q = I\,\Delta t$ **entière**, avec son unité, et les deux couples de même charge. Il ne
  peut pas compter d'électrons.
- **S4** ajoute le **comptage** : $n(e^-) = z\,\dfrac{m}{M}$, avec la mole. Il ne peut pas
  écrire $F$ ni sa valeur.
- **S5** ajoute la **constante** : $F = \dfrac{Q}{n(e^-)}$, sa valeur, son nom, son
  universalité — et l'**invariance en tension**, qui est la thèse de toute la scène.

**Contrainte non négociable et mesurable** (table exacte au §7.6 B, mesurée au §11.2
`formule-graduee`) : `masse` et `g` n'apparaissent pas pendant S1 ; `I\Delta t`, `Q =`,
`charge`, `coulomb` pas avant S3 ; `n(e^-)`, `mol` pas avant S4 ; `F`, `\mathcal{F}`,
`Faraday`, `9,65`, `C·mol` pas avant S5. La porte le lit dans le `textContent` **rendu**,
annotations TeX de KaTeX comprises.

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

Neuf entrées de banque, toutes vérifiées, et **trois gestes** que rien n'exerce :

| geste | où le bac le demande | ce que le corpus en fait |
|---|---|---|
| **Lire la polarité sur le schéma plutôt que la deviner** | `bk-2015-n-x1b` q1 : le `+` est à **GAUCHE** du cercle du générateur (`bank.yaml:786`, topologie du fil « *tracée ligne par ligne, pas devinée* », `:764-766`). Même disposition en 2019 N (`bank.yaml:288`) et en 2023 R (`bank.yaml:507-509`). Le piège est nommé : « *Deviner la polarité au lieu de la lire […] rien n'oblige la borne $+$ à être à droite ou à gauche par convention* » (`bank.yaml:799`) | la leçon ne dessine **jamais** un générateur dont la borne $+$ est à gauche, et **ne change jamais un câblage** : le tableau de R2 (`lesson.md:105-111`) garde le zinc sur la borne − dans ses deux colonnes |
| **Nommer les électrodes SANS polarité donnée, par l'observation** | **trois entrées sur neuf** : `bk-2022-r-x1` (« *Cette question ne fournit ni figure ni polarité de générateur* », `bank.yaml:663`), `bk-2022-n-x1` (`bank.yaml:1365`), `bk-2012-r-x1` (`bank.yaml:1107`) | R1 fait observation → nom (`lesson.md:61-65`), R2 fait nom → polarité (`lesson.md:101`) ; **aucun paragraphe ne fait le trajet entier**, et aucune figure ne le fait faire |
| **Déterminer $F$ par la mesure** | le **TP du cadre** (l. 529) | **0 %** (§0.1 a) |

**Le geste que rien n'exerce, et que la scène rend :** régler, mesurer, peser, **compter
les électrons par la demi-équation**, et **remonter** de la balance à la constante —
c'est-à-dire parcourir la chaîne de Faraday dans le sens où le corpus ne la parcourt
jamais.

### 2.5 Ce que la scène NE double pas

- **`rc-sandbox` / `rlc-sandbox`** (électricité) manipulent un courant qui **varie** ; ici
  le courant est **tenu constant**, comme dans les neuf sujets. Aucun recouvrement.
- **`cuve-a-ondes`, `banc-de-diffraction`, `banc-de-modulation`** : autres domaines.
- **`courbe-et-noyaux`** porte, comme celle-ci, une **loi de comptage**
  ($N = N_0e^{-\lambda t}$ contre $n(e^-) = Q/F$) — mais la sienne est **statistique** et la
  scène y tire au sort. **Ici tout est analytique** : la porte refait donc les **nombres**,
  pas des invariants (règle de la corde, ADR 0041).

### 2.6 Trois idées volontairement écartées

- **L'étape du seuil, ÉCARTÉE par la vague 1 et par le cadre.** Elle occupait l'ancienne
  S1 ; elle sort avec le changement de placement (§0.2). *Le `suite` qui faisait trouver le
  **courant nul à $U = E$** — le seul fait du chapitre 4 que la leçon n'écrit nulle part —
  sort avec elle. C'est la perte la plus nette de cette révision, elle est écrite, et le
  §13.1 dit comment la reprendre.*
- **L'électrolyse de l'eau et ses deux gaz, ÉCARTÉE par le rang.** C'est R5 (chapitre 6),
  après ; et le rapport $2{:}1$ y est le plus bel invariant de la notion. Une étape qui
  recueillerait $H_2$ et $O_2$ enseignerait un chapitre plus loin. **Chaînes interdites au
  §9.7.** *§13.5 propose une sixième étape, placée dans R5, en extension.*
- **Un graphe $m = f(\Delta t)$ ou $m = f(Q)$, ÉCARTÉ faute d'enseignement de la lecture de
  pente.** La notion n'enseigne nulle part la lecture d'une pente
  (`grep -rn "pente" content/pc/electrolyse/` ⇒ **0**). Une scène ne doit pas exercer un
  geste que la leçon n'a pas posé. **La scène n'a aucun graphe** (§9.12), et l'invariant se
  lit en **produit** ($I \times \Delta t$) et en **égalité de masses affichées**, comme au
  banc de diffraction. *§13.7.*

---

## 3. Placement

**En tête de `## R4 — La quantité d'électricité : $Q = I\,\Delta t = n(e^-)\,F$, réutilisée
à l'envers`** (`lesson.md:143`), entre le titre et `### La même loi, un sens inversé`
(`lesson.md:145`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:banc-electrolyse]]
```

précédée du paragraphe d'annonce neutre du §4.1.

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose qui
explique*). Vérification étape par étape, **refaite pour le nouveau placement**, contre le
texte **déjà lu** au marqueur (`lesson.md:1-141`, soit R0 à R3 en entier) :

| étape | la prose (ou le point d'arrêt) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| **S1** — on échange les deux fils | R2 donne la règle « anode = borne + » (`:87`) et l'applique une fois (`:101`) ; **mais aucun texte ne change un câblage**, et le tableau de `:105-111` garde le zinc sur la borne − dans ses **deux** colonnes | R2, avant | ⚠️ **dérivable, jamais montré — écrit franchement ci-dessous** |
| **S2** — deux fois plus longtemps | l'exemple travaillé de R4, `lesson.md:167-179` | R4 — **APRÈS** le marqueur | ❌ non |
| **S3** — deux fois moins de courant | rien : **aucun exemple du corpus ne fait varier $I$** (`grep` sur les 9 entrées et sur la leçon : $I$ est toujours une donnée unique, §0.1 d) | — | ❌ non |
| **S4** — combien de moles d'électrons ? | $Q = n(e^-)\,F$ à `lesson.md:151-157` et $n(Zn) = n(e^-)/2$ à `:173-175` | R4 — **APRÈS** | ⚠️ **partiellement — voir ci-dessous** |
| **S5** — on double la tension, à courant tenu | **nulle part**, dans toute la notion (§2.2) | — | ❌ non |

**Trois tensions réelles, écrites plutôt que maquillées.**

1. **S1 est DÉRIVABLE de R2, et c'est assumé.** Un élève qui a bien lu « *l'anode est la
   borne +* » (`:87`) peut en déduire ce qui arrive au zinc quand la borne + l'alimente.
   **Ce que S1 attrape n'est pas la règle, c'est ce que le tableau de R2 encourage sans le
   vouloir** : ses deux colonnes gardent le zinc du côté de la borne −, et sa dernière
   phrase (`:111`) insiste — « *le zinc reste, dans les deux cas, relié physiquement à la
   borne −* ». Un élève en sort avec « le zinc est du côté du moins », c'est-à-dire avec
   **le rôle attaché au métal**. S1 échange les fils, ce qu'aucun texte ne fait, et le
   modèle tombe. *Si le propriétaire juge la marge trop mince, §13.8 donne le remplacement :
   l'identification par l'OBSERVATION, sans polarité donnée — le geste de trois entrées de
   banque sur neuf, que la leçon ne fait jamais en entier (§2.4).*
2. **S4 fuit partiellement, par la leçon PRÉCÉDENTE.** `lesson.md:147` écrit « *Tu connais
   déjà cette relation (leçon précédente, chapitre 7)* » : l'élève a vu $Q = n(e^-)\,F$
   dans `pc/piles`. Il pourrait donc répondre par $n(e^-) = Q/F$ au lieu de passer par la
   balance. **Deux raisons font que le pari tient quand même :** (a) la consigne de S4
   **ferme explicitement cette route** — « *on ne sait pas encore combien de charge porte
   une mole d'électrons : c'est justement ce qu'on cherchera à l'étape suivante* » ; (b) les
   deux routes ne donnent pas le même quatrième chiffre — $2\,160/9{,}65\times10^{4} =
   2{,}238\times10^{-2}$ contre $2\times0{,}732/65{,}4 = 2{,}239\times10^{-2}$ — et **c'est
   la seconde que la balance impose**. *Écrit ici parce que c'est une vraie fissure, et
   parce que le retour du choix juste doit la nommer (§7.4).*
3. **La consigne de S1 doit poser du vocabulaire que la prose n'a pas encore écrit** :
   rhéostat, balance, « on pèse la lame avant et après ». Même prix qu'au banc de
   diffraction (fente, écran, tache) et au tremplin (tremplin, rayon, point B). Acceptable
   pour la même raison : ces mots sont **descriptifs** (ce qu'on voit sur la paillasse),
   pas **explicatifs**. *Le mot « rhéostat » n'existe nulle part dans la notion (§15.11) ;
   la consigne dit « **un rhéostat en série, réglé pour tenir le courant à la valeur
   affichée** », et l'explique en une incise.*

**Ce qui ne bouge pas :** les cinq points d'arrêt (y compris `cp-faraday` à `:189`, qui
devient la reprise de ce que la scène a montré), les trois figures — en particulier
`seuil-tension-electrolyse` à `:133`, qui est désormais **avant** le marqueur et ne fuit
donc dans aucun pari — et les 24 items. La scène **n'en déplace aucun**.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

**Ce §4 décrit ; il ne rédige pas.** Chaque bloc porte son **ancre exacte**, son
**travail**, les **faits qu'il doit contenir**, ce qu'il **ne doit pas contenir**, et une
**longueur cible**. Les phrases finales sont de content-author.

**Interdit dans tout ce qui précède le marqueur :** rien qui réponde à un pari (§7.6).
4.1 est **avant** et strictement neutre ; 4.3 à 4.5 sont **après**.

> **Ce que la vague 1 a retiré d'ici :** l'ancien §4.3 — un paragraphe de prose sur le cas
> $U = E$ (aiguille à zéro), destiné à R3 — **disparaît avec l'étape du seuil**. Sa
> rédaction est décrite au **§13.1**, avec l'étape qui l'accompagnait, comme chemin de
> retour.

**Rappel de convention, non négociable** (`REVIEW-2026-09-19.md:8-36`, cadre l. 520) :
**demi-équation ⇒ double flèche $\rightleftharpoons$ ; équation bilan ⇒ flèche simple
$\rightarrow$.** Le discriminant est mécanique : *une demi-équation contient `e^-`, une
équation bilan n'en contient jamais.* Toute ligne de prose ou de retour commandée ici s'y
conforme, et la porte la mesure (§9.17).

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

*Ancre : après le titre `## R4 — La quantité d'électricité : $Q = I\,\Delta t = n(e^-)\,F$,
réutilisée à l'envers` (`lesson.md:143`), avant `### La même loi, un sens inversé`
(`lesson.md:145`).*

- **Travail :** présenter la paillasse et les instruments, donner les unités, annoncer le
  geste. Rien affirmer.
- **Doit contenir :** (a) c'est **la cellule de l'accroche**, celle que les chapitres 1 à 4
  ont suivie — lame de zinc, lame de cuivre, pont salin, générateur réglable, **et le seuil
  du chapitre 4 est déjà franchi** ; (b) trois instruments qu'on va lire : un
  **ampèremètre** (ampères), une **balance** (grammes, au milligramme) et un
  **chronomètre** ; (c) ce qu'on peut régler : la **tension** du générateur, et
  l'**intensité**, qu'un **rhéostat en série** maintient à la valeur affichée ; (d)
  l'annonce du geste : « tu paries d'abord, la paillasse répond ensuite » ; (e) le fait que
  les manipulations sont **accélérées**, et de combien.
- **Ne doit PAS contenir :** « $Q$ », « charge », « coulomb », « produit », « Faraday »,
  « $F$ », « mole », « $n(e^-)$ », ni aucune valeur de masse ; ni « anode », ni
  « cathode » ; ni aucune affirmation sur ce que la tension fait ou ne fait pas.
- **Longueur :** 60 à 90 mots.

### 4.2 Le marqueur

Seul sur sa ligne, immédiatement après 4.1.

### 4.3 Le cœur — « La tension décide SI ; à courant maintenu, la charge décide COMBIEN »

*Ancre : après `lesson.md:161` (« *…c'est le sens physique de ce qu'elle mesure.* » — la
fin du paragraphe « Ce qui change, c'est le **sens physique** ») et **avant**
`### Exemple travaillé` (`lesson.md:163`).*

- **Travail :** écrire la charnière que la leçon n'a pas, et que la scène vient de faire
  éprouver (§2.2).
- **Doit contenir, dans cet ordre :**
  1. **Le partage des rôles, en une phrase, avec sa condition :** la tension imposée décide
     **si** la transformation forcée a lieu et **dans quel sens** (chapitre 4) ; **à
     courant maintenu constant — ce que tout montage d'électrolyse fait, et ce que les
     sujets veulent dire quand ils écrivent « intensité constante » —** elle ne décide pas
     de **combien** il se transforme.
  2. **Ce qui décide de la quantité :** le **courant** et la **durée**, et **seulement par
     leur produit**. Deux réglages différents qui donnent le même produit donnent le même
     dépôt — et c'est vérifiable au banc : $0{,}100\ \text{A}$ pendant $1\ \text{h}\ 30$ et
     $0{,}200\ \text{A}$ pendant $45\ \text{min}$ déposent **exactement la même masse**.
  3. **La conséquence qui coûte des points :** une fois le seuil franchi, **et tant que le
     courant est maintenu**, monter la tension ne figure dans aucun calcul de masse. *(Ce
     que la tension change alors, c'est ce que l'installation consomme — pas ce qu'elle
     produit. Une phrase, sans aucun chiffre : l'énergie n'est pas au programme de ce
     chapitre, §9.4.)*
  4. **Le seul mot d'honnêteté qui manque au chapitre :** si l'on **ne** maintenait **pas**
     le courant, monter la tension le ferait monter, et le dépôt avec — c'est pour cela que
     tous les énoncés précisent « à intensité constante ». *Une phrase, pas deux, et aucune
     relation entre $I$ et $U$ (§9.3).*
- **Ne doit PAS contenir :** aucune loi $I(U)$, aucune résistance chiffrée, aucun joule,
  aucun watt, aucune énergie chiffrée.
- **Longueur :** 120 à 160 mots.

### 4.4 « Déterminer $F$ par la mesure » — le savoir-faire à 0 %

*Ancre : après l'exemple travaillé de R4, c'est-à-dire après `lesson.md:181`
(« *…une masse dissoute $m(Cu) \approx 0{,}36\ \text{g}$.* ») et **avant**
`### Teste l'idée avant de la croire : « la loi de Faraday ne s'applique qu'aux piles »`
(`lesson.md:183`). Titre proposé : `### Le geste inverse : mesurer la constante de
Faraday`.*

- **Travail :** rendre exécutable le **travail pratique du cadre**
  (`pc-physique-chimie.yaml:529`), couvert à **0 %**.
- **Doit contenir, dans cet ordre :**
  1. **Le renversement :** jusqu'ici $F$ était **donnée** et servait à trouver une masse. On
     peut parcourir la chaîne dans l'autre sens : **peser**, et en déduire $F$.
  2. **Les quatre mesures qu'il faut, et rien d'autre :** l'intensité $I$ (maintenue
     constante), la durée $\Delta t$, la masse déposée $m$, et la masse molaire $M$ du
     métal (donnée). *La demi-équation fournit le cinquième ingrédient, qui n'est pas une
     mesure : le nombre $z$ d'électrons par atome.*
  3. **La chaîne, écrite entière :**
     $$n(\text{métal}) = \frac{m}{M} \quad\longrightarrow\quad n(e^-) = z\,\frac{m}{M}
     \quad\longrightarrow\quad F = \frac{Q}{n(e^-)} = \frac{I\,\Delta t}{z\,m/M}$$
  4. **Les nombres du banc, refaits à la main** (ADR 0041 §5 : l'élève qui refait le calcul
     retrouve ce que la scène a affiché) : $I = 0{,}400$ A, $\Delta t = 1\ \text{h}\ 30 =
     5\,400$ s, $m(Zn) = 0{,}732$ g, $M(Zn) = 65{,}4$ g·mol⁻¹, $z = 2$.
     $Q = 0{,}400 \times 5\,400 = 2\,160$ C ; $n(e^-) = 2 \times 0{,}732/65{,}4 =
     2{,}239\times10^{-2}$ mol ; $F = 2\,160/2{,}239\times10^{-2} = 9{,}65\times10^{4}$
     C·mol⁻¹.
  5. **L'universalité, en une phrase :** la même valeur sort de n'importe quelle
     électrolyse — autre métal, autre bain, autre courant, autre durée, autre tension. Ce
     qui change d'une manipulation à l'autre, c'est le **$z$** de la demi-équation et la
     **masse molaire**, jamais $F$. *C'est ce qui permet de la tabuler une fois pour
     toutes.*
  6. **La relation littérale**, que la notion n'écrit jamais et que la REVIEW réclame
     (l. 99-101) : $m = \dfrac{M\,I\,\Delta t}{z\,F}$, obtenue en isolant $m$.
  7. **Le conseil expérimental, et il est chiffré :** plus le dépôt est **petit**, plus
     l'arrondi de la pesée pèse lourd. La même manipulation menée $45\ \text{min}$ à
     $0{,}100$ A ne dépose que $0{,}091$ g, et la même arithmétique donne alors
     $9{,}70\times10^{4}$ — **0,5 % à côté**. *Fais durer la manipulation.*
- **Ne doit PAS contenir :** ni « incertitude », ni « ± », ni « écart-type » (§9.13) ;
  aucun $E^\circ$. *Le point 5 a le droit de nommer un autre métal — c'est de la prose,
  pas le panneau (§9.8).*
- **Longueur :** 190 à 240 mots, équations comprises.

### 4.5 Deux puces au récapitulatif (R6)

*Ancre : `lesson.md:259-263`, « Récapitulatif express ». **Ne pas toucher aux cinq puces
existantes** ; en ajouter deux, après la puce de la loi de Faraday (`:262`).*

- **(a)** La tension décide **si** la transformation a lieu et **dans quel sens** ; **à
  courant maintenu constant**, la charge $Q = I\,\Delta t$ décide **de combien**. Deux
  réglages de même produit $I\,\Delta t$ déposent la même masse, et la tension ne figure
  dans aucun calcul de masse.
- **(b)** La chaîne se parcourt **dans les deux sens** : de $(I ; \Delta t)$ vers $m$ avec
  $m = \dfrac{M\,I\,\Delta t}{z\,F}$, **et** de $m$ vers $F$ en pesant —
  $F = \dfrac{I\,\Delta t}{z\,m/M}$. $F$ est **universelle** : la charge d'une mole
  d'électrons, la même quels que soient le métal, le bain, le courant, la durée et la
  tension.

### 4.6 Aucun nouveau point d'arrêt

Les **cinq paris** de la scène jouent le rôle de porte d'engagement dans R4 ;
`checkpoints.yaml` n'est pas touché — et la notion porte déjà **cinq** points d'arrêt, dont
**quatre sont des clones d'items du banc de fin** (`checkpoints.yaml:30-34`). Ajouter une
sixième porte clonée aggraverait exactement ce défaut. *Et `cp-faraday` (`lesson.md:189`)
devient **la reprise** de ce que la scène a montré : il ne bouge pas d'un caractère.*
*§13.13 si le propriétaire en veut une.*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 La cellule — pourquoi celle de la LEÇON et non celle d'un sujet

La scène est **la cellule de l'accroche** : lame de zinc dans du sulfate de zinc, lame de
cuivre dans du sulfate de cuivre, pont salin, générateur réglable en opposition — le
montage que **tous les chapitres 1 à 5 suivent** (`lesson.md:7`, `:61-65`, `:101-111`,
`:127-131`, `:165-181`).

**Trois raisons, dans l'ordre de leur force.**

1. **Tous les nombres de la scène sont dans la leçon, et l'élève les retrouvera.**
   $I = 0{,}200$ A et $\Delta t = 5\,400$ s (`:167`), $M(Zn) = 65{,}4$ et
   $M(Cu) = 63{,}5$ (`:177`, `:181`), $F \approx 9{,}65\times10^{4}$ (`:155`),
   $n(e^-) \approx 1{,}12\times10^{-2}$ mol (`:171`), $m(Zn) \approx 0{,}37$ g (`:177`),
   $m(Cu) \approx 0{,}36$ g (`:181`), $U = 6$ V (`:131`), $E \approx 1{,}1$ V (`:127`).
   **ADR 0041 §5, au mot près** : l'élève qui refait l'exemple travaillé du chapitre 5
   retrouve ce que la scène affiche.
2. **La scène pèse un MÉTAL, et c'est ce que le chapitre 5 fait.** Sur les neuf entrées de
   banque, **cinq** demandent un **volume de gaz** — donc $V_m$, donc le chapitre 6, donc
   hors scène (§9.7). Des quatre qui restent, aucune n'installe une f.é.m. propre ni ne
   fait varier deux réglages. *Prendre une cellule de banque obligerait soit à entrer dans
   R5, soit à emprunter des espèces sans emprunter la question qui les accompagne.*
3. **La cellule zinc/cuivre porte les DEUX lames visibles**, l'une qui grossit et l'autre
   qui maigrit, avec **deux masses molaires différentes pour un même nombre de moles** —
   ce qui donne à S5 sa `suite` (§7.5) sans coûter une étape.

**Ce que la scène emprunte au bac, et le cite explicitement :**

- **la borne `+` dessinée à GAUCHE** (`bk-2015-n-x1b`, `bank.yaml:786` ; `bk-2019-n-x1`,
  `:288` ; `bk-2023-r-x1`, `:507`), avec le piège que la banque nomme elle-même
  (`:799` : « *rien n'oblige la borne $+$ à être à droite ou à gauche par convention* ») ;
- **les étiquettes « (A) » et « (B) » posées à côté du nom des lames** — c'est la
  convention de quatre entrées sur neuf (`bank.yaml:288`, `:498-499`, `:786`, `:797`), et
  c'est ainsi que l'élève verra les électrodes nommées le jour de l'examen *(correctif de
  fidélité F4)* ;
- **la formule « courant d'intensité constante »**, mot des sujets (`bank.yaml:311`,
  `:649`, `:823`, `:1091`, `:1404`).

*La `caption_fr` porte cette provenance ; §13.9 est la question au propriétaire.*

### 5.2 La géométrie de la paillasse — et d'où vient chaque élément

| élément | position | d'où il vient |
|---|---|---|
| lame de **cuivre**, étiquetée **(B)** | bécher de **GAUCHE** | choisie pour que la borne `+` tombe à gauche **sans croiser les fils** — la disposition des trois sujets cités ci-dessus, et la lettre **(B)** est celle que ces sujets donnent à l'électrode de la borne `+` (`bank.yaml:288`, `:797`) |
| lame de **zinc**, étiquetée **(A)** | bécher de **DROITE** | idem, borne `−` |
| **pont salin** | entre les deux béchers | `lesson.md:7` |
| **générateur** | en haut, un cercle, `+` **à GAUCHE**, `−` **à DROITE** | `bank.yaml:786` (2015 N), `:288` (2019 N) |
| **rhéostat** | en série, sur le fil de gauche | l'instrument qui rend vraie la formule « intensité constante » des cinq sujets (§5.5) |
| **ampèremètre** | en série, sur le fil de droite | `lesson.md:9` |
| **balance** | sous chaque lame, affichant la masse **gagnée** (signée) | le geste du TP ; §10.2 dit ce qu'elle simplifie |
| **chronomètre** | à côté du générateur, en temps **réel** | §6.1 |

*Le voltmètre de la version précédente est retiré : avec l'étape du seuil, la lecture
`fem` n'a plus besoin d'un instrument dessiné — elle est une donnée de consigne (§5.4), et
le §15.10 comptait déjà le nombre d'objets comme le risque de lisibilité principal.*

### 5.3 Les réglages — et pourquoi ces valeurs-là

| grandeur | valeurs | d'où elles viennent |
|---|---|---|
| **$U$** (tension imposée) | **2,0** · **6,0** · **12,0** V | **6,0** est la valeur de l'exemple travaillé du chapitre 4 (`lesson.md:131`) · **2,0** est un « juste au-dessus du seuil » ($E \approx 1{,}1$ V) · **12,0** est le **double** de 6,0, et c'est la démonstration de S5. **Les trois sont au-dessus du seuil** : la scène ne redescend jamais sous $E$ (§1). *Les trois sont déclarées au §9.16 et relevées par la porte.* |
| **câblage** | `oppose` (borne `+` sur le **cuivre (B)**) · `accord` (borne `+` sur le **zinc (A)**) | `oppose` est le montage de la leçon (`lesson.md:101` : « *la lame de zinc, reliée à la borne − […] la lame de cuivre, reliée à la borne +* ») ; `accord` est son échange, et **aucun texte du corpus ne le décrit** — c'est le pari de S1 |
| **$I$** (intensité maintenue) | **0,100** · **0,200** · **0,400** A | **0,200** est l'intensité de l'exemple travaillé (`lesson.md:167` : « *$I = 200\ \text{mA} = 0{,}200\ \text{A}$* ») ; **0,100** et **0,400** sont sa moitié et son double exacts — les deux crans qui font apparaître les couples de même produit (§5.7) |
| **$\Delta t$** (durée) | **1 800** s (30 min) · **2 700** s (45 min) · **5 400** s (1 h 30) | **5 400** s est la durée de l'exemple travaillé (`lesson.md:167` : « *$\Delta t = 1\ \text{h}\ 30 = 5400\ \text{s}$* ») ; **2 700** s est sa moitié exacte ; **1 800** s est la durée ronde qui complète la grille |

**Des crans, pas des curseurs continus** : une tension de paillasse se règle par positions
repérées, une durée de TP se note en minutes rondes, et les invariants (§5.7) ne se lisent
que sur des valeurs rondes. *Conséquence mesurable : deux réglages voisins n'affichent
jamais la même valeur à trois chiffres, sauf **exactement** là où la scène veut qu'ils le
fassent (les deux couples de même charge, et les trois tensions) — le défaut de l'orbite
(« douze positions affichant 24,0 h ») ne peut pas se reproduire par accident.*

**Ce que la scène n'emploie PAS de la leçon, et pourquoi.** $Q_{r,i}$ et $K$
(`lesson.md:17`, `:35`) : la scène **ne les chiffre jamais** — elle dit « sens spontané » en
mots. L'effet Joule et l'énergie (`:53-55`) : **hors scène** (§9.4). $U = 0{,}9$ V et le
seuil (`:129`) : **hors scène depuis la vague 1** (§0.2). Les gaz, le volume molaire, la
galvanoplastie, l'aluminium (R5) : **hors scène** (§9.7, §9.8).

### 5.4 La f.é.m. propre $E$ — un ACQUIS rappelé, jamais interrogé

$E \approx 1{,}1$ V est **donnée dans la consigne de S1** (« *la cellule a sa propre force
électromotrice, environ 1,1 volt : le chapitre 4 vient de l'établir, et les trois tensions
du banc sont toutes au-dessus* ») et **affichée comme une lecture à l'encre**, jamais comme
un objet de pari.

- le cadre l'exige ainsi : « **f.é.m MESURÉE expérimentalement. Pas de potentiels standards
  E°** » (`pc-physique-chimie.yaml:523`) ;
- la leçon la donne ainsi (`lesson.md:127`) sans jamais la calculer ;
- **elle est affichée à DEUX chiffres significatifs et précédée du mot « environ »** —
  parce qu'une f.é.m. mesurée n'a pas trois chiffres. *§10.3.*

### 5.5 La règle du CHIFFRAGE — la décision la plus lourde de cette scène

> **Un rhéostat en série maintient le courant à la valeur affichée, quelle que soit la
> tension du générateur.** L'ampèremètre affiche donc **exactement le même nombre** à
> $2{,}0$ V, à $6{,}0$ V et à $12{,}0$ V. **Le banc ne montre aucune dépendance du courant
> à la tension, et n'en affiche aucune loi.**

**Ce que l'élève RÈGLE et ce qui RESTE constant, dit explicitement** (exigence de la
vague 1, BLOQUANT pédagogique 1) : il règle **deux** choses — la **tension** du générateur
et la **consigne d'intensité** du rhéostat — et **c'est l'intensité qui est tenue**. La
consigne de S5 l'écrit en toutes lettres : « *on monte la tension ; le rhéostat, lui,
continue de tenir l'aiguille sur $0{,}400$ ampère — c'est ce que fait un vrai montage, et
c'est ce que le sujet veut dire quand il écrit « intensité constante ».* »

**Pourquoi, et c'est une frontière de programme, pas une pudeur d'auteur.** Faire varier le
courant avec la tension demanderait une relation $I(U)$ pour une cellule électrolytique.
**Le cadre n'en pose aucune** ; **aucun des neuf sujets n'en donne** (ils donnent tous $I$
comme une donnée : « *courant d'intensité constante* ») ; **la leçon n'en écrit aucune**.
Poser un tel modèle serait **inventer la physique du chapitre**. La porte le garde dans les
deux sens (§9.3 ; §11.1 N8 et **N12**).

**Ce que cette règle coûte, et c'est écrit :** le banc ne peut pas montrer ce qui se
passerait **sans** rhéostat — c'est-à-dire le cas où monter la tension fait bel et bien
monter le dépôt. Ce cas est **dit en une phrase de prose** (§4.3, point 4) et **jamais
montré**. *C'est un renoncement réel, et c'est le prix de l'honnêteté : montrer une
dépendance qu'aucune source ne chiffre serait pire que ne pas la montrer.*

**Le chemin de retour, conservé par écrit** (§13.1) : la version précédente de cette spec
avait une règle plus riche — *le banc chiffre le courant exactement quand le générateur
impose le sens ; en opposition il faut $U > E$, ailleurs il suffit que $U > 0$ ; partout
ailleurs il n'affiche qu'un SENS, jamais un nombre* — avec un **zéro structurel** à
$U = E$ (jamais un $U - E$ flottant). Elle redevient nécessaire le jour où l'étape du seuil
revient.

### 5.6 Contrôles (4) — un neuf par étape

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `branchement` | quelle borne sur quelle lame | `oppose` · `accord` | **S1**, S5 |
| `duree` | $\Delta t$ | `1800` · `2700` · `5400` (s) | **S2**, **S3** *(hérité)*, S5 |
| `courant` | $I$ maintenue | `100` · `200` · `400` (mA) | **S3**, S5 |
| `tension` | $U$ | `2.0` · `6.0` · `12.0` (V) | **S5** |

**S4 n'ouvre aucun contrôle neuf**, et c'est voulu : son pari porte sur une **lecture**
(le nombre de moles d'électrons), pas sur un réglage. Elle rouvre `courant` et `duree`
pour que sa `suite` puisse refaire le comptage sur plusieurs charges. *(Précédent : les
noyaux gardaient un contrôle neuf à l'étape libre, la cuve, la corde, le banc et le
tremplin non. Écrit ici plutôt que découvert à la revue.)*

**Un contrôle est HÉRITÉ, à S3 — écart assumé à la règle du tremplin, et voici la mesure
qui l'autorise.** Le tremplin posait « *aucun contrôle n'est hérité d'une étape à la
suivante* », parce que sa non-fuite était tenue par les **réglages**. Ici elle est tenue
par les **lectures** : le pari de S4 porte sur $n(e^-)$ et celui de S5 sur $F$ et sur la
tension — et `quantite-electrons` **n'existe dans le DOM qu'à partir de S4**,
`faraday-mesure` **qu'à partir de S5**, `tension` n'est réglable **qu'à S5**. Aucun réglage
de S3 ne peut donc les produire. *Garder `duree` ouvert à S3 est nécessaire — c'est la
seule façon de vérifier, à l'étape même, que ce qui compte est le **produit**
$I\,\Delta t$ et non l'un des deux facteurs. La porte vérifie les deux côtés : l'héritage
EST déclaré dans le descripteur, et les deux lectures sont absentes avant leur étape*
(§11.2, `fuite-inter-etapes` + `formule-graduee`). *§13.11.*

### 5.7 Les tables de nombres — **toute l'arithmétique de la scène, vérifiée**

Constantes : $M(Zn) = 65{,}4$ g·mol⁻¹, $M(Cu) = 63{,}5$ g·mol⁻¹,
$F = 9{,}65\times10^{4}$ C·mol⁻¹, $z = 2$ pour les deux couples. Coefficients employés :
$\dfrac{M(Zn)}{2F} = \dfrac{65{,}4}{193\,000} = 3{,}388\,601\times10^{-4}$ g·C⁻¹ et
$\dfrac{M(Cu)}{2F} = \dfrac{63{,}5}{193\,000} = 3{,}290\,155\times10^{-4}$ g·C⁻¹.

> **La tension n'entre dans aucune de ces tables, et c'est tout l'argument.** Les
> **27 états** de la scène (3 tensions × 3 intensités × 3 durées) ne produisent que **9**
> jeux de valeurs : la colonne de la tension est **muette**. *La porte le mesure comme une
> ligne à part (§11.1, **N12**).*

**A — la charge $Q = I\,\Delta t$ (C)** :

| $I$ (A) \ $\Delta t$ | **1 800 s** (30 min) | **2 700 s** (45 min) | **5 400 s** (1 h 30) |
|---|---|---|---|
| **0,100** | 180 | **270** | **540** |
| **0,200** | 360 | **540** | **1 080** |
| **0,400** | 720 | **1 080** | **2 160** |

*Vérifications : $0{,}100\times1\,800 = 180$ ✓ · $0{,}100\times2\,700 = 270$ ✓ ·
$0{,}100\times5\,400 = 540$ ✓ · $0{,}200\times1\,800 = 360$ ✓ ·
$0{,}200\times2\,700 = 540$ ✓ · $0{,}200\times5\,400 = 1\,080$ ✓ ·
$0{,}400\times1\,800 = 720$ ✓ · $0{,}400\times2\,700 = 1\,080$ ✓ ·
$0{,}400\times5\,400 = 2\,160$ ✓.*

**Les deux couples de même charge, et ce sont eux le cœur de S3 :**
$(0{,}100\ \text{A} ; 1\ \text{h}\ 30)$ et $(0{,}200\ \text{A} ; 45\ \text{min})$ valent
tous deux **540 C** ; $(0{,}200\ \text{A} ; 1\ \text{h}\ 30)$ et
$(0{,}400\ \text{A} ; 45\ \text{min})$ valent tous deux **1 080 C**. *C'est l'analogue exact
du $a\times L = 0{,}240$ du banc de diffraction et du $a_N\times R = v^2$ du tremplin : un
invariant qui se lit sans division.*

**B — la masse de zinc déposée, $m(Zn) = Q \times 3{,}388\,601\times10^{-4}$, affichée au
MILLIGRAMME** :

| $Q$ (C) | 180 | 270 | 360 | 540 | 720 | 1 080 | 2 160 |
|---|---|---|---|---|---|---|---|
| valeur exacte (g) | 0,060 995 | 0,091 492 | 0,121 990 | 0,182 984 | 0,243 979 | 0,365 969 | 0,731 938 |
| **affichée (g)** | **0,061** | **0,091** | **0,122** | **0,183** | **0,244** | **0,366** | **0,732** |

*Vérifications : $180\times3{,}388\,601\times10^{-4} = 0{,}060\,995$ ✓ ·
$1\,080\times3{,}388\,601\times10^{-4} = 0{,}365\,969$ ✓ ·
$2\,160\times3{,}388\,601\times10^{-4} = 0{,}731\,938$ ✓.*
**Et 0,366 g est le nombre de la leçon** : `lesson.md:177` écrit « *$m(Zn) \approx
0{,}37\ \text{g}$* » à $Q = 1\,080$ C — $0{,}366$ arrondi à deux chiffres donne $0{,}37$ ✓.

**C — la masse de cuivre dissoute, $m(Cu) = Q \times 3{,}290\,155\times10^{-4}$** :

| $Q$ (C) | 180 | 270 | 360 | 540 | 720 | 1 080 | 2 160 |
|---|---|---|---|---|---|---|---|
| **affichée (g)** | **0,059** | **0,089** | **0,118** | **0,178** | **0,237** | **0,355** | **0,711** |

*Vérifications : $1\,080\times3{,}290\,155\times10^{-4} = 0{,}355\,337$ ✓ —
`lesson.md:181` écrit « *$m(Cu) \approx 0{,}36\ \text{g}$* » pour la même charge ✓ ·
$2\,160\times3{,}290\,155\times10^{-4} = 0{,}710\,674 \to 0{,}711$ ✓.*

**D — la quantité de matière d'électrons, calculée sur la MASSE AFFICHÉE**,
$n(e^-) = \dfrac{2\,m(Zn)}{M(Zn)}$, **à quatre chiffres significatifs** :

| $m(Zn)$ affichée (g) | 0,061 | 0,091 | 0,122 | 0,183 | 0,244 | 0,366 | 0,732 |
|---|---|---|---|---|---|---|---|
| $2m/65{,}4$ | 1,865 4·10⁻³ | 2,782 9·10⁻³ | 3,730 9·10⁻³ | 5,596 3·10⁻³ | 7,461 8·10⁻³ | 1,119 3·10⁻² | 2,238 5·10⁻² |
| **affichée** | **1,865·10⁻³** | **2,783·10⁻³** | **3,731·10⁻³** | **5,596·10⁻³** | **7,462·10⁻³** | **1,119·10⁻²** | **2,239·10⁻²** |

*Vérifications : $0{,}122/65{,}4 = 1{,}865\,443\times10^{-3}$ ✓ ·
$0{,}732/65{,}4 = 1{,}119\,266\times10^{-2}$ ✓ (c'est le $n(e^-) \approx
1{,}12\times10^{-2}$ de `lesson.md:171`, à trois chiffres) ·
$1{,}464/65{,}4 = 2{,}238\,532\times10^{-2}$ ✓.*

**E — la constante mesurée, $F = \dfrac{Q}{n(e^-)}$, sur les valeurs AFFICHÉES, à trois
chiffres significatifs** :

| $Q$ (C) | 180 | **270** | 360 | 540 | 720 | 1 080 | 2 160 |
|---|---|---|---|---|---|---|---|
| $Q/n(e^-)$ | 96 515 | **97 018** | 96 489 | 96 498 | 96 489 | 96 515 | 96 472 |
| **affichée (C·mol⁻¹)** | 9,65·10⁴ | **9,70·10⁴** | 9,65·10⁴ | 9,65·10⁴ | 9,65·10⁴ | 9,65·10⁴ | 9,65·10⁴ |

*Vérifications : $180/1{,}865\times10^{-3} = 96\,514{,}7$ ✓ ·
$270/2{,}783\times10^{-3} = 97\,017{,}6$ ✓ · $360/3{,}731\times10^{-3} = 96\,488{,}9$ ✓ ·
$540/5{,}596\times10^{-3} = 96\,497{,}5$ ✓ · $720/7{,}462\times10^{-3} = 96\,488{,}9$ ✓ ·
$1\,080/1{,}119\times10^{-2} = 96\,514{,}7$ ✓ ·
$2\,160/2{,}239\times10^{-2} = 96\,471{,}6$ ✓.*

> **Six réglages sur sept donnent $9{,}65\times10^{4}$ ; un seul en sort — et c'est un
> cadeau, pas un défaut.** Le réglage $(0{,}100\ \text{A} ; 45\ \text{min})$ dépose
> $0{,}091$ g, la plus petite masse de la grille, et l'arrondi au milligramme y coûte
> **0,5 %** : $9{,}70\times10^{4}$. *C'est le conseil expérimental le plus banal et le plus
> utile d'un TP — fais durer la manipulation —, et la scène le fait **arriver** au lieu de
> le dire.* §7.5, `suite` ; §4.4, point 7 ; **gardé comme un nombre** par la porte (§11.1
> N6, §11.4 sabotage 7).

**F — la route fermée de S4, chiffrée** (§3, tension 2). Passer par $F$ au lieu de la
balance donne $n(e^-) = Q/F = 2\,160/9{,}65\times10^{4} = 2{,}238\,3\times10^{-2} \to
\mathbf{2{,}238\times10^{-2}}$ mol, contre $\mathbf{2{,}239\times10^{-2}}$ par la balance.
*Les deux routes diffèrent au quatrième chiffre, et c'est la seconde que le banc affiche.*

### 5.8 La précision — un arbitrage entre deux mensonges, et il est mesuré

> **La balance affiche le MILLIGRAMME (trois décimales), et c'est le seul réglage qui
> tienne.**
>
> - **À deux décimales**, $Q = 540$ C afficherait $0{,}18$ g, et la chaîne donnerait
>   $n(e^-) = 0{,}36/65{,}4 = 5{,}504\,6\times10^{-3}$, donc
>   $F = 540/5{,}504\,6\times10^{-3} = 98\,100 \to 9{,}81\times10^{4}$ : **1,7 % à côté,
>   sur SIX réglages sur sept**. L'invariant serait faux à l'écran partout.
> - **À quatre décimales** (le dixième de milligramme), $Q = 270$ C afficherait
>   $0{,}091\,5$ g, donc $n(e^-) = 0{,}183/65{,}4 = 2{,}798\times10^{-3}$ et
>   $F = 270/2{,}798\times10^{-3} = 96\,498 \to 9{,}65\times10^{4}$ : **l'écart instructif
>   disparaît** — et une balance au dixième de milligramme n'est pas l'instrument d'un
>   lycée.
>
> **Trois décimales** donnent : l'invariant vrai à l'écran sur six réglages, **un** écart
> réel là où un vrai TP en produirait un, et un instrument que l'élève a sous les yeux en
> salle. *C'est la seule raison des trois décimales, et la porte la mesure.*

Les autres précisions : $U$ à **une décimale** (2,0 · 6,0 · 12,0) ; $E$ à **deux chiffres
significatifs** avec le mot « environ » (§5.4) ; $I$ à **trois chiffres significatifs**
(0,100 · 0,200 · 0,400) parce que c'est l'écriture de la leçon (`lesson.md:167`) ;
$\Delta t$ en **minutes ET secondes** (« 45 min = 2 700 s »), parce que la conversion est le
piège nommé de quatre items (`items.yaml:338`, `:409`, `:1085`) ; $Q$ à **trois chiffres
significatifs** ; $n(e^-)$ à **quatre** (§5.7 D, sans quoi $F$ tomberait à
$9{,}64\times10^{4}$ sur le réglage de la leçon : $1\,080/1{,}12\times10^{-2} = 96\,429$) ;
$F$ à **trois**.

### 5.9 État (4 clés) et lectures (9)

**État :** `u_v`, `cablage`, `i_ma`, `duree_s` — les quatre que les contrôles règlent.
**Aucune clé posée sans contrôle.** Les deux masses molaires, $F$ de référence (jamais
affichée avant S5), $E \approx 1{,}1$ V, la géométrie de la paillasse et le facteur
d'accélération (×900) sont des **constantes du modèle** : aucun contrôle ne les atteint.

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `tension` | $U$ imposée | V | 1 décimale | le réglage ; **S5 seulement** — avant, c'est une donnée de consigne |
| `fem` | $E$ propre de la cellule, **acquis du chapitre 4** | V | 2 c.s. + « environ » | §5.4 ; à l'encre, jamais un pari |
| `sens` | « **sens imposé** » (`oppose`) · « **sens spontané** (le générateur accompagne) » (`accord`) | — | chaîne exacte | c'est la réponse de S1 |
| `intensite` | $I$ maintenue par le rhéostat | A | 3 c.s. | §5.5 ; **identique aux trois tensions** (N8, N12) |
| `duree` | $\Delta t$ écoulée | min **et** s | entier | la conversion est le piège de quatre items |
| `charge` | $Q = I\,\Delta t$ | **C** | 3 c.s. | **S3, S4, S5** |
| `masse-zinc` | masse **gagnée** par la lame **(A)** de zinc, **signée** | g | **3 décimales** | §5.8 ; négative en câblage `accord` |
| `masse-cuivre` | idem, lame **(B)** de cuivre | g | 3 décimales | **S4 et S5** |
| `quantite-electrons` | $n(e^-) = 2\,m(Zn)/M(Zn)$, calculée sur la **masse affichée** | mol | **4 c.s.** | **S4 et S5** ; c'est la réponse de S4 |
| `faraday-mesure` | $F = Q/n(e^-)$, calculée sur les **valeurs affichées** | **C·mol⁻¹** | 3 c.s. | **S5 seulement** ; c'est la réponse de S5 |

**Ce que la scène n'affiche PAS, et il faut le dire :** la **quantité de matière de
cuivre**. Arrondies au milligramme, $n(Zn)$ et $n(Cu)$ tombent sur des troisièmes chiffres
différents à **quatre réglages sur sept** — par exemple à $Q = 1\,080$ C :
$0{,}366/65{,}4 = 5{,}596\times10^{-3}$ contre $0{,}355/63{,}5 = 5{,}591\times10^{-3}$,
soit $5{,}60\times10^{-3}$ et $5{,}59\times10^{-3}$ à trois chiffres. **La scène affirmerait
une égalité que son propre affichage démentirait.** Elle affiche donc les deux **masses** et
laisse la `suite` de S5 inviter à la division sur le réglage où elle tombe juste
($Q = 2\,160$ C : $0{,}732/65{,}4 = 1{,}119\times10^{-2}$ et
$0{,}711/63{,}5 = 1{,}120\times10^{-2}$, soit $1{,}12\times10^{-2}$ des deux côtés ✓).
*§13.4.*

---

## 6. La course, et la langue visuelle

### 6.1 Oui, une course — et le pari reste entier AVANT tout mouvement

`temps: false`, **`course: true`**, `revele_apres_course: 1` aux **cinq** étapes. Même
régime que la cuve, la corde, les noyaux, le manège, la particule et le tremplin.

**Pourquoi une course, ici, et pas un simple curseur.** Le fait central de la scène **est**
une durée : une masse déposée n'est pas un état, c'est un **cumul** ; on ne la voit pas
apparaître, on la voit **monter**. Et le chronomètre est l'un des deux facteurs du produit
que la scène existe pour installer : le cacher reviendrait à enseigner
$Q = I\,\Delta t$ sans montrer $\Delta t$. **Et c'est une course qui rend la démonstration
de S5 visible** : on regarde la balance monter **exactement pareil** à 6,0 V et à 12,0 V.

**Ce que la course est, exactement.** On ferme le circuit, le chronomètre part de zéro,
l'aiguille prend sa position, la lame s'épaissit (ou s'amincit), la balance monte, et la
course **s'arrête à la durée réglée**. Elle ne se poursuit pas au-delà.

**Le ralenti est un ACCÉLÉRÉ, il est déclaré, et il est constant : ×900.** Une seconde à
l'écran vaut **15 minutes réelles**. Les trois durées donnent donc **2,0 s** (30 min),
**3,0 s** (45 min) et **6,0 s** (1 h 30) de course.
*Vérifications : $1\,800/900 = 2{,}0$ ✓ · $2\,700/900 = 3{,}0$ ✓ · $5\,400/900 = 6{,}0$ ✓.*
**Le chronomètre affiche le temps RÉEL** (« 45 min »), jamais le temps d'écran, et le
facteur **ne change jamais avec le réglage** — la porte le mesure **contre l'horloge**, pas
contre les pas demandés (leçon de la cuve, ADR 0041, addendum de la nuit du 2026-09-24,
point 6).

**Comment le pari reste avant tout mouvement** (ADR 0041 §6 et son addendum du 2026-09-23
soir) :

- tant que l'élève n'a pas choisi, **le bouton « Lancer » n'existe pas dans le DOM** — ni
  le contrôle de l'étape, ni le verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : la paillasse à l'encre, les deux lames **intactes**,
  l'ampèremètre **sans aiguille**, le chronomètre à zéro, les deux balances à `0,000 g` ;
- **aucune aiguille, aucune flèche de courant, aucune étiquette « anode » ou « cathode »,
  aucun dépôt, à aucun moment, avant l'engagement** (§7.6) ;
- après l'engagement : le circuit se ferme, l'aiguille prend son côté, le temps court, la
  balance monte. **C'est la paillasse qui répond, avant le texte.**

**Éclairs et mouvement réduit.** Une aiguille qui se pose une fois, une lame qui s'épaissit
lentement et des chiffres qui montent ne produisent **aucune paire de variations
opposées** : le critère WCAG 2.3.1 est structurellement satisfait — **et mesuré quand même**
(§11.3, `eclairs`, *attendu structurellement vide*), parce qu'une chose n'est prouvée
absente que si l'on a énuméré ses formes (ADR 0036). Sous `prefers-reduced-motion`, la
course **calcule sans animer** et montre l'image finale (bouton « Image finale » pour tous),
comme la cuve. **Aucune courbe tracée** : la scène n'a pas de graphe (§9.12), donc pas de
grille glissante à surveiller.

**Aucune trace entre étapes** : chaque étape repart de son état déclaré, lames neuves,
balances à zéro. **Aucune VUE** : la scène est plane et n'a qu'un point de vue.

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : les deux béchers et leur bain, le **pont salin**, les
  **deux lames** avec leur nom chimique **et leur lettre** (« zinc **(A)** », « cuivre
  **(B)** » — convention du bac, §5.1), le **générateur** avec ses deux bornes **marquées
  `+` et `−`**, les **deux fils**, le **rhéostat**, le **boîtier** de l'ampèremètre (son
  cadran et sa graduation, **sans aiguille**), le **chronomètre** à zéro, les deux
  **balances** et leur zéro, et les valeurs que la consigne vient d'énoncer.
  *Corollaire du manège, appliqué à la lettre : une donnée de l'énoncé ne se peint jamais
  dans la couleur de la réponse. **Les signes `+` et `−` du générateur sont l'ÉNONCÉ de
  S1** — la consigne les nomme — donc ils sont à l'encre, y compris après l'échange.*
- **À l'ACCENT — et seulement après la révélation** : l'**aiguille** de l'ampèremètre et la
  **flèche du courant** sur les fils, la **flèche des électrons** (à contresens), les deux
  **étiquettes « anode » et « cathode »** posées sur les lames, la **couche déposée** (ou
  l'entaille de la lame qui se dissout), les **chiffres des balances**, et les lectures
  `charge`, `quantite-electrons`, `faraday-mesure`.
- **Les étiquettes « anode » / « cathode » sont une RÉPONSE, jamais l'énoncé.** Les poser
  avant le pari de S1, c'est donner S1. *C'est la ligne la plus fine de cette scène (§7.6).*
- **Le bain change d'OPACITÉ, jamais de teinte.** L'accroche de la leçon s'appuie sur une
  observation réelle : « *la solution qui l'entoure devient plus intensément bleue* »
  (`lesson.md:15`). La scène la rend — mais **dans l'opacité d'un seul jeton
  `--figure-*`**, jamais par un virage de teinte, et **du côté de l'encre**, pas de
  l'accent : ce n'est pas une mesure, c'est une indication. *La porte le mesure dans les
  deux sens : l'opacité du bécher de cuivre CROÎT pendant une course en `oppose` et DÉCROÎT
  en `accord` ; la **chrominance** ne bouge d'aucun pas (§11.2, `teinte-du-bain`).*
- **L'épaisseur du dépôt est EXAGÉRÉE, d'un facteur constant et déclaré.** Voici la mesure
  qui l'impose : à $m = 0{,}732$ g, une lame de $4{,}0\ \text{cm}\times2{,}0\ \text{cm}$
  offre $16\ \text{cm}^2$ (deux faces), et le zinc déposé y forme une couche de
  $\dfrac{0{,}732/7{,}14}{16} = \dfrac{0{,}102\,52}{16} = 6{,}41\times10^{-3}$ cm, soit
  **64 micromètres** ; à $m = 0{,}061$ g, **5,3 micromètres**.
  *(Vérifications : $0{,}732/7{,}14 = 0{,}102\,521$ cm³ ✓ ; $/16 = 6{,}407\,6\times10^{-3}$
  cm $= 64{,}1\ \mu$m ✓ · $0{,}061/7{,}14 = 8{,}543\,4\times10^{-3}$ cm³ ✓ ;
  $/16 = 5{,}34\times10^{-4}$ cm $= 5{,}3\ \mu$m ✓. **La masse volumique du zinc,
  $7{,}14$ g·cm⁻³, ne vient d'aucun fichier du dépôt : c'est un contrôle d'auteur, et elle
  n'est RENDUE nulle part** — §15.5.)*
  À l'échelle du dessin (une lame de $4$ cm sur $\sim140$ px, soit $35$ px/cm),
  $64\ \mu$m feraient **0,22 pixel**. **Le facteur d'exagération est donc de l'ordre de
  100, il est le MÊME aux 27 états et aux deux lames, et la légende le dit en toutes
  lettres** (§10.1). *La porte le mesure comme un invariant (§11.2, `depot-a-l-echelle`).*
- **Aucune teinte hors jetons** : toutes les couleurs sont lues sur les jetons `--figure-*`
  à l'exécution (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui importerait
  three), et relues au changement de thème.
- **$n(e^-)$, $Q$, $F$, $\Delta t$, les demi-équations et leurs doubles flèches passent par
  KaTeX**, jamais par la police du chrome (ADR 0030 : Geist dessine $\omega$ comme
  $\Omega$ ; le même piège guette $\rightleftharpoons$, les indices et les exposants
  négatifs de `mol⁻¹`).
- **Les étiquettes se posent avec `disposer`, jamais `poser`** : au-dessus de chaque lame
  vivent son nom chimique **et sa lettre**, son étiquette de rôle, sa borne et sa masse —
  **quatre étiquettes par lame**, dans une colonne étroite. *Obligatoire ici ; famille
  `etiquettes` à 1 280 **et** à 390 px.*
- **La valeur qu'on règle et la valeur qu'on lit vont ENSEMBLE sur la scène collante**
  (leçon de la vague 2 du banc de diffraction) : « $U = 6{,}0$ V » sur le générateur,
  « $I = 0{,}200$ A » sur l'ampèremètre, « 45 min » sur le chronomètre, « $+0{,}183$ g » sur
  la balance de la lame (A). La liste des lectures défile ; la paillasse, non.

---

## 7. Les cinq étapes

**Câblage → durée → courant → comptage → invariance.** Notation : `⟂-avant-pari` = ce qui
doit être **absent du DOM et du rendu** tant que l'élève n'a pas parié (ADR 0041 §6 +
addendum du 2026-09-23 soir : *tout ce qui dépend de l'ISSUE attend la révélation*).

### 7.1 S1 — `on-echange-les-fils` · « On échange les deux fils »

- **État :** `u_v: "6.0"`, `cablage: "oppose"`, `i_ma: "200"`, `duree_s: "1800"`.
- **`etat_revele` :** `cablage: "accord"`.
- **Contrôle ouvert :** `branchement` (**neuf**). **Lectures :** `fem`, `intensite`,
  `duree` — et `sens` **après révélation seulement**.
- **Consigne (voix) :** « La cellule des quatre premiers chapitres, sur la paillasse. À
  gauche, la lame de **cuivre (B)** dans sa solution ; à droite, la lame de **zinc (A)**
  dans la sienne ; entre les deux, le pont salin. En haut, le générateur : sa borne
  **plus** est à **gauche**, sa borne **moins** à **droite** — lis-les sur le dessin, elles
  ne sont pas toujours du même côté. Il est réglé sur **6,0 volts**, bien au-dessus de la
  force électromotrice propre de la cellule — environ 1,1 volt, le chapitre 4 vient de
  l'établir. Sur le fil de gauche, un **rhéostat** : c'est lui qui maintient le courant à
  **0,200 ampère**, quoi qu'il arrive. Dans ce branchement-là, tu le sais depuis le
  chapitre 2 : le zinc se dépose, le cuivre se dissout. On va maintenant **échanger les
  deux fils** — la borne plus sur le **zinc (A)** — sans rien changer d'autre. »
- **Pari :** « Les deux fils échangés, la lame de zinc (A)… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `se-dissout-anode` | se **dissout** : c'est maintenant la borne **plus** qui l'alimente, donc l'oxydation s'y produit — elle est devenue l'**anode** | **oui** | — | « Oui, et **retiens le mécanisme, pas le résultat** : la borne **plus** **tire** les électrons hors du métal qu'elle alimente ; une espèce à son contact doit donc en céder — $Zn \rightleftharpoons Zn^{2+} + 2\,e^-$, une **oxydation**, donc une **anode**. Le rôle n'est attaché ni au métal, ni au côté du dessin : **il est attaché à la borne**. Et remarque ce qui vient de se passer en plus : dans ce branchement, la cellule évolue dans son **sens spontané** — le générateur ne force plus rien, il accompagne. » |
| `grossit-toujours` | continue de **grossir** : le zinc est la cathode de cette cellule, c'est une propriété du couple, pas du câblage | non | **`polarite-comme-pile`** *(le rôle attaché au métal)* | « La lame (A) s'est dissoute. Aucune électrode n'est « la cathode de cette cellule » une fois pour toutes : **anode** et **cathode** nomment ce qui S'Y PRODUIT, et en électrolyse c'est le générateur qui décide où se produit quoi. Le tableau du chapitre 3 gardait le zinc du côté du moins parce qu'on n'y touchait jamais aux fils ; ici on y touche, et la même lame passe de cathode à anode sans qu'on ait changé un atome. Échange les fils dans un sens puis dans l'autre. » |
| `se-dissout-cathode` | se dissout, et elle reste donc la **cathode** : c'est la lame qui perd de la matière | non | **`polarite-comme-pile`** *(nom et mécanisme confondus)* | « Le sens est juste, le nom ne l'est pas — et c'est le seul mot de tout le chapitre qui ne change **jamais** de camp : **anode = oxydation, cathode = réduction**, dans une pile comme dans un électrolyseur. Une lame qui se dissout cède des électrons : c'est une oxydation, donc une **anode**. Ce qui s'inverse entre pile et électrolyse, c'est la **polarité** associée à ce nom, jamais le nom lui-même. » |
| `rien-sous-le-seuil` | ne change pas : il faudrait d'abord **redépasser le seuil de 1,1 volt dans l'autre sens** pour que quoi que ce soit s'inverse | non | **`seuil-tension-continu`** *(le seuil pris pour une propriété de la cellule)* | « La lame (A) s'est dissoute tout de suite. **Le seuil du chapitre 4 n'est pas une propriété de la cellule : c'est le prix à payer pour forcer le sens que la chimie refuse.** Dans ce branchement-ci, le générateur pousse dans le sens que la cellule veut déjà — il n'y a rien à vaincre, et il n'y a donc rien à dépasser. » |

- **`suite` (36 mots) :** « Repasse les deux câblages. Regarde trois choses changer de côté
  **ensemble** : l'aiguille de l'ampèremètre, la flèche du courant sur les fils, et les
  deux étiquettes **anode** et **cathode**. Ce sont les trois faces d'un même fait. »
- **⟂-avant-pari :** les deux **étiquettes de rôle** ; l'aiguille et les flèches ; toute
  modification des lames et du bain ; le bouton « Lancer » ; le verdict ; tout pixel
  d'accent ; la description lue ne doit contenir ni « anode », ni « cathode », ni
  « oxydation », ni « se dissout ».
  **Reste visible :** la paillasse à l'encre, les lames intactes avec leur nom et leur
  lettre, le générateur avec ses signes `+` à **gauche** et `−` à **droite** (l'énoncé que
  la consigne vient de nommer), le rhéostat, `fem` = **environ 1,1 V**, `intensite` =
  **0,200 A**, `duree` = **30 min = 1 800 s**.
- **Interdit pendant S1** (§7.6 C) : `masse`, `g)`, `pèse`, `balance` *(en position de
  valeur)*, `I\Delta t`, `Q =`, `charge`, `coulomb`, `n(e^-)`, `mol`, `F`, `Faraday`,
  `9,65`.

### 7.2 S2 — `deux-fois-plus-longtemps` · « Deux fois plus longtemps »

- **État :** `u_v: "6.0"`, `cablage: "oppose"`, `i_ma: "200"`, `duree_s: "2700"`.
- **`etat_revele` :** `duree_s: "5400"`.
- **Contrôle ouvert :** `duree` (**neuf**). **Lectures :** `fem`, `sens`, `intensite`,
  `duree`, `masse-zinc`.
- **Consigne :** « Retour au branchement forcé : borne plus sur le cuivre (B), le zinc (A)
  se dépose. Le rhéostat **maintient le courant à 0,200 ampère** du début à la fin — c'est
  ce que fait un vrai montage, et c'est ce que les sujets veulent dire quand ils écrivent
  « courant d'intensité constante ». On a laissé tourner **45 minutes** : on a pesé la
  lame (A) avant et après, et le dépôt fait **0,183 gramme**. On va refaire exactement la
  même manipulation pendant **1 heure 30**, deux fois plus longtemps. »
- **Pari :** « Au bout d'1 h 30, le dépôt de zinc pèsera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `double` | **0,366 g** — deux fois plus | **oui** | — | « Oui. Et voici **pourquoi**, parce que c'est le mécanisme qu'il faut tenir : le rhéostat **maintient le courant**, donc il passe autant de charge dans la deuxième seconde que dans la première, et autant dans la trois-millième. **Chaque seconde apporte exactement autant que la précédente** — regarde la balance monter pendant la course, elle monte à vitesse constante. Deux fois plus de temps, deux fois plus de zinc. Parcours les trois durées sans toucher à rien d'autre : **0,122** · **0,183** · **0,366** gramme. » |
| `inchangee` | **0,183 g** — la même : à courant maintenu, c'est la **tension** qui fixe la quantité déposée, et elle n'a pas changé | non | **NOUVEAU `tension-decide-la-quantite`** *(§8.2, forme A)* | « La balance affiche **0,366**, le double. La tension n'a effectivement pas changé — et la masse a changé quand même. **La tension décide si le dépôt a lieu ; à courant maintenu, elle ne décide pas de combien il y en a.** Ce qui s'accumule, c'est ce qui passe dans le fil pendant qu'on attend. Laisse tourner 30 minutes, puis 45, puis 1 h 30 : 0,122 · 0,183 · 0,366. » |
| `quadruple` | **0,732 g** — quatre fois plus : on double la durée, **et** on double du même coup ce qui a circulé | non | **NOUVEAU** *(forme C — le facteur compté deux fois)* | « Le doublement est compté deux fois. La durée double, et **c'est tout ce qui double** : ce qui a circulé pendant cette durée est la même chose que ce qu'on mesure. La balance affiche **0,366**, pas 0,732. » |
| `sous-lineaire` | **0,275 g** — plus qu'à 45 minutes, mais pas le double : le dépôt qui s'épaissit freine la suite | non | **NOUVEAU** *(forme C — la proportionnalité perdue)* | « L'intuition est bonne pour beaucoup de phénomènes, et elle est fausse ici : la balance affiche **0,366**, le double exact. La couche déposée ne gêne pas la suivante — le courant est **maintenu** à 0,200 ampère du début à la fin. Lis la balance au fil de la course : elle monte à vitesse constante, sans jamais ralentir. » |

*(Arithmétique vérifiée. $Q(0{,}200 ; 2\,700) = 540$ C et
$540\times3{,}388\,601\times10^{-4} = 0{,}182\,984 \to 0{,}183$ g ✓ ·
$Q(0{,}200 ; 5\,400) = 1\,080$ C et $1\,080\times3{,}388\,601\times10^{-4} = 0{,}365\,969
\to 0{,}366$ g ✓ · $Q(0{,}200 ; 1\,800) = 360$ C et $0{,}121\,990 \to 0{,}122$ g ✓ · le
distracteur `quadruple` $= 4\times0{,}183 = 0{,}732$, qui est la masse de
$(0{,}400\ \text{A} ; 1\ \text{h}\ 30)$ — **inatteignable à S2**, `courant` étant fermé ✓ ·
`sous-lineaire` $= 1{,}5\times0{,}183 = 0{,}274\,5 \to 0{,}275$, valeur que le banc **ne
produit à aucun réglage** ✓.)*

- **`suite` (34 mots) :** « Les trois durées, sans rien toucher d'autre : 30 min, 45 min,
  1 h 30 donnent **0,122** · **0,183** · **0,366** gramme. Écris les durées à côté : 1 800,
  2 700, 5 400 secondes. Les deux suites sont dans le même rapport. »
- **⟂-avant-pari :** la lecture `charge` ; la balance **au-delà** de sa valeur de départ ;
  la lame épaissie au-delà de son état de départ ; le chronomètre en marche ; le bouton
  « Lancer » ; le verdict ; tout pixel d'accent ajouté ; la description lue ne doit contenir
  ni « double », ni « 0,366 », ni « proportionnelle ».
  **Reste visible :** la paillasse, l'aiguille et les étiquettes de rôle (acquis de S1, et
  la consigne les énonce), `intensite` = **0,200 A**, `duree` = **45 min = 2 700 s**, et
  `masse-zinc` = **+0,183 g** — *c'est la mesure que la consigne vient d'énoncer ; ce qui
  est en jeu, c'est ce qu'elle devient.*
- **Interdit pendant S2** : `I\Delta t`, `I \times \Delta t`, `Q =`, `charge`, `coulomb`,
  `n(e^-)`, `mol`, `F`, `Faraday`, `9,65`. *S2 peut écrire « proportionnelle à la durée » ;
  elle ne peut pas écrire le produit.* **Et aucun retour de S2 ne nomme le COURANT comme
  quelque chose qu'on pourrait changer** (§7.6 B).

### 7.3 S3 — `deux-fois-moins-de-courant` · « Deux fois moins de courant »

- **État :** `u_v: "6.0"`, `cablage: "oppose"`, `i_ma: "200"`, `duree_s: "5400"`.
- **`etat_revele` :** `i_ma: "100"`.
- **Contrôles ouverts :** `courant` (**neuf**) **et `duree` (hérité de S2, §5.6)**.
  **Lectures :** `fem`, `sens`, `intensite`, `duree`, `masse-zinc` — et `charge` **après
  révélation seulement**.
- **Consigne :** « Même montage, même **1 h 30** — et le dépôt pèse **0,366 gramme**, tu
  viens de le voir. Cette fois, on règle le rhéostat pour maintenir le courant à
  **0,100 ampère** au lieu de 0,200 : deux fois moins de courant, pendant exactement la
  même durée. »
- **Pari :** « Avec deux fois moins de courant pendant la même durée, le dépôt pèsera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `moitie` | **0,183 g** — deux fois moins | **oui** | — | « Oui — et la relation est maintenant complète, puisqu'on a fait varier les deux grandeurs. Ce qui décide de la masse, c'est la **quantité d'électricité** qui a traversé la cellule : $$Q = I\,\Delta t$$ **le courant multiplié par la durée**, en **coulombs**. Vérifie-le autrement, sans division : $0{,}100 \times 5\,400 = 540$ et $0{,}200 \times 2\,700 = 540$ — deux réglages, la même charge, et la balance affiche **0,183 gramme** dans les deux cas. Les deux contrôles sont ouverts : essaie. » |
| `inchangee` | **0,366 g** — la même : c'est la tension (6,0 V) qui décide, et elle n'a pas bougé | non | **NOUVEAU** *(forme A)* | « La balance affiche **0,183**, la moitié. La tension n'a pas bougé, et la masse a été divisée par deux : **la tension ne figure pas dans ce calcul**. Elle a servi une fois, au chapitre 4, pour que le sens s'impose ; tout le reste se joue entre le courant et la durée. » |
| `quart` | **0,091 g** — quatre fois moins | non | **NOUVEAU** *(forme C — le rapport mis au carré)* | « Le rapport est appliqué deux fois. Diviser le courant par deux divise la masse par **deux**, pas par quatre : la balance affiche **0,183**. Pour obtenir 0,091 gramme il faudrait diviser **et** le courant **et** la durée — les deux contrôles te permettent d'essayer. » |
| `rien` | **0,000 g** — rien du tout : à 0,100 ampère, le courant est trop faible pour qu'un dépôt se forme | non | **NOUVEAU** *(forme C — un facteur lu comme une condition à franchir ; §8.1)* | « Il y a bien un seuil dans cette leçon, et il n'est pas là. **Le seuil du chapitre 4 est sur la TENSION, et il décide du SENS.** Le courant, lui, n'est pas une condition à franchir : c'est un **facteur** de la charge, et il ne décide que de la **cadence**. À 0,100 ampère le dépôt se forme, deux fois plus lentement, et la balance affiche 0,183 gramme. Lance et regarde-la monter — plus doucement, mais elle monte. » |

*(Arithmétique vérifiée. $Q(0{,}100 ; 5\,400) = 540$ C $\Rightarrow 0{,}183$ g ✓ ·
$Q(0{,}200 ; 5\,400) = 1\,080$ C $\Rightarrow 0{,}366$ g ✓ ·
$Q(0{,}400 ; 5\,400) = 2\,160$ C $\Rightarrow 0{,}732$ g ✓ · le distracteur `quart`
$= 0{,}366/4 = 0{,}0915 \to 0{,}091$ g, qui est la masse de
$(0{,}100\ \text{A} ; 45\ \text{min})$ — **atteignable**, et c'est voulu : le retour y
envoie ✓ · les deux couples de même charge : $0{,}100\times5\,400 = 540 =
0{,}200\times2\,700$ ✓ et $0{,}200\times5\,400 = 1\,080 = 0{,}400\times2\,700$ ✓.)*

- **`suite` (44 mots) :** « Cherche les deux paires de réglages qui déposent **exactement**
  la même masse. $0{,}100$ A pendant 1 h 30 et $0{,}200$ A pendant 45 min : **0,183 g** tous
  les deux, **540 C** tous les deux. $0{,}200$ A pendant 1 h 30 et $0{,}400$ A pendant
  45 min : **0,366 g**, **1 080 C**. Ce qui décide, c'est le **produit**. »
- **⟂-avant-pari :** la lecture `charge` ; la balance au-delà de sa valeur de départ ; la
  lame épaissie ; le chronomètre en marche ; le bouton « Lancer » ; le verdict ; tout pixel
  d'accent ajouté ; la description lue ne doit contenir ni « moitié », ni « 0,183 », ni
  « produit », ni « coulomb ».
  **Reste visible :** `intensite` = **0,200 A**, `duree` = **1 h 30 = 5 400 s**,
  `masse-zinc` = **+0,366 g** — *les trois mesures que la consigne décrit.*
- **Interdit pendant S3** : `n(e^-)`, `n(e⁻)`, `mol`, `F`, `\mathcal{F}`, `Faraday`,
  `faraday`, `9,65`, `C·mol`. *S3 peut écrire $Q = I\,\Delta t$ **entière** avec son
  unité ; elle ne peut pas compter les électrons.*

### 7.4 S4 — `combien-d-electrons` · « Combien de moles d'électrons ont traversé ? »

- **État :** `u_v: "6.0"`, `cablage: "oppose"`, `i_ma: "400"`, `duree_s: "5400"`.
- **`etat_revele` :** *aucun* — le réglage que la question décrit est déjà posé ; la course
  révèle (§15.7).
- **Contrôle neuf : aucun.** `courant` et `duree` sont **rouverts** pour la `suite`
  (§5.6). **Lectures :** `fem`, `sens`, `intensite`, `duree`, `charge`, `masse-zinc`,
  `masse-cuivre` — et `quantite-electrons` **après révélation seulement**.
- **Consigne :** « Dernière mesure avant la synthèse. Rhéostat sur **0,400 ampère**,
  **1 heure 30** : la charge vaut $0{,}400 \times 5\,400 = \mathbf{2\,160}$ coulombs, et la
  balance affichera **0,732 gramme** de zinc — tu peux le retrouver à l'étape précédente.
  On te donne deux choses de plus, et elles ne viennent pas d'une mesure : la masse molaire
  du zinc, $\mathbf{65{,}4}$ grammes par mole, et la demi-équation de la cathode,
  $Zn^{2+} + 2\,e^- \rightleftharpoons Zn$. **Attention à la route :** on ne sait pas encore
  quelle charge porte une mole d'électrons — c'est justement ce que l'étape suivante va
  mesurer. La seule route ouverte part donc de la **balance**. »
- **Pari :** « Combien de moles d'électrons ont traversé la cellule pendant cette
  manipulation ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `deux-par-atome` | **$2{,}239\times10^{-2}$ mol** | **oui** | — | « Oui. La balance donne d'abord les atomes : $n(Zn) = \dfrac{0{,}732}{65{,}4} = 1{,}119\times10^{-2}$ mole. Puis la demi-équation donne les électrons : **chaque atome déposé en a consommé DEUX**, donc $n(e^-) = 2\,n(Zn) = \mathbf{2{,}239\times10^{-2}}$ mole. Retiens le sens de la flèche : on est parti d'une **pesée**, on a traversé une **demi-équation**, on est arrivé à un **nombre d'électrons** — sans jamais avoir eu besoin de savoir quelle charge ils portent. C'est précisément ce qui rend l'étape suivante possible. » |
| `un-par-atome` | **$1{,}119\times10^{-2}$ mol** — autant d'électrons que d'atomes de zinc déposés | non | **`faraday-stoechiometrie-electronique`** | « C'est le nombre d'**atomes** de zinc, pas celui des électrons : $0{,}732/65{,}4 = 1{,}119\times10^{-2}$ mole. La demi-équation $Zn^{2+} + 2\,e^- \rightleftharpoons Zn$ dit qu'il en a fallu **deux** pour chacun d'eux. Il est passé **deux fois plus** d'électrons que d'atomes déposés : $2{,}239\times10^{-2}$ mole. » |
| `moitie` | **$5{,}596\times10^{-3}$ mol** — on divise par 2, comme dans l'exemple du chapitre 5 | non | **`faraday-stoechiometrie-electronique`** | « La division par 2 existe bien, et elle va dans l'autre sens. Au chapitre 5, on **partait** des électrons pour **arriver** aux atomes : $n(Zn) = n(e^-)/2$. Ici on part des atomes : il faut donc **multiplier** par 2, pas diviser. $n(e^-) = 2 \times 1{,}119\times10^{-2} = 2{,}239\times10^{-2}$ mole — et un coup d'œil suffisait : il ne peut pas être passé **moins** d'électrons que d'atomes déposés. » |
| `charge-en-moles` | **$2{,}16\times10^{3}$ mol** — la quantité d'électricité qui a traversé, exprimée en moles | non | **`faraday-calcul-unites`** | « 2 160 est une **charge**, en coulombs : ce n'est pas un nombre de moles, et les deux ne se convertissent pas en changeant d'étiquette. Deux mille moles d'électrons dans un bécher de laboratoire serait d'ailleurs absurde — l'ordre de grandeur doit alerter. Passer d'une charge à une quantité de matière demande un facteur de conversion, et **c'est exactement ce que l'étape suivante va mesurer**. » |

*(Arithmétique vérifiée. $Q = 0{,}400\times5\,400 = 2\,160$ C ✓ ·
$m = 2\,160\times3{,}388\,601\times10^{-4} = 0{,}731\,938 \to 0{,}732$ g ✓ ·
$n(Zn) = 0{,}732/65{,}4 = 1{,}119\,266\times10^{-2} \to 1{,}119\times10^{-2}$ mol ✓ ·
$n(e^-) = 2\times1{,}119\,266\times10^{-2} = 2{,}238\,532\times10^{-2} \to
2{,}239\times10^{-2}$ mol ✓ · le distracteur `moitie` $= 1{,}119\,266\times10^{-2}/2 =
5{,}596\,3\times10^{-3} \to 5{,}596\times10^{-3}$ ✓.)*

- **`suite` (42 mots) :** « Refais le comptage à deux autres réglages. $0{,}200$ A pendant
  1 h 30 : **1 080 C**, **0,366 g**, **$1{,}119\times10^{-2}$ mol** d'électrons.
  $0{,}100$ A pendant 45 min : **270 C**, **0,091 g**, **$2{,}783\times10^{-3}$ mol**. Le
  rapport des électrons suit celui des charges, à chaque fois. »
- **⟂-avant-pari :** la lecture `quantite-electrons` ; le bouton « Lancer » ; le verdict ;
  tout pixel d'accent ajouté ; la description lue ne doit contenir ni « deux électrons par
  atome », ni « 2,239 », ni « multiplie ».
  **Reste visible :** `charge` = **2 160 C**, `masse-zinc` = **+0,732 g**, `masse-cuivre` =
  **−0,711 g**, `intensite` = **0,400 A**, `duree` = **1 h 30 = 5 400 s**, la demi-équation
  **à double flèche** — *tout ce que la consigne énonce ; ce qui est en jeu, c'est le
  nombre qu'on en tire.*
- **Interdit pendant S4** : `F`, `\mathcal{F}`, `Faraday`, `faraday`, `9,65`, `C·mol`,
  `C.mol`, `constante de Faraday`. *S4 peut écrire « la charge que porte une mole
  d'électrons » — **la chose**, sans son nom ni sa valeur ; c'est ce qui permet à sa
  consigne de fermer la route de $Q/F$ (§3, tension 2) sans donner S5.*

### 7.5 S5 — `on-double-la-tension` · « On double la tension : que devient tout cela ? »

- **État :** `u_v: "6.0"`, `cablage: "oppose"`, `i_ma: "400"`, `duree_s: "5400"`.
- **`etat_revele` :** `u_v: "12.0"`.
- **Contrôle ouvert :** `tension` (**neuf**) ; **les trois autres sont rouverts**
  (étape libre). **Lectures :** les **neuf**.
- **Consigne :** « Exactement la même manipulation : branchement forcé, rhéostat sur
  **0,400 ampère**, **1 h 30**. À 6,0 volts, elle a donné **2 160 coulombs**, **0,732
  gramme** de zinc et **$2{,}239\times10^{-2}$ mole** d'électrons. On va maintenant monter
  le générateur à **12,0 volts — deux fois plus** — et **le rhéostat continuera de tenir
  l'aiguille sur 0,400 ampère** : c'est son rôle, et c'est ce que veut dire « courant
  d'intensité constante » dans les énoncés d'examen. »
- **Pari :** « À 12,0 volts, la **charge**, la **masse déposée**, et le **nombre de
  coulombs par mole** qu'on obtient en divisant la première par la quantité de matière
  d'électrons… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `rien-ne-bouge` | **aucun des trois ne bouge d'un chiffre** | **oui** | — | « Oui — et c'est la phrase à emporter de tout ce chapitre. **La tension décide SI la transformation forcée a lieu, et dans quel sens ; à courant maintenu constant, c'est la charge $Q = I\,\Delta t$ qui décide de COMBIEN.** Regarde les trois lectures : $2\,160$ C, $0{,}732$ g, et le quotient $$F = \frac{Q}{n(e^-)} = \frac{2\,160}{2{,}239\times10^{-2}} \approx \mathbf{9{,}65\times10^{4}\ \text{C·mol}^{-1}}$$ Ce nombre porte un nom : c'est la **constante de Faraday**, la charge que porte **une mole d'électrons**. Tu viens de la **mesurer** — avec une balance, un chronomètre, un ampèremètre et une demi-équation, et rien d'autre. Elle ne dépend de rien : ni du métal, ni du bain, ni du réglage, ni de la tension. C'est pour cela qu'on peut la tabuler une fois pour toutes, et c'est pour cela qu'elle vaut la même chose dans ton énoncé d'examen et dans ce bécher. » |
| `tout-double` | la charge et la masse **doublent** toutes les deux (deux fois plus de volts, deux fois plus de tout) ; le quotient, lui, ne bouge pas | non | **NOUVEAU `tension-decide-la-quantite`** *(forme A)* | « Regarde l'ampèremètre : **0,400 ampère**, à 6,0 volts comme à 12,0. C'est le rhéostat qui le tient — c'est son seul rôle. Or la charge, c'est le courant **multiplié par la durée** : ni l'un ni l'autre n'a changé, donc $Q$ vaut toujours **2 160 C**, et la balance affiche toujours **0,732 g**. La tension n'apparaît dans aucun de ces deux calculs. » |
| `masse-seule-double` | la charge ne bouge pas (le courant est tenu), mais la masse **double** parce que le générateur pousse plus fort ; le quotient est donc **deux fois plus petit** | non | **NOUVEAU** *(forme A — et elle se contredit)* | « Suis ta propre phrase jusqu'au bout : si la même charge déposait deux fois plus de zinc, il faudrait que les mêmes électrons aient déposé deux fois plus d'atomes. Il n'y a **rien d'autre** que les électrons pour déposer les atomes, et la demi-équation en demande deux par atome — toujours deux. La balance affiche **0,732 g** aux deux tensions, et le quotient ne bouge pas. » |
| `quotient-varie` | la charge et la masse ne bougent pas, mais le **nombre** obtenu change quand même : il dépend des conditions de la manipulation | non | **NOUVEAU `faraday-constante-universelle`** *(§8.2)* | « Si les deux nombres qu'on divise ne bougent pas, leur quotient ne peut pas bouger — c'est de l'arithmétique avant d'être de la chimie. Et c'est plus profond que ça : ce quotient vaut **$9{,}65\times10^{4}$ coulombs par mole** ici, et il vaudrait la même chose avec un autre métal, un autre bain, un autre courant, une autre durée. C'est la charge d'**une mole d'électrons** — et un électron porte la même charge partout. Parcours les trois tensions, puis les neuf couples : le nombre ne bouge pas. » |

*(Arithmétique vérifiée. $F = 2\,160/2{,}239\times10^{-2} = 96\,471{,}6 \to
9{,}65\times10^{4}$ C·mol⁻¹ ✓, **aux trois tensions**, puisque ni $Q$ ni $n(e^-)$ n'en
dépendent — c'est la ligne N12 de la porte.)*

- **`suite` (48 mots) :** « Trois vérifications. **Un :** refais la mesure aux neuf couples
  — $9{,}65\times10^{4}$ partout, **sauf** à $0{,}100$ A pendant 45 min, où le plus petit
  dépôt (0,091 g) arrondi au milligramme donne $9{,}70\times10^{4}$ : fais durer les
  manipulations. **Deux :** divise $0{,}732$ par $65{,}4$ et $0{,}711$ par $63{,}5$ — même
  nombre de moles, deux masses différentes. **Trois :** échange les fils ; les deux balances
  changent de signe et le nombre ne bouge pas. »
- **⟂-avant-pari :** la lecture `faraday-mesure` ; la balance au-delà de sa valeur de
  départ ; le bouton « Lancer » ; le verdict ; tout pixel d'accent ajouté ; la description
  lue ne doit contenir ni « 9,65 », ni « Faraday », ni « constante », ni « universelle », ni
  « ne bouge pas ».
  **Reste visible :** `tension` = **6,0 V**, `intensite` = **0,400 A**, `duree` =
  **1 h 30 = 5 400 s**, `charge` = **2 160 C**, `masse-zinc` = **+0,732 g**,
  `quantite-electrons` = **$2{,}239\times10^{-2}$ mol** — *les cinq mesures que la consigne
  énonce ; ce qui est en jeu, c'est ce qu'elles deviennent.*

### 7.6 Le contrat « avant le pari », et les trois formes de la fuite

**Règle générale, valable aux cinq étapes.** Ce qui dépend de l'ISSUE — l'aiguille, les
flèches, les étiquettes de rôle, l'état des lames, la balance au-delà de son départ, et
toute lecture que la consigne n'a pas énoncée — **n'existe pas dans le DOM avant
l'engagement**, ni dans le rendu, ni dans la phrase lue au lecteur d'écran. Ce qui reste,
c'est l'énoncé : la paillasse à l'encre, les instruments à zéro, et les **valeurs que la
consigne vient d'énoncer**.

#### A — la fuite par les RÉGLAGES

La porte **réécrit elle-même** cette table contre le descripteur (§11.2,
`fuite-inter-etapes`) :

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `branchement` seul (2) | les 2 câblages, à un seul réglage | **non** pour S2/S3 : `duree` et `courant` fermés, **et aucune lecture de masse n'existe à S1**. **non** pour S4/S5 : `quantite-electrons` et `faraday-mesure` n'existent pas. |
| **S2** | `duree` seul (3 crans) | 3 durées, à $I = 0{,}200$ A seulement | **non** pour S3 : `courant` fermé — la variation en $I$ est hors d'atteinte, et la lecture `charge` n'existe pas. **non** pour S4/S5 : lectures absentes. |
| **S3** | `courant` (neuf) **+ `duree` (hérité)** | les **9** couples, donc les 7 charges et les 7 masses | **non** pour S4 : `quantite-electrons` **n'existe dans le DOM à aucune étape antérieure à S4**. **non** pour S5 : `tension` est fermé (un seul réglage de tension atteignable) **et** `faraday-mesure` n'existe pas. |
| **S4** | aucun neuf ; `courant` et `duree` rouverts | les 9 couples, plus le comptage | **non** pour S5 : `tension` toujours fermé, `faraday-mesure` toujours absent. |
| **S5** | les quatre | tout | — |

#### B — la fuite par les RETOURS (table neuve, vague 1, pédagogie 11)

*Chaque `retour` d'une étape est relu contre le pari de l'étape SUIVANTE. C'est la
cinquième forme de la fuite (ADR 0036), après l'affichage, le réglage ouvert, la donnée et
la relation — et elle ne se voit qu'en lisant les textes les uns contre les autres.*

| les retours de… | ce qu'ils disent | menacent-ils le pari suivant ? |
|---|---|---|
| **S1** | les noms, les bornes, les demi-équations, « le générateur accompagne » | **non** : aucun ne nomme une masse, une durée ni une quantité |
| **S2** | « proportionnelle à la durée », les trois masses, « chaque seconde apporte autant » | ⚠️ **une fuite trouvée et supprimée.** Le retour de `quadruple` se terminait par « *par exemple 1 h 30 avec **deux fois plus de courant**, ce que tu pourras essayer à l'étape suivante* » — il donnait le sens de variation du pari de S3. **Phrase retirée.** Règle posée pour cette scène : **aucun retour de S2 ne nomme le COURANT comme quelque chose qu'on pourrait changer.** |
| **S3** | $Q = I\,\Delta t$, les deux couples de même charge, « le courant est un facteur, pas une condition » | **non** : aucun ne compte d'électrons. *Vérifié mot à mot : les quatre retours ne contiennent ni « mole », ni « électron » en position de quantité.* |
| **S4** | le chemin balance → demi-équation → électrons, et « on ne sait pas encore quelle charge porte une mole d'électrons » | **non**, et c'est même le contraire : cette phrase **prépare** S5 sans en donner l'issue. Elle ne dit ni la valeur, ni le nom, ni que ce nombre est invariant. |
| **S5** | tout | — |

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*Correctif de la vague 1 (pédagogie 5) : la frontière se pose **par étape**, consigne
**et** retours — et non « après la révélation de… ». Une consigne a le droit d'imprimer ce
que son propre énoncé exige ; c'est ce que fait celle de S2 en donnant « 0,183 gramme ».*

| pendant l'étape… | **autorisé** (consigne + retours + lectures) | **interdit** |
|---|---|---|
| **S1** | `anode`, `cathode`, `oxydation`, `réduction`, les demi-équations **à double flèche**, `sens`, `borne`, `rhéostat`, `intensité`, `A`, `volt`, `V` | `masse`, `g)`, `pèse`, `dépôt de … gramme`, `\Delta t` **en position de grandeur variable**, `I\Delta t`, `Q =`, `charge`, `coulomb`, `C)`, `n(e^-)`, `mol`, `F`, `Faraday`, `9,65` |
| **S2** | + `masse`, `g`, `pèse`, `balance`, `\Delta t`, `durée`, `minute`, `seconde`, « proportionnelle à la durée » | `I\Delta t`, `Q =`, `charge`, `coulomb`, `C)`, `n(e^-)`, `mol`, `F`, `Faraday`, `9,65` |
| **S3** | + $Q = I\,\Delta t$ **entière**, `charge`, `coulomb`, `C` | `n(e^-)`, `n(e⁻)`, `mol`, `F`, `\mathcal{F}`, `Faraday`, `9,65`, `C·mol`, `C.mol` |
| **S4** | + `n(e^-)`, `mol`, `quantité de matière d'électrons`, « deux électrons par atome », « la charge que porte une mole d'électrons » *(la chose, sans son nom)* | `F`, `\mathcal{F}`, `Faraday`, `faraday`, `9,65`, `C·mol`, `C.mol`, `constante` *(en position de nom propre)* |
| **S5** | tout | — |

*Note : le mot « **électron** » est autorisé **dès S1** (les demi-équations en parlent, et
R1 les a déjà écrites) ; ce qui est interdit avant S4, c'est de **compter** des électrons —
donc les chaînes `n(e^-)`, `n(e⁻)`, `mol`. La porte cherche ces formes-là, pas le mot
« électron » seul.*

**Une fuite molle, écrite franchement.** Un élève qui a fait S3 arrive à S4 en sachant que
la masse suit $I\,\Delta t$ ; un élève qui a fait S4 arrive à S5 en sachant que le nombre
d'électrons se lit sur la balance. **Ce n'est pas une fuite au sens de la règle** : la règle
interdit d'**atteindre l'état** qu'un pari fait deviner, pas de comprendre la physique qui y
mène — et les nombres que S4 et S5 demandent ($2{,}239\times10^{-2}$ mol et
$9{,}65\times10^{4}$ C·mol⁻¹) ne sont produits par aucun réglage accessible avant eux.
**S4 et S5 doivent être gagnables par le raisonnement.**

---

## 8. Misconceptions

Les **huit** modèles déclarés de la notion vivent dans `items.yaml:3-35` sous le préfixe
`mc.physics.pc_electrolyse.`. Les comptes sont **au niveau ITEM**, méthode
`coverage_summary` déclarée en fin de fichier (`items.yaml:1464-1469`) : **24 items**,
plancher **3**, `floor_met: true`, et un `honest_state` qui prévient que « *trois y siègent
EXACTEMENT (3 items) : la marge est nulle et tout retrait d'item la casse* ». **Les paris de
scène ne comptent pas.**

**Cette notion emploie `contradicts_principle`** sur ses huit modèles (`items.yaml:7`,
`:11`, `:15`, `:19`, `:23`, `:27`, `:31`, `:35`) — contrairement à `lois-de-newton`. Les
**deux** modèles neufs en portent un (§8.2).

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions visées | compte actuel (items) |
|---|---|---|
| **S1** | `polarite-comme-pile` (×2 formes) · `seuil-tension-continu` | 5 · 7 |
| **S2** | **`tension-decide-la-quantite`** (formes A, C ×2) | **0 — à créer** |
| **S3** | **`tension-decide-la-quantite`** (formes A, C ×2) | **0** |
| **S4** | **`faraday-stoechiometrie-electronique`** (×2 formes) · `faraday-calcul-unites` | **6** · **4** |
| **S5** | **`tension-decide-la-quantite`** (forme A ×2) · **`faraday-constante-universelle`** | **0** · **0 — à créer** |

**S4 est l'étape que la vague 1 a rendue au banc d'items** (BLOQUANT 2). Sa consigne ne
donne plus $n(e^-) = 2m/M$ : elle donne la masse, la masse molaire et la demi-équation, et
**demande le comptage**. Elle devient donc la seule étape de la scène qui confronte un
modèle **déjà couvert** — `faraday-stoechiometrie-electronique`, 6 items, le modèle le plus
servi de la notion — et c'est exactement ce qu'il faut : *le geste qu'elle exerce
(demi-équation → électrons) est celui que six items chiffrent, et qu'aucune figure ne fait
faire.*

**Le distracteur `rien` de S3 a changé de modèle, et il faut le dire** (correctif de la
vague 1, pédagogie 10). Il était attribué à `seuil-tension-continu` : « *à 0,100 A, le
courant est trop faible pour qu'un dépôt se forme* ». Mais `seuil-tension-continu` porte sur
le **SENS** de l'évolution — sa `contradicts_principle` (`items.yaml:27`) s'arrête à « *C'est
un seuil NET, pas un curseur continu* » — et l'erreur ici porte sur une **QUANTITÉ**. Le
distracteur passe donc sous la **forme C** du modèle neuf, dont la `description` le nomme
explicitement (« *l'une des deux grandeurs est lue comme une condition à franchir plutôt que
comme un facteur* »). *Effet mesuré : `seuil-tension-continu` n'est plus nourri que par un
seul choix de scène (S1, `rien-sous-le-seuil`), où il est chez lui.*

**Ce que la scène ne confronte PAS, écrit à côté de ce qu'elle confronte** (ADR 0035) :

- `sens-force-vs-spontane` (4 items) : traité par les chapitres 1 et 2 et par
  `cp-r0-predict` ; la scène **suppose** le forçage acquis. *Hors champ, volontairement : la
  scène est au chapitre 5.*
- `electrolyse-source-energie` (3 items, **au plancher exact**) : la scène **ne chiffre
  aucune énergie** (§9.4) et ne peut donc pas la confronter sur sa propre conséquence.
  *Hors champ, et c'est un renoncement réel.*
- `sens-courant-electrons` (3 items, **au plancher exact**) : la scène **dessine** la flèche
  des électrons à contresens du courant conventionnel, et la porte le mesure (§11.2,
  `electrons-a-contresens`) — mais **aucun pari ne l'interroge**. *Servi visuellement, pas
  confronté.*
- `bilan-matiere-electrodes` (3 items, **au plancher exact**) : les deux masses sont
  affichées à S4 et S5 et la `suite` de S5 invite à la double division, mais **aucun pari
  ne l'interroge**, et la scène ne montre **aucun rapport autre que 1:1** (les deux
  demi-équations ont le même $z = 2$). *Le rapport $2{:}1$ des gaz est R5, hors scène
  (§9.7). **Reste dû.***

### 8.2 Deux modèles neufs — et pourquoi ils sont DEUX

**La mesure qui les justifie, et elle est vérifiable en trois commandes.**

1. **Aucun des 24 items ne donne une tension à employer.** `grep -n "U = \|tension"
   content/pc/electrolyse/items.yaml` ⇒ les seules occurrences sont dans les **trois** items
   du seuil (ELECTROLYSE-12, 13, 14), où $U$ est comparée à $E$ — **jamais** employée dans
   un calcul de quantité.
2. **Aucune des 9 entrées de banque ne donne une tension.** Les neuf donnent $I$ (« courant
   d'intensité constante ») et $\Delta t$, et rien d'autre du côté électrique.
3. **$F$ est donnée 100 % du temps et déterminée 0 % du temps** (§0.1 a) : aucun énoncé du
   corpus ne demande jamais à l'élève ce que ce nombre EST, ni s'il dépend de quoi que ce
   soit.

> **Conséquence : un élève qui croit que la tension décide de la quantité déposée, ou que
> $F$ est une propriété du métal, répond juste aux 24 items et aux 31 questions de banque.**
> Aucun énoncé ne lui donne jamais de tension à mettre dans une formule, et aucun ne lui
> demande jamais d'où vient $F$. Les deux modèles sont **structurellement invisibles** dans
> le corpus actuel — exactement l'argument qui a fait ouvrir `figure-ombre-geometrique` au
> banc de diffraction, `moment-force-direction-vs-axe` au manège et
> `acceleration-traitee-comme-un-nombre` au tremplin.

**Pourquoi DEUX et non un seul** (correctif de la vague 1 : pédagogie 6 + fidélité F5). La
première version les fondait en un modèle à quatre formes. Deux objections, toutes deux
justes :

- **la forme B doublait un modèle existant.** « Au-dessus du seuil, plus on dépasse, plus la
  transformation est poussée » est **littéralement** la fausse affirmation d'ELECTROLYSE-14
  (`items.yaml:802-805`), qui vit déjà sous `seuil-tension-continu`. **Forme B retirée** ; le
  distracteur C d'ELECTROLYSE-25 la porte, sous `seuil-tension-continu`, où elle est chez
  elle.
- **la forme D n'était pas du même genre.** « $F$ dépend du métal » n'est pas une erreur sur
  *ce qui fixe une quantité* : c'est une erreur sur *la nature d'une constante*. Un compteur
  qui les mélange ne dit plus lequel tourne — même arbitrage qu'au manège, aux noyaux et au
  tremplin. **Forme D devient un modèle.**

```yaml
  - id: mc.physics.pc_electrolyse.tension-decide-la-quantite
    label: "« La quantité transformée se lit sur la tension » (la tension prise pour ce qui compte, à la place de la charge Q = I·Δt)"
    description: >-
      L'élève fait décider la quantité de matière transformée par la TENSION du
      générateur, au lieu de la charge Q = I·Δt. Deux formes. Forme A — la tension
      dans la loi : à courant maintenu constant, la masse déposée croîtrait avec U
      (« deux fois plus de volts, deux fois plus de dépôt »), ou l'élève écrit
      Q = U·Δt, ou il compense une durée plus courte en montant la tension, ou il
      conclut d'une consommation d'énergie plus grande à une production plus
      grande. Forme C — la charge lue comme autre chose qu'un produit :
      l'intensité seule décide (« un fort courant dépose beaucoup, même
      brièvement »), ou la durée seule décide, ou le facteur est compté deux fois
      (doubler la durée quadruplerait la masse), ou la proportionnalité est perdue
      (le dépôt « freinerait » en s'épaississant), ou — et c'est la forme la plus
      trompeuse — l'une des deux grandeurs est lue comme une CONDITION À FRANCHIR
      plutôt que comme un FACTEUR (« en dessous d'un certain courant, rien ne se
      dépose »), par transport du seuil de tension du chapitre précédent.
      Ce modèle répond CORRECTEMENT à tout exercice du corpus actuel : aucun des
      24 items et aucune des 31 questions de banque ne donne une tension, donc il
      n'y a jamais d'occasion de s'en servir à tort. Il ne se révèle qu'en faisant
      VARIER la tension à charge constante, ou la charge à tension constante.
    contradicts_principle: "À COURANT MAINTENU CONSTANT — ce que fait tout montage d'électrolyse, et ce que veut dire « intensité constante » dans les énoncés —, la tension décide SI la transformation forcée a lieu et dans quel sens (U > E) ; la charge Q = I·Δt décide de COMBIEN. La relation m = M·I·Δt/(z·F) ne contient aucune tension. Sans rhéostat, monter la tension ferait monter le courant, donc le dépôt : c'est pour cela que les énoncés précisent l'intensité constante."

  - id: mc.physics.pc_electrolyse.faraday-constante-universelle
    label: "« La constante de Faraday dépend du métal, du bain ou du réglage » (F prise pour une propriété de l'expérience au lieu d'une constante universelle)"
    description: >-
      L'élève traite F comme une grandeur propre à l'expérience. Trois visages.
      (1) Propriété du MÉTAL : « le faraday du zinc vaut le double de celui d'un
      métal qui n'échange qu'un électron » — le z de la demi-équation est absorbé
      dans la constante. (2) Propriété du RÉGLAGE : diviser le courant par deux
      diviserait F par deux (le quotient suit son numérateur), ou monter la tension
      le changerait. (3) Propriété du BAIN ou du MONTAGE : il faudrait « mesurer le
      faraday de son bain » avant de pouvoir calculer quoi que ce soit, ou deux
      manipulations différentes doivent donner deux valeurs différentes. Ce modèle
      est invisible dans le corpus : F est DONNÉE dans 100 % des énoncés et
      DÉTERMINÉE dans 0 % (travaux pratiques du cadre, couverture 0 %), donc
      l'élève n'a jamais l'occasion de se demander d'où elle vient.
    contradicts_principle: "F est la charge que porte UNE MOLE D'ÉLECTRONS : une constante universelle, la même quels que soient le métal, le bain, le courant, la durée et la tension — parce qu'un électron porte la même charge partout. Ce qui change d'une électrolyse à l'autre, c'est le z de la demi-équation et la masse molaire, jamais F. C'est précisément ce qui permet de la tabuler une fois pour toutes."
```

**Note de rédaction pour item-author, à ne pas perdre.** Ces champs sont des méta-données
d'auteur, jamais rendues. Ils sont écrits **sans $E^\circ$, sans Nernst, sans surtension,
sans énergie chiffrée et sans aucune loi $I(U)$** — les deux modèles sont ceux du chapitre,
comme la scène (§1, §9).

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige qu'un `misconception:` employé par un **pari de scène** soit
**déclaré dans `items.yaml` au moment où la scène est validée**. **Les deux** modèles passent
donc **avant** le descripteur dans l'ordre de construction (§12).

**Voie de repli si l'un ou l'autre n'est pas adopté.** Pour `tension-decide-la-quantite` :
les choix passent sous `seuil-tension-continu`, dont il faudrait amender `description` et
`contradicts_principle` — *je ne la recommande pas :* ce serait **gonfler** le modèle que la
REVIEW signale déjà, qui passerait à $16/29 = 55\%$ de la couverture-distracteur. Pour
`faraday-constante-universelle` : les choix passent sous
`faraday-stoechiometrie-electronique`, qui monterait à $10/29$ — *je ne la recommande pas
davantage :* on ne saurait plus distinguer « je me trompe de $z$ » de « je crois que $F$
change ».

### 8.3 Les cinq items que ces deux modèles exigent (specs pour item-author)

Plancher de couverture : **≥ 3 items** dont au moins un distracteur porte le modèle. **Les
paris de la scène ne comptent pas.** Total après :
**`tension-decide-la-quantite` : 4 items, marge 1** ·
**`faraday-constante-universelle` : 3 items, marge 0 — déclarée.**

**Conventions de ce fichier, à respecter à la lettre** (vérifiées) : `id`, `rung`,
`difficulty_level`, `skill_code`, `tags`, `primary_misconception`, `stem`, `type: mcq`,
`choices` (chacun `id` A/B/C/D, `text`, `correct`, et pour les faux `misconception:` +
`feedback:`), `correct_feedback`, `solution`. **`items.yaml` de cette notion ne porte AUCUN
champ `habilete:` (0 occurrence sur 24 items) : ne pas en ajouter** — ce serait un
changement de schéma, pas une décision d'item (`DECISIONS-EN-ATTENTE` §3).
**`skill_code: pc_electrolyse`**. **Double flèche pour toute demi-équation, flèche simple
pour tout bilan** (`REVIEW-2026-09-19.md:8-36`) — le correctif le plus coûteux qu'ait connu
cette notion, ne pas le rouvrir.
*À vérifier avant écriture : les cliquets `indice-refus` et `indice-absolu`.
`items.yaml:137` et `:1036` portent deux refus de conclure, ce qui suggère que le cliquet
n'est pas armé ici. **Les cinq items ci-dessous n'en portent aucun.***

---

**ELECTROLYSE-25** — `rung: "R4"`, `difficulty_level: 3`,
`primary_misconception: mc.physics.pc_electrolyse.tension-decide-la-quantite`

- *stem :* Deux électrolyses de la même solution de sulfate de cuivre(II), avec les mêmes
  électrodes. **Un rhéostat placé en série permet de maintenir l'intensité à
  $I = 0{,}50\ \text{A}$ dans les deux essais.** **Essai 1 :** le générateur est réglé sur
  $U = 4{,}0\ \text{V}$, pendant $\Delta t = 20\ \text{min}$. **Essai 2 :** le générateur est
  réglé sur $U = 12{,}0\ \text{V}$, pendant la même durée. Les deux tensions dépassent le
  seuil de la cellule. Comment se comparent les masses de cuivre déposées ?
- *clé (A) :* elles sont **égales** — la même quantité d'électricité
  $Q = I\,\Delta t = 600\ \text{C}$ a traversé la cellule dans les deux essais, et la tension
  ne figure pas dans la loi de Faraday.
- *distracteurs :*
  - (B) « L'essai 2 dépose **trois fois plus** de cuivre : la tension y est trois fois plus
    grande. » → **`tension-decide-la-quantite`, forme A**. `feedback` : le rhéostat maintient
    la même intensité dans les deux essais, et la durée est la même : $Q = 0{,}50\times1\,200
    = 600\ \text{C}$ des deux côtés. La tension ne figure nulle part dans
    $m = M\,I\,\Delta t/(z\,F)$.
  - (C) « L'essai 2 dépose **un peu plus** : au-dessus du seuil, plus on le dépasse, plus la
    transformation est poussée. » → **`seuil-tension-continu`**. `feedback` : le
    franchissement du seuil est **net**, pas graduel. Dès que $U$ dépasse $E$, le sens forcé
    l'emporte **totalement** ; le dépasser davantage ne « pousse » pas la transformation plus
    loin.
  - (D) « On ne peut pas les comparer : l'essai 2 a consommé **davantage d'énergie
    électrique**, il a donc forcément produit davantage. » →
    **`tension-decide-la-quantite`, forme A**. `feedback` : la prémisse est exacte — à même
    intensité et même durée, une tension plus grande fait consommer davantage. La conclusion
    ne l'est pas : cette énergie supplémentaire ne fabrique pas un atome de plus, elle se
    dissipe en chaleur, notamment dans le rhéostat. **Ce qui est déposé se compte en
    électrons, et les électrons se comptent en coulombs**, pas en joules.
- *solution :* $\Delta t = 20\times60 = 1\,200\ \text{s}$ ; $Q = I\,\Delta t =
  0{,}50\times1\,200 = 600\ \text{C}$ dans les deux essais. Comme $n(e^-) = Q/F$ et
  $n(Cu) = n(e^-)/2$, les deux masses sont **identiques**.
- *arithmétique (vérifiée) :* $0{,}50\times1\,200 = 600$ ✓ ·
  $n(e^-) = 600/9{,}65\times10^{4} = 6{,}22\times10^{-3}$ mol ✓ ·
  $n(Cu) = 3{,}11\times10^{-3}$ mol ✓ · $m = 3{,}11\times10^{-3}\times63{,}5 = 0{,}197 \to
  0{,}20$ g ✓ *(les nombres d'ELECTROLYSE-6, sur une autre question)*.

**ELECTROLYSE-26** — `rung: "R4"`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* Une électrolyse dépose $0{,}183\ \text{g}$ de zinc en $45\ \text{min}$, sous un
  courant maintenu constant à $I = 0{,}200\ \text{A}$. On veut déposer **exactement la même
  masse** en maintenant cette fois le courant à $I' = 0{,}400\ \text{A}$. **Quelle durée
  faut-il ?**
- *clé (A) :* $\Delta t' = 1\,350\ \text{s} = 22{,}5\ \text{min}$ — la charge
  $Q = I\,\Delta t$ doit rester la même, donc diviser la durée par deux quand on double
  l'intensité.
- *distracteurs :*
  - (B) « $45\ \text{min}$, inchangée : pour compenser, il suffit de **doubler la tension du
    générateur**. » → **forme A**. `feedback` : la tension ne figure pas dans le calcul d'une
    masse. À $0{,}400$ A pendant $45$ min, la charge vaut $1\,080\ \text{C}$ — le double de
    ce qu'on veut —, et aucun réglage de tension ne la ramènera à $540$.
  - (C) « $90\ \text{min}$ : on a doublé le courant, il faut donc doubler aussi la durée. » →
    **forme C**. `feedback` : le rapport est retourné. Les deux grandeurs se **multiplient** :
    doubler l'une oblige à **diviser** l'autre pour garder le même produit. À $0{,}400$ A
    pendant $90$ min, $Q = 2\,160\ \text{C}$ — **quatre fois** la charge visée.
  - (D) « $11{,}25\ \text{min}$ : le courant est doublé, donc la durée est divisée par
    quatre. » → **forme C**. `feedback` : le rapport est appliqué deux fois. Doubler
    l'intensité demande de diviser la durée par **deux**, pas par quatre :
    $0{,}400\times675 = 270\ \text{C}$, la moitié de ce qu'il faut.
- *solution :* $Q = I\,\Delta t = 0{,}200\times2\,700 = 540\ \text{C}$. À la même charge :
  $\Delta t' = Q/I' = 540/0{,}400 = 1\,350\ \text{s} = 22{,}5\ \text{min}$.
- *arithmétique (vérifiée) :* $45\times60 = 2\,700$ ✓ · $0{,}200\times2\,700 = 540$ ✓ ·
  $540/0{,}400 = 1\,350$ ✓ · $1\,350/60 = 22{,}5$ ✓ · $0{,}400\times2\,700 = 1\,080$ ✓ ·
  $0{,}400\times5\,400 = 2\,160$ ✓ · $11{,}25\times60 = 675$ et
  $0{,}400\times675 = 270$ ✓ · la masse : $540\times65{,}4/(2\times9{,}65\times10^{4}) =
  0{,}182\,98 \to 0{,}183$ g ✓.

**ELECTROLYSE-27** — `rung: "R4"`, `difficulty_level: 4`,
`primary_misconception: mc.physics.pc_electrolyse.faraday-constante-universelle`
*(l'item d'**application expérimentale** — correctif de fidélité F3 ; le savoir-faire du TP,
couvert à 0 %)*

- *stem :* Pour déterminer la constante de Faraday, on réalise **trois essais** sur la même
  cellule : on dépose du zinc ($Zn^{2+} + 2\,e^- \rightleftharpoons Zn$) à courant maintenu
  constant, et on pèse la lame avant et après, **au milligramme**. On donne
  $M(Zn) = 65{,}4\ \text{g.mol}^{-1}$.

  | essai | quantité d'électricité $Q$ | masse déposée $m$ |
  |---|---|---|
  | 1 | $270\ \text{C}$ | $0{,}091\ \text{g}$ |
  | 2 | $540\ \text{C}$ | $0{,}183\ \text{g}$ |
  | 3 | $2\,160\ \text{C}$ | $0{,}732\ \text{g}$ |

  Les trois essais donnent-ils la même valeur de $F$, et lequel est le plus fiable ?
- *clé (A) :* les trois donnent **la même valeur à $0{,}6\ \%$ près** —
  $9{,}70\times10^{4}$, $9{,}65\times10^{4}$ et $9{,}65\times10^{4}\ \text{C.mol}^{-1}$ —
  et **l'essai 3 est le plus fiable** : la pesée est arrondie au milligramme dans les trois
  cas, et cet arrondi pèse d'autant moins lourd que le dépôt est gros.
- *distracteurs :*
  - (B) « Les trois donnent des valeurs différentes, et c'est normal : $F$ dépend de la
    quantité d'électricité qu'on a fait passer. » → **`faraday-constante-universelle`**.
    `feedback` : les trois valeurs ne sont pas égales **à cause de la pesée**, pas à cause de
    $F$ : elles s'écartent de $0{,}6\ \%$, pas d'un facteur. $F$ est la charge d'une mole
    d'électrons — si elle dépendait de la charge qu'on fait passer, elle ne serait pas une
    constante et on ne pourrait pas la tabuler.
  - (C) « On ne peut pas conclure avec un seul métal : il faudrait refaire les trois essais
    avec un autre métal pour savoir si la valeur trouvée est la bonne. » →
    **`faraday-constante-universelle`**. `feedback` : le métal intervient **une fois**, par
    le $z$ de sa demi-équation et par sa masse molaire — et les deux sont connus, pas
    mesurés. Une fois qu'on **compte des électrons**, le métal a disparu du calcul : un
    électron porte la même charge partout. Un second métal donnerait la même valeur, il ne la
    validerait pas davantage.
  - (D) « Les trois donnent environ $1{,}93\times10^{5}\ \text{C.mol}^{-1}$, et l'essai 3 est
    le plus fiable. » → **`faraday-stoechiometrie-electronique`**. `feedback` : le
    raisonnement sur la fiabilité est juste, le comptage ne l'est pas : ce résultat prend
    $n(e^-) = n(Zn)$. La demi-équation en demande **deux par atome** :
    $n(e^-) = 2\,n(Zn)$. Avec deux fois plus d'électrons au dénominateur, le quotient est
    deux fois plus petit.
- *solution :* pour chaque essai, $n(e^-) = 2\,m/M$ puis $F = Q/n(e^-)$.
  Essai 1 : $n(e^-) = 0{,}182/65{,}4 = 2{,}783\times10^{-3}$ mol, $F = 270/2{,}783\times
  10^{-3} = 9{,}70\times10^{4}$. Essai 2 : $n(e^-) = 0{,}366/65{,}4 = 5{,}596\times10^{-3}$
  mol, $F = 9{,}65\times10^{4}$. Essai 3 : $n(e^-) = 1{,}464/65{,}4 = 2{,}239\times10^{-2}$
  mol, $F = 9{,}65\times10^{4}$. L'écart maximal vaut $\dfrac{97\,018 - 96\,472}{96\,472} =
  0{,}57\ \%$. **Le plus gros dépôt donne la valeur la plus sûre** : le milligramme d'arrondi
  représente $1{,}1\ \%$ de $0{,}091$ g et $0{,}14\ \%$ de $0{,}732$ g.
- *arithmétique (vérifiée) :* $270/2{,}783\times10^{-3} = 97\,017{,}6$ ✓ ·
  $540/5{,}596\times10^{-3} = 96\,497{,}5$ ✓ · $2\,160/2{,}239\times10^{-2} = 96\,471{,}6$ ✓
  · $546/96\,472 = 0{,}005\,66 \to 0{,}57\ \%$ ✓ · $0{,}001/0{,}091 = 1{,}10\ \%$ ✓ ·
  $0{,}001/0{,}732 = 0{,}137\ \%$ ✓ · distracteur (D) : $2\,160/1{,}119\times10^{-2} =
  193\,030 \to 1{,}93\times10^{5}$ ✓.

**ELECTROLYSE-28** — `rung: "R6"`, `difficulty_level: 5`,
`primary_misconception: mc.physics.pc_electrolyse.tension-decide-la-quantite`

- *stem :* Un technicien doit déposer par électrolyse une **masse donnée** de métal sur une
  pièce, dans un bain donné, en un **temps imposé**. Il dispose d'une alimentation dont il
  peut régler la tension, et d'un rhéostat qui lui permet de maintenir l'intensité du courant
  à la valeur qu'il choisit. Sur quoi doit-il agir, et pourquoi ?
- *clé (A) :* il règle la **tension** juste assez pour que le sens forcé s'établisse
  (au-dessus du seuil de la cellule), puis il choisit l'**intensité** de façon que le produit
  $I\,\Delta t$ donne la masse voulue dans le temps imparti : **la tension décide si la
  transformation a lieu, la charge décide de combien**.
- *distracteurs :*
  - (B) « Il agit sur la **tension** seule, en la calculant à partir de la masse voulue :
    c'est elle qui fixe la quantité déposée. » → **`tension-decide-la-quantite`, forme A**.
    `feedback` : aucune relation du chapitre ne relie une masse à une tension. La masse se
    calcule par $m = M\,I\,\Delta t/(z\,F)$, où la tension ne figure pas. Régler la tension
    sans régler le courant, c'est choisir **si** ça marche sans choisir **combien**.
  - (C) « Il agit sur la **durée** seule : l'intensité ne change pas la masse finale, elle ne
    change que la vitesse à laquelle le dépôt se forme. » →
    **`tension-decide-la-quantite`, forme C**. `feedback` : la durée est **imposée** par
    l'énoncé, donc il ne peut pas agir dessus — et l'intensité change bel et bien la masse :
    à durée fixée, doubler l'intensité double la charge, donc double le dépôt. Ce n'est pas
    seulement une vitesse, c'est un **facteur du produit**.
  - (D) « Il doit d'abord mesurer la constante de Faraday **de son bain**, qui change d'un
    bain à l'autre, avant de pouvoir régler quoi que ce soit. » →
    **`faraday-constante-universelle`**. `feedback` : $F$ ne change pas d'un bain à l'autre —
    c'est la charge d'une mole d'électrons, la même partout. Ce qui change d'un bain à
    l'autre, c'est le **$z$ de la demi-équation** et la **masse molaire** du métal, qui se
    lisent tous les deux sans aucune mesure.
- *solution :* la tension fixe le **sens** (condition $U > E$, un oui/non) ; la charge
  $Q = I\,\Delta t$ fixe la **quantité**, par $m = \dfrac{M\,I\,\Delta t}{z\,F}$. La durée
  étant imposée, la seule inconnue de réglage est $I = \dfrac{z\,F\,m}{M\,\Delta t}$.

**ELECTROLYSE-29** — `rung: "R6"`, `difficulty_level: 4`,
`primary_misconception: mc.physics.pc_electrolyse.faraday-constante-universelle`

- *stem :* Deux binômes déterminent la constante de Faraday à partir de deux électrolyses
  différentes. Le binôme 1 dépose du **zinc** ($Zn^{2+} + 2\,e^- \rightleftharpoons Zn$) ; le
  binôme 2 dépose de l'**argent** ($Ag^+ + e^- \rightleftharpoons Ag$). Ils n'ont ni le même
  bain, ni la même intensité, ni la même durée, ni la même tension de générateur. Que
  doivent-ils trouver ?
- *clé (A) :* **la même valeur**, environ $9{,}65\times10^{4}\ \text{C.mol}^{-1}$ — $F$ est
  la charge d'**une mole d'électrons**, et un électron porte la même charge partout. Ce qui
  diffère d'un binôme à l'autre, c'est le $z$ de la demi-équation et la masse molaire du
  métal, pas $F$.
- *distracteurs :*
  - (B) « Le binôme 1 doit trouver **le double** du binôme 2, parce que le zinc échange deux
    électrons par atome là où l'argent n'en échange qu'un. » →
    **`faraday-constante-universelle`**. `feedback` : le facteur 2 existe, et il n'est pas
    dans $F$ : il est dans le passage de la **masse** aux **électrons**,
    $n(e^-) = 2\,n(Zn)$ pour le zinc et $n(e^-) = n(Ag)$ pour l'argent. Une fois ce passage
    fait, les deux binômes divisent une charge par un nombre d'électrons — et obtiennent la
    même chose.
  - (C) « Des valeurs **différentes**, puisque ni le bain, ni l'intensité, ni la durée, ni la
    tension ne sont les mêmes. » → **`faraday-constante-universelle`**. `feedback` : une
    constante ne dépend pas des conditions dans lesquelles on la mesure — c'est ce que le mot
    veut dire. Doubler l'intensité double la charge **et** le nombre d'électrons : le quotient
    ne bouge pas. Et la tension n'entre dans aucun des deux.
  - (D) « La même valeur, **à condition** qu'ils aient utilisé la même tension de
    générateur. » → **`tension-decide-la-quantite`, forme A**. `feedback` : la tension
    n'entre ni dans la charge ($Q = I\,\Delta t$), ni dans le comptage des électrons (qui
    part de la balance). Deux montages à des tensions différentes, mais à même intensité
    maintenue et même durée, donnent la même charge, la même masse et le même quotient.
- *solution :* pour chacun, $n(e^-) = z\,\dfrac{m}{M}$ puis $F = \dfrac{Q}{n(e^-)} =
  \dfrac{I\,\Delta t}{z\,m/M}$, avec $z = 2$ pour le zinc et $z = 1$ pour l'argent. Le $z$
  et la masse molaire sont **propres au métal** ; le quotient obtenu ne l'est pas.

**Après application :** `total_items: **29**` ;
`tension-decide-la-quantite: 4` (ELECTROLYSE-25, 26, 28, 29 — plancher atteint, **marge 1**)
; `faraday-constante-universelle: 3` (ELECTROLYSE-27, 28, 29 — plancher atteint, **marge
0**) ; `seuil-tension-continu: 7 → 8` (E-25 C) ;
`faraday-stoechiometrie-electronique: 6 → 7` (E-27 D) ; `faraday-calcul-unites` **inchangé
à 4** ; les quatre autres **inchangés**. `ramp_coverage` : **R4 : 4 → 7**, **R6 : 3 → 5**,
les cinq autres inchangés — total $3+4+4+3+7+3+5 = 29$ ✓. `coverage_summary` régénéré par
`node web/scripts/resume-couverture.mjs`, **jamais à la main**.

### 8.4 Ce que ce paquet NE referme pas, et il faut le dire

- **Un quatrième modèle passe à marge NULLE.** `faraday-constante-universelle` siège à
  exactement 3 items, comme `electrolyse-source-energie`, `sens-courant-electrons` et
  `bilan-matiere-electrodes` (`items.yaml:1499-1502`). **Quatre modèles sur dix seront à
  marge nulle**, et tout retrait d'item en cassera un. *C'est déclaré, pas maquillé ; §13.12
  propose un sixième item si le propriétaire veut de la marge.*
- **La sur-représentation du seuil passe de 29,2 % à 27,6 %** ($7/24$ puis $8/29$). Elle
  baisse de **1,6 point** et ne se referme pas : la réparation demandée est un **retrait** de
  contenu, et cette proposition n'en fait aucun. **Reste dû** (§13.2).
- **Le champ `habilete` n'existe sur aucun des 24 items** ; ajouter les cinq nouveaux ne rend
  donc **pas** calculable le mélange 5,0 / 1,5 / 3,5 du §1. **Non-verdict déclaré** (§0.3,
  §13.10).
- **ELECTROLYSE-27 est le seul des cinq à ressembler à une application expérimentale** — il
  lit un tableau de trois essais et juge une fiabilité. Les quatre autres sont d'utilisation
  et de résolution. *Et personne ne peut le mesurer autrement qu'à la lecture.*
- **La chaîne vers une DURÉE est désormais exercée par ELECTROLYSE-26** (correctif F7), mais
  **aucune étape de scène ne la demande**. La scène va de $(I ; \Delta t)$ vers $m$, puis de
  $m$ vers $F$. **Reste partiellement dû.**

---

## 9. La frontière de programme — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4, sabotage 24). *Liste inchangée depuis la
vague 1, sauf §9.16 (les trois ensembles de nombres, ajustés au nouveau montage) et la
mention du rhéostat au §9.3.*

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée absente que
> si l'on a énuméré ses FORMES*). Interdire « potentiel standard » sans interdire `E°`
> laisse passer le symbole ; interdire « surtension » sans interdire `\eta` laisse passer la
> lettre. Chaque ligne liste donc les **variantes d'écriture**, symbole et forme LaTeX
> comprises, et la porte les cherche dans le texte **RENDU** (après KaTeX, annotations TeX
> comprises — c'est la forme que le produit écrit, ADR 0039), pas dans la source. *Rappel de
> la porte des noyaux : `\b` ignore les accents — chercher en **début de mot** et en
> Unicode.*

1. **Aucun potentiel standard, aucune échelle de potentiels.** `exclusions` du sous-domaine
   (`pc-physique-chimie.yaml:532-533`) et `limites` (`:523`). Interdits : `E°`, `E^\circ`,
   `E^{\circ}`, `E^0`, `E0`, `potentiel standard`, `potentiel d'électrode`, `potentiel
   rédox`, `échelle des potentiels`, `ESH`, `électrode standard`, `hydrogène standard`,
   `Nernst`, `0,059`, `0{,}06/n`, `\log\frac{[Ox]}{[Red]}`, `RT/nF`.
2. **Aucune surtension, aucune cinétique électrochimique.** Garde déjà écrite dans la notion
   (`checkpoints.yaml:41`). Interdits : `surtension`, `surpotentiel`, `\eta`, `η`, `tension
   de décomposition`, `courbe intensité-potentiel`, `intensité-potentiel`, `i = f(E)`,
   `cinétique électrochimique`, `Tafel`, `densité de courant`, `A·m^{-2}`, `A/cm`.
3. **Aucune loi $I(U)$, aucune caractéristique, aucune résistance CHIFFRÉE.** §5.5 — c'est
   la frontière la plus structurante de cette scène, et celle qui rend la démonstration de
   S5 honnête. Interdits : `loi d'Ohm`, `Ohm`, `U = R\,I`, `U = RI`, `R =` *(en position de
   résistance)*, `résistance`, `résistance interne`, `r =`, `\Omega`, `ohm`, `conductance`,
   `conductivité`, `\sigma`, `caractéristique`, `I = f(U)`, `I(U)`, `droite de charge`,
   `point de fonctionnement`.
   *Le mot **« rhéostat »** est **autorisé** — c'est une pièce du montage, nommée et
   dessinée (§5.2) —, mais **aucune valeur de résistance n'est jamais affichée** : le banc
   ne dit que ce que le rhéostat FAIT (tenir le courant), jamais ce qu'il VAUT. La porte
   cherche les formes de la valeur, pas le nom de la pièce.*
4. **Aucune énergie chiffrée, aucune puissance.** La `limite` du cadre borne le quantitatif
   à « $Q = I\cdot t$ et la constante de Faraday » (`:525`). Interdits : `W =`, `W = U`,
   `\text{J}`, `joule`, `kWh`, `Wh`, `puissance`, `P = U`, `P = UI`, `watt`, `\text{W}`,
   `rendement énergétique`, `bilan énergétique`, `effet Joule` *(la leçon l'emploie en mots
   à `:55` ; la SCÈNE ne l'emploie pas)*.
5. **Aucune thermodynamique.** `exclusions` (`:534-535`). Interdits : `enthalpie`,
   `\Delta G`, `\Delta_r G`, `enthalpie libre`, `entropie`, `\Delta S`, `spontanéité
   thermodynamique`, `Gibbs`.
6. **Aucun rendement faradique, aucune réaction parasite.** Hors cadre, et la scène n'a
   qu'une réaction par électrode (§10.8). Interdits : `rendement faradique`, `rendement de
   l'électrolyse`, `réaction parasite`, `réaction secondaire`, `%` *(en position de
   rendement)*.
7. **Aucun gaz, aucun volume molaire — c'est R5 (chapitre 6).** Interdits : `V_m`, `volume
   molaire`, `22,4`, `24 L`, `25,0 L`, `L.mol`, `L·mol`, `mL`, `dihydrogène`, `H_2`, `H₂`,
   `dioxygène`, `O_2`, `O₂`, `dichlore`, `Cl_2`, `Cl₂`, `gaz`, `dégagement`, `bulle`.
8. **Aucune application, aucun autre métal — c'est R5 (chapitre 6) et la banque.**
   Interdits : `galvanoplastie`, `anode soluble`, `chromage`, `nickelage`, `argenture`,
   `dorure`, `aluminium`, `cryolithe`, `bauxite`, `accumulateur`, `batterie`, `recharge`,
   `Ag`, `argent`, `Ni`, `nickel`, `Al`, `Cr`, `chrome`, `Au`, `or`, `Pb`, `plomb`, `Br`,
   `I_2`, `Na`, `sel fondu`.
   *La formulation autorisée dans le panneau, et elle suffit : « **un métal dont l'ion
   n'échange qu'un électron par atome** ». **Les items, eux, ont le droit de nommer
   l'argent** (ELECTROLYSE-29) : ce §9 borne le PANNEAU, pas le banc.*
9. **Aucun $Q_r$, aucun $K$, aucun avancement chiffré.** Interdits : `Q_r`, `Q_{r,i}`,
   `Q_{r,éq}`, `K =`, `constante d'équilibre`, `quotient de réaction`, `avancement`,
   `x_{max}`, `\tau`, `taux d'avancement`, `tableau d'avancement`. *La chaîne « **sens
   spontané** » est **autorisée** : c'est le mot de la leçon, sans chiffre.*
10. **Aucune concentration chiffrée.** La scène suppose les concentrations constantes
    (§10.7). Interdits : `mol/L`, `mol.L`, `mol·L`, `[Zn^{2+}]`, `[Cu^{2+}]`, `C =`,
    `concentration`, `molaire` *(en position de concentration)*, `dilu`, `sature`.
11. **Aucun pH, aucun dosage, aucune acidité.** Interdits : `pH`, `pK`, `acide`, `basique`,
    `hydroxyde`, `HO^-`, `H^+`, `H_3O^+`, `indicateur coloré`, `équivalence`.
12. **Aucun graphe.** La scène n'en a pas (§2.6). Interdits : `pente`, `coefficient
    directeur`, `axe des abscisses`, `ordonnée à l'origine`, `graphe`, `courbe
    représentative`, `m = f(`, `Q = f(`, `en fonction de` *(en position de titre de
    graphe)*.
13. **Aucune incertitude chiffrée.** La scène a une **précision d'affichage**, pas une
    incertitude de mesure (§5.8). Interdits : `±`, `\pm`, `incertitude`, `écart-type`,
    `\sigma`, `erreur relative`, `précision relative`, `intervalle de confiance`,
    `répétabilité`.
14. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester indéfini même
    panneau OUVERT** — famille de porte à part entière.
15. **La scène n'est pas un TP et ne le prétend jamais.** Interdits : `travaux pratiques`,
    `TP`, `protocole`, `mode opératoire`, `manipulation à réaliser`, `blouse`, `pissette`,
    `rinçage`, `séchage`.
16. **Aucun nombre hors des trois grilles** *(ajusté à la vague 1 — correctif F8)*. Les
    seules **tensions** affichées sont $\{2{,}0 ; 6{,}0 ; 12{,}0\}$ V, plus la f.é.m.
    « **environ 1,1** » V (§5.4) ; les seules **intensités**,
    $\{0{,}100 ; 0{,}200 ; 0{,}400\}$ A ; les seules **durées**, $\{30 ; 45 ; 90\}$ min
    soit $\{1\,800 ; 2\,700 ; 5\,400\}$ s. *La porte relève l'ensemble exact des nombres
    suivis de `V`, **de `volt` et de `volts`**, de `A` et de `min`, et le compare aux trois
    ensembles (§11.3, `frontiere`). **12,0 V est déclarée ici** parce que c'est un cran réel
    du contrôle, et non une tournure de texte : la spec ne l'écrit « une tension deux fois
    plus grande » que dans les ITEMS (ELECTROLYSE-26 B), où aucun réglage ne l'impose.*
17. **La convention de flèche, dans les deux sens.** `pc-physique-chimie.yaml:520` et
    `REVIEW-2026-09-19.md:8-36`. **Toute ligne du panneau qui contient `e^-` doit porter
    $\rightleftharpoons$ ; aucune ligne sans `e^-` ne doit en porter.** Le discriminant est
    mécanique, il est déjà écrit dans la notion, et la porte l'applique aux deux
    demi-équations de S1 et à celle de S4 (§11.3, `fleches-chimiques`). *C'est le correctif
    le plus coûteux qu'ait connu cette notion (33 sites) : une scène qui le rouvrirait serait
    une régression payée deux fois.*

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Une paillasse calculée est plus crédible qu'une figure dessinée, donc plus dangereuse. Et
celle-ci affiche **une masse au milligramme** — l'affichage qui ressemble le plus à une
mesure.

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points 1 à 4
> SEULEMENT**, et ce sont aussi les phrases de légende. **Les points 5 à 9 ne sont rendus
> nulle part** : ce sont des notes de conception, pour l'auteur et pour la revue.

1. **L'épaisseur du dépôt est très exagérée, d'un facteur constant et déclaré.** Une
   fraction de gramme de zinc sur une lame de quelques centimètres carrés fait une couche de
   **quelques dizaines de micromètres** — invisible à l'œil, et invisible au pixel (0,22 px,
   §6.2). La scène l'épaissit toujours du **même** facteur, aux 27 états et aux deux lames :
   les **rapports** dessinés sont donc vrais (deux fois plus de masse, deux fois plus
   épais), seule la valeur absolue ne l'est pas. **Le nombre est sur la balance, jamais dans
   l'épaisseur.** *Légende :* « L'épaisseur du dépôt est dessinée bien plus grande qu'elle ne
   l'est — un dépôt réel de cette masse ferait quelques dizaines de micromètres. Le facteur
   est le même partout : deux fois plus de masse, deux fois plus épais. Le nombre, lui, est
   sur la balance. »
2. **On pèse la lame avant et après ; le banc affiche la différence.** Une balance ne se
   glisse pas sous une lame plongée dans un bain : dans un vrai montage, on sort la lame, on
   la rince, on la sèche et on la pèse. La scène affiche cette différence **au fil de la
   course**, comme si la pesée était continue — c'est une commodité de lecture, pas un
   instrument réel. *Légende :* « La masse affichée est celle qu'on obtiendrait en pesant la
   lame avant et après. Le banc la montre monter pendant la course ; dans un vrai montage,
   on pèse deux fois. »
3. **Un rhéostat maintient le courant ; l'ampèremètre affiche la même valeur à toutes les
   tensions.** C'est le montage du TP et c'est ce que veulent dire les énoncés quand ils
   écrivent « courant d'intensité constante ». **Sans ce rhéostat, monter la tension ferait
   monter le courant** — et le dépôt avec. Le banc ne montre pas ce cas, parce que la
   relation qui le chiffrerait n'est pas au programme de ce chapitre. *Légende :* « Un
   rhéostat maintient le courant à la valeur affichée, quelle que soit la tension : c'est ce
   que veut dire « intensité constante » dans un énoncé. Sans lui, monter la tension ferait
   monter le courant — et ce banc ne sait pas le chiffrer. »
4. **Le montage est dessiné en DEUX récipients reliés par un pont salin ; les sujets en
   dessinent le plus souvent UN seul.** C'est le montage de l'accroche de cette leçon (deux
   couples séparés), et c'est ce que le chapitre 1 décrit. Les énoncés d'examen, eux,
   dessinent d'ordinaire un **tube en U** avec deux électrodes plongées dans **la même
   solution** (`bank.yaml:786`, `:288`, `:1091`). Ce qui change, c'est le dessin — **pas un
   mot du raisonnement** : les électrodes se nomment de la même façon, et la loi de Faraday
   ne voit pas la différence. *Légende :* « Ici, deux récipients reliés par un pont salin —
   le montage de ce chapitre. Le jour de l'examen, tu verras le plus souvent un tube en U
   avec les deux électrodes dans la même solution : le dessin change, le raisonnement pas. »
5. *(non rendu — note de conception)* **La cellule est celle de la LEÇON, pas d'un sujet
   d'examen.** Zinc et cuivre, $I = 0{,}200$ A, $\Delta t = 1$ h 30 : tous ces nombres
   viennent de `lesson.md` (§5.1). Ce que la scène emprunte au bac, ce sont **la
   disposition** (borne `+` à gauche, lettres (A) et (B), trois sujets vérifiés) et **la
   formule « courant d'intensité constante »** (cinq entrées). La `caption_fr` porte cette
   provenance ; §13.9 est la question au propriétaire.
6. *(non rendu)* **La f.é.m. propre de la cellule est un ACQUIS du chapitre 4, rappelé et
   jamais interrogé.** « Environ 1,1 volt » : la valeur que donne un voltmètre aux bornes de
   cette cellule, générateur débranché — pas un calcul. Elle sert ici à une seule chose :
   justifier que les trois tensions du banc sont toutes au-dessus du seuil.
7. *(non rendu)* **Les concentrations sont supposées constantes, et la lame de cuivre
   réalimente le bain.** Sur 1 h 30 à 0,400 A, $1{,}12\times10^{-2}$ mole d'ions quittent un
   bécher et autant en rejoignent l'autre ; dans un bécher de laboratoire, cela change les
   concentrations. **Le banc tient tout cela fixe.** C'est l'idéalisation habituelle du
   chapitre — et c'est exactement ce que la leçon appelle plus loin une « anode soluble »
   (`lesson.md:245`), mot que la scène n'emploie pas (§9.8).
8. *(non rendu)* **Une seule réaction par électrode, et aucune perte.** Tout ce qui traverse
   le circuit sert au dépôt ; aucune réaction parasite, aucun rendement inférieur à 1. C'est
   ce que supposent les neuf entrées de banque, et ce que le chapitre demande — mais ce n'est
   pas ce que fait un vrai bain (§9.6).
9. *(non rendu)* **Retrouver $F$ n'est pas une découverte, c'est une vérification de
   cohérence.** Le banc calcule la masse **à partir** de la valeur admise de $F$ ; diviser la
   charge par les électrons la redonne forcément. Ce que la manipulation enseigne, c'est le
   **GESTE** — quelles grandeurs mesurer, dans quel ordre les combiner, et pourquoi la
   demi-équation est indispensable — pas la valeur. *Précédent exact : le banc de
   diffraction, §10.4 de sa spec (« leur égalité est construite, pas découverte »).* **Le
   seul écart que le banc produise vient d'un arrondi de pesée, et il est réel :
   $9{,}70\times10^{4}$ sur le plus petit dépôt** (§5.7 E). *§13.5.*

---

## 11. La porte (`web/scripts/scene-electrolyse.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="banc-electrolyse"]`, **jamais** par
`[data-scene]` seul (précédent : la porte de l'orbite ouvrant le chapitre du champ
magnétique, run 747). Elle se lance **plusieurs fois, à plusieurs largeurs** (1 280 px et
390 px au minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**,
**AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas
disponible au banc, elle sort **MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES** (règle de la
corde, ADR 0041). Elle les recalcule **sans importer aucun module du produit** (ADR 0036),
depuis les seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $Q = I\,\Delta t$ aux **9** couples | la table A du §5.7 | **égalité de chaîne** avec `charge`, 3 c.s., **unité C** |
| N2 | $m(Zn) = Q\,M(Zn)/(2F)$ aux 9 couples, arrondie au **milligramme** | la table B | égalité de chaîne, **3 décimales**, **signe +** en `oppose` |
| N3 | $m(Cu) = Q\,M(Cu)/(2F)$ aux 9 couples | la table C | égalité de chaîne, 3 décimales, **signe −** en `oppose` |
| N4 | **l'invariant du produit** : $(0{,}100 ; 5\,400)$ et $(0{,}200 ; 2\,700)$ affichent la MÊME chaîne pour `charge` **et** pour `masse-zinc` ; idem $(0{,}200 ; 5\,400)$ et $(0{,}400 ; 2\,700)$ | « 540 C » / « +0,183 g » et « 1 080 C » / « +0,366 g » | **identiques au caractère près** |
| N5 | $n(e^-) = 2\,m(Zn)/M(Zn)$ **sur la masse AFFICHÉE**, 4 c.s. | la table D | égalité de chaîne, **unité mol** |
| N6 | $F = Q/n(e^-)$ **sur les valeurs AFFICHÉES**, 3 c.s. | la table E — **9,65·10⁴ à six réglages, et 9,70·10⁴ au septième** ($Q = 270$ C) | égalité de chaîne, **unité C·mol⁻¹** ; *l'écart du septième DOIT se produire — une porte qui l'aplatirait raterait le fait pédagogique* |
| N7 | le `sens` aux **3 tensions × 2 câblages** | `oppose` ⇒ « sens imposé » ; `accord` ⇒ « sens spontané (le générateur accompagne) » | chaîne exacte, aux 9 couples |
| N8 | **`intensite` ne dépend pas de la tension** : aux 3 tensions, la chaîne affichée est **identique** et vaut exactement le réglage | « 0,100 A » · « 0,200 A » · « 0,400 A » | **égalité de chaîne, aux 27 états** — *c'est la garde du « aucune loi $I(U)$ », §5.5* |
| N9 | **l'invariance de $F$ au câblage** : en `accord`, `masse-zinc` change de **signe** et `faraday-mesure` **ne change pas d'un caractère** | — | exact, aux 9 couples |
| N10 | les **bornes** : `tension` a exactement 3 crans, `branchement` 2, `courant` 3, `duree` 3 ; aucune valeur intermédiaire | — | exact |
| N11 | la durée de la course mesurée **à l'horloge** = $\Delta t/900$ | 2,0 · 3,0 · 6,0 s | $\le 10\%$, page **au premier plan** |
| **N12** | **LA LIGNE DE LA DÉMONSTRATION** *(neuve, vague 1)* : pour **chacun des 9 couples $(I ; \Delta t)$**, les trois chaînes `charge`, `masse-zinc` et `faraday-mesure` sont **identiques au caractère près** aux **trois** tensions $2{,}0$, $6{,}0$ et $12{,}0$ V — soit **27 états** produisant **9** jeux de valeurs | — | **égalité de chaîne, exacte** ; *la colonne de la tension doit être MUETTE* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/cm de la paillasse est lu sur la **règle d'échelle** posée près des béchers, le
facteur px/g du dépôt sur le **témoin d'épaisseur** (leçon de la porte du champ magnétique).
Lancée à **1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `depot-a-l-echelle` | l'épaisseur **en pixels** de la couche déposée $=$ la masse affichée × le facteur lu sur le témoin, à $\le 2$ px, aux **9** réglages et aux **2** lames | une épaisseur dessinée depuis un autre nombre que celui affiché doit rougir ; une épaisseur **plafonnée** au-delà d'un seuil aussi |
| `echelle-constante` | le facteur px/g est **identique** aux **27** états, aux 2 lames et aux 2 câblages, à $\le 1\%$ ; et le facteur px/cm est le même horizontalement et verticalement | un facteur qui change d'un réglage à l'autre doit rougir **seul** ; **un dépôt dessiné plus épais à 12,0 V qu'à 6,0 V aussi** |
| `aiguille` | le côté de l'aiguille concorde avec la chaîne `sens` affichée, aux 6 états ; **et sa position sur le cadran est la MÊME aux trois tensions**, à $\le 1$ px | une aiguille du mauvais côté doit rougir **seule** ; une aiguille qui monte avec la tension aussi *(c'est la loi $I(U)$ interdite, dessinée)* |
| `courant-oriente` | la flèche du courant conventionnel sur le fil part de la borne **`+`** vers l'électrode qu'elle alimente, aux 2 câblages | la flèche retournée doit rougir **seule** |
| `electrons-a-contresens` | la flèche des électrons est **exactement opposée** à celle du courant, à $180° \pm 1°$ | deux flèches dans le même sens doivent rougir **seules** — *garde de `sens-courant-electrons`* |
| `etiquettes-electrodes` | « **anode** » est posée sur la lame reliée à la borne `+` et « **cathode** » sur celle reliée à la borne `−`, aux **2** câblages ; et les lettres **(A)** et **(B)** ne bougent jamais de leur lame | les deux étiquettes de rôle échangées doivent rougir **seules** ; une étiquette de rôle attachée au **métal** plutôt qu'à la borne aussi ; une lettre qui suit le rôle au lieu de la lame aussi |
| `lame-et-balance` | la lame dont la balance affiche un **+** est celle qui **épaissit** ; celle qui affiche un **−** est celle qui **s'amincit**, aux 2 câblages | une lame qui épaissit en affichant un `−` doit rougir |
| `teinte-du-bain` | pendant une course en `oppose`, l'**opacité** du bain de cuivre **croît** et celle du bain de zinc **décroît** (et l'inverse en `accord`) ; la **chrominance** des deux bains ne change **d'aucun pas** | une teinte qui vire doit rougir **seule** ; une opacité qui ne bouge pas aussi |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; aucune aiguille ; aucune flèche ; aucune étiquette de rôle ; lames intactes ; balances à `0,000` ou à la valeur que la consigne énonce ; chronomètre à `0` ; aucune lecture-réponse dans le DOM ; aucun bouton « Lancer » | après l'engagement : l'aiguille, les flèches, les étiquettes, le dépôt et les lectures apparaissent, et l'accent avec |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | un bain peint en bleu « parce que c'est du sulfate de cuivre » doit rougir **seul** |
| `formule-graduee` | **la table C du §7.6, étape par étape** : le panneau ne contient aucune des chaînes interdites de l'étape courante (consigne, retours, lectures et région vivante confondues), et contient bien celles que l'étape autorise et emploie | écrire $Q = I\,\Delta t$ dans un retour de S2, ou « constante de Faraday » dans un retour de S4, doit rougir **seule** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.6 contre le descripteur : `branchement` n'est ouvert qu'à S1 et S5, `duree` à S2, **S3**, S4 et S5, `courant` à S3, S4 et S5, `tension` **qu'à S5** ; **l'héritage est DÉCLARÉ** ; et `quantite-electrons` est **absente du DOM aux étapes 1 à 3**, `faraday-mesure` **aux étapes 1 à 4** | ouvrir `tension` dès S3, ou faire exister `faraday-mesure` à S4, doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles,
les autres **absents du DOM** ; `etat_revele` pose bien le réglage annoncé — **et pour S5,
l'engagement pose $u_v = 12{,}0$ AVANT la course, la révélation pose le verdict APRÈS**, les
deux temps du tremplin ; **S4 n'a pas d'`etat_revele`, et c'est déclaré**, §15.7) · `paris`
(4 choix, exactement un juste, un `retour` par choix, rien dans la région live avant
l'engagement) · **`frontiere`** (aucune des chaînes du §9 dans le panneau ouvert, **une
sonde par forme** ; et les trois ensembles de nombres du §9.16 relevés — `V`, **`volt`,
`volts`**, `A`, `min` — et comparés exactement) · **`fleches-chimiques`** (§9.17 : **toute
ligne contenant `e^-` porte $\rightleftharpoons$ ; aucune ligne sans `e^-` n'en porte** —
mesuré sur le rendu KaTeX, dans les deux sens) · `eclairs` (**attendu structurellement
vide**, mesuré quand même, §6.1) · `sans-mouvement` · `katex` (aucun LaTeX brut visible ;
$\rightleftharpoons$, $n(e^-)$, $\text{C·mol}^{-1}$, $\Delta t$ rendus) · `etiquettes`
(aucune étiquette n'en chevauche une autre, **ni le DESSIN sous une étiquette sans fond**,
n'est barrée par un trait, ni ne sort du cadre — à 1 280 **et** à 390 px ; pièce commune
`disposer`, **obligatoire** ici : quatre étiquettes par lame, §6.2) · `ergonomie` (pièce
commune `scripts/lib/scene-ergonomie.mjs`, argument `course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette
commande** (ADR 0034). Sabotages à outiller :

1. poser $m = Q\,M/F$ (**le $z$ manquant**) → `nombres` (N2, N3, N6) ;
2. poser $m = Q\,M\,z/(2F)$ → `nombres` (N2, N6) ;
3. poser $Q = I + \Delta t$ → `nombres` (N1), et **N4 seul** attrape l'invariant ;
4. **faire dépendre $m$ de $U$** (« $m \propto U$ », la misconception posée dans le code) →
   **N12 seule**, et `depot-a-l-echelle` ;
5. **faire dépendre $I$ de $U$** (l'ampèremètre qui monte avec la tension) → **N8 et N12**,
   et `aiguille` aux pixels ;
6. arrondir la masse au **centième** de gramme → `nombres` (N2) **et N6 seul** montre $F$ à
   $9{,}81\times10^{4}$ (§5.8) ;
7. **aplatir l'écart du septième réglage** (forcer $9{,}65\times10^{4}$ partout) → **N6
   seule** — *le fait pédagogique du §5.7 E est gardé comme un NOMBRE, pas comme une
   intention* ;
8. arrondir $n(e^-)$ à **3** chiffres au lieu de 4 → **N6 seule** ($F$ tombe à
   $9{,}64\times10^{4}$ sur le réglage de la leçon) ;
9. faire dépendre $F$ du câblage (recopier une branche `accord`) → **N9 seule** ;
10. faire varier le facteur d'épaisseur avec le réglage → `echelle-constante` **seule** ;
11. plafonner l'épaisseur du dépôt au-delà de 0,400 g → `depot-a-l-echelle` **seule** ;
12. retourner l'aiguille de l'ampèremètre → `aiguille` **seule** ;
13. retourner la flèche du courant conventionnel → `courant-oriente` **seule** ;
14. dessiner les électrons dans le même sens que le courant → `electrons-a-contresens`
    **seule** ;
15. attacher « cathode » au **zinc** quel que soit le câblage (la misconception
    `polarite-comme-pile` posée dans le code) → `etiquettes-electrodes` **seule** ;
16. faire suivre la lettre **(A)** au rôle au lieu de la lame →
    `etiquettes-electrodes` **seule** ;
17. faire épaissir la lame qui affiche un `−` → `lame-et-balance` **seule** ;
18. faire virer la teinte du bain du bleu au vert → `teinte-du-bain` **seule** ;
19. supprimer la variation d'opacité du bain → `teinte-du-bain` **seule** ;
20. afficher **une** étiquette de rôle, ou l'aiguille, ou un chiffre de balance, **avant** le
    pari → `avant-pari` ;
21. faire partir la course avant l'engagement → `etapes`, `avant-pari` ;
22. changer le facteur d'accélération avec la durée → **N11 seule** ;
23. écrire « $Q = I\,\Delta t$ » dans un retour de S2, ou « constante de Faraday » dans un
    retour de S4, ou « 0,183 gramme » dans un retour de S1 → `formule-graduee` **seule**,
    **une mesure par étape** ;
24. ouvrir `tension` dès S3, ou faire exister `faraday-mesure` à S4 → `fuite-inter-etapes`
    **seule** ;
25. écrire une demi-équation avec une flèche **simple**, puis un bilan avec une flèche
    **double** → `fleches-chimiques` **seule**, **dans les deux sens** ;
26. peindre un bain dans une teinte hors jetons → `palette` **seule** ;
27. `import("three")` dans le module de la scène → `pas-de-3d` ;
28. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `E°`, `Nernst`, `potentiel standard`,
    `ESH` · `surtension`, `\eta`, `Tafel` · `loi d'Ohm`, `U = RI`, `résistance`, `\Omega`,
    `I = f(U)`, `caractéristique` · `joule`, `\text{J}`, `puissance`, `watt` · `enthalpie`,
    `\Delta G` · `rendement faradique` · `V_m`, `volume molaire`, `dihydrogène`, `gaz`,
    `mL` · `galvanoplastie`, `anode soluble`, `aluminium`, `argent`, `accumulateur` ·
    `Q_r`, `K =`, `avancement` · `mol/L`, `concentration` · `pH`, `acide` · `pente`,
    `graphe` · `±`, `incertitude` · `TP`, `protocole` · **un nombre suivi de `V`, `volt` ou
    `volts` hors $\{1{,}1 ; 2{,}0 ; 6{,}0 ; 12{,}0\}$**, de `A` hors
    $\{0{,}100 ; 0{,}200 ; 0{,}400\}$, de `min` hors $\{30 ; 45 ; 90\}$.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est
    une **sonde manquante**, pas un produit propre.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui le
garde.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée, §13.14) :

```json
"banc-electrolyse": {
  "temps": false,
  "course": true,
  "dimension": "2d",
  "controles": ["branchement", "duree", "courant", "tension"],
  "etat": ["u_v", "cablage", "i_ma", "duree_s"],
  "valeurs": {
    "u_v": ["2.0", "6.0", "12.0"],
    "cablage": ["oppose", "accord"],
    "i_ma": ["100", "200", "400"],
    "duree_s": ["1800", "2700", "5400"]
  },
  "lectures": ["tension", "fem", "sens", "intensite", "duree", "charge",
               "masse-zinc", "masse-cuivre", "quantite-electrons",
               "faraday-mesure"]
}
```

*Aucune clé `bornes` : **tous** les réglages sont des crans (§5.3) — **aucune machinerie
nouvelle** dans `validate-content`. Les valeurs d'état sont des chaînes ; **l'affichage
emploie la virgule décimale française** (« 6,0 V »), jamais le point du descripteur.*

**Table des états, à recopier dans le descripteur :**

| étape | `u_v` | `cablage` | `i_ma` | `duree_s` | `etat_revele` | contrôle(s) ouvert(s) |
|---|---|---|---|---|---|---|
| S1 | `6.0` | **`oppose`** | `200` | `1800` | **`cablage: accord`** | `branchement` *(neuf)* |
| S2 | `6.0` | `oppose` | `200` | **`2700`** | **`duree_s: 5400`** | `duree` *(neuf)* |
| S3 | `6.0` | `oppose` | **`200`** | `5400` | **`i_ma: 100`** | `courant` *(neuf)* **+ `duree`** |
| S4 | `6.0` | `oppose` | `400` | `5400` | — *(§15.7)* | — ; `courant` et `duree` rouverts |
| S5 | **`6.0`** | `oppose` | `400` | `5400` | **`u_v: 12.0`** | `tension` *(neuf)* **+ les trois autres** |

Les cinq étapes portent `revele_apres_course: 1`.

**Champs du descripteur, au-delà des étapes** (modèle :
`content/pc/propagation-onde-lumineuse/media/banc-de-diffraction.json`) : `slug`,
`tool: "scene2d"`, `type: "manipulable"`, `scene: "banc-electrolyse"`, `title_fr`,
`caption_fr` (qui porte la provenance du §10.5), `boundary` (le §9 en une phrase dense),
`fit_caveat` (les points **1 à 4** du §10 **seulement**), `fallback_note`,
`pedagogy_wiring` (`why_manipulable`, `predict_then_reveal`, `misconceptions` — **les deux
ids neufs y figurent**), `spec_ref`, `adr_ref`.

**`fallback_note` proposée, et elle dit son coût réel** (correctif de la vague 1,
pédagogie 9) :

> « Sans JavaScript et à l'impression, le panneau disparaît — et **rien ne le remplace**.
> Les trois figures de cette leçon (la cellule, le seuil de tension, l'électrolyse de l'eau)
> montrent un montage et un mécanisme ; **aucune ne porte une masse, une durée ou une
> intensité**, donc aucune ne montre ce que ce banc enseigne : que le dépôt suit le produit
> $I\,\Delta t$, que la tension n'y entre pas, et qu'une pesée suffit à mesurer la constante
> de Faraday. **L'élève sans JavaScript perd ces trois faits** et doit s'en remettre aux
> paragraphes qui suivent, qui les écrivent en toutes lettres (§4.3 et §4.4). *Écrit ici
> plutôt que tu, et c'est un argument pour une figure de repli, pas contre la scène :
> §13.6.* »

**Ordre de construction, et ce qui doit être vert avant l'étape suivante :**

1. `items.yaml` — déclarer **les deux** modèles (§8.2) et écrire **ELECTROLYSE-25 à 29**
   (§8.3) ; régénérer `coverage_summary` (`node web/scripts/resume-couverture.mjs`,
   `total_items: 29`). **`validate-content --strict` vert avant la suite** (la scène ne
   validera pas sans les deux modèles).
2. `web/src/lib/scene2d/electrolyse-modele.ts` — $Q$, les deux masses, $n(e^-)$, $F$, le
   sens ; aucun rendu, aucune couleur. **La tension n'est un argument d'AUCUNE fonction de
   calcul** (c'est la façon la plus sûre de tenir N12), et **une seule fonction pour les deux
   câblages** (N9). Test unitaire `web/scripts/test-electrolyse.mjs` : les tables A, B, C, D,
   E du §5.7 à $10^{-12}$, les deux couples de même charge, l'invariance au câblage,
   **l'invariance aux trois tensions**, et **le septième réglage à $9{,}70\times10^{4}$**.
   *Le test vérifie la cascade sur les valeurs AFFICHÉES, pas sur les valeurs exactes*
   (§15.12).
3. `web/src/lib/scene2d/electrolyse-rendu.ts` — les deux béchers, le pont salin, le
   générateur et ses signes, le rhéostat, les fils et leurs flèches, l'ampèremètre et son
   aiguille, le chronomètre, les deux balances, **le témoin d'épaisseur et la règle
   d'échelle** (§6.2) ; palette lue dans les jetons (`lib/jetons-figure.ts`) ; étiquettes
   posées par `disposer`.
4. `web/src/components/notion/scene/ElectrolysePanel.tsx` — sur les pièces communes
   (`useSceneRendu`, `usePari`, `SceneOptIn`, `PariBloc`, `TransportEtapes`, `Plateau`),
   sans `VuesBloc`.
5. `scenes.json` + le descripteur `media/banc-electrolyse.json`.
6. Les blocs de prose du §4, **le §4.1 avant le marqueur**.
7. `web/scripts/scene-electrolyse.mjs` — la porte, **avec son `--essai-rouge`** ; lancée
   **deux fois à quatre largeurs** avant d'être crue.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

1. **LE PLACEMENT ET L'ÉTAPE DU SEUIL** (§0.2, §3 ; défaut appliqué à la vague 1).
   **Défaut : la scène est en tête de R4 et n'a pas d'étape de seuil.** *Pour défaire —
   tout est conservé par écrit :* (a) remettre le marqueur en tête de R3
   (`lesson.md:117`, avant `:119`) ; (b) rouvrir une étape S0 `sous-le-seuil`, état
   `u_v: "0"`, `etat_revele: u_v "0.9"`, contrôle `tension` avec les crans
   **0 · 0,9 · 1,1 · 2,0 · 6,0** V, pari « *à 0,9 volt, l'aiguille de l'ampèremètre…* »,
   quatre choix — *sens spontané freiné* (juste), *sens imposé faible* et *zéro*
   (`seuil-tension-continu`), *sens spontané renforcé* (`sens-force-vs-spontane`) — et une
   `suite` qui fait trouver le **courant nul à $U = E$ exactement**, le seul fait du
   chapitre 4 que la leçon n'écrit nulle part (`items.yaml:770-776` le porte seul) ; (c)
   rétablir la règle de chiffrage complète du §5.5 (« *le banc chiffre le courant exactement
   quand le générateur impose le sens* », avec le **zéro structurel** à $U = E$, jamais un
   $U - E$ flottant) ; (d) ajouter un paragraphe de prose à la fin de `lesson.md:139`, 35 à
   55 mots : *à $U = E$, le générateur compense exactement la tendance propre de la cellule,
   l'aiguille est à zéro, rien ne se dépose et rien ne se dissout — c'est pourquoi il faut
   **strictement** dépasser $E$* ; (e) la scène passe à **six** étapes, ou l'une des cinq
   actuelles saute (§13.16). **Coût du retour :** on ré-arme un bloc que le cadre ne liste
   pas et que 31 questions d'examen n'ont jamais posé.
2. **La redistribution du chapitre du seuil** (REVIEW l. 84-95). **Défaut : la scène s'en va,
   elle ne coupe rien.** La part de `seuil-tension-continu` passe de 29,2 % à 27,6 % par
   dilution. *Pour défaire :* un retrait de contenu dans R3 et une redistribution de deux ou
   trois items — **décision de propriétaire, à prendre indépendamment de cette scène, et de
   préférence AVANT de construire.**
3. **Le banc chiffre-t-il une dépendance du courant à la tension ?** (§5.5, §10.3.)
   **Défaut : NON.** Un rhéostat tient le courant ; l'ampèremètre affiche le même nombre aux
   trois tensions. *Pour défaire :* il faudrait poser un modèle de cellule (f.é.m. +
   résistance interne), donc écrire `résistance` à l'écran — une chaîne que le §9.3 interdit
   et que la porte fait rougir. **C'est une décision de programme, pas de rendu.** *Le cas
   « sans rhéostat » est dit en une phrase de prose (§4.3, point 4) et jamais montré.*
4. **La balance : au milligramme ou au dixième de milligramme ?** (§5.8, §5.9.) **Défaut : au
   milligramme.** C'est l'instrument d'un lycée, l'invariant est vrai à l'écran sur six
   réglages sur sept, et le septième produit **un écart réel** ($9{,}70\times10^{4}$) qui
   porte ELECTROLYSE-27 et la `suite` de S5. *Pour défaire :* quatre décimales ; $F$ devient
   $9{,}65\times10^{4}$ **partout**, l'écart disparaît, ELECTROLYSE-27 perd sa question, et
   **la quantité de matière de cuivre pourrait être affichée** (§5.9) — ce qui donnerait une
   lecture de plus pour `bilan-matiere-electrodes`.
5. **Faut-il que le banc montre un écart RÉALISTE de 1 à 2 % sur $F$ ?** (§10.9.) **Défaut :
   NON.** Retrouver $F$ est déclaré comme une vérification de cohérence ; ajouter un écart
   fabriqué obligerait à modéliser une perte (réaction parasite, rendement faradique) — que
   le §9.6 interdit. Le seul écart du banc vient d'un **arrondi de pesée**, et il est
   honnête. *Pour défaire :* poser un coefficient de perte déclaré et lever le §9.6 — **je ne
   le recommande pas** : une scène qui simule une imperfection qu'elle n'a pas le droit de
   nommer ment deux fois.
6. **Le repli sans JavaScript coûte cher, et il faut le savoir** (correctif de la vague 1,
   pédagogie 9). **Défaut : on l'accepte et on le déclare** (`fallback_note`, §12). *Le coût
   exact :* l'élève sans JavaScript, ou sur papier, perd **les trois faits centraux** — la
   proportionnalité au produit $I\,\Delta t$, la nullité de l'effet de la tension, et la
   mesure de $F$ — parce **qu'aucune des trois figures de la leçon ne porte une masse, une
   durée ou une intensité** (§2.1). *Pour défaire :* commander une **quatrième figure
   figée** à trois étapes (les trois masses aux trois durées ; les deux couples de même
   charge ; la chaîne balance → électrons → $F$), posée juste après le marqueur. **Coût :
   un SVG + son `.stages.json`, et un asset média de plus dans une notion qui en a trois.**
7. **Un graphe $m = f(Q)$ ?** (§2.6, §9.12.) **Défaut : non.** La lecture graphique d'une
   pente n'est enseignée nulle part dans la notion (`grep` ⇒ 0). Une scène ne doit pas
   exercer un geste que la leçon n'a pas posé. *Pour défaire :* il faut d'abord payer la
   dette de la pente, en prose.
8. **S1 est dérivable de R2** (§3, tension 1). **Défaut : on la garde**, parce qu'elle
   attrape ce que le tableau de R2 encourage (le rôle attaché au métal) et qu'aucun texte
   n'échange un câblage. *Pour défaire :* la remplacer par **l'identification par
   l'OBSERVATION, sans polarité donnée** — le geste de `bk-2022-r-x1`, `bk-2022-n-x1` et
   `bk-2012-r-x1`, trois entrées sur neuf, que la leçon ne fait jamais en entier (§2.4). La
   scène masquerait alors les signes du générateur et l'élève nommerait les électrodes sur
   ce qu'il voit. **Coût : une clé d'état de plus (`marquage`), et `polarite-comme-pile`
   visée sur une autre forme.**
9. **La cellule : celle de la LEÇON, ou une cellule de BANQUE ?** (§5.1, §10.5.) **Défaut :
   celle de la leçon**, parce que tous ses nombres sont dans `lesson.md` et qu'elle pèse un
   **métal**, comme le chapitre 5. *Pour défaire :* prendre `bk-2015-n-x1b` (chlorure de
   sodium, $I = 3$ A, $\Delta t = 25$ min, $V_m = 25{,}0$ L·mol⁻¹, $V(Cl_2) = 0{,}583$ L,
   dont la chaîne redonne $F = \dfrac{3\times1\,500\times25{,}0}{2\times0{,}583} =
   \dfrac{112\,500}{1{,}166} = 96\,484 \to 9{,}65\times10^{4}$) — **et alors le §9.7 doit
   être levé** (les gaz entrent, donc $V_m$, donc le chapitre 6), et la scène change de
   rung.
10. **Le champ `habilete`** (§0.1 b, §0.3, §8.4). **Défaut : ne pas l'ajouter ici** — c'est
    `DECISIONS-EN-ATTENTE` §3, et cela se tranche pour les 62 notions à la fois.
    *Conséquence assumée et déclarée : **aucun verdict d'habiletés n'est possible** sur cette
    notion, ni avant ni après (ADR 0034 : un non-verdict s'écrit, il ne se peint pas en
    vert).*
11. **L'héritage du contrôle `duree` à S3** (§5.6, §7.6 A). **Défaut : garder l'héritage**,
    parce qu'ici la non-fuite est tenue par les **lectures** (`quantite-electrons` n'existe
    qu'à partir de S4, `faraday-mesure` qu'à S5, `tension` n'est réglable qu'à S5) et que sans
    lui la `suite` de S3 — trouver les deux paires de même charge — est **invérifiable à
    l'étape**. *Pour défaire :* fermer `duree` à S3 et déplacer sa `suite` à S4. *Question de
    règle générale : §13.15 (a).*
12. **Un quatrième modèle passe à marge NULLE** (§8.4). **Défaut : on l'accepte et on le
    déclare** — `faraday-constante-universelle` siège à exactement 3 items. *Pour défaire :*
    un sixième item, par exemple un item d'application expérimentale sur **deux essais à
    même charge et intensités différentes** ($0{,}100$ A pendant 1 h 30 et $0{,}200$ A
    pendant 45 min : même $Q = 540$ C, même $m = 0{,}183$ g, même $F$), qui servirait à la
    fois `faraday-constante-universelle` et `tension-decide-la-quantite` forme C.
13. **Un point d'arrêt de plus dans R4 ?** (§4.6.) **Défaut : non** — les cinq paris de la
    scène sont des portes d'engagement, `cp-faraday` (`lesson.md:189`) devient la reprise de
    ce que la scène a montré, et **quatre des cinq points d'arrêt existants sont déjà des
    clones** (`checkpoints.yaml:30-34`). *Si le propriétaire en veut un, qu'il porte **la
    mesure de $F$** (ELECTROLYSE-27) et **pas** la loi de Faraday directe, pour ne pas
    pré-dépenser ce que `cp-faraday` sonde déjà.*
14. **`tool: "scene2d"` et le nom du dossier.** Septième spec à poser la même question :
    faut-il renommer `web/src/lib/scene3d/` (+ `scenes.json`) en `scene/` ? **Défaut :** oui,
    mais dans un commit **mécanique séparé**. *Quand une règle est reprise sept fois, c'est
    le geste qu'il faut outiller (ADR 0033).*
15. **Trois règles générales nées ici, à graver ou à garder en spec.**
    - **(a) La non-fuite entre étapes peut être tenue par les LECTURES, pas seulement par
      les contrôles.** Le tremplin la tenait par les réglages et interdisait tout héritage ;
      ici, un contrôle hérité est **sûr** parce que les lectures qui répondent aux paris
      suivants **n'existent dans le DOM à aucune étape antérieure**. La condition est
      vérifiable des deux côtés, et la porte la vérifie.
    - **(b) Une frontière peut interdire de CHIFFRER une dépendance que la scène pourrait
      simuler.** Le banc tient le courant au rhéostat non parce qu'il ignore ce qui se
      passerait sans, mais parce que **le programme ne pose aucune loi qui le donnerait**.
      C'est plus fin que « ne pas afficher » : c'est **montrer moins que ce qu'on pourrait
      calculer**, et le dire.
    - **(c) Un `retour` d'étape peut fuir vers le pari SUIVANT** — cinquième forme de la
      fuite (ADR 0036), après l'affichage, le réglage ouvert, la donnée et la relation. Elle
      ne se voit qu'en relisant les textes les uns contre les autres ; cette spec l'a trouvée
      dans sa propre vague 1 (§7.6 B). *Une table « chaque retour contre le pari suivant »
      devrait être obligatoire dans toute spec de scène.*
    Méritent-elles un addendum à l'ADR 0041 ?
16. **Couper une étape ?** Si le propriétaire veut quatre étapes, la **coupable en premier
    est S1** (l'échange des fils) : c'est la seule dérivable d'un texte déjà lu (§3, tension
    1), et `polarite-comme-pile` est déjà couverte à 5 items. *À l'inverse, **S4 et S5 ne
    sont pas coupables** : S4 est le seul pari du corpus qui remonte de la balance aux
    électrons, et S5 est la seule démonstration de la thèse de toute la scène.*

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/electrolyse` passe — **ce qui
  suppose que les DEUX modèles soient déclarés dans `items.yaml` au moment où la scène est
  validée** (§8.2), sans quoi la scène part sur une voie de repli.
- `node web/scripts/scene-electrolyse.mjs --porte` : **toutes** les familles vertes, sur un
  rendu réel, relancé à **quatre** largeurs d'écran, **au moins deux fois**.
- `node web/scripts/scene-electrolyse.mjs --essai-rouge` : **chaque** famille crie, avec le
  vert qui l'a précédée, même dossier, même commande ; et chaque sabotage ne fait rougir que
  la famille qui le garde (§11.4).
- **N12 est verte** : aux neuf couples $(I ; \Delta t)$, les chaînes `charge`, `masse-zinc`
  et `faraday-mesure` sont **identiques au caractère près** aux trois tensions. *C'est la
  ligne qui prouve que la scène DÉMONTRE sa thèse au lieu de l'énoncer.*
- `node web/scripts/test-electrolyse.mjs` : les tables A, B, C, D et E du §5.7 à
  $10^{-12}$, les deux couples de même charge, l'invariance au câblage, **l'invariance aux
  trois tensions**, et **le septième réglage à $9{,}70\times10^{4}$**.
- `node web/scripts/resume-couverture.mjs` régénéré : `total_items` passe à **29**,
  `tension-decide-la-quantite` à **4**, `faraday-constante-universelle` à **3**,
  `seuil-tension-continu` à **8**, `faraday-stoechiometrie-electronique` à **7**,
  `faraday-calcul-unites` **inchangé à 4**, `ramp_coverage` R4 à **7** et R6 à **5**.
- **Aucune forme du §9 n'apparaît dans le panneau rendu**, une sonde par forme. En
  particulier : **aucun « $E^\circ$ », aucun « Nernst », aucune « surtension », aucune
  valeur de « résistance », aucun « joule », aucun « $V_m$ », aucun « dihydrogène », aucune
  « galvanoplastie », aucun autre métal que le zinc et le cuivre** — ni dans la scène, ni
  dans les blocs de prose. *(Les ITEMS, eux, ont le droit de nommer l'argent : §9.8.)*
- **Les nombres suivis de `V`, `volt`, `volts`, `A` et `min` dans le panneau forment
  exactement** $\{1{,}1 ; 2{,}0 ; 6{,}0 ; 12{,}0\}$, $\{0{,}100 ; 0{,}200 ; 0{,}400\}$ et
  $\{30 ; 45 ; 90\}$.
- **`fleches-chimiques` verte dans les deux sens** (§9.17).
- **`formule-graduee` verte ÉTAPE PAR ÉTAPE** contre la table C du §7.6 — et la phrase
  supprimée du retour `quadruple` de S2 (§7.6 B) ne revient pas.
- Les blocs de prose du §4 sont posés **aux ancres nommées**, **contiennent les mots « à
  courant maintenu constant »** là où le §4 les exige, et **le §4.1 ne répond à aucun pari**.
- **Les cinq points d'arrêt sont inchangés, au caractère près**, et les trois figures de la
  notion n'ont pas bougé.
- **La prose commandée emploie la numérotation de chapitres du corpus** (R3 = chapitre 4,
  R4 = chapitre 5, R5 = chapitre 6), jamais « R3 » ni « R4 ».
- `dette-manipulable` : **inchangée**. `media-manipulable` monte d'une notion.
- La scène ne compte pour **livrée** que si elle est enregistrée dans `scenes.json`
  (ADR 0041 §3).

---

## 15. Ce que je n'ai pas pu vérifier

Écrit ici plutôt que supposé ailleurs. Rien de ce qui suit n'est un défaut connu : ce sont
des **mesures à faire**, pas des affirmations à croire. *Section conservée intégralement
depuis la vague 1, à jour du nouveau placement.*

1. **Je n'ai pas eu de shell dans cette session.** Toutes les mesures du §0 et du §2 viennent
   de **lectures de fichiers et de recherches de motif**, pas de commandes lancées. Les
   commandes écrites au §0.1 sont là **pour être rejouées** ; si l'une d'elles ne donne pas
   le chiffre annoncé, **c'est ici qu'il faut corriger**, pas dans la porte.
2. **Les `limites` et les `exclusions` du sous-domaine `sens_evolution` sont marquées
   `source: derived`** (`pc-physique-chimie.yaml:522` et `:531`) — **inférées, pas
   imprimées**. Le §9 repose donc sur : le `programme` du chapitre (imprimé), les trois
   `savoir_faire` (imprimés), le `travaux_pratiques` (imprimé), la garde déjà écrite dans
   `checkpoints.yaml:37-41`, et le **rang dans la leçon**. *Deux de ces cinq appuis sont des
   jugements ; ils sont à faire valider par le propriétaire avant construction (ADR 0018).*
3. **La f.é.m. $E \approx 1{,}1$ V n'a qu'une source dans le dépôt**, et c'est la leçon
   elle-même (`lesson.md:127`, reprise par `seuil-tension-electrolyse.stages.json:4` et par
   `items.yaml:705`). **Aucune entrée de banque, aucun sujet vérifié ne donne de seuil** —
   c'est la mesure même de la REVIEW (0/31). *Depuis la vague 1, la scène ne s'en sert plus
   que comme d'un rappel (§5.4) : l'enjeu a baissé, la question de provenance reste.*
4. **Le facteur d'exagération de l'épaisseur n'a jamais été vu à l'écran.** Il est
   **calculé** (§6.2), pas regardé. Deux points à trancher **en regardant l'image** : (a) à un
   facteur ~100, le dépôt de 0,732 g fait ~22 px sur une lame de ~140 px — lisible, ou
   écrasant ? (b) au plus petit dépôt (0,061 g), il fait ~1,8 px : **au-dessous de 2 px, la
   porte doit se déclarer aveugle plutôt que rendre un verdict** (règle du banc de
   diffraction, qui ne juge que les taches d'au moins 8 px).
5. **La masse volumique du zinc, $7{,}14$ g·cm⁻³, ne vient d'aucun fichier du dépôt.** C'est
   un contrôle d'auteur (§6.2) qui sert **uniquement** à justifier l'exagération. **Elle
   n'est rendue nulle part** : ni dans le panneau, ni dans la légende, ni dans les cinq
   items.
6. **L'héritage d'un contrôle d'une étape à la suivante n'a jamais été essayé contre
   `fuite-inter-etapes`.** La famille, telle que le tremplin l'a écrite, vérifie aujourd'hui
   l'**absence** d'héritage. Cette scène en déclare un (§5.6, §13.11). *À vérifier dans la
   pièce commune **avant** d'écrire une ligne de rendu.*
7. **L'absence d'`etat_revele` à S4 est supposée permise.** `validate-content` refuse
   `etat_revele` **sans pari** (ADR 0041, addendum du banc de diffraction) ; je n'ai pas lu
   son code pour vérifier qu'il accepte un pari **sans** `etat_revele`. *Les quatre autres
   étapes en portent un ; si S4 doit en porter un, le plus honnête est
   `duree_s: "5400"` (l'état où elle est déjà).*
8. **Les cliquets `indice-refus` et `indice-absolu` n'ont pas été lus dans leur code.**
   L'indice qui m'a servi est interne : `items.yaml:137` et `:1036` portent deux refus de
   conclure qui vivent dans le fichier aujourd'hui. *À confirmer avant d'écrire les items — et
   à ne pas prendre pour une permission (§8.3).*
9. **« Aucun des 24 items et aucune des 31 questions de banque ne donne une tension à
   employer » est mesuré par mots-clés, pas par lecture intégrale** des 1 503 lignes
   d'`items.yaml` et des ~1 500 de `bank.yaml`. C'est **l'appui principal du §8.2** : **à
   re-mesurer par une lecture des 24 `stem` et des 31 énoncés avant d'ouvrir les modèles.**
10. **Le rendu à 390 px n'a jamais été vu, et c'est le risque de lisibilité principal.** La
    scène dessine deux béchers, un pont salin, un générateur avec deux signes, un rhéostat,
    deux fils avec quatre flèches, un ampèremètre, un chronomètre, **deux balances** et
    **huit étiquettes** (quatre par lame, §6.2). `disposer` est obligatoire, et si cela ne
    suffit pas, la réponse est de **retirer un objet** — le chronomètre, dont la valeur peut
    vivre dans la liste des lectures —, **jamais** d'élargir la tolérance de la famille
    `etiquettes`. *Le voltmètre de la version précédente a déjà été retiré pour cette raison
    (§5.2).*
11. **Les mots « rhéostat » et « voltmètre » n'existent nulle part dans la notion**
    (recherche de motif sur les six fichiers ⇒ 0). La scène introduit donc **un** instrument
    nouveau, le **rhéostat**, et il est désormais **structurel** : c'est lui qui rend vraie
    la phrase « à courant maintenu constant » (§2.2, §5.5). *À relire par content-author :
    un mot d'instrument inconnu en pleine consigne coûte plus cher qu'il n'en a l'air — la
    consigne de S1 doit le nommer ET dire ce qu'il fait, en une incise.*
12. **La cascade de trois arrondis n'a jamais été éprouvée.** `faraday-mesure` est calculée
    **sur la valeur affichée** de `quantite-electrons`, elle-même calculée **sur la valeur
    affichée** de `masse-zinc` (§5.7). *Le test unitaire du §12, point 2, doit vérifier la
    cascade sur les valeurs AFFICHÉES, pas sur les valeurs exactes — sans quoi il sera vert
    pendant que l'écran sera faux.*
13. **La route fermée de S4 n'a pas été éprouvée sur un élève.** La consigne interdit de
    passer par $Q/F$ (§3, tension 2), et les deux routes diffèrent au quatrième chiffre
    ($2{,}238\times10^{-2}$ contre $2{,}239\times10^{-2}$, §5.7 F). *Un élève qui emprunte
    quand même la route interdite trouve une valeur qui n'est dans aucun choix — c'est
    voulu, et c'est à vérifier à la lecture : aucun distracteur ne doit porter
    $2{,}238\times10^{-2}$.*




