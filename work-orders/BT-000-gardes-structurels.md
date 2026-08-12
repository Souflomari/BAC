# BT-000 — Monter les deux gardes structurels dans `BacScene`

**Statut : à faire. PRIORITÉ 1 — tout le reste de la campagne en hérite.**

## Pourquoi

Deux défauts ont coûté cher cette semaine, et **aucun des deux n'est la
faute de l'auteur d'une scène** : ce sont des pièges de l'API.

1. **`ardoise()` réinitialise `self._lignes = []` sans rien effacer.**
   Une ligne écrite par le chapitre précédent reste donc à l'écran pour
   toujours. Constaté : la question « Construire (Δ) et (C) » de
   `bk-2019-n-x4` surimprimait tout de l'étape 61 à l'étape 93.
2. **Un `FadeOut(fig["group"])` n'efface que ce que le `VGroup`
   contenait au moment de sa construction.** Tout ce qu'un chapitre
   ajoute ensuite devient orphelin et flotte jusqu'à la fin. Constaté :
   points, étiquettes et une flèche survivants aux étapes 61-71 ; la
   droite (Δ) traversant le tableau de variations aux étapes 39-41.

Un agent a déjà écrit les deux remèdes, mais **prisonniers d'une seule
scène** : `_fig_membres()` et `_graduations()` vivent dans
`animations/scenes/maths/fonction-logarithme/bk-2019-n-x4.py`. Leur
place est dans la classe de base — comme `epingle()`, `LARGEUR_MAX` et
`encadre()` avant eux, tous nés d'un audit.

## La tâche

Dans **`animations/bac_scene.py`** (le seul fichier de code à modifier,
avec la scène source d'où l'on déplace) :

1. **`_fig_membres(fig: dict) -> VGroup`** — reconstruit à la volée le
   groupe de TOUT ce que le dictionnaire de figure contient à l'instant
   présent. Copier la version de `bk-2019-n-x4.py` (avec son
   commentaire d'explication), la rendre méthode ou fonction de module
   selon ce qui s'intègre le mieux.
2. **`graduations(axes, x_vals, y_vals)`** — pose un petit jeu de
   nombres lisibles sur les deux axes (taille ~18, encre douce, côté
   libre), et **retourne le `VGroup`** pour qu'il puisse rejoindre la
   figure. Idem : copier la version existante, la généraliser.
   Renommer sans l'underscore de tête (c'est désormais une API
   publique de la classe).
3. **Documenter les deux** dans le docstring de `BacScene` : quelqu'un
   doit pouvoir les trouver sans lire tout le fichier.
4. Mettre à jour `bk-2019-n-x4.py` pour appeler les versions de la
   classe de base au lieu de ses copies locales, et **supprimer les
   copies**.
5. Ajouter une ligne au §2.1 et au §1.6 de
   `docs/ops/SCENE-CONTRACT.md` pour pointer les helpers par leur nom
   définitif. *(C'est l'unique cas où un bon autorise à toucher au
   contrat : parce qu'il le demande explicitement.)*

## Ce qu'il ne faut PAS faire

- Ne change aucune autre méthode de `BacScene` — `ecrit`, `nettoie`,
  `ardoise`, `epingle` et `encadre` sont éprouvées sur 14 scènes
  validées. En particulier : **ne « corrige » pas `ardoise()` pour
  qu'elle nettoie** ; ça changerait le rendu des scènes déjà validées.
- Ne touche à aucune scène autre que `bk-2019-n-x4.py`.

## Portes

```bash
# les 16 scènes se chargent toujours
for f in $(find animations/scenes -name '*.py'); do
  python -c "import importlib.util,sys; sys.path.insert(0,'animations'); \
    spec=importlib.util.spec_from_file_location('s','$f'); \
    m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m)" \
    || echo "ECHEC $f"; done

python scripts/scene-lint.py --all      # aucune régression

# une scène validée au hasard rend toujours à l'identique
cd animations && manim render scenes/maths/suites-numeriques/bk-2020-n-x1.py \
  Explication -ql --media_dir media/maths-suites-numeriques --save_sections && cd ..
```

---

## RÉSULTAT — à remplir par l'agent

- **Helpers montés** : …
- **Chargement des 16 scènes** : `<coller>`
- **Lint** : `<coller>`
- **Rendu témoin** : … sections (attendu : 43)
- **`git diff --stat`** : `<coller>`
