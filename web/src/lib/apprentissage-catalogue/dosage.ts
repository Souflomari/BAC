/**
 * Catalogue d'apprentissage de la leçon `dosage` (format v3)
 * et de ses 12 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/dosage-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/dosage.js` (les libellés `erreur`,
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

const EQ = ["pc-pc 2.2.3.10", "pc-sm 2.2.3.10", "pc-svt 2.2.5.10"];
const MONT = ["pc-pc 2.2.3.11", "pc-sm 2.2.3.11", "pc-svt 2.2.5.11"];
const EXPL = ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12"];
const EQUIV = ["pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13", "pc-pc 2.1.2.2", "pc-sm 2.1.2.2", "pc-svt 2.1.2.2"];
const IND = ["pc-pc 2.2.3.14", "pc-sm 2.2.3.14", "pc-svt 2.2.5.14"];
const EX_EQ = ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12", "pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13"];

export const DOSAGE: CatalogueLecon = {
  lecon: "dosage",
  matiere: "physique",
  signature:
    "sav-test,sav-rappel,goutte,combien,question,equation,fleche-K,totale,montage,avant-E,tableau-avant,pari-E,equivalence,ca,apres-E,pHE,allure,lent,saut,base-faible,rappel,tangentes,derivee,demi,rapport,pourcent,indicateur,bande,choix,bbt,dilution,masse,etiquette,ceq,retour-goutte,retour-volume,bac,bac-lecture,bac-ca,bac-ind,bac-rapport,bac-2a,bac-2b,bac-2c,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: [], juste: 0, options: [{ t: "CH₃COOH", e: "aucune" }, { t: "CH₃COO⁻", e: "inattention" }, { t: "aucune des deux, égalité", e: "aucune" }] },
    goutte: { capacites: [], juste: null, options: [{ t: "ne change rien de visible : il f", e: "aucune" }, { t: "donne une teinte pâle, qui fonce", e: "aucune" }, { t: "fait virer tout le bécher au ros", e: "aucune" }] },
    combien: { capacites: [], juste: null, options: [{ t: "12 mL", e: "aucune" }, { t: "24 mL", e: "aucune" }, { t: "6 mL", e: "aucune" }] },
    equation: { capacites: EQ, juste: 0, options: [{ t: "CH₃COOH(aq) + HO⁻(aq) → CH₃COO⁻(", e: "aucune" }, { t: "CH₃COOH(aq) + H₂O(l) ⇄ CH₃COO⁻(a", e: "dos.equation-eau" }, { t: "CH₃COOH(aq) + Na⁺(aq) + HO⁻(aq)", e: "dos.ions-spectateurs" }, { t: "CH₃COOH(aq) + HO⁻(aq) ⇄ CH₃COO⁻(", e: "dos.double-fleche" }] },
    "fleche-K": { capacites: EQ, juste: 0, options: [{ t: "KA / Ke ≈ 1,8 × 109", e: "aucune" }, { t: "Ke / KA ≈ 5,6 × 10−10", e: "dos.constante-k" }, { t: "KA · Ke ≈ 1,8 × 10−19", e: "dos.constante-k" }] },
    totale: { capacites: EQ, juste: 0, options: [{ t: "τ ≈ 1", e: "aucune" }, { t: "τ ≈ 3,0 × 10−4", e: "dos.reaction-limitee" }, { t: "τ ≈ 0,5", e: "dos.reaction-limitee" }] },
    montage: { capacites: MONT, juste: 0, options: [{ t: "dans la burette graduée", e: "aucune" }, { t: "dans le bécher, avec la sonde", e: "dos.montage-inverse" }, { t: "dans la pipette jaugée", e: "dos.montage-inverse" }] },
    "avant-E": { capacites: EXPL, juste: 0, options: [{ t: "aucun : chacun a réagi avec un C", e: "aucune" }, { t: "quatre : la réaction attend l’éq", e: "dos.becher-avant-e" }, { t: "deux : la moitié seulement a réa", e: "dos.reaction-limitee" }] },
    "tableau-avant": { capacites: EXPL, juste: 0, options: [{ t: "8,0 × 10−4 mol", e: "aucune" }, { t: "1,2 × 10−3 mol", e: "dos.becher-avant-e" }, { t: "4,0 × 10−4 mol", e: "aucune" }] },
    "pari-E": { capacites: [], juste: null, options: [{ t: "CH₃COOH et HO⁻ à parts égales", e: "aucune" }, { t: "CH₃COO⁻ (et Na⁺), plus d’acide n", e: "aucune" }, { t: "CH₃COOH et CH₃COO⁻, moitié-moiti", e: "aucune" }] },
    equivalence: { capacites: EQUIV, juste: 0, options: [{ t: "les quantités n(AH)₀ et n(HO⁻) v", e: "aucune" }, { t: "les volumes VA et VE", e: "dos.equivalence-egalite" }, { t: "les concentrations CA et CB", e: "dos.equivalence-egalite" }, { t: "les quantités d’ions H₃O⁺ et HO⁻", e: "dos.ph-equival-7" }] },
    ca: { capacites: EQUIV, juste: 0, options: [{ t: "6,0 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "0,17 mol·L⁻¹", e: "dos.rapport-inverse" }, { t: "0,10 mol·L⁻¹", e: "dos.equivalence-egalite" }] },
    "apres-E": { capacites: EXPL, juste: 0, options: [{ t: "ajoute des HO⁻ qui restent libre", e: "aucune" }, { t: "fait réagir les ions CH₃COO⁻ for", e: "dos.becher-apres-e" }, { t: "ne change plus rien dans le béch", e: "dos.becher-apres-e" }] },
    pHE: { capacites: [], juste: null, options: [{ t: "égal à 7", e: "aucune" }, { t: "supérieur à 7", e: "aucune" }, { t: "inférieur à 7", e: "aucune" }] },
    allure: { capacites: [], juste: null, options: [{ t: "une droite régulière, de 3 à 12", e: "aucune" }, { t: "une montée lente, un saut vers 1", e: "aucune" }, { t: "un pH fixe à 3 jusqu’à 12 mL, pu", e: "aucune" }] },
    lent: { capacites: EXPL, juste: 0, options: [{ t: "le bécher contient CH₃COOH et CH", e: "aucune" }, { t: "la soude est trop diluée pour ré", e: "dos.becher-avant-e" }, { t: "les ions HO⁻ versés restent libr", e: "dos.becher-avant-e" }] },
    saut: { capacites: EXPL, juste: 0, options: [{ t: "le dernier acide est consommé :", e: "aucune" }, { t: "l’indicateur change de couleur e", e: "aucune" }, { t: "cet ajout est plus concentré que", e: "aucune" }] },
    "base-faible": { capacites: EXPL, juste: 0, options: [{ t: "inférieur à 7", e: "aucune" }, { t: "supérieur à 7", e: "dos.base-copiee-acide" }, { t: "égal à 7", e: "dos.ph-equival-7" }] },
    rappel: { capacites: EX_EQ, juste: 0, options: [{ t: "CH₃COO⁻ (et Na⁺) ; pH > 7", e: "aucune" }, { t: "CH₃COOH et HO⁻ à parts égales ;", e: "dos.becher-a-e" }, { t: "CH₃COOH et CH₃COO⁻ moitié-moitié", e: "dos.demi-equivalence-e" }] },
    tangentes: { capacites: EQUIV, juste: 0, options: [{ t: "(12,0 mL ; 8,7)", e: "aucune" }, { t: "(12,0 mL ; 7,0)", e: "dos.ph-equival-7" }, { t: "(6,0 mL ; 4,75)", e: "dos.demi-equivalence-e" }] },
    derivee: { capacites: EQUIV, juste: 0, options: [{ t: "à l’abscisse du sommet du pic", e: "aucune" }, { t: "là où la dérivée revient à zéro", e: "dos.derivee-nulle" }, { t: "sur l’axe vertical, à la hauteur", e: "dos.derivee-ordonnee" }] },
    demi: { capacites: EXPL, juste: 0, options: [{ t: "pKA = 4,75", e: "aucune" }, { t: "pHE / 2 ≈ 4,3", e: "dos.demi-ph-moitie" }, { t: "7,0", e: "dos.demi-ph-moitie" }] },
    rapport: { capacites: EXPL, juste: 0, options: [{ t: "VE / VB − 1", e: "aucune" }, { t: "VB / VE", e: "dos.rapport-formes" }, { t: "VE / VB", e: "dos.rapport-formes" }] },
    pourcent: { capacites: EXPL, juste: 0, options: [{ t: "75 %", e: "aucune" }, { t: "25 %", e: "dos.rapport-formes" }, { t: "50 %", e: "dos.demi-equivalence-e" }] },
    indicateur: { capacites: IND, juste: 0, options: [{ t: "incolore", e: "aucune" }, { t: "rose", e: "inattention" }, { t: "de teinte intermédiaire", e: "dos.indicateur-zone" }] },
    bande: { capacites: [], juste: null, options: [{ t: "12 mL, à l’équivalence", e: "aucune" }, { t: "les premiers millilitres", e: "aucune" }, { t: "jamais : sa zone est trop basse", e: "aucune" }] },
    choix: { capacites: IND, juste: 0, options: [{ t: "la phénolphtaléine", e: "aucune" }, { t: "le rouge de méthyle", e: "dos.indicateur-zone" }, { t: "l’hélianthine", e: "dos.indicateur-zone" }] },
    bbt: { capacites: IND, juste: 0, options: [{ t: "avant l’équivalence : il ne conv", e: "aucune" }, { t: "à l’équivalence : il convient ca", e: "dos.ph-equival-7" }, { t: "après l’équivalence : il vire tr", e: "dos.indicateur-zone" }] },
    dilution: { capacites: EXPL, juste: 0, options: [{ t: "4,80 mol·L⁻¹", e: "aucune" }, { t: "4,8 × 10−4 mol·L⁻¹", e: "dos.dilution-chaine" }, { t: "4,8 × 10−2 mol·L⁻¹", e: "dos.dilution-chaine" }] },
    masse: { capacites: EXPL, juste: 0, options: [{ t: "37 g", e: "aucune" }, { t: "3,7 g", e: "dos.dilution-chaine" }, { t: "0,74 g", e: "dos.prise-essai" }] },
    etiquette: { capacites: EXPL, juste: 0, options: [{ t: "C0·M ≈ 499 g·L⁻¹, proche de 500", e: "aucune" }, { t: "C0·M ≈ 499 g·L⁻¹, différent de 5", e: "dos.etiquette-stricte" }, { t: "C0 / M ≈ 0,046 g·L⁻¹, loin de 50", e: "aucune" }] },
    ceq: { capacites: EX_EQ, juste: 0, options: [{ t: "3,2 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "4,8 × 10−2 mol·L⁻¹", e: "dos.volume-total" }, { t: "0,10 mol·L⁻¹", e: "dos.volume-total" }] },
    "retour-volume": { capacites: EQUIV, juste: 0, options: [{ t: "9,0 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "6,0 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "0,11 mol·L⁻¹", e: "dos.rapport-inverse" }] },
    bac: { capacites: EQUIV, juste: 0, options: [{ t: "Tracer deux tangentes parallèles", e: "aucune" }, { t: "Chercher sur la courbe le point", e: "dos.ph-equival-7" }, { t: "Calculer VBE = CA·VA / CB", e: "dos.equivalence-egalite" }] },
    "bac-ca": { capacites: EQUIV, juste: 0, options: [{ t: "2,0 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "4,5 × 10−2 mol·L⁻¹", e: "dos.rapport-inverse" }, { t: "3 × 10−2 mol·L⁻¹", e: "dos.equivalence-egalite" }] },
    "bac-ind": { capacites: IND, juste: 0, options: [{ t: "rouge de crésol", e: "aucune" }, { t: "B.B.T", e: "dos.indicateur-zone" }, { t: "hélianthine", e: "dos.indicateur-zone" }] },
    "bac-rapport": { capacites: EXPL, juste: 0, options: [{ t: "1,3 × 104 ; A⁻ prédomine", e: "aucune" }, { t: "1 ; aucune ne prédomine", e: "dos.demi-equivalence-e" }, { t: "7,9 × 10−5 ; AH prédomine", e: "dos.rapport-formes" }] },
    "bac-2a": { capacites: EQUIV, juste: 0, options: [{ t: "25,0 mL", e: "aucune" }, { t: "30,0 mL", e: "dos.derivee-nulle" }, { t: "12,5 mL", e: "dos.demi-equivalence-e" }] },
    "bac-2b": { capacites: EQUIV, juste: 0, options: [{ t: "2,5 × 10−2 mol·L⁻¹", e: "aucune" }, { t: "9,0 × 10−3 mol·L⁻¹", e: "dos.rapport-inverse" }, { t: "1,50 × 10−2 mol·L⁻¹", e: "dos.equivalence-egalite" }] },
    "bac-2c": { capacites: EXPL, juste: 0, options: [{ t: "0,22 g", e: "aucune" }, { t: "0,066 g", e: "dos.prise-essai" }, { t: "0,25 g", e: "aucune" }] },
    q1: { capacites: EQUIV, juste: 0, options: [{ t: "la flèche désigne la courbe ; Vb", e: "aucune" }, { t: "aucune : VbE se lit là où la dér", e: "dos.derivee-nulle" }, { t: "il fallait lire VbE là où la cou", e: "dos.ph-equival-7" }] },
    q2: { capacites: IND, juste: 0, options: [{ t: "rouge de méthyle", e: "aucune" }, { t: "phénolphtaléine", e: "dos.base-copiee-acide" }, { t: "hélianthine", e: "dos.indicateur-zone" }] },
    q3: { capacites: EXPL, juste: 0, options: [{ t: "VB = VE / 2", e: "aucune" }, { t: "VB = VE", e: "dos.demi-equivalence-e" }, { t: "là où pH = 7", e: "dos.demi-ph-moitie" }] },
  },
  gabarits: {
    "dos-equation": {
      capacites: ["pc-pc 2.2.3.10", "pc-sm 2.2.3.10", "pc-svt 2.2.5.10"], niveau: 1, optionsQcm: 4,
      erreurs: {
        "réaction avec l’eau (+1)": "dos.equation-eau",
        "proton H⁺ libre (AB-BASE-5)": "inattention",
        "double flèche (+3)": "dos.double-fleche",
        "ions spectateurs (+2)": "dos.ions-spectateurs",
      },
    },
    "dos-K": {
      capacites: ["pc-pc 2.2.3.10", "pc-sm 2.2.3.10", "pc-svt 2.2.5.10"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "K inversé (AB-BASE-7)": "dos.constante-k",
        "produit K_A·K_e (AB-BASE-7)": "dos.constante-k",
        "réaction limitée acceptée (AB-TIT-3)": "dos.reaction-limitee",
      },
    },
    "dos-montage": {
      capacites: ["pc-pc 2.2.3.11", "pc-sm 2.2.3.11", "pc-svt 2.2.5.11"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "titré et titrant échangés (+5)": "dos.montage-inverse",
        "verrerie imprécise": "inattention",
      },
    },
    "dos-equivalence": {
      capacites: ["pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13", "pc-pc 2.1.2.2", "pc-sm 2.1.2.2", "pc-svt 2.1.2.2"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "rapport inversé (+8)": "dos.rapport-inverse",
        "concentrations ou volumes égaux (AB-TIT-2)": "dos.equivalence-egalite",
        "mL non converti": "inattention",
      },
    },
    "dos-becher": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "AH et HO⁻ ensemble à E (+7)": "dos.becher-a-e",
        "demi-équivalence confondue avec E (AB-EQU-3)": "dos.demi-equivalence-e",
        "réaction entre deux bases": "dos.becher-apres-e",
        "rien ne change après E (+9)": "dos.becher-apres-e",
        "HO⁻ non consommé avant E (+6)": "dos.becher-avant-e",
        "limitant inversé avant E": "dos.becher-avant-e",
        "acide restant confondu avec base formée": "dos.becher-avant-e",
      },
    },
    "dos-lecture": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12", "pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "demi-équivalence prise pour E (AB-EQU-3)": "dos.demi-equivalence-e",
        "lu à pH = 7 (AB-EQU-1)": "dos.ph-equival-7",
        "dérivée nulle (AB-EQU-2)": "dos.derivee-nulle",
        "hauteur du pic lue en ordonnée (+14)": "dos.derivee-ordonnee",
      },
    },
    "dos-demi": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "égalité placée à pH = 7 (AB-DIST-3)": "dos.demi-ph-moitie",
        "demi-équivalence confondue avec E (AB-EQU-3)": "dos.demi-equivalence-e",
        "mauvaise lecture du tableau": "inattention",
        "pH_E/2 (+15)": "dos.demi-ph-moitie",
      },
    },
    "dos-rapport": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "« − 1 » oublié (I-9)": "dos.rapport-formes",
        "formes acide et basique échangées (+16)": "dos.rapport-formes",
        "50 % à tort (AB-EQU-3)": "dos.demi-equivalence-e",
      },
    },
    "dos-indicateur": {
      capacites: ["pc-pc 2.2.3.14", "pc-sm 2.2.3.14", "pc-svt 2.2.5.14"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "pH_E = 7 supposé (AB-TIT-1)": "dos.ph-equival-7",
        "indicateur hors zone (AB-IND-1)": "dos.indicateur-zone",
        "pH_E > 7 recopié pour une base (+13)": "dos.base-copiee-acide",
      },
    },
    "dos-chaine": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "prise d’essai confondue avec le volume total (+18)": "dos.prise-essai",
        "égalité stricte exigée (+19)": "dos.etiquette-stricte",
        "formule C_0·M inversée": "inattention",
        "facteur de dilution oublié ou inversé (+17)": "dos.dilution-chaine",
      },
    },
    "dos-ceq": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12", "pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "volume total oublié (+20)": "dos.volume-total",
        "divisé par V_BE seul (+20)": "dos.volume-total",
      },
    },
    "dos-bac": {
      capacites: ["pc-pc 2.2.3.12", "pc-sm 2.2.3.12", "pc-svt 2.2.5.12", "pc-pc 2.2.3.13", "pc-sm 2.2.3.13", "pc-svt 2.2.5.13", "pc-pc 2.2.3.14", "pc-sm 2.2.3.14", "pc-svt 2.2.5.14"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "rapport inversé (+8)": "dos.rapport-inverse",
        "concentrations égales (AB-TIT-2)": "dos.equivalence-egalite",
        "prise d’essai confondue (+18)": "dos.prise-essai",
        "volume total oublié (+20)": "dos.volume-total",
        "indicateur hors zone (AB-IND-1)": "dos.indicateur-zone",
        "pH_E = 7 supposé (AB-TIT-1)": "dos.ph-equival-7",
      },
    },
  },
};
