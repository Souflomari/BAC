/**
 * plan-complexe-modele.ts — le modèle EXACT du « plan complexe » (Maths ·
 * nombres-complexes-2, tête de R5 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md §5).
 *
 * EXACT, OU RIEN (§5.4). Aucune lecture de cette scène n'affiche un décimal :
 * les affixes sont des combinaisons rationnelles de 1, i et √3 ; les modules
 * des radicaux de rationnels ; les arguments des multiples de π/12. D'où un
 * petit type — un complexe dont les deux parties vivent dans ℚ(√3) — et pas
 * des flottants. Les flottants ne servent qu'à DESSINER, et à reconnaître un
 * argument (un atan2 qui tombe à 10⁻⁹ près sur un multiple de π/12 ; sinon,
 * l'argument n'est pas exact et la scène ne l'écrit pas).
 *
 * UNE SEULE ÉCRITURE DES TRANSFORMATIONS : z' = a·z + b. En mode `coefficient`
 * (S1–S4), a = c et b = ω(1 − c), avec ω le centre posé ; en mode `enonce`
 * (S5), a et b viennent de la formule donnée, et ω = b / (1 − a) se CHERCHE.
 * z' se calcule toujours depuis a ET b — jamais depuis a et ω (§5.3 E : c'est
 * l'oubli de la constante, et l'auteur de la spec l'avait commis).
 */

// ── ℚ ────────────────────────────────────────────────────────────────────────
export interface Q {
  n: number;
  d: number;
}
const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));
export function q(n: number, d = 1): Q {
  if (d === 0) throw new Error("dénominateur nul");
  const s = d < 0 ? -1 : 1;
  const g = pgcd(n, d) || 1;
  const nn = (s * n) / g;
  return { n: nn === 0 ? 0 : nn, d: Math.abs(d) / g };
}
const qAdd = (a: Q, b: Q) => q(a.n * b.d + b.n * a.d, a.d * b.d);
const qSub = (a: Q, b: Q) => q(a.n * b.d - b.n * a.d, a.d * b.d);
const qMul = (a: Q, b: Q) => q(a.n * b.n, a.d * b.d);
const qDiv = (a: Q, b: Q) => q(a.n * b.d, a.d * b.n);
const qNul = (a: Q) => a.n === 0;
const qF = (a: Q) => a.n / a.d;

// ── ℚ(√3) : r + s√3 ──────────────────────────────────────────────────────────
export interface R3 {
  r: Q;
  s: Q;
}
const r3 = (r: Q, s: Q = q(0)): R3 => ({ r, s });
const rAdd = (a: R3, b: R3) => r3(qAdd(a.r, b.r), qAdd(a.s, b.s));
const rSub = (a: R3, b: R3) => r3(qSub(a.r, b.r), qSub(a.s, b.s));
// (a + b√3)(c + d√3) = (ac + 3bd) + (ad + bc)√3
const rMul = (a: R3, b: R3) => r3(qAdd(qMul(a.r, b.r), qMul(q(3), qMul(a.s, b.s))), qAdd(qMul(a.r, b.s), qMul(a.s, b.r)));
const rNeg = (a: R3) => r3(qSub(q(0), a.r), qSub(q(0), a.s));
const rNul = (a: R3) => qNul(a.r) && qNul(a.s);
/** 1 / (a + b√3) = (a − b√3) / (a² − 3b²) */
function rInv(a: R3): R3 {
  const den = qSub(qMul(a.r, a.r), qMul(q(3), qMul(a.s, a.s)));
  if (qNul(den)) throw new Error("division par zéro dans ℚ(√3)");
  return r3(qDiv(a.r, den), qDiv(qSub(q(0), a.s), den));
}
const rF = (a: R3) => qF(a.r) + qF(a.s) * Math.sqrt(3);

// ── ℚ(√3)[i] ─────────────────────────────────────────────────────────────────
export interface C {
  re: R3;
  im: R3;
}
const cx = (re: R3, im: R3 = r3(q(0))): C => ({ re, im });
/** un complexe à parties RATIONNELLES : (a/ad) + (b/bd) i */
export const cq = (a: number, b = 0, ad = 1, bd = 1): C => cx(r3(q(a, ad)), r3(q(b, bd)));
export const add = (u: C, v: C) => cx(rAdd(u.re, v.re), rAdd(u.im, v.im));
export const sub = (u: C, v: C) => cx(rSub(u.re, v.re), rSub(u.im, v.im));
export const mul = (u: C, v: C) => cx(rSub(rMul(u.re, v.re), rMul(u.im, v.im)), rAdd(rMul(u.re, v.im), rMul(u.im, v.re)));
export const estNul = (u: C) => rNul(u.re) && rNul(u.im);
export const egal = (u: C, v: C) => estNul(sub(u, v));
/** u / v = u · conj(v) / |v|² */
export function div(u: C, v: C): C {
  const n2 = rAdd(rMul(v.re, v.re), rMul(v.im, v.im));
  const inv = rInv(n2);
  const p = mul(u, cx(v.re, rNeg(v.im)));
  return cx(rMul(p.re, inv), rMul(p.im, inv));
}
/** les coordonnées à DESSINER (et seulement à dessiner) */
export const enFlottants = (u: C): [number, number] => [rF(u.re), rF(u.im)];

// ── Les crans (§5.2) ─────────────────────────────────────────────────────────
export const COEFFICIENTS = ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"] as const;
export type Coefficient = (typeof COEFFICIENTS)[number];
export const POINTS = ["1+i", "2i", "2", "4", "1-i"] as const;
export type Point = (typeof POINTS)[number];
export const CENTRES = ["O", "A"] as const;
export type Centre = (typeof CENTRES)[number];
export const ENONCES = ["coefficient", "rotation-A", "homothetie-A", "les-deux"] as const;
export type Enonce = (typeof ENONCES)[number];

/** La fenêtre de données : [−9 ; 9]², un CARRÉ, qui ne change jamais (§5.1). */
export const FENETRE = 9;

const VAL_C: Record<Coefficient, C> = {
  "2": cq(2),
  "0.5": cq(1, 0, 2),
  i: cq(0, 1),
  "-2": cq(-2),
  "1+i": cq(1, 1),
  "2i": cq(0, 2),
  "sqrt3+i": cx(r3(q(0), q(1)), r3(q(1))),
};
const VAL_Z: Record<Point, C> = {
  "1+i": cq(1, 1),
  "2i": cq(0, 2),
  "2": cq(2),
  "4": cq(4),
  "1-i": cq(1, -1),
};
const VAL_CENTRE: Record<Centre, C> = { O: cq(0), A: cq(2) };
/** Les trois formules données de S5 (§5.2 D) : z' = a z + b */
const FORMULES: Record<Exclude<Enonce, "coefficient">, { a: C; b: C }> = {
  "rotation-A": { a: cq(0, 1), b: cq(2, -2) },
  "homothetie-A": { a: cq(2), b: cq(-2) },
  "les-deux": { a: cq(1, 1), b: cq(1, -1) },
};

export const coefficient = (c: Coefficient) => VAL_C[c];
export const point = (z: Point) => VAL_Z[z];
export const centre = (o: Centre) => VAL_CENTRE[o];

export interface Transformation {
  a: C;
  b: C;
  /** le point fixe — le centre */
  omega: C;
  /** le centre est-il DONNÉ (mode coefficient) ou CHERCHÉ (mode enonce) ? */
  donne: boolean;
}

export function transformation(e: { c: Coefficient; centre: Centre; enonce: Enonce }): Transformation {
  if (e.enonce === "coefficient") {
    const a = VAL_C[e.c];
    const omega = VAL_CENTRE[e.centre];
    return { a, b: mul(omega, sub(cq(1), a)), omega, donne: true };
  }
  const { a, b } = FORMULES[e.enonce];
  // le centre est le point qui ne bouge pas : ω = aω + b, donc ω = b / (1 − a)
  return { a, b, omega: div(b, sub(cq(1), a)), donne: false };
}

/** z' = a z + b — depuis a ET b, jamais depuis a et ω */
export const image = (t: Transformation, z: C) => add(mul(t.a, z), t.b);

// ── Modules : √(p/q) = k√m / d, m sans facteur carré ─────────────────────────
export interface Radical {
  k: number;
  m: number;
  d: number;
}
/** |u|², RATIONNEL sur toute la grille — sinon ce n'est pas un état de la scène */
export function moduleCarre(u: C): Q {
  const n = rAdd(rMul(u.re, u.re), rMul(u.im, u.im));
  if (!qNul(n.s)) throw new Error("module au carré non rationnel : hors de la grille");
  return n.r;
}
export function racine(x: Q): Radical {
  if (x.n < 0) throw new Error("racine d'un négatif");
  if (x.n === 0) return { k: 0, m: 1, d: 1 };
  // √(n/d) = √(n·d) / d
  let reste = x.n * x.d;
  let k = 1;
  for (let f = 2; f * f <= reste; f++)
    while (reste % (f * f) === 0) {
      reste /= f * f;
      k *= f;
    }
  const g = pgcd(k, x.d) || 1;
  return { k: k / g, m: reste, d: x.d / g };
}
export const moduleDe = (u: C) => racine(moduleCarre(u));
export const radicalF = (r: Radical) => (r.k * Math.sqrt(r.m)) / r.d;
/** le RAPPORT ΩM'/ΩM, un quotient de deux longueurs ; null au point fixe (0/0 ne s'écrit pas) */
export function rapport(t: Transformation, z: C): Radical | null {
  const u = sub(z, t.omega);
  if (estNul(u)) return null;
  return racine(qDiv(moduleCarre(sub(image(t, z), t.omega)), moduleCarre(u)));
}
/** (z' − ω)/(z − ω) — c'est a, à tout point non fixe : la définition du centre, retournée */
export function quotient(t: Transformation, z: C): C | null {
  const u = sub(z, t.omega);
  return estNul(u) ? null : div(sub(image(t, z), t.omega), u);
}

// ── Arguments : k·π/12, k dans ]−12 ; 12] ─────────────────────────────────────
const DOUZIEME = Math.PI / 12;
/** ramène un nombre de douzièmes de π dans ]−12 ; 12] — la borne −π s'écrit +π (§5.4) */
export const reduire = (k: number) => {
  const r = ((k % 24) + 24) % 24;
  return r > 12 ? r - 24 : r;
};
function douziemes(x: number): number | null {
  const k = Math.round(x / DOUZIEME);
  return Math.abs(x - k * DOUZIEME) < 1e-9 ? k : null;
}
/** arg(u) en douzièmes de π, ou null si u = 0 ou si l'argument n'est pas un multiple de π/12 */
export function argument(u: C): number | null {
  if (estNul(u)) return null;
  const [x, y] = enFlottants(u);
  const k = douziemes(Math.atan2(y === 0 ? 0 : y, x));
  return k === null ? null : reduire(k);
}
/**
 * L'angle de la transformation, lu comme un ÉCART : arg(z' − ω) − arg(z − ω),
 * puis ramené dans ]−π ; π] (§5.4 — la grille déclenche la borne : c = −2,
 * z = 1 + i donne un écart brut de −π, et la scène écrit +π). null au point
 * fixe : l'écart de deux directions dont l'une n'existe pas n'existe pas.
 */
export function ecart(t: Transformation, z: C): number | null {
  const u = sub(z, t.omega);
  if (estNul(u)) return null;
  const [ux, uy] = enFlottants(u);
  const [vx, vy] = enFlottants(sub(image(t, z), t.omega));
  const k = douziemes(Math.atan2(vy === 0 ? 0 : vy, vx) - Math.atan2(uy === 0 ? 0 : uy, ux));
  return k === null ? null : reduire(k);
}

// ── Les nombres, écrits (TeX, pour KaTeX) ────────────────────────────────────
const MOINS = "-";
function texQ(x: Q): string {
  const a = Math.abs(x.n);
  const corps = x.d === 1 ? `${a}` : `\\tfrac{${a}}{${x.d}}`;
  return x.n < 0 ? `${MOINS}${corps}` : corps;
}
/** un coefficient devant un symbole (√3, i) : 1 s'efface, −1 devient − */
function texCoef(x: Q, symbole: string, espace = false): string {
  if (x.n === 1 && x.d === 1) return symbole;
  if (x.n === -1 && x.d === 1) return `${MOINS}${symbole}`;
  return `${texQ(x)}${espace ? "\\," : ""}${symbole}`;
}
/** r + s√3, le terme POSITIF en tête (√3 − 1, 1 − √3) ; deux positifs : √3 en tête (§5.3 A) */
function texR3(x: R3): { tex: string; composite: boolean; negatif: boolean } {
  const R = !qNul(x.r), S = !qNul(x.s);
  if (!R && !S) return { tex: "0", composite: false, negatif: false };
  if (!S) return { tex: texQ(x.r), composite: false, negatif: x.r.n < 0 };
  const rac = texCoef(x.s, "\\sqrt{3}");
  if (!R) return { tex: rac, composite: false, negatif: x.s.n < 0 };
  const signe = (v: Q) => (v.n < 0 ? `${MOINS}${texQ(q(-v.n, v.d))}` : `+${texQ(v)}`);
  if (x.s.n < 0 && x.r.n > 0) return { tex: `${texQ(x.r)}${MOINS}${texCoef(q(-x.s.n, x.s.d), "\\sqrt{3}")}`, composite: true, negatif: false };
  return { tex: `${rac}${signe(x.r)}`, composite: true, negatif: false };
}
/** un affixe, écrit comme au §5.3 : 2+2i · \tfrac{1}{2}-\tfrac{1}{2}i · (\sqrt{3}-1)+(\sqrt{3}+1)i · -2+2\sqrt{3}\,i */
export function texComplexe(u: C): string {
  const re = texR3(u.re);
  const reNul = rNul(u.re), imNul = rNul(u.im);
  if (imNul) return re.tex;
  let im: string;
  let imNeg = false;
  if (qNul(u.im.s)) {
    im = texCoef(u.im.r, "i", !(u.im.r.d === 1));
    imNeg = u.im.r.n < 0;
  } else if (qNul(u.im.r)) {
    im = `${texCoef(u.im.s, "\\sqrt{3}")}\\,i`;
    imNeg = u.im.s.n < 0;
  } else im = `(${texR3(u.im).tex})i`;
  if (reNul) return im;
  const tete = re.composite ? `(${re.tex})` : re.tex;
  return imNeg ? `${tete}${im}` : `${tete}+${im}`;
}
export function texRadical(r: Radical): string {
  if (r.m === 1) return texQ(q(r.k, r.d));
  const num = `${r.k === 1 ? "" : r.k}\\sqrt{${r.m}}`;
  return r.d === 1 ? num : `\\tfrac{${num}}{${r.d}}`;
}
/** k·π/12, simplifié : 0 · \pi · \tfrac{\pi}{6} · -\tfrac{\pi}{12} · \tfrac{2\pi}{3} */
export function texAngle(k: number): string {
  if (k === 0) return "0";
  const f = q(k, 12);
  const a = Math.abs(f.n);
  const num = a === 1 ? "\\pi" : `${a}\\pi`;
  const corps = f.d === 1 ? num : `\\tfrac{${num}}{${f.d}}`;
  return f.n < 0 ? `${MOINS}${corps}` : corps;
}

/** un coefficient écrit DEVANT une parenthèse ou un z : 2\,  ·  i\,  ·  (1+i)\,  ·  (\sqrt{3}+i)\, */
function texFacteur(a: C): string {
  const t = texComplexe(a);
  const nu = !/[+]/.test(t.slice(1)) && !/-/.test(t.slice(1));
  return nu ? t : `(${t})`;
}
/** z − ω, écrit : z · z-2 · z-(1+i) */
function texDifference(omega: C): string {
  if (estNul(omega)) return "z";
  const w = texComplexe(omega);
  const simple = !/[+-]/.test(w.slice(1)) && !w.startsWith(MOINS);
  return `z-${simple ? w : `(${w})`}`;
}
/** la forme FACTORISÉE : z' - 2 = i\,(z-2) ; au centre O, z' = i\,z */
export function texFactorisee(t: Transformation): string {
  const f = texFacteur(t.a);
  if (estNul(t.omega)) return `z'=${f}\\,z`;
  const w = texComplexe(t.omega);
  const gauche = !/[+-]/.test(w.slice(1)) && !w.startsWith(MOINS) ? `z'-${w}` : `z'-(${w})`;
  return `${gauche}=${f}\\,(${texDifference(t.omega)})`;
}
/** la forme DÉVELOPPÉE : z' = (1+i)\,z+1-i */
export function texDeveloppee(t: Transformation): string {
  const f = texFacteur(t.a);
  if (estNul(t.b)) return `z'=${f}\\,z`;
  const b = texComplexe(t.b);
  return `z'=${f}\\,z${b.startsWith(MOINS) ? b : `+${b}`}`;
}

/** Les libellés des crans, pour les boutons radio (TeX) */
export const TEX_COEFFICIENT: Record<Coefficient, string> = Object.fromEntries(COEFFICIENTS.map((c) => [c, texComplexe(VAL_C[c])])) as Record<Coefficient, string>;
export const TEX_POINT: Record<Point, string> = Object.fromEntries(POINTS.map((z) => [z, texComplexe(VAL_Z[z])])) as Record<Point, string>;
export const TEX_FORMULE: Record<Exclude<Enonce, "coefficient">, string> = {
  "rotation-A": texDeveloppee(transformation({ c: "2", centre: "O", enonce: "rotation-A" })),
  "homothetie-A": texDeveloppee(transformation({ c: "2", centre: "O", enonce: "homothetie-A" })),
  "les-deux": texDeveloppee(transformation({ c: "2", centre: "O", enonce: "les-deux" })),
};
