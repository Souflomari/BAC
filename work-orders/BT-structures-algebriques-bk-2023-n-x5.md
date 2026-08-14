# BT — bk-2023-n-x5 · structures-algebriques

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/structures-algebriques/bk-2023-n-x5.py`**,
pour l'entrée **`bk-2023-n-x5`** de **`content/maths/structures-algebriques/bank.yaml`**
(**lignes 836 à 1095**, barème 3.5 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/structures-algebriques/bk-2023-n-x5.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/structures-algebriques/bk-2023-n-x5.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/structures-algebriques/bk-2023-n-x5.py Explication -ql \
  --media_dir media/maths-structures-algebriques --save_sections && cd ..
ls animations/media/maths-structures-algebriques/videos/bk-2023-n-x5/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/structures-algebriques/bank.yaml bk-2023-n-x5 animations/scenes/maths/structures-algebriques/bk-2023-n-x5.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/structures-algebriques/bk-2023-n-x5.py Explication -qm \
  --media_dir media/maths-structures-algebriques --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 9 étapes (9 sections, 99 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2023-n-x5.py : 9 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 9 sections pour 9 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-donnees` : cadre $M_2(\mathbb{R})$, définition de l'ensemble $E = \{M(x,y) \mid (x,y) \in \mathbb{R}^2\}$.
  2. Étape `03-p1-q1-q2-sous-espace` : $E$ sous-groupe additif et sous-espace vectoriel de $(M_2(\mathbb{R}), +, \cdot)$.
  3. Étape `04-p1-q3-q4-anneau-commutatif` : formule du produit $M(xa+3yb, xb+ya)$ et structure d'anneau commutatif unitaire $(E, +, \times)$.
  4. Étape `05-p1-q5-q6-non-corps` : calcul $M(\sqrt{3}, 1) \times M(-\sqrt{3}, 1) = O \implies$ existence de diviseurs de zéro $\implies (E, +, \times)$ n'est pas un corps.
  5. Étape `06-p2-q7-q8-sous-groupe-F` : $x+y\sqrt{3}=0 \iff x=y=0$ via $\sqrt{3}\notin\mathbb{Q}$, puis $F-\{0\}$ sous-groupe multiplicatif de $(\mathbb{R}^*, \times)$.
  6. Étape `07-p2-q9-q10-isomorphisme-phi` : $\varphi(F-\{0\}) = G-\{O\}$ et $\varphi$ homomorphisme multiplicatif.
  7. Étape `08-p2-q11-q12-corps-G` : transport de structure $\implies (G-\{O\}, \times)$ groupe commutatif et $(G, +, \times)$ corps commutatif.
- **Porte 4** :
```
banque bank.yaml / bk-2023-n-x5 : 5 valeurs
scène  bk-2023-n-x5.py : 30 valeurs

· 25 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   5, 6, 7, 8, 9, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 0.2, 0.3, 0.5, 3.5, 0.25, 0.75, 2023, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 9 sections, 99 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
