/**
 * Catalogue d'apprentissage de la leçon `transformations-non-totales` (format v3)
 * et de ses 10 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/transformations-non-totales-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/transformations-non-totales.js` (les libellés `erreur`,
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

const BRON = ["pc-pc 2.2.1.1", "pc-sm 2.2.1.1", "pc-svt 2.2.3.1"];
const EQ = ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"];
const PH = ["pc-pc 2.2.1.3", "pc-sm 2.2.1.3", "pc-svt 2.2.3.3"];
const XF = ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"];
const TAU = ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"];
const MICRO = ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6"];
const DIL = ["pc-svt 2.2.3.6"];

export const TRANSFORMATIONS_NON_TOTALES: CatalogueLecon = {
  lecon: "transformations-non-totales",
  matiere: "physique",
  signature:
    "sav-test,sav-ph,sav-rappel,deux-flacons,ecart,question,bronsted,acide,couple,eau-base,couples-eq,ampholyte,tableau,si-totale,xf,comparer,tau-def,tau-formule,curseur-ph,curseur-verifie,limitee,loupe,transfert,inverse,premiers-tics,attendre,palier,qui,vitesses,double-fleche,equilibre,hcl-zoom,rappel,catalyseur,vitesse-avancement,quasi-totale,sens,dilution-pari,dilution-calc,dilution-pourquoi,retour,retour-ph,bac-eq,bac,bac-ed,bac-conclure,bac-2a,bac-2b,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: [], juste: 0, options: [{ t: "1,0 × 10−3 mol", e: "aucune" }, { t: "1,0 mol", e: "tnt.quantite-concentration" }, { t: "0,10 mol", e: "tnt.quantite-concentration" }] },
    "sav-ph": { capacites: PH, juste: 0, options: [{ t: "1,0 × 10−3 mol·L⁻¹", e: "aucune" }, { t: "3,0 mol·L⁻¹", e: "tnt.ph-concentration" }, { t: "1,0 × 103 mol·L⁻¹", e: "inattention" }] },
    "deux-flacons": { capacites: [], juste: null, options: [{ t: "2,0 aussi", e: "aucune" }, { t: "plus de 2,0", e: "aucune" }, { t: "moins de 2,0", e: "aucune" }] },
    ecart: { capacites: PH, juste: 0, options: [{ t: "25 fois moins", e: "aucune" }, { t: "1,4 fois moins", e: "tnt.ph-concentration" }, { t: "1,7 fois moins", e: "tnt.ph-concentration" }] },
    bronsted: { capacites: [], juste: null, options: [{ t: "NH₃ contient des ions HO⁻ et les", e: "aucune" }, { t: "NH₃ prend un proton H⁺ à l’eau,", e: "aucune" }, { t: "l’eau seule en fournit : NH₃ n’y", e: "aucune" }] },
    acide: { capacites: BRON, juste: 0, options: [{ t: "CH₃COO⁻", e: "aucune" }, { t: "CH₃COOH₂⁺", e: "inattention" }, { t: "HO⁻", e: "tnt.base-ho" }] },
    couple: { capacites: BRON, juste: 0, options: [{ t: "NH₄⁺/NH₃", e: "aucune" }, { t: "NH₃/NH₄⁺", e: "inattention" }, { t: "NH₄⁺/HO⁻", e: "tnt.base-ho" }] },
    "eau-base": { capacites: EQ, juste: 0, options: [{ t: "CH₃COOH(aq) + H₂O(l) → CH₃COO⁻(a", e: "aucune" }, { t: "CH₃COOH(aq) → CH₃COO⁻(aq) + H⁺(a", e: "tnt.demi-equation" }, { t: "CH₃COOH(aq) + HO⁻(aq) → CH₃COO⁻(", e: "tnt.equation-dosage" }] },
    "couples-eq": { capacites: EQ, juste: 0, options: [{ t: "CH₃COOH/CH₃COO⁻ et H₃O⁺/H₂O", e: "aucune" }, { t: "CH₃COOH/H₂O et CH₃COO⁻/H₃O⁺", e: "tnt.couples-croises" }, { t: "CH₃COOH/H₃O⁺ et H₂O/CH₃COO⁻", e: "tnt.couples-croises" }] },
    ampholyte: { capacites: EQ, juste: 0, options: [{ t: "d’acide : elle cède un proton", e: "aucune" }, { t: "de base, comme avec l’acide étha", e: "tnt.eau-solvant" }, { t: "de solvant seulement, sans réagi", e: "tnt.eau-solvant" }] },
    tableau: { capacites: XF, juste: 0, options: [{ t: "1,0 × 10−3 mol", e: "aucune" }, { t: "impossible sans la quantité d’ea", e: "tnt.eau-limitante" }, { t: "1,0 mol", e: "tnt.quantite-concentration" }] },
    "si-totale": { capacites: PH, juste: 0, options: [{ t: "2,0", e: "aucune" }, { t: "−2,0", e: "inattention" }, { t: "1,0 × 10−2", e: "tnt.ph-concentration" }] },
    xf: { capacites: XF, juste: 0, options: [{ t: "4,0 × 10−5 mol", e: "aucune" }, { t: "4,0 × 10−4 mol", e: "tnt.quantite-concentration" }, { t: "0,34 mol", e: "tnt.ph-concentration" }] },
    comparer: { capacites: XF, juste: 0, options: [{ t: "xf xmax : l’acide n’a pas tout r", e: "aucune" }, { t: "xf = xmax, à la précision du pH-", e: "tnt.attendre" }, { t: "xf xmax : la réaction n’a pas en", e: "tnt.vitesse-avancement" }] },
    "tau-def": { capacites: TAU, juste: 0, options: [{ t: "0,040", e: "aucune" }, { t: "25", e: "tnt.tau-c-oubliee" }, { t: "4,0 × 10−3", e: "tnt.tau-c-oubliee" }] },
    "tau-formule": { capacites: TAU, juste: 0, options: [{ t: "τ = 0,20", e: "aucune" }, { t: "τ = 2,0 × 10−4", e: "tnt.tau-c-oubliee" }, { t: "on ne peut pas : le volume V man", e: "tnt.il-manque-v" }] },
    "curseur-verifie": { capacites: TAU, juste: 0, options: [{ t: "τ est divisé par 10", e: "aucune" }, { t: "τ est multiplié par 10", e: "inattention" }, { t: "τ ne change pas", e: "aucune" }] },
    limitee: { capacites: TAU, juste: 0, options: [{ t: "limitée : τ < 1, même à 90 %", e: "aucune" }, { t: "totale : 90 %, c’est presque tou", e: "tnt.limitee-rien" }, { t: "impossible : limitée veut dire p", e: "tnt.limitee-rien" }] },
    transfert: { capacites: EQ, juste: 0, options: [{ t: "un ion H₃O⁺", e: "aucune" }, { t: "un ion HO⁻", e: "inattention" }, { t: "une molécule d’eau, inchangée", e: "tnt.eau-solvant" }] },
    inverse: { capacites: MICRO, juste: 0, options: [{ t: "A⁻ capte un proton : AH et H₂O s", e: "aucune" }, { t: "rien : A⁻ est un produit, la réa", e: "tnt.sens-fixe" }, { t: "A⁻ cède un proton de plus, comme", e: "aucune" }] },
    attendre: { capacites: [], juste: null, options: [{ t: "monte régulièrement jusqu’à 100", e: "aucune" }, { t: "monte encore un peu, puis se sta", e: "aucune" }, { t: "redescend peu à peu jusqu’à 0", e: "aucune" }] },
    palier: { capacites: TAU, juste: 0, options: [{ t: "0,04", e: "aucune" }, { t: "4", e: "aucune" }, { t: "0,96", e: "aucune" }] },
    qui: { capacites: [], juste: null, options: [{ t: "est restée A⁻ : le compte ne bou", e: "aucune" }, { t: "est redevenue AH, et une autre l", e: "aucune" }, { t: "est redevenue AH : le compte a b", e: "aucune" }] },
    vitesses: { capacites: [], juste: null, options: [{ t: "plus de cédés que de repris", e: "aucune" }, { t: "autant de cédés que de repris, à", e: "aucune" }, { t: "aucun de chaque : tout est arrêt", e: "aucune" }] },
    "double-fleche": { capacites: MICRO, juste: 0, options: [{ t: "avec ⇄ : les deux réactions ont", e: "aucune" }, { t: "avec → : le sens direct l’a empo", e: "tnt.sens-fixe" }, { t: "avec ⇄ : la réaction est lente,", e: "tnt.double-fleche-lente" }] },
    equilibre: { capacites: MICRO, juste: 0, options: [{ t: "la quantité de chaque espèce", e: "aucune" }, { t: "chaque molécule : celle qui est", e: "tnt.equilibre-fige" }, { t: "rien : les vitesses sont devenue", e: "tnt.equilibre-fige" }] },
    "hcl-zoom": { capacites: MICRO, juste: 0, options: [{ t: "100", e: "aucune" }, { t: "4", e: "tnt.meme-ph" }, { t: "50", e: "tnt.equilibre-fige" }] },
    rappel: { capacites: TAU, juste: 0, options: [{ t: "0,10", e: "aucune" }, { t: "1,0 × 10−3", e: "tnt.tau-c-oubliee" }, { t: "10", e: "tnt.tau-c-oubliee" }] },
    catalyseur: { capacites: MICRO, juste: 0, options: [{ t: "τ ne change pas : l’équilibre es", e: "aucune" }, { t: "τ augmente : le catalyseur aide", e: "tnt.catalyseur" }, { t: "τ finit par valoir 1, mais il fa", e: "tnt.attendre" }] },
    "vitesse-avancement": { capacites: TAU, juste: 0, options: [{ t: "rien : la vitesse et τ sont deux", e: "aucune" }, { t: "qu’elle est totale : rapide, don", e: "tnt.vitesse-avancement" }, { t: "qu’elle s’écrit avec ⇄ parce qu’", e: "tnt.double-fleche-lente" }] },
    "quasi-totale": { capacites: TAU, juste: 0, options: [{ t: "ils vont ensemble : ⇄ dit deux s", e: "aucune" }, { t: "ils s’excluent : avec ⇄, τ reste", e: "tnt.double-fleche-loin" }, { t: "le sujet se trompe : il fallait", e: "aucune" }] },
    sens: { capacites: MICRO, juste: 0, options: [{ t: "de l’acide éthanoïque : A⁻ et H₃", e: "aucune" }, { t: "des ions éthanoate en plus : l’a", e: "tnt.sens-fixe" }, { t: "rien : la réaction va de l’acide", e: "tnt.sens-fixe" }] },
    "dilution-pari": { capacites: [], juste: null, options: [{ t: "ne change pas", e: "aucune" }, { t: "augmente", e: "aucune" }, { t: "diminue", e: "aucune" }] },
    "dilution-calc": { capacites: DIL, juste: 0, options: [{ t: "0,12", e: "aucune" }, { t: "0,012", e: "aucune" }, { t: "0,040", e: "tnt.conditions-sans-effet" }] },
    "dilution-pourquoi": { capacites: DIL, juste: 0, options: [{ t: "A⁻ et H₃O⁺ se rencontrent plus r", e: "aucune" }, { t: "l’eau ajoutée cède des protons e", e: "tnt.eau-solvant" }, { t: "l’acide devient plus fort quand", e: "tnt.acide-plus-fort" }] },
    "retour-ph": { capacites: TAU, juste: 0, options: [{ t: "plus grande que 1,0 × 10−2 mol·L", e: "aucune" }, { t: "égale à 1,0 × 10−2 mol·L⁻¹", e: "tnt.meme-ph" }, { t: "plus petite que 1,0 × 10−2 mol·L", e: "aucune" }] },
    "bac-eq": { capacites: EQ, juste: 0, options: [{ t: "C₂H₅COOH(aq) + H₂O(l) ⇄ C₂H₅COO⁻", e: "aucune" }, { t: "C₂H₅COOH(aq) ⇄ C₂H₅COO⁻(aq) + H⁺", e: "tnt.demi-equation" }, { t: "C₂H₅COOH(aq) + HO⁻(aq) ⇄ C₂H₅COO", e: "tnt.equation-dosage" }] },
    bac: { capacites: TAU, juste: 0, options: [{ t: "Poser τ = xf / xmax, puis exprim", e: "aucune" }, { t: "Dire qu’on ne peut pas calculer", e: "tnt.il-manque-v" }, { t: "Poser directement τ = pH / Ca, p", e: "tnt.ph-concentration" }] },
    "bac-conclure": { capacites: TAU, juste: 0, options: [{ t: "τ < 1 : la transformation est li", e: "aucune" }, { t: "τ ≈ 0 : l’acide ne réagit pas av", e: "tnt.limitee-rien" }, { t: "la réaction est lente, puisque τ", e: "tnt.vitesse-avancement" }] },
    "bac-2a": { capacites: XF, juste: 0, options: [{ t: "CA V − xf", e: "aucune" }, { t: "xf", e: "tnt.x-colonne-acide" }, { t: "CA V", e: "aucune" }] },
    "bac-2b": { capacites: TAU, juste: 0, options: [{ t: "0,982", e: "aucune" }, { t: "0,018", e: "aucune" }, { t: "0,999", e: "tnt.tau-c-oubliee" }] },
    q1: { capacites: TAU, juste: 0, options: [{ t: "le rapport est inversé", e: "aucune" }, { t: "le volume V est oublié", e: "tnt.il-manque-v" }, { t: "aucune : le calcul est juste", e: "tnt.limitee-rien" }] },
    q2: { capacites: BRON, juste: 0, options: [{ t: "CH₃COO⁻ : elle peut capter un pr", e: "aucune" }, { t: "H₃O⁺ : elle peut capter un proton", e: "aucune" }, { t: "aucune des deux, faute d’ion HO⁻", e: "tnt.base-ho" }] },
    q3: { capacites: TAU, juste: 0, options: [{ t: "une valeur identique, écrite aut", e: "aucune" }, { t: "une valeur cent fois trop petite", e: "tnt.tau-pourcentage" }, { t: "une valeur fausse : τ s’exprime", e: "aucune" }] },
  },
  gabarits: {
    "tnt-bronsted": {
      capacites: ["pc-pc 2.2.1.1", "pc-sm 2.2.1.1", "pc-svt 2.2.3.1"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "base = HO⁻ (+3)": "tnt.base-ho",
        "proton ajouté au lieu de retiré": "inattention",
        "ordre base/acide": "inattention",
        "eau solvant seulement": "tnt.eau-solvant",
        "eau à rôle fixe (+5)": "tnt.eau-solvant",
      },
    },
    "tnt-equation": {
      capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "charges non équilibrées": "inattention",
        "équation de dosage (+9)": "tnt.equation-dosage",
        "demi-équation (+4)": "tnt.demi-equation",
        "couples croisés (+8)": "tnt.couples-croises",
      },
    },
    "tnt-ph": {
      capacites: ["pc-pc 2.2.1.3", "pc-sm 2.2.1.3", "pc-svt 2.2.3.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "pH pris pour une concentration (+2)": "tnt.ph-concentration",
        "signe de l’exposant": "inattention",
        "pH négatif : signe perdu": "inattention",
        "différence de pH lue comme un rapport (+2)": "tnt.ph-concentration",
      },
    },
    "tnt-tableau": {
      capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "x_f dans la colonne de l’acide (+10)": "tnt.x-colonne-acide",
        "acide inchangé (+10)": "aucune",
        "eau limitante (+6)": "tnt.eau-limitante",
        "V en mL (+7)": "tnt.quantite-concentration",
        "C divisée par V (+7)": "tnt.quantite-concentration",
      },
    },
    "tnt-xf": {
      capacites: ["pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "concentration prise pour quantité (+7)": "tnt.quantite-concentration",
        "pH pris pour une concentration (+2)": "tnt.ph-concentration",
        "x_f = x_max à la mesure près (B-1)": "tnt.attendre",
        "pas encore fini (I-vitesse)": "tnt.vitesse-avancement",
      },
    },
    "tnt-tau": {
      capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], niveau: 2, optionsQcm: 2,
      erreurs: {
        "« il manque V » (I-conclusion)": "tnt.il-manque-v",
        "C oubliée (B-7)": "tnt.tau-c-oubliee",
        "rapport inversé": "tnt.tau-c-oubliee",
        "% mal placé (B-9)": "tnt.tau-pourcentage",
      },
    },
    "tnt-limitee": {
      capacites: ["pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "limitée = rien (B-4)": "tnt.limitee-rien",
        "grande part = totale (B-4)": "tnt.limitee-rien",
        "⇄ donc τ loin de 1 (I-quasi)": "tnt.double-fleche-loin",
        "τ lu comme une vitesse (I-vitesse)": "tnt.vitesse-avancement",
        "acide fort pris pour limité": "aucune",
        "« il manque V » (I-conclusion)": "tnt.il-manque-v",
      },
    },
    "tnt-equilibre": {
      capacites: ["pc-pc 2.2.1.6", "pc-sm 2.2.1.6"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "espèce ajoutée (B-6)": "tnt.sens-fixe",
        "sens fixe (B-5)": "tnt.sens-fixe",
        "équilibre figé (B-3)": "tnt.equilibre-fige",
        "⇄ = lente (I-lente)": "tnt.double-fleche-lente",
        "⇄ donc τ loin de 1 (I-quasi)": "tnt.double-fleche-loin",
        "attendre (B-1)": "tnt.attendre",
        "catalyseur (B-2)": "tnt.catalyseur",
      },
    },
    "tnt-dilution": {
      capacites: ["pc-svt 2.2.3.6"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "C non divisée (+7)": "aucune",
        "τ inchangé (I-conditions)": "tnt.conditions-sans-effet",
        "τ diminue (+11)": "tnt.dilution-diminue",
        "l’eau fournit des H₃O⁺ (+5)": "tnt.eau-solvant",
        "la nature de l’acide change (+12)": "tnt.acide-plus-fort",
      },
    },
    "tnt-bac": {
      capacites: ["pc-pc 2.2.1.2", "pc-sm 2.2.1.2", "pc-svt 2.2.3.2", "pc-pc 2.2.1.4", "pc-sm 2.2.1.4", "pc-svt 2.2.3.4", "pc-pc 2.2.1.5", "pc-sm 2.2.1.5", "pc-svt 2.2.3.5"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "C oubliée (B-7)": "tnt.tau-c-oubliee",
        "rapport inversé": "tnt.tau-c-oubliee",
        "% mal placé (B-9)": "tnt.tau-pourcentage",
        "acide inchangé (+10)": "aucune",
        "x_f dans la colonne de l’acide (+10)": "tnt.x-colonne-acide",
        "α pris pour τ (+10)": "aucune",
        "demi-équation (+4)": "tnt.demi-equation",
        "équation de dosage (+9)": "tnt.equation-dosage",
        "τ lu comme une vitesse (I-vitesse)": "tnt.vitesse-avancement",
        "limitée = rien (B-4)": "tnt.limitee-rien",
      },
    },
  },
};
