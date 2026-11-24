// @ts-nocheck
/**
 * Les exercices de la leçon « Les suites numériques » (V3).
 * Format : voir modele.js. Chaque réponse est calculée ici ; le vérificateur
 * (scripts/pilotes-exercices.mjs) rejoue des centaines de tirages, et refuse un leurre qui
 * se confond avec la bonne réponse. Chaque leurre est de plus recalculé par un script de contrôle
 * à part (règle B3 : un leurre mène toujours à un résultat faux).
 *
 * Séance 1 « La machine » d'abord (gabarits 1 à 11), puis la séance 2 « Encadrer, comparer » (gabarits
 * 12 à 14), annoncée comme telle à l'élève.
 * Conventions des sujets : intervalles avec une virgule, ]a,b[.
 * Capacités : celles du cadre 2025 (maths-sexp et maths-sm 1.1.1 à 1.1.5) ; le seuil par ln (gabarit 10)
 * s'appuie aussi sur les inéquations logarithmiques, vues dans la leçon sur ln.
 * Écart au plan : le gabarit 10 n'offre pas q = 0,9 (ln 0,9 ne se tire pas des valeurs données en SM).
 */
import { frTex } from "./nombre.js";

const pgcd = (x, y) => (y ? pgcd(y, x % y) : Math.abs(x));
const LN = Math.log;
/** retire les options en double (même texte) en gardant la bonne */
const sansDoublon = (opts) => {
  const vus = new Set(opts.filter((o) => o.ok).map((o) => String(o.t)));
  return opts.filter((o) => {
    if (o.ok) return true;
    const t = String(o.t);
    if (vus.has(t)) return false;
    vus.add(t);
    return true;
  });
};
/** un nombre pour KaTeX : entier, décimal exact (jusqu'à 3 décimales) ou fraction simplifiée */
const nb = (x) => {
  if (Number.isInteger(x)) return String(x);
  for (const d of [2, 4, 5, 8, 10, 100, 1000]) if (Math.abs(x * d - Math.round(x * d)) < 1e-9) return String(+x.toFixed(3)).replace(".", "{,}");
  for (const d of [3, 6, 9, 12]) {
    const n = Math.round(x * d);
    if (Math.abs(x * d - n) < 1e-9) {
      const g = pgcd(Math.abs(n), d), N = n / g, D = d / g;
      return N < 0 ? `-\\dfrac{${-N}}{${D}}` : `\\dfrac{${N}}{${D}}`;
    }
  }
  return frTex(x, 2);
};
/** un facteur a devant une variable : ½x, ⅓x, 2x, 3x */
const FAC = { 0.5: "\\dfrac{1}{2}", [1 / 3]: "\\dfrac{1}{3}", [2 / 3]: "\\dfrac{2}{3}", 0.75: "\\dfrac{3}{4}" };
const fa = (a) => FAC[a] ?? nb(a);
/** + b, − b (b non nul) */
const sg = (b) => (b < 0 ? `- ${-b}` : `+ ${b}`);
/** « a u_n + b » */
const lin = (a, v, b) => `${fa(a)}\\,${v} ${sg(b)}`;
/** les leurres numériques : retire ceux qui se confondent avec la bonne réponse (ou entre eux) à la tolérance près */
const distincts = (rep, pieges, tol) => {
  const vus = [rep];
  return pieges.filter((p) => {
    if (!Number.isFinite(p.v) || vus.some((v) => Math.abs(v - p.v) <= tol * 2)) return false;
    vus.push(p.v);
    return true;
  });
};
const pickN = (h, arr, n) => h.melange(arr).slice(0, n);
/** a ∈ {½, ⅓, ⅔, ¾}, un point fixe entier ℓ et b = ℓ(1 − a) entier */
const AFFINES = [
  { a: 0.5, l: [2, 4, 6, 8, 10] },
  { a: 1 / 3, l: [3, 6, 9] },
  { a: 2 / 3, l: [3, 6, 9] },
  { a: 0.75, l: [4, 8] },
];
const tirerAffine = (h) => {
  const A = h.pick(AFFINES), a = A.a, l = h.pick(A.l);
  return { a, l, b: Math.round(l * (1 - a)) };
};

export const EXERCICES = [
  /* ===================== séance 1 : « La machine » ===================== */

  /* 1 — les suites arithmétiques et géométriques, et la forme a·u_n + b */
  {
    id: "suites-base",
    titre: "Arithmétique, géométrique : calculer des termes",
    niveau: 1,
    capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1"],
    erreurs: ["arithmétique et géométrique confondues", "un pas de trop (u_0·q^{k+1})", "a(u_n + b) au lieu de a·u_n + b"],
    gen(h) {
      const arith = h.pick([true, false]);
      const k = h.int(4, 7);
      let q = 0, r = 0, u0, ux;
      let rep, pieges;
      if (arith) {
        do { u0 = h.int(-3, 5); r = h.int(-3, 4); } while (!u0 || !r);
        rep = u0 + k * r;
        pieges = [
          { v: u0 * Math.pow(r, k), fb: `Tu as traité une arithmétique comme une géométrique : $u_0 \\times r^{${k}}$. On ajoute $r$ à chaque pas : $u_n = u_0 + nr$.`, erreur: "arithmétique et géométrique confondues" },
          { v: u0 + (k + 1) * r, fb: `Tu as compté un pas de trop. De $u_0$ à $u_{${k}}$, il y a ${k} pas : $u_{${k}} = u_0 + ${k}r$.`, erreur: "pas et termes confondus" },
        ];
        ux = `<p>La suite $(u_n)$ est arithmétique, de premier terme $u_0 = ${u0}$ et de raison $r = ${r}$.</p>`;
      } else {
        do { u0 = h.int(-3, 5); q = h.pick([-2, 0.5, 2, 3]); } while (!u0);
        rep = u0 * Math.pow(q, k);
        pieges = [
          { v: u0 + k * q, fb: `Tu as traité une géométrique comme une arithmétique : $u_0 + ${k}q$. On multiplie par $q$ à chaque pas : $u_n = u_0 q^n$.`, erreur: "arithmétique et géométrique confondues" },
          { v: u0 * Math.pow(q, k + 1), fb: `Tu as compté un pas de trop : $u_0 q^{${k + 1}}$. De $u_0$ à $u_{${k}}$, il y a ${k} pas : $u_{${k}} = u_0 q^{${k}}$.`, erreur: "un pas de trop" },
        ];
        ux = `<p>La suite $(u_n)$ est géométrique, de premier terme $u_0 = ${u0}$ et de raison $q = ${nb(q)}$.</p>`;
      }
      // la forme u_{n+1} = a·u_n + b
      let a, b, v0;
      do { a = h.pick([0.5, 1 / 3, 2, 3]); b = h.int(-3, 4); v0 = h.int(-2, 5); } while (!b || (v0 * a + b) === a * (v0 + b) || a * v0 === 0);
      const w1 = a * v0 + b, w2 = a * w1 + b;
      const e1 = a * (v0 + b), e2 = a * (e1 + b);
      const pb = distincts(w2, [
        { v: e2, fb: `Tu as écrit $a(u_n + b)$ au lieu de $a\\,u_n + b$. Chaque pas multiplie $u_n$ par $a$, puis ajoute $b$.`, erreur: "a(u_n + b) au lieu de a·u_n + b" },
        { v: w1, fb: "Tu t’es arrêté à $u_1$. Il faut un pas de plus : $u_2 = a\\,u_1 + b$.", erreur: "un pas de moins" },
        { v: v0 + 2 * b, fb: "Tu as ajouté $b$ à chaque pas sans multiplier par $a$ : c’est une arithmétique. Ici, $u_{n+1} = a\\,u_n + b$.", erreur: "arithmétique et géométrique confondues" },
      ], 0.01);
      return {
        enonce: `${ux}<p>Une autre suite est définie par $u_0 = ${v0}$ et, pour tout entier $n$, $u_{n+1} = ${lin(a, "u_n", b)}$.</p>`,
        questions: [
          { type: "nombre", q: `Que vaut $u_{${k}}$ pour la première suite ? (valeur approchée à $0{,}01$ près)`, reponse: rep, tol: { abs: 0.01 }, indice: arith ? "Une arithmétique : $u_n = u_0 + nr$." : "Une géométrique : $u_n = u_0 q^n$.", pieges: distincts(rep, pieges, 0.01) },
          { type: "nombre", q: "Pour la seconde suite, que vaut $u_2$ ? (valeur approchée à $0{,}01$ près)", reponse: w2, tol: { abs: 0.01 }, indice: "Calcule $u_1$ à partir de $u_0$, puis $u_2$ à partir de $u_1$.", pieges: pb },
        ],
        correction: [
          arith ? { tex: `u_{${k}} = u_0 + ${k}r = ${u0} + ${k} \\times ${nb(r)} = ${nb(rep)}`, r: "Une suite arithmétique ajoute $r$ à chaque pas." } : { tex: `u_{${k}} = u_0 q^{${k}} = ${u0} \\times ${nb(q)}^{${k}} \\approx ${frTex(rep, 3)}`, r: "Une suite géométrique multiplie par $q$ à chaque pas." },
          { tex: `u_1 = ${fa(a)} \\times ${v0} ${sg(b)} \\approx ${frTex(w1, 3)}`, r: "On applique la relation à $u_0$." },
          { tex: `u_2 = ${fa(a)} \\times u_1 ${sg(b)} \\approx ${frTex(w2, 3)}`, r: "Puis à $u_1$, jamais deux pas d’un coup." },
        ],
      };
    },
  },

  /* 2 — la récurrence pour u_{n+1} = a·u_n + b */
  {
    id: "recurrence-affine",
    titre: "Une récurrence : initialisation et hérédité",
    niveau: 2,
    capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"],
    erreurs: ["hérédité sans hypothèse", "initialisation oubliée", "rang n + 1 utilisé dans l’hypothèse", "a(u_n + b) au lieu de a·u_n + b"],
    gen(h) {
      const { a, l, b } = tirerAffine(h);
      const sous = h.pick([true, false]); // u_0 < ℓ ou u_0 > ℓ
      const d = h.int(1, 3);
      const u0 = sous ? l - d : l + d;
      const op = sous ? "<" : ">", opT = sous ? "\\lt" : "\\gt";
      const u1 = a * u0 + b;
      const ordre = a * (u0 + b);
      const bonne = `${fa(a)}\\,u_n ${sg(b)} ${opT} ${fa(a)} \\times ${l} ${sg(b)} = ${l}`;
      return {
        enonce: `<p>Soit la suite définie par $u_0 = ${u0}$ et $u_{n+1} = ${lin(a, "u_n", b)}$. On veut montrer par récurrence que $u_n ${opT} ${l}$ pour tout entier $n$.</p>`,
        questions: [
          { type: "qcm", q: `Dans l’hérédité, on suppose $u_n ${opT} ${l}$. Quelle est la ligne qui suit ?`, options: h.melange([
            { t: `$${bonne}$`, ok: true },
            { t: `$u_{n+1} ${opT} ${l}$, car $${fa(a)}\\,x ${sg(b)} ${opT} ${l}$ pour tout réel $x$`, fb: `Tu as écrit une hérédité sans hypothèse : $${fa(a)}\\,x ${sg(b)} ${opT} ${l}$ n’est pas vrai pour tout réel $x$. Il faut partir de $u_n ${opT} ${l}$.`, erreur: "hérédité sans hypothèse" },
            { t: `$${fa(a)}\\,u_{n+1} ${sg(b)} ${opT} ${l}$`, fb: "Tu as utilisé le rang $n + 1$ dans l’hypothèse, alors qu’on ne sait encore rien de $u_{n+1}$. L’hypothèse porte sur $u_n$.", erreur: "rang n + 1 utilisé" },
          ]) },
          { type: "qcm", q: "Que faut-il vérifier d’abord, au rang 0 ?", options: h.melange([
            { t: `$u_0 ${opT} ${l}$ : ici $${u0} ${opT} ${l}$`, ok: true },
            { t: "rien : l’hérédité suffit", fb: "Tu as oublié l’initialisation. Sans premier domino, l’hérédité ne démarre pas : il faut vérifier la propriété au rang 0.", erreur: "initialisation oubliée" },
            { t: `$u_1 ${opT} ${l}$ : ici $${nb(u1)} ${opT} ${l}$`, fb: "Tu as vérifié le rang 1. L’initialisation porte sur le premier rang, $n = 0$ : c’est la propriété pour $u_0$.", erreur: "initialisation décalée" },
          ]) },
          { type: "nombre", q: "Que vaut $u_1$ ? (valeur approchée à $0{,}01$ près)", reponse: u1, tol: { abs: 0.01 }, indice: "Applique la relation une seule fois, à $u_0$.", pieges: distincts(u1, [{ v: ordre, fb: "Tu as écrit $a(u_0 + b)$ au lieu de $a\\,u_0 + b$. On multiplie $u_0$ par $a$, puis on ajoute $b$.", erreur: "a(u_n + b) au lieu de a·u_n + b" }], 0.01) },
        ],
        correction: [
          { tex: `u_0 = ${u0} ${opT} ${l}`, r: "Initialisation : la propriété est vraie au rang 0." },
          { tex: `u_n ${opT} ${l} \\Longrightarrow ${fa(a)}\\,u_n ${sg(b)} ${opT} ${fa(a)} \\times ${l} ${sg(b)} = ${l}`, r: `Hérédité : on multiplie par $${fa(a)} > 0$, l’ordre est gardé, puis on ajoute $${b}$.` },
          { t: `Conclusion : pour tout entier $n$, $u_n ${opT} ${l}$. Ici $u_1 = ${nb(u1)}$.` },
        ],
      };
    },
  },

  /* 3 — la récurrence avec une fonction croissante */
  {
    id: "recurrence-f-croissante",
    titre: "Une récurrence avec une fonction croissante",
    niveau: 2,
    capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"],
    erreurs: ["ordre renversé (f traitée comme décroissante)", "f(x) < b pour tout x", "ln appliqué au lieu de f"],
    gen(h) {
      const cas = h.pick([
        { id: "rac", c: h.pick([2, 6, 12]) },
        { id: "ln" },
        { id: "aff", b: h.pick([1, 2, 3]) },
      ]);
      let f, ftex, a, bb, fa_, fb_, intervalle;
      if (cas.id === "rac") { const l = (1 + Math.sqrt(1 + 4 * cas.c)) / 2; f = (x) => Math.sqrt(x + cas.c); ftex = `\\sqrt{x + ${cas.c}}`; a = 0; bb = l; }
      else if (cas.id === "ln") { f = (x) => 1 + LN(x); ftex = "1 + \\ln x"; a = 1; bb = Math.E; }
      else { f = (x) => x / 2 + cas.b; ftex = `\\dfrac{x}{2} + ${cas.b}`; a = 0; bb = 2 * cas.b; }
      fa_ = f(a); fb_ = f(bb);
      const tx = (x) => (Math.abs(x - Math.E) < 1e-12 ? "e" : cas.id === "rac" && x === bb ? String(bb) : nb(x));
      const A = tx(a), B = tx(bb), FA = cas.id === "rac" ? `\\sqrt{${cas.c}}` : cas.id === "ln" ? "1" : String(cas.b), FB = cas.id === "ln" ? "2" : B;
      intervalle = `[${A}\\,;\\,${B}]`.replace("\\,;\\,", "\\,;\\,");
      const opts = [
        { t: `$f(${A}) \\le f(u_n) \\le f(${B})$, car $f$ est croissante sur $${intervalle}$`, ok: true },
        { t: `$f(${B}) \\le f(u_n) \\le f(${A})$, car $f$ renverse l’ordre`, fb: "Tu as renversé l’ordre, comme pour une fonction décroissante. $f$ est croissante : elle garde l’ordre.", erreur: "ordre renversé (f traitée comme décroissante)" },
        { t: `$u_{n+1} = f(u_n) \\le ${B}$, car $f(x) \\le ${B}$ pour tout réel $x$`, fb: `Tu as écrit une hérédité sans hypothèse : $f(x) \\le ${B}$ est faux pour $x$ grand. Il faut partir de $${A} \\le u_n \\le ${B}$.`, erreur: "f(x) < b pour tout x" },
      ];
      if (cas.id === "ln") opts.push({ t: `$\\ln ${A} \\le \\ln u_n \\le \\ln ${B}$, donc $0 \\le u_{n+1} \\le 1$`, fb: "Tu as appliqué ln au lieu de $f$. L’hérédité applique la fonction de la suite : $u_{n+1} = f(u_n) = 1 + \\ln u_n$.", erreur: "ln appliqué au lieu de f" });
      const bons = opts.filter((o) => o.ok), faux = pickN(h, opts.filter((o) => !o.ok), 2);
      return {
        enonce: `<p>Soit $f(x) = ${ftex}$ et la suite définie par $u_{n+1} = f(u_n)$, avec $u_0 \\in ${intervalle}$. On donne : $f$ est continue et croissante sur $${intervalle}$, $f(${A}) = ${FA}$ et $f(${B}) = ${FB}$.</p><p>On montre par récurrence que $${A} \\le u_n \\le ${B}$.</p>`,
        questions: [
          { type: "qcm", q: `Dans l’hérédité, on suppose $${A} \\le u_n \\le ${B}$. Quelle est la ligne suivante ?`, options: h.melange([...bons, ...faux]) },
          {
            type: "nombre",
            q: "Quelle valeur obtient-on pour la borne inférieure de $u_{n+1}$, c’est-à-dire $f$ de la borne inférieure ? (valeur approchée à $0{,}01$ près)",
            reponse: fa_,
            tol: { abs: 0.01 },
            indice: "$f$ garde l’ordre : la borne inférieure de $u_{n+1}$ est l’image de la borne inférieure.",
            pieges: distincts(fa_, [
              { v: fb_, fb: "Tu as pris l’image de la borne supérieure. $f$ est croissante : la borne inférieure de $u_{n+1}$ est $f$ de la borne inférieure.", erreur: "ordre renversé (f traitée comme décroissante)" },
              { v: a, fb: "Tu as recopié la borne de $u_n$. La borne de $u_{n+1}$ est son image par $f$.", erreur: "borne non transformée" },
            ], 0.01),
          },
        ],
        correction: [
          { tex: `${A} \\le u_n \\le ${B}`, r: "L’hypothèse de récurrence, à un rang $n$ fixé." },
          { tex: `f(${A}) \\le f(u_n) \\le f(${B})`, r: "$f$ est croissante sur l’intervalle : elle garde l’ordre." },
          { tex: `${FA} \\le u_{n+1} \\le ${FB}`, r: `On remplace par $f(${A})$ et $f(${B})$ : cela reste dans $${intervalle}$.` },
        ],
      };
    },
  },

  /* 4 — la monotonie : le signe de u_{n+1} − u_n */
  {
    id: "monotonie",
    titre: "Le sens de variation d’une suite récurrente",
    niveau: 2,
    capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"],
    erreurs: ["f croissante donc suite croissante", "signe de f(x) − x lu sur le mauvais intervalle", "différence inversée"],
    gen(h) {
      const { a, l, b } = tirerAffine(h);
      const sous = h.pick([true, false]);
      const d = h.int(1, 3);
      const u0 = sous ? l - d : l + d;
      const diff = (a - 1) * u0 + b; // u_1 − u_0
      const verbe = sous ? "croissante" : "décroissante", autre = sous ? "décroissante" : "croissante";
      const opts = [
        { t: `${verbe} : $u_{n+1} - u_n = ${fa(1 - a)}\\,(${l} - u_n)$ est ${sous ? "positif" : "négatif"} là où vivent les $u_n$`, ok: true },
      ];
      const faux = sous
        ? [
            { t: `${autre} : on a étudié $u_n - u_{n+1}$, qui est positif`, fb: "Tu as inversé la différence : $u_n - u_{n+1}$ a le signe contraire de $u_{n+1} - u_n$. On étudie $u_{n+1} - u_n$.", erreur: "différence inversée" },
            { t: `${autre} : $f(x) - x < 0$ sur $]${l}\\,;\\,+\\infty[$`, fb: `Tu as lu le signe de $f(x) - x$ sur $]${l}\\,;\\,+\\infty[$, pas là où vivent les $u_n$ (ils sont sous $${l}$).`, erreur: "signe de f(x) − x lu sur le mauvais intervalle" },
          ]
        : [
            { t: "croissante : $f$ est croissante", fb: "Tu as lu le sens de la suite sur celui de $f$. Le sens de $f$ ne dit pas celui de la suite : on étudie $u_{n+1} - u_n$.", erreur: "f croissante donc suite croissante" },
            { t: `croissante : $f(x) - x > 0$ sur $]-\\infty\\,;\\,${l}[$`, fb: `Tu as lu le signe de $f(x) - x$ sur $]-\\infty\\,;\\,${l}[$, pas là où vivent les $u_n$ (ils sont au-dessus de $${l}$).`, erreur: "signe de f(x) − x lu sur le mauvais intervalle" },
          ];
      return {
        enonce: `<p>Soit $f(x) = ${lin(a, "x", b)}$, croissante sur $\\mathbb{R}$, et la suite définie par $u_0 = ${u0}$ et $u_{n+1} = f(u_n)$. Le point fixe de $f$ est $\\ell = ${l}$, et tous les $u_n$ restent ${sous ? "au-dessous" : "au-dessus"} de $${l}$.</p>`,
        questions: [
          { type: "qcm", q: "Que dire du sens de variation de $(u_n)$ ?", options: h.melange([...opts, ...faux]) },
          { type: "nombre", q: "Que vaut $u_1 - u_0$ ? (valeur approchée à $0{,}01$ près)", reponse: diff, tol: { abs: 0.01 }, indice: "$u_1 = f(u_0)$ : calcule $f(u_0) - u_0$.", pieges: distincts(diff, [
            { v: -diff, fb: "Tu as calculé $u_0 - u_1$ : la différence est inversée. On étudie $u_{n+1} - u_n$.", erreur: "différence inversée" },
            { v: a * u0 + b, fb: "Tu as donné $u_1$, pas la différence $u_1 - u_0$.", erreur: "terme pris pour la différence" },
          ], 0.01) },
        ],
        correction: [
          { tex: `u_{n+1} - u_n = f(u_n) - u_n = ${fa(1 - a)}\\,(${l} - u_n)`, r: `Car $${lin(a, "x", b)} - x = ${fa(1 - a)}(${l} - x)$.` },
          { t: `Les $u_n$ restent ${sous ? "au-dessous" : "au-dessus"} de $${l}$ : $${l} - u_n ${sous ? ">" : "<"} 0$, donc $(u_n)$ est ${verbe}.` },
          { tex: `u_1 - u_0 = ${nb(diff)}`, r: `Le signe est bien ${sous ? "positif" : "négatif"}.` },
        ],
      };
    },
  },

  /* 5 — le critère de convergence monotone */
  {
    id: "critere-convergence",
    titre: "Croissante, majorée : que conclure ?",
    niveau: 2,
    capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"],
    erreurs: ["un majorant pris pour la limite", "croissante donc +∞", "une seule hypothèse suffit", "bornée donc monotone"],
    gen(h) {
      const type = h.pick(["A", "B", "C", "D"]);
      const L = h.int(1, 6), d = h.int(1, 4);
      if (type === "A" || type === "B") {
        const A = type === "A";
        const M = A ? L + d : L - d;
        const adj = A ? "croissante et majorée par" : "décroissante et minorée par";
        const dir = A ? "≤" : "≥";
        return {
          enonce: `<p>La suite $(u_n)$ est ${adj} $${M}$. On sait de plus que sa limite est $${L}$.</p>`,
          questions: [
            { type: "qcm", q: "Que conclure du critère de convergence monotone ?", options: h.melange([
              { t: `elle converge, vers une limite $${A ? "\\le" : "\\ge"} ${M}$`, ok: true },
              { t: `elle converge vers $${M}$`, fb: `Tu as pris ${A ? "le majorant" : "le minorant"} pour la limite. Un tel nombre borne la limite, il ne la fixe pas : ici la limite est $${L}$.`, erreur: "un majorant pris pour la limite" },
              { t: `elle tend vers ${A ? "$+\\infty$, car elle est croissante" : "$-\\infty$, car elle est décroissante"}`, fb: `Tu as oublié la borne : une suite ${A ? "majorée ne peut pas tendre vers $+\\infty$" : "minorée ne peut pas tendre vers $-\\infty$"}.`, erreur: "croissante donc +∞" },
            ]) },
            { type: "nombre", q: "Quelle est la valeur de sa limite ?", reponse: L, tol: { abs: 0.01 }, indice: `${A ? "Un majorant" : "Un minorant"} n’est pas unique : est-ce la limite ?`, pieges: [{ v: M, fb: `Tu as donné ${A ? "le majorant" : "le minorant"} $${M}$. La limite est donnée : $${L}$.`, erreur: "un majorant pris pour la limite" }] },
          ],
          correction: [
            { t: `$(u_n)$ est ${A ? "croissante et majorée" : "décroissante et minorée"} : elle converge (critère admis).` },
            { tex: `\\lim u_n = ${L} ${dir} ${M}`, r: `${A ? "Un majorant" : "Un minorant"} borne la limite, il n’est pas la limite.` },
          ],
        };
      }
      const C = type === "C";
      return {
        enonce: C ? `<p>La suite $(u_n)$ est croissante.</p>` : `<p>La suite $(u_n)$ est bornée : $-${d} \\le u_n \\le ${L + d}$.</p>`,
        questions: [
          { type: "qcm", q: "Que peut-on conclure sur sa convergence ?", options: h.melange(C ? [
            { t: "rien encore : elle converge ou tend vers $+\\infty$", ok: true },
            { t: "elle converge", fb: "Tu as oublié qu’il manque une hypothèse. Croissante seule, elle peut tendre vers $+\\infty$ : il faut aussi qu’elle soit majorée.", erreur: "une seule hypothèse suffit" },
            { t: "elle tend vers $+\\infty$, car elle est croissante", fb: "Tu as cru que croissante suffit pour tendre vers $+\\infty$. Si elle est majorée, elle converge : tout dépend d’une borne.", erreur: "croissante donc +∞" },
          ] : [
            { t: "rien encore : il manque la monotonie", ok: true },
            { t: "elle converge, car elle est bornée", fb: "Tu as cru qu’être bornée suffit. $(-1)^n$ est bornée et ne converge pas : il faut aussi la monotonie.", erreur: "une seule hypothèse suffit" },
            { t: "elle est monotone, car elle est bornée", fb: "Tu as cru qu’une suite bornée est monotone. $(-1)^n$ est bornée, ni croissante ni décroissante.", erreur: "bornée donc monotone" },
          ]) },
          { type: "qcm", q: "Quelle hypothèse faut-il ajouter pour appliquer le critère ?", options: h.melange(C ? [
            { t: "qu’elle est majorée", ok: true },
            { t: "qu’elle est minorée", fb: "Tu as ajouté la mauvaise borne. Une suite croissante est déjà minorée par son premier terme : c’est un majorant qui manque.", erreur: "mauvaise borne" },
            { t: "qu’elle converge", fb: "Tu as ajouté ce qu’on veut démontrer. L’hypothèse à ajouter est une borne : une suite croissante et majorée converge.", erreur: "hérédité circulaire" },
          ] : [
            { t: "qu’elle est monotone", ok: true },
            { t: "qu’elle est positive", fb: "Tu as ajouté un signe, qui ne change rien. Le critère demande la monotonie : une suite bornée et monotone converge.", erreur: "une seule hypothèse suffit" },
            { t: "qu’elle est continue", fb: "Une suite n’est pas « continue ». Le critère demande la monotonie : bornée et monotone, elle converge.", erreur: "confusion suite et fonction" },
          ]) },
        ],
        correction: [
          { t: C ? "Croissante seule : il manque un majorant. Croissante et majorée, elle converge." : "Bornée seule ne suffit pas : $(-1)^n$ est bornée sans converger. Il faut la monotonie." },
          { t: "Le critère de convergence monotone demande les deux hypothèses à la fois : la monotonie et une borne dans le bon sens." },
        ],
      };
    },
  },

  /* 6 — le point fixe : ℓ = f(ℓ) après la convergence */
  {
    id: "point-fixe",
    titre: "La limite par ℓ = f(ℓ)",
    niveau: 2,
    capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4", "maths-sexp 1.1.2"],
    erreurs: ["un point fixe prouve la convergence", "la limite dépend du terme initial", "racine négative gardée", "un majorant pris pour la limite"],
    gen(h) {
      // (b) une fois sur quatre : a ∈ {2, 3, −2}, la suite diverge
      if (h.int(1, 4) === 1) {
        const a = h.pick([2, 3, -2]);
        let l, u0;
        do { l = h.int(-3, 4); u0 = l + h.pick([-2, -1, 1, 2]); } while (u0 === l);
        const b = l * (1 - a);
        return {
          enonce: `<p>Soit $(v_n)$ définie par $v_0 = ${u0}$ et $v_{n+1} = ${a}\\,v_n ${sg(b)}$. On résout $\\ell = ${a}\\,\\ell ${sg(b)}$.</p>`,
          questions: [
            { type: "nombre", q: "Quelle est la solution $\\ell$ de cette équation ?", reponse: l, tol: { abs: 0.01 }, indice: `Résous $\\ell = ${a}\\ell ${sg(b)}$.`, pieges: distincts(l, [{ v: u0, fb: "Tu as donné $v_0$. $\\ell$ est la solution de $\\ell = f(\\ell)$, pas le terme initial.", erreur: "la limite dépend du terme initial" }], 0.01) },
            { type: "qcm", q: "Peut-on en conclure que $(v_n)$ converge vers $\\ell$ ?", options: h.melange([
              { t: `non : $v_n - \\ell = ${a}^n\\,(v_0 - \\ell)$ ne tend pas vers $0$`, ok: true },
              { t: "oui : la limite vérifie $\\ell = f(\\ell)$", fb: "Tu as cru que résoudre $\\ell = f(\\ell)$ prouve la convergence. Elle dit où aller, si l’on y va : ici l’écart à $\\ell$ est multiplié par $a$ à chaque pas.", erreur: "un point fixe prouve la convergence" },
              { t: `oui, vers $v_0 = ${u0}$`, fb: "Tu as pris le terme initial pour la limite. La limite ne dépend pas du départ, et ici il n’y a pas de limite finie.", erreur: "la limite dépend du terme initial" },
            ]) },
          ],
          correction: [
            { tex: `\\ell = ${a}\\,\\ell ${sg(b)} \\iff \\ell = ${l}`, r: "Le point fixe de $f$." },
            { tex: `v_n - ${nb(l)} = ${a}^{n}\\,(${u0} ${l < 0 ? "+" : "-"} ${Math.abs(l)})`, r: `L’écart au point fixe est multiplié par $${a}$ à chaque pas : $|${a}| > 1$, il ne tend pas vers $0$.` },
          ],
        };
      }
      const cas = h.pick(["aff", "rac", "ln", "bac22"]);
      if (cas === "aff") {
        const { a, l, b } = tirerAffine(h);
        const u0 = l + h.pick([-2, -1, 1, 2]);
        return {
          enonce: `<p>La suite définie par $u_0 = ${u0}$ et $u_{n+1} = ${lin(a, "u_n", b)}$ converge (admis).</p>`,
          questions: [{ type: "nombre", q: "Quelle est sa limite $\\ell$ ?", reponse: l, tol: { abs: 0.01 }, indice: `$\\ell$ vérifie $\\ell = ${fa(a)}\\,\\ell ${sg(b)}$.`, pieges: distincts(l, [
            { v: u0, fb: "Tu as donné $u_0$. La limite ne dépend pas du départ : elle vérifie $\\ell = f(\\ell)$.", erreur: "la limite dépend du terme initial" },
            { v: b, fb: `Tu as donné la constante $b$. Le plateau n’est pas $b$ : on résout $\\ell = ${fa(a)}\\,\\ell ${sg(b)}$.`, erreur: "constante prise pour la limite" },
          ], 0.01) }],
          correction: [
            { tex: `\\ell = ${fa(a)}\\,\\ell ${sg(b)}`, r: "La limite d’une suite convergente vérifie $\\ell = f(\\ell)$, car $f$ est continue." },
            { tex: `\\ell = ${l}`, r: `On résout : $(1 - ${fa(a)})\\,\\ell = ${b}$.` },
          ],
        };
      }
      if (cas === "rac") {
        const c = h.pick([2, 6, 12]), l = (1 + Math.sqrt(1 + 4 * c)) / 2, neg = 1 - l;
        return {
          enonce: `<p>La suite définie par $u_0 = 0$ et $u_{n+1} = \\sqrt{u_n + ${c}}$ converge (admis), et tous ses termes sont positifs.</p>`,
          questions: [{ type: "nombre", q: "Quelle est sa limite $\\ell$ ?", reponse: l, tol: { abs: 0.01 }, indice: `$\\ell^2 = \\ell + ${c}$ a deux solutions : l’une est négative.`, pieges: distincts(l, [
            { v: neg, fb: `Tu as gardé la racine négative $${neg}$. Tous les termes sont positifs : la limite l’est aussi.`, erreur: "racine négative gardée" },
            { v: 0, fb: "Tu as donné $u_0$. La limite ne dépend pas du départ.", erreur: "la limite dépend du terme initial" },
          ], 0.01) }],
          correction: [
            { tex: `\\ell = \\sqrt{\\ell + ${c}} \\Longrightarrow \\ell^2 - \\ell - ${c} = 0`, r: "On élève au carré, avec $\\ell \\ge 0$." },
            { tex: `\\ell = ${l} \\quad (\\text{et } ${neg} \\text{ est rejeté})`, r: "Les termes sont positifs : la limite est positive." },
          ],
        };
      }
      if (cas === "ln") {
        return {
          enonce: "<p>La suite définie par $u_0 = 2$ et $u_{n+1} = 1 + \\ln u_n$ converge (admis), avec $1 \\le u_n \\le 2$.</p>",
          questions: [{ type: "nombre", q: "Quelle est sa limite $\\ell$ ?", reponse: 1, tol: { abs: 0.01 }, indice: "$\\ell = 1 + \\ln \\ell$ : quel $\\ell$ de $[1\\,;\\,2]$ convient ?", pieges: [
            { v: 2, fb: "Tu as donné $u_0$, ou le majorant $2$. La limite vérifie $\\ell = 1 + \\ln \\ell$ : $2$ ne la vérifie pas.", erreur: "un majorant pris pour la limite" },
            { v: Math.E, fb: "Tu as donné $e$, la borne de l’intervalle : ce n’est pas la limite. $\\ell = 1 + \\ln \\ell$ n’est pas vérifiée par $e$.", erreur: "un majorant pris pour la limite" },
          ] }],
          correction: [
            { tex: "\\ell = 1 + \\ln \\ell \\iff \\ln \\ell = \\ell - 1", r: "$\\ln x \\le x - 1$, avec égalité seulement en $1$." },
            { tex: "\\ell = 1", r: "Seule solution de l’équation." },
          ],
        };
      }
      const ln4 = LN(4);
      return {
        enonce: "<p>On pose $f(x) = x\\left(e^{x/2} - 1\\right)^{2}$, $u_0 = 1$ et $u_{n+1} = f(u_n)$. La suite est décroissante, minorée par $0$, donc convergente. Les solutions de $f(\\ell) = \\ell$ sont $0$ et $\\ln 4 \\approx 1{,}39$.</p>",
        questions: [{ type: "nombre", q: "Quelle est sa limite $\\ell$ ?", reponse: 0, tol: { abs: 0.01 }, indice: "La suite décroît à partir de $1$ : laquelle des deux solutions est atteignable ?", pieges: [
          { v: ln4, fb: `Tu as pris l’autre solution, ${"$\\ln 4$"}. Une suite décroissante partie de $1$ ne remonte pas à $\\ln 4 \\approx 1{,}39$.`, erreur: "un majorant pris pour la limite" },
          { v: 1, fb: "Tu as donné $u_0$. $f(1) \\ne 1$ : $1$ n’est pas un point fixe.", erreur: "la limite dépend du terme initial" },
        ] }],
        correction: [
          { tex: "\\ell \\le u_0 = 1 < \\ln 4", r: "La suite est décroissante : sa limite est au plus $u_0$." },
          { tex: "\\ell = 0", r: "Seule solution de $f(\\ell) = \\ell$ qui convient." },
        ],
      };
    },
  },

  /* 7 — les suites de référence q^n */
  {
    id: "limite-geometrique",
    titre: "Limite de a·qⁿ + b",
    niveau: 1,
    capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"],
    erreurs: ["q < 0 donc pas de limite", "qⁿ → 0 pour q ≤ −1", "1ⁿ → +∞", "−∞ au lieu de 0"],
    gen(h) {
      const Q = [{ t: "-\\dfrac{3}{2}", v: -1.5 }, { t: "-1", v: -1 }, { t: "-\\dfrac{1}{2}", v: -0.5 }, { t: "\\dfrac{1}{3}", v: 1 / 3 }, { t: "1", v: 1 }, { t: "\\dfrac{3}{2}", v: 1.5 }, { t: "2", v: 2 }, { t: "e^{-1}", v: Math.exp(-1) }, { t: "e", v: Math.E }];
      const q = h.pick(Q);
      let a, b;
      do { a = h.int(-3, 3); b = h.int(-2, 4); } while (!a);
      const INF = "+\\infty", MINF = "-\\infty", NONE = "\\text{pas de limite}";
      // la limite de qⁿ, puis celle de a qⁿ + b
      let lq, lim, liml, fauxQ, fauxL;
      if (Math.abs(q.v) < 1) { lq = "0"; lim = nb(b); fauxQ = [[MINF, "Tu as confondu l’exposant et la valeur : $q^n$ reste entre $-1$ et $1$ pour $|q| < 1$.", "−∞ au lieu de 0"], q.v < 0 ? [NONE, "Tu as cru que $q < 0$ empêche la convergence. C’est $|q| < 1$ qui décide : $|q^n| \\to 0$.", "q < 0 donc pas de limite"] : ["1", "Tu as cru que $q^n$ s’arrête à $1$. Pour $0 < q < 1$, $q^n$ décroît vers $0$.", "qⁿ s’arrête à 1"]]; }
      else if (q.v === 1) { lq = "1"; lim = nb(a + b); fauxQ = [[INF, "Tu as cru que $1^n$ tend vers $+\\infty$. Mais $1^n = 1$ pour tout $n$.", "1ⁿ → +∞"], ["0", "Tu as cru que $q^n \\to 0$. Pour $q = 1$, $q^n = 1$.", "qⁿ → 0 pour q ≥ 1"]]; }
      else if (q.v > 1) { lq = INF; lim = a > 0 ? INF : MINF; fauxQ = [["0", "Tu as cru que $q^n \\to 0$. Pour $q > 1$, $q^n = e^{n \\ln q}$ tend vers $+\\infty$.", "qⁿ → 0 pour q > 1"], ["1", "Tu as cru que $q^n$ tend vers $1$. Pour $q > 1$, il tend vers $+\\infty$.", "qⁿ s’arrête à 1"]]; }
      else { lq = NONE; lim = NONE; fauxQ = [["0", "Tu as cru que $q^n \\to 0$ pour $q \\le -1$. Mais $|q^n| = |q|^n$ ne tend pas vers $0$ : $q^n$ n’a pas de limite.", "qⁿ → 0 pour q ≤ −1"], [INF, "Tu as retenu seulement la valeur absolue. Le signe alterne : $q^n$ n’a pas de limite.", "signe alterné ignoré"]]; }
      // les leurres de la deuxième question : limite fausse selon le cas
      const candidats = Math.abs(q.v) < 1
        ? [[MINF, "Tu as pris $-\\infty$ au lieu de $0$ pour $q^n$ : le terme $a\\,q^n$ tend vers $0$, la limite est $b$.", "−∞ au lieu de 0"], [nb(a + b), "Tu as pris $q^n \\to 1$. Pour $|q| < 1$, $q^n \\to 0$ : la limite est $b$.", "qⁿ s’arrête à 1"], [NONE, "Tu as cru que $q < 0$ empêche la convergence : c’est $|q| < 1$ qui décide.", "q < 0 donc pas de limite"]]
        : q.v === 1
          ? [[INF, "Tu as cru que $1^n \\to +\\infty$. Pour $q = 1$, $a\\,q^n + b = a + b$.", "1ⁿ → +∞"], [nb(b), "Tu as cru que $q^n \\to 0$. Pour $q = 1$, la limite est $a + b$.", "qⁿ → 0 pour q ≥ 1"]]
          : q.v > 1
            ? [[nb(b), "Tu as cru que $q^n \\to 0$. Pour $q > 1$, $q^n \\to +\\infty$ : la limite est infinie.", "qⁿ → 0 pour q > 1"], [a > 0 ? MINF : INF, "Tu as oublié le signe de $a$. $a\\,q^n$ tend vers $+\\infty$ si $a > 0$, vers $-\\infty$ si $a < 0$.", "signe de a oublié"]]
            : [[nb(b), "Tu as cru que $q^n \\to 0$ pour $q \\le -1$. Mais $|q^n|$ ne tend pas vers $0$ : pas de limite.", "qⁿ → 0 pour q ≤ −1"], [INF, "Tu as retenu seulement la valeur absolue. Le signe alterne : pas de limite.", "signe alterné ignoré"]];
      const tt = (s) => `$${s}$`;
      return {
        enonce: `<p>On considère $q = ${q.t}$, $a = ${a}$ et $b = ${b}$.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est la limite de $q^n$ quand $n$ tend vers $+\\infty$ ?", options: sansDoublon(h.melange([{ t: tt(lq), ok: true }, ...fauxQ.map(([t, fb, erreur]) => ({ t: tt(t), fb, erreur }))])) },
          { type: "qcm", q: "Quelle est la limite de $a\\,q^n + b$ ?", options: sansDoublon(h.melange([{ t: tt(lim), ok: true }, ...candidats.filter(([t]) => t !== lim).map(([t, fb, erreur]) => ({ t: tt(t), fb, erreur }))])) },
        ],
        correction: [
          { tex: `q^n = e^{n \\ln q}`, r: Math.abs(q.v) < 1 && q.v > 0 ? "Pour $0 < q < 1$, $\\ln q < 0$ : l’exposant tend vers $-\\infty$." : "Pour $q > 0$, $q^n = e^{n\\ln q}$ ; pour $q < 0$, on regarde $|q|$ et le signe." },
          { tex: `\\lim_{n \\to +\\infty} q^n = ${lq}`, r: "Les quatre cas : $q > 1$, $+\\infty$ ; $q = 1$, $1$ ; $|q| < 1$, $0$ ; $q \\le -1$, pas de limite." },
          { tex: `\\lim_{n \\to +\\infty} \\left(a\\,q^n + b\\right) = ${lim}`, r: "On applique la limite de $q^n$, puis $a$ et $b$." },
        ],
      };
    },
  },

  /* 8 — la limite d'une composée */
  {
    id: "limite-composee",
    titre: "Limite de g(uₙ) quand uₙ converge",
    niveau: 2,
    capacites: ["maths-sexp 1.1.3", "maths-sm 1.1.3"],
    erreurs: ["g(u_0) au lieu de g(ℓ)", "g oubliée", "continuité en ℓ non regardée"],
    gen(h) {
      const G = [
        { t: "\\ln", g: (x) => LN(x) },
        { t: "\\exp", g: (x) => Math.exp(x) },
        { t: "\\sqrt{\\ \\ }", g: (x) => Math.sqrt(x) },
        { t: "x \\mapsto \\dfrac{1}{x}", g: (x) => 1 / x },
      ];
      const g = h.pick(G);
      const l = h.int(2, 4), d = h.pick([-1, 1]);
      const u0 = l + d;
      const rep = g.g(l);
      const gt = (x) => (g.t === "\\ln" ? `\\ln ${x}` : g.t === "\\exp" ? `e^{${x}}` : g.t.startsWith("\\sqrt") ? `\\sqrt{${x}}` : `\\dfrac{1}{${x}}`);
      const ex = h.pick([true, false]); // la seconde question : ln(v_n), v_n → 0⁺
      return {
        enonce: `<p>La suite $(u_n)$ converge vers $${l}$, avec $u_0 = ${u0}$.</p>`,
        questions: [
          { type: "nombre", q: `Quelle est la limite de $${gt("u_n")}$ ? (valeur approchée à $0{,}01$ près)`, reponse: rep, tol: { abs: 0.01 }, indice: `$g$ est continue en $${l}$ : la limite de $g(u_n)$ est $g$ de la limite.`, pieges: distincts(rep, [
            { v: g.g(u0), fb: `Tu as calculé $g(u_0)$, le départ. C’est la limite qui compte : $g(${l})$, pas $g(${u0})$.`, erreur: "g(u_0) au lieu de g(ℓ)" },
            { v: l, fb: `Tu as oublié d’appliquer $g$ à la limite. $g(u_n)$ tend vers $g(${l})$, pas vers $${l}$.`, erreur: "g oubliée" },
          ], 0.01) },
          { type: "qcm", q: ex ? "Pour $v_n = (1/2)^n$, que vaut la limite de $\\ln(v_n)$ ?" : "Pour $v_n = 1/(n+1)$, que vaut la limite de $\\ln(v_n)$ ?", options: h.melange([
            { t: "$-\\infty$", ok: true },
            { t: "$0$", fb: "Tu as pris $\\ln 0 = 0$, ou $v_n \\to 0$ pour la limite. $\\ln$ n’est pas définie en $0$ : $\\ln(v_n)$ tend vers $-\\infty$ quand $v_n \\to 0^+$.", erreur: "continuité en ℓ non regardée" },
            { t: "$\\ln$ de la limite : $\\ln 0$ existe", fb: "Tu as supposé $\\ln$ continue en $0$. Elle n’y est pas définie : on étudie la limite de $\\ln x$ quand $x \\to 0^+$, qui est $-\\infty$.", erreur: "continuité en ℓ non regardée" },
          ]) },
        ],
        correction: [
          { tex: `\\lim_{n \\to +\\infty} g(u_n) = g(${l}) \\approx ${frTex(rep, 3)}`, r: `$g$ est continue en $${l}$ : on passe à la limite dans $g(u_n)$.` },
          { tex: "\\lim_{x \\to 0^+} \\ln x = -\\infty", r: "En $0$, $\\ln$ n’est pas continue (elle n’y est pas définie) : on utilise sa limite." },
        ],
      };
    },
  },

  /* 9 — la suite auxiliaire de u_{n+1} = a·u_n + b */
  {
    id: "suite-auxiliaire-affine",
    titre: "La suite auxiliaire géométrique",
    niveau: 3,
    capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1", "maths-sexp 1.1.2"],
    erreurs: ["raison b au lieu de a", "v_0 pris pour u_0", "u_n = ℓ + aⁿ (v_0 oublié)", "raison qui dépend de n", "un point fixe prouve la convergence"],
    gen(h) {
      const A = h.pick([
        { a: 0.5, l: [2, 4, 6, 8] }, { a: 1 / 3, l: [3, 6, 9] }, { a: 2 / 3, l: [3, 6, 9] }, { a: 2, l: [1, 2, 3, 4] }, { a: 3, l: [1, 2, 3] },
      ]);
      const a = A.a, l = h.pick(A.l), b = Math.round(l * (1 - a));
      let u0;
      do { u0 = l + h.pick([-3, -2, -1, 1, 2, 3]); } while (u0 === l || u0 === 0);
      const v0 = u0 - l, n = 3;
      const u3 = l + v0 * Math.pow(a, n);
      const conv = Math.abs(a) < 1;
      const limTexte = conv ? `${nb(l)}` : v0 > 0 ? "+\\infty" : "-\\infty";
      return {
        enonce: `<p>La suite $(u_n)$ est définie par $u_0 = ${u0}$ et $u_{n+1} = ${lin(a, "u_n", b)}$. Le point fixe de $f(x) = ${lin(a, "x", b)}$ est $\\ell = ${l}$. On pose $v_n = u_n - ${l}$.</p>`,
        questions: [
          { type: "nombre", q: "Quelle est la raison de la suite géométrique $(v_n)$ ? (valeur approchée à $0{,}01$ près)", reponse: a, tol: { abs: 0.01 }, indice: `$v_{n+1} = u_{n+1} - ${l} = ${fa(a)}\\,(u_n - ${l})$.`, pieges: distincts(a, [
            { v: b, fb: "Tu as pris la constante $b$ pour la raison. $v_{n+1} = a\\,v_n$ : la raison est le coefficient $a$.", erreur: "raison b au lieu de a" },
            { v: l, fb: "Tu as pris le point fixe pour la raison. La raison est le coefficient $a$ de la relation.", erreur: "raison b au lieu de a" },
          ], 0.01) },
          { type: "nombre", q: "Que vaut $v_0$ ?", reponse: v0, tol: { abs: 0.01 }, indice: `$v_0 = u_0 - ${l}$.`, pieges: distincts(v0, [{ v: u0, fb: "Tu as pris $v_0$ pour $u_0$. $v_0 = u_0 - \\ell$ : il manque la soustraction du point fixe.", erreur: "v_0 pris pour u_0" }], 0.01) },
          { type: "nombre", q: "Que vaut $u_3$ ? (valeur approchée à $0{,}01$ près)", reponse: u3, tol: { abs: 0.01 }, indice: "$u_n = \\ell + v_0\\,a^n$.", pieges: distincts(u3, [
            { v: l + Math.pow(a, n), fb: "Tu as oublié $v_0$ : $u_n = \\ell + v_0\\,a^n$, pas $\\ell + a^n$.", erreur: "u_n = ℓ + aⁿ (v_0 oublié)" },
            { v: v0 * Math.pow(a, n), fb: "Tu as écrit $v_3$ au lieu de $u_3$. Il faut rajouter $\\ell$ : $u_n = v_n + \\ell$.", erreur: "v_n pris pour u_n" },
          ], 0.01) },
          { type: "qcm", q: "Quelle est la limite de $(u_n)$ ?", options: sansDoublon(h.melange([
            { t: `$${limTexte}$`, ok: true },
            conv ? { t: `$${nb(u0)}$`, fb: "Tu as pris $u_0$ pour la limite. Ici $|a| < 1$ : $v_n \\to 0$, donc $u_n$ tend vers $\\ell$, quel que soit le départ.", erreur: "la limite dépend du terme initial" } : { t: `$${nb(l)}$`, fb: `Tu as cru que résoudre $\\ell = f(\\ell)$ prouve la convergence. Ici $|a| > 1$ : $v_n$ ne tend pas vers $0$, $(u_n)$ diverge.`, erreur: "un point fixe prouve la convergence" },
            conv ? { t: `$${nb(b)}$`, fb: `Tu as pris la constante $b$ pour la limite. La limite est $\\ell = ${l}$, solution de $\\ell = f(\\ell)$.`, erreur: "constante prise pour la limite" } : { t: `$${nb(u0)}$`, fb: "Tu as pris $u_0$ pour la limite. La suite s’écarte de $\\ell$ : elle diverge.", erreur: "la limite dépend du terme initial" },
          ])) },
        ],
        correction: [
          { tex: `v_{n+1} = u_{n+1} - ${l} = ${fa(a)}\\,u_n ${sg(b)} - ${l} = ${fa(a)}\\,(u_n - ${l}) = ${fa(a)}\\,v_n`, r: `Car $${l} = ${fa(a)} \\times ${l} ${sg(b)}$ : $(v_n)$ est géométrique de raison $${fa(a)}$.` },
          { tex: `v_n = ${v0}\\,\\times ${fa(a)}^{n}, \\quad u_n = ${l} + ${nb(v0)}\\times ${fa(a)}^{n}`, r: "On revient à $u_n = v_n + \\ell$." },
          { tex: `\\lim u_n = ${limTexte}`, r: conv ? "$|a| < 1$ : $a^n \\to 0$, donc $u_n \\to \\ell$." : "$|a| > 1$ : $a^n$ tend vers $+\\infty$, $(u_n)$ diverge." },
        ],
      };
    },
  },

  /* 10 — un seuil par ln */
  {
    id: "seuil-ln",
    titre: "À partir de quel rang ? Un seuil par ln",
    niveau: 2,
    capacites: ["maths-sexp 1.1.5", "maths-sm 1.1.5", "maths-sexp 1.2.17", "maths-sm 1.3.10"],
    erreurs: ["le sens gardé en divisant par ln q < 0", "arrondi vers le bas", "ln(a/b) = ln a / ln b"],
    gen(h) {
      // les ln donnés en SM : ln 2 ≈ 0,69 ; ln 3 ≈ 1,10 ; ln 5 ≈ 1,61 ; ln 10 ≈ 2,30
      const LNS = { 2: 0.69, 3: 1.1, 5: 1.61, 10: 2.3, 4: 1.38 };
      let q, qt, lq, c, k, eps, exact, sm, n;
      do {
        const Q = h.pick([{ v: 0.5, t: "\\dfrac{1}{2}", l: -0.69 }, { v: 1 / 3, t: "\\dfrac{1}{3}", l: -1.1 }, { v: Math.exp(-1), t: "e^{-1}", l: -1 }]);
        q = Q.v; qt = Q.t; lq = Q.l;
        c = h.pick([2, 3, 4, 5]); k = h.pick([2, 3, 4]); eps = Math.pow(10, -k);
        exact = LN(eps / c) / LN(q);
        sm = (-k * LNS[10] - LNS[c]) / lq;
        n = Math.ceil(exact);
      } while (Math.abs(exact - Math.round(exact)) < 0.05 || Math.ceil(sm) !== n || Math.abs(sm - Math.round(sm)) < 0.05);
      const epsT = k === 2 ? "0{,}01" : k === 3 ? "0{,}001" : "0{,}0001";
      const faux = Math.ceil((LN(eps) / LN(c)) / LN(q));
      return {
        enonce: `<p>Soit $u_n = \\ell - ${c}\\,\\left(${qt}\\right)^{n}$, avec $\\ell$ un réel. On cherche le plus petit entier $n$ tel que $|u_n - \\ell| \\le ${epsT}$.</p><p>En SM, on donne $\\ln 2 \\approx 0{,}69$, $\\ln 3 \\approx 1{,}10$, $\\ln 5 \\approx 1{,}61$ et $\\ln 10 \\approx 2{,}30$ ; en PC et SVT, la calculatrice suffit.</p>`,
        questions: [
          { type: "qcm", q: `On écrit $${c}\\,q^{n} \\le ${epsT}$, puis on prend $\\ln$ : $n \\ln q \\le \\ln\\left(${epsT} / ${c}\\right)$. Que devient le sens en divisant par $\\ln q$ ?`, options: h.melange([
            { t: "il est renversé, car $\\ln q < 0$", ok: true },
            { t: "il est gardé", fb: "Tu as gardé le sens en divisant par $\\ln q$. Diviser par un nombre négatif renverse le sens de l’inégalité.", erreur: "le sens gardé en divisant par ln q < 0" },
            { t: "il dépend de la valeur de $\\varepsilon$", fb: "Le sens ne dépend pas de $\\varepsilon$ mais du signe de $\\ln q$ : ici $\\ln q < 0$, donc le sens est renversé.", erreur: "le sens gardé en divisant par ln q < 0" },
          ]) },
          { type: "nombre", q: "Quel est le plus petit entier $n$ qui convient ?", reponse: n, tol: { abs: 0.01 }, indice: `$n \\ge \\dfrac{\\ln(${epsT}/${c})}{\\ln q}$ : arrondis à l’entier supérieur.`, pieges: distincts(n, [
            { v: Math.floor(exact), fb: `Tu as arrondi vers le bas : $n \\ge ${frTex(exact, 2)}$, donc le plus petit entier est ${n}.`, erreur: "arrondi vers le bas" },
            { v: faux, fb: "Tu as écrit $\\ln(\\varepsilon / c) = \\ln \\varepsilon / \\ln c$. Mais $\\ln(a/b) = \\ln a - \\ln b$.", erreur: "ln(a/b) = ln a / ln b" },
          ], 0.01) },
        ],
        correction: [
          { tex: `${c}\\,\\left(${qt}\\right)^{n} \\le ${epsT} \\iff n \\ln ${qt} \\le \\ln\\left(\\dfrac{${epsT}}{${c}}\\right)`, r: "$\\ln$ est croissante : elle garde l’ordre." },
          { tex: `n \\ge \\dfrac{\\ln(${epsT}/${c})}{\\ln ${qt}} \\approx ${frTex(exact, 2)}`, r: "On divise par $\\ln q < 0$ : le sens est renversé." },
          { tex: `n = ${n}`, r: "Le plus petit entier qui convient : on arrondit vers le haut." },
        ],
      };
    },
  },

  /* 11 — la fin d'un problème : la chaîne complète du bac */
  {
    id: "fin-de-probleme",
    titre: "La fin d’un problème : récurrence, sens, convergence, limite",
    niveau: 3,
    capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4", "maths-sexp 1.1.3"],
    erreurs: ["ordre renversé (f traitée comme décroissante)", "f croissante donc suite croissante", "un majorant pris pour la limite", "un point fixe prouve la convergence"],
    gen(h) {
      const cas = h.pick(["bac22", "bac19", "ln", "rac"]);
      const C = h.pick([2, 6, 12]);
      let fx, enonce, a, b, aT, bT, FA, FB, sens, signe, lim, limT, u0T, autres;
      if (cas === "bac22") {
        fx = "x\\left(e^{x/2} - 1\\right)^{2}"; u0T = "1"; a = 0; b = LN(4); aT = "0"; bT = "\\ln 4"; FA = "0"; FB = "\\ln 4"; sens = "décroissante"; lim = 0; limT = "0"; autres = [LN(4), 1];
        signe = "f(x) - x = x\\,e^{x/2}\\left(e^{x/2} - 2\\right) \\le 0 \\text{ sur } [0\\,;\\,\\ln 4]";
      } else if (cas === "bac19") {
        fx = "x + \\dfrac{1}{2} - \\ln x + \\dfrac{1}{2}(\\ln x)^{2}"; u0T = "1"; a = 1; b = Math.E; aT = "1"; bT = "e"; FA = "\\dfrac{3}{2}"; FB = "e"; sens = "croissante"; lim = Math.E; limT = "e"; autres = [1, 1.5];
        signe = "f(x) - x = \\dfrac{1}{2}(\\ln x - 1)^{2} \\ge 0";
      } else if (cas === "ln") {
        fx = "1 + \\ln x"; u0T = "2"; a = 1; b = Math.E; aT = "1"; bT = "e"; FA = "1"; FB = "2"; sens = "décroissante"; lim = 1; limT = "1"; autres = [2, Math.E];
        signe = "f(x) - x = 1 + \\ln x - x \\le 0 \\text{ sur } [1\\,;\\,e]";
      } else {
        const l = (1 + Math.sqrt(1 + 4 * C)) / 2;
        fx = `\\sqrt{x + ${C}}`; u0T = "0"; a = 0; b = l; aT = "0"; bT = String(l); FA = `\\sqrt{${C}}`; FB = String(l); sens = "croissante"; lim = l; limT = String(l); autres = [0, Math.sqrt(C)];
        signe = `f(x) - x = \\sqrt{x + ${C}} - x \\ge 0 \\text{ sur } [0\\,;\\,${l}]`;
      }
      const I = `[${aT}\\,;\\,${bT}]`;
      const croit = sens === "croissante";
      const opts4 = [
        { t: `$f(${aT}) \\le f(u_n) \\le f(${bT})$, car $f$ est croissante`, ok: true },
        { t: `$f(${bT}) \\le f(u_n) \\le f(${aT})$, car $f$ renverse l’ordre`, fb: "Tu as renversé l’ordre, comme pour une fonction décroissante. $f$ est croissante : elle garde l’ordre.", erreur: "ordre renversé (f traitée comme décroissante)" },
        { t: `$f(u_n) \\le ${bT}$, car $f(x) \\le ${bT}$ pour tout réel $x$`, fb: "Tu as écrit une hérédité sans hypothèse : $f(x) \\le b$ n’est pas vrai pour tout $x$. Il faut partir de l’encadrement de $u_n$.", erreur: "hérédité sans hypothèse" },
      ];
      const monot = [
        { t: `${sens}, car $${signe.split(" ")[0] === "f(x)" ? "f(x) - x" : "f(x) - x"}$ ${croit ? "est positif" : "est négatif"} sur $${I}$`, ok: true },
        { t: croit ? "décroissante, car on a étudié $u_n - u_{n+1}$" : "croissante, car $f$ est croissante", fb: croit ? "Tu as inversé la différence : on étudie $u_{n+1} - u_n$, qui est $f(u_n) - u_n$." : "Tu as lu le sens de la suite sur celui de $f$. Le sens de $f$ ne dit pas celui de la suite : on étudie le signe de $f(u_n) - u_n$.", erreur: croit ? "différence inversée" : "f croissante donc suite croissante" },
        { t: croit ? "décroissante, car $f$ est croissante" : "croissante, car on a étudié $u_n - u_{n+1}$", fb: croit ? "Tu as confondu « $f$ croissante » et « $(u_n)$ décroissante ». Étudie le signe de $f(u_n) - u_n$." : "Tu as inversé la différence : on étudie $u_{n+1} - u_n$, qui est $f(u_n) - u_n$.", erreur: croit ? "f croissante donc suite croissante" : "différence inversée" },
      ];
      const conv = [
        { t: `elle converge, vers un réel $\\ell \\in ${I}$`, ok: true },
        { t: `elle converge vers $${bT}$, la borne de l’intervalle`, fb: "Tu as pris un majorant ou une borne pour la limite. Elle converge, mais sa limite se calcule avec $\\ell = f(\\ell)$.", erreur: "un majorant pris pour la limite", si: lim !== b },
        { t: "elle tend vers $+\\infty$, car elle est monotone", fb: "Tu as oublié la borne : monotone et bornée, elle converge.", erreur: "croissante donc +∞" },
        { t: "on ne peut pas conclure", fb: "Tu as oublié le critère : monotone et bornée, elle converge (critère admis).", erreur: "critère non appliqué" },
      ].filter((o) => o.si !== false);
      const pl = [
        { v: b, fb: `Tu as pris la borne $${bT}$ pour la limite. Elle vérifie $f(\\ell) = \\ell$ et reste dans $${I}$ : ce n’est pas la borne.`, erreur: "un majorant pris pour la limite" },
        { v: a, fb: `Tu as pris la borne $${aT}$ pour la limite. La limite est le point fixe que la suite atteint.`, erreur: "un minorant pris pour la limite" },
        { v: autres[0], fb: "Tu as pris un autre nombre de l’intervalle : seule la solution de $f(\\ell) = \\ell$ atteinte par la suite convient.", erreur: "la limite dépend du terme initial" },
        { v: autres[1], fb: "Tu as pris le terme initial : la limite ne dépend pas du départ.", erreur: "la limite dépend du terme initial" },
      ];
      return {
        enonce: `<p>Soit $f(x) = ${fx}$ et $(u_n)$ définie par $u_0 = ${u0T}$ et $u_{n+1} = f(u_n)$. La partie I du problème a établi : $f$ est continue et croissante sur $${I}$ ; $f(${aT}) = ${FA}$ et $f(${bT}) = ${FB}$ ; $${signe}$.</p><p>On suppose que $u_n \\in ${I}$ pour tout $n$ (récurrence faite avec $f(I) \\subset I$).</p>`,
        questions: [
          { type: "qcm", q: `Hérédité : on suppose $${aT} \\le u_n \\le ${bT}$. Quelle est la ligne suivante ?`, options: h.melange(opts4) },
          { type: "qcm", q: "Que dire du sens de variation de $(u_n)$ ?", options: h.melange(monot) },
          { type: "qcm", q: `Monotone et bornée par $${aT}$ et $${bT}$ : que conclure ?`, options: h.melange(conv) },
          { type: "nombre", q: "Quelle est sa limite ? (valeur approchée à $0{,}01$ près)", reponse: lim, tol: { abs: 0.01 }, indice: `$\\ell$ vérifie $f(\\ell) = \\ell$ et reste dans $${I}$, du bon côté de $u_0$.`, pieges: distincts(lim, pl, 0.01) },
        ],
        correction: [
          { tex: `f(${aT}) \\le f(u_n) \\le f(${bT}) \\iff ${FA} \\le u_{n+1} \\le ${FB}`, r: "Hérédité : $f$ est croissante, elle garde l’ordre." },
          { tex: signe, r: `Le signe de $f(x) - x$ sur l’intervalle des $u_n$ donne le sens : $(u_n)$ est ${sens}.` },
          { t: `${sens[0].toUpperCase()}${sens.slice(1)} et bornée : $(u_n)$ converge (critère admis).` },
          { tex: `\\ell = f(\\ell) \\Longrightarrow \\ell = ${limT}`, r: "$f$ est continue sur $I$ et $f(I) \\subset I$ : la limite est un point fixe, du bon côté de $u_0$." },
        ],
      };
    },
  },

  /* ===================== séance 2 : « Encadrer, comparer » ===================== */

  /* 12 — les suites homographiques */
  {
    id: "homographique",
    titre: "Une suite homographique et sa suite auxiliaire",
    niveau: 3,
    seance: 2,
    capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1"],
    erreurs: ["raison mal calculée (inverse)", "v_0 pris pour u_0", "inversion de v en u fausse"],
    gen(h) {
      let al, be, c, a, d, b, lam, u0, v0;
      do {
        al = h.int(0, 3); be = h.int(al + 1, 5); c = h.pick([1, 2]); a = h.int(1, 4);
        d = a - c * (al + be); b = -c * al * be;
        u0 = h.int(-1, 6);
        lam = (a - c * al) / (a - c * be);
      } while (a * d - b * c === 0 || u0 === al || u0 === be || c * u0 + d === 0 || Math.abs(lam) === 1 || !Number.isFinite(lam) || Math.abs(Math.round(lam * 12) / 12 - lam) > 1e-9);
      v0 = (u0 - al) / (u0 - be);
      return {
        enonce: `<p>Soit $(u_n)$ définie par $u_0 = ${u0}$ et $u_{n+1} = \\dfrac{${a}\\,u_n ${sg(b)}}{${c}\\,u_n ${sg(d)}}$. Les points fixes de $f$ sont $\\alpha = ${al}$ et $\\beta = ${be}$ (on admet que $u_n \\ne \\beta$ pour tout $n$). On pose $v_n = \\dfrac{u_n - ${al}}{u_n - ${be}}$ : la suite $(v_n)$ est géométrique.</p>`,
        questions: [
          { type: "nombre", q: "Quelle est la raison de $(v_n)$ ? (valeur approchée à $0{,}01$ près)", reponse: lam, tol: { abs: 0.01 }, indice: `$v_{n+1} = \\dfrac{u_{n+1} - ${al}}{u_{n+1} - ${be}}$ : remplace $u_{n+1}$ et simplifie.`, pieges: distincts(lam, [{ v: 1 / lam, fb: "Tu as inversé la raison : elle vaut $\\dfrac{a - c\\alpha}{a - c\\beta}$, avec le point fixe $\\alpha$ au numérateur, comme dans $v_n$.", erreur: "raison mal calculée (inverse)" }], 0.01) },
          { type: "nombre", q: "Que vaut $v_0$ ? (valeur approchée à $0{,}01$ près)", reponse: v0, tol: { abs: 0.01 }, indice: `$v_0 = \\dfrac{u_0 - ${al}}{u_0 - ${be}}$.`, pieges: distincts(v0, [{ v: u0, fb: "Tu as pris $v_0$ pour $u_0$. $v_0$ se calcule avec la formule de $v_n$ au rang $0$.", erreur: "v_0 pris pour u_0" }], 0.01) },
        ],
        correction: [
          { tex: `\\dfrac{u_{n+1} - ${al}}{u_{n+1} - ${be}} = ${nb(lam)}\\,\\dfrac{u_n - ${al}}{u_n - ${be}}`, r: "On remplace $u_{n+1}$ par $f(u_n)$ et on simplifie : la raison est $\\dfrac{a - c\\alpha}{a - c\\beta}$." },
          { tex: `v_0 = \\dfrac{${u0} - ${al}}{${u0} - ${be}} = ${nb(v0)}`, r: "On applique la formule de $v_n$ au rang $0$." },
        ],
      };
    },
  },

  /* 13 — la majoration par une géométrique */
  {
    id: "majoration-geometrique",
    titre: "Majorer par une géométrique, puis encadrer",
    niveau: 2,
    seance: 2,
    capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"],
    erreurs: ["quotient sans positivité", "gendarmes mal appliqué", "exposant décalé"],
    gen(h) {
      const K = h.pick([{ v: 1 / 3, t: "\\dfrac{1}{3}" }, { v: 0.5, t: "\\dfrac{1}{2}" }, { v: 0.4, t: "\\dfrac{2}{5}" }]);
      const u0 = h.int(2, 6), n = h.pick([3, 4, 5]);
      const rep = u0 * Math.pow(K.v, n);
      return {
        enonce: `<p>Soit $(u_n)$ une suite telle que $u_0 = ${u0}$ et, pour tout $n$, $u_n > 0$ et $\\dfrac{u_{n+1}}{u_n} \\le ${K.t}$.</p>`,
        questions: [
          { type: "qcm", q: `Pour déduire $u_{n+1} \\le ${K.t}\\,u_n$ de ce quotient, à quelle condition multiplie-t-on par $u_n$ sans changer le sens ?`, options: h.melange([
            { t: "$u_n > 0$", ok: true },
            { t: "aucune : c’est toujours vrai", fb: "Tu as oublié la positivité. Multiplier par un nombre négatif renverse le sens : il faut $u_n > 0$.", erreur: "quotient sans positivité" },
            { t: "$u_n < 0$", fb: "Tu as pris le mauvais signe. Pour garder le sens, on multiplie par un nombre positif : $u_n > 0$.", erreur: "quotient sans positivité" },
          ]) },
          { type: "nombre", q: `On montre que $u_n \\le u_0 \\left(${K.t}\\right)^{n}$. Quelle borne obtient-on pour $u_{${n}}$ ? (valeur approchée à $0{,}001$ près)`, reponse: rep, tol: { abs: 0.002 }, indice: `$u_{${n}} \\le u_0 \\times k^{${n}}$ : de $u_0$ à $u_{${n}}$, il y a ${n} pas.`, pieges: distincts(rep, [
            { v: u0 * Math.pow(K.v, n + 1), fb: `Tu as décalé l’exposant : $k^{${n + 1}}$. De $u_0$ à $u_{${n}}$, il y a ${n} pas : $k^{${n}}$.`, erreur: "exposant décalé" },
            { v: u0 * n * K.v, fb: "Tu as multiplié par $n$ au lieu d’élever à la puissance $n$. Chaque pas multiplie par $k$ : $k^n$.", erreur: "arithmétique et géométrique confondues" },
          ], 0.002) },
          { type: "qcm", q: `On a $0 < u_n \\le u_0 \\left(${K.t}\\right)^{n}$. Quelle est la limite de $(u_n)$ ?`, options: h.melange([
            { t: "$0$, par encadrement", ok: true },
            { t: "$1$", fb: `Tu as cru que $k^n \\to 1$. Pour $0 < k < 1$, $k^n \\to 0$, donc $u_n$ est écrasée entre $0$ et $u_0 k^n$.`, erreur: "gendarmes mal appliqué" },
            { t: "on ne peut pas conclure sans minorant", fb: "Tu as oublié la minoration : $u_n > 0$ est donnée. Entre $0$ et $u_0 k^n$, deux suites de limite $0$ : $u_n \\to 0$.", erreur: "gendarmes mal appliqué" },
          ]) },
        ],
        correction: [
          { tex: `u_{n+1} \\le ${K.t}\\,u_n`, r: "On multiplie par $u_n > 0$." },
          { tex: `u_n \\le u_0\\,k^{n}`, r: "Récurrence immédiate : à chaque pas, on multiplie la borne par $k$." },
          { tex: `0 < u_n \\le ${u0} \\left(${K.t}\\right)^{n} \\Longrightarrow \\lim u_n = 0`, r: "Théorème d’encadrement : $k^{n}$ tend vers $0$ car $0 < k < 1$." },
        ],
      };
    },
  },

  /* 14 — l'inégalité des accroissements finis (SM) */
  {
    id: "accroissements-finis",
    titre: "L’inégalité des accroissements finis appliquée à une suite",
    niveau: 3,
    seance: 2,
    filieres: ["SM"],
    capacites: ["maths-sm 1.3.17", "maths-sm 1.1.4"],
    erreurs: ["intervalle non stable", "k ≥ 1", "exposant décalé"],
    gen(h) {
      const K = h.pick([{ v: 0.5, t: "\\dfrac{1}{2}" }, { v: 1 / 3, t: "\\dfrac{1}{3}" }, { v: 0.25, t: "\\dfrac{1}{4}" }]);
      const gap = h.int(1, 4), n = h.pick([2, 3, 4]);
      const rep = Math.pow(K.v, n) * gap;
      return {
        enonce: `<p>Soit $f$ dérivable sur un intervalle $I$ avec $f(I) \\subset I$, telle que $|f'(x)| \\le ${K.t}$ sur $I$, et $\\alpha \\in I$ avec $f(\\alpha) = \\alpha$. La suite $(u_n)$ vérifie $u_{n+1} = f(u_n)$, $u_0 \\in I$ et $|u_0 - \\alpha| = ${gap}$.</p>`,
        questions: [
          { type: "qcm", q: "Pourquoi peut-on appliquer l’inégalité des accroissements finis entre $u_n$ et $\\alpha$ ?", options: h.melange([
            { t: "car $u_n$ et $\\alpha$ sont dans $I$, stable par $f$", ok: true },
            { t: "car $f$ est croissante", fb: "Tu as invoqué la croissance, qui n’est pas l’hypothèse. Il faut que $u_n$ et $\\alpha$ restent dans l’intervalle $I$ où $|f'| \\le k$ : c’est la stabilité $f(I) \\subset I$.", erreur: "intervalle non stable" },
            { t: "car $|f'|$ est petite quelque part", fb: "Tu as oublié que la borne doit valoir sur tout l’intervalle contenant $u_n$ et $\\alpha$. Il faut $f(I) \\subset I$ pour que $u_n \\in I$ à tout rang.", erreur: "intervalle non stable" },
          ]) },
          { type: "nombre", q: `On obtient $|u_{n+1} - \\alpha| \\le ${K.t}\\,|u_n - \\alpha|$. Quelle borne pour $|u_{${n}} - \\alpha|$ ? (valeur approchée à $0{,}001$ près)`, reponse: rep, tol: { abs: 0.002 }, indice: `Au rang ${n}, on a multiplié ${n} fois par $k$.`, pieges: distincts(rep, [
            { v: Math.pow(K.v, n + 1) * gap, fb: `Tu as décalé l’exposant : $k^{${n + 1}}$. Après ${n} pas, la borne est $k^{${n}}\\,|u_0 - \\alpha|$.`, erreur: "exposant décalé" },
            { v: gap * n * K.v, fb: "Tu as multiplié par $n$ au lieu d’élever à la puissance $n$.", erreur: "exposant décalé" },
          ], 0.002) },
          { type: "qcm", q: "Que faut-il sur $k$ pour que $(u_n)$ converge vers $\\alpha$ ?", options: h.melange([
            { t: "$0 \\le k < 1$ strictement", ok: true },
            { t: "$k \\ge 1$ suffit", fb: "Tu as cru que $k \\ge 1$ suffit. Avec $k \\ge 1$, $k^n$ ne tend pas vers $0$ : l’inégalité ne dit rien.", erreur: "k ≥ 1" },
            { t: "$k \\le 1$ suffit", fb: "Tu as accepté $k = 1$. Avec $k = 1$, la borne $|u_n - \\alpha| \\le |u_0 - \\alpha|$ ne tend pas vers $0$ : il faut $k < 1$ strictement.", erreur: "k ≥ 1" },
          ]) },
        ],
        correction: [
          { tex: `|u_{n+1} - \\alpha| = |f(u_n) - f(\\alpha)| \\le ${K.t}\\,|u_n - \\alpha|`, r: "Inégalité des accroissements finis sur $I$, qui contient $u_n$ et $\\alpha$." },
          { tex: `|u_n - \\alpha| \\le \\left(${K.t}\\right)^{n}\\,|u_0 - \\alpha|`, r: "Récurrence : à chaque pas, la borne est multipliée par $k$." },
          { t: "Comme $0 \\le k < 1$, $k^n \\to 0$ : $(u_n)$ converge vers $\\alpha$." },
        ],
      };
    },
  },
];
