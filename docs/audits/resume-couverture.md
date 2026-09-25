# Les résumés de couverture — le corpus disait-il la vérité sur lui-même ?

*Mesuré et réparé le 2026-09-05. Instrument : `web/scripts/resume-couverture.mjs`
(mesure + trois portes franches + un cliquet). Corpus : 62 notions, 44 blocs
`coverage_summary`.*

---

## Le défaut

Chaque `items.yaml` se termine par un bloc `coverage_summary` : un tableau écrit
à la main qui annonce combien d'items couvrent chaque misconception, si le
plancher diagnostique de 3 items est atteint, combien d'items le fichier
contient. C'est de la documentation embarquée, et elle est bonne — elle dit à
qui reprend une notion où en est la couverture, ce qui a été décidé, ce qui
reste. Elle est lue par des humains.

**Et par rien d'autre.** Aucune exécution ne la relit. C'est exactement la forme
que HANDOFF §9.5 nomme et proscrit : *« un commentaire honnête n'est pas une
porte »*. Un tableau juste le jour où on l'écrit devient faux le jour où un item
bouge, sans un bruit — et un tableau faux coûte plus cher qu'un tableau absent,
parce qu'il fait **renoncer à un travail qui reste à faire**.

## Ce qui a été mesuré

Quatre notions déclaraient `floor_met: true` alors que des misconceptions
**déclarées, taguées, et comptées par la chaîne** siégeaient sous le plancher de
3 items du banc — donc inévaluables par le modèle apprenant, à jamais :

| notion | misconceptions sous le plancher |
|---|---:|
| `pc/aspects-energetiques` | **7** |
| `pc/systemes-oscillants` | **4** |
| `pc/reactions-acido-basiques` | **3** |
| `pc/chute-mouvements-plans` | **1** |
| | **15** |

## Comment c'est arrivé — et pourquoi ce n'est pas une négligence

Les quatre résumés **disaient vrai le jour où ils ont été écrits**, et deux
d'entre eux le disaient explicitement. Celui de `chute-mouvements-plans` portait
un `scope_note` en toutes lettres : *« R0-R6 et R11 n'ont aucune couverture
formelle ; hors périmètre de cette passe »*. Celui de `reactions-acido-basiques`
ouvrait sur *« l'inventaire ne contient que les 12 ids AB-\* »*. C'est de la
bonne foi documentée, et c'est la forme la plus dangereuse du défaut : le
périmètre était énoncé, la conclusion était juste **dans** ce périmètre, et
personne n'avait tort.

Puis une passe ultérieure a déclaré les familles manquantes et tagué les items
hérités. Le périmètre a doublé. **La conclusion est restée.** Un lecteur arrivant
après lisait « plancher atteint », faisait confiance, et passait à autre chose.

Deux affirmations annexes avaient rancé de la même façon :

- `systemes-oscillants` déclarait *« SO-19, SO-20, SO-21 ne portent aucun champ
  `misconception:` »* — ils en portent tous depuis la passe de tagage, et les
  décomptes AMO/RES du même tableau les excluaient encore ;
- `aspects-energetiques` déclarait la même chose de AE-19/20/21.

## Ce que l'instrument juge — et ce qu'il refuse de juger

Le corpus écrit ses tableaux par-misconception de **six façons différentes** :
`per_misconception`, `per_misconception_primary`, `per_misconception_any_distractor`,
`by_misconception`, `per_misconception_distractor`, `per_misconception_distractor_count`.
Certains comptent des items, d'autres des distracteurs, d'autres les seules
attributions primaires. Toutes ces conventions sont légitimes et **déclarées**
dans le fichier qui les emploie. Les comparer entre elles reviendrait à accuser
de mensonge une notion parfaitement honnête — et une porte qui crie au loup est
une porte qu'on désarme dans la semaine.

L'instrument ne juge donc que les affirmations qui n'ont **qu'un seul sens
possible**, quelle que soit la convention du fichier :

- **`floor_met`** — « le modèle apprenant peut évaluer toutes les misconceptions
  de cette notion ». La seule convention qui compte ici est celle de la CHAÎNE,
  puisque c'est elle qui construit `learner-model-data.json`. Vrai ou faux, sans
  échappatoire.
- **`total_items`** — un nombre d'items. Il n'y a pas deux façons de compter des
  lignes.

`gated_floor_met` est délibérément **ignoré** : c'est une affirmation de portée
réduite (« les misconceptions sondées par les checkpoints atteignent le
plancher »), légitime et non mécanisable sans deviner la portée.

## Les quatre portes

| | porte | ce qu'elle attrape |
|---|---|---|
| **A** | franche | `floor_met: true` avec ≥ 1 misconception sous le plancher — la dette qui a l'air payée |
| **B** | franche | `floor_met: false` alors qu'aucune ne l'est — la dette payée mais non déclarée |
| **C** | franche | `total_items` en désaccord avec le fichier |
| **D** | cliquet | le nombre de notions sans résumé ne peut que baisser, et une notion qui en avait un ne peut pas le perdre |

La porte **B** mérite un mot : elle est le miroir de A, et c'est elle qui rend
l'ensemble durable. Sans elle, le corpus s'améliore et sa documentation reste au
passé — une campagne d'items réussie laisse derrière elle un `floor_met: false`
périmé que personne ne pense à retourner. Avec elle, **finir le travail inclut
de le dire**.

La convention de comptage vit dans `web/scripts/lib/couverture-compte.mjs`,
extraite de `couverture-diagnostique.mjs` le même jour et partagée par les deux
instruments : deux comptages parallèles finiraient par diverger, et le second
accuserait le premier de mentir en se trompant lui-même.

## La réparation

Le message d'échec de l'instrument nomme deux remèdes, **jamais un troisième** :
écrire les items qui manquent, ou dire la vérité sur ce qui manque. Ici, le
premier — parce que 15 misconceptions inévaluables sont 15 erreurs d'élève que
le produit voit passer sans savoir les nommer, et que corriger l'étiquette
n'aurait rien réparé du tout.

**Onze items écrits**, chacun portant deux ou trois familles distinctes sur ses
distracteurs :

| notion | items | ce qu'ils visent |
|---|---|---|
| `pc/chute-mouvements-plans` | CMP-37, CMP-38 | la symétrie montée/descente, par deux gestes distincts — lire une vitesse de retour, critiquer un raisonnement écrit |
| `pc/reactions-acido-basiques` | RAB-40, RAB-41, RAB-42 | pH ↔ concentration ; construction de $K$ à partir de deux $pK_A$ et lecture de $\tau$ ; $K$ ne dépend ni de la dilution ni du pH mesuré |
| `pc/systemes-oscillants` | SO-42, SO-43 | phase à l'origine lue avec le SENS du lancer ; ce que fait un oscillateur libre sans frottement |
| `pc/aspects-energetiques` | AE-31 → AE-34 | dépendance en $v^2$ et caractère scalaire ; produit scalaire et réaction normale ; $mgh$ contre $mh$ et $mgd$ ; bilan d'une descente avec frottement |

Les quatre `coverage_summary` ont été **réécrits**, avec leur tableau
par-misconception désormais **généré** contre la convention de la chaîne, les
affirmations rancies supprimées plutôt que rafistolées, et — dans chaque cas —
un préambule qui raconte comment la dérive s'est produite, parce que c'est la
partie qui empêche de la refaire.

Effet mesuré sur le corpus entier : **517 → 532 misconceptions évaluables**.

## Deuxième passe — les 18 notions qui n'en avaient aucun

Un résumé absent n'est pas un mensonge, mais il produit le même effet : l'état
de couverture d'une notion n'était lisible qu'en relançant un instrument, donc
invisible à qui ouvrait le fichier. **Une dette qu'aucun document ne nomme est
une dette qu'on ne paie jamais.**

Les 18 blocs manquants ont donc été **générés** — les 11 notions de SVT, deux
de philo (`le-bonheur`, `l-histoire`), quatre de physique-chimie, une de maths
— avec, pour celles qui ne sont pas au plancher, un bloc `under_floor` qui
nomme chaque misconception inévaluable et le nombre d'items qui lui manquent.
Onze déclarent `floor_met: true`, sept déclarent `false` en disant ce qui reste.
Le corpus est désormais **62 notions sur 62** à se décrire, et le cliquet est
scellé à zéro : un résumé ne peut plus disparaître.

### Ce que cette passe a fait apparaître

Le générateur a buté sur un cas que ni cet instrument ni
`couverture-diagnostique` ne voyaient : une misconception **déclarée dans
l'inventaire de la notion, mais qu'aucun item du banc ne vise**. Elle compte
zéro — pire que sous le plancher — et elle était absente des deux décomptes,
parce que l'un ne connaît que les tags rencontrés et l'autre ne compte comme
« orpheline » que ce qui n'est utilisé nulle part, checkpoints compris.

Il y en a **16** dans le corpus. Plusieurs ne sont sondées QUE par un
checkpoint, ce qui ne compte pas : le modèle apprenant est bâti sur le banc de
fin seul, pour ne pas compter deux fois un item cloné en leçon. Le périmètre du
plancher est donc désormais l'**union du déclaré et du tagué**, dans
l'instrument comme dans les tableaux générés. Les 16 vivent toutes dans des
notions qui déclarent honnêtement `floor_met: false` — la porte est restée
verte en devenant plus exigeante.

### L'état du corpus après les deux passes

| | |
|---|---:|
| misconceptions déclarées ou taguées | **767** |
| évaluables (≥ 3 items du banc) | 532 → **767** |
| sous le plancher | 235 → **0** |
| … dont sans aucun item de banc | 16 → **0** |
| notions entièrement évaluables | 30 → **62** sur 62 |
| notions portant un `coverage_summary` | **62** sur 62 |

La seconde colonne est l'état après la campagne du plancher (165 items, 32
notions closes) qui a suivi immédiatement — voir
`docs/audits/couverture-diagnostique.md`.

## Ce que ce document ne dit pas

- **Si les tableaux par-misconception sont justes.** Ils restent de la prose,
  relue par des humains. L'instrument garde deux affirmations, pas le tableau.
- **Ce qui arrive quand la dette est payée.** Les 235 misconceptions que ce
  document laissait sous le plancher l'ont été dans les heures qui ont suivi.
  Les 62 notions déclarant désormais `floor_met: true`, la porte A devient de
  fait une porte FRANCHE sur tout le corpus : déclarer une misconception sans
  lui écrire ses trois items fait tomber l'intégration. La porte d'honnêteté a
  produit la porte de fond.
- **Si un résumé généré est UTILE.** Il est exact et gardé, ce qui n'est pas la
  même chose qu'éclairant : les notes qui expliquent une décision d'auteur — un
  périmètre volontairement réduit, un item hérité qu'on garde et pourquoi — ne
  se génèrent pas. Les quatre résumés réécrits à la main en portent ; les 18
  générés n'en portent aucune, et c'est à l'auteur de la notion de les y
  ajouter quand il en a une.
