# BT — bk-2019-n-x1 · geometrie-espace

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/geometrie-espace/bk-2019-n-x1.py`**,
pour l'entrée **`bk-2019-n-x1`** de **`content/maths/geometrie-espace/bank.yaml`**
(**lignes 65 à 167**, barème 3 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/geometrie-espace/bk-2019-n-x1.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/geometrie-espace/bk-2019-n-x1.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/geometrie-espace/bk-2019-n-x1.py Explication -ql \
  --media_dir media/maths-geometrie-espace --save_sections && cd ..
ls animations/media/maths-geometrie-espace/videos/bk-2019-n-x1/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/geometrie-espace/bank.yaml bk-2019-n-x1 animations/scenes/maths/geometrie-espace/bk-2019-n-x1.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/geometrie-espace/bk-2019-n-x1.py Explication -qm \
  --media_dir media/maths-geometrie-espace --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 8 étapes (8 sections, 76 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2019-n-x1.py : 8 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 8 sections pour 8 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-donnees` : cadre repère orthonormé direct, points $A(1,-1,-1)$, $B(0,-2,1)$, $C(1,-2,0)$ et sphère $(S)$.
  2. Étape `03-q1-vecteur-normal-plan` : calcul des coordonnées des vecteurs $\vec{AB}=(-1,-1,2)$, $\vec{AC}=(0,-1,1)$ et produit vectoriel $\vec{AB}\wedge\vec{AC}=(1,1,1)=\vec{i}+\vec{j}+\vec{k}$.
  3. Étape `04-q2-equation-plan` : équation cartésienne du plan $(ABC) : x+y+z+1=0$ via $A(1,-1,-1)$.
  4. Étape `05-q3-sphere-centre-rayon` : réduction de $(S) : (x-2)^2+(y+1)^2+(z-1)^2=5 \implies \Omega(2,-1,1)$ et $R=\sqrt{5}$.
  5. Étape `06-q4-distance-point-plan` : calcul de la distance $d(\Omega,(ABC))=\frac{3}{\sqrt{3}}=\sqrt{3}$.
  6. Étape `07-q5-intersection-cercle` : comparaison $d=\sqrt{3}\approx 1{,}73 < R=\sqrt{5}\approx 2{,}24 \implies (ABC)$ coupe $(S)$ selon un cercle $(\Gamma)$.
- **Porte 4** :
```
banque bank.yaml / bk-2019-n-x1 : 10 valeurs
scène  bk-2019-n-x1.py : 29 valeurs

· 19 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   01, 02, 03, 04, 05, 06, 07, 08, 22, 0.2, 0.3, 0.5, 0.75, 1.73, 2.24, 2019, 2026, 68527, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 8 sections, 76 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
