/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Transformations non totales » (V3), troisième partie : le tableau d'avancement
 * (`avancement`, copie adaptée de la scène `table` de la leçon sur l'exponentielle : des cases qui
 * apparaissent dans l'ordre de lecture, sans saisie de l'élève) et les deux barres x_max et x_f
 * (`barres`, copie adaptée de `comptes` de la leçon sur la décroissance, avec des curseurs sur le modèle
 * de `aston`).
 *
 * `avancement`, paramètres : cases (le nombre de cases montrées, dans l'ordre de lecture : 4 par ligne),
 * lit (0 littéral, 1 numérique), squelette (1 : les lignes et les cases vides, pour le rappel), fx (une case mise en évidence, ou −1), cache (une case masquée, ou −1),
 * tete ('generique' : AH, A⁻ ; 'ethan' : CH₃COOH, CH₃COO⁻), conc ('C' ou 'CA' : la lettre du sujet).
 * `barres`, paramètres : xm (la barre x_max), xf (la barre x_f et l'écart grisé), tau (le rapport τ), C et pH
 * (la concentration et le pH), cur (0 ou 1 : les valeurs de C et du pH s'affichent, ce sont celles des curseurs).
 * Pas de quadrillage de fond. Le rouge ne marque que la case ou la barre qu'on regarde.
 */
import { N0, V_L, XF, COLS, hDe, C0, PH_ETH, fr, sciF } from "./transformations-non-totales-outils";

export function scenesC(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab } = O;

/* ---------- le tableau d'avancement ---------- */
const XC = [285, 475, 665, 855], YR = [255, 345, 435], CW = 186, CH = 76;
scene("avancement", {
  p: { cases: 0, lit: 0, fx: -1, cache: -1, tete: "generique", conc: "C", squelette: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    this.tete = XC.map((x) => { const r = E("rect", { x: x - CW / 2, y: 160, width: CW, height: 56, class: "cell" }, g); return { r, t: lab(g, x, 197, "", "tn-g s-ink", "middle", 28) }; });
    lab(g, 56, 197, "mol", "tn-s s-c", "start", 22);
    const lignes = [["état initial", "*x* = 0"], ["en cours", "*x*"], ["état final", "*x*_{f}"]];
    this.lig = lignes.map(([a, b], r) => { const gg = E("g", {}, g); lab(gg, 56, YR[r] - 6, a, "tn-l s-ink", "start", 26); lab(gg, 56, YR[r] + 26, b, "tn-s s-c", "start", 22); return gg; });
    this.cel = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
      const gg = E("g", {}, g), rect = E("rect", { x: XC[c] - CW / 2, y: YR[r] - 40, width: CW, height: CH, class: "cell" }, gg);
      this.cel.push({ g: gg, rect, t: lab(gg, XC[c], YR[r] + 8, "", "tn-l s-ink", "middle", 26) });
    }
  },
  render() {
    const p = this.p, ca = p.conc === "CA", C = ca ? "*C*_{A}" : "*C*", cv = `${C} *V*`;
    const cols = COLS[p.tete] || COLS.generique;
    this.tete.forEach((h, c) => { setFx(h.t, p.tete === "aucune" ? "" : cols[c]); show(h.r, p.tete === "aucune" ? 0 : 1); });
    const num = (r, c) => {
      const n0 = sciF(N0, 1);
      const L = [[cv, "excès", "0", "0"], [`${cv} − *x*`, "excès", "*x*", "*x*"], [`${cv} − *x*_{f}`, "excès", "*x*_{f}", "*x*_{f}"]];
      const U = [[n0, "excès", "0", "0"], [`${n0} − *x*`, "excès", "*x*", "*x*"], [sciF(N0 - XF, 1), "excès", sciF(XF, 1), sciF(XF, 1)]];
      return (p.lit ? U : L)[r][c];
    };
    this.cel.forEach((cl, i) => {
      const r = Math.floor(i / 4), c = i % 4, o = i === p.cache ? 0 : clamp(p.cases - i, 0, 1), sq = p.squelette && i !== p.cache && i >= p.cases;
      cl.g.style.opacity = sq ? 1 : o; cl.g.setAttribute("transform", `translate(0 ${((1 - o) * 12).toFixed(1)})`);
      setFx(cl.t, sq ? "" : num(r, c));
      cl.rect.setAttribute("class", i === Math.round(p.fx) ? "cell hl-a" : "cell");
    });
    this.lig.forEach((l, r) => show(l, p.squelette ? 1 : clamp((p.cases - 4 * r) / 2, 0, 1)));
    this.ti.set("Le tableau d’avancement", p.sub || "AH + H_{2}O → A^{−} + H_{3}O^{+} : trois lignes, un avancement *x*");
  },
});

/* ---------- les deux barres : x_max et x_f ---------- */
const BY = 540, BH = 320, BX = [270, 590], BW = 140;
scene("barres", {
  p: { xm: 1, xf: 0, tau: 0, C: C0, pH: PH_ETH, cur: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    E("line", { x1: 150, x2: 860, y1: BY, y2: BY, class: "k-dim", "stroke-width": 2 }, g);
    this.gm = E("g", {}, g);
    this.rm = E("rect", { x: BX[0], width: BW, class: "f-b k-ink", "stroke-width": 3 }, this.gm);
    this.tm = lab(this.gm, BX[0] + BW / 2, 0, "", "tn-l s-ink", "middle", 26);
    lab(this.gm, BX[0] + BW / 2, BY + 40, "*x*_{max}", "tn-g s-ink", "middle", 32);
    this.gf = E("g", {}, g);
    this.ecart = E("rect", { x: BX[1], width: BW, class: "f-c k-dim", "stroke-width": 2, "stroke-dasharray": "8 6" }, this.gf);
    this.rf = E("rect", { x: BX[1], width: BW, class: "s-a k-a", "stroke-width": 3 }, this.gf);
    this.tf = lab(this.gf, BX[1] + BW / 2, 0, "", "tn-l s-ink", "middle", 26);
    lab(this.gf, BX[1] + BW / 2, BY + 40, "*x*_{f}", "tn-g s-ink", "middle", 32);
    this.tt = lab(g, 500, 150, "", "tn-g s-ink", "middle", 38);
    this.tc = lab(g, 60, 622, "", "tn-l s-ink", "start", 26);
    this.tp = lab(g, 60, 658, "", "tn-l s-ink", "start", 26);
  },
  render() {
    const p = this.p, xmax = p.C * V_L, xf = Math.min(xmax, hDe(p.pH) * V_L), tau = xf / xmax;
    const hm = BH, hf = Math.max(4, BH * tau);
    this.rm.setAttribute("y", BY - hm); this.rm.setAttribute("height", hm);
    this.rf.setAttribute("y", BY - hf); this.rf.setAttribute("height", hf);
    this.ecart.setAttribute("y", BY - hm); this.ecart.setAttribute("height", Math.max(0, hm - hf));
    this.tm.setAttribute("y", BY - hm - 16); setFx(this.tm, `${sciF(xmax, 1)} mol`);
    this.tf.setAttribute("y", BY - hm - 16); setFx(this.tf, `${sciF(xf, 1)} mol`);
    show(this.gm, p.xm); show(this.gf, p.xf);
    setFx(this.tt, `*τ* = *x*_{f} / *x*_{max} = ${tau >= 0.995 ? "1" : fr(tau, tau < 0.1 ? 3 : 2)}`); show(this.tt, p.tau);
    setFx(this.tc, `*C* = ${sciF(p.C, 1)} mol·L^{−1}`); setFx(this.tp, `pH = ${fr(p.pH, 1)}`); show(this.tc, p.cur); show(this.tp, p.cur);
    this.ti.set("Jusqu’où l’acide a réagi", p.sub || `*x*_{max} = *C* *V*, avec *V* = ${fr(V_L * 1000, 0)} mL`);
  },
});
}
