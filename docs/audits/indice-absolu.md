# L'indice de l'absolu — quand la bonne réponse est la seule à ne pas sur-affirmer

*Mesuré et corrigé le 2026-09-05. Instrument : `web/scripts/indice-absolu.mjs`
(mesure + cliquet). Corpus : 1 619 items QCM éligibles sur 62 notions.*

---

## Le défaut

Tous les manuels de stratégie de QCM — ceux que les élèves s'échangent la
veille, ceux que vendent les officines de préparation — enseignent la même
règle en trois mots : **barre les réponses qui contiennent « toujours »,
« jamais », « uniquement », « aucun ».**

Elle marche parce qu'un rédacteur d'items fabrique ses distracteurs en
poussant une idée jusqu'à l'excès, et que l'excès, en français, s'écrit avec
ces mots-là. La bonne réponse, elle, est mesurée : elle dit « le plus
souvent », « dans ce cas », « sans que cela remette en cause ».

Sur ce corpus, avant campagne :

| | |
|---|---:|
| items où éliminer les absolus ne laisse **qu'une** réponse debout | **106** |
| …et c'est la **bonne** | **54** |
| taux de réussite de la stratégie | **51 %** |
| hasard, à quatre choix | 25 % |

**Un élève qui n'a rien révisé doublait sa note sur ces items-là.** C'est le
même défaut que l'indice de longueur, et il a les mêmes trois conséquences :
il donne des points sans savoir, il fausse le diagnostic qui pilote tout le
reste du produit, et il enseigne à l'élève une stratégie qui ne marchera pas
le jour de l'épreuve.

## Ce que l'instrument compte, et ce qu'il ne compte pas

Les marqueurs retenus : *toujours, jamais, forcément, nécessairement,
obligatoirement, systématiquement, uniquement, exclusivement, impossible,
en aucun cas, quel que soit, n'importe quel, tous les, toutes les, aucun,
aucune.*

**`seul` et `seulement` en sont volontairement absents.** En français
scolaire ils sont le plus souvent une précision utile — « seule la composante
tangentielle travaille », « il reste seulement à conclure » — et non une
sur-affirmation. Les inclure faisait crier l'instrument sur des centaines de
phrases justes : le bruit qui fait désarmer les portes.

Deux nombres, dans les deux sens :

- **tranché** — les items où la stratégie **désigne** une réponse : exactement
  un choix survit à l'élimination. Ailleurs elle ne dit rien, et il n'y a pas
  d'indice à suivre.
- **exploitable** — le sous-ensemble où la réponse ainsi désignée **est** la
  clé. C'est le nombre gardé.
- **inverse** — les items où exactement un choix **porte** un absolu, et c'est
  la clé (« coche l'intrus »). Gardé aussi, pour une raison précise : le remède
  du premier défaut crée le second si on l'applique sans regarder.

## Les deux remèdes, et celui qu'il ne faut pas prendre

**Le remède interdit d'abord : désarmer les distracteurs.** Dans la quasi-
totalité des cas, l'absolu d'un distracteur est **ce qui le rend faux** —
« une transformation spontanée est *toujours* rapide », « le sens d'une
réaction ne peut *jamais* être prédit à l'avance ». Le retirer ne corrige pas
l'item : il détruit l'erreur que le distracteur incarne, et l'item cesse de
diagnostiquer quoi que ce soit. C'est le piège de cette campagne, et c'est
celui qui aurait fait le plus de dégâts.

**1. Rendre à la clé l'absolu VRAI qu'elle a le droit de porter.** Une loi
physique, une définition, un théorème s'énoncent absolument, et les écrire
ainsi est *plus* juste, pas moins :

- `ES-17` — « $Q_{r,i} > K$ impose **au contraire** le sens inverse » devient
  « impose **toujours** le sens inverse ». C'est le critère, énoncé comme un
  critère.
- `EE-17` — « $K$ ne dépend que de la réaction et de la température » devient
  « $K$ ne dépend **jamais** que de la réaction et de la température ».
- `CI-17` — la clé gagne son énoncé de règle : « inverser les bornes change
  **toujours** le signe ».
- `VERITE-11` — « une propriété qu'on attribue à un énoncé, **non** au réel
  lui-même » devient « **jamais** au réel lui-même ».

C'est le remède très majoritaire : **50 des 54 items**. Il améliore l'item
deux fois — il ferme l'indice, et il donne à l'élève la formulation qu'on attend de
lui dans une copie.

**2. Retirer l'absolu GRATUIT d'un distracteur** — celui dont l'erreur est
ailleurs et que le mot n'aide pas à porter :

- `ES-12` option C — « faux, mais **uniquement** parce que l'ordre des espèces
  est incorrect » : l'erreur est de croire que réordonner suffit, pas le mot
  « uniquement ». Il tombe, l'erreur reste entière.
- `SUITES-10` option C — « faute de quoi la démonstration ne couvre pas **tous
  les** rangs » devient « laisse des rangs non couverts ».
- `TDS-13` option C — « **impossible** à prédire… ne suffisent **jamais** à
  trancher » devient « on ne peut pas prédire… ne suffisent pas à trancher ».
- `SNS-5` option C — « le facteur Rhésus n'y intervient à **aucun** moment »
  devient « le facteur Rhésus restant sans effet ».

Quatre items sur les cinquante-quatre — et ce sont les quatre où la clé ne
pouvait pas prendre d'absolu sans mentir.

## L'état après campagne

| | avant | après |
|---|---:|---:|
| items tranchés par la stratégie | 106 | 52 |
| …dont la réponse désignée est la clé | **54** | **0** |
| taux de réussite de la stratégie | **51 %** | **0 %** |
| indice inverse (un seul absolu, et c'est la clé) | 70 | 70 |

**Zéro sur 1 619.** La stratégie « barre tout ce qui sur-affirme » ne désigne
plus jamais la bonne réponse : quand elle tranche encore — 52 items — elle
désigne un distracteur, et l'élève qui la suit se trompe.

## Pourquoi l'indice inverse n'est PAS ramené à zéro

Sur les 424 items où exactement un choix porte un absolu, c'est la clé
**70 fois — 17 %**, sous les 25 % du hasard. Un élève qui appliquerait la
stratégie symétrique (« coche celle qui tranche ») **perdrait** des points.
Il n'y a rien à corriger ; il y a quelque chose à **empêcher de grandir**, et
c'est ce que fait le cliquet : le nombre est scellé à 70 et ne peut que
descendre.

C'est aussi le garde-fou de la campagne elle-même. Le remède n° 1 déplace des
clés dans le camp des absolus ; appliqué sans mesure, il aurait fabriqué le
défaut symétrique. Le taux global le dit : **les clés portent un absolu dans
18,2 % des cas, les distracteurs dans 24,0 %** — l'écart va toujours dans le
bon sens.

## Le cliquet

`web/scripts/indice-absolu.base.json`. Comme pour l'indice de longueur : il
compare des **nombres d'items**, jamais des pourcentages ; une notion en dette
ne peut pas s'aggraver ; une notion neuve naît sous 25 %. La ligne de base ne
se resselle qu'**après** avoir fait baisser l'indice.

**Négatif prouvé :** en rendant à `EE-17` sa formulation d'origine (« $K$ ne
dépend que de… » au lieu de « ne dépend jamais que de… »), la porte passe de
« tenu » à « ROMPU », code de sortie 1, et nomme la notion.

**Les deux portes se sont attrapées l'une l'autre.** En allongeant la clé de
`CI-17` pour lui donner son « toujours », j'ai déclenché la porte
indice-longueur : la clé était devenue visiblement la plus longue. Corrigé en
raccourcissant la fin. C'est la démonstration que ces deux instruments ne se
recouvrent pas et qu'aucun des deux ne suffit seul.

## Ce qui reste

- **La valeur diagnostique des choix réécrits.** Comme pour l'indice de
  longueur : rien ici ne mesure si un distracteur correspond à une erreur
  réelle d'élève. C'est une relecture par la voie pédagogie, pas une porte.
- **Les autres indices de forme : mesurés, et NULS.** L'absolu et la longueur
  sont les deux que les manuels de stratégie enseignent en premier ; les deux
  suivants ont été mesurés dans la foulée, et ne disent rien sur ce corpus.
  C'est un résultat, pas une case non cochée — il ferme la famille.

  | indice | items où la stratégie tranche | …et c'est la clé | |
  |---|---:|---:|---:|
  | **écho de l'énoncé** (la clé reprend le plus de mots du stem) | 749 | 184 | **25 %** |
  | **intrus par la forme** (les autres choix partagent leurs deux premiers mots) | 320 | 86 | **27 %** |

  Exactement le hasard dans les deux cas. Aucune campagne n'est justifiée, et
  aucune porte n'est armée : garder à zéro un défaut qui n'existe pas
  coûterait des réécritures pour rien. Si le corpus grossit beaucoup, les deux
  sondes tiennent en trente lignes et se rejouent.

## Lancer l'instrument

```bash
cd web
npm run indice-absolu              # le rapport
node scripts/indice-absolu.mjs --ids      # les items concernés, un par ligne
node scripts/indice-absolu.mjs --tout     # toutes les notions, dette nulle comprise
node scripts/indice-absolu.mjs --porte    # le cliquet (CI)
node scripts/indice-absolu.mjs --sceller  # resceller APRÈS avoir fait baisser
```
