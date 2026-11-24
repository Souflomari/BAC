/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « La méiose, la fécondation et les brassages » : `meiose`, la figure-clé (décision du
 * propriétaire, plan §9.4 : une seule scène, trois modes).
 *
 *   · division : une cellule à 2n = 4 (une grande paire, une petite) qu'on voit se répliquer,
 *     s'apparier, s'aligner, se séparer, échanger un segment (crossing-over), puis donner quatre
 *     cellules ; `ph` va de 0 à 8, une phase par unité, et les chromosomes glissent entre deux entiers ;
 *   · caryotype (`kar`) : les chromosomes rangés par paires, d'une espèce (`esp`) ;
 *   · fécondation (`fec`) : deux noyaux dont on compte les chromosomes (`fcnt`), puis réunis (`zyg`).
 *
 * Le chromosome d'origine paternelle est toujours en `k-a`, celui d'origine maternelle en `k-ink` ;
 * jamais une couleur écrite en dur. Les chromosomes sont des tiges horizontales : l'axe du fuseau est
 * horizontal, la plaque équatoriale verticale. Toutes les positions sont CALCULÉES (tables de phases,
 * interpolation continue) ; aucune n'est posée à l'œil.
 */
import { ESPECES, PHASES, etat, lignesCompteur, gametes, longueursPaires } from "./meiose-outils";

const PHI = 0.19;           // demi-écart entre deux chromatides sœurs (rad)
const LG = 140, LP = 84;    // longueur de la grande et de la petite tige
const WR = 11;              // épaisseur d'une chromatide
const SP = 40;              // écart des quatre chromatides d'une tétrade
const SW = 40;              // rayon vertical du demi-tour de la petite paire
const YG = 285, YP = 395;   // hauteur de la grande et de la petite paire
const CELL_Y0 = 150, CELL_H = 360;
// les quatre chromosomes : identifiant, taille, origine, côté de la grande paire
const CHR = [
  { id: "G1", big: true, pat: true, side: -1, all: ["A", "D"] },
  { id: "G2", big: true, pat: false, side: 1, all: ["a", "d"] },
  { id: "P1", big: false, pat: true, all: ["B"] },
  { id: "P2", big: false, pat: false, all: ["b"] },
];
// chromosomes dispersés en G1 et après la phase S (dans le noyau)
const SC = { G1: [390, 290], G2: [600, 340], P1: [470, 430], P2: [560, 225] };
// centres des deux tétrades, et rang de chaque chromatide dans sa tétrade
const TEX = { G: [430, 300], P: [610, 420] };
const ROWS = [-1.5, -0.5, 0.5, 1.5].map((v) => v * SP);
const RANG = { G1: [0, 1], G2: [2, 3], P1: [0, 1], P2: [2, 3] };
// les quatre cellules, de gauche à droite à la fin : [x1, x2, opacité] à chaque phase
const CELLS = [
  [[180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [100, 480, 1], [100, 480, 1], [100, 480, 1], [85, 275, 1]],
  [[820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [520, 900, 1], [520, 900, 1], [520, 900, 1], [505, 695, 1]],
  [[480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [305, 495, 1]],
  [[900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [725, 915, 1]],
];
const SOUS = ["Avant la méiose : phase G1", "Après la phase S", "Prophase I", "Métaphase I", "Anaphase I", "Fin de la division I", "Métaphase II", "Anaphase II", "Quatre cellules"];

/** La position (centre, inclinaison, opacité) d'une chromatide à la phase entière k ; o : orientation de la petite paire (continue). */
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
  // un chromosome vertical (caryotype, fécondation) : une ou deux chromatides et un centromère
  const vrod = (parent, x, y, L, k, nb, w = 7) => {
    const g = E("g", {}, parent), h = L / 2;
    (nb === 2 ? [PHI, -PHI] : [0]).forEach((a) => { const l = ln(g, k, w); setL(l, x + h * Math.sin(a), y - h * Math.cos(a), x - h * Math.sin(a), y + h * Math.cos(a)); });
    E("circle", { cx: x, cy: y, r: w * 0.62, class: `s-bg ${k}`, "stroke-width": 2.5 }, g);
    return g;
  };
  // une tige horizontale à deux chromatides (la vignette de mitose)
  const hrod = (parent, x, y, L, k) => {
    const h = L / 2;
    [PHI, -PHI].forEach((a) => { const l = ln(parent, k, WR); setL(l, x - h * Math.cos(a), y - h * Math.sin(a), x + h * Math.cos(a), y + h * Math.sin(a)); });
    E("circle", { cx: x, cy: y, r: 7, class: `s-bg ${k}`, "stroke-width": 3 }, parent);
  };
  const clear = (g) => { while (g.firstChild) g.removeChild(g.firstChild); };

  scene("meiose", {
    p: { ph: 0, plq: 0, tet: 0, al: 0, or2: 0, gam: 0, co: 0, chi: 0, cnt: 0, mit: 0, kar: 0, esp: "ascaris4", fec: 0, fcnt: 0, zyg: 0 },
    build(g) {
      /* ===== mode division ===== */
      this.D = E("g", {}, g);
      this.ti = titre(this.D, "Méiose d’une cellule à 2*n* = 4", "");
      this.W = E("g", {}, this.D);
      this.cells = [0, 1, 2, 3].map(() => E("rect", { y: CELL_Y0, height: CELL_H, rx: 70, class: "cell" }, this.W));
      this.pl = [0, 1].map(() => ln(this.W, "k-dim", 1.6, { "stroke-dasharray": "6 6" }));
      this.tetR = [E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W), E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W)];
      this.tetT = fx(this.W, 430, 205, "tétrade : 4 chromatides", "t-lab2 s-ink", "middle");
      // les huit chromatides : segments, centromère, étiquettes d'allèles
      this.ch = [];
      CHR.forEach((c) => [0, 1].forEach((ci) => {
        const k = c.pat ? "k-a" : "k-ink", gg = E("g", {}, this.W);
        const ob = { c, ci, k, L: c.big ? LG : LP, g: gg };
        ob.up = ln(gg, k, WR); ob.sl = ln(gg, k, WR); ob.lo = ln(gg, k, WR); ob.lx = ln(gg, k, WR);
        ob.cen = E("circle", { r: 7, class: `s-bg ${k}`, "stroke-width": 3 }, gg);
        ob.lab = c.all.map(() => E("text", { class: "me-all s-ink", "text-anchor": "middle" }, gg));
        this.ch.push(ob);
      }));
      this.chi = E("g", {}, this.W);
      this.chiL = ln(this.chi, "k-ink", 1.8);
      this.chiT = fx(this.chi, 0, 0, "chiasma", "t-lab2 s-ink", "start");
      this.cnt = [0, 1, 2, 3].map(() => [0, 1, 2].map((i) => fx(this.W, 0, 584 + 24 * i, "", i === 2 ? "me-cnt s-ink" : "me-cnt s-dim", "middle")));
      this.gen = [0, 1, 2, 3].map(() => fx(this.W, 0, 548, "", "me-gen s-ink", "middle"));
      /* la vignette de mitose, à droite : les quatre chromosomes alignés un par un sur la plaque */
      this.MG = E("g", {}, this.D);
      E("rect", { x: 180, y: CELL_Y0, width: 640, height: CELL_H, rx: 70, class: "cell" }, this.MG);
      setL(ln(this.MG, "k-dim", 1.6, { "stroke-dasharray": "6 6" }), 500, 170, 500, 490);
      [["k-a", LG, 235], ["k-ink", LG, 295], ["k-a", LP, 365], ["k-ink", LP, 425]].forEach(([k, L, y]) => hrod(this.MG, 500, y, L, k));
      this.capM = fx(this.D, 250, 600, "méiose : par paires", "t-titre s-ink", "middle");
      this.capT = fx(this.D, 750, 600, "mitose : un par un", "t-titre s-ink", "middle");

      /* ===== mode caryotype et mode fécondation : reconstruits quand l'espèce change ===== */
      this.K = E("g", {}, g);
      this.F = E("g", {}, g);
      this._esp = null;
    },
    /* ---------- le caryotype ---------- */
    buildKar(esp) {
      const K = this.K, e = ESPECES[esp];
      clear(K);
      const tit = { ascaris4: ["Une cellule à 2*n* = 4 chromosomes", "schéma : deux paires, une grande et une petite"], droso8: ["Un caryotype de drosophile", "schéma : chromosomes rangés par paires de même taille"], homme46: ["Un caryotype d’homme", "schéma : chromosomes rangés par paires de même taille"] }[esp];
      titre(K, tit[0], tit[1]);
      this.alK = [];
      const pair = (x, y, L, i, lab, accent) => {
        const gp = 0.1 * L + 14;
        vrod(K, x - gp, y, L, "k-a", 2, 7); vrod(K, x + gp, y, L, "k-ink", 2, 7);
        if (lab) fx(K, x, y + L / 2 + 30, lab, accent ? "t-lab2 s-a" : "t-lab s-ink", "middle");
      };
      if (esp === "ascaris4") {
        const Ls = longueursPaires(esp, 150);
        [400, 600].forEach((x, i) => pair(x, 330, Ls[i], i, String(i + 1)));
        this.alPair = [400, 330, Ls[0]];
      } else if (esp === "droso8") {
        const Ls = longueursPaires(esp, 156), xs = [200, 380, 560, 790];
        xs.forEach((x, i) => pair(x, 330, Ls[i], i, i < 3 ? String(i + 1) : "XX", i === 3));
        fx(K, 380, 500, "3 paires d’autosomes", "t-sous", "middle");
        fx(K, 790, 500, "1 paire de gonosomes", "t-sous", "middle");
        this.alPair = [200, 330, Ls[0]];
      } else {
        const Ls = longueursPaires(esp, 96);
        for (let i = 0; i < e.n; i++) {
          const row = i < 12 ? 0 : 1, col = row ? i - 12 : i, x = 96 + col * 76, y = 210 + row * 175;
          if (i < e.auto) pair(x, y, Ls[i], i, String(i + 1));
          else {
            vrod(K, x - 16, y, 76, "k-a", 2, 7); vrod(K, x + 16, y, 36, "k-ink", 2, 7);
            fx(K, x, y + 38 + 30, "XY", "t-lab2 s-a", "middle");
          }
        }
        fx(K, 500, 530, "22 paires d’autosomes et 1 paire de gonosomes (XY)", "t-sous", "middle");
        this.alPair = null;
      }
      this.nK = fx(K, 500, 600, `2*n* = ${e.n2}`, "t-big2 s-ink", "middle");
      // les allèles de la première paire, et l'origine de chaque chromosome (quand `al` vaut 1)
      this.alG = E("g", {}, K);
      if (this.alPair) {
        const [px, py, L] = this.alPair, yl = py - 0.18 * L, gp = 0.1 * L + 14;
        [[px - gp, "k-a", "A", "s-a", -1], [px + gp, "k-ink", "a", "s-ink", 1]].forEach(([x, k, t, s, d]) => {
          setL(ln(this.alG, k, 4), x - 12, yl, x + 12, yl);
          fx(this.alG, x + d * 38, yl + 10, t, `me-all ${s}`, "middle");
        });
        fx(this.alG, px - gp, py - L / 2 - 18, "père", "t-lab2 s-a", "middle");
        fx(this.alG, px + gp, py - L / 2 - 18, "mère", "t-lab2 s-ink", "middle");
      }
    },
    /* ---------- la fécondation ---------- */
    buildFec(esp) {
      const F = this.F, e = ESPECES[esp], n = e.n;
      clear(F);
      titre(F, esp === "homme46" ? "Une cellule-œuf humaine" : "L’œuf fécondé", esp === "homme46" ? "schéma : les chromosomes sont rangés en tas" : "schéma : les deux lots de chromosomes, côte à côte");
      E("rect", { x: 120, y: 130, width: 760, height: 410, rx: 150, class: "cell" }, F);
      this.fNoy = E("g", {}, F);
      [[340, "noyau venu du spermatozoïde"], [660, "noyau venu de l’ovule"]].forEach(([x, t]) => {
        E("circle", { cx: x, cy: 340, r: esp === "homme46" ? 120 : 110, class: "reg f-b" }, this.fNoy);
        E("circle", { cx: x, cy: 340, r: esp === "homme46" ? 120 : 110, class: "k-ink nofill", "stroke-width": 2, "stroke-dasharray": "14 7" }, this.fNoy);
        fx(this.fNoy, x, 188 - (esp === "homme46" ? 16 : 0), t, "t-sous", "middle");
      });
      // les chromosomes : n par lot ; position séparée, puis position réunie
      this.fRod = [];
      const L = esp === "homme46" ? null : longueursPaires(esp, 96);
      for (let lot = 0; lot < 2; lot++) {
        for (let i = 0; i < n; i++) {
          let sx, sy, ux, uy, Li;
          if (esp === "homme46") {
            const c = i % 6, r = Math.floor(i / 6);
            sx = (lot ? 660 : 340) + (c - 2.5) * 32; sy = 340 + (r - 1.5) * 46; Li = 34;
            ux = (lot ? 590 : 410) + (c - 2.5) * 26; uy = 340 + (r - 1.5) * 46;
          } else {
            sx = (lot ? 660 : 340) + (i - (n - 1) / 2) * 62; sy = 340; Li = L[i];
            ux = 440 + i * 100 + lot * 40; uy = 340;
          }
          const k = lot ? "k-ink" : "k-a", gr = E("g", {}, F);
          vrod(gr, 0, 0, Li, k, 1, 7);
          const num = fx(gr, 0, Li / 2 + 26, String(i + 1), "t-lab s-ink", "middle");
          this.fRod.push({ gr, sx, sy, ux, uy, i, lot, num });
        }
      }
      this.fQ = [340, 660].map((x) => fx(F, x, 478, "", "t-lab2 s-ink", "middle"));
      this.fQQ = [340, 660].map((x) => fx(F, x, 352, "?", "t-huge s-dim", "middle"));
      this.fZ = fx(F, 500, 600, "", "t-big2 s-ink", "middle");
    },
    render() {
      const p = this.p;
      if (p.esp !== this._esp) { this._esp = p.esp; this.buildKar(p.esp); this.buildFec(p.esp); }
      const fec = clamp(p.fec, 0, 1), kar = clamp(p.kar, 0, 1) * (1 - fec);
      show(this.D, (1 - kar) * (1 - fec)); show(this.K, kar); show(this.F, fec);
      if (fec < 1 - 1e-6 && kar < 1 - 1e-6) this.renderDiv();
      if (kar > 0) { show(this.alG, p.al); }
      if (fec > 0) this.renderFec();
    },
    renderDiv() {
      const p = this.p, ph = clamp(p.ph, 0, 8), o = p.or2, f1 = (v) => v.toFixed(1);
      const ri = Math.round(ph), co = p.co, gx = clamp(co * 2, 0, 1), gy = clamp(co * 2 - 1, 0, 1), wT = clamp(1 - Math.abs(ph - 2), 0, 1);
      this.ti.set("Méiose d’une cellule à 2*n* = 4", SOUS[ri]);
      /* la vignette de mitose : la figure de méiose se réduit et passe à gauche */
      const s = lerp(1, 0.7, p.mit);
      this.W.setAttribute("transform", `translate(${f1(lerp(0, -100, p.mit))} ${f1(330 * (1 - s))}) scale(${s.toFixed(3)})`);
      this.MG.setAttribute("transform", `translate(400 ${f1(330 * (1 - 0.7))}) scale(0.7)`);
      show(this.MG, p.mit); show(this.capM, p.mit); show(this.capT, p.mit);
      /* les cellules */
      const k = Math.min(7, Math.floor(ph)), f = ph - k, cc = [];
      CELLS.forEach((row, i) => {
        const a = row[k], b = row[k + 1], x1 = lerp(a[0], b[0], f), x2 = lerp(a[1], b[1], f), op = lerp(a[2], b[2], f);
        const r = this.cells[i]; r.setAttribute("x", f1(x1)); r.setAttribute("width", f1(Math.max(0, x2 - x1))); r.style.opacity = op; cc.push({ x: (x1 + x2) / 2, op });
      });
      /* les plaques équatoriales */
      const bump = (a, b, c, d) => clamp((ph - a) / (b - a), 0, 1) * clamp((d - ph) / (d - c), 0, 1);
      const pl1 = bump(2.4, 3, 4, 4.5) * p.plq, pl2 = bump(5.4, 6, 6.4, 6.9) * p.plq;
      [[cc[0].x, Math.max(pl1, pl2)], [cc[1].x, pl2]].forEach(([x, op], i) => { setL(this.pl[i], x, 170, x, 490); this.pl[i].style.opacity = op; });
      /* les chromatides */
      const pos = {};
      this.ch.forEach((ob) => { pos[ob.c.id + ob.ci] = interp(ph, ob.c, ob.ci, o, lerp); });
      const W2 = (q, v, u) => [q.x + v * Math.cos(q.th) - u * Math.sin(q.th), q.y + v * Math.sin(q.th) + u * Math.cos(q.th)];
      // texte d'un locus : les deux chromatides qui se croisent échangent la partie droite de leur tige
      const crosser = (ob) => (ob.c.id === "G1" && ob.ci === 1) || (ob.c.id === "G2" && ob.ci === 0);
      const autre = (ob) => CHR[ob.c.id === "G1" ? 1 : 0];
      const textes = (ob) => ob.c.all.map((t, j) => (j === 1 && crosser(ob) && gy >= 0.5 ? { t: autre(ob).all[1], pat: autre(ob).pat } : { t, pat: ob.c.pat }));
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
      // les étiquettes d'allèles (une ou deux par chromatide) ; la 2ᵉ chromatide d'un chromosome n'en porte pas si elle répète la 1ʳᵉ
      this.ch.forEach((ob) => {
        const q = ob.q, T = textes(ob), cr = crosser(ob);
        const partenaire = this.ch.find((x) => x.c === ob.c && x.ci !== ob.ci), Tp = textes(partenaire);
        const gap = Math.hypot(q.x - partenaire.q.x, q.y - partenaire.q.y);
        ob.c.all.forEach((_, j) => {
          const t = ob.lab[j], vloc = ob.c.big ? (j ? 0.38 : -0.34) * ob.L : -0.28 * ob.L;
          // le 2ᵉ locus d'un croiseur reste attaché à la partie droite de sa tige tant que le croisement dure
          const duL = j === 1 && cr && gy < 0.5 ? (ob.c.id === "G1" ? SP : -SP) * gx * wT : 0;
          const [lx, ly] = W2(q, vloc, duL);
          // le côté de l'étiquette : du côté où sa chromatide s'écarte de l'autre (en haut si elle est seule)
          const d = clamp((vloc * q.th) / (Math.abs(vloc) * PHI), -1, 1), bas = clamp((d - 0.1) / 0.4, 0, 1);
          const yb = ly + lerp(lerp(-11, 32, bas), 10.5, wT);
          t.setAttribute("x", f1(lx)); t.setAttribute("y", f1(yb));
          t.textContent = T[j].t; t.setAttribute("class", `me-all ${T[j].pat ? "s-a" : "s-ink"}`);
          // la 2ᵉ chromatide n'écrit pas l'allèle de la 1ʳᵉ quand elles sont confondues
          const idem = ob.ci && T[j].t === Tp[j].t;
          t.style.opacity = p.al * q.op * (idem ? clamp((gap - 4) / 8, 0, 1) : 1);
        });
      });
      /* les contours de tétrade et leur étiquette */
      const wt = wT * p.tet;
      [[TEX.G, LG], [TEX.P, LP]].forEach(([c, L], i) => {
        const r = this.tetR[i], w = L + 24, hgt = 3 * SP + 2 * WR + 20;
        r.setAttribute("x", f1(c[0] - w / 2)); r.setAttribute("y", f1(c[1] - hgt / 2)); r.setAttribute("width", f1(w)); r.setAttribute("height", f1(hgt)); r.style.opacity = wt;
      });
      this.tetT.setAttribute("y", f1(TEX.G[1] - (3 * SP + 2 * WR + 20) / 2 - 12)); show(this.tetT, wt);
      /* le chiasma : l'étiquette et son trait, à l'endroit du croisement */
      const cx0 = TEX.G[0] + 0.21 * LG, cy0 = TEX.G[1];
      setL(this.chiL, cx0 + 8, cy0, TEX.G[0] + LG / 2 + 24, cy0);
      this.chiT.setAttribute("x", f1(TEX.G[0] + LG / 2 + 30)); this.chiT.setAttribute("y", f1(cy0 + 7));
      show(this.chi, p.chi * wT * clamp(gx * 3, 0, 1));
      /* le compteur sous chaque cellule, et le génotype des gamètes */
      const L3 = lignesCompteur(ph);
      const G = gametes(Math.round(o), co > 0.75 ? 1 : 0), ordre = [0, 2, 1, 3];
      cc.forEach((c, i) => {
        this.cnt[i].forEach((t, j) => { t.setAttribute("x", f1(c.x)); setFx(t, L3[j]); t.style.opacity = p.cnt * c.op * (1 - p.mit); });
      });
      ordre.forEach((ci, i) => { const t = this.gen[i]; t.setAttribute("x", f1(cc[ci].x)); setFx(t, G[i]); t.style.opacity = p.gam * clamp((ph - 7.6) / 0.4, 0, 1); });
    },
    renderFec() {
      const p = this.p, n = ESPECES[p.esp].n, e = ESPECES[p.esp], z = clamp(p.zyg, 0, 1), c = clamp(p.fcnt, 0, 1);
      const visibles = [0, 0];
      this.fRod.forEach((r) => {
        const x = lerp(r.sx, r.ux, z), y = lerp(r.sy, r.uy, z), o = clamp(c * n - r.i, 0, 1);
        r.gr.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`); r.gr.style.opacity = o;
        r.num.style.opacity = (1 - z) * (n > 6 ? 0 : 1);
        if (o >= 1) visibles[r.lot]++;
      });
      show(this.fNoy, 1 - z);
      this.fQ.forEach((t, j) => { setFx(t, visibles[j] ? `${visibles[j]} chromosome${visibles[j] > 1 ? "s" : ""}` : "chromosomes cachés"); t.style.opacity = (1 - z); });
      this.fQQ.forEach((t) => { t.style.opacity = (1 - z) * (c > 0 ? 0 : 1); });
      setFx(this.fZ, `cellule-œuf : 2*n* = ${e.n2} chromosomes`); show(this.fZ, clamp(z * 2 - 1, 0, 1));
    },
  });
}
