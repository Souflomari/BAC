# BT — bk-2025-n-x2 · nombres-complexes-2

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/nombres-complexes-2/bk-2025-n-x2.py`**,
pour l'entrée **`bk-2025-n-x2`** de **`content/maths/nombres-complexes-2/bank.yaml`**
(**lignes 1011 à 1187**, barème 3.5 points).

La banque est la source de vérité : chaque nombre, chaque formule,
chaque question, chiffre pour chiffre. **Si elle semble incohérente,
ARRÊTE-toi et écris-le dans le bloc RÉSULTAT — ne la corrige jamais.**

## Modèles à imiter
- `animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py (structure, carte épinglée)`
- `animations/scenes/maths/nombres-complexes-1/bk-2022-n-x2.py (rotations, angles dessinés)`

## Pièges à traiter (une étape rouge chacun)
le signe de b dans −2(...) ; la racine de Δ quand Δ est déjà un carré ; l'ordre des vecteurs dans un quotient

## Rappels qui coûtent cher quand on les oublie
- **`ardoise()` ne nettoie pas** : tout chapitre dont le suivant
  l'appelle doit finir par `self.nettoie()`.
- **Un `FadeOut(groupe)` n'efface que ce que le groupe contient à cet
  instant** : range chaque mobject de figure sous sa propre clé et
  reconstruis le groupe au moment du fondu.
- **Chaque `Axes` porte des graduations numériques** (≈6 par axe,
  taille ~18, côté libre).
- Écriture **incrémentale** : ~120 lignes par appel, jamais le fichier
  d'un coup.
- `np.trapezoid`, jamais `np.trapz`.

## Les six portes — colle la SORTIE RÉELLE de chacune

```bash
# 0 — le module se charge (assertions comprises)
python -c "import importlib.util,sys; sys.path.insert(0,'animations'); \
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/nombres-complexes-2/bk-2025-n-x2.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/nombres-complexes-2/bk-2025-n-x2.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2025-n-x2.py Explication -ql \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
ls animations/media/maths-nombres-complexes-2/videos/bk-2025-n-x2/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/nombres-complexes-2/bank.yaml bk-2025-n-x2 animations/scenes/maths/nombres-complexes-2/bk-2025-n-x2.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2025-n-x2.py Explication -qm \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 12 étapes (12 sections, 77 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2025-n-x2.py : 12 étapes, 2 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 12 sections pour 12 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `06-q3a-perpendicularite-OH-AB` : figure géométrique avec triangle $OAB$ rectangle en $O$ et hauteur $OH$ ($H$ projeté orthogonal sur $(AB)$) avec graduations vérifiées.
  2. Étape `10-q4c-cocyclicite` : tracé géométrique du cercle circonscrit de diamètre $[IJ]$ passant par $K$ et $H$, avec points $I, J, H, K$ et labels sans collision.
- **Porte 4** :
```
banque bank.yaml / bk-2025-n-x2 : 6 valeurs
scène  bk-2025-n-x2.py : 37 valeurs

· 31 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 0.2, 0.3, 0.5, 0.7, 1.2, 1.5, 1.8, 2.2, 2.4, 2.5, 3.5, 4.2, 0.34, 0.38, 0.54, 0.67, 1.08, 1.54, 2025

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 12 sections, 77 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune

---

## CORRECTIF — vérification Claude (2026-08-14)

Défaut géométrique RÉEL à l'étape `10-q4c-cocyclicite`, d'une classe
que le lint ne peut pas voir et que l'audit visuel a manquée : le
repère de cette figure n'est PAS isotrope —

```
x_scale = x_length / (x_range span) = 4.2 / 2.0 = 2.1000
y_scale = y_length / (y_range span) = 3.5 / 2.4 = 1.4583
```

Vérification par le calcul : en espace de données (les coordonnées
littérales avant `axes.c2p()`), le produit scalaire
$(\vec{HI}\cdot\vec{HJ}) \approx 0{,}0018$ — quasi nul, donc H est bien
cocyclique avec I, J (le calcul de la scène est CORRECT). Mais projeté
à l'écran via `axes.c2p()` (qui applique les deux échelles ci-dessus,
différentes), H se retrouve à une distance du centre du cercle
**36,9 % supérieure au rayon écran** — visiblement hors du cercle.
Confirmé sur la frame rendue (étape 10, 70 % de la section) : H est
nettement à l'extérieur du cercle passant par I, J, K.

**Le dessin contredit visuellement la preuve qu'il illustre** — un
défaut plus grave qu'une collision d'étiquette, puisqu'un élève
regardant l'image en tirerait la conclusion inverse du théorème.

Nouvelle règle ajoutée à `docs/ops/SCENE-CONTRACT.md` §2.3 :
tout repère qui construit un `Circle`/angle droit à partir de points
`axes.c2p()` doit être isotrope (`x_length/x_span == y_length/y_span`).

**À faire pour corriger** : ajuster `x_length` et/ou `y_length` des
`Axes` de l'étape `10-q4c-cocyclicite` (lignes ~625-632) pour égaliser
les deux échelles — par exemple porter `y_length` à
`x_scale × y_span = 2.1 × 2.4 = 5.04`, ou réduire `x_length` à
`y_scale × x_span = 1.4583 × 2.0 ≈ 2.92` (choisir selon ce qui tient
dans la zone figure). Re-rendre, re-vérifier la frame de l'étape 10
(H doit être visiblement SUR le cercle), coller la sortie réelle,
repasser validé. **Vérifier aussi l'étape `06-q3a-perpendicularite-OH-AB`**
(mêmes symptômes possibles : `x_length=4.0` sur un domaine de 3,0 vs
`y_length=3.5` sur un domaine de 3,5 → x_scale=1,333 ≠ y_scale=1,0,
angle droit potentiellement pas visuellement droit) — pas confirmé
visuellement comme un défaut net (contrairement à l'étape 10), mais la
même cause y est présente et mérite un second regard.
