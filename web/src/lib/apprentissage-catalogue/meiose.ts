/**
 * Catalogue d'apprentissage de la leçon `meiose` (format v3, leçon en cours de correction)
 * et de ses 12 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/meiose-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/meiose.js` (les libellés `erreur`,
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

const PHASES = ["svt-svt 3.1.1", "svt-pc 2.3.1"];
const CARYO = ["svt-svt 3.1.2", "svt-pc 2.3.2"];
const ROLE = ["svt-svt 3.1.3", "svt-pc 2.3.3"];
const SCHEMA = ["svt-svt 3.1.4", "svt-pc 2.3.4"];

export const MEIOSE: CatalogueLecon = {
  lecon: "meiose",
  matiere: "svt",
  signature:
    "v-savoir,sav-chromatides,ascaris,doublement,caryotype,homologues,homo-soeurs,v-haploide,quelle-moitie,interphase,tetrade,metaphase1,anaphase1,telophase1,metaphase2,anaphase2,quatre-cellules,ou-reduction,gonosomes,courbe,schema-phases,rappel,alleles,orientation,une-cellule,deux-paires,trois-paires,humain-2-23,v-inter,chiasma,echange,quand-co,v-intra,fecondation,hasard-fec,v-cycle,retour-moitie,retour-freres,retour-mendel,bac-qcm,bac-vf,bac-doc,bac-phases,bac-courbe,bac-copie,bac-2,bac-schema,bac-erreur,q1,q2,q3,fin",
  questions: {
    "v-savoir": { capacites: [], juste: 0, options: [{ t: "un chromosome dupliqué", e: "aucune" }, { t: "deux chromosomes collés", e: "aucune" }, { t: "la forme de tout chromosome", e: "aucune" }] },
    ascaris: { capacites: [], juste: null, options: [{ t: "4, comme l’œuf entier", e: "aucune" }, { t: "2", e: "aucune" }, { t: "1", e: "aucune" }] },
    doublement: { capacites: [], juste: 0, options: [{ t: "8", e: "aucune" }, { t: "4", e: "aucune" }, { t: "16", e: "aucune" }] },
    caryotype: { capacites: CARYO, juste: 0, options: [{ t: "2n = 8 et n = 4", e: "aucune" }, { t: "2n = 4 et n = 2", e: "aucune" }, { t: "2n = 16 et n = 8", e: "aucune" }] },
    "homo-soeurs": { capacites: CARYO, juste: 0, options: [{ t: "les deux chromatides sœurs", e: "aucune" }, { t: "les deux chromosomes d’une paire", e: "meiose.soeurs-homologues" }, { t: "les deux, à la fois", e: "aucune" }] },
    "v-haploide": { capacites: CARYO, juste: 0, options: [{ t: "un de chaque paire, soit 4", e: "aucune" }, { t: "4 paires de chromosomes", e: "aucune" }, { t: "2 paires de chromosomes", e: "aucune" }] },
    "quelle-moitie": { capacites: [], juste: null, options: [{ t: "toujours celui du père", e: "aucune" }, { t: "au hasard, paire par paire", e: "aucune" }, { t: "soit tous ceux du père, soit tou", e: "aucune" }] },
    interphase: { capacites: PHASES, juste: 0, options: [{ t: "4q", e: "aucune" }, { t: "2q", e: "meiose.adn-chromosomes" }, { t: "q", e: "aucune" }] },
    tetrade: { capacites: PHASES, juste: 0, options: [{ t: "4", e: "aucune" }, { t: "8", e: "aucune" }, { t: "16", e: "aucune" }] },
    metaphase1: { capacites: [], juste: null, options: [{ t: "un par un, alignés, comme en mit", e: "aucune" }, { t: "par paires, un homologue de chaq", e: "aucune" }, { t: "en désordre", e: "aucune" }] },
    anaphase1: { capacites: PHASES, juste: 0, options: [{ t: "les homologues de chaque paire", e: "aucune" }, { t: "les chromatides sœurs de chaque", e: "meiose.division-i-mitose" }, { t: "rien : les paires restent entièr", e: "aucune" }] },
    telophase1: { capacites: PHASES, juste: 0, options: [{ t: "n = 2 chromosomes à 2 chromatide", e: "aucune" }, { t: "2n = 4 chromosomes à 1 chromatid", e: "meiose.division-i-mitose" }, { t: "n = 2 chromosomes à 1 chromatide", e: "meiose.haploide-une-chromatide" }] },
    metaphase2: { capacites: PHASES, juste: 0, options: [{ t: "haploïde, à chromosomes à 2 chro", e: "aucune" }, { t: "diploïde, car chaque chromosome", e: "meiose.haploide-une-chromatide" }, { t: "haploïde, à chromosomes à 1 chro", e: "meiose.haploide-une-chromatide" }] },
    anaphase2: { capacites: PHASES, juste: 0, options: [{ t: "les chromatides sœurs de chaque", e: "aucune" }, { t: "les homologues de chaque paire", e: "aucune" }, { t: "rien : les chromosomes restent e", e: "aucune" }] },
    "ou-reduction": { capacites: PHASES, juste: 0, options: [{ t: "à la division I", e: "aucune" }, { t: "à la division II", e: "meiose.adn-chromosomes" }, { t: "aux deux, à chaque division", e: "aucune" }] },
    gonosomes: { capacites: CARYO, juste: 0, options: [{ t: "n = 22A + X (ou Y)", e: "aucune" }, { t: "n = 22A + XY", e: "aucune" }, { t: "n = 23A + X", e: "inattention" }] },
    courbe: { capacites: PHASES, juste: 0, options: [{ t: "la division II : chromatides sœu", e: "aucune" }, { t: "la réduction du nombre de chromo", e: "meiose.adn-chromosomes" }, { t: "la phase S, qui copie l’ADN", e: "aucune" }] },
    rappel: { capacites: PHASES, juste: 0, options: [{ t: "4 chromosomes à 2 chromatides", e: "aucune" }, { t: "8 chromosomes à 2 chromatides", e: "aucune" }, { t: "4 chromosomes à 1 chromatide", e: "aucune" }] },
    alleles: { capacites: [], juste: null, options: [{ t: "A b et a B", e: "aucune" }, { t: "encore A B et a b : les chromoso", e: "aucune" }, { t: "les quatre types à la fois", e: "aucune" }] },
    "une-cellule": { capacites: ROLE, juste: 0, options: [{ t: "2", e: "aucune" }, { t: "4", e: "aucune" }, { t: "1", e: "aucune" }] },
    "deux-paires": { capacites: [], juste: null, options: [{ t: "1/4 chacun", e: "aucune" }, { t: "surtout A B et a b : les chromos", e: "aucune" }, { t: "au hasard, sans proportion fixe", e: "aucune" }] },
    "trois-paires": { capacites: ROLE, juste: 0, options: [{ t: "8", e: "aucune" }, { t: "6", e: "meiose.additionner-choix" }, { t: "9", e: "meiose.additionner-choix" }] },
    "humain-2-23": { capacites: ROLE, juste: 0, options: [{ t: "223 ≈ 8,4 millions", e: "aucune" }, { t: "2 × 23 = 46", e: "meiose.additionner-choix" }, { t: "23² = 529", e: "meiose.additionner-choix" }] },
    "v-inter": { capacites: ROLE, juste: 0, options: [{ t: "de nouvelles combinaisons d’allè", e: "aucune" }, { t: "de nouveaux allèles", e: "meiose.brassage-mutation" }, { t: "de nouveaux chromosomes", e: "aucune" }] },
    chiasma: { capacites: ROLE, juste: 0, options: [{ t: "deux chromatides non sœurs", e: "aucune" }, { t: "deux chromatides sœurs", e: "meiose.soeurs-homologues" }, { t: "deux chromosomes de paires diffé", e: "aucune" }] },
    echange: { capacites: ROLE, juste: 0, options: [{ t: "4 types : AD, Ad, aD, ad", e: "aucune" }, { t: "2 types, comme sans crossing-ove", e: "aucune" }, { t: "4 types, tous nouveaux", e: "aucune" }] },
    "quand-co": { capacites: PHASES, juste: 0, options: [{ t: "la prophase I", e: "aucune" }, { t: "l’anaphase I", e: "aucune" }, { t: "l’anaphase II", e: "aucune" }, { t: "la prophase II", e: "aucune" }] },
    "v-intra": { capacites: ROLE, juste: 0, options: [{ t: "Ad et aD", e: "aucune" }, { t: "AD et ad", e: "aucune" }, { t: "les quatre", e: "aucune" }] },
    fecondation: { capacites: ROLE, juste: 0, options: [{ t: "une cellule-œuf à 2n = 46", e: "aucune" }, { t: "23 chromosomes, comme un gamète", e: "aucune" }, { t: "92 chromosomes", e: "aucune" }] },
    "hasard-fec": { capacites: ROLE, juste: 0, options: [{ t: "223 × 223 ≈ 7,0 × 1013", e: "aucune" }, { t: "2 × 223 ≈ 1,7 × 107", e: "meiose.additionner-choix" }, { t: "223 ≈ 8,4 millions", e: "aucune" }] },
    "v-cycle": { capacites: ROLE, juste: 0, options: [{ t: "elle le doublerait à chaque géné", e: "aucune" }, { t: "rien : il resterait le même", e: "aucune" }, { t: "elle le diviserait par deux", e: "aucune" }] },
    "retour-moitie": { capacites: PHASES, juste: 0, options: [{ t: "la division I a séparé les homol", e: "aucune" }, { t: "la division II a séparé ses chro", e: "meiose.adn-chromosomes" }, { t: "il en a perdu 2 au hasard", e: "aucune" }] },
    "retour-freres": { capacites: ROLE, juste: 0, options: [{ t: "1 chance sur 223, soit 1 sur 8,4", e: "aucune" }, { t: "1 chance sur 2, comme pour une s", e: "aucune" }, { t: "1 chance sur 23, une par paire", e: "aucune" }] },
    "retour-mendel": { capacites: ROLE, juste: 0, options: [{ t: "½ A et ½ a", e: "aucune" }, { t: "¼ A, ¼ a et ½ Aa", e: "trans.alleles-par-cellule" }, { t: "tous A, si A est dominant", e: "aucune" }] },
    "bac-qcm": { capacites: PHASES, juste: 0, options: [{ t: "quatre cellules haploïdes avec d", e: "aucune" }, { t: "deux cellules diploïdes avec des", e: "aucune" }, { t: "quatre cellules diploïdes avec d", e: "aucune" }, { t: "deux cellules haploïdes avec des", e: "aucune" }] },
    "bac-vf": { capacites: ROLE, juste: 0, options: [{ t: "Faux : elles reçoivent chacune u", e: "aucune" }, { t: "Vrai : les deux viennent de la m", e: "aucune" }, { t: "Vrai : elles ont toutes deux le", e: "aucune" }] },
    "bac-doc": { capacites: [], juste: null, options: [{ t: "Décrire chaque cellule : paires,", e: "aucune" }, { t: "Nommer d’abord les phases dans l", e: "aucune" }, { t: "Lire d’abord la courbe, puis les", e: "aucune" }] },
    "bac-phases": { capacites: PHASES, juste: 0, options: [{ t: "b : 2 chromosomes à 1 chromatide", e: "aucune" }, { t: "b : 2 chromosomes partent vers c", e: "aucune" }, { t: "b : 2 chromosomes à 1 chromatide", e: "aucune" }] },
    "bac-courbe": { capacites: PHASES, juste: 0, options: [{ t: "sur le palier à 2q, entre les de", e: "aucune" }, { t: "sur le palier à q, car elle est", e: "meiose.haploide-une-chromatide" }, { t: "sur le palier à 4q, avant la div", e: "aucune" }] },
    "bac-copie": { capacites: ROLE, juste: 0, options: [{ t: "Chaque paire s’oriente au hasard", e: "aucune" }, { t: "La division II sépare des chroma", e: "aucune" }, { t: "Une mutation à chaque méiose cré", e: "meiose.brassage-mutation" }] },
    "bac-2": { capacites: PHASES, juste: 0, options: [{ t: "Anaphase I : les homologues se s", e: "aucune" }, { t: "Anaphase II : des chromosomes se", e: "aucune" }, { t: "Anaphase de mitose : des chromos", e: "aucune" }] },
    "bac-schema": { capacites: SCHEMA, juste: 0, options: [{ t: "le schéma 2", e: "aucune" }, { t: "le schéma 1", e: "aucune" }, { t: "le schéma 3", e: "aucune" }] },
    "bac-erreur": { capacites: PHASES, juste: 0, options: [{ t: "elle conclut « diploïde » : sans", e: "aucune" }, { t: "c’est une mitose, mais il fallai", e: "aucune" }, { t: "elle ne devait pas compter les c", e: "aucune" }] },
    q1: { capacites: PHASES, juste: 0, options: [{ t: "oui, en métaphase II", e: "aucune" }, { t: "non : haploïde veut dire une chr", e: "meiose.haploide-une-chromatide" }, { t: "oui, mais seulement en prophase", e: "aucune" }] },
    q2: { capacites: ROLE, juste: 0, options: [{ t: "32, soit 25", e: "aucune" }, { t: "10, soit 2 × 5", e: "meiose.additionner-choix" }, { t: "25, soit 5²", e: "meiose.additionner-choix" }] },
    q3: { capacites: ROLE, juste: 0, options: [{ t: "deux chromatides non sœurs de de", e: "aucune" }, { t: "deux chromatides sœurs d’un même", e: "meiose.soeurs-homologues" }, { t: "deux chromosomes non homologues", e: "aucune" }] },
  },
  gabarits: {
    "meiose-phase": {
      capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "phases confondues": "aucune",
        "haploïde lu comme diploïde": "aucune",
        "anaphase I et II confondues": "aucune",
        "la méiose, c’est deux mitoses": "meiose.division-i-mitose",
      },
    },
    "meiose-comptes": {
      capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "tétrades comptées comme chromosomes": "aucune",
        "haploïde = une chromatide": "meiose.haploide-une-chromatide",
        "la quantité d’ADN suit le nombre de chromosomes": "meiose.adn-chromosomes",
      },
    },
    "meiose-courbe": {
      capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1", "svt-svt 3.1.3", "svt-pc 2.3.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "la réduction placée à la division II": "meiose.adn-chromosomes",
        "la phase S confondue avec une chute": "aucune",
        "la fécondation oubliée": "aucune",
      },
    },
    "caryotype-formule": {
      capacites: ["svt-svt 3.1.2", "svt-pc 2.3.2"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "2n pris pour le nombre de paires": "aucune",
        "2n/2 calculé sur le total au lieu des autosomes": "aucune",
        "XY gardés ensemble dans le gamète": "aucune",
      },
    },
    "gametes-2n": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "le nombre de types s’additionne (2 × n)": "meiose.additionner-choix",
        "n² au lieu de 2ⁿ": "meiose.additionner-choix",
        "une cellule donne tous les types": "aucune",
      },
    },
    "gametes-genotype": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "les homozygotes comptés comme des choix": "aucune",
        "un gamète à deux allèles d’un même gène": "trans.alleles-par-cellule",
      },
    },
    "anaphase-alleles": {
      capacites: ["svt-svt 3.1.4", "svt-pc 2.3.4", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "les deux chromosomes paternels toujours ensemble": "aucune",
        "chromatides séparées en anaphase I": "meiose.division-i-mitose",
        "homologues séparés en anaphase II": "aucune",
      },
    },
    "crossing-over": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "échange entre chromosomes de paires différentes": "aucune",
        "échange entre chromatides sœurs": "meiose.soeurs-homologues",
        "4 recombinés sur 4": "aucune",
        "confondre parental et recombiné": "aucune",
        "crossing-over hors intervalle compté": "aucune",
      },
    },
    "fecondation-combinaisons": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "le nombre de combinaisons s’additionne (2 × 2ⁿ)": "meiose.additionner-choix",
        "la fécondation n’ajoute rien (2ⁿ)": "aucune",
        "une probabilité de 1/2 ou 1/n": "aucune",
      },
    },
    "cycle-caryotype": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "n + n = n": "aucune",
        "la fécondation partage": "aucune",
        "23 paires dans le gamète": "aucune",
      },
    },
    "brassage-identifier": {
      capacites: ["svt-svt 3.1.3", "svt-pc 2.3.3", "svt-svt 3.2.3", "svt-pc 2.4.3"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "« mutation » pour une combinaison nouvelle": "meiose.brassage-mutation",
        "brassages inter et intra confondus": "aucune",
        "tout type nouveau attribué au crossing-over": "aucune",
      },
    },
    "meiose-document": {
      capacites: ["svt-svt 3.1.1", "svt-pc 2.3.1", "svt-svt 3.1.3", "svt-pc 2.3.3"], niveau: 3, optionsQcm: 4,
      erreurs: {
        "phases confondues": "aucune",
        "la méiose, c’est deux mitoses": "meiose.division-i-mitose",
        "anaphase I et II confondues": "aucune",
        "haploïde = q": "meiose.haploide-une-chromatide",
        "une phase sans justification": "aucune",
        "le nombre de types s’additionne": "meiose.additionner-choix",
        "n² au lieu de 2ⁿ": "meiose.additionner-choix",
        "réciter au lieu d’exploiter": "aucune",
        "haploïde lu comme diploïde": "aucune",
      },
    },
  },
};
