/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Les lois statistiques de la transmission des caractères », fin de leçon :
 *   · `carte` : un chromosome gradué en cM, deux loci, un curseur ; le pourcentage de recombinés est
 *     CALCULÉ (copie adaptée de la règle graduée) ; mode `trois` : trois loci et leurs distances ;
 *   · `bac`   : l'énoncé du sujet SVT 2022 N, exercice 2 (document 1 redessiné d'après sa description
 *     transcrite), puis celui du sujet SVT 2024 N, exercice 3 ;
 *   · `quiz`, `end` : copies de meiose-scenes-c.js (les trois pièges ; le bilan).
 * Aucune couleur écrite en dur.
 */
import { SV22, TROIS, fr, pct, NB } from "./transmission-outils";

export const CARTE_MAX = 30;      // au-delà, la règle d + 0 ne suffit plus : le curseur s'arrête
const X0 = 70, X1 = 930, CM_MAX = 50;
export const xCM = (d) => X0 + ((X1 - X0) * d) / CM_MAX;

export function scenesC(ctx, O, QUIZ, FIN) {
  const { E, lerp, clamp, show, scene, svgPt } = ctx;
  const { fx, setFx, titre } = O;
  const f1 = (v) => v.toFixed(1);
  const setL = (el, x1, y1, x2, y2) => { el.setAttribute("x1", f1(x1)); el.setAttribute("y1", f1(y1)); el.setAttribute("x2", f1(x2)); el.setAttribute("y2", f1(y2)); };
  const sup = (s) => String(s).replace(/⁺/g, "^{+}");
  const ln = (parent, k, w, a) => E("line", { class: k, "stroke-width": w, "stroke-linecap": "round", ...(a || {}) }, parent);

  /* ---------- la carte : un chromosome gradué en cM ---------- */
  scene("carte", {
    p: { cur: 3, tr: 0, pos: 0, nm: ["G", "L"] },
    onCur: null,
    build(g) {
      this.ti = titre(g, "Un chromosome gradué en centimorgans", "1 % de recombinés = 1 cM");
      const Y = 250;
      this.Y = Y;
      E("rect", { x: X0 - 20, y: Y - 22, width: X1 - X0 + 40, height: 44, rx: 22, class: "rulebody" }, g);
      for (let d = 0; d <= CM_MAX; d += 5) {
        ln(g, "k-ink", d % 10 === 0 ? 2.5 : 1.5, { x1: xCM(d), x2: xCM(d), y1: Y + 22, y2: Y + (d % 10 === 0 ? 40 : 32) });
        if (d % 10 === 0) fx(g, xCM(d), Y + 66, String(d), "t-lab s-ink", "middle", 24);
      }
      fx(g, X1 + 10, Y + 92, "cM", "t-lab s-dim", "end", 24);
      // mode deux gènes : G (origine) et L (curseur)
      this.D2 = E("g", {}, g);
      this.zone = E("rect", { x: X0 - 30, y: Y - 80, width: X1 - X0 + 60, height: 150, class: "reg", "fill-opacity": 0, style: "cursor:ew-resize" }, this.D2);
      const loc = (parent, nom, cls) => { const gg = E("g", {}, parent); ln(gg, cls, 5, { x1: 0, x2: 0, y1: Y - 40, y2: Y + 22 }); gg.t = fx(gg, 0, Y - 56, nom, "t-big2 s-ink", "middle", 34); return gg; };
      this.G = loc(this.D2, "G", "k-ink"); this.L = loc(this.D2, "L", "k-a");
      this.br = ln(this.D2, "k-a", 3); this.brT = fx(this.D2, 0, Y - 104, "", "t-lab2 s-a", "middle", 28);
      this.res = E("g", {}, this.D2);
      this.r1 = fx(this.res, 500, 440, "", "t-cle s-ink", "middle", 34);
      this.r2 = fx(this.res, 500, 492, "", "t-cle s-a", "middle", 34);
      this.r3 = fx(this.res, 500, 544, "", "t-lab2 s-ink", "middle", 28);
      this.lim = fx(this.D2, 500, 640, "valable pour des gènes proches : jusqu’à 30 cM environ", "t-lab s-dim", "middle", 24);
      // mode trois gènes
      this.D3 = E("g", {}, g);
      this.tab = [["A – B", TROIS.AB], ["B – C", TROIS.BC], ["A – C", TROIS.AC]].map(([t, v], i) => fx(this.D3, 500, 420 + 56 * i, `${t} : ${v} cM`, "t-cle s-ink", "middle", 36));
      this.pos3 = E("g", {}, this.D3);
      const px = { A: 0, B: TROIS.AB, C: TROIS.AC };
      Object.entries(px).forEach(([n, d]) => { const gg = E("g", {}, this.pos3); ln(gg, "k-ink", 5, { x1: xCM(d), x2: xCM(d), y1: Y - 40, y2: Y + 22 }); fx(gg, xCM(d), Y - 56, n, "t-big2 s-ink", "middle", 34); });
      this.pos3 && (this.pos3.style.opacity = 0);
      // le glisser
      const gl = (e) => { const x = svgPt(e).x, d = clamp(Math.round(((x - X0) * CM_MAX) / (X1 - X0)), 1, CARTE_MAX); this.p.cur = d; this.render(); this.onCur && this.onCur(d); };
      let drag = false;
      this.zone.addEventListener("pointerdown", (e) => { drag = true; try { this.zone.setPointerCapture(e.pointerId); } catch {} gl(e); });
      this.zone.addEventListener("pointermove", (e) => { if (drag) gl(e); });
      this.zone.addEventListener("pointerup", () => { drag = false; });
    },
    render() {
      const p = this.p, tr = clamp(p.tr, 0, 1), d = clamp(p.cur, 0, CARTE_MAX);
      show(this.D2, 1 - tr); show(this.D3, tr);
      setFx(this.G.t, p.nm[0], 34); setFx(this.L.t, p.nm[1], 34);
      this.ti.set(tr > 0.5 ? "Trois gènes sur un chromosome" : "Un chromosome gradué en centimorgans", tr > 0.5 ? "les distances se lisent en cM" : "1 % de recombinés = 1 cM");
      this.G.setAttribute("transform", `translate(${f1(xCM(0))} 0)`);
      this.L.setAttribute("transform", `translate(${f1(xCM(d))} 0)`);
      const Y = this.Y;
      setL(this.br, xCM(0), Y - 92, xCM(d), Y - 92);
      this.brT.setAttribute("x", f1((xCM(0) + xCM(d)) / 2)); this.brT.setAttribute("y", f1(Y - 102));
      setFx(this.brT, `${fr(d, d % 1 ? 1 : 0)}${NB}cM`, 28);
      setFx(this.r1, `distance = ${fr(d, d % 1 ? 1 : 0)}${NB}cM`, 34);
      setFx(this.r2, `recombinés attendus : ${fr(d, d % 1 ? 1 : 0)}${NB}%`, 34);
      setFx(this.r3, `soit ${fr(d / 2, 1)}${NB}% par classe de recombinés`.replace(",0", ""), 28);
      show(this.lim, 1);
      show(this.pos3, clamp(p.pos, 0, 1));
    },
  });

  /* ---------- l'énoncé du bac ---------- */
  const SUJET22 = [["Croisement 1 : lignée A × lignée C", false], ["F1 : toutes [vg^{+}, b^{+}]", true], ["Croisement 2 : lignée B × lignée C", false], ["deux phénotypes parentaux", false], ["deux phénotypes recombinés", false], ["NB : (vg^{+}, vg) ailes ; (b^{+}, b) corps", false]];
  const SUJET24 = [["Croisement 1 : Dexter × Dexter", false], ["donne 2/3 Dexter et 1/3 Kerry", false], ["Croisement 2 : cornes × sans cornes", false], ["donne une F1 sans cornes", false], ["Croisement 3 : F1 sans cornes et Dexter,", false], ["entre elles ; les deux gènes sont indépendants", false], ["NB : D, d (pattes) ; R, r (cornes)", false]];
  scene("bac", {
    p: { doc: 0, e1: 0, ex2: 0 },
    build(g) {
      this.ti = titre(g, "SVT, 2022, session normale, exercice 2", "drosophile : taille des ailes et couleur du corps (extrait)");
      this.d = E("g", {}, g);
      fx(this.d, 40, 134, "Document 1 : chromosome 2", "t-lab2 s-ink", "start", 24);
      const CX = 262, Y0 = 170, K = 5.4, yc = (v) => Y0 + K * v;
      E("rect", { x: CX - 11, y: Y0 - 14, width: 22, height: yc(67) - Y0 + 60, rx: 11, class: "k-ink nofill", "stroke-width": 3 }, this.d);
      E("circle", { cx: CX, cy: Y0 + 128, r: 11, class: "s-ink" }, this.d);
      const axe = ln(this.d, "k-ink", 2.5, { x1: 436, x2: 436, y1: Y0 - 14, y2: yc(67) + 50 });
      axe.setAttribute("marker-end", "url(#arw)");
      [[0, ""], [SV22.corps, "couleur du corps"], [SV22.ailes, "taille des ailes"]].forEach(([v, nom]) => {
        ln(this.d, "k-ink", 2.5, { x1: 426, x2: 446, y1: yc(v), y2: yc(v) });
        fx(this.d, 456, yc(v) + 8, String(v), "t-lab2 s-ink", "start", 26);
        if (nom) { ln(this.d, "k-ink", 5, { x1: CX - 22, x2: CX + 22, y1: yc(v), y2: yc(v) }); }
      });
      fx(this.d, CX - 34, yc(SV22.corps) - 6, "Couleur du corps", "t-lab s-ink", "end", 22);
      fx(this.d, CX - 34, yc(SV22.corps) + 18, "(noir / clair)", "t-lab s-dim", "end", 22);
      fx(this.d, CX - 34, yc(SV22.ailes) - 6, "Taille des ailes", "t-lab s-ink", "end", 22);
      fx(this.d, CX - 34, yc(SV22.ailes) + 18, "(longue / vestigiale)", "t-lab s-dim", "end", 22);
      fx(this.d, 456, yc(SV22.ailes) + 66, "distance entre les gènes, en cM", "t-lab s-dim", "start", 22);
      this.t22 = E("g", {}, this.d);
      this.mark = E("rect", { x: 526, y: 262, width: 430, height: 44, rx: 6, class: "reg f-a" }, this.t22);
      SUJET22.forEach(([t, k], i) => fx(this.t22, 540, 230 + i * 62, t, k ? "t-lab2 s-ink" : "t-lab s-ink", "start", 24));
      this.markD = E("rect", { x: 420, y: yc(SV22.corps) - 18, width: 100, height: yc(SV22.ailes) - yc(SV22.corps) + 40, rx: 6, class: "reg f-a" }, this.d);
      this.x2 = E("g", {}, g);
      SUJET24.forEach(([t], i) => fx(this.x2, 70, 190 + i * 62, t, i % 2 ? "t-lab s-dim" : "t-lab2 s-ink", "start", i % 2 ? 28 : 30));
    },
    render() {
      const p = this.p, x2 = clamp(p.ex2, 0, 1);
      this.ti.set(x2 > 0.5 ? "SVT, 2024, session normale, exercice 3" : "SVT, 2022, session normale, exercice 2", x2 > 0.5 ? "bovins : longueur des pattes et cornes (extrait)" : "drosophile : taille des ailes et couleur du corps (extrait)");
      show(this.d, p.doc * (1 - x2)); show(this.x2, x2);
      show(this.mark, p.e1); show(this.markD, p.e1);
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
      setFx(this.tag, `Piège ${Math.round(this.p.qi) + 1} sur ${QUIZ.length}`); setFx(this.big, q.big); setFx(this.sub, q.sub); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
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
