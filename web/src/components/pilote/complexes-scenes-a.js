/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Nombres complexes, première partie », première partie : `savoir` (le test sur le
 * second degré, puis trois rappels) et `cardan` (la courbe de y = x³ − 15x − 4 et la formule de
 * Cardan dans un cartouche). `cardan` est une copie adaptée de `loi` (radioactivite-scenes-b.js) :
 * une courbe, des abscisses lues, pas de type nouveau. Aucune couleur écrite en dur : les classes
 * de pilote.css seulement ; toutes les positions et tous les nombres sont CALCULÉS par
 * complexes-outils.js.
 *
 * Paramètres de `cardan` : cb (0 → 1 : le tracé), x4 (le point (4 ; 0), marqué « 4 »), form (le
 * cartouche de la formule), trois (les deux autres points d'intersection avec l'axe, abscisses
 * calculées), quatre (au retour : la valeur 4 entourée). `trois` reste à 0 tant que le pari
 * `fausse` n'est pas posé (règle M9).
 */
import { fr, ent, SAV, SAV_DELTA, polyScene, f_cub, CUB_RAC, CARDAN, CARDAN_MOINS, CARDAN_DEMI, X4 } from "./complexes-outils";

const PL = { x0: 70, x1: 930, y0: 104, y1: 648 };

export function scenesA(ctx, O) {
const { E, clamp, show, scene, defs } = ctx;
const { fx, setFx } = O;

E("rect", { x: PL.x0, y: PL.y0 - 4, width: PL.x1 - PL.x0, height: PL.y1 - PL.y0 + 8 }, E("clipPath", { id: "cx-clip-card" }, defs));

/* ---------- 0. ce qu'il faut savoir : un test, puis trois rappels ---------- */
scene("savoir", {
  p: { q: 0, qr: 0, r1: 0, r2: 0, r3: 0 },
  build(g) {
    this.ti = O.titre(g, "", "les équations du second degré");
    this.qg = E("g", {}, g);
    fx(this.qg, 500, 270, `${polyScene(SAV.a, SAV.b, SAV.c)} = 0`, "t-big2 s-ink", "middle");
    fx(this.qg, 470, 390, "solutions réelles :", "t-big2 s-ink", "end");
    this.qm = fx(this.qg, 494, 390, "?", "t-big2 s-ink");
    this.qa = fx(this.qg, 494, 390, "aucune", "t-big2 s-a");
    const L = [["Δ = *b*^{2} − 4*ac*", "Δ > 0 : deux solutions réelles ; Δ = 0 : une ; Δ < 0 : aucune dans ℝ"],
      ["(*A* + *B*)(*A* − *B*) = *A*^{2} − *B*^{2}", "l’identité remarquable"],
      ["*AB* = √((*x*_{*B*} − *x*_{*A*})^{2} + (*y*_{*B*} − *y*_{*A*})^{2})", "la distance, dans un repère orthonormé"]];
    this.rs = L.map(([a, b], i) => { const rg = E("g", {}, g), y = 230 + i * 130; fx(rg, 500, y, a, "t-big2 s-ink", "middle"); fx(rg, 500, y + 38, b, "t-lab s-dim", "middle"); return rg; });
  },
  render() {
    const p = this.p;
    show(this.qg, p.q); show(this.qm, 1 - p.qr); show(this.qa, p.qr);
    [p.r1, p.r2, p.r3].forEach((v, i) => show(this.rs[i], v));
  },
});

/* ---------- 1. l'énigme : la courbe de y = x³ − 15x − 4 ---------- */
const XM = 5, YM = 32;
const X = (x) => PL.x0 + ((x + XM) / (2 * XM)) * (PL.x1 - PL.x0);
const Y = (y) => (PL.y0 + PL.y1) / 2 - (y / YM) * ((PL.y1 - PL.y0) / 2);
const FORM = `Cardan, 1545 : *x* = ^{3}√(${CARDAN_DEMI} + √−${CARDAN_MOINS}) + ^{3}√(${CARDAN_DEMI} − √−${CARDAN_MOINS})`;
scene("cardan", {
  p: { cb: 0, x4: 0, form: 0, trois: 0, quatre: 0 },
  build(g) {
    this.eq = fx(g, 60, 58, `*x*^{3} = ${CARDAN.p}*x* + ${CARDAN.q}`, "t-lab2 s-ink");
    this.fm = fx(g, 60, 90, FORM, "t-lab s-ink");
    this.ax = E("g", {}, g);
    E("line", { x1: PL.x0, x2: PL.x1, y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.6 }, this.ax);
    E("line", { x1: X(0), x2: X(0), y1: PL.y0, y2: PL.y1, class: "k-dim", "stroke-width": 1.6 }, this.ax);
    for (let x = -XM + 1; x < XM; x++) if (x) { E("line", { x1: X(x), x2: X(x), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, this.ax); fx(this.ax, X(x), Y(0) + 26, String(x).replace("-", "−"), "t-tick s-dim", "middle"); }
    for (let y = -30; y <= 30; y += 10) if (y) { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(y), y2: Y(y), class: "k-dim" }, this.ax); fx(this.ax, X(0) - 12, Y(y) + 5, String(y).replace("-", "−"), "t-tick s-dim", "end"); }
    const cg = E("g", { "clip-path": "url(#cx-clip-card)" }, g);
    let d = "";
    for (let i = 0; i <= 300; i++) { const x = -XM + (2 * XM * i) / 300, y = clamp(f_cub(x), -90, 90); d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); }
    this.cv = E("path", { d, class: "k-ink nofill", "stroke-width": 3.2, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linejoin": "round" }, cg);
    this.cvT = fx(g, X(-4.85), Y(27), "*y* = *x*^{3} − 15*x* − 4", "t-lab s-ink");
    // le point (4 ; 0), puis les deux autres solutions : ce sont les abscisses où la courbe coupe l'axe
    this.g4 = E("g", {}, g);
    this.r4 = E("circle", { cx: X(CUB_RAC[2]), cy: Y(0), r: 20, class: "k-a nofill", "stroke-width": 3 }, g);
    E("circle", { cx: X(CUB_RAC[2]), cy: Y(0), r: 9, class: "s-a" }, this.g4);
    fx(this.g4, X(CUB_RAC[2]) + 4, Y(0) - 18, ent(CUB_RAC[2]), "t-lab2 s-ink", "middle");
    this.g3 = E("g", {}, g);
    [0, 1].forEach((i) => {
      const x = CUB_RAC[i];
      E("circle", { cx: X(x), cy: Y(0), r: 8, class: "s-ink" }, this.g3);
      if (i) E("line", { x1: X(x), x2: X(x), y1: Y(0) + 10, y2: Y(0) + 40, class: "k-dim", "stroke-dasharray": "3 4", "stroke-width": 1.6 }, this.g3);
      fx(this.g3, X(x) - 8, Y(0) + (i ? 60 : -16), fr(x, 2), "t-lab2 s-ink", "end");
    });
  },
  render() {
    const p = this.p;
    this.cv.style.strokeDashoffset = 1000 * (1 - p.cb); show(this.cv, p.cb > 0 ? 1 : 0);
    show(this.cvT, clamp(p.cb * 2 - 1, 0, 1));
    show(this.g4, p.x4); show(this.fm, p.form); show(this.g3, p.trois); show(this.r4, p.quatre);
  },
});
}
