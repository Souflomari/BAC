# BT-100 — Convertir les 9 exercices de rattrapage vérifiés

**Statut : PRÊT À EXÉCUTER.** Bloqué le 2026-08-22 par l'épuisement des
crédits, pas par une question ouverte. Tout ce qu'il faut est ci-dessous.

## Ce qui est prêt

Deux sujets de rattrapage PC **entièrement vérifiés** (re-fetch du scan +
re-dérivation par un second lecteur, voir
`docs/sujets/_incoming/JOURNAL-VERIFICATION.md`) :

| Source | Exercice | Barème | Notion cible | id d'entrée |
|---|---|---|---|---|
| 2021 R | Ex 1 partie 1 — acide méthanoïque | 5,0 | `reactions-acido-basiques` | `bk-2021-r-x1` |
| 2021 R | Ex 1 partie 2 — pile nickel-argent | 2,0 | `piles` | `bk-2021-r-x1b` |
| 2021 R | Ex 2 — ondes sonores | 2,0 | `ondes-mecaniques-progressives` | `bk-2021-r-x2` |
| 2021 R | Ex 3 — désintégration du phosphore 32 | 2,5 | `decroissance-radioactive` | `bk-2021-r-x3` |
| 2021 R | Ex 4 partie I — dipôle RC | 2,0 | `rc-charge` | `bk-2021-r-x4` |
| 2021 R | Ex 4 partie II — dipôle RL | 2,0 | `dipole-rl` | `bk-2021-r-x4b` |
| 2021 R | Ex 4 partie III — oscillations RLC | 1,5 | `rlc-serie` | `bk-2021-r-x4c` |
| 2021 R | Ex 5 — projectile (tir à l'arc) | 3,0 | `chute-mouvements-plans` | `bk-2021-r-x5` |
| 2022 R | Ex 1 partie 1 — électrolyse | — | `electrolyse` | `bk-2022-r-x1` |
| 2022 R | Ex 1 partie 2 — méthylamine | — | `reactions-acido-basiques` | `bk-2022-r-x1b` |
| 2022 R | + 2 autres, voir le fichier | — | voir « ## Classement » | — |

Sources : `docs/sujets/_incoming/pc-spc-2021-r.md` et `pc-spc-2022-r.md`
(sections « ## Classement » en fin de fichier — elles ont été corrigées
par le vérificateur, elles font foi).

**Ce sont les PREMIÈRES entrées de session RATTRAPAGE du corpus** : toutes
les banques existantes sont en session normale. Le champ
`source.session: rattrapage` est déjà géré par le rendu (BankCard affiche
« Rattrapage ») et par l'assemblage d'épreuves (`lib/examens.ts`) — rien
à coder, seulement à remplir.

## Comment

Un `content-author` par notion cible, brief au modèle de ceux de la
session (voir n'importe quelle NOTE ÉDITORIALE de `bank.yaml` récente).
Les règles dures rappelées :

- énoncé copié FIDÈLEMENT depuis `_incoming` — **les descriptions de
  figures sont celles du vérificateur**, jamais réécrites : elles ont
  coûté douze corrections au pixel ;
- `filiere: "SPC"`, `session: rattrapage` ;
- correction complète, digit-by-digit, voix maison ;
- `sourcing` : URL AlloSchool + mention du statut vérifié ;
- pièges YAML/KaTeX connus (`\equiv` échappé, pas de φ littéral ni de
  guillemets français dans `\text{}`, `''` pour l'apostrophe).

Une entrée porte une **incohérence du sujet officiel** documentée
(courbe de dosage 2021 non cohérente avec le pK_A) : la reprendre telle
quelle avec sa note, ne pas « réparer » le sujet.

## Ensuite

Les cinq sujets restants (`pc-spc-2023/2024/2025-r`, `maths-sm-2023/2024-r`
— 21 exercices) attendent leur **vérification adversariale**, qui est un
préalable non négociable. Le brief est celui du workflow
`verif-rattrapage` ; il suffit de le relancer sur ces cinq fichiers.
