// @ts-nocheck
/**
 * Les exercices de la leçon « Les lois statistiques de la transmission des caractères héréditaires » (V3).
 * Format : voir modele.js. Capacités : svt-svt 3.2.1 à 3.2.4, svt-pc 2.4.1 à 2.4.4 (docs/referentiel/).
 *
 * La réponse est CALCULÉE par transmission-outils.js (échiquier par produit des proportions des gamètes,
 * pourcentages de recombinés, distances en cM) ; chaque leurre est une erreur classique nommée, et tout
 * tirage où deux options ont la même valeur est écarté (B3). Les caractères et les symboles viennent d'une
 * liste fermée : celle des sujets transcrits (pois L/ℓ, J/j ; souris G/g, L/ℓ ; drosophile vg⁺/vg, b⁺/b ;
 * bovins D/d, R/r), avec leur NB à l'énoncé. Aucun gabarit ne porte sur un gène lié au sexe ni sur la
 * codominance : la leçon suivante. Les exercices « d'examen » sont des exercices types, dits tels, au
 * barème indicatif.
 */
import { echiquier, egaux, gametesLies, gametesAbsolus, fLab, texH, texAl, observe } from "../transmission-outils.js";

const CAP = (...ids) => ids.flatMap((id) => [`svt-svt 3.2.${id}`, `svt-pc 2.4.${id}`]);
const f0 = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
const f2 = (x, d = 2) => Number(x.toFixed(d)).toString().replace(".", ",");

/* ---------- les caractères des sujets : symboles, phénotypes, NB ---------- */
const SETS = [
  { esp: "pois", g1: { dom: "L", rec: "ℓ", d: "à graines lisses", r: "à graines ridées", nom: "la forme des graines" }, g2: { dom: "J", rec: "j", d: "à graines jaunes", r: "à graines vertes", nom: "la couleur des graines" } },
  { esp: "souris", g1: { dom: "G", rec: "g", d: "à pelage gris", r: "à pelage blanc", nom: "la couleur du pelage" }, g2: { dom: "L", rec: "ℓ", d: "à pelage lisse", r: "à pelage crépu", nom: "la forme du pelage" } },
  { esp: "drosophile", g1: { dom: "vg⁺", rec: "vg", d: "à ailes longues", r: "à ailes vestigiales", nom: "la forme des ailes" }, g2: { dom: "b⁺", rec: "b", d: "à corps clair", r: "à corps noir", nom: "la couleur du corps" } },
  { esp: "bovins", g1: { dom: "R", rec: "r", d: "sans cornes", r: "avec cornes", nom: "la présence des cornes" }, g2: { dom: "D", rec: "d", d: "à pattes courtes", r: "à pattes normales", nom: "la longueur des pattes" } },
];
// les sujets où l'allèle dominant est létal à l'état homozygote : la souris jaune (PC 2024 R) et le bovin Dexter (SVT 2024 N)
const LETAUX = [
  { esp: "souris", g: { dom: "G", rec: "g", d: "à corps jaune", r: "à corps gris", nom: "la couleur du corps" } },
  { esp: "bovins", g: { dom: "D", rec: "d", d: "à pattes courtes (race Dexter)", r: "à pattes normales (race Kerry)", nom: "la longueur des pattes" } },
];
const cn = (x) => x.replace(/^à /, "");                                  // le caractère : « ailes longues », « graines lisses »
const NB1 = (g) => `<i>NB : utilisez les symboles ${g.dom} et ${g.rec} pour les allèles du gène responsable de ${g.nom}.</i>`;
const NB2 = (a, b) => `<i>NB : utilisez les symboles ${a.dom} et ${a.rec} pour ${a.nom}, ${b.dom} et ${b.rec} pour ${b.nom}.</i>`;
const m = (a) => `$${texAl(a)}$`;                                   // un allèle en formule
const gx = (h1, h2) => `$\\dfrac{${texH(h1)}}{${texH(h2)}}$`;       // gènes liés : une fraction, comme les corrigés
const par = (g) => `${g.dom}//${g.rec}`;
const alea = (h, a, b) => h.int(a, b);
const sansDoublon = (liste, rep, tol = 0.011) => { const vus = [rep]; return liste.filter((p) => { if (vus.some((v) => Math.abs(v - p.v) <= tol)) return false; vus.push(p.v); return true; }); };
const opt = (t, ok, fb, erreur) => (ok ? { t, ok: true } : { t, fb, erreur });
const un = (g, ph) => (ph === "d" ? g.d : g.r);

/* ---------- les grandeurs d'un test-cross à deux gènes ---------- */
const clefs2 = (gs) => [[gs[0].dom, gs[1].dom], [gs[0].dom, gs[1].rec], [gs[0].rec, gs[1].dom], [gs[0].rec, gs[1].rec]];

export const EXERCICES = [
  /* 1 : F1, dominance, génotypes */
  {
    id: "f1-dominance",
    titre: "Dominance et génotype de F1",
    niveau: 1,
    capacites: CAP(1),
    erreurs: ["même phénotype, même génotype", "récessif pris pour dominant", "F1 hétérogène et lignées pures", "un seul allèle par individu", "un autosome pris pour un chromosome sexuel"],
    gen(h) {
      const S = h.pick(SETS), g = h.pick([S.g1, S.g2]), hetero = h.r() < 0.25, chr = h.int(2, 4);
      const questions = [];
      let enonce, correction;
      if (!hetero) {
        enonce = `<p>Chez ${S.esp === "pois" ? "le pois" : S.esp === "souris" ? "la souris" : S.esp === "drosophile" ? "la drosophile" : "les bovins"}, on étudie ${g.nom}. On croise une lignée pure ${g.d} avec une lignée pure ${g.r} : toute la génération F₁ est ${g.d}.</p><p>${NB1(g)}</p>`;
        questions.push({ type: "qcm", q: "Quel allèle est dominant ?", options: h.melange([
          opt(`${g.dom} (${g.d})`, true),
          opt(`${g.rec} (${g.r})`, false, `Tu as pris l’allèle masqué pour le dominant. Seul le caractère ${cn(g.d)} paraît en F₁ : son allèle ${g.dom} est dominant.`, "récessif pris pour dominant"),
        ]) });
        questions.push({ type: "qcm", q: "Quel est le génotype d’un individu de F₁ ?", options: h.melange([
          opt(`$${texAl(g.dom)}//${texAl(g.rec)}$`, true),
          opt(`$${texAl(g.dom)}//${texAl(g.dom)}$`, false, `Tu as repris le phénotype comme génotype. Chaque individu de F₁ a reçu ${g.rec} du parent ${g.r} : il est hétérozygote.`, "même phénotype, même génotype"),
          opt(`$${texAl(g.dom)}$`, false, "Tu as oublié que la cellule a deux exemplaires de chaque chromosome : deux homologues, deux allèles.", "un seul allèle par individu"),
        ]) });
        correction = [{ t: `F₁ homogène : le caractère ${cn(g.d)} est dominant, noté ${g.dom}.` }, { t: `Les parents sont de lignée pure, ${g.dom}//${g.dom} et ${g.rec}//${g.rec} : F₁ est ${par(g)}.`, r: "Selon la 1ère loi de Mendel." }];
      } else {
        enonce = `<p>Chez ${S.esp === "pois" ? "le pois" : S.esp === "souris" ? "la souris" : S.esp === "drosophile" ? "la drosophile" : "les bovins"}, on croise deux individus ${g.d}. La génération F₁ est hétérogène : il y a des individus ${g.d} et des individus ${g.r}.</p><p>${NB1(g)}</p>`;
        questions.push({ type: "qcm", q: "Que peut-on dire des parents ?", options: h.melange([
          opt("au moins l’un des deux est hétérozygote", true),
          opt("ils sont de lignée pure", false, "Tu as lu la première loi à l’envers. Deux lignées pures donnent une F₁ homogène : une F₁ hétérogène l’exclut.", "F1 hétérogène et lignées pures"),
          opt("ils sont tous deux homozygotes pour l’allèle récessif", false, `Deux homozygotes récessifs ${g.rec}//${g.rec} seraient ${g.r}, pas ${g.d}.`, "même phénotype, même génotype"),
        ]) });
        questions.push({ type: "qcm", q: `Quel allèle est récessif ?`, options: h.melange([
          opt(`${g.rec} (${g.r})`, true),
          opt(`${g.dom} (${g.d})`, false, `Le caractère ${cn(g.r)} est absent chez les parents et apparaît chez des petits : il était masqué, son allèle ${g.rec} est récessif.`, "récessif pris pour dominant"),
        ]) });
        correction = [{ t: `Des parents ${g.d} qui donnent des descendants ${g.r} cachaient ${g.rec} : ils sont hybrides, ${par(g)}.` }, { t: "Une F₁ hétérogène montre qu’au moins un parent est hétérozygote." }];
      }
      questions.push({ type: "qcm", q: `Le gène est porté par le chromosome n° ${chr}, un autosome. Le caractère est-il lié au sexe ?`, options: h.melange([
        opt("non : un autosome n’est pas un chromosome sexuel", true),
        opt("oui : tout gène d’un chromosome numéroté est lié au sexe", false, "Tu as pris un autosome pour un chromosome sexuel. Seuls X et Y sont des chromosomes sexuels.", "un autosome pris pour un chromosome sexuel"),
      ]) });
      correction.push({ t: "Un gène porté par un autosome n’est pas lié au sexe : c’est une ligne de copie au bac." });
      return { enonce, questions, correction };
    },
  },

  /* 2 : F2 d'un gène */
  {
    id: "f2-monohybride",
    titre: "La F2 d’un gène : proportions et effectifs",
    niveau: 2,
    capacites: CAP(1),
    erreurs: ["1:2:1 pris pour les phénotypes", "¼ au lieu de ⅓ (calcul sur le total)", "le ½ du test-cross appliqué à la F2", "addition pour « et »"],
    gen(h) {
      const S = h.pick(SETS), g = h.pick([S.g1, S.g2]), N = 4 * alea(h, 20, 200);
      const E = echiquier({ genes: [{ dom: g.dom, rec: g.rec }], cols: egaux([[g.dom], [g.rec]]), rows: egaux([[g.dom], [g.rec]]), mode: "un" });
      const nD = E.classes[0].n, nR = E.classes[1].n, hetero = E.cells.filter((c) => c.geno === `${g.dom}//${g.rec}`).length;
      const effD = (N * nD) / 4, effH = (N * hetero) / 4, effR = (N * nR) / 4;
      const partPur = E.cells.filter((c) => c.geno === `${g.dom}//${g.dom}`).length / nD;     // ⅓
      const q = h.pick(["dom", "het", "pur"]);
      const questions = [];
      if (q === "dom") questions.push({ type: "nombre", q: `Parmi ${f0(N)} descendants de F₂, combien sont ${g.d}, en moyenne ?`, reponse: effD, tol: { abs: 0.5 }, indice: "Trois cases de l’échiquier sur quatre portent au moins un allèle dominant.",
        pieges: sansDoublon([{ v: effR, fb: `Tu as compté les ${g.r}. Les ${g.d} sont les trois quarts.`, erreur: "¼ au lieu de ⅓ (calcul sur le total)" }, { v: N / 2, fb: "Tu as pris le rapport d’un test-cross, ½ et ½. En F₂, les deux parents sont hybrides : ¾ et ¼.", erreur: "le ½ du test-cross appliqué à la F2" }], effD, 0.5) });
      if (q === "het") questions.push({ type: "nombre", q: `Parmi ${f0(N)} descendants de F₂, combien sont hétérozygotes ${par(g)}, en moyenne ?`, reponse: effH, tol: { abs: 0.5 }, indice: "Dans l’échiquier, compte les cases hétérozygotes : il y en a deux sur quatre.",
        pieges: sansDoublon([{ v: effD, fb: `Tu as compté tous les ${g.d}. Parmi eux, seule une case sur trois est ${g.dom}//${g.dom} : les génotypes ne sont pas les phénotypes (rapport 1:2:1).`, erreur: "1:2:1 pris pour les phénotypes" }, { v: effR, fb: "Tu as pris un quart. Les hétérozygotes occupent deux cases sur quatre.", erreur: "1:2:1 pris pour les phénotypes" }], effH, 0.5) });
      if (q === "pur") questions.push({ type: "nombre", q: `Parmi les descendants de F₂ qui sont ${g.d}, quelle fraction est homozygote ${g.dom}//${g.dom} ?`, reponse: partPur, tol: { abs: 0.005 }, indice: "Seules les cases ${g.d} comptent : combien y en a-t-il, et combien sont homozygotes ?".replace("${g.d}", g.d),
        pieges: sansDoublon([{ v: 0.25, fb: "Tu as compté sur le total, 4 cases. La question ne porte que sur les descendants dominants : 3 cases.", erreur: "¼ au lieu de ⅓ (calcul sur le total)" }, { v: 0.5, fb: "Tu as pris le rapport du test-cross. Parmi les trois cases dominantes, une seule est homozygote.", erreur: "le ½ du test-cross appliqué à la F2" }], partPur, 0.005) });
      questions.push({ type: "qcm", q: `Probabilité qu’un descendant de F₂ soit ${g.r}, de génotype ${g.rec}//${g.rec} ?`, options: h.melange([
        opt("½ × ½ = ¼", true),
        opt("½ + ½ = 1", false, "Tu as additionné pour « et ». Il faut ℓ du pollen et ℓ de l’ovule : deux conditions à la fois se multiplient.".replace("ℓ", g.rec).replace("ℓ", g.rec), "addition pour « et »"),
        opt("½", false, "Tu n’as regardé qu’un parent. Les deux parents doivent donner l’allèle récessif.", "addition pour « et »"),
      ]) });
      return {
        enonce: `<p>On croise entre eux des individus de F₁ ${par(g)}, issus de deux lignées pures. Le caractère étudié est ${g.nom} : ${cn(g.d)} (${g.dom}) ou ${cn(g.r)} (${g.rec}).</p><p>${NB1(g)}</p>`,
        questions,
        correction: [
          { t: `Gamètes de chaque parent : ½ ${g.dom}/ et ½ ${g.rec}/. L’échiquier a quatre cases, d’un quart chacune.` },
          { t: `Phénotypes : ¾ [${g.dom}] et ¼ [${g.rec}] ; génotypes : ¼ ${g.dom}//${g.dom}, ½ ${par(g)}, ¼ ${g.rec}//${g.rec}.`, r: `L’hétérozygote ${par(g)} est ${g.d}, comme ${g.dom}//${g.dom}.` },
        ],
      };
    },
  },

  /* 3 : test-cross d'un gène */
  {
    id: "test-cross-un-gene",
    titre: "Le test-cross d’un gène",
    niveau: 2,
    capacites: CAP(1),
    erreurs: ["testeur dominant ou hybride", "rapport exact exigé", "¾ / ¼ attendus au test-cross", "même phénotype, même génotype"],
    gen(h) {
      const S = h.pick(SETS), g = h.pick([S.g1, S.g2]), hetero = h.r() < 0.6, N = 10 * alea(h, 8, 60);
      const obs = hetero ? observe(h, [0.5, 0.5], N) : [N, 0];
      const N2 = obs[0] + obs[1];
      const questions = [{ type: "qcm", q: `Pour déterminer le génotype d’un individu ${g.d}, avec quel partenaire faut-il le croiser ?`, options: h.melange([
        opt(`un individu ${g.r}, ${g.rec}//${g.rec}`, true),
        opt(`un individu de lignée pure ${g.d}, ${g.dom}//${g.dom}`, false, "Tous les descendants seraient dominants, quel que soit le génotype testé. Le partenaire ne doit rien masquer.", "testeur dominant ou hybride"),
        opt(`un autre individu ${g.d}`, false, "Il peut être hybride : ses propres gamètes brouilleraient la lecture. Il faut un partenaire de gamètes connus.", "testeur dominant ou hybride"),
      ]) },
      { type: "qcm", q: `Le test-cross donne ${f0(obs[0])} descendants ${g.d} et ${f0(obs[1])} descendants ${g.r}. Quel est le génotype de l’individu testé ?`, options: h.melange([
        opt(hetero ? par(g) : `${g.dom}//${g.dom}`, true),
        opt(hetero ? `${g.dom}//${g.dom}` : par(g), false, hetero ? `Un seul descendant ${g.r} suffit à exclure ${g.dom}//${g.dom} : il a reçu ${g.rec} du parent testé.` : `Aucun descendant ${g.r} : l’individu testé ne donne pas ${g.rec}. Les comptes ne sont pas à ½ et ½.`, hetero ? "même phénotype, même génotype" : "rapport exact exigé"),
        opt(hetero ? "on ne peut pas conclure, car les comptes ne sont pas exactement égaux" : "on ne peut pas conclure, car il n’y a pas d’individus récessifs", false, hetero ? "Tu as exigé un rapport exact. Un compte réel s’écarte un peu de l’attendu." : "Tu as demandé des récessifs pour conclure. Leur absence totale est justement le signe d’un testé homozygote.", "rapport exact exigé"),
      ]) }];
      if (hetero) questions.push({ type: "nombre", q: `Pour ${f0(N)} descendants, quel effectif de descendants ${g.r} attend-on si l’individu testé est ${par(g)} ?`, reponse: N / 2, tol: { abs: 0.5 }, indice: "Le testeur ne donne qu’un type de gamète : les proportions sont celles des gamètes du parent testé.",
        pieges: sansDoublon([{ v: N / 4, fb: "Tu as appliqué le rapport de la F₂ à un test-cross, ¾ et ¼. Ici le testeur ne donne que l’allèle récessif : ½ et ½.", erreur: "¾ / ¼ attendus au test-cross" }, { v: (3 * N) / 4, fb: "Tu as pris la part des dominants de la F₂. Au test-cross, la moitié des descendants est récessive.", erreur: "¾ / ¼ attendus au test-cross" }], N / 2, 0.5) });
      return {
        enonce: `<p>On étudie ${g.nom} : le caractère ${cn(g.d)} (${g.dom}) est dominant sur le caractère ${cn(g.r)} (${g.rec}). Un individu ${g.d}, de génotype inconnu, est croisé avec un individu récessif : c’est un test-cross.</p><p>${NB1(g)}</p>`,
        questions,
        correction: [
          { t: "Le partenaire est homozygote récessif : il ne masque aucun allèle de l’individu testé." },
          { t: hetero ? `Les descendants ${g.r} montrent que l’individu testé donne ${g.rec} : il est ${par(g)}, et il donne ½ ${g.dom}/ et ½ ${g.rec}/.` : `Aucun descendant ${g.r} : l’individu testé ne donne que ${g.dom}, il est ${g.dom}//${g.dom}.`, r: "Les proportions d’un test-cross sont celles des gamètes du parent testé." },
        ],
      };
    },
  },

  /* 4 : gène létal */
  {
    id: "gene-letal",
    titre: "Un rapport 2 pour 1 : le gène létal",
    niveau: 2,
    capacites: CAP(1),
    erreurs: ["un rapport 2:1 pris pour une erreur d’expérience", "compter sur 4 cases", "oublier la case barrée", "[A] = A//A ou A//a"],
    gen(h) {
      const L = h.pick(LETAUX), g = L.g, N = 3 * alea(h, 30, 200);
      const E = echiquier({ genes: [{ dom: g.dom, rec: g.rec }], cols: egaux([[g.dom], [g.rec]]), rows: egaux([[g.dom], [g.rec]]), mode: "un", letal: [0] });
      const cD = E.classes[0], cR = E.classes[1];
      const obs = observe(h, [cD.n / E.N, cR.n / E.N], N);
      const part = cD.n / E.N, effR = (N * cR.n) / E.N;
      const questions = [
        { type: "qcm", q: `Les descendants sont ${f0(obs[0])} ${g.d} et ${f0(obs[1])} ${g.r}. Comment interpréter ces résultats ?`, options: h.melange([
          opt(`le gène est létal à l’état homozygote : les ${g.dom}//${g.dom} ne naissent pas`, true),
          opt("c’est une erreur d’expérience : il faut refaire le croisement avec plus d’individus", false, "Tu as pris un rapport 2 pour 1 pour une erreur d’expérience. C’est la signature d’un gène létal.", "un rapport 2:1 pris pour une erreur d’expérience"),
          opt(`il naît plus d’individus ${g.r} que prévu`, false, `Les individus ${g.r} ne sont pas en excès : ce sont des individus ${g.d} qui manquent, car ${g.dom}//${g.dom} meurt avant la naissance.`, "oublier la case barrée"),
        ]) },
        { type: "qcm", q: `Quel est le génotype de tous les individus ${g.d} de cet élevage ?`, options: h.melange([
          opt(par(g), true),
          opt(`${g.dom}//${g.dom} ou ${par(g)}`, false, `Tu as compté comme pour un gène ordinaire. Ici les ${g.dom}//${g.dom} ne naissent pas.`, "[A] = A//A ou A//a"),
          opt(`${g.dom}//${g.dom}`, false, `Ce sont justement ces individus qui meurent. Les ${g.d} vivants sont ${par(g)}.`, "[A] = A//A ou A//a"),
        ]) },
        { type: "nombre", q: `Parmi les individus nés, quelle fraction est ${g.d} ?`, reponse: part, tol: { abs: 0.005 }, indice: "Compte les cases des vivants : la case barrée ne donne aucun individu.",
          pieges: sansDoublon([{ v: 0.5, fb: "Tu as compté sur 4 cases alors qu’une est barrée. On compte sur les cases des vivants : 3.", erreur: "compter sur 4 cases" }, { v: 0.75, fb: "Tu as oublié la case barrée. Elle ne donne aucun individu : trois cases, dont deux dominantes.", erreur: "oublier la case barrée" }], part, 0.005) },
        { type: "nombre", q: `Sur ${f0(N)} individus nés, combien sont ${g.r}, en moyenne ?`, reponse: effR, tol: { abs: 0.5 }, indice: "Le tiers des vivants est récessif.",
          pieges: sansDoublon([{ v: N / 4, fb: "Tu as compté sur 4 cases. Il en reste 3 pour les vivants : un tiers.", erreur: "compter sur 4 cases" }, { v: N / 2, fb: "Tu as pris le rapport du test-cross. Parmi les vivants, un tiers est récessif.", erreur: "compter sur 4 cases" }], effR, 0.5) },
      ];
      return {
        enonce: `<p>${L.esp === "souris" ? "Des souris" : "Des bovins"} ${g.d} sont croisés entre eux. On compte ${f0(obs[0])} descendants ${g.d} et ${f0(obs[1])} descendants ${g.r}, soit environ 2 pour 1.</p><p>${NB1(g)}</p>`,
        questions,
        correction: [
          { t: `Les parents ${g.d} donnent des ${g.r} : ils sont hybrides, ${par(g)}. On attendrait ¾ et ¼.` },
          { t: `Le rapport 2 pour 1 s’explique par un gène létal : la case ${g.dom}//${g.dom} est barrée, il reste trois cases, deux ${g.d} et une ${g.r}.`, r: "On compte sur les cases des vivants." },
        ],
      };
    },
  },

  /* 5 : gamètes d'un génotype à deux gènes */
  {
    id: "gametes-genotype",
    titre: "Les gamètes d’un double hétérozygote",
    niveau: 1,
    capacites: CAP(2, 3),
    erreurs: ["¼ chacun pour des gènes liés", "deux gamètes pour des gènes indépendants", "d au lieu de d/2 par gamète recombiné", "gamète à deux allèles d’un gène"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, cas = h.pick(["indep", "absolu", "lie"]), d = alea(h, 2, 30);
      const h1 = [a.dom, b.dom], h2 = [a.rec, b.rec];
      const geno = cas === "indep" ? `$${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$` : gx(h1, h2);
      const phrase = cas === "indep" ? "Les deux gènes sont portés par deux paires de chromosomes différentes." : cas === "absolu" ? "Les deux gènes sont portés par la même paire, sans aucun crossing-over entre eux (linkage absolu)." : `Les deux gènes sont portés par la même paire, à ${d} cM l’un de l’autre : ${d} % des gamètes sont recombinés.`;
      const nb = cas === "absolu" ? 2 : 4;
      const G = cas === "indep" ? egaux([[a.dom, b.dom], [a.dom, b.rec], [a.rec, b.dom], [a.rec, b.rec]]) : cas === "absolu" ? gametesAbsolus(h1, h2) : gametesLies(h1, h2, d / 100);
      const rec = cas === "lie" && h.r() < 0.5, cible = cas === "lie" ? (rec ? G[1] : G[0]) : G[0];
      const v = Number((cible.p * 100).toFixed(2));
      const questions = [{ type: "nombre", q: "Combien de types de gamètes produit-il ?", reponse: nb, tol: { abs: 0.01 }, indice: cas === "absolu" ? "Sans crossing-over, chaque chromosome passe entier dans un gamète." : "Compte les combinaisons d’allèles possibles.",
        pieges: sansDoublon([cas === "absolu" ? { v: 4, fb: "Tu as compté quatre types comme pour deux paires. Sans crossing-over, deux gènes d’un même chromosome restent ensemble : deux types.", erreur: "¼ chacun pour des gènes liés" } : cas === "indep" ? { v: 2, fb: "Tu as compté deux types comme pour des gènes liés sans crossing-over. Deux paires s’orientent chacune au hasard : quatre types.", erreur: "deux gamètes pour des gènes indépendants" } : { v: 2, fb: "Tu as oublié le crossing-over. Avec des recombinés, il y a quatre types : deux parentaux, deux recombinés.", erreur: "deux gamètes pour des gènes indépendants" }], nb, 0.01) },
      { type: "nombre", q: `Quel pourcentage de gamètes ${cible.h.join(" ")} produit-il ?`, reponse: v, tol: { abs: 0.01 }, unite: "%", indice: cas === "lie" ? (rec ? "Les recombinés se partagent le pourcentage d entre deux gamètes égaux." : "Les parentaux se partagent le reste, 100 − d, entre deux gamètes égaux.") : "Les gamètes d’un même type sont à égalité.",
        pieges: sansDoublon(cas === "lie" ? (rec ? [{ v: d, fb: `Tu as donné aux recombinés la part des deux gamètes ensemble. Chacun en a la moitié : ${f2(d / 2)} %.`, erreur: "d au lieu de d/2 par gamète recombiné" }, { v: 25, fb: "Tu as mis ¼ chacun, comme pour des gènes indépendants. Ici les gènes sont liés : les recombinés sont rares.", erreur: "¼ chacun pour des gènes liés" }, { v: (100 - d) / 2, fb: "Ce sont les gamètes parentaux. Un recombiné se partage le pourcentage d.", erreur: "¼ chacun pour des gènes liés" }] : [{ v: 100 - d, fb: `Tu as donné aux parentaux la part des deux gamètes ensemble. Chacun en a la moitié : ${f2((100 - d) / 2)} %.`, erreur: "d au lieu de d/2 par gamète recombiné" }, { v: 25, fb: "Tu as mis ¼ chacun, comme pour des gènes indépendants. Ici les gènes sont liés : les parentaux sont majoritaires.", erreur: "¼ chacun pour des gènes liés" }, { v: d / 2, fb: "Ce sont les gamètes recombinés. Un parental en a la moitié de 100 − d.", erreur: "¼ chacun pour des gènes liés" }]) : cas === "absolu" ? [{ v: 25, fb: "Tu as mis ¼ chacun. Sans crossing-over il n’y a que deux types, à ½ chacun.", erreur: "¼ chacun pour des gènes liés" }, { v: 100, fb: "Il y a deux types de gamètes, pas un : chacun vaut la moitié.", erreur: "¼ chacun pour des gènes liés" }] : [{ v: 50, fb: "Tu as compté deux types seulement. Pour deux paires, il y a quatre types, ¼ chacun.", erreur: "deux gamètes pour des gènes indépendants" }, { v: 100, fb: "Un gamète ne porte qu’une des quatre combinaisons : ¼.", erreur: "deux gamètes pour des gènes indépendants" }], v, 0.01) },
      { type: "qcm", q: "Lequel de ces gamètes est impossible ?", options: h.melange([
        opt(`${a.dom} ${a.rec}`, true),
        opt(`${a.dom} ${b.rec}`, false, "Ce gamète porte un allèle de chaque gène : il est possible (un recombiné si les gènes sont liés).", "gamète à deux allèles d’un gène"),
        opt(`${a.rec} ${b.dom}`, false, "Ce gamète porte un allèle de chaque gène : il est possible (un recombiné si les gènes sont liés).", "gamète à deux allèles d’un gène"),
      ]) }];
      return {
        enonce: `<p>Un individu a pour génotype ${geno}. ${phrase}</p><p>${NB2(a, b)}</p>`,
        questions,
        correction: [
          { t: cas === "indep" ? "Deux paires s’orientent chacune au hasard : quatre types de gamètes, ¼ chacun." : cas === "absolu" ? "Sans crossing-over, les chromosomes passent entiers : deux types, ½ chacun." : `d = ${d} % de recombinés : chaque recombiné vaut d/2 = ${f2(d / 2)} %, chaque parental (100 − d)/2 = ${f2((100 - d) / 2)} %.`, r: "Un gamète porte un allèle de chaque gène." },
        ],
      };
    },
  },

  /* 6 : la notation des corrigés */
  {
    id: "notation",
    titre: "Écrire le génotype de F1 comme au bac",
    niveau: 1,
    capacites: CAP(2),
    erreurs: ["écritures indépendants / liés confondues", "phase inversée mal écrite", "allèles d’un même gène face à face"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, cas = h.pick(["indep", "cis", "trans"]);
      const A_ = [a.dom, a.rec], B_ = [b.dom, b.rec];
      const bon = cas === "indep" ? `$${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$` : cas === "cis" ? gx([a.dom, b.dom], [a.rec, b.rec]) : gx([a.dom, b.rec], [a.rec, b.dom]);
      const l1 = cas === "trans" ? `${a.d} et ${b.r}` : `${a.d} et ${b.d}`, l2 = cas === "trans" ? `${a.r} et ${b.d}` : `${a.r} et ${b.r}`;
      const faux = cas === "indep" ? [
        { t: gx([a.dom, b.dom], [a.rec, b.rec]), fb: "Tu as écrit des gènes liés. Ici, deux paires : deux génotypes côte à côte.", erreur: "écritures indépendants / liés confondues" },
        { t: gx(A_, B_), fb: "Tu as mis face à face deux gènes différents. Les deux traits séparent les deux allèles d’un même gène.", erreur: "allèles d’un même gène face à face" }]
        : [
        { t: `$${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$`, fb: "Tu as écrit deux paires. Sur un même chromosome, chaque chromosome porte un allèle de chaque gène.", erreur: "écritures indépendants / liés confondues" },
        cas === "cis" ? { t: gx([a.dom, b.rec], [a.rec, b.dom]), fb: "Tu as inversé la phase. Les chromosomes de F₁ sont ceux des parents : l’un porte les deux allèles dominants, l’autre les deux récessifs.", erreur: "phase inversée mal écrite" } : { t: gx([a.dom, b.dom], [a.rec, b.rec]), fb: "Tu as écrit la phase des parents ci-dessus au lieu de celle de l’énoncé. Un parent apporte l’allèle dominant du premier gène et le récessif du second.", erreur: "phase inversée mal écrite" },
        { t: gx(A_, B_), fb: "Tu as mis les deux allèles d’un gène sur un même chromosome. Chaque chromosome porte un allèle de chaque gène.", erreur: "allèles d’un même gène face à face" }].slice(0, 2);
      return {
        enonce: `<p>${cas === "indep" ? "Les deux gènes sont portés par deux paires de chromosomes différentes." : "Les deux gènes sont portés par la même paire de chromosomes."} On croise une lignée pure ${l1} avec une lignée pure ${l2} : la génération F₁ est homogène.</p><p>${NB2(a, b)}</p>`,
        questions: [{ type: "qcm", q: "Quel est le génotype de F₁, écrit comme dans les corrigés du bac ?", options: h.melange([{ t: bon, ok: true }, ...faux.map((f) => ({ t: f.t, fb: f.fb, erreur: f.erreur }))]) }],
        correction: [{ t: cas === "indep" ? "Deux paires : on écrit les deux génotypes côte à côte, un par gène." : "Un même chromosome : on écrit en fraction les deux allèles de chaque chromosome, un par gène." }, { t: cas === "trans" ? "Les parents apportent chacun un chromosome : F₁ porte, sur chaque chromosome, la combinaison d’un parent." : "F₁ reçoit un chromosome de chaque parent.", r: "La première loi de Mendel : F₁ homogène." }],
      };
    },
  },

  /* 7 : test-cross de deux gènes */
  {
    id: "test-cross-deux-genes",
    titre: "Le test-cross de deux gènes : indépendants ou liés ?",
    niveau: 2,
    capacites: CAP(2),
    erreurs: ["« quatre classes, donc indépendants »", "« deux grandes classes, donc linkage absolu »", "rapport exact exigé"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, mod = h.pick(["indep", "absolu", "relatif"]), N = 100 * alea(h, 4, 20), d = alea(h, 2, 30);
      const K = clefs2([a, b]).map((x) => `[${x.join(", ")}]`);
      let obs, att, nomMod;
      if (mod === "indep") { obs = observe(h, [0.25, 0.25, 0.25, 0.25], N); att = [25, 25, 25, 25]; nomMod = "indépendants"; }
      else if (mod === "absolu") { const o = observe(h, [0.5, 0.5], N); obs = [o[0], 0, 0, o[1]]; att = [50, 0, 0, 50]; nomMod = "liés, sans crossing-over (linkage absolu)"; }
      else { const p = (100 - d) / 200, r = d / 200, o = observe(h, [p, r, r, p], N); obs = [o[0], o[1], o[2], o[3]]; att = [(100 - d) / 2, d / 2, d / 2, (100 - d) / 2]; nomMod = `liés, avec crossing-over (linkage relatif)`; }
      const R = obs.map((x, i) => `${f0(x)} ${K[i]}`).filter((_, i) => obs[i] > 0).join(" ; ");
      const questions = [{ type: "qcm", q: "Que concluez-vous ?", options: h.melange([
        { t: `les gènes sont ${nomMod}`, ok: true },
        ...(mod === "indep" ? [
          { t: "les gènes sont liés, avec crossing-over (linkage relatif)", fb: "Tu as lu des classes inégales : or ici les quatre classes sont proches de 25 %, donc égales.", erreur: "rapport exact exigé" },
          { t: "les gènes sont liés, sans crossing-over (linkage absolu)", fb: "Sans crossing-over il n’y aurait que deux classes. Il y en a quatre, à peu près égales.", erreur: "« deux grandes classes, donc linkage absolu »" }]
          : mod === "absolu" ? [
          { t: "les gènes sont indépendants", fb: "Des gènes indépendants donneraient quatre classes égales. Ici seules deux classes existent.", erreur: "« quatre classes, donc indépendants »" },
          { t: "les gènes sont liés, avec crossing-over (linkage relatif)", fb: "Avec crossing-over, il y aurait des classes recombinées. Ici il n’y en a aucune.", erreur: "« deux grandes classes, donc linkage absolu »" }]
          : [
          { t: "les gènes sont indépendants", fb: "Tu as cru que quatre classes disent « indépendants ». Des gènes indépendants donnent quatre classes égales, pas deux grandes et deux petites.", erreur: "« quatre classes, donc indépendants »" },
          { t: "les gènes sont liés, sans crossing-over (linkage absolu)", fb: "Tu as retenu les deux grandes classes. Les deux petites montrent que des recombinés existent : il y a eu des crossing-over.", erreur: "« deux grandes classes, donc linkage absolu »" }]),
      ]) }];
      const vq = mod === "indep" ? 25 : mod === "absolu" ? 50 : d;
      if (mod === "relatif") questions.push({ type: "nombre", q: "Quelle est la distance entre les deux gènes, en cM ?", reponse: Number(((100 * (obs[1] + obs[2])) / N).toFixed(2)), tol: { abs: 0.01 * Math.max(1, d) + 0.3 }, unite: "cM", indice: "Les recombinés sont les deux petites classes ; on divise par tous les descendants.",
        pieges: sansDoublon([{ v: Number(((100 * (obs[1] + obs[2])) / (obs[0] + obs[3])).toFixed(2)), fb: "Tu as divisé par les seuls parentaux. On divise par tous les descendants.", erreur: "division par les parentaux" }, { v: Number(((100 * obs[1]) / N).toFixed(2)), fb: "Tu n’as compté qu’une classe recombinée. Les deux classes rares ensemble.", erreur: "une seule classe" }], Number(((100 * (obs[1] + obs[2])) / N).toFixed(2)), 0.01 * Math.max(1, d) + 0.3) });
      else questions.push({ type: "nombre", q: "Quelle proportion de chaque classe attendait-on sous ce modèle, en % ?", reponse: vq, tol: { abs: 0.01 }, unite: "%", indice: mod === "indep" ? "Quatre classes égales." : "Deux gamètes, à égalité.",
        pieges: sansDoublon(mod === "indep" ? [{ v: 50, fb: "Tu as compté deux classes seulement. Quatre gamètes à égalité : ¼ chacun.", erreur: "« deux grandes classes, donc linkage absolu »" }, { v: 6.25, fb: "Tu as appliqué la F₂ de deux gènes à un test-cross : le testeur ne donne qu’un gamète, ¼ chacun.", erreur: "« quatre classes, donc indépendants »" }] : [{ v: 25, fb: "Tu as supposé quatre classes. Sans crossing-over, deux gamètes seulement : ½ chacun.", erreur: "« quatre classes, donc indépendants »" }, { v: 75, fb: "Tu as pris le rapport de la F₂ en linkage absolu. Au test-cross, chaque classe vaut ½.", erreur: "rapport exact exigé" }], vq, 0.01) });
      const parent = mod === "indep" ? `$${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$` : gx([a.dom, b.dom], [a.rec, b.rec]);
      return {
        enonce: `<p>Un double hétérozygote ${parent} est croisé avec un double récessif. On obtient ${f0(N)} descendants : ${R}.</p><p>${NB2(a, b)}</p>`,
        questions,
        correction: [
          { t: mod === "indep" ? "Quatre classes proches de 25 % : le test-cross montre quatre gamètes égaux, les gènes sont indépendants." : mod === "absolu" ? "Deux classes seulement, proches de 50 % : aucun recombiné, les gènes sont liés sans crossing-over." : `Deux grandes classes et deux petites : les gènes sont liés, et les petites classes sont recombinées. d = ${f2(att[1] * 2)} cM environ.`, r: "Les proportions d’un test-cross sont celles des gamètes du parent testé." },
          { t: `Attendu : ${att.filter((x) => x > 0).map((x) => `${f2(x)} %`).join(", ")} ; les comptes réels s’écartent un peu de ces valeurs.` },
        ],
      };
    },
  },

  /* 8 : F2 de deux gènes indépendants */
  {
    id: "f2-deux-genes",
    titre: "Deux gènes indépendants : les proportions attendues",
    niveau: 2,
    capacites: CAP(2),
    erreurs: ["addition pour « et »", "9:3:3:1 appliqué à tout croisement", "un seul caractère suivi"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, mod = h.pick(["F1F1", "un"]), N = 16 * alea(h, 10, 60);
      const GN = (c) => [{ dom: a.dom, rec: a.rec }, { dom: b.dom, rec: b.rec }];
      const gam4 = egaux([[a.dom, b.dom], [a.dom, b.rec], [a.rec, b.dom], [a.rec, b.rec]]);
      const E = mod === "F1F1" ? echiquier({ genes: GN(), cols: gam4, rows: gam4, mode: "indep" }) : echiquier({ genes: GN(), cols: gam4, rows: egaux([[a.dom, b.rec], [a.rec, b.rec]]), mode: "indep" });
      const F2 = echiquier({ genes: GN(), cols: gam4, rows: gam4, mode: "indep" });
      const cl = h.pick(E.classes.filter((c) => c.key.includes(b.rec) || true));
      const frac = cl.w / E.classes.reduce((s, c) => s + c.w, 0);
      const rep = N * frac;
      const k = cl.key, doms = k.slice(1, -1).split(", ");
      const un1 = (doms[0] === a.dom ? 0.75 : 0.25) * N;
      const clF2 = F2.classes.find((c) => c.key === k), faux9 = N * (clF2.n / 16);
      const ps = ((doms[0] === a.dom ? 3 : 1) + (doms[1] === b.dom ? 3 : 1)) / 4, somme = N * ps;      // l'addition des deux proportions : un leurre seulement si elle reste sous 1
      const pieges = sansDoublon([
        ...(mod === "un" ? [{ v: faux9, fb: "Tu as appliqué 9:3:3:1 à tout croisement. Ici un parent est homozygote pour le second gène : les proportions sont des huitièmes.", erreur: "9:3:3:1 appliqué à tout croisement" }] : []),
        { v: un1, fb: "Tu n’as suivi qu’un seul caractère. La classe demandée fixe les deux caractères à la fois : on multiplie.", erreur: "un seul caractère suivi" },
        ...(ps < 1 ? [{ v: somme, fb: "Tu as additionné les proportions des deux caractères. Deux conditions à la fois se multiplient.", erreur: "addition pour « et »" }] : []),
      ], rep, 0.5);
      const parents = mod === "F1F1" ? `entre eux deux individus de F₁ $${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$` : `un individu de F₁ $${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$ avec un individu $${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.rec)}//${texAl(b.rec)}$`;
      return {
        enonce: `<p>Les deux gènes sont indépendants. On croise ${parents}. On obtient ${f0(N)} descendants.</p><p>${NB2(a, b)}</p>`,
        questions: [
          { type: "nombre", q: `Combien de descendants [${doms.join(", ")}] attend-on, en moyenne ?`, reponse: rep, tol: { abs: 0.5 }, indice: mod === "F1F1" ? "Chaque parent donne quatre gamètes à ¼ : l’échiquier a 16 cases." : "Écris les gamètes de chaque parent : l’un en donne quatre, l’autre deux.", pieges },
          { type: "qcm", q: "Quelle part de l’échiquier cette classe occupe-t-elle ?", options: h.melange([
            opt(fLab(Math.round(frac * 16), 16), true),
            ...[fLab(Math.round(un1 / N * 16), 16), fLab(Math.round(faux9 / N * 16), 16)].filter((x) => x !== fLab(Math.round(frac * 16), 16)).filter((x, i, ar) => ar.indexOf(x) === i).map((x) => opt(x, false, "Ce n’est pas la part de cette classe : multiplie les proportions des deux gamètes de chaque case.", "addition pour « et »")),
          ]) },
        ],
        correction: [
          { t: mod === "F1F1" ? "Quatre gamètes à ¼ de chaque côté : 16 cases d’un seizième. Classes : 9/16, 3/16, 3/16, 1/16." : "Quatre gamètes à ¼ d’un côté, deux à ½ de l’autre : 8 cases. Classes : 3/8, 3/8, 1/8, 1/8." },
          { t: `La classe [${doms.join(", ")}] vaut ${fLab(Math.round(frac * 16), 16)} : ${f0(rep)} descendants.`, r: "Les proportions des gamètes se multiplient." },
        ],
      };
    },
  },

  /* 9 : parentaux et recombinés */
  {
    id: "parentaux-recombines",
    titre: "Classes parentales et classes recombinées",
    niveau: 2,
    capacites: CAP(2, 3),
    erreurs: ["recombinés pris pour les phénotypes qui mélangent les caractères", "recombinés pris pour les classes majoritaires"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, phase = h.pick(["cis", "trans"]), d = alea(h, 2, 30), N = 100 * alea(h, 4, 20);
      const p1 = phase === "cis" ? [a.dom, b.dom] : [a.dom, b.rec], p2 = phase === "cis" ? [a.rec, b.rec] : [a.rec, b.dom];
      const G = gametesLies(p1, p2, d / 100), ph = (x) => `[${x.join(", ")}]`;
      const rec = [ph(G[1].h), ph(G[2].h)], parx = [ph(G[0].h), ph(G[3].h)];
      const R = observe(h, [G[0].p, G[1].p, G[2].p, G[3].p], N);
      const nom = (x) => x.join(" et ");
      const mel = phase === "trans" ? [ph([a.dom, b.dom]), ph([a.rec, b.rec])] : null;
      const options = [
        { t: nom(rec), ok: true },
        phase === "trans" ? { t: nom(parx), fb: "Tu as pris les phénotypes qui « mélangent » les caractères pour des recombinés. On juge par rapport aux chromosomes du parent hybride : ici ce sont les classes parentales, les plus nombreuses.", erreur: "recombinés pris pour les phénotypes qui mélangent les caractères" } : { t: nom(parx), fb: "Ce sont les classes majoritaires, les parentales : elles portent les combinaisons des chromosomes du parent hybride.", erreur: "recombinés pris pour les classes majoritaires" },
        { t: "les quatre classes", fb: "Deux classes seulement demandent un crossing-over. Les deux autres portent les combinaisons des chromosomes du parent.", erreur: "recombinés pris pour les classes majoritaires" },
      ];
      return {
        enonce: `<p>On croise une lignée pure ${phase === "cis" ? `${a.d} et ${b.d}` : `${a.d} et ${b.r}`} avec une lignée pure ${phase === "cis" ? `${a.r} et ${b.r}` : `${a.r} et ${b.d}`}. La F₁ est homogène. Un individu de F₁ est croisé avec un double récessif : on obtient ${f0(N)} descendants, répartis ainsi : ${f0(R[0])} ${ph(G[0].h)}, ${f0(R[3])} ${ph(G[3].h)}, ${f0(R[1])} ${ph(G[1].h)}, ${f0(R[2])} ${ph(G[2].h)}.</p><p>${NB2(a, b)}</p>`,
        questions: [{ type: "qcm", q: "Quelles classes sont recombinées ?", options: h.melange(options.map((o) => (o.ok ? o : { ...o }))) },
          { type: "qcm", q: "Les gènes sont-ils indépendants ?", options: h.melange([opt("non : les classes sont très inégales, donc liés", true), opt("oui : il y a quatre classes", false, "Tu as cru que quatre classes disent « indépendants ». Des gènes indépendants donnent quatre classes égales.", "recombinés pris pour les classes majoritaires")]) }],
        correction: [
          { t: `Le parent hybride est ${phase === "cis" ? gx([a.dom, b.dom], [a.rec, b.rec]) : gx([a.dom, b.rec], [a.rec, b.dom])} : ses gamètes parentaux sont ${nom(parx)}.` },
          { t: `Les deux petites classes ${nom(rec)} sont recombinées : un crossing-over les a produites.`, r: "On juge par rapport aux chromosomes du parent hybride." },
        ],
      };
    },
  },

  /* 10 : la distance */
  {
    id: "distance",
    titre: "Calculer une distance entre deux gènes",
    niveau: 2,
    capacites: CAP(4),
    erreurs: ["division par les parentaux", "une seule classe recombinée", "distance doublée"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, N = 100 * alea(h, 2, 20), d = alea(h, 2, 30);
      const Rt = (N * d) / 100, P = N - Rt, r1 = Math.floor(Rt / 2), r2 = Rt - r1, p1 = Math.floor(P / 2), p2 = P - p1;
      const v = d;
      const pieges = sansDoublon([
        { v: Number(((100 * Rt) / P).toFixed(2)), fb: "Tu as divisé par les seuls parentaux. On divise le nombre de recombinés par tous les descendants.", erreur: "division par les parentaux" },
        { v: Number(((100 * r1) / N).toFixed(2)), fb: "Tu n’as compté qu’une classe recombinée. Les recombinés sont les deux classes rares ensemble.", erreur: "une seule classe recombinée" },
        { v: 2 * d, fb: "Tu as doublé la distance. 1 % de recombinés vaut 1 cM : on ne multiplie pas par 2.", erreur: "distance doublée" },
      ], v, 0.05);
      return {
        enonce: `<p>Un test-cross entre un double hétérozygote et un double récessif donne ${f0(N)} descendants : ${f0(p1)} [${a.dom}, ${b.dom}], ${f0(p2)} [${a.rec}, ${b.rec}], ${f0(r1)} [${a.dom}, ${b.rec}] et ${f0(r2)} [${a.rec}, ${b.dom}]. Les deux gènes sont liés.</p><p>${NB2(a, b)}</p>`,
        questions: [{ type: "nombre", q: "Quelle est la distance entre les deux gènes, en cM ?", reponse: v, tol: { abs: 0.05 }, unite: "cM", indice: "1 % de recombinés = 1 cM. Quels descendants sont recombinés, et sur combien de descendants ?", pieges }],
        correction: [
          { t: `Les recombinés sont les deux petites classes : ${f0(r1)} + ${f0(r2)} = ${f0(Rt)}.` },
          { tex: `d = \\dfrac{${Rt}}{${N}} \\times 100 = ${d}\\ \\text{cM}`, r: "On divise par tous les descendants, pas par les seuls parentaux." },
        ],
      };
    },
  },

  /* 11 : distance et proportions */
  {
    id: "distance-proportions",
    titre: "De la distance aux pourcentages de gamètes",
    niveau: 2,
    capacites: CAP(2, 4),
    erreurs: ["position lue comme une distance", "d donné à une classe", "parentaux à 100 − d"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, forme = h.pick(["dist", "pos"]), d = alea(h, 2, 30), p1 = alea(h, 5, 60), p2 = p1 + d;
      const hy = gx([a.dom, b.dom], [a.rec, b.rec]);
      const recV = d / 2, parV = (100 - d) / 2;
      const intro = forme === "dist" ? `Deux gènes liés sont à ${d} cM l’un de l’autre.` : `Sur la carte d’un chromosome, deux gènes liés sont placés à ${p1} cM et à ${p2} cM de l’extrémité.`;
      const pr1 = forme === "pos" ? [{ v: p1, fb: "Tu as lu la position d’un locus comme une distance. La distance est l’écart des deux positions.", erreur: "position lue comme une distance" }, { v: p2, fb: "Tu as lu la position d’un locus comme une distance. La distance est l’écart des deux positions.", erreur: "position lue comme une distance" }] : [];
      return {
        enonce: `<p>${intro} On fait le test-cross de l’hybride ${hy}. Le double récessif donne un seul type de gamète.</p><p>${NB2(a, b)}</p>`,
        questions: [
          { type: "nombre", q: `Quel pourcentage de descendants [${a.dom}, ${b.rec}] attend-on ?`, reponse: recV, tol: { abs: 0.01 }, unite: "%", indice: "Les recombinés se partagent le pourcentage d entre deux classes égales.",
            pieges: sansDoublon([{ v: d, fb: "Tu as donné à une classe la part des deux. Les d % de recombinés se partagent entre deux classes.", erreur: "d donné à une classe" }, { v: parV, fb: "C’est une classe parentale, (100 − d)/2. La classe demandée est recombinée.", erreur: "parentaux à 100 − d" }, ...pr1], recV, 0.01) },
          { type: "nombre", q: `Quel pourcentage de descendants [${a.dom}, ${b.dom}] attend-on ?`, reponse: parV, tol: { abs: 0.01 }, unite: "%", indice: "Les parentaux se partagent 100 − d entre deux classes égales.",
            pieges: sansDoublon([{ v: 100 - d, fb: "Tu as donné à une classe la part des deux classes parentales. Chacune en a la moitié.", erreur: "parentaux à 100 − d" }, { v: recV, fb: "C’est une classe recombinée, d/2. La classe demandée est parentale.", erreur: "d donné à une classe" }], parV, 0.01) },
        ],
        correction: [
          { t: `d = ${d} cM : ${d} % de recombinés, soit ${f2(recV)} % pour chacune des deux classes recombinées.` },
          { t: `Les parentales se partagent 100 − ${d} = ${100 - d} % : ${f2(parV)} % chacune.`, r: "Au test-cross, les classes ont les proportions des gamètes." },
        ],
      };
    },
  },

  /* 12 : carte de trois gènes */
  {
    id: "carte-trois-genes",
    titre: "Établir la carte factorielle de trois gènes",
    niveau: 3,
    capacites: CAP(4),
    erreurs: ["la plus petite distance au milieu", "distances non additionnées", "ordre des lettres"],
    gen(h) {
      let a, b;
      do { a = alea(h, 2, 25); b = alea(h, 2, 25); } while (a === b || a + b > 40);
      const noms = h.melange(["A", "B", "C"]), [E1, M0, E2] = noms, s = a + b;
      const paire = (x, y, v) => ({ k: [x, y].sort().join("–"), v });
      const dist = h.melange([paire(E1, M0, a), paire(M0, E2, b), paire(E1, E2, s)]);
      const plusPetite = a < b ? E1 : E2, autre = a < b ? E2 : E1;
      const questions = [
        { type: "qcm", q: "Quel gène est situé entre les deux autres ?", options: h.melange([
          opt(M0, true),
          opt(plusPetite, false, "Tu as mis au milieu un gène de la plus petite distance. Au milieu, c’est le gène dont les deux distances s’additionnent pour donner la troisième.", "la plus petite distance au milieu"),
          opt(autre, false, "Les distances qui touchent ce gène ne s’additionnent pas pour donner la troisième : il est à une extrémité.", "distances non additionnées"),
        ]) },
        { type: "qcm", q: "Laquelle de ces cartes est correcte ?", options: h.melange([
          opt(`${E1} : ${a} cM : ${M0} : ${b} cM : ${E2}`.replace(/ : /g, " — "), true),
          opt(`${M0} — ${a} cM — ${E1} — ${s} cM — ${E2}`, false, `Tu n’as pas additionné les distances. Si ${M0} était à une extrémité, la distance entre ${M0} et ${E2} serait ${a + s} cM, pas ${b}.`, "distances non additionnées"),
          opt(`${E1} — ${s} cM — ${E2} — ${b} cM — ${M0}`, false, `Tu as placé ${E2} au milieu. Les distances ne s’additionneraient plus : ${E1} – ${M0} fait ${a} cM, pas ${s + b}.`, "distances non additionnées"),
        ]) },
      ];
      return {
        enonce: `<p>Trois gènes liés, A, B et C, sont étudiés par des test-cross. Les pourcentages de recombinés donnent les distances : ${dist.map((x) => `${x.k.replace("–", " – ")} = ${x.v} cM`).join(" ; ")}.</p>`,
        questions,
        correction: [
          { t: `${M0} est au milieu : ${a} + ${b} = ${s}, la distance entre ${E1} et ${E2}.` },
          { t: `Carte : ${E1} : ${a} cM : ${M0} : ${b} cM : ${E2}.`, r: "Pour des gènes proches, les distances s’additionnent." },
        ],
      };
    },
  },

  /* 13 : un gène létal et deux gènes indépendants */
  {
    id: "deux-genes-letal",
    titre: "Deux gènes indépendants, dont un létal",
    niveau: 3,
    capacites: CAP(1, 2),
    erreurs: ["oubli du gène létal", "cases barrées sans recompter", "individus létaux comptés"],
    gen(h) {
      const forme = h.pick(["F1F1", "hybride"]), N = 12 * alea(h, 8, 40);
      const R = { dom: "R", rec: "r" }, D = { dom: "D", rec: "d" };
      let E, cl, texte, corr;
      if (forme === "F1F1") {
        const G4 = egaux([["R", "D"], ["r", "d"], ["R", "d"], ["r", "D"]]);
        E = echiquier({ genes: [R, D], cols: G4, rows: G4, mode: "indep", letal: [1] });
        cl = h.pick(E.classes);
        texte = `On croise entre eux des bovins de F₁ sans cornes et à pattes courtes, $R//r\\ D//d$. Les deux gènes sont indépendants ; l’allèle $D$ (pattes courtes) est létal à l’état homozygote $D//D$. On obtient ${f0(N)} descendants nés.`;
        corr = "Quatre gamètes à ¼ de chaque côté : 16 cases, dont 4 sont D//D, barrées. Il reste 12 cases.";
      } else {
        const Gm = egaux([["G", "ℓ"], ["g", "ℓ"]]), Gp = egaux([["G", "L"], ["g", "L"]]);
        E = echiquier({ genes: [{ dom: "G", rec: "g" }, { dom: "L", rec: "ℓ" }], cols: Gp, rows: Gm, mode: "indep", letal: [0] });
        cl = h.pick(E.classes);
        texte = `On croise une souris $G//g\\ \\ell//\\ell$ avec une souris $G//g\\ L//L$. Les deux gènes sont indépendants ; l’allèle $G$ (jaune) est létal à l’état homozygote $G//G$. On obtient ${f0(N)} souriceaux nés.`;
        corr = "Deux gamètes de chaque côté : 4 cases, dont 1 est G//G, barrée. Il reste 3 cases.";
      }
      const rep = N * (cl.n / cl.N), sans = N * (cl.w / E.cells.reduce((s, c) => s + c.w, 0));
      const barSans = N * (cl.n / E.nTot);
      const comptes = N * (E.cells.filter((c) => c.phe === cl.key).length / E.nTot);
      const pieges = sansDoublon([
        { v: sans, fb: "Tu as oublié le gène létal : tu as compté sur toutes les cases. Les cases létales ne donnent aucun individu.", erreur: "oubli du gène létal" },
        { v: barSans, fb: "Tu as barré les cases sans recompter. On compte sur les cases des vivants.", erreur: "cases barrées sans recompter" },
        { v: comptes, fb: "Tu as compté les individus létaux dans la classe. Les cases barrées sont exclues.", erreur: "individus létaux comptés" },
      ], rep, 0.5);
      return {
        enonce: `<p>${texte}</p>`,
        questions: [
          { type: "nombre", q: `Combien d’individus [${cl.key.slice(1, -1)}] attend-on, en moyenne ?`, reponse: rep, tol: { abs: 0.5 }, indice: "Écris l’échiquier, barre les cases létales, puis compte sur les cases restantes.", pieges },
          { type: "qcm", q: "Par quoi diviser pour obtenir la proportion d’une classe après élimination ?", options: h.melange([opt(`le nombre de cases restantes, ${E.N}`, true), opt(`le nombre total de cases, ${E.nTot}`, false, "Tu as barré les cases sans recompter. La proportion se calcule sur les cases des vivants.", "cases barrées sans recompter")]) },
        ],
        correction: [{ t: corr }, { t: `La classe [${cl.key.slice(1, -1)}] occupe ${cl.n} cases sur ${cl.N} : ${f0(rep)} individus.`, r: "On compte sur les cases des vivants." }],
      };
    },
  },

  /* 14 : un exercice type complet */
  {
    id: "interpretation-complete",
    titre: "Un exercice complet : lire, déduire, écrire, conclure",
    niveau: 3,
    capacites: CAP(1, 2, 3, 4),
    erreurs: ["réciter au lieu d’exploiter", "échiquier avant la déduction", "génotype des parents copié sur leur phénotype", "conclusion sans comparer théorie et résultats", "rapport exact exigé", "« quatre classes, donc indépendants »", "F1 homogène lue comme un signe de liaison"],
    gen(h) {
      const S = h.pick(SETS), a = S.g1, b = S.g2, mod = h.pick(["indep", "lie"]), N = 100 * alea(h, 6, 20), d = alea(h, 4, 24);
      let obs, F1, resumé;
      if (mod === "indep") { obs = observe(h, [0.25, 0.25, 0.25, 0.25], N); F1 = `$${texAl(a.dom)}//${texAl(a.rec)}\\ ${texAl(b.dom)}//${texAl(b.rec)}$`; resumé = "quatre classes proches de 25 %"; }
      else { obs = observe(h, [(100 - d) / 200, d / 200, d / 200, (100 - d) / 200], N); F1 = gx([a.dom, b.dom], [a.rec, b.rec]); resumé = "deux grandes classes et deux petites"; }
      const cl = mod === "indep" ? [0, 1, 2, 3] : [0, 3, 1, 2];
      const K = (i) => `[${clefs2([a, b])[i].join(", ")}]`;
      const lignes = [
        { t: `Lire : la F₁ est homogène, ${K(0)} ; ${a.dom} et ${b.dom} sont dominants et les parents sont de lignée pure.`, ok: true },
        { t: "Réciter : « la première loi de Mendel dit que les gènes se transmettent indépendamment… »", fb: "Réciter le cours ne répond pas à la question. Il faut exploiter la F₁ : elle est homogène, donc les parents sont de lignée pure.", erreur: "réciter au lieu d’exploiter" },
        { t: `Écrire : l’échiquier du test-cross, avec quatre gamètes à ¼ de chaque côté.`, fb: "Tu écris l’échiquier avant d’avoir déduit la dominance et la liaison. Les gamètes dépendent de ce que les résultats montrent.", erreur: "échiquier avant la déduction" },
      ];
      const l2 = [
        { t: mod === "indep" ? `Déduire : ${resumé}, les gènes sont indépendants, F₁ est ${par(a)} ${par(b)}.` : `Déduire : ${resumé}, les gènes sont liés avec crossing-over, ${f0(obs[1] + obs[2])} recombinés sur ${f0(N)}.`, ok: true },
        { t: mod === "indep" ? `Déduire : quatre classes, mais les gènes sont liés, car les comptes ne sont pas exactement égaux.` : `Déduire : quatre classes, donc les gènes sont indépendants.`, fb: mod === "indep" ? "Tu as exigé des comptes exactement égaux. Quatre classes proches de 25 % suffisent pour conclure à l’indépendance." : "Tu as cru que quatre classes disent « indépendants ». Des gènes indépendants donnent quatre classes égales.", erreur: mod === "indep" ? "rapport exact exigé" : "« quatre classes, donc indépendants »" },
        { t: `Déduire : les parents sont ${a.dom}//${a.dom} ${b.dom}//${b.dom} et ${a.rec}//${a.rec} ${b.rec}//${b.rec}, mais F₁ est ${a.dom}//${a.dom} ${b.dom}//${b.dom}.`, fb: "Tu as copié le phénotype dans le génotype de F₁. F₁ a reçu un chromosome de chaque lignée pure : elle est hétérozygote.", erreur: "génotype des parents copié sur leur phénotype" },
      ];
      const l3 = [
        { t: mod === "indep" ? "Conclure : les résultats théoriques, ¼ chacun, sont conformes aux résultats expérimentaux : l’hypothèse est vérifiée." : "Conclure : les résultats théoriques, ¼ chacun, ne sont pas conformes aux résultats expérimentaux : l’hypothèse est réfutée.", ok: true },
        { t: "Conclure : l’hypothèse est vérifiée, sans comparer à l’échiquier.", fb: "Tu as conclu sans comparer. La conclusion confronte les proportions théoriques de l’échiquier aux résultats expérimentaux.", erreur: "conclusion sans comparer théorie et résultats" },
        { t: "Conclure : les gènes sont liés, parce que la F₁ est homogène.", fb: "Une F₁ homogène montre la dominance et la pureté des parents, pas la liaison. C’est le test-cross qui tranche.", erreur: "F1 homogène lue comme un signe de liaison" },
      ];
      const Q = (q, L) => ({ type: "qcm", q, options: h.melange(L.map((x) => (x.ok ? { t: x.t, ok: true } : { t: x.t, fb: x.fb, erreur: x.erreur }))) });
      return {
        enonce: `<p><b>Exercice type</b> (ce n’est pas un sujet du bac ; barème indicatif : 0,5 pt par ligne). On croise une lignée pure ${a.d} et ${b.d} avec une lignée pure ${a.r} et ${b.r} : toute la F₁ est ${a.d} et ${b.d}. Les chercheurs supposent que les deux gènes sont indépendants. Un individu de F₁ est ensuite croisé avec un double récessif : il donne ${f0(N)} descendants, ${f0(obs[0])} ${K(0)}, ${f0(obs[3])} ${K(3)}, ${f0(obs[1])} ${K(1)} et ${f0(obs[2])} ${K(2)}.</p><p>${NB2(a, b)}</p>`,
        questions: [Q("Ligne 1 de la copie ?", lignes), Q("Ligne 2 de la copie ?", l2), Q("Dernière ligne de la copie ?", l3)],
        correction: [
          { t: "La copie suit la démarche : lire, déduire, écrire, conclure. Mise en page : Parents · Phénotypes · Génotypes · Gamètes · Échiquier · résultats." },
          { t: mod === "indep" ? `F₁ est ${F1} ; ses gamètes sont à ¼ ; le test-cross donne quatre classes égales.` : `F₁ est ${F1} ; ${f0(obs[1] + obs[2])} recombinés sur ${f0(N)} : environ ${f2((100 * (obs[1] + obs[2])) / N)} cM.`, r: "Les proportions d’un test-cross sont celles des gamètes du parent testé." },
        ],
      };
    },
  },
];
