/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « La méiose, la fécondation et les brassages » : `crossing`, le crossing-over de la grande paire,
 * dessiné comme la scène `division` (maquette « Méiose : le crossing-over », rapport 14) : de vrais chromosomes
 * bichromatidiens (deux chromatides sœurs jointes par UN centromère), les mêmes cellules, la même épaisseur.
 *
 * Une seule grandeur pilote le dessin : `u`, de 0 à 4.
 *   0   prophase I : les homologues sont accolés, une tétrade de quatre chromatides (paternelles en accent, maternelles en encre)
 *   0 → 1   le chiasma : les deux chromatides INTERNES (une de chaque homologue : non sœurs) se croisent sous le centromère
 *   1 → 2   le chiasma se dénoue : chacune garde son haut et reçoit le bas de l'autre (le segment portant D ou d est échangé)
 *   2 → 3   division I : les homologues se séparent (chaque chromosome garde ses DEUX chromatides et son centromère), deux cellules
 *   3 → 4   division II : le centromère se clive, une chromatide par cellule : quatre cellules
 *
 * Ce qui suit les segments : les quatre chromatides sont toutes tracées de deux morceaux, le haut (le bras qui porte A ou a, avec le
 * centromère) et le bas (le bras qui porte D ou d). Le bas est un morceau à part, qui change de chromatide au chiasma : son allèle
 * (D ou d) et sa couleur le suivent. Les positions viennent de `slot(k, u)` ; rien n'est posé à l'œil, et rien n'est dans un `<g>` transformé.
 * Les allèles et les gamètes viennent de `meiose-outils.js` (`gametes(0, 1)` : AD, Ad, aD, ad).
 *
 * Gardes : al (écrit les allèles), tet (encadre la tétrade et la nomme), gam (écrit sous chaque cellule le gamète),
 * rc (marque les deux gamètes recombinés).
 */
import { gametes, ALL } from "./meiose-outils";

const CY = 340;                           // le centre des chromosomes (y)
const LH = 88;                            // demi-longueur d'une chromatide
const WCH = 10;                           // son épaisseur
const BUL = 12;                           // le creux des deux chromatides sœurs
const Y0 = 136, Y1 = 548;                 // le haut et le bas des cellules
const YA = CY + 0.3 * LH, YB = CY + 0.7 * LH;   // la zone du chiasma, sous le centromère
// les quatre chromatides, de gauche à droite : [paternelle externe, paternelle interne, maternelle interne, maternelle externe]
const SX0 = [444, 472, 528, 556];         // la tétrade accolée
const SX1 = [278, 306, 694, 722];         // fin de la division I : un chromosome (deux chromatides) par cellule
const SX2 = [188, 396, 604, 812];         // les quatre cellules
const PAT = [true, true, false, false];   // chromatide paternelle ?
const SENS = [-1, 1, -1, 1];              // le côté de la chromatide dans son chromosome (le creux regarde le centromère)
const SWAP = [0, 2, 1, 3];                // la chromatide interne de l'autre homologue
const TOP = [ALL.G1[0], ALL.G1[0], ALL.G2[0], ALL.G2[0]];   // le bras du haut : A, A, a, a
const BOT = [ALL.G1[1], ALL.G1[1], ALL.G2[1], ALL.G2[1]];   // le bas : D, D, d, d (le morceau, d'origine)
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lisse = (t) => t * t * (3 - 2 * t);
const f1 = (v) => Number(v).toFixed(1);

/** où est la chromatide k au palier u (le centre) */
function slot(k, u) {
  const f1_ = lisse(clamp((u - 2) / 0.6, 0, 1)), f2 = lisse(clamp((u - 3.2) / 0.8, 0, 1));
  return lerp(lerp(SX0[k], SX1[k], f1_), SX2[k], f2);
}
/** le creux de la chromatide k à la hauteur y : nul aux deux bouts, maximal au centromère, et nul une fois le centromère clivé */
function creux(k, y, u) {
  const t = (y - CY) / LH, b = clamp(1 - (u - 3.2) * 2.5, 0, 1);
  return -SENS[k] * BUL * b * (1 - t * t) / 2;
}
/** le tracé d'une chromatide entre deux hauteurs : x(y) donné, échantillonné */
function trace(xf, ya, yb, n) {
  let d = "";
  for (let i = 0; i <= n; i++) { const y = lerp(ya, yb, i / n); d += (i ? "L" : "M") + f1(xf(y)) + " " + f1(y); }
  return d;
}

export function scenesE(ctx, O) {
  const { E, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const GAM = gametes(0, 1).map((g) => g.split(" ")[0]);      // AD, Ad, aD, ad
  const REC = GAM.map((g, i) => g !== gametes(0, 0)[i].split(" ")[0]);   // les deux recombinés
  const path = (parent, k) => E("path", { class: `${k} nofill`, "stroke-width": WCH, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
  const SOUS = (u) => (u < 0.2 ? "Prophase I : la tétrade, quatre chromatides" : u < 1.2 ? "Prophase I : un chiasma entre deux chromatides non sœurs" : u < 2.3 ? "Prophase I : le chiasma s’est dénoué, les segments sont échangés"
    : u < 3 ? "Division I : les homologues se séparent" : u < 3.5 ? "Fin de la division I : deux cellules" : u < 3.9 ? "Division II : les chromatides se séparent" : "Quatre cellules");

  scene("crossing", {
    p: { u: 0, al: 0, tet: 0, gam: 0, rc: 0 },
    build(g) {
      this.ti = titre(g, "Le crossing-over, sur la grande paire", "");
      /* le fond : les cellules, la tétrade */
      this.cells = [0, 1, 2, 3].map(() => E("rect", { class: "cell" }, g));
      this.tetR = E("rect", { rx: 12, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, g);
      this.tetT = fx(g, 500, 0, "tétrade : 4 chromatides", "t-lab s-ink", "middle");
      /* les chromatides : le haut (avec le centromère), puis le bas, en deux versions pour les deux internes (croisée, puis échangée) */
      this.up = [0, 1, 2, 3].map((k) => path(g, PAT[k] ? "k-a" : "k-ink"));
      this.lo = [0, 1, 2, 3].map((k) => path(g, PAT[k] ? "k-a" : "k-ink"));                     // le bas d'origine (tant que le chiasma n'est pas dénoué)
      this.lx = [1, 2].map((k) => path(g, PAT[SWAP[k]] ? "k-a" : "k-ink"));                      // le bas échangé : celui de l'autre chromatide
      /* les centromères : un par chromosome (deux chromatides), puis un par chromatide */
      this.cen = [0, 1].map((i) => E("circle", { r: 7.5, class: `s-bg ${i ? "k-ink" : "k-a"}`, "stroke-width": 3 }, g));
      this.cen2 = [0, 1, 2, 3].map((k) => E("circle", { r: 7.5, class: `s-bg ${PAT[k] ? "k-a" : "k-ink"}`, "stroke-width": 3 }, g));
      /* le chiasma : un cercle en tirets et son nom */
      this.chi = E("g", {}, g);
      E("circle", { r: 26, class: "k-a nofill", "stroke-width": 2.5, "stroke-dasharray": "5 5" }, this.chi);
      this.chiT = fx(this.chi, 0, 0, "chiasma", "t-lab2 s-a", "start");
      /* les allèles : le haut (un par chromatide), le bas (un par morceau : il suit son segment) */
      this.aT = [0, 1, 2, 3].map((k) => { const t = E("text", { class: "me-all s-ink", "text-anchor": "middle" }, g); t.textContent = TOP[k]; return t; });
      this.aB = [0, 1, 2, 3].map((k) => { const t = E("text", { class: "me-all s-ink", "text-anchor": "middle" }, g); t.textContent = BOT[k]; return t; });
      /* sous les cellules : le gamète, puis ce qu'il est (parental ou recombiné) */
      this.gm = [0, 1, 2, 3].map((i) => fx(g, 0, 596, GAM[i], "me-all s-ink", "middle"));
      this.gk = [0, 1, 2, 3].map((i) => fx(g, 0, 632, REC[i] ? "recombiné" : "parental", REC[i] ? "me-gen s-a" : "me-gen s-dim", "middle"));
    },
    render() {
      const p = this.p, u = clamp(p.u, 0, 4), al = clamp(p.al, 0, 1), rc = clamp(p.rc, 0, 1);
      this.ti.set("Le crossing-over, sur la grande paire", SOUS(u));
      /* les cellules : une, deux (cytocinèse de la division I), quatre (division II) */
      const s1 = lisse(clamp((u - 2.5) / 0.5, 0, 1)), s2 = lisse(clamp((u - 3.5) / 0.5, 0, 1));
      const x1A = lerp(110, 96, s1), Rx1 = lerp(890, 512, s1), Rx2 = lerp(890, 904, s1);
      const R = [
        [x1A, lerp(lerp(890, 488, s1), 280, s2), 1],
        [lerp(488, 304, s2), 488, clamp(s2 * 4, 0, 1)],
        [Rx1, lerp(Rx2, 696, s2), clamp(s1 * 4, 0, 1)],
        [lerp(904, 720, s2), 904, clamp(s2 * 4, 0, 1)],
      ];
      const cc = R.map(([a, b, op], i) => {
        const r = this.cells[i];
        r.setAttribute("x", f1(a)); r.setAttribute("y", Y0); r.setAttribute("width", f1(Math.max(0, b - a))); r.setAttribute("height", Y1 - Y0);
        r.setAttribute("rx", f1(Math.min(90, Math.max(0, (b - a) / 2)))); r.style.opacity = op;
        r.setAttribute("class", (i === 1 || i === 2) && rc > 0.5 ? "cell hl-log" : "cell");
        return { x: (a + b) / 2, op };
      });
      /* la tétrade : un cadre autour des quatre chromatides, tant qu'elles sont accolées */
      const wt = clamp(p.tet, 0, 1) * clamp((2.3 - u) / 0.3, 0, 1), tx0 = slot(0, u), tx1 = slot(3, u);
      this.tetR.setAttribute("x", f1(tx0 - 34)); this.tetR.setAttribute("y", f1(CY - LH - 50)); this.tetR.setAttribute("width", f1(tx1 - tx0 + 68)); this.tetR.setAttribute("height", f1(2 * LH + 108)); show(this.tetR, wt);
      this.tetT.setAttribute("x", f1((tx0 + tx1) / 2)); this.tetT.setAttribute("y", f1(CY - LH - 62)); show(this.tetT, wt);
      /* les morceaux du bas : à la charge du chiasma (u de 0 à 1), les deux internes échangent leur place ; le bas d'origine reste dessiné
         jusqu'à ce que le chiasma se dénoue (u de 1,2 à 1,8), où chaque chromatide interne se rebranche sur le bas de l'autre, droit */
      const a = lisse(clamp(u, 0, 1)), rw = lisse(clamp((u - 1.2) / 0.6, 0, 1));
      const wz = (y) => lisse(clamp((y - YA) / (YB - YA), 0, 1));           // le passage de l'un à l'autre dans la zone du chiasma
      const sx = (k) => slot(k, u);
      const NU = 10, NL = 14;
      this.up.forEach((q, k) => { q.setAttribute("d", trace((y) => sx(k) + creux(k, y, u), CY - LH, YA, NU)); });
      this.lo.forEach((q, k) => {
        const inner = k === 1 || k === 2;
        // le bas croisé : de k vers la place de l'autre (a de 0 à 1) ; son creux suit la place visée
        q.setAttribute("d", trace((y) => { const xv = lerp(sx(k) + creux(k, y, u), sx(SWAP[k]) + creux(SWAP[k], y, u), inner ? a : 0); const xk = sx(k) + creux(k, y, u); return xk + (xv - xk) * wz(y); }, YA, CY + LH, NL));
        q.style.opacity = inner ? 1 - rw : 1;
      });
      this.lx.forEach((q, i) => {
        const k = i + 1;
        q.setAttribute("d", trace((y) => sx(k) + creux(k, y, u), YA, CY + LH, NL));
        q.style.opacity = rw;
      });
      /* les centromères : un par chromosome tant que le centromère n'est pas clivé (après la division I), puis un par chromatide */
      const cen = clamp(1 - (u - 3.2) / 0.15, 0, 1);
      this.cen.forEach((c, i) => { c.setAttribute("cx", f1((sx(2 * i) + sx(2 * i + 1)) / 2)); c.setAttribute("cy", CY); c.style.opacity = cen; });
      this.cen2.forEach((c, k) => { c.setAttribute("cx", f1(sx(k))); c.setAttribute("cy", CY); c.style.opacity = 1 - cen; });
      /* le chiasma : entre les deux chromatides internes, à mi-hauteur de la zone */
      const wc = clamp(u / 0.7, 0, 1) * clamp((1.5 - u) / 0.4, 0, 1), xm = (sx(1) + sx(2)) / 2, ym = (YA + YB) / 2;
      const cr = this.chi.firstChild; cr.setAttribute("cx", f1(xm)); cr.setAttribute("cy", f1(ym));
      this.chiT.setAttribute("x", f1(sx(3) + 48)); this.chiT.setAttribute("y", f1(ym + 8));
      show(this.chi, wc);
      /* les allèles : le haut avec la chromatide, le bas avec son morceau (il change de chromatide au chiasma) */
      this.aT.forEach((t, k) => { t.setAttribute("x", f1(sx(k))); t.setAttribute("y", f1(CY - LH - 14)); t.style.opacity = al; });
      this.aB.forEach((t, k) => {
        const inner = k === 1 || k === 2, x = inner ? lerp(sx(k), sx(SWAP[k]), a) : sx(k);
        t.setAttribute("x", f1(x)); t.setAttribute("y", f1(CY + LH + 36)); t.style.opacity = al;
      });
      /* sous les quatre cellules : le gamète, puis ce qu'il est */
      const gv = clamp(p.gam, 0, 1) * clamp((u - 3.8) / 0.2, 0, 1);
      this.gm.forEach((t, i) => { t.setAttribute("x", f1(cc[i].x)); t.style.opacity = gv * cc[i].op; });
      this.gk.forEach((t, i) => { t.setAttribute("x", f1(cc[i].x)); t.style.opacity = gv * cc[i].op * rc; });
    },
  });
}
