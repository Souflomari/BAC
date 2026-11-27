/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « fonction exponentielle » (séance 1), première partie : le rappel sur ln (`savoir`),
 * l'énigme de Bernoulli (`interets`, nouvelle) et le miroir entre ln et exp (`miroir`, nouvelle,
 * la figure-clé). Aucune couleur écrite en dur : les classes de pilote.css seulement.
 */
import { fr, ent, cap, decCap, sansZeros, LNB, B_TAN, A_PT, LN2 } from "./exponentielle-outils";

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
  p: { n: 1, stair: 0, fin: 0, ghost: 0, plaf: 0, courbe: 0 },
  // l'escalier du capital pour n périodes : palier k à la hauteur (1 + 1/n)^k ; au-delà de 400 marches,
  // l'escalier est échantillonné (à cette échelle, une marche mesure moins de 2 px)
  escalier(n) {
    const X = this.X, Y = this.Y, m = Math.min(n, 400), q = 1 + 1 / n, h = (k) => Math.pow(q, (k * n) / m);
    let d = "";
    for (let k = 0; k < m; k++) d += (k ? "L" : "M") + X(k / m).toFixed(1) + " " + Y(h(k)).toFixed(1) + "L" + X((k + 1) / m).toFixed(1) + " " + Y(h(k)).toFixed(1);
    return d + "L" + X(1).toFixed(1) + " " + Y(h(m)).toFixed(1);
  },
  build(g) {
    // l'axe du capital commence à 0,8 : rien ne vit sous 1
    const V0 = 0.8, X = (t) => 120 + 760 * t, Y = (v) => 610 - 200 * (v - V0); this.X = X; this.Y = Y;
    this.ti = titre(g, "Le capital de Bernoulli", "");
    E("line", { x1: X(0), x2: X(1) + 16, y1: Y(V0), y2: Y(V0), class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: X(0), x2: X(0), y1: Y(V0), y2: Y(3.15), class: "k-dim", "stroke-width": 1.5 }, g);
    [[0, "0"], [0.5, "6 mois"], [1, "1 an"]].forEach(([t, s]) => { E("line", { x1: X(t), x2: X(t), y1: Y(V0), y2: Y(V0) + 6, class: "k-dim" }, g); fx(g, X(t), Y(V0) + 28, s, "t-tick s-dim", "middle"); });
    [1, 2, 3].forEach((v) => { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(v), y2: Y(v), class: "k-dim" }, g); fx(g, X(0) - 12, Y(v) + 5, String(v), "t-tick s-dim", "end"); });
    fx(g, X(0) + 12, Y(3.15) - 6, "capital", "t-lab s-dim");
    fx(g, X(1) + 14, Y(V0) + 5, "temps", "t-lab s-dim");
    // le plafond, y = e
    this.pl = E("g", {}, g);
    E("line", { x1: X(0), x2: X(1), y1: Y(Math.E), y2: Y(Math.E), class: "k-ink", "stroke-dasharray": "8 6", "stroke-width": 1.8 }, this.pl);
    fx(this.pl, X(0) + 14, Y(Math.E) - 12, `${fr(Math.E, 3)}…`, "t-lab2 s-ink");
    // la courbe limite, y = eᵗ
    this.cb = E("g", {}, g);
    let d = ""; for (let i = 0; i <= 120; i++) { const t = i / 120; d += (i ? "L" : "M") + X(t).toFixed(1) + " " + Y(Math.exp(t)).toFixed(1); }
    E("path", { d, class: "k-a nofill", "stroke-width": 2.6, "stroke-dasharray": "9 6" }, this.cb);
    fx(this.cb, X(0.62) - 12, Y(Math.exp(0.62)) - 22, "*y* = e^{*t*}", "t-lab2 s-ink", "end");
    // les escaliers n = 1 et n = 2, en discret
    this.gh = E("g", {}, g);
    this.ghP = [1, 2].map((n) => {
      const path = E("path", { class: "k-dim nofill", "stroke-width": 2.2, "stroke-dasharray": "7 5" }, this.gh), v = cap(n);
      E("circle", { cx: X(1), cy: Y(v), r: 5, class: "s-dim" }, this.gh);
      fx(this.gh, X(1) - 14, Y(v) + 28, `*n* = ${n} : ${sansZeros(fr(v, 3))}`, "t-lab s-dim", "end");
      return { path, n };
    });
    // l'escalier de l'élève
    this.st = E("path", { class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linejoin": "round" }, g);
    this.dot = E("circle", { r: 8, class: "s-a" }, g);
    this.fn = fx(g, 500, 548, "", "t-cle s-ink", "middle");
  },
  render() {
    const p = this.p, X = this.X, Y = this.Y, n = Math.max(1, Math.round(p.n));
    if (this._n !== n) { this._n = n; this.st.setAttribute("d", this.escalier(n)); }
    this.st.style.strokeDashoffset = 1000 * (1 - p.stair);
    const c = cap(n);
    this.dot.setAttribute("cx", X(1)); this.dot.setAttribute("cy", Y(c)); show(this.dot, p.fin * clamp(p.stair * 2 - 1, 0, 1));
    // le texte « n = … : capital ≈ … » s'efface quand la courbe limite prend la scène
    setFx(this.fn, `*n* = ${ent(n)} : capital ≈ ${sansZeros(fr(c, decCap(n)))}`); show(this.fn, p.fin * clamp(p.stair * 2 - 1, 0, 1) * (1 - p.courbe));
    if (!this._g) { this._g = 1; this.ghP.forEach((q) => q.path.setAttribute("d", this.escalier(q.n))); }
    show(this.gh, p.ghost); show(this.pl, p.plaf); show(this.cb, p.courbe);
  },
});

/* ---------- 2. le miroir : ln, exp et la droite y = x (la figure-clé) ---------- */
const US = []; for (let i = 0; i <= 400; i++) US.push(-3.6 + ((Math.log(7.6) + 3.6) * i) / 400);
const GLIDE = [-1.5, 0, 1];
scene("miroir", {
  p: { lnc: 0, diag: 0, a: A_PT, pA: 0, pA2: 0, perp: 0, refl: 0, expc: 0, pts: 0, ptsR: 0, zone: 0, zoneR: 0, asym: 0, k: 0, kOn: 0,
    b: B_TAN, tanB: 0, tanB2: 0, rb: 0, xt: 0, tanX: 0, mr: 0, tg0: 0, tgp: 0, zm: 0 },
  // le chemin de la courbe à l'instant r du pliage : (eᵘ ; u) pour r = 0 (ln), (u ; eᵘ) pour r = 1 (exp)
  pathAt(r, X, Y) {
    let d = "";
    for (let i = 0; i < US.length; i++) { const u = US[i], eu = Math.exp(u), x = eu + (u - eu) * r, y = u + (eu - u) * r; d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1); }
    return d;
  },
  build(g) {
    // les zones sans point de courbe : un aplat très pâle, jamais de hachures
    this.zg = E("g", {}, g);
    this.zr = E("rect", { class: "s-ink", opacity: 0.07 }, this.zg);
    this.zrl = E("g", {}, this.zg);
    this.zl1 = fx(this.zrl, 0, 0, "*x* ≤ 0", "t-lab2 s-ink", "middle"); this.zl2 = fx(this.zrl, 0, 0, "ln : aucun point", "t-lab s-ink", "middle");
    this.zq = E("g", {}, g);
    this.zqr = E("rect", { class: "s-ink", opacity: 0.07 }, this.zq);
    this.zql = fx(this.zq, 0, 0, "exp : aucun point", "t-lab2 s-ink", "middle");
    const cg = E("g", { "clip-path": "url(#ex-clip-miroir)" }, g);
    this.axX = E("line", { class: "k-dim", "stroke-width": 1.5 }, cg); this.axY = E("line", { class: "k-dim", "stroke-width": 1.5 }, cg);
    this.asH = E("line", { class: "k-a", "stroke-width": 3.2 }, cg);
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
    // « derivee » : le segment M M′ (perpendiculaire à y = x) et la tangente à ln au point reflété M′
    this.mS = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.8 }, cg);
    this.mT = E("line", { class: "k-ink", "stroke-dasharray": "7 5", "stroke-width": 2.4 }, cg);
    this.xT = E("line", { class: "k-a", "stroke-width": 3.4 }, cg);
    this.tgL = E("line", { class: "k-a", "stroke-width": 3 }, cg);
    // les graduations (réutilisées à chaque image)
    this.txs = Array.from({ length: 14 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "middle") }));
    this.tys = Array.from({ length: 12 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "end") }));
    this.dgT = fx(g, 0, 0, "*y* = *x*", "t-lab2 s-c");
    this.lnT = fx(g, 0, 0, "*y* = ln *x*", "t-lab2 s-a", "middle");
    // la notation e^x n'arrive qu'à l'étape « notation » : jusque-là, exp(x)
    this.exT = fx(g, 0, 0, "*y* = exp(*x*)", "t-lab2 s-ink", "middle");
    this.asHT = fx(g, 0, 0, "*y* = 0", "t-lab s-ink");
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
    // les tangentes à ln en (4 ; ln 4), puis à exp en (ln 4 ; 4) : une seule chose en rouge, la tangente de départ
    this.tbP = E("circle", { r: 7, class: "s-ink" }, g); this.tbPT = fx(g, 0, 0, `(${ent(B_TAN)} ; ln ${ent(B_TAN)})`, "t-lab2 s-ink", "end");
    this.tbA = fx(g, 0, 0, "", "t-lab2 s-ink", "middle"); this.tbB = fx(g, 0, 0, "1", "t-lab2 s-ink"); this.tbS = fx(g, 0, 0, "", "t-lab2 s-ink", "middle");
    this.tcP = E("circle", { r: 7, class: "s-ink" }, g);
    this.tcS = fx(g, 0, 0, "", "t-lab2 s-ink");
    // les cotes du triangle reflété : Δx et Δy ont changé de rôle (1 sur l'horizontale, B sur la verticale)
    this.tcA = fx(g, 0, 0, "1", "t-lab2 s-ink", "middle"); this.tcB = fx(g, 0, 0, "", "t-lab2 s-ink", "end");
    // un point courant de exp : hauteur et pente
    this.xD = E("circle", { r: 8, class: "s-a" }, g);
    this.mD = E("circle", { r: 7, class: "s-ink" }, g);
    this.lg = E("g", {}, g);
    E("line", { x1: 574, x2: 574, y1: 546, y2: 572, class: "k-ink", "stroke-dasharray": "6 5", "stroke-width": 2.4 }, this.lg);
    E("line", { x1: 560, x2: 590, y1: 614, y2: 596, class: "k-a", "stroke-width": 3.4 }, this.lg);
    this.lgH = fx(this.lg, 608, 566, "", "t-lab2 s-ink"); this.lgP = fx(this.lg, 608, 610, "", "t-lab2 s-ink");
    // la pente de ln au point reflété : l'inverse
    this.lm = E("g", {}, g);
    E("line", { x1: 560, x2: 590, y1: 654, y2: 642, class: "k-ink", "stroke-dasharray": "7 5", "stroke-width": 2.4 }, this.lm);
    this.lgM = fx(this.lm, 608, 654, "", "t-lab2 s-ink");
    // la tangente en 0 : y = x + 1, et le zoom
    this.tgP = E("circle", { r: 7, class: "s-ink" }, g); this.tgPT = fx(g, 0, 0, "(0 ; 1)", "t-lab2 s-ink", "end");
    this.tgT = fx(g, 0, 0, "*y* = *x* + 1", "t-lab2 s-ink", "middle");
  },
  render() {
    const p = this.p, U = 76 * (1 + 3.5 * p.zm), CX = 330, CY = 383.2, so = 1 - p.zm;
    const X = (x) => CX + U * x, Y = (y) => CY - U * (y - 1), x0 = X(0), y0 = Y(0);
    const f = (v) => v.toFixed(1), set = (e, o) => { for (const k in o) e.setAttribute(k, typeof o[k] === "number" ? f(o[k]) : o[k]); };
    const at = (e, x, y) => { e.setAttribute("x", f(x)); e.setAttribute("y", f(y)); };
    const pt = (c, x, y) => { c.setAttribute("cx", f(X(x))); c.setAttribute("cy", f(Y(y))); };
    const seg = (l, xa, ya, xb, yb) => set(l, { x1: X(xa), y1: Y(ya), x2: X(xb), y2: Y(yb) });
    // une seule chose en rouge : la courbe de ln, sauf quand une asymptote ou une tangente est l'objet de l'étape
    const foc = p.asym > 0.5 || p.tanB > 0.5 || p.tanX > 0.5 || p.tg0 > 0.5;
    this.lnP.setAttribute("class", (foc ? "k-ink" : "k-a") + " nofill");
    this.lnT.setAttribute("class", "t-lab2 " + (foc ? "s-ink" : "s-a"));
    // les axes et leurs graduations (au pas de 0,5 quand on zoome)
    const stp = p.zm > 0.5 ? 0.5 : 1, lab = (v) => fr(v, Number.isInteger(v) ? 0 : 1);
    set(this.axX, { x1: 64, x2: 900, y1: y0, y2: y0 }); set(this.axY, { x1: x0, x2: x0, y1: 72, y2: 672 });
    const lo = Math.ceil((64 - CX) / (U * stp)), hi = Math.floor((900 - CX) / (U * stp));
    this.txs.forEach((q, i) => {
      const v = (lo + i) * stp, ok = lo + i <= hi && Math.abs(v) > 1e-9 && y0 > 90 && y0 < 650;
      if (ok) { set(q.l, { x1: X(v), x2: X(v), y1: y0, y2: y0 + 6 }); at(q.t, X(v), y0 + 26); setFx(q.t, lab(v)); }
      q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0;
    });
    const jlo = Math.ceil((1 + (CY - 672) / U) / stp), jhi = Math.floor((1 + (CY - 72) / U) / stp);
    this.tys.forEach((q, i) => {
      const v = (jlo + i) * stp, ok = jlo + i <= jhi && Math.abs(v) > 1e-9 && x0 > 90 && x0 < 880;
      if (ok) { set(q.l, { x1: x0 - 6, x2: x0, y1: Y(v), y2: Y(v) }); at(q.t, x0 - 12, Y(v) + 5); setFx(q.t, lab(v)); }
      q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0;
    });
    // les zones sans point de courbe
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
    // l'asymptote horizontale de exp : l'axe y = 0, tracé à gauche
    seg(this.asH, -3.5, 0, 0.3, 0); show(this.asH, p.asym);
    at(this.asHT, X(-3.1), y0 - 16); show(this.asHT, p.asym);
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
    // son reflet : la tangente et son triangle glissent de ln vers exp, (x ; y) devient (y ; x) à l'instant rb ;
    // à rb = 1 : la tangente à exp en (ln b ; b), de pente b (avancer de 1, monter de b)
    const rf = (x, y) => [X(x + (y - x) * p.rb), Y(y + (x - y) * p.rb)], von = p.tanB2 * (p.rb > 0.01 ? 1 : 0) * so;
    const ra = rf(B - 3.6, lB - 3.6 * sB), rz = rf(B + 3.4, lB + 3.4 * sB);
    set(this.tcL, { x1: ra[0], y1: ra[1], x2: rz[0], y2: rz[1] }); show(this.tcL, von);
    const t0 = rf(0, lB - 1), t1 = rf(B, lB - 1), t2 = rf(B, lB);
    this.tcT.setAttribute("d", `M${f(t0[0])} ${f(t0[1])}L${f(t1[0])} ${f(t1[1])}L${f(t2[0])} ${f(t2[1])}`); show(this.tcT, von);
    const rp = rf(B, lB); set(this.tcP, { cx: rp[0], cy: rp[1] }); show(this.tcP, von);
    const fin = clamp((p.rb - 0.85) / 0.15, 0, 1) * p.tanB2 * so;
    at(this.tcS, rp[0] + 18, rp[1] + 34); setFx(this.tcS, `pente ${ent(B)}`); show(this.tcS, fin);
    at(this.tcA, X(lB - 0.5), Y(B) - 12); show(this.tcA, fin);
    at(this.tcB, X(lB - 1) - 10, Y(B / 2) + 7); setFx(this.tcB, ent(B)); show(this.tcB, fin);
    // un point courant de exp : sa hauteur, sa pente
    const xt = p.xt, ex = Math.exp(xt);
    seg(this.xT, xt - 1.2, ex - 1.2 * ex, xt + 1.2, ex + 1.2 * ex); show(this.xT, p.tanX * so);
    seg(this.xV, xt, 0, xt, ex); show(this.xV, p.tanX * so); pt(this.xD, xt, ex); show(this.xD, p.tanX * so);
    setFx(this.lgH, `hauteur ${fr(ex, 2)}`); setFx(this.lgP, `pente ${fr(ex, 2)}`); show(this.lg, p.tanX * so);
    // le reflet M′ = (eˣ ; x) sur ln : la tangente y est de pente 1/eˣ, l'inverse de la hauteur
    seg(this.mS, xt, ex, ex, xt); show(this.mS, p.mr * p.tanX * so);
    seg(this.mT, 0.35 * ex, xt + (0.35 * ex - ex) / ex, ex + 1.4, xt + 1.4 / ex); show(this.mT, p.mr * p.tanX * so);
    pt(this.mD, ex, xt); show(this.mD, p.mr * p.tanX * so);
    setFx(this.lgM, `pente de ln ${fr(1 / ex, 2)}`); show(this.lm, p.mr * p.tanX * so);
    // la tangente y = x + 1 : d'abord le point (0 ; 1), puis la droite, puis le zoom
    seg(this.tgL, -2.4, -1.4, 4.2, 5.2); show(this.tgL, p.tg0);
    pt(this.tgP, 0, 1); const sp = Math.max(p.tg0, p.tgp); show(this.tgP, sp); at(this.tgPT, X(0) - 14, Y(1) - 14); show(this.tgPT, sp * so);
    at(this.tgT, X(3.0), Y(4.0) - 24); show(this.tgT, p.tg0 * so);
  },
});
}
