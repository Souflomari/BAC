# BT — bk-2025-n-x3 · arithmetique

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/arithmetique/bk-2025-n-x3.py`**,
pour l'entrée **`bk-2025-n-x3`** de **`content/maths/arithmetique/bank.yaml`**
(**lignes 907 à 1067**, barème 3 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/arithmetique/bk-2025-n-x3.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/arithmetique/bk-2025-n-x3.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/arithmetique/bk-2025-n-x3.py Explication -ql \
  --media_dir media/maths-arithmetique --save_sections && cd ..
ls animations/media/maths-arithmetique/videos/bk-2025-n-x3/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/arithmetique/bank.yaml bk-2025-n-x3 animations/scenes/maths/arithmetique/bk-2025-n-x3.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/arithmetique/bk-2025-n-x3.py Explication -qm \
  --media_dir media/maths-arithmetique --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 9 étapes (9 sections, 97 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2025-n-x3.py : 9 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 9 sections pour 9 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-donnees` : présentation $p$ premier impair et $a$ premier avec $p$.
  2. Étape `03-q1-partie-a-euler` : critère d'Euler $a^{\frac{p-1}{2}} \equiv \pm 1 \pmod p$ par Fermat et Euclide.
  3. Étape `04-q2-q3-partie-b-equation-ax2` : $ax_0^2 \equiv 1 \pmod p \implies \mathrm{PGCD}(p,x_0)=1 \implies a^{\frac{p-1}{2}} \equiv 1 \pmod p$.
  4. Étape `05-q4-partie-c-diviseur-premier` : $p \mid (2^{2n+1}-1) \implies 2 \times (2^n)^2 \equiv 1 \pmod p \implies 2^{\frac{p-1}{2}} \equiv 1 \pmod p$.
  5. Étape `06-q5-partie-c-bezout-11` : $11 \nmid (2^{2n+1}-1)$ car $2^5 = 32 \equiv 10 \not\equiv 1 \pmod{11} \implies \mathrm{PGCD}(11, 2^{2n+1}-1)=1 \implies$ Bézout donne solution dans $\mathbb{Z}^2$.
  6. Étape `07-q6-partie-d-equivalence-F` : $(F) \iff 4x^2+20x+8 \equiv 0 \iff (2x+5)^2 \equiv 6 \iff 2(2x+5)^2 \equiv 1 \pmod{11}$.
  7. Étape `08-q7-partie-d-inexistence-F` : $2 y_0^2 \equiv 1 \pmod{11} \implies 2^5 \equiv 1 \pmod{11}$ impossible ($2^5 \equiv 10$) $\implies (F)$ n'a pas de solution dans $\mathbb{Z}$.
- **Porte 4** :
```
banque bank.yaml / bk-2025-n-x3 : 13 valeurs
scène  bk-2025-n-x3.py : 33 valeurs

· 20 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   3, 7, 01, 02, 03, 04, 05, 06, 07, 08, 09, 20, 25, 0.2, 0.3, 0.5, 0.25, 0.75, 2025, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 9 sections, 97 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
