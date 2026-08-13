# BT — bk-2020-n-x3 · nombres-complexes-2

**Statut : validé.** Scène complète et auditée, portes 0 à 5 franchies.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`animations/scenes/maths/nombres-complexes-2/bk-2020-n-x3.py`**,
pour l'entrée **`bk-2020-n-x3`** de **`content/maths/nombres-complexes-2/bank.yaml`**
(**lignes 270 à 407**, barème 3.5 points).

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

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : 16 étapes (titre, intro, q1 factorisation, q1 trinome, q1 solutions, q2a somme inverses, q2b angle moitié, q2b formes algébriques, q3 alignement, q4a formule rotation, q4a affixes p et r, q4b centre q, q4b sinus addition, q5 calcul différence, q5 rapport conclusion, bilan).
- **Porte 0** : OK
- **Porte 1** : `✓ zéro alerte. La scène respecte le contrat.`
- **Porte 2** : 16 sections pour 16 étapes (rendu brouillon 480p15 avec 73 animations).
- **Porte 3 — défauts trouvés puis corrigés** :
  1. Remplacement de `BAC_PANEL_BG` par `BAC_SURFACE_RAISED`.
  2. Remplacement du regroupement `VGroup(*to_remove)` par `*[FadeOut(m) for m in to_remove]` pour éviter les TypeError sur `Mobject` non `VMobject`.
  3. Déplacement du nettoyage `nettoie_partie1` / `nettoie_zone_gauche` en transition de chapitre dans `construct` pour préserver l'affichage complet des équations jusqu'à la fin de chaque section.
  4. Suppression du fond opaque parasite de `cadre_z1` et `cadre_z2` en question 2b.
  5. Nettoyage de la zone gauche avant l'affichage de la carte bilan en fin de scène et élimination des glyphes Unicode manquants (`⟹`, `⊥`).
- **Porte 4** : `✓ porte 4 franchie : aucune valeur de la banque perdue.`
- **Porte 5** : rendu final 720p30 (16 sections, 73 animations).
- **Incohérences de banque relevées** : Aucune.
