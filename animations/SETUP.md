# Installation du rendu Manim

Deux voies. La voie Docker est recommandée partout (zéro dépendance à
gérer : LaTeX, FFmpeg, Cairo et Pango sont dans l'image officielle).

## Voie Docker (recommandée)

```sh
docker pull manimcommunity/manim:stable
./render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py   # MODE=auto la choisit si manim n'est pas installé
```

## Voie native

Prérequis système : Python ≥ 3.10, FFmpeg, une distribution LaTeX
(pour `MathTex`) et les bibliothèques Cairo/Pango.

- **macOS** : `brew install ffmpeg cairo pango pkg-config && brew install --cask mactex-no-gui`
- **Debian/Ubuntu** :
  `sudo apt install ffmpeg libcairo2-dev libpango1.0-dev pkg-config python3-dev texlive texlive-latex-extra texlive-fonts-recommended texlive-science dvisvgm`
- **Windows** : suivre https://docs.manim.community/en/stable/installation.html

Puis :

```sh
python -m pip install -r requirements.txt
manim checkhealth          # vérifie ffmpeg + LaTeX
./render.sh <scene>
```

## Vérification rapide

`QUALITY=l ./render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py`
doit produire `media/videos/bk-2018-n-x2/480p15/Explication.mp4` en
moins de deux minutes. La qualité de livraison est `h` (1080p).

## Où rendre ?

- **Claude Code** (ce dépôt, conteneur distant ou machine locale) — la
  voie normale, décision owner 2026-08-07 (ADR 0028 §4).
- **CI** : possible via l'image Docker dans un workflow manuel si un
  batch dépasse la session ; l'artefact est téléchargé depuis l'onglet
  Actions. (À câbler quand le besoin arrive — pas avant.)
- **Pas Cowork** — réservé à la phase ElevenLabs Studio (E3).
