// @ts-nocheck
/**
 * Les exercices de la leçon « Fonction exponentielle » (V3).
 * Format : voir modele.js. Chaque réponse est calculée ici ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages.
 *
 * Séance 1 « Pourquoi exp » d'abord (règles, retour par ln, équations, inéquations, trinômes,
 * signe, dérivée, limites de base, tangente, systèmes), puis la séance 2 « exp comme fonction »
 * (limites habillées, étude, aˣ et xᵃ en SM), annoncée comme telle à l'élève.
 * Conventions des sujets : intervalles avec une virgule, ]a,b[.
 * Capacités : le cadre ne porte pas de capacité « calcul exponentiel » en SExp ; les gabarits de
 * calcul sont rattachés à la résolution (maths-sexp 1.2.20, décision du relecteur, spec §9).
 */
import { fr, frTex } from "./nombre.js";

const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
/** e^{k}, l'exposant écrit tel quel (e^{0} et e^{1} ne sont pas simplifiés) */
const ep = (k) => `e^{${k}}`;
/** k·x avec k entier : x, −x, 3x */
const kx = (k) => (k === 1 ? "x" : k === -1 ? "-x" : `${k}x`);
/** un terme signé : + 3, − 3 */
const sg = (k) => (k < 0 ? `- ${-k}` : `+ ${k}`);
/** ax + b, écrit proprement */
const lin = (a, b) => (b === 0 ? kx(a) : `${kx(a)} ${sg(b)}`);
/** n/d en TeX, simplifiée, le signe devant (entier si possible) */
const fracTex = (n, d) => {
  if (d < 0) [n, d] = [-n, -d];
  const g = pgcd(Math.abs(n), d) || 1,
    N = n / g,
    D = d / g;
  if (D === 1) return `${N}`;
  return N < 0 ? `-\\dfrac{${-N}}{${D}}` : `\\dfrac{${N}}{${D}}`;
};
/** ln r, avec ln 1 = 0 */
const L = (r) => (r === 1 ? "0" : `\\ln ${r}`);
/** retire les options en double (même texte) en gardant la bonne */
const sansDoublon = (opts) => {
  const vus = new Set(opts.filter((o) => o.ok).map((o) => String(o.t)));
  return opts.filter((o) => {
    const t = String(o.t);
    if (o.ok) return true;
    if (vus.has(t)) return false;
    vus.add(t);
    return true;
  });
};

export const EXERCICES = [
  /* ===================== séance 1 : « Pourquoi exp » ===================== */

  /* 1 — les règles de calcul */
  {
    id: "exp-regles",
    titre: "Les règles de calcul sur exp",
    niveau: 1,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["e^{a+b} = eᵃ + eᵇ", "eᵃeᵇ = e^{ab}", "e^{−a} = −eᵃ"],
    gen(h) {
      let p, q, r;
      do {
        p = h.int(-5, 5);
        q = h.int(-5, 5);
        r = h.int(-5, 5);
      } while (!p || !q || !r || p * q === p + q || p * q - r === p + q - r);
      const k = p + q - r;
      const somme = h.melange([
        { t: `$${ep(p)} \\times ${ep(q)}$`, ok: true },
        { t: `$${ep(p)} + ${ep(q)}$`, fb: "Tu as distribué l’exponentielle sur la somme. Une somme dans l’exposant devient un produit : $e^{a+b} = e^a \\times e^b$.", erreur: "e^{a+b} = eᵃ + eᵇ" },
        { t: `$${ep(p * q)}$`, fb: "Tu as multiplié les exposants. Ce sont les exposants d’un produit qui s’additionnent : $e^a \\times e^b = e^{a+b}$.", erreur: "eᵃeᵇ = e^{ab}" },
      ]);
      const puiss = h.melange([
        { t: `$${ep(p * q)}$`, ok: true },
        { t: `$${ep(p + q)}$`, fb: "Tu as additionné les exposants. Pour une puissance d’une puissance, on les multiplie : $(e^a)^n = e^{na}$.", erreur: "(eᵃ)ⁿ = e^{a+n}" },
        { t: `$${q}\\,${ep(p)}$`, fb: "Tu as sorti l’exposant comme un facteur. Mais $(e^a)^n = e^{na}$, pas $n\\,e^a$.", erreur: "(eᵃ)ⁿ = n eᵃ" },
      ]);
      const oppose = h.melange([
        { t: `$\\dfrac{1}{${ep(p)}}$`, ok: true },
        { t: `$-${ep(p)}$`, fb: "Un exposant négatif ne rend pas le nombre négatif : $e^{-a} > 0$. C’est l’inverse de $e^a$.", erreur: "e^{−a} = −eᵃ" },
        { t: `$${ep(p)}$`, fb: "Le signe de l’exposant compte : $e^{-a} \\times e^{a} = e^{0} = 1$, donc $e^{-a}$ est l’inverse de $e^{a}$.", erreur: "e^{−a} = eᵃ" },
      ]);
      return {
        enonce: "<p>On utilise les règles de calcul sur l’exponentielle, pour tous réels $a$ et $b$ et tout entier $n$.</p>",
        questions: [
          { type: "qcm", q: `Que vaut $e^{${p} ${sg(q)}}$ ?`, options: somme },
          {
            type: "nombre",
            q: `On écrit $\\dfrac{${ep(p)} \\times ${ep(q)}}{${ep(r)}} = e^{k}$. Que vaut $k$ ?`,
            reponse: k,
            tol: { abs: 0.01 },
            indice: "Au numérateur, on additionne les exposants. Diviser par $e^{r}$ revient à soustraire $r$.",
            pieges: [
              { v: p * q - r, fb: "Tu as multiplié les exposants du numérateur. On les additionne : $e^a \\times e^b = e^{a+b}$.", erreur: "eᵃeᵇ = e^{ab}" },
              { v: p + q + r, fb: "Tu as additionné $r$. Diviser par $e^{r}$, c’est multiplier par $e^{-r}$ : on soustrait.", erreur: "diviser par eʳ en ajoutant r" },
            ],
          },
          { type: "qcm", q: `Que vaut $(${ep(p)})^{${q}}$ ?`, options: puiss },
          { type: "qcm", q: `Pour $a = ${p}$, que vaut $e^{-a}$ ?`, options: oppose },
        ],
        correction: [
          { tex: `e^{${p} ${sg(q)}} = ${ep(p)} \\times ${ep(q)}`, r: "La somme des exposants devient un produit." },
          { tex: `\\dfrac{${ep(p)} \\times ${ep(q)}}{${ep(r)}} = ${ep(p + q)} \\times ${ep(-r)} = ${ep(k)}`, r: `On additionne $${p}$ et $${q}$, puis on soustrait $${r}$ : $k = ${k}$.` },
          { tex: `(${ep(p)})^{${q}} = ${ep(p * q)}`, r: "Pour une puissance d’une puissance, les exposants se multiplient." },
          { tex: `${ep(-p)} = \\dfrac{1}{${ep(p)}}`, r: "$e^{-a} \\times e^{a} = e^{0} = 1$." },
        ],
      };
    },
  },

  /* 2 — exp et ln, l'aller-retour */
  {
    id: "exp-ln-retour",
    titre: "exp et ln, l’aller-retour",
    niveau: 1,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["e^{k ln a} = ka", "e^{−ln a} = −a", "exp(ln x) = x pour x ≤ 0"],
    gen(h) {
      const a = h.pick([2, 3, 5]);
      let k;
      do k = h.pick([-3, -2, -1, 3, 4]);
      while (a ** k === k * a || a ** k === k ** a);
      const puis = h.melange([
        { t: `$${a}^{${k}}$`, ok: true },
        { t: `$${k} \\times ${a}$`, fb: `Tu as multiplié $k$ par $a$. Mais $e^{${k}\\ln ${a}} = e^{\\ln(${a}^{${k}})} = ${a}^{${k}}$.`, erreur: "e^{k ln a} = ka" },
        { t: `$(${k})^{${a}}$`, fb: `Tu as échangé les rôles. Le nombre $${a}$ est la base, $${k}$ l’exposant : $e^{${k}\\ln ${a}} = ${a}^{${k}}$.`, erreur: "confondre aᵏ et kᵃ" },
      ]);
      const inex = h.melange([
        { t: "Il n’existe pas, car $\\ln(-" + a + ")$ n’existe pas", ok: true },
        { t: `$-${a}$`, fb: `Tu as appliqué $e^{\\ln x} = x$ à un nombre négatif. Elle exige $x > 0$ : $\\ln(-${a})$ n’existe pas.`, erreur: "exp(ln x) = x pour x ≤ 0" },
        { t: `$${a}$`, fb: `$\\ln(-${a})$ n’existe pas : on ne peut pas poser $x = -${a}$ dans $e^{\\ln x}$.`, erreur: "exp(ln x) = x pour x ≤ 0" },
      ]);
      return {
        enonce: "<p>exp et ln se défont l’une l’autre, mais chaque identité a son domaine : $\\ln(e^{x}) = x$ pour tout réel $x$, $e^{\\ln x} = x$ pour $x > 0$.</p>",
        questions: [
          { type: "qcm", q: `Que vaut $e^{${k}\\ln ${a}}$ ?`, options: puis },
          {
            type: "nombre",
            q: `Que vaut $\\ln\\left(e^{${k}}\\right)$ ?`,
            reponse: k,
            tol: { abs: 0.01 },
            indice: "ln défait exp : $\\ln(e^{x}) = x$ pour tout réel $x$.",
            pieges: [{ v: Math.exp(k), fb: `Tu as calculé $e^{${k}}$. Mais ln défait exp : $\\ln(e^{${k}}) = ${k}$.`, erreur: "ln(eˣ) pris pour eˣ" }],
          },
          {
            type: "nombre",
            q: `Donne la valeur décimale de $e^{-\\ln ${a}}$.`,
            reponse: 1 / a,
            tol: { abs: 0.005 },
            indice: `$e^{-\\ln ${a}} = \\dfrac{1}{e^{\\ln ${a}}}$.`,
            pieges: [
              { v: -a, fb: `Un exposant négatif ne rend pas le nombre négatif : $e^{-\\ln ${a}} = \\dfrac{1}{${a}}$.`, erreur: "e^{−ln a} = −a" },
              { v: a, fb: `Le signe de l’exposant compte : $e^{-\\ln ${a}}$ est l’inverse de $e^{\\ln ${a}} = ${a}$.`, erreur: "e^{−ln a} = a" },
            ],
          },
          { type: "qcm", q: `Que vaut $e^{\\ln(-${a})}$ ?`, options: inex },
        ],
        correction: [
          { tex: `e^{${k}\\ln ${a}} = e^{\\ln(${a}^{${k}})} = ${a}^{${k}}`, r: "$k\\ln a = \\ln(a^k)$, puis exp défait ln." },
          { tex: `\\ln\\left(e^{${k}}\\right) = ${k}`, r: "ln défait exp, pour tout réel." },
          { tex: `e^{-\\ln ${a}} = \\dfrac{1}{e^{\\ln ${a}}} = \\dfrac{1}{${a}}`, r: `Ici $${a} > 0$, donc $e^{\\ln ${a}} = ${a}$.` },
          { t: `$e^{\\ln(-${a})}$ n’existe pas : $\\ln(-${a})$ n’existe pas, car $-${a} \\le 0$.` },
        ],
      };
    },
  },

  /* 3 — l'équation e^{ax+b} = k */
  {
    id: "exp-equation",
    titre: "Une équation avec une exponentielle",
    niveau: 1,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["x = ln(−k) quand k ≤ 0 (au lieu de l’absence de solution)", "diviser par a oublié", "x = eᵏ"],
    gen(h) {
      const a = h.pick([-3, -2, -1, 1, 2, 3]);
      const b = h.pick([-4, -3, -2, -1, 1, 2, 3, 4]);
      const k = h.pick([-3, -1, 0, 2, 3, 5, 7]);
      const eq = `e^{${lin(a, b)}} = ${k}`;
      // (ln k + s)/a, écrit sans fraction inutile
      const quot = (s, kk) => {
        const num = `${kk} ${sg(s)}`, neg = `${-s} - ${kk}`;
        if (a === 1) return num;
        if (a === -1) return neg;
        return a > 0 ? `\\dfrac{${num}}{${a}}` : `\\dfrac{${neg}}{${-a}}`;
      };
      if (k > 0) {
        const x = (Math.log(k) - b) / a;
        const opts = sansDoublon(
          h.melange([
            { t: `$x = ${quot(-b, `\\ln ${k}`)}$`, ok: true },
            { t: `$x = ${quot(b, `\\ln ${k}`)}$`, fb: `Tu as passé $${b}$ de l’autre côté sans changer son signe : $${lin(a, b)} = \\ln ${k}$ donne $${kx(a)} = \\ln ${k} ${sg(-b)}$.`, erreur: "signe de b mal changé" },
            { t: `$x = \\ln ${k} ${sg(-b)}$`, fb: `Tu as oublié de diviser par $${a}$ : $${kx(a)} = \\ln ${k} ${sg(-b)}$ donne $x$ en divisant les deux membres par $${a}$.`, erreur: "diviser par a oublié" },
            { t: `$x = ${quot(-b, `e^{${k}}`)}$`, fb: `Tu as appliqué exp au lieu de ln. C’est ln qui défait exp : $e^{u} = ${k}$ équivaut à $u = \\ln ${k}$.`, erreur: "x = eᵏ" },
          ]),
        );
        const pieges = [
          { v: (Math.log(k) + b) / a, fb: "Tu as ajouté $b$ au lieu de le soustraire. On isole $ax$ : $ax = \\ln k - b$.", erreur: "signe de b mal changé" },
          { v: Math.log(k) - b, fb: `Tu as oublié de diviser par $${a}$ après avoir isolé $${kx(a)}$.`, erreur: "diviser par a oublié" },
        ].filter((p) => Math.abs(p.v - x) > 0.05);
        return {
          enonce: `<p>Résous dans $\\mathbb{R}$ l’équation $${eq}$. On donne $\\ln 2 \\approx 0{,}69$, $\\ln 3 \\approx 1{,}10$, $\\ln 5 \\approx 1{,}61$, $\\ln 7 \\approx 1{,}95$.</p>`,
          questions: [
            { type: "qcm", q: "Quelle est la solution exacte ?", options: opts },
            { type: "nombre", q: "Donne-en une valeur approchée à $0{,}01$ près.", reponse: x, tol: { abs: 0.02 }, indice: "Remplace $\\ln k$ par la valeur donnée, puis termine le calcul.", pieges },
          ],
          correction: [
            { tex: `${eq} \\iff ${lin(a, b)} = \\ln ${k}`, r: `exp est strictement croissante et $${k} > 0$ : $e^{u} = ${k}$ équivaut à $u = \\ln ${k}$.` },
            { tex: `${kx(a)} = \\ln ${k} ${sg(-b)}`, r: `On isole le terme en $x$.` },
            { tex: `x = ${quot(-b, `\\ln ${k}`)} \\approx ${frTex(x, 2)}`, r: "On divise par le coefficient de $x$." },
          ],
        };
      }
      // k ≤ 0 : aucune solution
      const faux1 = k < 0 ? `$x = ${quot(-b, `\\ln(${k})`)}$` : `$x = ${fracTex(-b, a)}$`;
      const faux2 = k < 0 ? `$x = ${quot(-b, `\\ln ${-k}`)}$` : `$x = ${quot(-b, "\\ln 0")}$`;
      const opts = [
        { t: "Aucune solution", ok: true },
        k < 0
          ? { t: faux1, fb: `$\\ln(${k})$ n’existe pas : ln n’est définie que sur $]0,+\\infty[$. Or $e^{u} > 0$ pour tout $u$, donc $e^{u} = ${k}$ est impossible.`, erreur: "x = ln(−k) quand k ≤ 0" }
          : { t: faux1, fb: "Tu as supposé que l’exposant s’annule. Mais $e^{u}$ ne s’annule jamais : $e^{u} = 0$ est impossible.", erreur: "eᵘ = 0 pris pour u = 0" },
        k < 0
          ? { t: faux2, fb: `Tu as pris la valeur absolue de $${k}$. Mais $e^{u} = ${k}$ est impossible, car $e^{u} > 0$.`, erreur: "x = ln(−k) quand k ≤ 0" }
          : { t: faux2, fb: "$\\ln 0$ n’existe pas. Comme $e^{u} > 0$ pour tout $u$, l’équation $e^{u} = 0$ n’a pas de solution.", erreur: "x = ln(−k) quand k ≤ 0" },
      ];
      return {
        enonce: `<p>Résous dans $\\mathbb{R}$ l’équation $${eq}$.</p>`,
        questions: [{ type: "qcm", q: "Quel est l’ensemble des solutions ?", options: h.melange(opts) }],
        correction: [
          { tex: `e^{${lin(a, b)}} > 0 \\quad \\text{pour tout réel } x`, r: "Une exponentielle est toujours strictement positive." },
          { t: `Or $${k} \\le 0$ : l’équation $${eq}$ n’a aucune solution. L’ensemble des solutions est $\\emptyset$.` },
        ],
      };
    },
  },

  /* 4 — l'inéquation e^{ax+b} < e^{cx+d} */
  {
    id: "exp-inequation",
    titre: "Une inéquation avec exp des deux côtés",
    niveau: 2,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["sens renversé sans raison", "sens gardé en divisant par un négatif", "conditions d’existence ajoutées"],
    gen(h) {
      let a, c;
      do {
        a = h.int(-3, 3);
        c = h.int(-3, 3);
      } while (a === c);
      const m = a - c,
        b = h.int(-3, 3),
        x0 = h.pick([-3, -2, -1, 1, 2, 3, 4]),
        d = b + m * x0,
        large = h.pick([false, true]);
      const op = large ? "\\ge" : "<";
      // le sens final : on garde si m > 0, on renverse si m < 0
      const versLaGauche = (op === "<") === (m > 0);
      const borne = (gauche, x) => (gauche ? `\\left]-\\infty,${x}${large ? "\\right]" : "\\right["}` : `${large ? "\\left[" : "\\left]"}${x},+\\infty\\right[`);
      const bonne = borne(versLaGauche, x0);
      const inverse = borne(!versLaGauche, x0);
      const faux = borne(versLaGauche, -x0);
      const eqn = `e^{${lin(a, b)}} ${op} e^{${lin(c, d)}}`;
      return {
        enonce: `<p>Résous dans $\\mathbb{R}$ l’inéquation $${eqn}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quel est l’ensemble des solutions ?",
            options: h.melange([
              { t: `$${bonne}$`, ok: true },
              m > 0
                ? { t: `$${inverse}$`, fb: "Tu as renversé l’inégalité sans raison. exp est croissante : elle garde l’ordre. Le sens ne change que si l’on divise par un nombre négatif.", erreur: "sens renversé sans raison" }
                : { t: `$${inverse}$`, fb: `Tu as gardé le sens en divisant par $${m}$, qui est négatif. Diviser par un négatif renverse l’inégalité.`, erreur: "sens gardé en divisant par un négatif" },
              { t: `$${faux}$`, fb: `Il y a une erreur de signe sur la borne. L’inéquation équivaut à $${kx(m)} ${large ? "\\ge" : "<"} ${d - b}$, donc la borne est $${x0}$.`, erreur: "erreur de signe sur la borne" },
            ]),
          },
          {
            type: "qcm",
            q: "Faut-il écrire des conditions d’existence avant de résoudre ?",
            options: h.melange([
              { t: "Non : $e^{u}$ existe pour tout réel $u$", ok: true },
              { t: `Oui : $${lin(a, b)} > 0$ et $${lin(c, d)} > 0$`, fb: "Tu as transféré le réflexe de ln. Ce sont les conditions d’existence de ln : $e^{u}$ existe pour tout $u$.", erreur: "conditions d’existence ajoutées" },
              { t: "Oui : $x \\neq 0$", fb: "Aucune valeur de $x$ n’est interdite : une exponentielle est définie sur $\\mathbb{R}$.", erreur: "conditions d’existence ajoutées" },
            ]),
          },
        ],
        correction: [
          { tex: `${eqn} \\iff ${lin(a, b)} ${op} ${lin(c, d)}`, r: "exp est strictement croissante : elle garde l’ordre. Aucune condition d’existence." },
          { tex: `${kx(m)} ${op} ${d - b}`, r: "On regroupe les termes en $x$ d’un côté, les constantes de l’autre." },
          { tex: `x ${m > 0 ? op : op === "<" ? ">" : "\\le"} ${x0}`, r: m > 0 ? `On divise par $${m} > 0$ : le sens est conservé.` : `On divise par $${m} < 0$ : le sens est renversé.` },
          { tex: `S = ${bonne}`, r: "L’ensemble des solutions." },
        ],
      };
    },
  },

  /* 5 — l'équation du second degré en eˣ */
  {
    id: "exp-trinome",
    titre: "Une équation du second degré en eˣ",
    niveau: 3,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["garder t < 0 (ln d’un négatif)", "e^{2x} = 2eˣ", "oublier de revenir de t à x"],
    gen(h) {
      const pool = [-4, -3, -2, -1, 1, 2, 3, 4, 5];
      let r1, r2;
      do {
        r1 = h.pick(pool);
        r2 = h.pick(pool);
        if (r1 > r2) [r1, r2] = [r2, r1];
      } while (r1 === r2 || r2 < 1);
      const beta = -(r1 + r2),
        gamma = r1 * r2,
        pos = [r1, r2].filter((r) => r > 0);
      const termB = beta === 0 ? "" : beta === 1 ? " + e^{x}" : beta === -1 ? " - e^{x}" : beta > 0 ? ` + ${beta}e^{x}` : ` - ${-beta}e^{x}`;
      const termC = gamma === 0 ? "" : gamma > 0 ? ` + ${gamma}` : ` - ${-gamma}`;
      const eq = `e^{2x}${termB}${termC} = 0`;
      const tri = `t^{2}${beta === 0 ? "" : beta === 1 ? " + t" : beta === -1 ? " - t" : beta > 0 ? ` + ${beta}t` : ` - ${-beta}t`}${termC} = 0`;
      const S = (xs) => `\\left\\{${xs.join(" ; ")}\\right\\}`;
      const bonne = S(pos.map(L));
      const enT = S([r1, r2]);
      const neg = r1 < 0 ? S([`\\ln(${r1})`, L(r2)]) : S([`e^{${r1}}`, `e^{${r2}}`]);
      return {
        enonce: `<p>Résous dans $\\mathbb{R}$ l’équation $${eq}$, en posant $t = e^{x}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quelle équation obtient-on en $t$ ?",
            options: h.melange([
              { t: `$${tri}$, avec $t > 0$`, ok: true },
              { t: `$${tri.replace("t^{2}", "2t")}$`, fb: "Tu as lu $e^{2x}$ comme $2e^{x}$. Mais $e^{2x} = (e^{x})^{2} = t^{2}$.", erreur: "e^{2x} = 2eˣ" },
              { t: `$${tri.replace(/t/g, "x")}$`, fb: "Tu as oublié de poser $t = e^{x}$ : l’inconnue est $t$, pas $x$.", erreur: "oublier de poser t = eˣ" },
            ]),
          },
          {
            type: "nombre",
            q: "Combien de solutions réelles a l’équation en $x$ ?",
            reponse: pos.length,
            tol: { abs: 0.01 },
            indice: "Chaque racine $t$ strictement positive donne une valeur de $x$. Que devient une racine négative ?",
            pieges: [{ v: 2, fb: "Tu as gardé les deux racines. Mais $t = e^{x} > 0$ : une racine négative ne donne aucune solution.", erreur: "garder t < 0" }].filter(() => pos.length !== 2),
          },
          {
            type: "qcm",
            q: "Quel est l’ensemble des solutions ?",
            options: h.melange([
              { t: `$S = ${bonne}$`, ok: true },
              { t: `$S = ${enT}$`, fb: `Tu as donné les racines en $t$. Il faut revenir à $x$ : $e^{x} = t$ équivaut à $x = \\ln t$.`, erreur: "oublier de revenir de t à x" },
              r1 < 0
                ? { t: `$S = ${neg}$`, fb: `Tu as gardé $t = ${r1}$. Mais $t = e^{x} > 0$, et $\\ln(${r1})$ n’existe pas.`, erreur: "garder t < 0" }
                : { t: `$S = ${neg}$`, fb: "Tu as appliqué exp au lieu de ln. $e^{x} = t$ équivaut à $x = \\ln t$.", erreur: "exp au lieu de ln" },
            ]),
          },
        ],
        correction: [
          { tex: `t = e^{x} > 0 \\quad\\text{et}\\quad e^{2x} = t^{2}`, r: "On pose $t = e^{x}$, avec $t > 0$." },
          { tex: tri, r: "L’équation devient un trinôme en $t$." },
          { tex: `\\Delta = ${beta * beta} - ${4 * gamma >= 0 ? 4 * gamma : `(${4 * gamma})`} = ${(r2 - r1) ** 2}`, r: "Le discriminant, avec $a = 1$." },
          { tex: `t = ${r1} \\ \\text{ou}\\ t = ${r2}`, r: pos.length === 2 ? "Les deux racines sont strictement positives." : `Seule $t = ${r2}$ est strictement positive : on rejette $t = ${r1}$.` },
          { tex: `S = ${bonne}`, r: "On revient à $x$ : $e^{x} = t$ équivaut à $x = \\ln t$." },
        ],
      };
    },
  },

  /* 6 — l'inéquation du second degré en eˣ */
  {
    id: "exp-trinome-ineq",
    titre: "Une inéquation du second degré en eˣ",
    niveau: 3,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["S donné en t au lieu de x", "t ≤ 0 non écarté", "signe du trinôme inversé"],
    gen(h) {
      const cas = h.pick([0, 1]);
      let r1, r2;
      if (cas === 0) {
        do {
          r1 = h.int(1, 4);
          r2 = h.int(2, 5);
        } while (r1 >= r2);
      } else {
        r1 = h.pick([-4, -3, -2, -1]);
        r2 = h.int(1, 5);
      }
      const large = h.pick([false, true]); // false : ≤ 0 ; true : ≥ 0
      const beta = -(r1 + r2),
        gamma = r1 * r2;
      const termB = beta === 0 ? "" : beta === 1 ? " + e^{x}" : beta === -1 ? " - e^{x}" : beta > 0 ? ` + ${beta}e^{x}` : ` - ${-beta}e^{x}`;
      const termC = gamma === 0 ? "" : gamma > 0 ? ` + ${gamma}` : ` - ${-gamma}`;
      const ineq = `e^{2x}${termB}${termC} ${large ? "\\ge" : "\\le"} 0`;
      const sLe = cas === 0 ? `\\left[${L(r1)},${L(r2)}\\right]` : `\\left]-\\infty,${L(r2)}\\right]`;
      const sGe = cas === 0 ? `\\left]-\\infty,${L(r1)}\\right] \\cup \\left[${L(r2)},+\\infty\\right[` : `\\left[${L(r2)},+\\infty\\right[`;
      const tLe = `\\left[${r1},${r2}\\right]`;
      const tGe = `\\left]-\\infty,${r1}\\right] \\cup \\left[${r2},+\\infty\\right[`;
      const bonne = large ? sGe : sLe;
      const opposee = large ? sLe : sGe;
      const enT = large ? tGe : tLe;
      const plusGrand = Math.max(r1, r2);
      return {
        enonce: `<p>Résous dans $\\mathbb{R}$ l’inéquation $${ineq}$, en posant $t = e^{x}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quel est l’ensemble des solutions ?",
            options: h.melange([
              { t: `$S = ${bonne}$`, ok: true },
              { t: `$S = ${enT}$`, fb: "Tu as donné l’ensemble des $t$. Il faut revenir à $x$ avec $t = e^{x}$, donc $x = \\ln t$ pour chaque borne.", erreur: "S donné en t au lieu de x" },
              { t: `$S = ${opposee}$`, fb: `Tu as inversé le signe du trinôme : il est négatif entre ses racines, positif à l’extérieur.`, erreur: "signe du trinôme inversé" },
            ]),
          },
          {
            type: "nombre",
            q: "Quelle est la plus grande des bornes finies de $S$ ? (valeur approchée à $0{,}01$ près)",
            reponse: Math.log(plusGrand),
            tol: { abs: 0.015 },
            indice: "Chaque borne en $x$ est le logarithme d’une racine $t$.",
            pieges: [{ v: plusGrand, fb: `Tu as donné la racine $t = ${plusGrand}$. La borne en $x$ est $\\ln ${plusGrand}$.`, erreur: "S donné en t au lieu de x" }].filter((p) => Math.abs(p.v - Math.log(plusGrand)) > 0.05),
          },
        ],
        correction: [
          { tex: `(t ${sgSigne(-r1)})(t ${sgSigne(-r2)}) ${large ? "\\ge" : "\\le"} 0`, r: `Avec $t = e^{x} > 0$, le trinôme se factorise par ses racines $${r1}$ et $${r2}$.` },
          { tex: large ? `t \\le ${r1} \\ \\text{ou}\\ t \\ge ${r2}` : `${r1} \\le t \\le ${r2}`, r: large ? "Un trinôme est positif à l’extérieur de ses racines." : "Un trinôme est négatif entre ses racines." },
          { tex: `S = ${bonne}`, r: cas === 0 ? "On revient à $x$ : chaque borne $t$ devient $\\ln t$." : `$t = e^{x} > 0$ écarte les $t \\le 0$ : seule la racine $${r2}$ compte, et $e^{x} = ${r2}$ équivaut à $x = ${L(r2)}$.` },
        ],
      };
    },
  },

  /* 7 — le signe avec exp */
  {
    id: "exp-signe",
    titre: "Le signe d’une expression avec eˣ",
    niveau: 2,
    capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"],
    erreurs: ["« toujours positif car eˣ > 0 »", "eˣ − k a le signe de x − k", "eˣ − 1 > 0 partout"],
    gen(h) {
      const type = h.pick([0, 1, 2]);
      if (type === 0) {
        const a = h.pick([-3, -2, -1, 1, 2, 3, 4]);
        const xa = a > 0 ? `x - ${a}` : `x + ${-a}`;
        return {
          enonce: `<p>Soit $f(x) = (${xa})e^{x}$ pour tout réel $x$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Sur quel ensemble $f(x) > 0$ ?",
              options: h.melange([
                { t: `$\\left]${a},+\\infty\\right[$`, ok: true },
                { t: "$\\mathbb{R}$", fb: "Tu as conclu « positif, car $e^{x} > 0$ ». Mais un facteur positif ne rend pas le produit positif : il garde le signe de $" + xa + "$.", erreur: "« toujours positif car eˣ > 0 »" },
                { t: `$\\left]-\\infty,${a}\\right[$`, fb: `Tu as inversé le signe : $${xa} > 0$ équivaut à $x > ${a}$.`, erreur: "signe du facteur inversé" },
              ]),
            },
            { type: "nombre", q: "Pour quelle valeur de $x$ la fonction $f$ s’annule-t-elle ?", reponse: a, tol: { abs: 0.01 }, indice: "Un produit est nul quand l’un de ses facteurs l’est. L’un des deux ne s’annule jamais.", pieges: [{ v: 0, fb: "$e^{x}$ ne s’annule jamais : c’est le facteur $" + xa + "$ qui s’annule.", erreur: "eˣ pris pour un facteur nul" }].filter(() => a !== 0) },
          ],
          correction: [
            { tex: `e^{x} > 0 \\quad\\text{pour tout réel } x`, r: "Le facteur exponentiel ne change pas le signe du produit." },
            { tex: `f(x) \\ \\text{a le signe de}\\ ${xa}`, r: `$${xa} > 0$ équivaut à $x > ${a}$.` },
            { tex: `f(x) > 0 \\iff x \\in \\left]${a},+\\infty\\right[`, r: `$f$ s’annule en $x = ${a}$.` },
          ],
        };
      }
      if (type === 1) {
        const k = h.pick([2, 3, 5, 7]);
        return {
          enonce: `<p>Soit $f(x) = e^{x} - ${k}$ pour tout réel $x$. On donne $\\ln 2 \\approx 0{,}69$, $\\ln 3 \\approx 1{,}10$, $\\ln 5 \\approx 1{,}61$, $\\ln 7 \\approx 1{,}95$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Sur quel ensemble $f(x) > 0$ ?",
              options: h.melange([
                { t: `$\\left]\\ln ${k},+\\infty\\right[$`, ok: true },
                { t: `$\\left]${k},+\\infty\\right[$`, fb: `Tu as lu « $e^{x} - ${k}$ a le signe de $x - ${k}$ ». Mais $e^{x} > ${k}$ équivaut à $x > \\ln ${k}$.`, erreur: "eˣ − k a le signe de x − k" },
                { t: "$\\mathbb{R}$", fb: "Tu as conclu « positif, car $e^{x} > 0$ ». Mais $e^{x} - " + k + "$ est négatif pour les petits $x$ : par exemple $f(0) = " + (1 - k) + "$.", erreur: "eˣ − k > 0 partout" },
              ]),
            },
            { type: "nombre", q: "Pour quelle valeur de $x$ la fonction $f$ s’annule-t-elle ? (valeur approchée à $0{,}01$ près)", reponse: Math.log(k), tol: { abs: 0.02 }, indice: `$e^{x} = ${k}$ équivaut à $x = \\ln ${k}$.`, pieges: [{ v: k, fb: `Tu as donné $${k}$ lui-même. $e^{x} = ${k}$ équivaut à $x = \\ln ${k}$.`, erreur: "eˣ − k a le signe de x − k" }] },
          ],
          correction: [
            { tex: `e^{x} - ${k} > 0 \\iff e^{x} > ${k}`, r: "On isole l’exponentielle." },
            { tex: `e^{x} > ${k} \\iff x > \\ln ${k}`, r: `exp est strictement croissante et $${k} > 0$.` },
            { tex: `f(x) > 0 \\iff x \\in \\left]\\ln ${k},+\\infty\\right[`, r: `$f$ s’annule en $x = \\ln ${k} \\approx ${frTex(Math.log(k), 2)}$.` },
          ],
        };
      }
      // x(e^{x/2} − 1) : le produit de deux facteurs de même signe
      return {
        enonce: "<p>Soit $f(x) = x\\left(e^{x/2} - 1\\right)$ pour tout réel $x$.</p>",
        questions: [
          {
            type: "qcm",
            q: "Pour quels $x$ a-t-on $f(x) > 0$ ?",
            options: h.melange([
              { t: "pour tout $x \\neq 0$", ok: true },
              { t: "pour $x > 0$ seulement", fb: "Tu as supposé $e^{x/2} - 1 > 0$ pour tout $x$. Mais $e^{x/2} - 1$ a le signe de $x$ : il est négatif pour $x < 0$.", erreur: "eˣ − 1 > 0 partout" },
              { t: "pour $x < 0$ seulement", fb: "Pour $x < 0$, les deux facteurs sont négatifs : leur produit est positif. Même chose pour $x > 0$ avec deux facteurs positifs.", erreur: "signe d’un produit mal lu" },
            ]),
          },
          { type: "nombre", q: "En combien de réels $x$ la fonction $f$ s’annule-t-elle ?", reponse: 1, tol: { abs: 0.01 }, indice: "$e^{x/2} = 1$ équivaut à $x = 0$.", pieges: [{ v: 2, fb: "$x = 0$ annule les deux facteurs à la fois : il n’y a qu’une seule valeur.", erreur: "valeurs comptées deux fois" }] },
        ],
        correction: [
          { tex: "e^{x/2} - 1 > 0 \\iff e^{x/2} > e^{0} \\iff x > 0", r: "exp garde l’ordre : $e^{x/2} - 1$ a le signe de $x$." },
          { tex: "f(x) = x \\times \\left(e^{x/2} - 1\\right)", r: "Deux facteurs de même signe : leur produit est positif sauf en $0$." },
          { tex: "f(x) > 0 \\iff x \\neq 0", r: "$f(0) = 0$." },
        ],
      };
    },
  },

  /* 8 — la dérivée */
  {
    id: "exp-derivee",
    titre: "Dériver avec eˣ",
    niveau: 2,
    capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.22", "maths-sm 1.3.16"],
    erreurs: ["(e^u)′ = e^u", "(eˣ)′ = x e^{x−1}", "produit dérivé comme un produit des dérivées"],
    gen(h) {
      const type = h.pick([0, 1, 2]);
      if (type === 0) {
        // f(x) = (ax + b)e^{cx}
        const a = h.pick([-3, -2, -1, 1, 2, 3]);
        const b = h.pick([-3, -2, -1, 1, 2, 3]);
        const c = h.pick([-2, -1, 2, 3]);
        const lin1 = lin(a, b);
        const f0 = a + c * b;
        const ecx = `e^{${kx(c)}}`;
        const bonne = a + c * b === 0 ? `${lin(a * c, 0)}\\,${ecx}` : `(${lin(a * c, a + c * b)})${ecx}`;
        return {
          enonce: `<p>Soit $f(x) = (${lin1})${ecx}$ pour tout réel $x$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Quelle est l’expression de $f'(x)$ ?",
              options: h.melange([
                { t: `$${bonne}$`, ok: true },
                { t: `$${a * c}${ecx}$`, fb: `Tu as dérivé chaque facteur et multiplié les dérivées. Pour un produit : $(uv)' = u'v + uv'$.`, erreur: "produit dérivé comme un produit des dérivées" },
                { t: `$(${lin(a, a + b)})${ecx}$`, fb: `Tu as dérivé $e^{${kx(c)}}$ en $e^{${kx(c)}}$. Mais $(e^{u})' = u'e^{u}$ : ici $u' = ${c}$.`, erreur: "(e^u)′ = e^u" },
              ]),
            },
            {
              type: "nombre",
              q: "Que vaut $f'(0)$ ?",
              reponse: f0,
              tol: { abs: 0.01 },
              indice: "Remplace $x$ par $0$ dans l’expression de $f'(x)$ : $e^{0} = 1$.",
              pieges: [
                { v: a, fb: `Tu as oublié le terme $${c}\\times ${b}$ venu de $uv'$.`, erreur: "produit dérivé comme un produit des dérivées" },
                { v: a + b, fb: `Tu as oublié le facteur $${c}$ de $(e^{${kx(c)}})' = ${c}e^{${kx(c)}}$.`, erreur: "(e^u)′ = e^u" },
              ].filter((p) => p.v !== f0),
            },
          ],
          correction: [
            { tex: `u(x) = ${lin1}, \\quad v(x) = ${ecx}`, r: "On reconnaît un produit." },
            { tex: `u'(x) = ${a}, \\quad v'(x) = ${c}${ecx}`, r: "$(e^{u})' = u'e^{u}$ avec $u = " + kx(c) + "$." },
            { tex: `f'(x) = ${a}${ecx} + (${lin1}) \\times ${c}${ecx} = ${bonne}`, r: "$(uv)' = u'v + uv'$." },
            { tex: `f'(0) = ${a} + ${c} \\times ${b < 0 ? `(${b})` : b} = ${f0}`, r: "$e^{0} = 1$." },
          ],
        };
      }
      if (type === 1) {
        // f(x) = e^{ax² + b}
        const a = h.pick([-2, -1, 1, 2, 3]);
        const b = h.pick([-3, -2, -1, 1, 2, 3]);
        const x0 = h.pick([-2, -1, 1, 2]);
        const arg = `${a === 1 ? "" : a === -1 ? "-" : a}x^{2} ${sg(b)}`;
        const r = 2 * a * x0;
        return {
          enonce: `<p>Soit $f(x) = e^{${arg}}$ pour tout réel $x$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Quelle est l’expression de $f'(x)$ ?",
              options: h.melange([
                { t: `$${kx(2 * a)}\\,e^{${arg}}$`, ok: true },
                { t: `$e^{${arg}}$`, fb: "Tu as dérivé $e^{u}$ en $e^{u}$. Mais $(e^{u})' = u'e^{u}$ : il faut multiplier par $u'$.", erreur: "(e^u)′ = e^u" },
                { t: `$(${arg})\\,e^{${arg} - 1}$`, fb: "Tu as appliqué la règle des puissances. Mais l’exposant varie : la base $e$ est fixe, et $(e^{u})' = u'e^{u}$.", erreur: "(eˣ)′ = x e^{x−1}" },
              ]),
            },
            {
              type: "nombre",
              q: `Que vaut le rapport $\\dfrac{f'(${x0})}{f(${x0})}$ ?`,
              reponse: r,
              tol: { abs: 0.01 },
              indice: "$f'(x) = u'(x)\\,f(x)$ avec $u = " + arg + "$ : le rapport vaut $u'(x)$.",
              pieges: [{ v: 1, fb: "Tu as dérivé $e^{u}$ en $e^{u}$ : le rapport vaudrait 1. Or $f'(x) = u'(x)e^{u(x)}$.", erreur: "(e^u)′ = e^u" }].filter((p) => p.v !== r),
            },
          ],
          correction: [
            { tex: `u(x) = ${arg}, \\quad u'(x) = ${kx(2 * a)}`, r: "L’exposant $u$ est un trinôme en $x$." },
            { tex: `f'(x) = u'(x)\\,e^{u(x)} = ${kx(2 * a)}\\,e^{${arg}}`, r: "$(e^{u})' = u'e^{u}$." },
            { tex: `\\dfrac{f'(${x0})}{f(${x0})} = u'(${x0}) = ${r}`, r: "On simplifie par $e^{u(x)}$." },
          ],
        };
      }
      // f(x) = eˣ / (x + a)
      const a = h.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
      const den = a > 0 ? `x + ${a}` : `x - ${-a}`;
      const v = (a - 1) / (a * a);
      return {
        enonce: `<p>Soit $f(x) = \\dfrac{e^{x}}{${den}}$ pour tout réel $x \\neq ${-a}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quelle est l’expression de $f'(x)$ ?",
            options: h.melange([
              { t: `$\\dfrac{(${a > 0 ? `x + ${a - 1}` : `x - ${1 - a}`})e^{x}}{(${den})^{2}}$`, ok: true },
              { t: `$\\dfrac{e^{x}}{1}$`, fb: "Tu as dérivé le numérateur et le dénominateur séparément. Pour un quotient : $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^{2}}$.", erreur: "quotient dérivé terme à terme" },
              { t: `$\\dfrac{(${a > 0 ? `x + ${a + 1}` : `x - ${-a - 1}`})e^{x}}{(${den})^{2}}$`, fb: "Tu as une erreur de signe dans le numérateur : $u'v - uv' = e^{x}(x + a) - e^{x}$, donc $e^{x}(x + a - 1)$.", erreur: "erreur de signe dans u′v − uv′" },
            ]),
          },
          {
            type: "nombre",
            q: "Que vaut $f'(0)$ ? (valeur décimale à $0{,}01$ près)",
            reponse: v,
            tol: { abs: 0.015 },
            indice: "$e^{0} = 1$ : remplace $x$ par $0$ dans $f'(x)$.",
            pieges: [{ v: 1 / a, fb: "Tu as dérivé le quotient terme à terme. Utilise $\\frac{u'v - uv'}{v^{2}}$.", erreur: "quotient dérivé terme à terme" }].filter((p) => Math.abs(p.v - v) > 0.02),
          },
        ],
        correction: [
          { tex: `u(x) = e^{x}, \\quad v(x) = ${den}, \\quad u'(x) = e^{x}, \\quad v'(x) = 1`, r: "On reconnaît un quotient." },
          { tex: `f'(x) = \\dfrac{e^{x}(${den}) - e^{x}}{(${den})^{2}} = \\dfrac{(${a > 0 ? `x + ${a - 1}` : `x - ${1 - a}`})e^{x}}{(${den})^{2}}`, r: "$\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^{2}}$." },
          { tex: `f'(0) = \\dfrac{${a - 1}}{${a * a}}`, r: "$e^{0} = 1$ et $(0 + a)^{2} = a^{2}$." },
        ],
      };
    },
  },

  /* 9 — les limites de base */
  {
    id: "exp-limites",
    titre: "Les limites de base de exp",
    niveau: 2,
    capacites: ["maths-sexp 1.2.21", "maths-sm 1.3.14"],
    erreurs: ["lim_{−∞} eˣ = −∞", "forme 0/0 prise pour 0", "croissances comparées à l’envers"],
    gen(h) {
      const n = h.int(1, 3);
      const POOL = [
        { f: "e^{x}", en: "-\\infty", bonne: "0", fausses: [["-\\infty", "Tu as pensé que $e^{x}$ tend vers $-\\infty$ quand $x$ tend vers $-\\infty$. Mais $e^{x} > 0$ : elle s’approche de $0$.", "lim_{−∞} eˣ = −∞"], ["1", "$e^{x}$ s’approche de $e^{0} = 1$ seulement quand $x$ tend vers $0$. En $-\\infty$, elle tend vers $0$.", "lim_{−∞} eˣ = 1"]] },
        { f: "e^{-x}", en: "+\\infty", bonne: "0", fausses: [["+\\infty", "Tu as oublié le signe : $e^{-x}$ est l’inverse de $e^{x}$. Quand $x \\to +\\infty$, $e^{-x} \\to 0$.", "e^{−x} lu comme eˣ"], ["-\\infty", "Une exponentielle est positive : $e^{-x} > 0$ ne peut pas tendre vers $-\\infty$.", "lim_{−∞} eˣ = −∞"]] },
        { f: `\\dfrac{e^{x}}{x^{${n}}}`, en: "+\\infty", bonne: "+\\infty", fausses: [["0", "Tu as mis les croissances comparées à l’envers : $e^{x}$ l’emporte sur toute puissance de $x$.", "croissances comparées à l’envers"], ["1", "« $\\infty/\\infty = 1$ » n’est pas une règle : $e^{x}$ l’emporte sur $x^{" + n + "}$, donc le quotient tend vers $+\\infty$.", "∞/∞ pris pour 1"]] },
        { f: "x\\,e^{-x}", en: "+\\infty", bonne: "0", fausses: [["+\\infty", "Tu as fait gagner $x$. Mais $xe^{-x} = \\frac{x}{e^{x}}$, et $e^{x}$ l’emporte sur $x$ : la limite est $0$.", "croissances comparées à l’envers"], ["1", "« $\\infty/\\infty = 1$ » n’est pas une règle : $\\frac{x}{e^{x}}$ tend vers $0$.", "∞/∞ pris pour 1"]] },
        { f: "x\\,e^{x}", en: "-\\infty", bonne: "0", fausses: [["-\\infty", "Tu as fait gagner $x$. Avec $X = -x$, $xe^{x} = -Xe^{-X}$ tend vers $0$ : l’exponentielle l’emporte.", "croissances comparées à l’envers"], ["+\\infty", "Pour $x < 0$, $xe^{x}$ est négatif, et $e^{x}$ l’emporte sur $x$ : la limite est $0$.", "croissances comparées à l’envers"]] },
        { f: "\\dfrac{e^{x} - 1}{x}", en: "0", bonne: "1", fausses: [["0", "Tu as pris la forme $0/0$ pour $0$. C’est le taux d’accroissement de exp en $0$ : il tend vers $e^{0} = 1$.", "forme 0/0 prise pour 0"], ["+\\infty", "Diviser par un nombre qui tend vers $0$ ne suffit pas : le numérateur tend aussi vers $0$.", "forme 0/0 prise pour ∞"]] },
      ];
      const [A, B] = h.melange(POOL).slice(0, 2);
      const q = (P) => ({
        type: "qcm",
        q: `Quelle est la limite de $${P.f}$ quand $x$ tend vers $${P.en}$ ?`,
        options: h.melange([{ t: `$${P.bonne}$`, ok: true }, ...P.fausses.map(([t, fb, erreur]) => ({ t: `$${t}$`, fb, erreur }))]),
      });
      const cor = (P) => ({ tex: `\\lim_{x \\to ${P.en}} ${P.f} = ${P.bonne}`, r: "Limite de base de l’exponentielle." });
      return {
        enonce: "<p>Pour chaque fonction, donne la limite demandée.</p>",
        questions: [q(A), q(B)],
        correction: [cor(A), cor(B)],
      };
    },
  },

  /* 10 — la tangente */
  {
    id: "exp-tangente",
    titre: "La tangente à la courbe de exp",
    niveau: 2,
    capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"],
    erreurs: ["pente a au lieu de eᵃ", "ordonnée eᵃ oubliée", "courbe sous sa tangente"],
    gen(h) {
      const a = h.pick([-1, 0, 1, 2]);
      const c = 1 - a; // y = eᵃ(x + c)
      const facteur = a === 0 ? "" : a === 1 ? "e" : `e^{${a}}`;
      const paren = c === 0 ? "x" : c > 0 ? `(x + ${c})` : `(x - ${-c})`;
      const bonne = a === 0 ? `y = ${c === 0 ? "x" : `x + ${c}`}` : c === 0 ? `y = ${facteur}\\,x` : `y = ${facteur}${paren}`;
      const sansOrd = a === 0 ? "y = x" : `y = ${facteur}(x ${a > 0 ? `- ${a}` : `+ ${-a}`})`;
      const pentea = `y = ${a === 0 ? "" : `${a}(x ${a > 0 ? `- ${a}` : `+ ${-a}`}) + `}${a === 0 ? "1" : facteur}`;
      const ord = Math.exp(a) * (1 - a);
      return {
        enonce: `<p>On note $\\mathcal{C}$ la courbe de la fonction exp. On s’intéresse à sa tangente au point d’abscisse $${a}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: `Quelle est l’équation de la tangente à $\\mathcal{C}$ en $x = ${a}$ ?`,
            options: sansDoublon(
              h.melange([
                { t: `$${bonne}$`, ok: true },
                { t: `$${pentea}$`, fb: `Tu as pris pour pente $${a}$, l’abscisse. La pente est $\\exp'(${a}) = e^{${a}}$.`, erreur: "pente a au lieu de eᵃ" },
                { t: `$${sansOrd}$`, fb: `Tu as oublié l’ordonnée du point : la tangente passe par $(${a} ; e^{${a}})$, donc $y = e^{${a}}(x - ${a}) + e^{${a}}$.`, erreur: "ordonnée eᵃ oubliée" },
              ]),
            ),
          },
          {
            type: "nombre",
            q: "Quelle est l’ordonnée à l’origine de cette tangente ? (valeur approchée à $0{,}01$ près)",
            reponse: ord,
            tol: { abs: 0.015 },
            indice: "Remplace $x$ par $0$ dans l’équation de la tangente.",
            pieges: [{ v: Math.exp(a), fb: `Tu as donné l’ordonnée $e^{${a}}$ du point de contact. Pour $x = 0$, $y = e^{${a}}(0 - ${a}) + e^{${a}} = e^{${a}}(1 - ${a})$.`, erreur: "ordonnée à l’origine prise pour l’ordonnée du point" }].filter((p) => Math.abs(p.v - ord) > 0.03),
          },
          {
            type: "qcm",
            q: "Où est la courbe de exp par rapport à sa tangente en $x = 0$, d’équation $y = x + 1$ ?",
            options: h.melange([
              { t: "au-dessus, sauf au point de contact", ok: true },
              { t: "en dessous", fb: "Tu as pensé que la courbe reste sous sa tangente. Mais $e^{x} \\ge x + 1$ pour tout réel $x$ : la courbe est au-dessus.", erreur: "courbe sous sa tangente" },
              { t: "elle traverse la tangente en $0$", fb: "Il n’y a pas de traversée : $g(x) = e^{x} - x - 1$ est minimale en $0$, avec $g(0) = 0$, donc $g \\ge 0$.", erreur: "courbe sous sa tangente" },
            ]),
          },
        ],
        correction: [
          { tex: `\\exp'(${a}) = e^{${a}}`, r: "$(e^{x})' = e^{x}$ : la pente est la hauteur." },
          { tex: `y = e^{${a}}(x - ${a}) + e^{${a}}`, r: `L’équation de la tangente en $x = ${a}$ : $y = f'(a)(x - a) + f(a)$.` },
          { tex: `y(0) = e^{${a}}(1 - ${a}) \\approx ${frTex(ord, 2)}`, r: "On remplace $x$ par $0$." },
          { tex: "e^{x} \\ge x + 1", r: "La courbe est au-dessus de sa tangente en $0$, pour tout réel $x$." },
        ],
      };
    },
  },

  /* 11 — les systèmes */
  {
    id: "exp-systeme",
    titre: "Un système avec des exponentielles",
    niveau: 3,
    capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"],
    erreurs: ["inconnues prises pour eˣ, eʸ", "eˣ + eʸ = e^{x+y}"],
    gen(h) {
      if (h.pick([false, true])) {
        // eˣeʸ = e^p et eˣ/eʸ = e^q : x + y = p, x − y = q
        let p, q;
        do {
          p = h.int(-4, 7);
          q = h.int(-4, 7);
        } while ((p + q) % 2 !== 0 || p === q || p === 0 || q === 0);
        const x = (p + q) / 2,
          y = (p - q) / 2;
        return {
          enonce: `<p>Résous dans $\\mathbb{R}^{2}$ le système $\\begin{cases} e^{x} \\times e^{y} = e^{${p}} \\\\ \\dfrac{e^{x}}{e^{y}} = e^{${q}} \\end{cases}$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Quel couple $(x\\,;\\,y)$ est solution ?",
              options: h.melange([
                { t: `$(${x}\\,;\\,${y})$`, ok: true },
                { t: `$(e^{${x}}\\,;\\,e^{${y}})$`, fb: "Tu as pris pour inconnues $e^{x}$ et $e^{y}$. Les inconnues sont les exposants $x$ et $y$.", erreur: "inconnues prises pour eˣ, eʸ" },
                { t: `$(${p}\\,;\\,${q})$`, fb: `Tu as pris $x + y = ${p}$ et $x - y = ${q}$ pour $x$ et $y$. Il reste à résoudre ce système.`, erreur: "système en x + y et x − y non résolu" },
              ]),
            },
            { type: "nombre", q: "Que vaut $x$ ?", reponse: x, tol: { abs: 0.01 }, indice: "Additionne les deux équations en $x + y$ et $x - y$.", pieges: [{ v: p, fb: `$${p}$ est $x + y$, pas $x$. On additionne : $2x = ${p + q}$.`, erreur: "système en x + y et x − y non résolu" }].filter((pg) => pg.v !== x) },
          ],
          correction: [
            { tex: `e^{x+y} = e^{${p}}, \\quad e^{x-y} = e^{${q}}`, r: "$e^{x}e^{y} = e^{x+y}$ et $e^{x}/e^{y} = e^{x-y}$." },
            { tex: `\\begin{cases} x + y = ${p} \\\\ x - y = ${q} \\end{cases}`, r: "exp est injective : $e^{u} = e^{v}$ équivaut à $u = v$." },
            { tex: `x = ${x}, \\quad y = ${y}`, r: `On additionne : $2x = ${p + q}$ ; on soustrait : $2y = ${p - q}$.` },
          ],
        };
      }
      // eˣ + eʸ = s et e^{x+y} = P : eˣ et eʸ sont les racines de t² − st + P
      let u, v;
      do {
        u = h.int(1, 4);
        v = h.int(2, 6);
      } while (u >= v);
      const s = u + v,
        P = u * v;
      return {
        enonce: `<p>Résous dans $\\mathbb{R}^{2}$ le système $\\begin{cases} e^{x} + e^{y} = ${s} \\\\ e^{x+y} = ${P} \\end{cases}$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quel couple $(x\\,;\\,y)$ est solution ?",
            options: h.melange([
              { t: `$(${L(u)}\\,;\\,${L(v)})$`, ok: true },
              { t: `$(${u}\\,;\\,${v})$`, fb: `Tu as pris pour inconnues $e^{x}$ et $e^{y}$. Les inconnues sont $x$ et $y$ : $e^{x} = ${u}$ donne $x = ${L(u)}$.`, erreur: "inconnues prises pour eˣ, eʸ" },
              { t: "aucun couple, car $e^{x} + e^{y} = e^{x+y}$ est faux", fb: `Justement : $e^{x} + e^{y}$ ne se simplifie pas. On pose $t = e^{x}$ et $t' = e^{y}$ : $t + t' = ${s}$ et $tt' = ${P}$.`, erreur: "eˣ + eʸ = e^{x+y}" },
            ]),
          },
          { type: "nombre", q: "Quelle est la plus grande des deux valeurs de $e^{x}$ et $e^{y}$ ?", reponse: v, tol: { abs: 0.01 }, indice: "Ce sont les racines de $t^{2} - st + P = 0$, avec $s$ leur somme et $P$ leur produit.", pieges: [{ v: s, fb: `$${s}$ est la somme des deux valeurs. La plus grande est une racine de $t^{2} - ${s}t + ${P}$.`, erreur: "somme prise pour une racine" }] },
        ],
        correction: [
          { tex: `e^{x+y} = e^{x} \\times e^{y} = ${P}`, r: `On a donc $e^{x} + e^{y} = ${s}$ et $e^{x} e^{y} = ${P}$.` },
          { tex: `t^{2} - ${s}t + ${P} = 0 \\iff t = ${u} \\ \\text{ou}\\ t = ${v}`, r: "$e^{x}$ et $e^{y}$ sont les racines de ce trinôme (toutes deux strictement positives)." },
          { tex: `(x\\,;\\,y) = (${L(u)}\\,;\\,${L(v)}) \\ \\text{ou}\\ (${L(v)}\\,;\\,${L(u)})`, r: "On revient à $x$ et $y$ avec ln." },
        ],
      };
    },
  },

  /* ===================== séance 2 : « exp comme fonction » ===================== */

  /* 12 — limites habillées */
  {
    id: "exp-limite-facteur",
    titre: "Des limites avec un facteur",
    niveau: 2,
    seance: 2,
    capacites: ["maths-sexp 1.2.21", "maths-sm 1.3.14"],
    erreurs: ["facteur k oublié (réponse 1)", "∞ − ∞ pris pour 0"],
    gen(h) {
      const k = h.pick([-3, -2, 2, 3, 5]);
      const m = h.pick([2, 3, 5]);
      return {
        enonce: "<p>Calcule les limites suivantes, en reconnaissant des limites de base.</p>",
        questions: [
          {
            type: "qcm",
            q: `Que vaut $\\displaystyle\\lim_{x \\to 0} \\dfrac{e^{${kx(k)}} - 1}{x}$ ?`,
            options: h.melange([
              { t: `$${k}$`, ok: true },
              { t: "$1$", fb: `Tu as oublié le facteur $${k}$. Avec $h = ${kx(k)}$, $\\frac{e^{h} - 1}{x} = ${k} \\times \\frac{e^{h} - 1}{h}$.`, erreur: "facteur k oublié" },
              { t: "$0$", fb: "Tu as pris la forme $0/0$ pour $0$. Elle demande un calcul : on se ramène à $\\frac{e^{h} - 1}{h}$.", erreur: "forme 0/0 prise pour 0" },
            ]),
          },
          {
            type: "qcm",
            q: `Que vaut $\\displaystyle\\lim_{x \\to +\\infty} \\left(e^{x} - ${m}x\\right)$ ?`,
            options: h.melange([
              { t: "$+\\infty$", ok: true },
              { t: "$0$", fb: "Tu as pris la forme $\\infty - \\infty$ pour $0$. On factorise : $e^{x} - " + m + "x = x\\left(\\frac{e^{x}}{x} - " + m + "\\right)$, et $\\frac{e^{x}}{x} \\to +\\infty$.", erreur: "∞ − ∞ pris pour 0" },
              { t: "$-\\infty$", fb: `Tu as fait gagner $${m}x$. Mais $e^{x}$ l’emporte sur $x$ : la différence tend vers $+\\infty$.`, erreur: "croissances comparées à l’envers" },
            ]),
          },
        ],
        correction: [
          { tex: `\\dfrac{e^{${kx(k)}} - 1}{x} = ${k} \\times \\dfrac{e^{${kx(k)}} - 1}{${kx(k)}} \\longrightarrow ${k} \\times 1 = ${k}`, r: `On pose $h = ${kx(k)}$, qui tend vers $0$.` },
          { tex: `e^{x} - ${m}x = x\\left(\\dfrac{e^{x}}{x} - ${m}\\right) \\longrightarrow +\\infty`, r: "$\\frac{e^{x}}{x} \\to +\\infty$ : le facteur entre parenthèses tend vers $+\\infty$." },
        ],
      };
    },
  },

  /* 13 — l'étude d'une fonction */
  {
    id: "exp-etude",
    titre: "Étudier une fonction avec exp",
    niveau: 3,
    seance: 2,
    capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"],
    erreurs: ["lim_{−∞}(x + a)eˣ = −∞", "signe de f′ sans eˣ > 0", "asymptote oubliée"],
    gen(h) {
      if (h.pick([false, true])) {
        const a = h.pick([1, 2, 3]);
        const xa = `x + ${a}`;
        const xm = -a - 1;
        return {
          enonce: `<p>Soit $f(x) = (${xa})e^{x}$ pour tout réel $x$. On étudie $f$.</p>`,
          questions: [
            {
              type: "qcm",
              q: "Que vaut $\\displaystyle\\lim_{x \\to -\\infty} f(x)$ ?",
              options: h.melange([
                { t: "$0$", ok: true },
                { t: "$-\\infty$", fb: "Tu as fait gagner $x + a$. Mais $xe^{x} \\to 0$ et $e^{x} \\to 0$ en $-\\infty$ : l’exponentielle l’emporte, la limite est $0$.", erreur: "lim_{−∞}(x + a)eˣ = −∞" },
                { t: "$+\\infty$", fb: "Pour $x$ très négatif, $x + a < 0$ : le produit est négatif, il ne peut pas tendre vers $+\\infty$. Il tend vers $0$.", erreur: "signe du produit mal lu" },
              ]),
            },
            { type: "nombre", q: "En quelle abscisse $f'$ s’annule-t-elle ?", reponse: xm, tol: { abs: 0.01 }, indice: "$f'(x) = e^{x} + (x + a)e^{x} = (x + a + 1)e^{x}$ : un seul facteur s’annule.", pieges: [{ v: -a, fb: `Tu as annulé $${xa}$, qui est $f$ elle-même. La dérivée est $(x + ${a + 1})e^{x}$.`, erreur: "f et f′ confondues" }] },
            {
              type: "qcm",
              q: "La courbe de $f$ admet-elle une asymptote en $-\\infty$ ?",
              options: h.melange([
                { t: "Oui : l’axe des abscisses, $y = 0$", ok: true },
                { t: "Non, car $f$ tend vers l’infini", fb: "Tu as oublié l’asymptote : $f(x) \\to 0$ en $-\\infty$, donc l’axe $y = 0$ est asymptote.", erreur: "asymptote oubliée" },
                { t: `Oui : la droite $x = ${-a}$`, fb: `La droite $x = ${-a}$ est verticale : $f$ est définie en $${-a}$. L’asymptote en $-\\infty$ est horizontale.`, erreur: "asymptote verticale inventée" },
              ]),
            },
          ],
          correction: [
            { tex: `\\lim_{x \\to -\\infty} (${xa})e^{x} = \\lim_{x \\to -\\infty} xe^{x} + ${a === 1 ? "" : a}e^{x} = 0`, r: "$xe^{x} \\to 0$ et $e^{x} \\to 0$ en $-\\infty$." },
            { tex: `f'(x) = e^{x} + (${xa})e^{x} = (x + ${a + 1})e^{x}`, r: "Dérivée d’un produit." },
            { tex: `f'(x) \\ \\text{a le signe de}\\ x + ${a + 1} \\quad (e^{x} > 0)`, r: `$f$ décroît sur $]-\\infty,${xm}]$ puis croît : son minimum est $f(${xm}) = -e^{${xm}}$.` },
            { tex: "\\lim_{x \\to -\\infty} f(x) = 0", r: "La droite $y = 0$ est asymptote en $-\\infty$." },
          ],
        };
      }
      const b = h.pick([-2, -1, 1, 2, 3]);
      const fb = `x ${sg(b)}`;
      return {
        enonce: `<p>Soit $f(x) = ${fb} - e^{x}$ pour tout réel $x$. On étudie $f$.</p>`,
        questions: [
          {
            type: "qcm",
            q: "Quelle droite est asymptote à la courbe de $f$ en $-\\infty$ ?",
            options: h.melange([
              { t: `$y = ${fb}$`, ok: true },
              { t: `$y = ${b}$`, fb: `Tu as gardé la constante seule. Mais $f(x) - (${fb}) = -e^{x} \\to 0$ : c’est la droite $y = ${fb}$.`, erreur: "asymptote horizontale supposée" },
              { t: "aucune asymptote", fb: `Tu as oublié l’asymptote oblique : $f(x) - (${fb}) = -e^{x}$ tend vers $0$ en $-\\infty$.`, erreur: "asymptote oubliée" },
            ]),
          },
          { type: "nombre", q: "Quelle est la valeur maximale de $f$ ?", reponse: b - 1, tol: { abs: 0.01 }, indice: "$f'(x) = 1 - e^{x}$ s’annule en $x = 0$. Calcule $f(0)$.", pieges: [{ v: b, fb: `Tu as oublié le terme $-e^{0} = -1$ : $f(0) = ${b} - 1$.`, erreur: "e⁰ oublié" }] },
          {
            type: "qcm",
            q: "Que vaut $\\displaystyle\\lim_{x \\to +\\infty} f(x)$ ?",
            options: h.melange([
              { t: "$-\\infty$", ok: true },
              { t: "$+\\infty$", fb: "Tu as fait gagner le terme en $x$. Mais $e^{x}$ l’emporte sur $x$ : $x - e^{x} = x\\left(1 - \\frac{e^{x}}{x}\\right) \\to -\\infty$.", erreur: "croissances comparées à l’envers" },
              { t: "$0$", fb: "Tu as pris la forme $\\infty - \\infty$ pour $0$. On factorise par $x$ pour la lever.", erreur: "∞ − ∞ pris pour 0" },
            ]),
          },
        ],
        correction: [
          { tex: `f(x) - (${fb}) = -e^{x} \\longrightarrow 0 \\quad (x \\to -\\infty)`, r: `La droite $y = ${fb}$ est asymptote oblique en $-\\infty$.` },
          { tex: "f'(x) = 1 - e^{x}", r: "$f'(x) > 0$ équivaut à $e^{x} < 1$, soit $x < 0$." },
          { tex: `f(0) = ${b} - 1 = ${b - 1}`, r: "$f$ croît sur $]-\\infty,0]$ puis décroît : son maximum est $f(0)$." },
          { tex: "\\lim_{x \\to +\\infty} f(x) = \\lim_{x \\to +\\infty} x\\left(1 - \\dfrac{e^{x}}{x}\\right) = -\\infty", r: "$\\frac{e^{x}}{x} \\to +\\infty$." },
        ],
      };
    },
  },

  /* 14 — aˣ et xᵃ (SM) */
  {
    id: "exp-base-a",
    titre: "aˣ et xᵃ : l’exponentielle de base a",
    niveau: 2,
    seance: 2,
    filieres: ["SM"],
    capacites: ["maths-sm 1.3.12", "maths-sm 1.3.15"],
    erreurs: ["(aˣ)′ = x a^{x−1}", "(x^a)′ = ln x · x^a", "aˣ défini pour a ≤ 0"],
    gen(h) {
      const a = h.pick([2, 3, 5, "1/2"]);
      const aTex = a === "1/2" ? "\\dfrac{1}{2}" : `${a}`;
      const lna = a === "1/2" ? "-\\ln 2" : `\\ln ${a}`;
      const aS = a === "1/2" ? "\\left(\\dfrac{1}{2}\\right)" : `${a}`;
      return {
        enonce: `<p>Soit $a = ${aTex}$. Pour $a > 0$, on définit $a^{x} = e^{x \\ln a}$ pour tout réel $x$, et $x^{a} = e^{a \\ln x}$ pour $x > 0$.</p>`,
        questions: [
          {
            type: "qcm",
            q: `Quelle est l’écriture de $${aS}^{x}$ avec l’exponentielle de base $e$ ?`,
            options: h.melange([
              { t: `$e^{x \\times ${a === "1/2" ? "(-\\ln 2)" : `\\ln ${a}`}}$`, ok: true },
              { t: `$e^{${a === "1/2" ? "\\frac{1}{2}" : a} \\ln x}$`, fb: "Tu as échangé les rôles : $e^{a \\ln x} = x^{a}$ (la variable est la base). Pour $a^{x}$, la variable est l’exposant : $e^{x \\ln a}$.", erreur: "confondre aˣ et xᵃ" },
              { t: `$x\\,e^{${lna}}$`, fb: "Tu as sorti $x$ en facteur. Dans $a^{x} = e^{x\\ln a}$, $x\\ln a$ est l’exposant entier de $e$.", erreur: "exposant sorti en facteur" },
            ]),
          },
          {
            type: "qcm",
            q: `Quelle est la dérivée de $x \\mapsto ${aS}^{x}$ ?`,
            options: h.melange([
              { t: `$${lna}\\times ${aS}^{x}$`, ok: true },
              { t: `$x\\times ${aS}^{x-1}$`, fb: "Tu as appliqué la règle des puissances. Mais ici l’exposant varie : $(a^{x})' = (x\\ln a)'e^{x\\ln a} = \\ln a \\times a^{x}$.", erreur: "(aˣ)′ = x a^{x−1}" },
              { t: `$${aS}^{x}$`, fb: "Tu as oublié le facteur $\\ln a$ venu de la dérivée de l’exposant $x\\ln a$.", erreur: "(e^u)′ = e^u" },
            ]),
          },
          {
            type: "qcm",
            q: `Quelle est la dérivée de $x \\mapsto x^{${aTex}}$ sur $]0,+\\infty[$ ?`,
            options: h.melange([
              { t: `$${a === 2 ? "2x" : `${aTex}\\,x^{${a === "1/2" ? "\\frac{1}{2} - 1" : a - 1}}`}$`, ok: true },
              { t: `$\\ln x \\times x^{${aTex}}$`, fb: "Tu as dérivé comme si l’exposant variait. Ici l’exposant $a$ est fixe : $(x^{a})' = a\\,x^{a-1}$.", erreur: "(x^a)′ = ln x · x^a" },
              { t: `$x^{${aTex}} \\ln ${a === "1/2" ? "2" : a}$`, fb: "Tu as confondu $x^{a}$ et $a^{x}$. Ici $x$ est la base : la dérivée est $a\\,x^{a-1}$.", erreur: "confondre aˣ et xᵃ" },
            ]),
          },
          {
            type: "qcm",
            q: "Pour quelles valeurs de $a$ la fonction $x \\mapsto a^{x}$ est-elle définie sur $\\mathbb{R}$ ?",
            options: h.melange([
              { t: "$a > 0$", ok: true },
              { t: "$a \\ge 0$", fb: "Pour $a = 0$, $\\ln a$ n’existe pas : on ne peut pas écrire $e^{x\\ln a}$.", erreur: "aˣ défini pour a ≤ 0" },
              { t: "tout réel $a$", fb: "Pour $a < 0$, $\\ln a$ n’existe pas : $a^{x} = e^{x\\ln a}$ n’a pas de sens.", erreur: "aˣ défini pour a ≤ 0" },
            ]),
          },
        ],
        correction: [
          { tex: `${aS}^{x} = e^{x \\ln ${aTex}} = e^{x \\times (${lna})}`, r: "Définition : $a^{x} = e^{x\\ln a}$, pour $a > 0$." },
          { tex: `\\left(${aS}^{x}\\right)' = (${lna})\\,e^{x\\ln ${aTex}} = ${lna} \\times ${aS}^{x}`, r: "$(e^{u})' = u'e^{u}$ avec $u = x\\ln a$." },
          { tex: `\\left(x^{${aTex}}\\right)' = ${aTex}\\,x^{${aTex} - 1}`, r: "L’exposant est fixe : la règle des puissances s’applique." },
          { t: "$a^{x}$ n’est défini que pour $a > 0$ : il faut que $\\ln a$ existe." },
        ],
      };
    },
  },
];

function wrap(r) {
  return r < 0 ? `(${r})` : `${r}`;
}
function sgSigne(k) {
  return k < 0 ? `- ${-k}` : `+ ${k}`;
}

export const _fr = fr;
