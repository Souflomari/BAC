/**
 * lorentz.ts — la physique de la scène « une particule chargée dans un champ
 * magnétique uniforme » (pc/chute-mouvements-plans, R6 ; ADR 0041).
 *
 * Aucune dépendance three.js : le panneau en tire ses lectures et il est chargé
 * avec la leçon ; le rendu, lui, n'est importé qu'au clic.
 *
 * LES CONSTANTES SONT CELLES DE LA LEÇON (exemple travaillé du chapitre) :
 * |q| = 1,6 × 10⁻¹⁹ C, m = 9,1 × 10⁻³¹ kg. L'électron et le positon (β⁺, vu au
 * chapitre des désintégrations) ont la même masse et des charges opposées :
 * même cercle, sens contraires.
 *
 * UNITÉS DE LA SCÈNE : le centimètre et la nanoseconde. v₀ se règle en
 * 10⁷ m/s — et 10⁷ m/s, c'est EXACTEMENT 1 cm/ns : la vitesse lue est celle
 * qui déplace la particule à l'écran, sans conversion cachée.
 *
 * REPÈRE (celui de la figure du manuel) : x le long de v₀ à l'entrée, y dans
 * le plan du mouvement, z perpendiculaire à ce plan, vers l'observateur de la
 * figure (⊙ = +z, ⊗ = −z). Avec x̂ ∧ ẑ = −ŷ :
 *     v₀ ∧ B = −b_z v₀ B ŷ   et   F = q v ∧ B.
 * Le côté vers lequel la trajectoire s'infléchit à l'entrée :
 *     σ = signe(F_y) = −signe(q) × b_z     (+1 : vers +y, le haut de la figure).
 */

export const CHARGE_ELEMENTAIRE = 1.6e-19; // C
export const MASSE_ELECTRON = 9.1e-31; // kg

/** Largeur du couloir de champ : celle de l'exemple travaillé (2,0 cm). */
export const LARGEUR_COULOIR = 2.0;
/** En mode « couloir », la particule part 3 cm avant la face d'entrée. */
export const DEPART_X = -3;

export const PAS = 0.1;
export const B_MIN = 0.5; // mT
/**
 * 3,0 mT au plus : la flèche F (longueur ∝ F) doit rester DANS le cercle
 * qu'elle courbe. Or longueur(F) / R ∝ B² — à 5 mT elle traversait le centre
 * et ressortait de l'autre côté (vu en regardant la scène, §11.190).
 */
export const B_MAX = 3.0;
export const V_MIN = 0.5; // ×10⁷ m/s
export const V_MAX = 2.0;

/** Le cadre de la scène, en cm : ce que la caméra montre, et où une course s'arrête. */
export const CADRE = { xMin: -4.5, xMax: 7.5, yMin: -6.5, yMax: 6.5 } as const;

/**
 * Une course s'arrête quand la particule, sortie du champ, arrive à cette
 * distance (cm) du bord du cadre : sa flèche v, posée au point final, doit
 * rester DANS l'image (vu à l'écran : elle sortait du canvas).
 */
export const MARGE_COURSE = 2.2;

/** Le ralenti : 3 ns de vol par seconde d'écran (un facteur ≈ 3 × 10⁸). */
export const NS_PAR_SECONDE = 3;

export type Particule = "electron" | "positon";
export type SensChamp = "entrant" | "sortant";
export type Region = "couloir" | "partout";

export interface EtatLorentz {
  particule: Particule;
  /** norme du champ, en mT (grille de 0,1) */
  B: number;
  sens: SensChamp;
  /** vitesse d'entrée, en 10⁷ m/s = cm/ns (grille de 0,1) */
  v0: number;
  region: Region;
  /** un cercle de référence en pointillé — le champ (mT) qui le trace — ou rien */
  traceB: number | null;
  /** ns écoulées depuis le départ de la course */
  t: number;
}

export const signeCharge = (p: Particule) => (p === "electron" ? -1 : 1);
export const composanteChamp = (s: SensChamp) => (s === "sortant" ? 1 : -1);

/** +1 : la trajectoire s'infléchit vers +y (le haut de la figure) ; −1 : vers −y. */
export function cote(e: Pick<EtatLorentz, "particule" | "sens">): 1 | -1 {
  return -signeCharge(e.particule) * composanteChamp(e.sens) > 0 ? 1 : -1;
}

/** Le sens de v₀ ∧ B, le long de y : ce que donne la main droite, AVANT le signe de q. */
export function coteProduit(sens: SensChamp): 1 | -1 {
  return -composanteChamp(sens) > 0 ? 1 : -1;
}

/** R = m v₀ / (|q| B), en cm. */
export function rayon(e: Pick<EtatLorentz, "B" | "v0">): number {
  return ((MASSE_ELECTRON * e.v0 * 1e7) / (CHARGE_ELEMENTAIRE * e.B * 1e-3)) * 100;
}

/** F = |q| v B, en N (v en 10⁷ m/s). */
export function force(B: number, v: number): number {
  return CHARGE_ELEMENTAIRE * v * 1e7 * B * 1e-3;
}

/** Période du mouvement circulaire, en ns : 2πR / v₀ = 2πm / (|q|B), indépendante de v₀. */
export function periode(e: Pick<EtatLorentz, "B" | "v0">): number {
  return (2 * Math.PI * rayon(e)) / e.v0;
}

export type Sortie = { type: "traverse"; theta: number } | { type: "demi-tour" } | { type: "aucune" };

/**
 * Par où la particule quitte le couloir. R > ℓ : elle le traverse, déviée de
 * θ avec sin θ = ℓ / R (la relation de la leçon). R ≤ ℓ : l'arc se referme
 * avant la face de sortie — demi-tour, sortie par la face d'ENTRÉE, 2R plus
 * loin. (R = ℓ exactement n'est atteint par aucun couple de la grille : le
 * rapport v₀/B vaudrait 32/91.) Champ partout : elle ne sort jamais.
 */
export function sortie(e: Pick<EtatLorentz, "B" | "v0" | "region">): Sortie {
  if (e.region === "partout") return { type: "aucune" };
  const R = rayon(e);
  return R > LARGEUR_COULOIR ? { type: "traverse", theta: Math.asin(LARGEUR_COULOIR / R) } : { type: "demi-tour" };
}

export interface Point {
  x: number;
  y: number;
  /** la vitesse, en 10⁷ m/s */
  vx: number;
  vy: number;
  phase: "avant" | "champ" | "apres";
}

/** Instant (ns) où la particule entre dans le champ. Champ partout : elle y part. */
export function instantEntree(e: Pick<EtatLorentz, "v0" | "region">): number {
  return e.region === "partout" ? 0 : -DEPART_X / e.v0;
}

/** L'angle balayé sur le cercle à la sortie (rad) ; Infinity si le champ est partout. */
function angleSortie(e: EtatLorentz): number {
  const s = sortie(e);
  return s.type === "traverse" ? s.theta : s.type === "demi-tour" ? Math.PI : Infinity;
}

/**
 * La particule à l'instant t (ns). Sur le cercle de centre C = (0, σR), à
 * l'angle balayé φ = ω (t − t₀), ω = v₀ / R :
 *     P(φ) = (R sin φ, σR (1 − cos φ)),   v(φ) = v₀ (cos φ, σ sin φ).
 * Hors du champ : une droite, à la vitesse de sortie.
 */
export function point(e: EtatLorentz, t: number): Point {
  const v = e.v0;
  const t0 = instantEntree(e);
  if (e.region === "couloir" && t <= t0) return { x: DEPART_X + v * t, y: 0, vx: v, vy: 0, phase: "avant" };
  const R = rayon(e);
  const s = cote(e);
  const w = v / R;
  const phiS = angleSortie(e);
  const phi = w * (t - t0);
  if (phi <= phiS) {
    return { x: R * Math.sin(phi), y: s * R * (1 - Math.cos(phi)), vx: v * Math.cos(phi), vy: s * v * Math.sin(phi), phase: "champ" };
  }
  const xs = R * Math.sin(phiS);
  const ys = s * R * (1 - Math.cos(phiS));
  const ux = Math.cos(phiS);
  const uy = s * Math.sin(phiS);
  const dt = t - t0 - phiS / w;
  return { x: xs + ux * v * dt, y: ys + uy * v * dt, vx: v * ux, vy: v * uy, phase: "apres" };
}

function distanceAuCadre(x: number, y: number, ux: number, uy: number): number {
  const m = MARGE_COURSE;
  let d = Infinity;
  if (ux > 1e-9) d = Math.min(d, (CADRE.xMax - m - x) / ux);
  if (ux < -1e-9) d = Math.min(d, (CADRE.xMin + m - x) / ux);
  if (uy > 1e-9) d = Math.min(d, (CADRE.yMax - m - y) / uy);
  if (uy < -1e-9) d = Math.min(d, (CADRE.yMin + m - y) / uy);
  return Number.isFinite(d) ? Math.max(0, d) : 0;
}

/**
 * La fin d'une COURSE (ns) — une pression sur « Lancer ». Champ partout : un
 * tour complet, la particule revient à son point de départ. Couloir : la
 * particule sort du champ, puis file en ligne droite jusqu'à MARGE_COURSE du
 * bord du cadre.
 */
export function finCourse(e: EtatLorentz): number {
  if (e.region === "partout") return periode(e);
  const phiS = angleSortie(e);
  const tS = instantEntree(e) + phiS / (e.v0 / rayon(e));
  const p = point(e, tS);
  return tS + distanceAuCadre(p.x, p.y, p.vx / e.v0, p.vy / e.v0) / e.v0;
}

/** La trajectoire parcourue de 0 à t : une liste de points (x, y), en cm. */
export function trajet(e: EtatLorentz, t: number): [number, number][] {
  const out: [number, number][] = [];
  const t0 = instantEntree(e);
  if (e.region === "couloir") {
    out.push([DEPART_X, 0]);
    if (t <= t0) {
      const p = point(e, t);
      out.push([p.x, p.y]);
      return out;
    }
  }
  const R = rayon(e);
  const s = cote(e);
  const w = e.v0 / R;
  const phiS = angleSortie(e);
  const phiT = Math.min(w * (t - t0), phiS);
  // Un point tous les 2° : l'arc reste lisse même sur un grand cercle vu de près.
  const n = Math.max(1, Math.ceil(phiT / (Math.PI / 90)));
  for (let k = 0; k <= n; k++) {
    const phi = (phiT * k) / n;
    out.push([R * Math.sin(phi), s * R * (1 - Math.cos(phi))]);
  }
  const p = point(e, t);
  if (p.phase === "apres") out.push([p.x, p.y]);
  return out;
}

// ── Lectures ─────────────────────────────────────────────────────────────

/** Norme de la vitesse, LUE sur le vecteur vitesse du point courant (10⁷ m/s). */
export const normeVitesse = (p: Point) => Math.hypot(p.vx, p.vy);

/** Norme de la force au point courant (N) : nulle hors du champ. */
export function normeForce(e: EtatLorentz, p: Point): number {
  return p.phase === "champ" ? force(e.B, normeVitesse(p)) : 0;
}

/**
 * Angle entre F et v au point courant, en degrés, CALCULÉ sur les vecteurs :
 * F est dirigée vers le centre C = (0, σR). Rien n'est posé à 90° d'office —
 * c'est le produit scalaire qui le dit.
 */
export function angleForceVitesse(e: EtatLorentz, p: Point): number | null {
  if (p.phase !== "champ") return null;
  const R = rayon(e);
  const fx = 0 - p.x;
  const fy = cote(e) * R - p.y;
  const nf = Math.hypot(fx, fy);
  const nv = normeVitesse(p);
  if (nf < 1e-12 || nv < 1e-12) return null;
  const c = Math.max(-1, Math.min(1, (fx * p.vx + fy * p.vy) / (nf * nv)));
  return (Math.acos(c) * 180) / Math.PI;
}

// ── Écriture française des nombres ───────────────────────────────────────

export function nombre(x: number, decimales: number): string {
  return x.toFixed(decimales).replace("-", "−").replace(".", ",");
}

const EXPOSANTS: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const exposant = (n: number) => String(n).split("").map((c) => EXPOSANTS[c] ?? c).join("");

/** 3,2 × 10⁻¹⁵ : deux chiffres significatifs. */
export function scientifique(x: number): string {
  if (x === 0) return "0";
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = Math.round((x / 10 ** e) * 10) / 10;
  if (m >= 10) {
    m /= 10;
    e += 1;
  }
  return `${nombre(m, 1)} × 10${exposant(e)}`;
}

/** Le rayon à deux chiffres significatifs, comme dans la leçon (« ≈ 5,7 cm »). */
export function formatRayon(R: number): string {
  return `≈ ${nombre(R, R < 1 ? 2 : R < 10 ? 1 : 0)} cm`;
}
export const formatVitesse = (v: number) => `${nombre(v, 1)} × 10⁷ m/s`;
export const formatForce = (F: number) => (F === 0 ? "0 N" : `${scientifique(F)} N`);
export const formatChamp = (B: number) => `${nombre(B, 1)} mT`;
export const formatDegres = (rad: number) => `≈ ${nombre((rad * 180) / Math.PI, 0)}°`;
