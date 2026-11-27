# File de travail d'Antigravity

> Traitée par le flux `lot` (`.agents/workflows/lot.md`), un genre à la fois. Une ligne = un travail fermé,
> sur sa branche, en PR brouillon vers `claude/vibrant-fermi-v1lxj5`. États : à faire, fait, bloquée.
> Le genre dit aussi le modèle conseillé : **écrire, planifier, corriger avec le modèle économique ;
> relire avec le modèle le plus fort, dans une conversation neuve.** Rien n'est fusionné par Antigravity.

## Lot 1 — corriger

| # | Leçon | Branche | Rapport à suivre | État | PR | Bilan |
|---|---|---|---|---|---|---|
| 1 | dosage | `antigravity/dosage` | rapport 20, sur la branche `antigravity/relecture-dosage` | fait | 20 | 14 bloquants et 19 à corriger du rapport 20 repris + 3 points au balayage ; contrôles, parcours (desktop/mobile) et batterie verte (`next build` laissé à la CI). |
| 2 | acides-bases | `antigravity/acides-bases` | rapport 21, sur la branche `antigravity/relecture-acides-bases` (PR 22) | à faire | 19 | Rapport 21 livré sur `antigravity/relecture-acides-bases` (PR 22, relue sous `next dev` en mouvement réel) : 9 bloquants, 11 à corriger, 4 à discuter (24 constats). |

## Lot 2 — planifier

Format allégé (30 à 35 étapes, 6 gabarits, scènes réutilisées). Un plan par ligne, dans `docs/refonte/specs/`.

| # | Notion (dossier de `content/`) | Fiche de la bible | Branche | État | PR | Bilan |
|---|---|---|---|---|---|---|
| 3 | `pc/rlc-serie` | physique E3 | `antigravity/plan-rlc-serie` | à faire | | |
| 4 | `maths/limites-continuite` | maths A2 | `antigravity/plan-limites-continuite` | à faire | | |
| 5 | `maths/derivabilite-etude-fonctions` | maths A4 | `antigravity/plan-derivation` | à faire | | |
| 6 | `pc/ondes-mecaniques-progressives` | physique O1 | `antigravity/plan-ondes-progressives` | à faire | | |
| 7 | `pc/transformations-lentes-rapides` | chimie C1 | `antigravity/plan-cinetique-1` | à faire | | |
| 8 | `pc/suivi-temporel-vitesse` | chimie C2 | `antigravity/plan-cinetique-2` | à faire | | |

## Lot 3 — écrire

Une leçon par plan du lot 2, sur une branche `antigravity/<nom>` créée depuis `claude/vibrant-fermi-v1lxj5`
à laquelle on ajoute la branche du plan. Lignes 9 à 14 : mêmes notions que 3 à 8, dans le même ordre.
État de chacune : à faire, dès que son plan est « fait ».

## Lot 4 — relire

Toutes les leçons du lot 3 dont l'état est « fait ». Un rapport par leçon dans le dossier des rapports de
la revue externe, avec le décompte dans le bilan.

## Lot 5 — corriger

Toutes les leçons relues au lot 4.
