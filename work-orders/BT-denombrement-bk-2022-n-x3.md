# BT — bk-2022-n-x3 · denombrement

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/denombrement/bk-2022-n-x3.py`**,
pour l'entrée **`bk-2022-n-x3`** de **`content/maths/denombrement/bank.yaml`**
(**lignes 139 à 223**, barème 3 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/denombrement/bk-2022-n-x3.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/denombrement/bk-2022-n-x3.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/denombrement/bk-2022-n-x3.py Explication -ql \
  --media_dir media/maths-denombrement --save_sections && cd ..
ls animations/media/maths-denombrement/videos/bk-2022-n-x3/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/denombrement/bank.yaml bk-2022-n-x3 animations/scenes/maths/denombrement/bk-2022-n-x3.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/denombrement/bk-2022-n-x3.py Explication -qm \
  --media_dir media/maths-denombrement --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 9 étapes (9 sections, 91 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2022-n-x3.py : 9 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 9 sections pour 9 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-urne` : représentation visuelle de l'urne (3 blanches B, 3 vertes V, 4 rouges R).
  2. Étape `03-univers-card-omega` : tirage simultané $\text{card}(\Omega) = \binom{10}{3} = 120$.
  3. Étape `04-q1-event-a` : $\text{card}(A) = \binom{6}{3} = 20 \implies p(A) = 20/120 = 1/6$.
  4. Étape `05-q2-event-b` : $\text{card}(B) = \binom{3}{3} + \binom{3}{3} = 2 \implies p(B) = 2/120 = 1/60$.
  5. Étape `06-q3-event-c` : $\text{card}(C) = \binom{4}{1} \times \binom{6}{2} = 60 \implies p(C) = 60/120 = 1/2$.
  6. Étape `07-q4-event-d` : $\text{card}(D) = \binom{4}{2}\binom{6}{1} + \binom{4}{3}\binom{6}{0} = 36 + 4 = 40 \implies p(D) = 40/120 = 1/3$.
  7. Étape `08-controle-partition` : partition selon le nombre de boules rouges $p(0R) + p(1R) + p(\ge 2R) = 1$.
- **Porte 4** :
```
banque bank.yaml / bk-2022-n-x3 : 16 valeurs
scène  bk-2022-n-x3.py : 38 valeurs

· 22 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   01, 02, 03, 04, 05, 06, 07, 08, 09, 0.2, 0.3, 0.4, 0.5, 0.9, 1.5, 3.8, 4.6, 720, 0.15, 0.75, 2022, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 9 sections, 91 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
