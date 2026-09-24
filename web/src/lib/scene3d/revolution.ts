/**
 * revolution.ts — la géométrie de la scène « le solide de révolution »
 * (maths/calcul-integral, R9 ; ADR 0041 ; spec : content/maths/calcul-integral/
 * spec-extension.md §9).
 *
 * Aucune dépendance three.js : le panneau en tire ses lectures et il est chargé
 * avec la leçon ; le rendu, lui, n'est importé qu'au clic.
 *
 * La portion de la courbe de f (continue, POSITIVE) sur [a ; b] tourne d'un
 * tour complet autour de l'axe des abscisses, dans un repère ORTHONORMÉ. Coupé
 * perpendiculairement à l'axe à l'abscisse x, le solide est un DISQUE de rayon
 * f(x), d'aire π f(x)². Son volume, en unités de volume :
 *     V = π ∫ₐᵇ f(x)² dx.
 *
 * LES TROIS FONCTIONS SONT CELLES DES EXEMPLES TRAVAILLÉS de la leçon :
 *     racine  √x sur [0 ; 4]        → V = 8π
 *     cone    2x/3 sur [0 ; 3]      → V = 4π  (le cône r = 2, h = 3 : πr²h/3)
 *     log     √(ln x) sur [1 ; e]   → V = π   (∫₁ᵉ ln x dx = 1, chapitre 8)
 * Les volumes se CALCULENT ici, par une primitive de f² — ils ne sont pas
 * recopiés ; la porte de la scène les recalcule par une autre voie.
 *
 * FRONTIÈRE (limite SExp, spec §3.2) : les tranches empilées sont une IMAGE.
 * Aucune somme n'est calculée, ni affichée — pas de fonction pour ça ici.
 */

export type IdFonction = "racine" | "cone" | "log";

export interface Fonction {
  id: IdFonction;
  /** « f(x) = … », en LaTeX */
  ecriture: string;
  /** la même chose en texte, pour la légende et le lecteur d'écran */
  texte: string;
  /** « [0\,;4] », en LaTeX */
  intervalle: string;
  a: number;
  b: number;
  f(x: number): number;
  /** Une primitive de f² : le volume exact en découle. */
  G(x: number): number;
  /** V/π, en LaTeX exact (« 8 », « 4 », « » pour 1) */
  vSurPiTex: string;
  /** Une primitive de f, quand elle est élémentaire (l'aire de la région). */
  F?: (x: number) => number;
  /** L'aire exacte de la région, en LaTeX, quand elle se dit simplement. */
  aireTex?: string;
}

export const FONCTIONS: Record<IdFonction, Fonction> = {
  racine: {
    id: "racine",
    texte: "f(x) = √x sur [0 ; 4]",
    ecriture: "f(x) = \\sqrt{x}",
    intervalle: "[0\\,;4]",
    a: 0,
    b: 4,
    f: (x) => Math.sqrt(Math.max(0, x)),
    G: (x) => (x * x) / 2,
    vSurPiTex: "8",
    F: (x) => (2 / 3) * Math.pow(Math.max(0, x), 1.5),
    aireTex: "\\dfrac{16}{3}",
  },
  cone: {
    id: "cone",
    texte: "f(x) = 2x/3 sur [0 ; 3]",
    ecriture: "f(x) = \\dfrac{2}{3}\\,x",
    intervalle: "[0\\,;3]",
    a: 0,
    b: 3,
    f: (x) => (2 * x) / 3,
    G: (x) => (4 * x * x * x) / 27,
    vSurPiTex: "4",
    F: (x) => (x * x) / 3,
    aireTex: "3",
  },
  log: {
    id: "log",
    texte: "f(x) = √(ln x) sur [1 ; e]",
    ecriture: "f(x) = \\sqrt{\\ln x}",
    intervalle: "[1\\,;e]",
    a: 1,
    b: Math.E,
    f: (x) => Math.sqrt(Math.max(0, Math.log(x))),
    G: (x) => x * Math.log(x) - x,
    vSurPiTex: "",
  },
};

export const ORDRE_FONCTIONS: IdFonction[] = ["racine", "cone", "log"];

export const PAS_BALAYAGE = 15; // degrés : 180° et 360° tombent juste
export const PAS_TRANCHE = 0.25;
export const TRANCHES_MAX = 40;
export const UNITE_MIN = 1;
export const UNITE_MAX = 3;

export interface EtatRevolution {
  fonction: IdFonction;
  /** l'angle balayé, en degrés, de 0 à 360 */
  alpha: number;
  /** l'abscisse de la coupe */
  x: number;
  /** le nombre de tranches empilées (une image, jamais une somme) */
  n: number;
  /** l'unité du repère orthonormé, en cm */
  k: number;
}

/** La plus grande abscisse de la grille de coupe qui reste dans [a ; b]. */
export const xMaxGrille = (F: Fonction) => F.a + Math.floor((F.b - F.a) / PAS_TRANCHE + 1e-9) * PAS_TRANCHE;

/** L'abscisse de coupe ramenée sur la grille de pas 0,25 et dans l'intervalle courant. */
export function xSurGrille(F: Fonction, x: number): number {
  const k = Math.round((x - F.a) / PAS_TRANCHE);
  return Math.min(xMaxGrille(F), Math.max(F.a, F.a + k * PAS_TRANCHE));
}

/** Le rayon le plus grand du solide (pour cadrer). */
export function rayonMax(F: Fonction): number {
  let m = 0;
  for (let i = 0; i <= 200; i++) m = Math.max(m, F.f(F.a + ((F.b - F.a) * i) / 200));
  return m;
}

// ── Les grandeurs ─────────────────────────────────────────────────────────

/** V = π ∫ₐᵇ f² — exact, par la primitive de f². */
export const volume = (F: Fonction) => Math.PI * (F.G(F.b) - F.G(F.a));
/** Le volume balayé à l'angle α : la rotation est uniforme, il croît comme α. */
export const volumeBalaye = (F: Fonction, alpha: number) => (volume(F) * alpha) / 360;
/** L'aire de la coupe à l'abscisse x : un disque de rayon f(x). */
export const aireCoupe = (F: Fonction, x: number) => Math.PI * F.f(x) ** 2;
/** L'aire de la région sous la courbe (u.a.). Primitive si elle existe,
 *  sinon Simpson (la fonction log n'en a pas d'élémentaire). */
export function aireRegion(F: Fonction): number {
  if (F.F) return F.F(F.b) - F.F(F.a);
  const n = 400;
  const h = (F.b - F.a) / n;
  let s = F.f(F.a) + F.f(F.b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * F.f(F.a + i * h);
  return (s * h) / 3;
}
/** 1 u.v. = k³ cm³ : le cube bâti sur l'unité. */
export const volumeCm3 = (F: Fonction, k: number) => volume(F) * k ** 3;

// ── Écriture française des nombres ───────────────────────────────────────

/** 25,1327… → « 25,13 » ; 1,5 → « 1,5 » ; −0 → « 0 ». Deux décimales au plus. */
export function nombre(x: number, decimales = 2): string {
  const p = 10 ** decimales;
  const r = Math.round(x * p) / p;
  const s = (Object.is(r, -0) ? 0 : r).toFixed(decimales).replace(/\.?0+$/, "");
  return s.replace("-", "−").replace(".", ",");
}

/** « 1,5 » exact, ou « ≈ 1,22 » quand l'arrondi a mordu. */
export function valeur(x: number, decimales = 2): string {
  const p = 10 ** decimales;
  return Math.abs(x - Math.round(x * p) / p) < 1e-9 ? nombre(x, decimales) : `≈ ${nombre(x, decimales)}`;
}

/**
 * Une grandeur qui vaut c·π, écrite pour l'élève : « 8π ≈ 25,13 » quand c
 * tombe juste à deux décimales (8, 2,25, 1…), sinon la seule valeur approchée
 * « ≈ 1,05 » — on n'écrit pas « 0,33π » pour un tiers.
 */
export function enPi(c: number): string {
  const r = Math.round(c * 100) / 100;
  const v = nombre(c * Math.PI);
  if (Math.abs(c) < 1e-12) return "0";
  if (Math.abs(c - r) > 1e-9) return `≈ ${v}`;
  const coef = Math.abs(r - 1) < 1e-12 ? "" : nombre(r);
  return `${coef}π ≈ ${v}`;
}
