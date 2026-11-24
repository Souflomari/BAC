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
import { dessinCellule, poser, decrit, N, N2, N2_BAC2, ADN_G1, ADN_S, ADN_DIV1, ADN_DIV2, fr } from "./meiose-outils";

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
    p: { doc: 0, e1: 0, e2: 0, ex2: 0 },
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
      CELS.forEach(({ l, phase, x }) => {
        poser(E, this.d, dessinCellule(phase, N, { W: 280, H: 170, o: [0, 1] }), x, 410, 1);
        fx(this.d, x + 16, 446, l, "t-cle s-a", "start");
      });
      // le second exemple : une cellule d'un animal à 2n = 6, en anaphase I (3 chromosomes à deux chromatides vers chaque pôle)
      this.x2 = E("g", {}, g);
      poser(E, this.x2, dessinCellule("anaphase1", N2_BAC2 / 2, { W: 280, H: 190, o: [0, 1, 0] }), 150, 170, 2.5);
      fx(this.x2, 500, 668, "une cellule d’un animal à 2*n* = " + N2_BAC2, "t-titre s-ink", "middle");
      // les trois marques sur la courbe (révélées avec la réponse)
      this.m = E("g", {}, g);
      Object.entries(MARQ).forEach(([l, [x, v]]) => { E("circle", { cx: x, cy: Yb(v), r: 9, class: "s-a" }, this.m); fx(this.m, x, Yb(v) - 18, l, "t-cle s-a", "middle"); });
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
      show(this.d, p.doc * (1 - x2)); show(this.e, p.e1 * (1 - x2)); show(this.m, p.e2 * (1 - x2)); show(this.x2, x2);
    },
  });

  /* ---------- le bilan : trois pièges ---------- */
  scene("quiz", {
    p: { qi: 0, rv: 0 },
    build(g) {
      this.tag = fx(g, 500, 170, "", "t-sous", "middle");
      this.big = fx(g, 500, 290, "", "t-big2 s-ink", "middle");
      this.sub = fx(g, 500, 350, "", "t-titre s-ink", "middle");
      this.r1 = fx(g, 500, 450, "", "t-titre s-ink", "middle");
      this.r2 = fx(g, 500, 510, "", "t-big2 s-a", "middle");
    },
    render() {
      const q = QUIZ[Math.round(this.p.qi)];
      setFx(this.tag, `Piège ${Math.round(this.p.qi) + 1} sur 3`); setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
      show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
    },
  });

  /* ---------- ce que l'élève sait maintenant ---------- */
  scene("end", {
    p: { n: 0 },
    build(g) {
      fx(g, 90, 96, "Ce que tu as compris", "t-titre s-ink", "start");
      this.items = FIN.map((l, i) => {
        const gg = E("g", {}, g), y = 170 + i * 100;
        E("text", { x: 90, y: y + 14, class: "t-cle s-ink", text: String(i + 1) }, gg);
        fx(gg, 140, y, l[0], "t-lab2 s-ink", "start"); fx(gg, 140, y + 32, l[1], "t-lab2 s-dim", "start");
        return gg;
      });
    },
    render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
  });
}
