# BT-002 — Finir les deux scènes interrompues (fonction-logarithme)

**Statut : à faire. PRIORITÉ 3.** Deux agents ont été tués en plein
travail par une limite de session ; leur sortie est cohérente et
committée, il faut la terminer.

---

## Partie A — `bk-2019-n-x4.py` : appliquer les correctifs d'audit

La scène (95 étapes, 11 points) **rend proprement** et son fond a été
vérifié question par question contre la banque. L'audit image par image
a trouvé **trois classes de défauts**, toutes de nettoyage. Les remèdes
sont écrits mais **à moitié appliqués**.

### Ce qui est déjà fait
- `_fig_membres()` et `_graduations()` existent dans le fichier (ils
  montent dans `BacScene` via `BT-000` — utilise les versions de la
  classe de base une fois `BT-000` passé).
- Les graduations sont posées sur la figure principale.

### Ce qui reste
1. **La ligne fantôme.** `chapitre_q12` se termine sans
   `self.nettoie()` ; le chapitre suivant appelle `ardoise()`, qui ne
   nettoie pas. Résultat : la question « Construire (Δ) et (C) » reste
   affichée **de l'étape 61 à l'étape 93** et surimprime toutes les
   questions suivantes. → Ajouter `self.nettoie()` en fin de
   `chapitre_q12`, **puis vérifier les 26 chapitres** avec le lint
   (`scripts/scene-lint.py` a maintenant la règle).
2. **Les orphelins.** Aux étapes 61-71, des points, des étiquettes
   (`(1, 3/2)`, `(e, e)`, `I(e², e²+½)`) et une petite flèche
   survivent au `FadeOut(fig["group"])` de `chapitre_q13`, et une
   flèche grise translucide traîne dans toutes les images de la toile
   d'araignée (étapes 79-93). → Faire passer **tous** les fondus de
   figure par `_fig_membres(fig)`, et ranger chaque mobject créé sous
   sa propre clé de `fig`.
3. **Le tableau traversé.** Aux étapes 39-41, la droite (Δ), son
   étiquette `y = x` et la flèche d'écart traversent le tableau de
   variations construit à la main. Même cause, même remède.
4. **Les graduations** sur les trois autres repères (la figure de
   référence `ln t / t`, la figure d'aire, la figure de la toile).

### Vérification
Re-rendre en `-ql`, puis **regarder les images des étapes 39, 40, 41,
61, 65, 71, 79, 85, 93** — c'est là que vivaient les défauts. Ensuite
seulement, rendu `-qm` et `statut: validé` au manifeste.

---

## Partie B — `bk-2023-n-x4.py` : finir la scène

Le fichier existe : **653 lignes, 3 chapitres écrits sur ~20**. Le
module se charge, ses assertions passent, et la structure posée est
bonne (en-tête, constantes, `chapitre_titre`, `chapitre_intro`,
`chapitre_plan` avec sa figure et ses graduations).

Il reste à écrire les chapitres de questions et la clôture, pour
l'entrée `bk-2023-n-x4` de `content/maths/fonction-logarithme/bank.yaml`
(**lignes 319 à 540**, 11 points).

**Reprends le style déjà posé dans le fichier** — ne recommence pas de
zéro, ne renomme rien. Écriture incrémentale (~120 lignes par appel).

Puis les six portes du contrat, dans l'ordre.

---

## Note pour l'orchestrateur (ne pas exécuter)

Ces deux scènes font partie de la **comparaison de modèles** demandée
par l'owner : `bk-2019-n-x4` et `bk-2021-n-x4` ont été écrites par un
moteur, `bk-2023-n-x4` commencée par un autre, `bk-2024-n-x4` reste à
écrire. Garder trace de qui finit quoi dans `LEDGER.md` : c'est la
matière de la comparaison.

---

## RÉSULTAT — à remplir par l'agent

### Partie A
- **Chapitres corrigés (nettoie)** : …
- **Fondus passés par `_fig_membres`** : …
- **Images de contrôle regardées** : 39, 40, 41, 61, 65, 71, 79, 85, 93 → …
- **Portes 0/1/2/4** : `<coller>`

### Partie B
- **Étapes écrites** : …
- **Portes 0/1/2/4** : `<coller>`
- **Porte 3 — défauts trouvés puis corrigés** : …
- **`git diff --stat`** : `<coller>`
