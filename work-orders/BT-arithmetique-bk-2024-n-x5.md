# BT — bk-2024-n-x5 · arithmetique

**Statut : validé.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/arithmetique/bk-2024-n-x5.py`**,
pour l'entrée **`bk-2024-n-x5`** de **`content/maths/arithmetique/bank.yaml`**
(**lignes 463 à 557**, barème 3 points).

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
  spec=importlib.util.spec_from_file_location('s','animations/scenes/maths/arithmetique/bk-2024-n-x5.py'); \
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py animations/scenes/maths/arithmetique/bk-2024-n-x5.py

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render scenes/maths/arithmetique/bk-2024-n-x5.py Explication -ql \
  --media_dir media/maths-arithmetique --save_sections && cd ..
ls animations/media/maths-arithmetique/videos/bk-2024-n-x5/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py content/maths/arithmetique/bank.yaml bk-2024-n-x5 animations/scenes/maths/arithmetique/bk-2024-n-x5.py

# 5 — rendu final, puis statut
cd animations && manim render scenes/maths/arithmetique/bk-2024-n-x5.py Explication -qm \
  --media_dir media/maths-arithmetique --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 8 étapes (8 sections, 81 animations)
- **Porte 0** :
```
OK
```
- **Porte 1** :
```
— bk-2024-n-x5.py : 8 étapes, 0 repère(s)

✓ porte 1 franchie (les alertes restent à regarder à l'audit).
```
- **Porte 2** : 8 sections pour 8 étapes
- **Porte 3 — audit visuel & planches de contact** :
  1. Étape `02-intro-donnees` : présentation $p, q$ premiers distincts et $r$ premier avec $p$ et $q$.
  2. Étape `03-q1-fermat-p-q` : $p \mid (r^{p-1}-1)$ et $q \mid (r^{q-1}-1)$ par Fermat.
  3. Étape `04-q2-puissance-croisee` : élévation croisée $\implies p \mid (r^{(p-1)(q-1)}-1)$ et $q \mid (r^{(p-1)(q-1)}-1)$.
  4. Étape `05-q3-produit-pq-gauss` : $\mathrm{PGCD}(p,q)=1 \implies pq \mid (r^{(p-1)(q-1)}-1)$ par le corollaire de Gauss.
  5. Étape `06-q4-coprimalite-2024` : $221 = 13 \times 17$, $(13-1)(17-1)=192$, divisions $2024 = 13 \times 155 + 9$ et $2024 = 17 \times 119 + 1 \implies \mathrm{PGCD}(2024, 13)=\mathrm{PGCD}(2024, 17)=1$.
  6. Étape `07-q4-resolution-mod-221` : $2024^{192} \equiv 1 \pmod{221} \implies x \equiv 3 \pmod{221} \implies S = \{3 + 221k \mid k \in \mathbb{Z}\}$.
- **Porte 4** :
```
banque bank.yaml / bk-2024-n-x5 : 14 valeurs
scène  bk-2024-n-x5.py : 30 valeurs

· 16 valeur(s) propre(s) à la scène (illustrations,
  fenêtres de tracé — normal, à survoler) :
   0, 2, 4, 5, 01, 02, 03, 04, 05, 06, 07, 08, 0.2, 0.3, 0.5, 718096

✓ porte 4 franchie : aucune valeur de la banque perdue.
```
- **Porte 5** : rendu final 8 sections, 81 animations (720p30)
- **`git diff --stat`** :
```
 animations/manifest.yaml | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```
- **Incohérences de banque relevées** : Aucune
