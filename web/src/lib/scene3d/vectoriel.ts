/**
 * vectoriel.ts — la géométrie de la scène « le produit vectoriel »
 * (maths/geometrie-espace, R3 ; ADR 0041).
 *
 * Aucune dépendance three.js : le panneau en tire ses lectures et il est chargé
 * avec la leçon ; le rendu, lui, n'est importé qu'au clic.
 *
 * LA SCÈNE PART DE L'EXEMPLE TRAVAILLÉ : le tétraèdre trirectangle A(0,0,0),
 * B(2,0,0), C(0,2,0), S(0,0,2). u = AB reste fixe ; v = AC tourne d'un angle θ
 * autour de A dans le plan que l'on incline de φ autour de (Ax) :
 *     v = ‖v‖ (cos θ, sin θ cos φ, sin θ sin φ).
 * À θ = 90°, ‖v‖ = 2, φ = 0 : v = AC, et AB ∧ AC = (0, 0, 4), aire(ABC) = 2 —
 * les nombres de la leçon.
 *
 * La définition est celle de la leçon, composante par composante :
 *     u ∧ v = (y z' − z y', z x' − x z', x y' − y x').
 */

export type V3 = [number, number, number];

export const PAS_ANGLE = 5; // degrés
export const PAS_LONGUEUR = 0.5;
export const LONGUEUR_MIN = 0.5;
export const LONGUEUR_MAX = 3;
export const U: V3 = [2, 0, 0];

export type Ordre = "uv" | "vu";

export interface EtatVectoriel {
  /** l'angle (u, v), en degrés, grille de 5° */
  theta: number;
  /** ‖v‖, grille de 0,5 */
  lv: number;
  /** l'inclinaison du plan (u, v) autour de (Ax), en degrés */
  phi: number;
  /** u ∧ v, ou v ∧ u */
  ordre: Ordre;
}

const rad = (d: number) => (d * Math.PI) / 180;

/** Arrondi aux ULP près : cos 90° vaut 6e-17 en flottant, pas 0. */
const net = (x: number) => (Math.abs(x) < 1e-12 ? 0 : x);

export function vecteurV(e: Pick<EtatVectoriel, "theta" | "lv" | "phi">): V3 {
  const t = rad(e.theta);
  const p = rad(e.phi);
  return [net(e.lv * Math.cos(t)), net(e.lv * Math.sin(t) * Math.cos(p)), net(e.lv * Math.sin(t) * Math.sin(p))];
}

export function vectoriel(a: V3, b: V3): V3 {
  return [net(a[1] * b[2] - a[2] * b[1]), net(a[2] * b[0] - a[0] * b[2]), net(a[0] * b[1] - a[1] * b[0])];
}

export const scalaire = (a: V3, b: V3) => net(a[0] * b[0] + a[1] * b[1] + a[2] * b[2]);
export const norme = (a: V3) => Math.hypot(a[0], a[1], a[2]);

/** Le produit que la scène montre : u ∧ v, ou v ∧ u selon l'ordre choisi. */
export function produit(e: EtatVectoriel): V3 {
  const v = vecteurV(e);
  return e.ordre === "uv" ? vectoriel(U, v) : vectoriel(v, U);
}

/** Aire du parallélogramme construit sur u et v : ‖u ∧ v‖ = ‖u‖‖v‖ sin θ. */
export const aireParallelogramme = (e: EtatVectoriel) => norme(vectoriel(U, vecteurV(e)));

// ── Écriture française des nombres ───────────────────────────────────────

/** 4 → « 4 » ; 3,4641… → « 3,46 » ; −0 → « 0 ». Deux décimales au plus. */
export function nombre(x: number): string {
  const r = Math.round(x * 100) / 100;
  const s = (Object.is(r, -0) ? 0 : r).toFixed(2).replace(/\.?0+$/, "");
  return s.replace("-", "−").replace(".", ",");
}

/** Exact, ou approché : « 4 », « ≈ 3,46 ». */
export function valeur(x: number): string {
  const r = Math.round(x * 100) / 100;
  return Math.abs(x - r) < 1e-9 ? nombre(x) : `≈ ${nombre(x)}`;
}

/** Les coordonnées, à la française : « (0 ; 0 ; 4) » ; si l'une est arrondie,
 *  le « ≈ » vaut pour le triplet entier : « ≈ (0 ; −1,73 ; 3) ». */
export function coordonnees(a: V3): string {
  const approche = a.some((x) => Math.abs(x - Math.round(x * 100) / 100) >= 1e-9);
  return `${approche ? "≈ " : ""}(${a.map(nombre).join(" ; ")})`;
}
