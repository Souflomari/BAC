/**
 * Catalogue d'apprentissage de la leçon `expression-genetique` (format v3)
 * et de ses 11 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/expression-genetique-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/expression-genetique.js` (les libellés `erreur`,
 * énumérés sur 400 graines par gabarit le 2026-11-24). Aucun de ces fichiers n'est modifié.
 * Le contrôle `web/scripts/apprentissage-catalogue.mjs` vérifie que chaque `cle`, chaque option
 * (nombre, ordre, début du texte, option juste), chaque gabarit et chaque libellé d'erreur existe
 * encore : si la leçon change, ce catalogue échoue au lieu de dériver
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

const CARAC = ["svt-svt 2.1.8", "svt-pc 2.1.8"];
const MUT = ["svt-svt 2.1.9", "svt-pc 2.1.9"];
const TRANS = ["svt-svt 2.2.1", "svt-pc 2.2.1"];
const CODE = ["svt-svt 2.2.2", "svt-pc 2.2.2"];
const SYNTH = ["svt-svt 2.2.3", "svt-pc 2.2.3"];
const TRADUC = ["svt-svt 2.2.2", "svt-pc 2.2.2", "svt-svt 2.2.3", "svt-pc 2.2.3"];

export const EXPRESSION_GENETIQUE: CatalogueLecon = {
  lecon: "expression-genetique",
  matiere: "svt",
  signature:
    "v-savoir,proteine,hemoglobine,chromosome,gene,drep,pauling,ingram,v-enigme,gene-chr,noyau,messager,deux-etapes,v-messager,nucleotide,double-brin,polymerase,pari-u,copie,pari-brin,arn,regle,reflexe-brin,v-transcription,alphabet,nirenberg,lire-table,table,depart-stop,v-code,rappel,ribosome,pari-aa,arnt,ribo,stop,fin-traduction,schema,v-traduction,mutation,atelier,faux-sens,silencieuse,non-sens,decalage,v-insertion,echelles,organisme,maroc,v-chaine,bac-doc,bac-codons,bac-redaction,q1,q2,q3,fin",
  questions: {
    "v-savoir": { capacites: [], juste: 0, options: [{ t: "Un gène est un segment d’ADN", e: "aucune" }, { t: "Un gène est une chaîne d’acides", e: "aucune" }, { t: "Une protéine s’écrit avec A, T,", e: "aucune" }] },
    drep: { capacites: [], juste: null, options: [{ t: "Dans sa membrane", e: "aucune" }, { t: "Dans l’hémoglobine qui le rempli", e: "aucune" }, { t: "Dans le sang, pauvre en oxygène", e: "aucune" }] },
    ingram: { capacites: [], juste: null, options: [{ t: "Des chaînes entièrement différen", e: "aucune" }, { t: "Un seul acide aminé différent", e: "aucune" }, { t: "Un acide aminé en plus", e: "aucune" }] },
    "v-enigme": { capacites: CARAC, juste: 0, options: [{ t: "Dans le gène HBB, sa recette", e: "aucune" }, { t: "Dans le globule rouge déformé", e: "aucune" }, { t: "Dans les chaînes α", e: "aucune" }] },
    "gene-chr": { capacites: [], juste: null, options: [{ t: "Une seule lettre", e: "aucune" }, { t: "Quelques lettres", e: "aucune" }, { t: "Des dizaines de lettres", e: "aucune" }] },
    messager: { capacites: [], juste: null, options: [{ t: "L’ADN sort du noyau", e: "aucune" }, { t: "Une copie du gène sort du noyau", e: "aucune" }, { t: "Les ribosomes entrent dans le no", e: "aucune" }] },
    "v-messager": { capacites: SYNTH, juste: 1, options: [{ t: "La transcription", e: "aucune" }, { t: "La traduction", e: "aucune" }, { t: "Aucune des deux", e: "aucune" }] },
    "pari-u": { capacites: TRANS, juste: 0, options: [{ t: "U", e: "aucune" }, { t: "T", e: "gen.t-dans-arn" }, { t: "A", e: "aucune" }] },
    "pari-brin": { capacites: TRANS, juste: 1, options: [{ t: "du brin transcrit", e: "gen.brin-transcrit" }, { t: "du brin non transcrit", e: "aucune" }, { t: "d’aucun des deux", e: "aucune" }] },
    "reflexe-brin": { capacites: TRANS, juste: 0, options: [{ t: "Ce brin est-il transcrit ou non", e: "aucune" }, { t: "Combien de triplets compte ce br", e: "aucune" }, { t: "Par quel acide aminé commence la", e: "aucune" }] },
    "v-transcription": { capacites: TRANS, juste: 1, options: [{ t: "3′-CAA UGA-5′", e: "gen.brin-transcrit" }, { t: "5′-GUU ACU-3′", e: "aucune" }, { t: "5′-GTT ACT-3′", e: "gen.t-dans-arn" }] },
    alphabet: { capacites: [], juste: 2, options: [{ t: "1 base", e: "aucune" }, { t: "2 bases", e: "aucune" }, { t: "3 bases", e: "aucune" }] },
    nirenberg: { capacites: [], juste: null, options: [{ t: "Rien : ce n’est pas un vrai gène", e: "aucune" }, { t: "Une chaîne d’un seul acide aminé", e: "aucune" }, { t: "Une protéine au hasard", e: "aucune" }] },
    "v-code": { capacites: CODE, juste: 0, options: [{ t: "Met – Val – His", e: "aucune" }, { t: "Met – Val – His – Stop", e: "gen.codon-stop" }, { t: "Val – His", e: "inattention" }] },
    rappel: { capacites: TRANS, juste: 0, options: [{ t: "AUG", e: "aucune" }, { t: "UAC", e: "gen.brin-transcrit" }, { t: "ATG", e: "gen.t-dans-arn" }] },
    "pari-aa": { capacites: [], juste: null, options: [{ t: "Le ribosome les fabrique", e: "aucune" }, { t: "Ils sont déjà dans le cytoplasme", e: "aucune" }, { t: "L’ARNm les apporte", e: "aucune" }] },
    stop: { capacites: SYNTH, juste: 0, options: [{ t: "La chaîne est libérée", e: "aucune" }, { t: "Un ARNt apporte un acide aminé «", e: "gen.codon-stop" }, { t: "Le ribosome saute ce codon et co", e: "gen.codon-stop" }] },
    "v-traduction": { capacites: TRADUC, juste: 2, options: [{ t: "L’histidine (His)", e: "gen.anticodon-codon" }, { t: "La méthionine (Met)", e: "aucune" }, { t: "La valine (Val)", e: "aucune" }] },
    mutation: { capacites: [], juste: null, options: [{ t: "D’un besoin de l’organisme", e: "aucune" }, { t: "Du hasard", e: "aucune" }, { t: "De la maladie", e: "aucune" }] },
    silencieuse: { capacites: [], juste: null, options: [{ t: "Rien ne change", e: "aucune" }, { t: "Un acide aminé change", e: "aucune" }, { t: "La chaîne s’arrête", e: "aucune" }] },
    "non-sens": { capacites: [], juste: null, options: [{ t: "Un acide aminé change", e: "aucune" }, { t: "Rien ne change", e: "aucune" }, { t: "Elle s’arrête après 5 acides ami", e: "aucune" }] },
    decalage: { capacites: [], juste: null, options: [{ t: "Un seul", e: "aucune" }, { t: "Tous ceux qui suivent", e: "aucune" }, { t: "Aucun", e: "aucune" }] },
    "v-insertion": { capacites: MUT, juste: 0, options: [{ t: "Tout change à partir du n° 3", e: "aucune" }, { t: "Seul le n° 3 change", e: "gen.decalage-cadre" }, { t: "Rien : il est ignoré", e: "aucune" }] },
    "v-chaine": { capacites: CARAC, juste: 0, options: [{ t: "Des globules de forme normale", e: "aucune" }, { t: "L’allèle βS redeviendrait βA", e: "aucune" }, { t: "Rien : seul l’allèle compte", e: "aucune" }] },
    "bac-doc": { capacites: CODE, juste: 1, options: [{ t: "Lire les codons sur ces brins", e: "aucune" }, { t: "Écrire l’ARNm, complémentaire", e: "aucune" }, { t: "Chercher la maladie dans le cour", e: "aucune" }] },
    q1: { capacites: TRANS, juste: 1, options: [{ t: "3′-UUC AGA CGG-5′", e: "gen.brin-transcrit" }, { t: "5′-AAG UCU GCC-3′", e: "aucune" }, { t: "5′-AAG TCT GCC-3′", e: "gen.t-dans-arn" }] },
    q2: { capacites: CODE, juste: 0, options: [{ t: "Met – Val – His – Leu", e: "aucune" }, { t: "Leu – Trp – Cys – Ile – Cys – Gl", e: "gen.codon-initiation" }, { t: "Met – Val – His – Leu – Ala", e: "gen.codon-stop" }] },
    q3: { capacites: MUT, juste: 0, options: [{ t: "L’allèle : une autre version du", e: "aucune" }, { t: "Le gène : c’est un autre gène", e: "gen.allele-code" }, { t: "Le code génétique de la personne", e: "gen.allele-code" }] },
  },
  gabarits: {
    "brin-non-transcrit": {
      capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "complémenter le brin non transcrit": "gen.brin-transcrit",
        "garder T dans l’ARNm": "gen.t-dans-arn",
      },
    },
    "brin-transcrit": {
      capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "recopier le brin transcrit en changeant T en U": "gen.brin-transcrit",
        "garder T dans l’ARNm": "gen.t-dans-arn",
      },
    },
    "complementer-ou-non": {
      capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1", "svt-svt 2.2.2", "svt-pc 2.2.2"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "complémenter le brin non transcrit": "gen.brin-transcrit",
        "recopier le brin transcrit en changeant T en U": "gen.brin-transcrit",
        "transcrire un ARNm": "aucune",
        "garder T dans l’ARNm": "gen.t-dans-arn",
      },
    },
    "adn-arn": {
      capacites: ["svt-svt 2.2.1", "svt-pc 2.2.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "ARNm à deux brins": "aucune",
        "confondre ARN et protéine": "aucune",
        "confondre ribose et désoxyribose": "aucune",
        "confondre nucléotide et codon": "aucune",
        "mettre T dans l’ARN": "gen.t-dans-arn",
        "l’ADN quitte le noyau": "aucune",
      },
    },
    "arnm-chaine": {
      capacites: ["svt-svt 2.2.2", "svt-pc 2.2.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "lire avant le codon d’initiation": "gen.codon-initiation",
        "lire après le codon stop": "gen.codon-stop",
        "oublier la méthionine": "inattention",
        "compter le codon stop comme un acide aminé": "gen.codon-stop",
      },
    },
    "anticodon": {
      capacites: ["svt-svt 2.2.2", "svt-pc 2.2.2", "svt-svt 2.2.3", "svt-pc 2.2.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "lire l’anticodon dans le tableau": "gen.anticodon-codon",
        "lire le codon à l’envers": "inattention",
        "écrire T dans l’ARN": "gen.t-dans-arn",
      },
    },
    "phases-traduction": {
      capacites: ["svt-svt 2.2.3", "svt-pc 2.2.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "confondre les phases de la traduction": "aucune",
        "confondre transcription et traduction": "aucune",
        "traduction dans le noyau": "aucune",
        "inverser les sites P et A": "aucune",
        "confondre ARN et protéine": "aucune",
        "le ribosome fabrique les acides aminés": "aucune",
      },
    },
    "type-mutation": {
      capacites: ["svt-svt 2.1.9", "svt-pc 2.1.9"], niveau: 2, optionsQcm: 5,
      erreurs: {
        "ne pas voir le décalage du cadre de lecture": "gen.decalage-cadre",
        "toute mutation change la protéine": "aucune",
        "confondre faux-sens et non-sens": "aucune",
        "numéroter les nucléotides au lieu des triplets": "inattention",
      },
    },
    "decalage": {
      capacites: ["svt-svt 2.1.9", "svt-pc 2.1.9"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "oublier le décalage du cadre de lecture": "gen.decalage-cadre",
        "lire après le codon stop": "gen.codon-stop",
        "ne décaler qu’un codon": "gen.decalage-cadre",
      },
    },
    "bac-2026": {
      capacites: ["svt-svt 2.1.8", "svt-pc 2.1.8", "svt-svt 2.1.9", "svt-pc 2.1.9", "svt-svt 2.2.2", "svt-pc 2.2.2"], niveau: 3, optionsQcm: 4,
      erreurs: {
        "lire le mauvais brin": "gen.brin-transcrit",
        "réciter le cours sans le document": "aucune",
        "mal numéroter les triplets": "inattention",
        "ne pas voir le décalage du cadre de lecture": "gen.decalage-cadre",
        "confondre allèle et code": "gen.allele-code",
        "la mutation vient d’un besoin": "aucune",
        "compter le codon stop comme un acide aminé": "gen.codon-stop",
        "lire après le codon stop": "gen.codon-stop",
        "confondre substitution et délétion": "aucune",
        "confondre faux-sens et non-sens": "aucune",
      },
    },
    "schema-synthese": {
      capacites: ["svt-svt 2.2.4", "svt-pc 2.2.4"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "confondre ARNm et ARNt": "aucune",
        "confondre transcription et traduction": "aucune",
        "inverser noyau et cytoplasme": "aucune",
      },
    },
  },
};
