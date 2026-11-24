/**
 * Catalogue d'apprentissage de la leçon `logarithme` (séance 1, format v3, validée par le
 * propriétaire) et de ses 16 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/logarithme-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/logarithme.js` (les libellés `erreur`,
 * énumérés sur 400 graines par gabarit le 2026-11-24). Aucun de ces fichiers n'est modifié.
 * Le contrôle `web/scripts/apprentissage-catalogue.mjs` vérifie que chaque `cle`, chaque option
 * (nombre, ordre, début du texte, option juste), chaque gabarit et chaque libellé d'erreur existe
 * encore : si la leçon change, ce catalogue échoue au lieu de dériver en silence.
 *
 * Étiquettes (une par option, dans l'ordre de l'auteur, c'est l'index `option` du journal) :
 *   - un identifiant de conception (`ln.…`, `ineq.…`, `graphe.…`, `puiss.…`, registre dans
 *     `graphe-transversal.ts`), quand l'`indice` de l'option nomme cette erreur ;
 *   - « inattention » : une erreur de compte ou de lecture, sans idée fausse derrière ;
 *   - « aucune » : l'option juste, ou une option fausse qui ne désigne pas une conception précise
 *     (on préfère ne rien dire que d'attribuer une idée fausse au hasard).
 * Les paris sans bonne réponse (`juste: null`) ne sont jamais notés : leurs options sont « aucune ».
 */
import type { CatalogueLecon } from "../apprentissage";

const REGLES = ["maths-sexp 1.2.16", "maths-sm 1.3.9"];
const RESOUDRE = ["maths-sexp 1.2.17", "maths-sm 1.3.10"];
const ETUDE = ["maths-sexp 1.2.22", "maths-sm 1.3.16"];

export const LOGARITHME: CatalogueLecon = {
  lecon: "logarithme",
  matiere: "maths",
  signature:
    "savoir,sav-rappel,napier,add,reve,table,exemple,pick,nom,v-table,trou,pas,p21,p21-pourquoi,v-trous,gunter,regle,v-regle,hyper-pourquoi,hyper,a24,etire,ecrase,egales,gen,coupe,sarasa,v-aire,rappel,cours,taux,bande,derivee,definition,pente,e,e-nom,gauche,demi,domaine,croissance,croissance-2,v-courbe,r-prod,r-quotient,r-puissance,r-puissance2,r-racine,r-somme,v-regles,retour,bac,bac-sol,bac-rejet,bac-copie,bac-2,bac-2-suite,bac-erreur,q1,q2,q3,fin",
  questions: {
    // puissances (collège) : aucune capacité de 2ème Bac, mais les erreurs sont des prérequis
    savoir: { capacites: [], juste: 0, options: [{ t: "27", e: "aucune" }, { t: "212", e: "puiss.exposants-multiplies" }, { t: "47", e: "puiss.bases-multipliees" }] },
    reve: { capacites: [], juste: 0, options: [{ t: "0", e: "aucune" }, { t: "1", e: "aucune" }, { t: "On ne peut pas le savoir", e: "aucune" }] },
    "v-table": { capacites: REGLES, juste: 0, options: [{ t: "Au pas 9", e: "aucune" }, { t: "Au pas 18", e: "ln.produit-en-produit" }, { t: "Au pas 72", e: "ln.nombre-et-logarithme" }] },
    trou: { capacites: [], juste: null, options: [{ t: "Entre 2 et 4", e: "aucune" }, { t: "À un pas et demi, environ", e: "aucune" }, { t: "Nulle part", e: "aucune" }] },
    p21: { capacites: [], juste: null, options: [{ t: "110 + 196 = 306 pas", e: "aucune" }, { t: "110 × 196 = 21 560 pas", e: "aucune" }, { t: "21 pas", e: "aucune" }] },
    "v-trous": { capacites: REGLES, juste: 0, options: [{ t: "Vers 140 pas", e: "aucune" }, { t: "Vers 280 pas", e: "aucune" }, { t: "Vers 72 pas", e: "ln.nombre-et-logarithme" }] },
    "v-regle": { capacites: REGLES, juste: 0, options: [{ t: "Je pose le 1 du haut sur le 3 du", e: "aucune" }, { t: "Je pose le 3 du haut sur le 3 du", e: "ln.zero-et-un" }, { t: "Je pose le 0 du haut sur le 3 du", e: "ln.zero-et-un" }] },
    "hyper-pourquoi": { capacites: [], juste: 0, options: [{ t: "Deux fois plus basse", e: "aucune" }, { t: "Deux fois plus haute", e: "aucune" }, { t: "À la même hauteur", e: "aucune" }] },
    a24: { capacites: [], juste: null, options: [{ t: "Celle de 2 à 4", e: "aucune" }, { t: "Elles sont égales", e: "aucune" }, { t: "Celle de 1 à 2", e: "aucune" }] },
    sarasa: { capacites: [], juste: null, options: [{ t: "Environ 1,10", e: "aucune" }, { t: "Environ 3", e: "aucune" }, { t: "Environ 1,39", e: "aucune" }] },
    "v-aire": { capacites: REGLES, juste: 0, options: [{ t: "Environ 1,79", e: "aucune" }, { t: "Environ 0,76", e: "ln.produit-en-produit" }, { t: "Environ 0,41", e: "aucune" }] },
    rappel: { capacites: REGLES, juste: 0, options: [{ t: "Environ 2,08", e: "aucune" }, { t: "Environ 5,5", e: "aucune" }, { t: "Environ 1,38", e: "inattention" }] },
    bande: { capacites: [], juste: 0, options: [{ t: "h × 1/x", e: "aucune" }, { t: "h × x", e: "aucune" }, { t: "h", e: "aucune" }] },
    derivee: { capacites: ETUDE, juste: 0, options: [{ t: "A′(x) = 1/x", e: "aucune" }, { t: "A(x) = 1/x", e: "aucune" }, { t: "A′(x) = h/x", e: "inattention" }] },
    pente: { capacites: ETUDE, juste: 0, options: [{ t: "0,1", e: "aucune" }, { t: "10", e: "graphe.pente-hauteur" }, { t: "Environ 2,30", e: "graphe.pente-hauteur" }] },
    e: { capacites: [], juste: null, options: [{ t: "Vers 2", e: "aucune" }, { t: "Entre 2 et 3", e: "aucune" }, { t: "Vers 10", e: "aucune" }] },
    gauche: { capacites: [], juste: null, options: [{ t: "Positif", e: "aucune" }, { t: "Négatif", e: "aucune" }, { t: "Nul", e: "aucune" }] },
    "croissance-2": { capacites: RESOUDRE, juste: 0, options: [{ t: "0 < x < 3", e: "aucune" }, { t: "x < 3", e: "ln.domaine-oublie" }, { t: "x > 3", e: "ln.croissance-renversee" }] },
    "v-courbe": { capacites: RESOUDRE, juste: 0, options: [{ t: "2 < x < 3", e: "aucune" }, { t: "x < 3", e: "ln.domaine-oublie" }, { t: "x > 3", e: "ln.signe-sur-0-1" }] },
    "r-quotient": { capacites: REGLES, juste: 0, options: [{ t: "ln a + ln(1/b)", e: "aucune" }, { t: "ln a × ln(1/b)", e: "ln.produit-en-produit" }, { t: "ln a / ln b", e: "ln.quotient-en-quotient" }] },
    "r-puissance": { capacites: [], juste: null, options: [{ t: "3 ln 2", e: "aucune" }, { t: "(ln 2)3", e: "aucune" }, { t: "Ni l’un ni l’autre", e: "aucune" }] },
    "r-puissance2": { capacites: REGLES, juste: 0, options: [{ t: "−n ln a", e: "aucune" }, { t: "(ln a)−n", e: "ln.exposant-reste-puissance" }, { t: "1 / (n ln a)", e: "ln.inverse-mal-traite" }] },
    "r-somme": { capacites: REGLES, juste: 0, options: [{ t: "ln(1 + 1) ≠ ln 1 + ln 1", e: "aucune" }, { t: "ln 1 + ln 1 ≠ 0", e: "ln.zero-et-un" }, { t: "Aucune : ln 2 = 0", e: "aucune" }] },
    "v-regles": { capacites: REGLES, juste: 0, options: [{ t: "3 ln 2 − ln 3", e: "aucune" }, { t: "3 ln 2 / ln 3", e: "ln.quotient-en-quotient" }, { t: "(ln 2)3 − ln 3", e: "ln.exposant-reste-puissance" }] },
    retour: { capacites: REGLES, juste: 0, options: [{ t: "ln(a × b) = ln a + ln b", e: "aucune" }, { t: "ln(a × b) = ln a × ln b", e: "ln.produit-en-produit" }, { t: "ln(a + b) = ln a + ln b", e: "ln.somme-en-somme" }] },
    bac: { capacites: [], juste: null, options: [{ t: "Écrire les conditions d’existenc", e: "aucune" }, { t: "Regrouper les deux ln en un seul", e: "aucune" }, { t: "Enlever les ln des deux côtés", e: "aucune" }] },
    "bac-rejet": { capacites: RESOUDRE, juste: 0, options: [{ t: "2 seulement", e: "aucune" }, { t: "2 et −2", e: "ln.domaine-oublie" }, { t: "Aucun", e: "aucune" }] },
    "bac-2": { capacites: RESOUDRE, juste: 0, options: [{ t: "x > 2", e: "aucune" }, { t: "x > 0", e: "ln.domaine-oublie" }, { t: "x ≠ 2", e: "ln.inegalite-stricte" }] },
    "bac-2-suite": { capacites: RESOUDRE, juste: 0, options: [{ t: "x2 − 2x = 3", e: "aucune" }, { t: "x + (x − 2) = 3", e: "ln.somme-en-somme" }, { t: "x(x − 2) = ln 3", e: "isoler.ln-un-seul-cote" }] },
    "bac-erreur": { capacites: RESOUDRE, juste: 0, options: [{ t: "Elle n’a pas confronté les candi", e: "aucune" }, { t: "Elle s’est trompée dans l’équati", e: "aucune" }, { t: "Elle n’avait pas le droit de reg", e: "aucune" }] },
    q1: { capacites: ETUDE, juste: 0, options: [{ t: "Négatif", e: "aucune" }, { t: "Positif", e: "ln.signe-sur-0-1" }, { t: "On ne peut pas savoir sans calcu", e: "aucune" }] },
    q2: { capacites: RESOUDRE, juste: 0, options: [{ t: "x < 3", e: "aucune" }, { t: "x > 3", e: "ineq.sens-diviser-negatif" }, { t: "x ≤ 3", e: "ln.inegalite-stricte" }] },
    q3: { capacites: REGLES, juste: 0, options: [{ t: "ln 15", e: "aucune" }, { t: "ln 8", e: "ln.somme-en-somme" }, { t: "ln 3 × ln 5", e: "ln.produit-en-produit" }] },
  },
  gabarits: {
    "ln-produit-puissance": {
      capacites: REGLES, niveau: 1, optionsQcm: 4,
      erreurs: { "ln(ab) = ln a × ln b": "ln.produit-en-produit", "ln(aⁿ) = (ln a)ⁿ": "ln.exposant-reste-puissance", "confondre produit et quotient": "inattention" },
    },
    "ln-quotient": {
      capacites: REGLES, niveau: 1, optionsQcm: 3,
      erreurs: { "ln(a/b) = ln a / ln b": "ln.quotient-en-quotient", "ln(1/a) = ln a": "ln.inverse-mal-traite" },
    },
    "ln-somme": {
      capacites: REGLES, niveau: 1, optionsQcm: 3,
      erreurs: { "ln(a + b) = ln a + ln b": "ln.somme-en-somme", "ln(ab) = ln a × ln b": "ln.produit-en-produit" },
    },
    "ln-vrai-faux": {
      capacites: REGLES, niveau: 1, optionsQcm: 2,
      erreurs: {
        "ln(ab) = ln a × ln b": "ln.produit-en-produit",
        "ln(a + b) = ln a + ln b": "ln.somme-en-somme",
        "ln(a/b) = ln a / ln b": "ln.quotient-en-quotient",
        "ln(aⁿ) = (ln a)ⁿ": "ln.exposant-reste-puissance",
        "ln(a²) = 2 ln a pour tout a ≠ 0": "ln.domaine-oublie",
        // douter d'une règle juste ne dit pas quelle règle fausse l'élève croit
        "douter d’une règle juste (la confondre avec « ln(ab) = ln a × ln b »)": "aucune",
        "douter d’une règle juste (la confondre avec « ln(1/a) = 1/ln a »)": "aucune",
        "douter d’une règle juste (la confondre avec « ln √a = √(ln a) »)": "aucune",
        "douter d’une règle juste (la confondre avec « ln(aⁿ) = (ln a)ⁿ »)": "aucune",
      },
    },
    "ln-signe": {
      capacites: RESOUDRE, niveau: 1, optionsQcm: 3,
      erreurs: { "confondre x et x − a": "ln.argument-oublie", "ln x < 0 sur ]0,1[ oublié": "ln.signe-sur-0-1", "oublier l’ensemble de définition": "ln.domaine-oublie", "confondre ln 0 et ln 1": "ln.zero-et-un" },
    },
    "ln-domaine": {
      capacites: [...RESOUDRE, "maths-sexp 1.2.22"], niveau: 1, optionsQcm: 4,
      erreurs: { "≥ au lieu de >": "ln.inegalite-stricte", "recopier ]0,+∞[ sans calcul": "ln.domaine-oublie", "garder le sens de l’inégalité en divisant par un négatif": "ineq.sens-diviser-negatif" },
    },
    "ln-simplifier": {
      capacites: REGLES, niveau: 2, optionsQcm: 4,
      erreurs: { "ln(1/a) = 1/ln a": "ln.inverse-mal-traite", "oublier le signe de l’inverse": "ln.inverse-mal-traite", "ln(aⁿ) = (ln a)ⁿ": "ln.exposant-reste-puissance", "ln √a = 2 ln a": "ln.racine", "oublier ln √e = ½": "ln.racine", "ln(eᵖ) = eᵖ": "ln.nombre-et-logarithme" },
    },
    "ln-inequation": {
      capacites: RESOUDRE, niveau: 2, optionsQcm: 3,
      erreurs: { "oublier l’ensemble de définition": "ln.domaine-oublie", "changer le sens de l’inégalité sans raison": "ln.croissance-renversee" },
    },
    "ln-equation": {
      capacites: RESOUDRE, niveau: 3, optionsQcm: 3,
      erreurs: { "ne garder qu’une des deux conditions": "ln.domaine-oublie", "recopier ]0,+∞[ sans calcul": "ln.domaine-oublie", "garder un ln d’un seul côté": "isoler.ln-un-seul-cote", "ln a + ln b = ln(a + b)": "ln.somme-en-somme", "garder une racine hors de l’ensemble de définition": "ln.domaine-oublie" },
    },
    "log-decimal": {
      capacites: ["maths-sexp 1.2.18"], niveau: 1, optionsQcm: 3,
      erreurs: { "sens d’une inéquation inversé": "ln.croissance-renversee", "log(10^x) = 10x": "log.puissance-de-dix", "confondre log et ln": "log.confondre-ln" },
    },
    "ln-limites": {
      capacites: ["maths-sexp 1.2.19", "maths-sm 1.3.11"], niveau: 2, optionsQcm: 4,
      erreurs: { "limite de référence mal appliquée": "aucune", "croissances comparées à l’envers": "lim.croissances-comparees-envers", "forme indéterminée prise pour 0": "lim.forme-indeterminee-nulle" },
    },
    "ln-derivee": {
      capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16", "maths-sm 1.3.16"], niveau: 2, optionsQcm: 3,
      erreurs: { "(ln u)′ = 1/u": "deriv.u-prime-oublie", "(ln u)′ = ln(u′)": "ln.derivee" },
    },
    "ln-tangente": {
      capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.16", "maths-sm 1.3.16"], niveau: 2, optionsQcm: 3,
      erreurs: { "oublier l’ordonnée ln a": "graphe.pente-hauteur", "prendre ln a pour pente": "graphe.pente-hauteur" },
    },
    "ln-etude": {
      capacites: ["maths-sexp 1.2.22", "maths-sexp 1.2.19", "maths-sexp 1.2.7", "maths-sm 1.3.16", "maths-sm 1.3.11"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "forme indéterminée prise pour 0": "lim.forme-indeterminee-nulle",
        "signe de −ln x en 0⁺": "ln.signe-sur-0-1",
        "confondre asymptote verticale et horizontale": "graphe.asymptote",
        "croissances comparées à l’envers": "lim.croissances-comparees-envers",
        "(ln x)′ = ln x": "ln.derivee",
        "(ax)′ = ax": "inattention",
        "ln(1/a) = ln a": "ln.inverse-mal-traite",
        "conclure sur le signe sans le minimum": "etude.signe-sans-minimum",
      },
    },
    "ln-systeme": {
      capacites: RESOUDRE, niveau: 2, optionsQcm: 3,
      erreurs: { "oublier le domaine d’existence": "ln.domaine-oublie", "inverser x et y": "inattention", "oublier de diviser par le coefficient": "isoler.coefficient-oublie", "confondre ln x et x": "ln.nombre-et-logarithme" },
    },
    "ln-primitive": {
      capacites: ["maths-sexp 1.2.15", "maths-sm 1.3.8"], niveau: 2, optionsQcm: 4,
      erreurs: { "oublier le facteur devant ln|u|": "prim.facteur-oublie", "confondre dérivée et primitive": "prim.derivee-primitive", "erreur de signe sur la constante C": "inattention", "oublier la valeur absolue sur ln|u|": "ln.domaine-oublie" },
    },
  },
};
