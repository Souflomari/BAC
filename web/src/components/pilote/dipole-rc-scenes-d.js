/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RC » (V3), quatrième partie : `couple`, le circuit et les courbes u_C(t) et i(t)
 * montrés ensemble, liés par le même instant t (procédé 6 du rapport 10, maquette « Dipôle RC »).
 *
 * Une seule grandeur pilote tout : l'instant `t` (en secondes). Le circuit (les charges des armatures A
 * et B, la flèche i dont le trait suit i, la flèche u_C), le repère vertical commun aux deux courbes, les
 * deux points et les lectures chiffrées en sont des fonctions : rien n'est posé à l'œil. Les valeurs
 * viennent de `dipole-rc-outils.js` (E, R, C, τ, u_C(t), i(t)) ; la loi des mailles u_R + u_C = E se lit
 * à chaque instant dans la dernière ligne.
 *
 * Disposition (la toile mesure 1 000 × 720, et 390 px de large sur un téléphone) : le circuit à gauche et
 * les lectures à droite en haut, les deux courbes empilées dessous, sur le même axe des temps. Pas de deux
 * panneaux côte à côte : ils seraient trop petits.
 *
 * Exactitude physique : les charges sont dessinées sur les faces extérieures des armatures, jamais dans
 * l'isolant ; la flèche i suit le sens conventionnel (du pôle + du générateur vers A) ; u_C part de B vers A,
 * à l'opposé de i (convention récepteur) ; u_R + u_C = E à tout instant.
 *
 * Paramètres :
 *   t      l'instant, en s (0 à 6τ) : le repère vertical, les charges, les lectures
 *   ic     0 → 1 : tout ce qui dit i (la flèche, la courbe, le point, u_R et les lectures de i) ; à 0, la
 *          scène ne donne pas i (la réponse d'une question sur i va dans `reveal`)
 *   taus   0 → 1 : les repères τ … 5τ avec ce qui est atteint (u_C) et ce qui reste (i) ; tau1 : le repère τ seul
 *   trans  le régime transitoire (0 à 5τ) et le régime permanent
 * Couleurs : des classes seulement. Le rouge n'est donné qu'à i (la flèche, la courbe, le point, la lecture).
 */
import { E_V, R_OHM, C_F, TAU, I0, uC, uR, iC, chargePart, dechPart, fr } from "./dipole-rc-outils";

export function scenesD(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab, courbe } = O;

/* ---------- la géométrie : tout est calculé ici ---------- */
const TM = 6 * TAU;                                         // la fin de l'axe des temps : 6τ
const X0 = 150, X1 = 900, X = (t) => X0 + ((X1 - X0) * t) / TM;
const UT = 352, UB = 470;                                   // la courbe u_C : le haut (u = E) et l'axe des temps
const IT = 530, IB = 634;                                   // la courbe i : le haut (i = I₀) et l'axe des temps
const YU = (u) => UB - ((UB - UT) * u) / E_V;
const YI = (i) => IB - ((IB - IT) * i) / I0;
const XL = 90, XR = 450, YT = 142, YB = 286;                // la boucle : rails gauche et droit, fil du haut, fil du bas
const GY = 214, GR = 28;                                    // le générateur
const YA = 204, YBP = 242, PW = 120;                        // armatures A (haut) et B (bas), largeur
const SLOTS = [17, -17, 47, -47];                           // les charges, du centre vers les bords (le fil passe au centre)
const XRO = 650;
const K0 = XL + 50, K1 = XL + 110, RX0 = XL + 170, RX1 = XL + 250;   // l'interrupteur et le conducteur ohmique                                            // les lectures

const line = (parent, x1, y1, x2, y2, cls = "k-ink", w = 3.5, extra = {}) => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const poly = (parent, pts, cls = "k-ink", w = 3.5) => E("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" "), class: cls + " nofill", "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
/** une charge : un cercle avec un + (armature A) ou un − (armature B) */
function charge(parent, x, y, plus) {
  const g = E("g", {}, parent);
  E("circle", { cx: x, cy: y, r: 11, class: "s-bg k-ink", "stroke-width": 2.5 }, g);
  line(g, x - 5.5, y, x + 5.5, y, "k-ink", 2.6);
  if (plus) line(g, x, y - 5.5, x, y + 5.5, "k-ink", 2.6);
  return g;
}
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };

scene("couple", {
  p: { t: 0, ic: 0, taus: 0, tau1: 0, trans: 0 },
  build(g) {
    this.ti = titre(g, "Le circuit et les courbes, au même instant", `*E* = ${fr(E_V, 0)} V · *R* = ${fr(R_OHM / 1e3, 0)} kΩ · *C* = ${fr(C_F * 1e6, 0)} µF`);

    /* ----- les deux courbes, sur le même axe des temps ----- */
    const Gc = E("g", {}, g);
    // le régime transitoire (0 à 5τ) et le régime permanent
    this.trG = E("g", {}, Gc);
    const trB = E("rect", { x: X(0), y: UT, width: X(5 * TAU) - X(0), height: UB - UT, class: "f-c" }, this.trG);
    trB.style.opacity = 0.4;
    lab(this.trG, (X(0) + X(5 * TAU)) / 2, UB - 12, "régime transitoire", "rc-l s-ink", "middle", 26);
    // les axes
    line(Gc, X0, UB, X1 + 10, UB, "k-dim", 2);
    line(Gc, X0, UT - 12, X0, UB, "k-dim", 2);
    line(Gc, X0, IB, X1 + 10, IB, "k-dim", 2);
    line(Gc, X0, IT - 12, X0, IB, "k-dim", 2);
    line(Gc, X0, UT, X1, UT, "k-dim", 2.5, { "stroke-dasharray": "8 8" });
    lab(Gc, X0 - 12, UT + 8, fr(E_V, 0), "t-sous s-c", "end", 22);
    lab(Gc, X0 - 12, IT + 8, fr(I0 * 1e3, 1), "t-sous s-c", "end", 22);
    lab(Gc, X0, UT - 20, "*u*_{C} (V)", "rc-l s-c", "start", 26);
    lab(Gc, X0, IT - 20, "*i* (mA)", "rc-l s-c", "start", 26);
    for (let s = 0; s <= TM + 1e-9; s += 2) {
      line(Gc, X(s), IB, X(s), IB + 7, "k-dim", 2);
      lab(Gc, X(s), IB + 32, fr(s, 0), "t-sous s-c", "middle", 22);
    }
    lab(Gc, X1 + 16, IB + 32, "*t* (s)", "rc-l s-c", "start", 26);
    // la courbe entière en pointillé (ce qui viendra), puis la partie déjà vécue, épaisse
    this.uGh = E("path", { d: courbe((t) => uC(t), 0, TM, X, YU, 160), class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, Gc);
    this.iG = E("g", {}, Gc);
    this.iGh = E("path", { d: courbe((t) => iC(t), 0, TM, X, YI, 160), class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, this.iG);
    this.iLv = E("path", { class: "k-a nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, this.iG);
    this.uLv = E("path", { class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, Gc);
    // les repères τ … 5τ : un trait, deux points, ce qui est atteint (u_C) et ce qui reste (i)
    this.nt = [1, 2, 3, 4, 5].map((n) => {
      const sg = E("g", {}, Gc), t = n * TAU;
      line(sg, X(t), UT, X(t), IB, "k-dim", 2, { "stroke-dasharray": "5 7" });
      E("circle", { cx: X(t), cy: YU(uC(t)), r: 6.5, class: "s-ink" }, sg);
      lab(sg, X(t), IB + 62, n === 1 ? "*τ*" : `${n}*τ*`, "rc-tt s-c", "middle", 32);
      lab(sg, X(t) + 12, YU(uC(t)) + 34, `${fr(chargePart(n) * 100, n === 5 ? 1 : 0)} %`, "rc-l s-ink", "start", 26);
      const ig = E("g", {}, sg);
      E("circle", { cx: X(t), cy: YI(iC(t)), r: 6.5, class: "s-a" }, ig);
      lab(ig, X(t) + 12, YI(iC(t)) - 14, `${fr(dechPart(n) * 100, n === 5 ? 1 : 0)} %`, "rc-l s-ink", "start", 26);
      return { g: sg, i: ig };
    });
    // le repère vertical commun, et les deux points
    this.cr = line(Gc, 0, UT - 6, 0, IB, "k-ink", 2, { "stroke-dasharray": "4 5" });
    this.uD = E("circle", { r: 8.5, class: "s-ink" }, Gc);
    this.iD = E("circle", { r: 8.5, class: "s-a" }, this.iG);
    // « permanent » se pose par-dessus le repère vertical, qui passe derrière le mot
    this.perG = E("g", {}, Gc);
    lab(this.perG, X(5 * TAU) + 8, UB - 12, "permanent", "rc-l rc-halo s-ink", "start", 26);

    /* ----- le circuit ----- */
    const L = E("g", {}, g);
    poly(L, [[XL, GY - GR], [XL, YT], [K0, YT]]);
    poly(L, [[K1, YT], [RX0, YT]]);
    poly(L, [[RX1, YT], [XR, YT], [XR, YA]]);
    poly(L, [[XR, YBP], [XR, YB], [XL, YB], [XL, GY + GR]]);
    // le générateur, et sa flèche E vers le haut
    E("circle", { cx: XL, cy: GY, r: GR, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    line(L, XL + 52, GY + 29, XL + 52, GY - 27, "k-ink", 4, { "marker-end": "url(#rcarw)" });
    lab(L, XL + 66, GY + 9, "*E*", "rc-g s-ink", "start", 36);
    // l'interrupteur K, fermé
    E("circle", { cx: K0, cy: YT, r: 6, class: "s-bg k-ink", "stroke-width": 3 }, L);
    E("circle", { cx: K1, cy: YT, r: 6, class: "s-bg k-ink", "stroke-width": 3 }, L);
    line(L, K0, YT, K1, YT, "k-ink", 5);
    lab(L, (K0 + K1) / 2, YT - 22, "K", "rc-l s-ink", "middle", 26);
    // le conducteur ohmique
    E("rect", { x: RX0, y: YT - 15, width: RX1 - RX0, height: 30, class: "s-bg k-ink", "stroke-width": 3.5 }, L);
    lab(L, (RX0 + RX1) / 2, YT - 26, "*R*", "rc-l s-ink", "middle", 26);
    // le condensateur : A en haut, B en bas, l'isolant entre les deux
    E("rect", { x: XR - PW / 2, y: YA + 3, width: PW, height: YBP - YA - 6, class: "f-c" }, L);
    line(L, XR - PW / 2, YA, XR + PW / 2, YA, "k-ink", 6);
    line(L, XR - PW / 2, YBP, XR + PW / 2, YBP, "k-ink", 6);
    lab(L, XR - PW / 2 - 14, YA + 12, "A", "rc-g s-ink", "end", 36);
    lab(L, XR - PW / 2 - 14, YBP + 12, "B", "rc-g s-ink", "end", 36);
    // les charges : quatre places par armature, du centre vers les bords, hors de l'isolant
    this.qA = SLOTS.map((o) => charge(L, XR + o, YA - 22, true));
    this.qB = SLOTS.map((o) => charge(L, XR + o, YBP + 22, false));
    // la flèche i : sens conventionnel, du pôle + du générateur vers A ; son trait suit i
    this.ai = E("g", {}, L);
    this.aiL = line(this.ai, RX1 + 28, YT, XR - 12, YT, "k-a", 6, { "marker-end": "url(#rcarwA)" });
    lab(this.ai, (RX1 + XR + 16) / 2, YT - 26, "*i*", "rc-g s-a", "middle", 36);
    // la flèche u_C : de B vers A, à l'opposé de i (convention récepteur)
    this.au = E("g", {}, L);
    this.auL = line(this.au, XR + PW / 2 + 28, YBP, XR + PW / 2 + 28, YA, "k-ink", 4, { "marker-end": "url(#rcarw)" });
    lab(this.au, XR + PW / 2 + 42, (YA + YBP) / 2 + 12, "*u*_{C}", "rc-g s-ink", "start", 36);

    /* ----- les lectures ----- */
    this.rt = lab(g, XRO, 135, "", "rc-l s-ink", "start", 26);
    this.ru = lab(g, XRO, 172, "", "rc-l s-ink", "start", 26);
    this.ri = lab(g, XRO, 209, "", "rc-l s-a", "start", 26);
    this.rr = lab(g, XRO, 246, "", "rc-l s-ink", "start", 26);
    this.rs = lab(g, XRO, 283, "", "rc-l s-ink", "start", 26);
  },

  render() {
    const p = this.p, t = clamp(p.t, 0, TM), ic = clamp(p.ic, 0, 1);
    const fu = uC(t) / E_V, fi = iC(t) / I0;                    // u_C / E et i / I₀
    // le repère vertical et les points
    const x = X(t);
    setL(this.cr, x, UT - 6, x, IB);
    setC(this.uD, x, YU(uC(t))); setC(this.iD, x, YI(iC(t)));
    // la partie déjà vécue des deux courbes
    const n = Math.max(2, Math.round((160 * t) / TM));
    this.uLv.setAttribute("d", courbe((s) => uC(s), 0, t, X, YU, n));
    this.iLv.setAttribute("d", courbe((s) => iC(s), 0, t, X, YI, n));
    show(this.iG, ic);
    show(this.trG, p.trans); show(this.perG, p.trans);
    this.nt.forEach((q, j) => { const o = Math.max(clamp(p.taus * 5 - j, 0, 1), j === 0 ? clamp(p.tau1, 0, 1) : 0); show(q.g, o); show(q.i, ic); });
    // le circuit : les charges suivent q = C u_C, la flèche i suit i
    this.qA.forEach((c, j) => show(c, clamp(fu * SLOTS.length - j, 0, 1)));
    this.qB.forEach((c, j) => show(c, clamp(fu * SLOTS.length - j, 0, 1)));
    this.aiL.setAttribute("stroke-width", (1.5 + 4.5 * fi).toFixed(2)); show(this.ai, ic * (0.3 + 0.7 * fi) * clamp(fi / 0.05, 0, 1));
    this.auL.setAttribute("stroke-width", (2 + 2.5 * fu).toFixed(2)); show(this.au, 0.3 + 0.7 * fu);
    // les lectures
    setFx(this.rt, `*t* = ${fr(t, 1)} s`);
    setFx(this.ru, `*u*_{C} = ${fr(uC(t), 1)} V`);
    setFx(this.ri, `*i* = ${fr(iC(t) * 1e3, 2)} mA`); show(this.ri, ic);
    setFx(this.rr, `*u*_{R} = *R* *i* = ${fr(uR(t), 1)} V`); show(this.rr, ic);
    setFx(this.rs, `*u*_{R} + *u*_{C} = ${fr(uR(t) + uC(t), 1)} V`); show(this.rs, ic);
  },
});
}
