# BT — bk-2022-n-x4 · calcul-integral

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/calcul-integral/bk-2022-n-x4.py`**,
pour l'entrée **`bk-2022-n-x4`** de **`content/maths/calcul-integral/bank.yaml`**
(**lignes 65 à 135**, barème 1.5 points).

La banque est la source de vérité : chaque nombre, chaque formule,
chaque question, chiffre pour chiffre. **Si elle semble incohérente,
ARRÊTE-toi et écris-le dans le bloc RÉSULTAT — ne la corrige jamais.**

## Modèles à imiter
- `animations/scenes/maths/limites-continuite/bk-2020-n-x3.py (courbes sur Axes — le gabarit le plus complet)`
- `animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py (structure de chapitres)`

## Pièges à traiter (une étape rouge chacun)
les bornes dans le bon ordre ; le crochet vérifié aux DEUX bornes ; l'IPP avec le bon choix de u et v

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/calcul-integral/bk-2022-n-x4.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/calcul-integral/bk-2022-n-x4.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/calcul-integral/bk-2022-n-x4.py Explication -ql \
  --media_dir media/maths-calcul-integral --save_sections && cd ..
ls animations/media/maths-calcul-integral/videos/bk-2022-n-x4/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/calcul-integral/bank.yaml bk-2022-n-x4 animations/scenes/maths/calcul-integral/bk-2022-n-x4.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/calcul-integral/bk-2022-n-x4.py Explication -qm \
  --media_dir media/maths-calcul-integral --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 9 étapes (9 sections, 85 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2022-n-x4.py : 9 étapes, 1 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 9 sections pour 9 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `03-q1a-primitive-verification` : dérivation du produit $(x e^x)' = (x+1)e^x = h(x)$ avec conclusion encadrée.
  2. Étape `04-q1a-calcul-integrale-I` : calcul $I = [x e^x]_{-1}^0 = 1/e$ encadré en vert.
  3. Étape `05-q1a-illustration-aire-I` : repère orthonormé isotrope avec tracé de $(C_h)$ et aire sous la courbe hachurée sur $[-1, 0]$.
  4. Étape `06-q1b-choix-ipp` à `08-q1b-calcul-integrale-J` : choix $u=(x+1)^2, v'=e^x$, terme de bord $=1$, $J = 1-2I = \frac{e-2}{e}$.
- **Porte 4** :
```
banque bank.yaml / bk-2022-n-x4 : 3 valeurs
scène  bk-2022-n-x4.py : 32 valeurs

· 29 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   3, 4, 01, 02, 03, 04, 05, 06, 07, 08, 09, 0.1, 0.2, 0.3, 0.4, 0.5, 1.2, 1.4, 1.5, 1.8, 3.2, 4.8, 0.35, 0.75, 2.72, 2022, 0.368, 0.375, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 9 sections, 85 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
