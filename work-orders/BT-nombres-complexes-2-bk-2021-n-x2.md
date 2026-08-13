# BT — bk-2021-n-x2 · nombres-complexes-2

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/nombres-complexes-2/bk-2021-n-x2.py`**,
pour l'entrée **`bk-2021-n-x2`** de **`content/maths/nombres-complexes-2/bank.yaml`**
(**lignes 715 à 863**, barème 4 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/nombres-complexes-2/bk-2021-n-x2.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/nombres-complexes-2/bk-2021-n-x2.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2021-n-x2.py Explication -ql \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
ls animations/media/maths-nombres-complexes-2/videos/bk-2021-n-x2/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/nombres-complexes-2/bank.yaml bk-2021-n-x2 animations/scenes/maths/nombres-complexes-2/bk-2021-n-x2.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/nombres-complexes-2/bk-2021-n-x2.py Explication -qm \
  --media_dir media/maths-nombres-complexes-2 --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 14 étapes (`titre`, `intro`, `q1a-viete`, `q1a-solutions`, `q1b-angle-moyen`, `q1b-formes-exponentielles`, `q2a-centre-p`, `q2a-centre-q`, `q2b-calcul-rapport`, `q2c-nature-pdq`, `q3a-affixe-k`, `q3b-parallelogramme`, `q3b-carre-cocyclicite`, `bilan`)
- **Porte 0** : OK
- **Porte 1** :
```
— bk-2021-n-x2.py : 14 étapes, 1 repère(s)
✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 14 sections pour 14 étapes
- **Porte 3 — défauts trouvés puis corrigés** :
  1. `setup_figure()` appelé en fin de section q1b écrasait le texte de q1b à l'audit mi-section : corrigé en intégrant le setup de la figure directement au début de l'étape 7 (Partie II).
  2. Remplacement de constantes non exportées (`BAC_MUTED` -> `BAC_BORDER`) et ajout de `self.graduations(axes)`.
- **Porte 4** :
```
banque bank.yaml / bk-2021-n-x2 : 8 valeurs
scène  bk-2021-n-x2.py : 29 valeurs
✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 14 sections, durée 78.8s (1:18.8), 73 animations jouées
- **`git diff --stat`** :
```
 animations/manifest.yaml                                         |   2 +-
 animations/scenes/maths/nombres-complexes-2/bk-2021-n-x2.py       | 495 +++++++++++++++++++++++++++++++++++++++++++++++++++
 work-orders/BT-nombres-complexes-2-bk-2021-n-x2.md               |  38 ++--
```
- **Incohérences de banque relevées** (le cas échéant) : Aucune.
