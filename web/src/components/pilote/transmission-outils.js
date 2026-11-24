/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Les lois statistiques de la transmission des caractères héréditaires » : les outils et les données.
 *
 * Ce fichier ne dessine rien. Il donne aux scènes, au script et aux exercices : les données sourcées
 * (Mendel, les quatre exercices d'examen), l'échiquier de croisement CALCULÉ (produit des proportions
 * des gamètes, jamais un comptage de cases écrit à la main), les proportions, les pourcentages de
 * recombinés et les distances. Aucune valeur affichée n'est écrite ailleurs.
 *
 * SOURCES : [V] vérifié sur la source citée, [S] source secondaire à relire, « corrigé » : imprimé au
 * corrigé officiel (docs/sujets/svt/meiose-fecondation-brassages.md, statut « transcrit, à vérifier »).
 *  1. [S] Mendel, pois, monohybridisme : 5 474 graines lisses et 1 850 ridées en F2 ; 6 022 jaunes et
 *     2 001 vertes ; F1 toute lisse (et toute jaune). Hanneman, Suza, Lee, Kohmetscher, « Genetics,
 *     Agriculture, and Biotechnology », Iowa State University Digital Press, ch. 1.13, tableaux 1 et 5
 *     (bio.libretexts.org) ; pour les deux premiers comptes, UNL PASSEL, « Mendel's Peas », tableau 1.
 *     À RELIRE SUR LE MÉMOIRE DE 1866 AVANT LA MISE EN LIGNE (non lu pendant la rédaction ; plan §9.11).
 *  2. [S] Mendel, pois, dihybridisme : 315 [lisse, jaune], 108 [lisse, vert], 101 [ridé, jaune], 32 [ridé, vert]
 *     (556 graines), même source, tableau 5. Idem : à relire sur le mémoire de 1866.
 *  3. [V] Mendel travaille de 1856 à 1863 et présente ses résultats à Brno en 1865 (Wikipedia, « Gregor
 *     Mendel »). Aucune citation à l'écran.
 *  4. [V] Sturtevant, élève de Morgan, publie en 1913 la première carte factorielle (Wikipedia, « Thomas
 *     Hunt Morgan »).
 *  5. [V] 1 centimorgan = une fréquence de recombinaison de 1 % (Wikipedia, « Genetic linkage »).
 *  6. Les quatre exercices d'examen (SVT 2022 N Ex. 2 ; SVT 2024 R Ex. 3 ; SVT 2024 N Ex. 3 ; PC 2024 R Ex. 2
 *     Partie II) : données recopiées des transcriptions, avec leur référence. Valeur imprimée au corrigé :
 *     « valeur du corrigé » (plan §9.12).
 *  7. À sourcer : la borne de 50 % de recombinés (étape `cinquante`, sans chiffre autre que 50 %).
 * Capacités du cadre 2025 : svt-svt 3.2.1 à 3.2.4 ; svt-pc 2.4.1 à 2.4.4.
 */
import { fr, ent, M, NB } from "./meiose-outils.js";
export { fr, ent, M, NB };

/* ---------- les fractions ---------- */
const pgcd = (a, b) => (b ? pgcd(b, a % b) : Math.abs(a));
/** « ½ », « ¼ », « ¾ » ; sinon n/d réduit */
export function fLab(n, d) {
  const g = pgcd(n, d); n /= g; d /= g;
  if (d === 1) return String(n);
  if (n === 1 && d === 2) return "½"; if (n === 1 && d === 4) return "¼"; if (n === 3 && d === 4) return "¾";
  return `${n}/${d}`;
}
/** un pourcentage à la française, au plus 2 décimales sans zéro final : 40,5 % ; 1,29 % */
export const pct = (x) => `${fr(Math.round(x * 1e4) / 100, 2).replace(/,?0+$/, "")}${NB}%`;
export const pct1 = (x) => `${fr(x * 100, 1)}${NB}%`;

/* ---------- les gènes, les gamètes ---------- */
export const GENES = {
  forme: { dom: "L", rec: "ℓ" },       // pois : lisse / ridé
  couleur: { dom: "J", rec: "j" },     // pois : jaune / vert
  sourisPC: { dom: "G", rec: "g" },    // souris du sujet PC : jaune / gris
  sourisG: { dom: "G", rec: "g" },     // souris du sujet SVT : gris / blanc
  sourisL: { dom: "L", rec: "ℓ" },     // souris du sujet SVT : lisse / crépu
  ailes: { dom: "vg⁺", rec: "vg" },    // drosophile : longues / vestigiales
  corps: { dom: "b⁺", rec: "b" },      // drosophile : clair / noir
  pattes: { dom: "D", rec: "d" },      // bovins : courtes (Dexter) / normales (Kerry)
  cornes: { dom: "R", rec: "r" },      // bovins : sans cornes / avec cornes
  A: { dom: "A", rec: "a" }, B: { dom: "B", rec: "b" }, C: { dom: "C", rec: "c" },
};
/** n gamètes à égalité : { h, p, pl } */
export const egaux = (hs) => hs.map((h) => ({ h, p: 1 / hs.length, pl: hs.length === 1 ? `100${NB}%` : fLab(1, hs.length), eq: true }));
/** les quatre gamètes d'un double hétérozygote dont les chromosomes portent h1 et h2, à d % de recombinés (d en fraction : 0,03) */
export function gametesLies(h1, h2, d) {
  const par = (1 - d) / 2, rec = d / 2;
  return [{ h: h1, p: par, pl: pct(par) }, { h: [h1[0], h2[1]], p: rec, pl: pct(rec) }, { h: [h2[0], h1[1]], p: rec, pl: pct(rec) }, { h: h2, p: par, pl: pct(par) }];
}
/** deux gamètes (linkage absolu) */
export const gametesAbsolus = (h1, h2) => egaux([h1, h2]);
/** l'écriture d'un gamète : gènes indépendants « R/ D/ », liés « vg⁺ b⁺ » */
export const gl = (h, mode) => (mode === "lie" ? h.join(" ") : h.map((a) => `${a}/`).join(" "));
/** gamète + proportion : « ½ L/ », « 40,5 % vg⁺ b⁺ » */
export const gam = (g, mode) => `${g.pl} ${gl(g.h, mode)}`;

/* ---------- l'échiquier : calculé ---------- */
export const phenotype = (genes, al) => `[${genes.map((g, i) => (al[i].includes(g.dom) ? g.dom : g.rec)).join(", ")}]`;
const dr = (g, a, b) => (a === g.dom ? [a, b] : b === g.dom ? [b, a] : [a, b]);   // l'allèle dominant d'abord : D//d
/**
 * L'échiquier : `cols` (gamètes d'un parent, en colonnes), `rows` (l'autre, en lignes), `mode` : 'un' (un gène),
 * 'indep' (deux gènes sur deux paires), 'lie' (deux gènes sur une paire) ; `letal` : indices des gènes dont
 * l'état homozygote pour l'allèle dominant est létal. Chaque case : génotype, phénotype, poids = produit des
 * proportions des gamètes. Les classes de phénotypes sont comptées en cases (N cases vivantes).
 */
export function echiquier({ genes, cols, rows, mode, letal = [] }) {
  const cells = [];
  rows.forEach((r, ri) => cols.forEach((c, ci) => {
    const al = genes.map((_, i) => [c.h[i], r.h[i]]);
    const ord = genes.map((g, i) => dr(g, al[i][0], al[i][1]));
    const geno = mode === "lie" ? `${c.h.join(" ")} // ${r.h.join(" ")}` : ord.map(([a, b]) => `${a}//${b}`).join(" ");
    const bar = letal.some((i) => al[i][0] === genes[i].dom && al[i][1] === genes[i].dom);
    cells.push({ ri, ci, geno, phe: phenotype(genes, al), w: c.p * r.p, bar, h1: c.h, h2: r.h, rec: false });
  }));
  const vivantes = cells.filter((x) => !x.bar), N = vivantes.length, W = vivantes.reduce((a, x) => a + x.w, 0);
  const egal = cols.concat(rows).every((x) => x.eq);
  // les classes, dans l'ordre : dominant d'abord, gène par gène
  const clefs = [];
  const gen = (i, cur) => { if (i === genes.length) { clefs.push(`[${cur.join(", ")}]`); return; } gen(i + 1, [...cur, genes[i].dom]); gen(i + 1, [...cur, genes[i].rec]); };
  gen(0, []);
  const classes = clefs.map((k) => {
    const cs = vivantes.filter((x) => x.phe === k), w = cs.reduce((a, x) => a + x.w, 0);
    return { key: k, n: cs.length, N, w, part: w / W, lab: egal ? (letal.length ? `${cs.length}/${N}` : fLab(cs.length, N)) : pct(w / W) };
  }).filter((c) => c.n > 0);
  // une grille à une seule case : « 100 % », comme l'entête de son gamète ; sinon des fractions (modèle) ou des pourcentages (données)
  cells.forEach((x) => { x.wlab = egal ? (cols.length * rows.length === 1 ? `100${NB}%` : fLab(1, cols.length * rows.length)) : pct(x.w); });
  return { genes, mode, cols, rows, cells, classes, N, nTot: cells.length, egal, letal };
}
/** marque les cases « recombinées » d'un test-cross de gènes liés : celles dont le gamète du parent hybride est recombiné */
export function marquerRecombines(E, parentaux) {
  E.cells.forEach((x) => { x.rec = !parentaux.some((p) => p.join("|") === x.h1.join("|")); });
  return E;
}

/* ---------- les génotypes en KaTeX (le panneau, comme les corrigés : une fraction) ---------- */
export const texAl = (a) => a.replace("⁺", "^{+}").replace("ℓ", "\\ell").replace(/^(vg)/, "\\mathit{vg}");
export const texH = (h) => h.map(texAl).join("\\ ");
const altH = (h) => h.join(" ");
/** G L // g ℓ : une fraction à deux traits dans le panneau, avec son repli en ligne */
export const GF = (h1, h2) => M(`\\dfrac{${texH(h1)}}{${texH(h2)}}`, `${altH(h1)} // ${altH(h2)}`);
/** un allèle ou un groupe d'allèles en formule, dans le panneau */
export const A = (s) => M(s.split(" ").map(texAl).join("\\ "), s);

/* ---------- les poids de Mendel [S] ---------- */
export const MENDEL = {
  forme: { lisses: 5474, ridees: 1850 },
  couleur: { jaunes: 6022, vertes: 2001 },
  di: { LJ: 315, Lj: 108, lJ: 101, lj: 32 },
};
export const M_F2 = MENDEL.forme.lisses + MENDEL.forme.ridees;                    // 7 324
export const M_RAPPORT = MENDEL.forme.lisses / MENDEL.forme.ridees;               // ≈ 2,96
export const M_PART_RIDEES = MENDEL.forme.ridees / M_F2;                          // ≈ 25,3 %
export const M_C_TOT = MENDEL.couleur.jaunes + MENDEL.couleur.vertes;             // 8 023
export const M_C_RAPPORT = MENDEL.couleur.jaunes / MENDEL.couleur.vertes;         // ≈ 3,01
export const M_DI_TOT = Object.values(MENDEL.di).reduce((a, b) => a + b, 0);      // 556
export const M_DI_ATTENDU = { LJ: (M_DI_TOT * 9) / 16, Lj: (M_DI_TOT * 3) / 16, lJ: (M_DI_TOT * 3) / 16, lj: M_DI_TOT / 16 };   // 312,75 ; 104,25 ; 104,25 ; 34,75

/* ---------- les données des quatre exercices d'examen (transcriptions) ---------- */
export const REF = {
  pc24r: "PC, 2024, session de rattrapage, exercice 2, partie II",
  svt24r: "SVT, 2024, session de rattrapage, exercice 3",
  svt22n: "SVT, 2022, session normale, exercice 2",
  svt24n: "SVT, 2024, session normale, exercice 3",
};
// PC 2024 R, croisement 1 : jaunes × jaunes → 102 jaunes, 49 grises (couleur seule)
export const PC24 = { jaunes: 102, grises: 49 };
export const PC24_N = PC24.jaunes + PC24.grises;                                  // 151
export const PC24_TC = [110, 114, 114, 114];                                     // croisement 2 (test-cross) : jaunes courts, jaunes longs, gris courts, gris longs
export const PC24_PART = PC24.jaunes / PC24_N;                                    // 67,55 % (le corrigé imprime 67,54 %)
export const PC24_RAPPORT = PC24.jaunes / PC24.grises;                            // ≈ 2,08
// pour 151 souris : ce que donneraient 3 pour 1 (113,25 et 37,75) et 2 pour 1 (100,67 et 50,33)
export const PC24_ATT31 = { jaunes: (PC24_N * 3) / 4, grises: PC24_N / 4 };
export const PC24_ATT21 = { jaunes: (PC24_N * 2) / 3, grises: PC24_N / 3 };
// SVT 2024 R, test-cross F1 × double récessif : pourcentages imprimés au sujet
export const SV24R = { GL: 48.29, gl: 48.71, Gl: 1.29, gL: 1.71 };
export const SV24R_REC = SV24R.Gl + SV24R.gL;                                     // 3,00
export const SV24R_PAR = SV24R.GL + SV24R.gl;                                     // 97,00
// SVT 2022 N, document 1 : position des loci en cM sur le chromosome 2
export const SV22 = { corps: 48, ailes: 67 };
export const SV22_D = Math.abs(SV22.ailes - SV22.corps);                          // 19 cM
export const SV22_PAR = (100 - SV22_D) / 2;                                       // 40,5 (valeur du corrigé : 40,5 %)
export const SV22_REC = SV22_D / 2;                                               // 9,5  (valeur du corrigé : 9,5 %)
// SVT 2024 N : bovins
export const BOV_VIVANTS = 2 / 3;

/* ---------- les distances et les recombinés ---------- */
/** d cM = d % de recombinés : le pourcentage de recombinés d'un test-cross, sur le TOTAL */
export const pctRecombines = (rec, total) => (100 * rec) / total;
export const distanceCM = (rec, total) => pctRecombines(rec, total);

/* ---------- les cas de la leçon : les échiquiers précalculés ---------- */
const un = (gene) => ({ genes: [gene], mode: "un" });
const eq = (g) => egaux(g);
const L_ = GENES.forme, J_ = GENES.couleur;
export const CAS = {};
CAS.f2 = echiquier({ genes: [L_], cols: eq([["L"], ["ℓ"]]), rows: eq([["L"], ["ℓ"]]), mode: "un" });
CAS.tcL = echiquier({ genes: [L_], cols: eq([["L"], ["ℓ"]]), rows: eq([["ℓ"]]), mode: "un" });
CAS.tcLL = echiquier({ genes: [L_], cols: eq([["L"]]), rows: eq([["ℓ"]]), mode: "un" });
CAS.letal = echiquier({ genes: [GENES.sourisPC], cols: eq([["G"], ["g"]]), rows: eq([["G"], ["g"]]), mode: "un", letal: [0] });
const GAM4 = eq([["L", "J"], ["L", "j"], ["ℓ", "J"], ["ℓ", "j"]]);
CAS.tcIndep = echiquier({ genes: [L_, J_], cols: GAM4, rows: eq([["ℓ", "j"]]), mode: "indep" });
CAS.f2Indep = echiquier({ genes: [L_, J_], cols: GAM4, rows: GAM4, mode: "indep" });
const SG = GENES.sourisG, SL = GENES.sourisL;
CAS.absolu = echiquier({ genes: [SG, SL], cols: gametesAbsolus(["G", "L"], ["g", "ℓ"]), rows: gametesAbsolus(["G", "L"], ["g", "ℓ"]), mode: "lie" });
const TCS_COLS = [{ h: ["G", "L"], p: SV24R.GL / 100, pl: pct(SV24R.GL / 100) }, { h: ["g", "ℓ"], p: SV24R.gl / 100, pl: pct(SV24R.gl / 100) }, { h: ["G", "ℓ"], p: SV24R.Gl / 100, pl: pct(SV24R.Gl / 100) }, { h: ["g", "L"], p: SV24R.gL / 100, pl: pct(SV24R.gL / 100) }];
CAS.sourisTC = marquerRecombines(echiquier({ genes: [SG, SL], cols: TCS_COLS, rows: eq([["g", "ℓ"]]), mode: "lie" }), [["G", "L"], ["g", "ℓ"]]);
// le même test-cross, dans le sens inverse de phase (G ℓ // g L)
CAS.sourisInv = marquerRecombines(echiquier({ genes: [SG, SL], cols: gametesLies(["G", "ℓ"], ["g", "L"], SV24R_REC / 100), rows: eq([["g", "ℓ"]]), mode: "lie" }), [["G", "ℓ"], ["g", "L"]]);
// 2022 N : lignée B (vg⁺ b⁺ // vg b) × lignée C (vg b // vg b)
const DR = [GENES.ailes, GENES.corps];
const B_GAM = gametesLies(["vg⁺", "b⁺"], ["vg", "b"], SV22_D / 100);
CAS.droso = marquerRecombines(echiquier({ genes: DR, cols: B_GAM, rows: eq([["vg", "b"]]), mode: "lie" }), [["vg⁺", "b⁺"], ["vg", "b"]]);
// Mendel : si ses deux gènes avaient été liés en phase L J // ℓ j (linkage absolu)
CAS.absoluMendel = echiquier({ genes: [L_, J_], cols: egaux([["L", "J"], ["ℓ", "j"]]), rows: egaux([["L", "J"], ["ℓ", "j"]]), mode: "lie" });
// 2024 N : bovins, F1 × F1, D//D létal (colonnes dans l'ordre du corrigé : R D, r d, R d, r D)
const BG = egaux([["R", "D"], ["r", "d"], ["R", "d"], ["r", "D"]]);
CAS.bovins = echiquier({ genes: [GENES.cornes, GENES.pattes], cols: BG, rows: BG, mode: "indep", letal: [1] });
// un test-cross d'exemple (partie 7) : 410 [A, B], 390 [a, b], 105 [A, b], 95 [a, B] sur 1 000
export const EX_TC = { AB: 410, ab: 390, Ab: 105, aB: 95 };
export const EX_N = Object.values(EX_TC).reduce((a, b) => a + b, 0);
export const EX_REC = EX_TC.Ab + EX_TC.aB;
export const EX_D = distanceCM(EX_REC, EX_N);                                      // 20 cM
export const EX_LEURRE_PAR = distanceCM(EX_REC, EX_TC.AB + EX_TC.ab);              // 25 (divisé par les parentaux)
export const EX_LEURRE_UNE = distanceCM(EX_TC.Ab, EX_N);                           // 10,5 (une seule classe)
const exC = [["A", "B", EX_TC.AB], ["a", "b", EX_TC.ab], ["A", "b", EX_TC.Ab], ["a", "B", EX_TC.aB]].map(([x, y, n]) => ({ h: [x, y], p: n / EX_N, pl: ent(n) }));
CAS.exTC = echiquier({ genes: [GENES.A, GENES.B], cols: exC, rows: egaux([["a", "b"]]), mode: "lie" });
CAS.exTC.cells.forEach((c, i) => { c.wlab = ent(exC[i].p * EX_N); });
// la démarche du bac : un test-cross « d'exemple » de F1, quatre classes (des effectifs proches, pas égaux)
export const DEM = { LJ: 102, Lj: 98, lJ: 101, lj: 99 };
export const DEM_N = Object.values(DEM).reduce((a, b) => a + b, 0);                // 400
export const DEM_PARTS = Object.values(DEM).map((n) => (100 * n) / DEM_N);           // 25,5 ; 24,5 ; 25,25 ; 24,75
// 12 cM : la part attendue de [A, b]
export const D12 = 12, D12_CLASSE = D12 / 2, D12_PAR = (100 - D12) / 2;           // 6 ; 44
// trois gènes : A-B 8, B-C 5, A-C 13
export const TROIS = { AB: 8, BC: 5, AC: 13 };
// le bilan : 42, 41, 9, 8 → 17 cM
export const Q1 = { a: 42, b: 41, c: 9, d: 8 };
export const Q1_D = Q1.c + Q1.d;                                                   // 17
export const Q1_UNE = Math.max(Q1.c, Q1.d);                                        // 9 : le leurre « une classe » est 8,5 si l'on moyenne
export const Q1_MOY = Q1_D / 2;                                                    // 8,5
// 460, 440, 52, 48 → 10 cM
export const Q3 = { p1: 460, p2: 440, r1: 52, r2: 48 };
export const Q3_N = Q3.p1 + Q3.p2 + Q3.r1 + Q3.r2;                                  // 1 000
export const Q3_D = distanceCM(Q3.r1 + Q3.r2, Q3_N);                               // 10
export const Q3_PAR = distanceCM(Q3.r1 + Q3.r2, Q3.p1 + Q3.p2);                    // 11,1 (divisé par les parentaux)
export const Q3_UNE = distanceCM(Q3.r1, Q3_N);                                     // 5,2 (une seule classe)
// un test-cross à un gène : 52 lisses, 48 ridées
export const TC1 = { lisses: 52, ridees: 48 };

/* ---------- les nombres tirés au sort : les exercices ---------- */
/** un test-cross « observé » : écart d'au plus 8 % par classe autour de l'attendu (jamais l'attendu exact plus d'une fois sur trois) */
export function observe(h, attendus, N) {
  const exact = h.r() < 1 / 3;
  const brut = attendus.map((p) => { const e = p * N; return exact ? Math.round(e) : Math.round(e * (1 + (h.r() * 2 - 1) * 0.08)); });
  return brut;
}

/* ---------- les outils de scène (liés au noyau) ---------- */
export function outilsTr(ctx) {
  const { E } = ctx;
  const ty = (s) => ctx.ty(s).replace(/ %/g, NB + "%");
  // texte SVG à mini-balisage : *x* italique, ^{…} exposant, _{…} indice
  function fill(t, str) {
    const fs = t.__fs; t.__s = str; t.textContent = ""; let shift = 0; const items = [];
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
  const TAILLE = { "t-titre": 18, "t-sous": 16, "t-lab": 18, "t-lab2": 20, "t-cle": 26, "t-big": 30, "t-big2": 30, "t-huge": 60, "t-tick": 15, "me-all": 34, "me-gen": 32 };
  const taille = (cls) => { for (const c of String(cls).split(/\s+/)) if (TAILLE[c]) return TAILLE[c]; return 18; };
  /** fx(parent, x, y, texte, classes, ancre, taille?) : `taille` impose la taille (attribut font-size) */
  function fx(parent, x, y, str, cls, anchor, size) {
    const t = E("text", { x, y, class: cls, "text-anchor": anchor || "start" }, parent);
    t.__fs = size || taille(cls); if (size) t.style.fontSize = `${size}px`;
    fill(t, ty(str)); return t;
  }
  function setFx(t, str, size) {
    const s = ty(str);
    if (size && t.__fs !== size) { t.__fs = size; t.style.fontSize = `${size}px`; t.__s = null; }
    if (t.__s !== s) fill(t, s);
  }
  function titre(g, t, s, x = 500, anchor = "middle") {
    const T = fx(g, x, 64, t || "", "t-titre s-ink", anchor), S = fx(g, x, 92, s || "", "t-sous", anchor);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  return { fx, setFx, titre, ty };
}

/* ---------- les étiquettes d'allèles de la scène `meiose` ---------- */
export const SOUS_PH = ["Avant la méiose : phase G1", "Après la phase S", "Prophase I", "Métaphase I", "Anaphase I", "Fin de la division I", "Métaphase II", "Anaphase II", "Quatre cellules"];
// G1 : grande paire, chromosome du père ; G2 : celui de la mère ; P1, P2 : la petite paire
export const LAB = {
  vide: { G1: [], G2: [], P1: [], P2: [] },
  G: { G1: [], G2: [], P1: ["G"], P2: ["g"] },
  L: { G1: [], G2: [], P1: ["L"], P2: ["ℓ"] },
  deux: { G1: ["L"], G2: ["ℓ"], P1: ["J"], P2: ["j"] },
  souris: { G1: ["G", "L"], G2: ["g", "ℓ"], P1: [], P2: [] },
  sourisInv: { G1: ["G", "ℓ"], G2: ["g", "L"], P1: [], P2: [] },
};
/** les quatre cellules finales (comme `gametes` de meiose-outils) : o, orientation de la petite paire ; co, crossing-over */
export function gametesMeiose(lab, o, co, mode = "lie") {
  const a1 = lab.G1, a2 = lab.G2;
  const g1a = a1, g1b = co && a1.length > 1 && a2.length > 1 ? [a1[0], a2[1]] : a1;
  const g2a = co && a1.length > 1 && a2.length > 1 ? [a2[0], a1[1]] : a2, g2b = a2;
  const pl = o ? lab.P2 : lab.P1, pr = o ? lab.P1 : lab.P2;
  const w = (g, p) => { const h = [...g, ...p]; return h.length ? gl(h, mode) : ""; };
  return [w(g1a, pl), w(g1b, pl), w(g2a, pr), w(g2b, pr)];
}
export const typesMeiose = (lab, o, co, mode) => [...new Set(gametesMeiose(lab, o, co, mode))];
