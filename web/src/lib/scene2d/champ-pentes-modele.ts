/**
 * champ-pentes-modele.ts — le modèle EXACT de « ce que l'équation dit en chaque point »
 * (Maths · equations-differentielles, R2 ; spec
 * docs/pipeline/propositions/maths-equations-differentielles-scene-pentes.md §5).
 *
 * UNE équation, y′ = a·y + b, et ce qu'elle impose en chaque point du plan : une pente
 * a·y₀ + b qui ne dépend QUE de la hauteur (§7.2), une hauteur où elle s'annule, −b/a (§7.3),
 * et, par chaque point, une seule courbe qui suit ces pentes (§7.4, §7.5).
 *
 * EXACT, OU RIEN (§5.4). Les crans sont choisis pour que toute lecture soit un entier ou un
 * demi-entier : a ∈ {−1 ; −½ ; ½}, b ∈ {−2 ; 0 ; 1 ; 2}, y₀ entier. Les nombres ÉCRITS passent
 * donc par des rationnels de dénominateur 1 ou 2 (`Q`), jamais par un flottant ; les flottants
 * ne servent qu'à DESSINER (la courbe, qui est une exponentielle, n'est jamais écrite — §9.1).
 *
 * LE PALIER, PAR DEUX ROUTES (§11.1 N2) : −b/a (la formule) et la racine de 0 = a·k + b cherchée
 * parmi les demi-entiers de la fenêtre (la définition). Les deux doivent donner le même rationnel ;
 * `palier` lève une erreur sinon — une scène qui écrirait une hauteur que sa propre équation
 * dément ne doit pas s'afficher.
 */

/** La fenêtre de données : un CARRÉ de 12 × 12, qui ne change jamais (§5.1). */
export const FENETRE = { x: [-8, 4], y: [-6, 6] } as const;

export const COEFS = ["-1", "-0.5", "0.5"] as const;
export const TERMES = ["-2", "0", "1", "2"] as const;
export const POINTS = ["origine", "decale", "haut", "bas", "sur"] as const;
export const CHAMPS = ["aucun", "un-point", "ligne", "plan"] as const;
export const FAMILLES = ["aucune", "une", "trois"] as const;

export type Coef = (typeof COEFS)[number];
export type Terme = (typeof TERMES)[number];
export type Point = (typeof POINTS)[number];
export type Champ = (typeof CHAMPS)[number];
export type Famille = (typeof FAMILLES)[number];

/** Les cinq points, par leurs COORDONNÉES — les ids ne sont jamais rendus (§5.2 C). */
export const POINT_XY: Record<Point, readonly [number, number]> = {
  origine: [0, 3],
  decale: [2, 3],
  haut: [0, 5],
  bas: [0, -3],
  sur: [0, 2],
};
/** Le point FIXE de la comparaison de S2 — sans lettre, nommé par ses coordonnées (§5.6). */
export const POINT_FIXE: readonly [number, number] = [0, 3];
/** Les trois départs de la famille de S5 (§7.5). */
export const DEPARTS: readonly Point[] = ["haut", "sur", "bas"];

// ── Les rationnels de la scène : n/d, d ∈ {1, 2}, réduits ──
export interface Q {
  n: number;
  d: number;
}
const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
export function q(n: number, d = 1): Q {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`rationnel invalide ${n}/${d}`);
  const s = d < 0 ? -1 : 1;
  const g = pgcd(n, d) || 1;
  // `|| 0` : jamais de −0 (−0/½ en est un, et « −0 » ne doit s'écrire nulle part)
  return { n: (s * n) / g || 0, d: (s * d) / g };
}
export const plus = (x: Q, y: Q) => q(x.n * y.d + y.n * x.d, x.d * y.d);
export const fois = (x: Q, y: Q) => q(x.n * y.n, x.d * y.d);
export const moins = (x: Q) => q(-x.n, x.d);
export const inverse = (x: Q) => q(x.d, x.n);
export const egal = (x: Q, y: Q) => x.n === y.n && x.d === y.d;
export const valeur = (x: Q) => x.n / x.d;

export const COEF_Q: Record<Coef, Q> = { "-1": q(-1), "-0.5": q(-1, 2), "0.5": q(1, 2) };
export const TERME_Q: Record<Terme, Q> = { "-2": q(-2), "0": q(0), "1": q(1), "2": q(2) };

/** La pente que l'équation impose en un point de hauteur y₀ : a·y₀ + b — l'abscisse n'y paraît pas (§7.2). */
export function pente(a: Coef, b: Terme, y0: number): Q {
  return plus(fois(COEF_Q[a], q(y0)), TERME_Q[b]);
}

/** La hauteur où la pente s'annule, par la formule −b/a et par la définition 0 = a·k + b (§11.1 N2). */
export function palier(a: Coef, b: Terme): Q {
  const formule = fois(moins(TERME_Q[b]), inverse(COEF_Q[a]));
  // la définition : le demi-entier k de la fenêtre élargie où a·k + b s'annule
  let racine: Q | null = null;
  for (let m = -40; m <= 40; m++) {
    const k = q(m, 2);
    if (plus(fois(COEF_Q[a], k), TERME_Q[b]).n === 0) racine = racine ?? k;
  }
  if (!racine || !egal(racine, formule)) throw new Error(`palier : les deux routes divergent pour a=${a}, b=${b}`);
  return formule;
}

/** L'écart de P au palier : y₀ − (−b/a). La pente vaut a × cet écart (§5.6, §7.4). */
export function ecartAuPalier(a: Coef, b: Terme, y0: number): Q {
  return plus(q(y0), moins(palier(a, b)));
}

/**
 * La courbe qui passe par (x₀ ; y₀), en flottants — pour le DESSIN seulement : y(x) = k + (y₀ − k)·e^{a(x − x₀)}.
 * Elle n'est jamais écrite (§9.1) ; la porte la refait de son côté (§11.1 N7).
 */
export function courbe(a: Coef, b: Terme, x0: number, y0: number): (x: number) => number {
  const k = valeur(palier(a, b));
  const aa = valeur(COEF_Q[a]);
  return (x) => k + (y0 - k) * Math.exp(aa * (x - x0));
}

// ── L'écriture : EXACTE (§5.4) ──
/** Un rationnel en TeX : entier, ou fraction pleine (une RÉPONSE se lit en \dfrac, leçon de la scène sœur). */
export function texQ(x: Q): string {
  if (x.d === 1) return `${x.n}`;
  return `${x.n < 0 ? "-" : ""}\\dfrac{${Math.abs(x.n)}}{${x.d}}`;
}
/** Un rationnel dit en clair (lecteur d'écran, région vivante) : « −7/2 », « 3 ». */
export function clairQ(x: Q): string {
  const t = x.d === 1 ? `${Math.abs(x.n)}` : `${Math.abs(x.n)}/${x.d}`;
  return x.n < 0 ? `−${t}` : t;
}
/** Le coefficient sur le badge et ses crans : décimal, comme la leçon écrit y′ = −0,5 y (§5.4). */
export const TEX_COEF: Record<Coef, string> = { "-1": "-1", "-0.5": "-0{,}5", "0.5": "0{,}5" };
export const CLAIR_COEF: Record<Coef, string> = { "-1": "−1", "-0.5": "−0,5", "0.5": "0,5" };

/** L'équation, avec ses valeurs : y′ = −y, y′ = −0,5 y + 2, y′ = 0,5 y − 2… */
export function texEquation(a: Coef, b: Terme): string {
  const ay = a === "-1" ? "-y" : `${TEX_COEF[a]}\\,y`;
  const bb = b === "0" ? "" : b.startsWith("-") ? ` - ${b.slice(1)}` : ` + ${b}`;
  return `y' = ${ay}${bb}`;
}
export function clairEquation(a: Coef, b: Terme): string {
  const ay = a === "-1" ? "−y" : `${CLAIR_COEF[a]} y`;
  const bb = b === "0" ? "" : b.startsWith("-") ? ` − ${b.slice(1)}` : ` + ${b}`;
  return `y′ = ${ay}${bb}`;
}

/** Les coordonnées d'un point, en TeX et en clair : (0 ; 3), (0 ; −3). */
export function texPoint(p: readonly [number, number]): string {
  return `(${p[0]}\\,;${p[1]})`;
}
export function clairPoint(p: readonly [number, number]): string {
  const n = (v: number) => (v < 0 ? `−${-v}` : `${v}`);
  return `(${n(p[0])} ; ${n(p[1])})`;
}
