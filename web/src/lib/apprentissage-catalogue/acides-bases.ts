/**
 * Catalogue d'apprentissage de la leçon `acides-bases` (format v3)
 * et de ses 12 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/acides-bases-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/acides-bases.js` (les libellés `erreur`,
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

const QR = ["pc-pc 2.2.2.3", "pc-sm 2.2.2.3", "pc-svt 2.2.4.3"];
const K = ["pc-pc 2.2.2.4", "pc-sm 2.2.2.4", "pc-svt 2.2.4.4"];
const TAUK = ["pc-pc 2.2.2.5", "pc-sm 2.2.2.5", "pc-svt 2.2.4.5"];
const AUTO = ["pc-pc 2.2.3.1", "pc-sm 2.2.3.1", "pc-svt 2.2.5.1"];
const KE = ["pc-pc 2.2.3.1", "pc-sm 2.2.3.1", "pc-svt 2.2.5.1", "pc-pc 2.2.3.2", "pc-sm 2.2.3.2", "pc-svt 2.2.5.2"];
const NAT = ["pc-pc 2.2.3.3", "pc-sm 2.2.3.3", "pc-svt 2.2.5.3"];
const HOPH = ["pc-pc 2.2.3.4", "pc-sm 2.2.3.4", "pc-svt 2.2.5.4"];
const KA = ["pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5"];
const PKA = ["pc-pc 2.2.3.6", "pc-sm 2.2.3.6", "pc-svt 2.2.5.6"];
const KAPA = ["pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5", "pc-pc 2.2.3.6", "pc-sm 2.2.3.6", "pc-svt 2.2.5.6"];
const COUP = ["pc-pc 2.2.3.7", "pc-sm 2.2.3.7", "pc-svt 2.2.5.7"];
const PRED = ["pc-pc 2.2.3.8", "pc-sm 2.2.3.8", "pc-svt 2.2.5.8"];
const DIST = ["pc-pc 2.2.3.9", "pc-sm 2.2.3.9"];

export const ACIDES_BASES: CatalogueLecon = {
  lecon: "acides-bases",
  matiere: "physique",
  signature:
    "sav-test,sav-eq,sav-rappel,helianthine,virage,question,qr-monte,qr-nom,qr-valeur,qr-solides,qr-exposants,trois-flacons,meme-k-calc,k-nom,tau-k,dilution-k,dilution-sens,autoprotolyse,neutre,nature,ho-ph,rappel,ka-nom,comparer-acides,ka-tau,bases-comparer,rapport,egalite,predom,domaines,distribution,croisement,predom-distrib,deux-couples,k-total,k-proches,ph-melange,indicateur,zone-virage,retour,retour-transfert,bac,bac-ed,bac-pka,bac-2a,bac-2b,bac-2c,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: [], juste: 0, options: [{ t: "5", e: "aucune" }, { t: "−5", e: "inattention" }, { t: "105", e: "ab.ph-concentration" }] },
    "sav-eq": { capacites: [], juste: 0, options: [{ t: "C − 10−pH", e: "aucune" }, { t: "C", e: "ab.acide-intact" }, { t: "10−pH", e: "tnt.x-colonne-acide" }] },
    helianthine: { capacites: [], juste: null, options: [{ t: "rouge : la solution est acide", e: "aucune" }, { t: "jaune : comme dans la soude", e: "aucune" }, { t: "orange : la solution est peu aci", e: "aucune" }] },
    "qr-monte": { capacites: [], juste: null, options: [{ t: "monte, puis se stabilise avec le", e: "aucune" }, { t: "monte tant qu’il reste des AH à", e: "aucune" }, { t: "monte, puis redescend quand le s", e: "aucune" }] },
    "qr-nom": { capacites: QR, juste: 0, options: [{ t: "l’eau est le solvant, pas une es", e: "aucune" }, { t: "l’eau ne réagit pas : elle sert", e: "tnt.eau-solvant" }, { t: "l’eau est trop peu abondante pou", e: "ab.eau-negligeable" }] },
    "qr-valeur": { capacites: QR, juste: 0, options: [{ t: "1,65 × 10−5", e: "aucune" }, { t: "4,15 × 10−2", e: "ab.qr-carre-oublie" }, { t: "6,06 × 104", e: "ab.qr-inverse" }] },
    "qr-solides": { capacites: QR, juste: 0, options: [{ t: "[Zn²⁺] / [Cu²⁺]", e: "aucune" }, { t: "[Zn²⁺][Cu] / ([Cu²⁺][Zn])", e: "ab.qr-solides" }, { t: "[Cu²⁺] / [Zn²⁺]", e: "ab.qr-inverse" }] },
    "qr-exposants": { capacites: QR, juste: 0, options: [{ t: "[Cr³⁺] / [Ag⁺]3", e: "aucune" }, { t: "[Cr³⁺] / (3[Ag⁺])", e: "ab.coef-facteur" }, { t: "[Cr³⁺] / [Ag⁺]", e: "ab.coef-oublie" }] },
    "trois-flacons": { capacites: [], juste: null, options: [{ t: "triple", e: "aucune" }, { t: "garde la même valeur", e: "aucune" }, { t: "est divisé par 10", e: "aucune" }] },
    "meme-k-calc": { capacites: K, juste: 0, options: [{ t: "1,64 × 10−5", e: "aucune" }, { t: "1,45 × 10−5", e: "ab.acide-intact" }, { t: "1,37 × 10−1", e: "ab.qr-carre-oublie" }] },
    "k-nom": { capacites: K, juste: 0, options: [{ t: "la chauffer", e: "aucune" }, { t: "la diluer dix fois", e: "ab.k-depend-etat-initial" }, { t: "y ajouter un catalyseur", e: "tnt.catalyseur" }] },
    "tau-k": { capacites: TAUK, juste: 0, options: [{ t: "de K et de C", e: "aucune" }, { t: "de K seulement", e: "tnt.conditions-sans-effet" }, { t: "de C seulement", e: "ab.k-sans-effet" }] },
    "dilution-k": { capacites: QR, juste: 0, options: [{ t: "K / 10", e: "aucune" }, { t: "K", e: "ab.confond-qr-et-k" }, { t: "10 K", e: "ab.qr-inverse" }] },
    "dilution-sens": { capacites: [], juste: null, options: [{ t: "il remonte jusqu’à K : la réacti", e: "aucune" }, { t: "il reste à K / 10 : la réaction", e: "aucune" }, { t: "il descend encore : la dilution", e: "aucune" }] },
    autoprotolyse: { capacites: AUTO, juste: 0, options: [{ t: "2 H₂O(l) ⇄ H₃O⁺(aq) + HO⁻(aq)", e: "aucune" }, { t: "H₂O(l) ⇄ H⁺(aq) + HO⁻(aq)", e: "tnt.demi-equation" }, { t: "H₂O(l) ⇄ H₃O⁺(aq) + HO⁻(aq)", e: "ab.ampholyte-une-molecule" }] },
    neutre: { capacites: KE, juste: 0, options: [{ t: "7", e: "aucune" }, { t: "14", e: "ab.neutre-pke" }, { t: "1,0 × 10−7", e: "ab.ph-concentration" }] },
    nature: { capacites: NAT, juste: 0, options: [{ t: "acide : [HO⁻] < [H₃O⁺]", e: "aucune" }, { t: "basique : elle contient des ions", e: "ab.ho-donc-basique" }, { t: "neutre : les deux ions y sont pr", e: "ab.coexistence-neutre" }] },
    "ho-ph": { capacites: HOPH, juste: 0, options: [{ t: "11,3", e: "aucune" }, { t: "2,7", e: "ab.ho-pris-pour-h3o" }, { t: "16,7", e: "ab.ph-concentration" }] },
    rappel: { capacites: TAUK, juste: 0, options: [{ t: "K garde la même valeur et τ est", e: "aucune" }, { t: "K et τ sont tous les deux plus g", e: "ab.k-depend-etat-initial" }, { t: "K et τ restent tous les deux inc", e: "tnt.conditions-sans-effet" }] },
    "ka-nom": { capacites: KAPA, juste: 0, options: [{ t: "4,8", e: "aucune" }, { t: "−4,8", e: "ab.pk-signe" }, { t: "5,0", e: "ab.pk-exposant" }] },
    "comparer-acides": { capacites: PKA, juste: 0, options: [{ t: "HCOOH : son pKA est le plus peti", e: "aucune" }, { t: "C₂H₅COOH : son pKA est le plus g", e: "ab.pka-envers" }, { t: "les trois ont le même pH : même", e: "ab.force-concentration" }] },
    "ka-tau": { capacites: KA, juste: 0, options: [{ t: "C τ² / (1 − τ)", e: "aucune" }, { t: "C τ²", e: "ab.acide-intact" }, { t: "τ² / (1 − τ)", e: "ab.c-simplifiee" }] },
    "bases-comparer": { capacites: PKA, juste: 0, options: [{ t: "NH₃ : son couple a le plus grand", e: "aucune" }, { t: "CH₃COO⁻ : son couple a le plus p", e: "ab.pka-envers" }, { t: "les deux ont le même pH : même C", e: "ab.force-concentration" }] },
    rapport: { capacites: KA, juste: 0, options: [{ t: "pH = pKA + log([A⁻]éq / [AH]éq)", e: "aucune" }, { t: "pH = pKA − log([A⁻]éq / [AH]éq)", e: "ab.echelle-ph-envers" }, { t: "pH = log KA + log([A⁻]éq / [AH]é", e: "ab.pk-signe" }] },
    egalite: { capacites: PRED, juste: 0, options: [{ t: "pKA", e: "aucune" }, { t: "7", e: "ab.egalite-a-sept" }, { t: "pKA + 1", e: "ab.log-un" }] },
    predom: { capacites: PRED, juste: 0, options: [{ t: "acide, et CH₃COO⁻ prédomine", e: "aucune" }, { t: "acide, donc CH₃COOH prédomine", e: "ab.nature-forme" }, { t: "basique, puisque CH₃COO⁻ prédomi", e: "ab.nature-forme" }] },
    distribution: { capacites: DIST, juste: 0, options: [{ t: "environ 91 %", e: "aucune" }, { t: "100 %", e: "ab.bascule-totale" }, { t: "environ 60 %", e: "ab.distribution-lineaire" }] },
    croisement: { capacites: DIST, juste: 0, options: [{ t: "3,75", e: "aucune" }, { t: "7,0", e: "ab.egalite-a-sept" }, { t: "5,8", e: "ab.bascule-totale" }] },
    "predom-distrib": { capacites: DIST, juste: 0, options: [{ t: "environ 56 % et 99,9 %", e: "aucune" }, { t: "100 % et 100 %", e: "ab.predom-cent" }, { t: "environ 51 % et 80 %", e: "ab.distribution-lineaire" }] },
    "deux-couples": { capacites: COUP, juste: 0, options: [{ t: "KA1 / KA2 ≈ 2,5 × 104", e: "aucune" }, { t: "KA2 / KA1 ≈ 4,0 × 10−5", e: "ab.k-couples-inverse" }, { t: "pKA2 − pKA1 = 4,4", e: "ab.k-egal-delta-pk" }] },
    "k-total": { capacites: COUP, juste: 0, options: [{ t: "≈ 0,99 : pratiquement totale", e: "aucune" }, { t: "≈ 0,50 : la double flèche partag", e: "tnt.double-fleche-loin" }, { t: "≈ 6,3 × 10−3 : le rapport vaut 1", e: "ab.rapport-inverse" }] },
    "k-proches": { capacites: COUP, juste: 0, options: [{ t: "est limitée : ni totale, ni négl", e: "aucune" }, { t: "est totale : un acide rencontre", e: "ab.acide-base-totale" }, { t: "n’a presque pas lieu : K est inf", e: "ab.k-petit-rien" }] },
    "ph-melange": { capacites: COUP, juste: 0, options: [{ t: "(pKA1 + pKA2) / 2 = 4,5", e: "aucune" }, { t: "(pKA1 − pKA2) / 2 = 0,3", e: "ab.ph-melange-faux" }, { t: "pKA1 + pKA2 = 9,0", e: "ab.ph-melange-faux" }] },
    indicateur: { capacites: PRED, juste: 0, options: [{ t: "In⁻", e: "aucune" }, { t: "HIn", e: "ab.nature-forme" }, { t: "autant de HIn que de In⁻", e: "ab.teinte-intermediaire" }] },
    "zone-virage": { capacites: PRED, juste: 0, options: [{ t: "jaune", e: "aucune" }, { t: "bleue", e: "ab.virage-commun" }, { t: "intermédiaire", e: "ab.teinte-intermediaire" }] },
    "retour-transfert": { capacites: PRED, juste: 0, options: [{ t: "incolore", e: "aucune" }, { t: "rose", e: "ab.indicateur-sept" }, { t: "rose pâle", e: "ab.teinte-intermediaire" }] },
    bac: { capacites: KA, juste: 0, options: [{ t: "écrire Qr,éq sur l’équation, pui", e: "aucune" }, { t: "poser d’emblée Qr,éq = [H₃O⁺]²_é", e: "ab.acide-intact" }, { t: "poser pKA = pH = 3,1, puis calcu", e: "ab.pka-ph-solution" }] },
    "bac-pka": { capacites: PKA, juste: 0, options: [{ t: "4,89", e: "aucune" }, { t: "3,1", e: "ab.pka-ph-solution" }, { t: "−4,89", e: "ab.pk-signe" }] },
    "bac-2a": { capacites: HOPH, juste: 0, options: [{ t: "10pH − 14 ≈ 4,0 × 10−4 mol·L⁻¹", e: "aucune" }, { t: "10−pH ≈ 2,5 × 10−11 mol·L⁻¹", e: "ab.ho-pris-pour-h3o" }, { t: "Ke / pH ≈ 9,4 × 10−16 mol·L⁻¹", e: "ab.ph-concentration" }] },
    "bac-2b": { capacites: HOPH, juste: 0, options: [{ t: "[HO⁻]éq / Cb ≈ 4,0 × 10−2", e: "aucune" }, { t: "[H₃O⁺]éq / Cb ≈ 2,5 × 10−9", e: "ab.tau-base-h3o" }, { t: "Cb / [HO⁻]éq ≈ 25", e: "ab.rapport-inverse" }] },
    "bac-2c": { capacites: KAPA, juste: 0, options: [{ t: "9,2 : car KA = Ke / Qr,éq", e: "aucune" }, { t: "4,8 : car KA = Qr,éq", e: "ab.qr-base-pris-pour-ka" }, { t: "10,6 : car pKA = pH", e: "ab.pka-ph-solution" }] },
    q1: { capacites: COUP, juste: 0, options: [{ t: "rapport renversé : K = KA1 / KA2", e: "aucune" }, { t: "aucune : pour cette équation, K", e: "ab.k-couples-inverse" }, { t: "il fallait multiplier : K = KA1", e: "ab.k-couples-inverse" }] },
    q2: { capacites: PKA, juste: 0, options: [{ t: "l’acide benzoïque : pKA = 4,2 <", e: "aucune" }, { t: "l’acide éthanoïque : 4,8 > 6,3 ×", e: "ab.ka-pka-melanges" }, { t: "l’acide éthanoïque : son pKA est", e: "ab.pka-envers" }] },
    q3: { capacites: TAUK, juste: 0, options: [{ t: "il ne change pas", e: "aucune" }, { t: "il augmente", e: "ab.dilution-effet-universel" }, { t: "il diminue", e: "tnt.dilution-diminue" }] },
  },
  gabarits: {
    "ab-qr": {
      capacites: ["pc-pc 2.2.2.3", "pc-sm 2.2.2.3", "pc-svt 2.2.4.3"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "coefficient mis en facteur": "ab.coef-facteur",
        "quotient renversé": "ab.qr-inverse",
        "coefficient oublié": "ab.coef-oublie",
        "eau solvant écrite dans Q_r": "ab.eau-negligeable",
        "solide écrit dans Q_r": "ab.qr-solides",
      },
    },
    "ab-k": {
      capacites: ["pc-pc 2.2.2.2", "pc-sm 2.2.2.2", "pc-svt 2.2.4.2", "pc-pc 2.2.2.4", "pc-sm 2.2.2.4", "pc-svt 2.2.4.4", "pc-pc 2.2.2.5", "pc-sm 2.2.2.5", "pc-svt 2.2.4.5"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "K dépendrait de C": "ab.k-depend-etat-initial",
        "τ fixé par K seul": "tnt.conditions-sans-effet",
        "équilibre pris pour un arrêt": "ab.equilibre-arret",
        "Q_r confondu avec K": "ab.confond-qr-et-k",
        "catalyseur change K": "tnt.catalyseur",
      },
    },
    "ab-ke": {
      capacites: ["pc-pc 2.2.3.1", "pc-sm 2.2.3.1", "pc-svt 2.2.5.1", "pc-pc 2.2.3.2", "pc-sm 2.2.3.2", "pc-svt 2.2.5.2", "pc-pc 2.2.3.3", "pc-sm 2.2.3.3", "pc-svt 2.2.5.3", "pc-pc 2.2.3.4", "pc-sm 2.2.3.4", "pc-svt 2.2.5.4"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "contient HO⁻ donc basique": "ab.ho-donc-basique",
        "deux ions présents donc neutre": "ab.coexistence-neutre",
        "−log[HO⁻] pris pour le pH": "ab.ho-pris-pour-h3o",
        "pH et concentration confondus": "ab.ph-concentration",
        "pH neutre pris égal à pK_e": "ab.neutre-pke",
      },
    },
    "ab-ka-ph": {
      capacites: ["pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5", "pc-pc 2.2.3.6", "pc-sm 2.2.3.6", "pc-svt 2.2.5.6"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "acide faible supposé intact": "ab.acide-intact",
        "carré oublié au numérateur": "ab.qr-carre-oublie",
        "pK_A pris égal au pH": "ab.pka-ph-solution",
        "signe moins oublié dans pK_A": "ab.pk-signe",
      },
    },
    "ab-ka-tau": {
      capacites: ["pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5", "pc-pc 2.2.2.3", "pc-sm 2.2.2.3", "pc-svt 2.2.4.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "C simplifiée à tort": "ab.c-simplifiee",
        "acide faible supposé intact": "ab.acide-intact",
        "mantisse ignorée dans −log K_A": "ab.pk-exposant",
      },
    },
    "ab-comparer": {
      capacites: ["pc-pc 2.2.3.6", "pc-sm 2.2.3.6", "pc-svt 2.2.5.6"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "force et concentration confondues": "ab.force-concentration",
        "échelle de pK_A lue à l’envers": "ab.pka-envers",
        "K_A et pK_A comparés sans conversion": "ab.ka-pka-melanges",
      },
    },
    "ab-k-couples": {
      capacites: ["pc-pc 2.2.3.7", "pc-sm 2.2.3.7", "pc-svt 2.2.5.7"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "rapport K_A2 / K_A1 inversé": "ab.k-couples-inverse",
        "écart des pK_A pris pour K": "ab.k-egal-delta-pk",
        "K < 1 lu comme réaction nulle": "ab.k-petit-rien",
        "⇄ donc τ = 0,50": "tnt.double-fleche-loin",
        "toute réaction acide-base dite totale": "ab.acide-base-totale",
      },
    },
    "ab-melange": {
      capacites: ["pc-pc 2.2.3.7", "pc-sm 2.2.3.7", "pc-svt 2.2.5.7", "pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5"], niveau: 3, optionsQcm: 2,
      erreurs: {
        "rapport K_A2 / K_A1 inversé": "ab.k-couples-inverse",
        "différence des pK_A au lieu de la demi-somme": "ab.ph-melange-faux",
        "division par 2 oubliée": "ab.ph-melange-faux",
        "demi-somme appliquée à des quantités inégales": "ab.ph-melange-faux",
      },
    },
    "ab-predom": {
      capacites: ["pc-pc 2.2.3.8", "pc-sm 2.2.3.8", "pc-svt 2.2.5.8", "pc-pc 2.2.3.9", "pc-sm 2.2.3.9", "pc-svt 2.2.5.9"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "nature de la solution et forme confondues": "ab.nature-forme",
        "échelle de pH lue à l’envers": "ab.echelle-ph-envers",
        "égalité des formes placée à pH 7": "ab.egalite-a-sept",
        "log 1 pris égal à 1": "ab.log-un",
      },
    },
    "ab-distribution": {
      capacites: ["pc-pc 2.2.3.9", "pc-sm 2.2.3.9"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "croisement placé à pH 7": "ab.egalite-a-sept",
        "bascule supposée totale à 100 %": "ab.bascule-totale",
        "variation supposée linéaire": "ab.distribution-lineaire",
        "prédominance confondue avec 100 %": "ab.predom-cent",
      },
    },
    "ab-indicateur": {
      capacites: ["pc-pc 2.2.3.8", "pc-sm 2.2.3.8", "pc-svt 2.2.5.8"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "teinte intermédiaire hors de la zone": "ab.teinte-intermediaire",
        "nature de la solution et forme confondues": "ab.nature-forme",
        "tous les indicateurs vireraient au même pH": "ab.virage-commun",
        "indicateur supposé virer à pH 7": "ab.indicateur-sept",
      },
    },
    "ab-bac": {
      capacites: ["pc-pc 2.2.2.3", "pc-sm 2.2.2.3", "pc-svt 2.2.4.3", "pc-pc 2.2.3.4", "pc-sm 2.2.3.4", "pc-svt 2.2.5.4", "pc-pc 2.2.3.5", "pc-sm 2.2.3.5", "pc-svt 2.2.5.5", "pc-pc 2.2.3.6", "pc-sm 2.2.3.6", "pc-svt 2.2.5.6", "pc-pc 2.2.3.7", "pc-sm 2.2.3.7", "pc-svt 2.2.5.7", "pc-pc 2.2.3.8", "pc-sm 2.2.3.8", "pc-svt 2.2.5.8"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "rapport K_A2 / K_A1 inversé": "ab.k-couples-inverse",
        "différence des pK_A au lieu de la demi-somme": "ab.ph-melange-faux",
        "acide faible supposé intact": "ab.acide-intact",
        "C simplifiée à tort": "ab.c-simplifiee",
        "signe moins oublié dans pK_A": "ab.pk-signe",
        "pK_A pris égal au pH": "ab.pka-ph-solution",
        "−log[HO⁻] pris pour le pH": "ab.ho-pris-pour-h3o",
        "pH et concentration confondus": "ab.ph-concentration",
        "τ d’une base calculé avec [H₃O⁺]": "ab.tau-base-h3o",
        "Q_r,éq d’une base pris pour K_A": "ab.qr-base-pris-pour-ka",
        "échelle de pK_A lue à l’envers": "ab.pka-envers",
      },
    },
  },
};
