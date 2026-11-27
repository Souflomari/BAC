"use client";

import { useSyncExternalStore } from "react";

const abonner = () => () => {};

/**
 * Faux au rendu serveur et pendant l'hydratation, vrai dès que React a pris
 * la main sur la page — sans écart d'hydratation (c'est le cas d'usage
 * canonique de `useSyncExternalStore` : un instantané serveur, un instantané
 * client, et React re-rend après l'hydratation).
 *
 * POURQUOI (2026-09-11, HANDOFF §11.28). Sur 3G lente (400 kb/s, 400 ms) et
 * processeur ×4, le bouton « Chapitre suivant » d'une leçon est visible à
 * 4–8 s et ne répond à rien jusqu'à 17–28 s : il est rendu par le serveur,
 * son onClick attend l'hydratation, qui attend ~350 ko de JavaScript. Un
 * bouton visible qui ignore le doigt est la pire forme de lenteur (§8.7).
 * Avec ce crochet, les commandes qui n'existent qu'après l'hydratation se
 * rendent `disabled` + `aria-busy` jusque-là — et le disent.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(abonner, () => true, () => false);
}
