/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « fonction exponentielle » (séance 1), deuxième partie : la table des puissances de 2
 * lue de haut en bas (`table`), la courbe de exp avec ses droites, son point, sa tangente, la droite
 * des réels et la course eˣ contre x (`expo`), et le taux d'accroissement de exp en 0 (`taux`).
 * Aucune couleur écrite en dur : les classes de pilote.css seulement.
 */
import { fr, ent, fG, ratio, R_COURSE, taux, H_DEBUT, BORNE, X_RAPPEL, R_RAPPEL, E2, LN5 } from "./exponentielle-outils";

// les fonctions tracées pour les limites et la dérivée d'un produit : (x − 2)eˣ, x e^{−x}, x eˣ
const FCN = [null,
  { f: (x) => (x - 2) * Math.exp(x), x0: -3.3, x1: 2.95, lab: "*y* = (*x* − 2)e^{*x*}", lx: 2.1, ly: 5.5, an: "end" },
  { f: (x) => x * Math.exp(-x), x0: -0.6, x1: 3.3, lab: "*y* = *x* e^{−*x*}", lx: 1, ly: 1.1, an: "middle" },
  { f: (x) => x * Math.exp(x), x0: -3.3, x1: 0.9, lab: "*y* = *x* e^{*x*}", lx: -1.6, ly: -1.3, an: "middle" }];

export function scenesB(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre, courbe } = O;

/* ---------- 4. la table des puissances de 2, lue de haut en bas : pas → valeur ---------- */
const NC = 8; // colonnes : les pas 0 à 7
scene("table", {
  p: { cells: 0, arrA: 0, arrB: 0, demo: 0, da: 2, db: 3 },
  build(g) {
    const X = (i) => 52 + i * 112; this.X = X;
    this.ti = titre(g, "La table des puissances de 2", "Lue de haut en bas : des pas vers les valeurs");
    this.capTop = fx(g, 52, 190, "Pas : on avance en ajoutant 1", "t-lab s-dim");
    this.capBot = fx(g, 52, 528, "Valeur : on avance en multipliant par 2", "t-lab s-dim");
    this.arcA = []; this.arcB = [];
    for (let i = 0; i < NC - 1; i++) {
      const x1 = X(i) + 52, x2 = X(i + 1) + 52, m = (x1 + x2) / 2;
      // les flèches « +1 » et « × 2 » restent discrètes : le rouge est pour les cases 5 et 32
      const a = E("g", {}, g); E("path", { d: `M${x1 + 8} 240 Q${m} 212 ${x2 - 8} 240`, class: "k-dim nofill", "stroke-width": 1.5, "marker-end": "url(#arw)" }, a); fx(a, m, 214, "+1", "t-lab s-dim", "middle"); this.arcA.push(a);
      const b = E("g", {}, g); E("path", { d: `M${x1 + 8} 460 Q${m} 488 ${x2 - 8} 460`, class: "k-dim nofill", "stroke-width": 1.5, "marker-end": "url(#arw)" }, b); fx(b, m, 502, "× 2", "t-lab s-dim", "middle"); this.arcB.push(b);
    }
    this.cells = [];
    for (let i = 0; i < NC; i++) {
      const cg = E("g", {}, g);
      const top = E("rect", { x: X(i), y: 245, width: 104, height: 80, rx: 2, class: "cell" }, cg);
      E("text", { x: X(i) + 52, y: 296, class: "mono t-mid s-ink", "text-anchor": "middle", text: String(i) }, cg);
      E("line", { x1: X(i) + 52, x2: X(i) + 52, y1: 325, y2: 375, class: "k-line" }, cg);
      const bot = E("rect", { x: X(i), y: 375, width: 104, height: 80, rx: 2, class: "cell" }, cg);
      E("text", { x: X(i) + 52, y: 426, class: "mono t-mid s-ink", "text-anchor": "middle", text: String(2 ** i) }, cg);
      this.cells.push({ cg, top, bot });
    }
    // le bilan : deux lignes discrètes, et une seule en gras (la somme des pas, le produit des valeurs)
    this.bA = E("text", { x: 52, y: 604, class: "t-lab s-ink" }, g);
    this.bB = E("text", { x: 340, y: 604, class: "t-lab s-ink" }, g);
    this.b2 = E("text", { x: 52, y: 652, class: "t-cle s-ink" }, g);
  },
  render() {
    const p = this.p, d = Math.round(p.demo), da = Math.round(p.da), db = Math.round(p.db);
    this.cells.forEach((c, i) => {
      const o = clamp(p.cells - i, 0, 1); c.cg.style.opacity = o; c.cg.setAttribute("transform", `translate(0 ${((1 - o) * 14).toFixed(1)})`);
      let tc = "cell", bc = "cell";
      if (d >= 1) { if (i === da || i === db) { tc += " hl-b"; bc += " hl-b"; } if (d >= 3 && i === da + db) tc += " hl-a"; if (d >= 4 && i === da + db) bc += " hl-a"; }
      c.top.setAttribute("class", tc); c.bot.setAttribute("class", bc);
    });
    const on = clamp(p.cells, 0, 1), all = clamp(p.cells - (NC - 1), 0, 1);
    this.arcA.forEach((a, i) => show(a, clamp(p.arrA - i, 0, 1))); this.arcB.forEach((b, i) => show(b, clamp(p.arrB - i, 0, 1)));
    show(this.capTop, on); show(this.capBot, all);
    let a = "", b = "", c = "";
    if (d >= 1) { a = `pas ${da} → ${2 ** da}`; b = `pas ${db} → ${2 ** db}`; if (d >= 2) c = `${da} + ${db} = ${da + db} pas`; if (d >= 4) c += ` → ${2 ** (da + db)} = ${2 ** da} × ${2 ** db}`; }
    this.bA.textContent = ctx.ty(a); this.bB.textContent = ctx.ty(b); this.b2.textContent = ctx.ty(c);
    [this.bA, this.bB, this.b2].forEach((t) => show(t, d >= 1 ? 1 : 0));
  },
});

/* ---------- 5. la courbe de exp : équations, inéquations, point, tangente, course ---------- */
scene("expo", {
  p: { ex: 0, u3: 0, kOn: 0, k: 5, kPt: 0, ki: 0, nl: 0, sol: 0, pt: 0, px: X_RAPPEL, ptk: 0, tg: 0, ratio: 0, xr: 1, fcn: 0 },
  build(g) {
    const X = (x) => 500 + 130 * x, Y = (y) => 520 - 54 * y; this.X = X; this.Y = Y;
    // le repère
    this.pl = E("g", {}, g);
    const pl = this.pl;
    E("line", { x1: X(-3.3), x2: X(3.3), y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, pl);
    E("line", { x1: X(0), x2: X(0), y1: Y(-2.6), y2: Y(8.2), class: "k-dim", "stroke-width": 1.5 }, pl);
    [-3, -2, -1, 1, 2, 3].forEach((v) => { E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, pl); fx(pl, X(v), Y(0) + 26, String(v).replace("-", "−"), "t-tick s-dim", "middle"); });
    [-2, -1, 1, 2, 3, 4, 5, 6, 7, 8].forEach((v) => { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(v), y2: Y(v), class: "k-dim" }, pl); fx(pl, X(0) - 12, Y(v) + 5, String(v).replace("-", "−"), "t-tick s-dim", "end"); });
    fx(pl, X(3.3) + 8, Y(0) + 5, "*x*", "t-lab s-dim");
    const cg = E("g", { "clip-path": "url(#ex-clip-expo)" }, pl);
    this.kL = E("line", { x1: X(-3.3), x2: X(3.3), class: "k-ink", "stroke-dasharray": "7 6", "stroke-width": 2 }, cg);
    this.kV = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.6 }, cg);
    // les solutions de eˣ < k : la demi-droite des x à gauche de ln k, sur l'axe
    this.kI = E("line", { x1: X(-3.3), class: "k-a", "stroke-width": 7, "stroke-linecap": "round" }, cg);
    this.cEx = E("path", { d: courbe(Math.exp, -3.3, 2.3, X, Y, 200), class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cg);
    this.cU3 = E("path", { d: courbe((x) => Math.exp(3 * x), -3.3, 0.76, X, Y, 200), class: "k-a nofill", "stroke-width": 3, "stroke-dasharray": "9 6" }, cg);
    this.cF = FCN.map((F) => F && E("path", { d: courbe(F.f, F.x0, F.x1, X, Y, 240), class: "k-ink nofill", "stroke-width": 3 }, cg));
    this.lF = FCN.map((F) => F && fx(pl, X(F.lx), Y(F.ly), F.lab, "t-lab2 s-ink", F.an));
    this.tgL = E("line", { class: "k-a", "stroke-width": 3 }, cg);
    this.lEx = fx(pl, X(1.9) - 16, Y(Math.exp(1.9)) + 6, "*y* = e^{*x*}", "t-lab2 s-ink", "end");
    this.lU3 = fx(pl, X(0.5) - 18, Y(Math.exp(1.5)) - 10, "*y* = e^{3*x*}", "t-lab2 s-ink", "end");
    this.kT = fx(pl, X(3.25), 0, "", "t-lab2 s-ink", "end");
    this.kP = E("g", {}, pl);
    this.kD = E("circle", { r: 8, class: "s-a" }, this.kP); this.kS = fx(this.kP, 0, 0, "", "t-lab2 s-ink", "middle");
    this.kIC = E("circle", { r: 9, class: "s-bg k-a", "stroke-width": 4 }, pl); this.kIT = fx(pl, 0, 0, "", "t-lab2 s-ink", "middle");
    this.kN = fx(pl, X(-3.1), 0, "la courbe reste au-dessus de la droite", "t-lab2 s-ink", "start");
    // un point de la courbe, sa hauteur et son abscisse
    this.ptG = E("g", {}, pl);
    this.ptH = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.6 }, this.ptG);
    this.ptV = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.6 }, this.ptG);
    this.ptD = E("circle", { r: 8, class: "s-a" }, this.ptG);
    this.ptL = fx(this.ptG, 0, 0, "", "t-lab2 s-ink", "end"); this.ptX = fx(this.ptG, 0, 0, "", "t-lab s-ink", "middle");
    this.tgS = fx(pl, 0, 0, "", "t-lab2 s-ink");
    // la droite des réels : l'inéquation
    const X2 = (x) => 100 + (800 * (x + 3)) / 9; this.X2 = X2;
    this.nlG = E("g", {}, g);
    const n = this.nlG;
    this.nlT = fx(n, 500, 250, "e^{2*x*−1} < e^{*x*+3}", "t-big2 s-ink", "middle");
    E("line", { x1: 70, x2: 930, y1: 400, y2: 400, class: "k-dim", "stroke-width": 2 }, n);
    for (let v = -3; v <= 6; v++) { E("line", { x1: X2(v), x2: X2(v), y1: 392, y2: 408, class: "k-dim" }, n); fx(n, X2(v), 434, String(v).replace("-", "−"), "t-lab s-dim", "middle"); }
    this.nlS = E("g", {}, n);
    // la phrase qui donne la méthode n'apparaît qu'avec la solution
    this.nlE = fx(this.nlS, 500, 292, "exp garde l’ordre : on compare les exposants", "t-lab s-dim", "middle");
    E("line", { x1: 76, x2: X2(BORNE), y1: 400, y2: 400, class: "k-a", "stroke-width": 9, "stroke-linecap": "round" }, this.nlS);
    E("circle", { cx: X2(BORNE), cy: 400, r: 11, class: "s-bg k-a", "stroke-width": 4 }, this.nlS);
    fx(this.nlS, (76 + X2(BORNE)) / 2, 366, `*x* < ${ent(BORNE)}`, "t-cle s-a", "middle");
    // la course : eˣ contre x
    this.rg = E("g", {}, g);
    const r = this.rg;
    [["*x*", 230], ["e^{*x*}", 560], ["e^{*x*} / *x*", 900]].forEach(([t, x]) => fx(r, x, 160, t, "t-lab s-dim", "end"));
    E("line", { x1: 90, x2: 920, y1: 178, y2: 178, class: "k-dim", "stroke-width": 1.5 }, r);
    this.rows = R_COURSE.map((x, i) => { const y = 222 + i * 54, rg = E("g", {}, r);
      fx(rg, 230, y, String(x), "t-lab2 s-ink", "end"); fx(rg, 560, y, fG(Math.exp(x)), "t-lab2 s-ink", "end");
      const v = fx(rg, 900, y, fG(ratio(x)), "t-lab2 s-ink", "end"); return { rg, x, v }; });
    this.big = fx(r, 500, 620, "", "t-big2 s-ink", "middle");
  },
  render() {
    const p = this.p, X = this.X, Y = this.Y, f = (v) => v.toFixed(1), fi = Math.round(p.fcn);
    show(this.pl, (1 - p.nl) * (1 - p.ratio)); show(this.nlG, p.nl); show(this.rg, p.ratio); show(this.nlS, p.sol);
    this.cEx.style.strokeDashoffset = 1000 * (1 - p.ex); show(this.lEx, clamp(p.ex * 2 - 1, 0, 1));
    show(this.cU3, p.u3); show(this.lU3, p.u3);
    this.cF.forEach((c, i) => { if (c) { show(c, fi === i ? 1 : 0); show(this.lF[i], fi === i ? 1 : 0); } });
    // la droite y = k
    const k = p.k, yk = Y(k);
    this.kL.setAttribute("y1", f(yk)); this.kL.setAttribute("y2", f(yk)); show(this.kL, p.kOn);
    this.kT.setAttribute("y", f(yk - 12)); setFx(this.kT, `*y* = ${fr(k, 0)}`); show(this.kT, p.kOn);
    if (k > 0) {
      const xk = Math.log(k);
      this.kV.setAttribute("x1", f(X(xk))); this.kV.setAttribute("x2", f(X(xk))); this.kV.setAttribute("y1", f(yk)); this.kV.setAttribute("y2", f(Y(0))); show(this.kV, p.kPt);
      this.kD.setAttribute("cx", f(X(xk))); this.kD.setAttribute("cy", f(yk)); show(this.kD, 1);
      this.kS.setAttribute("x", f(X(xk))); this.kS.setAttribute("y", f(Y(0) + 56)); setFx(this.kS, `*x* = ln ${fr(k, 0)} ≈ ${fr(Math.log(k), 2)}`); show(this.kS, 1);
      show(this.kP, p.kPt); show(this.kN, 0);
      // eˣ < k : x < ln k
      this.kI.setAttribute("x2", f(X(xk))); this.kI.setAttribute("y1", f(Y(0))); this.kI.setAttribute("y2", f(Y(0))); show(this.kI, p.ki);
      this.kIC.setAttribute("cx", f(X(xk))); this.kIC.setAttribute("cy", f(Y(0))); show(this.kIC, p.ki);
      this.kIT.setAttribute("x", f(X(-1.6))); this.kIT.setAttribute("y", f(Y(0) + 56)); setFx(this.kIT, `*x* < ln ${fr(k, 0)}`); show(this.kIT, p.ki);
    } else { show(this.kV, 0); show(this.kP, 0); show(this.kI, 0); show(this.kIC, 0); show(this.kIT, 0); this.kN.setAttribute("y", f(yk - 22)); show(this.kN, p.kPt * p.kOn); }
    // un point de la courbe
    const px = p.px, ey = Math.exp(px);
    this.ptH.setAttribute("x1", f(X(0))); this.ptH.setAttribute("x2", f(X(px))); this.ptH.setAttribute("y1", f(Y(ey))); this.ptH.setAttribute("y2", f(Y(ey)));
    this.ptV.setAttribute("x1", f(X(px))); this.ptV.setAttribute("x2", f(X(px))); this.ptV.setAttribute("y1", f(Y(ey))); this.ptV.setAttribute("y2", f(Y(0)));
    this.ptD.setAttribute("cx", f(X(px))); this.ptD.setAttribute("cy", f(Y(ey)));
    // ptk = 0 : le rappel e^{3 ln 2} = 8 ; ptk = 2 : « même miroir, autre point » (la hauteur seule, pas l'abscisse)
    const rap = p.ptk < 0.5, hau = p.ptk > 1.5, hh = fr(ey, Math.abs(ey - Math.round(ey)) < 1e-6 ? 0 : 2);
    this.ptL.setAttribute("x", f(X(px) - 18)); this.ptL.setAttribute("y", f(Y(ey) + (p.ptk > 1.5 ? 30 : 7))); setFx(this.ptL, rap ? `e^{3 ln 2} = ${ent(R_RAPPEL)}` : hau ? `hauteur ${hh}` : "");
    this.ptX.setAttribute("x", f(X(px))); this.ptX.setAttribute("y", f(Y(0) + 58)); setFx(this.ptX, rap ? `*x* = 3 ln 2 ≈ ${fr(px, 2)}` : "");
    show(this.ptG, p.pt);
    // la tangente en (px ; eᵖˣ)
    this.tgL.setAttribute("x1", f(X(px - 1.2))); this.tgL.setAttribute("y1", f(Y(ey - 1.2 * ey))); this.tgL.setAttribute("x2", f(X(px + 0.25))); this.tgL.setAttribute("y2", f(Y(ey + 0.25 * ey)));
    show(this.tgL, p.tg);
    this.tgS.setAttribute("x", f(X(px) + 18)); this.tgS.setAttribute("y", f(Y(ey) + 44)); setFx(this.tgS, `pente ${hh}`); show(this.tgS, p.tg);
    // la course
    const xr = Math.max(1, Math.round(p.xr));
    this.rows.forEach((q) => { show(q.rg, clamp(xr - q.x + 1, 0, 1)); });
    setFx(this.big, `*x* = ${xr} : e^{*x*} / *x* ≈ ${fG(ratio(xr))}`);
  },
});

/* ---------- 6. le taux d'accroissement de exp en 0 : la sécante devient la tangente ---------- */
scene("taux", {
  p: { on: 0, sec: 0, h: H_DEBUT, tan: 0 },
  build(g) {
    const X = (x) => 300 + 240 * x, Y = (y) => 560 - 62 * y; this.X = X; this.Y = Y;
    E("line", { x1: X(-1.2), x2: X(2.3), y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: X(0), x2: X(0), y1: Y(0), y2: Y(7.6), class: "k-dim", "stroke-width": 1.5 }, g);
    [-1, 1, 2].forEach((v) => { E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, g); fx(g, X(v), Y(0) + 26, String(v).replace("-", "−"), "t-tick s-dim", "middle"); });
    [1, 2, 3, 4, 5, 6, 7].forEach((v) => { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(v), y2: Y(v), class: "k-dim" }, g); fx(g, X(0) - 20, Y(v) + 5, String(v), "t-tick s-dim", "end"); });
    this.cv = E("path", { d: courbe(Math.exp, -1.2, 2.0, X, Y, 200), class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, g);
    this.cvL = fx(g, X(1.85) + 18, Y(Math.exp(1.85)) + 8, "courbe de exp", "t-lab2 s-ink");
    this.sec = E("line", { class: "k-ink", "stroke-width": 2 }, g);
    this.run = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.6 }, g);
    this.rise = E("line", { class: "k-ink", "stroke-width": 4 }, g);
    this.dL = fx(g, 0, 0, "", "t-lab2 s-ink");
    this.pA = E("circle", { r: 7, class: "s-ink" }, g); this.pB = E("circle", { r: 7, class: "s-ink" }, g);
    this.lA = fx(g, X(0) + 12, Y(0) + 26, "0", "t-lab2 s-ink"); this.lB = fx(g, 0, Y(0) + 26, "*x*", "t-lab2 s-ink", "middle");
    // la tangente, et sa pente : la seule chose en rouge
    this.tanL = E("line", { class: "k-a", "stroke-width": 3 }, g);
    this.box = E("text", { x: 940, y: 650, class: "t-lab2 s-ink", "text-anchor": "end" }, g);
    this.box2 = E("text", { x: 940, y: 682, class: "t-lab s-dim", "text-anchor": "end" }, g);
  },
  render() {
    const p = this.p, X = this.X, Y = this.Y, f = (v) => v.toFixed(1), h = p.h, yB = Math.exp(h), s = taux(h);
    this.cv.style.strokeDashoffset = 1000 * (1 - p.on); show(this.cvL, p.on);
    const xs = -0.3, xe = Math.min(h + 0.7, 2.05);
    this.sec.setAttribute("x1", f(X(xs))); this.sec.setAttribute("y1", f(Y(1 + s * xs))); this.sec.setAttribute("x2", f(X(xe))); this.sec.setAttribute("y2", f(Y(1 + s * xe))); show(this.sec, p.sec * (1 - 0.75 * p.tan));
    this.run.setAttribute("x1", f(X(0))); this.run.setAttribute("y1", f(Y(1))); this.run.setAttribute("x2", f(X(h))); this.run.setAttribute("y2", f(Y(1)));
    this.rise.setAttribute("x1", f(X(h))); this.rise.setAttribute("y1", f(Y(1))); this.rise.setAttribute("x2", f(X(h))); this.rise.setAttribute("y2", f(Y(yB)));
    const lab = p.sec * clamp((h - 0.3) / 0.6, 0, 1); show(this.run, p.sec); show(this.rise, p.sec);
    // la variation du numérateur, côté gauche du segment vertical pour ne pas chevaucher la courbe
    this.dL.setAttribute("x", f(X(h) + 12)); this.dL.setAttribute("y", f((Y(1) + Y(yB)) / 2 + 6)); setFx(this.dL, "e^{*x*} − 1"); show(this.dL, lab);
    this.pA.setAttribute("cx", f(X(0))); this.pA.setAttribute("cy", f(Y(1))); this.pB.setAttribute("cx", f(X(h))); this.pB.setAttribute("cy", f(Y(yB)));
    show(this.pA, p.on); show(this.pB, p.sec);
    this.lB.setAttribute("x", f(X(h))); show(this.lB, lab); show(this.lA, p.on);
    this.tanL.setAttribute("x1", f(X(-0.9))); this.tanL.setAttribute("y1", f(Y(0.1))); this.tanL.setAttribute("x2", f(X(2.2))); this.tanL.setAttribute("y2", f(Y(3.2))); show(this.tanL, p.tan);
    // avant la réponse, la scène ne nomme pas ce qu'elle montre : seulement la pente de la droite
    this.box.textContent = ctx.ty(p.tan > 0.5 ? `tangente : pente ${fr(1, 2)}` : `pente de la droite : ${fr(s, 2)}`); show(this.box, p.sec);
    this.box2.textContent = ctx.ty(p.tan > 0.5 ? "la limite du taux, quand x tend vers 0" : ""); show(this.box2, p.tan > 0.5 ? p.sec : 0);
  },
});
}
