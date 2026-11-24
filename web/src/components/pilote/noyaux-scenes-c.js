/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Noyaux, masse et énergie » (V3), troisième partie : les usages et les dangers, les
 * trois pièges des copies (`quiz`, copie adaptée de la leçon voisine) et ce que l'élève a compris
 * (`end`, cinq lignes).
 */
import { fg, F931 } from "./noyaux-outils";

export function scenesC(ctx, O, QUIZ) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre } = O;

scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.big = fx(g, 500, 300, "", "t-cle s-ink", "middle");
    this.sub = fx(g, 500, 346, "", "nx-a s-c", "middle");
    this.r1 = fx(g, 500, 450, "", "nx-v s-ink", "middle");
    this.r2 = fx(g, 500, 496, "", "nx-n s-a", "middle");
  },
  render() {
    const i = clamp(Math.round(this.p.qi), 0, QUIZ.length - 1), q = QUIZ[i];
    this.ti.set(q.titre, q.tag);
    setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

scene("end", {
  p: { n: 0 },
  build(g) {
    titre(g, "Ce que tu as compris", "");
    const I = [
      ["Une masse est une énergie : *E* = *mc*^{2}.", `1 u correspond à ${fg(F931, 1)} MeV/*c*^{2}.`],
      ["Un noyau pèse moins que ses nucléons séparés.", "Δ*m* > 0, et *E*_{ℓ} = Δ*m* *c*^{2} est l’énergie à fournir."],
      ["On compare les noyaux par *E*_{ℓ}/*A*.", "Le creux de la courbe d’Aston est vers le fer et le nickel."],
      ["Un bilan se lit sur un diagramme d’énergie.", "Δ*E* < 0 : l’énergie est libérée, *E*_{lib} = |Δ*E*|."],
      ["Fission et fusion vont vers le creux de la courbe.", "Elles libèrent de l’énergie : c’est celle du Soleil."],
    ];
    this.items = I.map((l, i) => {
      const gg = E("g", {}, g), y = 160 + i * 100;
      fx(gg, 90, y + 14, String(i + 1), "t-cle s-ink");
      fx(gg, 140, y, l[0], "rd-fort s-ink");
      fx(gg, 140, y + 30, l[1], "t-lab s-c");
      return gg;
    });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
