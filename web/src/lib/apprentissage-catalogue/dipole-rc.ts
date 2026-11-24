/**
 * Catalogue d'apprentissage de la leçon `dipole-rc` (format v3, leçon en cours de correction)
 * et de ses 15 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/dipole-rc-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/dipole-rc.js` (les libellés `erreur`,
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

const CONV = ["pc-pc 1.3.1.1", "pc-sm 1.3.1.1", "pc-svt 1.3.1.1"];
const IDQ = ["pc-pc 1.3.1.2", "pc-sm 1.3.1.2", "pc-svt 1.3.1.2"];
const QCU = ["pc-pc 1.3.1.3", "pc-sm 1.3.1.3", "pc-svt 1.3.1.3"];
const CAPA = ["pc-pc 1.3.1.5", "pc-sm 1.3.1.5", "pc-svt 1.3.1.5"];
const ASSOC = ["pc-pc 1.3.1.6", "pc-sm 1.3.1.6", "pc-svt 1.3.1.6"];
const ED = ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7", "pc-svt 1.3.1.7"];
const UC = ["pc-pc 1.3.1.8", "pc-sm 1.3.1.8", "pc-svt 1.3.1.8"];
const COURBES = ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9", "pc-svt 1.3.1.9"];
const CONT = ["pc-pc 1.3.1.10", "pc-sm 1.3.1.10", "pc-svt 1.3.1.10"];
const TAU = ["pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11"];
const DOCS = ["pc-pc 1.3.1.13", "pc-sm 1.3.1.13", "pc-svt 1.3.1.13"];
const INFL = ["pc-pc 1.3.1.16", "pc-sm 1.3.1.16", "pc-svt 1.3.1.17"];
const OSC = ["pc-pc 1.3.1.15", "pc-sm 1.3.1.15", "pc-svt 1.3.1.16"];
const ETABLIR = ["pc-pc 1.3.1.17", "pc-sm 1.3.1.17"];
const ENERGIE = ["pc-pc 1.3.1.18", "pc-sm 1.3.1.18", "pc-svt 1.3.1.18"];

export const DIPOLE_RC: CatalogueLecon = {
  lecon: "dipole-rc",
  matiere: "physique",
  signature:
    "sav-test,sav-rappel,allumage,flash,leyde,armatures,q-u,parallele,allure,i0,pas-pari,pas-reste,pas,permanent,courant-constant,convention,dqdt,ed-maille,ed-i,ed-q,x-test,expo-rappel,verif,verif-ident,dim,i-t,rappel,tangente,val-tau,lecture-63,reste,cinq-tau,double,influence-E,curseurs,ed-decharge,sol-decharge,i-decharge,v-37,energie-pari,energie-etablir,energie-calc,oscillo,oscillo-lire,retour-lampe,bac,bac-ed,bac-R,bac-C,bac-2a,bac-2b,bac-2c,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: [], juste: 0, options: [{ t: "uR = 8 V", e: "aucune" }, { t: "uR = 16 V", e: "aucune" }, { t: "uR = 3 V", e: "aucune" }, { t: "uR = 4 V", e: "aucune" }] },
    allumage: { capacites: [], juste: null, options: [{ t: "reste éteinte : l’isolant coupe", e: "aucune" }, { t: "s’allume et reste allumée", e: "aucune" }, { t: "s’allume, puis s’éteint peu à pe", e: "aucune" }] },
    flash: { capacites: [], juste: null, options: [{ t: "rien : sans générateur, pas de c", e: "aucune" }, { t: "la lampe se rallume, puis s’étei", e: "aucune" }, { t: "la lampe se rallume et reste all", e: "aucune" }] },
    leyde: { capacites: [], juste: null, options: [{ t: "la même petite étincelle : le ve", e: "aucune" }, { t: "rien du tout : l’eau absorbe l’é", e: "aucune" }, { t: "un choc bien plus fort", e: "aucune" }] },
    armatures: { capacites: CONV, juste: 0, options: [{ t: "−3,0 µC", e: "aucune" }, { t: "0", e: "aucune" }, { t: "+3,0 µC", e: "aucune" }] },
    "q-u": { capacites: QCU, juste: 0, options: [{ t: "C = 10 µF", e: "aucune" }, { t: "C = 0,10 µF", e: "inattention" }, { t: "C = 360 µF", e: "aucune" }] },
    parallele: { capacites: ASSOC, juste: 0, options: [{ t: "deux fois plus de charge : Céq =", e: "aucune" }, { t: "la même charge qu’un seul : Céq", e: "aucune" }, { t: "deux fois moins de charge : Céq", e: "aucune" }] },
    allure: { capacites: [], juste: null, options: [{ t: "elle saute à E aussitôt", e: "aucune" }, { t: "elle monte en ligne droite jusqu", e: "aucune" }, { t: "elle monte vite, puis de plus en", e: "aucune" }] },
    i0: { capacites: CONT, juste: 0, options: [{ t: "E/R = 1,2 mA", e: "aucune" }, { t: "0, comme uC", e: "rc.i-comme-uc" }, { t: "0,6 mA", e: "aucune" }] },
    "pas-pari": { capacites: [], juste: null, options: [{ t: "1,2 V encore : même durée, même", e: "aucune" }, { t: "moins de 1,2 V", e: "aucune" }, { t: "plus de 1,2 V : le condensateur", e: "aucune" }] },
    "pas-reste": { capacites: [], juste: 0, options: [{ t: "8,75 V : encore 0,9 fois le rest", e: "aucune" }, { t: "8,64 V : encore 1,08 V de moins", e: "aucune" }, { t: "8,52 V : encore 1,2 V de moins", e: "aucune" }] },
    permanent: { capacites: CONT, juste: 0, options: [{ t: "est nul", e: "aucune" }, { t: "vaut encore E/R", e: "rc.condensateur-conduit" }, { t: "devient négatif, car uC dépasse", e: "aucune" }] },
    "courant-constant": { capacites: CAPA, juste: 0, options: [{ t: "C0 = I0/pente = 1 × 10−6 F", e: "aucune" }, { t: "C0 = pente/I0 = 1 × 106 F", e: "inattention" }, { t: "C0 = 1 F", e: "inattention" }] },
    convention: { capacites: CONV, juste: 0, options: [{ t: "pointe vers A, à l’opposé de i", e: "aucune" }, { t: "suit le sens de i", e: "aucune" }, { t: "se choisit librement, seul le si", e: "aucune" }] },
    dqdt: { capacites: IDQ, juste: 0, options: [{ t: "+0,50 mA", e: "aucune" }, { t: "+2,0 mA", e: "inattention" }, { t: "+1,0 mA", e: "aucune" }] },
    "ed-maille": { capacites: ED, juste: 0, options: [{ t: "uR + uC = E", e: "aucune" }, { t: "uR − uC = E", e: "aucune" }, { t: "uR = uC", e: "aucune" }] },
    "ed-i": { capacites: IDQ, juste: 0, options: [{ t: "i = dq/dt = C duC/dt", e: "aucune" }, { t: "i = C uC", e: "aucune" }, { t: "i = −C duC/dt", e: "aucune" }] },
    "ed-q": { capacites: ED, juste: 0, options: [{ t: "R dq/dt + q/C = E", e: "aucune" }, { t: "R dq/dt + C q = E", e: "aucune" }, { t: "R q + (1/C) dq/dt = E", e: "aucune" }] },
    "x-test": { capacites: [], juste: 0, options: [{ t: "−(1/τ) e−t/τ", e: "aucune" }, { t: "(1/τ) e−t/τ", e: "inattention" }, { t: "e−t/τ", e: "deriv.u-prime-oublie" }] },
    verif: { capacites: ED, juste: 0, options: [{ t: "RC (A/τ) e−t/τ + A − A e−t/τ = E", e: "aucune" }, { t: "RC (A/τ) e−t/τ + A e−t/τ = E", e: "aucune" }, { t: "(A/τ) e−t/τ + A − A e−t/τ = E", e: "inattention" }] },
    "verif-ident": { capacites: ED, juste: 0, options: [{ t: "RC/τ − 1 = 0, donc τ = RC", e: "aucune" }, { t: "τ quelconque : le terme disparaî", e: "aucune" }, { t: "RC/τ − 1 = 0, donc τ = R/C", e: "aucune" }] },
    dim: { capacites: TAU, juste: 0, options: [{ t: "[T] : τ est en secondes", e: "aucune" }, { t: "sans dimension : R et C se compe", e: "aucune" }, { t: "[T]−1", e: "aucune" }] },
    "i-t": { capacites: UC, juste: 0, options: [{ t: "i(t) = (E/R) e−t/RC", e: "aucune" }, { t: "i(t) = (E/(RC)) e−t/RC", e: "aucune" }, { t: "i(t) = (E/R)(1 − e−t/RC)", e: "rc.i-comme-uc" }] },
    rappel: { capacites: CONT, juste: 0, options: [{ t: "uC = 0 et i = E/R", e: "aucune" }, { t: "uC = 0 et i = 0", e: "rc.i-comme-uc" }, { t: "uC = E et i = 0", e: "aucune" }] },
    tangente: { capacites: COURBES, juste: 0, options: [{ t: "τ", e: "aucune" }, { t: "5τ", e: "aucune" }, { t: "E/τ", e: "aucune" }] },
    "val-tau": { capacites: TAU, juste: 0, options: [{ t: "0,63 E : environ 63 % de E", e: "aucune" }, { t: "0,37 E : environ 37 % de E", e: "rc.repere-63-37" }, { t: "E : la charge est finie", e: "rc.tau-fin-charge" }] },
    "lecture-63": { capacites: COURBES, juste: 2, options: [{ t: "1,0 s", e: "rc.repere-63-37" }, { t: "1,5 s", e: "rc.tau-moitie" }, { t: "2,2 s", e: "aucune" }] },
    reste: { capacites: COURBES, juste: 0, options: [{ t: "4,4 V, soit 37 % de E", e: "aucune" }, { t: "7,6 V, soit 63 % de E", e: "inattention" }, { t: "0 : la tangente touche l’axe en", e: "aucune" }] },
    "cinq-tau": { capacites: TAU, juste: 2, options: [{ t: "τ = 2,2 s", e: "rc.tau-fin-charge" }, { t: "2τ = 4,4 s", e: "aucune" }, { t: "environ 5τ = 11 s", e: "aucune" }] },
    double: { capacites: [], juste: null, options: [{ t: "monte plus vite : un C plus peti", e: "aucune" }, { t: "ne change pas", e: "aucune" }, { t: "monte plus lentement : un R plus", e: "aucune" }] },
    "influence-E": { capacites: INFL, juste: 0, options: [{ t: "15,2 V : 63 % de 24 V, au même i", e: "aucune" }, { t: "7,6 V : rien ne change quand on", e: "aucune" }, { t: "24 V : deux fois plus vite, la c", e: "rc.e-change-tau" }] },
    "ed-decharge": { capacites: ED, juste: 0, options: [{ t: "RC duC/dt + uC = 0", e: "aucune" }, { t: "RC duC/dt − uC = 0", e: "aucune" }, { t: "RC duC/dt + uC = E", e: "aucune" }] },
    "sol-decharge": { capacites: UC, juste: 0, options: [{ t: "E e−t/RC", e: "aucune" }, { t: "E(1 − e−t/RC)", e: "aucune" }, { t: "E e+t/RC", e: "inattention" }] },
    "i-decharge": { capacites: UC, juste: 0, options: [{ t: "−(E/R) e−t/RC", e: "aucune" }, { t: "+(E/R) e−t/RC", e: "inattention" }, { t: "nul à t = 0⁺, comme uC est conti", e: "rc.i-comme-uc" }] },
    "v-37": { capacites: COURBES, juste: 2, options: [{ t: "1,0 s", e: "rc.repere-63-37" }, { t: "1,5 s", e: "rc.tau-moitie" }, { t: "2,2 s", e: "aucune" }] },
    "energie-pari": { capacites: [], juste: null, options: [{ t: "deux fois plus d’énergie", e: "aucune" }, { t: "quatre fois plus d’énergie", e: "aucune" }, { t: "la même énergie : c’est le même", e: "aucune" }] },
    "energie-etablir": { capacites: ETABLIR, juste: 0, options: [{ t: "½ C uC2", e: "aucune" }, { t: "C uC2", e: "inattention" }, { t: "C uC", e: "aucune" }] },
    "energie-calc": { capacites: ENERGIE, juste: 0, options: [{ t: "15,8 mJ", e: "aucune" }, { t: "1,58 × 104 J", e: "inattention" }, { t: "1,32 mJ", e: "inattention" }] },
    oscillo: { capacites: OSC, juste: 0, options: [{ t: "uR : uR = R i", e: "aucune" }, { t: "uC : uC = q/C", e: "aucune" }, { t: "rien : un oscilloscope ne voit p", e: "aucune" }] },
    "oscillo-lire": { capacites: DOCS, juste: 0, options: [{ t: "2,2 s", e: "aucune" }, { t: "4,4 s", e: "inattention" }, { t: "8,8 s", e: "inattention" }] },
    "retour-lampe": { capacites: INFL, juste: 0, options: [{ t: "double C", e: "aucune" }, { t: "double E", e: "rc.e-change-tau" }, { t: "divise R par deux", e: "aucune" }] },
    bac: { capacites: [], juste: null, options: [{ t: "Écrire l’additivité des tensions", e: "aucune" }, { t: "Dériver la solution donnée en 1.", e: "aucune" }, { t: "Lire τ sur la courbe (T)", e: "aucune" }] },
    "bac-ed": { capacites: ED, juste: 0, options: [{ t: "duC/dt + uC/(RC) = E/(RC)", e: "aucune" }, { t: "duC/dt + RC uC = RC E", e: "rc.coefficient-exposant" }, { t: "duC/dt − uC/(RC) = E/(RC)", e: "inattention" }] },
    "bac-R": { capacites: UC, juste: 0, options: [{ t: "R = E/i0 = 12/(12 × 10−3) = 1,0", e: "aucune" }, { t: "R = E/i0 = 12/12 = 1 Ω", e: "inattention" }, { t: "R = i0/E = 12 × 10−3/12 = 1,0 ×", e: "inattention" }] },
    "bac-C": { capacites: COURBES, juste: 0, options: [{ t: "τ = 50 ms, où (T) coupe le palie", e: "aucune" }, { t: "τ ≈ 23 ms, où uC = 37 % de E, do", e: "rc.repere-63-37" }, { t: "τ ≈ 35 ms, où uC = E/2, donc C =", e: "rc.tau-moitie" }] },
    "bac-2a": { capacites: ED, juste: 0, options: [{ t: "uR + uC = E", e: "aucune" }, { t: "uR − uC = E", e: "aucune" }, { t: "uR = uC", e: "aucune" }] },
    "bac-2b": { capacites: COURBES, juste: 0, options: [{ t: "−1/(RC)", e: "aucune" }, { t: "E/(RC)", e: "rc.pente-lue" }, { t: "−RC", e: "rc.coefficient-exposant" }] },
    "bac-2c": { capacites: COURBES, juste: 0, options: [{ t: "RC = 1/83,3 = 1,2 × 10−2 s, donc", e: "aucune" }, { t: "RC = 83,3 s, donc C = 8,3 × 10−2", e: "rc.coefficient-exposant" }, { t: "RC = 1,2 × 10−2 s, donc C = 1,2", e: "inattention" }] },
    q1: { capacites: COURBES, juste: 0, options: [{ t: "elle a lu 63 % sur une courbe qu", e: "aucune" }, { t: "elle aurait dû lire à la moitié", e: "rc.tau-moitie" }, { t: "aucune : le repère 63 % vaut pou", e: "rc.repere-63-37" }] },
    q2: { capacites: ASSOC, juste: 0, options: [{ t: "5 µF", e: "aucune" }, { t: "20 µF", e: "aucune" }, { t: "10 µF", e: "aucune" }] },
    q3: { capacites: TAU, juste: 0, options: [{ t: "2,2 s", e: "aucune" }, { t: "4,5 × 107 s", e: "aucune" }, { t: "2,2 × 106 s", e: "inattention" }] },
  },
  gabarits: {
    "rc-unites": {
      capacites: ["pc-pc 1.3.1.4", "pc-sm 1.3.1.4", "pc-svt 1.3.1.4", "pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "préfixe non converti": "inattention",
        "µ, n et p confondus": "inattention",
        "τ = R/C": "aucune",
      },
    },
    "rc-signes": {
      capacites: ["pc-pc 1.3.1.1", "pc-sm 1.3.1.1", "pc-svt 1.3.1.1", "pc-pc 1.3.1.2", "pc-sm 1.3.1.2", "pc-svt 1.3.1.2"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "u_C fléchée comme i": "aucune",
        "i = −dq/dt (autre armature)": "aucune",
        "Δt/Δq": "inattention",
        "i positif à la décharge": "inattention",
      },
    },
    "rc-capacite-graphe": {
      capacites: ["pc-pc 1.3.1.3", "pc-sm 1.3.1.3", "pc-svt 1.3.1.3", "pc-pc 1.3.1.5", "pc-sm 1.3.1.5", "pc-svt 1.3.1.5"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "rapport inversé": "inattention",
        "produit au lieu du rapport": "aucune",
        "débit constant (u_C linéaire)": "aucune",
        "préfixe non converti": "inattention",
      },
    },
    "rc-associations": {
      capacites: ["pc-pc 1.3.1.6", "pc-sm 1.3.1.6", "pc-svt 1.3.1.6"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "formules échangées": "aucune",
        "moyenne des capacités": "aucune",
        "addition au lieu de soustraction": "inattention",
      },
    },
    "rc-equation": {
      capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7", "pc-svt 1.3.1.7", "pc-pc 1.3.1.2", "pc-sm 1.3.1.2", "pc-svt 1.3.1.2", "pc-pc 1.3.1.3", "pc-sm 1.3.1.3", "pc-svt 1.3.1.3"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "E gardé à la décharge": "aucune",
        "signe perdu": "aucune",
        "RC multiplié au lieu de divisé": "rc.coefficient-exposant",
        "préfixe non converti": "inattention",
      },
    },
    "rc-solution": {
      capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7", "pc-svt 1.3.1.7", "pc-pc 1.3.1.8", "pc-sm 1.3.1.8", "pc-svt 1.3.1.8", "pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "τ quelconque": "aucune",
        "τ = R/C": "aucune",
        "préfixe non converti": "inattention",
        "α = RC": "rc.coefficient-exposant",
        "A = E pour la charge q": "aucune",
      },
    },
    "rc-expressions": {
      capacites: ["pc-pc 1.3.1.8", "pc-sm 1.3.1.8", "pc-svt 1.3.1.8", "pc-pc 1.3.1.10", "pc-sm 1.3.1.10", "pc-svt 1.3.1.10"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "C oublié": "aucune",
        "i part de zéro": "rc.i-comme-uc",
        "u_C(0) = E": "aucune",
        "signe de i à la décharge": "inattention",
      },
    },
    "rc-lecture-tau": {
      capacites: ["pc-pc 1.3.1.9", "pc-sm 1.3.1.9", "pc-svt 1.3.1.9", "pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11", "pc-pc 1.3.1.13", "pc-sm 1.3.1.13", "pc-svt 1.3.1.13"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "63 % lu sur une descente": "rc.repere-63-37",
        "lecture à la moitié": "rc.tau-moitie",
        "préfixe ms": "inattention",
        "37 % lu sur une montée": "rc.repere-63-37",
      },
    },
    "rc-droite-dudt": {
      capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7", "pc-svt 1.3.1.7", "pc-pc 1.3.1.9", "pc-sm 1.3.1.9", "pc-svt 1.3.1.9", "pc-pc 1.3.1.5", "pc-sm 1.3.1.5", "pc-svt 1.3.1.5"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "ordonnée prise pour 1/(RC)": "rc.pente-lue",
        "pente prise pour RC": "rc.pente-lue",
      },
    },
    "rc-regimes": {
      capacites: ["pc-pc 1.3.1.13", "pc-sm 1.3.1.13", "pc-svt 1.3.1.13"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "63 % et 37 % échangés": "rc.repere-63-37",
        "τ = fin de la charge": "rc.tau-fin-charge",
        "régime permanent avec i ≠ 0": "rc.condensateur-conduit",
      },
    },
    "rc-influence": {
      capacites: ["pc-pc 1.3.1.16", "pc-sm 1.3.1.16", "pc-svt 1.3.1.17", "pc-pc 1.3.1.13", "pc-sm 1.3.1.13", "pc-svt 1.3.1.13"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "R seul règle la vitesse": "aucune",
        "un R plus grand charge plus vite": "aucune",
        "E change τ": "rc.e-change-tau",
      },
    },
    "rc-energie": {
      capacites: ["pc-pc 1.3.1.18", "pc-sm 1.3.1.18", "pc-svt 1.3.1.18"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "½ C u (carré oublié)": "inattention",
        "C u² (½ oublié)": "inattention",
        "préfixe non converti": "inattention",
        "× 2 quand u double": "aucune",
      },
    },
    "rc-mesure": {
      capacites: ["pc-pc 1.3.1.14", "pc-sm 1.3.1.14", "pc-svt 1.3.1.14", "pc-pc 1.3.1.15", "pc-sm 1.3.1.15", "pc-svt 1.3.1.16"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "i visualisé par u_C": "aucune",
        "divisions lues comme des unités": "inattention",
        "division par la sensibilité": "inattention",
      },
    },
    "rc-bac": {
      capacites: ["pc-pc 1.3.1.7", "pc-sm 1.3.1.7", "pc-svt 1.3.1.7", "pc-pc 1.3.1.8", "pc-sm 1.3.1.8", "pc-svt 1.3.1.8", "pc-pc 1.3.1.9", "pc-sm 1.3.1.9", "pc-svt 1.3.1.9", "pc-pc 1.3.1.11", "pc-sm 1.3.1.11", "pc-svt 1.3.1.11"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "E oublié": "aucune",
        "C oublié": "aucune",
        "mA non converti": "inattention",
        "i₀/E au lieu de E/i₀": "inattention",
        "τ lu à 37 % ou à la moitié": "rc.tau-moitie",
      },
    },
    "rc-energie-etablir": {
      capacites: ["pc-pc 1.3.1.17", "pc-sm 1.3.1.17"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "puissance et énergie confondues": "aucune",
        "C u_C pris pour une énergie": "aucune",
        "½ oublié (dérivée de u²)": "inattention",
      },
    },
  },
};
