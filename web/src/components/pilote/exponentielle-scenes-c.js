/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « fonction exponentielle » (séance 1), troisième partie : le trinôme en t du bac
 * (`bac`), les trois pièges des copies (`quiz`) et ce que l'élève a compris (`end`).
 * Aucune couleur écrite en dur : les classes de pilote.css seulement.
 */
import { fr, ent, R1, R2, BAC1, BAC2 } from "./exponentielle-outils";

export function scenesC(ctx, O, PIEGES) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre, courbe } = O;

/* ---------- 9. au bac : le trinôme en t, sa parabole, la zone t ≤ 0 interdite ---------- */
// coefficients → « t^{2} − 4t + 3 »
const poly = ({ a, b, c }) => `*t*^{2} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}*t* ${c < 0 ? "−" : "+"} ${Math.abs(c)}`;
const pf = ({ a, b, c }) => (t) => a * t * t + b * t + c;
scene("bac", {
  p: { f: 0, dom: 0, roots: 0, back: 0, neg: 0, ex2: 0, rej: 0 },
  build(g) {
    const X = (t) => 500 + 78 * t, Y = (y) => 440 - 26 * y; this.X = X; this.Y = Y;
    this.ti = titre(g, "", "", 940, "end");
    E("line", { x1: X(-5.2), x2: X(5.2), y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: X(0), x2: X(0), y1: Y(-7.3), y2: Y(13), class: "k-dim", "stroke-width": 1.5 }, g);
    for (let v = -5; v <= 5; v++) { if (!v) continue; E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, g); fx(g, X(v), Y(0) + 26, String(v).replace("-", "−"), "t-tick s-dim", "middle"); }
    fx(g, X(5.2) + 8, Y(0) + 5, "*t*", "t-lab s-dim");
    // la zone t ≤ 0
    this.dm = E("g", {}, g);
    E("rect", { x: X(-5.2), y: 100, width: X(0) - X(-5.2), height: 550, fill: "url(#ex-hach)", opacity: 0.5 }, this.dm);
    fx(this.dm, 104, 566, "*t* ≤ 0", "t-lab2 s-ink"); fx(this.dm, 104, 594, "exclu : *t* = e^{*x*} > 0", "t-lab s-ink");
    const cg = E("g", { "clip-path": "url(#ex-clip-bac)" }, g);
    this.ng = E("path", { class: "reg f-a" }, cg);
    const mk = (c, t0) => E("path", { d: courbe(pf(c), t0, 5.2, X, Y, 300), class: "k-a nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cg);
    this.c1 = mk(BAC1, -2.3); this.c2 = mk(BAC2, -5.2);
    this.l1 = fx(g, 890, 214, `*y* = ${poly(BAC1)}`, "t-lab s-a", "end");
    this.l2 = fx(g, X(0.5), 636, `*y* = ${poly(BAC2)}`, "t-lab s-a", "middle");
    this.nl = fx(g, X(2), Y(0) - 22, "≤ 0 entre les racines", "t-lab s-ink", "middle");
    // les racines, puis leur retour à x
    this.rt = [0, 1].map(() => { const rg = E("g", {}, g); return { g: rg, c: E("circle", { r: 8, class: "s-ink" }, rg), t: fx(rg, 0, 0, "", "t-lab2 s-ink", "middle"), x: fx(rg, 0, 0, "", "t-cle s-a", "middle") }; });
  },
  render() {
    const p = this.p, X = this.X, Y = this.Y, f = (v) => v.toFixed(1), e2 = p.ex2 > 0.5, R = e2 ? R2 : R1;
    let a = "Bac 2021, session normale", b = "e^{2*x*} − 4e^{*x*} + 3 = 0";
    if (e2) { a = "Exercice type, pas un sujet"; b = "e^{2*x*} − 3e^{*x*} − 4 = 0"; }
    if (p.f > 0.5) b = "*t* = e^{*x*} > 0 : un trinôme en *t*";
    this.ti.set(a, b);
    this.c1.style.strokeDashoffset = 1000 * (1 - p.f); show(this.c1, e2 ? 0 : 1);
    this.c2.style.strokeDashoffset = 1000 * (1 - p.f); show(this.c2, e2 ? 1 : 0);
    show(this.l1, clamp(p.f * 2 - 1, 0, 1) * (e2 ? 0 : 1)); show(this.l2, clamp(p.f * 2 - 1, 0, 1) * (e2 ? 1 : 0));
    show(this.dm, p.dom);
    // l'aire sous l'axe, entre les racines de la première parabole
    const g1 = pf(BAC1); let d = `M${f(X(R1.r1))} ${f(Y(0))}`;
    for (let i = 0; i <= 60; i++) { const t = R1.r1 + ((R1.r2 - R1.r1) * i) / 60; d += `L${f(X(t))} ${f(Y(g1(t)))}`; }
    this.ng.setAttribute("d", d + "Z"); show(this.ng, p.neg * (e2 ? 0 : 1)); show(this.nl, p.neg * (e2 ? 0 : 1));
    const xs = (t) => (Math.abs(t - 1) < 1e-9 ? "0" : `ln ${ent(t)}`);
    [R.r1, R.r2].forEach((t, i) => {
      const q = this.rt[i], bad = t <= 0;
      q.c.setAttribute("cx", f(X(t))); q.c.setAttribute("cy", f(Y(0))); q.c.setAttribute("class", bad && p.rej > 0.5 ? "s-c" : "s-ink");
      q.t.setAttribute("x", f(X(t))); q.t.setAttribute("y", f(Y(0) + 54));
      setFx(q.t, bad && p.rej > 0.5 ? `*t* = ${fr(t, 0)} : rejeté` : `*t* = ${fr(t, 0)}`);
      q.x.setAttribute("x", f(X(t))); q.x.setAttribute("y", f(Y(0) + 92)); setFx(q.x, bad ? "" : `*x* = ${xs(t)}`);
      show(q.g, p.roots); show(q.x, p.roots * p.back);
    });
  },
});

/* ---------- 10. trois pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.tag = fx(g, 500, 210, "", "t-sous", "middle");
    this.big = fx(g, 500, 330, "", "t-big2 s-ink", "middle");
    this.r1 = fx(g, 500, 430, "", "t-lab2 s-ink", "middle");
    this.r2 = fx(g, 500, 474, "", "t-lab2 s-ink", "middle");
  },
  render() {
    const q = PIEGES[Math.round(this.p.qi)];
    setFx(this.tag, q.tag); setFx(this.big, q.big); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

/* ---------- ce que tu sais maintenant ---------- */
scene("end", {
  p: { n: 0 },
  build(g) {
    fx(g, 90, 96, "Ce que tu as compris", "t-titre s-ink");
    const I = [["exp est la réciproque de ln :", "exp(*x*) = *y* ⇔ *x* = ln *y*, pour *y* > 0."],
      ["Sa courbe est le reflet de celle de ln :", "e^{*x*} > 0, et l’axe *y* = 0 est asymptote."],
      ["Elle change les sommes en produits :", "e^{*a*+*b*} = e^{*a*} e^{*b*}."],
      ["Sa pente est sa hauteur : (e^{*x*})′ = e^{*x*},", "et e^{*x*} ≥ *x* + 1 pour tout réel *x*."],
      ["Aucune condition d’existence pour e^{*u*} :", "avec *t* = e^{*x*}, on garde *t* > 0."]];
    this.items = I.map((l, i) => { const gg = E("g", {}, g), y = 170 + i * 100; E("text", { x: 90, y: y + 8, class: "t-cle s-ink", text: String(i + 1) }, gg); fx(gg, 140, y, l[0], "t-lab2 s-ink"); fx(gg, 140, y + 30, l[1], "t-lab s-dim"); return gg; });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
