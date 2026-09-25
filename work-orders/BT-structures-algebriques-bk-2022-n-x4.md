# BT — bk-2022-n-x4 · structures-algebriques

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/structures-algebriques/bk-2022-n-x4.py`**,
pour l'entrée **`bk-2022-n-x4`** de **`content/maths/structures-algebriques/bank.yaml`**
(**lignes 479 à 676**, barème 3.5 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/structures-algebriques/bk-2022-n-x4.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/structures-algebriques/bk-2022-n-x4.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/structures-algebriques/bk-2022-n-x4.py Explication -ql \
  --media_dir media/maths-structures-algebriques --save_sections && cd ..
ls animations/media/maths-structures-algebriques/videos/bk-2022-n-x4/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/structures-algebriques/bank.yaml bk-2022-n-x4 animations/scenes/maths/structures-algebriques/bk-2022-n-x4.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/structures-algebriques/bk-2022-n-x4.py Explication -qm \
  --media_dir media/maths-structures-algebriques --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 9 étapes (9 sections, 96 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2022-n-x4.py : 9 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 9 sections pour 9 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-donnees` : cadre $M_2(\mathbb{R})$, définition de l'ensemble $E = \{M(a,b) \mid (a,b) \in \mathbb{Z}^2\}$.
  2. Étape `03-q1-q2-sous-groupe-produit` : $(E,+)$ sous-groupe et formule du produit $M(ac+3bd, ad+bc)$.
  3. Étape `04-q3-anneau-commutatif` : $(E,+,\times)$ anneau commutatif et unitaire d'unité $I = M(1,0)$.
  4. Étape `05-q4-homomorphisme-phi` : identité algébrique $(ac+3bd)^2 - 3(ad+bc)^2 = (a^2-3b^2)(c^2-3d^2) \implies \varphi$ homomorphisme multiplicatif vers $(\mathbb{Z},\times)$.
  5. Étape `06-q5-q6-q7-inversibilite` : identité $(a^2-3b^2)I$, $M(a,b)$ inversible $\iff \varphi(M(a,b))=1$, et inverse $M(a,b)^{-1} = (a^2-3b^2)M(a,-b)$.
  6. Étape `07-q8-q9-integrite` : $\sqrt{3} \notin \mathbb{Q} \implies \varphi(M(a,b))=0 \iff M=O$, puis intégrité de l'anneau $E$.
  7. Étape `08-q10-non-corps` : contre-exemple $M(2,0)$ non nul mais $\varphi = 4 \neq 1 \implies$ non inversible $\implies (E,+,\times)$ n'est pas un corps.
- **Porte 4** :
```
banque bank.yaml / bk-2022-n-x4 : 5 valeurs
scène  bk-2022-n-x4.py : 28 valeurs

· 23 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   5, 6, 7, 8, 9, 01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 0.2, 0.3, 0.5, 3.5, 0.25, 1.25, 2022, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 9 sections, 96 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
