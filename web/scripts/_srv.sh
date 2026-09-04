#!/bin/sh
# Démarre/arrête le serveur de mesure sans jamais tuer le shell qui l'appelle :
# on filtre sur /proc/<pid>/comm (le NOM du processus), pas sur sa ligne de
# commande — un `pkill -f "next start"` attrape aussi le script qui contient
# cette chaîne, et coupe la session. Payé deux fois aujourd'hui.
# ATTENTION : /proc/<pid>/comm est TRONQUÉ à 15 caractères. Le serveur s'y
# nomme « next-server (v1 », pas « next-server » — une égalité stricte ne
# mord donc jamais, le vieux serveur survit, le nouveau échoue en EADDRINUSE
# et l'on mesure le build précédent en croyant mesurer le nouveau. Payé une
# fois, en mesures fausses. D'où les motifs, et la vérification du build
# servi après chaque démarrage.
arreter() {
  for p in /proc/[0-9]*; do
    c=$(cat "$p/comm" 2>/dev/null)
    case "$c" in
      next-server*|"npm exec next"*) kill "${p#/proc/}" 2>/dev/null ;;
    esac
  done
  sleep 2
  for i in 1 2 3 4 5 6 7 8 9 10; do
    curl -s -o /dev/null --max-time 1 --noproxy '*' "http://127.0.0.1:${2:-3495}/" || return 0
    sleep 1
  done
  echo "AVERTISSEMENT : le port répond encore après l'arrêt"
  return 1
}
demarrer() {
  (nohup npx next start -p "${1:-3495}" > /tmp/next-srv.log 2>&1 &)
  for i in $(seq 1 40); do
    sleep 1
    code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 2 --noproxy '*' "http://127.0.0.1:${1:-3495}/")
    [ "$code" = "200" ] && echo "serveur prêt (${i}s)" && return 0
  done
  echo "ÉCHEC de démarrage"; tail -5 /tmp/next-srv.log; return 1
}
case "$1" in
  stop) arreter ;;
  start) shift; demarrer "$@" ;;
  restart) arreter; shift; demarrer "$@" ;;
esac
