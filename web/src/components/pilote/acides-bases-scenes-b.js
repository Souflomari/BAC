/* eslint-disable */
// @ts-nocheck
/**
 * Scènes d’« État d’équilibre, acides et bases » (V3), deuxième partie : le jeu `zoom` de la scène
 * `solution` (copié et adapté de `transformations-non-totales-scenes-b.js` sans rien importer d’elle).
 *
 * Deux vues :
 *   - la loupe sur 100 molécules d’acide éthanoïque couplée par `tic` au graphe lisse Q_r(tic)
 *     (`qr-monte`, `qr-nom`, `qr-valeur`) : ordonnée sans graduation numérique pour ne jamais livrer
 *     la valeur avant le calcul ; bandeau de formule (`qrf`) et étiquette du palier (`pal`) séparés ;
 *   - le gros plan de deux molécules d’eau (`gros: 1, acide: 'eau'`, étape `autoprotolyse`) : aucun
 *     proton dessiné au repos (`tr = 0`), transfert animé au `reveal` (`tr: 0 → 1`).
 */
import { NM, SERIE, TICS, KA_CACHE, QR_VAL, COURBES_QR, fr, sciF } from "./acides-bases-outils";

const RG = 15;
const PS = [11, -11];

function mkGlyphes(parent, E) {
  const G = Array.from({ length: NM }, () => {
    const g = E("g", {}, parent);
    const disc = E("circle", { r: RG, class: "ab-ah" }, g);
    const moins = E("line", { x1: -7, x2: 7, y1: 0, y2: 0, class: "k-ink", "stroke-width": 3, "stroke-linecap": "round" }, g);
    const pr = E("circle", { cx: PS[0], cy: PS[1], r: 5.5, class: "ab-pr" }, g);
    const tok = E("path", { d: "M0 -9 L9 6 L-9 6 Z", class: "ab-tok" }, g);
    return { g, disc, moins, pr, tok, fly: null, pos: [0, 0], pitch: 40, tdx: 20, tdy: 20 };
  });
  const over = E("g", {}, parent);
  G.forEach((x) => { x.fly = E("circle", { r: 6.5, class: "ab-fly" }, over); });
  return G;
}

function poserGlyphe(G, e, f, sens, cible) {
  const montrer = (el, o) => { el.style.opacity = o; };
  let ah = e === 0, pr = e === 0, fly = 0, fx = 0, fy = 0;
  if (f > 1e-3 && sens !== 0 && cible) {
    const a = sens > 0 ? [PS[0], PS[1]] : cible, b = sens > 0 ? cible : [PS[0], PS[1]];
    const k = f < 0.5 ? 2 * f * f : 1 - 2 * (1 - f) * (1 - f);
    fx = a[0] + (b[0] - a[0]) * k;
    fy = a[1] + (b[1] - a[1]) * k - 10 * Math.sin(Math.PI * f);
    fly = 1;
    ah = f < 0.5 ? sens > 0 : sens < 0;
    pr = false;
  }
  G.disc.setAttribute("class", ah ? "ab-ah" : "ab-an");
  montrer(G.moins, ah ? 0 : 1);
  montrer(G.pr, pr ? 1 : 0);
  montrer(G.fly, fly);
  if (fly) {
    G.fly.setAttribute("cx", (G.pos[0] + fx).toFixed(1));
    G.fly.setAttribute("cy", (G.pos[1] + fy).toFixed(1));
  }
}

function poserJeton(G, v) {
  G.tok.style.opacity = v;
  G.tok.setAttribute("transform", `translate(${G.tdx} ${G.tdy})`);
}

function placer(G, x, y, pitch, i) {
  if (G.pos[0] === x && G.pos[1] === y && G.pitch === pitch) return;
  G.tdx = (i % 10 === 9 ? -1 : 1) * (pitch / 2);
  G.tdy = (i >= 90 ? -1 : 1) * (pitch / 2);
  G.pos = [x, y];
  G.pitch = pitch;
  G.g.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
}

export function zoomBuild(ctx, O, g) {
  const { E, clamp, show } = ctx;
  const { lab, setFx } = O;
  const root = E("g", {}, g);

  /* ----- la grille de 100 molécules ----- */
  const grille = E("g", {}, root);
  const pitch = 38, gx0 = 66, gy0 = 158, marge = 16;
  E("rect", {
    x: gx0 - RG - marge, y: gy0 - RG - marge,
    width: 9 * pitch + 2 * RG + 2 * marge, height: 9 * pitch + 2 * RG + 2 * marge,
    rx: 24, class: "nofill k-dim", "stroke-width": 3,
  }, grille);
  const gl = mkGlyphes(grille, E);
  for (let i = 0; i < NM; i++) placer(gl[i], gx0 + (i % 10) * pitch, gy0 + Math.floor(i / 10) * pitch, pitch, i);

  const leg = E("g", {}, grille);
  [0, 1, 2].forEach((j) => {
    const lg = E("g", { transform: `translate(${gx0 + j * 138} 578)` }, leg);
    if (j === 0) {
      E("circle", { r: RG, class: "ab-ah" }, lg);
      E("circle", { cx: PS[0], cy: PS[1], r: 5.5, class: "ab-pr" }, lg);
      lab(lg, 26, 9, "AH", "ab-l s-ink", "start", 26);
    } else if (j === 1) {
      E("circle", { r: RG, class: "ab-an" }, lg);
      E("line", { x1: -7, x2: 7, y1: 0, y2: 0, class: "k-ink", "stroke-width": 3, "stroke-linecap": "round" }, lg);
      lab(lg, 26, 9, "A^{−}", "ab-l s-ink", "start", 26);
    } else {
      E("path", { d: "M0 -9 L9 6 L-9 6 Z", class: "ab-tok" }, lg);
      lab(lg, 18, 9, "H_{3}O^{+}", "ab-l s-ink", "start", 26);
    }
  });

  /* ----- le graphe Q_r(tic), à droite ----- */
  const GX0 = 560, GX1 = 948, GY0 = 490, GY1 = 190, YMAX = 2.0e-5;
  const X = (t) => GX0 + ((GX1 - GX0) * t) / TICS;
  const Y = (q) => GY0 - ((GY0 - GY1) * clamp(q, 0, YMAX)) / YMAX;
  const gr = E("g", {}, root);
  E("line", { x1: GX0, y1: GY0, x2: GX1 + 12, y2: GY0, class: "k-dim", "stroke-width": 2.5 }, gr);
  E("line", { x1: GX0, y1: GY0, x2: GX0, y2: GY1 - 16, class: "k-dim", "stroke-width": 2.5 }, gr);
  [0, 10, 20, 30].forEach((v) => {
    E("line", { x1: X(v), x2: X(v), y1: GY0, y2: GY0 + 7, class: "k-dim", "stroke-width": 2 }, gr);
    lab(gr, X(v), GY0 + 32, String(v), "t-sous s-c", "middle", 24);
  });
  lab(gr, GX1 + 10, GY0 + 62, "tic", "ab-l s-c", "end", 26);
  const yTit = lab(gr, GX0 + 12, GY1 - 20, "[A^{−}][H_{3}O^{+}] / [AH]", "ab-l s-ink", "start", 26);
  const courbe = E("polyline", { class: "k-a nofill", "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, gr);
  const ptCur = E("circle", { r: 7, class: "s-a" }, gr);

  const qrfG = E("g", {}, gr);
  E("rect", { x: GX0 + 16, y: 556, width: 374, height: 54, rx: 8, class: "cell" }, qrfG);
  lab(qrfG, GX0 + 203, 592, "*Q*_{r} = [A^{−}][H_{3}O^{+}] / [AH]", "ab-l s-ink", "middle", 26);

  const phmG = E("g", {}, gr);
  E("rect", { x: 786, y: 126, width: 168, height: 52, rx: 8, class: "s-bg k-ink", "stroke-width": 2.5 }, phmG);
  lab(phmG, 800, 160, "pH", "ab-s s-c", "start", 24);
  lab(phmG, 942, 161, fr(QR_VAL.pH, 2), "ab-g s-ink", "end", 30);

  const palG = E("g", {}, gr);
  const yPal = Y(KA_CACHE);
  E("line", { x1: GX0, x2: GX1, y1: yPal, y2: yPal, class: "k-ink", "stroke-width": 2, "stroke-dasharray": "8 6" }, palG);
  lab(palG, GX1, yPal - 16, `*Q*_{r,éq} = ${sciF(QR_VAL.rep, 2)}`, "ab-g s-ink", "end", 28);

  const note = [
    lab(root, 500, 650, "Modèle : 100 molécules d’acide ; la courbe trace la moyenne.", "ab-s s-c", "middle", 22),
    lab(root, 500, 680, "En vrai, tout bouge ; un tic n’est pas une durée mesurée.", "ab-s s-c", "middle", 22),
  ];

  /* ----- le gros plan de l'autoprotolyse de l'eau ----- */
  const gros = E("g", {}, root);
  const c1 = { x: 320, y: 370, r: 80 }, c2 = { x: 680, y: 370, r: 80 };
  const d1 = E("circle", { cx: c1.x, cy: c1.y, r: c1.r, class: "ab-ah" }, gros);
  const d2 = E("circle", { cx: c2.x, cy: c2.y, r: c2.r, class: "ab-ah" }, gros);
  const m1 = E("line", { x1: c1.x - 28, x2: c1.x + 28, y1: c1.y, y2: c1.y, class: "k-ink", "stroke-width": 4, "stroke-linecap": "round" }, gros);
  const p2 = E("g", {}, gros);
  E("line", { x1: c2.x - 24, x2: c2.x + 24, y1: c2.y, y2: c2.y, class: "k-ink", "stroke-width": 4, "stroke-linecap": "round" }, p2);
  E("line", { x1: c2.x, x2: c2.x, y1: c2.y - 24, y2: c2.y + 24, class: "k-ink", "stroke-width": 4, "stroke-linecap": "round" }, p2);
  const prG = E("circle", { r: 13, class: "s-a" }, gros);
  const hpT = lab(gros, 500, 260, "H^{+}", "ab-g s-a", "middle", 28);
  const l1 = lab(gros, c1.x, c1.y + 130, "H_{2}O", "ab-g s-ink", "middle", 32);
  const l2 = lab(gros, c2.x, c2.y + 130, "H_{2}O", "ab-g s-ink", "middle", 32);

  return {
    render(p, ti) {
      show(root, 1);
      const eau = p.gros > 0.5;
      show(grille, eau ? 0 : 1);
      show(gr, eau ? 0 : 1);
      note.forEach((n) => show(n, eau ? 0 : 1));
      show(gros, eau ? 1 : 0);

      if (eau) {
        const tr = clamp(p.tr, 0, 1);
        const k = tr < 0.5 ? 2 * tr * tr : 1 - 2 * (1 - tr) * (1 - tr);
        const xa = c1.x + c1.r * 0.72, ya = c1.y - c1.r * 0.65;
        const xb = c2.x - c2.r * 0.72, yb = c2.y - c2.r * 0.65;
        const x = xa + (xb - xa) * k, y = ya + (yb - ya) * k - 56 * Math.sin(Math.PI * tr);
        prG.setAttribute("cx", x.toFixed(1)); prG.setAttribute("cy", y.toFixed(1));
        hpT.setAttribute("x", x.toFixed(1)); hpT.setAttribute("y", (y - 24).toFixed(1));
        // aucun proton dessiné avant la réponse (`tr === 0`)
        show(prG, tr > 1e-3 ? 1 : 0);
        show(hpT, tr > 1e-3 ? 1 : 0);
        const apres = tr >= 0.5;
        d1.setAttribute("class", apres ? "ab-an" : "ab-ah");
        d2.setAttribute("class", "ab-ah");
        show(m1, apres ? 1 : 0);
        show(p2, apres ? 1 : 0);
        setFx(l1, apres ? "HO^{−}" : "H_{2}O");
        setFx(l2, apres ? "H_{3}O^{+}" : "H_{2}O");
        ti.set(p.tit || "Deux molécules d’eau", p.sub || "l’eau est un ampholyte");
        return;
      }

      const tic = clamp(p.tic, 0, TICS), k = Math.min(TICS, Math.floor(tic + 1e-9)), f = k >= TICS ? 0 : tic - k;
      const cur = SERIE.etats[k], nxt = SERIE.etats[Math.min(TICS, k + 1)];
      const tk = Math.min(TICS, k + 1), T0 = SERIE.tok[k], T1 = SERIE.tok[tk], SL = SERIE.slot[tk];
      for (let i = 0; i < NM; i++) {
        const G = gl[i], e = cur[i], change = f > 1e-3 && cur[i] !== nxt[i];
        const s = change ? SL[i] : -1;
        const cible = s >= 0 ? [gl[s].pos[0] - G.pos[0] + gl[s].tdx, gl[s].pos[1] - G.pos[1] + gl[s].tdy] : null;
        poserGlyphe(G, e, change ? f : 0, change ? (nxt[i] === 1 ? 1 : -1) : 0, cible);
        poserJeton(G, f <= 1e-3 || (T0[i] && T1[i]) ? T0[i] : T0[i] ? (f < 0.08 ? 1 : 0) : T1[i] ? (f > 0.92 ? 1 : 0) : 0);
      }

      const serieQ = COURBES_QR[1];
      let pts = "";
      for (let j = 0; j <= k; j++) pts += `${X(j).toFixed(1)},${Y(serieQ[j]).toFixed(1)} `;
      const qCur = f > 1e-3 && k < TICS ? serieQ[k] + (serieQ[k + 1] - serieQ[k]) * f : serieQ[k];
      if (f > 1e-3 && k < TICS) pts += `${X(tic).toFixed(1)},${Y(qCur).toFixed(1)}`;
      courbe.setAttribute("points", pts.trim());
      show(courbe, tic > 0.02 ? 1 : 0);
      ptCur.setAttribute("cx", X(tic).toFixed(1));
      ptCur.setAttribute("cy", Y(qCur).toFixed(1));
      show(ptCur, tic > 0.02 ? 1 : 0);

      setFx(yTit, p.qrf > 0.5 ? "*Q*_{r}" : "[A^{−}][H_{3}O^{+}] / [AH]");
      show(qrfG, p.qrf);
      show(phmG, p.phm);
      show(palG, p.pal);
      ti.set(p.tit || "Un nombre, tic après tic", p.sub || "AH : CH₃COOH ; l’eau n’est pas dessinée");
    },
    hide() { show(root, 0); },
  };
}
