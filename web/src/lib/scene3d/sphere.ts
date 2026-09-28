/**
 * sphere.ts — la géométrie de la scène « sphère, plan, droite », SANS three.js.
 *
 * Tout ce que la scène AFFICHE en nombres vient d'ici, et ne dépend d'aucun
 * rendu (sans WebGL, les lectures restent vraies). Le rendu
 * (`sphere-plan.ts`) lit les MÊMES fonctions.
 *
 * LES DONNÉES SONT CELLES DE LA LEÇON, pas d'un exemple inventé :
 * `content/maths/geometrie-espace/lesson.md`, R9, exemple travaillé — « la
 * sphère de centre S(0,0,2) et de rayon R = 3 ; coupe-t-elle le plan (ABC)
 * d'équation z = 0 ? » → d = 2 < 3, cercle de rayon √5. La scène fait glisser
 * ce plan : (P) : z = k, d(S,(P)) = |k − 2|. En mode droite, (D) est la
 * parallèle à (Ox) passant par (0,0,k) — elle est DANS le plan (P), à la même
 * distance de S : c'est ce qui permet de comparer, à distance égale, ce que
 * donnent un plan et une droite (« c'est la dimension de l'objet qui coupe
 * qui décide de la forme du résultat », R9).
 *
 * Les curseurs avancent par pas de 0,1 : d et R sont des multiples de 0,1,
 * et la comparaison d = R se fait sur les dixièmes (entiers), jamais sur des
 * flottants — le cas tangent est exactement atteignable, et la case « d = R »
 * ne peut jamais clignoter sur un arrondi.
 */

export const CENTRE = { x: 0, y: 0, z: 2 } as const;
export const PAS = 0.1;

export type Objet = "plan" | "droite";

export interface EtatSphere {
  objet: Objet;
  /** cote du plan (P) : z = k — ou de la droite (D) : y = 0, z = k */
  k: number;
  /** rayon de la sphère */
  R: number;
}

export type Cas = "vide" | "tangent" | "secant";

const dixiemes = (x: number) => Math.round(x / PAS);

/** d(S, (P)) = |k − 2| / √(0² + 0² + 1²) — la formule du chapitre 9, ici sans racine. */
export function distance(e: EtatSphere): number {
  return dixiemes(Math.abs(e.k - CENTRE.z)) * PAS;
}

export function cas(e: EtatSphere): Cas {
  const d = dixiemes(Math.abs(e.k - CENTRE.z));
  const R = dixiemes(e.R);
  return d > R ? "vide" : d === R ? "tangent" : "secant";
}

/** HM = √(R² − d²) : le rayon du cercle (plan), ou la demi-corde (droite). */
export function hm(e: EtatSphere): number {
  const d = distance(e);
  return cas(e) === "secant" ? Math.sqrt(e.R * e.R - d * d) : 0;
}

/** R² − d², sur les dixièmes pour que 9 − 4 donne 5 et non 4,999999. */
export function radicande(e: EtatSphere): number {
  const d = dixiemes(Math.abs(e.k - CENTRE.z));
  const R = dixiemes(e.R);
  return (R * R - d * d) / 100;
}

// ── Mise en forme française ────────────────────────────────────────────────

const U = " ";
const fr = (n: number, dec: number) =>
  new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: dec }).format(n);

/** Un nombre au plus à deux décimales, sans zéros inutiles : « 1,5 », « 2 ». */
export function nombre(x: number): string {
  return fr(Math.round(x * 100) / 100, 2);
}

/** « ≈ 2,24 » — toujours deux décimales pour une valeur approchée. */
export function approche(x: number): string {
  return `≈${U}${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(x)}`;
}

/** La cote affichée dans une équation, signe compris : « 0,5 », « −1 ». */
export function cote(k: number): string {
  const v = Math.round(k * 10) / 10;
  return v < 0 ? `−${fr(-v, 1)}` : fr(v, 1);
}

/** Une racine exacte quand elle tombe juste, sinon √(radicande) ≈ décimale. */
export function racine(x: number): { exacte: string | null; latex: string; approx: string } {
  const r = Math.sqrt(x);
  const entiere = Math.abs(r - Math.round(r)) < 1e-9;
  const rad = fr(Math.round(x * 100) / 100, 2);
  return {
    exacte: entiere ? fr(Math.round(r), 0) : null,
    latex: entiere ? fr(Math.round(r), 0) : `\\sqrt{${rad.replace(",", "{,}")}}`,
    approx: approche(r),
  };
}
