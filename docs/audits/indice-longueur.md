# L'indice de longueur — quand la bonne réponse se dénonce par sa taille

*Mesuré et corrigé le 2026-09-05. Instruments : `web/scripts/indice-longueur.mjs`
(mesure + cliquet), `web/scripts/item-stats.mjs` (qui l'annonçait depuis le
début). Corpus : 1 460 items QCM éligibles sur 62 notions.*

---

## Le défaut était écrit dans la sortie de l'outil, et personne n'avait agi

`item-stats.mjs` mesure deux biais de la clé de correction : sa **position**
et sa **longueur**. Le premier est réglé — un mélange déterministe par item
disperse la bonne réponse. Le second ne l'est pas, et le script le dit en
toutes lettres dans sa propre documentation :

> *length-tell is NOT fixed by shuffling order — reported for visibility.*

La colonne s'affichait à chaque exécution — maths 36 %, pc 53 %, svt 92 % —
et rien ne s'en emparait. Ce document est ce qui arrive quand on la lit.

## Pourquoi c'est un défaut d'élève et pas une coquetterie de statisticien

Un candidat qui n'a pas révisé et qui coche systématiquement la réponse la
plus longue avait raison **bien au-delà des 25 % du hasard** (à quatre choix).
Trois conséquences, dans cet ordre de gravité :

1. **Il gagne des points sans savoir.** L'item ne mesure plus ce qu'il
   prétend mesurer.
2. **Le diagnostic est faussé à la source.** C'est lui qui pilote tout le
   reste du produit — la sélection des exercices, le fil des révisions. Un
   élève déclaré compétent parce qu'il sait compter les lignes recevra la
   suite du programme, pas la remédiation dont il a besoin.
3. **La stratégie s'apprend et se transporte.** Un élève qui découvre que
   « la plus longue » marche ici l'appliquera le jour de l'épreuve, où elle
   ne marchera pas.

## Deux nombres, et pourquoi il en faut deux

- **indice** — % des items éligibles où la clé est *strictement* la plus
  longue. Le hasard vaut 25 % à quatre choix.
- **exploitable** — le sous-ensemble qui se **voit** : l'avance dépasse à la
  fois **20 caractères** et **20 %** de la deuxième. C'est ce nombre que le
  cliquet garde.

Distinguer les deux n'est pas une coquetterie. Une clé qui dépasse de six
caractères est « la plus longue » sans être un indice, et une porte incapable
de faire la différence réclamerait des réécritures cosmétiques — le mode de
mort habituel des portes trop ambitieuses.

La longueur est comptée sur le **rendu**, pas sur la source : les segments
KaTeX sont ramenés à leur largeur approximative à l'écran. Sans cette
correction, une notion de maths dont la clé porte la formule serait déclarée
« la plus longue » alors qu'à l'écran elle est la plus courte.

## L'état initial

| | éligibles | indice | exploitable | écart médian |
|---|---:|---:|---:|---:|
| **Corpus entier** | 1 465 | **38 %** | **24 %** | 37 car. |

Onze notions de **SVT** sortaient à **100 %** d'indice exploitable. Le pire
item du corpus : une clé de **331 caractères** contre **157** pour le
deuxième choix. Sur `TTP-1`, la bonne réponse faisait 270 caractères face à
106, 137 et 150.

## L'état après campagne

| | éligibles | indice | exploitable | écart médian |
|---|---:|---:|---:|---:|
| **Corpus entier** | 1 456 | 34 % | **0 %** | 14 car. |

**Les 62 notions sont à zéro.** Plus un seul item du corpus ne porte une
avance de longueur visible pour la bonne réponse. Environ **1 100 choix
réécrits sur 340 items**, en une trentaine de passes.

La colonne « indice » reste à 34 % — la clé est encore souvent la plus
longue — mais son avance ne dépasse plus, nulle part, les 20 caractères ET
les 20 % qui la rendraient visible. C'est précisément la distinction que
les deux nombres servent à faire : on n'a pas égalisé des longueurs au
caractère près, on a supprimé ce qui se voit.

## Les trois remèdes, et comment choisir

Le remède dépend de ce que la clé contient. Les trois ont été utilisés ; le
troisième est le plus efficace et c'est celui qu'on découvre en dernier.

**1. Allonger les distracteurs jusqu'au registre de la clé.** C'est le remède
de l'écriture d'items : un distracteur détaillé est un distracteur *attirant*,
donc un meilleur diagnostic. Chaque distracteur garde exactement l'erreur
qu'il portait, prolongée par sa propre conséquence — aucune vérité nouvelle
n'y est introduite, et les `feedback` existants répondent toujours à ce qu'ils
réfutent. C'est le remède des notions où les distracteurs étaient
télégraphiques : « Elles s'amortissent plus vite. » (30 caractères) face à une
clé de 72.

**2. Donner à chaque distracteur SA justification fausse.** Sur
`maths/arithmetique`, la clé était le seul choix à porter un « car… » :
« $(4, 9)$, car $\mathrm{PGCD}(4,9) = 1$ » face à « $(2, 4)$ », « $(3, 9)$ »,
« $(6, 8)$ ». Chaque distracteur a reçu la règle erronée qui produit
précisément cette réponse-là. Même geste sur les items numériques : une valeur
nue devient la valeur **plus la formule fausse qui y mène**.

**3. Raccourcir la clé jusqu'à son verdict** — quand elle recopie ce que les
champs `solution` et `correct_feedback` de l'item démontrent déjà en dessous.
C'est le cas de tous les items de calcul : sur `PILES-21`, la clé était une
correction complète de 366 caractères, mot pour mot le contenu du `solution`.
Rien n'est perdu ; c'est le doublon qui disparaît, et l'explication reste là
où elle enseigne — après la réponse.

**Mesuré, sur `pc/evolution-spontanee` :** un premier passage à allonger les
distracteurs a fermé 2 items sur 10 ; un second passage, à raccourcir les huit
clés, a fermé les huit d'un coup. **Sur une notion aux clés longues, trimer
d'abord.**

## Ce que l'instrument N'A PAS fait, et pourquoi

**Il n'a pas gonflé les mauvaises réponses de `BON-19`.** L'item demande
laquelle de quatre formulations est une vraie problématique ; les mauvaises y
sont courtes **parce que c'est ce qui les rend mauvaises**. « Qu'est-ce que le
bonheur ? » ne peut pas être allongé sans cesser d'être l'erreur qu'il
illustre. Seul le distracteur qui pouvait légitimement s'étoffer — une
question sur un auteur, qui n'est pas davantage une problématique — l'a été.
**Quand un instrument et la pédagogie se contredisent, c'est l'instrument qui
cède.**

**Il ne garde pas l'indice inverse.** La colonne « contre » (clé strictement
la plus **courte**) est mesurée et affichée — 14 % sur le corpus, jusqu'à 40 %
sur `pc/reactions-acido-basiques` — mais non armée. Elle s'exploite tout aussi
bien et mérite sa propre campagne.

## Le cliquet, et pourquoi ce n'est pas une porte franche

Exiger 25 % partout échouerait au premier commit et serait désarmé dans
l'heure. Le cliquet est tenable aujourd'hui :

- une notion **déjà en dette ne peut pas s'aggraver** ;
- une notion **neuve** doit naître sous **40 %** d'indice exploitable ;
- il compare des **nombres d'items**, pas des pourcentages — sans quoi
  ajouter de bons items à une notion en dette ferait baisser son taux sans
  avoir réparé un seul item.

Ligne de base : `web/scripts/indice-longueur.base.json`. Elle ne se resselle
qu'**après** avoir fait baisser l'indice, jamais pour faire taire une hausse.

**Négatif prouvé :** en rallongeant de 137 caractères une clé déjà réparée, la
porte passe de « tenu » à « ROMPU », code de sortie 1, et nomme la notion.

## Ce qui reste

**Rien, sur cette classe.** Le cliquet est scellé à **0/1 456**, ce qui en
fait désormais une porte franche : la moindre réapparition d'un indice
exploitable, dans n'importe quelle notion, casse le build.

Deux choses restent ouvertes, et elles sont d'une autre nature :

1. **L'indice INVERSE**, la clé strictement la plus courte — 15 % sur le
   corpus, jusqu'à 52 % sur `pc/aspects-energetiques` et 44 % sur
   `pc/reactions-acido-basiques`. Il s'exploite tout aussi bien et n'est
   pas gardé. C'est la prochaine campagne de cette famille.
2. **La QUALITÉ pédagogique des distracteurs allongés.** Un distracteur
   peut être long, parallèle à la clé, et ne correspondre à aucune erreur
   réelle d'élève. Rien ici ne le mesure ; seule une relecture par la voie
   pédagogie le dira, et c'est la limite honnête de cette campagne : elle a
   supprimé un indice de forme, elle n'a pas vérifié la valeur diagnostique
   de ce qu'elle a écrit à la place.

## Lancer l'instrument

```
node web/scripts/indice-longueur.mjs            # le rapport + le docket
node web/scripts/indice-longueur.mjs --porte    # le cliquet (sort 1 si ça empire)
node web/scripts/indice-longueur.mjs --sceller  # resceller APRÈS une baisse
```
