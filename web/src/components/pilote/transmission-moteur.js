/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Les lois statistiques de la transmission des caractères héréditaires » (SVT, 2ᵉ Bac, filières
 * SVT et PC), séance « Compter les descendants » (format v3), suite de la leçon sur la méiose.
 * Plan d'auteur : docs/refonte/specs/transmission-caracteres.md (le §9, décisions du relecteur, prime
 * sur le reste) ; règles : docs/refonte/07-regles-du-format.md.
 *
 * Onze parties, 59 étapes : ce qu'il faut savoir, l'énigme de Mendel, un caractère (dominance, échiquier),
 * le test-cross, le gène létal, deux gènes sur deux paires, deux gènes sur une paire (parentaux et
 * recombinés), la distance et la carte, le retour à l'énigme, deux exercices du bac, le bilan.
 * Couverte en partie : la capacité 3.2.1 / 2.4.1 (le gène non lié au sexe) ; l'hérédité liée au sexe et
 * la codominance font la leçon suivante. « Deuxième loi » ne s'écrit pas à l'écran (plan §9.11).
 *
 * Les scènes vivent dans transmission-scenes-{a,b,c}.js (`echiquier` est nouvelle ; `meiose` est copiée de
 * la leçon sur la méiose, avec les allèles en paramètre), les outils et TOUS les nombres dans
 * transmission-outils.js. Aucune valeur affichée n'est tapée à la main : elle sort d'un calcul.
 */
import { monterLecon } from "./noyau";
import {
  fr, ent, NB, M, GF, A, CAS, LAB, REF, MENDEL, M_F2, M_RAPPORT, M_PART_RIDEES, M_C_TOT, M_C_RAPPORT, M_DI_TOT, M_DI_ATTENDU,
  PC24, PC24_TC, PC24_N, PC24_PART, PC24_RAPPORT, SV24R, SV24R_REC, SV24R_PAR, SV22, SV22_D, SV22_PAR, SV22_REC, EX_TC, EX_N, EX_REC, EX_D, EX_LEURRE_PAR, EX_LEURRE_UNE,
  D12, D12_CLASSE, D12_PAR, TROIS, Q1, Q1_D, Q1_MOY, Q3, Q3_N, Q3_D, Q3_PAR, Q3_UNE, TC1, pct, pct1, fLab, gam, typesMeiose, outilsTr,
} from "./transmission-outils.js";
import { scenesA } from "./transmission-scenes-a";
import { scenesB } from "./transmission-scenes-b";
import { scenesC, CARTE_MAX } from "./transmission-scenes-c";

const pc = (x, d = 1) => `${fr(x, d)}${NB}%`;

export function monterPilote(root) {
return monterLecon(root, ctx => {
const { scenes, S } = ctx;
const $ = ctx.$;
const O = outilsTr(ctx);
const { ty } = O;

/* ---------- ce que le script calcule ---------- */
const lis = MENDEL.forme.lisses, rid = MENDEL.forme.ridees, jau = MENDEL.couleur.jaunes, ver = MENDEL.couleur.vertes;
const ATT_LIS = (M_F2 * 3) / 4, ATT_RID = M_F2 / 4;                       // 5 493 et 1 831 : l'attendu pour 7 324 graines
const DI = MENDEL.di, DA = M_DI_ATTENDU;
const OBS_DI = { "[L, J]": `${ent(DI.LJ)} (attendu ${fr(DA.LJ, 2)})`, "[L, j]": `${ent(DI.Lj)} (attendu ${fr(DA.Lj, 2)})`, "[ℓ, J]": `${ent(DI.lJ)} (attendu ${fr(DA.lJ, 2)})`, "[ℓ, j]": `${ent(DI.lj)} (attendu ${fr(DA.lj, 2)})` };
const PART_LETAL = CAS.letal.classes.find((c) => c.key === "[G]");        // 2 cases sur 3
const LETAL_VIV = PART_LETAL.n / PART_LETAL.N;                              // 2/3
const CL4 = CAS.f2Indep.classes;                                            // 9, 3, 3, 1 cases sur 16
const CL_RIDVERT = CL4.find((c) => c.key === "[ℓ, j]");
const BOV = CAS.bovins.classes;                                             // sur 12 cases
// les leurres du dernier échiquier : sans le gène létal (les cases sur 16 de la F2 de deux gènes), puis cases barrées sans recompter (sur 16)
const BOV_TXT = (ordre) => ordre.map((k) => { const c = BOV.find((x) => x.key === k); return `${c.n}/${c.N} ${k}`; }).join(" ; ");
const SANS_LETAL = CAS.f2Indep.classes.map((c) => c.n);                   // 9, 3, 3, 1 : l'ordre dominant d'abord, comme [R, D], [R, d], [r, D], [r, d]
const ORDRE_BV = ["[R, D]", "[R, d]", "[r, D]", "[r, d]"];
const TXT_BV_BON = ORDRE_BV.map((k) => { const c = BOV.find((x) => x.key === k); return `${c.n}/${c.N} ${k}`; }).join(" ; ");
const TXT_BV_16 = ORDRE_BV.map((k, i) => `${SANS_LETAL[i]}/16 ${k}`).join(" ; ");
const TXT_BV_SANS = ORDRE_BV.map((k) => { const c = BOV.find((x) => x.key === k); return `${c.n}/16 ${k}`; }).join(" ; ");
const SCP = (x) => pc(x, 2);

// le bilan : les trois pièges, affichés par la scène `quiz`
const QUIZ = [
  { big: `${Q1.a} %, ${Q1.b} %, ${Q1.c} %, ${Q1.d} %`, sub: "test-cross : quatre classes, indépendants ?", r1: "quatre classes inégales : liés", r2: `${Q1.c} + ${Q1.d} = ${Q1_D} % : ${Q1_D} cM` },
  { big: "⅔ [A] et ⅓ [a]", sub: "[A] × [A] : les [A] sont… ?", r1: "2 pour 1 : un gène létal", r2: "tous A//a, jamais A//A" },
  { big: `${Q3.p1} · ${Q3.p2} · ${Q3.r1} · ${Q3.r2}`, sub: "test-cross : la distance ?", r1: `${Q3.r1} + ${Q3.r2} sur ${ent(Q3_N)} (le total)`, r2: `${Q3.r1 + Q3.r2} ÷ ${ent(Q3_N)} = ${Q3_D} cM` },
];
// ce que l'élève a compris, cinq lignes (scène `end`)
const FIN = [
  ["Un allèle par gamète, au hasard : ½ et ½.", "Deux conditions à la fois : on multiplie."],
  ["F1 homogène : la dominance, des lignées pures.", "Le test-cross montre les gamètes du parent testé."],
  ["2 pour 1 : un gène létal.", "On compte sur les cases des vivants."],
  ["Quatre classes égales : gènes indépendants.", "Classes très inégales : gènes liés."],
  ["Les recombinés, en %, donnent la distance en cM.", "Trois distances font une carte factorielle."],
];

scenesA(ctx, O);
scenesB(ctx, O);
scenesC(ctx, O, QUIZ, FIN);

/* ---------- les états de scène ---------- */
const EC = (o) => ({ crx: 0, v1: 0, v2: 0, v3: 0, fcnt: 0, grille: 0, fill: 99, phe: 0, cls: "", aire: 0, obs: 0, tot: 0, leg: 0, hd: 1, sel: -1, ...o });
const CX = (o) => EC({ crx: 1, v1: 1, ...o });
const GR = (cas, o) => EC({ grille: 1, G: cas, ...o });
const MEI = (lab, o) => ({ ph: 0, plq: 0, tet: 0, al: 0, or2: 0, gam: 0, co: 0, chi: 0, lab, gm: 1, ...o });
const D = (cas, extra) => ({ ...cas, ...extra });
const G2 = (cas) => D(cas, { sub: "F1 × F1 : L//ℓ × L//ℓ" });

// les schémas de croisement (scène `echiquier`, mode `crx`)
const CR_NOT = { p: ["[G]"], pn: ["un individu G//g"], g: ["G//g"], gen: "", res: [{ t: "" }] };
const CR_PUR = { p: ["[G]"], pn: ["une lignée pure"], g: ["G//G"], gen: "", res: [{ t: "" }] };
const CR_P = { p: ["[L]", "[ℓ]"], pn: ["graine lisse", "graine ridée"], ic: ["lisse", "ridee"], g: ["L//L", "ℓ//ℓ"], gm: ["gamètes : L/", "gamètes : ℓ/"], gen: "F1", res: [{ t: "toutes lisses", ic: "lisse" }] };
const CR_F2 = { p: ["[L]"], pn: ["plante F1, autofécondée"], ic: ["lisse"], g: ["L//ℓ"], gm: ["gamètes : ½ L/ et ½ ℓ/"], gen: "F2", res: [{ t: `${ent(lis)} lisses`, ic: "lisse", w: lis }, { t: `${ent(rid)} ridées`, ic: "ridee", w: rid }] };
const CR_COUL = { p: ["[J]"], pn: ["plante F1, autofécondée"], g: ["J//j"], gen: "F2", res: [{ t: `${ent(jau)} jaunes`, w: jau }, { t: `${ent(ver)} vertes`, w: ver }], note: "graines jaunes : J ; graines vertes : j" };
const CR_HET = { p: ["[A]", "[A]"], pn: ["parent", "parent"], g: ["?", "?"], gen: "F1", res: [{ t: "des [A]", w: 3 }, { t: "des [a]", w: 1 }], note: "une F1 hétérogène : deux phénotypes" };
const CR_TEST = { p: ["[L]", "?"], pn: ["graine lisse à tester", "partenaire à choisir"], ic: ["lisse", null], g: ["L//L ou L//ℓ", "?"], gen: "", res: [{ t: "" }] };
const CR_J = { p: ["[G]", "[G]"], pn: ["souris jaune", "souris jaune"], g: ["?", "?"], gen: "F1", res: [{ t: `${PC24.jaunes} jaunes`, w: PC24.jaunes }, { t: `${PC24.grises} grises`, w: PC24.grises }], note: "symboles du sujet : G (jaune), g (gris)" };
const CR_DI = { p: ["[L, J]", "[ℓ, j]"], pn: ["lignée pure", "lignée pure"], g: ["", ""], gen: "F1", res: [{ t: "toutes [L, J]" }], note: "puis un test-cross de F1 : quatre classes proches de 25 %" };

const BET = (t) => ({ opts: t.map(([x, fb]) => ({ t: x, fb })) });
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF = (t) => ({ opts: t.map(([x, ok, fb, indice]) => (ok ? { t: x, ok: true, fb } : { t: x, fb, indice })) });
const LB = (s) => s.replace(/ ([?:;!»])/g, " $1");           // un libellé de pari : l'insécable fine, posée à la main
const NOTE = "Pari noté : la suite de la leçon va le trancher, et tu le verras dans la scène.";
const sup = (b, n) => `${b}<sup>${n}</sup>`;

const STEPS = [
/* ===== 0. ce qu'il faut savoir ===== */
{ cle: "v-savoir", beat: 0, scene: "meiose", set: MEI(LAB.G, { ph: 3, al: 1 }), ctl: "saut", sujet: "les gamètes d’un hétérozygote",
  text: ["Avant l’énigme, un test, repris de la leçon sur la méiose. Réussi du premier coup, il te permet de passer directement à l’énigme.", { t: "Un individu G//g, hétérozygote, produit des gamètes…", fort: true }],
  verifie: VF([
    ["½ G et ½ g", true, "Oui : un gamète reçoit un chromosome de chaque paire, donc G ou g, à égalité."],
    ["¼ G, ¼ g et ½ Gg", false, "Tu as cru qu’un gamète peut porter les deux allèles d’un gène. Un gamète a un seul chromosome de chaque paire : G ou g.", "Un gamète a-t-il un chromosome de chaque paire, ou les deux ?"],
    ["tous G, puisque G domine", false, "Tu as appliqué la dominance à la méiose. La dominance concerne l’individu ; la méiose donne ½ G et ½ g.", "La méiose voit-elle quel allèle est dominant ?"]]) },
{ cle: "sav-notation", beat: 0, scene: "echiquier", set: CX({ cr: CR_NOT, v2: 1 }),
  text: ["Le [[genotype|génotype]] écrit les deux allèles d’un gène, un par chromosome de la paire, séparés par deux traits : G//g.",
    "Le [[phenotype|phénotype]], ce qu’on observe, s’écrit entre crochets : [G]. L’allèle [[dominant]] prend une majuscule, le [[recessif|récessif]] une minuscule.",
    "Au bac, l’énoncé donne les symboles : « NB : utilisez les symboles… »."] },
{ cle: "sav-lignee", beat: 0, scene: "echiquier", set: CX({ cr: CR_PUR, v2: 1 }), sujet: "les gamètes d’une lignée pure",
  text: [{ t: "Une [[lignee-pure|lignée pure]], G//G, produit des gamètes…", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["tous G", true, "Oui : un [[homozygote]] n’a qu’un allèle à donner, G."],
    ["½ G et ½ g", false, "Tu as cru que tout individu donne deux types de gamètes. Un homozygote n’a qu’un allèle à donner.", "G//G porte-t-il un allèle g à donner ?"],
    ["¾ G et ¼ g", false, "Tu as pris un rapport de descendants pour un rapport de gamètes. Les ¾ et ¼ viendront d’un croisement, plus loin.", "Un gamète d’un individu G//G peut-il porter g ?"]]) } },

/* ===== 1. l'énigme ===== */
{ cle: "mendel", beat: 1, scene: "echiquier", tag: "1865 · Mendel", set: CX({ cr: CR_P, v3: 1, fcnt: 0 }),
  text: ["De 1856 à 1863, Gregor Mendel cultive des pois ; il présente ses résultats à Brno en 1865.",
    "Il croise une lignée pure à graines lisses et une lignée pure à graines ridées.", { t: "Les graines F1 seront…", fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { fcnt: 1 }, d: 1100 }], opts: [
    { t: "toutes lisses", fb: "Tu avais vu juste : toutes les graines F1 sont lisses. Le caractère ridé n’apparaît pas." },
    { t: "toutes d’une forme intermédiaire, un peu ridées", fb: "Tu as supposé que deux allèles différents donnent un intermédiaire. Il faut le lire dans les résultats, pas le supposer : ici toutes les F1 sont lisses." },
    { t: "moitié lisses, moitié ridées", fb: "Les F1 sont toutes pareilles : toutes lisses. Aucune graine ridée n’apparaît." }] } },
{ cle: "f2", beat: 1, scene: "echiquier", set: CX({ cr: CR_F2, v3: 1, fcnt: 0 }),
  text: ["Le ridé a-t-il disparu ? Les plantes F1 s’autofécondent : chacune se féconde elle-même.", { t: "Parmi les graines F2, les ridées seront…", fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { fcnt: 1 }, d: 1100 }], opts: [
    { t: "absentes : le ridé a disparu en F1", fb: `Tu as cru qu’une plante lisse ne peut pas donner de graine ridée. Elle le peut : ${ent(rid)} ridées sur ${ent(M_F2)} graines F2.` },
    { t: "environ 1 sur 4", fb: `Tu avais vu juste : ${ent(rid)} ridées sur ${ent(M_F2)} graines, soit ${pc(M_PART_RIDEES * 100)}, environ un quart.` },
    { t: "environ 1 sur 2", fb: `Il y a bien des ridées, mais pas la moitié : ${ent(rid)} sur ${ent(M_F2)}, soit ${pc(M_PART_RIDEES * 100)}.` }] } },
{ cle: "ratio", beat: 1, scene: "echiquier", set: CX({ cr: CR_F2, v3: 1, fcnt: 1 }), sujet: "lire un rapport 3 pour 1",
  text: [`${ent(lis)} lisses pour ${ent(rid)} ridées.`, { t: "La part de graines ridées est environ…", fort: true }],
  pari: { label: "Réponds", apres: { html: `${ent(lis)} ÷ ${ent(rid)} ≈ ${fr(M_RAPPORT, 2)}, et ${ent(rid)} ÷ ${ent(M_F2)} ≈ ${pc(M_PART_RIDEES * 100)} : tout près d’un quart.` }, ...VF([
    ["1 graine sur 4", true, "Oui : 3 lisses pour 1 ridée, c’est 1 ridée sur 4 graines."],
    ["1 graine sur 3", false, "Tu as lu « 3 pour 1 » comme un tiers. Sur 4 graines, 3 sont lisses et 1 est ridée.", "Sur 4 graines, combien de ridées si le rapport est 3 pour 1 ?"],
    ["1 graine sur 2", false, "Il y a trois fois plus de lisses que de ridées, pas autant. Sur 4 graines, 3 lisses et 1 ridée.", "Sur 4 graines, combien de ridées si le rapport est 3 pour 1 ?"]]) } },
{ cle: "deux-questions", beat: 1, scene: "echiquier", set: CX({ cr: CR_COUL, v3: 1, fcnt: 1 }),
  text: [`La couleur des graines donne le même rapport : ${ent(jau)} jaunes pour ${ent(ver)} vertes, soit ${fr(M_C_RAPPORT, 2)} pour 1.`,
    { t: "Pourquoi le ridé revient-il ? Pourquoi un quart ? Et que donnent deux caractères suivis ensemble ?", fort: true }, "La leçon répond aux trois."] },

/* ===== 2. un caractère ===== */
{ cle: "dominance", beat: 2, scene: "echiquier", set: CX({ cr: CR_P, v2: 0, v3: 1, fcnt: 1 }), sujet: "dominance et génotype de F1",
  text: ["En F1, seul le caractère d’un parent paraît : lisse. Son allèle est dominant, noté L ; l’allèle ridé, masqué, est récessif, noté ℓ.", { t: "Quel est le génotype d’une graine F1 ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { v2: 1 }, d: 700 }], ...VF([
    ["L//ℓ", true, "Oui : chaque F1 a reçu L du parent lisse et ℓ du parent ridé."],
    ["L//L", false, "Tu as repris le phénotype comme génotype. Chaque graine F1 a reçu ℓ du parent ridé : elle est L//ℓ.", "De quel parent la graine F1 a-t-elle reçu un allèle ℓ ?"],
    ["L", false, "Tu as oublié que la cellule a deux exemplaires de chaque chromosome. Deux homologues, deux allèles : L//ℓ.", "Une cellule a-t-elle un seul ou deux chromosomes de chaque paire ?"]]) } },
{ cle: "uniformite", beat: 2, scene: "echiquier", set: CX({ cr: CR_HET, v3: 1, fcnt: 1 }), sujet: "la première loi, lue à l’envers",
  text: ["Deux lignées pures donnent une F1 homogène : c’est la [[premiere-loi|première loi de Mendel]].", "Au bac, on s’en sert à l’envers : une F1 homogène montre que les parents sont de race pure.", { t: "Un croisement donne une F1 hétérogène. On peut conclure que…", fort: true }],
  verifie: VF([
    ["au moins un parent est hétérozygote", true, "Oui : deux lignées pures ne donneraient qu’un seul type de descendant, une F1 homogène."],
    ["les deux parents sont de lignée pure", false, "Tu as lu la première loi dans le mauvais sens. Deux lignées pures donnent une F1 homogène : une F1 hétérogène l’exclut.", "Deux lignées pures donnent-elles un ou plusieurs types de descendants ?"],
    ["les deux parents sont homozygotes récessifs", false, "Deux homozygotes récessifs sont de lignée pure : leur F1 serait homogène. Il faut au moins un parent hétérozygote.", "Deux parents homozygotes donnent-ils une F1 homogène ?"]]) },
{ cle: "echiquier", beat: 2, scene: "echiquier", set: GR(G2(CAS.f2), { fill: -1 }), ctl: "case", need: () => S.cases.size >= 4, needLabel: "Remplis les quatre cases", sujet: "l’échiquier de croisement",
  text: ["F1 × F1 : chaque parent donne ½ L/ et ½ ℓ/. L’[[echiquier|échiquier de croisement]] réunit chaque gamète d’un parent avec chaque gamète de l’autre.", { t: "Remplis chaque case.", fort: true }] },
{ cle: "rapports", beat: 2, scene: "echiquier", set: GR(G2(CAS.f2), { fill: 4, phe: 0 }), sujet: "les phénotypes de la F2",
  text: [{ t: "Les phénotypes de la F2 ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { phe: 1 }, d: 800 }], apres: { html: `Pour ${ent(M_F2)} graines, on attend ${ent(ATT_LIS)} lisses et ${ent(ATT_RID)} ridées. Mendel en a compté ${ent(lis)} et ${ent(rid)}.` }, ...VF([
    ["¾ [L] et ¼ [ℓ]", true, "Oui : trois cases sur quatre ont au moins un L, donc sont lisses. L//ℓ est lisse, comme L//L."],
    ["¼ L//L, ½ L//ℓ et ¼ ℓ//ℓ", false, "Tu as pris le rapport des génotypes pour celui des phénotypes. L//ℓ est lisse, comme L//L : trois cases lisses sur quatre.", "L//ℓ a-t-elle le même aspect que L//L ?"],
    ["½ [L] et ½ [ℓ]", false, "C’est le rapport d’un test-cross, que tu verras juste après. Ici les deux parents sont hybrides : ¾ et ¼.", "Les deux parents donnent-ils ici tous les deux ℓ/ et L/ ?"]]) } },
{ cle: "lisses-purs", beat: 2, scene: "echiquier", set: GR(G2(CAS.f2), { fill: 4, phe: 1, cls: "[L]" }), sujet: "les génotypes parmi les lisses",
  text: ["Les trois cases lisses sont allumées.", { t: "Parmi les graines lisses de F2, quelle part est de lignée pure, L//L ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["1 sur 3", true, "Oui : trois cases lisses, dont une seule L//L. Les deux autres sont L//ℓ."],
    ["toutes", false, "Tu as repris le phénotype comme génotype. Deux des trois cases lisses sont L//ℓ.", "Combien de cases lisses portent ℓ ?"],
    ["1 sur 4", false, "Tu as compté sur les 4 cases. La question ne porte que sur les graines lisses : 3 cases.", "Sur combien de cases porte la question ?"]]) } },
{ cle: "disjonction", beat: 2, scene: "meiose", set: MEI(LAB.L, { ph: 3, al: 1, plq: 1, gm: 0 }), seq: [{ p: { ph: 8 }, d: 4200, w: 400 }, { p: { gam: 1 }, d: 600 }],
  text: ["À la méiose, les deux allèles d’un gène se séparent : c’est la [[disjonction|disjonction des allèles]].", { t: "Un allèle par gamète, au hasard : moitié L, moitié ℓ.", fort: true, a: 1 }] },
{ cle: "produit", beat: 2, scene: "echiquier", set: GR(G2(CAS.f2), { fill: 0 }), sujet: "multiplier pour « et »",
  text: [{ t: "Probabilité qu’une graine F2 soit ℓ//ℓ ?", fort: true }],
  verifie: { reveal: [{ p: { fill: 4, cls: "[ℓ]", phe: 1 }, d: 900 }], ...VF([
    ["½ × ½ = ¼", true, "Oui : il faut ℓ venu du pollen et ℓ venu de l’ovule, deux conditions à la fois."],
    ["½", false, "Tu n’as regardé qu’un parent. Les deux doivent donner ℓ : la probabilité est ½ × ½.", "Combien de parents doivent donner ℓ ?"],
    ["½ + ½ = 1", false, "Tu as additionné pour « et ». Deux conditions à la fois se multiplient : ½ × ½.", "Une probabilité peut-elle atteindre 1 pour un seul génotype sur quatre ?"]]) } },

/* ===== 3. le test-cross ===== */
{ cle: "testeur", beat: 3, scene: "echiquier", set: CX({ cr: CR_TEST, v2: 1 }), sujet: "le partenaire du test-cross",
  text: ["Une graine lisse est L//L ou L//ℓ. Pour connaître son génotype, on la croise avec une autre plante.", { t: "Avec quelle plante la croiser ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["une plante ridée, ℓ//ℓ", true, "Oui : ℓ//ℓ ne masque aucun allèle de la plante testée."],
    ["une lignée pure lisse, L//L", false, "Tous les descendants seraient lisses, quel que soit le génotype testé. Le partenaire ne doit rien masquer.", "Avec L//L, un descendant peut-il être ridé ?"],
    ["une autre plante lisse", false, "Elle peut être hybride : ses propres gamètes brouilleraient la lecture. Il faut un partenaire dont les gamètes sont connus.", "Le génotype d’une plante lisse est-il connu ?"]]) } },
{ cle: "deux-hypotheses", beat: 3, scene: "echiquier", set: GR([D(CAS.tcLL, { legende: "si elle est L//L" }), D(CAS.tcL, { legende: "si elle est L//ℓ" })], { fill: 0 }), sujet: "le test-cross d’un hybride",
  text: ["Le [[test-cross|test-cross]], ou croisement-test, croise l’individu testé avec un homozygote récessif, ℓ//ℓ.", { t: "Si la plante testée est L//ℓ, ses descendants seront…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { fill: 4, phe: 1 }, d: 1200 }], ...VF([
    ["½ [L] et ½ [ℓ]", true, "Oui : la plante donne ½ L/ et ½ ℓ/, le testeur toujours ℓ/."],
    ["¾ [L] et ¼ [ℓ]", false, "Tu as appliqué le rapport de la F2 à tout croisement. Ici le testeur ne donne que ℓ/ : ½ et ½.", "Combien de types de gamètes le testeur ℓ//ℓ donne-t-il ?"],
    ["tous [L]", false, "C’est le résultat si la plante testée est L//L. Si elle est L//ℓ, la moitié des descendants reçoit ℓ/ des deux côtés.", "Une plante L//ℓ donne-t-elle aussi des gamètes ℓ ?"]]) } },
{ cle: "lecture-tc", beat: 3, scene: "echiquier", set: GR([D(CAS.tcLL, { legende: "si elle est L//L" }), D(CAS.tcL, { legende: "si elle est L//ℓ" })], { fill: 4, phe: 1 }),
  text: [{ t: "Le testeur ne donne que ℓ/ : chaque descendant montre le gamète venu du parent testé.", fort: true }, "Les proportions d’un test-cross sont donc celles des gamètes du parent testé. Cette idée sert jusqu’au bac."] },
{ cle: "v-testcross", beat: 3, scene: "echiquier", set: GR(D(CAS.tcL, { sub: "test-cross : observé", obsC: { "[L]": `${TC1.lisses}`, "[ℓ]": `${TC1.ridees}` } }), { fill: 4, phe: 1, obs: 1 }), sujet: "conclure d’un test-cross réel",
  text: [`Test-cross : ${TC1.lisses} graines lisses et ${TC1.ridees} ridées.`, { t: "La plante testée est…", fort: true }],
  verifie: VF([
    ["L//ℓ", true, "Oui : une seule graine ridée suffit à exclure L//L, car elle a reçu ℓ du parent testé."],
    ["L//L", false, "Une seule graine ridée exclut L//L : elle a reçu ℓ du parent testé.", "Une plante L//L peut-elle donner un descendant ridé ?"],
    ["impossible à dire, 52 n’est pas 50", false, `Tu as exigé un rapport exact. Un compte réel s’écarte un peu de l’attendu : le corrigé de PC 2024 R juge ${fr(PC24_TC[1] / PC24_TC.reduce((a, b) => a + b, 0) * 100, 2)} % « proches de 25 % ».`, "Un compte réel tombe-t-il exactement sur l’attendu ?"]]) },

/* ===== 4. le gène létal ===== */
{ cle: "jaunes", beat: 4, scene: "echiquier", set: CX({ cr: CR_J, v3: 1, fcnt: 1 }), sujet: "dominance et parents hybrides",
  text: [`${REF.pc24r}, croisement 1 (la couleur seule) : des souris jaunes croisées entre elles donnent ${PC24.jaunes} jaunes et ${PC24.grises} grises.`, "Symboles du sujet : G (jaune), g (gris).", { t: "Que disent ces résultats ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["le jaune domine ; les parents sont G//g", true, "Oui : les petits gris montrent que les deux parents cachaient g. Ils sont hybrides."],
    ["le gris domine, car il apparaît en F1", false, "Tu as pris l’apparition du gris pour de la dominance. Un caractère absent chez les deux parents puis présent chez des petits était masqué : il est récessif.", "Le gris est-il visible chez les parents ?"],
    ["le gris est une mutation des petits", false, "Tu as supposé que deux parents jaunes ne peuvent pas cacher g. Ils sont hybrides, G//g, et g reparaît chez des petits.", "Un allèle récessif peut-il rester caché chez un parent ?"]]) } },
{ cle: "deux-pour-un", beat: 4, scene: "echiquier", set: CX({ cr: CR_J, v3: 1, fcnt: 1 }), sujet: "le rapport 2 pour 1",
  text: [`Deux parents G//g donneraient 3 jaunes pour 1 grise. On compte ${PC24.jaunes} pour ${PC24.grises}, soit ${fr(PC24_RAPPORT, 1)} pour 1.`, { t: "Pourquoi ce rapport ?", fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { crx: 0, grille: 1, G: D(CAS.letal, { sub: "F1 × F1 : G//g × G//g ; G jaune, g gris" }), fill: 4, phe: 1 }, d: 1800 }], opts: [
    { t: "une erreur d’expérience : trop peu de souris", fb: "Tu as cru à une erreur d’expérience. Un rapport 2 pour 1 est la signature d’un [[gene-letal|gène létal]] : ici G//G ne naît pas." },
    { t: "les embryons G//G meurent avant la naissance", fb: "Tu avais vu juste : la case G//G est barrée. Restent deux cases [G] pour une case [g], donc 2 pour 1." },
    { t: "il naît plus de souris grises que prévu", fb: "Les grises ne sont pas en excès : ce sont des jaunes qui manquent. La case G//G est barrée, il reste 2 [G] pour 1 [g]." }] } },
{ cle: "letal-calc", beat: 4, scene: "echiquier", set: GR(D(CAS.letal, { sub: "F1 × F1 : G//g × G//g ; G jaune, g gris" }), { fill: 4, phe: 1 }), sujet: "compter sur les cases des vivants",
  text: ["La case G//G est barrée : ces embryons ne naissent pas.", { t: "Parmi les souriceaux nés, quelle part est jaune ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { tot: 1 }, d: 400 }], apres: { html: `${PC24.jaunes} ÷ ${PC24_N} ≈ ${pc(PC24_PART * 100)}, tout près de ⅔ (${pc(LETAL_VIV * 100, 1)}).` }, ...VF([
    ["2/3", true, "Oui : trois cases de vivants, dont deux [G]."],
    ["2/4, soit ½", false, "Tu as compté sur 4 cases alors qu’une est barrée. On compte sur les cases des vivants : 3.", "Combien de cases restent quand on retire la case barrée ?"],
    ["¾", false, "Tu as oublié la case barrée. Elle ne donne aucun souriceau : restent 3 cases, dont 2 [G].", "La case G//G donne-t-elle des souriceaux ?"]]) } },
{ cle: "v-letal", beat: 4, scene: "echiquier", set: GR(D(CAS.letal, { sub: "F1 × F1 : G//g × G//g ; G jaune, g gris" }), { fill: 4, phe: 1, tot: 1 }), sujet: "les génotypes des vivants avec un gène létal",
  text: [{ t: "Dans cet élevage, les souris jaunes sont…", fort: true }],
  verifie: { apres: { html: "D’où : on n’obtient jamais de lignée pure jaune." }, ...VF([
    ["toutes G//g", true, "Oui : les G//G ne naissent pas, toutes les jaunes sont hybrides."],
    ["G//G ou G//g, comme pour un gène ordinaire", false, "Ici les G//G ne naissent pas. Seules les G//g sont jaunes parmi les vivants.", "Les G//G naissent-ils ?"],
    ["toutes G//G", false, "Ce sont justement elles qui meurent. Les jaunes vivantes sont G//g.", "Quel génotype a la case barrée ?"]]) } },

/* ===== 5. deux gènes, deux paires ===== */
{ cle: "deux-genes", beat: 5, scene: "meiose", set: MEI(LAB.deux, { ph: 1, al: 1, gm: 0 }), sujet: "écrire un génotype à deux gènes",
  text: ["Mendel suit aussi deux caractères à la fois : une lignée pure lisse et jaune croisée avec une lignée pure ridée et verte. Sa F1 est toute lisse et jaune.", "Ici, les deux gènes sont sur deux paires différentes : L ℓ sur la grande, J j sur la petite.", { t: "Comment s’écrit le génotype de F1 ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["L//ℓ J//j", true, "Oui : deux paires, donc deux génotypes côte à côte."],
    [GF(["L", "J"], ["ℓ", "j"]), false, "Tu as écrit deux gènes sur un même chromosome. Ici il y a deux paires : deux génotypes côte à côte, L//ℓ J//j.", "Les deux gènes sont-ils sur le même chromosome ?"],
    ["L//J ℓ//j", false, "Tu as mis face à face deux gènes différents. Les deux traits séparent les deux allèles d’un même gène.", "Que sépare le double trait : deux gènes, ou deux allèles d’un gène ?"]]) } },
{ cle: "orientation", beat: 5, scene: "meiose", set: MEI(LAB.deux, { ph: 3, al: 1, plq: 1, gm: 0 }), ctl: "orient", need: () => S.mTypes.size >= 4, needLabel: "Retourne la petite paire", sujet: "l’orientation des paires",
  text: ["En métaphase I, la petite paire peut s’orienter de deux façons.", { t: "Retourne-la, puis regarde les gamètes.", fort: true }, "C’est le [[brassage-inter|brassage interchromosomique]] de la leçon sur la méiose."] },
{ cle: "tc-indep", beat: 5, scene: "echiquier", set: GR(CAS.tcIndep, { fill: 0 }), sujet: "le test-cross de deux gènes indépendants",
  text: ["On fait le test-cross de F1 avec une plante ℓ//ℓ j//j. F1 donne quatre types de gamètes à égalité, le testeur un seul : ℓ/ j/.", { t: "Combien de classes de descendants, et dans quelles proportions ?", fort: true }],
  pari: { label: LB("Ton pari"), reveal: [{ p: { fill: 4, phe: 1 }, d: 1200 }], apres: { html: "C’est la [[troisieme-loi|troisième loi de Mendel]], la ségrégation indépendante : quatre classes égales sont « compatibles avec la 3ème loi de Mendel » (PC 2024 R, question 4)." }, opts: [
    { t: "4 classes, ¼ chacune", fb: "Tu avais vu juste : quatre gamètes à ¼ pour F1, un seul pour le testeur, donc quatre classes à ¼." },
    { t: "4 classes : 9/16, 3/16, 3/16, 1/16", fb: "Tu as appliqué à un test-cross le rapport d’une F2. Les classes d’un test-cross suivent les gamètes de F1 : ¼ chacune." },
    { t: "2 classes, ½ chacune", fb: "Ce serait vrai si F1 ne donnait que L/ J/ et ℓ/ j/. L’orientation des paires en donne quatre, donc quatre classes." }] } },
{ cle: "f2-16", beat: 5, scene: "echiquier", set: GR(D(CAS.f2Indep, { sub: "F1 × F1 : L//ℓ J//j × L//ℓ J//j" }), { fill: 16, phe: 1 }), ctl: "classe", need: () => S.classes.size >= 4, needLabel: "Touche les quatre phénotypes", sujet: "le compte des 16 cases",
  text: ["F1 × F1 : chaque parent donne les quatre gamètes, donc 16 cases.", { t: "Touche un phénotype : ses cases s’allument.", fort: true }] },
{ cle: "produit-16", beat: 5, scene: "echiquier", set: GR(D(CAS.f2Indep, { sub: "F1 × F1 : L//ℓ J//j × L//ℓ J//j" }), { fill: 16, phe: 1 }), sujet: "multiplier les deux caractères",
  text: ["Sans compter les cases.", { t: "La part de graines ridées et vertes, [ℓ, j] ?", fort: true }],
  pari: { label: "Réponds", apres: { tex: [["\\dfrac34\\times\\dfrac34=\\dfrac{9}{16}\\quad\\dfrac34\\times\\dfrac14=\\dfrac{3}{16}", "¾ × ¾ = 9/16 ; ¾ × ¼ = 3/16"], ["\\dfrac14\\times\\dfrac34=\\dfrac{3}{16}\\quad\\dfrac14\\times\\dfrac14=\\dfrac{1}{16}", "¼ × ¾ = 3/16 ; ¼ × ¼ = 1/16"]] }, ...VF([
    [`¼ × ¼ = ${fLab(CL_RIDVERT.n, CL_RIDVERT.N)}`, true, "Oui : ridée et verte à la fois, deux conditions, donc on multiplie."],
    ["¼ + ¼ = ½", false, "Tu as additionné pour « et ». Ridée et verte à la fois : on multiplie, ¼ × ¼.", "Faut-il les deux conditions à la fois, ou l’une des deux ?"],
    ["¼", false, "Tu n’as suivi qu’un caractère, ou repris le test-cross. Deux conditions à la fois : ¼ × ¼.", "La question porte-t-elle sur un seul caractère ?"]]) } },
{ cle: "demarche", beat: 5, scene: "echiquier", set: CX({ cr: CR_DI, v3: 1, fcnt: 1 }), ctl: "lignes", sujet: "la démarche du bac",
  text: ["Au bac, la copie suit quatre gestes : lire, déduire, écrire, conclure.", "Voici les deux premières lignes pour Mendel. Supposons qu’un test-cross de F1 donne quatre classes proches de 25 %."],
  deriv: [
    { tex: "", alt: "Lire : la F1 est homogène, toute [L, J].", h: "<b>Lire</b> : la F1 est homogène, toute [L, J].", r: "On lit les résultats avant de rien déduire." },
    { tex: "", alt: "Déduire : lisse et jaune dominent, les parents sont de lignée pure.", h: "<b>Déduire</b> : lisse et jaune dominent ; les parents sont de lignée pure (1ère loi de Mendel).", r: "F1 homogène." }],
  pari: { label: LB("Ligne 3 ?"), apres: { html: `<b>4. Écrire</b> : les génotypes, les gamètes (¼ L/ J/, ¼ L/ j/, ¼ ℓ/ J/, ¼ ℓ/ j/), puis l’échiquier. <b>5. Conclure</b> : « les résultats théoriques sont conformes aux résultats expérimentaux », la phrase du corrigé de PC 2024 R. <b>Lire, déduire, écrire, conclure.</b>` }, ...VF([
    ["Déduire : quatre classes égales, gènes indépendants", true, "Oui : quatre classes égales au test-cross montrent que les gènes sont indépendants."],
    ["Génotype de F1 : L//L J//J, comme son phénotype", false, "Tu as copié le phénotype dans le génotype. F1 a reçu ℓ et j de l’autre parent.", "F1 a-t-elle reçu un allèle de chaque parent ?"],
    [`Génotype de F1 : ${GF(["L", "J"], ["ℓ", "j"])}, gènes liés`, false, "Tu as écrit des gènes liés avant de l’avoir montré. Le test-cross tranche, et ici il dit « indépendants ».", "Quatre classes égales disent-elles « liés » ou « indépendants » ?"]]) } },

/* ===== 6. deux gènes, une paire ===== */
{ cle: "rappel", beat: 6, scene: "echiquier", set: GR(D(CAS.tcL, { sub: "test-cross : L//ℓ × ℓ//ℓ" }), { fill: 0 }), sujet: "test-cross et F2 d’un gène",
  text: ["Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.", { t: "L//ℓ × ℓ//ℓ : la descendance ?", fort: true }],
  verifie: VF([
    ["½ [L] et ½ [ℓ]", true, "Oui : la suite aura besoin de cette idée, car le test-cross montre les gamètes du parent testé."],
    ["¾ [L] et ¼ [ℓ]", false, "C’est la F2, L//ℓ × L//ℓ. Ici le testeur ne donne que ℓ/.", "Le testeur ℓ//ℓ donne-t-il aussi des gamètes L ?"],
    ["toutes [L]", false, "La moitié des descendants reçoit ℓ/ du parent testé. Elle est ridée.", "Combien de gamètes ℓ la plante L//ℓ donne-t-elle ?"]]) },
{ cle: "souris-f1", beat: 6, scene: "meiose", set: MEI(LAB.souris, { ph: 1, al: 1 }), sujet: "écrire un génotype de gènes liés",
  text: [`${REF.svt24r} : des souris grises à pelage lisse, croisées avec des souris blanches à pelage crépu, donnent une F1 grise et lisse.`, "Symboles du sujet : G (gris), g (blanc) ; L (lisse), ℓ (crépu). Ici G veut dire gris, et non jaune comme dans le sujet de PC.", { t: "Si les deux gènes sont sur le même chromosome, F1 s’écrit…", fort: true }],
  pari: { label: "Réponds", ...VF([
    [GF(["G", "L"], ["g", "ℓ"]), true, "Oui : chaque chromosome porte un allèle de chaque gène."],
    ["G//g L//ℓ", false, "Tu as écrit deux paires. Sur un même chromosome, chaque chromosome porte un allèle de chaque gène : G L // g ℓ.", "Combien de paires de chromosomes portent les deux gènes ?"],
    [GF(["G", "g"], ["L", "ℓ"]), false, "Tu as mis les deux allèles d’un gène sur un même chromosome. Chaque chromosome porte un allèle de chaque gène.", "Un chromosome porte-t-il les deux allèles d’un même gène ?"]]) } },
{ cle: "absolu-tc", beat: 6, scene: "meiose", set: MEI(LAB.souris, { ph: 3, al: 1, plq: 1, co: 0 }), sujet: "les gamètes en linkage absolu",
  text: ["Le sujet propose une hypothèse : les deux gènes sont complètement liés, sans crossing-over lors de la formation des gamètes. On dit [[linkage-absolu|linkage absolu]].", { t: "Sous cette hypothèse, F1 produit…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { ph: 8 }, d: 3600 }, { p: { gam: 1 }, d: 500 }], ...VF([
    ["½ G L et ½ g ℓ", true, "Oui : les chromosomes passent entiers dans les gamètes, deux types seulement."],
    ["¼ de chacun des quatre types", false, "Tu as repris le cas de deux paires. L’orientation d’une paire ne sépare pas deux gènes d’un même chromosome.", "Une paire qui s’oriente sépare-t-elle deux gènes d’un même chromosome ?"],
    ["½ G g et ½ L ℓ", false, "Un gamète porte un seul allèle de chaque gène, pas les deux allèles d’un gène.", "Un gamète porte-t-il G et g à la fois ?"]]) } },
{ cle: "absolu-f2", beat: 6, scene: "echiquier", set: GR(D(CAS.absolu, { sub: "F1 × F1 : G L // g ℓ × G L // g ℓ" }), { fill: 0 }), sujet: "la F2 en linkage absolu",
  text: ["Question 2 du même sujet : à l’aide d’un échiquier, les proportions phénotypiques attendues en F2, pour des hybrides F1 croisés entre eux.", { t: "Sous l’hypothèse du linkage absolu, la F2 ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { fill: 4, phe: 1 }, d: 1200 }], ...VF([
    ["¾ [G, L] et ¼ [g, ℓ]", true, "Oui : trois cases sur quatre portent G L, une seule est g ℓ // g ℓ."],
    ["9/16, 3/16, 3/16 et 1/16", false, "Tu as appliqué la loi des deux paires. Ici deux gamètes seulement : un échiquier 2 × 2.", "Combien de types de gamètes F1 donne-t-elle ici ?"],
    ["½ [G, L] et ½ [g, ℓ]", false, "Tu as pris le rapport du test-cross. Ici F1 × F1 : trois cases [G, L] sur quatre.", "F1 est-elle croisée avec un double récessif ?"]]) } },
{ cle: "vrai-tc", beat: 6, scene: "echiquier", set: GR(D(CAS.sourisTC, { sub: "test-cross : F1 × g ℓ // g ℓ" }), { fill: 0, hd: 0 }), sujet: "lire un vrai test-cross",
  text: ["Pour vérifier l’hypothèse, le sujet fait le test-cross : F1 × une souris g ℓ // g ℓ.", { t: "Qu’observera-t-on ?", fort: true }],
  pari: { label: LB("Ton pari"), reveal: [{ p: { fill: 4, hd: 1, phe: 1 }, d: 1500 }], opts: [
    { t: "2 classes à ½ : l’hypothèse est juste", fb: `Tu avais prévu deux classes. Il y en a quatre : deux grandes, ${SCP(SV24R.GL)} et ${SCP(SV24R.gl)}, et deux petites, ${SCP(SV24R.Gl)} et ${SCP(SV24R.gL)}.` },
    { t: "4 classes à ¼ : les gènes sont indépendants", fb: `Tu avais prévu quatre classes égales. Ce sont deux grandes, ${SCP(SV24R.GL)} et ${SCP(SV24R.gl)}, et deux petites, ${SCP(SV24R.Gl)} et ${SCP(SV24R.gL)}.` },
    { t: "4 classes, deux grandes et deux petites", fb: `Tu avais vu juste : ${SCP(SV24R.GL)} et ${SCP(SV24R.gl)}, puis ${SCP(SV24R.Gl)} et ${SCP(SV24R.gL)}. Les grandes viennent des chromosomes du parent ; pour les petites, il s’est passé autre chose.` }] } },
{ cle: "quatre-classes", beat: 6, scene: "echiquier", set: GR(D(CAS.sourisTC, { sub: "test-cross : les aires suivent les pourcentages" }), { fill: 4, aire: 1, phe: 1, leg: 1 }), sujet: "quatre classes inégales",
  text: ["Chaque classe prend une aire proportionnelle à son pourcentage.", { t: "Quatre classes : les gènes sont-ils indépendants ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["non : liés, car les classes sont très inégales", true, "Oui : des gènes indépendants donneraient quatre classes égales."],
    ["oui, car il y a quatre classes", false, "Tu as cru que quatre classes disent « indépendants ». Des gènes indépendants donnent quatre classes égales, pas deux grandes et deux petites.", "Quatre classes égales ou inégales pour des gènes indépendants ?"],
    ["liés, sans crossing-over : l’hypothèse est vérifiée", false, `Les ${pc(SV24R_REC, 0)} de souris recombinées ne viennent ni de G L ni de g ℓ. L’hypothèse est réfutée : c’est un linkage relatif, avec crossing-over.`, "Sans crossing-over, existerait-il des souris G ℓ ou g L ?"]]) } },
{ cle: "crossing-over", beat: 6, scene: "meiose", set: MEI(LAB.souris, { ph: 2, al: 1, tet: 1, chi: 1, co: 0 }), seq: [{ p: { co: 1 }, d: 2200, w: 300 }, { p: { ph: 8, tet: 0, chi: 0 }, d: 4000, w: 300 }, { p: { gam: 1 }, d: 500 }], sujet: "le crossing-over entre les deux gènes",
  text: ["En prophase I, un [[crossing-over]] peut tomber entre les deux gènes : deux chromatides deviennent G ℓ et g L.",
    { t: "Ces gamètes sont recombinés : c’est le [[linkage-relatif|linkage relatif]], le brassage intrachromosomique.", a: 1 },
    { t: "Les deux petites classes viennent de gamètes recombinés.", fort: true, a: 2 }] },
{ cle: "parentaux-recombines", beat: 6, scene: "meiose", set: MEI(LAB.sourisInv, { ph: 1, al: 1 }), sujet: "parentaux et recombinés",
  text: ["Les gamètes [[parentaux]] portent les combinaisons des chromosomes du parent hybride ; les [[recombines|recombinés]], les autres.", `Une souris ${GF(["G", "ℓ"], ["g", "L"])}, née d’un parent gris crépu et d’un parent blanc lisse, fait un test-cross.`, { t: "Quelles classes sont recombinées ?", fort: true }],
  pari: { label: LB("Réponds"), apres: { html: "Les recombinées restent les deux petites classes, ici [G, L] et [g, ℓ]." }, ...VF([
    ["[G, L] et [g, ℓ]", true, "Oui : ni G ℓ ni g L ne sont sur ses chromosomes, il a fallu un crossing-over."],
    ["[G, ℓ] et [g, L]", false, "Tu as pris les phénotypes qui « mélangent » les caractères pour des recombinés. On juge par rapport aux chromosomes du parent hybride.", "Quelles combinaisons ses chromosomes portent-ils ?"],
    ["les quatre", false, "Deux classes seulement demandent un crossing-over. Les deux autres portent les combinaisons de ses chromosomes.", "Combien de combinaisons ses chromosomes portent-ils ?"]]) } },
{ cle: "cinquante", beat: 6, scene: "meiose", set: MEI(LAB.souris, { ph: 8, al: 1, co: 1, gam: 1 }), sujet: "la part de recombinés par méiose",
  text: ["Suppose qu’un crossing-over ait lieu entre G et L à chaque méiose.", { t: "Quelle serait la part de recombinés ?", fort: true }],
  verifie: { apres: { html: "Pour deux gènes liés, la part de recombinés reste donc de 50 % au plus." }, ...VF([
    ["50 %", true, "Oui : chaque méiose donne 4 chromatides, dont 2 seulement sont recombinées."],
    ["100 %", false, "Tu as cru que tout est échangé. Le crossing-over ne change que 2 des 4 chromatides.", "Combien de chromatides participent à un échange ?"],
    [`${pc(SV24R_REC, 0)}, comme ici`, false, `Tu as repris le chiffre des souris. ${pc(SV24R_REC, 0)} veut dire que le crossing-over n’a lieu que dans peu de méioses.`, "Un crossing-over à chaque méiose se produit-il rarement ?"]]) } },

/* ===== 7. la distance et la carte ===== */
{ cle: "pourcentage", beat: 7, scene: "echiquier", set: GR(D(CAS.sourisTC, { sub: "test-cross : les cases recombinées sont allumées" }), { fill: 4, aire: 1, phe: 1, cls: "rec", leg: 1 }), sujet: "la part de recombinés",
  text: ["Le sujet ne demande pas ce calcul, mais la suite en a besoin.", { t: "Dans le test-cross des souris, quelle est la part de recombinés ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    [`${pc(SV24R_REC, 0)} : ${pc(SV24R.Gl, 2)} + ${pc(SV24R.gL, 2)}`, true, "Oui : les recombinés sont les deux classes ensemble."],
    [`${pc(SV24R_REC / 2, 1)} : la moyenne de ${fr(SV24R.Gl, 2)} et ${fr(SV24R.gL, 2)}`, false, "Tu as pris la moyenne des deux classes, ou une seule. Les recombinés sont les deux classes ensemble.", "Combien de classes sont recombinées ?"],
    [`${pc(SV24R_PAR, 0)} : ${pc(SV24R.GL, 2)} + ${pc(SV24R.gl, 2)}`, false, "Ce sont les parentaux : G L et g ℓ. Les recombinés sont les deux petites classes.", "Les parentaux sont-ils les petites classes ?"]]) } },
{ cle: "centimorgan", beat: 7, scene: "carte", set: { cur: 3, tr: 0, pos: 0 },
  text: ["Plus deux gènes sont éloignés, plus un crossing-over a de chances de tomber entre eux.", { t: `Par définition, 1 % de recombinés = 1 [[centimorgan|centimorgan]] (cM) : G et L sont à ${fr(SV24R_REC, 0)} cM.`, fort: true }] },
{ cle: "double", beat: 7, scene: "carte", set: { cur: 3, tr: 0, pos: 0 }, sujet: "la distance et les recombinés",
  text: ["Imagine que L soit deux fois plus loin de G.", { t: "Les recombinés seraient…", fort: true }],
  pari: { label: LB("Ton pari"), reveal: [{ p: { cur: 2 * SV24R_REC }, d: 1200 }], opts: [
    { t: "deux fois plus nombreux", fb: `Tu avais vu juste : à ${fr(2 * SV24R_REC, 0)} cM, ${fr(2 * SV24R_REC, 0)} % de recombinés. C’est vrai tant que les gènes restent proches.` },
    { t: "aussi nombreux : liés, c’est liés", fb: `Tu as cru que la part de recombinés ne dépend pas de la place des gènes. À ${fr(2 * SV24R_REC, 0)} cM, ${fr(2 * SV24R_REC, 0)} % de recombinés : elle double avec la distance, tant que les gènes restent proches.` },
    { t: "quatre fois plus nombreux", fb: `La part double : ${fr(2 * SV24R_REC, 0)} % pour ${fr(2 * SV24R_REC, 0)} cM, pas quatre fois plus. C’est vrai tant que les gènes restent proches.` }] } },
{ cle: "curseur", beat: 7, scene: "carte", set: { cur: 3, tr: 0, pos: 0 }, ctl: "curseur", need: () => S.cpos.size >= 3, needLabel: "Déplace L trois fois",
  text: ["Fais glisser L le long du chromosome, ou utilise les boutons.", "La scène calcule à chaque position les recombinés, d %, et chaque classe, d/2 %."] },
{ cle: "total", beat: 7, scene: "echiquier", set: GR(D(CAS.exTC, { sub: "test-cross d’un exemple : effectifs" }), { fill: 4, phe: 1 }), sujet: "la distance se calcule sur le total",
  text: [`Un test-cross d’exemple, sur ${ent(EX_N)} descendants : ${EX_TC.AB} [A, B], ${EX_TC.ab} [a, b], ${EX_TC.Ab} [A, b] et ${EX_TC.aB} [a, B].`, { t: "La distance entre A et B ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    [`${fr(EX_D, 0)} cM`, true, `Oui : ${EX_TC.Ab} + ${EX_TC.aB} = ${EX_REC} recombinés sur ${ent(EX_N)} descendants : ${EX_REC} ÷ ${ent(EX_N)} = ${fr(EX_D / 100, 2)}, soit ${fr(EX_D, 0)} %.`],
    [`${fr(EX_LEURRE_PAR, 0)} cM`, false, `Tu as divisé par les seuls parentaux, ${EX_TC.AB + EX_TC.ab}. On divise par tous les descendants : ${EX_REC} ÷ ${ent(EX_N)}.`, "Par combien de descendants faut-il diviser ?"],
    [`${fr(EX_LEURRE_UNE, 1)} cM`, false, `Tu n’as compté qu’une classe recombinée. Les deux classes rares ensemble : ${EX_TC.Ab} + ${EX_TC.aB}.`, "Combien de classes sont recombinées ?"]]) } },
{ cle: "trois-genes", beat: 7, scene: "carte", tag: "1913 · Sturtevant", set: { cur: 3, tr: 1, pos: 0 }, sujet: "ordonner trois gènes",
  text: ["Alfred Sturtevant, élève de Morgan, publie en 1913 la première [[carte-factorielle|carte factorielle]] : des gènes de la drosophile rangés sur une ligne d’après leurs pourcentages de recombinés.", `A–B = ${TROIS.AB} cM, B–C = ${TROIS.BC} cM, A–C = ${TROIS.AC} cM.`, { t: "Quel gène est au milieu ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { pos: 1 }, d: 900 }], apres: { html: "Les distances s’additionnent, pour des gènes proches." }, ...VF([
    [`B, car ${TROIS.AB} + ${TROIS.BC} = ${TROIS.AC}`, true, "Oui : au milieu, le gène dont les deux distances font la troisième."],
    ["C, car 5 est la plus petite distance", false, "Tu as mis au milieu le gène de la plus petite distance. Au milieu, celui dont les deux distances font la troisième.", "Quelle somme de deux distances donne la troisième ?"],
    ["A, car A vient en premier", false, "Tu as suivi l’ordre des lettres. L’ordre se déduit des distances, pas de l’alphabet.", "Comment l’ordre se déduit-il : des lettres ou des distances ?"]]) } },
{ cle: "v-carte", beat: 7, scene: "carte", set: { cur: D12, tr: 0, pos: 0, nm: ["A", "B"] }, sujet: "la part d’une classe de recombinés",
  text: [`Deux gènes à ${D12} cM ; test-cross de l’hybride ${GF(["A", "B"], ["a", "b"])}.`, { t: "La part attendue de [A, b] ?", fort: true }],
  verifie: VF([
    [pc(D12_CLASSE, 0), true, `Oui : ${D12} % de recombinés, partagés entre [A, b] et [a, B] : ${D12} ÷ 2.`],
    [pc(D12, 0), false, `Tu as donné à une classe la part des deux. Les ${D12} % se partagent entre deux classes égales.`, "Combien de classes recombinées se partagent ce pourcentage ?"],
    [pc(D12_PAR, 0), false, `C’est une classe parentale : (100 − ${D12}) ÷ 2. [A, b] est recombinée.`, "[A, b] est-elle une classe parentale de cet hybride ?"]]) },

/* ===== 8. retour à l'énigme ===== */
{ cle: "retour-quart", beat: 8, scene: "echiquier", set: GR(G2(CAS.f2), { fill: 4, phe: 1 }), sujet: "pourquoi un quart de ridées",
  text: () => [{ 1: "Ton pari du début était le bon : environ un quart de graines ridées en F2.", 0: "Tu avais parié sur des ridées absentes : elles reviennent, à peu près un quart.", 2: "Tu avais parié sur la moitié : c’est un quart." }[ctx.rep("f2")] || "La première question est résolue : un quart de ridées.", { t: "Pourquoi un quart ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["F1 donne ℓ/ une fois sur deux : ½ × ½", true, "Oui : une graine ℓ//ℓ reçoit ℓ du pollen et ℓ de l’ovule, avec la probabilité ½ chacun."],
    ["le ridé avait disparu, une mutation l’a fait revenir", false, "Tu as cru que le ridé était perdu. Il était masqué en F1 : chaque plante L//ℓ garde ℓ.", "Une plante L//ℓ porte-t-elle encore un allèle ℓ ?"],
    ["parce que l’échiquier a 4 cases", false, `Tu as pris le nombre de cases pour la probabilité. Ce sont les proportions des gamètes : la case [G, L] des souris vaut ${SCP(SV24R.GL)}, pas ¼.`, "Qu’est-ce qui fixe la probabilité d’une case : leur nombre ou les gamètes ?"]]) } },
{ cle: "retour-556", beat: 8, scene: "echiquier", set: GR(D(CAS.f2Indep, { sub: "F2 de Mendel : deux caractères", obsT: OBS_DI, obsC: Object.fromEntries(Object.entries(DI).map(([k, v], i) => [["[L, J]", "[L, j]", "[ℓ, J]", "[ℓ, j]"][i], ent(v)])) }), { fill: 16, phe: 1, obs: 1, leg: 1 }), sujet: "la classe majoritaire n’est pas un signe de liaison",
  text: [`Mendel a compté ${DI.LJ} graines [L, J], ${DI.Lj} [L, j], ${DI.lJ} [ℓ, J] et ${DI.lj} [ℓ, j] : ${M_DI_TOT} en tout. Pour deux gènes indépendants, on attend 9/16, 3/16, 3/16 et 1/16 de ${M_DI_TOT}.`, { t: "La classe [L, J] est de loin la plus grande. Les deux gènes sont-ils liés ?", fort: true }],
  pari: { label: LB("Réponds"), ...VF([
    ["non : 9/16 de [L, J] est attendu en F2", true, `Oui : 9/16 de ${M_DI_TOT} font ${fr(DA.LJ, 2)}, et Mendel en a compté ${DI.LJ}.`],
    ["oui, la classe des deux dominants domine", false, "Tu as pris la classe majoritaire pour un signe de liaison. C’est au test-cross que des classes inégales disent « liés ».", "Quelle classe est attendue la plus grande pour des gènes indépendants ?"],
    [`on ne peut rien dire, ${DI.LJ} n’est pas ${fr(DA.LJ, 2)}`, false, `Tu as exigé des comptes exacts. ${DI.LJ} pour ${fr(DA.LJ, 2)} attendus : l’écart est faible, les comptes sont compatibles.`, "Un compte réel tombe-t-il exactement sur l’attendu ?"]]) } },
{ cle: "retour-lies", beat: 8, scene: "echiquier", set: GR(D(CAS.absoluMendel, { sub: "F1 × F1 : L J // ℓ j × L J // ℓ j" }), { fill: 0 }), sujet: "deux gènes tout proches",
  text: ["Mendel ne pouvait pas le voir : et si ses deux gènes avaient été tout proches sur un même chromosome ?", { t: "Sa F2 aurait ressemblé à…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { fill: 4, phe: 1 }, d: 1000 }], apres: { html: "<b>L’énigme est résolue.</b>" }, ...VF([
    ["presque ¾ [L, J] et ¼ [ℓ, j]", true, "Oui : presque deux gamètes seulement, un échiquier 2 × 2, avec quelques recombinés en plus."],
    ["9/16, 3/16, 3/16 et 1/16", false, "Tu as appliqué la loi des deux paires. Elle exige deux paires, pas un même chromosome.", "Les gènes sont-ils sur deux paires ou sur une seule ?"],
    ["½ [L, J] et ½ [ℓ, j]", false, "C’est le rapport d’un test-cross. Ici F1 × F1 : trois cases [L, J] sur quatre.", "F1 est-elle croisée avec un double récessif ?"]]) } },

/* ===== 9. au bac ===== */
{ cle: "bac-doc", beat: 9, scene: "bac", set: { doc: 1, e1: 0, ex2: 0 }, sujet: "le premier geste devant un sujet",
  text: [`${REF.svt22n}, questions 1 à 3 (0,75 pt, 1 pt et 1,25 pt, barème imprimé).`,
    "Drosophile, trois lignées : A et B aux ailes longues et au corps clair, C aux ailes vestigiales et au corps noir. Le croisement 1, A × C, donne une F1 toute [vg⁺, b⁺] ; le document 1 place les deux gènes sur le chromosome 2.", { t: "Quel est ton premier geste ?", fort: true }],
  pari: { label: LB("Premier geste ?"), reveal: [{ p: { e1: 1 }, d: 1000 }], opts: [
    { t: "Lire le croisement 1 et le document 1 : F1 homogène, deux gènes sur le chromosome 2", fb: "C’est le bon réflexe : le croisement 1 et le document 1 disent déjà la dominance, la liaison et l’autosome." },
    { t: "Faire tout de suite l’échiquier du croisement 2", fb: "Tu écrirais des gamètes avant de savoir si les gènes sont liés. Lis d’abord les résultats et le document." },
    { t: "Réciter le cours sur les lois de Mendel", fb: "Réciter le cours ne répond pas à la question. Il faut exploiter le document." }] } },
{ cle: "bac-q1", beat: 9, scene: "bac", set: { doc: 1, e1: 1, ex2: 0 }, ctl: "lignes", sujet: "déterminer le mode de transmission",
  text: ["Question 1 (0,75 pt) : le mode de transmission des deux caractères. Voici les trois lignes du corrigé officiel, 0,25 pt chacune."],
  deriv: [
    { tex: "", alt: "F1 homogène : vg⁺ et b⁺ dominants, vg et b récessifs.", h: "<b>1.</b> La F1 est homogène [vg⁺, b⁺] : vg⁺ (ailes longues) et b⁺ (corps clair) sont dominants, vg et b récessifs. (0,25 pt)", r: "Un seul phénotype parental en F1." },
    { tex: "", alt: "Les deux gènes sont sur le chromosome 2 : liés.", h: "<b>2.</b> Les deux gènes sont portés par le même chromosome n° 2 : ils sont liés. (0,25 pt)", r: "Le document 1 place les deux loci sur le chromosome 2." },
    { tex: "", alt: "Un autosome : les caractères ne sont pas liés au sexe.", h: "<b>3.</b> Ils sont portés par un autosome : les deux caractères ne sont pas liés au sexe. (0,25 pt)", r: "Dire si un gène est lié au sexe vaut une ligne de copie." }] },
{ cle: "bac-q2", beat: 9, scene: "bac", set: { doc: 1, e1: 1, ex2: 0 }, sujet: "le génotype d’une lignée hétérozygote",
  text: ["Question 2 (1 pt) : les génotypes des trois lignées. La lignée B a le même phénotype que A ; croisée avec C, elle donne quatre phénotypes.", { t: "Quel est le génotype de la lignée B ?", fort: true }],
  pari: { label: "Réponds", apres: { html: `Lignée A : ${GF(["vg⁺", "b⁺"], ["vg⁺", "b⁺"])} ; lignée C : ${GF(["vg", "b"], ["vg", "b"])} (0,25 pt), « lignées pures selon la première loi de Mendel » (0,25 pt). Lignée B (0,25 pt) et sa justification (0,25 pt).` }, ...VF([
    [GF(["vg⁺", "b⁺"], ["vg", "b"]), true, "Oui : C est pure, et quatre phénotypes en descendance exigent que B soit hétérozygote pour les deux gènes."],
    [GF(["vg⁺", "b⁺"], ["vg⁺", "b⁺"]), false, "Tu as copié le phénotype dans le génotype. C est pure : quatre phénotypes exigent que B soit hétérozygote pour les deux gènes.", "Une lignée pure croisée avec C peut-elle donner quatre phénotypes ?"],
    ["vg⁺//vg b⁺//b", false, "Tu as écrit deux gènes indépendants. Le document 1 les place sur le même chromosome.", "Les deux gènes sont-ils sur deux paires ou sur le chromosome 2 ?"]]) } },
{ cle: "bac-gametes", beat: 9, scene: "bac", set: { doc: 1, e1: 1, ex2: 0 }, sujet: "calculer une distance et les gamètes",
  text: [`Question 3 (1,25 pt) : l’interprétation chromosomique du croisement 2. Les gènes sont à ${SV22.corps} et ${SV22.ailes} cM.`, { t: "Quel pourcentage de gamètes vg b⁺ la lignée B produit-elle ?", fort: true }],
  pari: { label: "Réponds", apres: { html: `La ligne du corrigé, 0,5 pt, avec ses valeurs, celles du corrigé : « Gamètes : vg b (100 %) · vg⁺ b⁺ (${fr(SV22_PAR, 1)} %) ; vg b⁺ (${fr(SV22_REC, 1)} %) ; vg⁺ b (${fr(SV22_REC, 1)} %) ; vg b (${fr(SV22_PAR, 1)} %) ». Le corrigé ne détaille pas le calcul : ${SV22.ailes} − ${SV22.corps}, puis la moitié.` }, ...VF([
    [pc(SV22_REC, 1), true, `Oui : ${SV22.ailes} − ${SV22.corps} = ${SV22_D} cM, donc ${SV22_D} % de recombinés, partagés entre deux gamètes.`],
    [pc(SV22_D, 0), false, `Tu as donné la part des deux gamètes recombinés ensemble. Chacun en a la moitié : ${fr(SV22_REC, 1)} %.`, "Combien de gamètes recombinés se partagent ce pourcentage ?"],
    [pc(SV22.corps, 0), false, `Tu as lu la position d’un locus comme une distance. La distance est l’écart des deux positions : ${SV22.ailes} − ${SV22.corps}.`, "La distance est-elle une position ou un écart ?"]]) } },
{ cle: "bac-echiquier", beat: 9, scene: "echiquier", set: GR(D(CAS.droso, { sub: "lignée C × lignée B" }), { fill: 4, aire: 1, phe: 1, leg: 1 }), sujet: "rédiger l’interprétation chromosomique",
  text: ["La mise en page du corrigé : parents, phénotypes, génotypes, gamètes, échiquier (0,5 pt), puis la conclusion (0,25 pt)."],
  html: () => `<div class="tr-copie">${[
    "<b>Parents</b> : lignée C × lignée B",
    "<b>Phénotypes</b> : [vg, b] × [vg⁺, b⁺]",
    `<b>Génotypes</b> : ${GF(["vg", "b"], ["vg", "b"])} × ${GF(["vg⁺", "b⁺"], ["vg", "b"])}`,
    `<b>Gamètes</b> : vg b (100 %) · vg⁺ b⁺ (${fr(SV22_PAR, 1)} %) ; vg⁺ b (${fr(SV22_REC, 1)} %) ; vg b⁺ (${fr(SV22_REC, 1)} %) ; vg b (${fr(SV22_PAR, 1)} %)`,
    `<b>Conclusion</b> : parentaux, ${fr(SV22_PAR, 1)} % [vg⁺, b⁺] et ${fr(SV22_PAR, 1)} % [vg, b] ; recombinés, ${fr(SV22_REC, 1)} % [vg, b⁺] et ${fr(SV22_REC, 1)} % [vg⁺, b].`].map((l) => `<p>${ty(l)}</p>`).join("")}</div>` },
{ cle: "bac-erreur", beat: 9, scene: "bac", set: { doc: 1, e1: 1, ex2: 0 }, sujet: "ne pas écrire quatre gamètes à ¼ pour des gènes liés",
  text: ["Une copie écrit : « Gamètes de B : ¼ vg⁺ b⁺, ¼ vg⁺ b, ¼ vg b⁺, ¼ vg b. »", { t: "Où est l’erreur ?", fort: true }],
  verifie: VF([
    ["les gènes sont liés : les parentaux dominent", true, `Oui : avec des gènes liés, les gamètes parentaux sont les plus nombreux, ${fr(SV22_PAR, 1)} % chacun. Quatre gamètes à ¼, c’est le cas de gènes indépendants.`],
    ["il fallait ½ et ½ : deux gamètes seulement", false, "Deux gamètes seulement voudraient dire aucun crossing-over. Le croisement 2 donne quatre phénotypes : il y a des recombinés.", "Le croisement 2 donne-t-il des recombinés ?"],
    ["aucune, si l’échiquier est bien rempli", false, "Un échiquier juste sur des gamètes faux donne des proportions fausses. Les gamètes d’abord.", "Que devient l’échiquier si les gamètes sont faux ?"]]) },
{ cle: "bac-2", beat: 9, scene: "bac", set: { doc: 1, e1: 0, ex2: 1 }, sujet: "écrire les génotypes des parents de deux gènes indépendants",
  text: [`À toi : ${REF.svt24n}, question 3 (1,25 pt).`, "Réponses 1 et 2, données : les Dexter, pattes courtes, sont D//d (les D//D ne naissent pas) ; la F1 sans cornes est R//r.", "Troisième croisement : F1 sans cornes et Dexter, entre elles ; les deux gènes sont indépendants.", { t: "Ligne 1 de la copie : les génotypes des parents ?", fort: true }],
  pari: { label: LB("Ligne 1 ?"), apres: { html: "Ligne 2, 0,25 pt : les gamètes, ¼ R/ D/ · ¼ r/ d/ · ¼ R/ d/ · ¼ r/ D/. L’échiquier, 0,5 pt : à l’étape suivante." }, ...VF([
    ["R//r D//d × R//r D//d", true, "Oui : deux gènes indépendants, donc deux génotypes côte à côte (0,25 pt)."],
    [`${GF(["R", "D"], ["r", "d"])} × ${GF(["R", "D"], ["r", "d"])}`, false, "Tu as écrit des gènes liés. L’énoncé dit « indépendants » : deux paires, deux génotypes côte à côte.", "L’énoncé dit-il « liés » ou « indépendants » ?"],
    ["R//r D//D × R//r D//D", false, "Un Dexter D//D ne naît pas, d’après la question 1. Les Dexter sont D//d.", "Un individu D//D est-il vivant ?"]]) } },
{ cle: "bac-2-suite", beat: 9, scene: "echiquier", set: GR(D(CAS.bovins, { sub: "F1 × F1 : les cases D//D sont barrées" }), { fill: 16, phe: 1 }), sujet: "recompter après un gène létal",
  text: ["Les quatre cases D//D sont barrées.", { t: "La dernière ligne : les proportions des phénotypes, après élimination ?", fort: true }],
  pari: { label: LB("Dernière ligne ?"), apres: { html: "0,25 pt. Le corrigé écrit les mêmes valeurs, dans un autre ordre." }, ...VF([
    [TXT_BV_BON, true, "Oui : douze cases de vivants, donc 6/12, 3/12, 2/12 et 1/12."],
    [TXT_BV_16, false, "Tu as oublié le gène létal. Les quatre cases D//D sont barrées : on compte sur 12 cases.", "Combien de cases restent quand on retire les cases barrées ?"],
    [TXT_BV_SANS, false, "Tu as barré les cases sans recompter. Il reste 12 cases : 6/12, pas 6/16.", "Sur combien de cases compte-t-on les vivants ?"]]) } },

/* ===== 10. bilan ===== */
{ cle: "q1", beat: 10, scene: "quiz", set: { qi: 0, rv: 0 }, sujet: "quatre classes inégales et la distance",
  text: ["Trois pièges des copies, pour finir. Le premier : le test-cross.", { t: `Test-cross d’un double hétérozygote : ${Q1.a} %, ${Q1.b} %, ${Q1.c} %, ${Q1.d} %. Les gènes sont…`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    [`liés, à ${Q1_D} cM`, true, `Oui : quatre classes très inégales, et ${Q1.c} + ${Q1.d} = ${Q1_D} % de recombinés.`],
    ["indépendants : il y a quatre classes", false, "Tu as cru que quatre classes disent « indépendants ». Des gènes indépendants donnent quatre classes égales.", "Quatre classes égales ou inégales pour des gènes indépendants ?"],
    [`liés, à ${fr(Q1_MOY, 1)} cM`, false, `Tu as pris la moyenne des deux classes rares. Elles s’additionnent : ${Q1.c} + ${Q1.d} = ${Q1_D} %.`, "Les deux classes rares sont-elles recombinées ensemble ?"]]) } },
{ cle: "q2", beat: 10, scene: "quiz", set: { qi: 1, rv: 0 }, sujet: "le rapport 2 pour 1",
  text: ["Le deuxième : le rapport 2 pour 1.", { t: "Des individus [A] croisés entre eux donnent ⅔ [A] et ⅓ [a]. Les [A] sont…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    ["tous A//a", true, "Oui : A//A ne naît pas, il ne reste que A//a parmi les [A]."],
    ["A//A ou A//a", false, "Tu as compté les [A] comme pour un gène ordinaire. Ici les A//A ne naissent pas.", "Un 2 pour 1 laisse-t-il naître les A//A ?"],
    ["des A//A, et ⅓ est une erreur", false, "Tu as pris un 2 pour 1 pour une erreur d’expérience. C’est la signature d’un gène létal.", "Que signale un rapport 2 pour 1 ?"]]) } },
{ cle: "q3", beat: 10, scene: "quiz", set: { qi: 2, rv: 0 }, sujet: "la distance sur le total",
  text: ["Le troisième : la distance.", { t: `Test-cross : ${Q3.p1}, ${Q3.p2}, ${Q3.r1} et ${Q3.r2} descendants. La distance ?`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    [`${Q3_D} cM`, true, `Oui : ${Q3.r1 + Q3.r2} recombinés sur ${ent(Q3_N)} descendants.`],
    [`${fr(Q3_PAR, 1)} cM`, false, `Tu as divisé par les parentaux, ${Q3.p1 + Q3.p2}. On divise par tous les descendants, ${ent(Q3_N)}.`, "Par combien de descendants faut-il diviser ?"],
    [`${fr(Q3_UNE, 1)} cM`, false, `Tu n’as compté qu’une classe recombinée. Les deux classes rares ensemble : ${Q3.r1} + ${Q3.r2}.`, "Combien de classes sont recombinées ?"]]) } },
{ cle: "fin", beat: 10, scene: "end", set: { n: 0 }, seq: [{ p: { n: 5 }, d: 3600, w: 300 }],
  text: ["Fin de la séance « Compter les descendants »."], html: () => finHTML() },
];

/* ---------- les parties ---------- */
const BEATS = [
  { name: "Ce qu’il faut savoir", court: "Savoir" }, { name: "L’énigme", court: "Énigme" }, { name: "Un caractère", court: "Un gène" },
  { name: "Le test-cross", court: "Test" }, { name: "Le gène létal", court: "Létal" }, { name: "Deux gènes, deux paires", court: "Indép." },
  { name: "Deux gènes, une paire", court: "Liés" }, { name: "La distance et la carte", court: "Carte" }, { name: "Retour à l’énigme", court: "Retour" },
  { name: "Au bac", court: "Bac" }, { name: "Bilan", court: "Bilan" },
];

/* ---------- les mots ---------- */
const mots = {
  genotype: { t: "génotype", d: "Les allèles d’un individu pour un gène : un par chromosome de la paire, séparés par deux traits. G//g est hétérozygote, G//G homozygote." },
  phenotype: { t: "phénotype", d: "Ce qu’on observe chez un individu, pour un caractère. On l’écrit entre crochets : [G], [g]." },
  dominant: { t: "allèle dominant", d: "L’allèle qui s’exprime chez un hétérozygote. On lui donne une majuscule : chez G//g, c’est G qu’on voit." },
  recessif: { t: "allèle récessif", d: "L’allèle masqué chez un hétérozygote : il ne s’exprime qu’en double exemplaire. On lui donne une minuscule." },
  "lignee-pure": { t: "lignée pure", d: "Une lignée dont tous les individus sont homozygotes pour le gène étudié : croisés entre eux, ils donnent toujours le même caractère." },
  homozygote: { t: "homozygote", d: "Un individu qui porte deux fois le même allèle d’un gène : G//G ou g//g. Il ne produit qu’un type de gamète pour ce gène." },
  "premiere-loi": { t: "première loi de Mendel", d: "Deux lignées pures qui diffèrent par un caractère donnent une F1 homogène, toute semblable à l’un des parents. Au bac, une F1 homogène montre que les parents sont de race pure." },
  disjonction: { t: "disjonction des allèles", d: "À la méiose, les deux allèles d’un gène se séparent : chaque gamète n’en reçoit qu’un. On parle aussi de pureté des gamètes." },
  echiquier: { t: "échiquier de croisement", d: "Un tableau à deux entrées : les gamètes d’un parent en colonnes, ceux de l’autre en lignes. Chaque case est un génotype de descendant, avec sa probabilité, le produit des proportions des deux gamètes." },
  "test-cross": { t: "test-cross", d: "Le croisement d’un individu de génotype inconnu, ou d’un hybride, avec un homozygote récessif. On l’appelle aussi croisement-test ou croisement en retour. Les proportions des descendants sont celles des gamètes du parent testé." },
  "gene-letal": { t: "gène létal", d: "Un gène dont un état provoque la mort avant la naissance. Ici, l’allèle dominant est létal à l’état homozygote : les G//G ne naissent pas, d’où un rapport 2 pour 1." },
  "troisieme-loi": { t: "troisième loi de Mendel", d: "Les allèles de deux gènes situés sur deux paires différentes se répartissent indépendamment dans les gamètes : c’est la ségrégation indépendante. Au test-cross, elle donne quatre classes égales." },
  "linkage-absolu": { t: "linkage absolu", d: "Deux gènes complètement liés : aucun crossing-over entre eux. Le double hétérozygote ne produit que deux types de gamètes, ceux des deux chromosomes parentaux." },
  "linkage-relatif": { t: "linkage relatif", d: "Deux gènes liés, avec un crossing-over entre eux dans une partie des méioses. Le double hétérozygote produit quatre types de gamètes, deux parentaux majoritaires et deux recombinés." },
  "crossing-over": { t: "crossing-over", d: "L’échange de segments entre deux chromatides non sœurs de deux chromosomes homologues, en prophase I. C’est le brassage intrachromosomique, vu dans la leçon sur la méiose." },
  "brassage-inter": { t: "brassage interchromosomique", d: "Le mélange dû au hasard de l’orientation de chaque paire en métaphase I : il sépare des gènes portés par des paires différentes." },
  parentaux: { t: "gamètes parentaux", d: "Les gamètes qui portent les combinaisons d’allèles des chromosomes du parent hybride. Par rapport à ce parent, et non d’après les phénotypes." },
  recombines: { t: "gamètes recombinés", d: "Les gamètes dont la combinaison d’allèles n’existe sur aucun chromosome du parent hybride : un crossing-over les a produits. Au test-cross, leurs descendants sont les classes recombinées." },
  centimorgan: { t: "centimorgan", d: "L’unité de distance entre deux gènes liés : 1 cM correspond à 1 % de recombinés. Valable pour des gènes proches." },
  "carte-factorielle": { t: "carte factorielle", d: "Un chromosome dessiné avec les gènes rangés dans l’ordre, séparés par leurs distances en cM. Les distances s’additionnent, pour des gènes proches." },
};

/* ---------- la fin : une ligne de résultat, les paris, les exercices, le détail replié ---------- */
function finHTML() {
  const P = [["q1", "le test-cross à quatre classes inégales", "l’exercice 7 (test-cross de deux gènes) et l’exercice 9 (parentaux et recombinés)"], ["q2", "le rapport 2 pour 1", "l’exercice 4 (le gène létal)"], ["q3", "la distance sur le total", "l’exercice 10 (la distance en cM)"]];
  const res = P.map(([k]) => ctx.juste(k));
  const rows = res.map((ok, i) => `<li class="${ok === true ? "ok" : ok === false ? "ko" : ""}">${ok === true ? "✓" : ok === false ? "✗" : "·"} ${P[i][1]}</li>`).join("");
  const Vs = STEPS.filter((s) => s.verifie), vu = Vs.filter((s) => ctx.juste(s.k) != null), vok = Vs.filter((s) => ctx.juste(s.k) === true).length;
  const r = (k) => ctx.rep(k), paris = [];
  if (r("f2") != null) paris.push(r("f2") === 1 ? "tu avais vu un quart de ridées en F2" : "le quart de ridées en F2 t’a surpris");
  if (r("deux-pour-un") != null) paris.push(r("deux-pour-un") === 1 ? "tu avais vu les embryons G//G mourir" : "les embryons G//G qui meurent t’ont surpris");
  if (r("tc-indep") != null) paris.push(r("tc-indep") === 0 ? "tu avais vu quatre classes à ¼ au test-cross" : "les quatre classes à ¼ t’ont surpris");
  if (r("vrai-tc") != null) paris.push(r("vrai-tc") === 2 ? "tu avais vu deux grandes classes et deux petites" : "deux grandes classes et deux petites t’ont surpris");
  if (r("double") != null) paris.push(r("double") === 0 ? "tu avais vu les recombinés doubler avec la distance" : "les recombinés qui doublent avec la distance t’ont surpris");
  const ligne = `« Vérifie » réussies du premier coup : <b>${vok} sur ${vu.length || Vs.length}</b>.${paris.length ? ` Tes paris : ${paris.join(" ; ")}.` : ""}`;
  const plan = res.map((ok, i) => (ok === false ? `Le piège « ${P[i][1]} » : ${P[i][2]}.` : null)).filter(Boolean).map((x) => `<li>${x}</li>`).join("");
  const exos = ["un rapport de croisement appliqué à un autre : l’exercice 2 (F2 d’un gène)", "un rapport 2 pour 1 : l’exercice 4 (le gène létal)", "quatre classes, donc indépendants : l’exercice 7 (test-cross de deux gènes)", "les recombinés pris pour des phénotypes nouveaux : l’exercice 9 (parentaux et recombinés)", "la distance calculée sur les seuls recombinés : l’exercice 10 (la distance)"];
  const suite = ["l’hérédité liée au sexe et la codominance : le gène sur le chromosome X, les croisements réciproques qui diffèrent, puis la génétique humaine", "ce que tu as fait ici couvre la capacité du programme pour un gène non lié au sexe, les gènes indépendants, les gènes liés et la carte"];
  return ty(`<p class="tr-res">${ligne}</p><a class="lien-exos" href="/pilote/transmission/exercices">Faire les exercices →</a>`
    + `<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    + `${plan ? `<div class="next"><div class="pari-k">Par où commencer les exercices</div><ol>${plan}</ol></div>` : ""}`
    + `<div class="next"><div class="pari-k">Piège par piège</div><ol>${exos.map((x) => `<li>${x}</li>`).join("")}</ol></div>`
    + `<div class="next"><div class="pari-k">La suite</div><ol>${suite.map((x) => `<li>${x}</li>`).join("")}</ol></div></details>`);
}

/* ---------- contrôles par étape ---------- */
const LAB_O = LAB.deux;
S.mTypes = new Set(typesMeiose(LAB_O, 0, 0, "indep")); S.mOr = 0; S.mBusy = false; S.mDispo = false;
S.cases = new Set(); S.classes = new Set(); S.cpos = new Set();
const resetS = () => { S.mTypes = new Set(typesMeiose(LAB_O, 0, 0, "indep")); S.mOr = 0; S.mBusy = false; S.mDispo = false; S.cases = new Set(); S.classes = new Set(); S.cpos = new Set(); };
function majSaut() {
  const z = root.querySelector("#saut"), st = ctx.etape();
  if (!z || !st || st.cle !== "v-savoir") return;
  if (ctx.juste("v-savoir") === true && !z.innerHTML) z.innerHTML = `<p class="ctl-note">${ty("Tu connais l’idée : tu peux passer directement à l’énigme.")}</p><button type="button" class="tr-saut" data-aller="mendel">Passer à l’énigme →</button>`;
}
let minuteur = null, jeton = 0;
const CTL = {
  saut: { html: () => '<div id="saut"></div>', init() { majSaut(); } },
  // orient : la petite paire se retourne (un demi-tour visible), puis la méiose se rejoue jusqu'aux quatre cellules
  orient: { html: () => `<div class="ctl"><button type="button" class="ctl-btn" id="ori">Retourne la petite paire</button><button type="button" class="ctl-btn alt${S.mDispo && S.mTypes.size < 4 ? "" : " tr-cache"}" id="montre"${S.mTypes.size >= 4 ? " disabled hidden" : ""}>Montre-moi</button></div><p class="ctl-note" id="orfb"></p><p class="tr-liste" id="orlst"></p>`,
    init() {
      const sc = scenes.meiose; S.mOr = Math.round(sc.p.or2); S.mBusy = false;
      const sync = (k) => {
        const lst = [...S.mTypes];
        $("#orlst").innerHTML = ty(`Types de gamètes obtenus : ${lst.join(" · ")}`);
        $("#orfb").innerHTML = ty(k == null ? `Orientation 1 : ${typesMeiose(LAB_O, 0, 0, "indep").join(" et ")}. Retourne la petite paire.` : `Orientation ${k + 1} : ${typesMeiose(LAB_O, k, 0, "indep").join(" et ")}.${S.mTypes.size >= 4 ? ` Les deux orientations donnent ${S.mTypes.size} types en tout, à égalité.` : ""}`);
      };
      const jouer = async () => {
        if (S.mBusy) return; S.mBusy = true; const my = ++jeton, cible = 1 - S.mOr;
        const ici = () => my === jeton && ctx.etape() && ctx.etape().cle === "orientation";
        ctx.stop(); sc.p.gam = 0; sc.p.ph = 3; sc.p.or2 = S.mOr; sc.render();
        $("#ori").disabled = true;
        await ctx.tween(sc, { or2: cible }, 1000); if (!ici()) { S.mBusy = false; return; }
        await ctx.tween(sc, { ph: 8 }, 4200); if (!ici()) { S.mBusy = false; return; }
        await ctx.tween(sc, { gam: 1 }, 500); if (!ici()) { S.mBusy = false; return; }
        S.mOr = cible; typesMeiose(LAB_O, cible, 0, "indep").forEach((t) => S.mTypes.add(t)); S.mBusy = false;
        const b = $("#ori"); if (b) b.disabled = false;
        sync(cible); if (S.mTypes.size >= 4) { const m = $("#montre"); if (m) { m.disabled = true; m.hidden = true; } }
        ctx.majNav();
      };
      $("#ori").addEventListener("click", jouer);
      $("#montre").addEventListener("click", () => { if (S.mTypes.size < 4) jouer(); });
      sync(S.mTypes.size >= 4 ? S.mOr : null);
      const dispo = () => { if (S.mTypes.size >= 4) return; S.mDispo = true; const m = $("#montre"); if (m) m.classList.remove("tr-cache"); };
      clearTimeout(minuteur); minuteur = setTimeout(() => { const st = ctx.etape(); if (st && st.cle === "orientation") dispo(); }, 20000);
    } },
  // case : l'élève remplit les quatre cases de l'échiquier, une par une (boutons, ou un toucher sur la case)
  case: { html: () => { const c = CAS.f2.cells; return `<div class="ctl">${c.map((x, i) => `<button type="button" class="ctl-btn alt" data-case="${i}">${gam(CAS.f2.cols[x.ci], "un")} avec ${gam(CAS.f2.rows[x.ri], "un")}</button>`).join("")}</div><p class="ctl-note" id="casefb" aria-live="polite"></p>`; },
    init() {
      const sc = scenes.echiquier, c = CAS.f2.cells;
      sc.manual = new Set([...S.cases].map((i) => `0:${i}`));
      const sync = (i) => {
        root.querySelectorAll("[data-case]").forEach((b) => { const k = +b.dataset.case, fait = S.cases.has(k); b.disabled = fait; b.classList.toggle("fait", fait); });
        $("#casefb").innerHTML = ty(i == null ? "Touche une case, ou un bouton." : `Case remplie : ${c[i].geno}, probabilité ${c[i].wlab}.${S.cases.size >= 4 ? " Les quatre cases valent ¼ chacune." : ""}`);
      };
      const remplir = (i) => { if (S.cases.has(i)) return; S.cases.add(i); sc.manual.add(`0:${i}`); sc.render(); sync(i); ctx.majNav(); };
      root.querySelectorAll("[data-case]").forEach((b) => b.addEventListener("click", () => remplir(+b.dataset.case)));
      sc.onCell = (i) => { if (ctx.etape() && ctx.etape().cle === "echiquier") remplir(i); };
      sync(null);
    } },
  // classe : l'élève touche chaque phénotype ; ses cases s'allument et leur compte s'écrit
  classe: { html: () => `<div class="ctl">${CL4.map((c) => `<button type="button" class="ctl-btn alt" data-cl="${c.key}">${c.key}</button>`).join("")}</div><p class="ctl-note" id="clfb" aria-live="polite"></p>`,
    init() {
      const sc = scenes.echiquier;
      const sync = (k) => {
        // tant que les quatre ne sont pas touchés, un phénotype touché se grise ; ensuite tous se rejouent librement
        root.querySelectorAll("[data-cl]").forEach((b) => { const fait = S.classes.has(b.dataset.cl); b.classList.toggle("vu", fait); b.disabled = fait && S.classes.size < 4; });
        const c = CL4.find((x) => x.key === k);
        $("#clfb").innerHTML = ty(k == null ? "Touche un phénotype." : `${k} : ${c.n} case${c.n > 1 ? "s" : ""} sur ${c.N}.${S.classes.size >= 4 ? ` Le compte s’écrit : ${CL4.map((x) => x.n).join(", ")}.` : ""}`);
      };
      root.querySelectorAll("[data-cl]").forEach((b) => b.addEventListener("click", () => { const k = b.dataset.cl; S.classes.add(k); sc.p.cls = k; sc.p.tot = 1; sc.p.leg = 1; sc.render(); sync(k); ctx.majNav(); }));
      sync(null);
    } },
  // curseur : L glisse sur le chromosome ; les recombinés sont calculés à chaque position
  curseur: { html: () => `<div class="ctl"><button type="button" class="ctl-btn" id="loin">Éloigne L</button><button type="button" class="ctl-btn alt" id="pres">Rapproche L</button></div><p class="ctl-note" id="cufb" aria-live="polite"></p>`,
    init() {
      const sc = scenes.carte;
      const sync = () => {
        const d = Math.round(sc.p.cur);
        $("#loin").disabled = d >= CARTE_MAX; $("#pres").disabled = d <= 3;
        $("#cufb").innerHTML = ty(`L à ${d} cM : ${d} % de recombinés, soit ${fr(d / 2, 1).replace(",0", "")} % par classe.${d >= CARTE_MAX ? " À partir de 30 cM environ, cette règle simple ne suffit plus." : ""}`);
      };
      const bouge = (d) => { sc.p.cur = d; sc.render(); S.cpos.add(d); sync(); ctx.majNav(); };
      $("#loin").addEventListener("click", () => bouge(Math.min(CARTE_MAX, Math.round(sc.p.cur) + 3)));
      $("#pres").addEventListener("click", () => bouge(Math.max(3, Math.round(sc.p.cur) - 3)));
      sc.onCur = (d) => { if (ctx.etape() && ctx.etape().cle === "curseur") { S.cpos.add(d); sync(); ctx.majNav(); } };
      sync();
    } },
  // une rédaction ligne à ligne, dans la police de l'interface : les lignes reçoivent leur HTML avant que le noyau n'appelle KaTeX
  lignes: { html: () => "", init(st) { root.querySelectorAll("#body .deriv li").forEach((li) => { const x = st.deriv[+li.dataset.l], m = li.querySelector(".m"); if (m && x && x.h) { m.innerHTML = ty(x.h); m.dataset.done = "1"; m.classList.add("tr-ligne"); } }); } },
};
const surClicL = (e) => { const b = e.target.closest && e.target.closest("[data-aller]");
  if (b && root.contains(b)) { const i = STEPS.findIndex((s) => s.cle === b.dataset.aller); if (i >= 0) ctx.aller(i); return; }
  setTimeout(majSaut, 0); };
const surToucheL = () => setTimeout(majSaut, 0);
root.addEventListener("click", surClicL); window.addEventListener("keydown", surToucheL);

return { BEATS, STEPS, CTL, mots, reset() { resetS(); },
  plain: (s) => s.replace(/ℓ/g, " l ").replace(/\/\//g, " barre ").replace(/⁄/g, " sur "),
  demonter() { clearTimeout(minuteur); jeton++; root.removeEventListener("click", surClicL); window.removeEventListener("keydown", surToucheL); } };
});
}
