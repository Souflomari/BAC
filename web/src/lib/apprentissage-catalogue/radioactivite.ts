/**
 * Catalogue d'apprentissage de la leçon `radioactivite` (format v3)
 * et de ses 12 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/radioactivite-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/radioactivite.js` (les libellés `erreur`,
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

const COMPO = ["pc-pc 1.2.1.1", "pc-sm 1.2.1.1", "pc-svt 1.2.1.1"];
const NZ = ["pc-pc 1.2.1.4", "pc-sm 1.2.1.4", "pc-svt 1.2.1.4"];
const DESINT = ["pc-pc 1.2.1.8", "pc-sm 1.2.1.8", "pc-svt 1.2.1.8"];
const LOI = ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10"];
const DEMI = ["pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12"];
const REL = ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"];
const UNITES = ["pc-pc 1.2.1.11", "pc-sm 1.2.1.11", "pc-svt 1.2.1.11", "pc-pc 1.2.1.14", "pc-sm 1.2.1.14", "pc-svt 1.2.1.14"];
const DATER = ["pc-pc 1.2.1.15", "pc-sm 1.2.1.15", "pc-svt 1.2.1.15"];
const ACTIVITE = ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.11", "pc-sm 1.2.1.11", "pc-svt 1.2.1.11"];

export const RADIOACTIVITE: CatalogueLecon = {
  lecon: "radioactivite",
  matiere: "physique",
  signature:
    "sav-test,sav-atome,sav-notation,becq,tiroir,enigme,c14,spontanee,soddy,alpha,betaplus,gamma,nz,v-ecrire,des,pari10,tic10,compte,duel,tic20,grands,v-des,marche1,marche2,demivie,demi-n,ruther,v-demivie,rappel,produit,deltaN,dNdt,x-test,expo,ln,verif,lambda-des,ln2,activite,a-lambda,masse,tau,v-tau,horloge,pari30,litteral,an,irhoud,choisir,v-datation,reponse,bac-geste,bac-litteral,bac-an,bac-copie,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: COMPO, juste: 0, options: [{ t: "6 protons et 8 neutrons", e: "aucune" }, { t: "6 protons et 14 neutrons", e: "noy.composition" }, { t: "14 protons et 6 neutrons", e: "noy.composition" }, { t: "8 protons et 6 neutrons", e: "aucune" }] },
    tiroir: { capacites: [], juste: null, options: [{ t: "Rien : sans lumière, pas d’image", e: "aucune" }, { t: "Des images très faibles", e: "aucune" }, { t: "Des silhouettes bien noires", e: "aucune" }] },
    enigme: { capacites: [], juste: null, options: [{ t: "Le gaz s’échappe, l’uranium rest", e: "aucune" }, { t: "L’uranium contient bien plus de", e: "aucune" }, { t: "Chaque sorte de noyau a son prop", e: "aucune" }] },
    c14: { capacites: [], juste: null, options: [{ t: "Toujours du carbone 14", e: "aucune" }, { t: "De l’azote 14 : 7 protons, 7 neu", e: "aucune" }, { t: "Du carbone 13 : il a perdu un nu", e: "aucune" }] },
    spontanee: { capacites: [], juste: 0, options: [{ t: "Au même rythme", e: "aucune" }, { t: "Plus vite", e: "rad.conditions-exterieures" }, { t: "Moins vite", e: "rad.conditions-exterieures" }] },
    alpha: { capacites: [], juste: null, options: [{ t: "Il perd 4 nucléons, et garde ses", e: "aucune" }, { t: "Il perd 4 nucléons, dont 2 proto", e: "aucune" }, { t: "Il perd 2 nucléons, dont 2 proto", e: "aucune" }] },
    betaplus: { capacites: [], juste: null, options: [{ t: "Z augmente de 1", e: "aucune" }, { t: "Z diminue de 1", e: "aucune" }, { t: "Z ne change pas", e: "aucune" }] },
    gamma: { capacites: [], juste: null, options: [{ t: "Il diminue Z de 1", e: "aucune" }, { t: "Il diminue A de 1", e: "aucune" }, { t: "Ni A ni Z", e: "aucune" }] },
    nz: { capacites: NZ, juste: 0, options: [{ t: "β− : un neutron devient un proto", e: "aucune" }, { t: "β+ : un proton devient un neutro", e: "aucune" }, { t: "α : deux protons et deux neutron", e: "aucune" }] },
    "v-ecrire": { capacites: DESINT, juste: 0, options: [{ t: "⁣234⁣92⁣U", e: "aucune" }, { t: "⁣238⁣93⁣Np", e: "aucune" }, { t: "⁣234⁣94⁣Pu", e: "aucune" }, { t: "⁣238⁣92⁣U", e: "aucune" }] },
    pari10: { capacites: [], juste: null, options: [{ t: "Presque aucun : dix fois un sixi", e: "aucune" }, { t: "Une quinzaine", e: "aucune" }, { t: "Une quarantaine", e: "aucune" }] },
    duel: { capacites: [], juste: null, options: [{ t: "Le survivant : son tour va venir", e: "aucune" }, { t: "Le dé neuf : le survivant est so", e: "aucune" }, { t: "Les deux, autant", e: "aucune" }] },
    grands: { capacites: [], juste: null, options: [{ t: "Plus : plus de dés, plus de hasa", e: "aucune" }, { t: "Autant qu’avec 100", e: "aucune" }, { t: "Moins : presque une seule courbe", e: "aucune" }] },
    "v-des": { capacites: LOI, juste: 0, options: [{ t: "Environ 10 : un sixième des 60 d", e: "aucune" }, { t: "Environ 17 : un sixième des 100", e: "rad.part-du-depart" }, { t: "Environ 50 : cinq sixièmes des 6", e: "aucune" }] },
    marche2: { capacites: [], juste: null, options: [{ t: "Moins de 3,8 tics : il y a moins", e: "aucune" }, { t: "3,8 tics, exactement pareil", e: "aucune" }, { t: "Plus de 3,8 tics : il ne reste q", e: "aucune" }] },
    ruther: { capacites: [], juste: null, options: [{ t: "Vers 1 min 30 s", e: "aucune" }, { t: "Vers 2 min", e: "aucune" }, { t: "Vers 4 min", e: "aucune" }] },
    "v-demivie": { capacites: DEMI, juste: 0, options: [{ t: "N0/8, soit 12,5 %", e: "aucune" }, { t: "N0/3", e: "rad.puissance-demivies" }, { t: "7N0/8", e: "rad.restants-desintegres" }, { t: "Plus rien : tout a disparu", e: "aucune" }] },
    rappel: { capacites: DEMI, juste: 0, options: [{ t: "Un huitième", e: "aucune" }, { t: "Un sixième", e: "rad.puissance-demivies" }, { t: "Aucun : tout a disparu", e: "aucune" }] },
    deltaN: { capacites: LOI, juste: 0, options: [{ t: "λNΔt", e: "aucune" }, { t: "λN0Δt", e: "rad.part-du-depart" }, { t: "λΔt", e: "aucune" }] },
    "x-test": { capacites: [], juste: 0, options: [{ t: "−2e−2t", e: "aucune" }, { t: "e−2t", e: "deriv.u-prime-oublie" }, { t: "−2te−2t", e: "aucune" }] },
    verif: { capacites: LOI, juste: 0, options: [{ t: "−λ N0 e−λt", e: "aucune" }, { t: "N0 e−λt", e: "deriv.u-prime-oublie" }, { t: "−λt N0 e−λt", e: "aucune" }] },
    ln2: { capacites: REL, juste: 0, options: [{ t: "λ t1/2 = ln 2", e: "aucune" }, { t: "λ t1/2 = 2", e: "aucune" }, { t: "λ t1/2 = 1", e: "phys.tau-demivie" }] },
    activite: { capacites: [], juste: null, options: [{ t: "Toujours environ 17", e: "aucune" }, { t: "Environ 8", e: "aucune" }, { t: "Environ 33", e: "aucune" }] },
    "v-tau": { capacites: DEMI, juste: 2, options: [{ t: "37 %", e: "rad.restants-desintegres" }, { t: "50 %", e: "phys.tau-demivie" }, { t: "63 %", e: "aucune" }] },
    pari30: { capacites: [], juste: null, options: [{ t: "Moins de 5 730 ans", e: "aucune" }, { t: "Entre 5 730 et 11 460 ans", e: "aucune" }, { t: "Plus de 17 190 ans", e: "aucune" }] },
    irhoud: { capacites: [], juste: null, options: [{ t: "Oui, avec un meilleur détecteur", e: "aucune" }, { t: "Non : il n’en reste presque rien", e: "aucune" }, { t: "Oui, mais avec moins de précisio", e: "aucune" }] },
    "v-datation": { capacites: DATER, juste: 0, options: [{ t: "le tritium (12,3 ans)", e: "aucune" }, { t: "le carbone 14 (5 730 ans)", e: "aucune" }, { t: "le potassium 40 (1,25 milliard d", e: "aucune" }] },
    "bac-geste": { capacites: [], juste: null, options: [{ t: "Écrire ce qui reste : N(t1) = 0,", e: "aucune" }, { t: "Écrire N(t1) = 0,95 N0", e: "aucune" }, { t: "Lire t1 sur la courbe", e: "aucune" }] },
    "bac-litteral": { capacites: REL, juste: 0, options: [{ t: "eλt1 = 20", e: "aucune" }, { t: "eλt1 = 0,05", e: "rad.signe-log" }, { t: "eλt1 = 0,95", e: "rad.restants-desintegres" }] },
    q1: { capacites: DEMI, juste: 2, options: [{ t: "25 %", e: "rad.restants-desintegres" }, { t: "50 %", e: "aucune" }, { t: "75 %", e: "aucune" }] },
    q2: { capacites: UNITES, juste: 0, options: [{ t: "s−1", e: "aucune" }, { t: "jour−1", e: "inattention" }, { t: "sans unité", e: "aucune" }] },
    q3: { capacites: ACTIVITE, juste: 1, options: [{ t: "8,0 × 106 noyaux", e: "aucune" }, { t: "a / λ", e: "aucune" }, { t: "λ × a", e: "aucune" }] },
  },
  gabarits: {
    "noyau-composition": {
      capacites: ["pc-pc 1.2.1.1", "pc-sm 1.2.1.1", "pc-svt 1.2.1.1", "pc-pc 1.2.1.2", "pc-sm 1.2.1.2", "pc-svt 1.2.1.2", "pc-pc 1.2.1.5", "pc-sm 1.2.1.5", "pc-svt 1.2.1.5"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "Z et A inversés": "noy.composition",
        "nombre de neutrons = A": "noy.composition",
        "isotopes = même A": "aucune",
        "isotopes = même nombre de neutrons": "aucune",
        "radioactivité provoquée ou prévisible": "rad.conditions-exterieures",
      },
    },
    "equation-desintegration": {
      capacites: ["pc-pc 1.2.1.6", "pc-sm 1.2.1.6", "pc-svt 1.2.1.6", "pc-pc 1.2.1.7", "pc-sm 1.2.1.7", "pc-svt 1.2.1.7", "pc-pc 1.2.1.8", "pc-sm 1.2.1.8", "pc-svt 1.2.1.8", "pc-pc 1.2.1.9", "pc-sm 1.2.1.9", "pc-svt 1.2.1.9"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "A conservé à tort en α": "aucune",
        "α ne change que A": "aucune",
        "signe de la charge de l’électron": "inattention",
        "type de radioactivité": "aucune",
        "γ change Z ou A": "aucune",
      },
    },
    "fraction-demivies": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "N₀/n au lieu de N₀/2ⁿ": "rad.puissance-demivies",
        "restants pris pour désintégrés": "rad.restants-desintegres",
      },
    },
    "lire-demivie-tau": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12", "pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "τ confondu avec t½": "phys.tau-demivie",
        "lire a₀/4 au lieu de a₀/2": "inattention",
        "t½ = 1/λ": "phys.tau-demivie",
      },
    },
    "lambda-unites": {
      capacites: ["pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13", "pc-pc 1.2.1.14", "pc-sm 1.2.1.14", "pc-svt 1.2.1.14"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "dimension de λ inversée": "aucune",
        "unités non converties": "inattention",
        "t½ = 1/λ": "phys.tau-demivie",
        "τ confondu avec t½": "phys.tau-demivie",
      },
    },
    "n0-masse-activite": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.11", "pc-sm 1.2.1.11", "pc-svt 1.2.1.11", "pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "unités non converties": "inattention",
        "quantité de matière prise pour N": "aucune",
        "t½ = 1/λ": "phys.tau-demivie",
        "activité prise pour N": "aucune",
      },
    },
    "instant-seuil": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "signe du logarithme": "rad.signe-log",
        "décroissance prise pour linéaire": "aucune",
        "restants pris pour désintégrés": "rad.restants-desintegres",
      },
    },
    "desintegres-entre-dates": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.12", "pc-sm 1.2.1.12", "pc-svt 1.2.1.12"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "N₀/n au lieu de N₀/2ⁿ": "rad.puissance-demivies",
        "désintégrés depuis t = 0 au lieu de entre t₁ et t₂": "aucune",
        "restants pris pour désintégrés": "rad.restants-desintegres",
      },
    },
    "datation-c14": {
      capacites: ["pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.15", "pc-sm 1.2.1.15", "pc-svt 1.2.1.15"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "décroissance prise pour linéaire": "aucune",
        "signe du logarithme": "rad.signe-log",
        "t½ = 1/λ": "phys.tau-demivie",
      },
    },
    "choisir-radioelement": {
      capacites: ["pc-pc 1.2.1.15", "pc-sm 1.2.1.15", "pc-svt 1.2.1.15"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "demi-vie trop courte devant l’âge": "aucune",
        "demi-vie trop longue devant l’âge": "aucune",
      },
    },
    "bac-complet": {
      capacites: ["pc-pc 1.2.1.8", "pc-sm 1.2.1.8", "pc-svt 1.2.1.8", "pc-pc 1.2.1.10", "pc-sm 1.2.1.10", "pc-svt 1.2.1.10", "pc-pc 1.2.1.11", "pc-sm 1.2.1.11", "pc-svt 1.2.1.11", "pc-pc 1.2.1.13", "pc-sm 1.2.1.13", "pc-svt 1.2.1.13"], niveau: 3, optionsQcm: 4,
      erreurs: {
        "α ne change que A": "aucune",
        "signe de la charge de l’électron": "inattention",
        "τ confondu avec t½": "phys.tau-demivie",
        "restants pris pour désintégrés": "rad.restants-desintegres",
        "t½ = 1/λ": "phys.tau-demivie",
        "expression littérale inversée": "aucune",
        "unités non converties": "inattention",
      },
    },
    "nz-diagramme": {
      capacites: ["pc-pc 1.2.1.3", "pc-sm 1.2.1.3", "pc-svt 1.2.1.3", "pc-pc 1.2.1.4", "pc-sm 1.2.1.4", "pc-svt 1.2.1.4"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "confondre zone α et β⁻": "aucune",
        "inverser zones β⁻ et β⁺": "aucune",
        "sens de déplacement inversé dans (N, Z)": "aucune",
      },
    },
  },
};
