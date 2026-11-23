/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « fonction exponentielle », séance 1 « Pourquoi exp » : les outils et les données.
 *
 * Ce fichier ne dessine rien par lui-même. Il donne aux scènes et au script les nombres à la
 * française, le texte de scène à mini-balisage (un exposant est un <tspan> décalé, jamais un
 * caractère Unicode), les axes et les courbes, et TOUS les nombres que la leçon affiche :
 * aucune valeur n'est écrite à la main ailleurs, chacune sort d'un calcul d'ici.
 *
 * SOURCES — [V] vérifié sur la source citée, [S] source secondaire.
 *  1. [V] Jacob Bernoulli, 1683 : en étudiant les intérêts composés, il cherche la limite de
 *     (1 + 1/n)^n. MacTutor, « The number e » :
 *     https://mathshistory.st-andrews.ac.uk/HistTopics/e/
 *     Le cadrage « 1 prêté à 100 % par an » est [S] (exemple de Wikipédia). Aucune borne
 *     chiffrée ni aucun lieu n'est montré à l'élève (décision du relecteur, spec §9).
 *  2. [V] Sujet de bac, Sciences expérimentales 2021, session normale, exercice 1,
 *     questions 1 a) et 1 b), 0,5 point chacune : résoudre e^{2x} − 4e^x + 3 = 0, puis
 *     e^{2x} − 4e^x + 3 ≤ 0 (docs/sujets/maths/limites-continuite.md, statut vérifié).
 *  3. Le second exemple du bac (e^{2x} − 3e^x − 4 = 0) est un « exercice type », non tiré d'un sujet.
 * Capacités du cadre 2025 : docs/referentiel/maths-sexp.yaml (1.2.20, 1.2.21, 1.2.22) et
 * maths-sm.yaml (1.3.13, 1.3.14, 1.3.16).
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
/** 2,4 × 10^{7} (texte de scène : l'exposant devient un tspan) */
export const sciF = (x, d = 1) => { const [m, e] = mantisse(x, d); return `${fr(m, d)} × 10^{${e < 0 ? "−" : ""}${Math.abs(e)}}`; };
/** une formule en ligne dans le panneau (rendue par KaTeX) avec son texte de repli */
export const M = (tex, alt) => `<span class="m" data-tex="${String(tex).replace(/"/g, "&quot;")}">${alt ?? tex}</span>`;
/** un nombre pour KaTeX : 2{,}25 */
export const TN = (x, d = 2) => fr(x, d).replace(/,/g, "{,}").replace(/ /g, "\\,").replace("−", "-");

/* ---------- l'énigme de Bernoulli ---------- */
/** le capital au bout d'un an : 1 prêté à 100 % par an, capitalisé n fois (chaque période : × (1 + 1/n)) */
export const cap = (n) => Math.pow(1 + 1 / n, n);
/** les crans du curseur de l'énigme */
export const CRANS = [1, 2, 3, 4, 6, 12, 52, 365, 1000, 8760, 525600];
/** n ≥ SEUIL_N : le capital est à moins de 0,004 de son plafond (l'étape du curseur se valide) */
export const SEUIL_N = 365;
/** le nombre de décimales utiles pour lire le capital */
export const decCap = (n) => (n < 1000 ? 3 : n < 100000 ? 4 : 5);
export const N_TAB = [1, 2, 4, 12, 52, 365];
export const SEMESTRE = 1 + 1 / 2;                    // après six mois : 1,5
export const SEMESTRE_FIN = SEMESTRE * SEMESTRE;      // 2,25
export const CENT_PAS = Math.pow(1.01, 100);          // 1,01^100 : les pas de 1 % de la leçon ln
export const SOIXANTE_DIX = Math.pow(1.01, 70);       // 2 est au pas 70 dans la leçon ln
export const GAIN_PLAFOND = cap(525600) - cap(SEUIL_N);

/* ---------- ln : toute valeur réelle, une seule fois ---------- */
export const PUISS_2 = 145;                           // ln(2^145) = 145 ln 2 > 100
export const LN2_145 = PUISS_2 * Math.LN2;            // ≈ 100,5
export const LN2 = Math.LN2;

/* ---------- le miroir ---------- */
export const A_PT = 2;                                // le point (2 ; ln 2) de ln
export const B_TAN = 4;                               // la tangente à ln en (4 ; ln 4)
export const LNB = Math.log(B_TAN);
export const PENTE_LN = 1 / B_TAN;                    // ln′(4) = 1/4
export const PENTE_EXP = B_TAN;                       // exp′(ln 4) = 4 = exp(ln 4)

/* ---------- les règles, les équations ---------- */
export const P_SOMME = [2, 3];                        // le piège du bilan : e^{2+3}
export const E3 = Math.exp(3);                        // ≈ 20,09
export const TROIS_E = Math.pow(3, Math.E);           // ≈ 19,81
export const EXP_MOINS1 = Math.exp(-1);               // ≈ 0,37
export const LN5 = Math.log(5);                       // ≈ 1,61
export const R_RAPPEL = Math.exp(3 * Math.LN2);       // e^{3 ln 2} = 8
export const X_RAPPEL = 3 * Math.LN2;
/** e^{ax+b} < e^{cx+d} ⇔ (a − c)x < d − b : la borne, pour a > c (signe de a − c positif) */
export const borneIneq = (a, b, c, d) => (d - b) / (a - c);
export const BORNE = borneIneq(2, -1, 1, 3);          // e^{2x−1} < e^{x+3} ⇔ x < 4
/** eˣ·eʸ = e^p et eˣ/eʸ = e^q : x = (p + q)/2, y = (p − q)/2 */
export const systeme = (p, q) => [(p + q) / 2, (p - q) / 2];
export const [SYS_X, SYS_Y] = systeme(5, 1);

/* ---------- la dérivée ---------- */
export const E2 = Math.exp(2);                        // pente de exp en 2 : ≈ 7,39
export const DEUX_E = 2 * Math.E;                     // le leurre 2e ≈ 5,44
export const taux = (h) => (Math.exp(h) - 1) / h;     // (e^h − 1)/h
export const H_DEBUT = 1.5, H_FIN = 0.05;
export const EXP_ECART = Math.exp(-1) - 1;            // e^{−1} − 1 ≈ −0,63 (g′ en −1)
export const E_MOINS_1 = Math.E - 1;                  // g′(1) ≈ 1,72

/* ---------- la course eˣ / x ---------- */
export const R_COURSE = [1, 2, 5, 10, 15, 20];
export const ratio = (x) => Math.exp(x) / x;
export const fG = (v) => (v < 10 ? fr(v, 2) : v < 1000 ? fr(v, 1) : v < 1e6 ? ent(v) : sciF(v, 1));

/* ---------- le retour à l'énigme ---------- */
export const E_005 = Math.exp(0.05);                  // 1 à 5 % par an, capitalisé à chaque instant
export const E_FOIS_005 = Math.E * 0.05;              // le leurre e × 0,05

/* ---------- le bac ---------- */
/** les racines de at² + bt + c : { delta, r1, r2 } (r1 ≤ r2) */
export function racines(a, b, c) {
  const delta = b * b - 4 * a * c, s = Math.sqrt(delta);
  return { delta, r1: (-b - s) / (2 * a), r2: (-b + s) / (2 * a) };
}
export const BAC1 = { a: 1, b: -4, c: 3 };            // e^{2x} − 4e^x + 3 = 0 (SExp 2021 N, Q1a)
export const BAC2 = { a: 1, b: -3, c: -4 };           // e^{2x} − 3e^x − 4 = 0 (exercice type)
export const R1 = racines(BAC1.a, BAC1.b, BAC1.c);    // Δ = 4 ; t = 1 ou 3
export const R2 = racines(BAC2.a, BAC2.b, BAC2.c);    // Δ = 25 ; t = −1 ou 4
export const LN3 = Math.log(3), LN2_ = Math.log(2);

/* ---------- les outils de scène (liés au noyau) ---------- */
export function outilsScene(ctx) {
  const { E } = ctx;
  const ty = (s) => ctx.ty(s).replace(/ %/g, NB + "%");
  // Texte SVG à mini-balisage : *x* italique, ^{…} exposant, _{…} indice (tspan décalé, en px de la
  // taille `fs` de la classe : Firefox ignore baseline-shift).
  // l'italique reste possible dans un exposant ou un indice : e^{2*x*−1}
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
  const TAILLE = { "t-titre": 18, "t-sous": 16, "t-lab": 18, "t-lab2": 20, "t-cle": 26, "t-big": 30, "t-big2": 30, "t-huge": 60, "t-tick": 15 };
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
  /** le tracé d'une fonction, de x0 à x1, en n points (y plafonné pour ne pas sortir de la scène) */
  function courbe(fn, x0, x1, X, Y, n = 240, ymin = -1e9, ymax = 1e9) {
    let d = "";
    for (let i = 0; i <= n; i++) {
      const x = x0 + ((x1 - x0) * i) / n, y = Math.max(ymin, Math.min(ymax, fn(x)));
      d += (i ? "L" : "M") + X(x).toFixed(1) + " " + Y(y).toFixed(1);
    }
    return d;
  }
  return { fx, setFx, titre, courbe, ty };
}
