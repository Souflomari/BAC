# animations/ — la voie « Explication animée » (Manim)

Chaque exercice de banque S'entraîner peut porter une explication animée
de classe 3Blue1Brown : une vidéo **codée** (jamais générative) qui
déroule la correction pas à pas, avec les valeurs exactes de l'entrée
vérifiée. Décision et règles : `docs/decisions/0028-animated-explanation-lane.md`.

## La règle du zéro implicite (standard v2 — verdict owner 2026-08-11)

Le public est l'élève qui a besoin que TOUT soit expliqué. Donc :

- **Chaque geste algébrique = une étape** (`self.next_section()`), avec
  trois temps : ce qu'on va faire, pourquoi, le calcul écrit en entier
  (chiffre par chiffre quand ça compte), puis le résultat.
- **Aucun savoir supposé** : on nomme les coefficients, on rappelle la
  formule avant de l'utiliser, on dit ce que signifie un signe, un
  module, un argument — même si « tout le monde le sait ».
- **Rythme calme** : pauses longues (`pose()`), écritures lentes. Un
  exercice de 3 points ≈ 5 à 7 minutes, ~30 étapes. Le pilote v1
  (78 s) était TROP RAPIDE — c'est la faute à ne pas reproduire.
- **Sections = clics** : le rendu `--save_sections` produit un clip par
  étape ; le lecteur web joue une étape par clic et s'arrête (l'élève
  avance à son rythme). La vidéo complète reste disponible en mode
  continu.
- Une légende en bas d'écran accompagne chaque étape en français parlé
  (registre oral, phrases courtes) — c'est aussi la future narration.

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
