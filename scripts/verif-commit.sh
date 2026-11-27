#!/usr/bin/env bash
# verif-commit — la batterie locale (toutes les étapes sans navigateur de gates.yml) sur un COMMIT,
# dans un arbre propre, tel que la CI le verra. Le geste d'avant chaque poussée.
#
#   scripts/verif-commit.sh            # HEAD
#   scripts/verif-commit.sh <commit>
#
# Pourquoi un arbre à part : la batterie lancée dans l'arbre de travail mesure aussi ce qui n'est
# pas commité (fichiers non suivis, modifications en cours) — elle peut être verte sur ce que la CI
# ne recevra jamais. Ici, un `git worktree` détaché sur le commit, avec le node_modules de web/
# emprunté par lien symbolique (aucune installation). L'arbre est réutilisé d'une fois sur l'autre.
#
# Journal complet : $VERIF_ARBRE/../verif-commit.log. POSIX (Linux, macOS, WSL2).
set -u
RACINE=$(git rev-parse --show-toplevel) || exit 9
REF=$(git -C "$RACINE" rev-parse "${1:-HEAD}") || exit 9
ARBRE=${VERIF_ARBRE:-$(cd "$RACINE/.." && pwd)/$(basename "$RACINE")-verif}
JOURNAL=$(dirname "$ARBRE")/verif-commit.log
if [ ! -d "$ARBRE/.git" ] && [ ! -f "$ARBRE/.git" ]; then
  git -C "$RACINE" worktree add -q --detach "$ARBRE" "$REF" > /dev/null || exit 9
fi
git -C "$ARBRE" checkout -q --detach "$REF" || exit 9
[ -e "$ARBRE/web/node_modules" ] || ln -s "$RACINE/web/node_modules" "$ARBRE/web/node_modules"
cd "$ARBRE/web" && timeout 1800 node scripts/batterie-locale.mjs > "$JOURNAL" 2>&1
code=$?
echo "batterie $REF → exit $code   (journal : $JOURNAL)"
grep -E "✗" "$JOURNAL" | head -12
tail -1 "$JOURNAL"
exit $code
