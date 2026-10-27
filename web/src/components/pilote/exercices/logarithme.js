// @ts-nocheck
/**
 * Les exercices du pilote « Fonction logarithme népérien » (V3).
 * Format : voir modele.js. Chaque réponse est calculée ici ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages.
 */
import { fr, frTex } from "./nombre.js";

const LN = { 2: Math.log(2), 3: Math.log(3), 5: Math.log(5), 7: Math.log(7) };
const donneesLn = (bases) =>
  `On donne : ${bases.map((b) => `$\\ln ${b} \\approx ${frTex(LN[b], 3)}$`).join(", ")}.`;
const puiss = (b, e) => (e === 1 ? `${b}` : `${b}^{${e}}`);
const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
/** n/d en TeX, simplifiée (entier si possible). */
const fracTex = (n, d) => {
  const g = pgcd(n, d), N = n / g, D = d / g;
  return D === 1 ? `${N}` : `\\frac{${N}}{${D}}`;
};

export const EXERCICES = [
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
      const opts = h.melange([
        { t: `$${p}\\ln ${a} + ${q === 1 ? "" : q}\\ln ${b}$`, ok: true },
        {
          t: `$${p}\\ln ${a} \\times ${q === 1 ? "" : q}\\ln ${b}$`,
          fb: `ln change le produit en somme, jamais en produit : $\\ln(${puiss(a, p)} \\times ${puiss(b, q)}) = \\ln ${puiss(a, p)} + \\ln ${puiss(b, q)}$.`,
          erreur: "ln(ab) = ln a × ln b",
        },
        {
          t: `$(\\ln ${a})^{${p}} + ${q === 1 ? "" : `(\\ln ${b})^{${q}}`}${q === 1 ? `\\ln ${b}` : ""}$`,
          fb: `L’exposant descend devant le logarithme : $\\ln(${puiss(a, p)}) = ${p}\\ln ${a}$, pas $(\\ln ${a})^{${p}}$.`,
          erreur: "ln(aⁿ) = (ln a)ⁿ",
        },
        {
          t: `$${p}\\ln ${a} - ${q === 1 ? "" : q}\\ln ${b}$`,
          fb: `Le signe moins vient d’un quotient. Ici ${N} est un produit : $${N} = ${puiss(a, p)} \\times ${puiss(b, q)}$.`,
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
          { tex: `\\ln ${N} = ${p}\\ln ${a} + ${q === 1 ? "" : q}\\ln ${b}`, r: "L’exposant descend : $\\ln(a^n) = n\\ln a$." },
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
    erreurs: ["ln(a/b) = ln a / ln b", "ln(1/a) = 1/ln a"],
    gen(h) {
      const [a, b] = h.melange([2, 3, 5, 7]).slice(0, 2);
      const p = h.int(1, 3);
      const v = LN[a] - p * LN[b];
      const opts = h.melange([
        { t: `$\\ln ${a} - ${p === 1 ? "" : p}\\ln ${b}$`, ok: true },
        {
          t: `$\\dfrac{\\ln ${a}}{${p === 1 ? "" : p}\\ln ${b}}$`,
          fb: "ln change le quotient en différence, pas en quotient : $\\ln\\frac{a}{b} = \\ln a - \\ln b$.",
          erreur: "ln(a/b) = ln a / ln b",
        },
        {
          t: `$\\ln ${a} + ${p === 1 ? "" : p}\\ln ${b}$`,
          fb: `Diviser par $${puiss(b, p)}$, c’est multiplier par son inverse, dont le logarithme est $-${p === 1 ? "" : p}\\ln ${b}$ : on soustrait.`,
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
          { tex: `\\ln\\frac{${a}}{${puiss(b, p)}} = \\ln ${a} - ${p === 1 ? "" : p}\\ln ${b}`, r: "L’exposant descend." },
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

  /* 4 — équation : le domaine décide */
  {
    id: "ln-equation",
    titre: "Une équation logarithmique : le domaine décide",
    niveau: 2,
    capacites: ["maths-sexp 1.2.17", "maths-sm 1.3.10"],
    erreurs: ["oublier l’ensemble de définition", "ln a + ln b = ln(a + b)"],
    gen(h) {
      const p = h.int(3, 7),
        q = h.int(1, p - 1);
      const a = p - q,
        b = p * q;
      const dom = h.melange([
        { t: `$]${a} ; +\\infty[$`, ok: true },
        { t: `$]0 ; +\\infty[$`, fb: `Il faut aussi $x - ${a} > 0$, donc $x > ${a}$ : les deux conditions ensemble donnent $x > ${a}$.`, erreur: "oublier l’ensemble de définition" },
        { t: `$\\mathbb{R}$`, fb: "ln n’est défini que pour un nombre strictement positif : chaque logarithme impose sa condition.", erreur: "oublier l’ensemble de définition" },
      ]);
      return {
        enonce: `<p>On veut résoudre dans $\\mathbb{R}$ l’équation $(E) : \\ln x + \\ln(x - ${a}) = \\ln ${b}$.</p>`,
        questions: [
          { type: "qcm", q: "Sur quel ensemble l’équation a-t-elle un sens ?", options: dom },
          {
            type: "nombre",
            q: "Donne la solution de $(E)$.",
            reponse: p,
            tol: { abs: 0.001 },
            indice: `Sur cet ensemble, $(E)$ équivaut à $x(x - ${a}) = ${b}$ : une équation du second degré. Garde seulement la racine qui est dans l’ensemble.`,
            pieges: [
              { v: -q, fb: `$${-q}$ est bien racine de $x^2 - ${a}x - ${b} = 0$, mais $\\ln(${-q})$ n’existe pas : elle n’est pas dans l’ensemble de définition.`, erreur: "oublier l’ensemble de définition" },
              { v: (b + a) / 2, fb: `On n’a pas le droit d’écrire $\\ln x + \\ln(x - ${a}) = \\ln(2x - ${a})$ : la somme des logarithmes est le logarithme du produit $x(x-${a})$.`, erreur: "ln a + ln b = ln(a + b)" },
            ],
          },
        ],
        correction: [
          { tex: `x > 0 \\ \\text{et}\\ x - ${a} > 0 \\iff x > ${a}`, r: "Chaque logarithme impose que ce qui est dedans soit strictement positif." },
          { tex: `\\ln x + \\ln(x-${a}) = \\ln\\big(x(x-${a})\\big)`, r: "La somme des logarithmes est le logarithme du produit (valable pour $x > " + a + "$)." },
          { tex: `\\ln\\big(x(x-${a})\\big) = \\ln ${b} \\iff x^2 - ${a}x - ${b} = 0`, r: "ln est strictement croissante : deux logarithmes égaux ont des arguments égaux." },
          { tex: `\\Delta = ${a * a + 4 * b} = ${p + q}^2, \\quad x = ${p} \\ \\text{ou}\\ x = ${-q}`, r: "Le discriminant est un carré parfait : deux racines entières." },
          { tex: `S = \\{${p}\\}`, r: `$${-q}$ n’est pas dans $]${a} ; +\\infty[$ : on la rejette.` },
        ],
      };
    },
  },

  /* 5 — inéquation */
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
        { t: `$\\left]${lo} ; ${hi}\\right[$`, ok: true },
        { t: `$\\left]-\\infty ; ${hi}\\right[$`, fb: `Il faut d’abord que $${a}x - ${b} > 0$, soit $x > ${lo}$ : la solution commence là.`, erreur: "oublier l’ensemble de définition" },
        { t: `$\\left]${hi} ; +\\infty\\right[$`, fb: "ln est strictement CROISSANTE : elle conserve le sens de l’inégalité. Plus petit dedans, plus petit dehors.", erreur: "changer le sens de l’inégalité sans raison" },
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
          { tex: `\\ln(${a}x-${b}) < \\ln ${c} \\iff ${a}x - ${b} < ${c}`, r: "ln est strictement croissante sur $]0 ; +\\infty[$ : elle conserve l’ordre." },
          { tex: `\\iff x < ${hi}`, r: "On résout l’inéquation du premier degré." },
          { tex: `S = \\left]${lo} ; ${hi}\\right[`, r: "On garde les $x$ qui vérifient les deux conditions." },
        ],
      };
    },
  },

  /* 6 — les limites de référence */
  {
    id: "ln-limites",
    titre: "Les limites de référence",
    niveau: 2,
    capacites: ["maths-sexp 1.2.19", "maths-sm 1.3.11"],
    erreurs: ["« ln l’emporte sur x »", "0 × ∞ vaut toujours 0"],
    gen(h) {
      const n = h.int(1, 3);
      const pool = [
        { lim: `\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x^{${n}}}`, ok: "0", why: "En $+\\infty$, toute puissance de $x$ l’emporte sur $\\ln x$ (croissance comparée).", piege: "+\\infty", pfb: "ln tend bien vers $+\\infty$, mais beaucoup plus lentement que $x^" + n + "$ : le quotient tend vers 0.", perr: "« ln l’emporte sur x »" },
        { lim: `\\lim_{x \\to 0^+} x^{${n}}\\ln x`, ok: "0", why: "En $0^+$, la puissance de $x$ l’emporte sur $\\ln x$ : le produit tend vers 0.", piege: "-\\infty", pfb: "$\\ln x \\to -\\infty$, mais $x^" + n + " \\to 0$ plus fort : c’est une croissance comparée, le produit tend vers 0.", perr: "« ln l’emporte sur x »" },
        { lim: `\\lim_{x \\to +\\infty} (\\ln x - ${n}x)`, ok: "-\\infty", why: `On factorise : $x\\left(\\frac{\\ln x}{x} - ${n}\\right)$ ; la parenthèse tend vers $-${n}$, donc le tout vers $-\\infty$.`, piege: "+\\infty", pfb: "C’est une forme « $\\infty - \\infty$ » : on factorise par $x$ et on regarde qui l’emporte. Ici c’est $-" + n + "x$.", perr: "« ln l’emporte sur x »" },
        { lim: `\\lim_{x \\to 1} \\dfrac{\\ln x}{x - 1}`, ok: "1", why: "C’est le taux d’accroissement de ln en 1 : sa limite est $\\ln'(1) = \\frac{1}{1} = 1$.", piege: "0", pfb: "Forme « 0/0 » : ce n’est pas forcément 0. C’est le taux d’accroissement de ln en 1, qui tend vers $\\ln'(1) = 1$.", perr: "0 × ∞ vaut toujours 0" },
      ];
      const L = h.pick(pool);
      const vals = ["0", "1", "+\\infty", "-\\infty"];
      const opts = h.melange(
        vals.map((v) =>
          v === L.ok
            ? { t: `$${v}$`, ok: true }
            : { t: `$${v}$`, fb: v === L.piege ? L.pfb : `Non. ${L.why}`, erreur: v === L.piege ? L.perr : undefined },
        ),
      );
      return {
        enonce: `<p>Calcule la limite suivante.</p><p>$$${L.lim}$$</p>`,
        questions: [{ type: "qcm", q: "Cette limite vaut :", options: opts }],
        correction: [{ tex: `${L.lim} = ${L.ok}`, r: L.why }],
      };
    },
  },

  /* 7 — dérivée de ln(u) */
  {
    id: "ln-derivee",
    titre: "La dérivée de ln(u)",
    niveau: 2,
    capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16"],
    erreurs: ["(ln u)′ = 1/u", "(ln u)′ = ln(u′)"],
    gen(h) {
      const a = h.int(1, 3),
        b = h.int(1, 5),
        x0 = h.int(1, 3);
      const u = `${a === 1 ? "" : a}x^2 + ${b}`;
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

  /* 8 — tangente */
  {
    id: "ln-tangente",
    titre: "La tangente à la courbe de ln",
    niveau: 2,
    capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16"],
    erreurs: ["prendre ln a pour pente", "oublier l’ordonnée ln a"],
    gen(h) {
      const a = h.pick([2, 3, 4, 5]);
      const pente = 1 / a,
        ordo = Math.log(a) - 1;
      const opts = h.melange([
        { t: `$y = \\dfrac{1}{${a}}x + \\ln ${a} - 1$`, ok: true },
        { t: `$y = \\ln ${a}\\,(x - ${a})$`, fb: `La pente est le nombre dérivé $\\ln'(${a}) = \\frac{1}{${a}}$, pas $\\ln ${a}$.`, erreur: "prendre ln a pour pente" },
        { t: `$y = \\dfrac{1}{${a}}(x - ${a})$`, fb: `La tangente passe par le point $(${a} ; \\ln ${a})$ : il manque $+\\ln ${a}$.`, erreur: "oublier l’ordonnée ln a" },
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

  /* 9 — logarithme décimal */
  {
    id: "log-decimal",
    titre: "Le logarithme décimal",
    niveau: 1,
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

  /* 10 — étude de fonction, niveau bac */
  {
    id: "ln-etude",
    titre: "Une étude de fonction au format bac",
    niveau: 3,
    capacites: ["maths-sexp 1.2.22", "maths-sexp 1.2.19", "maths-sexp 1.2.7"],
    erreurs: ["(ln x)′ = ln x", "« ln l’emporte sur x »", "conclure sur le signe sans le minimum"],
    gen(h) {
      const a = h.pick([1, 2, 3]);
      const xm = 1 / a,
        ym = 1 + Math.log(a);
      const ax = a === 1 ? "x" : `${a}x`;
      const qLim = h.melange([
        { t: "$+\\infty$", ok: true },
        { t: "$-\\infty$", fb: "$-\\ln x \\to +\\infty$ quand $x \\to 0^+$ (car $\\ln x \\to -\\infty$), et $" + ax + " \\to 0$ : la somme tend vers $+\\infty$.", erreur: "signe de −ln x en 0⁺" },
        { t: "$0$", fb: "Ce n’est pas une forme indéterminée : $" + ax + " \\to 0$ et $-\\ln x \\to +\\infty$.", erreur: "0 × ∞ vaut toujours 0" },
      ]);
      const qDer = h.melange([
        { t: `$f'(x) = \\dfrac{${ax} - 1}{x}$`, ok: true },
        { t: `$f'(x) = ${a} - \\ln x$`, fb: "La dérivée de $\\ln x$ est $\\frac{1}{x}$, pas $\\ln x$.", erreur: "(ln x)′ = ln x" },
        { t: `$f'(x) = ${ax} - \\dfrac{1}{x}$`, fb: `La dérivée de $${ax}$ est $${a}$ (une constante), pas $${ax}$.` },
      ]);
      const qSigne = h.melange([
        { t: "$f(x) > 0$ pour tout $x > 0$", ok: true },
        { t: "$f$ change de signe sur $]0 ; +\\infty[$", fb: `Le minimum de $f$ vaut $1 + \\ln ${a}${a === 1 ? " = 1" : ""} > 0$ : $f$ est toujours au-dessus de ce minimum.`, erreur: "conclure sur le signe sans le minimum" },
        { t: "On ne peut pas savoir sans tracer la courbe", fb: "Le tableau de variations suffit : le minimum est strictement positif, donc $f$ aussi.", erreur: "conclure sur le signe sans le minimum" },
      ]);
      return {
        enonce: `<p>Soit $f$ la fonction définie sur $]0 ; +\\infty[$ par $f(x) = ${ax} - \\ln x$.</p>`,
        questions: [
          { type: "qcm", q: "$\\displaystyle\\lim_{x \\to 0^+} f(x)$ vaut :", options: qLim },
          { type: "qcm", q: "Pour tout $x > 0$ :", options: qDer },
          {
            type: "nombre",
            q: "En quelle valeur de $x$ la fonction $f$ atteint-elle son minimum ?",
            reponse: xm,
            tol: { abs: 0.005 },
            indice: `$f'(x)$ a le signe de $${ax} - 1$ : elle s’annule et change de signe en $x = ${fracTex(1, a)}$.`,
          },
          {
            type: "nombre",
            q: "Quelle est la valeur de ce minimum (à $0{,}01$ près) ?",
            reponse: ym,
            tol: { abs: 0.015 },
            indice: `Calcule $f\\left(\\frac{1}{${a}}\\right) = 1 - \\ln\\frac{1}{${a}}$ et utilise $\\ln\\frac{1}{a} = -\\ln a$.`,
            pieges: a === 1 ? [] : [{ v: 1 - Math.log(a), fb: "Attention au signe : $-\\ln\\frac{1}{a} = +\\ln a$.", erreur: "ln(1/a) = ln a" }],
          },
          { type: "qcm", q: "On en déduit :", options: qSigne },
        ],
        correction: [
          { tex: `\\lim_{x\\to 0^+} ${ax} = 0, \\quad \\lim_{x\\to 0^+} (-\\ln x) = +\\infty`, r: "Donc $\\lim_{x\\to 0^+} f(x) = +\\infty$." },
          { tex: `f'(x) = ${a} - \\frac{1}{x} = \\frac{${ax} - 1}{x}`, r: "On dérive terme à terme, puis on réduit au même dénominateur." },
          { tex: `f'(x) < 0 \\ \\text{sur}\\ \\left]0 ; \\tfrac{1}{${a}}\\right[, \\qquad f'(x) > 0 \\ \\text{sur}\\ \\left]\\tfrac{1}{${a}} ; +\\infty\\right[`, r: "Le dénominateur $x$ est positif : $f'$ a le signe de $" + ax + " - 1$." },
          { tex: `f\\left(\\tfrac{1}{${a}}\\right) = 1 - \\ln\\tfrac{1}{${a}} = 1 + \\ln ${a} \\approx ${frTex(ym, 2)}`, r: "$f$ décroît puis croît : ce minimum est la plus petite valeur de $f$." },
          { tex: `f(x) \\geq 1 + \\ln ${a} > 0`, r: "Le minimum est strictement positif, donc $f$ l’est partout : la courbe reste au-dessus de l’axe." },
        ],
      };
    },
  },
];

export const _fr = fr;
