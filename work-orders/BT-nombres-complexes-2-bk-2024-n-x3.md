# BT — bk-2024-n-x3 · nombres-complexes-2

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/nombres-complexes-2/bk-2024-n-x3.py`**,
pour l'entrée **`bk-2024-n-x3`** de **`content/maths/nombres-complexes-2/bank.yaml`**
(**lignes 553 à 714**, barème 3.5 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/nombres-complexes-2/bk-2024-n-x3.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/nombres-complexes-2/bk-2024-n-x3.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2024-n-x3.py Explication -ql \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
ls animations/media/maths-nombres-complexes-2/videos/bk-2024-n-x3/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/nombres-complexes-2/bank.yaml bk-2024-n-x3 animations/scenes/maths/nombres-complexes-2/bk-2024-n-x3.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2024-n-x3.py Explication -qm \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 13 étapes (13 sections, 82 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2024-n-x3.py : 13 étapes, 2 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 13 sections pour 13 étapes
- **Porte 3 — défauts trouvés puis corrigés** :
  1. Étape `07-q3b-alignement` : simplification du `MathTex` sur la ligne de conclusion d'alignement pour éviter tout glitch de rendu typographique.
  2. Étape `12-q5b-lieu-geometrique` : repositionnement de l'étiquette $C(-1)$ vers `UL` (au lieu de `DL`) pour éviter toute proximité avec la graduation `-1` de l'axe réel.
- **Porte 4** :
```
banque bank.yaml / bk-2024-n-x3 : 5 valeurs
scène  bk-2024-n-x3.py : 35 valeurs

· 30 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   3, 5, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 0.2, 0.3, 0.5, 0.6, 0.8, 1.2, 1.4, 1.5, 2.5, 2.8, 3.2, 3.5, 3.6, 4.5, 2024

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 13 sections, 82 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
