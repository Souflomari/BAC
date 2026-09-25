# BT — bk-2019-n-x4 · fonction-exponentielle

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/fonction-exponentielle/bk-2019-n-x4.py`**,
pour l'entrée **`bk-2019-n-x4`** de **`content/maths/fonction-exponentielle/bank.yaml`**
(**lignes 108 à 513**, barème 10 points).

La banque est la source de vérité : chaque nombre, chaque formule,
chaque question, chiffre pour chiffre. **Si elle semble incohérente,
ARRÊTE-toi et écris-le dans le bloc RÉSULTAT — ne la corrige jamais.**

## Modèles à imiter
- `animations/scenes/maths/limites-continuite/bk-2020-n-x3.py (courbes sur Axes — le gabarit le plus complet)`
- `animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py (structure de chapitres)`

## Pièges à traiter (une étape rouge chacun)
forme indéterminée NOMMÉE avant d'être levée ; domaine du ln vérifié ; (uv)′ en entier ; (u/v)′ ≠ u′/v′ ; croissances comparées NOMMÉES ; le TVI exige continuité ET signes opposés

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/fonction-exponentielle/bk-2019-n-x4.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/fonction-exponentielle/bk-2019-n-x4.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/fonction-exponentielle/bk-2019-n-x4.py Explication -ql \
  --media_dir media/maths-fonction-exponentielle --save_sections && cd ..
ls animations/media/maths-fonction-exponentielle/videos/bk-2019-n-x4/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/fonction-exponentielle/bank.yaml bk-2019-n-x4 animations/scenes/maths/fonction-exponentielle/bk-2019-n-x4.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/fonction-exponentielle/bk-2019-n-x4.py Explication -qm \
  --media_dir media/maths-fonction-exponentielle --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 23 étapes (23 sections, 187 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2019-n-x4.py : 23 étapes, 2 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 23 sections pour 23 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `05-q2b-variations-tableau` : tableau de variations complet avec limites, zéros de $f'$, flèches et extremums ($f(0)=0$, $f(1)=4/e-2$).
  2. Étape `12-q4b-courbe-C` : repère orthonormé isotrope avec tracé de $(C)$, tangentes horizontales en $0$ et $1$, minimum et zéro $\alpha$.
  3. Étape `15-q5c-aire-domaine` : domaine sous l'axe des abscisses ombré entre $0$ et $\alpha$ avec repère isotrope et graduations.
  4. Toutes les étapes algébriques, théorèmes (Rolle, TAF, TVI, IPP) et étude de la suite $(u_n)$ vérifiés sans aucun chevauchement.
- **Porte 4** :
```
banque bank.yaml / bk-2019-n-x4 : 21 valeurs
scène  bk-2019-n-x4.py : 81 valeurs

· 60 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0.2, 0.3, 0.4, 0.6, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.9, 2.1, 2.2, 2.4, 2.5, 2.8 …

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 23 sections, 187 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
