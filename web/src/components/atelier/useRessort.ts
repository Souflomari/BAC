"use client";

/**
 * useRessort — anime une valeur vers sa cible avec la physique M3.
 *
 * Trois choix assumés :
 *   · La boucle s'ARRÊTE quand le ressort est au repos. Une rAF qui tourne
 *     en permanence pour une valeur immobile, c'est de la batterie brûlée.
 *   · `prefers-reduced-motion` saute directement à la cible — le contenu
 *     reste identique, seul le trajet disparaît.
 *   · Le premier rendu ne s'anime pas : on n'entre pas sur un écran en
 *     regardant les choses glisser depuis zéro.
 */

import { useEffect, useRef, useState } from "react";
import { pasRessort, ressortAuRepos, SPATIAL, type Ressort } from "@/lib/m3-motion";

export function useRessort(cible: number, ressort: Ressort = SPATIAL.standardDefault) {
  const [valeur, setValeur] = useState(cible);
  const vitesse = useRef(0);
  const brut = useRef(cible);
  const premier = useRef(true);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      brut.current = cible;
      setValeur(cible);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      brut.current = cible;
      vitesse.current = 0;
      setValeur(cible);
      return;
    }

    let precedent = performance.now();
    const boucle = (t: number) => {
      const dt = (t - precedent) / 1000;
      precedent = t;
      const r = pasRessort(brut.current, vitesse.current, cible, ressort, dt);
      brut.current = r.position;
      vitesse.current = r.vitesse;
      setValeur(r.position);
      if (ressortAuRepos(r.position, r.vitesse, cible)) {
        brut.current = cible;
        vitesse.current = 0;
        setValeur(cible);
        raf.current = null;
        return;
      }
      raf.current = requestAnimationFrame(boucle);
    };
    raf.current = requestAnimationFrame(boucle);
    return () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, [cible, ressort]);

  return valeur;
}
