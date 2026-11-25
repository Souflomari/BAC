/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dipôle RL » (V3) : les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n'est écrit à la main : il vient de ce fichier (donnée
 * sourcée, ou valeur CALCULÉE à partir d'elle). Les scènes, le script et les gabarits d'exercices
 * importent d'ici. Les outils de formatage et de scène de la leçon sur la décroissance
 * (`radioactivite-outils.js`) sont repris tels quels : des fonctions sans contenu de leçon.
 *
 * SOURCES : [V] lu sur la source citée ; « choix d'auteur » : valeur de la leçon, pas une donnée ;
 * « à vérifier » : à ne pas montrer à un élève avant relecture (rien de tel ne s'affiche).
 *
 *  1. [V] Sujet 2023, session normale (NS 28F), Exercice 3, §1, questions 1-1 (0,25 pt), 1-2-1 (0,5),
 *     1-2-2 (0,5), 1-3 (0,5) ; total 1,75 pt : E = 24 V ; bobine de résistance négligeable ;
 *     i(t) = A + B·e^{−t/τ} donnée ; palier I₀ = 48 mA ; la tangente (T) coupe le palier à τ = 2,0 ms ;
 *     R = E/I₀ = 500 Ω, L = Rτ = 1 H. docs/sujets/pc/dipole-rl.md (statut vérifié, 2ᵉ passe, pixel).
 *  2. [V] Sujet 2024, session normale (NS 28F), Exercice 4, partie 2, questions 2-1, 2-2-1, 2-2-2
 *     (0,5 pt chacune) : E = 6 V ; la droite di/dt = f(i) va de (0 ; 3 × 10³ A·s⁻¹) à (6 mA ; 0) ;
 *     L = 2 mH, τ = 2 µs, R₁ + r = 1 000 Ω ; la lecture erronée à 3 mA donnerait 1 µs. Même fichier
 *     (vérifié, trois passes).
 *  3. [V] Sujet 2020, session normale, Exercice IV, partie I, Q1 (0,5 pt) : « di/dt + ((R + r)/L)·i = E/L ».
 *     Seul l'énoncé de la Q1 sert : la figure 2 n'est pas utilisée (lecture d'échelle à confirmer).
 *  4. [V] Notation E_m de l'énergie magnétique : docs/sujets/pc/rlc-serie.md (2023 N, Ex. 3 §2 ;
 *     2019 N, Ex. III).
 *  5. [V] Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer
 *     aux applications numériques. » (docs/refonte/01-programme-bac-maroc.md §3.3)
 *  6. [V] Joseph Henry, 1832 : une pile, deux coupelles de mercure ; un fil de 30 à 40 pieds : aucune
 *     étincelle au contact, une vive étincelle à la rupture, un peu plus vive quand le fil est enroulé en
 *     hélice. Texte de Henry reproduit par Princeton, Joseph Henry Project, « Self Inductance » (lu le
 *     2026-11-25) ; Henry, American Journal of Science 22 (1832), p. 403-408. Seule l'année est affichée
 *     (le mois de parution diverge selon les archives) ; le récit est paraphrasé, jamais cité.
 *  7. [V] L'unité henry porte le nom de Joseph Henry (Wikipédia, Joseph Henry, lu le 2026-11-25).
 *  8. [V] TP de l'annexe des contenus : « tension entre les bornes d'une bobine dans le cas de
 *     l'application d'une tension triangulaire » (pc-pc.yaml l. 542, pc-sm.yaml l. 555).
 *  9. Valeurs de la leçon : E = 6 V, R = 50 Ω, r = 10 Ω, L = 0,30 H, donc τ = 5,0 ms ; R₂ = 1,0 kΩ ;
 *     courant triangulaire de ±20 mA en 5,0 ms : choix d'auteur, pas des données.
 * 10. à vérifier (non affiché) : l'expérience des deux lampes (qualitative, aucune valeur) ; la
 *     citation de Henry ; la tension de claquage de l'air ; la figure 2 du sujet 2020 ; le sens de la
 *     flèche u_L dans les figures des sujets ; la diode de roue libre ; l'« intérêt » d'un montage RL
 *     (pc-svt 1.3.2.13) ; le branchement de la seconde voie d'un oscilloscope (voie inversée).
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene };

/* ---------- la leçon : E, R, r, L, I₀, τ ---------- */
export const E_V = 6;                       // V
export const R_OHM = 50;                    // Ω : le conducteur ohmique
export const R_BOB = 10;                    // Ω : la résistance r de la bobine
export const L_H = 0.3;                     // H
export const RT = R_OHM + R_BOB;            // Ω : R + r, 60
export const I0 = E_V / RT;                 // A : 0,100
export const TAU = L_H / RT;                // s : 5,0 ms
export const T_MAX = 6 * TAU;               // s : l'axe des temps de la figure-clé
export const UL_INF = R_BOB * I0;           // V : u_L(∞) = r·I₀, 1,0
export const UR_INF = R_OHM * I0;           // V : u_R(∞) = R·I₀, 5,0
export const DI0 = E_V / L_H;               // A·s⁻¹ : la pente de départ E/L, 20

/** i(t), u_R(t), u_L(t) à l'établissement (K en 1) : les paramètres peuvent varier (curseurs, fantômes) */
export const tauDe = (R = R_OHM, r = R_BOB, L = L_H) => L / (R + r);
export const iEt = (t, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => (E / (R + r)) * (1 - Math.exp(-t / tauDe(R, r, L)));
export const uRt = (t, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => R * iEt(t, E, R, r, L);
export const uLt = (t, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => E - uRt(t, E, R, r, L);
/** la rupture (K en 2, à t = 0, depuis le régime permanent) ; R2 : un conducteur ohmique de plus dans la maille de rupture */
export const tauRup = (R2 = 0, R = R_OHM, r = R_BOB, L = L_H) => L / (R + R2 + r);
export const iRup = (t, R2 = 0, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => (E / (R + r)) * Math.exp(-t / tauRup(R2, R, r, L));
export const uLRup = (t, R2 = 0, E = E_V, R = R_OHM, r = R_BOB, L = L_H) => -(R + R2) * iRup(t, R2, E, R, r, L);
export const chargePart = (n) => 1 - Math.exp(-n);            // part atteinte à t = nτ (montée)
export const dechPart = (n) => Math.exp(-n);                  // part qui reste à t = nτ (descente)
export const P63 = chargePart(1), P37 = dechPart(1);          // 0,632 ; 0,368
export const I_63 = I0 * P63, I_37 = I0 * P37;                // 63,2 mA ; 36,8 mA
export const T_FAUX37 = -TAU * Math.log(1 - P37);             // 2,29 ms : où i = 37 % de I₀ à la montée
export const T_HALF = TAU * Math.LN2;                         // τ·ln 2 : 3,47 ms, où i = I₀/2 à la montée
export const MOITIE = I0 / 2;                                 // 50 mA
export const DUREE_5 = 5 * TAU;                               // 25 ms
export const PART_5 = chargePart(5) * 100;                    // 99,3 %
export const UL_TAU = uLt(TAU);                               // 2,84 V
export const UL_0P = E_V;                                     // u_L(0⁺) = E : i = 0 donc u_R = 0

/* la construction pas à pas : pas de τ/10, ce qui reste à monter est multiplié par 0,9 */
export const N_PAS = 10;
export const DT_PAS = TAU / N_PAS;                            // 0,50 ms
export const REDUC = 1 - DT_PAS / TAU;                        // 0,9
export const iPas = (k) => I0 * (1 - REDUC ** k);             // i après k pas
export const dIPas = (k) => iPas(k) - iPas(k - 1);            // la montée du k-ième pas : 10 mA, 9,0 mA…
export const pente = (k) => (E_V - RT * iPas(k - 1)) / L_H;   // di/dt au début du k-ième pas
export const uRPas = (k) => R_OHM * iPas(k);                  // u_R après k pas
export const rIPas = (k) => R_BOB * iPas(k);                  // r·i après k pas
export const I_10 = iPas(N_PAS), I_10_EXACT = iEt(TAU);       // 65,1 mA contre 63,2 mA

/* ---------- la surtension : un conducteur ohmique de plus dans la maille de rupture ---------- */
export const R2_OHM = 1000;                                   // Ω
export const UL_RUP0 = uLRup(0);                              // −5,0 V
export const UL_SURT = uLRup(0, R2_OHM);                      // −105 V
export const TAU_SURT = tauRup(R2_OHM);                       // 0,283 ms
export const RAPPORT_TAU = TAU / TAU_SURT;                    // 18,8
export const R_MAILLE_SURT = R_OHM + R2_OHM;                  // 1 050 Ω (sans r : la tension de la bobine)

/* ---------- l'énergie magnétique ---------- */
export const energie = (L, i) => 0.5 * L * i * i;             // J
export const EM_1 = energie(L_H, I0), EM_2 = energie(L_H, 2 * I0);   // 1,50 mJ ; 6,00 mJ
export const FOIS_ENERGIE = EM_2 / EM_1;                      // 4

/* ---------- le courant triangulaire du TP (choix d'auteur) ---------- */
export const TRI = { imax: 20e-3, demi: 5e-3 };
TRI.pente = (2 * TRI.imax) / TRI.demi;                        // 8,0 A·s⁻¹
TRI.uPente = L_H * TRI.pente;                                 // L·di/dt : 2,4 V
TRI.uR = R_BOB * TRI.imax;                                    // r·i en bout de rampe : 0,2 V
TRI.uBout = TRI.uPente + TRI.uR;                              // 2,6 V : lu en bout de rampe
TRI.di = 2 * TRI.imax;                                        // 0,040 A : la variation d'une rampe
TRI.LFauxDt = TRI.uPente / TRI.di;                            // 60 H : Δt oublié
TRI.LFauxInv = TRI.pente / TRI.uPente;                        // 3,3 H : rapport inversé
TRI.LFauxBout = TRI.uBout / TRI.pente;                        // 0,325 H : u lue en bout de rampe
/** i(t) et u(t) pour un courant triangulaire qui part de −i_max et monte pendant `demi` */
export const triI = (t) => { const p = ((t % (2 * TRI.demi)) + 2 * TRI.demi) % (2 * TRI.demi); return p < TRI.demi ? -TRI.imax + TRI.pente * p : TRI.imax - TRI.pente * (p - TRI.demi); };
export const triU = (t) => { const p = ((t % (2 * TRI.demi)) + 2 * TRI.demi) % (2 * TRI.demi); return R_BOB * triI(t) + L_H * (p < TRI.demi ? TRI.pente : -TRI.pente); };
export const T_I0 = TRI.demi / 2;                             // 2,5 ms : où i = 0 à la montée

/* ---------- la montée régulière de l'étape « pente-tension » ---------- */
export const PT = { L: 0.3, di: 0.2, dt: 8e-3 };
PT.pente = PT.di / PT.dt;                                     // 25 A·s⁻¹
PT.u = PT.L * PT.pente;                                       // 7,5 V
PT.uFauxLi = PT.L * PT.di;                                    // 0,06 V : L·i

/* ---------- « ce qu'il faut savoir » : RC et rappels ---------- */
export const SAV = { E: 6, tau: 2e-3 };
SAV.u = SAV.E * P63;                                          // 3,79 V à t = τ
SAV.uFaux37 = SAV.E * P37;                                    // 2,21 V
export const RAPPEL = { di: 0.2, dt: 1e-3 };
RAPPEL.taux = RAPPEL.di / RAPPEL.dt;                          // 200 A·s⁻¹

/* ---------- la bobine réelle en courant constant ---------- */
export const BR = { r: 10, i: 0.1, L: 0.3 };
BR.u = BR.r * BR.i;                                           // 1,0 V
BR.uFauxLi = BR.L * BR.i;                                     // 0,03 V

/* ---------- les curseurs de la figure-clé ---------- */
export const CRANS_L = [0.1, 0.2, 0.3, 0.5, 1.0];             // H
export const CRANS_R = [10, 22, 50, 100, 220];                // Ω
export const CRANS_r = [0, 5, 10, 20];                        // Ω
export const CRANS_E = [3, 6, 9, 12];                         // V

/* ---------- les sujets du bac, recopiés de docs/sujets/pc/dipole-rl.md ---------- */
// 2023 N, Ex. 3, §1 (source 1)
export const S23 = { E: 24, I0: 48e-3, tau: 2e-3, bareme: [0.25, 0.5, 0.5, 0.5] };
S23.R = S23.E / S23.I0;                                       // 500 Ω
S23.L = S23.R * S23.tau;                                      // 1,0 H
S23.LFaux = S23.tau / S23.R;                                  // 4 × 10⁻⁶ H : τ/R
S23.t37 = -S23.tau * Math.log(1 - P37);                       // 0,92 ms : où i = 37 % de I₀ à la montée
S23.LFaux37 = S23.R * S23.t37;                                // 0,46 H
S23.k = 1 / S23.tau;                                          // 500 s⁻¹
S23.kFaux = 1 / (S23.tau * 1e3);                              // 0,5 : τ laissé en ms
// 2024 N, Ex. 4, partie 2 (source 2)
export const S24 = { E: 6, ordo: 3e3, abs: 6e-3, bareme: [0.5, 0.5, 0.5] };
S24.L = S24.E / S24.ordo;                                     // 2,0 mH
S24.Rt = S24.E / S24.abs;                                     // 1 000 Ω : R₁ + r
S24.tau = S24.abs / S24.ordo;                                 // 2,0 µs
S24.LFauxInv = S24.ordo / S24.E;                              // 500 H
S24.LFauxE = 1 / S24.ordo;                                    // 3,3 × 10⁻⁴ H
S24.pente = S24.ordo / S24.abs;                               // 5 × 10⁵ s⁻¹
S24.tauFaux3 = (S24.abs / 2) / S24.ordo;                      // 1,0 µs : intersection lue à 3 mA
// 2020 N, Ex. IV, partie I (source 3) : seul l'énoncé sert
export const S20 = { R: 90, bareme: [0.5, 0.5, 0.5] };
// Q3 du bilan
export const Q3 = { L: 20e-3, R: 90, r: 10 };
Q3.tau = Q3.L / (Q3.R + Q3.r);                                // 0,20 ms
Q3.tauFauxR = Q3.L / Q3.R;                                    // 0,22 ms
Q3.tauFauxMh = (Q3.L * 1e3) / (Q3.R + Q3.r);                  // 0,20 s : mH non converti

/* ---------- Henry (source 6) ---------- */
export const PIED_M = 0.3048;
export const HENRY_PIEDS = [30, 40];                          // la longueur du fil, en pieds (source 6)
export const HENRY_FIL_M = HENRY_PIEDS.map((p) => p * PIED_M);  // 9,1 à 12,2 m

/* ---------- l'analyse dimensionnelle de RL (rédigée comme au bac) ---------- */
export const DIM = {
  L: "[L] = [U]·[T]·[I]⁻¹",
  R: "[R] = [U]·[I]⁻¹",
  tau: "[L]/[R] = [U][T][I]⁻¹ × [I][U]⁻¹ = [T]",
};

/* ---------- les nombres du texte, à la française ---------- */
export const mA = (i, d = 1) => `${fr(i * 1e3, d)} mA`;
export const ms = (t, d = 1) => `${fr(t * 1e3, d)} ms`;
export const volt = (u, d = 1) => `${fr(u, d)} V`;
export const mJ = (e, d = 1) => `${fr(e * 1e3, d)} mJ`;

/* ---------- les outils de scène de la leçon : ceux de la leçon sur la décroissance, plus un texte à la taille voulue ---------- */
/**
 * `lab(parent, x, y, texte, classes, ancre, taille)` : un texte de scène dont les indices et exposants
 * suivent la taille (en unités de dessin) ; `titre(g, titre, sous-titre)` : le titre commun, en 26 et 22
 * (le dessin mesure 1 000 unités : 26 unités font un peu plus de 10 px sur un téléphone).
 */
export function outilsRl(ctx) {
  const O = outilsScene(ctx);
  const { fx, setFx } = O;
  function lab(parent, x, y, str, cls, anchor, fs = 26) {
    const t = fx(parent, x, y, "", cls, anchor);
    t.__fs = fs; t.__s = null; setFx(t, str);
    return t;
  }
  function titre(g, t, s, x = 500) {
    const T = lab(g, x, 56, t || "", "rl-t s-ink", "middle", 26), S = lab(g, x, 90, s || "", "rl-s s-c", "middle", 22);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  const { E } = ctx;
  /** des axes : traits, graduations (22 unités), titres d'axe (26) ; xf, yf : le texte d'une graduation */
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
    if (xt) lab(g, X(x1) + 14, Y(y0) + (xtx || 56), xt, "rl-l s-c", "end", 26);
    if (yt) lab(g, X(x0) + 14, Y(y1) - 22, yt, "rl-l s-c", "start", 26);
  }
  return { ...O, lab, titre, axes };
}
