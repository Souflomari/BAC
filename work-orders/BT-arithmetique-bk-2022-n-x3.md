# BT — bk-2022-n-x3 · arithmetique

**Statut : à faire.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/arithmetique/bk-2022-n-x3.py`**,
pour l'entrée **`bk-2022-n-x3`** de **`content/maths/arithmetique/bank.yaml`**
(**lignes 295 à 462**, barème 3 points).

La banque est la source de vérité : chaque nombre, chaque formule,
chaque question, chiffre pour chiffre. **Si elle semble incohérente,
ARRÊTE-toi et écris-le dans le bloc RÉSULTAT — ne la corrige jamais.**

## Modèles à imiter
- `animations/scenes/maths/limites-continuite/bk-2020-n-x3.py (courbes sur Axes — le gabarit le plus complet)`
- `animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py (structure de chapitres)`

## Pièges à traiter (une étape rouge chacun)
les pièges classiques de la notion, un par étape rouge

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/arithmetique/bk-2022-n-x3.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/arithmetique/bk-2022-n-x3.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/arithmetique/bk-2022-n-x3.py Explication -ql \
  --media_dir media/maths-arithmetique --save_sections && cd ..
ls animations/media/maths-arithmetique/videos/bk-2022-n-x3/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/arithmetique/bank.yaml bk-2022-n-x3 animations/scenes/maths/arithmetique/bk-2022-n-x3.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/arithmetique/bk-2022-n-x3.py Explication -qm \
  --media_dir media/maths-arithmetique --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : …
- **Porte 0** : `<coller la sortie>`
- **Porte 1** : `<coller la sortie>`
- **Porte 2** : … sections pour … étapes
- **Porte 3 — défauts trouvés puis corrigés** :
  1. …
  *(aucun défaut sur une longue scène est suspect : sur 16 scènes
  auditées, deux seulement étaient propres du premier coup)*
- **Porte 4** : `<coller la sortie>`
- **Porte 5** : rendu final … sections, durée …
- **`git diff --stat`** (doit ne toucher que la scène + le manifeste) :
  `<coller>`
- **Incohérences de banque relevées** (le cas échéant) : …
