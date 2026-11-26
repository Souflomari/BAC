// @ts-nocheck
/**
 * Les 12 gabarits d'exercices de la leçon « Le dosage acido-basique » (V3).
 * Chaque réponse est calculée par le code depuis `dosage-outils.js` ; les options sont comparées en valeur
 * (rejet si un leurre tombe à 2 % de la réponse ou coïncide avec un autre). Aucun gabarit de conductimétrie.
 */
import { frTex, sciTex } from "./nombre.js";
import {
  phDosageAcide, phDosageBase, dphDvAcide, vDePhAcide,
  TABLE_2021, IND, S18, S20, S22, S24, S25, fr,
} from "../dosage-outils.js";

const CAPD = (...rangs) => rangs.flatMap((r) => [`pc-pc 2.2.3.${r}`, `pc-sm 2.2.3.${r}`, `pc-svt 2.2.5.${r}`]);
const CAP2122 = ["pc-pc 2.1.2.2", "pc-sm 2.1.2.2", "pc-svt 2.1.2.2"];

function pieges(rep, tol, liste) {
  const seuil = tol.abs != null ? tol.abs : Math.abs(rep) * tol.rel;
  const garde = [];
  for (const p of liste) {
    if (!Number.isFinite(p.v)) continue;
    if (Math.abs(p.v - rep) <= Math.max(2 * seuil, Math.abs(rep) * 0.02)) continue;
    if (garde.some((q) => Math.abs(q.v - p.v) <= Math.max(tol.abs != null ? tol.abs : Math.abs(q.v) * tol.rel, Math.abs(q.v) * 0.02))) continue;
    garde.push(p);
  }
  return garde;
}

function tire(f, ok) {
  let t = f();
  for (let i = 0; i < 120 && !ok(t); i++) t = f();
  return t;
}

const sci = (x, c = 2) => sciTex(x, c);
const num = (x, n = 3) => {
  const a = Math.abs(x);
  if (a !== 0 && (a >= 1e5 || a < 1e-2)) return sci(x, n);
  const e = Math.floor(Math.log10(a || 1));
  return frTex(x, Math.max(0, n - 1 - e));
};
const m = (s) => `\\mathrm{${s}}`;
const aq = (e) => `{${e}}_{(aq)}`;

/* Couples admis (valeurs des sujets transcrits uniquement) */
const ACIDES = [
  { nom: "l’acide méthanoïque", de: "d’acide méthanoïque", AH: "HCOOH", A: "HCOO^-", pKA: 3.75, M: 46 },
  { nom: "l’acide lactique", de: "d’acide lactique", AH: "CH_3CH(OH)COOH", A: "CH_3CH(OH)COO^-", pKA: 3.9, M: 90 },
  { nom: "l’acide benzoïque", de: "d’acide benzoïque", AH: "C_6H_5COOH", A: "C_6H_5COO^-", pKA: 4.2, M: 122 },
  { nom: "l’acide éthanoïque", de: "d’acide éthanoïque", AH: "CH_3COOH", A: "CH_3COO^-", pKA: 4.75, M: 60 },
  { nom: "l’acide propanoïque", de: "d’acide propanoïque", AH: "C_2H_5COOH", A: "C_2H_5COO^-", pKA: 4.9, M: 74 },
  { nom: "l’ion hydrogénosulfite", de: "d’hydrogénosulfite de sodium", AH: "HSO_3^-", A: "SO_3^{2-}", pKA: 7.2, M: 104 },
];
const BASE_NH3 = { nom: "l’ammoniac", de: "d’ammoniac", BH: "NH_4^+", B: "NH_3", pKA: 9.22 };

const SERIE_C = [1.0, 1.5, 2.0, 2.5, 3.0, 5.0];
const SERIE_V = [10.0, 12.0, 15.0, 20.0, 25.0];

function tirageDosage(h, { acide = null, eviterEgal = true } = {}) {
  return tire(() => {
    const a = acide || h.pick(ACIDES);
    const CA = h.pick(SERIE_C) * 1e-2;
    const CB = h.pick([2.0, 2.5, 3.0, 5.0, 10.0]) * 1e-2;
    const VA = h.pick(SERIE_V);
    const VE = (CA * VA) / CB;
    return { a, CA, CB, VA, VE, pHE: phDosageAcide(CA, VA, CB, a.pKA, VE) };
  }, (t) => t.VE >= 6 && t.VE <= 24 && Math.abs(t.VE * 2 - Math.round(t.VE * 2)) < 1e-6 && (!eviterEgal || (Math.abs(t.VA - t.VE) >= 2 && Math.abs(t.CA - t.CB) >= 0.005)));
}

/** Petite figure SVG d'une courbe de dosage (jetons CSS uniquement) */
function svgCourbe({ vmax, fn, dfn, ve, phe, mode = "tg", xLab = "V_B (mL)" }) {
  const X0 = 56, X1 = 440, Y0 = 230, Y1 = 22;
  const X = (v) => X0 + (v / vmax) * (X1 - X0);
  const Y = (y) => Y0 - (y / 14) * (Y0 - Y1);
  let d = "";
  for (let i = 0; i <= 140; i++) {
    const v = (vmax * i) / 140;
    d += `${i ? "L" : "M"} ${X(v).toFixed(1)} ${Y(fn(v)).toFixed(1)} `;
  }
  let extra = "";
  if (mode === "der" && dfn) {
    const pts = [];
    for (let i = 0; i <= 140; i++) { const v = (vmax * i) / 140; pts.push([v, dfn(v)]); }
    const dm = Math.max(...pts.map((p) => p[1]), 1);
    const dd = pts.map(([v, dy], i) => `${i ? "L" : "M"} ${X(v).toFixed(1)} ${(Y0 - (dy / dm) * (Y0 - Y1 - 12)).toFixed(1)}`).join(" ");
    extra += `<path d="${dd}" fill="none" stroke="var(--color-signal)" stroke-width="2" stroke-dasharray="5 4"/>`;
  } else if (mode === "tg") {
    const v1 = Math.max(0, ve - 3.5), v2 = Math.min(vmax, ve + 3.5), pente = 0.65;
    const yM = (v) => phe + pente * (v - ve);
    const seg = (off, cls, dash) => `<line x1="${X(v1).toFixed(1)}" y1="${Y(Math.max(0, Math.min(14, yM(v1) + off))).toFixed(1)}" x2="${X(v2).toFixed(1)}" y2="${Y(Math.max(0, Math.min(14, yM(v2) + off))).toFixed(1)}" stroke="${cls}" stroke-width="1.8" stroke-dasharray="${dash}"/>`;
    extra += seg(2.6, "var(--color-text-secondary)", "5 4") + seg(-2.6, "var(--color-text-secondary)", "5 4") + seg(0, "var(--color-signal)", "4 3");
    extra += `<circle cx="${X(ve).toFixed(1)}" cy="${Y(phe).toFixed(1)}" r="4.5" fill="var(--color-signal)"/>`;
  }
  let ticks = "";
  const stepX = vmax <= 25 ? 5 : 5;
  for (let v = 0; v <= vmax; v += stepX) {
    ticks += `<line x1="${X(v).toFixed(1)}" y1="${Y0}" x2="${X(v).toFixed(1)}" y2="${Y0 + 5}" stroke="var(--color-text-secondary)"/>`;
    ticks += `<text x="${X(v).toFixed(1)}" y="${Y0 + 18}" text-anchor="middle" font-size="11" fill="var(--color-text-secondary)">${v}</text>`;
  }
  for (let y = 2; y <= 14; y += 2) {
    ticks += `<line x1="${X0 - 5}" y1="${Y(y).toFixed(1)}" x2="${X0}" y2="${Y(y).toFixed(1)}" stroke="var(--color-text-secondary)"/>`;
    ticks += `<text x="${X0 - 9}" y="${(Y(y) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="var(--color-text-secondary)">${y}</text>`;
  }
  return `<svg viewBox="0 0 470 264" width="100%" role="img" aria-label="Courbe de dosage pH en fonction du volume versé" style="max-width:470px;display:block;margin:8px 0">
    <line x1="${X0}" y1="${Y0}" x2="${X1 + 10}" y2="${Y0}" stroke="var(--color-text-secondary)" stroke-width="1.5"/>
    <line x1="${X0}" y1="${Y0}" x2="${X0}" y2="${Y1 - 10}" stroke="var(--color-text-secondary)" stroke-width="1.5"/>
    ${ticks}
    <text x="${X1 + 8}" y="${Y0 + 30}" text-anchor="end" font-size="12" fill="var(--color-text-primary)">${xLab}</text>
    <text x="${X0 + 8}" y="${Y1 - 2}" text-anchor="start" font-size="12" fill="var(--color-text-primary)">pH</text>
    <path d="${d}" fill="none" stroke="var(--color-text-primary)" stroke-width="2.2"/>
    ${extra}
  </svg>`;
}

export const EXERCICES = [
  /* 1 : équation de la réaction de dosage */
  {
    id: "dos-equation",
    titre: "Écrire l’équation de la réaction de dosage",
    niveau: 1,
    capacites: CAPD(10),
    erreurs: ["réaction avec l’eau (+1)", "ions spectateurs (+2)", "double flèche (+3)", "proton H⁺ libre (AB-BASE-5)"],
    gen(h) {
      const base = h.int(0, 2) === 0;
      if (base) {
        return {
          enonce: "<p>On dose une solution aqueuse d’ammoniac $\\mathrm{NH_3}$ par une solution d’acide chlorhydrique $(\\mathrm{{H_3O^+}_{(aq)} + {Cl^-}_{(aq)}})$.</p>",
          questions: [{
            type: "qcm", q: "Quelle est l’équation de la réaction de dosage ?",
            options: h.melange([
              { t: `$${m("{NH_3}_{(aq)}")}+${m("{H_3O^+}_{(aq)}")}\\longrightarrow ${m("{NH_4^+}_{(aq)}")}+${m("{H_2O}_{(l)}")}$`, ok: true },
              { t: `$${m("{NH_3}_{(aq)}")}+${m("{H_2O}_{(l)}")}\\rightleftarrows ${m("{NH_4^+}_{(aq)}")}+${m("{HO^-}_{(aq)}")}$`, fb: "Tu as écrit la réaction de l’ammoniac avec l’eau. Ici, l’acide chlorhydrique apporte $\\mathrm{H_3O^+}$.", erreur: "réaction avec l’eau (+1)" },
              { t: `$${m("NH_3")}+${m("H_3O^+")}+${m("Cl^-")}\\longrightarrow ${m("NH_4Cl")}+${m("H_2O")}$`, fb: "Tu as laissé l’ion spectateur $\\mathrm{Cl^-}$. On ne l’écrit pas dans l’équation.", erreur: "ions spectateurs (+2)" },
              { t: `$${m("{NH_3}_{(aq)}")}+${m("{H_3O^+}_{(aq)}")}\\rightleftarrows ${m("{NH_4^+}_{(aq)}")}+${m("{H_2O}_{(l)}")}$`, fb: "Tu as mis une double flèche. Une réaction de dosage est totale : une seule flèche.", erreur: "double flèche (+3)" },
            ]),
          }],
          correction: [
            { tex: `${m("{NH_3}_{(aq)}")}+${m("{H_3O^+}_{(aq)}")}\\longrightarrow ${m("{NH_4^+}_{(aq)}")}+${m("{H_2O}_{(l)}")}`, r: "L’acide $\\mathrm{H_3O^+}$ cède un proton à la base $\\mathrm{NH_3}$ ; une seule flèche, sans $\\mathrm{Cl^-}$." },
          ],
        };
      }
      const a = h.pick(ACIDES);
      return {
        enonce: `<p>On dose une solution aqueuse ${a.de} ($${m(a.AH)}$) par une solution d’hydroxyde de sodium $(\\mathrm{{Na^+}_{(aq)} + {HO^-}_{(aq)}})$.</p>`,
        questions: [{
          type: "qcm", q: "Quelle est l’équation de la réaction de dosage ?",
          options: h.melange([
            { t: `$${m(aq(a.AH))}+${m("{HO^-}_{(aq)}")}\\longrightarrow ${m(aq(a.A))}+${m("{H_2O}_{(l)}")}$`, ok: true },
            { t: `$${m(aq(a.AH))}+${m("{H_2O}_{(l)}")}\\rightleftarrows ${m(aq(a.A))}+${m("{H_3O^+}_{(aq)}")}$`, fb: "C’est la réaction de l’acide avec l’eau. La soude apporte des ions $\\mathrm{HO^-}$.", erreur: "réaction avec l’eau (+1)" },
            { t: `$${m(aq(a.AH))}+${m("{HO^-}_{(aq)}")}\\rightleftarrows ${m(aq(a.A))}+${m("{H_2O}_{(l)}")}$`, fb: "Tu as mis une double flèche. La réaction de dosage est totale : une seule flèche.", erreur: "double flèche (+3)" },
            { t: `$${m(aq(a.AH))}\\longrightarrow ${m(aq(a.A))}+${m("{H^+}_{(aq)}")}$`, fb: "Tu as écrit la demi-équation du couple. Un proton ne reste pas libre : il est capté par $\\mathrm{HO^-}$.", erreur: "proton H⁺ libre (AB-BASE-5)" },
          ]),
        }],
        correction: [
          { tex: `${m(aq(a.AH))}+${m("{HO^-}_{(aq)}")}\\longrightarrow ${m(aq(a.A))}+${m("{H_2O}_{(l)}")}`, r: "Sans l’ion spectateur $\\mathrm{Na^+}$ et avec une seule flèche." },
        ],
      };
    },
  },

  /* 2 : constante K de la réaction de dosage */
  {
    id: "dos-K",
    titre: "Constante d’équilibre K et caractère total du dosage",
    niveau: 2,
    capacites: CAPD(10),
    erreurs: ["K inversé (AB-BASE-7)", "produit K_A·K_e (AB-BASE-7)", "réaction limitée acceptée (AB-TIT-3)"],
    gen(h) {
      const proche = h.int(0, 2) === 0;
      if (proche) {
        const p1 = 4.75, p2 = 4.2;
        const K = 10 ** (p2 - p1);
        return {
          enonce: `<p>On considère la réaction entre l’acide éthanoïque ($\\mathrm{p}K_{A1} = ${frTex(p1, 2)}$) et l’ion benzoate ($\\mathrm{p}K_{A2} = ${frTex(p2, 1)}$). Sa constante d’équilibre vaut $K = 10^{\\mathrm{p}K_{A2} - \\mathrm{p}K_{A1}} \\approx ${num(K, 2)}$.</p>`,
          questions: [{
            type: "qcm", q: "Cette réaction peut-elle servir de support à un dosage ?",
            options: h.melange([
              { t: "Non : K est petit, la réaction est limitée", ok: true },
              { t: "Oui : toute réaction acido-basique sert à un dosage", fb: "Une réaction de dosage doit être totale ($K \\gg 1$). Ici $K < 1$ : la réaction est limitée.", erreur: "réaction limitée acceptée (AB-TIT-3)" },
              { t: "Oui : il suffit d’attendre l’équivalence", fb: "Attendre ne rend pas totale une réaction limitée : $K$ reste inférieur à $1$.", erreur: "réaction limitée acceptée (AB-TIT-3)" },
            ]),
          }],
          correction: [{ t: `Avec $K \\approx ${num(K, 2)} < 1$, la réaction est limitée : elle ne convient pas pour un dosage.` }],
        };
      }
      const base = h.int(0, 2) === 0;
      const a = base ? BASE_NH3 : h.pick(ACIDES);
      const K = base ? 10 ** a.pKA : 10 ** (14 - a.pKA);
      const tol = { rel: 0.05 };
      return {
        enonce: base
          ? `<p>On dose l’ammoniac $\\mathrm{NH_3}$ par l’acide chlorhydrique ($\\mathrm{H_3O^+}$). On donne $\\mathrm{p}K_A(\\mathrm{NH_4^+/NH_3}) = ${frTex(a.pKA, 2)}$ et $K_e = 10^{-14}$.</p>`
          : `<p>On dose ${a.nom} ($\\mathrm{p}K_A = ${frTex(a.pKA, 2)}$) par la soude ($\\mathrm{HO^-}$). On donne $K_e = 10^{-14}$.</p>`,
        questions: [{
          type: "nombre", q: "Calcule la constante d’équilibre $K$ de la réaction de dosage.", reponse: K, tol, unite: "",
          indice: base ? "Écris $K = [\\mathrm{NH_4^+}]/([\\mathrm{NH_3}][\\mathrm{H_3O^+}])$ et reconnais $1/K_A$." : "Multiplie numérateur et dénominateur par $[\\mathrm{H_3O^+}]$ pour faire apparaître $K_A$ et $K_e$.",
          pieges: pieges(K, tol, [
            { v: 1 / K, fb: "Tu as inversé la constante d’équilibre. La réaction du dosage est quasi totale : $K \\gg 1$.", erreur: "K inversé (AB-BASE-7)" },
            { v: 10 ** (-a.pKA) * 1e-14, fb: "Tu as multiplié $K_A$ et $K_e$ au lieu de diviser.", erreur: "produit K_A·K_e (AB-BASE-7)" },
          ]),
        }],
        correction: [
          { tex: base ? `K = \\dfrac{1}{K_A} = 10^{${frTex(a.pKA, 2)}} \\approx ${sci(K, 2)}` : `K = \\dfrac{K_A}{K_e} = 10^{14 - ${frTex(a.pKA, 2)}} \\approx ${sci(K, 2)}`, r: "$K \\gg 1$ : la réaction de dosage est pratiquement totale." },
        ],
      };
    },
  },

  /* 3 : le montage expérimental */
  {
    id: "dos-montage",
    titre: "Le montage expérimental d’un dosage pH-métrique",
    niveau: 1,
    capacites: CAPD(11),
    erreurs: ["titré et titrant échangés (+5)"],
    gen(h) {
      const a = h.pick(ACIDES);
      return {
        enonce: `<p>On réalise le dosage pH-métrique d’une prise d’essai $V_A$ d’une solution ${a.de} (concentration inconnue $C_A$) par une solution de soude de concentration connue $C_B$.</p>`,
        questions: [
          {
            type: "qcm", q: "Où place-t-on la solution de soude (solution titrante) ?",
            options: h.melange([
              { t: "Dans la burette graduée", ok: true },
              { t: "Dans le bécher, sous la sonde", fb: "Tu as inversé titrant et titré. Le bécher reçoit la solution à doser.", erreur: "titré et titrant échangés (+5)" },
              { t: "Dans la pipette jaugée", fb: "La pipette jaugée sert à prélever le volume $V_A$ de la solution à doser.", erreur: "titré et titrant échangés (+5)" },
            ]),
          },
          {
            type: "qcm", q: "Avec quel instrument mesure-t-on précisément le volume $V_A$ placé dans le bécher ?",
            options: h.melange([
              { t: "Une pipette jaugée", ok: true },
              { t: "La burette graduée", fb: "La burette mesure le volume versé $V_B$ de titrant, pas la prise d’essai $V_A$.", erreur: "titré et titrant échangés (+5)" },
              { t: "Les graduations du bécher", fb: "Un bécher n’est pas un instrument de mesure précis : on prélève $V_A$ à la pipette jaugée.", erreur: "titré et titrant échangés (+5)" },
            ]),
          },
        ],
        correction: [
          { t: "La burette graduée contient la solution titrante (concentration connue $C_B$) ; le bécher reçoit la prise d’essai $V_A$, prélevée à la pipette jaugée." },
        ],
      };
    },
  },

  /* 4 : relation à l'équivalence C_A V_A = C_B V_E */
  {
    id: "dos-equivalence",
    titre: "Exploiter la relation à l’équivalence",
    niveau: 2,
    capacites: [...CAPD(13), ...CAP2122],
    erreurs: ["rapport inversé (+8)", "concentrations ou volumes égaux (AB-TIT-2)", "mL non converti"],
    gen(h) {
      const T = tirageDosage(h, { eviterEgal: true });
      const mode = h.int(0, 1); // 0: calculer C_A, 1: calculer V_E
      const melange = h.int(0, 1) === 1;
      const tol = { rel: 0.02 };
      if (mode === 0) {
        const vAtxt = melange ? `${num(T.VA * 1e-3, 3)}\\ \\text{L}` : `${frTex(T.VA, 1)}\\ \\text{mL}`;
        return {
          enonce: `<p>On dose un volume $V_A = ${vAtxt}$ d’une solution ${T.a.de} par la soude de concentration $C_B = ${sci(T.CB, 2)}\\ \\text{mol·L}^{-1}$. L’équivalence est atteinte pour $V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$.</p>`,
          questions: [{
            type: "nombre", q: "Calcule la concentration $C_A$ de la solution d’acide, en mol·L⁻¹.", reponse: T.CA, tol, unite: "mol·L⁻¹",
            indice: "À l’équivalence, $C_A V_A = C_B V_E$ avec $V_A$ et $V_E$ dans la même unité.",
            pieges: pieges(T.CA, tol, [
              { v: (T.CB * T.VA) / T.VE, fb: "Tu as inversé $V_E$ et $V_A$. Depuis $C_A V_A = C_B V_E$, on obtient $C_A = C_B V_E / V_A$.", erreur: "rapport inversé (+8)" },
              { v: T.CB, fb: "Tu as égalé les concentrations. $C_A = C_B$ seulement si $V_A = V_E$.", erreur: "concentrations ou volumes égaux (AB-TIT-2)" },
              ...(melange ? [{ v: (T.CB * T.VE) / (T.VA * 1e-3), fb: "Tu as mélangé mL et L. Convertis les deux volumes dans la même unité.", erreur: "mL non converti" }] : []),
            ]),
          }],
          correction: [{ tex: `C_A = \\dfrac{C_B\\,V_E}{V_A} = \\dfrac{${sci(T.CB, 2)} \\times ${frTex(T.VE, 1)}}{${frTex(T.VA, 1)}} = ${sci(T.CA, 2)}\\ \\text{mol·L}^{-1}`, r: "Relation à l’équivalence, volumes dans la même unité." }],
        };
      }
      return {
        enonce: `<p>On dose un volume $V_A = ${frTex(T.VA, 1)}\\ \\text{mL}$ d’une solution ${T.a.de} de concentration $C_A = ${sci(T.CA, 2)}\\ \\text{mol·L}^{-1}$ par la soude à $C_B = ${sci(T.CB, 2)}\\ \\text{mol·L}^{-1}$.</p>`,
        questions: [{
          type: "nombre", q: "Quel volume $V_E$ de soude faut-il verser pour atteindre l’équivalence, en mL ?", reponse: T.VE, tol, unite: "mL",
          indice: "Isole $V_E$ dans $C_A V_A = C_B V_E$.",
          pieges: pieges(T.VE, tol, [
            { v: (T.CB * T.VA) / T.CA, fb: "Tu as inversé $C_A$ et $C_B$. Isole $V_E = C_A V_A / C_B$.", erreur: "rapport inversé (+8)" },
            { v: T.VA, fb: "Tu as égalé les volumes. $V_E = V_A$ seulement si $C_A = C_B$.", erreur: "concentrations ou volumes égaux (AB-TIT-2)" },
          ]),
        }],
        correction: [{ tex: `V_E = \\dfrac{C_A\\,V_A}{C_B} = ${frTex(T.VE, 1)}\\ \\text{mL}`, r: "Les quantités de matière sont égales à l’équivalence." }],
      };
    },
  },

  /* 5 : contenu du bécher avant, à, après E */
  {
    id: "dos-becher",
    titre: "Dans le bécher : avant, à et après l’équivalence",
    niveau: 2,
    capacites: CAPD(12),
    erreurs: ["HO⁻ non consommé avant E (+6)", "AH et HO⁻ ensemble à E (+7)", "rien ne change après E (+9)"],
    gen(h) {
      const T = tirageDosage(h);
      const cas = h.int(0, 2); // 0 avant, 1 à E, 2 après
      if (cas === 0) {
        const VB = Number((T.VE / 2).toFixed(1));
        const nAH = (T.CA * T.VA - T.CB * VB) * 1e-3;
        const n0 = T.CA * T.VA * 1e-3;
        const tol = { rel: 0.02 };
        return {
          enonce: `<p>On dose $V_A = ${frTex(T.VA, 1)}\\ \\text{mL}$ de solution ${T.a.de} ($C_A = ${sci(T.CA, 2)}\\ \\text{mol·L}^{-1}$) par la soude ($C_B = ${sci(T.CB, 2)}\\ \\text{mol·L}^{-1}$, $V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$). On a versé $V_B = ${frTex(VB, 1)}\\ \\text{mL}$.</p>`,
          questions: [
            {
              type: "qcm", q: "Quel est le réactif limitant à cet instant ?",
              options: h.melange([
                { t: "$\\mathrm{HO^-}$ versé : il est entièrement consommé", ok: true },
                { t: "Aucun : la réaction attend l’équivalence", fb: "La réaction de dosage est totale dès la première goutte : chaque $\\mathrm{HO^-}$ réagit aussitôt.", erreur: "HO⁻ non consommé avant E (+6)" },
                { t: "L’acide titré : il a déjà disparu", fb: "Puisque $V_B < V_E$, il reste encore de l’acide dans le bécher.", erreur: "HO⁻ non consommé avant E (+6)" },
              ]),
            },
            {
              type: "nombre", q: "Calcule la quantité de matière d’acide restante dans le bécher, en mol.", reponse: nAH, tol, unite: "mol",
              indice: "$n(\\mathrm{AH}) = C_A V_A - C_B V_B$ avec les volumes en litres.",
              pieges: pieges(nAH, tol, [
                { v: n0, fb: "Tu as donné la quantité initiale. Retire ce qui a réagi : $C_B V_B$.", erreur: "HO⁻ non consommé avant E (+6)" },
              ]),
            },
          ],
          correction: [{ tex: `n(\\mathrm{AH}) = C_A V_A - C_B V_B = ${sci(nAH, 2)}\\ \\text{mol}`, r: "Avant $V_E$, $\\mathrm{HO^-}$ est limitant." }],
        };
      }
      if (cas === 1) {
        return {
          enonce: `<p>On dose ${T.a.nom} ($${m(T.a.AH)}$) par la soude. On atteint exactement le volume équivalent $V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$.</p>`,
          questions: [{
            type: "qcm", q: "Outre l’eau et les ions spectateurs $\\mathrm{Na^+}$, que contient le bécher à l’équivalence ?",
            options: h.melange([
              { t: `Uniquement la base conjuguée $${m(T.a.A)}$`, ok: true },
              { t: `$${m(T.a.AH)}$ et $\\mathrm{HO^-}$ à parts égales`, fb: "Les deux réactifs ont été introduits en quantités égales et se sont consommés mutuellement : il ne reste que la base formée.", erreur: "AH et HO⁻ ensemble à E (+7)" },
              { t: `$${m(T.a.AH)}$ et $${m(T.a.A)}$ en quantités égales`, fb: "Moitié-moitié, c’est à la demi-équivalence ($V_E/2$), pas à l’équivalence.", erreur: "AH et HO⁻ ensemble à E (+7)" },
            ]),
          }],
          correction: [{ t: `À l’équivalence, tout $${m(T.a.AH)}$ et tout $\\mathrm{HO^-}$ ont réagi : il ne reste que $${m(T.a.A)}$ (et $\\mathrm{Na^+}$).` }],
        };
      }
      const VB = Number((T.VE + 4).toFixed(1));
      const nHO = (T.CB * (VB - T.VE)) * 1e-3;
      const tol = { rel: 0.02 };
      return {
        enonce: `<p>Dans le dosage de ${T.a.nom} par la soude ($C_B = ${sci(T.CB, 2)}\\ \\text{mol·L}^{-1}$, $V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$), on a versé $V_B = ${frTex(VB, 1)}\\ \\text{mL}$.</p>`,
        questions: [
          {
            type: "qcm", q: "Que deviennent les ions $\\mathrm{HO^-}$ versés après $V_E$ ?",
            options: h.melange([
              { t: "Ils restent libres dans le bécher : il n’y a plus d’acide", ok: true },
              { t: "Rien ne change dans le bécher après l’équivalence", fb: "Les ions $\\mathrm{HO^-}$ continuent d’arriver et s’accumulent dans le bécher.", erreur: "rien ne change après E (+9)" },
              { t: `Ils réagissent avec $${m(T.a.A)}$`, fb: `$${m(T.a.A)}$ est une base, comme $\\mathrm{HO^-}$ : deux bases ne réagissent pas ensemble.`, erreur: "rien ne change après E (+9)" },
            ]),
          },
          {
            type: "nombre", q: "Calcule la quantité de matière d’ions $\\mathrm{HO^-}$ en excès, en mol.", reponse: nHO, tol, unite: "mol",
            indice: "Seul le volume versé au-delà de $V_E$, soit $V_B - V_E$, reste libre.",
            pieges: pieges(nHO, tol, [
              { v: 0, fb: "Après $V_E$, les ions $\\mathrm{HO^-}$ ne sont plus consommés : ils s’accumulent.", erreur: "rien ne change après E (+9)" },
              { v: T.CB * VB * 1e-3, fb: "Une partie des ions $\\mathrm{HO^-}$ (jusqu’à $V_E$) a déjà réagi avec l’acide.", erreur: "HO⁻ non consommé avant E (+6)" },
            ]),
          },
        ],
        correction: [{ tex: `n(\\mathrm{HO^-})_{\\text{excès}} = C_B(V_B - V_E) = ${sci(nHO, 2)}\\ \\text{mol}`, r: "Tout ce qui est versé après $V_E$ reste libre." }],
      };
    },
  },

  /* 6 : lecture graphique de E (tangentes ou dérivée) */
  {
    id: "dos-lecture",
    titre: "Repérer le point d’équivalence sur la courbe",
    niveau: 3,
    capacites: CAPD(12, 13),
    erreurs: ["lu à pH = 7 (AB-EQU-1)", "dérivée nulle (AB-EQU-2)", "demi-équivalence prise pour E (AB-EQU-3)", "hauteur du pic lue en ordonnée (+14)"],
    gen(h) {
      const T = tirageDosage(h);
      const mode = h.int(0, 1) === 0 ? "tg" : "der";
      const vmax = T.VE <= 15 ? 25 : 30;
      const fn = (v) => phDosageAcide(T.CA, T.VA, T.CB, T.a.pKA, v);
      const dfn = (v) => dphDvAcide(T.CA, T.VA, T.CB, T.a.pKA, v);
      const fig = svgCourbe({ vmax, fn, dfn, ve: T.VE, phe: T.pHE, mode });
      const estHSO3 = T.a.pKA >= 6 && T.a.pKA <= 8;
      const vPh7 = estHSO3 ? vDePhAcide(T.CA, T.VA, T.CB, T.a.pKA, 7) : -1;
      const tolV = { abs: 0.6 };
      const pV = [
        { v: T.VE / 2, fb: "Tu as lu la demi-équivalence ($V_E/2$). Le point E est au milieu du saut.", erreur: "demi-équivalence prise pour E (AB-EQU-3)" },
        ...(estHSO3 && vPh7 > 1 ? [{ v: vPh7, fb: "Tu as lu le volume où $\\mathrm{pH} = 7$. Pour un acide faible, $\\mathrm{pH}_E > 7$.", erreur: "lu à pH = 7 (AB-EQU-1)" }] : []),
        ...(mode === "der" ? [{ v: Math.min(vmax, T.VE + 5), fb: "Tu as lu là où la dérivée retombe à zéro. $V_E$ est à l’abscisse du maximum.", erreur: "dérivée nulle (AB-EQU-2)" }] : []),
      ];
      return {
        enonce: `<p>La courbe ci-dessous représente le dosage pH-métrique ${T.a.de} par la soude${mode === "der" ? ", avec la courbe dérivée $\\mathrm{dpH}/\\mathrm{d}V_B$ en pointillés" : " avec la construction des tangentes parallèles"}.</p>`,
        figure: fig,
        questions: [
          {
            type: "nombre", q: "Lis le volume équivalent $V_E$, en mL.", reponse: T.VE, tol: tolV, unite: "mL",
            indice: mode === "der" ? "Lis l’abscisse du sommet du pic de la dérivée." : "Lis l’abscisse du point où la médiane coupe la courbe.",
            pieges: pieges(T.VE, tolV, pV),
          },
          mode === "tg"
            ? {
              type: "nombre", q: "Lis $\\mathrm{pH}_E$ au point d’équivalence.", reponse: Number(T.pHE.toFixed(1)), tol: { abs: 0.4 }, unite: "",
              indice: "Lis l’ordonnée du point E sur l’axe vertical.",
              pieges: pieges(Number(T.pHE.toFixed(1)), { abs: 0.4 }, [
                { v: 7.0, fb: "Tu as supposé $\\mathrm{pH}_E = 7$. Pour un acide faible dosé par la soude, $\\mathrm{pH}_E > 7$.", erreur: "lu à pH = 7 (AB-EQU-1)" },
                { v: T.a.pKA, fb: "Tu as lu le $\\mathrm{p}K_A$ (à la demi-équivalence), pas $\\mathrm{pH}_E$.", erreur: "demi-équivalence prise pour E (AB-EQU-3)" },
              ]),
            }
            : {
              type: "qcm", q: "Sur la courbe dérivée en pointillés, comment repère-t-on $V_E$ ?",
              options: h.melange([
                { t: "À l’abscisse du sommet du pic", ok: true },
                { t: "Là où la dérivée redevient nulle", fb: "La dérivée est nulle sur les paliers, loin de l’équivalence.", erreur: "dérivée nulle (AB-EQU-2)" },
                { t: "Sur l’axe vertical, à la hauteur du pic", fb: "$V_E$ est un volume : il se lit sur l’axe horizontal, pas sur l’axe vertical.", erreur: "hauteur du pic lue en ordonnée (+14)" },
              ]),
            },
        ],
        correction: [
          { tex: `V_E = ${frTex(T.VE, 1)}\\ \\text{mL}\\qquad \\mathrm{pH}_E \\approx ${frTex(T.pHE, 1)}`, r: mode === "der" ? "Abscisse du pic de la dérivée." : "Intersection de la médiane des tangentes parallèles et de la courbe." },
        ],
      };
    },
  },

  /* 7 : demi-équivalence et identification (tableau 2021) */
  {
    id: "dos-demi",
    titre: "La demi-équivalence : lire pK_A et identifier un acide",
    niveau: 2,
    capacites: CAPD(12),
    erreurs: ["pH_E/2 (+15)", "égalité placée à pH = 7 (AB-DIST-3)", "demi-équivalence confondue avec E (AB-EQU-3)"],
    gen(h) {
      const item = h.pick(TABLE_2021);
      const T = tirageDosage(h, { acide: { nom: `l’${item.nom}`, de: `d’${item.nom}`, AH: item.AH, A: item.A, pKA: item.pKA } });
      const demiV = T.VE / 2;
      const pHdemi = phDosageAcide(T.CA, T.VA, T.CB, item.pKA, demiV);
      const lignes = TABLE_2021.map((x) => `${x.nom} (${frTex(x.pKA, 2)})`).join(" ; ");
      return {
        enonce: `<p>Lors du dosage d’un acide carboxylique inconnu par la soude, on trouve $V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$ et $\\mathrm{pH}_E = ${frTex(T.pHE, 1)}$. À $V_B = ${frTex(demiV, 1)}\\ \\text{mL}$, on lit $\\mathrm{pH} = ${frTex(pHdemi, 2)}$. Tableau des $\\mathrm{p}K_A$ (sujet 2021) : ${lignes}.</p>`,
        questions: [
          {
            type: "qcm", q: "À quel volume versé lit-on $\\mathrm{pH} = \\mathrm{p}K_A$ ?",
            options: h.melange([
              { t: `$V_B = V_E / 2 = ${frTex(demiV, 1)}\\ \\text{mL}$`, ok: true },
              { t: `$V_B = V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$`, fb: "À $V_E$, tout l’acide a réagi : $\\mathrm{pH} = \\mathrm{pH}_E$, pas $\\mathrm{p}K_A$.", erreur: "demi-équivalence confondue avec E (AB-EQU-3)" },
              { t: "Là où $\\mathrm{pH} = 7$", fb: "L’égalité $[\\mathrm{AH}] = [\\mathrm{A^-}]$ a lieu à $\\mathrm{pH} = \\mathrm{p}K_A$, pas à $7$.", erreur: "égalité placée à pH = 7 (AB-DIST-3)" },
            ]),
          },
          {
            type: "qcm", q: "Quel est l’acide dosé ?",
            options: h.melange([
              { t: `${item.nom} ($\\mathrm{p}K_A = ${frTex(item.pKA, 2)}$)`, ok: true },
              ...TABLE_2021.filter((x) => x.nom !== item.nom).slice(0, 2).map((x) => ({
                t: `${x.nom} ($\\mathrm{p}K_A = ${frTex(x.pKA, 2)}$)`,
                fb: `À la demi-équivalence, $\\mathrm{p}K_A = \\mathrm{pH} = ${frTex(pHdemi, 2)}$, ce qui correspond à ${item.nom}.`,
                erreur: "pH_E/2 (+15)",
              })),
            ]),
          },
        ],
        correction: [
          { tex: `V_B = \\dfrac{V_E}{2} = ${frTex(demiV, 1)}\\ \\text{mL} \\implies \\mathrm{p}K_A = \\mathrm{pH} = ${frTex(pHdemi, 2)}`, r: `L’acide identifié est l’${item.nom}.` },
        ],
      };
    },
  },

  /* 8 : rapport [AH]/[A-] et pourcentage avant E (rejet si V_B = V_E/2) */
  {
    id: "dos-rapport",
    titre: "Rapport [AH]/[A⁻] et pourcentage de forme acide",
    niveau: 3,
    capacites: CAPD(12),
    erreurs: ["formes acide et basique échangées (+16)", "« − 1 » oublié (I-9)", "50 % à tort (AB-EQU-3)"],
    gen(h) {
      const T = tirageDosage(h);
      const VB = tire(() => Number((T.VE * h.pick([0.2, 0.25, 0.3, 0.75, 0.8])).toFixed(1)), (v) => v > 0.5 && v < T.VE - 0.5 && Math.abs(v - T.VE / 2) >= 1.0);
      const rap = T.VE / VB - 1;
      const pctA = (rap / (1 + rap)) * 100;
      const tolR = { rel: 0.03 };
      const tolP = { abs: 1.5 };
      return {
        enonce: `<p>Au cours du dosage ${T.a.de} par la soude ($V_E = ${frTex(T.VE, 1)}\\ \\text{mL}$), on s’arrête au volume versé $V_B = ${frTex(VB, 1)}\\ \\text{mL}$ (avant l’équivalence).</p>`,
        questions: [
          {
            type: "nombre", q: "Calcule le rapport $\\dfrac{[\\mathrm{AH}]}{[\\mathrm{A^-}]}$ à ce volume.", reponse: rap, tol: tolR, unite: "",
            indice: "Utilise $\\dfrac{[\\mathrm{AH}]}{[\\mathrm{A^-}]} = \\dfrac{V_E}{V_B} - 1$.",
            pieges: pieges(rap, tolR, [
              { v: T.VE / VB, fb: "Tu as oublié le « $-1$ » dans $(V_E - V_B)/V_B = V_E/V_B - 1$.", erreur: "« − 1 » oublié (I-9)" },
              { v: 1 / rap, fb: "Tu as inversé acide et base : tu as calculé $[\\mathrm{A^-}]/[\\mathrm{AH}]$.", erreur: "formes acide et basique échangées (+16)" },
              { v: 1, fb: "Le rapport vaut $1$ seulement à la demi-équivalence $V_E/2$.", erreur: "50 % à tort (AB-EQU-3)" },
            ]),
          },
          {
            type: "nombre", q: "Quel est le pourcentage de la forme acide $\\mathrm{AH}$ dans le mélange, en % ?", reponse: pctA, tol: tolP, unite: "%",
            indice: "La part d’acide restant vaut $(V_E - V_B) / V_E$.",
            pieges: pieges(pctA, tolP, [
              { v: 100 - pctA, fb: "Tu as donné le pourcentage de la forme basique $\\mathrm{A^-}$, pas de la forme acide.", erreur: "formes acide et basique échangées (+16)" },
              { v: 50, fb: "50 %, c’est à $V_E/2$ uniquement.", erreur: "50 % à tort (AB-EQU-3)" },
            ]),
          },
        ],
        correction: [
          { tex: `\\dfrac{[\\mathrm{AH}]}{[\\mathrm{A^-}]} = \\dfrac{V_E}{V_B} - 1 = \\dfrac{${frTex(T.VE, 1)}}{${frTex(VB, 1)}} - 1 = ${num(rap, 3)}`, r: "Rapport des quantités restantes et formées." },
          { tex: `\\text{Part de }\\mathrm{AH} = \\dfrac{V_E - V_B}{V_E} = ${num(pctA, 3)}\\ \\%`, r: "Pourcentage de la forme acide." },
        ],
      };
    },
  },

  /* 9 : choix de l'indicateur coloré (exactement une zone contient pH_E) */
  {
    id: "dos-indicateur",
    titre: "Choisir et justifier l’indicateur coloré adéquat",
    niveau: 2,
    capacites: CAPD(14),
    erreurs: ["indicateur hors zone (AB-IND-1)", "tout indicateur vire à 7 (AB-IND-2)", "pH_E = 7 supposé (AB-TIT-1)", "pH_E > 7 recopié pour une base (+13)"],
    gen(h) {
      const estBase = h.int(0, 2) === 0;
      const pHE = estBase ? S20.pHE : tirageDosage(h, { acide: ACIDES[h.int(0, 4)] }).pHE;
      const liste = estBase
        ? [IND.helianthine20, IND.rougeMethyle, IND.phenolphtaleine]
        : (pHE >= 8.25 ? [IND.helianthine20, IND.bbt, IND.phenolphtaleine] : [IND.helianthine18, IND.bbt, IND.rougeCresol]);
      const bon = liste.find((x) => pHE >= x.min && pHE <= x.max) || liste[2];
      const tab = liste.map((x) => `${x.nom} (${frTex(x.min, 1)}–${frTex(x.max, 1)})`).join(" ; ");
      return {
        enonce: estBase
          ? `<p>On dose une solution d’ammoniac $\\mathrm{NH_3}$ par l’acide chlorhydrique. À l’équivalence, $\\mathrm{pH}_E = ${frTex(pHE, 1)}$. Indicateurs disponibles : ${tab}.</p>`
          : `<p>On dose un acide faible par la soude. À l’équivalence, $\\mathrm{pH}_E = ${frTex(pHE, 1)}$. Indicateurs disponibles : ${tab}.</p>`,
        questions: [{
          type: "qcm", q: "Quel indicateur coloré convient pour repérer l’équivalence ?",
          options: h.melange(liste.map((x) => {
            if (x === bon) return { t: x.nom, ok: true };
            if (estBase && x === IND.phenolphtaleine) return { t: x.nom, fb: `Tu as repris l’indicateur d’un acide faible. Ici $\\mathrm{pH}_E = ${frTex(pHE, 1)} < 7$.`, erreur: "pH_E > 7 recopié pour une base (+13)" };
            if (x === IND.bbt) return { t: x.nom, fb: `Tu as visé $\\mathrm{pH} = 7$. La zone du B.B.T ne contient pas $\\mathrm{pH}_E = ${frTex(pHE, 1)}$.`, erreur: "pH_E = 7 supposé (AB-TIT-1)" };
            return { t: x.nom, fb: `Sa zone (${frTex(x.min, 1)}–${frTex(x.max, 1)}) ne contient pas $\\mathrm{pH}_E = ${frTex(pHE, 1)}$.`, erreur: "indicateur hors zone (AB-IND-1)" };
          })),
        }],
        correction: [
          { t: `La zone de virage de ${bon.nom} (${frTex(bon.min, 1)}–${frTex(bon.max, 1)}) est la seule qui contient $\\mathrm{pH}_E = ${frTex(pHE, 1)}$.` },
        ],
      };
    },
  },

  /* 10 : chaîne dilution, prélèvement, masse, étiquette */
  {
    id: "dos-chaine",
    titre: "Dilution, prélèvement, masse et vérification d’étiquette",
    niveau: 2,
    capacites: CAPD(12),
    erreurs: ["facteur de dilution oublié ou inversé (+17)", "prise d’essai confondue avec le volume total (+18)", "égalité stricte exigée (+19)"],
    gen(h) {
      const cas = h.int(0, 2);
      const tol = { rel: 0.02 };
      if (cas === 0) {
        const a = h.pick([ACIDES[3], ACIDES[4], ACIDES[5]]);
        const dil = h.pick([10, 100]);
        const CA = h.pick([2.0, 4.0, 5.0]) * 1e-2;
        const C0 = CA * dil;
        const mL = C0 * a.M;
        return {
          enonce: `<p>Une solution commerciale $(S_0)$ ${a.de} ($M = ${a.M}\\ \\text{g·mol}^{-1}$) a été diluée ${dil} fois pour donner $(S_A)$. Le dosage d’une prise d’essai $V_A = 20{,}0\\ \\text{mL}$ donne $C_A = ${sci(CA, 2)}\\ \\text{mol·L}^{-1}$.</p>`,
          questions: [
            {
              type: "nombre", q: "Calcule la concentration molaire $C_0$ de $(S_0)$, en mol·L⁻¹.", reponse: C0, tol, unite: "mol·L⁻¹",
              indice: "La solution mère $(S_0)$ est plus concentrée que la solution diluée $(S_A)$.",
              pieges: pieges(C0, tol, [
                { v: CA / dil, fb: "Tu as divisé par le facteur de dilution au lieu de multiplier.", erreur: "facteur de dilution oublié ou inversé (+17)" },
                { v: CA, fb: "Tu as oublié le facteur de dilution.", erreur: "facteur de dilution oublié ou inversé (+17)" },
              ]),
            },
            {
              type: "nombre", q: "Calcule la masse $m$ d’espèce dissoute dans $1\\ \\text{L}$ de $(S_0)$, en g.", reponse: mL, tol, unite: "g",
              indice: "Pour $1\\ \\text{L}$ de $(S_0)$, $m = C_0 \\cdot 1 \\cdot M$.",
              pieges: pieges(mL, tol, [
                { v: CA * a.M, fb: "Tu as utilisé $C_A$ au lieu de $C_0$.", erreur: "facteur de dilution oublié ou inversé (+17)" },
                { v: C0 * 0.020 * a.M, fb: "Tu as multiplié par la prise d’essai ($20\\ \\text{mL}$) au lieu de $1\\ \\text{L}$.", erreur: "prise d’essai confondue avec le volume total (+18)" },
              ]),
            },
          ],
          correction: [
            { tex: `C_0 = ${dil}\\,C_A = ${num(C0, 3)}\\ \\text{mol·L}^{-1}`, r: "On remonte la dilution en multipliant." },
            { tex: `m = C_0\\,M = ${num(mL, 3)}\\ \\text{g}`, r: "Masse dissoute dans $1\\ \\text{L}$ de solution mère." },
          ],
        };
      }
      if (cas === 1) {
        const VSA = h.pick([50.0, 100.0]), VA = 15.0, CA = h.pick([2.0, 2.5, 3.0]) * 1e-2, M = 176;
        const mC = CA * (VSA * 1e-3) * M;
        return {
          enonce: `<p>Un comprimé de vitamine C ($M = ${M}\\ \\text{g·mol}^{-1}$) est dissous dans un volume $V_{SA} = ${frTex(VSA, 1)}\\ \\text{mL}$. On dose une prise d’essai $V_A = ${frTex(VA, 1)}\\ \\text{mL}$ et l’on trouve $C_A = ${sci(CA, 2)}\\ \\text{mol·L}^{-1}$.</p>`,
          questions: [{
            type: "nombre", q: "Calcule la masse $m$ de vitamine C dans le comprimé, en g.", reponse: mC, tol, unite: "g",
            indice: "Le comprimé entier est dissous dans $V_{SA}$, pas dans $V_A$.",
            pieges: pieges(mC, tol, [
              { v: CA * (VA * 1e-3) * M, fb: "Tu as utilisé la prise d’essai $V_A$ au lieu du volume total $V_{SA}$.", erreur: "prise d’essai confondue avec le volume total (+18)" },
            ]),
          }],
          correction: [{ tex: `m = C_A\\,V_{SA}\\,M = ${num(mC, 3)}\\ \\text{g}`, r: "On utilise le volume total $V_{SA}$ dans lequel le comprimé est dissous." }],
        };
      }
      return {
        enonce: `<p>Sujet 2025 : l’étiquette d’une solution commerciale $(S_0)$ annonce $500\\ \\text{g·L}^{-1}$ ($M = 104\\ \\text{g·mol}^{-1}$). Le dosage après dilution par $100$ donne $C_0 = 4{,}80\\ \\text{mol·L}^{-1}$, soit $C_0\\,M = 499{,}2\\ \\text{g·L}^{-1}$.</p>`,
        questions: [{
          type: "qcm", q: "L’indication de l’étiquette est-elle vérifiée ?",
          options: h.melange([
            { t: "Oui : l’écart relatif est de 0,2 %, donc négligeable", ok: true },
            { t: "Non : 499,2 n’est pas strictement égal à 500", fb: "Une mesure expérimentale se compare avec son écart relatif : $0{,}2\\ \\%$ confirme l’étiquette.", erreur: "égalité stricte exigée (+19)" },
            { t: "On ne peut pas conclure sans connaître pK_A", fb: "La masse par litre $C_0 M$ suffit directement.", erreur: "égalité stricte exigée (+19)" },
          ]),
        }],
        correction: [{ t: "$C_0 M = 499{,}2\\ \\text{g·L}^{-1}$ : l’écart relatif avec $500\\ \\text{g·L}^{-1}$ est de $0{,}16\\ \\%$, l’indication est vérifiée." }],
      };
    },
  },

  /* 11 : concentration à l'équivalence (forme 2025) */
  {
    id: "dos-ceq",
    titre: "Concentration de l’espèce formée à l’équivalence",
    niveau: 2,
    capacites: CAPD(12, 13),
    erreurs: ["volume total oublié (+20)", "C_B recopiée"],
    gen(h) {
      const T = tirageDosage(h);
      const xmax = T.CA * T.VA * 1e-3;
      const Ceq = xmax / ((T.VA + T.VE) * 1e-3);
      const tol = { rel: 0.02 };
      return {
        enonce: `<p>On dose $V_A = ${frTex(T.VA, 1)}\\ \\text{mL}$ d’une solution ${T.a.de} ($C_A = ${sci(T.CA, 2)}\\ \\text{mol·L}^{-1}$) par la soude ($C_B = ${sci(T.CB, 2)}\\ \\text{mol·L}^{-1}$). L’équivalence est atteinte pour $V_{BE} = ${frTex(T.VE, 1)}\\ \\text{mL}$.</p>`,
        questions: [{
          type: "nombre", q: `Calcule la concentration $C_{\\text{eq}}$ des ions $${m(T.a.A)}$ à l’équivalence, en mol·L⁻¹.`, reponse: Ceq, tol, unite: "mol·L⁻¹",
          indice: "À l’équivalence, $n(\\mathrm{A^-})_E = C_A V_A$ est réparti dans le volume total $V_A + V_{BE}$.",
          pieges: pieges(Ceq, tol, [
            { v: T.CA, fb: "Tu as divisé par $V_A$ seul. La soude versée a augmenté le volume du mélange : $V_A + V_{BE}$.", erreur: "volume total oublié (+20)" },
            { v: T.CB, fb: "Tu as divisé par $V_{BE}$ seul (ou recopié $C_B$). Divise par le volume total $V_A + V_{BE}$.", erreur: "C_B recopiée" },
          ]),
        }],
        correction: [
          { tex: `C_{\\text{eq}} = \\dfrac{C_A\\,V_A}{V_A + V_{BE}} = ${sci(Ceq, 2)}\\ \\text{mol·L}^{-1}`, r: "On divise la quantité formée par le volume total du mélange." },
        ],
      };
    },
  },

  /* 12 : synthèse type bac (rejoue 2018, 2020, 2022, 2024, 2025) */
  {
    id: "dos-bac",
    titre: "Au bac : enchaîner lecture, calcul et justification",
    niveau: 3,
    capacites: CAPD(10, 11, 12, 13, 14),
    erreurs: ["rapport inversé (+8)", "concentrations égales (AB-TIT-2)", "indicateur hors zone (AB-IND-1)", "prise d’essai confondue (+18)", "volume total oublié (+20)"],
    gen(h) {
      const s = h.int(0, 2);
      const tol = { rel: 0.02 };
      if (s === 0) {
        // 2018 N
        return {
          enonce: `<p><b>Bac PC 2018 (NS28F)</b> : on dose $V_A = ${S18.VA}\\ \\text{mL}$ d’acide lactique $\\mathrm{AH}$ ($\\mathrm{p}K_A = ${frTex(S18.pKA, 1)}$) par la soude ($C_B = ${sci(S18.CB, 1)}\\ \\text{mol·L}^{-1}$). La méthode des tangentes donne $V_{BE} = ${frTex(S18.VE, 1)}\\ \\text{mL}$ et $\\mathrm{pH}_E = ${frTex(S18.pHE, 1)}$.</p>`,
          questions: [
            {
              type: "nombre", q: "Calcule la concentration $C_A$, en mol·L⁻¹.", reponse: S18.CA, tol, unite: "mol·L⁻¹",
              indice: "$C_A = C_B V_{BE} / V_A$.",
              pieges: pieges(S18.CA, tol, [
                { v: S18.fauxInv, fb: "Tu as inversé $V_{BE}$ et $V_A$.", erreur: "rapport inversé (+8)" },
                { v: S18.CB, fb: "Tu as recopié $C_B$.", erreur: "concentrations égales (AB-TIT-2)" },
              ]),
            },
            {
              type: "qcm", q: "Choisis l’indicateur adéquat : hélianthine (3–4,4), B.B.T (6–7,6), rouge de crésol (7,2–8,8).",
              options: h.melange([
                { t: "Rouge de crésol", ok: true },
                { t: "B.B.T", fb: "Sa zone ne contient pas $\\mathrm{pH}_E = 8{,}0$.", erreur: "indicateur hors zone (AB-IND-1)" },
                { t: "Hélianthine", fb: "Sa zone est loin sous $\\mathrm{pH}_E = 8{,}0$.", erreur: "indicateur hors zone (AB-IND-1)" },
              ]),
            },
          ],
          correction: [
            { tex: `C_A = \\dfrac{C_B\\,V_{BE}}{V_A} = ${sci(S18.CA, 2)}\\ \\text{mol·L}^{-1}`, r: "Expression littérale puis calcul." },
            { t: "Le rouge de crésol convient : sa zone $7{,}2$–$8{,}8$ contient $\\mathrm{pH}_E = 8{,}0$." },
          ],
        };
      }
      if (s === 1) {
        // 2024 N
        return {
          enonce: `<p><b>Bac PC 2024 (NS 28F)</b> : un comprimé de vitamine C ($M = ${S24.M}\\ \\text{g·mol}^{-1}$) est dissous dans $V_{SA} = ${frTex(S24.VSA, 1)}\\ \\text{mL}$. On dose $V_A = ${frTex(S24.VA, 1)}\\ \\text{mL}$ par la soude ($C_B = ${sci(S24.CB, 3)}\\ \\text{mol·L}^{-1}$). Le pic de la dérivée est à $V_{BE} = ${frTex(S24.VBE, 1)}\\ \\text{mL}$.</p>`,
          questions: [
            {
              type: "nombre", q: "Calcule $C_A$, en mol·L⁻¹.", reponse: S24.CA, tol, unite: "mol·L⁻¹",
              indice: "$C_A = C_B V_{BE} / V_A$.",
              pieges: pieges(S24.CA, tol, [
                { v: S24.fauxInv, fb: "Tu as inversé $V_{BE}$ et $V_A$.", erreur: "rapport inversé (+8)" },
                { v: S24.CB, fb: "Tu as recopié $C_B$.", erreur: "concentrations égales (AB-TIT-2)" },
              ]),
            },
            {
              type: "nombre", q: "Déduis la masse restante $m$ dans le comprimé, en g.", reponse: S24.mRest, tol, unite: "g",
              indice: "$m = C_A V_{SA} M$, avec $V_{SA}$ en litres.",
              pieges: pieges(S24.mRest, tol, [
                { v: S24.fauxPrise, fb: "Tu as utilisé la prise d’essai $V_A$ au lieu du volume total $V_{SA}$.", erreur: "prise d’essai confondue (+18)" },
              ]),
            },
          ],
          correction: [
            { tex: `C_A = ${sci(S24.CA, 2)}\\ \\text{mol·L}^{-1}\\qquad m = C_A V_{SA} M = ${frTex(S24.mRest, 2)}\\ \\text{g}`, r: "Données du sujet 2024." },
          ],
        };
      }
      // 2025 N
      return {
        enonce: `<p><b>Bac PC 2025 (NS28F)</b> : on dilue ${S25.dil} fois une solution $(S_0)$ de $\\mathrm{NaHSO_3}$ pour obtenir $(S_A)$. On dose $V_A = ${frTex(S25.VA, 1)}\\ \\text{mL}$ de $(S_A)$ par la soude ($C_B = ${frTex(S25.CB, 2)}\\ \\text{mol·L}^{-1}$) ; $V_{BE} = ${frTex(S25.VBE, 1)}\\ \\text{mL}$.</p>`,
        questions: [
          {
            type: "nombre", q: "Calcule $C_A$, en mol·L⁻¹.", reponse: S25.CA, tol, unite: "mol·L⁻¹",
            indice: "$C_A = C_B V_{BE} / V_A$.",
            pieges: pieges(S25.CA, tol, [
              { v: (S25.CB * S25.VA) / S25.VBE, fb: "Tu as inversé $V_{BE}$ et $V_A$.", erreur: "rapport inversé (+8)" },
              { v: S25.CB, fb: "Tu as recopié $C_B$.", erreur: "concentrations égales (AB-TIT-2)" },
            ]),
          },
          {
            type: "nombre", q: "Calcule la concentration $C_{\\text{eq}}$ des ions $\\mathrm{SO_3^{2-}}$ à l’équivalence, en mol·L⁻¹.", reponse: S25.Ceq, tol, unite: "mol·L⁻¹",
            indice: "Divise $C_A V_A$ par le volume total $V_A + V_{BE}$.",
            pieges: pieges(S25.Ceq, tol, [
              { v: S25.fauxVA, fb: "Tu as divisé par $V_A$ seul. Ajoute le volume de soude $V_{BE}$.", erreur: "volume total oublié (+20)" },
            ]),
          },
        ],
        correction: [
          { tex: `C_A = ${sci(S25.CA, 2)}\\ \\text{mol·L}^{-1}\\qquad C_{\\text{eq}} = \\dfrac{C_A V_A}{V_A + V_{BE}} \\approx ${sci(S25.Ceq, 2)}\\ \\text{mol·L}^{-1}`, r: "Données du sujet 2025." },
        ],
      };
    },
  },
];
