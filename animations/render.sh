#!/usr/bin/env bash
# Rendu des explications animées — local (manim installé) ou Docker
# (image officielle manimcommunity/manim), au choix via MODE.
#   ./render.sh scenes/<...>/<id>.py     # une scène
#   ./render.sh --all                    # toutes les scènes du dossier
#   QUALITY=l ./render.sh <scene>        # brouillon 480p (l|m|h|k)
set -euo pipefail
cd "$(dirname "$0")"

QUALITY="${QUALITY:-h}"
MODE="${MODE:-auto}" # auto | local | docker

render_one() {
  local file="$1"
  echo "── rendu: $file (qualité $QUALITY)"
  if [ "$MODE" = "docker" ] || { [ "$MODE" = "auto" ] && ! command -v manim >/dev/null 2>&1; }; then
    docker run --rm -u "$(id -u):$(id -g)" -v "$PWD":/manim -w /manim \
      manimcommunity/manim:stable manim render "$file" Explication --quality "$QUALITY"
  else
    manim render "$file" Explication --quality "$QUALITY"
  fi
}

if [ "${1:-}" = "--all" ]; then
  find scenes -name '*.py' -type f | sort | while read -r f; do render_one "$f"; done
else
  render_one "${1:?usage: render.sh <scene.py> | --all}"
fi
echo "Sorties dans animations/media/videos/ (gitignoré — la vidéo est un artefact)."
