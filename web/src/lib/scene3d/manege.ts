/**
 * manege.ts — la physique de la scène « le manège » (pc/rotation-axe-fixe,
 * R2 ; ADR 0041 ; spec : content/pc/rotation-axe-fixe/spec-scene-manege.md),
 * SANS three.js.
 *
 * Tout ce que la scène AFFICHE en nombres vient d'ici et ne dépend d'aucun
 * rendu : sans WebGL, les lectures restent vraies. Le rendu lit les MÊMES
 * fonctions.
 *
 * LES NOMBRES SONT CEUX DE LA LEÇON (`content/pc/rotation-axe-fixe/lesson.md`) :
 * un disque homogène de M = 60 kg et R = 1,50 m (J = ½ M R² = 67,5 kg·m²,
 * valeur de la table de R3) ; des enfants de 25 kg, assimilés à des points ;
 * une poussée de 30 N, pendant 4,0 s ; g = 9,8 m·s⁻² (celui du chapitre 7),
 * donc un poids de 245 N.
 *
 * LE MOMENT SE CALCULE COMME LE PROGRAMME LE DÉFINIT, et le zéro est
 * STRUCTUREL (spec §5.4) : (bras de levier) × (composante de la force dans le
 * plan perpendiculaire à Δ). Une force parallèle à Δ a une composante NULLE
 * dans ce plan — posée à 0, jamais obtenue par un cos 90° qui vaudrait 6e-17 ;
 * une force radiale a un bras de levier NUL. Aucun produit vectoriel (hors
 * programme, spec §9.1).
 */

export const MASSE_DISQUE = 60; // kg
export const RAYON = 1.5; // m
export const MASSE_ENFANT = 25; // kg (chacun)
export const POUSSEE = 30; // N
export const G = 9.8; // m·s⁻²
export const POIDS = MASSE_ENFANT * G; // 245 N
export const DUREE = 4.0; // s — la durée de poussée de l'exemple travaillé de R4
export const J_DISQUE = 0.5 * MASSE_DISQUE * RAYON * RAYON; // 67,5 kg·m²

/** Le pas des deux distances (spec §5.1) : 0,10 m rend EXACTES les valeurs de la leçon. */
export const PAS = 0.1;
export const R_SIEGES_MIN = 0.1;
export const R_POUSSEE_MIN = 0.2;

export type Force = "poids" | "radiale" | "tangentielle";
export type Axe = "vertical" | "horizontal";
export type Occupants = "deux" | "un";

export interface EtatManege {
  force: Force;
  axe: Axe;
  /** la distance des sièges à l'axe (m) */
  rSieges: number;
  /** la distance du point de poussée à l'axe (m) */
  rPoussee: number;
  occupants: Occupants;
  /** le temps de la course (s), 0 au départ */
  t: number;
}

export const surGrille = (x: number) => Math.round(x / PAS) * PAS;

/** La force, en newtons : le poids d'un enfant, ou la poussée. */
export const intensite = (f: Force) => (f === "poids" ? POIDS : POUSSEE);

/** Combien d'enfants sur le manège. */
export const nombreEnfants = (o: Occupants) => (o === "deux" ? 2 : 1);

/** J_Δ = 67,5 (disque) + n × 25 × r² (enfants), en kg·m². */
export const inertie = (e: Pick<EtatManege, "occupants" | "rSieges">) =>
  J_DISQUE + nombreEnfants(e.occupants) * MASSE_ENFANT * e.rSieges * e.rSieges;

/** La part des enfants dans J_Δ. */
export const inertieEnfants = (e: Pick<EtatManege, "occupants" | "rSieges">) =>
  nombreEnfants(e.occupants) * MASSE_ENFANT * e.rSieges * e.rSieges;

// ── L'axe basculé : le siège descend jusqu'à l'équilibre ────────────────────
//
// Axe horizontal, un enfant au bord : le poids du disque passe par Δ (son
// centre y est), seul celui de l'enfant tourne. φ = l'angle dont le siège est
// descendu sous l'horizontale ; J φ̈ = m g d cos φ, départ au repos. La course
// S'ARRÊTE à φ = π/2 (siège sous l'axe, ≈ 1,08 s) : aucune oscillation (§9.4).
// La table est calculée une fois (Runge-Kutta 4, pas de 0,5 ms) ; la fin est
// posée EXACTEMENT à π/2, pas approchée.

interface Bascule {
  fin: number;
  t: number[];
  phi: number[];
}
const basculeCache = new Map<number, Bascule>();

function bascule(d: number): Bascule {
  const cle = Math.round(d * 1000);
  const deja = basculeCache.get(cle);
  if (deja) return deja;
  const J = J_DISQUE + MASSE_ENFANT * d * d;
  const k = (MASSE_ENFANT * G * d) / J;
  const acc = (phi: number) => k * Math.cos(phi);
  const h = 0.0005;
  let phi = 0;
  let w = 0;
  let t = 0;
  const ts = [0];
  const phis = [0];
  while (phi < Math.PI / 2 && t < 10) {
    const k1p = w, k1w = acc(phi);
    const k2p = w + (h / 2) * k1w, k2w = acc(phi + (h / 2) * k1p);
    const k3p = w + (h / 2) * k2w, k3w = acc(phi + (h / 2) * k2p);
    const k4p = w + h * k3w, k4w = acc(phi + h * k3p);
    const suivant = phi + (h / 6) * (k1p + 2 * k2p + 2 * k3p + k4p);
    const wSuivant = w + (h / 6) * (k1w + 2 * k2w + 2 * k3w + k4w);
    if (suivant >= Math.PI / 2) {
      // L'instant exact du passage, par interpolation dans le dernier pas.
      const f = (Math.PI / 2 - phi) / (suivant - phi);
      t += f * h;
      ts.push(t);
      phis.push(Math.PI / 2);
      break;
    }
    phi = suivant;
    w = wSuivant;
    t += h;
    ts.push(t);
    phis.push(phi);
  }
  const b = { fin: t, t: ts, phi: phis };
  basculeCache.set(cle, b);
  return b;
}

/** φ(t), l'angle de descente du siège (rad), axe basculé. */
function phiBascule(d: number, t: number): number {
  const b = bascule(d);
  if (t <= 0) return 0;
  if (t >= b.fin) return Math.PI / 2;
  const i = Math.min(b.t.length - 2, Math.floor(t / 0.0005));
  const t0 = b.t[i], t1 = b.t[i + 1];
  return b.phi[i] + ((b.phi[i + 1] - b.phi[i]) * (t - t0)) / (t1 - t0);
}

/** La fin de la course : 4,0 s d'une poussée, ou le passage à l'équilibre. */
export function finCourse(e: EtatManege): number {
  return e.axe === "horizontal" ? bascule(e.rSieges).fin : DUREE;
}

// ── Le moment ──────────────────────────────────────────────────────────────

/** Le bras de levier (m) de la force sélectionnée, à l'instant t de la course. */
export function brasDeLevier(e: EtatManege): number {
  if (e.axe === "horizontal") {
    // Le poids, vertical, dans le plan de la roue : bras = d cos φ, NUL à
    // l'équilibre (le cosinus de π/2 ne vaut pas 0 en flottant : on le pose).
    const phi = phiBascule(e.rSieges, e.t);
    return phi >= Math.PI / 2 ? 0 : e.rSieges * Math.cos(phi);
  }
  if (e.force === "tangentielle") return e.rPoussee;
  // Radiale : la droite d'action RENCONTRE l'axe. Poids : elle lui est
  // PARALLÈLE — et il n'y a alors pas de bras à mesurer dans le plan (spec
  // §10.2 : en dessiner un serait enseigner l'erreur).
  return 0;
}

/** La composante de la force dans le plan perpendiculaire à Δ (N). */
export function composantePlan(e: EtatManege): number {
  if (e.axe === "vertical" && e.force === "poids") return 0; // parallèle à Δ : rien dans le plan
  return intensite(e.force);
}

/** M_Δ(F) = bras × composante dans le plan (N·m), positif dans le sens de la rotation. */
export const moment = (e: EtatManege) => brasDeLevier(e) * composantePlan(e);

/** θ̈ = ΣM / J (rad·s⁻²) — pour l'axe vertical (l'axe basculé ne l'affiche pas). */
export const acceleration = (e: EtatManege) => (e.axe === "vertical" ? moment(e) / inertie(e) : Number.NaN);

/** ω(t) = θ̈ t (rad/s), pendant la poussée. */
export function omega(e: EtatManege): number {
  if (e.axe === "horizontal") return Number.NaN;
  return acceleration(e) * Math.min(e.t, DUREE);
}

/** θ(t) (rad), l'angle dont le manège a tourné depuis le départ. */
export function angle(e: EtatManege): number {
  if (e.axe === "horizontal") return phiBascule(e.rSieges, e.t);
  const t = Math.min(e.t, DUREE);
  return 0.5 * acceleration(e) * t * t;
}

/** v = d ω et s = d θ pour un point du disque à la distance d de l'axe. */
export const vitessePoint = (d: number, w: number) => d * w;
export const arcPoint = (d: number, th: number) => d * th;

// ── Écriture française des nombres ───────────────────────────────────────────

/** 0,625 → « 0,625 » ; 72 → « 72,0 » avec 1 décimale ; −0 → « 0,0 ». */
export function nombre(x: number, decimales = 1): string {
  const p = 10 ** decimales;
  const r = Math.round(x * p) / p;
  return (Object.is(r, -0) ? 0 : r).toFixed(decimales).replace("-", "−").replace(".", ",");
}

/** « 5,0 rad (286°) » — le degré n'est qu'une aide pour l'œil. */
export const texteAngle = (th: number) => `${nombre(th, 1)} rad (${nombre((th * 180) / Math.PI, 0)}°)`;

/** « 1,50 m » — les distances au pas de 0,10 m, écrites comme la leçon. */
export const texteDistance = (d: number) => `${nombre(d, 2)} m`;
