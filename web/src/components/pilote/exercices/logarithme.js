// @ts-nocheck
/**
 * Les exercices de la leçon « Fonction logarithme népérien » (V3).
 * Format : voir modele.js. Chaque réponse est calculée ici ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages.
 *
 * Séance 1 « Pourquoi ln » d'abord (calcul, signe, ensemble de définition,
 * équations et inéquations), puis la séance 2 « ln comme fonction » (limites,
 * dérivée, tangente, étude, logarithme décimal), annoncée comme telle à l'élève.
 * Conventions des sujets : intervalles avec une virgule, ]0,+∞[.
 */
import { fr, frTex } from "./nombre.js";

const LN = { 2: Math.log(2), 3: Math.log(3), 5: Math.log(5), 7: Math.log(7) };
const donneesLn = (bases) =>
  `On donne : ${bases.map((b) => `$\\ln ${b} \\approx ${frTex(LN[b], 3)}$`).join(", ")}.`;
const puiss = (b, e) => (e === 1 ? `${b}` : `${b}^{${e}}`);
const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
/** n/d en TeX, simplifiée, le signe devant (entier si possible). */
const fracTex = (n, d) => {
  if (d < 0) [n, d] = [-n, -d];
  const g = pgcd(Math.abs(n), d) || 1,
    N = n / g,
    D = d / g;
  if (D === 1) return `${N}`;
  return N < 0 ? `-\\frac{${-N}}{${D}}` : `\\frac{${N}}{${D}}`;
};
/** Un intervalle ouvert comme dans les sujets : ]a,b[ */
const itv = (lo, hi) => `\\left]${lo},${hi}\\right[`;
/** x − a, écrit proprement (x, x − 3, x + 2) */
const xm = (a) => (a === 0 ? "x" : a > 0 ? `x - ${a}` : `x + ${-a}`);
/** (x − a) entre parenthèses, sauf pour x seul */
const par = (a) => (a === 0 ? "x" : `(${xm(a)})`);
/** k·x avec k entier : x, −x, 3x */
const kx = (k) => (k === 1 ? "x" : k === -1 ? "-x" : `${k}x`);
/** un terme signé : + 3, − 3 */
const sg = (k) => (k < 0 ? `- ${-k}` : `+ ${k}`);
const coef = (k) => (k === 1 ? "" : `${k}`);

export const EXERCICES = [
  /* ===================== séance 1 : « Pourquoi ln » ===================== */

  /* 1 — produit et puissance */
  {
    id: "ln-produit-puissance",
    titre: "Le logarithme d’un produit de puissances",
    niveau: 1,
    capacites: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
    erreurs: ["ln(ab) = ln a × ln b", "ln(aⁿ) = (ln a)ⁿ"],
    gen(h) {
      const [a, b] = h.melange([2, 3, 5]).slice(0, 2).sort((x, y) => x - y);
      const p = h.int(2, 3),
        q = h.int(1, 2);
      const N = a ** p * b ** q;
      const v = p * LN[a] + q * LN[b];
      const lnb = q === 1 ? `\\ln ${b}` : `(\\ln ${b})^{${q}}`;
      const opts = h.melange([
        { t: `$${p}\\ln ${a} + ${coef(q)}\\ln ${b}$`, ok: true },
        {
          t: `$${p}\\ln ${a} \\times ${coef(q)}\\ln ${b}$`,
          fb: `ln change le produit en somme, jamais en produit : $\\ln(${puiss(a, p)} \\times ${puiss(b, q)}) = \\ln ${puiss(a, p)} + \\ln ${puiss(b, q)}$.`,
          erreur: "ln(ab) = ln a × ln b",
        },
        {
          t: `$(\\ln ${a})^{${p}} + ${lnb}$`,
          fb: `L’exposant descend devant le logarithme : $\\ln(${puiss(a, p)}) = ${p}\\ln ${a}$, pas $(\\ln ${a})^{${p}}$.`,
          erreur: "ln(aⁿ) = (ln a)ⁿ",
        },
        {
          t: `$${p}\\ln ${a} - ${coef(q)}\\ln ${b}$`,
          fb: `Le signe moins vient d’un quotient. Ici ${N} est un produit : $${N} = ${puiss(a, p)} \\times ${puiss(b, q)}$.`,
          erreur: "confondre produit et quotient",
        },
      ]);
      return {
        enonce: `<p>Soit $N = ${N}$. ${donneesLn([a, b])}</p>`,
        questions: [
          { type: "qcm", q: `Décompose $${N}$ et exprime $\\ln ${N}$ en fonction de $\\ln ${a}$ et $\\ln ${b}$.`, options: opts },
          {
            type: "nombre",
            q: `En déduire une valeur approchée de $\\ln ${N}$ à $0{,}01$ près.`,
            reponse: v,
            tol: { abs: 0.015 },
            indice: `Remplace $\\ln ${a}$ et $\\ln ${b}$ par leurs valeurs dans l’expression trouvée.`,
            pieges: [
              { v: p * LN[a] * q * LN[b], fb: "Tu as multiplié les logarithmes. ln change le produit en somme.", erreur: "ln(ab) = ln a × ln b" },
            ],
          },
        ],
        correction: [
          { tex: `${N} = ${puiss(a, p)} \\times ${puiss(b, q)}`, r: "On décompose en facteurs premiers." },
          { tex: `\\ln ${N} = \\ln ${puiss(a, p)} + \\ln ${puiss(b, q)}`, r: "Le logarithme d’un produit est la somme des logarithmes." },
          { tex: `\\ln ${N} = ${p}\\ln ${a} + ${coef(q)}\\ln ${b}`, r: "L’exposant descend : $\\ln(a^n) = n\\ln a$." },
          { tex: `\\ln ${N} \\approx ${frTex(v, 2)}`, r: "On remplace par les valeurs données." },
        ],
      };
    },
  },

  /* 2 — quotient et inverse */
  {
    id: "ln-quotient",
    titre: "Le logarithme d’un quotient",
    niveau: 1,
    capacites: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
    erreurs: ["ln(a/b) = ln a / ln b", "ln(1/a) = ln a"],
    gen(h) {
      const [a, b] = h.melange([2, 3, 5, 7]).slice(0, 2);
      const p = h.int(1, 3);
      const v = LN[a] - p * LN[b];
      const opts = h.melange([
        { t: `$\\ln ${a} - ${coef(p)}\\ln ${b}$`, ok: true },
        {
          t: `$\\dfrac{\\ln ${a}}{${coef(p)}\\ln ${b}}$`,
          fb: "ln change le quotient en différence, pas en quotient : $\\ln\\frac{a}{b} = \\ln a - \\ln b$.",
          erreur: "ln(a/b) = ln a / ln b",
        },
        {
          t: `$\\ln ${a} + ${coef(p)}\\ln ${b}$`,
          fb: `Diviser par $${puiss(b, p)}$, c’est multiplier par son inverse, dont le logarithme est $-${coef(p)}\\ln ${b}$ : on soustrait.`,
          erreur: "ln(1/a) = ln a",
        },
      ]);
      return {
        enonce: `<p>${donneesLn([a, b])}</p>`,
        questions: [
          { type: "qcm", q: `Exprime $\\ln\\dfrac{${a}}{${puiss(b, p)}}$ en fonction de $\\ln ${a}$ et $\\ln ${b}$.`, options: opts },
          {
            type: "nombre",
            q: `Donne une valeur approchée de ce nombre à $0{,}01$ près.`,
            reponse: v,
            tol: { abs: 0.015 },
            indice: "Le résultat peut être négatif : un quotient plus petit que 1 a un logarithme négatif.",
            pieges: [
              { v: LN[a] / (p * LN[b]), fb: "Tu as divisé les logarithmes. ln change le quotient en différence.", erreur: "ln(a/b) = ln a / ln b" },
              { v: LN[a] + p * LN[b], fb: "C’est le logarithme du produit. Pour un quotient, on soustrait.", erreur: "ln(1/a) = ln a" },
            ],
          },
        ],
        correction: [
          { tex: `\\ln\\frac{${a}}{${puiss(b, p)}} = \\ln ${a} - \\ln ${puiss(b, p)}`, r: "Le logarithme d’un quotient est la différence des logarithmes." },
          { tex: `\\ln\\frac{${a}}{${puiss(b, p)}} = \\ln ${a} - ${coef(p)}\\ln ${b}`, r: "L’exposant descend." },
          { tex: `\\ln\\frac{${a}}{${puiss(b, p)}} \\approx ${frTex(v, 2)}`, r: `Le signe dit si $\\frac{${a}}{${puiss(b, p)}}$ est plus grand ou plus petit que 1.` },
        ],
      };
    },
  },

  /* 3 — le piège de la somme */
  {
    id: "ln-somme",
    titre: "Une somme sous le logarithme",
    niveau: 1,
    capacites: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
    erreurs: ["ln(a + b) = ln a + ln b"],
    gen(h) {
      const [a, b] = h.melange([2, 3, 5, 7]).slice(0, 2);
      const opts = h.melange([
        { t: `$\\ln(${a * b})$`, ok: true },
        {
          t: `$\\ln(${a + b})$`,
          fb: `$\\ln ${a} + \\ln ${b} = \\ln(${a} \\times ${b})$ : la somme des logarithmes est le logarithme du PRODUIT. $\\ln(${a + b})$ ne se découpe pas.`,
          erreur: "ln(a + b) = ln a + ln b",
        },
        {
          t: `$\\ln ${a} \\times \\ln ${b}$`,
          fb: "Ce n’est pas une réécriture : une somme et un produit de logarithmes sont deux nombres différents.",
          erreur: "ln(ab) = ln a × ln b",
        },
      ]);
      return {
        enonce: `<p>Un élève écrit : « $\\ln ${a} + \\ln ${b} = \\ln(${a} + ${b})$ ».</p>`,
        questions: [
          { type: "qcm", q: `À quoi est égal $\\ln ${a} + \\ln ${b}$ ?`, options: opts },
          {
            type: "nombre",
            q: `Vérifie à la calculatrice : $\\ln(${a + b}) - (\\ln ${a} + \\ln ${b})$ vaut environ ? (à $0{,}01$ près)`,
            reponse: Math.log(a + b) - Math.log(a * b),
            tol: { abs: 0.015 },
            indice: "Calcule chaque terme séparément, puis soustrais. Si la règle de l’élève était juste, tu trouverais 0.",
            pieges: [{ v: 0, fb: "Tu trouves 0 ? Recalcule : ln(a + b) et ln a + ln b ne sont pas égaux.", erreur: "ln(a + b) = ln a + ln b" }],
          },
        ],
        correction: [
          { tex: `\\ln ${a} + \\ln ${b} = \\ln(${a} \\times ${b}) = \\ln ${a * b}`, r: "La règle du cours transforme un produit en somme, et inversement." },
          { tex: `\\ln(${a + b}) \\approx ${frTex(Math.log(a + b), 3)} \\quad\\text{et}\\quad \\ln ${a * b} \\approx ${frTex(Math.log(a * b), 3)}`, r: "Les deux nombres sont différents : l’élève s’est trompé." },
          { t: "Aucune formule ne découpe le logarithme d’une somme." },
        ],
      };
    },
  },

  /* 4 — vrai ou faux sur les règles */
  {
    id: "ln-vrai-faux",
    titre: "Vrai ou faux : les règles de ln",
    niveau: 1,
    capacites: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
    erreurs: ["ln(a + b) = ln a + ln b", "ln(a/b) = ln a / ln b", "ln(a²) = 2 ln a pour tout a ≠ 0"],
    gen(h) {
      const POOL = [
        { s: "\\ln(a + b) = \\ln a + \\ln b", vrai: false, pourquoi: "Faux : la somme des logarithmes est le logarithme du produit. Contre-exemple : $\\ln(1 + 1) = \\ln 2 \\approx 0{,}69$, alors que $\\ln 1 + \\ln 1 = 0$.", erreur: "ln(a + b) = ln a + ln b" },
        { s: "\\ln\\dfrac{a}{b} = \\dfrac{\\ln a}{\\ln b}", vrai: false, pourquoi: "Faux : $\\ln\\frac{a}{b} = \\ln a - \\ln b$. Contre-exemple : pour $a = 4$ et $b = 2$, $\\ln 2 \\approx 0{,}69$, mais $\\frac{\\ln 4}{\\ln 2} = 2$.", erreur: "ln(a/b) = ln a / ln b" },
        { s: "\\ln(ab) = \\ln a \\times \\ln b", vrai: false, pourquoi: "Faux : $\\ln(ab) = \\ln a + \\ln b$. Contre-exemple : pour $a = b = e$, $\\ln(e^2) = 2$, mais $\\ln e \\times \\ln e = 1$.", erreur: "ln(ab) = ln a × ln b" },
        { s: "(\\ln a)^2 = 2\\ln a", vrai: false, pourquoi: "Faux : c’est $\\ln(a^2)$ qui vaut $2\\ln a$. Contre-exemple : pour $a = e^3$, $(\\ln a)^2 = 9$, mais $2\\ln a = 6$.", erreur: "ln(aⁿ) = (ln a)ⁿ" },
        { s: "\\text{pour tout réel } a \\neq 0 :\\ \\ln(a^2) = 2\\ln a", vrai: false, pourquoi: "Faux : pour $a = -3$, $\\ln 9$ existe mais $\\ln(-3)$ n’existe pas. L’égalité ne vaut que pour $a > 0$.", erreur: "ln(a²) = 2 ln a pour tout a ≠ 0" },
        { s: "\\ln(ab) = \\ln a + \\ln b", vrai: true, pourquoi: "Vrai : c’est la règle du produit, pour $a > 0$ et $b > 0$.", erreur: "ln(ab) = ln a × ln b" },
        { s: "\\ln\\dfrac{1}{a} = -\\ln a", vrai: true, pourquoi: "Vrai : $\\ln\\frac{1}{a} + \\ln a = \\ln 1 = 0$.", erreur: "ln(1/a) = 1/ln a" },
        { s: "\\ln\\sqrt{a} = \\dfrac{1}{2}\\ln a", vrai: true, pourquoi: "Vrai : $\\ln a = \\ln(\\sqrt a \\times \\sqrt a) = 2\\ln\\sqrt a$.", erreur: "ln √a = √(ln a)" },
        { s: "\\ln(a^3) = 3\\ln a", vrai: true, pourquoi: "Vrai : $a^3 = a \\times a \\times a$, et ln change chaque × en +.", erreur: "ln(aⁿ) = (ln a)ⁿ" },
      ];
      const m = h.melange(POOL);
      const faux = m.find((x) => !x.vrai),
        vrai = m.find((x) => x.vrai),
        autre = m.find((x) => x !== faux && x !== vrai);
      const choix = h.melange([faux, vrai, autre]);
      return {
        enonce: "<p>Pour tous réels $a > 0$ et $b > 0$ (sauf mention contraire), dis si chaque égalité est vraie ou fausse.</p>",
        questions: choix.map((x) => ({
          type: "qcm",
          q: `$${x.s}$`,
          options: h.melange([
            x.vrai ? { t: "Vrai", ok: true } : { t: "Vrai", fb: x.pourquoi, erreur: x.erreur },
            x.vrai ? { t: "Faux", fb: x.pourquoi, erreur: `douter d’une règle juste (la confondre avec « ${x.erreur} »)` } : { t: "Faux", ok: true },
          ]),
        })),
        correction: choix.map((x, i) => ({ tex: x.s, r: `${i + 1}. ${x.pourquoi}` })),
      };
    },
  },

  /* 5 — le signe de ln(x − a) */
  {
    id: "ln-signe",
    titre: "Le signe de ln(x − a)",
    niveau: 1,
    capacites: ["maths-sexp 1.2.17", "maths-sm 1.3.10"],
    erreurs: ["ln x < 0 sur ]0,1[ oublié", "oublier l’ensemble de définition", "confondre x et x − a"],
    gen(h) {
      const a = h.int(-3, 5);
      const u = xm(a);
      const opts = [
        { t: `$${itv(a, a + 1)}$`, ok: true },
        {
          t: `$${itv("-\\infty", a + 1)}$`,
          fb: `Il faut aussi que $${u} > 0$, sinon $\\ln(${u})$ n’existe pas : les solutions commencent à $${a}$.`,
          erreur: "oublier l’ensemble de définition",
        },
        {
          t: `$${itv(a + 1, "+\\infty")}$`,
          fb: `Là, $${u} > 1$ : le logarithme est positif. ln est négatif quand ce qui est dedans est entre 0 et 1.`,
          erreur: "ln x < 0 sur ]0,1[ oublié",
        },
      ];
      if (a !== 0)
        opts.push({
          t: `$${itv(0, 1)}$`,
          fb: `C’est pour $x$ dans $]0,1[$ que $\\ln x < 0$. Ici, c’est $${u}$ qui doit être entre 0 et 1 : $${a} < x < ${a + 1}$.`,
          erreur: "confondre x et x − a",
        });
      const pieges = [{ v: a, fb: `Pour $x = ${a}$, on aurait $\\ln 0$, qui n’existe pas. ln s’annule quand ce qui est dedans vaut 1.`, erreur: "confondre ln 0 et ln 1" }];
      if (a !== 0 && a !== 1) pieges.push({ v: 1, fb: `C’est $${u}$ qui doit valoir 1, pas $x$.`, erreur: "confondre x et x − a" });
      return {
        enonce: `<p>On considère le nombre $\\ln(${u})$.</p>`,
        questions: [
          { type: "qcm", q: `Pour quels $x$ a-t-on $\\ln(${u}) < 0$ ?`, options: h.melange(opts) },
          {
            type: "nombre",
            q: `Pour quelle valeur de $x$ a-t-on $\\ln(${u}) = 0$ ?`,
            reponse: a + 1,
            tol: { abs: 0.001 },
            indice: "Le seul nombre dont le logarithme est nul, c’est 1.",
            pieges,
          },
        ],
        correction: [
          { tex: `${u} > 0 \\iff x > ${a}`, r: "Le logarithme n’existe que si ce qui est dedans est strictement positif." },
          { tex: `\\ln(${u}) < 0 \\iff 0 < ${u} < 1`, r: "ln est négatif sur $]0,1[$ : à gauche de 1, sa courbe est sous l’axe." },
          { tex: `\\iff ${a} < x < ${a + 1}`, r: "On isole $x$." },
          { tex: `\\ln(${u}) = 0 \\iff ${u} = 1 \\iff x = ${a + 1}`, r: "$\\ln 1 = 0$, et ln ne s’annule qu’en 1." },
        ],
      };
    },
  },

  /* 6 — l'ensemble de définition de ln(px + q) */
  {
    id: "ln-domaine",
    titre: "L’ensemble de définition de ln(px + q)",
    niveau: 1,
    capacites: ["maths-sexp 1.2.17", "maths-sm 1.3.10", "maths-sexp 1.2.22"],
    erreurs: ["≥ au lieu de >", "garder le sens de l’inégalité en divisant par un négatif", "recopier ]0,+∞[ sans calcul"],
    gen(h) {
      const p = h.pick([-3, -2, -1, 1, 2, 3]),
        q = h.pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]);
      const expr = `${kx(p)} ${sg(q)}`;
      const r = -q / p,
        rt = fracTex(-q, p);
      const bon = p > 0 ? itv(rt, "+\\infty") : itv("-\\infty", rt);
      const opts = [
        { t: `$${bon}$`, ok: true },
        {
          t: p > 0 ? `$\\left[${rt},+\\infty\\right[$` : `$\\left]-\\infty,${rt}\\right]$`,
          fb: `En $x = ${rt}$, on a $${expr} = 0$, et $\\ln 0$ n’existe pas : la borne est exclue, crochet ouvert.`,
          erreur: "≥ au lieu de >",
        },
        {
          t: `$${p > 0 ? itv("-\\infty", rt) : itv(rt, "+\\infty")}$`,
          fb:
            p > 0
              ? `$${expr} > 0$ donne $x > ${rt}$ : on divise par $${p} > 0$, le sens ne change pas.`
              : `En divisant par $${p} < 0$, le sens de l’inégalité change : $${expr} > 0$ donne $x < ${rt}$.`,
          erreur: "garder le sens de l’inégalité en divisant par un négatif",
        },
      ];
      if (!(p > 0 && r === 0)) opts.push({ t: "$]0,+\\infty[$", fb: `C’est l’ensemble de définition de $\\ln x$. Ici, c’est $${expr}$ qui doit être strictement positif.`, erreur: "recopier ]0,+∞[ sans calcul" });
      const entier = p > 0 ? Math.floor(r) + 1 : Math.ceil(r) - 1;
      const pieges = Number.isInteger(r) ? [{ v: r, fb: `En $x = ${rt}$, $${expr} = 0$ : $\\ln 0$ n’existe pas, l’inégalité est stricte.`, erreur: "≥ au lieu de >" }] : [];
      return {
        enonce: `<p>Soit $f$ la fonction définie par $f(x) = \\ln(${expr})$. On note $D_f$ son ensemble de définition.</p>`,
        questions: [
          { type: "qcm", q: "$D_f$ est égal à :", options: h.melange(opts) },
          {
            type: "nombre",
            q: p > 0 ? "Quel est le plus petit entier $x$ pour lequel $f(x)$ existe ?" : "Quel est le plus grand entier $x$ pour lequel $f(x)$ existe ?",
            reponse: entier,
            tol: { abs: 0.001 },
            indice: `Cherche l’entier le plus proche de $${rt}$ qui est ${p > 0 ? "strictement plus grand" : "strictement plus petit"}.`,
            pieges,
          },
        ],
        correction: [
          { tex: `${expr} > 0`, r: "ln n’existe que pour un nombre strictement positif." },
          {
            tex: `${kx(p)} > ${-q} \\iff x ${p > 0 ? ">" : "<"} ${rt}`,
            r: p > 0 ? `On divise par $${p} > 0$ : le sens ne change pas.` : `On divise par $${p} < 0$ : le sens de l’inégalité change.`,
          },
          { tex: `D_f = ${bon}`, r: "Crochet ouvert : la borne est exclue." },
        ],
      };
    },
  },

  /* 7 — simplifier : ln √a, ln(1/aʳ), ln eᵖ */
  {
    id: "ln-simplifier",
    titre: "Simplifier une expression avec ln",
    niveau: 2,
    capacites: ["maths-sexp 1.2.16", "maths-sm 1.3.9"],
    erreurs: ["ln(1/a) = 1/ln a", "oublier le signe de l’inverse", "ln √a = 2 ln a", "ln(eᵖ) = eᵖ"],
    gen(h) {
      const b = h.pick([2, 3, 5]),
        r = h.int(2, 4),
        p = h.int(2, 5);
      const k = -r + 0.5;
      const opts = h.melange([
        { t: `$-${r}\\ln ${b}$`, ok: true },
        { t: `$\\dfrac{1}{${r}\\ln ${b}}$`, fb: `Le logarithme d’un inverse est l’opposé du logarithme : $\\ln\\frac{1}{a} = -\\ln a$, pas $\\frac{1}{\\ln a}$.`, erreur: "ln(1/a) = 1/ln a" },
        { t: `$${r}\\ln ${b}$`, fb: "Tu as oublié le signe : un nombre entre 0 et 1 a un logarithme négatif, et $\\ln\\frac{1}{a} = -\\ln a$.", erreur: "oublier le signe de l’inverse" },
        { t: `$-(\\ln ${b})^{${r}}$`, fb: `L’exposant descend devant : $\\ln(${b}^{${r}}) = ${r}\\ln ${b}$.`, erreur: "ln(aⁿ) = (ln a)ⁿ" },
      ]);
      return {
        enonce: `<p>On pose $A = \\ln\\dfrac{1}{${b}^{${r}}} + \\ln\\sqrt{${b}}$ et $B = \\ln\\left(e^{${p}}\\right) - \\ln\\sqrt{e}$.</p>`,
        questions: [
          { type: "qcm", q: `$\\ln\\dfrac{1}{${b}^{${r}}}$ est égal à :`, options: opts },
          {
            type: "nombre",
            q: `On écrit $A = k\\ln ${b}$. Que vaut $k$ ?`,
            reponse: k,
            tol: { abs: 0.001 },
            indice: "$\\ln\\sqrt a = \\frac{1}{2}\\ln a$, car $\\ln a = \\ln(\\sqrt a \\times \\sqrt a)$.",
            pieges: [
              { v: r + 0.5, fb: "Le premier terme est négatif : $\\ln\\frac{1}{a^r} = -r\\ln a$.", erreur: "oublier le signe de l’inverse" },
              { v: -r + 2, fb: "La racine carrée donne la moitié, pas le double : $\\ln\\sqrt a = \\frac{1}{2}\\ln a$.", erreur: "ln √a = 2 ln a" },
              { v: -r - 0.5, fb: "$\\ln\\sqrt a = +\\frac{1}{2}\\ln a$ : c’est un nombre positif quand $a > 1$.", erreur: "oublier le signe de l’inverse" },
            ],
          },
          {
            type: "nombre",
            q: "Que vaut $B$ ?",
            reponse: p - 0.5,
            tol: { abs: 0.001 },
            indice: "$\\ln e = 1$ : $\\ln(e^p) = p$ et $\\ln\\sqrt e = \\frac{1}{2}$.",
            pieges: [
              { v: p, fb: "Tu as oublié le second terme : $\\ln\\sqrt e = \\frac{1}{2}$.", erreur: "oublier ln √e = ½" },
              { v: p + 0.5, fb: "On soustrait $\\ln\\sqrt e$ : $B = p - \\frac{1}{2}$.", erreur: "oublier le signe de l’inverse" },
              { v: Math.exp(p) - 0.5, fb: "ln « défait » l’exponentielle : $\\ln(e^p) = p\\ln e = p$, pas $e^p$.", erreur: "ln(eᵖ) = eᵖ" },
            ],
          },
        ],
        correction: [
          { tex: `\\ln\\frac{1}{${b}^{${r}}} = -\\ln\\left(${b}^{${r}}\\right) = -${r}\\ln ${b}`, r: "La règle de l’inverse, puis l’exposant descend." },
          { tex: `\\ln\\sqrt{${b}} = \\frac{1}{2}\\ln ${b}`, r: "$\\ln a = \\ln(\\sqrt a \\times \\sqrt a) = 2\\ln\\sqrt a$." },
          { tex: `A = \\left(-${r} + \\frac{1}{2}\\right)\\ln ${b} = -\\frac{${2 * r - 1}}{2}\\ln ${b}`, r: `Donc $k = -\\frac{${2 * r - 1}}{2} = ${frTex(k, 1)}$.` },
          { tex: `B = ${p}\\ln e - \\frac{1}{2}\\ln e = ${p} - \\frac{1}{2} = \\frac{${2 * p - 1}}{2}`, r: "$\\ln e = 1$." },
        ],
      };
    },
  },

  /* 8 — inéquation */
  {
    id: "ln-inequation",
    titre: "Une inéquation logarithmique",
    niveau: 2,
    capacites: ["maths-sexp 1.2.17", "maths-sm 1.3.10"],
    erreurs: ["oublier l’ensemble de définition", "changer le sens de l’inégalité sans raison"],
    gen(h) {
      const a = h.int(2, 4),
        b = h.int(1, 6),
        c = h.int(b + a + 1, b + 4 * a);
      // ln(a x − b) < ln c  ⇔  b/a < x < (c + b)/a
      const lo = fracTex(b, a),
        hi = fracTex(c + b, a);
      const opts = h.melange([
        { t: `$${itv(lo, hi)}$`, ok: true },
        { t: `$${itv("-\\infty", hi)}$`, fb: `Il faut d’abord que $${a}x - ${b} > 0$, soit $x > ${lo}$ : la solution commence là.`, erreur: "oublier l’ensemble de définition" },
        { t: `$${itv(hi, "+\\infty")}$`, fb: "ln est strictement CROISSANTE : elle conserve le sens de l’inégalité. Plus petit dedans, plus petit dehors.", erreur: "changer le sens de l’inégalité sans raison" },
      ]);
      return {
        enonce: `<p>On veut résoudre dans $\\mathbb{R}$ l’inéquation $\\ln(${a}x - ${b}) < \\ln ${c}$.</p>`,
        questions: [
          { type: "qcm", q: "Quel est l’ensemble des solutions ?", options: opts },
          {
            type: "nombre",
            q: "Quelle est la plus grande valeur entière de $x$ qui est solution ?",
            reponse: Math.ceil((c + b) / a) - 1,
            tol: { abs: 0.001 },
            indice: `Les solutions sont strictement plus petites que $${hi} \\approx ${frTex((c + b) / a, 2)}$.`,
          },
        ],
        correction: [
          { tex: `${a}x - ${b} > 0 \\iff x > ${lo}`, r: "L’inéquation n’a de sens que si ce qui est dans le logarithme est strictement positif." },
          { tex: `\\ln(${a}x-${b}) < \\ln ${c} \\iff ${a}x - ${b} < ${c}`, r: "ln est strictement croissante sur $]0,+\\infty[$ : $\\ln a < \\ln b \\iff a < b$." },
          { tex: `\\iff x < ${hi}`, r: "On résout l’inéquation du premier degré." },
          { tex: `S = ${itv(lo, hi)}`, r: "On garde les $x$ qui vérifient les deux conditions." },
        ],
      };
    },
  },

  /* 9 — l'équation du bac : ln(x − a) + ln(x − b) = ln c */
  {
    id: "ln-equation",
    titre: "Une équation au format bac : les conditions d’abord",
    niveau: 3,
    capacites: ["maths-sexp 1.2.17", "maths-sm 1.3.10"],
    erreurs: ["garder une racine hors de l’ensemble de définition", "ln a + ln b = ln(a + b)", "ne garder qu’une des deux conditions"],
    gen(h) {
      const a = h.int(-3, 2),
        d = h.int(1, 3),
        b = a + d,
        t = h.int(1, 3);
      const s = b + t,
        r = a - t,
        c = (s - a) * (s - b);
      // (x − a)(x − b) = c  ⇔  x² − (a + b)x + ab − c = 0, de racines s (> b) et r (< a)
      const S = a + b,
        P = a * b - c;
      const poly = `x^2 ${S === 0 ? "" : S > 0 ? `- ${coef(S)}x` : `+ ${coef(-S)}x`} ${P === 0 ? "" : sg(P)} = 0`;
      const dom = h.melange(
        [
          { t: `$${itv(b, "+\\infty")}$`, ok: true },
          { t: `$${itv(a, "+\\infty")}$`, fb: `Avec seulement $x > ${a}$, le nombre $${xm(b)}$ peut être négatif. Il faut les deux conditions à la fois : $x > ${b}$.`, erreur: "ne garder qu’une des deux conditions" },
          { t: `$${itv(a, b)}$`, fb: `Sur cet intervalle, $${xm(b)} < 0$ : $\\ln(${xm(b)})$ n’existe pas. Les deux conditions donnent $x > ${b}$.`, erreur: "ne garder qu’une des deux conditions" },
          b !== 0
            ? { t: "$]0,+\\infty[$", fb: `C’est l’ensemble de définition de $\\ln x$. Ici, ce sont $${xm(a)}$ et $${xm(b)}$ qui doivent être strictement positifs.`, erreur: "recopier ]0,+∞[ sans calcul" }
            : null,
        ].filter(Boolean),
      );
      const regroupe = h.melange([
        { t: `$${par(a)}${par(b)} = ${c}$`, ok: true },
        { t: `$${par(a)} + ${par(b)} = ${c}$`, fb: "La somme des logarithmes est le logarithme du PRODUIT : $\\ln u + \\ln v = \\ln(uv)$.", erreur: "ln a + ln b = ln(a + b)" },
        { t: `$${par(a)}${par(b)} = \\ln ${c}$`, fb: `$\\ln u = \\ln ${c} \\iff u = ${c}$ : on enlève le ln des deux côtés, pas d’un seul.`, erreur: "garder un ln d’un seul côté" },
      ]);
      const pieges = [{ v: r, fb: `$${r}$ est bien racine de $${poly.replace(" = 0", "")}$, mais elle ne vérifie pas $x > ${b}$ : $\\ln(${r - a})$ n’existe pas. On la rejette.`, erreur: "garder une racine hors de l’ensemble de définition" }];
      const somme = (c + a + b) / 2;
      if (Math.abs(somme - s) > 0.01) pieges.push({ v: somme, fb: "On n’a pas le droit d’écrire $\\ln u + \\ln v = \\ln(u + v)$ : la somme des logarithmes est le logarithme du produit.", erreur: "ln a + ln b = ln(a + b)" });
      return {
        enonce: `<p>On veut résoudre dans $\\mathbb{R}$ l’équation $(E) : \\ln(${xm(a)}) + \\ln(${xm(b)}) = \\ln ${c}$.</p>`,
        questions: [
          { type: "qcm", q: "Sur quel ensemble l’équation a-t-elle un sens ?", options: dom },
          { type: "qcm", q: "Sur cet ensemble, $(E)$ équivaut à :", options: regroupe },
          {
            type: "nombre",
            q: "Donne la solution de $(E)$.",
            reponse: s,
            tol: { abs: 0.001 },
            indice: `Développe : $${poly}$. Une équation du second degré : garde seulement la racine qui vérifie $x > ${b}$.`,
            pieges,
          },
        ],
        correction: [
          { tex: `${xm(a)} > 0 \\ \\text{et}\\ ${xm(b)} > 0 \\iff x > ${b}`, r: "Les conditions d’existence : ce qui est dans chaque logarithme doit être strictement positif." },
          { tex: `\\ln(${xm(a)}) + \\ln(${xm(b)}) = \\ln\\big(${par(a)}${par(b)}\\big)`, r: `Pour $x > ${b}$, les deux nombres sont positifs : la règle du produit s’applique.` },
          { tex: `${par(a)}${par(b)} = ${c} \\iff ${poly}`, r: "$\\ln u = \\ln v \\iff u = v$ ; on développe." },
          { tex: `\\Delta = ${S * S - 4 * P} = ${s - r}^2, \\quad x = ${s} \\ \\text{ou}\\ x = ${r}`, r: "Le discriminant est un carré parfait : deux racines entières." },
          { tex: `S = \\{${s}\\}`, r: `$${r}$ ne vérifie pas $x > ${b}$ : on la rejette.` },
        ],
      };
    },
  },

  /* ============== séance 2 : « ln comme fonction » (leçon à venir) ============== */

  /* 10 — logarithme décimal */
  {
    id: "log-decimal",
    titre: "Le logarithme décimal",
    niveau: 1,
    seance: 2,
    filieres: ["PC", "SVT"],
    capacites: ["maths-sexp 1.2.18"],
    erreurs: ["log(10^x) = 10x", "confondre log et ln"],
    gen(h) {
      const k = h.int(2, 6),
        m = h.pick([2, 3, 5]);
      const A = m * 10 ** k;
      const x = Math.log10(A);
      return {
        enonce: `<p>Le logarithme décimal est $\\log x = \\dfrac{\\ln x}{\\ln 10}$ ; il vérifie $\\log(10^n) = n$. On veut résoudre $10^x = ${m} \\times 10^{${k}}$.</p>`,
        questions: [
          {
            type: "nombre",
            q: "Donne la solution $x$ à $0{,}01$ près.",
            reponse: x,
            tol: { abs: 0.006 },
            indice: `Applique $\\log$ aux deux membres : $x = \\log(${m} \\times 10^{${k}}) = \\log ${m} + ${k}$.`,
            pieges: [
              { v: Math.log(A), fb: "C’est $\\ln$ du nombre, pas $\\log$ : avec la base 10, on divise par $\\ln 10$.", erreur: "confondre log et ln" },
              { v: k, fb: `Il manque $\\log ${m}$ : $\\log(${m} \\times 10^{${k}}) = \\log ${m} + \\log 10^{${k}}$.`, erreur: "log(10^x) = 10x" },
            ],
          },
        ],
        correction: [
          { tex: `10^x = ${m} \\times 10^{${k}} \\iff x = \\log(${m} \\times 10^{${k}})`, r: "$\\log$ est la fonction réciproque de $x \\mapsto 10^x$." },
          { tex: `x = \\log ${m} + ${k}`, r: "Le logarithme d’un produit est la somme des logarithmes, et $\\log 10^{" + k + "} = " + k + "$." },
          { tex: `x \\approx ${frTex(x, 2)}`, r: `$\\log ${m} = \\frac{\\ln ${m}}{\\ln 10} \\approx ${frTex(Math.log10(m), 3)}$.` },
        ],
      };
    },
  },

  /* 11 — les limites de référence */
  {
    id: "ln-limites",
    titre: "Les limites de référence",
    niveau: 2,
    seance: 2,
    capacites: ["maths-sexp 1.2.19", "maths-sm 1.3.11"],
    erreurs: ["croissances comparées à l’envers", "forme indéterminée prise pour 0"],
    gen(h) {
      const n = h.int(1, 3);
      const pool = [
        { lim: `\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x^{${n}}}`, ok: "0", why: "En $+\\infty$, toute puissance de $x$ l’emporte sur $\\ln x$ (croissance comparée).", piege: "+\\infty", pfb: "ln tend bien vers $+\\infty$, mais beaucoup plus lentement que $x^" + n + "$ : le quotient tend vers 0.", perr: "croissances comparées à l’envers" },
        { lim: `\\lim_{x \\to 0^+} x^{${n}}\\ln x`, ok: "0", why: "En $0^+$, la puissance de $x$ l’emporte sur $\\ln x$ : le produit tend vers 0.", piege: "-\\infty", pfb: "$\\ln x \\to -\\infty$, mais $x^" + n + " \\to 0$ plus fort : c’est une croissance comparée, le produit tend vers 0.", perr: "croissances comparées à l’envers" },
        { lim: `\\lim_{x \\to +\\infty} (\\ln x - ${coef(n)}x)`, ok: "-\\infty", why: `On factorise : $x\\left(\\frac{\\ln x}{x} - ${n}\\right)$ ; la parenthèse tend vers $-${n}$, donc le tout vers $-\\infty$.`, piege: "+\\infty", pfb: "C’est une forme « $\\infty - \\infty$ » : on factorise par $x$ et on regarde qui l’emporte. Ici c’est $-" + coef(n) + "x$.", perr: "croissances comparées à l’envers" },
        { lim: `\\lim_{x \\to 1} \\dfrac{\\ln x}{x - 1}`, ok: "1", why: "C’est le taux d’accroissement de ln en 1 : sa limite est $\\ln'(1) = \\frac{1}{1} = 1$.", piege: "0", pfb: "Forme « 0/0 » : ce n’est pas forcément 0. C’est le taux d’accroissement de ln en 1, qui tend vers $\\ln'(1) = 1$.", perr: "forme indéterminée prise pour 0" },
      ];
      const L = h.pick(pool);
      const vals = ["0", "1", "+\\infty", "-\\infty"];
      const opts = h.melange(
        vals.map((v) =>
          v === L.ok
            ? { t: `$${v}$`, ok: true }
            : { t: `$${v}$`, fb: v === L.piege ? L.pfb : `Non. ${L.why}`, erreur: v === L.piege ? L.perr : "limite de référence mal appliquée" },
        ),
      );
      return {
        enonce: `<p>Calcule la limite suivante.</p><p>$$${L.lim}$$</p>`,
        questions: [{ type: "qcm", q: "Cette limite vaut :", options: opts }],
        correction: [{ tex: `${L.lim} = ${L.ok}`, r: L.why }],
      };
    },
  },

  /* 12 — dérivée de ln(u) */
  {
    id: "ln-derivee",
    titre: "La dérivée de ln(u)",
    niveau: 2,
    seance: 2,
    capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16"],
    erreurs: ["(ln u)′ = 1/u", "(ln u)′ = ln(u′)"],
    gen(h) {
      const a = h.int(1, 3),
        b = h.int(1, 5),
        x0 = h.int(1, 3);
      const u = `${coef(a)}x^2 + ${b}`;
      const val = (2 * a * x0) / (a * x0 * x0 + b);
      const opts = h.melange([
        { t: `$f'(x) = \\dfrac{${2 * a}x}{${u}}$`, ok: true },
        { t: `$f'(x) = \\dfrac{1}{${u}}$`, fb: "Il manque la dérivée de l’intérieur : $(\\ln u)' = \\dfrac{u'}{u}$, et ici $u'(x) = " + 2 * a + "x$.", erreur: "(ln u)′ = 1/u" },
        { t: `$f'(x) = \\ln(${2 * a}x)$`, fb: "On ne dérive pas sous le logarithme : la dérivée de $\\ln u$ est $\\dfrac{u'}{u}$, une fraction.", erreur: "(ln u)′ = ln(u′)" },
      ]);
      return {
        enonce: `<p>Soit $f$ la fonction définie sur $\\mathbb{R}$ par $f(x) = \\ln(${u})$.</p>`,
        questions: [
          { type: "qcm", q: "La dérivée de $f$ est :", options: opts },
          {
            type: "nombre",
            q: `Calcule $f'(${x0})$ (valeur exacte ou approchée à $0{,}01$ près).`,
            reponse: val,
            tol: { abs: 0.006 },
            indice: `Remplace $x$ par $${x0}$ dans $\\dfrac{${2 * a}x}{${u}}$.`,
            pieges: [{ v: 1 / (a * x0 * x0 + b), fb: "Tu as oublié le numérateur $u'(x)$.", erreur: "(ln u)′ = 1/u" }],
          },
        ],
        correction: [
          { tex: `u(x) = ${u} > 0 \\ \\text{pour tout}\\ x`, r: "$f$ est bien définie et dérivable sur $\\mathbb{R}$." },
          { tex: `u'(x) = ${2 * a}x`, r: "On dérive l’intérieur." },
          { tex: `f'(x) = \\frac{u'(x)}{u(x)} = \\frac{${2 * a}x}{${u}}`, r: "$(\\ln u)' = \\dfrac{u'}{u}$." },
          { tex: `f'(${x0}) = \\frac{${2 * a * x0}}{${a * x0 * x0 + b}} \\approx ${frTex(val, 2)}`, r: "On remplace." },
        ],
      };
    },
  },

  /* 13 — tangente */
  {
    id: "ln-tangente",
    titre: "La tangente à la courbe de ln",
    niveau: 2,
    seance: 2,
    capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16"],
    erreurs: ["prendre ln a pour pente", "oublier l’ordonnée ln a"],
    gen(h) {
      const a = h.pick([2, 3, 4, 5]);
      const ordo = Math.log(a) - 1;
      const opts = h.melange([
        { t: `$y = \\dfrac{1}{${a}}x + \\ln ${a} - 1$`, ok: true },
        { t: `$y = \\ln ${a}\\,(x - ${a})$`, fb: `La pente est le nombre dérivé $\\ln'(${a}) = \\frac{1}{${a}}$, pas $\\ln ${a}$.`, erreur: "prendre ln a pour pente" },
        { t: `$y = \\dfrac{1}{${a}}(x - ${a})$`, fb: `La tangente passe par le point de la courbe d’abscisse $${a}$, d’ordonnée $\\ln ${a}$ : il manque $+\\ln ${a}$.`, erreur: "oublier l’ordonnée ln a" },
      ]);
      return {
        enonce: `<p>On note $\\mathcal{C}$ la courbe de $x \\mapsto \\ln x$ et $T$ sa tangente au point d’abscisse $${a}$.</p>`,
        questions: [
          { type: "qcm", q: "Une équation de $T$ est :", options: opts },
          {
            type: "nombre",
            q: "Quelle est l’ordonnée à l’origine de $T$ (à $0{,}01$ près) ?",
            reponse: ordo,
            tol: { abs: 0.015 },
            indice: `Développe $y = \\frac{1}{${a}}(x - ${a}) + \\ln ${a}$ et lis le terme constant.`,
            pieges: [{ v: Math.log(a), fb: "C’est l’ordonnée du point de contact, pas celle de l’origine : développe l’équation.", erreur: "oublier l’ordonnée ln a" }],
          },
        ],
        correction: [
          { tex: `y = f'(${a})(x - ${a}) + f(${a})`, r: "L’équation de la tangente au point d’abscisse $a$." },
          { tex: `f(${a}) = \\ln ${a}, \\quad f'(${a}) = \\frac{1}{${a}}`, r: "$\\ln'(x) = \\frac{1}{x}$." },
          { tex: `y = \\frac{1}{${a}}(x - ${a}) + \\ln ${a} = \\frac{1}{${a}}x + \\ln ${a} - 1`, r: `On développe ; l’ordonnée à l’origine vaut $\\ln ${a} - 1 \\approx ${frTex(ordo, 2)}$.` },
        ],
      };
    },
  },

  /* 14 — étude de fonction, niveau bac */
  {
    id: "ln-etude",
    titre: "Une étude de fonction au format bac",
    niveau: 3,
    seance: 2,
    capacites: ["maths-sexp 1.2.22", "maths-sexp 1.2.19", "maths-sexp 1.2.7"],
    erreurs: ["(ln x)′ = ln x", "croissances comparées à l’envers", "conclure sur le signe sans le minimum"],
    gen(h) {
      const a = h.pick([1, 2, 3]);
      const xm0 = 1 / a,
        ym = 1 + Math.log(a);
      const ax = kx(a);
      const inv = a === 1 ? "1" : `\\tfrac{1}{${a}}`;
      const qLim = h.melange([
        { t: "$+\\infty$", ok: true },
        { t: "$-\\infty$", fb: "$-\\ln x \\to +\\infty$ quand $x \\to 0^+$ (car $\\ln x \\to -\\infty$), et $" + ax + " \\to 0$ : la somme tend vers $+\\infty$.", erreur: "signe de −ln x en 0⁺" },
        { t: "$0$", fb: "Ce n’est pas une forme indéterminée : $" + ax + " \\to 0$ et $-\\ln x \\to +\\infty$.", erreur: "forme indéterminée prise pour 0" },
      ]);
      const qDer = h.melange([
        { t: `$f'(x) = \\dfrac{${ax} - 1}{x}$`, ok: true },
        { t: `$f'(x) = ${a} - \\ln x$`, fb: "La dérivée de $\\ln x$ est $\\frac{1}{x}$, pas $\\ln x$.", erreur: "(ln x)′ = ln x" },
        { t: `$f'(x) = ${ax} - \\dfrac{1}{x}$`, fb: `La dérivée de $${ax}$ est $${a}$ (une constante), pas $${ax}$.`, erreur: "(ax)′ = ax" },
      ]);
      const qSigne = h.melange([
        { t: "$f(x) > 0$ pour tout $x > 0$", ok: true },
        { t: "$f$ change de signe sur $]0,+\\infty[$", fb: `Le minimum de $f$ vaut $1 + \\ln ${a}${a === 1 ? " = 1" : ""} > 0$ : $f$ est toujours au-dessus de ce minimum.`, erreur: "conclure sur le signe sans le minimum" },
        { t: "On ne peut pas savoir sans tracer la courbe", fb: "Le tableau de variations suffit : le minimum est strictement positif, donc $f$ aussi.", erreur: "conclure sur le signe sans le minimum" },
      ]);
      return {
        enonce: `<p>Soit $f$ la fonction définie sur $]0,+\\infty[$ par $f(x) = ${ax} - \\ln x$.</p>`,
        questions: [
          { type: "qcm", q: "$\\displaystyle\\lim_{x \\to 0^+} f(x)$ vaut :", options: qLim },
          { type: "qcm", q: "Pour tout $x > 0$ :", options: qDer },
          {
            type: "nombre",
            q: "En quelle valeur de $x$ la fonction $f$ atteint-elle son minimum ?",
            reponse: xm0,
            tol: { abs: 0.005 },
            indice: `$f'(x)$ a le signe de $${ax} - 1$ : elle s’annule et change de signe en $x = ${fracTex(1, a)}$.`,
          },
          {
            type: "nombre",
            q: "Quelle est la valeur de ce minimum (à $0{,}01$ près) ?",
            reponse: ym,
            tol: { abs: 0.015 },
            indice: a === 1 ? "Calcule $f(1) = 1 - \\ln 1$." : `Calcule $f\\left(${inv}\\right) = 1 - \\ln ${inv}$ et utilise $\\ln\\frac{1}{a} = -\\ln a$.`,
            pieges: a === 1 ? [] : [{ v: 1 - Math.log(a), fb: "Attention au signe : $-\\ln\\frac{1}{a} = +\\ln a$.", erreur: "ln(1/a) = ln a" }],
          },
          { type: "qcm", q: "On en déduit :", options: qSigne },
        ],
        correction: [
          { tex: `\\lim_{x\\to 0^+} ${ax} = 0, \\quad \\lim_{x\\to 0^+} (-\\ln x) = +\\infty`, r: "Donc $\\lim_{x\\to 0^+} f(x) = +\\infty$." },
          { tex: `f'(x) = ${a} - \\frac{1}{x} = \\frac{${ax} - 1}{x}`, r: "On dérive terme à terme, puis on réduit au même dénominateur." },
          { tex: `f'(x) < 0 \\ \\text{sur}\\ ${itv(0, inv)}, \\qquad f'(x) > 0 \\ \\text{sur}\\ ${itv(inv, "+\\infty")}`, r: "Le dénominateur $x$ est positif : $f'$ a le signe de $" + ax + " - 1$." },
          { tex: a === 1 ? "f(1) = 1 - \\ln 1 = 1" : `f\\left(${inv}\\right) = 1 - \\ln ${inv} = 1 + \\ln ${a} \\approx ${frTex(ym, 2)}`, r: "$f$ décroît puis croît : ce minimum est la plus petite valeur de $f$." },
          { tex: `f(x) \\geq 1 + \\ln ${a} > 0`, r: "Le minimum est strictement positif, donc $f$ l’est partout : la courbe reste au-dessus de l’axe." },
        ],
      };
    },
  },
];

export const _fr = fr;
