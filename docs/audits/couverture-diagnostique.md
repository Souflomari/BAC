# La couverture diagnostique — le moteur voyait-il quelque chose ?

*Mesuré et réparé le 2026-09-05. Instrument : `web/scripts/couverture-diagnostique.mjs`
(mesure + cliquet + porte franche). Corpus : 4 855 distracteurs sur 1 347 items
de banc, 62 notions.*

---

## Le défaut

Tout le produit repose sur une boucle en trois temps : l'élève se trompe, le
modèle apprenant reconnaît **quelle** erreur il vient de commettre, la
remédiation vise cette erreur-là. Le seul fil qui relie ces trois moments est
un champ, sur un distracteur :

```yaml
- id: B
  text: "C'est la cathode, borne -."
  correct: false
  misconception: mc.physics.pc_piles.anode-cathode-polarite   # ← ce fil
```

Sans lui, une mauvaise réponse n'est qu'un point perdu. Le produit redevient un
quiz.

Ce que la chaîne fait du champ (LEARNER-MODEL-SPEC, `build-learner-inputs.mjs`) :

- `learner-model-data.json` = `{ notion → { misconception → nombre d'items } }`,
  construit à partir du **banc de fin seul** (`items.yaml`) — les checkpoints
  sont délibérément exclus du décompte, pour ne pas compter deux fois un item
  cloné en leçon ;
- le modèle ne déclare une misconception **évaluable** que si elle est couverte
  par **≥ 3 items du banc** — le PLANCHER. En dessous, son état reste
  *unassessed* à jamais : ni détectée, ni écartée.

## L'état initial

| | |
|---|---:|
| distracteurs **sans aucun tag** | **1 017** sur 4 855 (21 %) |
| tags **fantômes** (id non déclaré dans l'inventaire de la notion) | **47** |
| notions **AVEUGLES** (aucune misconception au plancher) | **17** sur 62 |
| misconceptions évaluables | 340 |
| notions vues par le générateur | 48 sur 62 |

**« Aveugle » veut dire : sur cette notion, le modèle ne dira jamais rien de
l'élève.** C'était le cas d'une notion sur quatre — dont la **SVT entière**
(10 notions sur 10), deux notions de philosophie, deux de maths et trois de
physique-chimie.

Le harnais ne le voyait pas : `validate-content` ne connaît pas le champ
`misconception`, et rien d'autre ne le lisait.

## Trois défauts distincts, pas un seul

**1. La forme LISTE des tags était muette des deux côtés.** Le corpus écrit
aussi `misconception: [a, b]` — un distracteur peut exhiber deux erreurs
nommées à la fois. `build-learner-inputs.mjs` et son jumeau client
`payload.ts` testaient `typeof === "string"` : ces choix ne comptaient pour
**rien**.

Conséquence mesurée sur `pc/systemes-oscillants` : `M-OSC-RES-3` stagnait à
**2 items** dans la carte des planchers, pendant que le décompte écrit à la
main dans `items.yaml` annonçait **4** et `floor_met: true`. La misconception
était inévaluable, et le fichier affirmait le contraire — **le mode de
défaillance exact que la règle des blocs de vérification existe pour empêcher,
transposé d'une migration à un générateur.**

Réparé des deux côtés, avec deux tests neufs. `misconception_id`, colonne
unique de la migration 043, rapporte désormais le **premier tag écrit** plutôt
que `null` : renvoyer `null` aurait fait s'effondrer « plusieurs erreurs à la
fois » en « pas d'erreur », ce que LEARNER-MODEL-SPEC §0.1 interdit.

**2. Quarante-sept tags pointaient un id non déclaré.** La chaîne comptait
l'id, mais rien ne pouvait en afficher le libellé : un diagnostic sans nom.
Trois notions déclaraient `misconceptions: []` alors que leurs checkpoints
visaient des erreurs nommées.

**3. Mille dix-sept distracteurs n'avaient pas de tag du tout.** Le gros du
travail.

## Ce que la campagne a fait

**Aucune erreur n'a été inventée.** Chaque item du corpus porte, sur chacun de
ses distracteurs, un `feedback` qui nomme déjà l'erreur avec précision — c'est
la discipline d'écriture du projet. Les inventaires écrits ici en sont
**tirés** : lire les trois feedbacks d'un item, reconnaître la famille, la
formuler, la rattacher.

| | inventaire écrit | distracteurs tagués |
|---|---:|---:|
| **SVT** — les 10 notions | 8 notions × 4 à 7 erreurs | 172 |
| `maths/calcul-integral` | (existait, 11 erreurs) | 78 |
| `maths/suites-numeriques` | (existait, 15 erreurs) | 99 |
| `maths/structures-algebriques` | +1 erreur | 37 |
| `philo/le-bonheur` | 9 erreurs | 63 |
| `philo/l-histoire` | 8 erreurs | 72 |
| `pc/controle-catalyse` | 5 + 7 erreurs | 54 |
| `pc/transformations-deux-sens` | 9 + 2 erreurs | 45 |
| `pc/reactions-acido-basiques` | +8 erreurs | 81 |
| `pc/chute-mouvements-plans` | +5 +4 erreurs | 72 |
| `pc/systemes-oscillants` | +7 erreurs | 72 |
| `pc/aspects-energetiques` | (existait, 22 erreurs) | 54 |
| divers (moyens-de-defense, décroissance) | +2 erreurs | 5 |

## L'état final

| | avant | après |
|---|---:|---:|
| distracteurs sans tag | **1 017** | **111** |
| …dont `misconception: null` **explicite** | (non distingué) | **111** |
| **omissions réelles** (champ absent) | 1 017 | **0** |
| tags fantômes | 47 | **0** |
| notions AVEUGLES | **17** | **0** |
| misconceptions évaluables | 340 | **458** |
| notions couvertes | 48 | **62** |

Les 111 qui restent sont des **décisions d'auteur** : `misconception: null`,
écrit exprès pour dire « ce distracteur ne porte volontairement aucune erreur
nommée » — un piège de lecture, une valeur numérique fausse sans modèle
derrière. Distinguer les deux comptes autant que les compter : l'un est un
oubli, l'autre un choix. L'instrument affiche la colonne « dont nul » pour
cette raison.

## Ce que la mesure a révélé ensuite : la SVT était quatre fois plus pauvre

Une fois les tags posés, le déficit de plancher a rendu visible un fait que
personne n'avait chiffré — la taille des banques d'items, par matière :

| matière | notions | items QCM, médiane par notion | total |
|---|---:|---:|---:|
| maths | 14 | 27 | 365 |
| pc | 25 | 24 | 617 |
| philo | 12 | 24 | 301 |
| **svt** | **11** | **6** | **64** |

Cinq ou six items par notion, sans checkpoints ni banque d'exercices : c'était
**tout** l'entraînement et **tout** le diagnostic qu'un élève de SVT recevait
sur une notion. Conséquence mécanique du plancher : **les onze notions de SVT
étaient AVEUGLES**, et 41 erreurs y étaient déclarées sans pouvoir être
évaluées.

**38 items neufs** ont été écrits contre ce déficit, erreur par erreur :

| | avant | après |
|---|---:|---:|
| items QCM de SVT | 64 | **102** |
| notions aveugles | 11 | **0** |
| erreurs sous le plancher | 41 | **0** |
| erreurs évaluables | 3 | **57** |

L'écart avec les autres matières n'est pas refermé — 102 contre 365, 617 et
301 — mais la SVT est passée du côté où le modèle a quelque chose à dire.

**Comment ces items ont été écrits, et ce que cela garantit.** Chacun vise une
erreur DÉJÀ déclarée dans l'inventaire de sa notion, et reste strictement dans
le périmètre de `lesson.md` : aucune notion nouvelle, aucun auteur, aucun fait
qui n'y soit déjà enseigné. Les distracteurs reprennent les modèles faux que
les `feedback` existants nommaient. Chaque lot est passé par
`validate-content --strict`, `indice-longueur`, `indice-absolu` et
`couverture-diagnostique` avant d'être versé.

**Les deux portes de forme ont travaillé pendant l'écriture**, et c'est le
meilleur argument pour les avoir armées : `SNS-8` et `MD-M4-2` sont sortis avec
leur clé seule à porter un absolu (« aucun agent pathogène n'est requis »,
« jamais un virus déjà entré »), et la porte `indice-absolu` les a refusés.
Corrigés en rendant à un distracteur l'absolu qui lui revenait.

## Trois choses que la campagne a apprises

**Le plancher est une contrainte d'ÉCRITURE, pas de plomberie.** Avec 6 items
de banc, une notion de SVT ne peut porter que deux ou trois erreurs évaluables
— pas sept. Regrouper artificiellement pour « faire le plancher » aurait menti
sur la pédagogie. Les erreurs sont donc déclarées telles qu'elles existent, et
la dette devient **exacte** : `svt/soi-non-soi` affiche 1 misconception
évaluable et 6 sous le plancher, ce qui se lit « il manque environ douze items
à cette notion ». C'est une décision d'auteur à prendre, pas un défaut à
corriger dans le code.

**Le travail pédagogique était souvent déjà fait.** `maths/calcul-integral` et
`maths/suites-numeriques` avaient des inventaires de 11 et 15 entrées, écrits
avec soin — et presque aucun distracteur ne les citait. Deux notions aveugles
faute du seul fil. C'est le défaut le plus frustrant de la série, et le moins
coûteux à réparer.

**Les fichiers disaient la vérité, et personne ne les lisait.**
`reactions-acido-basiques` porte noir sur blanc : *« les items R0-R7/R12
antérieurs ne portent pas encore d'id de misconception (schéma
pré-cluster) »*. `systemes-oscillants` documente ses `legacy_items_not_retagged`.
C'était exact dans les deux cas. Un commentaire honnête n'est pas une porte :
il vieillit en silence.

## Ce que l'instrument garde

- **`omissions` — porte FRANCHE à zéro.** Tout distracteur du corpus porte
  désormais soit un tag, soit un `null` explicite : un champ simplement absent
  est donc toujours un oubli. Négatif prouvé : retirer un tag de
  `svt/soi-non-soi` fait sortir la porte en code 1 et nomme la notion.
- **`fantomes` — porte franche à zéro** également.
- **`sansTag` — cliquet** : ne peut que descendre, notion par notion.
- **`plancher` — cliquet INVERSE** : le nombre de misconceptions évaluables
  d'une notion ne peut que monter. Une réécriture d'items qui ferait retomber
  une misconception sous 3 items du banc casse le build.
- **Notion neuve** : naît sans aucune omission.

## Ce que l'instrument NE dit PAS

**Si le tag est le BON.** Un distracteur peut porter un id parfaitement déclaré
et n'avoir rien à voir avec l'erreur qu'il incarne. Comme pour les indices de
forme, l'instrument garde la plomberie, pas le sens : seule une relecture
pédagogique tranchera. Les rattachements de cette campagne sont défendables un
par un — ils sortent des feedbacks — mais ils n'ont pas été relus par la voie
pédagogie.

**Combien d'items manquent réellement.** La colonne « sous-pl. » compte les
misconceptions inévaluables ; elle ne dit pas si la bonne réponse est d'écrire
des items ou de fusionner des erreurs trop fines. C'est un arbitrage d'auteur.

**Où en est la dette, après la SVT.** 310 misconceptions restent sous le
plancher, hors SVT — un déficit cumulé de 499 items·misconception, soit **au
mieux 167 items neufs** si chacun visait trois erreurs distinctes. Les notions
les plus creuses : `maths/geometrie-espace` (23 erreurs inévaluables),
`pc/atome-mecanique-newton` (18), `maths/nombres-complexes-1` (16),
`philo/la-violence` (18), `philo/autrui` (16). Ce n'est plus une zone d'ombre :
c'est une file d'attente chiffrée, notion par notion.

## Une seconde disparité, plus grande, découverte en cherchant la suite (2026-09-05)

En prospectant la suite de la campagne SVT, une commande d'inventaire a
répondu à une question que personne n'avait posée : quels fichiers existent,
notion par notion ?

| Matière | Notions | `checkpoints.yaml` | `exercises.yaml` | `bank.yaml` |
|---|---|---|---|---|
| maths | 14 | 14 | 14 | 14 |
| pc | 25 | 25 | 25 | 24 |
| philo | 12 | 10 | 10 | 0 |
| svt | 11 | **0** | **0** | **0** |

La pauvreté d'items mesurée plus haut n'était donc que la moitié visible du
problème. **Onze leçons de SVT n'avaient aucun point d'arrêt** — aucune
question posée pendant la lecture, aucun engagement demandé, donc aucun signal
envoyé au modèle apprenant avant le banc de fin. `philo/l-histoire` et
`philo/le-bonheur` étaient dans le même cas.

Ce manque-là a été refermé le jour même : 90 points d'arrêt écrits (75 en SVT,
15 en philo), les 64 notions du corpus en portent désormais, 363 marqueurs au
total. La contrainte tenue tout du long concerne directement cet audit :
**aucune misconception nouvelle n'a été déclarée**, les 270 distracteurs se
répartissant sur les inventaires existants. Le rapport est inchangé — 458
misconceptions évaluables, 0 fantôme, 111 distracteurs sans tag, tous des
`null` explicites. Ajouter des sondes n'a pas rouvert la dette qu'on venait de
fermer.

Ce qui reste ouvert, et qui n'est pas de l'ordre de l'écriture : la SVT n'a ni
banc d'entraînement (`bank.yaml`) ni exercice de sommet (`exercises.yaml`),
faute d'une banque d'annales — `docs/sujets/` n'a jamais eu de dossier `svt/`.
Voir HANDOFF §10.6 pour la liste complète de ce qui reste et à qui.

## Lancer l'instrument

```bash
cd web
npm run couverture-diagnostique              # le rapport complet
node scripts/couverture-diagnostique.mjs --detail   # chaque distracteur muet, nommé
node scripts/couverture-diagnostique.mjs --porte    # la porte (CI)
node scripts/couverture-diagnostique.mjs --sceller  # resceller APRÈS avoir amélioré
```

Et **toujours** régénérer les artefacts dérivés après avoir touché aux tags :

```bash
node scripts/build-learner-inputs.mjs
```
