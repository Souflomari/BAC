/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « La méiose, la fécondation et les brassages » (SVT, 2ᵉ Bac, filières SVT et PC), séance
 * « Moitié et hasard » (format v3). Plan d'auteur : docs/refonte/specs/meiose-fecondation-brassages.md
 * (le §9, décisions du relecteur, prime sur le reste) ; règles : docs/refonte/07-regles-du-format.md.
 *
 * Onze parties : ce qu'il faut savoir (un test sur le chromosome, qui permet de passer le rappel),
 * l'énigme de Van Beneden (combien de chromosomes apporte chaque noyau de l'œuf ?), les paires
 * (caryotype, homologues, n et 2n), la première division (la réductionnelle), la seconde (l'équationnelle),
 * le hasard des paires (2ⁿ), le crossing-over, la fécondation, le retour à l'énigme, deux exercices
 * types « au bac », puis le bilan. La suite est annoncée à la fin : la transmission des caractères.
 *
 * Les scènes vivent dans meiose-scenes-{a,b,c,d}.js (la figure-clé `meiose` est une scène nouvelle, à
 * trois modes ; `division`, dans -d, montre les deux divisions d'une cellule à 2n = 4 avec des chromosomes bichromatidiens, le fuseau
 * et la plaque équatoriale, pour les étapes de la première et de la seconde division et du hasard des paires), les outils et TOUS les nombres dans meiose-outils.js ; le déroulé, le panneau, les
 * paris, les fiches et les calculs ligne à ligne dans noyau.js. Aucune valeur numérique affichée
 * n'est tapée à la main : elle sort d'un calcul de meiose-outils.js.
 */
import { monterLecon } from "./noyau";
import {
  fr, ent, sciH, millions, M, N, N2, types, couple, N_HOMME, N2_HOMME, T23, C23, ADD23, LEURRE_46, LEURRE_529, N_TROIS,
  N2_BILAN, N_BILAN, N2_BAC2, N_BAC2, ESPECES, etat, ADN_G1, ADN_S, ADN_DIV1, ADN_DIV2, ADN_ZYGOTE, gametes, typesDe, RECOMBINEES,
  outilsScene,
} from "./meiose-outils";
import { scenesA } from "./meiose-scenes-a";
import { scenesB } from "./meiose-scenes-b";
import { scenesC, REPERES } from "./meiose-scenes-c";
import { scenesD } from "./meiose-scenes-d";
import { scenesE } from "./meiose-scenes-e";

const sup = (b, n) => `${b}<sup>${n}</sup>`;

export function monterPilote(root) {
return monterLecon(root, ctx => {
const { scenes, hooks, S } = ctx;
const $ = ctx.$;
const O = outilsScene(ctx);
const { ty } = O;

/* ---------- ce que le script calcule ---------- */
const D8 = ESPECES.droso8, H = ESPECES.homme46, A4 = ESPECES.ascaris4;
const TET_D8 = D8.n, CHROMATIDES_D8 = 2 * D8.n2;                       // tétrades d'une cellule de drosophile ; chromatides après la phase S
// sans crossing-over, avant que D n'arrive : deux gènes, A et B (niveau 1) ; avec le crossing-over : A, D et B (niveau 2)
const G_SANS = typesDe(0, 0, 1), G_SANS2 = typesDe(0, 0, 2), G_AVEC = gametes(0, 1, 2);
const NOUVEAUX = G_AVEC.filter((g) => !G_SANS2.some((s) => s.split(" ")[0] === g.split(" ")[0]));   // les types qui n'existent pas sans crossing-over
const TYPES_GRANDE = [...new Set(G_AVEC.map((g) => g.split(" ")[0]))];                             // les types de la grande paire après un échange : AD, Ad, aD, ad
const TOUS = G_AVEC.join(", ");
const gp = (g) => g.split(" ")[0];   // le gamète réduit à la grande paire, comme le dessine la scène « crossing »
const TOUS_GP = G_AVEC.map(gp).join(", "), NOUVEAUX_GP = NOUVEAUX.map(gp).join(" et "), SANS_GP = G_SANS2.map(gp).join(" et ");
// le bilan : les trois pièges, une figure chacun (la scène `quiz` la montre avec la réponse)
const QUIZ = [
  { cap: `*n* = ${N}, à 2 chromatides`, sub: "haploïde : on compte les chromosomes, pas les chromatides" },
  { cap: `2^{${N_BILAN}} = ${ent(types(N_BILAN))}`, sub: `*n* = ${N_BILAN} paires, 2 choix par paire` },
  { cap: "deux chromatides non sœurs", sub: "une de chaque homologue, en prophase I" },
];
// ce que l'élève a compris, cinq lignes (scène `end`)
const FIN = [
  ["Les chromosomes vont par paires d’homologues : 2*n*.", "Le gamète en reçoit un de chaque paire : *n*."],
  ["Division I, réductionnelle : 2*n* devient *n*.", "Division II, équationnelle : *n* reste *n*."],
  [`La quantité d’ADN : ${ADN_G1}*q*, ${ADN_S}*q*, ${ADN_DIV1}*q*, puis *q*.`, "Une réplication, deux divisions."],
  [`Le hasard des paires : 2^{*n*} types de gamètes.`, "Le crossing-over brasse les allèles d’un même chromosome."],
  ["La fécondation rétablit 2*n*", "et multiplie les combinaisons : 2^{*n*} × 2^{*n*}."],
];

scenesA(ctx, O);
scenesB(ctx, O);
scenesC(ctx, O, QUIZ, FIN);
scenesD(ctx, O);
scenesE(ctx, O);

/* ---------- le script ---------- */
const BEATS = [
  { name: "Ce qu’il faut savoir", court: "Savoir" }, { name: "L’énigme", court: "Énigme" }, { name: "Les paires", court: "Paires" },
  { name: "La première division", court: "Div. I" }, { name: "La seconde division", court: "Div. II" },
  { name: "Le hasard des paires", court: "Hasard" }, { name: "Le crossing-over", court: "Crossing" }, { name: "La fécondation", court: "Rencontre" },
  { name: "Retour à l’énigme", court: "Retour" }, { name: "Au bac", court: "Bac" }, { name: "Bilan", court: "Bilan" },
];
const BET = (t) => ({ opts: t.map(([x, fb]) => ({ t: x, fb })) });
// une question : [texte, juste ?, explication, indice (pour une option fausse)]
const VF = (t) => ({ opts: t.map(([x, ok, fb, indice]) => (ok ? { t: x, ok: true, fb } : { t: x, fb, indice })) });
const NOTE_PARI = "Pari noté. La méiose va répondre, et tu le verras toi-même dans la figure.";
const NOTE_PARI_O = "Pari noté. À l’étape suivante, tu retournes la petite paire toi-même, et la figure tranche.";
// l'état de base de la scène `meiose` : tout ce que les étapes précédentes ont pu laisser est remis à zéro
// l'état de base de la scène `division` (les deux divisions d'une cellule à 2n = 4) : `u` est le palier, 0 à 6 ; `o` l'orientation de la petite paire
const DV = (o) => ({ u: 0, o: 0, al: 0, tet: 0, cnt: 0, gam: 0, cmp: 0, frz: 0, mit: 0, rep: 1, alc: 0, pt: 1, ...o });
const MEIOSE_0 = { kar: 0, fec: 0, ph: 0, plq: 0, tet: 0, al: 0, or2: 0, gam: 0, co: 0, chi: 0, cnt: 0, mit: 0, zyg: 0, fcnt: 0, rg: 0, idm: 1, pt: 1, nlab: 1, hap: 0, ori: 1, frz: 0, rc: 0, dbl: 0 };

const STEPS = [
/* ===== 0. ce qu'il faut savoir ===== */
{ cle: "v-savoir", beat: 0, scene: "zoom", set: { z: 0 }, seq: [{ p: { z: 3 }, d: 2600, w: 300 }], ctl: "saut", sujet: "chromosome et chromatides",
  text: ["Avant l’énigme, un test sur le chromosome. Réussi du premier coup, il te permet de passer le rappel.", { t: "Un chromosome en forme de X, c’est…", fort: true }],
  verifie: VF([
    ["un chromosome dupliqué", true, "Oui : les deux bras du X sont deux chromatides identiques, les copies l’une de l’autre."],
    ["deux chromosomes collés", false, "Tu as pris les deux bras du X pour deux chromosomes. Ce sont les deux chromatides d’un seul chromosome dupliqué.", "Les deux bras du X sont-ils des copies l’un de l’autre ?"],
    ["la forme de tout chromosome", false, "Tu as cru que tout chromosome a la forme d’un X. Avant la copie de l’ADN, il n’a qu’une chromatide.", "Un chromosome qui n’a pas encore été copié a-t-il deux bras ?"]]) },
{ cle: "sav-chromatides", beat: 0, scene: "division", set: DV({ u: 0, rep: 0 }), seq: [{ p: { rep: 1 }, d: 2400, w: 700 }],
  text: ["Voici une cellule à 4 chromosomes. Avant de se diviser, elle copie son ADN : c’est la phase S.",
    { t: "Un chromosome non copié n’a qu’une [[chromatide]], une seule molécule d’ADN.", a: 0 },
    { t: "Après la copie, il en a deux : des chromatides sœurs, identiques tant qu’il n’y a pas eu de crossing-over, reliées par le [[centromere|centromère]].", a: 0, fort: true }] },

/* ===== 1. l'énigme ===== */
{ cle: "ascaris", beat: 1, scene: "meiose", tag: "1883 · Van Beneden", set: { ...MEIOSE_0, fec: 1, esp: "ascaris4" },
  text: ["1883, à Liège. Édouard Van Beneden observe la fécondation chez l’Ascaris, un ver parasite du cheval.",
    `L’œuf fécondé porte ${A4.n2} chromosomes. Les noyaux du spermatozoïde et de l’ovule sont encore séparés : on peut les compter.`,
    { t: "Combien de chromosomes apporte le noyau du spermatozoïde ?", fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { fcnt: 1 }, d: 2400 }], opts: [
    { t: `${A4.n2}, comme l’œuf entier`, fb: `Van Beneden en compte ${A4.n} dans chaque noyau : ${A4.n} et ${A4.n} font les ${A4.n2} de l’œuf. Avec ${A4.n2} chacun, l’œuf en aurait ${2 * A4.n2}.` },
    { t: `${A4.n}`, fb: `Van Beneden en compte ${A4.n} dans chaque noyau : ${A4.n} et ${A4.n} font les ${A4.n2} de l’œuf.` },
    { t: "1", fb: `Van Beneden en compte ${A4.n} dans chaque noyau, pas 1 : ${A4.n} et ${A4.n} font les ${A4.n2} de l’œuf.` }] } },
{ cle: "doublement", beat: 1, scene: "meiose", set: { fcnt: 1, zyg: 0, dbl: 1 }, sujet: "la fécondation additionne",
  text: [`Imagine que chaque gamète apporte ${A4.n2} chromosomes, et que la fécondation réunisse les deux lots.`, { t: `Combien l’œuf aurait-il de chromosomes ?`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { zyg: 1 }, d: 1800 }], apres: { html: `Dans la réalité, ${A4.n} et ${A4.n} : l’œuf garde ${A4.n2} chromosomes, et le nombre ne grandit pas. Chaque gamète a donc la moitié des chromosomes : comment une cellule fait-elle exactement cette moitié ?` },
    ...VF([
      [`${2 * A4.n2}`, true, `Oui : ${A4.n2} et ${A4.n2} font ${2 * A4.n2}. À la génération suivante, ${4 * A4.n2}, puis ${8 * A4.n2} : or le nombre de chromosomes d’une espèce ne change pas.`],
      [`${A4.n2}`, false, `Tu as cru que la fécondation réunit sans additionner. Deux lots de chromosomes se retrouvent dans l’œuf : ils s’ajoutent.`, "L’œuf reçoit un lot du spermatozoïde et un lot de l’ovule. Que fait-on de deux lots réunis ?"],
      [`${A4.n2 * A4.n2}`, false, `Tu as multiplié les deux lots. On réunit ${A4.n2} et ${A4.n2} chromosomes : on les ajoute, on ne les multiplie pas.`, "Réunir deux lots, est-ce les multiplier ou les ajouter ?"]]) } },

/* ===== 2. les paires ===== */
{ cle: "caryotype", beat: 2, scene: "meiose", set: { ...MEIOSE_0, kar: 1, esp: "droso8", nlab: 0 }, sujet: "2n et n",
  text: ["Un [[caryotype]] range les chromosomes d’une cellule, photographiés pendant une mitose, par paires de même taille et de même forme.",
    "On note 2<i>n</i> le nombre de chromosomes de la cellule, et <i>n</i> celui d’un gamète.",
    `Chez la drosophile, une cellule a ${D8.n2} chromosomes, en ${D8.n} paires. Que valent 2<i>n</i> et <i>n</i> ?`],
  verifie: { reveal: [{ p: { nlab: 1 }, d: 500 }], apres: { html: `<i>n</i> est aussi le nombre de paires : ici, ${D8.n}.` }, ...VF([
    [`2<i>n</i> = ${D8.n2} et <i>n</i> = ${D8.n}`, true, `Oui : 2<i>n</i> compte les chromosomes, ${D8.n2} ; <i>n</i> en est la moitié, ${D8.n}.`],
    [`2<i>n</i> = ${D8.n} et <i>n</i> = ${D8.n / 2}`, false, `Tu as pris le nombre de paires pour 2<i>n</i>. 2<i>n</i> compte les chromosomes : ${D8.n2}, donc <i>n</i> = ${D8.n}.`, "Combien de chromosomes sur la figure, en tout ?"],
    [`2<i>n</i> = ${2 * D8.n2} et <i>n</i> = ${D8.n2}`, false, `Tu as doublé encore. 2<i>n</i> est déjà le nombre de chromosomes de la cellule, ${D8.n2} ; <i>n</i> celui du gamète.`, `La cellule a ${D8.n2} chromosomes : est-ce 2<i>n</i> ou <i>n</i> ?`]]) } },
{ cle: "homologues", beat: 2, scene: "meiose", set: { ...MEIOSE_0, kar: 1, esp: "droso8", al: 1 },
  text: ["Chaque paire réunit deux [[homologue|chromosomes homologues]] : l’un vient du père, en rouge, l’autre de la mère.",
    { t: "Ils portent les mêmes gènes, aux mêmes places, mais pas forcément les mêmes [[allele|allèles]] : A sur l’un, a sur l’autre.", fort: true }] },
{ cle: "homo-soeurs", beat: 2, scene: "division", set: DV({ u: 0, al: 1, alc: 1 }), sujet: "homologues et chromatides sœurs",
  text: ["Voici une cellule après la phase S : la figure écrit l’allèle de chaque chromatide, pour deux gènes.", { t: "Qui porte forcément les mêmes allèles : les deux chromatides d’un chromosome, ou les deux chromosomes d’une paire ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["les deux chromatides sœurs", true, "Oui : les chromatides sœurs sont des copies, identiques avant tout crossing-over. Les deux homologues, eux, peuvent porter A et a."],
    ["les deux chromosomes d’une paire", false, "Tu as confondu homologues et chromatides sœurs. L’un vient du père, l’autre de la mère : ils peuvent différer, A et a.", "Deux homologues viennent-ils du même parent ?"],
    ["les deux, à la fois", false, "Seules les chromatides sœurs sont des copies. Deux homologues peuvent porter A et a.", "Une chromatide sœur est une copie. Un homologue en est-il une ?"]]) } },
{ cle: "v-haploide", beat: 2, scene: "meiose", set: { ...MEIOSE_0, kar: 1, esp: "droso8" }, sujet: "haploïde et diploïde",
  text: [{ t: `Une cellule haploïde de drosophile (<i>n</i>\u00A0=\u00A0${D8.n}) contient…`, fort: true }],
  verifie: { reveal: [{ p: { hap: 1 }, d: 900 }], ...VF([
    [`un de chaque paire, soit ${D8.n}`, true, `Oui : un chromosome de chaque paire, ${D8.n} en tout.`],
    [`${D8.n} paires de chromosomes`, false, `Tu as compté des paires. ${D8.n} paires font ${D8.n2} chromosomes : c’est 2<i>n</i>, pas <i>n</i>.`, `${D8.n} paires, combien de chromosomes cela fait-il ?`],
    [`${D8.n / 2} paires de chromosomes`, false, `<i>n</i> = ${D8.n} compte des chromosomes, pas des paires. Un gamète n’a aucune paire.`, "<i>n</i> compte-t-il des paires ou des chromosomes ?"]]),
    apres: { html: "Une cellule à 2<i>n</i> chromosomes, en paires, est [[diploide|diploïde]]. Une cellule à <i>n</i> chromosomes, un de chaque paire, est [[haploide|haploïde]]." } } },
{ cle: "quelle-moitie", beat: 2, scene: "meiose", set: { ...MEIOSE_0, kar: 1, esp: "ascaris4" },
  text: ["Dans une cellule, les chromosomes vont par paires : un chromosome du père, en rouge, et un de la mère.", "Un gamète reçoit un chromosome de chaque paire.", { t: "Lequel ?", fort: true }],
  pari: { label: "Ton pari", apres: { html: "Deux frères nés des mêmes parents ne sont presque jamais identiques, sauf les vrais jumeaux. La leçon répond à deux questions : comment une cellule divise-t-elle exactement ses chromosomes par deux, et pourquoi chaque gamète est-il différent ?" },
    ...BET([["toujours celui du père", NOTE_PARI], ["au hasard, paire par paire", NOTE_PARI], ["soit tous ceux du père, soit tous ceux de la mère", NOTE_PARI]]) } },

/* ===== 3. la première division ===== */
{ cle: "interphase", beat: 3, scene: "division", set: DV({ u: 0, rep: 0, cnt: 1 }), sujet: "l’ADN après la phase S",
  text: ["Avant la [[meiose|méiose]], comme avant une mitose, la cellule copie son ADN : c’est la phase S.", `On compte l’ADN en <i>q</i> : un gamète en vaut <i>q</i>, et la cellule de départ (2<i>n</i> = ${N2}), avant la copie, en vaut ${ADN_G1}<i>q</i>.`, { t: "Que vaut-elle après la phase S ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rep: 1 }, d: 1600 }], ...VF([
    [`${ADN_S}<i>q</i>`, true, `Oui : le nombre de chromosomes reste ${N2}, mais chaque chromosome a doublé : ${etat(1).chromatides} chromatides, ${ADN_S}<i>q</i>.`],
    [`${ADN_G1}<i>q</i>`, false, `Tu as cru que l’ADN suit le nombre de chromosomes, qui reste ${N2}. La réplication double l’ADN : ${ADN_S}<i>q</i>.`, "Le nombre de chromosomes ne change pas en phase S. Et chaque chromosome ?"],
    ["<i>q</i>", false, `Tu as cru que la cellule se prépare déjà à diviser par deux. La réplication double toujours l’ADN : ${ADN_S}<i>q</i>.`, "La phase S copie l’ADN : la quantité monte-t-elle ou baisse-t-elle ?"]]) } },
{ cle: "tetrade", beat: 3, scene: "division", set: DV({ u: 0 }), seq: [{ p: { u: 1 }, d: 2400, w: 600 }, { p: { tet: 1 }, d: 500 }], sujet: "compter les tétrades",
  text: ["Prophase I : les homologues se rapprochent et s’accolent sur toute leur longueur.", { t: `Chaque paire devient une [[tetrade|tétrade]] : 4 chromatides. La figure en montre deux, pour ${N2} chromosomes.`, a: 1 },
    { t: `Chez la drosophile (2<i>n</i> = ${D8.n2}), combien de tétrades en prophase I ?`, a: 1, fort: true }],
  pari: { label: "Réponds", ...VF([
    [`${TET_D8}`, true, `Oui : une tétrade, c’est une paire. ${TET_D8} paires, ${TET_D8} tétrades, de 4 chromatides chacune.`],
    [`${D8.n2}`, false, `Tu as compté des chromosomes. Une tétrade, c’est une paire : ${D8.n2} chromosomes font ${TET_D8} paires.`, "Une tétrade réunit combien de chromosomes ?"],
    [`${CHROMATIDES_D8}`, false, `Tu as compté des chromatides : ${CHROMATIDES_D8} en tout, mais 4 par tétrade, donc ${CHROMATIDES_D8 / 4} tétrades.`, "Combien de chromatides dans une tétrade ?"]]) } },
{ cle: "metaphase1", beat: 3, scene: "division", set: DV({ u: 1 }), seq: [{ p: { u: 1.5 }, d: 1800 }],
  text: ["Les tétrades rejoignent la plaque équatoriale, au milieu de la cellule.", { t: "Comment les chromosomes s’y placent-ils ?", fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { u: 2 }, d: 1800 }, { p: { mit: 1 }, d: 1300 }], opts: [
    { t: "un par un, alignés, comme en mitose", fb: "Ce serait vrai si la méiose était deux mitoses. En métaphase I, les paires se placent de part et d’autre de la plaque." },
    { t: "par paires, un homologue de chaque côté de la plaque", fb: "Oui : en métaphase I, les paires se placent de part et d’autre de la plaque, un homologue de chaque côté. La mitose, à droite, les aligne un par un." },
    { t: "en désordre", fb: "Pas de désordre : sur la plaque, les chromosomes sont par paires en métaphase I. La mitose, à droite, les aligne un par un." }] } },
{ cle: "anaphase1", beat: 3, scene: "division", set: DV({ u: 2 }), sujet: "ce que sépare l’anaphase I",
  text: ["Les paires sont sur la plaque.", { t: "Que va séparer l’anaphase I ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 2.6 }, d: 2000 }], ...VF([
    ["les homologues de chaque paire", true, "Oui : chaque homologue part vers un pôle, avec ses deux chromatides."],
    ["les chromatides sœurs de chaque chromosome", false, "Tu as appliqué ce que fait la mitose. En métaphase I, ce sont les paires qui sont à cheval sur la plaque : on les sépare.", "Dans la figure, que voit-on de part et d’autre de la plaque : des chromosomes seuls ou des paires ?"],
    ["rien : les paires restent entières", false, "Alors aucune cellule ne serait haploïde. Pour réduire le nombre de chromosomes, il faut séparer les paires.", `Si les paires restent entières, chaque cellule garde-t-elle ses ${N2} chromosomes ?`]]) } },
{ cle: "telophase1", beat: 3, scene: "division", set: DV({ u: 2.85 }), seq: [{ p: { u: 3 }, d: 1000, w: 300 }], sujet: "la division réductionnelle",
  text: ["Fin de la division I : la cellule s’est partagée en deux.", { t: "Chaque cellule obtenue contient…", fort: true }],
  verifie: { reveal: [{ p: { cnt: 1 }, d: 700 }], apres: { html: "C’est la [[reductionnelle|division réductionnelle]] : 2<i>n</i> devient <i>n</i>. Une première question de l’énigme est résolue : la moitié exacte, c’est un chromosome de chaque paire. Ces chromosomes à 2 chromatides sont [[bichromatidien|bichromatidiens]]." }, ...VF([
    [`<i>n</i> = ${etat(5).chrom} chromosomes à 2 chromatides`, true, `Oui : un chromosome de chaque paire, encore à deux chromatides : ${etat(5).chrom} chromosomes, ${etat(5).adn}<i>q</i>.`],
    [`2<i>n</i> = ${N2} chromosomes à 1 chromatide`, false, `Tu as pensé mitose, avec des chromatides séparées. Ici, ce sont les homologues qui sont partis : <i>n</i> = ${etat(5).chrom}.`, "Qu’est-ce qui s’est séparé à l’anaphase I : des chromatides ou des homologues ?"],
    [`<i>n</i> = ${etat(5).chrom} chromosomes à 1 chromatide`, false, "Tu as cru qu’haploïde veut dire une chromatide. Les chromatides ne se sont pas encore séparées : elles le feront à la division II.", "À la division I, les chromatides sœurs se sont-elles séparées ?"]]) } },

/* ===== 4. la seconde division ===== */
{ cle: "metaphase2", beat: 4, scene: "division", set: DV({ u: 3 }), seq: [{ p: { u: 4 }, d: 2200, w: 400 }], sujet: "la cellule en métaphase II",
  text: ["Division II : chacune des deux cellules se prépare à se diviser à son tour.", "Ses chromosomes se placent un par un sur la plaque.", { t: "En métaphase II, chaque cellule est…", fort: true }],
  verifie: VF([
    ["haploïde, à chromosomes à 2 chromatides", true, `Oui : ${etat(6).chrom} chromosomes, sans paire, encore à deux chromatides.`],
    ["diploïde, car chaque chromosome a 2 chromatides", false, `Tu as compté des chromatides comme des chromosomes. La cellule a ${etat(6).chrom} chromosomes, sans aucun homologue : elle est haploïde, <i>n</i>.`, "Y a-t-il encore des paires dans la cellule ?"],
    ["haploïde, à chromosomes à 1 chromatide", false, "Tu as cru qu’haploïde veut dire une chromatide. La seconde division n’a pas encore eu lieu : les chromatides sont encore jointes.", "Les chromatides se séparent à quelle phase de la division II ?"]]) },
{ cle: "anaphase2", beat: 4, scene: "division", set: DV({ u: 4 }), sujet: "ce que sépare l’anaphase II",
  text: [{ t: "Que sépare l’anaphase II ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 5 }, d: 2000 }], ...VF([
    ["les chromatides sœurs de chaque chromosome", true, "Oui : chaque chromatide part vers un pôle. Les chromosomes n’ont plus qu’une chromatide."],
    ["les homologues de chaque paire", false, `Tu as repris la division I. Il n’y a plus de paire dans la cellule : un seul chromosome de chaque paire, <i>n</i> = ${etat(6).chrom}.`, "Y a-t-il encore des homologues à séparer dans cette cellule ?"],
    ["rien : les chromosomes restent entiers", false, `Alors les quatre cellules auraient des chromosomes à deux chromatides, et ${ADN_DIV1}<i>q</i>. Un gamète vaut <i>q</i> : il faut séparer les chromatides.`, "Un gamète vaut q. Combien vaut une cellule à chromosomes encore à deux chromatides ?"]]) } },
{ cle: "quatre-cellules", beat: 4, scene: "division", set: DV({ u: 5 }), seq: [{ p: { u: 6, cnt: 1 }, d: 2200, w: 500 }],
  text: [`Quatre cellules, chacune avec ${etat(8).chrom} chromosomes à une seule chromatide, [[monochromatidien|monochromatidiens]], et <i>q</i> d’ADN.`, { t: "C’est la [[equationnelle|division équationnelle]] : le nombre de chromosomes ne change pas, comme dans une mitose.", a: 0 }, { t: "Une réplication, deux divisions.", a: 0, fort: true }] },
{ cle: "ou-reduction", beat: 4, scene: "division", set: DV({ u: 6, cnt: 1 }), sujet: "où le nombre de chromosomes est divisé par deux",
  text: ["Deux divisions se sont suivies.", { t: "À quel moment le nombre de chromosomes est-il divisé par deux ?", fort: true }],
  verifie: { reveal: [{ p: { frz: 1 }, d: 800 }], ...VF([
    ["à la division I", true, "Oui : 2<i>n</i> devient <i>n</i> quand les homologues se séparent, à la division I."],
    ["à la division II", false, "Tu as pris la quantité d’ADN pour le nombre de chromosomes. À la division II, c’est l’ADN qui est divisé par deux ; <i>n</i> reste <i>n</i>.", "À la division II, le nombre de chromosomes change-t-il, ou celui des chromatides ?"],
    ["aux deux, à chaque division", false, "Tu as divisé deux fois. Le nombre passe de 2<i>n</i> à <i>n</i> à la division I, puis reste <i>n</i>.", "Combien de chromosomes dans les cellules après la division I ? Et après la II ?"]]) } },
{ cle: "gonosomes", beat: 4, scene: "meiose", set: { ...MEIOSE_0, kar: 1, esp: "homme46" }, sujet: "les gonosomes dans le gamète",
  text: [`Chez l’Homme, 2<i>n</i> = ${H.n2} : ${H.auto} paires d’[[autosome|autosomes]] et une paire de [[gonosome|chromosomes sexuels]], XX chez la femme, XY chez l’homme.`,
    `On écrit 2<i>n</i> = ${H.n2 - 2}A + XY chez l’homme.`, { t: "Quelle est la formule d’un spermatozoïde ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    [`<i>n</i> = ${H.auto}A + X (ou Y)`, true, `Oui : X et Y sont homologues, ils se séparent à la division I comme les autres paires. Un spermatozoïde porte X ou Y.`],
    [`<i>n</i> = ${H.auto}A + XY`, false, "Tu as gardé la paire XY ensemble. X et Y sont homologues : ils se séparent à la division I, comme les autres paires.", "X et Y forment une paire : que devient une paire dans un gamète ?"],
    [`<i>n</i> = ${H.n}A + X`, false, `Tu as divisé ${H.n2} au lieu de ${H.n2 - 2}. Les ${H.n2 - 2} autosomes donnent ${H.auto} ; le gonosome se compte à part.`, "Combien d’autosomes dans la cellule ? Et dans le gamète ?"]]) } },
{ cle: "courbe", beat: 4, scene: "adn", set: { seg: 0, mit: 0, hl: 0, pal: 0, fec: 0, lab2: 0 }, seq: [{ p: { seg: 3 }, d: 3000, w: 300 }, { p: { seg: 5 }, d: 2200, w: 300 }], sujet: "la courbe de l’ADN",
  text: [{ t: `La quantité d’ADN double en phase S, puis la division I la partage : ${ADN_G1}<i>q</i>, ${ADN_S}<i>q</i>, ${ADN_DIV1}<i>q</i>.`, a: 0 }, { t: "Elle descend encore une fois.", a: 1 }, { t: `Que représente la chute de ${ADN_DIV1}<i>q</i> à <i>q</i> ?`, a: 1, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { hl: 1, lab2: 1 }, d: 900 }], ...VF([
    ["la division II : chromatides sœurs séparées", true, "Oui : la seconde chute est la division II, où les chromatides sœurs se séparent et se partagent entre deux cellules."],
    ["la réduction du nombre de chromosomes", false, "Tu as confondu quantité d’ADN et nombre de chromosomes. La réduction a eu lieu à la première chute, à la division I.", "Combien de chromosomes avant et après cette seconde chute ?"],
    ["la phase S, qui copie l’ADN", false, "La phase S fait monter la courbe, de 2<i>q</i> à 4<i>q</i>. Une chute est un partage de l’ADN entre deux cellules.", "La phase S fait-elle monter ou descendre la quantité d’ADN ?"]]) } },
{ cle: "schema-phases", beat: 4, scene: "schema", set: { on: 1, pl: 0 }, ctl: "schema", need: () => S.schema >= REPERES.length, needLabel: "Place les légendes", sujet: "légender les phases",
  text: [{ t: "Trois questions décident d’une phase : des paires ? une ou deux chromatides ? sur la plaque ou vers les pôles ?", fort: true }, "Pour chaque repère, du 1 au 6, choisis la légende."] },

/* ===== 5. le hasard des paires ===== */
{ cle: "rappel", beat: 5, scene: "adn", set: { seg: 5, mit: 0, hl: 0, pal: 1, fec: 0 }, sujet: "les chromosomes à chaque phase",
  text: ["Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.", { t: `Drosophile, 2<i>n</i> = ${D8.n2} : en métaphase II, chaque cellule contient…`, fort: true }],
  verifie: VF([
    [`${D8.n} chromosomes à 2 chromatides`, true, `Oui : la division I a réduit ${D8.n2} à ${D8.n}, et les chromatides ne se séparent qu’à l’anaphase II.`],
    [`${D8.n2} chromosomes à 2 chromatides`, false, `La réduction a eu lieu à la division I : chaque cellule n’a plus que <i>n</i> = ${D8.n} chromosomes.`, "Combien de chromosomes reste-t-il après la division I ?"],
    [`${D8.n} chromosomes à 1 chromatide`, false, "Les chromatides se séparent seulement à l’anaphase II : en métaphase II, elles sont encore deux.", "À quelle phase les chromatides sœurs se séparent-elles ?"]]) },
{ cle: "alleles", beat: 5, scene: "division", set: DV({ u: 2, al: 1 }), seq: [{ p: { u: 6 }, d: 4600, w: 600 }, { p: { gam: 1 }, d: 600 }],
  text: ["Écrivons les allèles : A et a pour la grande paire, B et b pour la petite.",
    { t: "Dans cette orientation, les deux chromosomes du père partent du même côté.", a: 0 },
    { t: `Ils arrivent dans les mêmes cellules : ${G_SANS.length} types de gamètes seulement, ${G_SANS.join(" et ")}.`, a: 1 },
    { t: "Retourne en pensée la petite paire : quels gamètes sortent ?", a: 1, fort: true }],
  pari: { label: "Ton pari", ...BET([[`${typesDe(1, 0, 1).join(" et ")}`, NOTE_PARI_O], ["encore " + G_SANS.join(" et ") + " : les chromosomes d’un même parent restent ensemble", NOTE_PARI_O], ["les quatre types à la fois", NOTE_PARI_O]]) } },
{ cle: "orientation", beat: 5, scene: "division", tag: "1903 · Sutton", set: DV({ u: 2, al: 1, cmp: 1 }), ctl: "orient", need: () => S.mTypes.size >= 4, needLabel: "Retourne la petite paire", sujet: "l’orientation des paires",
  text: () => [{ 1: "Tu avais parié sur le hasard, paire par paire.", 0: "Tu avais parié sur « toujours celui du père ». Voyons ce que fait la petite paire.", 2: "Tu avais parié sur « tout le père ou toute la mère ». Voyons ce que fait la petite paire." }[ctx.rep("quelle-moitie")] || "Voyons ce que fait la petite paire.",
    "1903 : Sutton parie que la position de chaque paire sur la plaque est due au hasard.", "À toi de tester : retourne la petite paire, puis regarde les gamètes."] },
{ cle: "une-cellule", beat: 5, scene: "division", set: DV({ u: 2, al: 1 }), sujet: "une cellule, combien de types",
  text: ["Dans la figure, une seule cellule fait sa méiose, sans crossing-over.", { t: "Combien de types de gamètes produit-elle ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 6 }, d: 4200 }, { p: { gam: 1 }, d: 600 }], apres: { html: "Pour chaque paire, un gamète reçoit soit le chromosome du père, soit celui de la mère : 2 choix." }, ...VF([
    [`${typesDe(0, 0, 1).length}`, true, `Oui : une cellule n’a qu’une orientation à la métaphase I, donc ${typesDe(0, 0, 1).length} types de gamètes (ici ${G_SANS.join(" et ")}).`],
    [`${typesDe(0, 0, 1).length * 2}`, false, "Tu as confondu une cellule et l’ensemble des cellules. Les 4 types viennent de cellules orientées différemment : une cellule n’a qu’une orientation.", "Combien d’orientations une même cellule a-t-elle à la métaphase I ?"],
    ["1", false, "Les deux homologues d’une paire partent dans des cellules différentes : les 4 gamètes ne sont pas tous identiques.", "Les deux homologues d’une paire partent-ils dans la même cellule ?"]]) } },
{ cle: "deux-paires", beat: 5, scene: "table", set: { rows: 2, vis: 2, pr: 1, prv: 1, cpl: 0, cv: 0, big: 0, cro: 0 },
  text: ["Avec ces 2 paires, chez un individu entier, des milliers de cellules font leur méiose.", { t: `Dans quelles proportions sortent les ${types(2)} types de gamètes ?`, fort: true }],
  pari: { label: "Ton pari", reveal: [{ p: { prv: 2 }, d: 600 }], opts: [
    { t: `1/${types(2)} chacun`, fb: `Oui : chaque paire s’oriente au hasard, de deux façons également probables. Les ${types(2)} types sortent à égalité, 1 sur ${types(2)}.` },
    { t: `surtout ${G_SANS[0]} et ${G_SANS[1]} : les chromosomes d’un même parent restent ensemble`, fb: `Tu as supposé que les gamètes gardent les chromosomes d’un même parent. Chaque orientation est aussi probable : chaque type sort 1 fois sur ${types(2)}.` },
    { t: "au hasard, sans proportion fixe", fb: `Le hasard a une règle : les deux orientations de chaque paire sont aussi probables. Chaque type sort 1 fois sur ${types(2)}.` }] } },
{ cle: "trois-paires", beat: 5, scene: "table", set: { rows: 3, vis: 2, pr: 0, prv: 0, cpl: 0 }, sujet: "la règle 2ⁿ",
  text: [{ t: `Avec ${N_TROIS} paires, combien de types de gamètes ?`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { vis: 3 }, d: 700 }], apres: { tex: [["2^{n}", "2ⁿ"]], html: "types de gamètes pour <i>n</i> paires, sans crossing-over." }, ...VF([
    [`${types(N_TROIS)}`, true, `Oui : ${Array(N_TROIS).fill(2).join(" × ")} = ${types(N_TROIS)}. Chaque paire double le nombre de types.`],
    [`${2 * N_TROIS}`, false, `Tu as additionné, 2 par paire. Chaque paire double le nombre de combinaisons : elle ne l’augmente pas de 2.`, "Une paire de plus : le nombre de types double-t-il, ou augmente-t-il de 2 ?"],
    [`${N_TROIS ** 2}`, false, `Tu as calculé ${N_TROIS}². C’est 2 choix par paire, ${N_TROIS} fois : ${Array(N_TROIS).fill(2).join(" × ")}.`, "Chaque paire offre combien de choix ? Combien de paires ?"]]) } },
{ cle: "humain-2-23", beat: 5, scene: "table", set: { rows: 23, vis: 3, big: 1 }, sujet: "2²³ types de spermatozoïdes",
  text: [`Chez l’Homme, <i>n</i> = ${N_HOMME}.`, { t: "Combien de types de spermatozoïdes un homme peut-il produire, sans crossing-over ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { vis: 23 }, d: 800 }], apres: { html: "C’est le [[brassage-inter|brassage interchromosomique]] : le hasard de l’orientation de chaque paire en métaphase I." }, ...VF([
    [`${sup(2, N_HOMME)} ≈ ${millions(T23)}`, true, `Oui : ${sup(2, N_HOMME)} = ${ent(T23)}, soit ${millions(T23)} de types de spermatozoïdes.`],
    [`2 × ${N_HOMME} = ${LEURRE_46}`, false, `Tu as additionné : 2 par paire, ${N_HOMME} paires. Chaque paire double le nombre de types : 2 × 2 × … , ${N_HOMME} fois.`, "Que faisait la règle de trois paires : additionner ou multiplier ?"],
    [`${N_HOMME}² = ${LEURRE_529}`, false, `Tu as calculé ${N_HOMME}². C’est 2 choix par paire, ${N_HOMME} fois : ${sup(2, N_HOMME)}.`, "2 choix par paire, ou 23 choix par paire ?"]]) } },
{ cle: "v-inter", beat: 5, scene: "division", set: DV({ u: 6, al: 1, gam: 1 }), sujet: "brassage et mutation",
  text: [{ t: "Le brassage interchromosomique fait apparaître…", fort: true }],
  verifie: VF([
    ["de nouvelles combinaisons d’allèles", true, "Oui : les allèles existaient déjà, le hasard des paires les combine autrement."],
    ["de nouveaux allèles", false, "Tu as confondu brassage et mutation. Seule une mutation crée un allèle : le brassage mélange ceux qui existent.", "Quel phénomène crée un nouvel allèle : la mutation ou le brassage ?"],
    ["de nouveaux chromosomes", false, "Chaque chromosome passe entier dans un gamète, sans changer, en l’absence de crossing-over. Seules les combinaisons changent.", "Un chromosome est-il modifié quand une paire s’oriente ?"]]) },

/* ===== 6. le crossing-over ===== */
{ cle: "chiasma", beat: 6, scene: "crossing", tag: "1909 · Janssens", set: { u: 0, al: 1, tet: 1, gam: 0, rc: 0 }, sujet: "entre quelles chromatides",
  text: ["En prophase I, deux chromatides de la tétrade peuvent se croiser : un [[chiasma]].", { t: "Pour créer une combinaison d’allèles nouvelle, l’échange de segments doit se faire entre…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 1 }, d: 1800 }], ...VF([
    ["deux chromatides non sœurs", true, "Oui : une chromatide de chaque homologue. Le segment portant D passe sur la chromatide de la mère, d sur celle du père."],
    ["deux chromatides sœurs", false, "Tu as confondu homologues et chromatides sœurs. Échanger deux copies identiques ne changerait rien.", "Deux chromatides sœurs portent-elles des allèles différents ?"],
    ["deux chromosomes de paires différentes", false, "Seuls les homologues sont accolés en prophase I : on n’échange pas entre paires différentes.", "Qui est accolé à qui dans une tétrade ?"]]) } },
{ cle: "echange", beat: 6, scene: "crossing", set: { u: 1, al: 1, tet: 1, gam: 0, rc: 0 }, seq: [{ p: { u: 2 }, d: 1800, w: 400 }], sujet: "les types de gamètes après un échange",
  text: ["Le chiasma se dénoue : les deux chromatides ont échangé un segment. La méiose continue avec cette tétrade.", { t: "Pour la grande paire, cette seule cellule donne…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 4 }, d: 4200 }, { p: { gam: 1, rc: 1 }, d: 600 }],
    apres: { html: "C’est le [[crossing-over]], ou [[brassage-intra|brassage intrachromosomique]] : il crée des combinaisons qui n’existent sur aucun des deux chromosomes de la cellule." }, ...VF([
    [`${TYPES_GRANDE.length} types : ${TYPES_GRANDE.join(", ")}`, true, `Oui : les quatre chromatides sont différentes, et chaque gamète en reçoit une.`],
    [`${G_SANS2.length} types, comme sans crossing-over`, false, `Tu as gardé la règle d’avant. Après l’échange, les deux chromatides sœurs ne sont plus des copies : la division II sépare ${TYPES_GRANDE[0]} et ${TYPES_GRANDE[1]}.`, "Après l’échange, les deux chromatides d’un même chromosome sont-elles encore identiques ?"],
    [`${TYPES_GRANDE.length} types, tous nouveaux`, false, `Seules les deux chromatides du croisement ont changé : ${G_SANS2.map((g) => g.split(" ")[0]).join(" et ")} restent.`, "Combien de chromatides ont pris part à l’échange ?"]]) } },
{ cle: "quand-co", beat: 6, scene: "crossing", set: { u: 4, al: 1, tet: 0, gam: 0, rc: 0 }, sujet: "quand a lieu le crossing-over",
  text: ["Un vrai item du bac : Sciences Physiques, rattrapage 2024, première partie, II.1 (0,5 pt).", { t: "Au cours de la méiose, le crossing-over se déroule lors de…", fort: true }],
  verifie: VF([
    ["la prophase I", true, "Oui : c’est quand les homologues sont accolés en tétrades."],
    ["l’anaphase I", false, "En anaphase I, les homologues se séparent : ils ne sont plus accolés, donc rien ne s’échange.", "À l’anaphase I, les homologues sont-ils encore accolés ?"],
    ["l’anaphase II", false, "En division II, il n’y a plus d’homologues dans la cellule : il n’y a personne avec qui échanger.", "Y a-t-il encore des paires en division II ?"],
    ["la prophase II", false, "En prophase II, la cellule est haploïde : il n’y a plus de paires, donc plus d’échange possible.", "Y a-t-il encore des homologues accolés en prophase II ?"]]) },
{ cle: "v-intra", beat: 6, scene: "crossing", set: { u: 4, al: 1, tet: 0, gam: 1, rc: 0 }, sujet: "les gamètes recombinés",
  text: [`Voici, pour la grande paire, les gamètes d’une cellule avec crossing-over : ${TOUS_GP}.`, { t: "Lesquels n’existeraient pas sans crossing-over ?", fort: true }],
  verifie: { reveal: [{ p: { rc: 1 }, d: 600 }], apres: { html: `Les deux brassages se cumulent. Le premier donne ${sup(2, "<i>n</i>")} combinaisons de chromosomes, ${ent(T23)} chez l’Homme. Le second recombine en plus chaque chromosome : chaque gamète est presque unique.` }, ...VF([
    [NOUVEAUX_GP, true, `Oui : ${NOUVEAUX_GP} portent A avec d, ou a avec D, des combinaisons absentes de la cellule de départ.`],
    [SANS_GP, false, `Tu as pris les combinaisons des chromosomes parentaux. ${G_SANS2[0].split(" ")[0]} et ${G_SANS2[1].split(" ")[0]} existent sans crossing-over : ce sont les chromosomes reçus du père et de la mère.`, "Quelles combinaisons de A, D existaient déjà dans la cellule de départ ?"],
    ["les quatre", false, `${G_SANS2[0].split(" ")[0]} et ${G_SANS2[1].split(" ")[0]} existent sans crossing-over : ce sont les chromosomes du père et de la mère.`, "Combien de combinaisons existaient déjà dans la cellule de départ ?"]]) } },

/* ===== 7. la fécondation ===== */
{ cle: "fecondation", beat: 7, scene: "meiose", set: { ...MEIOSE_0, fec: 1, esp: "homme46", fcnt: 1, zyg: 0 }, sujet: "n + n = 2n",
  text: ["La [[fecondation|fécondation]] réunit un spermatozoïde et un ovule.", { t: `<i>n</i> = ${N_HOMME} et <i>n</i> = ${N_HOMME} donnent…`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { zyg: 1 }, d: 1800 }], ...VF([
    [`une cellule-œuf à 2<i>n</i> = ${N2_HOMME}`, true, `Oui : les deux lots s’ajoutent, ${N_HOMME} + ${N_HOMME} = ${N2_HOMME}.`],
    [`${N_HOMME} chromosomes, comme un gamète`, false, `Tu as cru que la fécondation garde le nombre du gamète. Les deux lots s’ajoutent : ${N_HOMME} + ${N_HOMME}.`, "L’œuf reçoit un lot de chaque gamète. Que fait-on de deux lots réunis ?"],
    [`${2 * N2_HOMME} chromosomes`, false, `Tu as compté ${N2_HOMME} par gamète, ou des chromatides. Chaque gamète apporte ${N_HOMME} chromosomes : ${N_HOMME} + ${N_HOMME} = ${N2_HOMME}.`, "Combien de chromosomes apporte un gamète ?"]]) } },
{ cle: "hasard-fec", beat: 7, scene: "table", set: { rows: 23, vis: 23, big: 1, pr: 0, cpl: 1, cv: 0, cro: 0 }, sujet: "les combinaisons d’un couple",
  text: ["N’importe quel spermatozoïde peut rencontrer n’importe quel ovule.", { t: "Combien de combinaisons de chromosomes un couple peut-il donner à un enfant, sans crossing-over ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { cv: 23 }, d: 800 }, { p: { cro: 1 }, d: 500 }], ...VF([
    [`${sup(2, N_HOMME)} × ${sup(2, N_HOMME)} ≈ ${sciH(C23)}`, true, `Oui : ${ent(T23)} types de spermatozoïdes, ${ent(T23)} types d’ovules, et chacun peut rencontrer chacun : on multiplie.`],
    [`2 × ${sup(2, N_HOMME)} ≈ ${sciH(ADD23)}`, false, "Tu as additionné les gamètes des deux parents. Chaque spermatozoïde se combine avec chaque ovule : on multiplie.", "Un spermatozoïde donné peut rencontrer combien d’ovules différents ?"],
    [`${sup(2, N_HOMME)} ≈ ${millions(T23)}`, false, "Tu as oublié la mère : elle brasse aussi, avec autant de types d’ovules.", "La fécondation ajoute-t-elle les ovules à la combinaison, ou non ?"]]) } },
{ cle: "v-cycle", beat: 7, scene: "adn", set: { seg: 5, mit: 0, hl: 0, pal: 0, fec: 0 }, seq: [{ p: { fec: 1 }, d: 2000, w: 400 }], sujet: "méiose et fécondation alternent",
  text: [`Méiose et fécondation alternent : 2<i>n</i>, puis <i>n</i>, puis de nouveau 2<i>n</i>. La courbe remonte de <i>q</i> à ${ADN_ZYGOTE}<i>q</i>.`, { t: "Sans la méiose, que ferait la fécondation au nombre de chromosomes ?", fort: true }],
  verifie: { apres: { html: "Le caryotype de l’espèce se maintient ainsi de génération en génération." }, ...VF([
    ["elle le doublerait à chaque génération", true, "Oui : deux lots de 2<i>n</i> font 4<i>n</i>. C’est l’énigme de l’Ascaris, 4 + 4 = 8."],
    ["rien : il resterait le même", false, "Tu as oublié que deux lots de 2<i>n</i> se réunissent : 4<i>n</i>. C’est l’énigme de l’Ascaris, 4 + 4 = 8.", "Que donnent deux lots de 2n réunis ?"],
    ["elle le diviserait par deux", false, "La fécondation réunit, elle ne partage pas. Sans méiose, les lots s’ajoutent.", "La fécondation partage-t-elle ou réunit-elle ?"]]) } },

/* ===== 8. retour à l'énigme ===== */
{ cle: "retour-moitie", beat: 8, scene: "meiose", set: { ...MEIOSE_0, fec: 1, esp: "ascaris4", fcnt: 1, zyg: 0 }, sujet: "un chromosome de chaque paire",
  text: () => [{ 1: "Ton pari du début était le bon : un chromosome de chaque paire, au hasard, paire par paire.", 0: "Tu avais parié sur « toujours celui du père » : ce n’est pas le cas, le hasard choisit dans chaque paire.", 2: "Tu avais parié sur « tout le père ou toute la mère » : ce n’est pas le cas, chaque paire choisit à son tour." }[ctx.rep("quelle-moitie")] || "La première question est résolue : un chromosome de chaque paire.",
    "Le gamète reçoit un chromosome de chaque paire ; lequel des deux, c’est le hasard de l’orientation.", { t: "Pourquoi le spermatozoïde de l’Ascaris a-t-il 2 chromosomes ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["la division I a séparé les homologues", true, "Oui : la division I sépare les deux chromosomes de chaque paire, le gamète en reçoit un."],
    ["la division II a séparé ses chromatides", false, "Tu as pensé à la division II. Elle sépare des chromatides et garde <i>n</i> : c’est la division I qui réduit.", "Quelle division fait passer de 2n à n ?"],
    ["il en a perdu 2 au hasard", false, "Il n’a pas perdu 2 chromosomes au hasard : il en a un de chaque paire, jamais deux de la même.", "Chaque gamète reçoit-il toujours un chromosome de chaque paire ?"]]) } },
{ cle: "retour-freres", beat: 8, scene: "table", set: { rows: 23, vis: 23, big: 1, cpl: 0, pr: 0, cro: 0 }, sujet: "deux frères presque jamais identiques",
  text: ["Deux frères, nés du même père : voyons s’ils se ressemblent. Le père a déjà un fils.", { t: "Quelle est la probabilité qu’un second enfant reçoive de lui exactement les mêmes chromosomes, sans crossing-over ?", fort: true }],
  pari: { label: "Réponds", apres: { html: "Avec le crossing-over et la mère, c’est encore beaucoup moins : deux frères ne sont presque jamais identiques. <b>L’énigme est résolue.</b>" }, ...VF([
    [`1 chance sur ${sup(2, N_HOMME)}, soit 1 sur ${millions(T23)}`, true, `Oui : chaque paire donne ½, y compris la paire sexuelle, et les ${N_HOMME} se multiplient : ½ × ½ × … , ${N_HOMME} fois.`],
    ["1 chance sur 2, comme pour une seule paire", false, `Tu as raisonné sur une seule paire. Les ${N_HOMME} paires s’orientent chacune au hasard : ½ × ½ × … , ${N_HOMME} fois.`, "Combien de paires doivent s’orienter comme la première fois ?"],
    [`1 chance sur ${N_HOMME}, une par paire`, false, `Tu as pris une chance par paire. Chaque paire donne ½, et les ${N_HOMME} se multiplient.`, "Une probabilité de ½ par paire : additionne-t-on ou multiplie-t-on pour 23 paires ?"]]) } },
{ cle: "retour-mendel", beat: 8, scene: "division", set: DV({ u: 2, al: 1, pt: 0 }), sujet: "un parent A//a",
  text: ["Un individu porte A sur un chromosome et a sur son homologue : on le note A//a.", { t: "Un parent A//a produit des gamètes…", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["½ A et ½ a", true, "Oui : un gamète a un chromosome de chaque paire, donc A ou a, à égalité. C’est la loi des croisements de la prochaine leçon."],
    ["¼ A, ¼ a et ½ Aa", false, "Tu as cru qu’un gamète peut porter les deux allèles d’une paire. Il a un chromosome de chaque paire : A ou a.", "Un gamète a-t-il un chromosome de chaque paire, ou les deux ?"],
    ["tous A, si A est dominant", false, "Tu as appliqué la dominance à la méiose. La dominance concerne l’individu ; la méiose donne ½ A et ½ a.", "La méiose « voit »-elle quel allèle est dominant ?"]]) } },

/* ===== 9. au bac ===== */
{ cle: "bac-qcm", beat: 9, scene: "division", set: DV({ u: 0 }), sujet: "ce que donne la méiose",
  text: ["Un vrai item du bac : Sciences Physiques, rattrapage 2024, première partie, II.3 (0,5 pt).", { t: "À partir d’une cellule mère diploïde, la méiose donne…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 6 }, d: 4200 }, { p: { cnt: 1 }, d: 500 }], ...VF([
    ["quatre cellules haploïdes avec des chromosomes monochromatidiens", true, "Oui : la division I réduit 2n à n, la division II sépare les chromatides : quatre cellules haploïdes, à une chromatide."],
    ["deux cellules diploïdes avec des chromosomes bichromatidiens", false, "Tu as arrêté au milieu de la méiose. Après la division I, il y a deux cellules, mais elles sont déjà haploïdes ; la division II en fait quatre.", "Après la division I, les cellules ont-elles encore leurs paires ?"],
    ["quatre cellules diploïdes avec des chromosomes bichromatidiens", false, "Tu as gardé 2n. La division I a séparé les homologues : les quatre cellules finales sont haploïdes.", "Les homologues restent-ils ensemble après la division I ?"],
    ["deux cellules haploïdes avec des chromosomes monochromatidiens", false, "Tu as oublié la division II. Elle partage chaque cellule en deux : quatre cellules, et non deux.", "Combien de divisions la méiose comporte-t-elle ?"]]) } },
{ cle: "bac-vf", beat: 9, scene: "division", set: DV({ u: 2, al: 1 }), sujet: "des cellules filles différentes",
  text: ["Un autre vrai item : SVT, rattrapage 2024, première partie, III.a (0,25 pt).", { t: "Vrai ou faux : « Les cellules filles issues de la division réductionnelle de la méiose ont la même information génétique. »", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { u: 3 }, d: 2400 }, { p: { gam: 1 }, d: 500 }], apres: { html: "À l’examen, la méiose tombe surtout en première partie ; les brassages, dans les croisements de la leçon suivante." }, ...VF([
    ["Faux : elles reçoivent chacune un homologue différent", true, "Oui : chaque cellule fille reçoit un homologue de chaque paire, A ou a."],
    ["Vrai : les deux viennent de la même cellule mère", false, "Tu as confondu l’origine et le contenu. Les deux cellules viennent de la même mère, mais chacune reçoit un homologue différent de chaque paire.", "Les deux homologues d’une paire partent-ils dans la même cellule fille ?"],
    ["Vrai : elles ont toutes deux le même nombre n", false, "Tu as confondu le nombre de chromosomes et leur contenu. Les deux cellules ont <i>n</i> chromosomes, mais pas les mêmes allèles.", "Avoir le même nombre de chromosomes, est-ce avoir les mêmes allèles ?"]]) } },
{ cle: "bac-doc", beat: 9, scene: "bac", set: { doc: 1, e1: 0, e2: 0, ex2: 0, sch: 0, foc: 0 }, seq: [{ p: { doc: 1 }, d: 800, w: 300 }],
  text: [`Exercice type, pas un sujet du bac : un animal à 2<i>n</i> = ${N2}, avec l’ADN par cellule (document 1) et trois cellules (document 2).`,
    "Questions : 1. nomme les phases ; 2. situe les cellules sur la courbe ; 3. montre que les gamètes sont haploïdes et différents (barème indicatif : 0,75, 0,75, 1).",
    { t: "Quel est ton premier geste ?", fort: true }],
  pari: { label: "Premier geste ?", reveal: [{ p: { e1: 1 }, d: 1800 }], opts: [
    { t: "Décrire chaque cellule : paires, chromatides, plaque", fb: "C’est le bon réflexe : trois observations décident de la phase, le nombre, les paires et les chromatides." },
    { t: "Nommer d’abord les phases dans l’ordre du cours", fb: "Réciter le cours ne répond pas à la question : il faut exploiter le document. Compte d’abord ce que montre chaque cellule." },
    { t: "Lire d’abord la courbe, puis les cellules", fb: "La courbe ne distingue pas les phases d’une même division ; les cellules, si. Commence par elles." }] } },
{ cle: "bac-phases", beat: 9, scene: "bac", set: { doc: 1, e1: 1, foc: 1 }, ctl: "lignes", sujet: "nommer une phase et la justifier",
  text: ["Question 1 : nomme la phase de chaque cellule, en justifiant (barème indicatif : 0,25 par cellule).", "Voici la ligne de la copie pour la cellule a."],
  deriv: [{ tex: "", alt: `a : ${N2} chromosomes, par paires de part et d’autre de la plaque, à 2 chromatides : métaphase I`,
    h: `<b>a</b> : ${N2} chromosomes, par paires de part et d’autre de la plaque, à 2 chromatides : <b>métaphase I</b>`,
    r: "Seule la métaphase I place des paires de part et d’autre de la plaque. (0,25 indicatif)" }],
  pari: { label: "La ligne pour b ?", apres: { html: `La cellule c : ${N} chromosomes à 2 chromatides, aucune paire, alignés sur la plaque : <b>métaphase II</b>. (0,25 indicatif chacune)` }, ...VF([
    [`b : ${N} chromosomes à 1 chromatide par pôle, aucune paire : anaphase II`, true, "Oui : on sépare des chromatides dans une cellule haploïde. (0,25 indicatif)"],
    [`b : ${N} chromosomes partent vers chaque pôle : anaphase I`, false, "Tu as retenu « des chromosomes partent vers les pôles ». En anaphase I, chaque chromosome a deux chromatides ; ici une seule.", "En anaphase I, les chromosomes ont-ils une ou deux chromatides ?"],
    [`b : ${N} chromosomes à 1 chromatide par pôle : anaphase de mitose`, false, `En mitose, chaque pôle recevrait ${N2} chromosomes (2<i>n</i>). Ici, ${N} par pôle et aucune paire : la cellule est haploïde, c’est l’anaphase II.`, "Combien de chromosomes vers chaque pôle en mitose, pour 2n = 4 ?"]]) } },
{ cle: "bac-courbe", beat: 9, scene: "bac", set: { doc: 1, e1: 1, e2: 0, foc: 2 }, sujet: "situer une cellule sur la courbe",
  text: ["Question 2 : situe les cellules sur la courbe (barème indicatif : 0,75).", { t: "Où placer la cellule c ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { e2: 1 }, d: 1200 }], ...VF([
    [`sur le palier à ${ADN_DIV1}<i>q</i>, entre les deux chutes`, true, `Oui : ${etat(6).chrom} chromosomes à 2 chromatides, c’est ${etat(6).chromatides} chromatides, soit ${etat(6).adn}<i>q</i>. La cellule a fini la division I et pas encore la II.`],
    ["sur le palier à <i>q</i>, car elle est haploïde", false, `Tu as cru que haploïde vaut <i>q</i>. Ses chromatides ne sont pas encore séparées : ${etat(6).chromatides} chromatides, ${etat(6).adn}<i>q</i>.`, "Combien de chromatides a la cellule c ? Un gamète en a combien ?"],
    [`sur le palier à ${ADN_S}<i>q</i>, avant la division I`, false, `${ADN_S}<i>q</i>, c’est avant la division I, quand la cellule a encore ses paires. Ici, ${etat(6).chrom} chromosomes à 2 chromatides : ${etat(6).adn}<i>q</i>.`, "La cellule c a-t-elle encore ses paires ?"]]) } },
{ cle: "bac-copie", beat: 9, scene: "bac", set: { doc: 1, e1: 0, e2: 0, foc: 0 }, ctl: "lignes", sujet: "rédiger la réponse",
  text: ["Question 3 : montre que les gamètes sont haploïdes et différents (barème indicatif : 0,25 par ligne).", "Voici la première ligne de la copie."],
  deriv: [{ tex: "", alt: "La division I sépare les homologues : 2n devient n, les cellules sont haploïdes.",
    h: "La division I sépare les homologues : 2<i>n</i> devient <i>n</i>, les cellules sont haploïdes.", r: "C’est la preuve de « haploïdes ». (0,25 indicatif)" }],
  pari: { label: "La ligne qui prouve « différents » ?", apres: { html: "Dernière ligne : un crossing-over en prophase I ajoute des combinaisons nouvelles. (0,25 indicatif)" }, ...VF([
    [`Chaque paire s’oriente au hasard en métaphase I : ${sup(2, N)} = ${types(N)} types de gamètes`, true, `Oui : le hasard de l’orientation donne ${types(N)} types pour ${N} paires. (0,25 indicatif)`],
    ["La division II sépare des chromatides différentes : 4 types de gamètes", false, "Tu as pensé que la division II brasse. Elle sépare des chromatides sœurs, identiques sans crossing-over.", "Deux chromatides sœurs sont-elles différentes, sans crossing-over ?"],
    ["Une mutation à chaque méiose crée de nouveaux allèles dans les gamètes", false, "Tu as confondu brassage et mutation. La mutation n’a pas lieu à chaque méiose : le hasard des paires suffit.", "La mutation a-t-elle lieu à chaque méiose ?"]]) } },
{ cle: "bac-2", beat: 9, scene: "bac", set: { ex2: 1, e1: 0, e2: 0, sch: 0, foc: 0 }, sujet: "nommer l’anaphase I",
  text: [`À toi, avec un second exercice type : un animal à 2<i>n</i> = ${N2_BAC2}, une cellule en anaphase, ${N_BAC2} chromosomes à 2 chromatides vers chaque pôle.`, "Consigne : nomme la phase et justifie.", { t: "Quelle est la première ligne de la copie ?", fort: true }],
  pari: { label: "La première ligne ?", ...VF([
    [`Anaphase I : les homologues se séparent, ${N_BAC2} chromosomes à 2 chromatides par pôle`, true, `Oui : en anaphase II, une seule chromatide par chromosome partirait. Ici, chaque chromosome garde ses 2 chromatides.`],
    ["Anaphase II : des chromosomes se séparent et partent vers les pôles", false, "Tu as lu « chromosomes qui se séparent » comme anaphase II. En anaphase II, ce sont des chromatides, une seule par chromosome : ici, chaque chromosome a encore ses deux chromatides.", "En anaphase II, qu’est-ce qui se sépare : des chromosomes ou des chromatides ?"],
    ["Anaphase de mitose : des chromosomes à 2 chromatides partent vers les pôles", false, `En mitose, les chromatides se séparent : chaque pôle recevrait ${N2_BAC2} chromosomes à 1 chromatide. Ici, ${N_BAC2} chromosomes à 2 chromatides par pôle.`, "En mitose, qu’est-ce qui part vers chaque pôle : des chromosomes à 1 ou 2 chromatides ?"]]) } },
{ cle: "bac-schema", beat: 9, scene: "bac", set: { ex2: 0, e1: 0, e2: 0, sch: 1, foc: 0 }, sujet: "schématiser l’anaphase I",
  text: [`Un animal à 2<i>n</i> = ${N2}. Trois schémas sont proposés pour une cellule en anaphase I.`, { t: "Lequel est le bon ?", fort: true }],
  pari: { label: "Réponds", ...VF([
    ["le schéma 2", true, `Oui : en anaphase I, les homologues se séparent : ${N} chromosomes à 2 chromatides vont vers chaque pôle.`],
    ["le schéma 1", false, `Tu as dessiné une mitose : ${N2} chromosomes à une chromatide par pôle. En anaphase I, ce sont les homologues qui se séparent, chromatides jointes.`, "Dans le schéma 1, que sépare-t-on : des homologues ou des chromatides ?"],
    ["le schéma 3", false, "Dans ce schéma, les deux homologues d’une même paire vont au même pôle : ils ne se séparent pas.", "Dans le schéma 3, les deux homologues de chaque paire sont-ils séparés ?"]]) } },
{ cle: "bac-erreur", beat: 9, scene: "bac", set: { ex2: 0, doc: 1, e1: 1, e2: 1, sch: 0, foc: 2 }, sujet: "ne pas conclure « diploïde » sur les chromatides",
  text: ["Une copie écrit, sur la cellule c : « c a des chromosomes à deux chromatides, donc elle est diploïde : c’est une métaphase de mitose. »", { t: "Où est l’erreur ?", fort: true }],
  verifie: VF([
    ["elle conclut « diploïde » : sans paire, c est haploïde", true, "Oui : deux chromatides ne font pas une cellule diploïde. c n’a aucune paire, elle est haploïde : métaphase II."],
    ["c’est une mitose, mais il fallait écrire prophase et non métaphase", false, "Les chromosomes sont alignés sur la plaque : c’est bien une métaphase. L’erreur est la conclusion « diploïde ».", "Où sont les chromosomes de la cellule c : dispersés ou sur la plaque ?"],
    ["elle ne devait pas compter les chromatides, seulement les chromosomes", false, "Compter les chromatides est utile : c’est la conclusion « diploïde » qui est fausse, car c n’a aucune paire.", "Compter les chromatides aide-t-il à repérer la phase ?"]]) },

/* ===== 10. bilan ===== */
{ cle: "q1", beat: 10, scene: "quiz", set: { qi: 0, rv: 0 }, sujet: "haploïde et chromatides",
  text: ["Trois pièges des copies, pour finir. Le premier : l’haploïde.", { t: "Une cellule haploïde peut-elle avoir des chromosomes à deux chromatides ?", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    ["oui, en métaphase II", true, "Oui : haploïde compte les chromosomes, un de chaque paire. En métaphase II, ils ont encore deux chromatides."],
    ["non : haploïde veut dire une chromatide", false, "Tu as cru qu’haploïde veut dire une chromatide. Haploïde compte les chromosomes : un de chaque paire.", "Haploïde compte-t-il des chromosomes ou des chromatides ?"],
    ["oui, mais seulement en prophase I", false, "En prophase I, la cellule est diploïde : elle a encore ses paires. Une cellule haploïde à deux chromatides, c’est la métaphase II.", "En prophase I, y a-t-il encore des paires ?"]]) } },
{ cle: "q2", beat: 10, scene: "quiz", set: { qi: 1, rv: 0 }, sujet: "la règle 2ⁿ",
  text: ["Le deuxième : la règle des paires.", { t: `Une espèce à 2<i>n</i> = ${N2_BILAN} : combien de types de gamètes, sans crossing-over ?`, fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    [`${types(N_BILAN)}, soit ${sup(2, N_BILAN)}`, true, `Oui : <i>n</i> = ${N_BILAN} paires, 2 choix par paire : 2<sup>${N_BILAN}</sup> = ${types(N_BILAN)}.`],
    [`${N2_BILAN}, soit 2 × ${N_BILAN}`, false, `Tu as additionné 2 par paire, ou repris 2<i>n</i>. Chaque paire double le nombre : 2<sup>${N_BILAN}</sup>.`, "Chaque paire double-t-elle le nombre de types ?"],
    [`${N_BILAN ** 2}, soit ${N_BILAN}²`, false, `Tu as calculé ${N_BILAN}². C’est 2 choix par paire, ${N_BILAN} fois : 2<sup>${N_BILAN}</sup>.`, "Le nombre de paires est-il la base ou l’exposant ?"]]) } },
{ cle: "q3", beat: 10, scene: "quiz", set: { qi: 2, rv: 0 }, sujet: "le crossing-over",
  text: ["Le troisième : le crossing-over.", { t: "Le crossing-over se produit entre…", fort: true }],
  pari: { label: "Réponds", reveal: [{ p: { rv: 1 }, d: 900 }], ...VF([
    ["deux chromatides non sœurs de deux homologues", true, "Oui : une chromatide de chaque homologue, en prophase I."],
    ["deux chromatides sœurs d’un même chromosome", false, "Les chromatides sœurs sont identiques avant le crossing-over : échanger des segments ne changerait rien. Le crossing-over échange entre homologues.", "Deux chromatides sœurs portent-elles des allèles différents ?"],
    ["deux chromosomes non homologues", false, "Des chromosomes non homologues ne s’apparient pas en prophase I : ils n’échangent rien.", "Qui s’apparie avec qui en prophase I ?"]]) } },
{ cle: "fin", beat: 10, scene: "end", set: { n: 0 }, seq: [{ p: { n: 5 }, d: 3600, w: 300 }],
  text: ["Fin de la séance « Moitié et hasard »."], html: () => finHTML() },
];


/* ---------- les mots ---------- */
const mots = {
  caryotype: { t: "caryotype", d: "L’ensemble des chromosomes d’une cellule, photographiés pendant une mitose, rangés par paires de même taille et de même forme, et numérotés." },
  homologue: { t: "chromosomes homologues", d: "Les deux chromosomes d’une même paire : l’un vient du père, l’autre de la mère. Ils portent les mêmes gènes, aux mêmes places, mais pas forcément les mêmes allèles." },
  allele: { t: "allèle", d: "Une version d’un gène. Chez un individu, les deux chromosomes d’une paire portent chacun une version du même gène : les deux allèles peuvent différer, A et a." },
  autosome: { t: "autosome", d: "Un chromosome qui n’est pas un chromosome sexuel. Chez l’Homme, 44 autosomes, soit 22 paires." },
  gonosome: { t: "gonosome", d: "Un chromosome sexuel : X ou Y. Une femme a deux X (XX), un homme un X et un Y (XY)." },
  diploide: { t: "diploïde", d: "Une cellule diploïde a ses chromosomes en paires : 2<i>n</i> chromosomes." },
  haploide: { t: "haploïde", d: "Une cellule haploïde a un chromosome de chaque paire : <i>n</i> chromosomes. C’est le cas des gamètes. Elle peut avoir des chromosomes à deux chromatides." },
  chromatide: { t: "chromatide", d: "Un chromosome non copié a une chromatide, une molécule d’ADN. Copié, il en a deux, les chromatides sœurs, identiques tant qu’il n’y a pas eu de crossing-over." },
  bichromatidien: { t: "bichromatidien", d: "Un chromosome bichromatidien a deux chromatides : il a été copié, et ses chromatides ne sont pas encore séparées." },
  monochromatidien: { t: "monochromatidien", d: "Un chromosome monochromatidien n’a qu’une chromatide : il n’a pas été copié, ou ses chromatides sont déjà séparées." },
  centromere: { t: "centromère", d: "L’endroit où les deux chromatides sœurs d’un chromosome copié sont reliées. Sur la figure, c’est le rond au milieu du chromosome." },
  meiose: { t: "méiose", d: "La suite de deux divisions qui fabrique les gamètes à partir d’une cellule 2<i>n</i> : une réplication de l’ADN, puis une division réductionnelle et une division équationnelle. Elle donne quatre cellules haploïdes." },
  tetrade: { t: "tétrade", d: "Une paire de chromosomes homologues accolés en prophase I : 4 chromatides. On l’appelle aussi bivalent." },
  reductionnelle: { t: "division réductionnelle", d: "La première division de la méiose : les homologues se séparent, 2<i>n</i> devient <i>n</i>. Les chromosomes gardent leurs deux chromatides." },
  equationnelle: { t: "division équationnelle", d: "La seconde division de la méiose : les chromatides sœurs se séparent, <i>n</i> reste <i>n</i>, comme dans une mitose, mais dans une cellule haploïde." },
  chiasma: { t: "chiasma", d: "L’endroit où deux chromatides d’une tétrade se croisent en prophase I : c’est là qu’elles échangent un segment." },
  "crossing-over": { t: "crossing-over", d: "L’échange de segments entre deux chromatides non sœurs de deux chromosomes homologues, en prophase I. Il crée des combinaisons d’allèles nouvelles sur un même chromosome." },
  "brassage-inter": { t: "brassage interchromosomique", d: "Le mélange dû au hasard de l’orientation de chaque paire de chromosomes en métaphase I : 2<sup><i>n</i></sup> types de gamètes pour <i>n</i> paires." },
  "brassage-intra": { t: "brassage intrachromosomique", d: "Le mélange dû au crossing-over : des allèles d’un même chromosome sont recombinés." },
  fecondation: { t: "fécondation", d: "La rencontre d’un spermatozoïde et d’un ovule : les deux lots de <i>n</i> chromosomes s’ajoutent, la cellule-œuf a 2<i>n</i> chromosomes." },
};

/* ---------- la fin : une ligne de résultat, les paris, les exercices, le détail replié ---------- */
function finHTML() {
  const P = [["q1", "l’haploïde et les chromatides", "l’exercice 2 (les comptes à chaque phase)"], ["q2", "la règle 2<sup>n</sup>", "l’exercice 5 (le nombre de types de gamètes)"], ["q3", "le crossing-over", "l’exercice 8 (quels gamètes sont recombinés)"]];
  const res = P.map(([k]) => ctx.juste(k));
  const rows = res.map((ok, i) => `<li class="${ok === true ? "ok" : ok === false ? "ko" : ""}">${ok === true ? "✓" : ok === false ? "✗" : "·"} ${P[i][1]}</li>`).join("");
  const V = STEPS.filter((s) => s.verifie), vu = V.filter((s) => ctx.juste(s.k) != null), vok = V.filter((s) => ctx.juste(s.k) === true).length;
  const r = (k) => ctx.rep(k), paris = [];
  if (r("ascaris") != null) paris.push(r("ascaris") === 1 ? `tu avais vu ${A4.n} chromosomes par noyau` : `les ${A4.n} chromosomes par noyau t’ont surpris`);
  if (r("quelle-moitie") != null) paris.push(r("quelle-moitie") === 1 ? "tu avais vu le hasard, paire par paire" : "le hasard, paire par paire, t’a surpris");
  if (r("metaphase1") != null) paris.push(r("metaphase1") === 1 ? "tu avais vu les paires de part et d’autre de la plaque" : "les paires de part et d’autre de la plaque t’ont surpris");
  if (r("deux-paires") != null) paris.push(r("deux-paires") === 0 ? "tu avais vu les types sortir à égalité" : "les types à égalité t’ont surpris");
  const ligne = `« Vérifie » réussies du premier coup : <b>${vok} sur ${vu.length || V.length}</b>.`;
  const liste = paris.length ? `<div class="pari-k">Tes paris</div><ul class="me-paris">${paris.map((x) => `<li>${x}</li>`).join("")}</ul>` : "";
  const plan = res.map((ok, i) => (ok === false ? `Le piège « ${P[i][1]} » : ${P[i][2]}.` : null)).filter(Boolean).map((x) => `<li>${x}</li>`).join("");
  const suite = ["la transmission des caractères : ce que la méiose fait aux allèles dans un croisement, avec un parent A//a qui donne ½ A et ½ a", "puis les gènes liés et la carte factorielle, qui mesurent le crossing-over vu ici", "en filière SVT : les erreurs de la méiose, qui changent le nombre de chromosomes"];
  return ty(`<p class="me-res">${ligne}</p>${liste}<a class="lien-exos" href="/pilote/meiose/exercices">Faire les exercices →</a>`
    + `<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>`
    + `${plan ? `<div class="next"><div class="pari-k">Par où commencer les exercices</div><ol>${plan}</ol></div>` : ""}`
    + `<div class="next"><div class="pari-k">La suite</div><ol>${suite.map((x) => `<li>${x}</li>`).join("")}</ol></div></details>`);
}

/* ---------- contrôles par étape ---------- */
S.mTypes = new Set(typesDe(0, 0, 1)); S.mOr = 0; S.mBusy = false; S.mDispo = false;
S.schema = 0; S.schemaKo = new Set();
const resetS = () => { S.mTypes = new Set(typesDe(0, 0, 1)); S.mOr = 0; S.mBusy = false; S.mDispo = false; S.schema = 0; S.schemaKo = new Set(); };
// le test de « Ce qu'il faut savoir », réussi du premier coup : on peut passer le rappel
function majSaut() {
  const z = root.querySelector("#saut"), st = ctx.etape();
  if (!z || !st || st.cle !== "v-savoir") return;
  if (ctx.juste("v-savoir") === true && !z.innerHTML) z.innerHTML = `<p class="ctl-note">${ty("Tu connais l’idée : tu peux passer le rappel.")}</p><button type="button" class="me-saut" data-aller="ascaris">Passer à l’énigme →</button>`;
}
let minuteur = null, jeton = 0;
const CTL = {
  saut: { html: () => '<div id="saut"></div>', init() { majSaut(); } },
  // orient : la petite paire se retourne (un demi-tour visible), puis la méiose se rejoue jusqu'aux quatre cellules
  orient: { html: () => `<div class="ctl"><button type="button" class="ctl-btn" id="ori">Retourne la petite paire</button><button type="button" class="ctl-btn alt${S.mDispo && S.mTypes.size < 4 ? "" : " me-cache"}" id="montre"${S.mTypes.size >= 4 ? " disabled hidden" : ""}>Montre-moi</button></div><p class="ctl-note" id="orfb"></p><p class="me-liste" id="orlst"></p>`,
    init() {
      const sc = scenes.division; S.mOr = Math.round(sc.p.o); S.mBusy = false; if (S.mTypes.size >= 4) { sc.p.cmp = 2; sc.render(); }
      const sync = (k) => {
        const lst = [...S.mTypes];
        $("#orlst").innerHTML = ty(`Types de gamètes obtenus : ${lst.join(" · ")}`);
        $("#orfb").innerHTML = ty(k == null ? `Orientation 1 : ${typesDe(0, 0, 1).join(" et ")}. Retourne la petite paire.` : `Orientation ${k + 1} : ${typesDe(k, 0, 1).join(" et ")}.${S.mTypes.size >= 4 ? ` Les deux orientations donnent ${S.mTypes.size} types en tout.` : ""}`);
      };
      const jouer = async () => {
        if (S.mBusy) return; S.mBusy = true; const my = ++jeton, cible = 1 - S.mOr;
        const ici = () => my === jeton && ctx.etape() && ctx.etape().cle === "orientation";
        ctx.stop(); sc.p.gam = 0; sc.p.u = 2; sc.p.o = S.mOr; sc.p.cmp = S.mTypes.size >= 4 ? 2 : 1; sc.render();
        $("#ori").disabled = true;
        await ctx.tween(sc, { o: cible }, 1000); if (!ici()) { S.mBusy = false; return; }
        await ctx.tween(sc, { u: 6 }, 4200); if (!ici()) { S.mBusy = false; return; }
        await ctx.tween(sc, { gam: 1 }, 500); if (!ici()) { S.mBusy = false; return; }
        S.mOr = cible; typesDe(cible, 0, 1).forEach((t) => S.mTypes.add(t)); S.mBusy = false; ctx.tween(sc, { cmp: S.mTypes.size >= 4 ? 2 : 1 }, 500);
        const b = $("#ori"); if (b) b.disabled = false;
        sync(cible); if (S.mTypes.size >= 4) { const m = $("#montre"); if (m) { m.disabled = true; m.hidden = true; } }
        ctx.majNav();
      };
      $("#ori").addEventListener("click", jouer);
      $("#montre").addEventListener("click", () => { if (S.mTypes.size < 4) jouer(); });
      sync(S.mTypes.size >= 4 ? S.mOr : null);
      const dispo = () => { if (S.mTypes.size >= 4) return; S.mDispo = true; const m = $("#montre"); if (m) m.classList.remove("me-cache"); };
      clearTimeout(minuteur); minuteur = setTimeout(() => { const st = ctx.etape(); if (st && st.cle === "orientation") dispo(); }, 20000);
    } },
  // le schéma des phases : un repère à la fois, l'élève choisit sa légende ; une légende fausse reçoit un indice et se grise
  schema: { html: () => { const L = REPERES.map((r) => r.t).sort((a, b) => a.localeCompare(b, "fr"));
      return `<div class="ctl"><div class="me-chips" role="group" aria-label="Les légendes">${L.map((t) => `<button type="button" class="me-chip ctl-btn" data-leg="${t}">${t}</button>`).join("")}</div></div><p class="ctl-note" id="schfb" aria-live="polite"></p>`; },
    init() {
      const sc = scenes.schema;
      const sync = (msg) => { const n = S.schema, fini = n >= REPERES.length; sc.p.pl = n; sc.render();
        root.querySelectorAll("[data-leg]").forEach((b) => { const t = b.dataset.leg, place = REPERES.findIndex((r) => r.t === t) < n; b.disabled = fini || place || S.schemaKo.has(t); b.classList.toggle("me-place", place); });
        $("#schfb").innerHTML = ty((msg ? msg + "<br>" : "") + (fini ? "Les six repères sont légendés : c’est le schéma attendu au bac." : `Repère ${n + 1} : quelle légende ?`)); };
      root.querySelectorAll("[data-leg]").forEach((b) => b.addEventListener("click", () => {
        const n = S.schema; if (n >= REPERES.length) return;
        const t = b.dataset.leg, R = REPERES[n];
        if (t === R.t) { S.schema = n + 1; S.schemaKo = new Set(); sync(`<b>${n + 1}. ${t}</b> : juste.`); ctx.majNav(); }
        else { S.schemaKo.add(t); sync(`Pas « ${t} » pour le repère ${n + 1}. Indice : ${R.i}`); }
      }));
      sync("");
    } },
  // une rédaction ligne à ligne, dans la police de l'interface : les lignes reçoivent leur HTML avant que le noyau n'appelle KaTeX
  lignes: { html: () => "", init(st) { root.querySelectorAll("#body .deriv li").forEach((li) => { const x = st.deriv[+li.dataset.l], m = li.querySelector(".m"); if (m && x && x.h) { m.innerHTML = ty(x.h); m.dataset.done = "1"; m.classList.add("me-ligne"); } }); } },
};
const surClicL = (e) => { const b = e.target.closest && e.target.closest("[data-aller]");
  if (b && root.contains(b)) { const i = STEPS.findIndex((s) => s.cle === b.dataset.aller); if (i >= 0) ctx.aller(i); return; }
  setTimeout(majSaut, 0); };
const surToucheL = () => setTimeout(majSaut, 0);
root.addEventListener("click", surClicL); window.addEventListener("keydown", surToucheL);

return { BEATS, STEPS, CTL, mots, reset() { resetS(); },
  plain: (s) => s.replace(/\bq\b/g, " q ").replace(/\b2n\b/g, "2 n").replace(/⁄/g, " sur "),
  demonter() { clearTimeout(minuteur); jeton++; root.removeEventListener("click", surClicL); window.removeEventListener("keydown", surToucheL); } };
});
}
