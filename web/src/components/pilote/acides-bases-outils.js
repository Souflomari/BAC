/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « État d’équilibre, acides et bases en solution » (V3, route /pilote/acides-bases) :
 * les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n’est écrit à la main : il vient de ce fichier (donnée sourcée, ou
 * valeur CALCULÉE à partir d’elle). Les scènes, le script et les gabarits d’exercices importent d’ici. Les
 * outils de formatage et de scène de `radioactivite-outils.js` sont repris tels quels (fonctions sans
 * contenu de leçon).
 *
 * SOURCES : [V] lu sur la source citée ; « choix d’auteur » : valeur de la leçon, pas une donnée ;
 * « à vérifier » : non affiché comme un fait.
 *
 *  1. [V] Sujet PC 2022, session normale (NS 28F), Exercice 1, partie 2, §1, questions 1.3 (0,75 pt) et
 *     1.4 (0,5 pt) : C_a = 5 × 10⁻² mol·L⁻¹, pH = 3,1, acide propanoïque. docs/sujets/pc/reactions-acido-basiques.md.
 *  2. [V] Sujet PC 2020, session normale (NS 28F), Exercice I, partie 1, §1.4 (tableau d’indicateurs :
 *     hélianthine 3,1–4,4 ; rouge de méthyle 4,2–6,2 ; phénolphtaléine 8,2–10) et §2, questions 2.2 (0,75 pt),
 *     2.3 (0,5 pt), 2.4 (0,5 pt), 2.5 (0,5 pt) : C_b = 10⁻² mol·L⁻¹, pH = 10,6, K_e = 10⁻¹⁴ à 25 °C,
 *     Q_r,éq = 1,65 × 10⁻⁵. Même exercice, partie 2 : pile argent-chrome (Ag⁺, Cr³⁺, Ag, Cr), docs/sujets/pc/piles.md.
 *  3. [V] Sujet PC 2012, session normale (NS 28), 1ʳᵉ partie : CH₃COOH + NH₃, pK_A1 = 4,8, pK_A2 = 9,2,
 *     n₁ = n₂ = 10⁻³ mol, 1-1 (0,5 pt), 1-2 (1 pt), 1-3 (1 pt) ; 2ᵉ partie : Zn(s) + Cu²⁺(aq) ⇄ Zn²⁺(aq) + Cu(s).
 *     docs/sujets/pc/transformations-deux-sens.md, docs/sujets/pc/evolution-spontanee.md.
 *  4. [V] Sujet PC 2021, session normale (NS 28F), Exercice I, partie 2, §2 : C_a = 0,10 mol·L⁻¹, pH = 2,88,
 *     τ ≈ 1,32 %, Q_r,éq ≈ 1,77 × 10⁻⁵ ; tableau des pK_A : HCOOH 3,75 ; C₆H₅COOH 4,2 ; CH₃COOH 4,75 ;
 *     C₂H₅COOH 4,9. docs/sujets/pc/reactions-acido-basiques.md.
 *  5. [V] Sujet PC 2023, session normale (NS 28F), Exercice 1 : §1 C_A = 5 × 10⁻² mol·L⁻¹, pH = 3,05,
 *     pK_A1 ≃ 4,79 ; §2 réaction CH₃COOH + HCOO⁻ (V₂ = V₁, C_B = C_A), pK_A2 = 3,75, 2.1 (0,75 pt),
 *     2.2 (0,75 pt), 2.3 (0,5 pt). docs/sujets/pc/etat-equilibre.md, docs/sujets/pc/reactions-acido-basiques.md.
 *  6. [V] Sujet PC 2015, session normale, §1 : C = 10 mol·m⁻³ = 1,0 × 10⁻² mol·L⁻¹, τ = 0,072 ;
 *     Sujet PC 2018, session normale : acide lactique K_A = 10^(−3,9), B.B.T zone 6–7,6 ;
 *     Sujet PC 2019, session normale : C = 10⁻³ mol·L⁻¹, σ = 8,6 × 10⁻³ S·m⁻¹ (τ ≈ 0,225) ;
 *     Sujet PC 2024, session normale, 5-1 : établir pK_A en fonction du pH et de [AH]_éq, [A⁻]_éq ;
 *     Sujet PC 2025, session normale : HSO₃⁻/SO₃²⁻, pK_A = 7,2.
 *  7. [V] Cadre officiel 2025 : pc-pc.yaml l. 417-443, 526-527 ; pc-sm.yaml l. 432-458, 540 ; pc-svt.yaml l. 338-364
 *     (le cadre SVT porte le diagramme de prédominance, sans le diagramme de distribution).
 *  8. [V] Hélianthine : rouge sous 3,1, jaune au-dessus de 4,4, pK_A ≈ 3,47 à 25 °C (affiché ≈ 3,5),
 *     Wikipédia « Methyl orange » (lu le 2026-11-25). BBT : jaune / bleue ; phénolphtaléine : incolore / rose,
 *     Wikipédia « pH indicator » (lu le 2026-11-25) ; zones affichées = celles des sujets 2018 et 2020.
 *  9. [V] Guldberg et Waage, 1864 : à l’équilibre, un même rapport des concentrations se retrouve, et
 *     l’équilibre est dynamique. Wikipédia « Law of mass action » (lu le 2026-11-25).
 * 10. [V] Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer aux
 *     applications numériques. » (docs/refonte/01-programme-bac-maroc.md §3.3).
 * 11. Choix d’auteur : trois flacons d’acide éthanoïque (10⁻¹, 10⁻², 10⁻³ mol·L⁻¹), pH calculés depuis
 *     pK_A = 4,79 caché ; pK_A affiché 4,8 à partir de la partie 5 ; [HO⁻] = 2,0 × 10⁻³ mol·L⁻¹ (`ho-ph`) ;
 *     mélange de pH 6,0 (`predom`) présenté comme donnée d’énoncé.
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene, mulberry32 } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene, mulberry32 };

/* ---------- constantes et couples sourcés ---------- */
export const PKA_CACHE = 4.79;                              // source 5 : sert au calcul des pH des parties 2 et 3
export const KA_CACHE = 10 ** -PKA_CACHE;                   // 1,622 × 10⁻⁵
export const PKA = {
  ethan: 4.8,                                               // source 3 (affiché dans la leçon)
  ethan21: 4.75,                                            // source 4 (tableau 2021, exercices)
  ethan23: 4.79,                                            // source 5 (sujet 2023)
  metha: 3.75,                                              // sources 4, 5
  lact: 3.9,                                                // source 6 (2018)
  benzo: 4.2,                                               // source 4
  propan: 4.9,                                              // source 4 (tableau 2021)
  hso3: 7.2,                                                // source 6 (2025)
  nh4: 9.2,                                                 // source 3 (2012)
  hel: 3.5,                                                 // source 8 (3,47 arrondi à 3,5)
};
export const TEMP_C = 25;                                   // °C
export const PKE = 14;
export const KE = 10 ** -PKE;                               // 1,0 × 10⁻¹⁴ à 25 °C
export const PH_NEUTRE = PKE / 2;                           // 7
export const H_NEUTRE = 10 ** -PH_NEUTRE;                   // 1,0 × 10⁻⁷ mol·L⁻¹
export const PH_AXE_MIN = 0, PH_AXE_MAX = 14;
export const CENT_PCT = 100, DEMI_PCT = 50;

export const COUPLES_AXE = {
  ethan: { acide: "CH_{3}COOH", base: "CH_{3}COO^{−}", nom: "CH₃COOH / CH₃COO⁻", pka: PKA.ethan },
  metha: { acide: "HCOOH", base: "HCOO^{−}", nom: "HCOOH / HCOO⁻", pka: PKA.metha },
  benzo: { acide: "C_{6}H_{5}COOH", base: "C_{6}H_{5}COO^{−}", nom: "C₆H₅COOH / C₆H₅COO⁻", pka: PKA.benzo },
  hel: { acide: "HIn", base: "In^{−}", nom: "hélianthine (HIn / In⁻)", pka: PKA.hel },
  bbt: { acide: "HIn", base: "In^{−}", nom: "BBT", pka: 7.0 },
  phph: { acide: "HIn", base: "In^{−}", nom: "phénolphtaléine", pka: 9.1 },
};

export const INDICATEURS = {
  hel: { id: "hel", nom: "l’hélianthine", court: "hélianthine", pka: PKA.hel, zone: [3.1, 4.4], acide: "rouge", base: "jaune", entre: "teinte intermédiaire" },
  bbt: { id: "bbt", nom: "le BBT", court: "BBT", pka: 7.0, zone: [6.0, 7.6], acide: "jaune", base: "bleue", entre: "teinte intermédiaire" },
  phph: { id: "phph", nom: "la phénolphtaléine", court: "phénolphtaléine", pka: 9.1, zone: [8.2, 10.0], acide: "incolore", base: "rose", entre: "teinte intermédiaire" },
};
export function teinteInd(id, ph) {
  const ind = INDICATEURS[id] || INDICATEURS.hel;
  if (ph < ind.zone[0] - 1e-9) return { mot: ind.acide, zone: -1 };
  if (ph > ind.zone[1] + 1e-9) return { mot: ind.base, zone: 1 };
  return { mot: ind.entre, zone: 0 };
}

/* ---------- relations chimiques pures ---------- */
export const hDe = (pH) => 10 ** -pH;
export const phDe = (h) => -Math.log10(h);
export const hoDePh = (pH) => 10 ** (pH - PKE);
export const phDeHo = (ho) => PKE + Math.log10(ho);
/** [H₃O⁺]_éq d'un acide faible seul dans l'eau : x² / (C − x) = K_A */
export const hFinal = (C, pka) => { const K = 10 ** -pka; return (-K + Math.sqrt(K * K + 4 * K * C)) / 2; };
/** [HO⁻]_éq d'une base faible seule dans l'eau : x² / (C − x) = K_e / K_A */
export const hoFinalBase = (C, pka) => { const Kb = KE / 10 ** -pka; return (-Kb + Math.sqrt(Kb * Kb + 4 * Kb * C)) / 2; };
export const tauReel = (C, pka) => hFinal(C, pka) / C;
export const phReel = (C, pka) => phDe(hFinal(C, pka));
export const phAff = (C, pka, d = 2) => Number(phReel(C, pka).toFixed(d));
export const phBaseReel = (C, pka) => phDeHo(hoFinalBase(C, pka));
export const phBaseAff = (C, pka, d = 1) => Number(phBaseReel(C, pka).toFixed(d));
export const tauDePh = (C, pH) => hDe(pH) / C;
export const qrDePh = (C, pH) => { const h = hDe(pH); return (h * h) / (C - h); };
export const kaDeTau = (C, tau) => (C * tau * tau) / (1 - tau);
export const rapCouple = (pH, pka) => 10 ** (pH - pka);
export const partBase = (pH, pka) => 1 / (1 + 10 ** (pka - pH));
export const partAcide = (pH, pka) => 1 - partBase(pH, pka);
export const kDeuxCouples = (pka1, pka2) => 10 ** (pka2 - pka1);
export const tauEquimol = (K) => Math.sqrt(K) / (1 + Math.sqrt(K));

/* ---------- Partie 0 : Ce qu'il faut savoir ---------- */
export const SAV_LOG = { x: 1.0e-5, exp: 5 };
SAV_LOG.rep = -Math.log10(SAV_LOG.x);                       // 5
SAV_LOG.fauxSigne = Math.log10(SAV_LOG.x);                  // −5
SAV_LOG.fauxPuiss = 10 ** SAV_LOG.exp;                      // 10⁵

/* ---------- Partie 1 : L'énigme ---------- */
export const ENIGME = {
  phHcl: 1.0,
  phSoude: 13.0,
  phFlacon: 5.0,
  phMin: 1.0,
  phMax: 6.0,
  zoneBas: INDICATEURS.hel.zone[0],
  zoneHaut: INDICATEURS.hel.zone[1],
  vers: 4,
};

/* ---------- Parties 2 et 3 : Q_r, les trois flacons et la dilution ---------- */
export const C_TRIO = [1.0e-1, 1.0e-2, 1.0e-3];
export const C0 = C_TRIO[1];                                // 1,0 × 10⁻² mol·L⁻¹
export const V_ML = 100;
export const F_DIL = 10;
export const PH_TRIO = C_TRIO.map((C) => phAff(C, PKA_CACHE, 2));          // [2,90 ; 3,40 ; 3,92]
export const TAU_TRIO = C_TRIO.map((C, i) => tauDePh(C, PH_TRIO[i]));      // [0,0126 ; 0,0398 ; 0,120]
export const QR_TRIO = C_TRIO.map((C, i) => qrDePh(C, PH_TRIO[i]));        // [1,61e-5 ; 1,65e-5 ; 1,64e-5]

export const QR_VAL = {
  C: C0,
  pH: PH_TRIO[1],                                           // 3,40
  rep: QR_TRIO[1],                                          // 1,65 × 10⁻⁵
  fauxSansCarre: hDe(PH_TRIO[1]) / (C0 - hDe(PH_TRIO[1])),  // 4,15 × 10⁻²
  fauxInverse: 1 / QR_TRIO[1],                              // 6,06 × 10⁴
  restePct: (1 - TAU_TRIO[1]) * 100,                        // 96 %
};
export const COEF_PILE = 3;                                 // 3 Ag⁺(aq) + Cr(s) ⇄ 3 Ag(s) + Cr³⁺(aq)

export const MEME_K = {
  C: C_TRIO[2],                                             // 1,0 × 10⁻³ mol·L⁻¹
  pH: PH_TRIO[2],                                           // 3,92
  rep: QR_TRIO[2],                                          // 1,64 × 10⁻⁵
  fauxIntact: hDe(PH_TRIO[2]) ** 2 / C_TRIO[2],             // 1,45 × 10⁻⁵ ([AH]_éq pris égal à C)
  fauxSansCarre: hDe(PH_TRIO[2]) / (C_TRIO[2] - hDe(PH_TRIO[2])), // 1,37 × 10⁻¹
};

/* ---------- Le modèle de la loupe et des trois courbes Q_r(tic) ---------- */
export const NM = 100;
export const PD = 0.01;
export const TICS = 30;
export const TICS_TRIO = 45;
export const TAU_ETH_REEL = tauReel(C0, PKA_CACHE);         // 3,947 %
export const R_EQ = (NM * TAU_ETH_REEL ** 2) / (1 - TAU_ETH_REEL); // 0,1622
export const KREP = PD / R_EQ;                              // 0,06166
export const CAP_REPRISE = 0.5;
export const probReprise = (n, vol) => Math.min(CAP_REPRISE, (KREP * n) / vol);
export const nPalier = (vol) => { const b = R_EQ * vol, c = -R_EQ * vol * NM; return (-b + Math.sqrt(b * b - 4 * c)) / 2; };

export function simuler(graine, pd, krep, tics = TICS) {
  const rng = mulberry32(graine);
  let s = new Uint8Array(NM);
  const compte = (a) => a.reduce((x, v) => x + v, 0);
  const etats = [s.slice()], fwd = [[]], bwd = [[]], n = [0];
  for (let k = 0; k < tics; k++) {
    const nk = compte(s), p = probReprise(nk, 1);
    const f = [], b = [], t = s.slice();
    for (let i = 0; i < NM; i++) {
      const r = rng();
      if (s[i] === 0 && r < pd) { t[i] = 1; f.push(i); }
      else if (s[i] === 1 && r < p) { t[i] = 0; b.push(i); }
    }
    s = t; etats.push(s.slice()); fwd.push(f); bwd.push(b); n.push(compte(s));
  }
  return { etats, fwd, bwd, n };
}
export function jetons(S) {
  const dist = (a, b) => Math.hypot((a % 10) - (b % 10), Math.floor(a / 10) - Math.floor(b / 10));
  const tok = [new Uint8Array(NM)], slot = [new Int16Array(NM).fill(-1)];
  for (let k = 1; k < S.etats.length; k++) {
    const t = tok[k - 1].slice(), sl = new Int16Array(NM).fill(-1), pris = new Uint8Array(NM);
    for (const i of S.bwd[k]) {
      let best = -1, bd = Infinity;
      for (let j = 0; j < NM; j++) if (t[j] && !pris[j]) { const d = dist(i, j) + (j === i ? 1000 : 0); if (d < bd) { bd = d; best = j; } }
      if (best >= 0) { t[best] = 0; pris[best] = 1; sl[i] = best; }
    }
    for (const i of S.fwd[k]) {
      let best = -1, bd = Infinity;
      for (let j = 0; j < NM; j++) if (!t[j] && !pris[j]) { const d = dist(i, j); if (d < bd) { bd = d; best = j; } }
      if (best >= 0) { t[best] = 1; pris[best] = 1; sl[i] = best; }
    }
    tok.push(t); slot.push(sl);
  }
  return { tok, slot };
}
export const SEED_ETH = 2929;
export const SERIE = Object.assign(simuler(SEED_ETH, PD, KREP, TICS), {});
Object.assign(SERIE, jetons(SERIE));

/** Courbe lisse n(tic) et Q_r(tic) dans un bécher de volume relatif `vol` (0,1 ; 1 ; 10) */
export function serieLisse(vol, tics = TICS_TRIO, nDepart = 0) {
  const a = [nDepart], sub = 16, dt = 2 / sub;
  let n = nDepart;
  for (let k = 0; k < tics; k++) {
    for (let j = 0; j < sub; j++) {
      n += dt * ((NM - n) * PD - (KREP * n * n) / vol);
    }
    a.push(n);
  }
  return a;
}
export const qrModele = (n, vol) => ((C0 / NM) * n * n) / ((NM - n) * vol);
export const VOLS_TRIO = [0.1, 1, 10];
export const COURBES_QR = VOLS_TRIO.map((vol) => serieLisse(vol, TICS_TRIO, 0).map((n) => qrModele(n, vol)));
/** La remontée après dilution ×10 du flacon du milieu : part de nPalier(1) dans vol = 10 (où Q_r vaut K/10) */
export const COURBE_REMONTE = serieLisse(F_DIL, 30, nPalier(1)).map((n) => qrModele(n, F_DIL));

/* ---------- Partie 4 : L'eau elle-même ---------- */
export const NAT_EX = { pH: 5.0, h: hDe(5.0), ho: hoDePh(5.0) };
export const HO_PH = { ho: 2.0e-3 };
HO_PH.rep = phDeHo(HO_PH.ho);                               // 11,30
HO_PH.fauxPoh = -Math.log10(HO_PH.ho);                      // 2,70
HO_PH.fauxPlus = PKE - Math.log10(HO_PH.ho);                // 16,70

/* ---------- Partie 5 : La constante d'acidité ---------- */
export const KA_NOM = { ka: 1.6e-5, phC3: 3.4 };
KA_NOM.rep = -Math.log10(KA_NOM.ka);                        // 4,80
KA_NOM.fauxSigne = Math.log10(KA_NOM.ka);                   // −4,80
KA_NOM.fauxExp = 5.0;

export const COMP_ACIDES = [
  { id: "metha", formule: "HCOOH", nom: "acide méthanoïque", pka: PKA.metha },
  { id: "benzo", formule: "C_{6}H_{5}COOH", nom: "acide benzoïque", pka: PKA.benzo },
  { id: "propan", formule: "C_{2}H_{5}COOH", nom: "acide propanoïque", pka: PKA.propan },
].map((a) => {
  const pH = phAff(C0, a.pka, 2);
  return { ...a, C: C0, pH, tau: tauReel(C0, a.pka) };
});

export const S21 = { Ca: 0.10, pH: 2.88, tauPct: 1.32, tau: 0.0132, qrImp: 1.77e-5 };
S21.qr = kaDeTau(S21.Ca, S21.tau);                          // 1,766 × 10⁻⁵ ≈ 1,77 × 10⁻⁵
S21.pka = -Math.log10(S21.qrImp);                           // 4,752

export const COMP_BASES = [
  { id: "nh3", formule: "NH_{3}", couple: "NH₄⁺/NH₃", pka: PKA.nh4, pH: phBaseAff(C0, PKA.nh4, 1) },
  { id: "ethanoate", formule: "CH_{3}COO^{−}", couple: "CH₃COOH/CH₃COO⁻", pka: PKA.ethan, pH: phBaseAff(C0, PKA.ethan, 1) },
];

/* ---------- Partie 6 : Prédominance et distribution ---------- */
export const PREDOM = { pka: PKA.ethan, pH: 6.0 };
PREDOM.rap = rapCouple(PREDOM.pH, PREDOM.pka);              // 15,85 ≈ 16
export const DOM_BORNES = { bas: 4.5, haut: 5.1, exBas: 3.6, exHaut: 6.0 };

export const DIST_1 = { pka: PKA.ethan, pH: 5.8, ecart: 1 };
DIST_1.part = partBase(DIST_1.pH, DIST_1.pka) * 100;        // 90,9 % ≈ 91 %
DIST_1.fauxTout = 100;
DIST_1.fauxLin = 60;
DIST_1.num = 10;
DIST_1.den = 11;

export const CROIS = { pka: PKA.metha, fauxNeutre: 7.0, faux99: 5.8 };

export const PREDOM_DIST = { pka: PKA.ethan, ph1: 4.9, ph2: 7.8 };
PREDOM_DIST.p1 = partBase(PREDOM_DIST.ph1, PREDOM_DIST.pka) * 100; // 55,7 % ≈ 56 %
PREDOM_DIST.p2 = partBase(PREDOM_DIST.ph2, PREDOM_DIST.pka) * 100; // 99,9 %
PREDOM_DIST.fauxTout = 100;
PREDOM_DIST.fauxLin1 = 51;
PREDOM_DIST.fauxLin2 = 80;

/* ---------- Partie 7 : Deux couples face à face ---------- */
export const C12 = { pka1: PKA.ethan, pka2: PKA.nh4, n: 1.0e-3, bareme: [0.5, 1, 1] };
C12.K = kDeuxCouples(C12.pka1, C12.pka2);                   // 2,51 × 10⁴
C12.fauxInv = kDeuxCouples(C12.pka2, C12.pka1);             // 3,98 × 10⁻⁵
C12.fauxDelta = C12.pka2 - C12.pka1;                        // 4,4
C12.racK = Math.sqrt(C12.K);                                // 158,5
C12.tau = tauEquimol(C12.K);                                // 0,9937 ≈ 0,99
C12.fauxDemi = 0.50;
C12.fauxInvRac = 1 / C12.racK;                              // 6,31 × 10⁻³

export const K_PROCHES = { pka1: PKA.ethan, pka2: PKA.benzo };
K_PROCHES.K = kDeuxCouples(K_PROCHES.pka1, K_PROCHES.pka2); // 0,251
K_PROCHES.tau = tauEquimol(K_PROCHES.K);                    // 0,334

export const MELANGE = {
  pka1: PKA.ethan,
  pka2: PKA.benzo,
  rep: (PKA.ethan + PKA.benzo) / 2,                         // 4,5
  fauxDiff: (PKA.ethan - PKA.benzo) / 2,                    // 0,3
  fauxSomme: PKA.ethan + PKA.benzo,                         // 9,0
};

/* ---------- Parties 8 et 9 : Indicateurs et retour ---------- */
export const PH_TRANSFERT = 7.5;

/* ---------- Partie 10 : Au bac (2022 N et 2020 N) ---------- */
export const S22 = { Ca: 5e-2, pH: 3.1, bareme: [0.75, 0.5] };
S22.h = hDe(S22.pH);                                        // 7,94 × 10⁻⁴
S22.qr = qrDePh(S22.Ca, S22.pH);                            // 1,28 × 10⁻⁵
S22.pka = -Math.log10(S22.qr);                              // 4,89
S22.fauxSigne = -S22.pka;                                   // −4,89

export const S20 = { Cb: 1.0e-2, pH: 10.6, bareme: [0.75, 0.5, 0.5, 0.5], qrImp: 1.65e-5 };
S20.ho = hoDePh(S20.pH);                                    // 3,98 × 10⁻⁴
S20.fauxH3o = hDe(S20.pH);                                  // 2,51 × 10⁻¹¹
S20.fauxSurPh = KE / S20.pH;                                // 9,43 × 10⁻¹⁶
S20.tau = S20.ho / S20.Cb;                                  // 3,98 × 10⁻²
S20.fauxTauH = S20.fauxH3o / S20.Cb;                        // 2,51 × 10⁻⁹
S20.fauxTauInv = S20.Cb / S20.ho;                           // 25,1
S20.qr = (S20.ho ** 2) / (S20.Cb - S20.ho);                 // 1,65 × 10⁻⁵
S20.ka = KE / S20.qr;                                       // 6,06 × 10⁻¹⁰
S20.pka = -Math.log10(S20.ka);                              // 9,22
S20.fauxPkaQr = -Math.log10(S20.qr);                        // 4,78

/* ---------- Partie 11 : Bilan et autres sujets pour les exercices ---------- */
export const Q1_23 = { pka1: PKA.ethan23, pka2: PKA.metha };
Q1_23.K = kDeuxCouples(Q1_23.pka1, Q1_23.pka2);             // 9,12 × 10⁻²
Q1_23.fauxInv = kDeuxCouples(Q1_23.pka2, Q1_23.pka1);       // 10,96 ≈ 11

export const Q2_COMP = { kaBenzo: 6.3e-5, pkaEthan: PKA.ethan };
Q2_COMP.pkaBenzo = -Math.log10(Q2_COMP.kaBenzo);            // 4,20

export const S23 = { CA: 5e-2, pH: 3.05, pka1: 4.79, pka2: 3.75 };
S23.qr = qrDePh(S23.CA, S23.pH);
S23.pka = -Math.log10(S23.qr);
S23.K2 = kDeuxCouples(S23.pka1, S23.pka2);
S23.phMel = (S23.pka1 + S23.pka2) / 2;

export const S15 = { C: 1.0e-2, tau: 0.072 };
S15.qr = kaDeTau(S15.C, S15.tau);                           // 5,59 × 10⁻⁵
S15.pka = -Math.log10(S15.qr);                              // 4,25

export const S19 = { C: 1.0e-3, tau: 0.225 };
S19.qr = kaDeTau(S19.C, S19.tau);                           // 6,53 × 10⁻⁵
S19.pka = -Math.log10(S19.qr);                              // 4,19

/* ---------- Contrôles au montage : le modèle et les paliers tombent juste ---------- */
export const VERIF_DEFAUTS = (() => {
  const f = [];
  VOLS_TRIO.forEach((vol, i) => {
    const qPal = qrModele(nPalier(vol), vol);
    if (Math.abs(qPal - KA_CACHE) / KA_CACHE > 1e-6) f.push(`palier analytique faux pour vol=${vol}`);
    const qFin = COURBES_QR[i][TICS_TRIO];
    if (Math.abs(qFin - KA_CACHE) / KA_CACHE > 0.01) f.push(`courbe ${i} loin de K au tic ${TICS_TRIO} (${qFin})`);
  });
  if (Math.abs(COURBE_REMONTE[0] - KA_CACHE / F_DIL) / (KA_CACHE / F_DIL) > 1e-6) f.push("chute initiale ≠ K/10");
  if (Math.abs(COURBE_REMONTE[30] - KA_CACHE) / KA_CACHE > 0.01) f.push("remontée après dilution loin de K");
  if (SERIE.n[30] !== 4) f.push(`loupe : compte au tic 30 = ${SERIE.n[30]}`);
  return f;
})();

/* ---------- Lignes des copies des scènes `bac` ---------- */
export const COPIE_22 = [
  "*Q*_{r,éq} = [C_{2}H_{5}COO^{−}]_{éq} [H_{3}O^{+}]_{éq} / [C_{2}H_{5}COOH]_{éq}",
  "[C_{2}H_{5}COO^{−}]_{éq} = [H_{3}O^{+}]_{éq}   et   [C_{2}H_{5}COOH]_{éq} = *C*_{a} − [H_{3}O^{+}]_{éq}",
  "*Q*_{r,éq} = [H_{3}O^{+}]_{éq}^{2} / (*C*_{a} − [H_{3}O^{+}]_{éq})",
  `[H_{3}O^{+}]_{éq} = 10^{−${fr(S22.pH, 1)}} ≈ ${sciF(S22.h, 1)} mol·L^{−1}   ⇒   *Q*_{r,éq} ≈ ${sciF(S22.qr, 2)}`,
  `p*K*_{A} = −log *K*_{A} = −log(${sciF(S22.qr, 2)}) ≈ ${fr(S22.pka, 2)}`,
];
export const COPIE_22_EQ = "C_{2}H_{5}COOH_{(aq)} + H_{2}O_{(l)} ⇄ C_{2}H_{5}COO^{−}_{(aq)} + H_{3}O^{+}_{(aq)}";

export const COPIE_20 = [
  `[HO^{−}]_{éq} = *K*_{e} / [H_{3}O^{+}]_{éq} = 10^{pH − ${PKE}} ≈ ${sciF(S20.ho, 1)} mol·L^{−1}`,
  `*τ* = *x*_{f} / *x*_{max} = [HO^{−}]_{éq} / *C*_{b} ≈ ${sciF(S20.tau, 1)}`,
  `*Q*_{r,éq} = [HO^{−}]_{éq}^{2} / (*C*_{b} − [HO^{−}]_{éq}) ≈ ${sciF(S20.qr, 2)}`,
  `*K*_{A} = *K*_{e} / *Q*_{r,éq} ≈ ${sciF(S20.ka, 1)}   ⇒   p*K*_{A} = −log *K*_{A} ≈ ${fr(S20.pka, 1)}`,
];
export const COPIE_20_EQ = "NH_{3(aq)} + H_{2}O_{(l)} ⇄ NH_{4(aq)}^{+} + HO^{−}_{(aq)}";

/* ---------- Outils de scène adaptés à la leçon ---------- */
export function outilsAb(ctx) {
  const O = outilsScene(ctx);
  const { fx, setFx } = O;
  function lab(parent, x, y, str, cls, anchor, fs = 26) {
    const t = fx(parent, x, y, "", cls, anchor);
    t.__fs = fs; t.__s = null; setFx(t, str);
    return t;
  }
  function titre(g, t, s, x = 500) {
    const T = lab(g, x, 54, t || "", "ab-t s-ink", "middle", 28);
    const S = lab(g, x, 88, s || "", "ab-s s-c", "middle", 24);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  return { ...O, lab, titre };
}
