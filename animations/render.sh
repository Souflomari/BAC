#!/usr/bin/env bash
# Rendu des explications animées — local (manim installé) ou Docker
# (image officielle manimcommunity/manim), au choix via MODE.
#   ./render.sh scenes/<...>/<id>.py     # une scène
#   ./render.sh --all                    # toutes les scènes du dossier
#   QUALITY=l ./render.sh <scene>        # brouillon 480p (l|m|h|k)
set -euo pipefail
cd "$(dirname "$0")"

QUALITY="${QUALITY:-h}"
MODE="${MODE:-auto}"     # auto | local | docker
SECTIONS="${SECTIONS:-1}" # 1 = aussi un clip par étape (lecteur cliquable)

render_one() {
  local file="$1" extra=""
  [ "$SECTIONS" = "1" ] && extra="--save_sections"
  # Manim range les sorties par NOM DE FICHIER seul ; deux notions ayant
  # le même id d'entrée (bk-2019-n-x2 existe en nc-1 ET nc-2) entreraient
  # en collision. On isole donc par notion : media/<matière>-<notion>/.
  local rel="${file#scenes/}" matiere notion mdir
  matiere="${rel%%/*}"; rel="${rel#*/}"; notion="${rel%%/*}"
  mdir="media/${matiere}-${notion}"
  echo "── rendu: $file (qualité $QUALITY, sections=$SECTIONS, media=$mdir)"
  if [ "$MODE" = "docker" ] || { [ "$MODE" = "auto" ] && ! command -v manim >/dev/null 2>&1; }; then
    docker run --rm -u "$(id -u):$(id -g)" -v "$PWD":/manim -w /manim \
      manimcommunity/manim:stable manim render "$file" Explication --quality "$QUALITY" --media_dir "$mdir" $extra
  else
    manim render "$file" Explication --quality "$QUALITY" --media_dir "$mdir" $extra
  fi
}

if [ "${1:-}" = "--all" ]; then
  find scenes -name '*.py' -type f | sort | while read -r f; do render_one "$f"; done
else
  render_one "${1:?usage: render.sh <scene.py> | --all}"
fi
echo "Sorties dans animations/media/videos/ (gitignoré — la vidéo est un artefact)."
