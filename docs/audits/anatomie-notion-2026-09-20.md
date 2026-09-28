# De quoi une notion est faite — et la chaîne du mélange cognitif, interrompue

**Mesuré le 2026-09-20** · `node web/scripts/anatomie-notion.mjs`
Corpus : 62 notions, 1 612 items.

> **Ce n'est pas une porte, et ce n'en sera pas une.** Rien ici n'est une
> régression à empêcher : ce sont des faits de fabrication. Un cliquet
> produirait des rouges permanents, c'est-à-dire du bruit qu'on apprend à
> ignorer.

---

## L'inventaire

| artefact | maths | pc | philo | svt | total |
|---|---|---|---|---|---|
| `lesson.md` | 14/14 | 25/25 | 12/12 | 11/11 | **62/62** |
| `items.yaml` | 14/14 | 25/25 | 12/12 | 11/11 | **62/62** |
| `checkpoints.yaml` | 14/14 | 25/25 | 12/12 | 11/11 | **62/62** |
| `exercises.yaml` | 14/14 | 25/25 | 10/12 | **0/11** | 49/62 |
| `bank.yaml` | 14/14 | 24/25 | **0/12** | **0/11** | 38/62 |
| `media/` | 14/14 | 25/25 | **1/12** | 11/11 | 51/62 |
| `derivations.yaml` | 0/14 | 1/25 | 0/12 | 0/11 | **1/62** |
| `retenir.json` | 0/14 | 1/25 | 0/12 | 0/11 | **1/62** |
| `spec.md` | 1/14 | 1/25 | 0/12 | 0/11 | **2/62** |

Trois artefacts sont universels — la leçon, les items, les points d'arrêt.
**Tous les autres sont inégalement répartis**, et le dépôt parle pourtant
partout de « la notion » comme d'une chose unique.

---

## Le constat qui demande un arbitrage : le mélange cognitif est incalculable

Il existe dans ce dépôt une chaîne complète, écrite, entre le Cadre de
Référence officiel et l'écriture d'un item :

1. **`research-lead`** extrait du Cadre les ratios d'habiletés par
   sous-domaine → `docs/cadre/curriculum/*.yaml`, champ
   `habiletes.*.part_examen`, **sourcés page 19**. Exemple réel
   (`pc-physique-chimie.yaml`, électricité) : utilisation 10,5 · application
   expérimentale 3,15 · résolution de problème 7,35.
2. **`pedagogy-architect`** a pour consigne écrite (ligne 25 de son agent) de
   citer ces ratios dans le spec — mot pour mot : *« This makes downstream
   item-authoring match the exam's cognitive mix and gives the bac-fidelity
   critic a numeric target. »*
3. **`item-author`** écrit alors les items en respectant ce mélange.
4. **`bac-fidelity-critic`** vérifie contre la cible numérique.

Le champ qui porte cette information sur un item est **`habilete`**.

**Il est renseigné sur 36 items du corpus. Les 36 sont dans `pc/rlc-serie`,
où il l'est à 36/36. Les 61 autres notions : zéro.**

La conséquence n'est pas que le mélange cognitif du produit soit *mauvais* —
c'est qu'il est **incalculable** sur 97,8 % des items. La cible existe en
amont ; la consigne existe ; la donnée n'a jamais été produite ailleurs que
dans la notion pilote. `bac-fidelity-critic` n'a donc, en pratique, aucune
cible numérique à confronter — il juge à la lecture.

C'est le motif ADR 0031 une fois de plus : **le mécanisme fonctionne là où il
a été posé, et sa portée est de 1 sur 62.**

### Les trois décisions possibles, pour mémoire

- **Renseigner `habilete` sur le corpus** — 1 576 items à étiqueter. Coûteux,
  et c'est la seule voie qui rend la cible utilisable.
- **Renoncer explicitement** — retirer la consigne de `pedagogy-architect` et
  dire dans `docs/` que le mélange cognitif se juge à la lecture, pas au
  compte. Honnête, et gratuit.
- **Laisser tel quel** — c'est le choix actuel, mais il n'a jamais été pris :
  il a été subi. C'est la seule des trois qui ne devrait pas survivre à ce
  document.

Même forme pour `spec.md` (2/62), `derivations.yaml` et `retenir.json` (1/62) :
des artefacts de la notion pilote jamais généralisés. Pour `retenir.json` c'est
**sans conséquence** — le module a un repli documenté et l'état vide est assumé
(§10.18). Pour `habilete`, **il n'y a pas de repli**.

---

## Les 13 notions sans aucune source d'exercices

Ni `exercises.yaml` ni `bank.yaml` — un élève n'y trouve donc que la leçon,
les items diagnostiques et les points d'arrêt :

- `philo/l-histoire`, `philo/le-bonheur`
- les **onze** notions SVT

Les onze SVT sont déjà couvertes par `docs/audits/rampe-entree-2026-09-20.md`
(c'est le même écart de standard, vu par un quatrième axe). **Les deux notions
de philosophie sont nouvelles** : leurs dix sœurs ont toutes un
`exercises.yaml`. C'est un trou isolé, pas un standard — donc à combler plutôt
qu'à arbitrer.

À noter aussi : **aucune notion de philosophie n'a de `bank.yaml`**. Les dix
qui ont des exercices les tirent d'`exercises.yaml`. Si c'est délibéré — les
sujets de philo ne se découpent pas en exercices numérotés comme ceux de
maths — cela mérite une ligne quelque part, parce que le `0/12` se lit
autrement comme une dette.

---

## Ce que ce document ne dit pas

- **Rien sur la qualité de ce qui existe.** Une notion sans `derivations.yaml`
  n'est pas incomplète : l'artefact n'est requis nulle part.
- **Rien sur ce qui DEVRAIT être universel.** Le dépôt ne définit pas
  l'anatomie minimale d'une notion. C'est précisément pourquoi l'inventaire se
  lit mal : il n'y a pas de référence à laquelle le comparer.
