/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Nombres complexes, première partie » (forme algébrique et équations) : les outils et les données.
 *
 * Ce fichier ne dessine rien. Il donne aux scènes et au script une arithmétique EXACTE (fractions,
 * complexes à parties rationnelles, racines entières simplifiées) et TOUS les nombres que la leçon
 * affiche : aucune valeur n'est écrite à la main ailleurs, chacune sort d'un calcul d'ici. Les outils
 * de format (nombres à la française, texte de scène à mini-balisage) sont ceux de la leçon
 * `exponentielle-outils.js` : des fonctions sans contenu de leçon.
 *
 * SOURCES — [V] lu sur la source citée ; « à vérifier » : ne s'affiche pas.
 *  1. [V] MacTutor, « Quadratic, cubic and quartic equations »
 *     (https://mathshistory.st-andrews.ac.uk/HistTopics/Quadratic_etc_equations/) : en résolvant
 *     x³ = 15x + 4, Cardan obtient une expression qui contient √−121, et sait que x = 4 est solution ;
 *     l'*Ars Magna* paraît en 1545. Le calcul q²/4 − p³/27 = 4 − 125 = −121 est refait ici par le code.
 *     À l'écran : seulement Cardan, 1545, √−121 et x = 4. La forme exacte de la formule telle que
 *     Cardan l'écrit est « à vérifier » : l'écran l'écrit en notation moderne, sans guillemets.
 *  2. Ne s'affichent PAS (décision du propriétaire : faits non tranchés) : Bombelli et sa date, Wessel,
 *     Argand, Descartes, le duel Fior-Tartaglia, la phrase « plus sophistique que vrai ».
 *  3. [V] Sujets de bac, docs/sujets/maths/nombres-complexes-1.md : Sciences expérimentales (SVT et
 *     Sciences Physiques), 2022, session normale, exercice 2 (3 points), question 4 : a) 0,25 ;
 *     b) 0,5 ; c) 0,25 (statut vérifié) ; 2018, session normale, exercice 2, question 1 (0,75 point :
 *     2z² + 2z + 5 = 0 ; statut vérifié avec correction de fond). docs/sujets/maths/nombres-complexes-2.md :
 *     Sciences mathématiques, 2024, session normale, exercice 3 (3,5 points), partie I, question 2
 *     (0,5 point : z² − 2iz + α = 0, somme et produit des racines ; statut vérifié).
 * Capacités du cadre 2025 : docs/referentiel/maths-sexp.yaml (2.4.1, 2.4.4, 2.4.8, 2.4.9) et
 * maths-sm.yaml (2.2.1, 2.2.3, 2.2.5, 2.2.6).
 */
import { NB, fr, ent, M, TN, outilsScene } from "./exponentielle-outils";
export { NB, fr, ent, M, TN, outilsScene };

/* ---------- fractions : [numérateur, dénominateur], réduites, dénominateur > 0 ---------- */
const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));
export const Q = (n, d = 1) => {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0) throw new Error(`fraction invalide ${n}/${d}`);
  if (d < 0) { n = -n; d = -d; }
  const g = pgcd(n, d) || 1;
  return [n / g, d / g];
};
const q = (x) => (Array.isArray(x) ? Q(x[0], x[1]) : Q(x, 1));
export const qadd = (a, b) => { a = q(a); b = q(b); return Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); };
export const qneg = (a) => { a = q(a); return Q(-a[0], a[1]); };
export const qsub = (a, b) => qadd(a, qneg(b));
export const qmul = (a, b) => { a = q(a); b = q(b); return Q(a[0] * b[0], a[1] * b[1]); };
export const qinv = (a) => { a = q(a); return Q(a[1], a[0]); };
export const qdiv = (a, b) => qmul(a, qinv(b));
export const qnum = (a) => { a = q(a); return a[0] / a[1]; };
export const qeq = (a, b) => { a = q(a); b = q(b); return a[0] === b[0] && a[1] === b[1]; };

/* ---------- complexes à parties rationnelles ---------- */
export const C = (re = 0, im = 0) => ({ re: q(re), im: q(im) });
export const ci = C(0, 1);
export const cadd = (a, b) => ({ re: qadd(a.re, b.re), im: qadd(a.im, b.im) });
export const csub = (a, b) => ({ re: qsub(a.re, b.re), im: qsub(a.im, b.im) });
export const cneg = (a) => ({ re: qneg(a.re), im: qneg(a.im) });
export const cconj = (a) => ({ re: a.re, im: qneg(a.im) });
export const cmul = (a, b) => ({ re: qsub(qmul(a.re, b.re), qmul(a.im, b.im)), im: qadd(qmul(a.re, b.im), qmul(a.im, b.re)) });
export const cmod2 = (a) => qadd(qmul(a.re, a.re), qmul(a.im, a.im));          // |z|² = z z̄, une fraction
export const cdiv = (a, b) => { const d = cmod2(b), n = cmul(a, cconj(b)); return { re: qdiv(n.re, d), im: qdiv(n.im, d) }; };
export const cpow = (a, n) => { let r = C(1); for (let i = 0; i < n; i++) r = cmul(r, a); return r; };
export const cscal = (k, a) => ({ re: qmul(k, a.re), im: qmul(k, a.im) });
export const ceq = (a, b) => qeq(a.re, b.re) && qeq(a.im, b.im);
export const cnum = (a) => ({ x: qnum(a.re), y: qnum(a.im) });
export const cre = (a) => qnum(a.re);
export const cim = (a) => qnum(a.im);

/* ---------- racines carrées entières : n = k² m, m sans carré ---------- */
export function sqrtInt(n) {
  if (!Number.isInteger(n) || n < 0) throw new Error(`racine d'un non-entier ${n}`);
  let k = 1, m = n;
  for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; }
  return [k, m];
}
/** k√m écrit : 5, √13, 2√2 (mode « tex » : \sqrt{m}) */
export function rac(n, mode = "html") {
  const [k, m] = sqrtInt(n);
  if (m === 1) return String(k);
  const r = mode === "tex" ? `\\sqrt{${m}}` : "√" + m;
  return (k === 1 ? "" : String(k)) + r;
}
/** le module de a, quand |a|² est entier */
export const racMod = (a, mode) => { const [n, d] = cmod2(a); if (d !== 1) throw new Error("module non entier"); return rac(n, mode); };
export const modNum = (a) => Math.sqrt(qnum(cmod2(a)));

/* ---------- écriture : « 3 + 2i », « −½ + (3/2)i » ; modes html, svg (mini-balisage de scène), tex ---------- */
function coef(a, mode) {
  const n = Math.abs(a[0]), d = a[1];
  if (d === 1) return String(n);
  if (mode === "tex") return `\\tfrac{${n}}{${d}}`;
  return n === 1 && d === 2 ? "½" : `${n}/${d}`;
}
/** un réel (fraction) écrit, avec le vrai signe moins */
export function qStr(a, mode = "html") {
  a = q(a);
  return (a[0] < 0 ? (mode === "tex" ? "-" : "−") : "") + coef(a, mode);
}
export function cStr(z, mode = "html") {
  const I = mode === "svg" ? "*i*" : mode === "tex" ? "i" : "<i>i</i>";
  const MOINS = mode === "tex" ? "-" : "−";
  const [rn] = z.re, [cn, cd] = z.im;
  const re = rn !== 0 ? qStr(z.re, mode) : "";
  let im = "";
  if (cn !== 0) {
    if (Math.abs(cn) === cd) im = I;
    else if (cd === 1) im = coef(z.im, mode) + I;
    else im = (cn === 1 && cd === 2) || (cn === -1 && cd === 2) ? "½" + I : mode === "tex" ? coef(z.im, mode) + I : `(${coef(z.im, mode)})${I}`;
  }
  if (!im) return re || "0";
  if (!re) return (cn < 0 ? MOINS : "") + im;
  return `${re} ${cn < 0 ? MOINS : "+"} ${im}`;
}
export const H = (z) => cStr(z, "html");
export const S = (z) => cStr(z, "svg");
export const TX = (z) => cStr(z, "tex");
/** un complexe en formule KaTeX dans le panneau, avec son repli en texte */
export const MZ = (z) => M(TX(z), H(z));

/** un terme signé pour un développement : 12i, −2i, −8i² ; `suffixe` en TeX (i, i^{2}) */
function terme(c, suffixe, premier) {
  if (c === 0) return "";
  const a = Math.abs(c), s = c < 0 ? "-" : premier ? "" : "+";
  return s + (a === 1 && suffixe ? "" : String(a)) + suffixe;
}
/** (a + ib)(c + id) développé avant i² = −1 : ac + adi + bci + bdi² (entiers) */
export function devTex(z, w) {
  const [a, b, c, d] = [cre(z), cim(z), cre(w), cim(w)];
  const t = [[a * c, ""], [a * d, "i"], [b * c, "i"], [b * d, "i^{2}"]];
  let out = "", premier = true;
  for (const [co, su] of t) { const s = terme(co, su, premier); if (s) { out += s; premier = false; } }
  return out || "0";
}
/** le même développement en texte du panneau */
export function devTxt(z, w) {
  const [a, b, c, d] = [cre(z), cim(z), cre(w), cim(w)];
  const t = [[a * c, ""], [a * d, "<i>i</i>"], [b * c, "<i>i</i>"], [b * d, "<i>i</i><sup>2</sup>"]];
  let out = "", premier = true;
  for (const [co, su] of t) {
    if (co === 0) continue;
    const ab = Math.abs(co), nb = ab === 1 && su ? "" : String(ab);
    out += premier ? (co < 0 ? "−" : "") + nb + su : ` ${co < 0 ? "−" : "+"} ${nb}${su}`;
    premier = false;
  }
  return out || "0";
}
/** les trois lectures fausses d'un produit (a + ib)(c + id) : i² = +1 ; terme à terme ; (renvoie des complexes) */
export const prodI2Plus = (z, w) => ({ re: qadd(qmul(z.re, w.re), qmul(z.im, w.im)), im: qadd(qmul(z.re, w.im), qmul(z.im, w.re)) });
export const prodTermeATerme = (z, w) => ({ re: qmul(z.re, w.re), im: qmul(z.im, w.im) });
export const prodSansI2 = (z, w) => ({ re: qmul(z.re, w.re), im: qadd(qmul(z.re, w.im), qmul(z.im, w.re)) });   // le terme bd i² oublié
/** une racine carrée de z dans les entiers : δ = x + iy tel que δ² = z (x > 0, ou x = 0 et y > 0) */
export function racineCarree(z) {
  for (let x = 0; x <= 12; x++) for (let y = -12; y <= 12; y++) {
    if (x === 0 && y <= 0) continue;
    const d = C(x, y);
    if (ceq(cmul(d, d), z)) return d;
  }
  throw new Error("pas de racine entière");
}
/** les solutions de az² + bz + c = 0 (a réel entier, b et c complexes entiers de Gauss) : Δ puis δ */
export function resoudre(a, b, c) {
  const delta = csub(cmul(b, b), cscal(Q(4 * a), c));
  const dl = ceq(delta, C(0)) ? C(0) : racineCarree(delta);
  const deux = Q(2 * a);
  return { delta, dl, z1: cscal(qinv(deux), cadd(cneg(b), dl)), z2: cscal(qinv(deux), csub(cneg(b), dl)) };
}

/* ======================================================================================
   LES DONNÉES, PARTIE PAR PARTIE
   ====================================================================================== */

/* ---------- partie 0 : ce qu'il faut savoir, l'équation x² − 2x + 5 = 0 ---------- */
export const SAV = { a: 1, b: -2, c: 5 };
export const SAV_DELTA = SAV.b * SAV.b - 4 * SAV.a * SAV.c;                    // −16
export const SAV_DELTA_SIGNE = SAV.b * SAV.b + 4 * SAV.a * SAV.c;              // 24 : le signe de −4ac perdu
export const SAV_ABS = -SAV_DELTA;                                             // 16 : Δ négatif traité comme positif
export const SAV_X_FAUX = [(-SAV.b + Math.sqrt(SAV_ABS)) / (2 * SAV.a), (-SAV.b - Math.sqrt(SAV_ABS)) / (2 * SAV.a)];   // 3 et −1
export const SAV_TEST = SAV_X_FAUX[0] * SAV_X_FAUX[0] + SAV.b * SAV_X_FAUX[0] + SAV.c;   // 9 − 6 + 5 = 8 ≠ 0
/** a x² + b x + c écrit en mini-balisage de scène */
export function polyScene(a, b, c) {
  const t = (co, suf, premier) => (co === 0 ? "" : (premier ? (co < 0 ? "−" : "") : co < 0 ? " − " : " + ") + (Math.abs(co) === 1 && suf ? "" : Math.abs(co)) + suf);
  const s = t(a, "*x*^{2}", true) + t(b, "*x*", !a) + t(c, "", !a && !b);
  return s;
}
export const polyHtml = (a, b, c, v = "x") => polyScene(a, b, c).replace(/\*x\*\^\{2\}/g, `<i>${v}</i><sup>2</sup>`).replace(/\*x\*/g, `<i>${v}</i>`);

/* ---------- partie 1 : l'énigme de Cardan, x³ = 15x + 4 ---------- */
export const CARDAN = { p: 15, q: 4 };
export const X4 = 4;
export const CARDAN_GAUCHE = X4 ** 3, CARDAN_DROITE = CARDAN.p * X4 + CARDAN.q;            // 64 et 64
export const CARDAN_DEMI = CARDAN.q / 2;                                                    // 2
export const CARDAN_DISC = (CARDAN.q / 2) ** 2 - (CARDAN.p / 3) ** 3;                       // 4 − 125 = −121
export const CARDAN_MOINS = -CARDAN_DISC;                                                   // 121 : « √−121 »
export const f_cub = (x) => x ** 3 - CARDAN.p * x - CARDAN.q;
/** x³ − 15x − 4 = (x − 4)(x² + 4x + 1) : division de Horner par x − 4, contrôlée */
const horner = (co, r) => { const o = [co[0]]; for (let i = 1; i < co.length; i++) o.push(co[i] + r * o[i - 1]); return o; };
const H4 = horner([1, 0, -CARDAN.p, -CARDAN.q], X4);
if (H4[3] !== 0) throw new Error("4 n'est pas solution");
export const CUB_QUAD = H4.slice(0, 3);                                                     // [1, 4, 1]
const CUB_DELTA = CUB_QUAD[1] ** 2 - 4 * CUB_QUAD[0] * CUB_QUAD[2];                         // 12
const [CUB_K, CUB_M] = sqrtInt(CUB_DELTA);                                                  // 2√3
if (CUB_K % 2) throw new Error("racines non simplifiables");
export const CUB_RAC = [(-CUB_QUAD[1] - CUB_K * Math.sqrt(CUB_M)) / 2, (-CUB_QUAD[1] + CUB_K * Math.sqrt(CUB_M)) / 2, X4];   // −3,73 ; −0,27 ; 4
export const CUB_EXACT = [`${-CUB_QUAD[1] / 2 < 0 ? "−" : ""}${Math.abs(CUB_QUAD[1] / 2)} − ${CUB_K / 2 === 1 ? "" : CUB_K / 2}√${CUB_M}`, `${-CUB_QUAD[1] / 2 < 0 ? "−" : ""}${Math.abs(CUB_QUAD[1] / 2)} + ${CUB_K / 2 === 1 ? "" : CUB_K / 2}√${CUB_M}`, String(X4)];

/* ---------- partie 2 : le plan et le quart de tour ---------- */
export const Z0 = C(3, 2);                                       // le point principal de la figure
export const Z_DROITE = C(2);                                    // ×(−1) sur la droite
export const Z_QUART = C(1);                                     // le point 1 qui tourne
export const QUART_DEMI2 = qmul(Q(1, 2), Q(1, 2));               // (½)² = ¼ : i = ½ sur la droite ?
export const QUART_MDEMI2 = qmul(Q(-1, 2), Q(-1, 2));            // (−½)² = ¼
export const FOIS_I = { z: Z0, ok: cmul(ci, Z0), echange: C(cim(Z0), cre(Z0)), demi: cneg(Z0) };   // −2 + 3i ; 2 + 3i ; −3 − 2i
export const FOIS_I_LIGNE = { terme: cmul(ci, C(0, 2)), i2: cmul(ci, ci) };              // 3i + 2i² : 2i² = −2
export const CRANS_Z = [C(3, 2), C(1, 1), C(-2, 1), C(2, -3), C(4, 0), C(0, 2)];            // le curseur de z
export const IM_Q = C(4, -6);                                    // Im(4 − 6i)
export const EGAL = { p: 2, q: -1, r: 1, s: 3, u: 5, v: -2 };    // (2x − 1) + (y + 3)i = 5 − 2i
export const EGAL_X = (EGAL.u - EGAL.q) / EGAL.p, EGAL_Y = (EGAL.v - EGAL.s) / EGAL.r;                 // 3 ; −5
export const EGAL_ECHANGE = [qdiv(Q(EGAL.v - EGAL.q), Q(EGAL.p)), Q((EGAL.u - EGAL.s) / EGAL.r)];               // −½ ; 2 (fractions)
export const EGAL_IGARDE = C(-EGAL.s, EGAL.v);                   // y = −3 − 2i

/* ---------- partie 3 : calculer ---------- */
export const W_SOMME = C(1, -4);
export const SOMME = { z: Z0, w: W_SOMME, ok: cadd(Z0, W_SOMME), signe: C(cre(Z0) + cre(W_SOMME), cim(Z0) - cim(W_SOMME)), tout: C(cre(Z0) + cim(Z0) + cre(W_SOMME) + cim(W_SOMME)) };   // 4 − 2i ; 4 + 6i ; 2
export const PROD = { a: C(3, -2), b: C(1, 4) };
PROD.ok = cmul(PROD.a, PROD.b); PROD.i2plus = prodI2Plus(PROD.a, PROD.b); PROD.terme = prodTermeATerme(PROD.a, PROD.b);                // 11 + 10i ; −5 + 10i ; 3 − 8i
export const CARRE = { z: C(2, 1) };
CARRE.ok = cmul(CARRE.z, CARRE.z);                                                                                                  // 3 + 4i
CARRE.somme = C(cre(CARRE.z) ** 2 - cim(CARRE.z) ** 2);                                                                              // a² + (ib)² = 3 : le double produit manque
CARRE.i2plus = C(cre(CARRE.z) ** 2 + cim(CARRE.z) ** 2, 2 * cre(CARRE.z) * cim(CARRE.z));                                          // 5 + 4i

/* ---------- partie 4 : le conjugué ---------- */
export const ZZBAR_CRANS = [C(3, 2), C(1, 1), C(2, -3)];
export const zzbar = (z) => cmul(z, cconj(z));                                          // |z|², un réel
export const ZZBAR_VALEURS = ZZBAR_CRANS.map((z) => qnum(zzbar(z).re));                  // 13 ; 2 ; 13
export const CONJ_PROP = { z: C(2, 1) };
CONJ_PROP.carre = cmul(CONJ_PROP.z, CONJ_PROP.z);                                        // 3 + 4i
CONJ_PROP.ok = cmul(cconj(CONJ_PROP.z), cconj(CONJ_PROP.z));                             // 3 − 4i
CONJ_PROP.prod = zzbar(CONJ_PROP.z);                                                     // 5 = (2 + i)(2 − i)
export const DIV = { n: C(2, 3), d: C(1, -2) };
DIV.cd = cconj(DIV.d); DIV.num = cmul(DIV.n, DIV.cd); DIV.den = cmul(DIV.d, DIV.cd);      // −4 + 7i ; 5
DIV.ok = cdiv(DIV.n, DIV.d);                                                              // −4/5 + (7/5)i
DIV.denFaux = C(cre(DIV.d) ** 2 - cim(DIV.d) ** 2);                                       // 1 − 4 = −3 : le i² oublié
DIV.faux1 = cdiv(DIV.num, DIV.denFaux);                                                   // 4/3 − (7/3)i
DIV.faux2 = cdiv(DIV.n, DIV.den);                                                         // (2 + 3i)/5

/* ---------- partie 5 : le module et la distance ---------- */
export const RAPPEL = { z: C(1, 2) };
RAPPEL.ok = cmul(ci, RAPPEL.z);                                                             // i(1 + 2i) = −2 + i
RAPPEL.i2plus = prodI2Plus(ci, RAPPEL.z);                                                   // i² = +1 : 2 + i
RAPPEL.lu = C(0, cre(RAPPEL.z) + cim(RAPPEL.z));                                            // i × 2i lu 2i : i + 2i = 3i
export const MODULE_Z = Z0;                                                                 // |3 + 2i| = √13
export const MOD_Q = C(-5, 12);                                                              // |−5 + 12i| = 13 (hors du cadre : le point n'est pas dessiné)
export const MOD_OK = Math.sqrt(qnum(cmod2(MOD_Q))), MOD_LIN = Math.abs(cre(MOD_Q)) + Math.abs(cim(MOD_Q)), MOD_CARRE = qnum(cmod2(MOD_Q));   // 13 ; 17 ; 169
export const MSOMME = { z: C(3), w: C(0, 4) };
MSOMME.s = cadd(MSOMME.z, MSOMME.w);
export const MSOMME_VALEURS = { somme: modNum(MSOMME.s), parties: modNum(MSOMME.z) + modNum(MSOMME.w), carre: qnum(cmod2(MSOMME.s)) };   // 5 ; 7 ; 25
export const AB = { a: C(-2, 4), b: C(4, -4) };
AB.diff = csub(AB.b, AB.a);                                                                  // 6 − 8i
export const AB_VALEURS = { ok: modNum(AB.diff), ob: modNum(AB.b), somme: Math.abs(cre(AB.diff)) + Math.abs(cim(AB.diff)) };   // 10 ; 4√2 ; 14
export const AB_TEX = { ok: racMod(AB.diff), ob: racMod(AB.b) };
export const CERCLE_Q = { centre: C(-2), r: 2 };                                              // |z + 2| = 2
export const CERCLE_FAUX = { centre: C(2) };

/* ---------- partie 6 : le second degré ---------- */
export const SOMME_CARRES = 16;                                                               // x² + 16 = (x + 4i)(x − 4i)
export const SC_RAC = sqrtInt(SOMME_CARRES)[0];                                               // 4
export const SC_DOUBLE = 2 * SC_RAC;                                                          // (x + 4)² = x² + 8x + 16
export const X2M = 4;                                                                         // z² = −4
export const X2M_RAC = sqrtInt(X2M)[0];                                                       // 2 : ±2i
export const CANON = resoudre(1, C(SAV.b), C(SAV.c));                                         // z² − 2z + 5
export const CANON_H = -SAV.b / (2 * SAV.a);                                                  // 1 : (z − 1)² + 4
export const CANON_K = SAV.c - CANON_H ** 2;                                                  // 4
export const CANON_M = sqrtInt(CANON_K)[0];                                                   // 2
export const CANON_ROUTE = [C(CANON_H, CANON_M), C(CANON_H, -CANON_M)];                       // 1 ± 2i
export const CANON_FAUX = [C(-CANON_H, CANON_M), C(-CANON_H, -CANON_M)];                      // −1 ± 2i
export const CONJ_OPPOSE = cneg(CANON_ROUTE[0]);                                              // −1 − 2i : le symétrique par rapport à O
export const BICARREE = { a: 1, b: 5, c: 4 };                                                 // Z² + 5Z + 4
export const BI_DELTA = BICARREE.b ** 2 - 4 * BICARREE.a * BICARREE.c;                        // 9
export const BI_Z = [(-BICARREE.b + Math.sqrt(BI_DELTA)) / 2, (-BICARREE.b - Math.sqrt(BI_DELTA)) / 2];   // −1 ; −4
export const BI_RAC = BI_Z.map((Z) => sqrtInt(-Z)[0]);                                         // 1 ; 2 : z = ±i, ±2i

/* ---------- partie 7 (SM) : coefficients complexes ---------- */
export const SM_DELTA = C(0, -2);                                                             // Δ = −2i
export const SM_I2 = cmul(ci, ci);                                                            // i² = −1
export const SM_D = C(3, 4);                                                                  // Δ = 3 + 4i
export const SM_DL = racineCarree(SM_D);                                                      // 2 + i
export const SM_MOD = racMod(SM_D);                                                           // |Δ| = 5
export const SM_X2 = (qnum(SM_D.re) + modNum(SM_D)) / 2;                                      // x² = (3 + 5)/2 = 4
export const SM_Y2 = (modNum(SM_D) - qnum(SM_D.re)) / 2;                                      // y² = 1
export const SM_SIGNE = C(cre(SM_DL), -cim(SM_DL));                                           // 2 − i : le signe de xy perdu
export const SM_SIGNE_CARRE = cmul(SM_SIGNE, SM_SIGNE);                                       // 3 − 4i ≠ 3 + 4i
export const SM_PARTIES = { x2: cre(SM_D), y: sqrtInt(Math.round(cim(SM_D)))[0] };            // √3 + 2i : (√3)² = 3, y = 2
export const SM_PARTIES_CARRE = { re: SM_PARTIES.x2 - SM_PARTIES.y ** 2, im: 2 * SM_PARTIES.y }; // −1 + 4√3 i
export const SM_EQ = { a: 1, b: C(-3, -1), c: C(2, 2) };                                       // z² − (3 + i)z + 2 + 2i
export const SM_SOL = resoudre(SM_EQ.a, SM_EQ.b, SM_EQ.c);                                    // Δ = −2i, δ = 1 − i ; z = 2 et 1 + i
export const SM_ROUTE = [SM_SOL.z1, SM_SOL.z2];
export const SM_CONJ = [SM_SOL.z2, cconj(SM_SOL.z2)];                                         // 1 + i et 1 − i
const SM_DL2 = cconj(SM_SOL.dl);                                                              // 1 + i (δ² = 2i : le signe de xy)
export const SM_FAUX_DL = SM_DL2;
export const SM_FAUX_DL_CARRE = cmul(SM_DL2, SM_DL2);                                         // 2i
export const SM_FAUX_Z = [cscal(Q(1, 2), cadd(cneg(SM_EQ.b), SM_DL2)), cscal(Q(1, 2), csub(cneg(SM_EQ.b), SM_DL2))];   // 2 + i et 1
export const SM_VIETE = { b: C(0, -2), somme: cneg(C(0, -2)) };                               // z² − 2iz + α : somme = −b/a = 2i

/* ---------- partie 8 : le retour à l'énigme ---------- */
export const CUBE = { z: C(2, 1) };
CUBE.z2 = cmul(CUBE.z, CUBE.z); CUBE.z3 = cmul(CUBE.z2, CUBE.z);                              // 3 + 4i ; 2 + 11i
CUBE.dev = devTex(CUBE.z2, CUBE.z);                                                           // 6 + 3i + 8i + 4i²
CUBE.devTxt = devTxt(CUBE.z2, CUBE.z);
CUBE.i2plus = prodI2Plus(CUBE.z2, CUBE.z);                                                    // 10 + 11i
CUBE.sans = prodSansI2(CUBE.z2, CUBE.z);                                                      // 6 + 11i
CUBE.onze = cim(CUBE.z3);                                                                     // 11 : (11i)² = −121
CUBE.onze2 = qnum(cmul(C(0, CUBE.onze), C(0, CUBE.onze)).re);                                 // −121
if (CUBE.onze2 !== CARDAN_DISC) throw new Error("(2 + i)³ ne redonne pas √−121");
CUBE.conj = cconj(CUBE.z3);                                                                   // 2 − 11i
export const CONJ_FAUX = { meme: CUBE.z3, oppose: cneg(CUBE.z3) };                            // 2 + 11i ; −2 − 11i (l'opposé)
export const CUBE_SOMME = { z: CUBE.z, zb: cconj(CUBE.z), somme: cadd(CUBE.z, cconj(CUBE.z)), diff: csub(CUBE.z, cconj(CUBE.z)) };   // 4 ; 2i
CUBE_SOMME.parties = C(cre(CUBE.z) + cre(cconj(CUBE.z)), 2 * Math.abs(cim(CUBE.z)));         // 4 + 2i : les parties imaginaires ajoutées sans leur signe
export const CUBE_PRODUIT = cmul(CUBE.z, cconj(CUBE.z));                                      // 5
export const CUBE_APPARIE = CARDAN.p / 3;                                                     // 15/3 = 5

/* ---------- partie 9 : le bac ---------- */
export const BAC = { d: -2, r1: 2, r2: 4 };                                                   // 2022, question 4
export const BAC_S = (BAC.r2 ** 2 + BAC.d ** 2 - BAC.r1 ** 2) / BAC.d;                        // z + z̄ = −8
export const BAC_RE = BAC_S / 2;                                                              // −4
export const BAC_IM2 = BAC.r2 ** 2 - BAC_RE ** 2;                                             // 0
export const BAC_PT = C(BAC_RE, Math.sqrt(BAC_IM2));                                          // −4
export const BAC_PYTHAGORE = BAC.r2 ** 2 + BAC.r1 ** 2;                                       // |z|² + 2² = 20 (≠ |z + 2|² = 4)
export const BAC_B = { zz: BAC.r2 ** 2, carre: BAC.r1 ** 2, deux: Math.abs(BAC.d) };          // 16 ; 4 ; 2
export const BAC_C = { mauvais: BAC_S, im: BAC.r2 };                                           // z = −8 ; Im = ±4
export const BAC2 = { a: 2, b: 2, c: 5 };                                                     // 2z² + 2z + 5 = 0 (SExp 2018, Q1)
export const BAC2_DELTA = BAC2.b ** 2 - 4 * BAC2.a * BAC2.c;                                  // −36
export const BAC2_DELTA_A1 = BAC2.b ** 2 - 4 * BAC2.c;                                        // −16 : a = 1 supposé
export const BAC2_DELTA_SIGNE = BAC2.b ** 2 + 4 * BAC2.a * BAC2.c;                            // 44
export const BAC2_SOL = resoudre(BAC2.a, C(BAC2.b), C(BAC2.c));
export const BAC2_ROUTE = [BAC2_SOL.z1, BAC2_SOL.z2];                                         // −½ ± (3/2)i
export const BAC2_DIV2 = [C(Q(-BAC2.b, 2), Q(Math.sqrt(-BAC2_DELTA), 2)), C(Q(-BAC2.b, 2), Q(-Math.sqrt(-BAC2_DELTA), 2))];   // −1 ± 3i : divisé par 2 au lieu de 2a
export const BAC2_MOINSB = [C(Q(BAC2.b, 2 * BAC2.a), Q(Math.sqrt(-BAC2_DELTA), 2 * BAC2.a)), C(Q(BAC2.b, 2 * BAC2.a), Q(-Math.sqrt(-BAC2_DELTA), 2 * BAC2.a))];   // ½ ± (3/2)i

/* ---------- partie 10 : le bilan ---------- */
export const BQ1 = { n: 9, rac: sqrtInt(9)[0] };                                              // √(−9) : ±3i
export const BQ2 = { a: C(1, 1), b: C(1, -1) };
BQ2.somme = cadd(BQ2.a, BQ2.b);                                                               // 2
export const BQ2_TOTAL_NUM = modNum(BQ2.a) + modNum(BQ2.b);                                   // 2√2
export const BQ2_TOTAL = rac(Math.round(BQ2_TOTAL_NUM ** 2));                                 // 2√2 : √8
export const BQ2_SOMME = modNum(BQ2.somme);                                                   // 2
export const BQ2_SANS_RACINE = qnum(cmod2(BQ2.a)) + qnum(cmod2(BQ2.b));                       // 2 + 2 = 4
export const BQ3 = { a: 1, b: 6, c: 13 };                                                     // z² + 6z + 13
export const BQ3_SOL = resoudre(BQ3.a, C(BQ3.b), C(BQ3.c));                                   // Δ = −16 ; −3 ± 2i
export const BQ3_DELTA = BQ3.b ** 2 - 4 * BQ3.a * BQ3.c;
export const BQ3_SIGNE = [C(-cre(BQ3_SOL.z1), cim(BQ3_SOL.z1)), C(-cre(BQ3_SOL.z2), cim(BQ3_SOL.z2))];   // 3 ± 2i

/* ---------- les points, les cercles et les crans de la scène `plan` (liste fermée) ---------- */
/** les points supplémentaires : clé → [{z, nom?}] */
export const ENSEMBLES = {
  "un-i": [{ z: C(1) }, { z: ci }],
  "z-cercle": [{ z: cconj(MODULE_Z) }, { z: cneg(MODULE_Z) }, { z: cmul(ci, MODULE_Z) }],
  tri: [{ z: MSOMME.z }, { z: MSOMME.w }, { z: MSOMME.s }],
  m2: [{ z: CERCLE_Q.centre }],
  racines: [{ z: CANON_ROUTE[0] }, { z: CANON_ROUTE[1] }],
  cube: [{ z: CUBE.z }],
  cube2: [{ z: CUBE.z }, { z: cconj(CUBE.z) }],
  cube3: [{ z: CUBE.z }, { z: cconj(CUBE.z) }, { z: CUBE_SOMME.somme }],
  bac: [{ z: C(BAC.d), nom: "D" }],
  bac3: [{ z: C(BAC.d), nom: "D" }, { z: BAC_PT }],
  bac2: [{ z: BAC2_ROUTE[0] }, { z: BAC2_ROUTE[1] }],
};
/** les cercles : clé → [{ w, r, nom? }] (r réel) */
export const CERCLES = {
  z: [{ w: C(0), r: modNum(MODULE_Z) }],
  m2: [{ w: CERCLE_Q.centre, r: CERCLE_Q.r }],
  bac: [{ w: C(BAC.d), r: BAC.r1, nom: "(Γ)" }, { w: C(0), r: BAC.r2, nom: "(Γ′)" }],
};
/** les trois emplacements candidats de `fois-i`, dans l'ordre des options affichées */
export const OPTS_FOIS = [FOIS_I.echange, FOIS_I.ok, FOIS_I.demi];

/* ---------- les crans de l'élève, pour les contrôles ---------- */
export const ABC = ["A", "B", "C"];

/** le quart de tour d'un point : z → iz ; le demi-tour : z → −z (positions pour la scène) */
export const rotation = (z, angle) => { const { x, y } = cnum(z), c = Math.cos(angle), s = Math.sin(angle); return { x: x * c - y * s, y: x * s + y * c }; };
