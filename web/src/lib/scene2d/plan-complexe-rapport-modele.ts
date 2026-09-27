/**
 * plan-complexe-rapport-modele.ts — le modèle EXACT du « rapport lu depuis un
 * sommet » (Maths · nombres-complexes-2, R6 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-w.md §5).
 *
 * LE FAIT DE LA SCÈNE (§2.2) : w = (z_C − z_A)/(z_B − z_A) se lit DEPUIS un
 * point, et ce point n'est presque jamais l'origine. Le modèle calcule donc
 * toujours des DIFFÉRENCES d'affixes, jamais des affixes nues — la division des
 * affixes (`w-sommet-ignore`, face A) n'existe ici que dans un choix de pari.
 *
 * EXACT, OU RIEN (§5.4). Même corps que la scène sœur (ℚ(√3)[i], importé de
 * `plan-complexe-modele.ts`), une nouveauté : en mode `lieu`, deux modules ne
 * sont pas des radicaux de rationnels — |u| = 2 ± √3 aux deux crans du cercle —,
 * d'où `racineR3`, qui dénoue √(a + b√3) quand c'est possible et refuse sinon.
 *
 * LES LIBELLÉS NE SONT PAS LES IDS (§5.2, correctif B1). Un id de cran est
 * descriptif (`equilateral`, `mediatrice`) parce que le modèle, le test et la
 * porte doivent être lisibles — et c'est une RÉPONSE. Ce que l'élève lit vient
 * des tables `LIBELLE_*` / `TEX_POINT_M` : des ordinaux neutres et des affixes.
 *
 * LE BADGE (§5.2 C, correctif I1) : au sommet A, w = (z_C − z_A)/(z_B − z_A) ; au
 * sommet B, (z_C − z_B)/(z_A − z_B) ; au sommet C, (z_B − z_C)/(z_A − z_C). C'est
 * une règle de GÉNÉRATION du badge, pour qu'il soit déterministe — elle n'est
 * enseignée à personne (le bac écrit l'ordre qui raccourcit le calcul).
 */
import {
  type C, type Q, type R3, type Radical,
  q, qAdd, qSub, qMul, qDiv, qNul, qF, r3, rAdd, rMul, rNul, rF, cx, cq,
  add, sub, mul, div, estNul, egal, enFlottants, racine, radicalF, argument,
  texComplexe, texRadical, texAngle, texQ, texCoef, FENETRE,
} from "./plan-complexe-modele";

export { FENETRE, texAngle, texComplexe, texRadical, enFlottants, argument, egal, estNul, sub, div };
export type { C, Radical };

// ── Les crans (§5.2) ─────────────────────────────────────────────────────────
export const FORMES = ["rect-isocele", "equilateral", "demi-equilateral", "aligne"] as const;
export type Forme = (typeof FORMES)[number];
export const POSITIONS = ["origine", "posee", "tournee", "retournee"] as const;
export type Position = (typeof POSITIONS)[number];
export const SOMMETS = ["A", "B", "C"] as const;
export type Sommet = (typeof SOMMETS)[number];
export const POINTS_M = ["libre", "cercle-1", "cercle-2", "mediatrice", "droite"] as const;
export type PointM = (typeof POINTS_M)[number];
export const MODES = ["triangle", "lieu"] as const;
export type Mode = (typeof MODES)[number];

const RAC3 = r3(q(0), q(1));
/** √3 et ses multiples, en complexes */
const s3 = (k: number, d = 1): C => cx(r3(q(0), q(k, d)));
const is3 = (k: number, d = 1): C => cx(r3(q(0)), r3(q(0), q(k, d)));

/** Une forme : le triangle relatif au sommet A — AB⃗ = 4 toujours, AC⃗ décide de tout (§5.2 A). */
const AB = cq(4);
const AC: Record<Forme, C> = {
  "rect-isocele": cq(0, 4),
  equilateral: add(cq(2), is3(2)),
  "demi-equilateral": add(cq(3), is3(1)),
  aligne: cq(-2),
};
/** Un placement : z_P = t + r·base_P, |r| = 1 (§5.2 B). */
const PLACEMENT: Record<Position, { t: C; r: C }> = {
  origine: { t: cq(0), r: cq(1) },
  posee: { t: cq(-2, 2), r: cq(1) },
  tournee: { t: cq(2, -3), r: cq(0, 1) },
  retournee: { t: cq(4, 4), r: cq(-1) },
};
/** Les cinq positions de M, en mode `lieu` (§5.2 D) — A et B y sont FIXES : −2 et 2. */
const VAL_M: Record<PointM, C> = {
  libre: cq(2, 4),
  "cercle-1": add(s3(1), cq(0, 1)),
  "cercle-2": add(s3(-1), cq(0, 1)),
  mediatrice: is3(2),
  droite: cq(4),
};
export const Z_A_LIEU = cq(-2);
export const Z_B_LIEU = cq(2);
export const pointM = (m: PointM) => VAL_M[m];

// ── Les libellés VISIBLES (§5.2, règle B1) — jamais les ids ──────────────────
export const LIBELLE_POSITION: Record<Position, string> = { origine: "Placement 1", posee: "Placement 2", tournee: "Placement 3", retournee: "Placement 4" };
export const LIBELLE_FORME: Record<Forme, string> = { "rect-isocele": "Triangle 1", equilateral: "Triangle 2", "demi-equilateral": "Triangle 3", aligne: "Triangle 4" };
export const LIBELLE_SOMMET: Record<Sommet, string> = { A: "$A$", B: "$B$", C: "$C$" };
export const TEX_POINT_M: Record<PointM, string> = Object.fromEntries(POINTS_M.map((m) => [m, texComplexe(VAL_M[m])])) as Record<PointM, string>;

// ── Le triangle, placé ───────────────────────────────────────────────────────
export interface Triangle {
  A: C;
  B: C;
  C: C;
}
export function triangle(forme: Forme, position: Position): Triangle {
  const { t, r } = PLACEMENT[position];
  return { A: t, B: add(t, mul(r, AB)), C: add(t, mul(r, AC[forme])) };
}

/**
 * Au sommet choisi, le NUMÉRATEUR et le DÉNOMINATEUR du badge — deux vecteurs issus du
 * sommet. `vers` nomme le point où chacun arrive (la porte lit la flèche épaisse vers lui).
 */
export interface Lecture {
  sommet: Sommet;
  num: C;
  den: C;
  versNum: Sommet;
  versDen: Sommet;
}
export function lecture(t: Triangle, s: Sommet): Lecture {
  if (s === "A") return { sommet: s, num: sub(t.C, t.A), den: sub(t.B, t.A), versNum: "C", versDen: "B" };
  if (s === "B") return { sommet: s, num: sub(t.C, t.B), den: sub(t.A, t.B), versNum: "C", versDen: "A" };
  return { sommet: s, num: sub(t.B, t.C), den: sub(t.A, t.C), versNum: "B", versDen: "A" };
}
export const rapport = (l: Lecture) => div(l.num, l.den);

/** Le badge : la fraction en toutes lettres, au sommet réglé (§5.2 C). */
export const TEX_BADGE: Record<Sommet, string> = {
  A: "w=\\dfrac{z_C-z_A}{z_B-z_A}",
  B: "w=\\dfrac{z_C-z_B}{z_A-z_B}",
  C: "w=\\dfrac{z_B-z_C}{z_A-z_C}",
};
export const TEX_BADGE_LIEU = "u=\\dfrac{z-z_A}{z-z_B}";

// ── Les modules : un radical de rationnel, ou (lieu) un a + b√3 dénoué ────────
export interface Module {
  tex: string;
  f: number;
  /** vaut exactement 1 ? */
  un: boolean;
}
const carreParfait = (x: Q): Q | null => {
  if (x.n < 0) return null;
  const a = Math.round(Math.sqrt(x.n)), b = Math.round(Math.sqrt(x.d));
  return a * a === x.n && b * b === x.d ? q(a, b) : null;
};
/** |u|², dans ℚ(√3) */
export const moduleCarreR3 = (u: C): R3 => rAdd(rMul(u.re, u.re), rMul(u.im, u.im));
/**
 * √(a + b√3) = x + y√3, x et y rationnels, quand ça existe : x² + 3y² = a, 2xy = b,
 * donc x² = (a ± √(a² − 3b²))/2. null sinon — et la scène n'écrit alors rien.
 */
export function racineR3(v: R3): R3 | null {
  const a = v.r, b = v.s;
  const d = carreParfait(qSub(qMul(a, a), qMul(q(3), qMul(b, b))));
  if (!d) return null;
  for (const x2 of [qDiv(qAdd(a, d), q(2)), qDiv(qSub(a, d), q(2))]) {
    const x = carreParfait(x2);
    if (!x || qNul(x)) continue;
    const y = qDiv(b, qMul(q(2), x));
    const cand = r3(x, y);
    const f = rF(cand);
    if (f > 0 && rNulDiff(rMul(cand, cand), v)) return cand;
    const neg = r3(q(-x.n, x.d), q(-y.n, y.d));
    if (rF(neg) > 0 && rNulDiff(rMul(neg, neg), v)) return neg;
  }
  return null;
}
const rNulDiff = (u: R3, v: R3) => rNul(r3(qSub(u.r, v.r), qSub(u.s, v.s)));
/** a + b√3, la partie RATIONNELLE en tête : 2+\sqrt{3} · 2-\sqrt{3} (§5.3 E) */
function texR3Rationnel(v: R3): string {
  if (qNul(v.s)) return texQ(v.r);
  const rac = texCoef(v.s, "\\sqrt{3}");
  if (qNul(v.r)) return rac;
  return `${texQ(v.r)}${rac.startsWith("-") ? rac : `+${rac}`}`;
}
export function moduleDe(u: C): Module {
  const n2 = moduleCarreR3(u);
  if (qNul(n2.s)) {
    const r: Radical = racine(n2.r);
    return { tex: texRadical(r), f: radicalF(r), un: r.k === 1 && r.m === 1 && r.d === 1 };
  }
  const v = racineR3(n2);
  if (!v) throw new Error("module non exact : hors de la grille (§5.4)");
  return { tex: texR3Rationnel(v), f: rF(v), un: false };
}

// ── w écrit comme au §5.3 A : i · 1-i · \tfrac{1+\sqrt{3}\,i}{2} · \tfrac{\sqrt{3}}{3}\,i · -\tfrac{1}{2} ──
const ppcm = (a: number, b: number): number => {
  const g = (x: number, y: number): number => (y === 0 ? x : g(y, x % y));
  return (a / g(a, b)) * b;
};
export function texRapport(u: C): string {
  const imNul = rNul(u.im), reNul = rNul(u.re);
  if (imNul && qNul(u.re.s)) return texQ(u.re.r);
  if (reNul && qNul(u.im.s)) return texCoef(u.im.r, "i", u.im.r.d !== 1);
  if (reNul && qNul(u.im.r)) {
    const k = u.im.s;
    const num = `${Math.abs(k.n) === 1 ? "" : Math.abs(k.n)}\\sqrt{3}`;
    const corps = k.d === 1 ? `${num}\\,i` : `\\tfrac{${num}}{${k.d}}\\,i`;
    return k.n < 0 ? `-${corps}` : corps;
  }
  const L = [u.re.r.d, u.re.s.d, u.im.r.d, u.im.s.d].reduce(ppcm, 1);
  if (L === 1) return texComplexe(u);
  return `\\tfrac{${texComplexe(mul(u, cq(L)))}}{${L}}`;
}

// ── La nature : les CRITÈRES vérifiés au sommet, chacun avec sa valeur (§5.3 B, IM-1) ──
/**
 * Chaque critère, dans l'ordre de la table de la leçon, avec la valeur qui l'allume ou
 * qui le tue — jamais un décompte, jamais « aucune des quatre ». Du texte pour MathText :
 * les nombres entre $…$. Une ligne par critère.
 */
export function nature(w: C, s: Sommet): string[] {
  const m = moduleDe(w);
  const k = argument(w);
  if (k === null) throw new Error("argument non exact");
  const S = `$${s}$`;
  const a = texAngle(k).replace(/\\tfrac/g, "\\dfrac");
  const mt = m.tex.replace(/\\tfrac/g, "\\dfrac");
  const lignes: string[] = [];
  const aligne = k === 0 || k === 12;
  const droit = Math.abs(k) === 6;
  const tiers = Math.abs(k) === 4;
  if (m.un) lignes.push(`$\\vert w\\vert = 1$ ⟹ isocèle en ${S}`);
  if (m.un && tiers) {
    lignes.push(`et $\\arg(w) = ${a}$ ⟹ équilatéral`);
    return lignes;
  }
  if (!m.un && tiers) {
    lignes.push(`$\\arg(w) = ${a}$ est bien l’angle du critère « équilatéral » — mais $\\vert w\\vert = ${mt} \\neq 1$, et ce critère demande les deux`);
    lignes.push(`ni $0$, ni $\\pi$, ni $\\pm\\dfrac{\\pi}{2}$ — rien ne s’allume au sommet ${S}`);
    return lignes;
  }
  if (!m.un) lignes.push(`$\\vert w\\vert = ${mt} \\neq 1$`);
  if (aligne) lignes.push(`$\\arg(w) = ${a}$ ⟹ alignés`);
  else if (droit) lignes.push(`$\\arg(w) = ${a}$ ⟹ rectangle en ${S}`);
  else if (m.un) lignes.push(`$\\arg(w) = ${a}$ : ni $0$, ni $\\pi$, ni $\\pm\\dfrac{\\pi}{2}$`);
  else lignes.push(`$\\arg(w) = ${a}$ : ni $0$, ni $\\pi$, ni $\\pm\\dfrac{\\pi}{2}$ — rien ne s’allume au sommet ${S}`);
  return lignes;
}
/** les conclusions allumées, en mots (la porte les recompte à part) */
export function conclusions(w: C): ("isocele" | "equilateral" | "rectangle" | "alignes")[] {
  const m = moduleDe(w), k = argument(w);
  const out: ("isocele" | "equilateral" | "rectangle" | "alignes")[] = [];
  if (m.un) out.push("isocele");
  if (m.un && k !== null && Math.abs(k) === 4) out.push("equilateral");
  if (k !== null && Math.abs(k) === 6) out.push("rectangle");
  if (k === 0 || k === 12) out.push("alignes");
  return out;
}

// ── Le mode `lieu` : u = (z − z_A)/(z − z_B), z_A = −2, z_B = 2 (§5.3 E) ──────
export const rapportLieu = (z: C) => div(sub(z, Z_A_LIEU), sub(z, Z_B_LIEU));
export type Lieu = "mediatrice" | "cercle" | "droite";
/** le lieu qui passe par un cran — `libre` n'est sur aucun (§5.2 D) */
export const LIEU_DU_CRAN: Record<PointM, Lieu | null> = { libre: null, "cercle-1": "cercle", "cercle-2": "cercle", mediatrice: "mediatrice", droite: "droite" };
/** ce que le balayage garde ÉCRIT sur chaque lieu (§6.1, BQ-1) : l'invariant, exact */
export const INVARIANT: Record<Lieu, "module" | "argument"> = { mediatrice: "module", cercle: "argument", droite: "argument" };

/**
 * Le balayage, lieu par lieu, avec sa BORNE (§6.1) — sans elle l'invariant n'en est pas un :
 *  - médiatrice : z = i·y, toute la portion visible (|u| = 1 en tout point, z = 0 compris) ;
 *  - cercle de diamètre [AB] : z = 2e^{iθ}, le DEMI-cercle supérieur, A et B exclus
 *    (sous l'axe réel, arg u vaut +π/2) ;
 *  - droite (AB) : z = x, la demi-droite x > 2, B exclu (entre A et B, arg u vaut π).
 * Le pas déplace M visiblement (§5.5 point 3) : ¼ d'unité sur les deux droites, et 7,5° sur
 * le cercle — PAS les 5° de la spec : sur un cercle de rayon 2, 5° font 0,17 unité, soit
 * 3,5 px à 390 px, sous les 4 px que la spec exige elle-même (mesuré par le test unitaire à
 * la construction). 7,5° = π/24 : 5,2 px, et les deux crans (30°, 150°) restent sur la grille.
 */
export interface Parcours {
  /** le paramètre du cran de départ */
  depart: number;
  min: number;
  max: number;
  pas: number;
  /** la position, en flottants (dessin seulement) */
  point: (p: number) => [number, number];
}
const LIMITE = 8.5;
export function parcours(m: PointM): Parcours | null {
  const lieu = LIEU_DU_CRAN[m];
  if (!lieu) return null;
  const [x0, y0] = enFlottants(VAL_M[m]);
  if (lieu === "mediatrice") return { depart: y0, min: -LIMITE, max: LIMITE, pas: 0.25, point: (p) => [0, p] };
  if (lieu === "droite") return { depart: x0, min: 2.25, max: LIMITE, pas: 0.25, point: (p) => [p, 0] };
  const th = (Math.atan2(y0, x0) * 180) / Math.PI;
  return { depart: th, min: 7.5, max: 172.5, pas: 7.5, point: (p) => [2 * Math.cos((p * Math.PI) / 180), 2 * Math.sin((p * Math.PI) / 180)] };
}
/** |u| et arg(u) en flottants, en un point quelconque (la porte et la région vivante) */
export function rapportLieuF([x, y]: [number, number]): { module: number; argument: number; ma: number; mb: number } {
  const ma = Math.hypot(x + 2, y), mb = Math.hypot(x - 2, y);
  const a1 = Math.atan2(y, x + 2), a2 = Math.atan2(y, x - 2);
  let d = a1 - a2;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  return { module: ma / mb, argument: d, ma, mb };
}

/** la valeur exacte de la ligne INVARIANTE d'un lieu (§6.1) */
export const TEX_INVARIANT: Record<Lieu, string> = {
  mediatrice: "1",
  cercle: texAngle(-6),
  droite: "0",
};

// ── Sûreté : le plus grand écart au cadre, recalculé (§5.3 D) ────────────────
export function excursion(): number {
  let m = 0;
  for (const f of FORMES)
    for (const p of POSITIONS) {
      const t = triangle(f, p);
      for (const z of [t.A, t.B, t.C]) for (const v of enFlottants(z)) m = Math.max(m, Math.abs(v));
    }
  for (const z of Object.values(VAL_M)) for (const v of enFlottants(z)) m = Math.max(m, Math.abs(v));
  return m;
}

// qF / RAC3 exportés pour le test (seconde voie)
export const _interne = { qF, RAC3 };
