/**
 * Catalogue d'apprentissage de la leçon `noyaux` (format v3, leçon en cours de correction)
 * et de ses 14 gabarits d'exercices.
 *
 * DÉRIVÉ PAR LECTURE de `components/pilote/noyaux-moteur.js` (les étapes à options, leur
 * `indice` et leur `fb`) et de `components/pilote/exercices/noyaux.js` (les libellés `erreur`,
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

const DESINT = ["pc-pc 1.2.1.8", "pc-sm 1.2.1.8", "pc-svt 1.2.1.8"];
const DM = ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1"];
const ELA = ["pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2"];
const UNIT = ["pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"];
const EMASSE = ["pc-pc 1.2.2.5", "pc-sm 1.2.2.5", "pc-svt 1.2.2.5"];
const STAB = ["pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2", "pc-pc 1.2.2.4", "pc-sm 1.2.2.4", "pc-svt 1.2.2.4"];
const EQ = ["pc-pc 1.2.2.8", "pc-sm 1.2.2.8"];
const TYPE = ["pc-pc 1.2.2.9", "pc-sm 1.2.2.9"];
const BILAN = ["pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6", "pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7"];
const LIB = ["pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"];
const APPL = ["pc-pc 1.2.2.12", "pc-sm 1.2.2.12", "pc-svt 1.2.2.8"];
const DANG = ["pc-pc 1.2.2.13", "pc-sm 1.2.2.13", "pc-svt 1.2.2.9"];

export const NOYAUX: CatalogueLecon = {
  lecon: "noyaux",
  matiere: "physique",
  signature:
    "sav-test,sav-rappel,soleil,charbon,gravite,aston,eddington,einstein,pile,un-gramme,mev-ev,u-mev,peser,dm-def,calc-dm,v-dm,axe-energie,sens,formation,dm-inverse,par-nucleon,rn-po,u-par-nucleon,aston-courbe,aston-lire,rappel,trois-niveaux,bilan-masse,signe,deux-routes,deux-voies,fer-fer,fission-eq,fission-bilan,gramme,type,retour-eq,retour-de,retour-duree,usages,dangers,bac,bac-elib,bac-dm-ecart,bac-dm,bac-copie,bac-2022-lit,bac-2022-num,bac-2b,bac-erreur,q1,q2,q3,fin",
  questions: {
    "sav-test": { capacites: DESINT, juste: 0, options: [{ t: "A = 206 et Z = 82", e: "aucune" }, { t: "A = 206 et Z = 84", e: "inattention" }, { t: "A = 208 et Z = 82", e: "aucune" }, { t: "A = 214 et Z = 86", e: "aucune" }] },
    charbon: { capacites: [], juste: null, options: [{ t: "Quelques milliers d’années", e: "aucune" }, { t: "Quelques millions d’années", e: "aucune" }, { t: "Quelques milliards d’années", e: "aucune" }] },
    aston: { capacites: [], juste: null, options: [{ t: "Les 4 hydrogènes pèsent plus", e: "aucune" }, { t: "Exactement pareil : 4 nucléons d", e: "aucune" }, { t: "L’hélium pèse plus : ses neutron", e: "aucune" }] },
    eddington: { capacites: [], juste: null, options: [{ t: "Elle est sortie du noyau sous fo", e: "aucune" }, { t: "Ce n’est qu’une erreur de mesure", e: "aucune" }, { t: "Elle est restée cachée dans le n", e: "aucune" }] },
    pile: { capacites: [], juste: null, options: [{ t: "diminue, d’une quantité bien tro", e: "aucune" }, { t: "ne change pas : E = mc² ne conce", e: "aucune" }, { t: "diminue de la masse des électron", e: "aucune" }] },
    "un-gramme": { capacites: EMASSE, juste: 0, options: [{ t: "≈ 9 × 1013 J", e: "aucune" }, { t: "≈ 9 × 1016 J", e: "inattention" }, { t: "≈ 3 × 105 J", e: "inattention" }] },
    "mev-ev": { capacites: UNIT, juste: 0, options: [{ t: "1,602 18 × 10−13 J", e: "aucune" }, { t: "1,602 × 10−19 J", e: "inattention" }, { t: "1,602 × 10−25 J", e: "inattention" }] },
    "u-mev": { capacites: UNIT, juste: 0, options: [{ t: "E ≈ 931,5 MeV", e: "aucune" }, { t: "E ≈ 1,49 × 10−10 MeV", e: "inattention" }, { t: "E ≈ 9,31 × 108 MeV", e: "inattention" }] },
    peser: { capacites: [], juste: null, options: [{ t: "autant : ce sont les mêmes nuclé", e: "aucune" }, { t: "moins, de moins de 1 %", e: "aucune" }, { t: "moins, d’environ un quart", e: "aucune" }] },
    "v-dm": { capacites: DM, juste: 0, options: [{ t: "0,009 10 u", e: "aucune" }, { t: "0,007 72 u", e: "noy.composition-defaut" }, { t: "0,006 34 u", e: "noy.composition-defaut" }, { t: "−0,009 10 u", e: "inattention" }] },
    "axe-energie": { capacites: UNIT, juste: 0, options: [{ t: "0,030 37 × 931,5 ≈ 28,3 MeV", e: "aucune" }, { t: "0,030 37 × (3,00 × 108)² ≈ 2,7 ×", e: "inattention" }, { t: "0,030 37 / 931,5 ≈ 3,3 × 10−5 Me", e: "inattention" }] },
    sens: { capacites: [], juste: null, options: [{ t: "il faut lui fournir 28,3 MeV", e: "aucune" }, { t: "il libère 28,3 MeV", e: "aucune" }, { t: "rien : il suffit d’attendre qu’i", e: "aucune" }] },
    formation: { capacites: DM, juste: 0, options: [{ t: "elle est sortie du noyau quand i", e: "aucune" }, { t: "elle est rangée dans le noyau, p", e: "noy.el-reserve" }, { t: "elle est dans les nucléons, qui", e: "aucune" }] },
    "dm-inverse": { capacites: DM, juste: 0, options: [{ t: "492 / 931,5 ≈ 0,528 u", e: "aucune" }, { t: "492 × 931,5 ≈ 4,58 × 105 u", e: "inattention" }, { t: "492 / 56 ≈ 8,79 u", e: "aucune" }] },
    "par-nucleon": { capacites: ELA, juste: 0, options: [{ t: "au fer, malgré une énergie de li", e: "aucune" }, { t: "à l’uranium : sa Eℓ est 3,7 fois", e: "noy.stabilite-el-totale" }, { t: "pareil : un nucléon est un nuclé", e: "aucune" }] },
    "rn-po": { capacites: STAB, juste: 0, options: [{ t: "le polonium", e: "aucune" }, { t: "le radon : il faut plus d’énergi", e: "noy.stabilite-el-totale" }, { t: "on ne peut pas savoir sans conna", e: "aucune" }] },
    "u-par-nucleon": { capacites: ELA, juste: 0, options: [{ t: "≈ 7,59 MeV/nucléon", e: "aucune" }, { t: "≈ 19,4 MeV/nucléon", e: "aucune" }, { t: "≈ 12,5 MeV/nucléon", e: "aucune" }] },
    "aston-courbe": { capacites: [], juste: null, options: [{ t: "les plus lourds, à droite", e: "aucune" }, { t: "ceux du milieu, vers A ≈ 60", e: "aucune" }, { t: "les plus légers, à gauche", e: "aucune" }] },
    rappel: { capacites: STAB, juste: 0, options: [{ t: "le strontium 94", e: "aucune" }, { t: "l’uranium 235 : sa Eℓ est la plu", e: "noy.stabilite-el-totale" }, { t: "aucun : on ne compare pas des no", e: "aucune" }] },
    "trois-niveaux": { capacites: [], juste: null, options: [{ t: "plus bas que ²H + ³H", e: "aucune" }, { t: "plus haut", e: "aucune" }, { t: "au même niveau : mêmes nucléons", e: "aucune" }] },
    "bilan-masse": { capacites: BILAN, juste: 0, options: [{ t: "4,001 51 + 1,008 66 = 5,010 17 u", e: "aucune" }, { t: "4,001 51 u", e: "inattention" }, { t: "4,001 51 + 2 × 1,008 66 = 6,018", e: "inattention" }] },
    signe: { capacites: BILAN, juste: 0, options: [{ t: "le système perd 17,6 MeV : elle", e: "aucune" }, { t: "le système gagne 17,6 MeV : la r", e: "noy.signe-delta-e" }, { t: "rien de particulier : seule la v", e: "aucune" }] },
    "deux-routes": { capacites: BILAN, juste: 0, options: [{ t: "[Eℓ(²H) + Eℓ(³H)] − Eℓ(⁴He)", e: "aucune" }, { t: "Eℓ(⁴He) − [Eℓ(²H) + Eℓ(³H)]", e: "noy.signe-delta-e" }, { t: "[Eℓ/A(²H) + Eℓ/A(³H)] − Eℓ/A(⁴He", e: "noy.el-par-nucleon-additionnees" }] },
    "fer-fer": { capacites: [], juste: null, options: [{ t: "oui : toute fusion libère de l’é", e: "aucune" }, { t: "non : à A = 112, on est plus hau", e: "aucune" }, { t: "oui, mais moins qu’avec de l’hyd", e: "aucune" }] },
    "fission-eq": { capacites: EQ, juste: 0, options: [{ t: "2", e: "aucune" }, { t: "1", e: "inattention" }, { t: "0", e: "aucune" }] },
    "fission-bilan": { capacites: BILAN, juste: 0, options: [{ t: "807,8 + 1 160,7 − 1 783,9 ≈ 184,", e: "aucune" }, { t: "8,59 + 8,29 − 7,59 ≈ 9,3 MeV", e: "noy.el-par-nucleon-additionnees" }, { t: "807,8 + 1 160,7 + 1 783,9 ≈ 3 75", e: "aucune" }] },
    gramme: { capacites: LIB, juste: 0, options: [{ t: "≈ 7,6 × 1010 J", e: "aucune" }, { t: "≈ 4,7 × 1023 J", e: "inattention" }, { t: "≈ 7,6 × 104 J", e: "inattention" }] },
    type: { capacites: TYPE, juste: 0, options: [{ t: "n + 235U → 94Sr + 140Xe + 2 n", e: "aucune" }, { t: "238U → 234Th + 4He", e: "aucune" }, { t: "2H + 3H → 4He + n", e: "aucune" }] },
    "retour-eq": { capacites: EQ, juste: 0, options: [{ t: "des positons ⁣0⁣+1⁣e", e: "aucune" }, { t: "des électrons ⁣0⁣−1⁣e", e: "aucune" }, { t: "des neutrons ⁣1⁣0⁣n", e: "aucune" }] },
    "retour-de": { capacites: BILAN, juste: 0, options: [{ t: "(4,001 51 + 2 × 0,000 55 − 4 × 1", e: "aucune" }, { t: "(4,001 51 − 4 × 1,007 28) × 931,", e: "inattention" }, { t: "(4 × 1,007 28 − 4,001 51 − 2 × 0", e: "noy.signe-delta-e" }] },
    "retour-duree": { capacites: [], juste: null, options: [{ t: "non : moins de 1 %, c’est trop p", e: "aucune" }, { t: "tout juste", e: "aucune" }, { t: "oui, largement", e: "aucune" }] },
    usages: { capacites: APPL, juste: 0, options: [{ t: "des désintégrations α du plutoni", e: "aucune" }, { t: "de fissions du plutonium", e: "aucune" }, { t: "d’une pile chimique ordinaire", e: "aucune" }] },
    dangers: { capacites: DANG, juste: 0, options: [{ t: "l’exposition continue même s’il", e: "aucune" }, { t: "s’éloigner de la zone suffit à l", e: "aucune" }, { t: "aucun risque : les rayonnements", e: "aucune" }] },
    bac: { capacites: [], juste: null, options: [{ t: "Repérer le niveau du père et cel", e: "aucune" }, { t: "Prendre l’écart le plus grand du", e: "aucune" }, { t: "Convertir les trois niveaux en k", e: "aucune" }] },
    "bac-elib": { capacites: BILAN, juste: 0, options: [{ t: "Elib = 1,955 372 × 105 − 1,955 3", e: "aucune" }, { t: "Elib = 1,971 820 × 105 − 1,955 3", e: "aucune" }, { t: "Elib = 1,971 820 × 105 − 1,955 3", e: "aucune" }] },
    "bac-dm-ecart": { capacites: DM, juste: 0, options: [{ t: "nucléons séparés − ²¹⁰Po", e: "aucune" }, { t: "²¹⁰Po − (²⁰⁶Pb + ⁴He)", e: "aucune" }, { t: "nucléons séparés − (²⁰⁶Pb + ⁴He)", e: "aucune" }] },
    "bac-dm": { capacites: DM, juste: 0, options: [{ t: "1 644,8 / 931,41 × 1,66 × 10−27", e: "aucune" }, { t: "1 644,8 × 1,66 × 10−27 ≈ 2,73 ×", e: "inattention" }, { t: "1 644,8 × 931,41 × 1,66 × 10−27", e: "inattention" }] },
    "bac-2022-lit": { capacites: BILAN, juste: 0, options: [{ t: "ΔE = [m(Xe) + m(β−) − m(I)] c²", e: "aucune" }, { t: "ΔE = [m(I) − m(Xe) − m(β−)] c²", e: "noy.signe-delta-e" }, { t: "ΔE = [m(Xe) − m(I)] c²", e: "inattention" }] },
    "bac-2022-num": { capacites: BILAN, juste: 0, options: [{ t: "|(130,905 082 + 5,4858 × 10−4 −", e: "aucune" }, { t: "|(130,905 082 − 130,906 125) × 9", e: "inattention" }, { t: "|(130,905 082 + 5,4858 × 10−4 −", e: "inattention" }] },
    "bac-2b": { capacites: BILAN, juste: 0, options: [{ t: "|2,366 + 8,475 − 28,296| = 17,45", e: "aucune" }, { t: "2,366 + 8,475 + 28,296 = 39,137", e: "aucune" }, { t: "|1,183 + 2,825 − 7,074| = 3,066", e: "noy.el-par-nucleon-additionnees" }] },
    "bac-erreur": { capacites: BILAN, juste: 0, options: [{ t: "elle a calculé 7,73 + 7,07 − 7,6", e: "aucune" }, { t: "elle a calculé 218 × 7,73 − 222", e: "aucune" }, { t: "elle a calculé 1 685,14 + 28,28", e: "aucune" }] },
    q1: { capacites: EMASSE, juste: 0, options: [{ t: "Lors d’une réaction de fission n", e: "aucune" }, { t: "La masse d’un noyau atomique est", e: "noy.masse-conservee" }, { t: "Aucune des deux affirmations", e: "aucune" }] },
    q2: { capacites: ELA, juste: 0, options: [{ t: "l’uranium : 238 × 7,57 ≈ 1 802 M", e: "aucune" }, { t: "l’hélium : il ne se désintègre j", e: "aucune" }, { t: "presque pareil : 7,07 et 7,57 so", e: "aucune" }] },
    q3: { capacites: BILAN, juste: 0, options: [{ t: "il faut lui fournir 3,2 MeV", e: "aucune" }, { t: "elle libère 3,2 MeV, comme toute", e: "noy.signe-delta-e" }, { t: "on ne peut rien dire sans connaî", e: "aucune" }] },
  },
  gabarits: {
    "nme-unites": {
      capacites: ["pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "931,5 oublié (u lu comme MeV)": "inattention",
        "diviser au lieu de multiplier": "inattention",
        "MeV et eV confondus": "inattention",
      },
    },
    "nme-energie-masse": {
      capacites: ["pc-pc 1.2.2.5", "pc-sm 1.2.2.5", "pc-svt 1.2.2.5"], niveau: 1, optionsQcm: 3,
      erreurs: {
        "gramme non converti en kilogramme": "inattention",
        "c non élevée au carré": "inattention",
        "c en km·s⁻¹ avec m en kg": "inattention",
      },
    },
    "nme-defaut-masse": {
      capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "N = A (A neutrons)": "noy.composition-defaut",
        "signe de la soustraction inversé": "inattention",
        "u non converti en kg": "inattention",
        "Z et N inversés": "noy.composition-defaut",
      },
    },
    "nme-liaison": {
      capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1", "pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "Δm non converti (× 931,5 oublié)": "inattention",
        "E_ℓ/A : division par Z": "aucune",
        "E_ℓ/A : E_ℓ non divisée": "aucune",
        "E_ℓ/A : division par N": "aucune",
      },
    },
    "nme-stabilite": {
      capacites: ["pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2", "pc-pc 1.2.2.4", "pc-sm 1.2.2.4", "pc-svt 1.2.2.4"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "comparer E_ℓ au lieu de E_ℓ/A": "noy.stabilite-el-totale",
        "E_ℓ/A : division par Z": "aucune",
      },
    },
    "nme-aston": {
      capacites: ["pc-pc 1.2.2.4", "pc-sm 1.2.2.4", "pc-pc 1.2.2.7", "pc-sm 1.2.2.7"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "fission et fusion confondues": "aucune",
        "toute fusion libère de l’énergie": "aucune",
        "plus lourd = plus stable": "aucune",
      },
    },
    "nme-equation": {
      capacites: ["pc-pc 1.2.2.8", "pc-sm 1.2.2.8"], niveau: 2, optionsQcm: 3,
      erreurs: {
        "neutron incident oublié": "inattention",
        "Z du neutron pris égal à 1": "inattention",
        "une seule loi de conservation appliquée": "aucune",
      },
    },
    "nme-type": {
      capacites: ["pc-pc 1.2.2.9", "pc-sm 1.2.2.9", "pc-pc 1.2.1.9", "pc-sm 1.2.1.9"], niveau: 1, optionsQcm: 5,
      erreurs: {
        "β⁺ prise pour une fusion": "aucune",
        "désintégration α prise pour une fission": "aucune",
        "fusion prise pour une fission": "aucune",
      },
    },
    "nme-bilan-masses": {
      capacites: ["pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6", "pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "produits − réactifs inversé (signe de ΔE)": "noy.signe-delta-e",
        "particule émise oubliée (neutron, α, β)": "inattention",
        "× 931,5 oublié": "inattention",
      },
    },
    "nme-bilan-liaisons": {
      capacites: ["pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6", "pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7", "pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "sens inversé (ΔE de signe faux)": "noy.signe-delta-e",
        "E_ℓ/A additionnées": "noy.el-par-nucleon-additionnees",
        "toutes les énergies additionnées": "aucune",
      },
    },
    "nme-diagramme": {
      capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3", "pc-pc 1.2.2.10", "pc-sm 1.2.2.10", "pc-svt 1.2.2.6", "pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "l’écart le plus grand lu comme E_lib": "aucune",
        "E_ℓ des produits prise pour celle du père": "aucune",
        "MeV/c² lus comme des u": "inattention",
        "facteur 931,41 dans le mauvais sens": "inattention",
      },
    },
    "nme-echantillon": {
      capacites: ["pc-pc 1.2.2.11", "pc-sm 1.2.2.11", "pc-svt 1.2.2.7", "pc-pc 1.2.2.3", "pc-sm 1.2.2.3", "pc-svt 1.2.2.3"], niveau: 3, optionsQcm: 3,
      erreurs: {
        "N_A oublié (calcul en moles)": "inattention",
        "masse non convertie en grammes": "inattention",
        "MeV non convertis en joules": "inattention",
      },
    },
    "nme-usages-dangers": {
      capacites: ["pc-pc 1.2.2.12", "pc-sm 1.2.2.12", "pc-svt 1.2.2.8", "pc-pc 1.2.2.13", "pc-sm 1.2.2.13", "pc-svt 1.2.2.9"], niveau: 1, optionsQcm: 2,
      erreurs: {
        "irradiation et contamination confondues": "aucune",
        "désintégration prise pour une fission": "aucune",
      },
    },
    "nme-vrai-faux": {
      capacites: ["pc-pc 1.2.2.1", "pc-sm 1.2.2.1", "pc-svt 1.2.2.1", "pc-pc 1.2.2.2", "pc-sm 1.2.2.2", "pc-svt 1.2.2.2", "pc-pc 1.2.2.5", "pc-sm 1.2.2.5", "pc-svt 1.2.2.5"], niveau: 2, optionsQcm: 2,
      erreurs: {
        "E_ℓ vue comme une réserve que le noyau libère": "noy.el-reserve",
        "comparer E_ℓ au lieu de E_ℓ/A": "noy.stabilite-el-totale",
        "la masse se conserve": "noy.masse-conservee",
      },
    },
  },
};
