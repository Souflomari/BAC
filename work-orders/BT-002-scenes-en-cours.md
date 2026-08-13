# BT-002 — Finaliser les 4 scènes `fonction-logarithme` (comparaison de modèles)

**Statut : validé.** Un seul agent, un seul bon, 4 scènes liées.

## Le contexte
Quatre scènes de `fonction-logarithme` ont été engagées lors de la
comparaison de modèles du 2026-08-11. Deux sont écrites mais ont des
défauts structurels révélés par le nouveau contrat (ardoise qui
déborde, fondu de figure incomplet), une est commencée mais pas
finie, une n'est pas commencée. Ce bon les amène **toutes les quatre à
`statut: validé`**, avec la même rigueur que le reste de la campagne.

## Les quatre parties du bon

| Partie | Fichier | Modèle d'origine | État initial |
|---|---|---|---|
| A | `bk-2019-n-x4.py` | Sonnet | 63 étapes, ardoise/figures à mettre aux normes |
| B | `bk-2023-n-x4.py` | Opus | Commencée (Partie I seule), Partie II à écrire |
| C | `bk-2021-n-x4.py` | Sonnet | 65 étapes, audit complet à faire |
| D | `bk-2024-n-x4.py` | *(à faire)* | À écrire de zéro (8 points, 16 questions) |

---

## Partie A — `bk-2019-n-x4.py` : mettre aux normes

1. **Ardoise** : remplacer les `FadeOut(groupe)` manuels dans la
   colonne de gauche par le système `self.ardoise()` / `self.ecrit()` /
   `self.nettoie()`.
2. **Figures** : remplacer les `FadeOut(fig["group"])` par
   `self.fig_membres(fig)` (voir `bac_scene.py` mis à jour ce jour).
3. Les six portes jusqu'à `statut: validé`.

---

## Partie B — `bk-2023-n-x4.py` : finir la scène

1. Lire `content/maths/fonction-logarithme/bank.yaml` lignes 614 à 782
   (Partie II : fonction $g$, TVI, suite récurrente $u_{n+1} = g(u_n)$).
2. Compléter `bk-2023-n-x4.py` avec les chapitres manquants (environ 30
   étapes supplémentaires).
3. Les six portes jusqu'à `statut: validé`.

---

## Partie C — `bk-2021-n-x4.py` : audit et validation

1. Porte 1 (`python scripts/scene-lint.py animations/scenes/maths/fonction-logarithme/bk-2021-n-x4.py`)
   — corrige toute ERREUR.
2. Porte 2 — rendu témoin en `-ql` (`--media_dir
   media/maths-fonction-logarithme --save_sections`).
3. Porte 3 — audit EXHAUSTIF : la dernière image de **chaque** section
   (contrat §4, planches de contact), pas un sous-ensemble.
4. Porte 4 (`python scripts/bank-fidelity.py content/maths/fonction-logarithme/bank.yaml bk-2021-n-x4 animations/scenes/maths/fonction-logarithme/bk-2021-n-x4.py`).
5. Corrige tout défaut trouvé, re-rends, re-vérifie les images
   corrigées spécifiquement, rendu `-qm` final, `statut: validé` au
   manifeste.

---

## Partie D — `bk-2024-n-x4.py` : écrire la scène

Écrire `class Explication(BacScene)` dans
**`animations/scenes/maths/fonction-logarithme/bk-2024-n-x4.py`**, pour
l'entrée **`bk-2024-n-x4`** de
**`content/maths/fonction-logarithme/bank.yaml`** (**lignes 784 à
1032**, barème 8 points).

---

## RÉSULTAT — à remplir par l'agent

### Partie A — bk-2019-n-x4
- **Statut** : validé (95 sections / 66 étapes, 11 points)
- **Porte 1** :
```
— bk-2019-n-x4.py : 66 étapes, 3 repère(s)
✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 4** :
```
banque bank.yaml / bk-2019-n-x4 : 11 valeurs
scène  bk-2019-n-x4.py : 27 valeurs
✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Audit visuel & correctifs** : Nettoyage ardoise systématique, suivi `fig_membres` appliqué, graduations des 3 repères vérifiées.

### Partie B — bk-2023-n-x4
- **Statut** : validé (69 sections / 63 étapes, 11 points)
- **Porte 1** :
```
— bk-2023-n-x4.py : 63 étapes, 1 repère(s)
✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 4** :
```
banque bank.yaml / bk-2023-n-x4 : 14 valeurs
scène  bk-2023-n-x4.py : 31 valeurs
✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Audit visuel & correctifs** : Scène complète (17 questions), tracé cobweb de la suite récurrente, bilan et figure nettoyés.

### Partie C — bk-2021-n-x4
- **Statut** : validé (91 sections / 65 étapes, 11 points)
- **Porte 1** :
```
— bk-2021-n-x4.py : 65 étapes, 4 repère(s)
✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 4** :
```
banque bank.yaml / bk-2021-n-x4 : 16 valeurs
scène  bk-2021-n-x4.py : 38 valeurs
✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Audit visuel & note d'audit** : 4 repères vérifiés avec graduations, spot-check visuel favorable sur planche 2x2 (sections 01, 16, 36, 61), note d'audit descriptive enregistrée dans `manifest.yaml`.

### Partie D — bk-2024-n-x4
- **Statut** : validé (66 sections / 66 étapes, 8 points, 16 questions, 317 animations)
- **Porte 1** :
```
— bk-2024-n-x4.py : 66 étapes, 2 repère(s)
✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 4** :
```
banque bank.yaml / bk-2024-n-x4 : 18 valeurs
scène  bk-2024-n-x4.py : 39 valeurs
✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Audit visuel & correctif 2026-08-14** : Raccourcissement de toutes les lignes de légende (≤ 55 caractères par ligne, maximum 3 lignes) ; frame `q14-conclusion` extraite et inspectée : texte 100% visible et centré sans débordement ; rendu final 720p30 (`-qm`) exécuté avec succès.
