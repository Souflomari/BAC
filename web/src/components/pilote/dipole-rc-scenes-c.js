/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RC » (V3), troisième partie : `droite` (les graphiques en ligne droite des
 * sujets : q = f(u_AB) du sujet 2018, u_C(t) à courant constant du sujet 2025, du_C/dt = f(u_C) du
 * sujet 2021), `quiz` (les pièges des copies, copie adaptée de la leçon voisine) et `end` (ce que
 * l'élève a compris, cinq lignes).
 *
 * `droite`, paramètres : jeu ('qu' | 'courant' | 'dudt'), line (0 → 1 : la droite se trace), pt (les
 * points lus), tri (le triangle de la pente), sub (un sous-titre imposé). Les quadrillages et les
 * graduations sont ceux des figures imprimées (docs/sujets/pc/rc-charge.md).
 */
import { S18, S21, S25, fr } from "./dipole-rc-outils";

export function scenesC(ctx, O, QUIZ) {
const { E, clamp, show, scene } = ctx;
const { titre, lab, axes, setFx } = O;
const gl = (g, X, Y, x0, x1, xs, y1, ys) => {            // le quadrillage de la figure imprimée
  for (let v = x0 + xs; v <= x1 + 1e-9; v += xs) E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(y1), class: "k-line", "stroke-width": 1.5 }, g);
  for (let v = ys; v <= y1 + 1e-9; v += ys) E("line", { x1: X(x0), x2: X(x1), y1: Y(v), y2: Y(v), class: "k-line", "stroke-width": 1.5 }, g);
};
const dash = (g, x1, y1, x2, y2, cls = "k-dim") => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": 2.8, "stroke-dasharray": "7 7", "stroke-linecap": "round" }, g);
const pt = (g, x, y) => E("circle", { cx: x, cy: y, r: 9, class: "s-a" }, g);

scene("droite", {
  p: { jeu: "qu", line: 0, pt: 0, tri: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    const dr = (parent, x1, y1, x2, y2) => E("line", { x1, y1, x2, y2, class: "k-ink", "stroke-width": 4.5, "stroke-linecap": "round", pathLength: 1000, "stroke-dasharray": "1000 1000" }, parent);

    /* 2018 : la charge q en fonction de u_AB, une droite par l'origine jusqu'à (6 V ; 60 µC), quadrillage 6 × 6 */
    const A = this.A = E("g", {}, g);
    const XA = (u) => 150 + (700 * u) / 6, YA = (q) => 580 - (400 * q) / (S18.q * 1e6);
    gl(A, XA, YA, 0, S18.u, 1, S18.q * 1e6, 10);
    axes(E("g", {}, A), XA, YA, 0, S18.u, 1, S18.q * 1e6, 10, (v) => String(v), (v) => String(v), "*u*_{AB} (V)", "*q* (µC)", 56);
    this.lA = dr(A, XA(0), YA(0), XA(S18.u), YA(S18.q * 1e6));
    this.pA = E("g", {}, A);
    dash(this.pA, XA(0), YA(S18.q * 1e6), XA(S18.u), YA(S18.q * 1e6)); dash(this.pA, XA(S18.u), YA(S18.q * 1e6), XA(S18.u), YA(0)); pt(this.pA, XA(S18.u), YA(S18.q * 1e6));

    /* 2025 : u_C(t) à courant constant, quadrillage 5 × 5 de 2 s et 2 V, jusqu'à (10 s ; 10 V) */
    const B = this.B = E("g", {}, g);
    const XB = (t) => 150 + (700 * t) / S25.tFin, YB = (u) => 580 - (400 * u) / S25.uFin;
    gl(B, XB, YB, 0, S25.tFin, 2, S25.uFin, 2);
    axes(E("g", {}, B), XB, YB, 0, S25.tFin, 2, S25.uFin, 2, (v) => String(v), (v) => String(v), "*t* (s)", "*u*_{C} (V)", 56);
    this.lB = dr(B, XB(0), YB(0), XB(S25.tFin), YB(S25.uFin));
    this.pB = E("g", {}, B);
    pt(this.pB, XB(2), YB(2)); pt(this.pB, XB(4), YB(4));
    this.tB = E("g", {}, B);
    dash(this.tB, XB(2), YB(2), XB(4), YB(2), "k-a"); dash(this.tB, XB(4), YB(2), XB(4), YB(4), "k-a");
    lab(this.tB, XB(3), YB(2) + 36, "Δ*t* = 2 s", "rc-l s-ink", "middle", 26);
    lab(this.tB, XB(4) + 18, YB(3) + 10, "Δ*u* = 2 V", "rc-l s-ink", "start", 26);

    /* 2021 : du_C/dt en fonction de u_C, une droite par (0 ; 1 000), (6 ; 500), (12 ; 0), quadrillage 4 × 4 */
    const C = this.C = E("g", {}, g);
    const XC = (u) => 190 + (680 * u) / S21.abs, YC = (d) => 580 - (400 * d) / S21.ordo;
    gl(C, XC, YC, 0, S21.abs, 3, S21.ordo, 250);
    axes(E("g", {}, C), XC, YC, 0, S21.abs, 3, S21.ordo, 250, (v) => String(v), (v) => String(v), "*u*_{C} (V)", "d*u*_{C}/d*t* (V·s^{−1})", 56);
    this.lC = dr(C, XC(0), YC(S21.ordo), XC(S21.abs), YC(0));
    this.pC = E("g", {}, C);
    dash(this.pC, XC(0), YC(S21.ordo), XC(0) + 0.01, YC(S21.ordo)); pt(this.pC, XC(0), YC(S21.ordo));
    pt(this.pC, XC(S21.abs), YC(0)); pt(this.pC, XC(S21.mil[0]), YC(S21.mil[1]));
  },
  render() {
    const p = this.p, j = p.jeu;
    show(this.A, j === "qu" ? 1 : 0); show(this.B, j === "courant" ? 1 : 0); show(this.C, j === "dudt" ? 1 : 0);
    [this.lA, this.lB, this.lC].forEach((l) => (l.style.strokeDashoffset = 1000 * (1 - clamp(p.line, 0, 1))));
    show(this.pA, p.pt); show(this.pB, p.pt); show(this.pC, p.pt); show(this.tB, p.tri);
    const T = {
      qu: ["Sujet 2018 : *q* en fonction de *u*_{AB}", "une droite qui passe par l’origine"],
      courant: ["Sujet 2025 : la charge à courant constant", "*u*_{C} en fonction du temps"],
      dudt: ["Sujet 2021 : d*u*_{C}/d*t* en fonction de *u*_{C}", "une droite qui coupe les deux axes"],
    }[j] || ["", ""];
    this.ti.set(T[0], p.sub || T[1]);
  },
});

/* ---------- les pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.big = lab(g, 500, 300, "", "rc-g s-ink", "middle", 36);
    this.sub = lab(g, 500, 356, "", "rc-l s-c", "middle", 26);
    this.r1 = lab(g, 500, 470, "", "rc-l s-ink", "middle", 26);
    this.r2 = lab(g, 500, 520, "", "rc-l s-a", "middle", 26);
  },
  render() {
    const i = clamp(Math.round(this.p.qi), 0, QUIZ.length - 1), q = QUIZ[i];
    this.ti.set(q.titre, q.tag);
    setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

/* ---------- ce que l'élève a compris ---------- */
scene("end", {
  p: { n: 0 },
  build(g) {
    titre(g, "Ce que tu as compris", "");
    const I = [
      ["*q* = *C* *u*_{C} et *i* = d*q*/d*t*, en convention récepteur.", "*i* entre par A ; *u*_{C} est fléchée vers A."],
      ["*u*_{C} est continue, *i* saute à *E*/*R*.", "Longtemps après, *u*_{C} = *E* et *i* = 0."],
      ["*RC* d*u*_{C}/d*t* + *u*_{C} = *E*.", "Solution : *u*_{C} = *E*(1 − e^{−t/RC}), vérifiée."],
      ["*τ* = *RC* : une durée, et la lecture de la courbe.", "Tangente en *τ*, 63 % atteints, 37 % restants, 5*τ*."],
      ["*E*_{e} = ½ *C* *u*_{C}^{2}.", "À la décharge, cette énergie est dissipée dans *R*."],
    ];
    this.items = I.map((l, i) => {
      const gg = E("g", {}, g), y = 170 + i * 100;
      lab(gg, 80, y + 12, String(i + 1), "rc-g s-ink", "start", 36);
      lab(gg, 130, y, l[0], "rc-l s-ink", "start", 26);
      lab(gg, 130, y + 34, l[1], "rc-s s-c", "start", 22);
      return gg;
    });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
