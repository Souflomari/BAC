/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « Les lois statistiques de la transmission des caractères » : `lies`, le crossing-over de F1
 * (G L // g ℓ) et le test-cross qui en porte la trace (maquette « Gènes liés » du rapport 14, dessin de la scène
 * `crossing` de la leçon méiose, dupliqué ici : les deux leçons ne partagent aucun fichier de scène).
 *
 * Deux grandeurs pilotent le dessin, chacune sur sa durée :
 *   u    de 0 à 4, la méiose : 0 la prophase I, les homologues accolés (une tétrade de quatre chromatides) ;
 *        0 → 1 le chiasma, entre les deux chromatides INTERNES (une de chaque homologue : non sœurs) ;
 *        1 → 2 il se dénoue, le segment qui porte L ou ℓ est échangé ; 2 → 3 la division I (chaque chromosome garde
 *        ses deux chromatides) ; 3 → 4 la division II : quatre cellules, quatre gamètes.
 *   bar  de 0 à 1, la mise en page : la méiose se resserre en haut, la place du bas reçoit la barre du test-cross.
 *   tc   de 0 à 1, la barre des 100 % de descendants : les quatre classes, chacune sous le gamète qui la fait naître,
 *        et les fils qui relient gamète et classe.
 * Gardes : al (écrit les allèles), tet (encadre la tétrade et la nomme), gam (écrit sous chaque cellule le gamète),
 * rc (marque les deux gamètes recombinés, et les deux petites classes), sum (la somme des recombinés, sur le total :
 * la réponse de « quelle part de recombinés ? »).
 *
 * Exactitude : les quatre chromatides sont tracées de deux morceaux, le haut (bras du gène G) et le bas (bras du gène L) ;
 * seul le bas change de chromatide, entre deux chromatides NON sœurs, en prophase I. Les gamètes viennent de
 * `gametesMeiose` (transmission-outils.js) ; les pourcentages de SV24R ; la somme de `pctRecombines`. La barre est
 * à l'échelle (100 % = toute la largeur) : les deux petites classes y sont des fentes, nommées par des fils.
 * Couleurs : des classes seulement ; l'accent marque l'origine paternelle des chromatides, puis les recombinés.
 */
import { LAB, gametesMeiose, SV24R, pctRecombines, fr, NB } from "./transmission-outils";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lisse = (t) => t * t * (3 - 2 * t);
const f1 = (v) => Number(v).toFixed(1);

const WCH = 10, BUL = 12;                 // l'épaisseur d'une chromatide, le creux de deux chromatides sœurs
const SX0 = [444, 472, 528, 556];         // la tétrade accolée, de gauche à droite : paternelle externe, paternelle interne, maternelle interne, maternelle externe
const SX1 = [278, 306, 694, 722];         // fin de la division I : un chromosome (deux chromatides) par cellule
const SX2 = [188, 396, 604, 812];         // les quatre cellules
const PAT = [true, true, false, false];   // chromatide paternelle ?
const SENS = [-1, 1, -1, 1];              // le côté de la chromatide dans son chromosome (le creux regarde le centromère)
const SWAP = [0, 2, 1, 3];                // la chromatide interne de l'autre homologue
const BX = 100, BW = 800, BY = 520, BH = 56;   // la barre du test-cross

/** la mise en page de la méiose : grande (b = 0), resserrée sous laquelle la barre se place (b = 1) */
function geom(b) {
  const CY = lerp(340, 236, b), LH = lerp(88, 58, b);
  return { CY, LH, Y0: lerp(136, 120, b), Y1: lerp(548, 352, b), YA: CY + 0.3 * LH, YB: CY + 0.7 * LH };
}
/** où est la chromatide k au palier u (le centre) */
function slot(k, u) {
  const a = lisse(clamp((u - 2) / 0.6, 0, 1)), c = lisse(clamp((u - 3.2) / 0.8, 0, 1));
  return lerp(lerp(SX0[k], SX1[k], a), SX2[k], c);
}
/** le creux de la chromatide k à la hauteur y : nul aux deux bouts, maximal au centromère, nul une fois le centromère clivé */
function creux(k, y, u, G) {
  const t = (y - G.CY) / G.LH, b = clamp(1 - (u - 3.2) * 2.5, 0, 1);
  return -SENS[k] * BUL * b * (1 - t * t) / 2;
}
function trace(xf, ya, yb, n) {
  let d = "";
  for (let i = 0; i <= n; i++) { const y = lerp(ya, yb, i / n); d += (i ? "L" : "M") + f1(xf(y)) + " " + f1(y); }
  return d;
}

export function scenesE(ctx, O) {
  const { E, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const [A1, B1] = LAB.souris.G1, [A2, B2] = LAB.souris.G2;       // G, L et g, ℓ
  const TOP = [A1, A1, A2, A2], BOT = [B1, B1, B2, B2];             // le bras du haut (G, G, g, g) et le morceau du bas (L, L, ℓ, ℓ)
  const GAM = gametesMeiose(LAB.souris, 0, 1);                      // G L, G ℓ, g L, g ℓ : les quatre cellules, de gauche à droite
  const REC = GAM.map((g, i) => g !== gametesMeiose(LAB.souris, 0, 0)[i]);   // les deux recombinés
  // les quatre classes du test-cross, dans l'ordre des cellules : le pourcentage de chacune est celui du sujet
  const CLS = [SV24R.GL, SV24R.Gl, SV24R.gL, SV24R.gl];
  const TOT = CLS.reduce((a, v) => a + v, 0);
  const XS = CLS.map((v, i) => BX + (BW * CLS.slice(0, i).reduce((a, w) => a + w, 0)) / TOT), WS = CLS.map((v) => (BW * v) / TOT);
  const REC_PCT = pctRecombines(CLS.reduce((a, v, i) => a + (REC[i] ? v : 0), 0), TOT);
  const pc = (v) => `${fr(v, 2)}${NB}%`;
  const R0 = REC.indexOf(true), R1 = REC.lastIndexOf(true);          // les deux cellules recombinées (1 et 2)
  const path = (parent, k) => E("path", { class: `${k} nofill`, "stroke-width": WCH, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent);
  const SOUS = (u, tc) => (tc > 0.5 ? "Quatre gamètes de F1, quatre classes du test-cross" : u < 0.2 ? "Prophase I : la tétrade, quatre chromatides" : u < 1.2 ? "Prophase I : un chiasma entre deux chromatides non sœurs" : u < 2.3 ? "Prophase I : le chiasma s’est dénoué, les segments sont échangés"
    : u < 3 ? "Division I : les homologues se séparent" : u < 3.5 ? "Fin de la division I : deux cellules" : u < 3.9 ? "Division II : les chromatides se séparent" : "Quatre cellules");

  scene("lies", {
    p: { u: 0, al: 0, tet: 0, gam: 0, rc: 0, bar: 0, tc: 0, sum: 0 },
    build(g) {
      this.ti = titre(g, "Le crossing-over de F1", "");
      /* le fond : les cellules, la tétrade */
      this.cells = [0, 1, 2, 3].map(() => E("rect", { class: "cell" }, g));
      this.tetR = E("rect", { rx: 12, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, g);
      this.tetT = fx(g, 500, 0, "tétrade : 4 chromatides", "t-lab s-ink", "middle");
      /* la barre du test-cross : les quatre classes, leur cadre, les fils qui les relient aux gamètes (sous les chromosomes, avant eux dans le DOM) */
      this.fil = [0, 1, 2, 3].map((i) => E("line", { class: REC[i] ? "k-a" : "k-dim", "stroke-width": REC[i] ? 2.4 : 1.6, "stroke-dasharray": "5 5" }, g));
      this.bg = E("g", {}, g);
      this.sl = CLS.map((v, i) => E("rect", { x: f1(XS[i]), y: BY, width: f1(Math.max(WS[i], 1.5)), height: BH, class: `reg ${REC[i] ? "f-a" : "f-b"}` }, this.bg));
      E("rect", { x: BX, y: BY, width: BW, height: BH, class: "k-ink nofill", "stroke-width": 2 }, this.bg);
      this.fr = E("rect", { x: f1(XS[R0] - 6), y: BY - 7, width: f1(XS[R1] + WS[R1] - XS[R0] + 12), height: BH + 14, rx: 3, class: "k-a nofill", "stroke-width": 3 }, this.bg);
      this.sg = [0, 3].map((i) => ({ i, a: fx(this.bg, XS[i] + WS[i] / 2, BY + 25, GAM[i], "t-lab2 s-ink", "middle", 26), b: fx(this.bg, XS[i] + WS[i] / 2, BY + 49, pc(CLS[i]), "t-lab2 s-ink", "middle", 24) }));
      this.rl = [R0, R1].map((i, j) => ({ i, l: E("line", { class: "k-a", "stroke-width": 1.8 }, this.bg), t: fx(this.bg, j ? XS[R1] + WS[R1] + 8 : XS[R0] - 8, BY + BH + 44, `${GAM[i]} ${pc(CLS[i])}`, "t-lab2 s-a", j ? "start" : "end", 24) }));
      this.sm = fx(this.bg, 500, 672, `recombinés : ${fr(CLS[R0], 2)} + ${fr(CLS[R1], 2)} = ${fr(REC_PCT, 0)}${NB}% du total`, "t-lab2 s-a", "middle", 26);
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
      const al = (s) => { const t = E("text", { class: "me-all s-ink", "text-anchor": "middle" }, g); t.textContent = s; t.style.fontSize = "30px"; return t; };
      this.aT = [0, 1, 2, 3].map((k) => al(TOP[k]));
      this.aB = [0, 1, 2, 3].map((k) => al(BOT[k]));
      /* sous les cellules : le gamète, puis ce qu'il est (parental ou recombiné) */
      this.gm = [0, 1, 2, 3].map((i) => fx(g, 0, 596, GAM[i], "me-all s-ink", "middle", 30));
      this.gk = [0, 1, 2, 3].map((i) => fx(g, 0, 632, REC[i] ? "recombiné" : "parental", REC[i] ? "me-gen s-a" : "me-gen s-dim", "middle", 24));
    },
    render() {
      const p = this.p, u = clamp(p.u, 0, 4), al = clamp(p.al, 0, 1), rc = clamp(p.rc, 0, 1), b = clamp(p.bar, 0, 1), tc = clamp(p.tc, 0, 1);
      const G = geom(b), { CY, LH, Y0, Y1, YA, YB } = G;
      this.ti.set("Le crossing-over de F1", SOUS(u, tc));
      /* les cellules : une, deux (cytocinèse de la division I), quatre (division II) */
      const s1 = lisse(clamp((u - 2.5) / 0.5, 0, 1)), s2 = lisse(clamp((u - 3.5) / 0.5, 0, 1));
      const x1A = lerp(110, 96, s1), Rx1 = lerp(890, 512, s1), Rx2 = lerp(890, 904, s1);
      const R = [
        [x1A, lerp(lerp(890, 488, s1), 280, s2), 1],
        [lerp(488, 304, s2), 488, clamp(s2 * 4, 0, 1)],
        [Rx1, lerp(Rx2, 696, s2), clamp(s1 * 4, 0, 1)],
        [lerp(904, 720, s2), 904, clamp(s2 * 4, 0, 1)],
      ];
      const cc = R.map(([a, c, op], i) => {
        const r = this.cells[i];
        r.setAttribute("x", f1(a)); r.setAttribute("y", f1(Y0)); r.setAttribute("width", f1(Math.max(0, c - a))); r.setAttribute("height", f1(Y1 - Y0));
        r.setAttribute("rx", f1(Math.min(90, Math.max(0, (c - a) / 2)))); r.style.opacity = op;
        r.setAttribute("class", REC[i] && rc > 0.5 && u > 3.9 ? "cell hl-log" : "cell");
        return { x: (a + c) / 2, op };
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
      this.up.forEach((q, k) => { q.setAttribute("d", trace((y) => sx(k) + creux(k, y, u, G), CY - LH, YA, NU)); });
      this.lo.forEach((q, k) => {
        const inner = k === 1 || k === 2;
        q.setAttribute("d", trace((y) => { const xv = lerp(sx(k) + creux(k, y, u, G), sx(SWAP[k]) + creux(SWAP[k], y, u, G), inner ? a : 0); const xk = sx(k) + creux(k, y, u, G); return xk + (xv - xk) * wz(y); }, YA, CY + LH, NL));
        q.style.opacity = inner ? 1 - rw : 1;
      });
      this.lx.forEach((q, i) => {
        const k = i + 1;
        q.setAttribute("d", trace((y) => sx(k) + creux(k, y, u, G), YA, CY + LH, NL));
        q.style.opacity = rw;
      });
      /* les centromères : un par chromosome tant que le centromère n'est pas clivé (après la division I), puis un par chromatide */
      const cen = clamp(1 - (u - 3.2) / 0.15, 0, 1);
      this.cen.forEach((c, i) => { c.setAttribute("cx", f1((sx(2 * i) + sx(2 * i + 1)) / 2)); c.setAttribute("cy", f1(CY)); c.style.opacity = cen; });
      this.cen2.forEach((c, k) => { c.setAttribute("cx", f1(sx(k))); c.setAttribute("cy", f1(CY)); c.style.opacity = 1 - cen; });
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
      this.gm.forEach((t, i) => { t.setAttribute("x", f1(cc[i].x)); t.setAttribute("y", f1(Y1 + 48)); t.style.opacity = gv * cc[i].op; });
      this.gk.forEach((t, i) => { t.setAttribute("x", f1(cc[i].x)); t.setAttribute("y", f1(Y1 + 84)); t.style.opacity = gv * cc[i].op * rc; });
      /* la barre du test-cross : les fils descendent de chaque gamète à sa classe ; la barre paraît avec tc ; les recombinés sont encadrés */
      const y0 = Y1 + 100, yb = BY - 8;
      this.fil.forEach((l, i) => {
        const xc = XS[i] + WS[i] / 2;
        l.setAttribute("x1", f1(cc[i].x)); l.setAttribute("y1", f1(y0)); l.setAttribute("x2", f1(lerp(cc[i].x, xc, tc))); l.setAttribute("y2", f1(lerp(y0, yb, tc)));
        l.style.opacity = tc > 0 ? gv : 0;
      });
      show(this.bg, tc * gv);
      show(this.fr, rc); this.rl.forEach((q) => { const xc = XS[q.i] + WS[q.i] / 2; q.l.setAttribute("x1", f1(xc)); q.l.setAttribute("y1", BY + BH + 2); q.l.setAttribute("x2", f1(xc + (q.i === R0 ? -8 : 8))); q.l.setAttribute("y2", BY + BH + 22); show(q.t, rc); });
      show(this.sm, clamp(p.sum, 0, 1));
    },
  });
}
