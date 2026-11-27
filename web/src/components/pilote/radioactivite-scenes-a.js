/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « décroissance radioactive » (V3), première partie : l'atome et
 * l'écriture de son noyau (ce qu'il faut savoir), la plaque de Becquerel et
 * l'énigme, les désintégrations α, β⁻, β⁺ et γ.
 *
 * Chaque scène est un jeu de paramètres interpolés par le noyau (`noyau.js`).
 * Règles V3 : un titre t-titre / t-sous, au plus trois tailles de texte
 * (16, 18, 26), au plus deux objets rouges, aucun exposant Unicode (les
 * exposants sont des tspan décalés : `fx`).
 */
import { T_THORON, DEPUIS } from "./radioactivite-outils";

export function scenesA(ctx, O) {
const { E, lerp, clamp, show, scene } = ctx;
const { fx, setFx, titre, noyau, symb } = O;

/* ---------- la plaque de Becquerel ---------- */
const LAM = ["350,250 420,236 478,262 470,318 404,334 356,306", "520,330 590,318 642,346 628,402 560,414 514,380", "560,226 612,220 630,258 594,280 552,264"];
scene("plaque", {
  p: { drawer: 0, dev: 0, src: 0 },
  build(g) {
    this.ti = titre(g, "La plaque de Becquerel", "");
    this.sun = E("g", {}, g);
    E("circle", { cx: 860, cy: 170, r: 30, class: "k-dim nofill", "stroke-width": 3 }, this.sun);
    for (let j = 0; j < 8; j++) { const a = (j * Math.PI) / 4; E("line", { x1: 860 + 42 * Math.cos(a), y1: 170 + 42 * Math.sin(a), x2: 860 + 58 * Math.cos(a), y2: 170 + 58 * Math.sin(a), class: "k-dim", "stroke-width": 3, "stroke-linecap": "round" }, this.sun); }
    E("rect", { x: 270, y: 170, width: 460, height: 320, rx: 4, class: "cell" }, g);
    // papier noir, lamelles claires, plaque développée claire à silhouettes noires — dans les deux thèmes
    this.paper = E("rect", { x: 290, y: 190, width: 420, height: 280, class: "paper" }, g);
    this.lam = E("g", {}, g); LAM.forEach((pts) => E("polygon", { points: pts, class: "lam" }, this.lam));
    this.dv = E("g", {}, g);
    E("rect", { x: 290, y: 190, width: 420, height: 280, class: "plate" }, this.dv);
    LAM.forEach((pts) => { E("polygon", { points: pts, class: "sil-flou" }, this.dv); E("polygon", { points: pts, class: "sil" }, this.dv); });
    this.labA = E("g", {}, g);
    fx(this.labA, 500, 528, "une plaque photographique, enveloppée de papier noir", "t-sous", "middle");
    E("line", { x1: 640, y1: 372, x2: 752, y2: 412, class: "k-dim", "stroke-width": 1.5 }, this.labA);
    fx(this.labA, 758, 418, "lamelles d’un", "t-lab s-ink");
    fx(this.labA, 758, 442, "sel d’uranium", "t-lab s-ink");
    this.labB = fx(g, 500, 524, "la même plaque, développée le 1^{er} mars", "t-sous", "middle");
    this.dr = E("g", {}, g);
    E("rect", { x: 240, y: 150, width: 520, height: 360, rx: 4, class: "rulebody" }, this.dr);
    E("rect", { x: 440, y: 282, width: 120, height: 22, rx: 3, class: "cell" }, this.dr);
    fx(this.dr, 500, 378, "dans le tiroir d’un meuble", "rd-fort s-ink", "middle");
    fx(this.dr, 500, 406, "du 26 février au 1^{er} mars 1896", "t-sous", "middle");
    this.q = E("g", {}, g);
    fx(this.q, 500, 566, "« Les silhouettes apparurent, au contraire, avec une grande intensité. »", "rd-fort s-ink", "middle");
    fx(this.q, 500, 592, "Henri Becquerel, Comptes rendus de l’Académie des sciences, 2 mars 1896", "t-sous", "middle");
    this.rays = E("g", {}, g);
    [[414, 286, 40, 32], [578, 366, 46, 34], [592, 251, 28, 22]].forEach(([cx, cy, rx, ry]) => { for (let j = 0; j < 6; j++) { const a = (j * Math.PI) / 3 + 0.35, c = Math.cos(a), s = Math.sin(a); E("line", { x1: cx + rx * c, y1: cy + ry * s, x2: cx + (rx + 26) * c, y2: cy + (ry + 22) * s, class: "k-a", "stroke-width": 2.5, "marker-end": "url(#rarwA)" }, this.rays); } });
    this.srcT = fx(g, 500, 640, "Sans soleil, le sel d’uranium émet tout seul", "t-cle s-a", "middle");
  },
  render() {
    const p = this.p, dark = Math.max(p.drawer, p.dev);
    show(this.sun, (1 - 0.8 * dark) * (1 - p.src));
    show(this.paper, 1 - p.dev); show(this.lam, 1 - p.dev); show(this.dv, p.dev);
    show(this.labA, (1 - p.drawer) * (1 - p.dev)); show(this.labB, p.dev);
    show(this.dr, p.drawer); this.dr.setAttribute("transform", `translate(0 ${((1 - p.drawer) * -24).toFixed(1)})`);
    show(this.q, p.dev); show(this.rays, p.src); show(this.srcT, p.src);
    this.ti.set("La plaque de Becquerel", p.drawer > 0.5 ? "plus de soleil : les plaques attendent dans le noir" : p.dev > 0.5 ? "développée sans avoir revu le soleil" : "février 1896");
  },
});

/* ---------- l'énigme : le gaz de Rutherford, le sel de Becquerel ---------- */
scene("enigme", {
  p: { thor: 0, ura: 0, rep: 0 },
  build(g) {
    const B0 = 470, H = 260;
    const panneau = (x0, t, s, barres, cap, rep) => {
      const pg = E("g", {}, g);
      fx(pg, x0 + 190, 150, t, "t-titre s-ink", "middle");
      fx(pg, x0 + 190, 176, s, "t-sous", "middle");
      E("line", { x1: x0 + 20, x2: x0 + 360, y1: B0, y2: B0, class: "k-dim", "stroke-width": 1.5 }, pg);
      const bars = barres.map(([lab, v], j) => {
        const n = barres.length, w = n > 2 ? 58 : 90, gap = (340 - n * w) / (n + 1), x = x0 + 20 + gap + j * (w + gap);
        const bg = E("g", {}, pg);
        E("rect", { x, y: B0 - H * v, width: w, height: H * v, class: "f-b k-ink", "stroke-width": 1.5 }, bg);
        fx(bg, x + w / 2, B0 + 26, lab, "t-sous", "middle");
        return bg;
      });
      const capT = fx(pg, x0 + 190, 540, cap, "rd-fort s-ink", "middle");
      const repT = fx(pg, x0 + 190, 540, rep, "rd-fort s-a", "middle");
      return { g: pg, bars, capT, repT };
    };
    this.th = panneau(60, "Le gaz du thorium", "Rutherford, 1900 · son rayonnement", [["0 min", 1], ["1 min", 0.5], ["2 min", 0.25], ["3 min", 0.125]], "la moitié en une minute environ", `demi-vie : ${Math.round(T_THORON)} s`);
    this.ur = panneau(540, "Le sel d’uranium", "Becquerel, 1896 · son rayonnement", [["1896", 1], ["aujourd’hui", 1]], `toujours autant, ${DEPUIS} ans plus tard`, "demi-vie : 4,5 milliards d’années");
    this.cle = fx(g, 500, 610, "Chaque sorte de noyau a sa demi-vie.", "t-cle s-ink", "middle");
    this.ti = titre(g, "L’énigme", "");
  },
  render() {
    const p = this.p;
    show(this.th.g, p.thor); this.th.bars.forEach((b, j) => show(b, clamp(p.thor * 4 - j, 0, 1)));
    show(this.ur.g, p.ura); this.ur.bars.forEach((b, j) => show(b, clamp(p.ura * 2 - j, 0, 1)));
    show(this.th.capT, 1 - p.rep); show(this.ur.capT, 1 - p.rep); show(this.th.repT, p.rep); show(this.ur.repT, p.rep); show(this.cle, p.rep);
    this.ti.set(p.rep > 0.5 ? "La réponse" : "L’énigme", p.rep > 0.5 ? "deux sortes de noyaux, deux horloges" : "pourquoi l’un s’éteint-il en quelques minutes, et pas l’autre ?");
  },
});

/* ---------- l'atome, son noyau, son symbole, les isotopes, la désintégration β⁻ ---------- */
scene("atome", {
  p: { atom: 0, zoom: 0, q: 0, nota: 0, iso: 0, emit: 0, c14: 0 },
  build(g) {
    const CX = 500, CY = 380; this.CX = CX; this.CY = CY;
    this.ti = titre(g, "", "");
    // le cortège d'électrons : 2 sur la première couche, 4 sur la seconde
    this.ag = E("g", {}, g);
    [92, 170].forEach((r) => E("circle", { cx: CX, cy: CY, r, class: "k-line nofill", "stroke-width": 2 }, this.ag));
    [[92, 0.3], [92, 0.3 + Math.PI], [170, 0.9], [170, 0.9 + Math.PI / 2], [170, 0.9 + Math.PI], [170, 0.9 + 1.5 * Math.PI]].forEach(([r, a]) => E("circle", { cx: (CX + r * Math.cos(a)).toFixed(1), cy: (CY + r * Math.sin(a)).toFixed(1), r: 9, class: "elec" }, this.ag));
    E("line", { x1: CX - 60, y1: CY - 52, x2: CX - 12, y2: CY - 8, class: "k-dim", "stroke-width": 1.5 }, this.ag);
    fx(this.ag, CX - 66, CY - 58, "noyau", "rd-fort s-ink", "end");
    E("line", { x1: CX + 105, y1: CY + 133, x2: CX + 160, y2: CY + 170, class: "k-dim", "stroke-width": 1.5 }, this.ag);
    fx(this.ag, CX + 166, CY + 186, "électrons", "rd-fort s-ink");
    // pour la question d'entrée : le symbole, à côté de l'atome
    this.qg = E("g", {}, g);
    symb(this.qg, 790, CY + 10, 14, 6, "C");
    // le noyau du carbone 14 : 6 protons + 8 neutrons, dessiné en grand puis réduit à l'échelle de l'atome
    this.ng = E("g", {}, g);
    this.parts = noyau(this.ng, CX, CY, 104, 6, 8, 24.5);
    this.jn = (() => { let b = -1, bx = -1e9; this.parts.forEach((q, i) => { if (!q.p && q.x > bx) { bx = q.x; b = i; } }); return b; })();
    this.ring = E("circle", { cx: this.parts[this.jn].x.toFixed(1), cy: this.parts[this.jn].y.toFixed(1), r: 36, class: "k-a nofill", "stroke-width": 3 }, g);
    this.trail = E("line", { class: "k-a", "stroke-width": 2.5, "stroke-dasharray": "3 7", "stroke-linecap": "round" }, g);
    this.elec = E("circle", { r: 10, class: "s-a" }, g);
    this.labFlip = fx(g, CX, 536, "un neutron devient un proton", "t-lab s-ink", "middle");
    this.labElec = fx(g, 960, 262, "particule β^{−} : un électron", "rd-fort s-ink", "end");
    this.leg = E("g", {}, g);
    E("circle", { cx: 200, cy: 640, r: 12, class: "prot", "stroke-width": 1.6 }, this.leg); fx(this.leg, 222, 646, "proton : charge +", "t-lab s-ink");
    E("circle", { cx: 520, cy: 640, r: 12, class: "neut", "stroke-width": 1.6 }, this.leg); fx(this.leg, 542, 646, "neutron : sans charge", "t-lab s-ink");
    // le symbole : la ligne du carbone 14 (le noyau glisse à sa place), puis celle du carbone 12
    const ligne = (y, A, N) => {
      const lg = E("g", {}, g);
      symb(lg, 520, y + 12, A, 6, "C");
      fx(lg, 600, y - 12, `*A* = ${A} : le nombre de nucléons`, "t-lab s-ink");
      fx(lg, 600, y + 16, "*Z* = 6 : le nombre de protons", "t-lab s-ink");
      fx(lg, 600, y + 44, `*N* = *A* − *Z* = ${N} neutrons`, "t-lab s-ink");
      fx(lg, 250, y + 104, `carbone ${A}`, "rd-fort s-ink", "middle");
      return lg;
    };
    this.l14 = ligne(240, 14, 8);
    this.l12 = ligne(470, 12, 6);
    this.n12 = E("g", {}, g); noyau(this.n12, 250, 470, 73, 6, 6, 17);
    this.isoT = fx(g, 500, 652, "même *Z*, *A* différent : deux isotopes du carbone", "rd-fort s-a", "middle");
  },
  render() {
    const p = this.p, CX = this.CX, CY = this.CY, z = ctx.ease(clamp(p.zoom, 0, 1)), n = ctx.ease(clamp(p.nota, 0, 1));
    const s0 = lerp(0.135, 1, z), s = lerp(s0, 0.7, n), cx = lerp(CX, 250, n), cy = lerp(CY, 240, n), e = p.emit;
    show(this.ag, p.atom * (1 - z)); show(this.qg, p.q * (1 - z));
    this.ng.setAttribute("transform", `translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${s.toFixed(3)}) translate(${-CX} ${-CY})`);
    const sw = (2.2 / s).toFixed(2), flip = e >= 0.5;
    this.parts.forEach((q, i) => { q.c.setAttribute("stroke-width", sw); q.c.setAttribute("class", q.p || (i === this.jn && flip) ? "prot" : "neut"); });
    show(this.ng, Math.max(p.atom, z));
    // l'émission : le neutron s'entoure, devient proton, puis l'électron part
    show(this.ring, clamp(e * 5, 0, 1) * (1 - clamp((e - 0.5) * 5, 0, 1)) * z);
    const t = ctx.ease(clamp((e - 0.5) * 2, 0, 1)), q = this.parts[this.jn], ex = lerp(q.x, 920, t), ey = lerp(q.y, 300, t);
    this.elec.setAttribute("cx", ex.toFixed(1)); this.elec.setAttribute("cy", ey.toFixed(1));
    this.trail.setAttribute("x1", q.x.toFixed(1)); this.trail.setAttribute("y1", q.y.toFixed(1)); this.trail.setAttribute("x2", ex.toFixed(1)); this.trail.setAttribute("y2", ey.toFixed(1));
    show(this.elec, e > 0.5 ? 1 : 0); show(this.trail, clamp((e - 0.5) * 4, 0, 1));
    show(this.labFlip, (flip ? 1 : 0) * z); show(this.labElec, clamp((e - 0.8) * 5, 0, 1));
    show(this.leg, z * (1 - n));
    show(this.l14, n); show(this.l12, p.iso); show(this.n12, p.iso); show(this.isoT, p.iso);
    let a, b;
    if (p.iso > 0.5) { a = "Deux isotopes du carbone"; b = "même nombre de protons, pas le même nombre de neutrons"; }
    else if (n > 0.5) { a = "L’écriture d’un noyau"; b = "le symbole de l’élément, avec deux nombres"; }
    else if (e > 0.75) { a = "Il est devenu un noyau d’azote 14"; b = "7 protons et 7 neutrons : un autre élément"; }
    else if (e > 0) { a = "Le carbone 14 se désintègre"; b = "un de ses neutrons se change en proton…"; }
    else if (p.c14 > 0.5) { a = "Un noyau instable : le carbone 14"; b = "6 protons et 8 neutrons ; l’un des neutrons va changer"; }
    else if (z > 0.5) { a = "Son noyau : 14 nucléons"; b = "6 protons et 8 neutrons, serrés les uns contre les autres"; }
    else if (p.q > 0.5) { a = "Un atome de carbone 14"; b = "que contient son noyau ?"; }
    else { a = "Un atome de carbone"; b = "un noyau minuscule au centre, des électrons autour"; }
    this.ti.set(a, b);
  },
});

/* ---------- les désintégrations : noyau père → noyau fils + particule ---------- */
const CAS = [
  { t: "Le carbone 14 : une désintégration β^{−}", s: "noyau père → noyau fils + particule", pere: ["carbone 14", 14, 6], fils: ["azote 14", 14, 7], part: ["bm", "particule β^{−} : électron", 0, -1] },
  { t: "L’uranium 238 émet une particule α", s: "α : un noyau d’hélium, 2 protons et 2 neutrons", pere: ["uranium 238", 238, 92], fils: ["thorium 234", 234, 90], part: ["al", "particule α", 4, 2] },
  { t: "Le fluor 18 émet un positon", s: "le positon : comme un électron, mais de charge +1", pere: ["fluor 18", 18, 9], fils: ["oxygène 18", 18, 8], part: ["bp", "particule β^{+} : positon", 0, "+1"] },
  { t: "L’iridium 192 : β^{−}, puis un rayonnement γ", s: "le noyau fils se débarrasse d’un excès d’énergie", pere: ["iridium 192", 192, 77], fils: ["platine 192", 192, 78], part: ["bm", "particule β^{−}", 0, -1], gamma: true },
  { t: "Le plutonium 238 : une désintégration α", s: "le stimulateur cardiaque du sujet 2021", pere: ["plutonium 238", 238, 94], fils: ["uranium 234", 234, 92], part: ["al", "particule α", 4, 2] },
];
const AZ = (A, Z) => `*A* = ${A} · *Z* = ${String(Z).replace("-", "−")}`;
scene("desint", {
  p: { ty: 0, rv: 1 },
  build(g) {
    this.ti = titre(g, "", "");
    const gros = (parent, cx, cy, A, Z) => (A <= 20 ? noyau(parent, cx, cy, 16 + 13 * Math.sqrt(A), Z, A - Z, 12.5) : noyau(parent, cx, cy, 92, Math.round((60 * Z) / A), 60 - Math.round((60 * Z) / A), 10.5));
    this.cas = CAS.map((c) => {
      const cg = E("g", {}, g), PX = 200, FX = 560, QX = 830, Y = 330;
      gros(cg, PX, Y, c.pere[1], c.pere[2]);
      fx(cg, PX, 470, c.pere[0], "rd-fort s-ink", "middle"); fx(cg, PX, 498, AZ(c.pere[1], c.pere[2]), "t-lab s-ink", "middle");
      E("line", { x1: 318, x2: 432, y1: Y, y2: Y, class: "k-dim", "stroke-width": 2.5, "marker-end": "url(#rarw)" }, cg);
      const fg = E("g", {}, cg);
      gros(fg, FX, Y, c.fils[1], c.fils[2]);
      fx(fg, FX, 470, c.fils[0], "rd-fort s-ink", "middle"); fx(fg, FX, 498, AZ(c.fils[1], c.fils[2]), "t-lab s-ink", "middle");
      const inc = E("g", {}, cg);
      E("circle", { cx: FX, cy: Y, r: 80, class: "k-dim nofill", "stroke-width": 2, "stroke-dasharray": "6 6" }, inc);
      fx(inc, FX, Y + 9, "?", "t-cle s-dim", "middle");
      fx(inc, FX, 470, "noyau fils", "rd-fort s-ink", "middle"); fx(inc, FX, 498, AZ("?", "?"), "t-lab s-ink", "middle");
      fx(cg, 700, Y + 9, "+", "t-cle s-ink", "middle");
      // la particule : le seul objet rouge (avec le rayonnement γ)
      const pg = E("g", {}, cg), [k, nom, A, Z] = c.part;
      if (k === "al") { E("circle", { cx: QX, cy: Y, r: 34, class: "k-a nofill", "stroke-width": 3 }, pg); noyau(pg, QX, Y, 13, 2, 2, 10); }
      else { E("circle", { cx: QX, cy: Y, r: 14, class: k === "bm" ? "s-a" : "k-a nofill", "stroke-width": 3 }, pg); fx(pg, QX, Y + 6, k === "bm" ? "−" : "+", "rd-fort " + (k === "bm" ? "s-bg sans-halo" : "s-a"), "middle"); }
      fx(cg, QX, 470, nom, "rd-fort s-ink", "middle"); fx(cg, QX, 498, AZ(A, Z), "t-lab s-ink", "middle");
      if (c.gamma) {
        let d = "M610 290"; for (let i = 1; i <= 14; i++) d += `Q${610 + 20 * i - 10} ${290 - 8 * i + (i % 2 ? -14 : 14)} ${610 + 20 * i} ${290 - 8 * i}`;
        E("path", { d, class: "k-a nofill", "stroke-width": 2.5 }, fg);
        fx(fg, 900, 160, "rayonnement γ : ni masse, ni charge", "rd-fort s-ink", "end");
      }
      return { g: cg, fg, inc };
    });
  },
  render() {
    const p = this.p, i0 = Math.round(p.ty);
    this.cas.forEach((c, i) => { show(c.g, clamp(1 - Math.abs(p.ty - i) * 2, 0, 1)); show(c.fg, p.rv); show(c.inc, 1 - p.rv); });
    const c = CAS[clamp(i0, 0, CAS.length - 1)];
    this.ti.set(c.t, c.s);
  },
});
}
