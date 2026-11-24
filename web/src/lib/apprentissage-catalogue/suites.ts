/**
 * Catalogue d'apprentissage de la leçon `suites` (format v3)
 * et de ses 14 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/suites-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/suites.js` (les libellés `erreur`,
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

const AFF = ["maths-sexp 1.1.1", "maths-sm 1.1.1"];
const CONV = ["maths-sexp 1.1.2", "maths-sm 1.1.2"];
const COMP = ["maths-sexp 1.1.3", "maths-sm 1.1.3"];
const REC = ["maths-sexp 1.1.4", "maths-sm 1.1.4"];
const SEUIL = ["maths-sexp 1.1.5", "maths-sm 1.1.5", "maths-sexp 1.2.17", "maths-sm 1.3.10"];

export const SUITES: CatalogueLecon = {
  lecon: "suites",
  matiere: "maths",
  signature:
    "savoir,sav-rappel,comprime,deuxieme-jour,plateau,jours,questions,machine,premiere-marche,escalier,ou-vont,point-fixe,depart,u0-curseur,pas-assez,dominos,heredite-debut,heredite,init-oubliee,v-recurrence,difference,depart-mono,spirale,rappel,theoreme,majorant-3,bornee-oscille,pas-retrecissent,continuite,limite-dose,piege-2u,sans-point-fixe,v-lim-composee,geo-exp,malthus,retour-plafond,retour-vn,retour-formule,retour-jours,retour-dose,bac,bac-heredite,bac-mono,bac-lim,bac-copie,bac-2,bac-2-mono,bac-2-lim,bac-2-cite,q1,q2,q3,fin",
  questions: {
    savoir: { capacites: AFF, juste: 0, options: [{ t: "96", e: "aucune" }, { t: "13", e: "suites.arith-geo-confondues" }, { t: "192", e: "inattention" }] },
    "deuxieme-jour": { capacites: [], juste: 0, options: [{ t: "1,5", e: "aucune" }, { t: "2", e: "aucune" }, { t: "1", e: "aucune" }] },
    plateau: { capacites: [], juste: null, options: [{ t: "grandit sans limite", e: "aucune" }, { t: "s’approche d’un plafond", e: "aucune" }, { t: "grandit, puis finit par redescen", e: "aucune" }] },
    "premiere-marche": { capacites: [], juste: 0, options: [{ t: "aller à la droite y = x, puis de", e: "aucune" }, { t: "redescendre à la verticale, sur", e: "aucune" }, { t: "lire u1 sur l’axe vertical, c’es", e: "aucune" }] },
    "ou-vont": { capacites: [], juste: null, options: [{ t: "là où la courbe coupe la droite", e: "aucune" }, { t: "là où la courbe coupe l’axe vert", e: "aucune" }, { t: "en haut de la dernière marche", e: "aucune" }] },
    depart: { capacites: [], juste: null, options: [{ t: "2, comme avant", e: "aucune" }, { t: "un plafond plus haut que 2, car", e: "aucune" }, { t: "5 : la suite reste près de son d", e: "aucune" }] },
    "pas-assez": { capacites: [], juste: null, options: [{ t: "inférieur à 2", e: "aucune" }, { t: "supérieur à 2", e: "aucune" }] },
    "heredite-debut": { capacites: REC, juste: 0, options: [{ t: "Soit n tel que 0 ≤ un < 2. Montr", e: "aucune" }, { t: "Supposons que 0 ≤ un < 2 pour to", e: "aucune" }, { t: "Montrons que 0 ≤ un+1 < 2, sans", e: "suites.heredite-sans-hypothese" }] },
    heredite: { capacites: REC, juste: 0, options: [{ t: "f(0) ≤ f(un) < f(2), car f est c", e: "aucune" }, { t: "f(2)\">f(0) ≥ f(un) > f(2), car f", e: "suites.croissante-renverse-ordre" }, { t: "f(un) < 2, car ½x + 1 < 2 pour t", e: "suites.heredite-sans-hypothese" }, { t: "f(0) ≤ f(un+1) < f(2), car f est", e: "aucune" }] },
    "init-oubliee": { capacites: REC, juste: 0, options: [{ t: "faux : u0 = 0, l’initialisation", e: "aucune" }, { t: "juste : l’hérédité suffit", e: "suites.initialisation-oubliee" }, { t: "faux : l’hérédité contient une e", e: "aucune" }] },
    "v-recurrence": { capacites: REC, juste: 0, options: [{ t: "un > 2 pour tout n", e: "aucune" }, { t: "un < 2 pour tout n", e: "aucune" }, { t: "un ≥ 5 pour tout n", e: "aucune" }] },
    difference: { capacites: REC, juste: 0, options: [{ t: "0,\\ \\text{car}\\ u_n= ½(2 − un) >", e: "aucune" }, { t: "> 0, car f est croissante", e: "suites.sens-f-sens-suite" }, { t: "0,\\ \\text{donc décroissante}\">un", e: "inattention" }] },
    "depart-mono": { capacites: REC, juste: 0, options: [{ t: "décroissante", e: "aucune" }, { t: "croissante, car f l’est", e: "suites.sens-f-sens-suite" }, { t: "ni l’une ni l’autre", e: "aucune" }] },
    spirale: { capacites: [], juste: null, options: [{ t: "décroissante, comme f", e: "aucune" }, { t: "croissante", e: "aucune" }, { t: "ni l’une ni l’autre", e: "aucune" }] },
    rappel: { capacites: REC, juste: 0, options: [{ t: "décroissante, car f(x) − x = ½(2", e: "aucune" }, { t: "croissante, car f est croissante", e: "suites.sens-f-sens-suite" }, { t: "ni croissante ni décroissante :", e: "aucune" }] },
    theoreme: { capacites: [], juste: null, options: [{ t: "oui : elle converge", e: "aucune" }, { t: "non : elle peut monter sans fin", e: "aucune" }, { t: "cela dépend de son départ", e: "aucune" }] },
    "majorant-3": { capacites: CONV, juste: 0, options: [{ t: "converge, vers une limite ≤ 3", e: "aucune" }, { t: "converge vers 3", e: "suites.majorant-limite" }, { t: "tend vers +∞, car elle est crois", e: "suites.critere-incomplet" }] },
    "bornee-oscille": { capacites: CONV, juste: 0, options: [{ t: "non : elle saute de −1 à 1 sans", e: "aucune" }, { t: "oui, vers 0, entre ses bornes", e: "suites.critere-incomplet" }, { t: "oui, car une suite bornée est mo", e: "aucune" }] },
    "pas-retrecissent": { capacites: [], juste: null, options: [{ t: "converge : les pas rétrécissent", e: "aucune" }, { t: "tend vers +∞", e: "aucune" }, { t: "oscille", e: "aucune" }] },
    "limite-dose": { capacites: CONV, juste: 0, options: [{ t: "elle est croissante et majorée p", e: "aucune" }, { t: "elle est croissante, donc elle c", e: "suites.critere-incomplet" }, { t: "ℓ = f(ℓ) a la solution 2", e: "suites.point-fixe-convergence" }] },
    "piege-2u": { capacites: REC, juste: 0, options: [{ t: "on ne peut rien conclure sans pr", e: "aucune" }, { t: "sn tend vers 1, car ℓ = 1 est la", e: "suites.point-fixe-convergence" }, { t: "sn tend vers 2, car c’est son pr", e: "suites.depart-limite" }] },
    "sans-point-fixe": { capacites: REC, juste: 0, options: [{ t: "e−ℓ = 0 est impossible, donc ell", e: "aucune" }, { t: "e−ℓ = 0 donne ℓ = 0, qui est la", e: "aucune" }, { t: "ℓ = +∞ est la solution de e−ℓ =", e: "aucune" }] },
    "v-lim-composee": { capacites: COMP, juste: 0, options: [{ t: "ln 2 ≈ 0,69", e: "aucune" }, { t: "2", e: "aucune" }, { t: "−∞", e: "aucune" }] },
    "geo-exp": { capacites: CONV, juste: 0, options: [{ t: "0", e: "aucune" }, { t: "−∞", e: "aucune" }, { t: "1", e: "aucune" }] },
    malthus: { capacites: [], juste: null, options: [{ t: "tend vers +∞", e: "aucune" }, { t: "se stabilise", e: "aucune" }, { t: "tend vers 0", e: "aucune" }] },
    "retour-vn": { capacites: AFF, juste: 0, options: [{ t: "= ½(un − 2) = ½vn", e: "aucune" }, { t: "= ½un − 1 : raison ½un − 1", e: "aucune" }, { t: "vn+1 = ½vn + 1, comme pour un", e: "aucune" }] },
    "retour-formule": { capacites: AFF, juste: 0, options: [{ t: "2 − 2(½)n", e: "aucune" }, { t: "2 − (½)n", e: "aucune" }, { t: "−2(½)n", e: "aucune" }] },
    "retour-jours": { capacites: SEUIL, juste: 0, options: [{ t: "n ≥ ln 0,01 / ln ½", e: "aucune" }, { t: "n ≤ ln 0,01 / ln ½", e: "suites.sens-ln-q" }, { t: "n ≥ ln 0,01 / ln 2", e: "inattention" }] },
    "retour-dose": { capacites: REC, juste: 0, options: [{ t: "4", e: "aucune" }, { t: "2", e: "aucune" }, { t: "3", e: "aucune" }] },
    bac: { capacites: [], juste: null, options: [{ t: "chercher, dans les questions pré", e: "aucune" }, { t: "calculer u1, u2, u3 et constater", e: "aucune" }, { t: "étudier le signe de un+1 − un", e: "aucune" }] },
    "bac-heredite": { capacites: REC, juste: 0, options: [{ t: "f(0) < f(un) < f(ln 4), car f es", e: "aucune" }, { t: "f(0) > f(un) > f(ln 4), car f re", e: "suites.croissante-renverse-ordre" }, { t: "un+1 = f(un) < ln 4, car f(x) <", e: "suites.heredite-sans-hypothese" }] },
    "bac-mono": { capacites: REC, juste: 0, options: [{ t: "négatif : un > 0 et eun/2 < 2, c", e: "aucune" }, { t: "positif, car f(x) − x > 0 sur ]−", e: "aucune" }, { t: "positif, car f est croissante", e: "suites.sens-f-sens-suite" }] },
    "bac-lim": { capacites: REC, juste: 0, options: [{ t: "0, car ln 4 > 1 = u0", e: "aucune" }, { t: "ln 4, le majorant de la suite", e: "suites.majorant-limite" }, { t: "1, le premier terme", e: "suites.depart-limite" }] },
    "bac-2": { capacites: REC, juste: 0, options: [{ t: "f(1) ≤ f(un) ≤ f(e), car f est c", e: "aucune" }, { t: "ln 1 ≤ ln un ≤ ln e, donc 0 ≤ un", e: "aucune" }, { t: "f(e) ≤ f(un) ≤ f(1), car f est c", e: "suites.croissante-renverse-ordre" }] },
    "bac-2-mono": { capacites: REC, juste: 0, options: [{ t: "½(ln un − 1)² ≥ 0 : croissante", e: "aucune" }, { t: "f ′(un) ≥ 0, donc croissante", e: "suites.sens-f-sens-suite" }, { t: "un − un+1 = ½(ln un − 1)² ≥ 0, d", e: "inattention" }] },
    "bac-2-lim": { capacites: REC, juste: 0, options: [{ t: "e", e: "aucune" }, { t: "1", e: "suites.depart-limite" }, { t: "+∞", e: "suites.critere-incomplet" }] },
    "bac-2-cite": { capacites: REC, juste: 0, options: [{ t: "f continue sur [1 ; e], f([1 ; e", e: "aucune" }, { t: "f est strictement croissante sur", e: "aucune" }, { t: "ℓ = f(ℓ) a au moins une solution", e: "aucune" }] },
    q1: { capacites: CONV, juste: 0, options: [{ t: "elle converge, vers une limite ≤", e: "aucune" }, { t: "elle converge, et sa limite est", e: "suites.majorant-limite" }, { t: "elle tend vers +∞, car elle croî", e: "suites.critere-incomplet" }] },
    q2: { capacites: REC, juste: 0, options: [{ t: "f(0) ≤ f(un) ≤ f(2), car f est c", e: "aucune" }, { t: "f(0) ≥ f(un) ≥ f(2), car f renve", e: "suites.croissante-renverse-ordre" }, { t: "f(un) ≤ 2, car f(x) ≤ 2 pour tou", e: "suites.heredite-sans-hypothese" }] },
    q3: { capacites: REC, juste: 0, options: [{ t: "pas forcément : il faut prouver", e: "aucune" }, { t: "oui, elle converge vers cette so", e: "suites.point-fixe-convergence" }, { t: "oui, car la suite est bornée", e: "suites.critere-incomplet" }] },
  },
  gabarits: {
    "suites-base": {
      capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "arithmétique et géométrique confondues": "suites.arith-geo-confondues",
        "un pas de trop": "inattention",
        "a(u_n + b) au lieu de a·u_n + b": "aucune",
        "un pas de moins": "inattention",
        "a oublié (seul b ajouté)": "aucune",
        "pas et termes confondus": "inattention",
      },
    },
    "recurrence-affine": {
      capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "hérédité sans hypothèse": "suites.heredite-sans-hypothese",
        "rang n + 1 utilisé": "aucune",
        "initialisation décalée": "inattention",
        "initialisation oubliée": "suites.initialisation-oubliee",
        "a(u_n + b) au lieu de a·u_n + b": "aucune",
      },
    },
    "recurrence-f-croissante": {
      capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "f(x) < b pour tout x": "suites.heredite-sans-hypothese",
        "ordre renversé (f traitée comme décroissante)": "suites.croissante-renverse-ordre",
        "borne non transformée": "aucune",
        "ln appliqué au lieu de f": "aucune",
      },
    },
    "monotonie": {
      capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "f croissante donc suite croissante": "suites.sens-f-sens-suite",
        "signe de f(x) − x lu sur le mauvais intervalle": "aucune",
        "différence inversée": "inattention",
        "terme pris pour la différence": "inattention",
      },
    },
    "critere-convergence": {
      capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "une seule hypothèse suffit": "suites.critere-incomplet",
        "croissante donc +∞": "suites.critere-incomplet",
        "hérédité circulaire": "aucune",
        "mauvaise borne": "aucune",
        "bornée donc monotone": "aucune",
        "confusion suite et fonction": "aucune",
        "un signe ajouté au lieu de la monotonie": "aucune",
        "un majorant pris pour la limite": "suites.majorant-limite",
      },
    },
    "point-fixe": {
      capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4", "maths-sexp 1.1.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "la limite dépend du terme initial": "suites.depart-limite",
        "constante prise pour la limite": "aucune",
        "racine négative gardée": "aucune",
        "l’autre point fixe pris pour la limite": "aucune",
        "un point fixe prouve la convergence": "suites.point-fixe-convergence",
        "u₀ ou le majorant pris pour la limite": "aucune",
        "un majorant pris pour la limite": "aucune",
      },
    },
    "limite-geometrique": {
      capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "qⁿ → 0 pour q > 1": "aucune",
        "qⁿ s’arrête à 1": "aucune",
        "signe de a oublié": "inattention",
        "qⁿ → 0 pour q ≥ 1": "aucune",
        "1ⁿ → +∞": "aucune",
        "qⁿ → 0 pour q ≤ −1": "aucune",
        "signe alterné ignoré": "aucune",
        "−∞ au lieu de 0": "aucune",
        "q < 0 donc pas de limite": "aucune",
      },
    },
    "limite-composee": {
      capacites: ["maths-sexp 1.1.3", "maths-sm 1.1.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "g(u_0) au lieu de g(ℓ)": "suites.depart-limite",
        "g oubliée": "aucune",
        "continuité en ℓ non regardée": "aucune",
      },
    },
    "suite-auxiliaire-affine": {
      capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1", "maths-sexp 1.1.2"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "raison b au lieu de a": "aucune",
        "v_0 pris pour u_0": "aucune",
        "v_n pris pour u_n": "aucune",
        "un point fixe prouve la convergence": "suites.point-fixe-convergence",
        "la limite dépend du terme initial": "suites.depart-limite",
        "u_n = ℓ + aⁿ (v_0 oublié)": "aucune",
        "constante prise pour la limite": "aucune",
      },
    },
    "seuil-ln": {
      capacites: ["maths-sexp 1.1.5", "maths-sm 1.1.5", "maths-sexp 1.2.17", "maths-sm 1.3.10"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "le sens gardé en divisant par ln q < 0": "suites.sens-ln-q",
        "arrondi vers le bas": "inattention",
        "ln(a/b) = ln a / ln b": "ln.quotient-en-quotient",
      },
    },
    "fin-de-probleme": {
      capacites: ["maths-sexp 1.1.4", "maths-sm 1.1.4", "maths-sexp 1.1.3"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "hérédité sans hypothèse": "suites.heredite-sans-hypothese",
        "ordre renversé (f traitée comme décroissante)": "suites.croissante-renverse-ordre",
        "f croissante donc suite croissante": "suites.sens-f-sens-suite",
        "différence inversée": "inattention",
        "un majorant pris pour la limite": "suites.majorant-limite",
        "critère non appliqué": "aucune",
        "croissante donc +∞": "suites.critere-incomplet",
        "la limite dépend du terme initial": "suites.depart-limite",
        "un minorant pris pour la limite": "aucune",
        "un terme de la suite pris pour la limite": "aucune",
      },
    },
    "homographique": {
      capacites: ["maths-sexp 1.1.1", "maths-sm 1.1.1"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "raison mal calculée (inverse)": "aucune",
        "v_0 pris pour u_0": "aucune",
      },
    },
    "majoration-geometrique": {
      capacites: ["maths-sexp 1.1.2", "maths-sm 1.1.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "quotient sans positivité": "aucune",
        "exposant décalé": "inattention",
        "arithmétique et géométrique confondues": "suites.arith-geo-confondues",
        "gendarmes mal appliqué": "aucune",
      },
    },
    "accroissements-finis": {
      capacites: ["maths-sm 1.3.17", "maths-sm 1.1.4"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "intervalle non stable": "aucune",
        "exposant décalé": "inattention",
        "k ≥ 1": "aucune",
      },
    },
  },
};
