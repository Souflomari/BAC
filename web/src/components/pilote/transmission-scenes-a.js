/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « Les lois statistiques de la transmission des caractères » : `meiose`, la scène de la leçon
 * sur la méiose COPIÉE ici (plan §9.3 : les fichiers meiose-* ne se modifient pas), réduite à son mode
 * « division » et avec les noms d'allèles en paramètre : `lab` ({ G1, G2, P1, P2 } : une liste
 * d'étiquettes par chromosome, vide permise) et `gm` (l'écriture des gamètes : 0 gènes indépendants,
 * « L/ J/ » ; 1 gènes liés, « G L »).
 *
 * Le chromosome d'origine paternelle est en `k-a`, celui d'origine maternelle en `k-ink` ; jamais une
 * couleur écrite en dur. Les chromosomes sont des tiges horizontales ; l'axe du fuseau est horizontal.
 * Toutes les positions sont CALCULÉES (tables de phases, interpolation continue).
 */
import { SOUS_PH, gametesMeiose, LAB } from "./transmission-outils";

const PHI = 0.19;           // demi-écart entre deux chromatides sœurs (rad)
const LG = 140, LP = 84;    // longueur de la grande et de la petite tige
const WR = 11;              // épaisseur d'une chromatide
const SP = 40;              // écart des quatre chromatides d'une tétrade
const SW = 40;              // rayon vertical du demi-tour de la petite paire
const YG = 285, YP = 395;   // hauteur de la grande et de la petite paire
const CELL_Y0 = 150, CELL_H = 360;
// les quatre chromosomes : identifiant, taille, origine, côté de la grande paire
const CHR = [
  { id: "G1", big: true, pat: true, side: -1 },
  { id: "G2", big: true, pat: false, side: 1 },
  { id: "P1", big: false, pat: true },
  { id: "P2", big: false, pat: false },
];
const SC = { G1: [390, 290], G2: [600, 340], P1: [470, 430], P2: [560, 225] };
const TEX = { G: [430, 300], P: [610, 420] };
const ROWS = [-1.5, -0.5, 0.5, 1.5].map((v) => v * SP);
const RANG = { G1: [0, 1], G2: [2, 3], P1: [0, 1], P2: [2, 3] };
const CELLS = [
  [[180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [100, 480, 1], [100, 480, 1], [100, 480, 1], [85, 275, 1]],
  [[820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [520, 900, 1], [520, 900, 1], [520, 900, 1], [505, 695, 1]],
  [[480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [305, 495, 1]],
  [[900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [725, 915, 1]],
];

function posK(k, c, ci, o) {
  const pi = Math.PI, big = c.big;
  const so = c.id === "P1" ? -Math.cos(pi * o) : c.id === "P2" ? Math.cos(pi * o) : c.side;
  const sw = c.id === "P1" ? -SW * Math.sin(pi * o) : c.id === "P2" ? SW * Math.sin(pi * o) : 0;
  const L = big ? LG : LP, Y = big ? YG : YP, tilt = ci ? -PHI : PHI;
  const xc = 500 + 210 * so;
  switch (k) {
    case 0: return { x: SC[c.id][0], y: SC[c.id][1], th: 0, op: ci ? 0 : 1 };
    case 1: return { x: SC[c.id][0], y: SC[c.id][1], th: tilt, op: 1 };
    case 2: { const t = TEX[big ? "G" : "P"]; return { x: t[0], y: t[1] + ROWS[RANG[c.id][ci]], th: 0, op: 1 }; }
    case 3: return { x: 500 + so * (L / 2 + 22), y: Y + sw, th: tilt, op: 1 };
    case 4: return { x: 500 + 225 * so, y: Y + sw, th: tilt, op: 1 };
    case 5: return { x: big ? xc - 40 : xc + 40, y: big ? 300 : 360, th: tilt, op: 1 };
    case 6: return { x: xc, y: Y, th: tilt, op: 1 };
    default: return { x: xc + (ci ? 110 : -110), y: Y, th: 0, op: 1 };
  }
}
const interp = (ph, c, ci, o, lerp) => {
  const k = Math.min(7, Math.floor(ph)), f = ph - k, a = posK(k, c, ci, o), b = posK(k + 1, c, ci, o);
  return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f), th: lerp(a.th, b.th, f), op: lerp(a.op, b.op, f) };
};

export function scenesA(ctx, O) {
  const { E, lerp, clamp, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const ln = (parent, k, w, extra) => E("line", { class: k, "stroke-width": w, "stroke-linecap": "round", ...(extra || {}) }, parent);
  const setL = (el, x1, y1, x2, y2) => { el.setAttribute("x1", x1.toFixed(1)); el.setAttribute("y1", y1.toFixed(1)); el.setAttribute("x2", x2.toFixed(1)); el.setAttribute("y2", y2.toFixed(1)); };

  scene("meiose", {
    p: { ph: 0, plq: 0, tet: 0, al: 0, or2: 0, gam: 0, co: 0, chi: 0, lab: LAB.vide, gm: 1 },
    build(g) {
      this.ti = titre(g, "Méiose d’une cellule à 2*n* = 4", "");
      this.W = E("g", {}, g);
      this.cells = [0, 1, 2, 3].map(() => E("rect", { y: CELL_Y0, height: CELL_H, rx: 70, class: "cell" }, this.W));
      this.pl = [0, 1].map(() => ln(this.W, "k-dim", 1.6, { "stroke-dasharray": "6 6" }));
      this.tetR = [E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W), E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W)];
      this.tetT = fx(this.W, 430, 205, "tétrade : 4 chromatides", "t-lab2 s-ink", "middle");
      // les huit chromatides : segments, centromère, étiquettes d'allèles (2 emplacements sur la grande paire, 1 sur la petite)
      this.ch = [];
      CHR.forEach((c) => [0, 1].forEach((ci) => {
        const k = c.pat ? "k-a" : "k-ink", gg = E("g", {}, this.W);
        const ob = { c, ci, k, L: c.big ? LG : LP, g: gg };
        ob.up = ln(gg, k, WR); ob.sl = ln(gg, k, WR); ob.lo = ln(gg, k, WR); ob.lx = ln(gg, k, WR);
        ob.cen = E("circle", { r: 7, class: `s-bg ${k}`, "stroke-width": 3 }, gg);
        ob.lab = (c.big ? [0, 1] : [0]).map(() => E("text", { class: "me-all s-ink", "text-anchor": "middle" }, gg));
        this.ch.push(ob);
      }));
      this.chi = E("g", {}, this.W);
      this.chiL = ln(this.chi, "k-ink", 1.8);
      this.chiT = fx(this.chi, 0, 0, "chiasma", "t-lab2 s-ink", "start");
      this.gen = [0, 1, 2, 3].map(() => fx(this.W, 0, 548, "", "me-gen s-ink", "middle"));
    },
    render() {
      const p = this.p, ph = clamp(p.ph, 0, 8), o = p.or2, f1 = (v) => v.toFixed(1);
      const lab = p.lab || LAB.vide, all = (c) => lab[c.id] || [];
      const co = p.co, gx = clamp(co * 2, 0, 1), gy = clamp(co * 2 - 1, 0, 1), wT = clamp(1 - Math.abs(ph - 2), 0, 1);
      this.ti.set("Méiose d’une cellule à 2*n* = 4", SOUS_PH[Math.round(ph)]);
      const k = Math.min(7, Math.floor(ph)), f = ph - k, cc = [];
      CELLS.forEach((row, i) => {
        const a = row[k], b = row[k + 1], x1 = lerp(a[0], b[0], f), x2 = lerp(a[1], b[1], f), op = lerp(a[2], b[2], f);
        const r = this.cells[i]; r.setAttribute("x", f1(x1)); r.setAttribute("width", f1(Math.max(0, x2 - x1))); r.style.opacity = op; cc.push({ x: (x1 + x2) / 2, op });
      });
      const bump = (a, b, c, d) => clamp((ph - a) / (b - a), 0, 1) * clamp((d - ph) / (d - c), 0, 1);
      const pl1 = bump(2.4, 3, 4, 4.5) * p.plq, pl2 = bump(5.4, 6, 6.4, 6.9) * p.plq;
      [[cc[0].x, Math.max(pl1, pl2)], [cc[1].x, pl2]].forEach(([x, op], i) => { setL(this.pl[i], x, 170, x, 490); this.pl[i].style.opacity = op; });
      const pos = {};
      this.ch.forEach((ob) => { pos[ob.c.id + ob.ci] = interp(ph, ob.c, ob.ci, o, lerp); });
      const W2 = (q, v, u) => [q.x + v * Math.cos(q.th) - u * Math.sin(q.th), q.y + v * Math.sin(q.th) + u * Math.cos(q.th)];
      const crosser = (ob) => (ob.c.id === "G1" && ob.ci === 1) || (ob.c.id === "G2" && ob.ci === 0);
      const autre = (ob) => CHR[ob.c.id === "G1" ? 1 : 0];
      // texte d'un locus : les deux chromatides qui se croisent échangent la partie droite de leur tige
      const textes = (ob) => (ob.c.big ? [0, 1] : [0]).map((j) => (j === 1 && crosser(ob) && gy >= 0.5 ? { t: all(autre(ob))[1] || "", pat: autre(ob).pat } : { t: all(ob.c)[j] || "", pat: ob.c.pat }));
      this.ch.forEach((ob) => {
        const q = pos[ob.c.id + ob.ci], h = ob.L / 2, vc = 0.14 * ob.L, dl = 0.14 * ob.L;
        const cr = crosser(ob), du = cr ? (ob.c.id === "G1" ? SP : -SP) * gx * wT : 0;
        const [x0, y0] = W2(q, -h, 0), [x1, y1] = W2(q, vc, 0), [x2, y2] = W2(q, vc + dl, du), [x3, y3] = W2(q, h, du), [x4, y4] = W2(q, h, 0);
        const op = q.op;
        setL(ob.up, x0, y0, x1, y1); setL(ob.sl, x1, y1, x2, y2); setL(ob.lo, x2, y2, x3, y3); setL(ob.lx, x1, y1, x4, y4);
        ob.lx.setAttribute("class", cr ? autre(ob).pat ? "k-a" : "k-ink" : ob.k);
        ob.up.style.opacity = op; ob.sl.style.opacity = op * (cr ? 1 - gy : 1); ob.lo.style.opacity = op * (cr ? 1 - gy : 1); ob.lx.style.opacity = cr ? op * gy : 0;
        ob.cen.setAttribute("cx", f1(q.x)); ob.cen.setAttribute("cy", f1(q.y)); ob.cen.style.opacity = op;
        ob.q = q;
      });
      this.ch.forEach((ob) => {
        const q = ob.q, T = textes(ob), cr = crosser(ob);
        const partenaire = this.ch.find((x) => x.c === ob.c && x.ci !== ob.ci), Tp = textes(partenaire);
        const gap = Math.hypot(q.x - partenaire.q.x, q.y - partenaire.q.y);
        T.forEach((_, j) => {
          const t = ob.lab[j], vloc = ob.c.big ? (j ? 0.38 : -0.34) * ob.L : -0.28 * ob.L;
          const duL = j === 1 && cr && gy < 0.5 ? (ob.c.id === "G1" ? SP : -SP) * gx * wT : 0;
          const [lx, ly] = W2(q, vloc, duL);
          const d = clamp((vloc * q.th) / (Math.abs(vloc) * PHI), -1, 1), bas = clamp((d - 0.1) / 0.4, 0, 1);
          const yb = ly + lerp(lerp(-11, 32, bas), 10.5, wT);
          t.setAttribute("x", f1(lx)); t.setAttribute("y", f1(yb));
          t.textContent = T[j].t; t.setAttribute("class", `me-all ${T[j].pat ? "s-a" : "s-ink"}`);
          const idem = ob.ci && T[j].t === Tp[j].t;
          t.style.opacity = (T[j].t ? p.al : 0) * q.op * (idem ? clamp((gap - 4) / 8, 0, 1) : 1);
        });
      });
      const wt = wT * p.tet;
      [[TEX.G, LG], [TEX.P, LP]].forEach(([c, L], i) => {
        const r = this.tetR[i], w = L + 24, hgt = 3 * SP + 2 * WR + 20;
        r.setAttribute("x", f1(c[0] - w / 2)); r.setAttribute("y", f1(c[1] - hgt / 2)); r.setAttribute("width", f1(w)); r.setAttribute("height", f1(hgt)); r.style.opacity = wt;
      });
      this.tetT.setAttribute("y", f1(TEX.G[1] - (3 * SP + 2 * WR + 20) / 2 - 12)); show(this.tetT, wt);
      const cx0 = TEX.G[0] + 0.21 * LG, cy0 = TEX.G[1];
      setL(this.chiL, cx0 + 8, cy0, TEX.G[0] + LG / 2 + 24, cy0);
      this.chiT.setAttribute("x", f1(TEX.G[0] + LG / 2 + 30)); this.chiT.setAttribute("y", f1(cy0 + 7));
      show(this.chi, p.chi * wT * clamp(gx * 3, 0, 1));
      // les gamètes sous les quatre cellules
      const G = gametesMeiose(lab, Math.round(o), co > 0.75 ? 1 : 0, p.gm ? "lie" : "indep"), ordre = [0, 2, 1, 3];
      ordre.forEach((ci, i) => { const t = this.gen[i]; t.setAttribute("x", f1(cc[ci].x)); setFx(t, G[i]); t.style.opacity = p.gam * clamp((ph - 7.6) / 0.4, 0, 1); });
    },
  });
}
