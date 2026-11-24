/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RC » (V3), deuxième partie : `courbe` (la figure-clé, copie adaptée de `loi`
 * de la leçon sur la décroissance : la loi exponentielle, la tangente à l'origine, 63 % et 37 %, les
 * curseurs R, C, E) et `expo` (e^{−x}, copie adaptée de la même leçon).
 *
 * `courbe`, paramètres :
 *   jeu     'charge' (u_C monte vers E) | 'decharge' (u_C part de E) | 'energie' (E_e en fonction de u_C)
 *           | 'bac22' (les deux repères du sujet 2022 : u_C(t) avec sa tangente (T), et i(t))
 *   xmax    la fin de l'axe des temps, en s (12 : 5τ et un peu plus ; 2,6 : les dix premiers pas)
 *   ym      la fin de l'axe vertical, en V
 *   curve   0 → 1 : la courbe se trace ; exact : la même, posée au-dessus des pas
 *   Eline   la droite u = E ; trans : le régime transitoire (bande) et le régime permanent
 *   pas     0 → 10 : les pas de la construction (un pas = τ/10 ; chaque pas monte de (E − u)/R · Δt / C)
 *   tan     la tangente à l'origine (en τ elle rejoint E, ou 0 à la décharge)
 *   p63     le point (τ ; 63 % de E) ; lect : une valeur lue (V) : la droite et la verticale qui descend
 *   uR      la courbe u_R = E − u_C ; p37 : sa tangente et le point (τ ; 37 %)
 *   taus    les repères τ … 5τ et leurs pourcentages
 *   ghost   la courbe de R × 2 et C ÷ 2 (le même τ) ; base : la courbe de référence, en gris
 *   R C E   les valeurs des curseurs ; live : τ affiché dans le sous-titre
 *   osc     l'écran de l'oscilloscope : l'axe des temps en divisions (0,5 s par division)
 *   pts     (jeu 'energie') les deux points, 12 V et 24 V
 *   rep     (jeu 'bac22') 1 : le point i(0) ; 2 : le point où (T) coupe le palier
 *   sub     un sous-titre imposé
 * Couleurs : des classes seulement. Le trait d'accent est réservé à ce que la leçon cherche
 * (la tangente, les pas, u_R, la valeur lue).
 */
import {
  E_V, R_OHM, C_F, TAU, U63, U37, I0, N_PAS, DT_PAS, uPas, dUPas, chargePart, dechPart, uC, uR, uDech, energie, EE_12, EE_24,
  S22, OSC_S_DIV, fr, mJ,
} from "./dipole-rc-outils";

export function scenesB(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab, courbe, axes } = O;

/** un nombre pour une graduation : 0,5 ; 2 */
const fT = (t) => (t < 0.1 ? fr(t, 3) : t < 1 ? fr(t, 2) : fr(t, 1));
const gr = (v) => fr(v, Number.isInteger(Math.round(v * 100) / 100) ? 0 : 1);
const line = (parent, cls, w, extra = {}) => E("line", { class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };
const setT = (t, x, y) => { t.setAttribute("x", x.toFixed(1)); t.setAttribute("y", y.toFixed(1)); };
/* ---------- la figure-clé ---------- */
scene("courbe", {
  p: { jeu: "charge", xmax: 12, ym: 14, curve: 0, exact: 0, Eline: 0, trans: 0, pas: 0, tan: 0, p63: 0, lect: 0, uR: 0, p37: 0, taus: 0, ghost: 0, base: 0, R: R_OHM, C: C_F, E: E_V, live: 0, osc: 0, pts: 0, rep: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    const T0 = this.tm = E("g", {}, g);
    this.ax = E("g", {}, T0);
    this.trG = E("g", {}, T0);
    this.trB = E("rect", { class: "f-c" }, this.trG);
    this.trB.style.opacity = 0.4;
    this.trL = lab(this.trG, 0, 0, "régime transitoire", "rc-l s-ink", "middle", 26);
    this.perL = lab(T0, 0, 0, "régime permanent", "rc-l s-ink", "start", 26);
    this.cl = E("g", { "clip-path": "url(#rcclip-courbe)" }, T0);
    this.cvBase = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "8 8" }, this.cl);
    this.cvUR = E("path", { class: "k-a nofill", "stroke-width": 3.5, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.cl);
    this.cvG = E("path", { class: "k-a nofill", "stroke-width": 9 }, this.cl);          // la courbe de R × 2 et C ÷ 2 : un halo sous la courbe noire, qui se superpose
    this.cv = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.cl);
    this.eL = line(T0, "k-dim", 2.5, { "stroke-dasharray": "8 8" });
    this.eT = lab(T0, 0, 0, "", "rc-l s-ink", "start", 26);
    // les pas : un segment par pas, de pente (E − u)/(RC), et un point au bout
    this.stG = E("g", {}, T0);
    this.st = Array.from({ length: N_PAS }, () => ({ l: line(this.stG, "k-a", 4.5), d: E("circle", { r: 7, class: "s-a" }, this.stG) }));
    this.stT1 = lab(this.stG, 0, 0, "", "rc-l s-ink", "start", 26);
    this.stT2 = lab(this.stG, 0, 0, "", "rc-l s-ink", "start", 26);
    // la tangente à l'origine
    this.tgG = E("g", {}, T0);
    this.tgL = line(this.tgG, "k-a", 3.5, { "stroke-dasharray": "10 8" });
    this.tgV = line(this.tgG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.tgD = E("circle", { r: 7, class: "s-a" }, this.tgG);
    this.tgT = lab(this.tgG, 0, 0, "*τ*", "rc-g s-a", "middle", 36);
    this.tgN = lab(this.tgG, 0, 0, "tangente", "rc-l s-ink", "start", 26);
    // le point à 63 %
    this.pG = E("g", {}, T0);
    this.pH = line(this.pG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.pV = line(this.pG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.pD = E("circle", { r: 8, class: "s-ink" }, this.pG);
    this.pT = lab(this.pG, 0, 0, "", "rc-l s-ink", "start", 26);
    // une valeur lue
    this.lG = E("g", {}, T0);
    this.lH = line(this.lG, "k-a", 3, { "stroke-dasharray": "8 7" });
    this.lV = line(this.lG, "k-a", 3, { "stroke-dasharray": "8 7" });
    this.lD = E("circle", { r: 8, class: "s-a" }, this.lG);
    this.lT = lab(this.lG, 0, 0, "", "rc-l s-ink", "start", 26);
    // le point à 37 % de u_R
    this.rG = E("g", {}, T0);
    this.rTg = line(this.rG, "k-ink", 3, { "stroke-dasharray": "10 8" });
    this.rH = line(this.rG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.rV = line(this.rG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.rD = E("circle", { r: 8, class: "s-ink" }, this.rG);
    this.rT = lab(this.rG, 0, 0, "", "rc-l s-ink", "start", 26);
    this.rN = lab(this.rG, 0, 0, "*u*_{R}", "rc-g s-a", "start", 36);
    // les repères nτ
    this.nt = [1, 2, 3, 4, 5].map((n) => { const sg = E("g", {}, T0); return { g: sg, v: line(sg, "k-dim", 2, { "stroke-dasharray": "5 7" }), d: E("circle", { r: 6.5, class: "s-ink" }, sg), l: lab(sg, 0, 0, n === 1 ? "*τ*" : `${n}*τ*`, n === 5 ? "rc-l s-a" : "rc-l s-c", "middle", 26), p: lab(sg, 0, 0, "", "rc-l s-ink", "start", 26) }; });
    this.gL = lab(T0, 0, 0, "*R* × 2 et *C* ÷ 2", "rc-l s-ink", "start", 26);
    this.gLl = line(T0, "k-a", 2.5);

    /* ----- l'énergie : une parabole ----- */
    this.enG = E("g", {}, g);
    this.enAx = E("g", {}, this.enG);
    this.enCv = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.enG);
    this.enP = [12, 24].map((u) => { const sg = E("g", {}, this.enG); return { u, g: sg, h: line(sg, "k-dim", 2.5, { "stroke-dasharray": "6 7" }), v: line(sg, "k-dim", 2.5, { "stroke-dasharray": "6 7" }), d: E("circle", { r: 8, class: "s-a" }, sg), t: lab(sg, 0, 0, "", "rc-l s-ink", "end", 26) }; });

    /* ----- les deux repères du sujet 2022 ----- */
    this.bG = E("g", {}, g);
    this.bAx = E("g", {}, this.bG);
    this.b1 = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.bG);
    this.b2 = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.bG);
    this.bT = line(this.bG, "k-a", 3.5, { "stroke-dasharray": "10 8" });
    this.bTl = lab(this.bG, 0, 0, "(T)", "rc-l s-ink", "start", 26);
    this.bC1 = lab(this.bG, 0, 0, "(*C*_{1})", "rc-l s-ink", "start", 26);
    this.bC2 = lab(this.bG, 0, 0, "(*C*_{2})", "rc-l s-ink", "start", 26);
    this.bR1 = E("g", {}, this.bG); this.bR1h = line(this.bR1, "k-a", 3, { "stroke-dasharray": "8 7" }); this.bR1d = E("circle", { r: 9, class: "s-a" }, this.bR1);
    // la copie du bilan : la lecture à 63 % (grise), puis la bonne, à 37 % (rouge)
    this.bR3 = E("g", {}, this.bG); this.bR3h = line(this.bR3, "k-dim", 3, { "stroke-dasharray": "8 7" }); this.bR3v = line(this.bR3, "k-dim", 3, { "stroke-dasharray": "8 7" }); this.bR3d = E("circle", { r: 9, class: "s-dim" }, this.bR3); this.bR3t = lab(this.bR3, 0, 0, "", "rc-l s-c", "start", 26);
    this.bR4 = E("g", {}, this.bG); this.bR4h = line(this.bR4, "k-a", 3, { "stroke-dasharray": "8 7" }); this.bR4v = line(this.bR4, "k-a", 3, { "stroke-dasharray": "8 7" }); this.bR4d = E("circle", { r: 9, class: "s-a" }, this.bR4); this.bR4t = lab(this.bR4, 0, 0, "", "rc-l s-ink", "start", 26);
    this.bR2 = E("g", {}, this.bG); this.bR2v = line(this.bR2, "k-a", 3, { "stroke-dasharray": "8 7" }); this.bR2d = E("circle", { r: 9, class: "s-a" }, this.bR2);
  },
  render() {
    const p = this.p, jeu = p.jeu, tau = p.R * p.C, Ev = p.E;
    const temps = jeu === "charge" || jeu === "decharge";
    show(this.tm, temps ? 1 : 0); show(this.enG, jeu === "energie" ? 1 : 0); show(this.bG, jeu === "bac22" ? 1 : 0);
    let a = "", b = "";
    if (temps) {
      const X = (t) => 110 + (790 * t) / p.xmax, Y = (v) => 590 - (440 * v) / p.ym, dech = jeu === "decharge";
      const key = [p.xmax.toFixed(2), p.ym.toFixed(1), p.osc > 0.5 ? 1 : 0, p.uR > 0.5 || (p.p37 > 0.5 && jeu === "charge") ? 1 : 0].join();
      if (this._k !== key) {
        this._k = key;
        const xs = p.osc > 0.5 ? OSC_S_DIV : p.xmax <= 1.2 ? 0.2 : p.xmax <= 3.2 ? 0.5 : 1;
        axes(this.ax, X, Y, 0, p.xmax, xs, p.ym, p.ym <= 4 ? 1 : p.ym <= 15 ? 2 : 4, p.osc > 0.5 ? (v) => String(Math.round(v / OSC_S_DIV)) : gr, (v) => String(v), p.osc > 0.5 ? "divisions (0,5 s chacune)" : "*t* (s)", p.uR > 0.5 || (p.p37 > 0.5 && jeu === "charge") ? "*u* (V)" : "*u*_{C} (V)", 56);
      }
      const fU = (t) => (dech ? uDech(t, Ev, tau) : uC(t, Ev, tau));
      const fUR = (t) => Ev - fU(t);
      const dr = Math.max(p.curve, p.exact);
      // le régime transitoire (0 à 5τ) et le régime permanent
      show(this.trG, p.trans);
      this.trB.setAttribute("x", X(0).toFixed(1)); this.trB.setAttribute("y", Y(p.ym).toFixed(1)); this.trB.setAttribute("width", Math.max(0, X(Math.min(5 * tau, p.xmax)) - X(0)).toFixed(1)); this.trB.setAttribute("height", (Y(0) - Y(p.ym)).toFixed(1));
      setT(this.trL, (X(0) + X(Math.min(5 * tau, p.xmax))) / 2, Y(p.ym) + 34);
      setT(this.perL, X(5 * tau) + 10, Y(Ev) - 16); show(this.perL, 5 * tau < p.xmax - 1.2 ? p.trans : 0);
      // les courbes
      this.cv.setAttribute("d", courbe(fU, 0, p.xmax, X, Y)); this.cv.style.strokeDashoffset = 1000 * (1 - dr);
      this.cvUR.setAttribute("d", courbe(fUR, 0, p.xmax, X, Y)); this.cvUR.style.strokeDashoffset = 1000 * (1 - clamp(p.uR, 0, 1)); show(this.cvUR, p.uR > 0 ? 1 : 0);
      this.cvBase.setAttribute("d", courbe((t) => (dech ? uDech(t) : uC(t)), 0, p.xmax, X, Y)); show(this.cvBase, 0.9 * p.base);
      this.cvG.setAttribute("d", courbe((t) => (dech ? uDech(t, Ev, p.R * 2 * (p.C / 2)) : uC(t, Ev, p.R * 2 * (p.C / 2))), 0, p.xmax, X, Y)); show(this.cvG, 0.35 * p.ghost);
      { const ug = fU(2.6 * tau); setT(this.gL, X(2.6 * tau) - 40, Y(0.62 * Ev)); setL(this.gLl, X(2.6 * tau), Y(0.62 * Ev) - 30, X(2.6 * tau), Y(ug) + 8); show(this.gL, p.ghost); show(this.gLl, p.ghost); }
      // la droite u = E
      setL(this.eL, X(0), Y(Ev), X(p.xmax), Y(Ev)); show(this.eL, p.Eline);
      setT(this.eT, X(0) + 14, Y(Ev) - 12); setFx(this.eT, `*E* = ${fr(Ev, 0)} V`); show(this.eT, p.Eline);
      // les pas : de pente (E − u)/(RC), un pas dure τ/10
      const dt = tau / N_PAS;
      this.st.forEach((s, k) => {
        const u0 = Ev * (1 - 0.9 ** k), u1 = Ev * (1 - 0.9 ** (k + 1));
        setL(s.l, X(k * dt), Y(u0), X((k + 1) * dt), Y(u1)); setC(s.d, X((k + 1) * dt), Y(u1));
        const o = clamp(p.pas - k, 0, 1); show(s.l, o); show(s.d, o);
      });
      const du1 = Ev * 0.1, du2 = Ev * 0.9 * 0.1;
      setFx(this.stT1, `+ ${fr(du1, 1)} V`); setT(this.stT1, X(dt) + 16, Y(du1 / 2) + 12);
      setFx(this.stT2, `+ ${fr(du2, 2)} V`); setT(this.stT2, X(2 * dt) + 16, Y(du1 + du2 / 2) + 12);
      show(this.stT1, clamp(p.pas, 0, 1) * (p.pas < 3 ? 1 : 0)); show(this.stT2, clamp(p.pas - 1, 0, 1) * (p.pas < 3 ? 1 : 0));
      // la tangente
      const y0 = dech ? Ev : 0, y1 = dech ? 0 : Ev;
      this.tgL.setAttribute("class", p.lect > 0 ? "k-dim" : "k-a"); this.tgD.setAttribute("class", p.lect > 0 ? "s-dim" : "s-a");
      setL(this.tgL, X(0), Y(y0), X(tau), Y(y1)); setL(this.tgV, X(tau), Y(y1), X(tau), Y(0)); setC(this.tgD, X(tau), Y(y1));
      setT(this.tgT, X(tau), Y(0) + 76); show(this.tgT, (1 - Math.min(1, p.taus * 5)) * (p.lect > 0 ? 0 : 1)); setT(this.tgN, X(tau) + 18, dech ? Y(0) - 44 : Y(Ev) + 36); show(this.tgG, p.tan); show(this.tgN, p.tan > 0 && !p.osc ? 1 : 0);
      // le point à 63 %
      const u63 = fU(tau);
      setL(this.pH, X(0), Y(u63), X(tau), Y(u63)); setL(this.pV, X(tau), Y(u63), X(tau), Y(0)); setC(this.pD, X(tau), Y(u63));
      setFx(this.pT, `${fr(u63, 1)} V`); setT(this.pT, X(tau) + 16, Y(u63) + (dech ? -14 : 36)); show(this.pG, p.p63);
      // une valeur lue : la droite u = lect et la verticale jusqu'à l'axe des temps
      const vl = p.lect, tl = dech ? -tau * Math.log(Math.max(vl, 1e-9) / Ev) : -tau * Math.log(Math.max(1 - vl / Ev, 1e-9));
      setL(this.lH, X(0), Y(vl), X(tl), Y(vl)); setL(this.lV, X(tl), Y(vl), X(tl), Y(0)); setC(this.lD, X(tl), Y(vl));
      setFx(this.lT, `${fr(vl, 1)} V`); setT(this.lT, X(tl) + 16, Y(vl) + (dech ? -14 : 36)); show(this.lG, vl > 0 ? 1 : 0);
      // u_R : sa tangente à l'origine coupe l'axe des temps en τ, et il en reste 37 %
      const r37 = dech ? fU(tau) : fUR(tau);
      setL(this.rTg, X(0), Y(Ev), X(tau), Y(0)); show(this.rTg, dech ? 0 : 1); setL(this.rH, X(0), Y(r37), X(tau), Y(r37)); setL(this.rV, X(tau), Y(r37), X(tau), Y(0)); setC(this.rD, X(tau), Y(r37));
      setFx(this.rT, `${fr(r37, 1)} V`); setT(this.rT, X(tau) + 16, Y(r37) - 14); setT(this.rN, X(0.18 * tau) + 18, Y(Ev) + 44);
      show(this.rG, p.p37); show(this.rN, p.uR > 0.5 ? 1 : 0);
      // les repères nτ
      this.nt.forEach((q, i) => {
        const n = i + 1, t = n * tau, v = fU(t), o = clamp(p.taus * 5 - i, 0, 1) * (t <= p.xmax + 1e-9 ? 1 : 0);
        setL(q.v, X(t), Y(v), X(t), Y(0)); setC(q.d, X(t), Y(v));
        setT(q.l, X(t), Y(0) + 76); setT(q.p, X(t) + 14, dech ? Y(v) - 16 : Y(v) + 36); setFx(q.p, `${fr((dech ? dechPart(n) : chargePart(n)) * 100, n === 5 ? 1 : 0)} %`); show(q.g, o);
      });
      // quelques mots sur les courbes
      // les titres
      if (p.live) { a = "Les trois curseurs"; b = `*R* = ${fr(p.R / 1e3, Number.isInteger(p.R / 1e3) ? 0 : 1)} kΩ · *C* = ${fr(p.C * 1e6, 0)} µF · *E* = ${fr(Ev, 0)} V · *τ* = ${fT(tau)} s`; }
      else if (p.osc > 0.5) { a = "L’écran de l’oscilloscope"; b = "0,5 s par division"; }
      else if (p.pas > 0.05) { a = "La charge, pas à pas"; b = `un pas dure ${fr(DT_PAS, 2)} s`; }
      else if (dech) { a = "La décharge"; b = `*u*_{C}(0) = ${fr(Ev, 0)} V`; }
      else if (p.taus > 0.5) { a = "Les repères de la durée de charge"; b = "ce qui est atteint à *τ*, 2*τ*, 3*τ*, 4*τ*, 5*τ*"; }
      else if (p.p37 > 0.5 || p.uR > 0.5) { a = "Ce qui reste à charger"; b = ""; }
      else if (p.lect > 0) { a = "Une lecture graphique"; b = "la valeur lue, et l’instant où la courbe la prend"; }
      else if (p.tan > 0.5) { a = "La tangente à l’origine"; b = "elle rejoint la droite *u* = *E* en *τ*"; }
      else if (p.ghost > 0.5) { a = "Deux montages, une courbe ?"; b = `*R* = ${fr(p.R / 1e3, 0)} kΩ, *C* = ${fr(p.C * 1e6, 0)} µF · *E* = ${fr(Ev, 0)} V`; }
      else { a = "La tension aux bornes du condensateur"; b = `*E* = ${fr(Ev, 0)} V · *R* = ${fr(p.R / 1e3, 0)} kΩ · *C* = ${fr(p.C * 1e6, 0)} µF`; }
    } else if (jeu === "energie") {
      const X = (u) => 110 + (790 * u) / 26, Y = (e) => 590 - (440 * e) / 70;
      if (this._ke !== "e") { this._ke = "e"; axes(this.enAx, X, Y, 0, 26, 4, 70, 10, (v) => String(v), (v) => String(v), "*u*_{C} (V)", "*E*_{e} (mJ)"); }
      this.enCv.setAttribute("d", courbe((u) => energie(C_F, u) * 1e3, 0, 25, X, Y, 100)); this.enCv.style.strokeDashoffset = 1000 * (1 - p.curve);
      this.enP.forEach((q, i) => {
        const e = energie(C_F, q.u) * 1e3;
        setL(q.h, X(0), Y(e), X(q.u), Y(e)); setL(q.v, X(q.u), Y(e), X(q.u), Y(0)); setC(q.d, X(q.u), Y(e));
        setFx(q.t, `${fr(e, 1)} mJ`); setT(q.t, X(q.u) - 16, Y(e) - 4); show(q.g, clamp(p.pts * 2 - i, 0, 1));
      });
      a = "L’énergie emmagasinée"; b = "*E*_{e} en fonction de *u*_{C} : une parabole";
    } else if (jeu === "bac22") {
      const X1 = (t) => 100 + (360 * t) / 200, X2 = (t) => 560 + (360 * t) / 200, Y = (v) => 580 - (360 * v) / 12;
      if (this._kb !== "b") {
        this._kb = "b"; this.bAx.textContent = "";
        const g1 = E("g", {}, this.bAx), g2 = E("g", {}, this.bAx);
        axes(g1, X1, Y, 0, 200, 50, 12, 3, (v) => String(v), (v) => String(v), "*t* (ms)", "*u*_{C} (V)", 56);
        axes(g2, X2, Y, 0, 200, 50, 12, 3, (v) => String(v), (v) => String(v), "*t* (ms)", "*i* (mA)", 56);
      }
      const tauB = S22.tau * 1e3;
      this.b1.setAttribute("d", courbe((t) => S22.E * (1 - Math.exp(-t / tauB)), 0, 200, X1, Y, 120)); this.b1.style.strokeDashoffset = 1000 * (1 - p.curve);
      this.b2.setAttribute("d", courbe((t) => (S22.i0 * 1e3) * Math.exp(-t / tauB), 0, 200, X2, Y, 120)); this.b2.style.strokeDashoffset = 1000 * (1 - p.curve);
      setL(this.bT, X1(0), Y(0), X1(tauB), Y(S22.E));
      setT(this.bTl, X1(tauB) + 16, Y(S22.E) + 6);
      setT(this.bC1, X1(120), Y(S22.E * (1 - Math.exp(-120 / tauB))) + 44); setT(this.bC2, X2(70), Y(S22.i0 * 1e3 * Math.exp(-70 / tauB)) - 20);
      this.bT.setAttribute("class", p.rep >= 3 ? "k-dim" : "k-a"); show(this.bT, p.curve); show(this.bTl, p.curve); show(this.bC1, p.curve); show(this.bC2, p.curve);
      setL(this.bR1h, X2(0), Y(S22.i0 * 1e3), X2(0) + 0.01, Y(S22.i0 * 1e3)); setC(this.bR1d, X2(0), Y(S22.i0 * 1e3)); show(this.bR1, p.rep === 1 ? 1 : 0);
      setL(this.bR2v, X1(tauB), Y(S22.E), X1(tauB), Y(0)); setC(this.bR2d, X1(tauB), Y(S22.E)); show(this.bR2, p.rep === 2 ? 1 : 0);
      const tA = S22.tCopie * 1e3, iB = S22.i37 * 1e3;
      setL(this.bR3h, X2(0), Y(S22.i63 * 1e3), X2(tA), Y(S22.i63 * 1e3)); setL(this.bR3v, X2(tA), Y(S22.i63 * 1e3), X2(tA), Y(0)); setC(this.bR3d, X2(tA), Y(S22.i63 * 1e3));
      setFx(this.bR3t, `${fr(S22.i63 * 1e3, 1)} mA`); setT(this.bR3t, X2(tA) + 14, Y(S22.i63 * 1e3) - 14);
      setL(this.bR4h, X2(0), Y(iB), X2(tauB), Y(iB)); setL(this.bR4v, X2(tauB), Y(iB), X2(tauB), Y(0)); setC(this.bR4d, X2(tauB), Y(iB));
      setFx(this.bR4t, `${fr(iB, 1)} mA`); setT(this.bR4t, X2(tauB) + 14, Y(iB) - 14);
      show(this.bR3, p.rep >= 3 ? 1 : 0); show(this.bR4, clamp(p.rep - 3, 0, 1));
      a = "Sujet 2022, session normale"; b = "figure 2 : les courbes (C₁) et (C₂), et la tangente (T)";
    }
    this.ti.set(a, p.sub || b);
  },
});

/* ---------- e^{−x}, de 1 vers 0 sans l'atteindre ---------- */
scene("expo", {
  p: { cv: 0, p1: 0, p5: 0, tg: 0 },
  build(g) {
    const X = (x) => 130 + 150 * x, Y = (y) => 560 - 400 * y;
    this.ti = titre(g, "La fonction e^{−t/τ}", "elle décroît de 1 vers 0");
    const ax = E("g", {}, g);
    axes(ax, X, Y, 0, 5.4, 1, 1, 0.5, (v) => String(v), (v) => (v === 0.5 ? "0,5" : String(v)), "*t*/*τ*", "e^{−t/τ}", 56);
    this.cv = E("path", { d: courbe((x) => Math.exp(-x), 0, 5.4, X, Y), class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, g);
    this.tg = E("g", {}, g);
    E("line", { x1: X(0), y1: Y(1), x2: X(1), y2: Y(0), class: "k-a", "stroke-width": 3.5, "stroke-dasharray": "10 8" }, this.tg);
    lab(this.tg, X(0.5) + 12, Y(0.5) - 14, "tangente en 0", "rc-l s-ink", "start", 26);
    const pt = (x, g2, txt, dx, dy, anc) => { const sg = E("g", {}, g); E("line", { x1: X(0), y1: Y(Math.exp(-x)), x2: X(x), y2: Y(Math.exp(-x)), class: "k-dim", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, sg); E("line", { x1: X(x), y1: Y(Math.exp(-x)), x2: X(x), y2: Y(0), class: "k-dim", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, sg); E("circle", { cx: X(x), cy: Y(Math.exp(-x)), r: 8, class: "s-a" }, sg); lab(sg, X(x) + dx, Y(Math.exp(-x)) + dy, txt, "rc-g s-ink", anc, 36); return sg; };
    this.p1 = pt(1, 0, `e^{−1} ≈ ${fr(Math.exp(-1), 2)}`, 22, -20, "start");
    this.p5 = pt(5, 0, `e^{−5} ≈ ${fr(Math.exp(-5), 3)}`, -10, -30, "end");
  },
  render() {
    const p = this.p;
    this.cv.style.strokeDashoffset = 1000 * (1 - p.cv); show(this.p1, p.p1); show(this.p5, p.p5); show(this.tg, p.tg);
  },
});
}
