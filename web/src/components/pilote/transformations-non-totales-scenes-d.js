/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Transformations non totales » (V3), quatrième partie : `bac` (la copie du sujet 2022,
 * ligne à ligne : copie adaptée de la scène `bac` de la leçon sur la décroissance, qui montrait la figure du
 * sujet ; ici le sujet n'a pas de figure, la copie s'écrit sous l'énoncé), `quiz` (les pièges des copies,
 * copie adaptée de la leçon voisine) et `end` (ce que l'élève a compris, cinq lignes).
 *
 * `bac`, paramètres : eqn (0 → 1 : l'équation de la question 1.1), n (le nombre de lignes de la question 1.2
 * déjà écrites : 0 à 5). L'énoncé (données, questions, barème) est toujours là : il est imprimé sur le sujet.
 * Les lignes viennent de `COPIE` et `COPIE_EQ` (outils), les nombres sont calculés.
 */
import { S22, COPIE, COPIE_EQ, fr, sciF } from "./transformations-non-totales-outils";

export function scenesD(ctx, O, QUIZ) {
const { E, clamp, show, scene } = ctx;
const { titre, lab, setFx } = O;

/* ---------- au bac : la copie du sujet 2022 ---------- */
scene("bac", {
  p: { eqn: 0, n: 0, sub: "" },
  build(g) {
    this.ti = titre(g, "Bac PC 2022, session normale", "exercice 1, partie 2 : une solution d’acide propanoïque");
    E("rect", { x: 50, y: 124, width: 900, height: 134, rx: 4, class: "nofill k-dim", "stroke-width": 2 }, g);
    lab(g, 74, 166, `*C*_{a} = ${sciF(S22.Ca, 0)} mol·L^{−1}  ;  pH = ${fr(S22.pH, 1)}`, "tn-g s-ink", "start", 30);
    lab(g, 74, 208, `1.1  Écrire l’équation de la réaction de l’acide avec l’eau  (${fr(S22.bareme[0], 1)} pt)`, "tn-l s-ink", "start", 26);
    lab(g, 74, 244, `1.2  Calculer *τ*. Que peut-on conclure ?  (${fr(S22.bareme[1], 2)} pt)`, "tn-l s-ink", "start", 26);
    lab(g, 50, 306, "copie", "tn-s s-c", "start", 22);
    this.eq = E("g", {}, g);
    lab(this.eq, 50, 340, "1.1", "tn-l s-c", "start", 26);
    lab(this.eq, 120, 340, COPIE_EQ, "tn-l s-ink", "start", 28);
    this.ln = COPIE.map((t, i) => {
      const gg = E("g", {}, g), y = 404 + i * 56;
      lab(gg, 50, y, i === 0 ? "1.2" : "", "tn-l s-c", "start", 26);
      lab(gg, 120, y, t, i === COPIE.length - 1 ? "tn-g s-ink" : "tn-l s-ink", "start", i === COPIE.length - 1 ? 30 : 28);
      return gg;
    });
  },
  render() {
    const p = this.p;
    show(this.eq, p.eqn);
    this.ln.forEach((l, i) => { const o = clamp(p.n - i, 0, 1); l.style.opacity = o; l.setAttribute("transform", `translate(${((1 - o) * -14).toFixed(1)} 0)`); });
    this.ti.set("Bac PC 2022, session normale", p.sub || "exercice 1, partie 2 : une solution d’acide propanoïque");
  },
});

/* ---------- les pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.big = lab(g, 500, 300, "", "tn-g s-ink", "middle", 36);
    this.sub = lab(g, 500, 356, "", "tn-l s-c", "middle", 26);
    this.r1 = lab(g, 500, 470, "", "tn-l s-ink", "middle", 26);
    this.r2 = lab(g, 500, 520, "", "tn-l s-a", "middle", 26);
  },
  render() {
    const i = clamp(Math.round(this.p.qi), 0, QUIZ.length - 1), q = QUIZ[i];
    this.ti.set(q.titre, q.tag);
    setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

/* ---------- ce que l'élève a compris ---------- */
scene("end", {
  p: { n: 0 },
  build(g) {
    titre(g, "Ce que tu as compris", "");
    const I = [
      ["Un acide cède un proton à une base, ici l’eau.", "AH + H_{2}O ⇄ A^{−} + H_{3}O^{+}"],
      ["*x*_{max} = *C* *V*, et *x*_{f} = 10^{−pH} *V*.", "Le pH dit jusqu’où l’acide a réagi."],
      ["*τ* = *x*_{f} / *x*_{max} = 10^{−pH} / *C*.", "*τ* < 1 : la transformation est limitée."],
      ["À l’équilibre, les deux réactions continuent.", "À la même vitesse : le compte ne change plus."],
      ["Diluer augmente *τ*.", "Les ions A^{−} et H_{3}O^{+} se rencontrent plus rarement."],
    ];
    this.items = I.map((l, i) => {
      const gg = E("g", {}, g), y = 170 + i * 100;
      lab(gg, 80, y + 12, String(i + 1), "tn-g s-ink", "start", 36);
      lab(gg, 130, y, l[0], "tn-l s-ink", "start", 26);
      lab(gg, 130, y + 34, l[1], "tn-s s-c", "start", 22);
      return gg;
    });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
