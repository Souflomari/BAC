# animations/ — la voie « Explication animée » (Manim)

Chaque exercice de banque S'entraîner peut porter une explication animée
de classe 3Blue1Brown : une vidéo **codée** (jamais générative) qui
déroule la correction pas à pas, avec les valeurs exactes de l'entrée
vérifiée. Décision et règles : `docs/decisions/0028-animated-explanation-lane.md`.

## Principes non négociables

- **Le scénario (`.py`) est la source de vérité, la vidéo est un
  artefact de build** — on ne committe jamais de vidéo dans git.
- **Valeurs exactes uniquement** : tout nombre, toute équation vient de
  l'entrée `bank.yaml` vérifiée. Pas d'approximation décorative.
- **Identité visuelle** : `bac_style.py` reflète les tokens du site
  (`web/src/lib/tokens.ts`). Un changement de token implique une mise à
  jour synchronisée du module de style.
- **Narration dès le premier jour** : chaque scène expose un dictionnaire
  `NARRATION` (texte français par chapitre) pour le futur doublage
  ElevenLabs (Phase E3) — sans jamais retoucher la scène.
- Le lecteur web (à venir) respecte le calm core : pas d'autoplay,
  chapitres par question, `prefers-reduced-motion` → affiche l'image +
  la transcription.

## Structure

```
animations/
  bac_style.py      # palette + constantes mappées sur tokens.ts
  bac_scene.py      # classe de base BacScene (fond, cartes, aides)
  manifest.yaml     # entrée de banque ↔ scène ↔ statut
  render.sh         # rendu local ou via l'image Docker officielle
  requirements.txt  # manim CE épinglé
  scenes/<matière>/<slug>/<bank-id>.py   # une scène par exercice
  media/            # sorties de rendu (gitignoré)
```

## Rendu

```sh
./render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py   # une scène
./render.sh --all                                              # tout le manifeste
QUALITY=l ./render.sh <scene>   # brouillon rapide (480p)
```

Installation (native ou Docker) : voir `SETUP.md`. Convention : chaque
fichier de scène expose une unique classe `Explication`.

## Cycle de vie d'une scène

1. Écrite depuis l'entrée `bank.yaml` vérifiée (jamais depuis le doc
   brut) — par motion-author ou l'orchestrateur.
2. Relecture adversariale du contenu mathématique (l'auteur ne
   s'auto-certifie pas — même discipline que les banques).
3. Rendu brouillon (`-ql`) → revue owner → rendu final (`-qh`).
4. `manifest.yaml` passe `statut: publié` quand la vidéo est en ligne
   (hébergement : décision owner en attente, cf. ADR 0028 §6).
