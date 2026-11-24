/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « La méiose, la fécondation et les brassages » : les outils et les données.
 *
 * Ce fichier ne dessine rien par lui-même (sauf `dessinCellule`, des primitives sans DOM). Il
 * donne aux scènes, au script et aux exercices les nombres à la française, le texte de scène à
 * mini-balisage, et TOUS les nombres que la leçon affiche : 2ⁿ, 2²³, 2²³ × 2²³, les comptes de
 * chromosomes et de chromatides, les quantités d'ADN, les génotypes des gamètes. Aucune valeur
 * n'est écrite à la main ailleurs : chacune sort d'un calcul d'ici.
 *
 * SOURCES — [V] vérifié sur la source citée, [S] source secondaire, « à sourcer » sinon.
 *  1. [V] Van Beneden, 1883, Ascaris (variété bivalens) : « two chromosomes in each of the
 *     pronuclei, and of four in the zygote » (Florkin, Complete Dictionary of Scientific
 *     Biography, notice « Beneden, Edouard Van »,
 *     https://www.encyclopedia.com/science/dictionaries-thesauruses-pictures-and-press-releases/beneden-edouard-van ;
 *     Université de Liège, « Meiosis: divide and multiply », https://www.uliege.be/cms/c_9853164/en/s.gif).
 *     À l'écran : on ne parle que de l'ŒUF (4 chromosomes, 2 par noyau), jamais des cellules du
 *     ver, et jamais de « fusion » des noyaux (décision du relecteur, plan §9.9).
 *  2. [V] Homme : 2n = 46, soit 44 autosomes + XX ou XY (Tjio et Levan, 1956 : docs/bible/04-svt.md,
 *     T5) ; n = 23 (https://en.wikipedia.org/wiki/Meiosis).
 *  3. [V, secondaire] Drosophile : 2n = 8, « four pairs of chromosomes — an X/Y pair, and three
 *     autosomes » (https://en.wikipedia.org/wiki/Drosophila_melanogaster). À confirmer sur un
 *     manuel avant la mise en ligne (plan §8, décision §9.9 : gardé).
 *  4. [S] Sutton, 1903 : l'orientation de chaque paire sur la plaque est due au hasard, et le
 *     nombre de combinaisons suit 2ⁿ. AUCUNE citation entre guillemets à l'écran : « Sutton,
 *     1903 » et l'idée suffisent (plan §9.9). Sutton (1902-1903) voit dans la séparation des
 *     paires d'homologues « the physical basis of the Mendelian law of heredity » [V,
 *     https://en.wikipedia.org/wiki/Boveri%E2%80%93Sutton_chromosome_theory] : la phrase n'est
 *     pas citée à l'écran.
 *  5. [V] Janssens, 1909 : décrit le phénomène sous le nom de « chiasmatypie »
 *     (https://en.wikipedia.org/wiki/Chromosomal_crossover).
 *  6. [V] Le crossing-over a lieu en prophase I, entre chromatides NON SŒURS de chromosomes
 *     homologues (https://en.wikipedia.org/wiki/Meiosis ; QCM PC 2024 R, docs/bible/sources/
 *     verification-svt.md §5).
 *  7. [S] Convention de quantité d'ADN : le gamète vaut q ; une cellule 2n vaut 2q en G1, 4q après la
 *     phase S (bible T1 ; QCM SM-A 2024). Décision du relecteur (plan §9.3) : partout, q → 2q → 4q → 2q → q.
 *  8. [S] Vocabulaire : « division réductionnelle » (la 1ʳᵉ), « division équationnelle » (la 2ᵉ),
 *     « tétrade » (la leçon dit tétrade ; « bivalent » reste une fiche de mot), QCM SM-A 2026
 *     (verification-svt §6). À vérifier : que les sujets marocains emploient « bivalent ».
 *  9. [S] Génotypes à deux gènes indépendants notés A//a B//b : à confirmer sur un vrai sujet avant la
 *     mise en ligne (plan §9.9). La leçon écrit les gamètes « AD B », sans double trait.
 * 10. Au bac : deux items réels, verbatim, de docs/sujets/svt/meiose-fecondation-brassages.md
 *     (vérifiés par un second lecteur le 2026-11-24) : PC rattrapage 2024, première partie II.3
 *     (0,5 pt) et SVT rattrapage 2024, première partie III.a (0,25 pt) ; le QCM « le crossing-over se
 *     déroule lors de » est le PC rattrapage 2024, II.1 (0,5 pt). Les deux exercices longs restent des
 *     EXERCICES TYPES, dits tels à l'écran, au barème « indicatif » (plan §6, §9.2). Dans ces sujets :
 *     « monochromatidiens / bichromatidiens », « division réductionnelle suivie d'une division
 *     équationnelle ».
 * Capacités du cadre 2025 : docs/referentiel/svt-svt.yaml (3.1.1 à 3.1.4, 3.2.3) et svt-pc.yaml
 * (2.3.1 à 2.3.4, 2.4.3).
 */

/* ---------- les nombres ---------- */
export const NB = " ";
const grp = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
export function fr(x, d = 2) {
  const s = Math.abs(x).toFixed(d), p = s.split(".");
  return (x < 0 && Number(s) !== 0 ? "−" : "") + (p[0].length >= 4 ? grp(p[0]) : p[0]) + (p[1] ? "," + p[1] : "");
}
export const ent = (x) => fr(x, 0);
function mantisse(x, d) {
  let e = Math.floor(Math.log10(Math.abs(x))), m = Number((x / 10 ** e).toFixed(d));
  if (Math.abs(m) >= 10) { m /= 10; e++; }
  return [m, e];
}
/** 7,0 × 10^{13} (texte de scène : l'exposant devient un tspan) */
export const sciF = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d)} × 10^{${e < 0 ? "−" : ""}${Math.abs(e)}}`; };
/** la même chose dans le panneau (HTML) : 7,0 × 10<sup>13</sup> */
export const sciH = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d)}${NB}×${NB}10<sup>${e < 0 ? "−" : ""}${Math.abs(e)}</sup>`; };
/** et pour KaTeX : 7{,}0 \times 10^{13} */
export const sciT = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d).replace(",", "{,}")}\\times 10^{${e}}`; };
/** 8,4 millions */
export const millions = (x, d = 1) => `${fr(x / 1e6, d)} millions`;
/** une formule en ligne dans le panneau (rendue par KaTeX) avec son texte de repli */
export const M = (tex, alt) => `<span class="m" data-tex="${String(tex).replace(/"/g, "&quot;")}">${alt ?? tex}</span>`;
/** 2^n dans le panneau : 2<sup>n</sup> */
export const puis = (b, n) => `${b}<sup>${n}</sup>`;

/* ---------- les puissances de 2 : le brassage ---------- */
export const types = (n) => 2 ** n;                       // 2^n types de gamètes pour n paires
export const couple = (n) => types(n) * types(n);         // un couple : 2^n × 2^n combinaisons
export const N_HOMME = 23;                                // n chez l'Homme [V]
export const N2_HOMME = 46;                               // 2n chez l'Homme [V]
export const T23 = types(N_HOMME);                        // 8 388 608
export const C23 = couple(N_HOMME);                       // ≈ 7,04 × 10^13
export const ADD23 = 2 * T23;                             // le leurre 2 × 2^23 ≈ 1,68 × 10^7
export const INV23 = 1 / T23;                             // 1/2^23 : un second enfant reçoit du père les mêmes chromosomes (sans crossing-over)
export const LEURRE_46 = 2 * N_HOMME;                     // le leurre 2 × 23
export const LEURRE_529 = N_HOMME ** 2;                   // le leurre 23²
/** trois paires : 8 ; les leurres 6 (2 × 3) et 9 (3²) restent distincts de 8 */
export const N_TROIS = 3;
/** n = 1, 2 et 4 sont exclus des questions qui opposent 2^n, 2 × n et n² (B3) */
export const N_EXCLUS = [1, 2, 4];
export const distincts = (n) => new Set([types(n), 2 * n, n * n]).size === 3;
/** le bilan : 2n = 10, donc n = 5, 2^5 = 32 ; leurres 10 et 25 */
export const N2_BILAN = 10;
export const N_BILAN = N2_BILAN / 2;
/** le bac, second exemple : 2n = 6 */
export const N2_BAC2 = 6;
export const N_BAC2 = N2_BAC2 / 2;

/* ---------- la figure-clé : une cellule 2n = 4 ---------- */
export const N2 = 4, N = 2;
/** Phases de la figure : une unité par phase (plan §3.2). */
export const PHASES = ["G1", "après la phase S", "prophase I", "métaphase I", "anaphase I", "fin de la division I", "métaphase II", "anaphase II", "quatre cellules"];
/** Ce que compte une cellule à chaque phase (n = nombre de paires ; pas de chiffre écrit à la main). */
export function etat(ph, n = N) {
  const k = Math.max(0, Math.min(8, Math.round(ph)));
  const cellules = [1, 1, 1, 1, 1, 2, 2, 2, 4][k];
  // chromosomes d'une cellule : 2n avant la division I, n après, 2n en anaphase II (les chromatides
  // se séparent), puis n dans chacune des quatre cellules
  const chrom = [2 * n, 2 * n, 2 * n, 2 * n, 2 * n, n, n, 2 * n, n][k];
  const chromatides_par = [1, 2, 2, 2, 2, 2, 2, 1, 1][k];
  const chromatides = chrom * chromatides_par;
  // la quantité d'ADN est proportionnelle au nombre de molécules (une par chromatide) ; q = celle du gamète = n molécules
  const adn = chromatides / n;
  return { cellules, chrom, chromatides_par, chromatides, adn };
}
/** « 4 chromosomes » « 8 chromatides » « ADN : 4*q* » : les trois lignes du compteur (mini-balisage de scène) */
export function lignesCompteur(ph, n = N) {
  const e = etat(ph, n), s = (x) => (x > 1 ? "s" : "");
  return [`${e.chrom} chromosome${s(e.chrom)}`, `${e.chromatides} chromatide${s(e.chromatides)}`, `ADN : ${e.adn}*q*`];
}
/** La quantité d'ADN en q, par cellule, pour la courbe : 2 → 4 → 2 → 1 (puis 2 à la fécondation). */
export const ADN_G1 = etat(0).adn, ADN_S = etat(1).adn, ADN_DIV1 = etat(5).adn, ADN_DIV2 = etat(8).adn;
export const ADN_ZYGOTE = 2 * ADN_DIV2;

/* ---------- les allèles de la figure ---------- */
// grande paire : A//a et D//d, en position AD (paternel) et ad (maternel) ; petite paire : B//b
export const ALL = { G1: ["A", "D"], G2: ["a", "d"], P1: ["B"], P2: ["b"] };
/**
 * Les génotypes des quatre cellules finales (dans l'ordre : fille 1 et fille 2 de la cellule de gauche,
 * fille 1 et fille 2 de la cellule de droite). `o` : 0 ou 1, l'orientation de la petite paire (0 : les
 * deux chromosomes paternels partent du même côté) ; `co` : 1 si un crossing-over a eu lieu entre A et D.
 */
export function gametes(o, co, niv = 2) {
  // niv 1 : un seul gène sur la grande paire (A, a), avant que D n'arrive avec le crossing-over ; niv 2 : A D
  if (niv < 2) {
    const pl1 = o ? ALL.P2[0] : ALL.P1[0], pr1 = o ? ALL.P1[0] : ALL.P2[0];
    return [`${ALL.G1[0]} ${pl1}`, `${ALL.G1[0]} ${pl1}`, `${ALL.G2[0]} ${pr1}`, `${ALL.G2[0]} ${pr1}`];
  }
  const g1a = ALL.G1.join(""), g1b = co ? ALL.G1[0] + ALL.G2[1] : g1a;
  const g2a = co ? ALL.G2[0] + ALL.G1[1] : ALL.G2.join(""), g2b = ALL.G2.join("");
  const pl = o ? ALL.P2[0] : ALL.P1[0], pr = o ? ALL.P1[0] : ALL.P2[0];
  return [`${g1a} ${pl}`, `${g1b} ${pl}`, `${g2a} ${pr}`, `${g2b} ${pr}`];
}
/** Les types distincts, dans l'ordre d'apparition. */
export const typesDe = (o, co, niv = 2) => [...new Set(gametes(o, co, niv))];
/** Après crossing-over : combien des quatre chromatides de la tétrade portent une combinaison nouvelle ? */
export const RECOMBINEES = gametes(0, 1).filter((g, i) => g.split(" ")[0] !== gametes(0, 0)[i].split(" ")[0]).length;

/* ---------- les espèces du caryotype ---------- */
export const ESPECES = {
  ascaris4: { nom: "Ascaris", n2: 4, auto: 2, gon: null },
  droso8: { nom: "drosophile", n2: 8, auto: 3, gon: "XX" },
  homme46: { nom: "Homme", n2: 46, auto: 22, gon: "XY" },
};
for (const e of Object.values(ESPECES)) e.n = e.n2 / 2;
/** Longueurs des paires (en unités de scène) : de la plus grande à la plus petite. */
export function longueursPaires(esp, Lmax) {
  const e = ESPECES[esp], n = e.n;
  if (esp === "ascaris4") return [1, 0.57].map((f) => f * Lmax);
  if (esp === "droso8") return [1, 0.95, 0.32, 0.72].map((f) => f * Lmax);
  return Array.from({ length: n }, (_, i) => (i === n - 1 ? 0.4 : 1 - (0.6 * i) / (e.auto - 1)) * Lmax);
}
/** « 2n = 44A + XY » : la formule des gonosomes (forme des sujets). */
export const formule = (esp, sexe = "XY") => `2n = ${ESPECES[esp].n2 - 2}A + ${sexe}`;

/* ---------- les outils de scène (liés au noyau) ---------- */
export function outilsScene(ctx) {
  const { E } = ctx;
  const ty = (s) => ctx.ty(s).replace(/ %/g, NB + "%");
  // Texte SVG à mini-balisage : *x* italique, ^{…} exposant, _{…} indice (tspan décalé, jamais un
  // caractère Unicode).
  function fxFill(t, str) {
    const fs = t.__fs; t.__s = str; t.textContent = ""; let shift = 0;
    const items = [];
    const ital = (txt, dy, small) => String(txt).split(/(\*[^*\s][^*]*\*)/).forEach((q) => {
      if (!q) return;
      const it = q[0] === "*" && q.length > 2 && q.endsWith("*");
      items.push({ txt: it ? q.slice(1, -1) : q, dy, small, it });
    });
    String(str).split(/(\^\{[^}]*\}|_\{[^}]*\})/).forEach((part) => {
      if (!part) return;
      if (part.startsWith("^{")) ital(part.slice(2, -1), -0.42 * fs, true);
      else if (part.startsWith("_{")) ital(part.slice(2, -1), 0.24 * fs, true);
      else ital(part, 0, false);
    });
    items.forEach(({ txt, dy, small, it }) => {
      const a = { text: txt }, d = dy - shift;
      if (Math.abs(d) > 0.01) a.dy = d.toFixed(1);
      shift = dy;
      if (small) a["font-size"] = (0.7 * fs).toFixed(1);
      if (it) a["font-style"] = "italic";
      E("tspan", a, t);
    });
  }
  const TAILLE = { "t-titre": 18, "t-sous": 16, "t-lab": 18, "t-lab2": 20, "t-cle": 26, "t-big": 30, "t-big2": 30, "t-huge": 60, "t-tick": 15, "me-all": 30, "me-gen": 22, "me-cnt": 21, "me-tb-h": 20, "me-tb-b": 24, "me-tb-big": 30, "me-f1": 22, "me-f2": 20 };
  const taille = (cls) => { for (const c of String(cls).split(/\s+/)) if (TAILLE[c]) return TAILLE[c]; return 18; };
  function fx(parent, x, y, str, cls, anchor) {
    const t = E("text", { x, y, class: cls, "text-anchor": anchor || "start" }, parent);
    t.__fs = taille(cls); fxFill(t, ty(str)); return t;
  }
  function setFx(t, str) { const s = ty(str); if (t.__s !== s) fxFill(t, s); }
  /** le titre de scène commun (t-titre, t-sous), centré en haut (ou ancré, avec `anchor`) */
  function titre(g, t, s, x = 500, anchor = "middle") {
    const T = fx(g, x, 64, t || "", "t-titre s-ink", anchor), S = fx(g, x, 92, s || "", "t-sous", anchor);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  return { fx, setFx, titre, ty };
}

/* ---------- des cellules dessinées : primitives sans DOM ----------
   Une cellule en division, dans une boîte W × H, en primitives { t, … } que les scènes (E) et les
   exercices (chaîne SVG) dessinent. Les chromosomes sont des tiges horizontales (l'axe du fuseau est
   horizontal) : paternel en `a`, maternel en `ink`. n paires ; `o[i]` dit de quel côté va le
   paternel de la paire i après la division I (0 : à gauche). */
const PHI = 0.19;
const tige = (it, x, y, L, th, k, nb, w) => {
  const h = L / 2;
  const ang = nb === 2 ? [PHI, -PHI] : [0];
  ang.forEach((a) => it.push({ t: "line", x1: x - h * Math.cos(th + a), y1: y - h * Math.sin(th + a), x2: x + h * Math.cos(th + a), y2: y + h * Math.sin(th + a), k, w }));
  it.push({ t: "circle", cx: x, cy: y, r: w * 0.62, k });
};
/** Les longueurs des n paires, de la plus grande à la plus petite, pour tenir dans la hauteur H. */
export function longueursCellule(n, H) {
  const s = Array.from({ length: n }, (_, i) => 1 - 0.18 * i), gap = 0.07 * H;
  const Lmax = Math.min(H * 0.42, (0.74 * H - (n - 1) * gap) / s.reduce((a, b) => a + b, 0));
  return s.map((f) => f * Lmax);
}
/**
 * phase : 'prophase1' 'metaphase1' 'anaphase1' 'telophase1' 'prophase2' 'metaphase2' 'anaphase2' 'telophase2'
 *         et, pour les leurres, 'mitose-meta' 'mitose-ana'.
 */
export function dessinCellule(phase, n, { W = 300, H = 220, o = [], w: wImp } = {}) {
  const it = [], w = wImp || Math.max(3.5, Math.min(9, (H / 22) * (n > 3 ? 0.65 : 1))), L = longueursCellule(n, H);
  const gap = 0.07 * H, tot = L.reduce((a, b) => a + b, 0) + (n - 1) * gap, y0 = (H - tot) / 2;
  const yc = L.map((_, i) => y0 + L.slice(0, i).reduce((a, b) => a + b, 0) + i * gap + L[i] / 2);
  const cell = (x, y, ww, hh) => it.push({ t: "rect", x, y, w: ww, h: hh, rx: Math.min(hh, ww) * 0.3, k: "cell" });
  const plaque = (x) => it.push({ t: "line", x1: x, y1: H * 0.06, x2: x, y2: H * 0.94, k: "dim", w: 1.5, dash: "5 5" });
  const cx = W / 2, side = (i) => (o[i] ? 1 : -1);
  // les tiges sont longues : on les réduit pour tenir dans une demi-cellule quand il le faut
  if (phase === "prophase1") {
    cell(4, 4, W - 8, H - 8);
    // une tétrade par paire : quatre chromatides horizontales, empilées, chacune avec son centromère
    // (la même figure que dans la scène `meiose`) ; les tétrades s'empilent dans la cellule
    const s = Math.min(w * 1.55, (H * 0.8) / (3 * n + 1.6 * (n - 1) + 1) * 0.9);
    const hT = 3 * s + w, gT = Math.max(hT * 0.45, 12), totT = n * hT + (n - 1) * gT, top = (H - totT) / 2;
    for (let i = 0; i < n; i++) {
      const yc0 = top + i * (hT + gT) + hT / 2, Li = Math.min(L[i] * 0.9, W * 0.5), x = W / 2;
      it.push({ t: "rect", x: x - Li / 2 - 12, y: yc0 - hT / 2 - 6, w: Li + 24, h: hT + 12, rx: 4, k: "dim", dash: "4 4" });
      [[-1.5, "a"], [-0.5, "a"], [0.5, "ink"], [1.5, "ink"]].forEach(([u, k]) => {
        it.push({ t: "line", x1: x - Li / 2, y1: yc0 + u * s, x2: x + Li / 2, y2: yc0 + u * s, k, w });
        it.push({ t: "circle", cx: x, cy: yc0 + u * s, r: w * 0.62, k });
      });
    }
    return { W, H, items: it };
  }
  if (phase === "metaphase1") {
    cell(4, 4, W - 8, H - 8); plaque(cx);
    for (let i = 0; i < n; i++) {
      const d = L[i] / 2 + w * 1.4;
      tige(it, cx - d, yc[i], L[i], 0, "a", 2, w); tige(it, cx + d, yc[i], L[i], 0, "ink", 2, w);
    }
    return { W, H, items: it };
  }
  if (phase === "anaphase1") {
    cell(4, 4, W - 8, H - 8);
    for (let i = 0; i < n; i++) {
      const d = Math.min(W * 0.32, W / 2 - L[i] / 2 - 24);
      tige(it, cx - d, yc[i], L[i], 0, "a", 2, w); tige(it, cx + d, yc[i], L[i], 0, "ink", 2, w);
    }
    return { W, H, items: it };
  }
  if (phase === "telophase1") {
    const hw = (W - 12) / 2;
    cell(4, 4, hw, H - 8); cell(8 + hw, 4, hw, H - 8);
    for (let i = 0; i < n; i++) {
      const gx = side(i) < 0 ? 4 + hw / 2 : 8 + hw + hw / 2, px = side(i) < 0 ? 8 + hw + hw / 2 : 4 + hw / 2;
      tige(it, gx, yc[i], Math.min(L[i], hw - 36), 0, "a", 2, w); tige(it, px, yc[i], Math.min(L[i], hw - 36), 0, "ink", 2, w);
    }
    return { W, H, items: it };
  }
  if (phase === "anaphase1-paires") {
    // un leurre : les deux homologues de chaque paire partent ensemble vers le même pôle (la paire reste entière)
    cell(4, 4, W - 8, H - 8);
    for (let i = 0; i < n; i++) {
      const d = Math.min(W * 0.32, W / 2 - L[i] / 2 - 24), sg = i % 2 ? 1 : -1, dy = Math.min(w * 1.6, H * 0.08);
      tige(it, cx + sg * d, yc[i] - dy, L[i], 0, "a", 2, w); tige(it, cx + sg * d, yc[i] + dy, L[i], 0, "ink", 2, w);
    }
    return { W, H, items: it };
  }
  if (phase === "prophase2" || phase === "metaphase2" || phase === "anaphase2") {
    // une cellule haploïde : un chromosome de chaque paire (celui du côté `o`)
    cell(4, 4, W - 8, H - 8);
    if (phase !== "prophase2") plaque(cx);
    for (let i = 0; i < n; i++) {
      const k = o[i] ? "ink" : "a";
      if (phase === "prophase2") tige(it, W * (0.28 + 0.44 * ((i * 0.618) % 1)), yc[i], Math.min(L[i], W * 0.4), 0.35 * (i % 2 ? 1 : -1), k, 2, w);
      else if (phase === "metaphase2") tige(it, cx, yc[i], Math.min(L[i], W * 0.5), 0, k, 2, w);
      else {
        const Li = Math.min(L[i], W * 0.24), d = W * 0.27;
        tige(it, cx - d, yc[i], Li, 0, k, 1, w); tige(it, cx + d, yc[i], Li, 0, k, 1, w);
      }
    }
    return { W, H, items: it };
  }
  if (phase === "telophase2") {
    const cw = (W - 20) / 4;
    for (let c = 0; c < 4; c++) {
      cell(4 + c * (cw + 4), H * 0.2, cw, H * 0.6);
      const gx = 4 + c * (cw + 4) + cw / 2;
      for (let i = 0; i < n; i++) {
        const k = (c < 2 ? o[i] : 1 - o[i]) ? "ink" : "a";
        tige(it, gx, H * 0.2 + (H * 0.6) * ((i + 1) / (n + 1)), Math.min(L[i] * 0.4, cw * 0.62, H * 0.5 / n), Math.PI / 2, k, 1, Math.max(3, w * 0.7));
      }
    }
    return { W, H, items: it };
  }
  if (phase === "mitose-meta") {
    cell(4, 4, W - 8, H - 8); plaque(cx);
    const rows = 2 * n, hh = H / (rows + 1);
    for (let r = 0; r < rows; r++) tige(it, cx, hh * (r + 1), Math.min(L[Math.floor(r / 2)], W * 0.5), 0, r % 2 ? "ink" : "a", 2, w);
    return { W, H, items: it };
  }
  // mitose-ana : 2n chromosomes à une chromatide vers chaque pôle
  cell(4, 4, W - 8, H - 8);
  const rows = 2 * n, hh = H / (rows + 1);
  for (let r = 0; r < rows; r++) {
    const Li = Math.min(L[Math.floor(r / 2)], W * 0.3), k = r % 2 ? "ink" : "a";
    tige(it, W * 0.2, hh * (r + 1), Li, 0, k, 1, w); tige(it, W * 0.8, hh * (r + 1), Li, 0, k, 1, w);
  }
  return { W, H, items: it };
}

/** Les primitives de `dessinCellule` posées dans un groupe SVG (x, y : coin haut-gauche ; s : échelle). */
export function poser(E, g, d, x = 0, y = 0, s = 1) {
  const cls = (k) => ({ a: "k-a", ink: "k-ink", dim: "k-dim" })[k];
  const gg = E("g", { transform: `translate(${x} ${y}) scale(${s})` }, g);
  d.items.forEach((p) => {
    if (p.t === "rect") E("rect", { x: p.x, y: p.y, width: p.w, height: p.h, rx: p.rx, class: p.k === "cell" ? "cell" : `${cls(p.k)} nofill`, "stroke-width": 1.8, ...(p.dash ? { "stroke-dasharray": p.dash } : {}) }, gg);
    else if (p.t === "line") E("line", { x1: p.x1.toFixed(1), y1: p.y1.toFixed(1), x2: p.x2.toFixed(1), y2: p.y2.toFixed(1), class: cls(p.k), "stroke-width": p.w, "stroke-linecap": "round", ...(p.dash ? { "stroke-dasharray": p.dash } : {}) }, gg);
    else E("circle", { cx: p.cx.toFixed(1), cy: p.cy.toFixed(1), r: p.r.toFixed(1), class: `s-bg ${cls(p.k)}`, "stroke-width": 2.5 }, gg);
  });
  return gg;
}

/** Les mêmes primitives en chaîne SVG, dans un groupe (jetons de couleur seulement), pour les exercices. */
export function svgGroupe(d, x = 0, y = 0, sc = 1) {
  const col = { a: "var(--color-signal)", ink: "var(--color-text-primary)", dim: "var(--color-text-tertiary)" };
  const f = (v) => Number(v).toFixed(1);
  let s = "";
  d.items.forEach((p) => {
    if (p.t === "rect") s += p.k === "cell"
      ? `<rect x="${f(p.x)}" y="${f(p.y)}" width="${f(p.w)}" height="${f(p.h)}" rx="${f(p.rx)}" fill="var(--color-surface-raised)" stroke="var(--color-border-soft)" stroke-width="1.8"/>`
      : `<rect x="${f(p.x)}" y="${f(p.y)}" width="${f(p.w)}" height="${f(p.h)}" rx="${f(p.rx)}" fill="none" stroke="${col[p.k]}" stroke-width="1.8" stroke-dasharray="${p.dash || ""}"/>`;
    else if (p.t === "line") s += `<line x1="${f(p.x1)}" y1="${f(p.y1)}" x2="${f(p.x2)}" y2="${f(p.y2)}" stroke="${col[p.k]}" stroke-width="${p.w}" stroke-linecap="round"${p.dash ? ` stroke-dasharray="${p.dash}"` : ""}/>`;
    else s += `<circle cx="${f(p.cx)}" cy="${f(p.cy)}" r="${f(p.r)}" fill="var(--color-surface-base)" stroke="${col[p.k]}" stroke-width="2.5"/>`;
  });
  return `<g transform="translate(${x} ${y}) scale(${sc})">${s}</g>`;
}
/** Une cellule seule, en SVG. */
export function svgCellule(d, { aria = "" } = {}) {
  return `<svg viewBox="0 0 ${d.W} ${d.H}" role="img" aria-label="${aria}">${svgGroupe(d)}</svg>`;
}

/* ---------- ce que montre une cellule dessinée (l'exercice type du bac) ---------- */
/** Les trois observations qui décident d'une phase : le nombre de chromosomes, les paires, les chromatides. */
export function decrit(phase, n = N) {
  if (phase === "metaphase1") return { nb: `${2 * n} chromosomes`, paires: "par paires", chromatides: "2 chromatides chacun" };
  if (phase === "anaphase2") return { nb: `${n} chromosomes par pôle`, paires: "aucune paire", chromatides: "1 chromatide chacun" };
  if (phase === "metaphase2") return { nb: `${n} chromosomes`, paires: "aucune paire", chromatides: "2 chromatides chacun" };
  if (phase === "anaphase1") return { nb: `${n} chromosomes par pôle`, paires: "aucune paire par pôle", chromatides: "2 chromatides chacun" };
  return { nb: "", paires: "", chromatides: "" };
}
