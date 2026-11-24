/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Les suites numériques » (séance 1), première partie : la figure-clé `toile`, l'escalier
 * (ou la spirale) entre la courbe de f et la droite y = x. Aucune couleur écrite en dur : les classes
 * de pilote.css seulement ; toutes les positions sont CALCULÉES par les fonctions de suites-outils.js.
 *
 * Un repère orthonormé (même unité sur les deux axes : sinon le report par y = x ne se voit pas).
 * De (u_k ; 0) on monte à (u_k ; f(u_k)), on va à (f(u_k) ; f(u_k)) sur la droite, et ainsi de suite.
 * Paramètres : f (la fonction de la liste fermée FONCS), cb (tracé de la courbe), diag, u0, k (les
 * marches tracées : k = 0,5 est la première verticale seule), zoom (resserre la fenêtre autour du
 * point fixe), fixe, zone (f(x) > x et f(x) < x), ecart + en (le segment f(u_n) − u_n au terme n),
 * axeU (les termes reportés sur l'axe), bornes (l'intervalle I), lecU (la lecture « u_0 = … : u_10 ≈ … »).
 */
import { fr, ent, FONCS, orbite, SAV, SAV_U5, PAS_N, PAS_V } from "./suites-outils";

// la zone de dessin dans le repère 1000 × 720 de la scène
export const PLOT = { x0: 70, x1: 930, y0: 104, y1: 648 };
const NMAX = 16;                       // marches calculées au plus

export function scenesA(ctx, O) {
const { E, clamp, show, scene, lerp, defs } = ctx;
const { fx, setFx } = O;

// le cadre de découpe et les deux hachures (zone f(x) > x, zone f(x) < x)
E("rect", { x: PLOT.x0, y: PLOT.y0 - 6, width: PLOT.x1 - PLOT.x0, height: PLOT.y1 - PLOT.y0 + 12 }, E("clipPath", { id: "su-clip" }, defs));
const hA = E("pattern", { id: "su-hA", width: 10, height: 10, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" }, defs);
E("line", { x1: 0, y1: 0, x2: 0, y2: 10, class: "k-dim", "stroke-width": 1.8 }, hA);
const hB = E("pattern", { id: "su-hB", width: 10, height: 10, patternUnits: "userSpaceOnUse", patternTransform: "rotate(-45)" }, defs);
E("line", { x1: 0, y1: 0, x2: 0, y2: 10, class: "k-b", "stroke-width": 1.8 }, hB);

const PAS_TICK = [0.05, 0.1, 0.2, 0.25, 0.5, 1, 2, 5];
const bornePas = (etendue) => PAS_TICK.find((s) => etendue / s <= 8) || 5;
const c1 = (v) => Math.max(-100, Math.min(100, v));        // une valeur qui diverge reste dessinable (le tracé est découpé)

scene("toile", {
  p: { f: "dose", cb: 0, diag: 0, u0: 0, k: 0, zoom: 0, fixe: 0, zone: 0, ecart: 0, en: 2, axeU: 0, bornes: 0, lecU: 0, wr: 0 },
  // la fenêtre courante (zoom compris) et l'échelle : une seule unité sur les deux axes
  repere() {
    const F = FONCS[this.p.f], w = F.win, z = F.zw ? clamp(this.p.zoom, 0, 1) : 0, zw = F.zw || w;
    const x0 = lerp(w.x0, zw.x0, z), x1 = lerp(w.x1, zw.x1, z), y0 = lerp(w.y0, zw.y0, z), y1 = lerp(w.y1, zw.y1, z);
    const U = Math.min((PLOT.x1 - PLOT.x0) / (x1 - x0), (PLOT.y1 - PLOT.y0) / (y1 - y0));
    const ox = PLOT.x0 + ((PLOT.x1 - PLOT.x0) - U * (x1 - x0)) / 2, oy = PLOT.y1 - ((PLOT.y1 - PLOT.y0) - U * (y1 - y0)) / 2;
    return { F, x0, x1, y0, y1, U, X: (x) => ox + U * (x - x0), Y: (y) => oy - U * (y - y0), z, ox, oy };
  },
  build(g) {
    this.h1 = fx(g, 60, 50, "L’escalier de la machine", "t-titre s-ink");
    this.h2 = fx(g, 60, 78, "", "t-sous");
    this.ul = fx(g, 940, 52, "", "t-cle s-ink", "end");
    // les zones, sous tout le reste
    const cg0 = E("g", { "clip-path": "url(#su-clip)" }, g);
    this.zA = E("path", { fill: "url(#su-hA)", opacity: 0.8 }, cg0);
    this.zB = E("path", { fill: "url(#su-hB)", opacity: 0.8 }, cg0);
    // la légende des deux zones : une pastille hachurée comme la zone, puis ce qu'elle dit
    this.lg = E("g", {}, g);
    this.lgA = [E("rect", { width: 34, height: 24, fill: "url(#su-hA)", class: "k-dim", "stroke-width": 1.6 }, this.lg), fx(this.lg, 0, 0, "*f*(*x*) > *x* : les marches montent", "t-lab s-ink")];
    this.lgB = [E("rect", { width: 34, height: 24, fill: "url(#su-hB)", class: "k-b", "stroke-width": 1.6 }, this.lg), fx(this.lg, 0, 0, "*f*(*x*) < *x* : les marches descendent", "t-lab s-ink")];
    // les axes, les graduations
    this.axX = E("line", { class: "k-dim", "stroke-width": 1.6 }, g);
    this.axY = E("line", { class: "k-dim", "stroke-width": 1.6 }, g);
    this.txs = Array.from({ length: 12 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "middle") }));
    this.tys = Array.from({ length: 12 }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "end") }));
    // l'intervalle I, sur les deux axes
    this.bg = E("g", {}, g);
    this.bX = E("line", { class: "k-b", "stroke-width": 9, "stroke-opacity": 0.45, "stroke-linecap": "butt" }, this.bg);
    this.bY = E("line", { class: "k-b", "stroke-width": 9, "stroke-opacity": 0.45, "stroke-linecap": "butt" }, this.bg);
    this.bXt = fx(this.bg, 0, 0, "*I*", "t-lab2 s-ink", "middle"); this.bYt = fx(this.bg, 0, 0, "*I*", "t-lab2 s-ink", "end");
    // la courbe, la droite, l'escalier, tout découpé au cadre
    const cg = E("g", { "clip-path": "url(#su-clip)" }, g);
    this.dg = E("line", { class: "k-c", "stroke-dasharray": "9 7", "stroke-width": 2.4 }, cg);
    this.cv = E("path", { class: "k-ink nofill", "stroke-width": 3.4, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linejoin": "round" }, cg);
    this.ec = E("path", { class: "k-a nofill", "stroke-width": 5.6, "stroke-linejoin": "round", "stroke-linecap": "round" }, cg);
    this.eg = E("line", { class: "k-a", "stroke-width": 7 }, cg);
    // les termes reportés sur l'axe : un point, une chute en pointillé, une étiquette
    this.tm = Array.from({ length: NMAX + 1 }, (_, i) => {
      const gg = E("g", {}, g);
      return { g: gg, drop: E("line", { class: "k-dim", "stroke-dasharray": "4 4", "stroke-width": 1.8 }, gg), lead: E("line", { class: "k-dim", "stroke-width": 1.2 }, gg),
        dot: E("circle", { r: 6.5, class: "s-ink" }, gg), dd: E("circle", { r: 6, class: "s-ink" }, gg), lab: fx(gg, 0, 0, `*u*_{${i}}`, "t-cle s-ink", "middle") };
    });
    this.st = E("circle", { r: 9, class: "s-a" }, g);
    // une zone de saisie plus large que le point, invisible : on peut le saisir et le glisser (étape du curseur de u_0)
    this.stHit = E("circle", { r: 30, class: "s-ink", "fill-opacity": 0, "pointer-events": "all" }, g);
    // le point fixe
    this.fp = [0, 1].map(() => { const gg = E("g", {}, g); return { g: gg, c: E("circle", { r: 10, class: "s-bg k-ink", "stroke-width": 4 }, gg), t: fx(gg, 0, 0, "", "t-cle s-ink") }; });
    // les noms des deux lignes
    this.cvT = fx(g, 0, 0, "*y* = *f*(*x*)", "t-lab2 s-ink", "end");
    this.dgT = fx(g, 0, 0, "*y* = *x*", "t-lab2 s-c");
    this.ecT = fx(g, 0, 0, "", "t-lab2 s-a", "end");
    // les trois valeurs de w_n, écrites quand le pari tranche
    this.wl = PAS_N.map((n, i) => fx(g, 780, 330 + i * 44, `*w*_{${ent(n)}} ≈ ${fr(PAS_V[i], 2)}`, "t-lab2 s-ink"));
  },
  render() {
    const p = this.p, R = this.repere(), { F, X, Y, U, x0, x1, y0, y1 } = R, f = F.f, fix = (v) => v.toFixed(1);
    const set = (e, o) => { for (const k in o) e.setAttribute(k, typeof o[k] === "number" ? fix(o[k]) : o[k]); };
    const at = (e, x, y) => { e.setAttribute("x", fix(x)); e.setAttribute("y", fix(y)); };
    const seg = (l, xa, ya, xb, yb) => set(l, { x1: X(xa), y1: Y(ya), x2: X(xb), y2: Y(yb) });
    const ya = clamp(0, y0, y1), xa = clamp(0, x0, x1), yA = Y(ya), xA = X(xa);
    const L = F.lettre || "u";
    setFx(this.h2, `*${L}*_{*n*+1} = *f*(*${L}*_{*n*}), avec *f*(*x*) = ${F.lab}`);
    // les axes et leurs graduations (aux bords du cadre si l'axe sort de la fenêtre)
    set(this.axX, { x1: X(x0), x2: X(x1), y1: yA, y2: yA }); set(this.axY, { x1: xA, x2: xA, y1: Y(y0), y2: Y(y1) });
    const st = bornePas(Math.max(x1 - x0, y1 - y0)), dec = st >= 1 ? 0 : (Math.abs(st * 10 - Math.round(st * 10)) < 1e-9 ? 1 : 2);
    const lo = Math.ceil(x0 / st - 1e-9);
    this.txs.forEach((q, i) => { const v = (lo + i) * st, ok = v <= x1 + 1e-9 && Math.abs(v) > 1e-9; if (ok) { set(q.l, { x1: X(v), x2: X(v), y1: yA, y2: yA + 6 }); at(q.t, X(v), yA + 25); setFx(q.t, fr(v, dec)); } q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0; });
    const jlo = Math.ceil(y0 / st - 1e-9);
    this.tys.forEach((q, i) => { const v = (jlo + i) * st, ok = v <= y1 + 1e-9 && v > 1e-9; if (ok) { set(q.l, { x1: xA - 6, x2: xA, y1: Y(v), y2: Y(v) }); at(q.t, xA - 12, Y(v) + 5); setFx(q.t, fr(v, dec)); } q.l.style.opacity = q.t.style.opacity = ok ? 1 : 0; });
    // la courbe de f, et la droite y = x
    let d = ""; const N = 240;
    for (let i = 0; i <= N; i++) { const x = x0 + ((x1 - x0) * i) / N; d += (i ? "L" : "M") + fix(X(x)) + " " + fix(Y(c1(f(x)))); }
    this.cv.setAttribute("d", d); this.cv.style.strokeDashoffset = 1000 * (1 - p.cb);
    show(this.cv, p.cb > 0 ? 1 : 0);
    const xl = x1 - 0.07 * (x1 - x0); at(this.cvT, X(xl), Y(f(xl)) - 16); show(this.cvT, clamp(p.cb * 2 - 1, 0, 1) * (1 - R.z));
    seg(this.dg, x0, x0, x1, x1); show(this.dg, p.diag);
    const xd = Math.min(x1, y1); at(this.dgT, X(xd) + 10, Y(xd) + 4); show(this.dgT, p.diag * (1 - R.z));
    // les zones : entre la courbe et la droite, f(x) > x puis f(x) < x
    let dA = "", dB = ""; const NZ = 160; let run = [];
    const flush = () => { if (run.length > 1) { let s = "M" + run.map((x) => fix(X(x)) + " " + fix(Y(c1(f(x))))).join("L"); s += "L" + run.slice().reverse().map((x) => fix(X(x)) + " " + fix(Y(x))).join("L") + "Z"; if (f(run[Math.floor(run.length / 2)]) > run[Math.floor(run.length / 2)]) dA += s; else dB += s; } run = []; };
    let sgn = 0;
    for (let i = 0; i <= NZ; i++) {
      const x = x0 + ((x1 - x0) * i) / NZ, s = Math.sign(f(x) - x);
      if (s !== sgn) { if (run.length) { run.push(x); flush(); } run = s ? [x] : []; sgn = s; } else if (s) run.push(x);
    }
    flush();
    this.zA.setAttribute("d", dA); this.zB.setAttribute("d", dB); show(this.zA, p.zone); show(this.zB, p.zone);
    const zOn = p.zone * (p.f === "dose" ? 1 : 0);
    const lx = X(2.55), ly0 = Y(1.75);
    set(this.lgA[0], { x: lx, y: ly0 }); at(this.lgA[1], lx + 46, ly0 + 19); set(this.lgB[0], { x: lx, y: ly0 + 38 }); at(this.lgB[1], lx + 46, ly0 + 57);
    show(this.lg, zOn);
    // l'intervalle I : sur l'axe horizontal et sur l'axe vertical
    const I = F.I;
    if (I) { set(this.bX, { x1: X(I[0]), x2: X(I[1]), y1: yA, y2: yA }); set(this.bY, { x1: xA, x2: xA, y1: Y(I[0]), y2: Y(I[1]) }); at(this.bXt, X((I[0] + I[1]) / 2), yA - 14); at(this.bYt, xA - 14, Y((I[0] + I[1]) / 2) + 6); }
    show(this.bg, I ? p.bornes : 0);
    // l'escalier : de (u_k ; 0) à (u_k ; f(u_k)), puis (f(u_k) ; f(u_k)) sur la droite…
    const u = orbite(f, p.u0, NMAX), V = [[p.u0, 0]];
    for (let i = 0; i < NMAX; i++) { V.push([u[i], f(u[i])]); V.push([u[i + 1], u[i + 1]]); }
    const t = clamp(2 * p.k, 0, 2 * NMAX), full = Math.floor(t), rem = t - full;
    let de = "";
    if (t > 0) { de = "M" + fix(X(c1(V[0][0]))) + " " + fix(Y(0)); for (let i = 1; i <= full; i++) de += "L" + fix(X(c1(V[i][0]))) + " " + fix(Y(c1(V[i][1]))); if (rem > 0 && full < V.length - 1) { const a = V[full], b = V[full + 1]; de += "L" + fix(X(c1(lerp(a[0], b[0], rem)))) + " " + fix(Y(c1(lerp(a[1], b[1], rem)))); } }
    this.ec.setAttribute("d", de); show(this.ec, t > 0 ? 1 : 0);
    // le point de départ
    this.st.setAttribute("cx", fix(X(p.u0))); this.st.setAttribute("cy", fix(yA)); show(this.st, p.axeU * (1 - R.z));
    this.stHit.setAttribute("cx", fix(X(p.u0))); this.stHit.setAttribute("cy", fix(yA));
    // l'écart f(u_n) − u_n au terme n
    const en = clamp(Math.round(p.en), 0, NMAX - 1), un = u[en];
    seg(this.eg, un, un, un, f(un)); show(this.eg, p.ecart);
    at(this.ecT, X(un) - 14, Y((un + f(un)) / 2) + 6); setFx(this.ecT, `*f*(*${L}*_{*n*}) − *${L}*_{*n*}`); show(this.ecT, p.ecart * (1 - R.z));
    // les termes reportés sur l'axe (ou, après le zoom, sur la droite)
    const nRep = Math.floor(p.k + 1e-9);
    this.tm.forEach((q, i) => {
      const vis = p.axeU * (i <= nRep ? 1 : 0), zo = R.z, lab = i <= 4 ? 1 : 0;
      const ui = u[i], row = i % 3, ly = yA + 46 + row * 23;
      set(q.dot, { cx: X(ui), cy: yA }); set(q.dd, { cx: X(ui), cy: Y(ui) });
      if (i) set(q.drop, { x1: X(ui), x2: X(ui), y1: Y(ui), y2: yA }); else set(q.drop, { x1: 0, x2: 0, y1: 0, y2: 0 });
      set(q.lead, { x1: X(ui), x2: X(ui), y1: yA + 8, y2: ly - 24 }); at(q.lab, X(ui), ly); setFx(q.lab, `*${L}*_{${i}}`);
      show(q.dot, vis * (1 - zo)); show(q.drop, vis * (1 - zo)); show(q.lead, vis * (1 - zo) * lab); show(q.lab, vis * (1 - zo) * lab);
      show(q.dd, (i >= 1 && i <= nRep ? 1 : 0) * zo * p.axeU);
    });
    // le point fixe
    this.fp.forEach((q, j) => {
      const v = F.fix[j], ok = v != null;
      if (ok) { set(q.c, { cx: X(v), cy: Y(v) }); const ex = p.f === "bac22" ? (j ? "ln 4" : "0") : p.f === "bac19" ? "e" : (Math.abs(v - Math.round(v)) < 1e-9 ? `ℓ = ${ent(v)}` : `ℓ ≈ ${fr(v, 3)}`);
        const dx = p.f === "bac22" && j === 0 ? 18 : 16, dy = p.f === "bac22" && j === 0 ? 32 : 36; at(q.t, X(v) + dx, Y(v) + dy); setFx(q.t, ex); }
      show(q.g, ok ? p.fixe : 0);
    });
    this.wl.forEach((t, i) => show(t, clamp(p.wr * 3 - i, 0, 1)));
    // la lecture « u_0 = 5 : u_10 ≈ … »
    setFx(this.ul, `*${L}*_{0} = ${fr(p.u0, 0)} : *${L}*_{10} ≈ ${fr(u[10], 3)}`); show(this.ul, p.lecU);
  },
});

/* ---------- 0. ce qu'il faut savoir : un test, puis trois rappels ---------- */
scene("savoir", {
  p: { q: 0, qr: 0, r1: 0, r2: 0, r3: 0 },
  build(g) {
    this.ti = O.titre(g, "Ce qu’il faut savoir", "les suites arithmétiques et géométriques");
    this.qg = E("g", {}, g);
    fx(this.qg, 500, 250, `*u*_{0} = ${SAV.u0} et *u*_{*n*+1} = ${SAV.q}*u*_{*n*}`, "t-big2 s-ink", "middle");
    fx(this.qg, 470, 380, "*u*_{5} =", "t-big2 s-ink", "end");
    this.qm = fx(this.qg, 494, 380, "?", "t-big2 s-ink");
    this.qa = fx(this.qg, 494, 380, ent(SAV_U5), "t-big2 s-a");
    const L = [["*u*_{*n*} = *u*_{0} + *n*·*r*", "arithmétique : on ajoute *r* à chaque pas"],
      ["*u*_{*n*} = *u*_{0}·*q*^{*n*}", "géométrique : on multiplie par *q* à chaque pas"],
      ["*a* ≤ *b* dans *I* entraîne *f*(*a*) ≤ *f*(*b*)", "si *f* est croissante sur *I*"]];
    this.rs = L.map(([a, b], i) => { const rg = E("g", {}, g), y = 230 + i * 130; fx(rg, 500, y, a, "t-big2 s-ink", "middle"); fx(rg, 500, y + 38, b, "t-lab s-dim", "middle"); return rg; });
  },
  render() {
    const p = this.p;
    show(this.qg, p.q); show(this.qm, 1 - p.qr); show(this.qa, p.qr);
    [p.r1, p.r2, p.r3].forEach((v, i) => show(this.rs[i], v));
  },
});
}
