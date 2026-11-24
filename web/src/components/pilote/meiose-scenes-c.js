/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « La méiose, la fécondation et les brassages », fin de leçon :
 *   · `schema` : six cellules en division à légender (repères 1 à 6, dans le désordre) ;
 *   · `bac`    : l'exercice type (une courbe d'ADN et trois cellules a, b, c) ;
 *   · `quiz`   : les trois pièges du bilan ;
 *   · `end`    : ce que l'élève a compris.
 * Les cellules sont dessinées par `dessinCellule` (meiose-outils.js), les mêmes primitives que celles
 * des exercices. Aucune couleur écrite en dur.
 */
import { dessinCellule, poser, decrit, N, N2, N2_BAC2, N2_BILAN, ADN_G1, ADN_S, ADN_DIV1, ADN_DIV2, fr } from "./meiose-outils";

/** Les six repères du schéma, dans l'ordre des numéros (pas dans l'ordre du temps) : la phase, la légende, un indice qui ne la donne pas. */
export const REPERES = [
  { phase: "metaphase2", t: "métaphase II", i: "Il n’y a plus de paires. Les chromosomes ont-ils encore deux chromatides ? Où sont-ils ?" },
  { phase: "prophase1", t: "prophase I", i: "Les chromosomes sont accolés par quatre, en tétrades : quelle phase ?" },
  { phase: "anaphase1", t: "anaphase I", i: "Des chromosomes à deux chromatides partent vers chaque pôle : séparent-ils des paires ou des chromatides ?" },
  { phase: "telophase2", t: "fin de division II", i: "Compte les cellules : combien y en a-t-il ?" },
  { phase: "metaphase1", t: "métaphase I", i: "Les chromosomes sont-ils par paires ? De quel côté de la plaque ?" },
  { phase: "anaphase2", t: "anaphase II", i: "Des chromosomes à une seule chromatide partent vers chaque pôle : quelle division ?" },
];

export function scenesC(ctx, O, QUIZ, FIN) {
  const { E, lerp, clamp, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const ln = (parent, k, w, a) => E("line", { class: k, "stroke-width": w, ...(a || {}) }, parent);

  /* ---------- le schéma des phases : six repères à légender ---------- */
  scene("schema", {
    p: { on: 0, pl: 0 },
    build(g) {
      titre(g, "Six cellules, six phases", "chaque cellule : 2*n* = 4 ; le chromosome du père est en rouge");
      const X = [50, 360, 670], Y = [128, 378];
      this.rep = REPERES.map((r, i) => {
        const x = X[i % 3], y = Y[Math.floor(i / 3)], rg = E("g", {}, g);
        poser(E, rg, dessinCellule(r.phase, N, { W: 280, H: 190, o: [0, 1] }), x, y, 1);
        const ring = E("circle", { cx: x + 22, cy: y + 24, r: 18, class: "me-cell" }, rg);
        E("text", { x: x + 22, y: y + 31, class: "t-lab2 s-ink", "text-anchor": "middle", "font-weight": 700, text: String(i + 1) }, rg);
        const lab = fx(rg, x + 140, y + 224, r.t, "t-titre s-ink", "middle");
        return { ring, lab };
      });
    },
    render() {
      const p = this.p;
      this.rep.forEach(({ ring, lab }, i) => {
        const fait = i < p.pl, actif = i === Math.round(p.pl) && p.on > 0.5;
        ring.setAttribute("class", actif ? "me-rep-on" : "me-cell"); show(lab, fait ? 1 : 0);
      });
    },
  });

  /* ---------- l'exercice type : la courbe d'ADN et trois cellules ---------- */
  const PTS = [[120, ADN_G1], [240, ADN_G1], [310, ADN_S], [470, ADN_S], [500, ADN_DIV1], [640, ADN_DIV1], [670, ADN_DIV2], [860, ADN_DIV2]];
  const Yb = (v) => 330 - 48 * v;
  const CELS = [{ l: "a", phase: "metaphase1", x: 60 }, { l: "b", phase: "anaphase2", x: 360 }, { l: "c", phase: "metaphase2", x: 660 }];
  const MARQ = { a: [390, ADN_S], c: [575, ADN_DIV1], b: [625, ADN_DIV1] };
  scene("bac", {
    p: { doc: 0, e1: 0, e2: 0, ex2: 0, foc: 0, sch: 0 },
    build(g) {
      this.ti = titre(g, "Exercice type : ce n’est pas un sujet du bac", "animal à 2*n* = 4 : la quantité d’ADN par cellule, puis trois cellules");
      this.d = E("g", {}, g);
      fx(this.d, 60, 126, "Document 1", "t-lab2 s-ink", "start");
      E("line", { x1: 100, x2: 100, y1: 140, y2: 330, class: "k-ink", "stroke-width": 2 }, this.d);
      E("line", { x1: 100, x2: 900, y1: 330, y2: 330, class: "k-ink", "stroke-width": 2 }, this.d);
      [1, 2, 4].forEach((v) => { E("line", { x1: 100, x2: 900, y1: Yb(v), y2: Yb(v), class: "k-line", "stroke-width": 1.5, "stroke-dasharray": "3 6" }, this.d); fx(this.d, 90, Yb(v) + 7, v === 1 ? "*q*" : `${v}*q*`, "t-lab2 s-ink", "end"); });
      fx(this.d, 900, 356, "temps", "t-sous", "end");
      E("path", { d: PTS.map(([x, v], i) => (i ? "L" : "M") + x + " " + Yb(v)).join(""), class: "k-ink nofill", "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, this.d);
      fx(this.d, 60, 392, "Document 2", "t-lab2 s-ink", "start");
      // les lettres a, b, c en encre ; celle qu'on interroge passe en rouge (`foc` : 0 aucune, 1 b, 2 c)
      this.lt = CELS.map(({ l, phase, x }) => {
        poser(E, this.d, dessinCellule(phase, N, { W: 280, H: 170, o: [0, 1] }), x, 410, 1);
        return fx(this.d, x + 16, 446, l, "t-cle s-ink", "start");
      });
      // le second exemple : une cellule d'un animal à 2n = 6, en anaphase I (3 chromosomes à deux chromatides vers chaque pôle)
      this.x2 = E("g", {}, g);
      // la même épaisseur et le même centromère que les cellules de la scène `meiose`
      poser(E, this.x2, dessinCellule("anaphase1", N2_BAC2 / 2, { W: 760, H: 400, o: [0, 1, 0], w: 11 }), 120, 150, 1);
      fx(this.x2, 500, 600, "une cellule d’un animal à 2*n* = " + N2_BAC2, "t-titre s-ink", "middle");
      // trois schémas d'anaphase pour 2n = 4 : chromatides séparées (mitose), homologues séparés, paires entières
      this.sc = E("g", {}, g);
      ["mitose-ana", "anaphase1", "anaphase1-paires"].forEach((ph, i) => {
        const x = 30 + i * 320;
        poser(E, this.sc, dessinCellule(ph, N, { W: 300, H: 220, o: [0, 1], w: 9 }), x, 190, 1);
        E("circle", { cx: x + 22, cy: 176, r: 17, class: "me-cell" }, this.sc);
        E("text", { x: x + 22, y: 183, class: "t-lab s-ink", "text-anchor": "middle", text: String(i + 1) }, this.sc);
      });
      // les trois marques sur la courbe (révélées avec la réponse)
      this.m = E("g", {}, g);
      this.mk = Object.entries(MARQ).map(([l, [x, v]]) => ({ l, c: E("circle", { cx: x, cy: Yb(v), r: 9, class: "s-dim" }, this.m), t: fx(this.m, x, Yb(v) - 18, l, "t-lab s-dim", "middle") }));
      // la grille sous chaque cellule : nombre, paires, chromatides
      this.e = E("g", {}, g);
      CELS.forEach(({ phase, x }) => {
        const D = decrit(phase, N);
        [D.nb, D.paires, D.chromatides].forEach((t, j) => fx(this.e, x + 140, 618 + 26 * j, t, "t-lab s-ink", "middle"));
      });
    },
    render() {
      const p = this.p, x2 = clamp(p.ex2, 0, 1);
      this.ti.set(x2 > 0.5 ? "Second exercice type : à toi" : "Exercice type : ce n’est pas un sujet du bac", x2 > 0.5 ? `animal à 2*n* = ${N2_BAC2} : une cellule en anaphase` : `animal à 2*n* = ${N2} : la quantité d’ADN par cellule, puis trois cellules`);
      const sch = clamp(p.sch, 0, 1);
      if (sch > 0.5) this.ti.set("Second exercice type : à toi", `animal à 2*n* = ${N2} : trois schémas d’anaphase`);
      show(this.sc, sch);
      show(this.d, p.doc * (1 - x2) * (1 - sch)); show(this.e, p.e1 * (1 - x2) * (1 - sch)); show(this.m, p.e2 * (1 - x2) * (1 - sch)); show(this.x2, x2);
      // une seule marque rouge : la lettre de la cellule interrogée, et son point sur la courbe
      const foc = Math.round(p.foc), qui = ["", "b", "c"][foc];
      this.lt.forEach((t, i) => t.setAttribute("class", `t-cle ${CELS[i].l === qui ? "s-a" : "s-ink"}`));
      this.mk.forEach(({ l, c, t }) => { const on = l === qui; c.setAttribute("class", on ? "s-a" : "s-dim"); t.setAttribute("class", `t-lab ${on ? "s-a" : "s-dim"}`); });
    },
  });

  /* ---------- le bilan : trois pièges, une figure par piège (elle n'apparaît qu'avec la réponse) ---------- */
  const rod = (parent, x, y, L, k, w = 9) => { E("line", { x1: x, x2: x, y1: y - L / 2, y2: y + L / 2, class: k, "stroke-width": w, "stroke-linecap": "round" }, parent); };
  scene("quiz", {
    p: { qi: 0, rv: 0 },
    build(g) {
      this.tag = fx(g, 500, 120, "", "t-sous", "middle");
      this.f = [0, 1, 2].map(() => E("g", {}, g));
      // 1 : une cellule en métaphase II, n = 2 chromosomes à 2 chromatides
      poser(E, this.f[0], dessinCellule("metaphase2", N, { W: 560, H: 300, o: [0, 1], w: 11 }), 220, 150, 1);
      this.c0 = [fx(this.f[0], 500, 490, "", "t-big2 s-ink", "middle"), fx(this.f[0], 500, 530, "", "t-lab s-dim", "middle")];
      // 2 : 5 paires, 2 choix par paire
      const n = N2_BILAN / 2;
      for (let i = 0; i < n; i++) { const x = 500 + (i - (n - 1) / 2) * 120; rod(this.f[1], x - 14, 270, 90, "k-a"); rod(this.f[1], x + 14, 270, 90, "k-ink"); fx(this.f[1], x, 360, "×2", "t-lab s-ink", "middle"); }
      this.c1 = [fx(this.f[1], 500, 450, "", "t-big2 s-ink", "middle"), fx(this.f[1], 500, 490, "", "t-lab s-dim", "middle")];
      // 3 : une tétrade, deux chromatides non sœurs échangent un segment (les deux autres ne bougent pas)
      [[250, "k-a"], [290, "k-a"], [330, "k-ink"], [370, "k-ink"]].forEach(([y, k], i) => {
        if (i === 1) { ln(this.f[2], "k-a", 11, { x1: 300, x2: 500, y1: y, y2: y, "stroke-linecap": "round" }); ln(this.f[2], "k-a", 11, { x1: 500, x2: 540, y1: y, y2: y + 40, "stroke-linecap": "round" }); ln(this.f[2], "k-a", 11, { x1: 540, x2: 700, y1: y + 40, y2: y + 40, "stroke-linecap": "round" }); }
        else if (i === 2) { ln(this.f[2], "k-ink", 11, { x1: 300, x2: 500, y1: y, y2: y, "stroke-linecap": "round" }); ln(this.f[2], "k-ink", 11, { x1: 500, x2: 540, y1: y, y2: y - 40, "stroke-linecap": "round" }); ln(this.f[2], "k-ink", 11, { x1: 540, x2: 700, y1: y - 40, y2: y - 40, "stroke-linecap": "round" }); }
        else ln(this.f[2], k, 11, { x1: 300, x2: 700, y1: y, y2: y, "stroke-linecap": "round" });
      });
      this.c2 = [fx(this.f[2], 500, 450, "", "t-big2 s-ink", "middle"), fx(this.f[2], 500, 490, "", "t-lab s-dim", "middle")];
    },
    render() {
      const q = QUIZ[Math.round(this.p.qi)], i = Math.round(this.p.qi), rv = this.p.rv;
      setFx(this.tag, `Piège ${i + 1} sur 3`);
      [this.c0, this.c1, this.c2].forEach((c, j) => { setFx(c[0], j === i ? q.cap : ""); setFx(c[1], j === i ? q.sub : ""); });
      this.f.forEach((f, j) => show(f, j === i ? rv : 0));
    },
  });

  /* ---------- ce que l'élève sait maintenant ---------- */
  scene("end", {
    p: { n: 0 },
    build(g) {
      fx(g, 90, 96, "Ce que tu as compris", "t-titre s-ink", "start");
      this.items = FIN.map((l, i) => {
        const gg = E("g", {}, g), y = 170 + i * 100;
        E("text", { x: 90, y: y + 14, class: "t-cle s-dim", text: String(i + 1) }, gg);
        fx(gg, 140, y, l[0], "me-f1 s-ink", "start"); fx(gg, 140, y + 32, l[1], "me-f2 s-dim", "start");
        return gg;
      });
    },
    render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
  });
}
