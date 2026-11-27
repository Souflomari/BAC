/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dipôle RL » (V3), quatrième partie : `couple`, le circuit et les courbes i(t) et u_L(t)
 * montrés ensemble, liés par le même instant t (copie adaptée de `couple` de la leçon sur le dipôle RC :
 * des lignes de champ dans la bobine, en nombre proportionnel à i, remplacent les charges des armatures).
 *
 * Une seule grandeur pilote tout : l'instant `t` (en secondes). Le circuit (les lignes de champ dans la
 * bobine, la flèche i dont le trait suit i, la flèche u_L), le repère vertical commun aux deux courbes, les
 * deux points et les lectures chiffrées en sont des fonctions : rien n'est posé à l'œil. Les valeurs
 * viennent de `dipole-rl-outils.js` ; la loi des mailles se lit à chaque instant dans la dernière ligne
 * (u_R + u_L = E à l'établissement, 0 à la rupture).
 *
 * Disposition (la toile mesure 1 000 × 720, et 390 px de large sur un téléphone) : le circuit en haut à
 * gauche et les lectures à sa droite, les deux courbes empilées dessous (i en haut, u_L en bas), sur le même
 * axe des temps, en millisecondes. L'axe de u_L passe par zéro : u_L change de signe à la rupture.
 *
 * Exactitude physique : i est continu (la courbe part de 0 à l'établissement, de I₀ à la rupture), u_L saute ;
 * la flèche i suit le sens conventionnel (du pôle + du générateur vers le haut de la bobine) et ne change pas
 * de sens à la rupture ; u_L est fléchée vers le haut, à l'opposé de i (convention récepteur). Les lignes de
 * champ sont qualitatives : leur nombre suit |i|, leur sens n'est pas dessiné.
 *
 * Paramètres :
 *   jeu    'etab' (K en 1, puis en 2) | 'triangle' (un générateur impose un courant triangulaire)
 *   t      l'instant, en s (0 à 6τ ; 0 à 20 ms en 'triangle') : le repère vertical, les lignes de champ, les lectures
 *   dis    0 → 1 : 0 l'établissement (K en 1), 1 la rupture (K en 2, depuis le régime permanent) ; le levier de K
 *          pivote avec ce paramètre, et les courbes changent de loi à mi-course
 *   ic     0 → 1 : tout ce qui dit i (la flèche, la courbe et son axe, le point, les lectures de i) ; à 0, la scène
 *          ne donne pas i (la réponse d'une question sur i va dans `reveal`)
 *   ul     0 → 1 : tout ce qui dit u_L (la courbe, son axe, le point, les lectures de u_L, u_R et leur somme)
 *   r2     0 ou 1 : le conducteur ohmique R₂ sur le fil de la borne (2)
 *   ech    0 → 1 : l'échelle de u_L, ±6 V puis ±120 V (le changement est animé)
 *   tau1   0 → 1 : le repère τ (un trait vertical) ; lect : le point de i à τ et sa lecture à 37 % de I₀
 *   trans  le régime transitoire (0 à 5τ) et le régime permanent
 *   sub    un sous-titre imposé (sinon : les valeurs du montage, ou, au triangle, la phrase sans valeur) : une étape qui
 *          demande une de ces valeurs (r, L) impose un sous-titre qui ne la donne pas
 * Couleurs : des classes seulement. Le rouge n'est donné qu'à i (la flèche, la courbe, le point, la lecture).
 */
import {
  E_V, R_OHM, R_BOB, L_H, TAU, I0, T_MAX, R2_OHM, TRI, UL_INF, I_37, iEt, uLt, uRt, iRup, uLRup, triI, triU, fr,
} from "./dipole-rl-outils";

export function scenesD(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { setFx, titre, lab, courbe } = O;

/* ---------- la géométrie : tout est calculé ici ---------- */
const TMT = 4 * TRI.demi;                                   // l'axe des temps du triangle : deux périodes
const X0 = 150, X1 = 900;
const IT = 372, IB = 472;                                   // le graphique de i : le haut et le bas
const UT = 532, UB = 652;                                   // le graphique de u_L : le haut et le bas
const XL = 110, XR = 600, TOP = 150, YT = 174, YB = 308;    // la boucle : rails gauche et droit, fil du générateur, fil du haut, fil du bas
const GY = (TOP + YB) / 2, GR = 28;                         // le générateur
const PV = { x: 380, y: YT }, LEV = 86, DY = YT - TOP, DX = Math.sqrt(LEV * LEV - DY * DY), ANG = Math.atan2(DY, DX);
const C1 = { x: PV.x - DX, y: TOP }, C2 = { x: PV.x - DX, y: YT + DY }, X2 = 225;
const RX0 = 420, RX1 = 515;                                 // le conducteur ohmique
const BY0 = 192, BT = 5, BP = 20, BY1 = BY0 + BT * BP;      // la bobine : haut, spires, pas, bas
const NLIG = 4;                                             // les lignes de champ, au plus
const XRO = 770;                                            // les lectures
const RY = [150, 186, 222, 258, 294];                       // leurs lignes

const line = (parent, x1, y1, x2, y2, cls = "k-ink", w = 3.5, extra = {}) => E("line", { x1, y1, x2, y2, class: cls, "stroke-width": w, "stroke-linecap": "round", ...extra }, parent);
const poly = (parent, pts, cls = "k-ink", w = 3.5) => E("path", { d: pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" "), class: cls + " nofill", "stroke-width": w, "stroke-linejoin": "round", "stroke-linecap": "round" }, parent);
function helice(parent, cx, y0, turns, pitch, rx, ry, wf = 4, wb = 2.2) {
  const n = Math.round(turns * 28), pts = [];
  for (let k = 0; k <= n; k++) { const th = Math.PI / 2 + (2 * Math.PI * turns * k) / n; pts.push([cx + rx * Math.cos(th), y0 + pitch * turns * k / n + ry * (Math.sin(th) - 1), Math.sin(th)]); }
  let df = "", db = "";
  for (let k = 1; k <= n; k++) {
    const a = pts[k - 1], b = pts[k], seg = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    if (a[2] + b[2] >= 0) df += seg; else db += seg;
  }
  E("path", { d: db, class: "k-dim nofill", "stroke-width": wb, "stroke-linecap": "round" }, parent);
  E("path", { d: df, class: "k-ink nofill", "stroke-width": wf, "stroke-linecap": "round" }, parent);
}
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };
const setY = (t, y) => t.setAttribute("y", y.toFixed(1));

scene("couple", {
  p: { jeu: "etab", t: 0, dis: 0, ic: 0, ul: 1, r2: 0, ech: 0, tau1: 0, lect: 0, trans: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "Le circuit et les courbes, au même instant", "");
    this.mode = "";

    /* ----- les deux courbes, sur le même axe des temps ----- */
    const Gc = E("g", {}, g);
    this.trG = E("g", {}, Gc);                                                // le régime transitoire (0 à 5τ) et le régime permanent
    this.trB = E("rect", { y: IT - 12, height: UB - IT + 12, class: "f-c" }, this.trG); this.trB.style.opacity = 0.4;
    this.trL = lab(this.trG, 0, IB - 12, "régime transitoire", "rl-l rl-halo s-ink", "middle", 26);
    this.perL = lab(this.trG, 0, IB - 12, "permanent", "rl-l rl-halo s-ink", "start", 26);
    line(Gc, X0, UB, X1 + 10, UB, "k-dim", 2);                               // l'axe des temps, toujours là
    this.tkG = E("g", {}, Gc);                                                // ses graduations : elles suivent l'axe des temps du jeu
    // le graphique de i
    this.iG = E("g", {}, Gc);
    line(this.iG, X0, IT - 12, X0, IB, "k-dim", 2);
    this.iZero = line(this.iG, X0, IB, X1 + 10, IB, "k-dim", 2);
    this.iL = [0, 1, 2].map(() => lab(this.iG, X0 - 12, 0, "", "t-sous s-c", "end", 22));
    this.iLab = lab(this.iG, X0 + 14, IT - 28, "*i* (mA)", "rl-l rl-halo s-c", "start", 26);
    this.iGh = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, this.iG);
    this.iLv = E("path", { class: "k-a nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, this.iG);
    // le graphique de u_L
    this.uG = E("g", {}, Gc);
    line(this.uG, X0, UT - 12, X0, UB, "k-dim", 2);
    this.uZero = line(this.uG, X0, 0, X1, 0, "k-dim", 2, { "stroke-dasharray": "3 8" });
    this.uL = [0, 1, 2, 3, 4].map(() => lab(this.uG, X0 - 12, 0, "", "t-sous s-c", "end", 22));
    this.uLab = lab(this.uG, X0 + 14, UT - 28, "*u*_{L} (V)", "rl-l rl-halo s-c", "start", 26);
    this.uGh = E("path", { class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "6 7" }, this.uG);
    this.uLv = E("path", { class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round" }, this.uG);
    this.jmp = E("g", {}, this.uG);                                          // le saut de u_L à t = 0
    this.jL = line(this.jmp, 0, 0, 0, 0, "k-ink", 3, { "stroke-dasharray": "5 6" });
    this.jD = E("circle", { r: 6.5, class: "s-bg k-ink", "stroke-width": 2.5 }, this.jmp);
    // le repère τ, et la lecture de i à τ : 37 % de I₀ à la rupture
    this.t1G = E("g", {}, Gc);
    this.t1L = line(this.t1G, 0, 0, 0, 0, "k-dim", 2, { "stroke-dasharray": "5 7" });
    this.t1T = lab(this.t1G, 0, 0, "*τ*", "rl-tt s-c", "middle", 32);
    this.lcG = E("g", {}, this.iG);
    this.lcH = line(this.lcG, 0, 0, 0, 0, "k-ink", 2.5, { "stroke-dasharray": "3 8" });
    this.lcD = E("circle", { r: 7.5, class: "s-a" }, this.lcG);
    this.lcT = lab(this.lcG, 0, 0, "", "rl-l s-ink", "start", 26);
    // le repère vertical commun, et les deux points
    this.cr = line(Gc, 0, IT - 6, 0, UB, "k-ink", 2, { "stroke-dasharray": "4 5" });
    this.uD = E("circle", { r: 8.5, class: "s-ink" }, this.uG);
    this.iD = E("circle", { r: 8.5, class: "s-a" }, this.iG);

    /* ----- le circuit ----- */
    const L = E("g", {}, g);
    // le générateur de tension et son fil : ils s'estompent à la rupture (K en 2 : le générateur est hors de la maille)
    this.gen = E("g", {}, L);
    this.wE = E("g", {}, this.gen);                                          // le fil qui monte du générateur jusqu'à la borne (1)
    poly(this.wE, [[XL, GY - GR], [XL, TOP], [C1.x, TOP]]);
    poly(this.gen, [[XL, GY + GR], [XL, YB]]);
    E("circle", { cx: XL, cy: GY, r: GR, class: "s-bg k-ink", "stroke-width": 3.5 }, this.gen);
    this.gE = E("g", {}, this.gen);
    line(this.gE, XL + 52, GY + 29, XL + 52, GY - 27, "k-ink", 4, { "marker-end": "url(#rlarw)" });
    lab(this.gE, XL + 66, GY + 9, "*E*", "rl-g s-ink", "start", 36);
    this.gI = E("g", {}, this.gen);                                          // un générateur de courant : un trait à travers le cercle
    line(this.gI, XL - GR, GY, XL + GR, GY, "k-ink", 3.5);
    // le triangle : le fil du haut va droit du générateur à la bobine
    this.wT = E("g", {}, L);
    poly(this.wT, [[XL, GY - GR], [XL, YT], [XR, YT]]);
    // le fil du bas
    poly(L, [[XL, YB], [XR, YB]]);
    // tout ce qui est de K, de R et de R₂
    this.kg = E("g", {}, L);
    this.w2 = E("g", {}, this.kg);
    poly(this.w2, [[C2.x, C2.y], [X2, C2.y], [X2, YB]]);
    E("circle", { cx: X2, cy: YB, r: 5.5, class: "s-ink" }, this.w2);
    this.r2g = E("g", {}, this.kg);
    E("rect", { x: X2 - 13, y: 234, width: 26, height: 50, class: "s-bg k-ink", "stroke-width": 3 }, this.r2g);
    lab(this.r2g, X2 + 26, 266, "*R*_{2}", "rl-l s-ink", "start", 26);
    poly(this.kg, [[PV.x, YT], [RX0, YT]]);
    poly(this.kg, [[RX1, YT], [XR, YT]]);
    E("rect", { x: RX0, y: YT - 15, width: RX1 - RX0, height: 30, class: "s-bg k-ink", "stroke-width": 3.5 }, this.kg);
    lab(this.kg, (RX0 + RX1) / 2, YT - 26, "*R*", "rl-l s-ink", "middle", 26);
    E("circle", { cx: C1.x, cy: C1.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, this.kg);
    lab(this.kg, C1.x, C1.y - 22, "(1)", "rl-l s-ink", "middle", 26);
    E("circle", { cx: C2.x, cy: C2.y, r: 7, class: "s-bg k-ink", "stroke-width": 3 }, this.kg);
    lab(this.kg, C2.x + 24, C2.y + 38, "(2)", "rl-l s-ink", "middle", 26);
    this.lev = line(this.kg, PV.x, PV.y, C1.x, C1.y, "k-ink", 5);
    E("circle", { cx: PV.x, cy: PV.y, r: 7, class: "s-ink" }, this.kg);
    lab(this.kg, PV.x + 4, PV.y - 30, "K", "rl-l s-ink", "start", 26);
    // la bobine : les fils, les lignes de champ (sous le fil), l'hélice
    poly(L, [[XR, YT], [XR, BY0]]);
    poly(L, [[XR, BY1], [XR, YB]]);
    this.champ = Array.from({ length: NLIG }, (_, j) => { const x = XR + (j - (NLIG - 1) / 2) * 9; return line(L, x, BY0 + 2, x, BY1 - 5, "k-ink", 2.4); });
    helice(L, XR, BY0, BT, BP, 26, 7);
    lab(L, XR - 40, (BY0 + BY1) / 2 + 9, "(*L*, *r*)", "rl-l s-ink", "end", 26);
    // la flèche i : le sens conventionnel, du pôle + du générateur vers la bobine ; son trait suit |i|
    this.ai = E("g", {}, L);
    this.aiL = line(this.ai, RX1 + 22, YT, XR - 14, YT, "k-a", 6, { "marker-end": "url(#rlarwA)" });
    lab(this.ai, (RX1 + XR + 8) / 2, YT - 26, "*i*", "rl-g s-a", "middle", 36);
    // la flèche u_L : de bas en haut, à l'opposé de i (convention récepteur)
    this.au = E("g", {}, L);
    line(this.au, XR + 58, BY1 + 4, XR + 58, BY0 - 2, "k-ink", 4, { "marker-end": "url(#rlarw)" });
    lab(this.au, XR + 72, (BY0 + BY1) / 2 + 12, "*u*_{L}", "rl-g s-ink", "start", 36);

    /* ----- les lectures ----- */
    this.rt = lab(g, XRO, RY[0], "", "rl-l s-ink", "start", 26);
    this.ri = lab(g, XRO, RY[1], "", "rl-l s-a", "start", 26);
    this.rr = lab(g, XRO, RY[2], "", "rl-l s-ink", "start", 26);
    this.ru = lab(g, XRO, RY[3], "", "rl-l s-ink", "start", 26);
    this.rs = lab(g, XRO, RY[4], "", "rl-l s-ink", "start", 26);
  },

  /** l'axe des temps : ses graduations suivent le jeu (30 ms, ou 20 ms pour le triangle) */
  graduations(tri) {
    this.mode = tri ? "tri" : "etab";
    this.tkG.textContent = "";
    const TMs = tri ? TMT : T_MAX, X = (s) => X0 + ((X1 - X0) * s) / TMs;
    for (let s = 0; s <= TMs * 1e3 + 1e-6; s += 5) {
      line(this.tkG, X(s * 1e-3), UB, X(s * 1e-3), UB + 7, "k-dim", 2);
      lab(this.tkG, X(s * 1e-3), UB + 32, fr(s, 0), "t-sous s-c", "middle", 22);
    }
    lab(this.tkG, X1 + 16, UB + 32, "*t* (ms)", "rl-l s-c", "start", 26);
  },

  render() {
    const p = this.p, tri = p.jeu === "triangle";
    if (this.mode !== (tri ? "tri" : "etab")) this.graduations(tri);
    const TMs = tri ? TMT : T_MAX, X = (s) => X0 + ((X1 - X0) * s) / TMs;
    const t = clamp(p.t, 0, TMs), ic = clamp(p.ic, 0, 1), ul = clamp(p.ul, 0, 1), dis = tri ? 0 : clamp(p.dis, 0, 1), ech = clamp(p.ech, 0, 1);
    const dec = dis >= 0.5, R2 = p.r2 > 0.5 ? R2_OHM : 0;
    this.ti.set("Le circuit et les courbes, au même instant", p.sub || (tri ? "un courant triangulaire dans une bobine (*L*, *r*)" : `*E* = ${fr(E_V, 0)} V · *R* = ${fr(R_OHM, 0)} Ω · *r* = ${fr(R_BOB, 0)} Ω · *L* = ${fr(L_H, 2)} H`));
    // les lois du jeu : i en mA, u_L en V
    const iF = tri ? (s) => triI(s) * 1e3 : dec ? (s) => iRup(s, R2) * 1e3 : (s) => iEt(s) * 1e3;
    const uF = tri ? triU : dec ? (s) => uLRup(s, R2) : uLt;
    const [ilo, ihi] = tri ? [-TRI.imax * 1e3, TRI.imax * 1e3] : [0, I0 * 1e3];
    const ym = tri ? 3 : 6 + (120 - 6) * ech;
    const Yi = (v) => IB - ((IB - IT) * (v - ilo)) / (ihi - ilo), Yu = (v) => UB - ((UB - UT) * (v + ym)) / (2 * ym);
    // le fond : régime transitoire (hors triangle), axes
    show(this.trG, p.trans * (tri ? 0 : 1));
    this.trB.setAttribute("x", X(0).toFixed(1)); this.trB.setAttribute("width", Math.max(0, X(5 * TAU) - X(0)).toFixed(1));
    this.trL.setAttribute("x", ((X(0) + X(5 * TAU)) / 2).toFixed(1)); this.perL.setAttribute("x", (X(5 * TAU) + 8).toFixed(1));
    setL(this.iZero, X0, Yi(Math.max(ilo, 0)), X1 + 10, Yi(Math.max(ilo, 0)));
    const il = tri ? [ilo, 0, ihi] : [0, ihi / 2, ihi];
    this.iL.forEach((l, j) => { setFx(l, fr(il[j], 0)); setY(l, Yi(il[j]) + 7); });
    setFx(this.iLab, "*i* (mA)");
    const yl = ech >= 0.5 ? 120 : tri ? 3 : 6;
    this.uL.forEach((l, j) => { const v = ((j - 2) * yl) / 2; setFx(l, fr(v, Number.isInteger(v) ? 0 : 1)); setY(l, Yu((v * ym) / yl) + 7); });
    setFx(this.uLab, tri ? "*u* (V)" : "*u*_{L} (V)");
    setL(this.uZero, X0, Yu(0), X1, Yu(0));
    // le repère vertical et les points
    const x = X(t);
    setL(this.cr, x, IT - 6, x, UB);
    setC(this.uD, x, Yu(uF(t))); setC(this.iD, x, Yi(iF(t)));
    // les courbes entières en pointillé (ce qui viendra), puis la partie déjà vécue, épaisse
    this.iGh.setAttribute("d", courbe(iF, 0, TMs, X, Yi, 200)); this.uGh.setAttribute("d", courbe(uF, 0, TMs, X, Yu, 200));
    const n = Math.max(2, Math.round((200 * t) / TMs));
    this.iLv.setAttribute("d", courbe(iF, 0, t, X, Yi, n)); this.uLv.setAttribute("d", courbe(uF, 0, t, X, Yu, n));
    show(this.iG, ic); show(this.uG, ul);
    // le saut de u_L à t = 0 : de ce qu'elle valait juste avant à ce qu'elle vaut juste après
    const avant = tri ? 0 : dec ? UL_INF : 0, apres = uF(0);
    setL(this.jL, X(0), Yu(avant), X(0), Yu(apres)); setC(this.jD, X(0), Yu(avant)); show(this.jmp, tri ? 0 : 1);
    // le repère τ, la lecture de i à τ
    const xt = X(TAU);
    setL(this.t1L, xt, IT - 6, xt, UB); setY(this.t1T, UB + 70); this.t1T.setAttribute("x", xt.toFixed(1)); show(this.t1G, p.tau1 * (tri ? 0 : 1));
    const iT = iF(TAU);
    setC(this.lcD, xt, Yi(iT)); setL(this.lcH, X(0), Yi(iT), xt, Yi(iT));
    setFx(this.lcT, `${fr(iT, 1)} mA`); this.lcT.setAttribute("x", (xt + 16).toFixed(1)); setY(this.lcT, Yi(iT) - 14);
    show(this.lcG, p.lect * (tri ? 0 : 1) * ic);
    show(this.trG, p.trans * (tri ? 0 : 1));
    // le circuit : les lignes de champ suivent |i|, la flèche i suit i
    const fi = Math.abs(iF(t)) / (tri ? TRI.imax * 1e3 : I0 * 1e3);
    this.champ.forEach((c, j) => show(c, clamp(fi * NLIG - j, 0, 1)));
    const a = ANG * (2 * dis - 1);                                        // le levier : en (1) à l'établissement, en (2) à la rupture
    setL(this.lev, PV.x, PV.y, PV.x - LEV * Math.cos(a), PV.y + LEV * Math.sin(a));
    show(this.gen, tri ? 1 : 1 - 0.7 * dis); show(this.w2, 0.35 + 0.65 * dis); show(this.r2g, p.r2 > 0.5 ? 1 : 0);
    show(this.kg, tri ? 0 : 1); show(this.wE, tri ? 0 : 1); show(this.wT, tri ? 1 : 0); show(this.gE, tri ? 0 : 1); show(this.gI, tri ? 1 : 0);
    this.aiL.setAttribute("stroke-width", (1.5 + 4.5 * fi).toFixed(2)); show(this.ai, ic * (0.3 + 0.7 * fi) * clamp(fi / 0.05, 0, 1));
    // les lectures
    setFx(this.rt, `*t* = ${fr(t * 1e3, 1)} ms`);
    setFx(this.ri, `*i* = ${fr(iF(t), 1)} mA`); show(this.ri, ic);
    if (tri) {
      setFx(this.ru, `*u* = ${fr(uF(t), 2)} V`); show(this.ru, ul);
      show(this.rr, 0); show(this.rs, 0);
    } else {
      setFx(this.ru, `*u*_{L} = ${fr(uF(t), 1)} V`); show(this.ru, ul);
      if (R2 && dec) { setFx(this.rr, `(*R* + *R*_{2}) *i* = ${fr((R_OHM + R2) * iF(t) * 1e-3, 1)} V`); show(this.rr, ul); show(this.rs, 0); }
      else {
        const ur = dec ? R_OHM * iF(t) * 1e-3 : uRt(t);
        setFx(this.rr, `*u*_{R} = *R* *i* = ${fr(ur, 1)} V`); show(this.rr, ul);
        setFx(this.rs, `*u*_{R} + *u*_{L} = ${fr(ur + uF(t), 1)} V`); show(this.rs, ul);
      }
    }
  },
});
}
