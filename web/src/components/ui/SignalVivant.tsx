"use client";

/**
 * SignalVivant — la preuve, côté navigateur, que le JavaScript est arrivé.
 *
 * Ce composant ne rend RIEN. Son montage est un fait : React s'est hydraté,
 * donc les flèches changeront de chapitre et les QCM s'ouvriront. La veille
 * posée dans `PageShell` attend ce fait ; s'il ne vient pas dans les douze
 * secondes, elle révèle un bandeau statique qui prévient l'élève.
 *
 * POURQUOI SI PEU DE CODE POUR QUELQUE CHOSE D'AUSSI BÊTE. Mesuré le
 * 2026-09-04 sur un réseau qui rampe (`docs/audits/reseau-malade.md`) : la
 * perte d'UN SEUL morceau de JavaScript laisse le cours parfaitement lisible
 * — il est rendu par le serveur — et la page entièrement MORTE, sans un mot.
 * Un composant React ne peut pas prévenir dans ce cas : dans ce cas, il n'est
 * jamais monté. La seule chose qu'un composant puisse faire, c'est dire
 * « je suis là » quand il l'est ; tout le reste est du HTML et six lignes de
 * script en ligne.
 *
 * Et le signal REFERME le bandeau : si l'hydratation finit par arriver à la
 * quinzième seconde, la fausse alerte disparaît d'elle-même.
 */

import { useEffect } from "react";

export function SignalVivant() {
  useEffect(() => {
    (window as unknown as { __bacVivant?: boolean }).__bacVivant = true;
    const veille = document.getElementById("hydratation-perdue");
    if (veille) veille.hidden = true;
  }, []);
  return null;
}
