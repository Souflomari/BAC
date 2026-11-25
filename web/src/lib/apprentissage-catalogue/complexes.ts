/**
 * Catalogue d'apprentissage de la leçon `complexes` (format v3)
 * et de ses 12 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/complexes-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/complexes.js` (les libellés `erreur`,
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

const ALG = ["maths-sexp 2.4.1", "maths-sm 2.2.1"];
const GEO = ["maths-sexp 2.4.4", "maths-sm 2.2.3"];
const EQ = ["maths-sexp 2.4.8", "maths-sm 2.2.5"];
const RAM = ["maths-sexp 2.4.9", "maths-sm 2.2.6"];
const SMEQ = ["maths-sm 2.2.5"];

export const COMPLEXES: CatalogueLecon = {
  lecon: "complexes",
  matiere: "maths",
  signature:
    "savoir,sav-rappel,cubique,formule,fausse,bombelli,droite,quart,axe-i,quatre-quarts,point-z,partie-imag,egalite,fois-i,fois-i-curseur,somme,produit,carre,conjugue,ou-zzbar,zzbar,z-plus-zbar,conj-prop,diviser,rappel,module,module-calc,module-somme,distance,cercle,somme-carres,x2-moins,canonique,formule-delta,conjuguees,bicarree,sm-signe,sm-delta,sm-resoudre,sm-somme-produit,retour-cube,retour-conj,retour-somme,retour-pourquoi,bac,bac-a,bac-b,bac-c,bac-copie,bac-2,bac-2-racines,q1,q2,q3,fin",
  questions: {
    savoir: { capacites: EQ, juste: 0, options: [{ t: "aucune : Δ = 4 − 20 = −16 < 0", e: "aucune" }, { t: "deux : Δ = 4 + 20 = 24 > 0", e: "inattention" }, { t: "deux, 3 et −1 : Δ = 16 > 0", e: "cx.delta-negatif-aucune" }] },
    fausse: { capacites: [], juste: null, options: [{ t: "donne 4, si l’on ose calculer av", e: "aucune" }, { t: "est fausse pour cette équation", e: "aucune" }, { t: "désigne une autre solution, qui", e: "aucune" }] },
    bombelli: { capacites: [], juste: 0, options: [{ t: "on garde (√−1)² = −1 et on aband", e: "aucune" }, { t: "on garde la règle des racines et", e: "cx.i-carre-plus-un" }, { t: "on abandonne √−1 : ce nombre n’e", e: "cx.racine-negatif-inexistante" }] },
    quart: { capacites: [], juste: null, options: [{ t: "une multiplication par ½ : 1 res", e: "aucune" }, { t: "un quart de tour : 1 quitte la d", e: "aucune" }, { t: "une multiplication par −½ : 1 re", e: "aucune" }] },
    "quatre-quarts": { capacites: ALG, juste: 0, options: [{ t: "−i", e: "aucune" }, { t: "i", e: "cx.cycle-puissances-i" }, { t: "−1", e: "cx.cycle-puissances-i" }] },
    "partie-imag": { capacites: ALG, juste: 0, options: [{ t: "−6", e: "aucune" }, { t: "−6i", e: "cx.im-inclut-i" }, { t: "4", e: "cx.re-im-confondus" }] },
    egalite: { capacites: ALG, juste: 0, options: [{ t: "x = 3 et y = −5", e: "aucune" }, { t: "x = −½ et y = 2", e: "cx.re-im-confondus" }, { t: "x = 3 et y = −3 − 2i", e: "cx.im-inclut-i" }] },
    "fois-i": { capacites: [], juste: null, options: [{ t: "en A : les parties réelle et ima", e: "aucune" }, { t: "en B : un quart de tour autour d", e: "aucune" }, { t: "en C : un demi-tour autour de O", e: "aucune" }] },
    somme: { capacites: ALG, juste: 0, options: [{ t: "4 − 2i", e: "aucune" }, { t: "4 + 6i", e: "cx.signe-partie-perdu" }, { t: "2", e: "cx.re-im-confondus" }] },
    produit: { capacites: ALG, juste: 0, options: [{ t: "11 + 10i", e: "aucune" }, { t: "−5 + 10i", e: "cx.i-carre-plus-un" }, { t: "3 − 8i", e: "cx.produit-terme-a-terme" }] },
    carre: { capacites: ALG, juste: 0, options: [{ t: "3 + 4i", e: "aucune" }, { t: "3", e: "cx.double-produit" }, { t: "5 + 4i", e: "cx.i-carre-plus-un" }] },
    "ou-zzbar": { capacites: [], juste: null, options: [{ t: "n’importe où, selon z", e: "aucune" }, { t: "sur l’axe des imaginaires", e: "aucune" }, { t: "sur l’axe des réels", e: "aucune" }] },
    zzbar: { capacites: ALG, juste: 0, options: [{ t: "a² + b²", e: "aucune" }, { t: "a² − b²", e: "cx.i-carre-plus-un" }, { t: "a² − b² + 2iab", e: "cx.somme-difference-conjugue" }] },
    "z-plus-zbar": { capacites: ALG, juste: 0, options: [{ t: "2a", e: "aucune" }, { t: "2ib", e: "cx.somme-difference-conjugue" }, { t: "0", e: "cx.conjugue-oppose" }] },
    "conj-prop": { capacites: ALG, juste: 0, options: [{ t: "3 − 4i", e: "aucune" }, { t: "3 + 4i", e: "cx.conjugue-produit" }, { t: "5", e: "aucune" }] },
    diviser: { capacites: ALG, juste: 0, options: [{ t: "5, donc −4/5 + (7/5)i", e: "aucune" }, { t: "−3, donc 4/3 − (7/3)i", e: "cx.i-carre-plus-un" }, { t: "5, donc (2 + 3i) / 5", e: "cx.diviser-sans-conjugue" }] },
    rappel: { capacites: ALG, juste: 0, options: [{ t: "−2 + i", e: "aucune" }, { t: "2 + i", e: "cx.i-carre-plus-un" }, { t: "3i", e: "inattention" }] },
    "module-calc": { capacites: GEO, juste: 0, options: [{ t: "13", e: "aucune" }, { t: "17", e: "cx.module-lineaire" }, { t: "169", e: "cx.module-lineaire" }] },
    "module-somme": { capacites: GEO, juste: 0, options: [{ t: "5 et 7", e: "aucune" }, { t: "7 et 7", e: "cx.module-somme" }, { t: "25 et 7", e: "cx.module-lineaire" }] },
    distance: { capacites: GEO, juste: 0, options: [{ t: "10", e: "aucune" }, { t: "4√2", e: "cx.distance-affixe-brute" }, { t: "14", e: "cx.module-lineaire" }] },
    cercle: { capacites: GEO, juste: 0, options: [{ t: "le cercle de centre le point d’a", e: "aucune" }, { t: "le cercle de centre le point d’a", e: "cx.centre-signe-oppose" }, { t: "le cercle de centre O et de rayo", e: "cx.module-somme" }] },
    "somme-carres": { capacites: ALG, juste: 0, options: [{ t: "(x + 4i)(x − 4i)", e: "aucune" }, { t: "(x + 4)²", e: "cx.double-produit" }, { t: "elle reste non factorisable", e: "cx.delta-negatif-aucune" }] },
    "x2-moins": { capacites: EQ, juste: 0, options: [{ t: "2i et −2i", e: "aucune" }, { t: "−2", e: "cx.racine-negatif" }, { t: "2i seulement", e: "cx.racine-negatif" }] },
    canonique: { capacites: EQ, juste: 0, options: [{ t: "1 + 2i et 1 − 2i", e: "aucune" }, { t: "aucune solution", e: "cx.delta-negatif-aucune" }, { t: "−1 + 2i et −1 − 2i", e: "inattention" }] },
    conjuguees: { capacites: [], juste: null, options: [{ t: "symétriques par rapport à O", e: "aucune" }, { t: "symétriques par rapport à l’axe", e: "aucune" }, { t: "sans lien entre eux", e: "aucune" }] },
    bicarree: { capacites: RAM, juste: 0, options: [{ t: "i, −i, 2i et −2i", e: "aucune" }, { t: "−1 et −4", e: "cx.changement-inconnue" }, { t: "i et 2i", e: "cx.changement-inconnue" }] },
    "sm-signe": { capacites: SMEQ, juste: 0, options: [{ t: "elle n’a pas de sens : on ne com", e: "aucune" }, { t: "elle est vraie, à cause du signe", e: "cx.delta-non-reel-signe" }, { t: "elle est fausse, car un imaginai", e: "cx.delta-non-reel-signe" }] },
    "sm-delta": { capacites: SMEQ, juste: 0, options: [{ t: "2 + i", e: "aucune" }, { t: "2 − i", e: "cx.carre-parfait-signe" }, { t: "√3 + 2i", e: "cx.carre-parfait-signe" }] },
    "sm-resoudre": { capacites: SMEQ, juste: 0, options: [{ t: "2 et 1 + i", e: "aucune" }, { t: "1 + i et 1 − i", e: "cx.racines-conjuguees-hors-reels" }, { t: "2 + i et 1", e: "cx.carre-parfait-signe" }] },
    "sm-somme-produit": { capacites: SMEQ, juste: 0, options: [{ t: "2i et α", e: "aucune" }, { t: "−2i et α", e: "cx.viete-inverses" }, { t: "α et 2i", e: "cx.viete-inverses" }] },
    "retour-cube": { capacites: ALG, juste: 0, options: [{ t: "2 + 11i", e: "aucune" }, { t: "10 + 11i", e: "cx.i-carre-plus-un" }, { t: "6 + 11i", e: "cx.produit-terme-a-terme" }] },
    "retour-conj": { capacites: ALG, juste: 0, options: [{ t: "2 − 11i", e: "aucune" }, { t: "2 + 11i", e: "cx.conjugue-produit" }, { t: "−2 − 11i", e: "cx.conjugue-oppose" }] },
    "retour-somme": { capacites: ALG, juste: 0, options: [{ t: "4", e: "aucune" }, { t: "4 + 2i", e: "cx.somme-difference-conjugue" }, { t: "2i", e: "cx.somme-difference-conjugue" }] },
    "retour-pourquoi": { capacites: [], juste: 0, options: [{ t: "un calcul avec √−121 donnait une", e: "aucune" }, { t: "pour donner enfin une solution à", e: "cx.i-pour-x2-moins-un" }, { t: "parce qu’on avait trouvé où les", e: "aucune" }] },
    bac: { capacites: [], juste: null, options: [{ t: "traduire « M ∈ (Γ) » par une dis", e: "aucune" }, { t: "poser z = x + iy et développer t", e: "aucune" }, { t: "lire le point commun sur la figu", e: "aucune" }] },
    "bac-a": { capacites: GEO, juste: 0, options: [{ t: "DM = |z − (−2)| = |z + 2| et DM", e: "aucune" }, { t: "|z + 2| = |z| + 2 et DM = 2", e: "cx.module-somme" }, { t: "DM = |z − 2| et DM = 2", e: "cx.signe-de-d" }] },
    "bac-b": { capacites: GEO, juste: 0, options: [{ t: "(z + 2)(z barre + 2)", e: "aucune" }, { t: "(z + 2)(z barre − 2)", e: "cx.module-carre-sans-conjugue" }, { t: "|z|² + 2²", e: "cx.module-carre-sans-conjugue" }] },
    "bac-c": { capacites: GEO, juste: 0, options: [{ t: "z = −4, car Re(z) = −4 et |z| =", e: "aucune" }, { t: "z = −8, car z + z barre vaut −8", e: "cx.z-zbar-lu-z" }, { t: "z = −4 ± 4i, car |z| = 4", e: "cx.module-lu-im" }] },
    "bac-2": { capacites: EQ, juste: 0, options: [{ t: "−36", e: "aucune" }, { t: "−16", e: "cx.a-oublie" }, { t: "44", e: "inattention" }] },
    "bac-2-racines": { capacites: EQ, juste: 0, options: [{ t: "−½ + (3/2)i et −½ − (3/2)i", e: "aucune" }, { t: "−1 + 3i et −1 − 3i", e: "cx.a-oublie" }, { t: "½ + (3/2)i et ½ − (3/2)i", e: "cx.signe-moins-b" }] },
    q1: { capacites: ALG, juste: 0, options: [{ t: "aucun réel ; z2 = −9 a deux solu", e: "aucune" }, { t: "−3, car √(−9) = −√9", e: "cx.racine-negatif" }, { t: "3i, car (3i)² = −9, donc √(−9) =", e: "cx.racine-negatif" }] },
    q2: { capacites: GEO, juste: 0, options: [{ t: "2√2 et 2", e: "aucune" }, { t: "2√2 et 2√2", e: "cx.module-somme" }, { t: "4 et 2", e: "cx.module-lineaire" }] },
    q3: { capacites: EQ, juste: 0, options: [{ t: "−3 + 2i et −3 − 2i", e: "aucune" }, { t: "aucune solution", e: "cx.delta-negatif-aucune" }, { t: "3 + 2i et 3 − 2i", e: "cx.signe-moins-b" }] },
  },
  gabarits: {
    "forme-algebrique": {
      capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "parties réelle et imaginaire échangées": "cx.re-im-confondus",
        "le i gardé dans la partie imaginaire": "cx.im-inclut-i",
        "le i gardé dans l’inconnue réelle d’une égalité": "cx.im-inclut-i",
        "imaginaire pur : la mauvaise partie annulée": "cx.imaginaire-pur-partie",
      },
    },
    "produit": {
      capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "i² pris pour +1": "cx.i-carre-plus-un",
        "produit fait terme à terme": "cx.produit-terme-a-terme",
        "(a + b)² lu a² + b²": "cx.double-produit",
        "cycle des puissances de i mal compté": "cx.cycle-puissances-i",
      },
    },
    "quart-de-tour": {
      capacites: ["maths-sm 2.2.3", "maths-sexp 2.4.4"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "quart de tour pris pour un demi-tour": "cx.demi-tour-quart",
        "multiplier par i = échanger les parties": "cx.fois-i-echange",
        "conjugué pris pour l’opposé": "cx.conjugue-oppose",
        "conjugué pris pour la symétrie d’axe vertical": "cx.conjugue-oppose",
      },
    },
    "conjugue": {
      capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "z² pris pour z z̄": "cx.somme-difference-conjugue",
        "z z̄ calculé comme a² − b²": "cx.i-carre-plus-un",
        "z + z̄ et z − z̄ confondus": "cx.somme-difference-conjugue",
        "conjugué d’un produit mal formé": "cx.conjugue-produit",
      },
    },
    "quotient": {
      capacites: ["maths-sexp 2.4.1", "maths-sm 2.2.1"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "dénominateur c² − d² (i² oublié)": "cx.i-carre-plus-un",
        "quotient renversé": "aucune",
        "conjugué appliqué au dénominateur seul": "cx.diviser-sans-conjugue",
      },
    },
    "module-distance": {
      capacites: ["maths-sexp 2.4.4", "maths-sm 2.2.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "module = a + b": "cx.module-lineaire",
        "module sans la racine": "cx.module-lineaire",
        "distance lue sur |z_B| au lieu de |z_B − z_A|": "cx.distance-affixe-brute",
        "milieu sans la moyenne": "cx.milieu-sans-moyenne",
        "module d’un produit lu comme une somme": "cx.module-somme",
      },
    },
    "ensemble-points": {
      capacites: ["maths-sexp 2.4.4", "maths-sm 2.2.3"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "rayon r² au lieu de r": "inattention",
        "centre de signe opposé": "cx.centre-signe-oppose",
        "|z + k| lu |z| + k": "cx.module-somme",
      },
    },
    "second-degre-reel": {
      capacites: ["maths-sexp 2.4.8", "maths-sm 2.2.5"], niveau: 2, optionsQcm: 4,
      erreurs: {
        "Δ < 0 : aucune solution": "cx.delta-negatif-aucune",
        "a oublié dans 4ac": "cx.a-oublie",
        "signe de −b perdu": "cx.signe-moins-b",
        "a oublié au dénominateur": "cx.a-oublie",
        "√(−Δ) écrit sans le i": "aucune",
      },
    },
    "se-ramene": {
      capacites: ["maths-sexp 2.4.9", "maths-sm 2.2.6"], niveau: 3, optionsQcm: 4,
      erreurs: {
        "signe de la racine du facteur linéaire perdu": "inattention",
        "signe de −b perdu": "cx.signe-moins-b",
        "Δ < 0 : aucune solution": "cx.delta-negatif-aucune",
        "une seule racine par valeur de Z": "cx.changement-inconnue",
        "Z < 0 rejeté comme dans ℝ": "cx.delta-negatif-aucune",
        "le retour de Z à z oublié": "cx.changement-inconnue",
      },
    },
    "racine-de-delta": {
      capacites: ["maths-sm 2.2.5"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "Δ/2 pris pour une racine carrée": "cx.carre-parfait-signe",
        "le signe de xy perdu": "cx.carre-parfait-signe",
        "x² + y² pris pour la partie réelle de Δ": "aucune",
      },
    },
    "second-degre-complexe": {
      capacites: ["maths-sm 2.2.5", "maths-sm 2.2.6"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "δ mal choisi : son carré n’est pas Δ": "cx.carre-parfait-signe",
        "racines supposées conjuguées malgré des coefficients complexes": "cx.racines-conjuguees-hors-reels",
        "somme et produit échangés ou −b/a lu b/a": "cx.viete-inverses",
      },
    },
    "deux-cercles": {
      capacites: ["maths-sexp 2.4.4", "maths-sexp 2.4.1", "maths-sm 2.2.3"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "z − d lu avec le signe de d perdu": "cx.signe-de-d",
        "z + z̄ lu Re(z)": "cx.z-zbar-lu-z",
        "|z| lu |Im(z)|": "cx.module-lu-im",
        "z + z̄ lu z": "cx.z-zbar-lu-z",
      },
    },
  },
};
