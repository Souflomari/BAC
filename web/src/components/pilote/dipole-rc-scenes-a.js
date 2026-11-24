/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RC » (V3), première partie : le schéma du montage, `circuit`
 * (scène d'un type nouveau, décision du relecteur 2026-11-24, plan §9.1).
 *
 * Un schéma de circuit : une boucle rectangulaire (générateur, interrupteur K à deux positions,
 * conducteur ohmique ou lampe, condensateur), les flèches de tension et de courant, les charges des
 * armatures, deux branchements d'oscilloscope. Les deux dessins qui ne sont pas des boucles (un
 * condensateur seul, la bouteille de Leyde) vivent dans la même scène.
 *
 * Conventions de la leçon, tenues partout (plan §3.2) : l'armature du haut est A, celle du bas B ;
 * i entre par A (flèche vers le bas dans le condensateur) ; q = q_A ; u_C = u_AB, flèche vers A,
 * opposée à i (convention récepteur) ; u_R = R·i, flèche opposée à i ; E vers le haut, à gauche.
 *
 * Paramètres :
 *   jeu    'lampe' | 'rc' | 'para' | 'oscillo' (boucles), 'cond' (un condensateur), 'leyde'
 *   K      0 ouvert · 1 position (1) · 2 position (2) : le levier pivote (nombre, animé)
 *   t      0 → 1 : le temps réduit t/(5τ) de la phase en cours ; règle q et l'éclat de la lampe
 *          (charge si K = 1 : q = 1 − e^{−5t} ; décharge si K = 2 : q = e^{−5t} ; i/i₀ = e^{−5t})
 *   fi fu fr fe   les flèches i, u_C, u_R, E (0 ou 1), avec leur étiquette
 *   fa     la flèche mise en évidence, en accent : 'i' | 'uC' | 'uR' | 'E' | ''
 *   ch     charges des armatures : 0 aucune, 1 oui (boucles : suivent q ; 'cond' : A seule), 2 A et B
 *   qq     'cond' : la part de charge dessinée (0 à 1)
 *   nm     les noms A et B (0 ou 1)
 *   osc    les deux branchements d'oscilloscope (0 ou 1)
 *   rv     'leyde' : le dénouement (les deux conducteurs et l'isolant se nomment)
 *   sub    un sous-titre imposé (sinon celui du jeu)
 * Couleurs : des classes seulement (k-ink, k-a, k-dim, s-ink, s-a, s-dim, s-bg, f-a, f-c).
 */
import { E_V, R_OHM, C_F, fr } from "./dipole-rc-outils";

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
const YA = 345, YBP = 385, PW = 176;                      // armatures A (haut) et B (bas), largeur
const XP1 = 700, XP2 = XR, PW2 = 64;                      // les deux condensateurs en parallèle
const LAMP = { x: (RX0 + RX1) / 2, y: YT, r: 30 };
const SLOTS = [22, -22, 54, -54, 84, -84];                // les charges, du centre vers les bords (le fil passe au centre)
const ANG = Math.atan2(DY, DX);                           // l'angle du levier

const line = (parent, x1, y1, x2, y2, cls = "k-ink", w = 3.5, extra = {}) => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const poly = (parent, pts, cls = "k-ink", w = 3.5) => E("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), class: cls + " nofill", "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
/** une charge : un cercle avec un + ou un − */
function charge(parent, x, y, plus) {
  const g = E("g", {}, parent);
  E("circle", { cx: x, cy: y, r: 12, class: "s-bg k-ink", "stroke-width": 2.5 }, g);
  line(g, x - 6, y, x + 6, y, "k-ink", 2.6);
  if (plus) line(g, x, y - 6, x, y + 6, "k-ink", 2.6);
  return g;
}
/** une flèche (trait + pointe), en encre ou en accent */
function fleche(parent, x1, y1, x2, y2) {
  const l = line(parent, x1, y1, x2, y2, "k-ink", 4.5, { "marker-end": "url(#rcarw)" });
  return l;
}
function accent(l, on) {
  l.setAttribute("class", on ? "k-a" : "k-ink");
  l.setAttribute("marker-end", on ? "url(#rcarwA)" : "url(#rcarw)");
}

scene("circuit", {
  p: { jeu: "rc", K: 1, t: 0, fi: 0, fu: 0, fr: 0, fe: 0, fa: "", ch: 1, qq: 0.5, nm: 0, osc: 0, rv: 0, gen: 0, k2: 1, sub: "" },
  build(g) {
    this.ti = titre(g, "", "");

    /* ----- la boucle ----- */
    const L = this.L = E("g", {}, g);
    // les fils : tension / courant partagent le rail gauche ; le fil de la borne (2) descend en X2
    poly(L, [[C1.x, C1.y], [XL, C1.y], [XL, GY - GR]]);
    poly(L, [[XL, GY + GR], [XL, YB], [XR, YB]]);
    this.w2 = poly(L, [[C2.x, C2.y], [X2, C2.y], [X2, YB]]);
    this.jb = E("circle", { cx: X2, cy: YB, r: 5.5, class: "s-ink" }, L);
    poly(L, [[PV.x, PV.y], [RX0, YT]]);
    this.wR = poly(L, [[RX1, YT], [XR, YT]]);
    poly(L, [[XR, YT], [XR, YA]]);
    poly(L, [[XR, YBP], [XR, YB]]);
    // le conducteur ohmique ; la lampe prend sa place dans le jeu « lampe »
    this.res = E("rect", { x: RX0, y: YT - RH / 2, width: RX1 - RX0, height: RH, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    this.lampG = E("g", {}, L);
    this.halo = E("circle", { cx: LAMP.x, cy: LAMP.y, r: LAMP.r, class: "s-a" }, this.lampG);
    this.rays = Array.from({ length: 8 }, (_, j) => { const a = (j * Math.PI) / 4 + Math.PI / 8; return line(this.lampG, LAMP.x + 40 * Math.cos(a), LAMP.y + 40 * Math.sin(a), LAMP.x + 62 * Math.cos(a), LAMP.y + 62 * Math.sin(a), "k-a", 4); });
    E("circle", { cx: LAMP.x, cy: LAMP.y, r: LAMP.r, class: "nofill k-ink", "stroke-width": 3.5 }, this.lampG);
    const d = LAMP.r * Math.SQRT1_2;
    line(this.lampG, LAMP.x - d, LAMP.y - d, LAMP.x + d, LAMP.y + d, "k-ink", 3);
    line(this.lampG, LAMP.x - d, LAMP.y + d, LAMP.x + d, LAMP.y - d, "k-ink", 3);
    // le générateur : de tension (cercle), ou de courant (cercle barré d'un trait, flèche I₀ à l'extérieur)
    E("circle", { cx: XL, cy: GY, r: GR, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    this.gI = E("g", {}, L);
    line(this.gI, XL - GR, GY, XL + GR, GY, "k-ink", 3.5);
    this.gIa = line(this.gI, XL - 62, GY + 38, XL - 62, GY - 38, "k-ink", 4.5, { "marker-end": "url(#rcarw)" });
    this.gIt = lab(this.gI, XL - 82, GY + 10, "*I*_{0}", "rc-g s-ink", "end", 36);
    // l'interrupteur : deux bornes, un pivot, un levier
    this.k2g = E("g", {}, L);
    E("circle", { cx: C2.x, cy: C2.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, this.k2g);
    this.k2t = lab(this.k2g, C2.x, C2.y + 42, "(2)", "rc-l s-ink", "middle", 26);
    E("circle", { cx: C1.x, cy: C1.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, L);
    this.k1t = lab(L, C1.x, C1.y - 22, "(1)", "rc-l s-ink", "middle", 26);
    this.lev = line(L, PV.x, PV.y, PV.x - LEV, PV.y, "k-ink", 5);
    E("circle", { cx: PV.x, cy: PV.y, r: 7, class: "s-ink" }, L);
    this.kt = lab(L, PV.x + 30, PV.y - 30, "K", "rc-l s-ink", "start", 26);
    // le condensateur seul, ou deux condensateurs en parallèle
    this.cap1 = E("g", {}, L);
    this.capSingle(this.cap1, XR, PW);
    this.para = E("g", {}, L);
    poly(this.para, [[RX1, YT], [XR, YT]]);
    E("circle", { cx: XP1, cy: YT, r: 5.5, class: "s-ink" }, this.para);
    E("circle", { cx: XP1, cy: YB, r: 5.5, class: "s-ink" }, this.para);
    poly(this.para, [[XP1, YT], [XP1, YA]]);
    poly(this.para, [[XP1, YBP], [XP1, YB]]);
    this.capSingle(this.para, XP1, PW2);
    this.capSingle(this.para, XP2, PW2);
    lab(this.para, XP1 - 50, (YA + YBP) / 2 + 12, "*C*_{1}", "rc-g s-ink", "end", 36);
    lab(this.para, XP2 + 50, (YA + YBP) / 2 + 12, "*C*_{2}", "rc-g s-ink", "start", 36);
    // les noms des armatures
    this.noms = E("g", {}, L);
    lab(this.noms, XR - PW / 2 - 16, YA + 12, "A", "rc-g s-ink", "end", 36);
    lab(this.noms, XR - PW / 2 - 16, YBP + 12, "B", "rc-g s-ink", "end", 36);
    // les charges : six places par armature, du centre vers les bords
    this.qA = SLOTS.map((o) => charge(L, XR + o, YA - 24, true));
    this.qB = SLOTS.map((o) => charge(L, XR + o, YBP + 24, false));
    // les flèches de la convention récepteur, avec leur étiquette
    this.aI = fleche(L, XR, 252, XR, 318);
    this.aIt = lab(L, XR - 20, 292, "*i*", "rc-g s-ink", "end", 36);
    this.aU = fleche(L, XR + 112, YBP + 28, XR + 112, YA - 28);
    this.aUt = lab(L, XR + 126, (YA + YBP) / 2 + 12, "*u*_{C}", "rc-g s-ink", "start", 36);
    this.aR = fleche(L, RX1, YT - 62, RX0, YT - 62);
    this.aRt = lab(L, (RX0 + RX1) / 2, YT - 82, "*u*_{R}", "rc-g s-ink", "middle", 36);
    this.aE = fleche(L, XL - 62, GY + 40, XL - 62, GY - 40);
    this.aEt = lab(L, XL - 80, GY + 10, "*E*", "rc-g s-ink", "end", 36);
    // deux branchements d'oscilloscope : la voie Y₁ sur A, la masse sur B
    this.os = E("g", {}, L);
    E("circle", { cx: XR, cy: YT, r: 7.5, class: "s-a" }, this.os);
    line(this.os, XR, YT, XR + 118, YT - 62, "k-a", 4.5, { "stroke-dasharray": "2 9", "marker-end": "url(#rcarwA)" });
    lab(this.os, XR + 76, YT - 80, "*Y*_{1}", "rc-g s-ink", "start", 36);
    E("circle", { cx: XR, cy: YB, r: 7.5, class: "s-a" }, this.os);
    line(this.os, XR, YB, XR, YB + 34, "k-a", 4.5);
    [[34, 34], [24, 52], [12, 70]].forEach(([h, y]) => line(this.os, XR - h, YB + y, XR + h, YB + y, "k-a", 4.5));
    lab(this.os, XR + 50, YB + 62, "masse", "rc-l s-ink", "start", 26);

    /* ----- un condensateur seul ----- */
    const K = this.K = E("g", {}, g);
    const CX = 500, CA = 296, CB = 392, CW = 360;
    poly(K, [[CX, 170], [CX, CA]]);
    poly(K, [[CX, CB], [CX, 520]]);
    line(K, CX - CW / 2, CA, CX + CW / 2, CA, "k-ink", 6);
    line(K, CX - CW / 2, CB, CX + CW / 2, CB, "k-ink", 6);
    E("rect", { x: CX - CW / 2, y: CA + 4, width: CW, height: CB - CA - 8, class: "f-c" }, K);
    lab(K, CX + 24, (CA + CB) / 2 + 9, "isolant", "rc-l s-ink", "start", 26);
    lab(K, CX - CW / 2 - 18, CA + 9, "A", "rc-g s-ink", "end", 36);
    lab(K, CX - CW / 2 - 18, CB + 9, "B", "rc-g s-ink", "end", 36);
    const SL = [44, -44, 104, -104, 164, -164];
    this.kA = SL.map((o) => charge(K, CX + o, CA - 30, true));
    this.kB = SL.map((o) => charge(K, CX + o, CB + 30, false));

    /* ----- la bouteille de Leyde, en schéma ----- */
    const Y = this.Y = E("g", {}, g);
    const VX0 = 520, VX1 = 700, VT = 330, VB = 610, EAU = 440;
    // le canon, suspendu à deux fils, relié à l'eau
    line(Y, 170, 150, 400, 150, "k-dim", 3);
    line(Y, 210, 150, 230, 245, "k-dim", 2.5); line(Y, 360, 150, 340, 245, "k-dim", 2.5);
    E("rect", { x: 190, y: 245, width: 190, height: 44, rx: 22, class: "s-bg k-ink", "stroke-width": 3.5 }, Y);
    poly(Y, [[380, 267], [610, 267], [610, EAU + 40]], "k-ink", 3.5);
    // le vase de verre et l'eau
    E("path", { d: `M${VX0} ${EAU}H${VX1}V${VB - 30}Q${VX1} ${VB} ${VX1 - 30} ${VB}H${VX0 + 30}Q${VX0} ${VB} ${VX0} ${VB - 30}Z`, class: "f-c" }, Y);
    E("path", { d: `M${VX0} ${VT}V${VB - 30}Q${VX0} ${VB} ${VX0 + 30} ${VB}H${VX1 - 30}Q${VX1} ${VB} ${VX1} ${VB - 30}V${VT}`, class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, Y);
    // la main droite, qui tient le vase : un U autour du verre
    E("path", { d: `M${VX0 - 26} ${EAU + 40}V${VB - 20}Q${VX0 - 26} ${VB + 26} ${VX0 + 10} ${VB + 26}H${VX1 - 10}Q${VX1 + 26} ${VB + 26} ${VX1 + 26} ${VB - 20}V${EAU + 40}`, class: "k-dim nofill", "stroke-width": 14, "stroke-linecap": "round", "stroke-linejoin": "round" }, Y);
    // l'autre main, qui approche le canon
    this.main2 = E("g", {}, Y);
    line(this.main2, 285, 440, 285, 330, "k-dim", 16);
    this.noms2 = [lab(Y, 176, 282, "canon", "rc-l s-ink", "end", 26), lab(Y, 722, EAU + 6, "eau", "rc-l s-ink", "start", 26), lab(Y, 760, VB + 12, "main droite", "rc-l s-ink", "start", 26), lab(Y, 262, 440, "l’autre main", "rc-l s-ink", "end", 26)];
    // le dénouement : les charges des deux côtés du verre, et le choc
    this.rvG = E("g", {}, Y);
    [0, 1, 2, 3].forEach((j) => charge(this.rvG, VX0 + 20, EAU + 28 + 38 * j, true));
    [0, 1, 2, 3].forEach((j) => charge(this.rvG, VX0 - 26, EAU + 62 + 38 * j, false));
    poly(this.rvG, [[285, 330], [276, 318], [292, 308], [284, 296]], "k-a", 4.5);
    this.vt = lab(Y, VX1 + 28, VT + 40, "verre : isolant", "rc-l s-ink", "start", 26);
  },

  /** deux plaques parallèles de largeur w, centrées en x, avec l'isolant entre elles */
  capSingle(parent, x, w) {
    E("rect", { x: x - w / 2, y: YA + 3, width: w, height: YBP - YA - 6, class: "f-c" }, parent);
    line(parent, x - w / 2, YA, x + w / 2, YA, "k-ink", 6);
    line(parent, x - w / 2, YBP, x + w / 2, YBP, "k-ink", 6);
  },

  render() {
    const p = this.p, jeu = p.jeu;
    const boucle = jeu === "lampe" || jeu === "rc" || jeu === "para" || jeu === "oscillo";
    show(this.L, boucle ? 1 : 0); show(this.K, jeu === "cond" ? 1 : 0); show(this.Y, jeu === "leyde" ? 1 : 0);
    // la phase : la charge (K en 1) ou la décharge (K en 2) ; le levier de passage laisse le condensateur plein
    const K = p.K, t = clamp(p.t, 0, 1), e5 = Math.exp(-5 * t);
    let q = 0;
    if (K >= 1.999) q = e5; else if (K > 1) q = 1; else if (K >= 0.999) q = 1 - e5;
    const w = K <= 1 ? clamp(K, 0, 1) : Math.abs(2 * K - 3);                 // le levier touche une borne ?
    const bright = w * e5 * e5;                                              // l'éclat suit i²
    // le levier
    const a = K <= 1 ? -ANG * K : -ANG + 2 * ANG * (K - 1);
    this.lev.setAttribute("x2", (PV.x - LEV * Math.cos(a)).toFixed(1));
    this.lev.setAttribute("y2", (PV.y + LEV * Math.sin(a)).toFixed(1));
    // le jeu
    const lampe = jeu === "lampe", para = jeu === "para", k2 = p.k2 > 0.5;
    show(this.res, lampe ? 0 : 1); show(this.lampG, lampe ? 1 : 0);
    this.halo.setAttribute("r", (LAMP.r + 30 * bright).toFixed(1)); this.halo.style.opacity = (0.5 * bright).toFixed(3);
    this.rays.forEach((r) => (r.style.opacity = clamp(bright * 1.4 - 0.1, 0, 1).toFixed(3)));
    show(this.gI, p.gen); show(this.k2g, k2 ? 1 : 0); show(this.w2, k2 ? 1 : 0); show(this.jb, k2 ? 1 : 0);
    show(this.cap1, para ? 0 : 1); show(this.para, para ? 1 : 0); show(this.wR, para ? 0 : 1);
    show(this.noms, p.nm);
    // les charges : une par place, qui apparaît à mesure que q grandit
    const vis = (j) => clamp(q * SLOTS.length - j, 0, 1) * (p.ch > 0 ? 1 : 0);
    this.qA.forEach((c, j) => show(c, para ? 0 : vis(j))); this.qB.forEach((c, j) => show(c, para ? 0 : vis(j)));
    // les flèches
    show(this.aI, p.fi); show(this.aIt, p.fi); show(this.aU, p.fu); show(this.aUt, p.fu);
    show(this.aR, p.fr); show(this.aRt, p.fr);
    show(this.aE, p.gen ? 0 : p.fe); show(this.aEt, p.gen ? 0 : p.fe);
    accent(this.aI, p.fa === "i"); accent(this.aU, p.fa === "uC"); accent(this.aR, p.fa === "uR"); accent(this.aE, p.fa === "E");
    this.aIt.setAttribute("class", "rc-g " + (p.fa === "i" ? "s-a" : "s-ink")); this.aUt.setAttribute("class", "rc-g " + (p.fa === "uC" ? "s-a" : "s-ink"));
    this.aRt.setAttribute("class", "rc-g " + (p.fa === "uR" ? "s-a" : "s-ink")); this.aEt.setAttribute("class", "rc-g " + (p.fa === "E" ? "s-a" : "s-ink"));
    show(this.os, jeu === "oscillo" ? p.osc : 0);
    // un condensateur seul : A seule, puis A et B
    const nq = Math.round(clamp(p.qq, 0, 1) * 6);
    this.kA.forEach((c, j) => show(c, j < nq && p.ch > 0 ? 1 : 0));
    this.kB.forEach((c, j) => show(c, j < nq && p.ch > 1.5 ? 1 : 0));
    // Leyde
    show(this.rvG, p.rv); show(this.main2, 1); show(this.vt, p.rv);
    setFx(this.noms2[1], p.rv > 0.5 ? "eau : conducteur" : "eau");
    setFx(this.noms2[2], p.rv > 0.5 ? "main : conducteur" : "main droite");
    // les titres
    const T = {
      lampe: ["Le montage de l’énigme", "générateur, interrupteur K, lampe, condensateur"],
      rc: ["Le dipôle RC", `*E* = ${fr(E_V, 0)} V · *R* = ${fr(R_OHM / 1e3, 0)} kΩ · *C* = ${fr(C_F * 1e6, 0)} µF`],
      para: ["Deux condensateurs en parallèle", "*C*_{1} et *C*_{2} entre les mêmes points"],
      oscillo: ["Brancher l’oscilloscope", "voie *Y*_{1} sur A, masse sur B"],
      cond: ["Un condensateur", "deux conducteurs séparés par un isolant"],
      leyde: ["Un schéma de la bouteille de Leyde", "un vase de verre, de l’eau, une main"],
    }[jeu] || ["", ""];
    this.ti.set(T[0], p.sub || T[1]);
  },
});
}
