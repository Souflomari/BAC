/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « décroissance radioactive » (V3) — les outils et les données.
 *
 * Ce fichier ne dessine rien par lui-même : il donne aux scènes et au script
 * les nombres à la française, le texte de scène à mini-balisage (un exposant
 * est un <tspan> décalé, jamais un caractère Unicode ² ⁻¹ ₀), les axes, les
 * dés, les noyaux, et les données physiques avec leur source.
 *
 * SOURCES — [V] vérifié sur la source citée, [S] source secondaire.
 *  1. [V] Becquerel, C. R. Acad. Sci. 122, p. 420 (24 février 1896) : plaque
 *     enveloppée de papier noir épais, lamelle de « sulfate double d'uranium et
 *     de potassium », exposée au soleil ; « la silhouette de la substance
 *     phosphorescente apparaît en noir ».
 *  2. [V] Becquerel, C. R. 122, p. 501 (2 mars 1896) : préparées « le mercredi
 *     26 et le jeudi 27 février », soleil intermittent, châssis rangés « dans le
 *     tiroir d'un meuble », développés le 1er mars : « Les silhouettes
 *     apparurent, au contraire, avec une grande intensité. »
 *     https://www.nssp.uni-saarland.de/lehre/Vorlesung/Kernphysik_SS19/History/Papers/Becquerel.pdf
 *  3. [V] Au printemps 1896, des sels d'uranium NON phosphorescents (notes de
 *     mars) puis l'uranium métal (mai) impressionnent aussi la plaque : le
 *     rayonnement vient de l'uranium lui-même (audit V3, docs/refonte/05 §2).
 *  4. [V] Rutherford, « A Radioactive Substance emitted from Thorium
 *     Compounds », Phil. Mag. (5) 49, 1–14, janvier 1900 : « the intensity
 *     fell to half its value in about one minute » ; tableau III (100 V) :
 *     0→1 ; 28 s→0,69 ; 62→0,51 ; 118→0,23 ; 155→0,14 ; 210→0,067 ;
 *     272→0,041 ; 360→0,018. https://web.lemoyne.edu/giunta/classicalcs/rutherhalf.html
 *     Le gaz (l'« émanation du thorium », le thoron) est le radon 220 :
 *     demi-vie 55,6 s. https://en.wikipedia.org/wiki/Isotopes_of_radon
 *  5. [V] Uranium 238 : demi-vie 4,468 × 10⁹ ans, désintégration α vers le
 *     thorium 234 ; 99,3 % de l'uranium naturel. https://en.wikipedia.org/wiki/Uranium-238
 *  6. [V] Carbone 14 : β⁻ vers l'azote 14 ; ≈ 1,2 atome sur 10¹² dans le
 *     carbone de l'air ; demi-vie 5 700 ± 30 ans — les sujets donnent 5 730 ans
 *     (2022 R) ou 5 570 ans (2011 N) : la valeur se prend dans l'énoncé.
 *     https://en.wikipedia.org/wiki/Carbon-14
 *  7. [V] Fluor 18 (imagerie TEP) : β⁺ (97 %) vers l'oxygène 18.
 *     https://en.wikipedia.org/wiki/Fluorine-18
 *  8. [V] Iridium 192 (bac 2024) : β⁻ vers le platine 192 avec émission γ ;
 *     plutonium 238 (bac 2021) : α vers l'uranium 234 ; iode 131 (bac 2022) :
 *     β⁻ vers le xénon 131, t½ = 8 jours ; tritium : β⁻ vers l'hélium 3,
 *     t½ = 12,32 ans (bac 2023) ; potassium 40 : t½ = 1,25 × 10⁹ ans.
 *     docs/sujets/pc/decroissance-radioactive.md ; https://en.wikipedia.org/wiki/Potassium-40
 *  9. [V] Jebel Irhoud (≈ 50 km au sud-est de Safi) : Richter et al., Nature
 *     546, 293–296 (2017), silex chauffés datés par thermoluminescence,
 *     315 ± 34 milliers d'années.
 * 10. [V] Consigne imprimée sur les sujets : « On donnera les expressions
 *     littérales avant de passer aux applications numériques. »
 *     (docs/refonte/01-programme-bac-maroc.md §3.3)
 * Constantes des sujets : N_A = 6,02 × 10²³ mol⁻¹ ; M(¹³¹I) = 131 g/mol.
 */

/* ---------- les nombres ---------- */
export const NB = " ";
const grp = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
export function fr(x, d = 2) {
  const s = Math.abs(x).toFixed(d), p = s.split(".");
  return (x < 0 && Number(s) !== 0 ? "−" : "") + (p[0].length >= 4 ? grp(p[0]) : p[0]) + (p[1] ? "," + p[1] : "");
}
export const ent = (x) => fr(x, 0);
export const sig3 = (x) => Number(x.toPrecision(3));
function mantisse(x, d) {
  let e = Math.floor(Math.log10(Math.abs(x))), m = Number((x / 10 ** e).toFixed(d));
  if (Math.abs(m) >= 10) { m /= 10; e++; }
  return [m, e];
}
/** 2,8 × 10<sup>−17</sup> (panneau) */
export const sciH = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d)} × 10<sup>${e < 0 ? "−" : ""}${Math.abs(e)}</sup>`; };
/** 2,8 × 10^{−17} (texte de scène : l'exposant devient un tspan) */
export const sciF = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d)} × 10^{${e < 0 ? "−" : ""}${Math.abs(e)}}`; };
/** un nombre pour KaTeX : 5\,730 ; 0{,}182 */
export const TN = (x, d = 0) => fr(x, d).replace(/,/g, "{,}").replace(/ /g, "\\,").replace("−", "-");
/** 2{,}8\times10^{-17} */
export const TS = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${TN(m, d)}\\times10^{${e}}`; };
/** un noyau pour KaTeX : nombre de masse et nombre de charge alignés à droite */
export function nucT(A, Z, X) {
  const a = String(A), z = String(Z);
  const pa = Math.max(0, z.length - a.length), pz = Math.max(0, a.length - z.length);
  return `{}^{${"\\phantom{0}".repeat(pa)}${a}}_{${"\\phantom{0}".repeat(pz)}${z}}\\mathrm{${X}}`;
}
/** la même chose, en ligne dans le panneau (rendue par KaTeX), avec un texte de repli */
export const nucH = (A, Z, X, alt) => `<span class="m" data-tex="${nucT(A, Z, X)}">${alt || `${X}-${A}`}</span>`;

/* ---------- les données (sources en tête) ---------- */
export const DE = 6, ND = 100, KMAX = 20, TV = 10;          // faces du dé, dés, tics, lancers du survivant
export const R5 = (DE - 1) / DE;                             // part des dés qui restent à chaque tic
export const EK = (k) => ND * R5 ** k;                       // nombre MOYEN de dés restants au tic k
export const LAMD = Math.log(DE / (DE - 1));                 // λ des dés, par tic : ln(6/5)
export const TH = Math.LN2 / LAMD, TAU = 1 / LAMD;           // demi-vie et constante de temps des dés, en tics
export const NA = 6.02e23;
export const N_U = (1e-3 / 238) * NA;                        // noyaux dans 1 mg d'uranium 238
export const T14 = 5730;
export const C14_PART = 1.2e-12;
export const N_C14_1G = (C14_PART * NA) / 12;                // noyaux de carbone 14 dans 1 g de carbone vivant
export const IRHOUD = 315000, LIM14 = 50000;
export const ageC14 = (pct) => (T14 / Math.LN2) * Math.log(100 / pct);
export const AGE30 = ageC14(30);
export const IRH_DV = IRHOUD / T14, IRH_FRAC = 2 ** -IRH_DV, IRH_RESTE = N_C14_1G * IRH_FRAC;
export const RUTH = [[0, 1], [28, 0.69], [62, 0.51], [118, 0.23], [155, 0.14], [210, 0.067], [272, 0.041], [360, 0.018]];
export const T_THORON = 55.6;                                // s
export const T_U238 = 4.468e9;                               // ans
export const AN_S = 365.25 * 86400;
export const LAM_THORON = Math.LN2 / T_THORON, LAM_U238 = Math.LN2 / (T_U238 * AN_S);
export const DEPUIS = 2026 - 1896;                           // ans depuis la plaque de Becquerel
export const PERTE_U = 1 - 2 ** (-DEPUIS / T_U238);          // part de l'uranium 238 désintégrée depuis
export const T_TRITIUM = 12.3, T_K40 = 1.25e9;
// l'iode 131 (bac 2022) : t½ = 8 jours ; a₀ = 4,0 × 10⁶ Bq (figure 3) ; 95 % désintégrés
export const T_I = 8, A0_I = 4.0e6;
export const LAM_I = Math.LN2 / (T_I * 86400);
export const T95 = (T_I * Math.log(20)) / Math.LN2;
// la saisie de N₀ : 1,0 µg d'iode 131
export const M_I = 131, MASSE_I = 1.0e-6;
export const N0_I = (MASSE_I / M_I) * NA, A0_SAISIE = LAM_I * N0_I;

/* ---------- le hasard des dés, tiré une fois (et à chaque « Relancer ») ---------- */
export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/** Les 100 dés de l'élève : face de chaque dé à chaque tic ; dTic = tic de son premier 6. Remplit D en place. */
export function tirerDes(D, rng) {
  const face = [[]], dTic = new Array(ND).fill(Infinity);
  for (let i = 0; i < ND; i++) face[0][i] = 1 + Math.floor(rng() * (DE - 1));
  for (let k = 1; k <= KMAX; k++) {
    face[k] = [];
    for (let i = 0; i < ND; i++) {
      if (dTic[i] < k) { face[k][i] = 0; continue; }
      const f = 1 + Math.floor(rng() * DE);
      face[k][i] = f;
      if (f === DE) dTic[i] = k;
    }
  }
  const NK = []; for (let k = 0; k <= KMAX; k++) NK[k] = dTic.filter((t) => t > k).length;
  const DK = [0]; for (let k = 1; k <= KMAX; k++) DK[k] = NK[k - 1] - NK[k];
  // le survivant : encore en jeu au tic TV, le plus près du centre de la grille ; le dé neuf montre une AUTRE face
  let VET = -1, bd = 1e9;
  for (let i = 0; i < ND; i++) if (dTic[i] > TV) { const d = (Math.floor(i / 10) - 4.5) ** 2 + ((i % 10) - 4.5) ** 2; if (d < bd) { bd = d; VET = i; } }
  const HIST = VET >= 0 ? Array.from({ length: TV }, (_, j) => face[j + 1][VET]) : [];
  const F_VET = VET >= 0 ? face[TV][VET] : 3, F_NEUF = ((F_VET + 1) % (DE - 1)) + 1;
  Object.assign(D, { face, dTic, NK, DK, VET, HIST, F_VET, F_NEUF });
  return D;
}
/** une autre série : un tirage par dé (le tic de son premier 6, loi géométrique de paramètre 1/6) */
export function serie(rng, n) {
  const c = new Array(KMAX + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const k = Math.max(1, Math.ceil(Math.log(1 - rng()) / Math.log((DE - 1) / DE)));
    for (let j = 0; j < Math.min(k, KMAX + 1); j++) c[j]++;
  }
  return c;
}

/* ---------- les outils de scène (liés au noyau) ---------- */
export function outilsScene(ctx) {
  const { E } = ctx;
  const ty = (s) => ctx.ty(s).replace(/ %/g, NB + "%");
  // Texte SVG à mini-balisage : *x* italique, ^{…} exposant, _{…} indice (tspan décalé, en px de la
  // taille `fs` de la classe : Firefox ignore baseline-shift).
  function fxFill(t, str) {
    const fs = t.__fs; t.__s = str; t.textContent = ""; let shift = 0;
    String(str).split(/(\^\{[^}]*\}|_\{[^}]*\}|\*[^*\s][^*]*\*)/).forEach((part) => {
      if (!part) return;
      let txt = part, dy = 0, small = false, it = false;
      if (part.startsWith("^{")) { txt = part.slice(2, -1); dy = -0.42 * fs; small = true; }
      else if (part.startsWith("_{")) { txt = part.slice(2, -1); dy = 0.24 * fs; small = true; }
      else if (part[0] === "*" && part.length > 2 && part.endsWith("*")) { txt = part.slice(1, -1); it = true; }
      const a = { text: txt }, d = dy - shift;
      if (Math.abs(d) > 0.01) a.dy = d.toFixed(1);
      shift = dy;
      if (small) a["font-size"] = (0.7 * fs).toFixed(1);
      if (it) a["font-style"] = "italic";
      E("tspan", a, t);
    });
  }
  const TAILLE = { "t-titre": 18, "t-sous": 16, "t-lab": 18, "rd-fort": 18, "t-cle": 26, "rd-ind": 16 };
  const taille = (cls) => { for (const c of String(cls).split(/\s+/)) if (TAILLE[c]) return TAILLE[c]; return 18; };
  function fx(parent, x, y, str, cls, anchor) {
    const t = E("text", { x, y, class: cls, "text-anchor": anchor || "start" }, parent);
    t.__fs = taille(cls); fxFill(t, ty(str)); return t;
  }
  function setFx(t, str) { const s = ty(str); if (t.__s !== s) fxFill(t, s); }
  /** le titre de scène commun (t-titre, t-sous), centré en haut */
  function titre(g, t, s, x = 500) {
    const T = fx(g, x, 64, t || "", "t-titre s-ink", "middle"), S = fx(g, x, 92, s || "", "t-sous", "middle");
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  function courbe(fn, x0, x1, X, Y, n = 240) {
    let d = "";
    for (let i = 0; i <= n; i++) { const x = x0 + ((x1 - x0) * i) / n; d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(fn(x)).toFixed(1); }
    return d;
  }
  /** axes : graduations en t-sous (16, gris), titres d'axe en t-lab gris */
  function axes(gr, X, Y, xmax, ymax, xs, ys, xf, yf, xt, yt, x0 = 0) {
    gr.textContent = "";
    E("line", { x1: X(x0), y1: Y(0), x2: X(xmax) + 10, y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, gr);
    E("line", { x1: X(x0), y1: Y(0), x2: X(x0), y2: Y(ymax) - 12, class: "k-dim", "stroke-width": 1.5 }, gr);
    for (let v = x0; v <= xmax + 1e-9; v += xs) {
      E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, gr);
      fx(gr, X(v), Y(0) + 26, xf(v), "t-sous", "middle");
    }
    for (let v = ys; v <= ymax + 1e-9; v += ys) {
      E("line", { x1: X(x0) - 6, x2: X(x0), y1: Y(v), y2: Y(v), class: "k-dim" }, gr);
      fx(gr, X(x0) - 10, Y(v) + 5, yf(v), "t-sous", "end");
    }
    if (xt) fx(gr, X(xmax) + 16, Y(0) + 5, xt, "t-lab s-c");
    if (yt) fx(gr, X(x0), Y(ymax) - 26, yt, "t-lab s-c");
  }

  /* des dés */
  const PIP = [[0.25, 0.25], [0.75, 0.25], [0.25, 0.5], [0.75, 0.5], [0.25, 0.75], [0.75, 0.75], [0.5, 0.5]];
  const FACES = { 1: [6], 2: [0, 5], 3: [0, 6, 5], 4: [0, 1, 4, 5], 5: [0, 1, 4, 5, 6], 6: [0, 1, 2, 3, 4, 5] };
  function mkDie(parent, x, y, s, r) {
    const g = E("g", {}, parent);
    E("rect", { x, y, width: s, height: s, rx: (s * 0.16).toFixed(1), class: "die" }, g);
    const pips = PIP.map(([a, b]) => E("circle", { cx: x + a * s, cy: y + b * s, r, class: "pip" }, g));
    return { g, pips, f: -1, c: null, l: 0, cx: x + s / 2, cy: y + s / 2 };
  }
  function setDie(d, f, cls) {
    if (d.f !== f) { const on = FACES[f] || []; d.pips.forEach((p, j) => (p.style.opacity = on.includes(j) ? 1 : 0)); d.f = f; }
    if (d.c !== cls) { d.g.setAttribute("class", cls ? "die-" + cls : ""); d.c = cls; }
  }
  // un dé tombé sur 6 quitte la grille : il tombe un peu, rapetisse et s'efface (v = 0 → 1)
  function leaveDie(d, v) {
    if (d.l === v) return; d.l = v;
    if (!v) { d.g.removeAttribute("transform"); d.g.style.opacity = ""; return; }
    const k = ctx.ease(v);
    d.g.setAttribute("transform", `translate(${d.cx} ${(d.cy + 30 * k).toFixed(1)}) rotate(${(14 * k).toFixed(1)}) scale(${(1 - 0.45 * k).toFixed(3)}) translate(${-d.cx} ${-d.cy})`);
    d.g.style.opacity = (1 - 0.86 * k).toFixed(3);
  }

  /* un noyau dessiné en tournesol : protons (pleins) et neutrons (creux) mêlés */
  // les protons, mêlés aux neutrons sans s'aligner sur la spirale : on prend les nP indices dont la clé
  // (une suite à faible discrépance, indépendante de l'angle d'or) est la plus petite
  function placer(n, nP) {
    const cle = (i) => (i * 0.7548776662 + 0.1) % 1, isP = new Array(n).fill(false);
    [...Array(n).keys()].sort((a, b) => cle(a) - cle(b)).slice(0, nP).forEach((i) => (isP[i] = true));
    return isP;
  }
  function noyau(parent, cx, cy, R, nP, nN, rho) {
    const n = nP + nN, isP = placer(n, nP), pts = [];
    for (let i = 0; i < n; i++) {
      const r = R * Math.sqrt((i + 0.5) / n), a = i * 2.399963, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      pts.push({ x, y, p: isP[i], c: E("circle", { cx: x.toFixed(1), cy: y.toFixed(1), r: rho, class: isP[i] ? "prot" : "neut", "stroke-width": 2 }, parent) });
    }
    return pts;
  }
  function noyauHTML(cx, cy, R, nP, nN, rho) {
    const n = nP + nN, isP = placer(n, nP); let h = "";
    for (let i = 0; i < n; i++) {
      const r = R * Math.sqrt((i + 0.5) / n), a = i * 2.399963;
      h += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="${rho}" class="${isP[i] ? "prot" : "neut"}" stroke-width="1.4"/>`;
    }
    return h;
  }
  /** le symbole d'un noyau dessiné dans la scène : X en t-cle, A et Z en petit, alignés à droite devant X */
  function symb(parent, x, y, A, Z, X) {
    const g = E("g", {}, parent);
    E("text", { x, y, class: "t-cle s-ink", text: X }, g);
    E("text", { x: x - 3, y: y - 14, class: "rd-ind s-ink", "text-anchor": "end", text: String(A) }, g);
    E("text", { x: x - 3, y: y + 8, class: "rd-ind s-ink", "text-anchor": "end", text: String(Z).replace("-", "−") }, g);
    return g;
  }
  return { fx, setFx, titre, courbe, axes, mkDie, setDie, leaveDie, noyau, noyauHTML, symb };
}
