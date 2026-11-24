// @ts-nocheck
/**
 * Les exercices de la leçon « La méiose, la fécondation et les brassages » (V3). Format : voir modele.js.
 * Capacités : svt-svt 3.1.1 à 3.1.4 et 3.2.3, svt-pc 2.3.1 à 2.3.4 et 2.4.3 (docs/referentiel/).
 *
 * La réponse est CALCULÉE (meiose-outils.js : types(n), couple(n), etat(phase, n), dessinCellule) ;
 * chaque leurre est une erreur classique nommée, et tout tirage où deux valeurs coïncident est exclu
 * (n = 1, 2 et 4 ne servent jamais aux questions qui opposent 2ⁿ, 2 × n et n²). Les schémas de cellules
 * sont ceux de la leçon (mêmes primitives). Espèces : drosophile (2n = 8) et Homme (2n = 46) ; l'Ascaris
 * n'a pas de formule gonosomique ici (non sourcée). Les deux exercices « au bac » sont des exercices
 * types, dits tels, au barème indicatif : aucun n'est tiré d'un sujet.
 */
import { dessinCellule, svgCellule, svgGroupe, etat, types, couple, ESPECES, PHASES } from "../meiose-outils.js";

const CAP = (...ids) => ids.flatMap((id) => (id === "3.2.3" ? ["svt-svt 3.2.3", "svt-pc 2.4.3"] : [`svt-svt ${id}`, `svt-pc ${id.replace(/^3\.1/, "2.3")}`]));
const f0 = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const f0m = (x) => f0(x).replace(/\u202f/g, "\\,");
const MIL = (x) => `${(x / 1e6).toFixed(1).replace(".", ",")} millions`;
const sc = (x) => { const e = Math.floor(Math.log10(x)), m = x / 10 ** e; return `${m.toFixed(1).replace(".", "{,}")} \\times 10^{${e}}`; };
const alea = (h, n) => Array.from({ length: n }, () => h.int(0, 1));

/* ---------- les phases dessinées ---------- */
const PH = {
  prophase1: { nom: "prophase I", desc: "des tétrades : les homologues sont accolés, quatre chromatides par paire", diploide: true },
  metaphase1: { nom: "métaphase I", desc: "des paires de chromosomes de part et d’autre de la plaque, à deux chromatides", diploide: true },
  anaphase1: { nom: "anaphase I", desc: "des chromosomes à deux chromatides qui partent vers les pôles : les homologues se séparent", diploide: true },
  telophase1: { nom: "fin de la division I", desc: "deux cellules, chacune avec un chromosome de chaque paire, encore à deux chromatides", diploide: false },
  metaphase2: { nom: "métaphase II", desc: "une cellule haploïde : des chromosomes à deux chromatides alignés sur la plaque, sans paire", diploide: false },
  anaphase2: { nom: "anaphase II", desc: "des chromosomes à une chromatide qui partent vers les pôles, dans une cellule haploïde", diploide: null },
  telophase2: { nom: "fin de la division II", desc: "quatre cellules haploïdes, à chromosomes à une chromatide", diploide: false },
  "mitose-meta": { nom: "métaphase de mitose", desc: "tous les chromosomes à deux chromatides, alignés un par un sur la plaque", diploide: true },
  "mitose-ana": { nom: "anaphase de mitose", desc: "2n chromosomes à une chromatide vers chaque pôle", diploide: true },
};
const MEIOSE = ["prophase1", "metaphase1", "anaphase1", "telophase1", "metaphase2", "anaphase2", "telophase2"];
const CONFUS = { metaphase1: "mitose-meta", anaphase1: "anaphase2", anaphase2: "anaphase1", metaphase2: "metaphase1", prophase1: "metaphase1", telophase1: "telophase2", telophase2: "telophase1" };
const erreurPhase = (juste, faux) => (faux.startsWith("mitose") ? "la méiose, c’est deux mitoses" : (juste === "anaphase1" && faux === "anaphase2") || (juste === "anaphase2" && faux === "anaphase1") ? "anaphase I et II confondues" : ["metaphase2", "anaphase2", "telophase1", "telophase2"].includes(juste) && ["metaphase1", "anaphase1", "prophase1"].includes(faux) ? "haploïde lu comme diploïde" : "phases confondues");

/* ---------- la courbe de la quantité d'ADN (en q), en SVG ---------- */
const COURBE = [[40, 2], [110, 2], [160, 4], [260, 4], [285, 2], [370, 2], [395, 1], [470, 1], [495, 2], [560, 2]];
const SEG = { S: [[110, 2], [160, 4]], div1: [[260, 4], [285, 2]], div2: [[370, 2], [395, 1]], fec: [[470, 1], [495, 2]] };
function figureCourbe({ fec, hl }) {
  const Y = (v) => 250 - 50 * v, pts = COURBE.slice(0, fec ? 10 : 8);
  let g = "";
  [1, 2, 4].forEach((v) => { g += `<line x1="40" x2="580" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--color-border-soft)" stroke-width="1" stroke-dasharray="3 5"/><text x="30" y="${Y(v) + 5}" text-anchor="end" font-size="15" fill="var(--color-text-primary)">${v === 1 ? "q" : v + "q"}</text>`; });
  g += `<line x1="40" x2="40" y1="30" y2="250" stroke="var(--color-text-primary)" stroke-width="1.5"/><line x1="40" x2="580" y1="250" y2="250" stroke="var(--color-text-primary)" stroke-width="1.5"/>`;
  g += `<path d="${pts.map(([x, v], i) => `${i ? "L" : "M"}${x} ${Y(v)}`).join("")}" fill="none" stroke="var(--color-text-primary)" stroke-width="3" stroke-linejoin="round"/>`;
  if (hl) { const [[x1, v1], [x2, v2]] = SEG[hl]; g += `<line x1="${x1}" y1="${Y(v1)}" x2="${x2}" y2="${Y(v2)}" stroke="var(--color-signal)" stroke-width="7" stroke-linecap="round"/>`; }
  g += `<text x="580" y="274" text-anchor="end" font-size="15" fill="var(--color-text-primary)">temps</text><text x="48" y="24" font-size="15" fill="var(--color-text-primary)">ADN par cellule</text>`;
  return g;
}

export const EXERCICES = [
  /* 1 — la phase d'une cellule dessinée */
  {
    id: "meiose-phase",
    titre: "Reconnaître la phase d’une cellule",
    niveau: 1,
    capacites: CAP("3.1.1"),
    erreurs: ["la méiose, c’est deux mitoses", "anaphase I et II confondues", "haploïde lu comme diploïde"],
    gen(h) {
      const n2 = h.pick([4, 6, 8]), n = n2 / 2, ph = h.pick(MEIOSE), o = alea(h, n);
      const d = dessinCellule(ph, n, { W: 300, H: 220, o });
      const conf = CONFUS[ph], autres = h.melange(Object.keys(PH).filter((k) => k !== ph && k !== conf)).slice(0, 2);
      const opts = h.melange([{ t: PH[ph].nom, ok: true }, ...[conf, ...autres].map((k) => ({
        t: PH[k].nom,
        fb: `Tu as lu « ${PH[k].nom} ». Cette phase montre ${PH[k].desc}. Ici : ${PH[ph].desc}.`,
        erreur: erreurPhase(ph, k),
      }))]);
      const questions = [{ type: "qcm", q: "Quelle phase ce schéma représente-t-il ?", options: opts }];
      if (PH[ph].diploide !== null && ph !== "anaphase1") {
        const dip = PH[ph].diploide;
        questions.push({ type: "qcm", q: "Cette cellule est-elle haploïde ou diploïde ?", options: h.melange([
          { t: "haploïde : un chromosome de chaque paire", ...(dip ? { fb: "Tu as vu des paires : les chromosomes homologues sont ensemble, la cellule a 2n chromosomes. Elle est diploïde.", erreur: "haploïde lu comme diploïde" } : { ok: true }) },
          { t: "diploïde : les chromosomes vont par paires", ...(dip ? { ok: true } : { fb: "Tu as compté les chromatides comme des chromosomes. Ici, aucune paire : un chromosome de chaque paire, la cellule est haploïde.", erreur: "haploïde lu comme diploïde" }) },
        ]) });
      }
      return {
        enonce: `<p>Le schéma représente une cellule d’un animal à $2n = ${n2}$ chromosomes en cours de division (le chromosome d’origine paternelle est en rouge).</p>`,
        figure: svgCellule(d, { aria: `Cellule d’un animal à 2n = ${n2} : ${PH[ph].nom}` }),
        questions,
        correction: [
          { t: "Pour nommer la phase, trois observations : le nombre de chromosomes, les paires, les chromatides." },
          { t: `Ici : ${PH[ph].desc}.`, r: `C’est la ${PH[ph].nom}.` },
        ],
      };
    },
  },

  /* 2 — les comptes à chaque phase */
  {
    id: "meiose-comptes",
    titre: "Chromosomes, chromatides, quantité d’ADN à chaque phase",
    niveau: 2,
    capacites: CAP("3.1.1"),
    erreurs: ["haploïde = une chromatide", "la quantité d’ADN suit le nombre de chromosomes", "tétrades comptées comme chromosomes"],
    gen(h) {
      const n2 = h.pick([4, 6, 8, 46]), n = n2 / 2;
      const P = [[2, "la prophase I"], [3, "la métaphase I"], [4, "l’anaphase I"], [6, "la métaphase II"], [7, "l’anaphase II"], [8, "la fin de la division II (une des quatre cellules)"]];
      const [k, nom] = h.pick(P), e = etat(k, n);
      const piege = (v, rep, fb, erreur) => (v !== rep ? [{ v, fb, erreur }] : []);
      const questions = [];
      if (k === 2) questions.push({ type: "nombre", q: "Combien de tétrades contient la cellule ?", reponse: n, tol: { abs: 0.01 }, indice: "Une tétrade est une paire de chromosomes homologues accolés.",
        pieges: [{ v: n2, fb: "Tu as compté des chromosomes. Une tétrade, c’est une paire : 2 chromosomes homologues, 4 chromatides.", erreur: "tétrades comptées comme chromosomes" }, { v: 2 * n2, fb: "Tu as compté des chromatides. Une tétrade en compte 4 : le nombre de tétrades est celui des paires.", erreur: "tétrades comptées comme chromosomes" }] });
      questions.push(
        { type: "nombre", q: "Combien de chromosomes contient la cellule ?", reponse: e.chrom, tol: { abs: 0.01 }, indice: "On compte les chromosomes, pas les chromatides : un chromosome à deux chromatides compte pour un.",
          pieges: [...piege(e.chromatides, e.chrom, "Tu as compté les chromatides comme des chromosomes. Un chromosome à deux chromatides compte pour un.", "haploïde = une chromatide"), ...piege(n, e.chrom, "Tu as pris n, le nombre de paires. Dans cette phase, la cellule a " + e.chrom + " chromosomes.", "tétrades comptées comme chromosomes")] },
        { type: "nombre", q: "Combien de chromatides contient la cellule ?", reponse: e.chromatides, tol: { abs: 0.01 }, indice: "Chromosomes × chromatides par chromosome.",
          pieges: [...piege(e.chrom, e.chromatides, "Tu as donné le nombre de chromosomes. Chaque chromosome à deux chromatides en compte deux.", "haploïde = une chromatide")] },
        { type: "nombre", q: "Quelle est la quantité d’ADN de la cellule, en $q$ ($q$ : la quantité d’ADN d’un gamète) ?", reponse: e.adn, tol: { abs: 0.01 }, unite: "q", indice: "Un gamète (n chromosomes à une chromatide) vaut q : compte les chromatides et divise par n.",
          pieges: [...piege(e.chrom, e.adn, "Tu as pris le nombre de chromosomes. La quantité d’ADN suit le nombre de chromatides, pas de chromosomes.", "la quantité d’ADN suit le nombre de chromosomes"), ...piege(e.chromatides, e.adn, "Tu as donné le nombre de chromatides. L’unité est q : un gamète, n chromatides, vaut q.", "la quantité d’ADN suit le nombre de chromosomes")] });
      return {
        enonce: `<p>Une cellule d’une espèce à $2n = ${n2}$ chromosomes est en ${nom}. On note $q$ la quantité d’ADN d’un gamète : une cellule en G1 vaut $2q$.</p>`,
        questions,
        correction: [
          { t: `En ${nom} : ${e.chrom} chromosomes, ${e.chromatides_par === 2 ? "chacun à deux chromatides" : "chacun à une chromatide"}.` },
          { t: `${e.chromatides} chromatides : l’ADN vaut ${e.chromatides} ÷ ${n} = ${e.adn}$q$.`, r: "Un gamète a n chromatides, soit q." },
        ],
      };
    },
  },

  /* 3 — la courbe de la quantité d'ADN */
  {
    id: "meiose-courbe",
    titre: "Lire la courbe de la quantité d’ADN",
    niveau: 2,
    capacites: CAP("3.1.1", "3.1.3"),
    erreurs: ["la réduction placée à la division II", "la phase S confondue avec une chute", "la fécondation oubliée"],
    gen(h) {
      const fec = h.pick([true, false]), hl = h.pick(fec ? ["S", "div1", "div2", "fec"] : ["S", "div1", "div2"]);
      const NOM = { S: "la phase S", div1: "la division I", div2: "la division II", fec: "la fécondation" };
      const EXP = { S: "la phase S fait monter la courbe : la cellule copie son ADN, de 2q à 4q", div1: "la division I partage l’ADN entre deux cellules : de 4q à 2q, et les homologues se séparent", div2: "la division II sépare les chromatides sœurs : de 2q à q", fec: "la fécondation réunit deux gamètes : de q à 2q" };
      const ERR = { S: "la phase S confondue avec une chute", div1: "la réduction placée à la division II", div2: "la réduction placée à la division II", fec: "la fécondation oubliée" };
      const opts = h.melange(Object.keys(fec ? NOM : { S: 1, div1: 1, div2: 1 }).map((k) => (k === hl ? { t: NOM[k], ok: true } : {
        t: NOM[k], fb: `Tu as choisi ${NOM[k]} : ${EXP[k]}. Le segment surligné est autre chose : ${EXP[hl]}.`, erreur: k === "div2" && hl === "div1" ? "la réduction placée à la division II" : ERR[k] })));
      const C = h.pick([["une cellule en métaphase I", 4, "la métaphase I : les paires sont encore là, 4q"], ["une cellule en métaphase II", 2, "la métaphase II : la division I est faite, la II pas encore, 2q"], ["un gamète", 1, "un gamète vaut q"]]);
      const pal = [1, 2, 4];
      const q2 = h.melange(pal.map((v) => (v === C[1] ? { t: `le palier à ${v === 1 ? "" : v}$q$`, ok: true } : { t: `le palier à ${v === 1 ? "" : v}$q$`, fb: `Tu as placé ${C[0]} au palier ${v === 1 ? "q" : v + "q"}. C’est ${C[2]}.`, erreur: v === 1 ? "la phase S confondue avec une chute" : "la réduction placée à la division II" })));
      return {
        enonce: `<p>La courbe donne la quantité d’ADN d’une cellule au cours de la formation des gamètes${fec ? " puis de la fécondation" : ""}, en $q$ (la quantité d’ADN d’un gamète).</p>`,
        figure: `<svg viewBox="0 0 600 290" role="img" aria-label="Courbe de la quantité d’ADN par cellule, de 2q à 4q, puis 2q, puis q${fec ? ", puis 2q" : ""}">${figureCourbe({ fec, hl })}</svg>`,
        questions: [
          { type: "qcm", q: "À quoi correspond le segment surligné en rouge ?", options: opts },
          { type: "qcm", q: `Où placer ${C[0]} ?`, options: q2 },
        ],
        correction: [{ t: `Le segment surligné : ${EXP[hl]}.` }, { t: `${C[0][0].toUpperCase()}${C[0].slice(1)} : ${C[2]}.` }],
      };
    },
  },

  /* 4 — le caryotype et sa formule */
  {
    id: "caryotype-formule",
    titre: "Un caryotype : 2n, n et la formule",
    niveau: 1,
    capacites: CAP("3.1.2"),
    erreurs: ["2n pris pour le nombre de paires", "XY gardés ensemble dans le gamète", "2n/2 calculé sur le total au lieu des autosomes"],
    gen(h) {
      const esp = h.pick(["droso8", "homme46"]), e = ESPECES[esp], sexe = h.pick(["XX", "XY"]), nom = esp === "homme46" ? "l’Homme" : "la drosophile";
      const A = e.n2 - 2, a = A / 2, gam = h.pick(["X", sexe === "XY" ? "Y" : "X"]);
      return {
        enonce: `<p>Chez ${nom}, le caryotype d’une cellule ${esp === "homme46" ? (sexe === "XY" ? "d’homme" : "de femme") : sexe === "XY" ? "de mâle" : "de femelle"} montre ${e.n} paires de chromosomes : ${e.auto} paires d’autosomes et une paire de gonosomes (${sexe}).</p>`,
        questions: [
          { type: "nombre", q: "Que vaut $2n$ ?", reponse: e.n2, tol: { abs: 0.01 }, indice: "2n est le nombre de chromosomes de la cellule : une paire en compte deux.",
            pieges: [{ v: e.n, fb: "Tu as pris le nombre de paires pour 2n. 2n compte les chromosomes : deux par paire.", erreur: "2n pris pour le nombre de paires" }] },
          { type: "nombre", q: "Que vaut $n$ ?", reponse: e.n, tol: { abs: 0.01 }, indice: "n est le nombre de chromosomes d’un gamète : un de chaque paire.",
            pieges: [{ v: e.n2, fb: "Tu as donné 2n. Un gamète n’a qu’un chromosome de chaque paire : n est la moitié de 2n.", erreur: "2n pris pour le nombre de paires" }] },
          { type: "texte", q: "Écris la formule chromosomique de la cellule.", reponse: `2n = ${A}A + ${sexe}`, variantes: [`${A}A + ${sexe}`], aide: `par exemple 2n = 10A + XX`, indice: "On compte les autosomes (A), puis on ajoute la paire de gonosomes.",
            pieges: [{ v: `2n = ${e.n2}A + ${sexe}`, fb: "Tu as compté tous les chromosomes comme autosomes. Les gonosomes se comptent à part : 2n − 2 autosomes.", erreur: "2n/2 calculé sur le total au lieu des autosomes" }] },
          { type: "texte", q: "Écris la formule d’un gamète de cette cellule (un type possible).", reponse: `n = ${a}A + ${gam}`, variantes: [`${a}A + ${gam}`], aide: "par exemple n = 5A + X", indice: "Un gamète a un chromosome de chaque paire : la moitié des autosomes, et un seul gonosome.",
            pieges: [{ v: `n = ${a}A + ${sexe === "XX" ? "XX" : "XY"}`, fb: "Tu as gardé la paire de gonosomes ensemble. Les deux gonosomes sont homologues : ils se séparent, un seul va dans le gamète.", erreur: "XY gardés ensemble dans le gamète" }, { v: `n = ${e.n}A + ${gam}`, fb: `Tu as divisé ${e.n2} au lieu de ${A}. Les ${A} autosomes donnent ${a} ; le gonosome se compte à part.`, erreur: "2n/2 calculé sur le total au lieu des autosomes" }] },
        ],
        correction: [
          { t: `${e.n} paires, donc $2n = ${e.n2}$ chromosomes et $n = ${e.n}$.` },
          { t: `Formule de la cellule : $2n = ${A}A + ${sexe}$.`, r: "Les gonosomes se comptent à part." },
          { t: `Formule d’un gamète : $n = ${a}A + ${gam}$.`, r: "Un chromosome de chaque paire : la moitié des autosomes et un seul gonosome." },
        ],
      };
    },
  },

  /* 5 — la loi 2^n */
  {
    id: "gametes-2n",
    titre: "Le nombre de types de gamètes : 2ⁿ",
    niveau: 2,
    capacites: CAP("3.1.3"),
    erreurs: ["le nombre de types s’additionne (2 × n)", "n² au lieu de 2ⁿ", "une cellule donne tous les types"],
    gen(h) {
      const n = h.pick([3, 5, 6, 7, 8, 23]), v = types(n);
      const piege = (x, fb, erreur) => (x !== v ? [{ v: x, fb, erreur }] : []);
      return {
        enonce: `<p>Une espèce a $2n = ${2 * n}$ chromosomes. On ne tient pas compte du crossing-over.</p>`,
        questions: [
          { type: "nombre", q: "Combien de types de gamètes un individu peut-il produire ?", reponse: v, tol: { abs: 0.5 }, indice: "Chaque paire s’oriente au hasard, de 2 façons : combien de façons pour n paires ?",
            pieges: [...piege(2 * n, "Tu as additionné : 2 par paire. Chaque paire double le nombre de combinaisons, elle ne l’augmente pas de 2.", "le nombre de types s’additionne (2 × n)"), ...piege(n * n, `Tu as calculé ${n}². C’est 2 choix par paire, ${n} fois : $2^{${n}}$.`, "n² au lieu de 2ⁿ")] },
          { type: "qcm", q: "Une seule cellule de cet individu fait sa méiose. Combien de types de gamètes produit-elle ?", options: h.melange([
            { t: "2", ok: true },
            { t: `${f0(v)}`, fb: "Tu as confondu une cellule et l’ensemble des cellules. Une cellule n’a qu’une orientation à la métaphase I : 2 types.", erreur: "une cellule donne tous les types" },
            { t: "1", fb: "Les deux homologues d’une paire partent dans des cellules différentes : une cellule donne 2 types.", erreur: "une cellule donne tous les types" }]) },
        ],
        correction: [
          { t: `$n = ${n}$ paires, 2 orientations possibles par paire.` },
          { tex: `2^{${n}} = ${f0m(v)}`, r: "Chaque paire double le nombre de types." },
        ],
      };
    },
  },

  /* 6 — les gamètes d'un individu à plusieurs gènes */
  {
    id: "gametes-genotype",
    titre: "Les gamètes d’un individu à plusieurs gènes",
    niveau: 2,
    capacites: CAP("3.1.3", "3.2.3"),
    erreurs: ["les homozygotes comptés comme des choix", "un gamète à deux allèles d’un même gène", "une cellule donne tous les types"],
    gen(h) {
      const k = h.pick([2, 3, 4]), hh = k === 2 ? h.int(1, 2) : h.int(1, k - 1), L = "ABCD".slice(0, k).split("");
      const hetero = h.melange(L.map((_, i) => i)).slice(0, hh), het = new Set(hetero);
      const gen = L.map((g, i) => (het.has(i) ? `${g}//${g.toLowerCase()}` : `${g}//${g}`));
      const v = types(hh);
      const nul = L.find((g, i) => het.has(i));
      const impossible = L.map((g, i) => (i === L.indexOf(nul) ? `${g} ${g.toLowerCase()}` : g)).join(" ");
      const possible1 = L.join(" "), possible2 = L.map((g, i) => (het.has(i) ? g.toLowerCase() : g)).join(" ");
      return {
        enonce: `<p>Un individu a pour génotype ${gen.join(" ")}. Les ${k} gènes sont portés par ${k} paires de chromosomes différentes. On ne tient pas compte du crossing-over.</p>`,
        questions: [
          { type: "nombre", q: "Combien de types de gamètes produit-il ?", reponse: v, tol: { abs: 0.5 }, indice: "Seuls les gènes hétérozygotes donnent un choix : un gène homozygote ne donne qu’un allèle.",
            pieges: [...(k !== hh ? [{ v: types(k), fb: `Tu as compté les ${k} gènes. Un gène homozygote ne donne qu’un allèle : seuls les ${hh} gènes hétérozygotes comptent, $2^{${hh}}$.`, erreur: "les homozygotes comptés comme des choix" }] : [])] },
          { type: "qcm", q: "Lequel de ces gamètes est impossible ?", options: h.melange([
            { t: impossible, ok: true },
            { t: possible1, fb: "Ce gamète porte un allèle de chaque gène : il est possible. Un gamète ne peut pas porter les deux allèles d’un même gène.", erreur: "un gamète à deux allèles d’un même gène" },
            { t: possible2, fb: "Ce gamète porte un allèle de chaque gène : il est possible. Un gamète ne peut pas porter les deux allèles d’un même gène.", erreur: "un gamète à deux allèles d’un même gène" }].filter((o, i, a) => a.findIndex((x) => x.t === o.t) === i)) },
        ],
        correction: [
          { t: `${hh} gène${hh > 1 ? "s" : ""} hétérozygote${hh > 1 ? "s" : ""} : ${hh > 1 ? "chacun" : "il"} donne 2 allèles possibles, les homozygotes un seul.` },
          { tex: `2^{${hh}} = ${v}`, r: "Chaque gène hétérozygote double le nombre de types." },
          { t: `Un gamète porte un seul allèle de chaque gène : « ${impossible} » est impossible.` },
        ],
      };
    },
  },

  /* 7 — les génotypes des cellules filles */
  {
    id: "anaphase-alleles",
    titre: "Les allèles dans les cellules filles",
    niveau: 2,
    capacites: CAP("3.1.4", "3.2.3"),
    erreurs: ["chromatides séparées en anaphase I", "homologues séparés en anaphase II", "les deux chromosomes paternels toujours ensemble"],
    gen(h) {
      const meme = h.pick([true, false]);
      const g1 = meme ? ["A B", "a b"] : ["A b", "a B"], pasCe = meme ? ["A b", "a B"] : ["A B", "a b"];
      const phase = h.pick([1, 2]);
      if (phase === 1) {
        const bon = `${g1[0]} et ${g1[1]}`;
        return {
          enonce: `<p>Une cellule à $2n = 4$ chromosomes porte, sur la première paire, les allèles $A$ et $a$, et sur la seconde, $B$ et $b$. En anaphase I, les chromosomes portant ${meme ? "A et B" : "A et b"} sont tirés vers le même pôle. On ne tient pas compte du crossing-over.</p>`,
          questions: [{ type: "qcm", q: "Quels sont les génotypes des deux cellules obtenues à la fin de la division I ?", options: h.melange([
            { t: bon, ok: true },
            { t: "A a B b et A a B b", fb: "Tu as séparé des chromatides à l’anaphase I. Ce sont les homologues qui se séparent : chaque cellule fille est haploïde.", erreur: "chromatides séparées en anaphase I" },
            { t: `${pasCe[0]} et ${pasCe[1]}`, fb: `Tu as supposé que les chromosomes d’un même parent partent toujours ensemble. Ici, l’énoncé donne l’orientation : ${meme ? "A avec B" : "A avec b"}.`, erreur: "les deux chromosomes paternels toujours ensemble" }]) }],
          correction: [{ t: "En anaphase I, ce sont les homologues de chaque paire qui se séparent, chacun avec ses deux chromatides." }, { t: `Les chromosomes portant ${meme ? "A et B" : "A et b"} vont ensemble : ${bon}.` }],
        };
      }
      return {
        enonce: `<p>À la fin de la division I, une cellule contient les chromosomes portant $A$ et $${meme ? "B" : "b"}$, chacun à deux chromatides. Elle entre en division II.</p>`,
        questions: [{ type: "qcm", q: "Quels sont les génotypes des deux cellules obtenues à la fin de la division II ?", options: h.melange([
          { t: `${g1[0]} et ${g1[0]}`, ok: true },
          { t: `${g1[0]} et ${g1[1]}`, fb: "Tu as séparé des homologues à l’anaphase II. Il n’y a plus d’homologues dans la cellule : ce sont les chromatides sœurs, identiques, qui se séparent.", erreur: "homologues séparés en anaphase II" },
          { t: `${g1[0].split(" ")[0]} ${g1[0].split(" ")[0]} et ${g1[0].split(" ")[1]} ${g1[0].split(" ")[1]}`, fb: "Les chromosomes ne se répartissent pas par gène : à l’anaphase II, ce sont les chromatides sœurs qui se séparent, et chaque cellule fille reçoit les deux.", erreur: "homologues séparés en anaphase II" }].filter((o, i, a) => a.findIndex((x) => x.t === o.t) === i)) }],
        correction: [{ t: "En anaphase II, les chromatides sœurs se séparent : elles portent les mêmes allèles." }, { t: `Les deux cellules filles ont le même génotype : ${g1[0]}.` }],
      };
    },
  },

  /* 8 — le crossing-over : quels gamètes sont recombinés */
  {
    id: "crossing-over",
    titre: "Le crossing-over : les gamètes recombinés",
    niveau: 2,
    capacites: CAP("3.1.3", "3.2.3"),
    erreurs: ["échange entre chromatides sœurs", "4 recombinés sur 4", "crossing-over hors intervalle compté", "confondre parental et recombiné"],
    gen(h) {
      const phase = h.pick(["AD//ad", "Ad//aD"]), [p1, p2] = phase.split("//"), entre = h.pick([true, false]);
      const rec = phase === "AD//ad" ? ["A d", "a D"] : ["A D", "a d"], par = [p1.split("").join(" "), p2.split("").join(" ")];
      const nb = entre ? 2 : 0;
      const piege = (v, fb, erreur) => (v !== nb ? [{ v, fb, erreur }] : []);
      return {
        enonce: `<p>Un individu a ses deux gènes $A/a$ et $D/d$ sur la même paire de chromosomes, dans la disposition ${phase.replace("//", " // ")}. Un crossing-over a lieu en prophase I ${entre ? "entre ces deux gènes" : "en dehors de la région comprise entre ces deux gènes"} sur la tétrade.</p>`,
        questions: [
          { type: "qcm", q: "Entre quelles chromatides l’échange de segments a-t-il lieu ?", options: h.melange([
            { t: "deux chromatides non sœurs, une de chaque homologue", ok: true },
            { t: "deux chromatides sœurs du même chromosome", fb: "Tu as confondu homologues et chromatides sœurs. Échanger deux copies identiques ne changerait rien.", erreur: "échange entre chromatides sœurs" },
            { t: "deux chromosomes de paires différentes", fb: "Seuls les homologues sont accolés en prophase I : on n’échange pas entre paires différentes.", erreur: "échange entre chromatides sœurs" }]) },
          { type: "nombre", q: "Parmi les 4 gamètes issus de cette cellule, combien sont recombinés (une combinaison d’allèles absente de la cellule de départ) ?", reponse: nb, tol: { abs: 0.01 }, indice: entre ? "Seules les deux chromatides du croisement changent de combinaison." : "Un échange hors de la région entre A et D ne sépare pas A de D.",
            pieges: [...piege(4, "Tu as cru que toute la tétrade est échangée. Seules les deux chromatides du croisement changent.", "4 recombinés sur 4"), ...piege(2, "Tu as compté un crossing-over qui n’est pas entre A et D. Un échange en dehors de cette région ne change pas la combinaison de A et D.", "crossing-over hors intervalle compté"), ...piege(1, "Un échange se fait à deux : chaque chromatide reçoit le segment de l’autre.", "4 recombinés sur 4")] },
          ...(!entre ? [] : [{ type: "qcm", q: "Quels sont les gamètes de combinaison nouvelle ?", options: h.melange([
            { t: `${rec[0]} et ${rec[1]}`, ok: true },
            { t: `${par[0]} et ${par[1]}`, fb: "Ce sont les combinaisons des chromosomes parentaux, celles de la cellule de départ. Les recombinés sont les autres.", erreur: "confondre parental et recombiné" },
            { t: "les quatre", fb: "Deux des quatre gamètes gardent la combinaison parentale : seules les chromatides du croisement sont recombinées.", erreur: "4 recombinés sur 4" }]) }]),
        ],
        correction: [
          { t: "Le crossing-over échange des segments entre deux chromatides non sœurs d’homologues, en prophase I." },
          { t: entre ? `Entre A et D : deux gamètes parentaux (${par.join(", ")}) et deux recombinés (${rec.join(", ")}).` : "En dehors de la région entre A et D, la combinaison de A et D ne change pas : aucun gamète recombiné." },
        ],
      };
    },
  },

  /* 9 — la fécondation : les combinaisons d'un couple */
  {
    id: "fecondation-combinaisons",
    titre: "La fécondation : les combinaisons d’un couple",
    niveau: 2,
    capacites: CAP("3.1.3"),
    erreurs: ["le nombre de combinaisons s’additionne (2 × 2ⁿ)", "la fécondation n’ajoute rien (2ⁿ)", "une probabilité de 1/2 ou 1/n"],
    gen(h) {
      const n = h.pick([3, 5, 6, 23]), t = types(n), c = couple(n);
      const q1 = n === 23
        ? { type: "qcm", q: "Combien de combinaisons de chromosomes un couple peut-il donner à un enfant, sans crossing-over ?", options: h.melange([
          { t: `$2^{23} \\times 2^{23} \\approx ${sc(c)}$`, ok: true },
          { t: `$2 \\times 2^{23} \\approx ${sc(2 * t)}$`, fb: "Tu as additionné les gamètes des deux parents. Chaque spermatozoïde se combine avec chaque ovule : on multiplie.", erreur: "le nombre de combinaisons s’additionne (2 × 2ⁿ)" },
          { t: `$2^{23}$ ≈ ${MIL(t)}`, fb: "Tu as oublié la mère : elle brasse aussi, avec autant de types d’ovules.", erreur: "la fécondation n’ajoute rien (2ⁿ)" }]) }
        : { type: "nombre", q: "Combien de combinaisons de chromosomes un couple peut-il donner à un enfant, sans crossing-over ?", reponse: c, tol: { abs: 0.5 }, indice: "Chaque type de spermatozoïde peut rencontrer chaque type d’ovule : on multiplie.",
          pieges: [{ v: 2 * t, fb: "Tu as additionné les gamètes des deux parents. Chaque spermatozoïde se combine avec chaque ovule : on multiplie.", erreur: "le nombre de combinaisons s’additionne (2 × 2ⁿ)" }, { v: t, fb: "Tu as oublié la mère : elle brasse aussi, avec autant de types d’ovules.", erreur: "la fécondation n’ajoute rien (2ⁿ)" }] };
      return {
        enonce: `<p>Chez une espèce à $n = ${n}$ paires de chromosomes, le père et la mère produisent chacun ${f0(t)} types de gamètes (sans crossing-over).</p>`,
        questions: [q1,
          { type: "qcm", q: "Un père a déjà eu un enfant. Quelle est la probabilité qu’un second enfant reçoive de lui exactement les mêmes chromosomes (sans crossing-over) ?", options: h.melange([
            { t: `$\\dfrac{1}{2^{${n}}}$`, ok: true },
            { t: "$\\dfrac{1}{2}$", fb: "Tu as raisonné sur une seule paire. Chaque paire donne 1/2, et les n paires se multiplient.", erreur: "une probabilité de 1/2 ou 1/n" },
            { t: `$\\dfrac{1}{${n}}$`, fb: "Tu as pris une chance par paire. Chaque paire donne 1/2 ; pour n paires, on multiplie.", erreur: "une probabilité de 1/2 ou 1/n" }]) }],
        correction: [
          { t: `Chaque type de spermatozoïde peut rencontrer chaque type d’ovule : ${f0(t)} × ${f0(t)} combinaisons.`, r: n === 23 ? `Soit environ $${sc(c)}$.` : `${f0(c)} combinaisons.` },
          { t: `Un père transmet deux fois la même combinaison avec la probabilité $\\dfrac{1}{2^{${n}}}$.`, r: "Chaque paire s’oriente au hasard : 1/2 par paire." },
        ],
      };
    },
  },

  /* 10 — le cycle : n + n = 2n */
  {
    id: "cycle-caryotype",
    titre: "Méiose et fécondation : le nombre de chromosomes se maintient",
    niveau: 1,
    capacites: CAP("3.1.3"),
    erreurs: ["n + n = n", "23 paires dans le gamète", "la fécondation partage"],
    gen(h) {
      const esp = h.pick(["droso8", "homme46"]), e = ESPECES[esp], nom = esp === "homme46" ? "l’Homme" : "la drosophile";
      return {
        enonce: `<p>Chez ${nom}, une cellule du corps a $2n = ${e.n2}$ chromosomes.</p>`,
        questions: [
          { type: "nombre", q: "Combien de chromosomes contient un gamète ?", reponse: e.n, tol: { abs: 0.01 }, indice: "Un gamète a un chromosome de chaque paire.",
            pieges: [{ v: e.n2, fb: "Tu as gardé le nombre des autres cellules. Le gamète a la moitié des chromosomes : un de chaque paire.", erreur: "n + n = n" }] },
          { type: "nombre", q: "Combien de chromosomes contient la cellule-œuf ?", reponse: e.n2, tol: { abs: 0.01 }, indice: "Les deux lots de chromosomes des gamètes se retrouvent dans l’œuf.",
            pieges: [{ v: e.n, fb: "Tu as cru que la fécondation garde le nombre du gamète. Deux lots de n chromosomes s’ajoutent.", erreur: "n + n = n" }, { v: e.n2 * 2, fb: "Tu as compté 2n par gamète. Chaque gamète apporte n chromosomes : n + n = 2n.", erreur: "la fécondation partage" }] },
          { type: "nombre", q: "Sans méiose (des gamètes à 2n chromosomes), combien de chromosomes contiendrait la cellule-œuf ?", reponse: 2 * e.n2, tol: { abs: 0.01 }, indice: "Deux lots de 2n chromosomes se réunissent : le nombre double à chaque génération.",
            pieges: [{ v: e.n2, fb: "Tu as oublié que deux lots de 2n se réunissent : 4n. Sans méiose, le nombre doublerait à chaque génération.", erreur: "n + n = n" }, { v: e.n, fb: "La fécondation réunit, elle ne partage pas : elle ne divise pas le nombre par deux.", erreur: "la fécondation partage" }] },
          { type: "qcm", q: `Un gamète ${esp === "homme46" ? "humain" : "de drosophile"} contient…`, options: h.melange([
            { t: `${e.n} chromosomes`, ok: true },
            { t: `${e.n} paires de chromosomes`, fb: `${e.n} paires, c’est ${e.n2} chromosomes. Le gamète a un chromosome de chaque paire, aucune paire.`, erreur: "23 paires dans le gamète" },
            { t: `${e.n2} chromosomes`, fb: `Tu as gardé le nombre des cellules du corps. Le gamète en a la moitié : ${e.n}.`, erreur: "n + n = n" }]) },
        ],
        correction: [
          { t: `Le gamète est haploïde : $n = ${e.n}$ chromosomes.` },
          { t: `À la fécondation, les deux lots s’ajoutent : $${e.n} + ${e.n} = ${e.n2}$ chromosomes.`, r: "Le caryotype de l’espèce se maintient." },
          { t: `Sans méiose, $${e.n2} + ${e.n2} = ${2 * e.n2}$ : le nombre doublerait à chaque génération.` },
        ],
      };
    },
  },

  /* 11 — quel brassage explique quel type de gamète */
  {
    id: "brassage-identifier",
    titre: "Quel brassage explique ce gamète ?",
    niveau: 3,
    capacites: CAP("3.1.3", "3.2.3"),
    erreurs: ["brassages inter et intra confondus", "« mutation » pour une combinaison nouvelle", "tout type nouveau attribué au crossing-over"],
    gen(h) {
      const deux = h.pick([true, false]), nouv = h.pick(["Ab", "aB"]);
      const bon = deux ? "le brassage interchromosomique" : "le brassage intrachromosomique (crossing-over)";
      const nonBon = deux ? "le brassage intrachromosomique (crossing-over)" : "le brassage interchromosomique";
      return {
        enonce: `<p>Un individu hétérozygote pour deux gènes, $A/a$ et $B/b$, a reçu de ses parents les chromosomes $AB$ et $ab$. Il produit des gamètes $AB$, $ab$, $Ab$ et $aB$. Les deux gènes sont portés par ${deux ? "deux paires de chromosomes différentes" : "la même paire de chromosomes"}.</p>`,
        questions: [{ type: "qcm", q: `Quel brassage explique la présence du gamète ${nouv}, absent des chromosomes reçus des parents ?`, options: h.melange([
          { t: bon, ok: true },
          { t: nonBon, fb: deux ? "Tu as attribué le type nouveau au crossing-over. Ici, les gènes sont sur deux paires : c’est le hasard de l’orientation des paires qui les recombine." : "Tu as attribué le type nouveau au hasard des paires. Ici, les deux gènes sont sur le même chromosome : seul un crossing-over peut séparer A de B.", erreur: deux ? "tout type nouveau attribué au crossing-over" : "brassages inter et intra confondus" },
          { t: "une mutation", fb: "Une mutation crée un allèle nouveau. Ici, A, a, B et b existaient déjà : seule leur combinaison est nouvelle.", erreur: "« mutation » pour une combinaison nouvelle" }]) }],
        correction: [{ t: deux ? "Les gènes sont sur deux paires : chaque paire s’oriente au hasard en métaphase I (brassage interchromosomique)." : "Les gènes sont sur la même paire : seul un crossing-over entre eux peut former une combinaison nouvelle (brassage intrachromosomique)." }, { t: `Le gamète ${nouv} associe des allèles qui existaient déjà, dans une combinaison nouvelle : ce n’est pas une mutation.` }],
      };
    },
  },

  /* 12 — l'exercice type du bac (document : courbe + trois cellules) */
  {
    id: "meiose-document",
    titre: "Exercice type : un document, trois cellules",
    niveau: 3,
    capacites: CAP("3.1.1", "3.1.3"),
    erreurs: ["réciter au lieu d’exploiter", "haploïde = q", "une phase sans justification"],
    gen(h) {
      const n2 = h.pick([4, 6]), n = n2 / 2, fec = h.pick([true, false]);
      const cands = ["metaphase1", "anaphase1", "metaphase2", "anaphase2"], trois = h.melange(cands).slice(0, 3);
      const pal = { metaphase1: 4, anaphase1: 4, metaphase2: 2, anaphase2: 2 };
      const o = alea(h, n);
      const L = ["a", "b", "c"];
      let svg = `<g transform="translate(0 0)">${figureCourbe({ fec, hl: null })}</g>`;
      trois.forEach((ph, i) => { svg += svgGroupe(dessinCellule(ph, n, { W: 190, H: 130, o }), 12 + i * 205, 320, 1) + `<text x="${24 + i * 205}" y="344" font-size="20" font-weight="700" fill="var(--color-signal)">${L[i]}</text>`; });
      const figure = `<svg viewBox="0 0 640 470" role="img" aria-label="Document 1 : la quantité d’ADN par cellule. Document 2 : trois cellules, a, b et c, d’un animal à 2n = ${n2}">${svg}</svg>`;
      const [a, b, c] = trois;
      const quest = (cell, ph) => {
        const conf = CONFUS[ph], autres = h.melange(MEIOSE.concat(["mitose-meta"]).filter((k) => k !== ph && k !== conf)).slice(0, 2);
        return { type: "qcm", q: `Quelle est la phase de la cellule ${cell} ?`, options: h.melange([{ t: PH[ph].nom, ok: true }, ...[conf, ...autres].map((k) => ({ t: PH[k].nom, fb: `Tu as lu « ${PH[k].nom} ». Cette phase montre ${PH[k].desc}. Ici : ${PH[ph].desc}.`, erreur: erreurPhase(ph, k) }))]) };
      };
      const placer = { type: "qcm", q: "Sur la courbe, où placer la cellule c ?", options: h.melange([1, 2, 4].map((v) => (v === pal[c] ? { t: `le palier à ${v === 1 ? "" : v}$q$`, ok: true } : { t: `le palier à ${v === 1 ? "" : v}$q$`, fb: v === 1 ? "Tu as cru que haploïde vaut q. Les chromatides ne sont pas toutes séparées : compte-les." : "Compte les chromosomes et leurs chromatides de c : la quantité d’ADN suit les chromatides.", erreur: v === 1 ? "haploïde = q" : "une phase sans justification" }))) };
      const questions = [quest("a", a), quest("b", b), placer];
      if (n2 === 6) questions.push({ type: "nombre", q: "Combien de types de gamètes cet animal produit-il, sans crossing-over ?", reponse: types(n), tol: { abs: 0.5 }, indice: "Chaque paire s’oriente au hasard, de 2 façons.", pieges: [{ v: 2 * n, fb: "Tu as additionné : 2 par paire. Chaque paire double le nombre.", erreur: "le nombre de types s’additionne" }, { v: n * n, fb: `Tu as calculé ${n}². C’est 2 choix par paire, ${n} fois.`, erreur: "n² au lieu de 2ⁿ" }] });
      else questions.push({ type: "nombre", q: "Combien de chromosomes contient un gamète de cet animal ?", reponse: n, tol: { abs: 0.01 }, indice: "Un gamète a un chromosome de chaque paire.", pieges: [{ v: n2, fb: "Tu as gardé le nombre des autres cellules. Un gamète est haploïde : n chromosomes.", erreur: "haploïde = q" }] });
      questions.push({ type: "qcm", q: "Pour justifier la phase d’une cellule, que faut-il écrire ?", options: h.melange([
        { t: "ce qu’on observe : le nombre de chromosomes, les paires, les chromatides", ok: true },
        { t: "le cours : la liste des phases de la méiose", fb: "Réciter le cours ne justifie pas : il faut exploiter le document, cellule par cellule.", erreur: "réciter au lieu d’exploiter" },
        { t: "seulement le nom de la phase", fb: "Un nom sans justification perd le point : il faut dire ce qu’on observe sur la cellule.", erreur: "une phase sans justification" }]) });
      return {
        enonce: `<p><b>Exercice type</b> (ce n’est pas un sujet du bac ; barème indicatif : 0,5 par question). Un animal a $2n = ${n2}$ chromosomes. Le document 1 donne la quantité d’ADN par cellule pendant la formation des gamètes${fec ? " et la fécondation" : ""}, en $q$ (celle d’un gamète) ; le document 2 montre trois cellules a, b et c.</p>`,
        figure,
        questions,
        correction: [
          { t: `a : ${PH[a].desc} : ${PH[a].nom}.` }, { t: `b : ${PH[b].desc} : ${PH[b].nom}.` },
          { t: `c : ${PH[c].desc} : ${PH[c].nom}, au palier à ${pal[c]}$q$.`, r: "La quantité d’ADN suit le nombre de chromatides." },
        ],
      };
    },
  },
];
