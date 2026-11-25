/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Transformations non totales » (V3) : les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n'est écrit à la main : il vient de ce fichier (donnée sourcée, ou
 * valeur CALCULÉE à partir d'elle). Les scènes, le script et les gabarits d'exercices importent d'ici. Les
 * outils de formatage et de scène de la leçon sur la décroissance (`radioactivite-outils.js`) sont repris
 * tels quels : des fonctions sans contenu de leçon.
 *
 * SOURCES : [V] lu sur la source citée ; « choix d'auteur » : valeur de la leçon, pas une donnée ;
 * « à vérifier » : à ne pas montrer à un élève avant relecture (rien de tel ne s'affiche comme un fait).
 *
 *  1. [V] Sujet 2022, session normale (NS 28F), Exercice 1, partie 2, §1, questions 1.1 (0,5 pt) et 1.2
 *     (0,75 pt) : C_a = 5 × 10⁻² mol·L⁻¹ ; pH = 3,1 ; acide propanoïque ; aucun volume donné.
 *     docs/sujets/pc/reactions-acido-basiques.md (statut vérifié, quatre passes).
 *  2. [V] Sujet 2023, session normale (NS 28F), Exercice 1, §1, questions 1.1 (0,5 pt), 1.2 (0,75 pt),
 *     1.3 (0,5 pt) : C_A = 5 × 10⁻² mol·L⁻¹ ; pH = 3,05 ; α(CH₃COOH) = [CH₃COOH]éq/([CH₃COOH]éq +
 *     [CH₃COO⁻]éq) ; « montrer que α = 1 − τ » ; pK_A1 ≃ 4,79. docs/sujets/pc/etat-equilibre.md (vérifié).
 *  3. [V] Sujet 2021, session normale, Exercice I, partie 2, §2 : pH = 2,88 ; « montrer que τ ≈ 1,32 % »
 *     (C_a = 0,10 mol·L⁻¹ déduite du dosage : lecture de figure « à confirmer », mais la valeur est
 *     verrouillée par le τ imprimé). docs/sujets/pc/reactions-acido-basiques.md.
 *  4. [V] Sujet 2012, session normale, chimie, 1-3 (1 pt) : acide éthanoïque + ammoniac, équation écrite avec
 *     ⇄ (sens « 1 » et « 2 »), pK_A 4,8 et 9,2, n₁ = n₂ = 10⁻³ mol ; « s'assurer que la transformation est
 *     totale » ; τ ≈ 0,99 CITÉ (son calcul passe par K, chapitre suivant). docs/sujets/pc/transformations-deux-sens.md.
 *  5. [V] Sujet 2020, session normale, chapeau : « L'ammoniac NH₃ est un gaz qui, dissous dans l'eau, donne
 *     une solution basique ». docs/sujets/pc/reactions-acido-basiques.md.
 *  6. [V] Cadre officiel : « taux d'avancement final d'une réaction : τ = x_f / x_max, avec τ ≤ 1 » ; « écriture :
 *     ⇄ (double flèche) » ; « interprétation à l'échelle microscopique de l'état d'équilibre en tenant compte
 *     des chocs efficaces » ; TP n° 3 (acide chlorhydrique et acide éthanoïque). pc-pc.yaml l. 525 et 555,
 *     pc-sm.yaml l. 539 et 569 ; pas d'annexe pour le cadre SVT.
 *  7. [V] Brønsted et Lowry, 1923, chacun de son côté : acide = donneur de proton, base = accepteur de proton.
 *     Wikipédia, « Brønsted–Lowry acid–base theory » et « Johannes Nicolaus Brønsted » (lus le 2026-11-25).
 *  8. [V] Sørensen, 1909, laboratoire Carlsberg : fiche de mot `pH` seulement (le sens du « p » est discuté).
 *     Wikipédia, « pH » (lu le 2026-11-25).
 *  9. Valeurs de la leçon : acide éthanoïque, C = 1,0 × 10⁻² mol·L⁻¹, V = 100 mL, pK_A = 4,79 (source 2) :
 *     choix d'auteur, pas des données. Le pH d'une solution d'acide faible est CALCULÉ à partir du pK_A
 *     (3,40 à 10⁻² mol·L⁻¹, 3,92 à 10⁻³) : ce n'est pas une mesure, et rien ne le dit « mesuré ». Le sujet SVT
 *     NS 27F 2026 (non transcrit) imprime 3,37 pour C = 10⁻² mol·L⁻¹ (à vérifier, non affiché).
 * 10. à vérifier (non affiché comme un fait) : « le pH reste 3,4 quand on attend » et « l'équilibre est atteint
 *     très vite » (fait de manuel, sans source dans le dépôt : le texte dit « dans la leçon, le palier ne bouge
 *     plus »), Ostwald 1888 (non affiché), Arrhenius (non utilisé), les états physiques au barème.
 * 11. Le MODÈLE de la loupe (probabilités par tic) est une image, pas une cinétique mesurée ; la note de la
 *     scène le dit. Sa seule prétention quantitative, le palier, est la relation d'équilibre exacte
 *     n²/((100 − n)·vol) = p_d/k, calée sur τ = 3,95 % à 1,0 × 10⁻² mol·L⁻¹ : le bocal dilué donne alors
 *     exactement τ = 11,95 % (vérifié par `VERIF_MODELE`). La série de tics vient d'une graine choisie puis
 *     figée ; `controlesSerie` vérifie ses contraintes et le moteur refuse de se monter si l'une manque.
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene, mulberry32 } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene };

/* ---------- la chimie : acide faible dans l'eau, pH, taux d'avancement ---------- */
export const PKA = { ethan: 4.79, propan: 4.89, benzo: 4.2, metha: 3.75 };   // sources 2, 1, 3 (table du sujet 2021)
export const NOMS = { hcl: "acide chlorhydrique", ethan: "acide éthanoïque", propan: "acide propanoïque", benzo: "acide benzoïque", metha: "acide méthanoïque" };
export const FORMULES = { hcl: "HCl", ethan: "CH_{3}COOH", propan: "C_{2}H_{5}COOH", benzo: "C_{6}H_{5}COOH", metha: "HCOOH" };
/** [H₃O⁺]_f d'un acide faible seul dans l'eau, à la concentration C : x²/(C − x) = K_A, x en mol·L⁻¹ */
export const hFinal = (C, pka) => { const K = 10 ** -pka; return (-K + Math.sqrt(K * K + 4 * K * C)) / 2; };
/** τ réel (le pH affiché en est un arrondi) */
export const tauReel = (C, pka) => hFinal(C, pka) / C;
export const phReel = (C, pka) => -Math.log10(hFinal(C, pka));
/** le pH que l'on affiche : arrondi à d décimales (le code recalcule tout depuis lui) */
export const phAff = (C, pka, d = 1) => Number(phReel(C, pka).toFixed(d));
export const hDe = (pH) => 10 ** -pH;                       // [H₃O⁺] = 10^(−pH)
export const phDe = (h) => -Math.log10(h);
/** τ calculé depuis le pH affiché : le geste du bac */
export const tauDePh = (C, pH) => hDe(pH) / C;
/** le pH d'un acide fort (acide chlorhydrique) : toutes les molécules ont cédé leur proton */
export const phFort = (C) => Number((-Math.log10(C)).toFixed(1));

export const C0 = 1.0e-2;                                   // mol·L⁻¹
export const V_ML = 100, V_L = V_ML / 1000;                 // mL ; L
export const N0 = C0 * V_L;                                 // 1,0 × 10⁻³ mol : n(AH) initial = x_max
export const X_MAX = N0;
export const PH_HCL = phFort(C0);                           // 2,0
export const PH_ETH = phAff(C0, PKA.ethan, 1);              // 3,4
export const H_ETH = hDe(PH_ETH);                           // 4,0 × 10⁻⁴ mol·L⁻¹
export const XF = H_ETH * V_L;                              // 4,0 × 10⁻⁵ mol
export const TAU = XF / X_MAX;                              // 0,040
export const TAU_ETH_REEL = tauReel(C0, PKA.ethan);         // 3,95 % : le calage du modèle
export const FOIS_H = 10 ** (PH_ETH - PH_HCL);              // ≈ 25 : combien de fois moins d'ions H₃O⁺
export const DIFF_PH = PH_ETH - PH_HCL;                     // 1,4 (leurre : lu comme un rapport)
export const RAP_PH = PH_ETH / PH_HCL;                      // 1,7 (leurre)
export const DIL = 10;                                      // la dilution de la partie 6
export const C_DIL = C0 / DIL;                              // 1,0 × 10⁻³ mol·L⁻¹
export const PH_DIL = phAff(C_DIL, PKA.ethan, 2);           // 3,92
export const TAU_DIL = tauDePh(C_DIL, PH_DIL);              // 0,120
export const TAU_DIL_REEL = tauReel(C_DIL, PKA.ethan);      // 11,95 %

/* « ce qu'il faut savoir » */
export const SAV_N = { C: C0, V: V_ML };
SAV_N.n = C0 * V_L;                                         // 1,0 × 10⁻³ mol
SAV_N.fauxMl = C0 * V_ML;                                   // 1,0 : le volume laissé en mL
SAV_N.fauxDiv = C0 / V_L;                                   // 0,10 : C divisée par V
export const SAV_PH = { pH: 3.0 };
SAV_PH.h = hDe(SAV_PH.pH);                                  // 1,0 × 10⁻³
SAV_PH.fauxInv = 10 ** SAV_PH.pH;                           // 1,0 × 10³ : le signe de l'exposant
/* les leurres des étapes de la partie 3 */
export const FAUX = {
  xfConc: H_ETH,                                            // 4,0 × 10⁻⁴ : la concentration prise pour la quantité
  xfPh: PH_ETH * V_L,                                       // 0,34 : le pH pris pour une concentration
  tauInv: 1 / TAU,                                          // 25 : rapport inversé
  tauSurC: XF / C0,                                         // 4,0 × 10⁻³ : x_f divisé par C
  tauSansC: H_ETH,                                          // 4,0 × 10⁻⁴ : 10^(−pH) seul
};
export const TF = { C: C0, pH: PH_HCL };
TF.tau = tauDePh(TF.C, TF.pH);                              // 1 : l'acide chlorhydrique
TF.fauxSansC = hDe(TF.pH);                                  // 1,0 × 10⁻² : C oubliée
export const RP = { C: C0, pH: 3.0 };
RP.tau = tauDePh(RP.C, RP.pH);                              // 0,10
RP.fauxSansC = hDe(RP.pH);                                  // 1,0 × 10⁻³
RP.fauxInv = RP.C / hDe(RP.pH);                             // 10
export const LIM = { tau: 0.9 };
/** la dilution : leurres de `dilution-calc` */
export const DC = { C: C_DIL, pH: PH_DIL, tau: TAU_DIL, fauxAvant: hDe(PH_DIL) / C0, fauxMeme: TAU };

/* ---------- les sujets du bac ---------- */
// 2022 N : acide propanoïque, C_a = 5 × 10⁻² mol·L⁻¹, pH = 3,1 (source 1)
export const S22 = { Ca: 5e-2, pH: 3.1, bareme: [0.5, 0.75] };
S22.h = hDe(S22.pH);                                        // 7,9 × 10⁻⁴
S22.tau = S22.h / S22.Ca;                                   // 1,6 × 10⁻²
S22.inv = S22.Ca / Number(S22.h.toPrecision(2));            // 63 : la copie fautive de `q1` (C/[H₃O⁺], avec 7,9 × 10⁻⁴)
// 2023 N : acide éthanoïque, C_A = 5 × 10⁻² mol·L⁻¹, pH = 3,05 (source 2)
export const S23 = { CA: 5e-2, pH: 3.05, bareme: [0.5, 0.75, 0.5] };
S23.h = hDe(S23.pH);                                        // 8,9 × 10⁻⁴
S23.tau = S23.h / S23.CA;                                   // 1,78 × 10⁻²
S23.alpha = 1 - S23.tau;                                    // 0,982
S23.fauxAlphaTau = S23.tau;                                 // 0,018 : α pris pour τ
S23.fauxSansC = 1 - S23.h;                                  // 0,999 : C_A oubliée dans τ
// 2021 N (source 3) : « montrer que τ ≈ 1,32 % »
export const S21 = { pH: 2.88, Ca: 0.10 };
S21.tau = hDe(S21.pH) / S21.Ca;                             // 0,0132
// 2012 N (source 4) : τ CITÉ ; le calcul (équimolaire, K = 10^(pK_A2 − pK_A1)) n'est pas montré
export const S12 = { pKa1: 4.8, pKa2: 9.2 };
S12.K = 10 ** (S12.pKa2 - S12.pKa1);                        // 2,5 × 10⁴
S12.tau = Math.sqrt(S12.K) / (1 + Math.sqrt(S12.K));        // 0,994 : « environ 0,99 »

/* ---------- le MODÈLE de la loupe : 100 molécules, un tic à la fois ---------- */
export const NM = 100;                                      // molécules d'acide dans la loupe
export const PD = 0.01;                                     // probabilité, par tic, qu'une molécule AH cède son proton
export const T_DIL = 45;                                    // à partir de ce tic, le bocal est dix fois plus grand
export const TICS = 80;                                     // la série va jusqu'au tic 80
export const R_EQ = (NM * TAU_ETH_REEL ** 2) / (1 - TAU_ETH_REEL);   // n²/((100 − n)·vol) au palier : 0,162
export const KREP = PD / R_EQ;                              // probabilité de reprise, par A⁻ et par H₃O⁺ rencontré : 0,0616
export const CAP_REPRISE = 0.5;                             // plafond d'une probabilité (l'étape `sens` part de 100 ions)
export const volDe = (k) => (k >= T_DIL ? DIL : 1);         // le volume pendant le passage du tic k au tic k + 1
export const probReprise = (n, vol) => Math.min(CAP_REPRISE, (KREP * n) / vol);
/** le palier moyen : n²/((100 − n)·vol) = R_EQ, n = 100 τ */
export const nPalier = (vol) => { const a = 1, b = R_EQ * vol, c = -R_EQ * vol * NM; return (-b + Math.sqrt(b * b - 4 * a * c)) / 2; };
export const VERIF_MODELE = { p1: nPalier(1) / NM, p10: nPalier(DIL) / NM };   // 3,95 % ; 11,95 %

/** une série de tics à graine : états des 100 molécules (0 : AH, 1 : A⁻) à chaque tic, et les transferts de chaque tic */
export function simuler(graine, depart, pd, krep, tics = TICS) {
  const rng = mulberry32(graine);
  let s = new Uint8Array(NM).fill(depart === "ions" ? 1 : 0);
  const compte = (a) => a.reduce((x, v) => x + v, 0);
  const etats = [s.slice()], fwd = [[]], bwd = [[]], n = [compte(s)];
  for (let k = 0; k < tics; k++) {
    const nk = compte(s), p = Math.min(CAP_REPRISE, (krep * nk) / volDe(k));
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
/** la molécule encadrée par `qui` : A⁻ au tic 30, redevenue AH entre les tics 31 et 35, et qui le reste jusqu'au tic 35 */
export function ringDe(S) {
  let best = -1, bt = -1;
  for (let i = 0; i < NM; i++) {
    if (S.etats[30][i] !== 1 || S.etats[35][i] !== 0) continue;
    let t = 31; while (t <= 35 && S.etats[t][i] === 1) t++;
    if (t > 35) continue;
    let propre = true; for (let u = t; u <= 35; u++) if (S.etats[u][i] !== 0) propre = false;
    for (let u = 30; u < t; u++) if (S.etats[u][i] !== 1) propre = false;
    if (propre && t > bt) { bt = t; best = i; }
  }
  return best < 0 ? null : { i: best, t: bt };
}
/** les contraintes de la série figée (la liste est vide si tout va bien) */
export function controlesSerie(S) {
  const f = [], n = S.n;
  if (S.fwd[1].length !== 1 || S.bwd[1].length !== 0) f.push("le tic 1 ne porte pas exactement un transfert");
  for (let k = 1; k <= 5; k++) if (S.fwd[k].length + S.bwd[k].length < 1) f.push(`aucun transfert au tic ${k}`);
  if (!(n[5] >= 2 && n[5] < 4)) f.push(`le compte au tic 5 vaut ${n[5]} (attendu 2 ou 3)`);
  for (let k = 10; k <= 40; k++) if (n[k] < 2 || n[k] > 7) f.push(`le compte au tic ${k} vaut ${n[k]} (hors de 2 à 7)`);
  if (n[30] !== 4) f.push(`le compte au tic 30 vaut ${n[30]} (attendu 4)`);
  if (n[45] !== 4) f.push(`le compte au tic 45 vaut ${n[45]} (attendu 4)`);
  if (!ringDe(S)) f.push("aucune molécule encadrable");
  let F = 0, B = 0; for (let k = 36; k <= 45; k++) { F += S.fwd[k].length; B += S.bwd[k].length; }
  if (Math.abs(F - B) > 1) f.push(`cédés ${F}, repris ${B} (écart de plus de 1)`);
  if (F < 6 || B < 6) f.push(`trop peu de transferts sur la fenêtre (${F}, ${B})`);
  if (n[80] < 10 || n[80] > 14) f.push(`le compte au tic 80 vaut ${n[80]} (hors de 10 à 14)`);
  if (Math.max(...n) > 19) f.push("le compte dépasse l'axe du graphe");
  return f;
}
export function controlesIons(S) {
  const f = [];
  if (S.n[0] !== NM) f.push("l'étape `sens` ne part pas de 100 ions");
  if (S.n[1] > 70) f.push("aucun AH n'apparaît au tic 1");
  if (S.n[15] > 10) f.push(`au tic 15, il reste ${S.n[15]} ions A⁻ (attendu : 10 au plus)`);
  return f;
}
/* les graines, choisies une fois (scripts de recherche : on garde la première qui passe les contraintes) puis figées */
export const SEED_ETH = 2929;
export const SEED_IONS = 1;
export const SERIE = simuler(SEED_ETH, "acide", PD, KREP);
export const SERIE_IONS = simuler(SEED_IONS, "ions", PD, KREP, 16);
export const SERIE_HCL = simuler(1, "acide", 1, 0, 12);
export const RING = ringDe(SERIE);
export const SERIE_DEFAUTS = [...controlesSerie(SERIE), ...controlesIons(SERIE_IONS)];
/** la courbe lisse « dans un bécher » : le compte moyen (infiniment de molécules : plus de fluctuation) */
export const LISSE = (() => { const a = [0]; for (let k = 0; k < TICS; k++) { const n = a[k], v = volDe(k); a.push(n + (NM - n) * PD - n * probReprise(n, v)); } return a; })();
/** le pH-mètre couplé à la courbe lisse : C·n/100 à ce tic, dans le bocal de volume vol */
export const phLisse = (k, vol) => phDe(((C0 / vol) * LISSE[Math.min(TICS, Math.max(0, Math.round(k)))]) / NM);
export const phAuPalier = (vol) => phAff(C0 / vol, PKA.ethan, vol > 1 ? 2 : 1);
/** les transferts cumulés (cédés, repris) entre le tic a et le tic b */
export function transferts(S, a, b) { let F = 0, B = 0; for (let k = a + 1; k <= b; k++) { F += S.fwd[k].length; B += S.bwd[k].length; } return [F, B]; }
export const VIT = (() => { const [F, B] = transferts(SERIE, 35, 45); return { F, B, fen: 10 }; })();
export const PALIER = { n: SERIE.n[30], tau: SERIE.n[30] / NM, faux: SERIE.n[30], fauxReste: 1 - SERIE.n[30] / NM };
export const DILPAL = { avant: SERIE.n[45], apres: SERIE.n[80], lisse: nPalier(DIL), tau: nPalier(DIL) / NM };

/* ---------- le tableau d'avancement : colonnes et lignes ---------- */
export const COLS = { generique: ["AH", "H_{2}O", "A^{−}", "H_{3}O^{+}"], ethan: ["CH_{3}COOH", "H_{2}O", "CH_{3}COO^{−}", "H_{3}O^{+}"] };

/* ---------- la copie du sujet 2022 (scène `bac`), ligne à ligne ---------- */
export const COPIE = [
  "*τ* = *x*_{f} / *x*_{max}",
  "*x*_{max} = *C*_{a} *V*      *x*_{f} = [H_{3}O^{+}]_{f} *V* = 10^{−pH} *V*",
  "*τ* = 10^{−pH} *V* / (*C*_{a} *V*) = 10^{−pH} / *C*_{a}",
  `*τ* = 10^{−${fr(S22.pH, 1)}} / (${sciF(S22.Ca, 0)}) ≈ ${sciF(S22.tau, 1)}   soit ${fr(S22.tau * 100, 1)} %`,
  "*τ* < 1 : la transformation est limitée (non totale)",
];
export const COPIE_EQ = "C_{2}H_{5}COOH_{(aq)} + H_{2}O_{(l)} ⇄ C_{2}H_{5}COO^{−}_{(aq)} + H_{3}O^{+}_{(aq)}";

/* ---------- les curseurs de la figure `barres` ---------- */
export const CRANS_C = [1e-3, 1e-2, 1e-1];                  // mol·L⁻¹
export const phMin = (C) => Number((-Math.log10(C)).toFixed(1));
export const PH_MAX = 6;
export const pasPh = 0.1;

/* ---------- les nombres du texte, à la française ---------- */
export const mol = (n, d = 1) => `${sciH(n, d)} mol`;
export const pct = (x, d = 1) => `${fr(x * 100, d)} %`;

/* ---------- les outils de scène de la leçon : ceux de la décroissance, plus un texte à la taille voulue ---------- */
/**
 * `lab(parent, x, y, texte, classes, ancre, taille)` : un texte de scène dont les indices et exposants
 * suivent la taille (en unités de dessin) ; `titre(g, titre, sous-titre)` : le titre commun, en 26 et 22
 * (le dessin mesure 1 000 unités : 26 unités font un peu plus de 10 px sur un téléphone).
 */
export function outilsTnt(ctx) {
  const O = outilsScene(ctx);
  const { fx, setFx } = O;
  function lab(parent, x, y, str, cls, anchor, fs = 26) {
    const t = fx(parent, x, y, "", cls, anchor);
    t.__fs = fs; t.__s = null; setFx(t, str);
    return t;
  }
  function titre(g, t, s, x = 500) {
    const T = lab(g, x, 56, t || "", "tn-t s-ink", "middle", 26), S = lab(g, x, 90, s || "", "tn-s s-c", "middle", 22);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  const { E } = ctx;
  /** des axes : traits, graduations (22 unités), titres d'axe (26) */
  function axes(g, X, Y, x0, x1, xs, y1, ys, xf, yf, xt, yt, xtx, y0 = 0) {
    g.textContent = "";
    E("line", { x1: X(x0), y1: Y(y0), x2: X(x1) + 14, y2: Y(y0), class: "k-dim", "stroke-width": 2 }, g);
    E("line", { x1: X(x0), y1: Y(y0), x2: X(x0), y2: Y(y1) - 14, class: "k-dim", "stroke-width": 2 }, g);
    for (let v = x0; v <= x1 + 1e-9; v += xs) {
      E("line", { x1: X(v), x2: X(v), y1: Y(y0), y2: Y(y0) + 7, class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(v), Y(y0) + 30, xf(v), "t-sous s-c", "middle", 22);
    }
    for (let v = y0 + ys; v <= y1 + 1e-9; v += ys) {
      E("line", { x1: X(x0) - 7, x2: X(x0), y1: Y(v), y2: Y(v), class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(x0) - 12, Y(v) + 7, yf(v), "t-sous s-c", "end", 22);
    }
    if (xt) lab(g, X(x1) + 14, Y(y0) + (xtx || 56), xt, "tn-l s-c", "end", 26);
    if (yt) lab(g, X(x0) + 14, Y(y1) - 22, yt, "tn-l s-c", "start", 26);
  }
  return { ...O, lab, titre, axes };
}
