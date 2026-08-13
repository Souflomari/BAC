# BT-003 — Ré-auditer les 12 scènes graduées avant BT-001 (défaut corrigé dans `graduations()`)

**Statut : à faire. PRIORITÉ 1 — avant toute nouvelle scène.**

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

**`animations/bac_scene.py` est corrigé** (commit à suivre) :
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

Si un défaut apparaît (trait manquant, nombres manquants) : c'est que
le rendu utilisé pour l'ancien audit date d'avant ce correctif — un
simple **re-rendu avec le `bac_scene.py` corrigé suffit**, aucune
retouche de la scène elle-même n'est nécessaire (le défaut est dans le
helper partagé, pas dans les scènes).

| Scène | Repères à re-vérifier |
|---|---|
| `nombres-complexes-1/bk-2018-n-x2.py` | 1 plan complexe |
| `nombres-complexes-1/bk-2019-n-x2.py` | 1 |
| `nombres-complexes-1/bk-2020-n-x2.py` | 1 |
| `nombres-complexes-1/bk-2021-n-x3.py` | 1 |
| `nombres-complexes-1/bk-2022-n-x2.py` | 1 |
| `nombres-complexes-1/bk-2023-n-x2.py` | 1 |
| `nombres-complexes-1/bk-2024-n-x3.py` | 1 |
| `nombres-complexes-2/bk-2017-n-x2.py` | 1 |
| `nombres-complexes-2/bk-2019-n-x2.py` | 1 |
| `limites-continuite/bk-2020-n-x3.py` | 4 systèmes d'axes |
| `fonction-logarithme/bk-2019-n-x4.py` | (compter via `graduations(` dans le fichier) |
| `fonction-logarithme/bk-2021-n-x4.py` | (compter via `graduations(` dans le fichier) |

**Hors scope de ce bon** (déjà traité directement, avec le correctif,
par l'orchestrateur) : `limites-continuite/bk-2021-n-x1.py`.

**Hors scope aussi** : les 3 scènes `suites-numeriques` (`bk-2020-n-x1`,
`bk-2021-n-x2`, `bk-2024-n-x1`) — elles n'utilisent PAS
`self.graduations()` mais posent `add_numbers()` directement sur une
`NumberLine` **dans le même `self.play()` que son `Create()`**
(jamais dans un `self.play()` séparé, sur un mobject déjà présent à
l'écran) — le mécanisme du défaut 1 ne s'applique pas à ce motif.
Elles restent malgré tout à spot-check une fois, par prudence, si le
temps le permet (pas prioritaire).

## Portes

```bash
# Porte 1 : toujours verte, ce défaut est invisible au lint statique.
python scripts/scene-lint.py <fichier>

# Porte 2/3 : re-rendu + audit visuel des frames de figure UNIQUEMENT
# (pas besoin de tout re-regarder — BT-001 avait déjà validé le
# placement ; ce bon vérifie seulement que trait + nombres survivent
# au rendu).
../../render.sh scenes/maths/<notion>/<fichier>.py -ql
# puis extraire + regarder les dernières frames des étapes qui posent
# un repère (voir docs/ops/SCENE-CONTRACT.md pour la méthode).
```

Si tout est visible correctement : rien à committer pour cette scène
(le seul changement est `bac_scene.py`, déjà commité une fois pour
toutes). Note simplement dans le RÉSULTAT ci-dessous. Si un défaut
apparaissait malgré le correctif (ne devrait pas arriver), escalade —
n'invente pas de contournement par scène.

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

## RÉSULTAT — à remplir par l'agent

- **Scènes re-vérifiées** : 1 / 12 (échantillon d'acceptation ci-dessus ; 11 restantes)
- **Défauts trouvés après re-rendu (devrait être vide)** :
- **Confirmation** : trait + nombres visibles sur toutes les figures listées ? (oui/non par scène)
