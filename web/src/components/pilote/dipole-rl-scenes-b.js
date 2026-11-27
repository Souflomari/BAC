/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RL » (V3), deuxième partie : `courbe` (la figure-clé : l'établissement du
 * courant i(t), copie adaptée de la scène `courbe` de la leçon sur le dipôle RC : la tangente à
 * l'origine, 63 %, les courbes fantômes, les curseurs L, R, r, E). Les temps sont en millisecondes et
 * les courants en milliampères, comme sur un écran d'oscilloscope.
 *
 * `courbe`, paramètres :
 *   jeu     'etab' (i monte vers I₀) | 'energie' (E_m en fonction de i) | 'bac23' (la figure 2 du sujet 2023)
 *           | 'voies' (deux tensions sur un même écran, d'abord sans nom : u_R et u_L ; rep 1 les nomme)
 *   xmax    la fin de l'axe des temps, en ms (30 : 6τ ; 5 : les dix premiers pas)
 *   ym      la fin de l'axe vertical, en mA
 *   curve   0 → 1 : la courbe se trace ; exact : la même, posée au-dessus des pas
 *   Pline   la droite i = I₀ (le palier) et sa valeur
 *   pas     0 → 10 : les pas de la construction (un pas = τ/10 ; chaque pas monte de (E − (R + r)·i)/L · Δt)
 *   tan     la tangente à l'origine (en τ elle rejoint le palier)
 *   p63     le point (τ ; 63 % de I₀)
 *   ghL     0 → 1 : la courbe de L × 2 ; ghR : la courbe de R × 2 ; base : la courbe de référence, en gris
 *   L R r E les valeurs des curseurs ; live : les valeurs et τ affichés dans le sous-titre, ym suit le palier
 *   saut    0 → 1 : l'hypothèse « i saute de 0 à SAUT.i » : un trait vertical en pointillés à t = 0, puis la ligne horizontale
 *   pts     (jeu 'energie') les deux points, 100 mA et 200 mA
 *   rep     (jeu 'bac23') 1 : le point où (T) coupe le palier ; 2 : la lecture à 37 % de I₀ (la mauvaise)
 *   sub     un sous-titre imposé
 * Couleurs : des classes seulement. Le trait d'accent est réservé à ce que la leçon cherche
 * (la tangente, les pas, la courbe fantôme, le point lu).
 */
import {
  E_V, R_OHM, R_BOB, L_H, TAU, I0, P63, N_PAS, DT_PAS, iPas, dIPas, iEt, uRt, uLt, T_MAX, tauDe, energie, S23, SAUT, fr,
} from "./dipole-rl-outils";

export function scenesB(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab, courbe, axes } = O;

const gr = (v) => fr(v, Number.isInteger(Math.round(v * 100) / 100) ? 0 : 1);
const line = (parent, cls, w, extra = {}) => E("line", { class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };
const setT = (t, x, y) => { t.setAttribute("x", x.toFixed(1)); t.setAttribute("y", y.toFixed(1)); };
const MA = 1e3, MS = 1e3;                                   // A → mA ; s → ms
const fi = (t, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => iEt(t / MS, E, R, r, L) * MA;   // i en mA, t en ms
/** l'échelle verticale qui contient le palier : 60, 120, 240, 500, 1 000, 1 500 mA */
const echelle = (pal) => [60, 120, 240, 500, 1000, 1500].find((y) => pal * 1.12 <= y) || 1500;

scene("courbe", {
  p: { jeu: "etab", xmax: 30, ym: 120, curve: 0, exact: 0, Pline: 0, pas: 0, tan: 0, p63: 0, ghL: 0, ghR: 0, base: 0, L: L_H, R: R_OHM, r: R_BOB, E: E_V, live: 0, pts: 0, rep: 0, saut: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");
    const T0 = this.tm = E("g", {}, g);
    this.ax = E("g", {}, T0);
    this.cl = E("g", { "clip-path": "url(#rlclip-courbe)" }, T0);
    this.cvBase = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "8 8" }, this.cl);
    this.cvG = E("path", { class: "k-a nofill", "stroke-width": 4.5, "stroke-dasharray": "14 9" }, this.cl);          // la courbe fantôme (L × 2 ou R × 2), en accent
    this.cv = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.cl);
    this.eL = line(T0, "k-dim", 2.5, { "stroke-dasharray": "8 8" });
    this.eT = lab(T0, 0, 0, "", "rl-l s-ink", "start", 26);
    // les pas : un segment par pas, de pente (E − (R + r)·i)/L, et un point au bout
    this.stG = E("g", {}, T0);
    this.st = Array.from({ length: N_PAS }, () => ({ l: line(this.stG, "k-a", 4.5), d: E("circle", { r: 7, class: "s-a" }, this.stG) }));
    this.stT1 = lab(this.stG, 0, 0, "", "rl-l s-ink", "start", 26);
    this.stT2 = lab(this.stG, 0, 0, "", "rl-l s-ink", "start", 26);
    // l'hypothèse d'un saut de i : un trait vertical en pointillés, puis une ligne horizontale
    this.sjG = E("g", {}, T0);
    this.sjV = line(this.sjG, "k-ink", 3.5, { "stroke-dasharray": "9 8" });
    this.sjH = line(this.sjG, "k-ink", 3.5, { "stroke-dasharray": "9 8" });
    this.sjT = lab(this.sjG, 0, 0, "", "rl-l s-ink", "start", 26);
    // la tangente à l'origine
    this.tgG = E("g", {}, T0);
    this.tgL = line(this.tgG, "k-a", 3.5, { "stroke-dasharray": "10 8" });
    this.tgV = line(this.tgG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.tgD = E("circle", { r: 7, class: "s-a" }, this.tgG);
    this.tgT = lab(this.tgG, 0, 0, "*τ*", "rl-g s-a", "middle", 36);
    this.tgN = lab(this.tgG, 0, 0, "tangente", "rl-l s-ink", "start", 26);
    // le point à 63 %
    this.pG = E("g", {}, T0);
    this.pH = line(this.pG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.pV = line(this.pG, "k-dim", 2.5, { "stroke-dasharray": "6 7" });
    this.pD = E("circle", { r: 8, class: "s-ink" }, this.pG);
    this.pT = lab(this.pG, 0, 0, "", "rl-l s-ink", "start", 26);
    this.gL = lab(T0, 0, 0, "", "rl-l s-ink", "start", 26);

    /* ----- l'énergie : une parabole ----- */
    this.enG = E("g", {}, g);
    this.enAx = E("g", {}, this.enG);
    this.enCv = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.enG);
    this.enP = [0.1, 0.2].map((i) => { const sg = E("g", {}, this.enG); return { i, g: sg, h: line(sg, "k-dim", 2.5, { "stroke-dasharray": "6 7" }), v: line(sg, "k-dim", 2.5, { "stroke-dasharray": "6 7" }), d: E("circle", { r: 8, class: "s-a" }, sg), t: lab(sg, 0, 0, "", "rl-l s-ink", "end", 26) }; });

    /* ----- deux tensions sur un même écran (les deux voies d'un oscilloscope) ----- */
    this.vG = E("g", {}, g);
    this.vAx = E("g", {}, this.vG);
    this.v1 = E("path", { class: "k-ink nofill", "stroke-width": 4.5, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.vG);
    this.v2 = E("path", { class: "k-ink nofill", "stroke-width": 4.5, "stroke-dasharray": "16 9" }, this.vG);
    this.v1l = lab(this.vG, 0, 0, "", "rl-g s-ink", "start", 36);
    this.v2l = lab(this.vG, 0, 0, "", "rl-g s-ink", "start", 36);

    /* ----- la figure 2 du sujet 2023 ----- */
    this.bG = E("g", {}, g);
    this.bAx = E("g", {}, this.bG);
    this.b1 = E("path", { class: "k-ink nofill", "stroke-width": 4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.bG);
    this.bP = line(this.bG, "k-dim", 2.5, { "stroke-dasharray": "8 8" });
    this.bPl = lab(this.bG, 0, 0, "", "rl-l s-ink", "start", 26);
    this.bT = line(this.bG, "k-a", 3.5, { "stroke-dasharray": "10 8" });
    this.bTl = lab(this.bG, 0, 0, "(T)", "rl-l s-ink", "start", 26);
    this.bR1 = E("g", {}, this.bG); this.bR1v = line(this.bR1, "k-a", 3, { "stroke-dasharray": "8 7" }); this.bR1d = E("circle", { r: 9, class: "s-a" }, this.bR1);
    this.bR2 = E("g", {}, this.bG); this.bR2h = line(this.bR2, "k-dim", 3, { "stroke-dasharray": "8 7" }); this.bR2v = line(this.bR2, "k-dim", 3, { "stroke-dasharray": "8 7" }); this.bR2d = E("circle", { r: 9, class: "s-dim" }, this.bR2); this.bR2t = lab(this.bR2, 0, 0, "", "rl-l s-c", "start", 26);
  },
  render() {
    const p = this.p, jeu = p.jeu;
    show(this.tm, jeu === "etab" ? 1 : 0); show(this.enG, jeu === "energie" ? 1 : 0); show(this.bG, jeu === "bac23" ? 1 : 0); show(this.vG, jeu === "voies" ? 1 : 0);
    let a = "", b = "";
    if (jeu === "etab") {
      const pal = (p.E / (p.R + p.r)) * MA, tau = tauDe(p.R, p.r, p.L) * MS;                 // mA ; ms
      const ym = p.live ? echelle(pal) : p.ym;
      const X = (t) => 110 + (790 * t) / p.xmax, Y = (v) => 590 - (440 * v) / ym;
      const key = [p.xmax.toFixed(2), ym.toFixed(0)].join();
      if (this._k !== key) {
        this._k = key;
        const xs = p.xmax <= 6 ? 1 : p.xmax <= 12 ? 2 : 5, ys = ym <= 70 ? 10 : ym <= 130 ? 20 : ym <= 260 ? 40 : ym <= 520 ? 100 : 200;
        axes(this.ax, X, Y, 0, p.xmax, xs, ym, ys, gr, (v) => String(v), "*t* (ms)", "*i* (mA)", 56);
      }
      const f = (t) => fi(t, p.E, p.R, p.r, p.L);
      const dr = Math.max(p.curve, p.exact);
      this.cv.setAttribute("d", courbe(f, 0, p.xmax, X, Y)); this.cv.style.strokeDashoffset = 1000 * (1 - dr);
      this.cvBase.setAttribute("d", courbe((t) => fi(t), 0, p.xmax, X, Y)); show(this.cvBase, 0.9 * p.base);
      // la courbe fantôme : L × 2 (même palier, deux fois plus lent) ou R × 2 (palier plus bas, plus rapide)
      const gh = p.ghL > p.ghR ? "L" : "R", og = Math.max(p.ghL, p.ghR);
      const fg = gh === "L" ? (t) => fi(t, p.E, p.R, p.r, 2 * p.L) : (t) => fi(t, p.E, 2 * p.R, p.r, p.L);
      this.cvG.setAttribute("d", courbe(fg, 0, p.xmax, X, Y)); show(this.cvG, og);
      { const tg = gh === "L" ? 1.6 * tau : 0.9 * tau, ig = fg(tg); setT(this.gL, X(tg) + 14, Y(ig) + 46); setFx(this.gL, gh === "L" ? "*L* × 2" : "*R* × 2"); show(this.gL, og); }
      // le palier
      setL(this.eL, X(0), Y(pal), X(p.xmax), Y(pal)); show(this.eL, p.Pline);
      setT(this.eT, X(0) + 14, Y(pal) - 12); setFx(this.eT, `*I*_{0} = ${fr(pal, pal < 100 ? 1 : 0)} mA`); show(this.eT, p.Pline);
      // les pas : un pas dure τ/10
      const dt = tau / N_PAS;
      this.st.forEach((s, k) => {
        const i0 = pal * (1 - 0.9 ** k), i1 = pal * (1 - 0.9 ** (k + 1));
        setL(s.l, X(k * dt), Y(i0), X((k + 1) * dt), Y(i1)); setC(s.d, X((k + 1) * dt), Y(i1));
        const o = clamp(p.pas - k, 0, 1); show(s.l, o); show(s.d, o);
      });
      const d1 = dIPas(1) * MA, d2 = dIPas(2) * MA;
      setFx(this.stT1, `+ ${fr(d1, 0)} mA`); setT(this.stT1, X(dt) + 16, Y(d1 / 2) + 12);
      setFx(this.stT2, `+ ${fr(d2, 1)} mA`); setT(this.stT2, X(2 * dt) + 16, Y(d1 + d2 / 2) + 12);
      show(this.stT1, clamp(p.pas, 0, 1) * (p.pas < 3 ? 1 : 0)); show(this.stT2, clamp(p.pas - 1, 0, 1) * (p.pas < 3 ? 1 : 0));
      // le saut hypothétique de i
      { const is = SAUT.i * MA; setL(this.sjV, X(0), Y(0), X(0), Y(is)); setL(this.sjH, X(0), Y(is), X(p.xmax), Y(is)); setT(this.sjT, X(0) + 22, Y(is) - 16); setFx(this.sjT, `de 0 à ${fr(is, 0)} mA en ${fr(SAUT.dt * 1e6, 0)} µs`); show(this.sjG, p.saut); }
      // la tangente
      setL(this.tgL, X(0), Y(0), X(tau), Y(pal)); setL(this.tgV, X(tau), Y(pal), X(tau), Y(0)); setC(this.tgD, X(tau), Y(pal));
      setT(this.tgT, X(tau), Y(0) + 76); setT(this.tgN, X(tau) + 18, Y(pal) + 40); show(this.tgG, p.tan); show(this.tgN, p.tan);
      // le point à 63 %
      const i63 = pal * P63;
      setL(this.pH, X(0), Y(i63), X(tau), Y(i63)); setL(this.pV, X(tau), Y(i63), X(tau), Y(0)); setC(this.pD, X(tau), Y(i63));
      setFx(this.pT, `${fr(i63, 0)} mA`); setT(this.pT, X(tau) + 16, Y(i63) + 36); show(this.pG, p.p63);
      // les titres
      if (p.saut > 0.5) { a = "Et si *i* sautait ?"; b = "une hypothèse, tracée en pointillés"; }
      else if (p.live) { a = "Les quatre curseurs"; b = `*L* = ${fr(p.L, 2)} H · *R* = ${fr(p.R, 0)} Ω · *r* = ${fr(p.r, 0)} Ω · *E* = ${fr(p.E, 0)} V`; }
      else if (p.pas > 0.05) { a = "L’établissement, pas à pas"; b = `un pas dure ${fr(DT_PAS * MS, 1)} ms`; }
      else if (og > 0.5) { a = "Deux montages, deux courbes"; b = gh === "L" ? `trait plein : *L* = ${fr(p.L, 2)} H · trait discontinu : *L* × 2` : `trait plein : *R* = ${fr(p.R, 0)} Ω · trait discontinu : *R* × 2`; }
      else if (p.tan > 0.5) { a = "La tangente à l’origine"; b = "elle rejoint le palier en *τ*"; }
      else { a = "L’intensité du courant dans le circuit"; b = `*E* = ${fr(p.E, 0)} V · *R* = ${fr(p.R, 0)} Ω · *r* = ${fr(p.r, 0)} Ω · *L* = ${fr(p.L, 2)} H`; }
    } else if (jeu === "energie") {
      const X = (i) => 110 + (790 * i) / 220, Y = (e) => 590 - (440 * e) / 7;
      if (this._ke !== "e") { this._ke = "e"; axes(this.enAx, X, Y, 0, 220, 50, 7, 1, (v) => String(v), (v) => String(v), "*i* (mA)", "*E*_{m} (mJ)"); }
      this.enCv.setAttribute("d", courbe((i) => energie(L_H, i / MA) * MA, 0, 215, X, Y, 100)); this.enCv.style.strokeDashoffset = 1000 * (1 - p.curve);
      this.enP.forEach((q, j) => {
        const e = energie(L_H, q.i) * MA, ix = q.i * MA;
        setL(q.h, X(0), Y(e), X(ix), Y(e)); setL(q.v, X(ix), Y(e), X(ix), Y(0)); setC(q.d, X(ix), Y(e));
        setFx(q.t, `${fr(e, 1)} mJ`); setT(q.t, X(ix) - 16, Y(e) - 4); show(q.g, clamp(p.pts * 2 - j, 0, 1));
      });
      a = "L’énergie emmagasinée"; b = p.curve > 0.5 ? "*E*_{m} en fonction de *i* : une parabole" : "*E*_{m} en fonction de *i*";
    } else if (jeu === "voies") {
      const X = (t) => 110 + (790 * t) / 30, Y = (v) => 590 - (440 * v) / 7;
      if (this._kv !== "v") { this._kv = "v"; axes(this.vAx, X, Y, 0, 30, 5, 7, 1, (v) => String(v), (v) => String(v), "*t* (ms)", "*u* (V)", 56); }
      this.v1.setAttribute("d", courbe((t) => uRt(t / MS), 0, 30, X, Y)); this.v1.style.strokeDashoffset = 1000 * (1 - p.curve);
      this.v2.setAttribute("d", courbe((t) => uLt(t / MS), 0, 30, X, Y)); show(this.v2, p.curve);
      // les deux voies : « 1 » et « 2 » d'abord, puis leurs noms
      setFx(this.v1l, p.rep > 0.5 ? "*u*_{R}" : "voie 1"); setT(this.v1l, X(14), Y(uRt(14 / MS)) + 54);
      setFx(this.v2l, p.rep > 0.5 ? "*u*_{L}" : "voie 2"); setT(this.v2l, X(10), Y(uLt(10 / MS)) - 20);
      a = "L’écran de l’oscilloscope"; b = "deux voies, en volts, sur la même échelle";
    } else if (jeu === "bac23") {
      const I = S23.I0 * MA, ta = S23.tau * MS;
      const X = (t) => 110 + (790 * t) / 12, Y = (v) => 590 - (440 * v) / 60;
      if (this._kb !== "b") { this._kb = "b"; axes(this.bAx, X, Y, 0, 12, 2, 60, 10, (v) => String(v), (v) => String(v), "*t* (ms)", "*i* (mA)", 56); }
      this.b1.setAttribute("d", courbe((t) => I * (1 - Math.exp(-t / ta)), 0, 12, X, Y, 120)); this.b1.style.strokeDashoffset = 1000 * (1 - p.curve);
      setL(this.bP, X(0), Y(I), X(12), Y(I)); setT(this.bPl, X(12) - 150, Y(I) - 12); setFx(this.bPl, `${fr(I, 0)} mA`);
      setL(this.bT, X(0), Y(0), X(ta), Y(I)); setT(this.bTl, X(ta) + 16, Y(I) + 40);
      show(this.bT, p.curve); show(this.bTl, p.curve); show(this.bP, p.curve); show(this.bPl, p.curve);
      setL(this.bR1v, X(ta), Y(I), X(ta), Y(0)); setC(this.bR1d, X(ta), Y(I)); show(this.bR1, p.rep === 1 ? 1 : 0);
      const i37 = I * (1 - Math.exp(-S23.t37 / S23.tau)), t37 = S23.t37 * MS;
      setL(this.bR2h, X(0), Y(i37), X(t37), Y(i37)); setL(this.bR2v, X(t37), Y(i37), X(t37), Y(0)); setC(this.bR2d, X(t37), Y(i37));
      setFx(this.bR2t, `${fr(i37, 1)} mA`); setT(this.bR2t, X(t37) + 14, Y(i37) - 14); show(this.bR2, p.rep === 2 ? 1 : 0);
      a = "Sujet 2023, session normale"; b = "figure 2 : l’intensité *i*(*t*) et la tangente (T)";
    }
    this.ti.set(a, p.sub || b);
  },
});
}
