/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Transformations non totales » (V3), deuxième partie : la loupe de la scène `solution`
 * (jeux `zoom` et `duo`). Les 100 molécules d'acide, leur graphe n(A⁻) en fonction du tic, les gros plans
 * d'un transfert de proton. Un seul paramètre continu, `tic`, pilote la loupe, le compte et le graphe : tout
 * l'état se calcule depuis lui (aller, retour, saut donnent la même image).
 *
 * Paramètres du jeu `zoom` :
 *   acide  'ethan' | 'hcl' | 'nh3'     l'acide de la loupe ; 'nh3' : le gros plan de l'ammoniac et de l'eau
 *   depart 'acide' | 'ions'            100 AH, ou 100 A⁻ et 100 H₃O⁺ (la seconde série figée, étape `sens`)
 *   tic    continu                      partie entière : le tic ; partie décimale : le transfert qui s'anime
 *   graph  0 → 1                        le graphe n(A⁻) en fonction du tic, à droite
 *   lisse  0 → 1                        la courbe lisse « dans un bécher », la droite des 4 %, le pH-mètre
 *   ring   indice | -1                  la molécule encadrée (en rouge)
 *   hist   0 → 1                        l'histoire de la molécule encadrée, tic 30 à 35
 *   cpt    0 → 1                        les deux compteurs : protons cédés, protons repris (depuis le tic 35)
 *   eq     0 | 1 | 2                    le bandeau de l'équation : rien, la flèche à trouver (« ? »), ⇄ avec 1 et 2
 *   ymax   20 → 100                     la hauteur de l'axe du graphe : 100 tant que l'on ne sait pas où le compte s'arrête
 *   etiq   0 → 1                        « état d'équilibre » sur le palier
 *   vol    1 → 10                       la dilution : la vignette « avant / après » (les mêmes 100 molécules dans 1 puis 10 volumes) ;
 *                                       la grille ne change pas (cent molécules ne tiennent pas dix fois plus à l'aise dans la scène)
 *   vign   0 → 1, vtr 0 → 1             la vignette d'une paire A⁻ / H₃O⁺ en gros plan, et le proton qui repasse
 *   leg    0 | 1 | 2 | 3                la légende : rien, AH, + A⁻, + H₃O⁺ (les noms ne sont dits qu'une fois utiles)
 *   gros   0 → 1, tr 0 → 1              le gros plan (acide + eau) et le proton qui passe
 * Les jetons H₃O⁺ n'appartiennent à aucune molécule (voir `jetons` dans les outils) : le proton qu'un A⁻ reprend
 * vient du jeton d'un H₃O⁺ voisin, pas de « sa » molécule ; la note de la scène dit que, en vrai, toutes bougent.
 * Le rouge d'une scène ne marque qu'une chose : les points du compte ; la molécule encadrée le prend quand elle
 * paraît. Les glyphes de molécule font 30 unités ; aucune étiquette n'est posée sur les molécules.
 */
import { NM, PD, SERIE, SERIE_IONS, SERIE_HCL, RING, LISSE, TICS, T_DIL, TAU, phLisse, transferts, fr } from "./transformations-non-totales-outils";

export const RG = 15;                                   // rayon d'un glyphe de molécule : 30 unités
const PS = [11, -11];                                   // le proton, sur le bord du disque

/** les 100 glyphes d'une grille : un disque (AH plein, A⁻ ouvert), son proton, une place pour un jeton H₃O⁺ ; le proton en vol est dessiné par-dessus tous les glyphes */
export function mkGlyphes(parent, E) {
  const G = Array.from({ length: NM }, () => {
    const g = E("g", {}, parent);
    const disc = E("circle", { r: RG, class: "tn-ah" }, g);
    const moins = E("line", { x1: -7, x2: 7, y1: 0, y2: 0, class: "k-ink", "stroke-width": 3, "stroke-linecap": "round" }, g);
    const pr = E("circle", { cx: PS[0], cy: PS[1], r: 5.5, class: "tn-pr" }, g);
    const tok = E("path", { d: "M0 -9 L9 6 L-9 6 Z", class: "tn-tok" }, g);
    return { g, disc, moins, pr, tok, fly: null, pos: [0, 0], pitch: 42, tdx: 21, tdy: 21 };
  });
  const over = E("g", {}, parent);
  G.forEach((x) => { x.fly = E("circle", { r: 6.5, class: "tn-fly" }, over); });
  return G;
}
/**
 * pose un glyphe : e = 0 (AH) ou 1 (A⁻) ; f : 0 → 1, le transfert en cours (0 : au repos) ; sens > 0 : AH cède (le proton
 * va vers le jeton), sens < 0 : A⁻ reprend (le proton vient d'un jeton) ; `cible` : [dx, dy], la place de ce jeton
 * dans le repère du glyphe. Le jeton lui-même se pose avec `poserJeton`.
 */
export function poserGlyphe(G, e, f, sens, cible) {
  const montrer = (el, o) => { el.style.opacity = o; };
  let ah = e === 0, pr = e === 0, fly = 0, fx = 0, fy = 0;
  if (f > 1e-3 && sens !== 0 && cible) {
    const a = sens > 0 ? [PS[0], PS[1]] : cible, b = sens > 0 ? cible : [PS[0], PS[1]];
    const k = f < 0.5 ? 2 * f * f : 1 - 2 * (1 - f) * (1 - f);
    fx = a[0] + (b[0] - a[0]) * k; fy = a[1] + (b[1] - a[1]) * k - 10 * Math.sin(Math.PI * f);
    fly = 1; ah = f < 0.5 ? sens > 0 : sens < 0;       // la molécule change de nature à mi-chemin
    pr = false;
    // à la fin d'un transfert, le disque porte son état d'arrivée
  }
  G.disc.setAttribute("class", ah ? "tn-ah" : "tn-an");
  montrer(G.moins, ah ? 0 : 1); montrer(G.pr, pr ? 1 : 0);
  montrer(G.fly, fly);
  if (fly) { G.fly.setAttribute("cx", (G.pos[0] + fx).toFixed(1)); G.fly.setAttribute("cy", (G.pos[1] + fy).toFixed(1)); }
}
/** le jeton H₃O⁺ de la place d'un glyphe : v = 0 ou 1 */
export function poserJeton(G, v) {
  G.tok.style.opacity = v; G.tok.setAttribute("transform", `translate(${G.tdx} ${G.tdy})`);
}
/** le jeton H₃O⁺ d'un glyphe se pose dans l'interstice en bas à droite ; sur la dernière colonne ou la dernière ligne, en bas à gauche, en haut */
function placer(G, x, y, pitch, i) {
  if (G.pos[0] === x && G.pos[1] === y && G.pitch === pitch) return;
  G.tdx = (i % 10 === 9 ? -1 : 1) * pitch / 2; G.tdy = (i >= 90 ? -1 : 1) * pitch / 2;
  G.pos = [x, y]; G.pitch = pitch; G.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
}

/** un gros plan : deux molécules et le proton qui passe de l'une à l'autre */
function mkPaire(parent, E, lab, c) {
  const g = E("g", {}, parent);
  const d1 = E("circle", { cx: c.x1, cy: c.y, r: c.r1, class: "tn-ah" }, g);
  const d2 = E("circle", { cx: c.x2, cy: c.y, r: c.r2, class: "tn-ah" }, g);
  const m1 = E("line", { x1: c.x1 - c.r1 * 0.4, x2: c.x1 + c.r1 * 0.4, y1: c.y, y2: c.y, class: "k-ink", "stroke-width": 4, "stroke-linecap": "round" }, g);
  const pr = E("circle", { r: c.rp, class: "tn-fly" }, g);
  const hp = lab(g, 0, 0, "H^{+}", "tn-l s-ink", "middle", 26);
  const l1a = lab(g, c.x1, c.y + c.r1 + 44, "", "tn-g s-ink", "middle", 32), l2a = lab(g, c.x2, c.y + c.r2 + 44, "", "tn-g s-ink", "middle", 32);
  return { g, d1, d2, m1, pr, hp, l1a, l2a, c };
}
function reglerPaire(P, setFx, cfg, tr, cache) {
  const c = P.c, k = tr < 0.5 ? 2 * tr * tr : 1 - 2 * (1 - tr) * (1 - tr);
  const [xa, ya] = cfg.dir > 0 ? [c.x1 + c.r1 * 0.72, c.y - c.r1 * 0.72] : [c.x2 - c.r2 * 0.72, c.y - c.r2 * 0.72];
  const [xb, yb] = cfg.dir > 0 ? [c.x2 - c.r2 * 0.72, c.y - c.r2 * 0.72] : [c.x1 + c.r1 * 0.72, c.y - c.r1 * 0.72];
  const x = xa + (xb - xa) * k, y = ya + (yb - ya) * k - c.arc * Math.sin(Math.PI * tr);
  P.pr.setAttribute("cx", x.toFixed(1)); P.pr.setAttribute("cy", y.toFixed(1));
  P.hp.setAttribute("x", x.toFixed(1)); P.hp.setAttribute("y", (y - 22).toFixed(1));
  // `cache` : avant le transfert, le proton n'est pas dessiné (il dirait d'où il part, donc qui le cède)
  P.pr.style.opacity = cache && tr < 1e-3 ? 0 : 1; P.hp.style.opacity = cache && tr < 1e-3 ? 0 : 1;
  const apres = tr >= 0.5;
  setFx(P.l1a, apres ? cfg.l1b : cfg.l1a); setFx(P.l2a, apres ? cfg.l2b : cfg.l2a);
  P.d1.setAttribute("class", (apres ? cfg.o1b : cfg.o1a) ? "tn-an" : "tn-ah"); P.d2.setAttribute("class", (apres ? cfg.o2b : cfg.o2a) ? "tn-an" : "tn-ah");
  P.m1.style.opacity = (apres ? cfg.o1b : cfg.o1a) ? 1 : 0;
}

export function zoomBuild(ctx, O, g) {
  const { E, clamp, show } = ctx;
  const { lab, setFx, axes } = O;
  const root = E("g", {}, g);
  /* ----- la grille de 100 molécules, sous une loupe ----- */
  const grille = E("g", {}, root);
  const cadre = E("rect", { rx: 26, class: "nofill k-dim", "stroke-width": 3 }, grille);
  const gl = mkGlyphes(grille, E);
  const bague = E("rect", { width: 44, height: 44, rx: 9, class: "k-a nofill", "stroke-width": 4 }, grille);
  /* ----- la légende : au plus trois noms ----- */
  const leg = E("g", {}, root);
  const legG = [0, 1, 2].map((j) => E("g", {}, leg));
  const lgAH = E("circle", { r: RG, class: "tn-ah" }, legG[0]); E("circle", { cx: PS[0], cy: PS[1], r: 5.5, class: "tn-pr" }, legG[0]);
  const lgAN = E("circle", { r: RG, class: "tn-an" }, legG[1]); E("line", { x1: -7, x2: 7, y1: 0, y2: 0, class: "k-ink", "stroke-width": 3, "stroke-linecap": "round" }, legG[1]);
  E("path", { d: "M0 -9 L9 6 L-9 6 Z", class: "tn-tok" }, legG[2]);
  const lgT = [lab(legG[0], 28, 9, "AH", "tn-l s-ink", "start", 26), lab(legG[1], 28, 9, "A^{−}", "tn-l s-ink", "start", 26), lab(legG[2], 20, 9, "H_{3}O^{+}", "tn-l s-ink", "start", 26)];
  /* ----- le bandeau de l'équation ----- */
  const eqg = E("g", {}, root);
  const eqL = lab(eqg, 444, 600, "CH_{3}COOH_{(aq)} + H_{2}O_{(l)}", "tn-g s-ink", "end", 30);
  const eqF = lab(eqg, 500, 600, "?", "tn-g s-ink", "middle", 40);
  const eqR = lab(eqg, 556, 600, "CH_{3}COO^{−}_{(aq)} + H_{3}O^{+}_{(aq)}", "tn-g s-ink", "start", 30);
  const eq1 = lab(eqg, 528, 590, "1", "tn-l s-ink", "start", 26), eq2 = lab(eqg, 528, 618, "2", "tn-l s-ink", "start", 26);
  /* ----- le graphe, à droite ----- */
  const GX0 = 650, GX1 = 960, GY0 = 480, GY1 = 170, NX = 30;
  const ech = { NY: 20 };                                  // la hauteur de l'axe, en molécules : 20, ou 100 avant que le compte ait dit où il s'arrête
  const gr = E("g", {}, root);
  const X = (t, w0) => GX0 + ((GX1 - GX0) * (t - w0)) / NX, Y = (n) => GY0 - ((GY0 - GY1) * n) / ech.NY;
  const axg = E("g", {}, gr);
  E("line", { x1: GX0, y1: GY0, x2: GX1 + 10, y2: GY0, class: "k-dim", "stroke-width": 2 }, axg);
  E("line", { x1: GX0, y1: GY0, x2: GX0, y2: GY1 - 14, class: "k-dim", "stroke-width": 2 }, axg);
  const yticks = Array.from({ length: 4 }, () => ({ l: E("line", { x1: GX0 - 7, x2: GX0, class: "k-dim", "stroke-width": 2 }, axg), t: lab(axg, GX0 - 12, 0, "", "t-sous s-c", "end", 22) }));
  lab(axg, GX1 + 10, GY0 + 56, "tic", "tn-l s-c", "end", 26);
  const ticks = Array.from({ length: 5 }, () => ({ l: E("line", { y1: GY0, y2: GY0 + 7, class: "k-dim", "stroke-width": 2 }, axg), t: lab(axg, 0, GY0 + 30, "", "t-sous s-c", "middle", 22) }));
  const clip = E("clipPath", { id: "tnclip" }, ctx.defs); E("rect", { x: GX0 - 4, y: GY1 - 10, width: GX1 - GX0 + 22, height: GY0 - GY1 + 20 }, clip);
  const dessin = E("g", { "clip-path": "url(#tnclip)" }, gr);
  const polyN = E("polyline", { class: "k-dim nofill", "stroke-width": 1.5 }, dessin);
  const lissePath = E("polyline", { class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round" }, dessin);
  const palierL = E("line", { x1: GX0, x2: GX1, class: "k-ink", "stroke-width": 2.5, "stroke-dasharray": "9 7" }, gr);
  const palierT = lab(gr, GX1 + 6, 0, "", "tn-l s-ink", "end", 26);
  const palierK = E("line", { x1: GX1 - 20, x2: GX1 - 20, class: "k-dim", "stroke-width": 2 }, gr);
  const pts = Array.from({ length: TICS + 1 }, () => E("circle", { r: 6.5, class: "tn-pt" }, dessin));
  const lec = lab(gr, GX0 - 10, 130, "", "tn-l s-ink", "start", 26);
  /* le pH-mètre couplé à la courbe lisse (jamais aux points) */
  const phg = E("g", {}, gr);
  E("rect", { x: 800, y: 150, width: 160, height: 52, rx: 8, class: "s-bg k-ink", "stroke-width": 2.5 }, phg);
  lab(phg, 812, 185, "pH", "tn-s s-c", "start", 22);
  const phT = lab(phg, 950, 186, "", "tn-g s-ink", "end", 30);
  const etg = E("g", {}, gr);
  E("line", { x1: 0, x2: 0, y1: Y(8.2), y2: Y(8.2), class: "k-ink", "stroke-width": 3 }, etg);
  const etL = E("line", { y1: Y(8.2), y2: Y(8.2), class: "k-ink", "stroke-width": 3 }, etg);
  const etT = lab(etg, 0, Y(8.2) - 16, "état d’équilibre", "tn-g s-ink", "middle", 28);
  /* ----- l'histoire de la molécule encadrée, les deux compteurs ----- */
  const hg = E("g", {}, root);
  const hGl = Array.from({ length: 6 }, (_, j) => { const gg = E("g", {}, hg); const x = 716 + j * 44; gg.setAttribute("transform", `translate(${x} 598)`); E("circle", { r: 14, class: "tn-ah" }, gg); const m = E("line", { x1: -6, x2: 6, y1: 0, y2: 0, class: "k-ink", "stroke-width": 3, "stroke-linecap": "round" }, gg); const p = E("circle", { cx: 10, cy: -10, r: 5, class: "tn-pr" }, gg); return { gg, m, p, d: gg.firstChild }; });
  lab(hg, 696, 608, "tic 30", "tn-l s-ink", "end", 26); lab(hg, 990, 608, "35", "tn-l s-ink", "end", 26);
  lab(hg, 650, 566, "la molécule encadrée", "tn-s s-c", "start", 22);
  const cg = E("g", {}, root);
  const cT1 = lab(cg, 650, 566, "", "tn-l s-ink", "start", 26), cT2 = lab(cg, 650, 606, "", "tn-l s-ink", "start", 26);
  /* ----- les gros plans : un transfert, et la vignette de l'étape `inverse` ----- */
  const gros = E("g", {}, root);
  const eaux = [[455, 190, 40], [480, 545, 44], [840, 210, 44], [830, 525, 40], [165, 150, 36], [150, 560, 40]].map(([x, y, r]) => E("circle", { cx: x, cy: y, r, class: "tn-ah" }, gros));
  const P1 = mkPaire(gros, E, lab, { x1: 300, x2: 690, y: 380, r1: 96, r2: 66, rp: 12, arc: 60 });
  const vig = E("g", {}, root);
  E("rect", { x: 610, y: 200, width: 360, height: 280, rx: 22, class: "nofill k-ink", "stroke-width": 3 }, vig);
  const P2 = mkPaire(vig, E, lab, { x1: 720, x2: 870, y: 330, r1: 48, r2: 34, rp: 9, arc: 36 });
  /* ----- la vignette de la dilution : les mêmes 100 molécules dans un volume, puis dans dix (un schéma, pas la loupe) ----- */
  const dv = E("g", {}, root);
  const U = 36, AX = 600, AY = 588, BX0 = 700, BY0 = 552;   // un « volume » : un carré de 36 unités ; avant : un carré ; après : dix, sur deux rangées
  const pas = [[0.2, 0.2], [0.7, 0.15], [0.45, 0.4], [0.12, 0.62], [0.8, 0.5], [0.3, 0.85], [0.6, 0.72], [0.92, 0.88], [0.05, 0.38], [0.55, 0.05]];   // dix points dans un volume
  lab(dv, AX - 8, AY + 28, "avant", "tn-s s-ink", "end", 22);
  E("rect", { x: AX, y: AY, width: U, height: U, class: "nofill k-ink", "stroke-width": 2.5 }, dv);
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) E("circle", { cx: AX + 1.8 + c * 3.6, cy: AY + 1.8 + r * 3.6, r: 1.3, class: "tn-pn" }, dv);
  lab(dv, 664, AY + 28, "×10", "tn-g s-ink", "middle", 30);
  E("rect", { x: BX0, y: BY0, width: 5 * U, height: 2 * U, class: "nofill k-ink", "stroke-width": 2.5 }, dv);
  for (let c = 1; c < 5; c++) E("line", { x1: BX0 + c * U, x2: BX0 + c * U, y1: BY0, y2: BY0 + 2 * U, class: "k-dim", "stroke-width": 1 }, dv);
  E("line", { x1: BX0, x2: BX0 + 5 * U, y1: BY0 + U, y2: BY0 + U, class: "k-dim", "stroke-width": 1 }, dv);
  for (let v = 0; v < 10; v++) pas.forEach(([a, b]) => E("circle", { cx: BX0 + (v % 5) * U + 3 + a * (U - 6), cy: BY0 + Math.floor(v / 5) * U + 3 + b * (U - 6), r: 1.3, class: "tn-pn" }, dv));
  lab(dv, BX0 + 5 * U + 12, BY0 + U + 8, "après", "tn-s s-ink", "start", 22);
  /* ----- la note de bas de scène, toujours visible ----- */
  const note = [lab(root, 60, 652, "Un modèle : 100 molécules d’acide, au lieu de milliards de milliards ; l’eau n’est pas dessinée.", "tn-s s-c", "start", 22), lab(root, 60, 676, "En vrai, toutes les molécules bougent. Un tic n’est pas une durée mesurée.", "tn-s s-c", "start", 22)];

  const CFG = {
    ethan: { dir: 1, l1a: "CH_{3}COOH", l1b: "CH_{3}COO^{−}", l2a: "H_{2}O", l2b: "H_{3}O^{+}", o1a: 0, o1b: 1, o2a: 0, o2b: 0 },
    nh3: { dir: -1, l1a: "NH_{3}", l1b: "NH_{4}^{+}", l2a: "H_{2}O", l2b: "HO^{−}", o1a: 0, o1b: 0, o2a: 0, o2b: 1 },
    vign: { dir: -1, l1a: "A^{−}", l1b: "AH", l2a: "H_{3}O^{+}", l2b: "H_{2}O", o1a: 1, o1b: 0, o2a: 0, o2b: 0 },
  };

  return {
    render(p, ti) {
      const hcl = p.acide === "hcl", nh3 = p.acide === "nh3", ions = p.depart === "ions";
      const Sr = hcl ? SERIE_HCL : ions ? SERIE_IONS : SERIE, kmax = Sr.n.length - 1;
      const grosOn = nh3 || p.gros > 0.5;
      show(root, 1);
      show(grille, grosOn ? 0 : 1); show(gros, grosOn ? 1 : 0);
      const loupe = !grosOn;
      /* la grille */
      const pitch = 40, tx = 230 * (1 - Math.max(p.graph, p.vign)), gx0 = 70 + tx, gy0 = 150;
      const tic = clamp(p.tic, 0, kmax), k = Math.min(kmax, Math.floor(tic + 1e-9)), f = k >= kmax ? 0 : tic - k;
      const cur = Sr.etats[k], nxt = Sr.etats[Math.min(kmax, k + 1)];
      const marge = 16;
      cadre.setAttribute("x", (gx0 - RG - marge).toFixed(1)); cadre.setAttribute("y", (gy0 - RG - marge).toFixed(1));
      cadre.setAttribute("width", (9 * pitch + 2 * RG + 2 * marge).toFixed(1)); cadre.setAttribute("height", (9 * pitch + 2 * RG + 2 * marge).toFixed(1));
      for (let i = 0; i < NM; i++) placer(gl[i], gx0 + (i % 10) * pitch, gy0 + Math.floor(i / 10) * pitch, pitch, i);
      const tk = Math.min(kmax, k + 1), T0 = Sr.tok[k], T1 = Sr.tok[tk], SL = Sr.slot[tk];
      for (let i = 0; i < NM; i++) {
        const G = gl[i], e = cur[i], change = f > 1e-3 && cur[i] !== nxt[i];
        // le jeton engagé dans le transfert : celui d'une autre molécule (la place `s`), repéré dans le repère du glyphe
        const s = change ? SL[i] : -1, cible = s >= 0 ? [gl[s].pos[0] - G.pos[0] + gl[s].tdx, gl[s].pos[1] - G.pos[1] + gl[s].tdy] : null;
        // à l'arrivée d'un transfert, le disque a l'état du tic suivant
        poserGlyphe(G, e, change ? f : 0, change ? (nxt[i] === 1 ? 1 : -1) : 0, cible);
        // un jeton reste, apparaît à la fin d'un transfert, ou disparaît au début du sien
        poserJeton(G, f <= 1e-3 || (T0[i] && T1[i]) ? T0[i] : T0[i] ? (f < 0.08 ? 1 : 0) : T1[i] ? (f > 0.92 ? 1 : 0) : 0);
      }
      const ri = p.ring >= 0 ? Math.round(p.ring) : -1;
      if (ri >= 0) { bague.setAttribute("x", (gx0 + (ri % 10) * pitch - 22).toFixed(1)); bague.setAttribute("y", (gy0 + Math.floor(ri / 10) * pitch - 22).toFixed(1)); }
      show(bague, ri >= 0 ? 1 : 0);
      /* le compte et le graphe */
      const n = cur[0] === undefined ? 0 : cur.reduce((a, v) => a + v, 0), nAH = NM - n;
      const w0 = Math.max(0, Math.ceil(tic) - NX);
      const gOn = loupe && p.graph > 0.02;
      show(gr, gOn ? p.graph : 0);
      if (gOn) {
        ech.NY = clamp(p.ymax, 20, 100);
        const pasY = ech.NY > 40 ? 25 : 5;
        yticks.forEach((yt, j) => { const v = pasY * (j + 1), ok = v <= ech.NY + 1e-6; show(yt.l, ok ? 1 : 0); show(yt.t, ok ? 1 : 0); if (ok) { yt.l.setAttribute("y1", Y(v)); yt.l.setAttribute("y2", Y(v)); yt.t.setAttribute("y", Y(v) + 7); setFx(yt.t, String(v)); } });
        ticks.forEach((tk, j) => { const v = Math.ceil(w0 / 10) * 10 + 10 * j - (w0 % 10 === 0 ? 0 : 0); const ok = v >= w0 && v <= w0 + NX; show(tk.l, ok ? 1 : 0); show(tk.t, ok ? 1 : 0); if (ok) { tk.l.setAttribute("x1", X(v, w0)); tk.l.setAttribute("x2", X(v, w0)); tk.t.setAttribute("x", X(v, w0)); setFx(tk.t, String(v)); } });
        const rouge = ri < 0;
        let pp = "";
        pts.forEach((c, j) => { const vis = j <= k && j >= w0 - 1 && (j <= tic + 1e-9); show(c, vis ? 1 : 0); if (vis) { c.setAttribute("cx", X(j, w0).toFixed(1)); c.setAttribute("cy", Y(Sr.n[j]).toFixed(1)); c.setAttribute("class", rouge ? "tn-pt" : "tn-pn"); pp += `${X(j, w0).toFixed(1)},${Y(Sr.n[j]).toFixed(1)} `; } });
        polyN.setAttribute("points", pp);
        let lp = "";
        for (let j = Math.max(0, Math.floor(w0)); j <= Math.min(TICS, Math.ceil(w0 + NX)); j++) lp += `${X(j, w0).toFixed(1)},${Y(LISSE[j]).toFixed(1)} `;
        lissePath.setAttribute("points", lp); show(lissePath, p.lisse);
        const pal = TAU * NM;
        palierL.setAttribute("y1", Y(pal)); palierL.setAttribute("y2", Y(pal)); show(palierL, clamp(p.lisse * 2 - 1, 0, 1));
        palierT.setAttribute("y", (Y(pal + 3.6) - 8).toFixed(1)); setFx(palierT, `${fr(TAU * 100, 0)} %`); show(palierT, clamp(p.lisse * 2 - 1, 0, 1));
        palierK.setAttribute("y1", (Y(pal + 3.6) - 2).toFixed(1)); palierK.setAttribute("y2", (Y(pal) - 8).toFixed(1)); show(palierK, clamp(p.lisse * 2 - 1, 0, 1));
        show(phg, clamp(p.lisse * 2 - 1, 0, 1)); setFx(phT, fr(phLisse(tic, p.vol > 5 ? 10 : 1), p.vol > 5 ? 2 : 1));
        setFx(lec, `tic ${k} · ${ions ? `${nAH} AH` : `${n} A^{−}`} sur ${NM}`);
        // l'étiquette « état d'équilibre » : un trait au-dessus du palier, de 10 à 30
        const xa = X(Math.max(w0, 10), w0) + 6, xb = X(Math.min(w0 + NX, Math.max(tic, 10)), w0) - 6;
        etL.setAttribute("x1", xa); etL.setAttribute("x2", xb); show(etg, p.etiq);
        etT.setAttribute("x", ((xa + xb) / 2).toFixed(1));
      } else show(gr, 0);
      /* la légende et le bandeau */
      show(dv, loupe ? clamp((p.vol - 1) / 2, 0, 1) : 0);
      const eqOn = p.eq > 0.5;
      show(leg, loupe && !eqOn && p.leg > 0 ? 1 : 0);
      const nomAH = hcl ? "HCl" : "AH", nomAn = hcl ? "Cl^{−}" : "A^{−}";
      setFx(lgT[0], nomAH); setFx(lgT[1], nomAn);
      legG.forEach((lg, j) => { const dx = [0, 150, 300][j]; lg.setAttribute("transform", `translate(${gx0 + dx} 604)`); show(lg, p.leg > j ? 1 : 0); });
      const cxq = 500;
      show(eqg, eqOn && loupe ? 1 : 0);
      if (eqOn) { setFx(eqF, p.eq > 1.5 ? "⇄" : "?"); show(eq1, p.eq > 1.5 ? 1 : 0); show(eq2, p.eq > 1.5 ? 1 : 0); }
      /* l'histoire de la molécule encadrée et les compteurs */
      show(hg, loupe && p.hist > 0.02 && RING ? p.hist : 0);
      if (RING && p.hist > 0.02) hGl.forEach((h, j) => { const e = SERIE.etats[30 + j][RING.i]; show(h.gg, tic >= 30 + j - 1e-9 ? 1 : 0); h.d.setAttribute("class", e ? "tn-an" : "tn-ah"); show(h.m, e ? 1 : 0); show(h.p, e ? 0 : 1); });
      show(cg, loupe && p.cpt > 0.02 ? p.cpt : 0);
      if (p.cpt > 0.02) { const [F, B] = transferts(SERIE, 35, Math.max(35, Math.floor(tic + 1e-9))); setFx(cT1, `protons cédés : ${F}`); setFx(cT2, `protons repris : ${B}`); }
      /* les gros plans */
      show(vig, loupe && p.vign > 0.02 ? p.vign : 0);
      reglerPaire(P2, setFx, CFG.vign, clamp(p.vtr, 0, 1), true);
      reglerPaire(P1, setFx, nh3 ? CFG.nh3 : CFG.ethan, clamp(p.tr, 0, 1), nh3);
      eaux.forEach((e) => show(e, nh3 ? 1 : 0));
      note.forEach((l) => show(l, loupe ? 1 : 0));
      ti.set(grosOn ? (nh3 ? "L’ammoniac dans l’eau" : "Un proton passe d’une molécule à l’autre") : "La solution à la loupe",
        p.sub || (grosOn ? "deux molécules en gros plan" : ions ? "des ions A^{−} et H_{3}O^{+}, aucune molécule AH" : "100 molécules d’acide ; AH cède un proton à l’eau, partout autour"));
    },
    hide() { show(root, 0); },
  };
}

/** le jeu `duo` : deux loupes côte à côte, l'acide chlorhydrique et l'acide éthanoïque (étape `retour`) */
export function duoBuild(ctx, O, g) {
  const { E, clamp, show } = ctx;
  const { lab, setFx } = O;
  const root = E("g", {}, g);
  const pans = [0, 1].map((j) => {
    const gp = E("g", {}, root), gl = mkGlyphes(gp, E);
    const x0 = 86 + j * 470, y0 = 232;
    gl.forEach((G, i) => placer(G, x0 + (i % 10) * 40, y0 + Math.floor(i / 10) * 40, 40, i));
    E("rect", { x: x0 - RG - 14, y: y0 - RG - 14, width: 9 * 40 + 2 * RG + 28, height: 9 * 40 + 2 * RG + 28, rx: 24, class: "nofill k-dim", "stroke-width": 3 }, gp);
    const nom = lab(gp, x0 + 180, 154, "", "tn-g s-ink", "middle", 30), ph = lab(gp, x0 + 180, 196, "", "tn-l s-c", "middle", 26), tau = lab(gp, x0 + 180, 652, "", "tn-g s-ink", "middle", 32);
    return { gl, nom, ph, tau };
  });
  const note = lab(root, 60, 684, "Un modèle : 100 molécules ; l’eau n’est pas dessinée. En vrai, toutes les molécules bougent.", "tn-s s-c", "start", 22);
  return {
    render(p, ti, T) {
      show(root, 1);
      pans.forEach((P, j) => {
        const e = j === 0 ? new Uint8Array(NM).fill(1) : SERIE.etats[30], T = j === 0 ? SERIE_HCL.tok[1] : SERIE.tok[30];
        P.gl.forEach((G, i) => { poserGlyphe(G, e[i], 0, 0, null); poserJeton(G, T[i]); });
        setFx(P.nom, j === 0 ? "acide chlorhydrique" : "acide éthanoïque"); setFx(P.ph, j === 0 ? T.ph1 : T.ph2); setFx(P.tau, j === 0 ? T.tau1 : T.tau2);
      });
      ti.set("Les deux flacons, à la loupe", p.sub || "chaque molécule a un proton à céder");
    },
    hide() { show(root, 0); },
  };
}
