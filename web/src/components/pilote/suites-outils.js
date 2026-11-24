/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Les suites numériques », séance 1 « La machine u_{n+1} = f(u_n) » : les outils et les données.
 *
 * Ce fichier ne dessine rien par lui-même. Il donne aux scènes et au script les fonctions f de la
 * leçon, les termes, les bornes, les limites et les seuils, TOUS calculés : aucune valeur affichée
 * n'est écrite à la main ailleurs. Les outils de format (nombres à la française, texte de scène à
 * mini-balisage) sont ceux de la leçon voisine, `exponentielle-outils.js` : des fonctions sans contenu
 * de leçon.
 *
 * SOURCES — [V] lu sur la source citée ; [S] source secondaire ; « à vérifier » : ne s'affiche pas.
 *  1. [V] Université de Lausanne, cours de pharmacologie, « Repeated administration »
 *     (https://sepia2.unil.ch/pharmacology/repeated-administration) : l'accumulation a lieu quand la
 *     dose est donnée avant que la précédente soit éliminée ; le niveau atteint un plateau ; le temps
 *     pour l'atteindre est fixé par la demi-vie. Le modèle de la leçon (« un comprimé chaque matin ; en
 *     24 heures, le corps en élimine la moitié ») est un MODÈLE SIMPLIFIÉ, écrit comme tel à l'écran ;
 *     aucun médicament n'est nommé. La règle « environ cinq demi-vies » ne s'affiche pas (source non
 *     lue : à vérifier).
 *  2. [V] T. R. Malthus, An Essay on the Principle of Population (1798), chapitre 2 (transcription :
 *     https://www.marxists.org/reference/subject/economics/malthus/ch02.htm) : une population qui double
 *     tous les 25 ans (1, 2, 4, 8…), des subsistances qui augmentent d'une même quantité (1, 2, 3, 4…) ;
 *     « in two centuries and a quarter, the population would be to the means of subsistence as 512 to
 *     10 ». Aucune phrase à l'écran sur la justesse de sa prédiction (non vérifiée).
 *  3. [V] al-Karaji (953 - vers 1029), MacTutor (https://mathshistory.st-andrews.ac.uk/Biographies/Al-Karaji/) :
 *     « a form of mathematical induction », « not induction proper ». Fiche de mot seulement. Pascal
 *     (1654, selon la bible) : non vérifié, ne s'affiche pas.
 *  4. [V] Sujets de bac, docs/sujets/maths/fonction-exponentielle.md (SVT et Sciences Physiques,
 *     2022, session normale, problème de 8,5 points, question 8 : a) 0,5 ; b) 0,5 ; c) 0,25 ; d) 0,5 ;
 *     statut « corrigé (conforme au scan) ») et fonction-logarithme.md (SVT et Sciences Physiques,
 *     2019, session normale, problème de 11 points, deuxième partie : 1 a) 0,5 ; 1 b) 0,5 ; 1 c) 0,5 ;
 *     2) 0,75 ; statut vérifié).
 *  5. [V] Programme officiel : « théorème de convergence monotone » dit admis à l'écran (décision du
 *     relecteur, spec §9.6). « Croissante et non majorée tend vers +∞ » rappelé en une phrase. Les deux
 *     sont à confirmer contre le programme officiel avant la mise en ligne.
 * Capacités du cadre 2025 : docs/referentiel/maths-sexp.yaml (1.1.1 à 1.1.5) et maths-sm.yaml (1.1.1 à 1.1.5).
 */
import { NB, fr, ent, M, TN, outilsScene } from "./exponentielle-outils";
export { NB, fr, ent, M, TN, outilsScene };

/** un nombre entier signé, avec le vrai signe moins */
export const sg = (x) => (x < 0 ? "−" : "") + ent(Math.abs(x));
/** la suite itérée : u_0, …, u_n */
export function orbite(f, u0, n) {
  const t = [u0];
  for (let i = 0; i < n; i++) t.push(f(t[i]));
  return t;
}
/** le plus petit entier n tel que c·q^n ≤ eps (0 < q < 1), calculé par essais ; le quotient des ln en donne le réel */
export function seuil(c, q, eps) {
  let n = 0;
  while (c * Math.pow(q, n) > eps && n < 10000) n++;
  return n;
}
/** le réel n* = ln(eps/c)/ln q : n ≥ n* (le sens est renversé car ln q < 0) */
export const seuilReel = (c, q, eps) => Math.log(eps / c) / Math.log(q);
/** une racine de g sur [a ; b] par dichotomie (g change de signe) */
export function racine(g, a, b) {
  let lo = a, hi = b;
  const sa = Math.sign(g(a));
  for (let i = 0; i < 200; i++) {
    const m = (lo + hi) / 2;
    if (Math.sign(g(m)) === sa) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

/* ---------- les fonctions de la leçon (la liste fermée de la scène `toile`) ---------- */
/**
 * Chaque fonction : f ; l'étiquette de la courbe (mini-balisage de scène) ; la fenêtre {x0,x1,y0,y1}
 * du repère orthonormé (y0 ≤ 0 : les termes se reportent sur l'axe horizontal) ; la fenêtre du zoom ;
 * les points fixes (calculés) ; l'intervalle I stable, s'il y en a un.
 */
export const LN4 = Math.log(4);
export const f_dose = (x) => x / 2 + 1;                                         // une dose chaque matin, la moitié éliminée
export const f_expm = (x) => Math.exp(-x);                                      // la spirale
export const f_pas = (x) => x + Math.exp(-x);                                   // les pas rétrécissent
export const f_double = (x) => 2 * x - 1;                                       // le point fixe qui n'attire pas
export const f_bac22 = (x) => x * Math.pow(Math.exp(x / 2) - 1, 2);             // sujet 2022, question 8
export const f_bac19 = (x) => x + 0.5 - Math.log(x) + 0.5 * Math.pow(Math.log(x), 2); // sujet 2019, deuxième partie
export const FIX_EXPM = racine((x) => Math.exp(-x) - x, 0, 1);                  // ≈ 0,5671
export const FONCS = {
  dose: { f: f_dose, lab: "½*x* + 1", win: { x0: -1.5, x1: 6.5, y0: -1.5, y1: 6.5 }, zw: { x0: 1.7, x1: 2.05, y0: 1.7, y1: 2.05 }, zc: { x0: -1.2, x1: 2.6, y0: -0.5, y1: 2.6 }, fix: [2], I: [0, 2], J: [f_dose(0), f_dose(2)] },
  expm: { f: f_expm, lab: "e^{−*x*}", win: { x0: -0.25, x1: 1.45, y0: -0.25, y1: 1.45 }, zw: null, fix: [FIX_EXPM], I: null },
  pas: { lettre: "w", f: f_pas, lab: "*x* + e^{−*x*}", win: { x0: -0.3, x1: 4.3, y0: -0.3, y1: 4.3 }, zw: null, fix: [], I: null },
  double: { lettre: "s", f: f_double, lab: "2*x* − 1", win: { x0: -0.6, x1: 10.6, y0: -1.2, y1: 10.6 }, zw: null, fix: [1], I: null },
  bac22: { f: f_bac22, lab: "*x*(e^{*x*/2} − 1)^{2}", win: { x0: -0.2, x1: 1.6, y0: -0.2, y1: 1.6 }, zw: null, fix: [0, LN4], I: [0, LN4] },
  bac19: { f: f_bac19, lab: "*x* + ½ − ln *x* + ½(ln *x*)^{2}", win: { x0: 0.5, x1: 3.1, y0: -0.35, y1: 3.1 }, zw: null, fix: [Math.E], I: [1, Math.E] },
};

/* ---------- la leçon : savoir (partie 0) ---------- */
export const SAV = { u0: 3, q: 2, n: 5 };
export const SAV_U5 = SAV.u0 * Math.pow(SAV.q, SAV.n);               // 3 × 2⁵ = 96
export const SAV_ARITH = SAV.u0 + SAV.n * SAV.q;                     // le leurre « arithmétique » : 3 + 5 × 2 = 13
export const SAV_TROP = SAV.u0 * Math.pow(SAV.q, SAV.n + 1);         // un pas de trop : 3 × 2⁶ = 192

/* ---------- l'énigme (partie 1) : un comprimé chaque matin, la moitié éliminée en 24 heures ---------- */
export const U_DOSE = orbite(f_dose, 0, 40);                          // u_0 = 0, u_1 = 1, u_2 = 1,5…
export const PLATEAU = 2;                                             // ℓ = f(ℓ) : ½ℓ + 1 = ℓ
export const DOSE_U2_OUBLI = U_DOSE[1] + 1;                           // le leurre : chaque jour ajoute 1 sans élimination (1 + 1)
export const DOSE_U2_ORDRE = (U_DOSE[1] + 1) / 2;                     // le leurre : ½(1 + 1) = 1 (ajouter puis diviser)
export const JOURS = [1, 2, 3, 4, 5, 7, 10, 15, 20, 30];              // les crans du curseur de l'énigme
export const SEUIL_JOURS = 20;                                        // n ≥ 20 : le curseur est validé
export const PLAFOND_DOSE = 2;
/** ce que dit la dent de scie au sommet du jour n : u_n ; au creux : u_n / 2 (avant la prise suivante) */
export const creux = (n) => U_DOSE[n] / 2;
export const PAS_ASSEZ = { n: 30, max: Math.max(...U_DOSE.slice(0, 31)) };   // 31 termes u_0..u_30, tous < 2
/** t_n = 0,1 × 1,5ⁿ : t_0 à t_7 < 2, puis t_8 > 2 (la lettre t ne sert qu'à cette suite) */
export const tgeo = (n) => 0.1 * Math.pow(1.5, n);
export const TG7 = tgeo(7), TG8 = tgeo(8);

/* ---------- la machine (partie 2) ---------- */
export const U_DEPART5 = orbite(f_dose, 5, 40);                       // u_0 = 5 : décroît vers 2
export const CRANS_U0 = [-1, 0, 1, 3, 5, 6];                          // les départs du curseur
export const U10 = (u0) => orbite(f_dose, u0, 10)[10];
export const U0_MARCHES = 12;                                         // marches tracées de l'énigme

/* ---------- la récurrence (partie 3) ---------- */
export const HEREDITE_CONTRE = f_dose(3);                              // ½x + 1 < 2 pour tout x ? faux : x = 3 donne 2,5
export const U_DEPART5_1 = U_DEPART5[1];                               // 3,5 (u_n ≥ 5 : l'hérédité ne marche pas)

/* ---------- le sens de variation (partie 4) ---------- */
export const U_DEPART5_DEC = U_DEPART5[1] < U_DEPART5[0] && U_DEPART5[2] < U_DEPART5[1];   // u_0 = 5 : décroissante (rappel)
export const SPIRALE = orbite(f_expm, 0, 12);                          // 0 ; 1 ; 0,368 ; 0,692 ; 0,500 ; 0,606…

/* ---------- converger (partie 5) ---------- */
export const TROIS = 3;                                                // un majorant de plus : u_n < 3
/** w_n+1 = w_n + e^{−w_n}, w_0 = 0 : lente, mais sans fin */
export function pasW(n) { let x = 0; for (let i = 0; i < n; i++) x += Math.exp(-x); return x; }
export const PAS_N = [10, 1000, 1000000];
export const PAS_V = PAS_N.map(pasW);                                  // w_10, w_1000, w_1000000
export const PAS_LN = PAS_N.map((n) => Math.log(n + 1));               // w_n ≥ ln(n + 1)

/* ---------- la limite (partie 6) ---------- */
export const S_DOUBLE = orbite(f_double, 2, 5);                        // s_0 = 2 ; 3 ; 5 ; 9 ; 17 : s_n = 1 + 2ⁿ
export const LN_LIM = Math.log(2);                                     // ln est continue en 2 : ≈ 0,69

/* ---------- les suites de référence (partie 7) ---------- */
export const DEMI = (n) => Math.pow(0.5, n);
export const MALTHUS = { periodes: 9, pop: Math.pow(2, 9), vivres: 1 + 9 };   // 512 à 10 (Malthus, 1798, chapitre 2)
export const GEO_10 = DEMI(10);                                        // (½)^10 ≈ 0,001

/** le seuil par ln : n ln ½ ≤ ln 0,01 donne n ≥ ln 0,01 / ln ½ (le sens est renversé) ; le leurre qui garde le sens, et celui qui prend ln 2 */
export const LN001_LNDEMI = Math.log(0.01) / Math.log(0.5);            // 6,64
export const LN001_LN2 = Math.log(0.01) / Math.log(2);                 // −6,64 : vrai dès n = 0, le leurre de ln ½ = ln 2

/* ---------- le retour (partie 8) ---------- */
export const U_EXPLICITE = (n) => 2 - 2 * Math.pow(0.5, n);            // u_n = 2 − 2(½)ⁿ
export const SEUIL = { eps: 0.02, n: seuil(2, 0.5, 0.02), reel: seuilReel(2, 0.5, 0.02) };   // n = 7, 6,64
export const LN100_LN2 = Math.log(100) / Math.log(2);                  // 6,64
export const LN2_SM = 0.69, LN10_SM = 2.30;                            // ce que donne l'énoncé en SM (sans calculatrice)
export const LN100_SM = (2 * LN10_SM) / LN2_SM;                        // 6,67 : le même 7ᵉ jour
export const ECART6 = 2 - U_DOSE[6], ECART7 = 2 - U_DOSE[7];           // 0,03125 > 0,02 ≥ 0,015625
export const DOSE2 = { f: (x) => x / 2 + 2, plateau: 4, eps: 0.04 };
export const SEUIL2 = seuil(4, 0.5, DOSE2.eps);                        // le même 7ᵉ jour
export const DOSE2_FAUX = { deux: 2, trois: 3 };

/* ---------- le bilan : l'hérédité sur une fonction neuve (q2) ---------- */
/** f(x) = √(x + 2), u_0 = 0, P(n) : 0 ≤ u_n ≤ 2 ; f est croissante, f(0) = √2, f(2) = 2 ; f(7) = 3 > 2 contredit « f(x) ≤ 2 pour tout x » */
export const f_neuve = (x) => Math.sqrt(x + 2);
export const NEUVE = { f0: f_neuve(0), f2: f_neuve(2), f7: f_neuve(7), u: orbite(f_neuve, 0, 12) };

/* ---------- le bac (partie 9) ---------- */
export const U_BAC22 = orbite(f_bac22, 1, 6);                          // 1 ; 0,421 ; … : décroissante
export const BAC22 = { f1: f_bac22(1), f2: f_bac22(2), fLn4: f_bac22(LN4), ln4: LN4 };
export const U_BAC19 = orbite(f_bac19, 1, 12);                         // 1 ; 1,5 ; 1,677 ; 1,793… : croissante vers e
export const BAC19 = { f1: f_bac19(1), fe: f_bac19(Math.E) };
export const FIX_BAC22 = [0, LN4];
/** f(x) − x pour le sujet 2022, forme factorisée : x e^{x/2}(e^{x/2} − 2) */
export const diff22 = (x) => x * Math.exp(x / 2) * (Math.exp(x / 2) - 2);
/** f(x) − x pour le sujet 2019 : ½(ln x − 1)² */
export const diff19 = (x) => 0.5 * Math.pow(Math.log(x) - 1, 2);
