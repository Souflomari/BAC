/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dipôle RC » (V3) : les données sourcées et les calculs.
 *
 * Aucun nombre affiché dans la leçon n'est écrit à la main : il vient de ce fichier (donnée
 * sourcée, ou valeur CALCULÉE à partir d'elle). Les scènes, le script et les gabarits d'exercices
 * importent d'ici. Les outils de formatage et de scène de la leçon sur la décroissance
 * (`radioactivite-outils.js`) sont repris tels quels : des fonctions sans contenu de leçon.
 *
 * SOURCES : [V] lu sur la source citée ; « choix d'auteur » : valeur de la leçon, pas une donnée ;
 * « à vérifier » : à ne pas montrer à un élève avant relecture (rien de tel ne s'affiche).
 *
 *  1. [V] Sujet 2022, session normale (NS 28F), Exercice 3, section 1, questions 1.1 (0,25 pt),
 *     1.2.1 (0,5), 1.2.2 (0,5), 1.2.3 (0,25) ; total 1,5 pt : palier de u_C à E = 12 V ; i(0) = 12 mA ;
 *     la tangente (T) coupe le palier à t = 50 ms ; solution donnée u_C(t) = E(1 − e^{−t/RC}) ;
 *     R = E/i₀ = 1 000 Ω, C = 50 µF. docs/sujets/pc/rc-charge.md (statut vérifié, figure mesurée au pixel).
 *  2. [V] Sujet 2021, session normale (NS 28F), Exercice IV, partie I, Q1 (0,5 pt) et Q2 (0,5 pt) :
 *     R = 10³ Ω ; la droite du_C/dt = f(u_C) passe par (0 ; 1 000), (6 ; 500), (12 ; 0) ; C = 12 µF.
 *     Même fichier (trois passes).
 *  3. [V] Sujet 2018, session normale (NS 28F), Exercice III, I-1, questions 1.1 (0,5 pt), 1.2 (0,75),
 *     1.3 (0,5) : C₁ = 7,5 µF ; la droite q = f(u_AB) joint l'origine à (6 V ; 60 µC) ; C_éq = 10 µF ;
 *     C₂ = 2,5 µF. Même fichier (trois passes).
 *  4. [V] Sujet 2025, session normale (NS 28F), Exercice 3, partie 1, 1-1 (0,5 pt) et 1-2 (0,5) :
 *     I₀ = 1 µA ; la droite u_C(t) passe par (2 s ; 2 V), (4 ; 4) jusqu'à (10 s ; 10 V) : pente 1 V·s⁻¹ ;
 *     C₀ = 1 µF. Même fichier (vérifié).
 *  5. [V] Sujet 2019, session normale (NS 28F), Exercice III, partie I, Q1 (0,5 pt) et Q2 (0,5) :
 *     l'équation vérifiée par q(t), et la forme q(t) = A(1 − e^{−αt}). Seuls les énoncés servent.
 *  6. [V] Consigne imprimée sur les sujets : « On donnera les expressions littérales avant de passer
 *     aux applications numériques. » (docs/refonte/01-programme-bac-maroc.md §3.3)
 *  7. [V] Musschenbroek, Leyde, 1746 : un canon de fer suspendu à des fils de soie, électrisé par une
 *     sphère de verre qu'on frotte ; un vase de verre à demi plein d'eau tenu dans la main droite, où
 *     plonge un fil relié au canon ; de l'autre main, il approche le canon : « Tout à coup ma main
 *     droite fut frappée avec tant de violence, que j'eus tout le corps ébranlé comme d'un coup de
 *     foudre » (lettre à Réaumur). Wikipédia, Bouteille de Leyde (lu le 2026-11-24). Seule l'année est
 *     affichée : le jour de la lettre diffère selon les pages (à vérifier, non affiché).
 *  8. Valeurs de la leçon : E = 12 V, R = 10 kΩ, C = 220 µF, donc τ = 2,2 s : choix d'auteur
 *     (décision du relecteur 2026-11-24, §9.3 du plan), pas des données ; celles du sujet 2022 ne
 *     servent que dans l'exemple du bac.
 *  9. à vérifier (non affiché) : la notation de l'énergie (E_e, W_e, ℰ_e) : aucun sujet transcrit ne la
 *     porte dans la partie RC ; la leçon écrit E_e. Le branchement de la seconde voie d'un oscilloscope
 *     (voie inversée) : non traité. L'intérêt pratique d'un montage RC (flash, temporisation) : non
 *     affiché.
 */
import { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene } from "./radioactivite-outils.js";
export { NB, fr, ent, sig3, sciH, sciF, TN, TS, outilsScene };

/* ---------- la leçon : E, R, C, τ ---------- */
export const E_V = 12;                 // V
export const R_OHM = 1e4;              // Ω
export const C_F = 220e-6;             // F
export const TAU = R_OHM * C_F;        // s : 2,2
export const I0 = E_V / R_OHM;         // A : 1,2 mA
export const T_MAX = 12;               // s : l'axe des temps de la figure-clé

export const uC = (t, E = E_V, tau = TAU) => E * (1 - Math.exp(-t / tau));
export const uR = (t, E = E_V, tau = TAU) => E * Math.exp(-t / tau);
export const iC = (t, E = E_V, R = R_OHM, tau = TAU) => (E / R) * Math.exp(-t / tau);
export const qC = (t, E = E_V, C = C_F, tau = TAU) => C * E * (1 - Math.exp(-t / tau));
export const uDech = (t, E = E_V, tau = TAU) => E * Math.exp(-t / tau);
export const iDech = (t, E = E_V, R = R_OHM, tau = TAU) => -(E / R) * Math.exp(-t / tau);
export const dechPart = (n) => Math.exp(-n);                  // part qui reste à t = nτ (décharge, ou u_R)
export const chargePart = (n) => 1 - Math.exp(-n);            // part atteinte à t = nτ (charge)
export const P63 = chargePart(1), P37 = dechPart(1);          // 0,632 ; 0,368
export const U63 = E_V * P63, U37 = E_V * P37;                // 7,58 V ; 4,42 V
export const I_TAU = I0 * P37;                                // i(τ) = 0,44 mA
export const T_FAUX37 = -TAU * Math.log(1 - P37);              // 1,0 s : où u_C = 37 % de E à la charge (et où u_C = 63 % de E à la décharge)
export const T_HALF = TAU * Math.LN2;                         // τ·ln 2 : la « demi-charge », 1,52 s
export const T_MOITIE = T_HALF;
export const MOITIE = E_V / 2;                                // 6 V
export const PARTS_N = [1, 2, 3, 4, 5].map((n) => [n, chargePart(n) * 100]);  // 63 ; 86 ; 95 ; 98 ; 99,3 %
export const DUREE_5 = 5 * TAU;                               // 11 s

/* la construction pas à pas : pas de τ/10, ce qui reste à charger est multiplié par 0,9 */
export const N_PAS = 10;
export const DT_PAS = TAU / N_PAS;                            // 0,22 s
export const K_PAS = DT_PAS / TAU;                            // 0,1
export const REDUC = 1 - K_PAS;                               // 0,9
export const uPas = (k) => E_V * (1 - REDUC ** k);            // u_C après k pas
export const dUPas = (k) => uPas(k) - uPas(k - 1);            // la montée du k-ième pas
export const iPas = (k) => (E_V - uPas(k - 1)) / R_OHM;       // courant au début du k-ième pas
export const qPas = (k) => iPas(k) * DT_PAS;                  // charge apportée pendant le k-ième pas
export const U_10 = uPas(N_PAS), U_10_EXACT = uC(TAU);        // 7,82 contre 7,58

/* ---------- l'énergie ---------- */
export const energie = (C, u) => 0.5 * C * u * u;             // J
export const EE_12 = energie(C_F, E_V), EE_24 = energie(C_F, 2 * E_V);   // 15,84 mJ ; 63,36 mJ
export const FOIS_ENERGIE = EE_24 / EE_12;                    // 4

/* ---------- lectures à l'oscilloscope ---------- */
export const OSC_S_DIV = 0.5;                                 // s/div
export const OSC_DIV = TAU / OSC_S_DIV;                       // 4,4 divisions

/* ---------- la question de l'énigme : doubler C, ou R, ou E ---------- */
export const TAU_2C = 2 * TAU;

/* ---------- les curseurs de la figure-clé ---------- */
export const CRANS_R = [1e3, 2.2e3, 4.7e3, 1e4, 2.2e4];                  // Ω
export const CRANS_C = [47e-6, 100e-6, 220e-6, 470e-6];                  // F
export const CRANS_E = [6, 9, 12, 18, 24];                               // V

/* ---------- les sujets du bac, recopiés de docs/sujets/pc/rc-charge.md ---------- */
// 2022 N, Ex. 3, §1 (source 1)
export const S22 = { E: 12, i0: 12e-3, tau: 50e-3, bareme: [0.25, 0.5, 0.5, 0.25] };
S22.R = S22.E / S22.i0;                                       // 1 000 Ω
S22.C = S22.tau / S22.R;                                      // 50 µF
S22.t37 = -S22.tau * Math.log(1 - P37);                       // 22,9 ms : où u_C = 37 % de E
S22.tHalf = S22.tau * Math.LN2;                               // 34,7 ms : où u_C = E/2
S22.CFaux37 = S22.t37 / S22.R;                                // 22,9 µF
S22.CFauxMoitie = S22.tHalf / S22.R;                          // 34,7 µF
S22.i63 = S22.i0 * P63;                                       // 7,58 mA : 63 % de 12 mA (copie du bilan)
S22.tCopie = -S22.tau * Math.log(P63);                        // 22,9 ms : où i = 63 % de i₀
S22.CCopie = S22.tCopie / S22.R;                              // 22,9 µF
S22.i37 = S22.i0 * P37;                                       // 4,42 mA : où il reste 37 %
S22.iMoitie = S22.i0 / 2;                                     // 6 mA
S22.RFaux1 = S22.E / (S22.i0 * 1000);                         // 1 Ω : mA non converti
S22.RFaux2 = S22.i0 / S22.E;                                  // 1,0 × 10⁻³ Ω : i₀/E
// 2021 N, Ex. IV, partie I (source 2)
export const S21 = { R: 1e3, ordo: 1000, mil: [6, 500], abs: 12, bareme: [0.5, 0.5] };
S21.E = S21.abs;                                              // 12 V : abscisse à l'origine
S21.RC = S21.E / S21.ordo;                                    // 1,2 × 10⁻² s
S21.C = S21.RC / S21.R;                                       // 12 µF
S21.pente = -S21.ordo / S21.abs;                              // −83,3 s⁻¹ = −1/(RC)
S21.CFaux1 = 1 / S21.ordo / S21.R;                            // 1 µF : 1000 pris pour 1/(RC), E oublié
S21.CFauxPente = -S21.pente / S21.R;                          // 83,3 pris pour RC au lieu de 1/(RC) : 8,3 × 10⁻² F
// 2018 N, Ex. III, I-1 (source 3)
export const S18 = { C1: 7.5e-6, u: 6, q: 60e-6, bareme: [0.5, 0.75, 0.5] };
S18.Ceq = S18.q / S18.u;                                      // 10 µF
S18.C2 = S18.Ceq - S18.C1;                                    // 2,5 µF
S18.FauxSomme = S18.C1 + S18.Ceq;                             // 17,5 µF
S18.FauxSerie = (S18.C1 * S18.Ceq) / (S18.C1 + S18.Ceq);      // 4,29 µF
S18.FauxInv = S18.u / (S18.q * 1e6);                          // u/q au lieu de q/u : 0,10 (en µF)
S18.FauxProduit = S18.u * S18.q * 1e6;                        // q × u : 360 (en µF)
// 2025 N, Ex. 3, 1- (source 4)
export const S25 = { I0: 1e-6, pente: 1, tFin: 10, uFin: 10, bareme: [0.5, 0.5] };
S25.C0 = S25.I0 / S25.pente;                                  // 1 µF
S25.FauxInv = S25.pente / S25.I0;                             // 10⁶ F
S25.FauxUnit = (S25.I0 * 1e6) / S25.pente;                    // 1 F : µA non converti (I₀ pris pour 1)

/* ---------- l'analyse dimensionnelle de RC (rédigée comme au bac) ---------- */
export const DIM = {
  R: "[R] = [U]·[I]⁻¹",
  C: "[C] = [Q]·[U]⁻¹ = [I]·[T]·[U]⁻¹",
  RC: "[R][C] = [U][I]⁻¹ × [I][T][U]⁻¹ = [T]",
};

/* ---------- les nombres du texte, à la française ---------- */
export const mA = (i) => `${fr(i * 1e3, 1)} mA`;
export const sec = (t, d = 1) => `${fr(t, d)} s`;
export const mJ = (e) => `${fr(e * 1e3, 1)} mJ`;
export const volt = (u, d = 1) => `${fr(u, d)} V`;
/** une capacité en µF, ou nF : la valeur et son préfixe */
export const uF = (c, d = 1) => `${fr(c * 1e6, d)} µF`;

/* ---------- les outils de scène de la leçon : ceux de la leçon sur la décroissance, plus un texte à la taille voulue ---------- */
/**
 * `lab(parent, x, y, texte, classes, ancre, taille)` : un texte de scène dont les indices et exposants
 * suivent la taille (en unités de dessin) ; `titre(g, titre, sous-titre)` : le titre commun, en 26 et 22
 * (le dessin mesure 1 000 unités : 26 unités font un peu plus de 10 px sur un téléphone).
 */
export function outilsRc(ctx) {
  const O = outilsScene(ctx);
  const { fx, setFx } = O;
  function lab(parent, x, y, str, cls, anchor, fs = 26) {
    const t = fx(parent, x, y, "", cls, anchor);
    t.__fs = fs; t.__s = null; setFx(t, str);
    return t;
  }
  function titre(g, t, s, x = 500) {
    const T = lab(g, x, 56, t || "", "rc-t s-ink", "middle", 26), S = lab(g, x, 90, s || "", "rc-s s-c", "middle", 22);
    return { T, S, set(a, b) { setFx(T, a || ""); setFx(S, b || ""); } };
  }
  const { E } = ctx;
  /** des axes : traits, graduations (22 unités), titres d'axe (26) ; xf, yf : le texte d'une graduation */
  function axes(g, X, Y, x0, x1, xs, y1, ys, xf, yf, xt, yt, xtx) {
    g.textContent = "";
    E("line", { x1: X(x0), y1: Y(0), x2: X(x1) + 14, y2: Y(0), class: "k-dim", "stroke-width": 2 }, g);
    E("line", { x1: X(x0), y1: Y(0), x2: X(x0), y2: Y(y1) - 14, class: "k-dim", "stroke-width": 2 }, g);
    for (let v = x0; v <= x1 + 1e-9; v += xs) {
      E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 7, class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(v), Y(0) + 30, xf(v), "t-sous s-c", "middle", 22);
    }
    for (let v = ys; v <= y1 + 1e-9; v += ys) {
      E("line", { x1: X(x0) - 7, x2: X(x0), y1: Y(v), y2: Y(v), class: "k-dim", "stroke-width": 2 }, g);
      lab(g, X(x0) - 12, Y(v) + 7, yf(v), "t-sous s-c", "end", 22);
    }
    if (xt) lab(g, X(x1) + 14, Y(0) + (xtx || 56), xt, "rc-l s-c", "end", 26);
    if (yt) lab(g, X(x0) + 14, Y(y1) - 22, yt, "rc-l s-c", "start", 26);
  }
  return { ...O, lab, titre, axes };
}
