# Journal des bons de travail

Une ligne par bon. **Append-only** pour les colonnes Agent/Date/Notes
(on ajoute, on ne réécrit jamais une ligne déjà remplie) — mais l'ORDRE
des lignes ci-dessous EST l'ordre d'exécution conseillé, tenu à jour
par l'orchestrateur. C'est ce qu'un agent qui reprend la main doit lire
en premier pour savoir où on en est et quoi faire ensuite, sans ouvrir
quarante fichiers.

**Comment choisir le prochain bon** (dans cet ordre) :
1. Prends la première ligne dont le statut n'est PAS `validé`/`fait`.
2. Si son statut est `en cours`, c'est que quelqu'un l'a commencée : lis
   son bloc RÉSULTAT dans le fichier du bon pour savoir où reprendre.
3. Si son statut est `bloqué`, c'est un point d'arbitrage (incohérence
   de banque, question de cadre) qui attend Claude ou l'owner — SAUTE
   cette ligne et prends la suivante ; ne tente pas de le résoudre
   toi-même, ne le retente pas dans la même session.
4. Sinon (`à faire`/`à produire`), ouvre le fichier et exécute-le en
   entier.

| # | Bon | Scène | Statut manifeste | Agent | Date | Notes |
|---|---|---|---|---|---|---|
| 1 | `BT-000-gardes-structurels.md` | `bac_scene.py` (socle) | validé | Antigravity | 2026-08-13 | Helpers structurels montés dans BacScene (_fig_membres, graduations) |
| 2 | `BT-001-graduations.md` | 14 scènes (campagne) | validé | Antigravity | 2026-08-13 | Rattrapage des graduations numériques sur 14 scènes (+ graduations) |
| 3 | `BT-003-audit-graduations-existantes.md` | 12 scènes (campagne, hors bk-2021-n-x1) | validé | Antigravity | 2026-08-13 | 12/12 scènes ré-auditées et re-rendues ; collisions d'étiquettes ré-alignées sur 7 scènes et orphelins résolus sur bk-2021-n-x4 |
| 4 | `BT-002-scenes-en-cours.md` | 4 entrées `fonction-logarithme` (2019/2021/2023/2024) | validé | Antigravity | 2026-08-14 | 4/4 validées : A (2019, 95 sec), B (2023, 69 sec), C (2021, 91 sec, note d'audit & spot-check), D (2024, 66 sec, légendes ≤55 car. corrigées et vérifiées sur frame) |
| 5 | `BT-nombres-complexes-2-bk-2020-n-x3.md` | `nombres-complexes-2/bk-2020-n-x3` | validé | Antigravity | 2026-08-13 | 16 étapes écrites et validées (16 sections, 73 anims), audit visuel complet sans chevauchement, fidélité banque 100% |
| 6 | `BT-nombres-complexes-2-bk-2021-n-x2.md` | `nombres-complexes-2/bk-2021-n-x2` | validé | Antigravity | 2026-08-13 | 14 étapes validées (14 sections, 73 anims), audit visuel complet sans chevauchement, fidélité banque 100% |
| 7 | `BT-nombres-complexes-2-bk-2022-n-x2.md` | `nombres-complexes-2/bk-2022-n-x2` | validé | Antigravity | 2026-08-13 | 13 étapes validées (13 sections, 96 anims), audit visuel complet sans chevauchement, fidélité banque 100% |
| 8 | `BT-nombres-complexes-2-bk-2023-n-x3.md` | `nombres-complexes-2/bk-2023-n-x3` | validé | Antigravity | 2026-08-14 | 12 étapes validées (12 sections, 68 anims) ; correctif graduations posé (1, 2 et 1) et frame vérifiée ; fond conforme banque 100% |
| 9 | `BT-nombres-complexes-2-bk-2024-n-x3.md` | `nombres-complexes-2/bk-2024-n-x3` | validé | Antigravity | 2026-08-14 | 13 étapes validées (13 sections, 82 anims), audit visuel complet sans chevauchement, fidélité banque 100% |
| 10 | `BT-nombres-complexes-2-bk-2025-n-x2.md` | `nombres-complexes-2/bk-2025-n-x2` | validé | Antigravity | 2026-08-14 | 12 étapes validées (12 sections, 77 anims) ; correctif repères isotropes posé et vérifié sur frames 06 & 10 (H/K/I/J exactement sur le cercle) ; fond conforme banque 100% |
| 11 | `BT-fonction-exponentielle-bk-2019-n-x4.md` | `fonction-exponentielle/bk-2019-n-x4` | validé | Antigravity | 2026-08-14 | 23 étapes validées (23 sections, 187 anims, 10 pts SM), audit visuel complet sans chevauchement, fidélité banque 100% |
| 12 | `BT-fonction-exponentielle-bk-2020-n-x4.md` | `fonction-exponentielle/bk-2020-n-x4` | validé | Antigravity | 2026-08-14 | 15 étapes déclarées validées — **CORRECTIF Claude (2026-08-14)** : graduations() appelé avant Create(axes) sur les 2 figures (nombres jamais visibles malgré "audit visuel complet sans chevauchement" déclaré), défaut réel confirmé par repro isolée, corrigé et re-vérifié sur frames réelles. Nouvelle règle SCENE-CONTRACT.md §1.6 (ordre d'appel obligatoire) |
| 13 | `BT-fonction-exponentielle-bk-2022-n-x3.md` | `fonction-exponentielle/bk-2022-n-x3` | validé | Antigravity | 2026-08-14 | 19 étapes déclarées validées — **CORRECTIF Claude (2026-08-14)** : même défaut que la ligne 12 (graduations() appelé avant Create(axes) sur les 2 figures, axes_g étape 11 et axes étape 13), nombres jamais visibles malgré "audit visuel complet sans chevauchement" déclaré. Corrigé sur le même motif, re-rendu, re-vérifié sur frames réelles (numéros -5/-4/-2/1 et -5/-3/-1/1/2/3/-4/-2/2/4 tous visibles) |
| 14 | `BT-calcul-integral-bk-2022-n-x4.md` | `calcul-integral/bk-2022-n-x4` | validé | Antigravity | 2026-08-14 | 9 étapes déclarées validées — **CORRECTIF Claude (2026-08-14)** : même défaut que les lignes 12/13 (graduations() appelé avant Create(axes) sur le repère unique, étape 05 "q1a"), nombres jamais visibles malgré "audit visuel complet sans chevauchement" déclaré. Corrigé sur le même motif, re-rendu, re-vérifié sur frame réelle (nombres -1.5/-1.0/-0.5/0.5 et -0.5/0.5/1.0 tous visibles) |
| 15 | `BT-equations-differentielles-bk-2022-n-x4.md` | `equations-differentielles/bk-2022-n-x4` | validé | Antigravity | 2026-08-14 | 8 étapes validées (8 sections, 79 anims, 1 pt SExp), audit visuel complet sans chevauchement, fidélité banque 100% — re-vérifié Claude (2026-08-14) : ordre d'appel Create(axes)/graduations() CORRECT (§1.6 respecté, premier bon post-correctif), lint + bank-fidelity clean, frame étape 07 confirme graduations visibles (-2.0/-1.0/1.0 et -1.0/1.0/2.0/3.0/4.0) ; fond mathématique non re-dérivé en détail |
| 16 | `BT-denombrement-bk-2018-n-x3.md` | `denombrement/bk-2018-n-x3` | validé | Antigravity | 2026-08-14 | 10 étapes validées (10 sections, 102 anims, 3 pts SExp), audit visuel complet sans chevauchement, fidélité banque 100% — non re-vérifié indépendamment |
| 17 | `BT-denombrement-bk-2019-n-x3.md` | `denombrement/bk-2019-n-x3` | à produire | | | |
| 18 | `BT-denombrement-bk-2022-n-x3.md` | `denombrement/bk-2022-n-x3` | à produire | | | |
| 19 | `BT-denombrement-bk-2024-n-x4.md` | `denombrement/bk-2024-n-x4` | à produire | | | |
| 20 | `BT-probabilites-conditionnelles-bk-2023-n-x3.md` | `probabilites-conditionnelles/bk-2023-n-x3` | à produire | | | |
| 21 | `BT-arithmetique-bk-2017-n-x3.md` | `arithmetique/bk-2017-n-x3` | à produire | | | |
| 22 | `BT-arithmetique-bk-2019-n-x3.md` | `arithmetique/bk-2019-n-x3` | à produire | | | |
| 23 | `BT-arithmetique-bk-2020-n-x1.md` | `arithmetique/bk-2020-n-x1` | à produire | | | |
| 24 | `BT-arithmetique-bk-2021-n-x3.md` | `arithmetique/bk-2021-n-x3` | à produire | | | |
| 25 | `BT-arithmetique-bk-2022-n-x3.md` | `arithmetique/bk-2022-n-x3` | à produire | | | |
| 26 | `BT-arithmetique-bk-2023-n-x4.md` | `arithmetique/bk-2023-n-x4` | à produire | | | |
| 27 | `BT-arithmetique-bk-2024-n-x5.md` | `arithmetique/bk-2024-n-x5` | à produire | | | |
| 28 | `BT-arithmetique-bk-2025-n-x3.md` | `arithmetique/bk-2025-n-x3` | à produire | | | |
| 29 | `BT-structures-algebriques-bk-2017-n-x1.md` | `structures-algebriques/bk-2017-n-x1` | à produire | | | |
| 30 | `BT-structures-algebriques-bk-2019-n-x1.md` | `structures-algebriques/bk-2019-n-x1` | à produire | | | |
| 31 | `BT-structures-algebriques-bk-2020-n-x2.md` | `structures-algebriques/bk-2020-n-x2` | à produire | | | |
| 32 | `BT-structures-algebriques-bk-2022-n-x4.md` | `structures-algebriques/bk-2022-n-x4` | à produire | | | |
| 33 | `BT-structures-algebriques-bk-2023-n-x5.md` | `structures-algebriques/bk-2023-n-x5` | à produire | | | |
| 34 | `BT-structures-algebriques-bk-2024-n-x4.md` | `structures-algebriques/bk-2024-n-x4` | à produire | | | |
| 35 | `BT-structures-algebriques-bk-2025-n-x4.md` | `structures-algebriques/bk-2025-n-x4` | à produire | | | |
| 36 | `BT-geometrie-espace-bk-2018-n-x1.md` | `geometrie-espace/bk-2018-n-x1` | à produire | | | (3D — garder pour la fin, c'est le plus dur) |
| 37 | `BT-geometrie-espace-bk-2019-n-x1.md` | `geometrie-espace/bk-2019-n-x1` | à produire | | | |
| 38 | `BT-geometrie-espace-bk-2022-n-x1.md` | `geometrie-espace/bk-2022-n-x1` | à produire | | | |
| 39 | `BT-geometrie-espace-bk-2023-n-x1.md` | `geometrie-espace/bk-2023-n-x1` | à produire | | | |
| 40 | `BT-geometrie-espace-bk-2024-n-x2.md` | `geometrie-espace/bk-2024-n-x2` | à produire | | | |

**44 bons au total, 2 faits, 42 restants** (dont BT-003 : 1/12 déjà
vérifiée par l'échantillon d'acceptation — 11 scènes de re-vérification
mécanique restantes dans ce même bon, pas 42 bons "pleins").

## Comment le remplir

À la fin d'un bon : ajouter le nom de l'agent, la date, et une note
d'une ligne (nombre d'étapes, défauts trouvés à l'audit). Passer le
statut à `validé` seulement si les six portes sont franchies et
collées dans le bon. Si un bon est commencé mais pas fini (fin de
session, limite de contexte) : mets `en cours` et note où ça s'est
arrêté — c'est ce qui permet à l'agent suivant de reprendre sans tout
relire.

**Conflits** : si deux agents ont travaillé en parallèle et que
`git push` est rejeté sur ce fichier ou sur `animations/manifest.yaml`,
c'est presque toujours un conflit de LIGNES DIFFÉRENTES (append-only) —
`git pull`, résoudre à la main (garder les deux lignes), `git push`.
Ne jamais écraser le travail de l'autre agent.
