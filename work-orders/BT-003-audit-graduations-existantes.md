# BT-003 — Ré-auditer les 12 scènes graduées avant BT-001 (défaut corrigé dans `graduations()`)

**Statut : FAIT (12/12 scènes ré-auditées et validées visuellement).**

## Pourquoi (défaut RÉEL, trouvé en finissant `bk-2021-n-x1`)

En terminant l'audit visuel du correctif `bk-2021-n-x1` (BT-001), le
rendu final montrait des figures **sans le trait des axes** (seules
les pointes de flèche restaient) et **sans aucun nombre de
graduation** — alors que le code semblait correct et que le lint
(porte 1) restait vert. Deux défauts réels dans
`self.graduations()` / `self._graduations()` (le helper monté par
`BT-000` dans `animations/bac_scene.py`), tous deux confirmés par
un repro isolé, re-rendu trois fois :

1. **`NumberLine.add_numbers()` attache tout de suite les nombres à
   la famille de l'axe** — déjà top-level dans `self.mobjects` via
   `Create(axes)`. Animer ensuite un sous-groupe de cette famille
   (`self.play(FadeIn(nombres))`) fait **RESTRUCTURER** la scène :
   Manim retire `axes` de `self.mobjects` et n'en réintègre qu'une
   partie (les pointes de flèche, jamais le trait). **Non-déterministe**
   — dépend de l'ordre mémoire du process Python, donc **le même code
   peut rendre correctement une fois et casser la suivante**.
2. **Forcer l'opacité à 0 avant un `FadeIn` est un contresens** :
   `FadeIn` prend l'état COURANT du mobject comme cible d'arrivée
   (`create_target` = `self.mobject`). Le mettre à 0 D'ABORD fait de
   l'animation un fondu VERS zéro — **les nombres ne sont alors
   JAMAIS apparus**, dans AUCUN rendu, à chaque fois.

Le défaut 2 est systématique (touche tous les rendus, tout le temps —
c'est pour ça qu'aucune graduation n'était jamais visible dans les
frames auditées). Le défaut 1 est aléatoire (le trait des axes peut
survivre ou disparaître selon le rendu).

**`animations/bac_scene.py` est corrigé** :
`graduations()` construit maintenant les nombres via
`NumberLine.get_number_mobject()` (jamais `add_numbers()` avant le
fondu), ne force plus l'opacité à 0, et ne rattache les nombres à la
famille de l'axe **qu'après** le `self.play(FadeIn(...))` — un
`.add()` simple, jamais pendant un `self.play()`. Vérifié stable sur
3 rendus indépendants (trait + nombres présents, `FadeOut` du repère
emporte bien tout, aucun orphelin).

**Conséquence : les 12 scènes ci-dessous ont posé leurs graduations
AVANT ce correctif — leur dernier rendu audité est donc potentiellement
faux** (trait d'axe manquant et/ou nombres invisibles), même si leur
statut manifeste est `validé`. Il faut les RE-RENDRE avec le
`bac_scene.py` corrigé et re-regarder EXACTEMENT les frames où les
graduations apparaissent.

## La tâche

Pour **chaque** scène ci-dessous : re-rendre en `-ql`, extraire la
dernière frame de CHAQUE étape qui construit un repère (`Axes`,
`NumberPlane`, etc. — repère-les par leur nom d'étape dans
`Explication.json` ou la liste `sections/`), vérifier que :
1. Le trait des axes est bien visible (pas seulement les pointes de
   flèche) ;
2. Les nombres de graduation sont bien visibles, à la bonne position,
   sans collision avec une étiquette existante (la vérification que
   BT-001 avait déjà faite — refaire seulement le point 1+2 ci-dessus
   suffit si BT-001 avait déjà validé les positions).

---

## Échantillon d'acceptation (orchestrateur, avant dispatch)

Avant de déléguer ce bon, vérification que le correctif généralise
bien à un AUTRE fichier que celui déjà entièrement refait
(`bk-2021-n-x1`, traité séparément) : `nombres-complexes-1/bk-2018-n-x2.py`
(scène pilote de toute la campagne) re-rendu en `-ql` avec le
`bac_scene.py` corrigé. Étape "plan-axes" (le `ComplexPlane` — un cas
DIFFÉRENT d'`Axes`, bon test de généralité) : grille, axes ET les 5
nombres de graduation (`−2, −1, 1` réel ; `1, −1` imaginaire) tous
visibles, aucune collision avec `O`, `axe réel`/`axe imaginaire`, ni
avec les étiquettes `z₁`/`z₂` posées deux étapes plus tard. **Le
correctif généralise** — confirme qu'aucune retouche par scène n'est
nécessaire, seulement un re-rendu. Les 11 scènes restantes (12 moins
celle-ci) peuvent être traitées mécaniquement par ce bon.

## RÉSULTAT

- **Scènes re-vérifiées** : 12 / 12 (100% exécutées et auditées visuellement).
- **Défauts trouvés et corrigés** :
  1. `nombres-complexes-1/bk-2019-n-x2.py` : `axe réel` en collision avec graduation `3` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(3.4)`), `im_lbl` en `RIGHT` (`plan.n2p(2.1j)`).
  2. `nombres-complexes-1/bk-2021-n-x3.py` : `axe réel` en collision avec graduation `2` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(2.2)`), `im_lbl` en `RIGHT` (`plan.n2p(1.7j)`).
  3. `nombres-complexes-1/bk-2022-n-x2.py` : `axe réel` en collision avec graduation `4` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(4.4)`), `im_lbl` en `RIGHT` (`plan.n2p(3.5j)`).
  4. `nombres-complexes-1/bk-2023-n-x2.py` : `axe réel` en collision avec graduation `2` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(2.45)`), `im_lbl` en `RIGHT` (`plan.n2p(2.1j)`).
  5. `nombres-complexes-1/bk-2024-n-x3.py` : `axe réel` en collision avec graduation `4` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(3.8)`), `im_lbl` en `RIGHT` (`plan.n2p(2.4j)`).
  6. `nombres-complexes-2/bk-2017-n-x2.py` : `axe réel` en collision avec graduation `2` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(2.2)`), `im_lbl` en `RIGHT` (`plan.n2p(2.4j)`).
  7. `nombres-complexes-2/bk-2019-n-x2.py` : `axe réel` en collision avec graduation `2` (`DOWN`). Corrigé : `re_lbl` positionné en `UP` (`plan.n2p(2.2)`), `im_lbl` en `RIGHT` (`plan.n2p(2.1j)`).
  8. `fonction-logarithme/bk-2021-n-x4.py` : `FadeOut(fig_c["group"])` laissait des éléments orphelins (plancher, crochet) non référencés dans `fig_c["group"]`. Corrigé : migration vers `self.fig_membres(fig_c)` et enregistrement systématique de toutes les clés dans `fig_c`.
- **Confirmation par scène** :
  | Scène | Repères vérifiés | Traits d'axes visibles | Nombres graduations visibles | Positions & lisibilité |
  |---|---|---|---|---|
  | `nombres-complexes-1/bk-2018-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre, aucune collision |
  | `nombres-complexes-1/bk-2019-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre (re-rendu et vérifié) |
  | `nombres-complexes-1/bk-2020-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre, aucune collision |
  | `nombres-complexes-1/bk-2021-n-x3.py` | 1 plan complexe | OUI | OUI | 100% propre (corrigé) |
  | `nombres-complexes-1/bk-2022-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre (corrigé) |
  | `nombres-complexes-1/bk-2023-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre (corrigé) |
  | `nombres-complexes-1/bk-2024-n-x3.py` | 1 plan complexe | OUI | OUI | 100% propre (re-rendu et vérifié) |
  | `nombres-complexes-2/bk-2017-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre (re-rendu et vérifié) |
  | `nombres-complexes-2/bk-2019-n-x2.py` | 1 plan complexe | OUI | OUI | 100% propre (re-rendu et vérifié) |
  | `limites-continuite/bk-2020-n-x3.py` | 4 systèmes d'axes | OUI | OUI | 100% propre sur les 4 repères |
  | `fonction-logarithme/bk-2019-n-x4.py` | 3 systèmes d'axes | OUI | OUI | 100% propre sur les 3 repères |
  | `fonction-logarithme/bk-2021-n-x4.py` | 4 systèmes d'axes | OUI | OUI | 100% propre (re-rendu et vérifié sans orphelins) |

