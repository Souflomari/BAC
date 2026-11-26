// @ts-nocheck
/**
 * Exercices générés de la leçon « État d’équilibre, acides et bases » (`acides-bases`, V3).
 * Format : voir `modele.js`. Chaque réponse est calculée par le code depuis `acides-bases-outils.js`.
 *
 * Règles B3 et B7 :
 *   - pK_A et zones de virage issus uniquement des sujets nationaux transcrits (2012, 2015, 2018,
 *     2019, 2020, 2021, 2022, 2023, 2025) ;
 *   - rejet de tout tirage où deux options ou pièges numériques tombent à moins de 2 % (ou 0,15 unité
 *     de pH) l’un de l’autre, et jamais de découpage de chaîne pour fabriquer un leurre ;
 *   - aucune question sur la conductance G / σ (2.2.2.1), ni sur le choix d’un indicateur de dosage
 *     (2.2.3.14), ni sur K = K_A / K_e (réservés à la leçon sur le dosage) ;
 *   - le gabarit 10 (`ab-distribution`) porte `filieres: ["PC", "SM"]` et uniquement `pc-pc` / `pc-sm`.
 */
import { frTex, sciTex } from "./nombre.js";
import {
  PKA, KE, PKE, PH_NEUTRE, INDICATEURS, teinteInd,
  hDe, hoDePh, phDeHo, phReel, phBaseReel, tauDePh, qrDePh, kaDeTau,
  rapCouple, partAcide, partBase, kDeuxCouples, tauEquimol,
  S22, S20, S21, S23, S15, S19, C12,
} from "../acides-bases-outils.js";

/** Capacités dans les trois filières : 2.2.2.r → SVT 2.2.4.r ; 2.2.3.r → SVT 2.2.5.r */
const CAPAB = (...ids) =>
  ids.flatMap((id) => {
    const [, , ch, r] = id.split(".");
    const svtCh = ch === "2" ? "4" : "5";
    return [`pc-pc ${id}`, `pc-sm ${id}`, `pc-svt 2.2.${svtCh}.${r}`];
  });
const CAPAB_PCSM = (...ids) => ids.flatMap((id) => [`pc-pc ${id}`, `pc-sm ${id}`]);

function pieges(rep, tol, liste) {
  const seuil = tol.abs != null ? tol.abs : Math.abs(rep) * tol.rel;
  const garde = [];
  for (const p of liste) {
    if (!Number.isFinite(p.v)) continue;
    if (Math.abs(p.v - rep) <= 2.2 * seuil) continue;
    if (garde.some((q) => Math.abs(q.v - p.v) <= 2 * (tol.abs != null ? tol.abs : Math.abs(q.v) * tol.rel))) continue;
    garde.push(p);
  }
  return garde;
}

function distinctsVal(vals, relMin = 0.03, absMin = 0) {
  for (let i = 0; i < vals.length; i++) {
    if (!Number.isFinite(vals[i])) return false;
    for (let j = i + 1; j < vals.length; j++) {
      const diff = Math.abs(vals[i] - vals[j]);
      const echelle = Math.max(Math.abs(vals[i]), Math.abs(vals[j]), 1e-30);
      if (diff <= Math.max(absMin, relMin * echelle)) return false;
    }
  }
  return true;
}

function tire(f, ok) {
  let t = f();
  for (let i = 0; i < 120 && !ok(t); i++) t = f();
  return t;
}

const sci = (x, c = 2) => sciTex(x, c);
const num = (x, n = 3) => {
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e4 || a < 1e-2)) return sci(x, n);
  const e = Math.floor(Math.log10(a || 1));
  return frTex(x, Math.max(0, n - 1 - e));
};
const m = (s) => `\\mathrm{${s}}`;
const aq = (s) => `${s}{}_{(aq)}`;

const ACIDES = [
  { id: "metha", nom: "l’acide méthanoïque", de: "d’acide méthanoïque", AH: "HCOOH", A: "HCOO^-", pka: PKA.metha, decPka: 2 },
  { id: "lact", nom: "l’acide lactique", de: "d’acide lactique", AH: "CH_3CH(OH)COOH", A: "CH_3CH(OH)COO^-", pka: PKA.lact, decPka: 1 },
  { id: "benzo", nom: "l’acide benzoïque", de: "d’acide benzoïque", AH: "C_6H_5COOH", A: "C_6H_5COO^-", pka: PKA.benzo, decPka: 1 },
  { id: "ethan", nom: "l’acide éthanoïque", de: "d’acide éthanoïque", AH: "CH_3COOH", A: "CH_3COO^-", pka: PKA.ethan, decPka: 1 },
  { id: "propan", nom: "l’acide propanoïque", de: "d’acide propanoïque", AH: "C_2H_5COOH", A: "C_2H_5COO^-", pka: PKA.propan, decPka: 1 },
];

const COUPLES = [
  ...ACIDES,
  { id: "hso3", nom: "l’ion hydrogénosulfite", de: "d’hydrogénosulfite de sodium", AH: "HSO_3^-", A: "SO_3^{2-}", pka: PKA.hso3, decPka: 1 },
  { id: "nh4", nom: "l’ion ammonium", de: "de chlorure d’ammonium", AH: "NH_4^+", A: "NH_3", pka: PKA.nh4, decPka: 1 },
];

const BASES = [
  { id: "nh3", nom: "l’ammoniac", B: "NH_3", BH: "NH_4^+", couple: "NH_4^+/NH_3", pka: PKA.nh4, decPka: 1 },
  { id: "so3", nom: "l’ion sulfite", B: "SO_3^{2-}", BH: "HSO_3^-", couple: "HSO_3^-/SO_3^{2-}", pka: PKA.hso3, decPka: 1 },
  { id: "propanoate", nom: "l’ion propanoate", B: "C_2H_5COO^-", BH: "C_2H_5COOH", couple: "C_2H_5COOH/C_2H_5COO^-", pka: PKA.propan, decPka: 1 },
  { id: "ethanoate", nom: "l’ion éthanoate", B: "CH_3COO^-", BH: "CH_3COOH", couple: "CH_3COOH/CH_3COO^-", pka: PKA.ethan, decPka: 1 },
  { id: "benzoate", nom: "l’ion benzoate", B: "C_6H_5COO^-", BH: "C_6H_5COOH", couple: "C_6H_5COOH/C_6H_5COO^-", pka: PKA.benzo, decPka: 1 },
  { id: "methanoate", nom: "l’ion méthanoate", B: "HCOO^-", BH: "HCOOH", couple: "HCOOH/HCOO^-", pka: PKA.metha, decPka: 2 },
];

const CS = [1, 2, 5];

function svgDistribution(pka, labelAH, labelA) {
  const W = 520, H = 220, x0 = 56, x1 = 486, y0 = 184, y1 = 26;
  const X = (ph) => x0 + ((x1 - x0) * ph) / 14;
  const Y = (pct) => y0 - ((y0 - y1) * pct) / 100;
  let pA = "", pB = "";
  for (let i = 0; i <= 140; i++) {
    const ph = (14 * i) / 140;
    pA += `${X(ph).toFixed(1)},${Y(partAcide(ph, pka) * 100).toFixed(1)} `;
    pB += `${X(ph).toFixed(1)},${Y(partBase(ph, pka) * 100).toFixed(1)} `;
  }
  const ticksX = [0, 2, 4, 6, 8, 10, 12, 14]
    .map((v) => `<line x1="${X(v).toFixed(1)}" y1="${y0}" x2="${X(v).toFixed(1)}" y2="${y0 + 5}" stroke="var(--color-text-secondary)" stroke-width="1.5"/><text x="${X(v).toFixed(1)}" y="${y0 + 20}" text-anchor="middle" font-size="12" fill="var(--color-text-secondary)">${v}</text>`)
    .join("");
  const subTicks = Array.from({ length: 15 }, (_, v) => `<line x1="${X(v).toFixed(1)}" y1="${y1}" x2="${X(v).toFixed(1)}" y2="${y0}" stroke="var(--color-border-soft)" stroke-width="0.7"/>`).join("");
  const ticksY = [0, 50, 100]
    .map((v) => `<line x1="${x0 - 5}" y1="${Y(v).toFixed(1)}" x2="${x1}" y2="${Y(v).toFixed(1)}" stroke="var(--color-border-soft)" stroke-width="${v === 50 ? "1.2" : "0.8"}" ${v === 50 ? 'stroke-dasharray="4 4"' : ""}/><text x="${x0 - 9}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end" font-size="12" fill="var(--color-text-secondary)">${v} %</text>`)
    .join("");
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Diagramme de distribution des deux formes du couple en fonction du pH">${subTicks}${ticksY}<line x1="${x0}" y1="${y0}" x2="${x1 + 8}" y2="${y0}" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 6}" stroke="var(--color-text-primary)" stroke-width="1.5"/>${ticksX}<text x="${x1 + 12}" y="${y0 + 4}" font-size="12" font-weight="700" fill="var(--color-text-primary)">pH</text><polyline fill="none" stroke="var(--color-text-primary)" stroke-width="2.2" stroke-dasharray="7 4" points="${pA.trim()}"/><polyline fill="none" stroke="var(--color-signal)" stroke-width="2.5" points="${pB.trim()}"/><text x="${x0 + 12}" y="${y1 + 18}" font-size="12" font-weight="700" fill="var(--color-text-primary)">% ${labelAH}</text><text x="${x1 - 10}" y="${y1 + 18}" text-anchor="end" font-size="12" font-weight="700" fill="var(--color-signal)">% ${labelA}</text></svg>`;
}

export const EXERCICES = [
  /* 1 : Expression littérale de Q_r */
  {
    id: "ab-qr",
    titre: "Quotient de réaction : solvant, solides et exposants",
    niveau: 1,
    capacites: CAPAB("2.2.2.3"),
    erreurs: ["quotient renversé", "eau solvant écrite dans Q_r", "solide écrit dans Q_r", "coefficient mis en facteur", "coefficient oublié"],
    gen(h) {
      const cas = h.int(0, 3);
      if (cas === 0) {
        const a = h.pick(ACIDES);
        const eq = `$${m(aq(a.AH))} + ${m("H_2O_{(l)}")} \\rightleftarrows ${m(aq(a.A))} + ${m("H_3O^+_{(aq)}")}$`;
        return {
          enonce: `<p>On considère la réaction de ${a.nom} avec l’eau, d’équation ${eq}.</p>`,
          questions: [{
            type: "qcm", sujet: "l’expression littérale de Q_r sans le solvant",
            q: "Quelle est l’expression littérale du quotient de réaction $Q_r$ dans un état donné ?",
            options: h.melange([
              { t: `$Q_r = \\dfrac{[${m(a.A)}][${m("H_3O^+")}]}{[${m(a.AH)}]}$`, ok: true },
              { t: `$Q_r = \\dfrac{[${m(a.A)}][${m("H_3O^+")}]}{[${m(a.AH)}][${m("H_2O")}]}$`, fb: "Eau solvant écrite dans $Q_r$ : l’eau est le solvant, seules les espèces dissoutes figurent par leur concentration.", erreur: "eau solvant écrite dans Q_r" },
              { t: `$Q_r = \\dfrac{[${m(a.AH)}]}{[${m(a.A)}][${m("H_3O^+")}]}$`, fb: "Quotient renversé : les produits vont au numérateur et les réactifs au dénominateur.", erreur: "quotient renversé" },
              { t: `$Q_r = \\dfrac{[${m(a.AH)}][${m("H_2O")}]}{[${m(a.A)}][${m("H_3O^+")}]}$`, fb: "Quotient renversé et eau incluse : produits en haut, réactifs en bas, sans l’eau solvant.", erreur: "quotient renversé" },
            ]),
          }],
          correction: [
            { tex: `Q_r = \\dfrac{[${m(a.A)}][${m("H_3O^+")}]}{[${m(a.AH)}]}`, r: "Produits dissous au numérateur, réactifs dissous au dénominateur ; $\\mathrm{H_2O_{(l)}}$ solvant n’y figure pas." },
          ],
        };
      }
      if (cas === 1) {
        return {
          enonce: `<p>Sujet 2012, 2ᵉ partie : on étudie le système décrit par l’équation $\\mathrm{Zn_{(s)} + Cu^{2+}_{(aq)} \\rightleftarrows Zn^{2+}_{(aq)} + Cu_{(s)}}$.</p>`,
          questions: [{
            type: "qcm", sujet: "les solides ne figurent pas dans Q_r",
            q: "Quelle est l’expression littérale du quotient de réaction $Q_r$ ?",
            options: h.melange([
              { t: "$Q_r = \\dfrac{[\\mathrm{Zn^{2+}}]}{[\\mathrm{Cu^{2+}}]}$", ok: true },
              { t: "$Q_r = \\dfrac{[\\mathrm{Zn^{2+}}][\\mathrm{Cu}]}{[\\mathrm{Cu^{2+}}][\\mathrm{Zn}]}$", fb: "Solides écrits dans $Q_r$ : $\\mathrm{Zn_{(s)}}$ et $\\mathrm{Cu_{(s)}}$ ne sont pas des espèces dissoutes.", erreur: "solide écrit dans Q_r" },
              { t: "$Q_r = \\dfrac{[\\mathrm{Cu^{2+}}]}{[\\mathrm{Zn^{2+}}]}$", fb: "Quotient renversé : le produit dissous $\\mathrm{Zn^{2+}}$ doit être au numérateur.", erreur: "quotient renversé" },
              { t: "$Q_r = \\dfrac{[\\mathrm{Zn^{2+}}]}{[\\mathrm{Cu^{2+}}][\\mathrm{Zn}]}$", fb: "Solide écrit au dénominateur : le métal solide $\\mathrm{Zn_{(s)}}$ ne figure pas dans $Q_r$.", erreur: "solide écrit dans Q_r" },
            ]),
          }],
          correction: [
            { tex: "Q_r = \\dfrac{[\\mathrm{Zn^{2+}}]}{[\\mathrm{Cu^{2+}}]}", r: "Seules les espèces chimiques dissoutes figurent dans $Q_r$ ; les solides sont écartés." },
          ],
        };
      }
      if (cas === 2) {
        const pile = h.int(0, 1) === 0
          ? { eq: "3\\,\\mathrm{Ag^+_{(aq)} + Cr_{(s)} \\rightleftarrows 3\\,Ag_{(s)} + Cr^{3+}_{(aq)}}", ionR: "Ag^+", ionP: "Cr^{3+}", k: 3 }
          : { eq: "2\\,\\mathrm{Ag^+_{(aq)} + Cu_{(s)} \\rightleftarrows 2\\,Ag_{(s)} + Cu^{2+}_{(aq)}}", ionR: "Ag^+", ionP: "Cu^{2+}", k: 2 };
        return {
          enonce: `<p>On considère la transformation électrochimique d’équation $${pile.eq}$.</p>`,
          questions: [{
            type: "qcm", sujet: "les coefficients stœchiométriques en exposants dans Q_r",
            q: "Quelle est l’expression littérale de $Q_r$ ?",
            options: h.melange([
              { t: `$Q_r = \\dfrac{[\\mathrm{${pile.ionP}}]}{[\\mathrm{${pile.ionR}}]^${pile.k}}$`, ok: true },
              { t: `$Q_r = \\dfrac{[\\mathrm{${pile.ionP}}]}{${pile.k}\\,[\\mathrm{${pile.ionR}}]}$`, fb: `Coefficient mis en facteur : le nombre stœchiométrique $${pile.k}$ devient l’exposant de $[\\mathrm{${pile.ionR}}]$.`, erreur: "coefficient mis en facteur" },
              { t: `$Q_r = \\dfrac{[\\mathrm{${pile.ionP}}]}{[\\mathrm{${pile.ionR}}]}$`, fb: `Coefficient oublié : le nombre stœchiométrique $${pile.k}$ devant $\\mathrm{${pile.ionR}}$ donne l’exposant $${pile.k}$.`, erreur: "coefficient oublié" },
              { t: `$Q_r = \\dfrac{[\\mathrm{${pile.ionR}}]^${pile.k}}{[\\mathrm{${pile.ionP}}]}$`, fb: "Quotient renversé : l’ion formé à droite va au numérateur.", erreur: "quotient renversé" },
            ]),
          }],
          correction: [
            { tex: `Q_r = \\dfrac{[\\mathrm{${pile.ionP}}]}{[\\mathrm{${pile.ionR}}]^${pile.k}}`, r: `Les solides sont absents et le coefficient $${pile.k}$ passe en exposant.` },
          ],
        };
      }
      const b = BASES[0];
      return {
        enonce: `<p>On dissout de ${b.nom} dans l’eau : $\\mathrm{NH_{3(aq)} + H_2O_{(l)} \\rightleftarrows NH_{4(aq)}^+ + HO^-_{(aq)}}$.</p>`,
        questions: [{
          type: "qcm", sujet: "Q_r de la réaction d’une base avec l’eau",
          q: "Quelle est l’expression littérale de $Q_r$ ?",
          options: h.melange([
            { t: "$Q_r = \\dfrac{[\\mathrm{NH_4^+}][\\mathrm{HO^-}]}{[\\mathrm{NH_3}]}$", ok: true },
            { t: "$Q_r = \\dfrac{[\\mathrm{NH_4^+}][\\mathrm{HO^-}]}{[\\mathrm{NH_3}][\\mathrm{H_2O}]}$", fb: "Eau solvant écrite dans $Q_r$ : $\\mathrm{H_2O_{(l)}}$ est le solvant et ne figure pas dans $Q_r$.", erreur: "eau solvant écrite dans Q_r" },
            { t: "$Q_r = \\dfrac{[\\mathrm{NH_3}]}{[\\mathrm{NH_4^+}][\\mathrm{HO^-}]}$", fb: "Quotient renversé : les produits dissous vont au numérateur.", erreur: "quotient renversé" },
          ]),
        }],
        correction: [
          { tex: "Q_r = \\dfrac{[\\mathrm{NH_4^+}][\\mathrm{HO^-}]}{[\\mathrm{NH_3}]}", r: "Produits sur réactifs, sans le solvant $\\mathrm{H_2O}$." },
        ],
      };
    },
  },

  /* 2 : Constante d'équilibre K, état initial et dilution */
  {
    id: "ab-k",
    titre: "Constante d’équilibre K, état initial et dilution",
    niveau: 2,
    capacites: CAPAB("2.2.2.2", "2.2.2.4", "2.2.2.5"),
    erreurs: ["K dépendrait de C", "Q_r confondu avec K", "équilibre pris pour un arrêt", "τ fixé par K seul", "catalyseur change K"],
    gen(h) {
      const T = tire(() => {
        const a = h.pick(ACIDES);
        const C1 = h.pick([1e-2, 2e-2, 5e-2]), f = 10, C2 = C1 / f;
        const pH1 = Number(phReel(C1, a.pka).toFixed(2));
        const pH2 = Number(phReel(C2, a.pka).toFixed(2));
        return { a, C1, C2, f, pH1, pH2, qr1: qrDePh(C1, pH1), qr2: qrDePh(C2, pH2), tau2: tauDePh(C2, pH2) };
      }, (t) => t.tau2 >= 0.04 && t.tau2 <= 0.45);
      const tol = { rel: 0.02 };
      const opeQ = h.int(0, 1) === 0;
      return {
        enonce: `<p>À $25\\ ^\\circ\\mathrm{C}$, deux flacons contiennent ${T.a.nom} ($\\mathrm{AH + H_2O \\rightleftarrows A^- + H_3O^+}$) aux concentrations $C_1 = ${num(T.C1, 2)}\\ \\text{mol·L}^{-1}$ ($\\mathrm{pH}_1 = ${frTex(T.pH1, 2)}$) et $C_2 = ${num(T.C2, 2)}\\ \\text{mol·L}^{-1}$ ($\\mathrm{pH}_2 = ${frTex(T.pH2, 2)}$). Dans le premier flacon, $Q_{r,\\text{éq}} \\approx ${sci(T.qr1, 3)}$.</p>`,
        questions: [
          {
            type: "nombre", sujet: "Q_r,éq = K indépendant de la concentration initiale",
            q: "Calcule $Q_{r,\\text{éq}}$ dans le second flacon à partir de $C_2$ et $\\mathrm{pH}_2$ (sans unité).",
            reponse: T.qr2, tol, indice: "$Q_{r,\\text{éq}} = \\dfrac{(10^{-\\mathrm{pH}_2})^2}{C_2 - 10^{-\\mathrm{pH}_2}}$ : retrouve la même constante $K$, à l’arrondi du pH près.",
            pieges: pieges(T.qr2, tol, [
              { v: T.qr1 / T.f, fb: "$K$ supposée proportionnelle à $C$ : la constante d’équilibre ne dépend pas de la concentration initiale.", erreur: "K dépendrait de C" },
              { v: T.qr1 * T.f, fb: "$K$ supposée varier avec la dilution : à température donnée, $Q_{r,\\text{éq}} = K$ garde la même valeur.", erreur: "K dépendrait de C" },
            ]),
          },
          opeQ
            ? {
              type: "qcm", sujet: "seule la température change K",
              q: "Laquelle de ces opérations peut modifier la constante d’équilibre $K$ associée à cette équation ?",
              options: h.melange([
                { t: "modifier la température de la solution", ok: true },
                { t: "diluer la solution dix fois à température constante", fb: "$K$ supposée dépendre de l’état initial : $K$ ne dépend que de la réaction et de la température.", erreur: "K dépendrait de C" },
                { t: "ajouter un catalyseur dans le bécher", fb: "Catalyseur supposé déplacer l’équilibre : il accélère autant les deux sens sans changer $K$.", erreur: "catalyseur change K" },
              ]),
            }
            : {
              type: "qcm", sujet: "τ dépend de K et de l’état initial",
              q: "Quand on passe de $C_1$ à $C_2 = C_1 / 10$ à $25\\ ^\\circ\\mathrm{C}$, que font $K$ et $\\tau$ ?",
              options: h.melange([
                { t: "$K$ reste identique et $\\tau$ augmente", ok: true },
                { t: "$K$ et $\\tau$ restent tous les deux identiques", fb: "$\\tau$ supposé fixé par $K$ seul : $\\tau$ dépend à la fois de $K$ et de la concentration initiale $C$.", erreur: "τ fixé par K seul" },
                { t: "$K$ augmente en même temps que $\\tau$", fb: "$K$ supposée varier avec la concentration : seule $\\tau$ change, $K$ reste la même.", erreur: "K dépendrait de C" },
              ]),
            },
          {
            type: "qcm", sujet: "évolution de Q_r après l’instant d’une dilution",
            q: "On dilue $10$ fois le premier flacon déjà à l’équilibre. À l’instant de la dilution et juste après…",
            options: h.melange([
              { t: "$Q_r$ tombe à $K/10$, puis remonte jusqu’à $K$", ok: true },
              { t: "$Q_r$ reste égal à $K$ dès l’instant de la dilution", fb: "$Q_r$ confondu avec $K$ : à l’instant où chaque concentration est divisée par $10$, $Q_r$ vaut $K/10$.", erreur: "Q_r confondu avec K" },
              { t: "$Q_r$ tombe à $K/10$ et y reste figé", fb: "Équilibre pris pour un arrêt : les réactions directe et inverse continuent et ramènent $Q_r$ jusqu’à $K$.", erreur: "équilibre pris pour un arrêt" },
            ]),
          },
        ],
        correction: [
          { tex: `Q_{r,\\text{éq}} = \\dfrac{(10^{-${frTex(T.pH2, 2)}})^2}{${num(T.C2, 2)} - 10^{-${frTex(T.pH2, 2)}}} \\approx ${sci(T.qr2, 3)}`, r: "Aux arrondis près, les deux flacons ont la même constante $K$." },
          { t: "$K$ ne dépend que de l’équation et de la température ; $\\tau$ dépend de $K$ et de l’état initial. Lors d’une dilution $\\times 10$, $Q_r$ chute à $K/10$ puis remonte jusqu’à $K$." },
        ],
      };
    },
  },

  /* 3 : Autoprotolyse de l'eau, K_e, nature d'une solution et [HO-] <-> pH */
  {
    id: "ab-ke",
    titre: "Produit ionique de l’eau, nature d’une solution et ions HO⁻",
    niveau: 1,
    capacites: CAPAB("2.2.3.1", "2.2.3.2", "2.2.3.3", "2.2.3.4"),
    erreurs: ["−log[HO⁻] pris pour le pH", "pH et concentration confondus", "contient HO⁻ donc basique", "pH neutre pris égal à pK_e", "deux ions présents donc neutre"],
    gen(h) {
      const T = tire(() => {
        const mant = h.pick([1.0, 2.0, 2.5, 4.0, 5.0]);
        const exp = h.pick([-4, -3, -2]);
        const ho = mant * 10 ** exp;
        const pH = phDeHo(ho);
        const phNat = h.pick([2.8, 4.2, 5.4, 8.6, 10.4, 11.8]);
        return { ho, pH, poh: -Math.log10(ho), phNat };
      }, (t) => Math.abs(t.pH - t.poh) >= 1.5);
      const acide = T.phNat < PH_NEUTRE;
      const sensHoVersPh = h.int(0, 1) === 0;
      const q1Neutre = h.int(0, 2) === 0;
      return {
        enonce: `<p>On travaille à $25\\ ^\\circ\\mathrm{C}$, température à laquelle le produit ionique de l’eau vaut $K_e = 1{,}0 \\times 10^{-14}$ ($\\mathrm{p}K_e = 14$).</p>`,
        questions: [
          q1Neutre
            ? {
              type: "qcm", sujet: "K_e et le pH d’une solution neutre à 25 °C",
              q: "Quel est le pH d’une solution aqueuse neutre à $25\\ ^\\circ\\mathrm{C}$ ?",
              options: h.melange([
                { t: "$7{,}0$ : car $[\\mathrm{H_3O^+}] = [\\mathrm{HO^-}] = \\sqrt{K_e}$", ok: true },
                { t: "$14$ : car $\\mathrm{pH} = \\mathrm{p}K_e$", fb: "pH neutre pris égal à $\\mathrm{p}K_e$ : $[\\mathrm{H_3O^+}]^2 = K_e$ donne $2\\,\\mathrm{pH} = \\mathrm{p}K_e = 14$, soit $\\mathrm{pH} = 7{,}0$.", erreur: "pH neutre pris égal à pK_e" },
                { t: "$1{,}0 \\times 10^{-7}$ : la concentration des ions", fb: "Concentration prise pour le pH : $1{,}0 \\times 10^{-7}\\ \\text{mol·L}^{-1}$ est $[\\mathrm{H_3O^+}]$, dont le pH vaut $7{,}0$.", erreur: "pH et concentration confondus" },
              ]),
            }
            : {
              type: "qcm", sujet: "nature d’une solution aqueuse selon son pH",
              q: `Une solution aqueuse a un pH égal à $${frTex(T.phNat, 1)}$ à $25\\ ^\\circ\\mathrm{C}$. Quelle est sa nature ?`,
              options: acide
                ? h.melange([
                  { t: "acide : $[\\mathrm{H_3O^+}] > [\\mathrm{HO^-}]$", ok: true },
                  { t: "basique : elle contient aussi des ions $\\mathrm{HO^-}$", fb: "Présence d’ions $\\mathrm{HO^-}$ prise pour de la basicité : toute solution aqueuse en contient, mais ici $[\\mathrm{HO^-}] < [\\mathrm{H_3O^+}]$.", erreur: "contient HO⁻ donc basique" },
                  { t: "neutre : les deux ions $\\mathrm{H_3O^+}$ et $\\mathrm{HO^-}$ coexistent", fb: "Coexistence confondue avec égalité : une solution n’est neutre que si $[\\mathrm{H_3O^+}] = [\\mathrm{HO^-}]$.", erreur: "deux ions présents donc neutre" },
                ])
                : h.melange([
                  { t: "basique : $[\\mathrm{HO^-}] > [\\mathrm{H_3O^+}]$", ok: true },
                  { t: "neutre : les deux ions $\\mathrm{H_3O^+}$ et $\\mathrm{HO^-}$ coexistent", fb: "Coexistence confondue avec égalité : ici $\\mathrm{pH} > 7$, donc $[\\mathrm{HO^-}] > [\\mathrm{H_3O^+}]$.", erreur: "deux ions présents donc neutre" },
                  { t: "acide : elle contient encore des ions $\\mathrm{H_3O^+}$", fb: "Comparaison oubliée : à $\\mathrm{pH} > 7$, $[\\mathrm{HO^-}]$ dépasse largement $[\\mathrm{H_3O^+}]$.", erreur: "contient HO⁻ donc basique" },
                ]),
            },
          sensHoVersPh
            ? {
              type: "nombre", sujet: "calculer le pH depuis [HO⁻]",
              q: `Dans une solution aqueuse à $25\\ ^\\circ\\mathrm{C}$, $[\\mathrm{HO^-}] = ${sci(T.ho, 2)}\\ \\text{mol·L}^{-1}$. Calcule son pH.`,
              reponse: T.pH, tol: { abs: 0.06 }, indice: "$[\\mathrm{H_3O^+}] = \\dfrac{K_e}{[\\mathrm{HO^-}]} \\implies \\mathrm{pH} = \\mathrm{p}K_e + \\log[\\mathrm{HO^-}]$.",
              pieges: pieges(T.pH, { abs: 0.06 }, [
                { v: T.poh, fb: "$\\mathrm{-\\log[HO^-]}$ pris pour le pH : passe par $[\\mathrm{H_3O^+}] = K_e / [\\mathrm{HO^-}]$ (ou $\\mathrm{pH} = 14 + \\log[\\mathrm{HO^-}]$).", erreur: "−log[HO⁻] pris pour le pH" },
                { v: PKE + T.poh, fb: "Signe de $\\log[\\mathrm{HO^-}]$ perdu : $\\log[\\mathrm{HO^-}]$ est négatif, donc $\\mathrm{pH} = 14 - " + frTex(T.poh, 1) + "$.", erreur: "pH et concentration confondus" },
              ]),
            }
            : {
              type: "nombre", sujet: "calculer [HO⁻] depuis le pH",
              q: `Une solution basique a un pH égal à $${frTex(Number(T.pH.toFixed(1)), 1)}$ à $25\\ ^\\circ\\mathrm{C}$. Calcule $[\\mathrm{HO^-}]$ en $\\text{mol·L}^{-1}$.`,
              reponse: hoDePh(Number(T.pH.toFixed(1))), tol: { rel: 0.04 }, unite: "mol·L⁻¹",
              indice: "$[\\mathrm{HO^-}] = \\dfrac{K_e}{[\\mathrm{H_3O^+}]} = 10^{\\mathrm{pH} - 14}$.",
              pieges: pieges(hoDePh(Number(T.pH.toFixed(1))), { rel: 0.04 }, [
                { v: hDe(Number(T.pH.toFixed(1))), fb: "$10^{-\\mathrm{pH}}$ donne $[\\mathrm{H_3O^+}]$, pas $[\\mathrm{HO^-}]$ : utilise $[\\mathrm{HO^-}] = K_e / 10^{-\\mathrm{pH}}$.", erreur: "−log[HO⁻] pris pour le pH" },
                { v: KE / Number(T.pH.toFixed(1)), fb: "pH pris pour une concentration : on divise $K_e$ par $10^{-\\mathrm{pH}}$, pas par le nombre pH.", erreur: "pH et concentration confondus" },
              ]),
            },
        ],
        correction: [
          { tex: "2\\,\\mathrm{H_2O_{(l)} \\rightleftarrows H_3O^+_{(aq)} + HO^-_{(aq)}}\\quad;\\quad K_e = [\\mathrm{H_3O^+}][\\mathrm{HO^-}] = 1{,}0\\times10^{-14}", r: "À $25\\ ^\\circ\\mathrm{C}$, la frontière de neutralité est $\\mathrm{pH} = \\tfrac{1}{2}\\,\\mathrm{p}K_e = 7{,}0$." },
          { tex: `\\mathrm{pH} = \\mathrm{p}K_e + \\log[\\mathrm{HO^-}] \\approx ${frTex(T.pH, 2)}`, r: "Lien direct entre le pH et la concentration en ions hydroxyde." },
        ],
      };
    },
  },

  /* 4 : C et pH -> K_A et pK_A */
  {
    id: "ab-ka-ph",
    titre: "Constante d’acidité K_A et pK_A à partir de C et du pH",
    niveau: 2,
    capacites: CAPAB("2.2.3.5", "2.2.3.6"),
    erreurs: ["acide faible supposé intact", "carré oublié au numérateur", "pK_A pris égal au pH", "signe moins oublié dans pK_A"],
    gen(h) {
      const T = tire(() => {
        const a = h.pick(ACIDES);
        const C = h.pick([1e-3, 2e-3, 5e-3, 1e-2]);
        const pH = Number(phReel(C, a.pka).toFixed(2));
        const tau = tauDePh(C, pH);
        const ka = qrDePh(C, pH);
        const pka = -Math.log10(ka);
        return { a, C, pH, h: hDe(pH), tau, ka, pka };
      }, (t) => t.tau >= 0.04 && t.tau <= 0.5 && Math.abs(t.pH - t.pka) >= 0.35);
      const tolKa = { rel: 0.015 }, tolPka = { abs: 0.05 };
      return {
        enonce: `<p>On prépare une solution aqueuse ${T.a.de} ($${m(T.a.AH)}/${m(T.a.A)}$) de concentration apportée $C = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$. À l’équilibre, son pH vaut $${frTex(T.pH, 2)}$.</p>`,
        questions: [
          {
            type: "nombre", sujet: "calculer K_A = [H₃O⁺]²_éq / (C − [H₃O⁺]_éq)",
            q: "Calcule la constante d’acidité $K_A$ du couple (sans unité).",
            reponse: T.ka, tol: tolKa,
            indice: "$[\\mathrm{A^-}]_{\\text{éq}} = [\\mathrm{H_3O^+}]_{\\text{éq}} = 10^{-\\mathrm{pH}}$ et $[\\mathrm{AH}]_{\\text{éq}} = C - 10^{-\\mathrm{pH}}$, donc $K_A = \\dfrac{(10^{-\\mathrm{pH}})^2}{C - 10^{-\\mathrm{pH}}}$.",
            pieges: pieges(T.ka, tolKa, [
              { v: (T.h * T.h) / T.C, fb: "Acide faible supposé intact : au dénominateur, $[\\mathrm{AH}]_{\\text{éq}}$ vaut $C - 10^{-\\mathrm{pH}}$ et non $C$.", erreur: "acide faible supposé intact" },
              { v: T.h / (T.C - T.h), fb: "Carré oublié au numérateur : $[\\mathrm{A^-}]_{\\text{éq}}$ et $[\\mathrm{H_3O^+}]_{\\text{éq}}$ valent tous deux $10^{-\\mathrm{pH}}$.", erreur: "carré oublié au numérateur" },
            ]),
          },
          {
            type: "nombre", sujet: "calculer pK_A = −log K_A",
            q: "Déduis-en la valeur du $\\mathrm{p}K_A$ du couple.",
            reponse: T.pka, tol: tolPka,
            indice: "$\\mathrm{p}K_A = -\\log K_A$.",
            pieges: pieges(T.pka, tolPka, [
              { v: T.pH, fb: "$\\mathrm{p}K_A$ pris égal au pH : le pH dépend de $C$, tandis que $\\mathrm{p}K_A = -\\log K_A$.", erreur: "pK_A pris égal au pH" },
              { v: -T.pka, fb: "Signe moins oublié : $\\mathrm{p}K_A = -\\log K_A$ est positif ici.", erreur: "signe moins oublié dans pK_A" },
            ]),
          },
        ],
        correction: [
          { tex: `K_A = \\dfrac{[\\mathrm{H_3O^+}]_{\\text{éq}}^2}{C - [\\mathrm{H_3O^+}]_{\\text{éq}}} = \\dfrac{(10^{-${frTex(T.pH, 2)}})^2}{${num(T.C, 2)} - 10^{-${frTex(T.pH, 2)}}} \\approx ${sci(T.ka, 3)}`, r: "Expression littérale issue du tableau d’avancement, puis application numérique." },
          { tex: `\\mathrm{p}K_A = -\\log K_A \\approx ${frTex(T.pka, 2)}`, r: "Définition du $\\mathrm{p}K_A$." },
        ],
      };
    },
  },

  /* 5 : C et tau -> K_A = C tau^2 / (1 - tau), puis pK_A */
  {
    id: "ab-ka-tau",
    titre: "Relier la constante d’acidité à C et au taux d’avancement τ",
    niveau: 2,
    capacites: CAPAB("2.2.3.5", "2.2.2.3"),
    erreurs: ["acide faible supposé intact", "C simplifiée à tort", "mantisse ignorée dans −log K_A"],
    gen(h) {
      const T = tire(() => {
        const C = h.pick([2e-3, 5e-3, 1e-2, 2e-2]);
        const tau = h.pick([0.045, 0.062, 0.072, 0.085, 0.115, 0.145, 0.225]);
        const ka = kaDeTau(C, tau);
        const pka = -Math.log10(ka);
        const expSeul = -Math.floor(Math.log10(ka));
        return { C, tau, ka, pka, expSeul };
      }, (t) => Math.abs(t.pka - t.expSeul) >= 0.16 && Math.abs(t.pka - (t.expSeul - 1)) >= 0.16);
      const tolKa = { rel: 0.015 }, tolPka = { abs: 0.05 };
      return {
        enonce: `<p>Forme des sujets 2015, 2019 et 2021 : une solution aqueuse d’acide faible $\\mathrm{AH}$ de concentration $C = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$ présente un taux d’avancement final $\\tau = ${frTex(T.tau, 3)}$.</p>`,
        questions: [
          {
            type: "qcm", sujet: "établir K_A = C τ² / (1 − τ)",
            q: "Quelle est l’expression de la constante d’acidité $K_A$ en fonction de $C$ et $\\tau$ ?",
            options: h.melange([
              { t: "$K_A = \\dfrac{C\\,\\tau^2}{1 - \\tau}$", ok: true },
              { t: "$K_A = C\\,\\tau^2$", fb: "Acide faible supposé intact : au dénominateur, $[\\mathrm{AH}]_{\\text{éq}} = C(1 - \\tau)$ et non $C$.", erreur: "acide faible supposé intact" },
              { t: "$K_A = \\dfrac{\\tau^2}{1 - \\tau}$", fb: "Concentration $C$ simplifiée deux fois : $(C\\tau)^2 / (C(1-\\tau))$ laisse un facteur $C$ au numérateur.", erreur: "C simplifiée à tort" },
            ]),
          },
          {
            type: "nombre", sujet: "calculer K_A depuis C et τ",
            q: "Calcule la valeur de $K_A$ (sans unité).",
            reponse: T.ka, tol: tolKa,
            indice: "$K_A = \\dfrac{C\\,\\tau^2}{1 - \\tau}$.",
            pieges: pieges(T.ka, tolKa, [
              { v: T.C * T.tau * T.tau, fb: "Facteur $(1 - \\tau)$ oublié au dénominateur : $K_A = C\\,\\tau^2 / (1 - \\tau)$.", erreur: "acide faible supposé intact" },
              { v: (T.tau * T.tau) / (1 - T.tau), fb: "Facteur $C$ oublié au numérateur : $K_A = C\\,\\tau^2 / (1 - \\tau)$.", erreur: "C simplifiée à tort" },
            ]),
          },
          {
            type: "nombre", sujet: "déduire pK_A = −log K_A",
            q: "Déduis-en le $\\mathrm{p}K_A$ du couple $\\mathrm{AH/A^-}$.",
            reponse: T.pka, tol: tolPka,
            indice: "$\\mathrm{p}K_A = -\\log K_A$ : prends en compte la mantisse et l’exposant.",
            pieges: pieges(T.pka, tolPka, [
              { v: T.expSeul, fb: "Mantisse ignorée : tu n’as gardé que l’exposant de $10$, calcule $-\\log K_A$ complet.", erreur: "mantisse ignorée dans −log K_A" },
              { v: T.expSeul - 1, fb: "Mantisse ignorée : calcule $-\\log K_A$ à la calculatrice.", erreur: "mantisse ignorée dans −log K_A" },
            ]),
          },
        ],
        correction: [
          { tex: `K_A = \\dfrac{[\\mathrm{A^-}][\\mathrm{H_3O^+}]}{[\\mathrm{AH}]} = \\dfrac{(C\\tau)^2}{C(1 - \\tau)} = \\dfrac{C\\,\\tau^2}{1 - \\tau} \\approx ${sci(T.ka, 3)}`, r: "Avec $[\\mathrm{H_3O^+}]_{\\text{éq}} = [\\mathrm{A^-}]_{\\text{éq}} = C\\tau$ et $[\\mathrm{AH}]_{\\text{éq}} = C(1 - \\tau)$." },
          { tex: `\\mathrm{p}K_A = -\\log K_A \\approx ${frTex(T.pka, 2)}`, r: "Application de $\\mathrm{p}K_A = -\\log K_A$." },
        ],
      };
    },
  },

  /* 6 : Comparer des acides ou des bases à même concentration */
  {
    id: "ab-comparer",
    titre: "Comparer des acides ou des bases à même concentration",
    niveau: 1,
    capacites: CAPAB("2.2.3.6"),
    erreurs: ["force et concentration confondues", "échelle de pK_A lue à l’envers", "K_A et pK_A comparés sans conversion"],
    gen(h) {
      const C = h.pick([1e-3, 1e-2, 5e-2]);
      const mode = h.int(0, 2); // 0 : deux acides (pK_A), 1 : deux acides (K_A vs pK_A), 2 : deux bases (pK_A)
      if (mode === 0) {
        const [a1, a2] = h.melange(ACIDES).slice(0, 2).sort((x, y) => x.pka - y.pka);
        return {
          enonce: `<p>Deux solutions aqueuses ont la même concentration $C = ${num(C, 2)}\\ \\text{mol·L}^{-1}$ : une solution ${a1.de} ($\\mathrm{p}K_{A1} = ${frTex(a1.pka, a1.decPka)}$) et une solution ${a2.de} ($\\mathrm{p}K_{A2} = ${frTex(a2.pka, a2.decPka)}$).</p>`,
          questions: [{
            type: "qcm", sujet: "à même C, le plus petit pK_A donne le pH le plus bas",
            q: "Laquelle de ces deux solutions a le pH le plus bas ?",
            options: h.melange([
              { t: `${a1.nom} : son $\\mathrm{p}K_A$ est le plus petit`, ok: true },
              { t: `${a2.nom} : son $\\mathrm{p}K_A$ est le plus grand`, fb: "Échelle de $\\mathrm{p}K_A$ lue à l’envers : plus le $\\mathrm{p}K_A$ est petit, plus $K_A$ est grand et plus le pH est bas.", erreur: "échelle de pK_A lue à l’envers" },
              { t: "les deux ont le même pH : même concentration $C$", fb: "Force et concentration confondues : à même concentration $C$, deux acides de $\\mathrm{p}K_A$ différents n’ont pas le même taux d’avancement.", erreur: "force et concentration confondues" },
            ]),
          }],
          correction: [
            { t: `À même concentration apportée $C$, l’acide qui se dissocie le plus a la plus grande constante $K_A$, donc le plus petit $\\mathrm{p}K_A$ : ici ${a1.nom} ($\\mathrm{p}K_{A1} = ${frTex(a1.pka, a1.decPka)} < ${frTex(a2.pka, a2.decPka)}$).` },
          ],
        };
      }
      if (mode === 1) {
        const [a1, a2] = h.melange(ACIDES).slice(0, 2).sort((x, y) => x.pka - y.pka);
        const ka1 = Number((10 ** -a1.pka).toPrecision(2));
        return {
          enonce: `<p>À la même concentration $C = ${num(C, 2)}\\ \\text{mol·L}^{-1}$, on compare ${a1.nom} ($K_{A1} = ${sci(ka1, 2)}$) et ${a2.nom} ($\\mathrm{p}K_{A2} = ${frTex(a2.pka, a2.decPka)}$).</p>`,
          questions: [{
            type: "qcm", sujet: "convertir K_A en pK_A avant de comparer deux acides",
            q: "Lequel des deux acides est le plus fort (donne le pH le plus bas à même $C$) ?",
            options: h.melange([
              { t: `${a1.nom} : $\\mathrm{p}K_{A1} = ${frTex(a1.pka, a1.decPka)} < ${frTex(a2.pka, a2.decPka)}$`, ok: true },
              { t: `${a2.nom} : $${frTex(a2.pka, a2.decPka)} > ${sci(ka1, 2)}$`, fb: "$K_A$ et $\\mathrm{p}K_A$ comparés sans conversion : calcule d’abord $\\mathrm{p}K_{A1} = -\\log K_{A1} \\approx " + frTex(a1.pka, a1.decPka) + "$.", erreur: "K_A et pK_A comparés sans conversion" },
              { t: `${a2.nom} : son $\\mathrm{p}K_A$ est plus élevé`, fb: "Échelle de $\\mathrm{p}K_A$ lue à l’envers : l’acide le plus fort a le plus petit $\\mathrm{p}K_A$.", erreur: "échelle de pK_A lue à l’envers" },
            ]),
          }],
          correction: [
            { tex: `\\mathrm{p}K_{A1} = -\\log(${sci(ka1, 2)}) \\approx ${frTex(a1.pka, a1.decPka)} < \\mathrm{p}K_{A2}`, r: "On convertit dans la même grandeur avant de comparer : le plus petit $\\mathrm{p}K_A$ désigne l’acide le plus fort." },
          ],
        };
      }
      const [b1, b2] = h.melange(BASES).slice(0, 2).sort((x, y) => y.pka - x.pka); // b1 a le plus grand pK_A -> pH le plus haut
      return {
        enonce: `<p>Deux solutions basiques ont la même concentration $C = ${num(C, 2)}\\ \\text{mol·L}^{-1}$ : ${b1.nom} ($${m(b1.couple)}$, $\\mathrm{p}K_{A1} = ${frTex(b1.pka, b1.decPka)}$) et ${b2.nom} ($${m(b2.couple)}$, $\\mathrm{p}K_{A2} = ${frTex(b2.pka, b2.decPka)}$).</p>`,
        questions: [{
          type: "qcm", sujet: "à même C, la base du couple de plus grand pK_A donne le pH le plus haut",
          q: "Laquelle de ces deux solutions a le pH le plus élevé ?",
          options: h.melange([
            { t: `${b1.nom} : son couple a le plus grand $\\mathrm{p}K_A$`, ok: true },
            { t: `${b2.nom} : son couple a le plus petit $\\mathrm{p}K_A$`, fb: "Règle des acides appliquée aux bases : plus le $\\mathrm{p}K_A$ est grand, plus l’acide conjugué est faible et plus la base est forte.", erreur: "échelle de pK_A lue à l’envers" },
            { t: "les deux ont le même pH : même concentration $C$", fb: "Force et concentration confondues : deux bases de couples différents ne réagissent pas autant avec l’eau.", erreur: "force et concentration confondues" },
          ]),
        }],
        correction: [
          { t: `Plus le $\\mathrm{p}K_A$ du couple est grand, plus la base conjuguée réagit avec l’eau et élève le pH : ici ${b1.nom} ($\\mathrm{p}K_{A1} = ${frTex(b1.pka, b1.decPka)} > ${frTex(b2.pka, b2.decPka)}$).` },
        ],
      };
    },
  },

  /* 7 : K entre deux couples acide/base */
  {
    id: "ab-k-couples",
    titre: "Constante d’équilibre entre deux couples acide/base",
    niveau: 2,
    capacites: CAPAB("2.2.3.7"),
    erreurs: ["rapport K_A2 / K_A1 inversé", "écart des pK_A pris pour K", "toute réaction acide-base dite totale", "K < 1 lu comme réaction nulle", "⇄ donc τ = 0,50"],
    gen(h) {
      const T = tire(() => {
        const [c1, c2] = h.melange(COUPLES).slice(0, 2);
        const K = kDeuxCouples(c1.pka, c2.pka);
        const Kinv = kDeuxCouples(c2.pka, c1.pka);
        const delta = c2.pka - c1.pka;
        return { c1, c2, K, Kinv, delta, tau: tauEquimol(K) };
      }, (t) => Math.abs(t.delta) >= 0.45 && distinctsVal([t.K, t.Kinv, Math.abs(t.delta)], 0.08));
      const tol = { rel: 0.03 };
      const grandK = T.K >= 1e3;
      const petitK = T.K < 1;
      return {
        enonce: `<p>On écrit la réaction entre ${T.c1.nom} ($\\mathrm{p}K_{A1} = ${frTex(T.c1.pka, T.c1.decPka)}$) et la base $${m(T.c2.A)}$ du couple $${m(T.c2.AH)}/${m(T.c2.A)}$ ($\\mathrm{p}K_{A2} = ${frTex(T.c2.pka, T.c2.decPka)}$) : $${m(aq(T.c1.AH))} + ${m(aq(T.c2.A))} \\rightleftarrows ${m(aq(T.c1.A))} + ${m(aq(T.c2.AH))}$.</p>`,
        questions: [
          {
            type: "nombre", sujet: "calculer K = K_A1 / K_A2 = 10^(pK_A2 − pK_A1)",
            q: "Calcule la constante d’équilibre $K$ associée à cette équation (sans unité).",
            reponse: T.K, tol,
            indice: "L’acide à gauche est $" + m(T.c1.AH) + "$, donc $K = \\dfrac{K_{A1}}{K_{A2}} = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}}$.",
            pieges: pieges(T.K, tol, [
              { v: T.Kinv, fb: "Rapport inversé : l’acide qui réagit à gauche donne son $K_A$ au numérateur, $K = K_{A1}/K_{A2}$.", erreur: "rapport K_A2 / K_A1 inversé" },
              { v: T.delta, fb: "Écart des $\\mathrm{p}K_A$ pris pour $K$ : $\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}$ est $\\log K$, il reste à calculer $10^{\\log K}$.", erreur: "écart des pK_A pris pour K" },
              { v: Math.abs(T.delta), fb: "Écart des $\\mathrm{p}K_A$ pris pour $K$ : $K = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}}$.", erreur: "écart des pK_A pris pour K" },
            ]),
          },
          grandK
            ? {
              type: "qcm", sujet: "grand K et transformation quasi totale",
              q: "Pour des quantités initiales égales des deux réactifs, que dire de cette transformation ?",
              options: h.melange([
                { t: `pratiquement totale : $\\tau \\approx ${frTex(T.tau, 2)}$ est très proche de $1$`, ok: true },
                { t: "limitée à la moitié : la double flèche impose $\\tau = 0{,}50$", fb: "Double flèche lue comme $\\tau = 0{,}50$ : $\\tau$ se calcule avec $K$, ici $\\sqrt{K}/(1+\\sqrt{K})$ est proche de $1$.", erreur: "⇄ donc τ = 0,50" },
                { t: "très limitée : car l’équation comporte deux acides faibles", fb: "Constante $K$ ignorée : ici $K > 10^3$, la réaction entre l’acide et la base est quasi totale.", erreur: "K < 1 lu comme réaction nulle" },
              ]),
            }
            : {
              type: "qcm", sujet: "réaction limitée quand K n’est pas très grand",
              q: "Pour des quantités initiales égales des deux réactifs, que dire de cette transformation ?",
              options: h.melange([
                { t: `limitée : à l’équilibre, $\\tau \\approx ${frTex(T.tau, 2)}$`, ok: true },
                { t: "totale : un acide et une base réagissent jusqu’à épuisement", fb: "Toute réaction acide-base supposée totale : seule une grande constante $K$ ($K > 10^4$) donne $\\tau \\approx 1$.", erreur: "toute réaction acide-base dite totale" },
                petitK
                  ? { t: "nulle : comme $K < 1$, aucune molécule ne réagit", fb: "$K < 1$ lu comme absence de réaction : même avec $K < 1$, une fraction $\\tau = \\sqrt{K}/(1+\\sqrt{K})$ réagit.", erreur: "K < 1 lu comme réaction nulle" }
                  : { t: "partagée exactement en deux : $\\tau = 0{,}50$ à cause de $\\rightleftarrows$", fb: "Double flèche lue comme $\\tau = 0{,}50$ : $\\tau = \\sqrt{K}/(1+\\sqrt{K})$ dépend de la valeur de $K$.", erreur: "⇄ donc τ = 0,50" },
              ]),
            },
        ],
        correction: [
          { tex: `K = \\dfrac{K_{A1}}{K_{A2}} = 10^{${frTex(T.c2.pka, T.c2.decPka)} - ${frTex(T.c1.pka, T.c1.decPka)}} \\approx ${num(T.K, 3)}`, r: "L’acide réactif place $K_{A1}$ au numérateur." },
          { tex: `\\tau = \\dfrac{\\sqrt{K}}{1 + \\sqrt{K}} \\approx ${frTex(T.tau, 2)}`, r: "Pour des quantités initiales égales $n_1 = n_2$." },
        ],
      };
    },
  },

  /* 8 : Mélange équimolaire de deux couples (forme 2023 §2) */
  {
    id: "ab-melange",
    titre: "Mélange équimolaire d’un acide et de la base d’un autre couple",
    niveau: 3,
    capacites: CAPAB("2.2.3.7", "2.2.3.5"),
    erreurs: ["rapport K_A2 / K_A1 inversé", "différence des pK_A au lieu de la demi-somme", "division par 2 oubliée", "demi-somme appliquée à des quantités inégales"],
    gen(h) {
      const T = tire(() => {
        const [c1, c2] = h.melange(COUPLES).slice(0, 2);
        const K = kDeuxCouples(c1.pka, c2.pka);
        const Kinv = kDeuxCouples(c2.pka, c1.pka);
        const ph = (c1.pka + c2.pka) / 2;
        const diff = Math.abs(c1.pka - c2.pka) / 2;
        const somme = c1.pka + c2.pka;
        return { c1, c2, K, Kinv, ph, diff, somme };
      }, (t) => Math.abs(t.c1.pka - t.c2.pka) >= 0.45 && Math.abs(t.ph - 7) >= 0.15 && distinctsVal([t.ph, t.diff, t.somme], 0.05, 0.2));
      return {
        enonce: `<p>Forme du sujet 2023, §2 : on mélange un volume $V_1$ d’une solution contenant $${m(T.c1.AH)}$ ($\\mathrm{p}K_{A1} = ${frTex(T.c1.pka, T.c1.decPka)}$) de concentration $C$ avec un volume $V_2 = V_1$ d’une solution contenant $${m(T.c2.A)}$ ($\\mathrm{p}K_{A2} = ${frTex(T.c2.pka, T.c2.decPka)}$) de même concentration $C$. L’équation est $${m(aq(T.c1.AH))} + ${m(aq(T.c2.A))} \\rightleftarrows ${m(aq(T.c1.A))} + ${m(aq(T.c2.AH))}$.</p>`,
        questions: [
          {
            type: "nombre", sujet: "K = K_A1 / K_A2 entre deux couples",
            q: "Calcule la constante d’équilibre $K$ associée à cette équation.",
            reponse: T.K, tol: { rel: 0.03 },
            indice: "$K = \\dfrac{K_{A1}}{K_{A2}} = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}}$.",
            pieges: pieges(T.K, { rel: 0.03 }, [
              { v: T.Kinv, fb: "Rapport inversé : l’acide à gauche est $" + m(T.c1.AH) + "$, donc $K = K_{A1}/K_{A2}$.", erreur: "rapport K_A2 / K_A1 inversé" },
            ]),
          },
          {
            type: "nombre", sujet: "pH = (pK_A1 + pK_A2) / 2 pour un mélange équimolaire",
            q: "Calcule le pH du mélange à l’équilibre.",
            reponse: T.ph, tol: { abs: 0.05 },
            indice: "Additionne $\\mathrm{pH} = \\mathrm{p}K_{A1} + \\log([\\mathrm{A_1^-}]/[\\mathrm{A_1H}])$ et $\\mathrm{pH} = \\mathrm{p}K_{A2} + \\log([\\mathrm{A_2^-}]/[\\mathrm{A_2H}])$.",
            pieges: pieges(T.ph, { abs: 0.05 }, [
              { v: T.diff, fb: "Différence utilisée au lieu de la somme : l’addition des deux relations donne $2\\,\\mathrm{pH} = \\mathrm{p}K_{A1} + \\mathrm{p}K_{A2}$.", erreur: "différence des pK_A au lieu de la demi-somme" },
              { v: -T.diff, fb: "Différence utilisée au lieu de la somme : $\\mathrm{pH} = (\\mathrm{p}K_{A1} + \\mathrm{p}K_{A2}) / 2$.", erreur: "différence des pK_A au lieu de la demi-somme" },
              { v: T.somme, fb: "Division par $2$ oubliée : la somme des deux égalités donne $2\\,\\mathrm{pH}$ à gauche.", erreur: "division par 2 oubliée" },
            ]),
          },
          {
            type: "qcm", sujet: "condition d’égalité des quantités initiales",
            q: "Si l’on prenait $V_2 = 3\\,V_1$ (même concentration $C$), la relation $\\mathrm{pH} = \\tfrac{1}{2}(\\mathrm{p}K_{A1} + \\mathrm{p}K_{A2})$ resterait-elle vraie ?",
            options: h.melange([
              { t: "non : les deux rapports de concentrations ne sont plus inverses", ok: true },
              { t: "oui : le pH d’un mélange de deux couples ne dépend que des $\\mathrm{p}K_A$", fb: "Condition d’équimolarité oubliée : $[\\mathrm{A_1H}]_{\\text{éq}} = [\\mathrm{A_2^-}]_{\\text{éq}}$ n’est vraie que si $C_1 V_1 = C_2 V_2$.", erreur: "demi-somme appliquée à des quantités inégales" },
            ]),
          },
        ],
        correction: [
          { tex: `K = 10^{${frTex(T.c2.pka, T.c2.decPka)} - ${frTex(T.c1.pka, T.c1.decPka)}} \\approx ${num(T.K, 3)}`, r: "Rapport $K_{A1}/K_{A2}$." },
          { tex: `2\\,\\mathrm{pH} = \\mathrm{p}K_{A1} + \\mathrm{p}K_{A2} \\implies \\mathrm{pH} = \\dfrac{${frTex(T.c1.pka, T.c1.decPka)} + ${frTex(T.c2.pka, T.c2.decPka)}}{2} = ${frTex(T.ph, 2)}`, r: "Car $C V_1 = C V_2$ rend les deux rapports inverses l’un de l’autre." },
        ],
      };
    },
  },

  /* 9 : Espèce prédominante, nature de la solution et rapport [A-]/[AH] */
  {
    id: "ab-predom",
    titre: "Nature de la solution, espèce prédominante et rapport [A⁻]/[AH]",
    niveau: 1,
    capacites: CAPAB("2.2.3.8", "2.2.3.9"),
    erreurs: ["nature de la solution et forme confondues", "échelle de pH lue à l’envers", "égalité des formes placée à pH 7", "log 1 pris égal à 1"],
    gen(h) {
      const T = tire(() => {
        const c = h.pick(COUPLES);
        const entre = h.int(0, 2) < 2;
        const pH = entre
          ? Number(((c.pka + PH_NEUTRE) / 2 + h.pick([-0.3, 0, 0.3])).toFixed(1))
          : h.pick([2.6, 3.1, 5.6, 6.2, 8.2, 10.2]);
        const rap = rapCouple(pH, c.pka);
        return { c, pH, rap, rapInv: 1 / rap };
      }, (t) => Math.abs(t.pH - t.c.pka) >= 0.4 && Math.abs(t.pH - PH_NEUTRE) >= 0.4 && distinctsVal([t.c.pka, PH_NEUTRE, t.c.pka + 1], 0.05, 0.2));
      const solAcide = T.pH < PH_NEUTRE;
      const baseDom = T.pH > T.c.pka;
      const natMot = solAcide ? "acide" : "basique";
      const natOpp = solAcide ? "basique" : "acide";
      const espOk = baseDom ? m(T.c.A) : m(T.c.AH);
      const espKo = baseDom ? m(T.c.AH) : m(T.c.A);
      return {
        enonce: `<p>À $25\\ ^\\circ\\mathrm{C}$, une solution aqueuse contenant le couple $${m(T.c.AH)}/${m(T.c.A)}$ ($\\mathrm{p}K_A = ${frTex(T.c.pka, T.c.decPka)}$) a un pH égal à $${frTex(T.pH, 1)}$.</p>`,
        questions: [
          {
            type: "qcm", sujet: "juger la nature face à 7 et la prédominance face au pK_A",
            q: "Quelle est la nature de la solution et quelle espèce du couple y prédomine ?",
            options: h.melange([
              { t: `solution ${natMot}, et $${espOk}$ prédomine`, ok: true },
              { t: `solution ${natMot}, et $${espKo}$ prédomine`, fb: (solAcide === baseDom)
                ? "Nature de la solution confondue avec la forme prédominante : la prédominance se juge face au $\\mathrm{p}K_A$, pas face à $7$."
                : "Échelle de pH lue à l’envers : sous le $\\mathrm{p}K_A$ c’est l’acide qui prédomine, au-dessus c’est la base.", erreur: (solAcide === baseDom) ? "nature de la solution et forme confondues" : "échelle de pH lue à l’envers" },
              { t: `solution ${natOpp}, et $${espOk}$ prédomine`, fb: "Forme prédominante prise pour la nature de la solution : acide ou basique se juge uniquement en comparant le pH à $7$.", erreur: "nature de la solution et forme confondues" },
            ]),
          },
          {
            type: "nombre", sujet: "calculer [A⁻]_éq / [AH]_éq = 10^(pH − pK_A)",
            q: `Calcule le rapport $\\dfrac{[${m(T.c.A)}]_{\\text{éq}}}{[${m(T.c.AH)}]_{\\text{éq}}}$.`,
            reponse: T.rap, tol: { rel: 0.03 },
            indice: "$\\mathrm{pH} = \\mathrm{p}K_A + \\log\\!\\left(\\dfrac{[\\mathrm{A^-} finalize]}{[\\mathrm{AH}]}\\right)$ donne $\\dfrac{[\\mathrm{A^-}]}{[\\mathrm{AH}]} = 10^{\\mathrm{pH} - \\mathrm{p}K_A}$. ".replace(" finalize", ""),
            pieges: pieges(T.rap, { rel: 0.03 }, [
              { v: T.rapInv, fb: "Exposant pris à l’envers ($10^{\\mathrm{p}K_A - \\mathrm{pH}}$) : quand $\\mathrm{pH} > \\mathrm{p}K_A$, $[\\mathrm{A^-}]/[\\mathrm{AH}] > 1$.", erreur: "échelle de pH lue à l’envers" },
            ]),
          },
          {
            type: "nombre", sujet: "pH d’égalité des concentrations des deux formes",
            q: `À quelle valeur de pH aurait-on $[${m(T.c.A)}]_{\\text{éq}} = [${m(T.c.AH)}]_{\\text{éq}}$ ?`,
            reponse: T.c.pka, tol: { abs: 0.03 },
            indice: "Quand le rapport vaut $1$, $\\log 1 = 0$.",
            pieges: pieges(T.c.pka, { abs: 0.03 }, [
              { v: PH_NEUTRE, fb: "Égalité des formes placée à $\\mathrm{pH} = 7$ : $[\\mathrm{A^-}] = [\\mathrm{AH}]$ a lieu en $\\mathrm{pH} = \\mathrm{p}K_A$.", erreur: "égalité des formes placée à pH 7" },
              { v: T.c.pka + 1, fb: "$\\log 1$ pris égal à $1$ : $\\log 1 = 0$, donc $\\mathrm{pH} = \\mathrm{p}K_A$.", erreur: "log 1 pris égal à 1" },
            ]),
          },
        ],
        correction: [
          { t: `À $25\\ ^\\circ\\mathrm{C}$, $\\mathrm{pH} = ${frTex(T.pH, 1)}$ comparé à $7$ donne une solution ${natMot} ; comparé à $\\mathrm{p}K_A = ${frTex(T.c.pka, T.c.decPka)}$, il indique que $${espOk}$ prédomine.` },
          { tex: `\\dfrac{[${m(T.c.A)}]_{\\text{éq}}}{[${m(T.c.AH)}]_{\\text{éq}}} = 10^{${frTex(T.pH, 1)} - ${frTex(T.c.pka, T.c.decPka)}} \\approx ${num(T.rap, 3)}`, r: "Et l’égalité des concentrations a lieu pour $\\mathrm{pH} = \\mathrm{p}K_A$." },
        ],
      };
    },
  },

  /* 10 : Diagramme de distribution (PC et SM seulement) */
  {
    id: "ab-distribution",
    titre: "Diagramme de distribution d’un couple acide/base (PC et SM)",
    niveau: 2,
    filieres: ["PC", "SM"],
    capacites: CAPAB_PCSM("2.2.3.9"),
    erreurs: ["bascule supposée totale à 100 %", "prédominance confondue avec 100 %", "croisement placé à pH 7", "variation supposée linéaire"],
    gen(h) {
      const T = tire(() => {
        const a = h.pick(ACIDES);
        const dph = h.pick([-1.5, -1.0, 0.8, 1.0, 1.3, 1.6]);
        const pH = Number((a.pka + dph).toFixed(2));
        const pctB = partBase(pH, a.pka) * 100;
        const pctLin = clampPct(50 + 10 * (pH - a.pka));
        const pctTout = dph > 0 ? 100 : 0;
        return { a, pH, dph, pctB, pctLin, pctTout };
      }, (t) => Math.abs(t.pctB - t.pctLin) >= 6 && Math.abs(t.pctB - t.pctTout) >= 4);
      function clampPct(x) { return Math.max(0, Math.min(100, x)); }
      const phProche = Number((T.a.pka + 0.2).toFixed(2));
      const phLoin = Number((T.a.pka + 3.0).toFixed(2));
      const pProche = Math.round(partBase(phProche, T.a.pka) * 100);
      return {
        enonce: `<p>Le graphique ci-dessous donne le diagramme de distribution d’un couple acide/base noté $\\mathrm{AH/A^-}$ en fonction du pH.</p>`,
        figure: svgDistribution(T.a.pka, "AH", "A⁻"),
        questions: [
          {
            type: "nombre", sujet: "lire le pK_A au croisement à 50 %",
            q: `Sachant que les deux courbes se croisent exactement en $\\mathrm{pH} = ${frTex(T.a.pka, T.a.decPka)}$ (ou en lisant l’abscisse du croisement), que vaut le $\\mathrm{p}K_A$ du couple ?`.replace(`exactement en $\\mathrm{pH} = ${frTex(T.a.pka, T.a.decPka)}$ (ou en lisant l’abscisse du croisement)`, "à $50\\ \\%$ sur le diagramme"),
            reponse: T.a.pka, tol: { abs: 0.2 },
            indice: "Les deux courbes se coupent à $50\\ \\%$, là où $[\\mathrm{A^-}] = [\\mathrm{AH}]$, soit $\\mathrm{pH} = \\mathrm{p}K_A$.",
            pieges: pieges(T.a.pka, { abs: 0.2 }, [
              { v: PH_NEUTRE, fb: "Croisement placé à $\\mathrm{pH} = 7$ : les courbes de distribution se coupent en $\\mathrm{pH} = \\mathrm{p}K_A$.", erreur: "croisement placé à pH 7" },
              { v: T.a.pka + 2, fb: "Abscisse lue là où la courbe approche $100\\ \\%$ : le $\\mathrm{p}K_A$ se lit au croisement à $50\\ \\%$.", erreur: "bascule supposée totale à 100 %" },
            ]),
          },
          {
            type: "nombre", sujet: "calculer le pourcentage d’une forme avec pH et pK_A",
            q: `En prenant $\\mathrm{p}K_A = ${frTex(T.a.pka, T.a.decPka)}$, calcule le pourcentage de la forme basique $\\mathrm{A^-}$ à $\\mathrm{pH} = ${frTex(T.pH, 2)}$ (en $\\%$).`,
            reponse: T.pctB, tol: { abs: 1.5 }, unite: "%",
            indice: "$\\dfrac{[\\mathrm{A^-}]}{[\\mathrm{AH}]} = 10^{\\mathrm{pH} - \\mathrm{p}K_A}$, donc $\\%(\\mathrm{A^-}) = \\dfrac{100}{1 + 10^{\\mathrm{p}K_A - \\mathrm{pH}}}$.",
            pieges: pieges(T.pctB, { abs: 1.5 }, [
              { v: T.pctTout, fb: "Bascule supposée totale dès le franchissement du $\\mathrm{p}K_A$ : les deux formes coexistent.", erreur: "bascule supposée totale à 100 %" },
              { v: T.pctLin, fb: "Variation supposée linéaire ($10$ points par unité de pH) : le rapport varie en $10^{\\mathrm{pH} - \\mathrm{p}K_A}$.", erreur: "variation supposée linéaire" },
            ]),
          },
          {
            type: "qcm", sujet: "prédominance (> 50 %) face à présence quasi exclusive",
            q: `À $\\mathrm{pH}_1 = ${frTex(phProche, 2)}$ comme à $\\mathrm{pH}_2 = ${frTex(phLoin, 2)}$, la forme $\\mathrm{A^-}$ prédomine. Sa part vaut…`,
            options: h.melange([
              { t: `environ $${pProche}\\ \\%$ à $\\mathrm{pH}_1$ et $99{,}9\\ \\%$ à $\\mathrm{pH}_2$`, ok: true },
              { t: "$100\\ \\%$ dans les deux solutions puisqu’elle prédomine", fb: "Prédominance confondue avec présence unique : prédominer signifie seulement dépasser $50\\ \\%$.", erreur: "prédominance confondue avec 100 %" },
              { t: `environ $52\\ \\%$ à $\\mathrm{pH}_1$ et $80\\ \\%$ à $\\mathrm{pH}_2$`, fb: "Variation supposée linéaire : $3$ unités au-dessus du $\\mathrm{p}K_A$, le rapport vaut $10^3 = 1\\,000$, soit $99{,}9\\ \\%$.", erreur: "variation supposée linéaire" },
            ]),
          },
        ],
        correction: [
          { t: `Au croisement des deux courbes ($50\\ \\%$), $[\\mathrm{A^-}] = [\\mathrm{AH}]$, d’où $\\mathrm{p}K_A = ${frTex(T.a.pka, T.a.decPka)}$.` },
          { tex: `\\%(\\mathrm{A^-}) = \\dfrac{100}{1 + 10^{${frTex(T.a.pka, T.a.decPka)} - ${frTex(T.pH, 2)}}} \\approx ${frTex(T.pctB, 1)}\\ \\%`, r: "Calcul exact à partir du rapport $10^{\\mathrm{pH} - \\mathrm{p}K_A}$." },
        ],
      };
    },
  },

  /* 11 : Indicateur coloré et zone de virage */
  {
    id: "ab-indicateur",
    titre: "Indicateur coloré : espèce prédominante et zone de virage",
    niveau: 1,
    capacites: CAPAB("2.2.3.8"),
    erreurs: ["indicateur supposé virer à pH 7", "nature de la solution et forme confondues", "teinte intermédiaire hors de la zone", "tous les indicateurs vireraient au même pH"],
    gen(h) {
      const CAS = [
        { ind: INDICATEURS.hel, pH: 5.0, autreTeinte: "rouge" },
        { ind: INDICATEURS.hel, pH: 2.2, autreTeinte: "jaune" },
        { ind: INDICATEURS.bbt, pH: 5.0, autreTeinte: "bleue" },
        { ind: INDICATEURS.bbt, pH: 8.4, autreTeinte: "jaune" },
        { ind: INDICATEURS.phph, pH: 7.6, autreTeinte: "rose" },
        { ind: INDICATEURS.phph, pH: 11.0, autreTeinte: "incolore" },
      ];
      const c = h.pick(CAS);
      const info = teinteInd(c.ind.id, c.pH);
      const baseDom = info.zone > 0;
      const piegePdg = (c.ind.id === "hel" && c.pH === 5.0) || (c.ind.id === "phph" && c.pH === 7.6);
      return {
        enonce: `<p>On ajoute deux gouttes de <b>${c.ind.court}</b> (couple $\\mathrm{HIn/In^-}$) dans une solution aqueuse de $\\mathrm{pH} = ${frTex(c.pH, 1)}$ à $25\\ ^\\circ\\mathrm{C}$. Données : forme acide $\\mathrm{HIn}$ <b>${c.ind.acide}</b>, forme basique $\\mathrm{In^-}$ <b>${c.ind.base}</b>, zone de virage $[${frTex(c.ind.zone[0], 1)}\\ ;\\ ${frTex(c.ind.zone[1], 1)}]$.</p>`,
        questions: [
          {
            type: "qcm", sujet: "forme prédominante HIn ou In⁻ d’un indicateur",
            q: "Quelle forme du couple de l’indicateur prédomine nettement dans cette solution ?",
            options: h.melange([
              { t: baseDom ? "$\\mathrm{In^-}$ : le pH est au-dessus de la zone de virage" : "$\\mathrm{HIn}$ : le pH est en dessous de la zone de virage", ok: true },
              { t: baseDom ? "$\\mathrm{HIn}$ : en comparant le pH à $7$" : "$\\mathrm{In^-}$ : en comparant le pH à $7$", fb: "Nature de la solution confondue avec la forme de l’indicateur : l’indicateur bascule autour de son propre $\\mathrm{p}K_A$ (sa zone de virage), pas à $7$.", erreur: "nature de la solution et forme confondues" },
              { t: "autant de $\\mathrm{HIn}$ que de $\\mathrm{In^-}$", fb: "Teinte sensible placée hors de la zone : $\\mathrm{pH} = " + frTex(c.pH, 1) + "$ est en dehors de la zone de virage.", erreur: "teinte intermédiaire hors de la zone" },
            ]),
          },
          {
            type: "qcm", sujet: "teinte prise par un indicateur selon sa zone de virage",
            q: "Quelle teinte prend la solution ?",
            options: h.melange([
              { t: info.mot, ok: true },
              {
                t: c.autreTeinte,
                fb: piegePdg
                  ? "Indicateur supposé virer à $\\mathrm{pH} = 7$ : compare le pH aux bornes de la zone de virage, pas à $7$."
                  : "Zone de virage confondue avec celle d’un autre indicateur : compare $\\mathrm{pH} = " + frTex(c.pH, 1) + "$ à $[" + frTex(c.ind.zone[0], 1) + "\\ ;\\ " + frTex(c.ind.zone[1], 1) + "]$.",
                erreur: piegePdg ? "indicateur supposé virer à pH 7" : "tous les indicateurs vireraient au même pH",
              },
              { t: "une teinte intermédiaire entre les deux", fb: "Teinte intermédiaire hors de la zone : elle n’apparaît qu’à l’intérieur de $[" + frTex(c.ind.zone[0], 1) + "\\ ;\\ " + frTex(c.ind.zone[1], 1) + "]$.", erreur: "teinte intermédiaire hors de la zone" },
            ]),
          },
        ],
        correction: [
          { t: `On compare $\\mathrm{pH} = ${frTex(c.pH, 1)}$ à la zone de virage $[${frTex(c.ind.zone[0], 1)}\\ ;\\ ${frTex(c.ind.zone[1], 1)}]$ : la forme ${baseDom ? "$\\mathrm{In^-}$" : "$\\mathrm{HIn}$"} impose sa teinte <b>${info.mot}</b>.` },
        ],
      };
    },
  },

  /* 12 : Les sujets du bac */
  {
    id: "ab-bac",
    titre: "Au bac : Q_r,éq, pK_A d’un acide ou d’une base, identification et deux couples",
    niveau: 3,
    capacites: CAPAB("2.2.2.3", "2.2.3.4", "2.2.3.5", "2.2.3.6", "2.2.3.7", "2.2.3.8"),
    erreurs: [
      "acide faible supposé intact", "pK_A pris égal au pH", "signe moins oublié dans pK_A",
      "−log[HO⁻] pris pour le pH", "pH et concentration confondus", "τ d’une base calculé avec [H₃O⁺]",
      "Q_r,éq d’une base pris pour K_A", "échelle de pK_A lue à l’envers", "rapport K_A2 / K_A1 inversé",
      "différence des pK_A au lieu de la demi-somme", "C simplifiée à tort",
    ],
    gen(h) {
      const forme = h.pick([2022, 2020, 2021, 2023, 2015, 2012]);
      const rejoue = h.int(0, 2) === 0;

      if (forme === 2022) {
        const T = rejoue
          ? { a: ACIDES[4], C: S22.Ca, pH: S22.pH, dec: 1 }
          : tire(() => {
            const a = h.pick(ACIDES), C = h.pick([5e-3, 1e-2, 2e-2]);
            const pH = Number(phReel(C, a.pka).toFixed(2));
            return { a, C, pH, dec: 2 };
          }, (t) => tauDePh(t.C, t.pH) >= 0.04 && Math.abs(t.pH + Math.log10(qrDePh(t.C, t.pH))) >= 0.35);
        const qr = qrDePh(T.C, T.pH), pka = -Math.log10(qr);
        return {
          enonce: `<p>Forme du sujet 2022, §1 : une solution aqueuse ${T.a.de} ($${m(T.a.AH)}$) a pour concentration $C_a = ${num(T.C, 2)}\\ \\text{mol·L}^{-1}$ et pour pH $${frTex(T.pH, T.dec)}$.</p>`,
          questions: [
            {
              type: "qcm", sujet: "expression littérale de Q_r,éq (sujet 2022)",
              q: "Quelle est l’expression de $Q_{r,\\text{éq}}$ en fonction de $C_a$ et $[\\mathrm{H_3O^+}]_{\\text{éq}}$ (0,75 pt) ?",
              options: h.melange([
                { t: "$Q_{r,\\text{éq}} = \\dfrac{[\\mathrm{H_3O^+}]_{\\text{éq}}^2}{C_a - [\\mathrm{H_3O^+}]_{\\text{éq}}}$", ok: true },
                { t: "$Q_{r,\\text{éq}} = \\dfrac{[\\mathrm{H_3O^+}]_{\\text{éq}}^2}{C_a}$", fb: "Acide faible supposé intact : l’expression exacte garde $C_a - [\\mathrm{H_3O^+}]_{\\text{éq}}$ au dénominateur.", erreur: "acide faible supposé intact" },
                { t: "$Q_{r,\\text{éq}} = \\dfrac{[\\mathrm{H_3O^+}]_{\\text{éq}}}{C_a - [\\mathrm{H_3O^+}]_{\\text{éq}}}$", fb: "Un seul facteur mis au numérateur : $[\\mathrm{A^-}]_{\\text{éq}} = [\\mathrm{H_3O^+}]_{\\text{éq}}$ donne un carré.", erreur: "C simplifiée à tort" },
              ]),
            },
            {
              type: "nombre", sujet: "calculer pK_A depuis Q_r,éq (sujet 2022)",
              q: "Calcule la valeur du $\\mathrm{p}K_A$ du couple (0,5 pt).",
              reponse: pka, tol: { abs: 0.05 },
              indice: "Calcule d’abord $Q_{r,\\text{éq}} = K_A$, puis $\\mathrm{p}K_A = -\\log K_A$.",
              pieges: pieges(pka, { abs: 0.05 }, [
                { v: T.pH, fb: "$\\mathrm{p}K_A$ pris égal au pH : $\\mathrm{p}K_A = -\\log Q_{r,\\text{éq}}$.", erreur: "pK_A pris égal au pH" },
                { v: -pka, fb: "Signe moins oublié dans $\\mathrm{p}K_A = -\\log K_A$.", erreur: "signe moins oublié dans pK_A" },
              ]),
            },
          ],
          correction: [
            { tex: `Q_{r,\\text{éq}} = \\dfrac{(10^{-${frTex(T.pH, T.dec)}})^2}{${num(T.C, 2)} - 10^{-${frTex(T.pH, T.dec)}}} \\approx ${sci(qr, 3)}`, r: "Expression littérale puis application numérique." },
            { tex: `\\mathrm{p}K_A = -\\log Q_{r,\\text{éq}} \\approx ${frTex(pka, 2)}`, r: "Car $K_A = Q_{r,\\text{éq}}$ pour la réaction de l’acide avec l’eau." },
          ],
        };
      }

      if (forme === 2020) {
        const T = rejoue
          ? { Cb: S20.Cb, pH: S20.pH, dec: 1 }
          : tire(() => {
            const Cb = h.pick([5e-3, 1e-2, 2e-2, 5e-2]);
            const pH = Number(phBaseReel(Cb, PKA.nh4).toFixed(2));
            return { Cb, pH, dec: 2 };
          }, (t) => hoDePh(t.pH) / t.Cb >= 0.02 && hoDePh(t.pH) / t.Cb <= 0.25);
        const ho = hoDePh(T.pH), tau = ho / T.Cb, qr = (ho * ho) / (T.Cb - ho), pka = -Math.log10(KE / qr);
        return {
          enonce: `<p>Forme du sujet 2020, §2 : à $25\\ ^\\circ\\mathrm{C}$ ($K_e = 1{,}0\\times10^{-14}$), une solution d’ammoniac $\\mathrm{NH_3}$ de concentration $C_b = ${num(T.Cb, 2)}\\ \\text{mol·L}^{-1}$ a un pH égal à $${frTex(T.pH, T.dec)}$. Équation : $\\mathrm{NH_{3(aq)} + H_2O_{(l)} \\rightleftarrows NH_{4(aq)}^+ + HO^-_{(aq)}}$.</p>`,
          questions: [
            {
              type: "nombre", sujet: "calculer [HO⁻]_éq dans une solution d’ammoniac",
              q: "Calcule $[\\mathrm{HO^-}]_{\\text{éq}}$ en $\\text{mol·L}^{-1}$ (0,75 pt).",
              reponse: ho, tol: { rel: 0.03 }, unite: "mol·L⁻¹",
              indice: "$[\\mathrm{HO^-}]_{\\text{éq}} = 10^{\\mathrm{pH} - 14}$.",
              pieges: pieges(ho, { rel: 0.03 }, [
                { v: hDe(T.pH), fb: "$10^{-\\mathrm{pH}}$ donne $[\\mathrm{H_3O^+}]_{\\text{éq}}$, pas $[\\mathrm{HO^-}]_{\\text{éq}}$.", erreur: "−log[HO⁻] pris pour le pH" },
                { v: KE / T.pH, fb: "pH pris pour une concentration dans $K_e / [\\mathrm{H_3O^+}]$.", erreur: "pH et concentration confondus" },
              ]),
            },
            {
              type: "nombre", sujet: "calculer τ d’une base avec [HO⁻]_éq / C_b",
              q: "Calcule le taux d’avancement final $\\tau$ (0,5 pt).",
              reponse: tau, tol: { rel: 0.03 },
              indice: "$\\tau = \\dfrac{x_\\mathrm{f}}{x_\\mathrm{max}} = \\dfrac{[\\mathrm{HO^-}]_{\\text{éq}}}{C_b}$.",
              pieges: pieges(tau, { rel: 0.03 }, [
                { v: hDe(T.pH) / T.Cb, fb: "$\\tau$ d’une base calculé avec $[\\mathrm{H_3O^+}]$ : ici l’espèce formée est $\\mathrm{HO^-}$.", erreur: "τ d’une base calculé avec [H₃O⁺]" },
              ]),
            },
            {
              type: "nombre", sujet: "déduire pK_A = −log(K_e / Q_r,éq) pour une base",
              q: "À partir de $Q_{r,\\text{éq}} = \\dfrac{[\\mathrm{HO^-}]_{\\text{éq}}^2}{C_b - [\\mathrm{HO^-}]_{\\text{éq}}}$, déduis le $\\mathrm{p}K_A$ du couple $\\mathrm{NH_4^+/NH_3}$ (0,5 pt).",
              reponse: pka, tol: { abs: 0.06 },
              indice: "$K_A(\\mathrm{NH_4^+/NH_3}) = \\dfrac{K_e}{Q_{r,\\text{éq}}}$, puis $\\mathrm{p}K_A = -\\log K_A$.",
              pieges: pieges(pka, { abs: 0.06 }, [
                { v: -Math.log10(qr), fb: "$Q_{r,\\text{éq}}$ de la base avec l’eau pris directement pour $K_A$ : il faut utiliser $K_A = K_e / Q_{r,\\text{éq}}$.", erreur: "Q_r,éq d’une base pris pour K_A" },
                { v: T.pH, fb: "$\\mathrm{p}K_A$ pris égal au pH de la solution.", erreur: "pK_A pris égal au pH" },
              ]),
            },
          ],
          correction: [
            { tex: `[\\mathrm{HO^-}]_{\\text{éq}} = 10^{${frTex(T.pH, T.dec)} - 14} \\approx ${sci(ho, 3)}\\ \\text{mol·L}^{-1}\\quad;\\quad \\tau = \\dfrac{[\\mathrm{HO^-}]_{\\text{éq}}}{C_b} \\approx ${sci(tau, 3)}`, r: "Questions 2.2 et 2.3." },
            { tex: `Q_{r,\\text{éq}} \\approx ${sci(qr, 3)}\\implies K_A = \\dfrac{K_e}{Q_{r,\\text{éq}}} \\implies \\mathrm{p}K_A \\approx ${frTex(pka, 2)}`, r: "Questions 2.4 et 2.5." },
          ],
        };
      }

      if (forme === 2021) {
        const TABLE_21 = [
          { nom: "l’acide méthanoïque", pka: 3.75, dec: 2 },
          { nom: "l’acide benzoïque", pka: 4.2, dec: 1 },
          { nom: "l’acide éthanoïque", pka: 4.75, dec: 2 },
          { nom: "l’acide propanoïque", pka: 4.9, dec: 1 },
        ];
        const T = rejoue
          ? { cible: TABLE_21[2], Ca: S21.Ca, tau: S21.tau }
          : tire(() => {
            const cible = h.pick(TABLE_21);
            const Ca = h.pick([1e-2, 2e-2, 5e-2, 1e-1]);
            const pH = Number(phReel(Ca, cible.pka).toFixed(2));
            const tau = Number(tauDePh(Ca, pH).toPrecision(3));
            const pkaCalc = -Math.log10(kaDeTau(Ca, tau));
            return { cible, Ca, tau, pkaCalc };
          }, (t) => {
            const dists = TABLE_21.map((x) => Math.abs(x.pka - t.pkaCalc));
            const min = Math.min(...dists);
            const autres = TABLE_21.filter((x) => x !== t.cible).map((x) => Math.abs(x.pka - t.pkaCalc));
            return min < 0.04 && Math.min(...autres) > 0.12 && t.tau >= 0.01;
          });
        const qr = kaDeTau(T.Ca, T.tau), pka = -Math.log10(qr);
        const autres = h.melange(TABLE_21.filter((x) => x.nom !== T.cible.nom)).slice(0, 2);
        return {
          enonce: `<p>Forme du sujet 2021, §2 : une solution d’acide carboxylique $\\mathrm{AH}$ de concentration $C_a = ${num(T.Ca, 2)}\\ \\text{mol·L}^{-1}$ a un taux d’avancement final $\\tau = ${frTex(T.tau * 100, 2)}\\ \\%$. Tableau des $\\mathrm{p}K_A$ : méthanoïque ($3{,}75$), benzoïque ($4{,}2$), éthanoïque ($4{,}75$), propanoïque ($4{,}9$).</p>`,
          questions: [
            {
              type: "nombre", sujet: "calculer Q_r,éq = C_a τ² / (1 − τ) (sujet 2021)",
              q: "Calcule $Q_{r,\\text{éq}}$ à partir de $C_a$ et $\\tau$ (0,75 pt).",
              reponse: qr, tol: { rel: 0.025 },
              indice: "$Q_{r,\\text{éq}} = \\dfrac{C_a\\,\\tau^2}{1 - \\tau}$, avec $\\tau$ en écriture décimale (sans le facteur $100$).",
              pieges: pieges(qr, { rel: 0.025 }, [
                { v: (T.tau * T.tau) / (1 - T.tau), fb: "Facteur $C_a$ oublié au numérateur.", erreur: "C simplifiée à tort" },
              ]),
            },
            {
              type: "qcm", sujet: "identifier un acide par son pK_A dans un tableau",
              q: "Identifie l’acide carboxylique $\\mathrm{AH}$ étudié (0,5 pt).",
              options: h.melange([
                { t: `${T.cible.nom} ($\\mathrm{p}K_A = ${frTex(T.cible.pka, T.cible.dec)}$)`, ok: true },
                { t: `${autres[0].nom} ($\\mathrm{p}K_A = ${frTex(autres[0].pka, autres[0].dec)}$)`, fb: "$\\mathrm{p}K_A$ mal identifié : calcule $-\\log Q_{r,\\text{éq}} \\approx " + frTex(pka, 2) + "$.", erreur: "échelle de pK_A lue à l’envers" },
                { t: `${autres[1].nom} ($\\mathrm{p}K_A = ${frTex(autres[1].pka, autres[1].dec)}$)`, fb: "$\\mathrm{p}K_A$ mal identifié : $-\\log Q_{r,\\text{éq}} \\approx " + frTex(pka, 2) + "$.", erreur: "échelle de pK_A lue à l’envers" },
              ]),
            },
          ],
          correction: [
            { tex: `Q_{r,\\text{éq}} = \\dfrac{C_a\\,\\tau^2}{1 - \\tau} \\approx ${sci(qr, 3)}\\implies \\mathrm{p}K_A = -\\log Q_{r,\\text{éq}} \\approx ${frTex(pka, 2)}`, r: `On reconnaît ${T.cible.nom}.` },
          ],
        };
      }

      if (forme === 2023) {
        const T = rejoue
          ? { p1: S23.pka1, p2: S23.pka2, nom1: "l’acide éthanoïque", AH1: "CH_3COOH", A1: "CH_3COO^-", A2: "HCOO^-", AH2: "HCOOH" }
          : tire(() => {
            const [c1, c2] = h.melange(ACIDES).slice(0, 2);
            return { p1: c1.pka, p2: c2.pka, nom1: c1.nom, AH1: c1.AH, A1: c1.A, A2: c2.A, AH2: c2.AH };
          }, (t) => Math.abs(t.p1 - t.p2) >= 0.45 && Math.abs((t.p1 + t.p2) / 2 - Math.abs(t.p1 - t.p2) / 2) >= 0.5);
        const K = kDeuxCouples(T.p1, T.p2), ph = (T.p1 + T.p2) / 2;
        return {
          enonce: `<p>Forme du sujet 2023, §2 : on mélange des volumes égaux $V_1 = V_2$ de même concentration $C$ de ${T.nom1} ($\\mathrm{p}K_{A1} = ${frTex(T.p1, 2)}$) et d’ions $${m(T.A2)}$ ($\\mathrm{p}K_{A2} = ${frTex(T.p2, 2)}$) : $${m(aq(T.AH1))} + ${m(aq(T.A2))} \\rightleftarrows ${m(aq(T.A1))} + ${m(aq(T.AH2))}$.</p>`,
          questions: [
            {
              type: "nombre", sujet: "calculer Q_r,éq = K_A1 / K_A2 (sujet 2023)",
              q: "Calcule la valeur de $Q_{r,\\text{éq}} = K$ associée à cette réaction (0,75 pt).",
              reponse: K, tol: { rel: 0.03 },
              indice: "$K = \\dfrac{K_{A1}}{K_{A2}} = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}}$.",
              pieges: pieges(K, { rel: 0.03 }, [
                { v: 1 / K, fb: "Rapport inversé : $K = K_{A1}/K_{A2}$ et non $K_{A2}/K_{A1}$.", erreur: "rapport K_A2 / K_A1 inversé" },
              ]),
            },
            {
              type: "nombre", sujet: "calculer le pH du mélange équimolaire (sujet 2023)",
              q: "Calcule le pH du mélange réactionnel à l’équilibre (0,5 pt).",
              reponse: ph, tol: { abs: 0.05 },
              indice: "$\\mathrm{pH} = \\dfrac{\\mathrm{p}K_{A1} + \\mathrm{p}K_{A2}}{2}$.",
              pieges: pieges(ph, { abs: 0.05 }, [
                { v: Math.abs(T.p1 - T.p2) / 2, fb: "Différence utilisée au lieu de la demi-somme.", erreur: "différence des pK_A au lieu de la demi-somme" },
              ]),
            },
          ],
          correction: [
            { tex: `K = \\dfrac{K_{A1}}{K_{A2}} = 10^{${frTex(T.p2, 2)} - ${frTex(T.p1, 2)}} \\approx ${num(K, 3)}`, r: "Question 2.2." },
            { tex: `\\mathrm{pH} = \\dfrac{\\mathrm{p}K_{A1} + \\mathrm{p}K_{A2}}{2} = ${frTex(ph, 2)}`, r: "Question 2.3 (mélange initial équimolaire)." },
          ],
        };
      }

      if (forme === 2015) {
        const s = h.int(0, 1) === 0
          ? { annee: "2015", C: S15.C, tau: S15.tau }
          : { annee: "2019 (forme modifiée, $\\tau$ donné)", C: S19.C, tau: S19.tau };
        const qr = kaDeTau(s.C, s.tau), pka = -Math.log10(qr);
        return {
          enonce: `<p>Forme du sujet ${s.annee} : une solution d’acide benzoïque $\\mathrm{C_6H_5COOH}$ de concentration $C = ${num(s.C, 2)}\\ \\text{mol·L}^{-1}$ a un taux d’avancement final $\\tau = ${frTex(s.tau, 3)}$.</p>`,
          questions: [
            {
              type: "nombre", sujet: "calculer K_A depuis C et τ (sujets 2015 et 2019)",
              q: "Calcule la constante d’équilibre $K$ de la réaction de l’acide benzoïque avec l’eau (0,75 pt).",
              reponse: qr, tol: { rel: 0.025 },
              indice: "$K = \\dfrac{C\\,\\tau^2}{1 - \\tau}$.",
              pieges: pieges(qr, { rel: 0.025 }, [
                { v: s.C * s.tau * s.tau, fb: "Acide supposé intact : garde $(1 - \\tau)$ au dénominateur.", erreur: "acide faible supposé intact" },
                { v: (s.tau * s.tau) / (1 - s.tau), fb: "Facteur $C$ oublié au numérateur.", erreur: "C simplifiée à tort" },
              ]),
            },
            {
              type: "nombre", sujet: "déduire pK_A = −log K_A (sujets 2015 et 2019)",
              q: "Déduis-en le $\\mathrm{p}K_A$ du couple $\\mathrm{C_6H_5COOH/C_6H_5COO^-}$ (0,75 pt).",
              reponse: pka, tol: { abs: 0.05 },
              indice: "$\\mathrm{p}K_A = -\\log K$.",
              pieges: pieges(pka, { abs: 0.05 }, [
                { v: -pka, fb: "Signe moins oublié dans $\\mathrm{p}K_A = -\\log K_A$.", erreur: "signe moins oublié dans pK_A" },
              ]),
            },
          ],
          correction: [
            { tex: `K = \\dfrac{C\\,\\tau^2}{1 - \\tau} \\approx ${sci(qr, 3)}\\implies \\mathrm{p}K_A = -\\log K \\approx ${frTex(pka, 2)}`, r: "Constante d’acidité puis $\\mathrm{p}K_A$." },
          ],
        };
      }

      /* Forme 2012 : 1-2 et 1-3 */
      const K = C12.K, tau = C12.tau;
      return {
        enonce: `<p>Forme du sujet 2012, 1ʳᵉ partie : on introduit $n_1 = 1{,}0\\times10^{-3}\\ \\text{mol}$ d’acide éthanoïque ($\\mathrm{p}K_{A1} = 4{,}8$) et $n_2 = 1{,}0\\times10^{-3}\\ \\text{mol}$ d’ammoniac ($\\mathrm{p}K_{A2} = 9{,}2$) : $\\mathrm{CH_3COOH_{(aq)} + NH_{3(aq)} \\rightleftarrows CH_3COO^-_{(aq)} + NH_{4(aq)}^+}$.</p>`,
        questions: [
          {
            type: "nombre", sujet: "calculer Q_r,éq = 10^(pK_A2 − pK_A1) (sujet 2012)",
            q: "Calcule $Q_{r,\\text{éq}}$ en fonction de $\\mathrm{p}K_{A1}$ et $\\mathrm{p}K_{A2}$ (1 pt).",
            reponse: K, tol: { rel: 0.03 },
            indice: "$Q_{r,\\text{éq}} = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}}$.",
            pieges: pieges(K, { rel: 0.03 }, [
              { v: 1 / K, fb: "Rapport inversé : $K = K_{A1}/K_{A2} = 10^{9{,}2 - 4{,}8}$.", erreur: "rapport K_A2 / K_A1 inversé" },
            ]),
          },
          {
            type: "nombre", sujet: "calculer τ = √K / (1 + √K) (sujet 2012)",
            q: "Calcule le taux d’avancement final $\\tau$ de cette transformation (1 pt).",
            reponse: tau, tol: { abs: 0.01 },
            indice: "$\\dfrac{x_\\mathrm{f}}{n_1 - x_\\mathrm{f}} = \\sqrt{K} \\implies \\tau = \\dfrac{\\sqrt{K}}{1 + \\sqrt{K}}$.",
            pieges: pieges(tau, { abs: 0.01 }, []),
          },
        ],
        correction: [
          { tex: `Q_{r,\\text{éq}} = 10^{9{,}2 - 4{,}8} \\approx ${sci(K, 3)}\\quad;\\quad \\tau = \\dfrac{\\sqrt{K}}{1 + \\sqrt{K}} \\approx ${frTex(tau, 3)}`, r: "$\\tau \\approx 0{,}99$ : la transformation est pratiquement totale." },
        ],
      };
    },
  },
];
