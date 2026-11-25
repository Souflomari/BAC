/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « fonction exponentielle » (séance 1) : `course`, la croissance comparée par dézoom continu
 * (procédé de la maquette « Exponentielle » du rapport 11). La fenêtre [0 ; xMax] × [0 ; yMax] s'élargit
 * sans coupure pendant que eˣ écrase la droite y = x ; le quotient eˣ / x s'envole.
 *
 * Une seule grandeur pilote tout : `x`, de 1 à R_COURSE[dernier]. La fenêtre se déduit de x
 * (xMax = 1,08 x, yMax = 1,18 eˣ, avec des planchers) : les deux courbes sont tracées dans le MÊME repère,
 * à la même échelle à chaque instant, et les graduations suivent (elles apparaissent et disparaissent en
 * fondu selon l'espace qu'elles ont). Aucune garde : avant le pari, la scène est à x = 1, qui ne donne pas
 * la réponse ; c'est le `reveal` de l'étape qui fait avancer x. Valeurs : ratio(), fG(), R_COURSE.
 * Couleurs : des classes seulement ; l'accent est à eˣ, la courbe qui l'emporte, et à ce que l'on mesure.
 */
import { fr, ent, fG, ratio, R_COURSE } from "./exponentielle-outils";

export function scenesD(ctx, O) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre, courbe } = O;

const X0 = 150, Y0 = 585, W = 510, H = 440;         // le coin bas-gauche du repère, sa largeur, sa hauteur
const XMAX_FIN = R_COURSE[R_COURSE.length - 1];     // 20
const PX = 706;                                     // la colonne des valeurs, à droite
const f1 = (v) => v.toFixed(1);
const pasX = [1, 2, 5, 10];

scene("course", {
  p: { x: 1 },
  build(g) {
    this.ti = titre(g, "", "");
    // les axes
    E("line", { x1: X0, y1: Y0, x2: X0 + W + 14, y2: Y0, class: "k-dim", "stroke-width": 2 }, g);
    E("line", { x1: X0, y1: Y0 - H - 14, x2: X0, y2: Y0, class: "k-dim", "stroke-width": 2 }, g);
    fx(g, X0 + W + 22, Y0 + 6, "*x*", "t-lab s-dim");
    // les graduations : x = 1 … 20, et 1, 10, 100 … sur y ; chacune a son fondu
    this.tx = [];
    for (let v = 1; v <= XMAX_FIN; v++) {
      const tg = E("g", {}, g);
      this.tx.push({ v, tg, tk: E("line", { y1: Y0, y2: Y0 + 7, class: "k-dim" }, tg), lb: fx(tg, 0, Y0 + 28, String(v), "t-tick s-dim", "middle") });
    }
    this.ty = [];
    for (let k = 0; k <= 8; k++) {
      const tg = E("g", {}, g);
      this.ty.push({ k, tg, tk: E("line", { x1: X0 - 7, x2: X0, class: "k-dim" }, tg), lb: fx(tg, X0 - 12, 0, k <= 3 ? ent(10 ** k) : `10^{${k}}`, "t-tick s-dim", "end") });
    }
    // les deux courbes (y = x dessinée d'abord : eˣ passe par-dessus), l'écart et les deux points
    this.cLin = E("path", { class: "k-ink nofill", "stroke-width": 3.5 }, g);
    this.cExp = E("path", { class: "k-a nofill", "stroke-width": 4 }, g);
    this.gap = E("line", { class: "k-dim", "stroke-width": 2, "stroke-dasharray": "5 5" }, g);
    this.dLin = E("circle", { r: 6, class: "s-ink" }, g);
    this.dExp = E("circle", { r: 8, class: "s-a" }, g);
    this.lExp = fx(g, X0 + 22, Y0 - H + 14, "*y* = e^{*x*}", "t-lab2 s-a");
    this.lLin = fx(g, X0 + 22, Y0 - H + 46, "*y* = *x*", "t-lab2 s-ink");
    // la colonne de droite : les valeurs en direct, la jauge du quotient (échelle logarithmique), les repères
    this.vx = fx(g, PX, 175, "", "t-lab2 s-ink");
    this.ve = fx(g, PX, 213, "", "t-lab2 s-a");
    E("line", { x1: PX, x2: PX + 240, y1: 235, y2: 235, class: "k-dim", "stroke-width": 1.5 }, g);
    fx(g, PX, 272, "e^{*x*} / *x*", "t-lab s-dim");
    this.vq = fx(g, PX, 312, "", "t-cle s-ink");
    E("rect", { x: PX, y: 330, width: 240, height: 16, class: "cell" }, g);
    this.jau = E("rect", { x: PX, y: 330, height: 16, class: "s-a" }, g);
    this.rows = R_COURSE.map((x, i) => ({ x, t: fx(g, PX, 380 + i * 34, `*x* = ${x} : ${fG(ratio(x))}`, "t-lab s-ink") }));
  },
  render() {
    const x = clamp(this.p.x, 1, XMAX_FIN);
    // la fenêtre, déduite de x seul
    const xMax = Math.max(3, x * 1.08), yMax = Math.max(12, Math.exp(x) * 1.18);
    const X = (v) => X0 + (W * v) / xMax, Y = (v) => Y0 - (H * v) / yMax;
    // les deux courbes, sur toute la fenêtre : chacune s'arrête au bord (x = xMax pour y = x, y = yMax pour eˣ)
    const xe = Math.min(xMax, Math.log(yMax));
    this.cExp.setAttribute("d", courbe(Math.exp, 0, xe, X, Y, 140));
    this.cLin.setAttribute("d", `M${f1(X(0))} ${f1(Y(0))}L${f1(X(xMax))} ${f1(Y(xMax))}`);
    // l'écart à l'abscisse x
    const ye = Math.exp(x);
    this.gap.setAttribute("x1", f1(X(x))); this.gap.setAttribute("x2", f1(X(x))); this.gap.setAttribute("y1", f1(Y(0))); this.gap.setAttribute("y2", f1(Y(ye)));
    this.dLin.setAttribute("cx", f1(X(x))); this.dLin.setAttribute("cy", f1(Y(x)));
    this.dExp.setAttribute("cx", f1(X(x))); this.dExp.setAttribute("cy", f1(Y(ye)));
    // les graduations : le fondu dépend de la place que prend un pas
    const pxU = W / xMax;
    this.tx.forEach((t) => {
      let w = 0;
      pasX.forEach((s) => { if (t.v % s === 0) w = Math.max(w, clamp((pxU * s - 46) / 30, 0, 1)); });
      const px = X(t.v), vis = t.v <= xMax - 0.2 ? w : 0;
      t.tk.setAttribute("x1", f1(px)); t.tk.setAttribute("x2", f1(px)); t.lb.setAttribute("x", f1(px)); show(t.tg, vis);
    });
    this.ty.forEach((t) => {
      const h = (H * 10 ** t.k) / yMax, y = Y(10 ** t.k);
      t.tk.setAttribute("y1", f1(y)); t.tk.setAttribute("y2", f1(y)); t.lb.setAttribute("y", f1(y + 5));
      show(t.tg, h <= H - 6 ? clamp((h - 26) / 18, 0, 1) : 0);
    });
    // les valeurs, la jauge, les repères
    setFx(this.vx, `*x* = ${fr(x, 1)}`); setFx(this.ve, `e^{*x*} = ${fG(ye)}`); setFx(this.vq, fG(ratio(x)));
    this.jau.setAttribute("width", f1(240 * clamp(Math.log10(ratio(x)) / Math.log10(ratio(XMAX_FIN)), 0, 1)));
    this.rows.forEach((r) => show(r.t, clamp((x - r.x + 0.3) / 0.3, 0, 1)));
    if (x < 1.05) this.ti.set("e^{*x*} et *x*, dans la même fenêtre", `la fenêtre va de 0 à ${fr(xMax, 0)}`);
    else if (x < 6) this.ti.set("La fenêtre s’élargit sans coupure", "les deux courbes gardent la même échelle");
    else this.ti.set("La fenêtre continue de s’élargir", "y = x est écrasée contre l’axe");
  },
});
}
