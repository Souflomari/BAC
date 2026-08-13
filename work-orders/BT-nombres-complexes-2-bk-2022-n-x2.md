# BT — bk-2022-n-x2 · nombres-complexes-2

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/nombres-complexes-2/bk-2022-n-x2.py`**,
pour l'entrée **`bk-2022-n-x2`** de **`content/maths/nombres-complexes-2/bank.yaml`**
(**lignes 408 à 552**, barème 3.5 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/nombres-complexes-2/bk-2022-n-x2.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/nombres-complexes-2/bk-2022-n-x2.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2022-n-x2.py Explication -ql \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
ls animations/media/maths-nombres-complexes-2/videos/bk-2022-n-x2/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/nombres-complexes-2/bank.yaml bk-2022-n-x2 animations/scenes/maths/nombres-complexes-2/bk-2022-n-x2.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2022-n-x2.py Explication -qm \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 13 étapes (13 sections)
- **Porte 0** : OK
- **Porte 1** : `porte 1 franchie : animations/scenes/maths/nombres-complexes-2/bk-2022-n-x2.py conforme aux règles de mise en écran.`
- **Porte 2** : 13 sections pour 13 étapes
- **Porte 3 — défauts trouvés puis corrigés** :
  1. Inclusion erronée de `SurroundingRectangle` dans les `VGroup(...).arrange()` décalant les cadres sous les formules : corrigé en créant et animant les cadres après la mise en page.
  2. Ajustement des graduations et tracé géométrique du triangle PQR équilatéral direct à l'étape 12.
- **Porte 4** : `✓ porte 4 franchie : aucune valeur de la banque perdue.`
- **Porte 5** : Rendu `-qm` 720p30 complété avec succès (96 animations, 13 sections).
- **Incohérences de banque relevées** (le cas échéant) : Aucune.
