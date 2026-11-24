/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Noyaux, masse et énergie » (V3) — les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n'est écrit à la main : il vient de ce fichier (donnée
 * sourcée, ou valeur CALCULÉE à partir d'elle). Les scènes et les gabarits d'exercices importent
 * d'ici. Les outils de formatage et de scène de la leçon voisine (`radioactivite-outils.js`) sont
 * repris tels quels : ce sont des fonctions sans contenu de leçon.
 *
 * SOURCES — [V] lu sur la source citée, par l'auteur de ce fichier ; [plan] valeur reprise du
 * plan (docs/refonte/specs/noyaux-masse-energie.md §8.1), non relue ici ; « à vérifier » : à ne
 * pas montrer à un élève avant relecture. Aucune ligne « à vérifier » ne s'affiche dans la leçon.
 *
 *  1. [V] NIST, CODATA 2022 (https://physics.nist.gov/cgi-bin/cuu/Value?mpu, mnu, meu, malu, mdu,
 *     mtu, ukg, muc2mev) : m_p = 1,007 276 466 5789 u ; m_n = 1,008 664 916 06 u ;
 *     m_e = 5,485 799 090 441 × 10⁻⁴ u ; m(α) = 4,001 506 179 129 u ; m(²H) = 2,013 553 212 544 u ;
 *     m(³H) = 3,015 500 715 97 u ; 1 u = 1,660 539 068 92 × 10⁻²⁷ kg ; 1 u·c² = 931,494 103 72 MeV.
 *  2. [V] c = 299 792 458 m·s⁻¹ et e = 1,602 176 634 × 10⁻¹⁹ C : valeurs exactes du SI (2019).
 *  3. [V] AME2020, Chinese Physics C 45, 030002 et 030003 (2021), fichier « mass_1.mas20 » de
 *     https://www-nds.iaea.org/amdc/ame2020/ : masse ATOMIQUE de chaque nucléide et énergie de
 *     liaison par nucléon (colonne BINDING ENERGY/A). Table NUCL ci-dessous, recopiée de ce fichier
 *     (lu le 2026-11-24). La masse du NOYAU se déduit : masse de l'atome − Z·m_e ; l'énergie de
 *     liaison des électrons (de 14 eV pour H à environ 0,7 MeV pour U, moins de 0,05 % de E_ℓ) est
 *     négligée.
 *  4. [V] Les sujets transcrits (docs/sujets/pc/) : 1 u = 931,41 MeV/c² (2020 N) ; 931,49 (2025 N) ;
 *     931,5 (2022 N) ; niveaux d'énergie du sujet 2020 N (Exercice III, Q2) ; E_ℓ du sujet 2023 N
 *     (Exercice 2, §2 : 2,366 ; 8,475 ; 28,296 MeV) ; E_ℓ/A du sujet 2019 N (Exercice II, partie 2 :
 *     7,07 ; 7,69 ; 7,73 MeV/nucléon). Ces valeurs ne s'emploient que dans les étapes qui citent le
 *     sujet. Les masses des sujets 2022 N et 2025 N sont des masses de noyaux (« masse du noyau »
 *     dans le sujet 2022 ; la masse de l'électron est donnée à part).
 *  5. [V] J. N. Bahcall, « How the Sun Shines », Nobel e-Museum (2000), arXiv:astro-ph/0009259 :
 *     Kelvin, 1862 : la meilleure réaction chimique, sur toute la masse du Soleil, « would only
 *     generate about 3,000 years' heat » ; contraction : 30 millions d'années ; âge du Soleil
 *     4,6 milliards d'années (datation des météorites) ; Aston, 1920 : quatre noyaux d'hydrogène
 *     sont plus lourds qu'un noyau d'hélium ; Eddington, discours de 1920 : environ 0,7 % de la
 *     masse, « about a 100 billion years ». Lu dans le PDF, p. 4, 5 et 7.
 *  6. [V] L☉ = 3,828 × 10²⁶ W (UAI, résolution B3, 2015), M☉ = 1,988 416 × 10³⁰ kg (nominale) :
 *     https://en.wikipedia.org/wiki/Solar_luminosity et /Solar_mass (lus).
 *  7. [V] Meitner et Frisch, Kungälv, Noël 1938 ; les deux noyaux de la fission pèsent « about
 *     one-fifth the mass of a proton » de moins, soit « 200 MeV » ; Hahn et Strassmann ont trouvé
 *     du baryum dans l'uranium bombardé de neutrons : https://en.wikipedia.org/wiki/Lise_Meitner (lu).
 *  8. [V] NIST Chemistry WebBook, CO₂ (gaz) : ΔfH° = −393,51 kJ·mol⁻¹ (CODATA) : environ 4,08 eV par
 *     molécule formée à partir du carbone et du dioxygène (https://webbook.nist.gov/cgi/cbook.cgi?ID=C124389).
 *  9. [V] OMS, aide-mémoire « Ionizing radiation and health effects » (27 juillet 2023) :
 *     exposition interne (inhalation, ingestion) qui cesse quand le radionucléide est éliminé ;
 *     irradiation externe qui cesse quand la source est écartée ou protégée ; brûlures, syndrome
 *     d'irradiation aiguë à forte dose ; risque accru de cancer à faible dose.
 * 10. [V] Applications : docs/refonte (leçon voisine, radioactivite-outils.js, sources 7 et 8) :
 *     fluor 18 (imagerie TEP), plutonium 238 (sujet 2021 N), iode 131 (sujet 2022 N), carbone 14.
 * 11. [V] Constantes des sujets : N_A = 6,02 × 10²³ mol⁻¹ ; M(²³⁵U) pris égal à 235 g·mol⁻¹.
 * 12. à vérifier (non affiché) : la définition de u (1/12 de la masse d'un atome de ¹²C, brochure
 *     du SI) : la leçon la dit dans sa fiche de mot, avec la valeur en kg de CODATA, sans citation.
 *     Fe ou Ni au sommet de la courbe : AME2020 donne ⁶²Ni (8,7946) devant ⁵⁸Fe (8,7923) et ⁵⁶Fe
 *     (8,7904) : la leçon dit « vers le fer et le nickel ».
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, nucT, outilsScene } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, nucT };

/* ---------- les nombres, à la française ---------- */
/** 0,030 37 ; 1 644,8 ; −17,59 : l'espace fine insécable groupe les chiffres par trois (partie entière dès 4 chiffres, décimales dès 5) */
export function fg(x, d = 2) {
  const s = Math.abs(x).toFixed(d), [i, f = ""] = s.split(".");
  const I = i.length >= 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, NB) : i;
  const F = f.length >= 5 ? f.replace(/(\d{3})(?=\d)/g, "$1" + NB) : f;
  return (x < 0 && Number(s) !== 0 ? "−" : "") + I + (F ? "," + F : "");
}
/** le même nombre pour KaTeX : 0{,}030\,37 */
export const TG = (x, d = 2) => fg(x, d).replace(/,/g, "{,}").replace(new RegExp(NB, "g"), "\\,").replace("−", "-");
/** un exposant de 10 dans un texte de scène : 1,971 820 × 10^{5} */
export const sciG = (m, e, d = 6) => `${fg(m, d)} × 10^{${e}}`;
/** la même chose pour le panneau (HTML) */
export const sciGH = (m, e, d = 6) => `${fg(m, d)} × 10<sup>${e}</sup>`;
/** un nombre de chiffres significatifs donné : 28,3 ; 0,030 4 ; 7,59 */
export function sg(x, n = 3) {
  if (x === 0) return "0";
  const e = Math.floor(Math.log10(Math.abs(x)));
  return fg(x, Math.max(0, n - 1 - e));
}
export const r5 = (x) => Math.round(x * 1e5) / 1e5;

/* ---------- les constantes (sources 1, 2) ---------- */
export const C = 299792458;                       // m·s⁻¹
export const E_CH = 1.602176634e-19;              // C, donc 1 eV = 1,602 176 634 × 10⁻¹⁹ J
export const EV_J = E_CH, MEV_J = E_CH * 1e6;
export const U_KG = 1.66053906892e-27;
export const UMEV = (U_KG * C * C) / MEV_J;       // 1 u·c² en MeV, calculé : 931,494 10 (CODATA : 931,494 103 72)
export const UMEV_CODATA = 931.49410372;
export const F931 = 931.5;
export const U_SUJETS = [[931.41, "2020"], [931.49, "2025"], [931.5, "2022"]];   // 1 u en MeV/c², tel qu'imprimé dans les sujets (source 4)                        // le facteur des énoncés (931,5 ; 931,49 ; 931,41 selon le sujet)
export const MP_X = 1.0072764665789, MN_X = 1.00866491606, ME_X = 5.485799090441e-4;
export const MHE_X = 4.001506179129, MD_X = 2.013553212544, MT_X = 3.01550071597;
export const NA = 6.02e23;                        // mol⁻¹, valeur des sujets
export const AN_S = 365.25 * 86400;
/* les masses de la leçon, arrondies à cinq décimales comme dans un énoncé : l'élève refait le calcul à la calculatrice */
export const MP = r5(MP_X), MN = r5(MN_X), ME = r5(ME_X), MHE = r5(MHE_X), MD = r5(MD_X), MT = r5(MT_X);

/* ---------- les nucléides réels (source 3) : masse atomique en u, énergie de liaison par nucléon en keV ---------- */
export const NUCL = {
  "2H": { Z: 1, A: 2, X: "H", u: 2.014101777844, ba: 1112.2831 },        // sert à un seul leurre calculé (jamais affiché : décision du relecteur)
  "3He": { Z: 2, A: 3, X: "He", u: 3.01602932197, ba: 2572.68044 },
  "4He": { Z: 2, A: 4, X: "He", u: 4.00260325413, ba: 7073.9156 },
  "3H": { Z: 1, A: 3, X: "H", u: 3.01604928132, ba: 2827.2654 },
  "6Li": { Z: 3, A: 6, X: "Li", u: 6.01512288742, ba: 5332.3312 },
  "7Li": { Z: 3, A: 7, X: "Li", u: 7.01600343426, ba: 5606.4401 },
  "12C": { Z: 6, A: 12, X: "C", u: 12.0, ba: 7680.1446 },
  "16O": { Z: 8, A: 16, X: "O", u: 15.99491461926, ba: 7976.2072 },
  "40Ca": { Z: 20, A: 40, X: "Ca", u: 39.96259085, ba: 8551.3046 },
  "56Fe": { Z: 26, A: 56, X: "Fe", u: 55.934935537, ba: 8790.3563 },
  "62Ni": { Z: 28, A: 62, X: "Ni", u: 61.928344753, ba: 8794.5555 },
  "92Kr": { Z: 36, A: 92, X: "Kr", u: 91.926173092, ba: 8512.675 },
  "94Sr": { Z: 38, A: 94, X: "Sr", u: 93.915355641, ba: 8593.8344 },
  "95Zr": { Z: 40, A: 95, X: "Zr", u: 94.908040276, ba: 8643.5924 },
  "112Te": { Z: 52, A: 112, X: "Te", u: 111.916727848, ba: 8400.6527 },
  "131I": { Z: 53, A: 131, X: "I", u: 130.906126375, ba: 8422.2977 },
  "131Xe": { Z: 54, A: 131, X: "Xe", u: 130.90508412808, ba: 8423.7367 },
  "138Te": { Z: 52, A: 138, X: "Te", u: 137.929472452, ba: 8252.5786 },
  "140Xe": { Z: 54, A: 140, X: "Xe", u: 139.921645814, ba: 8290.8875 },
  "141Ba": { Z: 56, A: 141, X: "Ba", u: 140.914403653, ba: 8326.0774 },
  "206Pb": { Z: 82, A: 206, X: "Pb", u: 205.97446521, ba: 7875.362 },
  "208Pb": { Z: 82, A: 208, X: "Pb", u: 207.976652005, ba: 7867.453 },
  "210Po": { Z: 84, A: 210, X: "Po", u: 209.982873686, ba: 7834.3462 },
  "218Po": { Z: 84, A: 218, X: "Po", u: 218.008971234, ba: 7731.53 },
  "222Rn": { Z: 86, A: 222, X: "Rn", u: 222.017576017, ba: 7694.4991 },
  "234Th": { Z: 90, A: 234, X: "Th", u: 234.043599801, ba: 7596.8557 },
  "235U": { Z: 92, A: 235, X: "U", u: 235.043928117, ba: 7590.9151 },
  "238U": { Z: 92, A: 238, X: "U", u: 238.050786936, ba: 7570.1262 },
};
export const nuc = (k) => NUCL[k];
/** masse du noyau, en u : masse de l'atome moins Z masses d'électron (source 3) */
export const mNoyau = (k) => NUCL[k].u - NUCL[k].Z * ME_X;
/** défaut de masse, en u : Δm = Z m_p + (A − Z) m_n − m(noyau) */
export const defaut = (k) => NUCL[k].Z * MP_X + (NUCL[k].A - NUCL[k].Z) * MN_X - mNoyau(k);
/** énergie de liaison, en MeV, par le défaut de masse (la route du cours) */
export const EL = (k) => defaut(k) * UMEV;
/** énergie de liaison par nucléon, en MeV : la colonne de l'AME2020 */
export const ELA = (k) => NUCL[k].ba / 1000;
/** énergie de liaison totale d'après l'AME2020 : A × E_ℓ/A */
export const ELT = (k) => NUCL[k].A * ELA(k);
/** « ⁵⁶Fe » pour KaTeX */
export const texN = (k) => nucT(NUCL[k].A, NUCL[k].Z, NUCL[k].X);

/* ---------- ⁴He, ²H, ³H : le fil de la leçon ---------- */
export const EL_HE = (2 * MP_X + 2 * MN_X - MHE_X) * UMEV;     // 28,296 MeV
export const EL_H2 = (MP_X + MN_X - MD_X) * UMEV;              // jamais affichée hors du sujet 2023 (décision du relecteur)
export const EL_H3 = (MP_X + 2 * MN_X - MT_X) * UMEV;
export const M_SEP_HE = r5(2 * MP + 2 * MN);                   // 4,031 88 u : 2 p + 2 n séparés (valeurs arrondies de la leçon)
export const DM_HE = r5(M_SEP_HE - MHE);                       // 0,030 37 u
export const PART_HE = (2 * MP_X + 2 * MN_X - MHE_X) / (2 * MP_X + 2 * MN_X);   // 0,00753 : la part de masse qui manque
/** ²H + ³H → ⁴He + n, par les masses de la leçon (arrondies) */
export const DT = {
  mReac: r5(MD + MT), mProd: r5(MHE + MN),
  get dm() { return r5(this.mProd - this.mReac); },
  get de() { return this.dm * F931; },
};
/** la même réaction par les masses exactes de CODATA, et par les énergies de liaison */
export const DE_DT_X = (MHE_X + MN_X - MD_X - MT_X) * UMEV;      // −17,589 MeV
export const DE_DT_EL = EL_H2 + EL_H3 - EL_HE;                   // le même nombre, par la route des E_ℓ
export const E_REAC_DT = EL_H2 + EL_H3;                          // 10,71 MeV : sert à placer un niveau, jamais écrit

/* 4 ¹H → ⁴He + 2 e⁺ (masses de noyaux) */
export const SOLEIL = {
  dm: r5(MHE + 2 * ME - 4 * MP),                                 // −0,026 51 u
  get de() { return this.dm * F931; },                           // −24,69 MeV
  get part() { return -this.dm / r5(4 * MP); },                  // 0,658 %
  dmSans: r5(MHE - 4 * MP),                                      // sans les positons : le leurre
  get deSans() { return this.dmSans * F931; },
};
export const DE_SOLEIL_X = (MHE_X + 2 * ME_X - 4 * MP_X) * UMEV;
export const PART_SOLEIL = -(MHE_X + 2 * ME_X - 4 * MP_X) / (4 * MP_X);
/** l'écart d'Aston : quatre protons contre un noyau d'hélium */
export const ASTON = { m4p: r5(4 * MP), mHe: MHE, get ecart() { return this.m4p - this.mHe; }, get part() { return this.ecart / this.m4p; } };

/* ---------- le Soleil (sources 5, 6) ---------- */
export const L_SOL = 3.828e26, M_SOL = 1.988416e30;               // W ; kg
export const AGE_SOLEIL = 4.6e9, KELVIN_CHIMIE = 3000, KELVIN_GRAVITE = 3e7;   // ans
/** la durée pendant laquelle une part `part` de la masse du Soleil, changée en énergie, alimente sa puissance, en années */
export const dureeSoleil = (part) => (part * M_SOL * C * C) / L_SOL / AN_S;
export const DUREE_100 = dureeSoleil(PART_SOLEIL);               // environ 9,7 × 10¹⁰ ans
export const FOIS_KELVIN = DUREE_100 / KELVIN_CHIMIE;           // plus de dix millions de fois
/** 1 g de matière : E = mc² en joules */
export const E_1G = 1e-3 * C * C;

/* ---------- la fission de l'uranium 235 (sources 3, 7) ---------- */
export const FISSION = {
  n: 2,                                                           // 1 + 235 = 94 + 140 + 2
  get elP() { return ELT("235U"); }, get elF1() { return ELT("94Sr"); }, get elF2() { return ELT("140Xe"); },
  get lib() { return this.elF1 + this.elF2 - this.elP; },         // environ 184,6 MeV
};
export const M_PROTON_U = MP_X;
export const CINQUIEME = 0.2 * MP_X * UMEV;                       // 0,2 m_p c² ≈ 188 MeV : « environ 200 MeV » chez Meitner et Frisch
export const N_GRAMME = (1 / 235) * NA;                           // noyaux d'uranium 235 dans 1 g
export const E_GRAMME_J = N_GRAMME * 185 * MEV_J;                 // à 185 MeV par fission : environ 7,6 × 10¹⁰ J
export const E_CARBONE_EV = (393.51e3 / NA) / EV_J;               // source 8 : environ 4,08 eV par molécule de CO₂
export const FOIS_CHIMIE = (185e6) / E_CARBONE_EV;                // quarante millions de fois

/* ---------- les sujets (source 4) : valeurs imprimées, à ne citer qu'avec le sujet ---------- */
/** sujet 2020 N, Exercice III, Q2 : niveaux imprimés 1,971 820 × 10⁵ ; 1,955 372 × 10⁵ ; 1,955 318 × 10⁵ MeV, écrits ici en entiers (unités de 0,1 MeV) pour éviter l'erreur des flottants */
export const S20 = {
  nuc: 1971820, po: 1955372, pb: 1955318,
  u: 931.41, uKg: 1.66e-27,
  get eLib() { return (this.po - this.pb) / 10; },               // 5,4 MeV
  get elPo() { return (this.nuc - this.po) / 10; },              // 1 644,8 MeV
  get elProd() { return (this.nuc - this.pb) / 10; },            // 1 650,2 MeV
  get dmU() { return this.elPo / this.u; },                      // 1,7659 u
  get dmKg() { return this.dmU * this.uKg; },                    // 2,93 × 10⁻²⁷ kg
};
/** sujet 2023 N, Exercice 2, §2 : E_ℓ en MeV (2,366 est la donnée du sujet) */
export const S23 = { h2: 2.366, h3: 8.475, he: 28.296,
  get lib() { return Math.abs(this.h2 + this.h3 - this.he); },   // 17,455 MeV
  get tout() { return this.h2 + this.h3 + this.he; },
  get parA() { return Math.abs(this.h2 / 2 + this.h3 / 3 - this.he / 4); },
  ela: { h2: 2.366 / 2, h3: 8.475 / 3 } };
/** sujet 2019 N, Exercice II, partie 2 : E_ℓ/A en MeV/nucléon */
export const S19 = { he: 7.07, rn: 7.69, po: 7.73,
  get elHe() { return 4 * this.he; }, get elRn() { return 222 * this.rn; }, get elPo() { return 218 * this.po; },
  get lib() { return this.elPo + this.elHe - this.elRn; },       // 6,24 MeV
  get faux1() { return this.po + this.he - this.rn; },           // 7,11 : E_ℓ/A additionnées
  get faux2() { return this.elPo + this.elHe + this.elRn; } };   // 3 420,6 : tout additionné

/* ---------- la courbe d'Aston : quinze noyaux, rangés par A (source 3) ---------- */
export const ASTON_NOYAUX = ["3He", "4He", "6Li", "7Li", "12C", "16O", "40Ca", "56Fe", "62Ni", "92Kr", "94Sr", "140Xe", "208Pb", "235U", "238U"];
export const POINT_FANTOME = "112Te";                             // 2 ¹⁻⁵⁶Fe → A = 112, Z = 52

/* ---------- les nucléides du bilan en α, β, fusion, fission (exercices 9, 11) ---------- */
export const ALPHA = { "210Po": ["206Pb", "4He"], "222Rn": ["218Po", "4He"], "238U": ["234Th", "4He"] };
/** ΔE, en MeV, d'une réaction : Σ m(produits) − Σ m(réactifs), masses de noyaux, c² = 931,5 MeV/u (négatif si de l'énergie est libérée) */
export function bilan(reactifs, produits, f = UMEV) {
  const m = (L) => L.reduce((s, k) => s + (k === "n" ? MN_X : k === "e+" ? ME_X : k === "e-" ? ME_X : mNoyau(k)), 0);
  return (m(produits) - m(reactifs)) * f;
}

/* ---------- les outils de scène de cette leçon : ceux de la leçon voisine, avec des tailles de plus ---------- */
const TAILLE = { "t-titre": 18, "t-sous": 16, "t-lab": 18, "rd-fort": 18, "t-cle": 26, "rd-ind": 16, "nx-n": 28, "nx-v": 26, "nx-a": 25, "nx-t": 22, "nx-g": 28 };
export function outilsNoyaux(ctx) {
  const { E } = ctx;
  const base = outilsScene(ctx);
  const ty = (s) => ctx.ty(s).replace(/ %/g, NB + "%");
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
  const taille = (cls) => { for (const c of String(cls).split(/\s+/)) if (TAILLE[c]) return TAILLE[c]; return 18; };
  function fx(parent, x, y, str, cls, anchor) {
    const t = E("text", { x, y, class: cls, "text-anchor": anchor || "start" }, parent);
    t.__fs = taille(cls); fxFill(t, ty(str)); return t;
  }
  function setFx(t, str) { const s = ty(str); if (t.__s !== s) fxFill(t, s); }
  function titre(g, t, s, x = 500) {
    const T = fx(g, x, 64, t || "", "t-titre s-ink", "middle"), S = fx(g, x, 92, s || "", "t-sous", "middle");
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  return { ...base, fx, setFx, titre };
}
