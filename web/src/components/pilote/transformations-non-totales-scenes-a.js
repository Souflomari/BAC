/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Transformations non totales » (V3), première partie : la scène `solution`, d'un type
 * nouveau (décision du propriétaire) : le bécher et son pH-mètre (jeu `becher`), la loupe sur cent
 * molécules d'acide (jeu `zoom`, dessinée dans `transformations-non-totales-scenes-b.js`) et les deux
 * loupes côte à côte du retour à l'énigme (jeu `duo`). Architecture reprise de la scène `des` de la leçon
 * sur la décroissance (des objets à deux états, des tics à graine fixe, un graphe couplé) ; le dessin est neuf.
 *
 * Paramètres du jeu `becher` :
 *   flacons 1 | 2     un flacon ; ou l'acide chlorhydrique (à gauche) et l'acide éthanoïque (à droite)
 *   acide   'hcl' | 'ethan'   l'acide du flacon seul
 *   ph, ph2 0 → 1     l'afficheur du flacon (de gauche, de droite) : 0 « - - , - », 1 la valeur
 *   pv      nombre    une valeur imposée à l'afficheur (sinon elle est calculée par les outils) ; nomx : un nom imposé au flacon
 *   dil     1 → 10    la fiole jaugée : la solution est diluée dix fois, C est divisée par dix
 * Avant un pari, l'afficheur du flacon parié reste masqué. Couleurs : des classes seulement.
 * Les paramètres du jeu `zoom` sont décrits dans `transformations-non-totales-scenes-b.js`.
 */
import { zoomBuild, duoBuild } from "./transformations-non-totales-scenes-b";
import { C0, C_DIL, PH_HCL, PH_ETH, PH_DIL, TAU, TF, NOMS, fr, sciF } from "./transformations-non-totales-outils";

export function scenesA(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab } = O;

/** un flacon et son pH-mètre, dessinés autour de (0, 0) ; la sonde plonge dans le liquide */
function unite(parent) {
  const gu = E("g", {}, parent);
  const nom = lab(gu, -30, -150, "", "tn-g s-ink", "middle", 30);
  E("path", { d: "M-108 10 L-108 140 Q-108 160 -88 160 L28 160 Q48 160 48 140 L48 10 Z", class: "f-b" }, gu);
  E("path", { d: "M-110 -60 L-110 140 Q-110 162 -88 162 L28 162 Q50 162 50 140 L50 -60", class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round" }, gu);
  E("line", { x1: -108, x2: 48, y1: 10, y2: 10, class: "k-ink", "stroke-width": 2.5 }, gu);
  lab(gu, -124, 20, "100 mL", "tn-l s-c", "end", 26);
  const conc = lab(gu, -30, 218, "", "tn-l s-ink", "middle", 26);
  E("path", { d: "M145 -60 L145 -112 L-30 -112 L-30 124", class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }, gu);
  E("circle", { cx: -30, cy: 124, r: 8, class: "s-ink" }, gu);
  E("rect", { x: 80, y: -60, width: 130, height: 210, rx: 12, class: "cell" }, gu);
  E("rect", { x: 92, y: -38, width: 106, height: 72, rx: 6, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
  lab(gu, 102, -8, "pH", "tn-l s-c", "start", 26);
  const val = lab(gu, 190, 24, "", "tn-g s-ink", "end", 34);
  E("circle", { cx: 120, cy: 104, r: 11, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
  E("circle", { cx: 168, cy: 104, r: 11, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
  /* la fiole jaugée : la dilution */
  const fl = E("g", {}, gu);
  E("circle", { cx: -300, cy: 100, r: 60, class: "f-b" }, fl);
  E("path", { d: "M-312 -80 L-312 44 A 62 62 0 1 0 -288 44 L-288 -80", class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round" }, fl);
  E("line", { x1: -319, x2: -281, y1: -30, y2: -30, class: "k-ink", "stroke-width": 3 }, fl);
  lab(fl, -300, 118, "×10", "tn-g s-ink", "middle", 32);
  lab(fl, -300, -104, "diluée 10 fois", "tn-l s-ink", "middle", 26);
  E("line", { x1: -222, y1: 70, x2: -134, y2: 70, class: "k-ink", "stroke-width": 3, "marker-end": "url(#arw)" }, fl);
  return { g: gu, nom, conc, val, fl };
}

scene("solution", {
  p: { jeu: "becher", sub: "",
    flacons: 1, acide: "ethan", ph: 0, ph2: 0, pv: 0, nomx: "", dil: 1,
    depart: "acide", tic: 0, graph: 0, lisse: 0, ring: -1, hist: 0, cpt: 0, eq: 0, etiq: 0, vol: 1, vign: 0, vtr: 0, leg: 1, gros: 0, tr: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.B = E("g", {}, g);
    this.u = [unite(this.B), unite(this.B)];
    this.Z = zoomBuild(ctx, O, g);
    this.D = duoBuild(ctx, O, g);
  },
  render() {
    const p = this.p, jeu = p.jeu;
    if (jeu === "zoom") { this.Z.render(p, this.ti); this.D.hide(); show(this.B, 0); return; }
    if (jeu === "duo") {
      this.D.render(p, this.ti, { ph1: `pH ${fr(PH_HCL, 1)}`, ph2: `pH ${fr(PH_ETH, 1)}`, tau1: `*τ* = ${fr(TF.tau, 0)}`, tau2: `*τ* = ${fr(TAU, 2)}` });
      this.Z.hide(); show(this.B, 0); return;
    }
    this.Z.hide(); this.D.hide(); show(this.B, 1);
    const d = clamp((p.dil - 1) / 9, 0, 1), dil = d > 0.5;
    const aff = (v, on, dec) => (on > 0.5 ? fr(v, dec) : "- - , -");
    if (p.flacons === 2) {
      const [a, b] = this.u;
      // chaque flacon s'étend de −205 (l'étiquette « 100 mL ») à +210 (le pH-mètre) : deux flacons de 415 et 40 d'écart, centrés sur la toile de 1 000
      a.g.setAttribute("transform", "translate(265 380)"); b.g.setAttribute("transform", "translate(720 380)");
      show(a.g, 1); show(b.g, 1); show(a.fl, 0); show(b.fl, 0);
      setFx(a.nom, NOMS.hcl); setFx(b.nom, NOMS.ethan);
      setFx(a.conc, `*C* = ${sciF(C0, 1)} mol·L^{−1}`); setFx(b.conc, `*C* = ${sciF(C0, 1)} mol·L^{−1}`);
      setFx(a.val, aff(PH_HCL, p.ph, 1)); setFx(b.val, aff(PH_ETH, p.ph2, 1));
      this.ti.set("Deux flacons, même concentration", p.sub || "un pH-mètre dans chaque flacon");
    } else {
      const [a, b] = this.u, s = 1.25;
      a.g.setAttribute("transform", `translate(${(440 + 130 * d).toFixed(1)} 384) scale(${s})`);
      show(a.g, 1); show(b.g, 0); show(a.fl, d);
      const hcl = p.acide === "hcl", C = dil ? C_DIL : C0;
      const v = p.pv > 0 ? p.pv : hcl ? PH_HCL : dil ? PH_DIL : PH_ETH;
      setFx(a.nom, p.nomx || NOMS[p.acide] || NOMS.ethan);
      setFx(a.conc, p.pv > 0 ? "" : `*C* = ${sciF(C, 1)} mol·L^{−1}`);
      setFx(a.val, aff(v, p.ph, p.pv > 0 ? 1 : dil && !hcl ? 2 : 1));
      this.ti.set("Un flacon et son pH-mètre", p.sub || "100 mL de solution");
    }
  },
});
}
