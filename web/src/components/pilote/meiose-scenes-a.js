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
const XC = 208;             // décalage horizontal du centre des deux cellules filles (le même pour la fin de la division I et les quatre cellules)
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
// les mêmes chromosomes rangés côte à côte, homologue du père à gauche, de la mère à droite (`rg` = 1)
const SCR = { G1: [360, 300], G2: [640, 300], P1: [420, 420], P2: [580, 420] };
// centres des deux tétrades, et rang de chaque chromatide dans sa tétrade
const TEX = { G: [430, 300], P: [610, 404] };
const ROWS = [-1.5, -0.5, 0.5, 1.5].map((v) => v * SP);
const RANG = { G1: [0, 1], G2: [2, 3], P1: [0, 1], P2: [2, 3] };
// les quatre cellules, de gauche à droite à la fin : [x1, x2, opacité] à chaque phase
// à la fin, quatre cellules de 184 de large, séparées de 24 partout ; avant, deux cellules de 392 de large
const CELLS = [
  [[180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [180, 820, 1], [96, 488, 1], [96, 488, 1], [96, 488, 1], [96, 280, 1]],
  [[820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [820, 820, 0], [512, 904, 1], [512, 904, 1], [512, 904, 1], [512, 696, 1]],
  [[480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [480, 480, 0], [304, 488, 1]],
  [[900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [900, 900, 0], [720, 904, 1]],
];
const SOUS = ["Avant la méiose : phase G1", "Après la phase S", "Prophase I", "Métaphase I", "Anaphase I", "Fin de la division I", "Métaphase II", "Anaphase II", "Quatre cellules"];

/** La position (centre, inclinaison, opacité) d'une chromatide à la phase entière k ; o : orientation de la petite paire (continue). */
function posK(k, c, ci, o, rg) {
  const pi = Math.PI, big = c.big;
  const so = c.id === "P1" ? -Math.cos(pi * o) : c.id === "P2" ? Math.cos(pi * o) : c.side;
  const sw = c.id === "P1" ? -SW * Math.sin(pi * o) : c.id === "P2" ? SW * Math.sin(pi * o) : 0;
  const L = big ? LG : LP, Y = big ? YG : YP, tilt = ci ? -PHI : PHI;
  const xc = 500 + XC * so, S0 = rg ? SCR : SC;
  switch (k) {
    case 0: return { x: S0[c.id][0], y: S0[c.id][1], th: 0, op: ci ? 0 : 1 };
    case 1: return { x: S0[c.id][0], y: S0[c.id][1], th: tilt, op: 1 };
    case 2: { const t = TEX[big ? "G" : "P"]; return { x: t[0], y: t[1] + ROWS[RANG[c.id][ci]], th: 0, op: 1 }; }
    case 3: return { x: 500 + so * (L / 2 + 22), y: Y + sw, th: tilt, op: 1 };
    case 4: return { x: 500 + 225 * so, y: Y + sw, th: tilt, op: 1 };
    case 5: return { x: big ? xc - 40 : xc + 40, y: big ? 300 : 360, th: tilt, op: 1 };
    case 6: return { x: xc, y: Y, th: tilt, op: 1 };
    default: return { x: xc + (ci ? 104 : -104), y: Y, th: 0, op: 1 };
  }
}
const interp = (ph, c, ci, o, lerp, rg) => {
  const k = Math.min(7, Math.floor(ph)), f = ph - k, a = posK(k, c, ci, o, rg), b = posK(k + 1, c, ci, o, rg);
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
    // al : 0 aucun allèle, 1 les gènes A et B, 2 aussi D ; rg : 1 range les homologues côte à côte ; idm : 0 écrit l'allèle sur
    // chaque chromatide ; pt : 0 cache la petite paire ; nlab : 0 cache « 2n = … » ; hap : 1 grise l'homologue de la mère
    // (une cellule haploïde) ; ori : 0 retire la légende « une orientation parmi deux » ; frz : la frise 2n → n → n ;
    // rc : 1 écrit en rouge les gamètes recombinés ; dbl : 1 imagine des gamètes à 2n chromosomes (l'énigme)
    p: { ph: 0, plq: 0, tet: 0, al: 0, or2: 0, gam: 0, co: 0, chi: 0, cnt: 0, mit: 0, kar: 0, esp: "ascaris4", fec: 0, fcnt: 0, zyg: 0,
      rg: 0, idm: 1, pt: 1, nlab: 1, hap: 0, ori: 1, frz: 0, rc: 0, dbl: 0 },
    build(g) {
      /* ===== mode division ===== */
      this.D = E("g", {}, g);
      this.ti = titre(this.D, "Méiose d’une cellule à 2*n* = 4", "");
      this.W = E("g", {}, this.D);
      this.cells = [0, 1, 2, 3].map(() => E("rect", { y: CELL_Y0, height: CELL_H, rx: 70, class: "cell" }, this.W));
      this.pl = [0, 1].map(() => ln(this.W, "k-dim", 1.6, { "stroke-dasharray": "6 6" }));
      this.tetR = [E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W), E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, this.W)];
      this.tetT = fx(this.W, 430, 205, "tétrade : 4 chromatides", "t-lab s-ink", "middle");
      // les huit chromatides : segments, centromère, étiquettes d'allèles
      this.ch = [];
      CHR.forEach((c) => [0, 1].forEach((ci) => {
        const k = c.pat ? "k-a" : "k-ink", gg = E("g", {}, this.W);
        const ob = { c, ci, k, L: c.big ? LG : LP, g: gg };
        ob.fl = ln(gg, k, WR); ob.up = ln(gg, k, WR); ob.sl = ln(gg, k, WR); ob.lo = ln(gg, k, WR); ob.lx = ln(gg, k, WR);
        ob.cen = E("circle", { r: 7, class: `s-bg ${k}`, "stroke-width": 3 }, gg);
        ob.lab = c.all.map(() => E("text", { class: "me-all s-ink", "text-anchor": "middle" }, gg));
        this.ch.push(ob);
      }));
      this.chi = E("g", {}, this.W);
      this.chiL = ln(this.chi, "k-ink", 1.8);
      this.chiT = fx(this.chi, 0, 0, "chiasma", "t-lab s-ink", "start");
      this.cnt = [0, 1, 2, 3].map(() => [0, 1, 2].map((i) => fx(this.W, 0, 584 + 32 * i, "", i === 2 ? "me-cnt s-ink" : "me-cnt s-dim", "middle")));
      this.gen = [0, 1, 2, 3].map(() => fx(this.W, 0, 548, "", "me-gen s-ink", "middle"));
      /* la vignette de mitose, à droite : les quatre chromosomes alignés un par un sur la plaque */
      this.MG = E("g", {}, this.D);
      E("rect", { x: 180, y: CELL_Y0, width: 640, height: CELL_H, rx: 70, class: "cell" }, this.MG);
      setL(ln(this.MG, "k-dim", 1.6, { "stroke-dasharray": "6 6" }), 500, 170, 500, 490);
      [["k-a", LG, 235], ["k-ink", LG, 295], ["k-a", LP, 365], ["k-ink", LP, 425]].forEach(([k, L, y]) => hrod(this.MG, 500, y, L, k));
      this.capM = fx(this.D, 260, 496, "méiose : par paires", "t-titre s-ink", "middle");
      this.capT = fx(this.D, 740, 496, "mitose : un par un", "t-titre s-ink", "middle");
      // la légende qui évite de croire à « toujours la même moitié », et la frise 2n → n → n
      this.oriT = fx(this.D, 500, 132, "une orientation parmi deux possibles", "t-sous", "middle");
      this.frz = E("g", {}, this.D);
      [[190, "départ : 2*n*", "t-lab s-ink"], [345, "division I →", "t-lab2 s-a"], [500, "*n*", "t-lab s-ink"], [655, "division II →", "t-lab s-dim"], [810, "*n*", "t-lab s-ink"]].forEach(([x, t, c]) => fx(this.frz, x, 132, t, c, "middle"));

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
      this.alK = []; this.mere = [];
      // une paire : l'homologue du père (rouge) à gauche, celui de la mère (encre) à droite ; `ecart` : demi-écart dans la paire
      const pair = (x, y, L, i, lab, ecart) => {
        const gp = ecart != null ? ecart : 0.1 * L + 14;
        vrod(K, x - gp, y, L, "k-a", 2, 7); this.mere.push(vrod(K, x + gp, y, L, "k-ink", 2, 7));
        if (lab) fx(K, x, y + L / 2 + 30, lab, "t-lab s-ink", "middle");
      };
      if (esp === "ascaris4") {
        const Ls = longueursPaires(esp, 150);
        [400, 600].forEach((x, i) => pair(x, 330, Ls[i], i, String(i + 1)));
        this.alPair = [400, 330, Ls[0]];
      } else if (esp === "droso8") {
        // pas de numéros d'autosomes : la nomenclature (X = chromosome 1, autosomes 2, 3, 4) n'est pas celle d'un rang de dessin
        const Ls = longueursPaires(esp, 156), xs = [200, 380, 560, 790];
        xs.forEach((x, i) => pair(x, 330, Ls[i], i, i < 3 ? "" : "XX"));
        fx(K, 380, 500, "3 paires d’autosomes", "t-sous", "middle");
        fx(K, 790, 500, "1 paire de gonosomes", "t-sous", "middle");
        this.alPair = [200, 330, Ls[0]];
      } else {
        const Ls = longueursPaires(esp, 96);
        for (let i = 0; i < e.n; i++) {
          // des paires groupées : 16 d'écart dans une paire, 78 d'une paire à l'autre
          const row = i < 12 ? 0 : 1, col = row ? i - 12 : i, x = 70 + col * 78, y = 210 + row * 175;
          if (i < e.auto) pair(x, y, Ls[i], i, String(i + 1), 11);
          else {
            // un homme : le X vient de sa mère (encre), le Y de son père (rouge)
            this.mere.push(vrod(K, x - 11, y, 76, "k-ink", 2, 7)); vrod(K, x + 11, y, 36, "k-a", 2, 7);
            fx(K, x, y + 38 + 30, "XY", "t-lab s-ink", "middle");
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
        [[px - gp, "k-a", "A", "s-ink", -1], [px + gp, "k-ink", "a", "s-ink", 1]].forEach(([x, k, t, st, d]) => {
          setL(ln(this.alG, k, 4), x - 12, yl, x + 12, yl);
          fx(this.alG, x + d * 38, yl + 10, t, `me-all ${st}`, "middle");
        });
        fx(this.alG, px - gp, py - L / 2 - 18, "père", "t-lab s-a", "middle");
        fx(this.alG, px + gp, py - L / 2 - 18, "mère", "t-lab s-ink", "middle");
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
      // les chromosomes : n par lot (2n si on imagine des gamètes à 2n, `dbl`) ; position séparée, puis position réunie
      this.fRod = [];
      const L = esp === "homme46" ? null : longueursPaires(esp, 96);
      const gros = esp === "homme46" ? 1 : 1.3;       // un lot d'Ascaris est petit : on le grossit
      for (let lot = 0; lot < 2; lot++) {
        for (let i = 0; i < (esp === "homme46" ? n : 2 * n); i++) {
          const k = lot ? "k-ink" : "k-a", gr = E("g", {}, F);
          const Li = esp === "homme46" ? 34 : L[i % n] * gros;
          vrod(gr, 0, 0, Li, k, 1, esp === "homme46" ? 7 : 10);
          const num = i < n ? fx(gr, 0, Li / 2 + 26, String(i + 1), "t-lab s-ink", "middle") : null;
          this.fRod.push({ gr, i, lot, num, Li });
        }
      }
      this.fQ = [340, 660].map((x) => fx(F, x, 478, "", "t-lab s-ink", "middle"));
      this.fQQ = [340, 660].map((x) => fx(F, x, 352, "?", "t-huge s-dim", "middle"));
      this.fZ = fx(F, 500, 600, "", "t-big2 s-ink", "middle");
    },
    render() {
      const p = this.p;
      if (p.esp !== this._esp) { this._esp = p.esp; this.buildKar(p.esp); this.buildFec(p.esp); }
      const fec = clamp(p.fec, 0, 1), kar = clamp(p.kar, 0, 1) * (1 - fec);
      show(this.D, (1 - kar) * (1 - fec)); show(this.K, kar); show(this.F, fec);
      if (fec < 1 - 1e-6 && kar < 1 - 1e-6) this.renderDiv();
      if (kar > 0) {
        show(this.alG, clamp(p.al, 0, 1)); show(this.nK, p.nlab);
        setFx(this.nK, p.hap > 0.5 ? `*n* = ${ESPECES[p.esp].n}` : `2*n* = ${ESPECES[p.esp].n2}`);
        this.mere.forEach((g) => (g.style.opacity = 1 - 0.7 * clamp(p.hap, 0, 1)));
      }
      if (fec > 0) this.renderFec();
    },
    renderDiv() {
      const p = this.p, ph = clamp(p.ph, 0, 8), o = p.or2, f1 = (v) => v.toFixed(1), rg = p.rg > 0.5;
      const ri = Math.round(ph), co = p.co, gx = clamp(co * 2, 0, 1), gy = clamp(co * 2 - 1, 0, 1), wT = clamp(1 - Math.abs(ph - 2), 0, 1);
      this.ti.set("Méiose d’une cellule à 2*n* = 4", SOUS[ri]);
      /* la vignette de mitose : la figure de méiose se réduit et passe à gauche (36 de marge de chaque côté) */
      const s = lerp(1, 0.7, p.mit);
      this.W.setAttribute("transform", `translate(${f1(lerp(0, -90, p.mit))} ${f1(330 * (1 - s))}) scale(${s.toFixed(3)})`);
      this.MG.setAttribute("transform", `translate(390 ${f1(330 * (1 - 0.7))}) scale(0.7)`);
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
      /* la légende « une orientation parmi deux », ou la frise 2n → n → n (au même endroit) */
      const fz = clamp(p.frz, 0, 1);
      show(this.frz, fz); show(this.oriT, clamp((ph - 3.5) * 2, 0, 1) * p.ori * (1 - p.mit) * (1 - fz));
      /* les chromatides */
      const pos = {};
      this.ch.forEach((ob) => { pos[ob.c.id + ob.ci] = interp(ph, ob.c, ob.ci, o, lerp, rg); });
      const W2 = (q, v, u) => [q.x + v * Math.cos(q.th) - u * Math.sin(q.th), q.y + v * Math.sin(q.th) + u * Math.cos(q.th)];
      // texte d'un locus : les deux chromatides qui se croisent échangent la partie droite de leur tige
      const crosser = (ob) => (ob.c.id === "G1" && ob.ci === 1) || (ob.c.id === "G2" && ob.ci === 0);
      const autre = (ob) => CHR[ob.c.id === "G1" ? 1 : 0];
      const textes = (ob) => ob.c.all.map((t, j) => (j === 1 && crosser(ob) && gy >= 0.5 ? { t: autre(ob).all[1], pat: autre(ob).pat } : { t, pat: ob.c.pat }));
      this.ch.forEach((ob) => {
        const q = pos[ob.c.id + ob.ci], h = ob.L / 2, vc = 0.1 * ob.L, dl = 0.3 * ob.L;
        const cr = crosser(ob), croise = cr && (gx > 0 || gy > 0), du = cr ? (ob.c.id === "G1" ? SP : -SP) * gx * wT : 0;
        const [x0, y0] = W2(q, -h, 0), [x1, y1] = W2(q, vc, 0), [x2, y2] = W2(q, vc + dl, du), [x3, y3] = W2(q, h, du), [x4, y4] = W2(q, h, 0);
        const op = q.op * (ob.c.big ? 1 : p.pt);
        if (!croise) {
          // une seule tige, d'un trait : pas de raccord visible
          setL(ob.fl, x0, y0, x4, y4); ob.fl.style.opacity = op;
          [ob.up, ob.sl, ob.lo, ob.lx].forEach((l) => (l.style.opacity = 0));
        } else {
          ob.fl.style.opacity = 0;
          setL(ob.up, x0, y0, x1, y1); setL(ob.sl, x1, y1, x2, y2); setL(ob.lo, x2, y2, x3, y3); setL(ob.lx, x1, y1, x4, y4);
          ob.lx.setAttribute("class", autre(ob).pat ? "k-a" : "k-ink");
          ob.up.style.opacity = op; ob.sl.style.opacity = op * (1 - gy); ob.lo.style.opacity = op * (1 - gy); ob.lx.style.opacity = op * gy;
        }
        ob.cen.setAttribute("cx", f1(q.x)); ob.cen.setAttribute("cy", f1(q.y)); ob.cen.style.opacity = op;
        ob.q = q;
      });
      // les étiquettes d'allèles (une ou deux par chromatide) : au-dessus de la tige, et, dans la tétrade, en colonne à gauche
      this.ch.forEach((ob) => {
        const q = ob.q, T = textes(ob), cr = crosser(ob);
        const partenaire = this.ch.find((x) => x.c === ob.c && x.ci !== ob.ci), Tp = textes(partenaire);
        const gap = Math.hypot(q.x - partenaire.q.x, q.y - partenaire.q.y);
        ob.c.all.forEach((_, j) => {
          const t = ob.lab[j], vloc = ob.c.big ? (j ? 0.38 : -0.34) * ob.L : -0.28 * ob.L;
          // le 2ᵉ locus d'un croiseur reste attaché à la partie droite de sa tige tant que le croisement dure (hors tétrade)
          const duL = j === 1 && cr && gy < 0.5 ? (ob.c.id === "G1" ? SP : -SP) * gx * wT * (1 - wT) : 0;
          let [lx, ly] = W2(q, vloc, duL);
          // le côté de l'étiquette : du côté où sa chromatide s'écarte de l'autre (en haut si elle est seule)
          const d = clamp((vloc * q.th) / (Math.abs(vloc) * PHI), -1, 1), bas = clamp((d - 0.1) / 0.4, 0, 1);
          const yb = ly + lerp(lerp(-11, 32, bas), 10.5, wT);
          const colX = ob.c.big ? TEX.G[0] - LG / 2 - 74 + 36 * j : TEX.P[0] - LP / 2 - 36;
          lx = lerp(lx, colX, wT);
          t.setAttribute("x", f1(lx)); t.setAttribute("y", f1(yb));
          t.textContent = T[j].t;
          // la 2ᵉ chromatide n'écrit pas l'allèle de la 1ʳᵉ quand elles sont confondues (sauf si `idm` vaut 0)
          const idem = p.idm > 0.5 && ob.ci && T[j].t === Tp[j].t;
          const niveau = j === 0 ? clamp(p.al, 0, 1) : clamp(p.al - 1, 0, 1);
          t.style.opacity = niveau * q.op * (ob.c.big ? 1 : p.pt) * (idem ? clamp((gap - 4) / 8, 0, 1) : 1);
        });
      });
      /* les contours de tétrade et leur étiquette */
      const wt = wT * p.tet;
      [[TEX.G, LG], [TEX.P, LP]].forEach(([c, L], i) => {
        const r = this.tetR[i], w = L + 24, hgt = 3 * SP + 2 * WR + 20;
        r.setAttribute("x", f1(c[0] - w / 2)); r.setAttribute("y", f1(c[1] - hgt / 2)); r.setAttribute("width", f1(w)); r.setAttribute("height", f1(hgt)); r.style.opacity = wt * (i ? p.pt : 1);
      });
      this.tetT.setAttribute("y", f1(TEX.G[1] - (3 * SP + 2 * WR + 20) / 2 - 12)); show(this.tetT, wt);
      /* le chiasma : l'étiquette et son trait, du croisement au bord de la tétrade */
      const cx0 = TEX.G[0] + 0.25 * LG, cy0 = TEX.G[1];
      setL(this.chiL, cx0 + 6, cy0, TEX.G[0] + LG / 2 + 24, cy0);
      this.chiT.setAttribute("x", f1(TEX.G[0] + LG / 2 + 30)); this.chiT.setAttribute("y", f1(cy0 + 7));
      show(this.chi, p.chi * wT * clamp(gx * 3, 0, 1) * (1 - gy));
      /* le compteur sous chaque cellule, et le génotype des gamètes */
      const L3 = lignesCompteur(ph);
      const niv = p.al > 1.5 ? 2 : 1, G = gametes(Math.round(o), co > 0.75 ? 1 : 0, niv), ordre = [0, 2, 1, 3];
      const recomb = gametes(0, 1, 2).map((g, i) => g.split(" ")[0] !== gametes(0, 0, 2)[i].split(" ")[0]);
      cc.forEach((c, i) => {
        this.cnt[i].forEach((t, j) => { t.setAttribute("x", f1(c.x)); setFx(t, L3[j]); t.style.opacity = p.cnt * c.op * (1 - p.mit); });
      });
      ordre.forEach((ci, i) => {
        const t = this.gen[i]; t.setAttribute("x", f1(cc[ci].x)); setFx(t, G[i]);
        t.setAttribute("class", `me-gen ${p.rc > 0.5 && co > 0.75 && recomb[i] ? "s-a" : "s-ink"}`);
        t.style.opacity = p.gam * clamp((ph - 7.6) / 0.4, 0, 1);
      });
    },
    renderFec() {
      const p = this.p, n = ESPECES[p.esp].n, e = ESPECES[p.esp], z = clamp(p.zyg, 0, 1), c = clamp(p.fcnt, 0, 1), d = e.n2 > 40 ? 0 : clamp(p.dbl, 0, 1);
      const visibles = [0, 0], m = n * (1 + d), hom = p.esp === "homme46";
      this.fRod.forEach((r) => {
        let sx, sy, ux, uy;
        if (hom) {
          const cc = r.i % 6, rr = Math.floor(r.i / 6);
          sx = (r.lot ? 660 : 340) + (cc - 2.5) * 32; sy = 340 + (rr - 1.5) * 46;
          ux = (r.lot ? 590 : 410) + (cc - 2.5) * 26; uy = sy;
        } else {
          sx = (r.lot ? 660 : 340) + (r.i - (m - 1) / 2) * lerp(62, 46, d); sy = 340;
          ux = lerp(440 + r.i * 100 + r.lot * 40, 500 + (2 * r.i + r.lot - (2 * m - 1) / 2) * 56, d); uy = 340;
        }
        const x = lerp(sx, ux, z), y = lerp(sy, uy, z);
        const o = r.i < n ? clamp(c * n - r.i, 0, 1) : d * (c > 0 ? 1 : 0);
        r.gr.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`); r.gr.style.opacity = o;
        if (r.num) r.num.style.opacity = (1 - z) * (n > 6 || d > 0 ? 0 : 1);
        if (o >= 1) visibles[r.lot]++;
      });
      show(this.fNoy, 1 - z);
      this.fQ.forEach((t, j) => { setFx(t, visibles[j] ? `${visibles[j]} chromosome${visibles[j] > 1 ? "s" : ""}` : "chromosomes cachés"); t.style.opacity = (1 - z); });
      this.fQQ.forEach((t) => { t.style.opacity = (1 - z) * (c > 0 ? 0 : 1); });
      setFx(this.fZ, d > 0.5 ? `l’œuf : ${2 * e.n2} chromosomes` : `cellule-œuf : 2*n* = ${e.n2} chromosomes`); show(this.fZ, clamp(z * 2 - 1, 0, 1));
    },
  });
}
