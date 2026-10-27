/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « décroissance radioactive » (V3), troisième partie : l'horloge du
 * carbone 14, le choix du radioélément, la figure du sujet 2022 (iode 131),
 * les trois pièges des copies et ce que l'élève a compris.
 */
import { T14, LIM14, IRHOUD, T_TRITIUM, T_K40, T_I, A0_I, T95, N0_I, ageC14, fr, ent, sig3, sciF } from "./radioactivite-outils";

export function scenesC(ctx, O, QUIZ) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre, courbe, axes } = O;

/* ---------- l'horloge du carbone 14 ---------- */
scene("horloge", {
  p: { curve: 0, st: 0, r: 30, line: 0, age: 0, xmax: 40000, irh: 0 },
  build(g) {
    this.ti = titre(g, "L’horloge du carbone 14", "");
    this.ax = E("g", {}, g);
    this.band = E("rect", { y: 150, height: 440, class: "band" }, g);
    this.bandL = fx(g, 0, 262, "le carbone 14 date jusqu’à environ 50 000 ans", "t-lab s-ink");
    this.cv = E("path", { class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, g);
    this.st = [1, 2, 3, 4].map((n) => {
      const sg = E("g", {}, g);
      return { g: sg, h: E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.6 }, sg), v: E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.6 }, sg), dot: E("circle", { r: 5, class: "s-ink" }, sg), lab: fx(sg, 0, 0, `${n} *t*_{1/2} = ${ent(n * T14)} ans`, "t-lab s-ink") };
    });
    // la mesure de l'élève : une ligne rouge (le seul objet rouge avec la bande)
    this.lnG = E("g", {}, g);
    this.lnH = E("line", { class: "k-a", "stroke-width": 2.4 }, this.lnG); this.lnV = E("line", { class: "k-a", "stroke-width": 2.4, "stroke-dasharray": "7 5" }, this.lnG);
    this.lnD = E("circle", { r: 7, class: "s-a" }, this.lnG);
    this.lnR = fx(this.lnG, 124, 0, "", "rd-fort s-ink");
    this.lnA = fx(g, 0, 662, "", "rd-fort s-ink", "middle");
    this.irM = E("line", { y1: 150, y2: 590, class: "k-ink", "stroke-width": 2, "stroke-dasharray": "8 6" }, g);
    this.irL = fx(g, 0, 190, "Jebel Irhoud : ≈ 315 000 ans", "rd-fort s-ink", "end");
  },
  render() {
    const p = this.p, X = (t) => 110 + (760 * t) / p.xmax, Y = (v) => 590 - (440 * v) / 100;
    if (this._ax !== p.xmax) { this._ax = p.xmax; axes(this.ax, X, Y, p.xmax, 100, p.xmax > 60000 ? 50000 : 10000, 25, (v) => ent(v), (v) => `${v} %`, "*t* (ans)", "activité, en % de celle d’un bois vivant"); }
    this.cv.setAttribute("d", courbe((t) => 100 * 2 ** (-t / T14), 0, p.xmax, X, Y, 400)); this.cv.style.strokeDashoffset = 1000 * (1 - p.curve);
    const so = p.st * (1 - p.irh);
    this.st.forEach((s, i) => {
      const n = i + 1, x = X(n * T14), y = Y(100 / 2 ** n);
      s.h.setAttribute("x1", X(0)); s.h.setAttribute("x2", x); s.h.setAttribute("y1", y); s.h.setAttribute("y2", y);
      s.v.setAttribute("x1", x); s.v.setAttribute("x2", x); s.v.setAttribute("y1", y); s.v.setAttribute("y2", Y(0));
      s.dot.setAttribute("cx", x); s.dot.setAttribute("cy", y);
      s.lab.setAttribute("x", x + 10); s.lab.setAttribute("y", y - 10); show(s.g, so);
    });
    const r = clamp(p.r, 1, 99), tr = ageC14(r), xr = X(tr), yr = Y(r);
    this.lnH.setAttribute("x1", X(0)); this.lnH.setAttribute("x2", xr); this.lnH.setAttribute("y1", yr); this.lnH.setAttribute("y2", yr);
    this.lnV.setAttribute("x1", xr); this.lnV.setAttribute("x2", xr); this.lnV.setAttribute("y1", yr); this.lnV.setAttribute("y2", Y(0));
    this.lnD.setAttribute("cx", xr); this.lnD.setAttribute("cy", yr);
    setFx(this.lnR, `*a* / *a*_{0} = ${Math.round(r)} %`); this.lnR.setAttribute("y", yr - 12);
    setFx(this.lnA, `*t* ≈ ${ent(sig3(tr))} ans`); this.lnA.setAttribute("x", clamp(xr, 190, 820).toFixed(1));
    show(this.lnG, Math.max(p.line, p.age) * (1 - p.irh)); show(this.lnA, p.age * (1 - p.irh));
    const io = clamp(p.irh * 2 - 1, 0, 1);
    this.band.setAttribute("x", X(0)); this.band.setAttribute("width", Math.max(0, X(LIM14) - X(0)).toFixed(1)); show(this.band, 0.7 * io);
    this.bandL.setAttribute("x", X(LIM14) + 12); show(this.bandL, io);
    this.irM.setAttribute("x1", X(IRHOUD)); this.irM.setAttribute("x2", X(IRHOUD)); this.irL.setAttribute("x", X(IRHOUD) - 12);
    show(this.irM, io); show(this.irL, io);
    this.ti.set(p.irh > 0.5 ? "Et pour 315 000 ans ?" : "L’horloge du carbone 14", p.irh > 0.5 ? "la portée de l’horloge, et l’âge de Jebel Irhoud" : p.age > 0.5 || p.line > 0.5 ? "l’activité mesurée donne l’âge" : "à la mort, le carbone 14 n’est plus renouvelé");
  },
});

/* ---------- choisir le radioélément : une demi-vie à l'échelle de l'âge ---------- */
const LX = (a) => 120 + 76 * Math.log10(a);
const RADIO = [
  { nom: "tritium", t: T_TRITIUM, tl: "12,3 ans", y: 230, c: "f-c k-dim" },
  { nom: "carbone 14", t: T14, tl: `${ent(T14)} ans`, y: 330, c: "f-a k-a" },
  { nom: "potassium 40", t: T_K40, tl: "1,25 milliard d’années", y: 430, c: "f-b k-ink" },
];
const OBJETS = [
  { t: "un foyer de 10 000 ans", a: 1e4, y: 586 },
  { t: "Jebel Irhoud : 315 000 ans", a: IRHOUD, y: 612 },
  { t: "une roche de 2 milliards d’années", a: 2e9, y: 586 },
  { t: "un vin de 10 ans", a: 10, y: 586, vin: true },
];
scene("choix", {
  p: { obj: 0, vin: 0 },
  build(g) {
    this.ti = titre(g, "Choisir son horloge", "une demi-vie du même ordre que l’âge à mesurer");
    E("line", { x1: LX(1), x2: LX(1e10), y1: 500, y2: 500, class: "k-dim", "stroke-width": 1.5 }, g);
    [[1, "1 an"], [100, "100 ans"], [1e4, "10 000 ans"], [1e6, "1 million"], [1e8, "100 millions"], [1e10, "10 milliards"]].forEach(([a, l]) => { E("line", { x1: LX(a), x2: LX(a), y1: 500, y2: 507, class: "k-dim" }, g); fx(g, LX(a), 528, l, "t-sous", "middle"); });
    RADIO.forEach((r) => {
      const x0 = LX(Math.max(1, r.t / 10)), x1 = LX(Math.min(1e10, r.t * 10));
      E("rect", { x: x0, y: r.y - 14, width: x1 - x0, height: 28, rx: 4, class: r.c, "stroke-width": 1.5 }, g);
      E("line", { x1: LX(r.t), x2: LX(r.t), y1: r.y - 20, y2: r.y + 20, class: "k-ink", "stroke-width": 2.5 }, g);
      const lx = r.t > 1e8 ? x1 : x0;
      fx(g, lx, r.y - 26, `${r.nom} : *t*_{1/2} = ${r.tl}`, "rd-fort s-ink", r.t > 1e8 ? "end" : "start");
    });
    this.objs = OBJETS.map((o) => {
      const og = E("g", {}, g), x = LX(o.a);
      // un repère qui traverse chaque rangée (sans couper les noms des radioéléments, posés au-dessus)
      RADIO.forEach((r) => E("line", { x1: x, x2: x, y1: r.y - 20, y2: r.y + 20, class: "k-ink", "stroke-width": 1.5, "stroke-dasharray": "3 4" }, og));
      E("line", { x1: x, x2: x, y1: 500, y2: 562, class: "k-ink", "stroke-width": 1.5, "stroke-dasharray": "3 4" }, og);
      E("circle", { cx: x, cy: 500, r: 6, class: "s-ink" }, og);
      fx(og, clamp(x, 160, 800), o.y, o.t, "t-lab s-ink", "middle");
      return { g: og, vin: o.vin };
    });
  },
  render() {
    const p = this.p;
    this.objs.forEach((o, i) => show(o.g, o.vin ? p.vin : clamp(p.obj * 3 - i, 0, 1)));
  },
});

/* ---------- au bac : la figure 3 du sujet 2022 (iode 131) ---------- */
scene("bac", {
  p: { curve: 1, th: 0, t95: 0 },
  build(g) {
    const X = (t) => 150 + 17.5 * t, Y = (a) => 560 - 80 * a;
    this.ti = titre(g, "Sujet du bac 2022 : l’iode 131", "figure 3 : l’activité *a*(*t*) de la dose injectée");
    for (let t = 4; t <= 40; t += 4) E("line", { x1: X(t), x2: X(t), y1: Y(0), y2: Y(5), class: "k-line", "stroke-width": t % 8 ? 0.6 : 1.2 }, g);
    for (let a = 0.5; a <= 5; a += 0.5) E("line", { x1: X(0), x2: X(40), y1: Y(a), y2: Y(a), class: "k-line", "stroke-width": a % 1 ? 0.6 : 1.2 }, g);
    axes(E("g", {}, g), X, Y, 40, 5, 8, 1, (v) => String(v), (v) => String(v), "*t* (jours)", "*a* (10^{6} Bq)");
    E("path", { d: courbe((t) => (A0_I / 1e6) * 2 ** (-t / T_I), 0, 40, X, Y, 200), class: "k-ink nofill", "stroke-width": 3 }, g);
    this.thG = E("g", {}, g);
    E("polyline", { points: `${X(0)},${Y(2)} ${X(T_I)},${Y(2)} ${X(T_I)},${Y(0)}`, class: "k-a nofill", "stroke-width": 2.2, "stroke-dasharray": "7 5" }, this.thG);
    E("circle", { cx: X(T_I), cy: Y(2), r: 6, class: "s-a" }, this.thG);
    fx(this.thG, X(T_I) + 14, Y(2) - 14, "*a* = *a*_{0}/2 à *t* = 8 jours", "rd-fort s-ink");
    this.t9 = E("g", {}, g);
    const a95 = (A0_I / 1e6) * 0.05;
    E("line", { x1: X(T95), x2: X(T95), y1: Y(a95), y2: Y(0), class: "k-ink", "stroke-width": 2, "stroke-dasharray": "5 5" }, this.t9);
    E("circle", { cx: X(T95), cy: Y(a95), r: 6, class: "s-ink" }, this.t9);
    fx(this.t9, X(T95), Y(a95) - 70, `*t*_{1} ≈ ${fr(T95, 1)} jours`, "rd-fort s-ink", "middle");
    fx(this.t9, X(T95), Y(a95) - 44, "il reste 5 %", "t-lab s-ink", "middle");
  },
  render() { const p = this.p; show(this.thG, p.th); show(this.t9, p.t95); },
});

/* ---------- combien de noyaux dans une masse ? ---------- */
scene("masse", {
  p: { ok: 0 },
  build(g) {
    titre(g, "Un échantillon d’iode 131", "un millionième de gramme : combien de noyaux ?");
    E("rect", { x: 250, y: 210, width: 150, height: 250, rx: 18, class: "cell" }, g);
    E("rect", { x: 280, y: 180, width: 90, height: 34, rx: 6, class: "rulebody" }, g);
    E("circle", { cx: 325, cy: 430, r: 5, class: "s-ink" }, g);
    fx(g, 325, 500, "le grain : 1,0 µg", "t-lab s-ink", "middle");
    fx(g, 470, 270, "*m* = 1,0 µg = 1,0 × 10^{−6} g", "t-lab s-ink");
    fx(g, 470, 320, "*M* = 131 g·mol^{−1}", "t-lab s-ink");
    fx(g, 470, 370, "*N*_{A} = 6,02 × 10^{23} mol^{−1}", "t-lab s-ink");
    this.res = fx(g, 500, 590, `*N*_{0} ≈ ${sciF(N0_I)} noyaux`, "t-cle s-a", "middle");
  },
  render() { show(this.res, this.p.ok); },
});

/* ---------- les trois pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.big = fx(g, 500, 300, "", "t-cle s-ink", "middle");
    this.sub = fx(g, 500, 340, "", "t-lab s-c", "middle");
    this.r1 = fx(g, 500, 440, "", "t-lab s-ink", "middle");
    this.r2 = fx(g, 500, 480, "", "rd-fort s-a", "middle");
  },
  render() {
    const i = clamp(Math.round(this.p.qi), 0, QUIZ.length - 1), q = QUIZ[i];
    this.ti.set(`Piège n° ${i + 1} des copies`, q.tag);
    setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

/* ---------- ce que tu as compris ---------- */
scene("end", {
  p: { n: 0 },
  build(g) {
    titre(g, "Ce que tu as compris", "");
    const I = [
      ["Un noyau se désintègre au hasard, sans mémoire.", "Il ne vieillit pas."],
      ["Beaucoup de noyaux suivent une loi exacte.", "La moitié de ce qui reste part à chaque demi-vie."],
      ["Chaque sorte de noyau a sa demi-vie.", "Une minute pour le thoron, des milliards d’années pour l’uranium."],
      ["L’activité restante donne un âge.", "À condition de choisir la bonne horloge."],
    ];
    this.items = I.map((l, i) => {
      const gg = E("g", {}, g), y = 170 + i * 120;
      fx(gg, 120, y + 14, String(i + 1), "t-cle s-ink");
      fx(gg, 170, y, l[0], "rd-fort s-ink");
      fx(gg, 170, y + 30, l[1], "t-lab s-c");
      return gg;
    });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
