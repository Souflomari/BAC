// @ts-nocheck
/**
 * Les exercices de la leçon « Décroissance radioactive » (V3). Format : voir modele.js.
 * Chaque réponse est calculée ici ; le vérificateur (scripts/pilotes-exercices.mjs)
 * rejoue des centaines de tirages. Capacités : pc-pc 1.2.1.x (identiques en pc-sm et
 * pc-svt, docs/referentiel/).
 *
 * Données réelles (vérifiées) : demi-vies — iode 131 : 8,0 jours ; radon 222 : 3,8 jours ;
 * phosphore 32 : 14,3 jours ; iridium 192 : 74 jours ; polonium 210 : 138 jours ;
 * cobalt 60 : 5,27 ans ; strontium 90 : 28,8 ans ; césium 137 : 30,1 ans ; tritium :
 * 12,3 ans ; plutonium 238 : 87,7 ans ; carbone 14 : 5 730 ans (5 570 dans le sujet 2011) ;
 * potassium 40 : 1,25 × 10⁹ ans. Les désintégrations listées sont les modes principaux
 * (sources : tables des isotopes ; sujets 2019 à 2025, docs/sujets/pc/decroissance-radioactive.md).
 * Les constantes (N_A, conversions d'unités, demi-vies) sont toujours DONNÉES dans l'énoncé,
 * comme au bac ; une masse molaire est prise égale au nombre de masse, en g·mol⁻¹.
 */
import { fr, frTex, sciTex, sig } from "./nombre.js";

const LN2 = Math.LN2;
const NA = 6.02e23;
const JOUR = 86400;
/** un noyau pour KaTeX : nombre de masse et nombre de charge alignés à droite */
const nuc = (A, Z, X) => {
  const a = String(A), z = String(Z);
  return `{}^{${"\\phantom{0}".repeat(Math.max(0, z.length - a.length))}${a}}_{${"\\phantom{0}".repeat(Math.max(0, a.length - z.length))}${z}}\\mathrm{${X}}`;
};
const $n = (A, Z, X) => `$${nuc(A, Z, X)}$`;
/** un nombre au format du bac : 4,6 × 10^15 (texte KaTeX) */
const sci = (x, c = 2) => sciTex(x, c);
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
/** le moins de décimales possible (jusqu'à 3) : 0,125 ; 14,3 ; 8 */
const dec = (x) => { for (let d = 0; d < 3; d++) if (Math.abs(x - Number(x.toFixed(d))) < 1e-9) return d; return 3; };
const frs = (x) => fr(x, dec(x));
const frsT = (x) => frTex(x, dec(x));
/** « = 12,5 » quand l'écriture est exacte, « ≈ 1,56 » sinon (KaTeX) */
const egal = (x) => (Math.abs(x - Number(x.toFixed(3))) < 1e-9 ? `= ${frsT(x)}` : `\\approx ${frTex(x, 2)}`);
/** un temps avec son unité, à la française (KaTeX) */
const duree = (v, u) => `${frsT(v)}\\ \\text{${u}}`;
/** « du radon 222 », « de l’iode 131 » ; « de radon 222 », « d’iode 131 » */
const de = (nom) => (nom.startsWith("le ") ? "du " + nom.slice(3) : "de " + nom);
const partitif = (nom) => { const n = nom.replace(/^(le |la |l’)/, ""); return (/^[aeiouyhéèêâîôû]/i.test(n) ? "d’" : "de ") + n; };
/** « 95 % » hors formule : une espace fine insécable */
const PC = " %";

/* ---------- les noyaux (réels) ---------- */
const ELEMENTS = [
  ["H", "hydrogène", 1, [1, 2, 3]], ["He", "hélium", 2, [3, 4]], ["C", "carbone", 6, [12, 13, 14]], ["N", "azote", 7, [14, 15]],
  ["O", "oxygène", 8, [16, 17, 18]], ["Na", "sodium", 11, [23, 24]], ["P", "phosphore", 15, [31, 32]], ["K", "potassium", 19, [39, 40]],
  ["Ar", "argon", 18, [36, 40]], ["Ca", "calcium", 20, [40, 44]], ["Co", "cobalt", 27, [59, 60]], ["Ni", "nickel", 28, [58, 60]],
  ["Sr", "strontium", 38, [88, 90]], ["I", "iode", 53, [127, 131]], ["Xe", "xénon", 54, [131, 132]], ["Cs", "césium", 55, [133, 137]],
  ["Ba", "baryum", 56, [137, 138]], ["Pb", "plomb", 82, [206, 208]], ["Po", "polonium", 84, [210, 218]], ["Rn", "radon", 86, [220, 222]],
  ["Ra", "radium", 88, [226, 228]], ["Th", "thorium", 90, [232, 234]], ["U", "uranium", 92, [234, 235, 238]], ["Pu", "plutonium", 94, [238, 239]],
];
const TOUS = ELEMENTS.flatMap(([X, nom, Z, As]) => As.map((A) => ({ X, nom, Z, A, N: A - Z })));

/* ---------- les désintégrations (réelles, mode principal) ---------- */
const DESINT = [
  ["C", "carbone", 14, 6, "N", "azote", "bm"], ["I", "iode", 131, 53, "Xe", "xénon", "bm"], ["Ir", "iridium", 192, 77, "Pt", "platine", "bm"],
  ["Sr", "strontium", 90, 38, "Y", "yttrium", "bm"], ["Co", "cobalt", 60, 27, "Ni", "nickel", "bm"], ["P", "phosphore", 32, 15, "S", "soufre", "bm"],
  ["H", "tritium", 3, 1, "He", "hélium", "bm"], ["Cs", "césium", 137, 55, "Ba", "baryum", "bm"],
  ["U", "uranium", 238, 92, "Th", "thorium", "al"], ["Pu", "plutonium", 238, 94, "U", "uranium", "al"], ["Ra", "radium", 226, 88, "Rn", "radon", "al"],
  ["Rn", "radon", 222, 86, "Po", "polonium", "al"], ["Po", "polonium", 210, 84, "Pb", "plomb", "al"], ["Am", "américium", 241, 95, "Np", "neptunium", "al"],
  ["F", "fluor", 18, 9, "O", "oxygène", "bp"], ["Na", "sodium", 22, 11, "Ne", "néon", "bp"], ["P", "phosphore", 30, 15, "Si", "silicium", "bp"],
  ["N", "azote", 13, 7, "C", "carbone", "bp"], ["O", "oxygène", 15, 8, "N", "azote", "bp"],
];
const PART = { al: [4, 2, "He"], bm: [0, -1, "e"], bp: [0, 1, "e"] };
const NOM_TYPE = { al: "$\\alpha$", bm: "$\\beta^-$", bp: "$\\beta^+$" };

/* ---------- des radioéléments et leur demi-vie (unité de l'énoncé) ---------- */
const COURTS = [
  { nom: "l’iode 131", X: "I", A: 131, Z: 53, t: 8, u: "jours" }, { nom: "le radon 222", X: "Rn", A: 222, Z: 86, t: 3.8, u: "jours" },
  { nom: "le phosphore 32", X: "P", A: 32, Z: 15, t: 14.3, u: "jours" }, { nom: "l’iridium 192", X: "Ir", A: 192, Z: 77, t: 74, u: "jours" },
  { nom: "le polonium 210", X: "Po", A: 210, Z: 84, t: 138, u: "jours" },
];
const LONGS = [
  { nom: "le cobalt 60", X: "Co", A: 60, Z: 27, t: 5.27, u: "ans" }, { nom: "le strontium 90", X: "Sr", A: 90, Z: 38, t: 28.8, u: "ans" },
  { nom: "le césium 137", X: "Cs", A: 137, Z: 55, t: 30.1, u: "ans" }, { nom: "le tritium", X: "H", A: 3, Z: 1, t: 12.3, u: "ans" },
  { nom: "le plutonium 238", X: "Pu", A: 238, Z: 94, t: 87.7, u: "ans" },
];
const unSing = (u) => ({ jours: "jour", ans: "an", heures: "heure", min: "min" })[u] || u;

/* ---------- une courbe a(t) dessinée (jetons de couleur seulement) ---------- */
function pas(x) { const e = 10 ** Math.floor(Math.log10(x)); for (const m of [1, 2, 2.5, 5, 10]) if (m * e >= x - 1e-12) return m * e; return 10 * e; }
function figureActivite({ a0m, e, th, u, xmax, s, tangente }) {
  const L = 76, R = 600, T = 24, B = 312, ymax = Math.ceil(a0m) + 1;
  const X = (t) => L + ((R - L) * t) / xmax, Y = (a) => B - ((B - T) * a) / ymax;
  const f = (v) => v.toFixed(1);
  let g = "";
  for (let k = 0; k * s / 2 <= xmax + 1e-9; k++) { const t = (k * s) / 2; g += `<line x1="${f(X(t))}" x2="${f(X(t))}" y1="${T}" y2="${B}" stroke="var(--color-border-soft)" stroke-width="${k % 2 ? 0.6 : 1.2}"/>`; }
  for (let k = 0; k * 0.5 <= ymax + 1e-9; k++) { const a = k * 0.5; g += `<line x1="${L}" x2="${R}" y1="${f(Y(a))}" y2="${f(Y(a))}" stroke="var(--color-border-soft)" stroke-width="${k % 2 ? 0.6 : 1.2}"/>`; }
  let d = "";
  for (let i = 0; i <= 200; i++) { const t = (xmax * i) / 200; d += `${i ? "L" : "M"}${f(X(t))} ${f(Y(a0m * 2 ** (-t / th)))}`; }
  g += `<path d="${d}" fill="none" stroke="var(--color-text-primary)" stroke-width="2.5"/>`;
  if (tangente) { const tau = th / LN2; g += `<line x1="${f(X(0))}" y1="${f(Y(a0m))}" x2="${f(X(tau))}" y2="${f(Y(0))}" stroke="var(--color-signal)" stroke-width="2" stroke-dasharray="7 5"/>`; }
  g += `<line x1="${L}" x2="${R}" y1="${B}" y2="${B}" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="${L}" x2="${L}" y1="${T}" y2="${B}" stroke="var(--color-text-primary)" stroke-width="1.5"/>`;
  for (let k = 0; k * s <= xmax + 1e-9; k++) { const t = k * s; g += `<text x="${f(X(t))}" y="${B + 22}" text-anchor="middle" font-size="15" fill="var(--color-text-secondary)">${frs(t)}</text>`; }
  for (let a = 1; a <= ymax; a++) g += `<text x="${L - 10}" y="${f(Y(a) + 5)}" text-anchor="end" font-size="15" fill="var(--color-text-secondary)">${a}</text>`;
  g += `<text x="${R}" y="${B + 44}" text-anchor="end" font-size="15" fill="var(--color-text-primary)">t (${u})</text>`;
  g += `<text x="${L - 8}" y="${T - 6}" font-size="15" fill="var(--color-text-primary)">a (10<tspan dy="-6" font-size="11">${e}</tspan><tspan dy="6"> Bq)</tspan></text>`;
  return `<svg viewBox="0 0 640 ${B + 56}" role="img" aria-label="Courbe de l’activité a(t) en fonction du temps">${g}</svg>`;
}

export const EXERCICES = [
  /* 1 — composition d'un noyau, isotopes */
  {
    id: "noyau-composition",
    titre: "La composition d’un noyau ; les isotopes",
    niveau: 1,
    capacites: ["pc-pc 1.2.1.1", "pc-pc 1.2.1.2"],
    erreurs: ["Z et A inversés", "nombre de neutrons = A", "isotopes = même nombre de neutrons", "isotopes = même A"],
    gen(h) {
      const el = h.pick(ELEMENTS.filter((x) => x[3].length >= 2));
      const [X, nom, Z, As] = el;
      const A = h.pick(As), Nn = A - Z;
      const autre = h.pick(As.filter((a) => a !== A));
      const isobares = TOUS.filter((x) => x.A === A && x.Z !== Z);
      const isotones = TOUS.filter((x) => x.N === Nn && x.Z !== Z && x.A !== A);
      const opts = [{ t: `${$n(autre, Z, X)} (${nom} ${autre})`, ok: true }];
      if (isobares.length) { const b = h.pick(isobares); opts.push({ t: `${$n(b.A, b.Z, b.X)} (${b.nom} ${b.A})`, fb: `Même nombre de masse ${A}, mais ${b.Z} protons au lieu de ${Z} : un autre élément. Des isotopes ont le même $Z$.`, erreur: "isotopes = même A" }); }
      if (isotones.length) { const b = h.pick(isotones); opts.push({ t: `${$n(b.A, b.Z, b.X)} (${b.nom} ${b.A})`, fb: `Il a aussi ${Nn} neutrons, mais ${b.Z} protons : un autre élément. Des isotopes ont le même nombre de <b>protons</b>.`, erreur: "isotopes = même nombre de neutrons" }); }
      const loin = TOUS.filter((x) => x.Z !== Z && x.A !== A && x.N !== Nn && !opts.some((o) => o.t.includes(`(${x.nom} ${x.A})`)));
      while (opts.length < 3) { const b = h.pick(loin); if (!opts.some((o) => o.t.includes(`(${b.nom} ${b.A})`))) opts.push({ t: `${$n(b.A, b.Z, b.X)} (${b.nom} ${b.A})`, fb: `${b.Z} protons au lieu de ${Z} : c’est un autre élément.`, erreur: "isotopes = même A" }); }
      const tolE = { abs: 0.01 };
      return {
        enonce: `<p>On considère le noyau ${$n(A, Z, X)} (${nom} ${A}).</p>`,
        questions: [
          { type: "nombre", q: "Combien de protons contient ce noyau ?", reponse: Z, tol: tolE, indice: "Le nombre du bas, $Z$, compte les protons.",
            pieges: pieges(Z, tolE, [{ v: A, fb: `${A} est le nombre du haut, $A$ : il compte tous les nucléons. Les protons, c’est le nombre du bas.`, erreur: "Z et A inversés" }, { v: Nn, fb: "C’est le nombre de neutrons. Les protons sont donnés directement par $Z$.", erreur: "Z et A inversés" }]) },
          { type: "nombre", q: "Combien de neutrons ?", reponse: Nn, tol: tolE, indice: "$A$ compte les nucléons (protons et neutrons) : $N = A - Z$.",
            pieges: pieges(Nn, tolE, [{ v: A, fb: `$A = ${A}$ compte tous les nucléons, protons compris : $N = A - Z$.`, erreur: "nombre de neutrons = A" }, { v: Z, fb: "C’est le nombre de protons.", erreur: "Z et A inversés" }, { v: A + Z, fb: "On soustrait les protons des nucléons : $N = A - Z$.", erreur: "nombre de neutrons = A" }]) },
          { type: "qcm", q: `Lequel de ces noyaux est un isotope de ${$n(A, Z, X)} ?`, options: h.melange(opts) },
        ],
        correction: [
          { tex: `${nuc(A, Z, X)}\\ :\\ Z = ${Z},\\ A = ${A}`, r: "En bas, le nombre de charge $Z$ ; en haut, le nombre de masse $A$." },
          { t: `Le noyau contient $Z = ${Z}$ protons.` },
          { tex: `N = A - Z = ${A} - ${Z} = ${Nn}`, r: "Les nucléons qui ne sont pas des protons sont des neutrons." },
          { t: `Des isotopes ont le même nombre de protons (même élément) et un nombre de neutrons différent : ${$n(autre, Z, X)} est un isotope de ${$n(A, Z, X)}.` },
        ],
      };
    },
  },

  /* 2 — compléter une équation, nommer le type */
  {
    id: "equation-desintegration",
    titre: "Compléter une équation de désintégration",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.6", "pc-pc 1.2.1.7", "pc-pc 1.2.1.8", "pc-pc 1.2.1.9"],
    erreurs: ["α ne change que A", "signe de la charge de l’électron", "γ change Z ou A", "A conservé à tort en α"],
    gen(h) {
      const [X, nomX, A, Z, Y, nomY, ty] = h.pick(DESINT);
      const [a, z, P] = PART[ty];
      const A2 = A - a, Z2 = Z - z;
      const fils = h.int(0, 1) === 0;  // on cherche le noyau fils (sinon la particule)
      const tolE = { abs: 0.01 };
      const zTex = (v) => (ty === "bp" ? `+${v}` : `${v}`);
      let q1, q2, enonce;
      if (fils) {
        enonce = `<p>Le noyau ${$n(A, Z, X)} (${nomX} ${A}) se désintègre en un noyau ${partitif(nomY)} en émettant la particule ${$n(a, zTex(z), P)} :</p>$$${nuc(A, Z, X)} \\longrightarrow {}^{A'}_{Z'}\\mathrm{${Y}} + ${nuc(a, zTex(z), P)}$$`;
        const pA = ty === "al"
          ? [{ v: A, fb: `La particule α emporte 4 nucléons : $A' = ${A} - 4$.`, erreur: "A conservé à tort en α" }, { v: A - 2, fb: "La particule α compte 4 nucléons, pas 2.", erreur: "α ne change que A" }]
          : [{ v: A - 1, fb: `La particule ne contient aucun nucléon ($a = 0$) : $A' = A = ${A}$.`, erreur: "A conservé à tort en α" }];
        q1 = { type: "nombre", q: "Que vaut le nombre de masse $A'$ du noyau fils ?", reponse: A2, tol: tolE, indice: "Le nombre de nucléons se conserve : $A = A' + a$.", pieges: pieges(A2, tolE, pA) };
        q2 = { type: "nombre", q: "Que vaut le nombre de charge $Z'$ du noyau fils ?", reponse: Z2, tol: tolE, indice: "La charge se conserve : $Z = Z' + z$, avec le signe de $z$.",
          pieges: pieges(Z2, tolE, [{ v: Z, fb: ty === "al" ? "La particule α emporte aussi 2 protons : « α ne change que $A$ » est faux." : "La particule emporte une charge : $Z$ change d’une unité.", erreur: ty === "al" ? "α ne change que A" : "signe de la charge de l’électron" }, { v: Z + z, fb: `Attention au signe : $${Z} = Z' + (${z})$, donc $Z' = ${Z} - (${z}) = ${Z2}$.`, erreur: "signe de la charge de l’électron" }]) };
      } else {
        enonce = `<p>Le noyau ${$n(A, Z, X)} (${nomX} ${A}) se désintègre en ${$n(A2, Z2, Y)} (${nomY} ${A2}) en émettant une particule $\\,{}^{a}_{z}\\mathrm{P}$ :</p>$$${nuc(A, Z, X)} \\longrightarrow ${nuc(A2, Z2, Y)} + {}^{a}_{z}\\mathrm{P}$$`;
        const pa = ty === "al"
          ? [{ v: 2, fb: "Une particule α compte 4 nucléons : 2 protons et 2 neutrons.", erreur: "α ne change que A" }, { v: A + A2, fb: "On écrit $A = A' + a$ : $a = A - A'$.", erreur: "A conservé à tort en α" }]
          : [{ v: 1, fb: `$a = A - A' = ${A} - ${A2} = 0$ : la particule ne contient aucun nucléon.`, erreur: "A conservé à tort en α" }];
        q1 = { type: "nombre", q: "Que vaut le nombre de masse $a$ de la particule ?", reponse: a, tol: tolE, indice: "Les nucléons se conservent : $A = A' + a$.", pieges: pieges(a, tolE, pa) };
        q2 = { type: "nombre", q: "Que vaut son nombre de charge $z$ ?", reponse: z, tol: tolE, indice: "La charge se conserve : $z = Z - Z'$, avec son signe.",
          pieges: pieges(z, tolE, [{ v: -z, fb: `Attention au signe : $z = Z - Z' = ${Z} - ${Z2} = ${z}$.`, erreur: "signe de la charge de l’électron" }, { v: 0, fb: "La charge du noyau a changé : la particule emporte cette différence.", erreur: "γ change Z ou A" }]) };
      }
      const types = ["al", "bm", "bp"];
      const desc = { al: `$\\alpha$ : particule $${nuc(4, 2, "He")}$`, bm: `$\\beta^-$ : particule $${nuc(0, -1, "e")}$`, bp: `$\\beta^+$ : particule $${nuc(0, "+1", "e")}$` };
      const opts = types.map((t) => (t === ty ? { t: desc[t], ok: true } : { t: desc[t], fb: `Ici la particule est $${nuc(a, zTex(z), P)}$. ${t === "al" ? "Une particule α est un noyau d’hélium ; ce n’est pas le cas." : t === "bm" ? "Une particule β⁻ a une charge −1." : "Une particule β⁺ a une charge +1."}`, erreur: "type de radioactivité" }));
      opts.push({ t: "$\\gamma$ : rayonnement sans masse ni charge", fb: "Le rayonnement γ ne change ni $A$ ni $Z$ ; ici le noyau a changé d’élément.", erreur: "γ change Z ou A" });
      return {
        enonce,
        questions: [q1, q2, { type: "qcm", q: "De quel type de radioactivité s’agit-il ?", options: h.melange(opts) }],
        correction: [
          { tex: `${A} = ${A2} + ${a}`, r: "Conservation du nombre de nucléons (loi de Soddy)." },
          { tex: `${Z} = ${Z2} + ${z < 0 ? `(${z})` : z}`, r: "Conservation du nombre de charge (loi de Soddy)." },
          { tex: `${nuc(A, Z, X)} \\longrightarrow ${nuc(A2, Z2, Y)} + ${nuc(a, zTex(z), P)}`, r: "L’équation complète." },
          { t: `La particule émise est ${ty === "al" ? "un noyau d’hélium" : ty === "bm" ? "un électron" : "un positon"} : c’est une radioactivité ${NOM_TYPE[ty]}.` },
        ],
      };
    },
  },

  /* 3 — fraction restante et désintégrée après n demi-vies */
  {
    id: "fraction-demivies",
    titre: "Après plusieurs demi-vies : ce qui reste, ce qui est parti",
    niveau: 1,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.12"],
    erreurs: ["N₀/n au lieu de N₀/2ⁿ", "restants pris pour désintégrés"],
    gen(h) {
      const r = h.pick([...COURTS, ...LONGS]);
      const n = h.int(2, 6), t = sig(n * r.t, 4);
      const reste = 100 / 2 ** n, parti = 100 - reste;
      const tol = { abs: 0.06 };
      return {
        enonce: `<p>La demi-vie ${de(r.nom)} est $t_{1/2} = ${duree(r.t, r.u)}$. Un échantillon en contient $N_0$ noyaux à $t = 0$. On s’intéresse à l’instant $t = ${duree(t, r.u)}$.</p>`,
        questions: [
          { type: "nombre", q: "Quel pourcentage des noyaux initiaux reste-t-il à cet instant ?", reponse: reste, tol, unite: "%", indice: `Combien de demi-vies tiennent dans ${frs(t)} ${r.u} ? À chaque demi-vie, on divise par 2.`,
            pieges: pieges(reste, tol, [{ v: 100 / n, fb: `On divise par 2 à chaque demi-vie, pas par le nombre de demi-vies : $N_0/2^{${n}}$, pas $N_0/${n}$.`, erreur: "N₀/n au lieu de N₀/2ⁿ" }, { v: parti, fb: "Ça, ce sont les noyaux désintégrés. La question demande ceux qui restent.", erreur: "restants pris pour désintégrés" }]) },
          { type: "nombre", q: "Quel pourcentage s’est désintégré ?", reponse: parti, tol, unite: "%", indice: "Les noyaux désintégrés, ce sont tous ceux qui ne restent pas : $N_0 - N$.",
            pieges: pieges(parti, tol, [{ v: reste, fb: "Ça, c’est ce qui reste. Les désintégrés sont les autres : $100\\,\\% - $ ce qui reste.", erreur: "restants pris pour désintégrés" }, { v: 100 - 100 / n, fb: `On divise par 2 à chaque demi-vie : il reste $N_0/2^{${n}}$, pas $N_0/${n}$.`, erreur: "N₀/n au lieu de N₀/2ⁿ" }]) },
        ],
        correction: [
          { tex: `\\dfrac{t}{t_{1/2}} = \\dfrac{${frsT(t)}}{${frsT(r.t)}} = ${n}`, r: `Il s’est écoulé ${n} demi-vies.` },
          { tex: `N = \\dfrac{N_0}{2^{${n}}} = \\dfrac{N_0}{${2 ** n}}`, r: "On divise par 2 à chaque demi-vie." },
          { tex: `\\dfrac{N}{N_0} ${egal(reste)}\\,\\%`, r: "La part qui reste." },
          { tex: `\\dfrac{N_0 - N}{N_0} ${egal(parti)}\\,\\%`, r: "La part désintégrée : tout le reste." },
        ],
      };
    },
  },

  /* 4 — lire t½ et τ sur une courbe a(t) */
  {
    id: "lire-demivie-tau",
    titre: "Lire la demi-vie et la constante de temps sur une courbe",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.12", "pc-pc 1.2.1.13"],
    erreurs: ["τ confondu avec t½", "lire a₀/4 au lieu de a₀/2", "t½ = 1/λ"],
    gen(h) {
      const u = h.pick(["heures", "jours", "min"]);
      const th = h.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
      const a0m = h.pick([2, 3, 4, 5, 6, 8]), e = h.int(3, 12);
      const xmax0 = 5 * th, s = pas(xmax0 / 8), xmax = Math.ceil(xmax0 / s) * s;
      const tau = th / LN2, lam = LN2 / th;
      const tol = { abs: Math.max(0.12 * th, Math.min(s / 4, 0.2 * th)) };
      return {
        enonce: `<p>La courbe donne l’activité $a(t)$ d’un échantillon radioactif. La tangente à la courbe à l’origine est tracée en pointillés.</p>`,
        figure: figureActivite({ a0m, e, th, u, xmax, s, tangente: true }),
        questions: [
          { type: "nombre", q: `Lis la demi-vie $t_{1/2}$, en ${u}.`, reponse: th, tol, unite: u, indice: `Cherche l’instant où l’activité vaut la moitié de $a_0 = ${a0m}\\times10^{${e}}$ Bq.`,
            pieges: pieges(th, tol, [{ v: tau, fb: "Tu as lu τ, là où la tangente coupe l’axe. La demi-vie se lit à $a = a_0/2$.", erreur: "τ confondu avec t½" }, { v: 2 * th, fb: "À cet instant, il reste $a_0/4$ : deux demi-vies. Lis à $a_0/2$.", erreur: "lire a₀/4 au lieu de a₀/2" }]) },
          { type: "nombre", q: `Lis la constante de temps τ, en ${u}.`, reponse: tau, tol, unite: u, indice: "La tangente à l’origine coupe l’axe des temps en $t = \\tau$.",
            pieges: pieges(tau, tol, [{ v: th, fb: "Ça, c’est la demi-vie. τ se lit où la tangente à l’origine coupe l’axe des temps.", erreur: "τ confondu avec t½" }, { v: th * LN2, fb: "$\\tau = t_{1/2}/\\ln 2$ : τ est plus grand que $t_{1/2}$, pas plus petit.", erreur: "τ confondu avec t½" }]) },
          { type: "nombre", q: `En déduire la constante radioactive λ, en ${unSing(u)}$^{-1}$.`, reponse: lam, tol: { rel: 0.2 }, indice: "$\\lambda = \\dfrac{\\ln 2}{t_{1/2}}$, ou $\\lambda = 1/\\tau$.",
            pieges: pieges(lam, { rel: 0.2 }, [{ v: 1 / th, fb: "$t_{1/2} = \\ln 2/\\lambda$, pas $1/\\lambda$ : il manque $\\ln 2$.", erreur: "t½ = 1/λ" }, { v: th / LN2, fb: "C’est τ. λ en est l’inverse : $\\lambda = 1/\\tau$.", erreur: "t½ = 1/λ" }]) },
        ],
        correction: [
          { t: `À $t = t_{1/2}$, $a = a_0/2 = ${frTex(a0m / 2, a0m % 2 ? 1 : 0)}\\times10^{${e}}$ Bq : on lit $t_{1/2} \\approx ${frTex(th, 0)}$ ${u}.` },
          { t: `La tangente à l’origine coupe l’axe des temps en $\\tau \\approx ${frTex(tau, 1)}$ ${u}.` },
          { tex: `\\tau = \\dfrac{t_{1/2}}{\\ln 2} = \\dfrac{${th}}{\\ln 2} \\approx ${frTex(tau, 1)}`, r: "Le calcul confirme la lecture." },
          { tex: `\\lambda = \\dfrac{\\ln 2}{t_{1/2}} = \\dfrac{\\ln 2}{${th}} \\approx ${frTex(lam, 3)}\\ \\text{${unSing(u)}}^{-1}`, r: "λ s’exprime dans l’unité inverse du temps." },
        ],
      };
    },
  },

  /* 5 — de t½ à λ et τ, en s⁻¹ */
  {
    id: "lambda-unites",
    titre: "De la demi-vie à λ et τ, en secondes",
    niveau: 1,
    capacites: ["pc-pc 1.2.1.13", "pc-pc 1.2.1.14"],
    erreurs: ["unités non converties", "t½ = 1/λ", "τ confondu avec t½"],
    gen(h) {
      const r = h.pick([...COURTS, ...LONGS]);
      const an = h.pick([365 * JOUR, 3.15e7, 3.16e7]);
      const unS = r.u === "jours" ? JOUR : an;
      const donnee = r.u === "jours" ? "$1\\ \\text{jour} = 86\\,400\\ \\text{s}$" : an === 365 * JOUR ? "$1\\ \\text{an} = 365\\ \\text{jours}$ et $1\\ \\text{jour} = 86\\,400\\ \\text{s}$" : `$1\\ \\text{an} = ${sci(an, 3)}\\ \\text{s}$`;
      const ts = r.t * unS, lam = LN2 / ts, tau = 1 / lam;
      const unTex = r.u === "jours" ? "86\\,400" : an === 365 * JOUR ? "365 \\times 86\\,400" : sci(an, 3);
      const tR = { rel: 0.015 };
      return {
        enonce: `<p>La demi-vie ${de(r.nom)} est $t_{1/2} = ${duree(r.t, r.u)}$. On donne : ${donnee}.</p>`,
        questions: [
          { type: "nombre", q: "Exprime $t_{1/2}$ en secondes.", reponse: ts, tol: tR, unite: "s", indice: r.u === "jours" ? "Multiplie par le nombre de secondes d’un jour." : "Convertis les années en secondes avec la donnée.",
            pieges: pieges(ts, tR, [{ v: r.t, fb: "Il faut convertir : la valeur en secondes est bien plus grande.", erreur: "unités non converties" }, { v: r.t * (r.u === "jours" ? 3600 : 365), fb: r.u === "jours" ? "Un jour compte 86 400 s (24 × 3 600), pas 3 600." : "Ça, c’est en jours. Il reste à multiplier par 86 400 s.", erreur: "unités non converties" }]) },
          { type: "nombre", q: "Calcule la constante radioactive λ, en s$^{-1}$.", reponse: lam, tol: tR, unite: "s$^{-1}$", indice: "$t_{1/2} = \\dfrac{\\ln 2}{\\lambda}$, donc $\\lambda = \\dfrac{\\ln 2}{t_{1/2}}$, avec $t_{1/2}$ en secondes.",
            pieges: pieges(lam, tR, [{ v: 1 / ts, fb: "Il manque $\\ln 2$ : $\\lambda = \\ln 2 / t_{1/2}$.", erreur: "t½ = 1/λ" }, { v: LN2 / r.t, fb: `Ça, c’est λ en ${unSing(r.u)}$^{-1}$. Pour l’avoir en s$^{-1}$, $t_{1/2}$ doit être en secondes.`, erreur: "unités non converties" }, { v: LN2 * ts, fb: "λ est l’inverse d’un temps : $\\lambda = \\ln 2 / t_{1/2}$, pas $\\ln 2 \\times t_{1/2}$.", erreur: "t½ = 1/λ" }]) },
          { type: "nombre", q: "Calcule la constante de temps τ, en secondes.", reponse: tau, tol: tR, unite: "s", indice: "$\\tau = 1/\\lambda$.",
            pieges: pieges(tau, tR, [{ v: ts, fb: "Ça, c’est $t_{1/2}$. $\\tau = 1/\\lambda = t_{1/2}/\\ln 2$, plus grand que $t_{1/2}$.", erreur: "τ confondu avec t½" }, { v: ts * LN2, fb: "$\\tau = t_{1/2}/\\ln 2$ : on divise par $\\ln 2$.", erreur: "τ confondu avec t½" }]) },
        ],
        correction: [
          { tex: `t_{1/2} = ${frsT(r.t)} \\times ${unTex}\\ \\text{s} \\approx ${sci(ts, 3)}\\ \\text{s}`, r: "On convertit d’abord en secondes." },
          { tex: `\\lambda = \\dfrac{\\ln 2}{t_{1/2}} \\approx \\dfrac{0{,}693}{${sci(ts, 3)}} \\approx ${sci(lam, 3)}\\ \\text{s}^{-1}`, r: "λ en s$^{-1}$, puisque $t_{1/2}$ est en secondes." },
          { tex: `\\tau = \\dfrac{1}{\\lambda} \\approx ${sci(tau, 3)}\\ \\text{s}`, r: "τ est une durée : $[\\lambda] \\times [t] = 1$, donc $[\\tau] = [t]$." },
        ],
      };
    },
  },

  /* 6 — N₀ depuis une masse, puis l'activité */
  {
    id: "n0-masse-activite",
    titre: "Le nombre de noyaux d’une masse, puis son activité",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.11", "pc-pc 1.2.1.13"],
    erreurs: ["unités non converties", "quantité de matière prise pour N", "activité prise pour N", "t½ = 1/λ"],
    gen(h) {
      const r = h.pick([...COURTS, ...LONGS]);
      const [uM, kM] = h.pick([["µg", 1e-6], ["mg", 1e-3], ["ng", 1e-9]]);
      const mv = h.pick([1.0, 2.0, 2.5, 5.0, 0.5]);
      const m = mv * kM, M = r.A;
      const uT = uM === "µg" ? "\\mu\\text{g}" : `\\text{${uM}}`;
      const N0 = (m / M) * NA;
      const unS = r.u === "jours" ? JOUR : 3.15e7;
      const lam = LN2 / (r.t * unS), a0 = lam * N0;
      const tN = { rel: 0.02 }, tA = { rel: 0.03 };
      const donnee = r.u === "jours" ? "$1\\ \\text{jour} = 86\\,400\\ \\text{s}$" : "$1\\ \\text{an} = 3{,}15 \\times 10^{7}\\ \\text{s}$";
      return {
        enonce: `<p>Un échantillon contient $m = ${frTex(mv, 1)}\\ ${uT}$ ${partitif(r.nom)} ${$n(r.A, r.Z, r.X)}, de masse molaire $M = ${M}\\ \\text{g·mol}^{-1}$ et de demi-vie $t_{1/2} = ${duree(r.t, r.u)}$.</p><p>On donne : $N_{\\mathrm{A}} = 6{,}02 \\times 10^{23}\\ \\text{mol}^{-1}$ ; ${donnee}.</p>`,
        questions: [
          { type: "nombre", q: "Calcule le nombre $N_0$ de noyaux de l’échantillon.", reponse: N0, tol: tN, indice: `$N_0 = \\dfrac{m}{M} \\times N_{\\mathrm{A}}$, avec $m$ en grammes ($1\\ ${uT} = ${sci(kM, 1)}\\ \\text{g}$).`,
            pieges: pieges(N0, tN, [
              { v: (mv / M) * NA, fb: `Convertis d’abord la masse en grammes : $1\\ ${uT} = ${sci(kM, 1)}\\ \\text{g}$.`, erreur: "unités non converties" },
              { v: N0 * 1e3, fb: "Vérifie la conversion : le préfixe ne correspond pas.", erreur: "unités non converties" },
              { v: N0 / 1e3, fb: "Tu as converti en kilogrammes ; $M$ est en g·mol$^{-1}$, $m$ doit être en grammes.", erreur: "unités non converties" },
              { v: m / M, fb: "C’est la quantité de matière, en moles. Multiplie par $N_{\\mathrm{A}}$.", erreur: "quantité de matière prise pour N" },
              { v: m * M * NA, fb: "On divise par $M$ : $N_0 = (m/M) \\times N_{\\mathrm{A}}$.", erreur: "quantité de matière prise pour N" },
            ]) },
          { type: "nombre", q: "Calcule son activité $a_0$ à cet instant, en becquerels.", reponse: a0, tol: tA, unite: "Bq", indice: "$a_0 = \\lambda N_0$, avec $\\lambda = \\ln 2 / t_{1/2}$ en s$^{-1}$ (1 Bq = 1 désintégration par seconde).",
            pieges: pieges(a0, tA, [
              { v: (LN2 / r.t) * N0, fb: `λ doit être en s$^{-1}$ : convertis $t_{1/2}$ en secondes (un becquerel compte des désintégrations par seconde).`, erreur: "unités non converties" },
              { v: N0 / (r.t * unS), fb: "Il manque $\\ln 2$ : $\\lambda = \\ln 2 / t_{1/2}$.", erreur: "t½ = 1/λ" },
              { v: N0 / lam, fb: "$a = \\lambda N$ : on multiplie par λ, on ne divise pas.", erreur: "activité prise pour N" },
              { v: N0, fb: "L’activité n’est pas le nombre de noyaux : $a_0 = \\lambda N_0$.", erreur: "activité prise pour N" },
            ]) },
        ],
        correction: [
          { tex: `N_0 = \\dfrac{m}{M}\\,N_{\\mathrm{A}} = \\dfrac{${sci(m, 2)}\\ \\text{g}}{${M}\\ \\text{g·mol}^{-1}} \\times ${sci(NA, 3)}\\ \\text{mol}^{-1}`, r: "L’expression littérale, puis les valeurs, la masse en grammes." },
          { tex: `N_0 \\approx ${sci(N0, 2)}\\ \\text{noyaux}`, r: "" },
          { tex: `\\lambda = \\dfrac{\\ln 2}{t_{1/2}} = \\dfrac{\\ln 2}{${sci(r.t * unS, 3)}\\ \\text{s}} \\approx ${sci(lam, 3)}\\ \\text{s}^{-1}`, r: "λ en s$^{-1}$." },
          { tex: `a_0 = \\lambda N_0 \\approx ${sci(a0, 2)}\\ \\text{Bq}`, r: "L’activité : des désintégrations par seconde." },
        ],
      };
    },
  },

  /* 7 — l'instant d'un seuil */
  {
    id: "instant-seuil",
    titre: "À quel instant ? L’expression littérale, puis la valeur",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.13"],
    erreurs: ["restants pris pour désintégrés", "signe du logarithme", "décroissance prise pour linéaire"],
    gen(h) {
      const r = h.pick([...COURTS, ...LONGS]);
      const mode = h.pick(["p", "p", "k"]);
      let reste, phrase, srcs;
      if (mode === "p") { const p = h.pick([30, 50, 75, 80, 90, 95, 99]); reste = 1 - p / 100; phrase = `l’instant $t_1$ où ${p}${PC} des noyaux initiaux se sont désintégrés`; srcs = p; }
      else { const k = h.pick([4, 8, 10, 20, 100]); reste = 1 / k; phrase = `l’instant $t_1$ où l’activité vaut $a_1 = a_0/${k}$`; srcs = k; }
      const inv = 1 / reste, t1 = (r.t / LN2) * Math.log(inv);
      const invTex = Number.isInteger(Math.round(inv * 1000) / 1000) ? `${Math.round(inv)}` : `\\dfrac{1}{${frsT(reste)}}`;
      const opts = [
        { t: `$t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln ${invTex}$`, ok: true },
        { t: `$t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln ${frsT(reste)}$`, fb: "Ce temps serait négatif : $\\ln$ d’un nombre plus petit que 1 est négatif. En isolant l’exponentielle, on obtient $e^{\\lambda t_1} = N_0/N$.", erreur: "signe du logarithme" },
        { t: `$t_1 = ${frsT(1 - reste)}\\,t_{1/2}$`, fb: "La décroissance n’est pas proportionnelle au temps : il faut la loi exponentielle.", erreur: "décroissance prise pour linéaire" },
      ];
      if (mode === "p" && Math.abs(reste - 0.5) > 0.01) opts.push({ t: `$t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln \\dfrac{1}{${frsT(1 - reste)}}$`, fb: `${srcs}${PC} désintégrés : il en <b>reste</b> ${fr(100 - srcs, 0)}${PC}. La loi porte sur ce qui reste.`, erreur: "restants pris pour désintégrés" });
      const tol = { rel: 0.015 };
      return {
        enonce: `<p>La demi-vie ${de(r.nom)} est $t_{1/2} = ${duree(r.t, r.u)}$. On cherche ${phrase}.</p>`,
        questions: [
          { type: "qcm", q: "Quelle est l’expression littérale de $t_1$ ?", options: h.melange(opts) },
          { type: "nombre", q: `Calcule $t_1$, en ${r.u}.`, reponse: t1, tol, unite: r.u, indice: "Remplace $t_{1/2}$ par sa valeur, dans la même unité : $t_1$ sort en " + r.u + ".",
            pieges: pieges(t1, tol, [
              { v: -t1, fb: "Un instant négatif signale une erreur de signe : c’est $\\ln(N_0/N)$, positif.", erreur: "signe du logarithme" },
              { v: (1 - reste) * r.t, fb: "La décroissance n’est pas linéaire : on utilise la loi exponentielle.", erreur: "décroissance prise pour linéaire" },
              ...(mode === "p" ? [{ v: (r.t / LN2) * Math.log(1 / (1 - reste)), fb: "Tu as écrit la loi pour les désintégrés. Elle donne ce qui reste.", erreur: "restants pris pour désintégrés" }] : []),
            ]) },
        ],
        correction: [
          { tex: `N(t_1) = ${frsT(reste)}\\,N_0`, r: mode === "p" ? `${srcs}${PC} désintégrés : il en reste ${fr(100 - srcs, 0)}${PC}.` : "L’activité est proportionnelle au nombre de noyaux : $a = \\lambda N$." },
          { tex: `N_0\\,e^{-\\lambda t_1} = ${frsT(reste)}\\,N_0 \\iff e^{\\lambda t_1} = ${invTex}`, r: "On divise par $N_0$, puis on prend l’inverse." },
          { tex: `t_1 = \\dfrac{1}{\\lambda}\\ln ${invTex} = \\dfrac{t_{1/2}}{\\ln 2}\\ln ${invTex}`, r: "$e^x = y \\iff x = \\ln y$, et $\\lambda = \\ln 2 / t_{1/2}$." },
          { tex: `t_1 \\approx ${frTex(t1, t1 < 10 ? 2 : 1)}\\ \\text{${r.u}}`, r: "L’application numérique, avec l’unité." },
        ],
      };
    },
  },

  /* 8 — noyaux désintégrés entre deux dates */
  {
    id: "desintegres-entre-dates",
    titre: "Les noyaux désintégrés entre deux dates",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.12"],
    erreurs: ["désintégrés depuis t = 0 au lieu de entre t₁ et t₂", "restants pris pour désintégrés", "N₀/n au lieu de N₀/2ⁿ"],
    gen(h) {
      const r = h.pick(COURTS);
      const n1 = h.int(1, 3), n2 = n1 + h.int(1, 2);
      const m = h.pick([1.6, 2.4, 3.2, 4.0, 4.8, 6.4, 8.0]), e = h.int(10, 16);
      const N0 = m * 10 ** e, N1 = N0 / 2 ** n1, N2 = N0 / 2 ** n2, Nd = N1 - N2;
      const tol = { rel: 0.01 };
      return {
        enonce: `<p>Un échantillon ${partitif(r.nom)} ($t_{1/2} = ${duree(r.t, r.u)}$) contient $N_0 = ${sci(N0, 2)}$ noyaux à $t = 0$. On note $t_1 = ${n1 === 1 ? "" : n1}\\,t_{1/2}$ et $t_2 = ${n2}\\,t_{1/2}$ (le sujet 2025 fait ce calcul avec $t_1 = 2\\,t_{1/2}$ et $t_2 = 3\\,t_{1/2}$).</p>`,
        questions: [
          { type: "nombre", q: "Combien de noyaux restent à l’instant $t_1$ ?", reponse: N1, tol, indice: `À $t_1$, il s’est écoulé ${n1} demi-vie${n1 > 1 ? "s" : ""} : on divise $N_0$ par $2^{${n1}}$.`,
            pieges: pieges(N1, tol, [{ v: N0 / n1, fb: `On divise par 2 à chaque demi-vie : $N_0/2^{${n1}}$.`, erreur: "N₀/n au lieu de N₀/2ⁿ" }, { v: N0 - N1, fb: "Ça, ce sont les noyaux déjà désintégrés.", erreur: "restants pris pour désintégrés" }]) },
          { type: "nombre", q: "Combien de noyaux se désintègrent entre $t_1$ et $t_2$ ?", reponse: Nd, tol, indice: "Les désintégrés entre deux dates : ce qui restait à $t_1$, moins ce qui reste à $t_2$.",
            pieges: pieges(Nd, tol, [{ v: N0 - N2, fb: "Ça, ce sont les désintégrés depuis $t = 0$. Entre $t_1$ et $t_2$ : $N(t_1) - N(t_2)$.", erreur: "désintégrés depuis t = 0 au lieu de entre t₁ et t₂" }, { v: N2, fb: "Ça, c’est ce qui reste à $t_2$.", erreur: "restants pris pour désintégrés" }]) },
        ],
        correction: [
          { tex: `N(t_1) = \\dfrac{N_0}{2^{${n1}}} \\approx ${sci(N1, 3)}`, r: `${n1} demi-vie${n1 > 1 ? "s" : ""} écoulée${n1 > 1 ? "s" : ""}.` },
          { tex: `N(t_2) = \\dfrac{N_0}{2^{${n2}}} \\approx ${sci(N2, 3)}`, r: `${n2} demi-vies écoulées.` },
          { tex: `N_d = N(t_1) - N(t_2) = N_0\\left(\\dfrac{1}{${2 ** n1}} - \\dfrac{1}{${2 ** n2}}\\right) \\approx ${sci(Nd, 3)}`, r: "Les noyaux désintégrés entre les deux dates." },
        ],
      };
    },
  },

  /* 9 — datation au carbone 14 */
  {
    id: "datation-c14",
    titre: "Dater au carbone 14",
    niveau: 2,
    capacites: ["pc-pc 1.2.1.10", "pc-pc 1.2.1.15"],
    erreurs: ["signe du logarithme", "t½ = 1/λ", "décroissance prise pour linéaire"],
    gen(h) {
      const T = h.pick([5730, 5730, 5570]);
      const a0 = h.int(120, 480);
      let ratio; do { ratio = h.dec(0.15, 0.85, 3); } while ([0.5, 0.25, 0.125].some((b) => Math.abs(ratio - b) < 0.04));
      const a1 = Math.round(a0 * ratio), q = a1 / a0;
      const age = (T / LN2) * Math.log(a0 / a1);
      const n = Math.floor(Math.log2(a0 / a1));
      const tranches = [["moins d’une demi-vie", 0], ["entre une et deux demi-vies", 1], ["entre deux et trois demi-vies", 2], ["plus de trois demi-vies", 3]];
      const opts = tranches.map(([t, k]) => (k === Math.min(n, 3) ? { t, ok: true } : { t, fb: `$a_1/a_0 \\approx ${frTex(q, 2)}$ : compare à $1/2$, $1/4$, $1/8$ (une, deux, trois demi-vies).`, erreur: "décroissance prise pour linéaire" }));
      const tol = { rel: 0.01 };
      const objet = h.pick(["un morceau de bois ancien", "un charbon de bois d’un ancien foyer", "une statue en bois"]);
      return {
        enonce: `<p>L’activité du carbone 14 dans ${objet} est $a_1 = ${a1}\\ \\text{Bq}$ ; celle d’un bois récent de même masse et de même nature est $a_0 = ${a0}\\ \\text{Bq}$. Demi-vie du carbone 14 : $t_{1/2} = ${T}\\ \\text{ans}$.</p>`,
        questions: [
          { type: "qcm", q: "Sans calcul, son âge est…", options: h.melange(opts) },
          { type: "nombre", q: "Calcule son âge $t_1$, en années.", reponse: age, tol, unite: "ans", indice: "$a_1 = a_0\\,e^{-\\lambda t_1}$, donc $t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln\\dfrac{a_0}{a_1}$.",
            pieges: pieges(age, tol, [{ v: -age, fb: "Un âge négatif : c’est $\\ln(a_0/a_1)$, positif, et non $\\ln(a_1/a_0)$.", erreur: "signe du logarithme" }, { v: T * Math.log(a0 / a1), fb: "Il manque $\\ln 2$ : $1/\\lambda = t_{1/2}/\\ln 2$.", erreur: "t½ = 1/λ" }, { v: T * (1 - q) * 2, fb: "La décroissance n’est pas linéaire : il faut le logarithme.", erreur: "décroissance prise pour linéaire" }]) },
        ],
        correction: [
          { tex: `\\dfrac{a_1}{a_0} = \\dfrac{${a1}}{${a0}} \\approx ${frTex(q, 3)}`, r: n === 0 ? `Plus que $1/2$ : ${tranches[0][0]}.` : `Entre $1/${2 ** (n + 1)}$ et $1/${2 ** n}$ : ${tranches[Math.min(n, 3)][0]}.` },
          { tex: `a_1 = a_0\\,e^{-\\lambda t_1} \\iff t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln\\dfrac{a_0}{a_1}`, r: "L’expression littérale d’abord." },
          { tex: `t_1 = \\dfrac{${T}}{\\ln 2}\\times\\ln\\dfrac{${a0}}{${a1}} \\approx ${frTex(age, 0)}\\ \\text{ans}`, r: "Puis l’application numérique, avec l’unité." },
        ],
      };
    },
  },

  /* 10 — choisir le radioélément */
  {
    id: "choisir-radioelement",
    titre: "Choisir le radioélément pour dater",
    niveau: 1,
    capacites: ["pc-pc 1.2.1.15"],
    erreurs: ["demi-vie trop courte devant l’âge", "demi-vie trop longue devant l’âge"],
    gen(h) {
      const R = [
        { k: "H3", t: "le tritium ($t_{1/2} = 12{,}3$ ans)", th: 12.3 },
        { k: "C14", t: "le carbone 14 ($t_{1/2} = 5\\,730$ ans)", th: 5730 },
        { k: "K40", t: "le potassium 40 ($t_{1/2} = 1{,}25 \\times 10^{9}$ ans)", th: 1.25e9 },
        { k: "I131", t: "l’iode 131 ($t_{1/2} = 8$ jours)", th: 8 / 365 },
      ];
      const cas = h.pick([
        { k: "H3", age: h.int(5, 40), quoi: (a) => `un vin mis en bouteille il y a environ ${a} ans` },
        { k: "C14", age: h.pick([2000, 3500, 6000, 9000, 15000, 25000]), quoi: (a) => `un os trouvé dans une grotte, vieux d’environ ${fr(a, 0)} ans` },
        { k: "K40", age: h.pick([0.5, 0.8, 1.2, 2, 3]), quoi: (a) => `une roche volcanique de ${fr(a, 1).replace(",0", "")} milliard${a >= 2 ? "s" : ""} d’années` },
      ]);
      const age = cas.k === "K40" ? cas.age * 1e9 : cas.age;
      const combien = (n) => (n < 1000 ? `${fr(n, 0)} demi-vies` : n < 1e6 ? "des milliers de demi-vies" : "des millions de demi-vies");
      const opts = R.map((x) => x.k === cas.k ? { t: x.t, ok: true } : { t: x.t,
        fb: x.th < age / 30 ? `Sa demi-vie est bien trop courte devant l’âge : il s’est écoulé ${combien(age / x.th)}, il n’en reste plus rien à mesurer.` : `Sa demi-vie est bien trop longue : sur cette durée, il ne perd presque rien, la différence ne se mesure pas.`,
        erreur: x.th < age / 30 ? "demi-vie trop courte devant l’âge" : "demi-vie trop longue devant l’âge" });
      const just = h.melange([
        { t: "Sa demi-vie est du même ordre de grandeur que l’âge à mesurer.", ok: true },
        { t: "Il faut toujours la demi-vie la plus longue possible.", fb: "Trop longue, presque rien n’a changé : on ne peut pas mesurer la différence.", erreur: "demi-vie trop longue devant l’âge" },
        { t: "Il faut toujours la demi-vie la plus courte possible.", fb: "Trop courte, tout a disparu : il ne reste rien à compter.", erreur: "demi-vie trop courte devant l’âge" },
        { t: "N’importe lequel convient, si l’on mesure assez précisément.", fb: "Aucun détecteur ne compte des noyaux disparus, ni une différence de quelques milliardièmes.", erreur: "demi-vie trop longue devant l’âge" },
      ]);
      return {
        enonce: `<p>On veut dater ${cas.quoi(cas.age)}.</p>`,
        questions: [
          { type: "qcm", q: "Quel radioélément choisir ?", options: h.melange(opts) },
          { type: "qcm", q: "Pourquoi ?", options: just },
        ],
        correction: [
          { t: "On choisit un radioélément dont la demi-vie est du même ordre de grandeur que l’âge à mesurer : il en reste assez pour compter, et assez a disparu pour mesurer la différence." },
          { t: `Ici : ${R.find((x) => x.k === cas.k).t}.` },
        ],
      };
    },
  },

  /* 11 — un exercice complet, au format du bac */
  {
    id: "bac-complet",
    titre: "Un exercice complet, au format du bac",
    niveau: 3,
    capacites: ["pc-pc 1.2.1.8", "pc-pc 1.2.1.10", "pc-pc 1.2.1.11", "pc-pc 1.2.1.13"],
    erreurs: ["α ne change que A", "signe de la charge de l’électron", "unités non converties", "restants pris pour désintégrés", "τ confondu avec t½"],
    gen(h) {
      const r = h.pick([
        { nom: "l’iode 131", X: "I", A: 131, Z: 53, Y: "Xe", fils: "xénon", ty: "bm", t: 8, usage: "utilisé pour soigner la thyroïde (sujet 2022)" },
        { nom: "l’iridium 192", X: "Ir", A: 192, Z: 77, Y: "Pt", fils: "platine", ty: "bm", t: 74, usage: "utilisé en curiethérapie (sujet 2024)" },
        { nom: "le radon 222", X: "Rn", A: 222, Z: 86, Y: "Po", fils: "polonium", ty: "al", t: 3.8, usage: "présent dans l’air des maisons (sujet 2019)" },
        { nom: "le polonium 210", X: "Po", A: 210, Z: 84, Y: "Pb", fils: "plomb", ty: "al", t: 138, usage: "un émetteur α naturel" },
        { nom: "le phosphore 32", X: "P", A: 32, Z: 15, Y: "S", fils: "soufre", ty: "bm", t: 14.3, usage: "utilisé comme traceur en biologie" },
      ]);
      const [a, z, P] = PART[r.ty];
      const A2 = r.A - a, Z2 = r.Z - z, zTex = `${z}`;
      const a0m = h.pick([2, 3, 4, 5, 6]), e = h.int(5, 12), a0 = a0m * 10 ** e;
      const p = h.pick([75, 87.5, 90, 95, 99]), reste = 1 - p / 100;
      const lam = LN2 / (r.t * JOUR), N0 = a0 / lam, t1 = (r.t / LN2) * Math.log(1 / reste);
      const s = r.t, xmax = 5 * r.t;
      const tolE = { abs: 0.01 }, tolL = { abs: 0.15 * r.t }, tolN = { rel: 0.03 }, tolT = { rel: 0.015 };
      return {
        enonce: `<p>${r.nom[0].toUpperCase() + r.nom.slice(1)} ${$n(r.A, r.Z, r.X)}, ${r.usage}, est radioactif ${NOM_TYPE[r.ty]} : il donne un noyau ${partitif(r.fils)} $\\,{}^{A'}_{Z'}\\mathrm{${r.Y}}$. La figure donne l’activité $a(t)$ d’un échantillon, $t$ en jours.</p><p>Données : $1\\ \\text{jour} = 86\\,400\\ \\text{s}$. On donnera les expressions littérales avant les applications numériques.</p>`,
        figure: figureActivite({ a0m, e, th: r.t, u: "jours", xmax, s, tangente: false }),
        questions: [
          { type: "nombre", q: "1. Écrire l’équation de la désintégration : que vaut $A'$ ?", reponse: A2, tol: tolE, indice: "Conservation du nombre de nucléons.",
            pieges: pieges(A2, tolE, [{ v: r.A, fb: r.ty === "al" ? "La particule α emporte 4 nucléons." : "Ici $A'$ ne change pas… vérifie la particule.", erreur: "α ne change que A" }, ...(r.ty === "al" ? [{ v: r.A - 2, fb: "La particule α compte 4 nucléons.", erreur: "α ne change que A" }] : [{ v: r.A - 1, fb: "La particule β⁻ ne contient aucun nucléon : $A' = A$.", erreur: "α ne change que A" }])]) },
          { type: "nombre", q: "… et $Z'$ ?", reponse: Z2, tol: tolE, indice: "Conservation du nombre de charge, avec le signe de la particule.",
            pieges: pieges(Z2, tolE, [{ v: r.Z, fb: r.ty === "al" ? "α emporte aussi 2 protons : « α ne change que $A$ » est faux." : "La particule emporte une charge : $Z$ change.", erreur: "α ne change que A" }, { v: r.Z + z, fb: "Attention au signe de la charge de la particule.", erreur: "signe de la charge de l’électron" }]) },
          { type: "nombre", q: "2. Déterminer graphiquement la demi-vie $t_{1/2}$, en jours.", reponse: r.t, tol: tolL, unite: "jours", indice: "Cherche l’instant où $a = a_0/2$.",
            pieges: pieges(r.t, tolL, [{ v: r.t / LN2, fb: "Tu as lu à 37 % de $a_0$ (c’est τ). La demi-vie se lit à $a_0/2$.", erreur: "τ confondu avec t½" }, { v: 2 * r.t, fb: "À cet instant, il reste $a_0/4$.", erreur: "restants pris pour désintégrés" }]) },
          { type: "nombre", q: "3. Calculer $N_0$, le nombre de noyaux à l’instant initial.", reponse: N0, tol: tolN, indice: "$a_0 = \\lambda N_0$, avec $\\lambda = \\ln 2 / t_{1/2}$ en s$^{-1}$.",
            pieges: pieges(N0, tolN, [{ v: a0 / (LN2 / r.t), fb: "λ doit être en s$^{-1}$ : un becquerel compte des désintégrations par seconde.", erreur: "unités non converties" }, { v: a0 * lam, fb: "$N_0 = a_0/\\lambda$ : on divise.", erreur: "unités non converties" }, { v: a0, fb: "L’activité n’est pas le nombre de noyaux.", erreur: "unités non converties" }]) },
          { type: "nombre", q: `4. Déterminer, en jours, l’instant $t_1$ où ${frs(p)}${PC} des noyaux se sont désintégrés.`, reponse: t1, tol: tolT, unite: "jours", indice: `Il en reste ${frs(100 - p)}${PC} : écris $N(t_1) = ${frsT(reste)}\\,N_0$.`,
            pieges: pieges(t1, tolT, [{ v: (r.t / LN2) * Math.log(1 / (p / 100)), fb: `${frs(p)}${PC}, ce sont les désintégrés ; la loi porte sur ce qui reste.`, erreur: "restants pris pour désintégrés" }, { v: -t1, fb: "Un instant négatif : vérifie le signe du logarithme.", erreur: "restants pris pour désintégrés" }]) },
        ],
        correction: [
          { tex: `${nuc(r.A, r.Z, r.X)} \\longrightarrow ${nuc(A2, Z2, r.Y)} + ${nuc(a, zTex, P)}`, r: `Lois de Soddy : $${r.A} = ${A2} + ${a}$ et $${r.Z} = ${Z2} + ${z < 0 ? `(${z})` : z}$.` },
          { t: `À $a = a_0/2 = ${frTex(a0m / 2, a0m % 2 ? 1 : 0)}\\times10^{${e}}$ Bq, on lit $t_{1/2} = ${frsT(r.t)}$ jours.` },
          { tex: `\\lambda = \\dfrac{\\ln 2}{t_{1/2}} = \\dfrac{\\ln 2}{${frsT(r.t)} \\times 86\\,400\\ \\text{s}} \\approx ${sci(lam, 3)}\\ \\text{s}^{-1}`, r: "λ en s$^{-1}$." },
          { tex: `N_0 = \\dfrac{a_0}{\\lambda} \\approx \\dfrac{${sci(a0, 2)}}{${sci(lam, 3)}} \\approx ${sci(N0, 2)}`, r: "Car $a_0 = \\lambda N_0$." },
          { tex: `N(t_1) = ${frsT(reste)}\\,N_0 \\iff t_1 = \\dfrac{t_{1/2}}{\\ln 2}\\,\\ln\\dfrac{1}{${frsT(reste)}}`, r: "Ce qui reste, l’expression littérale." },
          { tex: `t_1 \\approx ${frTex(t1, 1)}\\ \\text{jours}`, r: "L’application numérique, avec l’unité." },
        ],
      };
    },
  },
];
