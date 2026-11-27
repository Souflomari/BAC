/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RL » (V3), troisième partie : `droite` (les graphiques en ligne droite : i(t)
 * qui monte régulièrement, et di/dt = f(i) du sujet 2024), `quiz` (les pièges des copies, copie adaptée
 * de la leçon voisine) et `end` (ce que l'élève a compris, cinq lignes).
 *
 * `droite`, paramètres : jeu ('rampe' | 'didt'), line (0 → 1 : la droite se trace), pt (les points lus),
 * tri (le triangle de la pente), sub (un sous-titre imposé). Pas de quadrillage de fond : les graduations
 * suffisent, et les valeurs lues sont celles de docs/sujets/pc/dipole-rl.md (figure 4, sujet 2024).
 */
import { PT, S24, fr } from "./dipole-rl-outils";

export function scenesC(ctx, O, QUIZ) {
const { E, clamp, show, scene } = ctx;
const { titre, lab, axes, setFx } = O;
const dash = (g, x1, y1, x2, y2, cls = "k-dim") => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": 2.8, "stroke-dasharray": "7 7", "stroke-linecap": "round" }, g);
const pt = (g, x, y) => E("circle", { cx: x, cy: y, r: 9, class: "s-a" }, g);

scene("droite", {
  p: { jeu: "rampe", line: 0, pt: 0, tri: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    const dr = (parent, x1, y1, x2, y2) => E("line", { x1, y1, x2, y2, class: "k-ink", "stroke-width": 4.5, "stroke-linecap": "round", pathLength: 1000, "stroke-dasharray": "1000 1000" }, parent);

    /* la rampe : i(t) passe régulièrement de 0 à 0,20 A en 8,0 ms */
    const A = this.A = E("g", {}, g);
    const dtMs = PT.dt * 1e3, XA = (t) => 150 + (700 * t) / 10, YA = (i) => 580 - (400 * i) / 0.25;
    axes(E("g", {}, A), XA, YA, 0, 10, 2, 0.25, 0.05, (v) => String(v), (v) => fr(v, 2), "*t* (ms)", "*i* (A)", 56);
    this.lA = dr(A, XA(0), YA(0), XA(dtMs), YA(PT.di));
    this.pA = E("g", {}, A);
    pt(this.pA, XA(dtMs), YA(PT.di)); pt(this.pA, XA(0), YA(0));
    this.tA = E("g", {}, A);
    dash(this.tA, XA(0), YA(PT.di), XA(dtMs), YA(PT.di), "k-ink"); dash(this.tA, XA(dtMs), YA(0), XA(dtMs), YA(PT.di), "k-ink");
    lab(this.tA, XA(dtMs / 2), YA(PT.di) - 14, `Δ*t* = ${fr(dtMs, 1)} ms`, "rl-l s-ink", "middle", 26);
    lab(this.tA, XA(dtMs) + 18, YA(PT.di / 2) + 10, `Δ*i* = ${fr(PT.di, 2)} A`, "rl-l s-ink", "start", 26);

    /* 2024 : di/dt en fonction de i, une droite par (0 ; 3 × 10³) et (6 mA ; 0) */
    const C = this.C = E("g", {}, g);
    const XC = (i) => 190 + (680 * i) / (S24.abs * 1e3), YC = (d) => 580 - (400 * d) / S24.ordo;
    axes(E("g", {}, C), XC, YC, 0, S24.abs * 1e3, 1, S24.ordo, 1000, (v) => String(v), (v) => fr(v, 0), "*i* (mA)", "d*i*/d*t* (A·s^{−1})", 56);
    this.lC = dr(C, XC(0), YC(S24.ordo), XC(S24.abs * 1e3), YC(0));
    this.pC = E("g", {}, C);
    pt(this.pC, XC(0), YC(S24.ordo)); pt(this.pC, XC(S24.abs * 1e3), YC(0));
  },
  render() {
    const p = this.p, j = p.jeu;
    show(this.A, j === "rampe" ? 1 : 0); show(this.C, j === "didt" ? 1 : 0);
    [this.lA, this.lC].forEach((l) => (l.style.strokeDashoffset = 1000 * (1 - clamp(p.line, 0, 1))));
    show(this.pA, p.pt); show(this.tA, p.tri); show(this.pC, p.pt);
    const T = {
      rampe: ["Un courant qui monte régulièrement", "*i* en fonction du temps : une droite"],
      didt: ["Sujet 2024 : d*i*/d*t* en fonction de *i*", "une droite qui coupe les deux axes"],
    }[j] || ["", ""];
    this.ti.set(T[0], p.sub || T[1]);
  },
});

/* ---------- les pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.big = lab(g, 500, 300, "", "rl-g s-ink", "middle", 36);
    this.sub = lab(g, 500, 356, "", "rl-l s-c", "middle", 26);
    this.r1 = lab(g, 500, 470, "", "rl-l s-ink", "middle", 26);
    this.r2 = lab(g, 500, 520, "", "rl-l s-a", "middle", 26);
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
      ["*u* = *r* *i* + *L* d*i*/d*t*, en convention récepteur.", "La bobine répond à la variation du courant."],
      ["*i* est continu, *u*_{L} saute.", "À la fermeture, *u*_{L} passe à *E* ; à la rupture, elle change de signe."],
      ["*L* d*i*/d*t* + (*R* + *r*) *i* = *E*.", "Solution : *i* = *I*_{0}(1 − e^{−t/τ}), vérifiée."],
      ["*τ* = *L*/(*R* + *r*) et *I*_{0} = *E*/(*R* + *r*).", "*R* change les deux, *L* seulement *τ*."],
      ["*E*_{m} = ½ *L* *i*^{2}.", "À la rupture, cette énergie entretient le courant."],
    ];
    this.items = I.map((l, i) => {
      const gg = E("g", {}, g), y = 170 + i * 100;
      lab(gg, 80, y + 12, String(i + 1), "rl-g s-ink", "start", 36);
      lab(gg, 130, y, l[0], "rl-l s-ink", "start", 26);
      lab(gg, 130, y + 34, l[1], "rl-s s-c", "start", 22);
      return gg;
    });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
