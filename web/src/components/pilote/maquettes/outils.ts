"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Taille minimale d'un texte dans un SVG `viewBox="0 0 760 500"` pour garantir
 * ≥ 11 px réels sur un téléphone de 390 px de large (où le SVG mesure ~344 px,
 * soit un facteur d'échelle ≈ 0,453 : 25 × 0,453 = 11,3 px réels).
 */
export const SVG_FS = 25;
export const SVG_FS_TITRE = 26;

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

/**
 * Primitive 1 — Lecture / pause / rejouer / transition vers un palier.
 * Utilisée par toutes les maquettes : rien ne démarre seul, tout se rejoue,
 * et `prefers-reduced-motion: reduce` remplace les transitions par des sauts francs.
 */
export function useLectureAnimee(options: {
  initial: number;
  min: number;
  max: number;
  vitesse: number;
  palierSuivant?: (courant: number) => number;
}) {
  const { initial, min, max, vitesse, palierSuivant } = options;
  const reduced = useReducedMotion();
  const [valeur, setValeur] = useState<number>(initial);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const targetRef = useRef<number | null>(null);

  const stopAnim = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    lastRef.current = null;
    targetRef.current = null;
    setPlaying(false);
  }, []);

  useEffect(() => () => stopAnim(), [stopAnim]);

  const lancerVers = useCallback(
    (cible: number, depart?: number) => {
      stopAnim();
      const dest = clamp(cible, min, max);
      if (reduced) {
        setValeur(dest);
        return;
      }
      if (depart !== undefined) setValeur(clamp(depart, min, max));
      targetRef.current = dest;
      setPlaying(true);
      const tick = (now: number) => {
        if (lastRef.current === null) lastRef.current = now;
        const dt = Math.min(0.05, (now - lastRef.current) / 1000);
        lastRef.current = now;
        let done = false;
        setValeur((prev) => {
          const t = targetRef.current ?? max;
          const diff = t - prev;
          const step = vitesse * dt;
          if (Math.abs(diff) <= step) {
            done = true;
            return t;
          }
          return prev + Math.sign(diff) * step;
        });
        if (done) {
          stopAnim();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [max, min, reduced, stopAnim, vitesse]
  );

  const togglePlay = useCallback(() => {
    if (playing) {
      stopAnim();
      return;
    }
    if (reduced) {
      setValeur((prev) => {
        if (prev >= max - 0.02) return min;
        return palierSuivant ? palierSuivant(prev) : max;
      });
      return;
    }
    if (valeur >= max - 0.02) {
      lancerVers(max, min);
    } else {
      lancerVers(max);
    }
  }, [lancerVers, max, min, palierSuivant, playing, reduced, stopAnim, valeur]);

  const rejouer = useCallback(() => {
    stopAnim();
    setValeur(initial);
  }, [initial, stopAnim]);

  const fixer = useCallback(
    (v: number) => {
      stopAnim();
      setValeur(clamp(v, min, max));
    },
    [max, min, stopAnim]
  );

  return { valeur, playing, reduced, togglePlay, lancerVers, rejouer, fixer, stopAnim };
}

/**
 * Primitive 2 — Repère cartésien SVG (utilisée par `suites`, `dipole-rc`,
 * `exponentielle`, `radioactivite`). Transforme des coordonnées physiques ou
 * mathématiques (x, y) en pixels du `viewBox` et génère un tracé SVG borné.
 */
export function creerRepere(cfg: {
  x0: number;
  y0: number;
  w: number;
  h: number;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}) {
  const { x0, y0, w, h, xMin, xMax, yMin, yMax } = cfg;
  const X = (v: number) => x0 + ((v - xMin) / (xMax - xMin)) * w;
  const Y = (v: number) => y0 - ((v - yMin) / (yMax - yMin)) * h;
  const tracerCourbe = (fn: (x: number) => number, xDebut = xMin, xFin = xMax, pas = 64): string => {
    let d = "";
    for (let i = 0; i <= pas; i++) {
      const xv = xDebut + ((xFin - xDebut) * i) / pas;
      const yv = fn(xv);
      if (!Number.isFinite(yv)) continue;
      if (yv >= yMin - (yMax - yMin) * 0.05 && yv <= yMax + (yMax - yMin) * 0.05) {
        const py = Y(clamp(yv, yMin, yMax));
        d += `${d ? " L " : "M "}${X(xv).toFixed(1)} ${py.toFixed(1)}`;
      }
    }
    return d;
  };
  return { X, Y, tracerCourbe, x0, y0, w, h };
}

/**
 * Primitive 3 — Jauge proportionnelle (utilisée par `dipole-rc`, `suites`, `noyaux`, `exponentielle`).
 */
export function calculerJauge(val: number, max: number, largeurMax: number) {
  const ratio = max > 0 ? clamp(val / max, 0, 1) : 0;
  return {
    ratio,
    largeur: Math.max(3, ratio * largeurMax),
    pctEntier: Math.round(ratio * 100),
  };
}

/**
 * Primitive 4 — Résolution du palier nommé actif pour un paramètre `u`
 * (utilisée par `meiose`, `radioactivite`, `noyaux`, `logarithme`, `expression-genetique`).
 */
export function trouverPalier<T extends { u: number }>(paliers: readonly T[], u: number): { index: number; palier: T } {
  let index = 0;
  for (let i = 0; i < paliers.length; i++) {
    if (u >= paliers[i].u - 0.15) index = i;
  }
  return { index, palier: paliers[index] };
}
