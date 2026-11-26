/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dosage acido-basique » (V3) : les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n'est écrit à la main : il vient de ce fichier (donnée sourcée, ou
 * valeur CALCULÉE à partir d'elle). Les scènes, le script et les gabarits d'exercices importent d'ici.
 * Les outils de formatage et de scène de `radioactivite-outils.js` sont repris tels quels.
 *
 * SOURCES : [V] lu sur la source citée ; « choix d'auteur » : valeur de la leçon, pas une donnée ;
 * « à vérifier » : à ne pas afficher comme un fait avant relecture.
 *
 *  1. [V] Sujet 2018, session normale (NS28F), Exercice I, Partie II, sous-partie 1 (acide lactique + soude) :
 *     V_A = 15 mL, C_B = 3 × 10⁻² mol·L⁻¹, K_A = 10^(−3,9), indicateurs (hélianthine 3-4,4 ; B.B.T 6-7,6 ;
 *     rouge de crésol 7,2-8,8), E(10,0 mL ; 8,0), tangentes parallèles de pente 0,89 pH·mL⁻¹ ; barème
 *     0,5 + 0,5 + 0,5 + 0,5 + 0,75 = 2,75 pt. docs/sujets/pc/reactions-acido-basiques.md (trois passes).
 *  2. [V] Sujet 2020, session normale (NS28F), Exercice I, Partie 1 (ammoniac + HCl) :
 *     V_b = 15 mL, C_a = 10⁻² mol·L⁻¹, C_b = 10⁻² mol·L⁻¹, pH(S_b) = 10,6, Q_r,éq = 1,65 × 10⁻⁵,
 *     indicateurs (hélianthine 3,1-4,4 ; rouge de méthyle 4,2-6,2 ; phénolphtaléine 8,2-10). La courbe de la
 *     leçon est calculée par électroneutralité exacte (figure du sujet « à confirmer par lecture »).
 *  3. [V] Sujet 2021, session normale (NS28F), Exercice I, Partie 2 : tableau des pK_A
 *     (HCOOH/HCOO⁻ 3,75 ; C₆H₅COOH/C₆H₅COO⁻ 4,2 ; CH₃COOH/CH₃COO⁻ 4,75 ; C₂H₅COOH/C₂H₅COO⁻ 4,9).
 *  4. [V] Sujet 2022, session normale (NS28F), Exercice 1, Partie 2, §2 (acide propanoïque + soude) :
 *     C_a = 5 × 10⁻² mol·L⁻¹, V_a = 20 mL, C_b = 5 × 10⁻² mol·L⁻¹, M = 74 g·mol⁻¹, dilution 10 fois,
 *     pic de dpH/dV_b sur V_bE = 20,0 mL, flèche d'étiquette pointant vers 21,7 mL, dérivée sans échelle.
 *  5. [V] Sujet 2024, session normale (NS 28F), Exercice 1, Partie 2 (vitamine C + soude) :
 *     comprimé 250 mg, V_SA = 50,0 mL, V_A = 15,0 mL, C_B = 1,50 × 10⁻² mol·L⁻¹, M(AH) = 176 g·mol⁻¹,
 *     pic de (C₂) sur V_BE = 25,0 mL ; barème Q2–Q4 : 0,5 + 0,5 + 0,75 pt.
 *  6. [V] Sujet 2025, session normale (NS28F), Exercice 1, Partie 1 (NaHSO₃ + soude) :
 *     étiquette 500 g·L⁻¹, M = 104 g·mol⁻¹, pK_A = 7,2, dilution 100 fois, V_A = 20,0 mL, C_B = 0,10 mol·L⁻¹,
 *     V_BE = 9,6 mL, C₀ = 4,80 mol·L⁻¹ ; barème 3,75 pt.
 *  7. [V] K_e = 10⁻¹⁴ à 25 °C (donné dans les sujets 2020, 2024, 2025).
 *  8. [V] Descroizilles, vers 1791 : tube gradué pour mesurer la force des alcalis puis le titre du vinaigre
 *     (Wikipédia en. « Titration » et fr. « François-Antoine-Henri Descroizilles », lus le 2026-11-25 ;
 *     à confirmer sur une source d'histoire de la chimie). Gay-Lussac, 1824 : mots « pipette » et « burette »
 *     (fiche de mot `burette` seulement).
 *  9. [V] Phénolphtaléine : incolore → rose (Wikipédia « pH indicator ») ; la leçon garde la plage des sujets
 *     (8,2–10).
 * 10. Valeurs de la leçon (choix d'auteur) : acide éthanoïque, pK_A = 4,75 (source 3), C_A = 6,0 × 10⁻² mol·L⁻¹,
 *     V_A = 20,0 mL, soude C_B = 0,10 mol·L⁻¹, d'où V_E = 12,0 mL (1 mL = 1 jeton = 1,0 × 10⁻⁴ mol,
 *     12 jetons d'acide au départ). Courbe pH = f(V_B) calculée par électroneutralité exacte.
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene };

/* ---------- constantes et calculs chimiques exacts ---------- */
export const KE = 1e-14;
export const PKE = 14;

/**
 * pH exact d'un dosage d'acide faible (CA, VA, pKA) par une base forte (CB, VB), par électroneutralité :
 *   h + c_b − K_e/h − c_a·K_A/(h + K_A) = 0,  où h = [H₃O⁺] = 10^(−pH).
 * La fonction g(pH) est strictement décroissante sur [0 ; 14] : bissection exacte à ~10⁻¹⁶.
 */
export function phDosageAcide(CA, VA, CB, pKA, VB) {
  const KA = 10 ** -pKA;
  const Vt = VA + VB;
  const ca = (CA * VA) / Vt;
  const cb = (CB * VB) / Vt;
  let lo = 0, hi = 14;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const h = 10 ** -mid;
    const f = h + cb - KE / h - (ca * KA) / (h + KA);
    if (f > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/**
 * pH exact d'un dosage de base faible (CB, VB, pKA du couple BH⁺/B) par un acide fort (CA, VA) :
 *   h + c_b·h/(h + K_A) − K_e/h − c_a = 0.
 */
export function phDosageBase(CB, VB, CA, pKA, VA) {
  const KA = 10 ** -pKA;
  const Vt = VB + VA;
  const cb = (CB * VB) / Vt;
  const ca = (CA * VA) / Vt;
  let lo = 0, hi = 14;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const h = 10 ** -mid;
    const f = h + (cb * h) / (h + KA) - KE / h - ca;
    if (f > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Volume V_B exact (mL) pour atteindre un pH donné lors du dosage d'un acide faible par la soude */
export function vDePhAcide(CA, VA, CB, pKA, pH) {
  const KA = 10 ** -pKA;
  const h = 10 ** -pH;
  const d = h - KE / h;
  const num = VA * ((CA * KA) / (h + KA) - d);
  const den = CB + d;
  return num / den;
}

/** Dérivée numérique dpH/dV_B (pH·mL⁻¹) pour un dosage d'acide faible */
export function dphDvAcide(CA, VA, CB, pKA, VB, dv = 0.02) {
  const v1 = Math.max(0, VB - dv), v2 = VB + dv;
  return (phDosageAcide(CA, VA, CB, pKA, v2) - phDosageAcide(CA, VA, CB, pKA, v1)) / (v2 - v1);
}

/* ---------- valeurs de la leçon (choix d'auteur, pK_A du sujet 2021) ---------- */
export const PKA_ETH = 4.75;
export const CA_L = 6.0e-2;           // mol·L⁻¹
export const VA_L = 20.0;             // mL
export const CB_L = 0.10;             // mol·L⁻¹
export const VE_L = (CA_L * VA_L) / CB_L; // 12,0 mL
export const VMAX_L = 20.0;           // mL (cadre de la courbe)
export const V_GOUTTE = 0.05;         // mL (ordre de grandeur, non affiché comme fait sourcé)
export const N_JETONS = Math.round((CA_L * VA_L * 1e-3) / 1e-4); // 12 jetons (1 jeton = 1,0 × 10⁻⁴ mol)
export const JETON_MOL = 1.0e-4;      // mol par jeton

export const phL = (V) => phDosageAcide(CA_L, VA_L, CB_L, PKA_ETH, V);
export const dphL = (V) => dphDvAcide(CA_L, VA_L, CB_L, PKA_ETH, V);
export const vPhL = (pH) => vDePhAcide(CA_L, VA_L, CB_L, PKA_ETH, pH);

export const V_AV_G = Number((VE_L - V_GOUTTE).toFixed(2)); // 11,95 mL
export const V_AP_G = Number((VE_L + V_GOUTTE).toFixed(2)); // 12,05 mL
export const PH_0 = phL(0);           // ≈ 2,99
export const PH_4 = phL(4);           // ≈ 4,45
export const PH_6 = phL(6);           // ≈ 4,75
export const PH_8 = phL(8);           // ≈ 5,05
export const PH_AV_G = phL(V_AV_G);   // ≈ 7,13
export const PH_E = phL(VE_L);        // ≈ 8,66
export const PH_AP_G = phL(V_AP_G);   // ≈ 10,19
export const PH_16 = phL(16);         // ≈ 12,05
export const PH_20 = phL(20);         // ≈ 12,30

/** État déterministe de la scène `dosage` en fonction du seul paramètre V (mL) — règle M3 */
export const PALIERS_DOSAGE = [
  { v: 0, titre: "Le départ", sens: "Douze jetons d’acide dans le bécher, aucune soude versée." },
  { v: VE_L / 2, titre: "La demi-équivalence", sens: "La moitié de l’acide a réagi : autant de CH₃COOH que de CH₃COO⁻." },
  { v: VE_L, titre: "L’équivalence", sens: "Le dernier acide est consommé : il ne reste que CH₃COO⁻." },
  { v: VE_L * 1.5, titre: "L’excès de soude", sens: "Chaque millilitre versé laisse un jeton HO⁻ libre." },
];

export function etatDosage(V) {
  const v = Math.max(0, Math.min(VMAX_L, V));
  const pH = phL(v);
  const nAH = Math.max(0, N_JETONS - v);
  const nA = Math.min(N_JETONS, v);
  const nHO = Math.max(0, v - N_JETONS);
  // phénolphtaléine (8,2–10) : 0 = incolore, 1 = rose
  const vir = Math.max(0, Math.min(1, (pH - 8.2) / (10.0 - 8.2)));
  return { v, pH, nAH, nA, nHO, vir };
}

/* ---------- calculs des étapes de la leçon (aucun nombre écrit à la main) ---------- */
export const SAV = { pH: 4.0, pKA: PKA_ETH };
export const COMB = { V1: VE_L, V2: 2 * VE_L, Vdemi: VE_L / 2 };

export const K_DOS = 10 ** (PKE - PKA_ETH);                // ≈ 1,78 × 10⁹
export const K_FAUX_INV = 1 / K_DOS;                       // ≈ 5,62 × 10⁻¹⁰
export const K_FAUX_PROD = 10 ** -PKA_ETH * KE;            // ≈ 1,78 × 10⁻¹⁹

export const TOT = (() => {
  const V = 6.0;
  const pH = phL(V);
  const xmax = CB_L * V * 1e-3;
  const nHO = 10 ** (pH - PKE) * (VA_L + V) * 1e-3;
  const tau = 1 - nHO / xmax;
  const fauxEau = 10 ** -pH / CA_L;
  const rapport = xmax / nHO;
  return { V, pH, xmax, nHO, tau, fauxEau, rapport };
})();

export const TAB_AV = (() => {
  const V = 4.0;
  const n0 = CA_L * VA_L * 1e-3;
  const nB = CB_L * V * 1e-3;
  const nAH = n0 - nB;
  return { V, n0, nB, nAH };
})();

export const CA_STEP = {
  CA: CA_L,
  fauxInv: (CB_L * VA_L) / VE_L,       // ≈ 0,167
  fauxCB: CB_L,
};

export const DEMI = {
  V: VE_L / 2,
  pH: PH_6,
  fauxMoitie: PH_E / 2,                // ≈ 4,33
};

export const POURCENT = (() => {
  const V = 3.0;
  const rap = VE_L / V - 1;            // 3
  const pctA = (rap / (1 + rap)) * 100; // 75
  const pctB = 100 - pctA;             // 25
  return { V, rap, pctA, pctB };
})();

/* Indicateurs colorés (plages des sujets 2018 et 2020) */
export const IND = {
  helianthine20: { nom: "hélianthine", min: 3.1, max: 4.4 },
  helianthine18: { nom: "hélianthine", min: 3.0, max: 4.4 },
  rougeMethyle: { nom: "rouge de méthyle", min: 4.2, max: 6.2 },
  bbt: { nom: "B.B.T", min: 6.0, max: 7.6 },
  rougeCresol: { nom: "rouge de crésol", min: 7.2, max: 8.8 },
  phenolphtaleine: { nom: "phénolphtaléine", min: 8.2, max: 10.0 },
};

export const VIR_LECON = {
  hel: [Math.max(0, vPhL(IND.helianthine20.min)), vPhL(IND.helianthine20.max)],
  rm: [vPhL(IND.rougeMethyle.min), vPhL(IND.rougeMethyle.max)],
  bbt: [vPhL(IND.bbt.min), vPhL(IND.bbt.max)],
  phen: [vPhL(IND.phenolphtaleine.min), vPhL(IND.phenolphtaleine.max)],
};

export const RET_V = (() => {
  const V = 18.0;
  const CA = (CB_L * V) / VA_L;        // 9,0 × 10⁻²
  const fauxInv = (CB_L * VA_L) / V;   // 0,111
  return { V, CA, fauxInv };
})();

/* ---------- sujets du bac ---------- */
// 2018 N (source 1) : acide lactique + soude
export const S18 = (() => {
  const VA = 15, CB = 3e-2, pKA = 3.9, VE = 10.0, pHE = 8.0;
  const CA = (CB * VE) / VA;           // 2,0 × 10⁻²
  const fauxInv = (CB * VA) / VE;      // 4,5 × 10⁻²
  const rapE = 10 ** (pHE - pKA);      // 10^(4,1) ≈ 1,26 × 10⁴
  const fauxRapInv = 1 / rapE;         // ≈ 7,9 × 10⁻⁵
  return { VA, CB, pKA, VE, pHE, CA, fauxInv, rapE, fauxRapInv, pente: 0.89, bareme: [0.5, 0.5, 0.5, 0.5, 0.75] };
})();
export const ph18 = (V) => phDosageAcide(S18.CA, S18.VA, S18.CB, S18.pKA, V);

// 2020 N (source 2) : ammoniac + HCl
export const S20 = (() => {
  const Vb = 15, Ca = 1e-2, Cb = 1e-2, VaE = 15, Qreq = 1.65e-5;
  const pKA = PKE + Math.log10(Qreq);  // ≈ 9,22
  const pHE = phDosageBase(Cb, Vb, Ca, pKA, VaE); // ≈ 5,76
  return { Vb, Ca, Cb, VaE, Qreq, pKA, pHE };
})();
export const ph20 = (V) => phDosageBase(S20.Cb, S20.Vb, S20.Ca, S20.pKA, V);

// 2021 N (source 3) : tableau des pK_A
export const TABLE_2021 = [
  { nom: "acide méthanoïque", couple: "HCOOH/HCOO⁻", AH: "HCOOH", A: "HCOO^-", pKA: 3.75 },
  { nom: "acide benzoïque", couple: "C₆H₅COOH/C₆H₅COO⁻", AH: "C_6H_5COOH", A: "C_6H_5COO^-", pKA: 4.2 },
  { nom: "acide éthanoïque", couple: "CH₃COOH/CH₃COO⁻", AH: "CH_3COOH", A: "CH_3COO^-", pKA: 4.75 },
  { nom: "acide propanoïque", couple: "C₂H₅COOH/C₂H₅COO⁻", AH: "C_2H_5COOH", A: "C_2H_5COO^-", pKA: 4.9 },
];

// 2022 N (source 4) : acide propanoïque + soude
export const S22 = (() => {
  const Ca = 5e-2, Va = 20, Cb = 5e-2, VE = 20.0, Vfleche = 21.7, dil = 10, M = 74, pKA = 4.89;
  const C0 = dil * Ca;                 // 0,50
  const m = C0 * M;                    // 37 g
  const fauxDil = Ca * M;              // 3,7 g
  const fauxPrise = C0 * (Va * 1e-3) * M; // 0,74 g
  const CaCopie = (Cb * Vfleche) / Va; // ≈ 5,4 × 10⁻²
  return { Ca, Va, Cb, VE, Vfleche, dil, M, pKA, C0, m, fauxDil, fauxPrise, CaCopie };
})();
export const ph22 = (V) => phDosageAcide(S22.Ca, S22.Va, S22.Cb, S22.pKA, V);
export const dph22 = (V) => dphDvAcide(S22.Ca, S22.Va, S22.Cb, S22.pKA, V);

// 2024 N (source 5) : vitamine C + soude
export const S24 = (() => {
  const mAnnonce = 0.25, mAnnonceMg = 250, VSA = 50.0, VA = 15.0, CB = 1.50e-2, M = 176, VBE = 25.0, pKA = 4.05;
  const CA = (CB * VBE) / VA;          // 2,5 × 10⁻²
  const fauxInv = (CB * VA) / VBE;     // 9,0 × 10⁻³
  const mRest = CA * (VSA * 1e-3) * M; // 0,22 g
  const fauxPrise = CA * (VA * 1e-3) * M; // 0,066 g
  return { mAnnonce, mAnnonceMg, VSA, VA, CB, M, VBE, pKA, CA, fauxInv, mRest, fauxPrise, bareme: [0.5, 0.5, 0.75] };
})();
export const ph24 = (V) => phDosageAcide(S24.CA, S24.VA, S24.CB, S24.pKA, V);
export const dph24 = (V) => dphDvAcide(S24.CA, S24.VA, S24.CB, S24.pKA, V);

// 2025 N (source 6) : NaHSO₃ + soude
export const S25 = (() => {
  const etiq = 500, M = 104, pKA = 7.2, dil = 100, VA = 20.0, CB = 0.10, VBE = 9.6;
  const CA = (CB * VBE) / VA;          // 4,8 × 10⁻²
  const C0 = dil * CA;                 // 4,80
  const fauxDilDiv = CA / dil;         // 4,8 × 10⁻⁴
  const Cm = C0 * M;                   // 499,2 g·L⁻¹
  const ecartRel = (Math.abs(Cm - etiq) / etiq) * 100; // 0,16 %
  const xmax = CA * VA * 1e-3;         // 9,6 × 10⁻⁴ mol
  const Ceq = xmax / ((VA + VBE) * 1e-3); // ≈ 3,24 × 10⁻²
  const fauxVA = CA;                   // 4,8 × 10⁻²
  const fauxVBE = xmax / (VBE * 1e-3); // 0,10
  return { etiq, M, pKA, dil, VA, CB, VBE, CA, C0, fauxDilDiv, Cm, ecartRel, xmax, Ceq, fauxVA, fauxVBE };
})();

/* ---------- les outils de scène de la leçon ---------- */
export function outilsDos(ctx) {
  const O = outilsScene(ctx);
  const { fx, setFx } = O;
  function lab(parent, x, y, str, cls, anchor, fs = 26) {
    const t = fx(parent, x, y, "", cls, anchor);
    t.__fs = fs; t.__s = null; setFx(t, str);
    return t;
  }
  function titre(g, t, s, x = 500) {
    const T = lab(g, x, 48, t || "", "ds-t s-ink", "middle", 26);
    const S = lab(g, x, 82, s || "", "ds-s s-c", "middle", 22);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  const { E } = ctx;
  function axes(g, X, Y, x0, x1, xs, y1, ys, xf, yf, xt, yt, xtx, y0 = 0) {
    g.textContent = "";
    E("line", { x1: X(x0), y1: Y(y0), x2: X(x1) + 14, y2: Y(y0), class: "k-dim", "stroke-width": 2 }, g);
    E("line", { x1: X(x0), y1: Y(y0), x2: X(x0), y2: Y(y1) - 14, class: "k-dim", "stroke-width": 2 }, g);
    for (let v = x0; v <= x1 + 1e-9; v += xs) {
      E("line", { x1: X(v), x2: X(v), y1: Y(y0), y2: Y(y0) + 7, class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(v), Y(y0) + 28, xf(v), "t-sous s-c", "middle", 22);
    }
    for (let v = y0 + ys; v <= y1 + 1e-9; v += ys) {
      E("line", { x1: X(x0) - 7, x2: X(x0), y1: Y(v), y2: Y(v), class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(x0) - 12, Y(v) + 7, yf(v), "t-sous s-c", "end", 22);
    }
    if (xt) lab(g, X(x1) + 14, Y(y0) + (xtx || 54), xt, "ds-l s-c", "end", 24);
    if (yt) lab(g, X(x0) + 14, Y(y1) - 18, yt, "ds-l s-c", "start", 24);
  }
  return { ...O, lab, titre, axes };
}
