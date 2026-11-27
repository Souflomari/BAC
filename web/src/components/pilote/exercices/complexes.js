// @ts-nocheck
/**
 * Les exercices de la leçon « Nombres complexes : forme algébrique et équations » (V3).
 * Format : voir modele.js. Chaque réponse est calculée ici, en arithmétique exacte (fractions,
 * radicaux simplifiés k√m) ; le vérificateur (scripts/pilotes-exercices.mjs) rejoue des centaines de
 * tirages. Tout tirage est refait tant qu'un leurre égale la bonne réponse ou un autre leurre.
 *
 * Douze gabarits, dans l'ordre de la leçon : forme algébrique, produit, quart de tour, conjugué,
 * quotient, module et distance, ensemble de points (le cercle |z − ω| = r ; la médiatrice n'a pas
 * d'étape dans la leçon, elle est retirée), second degré à coefficients réels, équations qui s'y
 * ramènent, puis, en SM seulement, la racine de Δ et le second degré à coefficients complexes, et enfin
 * la fin d'un exercice du bac (deux cercles, type 2022). Le fichier est autonome : il ne lit que des
 * modules avec leur extension, parce qu'on le lance directement avec Node.
 * Capacités : cadre 2025, maths-sexp 2.4.1, 2.4.4, 2.4.8, 2.4.9 et maths-sm 2.2.1, 2.2.3, 2.2.5, 2.2.6.
 */

/* ---------- fractions et complexes exacts ---------- */
const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));
const Q = (n, d = 1) => {
  if (d < 0) { n = -n; d = -d; }
  const g = pgcd(n, d) || 1;
  return [n / g, d / g];
};
const q = (x) => (Array.isArray(x) ? Q(x[0], x[1]) : Q(x, 1));
const qadd = (a, b) => { a = q(a); b = q(b); return Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); };
const qmul = (a, b) => { a = q(a); b = q(b); return Q(a[0] * b[0], a[1] * b[1]); };
const qneg = (a) => { a = q(a); return Q(-a[0], a[1]); };
const qsub = (a, b) => qadd(a, qneg(b));
const qdiv = (a, b) => { a = q(a); b = q(b); return Q(a[0] * b[1], a[1] * b[0]); };
const qnum = (a) => { a = q(a); return a[0] / a[1]; };
const C = (a = 0, b = 0) => ({ re: q(a), im: q(b) });
const cadd = (a, b) => C(qadd(a.re, b.re), qadd(a.im, b.im));
const csub = (a, b) => C(qsub(a.re, b.re), qsub(a.im, b.im));
const cneg = (a) => C(qneg(a.re), qneg(a.im));
const cconj = (a) => C(a.re, qneg(a.im));
const cmul = (a, b) => C(qsub(qmul(a.re, b.re), qmul(a.im, b.im)), qadd(qmul(a.re, b.im), qmul(a.im, b.re)));
const cmod2 = (a) => qadd(qmul(a.re, a.re), qmul(a.im, a.im));
const cdiv = (a, b) => { const d = cmod2(b), n = cmul(a, cconj(b)); return C(qdiv(n.re, d), qdiv(n.im, d)); };
const cscal = (k, a) => C(qmul(k, a.re), qmul(k, a.im));
const ckey = (a) => `${q(a.re)}|${q(a.im)}`;
const ceq = (a, b) => ckey(a) === ckey(b);
const sqrtInt = (n) => { let k = 1, m = n; for (let f = 2; f * f <= m; f++) while (m % (f * f) === 0) { m /= f * f; k *= f; } return [k, m]; };

/* ---------- TeX ---------- */
const qt = (a) => { const [n, d] = q(a); return d === 1 ? `${n}` : n < 0 ? `-\\dfrac{${-n}}{${d}}` : `\\dfrac{${n}}{${d}}`; };
const absCoef = (a) => { const [n, d] = q(a); const m = Math.abs(n); return d === 1 ? String(m) : `\\dfrac{${m}}{${d}}`; };
const ct = (z) => {
  const [rn] = z.re, [cn, cd] = z.im;
  const re = rn !== 0 ? qt(z.re) : "";
  if (cn === 0) return re || "0";
  const im = Math.abs(cn) === cd ? "i" : `${absCoef(z.im)}i`;
  if (!re) return (cn < 0 ? "-" : "") + im;
  return `${re}${cn < 0 ? "-" : "+"}${im}`;
};
const D = (s) => `$${s}$`;
const dz = (z) => D(ct(z));
/** k√m en TeX : 5, \sqrt{13}, 2\sqrt{2} */
const racTex = (n) => { const [k, m] = sqrtInt(n); return m === 1 ? `${k}` : `${k === 1 ? "" : k}\\sqrt{${m}}`; };
/** n^e, avec des parenthèses autour d'un négatif : (-6)^2 */
const pw = (n, e) => (n < 0 ? `(${n})^${e}` : `${n}^${e}`);
const sgn = (k) => (k < 0 ? `- ${-k}` : `+ ${k}`);
/** la longueur q√r écrite : 1, 2, \sqrt{3}, 2\sqrt{3}, \dfrac{3}{2} (jamais vide) */
const mag = (qc, r) => { const k = absCoef(qc); return r === 1 ? k : (k === "1" ? "" : k) + `\\sqrt{${r}}`; };
/** un complexe de la forme p ± q√r i (p et q fractions, r = 1 ou 3), ou sans le i quand `avecI` est faux */
const rootTex = (p, qc, r, signe, avecI = true) => {
  const re = qt(p) === "0" ? "" : qt(p);
  const m = mag(qc, r), s = signe < 0 ? "-" : "+";
  const im = avecI ? (m === "1" ? "" : m) + "i" : m;
  return re ? `${re}${s}${im}` : (signe < 0 ? "-" : "") + im;
};
/** toutes les options, textes distincts : sinon le tirage est refait */
const distincts = (t) => new Set(t).size === t.length;
const opts = (h, bonne, fautes) => h.melange([{ t: bonne, ok: true }, ...fautes]);
const tirer = (h, f, bon) => { let r; let essais = 0; do { r = f(); essais++; } while (!bon(r) && essais < 200); return r; };
/** az² + bz + c écrit en TeX, sans coefficient 0 ni 1 inutile */
const poly2 = (a, b, c) => `${a === 1 ? "" : a}z^2${b ? ` ${b < 0 ? "-" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}z` : ""}${c ? ` ${c < 0 ? "-" : "+"} ${Math.abs(c)}` : ""}`;
const nonNul = (h, a, b) => { let v; do v = h.int(a, b); while (!v); return v; };

export const EXERCICES = [
  /* 1 — la forme algébrique : parties réelle et imaginaire, égalité, imaginaire pur */
  {
    id: "forme-algebrique",
    titre: "Parties réelle et imaginaire, égalité de deux complexes",
    niveau: 1,
    capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"],
    erreurs: ["le i gardé dans la partie imaginaire", "parties réelle et imaginaire échangées", "le i gardé dans l’inconnue réelle d’une égalité", "imaginaire pur : la mauvaise partie annulée"],
    gen(h) {
      const [a, b] = tirer(h, () => [nonNul(h, -6, 6), nonNul(h, -6, 6)], ([a, b]) => a !== b);
      const im = opts(h, D(b), [
        { t: dz(C(0, b)), fb: "Tu as gardé le $i$ dans la partie imaginaire. $\\mathrm{Im}(z)$ est un réel : le coefficient de $i$.", erreur: "le i gardé dans la partie imaginaire" },
        { t: D(a), fb: "Tu as donné la partie réelle, l’abscisse du point. La partie imaginaire est l’ordonnée : le coefficient de $i$.", erreur: "parties réelle et imaginaire échangées" },
      ]);
      // (px + q) + (ry + s)i = u + vi
      const e = tirer(h, () => {
        const p = h.pick([2, 3, -2, 4]), r = h.pick([1, 2, -1, 3]), x = nonNul(h, -5, 5), y = nonNul(h, -5, 5), qq = nonNul(h, -5, 5), s = nonNul(h, -5, 5);
        return { p, r, x, y, qq, s, u: p * x + qq, v: r * y + s };
      }, (e) => {
        const sw = [qdiv(Q(e.v - e.qq), Q(e.p)), qdiv(Q(e.u - e.s), Q(e.r))];
        const ig = C(qdiv(Q(-e.s), Q(e.r)), qdiv(Q(e.v), Q(e.r)));
        return distincts([`${e.x}|${e.y}`, `${sw[0]}|${sw[1]}`, ckey(ig)]) && qnum(sw[0]) !== e.x && ig.im[0] !== 0;
      });
      const sw = [qdiv(Q(e.v - e.qq), Q(e.p)), qdiv(Q(e.u - e.s), Q(e.r))];
      const ig = C(qdiv(Q(-e.s), Q(e.r)), qdiv(Q(e.v), Q(e.r)));
      const eq = opts(h, D(`x = ${e.x} \\text{ et } y = ${e.y}`), [
        { t: D(`x = ${qt(sw[0])} \\text{ et } y = ${qt(sw[1])}`), fb: "Tu as comparé la partie réelle d’un côté à la partie imaginaire de l’autre. On compare abscisse avec abscisse, ordonnée avec ordonnée.", erreur: "parties réelle et imaginaire échangées" },
        { t: D(`x = ${e.x} \\text{ et } y = ${ct(ig)}`), fb: "Tu as gardé le $i$ dans la partie imaginaire. Ici $y$ est un réel : $ry + s = v$, sans $i$.", erreur: "le i gardé dans l’inconnue réelle d’une égalité" },
      ]);
      // imaginaire pur : (m − k) + (m + j)i
      const [k, j] = tirer(h, () => [nonNul(h, -5, 5), nonNul(h, -5, 5)], ([k, j]) => k !== -j && k !== j);
      return {
        enonce: "<p>On travaille avec des complexes écrits sous la forme algébrique $a + ib$ ($a$ et $b$ réels).</p>",
        questions: [
          { type: "qcm", q: `Quelle est la partie imaginaire de $z = ${ct(C(a, b))}$ ?`, options: im },
          { type: "qcm", q: `Les réels $x$ et $y$ vérifient $(${e.p}x ${sgn(e.qq)}) + (${e.r === 1 ? "" : e.r === -1 ? "-" : e.r}y ${sgn(e.s)})i = ${ct(C(e.u, e.v))}$. Que valent-ils ?`, options: eq },
          { type: "nombre", q: `Pour quelle valeur du réel $m$ le nombre $(m ${sgn(-k)}) + (m ${sgn(j)})i$ est-il imaginaire pur ?`, reponse: k, tol: { abs: 0.01 }, indice: "Un imaginaire pur a une partie réelle nulle.",
            pieges: [{ v: -j, fb: "Tu as annulé la partie imaginaire : le nombre serait réel. Un imaginaire pur a sa partie réelle nulle.", erreur: "imaginaire pur : la mauvaise partie annulée" }] },
        ],
        correction: [
          { tex: `\\mathrm{Im}(${ct(C(a, b))}) = ${b}`, r: "La partie imaginaire est un réel : le coefficient de $i$." },
          { tex: `${e.p}x ${sgn(e.qq)} = ${e.u} \\quad\\text{et}\\quad ${e.r === 1 ? "" : e.r === -1 ? "-" : e.r}y ${sgn(e.s)} = ${e.v}`, r: "On égale les parties réelles, puis les parties imaginaires." },
          { tex: `x = ${e.x}, \\quad y = ${e.y}`, r: "Chaque équation donne un réel." },
          { tex: `m ${sgn(-k)} = 0 \\iff m = ${k}`, r: "Imaginaire pur : partie réelle nulle." },
        ],
      };
    },
  },

  /* 2 — le produit, le carré, les puissances de i */
  {
    id: "produit",
    titre: "Produit, carré et puissances de $i$",
    niveau: 1,
    capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"],
    erreurs: ["i² pris pour +1", "produit fait terme à terme", "(a + b)² lu a² + b²", "cycle des puissances de i mal compté"],
    gen(h) {
      const p = tirer(h, () => ({ a: h.int(-5, 5), b: nonNul(h, -5, 5), c: h.int(-5, 5), d: nonNul(h, -5, 5) }), () => true);
      const z = C(p.a, p.b), w = C(p.c, p.d);
      const ok = cmul(z, w), i2 = C(p.a * p.c + p.b * p.d, p.a * p.d + p.b * p.c), tt = C(p.a * p.c, p.b * p.d);
      const prod = opts(h, dz(ok), [
        { t: dz(i2), fb: "Tu as pris $i^2 = +1$ : le terme $bd\\,i^2$ prend alors le mauvais signe. Or $i^2 = -1$.", erreur: "i² pris pour +1" },
        { t: dz(tt), fb: "Tu as multiplié terme à terme, réel par réel et imaginaire par imaginaire. Il y a quatre termes à développer.", erreur: "produit fait terme à terme" },
      ]);
      const s = tirer(h, () => ({ a: nonNul(h, -5, 5), b: nonNul(h, -4, 4) }), () => true);
      const zs = C(s.a, s.b);
      const car = cmul(zs, zs), sansDouble = C(s.a * s.a - s.b * s.b), i2c = C(s.a * s.a + s.b * s.b, 2 * s.a * s.b);
      const carre = opts(h, dz(car), [
        { t: dz(sansDouble), fb: "Tu as lu $(a + b)^2$ comme $a^2 + b^2$ : le double produit $2ab\\,i$ manque.", erreur: "(a + b)² lu a² + b²" },
        { t: dz(i2c), fb: "Tu as pris $i^2 = +1$ : le terme $b^2 i^2$ vaut $-b^2$, pas $+b^2$.", erreur: "i² pris pour +1" },
      ]);
      const n = h.int(5, 40), r = n % 4, pu = [C(1), C(0, 1), C(-1), C(0, -1)];
      const puis = opts(h, dz(pu[r]), [
        { t: dz(pu[(r + 1) % 4]), fb: "Tu as décalé le cycle d’un cran. Les puissances de $i$ se répètent de 4 en 4 : $i^4 = 1$, donc on cherche le reste de $n$ dans la division par 4.", erreur: "cycle des puissances de i mal compté" },
        { t: dz(pu[(r + 3) % 4]), fb: "Tu as décalé le cycle d’un cran dans l’autre sens. Les puissances de $i$ se répètent de 4 en 4 : $i^4 = 1$.", erreur: "cycle des puissances de i mal compté" },
      ]);
      return {
        enonce: "<p>On développe avec $i^2 = -1$.</p>",
        questions: [
          { type: "qcm", q: `Que vaut $(${ct(z)})(${ct(w)})$ ?`, options: prod },
          { type: "qcm", q: `Que vaut $(${ct(zs)})^2$ ?`, options: carre },
          { type: "qcm", q: `Que vaut $i^{${n}}$ ?`, options: puis },
        ],
        correction: [
          { tex: `(${ct(z)})(${ct(w)}) = ${ct(ok)}`, r: "On développe les quatre termes, puis $i^2 = -1$." },
          { tex: `(${ct(zs)})^2 = ${ct(car)}`, r: "Le double produit est $2ab\\,i$." },
          { tex: `i^{${n}} = i^{${r}} = ${ct(pu[r])}`, r: `$${n} = 4 \\times ${Math.floor(n / 4)} + ${r}$ : on garde le reste.` },
        ],
      };
    },
  },

  /* 3 — le quart de tour : iz, −z, z̄ */
  {
    id: "quart-de-tour",
    titre: "Le quart de tour : $iz$, $-z$ et $\\bar z$",
    niveau: 1,
    capacites: ["maths-sm 2.2.3", "maths-sexp 2.4.4"],
    erreurs: ["multiplier par i = échanger les parties", "conjugué pris pour l’opposé", "conjugué pris pour la symétrie d’axe vertical", "quart de tour pris pour un demi-tour"],
    gen(h) {
      const [a, b] = tirer(h, () => [nonNul(h, -4, 4), nonNul(h, -4, 4)], ([a, b]) => a + b !== 0 && a !== b);
      const z = C(a, b);
      const iz = C(-b, a), echange = C(b, a), opp = C(-a, -b);
      const q1 = opts(h, dz(iz), [
        { t: dz(echange), fb: "Tu as échangé les parties réelle et imaginaire. Mais $i \\times ib = i^2 b = -b$ : l’abscisse change de signe.", erreur: "multiplier par i = échanger les parties" },
        { t: dz(opp), fb: "Tu as pris $i$ pour $-1$ : cela donne un demi-tour. Multiplier par $i$ est un quart de tour.", erreur: "quart de tour pris pour un demi-tour" },
      ]);
      const conj = C(a, -b), vert = C(-a, b);
      const q2 = opts(h, dz(conj), [
        { t: dz(opp), fb: "Tu as pris le conjugué pour l’opposé. Le conjugué change le signe de la partie imaginaire seulement : c’est un miroir d’axe des réels.", erreur: "conjugué pris pour l’opposé" },
        { t: dz(vert), fb: "Tu as changé le signe de la partie réelle. Le conjugué change le signe de la partie imaginaire : le miroir est l’axe des réels, pas l’axe vertical.", erreur: "conjugué pris pour la symétrie d’axe vertical" },
      ]);
      const q3 = opts(h, "un demi-tour autour de $O$", [
        { t: "un quart de tour autour de $O$", fb: "Tu as compté une seule multiplication par $i$. Multiplier par $i^2 = -1$ fait deux quarts de tour.", erreur: "quart de tour pris pour un demi-tour" },
        { t: "la symétrie par rapport à l’axe des réels", fb: "Tu as pris la multiplication par $i^2$ pour le conjugué. Multiplier par $-1$ est la symétrie de centre $O$.", erreur: "conjugué pris pour l’opposé" },
      ]);
      return {
        enonce: `<p>Le point $M$ a pour affixe $z = ${ct(z)}$ dans un repère orthonormé.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’affixe de $iz$ ?", options: q1 },
          { type: "qcm", q: "Quelle est l’affixe de $\\bar z$ ?", options: q2 },
          { type: "qcm", q: "Le point d’affixe $i^2 z$ est l’image de $M$ par…", options: q3 },
        ],
        correction: [
          { tex: `i(${ct(z)}) = ${ct(iz)}`, r: "$(a ; b)$ devient $(-b ; a)$ : un quart de tour autour de $O$, à la même distance." },
          { tex: `\\bar z = ${ct(conj)}`, r: "On change le signe de la partie imaginaire : le symétrique par rapport à l’axe des réels." },
          { tex: "i^2 z = -z", r: "Deux quarts de tour font un demi-tour : la symétrie de centre $O$." },
        ],
      };
    },
  },

  /* 4 — le conjugué */
  {
    id: "conjugue",
    titre: "Le conjugué : $z\\bar z$, $z + \\bar z$, produit",
    niveau: 2,
    capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"],
    erreurs: ["z + z̄ et z − z̄ confondus", "conjugué pris pour l’opposé", "z z̄ calculé comme a² − b²", "z² pris pour z z̄", "conjugué d’un produit mal formé"],
    gen(h) {
      const [a, b] = tirer(h, () => [nonNul(h, -6, 6), nonNul(h, -6, 6)], ([a, b]) => Math.abs(a) !== Math.abs(b));
      const z = C(a, b), zz = C(a * a + b * b), moins = C(a * a - b * b), carre = cmul(z, z);
      const q1 = opts(h, dz(zz), [
        { t: dz(moins), fb: "Tu as oublié $i^2 = -1$ : $(ib)^2 = -b^2$, donc $a^2 - (-b^2) = a^2 + b^2$.", erreur: "z z̄ calculé comme a² − b²" },
        { t: dz(carre), fb: "Tu as calculé $z^2$, pas $z\\bar z$. Dans le second facteur, il y a un signe moins : $(a + ib)(a - ib)$.", erreur: "z² pris pour z z̄" },
      ]);
      const q2 = opts(h, dz(C(2 * a)), [
        { t: dz(C(0, 2 * b)), fb: "Tu as calculé $z - \\bar z$. Dans la somme, ce sont les parties imaginaires qui s’annulent.", erreur: "z + z̄ et z − z̄ confondus" },
        { t: dz(C(0)), fb: "Tu as pris le conjugué pour l’opposé. $z + \\bar z = 2a$ : les parties réelles s’ajoutent.", erreur: "conjugué pris pour l’opposé" },
      ]);
      const [c, d] = tirer(h, () => [nonNul(h, -4, 4), nonNul(h, -4, 4)], ([c, d]) => {
        const w = C(c, d), p = cmul(z, w), ok = cconj(p);
        return distincts([ckey(ok), ckey(p), ckey(cmul(z, cconj(w)))]) && p.im[0] !== 0;
      });
      const w = C(c, d), pr = cmul(z, w);
      const q3 = opts(h, dz(cconj(pr)), [
        { t: dz(pr), fb: "Tu as oublié de prendre le conjugué : on demande $\\overline{zw}$, pas $zw$.", erreur: "conjugué d’un produit mal formé" },
        { t: dz(cmul(z, cconj(w))), fb: "Tu as conjugué un seul facteur. Le conjugué d’un produit est le produit des conjugués des deux facteurs.", erreur: "conjugué d’un produit mal formé" },
      ]);
      return {
        enonce: `<p>Soit $z = ${ct(z)}$ et $w = ${ct(w)}$.</p>`,
        questions: [
          { type: "qcm", q: "Que vaut $z\\bar z$ ?", options: q1 },
          { type: "qcm", q: "Que vaut $z + \\bar z$ ?", options: q2 },
          { type: "qcm", q: "Que vaut $\\overline{zw}$ ?", options: q3 },
        ],
        correction: [
          { tex: `z\\bar z = ${pw(a, 2)} + ${pw(b, 2)} = ${a * a + b * b}`, r: "$(a + ib)(a - ib) = a^2 + b^2$ : un réel positif." },
          { tex: `z + \\bar z = 2a = ${2 * a}`, r: "Les parties imaginaires s’annulent : un réel." },
          { tex: `\\overline{zw} = \\bar z\\,\\bar w = ${ct(cconj(pr))}`, r: "Le conjugué d’un produit est le produit des conjugués." },
        ],
      };
    },
  },

  /* 5 — le quotient */
  {
    id: "quotient",
    titre: "Le quotient de deux complexes",
    niveau: 2,
    capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"],
    erreurs: ["conjugué appliqué au dénominateur seul", "dénominateur c² − d² (i² oublié)", "quotient renversé"],
    gen(h) {
      const paires = [[1, 1], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [1, 4], [4, 1], [3, 4], [4, 3]];
      const r = tirer(h, () => {
        const [c0, d0] = h.pick(paires), c = c0 * h.pick([1, -1]), d = d0 * h.pick([1, -1]);
        return { a: nonNul(h, -5, 5), b: nonNul(h, -5, 5), c, d };
      }, (r) => {
        const z = C(r.a, r.b), w = C(r.c, r.d), N = r.c * r.c + r.d * r.d, f = r.c * r.c - r.d * r.d;
        if (!f) return false;
        const num = cmul(z, cconj(w));
        const ok = cdiv(z, w), f1 = cscal(Q(1, N), z), f2 = cscal(Q(1, f), num), f3 = cdiv(w, z);
        return distincts([ckey(ok), ckey(f1), ckey(f2), ckey(f3)]);
      });
      const z = C(r.a, r.b), w = C(r.c, r.d), N = r.c * r.c + r.d * r.d, f = r.c * r.c - r.d * r.d;
      const num = cmul(z, cconj(w));
      const q1 = opts(h, dz(cdiv(z, w)), [
        { t: dz(cscal(Q(1, N), z)), fb: "Tu as multiplié par le conjugué le dénominateur seulement. En haut et en bas, sinon la valeur change.", erreur: "conjugué appliqué au dénominateur seul" },
        { t: dz(cscal(Q(1, f), num)), fb: `Tu as oublié $i^2 = -1$ au dénominateur : $(${ct(w)})(${ct(cconj(w))}) = c^2 + d^2 = ${N}$, pas $c^2 - d^2$.`, erreur: "dénominateur c² − d² (i² oublié)" },
        { t: dz(cdiv(w, z)), fb: "Tu as renversé le quotient : on divise $z$ par $w$, pas $w$ par $z$.", erreur: "quotient renversé" },
      ]);
      return {
        enonce: `<p>Soit $z = ${ct(z)}$ et $w = ${ct(w)}$.</p>`,
        questions: [{ type: "qcm", q: "Quelle est la forme algébrique de $\\dfrac{z}{w}$ ?", options: q1 }],
        correction: [
          { tex: `\\dfrac{z}{w} = \\dfrac{(${ct(z)})(${ct(cconj(w))})}{(${ct(w)})(${ct(cconj(w))})}`, r: "On multiplie en haut et en bas par le conjugué du dénominateur." },
          { tex: `= \\dfrac{${ct(num)}}{${N}}`, r: `Le dénominateur vaut $c^2 + d^2 = ${N}$, un réel.` },
          { tex: `= ${ct(cdiv(z, w))}`, r: "On sépare partie réelle et partie imaginaire." },
        ],
      };
    },
  },

  /* 6 — module, distance, module d'un produit */
  {
    id: "module-distance",
    titre: "Module et distance",
    niveau: 2,
    capacites: ["maths-sexp 2.4.4", "maths-sm 2.2.3"],
    erreurs: ["module = a + b", "module sans la racine", "distance lue sur |z_B| au lieu de |z_B − z_A|", "module d’un produit lu comme une somme"],
    gen(h) {
      const T = [[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [8, 6], [8, 15], [15, 8]];
      const [a0, b0] = h.pick(T), a = a0 * h.pick([1, -1]), b = b0 * h.pick([1, -1]);
      const mod = Math.hypot(a, b);
      // AB = |z_B − z_A|
      const g = tirer(h, () => ({ xa: h.int(-5, 5), ya: nonNul(h, -5, 5), xb: h.int(-5, 5), yb: nonNul(h, -5, 5) }), (g) => {
        const dx = g.xb - g.xa, dy = g.yb - g.ya;
        if (!dx || !dy) return false;
        const ok = racTex(dx * dx + dy * dy), ob = racTex(g.xb * g.xb + g.yb * g.yb), somme = String(Math.abs(dx) + Math.abs(dy));
        return distincts([ok, ob, somme]);
      });
      const A = C(g.xa, g.ya), B = C(g.xb, g.yb), df = csub(B, A);
      const dist = opts(h, D(racTex(cmod2(df)[0])), [
        { t: D(racTex(cmod2(B)[0])), fb: "Tu as calculé $OB = |z_B|$, la distance de $B$ à l’origine. $AB$ est la distance de $A$ à $B$ : il faut la différence $z_B - z_A$.", erreur: "distance lue sur |z_B| au lieu de |z_B − z_A|" },
        { t: D(String(Math.abs(df.re[0]) + Math.abs(df.im[0]))), fb: "Tu as additionné les valeurs absolues des parties réelle et imaginaire. Le module est une racine de somme de carrés, comme Pythagore.", erreur: "module = a + b" },
      ]);
      const [u0, w0] = tirer(h, () => [h.pick([[3, 4], [5, 12], [8, 6]]), h.pick([[4, 3], [12, 5], [6, 8], [15, 8]])], ([x, y]) => Math.hypot(...x) !== Math.hypot(...y));
      const mz = Math.hypot(...u0), mw = Math.hypot(...w0);
      return {
        enonce: `<p>Le plan est rapporté à un repère orthonormé. On donne $z = ${ct(C(a, b))}$, $A(${ct(A)})$ et $B(${ct(B)})$.</p>`,
        questions: [
          { type: "nombre", q: "Que vaut $|z|$ ?", reponse: mod, tol: { abs: 0.01 }, indice: "Le module est la distance de $O$ au point : un théorème de Pythagore.",
            pieges: [{ v: Math.abs(a) + Math.abs(b), fb: "Tu as additionné $|a|$ et $|b|$. Le module est $\\sqrt{a^2 + b^2}$, pas $|a| + |b|$.", erreur: "module = a + b" }, { v: a * a + b * b, fb: "Tu as oublié la racine : $a^2 + b^2$ est le carré du module.", erreur: "module sans la racine" }] },
          { type: "qcm", q: "Quelle est la distance $AB$ ?", options: dist },
          { type: "nombre", q: `On donne $|u| = ${mz}$ et $|w| = ${mw}$. Que vaut $|uw|$ ?`, reponse: mz * mw, tol: { abs: 0.01 }, indice: "Le module d’un produit est le produit des modules.",
            pieges: [{ v: mz + mw, fb: "Tu as additionné les modules. Le module d’un produit est le produit des modules : $|uw| = |u|\\,|w|$.", erreur: "module d’un produit lu comme une somme" }] },
        ],
        correction: [
          { tex: `|z| = \\sqrt{${pw(a, 2)} + ${pw(b, 2)}} = ${mod}`, r: "Le module est la racine de $a^2 + b^2$." },
          { tex: `AB = |z_B - z_A| = |${ct(df)}| = ${racTex(cmod2(df)[0])}`, r: "La distance est le module de la différence des affixes." },
          { tex: `|uw| = |u|\\,|w| = ${mz} \\times ${mw} = ${mz * mw}`, r: "Pour un produit, les modules se multiplient." },
        ],
      };
    },
  },

  /* 7 — l'ensemble des points tels que |z − ω| = r */
  {
    id: "ensemble-points",
    titre: "Un cercle donné par un module",
    niveau: 2,
    capacites: ["maths-sexp 2.4.4", "maths-sm 2.2.3"],
    erreurs: ["centre de signe opposé", "rayon r² au lieu de r", "|z + k| lu |z| + k"],
    gen(h) {
      const W = tirer(h, () => {
        const f = h.int(0, 2), k = h.int(2, 4);
        return { w: f === 0 ? C(h.pick([-1, 1]) * k) : f === 1 ? C(0, h.pick([-1, 1]) * k) : C(nonNul(h, -4, 4), nonNul(h, -4, 4)), r: h.int(2, 5) };
      }, () => true);
      const { w, r } = W;
      const p = cneg(w);
      const expr = p.im[0] === 0 ? `z ${p.re[0] < 0 ? "-" : "+"} ${Math.abs(p.re[0])}` : p.re[0] === 0 ? `z ${p.im[0] < 0 ? "-" : "+"} ${Math.abs(p.im[0]) === 1 ? "" : Math.abs(p.im[0])}i` : `z + (${ct(p)})`;
      const [lib, val, valp] = w.re[0] !== 0 ? ["la partie réelle", qnum(w.re), qnum(p.re)] : ["la partie imaginaire", qnum(w.im), qnum(p.im)];
      const centre = (x) => `$\\text{le cercle de centre } ${ct(x)} \\text{ et de rayon } ${r}$`;
      const q1 = opts(h, centre(w), [
        { t: centre(p), fb: `Tu as pris pour centre l’affixe qui apparaît dans l’égalité. $|z - \\omega| = r$ est la distance de $M$ à $\\omega$ : ici $${expr} = z - (${ct(w)})$, donc le centre est $${ct(w)}$.`, erreur: "centre de signe opposé" },
        { t: `$\\text{le cercle de centre } ${ct(w)} \\text{ et de rayon } ${r * r}$`, fb: "Tu as pris le carré du rayon. Dans $|z - \\omega| = r$, le rayon est $r$ lui-même.", erreur: "rayon r² au lieu de r" },
        { t: `$\\text{le cercle de centre } O \\text{ et de rayon } ${r}$`, fb: "Tu as lu $|z + k|$ comme $|z| + k$. Le module d’une somme n’est pas la somme des modules : $|z - \\omega|$ est la distance à un point fixe.", erreur: "|z + k| lu |z| + k" },
      ]);
      return {
        enonce: `<p>Le plan est rapporté à un repère orthonormé. $M$ est le point d’affixe $z$.</p><p>On considère l’ensemble $(E)$ des points $M$ tels que $|${expr}| = ${r}$.</p>`,
        questions: [
          { type: "qcm", q: "L’ensemble $(E)$ est…", options: q1 },
          { type: "nombre", q: `Quelle est ${lib} de l’affixe du centre de $(E)$ ?`, reponse: val, tol: { abs: 0.01 }, indice: `Écris $|${expr}|$ sous la forme $|z - \\omega|$.`,
            pieges: [{ v: valp, fb: "Tu as lu la valeur dans l’égalité sans changer le signe. $z + k = z - (-k)$ : le centre est $-k$.", erreur: "centre de signe opposé" }] },
        ],
        correction: [
          { tex: `|${expr}| = |z - (${ct(w)})| = ${r}`, r: "On écrit le module comme une distance : $|z - \\omega|$." },
          { tex: `\\text{cercle de centre } ${ct(w)}, \\text{ de rayon } ${r}`, r: "$M$ est à la distance $r$ du point d’affixe $\\omega$." },
        ],
      };
    },
  },

  /* 8 — le second degré à coefficients réels, Δ < 0 */
  {
    id: "second-degre-reel",
    titre: "Une équation du second degré à coefficients réels, $\\Delta < 0$",
    niveau: 2,
    capacites: ["maths-sexp 2.4.8", "maths-sm 2.2.5"],
    erreurs: ["Δ < 0 : aucune solution", "a oublié au dénominateur", "signe de −b perdu", "√(−Δ) écrit sans le i", "a oublié dans 4ac", "signe de −4ac perdu dans Δ"],
    gen(h) {
      const T = tirer(h, () => {
        const p2 = h.int(-6, 6), p = Q(p2, 2), irr = h.pick([false, false, true]);
        const m = irr ? h.int(1, 3) : h.int(1, 8);          // q = m/2 (halves) or q = m√3 / 1
        const qc = irr ? Q(m, 1) : Q(m, 2), r3 = irr ? 3 : 1;
        const q2 = irr ? qmul(qc, qc) : qmul(qc, qc);        // q² (avec √3² = 3)
        const q2r = irr ? qmul(q2, Q(3, 1)) : q2;
        const a = [1, 2, 4].find((a) => qmul(Q(a), qadd(qmul(p, p), q2r))[1] === 1 && qmul(Q(2 * a), p)[1] === 1);
        return { p, qc, r3, a, q2r };
      }, (T) => T.a !== undefined && (T.p[0] !== 0 || T.a > 1));
      const { p, qc, r3, a, q2r } = T;
      const b = -qnum(qmul(Q(2 * a), p)), c = qnum(qmul(Q(a), qadd(qmul(p, p), q2r)));
      const delta = b * b - 4 * a * c;
      const polBon = poly2(a, b, c);
      const sol = (pp, qq, rr) => `$z = ${rootTex(pp, qq, rr, -1)} \\text{ ou } z = ${rootTex(pp, qq, rr, 1)}$`;
      const bonne = sol(p, qc, r3);
      const fautes = [{ t: "aucune solution", fb: "Tu as conclu comme dans $\\mathbb{R}$ : $\\Delta < 0$, aucune solution. Dans $\\mathbb{C}$, il y a deux solutions conjuguées.", erreur: "Δ < 0 : aucune solution" }];
      if (p[0] !== 0) fautes.push({ t: sol(qneg(p), qc, r3), fb: "Tu as perdu le signe de $-b$ : la partie réelle est $-\\dfrac{b}{2a}$.", erreur: "signe de −b perdu" });
      if (a > 1) fautes.push({ t: sol(qmul(p, Q(a)), qmul(qc, Q(a)), r3), fb: "Tu as oublié $a$ au dénominateur : les solutions sont $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$, pas $\\dfrac{\\dots}{2}$.", erreur: "a oublié au dénominateur" });
      fautes.push({ t: `$z = ${rootTex(p, qc, r3, -1, false)} \\text{ ou } z = ${rootTex(p, qc, r3, 1, false)}$`, fb: "Tu as écrit $\\sqrt{-\\Delta}$ sans le $i$ : les solutions ne sont pas réelles. Elles s’écrivent $\\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.", erreur: "√(−Δ) écrit sans le i" });
      const vus = new Set([bonne]);
      const sols = fautes.filter((f) => !vus.has(f.t) && vus.add(f.t));
      const q1 = opts(h, bonne, sols.slice(0, 3));
      const pieges = [{ v: b * b + 4 * a * c, fb: "Tu as perdu le signe de $-4ac$ : $\\Delta = b^2 - 4ac$.", erreur: "signe de −4ac perdu dans Δ" }];
      if (a > 1) pieges.push({ v: b * b - 4 * c, fb: "Tu as oublié $a$ dans $4ac$ : ici $a = " + a + "$.", erreur: "a oublié dans 4ac" });
      return {
        enonce: "<p>On résout dans $\\mathbb{C}$ une équation du second degré à coefficients réels.</p>",
        questions: [
          { type: "nombre", q: `Que vaut le discriminant de $${polBon} = 0$ ?`, reponse: delta, tol: { abs: 0.01 }, indice: "$\\Delta = b^2 - 4ac$.", pieges: pieges.filter((x) => Math.abs(x.v - delta) > 0.01) },
          { type: "qcm", q: `Quelles sont les solutions de $${polBon} = 0$ dans $\\mathbb{C}$ ?`, options: q1 },
        ],
        correction: [
          { tex: `\\Delta = ${pw(b, 2)} - 4 \\times ${a} \\times ${c} = ${delta}`, r: "Le discriminant est négatif." },
          { tex: `z = \\dfrac{${-b} \\pm i\\sqrt{${-delta}}}{${2 * a}}`, r: "$\\sqrt{-\\Delta}$ est la racine d’un nombre positif, devant le $i$." },
          { tex: `z = ${rootTex(p, qc, r3, -1)} \\text{ ou } z = ${rootTex(p, qc, r3, 1)}`, r: "Deux solutions conjuguées." },
        ],
      };
    },
  },

  /* 9 — équations qui se ramènent au second degré */
  {
    id: "se-ramene",
    titre: "Des équations qui se ramènent au second degré",
    niveau: 3,
    capacites: ["maths-sexp 2.4.9", "maths-sm 2.2.6"],
    erreurs: ["le retour de Z à z oublié", "une seule racine par valeur de Z", "Z < 0 rejeté comme dans ℝ", "Δ < 0 : aucune solution", "signe de −b perdu", "signe de la racine du facteur linéaire perdu"],
    gen(h) {
      // (z − r)(z² + bz + c) = 0, Δ < 0, p ≠ 0
      const A = tirer(h, () => ({ r: nonNul(h, -4, 4), p: nonNul(h, -3, 3), q: h.int(1, 4) }), () => true);
      const b = -2 * A.p, c = A.p * A.p + A.q * A.q;
      const lig = (r, p) => D(`${r} \\; ; \\; ${p === 0 ? "" : p}\\pm ${A.q === 1 ? "" : A.q}i`);
      const q1 = opts(h, lig(A.r, A.p), [
        { t: lig(-A.r, A.p), fb: "Tu as perdu le signe de la racine du facteur linéaire : $z - r = 0$ donne $z = r$.", erreur: "signe de la racine du facteur linéaire perdu" },
        { t: lig(A.r, -A.p), fb: "Tu as perdu le signe de $-b$ : la partie réelle des solutions du second degré est $-\\dfrac{b}{2}$.", erreur: "signe de −b perdu" },
        { t: D(`${A.r}`), fb: "Tu as rejeté le facteur du second degré parce que $\\Delta < 0$. Dans $\\mathbb{C}$, il donne deux solutions conjuguées.", erreur: "Δ < 0 : aucune solution" },
      ]);
      // bicarrée : (Z − Z1)(Z − Z2) avec z² = Z, au moins une valeur négative, somme non nulle
      const B = tirer(h, () => h.melange([-1, -4, -9, 1, 4]).slice(0, 2), (Zs) => Zs.some((x) => x < 0) && Zs[0] + Zs[1] !== 0);
      const s = B[0] + B[1], pr = B[0] * B[1];
      const rac1 = (Z) => (Z < 0 ? `${Math.sqrt(-Z) === 1 ? "" : Math.sqrt(-Z)}i` : `${Math.sqrt(Z)}`);
      const pm = (Z) => `\\pm ${rac1(Z)}`;
      const ok2 = D(`${pm(B[0])} \\text{ et } ${pm(B[1])}`);
      const fautes = [
        { t: D(`${B[0]} \\text{ et } ${B[1]}`), fb: "Tu as donné les solutions en $Z$. Il reste à revenir à $z$ : $z^2 = Z$.", erreur: "le retour de Z à z oublié" },
        { t: D(`${rac1(B[0])} \\text{ et } ${rac1(B[1])}`), fb: "Tu as pris une seule racine pour chaque $Z$. $z^2 = Z$ a deux solutions opposées.", erreur: "une seule racine par valeur de Z" },
      ];
      const pos = B.filter((Z) => Z > 0);
      fautes.push({ t: pos.length ? D(pos.map(pm).join(" \\text{ et } ")) : "aucune solution", fb: "Tu as rejeté les valeurs $Z < 0$ comme dans $\\mathbb{R}$. Dans $\\mathbb{C}$, $z^2 = Z$ a des solutions pour $Z < 0$ aussi.", erreur: "Z < 0 rejeté comme dans ℝ" });
      const vus = new Set([ok2]);
      const q2 = opts(h, ok2, fautes.filter((f) => !vus.has(f.t) && vus.add(f.t)));
      const poly = (a, bb, cc) => poly2(a, bb, cc);
      return {
        enonce: `<p>On résout dans $\\mathbb{C}$.</p><p>(1) $(z ${sgn(-A.r)})(${poly(1, b, c)}) = 0$ ; (2) $z^4 ${s > 0 ? "-" : "+"} ${Math.abs(s)}z^2 ${pr < 0 ? "-" : "+"} ${Math.abs(pr)} = 0$.</p>`,
        questions: [
          { type: "qcm", q: "Quelles sont les solutions de l’équation (1) ?", options: q1 },
          { type: "qcm", q: "Quelles sont les solutions de l’équation (2), en posant $Z = z^2$ ?", options: q2 },
        ],
        correction: [
          { tex: `z = ${A.r} \\quad\\text{ou}\\quad ${poly(1, b, c)} = 0`, r: "Un produit est nul si l’un des facteurs est nul." },
          { tex: `\\Delta = ${b * b - 4 * c}, \\quad z = ${A.p}\\pm ${A.q === 1 ? "" : A.q}i`, r: "Le facteur du second degré a deux solutions conjuguées." },
          { tex: `Z^2 ${s > 0 ? "-" : "+"} ${Math.abs(s)}Z ${pr < 0 ? "-" : "+"} ${Math.abs(pr)} = 0 \\iff Z = ${B[0]} \\text{ ou } Z = ${B[1]}`, r: "Le changement d’inconnue ramène au second degré." },
          { tex: `z^2 = ${B[0]} \\text{ ou } z^2 = ${B[1]}`, r: "On revient à $z$ : chaque $Z$ donne deux solutions opposées." },
        ],
      };
    },
  },

  /* 10 — SM : une racine carrée de Δ */
  {
    id: "racine-de-delta",
    titre: "Une racine carrée de $\\Delta$",
    niveau: 3,
    filieres: ["SM"],
    capacites: ["maths-sm 2.2.5"],
    erreurs: ["le signe de xy perdu", "Δ/2 pris pour une racine carrée", "partie réelle de Δ prise pour son module"],
    gen(h) {
      const [x, y] = tirer(h, () => [nonNul(h, -4, 4), nonNul(h, -4, 4)], ([x, y]) => Math.abs(x) !== Math.abs(y) && x > 0);
      const dl = C(x, y), Dd = cmul(dl, dl), re = x * x - y * y, im = 2 * x * y, mod = x * x + y * y;
      const demi = C(Q(re, 2), Q(im, 2));
      const q1 = opts(h, dz(dl), [
        { t: dz(C(x, -y)), fb: `Tu as perdu le signe de $xy$ : $2xy = ${im}$ ${im > 0 ? "> 0" : "< 0"}, donc $x$ et $y$ ont ${im > 0 ? "le même signe" : "des signes opposés"}.`, erreur: "le signe de xy perdu" },
        { t: dz(demi), fb: "Tu as divisé chaque partie de $\\Delta$ par 2. $\\delta^2 = \\Delta$ est une équation : on égale $x^2 - y^2$ et $2xy$ aux parties de $\\Delta$, on ne divise pas.", erreur: "Δ/2 pris pour une racine carrée" },
      ]);
      return {
        enonce: `<p>On cherche les nombres complexes $\\delta$ tels que $\\delta^2 = \\Delta$, avec $\\Delta = ${ct(Dd)}$.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est une racine carrée de $\\Delta$ ?", options: q1 },
          { type: "nombre", q: "Que vaut $|\\Delta|$ ?", reponse: mod, tol: { abs: 0.01 }, indice: "$|\\delta|^2 = |\\Delta|$, et $|\\delta|^2 = x^2 + y^2$.",
            pieges: [{ v: re, fb: "Tu as donné la partie réelle $x^2 - y^2$ au lieu du module. Le module de $\\Delta$ est $\\sqrt{\\mathrm{Re}^2 + \\mathrm{Im}^2}$, et il vaut $x^2 + y^2$.", erreur: "partie réelle de Δ prise pour son module" }].filter((p) => p.v !== mod) },
        ],
        correction: [
          { tex: `x^2 - y^2 = ${re} \\quad\\text{et}\\quad 2xy = ${im}`, r: "On égale parties réelles et parties imaginaires de $\\delta^2 = \\Delta$." },
          { tex: `x^2 + y^2 = |\\Delta| = ${mod}`, r: "Les modules sont égaux : $|\\delta|^2 = |\\Delta|$." },
          { tex: `\\delta = ${ct(dl)} \\quad\\text{ou}\\quad \\delta = ${ct(cneg(dl))}`, r: "Le signe de $2xy$ dit que $x$ et $y$ ont " + (im > 0 ? "le même signe" : "des signes opposés") + "." },
        ],
      };
    },
  },

  /* 11 — SM : coefficients complexes, somme et produit */
  {
    id: "second-degre-complexe",
    titre: "Second degré à coefficients complexes, somme et produit",
    niveau: 3,
    filieres: ["SM"],
    capacites: ["maths-sm 2.2.5", "maths-sm 2.2.6"],
    erreurs: ["racines supposées conjuguées malgré des coefficients complexes", "somme et produit échangés ou −b/a lu b/a", "δ mal choisi : son carré n’est pas Δ"],
    gen(h) {
      // le jeu de solutions est un ensemble : {z1, z2} et {z2, z1} sont le même, et chaque leurre est comparé à la bonne réponse par ses VALEURS
      const ens = (a, b) => [ckey(a), ckey(b)].sort().join(" ; ");
      const jeu = (z1, z2) => {
        const S_ = cadd(z1, z2), dl = csub(z1, z2);
        return {
          bonne: [z1, z2],
          conj: [z1, cconj(z1)],
          signe: [cneg(z1), cneg(z2)],
          dlConj: [cscal(Q(1, 2), cadd(S_, cconj(dl))), cscal(Q(1, 2), csub(S_, cconj(dl)))],
        };
      };
      const [z1, z2] = tirer(h, () => [C(nonNul(h, -3, 3), nonNul(h, -3, 3)), C(nonNul(h, -3, 3), nonNul(h, -3, 3))], ([u, v]) => {
        if (ceq(u, v) || ceq(v, cconj(u)) || ceq(cadd(u, v), C(0)) || ceq(cmul(u, v), cadd(u, v)) || ceq(cmul(u, v), cneg(cadd(u, v)))) return false;
        const J = jeu(u, v), cles = Object.values(J).map((x) => ens(...x));
        return new Set(cles).size === cles.length;
      });
      const S_ = cadd(z1, z2), P = cmul(z1, z2), bb = cneg(S_), dl = csub(z1, z2), Dl = cmul(dl, dl);
      const J = jeu(z1, z2);
      const sol = (a, b) => D(`${ct(a)} \\text{ et } ${ct(b)}`);
      const bonne = sol(...J.bonne);
      const fautes = [
        { t: sol(...J.conj), fb: "Tu as cherché des racines conjuguées par réflexe. Elles ne le sont que si les coefficients sont réels.", erreur: "racines supposées conjuguées malgré des coefficients complexes" },
        { t: sol(...J.signe), fb: "Tu as perdu le signe de $-b$ : $z = \\dfrac{-b \\pm \\delta}{2a}$.", erreur: "somme et produit échangés ou −b/a lu b/a" },
        { t: sol(...J.dlConj), fb: "Tu as employé le conjugué de $\\delta$. Vérifie $\\delta^2$ avant de l’employer : $\\delta^2 = \\Delta$ exige $\\delta = z_1 - z_2$ ou son opposé.", erreur: "δ mal choisi : son carré n’est pas Δ" },
      ];
      const sp = opts(h, dz(S_), [
        { t: dz(bb), fb: "Tu as lu la somme comme $\\dfrac{b}{a}$ au lieu de $-\\dfrac{b}{a}$. Contrôle sur $z^2 - 3z + 2 = 0$ : la somme des racines 1 et 2 vaut 3.", erreur: "somme et produit échangés ou −b/a lu b/a" },
        { t: dz(P), fb: "Tu as donné le produit à la place de la somme. Le terme constant est le produit des racines ; le coefficient de $z$ donne la somme.", erreur: "somme et produit échangés ou −b/a lu b/a" },
      ]);
      const eq = `z^2 - (${ct(S_)})z + (${ct(P)})`;
      return {
        enonce: `<p>On considère l’équation $(E)$ : $${eq} = 0$, d’inconnue complexe $z$. On admet que $\\Delta = (${ct(dl)})^2$.</p>`,
        questions: [
          { type: "qcm", q: "Quelles sont les solutions de $(E)$ ?", options: opts(h, bonne, fautes) },
          { type: "qcm", q: "Que vaut la somme $z_1 + z_2$ des solutions ?", options: sp },
        ],
        correction: [
          { tex: `z = \\dfrac{-b \\pm \\delta}{2} = \\dfrac{${ct(S_)} \\pm (${ct(dl)})}{2}`, r: "$\\delta^2 = \\Delta$ : $\\delta$ est donné par l’énoncé." },
          { tex: `z_1 = ${ct(z1)}, \\quad z_2 = ${ct(z2)}`, r: "Les deux solutions ne sont pas conjuguées : les coefficients ne sont pas réels." },
          { tex: `z_1 + z_2 = -\\dfrac{b}{a} = ${ct(S_)}`, r: "La somme vaut $-\\dfrac{b}{a}$, le produit $\\dfrac{c}{a}$." },
        ],
      };
    },
  },

  /* 12 — la fin d'un exercice du bac : deux cercles tangents (type 2022) */
  {
    id: "deux-cercles",
    titre: "Deux cercles : $z + \\bar z$ puis le point commun",
    niveau: 3,
    capacites: ["maths-sexp 2.4.4", "maths-sexp 2.4.1", "maths-sm 2.2.3"],
    erreurs: ["z − d lu avec le signe de d perdu", "z + z̄ lu Re(z)", "z + z̄ lu z", "|z| lu |Im(z)|"],
    gen(h) {
      const d = h.pick([-3, -2, 2, 3]), r1 = h.int(1, 3), r2 = Math.abs(d) + r1;
      const s = (r2 * r2 + d * d - r1 * r1) / d, re = s / 2, pt = Math.sign(d) * r2;
      const ok = C(pt), im = C(re, r2), imc = C(re, -r2);
      const q2 = opts(h, `$z = ${pt}$`, [
        { t: `$z = ${s}$`, fb: "Tu as lu $z + \\bar z$ comme $z$. Or $z + \\bar z = 2\\,\\mathrm{Re}(z)$ : $\\mathrm{Re}(z) = " + re + "$.", erreur: "z + z̄ lu z" },
        { t: `$z = ${ct(im)} \\text{ ou } z = ${ct(imc)}$`, fb: `Tu as lu $|z| = ${r2}$ comme $|\\mathrm{Im}(z)| = ${r2}$. Le module vérifie $\\mathrm{Re}(z)^2 + \\mathrm{Im}(z)^2 = ${r2 * r2}$, avec $\\mathrm{Re}(z) = ${re}$.`, erreur: "|z| lu |Im(z)|" },
      ]);
      return {
        enonce: `<p>Le plan est rapporté à un repère orthonormé. $D$ est le point d’affixe $d = ${d}$. $(\\Gamma)$ est le cercle de centre $D$ et de rayon ${r1}, $(\\Gamma')$ est le cercle de centre $O$ et de rayon ${r2}. Un point $M$ d’affixe $z$ appartient aux deux cercles.</p>`,
        questions: [
          { type: "nombre", q: "Que vaut $z + \\bar z$ ? (on remarquera que $|z| = " + r2 + "$)", reponse: s, tol: { abs: 0.01 }, indice: `$M \\in (\\Gamma)$ donne $|z - d|^2 = ${r1 * r1}$ ; développe avec $|w|^2 = w\\bar w$ et $z\\bar z = |z|^2 = ${r2 * r2}$.`,
            pieges: [{ v: -s, fb: "Tu as perdu le signe de $d$ : $z - d$ s’écrit $z - (" + d + ")$, et $d$ est réel, donc $\\bar d = d$.", erreur: "z − d lu avec le signe de d perdu" }, { v: re, fb: "Tu as donné $\\mathrm{Re}(z)$ au lieu de $z + \\bar z$. Or $z + \\bar z = 2\\,\\mathrm{Re}(z)$.", erreur: "z + z̄ lu Re(z)" }] },
          { type: "qcm", q: "Quel est le point commun des deux cercles ?", options: q2 },
        ],
        correction: [
          { tex: `|z ${sgn(-d)}|^2 = (z ${sgn(-d)})(\\bar z ${sgn(-d)}) = z\\bar z ${d < 0 ? "+" : "-"} ${Math.abs(d)}(z + \\bar z) + ${d * d}`, r: "$|w|^2 = w\\bar w$, et le conjugué d’un réel est lui-même." },
          { tex: `${r1 * r1} = ${r2 * r2} ${d < 0 ? "+" : "-"} ${Math.abs(d)}(z + \\bar z) + ${d * d} \\iff z + \\bar z = ${s}`, r: `On remplace $z\\bar z$ par $|z|^2 = ${r2 * r2}$.` },
          { tex: `\\mathrm{Re}(z) = ${re}, \\quad \\mathrm{Im}(z)^2 = ${r2 * r2} - ${re * re} = 0`, r: "$|z|^2 = \\mathrm{Re}(z)^2 + \\mathrm{Im}(z)^2$." },
          { tex: `z = ${pt}`, r: "Un seul point : les cercles sont tangents." },
        ],
      };
    },
  },
];
