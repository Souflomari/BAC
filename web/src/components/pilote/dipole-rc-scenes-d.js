/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RC » (V3), quatrième partie : `couple`, le circuit et les courbes u_C(t) et i(t)
 * montrés ensemble, liés par le même instant t (procédé 6 du rapport 10, maquettes « Dipôle RC » et
 * « Dipôle RC : la décharge »).
 *
 * Une seule grandeur pilote tout : l'instant `t` (en secondes). Le circuit (les charges des armatures A
 * et B, la flèche i dont le trait suit i, la flèche u_C), le repère vertical commun aux deux courbes, les
 * deux points et les lectures chiffrées en sont des fonctions : rien n'est posé à l'œil. Les valeurs
 * viennent de `dipole-rc-outils.js` (E, R, C, τ, u_C(t), i(t)) ; la loi des mailles se lit à chaque
 * instant dans la dernière ligne (u_R + u_C = E à la charge, 0 à la décharge).
 *
 * Disposition (la toile mesure 1 000 × 720, et 390 px de large sur un téléphone) : le circuit en haut à
 * gauche (il occupe presque la moitié de la largeur) et les lectures à sa droite, les deux courbes empilées
 * dessous, sur le même axe des temps. Pas de deux panneaux côte à côte : ils seraient trop petits.
 *
 * Exactitude physique : les charges sont dessinées sur les faces extérieures des armatures, jamais dans
 * l'isolant ; la flèche i suit le sens conventionnel (du pôle + du générateur vers A) ; u_C part de B vers A,
 * à l'opposé de i (convention récepteur) ; u_R + u_C = E à tout instant à la charge. À la décharge, K est
 * en position (2) : le générateur sort de la maille (il s'estompe), la flèche i ne change pas, mais le
 * courant réel va de A vers R : i est négatif.
 *
 * Paramètres :
 *   t      l'instant, en s (0 à 6τ) : le repère vertical, les charges, les lectures
 *   dis    0 → 1 : 0 la charge (K en position 1), 1 la décharge (K en position 2, depuis u_C = E) ; le levier
 *          de K pivote avec ce paramètre, et les courbes changent de loi à mi-course
 *   ic     0 → 1 : tout ce qui dit i (la flèche, la courbe et son axe, le point, u_R et les lectures de i) ;
 *          à 0, la scène ne donne pas i (la réponse d'une question sur i va dans `reveal`) ; à la charge la
 *          flèche i est cachée aussi, à la décharge la flèche de convention reste (elle définit i) mais le
 *          sens réel (flèche rouge) et la courbe attendent
 *   cu     0 → 1 : la courbe u_C(t) (la réponse d'une question sur sa solution va dans `reveal`)
 *   lect   0 → 1 : la lecture à 37 % de E : la ligne horizontale, et la courbe u_C en entier
 *   taus   0 → 1 : les repères τ … 5τ avec ce qui est atteint (u_C) et ce qui reste (i) ; tau1 : le repère τ seul
 *   trans  le régime transitoire (0 à 5τ) et le régime permanent
 * Couleurs : des classes seulement. Le rouge n'est donné qu'à i (la flèche, la courbe, le point, la lecture).
 */
import { E_V, R_OHM, C_F, TAU, I0, uC, uR, iC, uDech, iDech, U37, chargePart, dechPart, fr } from "./dipole-rc-outils";

export function scenesD(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab, courbe } = O;

/* ---------- la géométrie : tout est calculé ici ---------- */
const TM = 6 * TAU;                                         // la fin de l'axe des temps : 6τ
const X0 = 150, X1 = 900, X = (t) => X0 + ((X1 - X0) * t) / TM;
const UT = 366, UB = 474;                                   // la courbe u_C : le haut (u = E) et l'axe des temps
const IT = 534, IB = 636;                                   // la courbe i : le haut et le bas ; à la charge i = I₀ en haut, 0 en bas ; à la décharge 0 en haut, −I₀ en bas
const YU = (u) => UB - ((UB - UT) * u) / E_V;
const YI = (i) => IB - ((IB - IT) * i) / I0;                // la charge : i de 0 (bas) à I₀ (haut)
const YID = (i) => IT + ((IB - IT) * -i) / I0;              // la décharge : i de 0 (haut) à −I₀ (bas)
const XL = 70, XR = 595, TOP = 150, YT = 174, YB = 308;     // la boucle : rails gauche et droit, fil du générateur, fil du haut (R, C), fil du bas
const GY = (TOP + YB) / 2, GR = 28;                         // le générateur
const YA = 232, YBP = 268, PW = 140;                        // armatures A (haut) et B (bas), largeur
const SLOTS = [19, -19, 52, -52];                           // les charges, du centre vers les bords (le fil passe au centre)
const PV = { x: 353, y: YT }, LEV = 86, DY = YT - TOP, DX = Math.sqrt(LEV * LEV - DY * DY), ANG = Math.atan2(DY, DX);   // le pivot et le levier de K
const C1 = { x: PV.x - DX, y: TOP }, C2 = { x: PV.x - DX, y: YT + DY }, X2 = 215;   // les bornes (1) et (2) ; le fil de (2) rejoint le fil du bas en X2
const RX0 = 390, RX1 = 485;                                 // le conducteur ohmique
const XRO = 782;                                            // les lectures
const RY = [150, 186, 222, 258, 294];                       // leurs lignes

const line = (parent, x1, y1, x2, y2, cls = "k-ink", w = 3.5, extra = {}) => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const poly = (parent, pts, cls = "k-ink", w = 3.5) => E("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), class: cls + " nofill", "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
/** une charge : un cercle avec un + (armature A) ou un − (armature B) */
function charge(parent, x, y, plus) {
  const g = E("g", {}, parent);
  const c = E("circle", { cx: x, cy: y, r: 12.5, class: "s-bg k-ink", "stroke-width": 2.5 }, g);
  const h = line(g, x - 6, y, x + 6, y, "k-ink", 2.6);
  const v = plus ? line(g, x, y - 6, x, y + 6, "k-ink", 2.6) : null;
  return { g, c, h, v, y, plus };
}
/** place une charge en x (son centre) */
function poseCharge(q, x) {
  q.c.setAttribute("cx", x.toFixed(1)); q.h.setAttribute("x1", (x - 6).toFixed(1)); q.h.setAttribute("x2", (x + 6).toFixed(1));
  if (q.v) { q.v.setAttribute("x1", x.toFixed(1)); q.v.setAttribute("x2", x.toFixed(1)); }
}
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };
const setY = (t, y) => t.setAttribute("y", y.toFixed(1));

scene("couple", {
  p: { t: 0, dis: 0, ic: 0, cu: 1, lect: 0, taus: 0, tau1: 0, trans: 0 },
  build(g) {
    this.ti = titre(g, "Le circuit et les courbes, au même instant", `*E* = ${fr(E_V, 0)} V · *R* = ${fr(R_OHM / 1e3, 0)} kΩ · *C* = ${fr(C_F * 1e6, 0)} µF`);
    this.mode = -1;

    /* ----- les deux courbes, sur le même axe des temps ----- */
    const Gc = E("g", {}, g);
    // le régime transitoire (0 à 5τ) et le régime permanent
    this.trG = E("g", {}, Gc);
    const trB = E("rect", { x: X(0), y: UT, width: X(5 * TAU) - X(0), height: UB - UT, class: "f-c" }, this.trG);
    trB.style.opacity = 0.4;
    lab(this.trG, (X(0) + X(5 * TAU)) / 2, UB - 12, "régime transitoire", "rc-l s-ink", "middle", 26);
    // les axes de u_C : toujours là
    line(Gc, X0, UB, X1 + 10, UB, "k-dim", 2);
    line(Gc, X0, UT - 12, X0, UB, "k-dim", 2);
    line(Gc, X0, UT, X1, UT, "k-dim", 2.5, { "stroke-dasharray": "8 8" });
    lab(Gc, X0 - 12, UT + 8, fr(E_V, 0), "t-sous s-c", "end", 22);
    // l'axe des temps : ses graduations descendent avec le deuxième graphique quand i paraît (this.tk : [élément, décalage])
    this.tk = [];
    for (let s = 0; s <= TM + 1e-9; s += 1) {
      const maj = Math.abs(s % 2) < 1e-9;
      this.tk.push([line(Gc, X(s), 0, X(s), 0, "k-dim", 2), maj ? 7 : 4, "tick"]);
      if (maj) this.tk.push([lab(Gc, X(s), 0, fr(s, 0), "t-sous s-c", "middle", 22), 32, "text"]);
    }
    this.tk.push([lab(Gc, X1 + 16, 0, "*t* (s)", "rc-l s-c", "start", 26), 32, "text"]);
    // le deuxième graphique (i) : tout ce qui est à lui est dans this.iG, et se cache avec ic
    this.iG = E("g", {}, Gc);
    line(this.iG, X0, IB, X1 + 10, IB, "k-dim", 2);
    line(this.iG, X0, IT - 12, X0, IB, "k-dim", 2);
    this.iZero = line(this.iG, X0, IT, X1 + 10, IT, "k-dim", 2);              // la décharge : l'axe i = 0 est en haut
    this.iTop = lab(this.iG, X0 - 12, IT + 8, "", "t-sous s-c", "end", 22);
    this.iBot = lab(this.iG, X0 - 12, IB + 8, "", "t-sous s-c", "end", 22);
    // les courbes entières en pointillé (ce qui viendra), puis la partie déjà vécue, épaisse
    this.uGh = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, Gc);
    this.uFull = E("path", { class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, Gc);
    this.iGh = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, this.iG);
    this.iLv = E("path", { class: "k-a nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, this.iG);
    this.uLv = E("path", { class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, Gc);
    // la lecture à 37 % de E : une ligne horizontale, avec sa valeur
    this.lcG = E("g", {}, Gc);
    line(this.lcG, X0, YU(U37), X1, YU(U37), "k-ink", 2.5, { "stroke-dasharray": "3 8" });
    lab(this.lcG, X0 - 12, YU(U37) + 8, fr(U37, 1), "t-sous s-ink", "end", 22);
    lab(this.lcG, X1, YU(U37) - 14, "37 % de *E*", "rc-l s-ink", "end", 26);
    // les repères τ … 5τ : un trait, deux points, ce qui est atteint (u_C) et ce qui reste (i)
    this.nt = [1, 2, 3, 4, 5].map((n) => {
      const sg = E("g", {}, Gc), t = n * TAU;
      const ln = line(sg, X(t), UT, X(t), IB, "k-dim", 2, { "stroke-dasharray": "5 7" });
      const du = E("circle", { cx: X(t), r: 6.5, class: "s-ink" }, sg);
      const tl = lab(sg, X(t), 0, n === 1 ? "*τ*" : `${n}*τ*`, "rc-tt s-c", "middle", 32);
      const lu = lab(sg, X(t) + 12, 0, "", "rc-l s-ink", "start", 26);
      const ig = E("g", {}, sg);
      const di = E("circle", { cx: X(t), r: 6.5, class: "s-a" }, ig);
      const li = lab(ig, X(t) + 12, 0, "", "rc-l s-ink", "start", 26);
      return { g: sg, i: ig, ln, du, tl, lu, di, li, n };
    });
    // le repère vertical commun, et les deux points
    this.cr = line(Gc, 0, UT - 6, 0, IB, "k-ink", 2, { "stroke-dasharray": "4 5" });
    this.uD = E("circle", { r: 8.5, class: "s-ink" }, Gc);
    this.iD = E("circle", { r: 8.5, class: "s-a" }, this.iG);
    // les titres d'axe se posent par-dessus le repère vertical, qui passe derrière le mot, pas dedans
    this.uLab = lab(Gc, X0, UT - 26, "*u*_{C} (V)", "rc-l rc-halo s-c", "start", 26);
    this.iLab = lab(Gc, X0, IT - 28, "*i* (mA)", "rc-l rc-halo s-c", "start", 26);
    // « permanent » aussi
    this.perG = E("g", {}, Gc);
    lab(this.perG, X(5 * TAU) + 8, UB - 12, "permanent", "rc-l rc-halo s-ink", "start", 26);

    /* ----- le circuit ----- */
    const L = E("g", {}, g);
    // le générateur et son fil : ils s'estompent à la décharge (K en 2 : le générateur est hors de la maille)
    this.gen = E("g", {}, L);
    poly(this.gen, [[XL, GY - GR], [XL, TOP], [C1.x, TOP]]);
    poly(this.gen, [[XL, GY + GR], [XL, YB]]);
    E("circle", { cx: XL, cy: GY, r: GR, class: "s-bg k-ink", "stroke-width": 3.5 }, this.gen);
    line(this.gen, XL + 52, GY + 29, XL + 52, GY - 27, "k-ink", 4, { "marker-end": "url(#rcarw)" });
    lab(this.gen, XL + 66, GY + 9, "*E*", "rc-g s-ink", "start", 36);
    // le fil du bas, et celui qui part de la borne (2) : il court-circuite le générateur
    poly(L, [[XL, YB], [XR, YB]]);
    this.w2 = E("g", {}, L);
    poly(this.w2, [[C2.x, C2.y], [X2, C2.y], [X2, YB]]);
    E("circle", { cx: X2, cy: YB, r: 5.5, class: "s-ink" }, this.w2);
    // le fil du haut : du pivot à R, de R à l'armature A
    poly(L, [[PV.x, YT], [RX0, YT]]);
    poly(L, [[RX1, YT], [XR, YT], [XR, YA]]);
    poly(L, [[XR, YBP], [XR, YB]]);
    // le conducteur ohmique
    E("rect", { x: RX0, y: YT - 15, width: RX1 - RX0, height: 30, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    lab(L, (RX0 + RX1) / 2, YT - 26, "*R*", "rc-l s-ink", "middle", 26);
    // l'interrupteur K à deux positions : deux bornes, un pivot, un levier (comme dans le schéma du montage)
    E("circle", { cx: C1.x, cy: C1.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, L);
    lab(L, C1.x, C1.y - 22, "(1)", "rc-l s-ink", "middle", 26);
    E("circle", { cx: C2.x, cy: C2.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, L);
    lab(L, C2.x, C2.y + 38, "(2)", "rc-l s-ink", "middle", 26);
    this.lev = line(L, PV.x, PV.y, C1.x, C1.y, "k-ink", 5);
    E("circle", { cx: PV.x, cy: PV.y, r: 7, class: "s-ink" }, L);
    lab(L, PV.x + 4, PV.y - 30, "K", "rc-l s-ink", "start", 26);
    // le condensateur : A en haut, B en bas, l'isolant entre les deux
    E("rect", { x: XR - PW / 2, y: YA + 3, width: PW, height: YBP - YA - 6, class: "f-c" }, L);
    line(L, XR - PW / 2, YA, XR + PW / 2, YA, "k-ink", 6);
    line(L, XR - PW / 2, YBP, XR + PW / 2, YBP, "k-ink", 6);
    lab(L, XR - PW / 2 - 14, YA + 12, "A", "rc-g s-ink", "end", 36);
    lab(L, XR - PW / 2 - 14, YBP + 12, "B", "rc-g s-ink", "end", 36);
    // les charges : quatre places par armature, du centre vers les bords, hors de l'isolant
    this.qA = SLOTS.map((o) => Object.assign(charge(L, XR + o, YA - 24, true), { o }));
    this.qB = SLOTS.map((o) => Object.assign(charge(L, XR + o, YBP + 24, false), { o }));
    // la flèche i, à la charge : sens conventionnel, du pôle + du générateur vers A ; son trait suit i
    this.ai = E("g", {}, L);
    this.aiL = line(this.ai, RX1 + 28, YT, XR - 12, YT, "k-a", 6, { "marker-end": "url(#rcarwA)" });
    lab(this.ai, (RX1 + XR + 16) / 2, YT - 26, "*i*", "rc-g s-a", "middle", 36);
    // à la décharge : la flèche de convention (la même, mais en encre : elle définit i sans le donner) …
    this.ac = E("g", {}, L);
    line(this.ac, RX1 + 28, YT, XR - 12, YT, "k-ink", 4, { "marker-end": "url(#rcarw)" });
    lab(this.ac, (RX1 + XR + 16) / 2, YT - 26, "*i*", "rc-g s-ink", "middle", 36);
    // … et le sens réel du courant, à l'inverse : sous R, de A vers K, en rouge, caché jusqu'à la réponse
    this.ar = E("g", {}, L);
    this.arL = line(this.ar, RX1 - 6, YT + 36, RX0 + 6, YT + 36, "k-a", 6, { "marker-end": "url(#rcarwA)" });
    lab(this.ar, RX0 - 36, YT + 72, "sens réel", "rc-l s-a", "start", 26);
    // la flèche u_C : de B vers A, à l'opposé de i (convention récepteur)
    this.au = E("g", {}, L);
    this.auL = line(this.au, XR + PW / 2 + 28, YBP, XR + PW / 2 + 28, YA, "k-ink", 4, { "marker-end": "url(#rcarw)" });
    lab(this.au, XR + PW / 2 + 42, (YA + YBP) / 2 + 12, "*u*_{C}", "rc-g s-ink", "start", 36);

    /* ----- les lectures ----- */
    this.rt = lab(g, XRO, RY[0], "", "rc-l s-ink", "start", 26);
    this.ru = lab(g, XRO, RY[1], "", "rc-l s-ink", "start", 26);
    this.ri = lab(g, XRO, RY[2], "", "rc-l s-a", "start", 26);
    this.rr = lab(g, XRO, RY[3], "", "rc-l s-ink", "start", 26);
    this.rs = lab(g, XRO, RY[4], "", "rc-l s-ink", "start", 26);
  },

  /** ce qui change de loi avec le mode (charge ou décharge) : les courbes entières, les repères, les graduations de i */
  loi(dec) {
    this.mode = dec;
    const uF = (s) => (dec ? uDech(s) : uC(s)), iF = (s) => (dec ? iDech(s) : iC(s)), YIm = dec ? YID : YI;
    const d = courbe(uF, 0, TM, X, YU, 160);
    this.uGh.setAttribute("d", d); this.uFull.setAttribute("d", d);
    this.iGh.setAttribute("d", courbe(iF, 0, TM, X, YIm, 160));
    this.iZero.style.opacity = dec ? 1 : 0;
    setFx(this.iTop, dec ? "0" : fr(I0 * 1e3, 1)); setFx(this.iBot, dec ? "−" + fr(I0 * 1e3, 1) : "");
    this.nt.forEach((q) => {
      const t = q.n * TAU, f = q.n === 5 ? 1 : 0;
      setC(q.du, X(t), YU(uF(t))); setC(q.di, X(t), YIm(iF(t)));
      setFx(q.lu, `${fr((dec ? dechPart(q.n) : chargePart(q.n)) * 100, f)} %`); setFx(q.li, `${fr(dechPart(q.n) * 100, f)} %`);
      // un point qui monte porte son étiquette sous lui, un point qui descend la porte au-dessus
      setY(q.lu, YU(uF(t)) + (dec ? -14 : 34)); setY(q.li, YIm(iF(t)) + (dec ? 34 : -14));
    });
  },

  render() {
    const p = this.p, t = clamp(p.t, 0, TM), ic = clamp(p.ic, 0, 1), dis = clamp(p.dis, 0, 1), cu = clamp(p.cu, 0, 1);
    const dec = dis >= 0.5 ? 1 : 0;
    if (dec !== this.mode) this.loi(dec);
    const uF = dec ? uDech : uC, iF = dec ? iDech : iC, YIm = dec ? YID : YI;
    const fu = uF(t) / E_V, fi = Math.abs(iF(t)) / I0;                    // u_C / E et |i| / I₀
    // l'axe des temps : sous le premier graphique tant que i ne paraît pas, sous le second ensuite
    const yb = UB + (IB - UB) * ic;
    if (this._yb !== yb) {
      this._yb = yb;
      this.tk.forEach(([el, off, kind]) => { if (kind === "tick") { el.setAttribute("y1", yb.toFixed(1)); el.setAttribute("y2", (yb + off).toFixed(1)); } else setY(el, yb + off); });
      this.nt.forEach((q) => { q.ln.setAttribute("y2", yb.toFixed(1)); setY(q.tl, yb + 62); });
    }
    // le repère vertical et les points
    const x = X(t);
    setL(this.cr, x, UT - 6, x, yb);
    setC(this.uD, x, YU(uF(t))); setC(this.iD, x, YIm(iF(t)));
    // la partie déjà vécue des deux courbes
    const n = Math.max(2, Math.round((160 * t) / TM));
    this.uLv.setAttribute("d", courbe(uF, 0, t, X, YU, n));
    this.iLv.setAttribute("d", courbe(iF, 0, t, X, YIm, n));
    show(this.iG, ic); show(this.iLab, ic);
    show(this.uGh, cu * (1 - clamp(p.lect, 0, 1))); show(this.uFull, clamp(p.lect, 0, 1) * cu); show(this.uLv, cu); show(this.uD, cu); show(this.lcG, clamp(p.lect, 0, 1));
    show(this.trG, p.trans); show(this.perG, p.trans);
    this.nt.forEach((q, j) => { const o = Math.max(clamp(p.taus * 5 - j, 0, 1), j === 0 ? clamp(p.tau1, 0, 1) : 0); show(q.g, o * cu); show(q.i, ic); });
    // le circuit : les charges suivent q = C u_C (elles quittent les armatures par le fil à la décharge), la flèche i suit i
    const pose = (q, j) => { const o = clamp(fu * SLOTS.length - j, 0, 1); show(q.g, o); poseCharge(q, XR + q.o * (0.85 + 0.15 * o)); };
    this.qA.forEach(pose); this.qB.forEach(pose);
    const a = ANG * (2 * dis - 1);                                        // le levier : en (1) à la charge, en (2) à la décharge
    setL(this.lev, PV.x, PV.y, PV.x - LEV * Math.cos(a), PV.y + LEV * Math.sin(a));
    show(this.gen, 1 - 0.7 * dis); show(this.w2, 0.35 + 0.65 * dis);
    this.aiL.setAttribute("stroke-width", (1.5 + 4.5 * fi).toFixed(2)); show(this.ai, (1 - dis) * ic * (0.3 + 0.7 * fi) * clamp(fi / 0.05, 0, 1));
    show(this.ac, dis);
    this.arL.setAttribute("stroke-width", (1.5 + 4.5 * fi).toFixed(2)); show(this.ar, dis * ic * (0.3 + 0.7 * fi) * clamp(fi / 0.05, 0, 1));
    this.auL.setAttribute("stroke-width", (2 + 2.5 * fu).toFixed(2)); show(this.au, 0.3 + 0.7 * fu);
    // les lectures
    const ur = dec ? -uDech(t) : uR(t);
    setFx(this.rt, `*t* = ${fr(t, 1)} s`);
    setFx(this.ru, `*u*_{C} = ${fr(uF(t), 1)} V`);
    setFx(this.ri, `*i* = ${fr(iF(t) * 1e3, 2)} mA`); show(this.ri, ic);
    setFx(this.rr, `*u*_{R} = *R* *i* = ${fr(ur, 1)} V`); show(this.rr, ic);
    setFx(this.rs, `*u*_{R} + *u*_{C} = ${fr(ur + uF(t), 1)} V`); show(this.rs, ic);
  },
});
}
