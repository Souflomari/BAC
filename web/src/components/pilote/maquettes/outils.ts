"use client";

import { useEffect, useState } from "react";

/**
 * Normalise la typographie française pour les chaînes affichées dans le DOM
 * et dans les étiquettes SVG : apostrophe courbe et espace fine insécable
 * devant ; : ! ? » et après «.
 */
export function ty(input: string): string {
  return input
    .replace(/'/g, "\u2019")
    .replace(/ ([;:!?»])/g, "\u202F$1")
    .replace(/« /g, "«\u202F");
}

/**
 * Formate un nombre réel à la française : virgule décimale et vrai signe moins (−).
 */
export function frNum(x: number, dec = 2): string {
  const abs = Math.abs(x).toFixed(dec);
  const sign = x < 0 && Number(abs) !== 0 ? "\u2212" : "";
  return sign + abs.replace(".", ",");
}

/** Interpolation linéaire bornée. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

/** Courbe douce sans rebond ni dépassement (DESIGN-BIBLE §5). */
export function easeCalm(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

/** Suit `prefers-reduced-motion: reduce` en direct. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
