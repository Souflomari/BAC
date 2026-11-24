/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Les suites numériques » (séance 1), deuxième partie : la dent de scie du médicament
 * (`doses`, copie adaptée de `interets` de l'exponentielle : même repère temps-valeur, même tracé au
 * fil des jours, même droite pointillée du plafond, même curseur verrouillé tant que le pari n'est
 * pas posé) et les tableaux de valeurs (`table`, adapté de la leçon exponentielle). Aucune couleur
 * écrite en dur : les classes de pilote.css seulement ; toutes les valeurs viennent de suites-outils.js.
 */
import { fr, ent, orbite, DOSE2, U_DOSE } from "./suites-outils";
import { sciF } from "./exponentielle-outils";

/** un nombre aussi exact que possible, à six décimales au plus : 1,75 ; 1,984375 ; 1,998047 */
export const fmt6 = (x) => { let d = 0; while (d < 6 && Math.abs(Number(x.toFixed(d)) - x) > 1e-12) d++; return fr(x, d); };

export function scenesB(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre } = O;

/* ---------- 1. l'énigme : un comprimé chaque matin, la dent de scie de la quantité ---------- */
const U2 = orbite(DOSE2.f, 0, 31);
scene("doses", {
  p: { n: 1, saw: 0, pts: 0, fin: 0, plaf: 0, bas: 0, tab: 0, dose2: 0 },
  X(t) { return 110 + 26.5 * t; },
  Y(q) { return 620 - (this.p.dose2 > 0.5 ? 110 : 190) * q; },
  // la quantité au temps t : le saut de +1 (ou +2) au matin n, puis e^{−(t−n) ln 2} jusqu'au matin suivant
  chemin(tmax) {
    const u = this.p.dose2 > 0.5 ? U2 : U_DOSE, X = (t) => this.X(t), Y = (q) => this.Y(q), pts = [[0, 0]];
    if (tmax <= 1) pts.push([Math.max(0, tmax), 0]);
    else {
      pts.push([1, 0], [1, u[1]]);
      for (let k = 1; k < 30 && k < tmax; k++) {
        for (let j = 1; j <= 8; j++) { const t = k + j / 8; if (t > tmax) break; pts.push([t, u[k] * Math.pow(2, -(t - k))]); }
        if (k + 1 <= tmax) pts.push([k + 1, u[k + 1]]);
      }
    }
    return pts.map(([t, q], i) => (i ? "L" : "M") + X(t).toFixed(1) + " " + Y(q).toFixed(1)).join("");
  },
  build(g) {
    this.ti = titre(g, "Un comprimé chaque matin", "modèle simplifié : en 24 heures, le corps en élimine la moitié");
    this.ax = E("g", {}, g);
    this.axX = E("line", { class: "k-dim", "stroke-width": 1.6 }, this.ax);
    this.axY = E("line", { class: "k-dim", "stroke-width": 1.6 }, this.ax);
    [0, 5, 10, 15, 20, 25, 30].forEach((t) => { E("line", { x1: this.X(t), x2: this.X(t), y1: 620, y2: 626, class: "k-dim" }, this.ax); fx(this.ax, this.X(t), 648, String(t), "t-tick s-dim", "middle"); });
    fx(this.ax, this.X(30) + 14, 626, "jours", "t-lab s-dim");
    this.yt = [1, 2, 3, 4].map((v) => ({ v, l: E("line", { class: "k-dim" }, this.ax), t: fx(this.ax, 0, 0, String(v), "t-tick s-dim", "end") }));
    fx(this.ax, this.X(0) + 12, 116, "comprimés dans le corps", "t-lab s-dim");
    // les deux droites : le plafond, et la hauteur des creux
    this.pl = E("g", {}, g);
    this.plL = E("line", { class: "k-ink", "stroke-dasharray": "9 7", "stroke-width": 2 }, this.pl);
    this.plT = fx(this.pl, 0, 0, "", "t-lab2 s-ink");
    this.bs = E("g", {}, g);
    this.bsL = E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, this.bs);
    this.bsT = fx(this.bs, 0, 0, "", "t-lab s-dim");
    // la dent de scie, les sommets
    this.sw = E("path", { class: "k-ink nofill", "stroke-width": 3.2, "stroke-linejoin": "round" }, g);
    this.dots = Array.from({ length: 30 }, () => E("circle", { r: 5.5, class: "s-a" }, g));
    this.fn = fx(g, 940, 150, "", "t-cle s-ink", "end");
    this.fn2 = fx(g, 940, 184, "", "t-lab2 s-ink", "end");
    // le petit tableau n → u_n
    this.tb = E("g", {}, g);
    this.tbl = [1, 2, 3, 4, 7, 10, 20].map((n, i) => {
      const x = 170 + i * 120; fx(this.tb, x, 146, `*n* = ${n}`, "t-lab s-dim", "middle");
      return { n, t: fx(this.tb, x, 178, "", "t-lab2 s-ink", "middle") };
    });
  },
  render() {
    const p = this.p, d2 = p.dose2 > 0.5, u = d2 ? U2 : U_DOSE, pl = d2 ? DOSE2.plateau : 2, n = clamp(p.n * p.saw, 0, 30);
    const X = (t) => this.X(t), Y = (q) => this.Y(q), f = (v) => v.toFixed(1);
    this.axX.setAttribute("x1", f(X(0))); this.axX.setAttribute("x2", f(X(30) + 8)); this.axX.setAttribute("y1", 620); this.axX.setAttribute("y2", 620);
    this.axY.setAttribute("x1", f(X(0))); this.axY.setAttribute("x2", f(X(0))); this.axY.setAttribute("y1", 620); this.axY.setAttribute("y2", 128);
    this.yt.forEach((q) => { const ok = q.v <= (d2 ? 4 : 2); q.l.setAttribute("x1", f(X(0) - 6)); q.l.setAttribute("x2", f(X(0))); q.l.setAttribute("y1", f(Y(q.v))); q.l.setAttribute("y2", f(Y(q.v))); q.t.setAttribute("x", f(X(0) - 12)); q.t.setAttribute("y", f(Y(q.v) + 5)); q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0; });
    this.sw.setAttribute("d", this.chemin(n)); show(this.sw, n > 0 ? 1 : 0);
    const nn = Math.floor(n + 1e-9);
    this.dots.forEach((c, i) => { const k = i + 1; c.setAttribute("cx", f(X(k))); c.setAttribute("cy", f(Y(u[k]))); show(c, p.pts * (k <= nn ? 1 : 0)); });
    // les droites
    this.plL.setAttribute("x1", f(X(0))); this.plL.setAttribute("x2", f(X(30))); this.plL.setAttribute("y1", f(Y(pl))); this.plL.setAttribute("y2", f(Y(pl)));
    this.plT.setAttribute("x", f(X(30) - 56)); this.plT.setAttribute("y", f(Y(pl) - 12)); setFx(this.plT, `plafond ${ent(pl)}`); show(this.pl, p.plaf);
    const bas = d2 ? 2 : 1;
    this.bsL.setAttribute("x1", f(X(0))); this.bsL.setAttribute("x2", f(X(30))); this.bsL.setAttribute("y1", f(Y(bas))); this.bsL.setAttribute("y2", f(Y(bas)));
    this.bsT.setAttribute("x", f(X(30) - 150)); this.bsT.setAttribute("y", f(Y(bas) + 24)); setFx(this.bsT, "les creux se rapprochent de " + ent(bas)); show(this.bs, p.bas);
    // la valeur au dernier sommet
    const k = Math.max(1, Math.round(n)), uk = u[k];
    setFx(this.fn, `jour ${k} : *u*_{${k}} ≈ ${fmt6(uk)}`); show(this.fn, p.fin * clamp(p.saw * 2 - 1, 0, 1));
    setFx(this.fn2, k >= 7 ? `il manque ${pl - uk >= 0.01 ? fr(pl - uk, 3) : sciF(pl - uk, 1)} pour atteindre ${ent(pl)}` : ""); show(this.fn2, p.fin * clamp(p.saw * 2 - 1, 0, 1));
    this.tbl.forEach((q) => setFx(q.t, fmt6(U_DOSE[q.n]) + (q.n >= 7 ? "…" : ""))); show(this.tb, p.tab);
  },
});

/* ---------- 2. les tableaux de valeurs ---------- */
const pw = (b, n) => Math.pow(b, n);
const exact = (x, d) => fr(x, d);
const MODES = {
  u: { t: "Les termes de la suite", s: "*u*_{0} = 0 et *u*_{*n*+1} = ½*u*_{*n*} + 1", h: ["*n*", "*u*_{*n*}"], N: 31, B: 2, f: (i) => [String(i), U_DOSE[i].toFixed(9).replace(".", ",")], dx: [60, 220] },
  alt: { t: "Une suite bornée", s: "(−1)^{*n*} reste entre −1 et 1", h: ["*n*", "(−1)^{*n*}"], N: 10, B: 1, f: (i) => [String(i), i % 2 ? "−1" : "1"], dx: [150, 360] },
  demi: { t: "Les puissances de ½", s: "(½)^{*n*}, pour *n* de 0 à 10", h: ["*n*", "(½)^{*n*}"], N: 11, B: 1, f: (i) => [String(i), exact(pw(0.5, i), i)], dx: [110, 420] },
  mdemi: { t: "Les puissances de −½", s: "(−½)^{*n*}, pour *n* de 0 à 10", h: ["*n*", "(−½)^{*n*}"], N: 11, B: 1, f: (i) => [String(i), exact(pw(-0.5, i), i)], dx: [110, 420] },
  malthus: { t: "La population et les vivres", s: "une période : 25 ans ; au départ, 1 et 1", h: ["période *n*", "population 2^{*n*}", "vivres 1 + *n*"], N: 10, B: 1, f: (i) => [String(i), ent(pw(2, i)), ent(1 + i)], dx: [150, 420, 700] },
};
scene("table", {
  p: { mode: "u", rows: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.hd = Array.from({ length: 6 }, () => fx(g, 0, 0, "", "t-lab s-dim", "end"));
    this.ln = Array.from({ length: 2 }, () => E("line", { class: "k-dim", "stroke-width": 1.5 }, g));
    this.cells = Array.from({ length: 32 }, () => ({ g: E("g", {}, g), t: [0, 1, 2].map(() => null) }));
    this.cells.forEach((c) => { c.t = [0, 1, 2].map(() => fx(c.g, 0, 0, "", "t-lab2 s-ink", "end")); });
  },
  render() {
    const M = MODES[this.p.mode], per = Math.ceil(M.N / M.B), rh = Math.min(46, 460 / per), top = 170, W = M.dx.length;
    this.ti.set(M.t, M.s);
    const bw = M.B === 2 ? 470 : 0, x0 = M.B === 2 ? 20 : 0;
    this.hd.forEach((h, j) => { const b = Math.floor(j / 3), c = j % 3, ok = b < M.B && c < W; if (ok) { h.setAttribute("x", x0 + b * bw + M.dx[c]); h.setAttribute("y", top - 22); setFx(h, M.h[c]); } h.style.opacity = ok ? 1 : 0; });
    this.ln.forEach((l, b) => { const ok = b < M.B; if (ok) { l.setAttribute("x1", x0 + b * bw + 20); l.setAttribute("x2", x0 + b * bw + M.dx[W - 1] + 20); l.setAttribute("y1", top - 10); l.setAttribute("y2", top - 10); } l.style.opacity = ok ? 1 : 0; });
    this.cells.forEach((c, k) => {
      const ok = k < M.N, b = Math.floor(k / per), r = k % per;
      if (ok) { const v = M.f(k); c.t.forEach((t, j) => { if (j < W) { t.setAttribute("x", x0 + b * bw + M.dx[j]); t.setAttribute("y", top + 10 + r * rh); setFx(t, v[j]); } t.style.opacity = j < W ? 1 : 0; }); }
      c.g.style.opacity = ok ? clamp(this.p.rows - k, 0, 1) : 0;
    });
  },
});
}
