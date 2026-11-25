// @ts-nocheck
/**
 * Les exercices de la leçon « Transformations non totales » (V3). Format : voir modele.js.
 * Chaque réponse est calculée ici, à partir des fonctions de transformations-non-totales-outils.js ; le
 * vérificateur (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages. Un leurre calculé qui retombe sur
 * la bonne réponse (à deux tolérances près) est retiré du tirage (`pieges`) ; et les tirages où deux
 * grandeurs de natures différentes ont le même chiffre, ou où le pH arrondi fait changer une valeur « montrer
 * que », sont REJETÉS (`tire`) : la règle B3, « un leurre mène toujours à un résultat faux ».
 *
 * Les pH « mesurés » sont CALCULÉS à partir d'un pK_A de référence (ceux des sujets : 4,79 éthanoïque, 2023 ;
 * 4,89 propanoïque, recalculé du sujet 2022 ; 4,2 benzoïque et 3,75 méthanoïque, table du sujet 2021), puis
 * arrondis à deux décimales (une pour la forme 2022). La réponse se calcule depuis le pH AFFICHÉ, jamais depuis
 * le pK_A, qui n'est jamais montré. Aucun gabarit ne calcule K, K_A, pK_A, ni τ d'une base, ni τ par la
 * conductivité (hors programme du chapitre).
 *
 * Capacités : pc-pc / pc-sm 2.2.1.x ; pc-svt 2.2.3.x (2.2.1.1 à 2.2.1.5 → 2.2.3.1 à 2.2.3.5 ; 2.2.1.6, l'équilibre
 * microscopique, n'existe pas en SVT dans ce chapitre : le gabarit qui le travaille porte `filieres: ["PC", "SM"]` ;
 * 2.2.3.6, l'influence de la dilution, n'est une capacité qu'en SVT : le gabarit est un enrichissement en PC et SM).
 * Les sujets 2022 et 2023 sont rejoués avec leurs valeurs imprimées une fois sur trois.
 */
import { frTex, sciTex } from "./nombre.js";
import { PKA, phReel, hDe, tauDePh, S22, S23, S21 } from "../transformations-non-totales-outils.js";

/** les capacités d'un gabarit dans les trois cadres */
const CAPR = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`, `pc-svt 2.2.3.${id.split(".")[3]}`]);
const CAPR_PCSM = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`]);

/** retire les pièges qui tombent dans la tolérance de la bonne réponse (ou qui se répètent) */
function pieges(rep, tol, liste) {
  const seuil = tol.abs != null ? tol.abs : Math.abs(rep) * tol.rel;
  const garde = [];
  for (const p of liste) {
    if (!Number.isFinite(p.v)) continue;
    if (Math.abs(p.v - rep) <= 2 * seuil) continue;
    if (garde.some((q) => Math.abs(q.v - p.v) <= (tol.abs != null ? tol.abs : Math.abs(q.v) * tol.rel))) continue;
    garde.push(p);
  }
  return garde;
}
/** un tirage accepté : on retire jusqu'à 80 fois ; `ok` rejette les coïncidences */
function tire(f, ok) {
  let t = f();
  for (let i = 0; i < 80 && !ok(t); i++) t = f();
  return t;
}
const sci = (x, c = 2) => sciTex(x, c);
/** un nombre à n chiffres significatifs, pour KaTeX */
const num = (x, n = 3) => {
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-2)) return sci(x, n);
  const e = Math.floor(Math.log10(a || 1));
  return frTex(x, Math.max(0, n - 1 - e));
};
const pcent = (x) => num(x * 100, 3);
const m = (s) => `\\mathrm{${s}}`;

const ACIDES = [
  { id: "ethan", nom: "l’acide éthanoïque", AH: "CH_3COOH", A: "CH_3COO^-", pka: PKA.ethan },
  { id: "propan", nom: "l’acide propanoïque", AH: "C_2H_5COOH", A: "C_2H_5COO^-", pka: PKA.propan },
  { id: "benzo", nom: "l’acide benzoïque", AH: "C_6H_5COOH", A: "C_6H_5COO^-", pka: PKA.benzo },
  { id: "metha", nom: "l’acide méthanoïque", AH: "HCOOH", A: "HCOO^-", pka: PKA.metha },
];
const COUPLES = [...ACIDES.map((a) => ({ acide: a.AH, base: a.A })), { acide: "NH_4^+", base: "NH_3" }, { acide: "H_3O^+", base: "H_2O" }];
const aq = (e) => `${e}_{(aq)}`;
const eq = (a, fleche = "\\rightleftarrows") => `$${m(aq(a.AH))}+${m("H_2O_{(l)}")}${fleche}${m(aq(a.A))}+${m("H_3O^+_{(aq)}")}$`;
const CS = [1, 2, 5], KS = [-3, -2, -1], VS = [50, 100, 200, 250, 500];
/** un tirage de solution d'acide faible : C, V, le pH affiché (calculé), τ ; rejeté si le pH sort de 2 à 5,5 ou si τ est trop proche de 1 */
function solution(h, { dec = 2, tauMax = 0.6, acide = null } = {}) {
  return tire(() => {
    const a = acide || h.pick(ACIDES), C = h.pick(CS) * 10 ** h.pick(KS), V = h.pick(VS);
    const pH = Number(phReel(C, a.pka).toFixed(dec));
    return { a, C, V, pH, h: hDe(pH), tau: tauDePh(C, pH) };
  }, (t) => t.pH >= 2 && t.pH <= 5.5 && t.tau <= tauMax && t.tau >= 0.008);
}
const unCas = (t) => `$C = ${num(t.C, 2)}\\ \\text{mol·L}^{-1}$`;

export const EXERCICES = [
  /* 1 : Brønsted : acide, base, couple, rôle de l'eau */
  {
    id: "tnt-bronsted",
    titre: "Acide, base, couple : Brønsted et le rôle de l’eau",
    niveau: 1,
    capacites: CAPR("2.2.1.1"),
    erreurs: ["proton ajouté au lieu de retiré", "base = HO⁻ (+3)", "ordre base/acide", "eau à rôle fixe (+5)", "eau solvant seulement"],
    gen(h) {
      const c = h.pick(COUPLES), faux = c.base === "H_2O" ? "H_3O^+" : "HO^-";
      const eauBase = h.int(0, 1) === 0;
      return {
        enonce: `<p>Selon Brønsted, un acide est une espèce capable de céder un proton $\\mathrm{H^+}$, une base une espèce capable d’en capter un. On considère le couple $${m(c.acide)}/${m(c.base)}$.</p>`,
        questions: [
          { type: "qcm", q: `Quelle espèce reste quand $${m(c.acide)}$ a cédé un proton ?`, options: h.melange([
            { t: `$${m(c.base)}$`, ok: true },
            { t: `$${m(c.acide)}$ avec un proton de plus (charge augmentée de 1)`, fb: "Tu as ajouté un proton au lieu d’en retirer. Céder, c’est perdre $\\mathrm{H^+}$ : la charge baisse de 1.", erreur: "proton ajouté au lieu de retiré" },
            { t: `$${m(faux)}$`, fb: "Tu as pris l’ion hydroxyde pour la base de tous les acides. La base qui reste garde tout l’acide, sauf un $\\mathrm{H^+}$.", erreur: "base = HO⁻ (+3)" }]) },
          { type: "qcm", q: "Comment s’écrit ce couple ?", options: h.melange([
            { t: `$${m(c.acide)}/${m(c.base)}$ : l’acide d’abord`, ok: true },
            { t: `$${m(c.base)}/${m(c.acide)}$ : la base d’abord`, fb: "Tu as écrit la base avant l’acide. Un couple s’écrit acide/base.", erreur: "ordre base/acide" },
            { t: `$${m(c.acide)}/${m(faux)}$ : l’acide avec l’ion hydroxyde`, fb: "Tu as pris l’ion hydroxyde pour la base du couple. La base est l’espèce qui reste quand l’acide a cédé son proton.", erreur: "base = HO⁻ (+3)" }]) },
          eauBase
            ? { type: "qcm", q: `Dans la réaction de $${m("CH_3COOH")}$ avec l’eau, l’eau joue le rôle…`, options: h.melange([
              { t: "de base : elle capte un proton", ok: true },
              { t: "d’acide : elle cède un proton", fb: "Tu as gardé le rôle d’acide de l’eau pour une réaction où elle capte le proton. Face à un acide, l’eau est la base.", erreur: "eau à rôle fixe (+5)" },
              { t: "de simple solvant, sans réagir", fb: "Tu as pris l’eau pour un décor. Elle capte un proton et devient $\\mathrm{H_3O^+}$ : elle a réagi.", erreur: "eau solvant seulement" }]) }
            : { type: "qcm", q: `Dans la réaction de $${m("NH_3")}$ avec l’eau, qui donne $${m("NH_4^+")}$ et $${m("HO^-")}$, l’eau joue le rôle…`, options: h.melange([
              { t: "d’acide : elle cède un proton", ok: true },
              { t: "de base : elle capte un proton", fb: "Tu as gardé le rôle de base de l’eau. Ici, elle perd un $\\mathrm{H^+}$ et devient $\\mathrm{HO^-}$ : elle est acide.", erreur: "eau à rôle fixe (+5)" },
              { t: "de simple solvant, sans réagir", fb: "Tu as pris l’eau pour un décor. Elle perd un $\\mathrm{H^+}$ : elle a réagi.", erreur: "eau solvant seulement" }]) },
        ],
        correction: [
          { t: `Une base est ce qui reste d’un acide quand il a cédé un proton : la base de $${m(c.acide)}$ est $${m(c.base)}$.` },
          { tex: `${m(c.acide)}\\rightleftarrows ${m(c.base)}+${m("H^+")}`, r: "La demi-équation du couple : un acide, un proton, sa base." },
          { t: "L’eau est un ampholyte : base dans le couple $\\mathrm{H_3O^+/H_2O}$, acide dans le couple $\\mathrm{H_2O/HO^-}$." },
        ],
      };
    },
  },

  /* 2 : l'équation d'un acide avec l'eau, et ses deux couples */
  {
    id: "tnt-equation",
    titre: "L’équation de la réaction d’un acide avec l’eau, et ses deux couples",
    niveau: 1,
    capacites: CAPR("2.2.1.2"),
    erreurs: ["demi-équation (+4)", "équation de dosage (+9)", "couples croisés (+8)", "charges non équilibrées"],
    gen(h) {
      const a = h.pick(ACIDES);
      return {
        enonce: `<p>On dissout ${a.nom}, de formule $${m(a.AH)}$, dans l’eau. Le couple de l’acide est $${m(a.AH)}/${m(a.A)}$.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’équation de la réaction de l’acide avec l’eau ?", options: h.melange([
            { t: eq(a), ok: true },
            { t: `$${m(aq(a.AH))}\\rightleftarrows ${m(aq(a.A))}+${m("H^+_{(aq)}")}$`, fb: "Tu as écrit la demi-équation du couple. Dans l’équation de la réaction, le proton passe à l’eau, qui devient $\\mathrm{H_3O^+}$.", erreur: "demi-équation (+4)" },
            { t: `$${m(aq(a.AH))}+${m("HO^-_{(aq)}")}\\rightleftarrows ${m(aq(a.A))}+${m("H_2O_{(l)}")}$`, fb: "C’est l’équation du dosage par la soude, pas celle de la réaction avec l’eau. Ici, la base qui capte le proton est $\\mathrm{H_2O}$.", erreur: "équation de dosage (+9)" },
            { t: `$${m(aq(a.AH))}+${m("H_2O_{(l)}")}\\rightleftarrows ${m(aq(a.A))}+${m("H_3O_{(aq)}")}$`, fb: "Les charges ne s’équilibrent pas : l’espèce qui a capté un proton est l’ion $\\mathrm{H_3O^+}$, de charge $+1$.", erreur: "charges non équilibrées" }]) },
          { type: "qcm", q: "Quels sont les deux couples de cette réaction ?", options: h.melange([
            { t: `$${m(a.AH)}/${m(a.A)}$ et $${m("H_3O^+")}/${m("H_2O")}$`, ok: true },
            { t: `$${m(a.AH)}/${m("H_2O")}$ et $${m(a.A)}/${m("H_3O^+")}$`, fb: "Tu as mis les deux réactifs ensemble, puis les deux produits. Un couple, c’est un acide et l’espèce qu’il devient en cédant un proton.", erreur: "couples croisés (+8)" },
            { t: `$${m(a.AH)}/${m("H_3O^+")}$ et $${m("H_2O")}/${m(a.A)}$`, fb: "Tu as mis deux acides dans le même couple. Chaque couple a un acide et une base, qui diffèrent d’un $\\mathrm{H^+}$.", erreur: "couples croisés (+8)" }]) },
        ],
        correction: [
          { tex: `${m(a.AH)}\\rightleftarrows ${m(a.A)}+${m("H^+")}\\qquad ${m("H_2O")}+${m("H^+")}\\rightleftarrows ${m("H_3O^+")}`, r: "Les deux demi-équations : l’acide cède, l’eau capte." },
          { tex: `${m(aq(a.AH))}+${m("H_2O_{(l)}")}\\rightleftarrows ${m(aq(a.A))}+${m("H_3O^+_{(aq)}")}`, r: "On ajoute les deux demi-équations : le proton disparaît." },
        ],
      };
    },
  },

  /* 3 : pH et [H3O+] */
  {
    id: "tnt-ph",
    titre: "Le pH et la concentration en ions H₃O⁺",
    niveau: 1,
    capacites: CAPR("2.2.1.3"),
    erreurs: ["pH pris pour une concentration (+2)", "signe de l’exposant", "différence de pH lue comme un rapport (+2)", "pH négatif : signe perdu"],
    gen(h) {
      const T = tire(() => ({ pH: h.dec(2.0, 5.5, 1), p2: h.dec(2.0, 5.5, 1), a: h.dec(2.0, 4.0, 1), d: h.int(1, 2) }), (t) => Math.abs(t.pH - t.p2) >= 0.4 && t.a + t.d + 0.5 <= 6);
      const hh = hDe(T.pH), tol = { rel: 0.03 }, h2 = Number(hDe(T.p2).toPrecision(2));
      const pH2 = -Math.log10(h2), b = Number((T.a + T.d + h.int(0, 4) / 10).toFixed(1)), fois = 10 ** (b - T.a);
      return {
        enonce: `<p>Le pH d’une solution est lié à la concentration en ions oxonium par $[\\mathrm{H_3O^+}] = 10^{-\\mathrm{pH}}$, en mol·L⁻¹. La valeur du pH est donnée.</p>`,
        questions: [
          { type: "nombre", q: `Un pH vaut $${frTex(T.pH, 1)}$. Calcule $[\\mathrm{H_3O^+}]$, en mol·L⁻¹.`, reponse: hh, tol, unite: "mol·L⁻¹", indice: "Le pH n’a pas d’unité : $[\\mathrm{H_3O^+}] = 10^{-\\mathrm{pH}}$, avec le signe moins.",
            pieges: pieges(hh, tol, [{ v: T.pH, fb: "Tu as pris le pH pour une concentration. Le pH est un nombre sans unité : $[\\mathrm{H_3O^+}] = 10^{-\\mathrm{pH}}$.", erreur: "pH pris pour une concentration (+2)" }, { v: 10 ** T.pH, fb: "Tu as perdu le signe de l’exposant. Plus le pH est grand, moins il y a d’ions $\\mathrm{H_3O^+}$ : $10^{-\\mathrm{pH}}$.", erreur: "signe de l’exposant" }]) },
          { type: "nombre", q: `Une solution contient $[\\mathrm{H_3O^+}] = ${sci(h2, 2)}\\ \\text{mol·L}^{-1}$. Quel est son pH ?`, reponse: pH2, tol: { abs: 0.06 }, indice: "$[\\mathrm{H_3O^+}] = 10^{-\\mathrm{pH}}$ : le pH est l’opposé de l’exposant de dix, exposant compris avec la mantisse.",
            pieges: pieges(pH2, { abs: 0.06 }, [{ v: -pH2, fb: "Tu as gardé le signe de l’exposant. Le pH est positif ici : $10^{-\\mathrm{pH}}$ avec un pH de 3 donne $10^{-3}$.", erreur: "pH négatif : signe perdu" }, { v: h2, fb: "Tu as recopié la concentration. Le pH est un nombre sans unité, de l’ordre de 3, pas de $10^{-3}$.", erreur: "pH pris pour une concentration (+2)" }]) },
          { type: "nombre", q: `Une solution A a un pH de $${frTex(T.a, 1)}$, une solution B un pH de $${frTex(b, 1)}$. Combien de fois plus d’ions $\\mathrm{H_3O^+}$ la solution A contient-elle que B ?`, reponse: fois, tol, indice: "Chaque unité de pH de différence est un facteur 10 : compare $10^{-\\mathrm{pH_A}}$ et $10^{-\\mathrm{pH_B}}$.",
            pieges: pieges(fois, tol, [{ v: b - T.a, fb: "Tu as lu la différence des pH comme un rapport. Une unité de pH, c’est un facteur 10 sur $[\\mathrm{H_3O^+}]$.", erreur: "différence de pH lue comme un rapport (+2)" }, { v: b / T.a, fb: "Tu as divisé les pH : le pH n’est pas proportionnel à la concentration. Compare $10^{-\\mathrm{pH_A}}$ et $10^{-\\mathrm{pH_B}}$.", erreur: "différence de pH lue comme un rapport (+2)" }]) },
        ],
        correction: [
          { tex: `[\\mathrm{H_3O^+}] = 10^{-${frTex(T.pH, 1)}} = ${num(hh, 3)}\\ \\text{mol·L}^{-1}`, r: "À la calculatrice : $10^{-\\mathrm{pH}}$." },
          { tex: `\\mathrm{pH} = ${num(pH2, 3)}`, r: "Le pH est l’exposant de dix, changé de signe." },
          { tex: `\\dfrac{10^{-${frTex(T.a, 1)}}}{10^{-${frTex(b, 1)}}} = 10^{${frTex(b - T.a, 1)}} = ${num(fois, 3)}`, r: "Un facteur dix par unité de pH." },
        ],
      };
    },
  },

  /* 4 : le tableau d'avancement : x_max, la ligne finale */
  {
    id: "tnt-tableau",
    titre: "Le tableau d’avancement : x_max et la ligne finale",
    niveau: 2,
    capacites: CAPR("2.2.1.4"),
    erreurs: ["eau limitante (+6)", "V en mL (+7)", "x_f dans la colonne de l’acide (+10)", "C divisée par V (+7)"],
    gen(h) {
      const T = solution(h, { tauMax: 0.9 });
      const V = T.V / 1000, xmax = T.C * V, tol = { rel: 0.02 };
      return {
        enonce: `<p>On dissout ${T.a.nom} $${m(T.a.AH)}$, noté $\\mathrm{AH}$, dans de l’eau pour obtenir un volume $V = ${num(T.V, 3)}\\ \\text{mL}$ de solution, de concentration ${unCas(T)}. La réaction avec l’eau est $\\mathrm{AH + H_2O \\rightleftarrows A^- + H_3O^+}$.</p>`,
        questions: [
          { type: "qcm", q: "Dans la ligne « état final » du tableau, la quantité de $\\mathrm{AH}$ vaut…", options: h.melange([
            { t: "$C\\,V - x_\\mathrm{f}$ : l’acide a perdu ce qui a réagi", ok: true },
            { t: "$x_\\mathrm{f}$ : la quantité formée", fb: "Tu as mis dans la colonne de l’acide ce qui s’est formé. $x_\\mathrm{f}$ est la quantité de $\\mathrm{A^-}$ et de $\\mathrm{H_3O^+}$ formées : l’acide en a perdu autant.", erreur: "x_f dans la colonne de l’acide (+10)" },
            { t: "$C\\,V$ : l’acide n’a pas changé", fb: "Tu as laissé l’acide inchangé. Ce qui a réagi est retiré : $C\\,V - x_\\mathrm{f}$.", erreur: "x_f dans la colonne de l’acide (+10)" }]) },
          { type: "qcm", q: "Quel est le réactif limitant ?", options: h.melange([
            { t: "$\\mathrm{AH}$ : l’eau est le solvant, en excès", ok: true },
            { t: "$\\mathrm{H_2O}$ : l’eau manquerait la première", fb: "Tu as cherché le réactif limitant du côté de l’eau. L’eau est le solvant, en excès : seul $\\mathrm{AH}$ peut limiter.", erreur: "eau limitante (+6)" }]) },
          { type: "nombre", q: "Calcule l’avancement maximal $x_\\mathrm{max}$, en mol.", reponse: xmax, tol, unite: "mol", indice: "$x_\\mathrm{max} = C\\,V$, avec $V$ en litres.",
            pieges: pieges(xmax, tol, [{ v: T.C * T.V, fb: "Tu as laissé $V$ en mL. Convertis en litres avant de multiplier : $x_\\mathrm{max} = C\\,V$.", erreur: "V en mL (+7)" }, { v: T.C / V, fb: "Tu as divisé $C$ par $V$. Une quantité de matière est un produit : $x_\\mathrm{max} = C\\,V$.", erreur: "C divisée par V (+7)" }]) },
        ],
        correction: [
          { tex: `n(\\mathrm{AH})_\\mathrm{f} = C\\,V - x_\\mathrm{f}`, r: "Ligne finale : l’acide perd $x_\\mathrm{f}$, $\\mathrm{A^-}$ et $\\mathrm{H_3O^+}$ en gagnent autant." },
          { tex: `x_\\mathrm{max} = C\\,V = ${num(T.C, 3)} \\times ${num(V, 3)} = ${num(xmax, 3)}\\ \\text{mol}`, r: "$\\mathrm{AH}$ est le réactif limitant : il s’épuise si $x = x_\\mathrm{max}$." },
        ],
      };
    },
  },

  /* 5 : x_f par le pH, comparé à x_max */
  {
    id: "tnt-xf",
    titre: "L’avancement final par le pH, comparé à l’avancement maximal",
    niveau: 2,
    capacites: CAPR("2.2.1.4"),
    erreurs: ["concentration prise pour quantité (+7)", "pH pris pour une concentration (+2)", "x_f = x_max à la mesure près (B-1)", "pas encore fini (I-vitesse)"],
    gen(h) {
      const T = solution(h, { tauMax: 0.5 });
      const V = T.V / 1000, xmax = T.C * V, xf = T.h * V, tol = { rel: 0.03 };
      return {
        enonce: `<p>On dispose de $V = ${num(T.V, 3)}\\ \\text{mL}$ d’une solution de ${T.a.nom}, de concentration ${unCas(T)}. Son pH vaut $${frTex(T.pH, 2)}$. On néglige les ions $\\mathrm{H_3O^+}$ venus de l’eau seule.</p>`,
        questions: [
          { type: "nombre", q: "Calcule l’avancement maximal $x_\\mathrm{max}$, en mol.", reponse: xmax, tol, unite: "mol", indice: "$x_\\mathrm{max} = C\\,V$, avec $V$ en litres." },
          { type: "nombre", q: "Calcule l’avancement final $x_\\mathrm{f}$, en mol.", reponse: xf, tol, unite: "mol", indice: "$x_\\mathrm{f} = n(\\mathrm{H_3O^+})_\\mathrm{f} = [\\mathrm{H_3O^+}]_\\mathrm{f}\\,V$, avec $[\\mathrm{H_3O^+}]_\\mathrm{f} = 10^{-\\mathrm{pH}}$.",
            pieges: pieges(xf, tol, [{ v: T.h, fb: "Tu as pris la concentration pour une quantité. Multiplie par le volume : $x_\\mathrm{f} = [\\mathrm{H_3O^+}]_\\mathrm{f}\\,V$.", erreur: "concentration prise pour quantité (+7)" }, { v: T.pH * V, fb: "Tu as pris le pH pour une concentration. La concentration est $10^{-\\mathrm{pH}}$.", erreur: "pH pris pour une concentration (+2)" }]) },
          { type: "qcm", q: "Que dire de $x_\\mathrm{f}$ par rapport à $x_\\mathrm{max}$ ?", options: h.melange([
            { t: "$x_\\mathrm{f} < x_\\mathrm{max}$ : la transformation est limitée", ok: true },
            { t: "$x_\\mathrm{f} = x_\\mathrm{max}$, à la précision du pH-mètre près", fb: "Tu as mis l’écart sur le compte de la mesure. Ici $x_\\mathrm{f}$ est très inférieur à $x_\\mathrm{max}$ : ce n’est pas une erreur de mesure.", erreur: "x_f = x_max à la mesure près (B-1)" },
            { t: "$x_\\mathrm{f} < x_\\mathrm{max}$ : la réaction n’a pas encore fini", fb: "Tu as pensé que la réaction est en cours. $x_\\mathrm{f}$ est l’avancement de l’état final, celui où la réaction s’est arrêtée.", erreur: "pas encore fini (I-vitesse)" }]) },
        ],
        correction: [
          { tex: `x_\\mathrm{max} = C\\,V = ${num(xmax, 3)}\\ \\text{mol}`, r: "Le tableau : $\\mathrm{AH}$ est limitant." },
          { tex: `x_\\mathrm{f} = 10^{-\\mathrm{pH}}\\,V = 10^{-${frTex(T.pH, 2)}} \\times ${num(V, 3)} = ${num(xf, 3)}\\ \\text{mol}`, r: "La ligne finale : $n(\\mathrm{H_3O^+})_\\mathrm{f} = x_\\mathrm{f}$." },
          { tex: `x_\\mathrm{f} < x_\\mathrm{max}`, r: "La transformation est limitée (non totale)." },
        ],
      };
    },
  },

  /* 6 : τ par le pH, en fraction et en pourcentage */
  {
    id: "tnt-tau",
    titre: "Le taux d’avancement final par le pH",
    niveau: 2,
    capacites: CAPR("2.2.1.5"),
    erreurs: ["C oubliée (B-7)", "rapport inversé", "% mal placé (B-9)", "« il manque V » (I-conclusion)"],
    gen(h) {
      const T = solution(h, { tauMax: 0.5 });
      const tol = { rel: 0.03 }, pc = T.tau * 100;
      return {
        enonce: `<p>Une solution de ${T.a.nom}, de concentration ${unCas(T)}, a un pH de $${frTex(T.pH, 2)}$. Le sujet ne donne pas le volume de la solution.</p>`,
        questions: [
          { type: "qcm", q: "Peut-on calculer le taux d’avancement final $\\tau$ ?", options: h.melange([
            { t: "oui : le volume $V$ se simplifie dans $\\tau = x_\\mathrm{f}/x_\\mathrm{max}$", ok: true },
            { t: "non : il faut $V$ pour calculer $x_\\mathrm{f}$ et $x_\\mathrm{max}$", fb: "Tu as refusé de conclure à tort. $V$ figure dans $x_\\mathrm{f}$ et dans $x_\\mathrm{max}$ : il se simplifie, et il reste $\\tau = 10^{-\\mathrm{pH}}/C$.", erreur: "« il manque V » (I-conclusion)" }]) },
          { type: "nombre", q: "Calcule $\\tau$ (une fraction, sans unité).", reponse: T.tau, tol, indice: "$\\tau = \\dfrac{x_\\mathrm{f}}{x_\\mathrm{max}} = \\dfrac{10^{-\\mathrm{pH}}}{C}$.",
            pieges: pieges(T.tau, tol, [{ v: T.h, fb: "Tu as oublié de diviser par $C$. $\\tau = 10^{-\\mathrm{pH}}/C$, pas $10^{-\\mathrm{pH}}$ seul.", erreur: "C oubliée (B-7)" }, { v: T.C / T.h, fb: "Tu as inversé le rapport. $\\tau \\le 1$ : $10^{-\\mathrm{pH}}$ est au numérateur.", erreur: "rapport inversé" }]) },
          { type: "nombre", q: "Exprime $\\tau$ en pourcentage.", reponse: pc, tol, unite: "%", indice: "Un pourcentage, c’est la fraction multipliée par 100.",
            pieges: pieges(pc, tol, [{ v: T.tau, fb: "Tu as donné la fraction avec le signe %. Multiplie par 100 : une fraction de 0,01 vaut 1 %.", erreur: "% mal placé (B-9)" }, { v: pc / 100, fb: "Tu as divisé par 100 au lieu de multiplier. Un pourcentage est la fraction multipliée par 100.", erreur: "% mal placé (B-9)" }]) },
        ],
        correction: [
          { tex: `\\tau = \\dfrac{x_\\mathrm{f}}{x_\\mathrm{max}} = \\dfrac{[\\mathrm{H_3O^+}]_\\mathrm{f}\\,V}{C\\,V} = \\dfrac{10^{-\\mathrm{pH}}}{C}`, r: "$V$ se simplifie : le sujet n’a pas besoin de le donner." },
          { tex: `\\tau = \\dfrac{10^{-${frTex(T.pH, 2)}}}{${num(T.C, 3)}} = ${num(T.tau, 3)}`, r: "Une fraction, sans unité." },
          { tex: `\\tau = ${pcent(T.tau)}\\ \\%`, r: "La même valeur, en pourcentage." },
        ],
      };
    },
  },

  /* 7 : totale, limitée, pratiquement totale */
  {
    id: "tnt-limitee",
    titre: "Transformation totale, limitée, ou pratiquement totale",
    niveau: 1,
    capacites: CAPR("2.2.1.5"),
    erreurs: ["limitée = rien (B-4)", "⇄ donc τ loin de 1 (I-quasi)", "rapide donc totale (I-vitesse)", "acide fort pris pour limité"],
    gen(h) {
      const cas = h.int(0, 2);
      if (cas === 0) {
        const C = 10 ** h.pick([-3, -2, -1]);
        const pH = Number((-Math.log10(C)).toFixed(1));
        return {
          enonce: `<p>Une solution d’acide chlorhydrique de concentration $C = ${num(C, 2)}\\ \\text{mol·L}^{-1}$ a un pH de $${frTex(pH, 1)}$.</p>`,
          questions: [{ type: "qcm", q: "La transformation de l’acide avec l’eau est…", options: h.melange([
            { t: "totale : $\\tau = 1$", ok: true },
            { t: "limitée : un acide ne réagit jamais entièrement", fb: "Tu as pris un acide fort pour un acide faible. Ici $10^{-\\mathrm{pH}} = C$ : tout l’acide a réagi, $\\tau = 1$.", erreur: "acide fort pris pour limité" },
            { t: "limitée : l’acide est rapide à réagir", fb: "Tu as lié la rapidité à la fin de la réaction. $\\tau$ ne dit rien de la vitesse : ici $\\tau = 1$.", erreur: "rapide donc totale (I-vitesse)" }]) }],
          correction: [{ tex: `\\tau = \\dfrac{10^{-\\mathrm{pH}}}{C} = \\dfrac{${num(hDe(pH), 3)}}{${num(C, 3)}} = 1`, r: "Toutes les molécules ont cédé leur proton : la transformation est totale." }],
        };
      }
      if (cas === 1) {
        const tau = h.pick([0.05, 0.1, 0.2, 0.35, 0.5, 0.8, 0.9]);
        return {
          enonce: `<p>On étudie la réaction d’un acide avec l’eau. Le taux d’avancement final vaut $\\tau = ${frTex(tau, tau < 0.1 ? 2 : 2)}$.</p>`,
          questions: [{ type: "qcm", q: "La transformation est…", options: h.melange([
            { t: "limitée (non totale) : $\\tau < 1$", ok: true },
            { t: "totale : une grande part de l’acide a réagi", fb: "Tu as pris « une grande part » pour « tout ». Totale veut dire $\\tau = 1$, pas $\\tau$ proche de 1.", erreur: "limitée = rien (B-4)" },
            { t: "impossible : limitée veut dire que presque rien ne réagit", fb: "Tu as lu « limitée » comme « presque rien ». Limitée veut dire « s’arrête avant la fin », quelle que soit la part qui a réagi.", erreur: "limitée = rien (B-4)" }]) }],
          correction: [{ tex: `\\tau = ${frTex(tau, 2)} < 1`, r: "La transformation s’arrête avant la fin : elle est limitée, même si $\\tau$ est grand." }],
        };
      }
      return {
        enonce: `<p>Un sujet du bac (session normale 2012) écrit avec ⇄ l’équation de l’acide éthanoïque avec l’ammoniac, et demande de s’assurer que la transformation est totale. Le calcul, que l’on admet ici, donne $\\tau \\approx 0{,}99$.</p>`,
        questions: [{ type: "qcm", q: "La transformation est…", options: h.melange([
          { t: "pratiquement totale, bien que l’équation soit écrite avec ⇄", ok: true },
          { t: "limitée : avec ⇄, $\\tau$ reste loin de 1", fb: "Tu as lu ⇄ comme « $\\tau$ est petit ». $\\tau$ ne se lit pas sur la flèche, il se calcule : ici il est proche de 1.", erreur: "⇄ donc τ loin de 1 (I-quasi)" },
          { t: "limitée : la réaction est lente", fb: "Tu as lu $\\tau$ comme une vitesse. $\\tau$ ne dit rien de la vitesse, et $\\tau \\approx 0{,}99$ est pratiquement 1.", erreur: "rapide donc totale (I-vitesse)" }]) }],
        correction: [{ t: "⇄ dit que les deux sens existent ; $\\tau$ dit jusqu’où la transformation va. Ici $\\tau \\approx 0{,}99$ : pratiquement totale." }],
      };
    },
  },

  /* 8 : l'équilibre dynamique (PC et SM) */
  {
    id: "tnt-equilibre",
    titre: "L’état d’équilibre : ce qui change, ce qui ne change pas",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPR_PCSM("2.2.1.6"),
    erreurs: ["équilibre figé (B-3)", "attendre (B-1)", "catalyseur (B-2)", "sens fixe (B-5)", "espèce ajoutée (B-6)", "⇄ = lente (I-lente)"],
    gen(h) {
      const Q = [
        { q: "Au palier, le nombre d’ions $\\mathrm{A^-}$ reste autour d’une même valeur. Les ions $\\mathrm{A^-}$ eux-mêmes…", ok: "changent : certains redeviennent $\\mathrm{AH}$, d’autres apparaissent", f1: ["sont toujours les mêmes, rien ne réagit plus", "Tu as lu un compte stable comme des molécules figées. Le compte garde sa valeur, pas les mêmes molécules.", "équilibre figé (B-3)"], f2: ["ont tous disparu", "Tu as confondu un compte stable et un compte nul. Il reste des ions $\\mathrm{A^-}$ : seuls leur nombre est stable.", "équilibre figé (B-3)"] },
        { q: "Au palier, la vitesse de la réaction directe et celle de la réaction inverse sont…", ok: "égales, et non nulles", f1: ["nulles : plus rien ne réagit", "Tu as confondu égales et nulles. Les deux réactions continuent, à la même vitesse.", "équilibre figé (B-3)"], f2: ["différentes : la réaction directe l’emporte", "Tu as supposé que le sens direct garde l’avantage. Au palier, les quantités ne changent plus : les deux vitesses sont égales.", "sens fixe (B-5)"] },
        { q: "On laisse évoluer un système à l’équilibre pendant plus longtemps. $\\tau$…", ok: "ne change pas : le palier est atteint", f1: ["augmente, jusqu’à valoir 1", "Tu as pensé qu’il suffit d’attendre. À l’équilibre, les quantités ne changent plus : attendre ne modifie pas $\\tau$.", "attendre (B-1)"], f2: ["diminue, jusqu’à valoir 0", "Tu as supposé que le sens inverse finit par tout défaire. Il compense le sens direct, sans le dépasser.", "attendre (B-1)"] },
        { q: "On ajoute un catalyseur à un système qui évolue vers l’équilibre. $\\tau$ à l’équilibre…", ok: "ne change pas : l’équilibre est atteint plus vite", f1: ["augmente, d’autant plus que la quantité de catalyseur est grande", "Tu as cru qu’un catalyseur déplace l’équilibre. Il accélère les deux sens autant : $\\tau$ reste le même.", "catalyseur (B-2)"], f2: ["devient égal à 1", "Tu as cru qu’un catalyseur mène la réaction jusqu’au bout. Il accélère les deux sens autant, sans changer $\\tau$.", "catalyseur (B-2)"] },
        { q: "On mélange des ions $\\mathrm{A^-}$ et des ions $\\mathrm{H_3O^+}$, sans aucune molécule $\\mathrm{AH}$. Il se forme…", ok: "$\\mathrm{AH}$ et $\\mathrm{H_2O}$ : c’est le sens inverse", f1: ["rien : la réaction ne va que de $\\mathrm{AH}$ vers $\\mathrm{A^-}$", "Tu as cru le sens fixé par l’équation. Il dépend de ce qu’on met : ici, $\\mathrm{A^-}$ et $\\mathrm{H_3O^+}$ réagissent.", "sens fixe (B-5)"], f2: ["plus d’ions $\\mathrm{A^-}$ : l’acide ajouté en dernier fait avancer le sens direct", "Tu as suivi l’ordre des ajouts. Regarde les réactifs présents : ici $\\mathrm{A^-}$ et $\\mathrm{H_3O^+}$, pas $\\mathrm{AH}$.", "espèce ajoutée (B-6)"] },
        { q: "La double flèche ⇄ d’une équation signifie…", ok: "que les deux réactions, directe et inverse, ont lieu", f1: ["que la réaction est lente", "Tu as lié ⇄ à la lenteur. La double flèche dit « deux sens », pas une vitesse.", "⇄ = lente (I-lente)"], f2: ["que $\\tau$ est petit", "Tu as lu ⇄ comme « $\\tau$ est petit ». $\\tau$ se calcule ; la flèche dit seulement qu’il y a deux sens.", "⇄ = lente (I-lente)"] },
      ];
      const pris = h.melange(Q).slice(0, 3);
      return {
        enonce: "<p>On étudie, à l’échelle des molécules, une solution d’acide faible $\\mathrm{AH}$ dans l’eau : $\\mathrm{AH + H_2O \\rightleftarrows A^- + H_3O^+}$. Au palier, les quantités de chaque espèce ne changent plus.</p>",
        questions: pris.map((p) => ({ type: "qcm", q: p.q, options: h.melange([
          { t: p.ok, ok: true },
          { t: p.f1[0], fb: p.f1[1], erreur: p.f1[2] },
          { t: p.f2[0], fb: p.f2[1], erreur: p.f2[2] }]) })),
        correction: [{ t: "À l’équilibre, les quantités ne changent plus parce que les deux réactions, en sens inverse, continuent à la même vitesse. Ni attendre, ni un catalyseur ne déplacent le palier ; le sens qui avance dépend de ce qu’on met." }],
      };
    },
  },

  /* 9 : la dilution */
  {
    id: "tnt-dilution",
    titre: "La dilution augmente le taux d’avancement (enrichissement en PC et SM)",
    niveau: 2,
    capacites: ["pc-svt 2.2.3.6"],
    erreurs: ["C non divisée (+7)", "τ inchangé (I-conditions)", "τ diminue (+11)", "la nature de l’acide change (+12)"],
    gen(h) {
      const a = h.pick(ACIDES), f = h.pick([10, 100]);
      const T = tire(() => {
        const C0 = h.pick(CS) * 10 ** h.pick([-2, -1]);
        const p1 = Number(phReel(C0, a.pka).toFixed(2)), p2 = Number(phReel(C0 / f, a.pka).toFixed(2));
        return { C0, p1, p2, t1: tauDePh(C0, p1), t2: tauDePh(C0 / f, p2) };
      }, (t) => t.p1 >= 2 && t.p2 <= 5.5 && t.t2 <= 0.8 && t.t2 > t.t1 * 1.3 && t.t1 >= 0.01);
      const tol = { rel: 0.03 };
      return {
        enonce: `<p>On dilue ${f} fois une solution de ${a.nom}, de concentration $C_0 = ${num(T.C0, 2)}\\ \\text{mol·L}^{-1}$. Le pH vaut $${frTex(T.p1, 2)}$ avant la dilution, $${frTex(T.p2, 2)}$ après.</p>`,
        questions: [
          { type: "nombre", q: "Calcule le taux d’avancement final $\\tau$ avant la dilution.", reponse: T.t1, tol, indice: "$\\tau = 10^{-\\mathrm{pH}}/C$ : avec la concentration d’avant.", pieges: [] },
          { type: "nombre", q: "Calcule le taux d’avancement final $\\tau'$ après la dilution.", reponse: T.t2, tol, indice: `Après la dilution, la concentration est $C_0/${f}$ : utilise-la, avec le nouveau pH.`,
            pieges: pieges(T.t2, tol, [{ v: hDe(T.p2) / T.C0, fb: "Tu as gardé la concentration d’avant la dilution. $C$ a été divisée par " + f + " : utilise $C_0/" + f + "$.", erreur: "C non divisée (+7)" }, { v: T.t1, fb: "Tu as repris $\\tau$ d’avant. Recalcule avec le nouveau pH et la nouvelle concentration.", erreur: "τ inchangé (I-conditions)" }]) },
          { type: "qcm", q: "Quand on dilue, $\\tau$…", options: h.melange([
            { t: "augmente", ok: true },
            { t: "ne change pas : c’est le même acide", fb: "Tu as supposé que $\\tau$ ne dépend que de l’acide. L’état de départ, plus dilué, change aussi $\\tau$.", erreur: "τ inchangé (I-conditions)" },
            { t: "diminue : il y a moins d’acide par litre", fb: "Tu as compté l’acide par litre. Il y en a moins, mais la part qui réagit grandit.", erreur: "τ diminue (+11)" }]) },
          { type: "qcm", q: "Pourquoi ?", options: h.melange([
            { t: "dilués, les ions $\\mathrm{A^-}$ et $\\mathrm{H_3O^+}$ se rencontrent plus rarement : le sens inverse ralentit", ok: true },
            { t: "l’acide devient plus fort quand on le dilue", fb: "Tu as changé la nature de l’acide. Il est le même : c’est l’état de départ, plus dilué, qui a changé.", erreur: "la nature de l’acide change (+12)" },
            { t: "l’eau ajoutée cède des protons en plus", fb: "Tu as pensé que l’eau fournit des $\\mathrm{H_3O^+}$. Ils viennent de l’acide : l’eau les capte.", erreur: "la nature de l’acide change (+12)" }]) },
        ],
        correction: [
          { tex: `\\tau = \\dfrac{10^{-${frTex(T.p1, 2)}}}{${num(T.C0, 3)}} = ${num(T.t1, 3)}`, r: "Avant la dilution." },
          { tex: `\\tau' = \\dfrac{10^{-${frTex(T.p2, 2)}}}{${num(T.C0 / f, 3)}} = ${num(T.t2, 3)}`, r: `Après la dilution, $C = C_0/${f}$.` },
          { t: "La dilution éloigne les ions $\\mathrm{A^-}$ et $\\mathrm{H_3O^+}$ : le sens inverse ralentit, l’équilibre s’établit plus loin vers les produits, $\\tau$ augmente." },
        ],
      };
    },
  },

  /* 10 : les formes du bac */
  {
    id: "tnt-bac",
    titre: "Au bac : l’équation, τ, la conclusion, et α = 1 − τ",
    niveau: 3,
    capacites: CAPR("2.2.1.2", "2.2.1.4", "2.2.1.5"),
    erreurs: ["demi-équation (+4)", "équation de dosage (+9)", "C oubliée (B-7)", "rapport inversé", "limitée = rien (B-4)", "rapide donc totale (I-vitesse)", "% mal placé (B-9)", "α pris pour τ (+10)", "x_f dans la colonne de l’acide (+10)"],
    gen(h) {
      const forme = h.pick([2022, 2021, 2023]), rejoue = h.int(0, 2) === 0, tol = { rel: 0.03 };
      if (forme === 2022) {
        const T = rejoue ? { a: ACIDES[1], C: S22.Ca, pH: S22.pH, tau: S22.tau, h: S22.h } : solution(h, { dec: 1, tauMax: 0.4 });
        T.tau = tauDePh(T.C, T.pH);
        return {
          enonce: `<p>Forme du sujet 2022. Une solution de ${T.a.nom} $${m(T.a.AH)}$ a pour concentration $C_a = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$ et pour pH $${frTex(T.pH, 1)}$. Le volume n’est pas donné.</p>`,
          questions: [
            { type: "qcm", q: "Écris l’équation de la réaction de l’acide avec l’eau (0,5 pt).", options: h.melange([
              { t: eq(T.a), ok: true },
              { t: `$${m(aq(T.a.AH))}\\rightleftarrows ${m(aq(T.a.A))}+${m("H^+_{(aq)}")}$`, fb: "Tu as écrit la demi-équation du couple. Le proton passe à l’eau, qui devient $\\mathrm{H_3O^+}$.", erreur: "demi-équation (+4)" },
              { t: `$${m(aq(T.a.AH))}+${m("HO^-_{(aq)}")}\\rightleftarrows ${m(aq(T.a.A))}+${m("H_2O_{(l)}")}$`, fb: "C’est l’équation du dosage, pas celle de la réaction avec l’eau.", erreur: "équation de dosage (+9)" }]) },
            { type: "nombre", q: "Calcule $\\tau$ (0,75 pt).", reponse: T.tau, tol, indice: "$\\tau = 10^{-\\mathrm{pH}}/C_a$ : $V$ se simplifie.",
              pieges: pieges(T.tau, tol, [{ v: hDe(T.pH), fb: "Tu as oublié de diviser par $C_a$. $\\tau = 10^{-\\mathrm{pH}}/C_a$.", erreur: "C oubliée (B-7)" }, { v: T.C / hDe(T.pH), fb: "Tu as inversé le rapport. $\\tau \\le 1$ : $10^{-\\mathrm{pH}}$ est au numérateur.", erreur: "rapport inversé" }]) },
            { type: "qcm", q: "Que peut-on conclure ?", options: h.melange([
              { t: "$\\tau < 1$ : la transformation est limitée", ok: true },
              { t: "$\\tau \\approx 0$ : l’acide ne réagit pas avec l’eau", fb: "Tu as lu « petit » comme « nul ». Une part, petite, de l’acide a réagi.", erreur: "limitée = rien (B-4)" },
              { t: "la réaction est lente", fb: "Tu as lu $\\tau$ comme une vitesse. $\\tau$ ne dit rien de la vitesse.", erreur: "rapide donc totale (I-vitesse)" }]) },
          ],
          correction: [
            { tex: `\\tau = \\dfrac{x_\\mathrm{f}}{x_\\mathrm{max}} = \\dfrac{10^{-\\mathrm{pH}}}{C_a} = \\dfrac{10^{-${frTex(T.pH, 1)}}}{${num(T.C, 3)}} = ${num(T.tau, 3)}`, r: "La formule littérale d’abord, puis les valeurs." },
            { t: "$\\tau < 1$ : la transformation est limitée (non totale)." },
          ],
        };
      }
      if (forme === 2021) {
        const T = rejoue ? { a: { nom: "un acide faible" }, C: S21.Ca, pH: S21.pH } : solution(h, { dec: 2, tauMax: 0.4 });
        const tau = tauDePh(T.C, T.pH);
        return {
          enonce: `<p>Forme du sujet 2021. Une solution de ${T.a.nom}, de concentration $C_a = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$, a un pH de $${frTex(T.pH, 2)}$. Le sujet demande : « Montrer que $\\tau \\approx ${num(tau * 100, 3)}\\ \\%$ ».</p>`,
          questions: [
            { type: "nombre", q: "Calcule $\\tau$ comme une fraction.", reponse: tau, tol, indice: "$\\tau = 10^{-\\mathrm{pH}}/C_a$.",
              pieges: pieges(tau, tol, [{ v: hDe(T.pH), fb: "Tu as oublié de diviser par $C_a$. $\\tau = 10^{-\\mathrm{pH}}/C_a$.", erreur: "C oubliée (B-7)" }, { v: T.C / hDe(T.pH), fb: "Tu as inversé le rapport. $\\tau \\le 1$.", erreur: "rapport inversé" }]) },
            { type: "qcm", q: "Ton résultat est une fraction ; le sujet écrit un pourcentage. Ils sont…", options: h.melange([
              { t: "la même valeur : la fraction multipliée par 100 est le pourcentage", ok: true },
              { t: "différents : il faut recommencer le calcul", fb: "Tu as pris une fraction et un pourcentage pour deux résultats. $\\tau \\times 100$ donne le pourcentage : c’est la même valeur.", erreur: "% mal placé (B-9)" },
              { t: "la même valeur, sans avoir à multiplier par 100", fb: "Tu as oublié de multiplier par 100. Le pourcentage est la fraction multipliée par 100, sans cela les deux sont cent fois différents.", erreur: "% mal placé (B-9)" }]) },
          ],
          correction: [{ tex: `\\tau = \\dfrac{10^{-${frTex(T.pH, 2)}}}{${num(T.C, 3)}} = ${num(tau, 3)} = ${pcent(tau)}\\ \\%`, r: "On montre la valeur en calculant, puis en la mettant en pourcentage." }],
        };
      }
      const T = rejoue ? { a: ACIDES[0], C: S23.CA, pH: S23.pH } : solution(h, { dec: 2, tauMax: 0.4, acide: ACIDES[0] });
      const tau = tauDePh(T.C, T.pH), alpha = 1 - tau;
      return {
        enonce: `<p>Forme du sujet 2023. Une solution de ${T.a.nom}, de concentration $C_A = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$, a un pH de $${frTex(T.pH, 2)}$. On définit $\\alpha = \\dfrac{[\\mathrm{AH}]_{\\text{éq}}}{[\\mathrm{AH}]_{\\text{éq}} + [\\mathrm{A^-}]_{\\text{éq}}}$, et le sujet demande de montrer, avec le tableau d’avancement, que $\\alpha = 1 - \\tau$.</p>`,
        questions: [
          { type: "qcm", q: "Dans la ligne finale du tableau, $n(\\mathrm{AH})$ vaut…", options: h.melange([
            { t: "$C_A V - x_\\mathrm{f}$", ok: true },
            { t: "$x_\\mathrm{f}$", fb: "Tu as pris la quantité formée pour la quantité restante. $x_\\mathrm{f}$ est ce qui s’est formé : l’acide a perdu $x_\\mathrm{f}$.", erreur: "x_f dans la colonne de l’acide (+10)" },
            { t: "$C_A V$", fb: "Tu as laissé l’acide inchangé. Ce qui a réagi est retiré : $C_A V - x_\\mathrm{f}$.", erreur: "x_f dans la colonne de l’acide (+10)" }]) },
          { type: "nombre", q: "Calcule $\\alpha$.", reponse: alpha, tol: { rel: 0.01 }, indice: "$\\alpha = 1 - \\tau$, avec $\\tau = 10^{-\\mathrm{pH}}/C_A$.",
            pieges: pieges(alpha, { rel: 0.01 }, [{ v: tau, fb: "Tu as confondu $\\alpha$ et $\\tau$. $\\alpha$ compte l’acide restant, $\\tau$ l’acide qui a réagi : $\\alpha = 1 - \\tau$.", erreur: "α pris pour τ (+10)" }, { v: 1 - hDe(T.pH), fb: "Tu as oublié $C_A$ dans $\\tau$. $\\tau = 10^{-\\mathrm{pH}}/C_A$, pas $10^{-\\mathrm{pH}}$ seul.", erreur: "C oubliée (B-7)" }]) },
        ],
        correction: [
          { tex: `\\alpha = \\dfrac{C_A V - x_\\mathrm{f}}{(C_A V - x_\\mathrm{f}) + x_\\mathrm{f}} = 1 - \\dfrac{x_\\mathrm{f}}{C_A V} = 1 - \\tau`, r: "Même volume partout : les concentrations deviennent des quantités." },
          { tex: `\\alpha = 1 - \\dfrac{10^{-${frTex(T.pH, 2)}}}{${num(T.C, 3)}} = ${num(alpha, 3)}`, r: "On calcule $\\tau$, puis $1 - \\tau$." },
        ],
      };
    },
  },
];
