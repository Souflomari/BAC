/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Le dosage acido-basique » (V3), troisième partie : `table` (tableau d'avancement du dosage :
 * avant E, à E, et sujet 2025), `quiz` (les pièges des copies), `end` (ce que l'élève a compris, cinq lignes).
 */
import { TAB_AV, TOT, S25, fr, sciF } from "./dosage-outils";

export function scenesC(ctx, O, QUIZ) {
  const { E, clamp, show, scene } = ctx;
  const { setFx, titre, lab } = O;

  /* ---------- le tableau d'avancement du dosage ---------- */
  const XC = [285, 475, 665, 855], YR = [265, 360, 455], CW = 186, CH = 76;
  scene("table", {
    p: { mode: "avant", cases: 12, rv: 0, fx: -1, sub: "" },
    build(g) {
      this.ti = titre(g, "", "");
      this.tete = XC.map((x) => {
        E("rect", { x: x - CW / 2, y: 168, width: CW, height: 56, class: "cell" }, g);
        return lab(g, x, 205, "", "ds-g s-ink", "middle", 24);
      });
      lab(g, 52, 205, "mol", "ds-s s-c", "start", 22);
      const lignes = [["état initial", "*x* = 0"], ["en cours", "*x*"], ["état final", "*x*_{f}"]];
      this.lig = lignes.map(([a, b], r) => {
        const gg = E("g", {}, g);
        lab(gg, 52, YR[r] - 6, a, "ds-l s-ink", "start", 24);
        lab(gg, 52, YR[r] + 24, b, "ds-s s-c", "start", 22);
        return gg;
      });
      this.cel = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) {
        const gg = E("g", {}, g);
        const rect = E("rect", { x: XC[c] - CW / 2, y: YR[r] - 40, width: CW, height: CH, class: "cell" }, gg);
        this.cel.push({ g: gg, rect, t: lab(gg, XC[c], YR[r] + 8, "", "ds-s s-ink", "middle", 22) });
      }
      this.note = lab(g, 500, 560, "", "ds-l s-a", "middle", 24);
    },
    render() {
      const p = this.p;
      const defs = {
        totale: {
          tete: ["CH_{3}COOH", "HO^{−}", "CH_{3}COO^{−}", "H_{2}O"],
          sub: `à *V*_{B} = ${fr(TOT.V, 1)} mL · pH = ${fr(TOT.pH, 2)}`,
          cells: [
            ["*C*_{A}*V*_{A}", "*C*_{B}*V*_{B}", "0", "excès"],
            ["*C*_{A}*V*_{A} − *x*", "*C*_{B}*V*_{B} − *x*", "*x*", "excès"],
            ["*C*_{A}*V*_{A} − *x*_{f}", "*C*_{B}*V*_{B} − *x*_{f}", "*x*_{f}", "excès"],
          ],
          note: p.rv ? `*x*_{max} = ${sciF(TOT.xmax, 1)} mol · *n*(HO^{−}) restant ≈ ${sciF(TOT.nHO, 1)} mol · *τ* ≈ 1` : "",
        },
        avant: {
          tete: ["CH_{3}COOH", "HO^{−}", "CH_{3}COO^{−}", "H_{2}O"],
          sub: `avant l’équivalence : *V*_{B} = ${fr(TAB_AV.V, 1)} mL`,
          cells: [
            [sciF(TAB_AV.n0, 1), sciF(TAB_AV.nB, 1), "0", "excès"],
            ["*C*_{A}*V*_{A} − *x*", "*C*_{B}*V*_{B} − *x*", "*x*", "excès"],
            [p.rv ? sciF(TAB_AV.nAH, 1) : "?", "≈ 0", sciF(TAB_AV.nB, 1), "excès"],
          ],
          note: p.rv ? `*n*(CH_{3}COOH) = *C*_{A}*V*_{A} − *C*_{B}*V*_{B} = ${sciF(TAB_AV.nAH, 1)} mol` : "",
        },
        ceq: {
          tete: ["HSO_{3}^{−}", "HO^{−}", "SO_{3}^{2−}", "H_{2}O"],
          sub: `sujet 2025, à l’équivalence (*V*_{A} = ${fr(S25.VA, 1)} mL, *V*_{BE} = ${fr(S25.VBE, 1)} mL)`,
          cells: [
            ["*C*_{A}*V*_{A}", "*C*_{B}*V*_{BE}", "0", "excès"],
            ["*C*_{A}*V*_{A} − *x*", "*C*_{B}*V*_{BE} − *x*", "*x*", "excès"],
            ["≈ 0", "≈ 0", "*x*_{max}", "excès"],
          ],
          note: p.rv ? `*C*_{eq} = *x*_{max} / (*V*_{A} + *V*_{BE}) ≈ ${sciF(S25.Ceq, 1)} mol·L^{−1}` : `*x*_{max} = *C*_{A}*V*_{A} = ${sciF(S25.xmax, 1)} mol`,
        },
      };
      const D = defs[p.mode] || defs.avant;
      this.tete.forEach((t, i) => setFx(t, D.tete[i]));
      this.cel.forEach((cl, i) => {
        const r = Math.floor(i / 4), c = i % 4, o = clamp(p.cases - i, 0, 1);
        cl.g.style.opacity = o;
        setFx(cl.t, D.cells[r][c]);
        cl.rect.setAttribute("class", i === Math.round(p.fx) ? "cell hl-a" : "cell");
      });
      this.lig.forEach((l, r) => show(l, clamp((p.cases - 4 * r) / 2, 0, 1)));
      setFx(this.note, D.note);
      this.ti.set("Tableau d’avancement du dosage", p.sub || D.sub);
    },
  });

  /* ---------- les pièges des copies ---------- */
  scene("quiz", {
    p: { qi: 0, rv: 0 },
    build(g) {
      this.ti = titre(g, "", "");
      this.big = lab(g, 500, 290, "", "ds-g s-ink", "middle", 34);
      this.sub = lab(g, 500, 350, "", "ds-l s-c", "middle", 24);
      this.r1 = lab(g, 500, 465, "", "ds-l s-ink", "middle", 26);
      this.r2 = lab(g, 500, 518, "", "ds-l s-a", "middle", 26);
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
        ["La réaction de dosage est totale : une seule flèche.", "CH_{3}COOH_{(aq)} + HO^{−}_{(aq)} → CH_{3}COO^{−}_{(aq)} + H_{2}O_{(l)}"],
        ["À l’équivalence, les quantités de matière réagissent juste.", "*C*_{A}·*V*_{A} = *C*_{B}·*V*_{E}  (ni volumes égaux, ni concentrations égales)"],
        ["Le point E est au milieu du saut de pH.", "Tangentes parallèles et médiane, ou maximum de dpH/d*V*_{B}."],
        ["pH_{E} dépend de l’espèce présente à l’équivalence.", "Acide faible par soude : pH_{E} > 7 ; base faible par HCl : pH_{E} < 7 ; p*K*_{A} à *V*_{E}/2."],
        ["Un indicateur convient si sa zone de virage contient pH_{E}.", "Il signale le saut de pH ; il ne le cause pas."],
      ];
      this.items = I.map((l, i) => {
        const gg = E("g", {}, g), y = 166 + i * 102;
        lab(gg, 70, y + 12, String(i + 1), "ds-g s-ink", "start", 34);
        lab(gg, 118, y, l[0], "ds-l s-ink", "start", 24);
        lab(gg, 118, y + 34, l[1], "ds-s s-c", "start", 22);
        return gg;
      });
    },
    render() {
      this.items.forEach((g, i) => {
        const o = clamp(this.p.n - i, 0, 1);
        g.style.opacity = o;
        g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`);
      });
    },
  });
}
