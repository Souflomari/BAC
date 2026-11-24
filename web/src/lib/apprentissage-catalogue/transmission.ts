/**
 * Catalogue d'apprentissage de la leçon `transmission` (format v3, leçon en cours de correction)
 * et de ses 14 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/transmission-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/transmission.js` (les libellés `erreur`,
 * énumérés sur 400 graines par gabarit le 2026-11-24). Aucun de ces fichiers n'est modifié.
 * Le contrôle `web/scripts/apprentissage-catalogue.mjs` vérifie que chaque `cle`, chaque option
 * (nombre, ordre, début du texte, option juste), chaque gabarit et chaque libellé d'erreur existe
 * encore : si la leçon change (elle est en correction), ce catalogue échoue au lieu de dériver
 * en silence.
 *
 * Étiquettes : mêmes règles que `logarithme.ts`. Une option fausse reçoit un identifiant de
 * conception (registre dans `graphe-transversal.ts`) seulement quand son texte et son `fb` montrent
 * sans ambiguïté cette erreur de raisonnement ; « inattention » pour un compte, une lecture ou un
 * signe isolé ; « aucune » sinon (on préfère ne rien dire que d'attribuer une idée fausse au
 * hasard), et pour l'option juste. Les paris sans bonne réponse (`juste: null`) ne sont jamais notés.
 * Capacités : celles des gabarits de la leçon qui exercent le même geste ; les paris de découverte
 * (posés avant que la leçon enseigne la règle) n'en portent aucune.
 */
import type { CatalogueLecon } from "../apprentissage";

const MEIOSE = ["svt-svt 3.1.3", "svt-pc 2.3.3"];
const UN = ["svt-svt 3.2.1", "svt-pc 2.4.1"];
const DEUX = ["svt-svt 3.2.2", "svt-pc 2.4.2"];
const SCHEMA = ["svt-svt 3.2.3", "svt-pc 2.4.3"];
const CARTE = ["svt-svt 3.2.4", "svt-pc 2.4.4"];

export const TRANSMISSION: CatalogueLecon = {
  lecon: "transmission",
  matiere: "svt",
  signature:
    "sav-notation,sav-lignee,v-savoir,mendel,f2,ratio,dominance,echiquier,derniere-case,rapports,lisses-purs,produit,testeur,deux-hypotheses,v-testcross,jaunes,deux-pour-un,letal-calc,deux-genes,orientation,tc-indep,f2-16,retour-556,demarche,demarche-ecrire,rappel,souris-f1,absolu-tc,absolu-f2,vrai-tc,quatre-classes,crossing-over,deux-sur-quatre,pourcentage,parentaux-recombines,cinquante,double,centimorgan,total,trois-genes,v-carte,bac-doc,bac-q1,bac-q2,bac-gametes,bac-erreur,bac-2,bac-2-cases,bac-2-suite,q1,q2,q3,fin",
  questions: {
    "sav-lignee": { capacites: UN, juste: 0, options: [{ t: "tous G", e: "aucune" }, { t: "½ G et ½ g", e: "aucune" }, { t: "¾ G et ¼ g", e: "aucune" }] },
    "v-savoir": { capacites: MEIOSE, juste: 0, options: [{ t: "½ G et ½ g", e: "aucune" }, { t: "¼ G, ¼ g et ½ Gg", e: "trans.alleles-par-cellule" }, { t: "tous G, puisque G domine", e: "aucune" }] },
    mendel: { capacites: [], juste: null, options: [{ t: "toutes lisses", e: "aucune" }, { t: "toutes d’une forme intermédiaire", e: "aucune" }, { t: "moitié lisses, moitié ridées", e: "aucune" }] },
    f2: { capacites: [], juste: null, options: [{ t: "absentes : le ridé a disparu en", e: "aucune" }, { t: "présentes, mais moins nombreuses", e: "aucune" }, { t: "présentes, aussi nombreuses que", e: "aucune" }] },
    ratio: { capacites: UN, juste: 0, options: [{ t: "1 graine sur 4", e: "aucune" }, { t: "1 graine sur 3", e: "inattention" }, { t: "1 graine sur 2", e: "aucune" }] },
    dominance: { capacites: UN, juste: 0, options: [{ t: "L//ℓ", e: "aucune" }, { t: "L//L", e: "trans.phenotype-genotype" }, { t: "L", e: "trans.alleles-par-cellule" }] },
    "derniere-case": { capacites: UN, juste: 0, options: [{ t: "ℓ//ℓ, ridée", e: "aucune" }, { t: "L//ℓ, lisse", e: "inattention" }, { t: "ℓ, ridée", e: "trans.alleles-par-cellule" }] },
    rapports: { capacites: UN, juste: 0, options: [{ t: "¾ [L] et ¼ [ℓ]", e: "aucune" }, { t: "¼ L//L, ½ L//ℓ et ¼ ℓ//ℓ", e: "aucune" }, { t: "½ [L] et ½ [ℓ]", e: "aucune" }] },
    "lisses-purs": { capacites: UN, juste: 0, options: [{ t: "1 sur 3", e: "aucune" }, { t: "toutes", e: "trans.phenotype-genotype" }, { t: "1 sur 4", e: "aucune" }] },
    produit: { capacites: UN, juste: 0, options: [{ t: "½ × ½ = ¼", e: "aucune" }, { t: "½", e: "aucune" }, { t: "½ + ½ = 1", e: "trans.addition-pour-et" }] },
    testeur: { capacites: UN, juste: 0, options: [{ t: "une plante ridée, ℓ//ℓ", e: "aucune" }, { t: "une lignée pure lisse, L//L", e: "aucune" }, { t: "une autre plante lisse", e: "aucune" }] },
    "deux-hypotheses": { capacites: UN, juste: 0, options: [{ t: "½ [L] et ½ [ℓ]", e: "aucune" }, { t: "¾ [L] et ¼ [ℓ]", e: "trans.rapport-f2-generalise" }, { t: "tous [L]", e: "aucune" }] },
    "v-testcross": { capacites: UN, juste: 0, options: [{ t: "L//ℓ", e: "aucune" }, { t: "L//L", e: "aucune" }, { t: "impossible à dire, 52 n’est pas", e: "trans.rapport-exact-exige" }] },
    jaunes: { capacites: UN, juste: 0, options: [{ t: "le jaune domine ; les parents so", e: "aucune" }, { t: "le gris domine, car il apparaît", e: "aucune" }, { t: "le gris est une mutation des pet", e: "aucune" }] },
    "deux-pour-un": { capacites: [], juste: null, options: [{ t: "une erreur d’expérience : trop p", e: "aucune" }, { t: "les embryons G//G meurent avant", e: "aucune" }, { t: "il naît plus de souris grises qu", e: "aucune" }] },
    "letal-calc": { capacites: UN, juste: 0, options: [{ t: "2/3", e: "aucune" }, { t: "2/4, soit ½", e: "aucune" }, { t: "¾", e: "aucune" }] },
    "deux-genes": { capacites: DEUX, juste: 0, options: [{ t: "L//ℓ J//j", e: "aucune" }, { t: "L J // ℓ j", e: "aucune" }, { t: "L//J ℓ//j", e: "aucune" }] },
    "tc-indep": { capacites: [], juste: null, options: [{ t: "4 classes, ¼ chacune", e: "aucune" }, { t: "4 classes : 9/16, 3/16, 3/16, 1/", e: "aucune" }, { t: "2 classes, ½ chacune", e: "aucune" }] },
    "retour-556": { capacites: DEUX, juste: 0, options: [{ t: "non : 9/16 de [L, J] est attendu", e: "aucune" }, { t: "oui : [L, J] est une classe trop", e: "aucune" }, { t: "on ne peut rien dire : les compt", e: "trans.rapport-exact-exige" }] },
    demarche: { capacites: DEUX, juste: 0, options: [{ t: "Déduire : quatre classes proches", e: "aucune" }, { t: "Déduire : 98 n’est pas 102, on n", e: "trans.rapport-exact-exige" }, { t: "Déduire : les deux gènes sont su", e: "aucune" }] },
    "demarche-ecrire": { capacites: DEUX, juste: 0, options: [{ t: "les gamètes de chaque parent et", e: "aucune" }, { t: "la conclusion : les résultats so", e: "aucune" }, { t: "les phénotypes de tous les desce", e: "aucune" }] },
    rappel: { capacites: UN, juste: 0, options: [{ t: "½ [L] et ½ [ℓ]", e: "aucune" }, { t: "¾ [L] et ¼ [ℓ]", e: "trans.rapport-f2-generalise" }, { t: "toutes [L]", e: "aucune" }] },
    "souris-f1": { capacites: DEUX, juste: 0, options: [{ t: "G L // g ℓ", e: "aucune" }, { t: "G//g L//ℓ", e: "aucune" }, { t: "G ℓ // g L", e: "aucune" }] },
    "absolu-tc": { capacites: DEUX, juste: 0, options: [{ t: "½ G L et ½ g ℓ", e: "aucune" }, { t: "¼ de chacun des quatre types", e: "aucune" }, { t: "½ G g et ½ L ℓ", e: "trans.alleles-par-cellule" }] },
    "absolu-f2": { capacites: DEUX, juste: 0, options: [{ t: "¾ [G, L] et ¼ [g, ℓ]", e: "aucune" }, { t: "9/16, 3/16, 3/16 et 1/16", e: "trans.rapport-f2-generalise" }, { t: "½ [G, L] et ½ [g, ℓ]", e: "aucune" }] },
    "vrai-tc": { capacites: [], juste: null, options: [{ t: "2 classes à ½ : l’hypothèse est", e: "aucune" }, { t: "4 classes à ¼ : les gènes sont i", e: "aucune" }, { t: "4 classes, deux grandes et deux", e: "aucune" }] },
    "quatre-classes": { capacites: DEUX, juste: 0, options: [{ t: "non : liés, car les classes sont", e: "aucune" }, { t: "oui, car il y a quatre classes", e: "trans.quatre-classes-independants" }, { t: "liés, sans crossing-over : l’hyp", e: "aucune" }] },
    "crossing-over": { capacites: [], juste: null, options: [{ t: "d’un échange entre les deux homo", e: "aucune" }, { t: "d’une mutation : L devenu ℓ", e: "aucune" }, { t: "du testeur, qui a donné son ℓ", e: "aucune" }] },
    "deux-sur-quatre": { capacites: SCHEMA, juste: 0, options: [{ t: "2 sur 4", e: "aucune" }, { t: "les 4", e: "trans.recombines-moitie" }, { t: "1 sur 4", e: "aucune" }] },
    pourcentage: { capacites: CARTE, juste: 0, options: [{ t: "3 % : 1,29 % + 1,71 %", e: "aucune" }, { t: "1,5 % : la moyenne de 1,29 et 1,", e: "aucune" }, { t: "97 % : 48,29 % + 48,71 %", e: "aucune" }] },
    "parentaux-recombines": { capacites: DEUX, juste: 0, options: [{ t: "[G, L] et [g, ℓ]", e: "aucune" }, { t: "[G, ℓ] et [g, L]", e: "aucune" }, { t: "les quatre", e: "aucune" }] },
    cinquante: { capacites: DEUX, juste: 0, options: [{ t: "dans peu de méioses", e: "aucune" }, { t: "à chaque méiose", e: "aucune" }, { t: "jamais : ces souris sont des err", e: "aucune" }] },
    double: { capacites: [], juste: null, options: [{ t: "deux fois plus nombreux", e: "aucune" }, { t: "aussi nombreux : liés, c’est lié", e: "aucune" }, { t: "quatre fois plus nombreux", e: "aucune" }] },
    total: { capacites: CARTE, juste: 0, options: [{ t: "20 cM", e: "aucune" }, { t: "25 cM", e: "aucune" }, { t: "10,5 cM", e: "aucune" }] },
    "trois-genes": { capacites: CARTE, juste: 0, options: [{ t: "B, car 8 + 5 = 13", e: "aucune" }, { t: "A, car 13 est la plus grande dis", e: "aucune" }, { t: "A, car A vient en premier", e: "aucune" }] },
    "v-carte": { capacites: CARTE, juste: 0, options: [{ t: "6 %", e: "aucune" }, { t: "12 %", e: "trans.recombines-moitie" }, { t: "44 %", e: "aucune" }] },
    "bac-doc": { capacites: [], juste: null, options: [{ t: "Lire le croisement 1 et le docum", e: "aucune" }, { t: "Faire l’échiquier du croisement", e: "aucune" }, { t: "Réciter les lois de Mendel", e: "aucune" }] },
    "bac-q1": { capacites: DEUX, juste: 0, options: [{ t: "les deux gènes sont sur le chrom", e: "aucune" }, { t: "F1 homogène : les gènes sont ind", e: "aucune" }, { t: "il faut un test-cross pour le sa", e: "aucune" }] },
    "bac-q2": { capacites: DEUX, juste: 0, options: [{ t: "vg⁺ b⁺ // vg b", e: "aucune" }, { t: "vg⁺ b⁺ // vg⁺ b⁺", e: "trans.phenotype-genotype" }, { t: "vg⁺//vg b⁺//b", e: "aucune" }] },
    "bac-gametes": { capacites: CARTE, juste: 0, options: [{ t: "9,5 %", e: "aucune" }, { t: "19 %", e: "trans.recombines-moitie" }, { t: "48 %", e: "aucune" }] },
    "bac-erreur": { capacites: DEUX, juste: 0, options: [{ t: "les gènes sont liés : les parent", e: "aucune" }, { t: "il fallait ½ et ½ : deux gamètes", e: "aucune" }, { t: "aucune, si l’échiquier est bien", e: "aucune" }] },
    "bac-2": { capacites: DEUX, juste: 0, options: [{ t: "¼ R/ D/ ; ¼ R/ d/ ; ¼ r/ D/ ; ¼", e: "aucune" }, { t: "½ R/ D/ ; ½ r/ d/ (gènes liés)", e: "aucune" }, { t: "½ R/ ; ½ r/ ; ½ D/ ; ½ d/", e: "aucune" }] },
    "bac-2-cases": { capacites: UN, juste: 0, options: [{ t: "les 4 cases D//D", e: "aucune" }, { t: "les 4 cases d//d", e: "aucune" }, { t: "la seule case R//R D//D", e: "aucune" }] },
    "bac-2-suite": { capacites: DEUX, juste: 0, options: [{ t: "6/12 [R, D] ; 3/12 [R, d] ; 2/12", e: "aucune" }, { t: "9/16 [R, D] ; 3/16 [R, d] ; 3/16", e: "aucune" }, { t: "6/16 [R, D] ; 3/16 [R, d] ; 2/16", e: "inattention" }] },
    q1: { capacites: CARTE, juste: 0, options: [{ t: "liés, à 17 cM", e: "aucune" }, { t: "indépendants : il y a quatre cla", e: "trans.quatre-classes-independants" }, { t: "liés, à 8,5 cM", e: "aucune" }] },
    q2: { capacites: UN, juste: 0, options: [{ t: "tous A//a", e: "aucune" }, { t: "A//A ou A//a", e: "aucune" }, { t: "des A//A, et ⅓ est une erreur", e: "aucune" }] },
    q3: { capacites: CARTE, juste: 0, options: [{ t: "10 cM", e: "aucune" }, { t: "11,1 cM", e: "aucune" }, { t: "5,2 cM", e: "aucune" }] },
  },
  gabarits: {
    "f1-dominance": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], niveau: 1, optionsQcm: 2,
      erreurs: {
        "récessif pris pour dominant": "aucune",
        "un seul allèle par individu": "trans.alleles-par-cellule",
        "même phénotype, même génotype": "trans.phenotype-genotype",
        "un autosome pris pour un chromosome sexuel": "aucune",
        "F1 hétérogène et lignées pures": "aucune",
      },
    },
    "f2-monohybride": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "¼ au lieu de ⅓ (calcul sur le total)": "aucune",
        "le ½ du test-cross appliqué à la F2": "aucune",
        "addition pour « et »": "trans.addition-pour-et",
        "1:2:1 pris pour les phénotypes": "aucune",
      },
    },
    "test-cross-un-gene": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "testeur dominant ou hybride": "aucune",
        "même phénotype, même génotype": "trans.phenotype-genotype",
        "rapport exact exigé": "trans.rapport-exact-exige",
        "¾ / ¼ attendus au test-cross": "trans.rapport-f2-generalise",
      },
    },
    "gene-letal": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "oublier la case barrée": "aucune",
        "un rapport 2:1 pris pour une erreur d’expérience": "aucune",
        "[A] = A//A ou A//a": "aucune",
        "compter sur 4 cases": "aucune",
      },
    },
    "gametes-genotype": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "deux gamètes pour des gènes indépendants": "aucune",
        "gamète à deux allèles d’un gène": "trans.alleles-par-cellule",
        "d au lieu de d/2 par gamète recombiné": "trans.recombines-moitie",
        "¼ chacun pour des gènes liés": "aucune",
      },
    },
    "notation": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "allèles d’un même gène face à face": "aucune",
        "écritures indépendants / liés confondues": "aucune",
        "phase inversée mal écrite": "aucune",
      },
    },
    "test-cross-deux-genes": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "rapport exact exigé": "aucune",
        "« deux grandes classes, donc linkage absolu »": "aucune",
        "« quatre classes, donc indépendants »": "aucune",
        "division par les parentaux": "aucune",
        "une seule classe": "aucune",
      },
    },
    "f2-deux-genes": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "un seul caractère suivi": "aucune",
        "addition pour « et »": "trans.addition-pour-et",
        "9:3:3:1 appliqué à tout croisement": "trans.rapport-f2-generalise",
      },
    },
    "parentaux-recombines": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "recombinés pris pour les classes majoritaires": "aucune",
        "recombinés pris pour les phénotypes qui mélangent les caractères": "aucune",
      },
    },
    "distance": {
      capacites: ["svt-svt 3.2.4", "svt-pc 2.4.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "division par les parentaux": "aucune",
        "une seule classe recombinée": "aucune",
        "distance doublée": "aucune",
      },
    },
    "distance-proportions": {
      capacites: ["svt-svt 3.2.2", "svt-pc 2.4.2", "svt-svt 3.2.4", "svt-pc 2.4.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "d donné à une classe": "trans.recombines-moitie",
        "parentaux à 100 − d": "aucune",
        "position lue comme une distance": "aucune",
      },
    },
    "carte-trois-genes": {
      capacites: ["svt-svt 3.2.4", "svt-pc 2.4.4"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "distances non additionnées": "aucune",
        "la plus petite distance au milieu": "aucune",
      },
    },
    "deux-genes-letal": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1", "svt-svt 3.2.2", "svt-pc 2.4.2"], niveau: 3, optionsQcm: 2,
      erreurs: {
        "oubli du gène létal": "aucune",
        "cases barrées sans recompter": "aucune",
        "individus létaux comptés": "aucune",
      },
    },
    "interpretation-complete": {
      capacites: ["svt-svt 3.2.1", "svt-pc 2.4.1", "svt-svt 3.2.2", "svt-pc 2.4.2", "svt-svt 3.2.3", "svt-pc 2.4.3", "svt-svt 3.2.4", "svt-pc 2.4.4"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "réciter au lieu d’exploiter": "aucune",
        "échiquier avant la déduction": "aucune",
        "génotype des parents copié sur leur phénotype": "trans.phenotype-genotype",
        "rapport exact exigé": "trans.rapport-exact-exige",
        "F1 homogène lue comme un signe de liaison": "aucune",
        "conclusion sans comparer théorie et résultats": "aucune",
        "« quatre classes, donc indépendants »": "trans.quatre-classes-independants",
      },
    },
  },
};
