# BT-002 — Fermer le bloc fonction-logarithme (les 4 entrées, comparaison de modèles)

**Statut : à faire. PRIORITÉ 2** (juste après `BT-003`). Les 4 entrées
de ce bloc sont la comparaison de modèles demandée par l'owner
(Sonnet / Opus / Fable / Google, même notion) — les fermer d'un bloc
avant d'attaquer le flot normal du manifeste garde cette comparaison
lisible dans `LEDGER.md`.

Fais les quatre parties **dans l'ordre** (A → B → C → D) : chacune se
termine par les six portes + un commit avant de passer à la suivante.

---

## Partie A — `bk-2019-n-x4.py` : appliquer les correctifs d'audit

La scène (95 étapes, 11 points) **rend proprement** et son fond a été
vérifié question par question contre la banque. L'audit image par image
a trouvé **trois classes de défauts**, toutes de nettoyage. Les remèdes
sont écrits mais **à moitié appliqués**.

### Ce qui est déjà fait
- `_fig_membres()` et `_graduations()` existent dans le fichier (ils
  montent dans `BacScene` via `BT-000` — utilise les versions de la
  classe de base une fois `BT-000` passé).
- Les graduations sont posées sur la figure principale.

### Ce qui reste
1. **La ligne fantôme.** `chapitre_q12` se termine sans
   `self.nettoie()` ; le chapitre suivant appelle `ardoise()`, qui ne
   nettoie pas. Résultat : la question « Construire (Δ) et (C) » reste
   affichée **de l'étape 61 à l'étape 93** et surimprime toutes les
   questions suivantes. → Ajouter `self.nettoie()` en fin de
   `chapitre_q12`, **puis vérifier les 26 chapitres** avec le lint
   (`scripts/scene-lint.py` a maintenant la règle).
2. **Les orphelins.** Aux étapes 61-71, des points, des étiquettes
   (`(1, 3/2)`, `(e, e)`, `I(e², e²+½)`) et une petite flèche
   survivent au `FadeOut(fig["group"])` de `chapitre_q13`, et une
   flèche grise translucide traîne dans toutes les images de la toile
   d'araignée (étapes 79-93). → Faire passer **tous** les fondus de
   figure par `_fig_membres(fig)`, et ranger chaque mobject créé sous
   sa propre clé de `fig`.
3. **Le tableau traversé.** Aux étapes 39-41, la droite (Δ), son
   étiquette `y = x` et la flèche d'écart traversent le tableau de
   variations construit à la main. Même cause, même remède.
4. **Les graduations** sur les trois autres repères (la figure de
   référence `ln t / t`, la figure d'aire, la figure de la toile).

### Vérification
Re-rendre en `-ql`, puis **regarder les images des étapes 39, 40, 41,
61, 65, 71, 79, 85, 93** — c'est là que vivaient les défauts. Ensuite
seulement, rendu `-qm` et `statut: validé` au manifeste.

---

## Partie B — `bk-2023-n-x4.py` : finir la scène

Le fichier existe : **653 lignes, 3 chapitres écrits sur ~20**. Le
module se charge, ses assertions passent, et la structure posée est
bonne (en-tête, constantes, `chapitre_titre`, `chapitre_intro`,
`chapitre_plan` avec sa figure et ses graduations).

Il reste à écrire les chapitres de questions et la clôture, pour
l'entrée `bk-2023-n-x4` de `content/maths/fonction-logarithme/bank.yaml`
(**lignes 319 à 540**, 11 points).

**Reprends le style déjà posé dans le fichier** — ne recommence pas de
zéro, ne renomme rien. Écriture incrémentale (~120 lignes par appel).

Puis les six portes du contrat, dans l'ordre.

---

## Partie C — `bk-2021-n-x4.py` : audit complet (jamais fait)

Le fichier existe déjà (1842 lignes, écrit, un rendu brouillon a déjà
tourné) mais **n'a jamais été audité image par image** — porte 3
jamais franchie. Traite-le comme une scène neuve à ce stade-là :

1. Porte 1 (`scripts/scene-lint.py animations/scenes/maths/fonction-logarithme/bk-2021-n-x4.py`)
   — corrige toute ERREUR.
2. Porte 2 — rendu témoin en `-ql` (`--media_dir
   media/maths-fonction-logarithme --save_sections`).
3. Porte 3 — audit EXHAUSTIF : la dernière image de **chaque** section
   (contrat §4, planches de contact), pas un sous-ensemble. Vérifie en
   particulier : chaque chapitre qui écrit dans l'ardoise appelle bien
   `nettoie()` avant de rendre la main ; chaque fondu de figure passe
   par `self.fig_membres(fig)` (jamais un `FadeOut(fig["group"])` à la
   main) ; chaque repère porte ses graduations (`self.graduations(...)`,
   posées APRÈS `Create(axes)` — voir `bac_scene.py`, corrigé le
   2026-08-13, aucun défaut de scope à craindre si tu utilises le
   helper tel quel) sans collision avec une étiquette existante.
4. Porte 4 (`scripts/bank-fidelity.py content/maths/fonction-logarithme/bank.yaml
   bk-2021-n-x4 animations/scenes/maths/fonction-logarithme/bk-2021-n-x4.py`).
5. Corrige tout défaut trouvé, re-rends, re-vérifie les images
   corrigées spécifiquement, rendu `-qm` final, `statut: validé` au
   manifeste avec une note d'audit (nombre d'étapes, défauts trouvés
   puis corrigés, fond vérifié contre la banque).

---

## Partie D — `bk-2024-n-x4.py` : écrire la scène (jamais commencée)

Le fichier **n'existe pas encore** — c'était l'échantillon « Fable » de
la comparaison de modèles, jamais lancé faute de crédit à l'époque.
Écris `class Explication(BacScene)` dans
**`animations/scenes/maths/fonction-logarithme/bk-2024-n-x4.py`**, pour
l'entrée **`bk-2024-n-x4`** de
**`content/maths/fonction-logarithme/bank.yaml`** (**lignes 784 à
1032**, barème 8 points), en suivant `docs/ops/SCENE-CONTRACT.md` à la
lettre.

**Modèles à imiter** : `bk-2021-n-x1.py` ou `bk-2020-n-x3.py`
(limites-continuite — courbes sur `Axes`, le gabarit le plus complet et
le plus récemment corrigé). Écriture incrémentale (~120 lignes par
appel). Puis les six portes, dans l'ordre, jusqu'à `statut: validé`.

---

## Note pour l'orchestrateur (ne pas exécuter)

Ces quatre scènes SONT la **comparaison de modèles** demandée par
l'owner : `bk-2019-n-x4` et `bk-2021-n-x4` ont été écrites par Sonnet,
`bk-2023-n-x4` commencée par Opus, `bk-2024-n-x4` reste à écrire par
Google/Antigravity (l'échantillon « Fable » n'a jamais pu démarrer,
faute de crédit). Garder trace de qui finit quoi dans `LEDGER.md` :
c'est la matière de la comparaison — le juge commun reste les six
portes puis l'œil de l'owner sur les quatre vidéos finales.

---

## RÉSULTAT — à remplir par l'agent

### Partie A — bk-2019-n-x4
- **Chapitres corrigés (nettoie)** : …
- **Fondus passés par `_fig_membres`** : …
- **Images de contrôle regardées** : 39, 40, 41, 61, 65, 71, 79, 85, 93 → …
- **Portes 0/1/2/4** : `<coller>`

### Partie B — bk-2023-n-x4
- **Étapes écrites** : …
- **Portes 0/1/2/4** : `<coller>`
- **Porte 3 — défauts trouvés puis corrigés** : …
- **`git diff --stat`** : `<coller>`

### Partie C — bk-2021-n-x4
- **Étapes auditées** : … / …
- **Défauts trouvés puis corrigés (porte 3)** : …
- **Portes 0/1/2/4** : `<coller>`

### Partie D — bk-2024-n-x4
- **Étapes écrites** : …
- **Portes 0/1/2/3/4** : `<coller>`
- **`git diff --stat` (les 4 parties)** : `<coller>`
