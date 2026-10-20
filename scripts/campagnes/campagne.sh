#!/usr/bin/env bash
# campagne — la campagne de sabotages du PRODUIT pour une porte de scène (ADR 0034, 0038).
#
# Chaque sabotage est posé, bâti, mesuré par la porte, retiré ; l'arbre doit revenir à l'identique avant
# le suivant. La porte doit être VERTE sur le produit propre AVANT et APRÈS — sinon aucun rouge entre
# les deux ne prouve rien (ADR 0034 : un rouge ne prouve rien sans le vert qui l'a précédé).
#
#   ARBRE=../BAC-sab PORTE=scene-quotient SABOTAGES=scripts/campagnes/sabotages-quotient.py \
#     bash scripts/campagnes/campagne.sh
#   LISTE="nom1 nom2" … (sous-ensemble) ; JOURNAL=dossier (défaut : $ARBRE/../campagne-$PORTE)
#
# ARBRE est un clone ou un `git worktree` À PART, avec web/node_modules (lien symbolique accepté) :
# jamais l'arbre de travail — chaque sabotage réécrit des fichiers du produit et rebâtit.
# Le port de la porte : chaque porte lit sa propre variable (PORT_QUOTIENT, PORT_PENTES, …, défaut
# 3700-3960 + pid % 60) ; la poser ici évite qu'une porte en mesure une autre. BASE ne doit PAS être
# posé (la porte mesurerait un serveur étranger au lieu du build).
#
# Verdicts écrits dans $JOURNAL/campagne.log : ATTRAPÉ / ATTRAPÉ EN PARTIE / ROUGE AILLEURS / MANQUÉ ;
# « VERT » dans la famille = CONTRE-ESSAI (la porte doit rester verte) ; MUET = exit 3, rien mesuré.
# POSIX (Linux, macOS, WSL2). Compter ~4 min par sabotage (un build + une porte).
set -u
: "${ARBRE:?ARBRE = arbre à part}" "${PORTE:?PORTE = le nom de la porte (ex. scene-quotient)}" "${SABOTAGES:?SABOTAGES = le fichier de sabotages}"
SABOTAGES=$(realpath "$SABOTAGES")
ARBRE=$(realpath "$ARBRE")
S=${JOURNAL:-$(dirname "$ARBRE")/campagne-$PORTE}
mkdir -p "$S"
export ARBRE
unset BASE
cd "$ARBRE/web" || exit 1
L=$S/campagne.log
: > "$L"
LISTE=${LISTE:-$(python3 "$SABOTAGES" --liste)}
python3 "$SABOTAGES" --verifier-tout >> "$L" 2>&1 || { echo "ANCRES FAUTIVES — campagne non lancée" >> "$L"; exit 1; }
git -C "$ARBRE" diff > "$S/avant.patch"
npm run build > "$S/build-propre-avant.log" 2>&1 && echo "build propre OK" >> "$L" || { echo "build propre ÉCHOUÉ — campagne non lancée" >> "$L"; exit 1; }
timeout 1800 node scripts/pw.mjs "$PORTE" --porte > "$S/propre-avant.log" 2>&1; code=$?
echo "porte propre (avant) exit $code — $(tail -1 "$S/propre-avant.log")" >> "$L"
[ $code -eq 0 ] || echo "⚠ la porte n'est pas VERTE sur le produit propre : aucun rouge qui suit ne prouve rien (ADR 0034)" >> "$L"
for nom in $LISTE; do
  fam=$(python3 "$SABOTAGES" "$nom" famille)
  python3 "$SABOTAGES" "$nom" appliquer >> "$L" 2>&1 || { echo "$nom : APPLICATION IMPOSSIBLE" >> "$L"; continue; }
  if npm run build > "$S/build-$nom.log" 2>&1; then
    timeout 1800 node scripts/pw.mjs "$PORTE" --porte > "$S/sab-$nom.log" 2>&1
    code=$?
    rouges=$(grep -o '✘ \[[A-Za-z0-9-]*\]' "$S/sab-$nom.log" | sort | uniq -c | tr -s ' ' | tr '\n' ' ')
    if [ "$fam" = "VERT" ]; then
      if [ $code -eq 0 ]; then v="CONTRE-ESSAI TENU — porte VERTE"; else v="CONTRE-ESSAI ROMPU — la porte rougit sur un produit correct (la sonde est fausse)"; fi
    else
      vues=""; manquent=""
      for f in ${fam//+/ }; do if grep -q "✘ \[$f\]" "$S/sab-$nom.log"; then vues="$vues [$f]"; else manquent="$manquent [$f]"; fi; done
      if [ -z "$manquent" ]; then v="ATTRAPÉ par$vues"
      elif [ -n "$vues" ]; then v="ATTRAPÉ EN PARTIE par$vues — reste(nt) verte(s) :$manquent"
      elif [ $code -ne 0 ]; then v="ROUGE AILLEURS —$manquent reste(nt) verte(s)"
      else v="MANQUÉ — porte VERTE"; fi
    fi
    [ $code -eq 3 ] && v="MUET (exit 3, rien mesuré) — $v"
    grep -q "✘ \[execution\]" "$S/sab-$nom.log" && v="$v — la porte s'est ARRÊTÉE en cours de mesure"
    echo "$nom : exit $code — $v — rouges : $rouges" >> "$L"
  else echo "$nom : BUILD ÉCHOUÉ (voir build-$nom.log)" >> "$L"; fi
  python3 "$SABOTAGES" "$nom" retirer >> "$L" 2>&1 || echo "$nom : RETRAIT IMPOSSIBLE" >> "$L"
  # garde : l'arbre revient à l'identique avant le sabotage suivant (une campagne a perdu sa fin sur un
  # retrait impossible)
  git -C "$ARBRE" diff | cmp -s - "$S/avant.patch" || { echo "$nom : ARBRE NON RESTAURÉ — campagne ARRÊTÉE" >> "$L"; break; }
done
git -C "$ARBRE" diff > "$S/apres.patch"
cmp -s "$S/avant.patch" "$S/apres.patch" && echo "arbre produit : IDENTIQUE" >> "$L" || echo "arbre produit : DIFFÉRENT" >> "$L"
npm run build > "$S/build-propre-apres.log" 2>&1 && echo "build propre OK" >> "$L"
timeout 1800 node scripts/pw.mjs "$PORTE" --porte > "$S/propre-apres.log" 2>&1; echo "porte propre (après) exit $? — $(tail -1 "$S/propre-apres.log")" >> "$L"
echo FIN >> "$L"
