/**
 * Catalogue d'apprentissage de la leçon `dipole-rl` (format v3)
 * et de ses 15 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/dipole-rl-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/dipole-rl.js` (les libellés `erreur`,
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

const CONV = ["pc-pc 1.3.2.1", "pc-sm 1.3.2.1", "pc-svt 1.3.2.1"];
const UEXPR = ["pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2"];
const SIGN = ["pc-pc 1.3.2.3", "pc-sm 1.3.2.3", "pc-svt 1.3.2.3"];
const CARAC = ["pc-pc 1.3.2.4", "pc-sm 1.3.2.4", "pc-svt 1.3.2.4"];
const ED = ["pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5"];
const IEXPR = ["pc-pc 1.3.2.6", "pc-sm 1.3.2.6", "pc-svt 1.3.2.6"];
const COURBES = ["pc-pc 1.3.2.7", "pc-sm 1.3.2.7", "pc-svt 1.3.2.7"];
const CONT = ["pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8"];
const TAU = ["pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9"];
const DIM = ["pc-pc 1.3.2.10", "pc-sm 1.3.2.10", "pc-svt 1.3.2.10"];
const DOCS = ["pc-pc 1.3.2.11", "pc-sm 1.3.2.11", "pc-svt 1.3.2.11"];
const OSC = ["pc-pc 1.3.2.13", "pc-sm 1.3.2.13", "pc-svt 1.3.2.14"];
const INFL = ["pc-pc 1.3.2.14", "pc-sm 1.3.2.14", "pc-svt 1.3.2.15"];
const ETABLIR = ["pc-pc 1.3.2.15", "pc-sm 1.3.2.15"];
const ENERGIE = ["pc-pc 1.3.2.16", "pc-sm 1.3.2.16", "pc-svt 1.3.2.16"];

export const DIPOLE_RL: CatalogueLecon = {
  lecon: "dipole-rl",
  matiere: "physique",
  signature:
    "sav-test,sav-rappel,deux-lampes,etincelle,bobine,convention,pente-tension,bobine-reelle,triangle,triangle-L,allure,u0,pas-pari,permanent,ed-maille,ed-forme,meme-equation,verif,dim,uL-t,rappel,tau-63,double-L,double-R,curseurs,influence-E,r-palier,rupture-pari,ed-rupture,rupture-tau,uL-rupture,surtension,energie-pari,energie-etablir,energie-calc,oscillo,oscillo-voies,retour-lampes,bac,bac-ed,bac-AB,bac-L,bac-uL,bac-2a,bac-2b,bac-2c,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: [], juste: 0, options: [{ t: "environ 3,8 V : 63 % de E", e: "aucune" }, { t: "6 V : la charge est finie", e: "aucune" }, { t: "environ 2,2 V : 37 % de E", e: "aucune" }] },
    "deux-lampes": { capacites: [], juste: null, options: [{ t: "les deux lampes s’allument ensem", e: "aucune" }, { t: "L2 s’allume en retard, puis bril", e: "aucune" }, { t: "L2 ne s’allume jamais : la bobin", e: "aucune" }] },
    etincelle: { capacites: [], juste: null, options: [{ t: "au contact seulement", e: "aucune" }, { t: "à la rupture seulement", e: "aucune" }, { t: "aux deux, pareilles", e: "aucune" }, { t: "nulle part : une pile est trop f", e: "aucune" }] },
    bobine: { capacites: SIGN, juste: 0, options: [{ t: "la résistance du fil de la bobin", e: "aucune" }, { t: "une résistance qu’on ajoute en s", e: "aucune" }, { t: "nulle pour une bonne bobine : on", e: "aucune" }] },
    convention: { capacites: CONV, juste: 0, options: [{ t: "pointe vers le haut, à l’opposé", e: "aucune" }, { t: "suit le sens de i, vers le bas", e: "aucune" }, { t: "se choisit librement : la bobine", e: "aucune" }] },
    "pente-tension": { capacites: UEXPR, juste: 0, options: [{ t: "7,5 V : L·Δi/Δt", e: "aucune" }, { t: "0,06 V : L·i", e: "rl.li-ldidt" }, { t: "0 : une bobine est un simple fil", e: "aucune" }] },
    "bobine-reelle": { capacites: UEXPR, juste: 0, options: [{ t: "1,0 V : r·i, car di/dt = 0", e: "aucune" }, { t: "0 : plus de variation, plus de t", e: "rl.r-oubliee" }, { t: "0,03 V : L·i", e: "rl.li-ldidt" }] },
    triangle: { capacites: [], juste: null, options: [{ t: "est un triangle aussi, comme i", e: "aucune" }, { t: "est faite de créneaux : elle cha", e: "aucune" }, { t: "est presque nulle : i revient sa", e: "aucune" }] },
    "triangle-L": { capacites: CARAC, juste: 0, options: [{ t: "0,30 H : u divisée par la pente", e: "aucune" }, { t: "60 H : u divisée par Δi", e: "inattention" }, { t: "3,3 H : la pente divisée par u", e: "aucune" }, { t: "0,325 H : u lue en bout de rampe", e: "aucune" }] },
    allure: { capacites: [], juste: null, options: [{ t: "il saute aussitôt à sa valeur fi", e: "aucune" }, { t: "il monte en ligne droite, puis s", e: "aucune" }, { t: "il part de 0, monte vite, puis d", e: "aucune" }] },
    u0: { capacites: CONT, juste: 0, options: [{ t: "E = 6 V : tout est sur la bobine", e: "aucune" }, { t: "0 : comme le courant, nulle auss", e: "rl.ul-continue" }, { t: "1,0 V : la valeur de r·I0", e: "aucune" }] },
    "pas-pari": { capacites: [], juste: null, options: [{ t: "10 mA encore : même durée, même", e: "aucune" }, { t: "moins de 10 mA", e: "aucune" }, { t: "plus de 10 mA : la bobine s’est", e: "aucune" }] },
    permanent: { capacites: CONT, juste: 0, options: [{ t: "E/(R + r) = 100 mA", e: "aucune" }, { t: "E/R = 120 mA", e: "rl.r-oubliee" }, { t: "nul : la bobine bloque le couran", e: "aucune" }] },
    "ed-maille": { capacites: ED, juste: 0, options: [{ t: "L di/dt + (R + r) i = E", e: "aucune" }, { t: "L di/dt + R i = E", e: "rl.r-oubliee" }, { t: "L i + (R + r) di/dt = E", e: "aucune" }] },
    "ed-forme": { capacites: ED, juste: 0, options: [{ t: "divisant les deux membres par L", e: "aucune" }, { t: "multipliant les deux membres par", e: "aucune" }, { t: "divisant les deux membres par R", e: "aucune" }] },
    "meme-equation": { capacites: IEXPR, juste: 0, options: [{ t: "E/(R + r) × (1 − e−t/τ), avec τ", e: "aucune" }, { t: "E/(R + r) × e−t/τ, la loi du cou", e: "rl.courant-saute" }, { t: "E × (1 − e−t/τ), avec τ = L/(R +", e: "aucune" }] },
    verif: { capacites: ED, juste: 0, options: [{ t: "A = E/(R + r) et τ = L/(R + r)", e: "aucune" }, { t: "A = E/R et τ = L/R", e: "rl.r-oubliee" }, { t: "A = E/(R + r) et τ = (R + r)/L", e: "aucune" }] },
    dim: { capacites: DIM, juste: 0, options: [{ t: "[T] : τ est une durée", e: "aucune" }, { t: "[T]⁻¹ : c’est (R + r)/L", e: "aucune" }, { t: "sans dimension : [U] et [I] se c", e: "aucune" }] },
    "uL-t": { capacites: IEXPR, juste: 0, options: [{ t: "uL = r I0 + R I0 e−t/τ", e: "aucune" }, { t: "uL = E e−t/τ : la bobine idéale", e: "rl.r-oubliee" }, { t: "uL = E (1 − e−t/τ) : elle monte", e: "rl.ul-continue" }] },
    rappel: { capacites: CONT, juste: 0, options: [{ t: "i = 0 et uL = E", e: "aucune" }, { t: "i = E/(R + r) et uL = 0 : c’est", e: "rl.courant-saute" }, { t: "i = 0 et uL = 0", e: "rl.ul-continue" }] },
    "tau-63": { capacites: TAU, juste: 2, options: [{ t: "2,3 ms : lu à 37 mA", e: "aucune" }, { t: "3,5 ms : lu à 50 mA, la moitié", e: "aucune" }, { t: "5,0 ms : lu à 63 mA", e: "aucune" }] },
    "double-L": { capacites: [], juste: null, options: [{ t: "monte deux fois plus lentement,", e: "aucune" }, { t: "monte vers un palier deux fois p", e: "aucune" }, { t: "monte plus vite : plus de spires", e: "aucune" }] },
    "double-R": { capacites: [], juste: null, options: [{ t: "seul τ change, comme en RC", e: "aucune" }, { t: "seul le palier baisse", e: "aucune" }, { t: "le palier et τ baissent tous les", e: "aucune" }] },
    "influence-E": { capacites: INFL, juste: 0, options: [{ t: "le palier double, τ ne change pa", e: "aucune" }, { t: "le palier double et τ double aus", e: "rl.e-change-tau" }, { t: "le palier double et τ est divisé", e: "rl.e-change-tau" }] },
    "r-palier": { capacites: CARAC, juste: 0, options: [{ t: "10 Ω : uL / I0", e: "aucune" }, { t: "60 Ω : E / I0", e: "aucune" }, { t: "0 : pas de tension en courant co", e: "rl.r-oubliee" }, { t: "0,1 Ω : I0 / uL", e: "inattention" }] },
    "rupture-pari": { capacites: [], juste: null, options: [{ t: "tombe à 0 aussitôt : plus de gén", e: "aucune" }, { t: "décroît de 100 mA vers 0", e: "aucune" }, { t: "change de sens aussitôt, comme à", e: "aucune" }] },
    "ed-rupture": { capacites: ED, juste: 0, options: [{ t: "L di/dt + (R + r) i = 0", e: "aucune" }, { t: "L di/dt + (R + r) i = E", e: "aucune" }, { t: "L di/dt − (R + r) i = 0", e: "aucune" }] },
    "rupture-tau": { capacites: COURBES, juste: 0, options: [{ t: "environ 37 mA : il en reste 37 %", e: "aucune" }, { t: "environ 63 mA : 63 % de I0", e: "aucune" }, { t: "0 : τ est la fin de la rupture", e: "aucune" }] },
    "uL-rupture": { capacites: CONT, juste: 0, options: [{ t: "−5,0 V : uL = −uR", e: "aucune" }, { t: "+1,0 V : uL est continue", e: "rl.ul-continue" }, { t: "0 : plus de générateur", e: "rl.courant-saute" }] },
    surtension: { capacites: [], juste: null, options: [{ t: "au plus 6 V : la bobine ne rend", e: "aucune" }, { t: "environ 100 V", e: "aucune" }, { t: "0 : le générateur est parti", e: "aucune" }] },
    "energie-pari": { capacites: [], juste: null, options: [{ t: "deux fois plus d’énergie", e: "aucune" }, { t: "quatre fois plus d’énergie", e: "aucune" }, { t: "rien de plus : la bobine stocke", e: "aucune" }] },
    "energie-etablir": { capacites: ETABLIR, juste: 0, options: [{ t: "½ L i2", e: "aucune" }, { t: "L i2", e: "aucune" }, { t: "½ L i2 + r i2", e: "aucune" }] },
    "energie-calc": { capacites: ENERGIE, juste: 0, options: [{ t: "1,5 mJ", e: "aucune" }, { t: "15 mJ", e: "aucune" }, { t: "1,5 × 103 J", e: "inattention" }] },
    oscillo: { capacites: OSC, juste: 0, options: [{ t: "uR, car uR = R i", e: "aucune" }, { t: "uL : c’est la tension de la bobi", e: "aucune" }, { t: "rien : un oscilloscope ne voit p", e: "aucune" }] },
    "oscillo-voies": { capacites: DOCS, juste: 0, options: [{ t: "celle qui part de 6,0 V", e: "aucune" }, { t: "celle qui part de 0", e: "aucune" }, { t: "aucune : uL doit finir à 0", e: "rl.r-oubliee" }] },
    bac: { capacites: [], juste: null, options: [{ t: "Écrire l’additivité des tensions", e: "aucune" }, { t: "Dériver i(t) = A + B e−t/τ et re", e: "aucune" }, { t: "Lire τ sur la tangente (T)", e: "aucune" }] },
    "bac-AB": { capacites: IEXPR, juste: 0, options: [{ t: "A = E/R et B = −E/R", e: "aucune" }, { t: "A = E/R et B = +E/R", e: "aucune" }, { t: "A = 0 et B = E/R", e: "aucune" }] },
    "bac-L": { capacites: TAU, juste: 0, options: [{ t: "R = E/I0 = 500 Ω, puis L = R τ =", e: "aucune" }, { t: "L = τ/R = 4,0 × 10−6 H", e: "aucune" }, { t: "τ lu à 37 % : 0,92 ms, donc L =", e: "aucune" }] },
    "bac-uL": { capacites: IEXPR, juste: 0, options: [{ t: "uL = 24 e−500 t", e: "aucune" }, { t: "uL = 24 e−0,5 t", e: "inattention" }, { t: "uL = 24 (1 − e−500 t)", e: "rl.ul-continue" }] },
    "bac-2a": { capacites: ED, juste: 0, options: [{ t: "R1 i + r i + L di/dt = E", e: "aucune" }, { t: "R1 i + L di/dt = E", e: "rl.r-oubliee" }, { t: "R1 i + r i − L di/dt = E", e: "aucune" }] },
    "bac-2b": { capacites: CARAC, juste: 0, options: [{ t: "6/(3 × 103) = 2 × 10−3 H", e: "aucune" }, { t: "3 × 103/6 = 5 × 102 H", e: "aucune" }, { t: "1/(3 × 103) = 3,3 × 10−4 H", e: "aucune" }] },
    "bac-2c": { capacites: TAU, juste: 0, options: [{ t: "2 × 10−6 s : 1/|pente|", e: "aucune" }, { t: "5 × 105 s : la pente", e: "aucune" }, { t: "1 × 10−6 s : intersection lue à", e: "aucune" }] },
    q1: { capacites: TAU, juste: 0, options: [{ t: "elle a oublié r : τ = L/(R + r)", e: "aucune" }, { t: "il fallait R/L, pas L/R", e: "aucune" }, { t: "aucune : r ne compte qu’en régim", e: "aucune" }] },
    q2: { capacites: CONT, juste: 0, options: [{ t: "un conducteur ohmique de résista", e: "aucune" }, { t: "un fil, sans aucune résistance é", e: "rl.r-oubliee" }, { t: "un interrupteur ouvert : il bloq", e: "aucune" }] },
    q3: { capacites: TAU, juste: 0, options: [{ t: "0,20 ms", e: "aucune" }, { t: "0,22 ms : r oubliée", e: "rl.r-oubliee" }, { t: "0,20 s : mH non converti", e: "inattention" }] },
  },
  gabarits: {
    "rl-unites": {
      capacites: ["pc-pc 1.3.2.3", "pc-sm 1.3.2.3", "pc-svt 1.3.2.3", "pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9", "pc-pc 1.3.2.10", "pc-sm 1.3.2.10", "pc-svt 1.3.2.10"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "préfixe non converti": "inattention",
        "µ et m confondus": "inattention",
        "r oubliée dans τ": "rl.r-oubliee",
        "R/L : τ inversé": "aucune",
      },
    },
    "rl-tension-bobine": {
      capacites: ["pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2", "pc-pc 1.3.2.3", "pc-sm 1.3.2.3", "pc-svt 1.3.2.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "L·i au lieu de L·di/dt": "rl.li-ldidt",
        "r·i oublié": "rl.r-oubliee",
        "signe de di/dt": "aucune",
        "u continue": "rl.ul-continue",
      },
    },
    "rl-triangle": {
      capacites: ["pc-pc 1.3.2.4", "pc-sm 1.3.2.4", "pc-svt 1.3.2.4", "pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "Δt oublié": "aucune",
        "rapport inversé": "aucune",
        "u lue en bout de rampe": "aucune",
        "u triangle comme i": "rl.li-ldidt",
      },
    },
    "rl-r-palier": {
      capacites: ["pc-pc 1.3.2.4", "pc-sm 1.3.2.4", "pc-svt 1.3.2.4", "pc-pc 1.3.2.7", "pc-sm 1.3.2.7", "pc-svt 1.3.2.7"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "r = E/I₀": "aucune",
        "r = 0 en régime permanent": "rl.r-oubliee",
        "R oubliée": "aucune",
        "I₀/u au lieu de u/I₀": "aucune",
      },
    },
    "rl-equation": {
      capacites: ["pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5", "pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "E gardé à la rupture": "aucune",
        "r oubliée dans l’équation": "rl.r-oubliee",
        "multiplié par L au lieu de divisé": "aucune",
        "signe perdu": "aucune",
      },
    },
    "rl-solution": {
      capacites: ["pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5", "pc-pc 1.3.2.6", "pc-sm 1.3.2.6", "pc-svt 1.3.2.6", "pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "r oubliée": "rl.r-oubliee",
        "A = 0 : le courant de RC": "rl.courant-saute",
        "B = +A (i ne part pas de 0)": "aucune",
        "τ = (R + r)/L": "aucune",
      },
    },
    "rl-expressions": {
      capacites: ["pc-pc 1.3.2.6", "pc-sm 1.3.2.6", "pc-svt 1.3.2.6", "pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "u_L(0) = 0 comme i": "rl.courant-saute",
        "u_L(0) = r·I₀": "aucune",
        "u_L(∞) = 0 (r oubliée)": "rl.r-oubliee",
        "u_L monte comme i": "rl.ul-continue",
      },
    },
    "rl-lecture-tau": {
      capacites: ["pc-pc 1.3.2.7", "pc-sm 1.3.2.7", "pc-svt 1.3.2.7", "pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9", "pc-pc 1.3.2.11", "pc-sm 1.3.2.11", "pc-svt 1.3.2.11"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "63 % lu sur une descente": "aucune",
        "lecture à la moitié": "aucune",
        "τ = fin de la rupture ou de l’établissement": "aucune",
        "37 % lu sur une montée": "aucune",
      },
    },
    "rl-droite-didt": {
      capacites: ["pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5", "pc-pc 1.3.2.7", "pc-sm 1.3.2.7", "pc-svt 1.3.2.7", "pc-pc 1.3.2.4", "pc-sm 1.3.2.4", "pc-svt 1.3.2.4"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "ordonnée inversée (a₀/E)": "aucune",
        "E oublié": "aucune",
        "pente prise pour τ": "aucune",
        "abscisse lue à mi-course": "inattention",
      },
    },
    "rl-influence": {
      capacites: ["pc-pc 1.3.2.14", "pc-sm 1.3.2.14", "pc-svt 1.3.2.15", "pc-pc 1.3.2.11", "pc-sm 1.3.2.11", "pc-svt 1.3.2.11"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "L change le palier": "rl.l-change-palier",
        "R ne change que τ (comme en RC)": "rl.r-seul-tau",
        "E change τ": "rl.e-change-tau",
      },
    },
    "rl-rupture": {
      capacites: ["pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8", "pc-pc 1.3.2.2", "pc-sm 1.3.2.2", "pc-svt 1.3.2.2", "pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "i tombe à 0 aussitôt": "rl.courant-saute",
        "u_L continue": "rl.ul-continue",
        "|u_L| ≤ E": "rl.surtension",
        "τ inchangé quand la maille change": "aucune",
      },
    },
    "rl-energie": {
      capacites: ["pc-pc 1.3.2.16", "pc-sm 1.3.2.16", "pc-svt 1.3.2.16"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "½ L i (carré oublié)": "aucune",
        "L i² (½ oublié)": "aucune",
        "préfixe non converti": "inattention",
        "r i² compté": "aucune",
        "× 2 quand i double": "aucune",
      },
    },
    "rl-mesure": {
      capacites: ["pc-pc 1.3.2.13", "pc-sm 1.3.2.13", "pc-svt 1.3.2.14", "pc-pc 1.3.2.11", "pc-sm 1.3.2.11", "pc-svt 1.3.2.11"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "u_L prise pour l’image de i": "aucune",
        "divisions lues comme des unités": "inattention",
        "division par la sensibilité": "inattention",
      },
    },
    "rl-bac": {
      capacites: ["pc-pc 1.3.2.5", "pc-sm 1.3.2.5", "pc-svt 1.3.2.5", "pc-pc 1.3.2.6", "pc-sm 1.3.2.6", "pc-svt 1.3.2.6", "pc-pc 1.3.2.7", "pc-sm 1.3.2.7", "pc-svt 1.3.2.7", "pc-pc 1.3.2.8", "pc-sm 1.3.2.8", "pc-svt 1.3.2.8", "pc-pc 1.3.2.9", "pc-sm 1.3.2.9", "pc-svt 1.3.2.9"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "B = +A": "aucune",
        "τ laissé en ms": "inattention",
        "τ/R au lieu de Rτ": "aucune",
        "τ lu à 37 %": "aucune",
        "u_L monte comme i": "rl.ul-continue",
      },
    },
    "rl-energie-etablir": {
      capacites: ["pc-pc 1.3.2.15", "pc-sm 1.3.2.15"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "puissance prise pour l’énergie": "aucune",
        "½ oublié dans la dérivée": "aucune",
        "r i² compté": "aucune",
      },
    },
  },
};
