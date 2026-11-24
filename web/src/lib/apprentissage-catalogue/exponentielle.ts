/**
 * Catalogue d'apprentissage de la leçon `exponentielle` (format v3, leçon en cours de correction)
 * et de ses 14 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/exponentielle-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/exponentielle.js` (les libellés `erreur`,
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

const EXP = ["maths-sexp 1.2.20", "maths-sm 1.3.13"];
const LIM = ["maths-sexp 1.2.21", "maths-sm 1.3.14"];
const ETUDE = ["maths-sexp 1.2.22", "maths-sm 1.3.16"];
const DERIV = ["maths-sexp 1.2.6", "maths-sm 1.3.16"];
const REGLES = ["maths-sexp 1.2.16", "maths-sm 1.3.9"];

export const EXPONENTIELLE: CatalogueLecon = {
  lecon: "exponentielle",
  matiere: "maths",
  signature:
    "savoir,sav-rappel,bernoulli,semestre,fortune,curseur,plafond,defaire,k-curseur,cent,exp-nom,aller-retour,diag,domaine-exp,asymptotes,pliage,passage,somme-produit,preuve-produit,notation,e2x,ek,k-negatif,ek-ineq,inequation,systeme,v-equations,rappel,reflet-pente,pente-hauteur,derivee,eu,h0,v-derivee,tangente0,preuve-tangente,retour-plafond,retour-limite,croissance,course,x-sur-ex,x-ex-moins,bac,bac-sol,bac-copie,bac-ineq,bac-2,bac-2-suite,bac-2-ineq,q1,q2,q3,fin",
  questions: {
    savoir: { capacites: REGLES, juste: 0, options: [{ t: "2", e: "aucune" }, { t: "1", e: "ln.exposant-reste-puissance" }, { t: "e2", e: "ln.nombre-et-logarithme" }] },
    semestre: { capacites: [], juste: 0, options: [{ t: "2,25", e: "aucune" }, { t: "2", e: "aucune" }, { t: "4", e: "aucune" }] },
    fortune: { capacites: [], juste: null, options: [{ t: "grandit sans limite", e: "aucune" }, { t: "s’approche d’un plafond", e: "aucune" }, { t: "grandit de moins en moins vite,", e: "aucune" }] },
    defaire: { capacites: [], juste: 0, options: [{ t: "1", e: "aucune" }, { t: "0", e: "ln.zero-et-un" }, { t: "aucun, car ln 0 n’existe pas", e: "aucune" }] },
    cent: { capacites: [], juste: 0, options: [{ t: "oui, un seul", e: "aucune" }, { t: "non, ln monte si doucement qu’el", e: "aucune" }, { t: "oui, plusieurs", e: "aucune" }] },
    "aller-retour": { capacites: EXP, juste: 0, options: [{ t: "ln(exp x) = x", e: "aucune" }, { t: "exp(ln x) = x", e: "ln.domaine-oublie" }, { t: "les deux sont vraies", e: "ln.domaine-oublie" }] },
    diag: { capacites: [], juste: 0, options: [{ t: "(0,69 ; 2)", e: "aucune" }, { t: "(2 ; 0,69)", e: "aucune" }, { t: "(−0,69 ; 2)", e: "inattention" }] },
    "domaine-exp": { capacites: [], juste: 0, options: [{ t: "exp(x) existe pour tout réel x,", e: "aucune" }, { t: "exp n’existe que pour x > 0", e: "aucune" }, { t: "exp existe partout, et devient n", e: "exp.exposant-negatif" }] },
    asymptotes: { capacites: [], juste: 0, options: [{ t: "exp(x) s’approche de 0, sans l’a", e: "aucune" }, { t: "exp(x) devient de plus en plus n", e: "aucune" }, { t: "exp s’arrête en x = 0, sans suit", e: "aucune" }] },
    passage: { capacites: EXP, juste: 0, options: [{ t: "(0 ; 1)", e: "aucune" }, { t: "(0 ; 0)", e: "aucune" }, { t: "(1 ; 0)", e: "aucune" }] },
    "somme-produit": { capacites: [], juste: 0, options: [{ t: "exp(a) × exp(b)", e: "aucune" }, { t: "exp(a) + exp(b)", e: "exp.somme-en-somme" }, { t: "exp(a × b)", e: "exp.produit-exposants" }] },
    "preuve-produit": { capacites: [], juste: 0, options: [{ t: "AB = exp(a + b)", e: "aucune" }, { t: "ln(AB) = exp(a + b)", e: "aucune" }, { t: "AB = a + b", e: "aucune" }] },
    notation: { capacites: EXP, juste: 0, options: [{ t: "1/eᵃ", e: "aucune" }, { t: "−eᵃ", e: "exp.exposant-negatif" }, { t: "eᵃ", e: "inattention" }] },
    e2x: { capacites: EXP, juste: 0, options: [{ t: "(eˣ)²", e: "aucune" }, { t: "2eˣ", e: "exp.exposant-facteur" }, { t: "e^(x²)", e: "aucune" }] },
    ek: { capacites: EXP, juste: 0, options: [{ t: "x = ln 5", e: "aucune" }, { t: "x = 5/e", e: "exp.exposant-facteur" }, { t: "x = e^5", e: "exp.reciproque-confondue" }] },
    "k-negatif": { capacites: EXP, juste: 0, options: [{ t: "aucune solution", e: "aucune" }, { t: "x = ln(−2)", e: "exp.t-negatif" }, { t: "x = −ln 2", e: "aucune" }] },
    "ek-ineq": { capacites: EXP, juste: 0, options: [{ t: "x < ln 5", e: "aucune" }, { t: "x > ln 5", e: "exp.croissance-renversee" }, { t: "0 < x < ln 5", e: "aucune" }] },
    inequation: { capacites: EXP, juste: 0, options: [{ t: "x < 4", e: "aucune" }, { t: "x > 4", e: "exp.croissance-renversee" }, { t: "x < 4 et x > 1/2", e: "exp.conditions-ajoutees" }] },
    systeme: { capacites: EXP, juste: 0, options: [{ t: "(3 ; 2)", e: "aucune" }, { t: "(e3 ; e2)", e: "aucune" }, { t: "aucune solution : eˣ × eʸ ne se", e: "aucune" }] },
    "v-equations": { capacites: EXP, juste: 0, options: [{ t: "x > 0", e: "aucune" }, { t: "x > 1", e: "aucune" }, { t: "pour tout réel x", e: "exp.positivite-etendue" }] },
    rappel: { capacites: EXP, juste: 0, options: [{ t: "8", e: "aucune" }, { t: "6", e: "aucune" }, { t: "9", e: "inattention" }] },
    "reflet-pente": { capacites: [], juste: 0, options: [{ t: "4", e: "aucune" }, { t: "−1/4", e: "aucune" }, { t: "1/4", e: "aucune" }] },
    "pente-hauteur": { capacites: [], juste: 0, options: [{ t: "6", e: "aucune" }, { t: "1/6", e: "aucune" }, { t: "ln 6", e: "aucune" }] },
    derivee: { capacites: ETUDE, juste: 0, options: [{ t: "= 1/(1/ex) = ex", e: "aucune" }, { t: "= 1/(1/x) = x", e: "aucune" }, { t: "= x ex−1", e: "exp.derivee-regle-puissance" }] },
    eu: { capacites: DERIV, juste: 0, options: [{ t: "3e^(3x)", e: "aucune" }, { t: "e^(3x)", e: "deriv.u-prime-oublie" }, { t: "3x e^(3x − 1)", e: "exp.derivee-regle-puissance" }] },
    h0: { capacites: LIM, juste: 0, options: [{ t: "1", e: "aucune" }, { t: "0", e: "lim.forme-indeterminee-nulle" }, { t: "+∞", e: "aucune" }] },
    "v-derivee": { capacites: DERIV, juste: 0, options: [{ t: "(x − 1)eˣ", e: "aucune" }, { t: "eˣ", e: "deriv.terme-a-terme" }, { t: "(x − 2)eˣ", e: "aucune" }] },
    tangente0: { capacites: [], juste: null, options: [{ t: "au-dessus de sa tangente", e: "aucune" }, { t: "en dessous de sa tangente", e: "aucune" }, { t: "elle la traverse en 0", e: "aucune" }] },
    "preuve-tangente": { capacites: ETUDE, juste: 0, options: [{ t: "négatif avant 0, positif après 0", e: "aucune" }, { t: "positif partout, car eˣ > 0", e: "exp.positivite-etendue" }, { t: "négatif partout", e: "aucune" }] },
    "retour-plafond": { capacites: [], juste: 0, options: [{ t: "(1 + 1/n)^n ≤ (e^(1/n))^n = e", e: "aucune" }, { t: "(1 + 1/n)^n ≤ e^(1/n)", e: "aucune" }, { t: "(1 + 1/n)^n ≤ n e^(1/n)", e: "exp.exposant-facteur" }] },
    "retour-limite": { capacites: [], juste: 0, options: [{ t: "ln(1 + h)/h", e: "aucune" }, { t: "h ln(1 + h)", e: "aucune" }, { t: "ln(1 + h)", e: "aucune" }] },
    course: { capacites: [], juste: null, options: [{ t: "tend vers +∞", e: "aucune" }, { t: "tend vers 1 : les deux tendent v", e: "aucune" }, { t: "tend vers 0", e: "aucune" }] },
    "x-sur-ex": { capacites: LIM, juste: 0, options: [{ t: "0", e: "aucune" }, { t: "+∞", e: "lim.croissances-comparees-envers" }, { t: "1", e: "aucune" }] },
    "x-ex-moins": { capacites: LIM, juste: 0, options: [{ t: "0", e: "aucune" }, { t: "−∞", e: "lim.croissances-comparees-envers" }, { t: "on ne peut pas conclure : forme", e: "aucune" }] },
    bac: { capacites: [], juste: null, options: [{ t: "Poser t = ex, avec t > 0", e: "aucune" }, { t: "Prendre ln des deux membres", e: "aucune" }, { t: "Écrire les conditions d’existenc", e: "aucune" }] },
    "bac-sol": { capacites: EXP, juste: 0, options: [{ t: "x = 0 ou x = ln 3", e: "aucune" }, { t: "x = 1 ou x = 3", e: "exp.retour-t-x" }, { t: "x = e ou x = e3", e: "exp.reciproque-confondue" }] },
    "bac-ineq": { capacites: EXP, juste: 0, options: [{ t: "0 ≤ x ≤ ln 3", e: "aucune" }, { t: "1 ≤ x ≤ 3", e: "exp.retour-t-x" }, { t: "x ≤ 0 ou x ≥ ln 3", e: "aucune" }] },
    "bac-2": { capacites: EXP, juste: 0, options: [{ t: "t2 − t − 6 = 0, avec t > 0", e: "aucune" }, { t: "eˣ − 6 = 0, soit eˣ = 6", e: "exp.exposant-facteur" }, { t: "2x − x = ln 6, soit x = ln 6", e: "ln.somme-en-somme" }] },
    "bac-2-suite": { capacites: EXP, juste: 0, options: [{ t: "S = {ln 3}", e: "aucune" }, { t: "S = {ln 3 ; ln(−2)}", e: "exp.t-negatif" }, { t: "S = {ln 3 ; −ln 2}", e: "aucune" }] },
    "bac-2-ineq": { capacites: EXP, juste: 0, options: [{ t: "]−∞ ; ln 3]", e: "aucune" }, { t: "[−2 ; 3]", e: "exp.retour-t-x" }, { t: "]0 ; ln 3]", e: "aucune" }] },
    q1: { capacites: EXP, juste: 0, options: [{ t: "e^2 × e^3", e: "aucune" }, { t: "e^2 + e^3", e: "exp.somme-en-somme" }, { t: "e^6", e: "exp.produit-exposants" }] },
    q2: { capacites: ETUDE, juste: 0, options: [{ t: "x − 2", e: "aucune" }, { t: "toujours positif, car eˣ > 0", e: "exp.positivite-etendue" }, { t: "eˣ − 2", e: "aucune" }] },
    q3: { capacites: DERIV, juste: 0, options: [{ t: "−e^(−x)", e: "aucune" }, { t: "e^(−x)", e: "deriv.u-prime-oublie" }, { t: "−x e^(−x − 1)", e: "exp.derivee-regle-puissance" }] },
  },
  gabarits: {
    "exp-regles": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "eᵃeᵇ = e^{ab}": "exp.produit-exposants",
        "e^{a+b} = eᵃ + eᵇ": "exp.somme-en-somme",
        "diviser par eʳ en ajoutant r": "aucune",
        "(eᵃ)ⁿ = n eᵃ": "exp.exposant-facteur",
        "(eᵃ)ⁿ = e^{a+n}": "aucune",
        "e^{−a} = eᵃ": "inattention",
        "e^{−a} = −eᵃ": "exp.exposant-negatif",
      },
    },
    "exp-ln-retour": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "confondre aᵏ et kᵃ": "inattention",
        "e^{k ln a} = ka": "exp.exposant-facteur",
        "ln(eˣ) pris pour eˣ": "ln.nombre-et-logarithme",
        "e^{−ln a} = −a": "exp.exposant-negatif",
        "e^{−ln a} = a": "inattention",
        "exp(ln x) = x pour x ≤ 0": "ln.domaine-oublie",
      },
    },
    "exp-equation": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "signe de b mal changé": "inattention",
        "x = eᵏ": "exp.reciproque-confondue",
        "x = ln(−k) quand k ≤ 0": "exp.t-negatif",
        "diviser par a oublié": "isoler.coefficient-oublie",
        "eᵘ = 0 pris pour u = 0": "aucune",
      },
    },
    "exp-inequation": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "erreur de signe sur la borne": "inattention",
        "sens renversé sans raison": "exp.croissance-renversee",
        "conditions d’existence ajoutées": "exp.conditions-ajoutees",
        "sens gardé en divisant par un négatif": "ineq.sens-diviser-negatif",
      },
    },
    "exp-trinome": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "oublier de poser t = eˣ": "aucune",
        "e^{2x} = 2eˣ": "exp.exposant-facteur",
        "garder t < 0": "exp.t-negatif",
        "oublier de revenir de t à x": "exp.retour-t-x",
        "exp au lieu de ln": "exp.reciproque-confondue",
      },
    },
    "exp-trinome-ineq": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "S donné en t au lieu de x": "exp.retour-t-x",
        "signe du trinôme inversé": "aucune",
      },
    },
    "exp-signe": {
      capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "eˣ − k > 0 partout": "exp.positivite-etendue",
        "eˣ − k a le signe de x − k": "aucune",
        "eˣ − 1 > 0 partout": "exp.positivite-etendue",
        "signe d’un produit mal lu": "inattention",
        "valeurs comptées deux fois": "inattention",
        "« toujours positif car eˣ > 0 »": "exp.positivite-etendue",
        "signe du facteur inversé": "inattention",
        "eˣ pris pour un facteur nul": "aucune",
      },
    },
    "exp-derivee": {
      capacites: ["maths-sexp 1.2.6", "maths-sexp 1.2.22", "maths-sm 1.3.16"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "(e^u)′ = e^u": "deriv.u-prime-oublie",
        "(eˣ)′ = x e^{x−1}": "exp.derivee-regle-puissance",
        "erreur de signe dans u′v − uv′": "inattention",
        "quotient dérivé terme à terme": "deriv.terme-a-terme",
        "produit dérivé comme un produit des dérivées": "deriv.terme-a-terme",
      },
    },
    "exp-limites": {
      capacites: ["maths-sexp 1.2.21", "maths-sm 1.3.14"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "lim_{−∞} eˣ = −∞": "exp.exposant-negatif",
        "e^{−x} lu comme eˣ": "inattention",
        "forme 0/0 prise pour ∞": "aucune",
        "forme 0/0 prise pour 0": "lim.forme-indeterminee-nulle",
        "lim_{−∞} eˣ = 1": "aucune",
        "croissances comparées à l’envers": "lim.croissances-comparees-envers",
        "∞/∞ pris pour 1": "aucune",
      },
    },
    "exp-tangente": {
      capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "ordonnée eᵃ oubliée": "graphe.pente-hauteur",
        "pente a au lieu de eᵃ": "graphe.pente-hauteur",
        "ordonnée à l’origine prise pour l’ordonnée du point": "aucune",
        "courbe sous sa tangente": "aucune",
      },
    },
    "exp-systeme": {
      capacites: ["maths-sexp 1.2.20", "maths-sm 1.3.13"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "inconnues prises pour eˣ, eʸ": "aucune",
        "système en x + y et x − y non résolu": "inattention",
        "eˣ + eʸ = e^{x+y}": "exp.somme-en-somme",
        "somme prise pour une racine": "inattention",
      },
    },
    "exp-limite-facteur": {
      capacites: ["maths-sexp 1.2.21", "maths-sm 1.3.14"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "forme 0/0 prise pour 0": "lim.forme-indeterminee-nulle",
        "facteur k oublié": "aucune",
        "∞ − ∞ pris pour 0": "lim.forme-indeterminee-nulle",
        "croissances comparées à l’envers": "lim.croissances-comparees-envers",
      },
    },
    "exp-etude": {
      capacites: ["maths-sexp 1.2.22", "maths-sm 1.3.16"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "signe du produit mal lu": "inattention",
        "lim_{−∞}(x + a)eˣ = −∞": "lim.croissances-comparees-envers",
        "f et f′ confondues": "aucune",
        "asymptote oubliée": "aucune",
        "asymptote verticale inventée": "graphe.asymptote",
        "asymptote horizontale supposée": "aucune",
        "e⁰ oublié": "inattention",
        "∞ − ∞ pris pour 0": "lim.forme-indeterminee-nulle",
        "croissances comparées à l’envers": "lim.croissances-comparees-envers",
      },
    },
    "exp-base-a": {
      capacites: ["maths-sm 1.3.12", "maths-sm 1.3.15"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "exposant sorti en facteur": "exp.exposant-facteur",
        "confondre aˣ et xᵃ": "aucune",
        "(aˣ)′ = x a^{x−1}": "exp.derivee-regle-puissance",
        "(e^u)′ = e^u": "deriv.u-prime-oublie",
        "(x^a)′ = ln x · x^a": "aucune",
        "aˣ défini pour a ≤ 0": "ln.domaine-oublie",
      },
    },
  },
};
