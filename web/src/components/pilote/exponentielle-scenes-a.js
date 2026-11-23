/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « fonction exponentielle » (séance 1), première partie : le rappel sur ln (`savoir`),
 * l'énigme de Bernoulli (`interets`, nouvelle) et le miroir entre ln et exp (`miroir`, nouvelle,
 * la figure-clé). Aucune couleur écrite en dur : les classes de pilote.css seulement.
 */
import { fr, ent, cap, decCap, N_TAB, LNB, B_TAN, A_PT, LN2 } from "./exponentielle-outils";

export function scenesA(ctx, O) {
const { E, clamp, show, scene, lerp } = ctx;
const { fx, setFx, titre } = O;

/* ---------- 0. ce qu'il faut savoir : trois faits sur ln ---------- */
scene("savoir", {
  p: { q: 0, qr: 0, r1: 0, r2: 0, r3: 0 },
  build(g) {
    this.ti = titre(g, "Ce qu’il faut savoir", "la fonction ln");
    this.qg = E("g", {}, g);
    fx(this.qg, 548, 380, "ln(e^{2}) =", "t-big2 s-ink", "end");
    this.qm = fx(this.qg, 572, 380, "?", "t-big2 s-ink");
    this.qa = fx(this.qg, 572, 380, String(Math.round(Math.log(Math.exp(2)))), "t-big2 s-a");
    const L = [["ln(*ab*) = ln *a* + ln *b*", "un produit devient une somme"],
      ["ln 1 = 0 et ln e = 1", "ln est strictement croissante sur ]0,+∞["],
      ["ln *x* n’existe que pour *x* > 0", "ln 0 et ln(−2) n’existent pas"]];
    this.rs = L.map(([a, b], i) => { const rg = E("g", {}, g), y = 230 + i * 130; fx(rg, 500, y, a, "t-big2 s-ink", "middle"); fx(rg, 500, y + 38, b, "t-lab s-dim", "middle"); return rg; });
  },
  render() {
    const p = this.p;
    show(this.qg, p.q); show(this.qm, 1 - p.qr); show(this.qa, p.qr);
    [p.r1, p.r2, p.r3].forEach((v, i) => show(this.rs[i], v));
  },
});

/* ---------- 1. l'énigme : le capital de Bernoulli, capitalisé n fois ---------- */
scene("interets", {
  p: { n: 1, stair: 0, fin: 0, ghost: 0, plaf: 0, courbe: 0, tab: 0 },
  // l'escalier du capital pour n périodes : palier k à la hauteur (1 + 1/n)^k ; au-delà de 400 marches,
  // l'escalier est échantillonné (à cette échelle, une marche mesure moins de 2 px)
  escalier(n) {
    const X = this.X, Y = this.Y, m = Math.min(n, 400), q = 1 + 1 / n, h = (k) => Math.pow(q, (k * n) / m);
    let d = "";
    for (let k = 0; k < m; k++) d += (k ? "L" : "M") + X(k / m).toFixed(1) + " " + Y(h(k)).toFixed(1) + "L" + X((k + 1) / m).toFixed(1) + " " + Y(h(k)).toFixed(1);
    return d + "L" + X(1).toFixed(1) + " " + Y(h(m)).toFixed(1);
  },
  build(g) {
    const X = (t) => 120 + 760 * t, Y = (v) => 620 - 170 * v; this.X = X; this.Y = Y;
    this.ti = titre(g, "Le capital de Bernoulli", "1 prêté à 100 % par an, capitalisé *n* fois");
    E("line", { x1: X(0), x2: X(1) + 16, y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: X(0), x2: X(0), y1: Y(0), y2: Y(3.1), class: "k-dim", "stroke-width": 1.5 }, g);
    [[0, "0"], [0.5, "6 mois"], [1, "1 an"]].forEach(([t, s]) => { E("line", { x1: X(t), x2: X(t), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, g); fx(g, X(t), Y(0) + 28, s, "t-tick s-dim", "middle"); });
    [1, 2, 3].forEach((v) => { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(v), y2: Y(v), class: "k-dim" }, g); fx(g, X(0) - 12, Y(v) + 5, String(v), "t-tick s-dim", "end"); });
    fx(g, X(0) + 12, 112, "capital", "t-lab s-dim");
    fx(g, X(1) + 14, Y(0) + 5, "temps", "t-lab s-dim");
    // le plafond, y = e
    this.pl = E("g", {}, g);
    E("line", { x1: X(0), x2: X(1), y1: Y(Math.E), y2: Y(Math.E), class: "k-ink", "stroke-dasharray": "8 6", "stroke-width": 1.8 }, this.pl);
    fx(this.pl, X(0) + 14, Y(Math.E) - 12, `${fr(Math.E, 3)}…`, "t-lab2 s-ink");
    // la courbe limite, y = eᵗ
    this.cb = E("g", {}, g);
    let d = ""; for (let i = 0; i <= 120; i++) { const t = i / 120; d += (i ? "L" : "M") + X(t).toFixed(1) + " " + Y(Math.exp(t)).toFixed(1); }
    E("path", { d, class: "k-a nofill", "stroke-width": 2.6, "stroke-dasharray": "9 6" }, this.cb);
    fx(this.cb, X(0.62) - 12, Y(Math.exp(0.62)) - 22, "*y* = e^{*t*}", "t-lab2 s-a", "end");
    // les escaliers n = 1 et n = 2, en discret
    this.gh = E("g", {}, g);
    this.ghP = [1, 2].map((n) => {
      const path = E("path", { class: "k-dim nofill", "stroke-width": 2.2, "stroke-dasharray": "7 5" }, this.gh), v = cap(n);
      E("circle", { cx: X(1), cy: Y(v), r: 5, class: "s-dim" }, this.gh);
      fx(this.gh, X(1) - 12, Y(v) - 12, `*n* = ${n} : ${fr(v, v % 1 ? 2 : 0)}`, "t-lab s-dim", "end");
      return { path, n };
    });
    // l'escalier de l'élève
    this.st = E("path", { class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linejoin": "round" }, g);
    this.dot = E("circle", { r: 8, class: "s-a" }, g);
    this.fn = fx(g, 500, 548, "", "t-cle s-ink", "middle");
    // le tableau n → capital
    this.tb = E("g", {}, g);
    fx(this.tb, 200, 150, "*n*", "t-lab s-dim", "end"); fx(this.tb, 350, 150, "capital", "t-lab s-dim", "end");
    N_TAB.forEach((n, i) => { fx(this.tb, 200, 184 + i * 28, ent(n), "t-lab2 s-ink", "end"); fx(this.tb, 350, 184 + i * 28, fr(cap(n), 3), "t-lab2 s-ink", "end"); });
  },
  render() {
    const p = this.p, X = this.X, Y = this.Y, n = Math.max(1, Math.round(p.n));
    if (this._n !== n) { this._n = n; this.st.setAttribute("d", this.escalier(n)); }
    this.st.style.strokeDashoffset = 1000 * (1 - p.stair);
    const c = cap(n);
    this.dot.setAttribute("cx", X(1)); this.dot.setAttribute("cy", Y(c)); show(this.dot, p.fin * clamp(p.stair * 2 - 1, 0, 1));
    setFx(this.fn, `*n* = ${ent(n)} : capital ≈ ${fr(c, decCap(n))}`); show(this.fn, p.fin * clamp(p.stair * 2 - 1, 0, 1));
    if (!this._g) { this._g = 1; this.ghP.forEach((q) => q.path.setAttribute("d", this.escalier(q.n))); }
    show(this.gh, p.ghost); show(this.pl, p.plaf); show(this.cb, p.courbe); show(this.tb, p.tab);
  },
});

/* ---------- 2. le miroir : ln, exp et la droite y = x (la figure-clé) ---------- */
const US = []; for (let i = 0; i <= 400; i++) US.push(-3.6 + ((Math.log(7.6) + 3.6) * i) / 400);
const GLIDE = [-1.5, 0, 1];
scene("miroir", {
  p: { lnc: 0, diag: 0, a: A_PT, pA: 0, pA2: 0, perp: 0, refl: 0, expc: 0, pts: 0, ptsR: 0, zone: 0, zoneR: 0, asym: 0, k: 0, kOn: 0,
    b: B_TAN, tanB: 0, tanB2: 0, xt: 0, tanX: 0, tg0: 0, zm: 0 },
  // le chemin de la courbe à l'instant r du pliage : (eᵘ ; u) pour r = 0 (ln), (u ; eᵘ) pour r = 1 (exp)
  pathAt(r, X, Y) {
    let d = "";
    for (let i = 0; i < US.length; i++) { const u = US[i], eu = Math.exp(u), x = eu + (u - eu) * r, y = u + (eu - u) * r; d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); }
    return d;
  },
  build(g) {
    this.h1 = fx(g, 60, 52, "", "t-titre s-ink"); this.h2 = fx(g, 60, 78, "", "t-sous");
    // les zones interdites, hachurées
    this.zg = E("g", {}, g);
    this.zr = E("rect", { fill: "url(#ex-hach)", opacity: 0.55 }, this.zg);
    this.zrl = E("g", {}, this.zg);
    this.zl1 = fx(this.zrl, 0, 0, "*x* ≤ 0", "t-lab2 s-ink", "middle"); this.zl2 = fx(this.zrl, 0, 0, "ln n’existe pas", "t-lab s-ink", "middle");
    this.zq = E("g", {}, g);
    this.zqr = E("rect", { fill: "url(#ex-hach)", opacity: 0.55 }, this.zq);
    this.zql = fx(this.zq, 0, 0, "*y* ≤ 0 : la courbe de exp n’y va jamais", "t-lab2 s-ink", "middle");
    const cg = E("g", { "clip-path": "url(#ex-clip-miroir)" }, g);
    this.axX = E("line", { class: "k-dim", "stroke-width": 1.5 }, cg); this.axY = E("line", { class: "k-dim", "stroke-width": 1.5 }, cg);
    this.asV = E("line", { class: "k-a", "stroke-width": 8, "stroke-opacity": 0.35 }, cg); this.asH = E("line", { class: "k-ink", "stroke-width": 8, "stroke-opacity": 0.3 }, cg);
    this.dg = E("line", { class: "k-c", "stroke-dasharray": "9 6", "stroke-width": 2 }, cg);
    this.kL = E("line", { class: "k-ink", "stroke-dasharray": "6 5", "stroke-width": 2 }, cg);
    this.kV = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.6 }, cg);
    this.lnP = E("path", { class: "k-a nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cg);
    this.pliP = E("path", { class: "k-ink nofill", "stroke-width": 3 }, cg);
    this.expP = E("path", { class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cg);
    this.tbL = E("line", { class: "k-a", "stroke-width": 2.6 }, cg); this.tbT = E("path", { class: "k-c nofill", "stroke-width": 2, "stroke-dasharray": "6 4" }, cg);
    this.tcL = E("line", { class: "k-ink", "stroke-width": 2.6 }, cg); this.tcT = E("path", { class: "k-c nofill", "stroke-width": 2, "stroke-dasharray": "6 4" }, cg);
    this.pr = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 2 }, cg);
    this.xV = E("line", { class: "k-ink", "stroke-dasharray": "6 5", "stroke-width": 2 }, cg);
    this.xT = E("line", { class: "k-a", "stroke-width": 3.4 }, cg);
    this.tgL = E("line", { class: "k-a", "stroke-width": 3 }, cg);
    // les graduations (réutilisées à chaque image)
    this.txs = Array.from({ length: 14 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "middle") }));
    this.tys = Array.from({ length: 12 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "end") }));
    this.dgT = fx(g, 0, 0, "*y* = *x*", "t-lab2 s-c");
    this.lnT = fx(g, 0, 0, "*y* = ln *x*", "t-lab2 s-a", "middle");
    this.exT = fx(g, 0, 0, "*y* = e^{*x*}", "t-lab2 s-ink", "middle");
    this.asVT = fx(g, 0, 0, "*x* = 0", "t-lab s-a"); this.asHT = fx(g, 0, 0, "*y* = 0", "t-lab s-ink");
    this.gl = GLIDE.map(() => E("circle", { r: 6, class: "s-ink" }, g));
    // k : le point où la droite y = k coupe ln
    this.kD = E("circle", { r: 8, class: "s-ink" }, g);
    this.kT = fx(g, 930, 112, "", "t-cle s-ink", "end");
    // un point de ln et son reflet
    this.ptA = E("circle", { r: 7, class: "s-ink" }, g); this.ptAT = fx(g, 0, 0, "", "t-lab2 s-ink");
    this.ptB = E("circle", { r: 7, class: "s-ink" }, g); this.ptBT = fx(g, 0, 0, "", "t-lab2 s-ink", "end");
    this.mid = E("circle", { r: 5, class: "s-c" }, g);
    // les points-clés : (1 ; 0) et (e ; 1) sur ln, leurs reflets (0 ; 1) et (1 ; e) sur exp
    this.k1 = [[1, 0, "(1 ; 0)", 14, 56, "start"], [Math.E, 1, "(e ; 1)", 14, 32, "start"]].map(([x, y, s, dx, dy, an]) => ({ x, y, dx, dy, an, c: E("circle", { r: 7, class: "s-a" }, g), t: fx(g, 0, 0, s, "t-lab2 s-ink", an) }));
    this.k2 = [[0, 1, "(0 ; 1)", -14, -14, "end"], [1, Math.E, "(1 ; e)", 14, 34, "start"]].map(([x, y, s, dx, dy, an]) => ({ x, y, dx, dy, an, c: E("circle", { r: 7, class: "s-ink" }, g), t: fx(g, 0, 0, s, "t-lab2 s-ink", an) }));
    // les tangentes à ln en (4 ; ln 4), puis à exp en (ln 4 ; 4)
    this.tbP = E("circle", { r: 7, class: "s-a" }, g); this.tbPT = fx(g, 0, 0, `(${ent(B_TAN)} ; ln ${ent(B_TAN)})`, "t-lab2 s-ink", "end");
    this.tbA = fx(g, 0, 0, "", "t-lab2 s-ink", "middle"); this.tbB = fx(g, 0, 0, "1", "t-lab2 s-ink"); this.tbS = fx(g, 0, 0, "", "t-lab2 s-a", "middle");
    this.tcP = E("circle", { r: 7, class: "s-ink" }, g);
    this.tcA = fx(g, 0, 0, "", "t-lab2 s-ink", "end"); this.tcB = fx(g, 0, 0, "1", "t-lab2 s-ink", "middle"); this.tcS = fx(g, 0, 0, "", "t-lab2 s-ink");
    // un point courant de exp : hauteur et pente
    this.xD = E("circle", { r: 8, class: "s-a" }, g);
    this.lg = E("g", {}, g);
    E("line", { x1: 574, x2: 574, y1: 586, y2: 612, class: "k-ink", "stroke-dasharray": "6 5", "stroke-width": 2.4 }, this.lg);
    E("line", { x1: 560, x2: 590, y1: 654, y2: 636, class: "k-a", "stroke-width": 3.4 }, this.lg);
    this.lgH = fx(this.lg, 608, 606, "", "t-lab2 s-ink"); this.lgP = fx(this.lg, 608, 650, "", "t-lab2 s-ink");
    // la tangente en 0 : y = x + 1, et le zoom
    this.tgP = E("circle", { r: 7, class: "s-a" }, g); this.tgPT = fx(g, 0, 0, "(0 ; 1)", "t-lab2 s-ink", "end");
    this.tgT = fx(g, 0, 0, "*y* = *x* + 1", "t-lab2 s-a", "middle");
    this.zm1 = fx(g, 70, 150, "la courbe reste au-dessus", "t-lab2 s-a"); this.zm2 = fx(g, 70, 180, "de sa tangente, sauf en (0 ; 1)", "t-lab2 s-a");
  },
  render() {
    const p = this.p, U = 76 * (1 + 3.5 * p.zm), CX = 330, CY = 383.2, so = 1 - p.zm;
    const X = (x) => CX + U * x, Y = (y) => CY - U * (y - 1), x0 = X(0), y0 = Y(0);
    const f = (v) => v.toFixed(1), set = (e, o) => { for (const k in o) e.setAttribute(k, typeof o[k] === "number" ? f(o[k]) : o[k]); };
    const at = (e, x, y) => { e.setAttribute("x", f(x)); e.setAttribute("y", f(y)); };
    const pt = (c, x, y) => { c.setAttribute("cx", f(X(x))); c.setAttribute("cy", f(Y(y))); };
    const seg = (l, xa, ya, xb, yb) => set(l, { x1: X(xa), y1: Y(ya), x2: X(xb), y2: Y(yb) });
    // l'en-tête
    let a = "La courbe de ln", b = "";
    if (p.tg0 > 0.5) { a = "La tangente en 0"; b = "pente e^{0} = 1, point (0 ; 1)"; }
    else if (p.tanX > 0.5) { a = "La pente de exp"; b = "en chaque point, hauteur et pente"; }
    else if (p.tanB > 0.5) { a = "La pente de ln, puis son reflet"; b = `tangente en (${ent(p.b)} ; ln ${ent(p.b)})`; }
    else if (p.zone > 0.5) { a = "Où vivent les courbes ?"; b = "ln : *x* > 0 ; exp : *y* > 0"; }
    else if (p.expc > 0.5 || p.refl > 0.5) { a = "ln et exp, deux courbes symétriques"; b = "par rapport à la droite *y* = *x*"; }
    else if (p.pA > 0.5) { a = "Échanger les coordonnées"; b = p.diag > 0.5 ? "la droite *y* = *x*" : ""; }
    else if (p.kOn > 0.5) { a = "Défaire ln"; b = "à chaque hauteur *k*, un seul *x*"; }
    setFx(this.h1, a); setFx(this.h2, b);
    // les axes et leurs graduations
    set(this.axX, { x1: 64, x2: 900, y1: y0, y2: y0 }); set(this.axY, { x1: x0, x2: x0, y1: 72, y2: 672 });
    const lo = Math.ceil((64 - CX) / U), hi = Math.floor((900 - CX) / U);
    this.txs.forEach((q, i) => {
      const v = lo + i, ok = v <= hi && v !== 0 && y0 > 90 && y0 < 650;
      if (ok) { set(q.l, { x1: X(v), x2: X(v), y1: y0, y2: y0 + 6 }); at(q.t, X(v), y0 + 26); setFx(q.t, String(v).replace("-", "−")); }
      q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0;
    });
    const jlo = Math.ceil(1 + (CY - 672) / U), jhi = Math.floor(1 + (CY - 72) / U);
    this.tys.forEach((q, i) => {
      const v = jlo + i, ok = v <= jhi && v !== 0 && x0 > 90 && x0 < 880;
      if (ok) { set(q.l, { x1: x0 - 6, x2: x0, y1: Y(v), y2: Y(v) }); at(q.t, x0 - 12, Y(v) + 5); setFx(q.t, String(v).replace("-", "−")); }
      q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0;
    });
    // les zones interdites
    set(this.zr, { x: 64, y: 72, width: Math.max(0, x0 - 64), height: 600 }); show(this.zg, p.zone * so);
    at(this.zl1, X(-1.75), Y(3.7)); at(this.zl2, X(-1.75), Y(3.7) + 28);
    set(this.zqr, { x: 64, y: y0, width: 836, height: Math.max(0, 672 - y0) }); show(this.zq, p.zoneR * so);
    at(this.zql, X(3.5), Y(-1.4));
    // le pliage
    const key = p.zm.toFixed(3);
    if (this._k !== key) { this._k = key; this.lnP.setAttribute("d", this.pathAt(0, X, Y)); this.expP.setAttribute("d", this.pathAt(1, X, Y)); this._r = null; }
    this.lnP.style.strokeDashoffset = 1000 * (1 - p.lnc); show(this.lnP, so);
    this.expP.style.strokeDashoffset = 1000 * (1 - p.expc); show(this.expP, p.expc > 0 ? 1 : 0);
    const rk = key + ":" + p.refl.toFixed(3);
    if (p.refl > 0 && p.refl < 1 && this._r !== rk) { this._r = rk; this.pliP.setAttribute("d", this.pathAt(p.refl, X, Y)); }
    const gliss = p.refl > 0 && p.expc < 0.5;
    show(this.pliP, gliss ? 1 : 0);
    this.gl.forEach((c, i) => { const u = GLIDE[i], eu = Math.exp(u); pt(c, eu + (u - eu) * p.refl, u + (eu - u) * p.refl); show(c, gliss ? 1 : 0); });
    // la droite y = x
    seg(this.dg, -3.5, -3.5, 7.5, 7.5); show(this.dg, p.diag * so); at(this.dgT, X(4.95) + 10, Y(4.95) + 6); show(this.dgT, p.diag * so);
    at(this.lnT, X(6.3), Y(Math.log(6.3)) + 40); show(this.lnT, clamp(p.lnc * 2 - 1, 0, 1) * so * (p.expc > 0.5 ? 0 : 1));
    at(this.exT, X(-1.6), Y(Math.exp(-1.6)) - 26); show(this.exT, clamp(p.expc * 2 - 1, 0, 1) * so);
    // les asymptotes
    seg(this.asV, 0, -2.8, 0, 0.4); show(this.asV, p.asym); seg(this.asH, -3.5, 0, 0.2, 0); show(this.asH, p.asym);
    at(this.asVT, x0 + 16, Y(-2.45)); show(this.asVT, p.asym); at(this.asHT, X(-3.1), y0 - 16); show(this.asHT, p.asym);
    // k : défaire ln
    const k = p.k, xk = Math.exp(k);
    seg(this.kL, -3.5, k, 7.5, k); show(this.kL, p.kOn * so); seg(this.kV, xk, k, xk, 0); show(this.kV, p.kOn * so);
    pt(this.kD, xk, k); show(this.kD, p.kOn * so);
    const kk = Math.abs(k - Math.round(k)) < 1e-9 ? fr(k, 0) : fr(k, 1);
    setFx(this.kT, `ln *x* = ${kk} pour *x* ${Math.abs(k) < 1e-9 ? "= 1" : "≈ " + fr(xk, 2)}`); show(this.kT, p.kOn * so);
    // un point de ln et son reflet
    const A = p.a, lA = Math.log(A), fa = (v) => fr(v, Number.isInteger(v) ? 0 : 2);
    pt(this.ptA, A, lA); at(this.ptAT, X(A) + 14, Y(lA) + 34); setFx(this.ptAT, `(${fa(A)} ; ${fa(lA)})`); show(this.ptA, p.pA * so); show(this.ptAT, p.pA * so);
    pt(this.ptB, lA, A); at(this.ptBT, X(lA) - 14, Y(A) - 14); setFx(this.ptBT, `(${fa(lA)} ; ${fa(A)})`); show(this.ptB, p.pA2 * so); show(this.ptBT, p.pA2 * so);
    seg(this.pr, A, lA, lA, A); show(this.pr, p.perp * so);
    pt(this.mid, (A + lA) / 2, (A + lA) / 2); show(this.mid, p.perp * so);
    // les points-clés
    this.k1.forEach((q) => { pt(q.c, q.x, q.y); at(q.t, X(q.x) + q.dx, Y(q.y) + q.dy); show(q.c, p.pts * so); show(q.t, p.pts * so); });
    this.k2.forEach((q) => { pt(q.c, q.x, q.y); at(q.t, X(q.x) + q.dx, Y(q.y) + q.dy); show(q.c, p.ptsR * so); show(q.t, p.ptsR * so); });
    // la tangente à ln en (b ; ln b), de pente 1/b : avancer de b, monter de 1
    const B = p.b, lB = Math.log(B), sB = 1 / B;
    seg(this.tbL, B - 3.6, lB - 3.6 * sB, B + 3.4, lB + 3.4 * sB); show(this.tbL, p.tanB * so);
    this.tbT.setAttribute("d", `M${f(X(0))} ${f(Y(lB - 1))}H${f(X(B))}V${f(Y(lB))}`); show(this.tbT, p.tanB * so);
    pt(this.tbP, B, lB); show(this.tbP, p.tanB * so); at(this.tbPT, X(B) - 14, Y(lB) - 16); show(this.tbPT, p.tanB * so);
    at(this.tbA, X(B * 0.62), Y(lB - 1) - 12); setFx(this.tbA, ent(B)); show(this.tbA, p.tanB * so);
    at(this.tbB, X(B) + 12, Y(lB - 0.5) + 7); show(this.tbB, p.tanB * so);
    at(this.tbS, X(B + 1.5), Y(lB + 1.5 * sB) - 26); setFx(this.tbS, `pente 1/${ent(B)}`); show(this.tbS, p.tanB * so);
    // son reflet : la tangente à exp en (ln b ; b), de pente b : avancer de 1, monter de b
    seg(this.tcL, lB - 1.6, B - 1.6 * B, lB + 0.7, B + 0.7 * B); show(this.tcL, p.tanB2 * so);
    this.tcT.setAttribute("d", `M${f(X(lB - 1))} ${f(Y(0))}V${f(Y(B))}H${f(X(lB))}`); show(this.tcT, p.tanB2 * so);
    pt(this.tcP, lB, B); show(this.tcP, p.tanB2 * so);
    at(this.tcA, X(lB - 1) - 12, Y(B / 2) + 7); setFx(this.tcA, ent(B)); show(this.tcA, p.tanB2 * so);
    at(this.tcB, X(lB - 0.5), Y(B) - 12); show(this.tcB, p.tanB2 * so);
    at(this.tcS, X(lB) + 18, Y(B) + 34); setFx(this.tcS, `pente ${ent(B)}, hauteur ${ent(B)}`); show(this.tcS, p.tanB2 * so);
    // un point courant de exp : sa hauteur, sa pente
    const xt = p.xt, ex = Math.exp(xt);
    seg(this.xT, xt - 1.2, ex - 1.2 * ex, xt + 1.2, ex + 1.2 * ex); show(this.xT, p.tanX * so);
    seg(this.xV, xt, 0, xt, ex); show(this.xV, p.tanX * so); pt(this.xD, xt, ex); show(this.xD, p.tanX * so);
    setFx(this.lgH, `hauteur ${fr(ex, 2)}`); setFx(this.lgP, `pente ${fr(ex, 2)}`); show(this.lg, p.tanX * so);
    // la tangente y = x + 1, et le zoom
    seg(this.tgL, -2.4, -1.4, 4.2, 5.2); show(this.tgL, p.tg0);
    pt(this.tgP, 0, 1); show(this.tgP, p.tg0); at(this.tgPT, X(0) - 14, Y(1) - 14); show(this.tgPT, p.tg0 * so);
    at(this.tgT, X(3.0), Y(4.0) - 24); show(this.tgT, p.tg0 * so);
    show(this.zm1, p.zm); show(this.zm2, p.zm);
  },
});
}
