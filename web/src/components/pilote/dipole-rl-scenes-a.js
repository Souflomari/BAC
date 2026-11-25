/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RL » (V3), première partie : le schéma du montage, `circuit` (copie adaptée
 * du `circuit` de la leçon sur le dipôle RC : la bobine remplace le condensateur ; deux jeux nouveaux,
 * `lampes` et `henry`, décision du propriétaire).
 *
 * Un schéma de circuit : une boucle rectangulaire (générateur, interrupteur K à deux positions,
 * conducteur ohmique, bobine), les flèches de tension et de courant, des lignes de champ dans la
 * bobine (leur nombre suit i), un branchement d'oscilloscope. Trois dessins ne sont pas cette boucle :
 * une bobine seule, les deux lampes en parallèle, l'expérience de Henry.
 *
 * Conventions de la leçon, tenues partout : i entre par le haut de la bobine (flèche vers le bas) ;
 * u_L, flèche vers le haut, opposée à i (convention récepteur) ; u_R = R·i, flèche opposée à i ;
 * E vers le haut, à gauche. K en (1) : le générateur est dans la maille ; K en (2) : il en sort.
 *
 * Paramètres :
 *   jeu    'rl' (la boucle) | 'bobine' (une bobine seule) | 'oscillo' | 'lampes' | 'henry'
 *   K      0 ouvert · 1 position (1) · 2 position (2) : le levier pivote (nombre, animé) ; 'lampes' : 0 ou 1
 *   t      0 → 1 : le temps réduit t/(5τ) de la phase en cours ; règle i, les lignes de champ et l'éclat des lampes
 *          (établissement si K = 1 : i/I₀ = 1 − e^{−5t} ; rupture si K = 2 : i/I₀ = e^{−5t})
 *   fi fu fr fe   les flèches i, u_L, u_R, E (0 ou 1), avec leur étiquette
 *   fa     la flèche mise en évidence, en accent : 'i' | 'uL' | 'uR' | 'E' | ''
 *   ch     les lignes de champ dans la bobine : 0 aucune, 1 oui (leur nombre suit i)
 *   osc    le branchement d'oscilloscope : la voie Y₁ de l'autre côté de R, la masse entre R et la bobine
 *   rv     'henry' : 0 le fil hors du mercure, 1 il plonge (contact), 2 on le retire (rupture, étincelle)
 *   sub    un sous-titre imposé (sinon celui du jeu)
 * Couleurs : des classes seulement (k-ink, k-a, k-dim, s-ink, s-a, s-dim, s-bg, f-a, f-c).
 */
import { E_V, R_OHM, R_BOB, L_H, fr } from "./dipole-rl-outils";

export function scenesA(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab } = O;

/* ---------- la géométrie : tout est calculé ici, rien n'est posé à l'œil ---------- */
const XL = 130, XR = 780, YT = 210, YB = 530;            // la boucle : rails gauche et droit, fil du haut, fil du bas
const PV = { x: 470, y: YT };                             // le pivot de l'interrupteur
const LEV = 100, DY = 40, DX = Math.sqrt(LEV * LEV - DY * DY);
const C1 = { x: PV.x - DX, y: YT - DY }, C2 = { x: PV.x - DX, y: YT + DY };   // les bornes (1) et (2)
const X2 = 260;                                           // le fil de la borne (2) rejoint le fil du bas ici
const RX0 = 520, RX1 = 640, RH = 40;                      // le conducteur ohmique
const GY = (YT + YB) / 2 - 10, GR = 36;                   // le générateur : centre et rayon
const BY0 = 300, BTURNS = 6, BPITCH = 26, BRX = 36, BRY = 10;   // la bobine : haut, spires, pas, demi-largeur, perspective
const BY1 = BY0 + BTURNS * BPITCH;                        // le bas de la bobine
const NLIG = 4;                                           // les lignes de champ, au plus
const ANG = Math.atan2(DY, DX);                           // l'angle du levier

const line = (parent, x1, y1, x2, y2, cls = "k-ink", w = 3.5, extra = {}) => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const poly = (parent, pts, cls = "k-ink", w = 3.5) => E("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), class: cls + " nofill", "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
/** une bobine : une hélice vue de côté, axe vertical, le fil entre et sort au centre ; la moitié arrière est discrète */
function helice(parent, cx, y0, turns, pitch, rx, ry, wf = 4.5, wb = 2.5) {
  const n = Math.round(turns * 28), pts = [];
  for (let k = 0; k <= n; k++) { const th = Math.PI / 2 + (2 * Math.PI * turns * k) / n; pts.push([cx + rx * Math.cos(th), y0 + pitch * turns * k / n + ry * (Math.sin(th) - 1), Math.sin(th)]); }
  let df = "", db = "";
  for (let k = 1; k <= n; k++) {
    const a = pts[k - 1], b = pts[k], seg = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    if (a[2] + b[2] >= 0) df += seg; else db += seg;
  }
  const g = E("g", {}, parent);
  E("path", { d: db, class: "k-dim nofill", "stroke-width": wb, "stroke-linecap": "round" }, g);
  E("path", { d: df, class: "k-ink nofill", "stroke-width": wf, "stroke-linecap": "round" }, g);
  return g;
}
/** une flèche (trait + pointe), en encre ou en accent */
function fleche(parent, x1, y1, x2, y2) {
  return line(parent, x1, y1, x2, y2, "k-ink", 4.5, { "marker-end": "url(#rlarw)" });
}
function accent(l, on) {
  l.setAttribute("class", on ? "k-a" : "k-ink");
  l.setAttribute("marker-end", on ? "url(#rlarwA)" : "url(#rlarw)");
}
/** la masse : un trait, puis trois barres */
function masse(parent, x, y) {
  line(parent, x, y, x + 46, y, "k-ink", 3);
  [[30, 0], [20, 12], [10, 24]].forEach(([h, dx]) => line(parent, x + 46 + dx, y - h, x + 46 + dx, y + h, "k-ink", 3));
}
/** une lampe : cercle barré d'une croix, un halo et des rayons qui suivent l'éclat */
function lampe(parent, x, y, r) {
  const g = E("g", {}, parent);
  const halo = E("circle", { cx: x, cy: y, r, class: "s-a" }, g);
  const rays = Array.from({ length: 8 }, (_, j) => { const a = (j * Math.PI) / 4 + Math.PI / 8; return line(g, x + (r + 10) * Math.cos(a), y + (r + 10) * Math.sin(a), x + (r + 32) * Math.cos(a), y + (r + 32) * Math.sin(a), "k-a", 4); });
  E("circle", { cx: x, cy: y, r, class: "s-bg k-ink", "stroke-width": 3.5 }, g);
  const d = r * Math.SQRT1_2;
  line(g, x - d, y - d, x + d, y + d, "k-ink", 3); line(g, x - d, y + d, x + d, y - d, "k-ink", 3);
  return { g, halo, rays, r, set(b) { halo.setAttribute("r", (r + 30 * b).toFixed(1)); halo.style.opacity = (0.5 * b).toFixed(3); rays.forEach((ra) => (ra.style.opacity = clamp(b * 1.4 - 0.1, 0, 1).toFixed(3))); } };
}

scene("circuit", {
  p: { jeu: "rl", K: 1, t: 0, fi: 0, fu: 0, fr: 0, fe: 0, fa: "", ch: 1, osc: 0, rv: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");

    /* ----- la boucle ----- */
    const L = this.L = E("g", {}, g);
    poly(L, [[C1.x, C1.y], [XL, C1.y], [XL, GY - GR]]);
    poly(L, [[XL, GY + GR], [XL, YB], [XR, YB]]);
    poly(L, [[C2.x, C2.y], [X2, C2.y], [X2, YB]]);
    E("circle", { cx: X2, cy: YB, r: 5.5, class: "s-ink" }, L);
    poly(L, [[PV.x, PV.y], [RX0, YT]]);
    poly(L, [[RX1, YT], [XR, YT], [XR, BY0]]);
    poly(L, [[XR, BY1], [XR, YB]]);
    E("rect", { x: RX0, y: YT - RH / 2, width: RX1 - RX0, height: RH, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    lab(L, (RX0 + RX1) / 2, YT + 64, "*R*", "rl-g s-ink", "middle", 36);
    E("circle", { cx: XL, cy: GY, r: GR, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    // l'interrupteur : deux bornes, un pivot, un levier
    E("circle", { cx: C2.x, cy: C2.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, L);
    lab(L, C2.x, C2.y + 42, "(2)", "rl-l s-ink", "middle", 26);
    E("circle", { cx: C1.x, cy: C1.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, L);
    lab(L, C1.x, C1.y - 22, "(1)", "rl-l s-ink", "middle", 26);
    this.lev = line(L, PV.x, PV.y, PV.x - LEV, PV.y, "k-ink", 5);
    E("circle", { cx: PV.x, cy: PV.y, r: 7, class: "s-ink" }, L);
    lab(L, PV.x + 30, PV.y - 30, "K", "rl-l s-ink", "start", 26);
    // la bobine, ses lignes de champ (dessinées sous le fil), son étiquette
    this.champ = Array.from({ length: NLIG }, (_, j) => { const x = XR + (j - (NLIG - 1) / 2) * 15; return line(L, x, BY0 + 2, x, BY1 - 8, "k-ink", 3.2); });
    helice(L, XR, BY0, BTURNS, BPITCH, BRX, BRY);
    lab(L, XR - 62, (BY0 + BY1) / 2 + 12, "(*L*, *r*)", "rl-g s-ink", "end", 36);
    // les flèches de la convention récepteur, avec leur étiquette
    this.aI = fleche(L, XR, 232, XR, 280);
    this.aIt = lab(L, XR - 20, 268, "*i*", "rl-g s-ink", "end", 36);
    this.aU = fleche(L, XR + 78, BY1 + 6, XR + 78, BY0 - 4);
    this.aUt = lab(L, XR + 92, (BY0 + BY1) / 2 + 12, "*u*_{L}", "rl-g s-ink", "start", 36);
    this.aR = fleche(L, RX1, YT - 62, RX0, YT - 62);
    this.aRt = lab(L, (RX0 + RX1) / 2, YT - 82, "*u*_{R}", "rl-g s-ink", "middle", 36);
    this.aE = fleche(L, XL - 62, GY + 40, XL - 62, GY - 40);
    this.aEt = lab(L, XL - 80, GY + 10, "*E*", "rl-g s-ink", "end", 36);
    // le branchement d'oscilloscope : la voie Y₁ de l'autre côté de R, la masse entre R et la bobine
    this.os = E("g", {}, L);
    E("circle", { cx: RX0, cy: YT, r: 7.5, class: "s-a" }, this.os);
    line(this.os, RX0, YT, RX0 + 70, YT - 70, "k-a", 4.5, { "stroke-dasharray": "2 9", "marker-end": "url(#rlarwA)" });
    lab(this.os, RX0 + 84, YT - 74, "*Y*_{1}", "rl-g s-ink", "start", 36);
    E("circle", { cx: XR, cy: YT, r: 7.5, class: "s-ink" }, this.os);
    masse(this.os, XR, YT);
    lab(this.os, XR + 40, YT + 58, "masse", "rl-l s-ink", "start", 26);

    /* ----- une bobine seule ----- */
    const B = this.B = E("g", {}, g);
    const BX = 500, bY0 = 215, bT = 7, bP = 42;
    poly(B, [[BX, 150], [BX, bY0]]);
    poly(B, [[BX, bY0 + bT * bP], [BX, 575]]);
    helice(B, BX, bY0, bT, bP, 130, 34, 6, 3);
    lab(B, BX - 175, bY0 + (bT * bP) / 2, "fil enroulé", "rl-l s-ink", "end", 26);
    lab(B, BX - 175, bY0 + (bT * bP) / 2 + 34, "en spires", "rl-l s-ink", "end", 26);
    lab(B, BX + 175, bY0 + (bT * bP) / 2 - 8, "inductance *L*", "rl-l s-ink", "start", 26);
    lab(B, BX + 175, bY0 + (bT * bP) / 2 + 26, "résistance *r*", "rl-l s-ink", "start", 26);
    lab(B, BX + 175, bY0 + (bT * bP) / 2 + 60, "du fil", "rl-l s-ink", "start", 26);

    /* ----- les deux lampes en parallèle (schéma de principe) ----- */
    const P = this.P = E("g", {}, g);
    const PXL = 110, PT = 190, PB = 540, PYA = 270, PYB = 450, PBX0 = 440, PBX1 = 880, PGY = (PT + PB) / 2;
    this.pPv = { x: 360, y: PT }; this.pLev = 100;
    poly(P, [[PXL, PGY - 36], [PXL, PT], [260, PT]]);
    poly(P, [[this.pPv.x, PT], [PBX0, PT], [PBX0, PYB]]);
    poly(P, [[PBX1, PYA], [PBX1, PB], [PXL, PB], [PXL, PGY + 36]]);
    E("circle", { cx: PXL, cy: PGY, r: 36, class: "s-bg k-ink", "stroke-width": 3.5 }, P);
    line(P, PXL - 14, PGY, PXL + 14, PGY, "k-ink", 3); line(P, PXL, PGY - 14, PXL, PGY + 14, "k-ink", 3);
    E("circle", { cx: 260, cy: PT, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, P);
    this.pK = line(P, this.pPv.x, PT, this.pPv.x - this.pLev, PT, "k-ink", 5);
    E("circle", { cx: this.pPv.x, cy: PT, r: 7, class: "s-ink" }, P);
    lab(P, this.pPv.x + 12, PT - 26, "K", "rl-l s-ink", "start", 26);
    // la branche du haut : un conducteur ohmique, puis la lampe L₁
    poly(P, [[PBX0, PYA], [500, PYA]]); poly(P, [[590, PYA], [730, PYA]]); poly(P, [[790, PYA], [PBX1, PYA]]);
    E("rect", { x: 500, y: PYA - 20, width: 90, height: 40, class: "s-bg k-ink", "stroke-width": 3.5 }, P);
    lab(P, 500, PYA + 62, "conducteur ohmique", "rl-l s-ink", "start", 26);
    this.l1 = lampe(P, 760, PYA, 30);
    lab(P, 760, PYA - 74, "*L*_{1}", "rl-g s-ink", "middle", 36);
    // la branche du bas : une bobine, puis la lampe L₂
    poly(P, [[PBX0, PYB], [500, PYB]]); poly(P, [[650, PYB], [730, PYB]]); poly(P, [[790, PYB], [PBX1, PYB]]);
    const hz = E("g", { transform: `translate(500 ${PYB}) rotate(-90)` }, P);
    helice(hz, 0, 0, 6, 25, 26, 8, 4.5, 2.5);
    lab(P, 575, PYB + 62, "bobine", "rl-l s-ink", "middle", 26);
    this.l2 = lampe(P, 760, PYB, 30);
    lab(P, 760, PYB - 74, "*L*_{2}", "rl-g s-ink", "middle", 36);
    E("circle", { cx: PBX0, cy: PYA, r: 5.5, class: "s-ink" }, P); E("circle", { cx: PBX1, cy: PYB, r: 5.5, class: "s-ink" }, P);
    E("circle", { cx: PBX0, cy: PYB, r: 5.5, class: "s-ink" }, P); E("circle", { cx: PBX1, cy: PYA, r: 5.5, class: "s-ink" }, P);

    /* ----- l'expérience de Henry (1832), schéma de principe ----- */
    const Y = this.Y = E("g", {}, g);
    const CX1 = 360, CX2 = 700, CT = 380, CB = 450, MER = 408, CW = 76;   // deux coupelles : bords, fond, niveau du mercure
    this.hx = { x: CX2, lo: 410, hi: 330 };
    // les fils de la pile aux coupelles
    poly(Y, [[CX1, CB], [CX1, 560], [470, 560]]); poly(Y, [[590, 560], [CX2, 560], [CX2, CB]]);
    line(Y, 480, 536, 480, 584, "k-ink", 5); line(Y, 508, 548, 508, 572, "k-ink", 5);
    line(Y, 570, 536, 570, 584, "k-ink", 5); line(Y, 542, 548, 542, 572, "k-ink", 5);
    line(Y, 480, 560, 470, 560, "k-ink", 3.5); line(Y, 508, 560, 542, 560, "k-ink", 3.5); line(Y, 570, 560, 590, 560, "k-ink", 3.5);
    lab(Y, 525, 612, "pile", "rl-l s-ink", "middle", 26);
    // les coupelles de mercure
    [CX1, CX2].forEach((cx) => {
      E("path", { d: `M${cx - CW / 2} ${MER}H${cx + CW / 2}V${CB - 12}Q${cx + CW / 2} ${CB} ${cx + CW / 2 - 12} ${CB}H${cx - CW / 2 + 12}Q${cx - CW / 2} ${CB} ${cx - CW / 2} ${CB - 12}Z`, class: "f-c" }, Y);
      E("path", { d: `M${cx - CW / 2} ${CT}V${CB - 12}Q${cx - CW / 2} ${CB} ${cx - CW / 2 + 12} ${CB}H${cx + CW / 2 - 12}Q${cx + CW / 2} ${CB} ${cx + CW / 2} ${CB - 12}V${CT}`, class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, Y);
    });
    lab(Y, CX1, CB + 44, "mercure", "rl-l s-ink", "middle", 26);
    // le long fil : une jambe fixe dans la coupelle de gauche, l'hélice, une jambe mobile à droite
    poly(Y, [[CX1, 250], [CX1, 420]]); poly(Y, [[CX1, 250], [430, 250]]); poly(Y, [[650, 250], [CX2, 250]]);
    const hy = E("g", { transform: "translate(430 250) rotate(-90)" }, Y);
    helice(hy, 0, 0, 8, 27.5, 30, 9, 4.5, 2.5);
    lab(Y, 540, 176, "long fil en hélice", "rl-l s-ink", "middle", 26);
    this.leg = line(Y, CX2, 250, CX2, this.hx.hi, "k-ink", 4, {});
    this.legTip = E("circle", { cx: CX2, cy: this.hx.hi, r: 5, class: "s-ink" }, Y);
    // l'étincelle : une ligne brisée entre le bout du fil et le mercure
    this.spark = poly(Y, [[CX2 - 14, 372], [CX2 + 8, 384], [CX2 - 8, 392], [CX2 + 14, 404]], "k-a", 5);
    this.spLab = lab(Y, CX2 + 40, 330, "étincelle", "rl-l s-ink", "start", 26);
  },

  render() {
    const p = this.p, jeu = p.jeu;
    show(this.L, jeu === "rl" || jeu === "oscillo" ? 1 : 0); show(this.B, jeu === "bobine" ? 1 : 0);
    show(this.P, jeu === "lampes" ? 1 : 0); show(this.Y, jeu === "henry" ? 1 : 0);
    const K = p.K, t = clamp(p.t, 0, 1), e5 = Math.exp(-5 * t);
    if (jeu === "rl" || jeu === "oscillo") {
      // la phase : l'établissement (K en 1) ou la rupture (K en 2) ; le levier de passage garde le courant
      let i = 0;
      if (K >= 1.999) i = e5; else if (K > 1) i = 1; else if (K >= 0.999) i = 1 - e5;
      const a = K <= 1 ? -ANG * K : -ANG + 2 * ANG * (K - 1);
      this.lev.setAttribute("x2", (PV.x - LEV * Math.cos(a)).toFixed(1));
      this.lev.setAttribute("y2", (PV.y + LEV * Math.sin(a)).toFixed(1));
      // les lignes de champ : une de plus à chaque quart de I₀
      this.champ.forEach((c, j) => show(c, clamp(i * NLIG - j, 0, 1) * (p.ch > 0 ? 1 : 0)));
      show(this.aI, p.fi); show(this.aIt, p.fi); show(this.aU, p.fu); show(this.aUt, p.fu);
      show(this.aR, p.fr); show(this.aRt, p.fr); show(this.aE, p.fe); show(this.aEt, p.fe);
      accent(this.aI, p.fa === "i"); accent(this.aU, p.fa === "uL"); accent(this.aR, p.fa === "uR"); accent(this.aE, p.fa === "E");
      this.aIt.setAttribute("class", "rl-g " + (p.fa === "i" ? "s-a" : "s-ink")); this.aUt.setAttribute("class", "rl-g " + (p.fa === "uL" ? "s-a" : "s-ink"));
      this.aRt.setAttribute("class", "rl-g " + (p.fa === "uR" ? "s-a" : "s-ink")); this.aEt.setAttribute("class", "rl-g " + (p.fa === "E" ? "s-a" : "s-ink"));
      show(this.os, jeu === "oscillo" ? p.osc : 0);
    }
    if (jeu === "lampes") {
      const w = clamp((K - 0.9) / 0.1, 0, 1);
      const a = 0.6 * (1 - clamp(K, 0, 1));                                  // le levier : relevé ouvert, couché fermé
      this.pK.setAttribute("x2", (this.pPv.x - this.pLev * Math.cos(a)).toFixed(1));
      this.pK.setAttribute("y2", (190 - this.pLev * Math.sin(a)).toFixed(1));
      this.l1.set(w);                                                         // la branche à conducteur ohmique : le courant est aussitôt établi
      this.l2.set(w * (1 - e5) * (1 - e5));                                   // la branche à bobine : l'éclat suit i², et i monte en 1 − e^{−5t}
    }
    if (jeu === "henry") {
      const r = clamp(p.rv, 0, 2), h = this.hx;
      const yb = r <= 1 ? h.hi + (h.lo - h.hi) * r : h.lo + (h.hi - h.lo) * (r - 1);
      this.leg.setAttribute("y2", yb.toFixed(1)); this.legTip.setAttribute("cy", yb.toFixed(1));
      show(this.spark, clamp((r - 1.35) * 4, 0, 1)); show(this.spLab, clamp((r - 1.35) * 4, 0, 1));
    }
    const T = {
      rl: ["Le dipôle RL", `*E* = ${fr(E_V, 0)} V · *R* = ${fr(R_OHM, 0)} Ω · *L* = ${fr(L_H, 2)} H · *r* = ${fr(R_BOB, 0)} Ω`],
      bobine: ["Une bobine", "un fil conducteur enroulé en spires"],
      oscillo: ["Brancher l’oscilloscope", "voie *Y*_{1} de l’autre côté de *R*, masse entre *R* et la bobine"],
      lampes: ["Deux lampes, deux branches", "schéma de principe"],
      henry: ["L’expérience de Henry", "schéma de principe"],
    }[jeu] || ["", ""];
    this.ti.set(T[0], p.sub || T[1]);
  },
});
}
