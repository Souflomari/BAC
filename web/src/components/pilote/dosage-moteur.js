/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « Le dosage acido-basique », V3 (plan : docs/refonte/specs/dosage-acido-basique.md).
 *
 * Onze parties, 48 étapes (sans la partie optionnelle de conductimétrie) : ce qu'il faut savoir (sautable),
 * l'énigme (une goutte fait virer tout le bécher), la réaction du dosage (équation, K, τ ≈ 1, montage),
 * dans le bécher (jeton par jeton, équivalence, C_A), la courbe pH = f(V_B) et base faible, repérer
 * l'équivalence (rappel, tangentes, dérivée, demi-équivalence, rapport, pourcentage), l'indicateur coloré,
 * exploiter le résultat (dilution, masse, étiquette, C_eq), retour à l'énigme, deux sujets du bac (2018 et
 * 2024), le bilan.
 *
 * Les scènes vivent dans dosage-scenes-{a,b,c}.js, les données sourcées et calculs dans dosage-outils.js :
 * AUCUN nombre affiché n'est écrit à la main ici. Le déroulé, les paris et les dérivations sont dans noyau.js.
 */
import { monterLecon } from "./noyau";
import {
  fr, sciH, sciF, TN, TS, outilsDos,
  PKE, PKA_ETH, CA_L, VA_L, CB_L, VE_L, VMAX_L, N_JETONS, JETON_MOL,
  V_AV_G, V_AP_G, DV_SAUT, V_AV_ENT, V_LENT_1, V_LENT_2, V_APRES, DV_APRES, DPH_DOUBLE, PH_EX_IND,
  PH_0, PH_4, PH_6, PH_8, PH_AV_G, PH_E, PH_AP_G, PH_20,
  SAV, COMB, K_DOS, K_FAUX_INV, K_FAUX_PROD, TOT, TAB_AV, CA_STEP, DEMI, POURCENT,
  IND, VIR_LECON, RET_V, S18, S20, S22, S24, S25, phL,
} from "./dosage-outils";
import { scenesA } from "./dosage-scenes-a";
import { scenesB } from "./dosage-scenes-b";
import { scenesC } from "./dosage-scenes-c";

export function monterPilote(root) {
return monterLecon(root, (ctx) => {
  const { scenes, S } = ctx;
  const $ = ctx.$;
  const tx = String.raw;
  const O = outilsDos(ctx);

  /* ---------- les nombres du texte, tous calculés ---------- */
  const vaS = fr(VA_L, 1), cbS = fr(CB_L, 2), caS = sciH(CA_L, 1), veS = fr(VE_L, 1), ve0S = fr(VE_L, 0), vmaxS = fr(VMAX_L, 0);
  const pkaS = fr(PKA_ETH, 2), vAvG = fr(V_AV_G, 2), vApG = fr(V_AP_G, 2), dvSaut = fr(DV_SAUT, 2), vAvEnt = fr(V_AV_ENT, 0);
  const vL1 = fr(V_LENT_1, 0), vL2 = fr(V_LENT_2, 0), vAprS = fr(V_APRES, 0), dvAprS = fr(DV_APRES, 0), dphDbl = fr(DPH_DOUBLE, 1);
  const phExInd = fr(PH_EX_IND, 0);
  const ph0S = fr(PH_0, 1), ph0Ent = fr(Math.round(PH_0), 0), ph20Ent = fr(Math.round(PH_20), 0);
  const ph4S = fr(PH_4, 2), ph6S = fr(PH_6, 2), ph8S = fr(PH_8, 2);
  const phAvS = fr(PH_AV_G, 1), phES = fr(PH_E, 1), phApS = fr(PH_AP_G, 1);
  const savPh = fr(SAV.pH, 1), combV1 = fr(COMB.V1, 0), combV2 = fr(COMB.V2, 0), combVd = fr(COMB.Vdemi, 0);
  const kDosS = sciH(K_DOS, 1), kInvS = sciH(K_FAUX_INV, 1), kProdS = sciH(K_FAUX_PROD, 1);
  const totV = fr(TOT.V, 1), totPh = fr(TOT.pH, 2), totXm = sciH(TOT.xmax, 1), totHo = sciH(TOT.nHO, 1), totFx = sciH(TOT.fauxEau, 1), totRap = sciH(TOT.rapport, 1);
  const tabV = fr(TAB_AV.V, 1), tabN0 = sciH(TAB_AV.n0, 1), tabNB = sciH(TAB_AV.nB, 1), tabNAH = sciH(TAB_AV.nAH, 1);
  const tabJV = fr(TAB_AV.jetVerses, 0), tabJR = fr(TAB_AV.jetRestants, 0);
  const caInvS = fr(CA_STEP.fauxInv, 2), caCbS = fr(CA_STEP.fauxCB, 2);
  const demiV = fr(DEMI.V, 1), demiFx = fr(DEMI.fauxMoitie, 1);
  const pcV = fr(POURCENT.V, 1), pcRap = fr(POURCENT.rap, 0), pcTot = fr(POURCENT.partsTot, 0), pcA = fr(POURCENT.pctA, 0), pcB = fr(POURCENT.pctB, 0);
  const indPhMin = fr(IND.phenolphtaleine.min, 1), indPhMax = fr(IND.phenolphtaleine.max, 0);
  const indPh = `${indPhMin}–${indPhMax}`;
  const indHel = `${fr(IND.helianthine20.min, 1)}–${fr(IND.helianthine20.max, 1)}`;
  const indRm = `${fr(IND.rougeMethyle.min, 1)}–${fr(IND.rougeMethyle.max, 1)}`;
  const indBbt = `${fr(IND.bbt.min, 0)}–${fr(IND.bbt.max, 1)}`;
  const indRc = `${fr(IND.rougeCresol.min, 1)}–${fr(IND.rougeCresol.max, 1)}`;
  const indH18 = `${fr(IND.helianthine18.min, 0)}–${fr(IND.helianthine18.max, 1)}`;
  const virHel = `${fr(VIR_LECON.hel[0], 1)} à ${fr(VIR_LECON.hel[1], 1)} mL`;
  const virRm = `${fr(VIR_LECON.rm[0], 1)} à ${fr(VIR_LECON.rm[1], 1)} mL`;
  const retV = fr(RET_V.V, 1), retCa = sciH(RET_V.CA, 1), retInv = fr(RET_V.fauxInv, 2);
  // sujets
  const s18Va = fr(S18.VA, 0), s18Cb = sciH(S18.CB, 0), s18Ve = fr(S18.VE, 1), s18Ve2 = fr(S18.VE2, 1), s18Phe = fr(S18.pHE, 1);
  const s18Ca = sciH(S18.CA, 1), s18Inv = sciH(S18.fauxInv, 1), s18Pka = fr(S18.pKA, 1);
  const s18Rap = sciH(S18.rapE, 1), s18RapInv = sciH(S18.fauxRapInv, 1), s18Diff = fr(S18.pHE - S18.pKA, 1);
  const s18B = S18.bareme.map((b) => fr(b, b % 0.5 === 0 ? 1 : 2)), s18BTot = fr(S18.baremeTot, 2);
  const s20Vb = fr(S20.Vb, 0), s20Ca = sciH(S20.Ca, 0), s20Phe = fr(S20.pHE, 1);
  const s22Ca = sciH(S22.Ca, 0), s22Va = fr(S22.Va, 0), s22M = fr(S22.M, 0), s22Dil = fr(S22.dil, 0), s22m = fr(S22.m, 0), s22B24 = fr(S22.baremeQ24, 1);
  const s22FxD = fr(S22.fauxDil, 1), s22FxP = fr(S22.fauxPrise, 2), s22Ve = fr(S22.VE, 1), s22Fl = fr(S22.Vfleche, 1), s22Cp = sciH(S22.CaCopie, 1);
  const s24Vsa = fr(S24.VSA, 1), s24VsaL = fr(S24.VSA_L, 4), s24Va = fr(S24.VA, 1), s24Cb = sciH(S24.CB, 2), s24M = fr(S24.M, 0);
  const s24Ve = fr(S24.VBE, 1), s24Ve2 = fr(S24.VBE / 2, 1), s24FxDer = fr(S24.vFauxDer, 1), s24Ca = sciH(S24.CA, 1), s24Inv = sciH(S24.fauxInv, 1);
  const s24m = fr(S24.mRest, 2), s24FxP = fr(S24.fauxPrise, 3), s24Ann = fr(S24.mAnnonce, 2);
  const s24B = S24.bareme.map((b) => fr(b, b % 0.5 === 0 ? 1 : 2));
  const s25Dil = fr(S25.dil, 0), s25Ca = sciH(S25.CA, 1), s25C0 = fr(S25.C0, 2), s25FxD = sciH(S25.fauxDilDiv, 1);
  const s25Etiq = fr(S25.etiq, 0), s25M = fr(S25.M, 0), s25Cm = fr(S25.Cm, 0), s25DivM = fr(S25.fauxDivM, 3);
  const s25Va = fr(S25.VA, 1), s25Ve = fr(S25.VBE, 1), s25Xm = sciH(S25.xmax, 1), s25Ceq = sciH(S25.Ceq, 1);
  const s25FxVa = sciH(S25.fauxVA, 1), s25FxVb = fr(S25.fauxVBE, 2);
  const s25B13 = fr(S25.baremeQ13, 2), s25B14 = fr(S25.baremeQ14, 2), s25B16 = fr(S25.baremeQ16, 2);

  /* ---------- les pièges du bilan (scène `quiz`) ---------- */
  const QUIZ = [
    {
      titre: "Choix d’indicateur", tag: "sujet 2020 : NH_{3} dosé par HCl",
      big: `pH_{E} ≈ ${s20Phe}`, sub: `trois zones : ${indHel} · ${indRm} · ${indPh}`,
      r1: `rouge de méthyle (${indRm})`, r2: "sa zone de virage contient pH_{E}",
    },
    {
      titre: "Lire pK_{A} sur une courbe", tag: "courbe de dosage d’un acide faible",
      big: "pH = p*K*_{A}  en  *V*_{B} = ?", sub: "quel volume lire sur l’axe horizontal ?",
      r1: "à *V*_{B} = *V*_{E} / 2", r2: "demi-équivalence : [AH] = [A^{−}]",
    },
  ];

  scenesA(ctx, O);
  scenesB(ctx, O);
  scenesC(ctx, O, QUIZ);

  /* ---------- écritures pour le panneau ---------- */
  const IX = {
    "x_max": "<i>x</i><sub>max</sub>", "x_f": "<i>x</i><sub>f</sub>",
    "C_A": "<i>C</i><sub>A</sub>", "C_B": "<i>C</i><sub>B</sub>", "C_0": "<i>C</i><sub>0</sub>", "C_a": "<i>C</i><sub>a</sub>", "C_eq": "<i>C</i><sub>eq</sub>",
    "V_BE": "<i>V</i><sub>BE</sub>", "V_bE": "<i>V</i><sub>bE</sub>", "V_SA": "<i>V</i><sub>SA</sub>",
    "V_A": "<i>V</i><sub>A</sub>", "V_B": "<i>V</i><sub>B</sub>", "V_E": "<i>V</i><sub>E</sub>", "V_a": "<i>V</i><sub>a</sub>", "V_b": "<i>V</i><sub>b</sub>",
    "S_A": "<i>S</i><sub>A</sub>", "S_a": "<i>S</i><sub>a</sub>", "S_0": "<i>S</i><sub>0</sub>",
    "pH_E": "pH<sub>E</sub>", "pK_A": "p<i>K</i><sub>A</sub>", "K_A": "<i>K</i><sub>A</sub>", "K_e": "<i>K</i><sub>e</sub>",
    "Q_r,éq": "<i>Q</i><sub>r,éq</sub>", "τ": "<i>τ</i>", "K": "<i>K</i>", "M": "<i>M</i>", "m": "<i>m</i>", "n": "<i>n</i>", "C": "<i>C</i>", "V": "<i>V</i>",
  };
  const IXRE = /(^|[^\p{L}\p{N}_])(K|M|m|n|C|V)(?![\p{L}\p{N}_’'])|x_max|x_f|C_eq|C_A|C_B|C_0|C_a|V_BE|V_bE|V_SA|V_A|V_B|V_E|V_a|V_b|S_A|S_a|S_0|pH_E|pK_A|K_A|K_e|Q_r,éq|τ/gu;
  const ix = (s) => (typeof s !== "string" ? s : s
    .replace(/10\^\(([^)]+)\)/g, "10<sup>$1</sup>")
    .replace(/10\^([0-9,−-]+)/g, "10<sup>$1</sup>")
    .split(/(vitamine C|<sub>.*?<\/sub>|<sup>.*?<\/sup>|<i>.*?<\/i>|<[^>]+>|\[\[[^\]]*\]\])/)
    .map((p, i) => (i % 2 ? p : p.replace(IXRE, (m, pre, lettre) => (lettre ? pre + IX[lettre] : IX[m] || m))))
    .join(""));

  const BET = (t) => ({ opts: t.map(([x, fb, j]) => ({ t: ix(x), fb: ix(fb), juste: !!j })) });
  const VF = (t) => ({ opts: t.map(([x, ok, fb, indice]) => ({ t: ix(x), ok, fb: ix(fb), indice: ix(indice) })) });
  const saut = (cle, vers, oui, non) => ({
    get html() {
      return ctx.juste(cle)
        ? `<button type="button" class="ctl-btn alt saut" data-aller="${vers}">${oui} →</button>`
        : `<p class="small">${non}</p>`;
    },
  });

  /* états complets de chaque scène */
  const DO = (o) => ({ jeu: "enigme", V: V_AV_G, ind: 1, jet: 0, phm: 0, cv: 0, lab: 0, zoom: 0, pe: 0, p7: 0, ghost: -1, ch: "", cas: "s25", rv: 0, hl: 0, eqc: 0, reac: 1, sub: "", ...o });
  const PV = (o) => ({ jeu: "lecon", curve: 1, tg: 0, med: 0, pe: 0, der: 0, demi: 0, lect: 0, bandeMin: 0, bandeMax: 0, bandePos: 0, bandeShow: 1, bandeLab: "", p7: 0, ptV: -1, curV: -1, rv: 0, axeMode: "predom", sub: "", ...o });
  const TB = (o) => ({ mode: "avant", cases: 12, rv: 0, fx: -1, sub: "", ...o });

  function rappelGoutte() {
    const j = S.first.goutte;
    if (j == null) return "";
    return [
      `Tu avais parié que rien ne changerait : un ajout de ${dvSaut} mL a pourtant fait virer tout le bécher.`,
      `Tu avais parié une teinte pâle sur plusieurs mL : ${dvSaut} mL ont suffi.`,
      `Tu avais parié juste : ${dvSaut} mL ont fait virer tout le bécher d’un coup.`,
    ][j];
  }
  function rappelCombien() {
    const j = S.first.combien;
    if (j == null) return "";
    return [
      `Tu avais parié ${combV1} mL : deux fois plus d’acide demande ${combV2} mL.`,
      `Tu avais parié juste : deux fois plus d’acide demande ${combV2} mL.`,
      `Tu avais parié ${combVd} mL : deux fois plus d’acide demande ${combV2} mL.`,
    ][j];
  }

  /* ---------- les 11 parties (48 étapes) ---------- */
  const BEATS = [
    { name: "Ce qu’il faut savoir", court: "Savoir" },
    { name: "L’énigme", court: "Énigme" },
    { name: "La réaction du dosage", court: "Réaction" },
    { name: "Dans le bécher", court: "Bécher" },
    { name: "La courbe", court: "Courbe" },
    { name: "Repérer l’équivalence", court: "Repérer" },
    { name: "L’indicateur coloré", court: "Virage" },
    { name: "Exploiter le résultat", court: "Exploiter" },
    { name: "Retour à l’énigme", court: "Retour" },
    { name: "Au bac", court: "Au bac" },
    { name: "Bilan", court: "Bilan" },
  ];

  const STEPS = [
    /* ===== 0. Ce qu'il faut savoir (2 étapes) ===== */
    { cle: "sav-test", beat: 0, scene: "phv", set: PV({ jeu: "axe", axeMode: "predom", rv: 0 }), sujet: "espèce prédominante selon pH et pK_A",
      text: ["Ce qu’il faut savoir : juste du premier coup, tu passes à l’énigme.", `Une solution est à pH = ${savPh} ; le couple CH₃COOH/CH₃COO⁻ a pK_A = ${pkaS}. Quelle espèce prédomine ?`],
      verifie: {
        ...VF([
          ["CH₃COOH", true, `Oui : pH < pK_A (${savPh} < ${pkaS}), donc la forme acide CH₃COOH prédomine.`],
          ["CH₃COO⁻", false, "Tu as inversé l’échelle de pH. Sous le pK_A, c’est la forme acide qui prédomine.", "Pour pH < pK_A, est-ce l’acide ou la base qui prédomine ?"],
          ["aucune des deux, égalité", false, "Tu as lu pK_A comme une zone. L’égalité des deux formes n’a lieu qu’à pH = pK_A.", "À quel pH précis les deux formes sont-elles à égalité ?"],
        ]),
        reveal: [{ p: { rv: 1 }, d: 600 }],
        apres: saut("sav-test", "goutte", "Je le sais : passer à l’énigme", "La suite te le rappelle."),
      } },
    { cle: "sav-rappel", beat: 0, scene: "phv", set: PV({ jeu: "axe", axeMode: "predom", rv: 1 }),
      text: ["Trois rappels utiles pour la suite.", `n = C·V avec V en litres ; [H₃O⁺] = 10^(−pH) et [H₃O⁺][HO⁻] = K_e = 10^(−${PKE}) à 25 °C.`, "Pour pH < pK_A l’acide prédomine, pour pH > pK_A la base prédomine. Si besoin, revois la leçon sur le logarithme."],
      tex: [[tx`n=C\,V\qquad [\mathrm{H_3O^+}][\mathrm{HO^-}]=K_e=10^{-${PKE}}`, `n = C V ; [H₃O⁺][HO⁻] = K_e = 10⁻¹⁴`]] },

    /* ===== 1. L'énigme (3 étapes) ===== */
    { cle: "goutte", beat: 1, scene: "dosage", set: DO({ jeu: "enigme", V: V_AV_G, ind: 1, phm: 0, ghost: -1 }),
      text: [`Dans un bécher : ${vaS} mL d’une solution d’acide éthanoïque et un peu de [[phenolphtaleine|phénolphtaléine]], incolore.`, `Au-dessus, une [[burette]] de soude à ${cbS} mol·L⁻¹. On a déjà versé ${vAvG} mL sans aucun changement.`, `L’ajout suivant (${dvSaut} mL)…`],
      pari: {
        reveal: [{ p: { V: V_AP_G }, d: 1800 }],
        ...BET([
          ["ne change rien de visible : il faudra encore plusieurs mL", `Tu as prolongé ce qui s’est passé pendant ${vAvEnt} mL. Un ajout de ${dvSaut} mL a pourtant fait virer tout le bécher au rose.`],
          ["donne une teinte pâle, qui fonce sur plusieurs mL", `C’est ce qu’on voit au début avec d’autres indicateurs. Ici, ${dvSaut} mL suffisent pour tout faire basculer.`],
          ["fait virer tout le bécher au rose, d’un coup", `Exactement : ${dvSaut} mL suffisent pour passer d’incolore à rose.`, 1],
        ]),
      } },
    { cle: "combien", beat: 1, scene: "dosage", tag: "vers 1791 · Descroizilles", set: DO({ jeu: "enigme", V: V_AP_G, ind: 1, phm: 0, ghost: 0 }),
      text: ["Vers 1791, Descroizilles fabrique un tube gradué pour verser une solution et lire le volume versé, afin de mesurer la force des alcalis puis le titre du vinaigre.", `Avec une solution d’acide éthanoïque deux fois plus concentrée, même volume (${vaS} mL), la couleur basculera vers…`],
      pari: {
        reveal: [{ p: { ghost: 1 }, d: 1200 }],
        ...BET([
          [`${combV1} mL`, `Tu as supposé que le volume dépend seulement de la nature de l’acide. Deux fois plus d’acide demande ${combV2} mL.`],
          [`${combV2} mL`, `Oui : deux fois plus d’acide dans le bécher, deux fois plus de soude versée, ${combV2} mL.`, 1],
          [`${combVd} mL`, `Tu as lié concentration et rapidité. Plus d’acide demande plus de soude : ${combV2} mL.`],
        ]),
      } },
    { cle: "question", beat: 1, scene: "dosage", set: DO({ jeu: "enigme", V: V_AP_G, ind: 1, phm: 0, ghost: 1 }),
      text: [{ t: `Une fraction de millilitre (${dvSaut} mL) fait basculer ce que ${combV1} mL n’avaient pas touché. Pourquoi ?`, fort: true }, "Et pourquoi ce volume dit-il combien d’acide il y avait dans le bécher ?"] },

    /* ===== 2. La réaction du dosage (4 étapes) ===== */
    { cle: "equation", beat: 2, scene: "dosage", set: DO({ jeu: "enigme", V: V_AV_G, ind: 1, phm: 0, ghost: -1, sub: "la réaction dans le bécher" }), sujet: "l’équation de la réaction de dosage",
      text: ["[[titrage|Doser]] une solution, c’est faire réagir toute l’espèce titrée avec une solution titrante de concentration connue.", "La réaction de dosage de l’acide éthanoïque par la soude (Na⁺ + HO⁻) s’écrit…"],
      verifie: {
        ...VF([
          ["CH₃COOH(aq) + HO⁻(aq) → CH₃COO⁻(aq) + H₂O(l)", true, "Oui : HO⁻ capte le proton de CH₃COOH, sans ions spectateurs et avec une seule flèche."],
          ["CH₃COOH(aq) + H₂O(l) ⇄ CH₃COO⁻(aq) + H₃O⁺(aq)", false, "C’est la réaction de l’acide avec l’eau. Ici, la soude apporte des ions HO⁻.", "Quelle base la soude apporte-t-elle dans le bécher ?"],
          ["CH₃COOH(aq) + Na⁺(aq) + HO⁻(aq) → CH₃COONa(aq) + H₂O(l)", false, "Tu as écrit l’ion spectateur Na⁺. Il ne réagit pas : on ne l’écrit pas dans l’équation.", "L’ion Na⁺ participe-t-il au transfert de proton ?"],
          ["CH₃COOH(aq) + HO⁻(aq) ⇄ CH₃COO⁻(aq) + H₂O(l)", false, "Tu as mis une double flèche. Le cadre demande une seule flèche pour un dosage : l’étape suivante dit pourquoi.", "Une réaction de dosage s’écrit-elle avec une seule flèche ou une double flèche ?"],
        ]),
      } },
    { cle: "fleche-K", beat: 2, scene: "dosage", set: DO({ jeu: "enigme", V: V_AV_G, ind: 1, phm: 0, ghost: -1, sub: `p*K*_{A} = ${pkaS} · *K*_{e} = 10^{−${PKE}}` }), sujet: "constante d’équilibre K du dosage",
      text: ["Calcule la constante d’équilibre K de cette réaction de dosage à partir de K_A et K_e."],
      deriv: [
        { tex: tx`K=\dfrac{[\mathrm{CH_3COO^-}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}\cdot[\mathrm{HO^-}]_{\text{éq}}}`, alt: "K = [CH₃COO⁻] / ([CH₃COOH][HO⁻])", r: "quotient de réaction à l’équilibre ; l’eau, solvant, n’y figure pas" },
        { tex: tx`K=\dfrac{[\mathrm{CH_3COO^-}]_{\text{éq}}\cdot[\mathrm{H_3O^+}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}\cdot[\mathrm{HO^-}]_{\text{éq}}\cdot[\mathrm{H_3O^+}]_{\text{éq}}}`, alt: "on multiplie en haut et en bas par [H₃O⁺]", r: "pour faire apparaître K_A et K_e" },
      ],
      pari: {
        label: `Avec pK_A = ${pkaS} et K_e = 10^(−${PKE}), K vaut…`,
        ...VF([
          [`K_A / K_e ≈ ${kDosS}`, true, `Oui : K_A / K_e = 10^(${PKE} − ${pkaS}) ≈ ${kDosS}.`],
          [`K_e / K_A ≈ ${kInvS}`, false, "Tu as inversé le rapport. K_A est au numérateur : c’est l’acide du couple qui réagit.", "L’expression [CH₃COO⁻][H₃O⁺]/[CH₃COOH] est-elle au numérateur ou au dénominateur ?"],
          [`K_A · K_e ≈ ${kProdS}`, false, "Tu as multiplié au lieu de diviser. [HO⁻][H₃O⁺] = K_e est au dénominateur.", "Où se trouve le produit [HO⁻][H₃O⁺] = K_e dans la fraction ?"],
        ]),
        apres: { html: "<p>K est immense : la réaction est pratiquement totale. C’est pourquoi on écrit une seule flèche.</p>" },
      } },
    { cle: "totale", beat: 2, scene: "table", set: TB({ mode: "totale", cases: 12, rv: 0 }), sujet: "taux d’avancement final d’un dosage",
      text: [`Vérifie le taux d’avancement final τ à V_B = ${totV} mL (pH = ${totPh}).`],
      deriv: [
        { tex: tx`x_\mathrm{max}=C_B\,V_B=${TS(TOT.xmax, 1)}\ \mathrm{mol}`, alt: `x_max = C_B V_B = ${totXm} mol`, r: "avant l’équivalence, HO⁻ versé est limitant" },
        { tex: tx`[\mathrm{HO^-}]_\mathrm{f}=10^{\mathrm{pH}-${PKE}}\quad ;\quad V_\mathrm{tot}=V_A+V_B`, alt: `[HO⁻]_f = 10^(pH − 14) ; V_tot = V_A + V_B`, r: "d’après le pH et K_e = [H₃O⁺][HO⁻]" },
        { tex: tx`n(\mathrm{HO^-})_\mathrm{f}=[\mathrm{HO^-}]_\mathrm{f}\,V_\mathrm{tot}\approx ${TS(TOT.nHO, 1)}\ \mathrm{mol}`, alt: `n(HO⁻)_f ≈ ${totHo} mol`, r: "quantité d’ions HO⁻ restante dans le bécher" },
      ],
      pari: {
        label: "Que vaut le taux d’avancement final τ ?",
        reveal: [{ p: { rv: 1 }, d: 600 }],
        ...VF([
          ["τ ≈ 1", true, `Oui : n(HO⁻) restant est ${totRap} fois plus petit que x_max, donc x_f ≈ x_max et τ ≈ 1.`],
          [`τ ≈ ${totFx}`, false, "Tu as appliqué 10^(−pH)/C_A, la formule de l’acide dans l’eau. Ici on suit le réactif limitant HO⁻.", "Quel réactif est limitant ici : CH₃COOH ou HO⁻ ?"],
          ["τ ≈ 0,5", false, "Tu as supposé le dosage limité comme la réaction avec l’eau. Ici n(HO⁻) restant est négligeable devant x_max.", "Compare n(HO⁻) restant à x_max."],
        ]),
        apres: { html: "<p><b>Totale : c’est ce qui permet au volume versé de compter l’acide.</b></p>" },
      } },
    { cle: "montage", beat: 2, scene: "dosage", set: DO({ jeu: "montage", lab: 0 }), sujet: "le montage expérimental du dosage",
      text: ["Regarde le dispositif expérimental d’un dosage pH-métrique.", "La solution titrante, de concentration connue, se place…"],
      verifie: {
        ...VF([
          ["dans la burette graduée", true, "Oui : la burette verse la solution titrante et mesure le volume versé V_B."],
          ["dans le bécher, avec la sonde", false, "Tu as inversé titrant et titré. Le bécher reçoit la prise d’essai de la solution à doser.", "Où lit-on le volume versé au cours du dosage ?"],
          ["dans la pipette jaugée", false, "La pipette jaugée sert à prélever V_A, la prise d’essai, avant le dosage.", "Quel instrument reste au-dessus du bécher pendant qu’on verse ?"],
        ]),
        reveal: [{ p: { lab: 5 }, d: 1400 }],
        apres: { html: "<p>Les cinq éléments : [[burette|burette graduée]], bécher avec la [[prise|prise d’essai]], agitateur magnétique, sonde et pH-mètre.</p>" },
      } },

    /* ===== 3. Dans le bécher (6 étapes) ===== */
    { cle: "avant-E", beat: 3, scene: "dosage", set: DO({ jeu: "jetons", V: 0, reac: 0 }), seq: [{ p: { V: TAB_AV.V }, d: 1600, w: 300 }], sujet: "HO⁻ avant l’équivalence",
      text: [`Un jeton représente ${sciH(JETON_MOL, 1)} mol : le bécher contient ${N_JETONS} jetons CH₃COOH au départ.`, `On verse ${tabV} mL de soude, soit ${tabJV} jetons HO⁻. Combien de jetons HO⁻ libres reste-t-il dans le bécher ?`],
      verifie: {
        ...VF([
          ["aucun : chacun a réagi avec un CH₃COOH", true, "Oui : la réaction est totale, chaque HO⁻ prend un proton à un CH₃COOH et forme un CH₃COO⁻."],
          ["quatre : la réaction attend l’équivalence", false, "La réaction n’attend pas l’équivalence : elle est totale dès la première goutte.", "La réaction de dosage a-t-elle lieu à chaque goutte ou seulement à l’équivalence ?"],
          ["deux : la moitié seulement a réagi", false, "Tu as appliqué un taux de 0,5. La réaction de dosage est totale : τ ≈ 1.", "Que vaut τ pour la réaction de dosage ?"],
        ]),
        reveal: [{ p: { reac: 1 }, d: 900 }],
        apres: { html: "<p>Avant l’équivalence, HO⁻ est le [[limitant|réactif limitant]].</p>" },
      } },
    { cle: "tableau-avant", beat: 3, scene: "table", set: TB({ mode: "avant", cases: 12, rv: 0, fx: 8 }), sujet: "quantité d’acide restante avant l’équivalence",
      text: [`Traduis ce qui se passe dans le bécher à V_B = ${tabV} mL dans le tableau d’avancement.`],
      deriv: [
        { tex: tx`n(\mathrm{CH_3COO^-})=C_B\,V_B=${TS(TAB_AV.nB, 1)}\ \mathrm{mol}`, alt: `n(CH₃COO⁻) = C_B V_B = ${tabNB} mol`, r: "chaque HO⁻ consommé forme un CH₃COO⁻" },
        { tex: tx`n(\mathrm{CH_3COOH})=C_A\,V_A-C_B\,V_B`, alt: "n(CH₃COOH) = C_A V_A − C_B V_B", r: "on retire à l’acide de départ ce qui a réagi" },
      ],
      pari: {
        label: `À V_B = ${tabV} mL, n(CH₃COOH) restant vaut…`,
        reveal: [{ p: { rv: 1 }, d: 600 }],
        ...VF([
          [`${tabNAH} mol`, true, `Oui : ${tabN0} − ${tabNB} = ${tabNAH} mol (${tabJR} jetons restants).`],
          [`${tabN0} mol`, false, `Tu as gardé la quantité de départ. ${tabJV} jetons ont déjà réagi avec la soude.`, "La quantité d’acide est-elle restée égale à sa valeur initiale ?"],
          [`${tabNB} mol`, false, "Tu as donné n(CH₃COO⁻), la quantité formée. L’acide restant est la différence.", "Calcule la différence entre la quantité initiale et la quantité consommée."],
        ]),
      } },
    { cle: "pari-E", beat: 3, scene: "dosage", set: DO({ jeu: "jetons", V: TAB_AV.V }), seq: [{ p: { V: V_LENT_2 }, d: 1200, w: 200 }],
      text: [`On continue jusqu’à V_B = ${veS} mL : on aura versé autant de HO⁻ qu’il y avait de CH₃COOH au départ.`, "À cet instant, le bécher contiendra…"],
      pari: {
        reveal: [{ p: { V: VE_L }, d: 1400 }],
        ...BET([
          ["CH₃COOH et HO⁻ à parts égales", "Tu as lu « autant versé » comme « tous deux présents ». Ils ont réagi ensemble : il n’en reste plus."],
          ["CH₃COO⁻ (et Na⁺), plus d’acide ni de HO⁻", `Oui : les ${N_JETONS} acides ont réagi avec les ${N_JETONS} HO⁻ ; il ne reste que ${N_JETONS} CH₃COO⁻.`, 1],
          ["CH₃COOH et CH₃COO⁻, moitié-moitié", `Moitié-moitié, c’est à la demi-équivalence (${demiV} mL). À ${veS} mL, tout l’acide est consommé.`],
        ]),
      } },
    { cle: "equivalence", beat: 3, scene: "dosage", set: DO({ jeu: "jetons", V: VE_L, eqc: 0 }), sujet: "ce qui est égal à l’équivalence",
      text: ["Cet état s’appelle l’équivalence : les réactifs ont été mélangés dans les proportions de l’équation, et le réactif limitant change.", "À l’équivalence, ce qui est égal, ce sont…"],
      verifie: {
        ...VF([
          ["les quantités n(AH)₀ et n(HO⁻) versée", true, "Oui : C_A·V_A = C_B·V_E exprime l’égalité des quantités de matière."],
          ["les volumes V_A et V_E", false, `Tu as égalé les volumes. Ici V_A = ${vaS} mL et V_E = ${veS} mL sont différents.`, "Les volumes V_A et V_E sont-ils égaux dans cette expérience ?"],
          ["les concentrations C_A et C_B", false, "Tu as égalé les concentrations. Seuls les produits C·V sont égaux.", "Si les quantités C·V sont égales et V_A ≠ V_E, les concentrations sont-elles égales ?"],
          ["les quantités d’ions H₃O⁺ et HO⁻ (pH = 7)", false, "La définition de l’équivalence ne parle pas du pH. La partie 4 mesure pH_E.", "La définition de l’équivalence mentionne-t-elle le pH ?"],
        ]),
        reveal: [{ p: { eqc: 1 }, d: 800 }],
        apres: {
          tex: [
            [tx`n(\mathrm{AH})_0=n(\mathrm{HO^-})_E`, "n(AH)₀ = n(HO⁻)_E"],
            [tx`C_A\,V_A=C_B\,V_E`, "C_A V_A = C_B V_E"],
          ],
          html: "<p>C’est la relation à l’[[equivalence|équivalence]].</p>",
        },
      } },
    { cle: "ca", beat: 3, scene: "dosage", set: DO({ jeu: "jetons", V: VE_L, eqc: 1, sub: `*V*_{A} = ${vaS} mL · *C*_{B} = ${cbS} mol·L^{−1} · *V*_{E} = ${veS} mL` }), sujet: "calculer C_A à partir de C_A V_A = C_B V_E",
      text: [`On connaît V_A = ${vaS} mL, C_B = ${cbS} mol·L⁻¹ et V_E = ${veS} mL.`, "Que vaut la concentration C_A de l’acide ?"],
      verifie: {
        ...VF([
          [`${caS} mol·L⁻¹`, true, `Oui : C_A = C_B·V_E / V_A = ${cbS} × ${veS} / ${vaS} = ${caS} mol·L⁻¹.`],
          [`${caInvS} mol·L⁻¹`, false, "Tu as inversé V_E et V_A. Isole C_A depuis C_A·V_A = C_B·V_E : C_A = C_B·V_E / V_A.", "Depuis C_A·V_A = C_B·V_E, par quel volume divise-t-on pour isoler C_A ?"],
          [`${caCbS} mol·L⁻¹`, false, "Tu as recopié C_B. Les concentrations ne sont égales que si V_A = V_E.", "Ici V_A et V_E sont-ils égaux ?"],
        ]),
        apres: { tex: [[tx`C_A=\dfrac{C_B\,V_E}{V_A}`, "C_A = C_B V_E / V_A"]], html: "<p>V_E et V_A ont la même unité : le rapport se calcule directement en mL.</p>" },
      } },
    { cle: "apres-E", beat: 3, scene: "dosage", set: DO({ jeu: "jetons", V: VE_L }), sujet: "ce qui se passe après l’équivalence",
      text: [`On verse encore ${dvAprS} mL de soude, de ${ve0S} à ${vAprS} mL.`, "Après l’équivalence, chaque goutte de soude…"],
      verifie: {
        ...VF([
          ["ajoute des HO⁻ qui restent libres", true, "Oui : il n’y a plus d’acide pour les consommer, les HO⁻ s’accumulent."],
          ["fait réagir les ions CH₃COO⁻ formés", false, "CH₃COO⁻ est une base, comme HO⁻ : deux bases ne s’échangent pas de proton.", "CH₃COO⁻ est-il un acide ou une base ?"],
          ["ne change plus rien dans le bécher", false, "Les HO⁻ versés ne disparaissent plus : ils s’accumulent dans le bécher.", `Où vont les jetons HO⁻ ajoutés après ${ve0S} mL ?`],
        ]),
        reveal: [{ p: { V: V_APRES }, d: 1400 }],
      } },

    /* ===== 4. La courbe (5 étapes) ===== */
    { cle: "pHE", beat: 4, scene: "dosage", set: DO({ jeu: "courbe", V: VE_L, jet: 1, phm: 0, cv: 0, pe: 0, p7: 0 }),
      text: ["On plonge la sonde du pH-mètre. À l’équivalence, le bécher ne contient plus que CH₃COO⁻ (et Na⁺), et l’afficheur est masqué.", "Pour ce dosage, pH_E est…"],
      pari: {
        reveal: [{ p: { phm: 1, pe: 1, p7: 1 }, d: 900 }],
        ...BET([
          ["égal à 7", `Le bécher ne contient plus que CH₃COO⁻, une base : le pH vaut ${phES}, supérieur à 7.`],
          ["supérieur à 7", `Oui : le bécher ne contient plus que la base CH₃COO⁻, donc pH_E = ${phES} > 7.`, 1],
          ["inférieur à 7", `Il n’y a plus d’acide dans le bécher, seulement la base CH₃COO⁻ : pH_E = ${phES} > 7.`],
        ]),
      } },
    { cle: "allure", beat: 4, scene: "dosage", set: DO({ jeu: "courbe", V: 0, jet: 1, phm: 1, cv: 0 }),
      text: [`Au départ (V_B = 0), le pH-mètre indique pH = ${ph0S}.`, `Prédis l’allure de la courbe pH = f(V_B) de 0 à ${vmaxS} mL.`],
      pari: {
        reveal: [{ p: { cv: 1, V: VMAX_L }, d: 2400 }],
        ...BET([
          [`une droite régulière, de ${ph0Ent} à ${ph20Ent}`, `Tu as pensé que le pH varie proportionnellement au volume. La courbe fait un saut brutal vers ${ve0S} mL.`],
          [`une montée lente, un saut vers ${ve0S} mL, puis un palier`, "Oui : montée lente, saut brusque à l’équivalence, puis palier basique.", 1],
          [`un pH fixe à ${ph0Ent} jusqu’à ${ve0S} mL, puis une droite`, `Le pH monte déjà doucement avant ${ve0S} mL, puis saute d’un coup et s’aplatit en palier.`],
        ]),
      } },
    { cle: "lent", beat: 4, scene: "dosage", set: DO({ jeu: "courbe", V: V_LENT_2, jet: 0, phm: 1, cv: 1, hl: 1 }), sujet: "la montée lente avant l’équivalence",
      text: [`De ${vL1} à ${vL2} mL, le pH passe seulement de ${ph4S} à ${ph8S}.`, "Pourquoi change-t-il si peu alors qu’on ajoute de la soude ?"],
      verifie: {
        ...VF([
          ["le bécher contient CH₃COOH et CH₃COO⁻ : le pH suit leur rapport", true, "Oui : tant que les deux formes coexistent, leur rapport varie peu, donc son logarithme aussi."],
          [`la soude est trop diluée pour réagir avant ${ve0S} mL`, false, "Chaque HO⁻ versé réagit bien avec un acide : c’est le pH qui évolue lentement.", `Les ions HO⁻ versés entre ${vL1} et ${vL2} mL réagissent-ils ?`],
          ["les ions HO⁻ versés restent libres mais sont trop peu nombreux", false, "Avant l’équivalence, les HO⁻ ne restent pas libres : ils sont consommés par l’acide.", "Avant l’équivalence, quel est le réactif limitant ?"],
        ]),
        apres: { tex: [[tx`\mathrm{pH}=\mathrm{p}K_A+\log\dfrac{[\mathrm{A^-}]}{[\mathrm{AH}]}`, "pH = pK_A + log([A⁻]/[AH])"]], html: `<p>Cette relation vient directement de K_A : quand le rapport double, le pH ne prend que ${dphDbl} unité.</p>` },
      } },
    { cle: "saut", beat: 4, scene: "dosage", set: DO({ jeu: "courbe", V: V_AV_G, jet: 0, phm: 1, cv: 1, zoom: 1 }), seq: [{ p: { V: V_AP_G }, d: 1400, w: 300 }], sujet: "l’origine du saut de pH",
      text: [`Zoom autour de ${veS} mL : un ajout de ${dvSaut} mL (${vAvG} à ${vApG} mL) fait passer le pH de ${phAvS} à ${phApS}.`, "Pourquoi ce changement soudain ?"],
      verifie: {
        ...VF([
          ["le dernier acide est consommé : les HO⁻ suivants restent libres", true, `Oui : [HO⁻] bondit de plusieurs puissances de 10, et le pH passe brutalement au-dessus de ${indPhMax}.`],
          ["l’indicateur change de couleur et fait monter le pH", false, "Tu as pris le signal pour la cause. L’indicateur réagit au saut de pH, il ne le provoque pas.", "Le saut de pH a-t-il lieu même sans indicateur coloré ?"],
          ["cet ajout est plus concentré que les précédents", false, "Toute la soude vient de la même burette : c’est le contenu du bécher qui a changé.", "La concentration de la soude dans la burette change-t-elle au cours du dosage ?"],
        ]),
        apres: { html: "<p>C’est le [[saut|saut de pH]] : le pH compte les ions HO⁻ libres en puissances de 10.</p>" },
      } },
    { cle: "base-faible", beat: 4, scene: "dosage", set: DO({ jeu: "base", rv: 0 }), sujet: "pH_E pour une base faible dosée par un acide fort",
      text: [`Sujet 2020 : on dose une base faible, l’ammoniac NH₃ (V_b = ${s20Vb} mL), par un acide fort (HCl à ${s20Ca} mol·L⁻¹).`, "À l’équivalence, le bécher contient l’ion NH₄⁺. Donc pH_E est…"],
      verifie: {
        ...VF([
          ["inférieur à 7", true, `Oui : NH₄⁺ est un acide, il rend la solution acide à l’équivalence (pH_E ≈ ${s20Phe}).`],
          ["supérieur à 7", false, "Tu as recopié le cas de l’acide éthanoïque. C’est l’espèce présente à l’équivalence qui décide.", "Quelle est la nature de l’ion NH₄⁺ présent à l’équivalence ?"],
          ["égal à 7", false, "L’équivalence n’est pas toujours à pH = 7. Ici NH₄⁺ est un acide.", "Une solution contenant un acide faible a-t-elle un pH égal à 7 ?"],
        ]),
        reveal: [{ p: { rv: 1 }, d: 1200 }],
      } },

    /* ===== 5. Repérer l'équivalence (6 étapes) ===== */
    { cle: "rappel", beat: 5, scene: "phv", ctl: "vol", set: PV({ jeu: "lecon", curve: 0, sub: "mi-parcours : réponds puis explore la courbe au curseur" }), sujet: "le bécher à l’équivalence",
      text: ["Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.", "Pour ce dosage de CH₃COOH par la soude, à V_B = V_E, le bécher contient… et son pH est…"],
      verifie: {
        ...VF([
          ["CH₃COO⁻ (et Na⁺) ; pH > 7", true, `Oui : tout l’acide et les HO⁻ ont réagi ; la base CH₃COO⁻ rend la solution basique (pH_E ≈ ${phES}).`],
          ["CH₃COOH et HO⁻ à parts égales ; pH = 7", false, "Les HO⁻ ont tous réagi avec l’acide, et la base restante rend la solution basique.", "Reste-t-il des ions HO⁻ et de l’acide à l’équivalence ?"],
          ["CH₃COOH et CH₃COO⁻ moitié-moitié ; pH = pK_A", false, "Moitié-moitié, c’est à la demi-équivalence (V_E/2), pas à l’équivalence.", "À quel volume reste-t-il exactement la moitié de l’acide ?"],
        ]),
        reveal: [{ p: { curve: 1 }, d: 700 }],
      } },
    { cle: "tangentes", beat: 5, scene: "phv", set: PV({ jeu: "lecon", curve: 1, tg: 0, med: 0, pe: 0, rv: 0 }), sujet: "repérer E par les tangentes parallèles",
      text: ["Pour repérer graphiquement le point d’équivalence E, on utilise la méthode des tangentes parallèles."],
      deriv: [
        { tex: tx`\text{1. Deux tangentes parallèles}`, alt: "deux tangentes parallèles aux coudes", r: "de part et d’autre du saut, elles encadrent le changement de courbure", p: { tg: 1 } },
        { tex: tx`\text{2. Leur médiane parallèle}`, alt: "la parallèle à égale distance (médiane)", r: "à égale distance : elle coupe la courbe exactement en E", p: { med: 1, pe: 1 } },
      ],
      pari: {
        label: "Quelles sont les coordonnées du point E ?",
        reveal: [{ p: { tg: 1, med: 1, pe: 1, rv: 1 }, d: 600 }],
        ...VF([
          [`(${veS} mL ; ${phES})`, true, `Oui : la médiane coupe la courbe à V_E = ${veS} mL et pH_E = ${phES}.`],
          [`(${veS} mL ; 7,0)`, false, "Tu as fixé pH_E à 7. pH_E se lit sur la courbe, à l’intersection avec la médiane.", "La médiane coupe-t-elle la courbe à pH = 7 ?"],
          [`(${demiV} mL ; ${pkaS})`, false, "Tu as lu la demi-équivalence. Le point E est au milieu du saut.", "Où se situe le saut de pH sur l’axe horizontal ?"],
        ]),
      } },
    { cle: "derivee", beat: 5, scene: "phv", set: PV({ jeu: "lecon", curve: 1, der: 1, pe: 0, rv: 0 }), sujet: "repérer V_E avec la courbe dérivée",
      text: ["Au bac (sujets 2022 et 2024), on trace souvent la dérivée dpH/dV_B en même temps que pH = f(V_B).", "Cette courbe présente un pic étroit. On lit V_E…"],
      verifie: {
        ...VF([
          ["à l’abscisse du sommet du pic", true, `Oui : la pente de pH = f(V_B) est maximale en E, donc V_E = ${veS} mL est l’abscisse du pic.`],
          ["là où la dérivée revient à zéro", false, "La dérivée est nulle sur les paliers, loin de l’équivalence. Au saut, elle est maximale.", "Sur le saut vertical, la pente de la courbe est-elle nulle ou maximale ?"],
          ["sur l’axe vertical, à la hauteur du pic", false, "Tu as lu une ordonnée. V_E est un volume : on le lit sur l’axe horizontal (en 2022, la dérivée n’a même pas d’échelle verticale).", "Sur quel axe se lisent les volumes V_B ?"],
        ]),
        reveal: [{ p: { pe: 1, rv: 1 }, d: 700 }],
      } },
    { cle: "demi", beat: 5, scene: "phv", set: PV({ jeu: "lecon", curve: 1, demi: 1, rv: 0 }), sujet: "pH à la demi-équivalence",
      text: [`Regarde le point d’abscisse V_E/2 = ${demiV} mL.`],
      deriv: [
        { tex: tx`n(\mathrm{CH_3COOH})=n(\mathrm{CH_3COO^-})`, alt: "n(CH₃COOH) = n(CH₃COO⁻)", r: `à V_B = V_E/2, la moitié des ${N_JETONS} jetons d’acide a réagi` },
        { tex: tx`K_A=\dfrac{[\mathrm{CH_3COO^-}]\cdot[\mathrm{H_3O^+}]}{[\mathrm{CH_3COOH}]}`, alt: "K_A = [CH₃COO⁻][H₃O⁺]/[CH₃COOH]", r: "définition de la constante d’acidité" },
      ],
      pari: {
        label: "Donc, à V_B = V_E/2, le pH vaut…",
        reveal: [{ p: { rv: 1 }, d: 600 }],
        ...VF([
          [`pK_A = ${pkaS}`, true, `Oui : les concentrations se simplifient, [H₃O⁺] = K_A, donc pH = pK_A = ${pkaS}.`],
          [`pH_E / 2 ≈ ${demiFx}`, false, "Tu as divisé pH_E par 2. Le pH n’est pas proportionnel au volume versé.", "Si [CH₃COO⁻] = [CH₃COOH] dans K_A, que vaut [H₃O⁺] ?"],
          ["7,0", false, "Tu as placé l’égalité des deux formes à pH = 7. Elle a lieu au pK_A du couple.", "À quel pH les deux formes d’un couple sont-elles à égalité ?"],
        ]),
        apres: { html: "<p>C’est la [[demi|demi-équivalence]] : elle permet de lire le pK_A directement sur la courbe.</p>" },
      } },
    { cle: "rapport", beat: 5, scene: "phv", set: PV({ jeu: "lecon", curve: 1, sub: "pour 0 < *V*_{B} < *V*_{E} (forme du sujet 2024)" }), sujet: "le rapport [AH]/[A⁻] avant l’équivalence",
      text: ["Pour tout volume V_B entre 0 et V_E, exprime le rapport [AH]/[A⁻] en fonction de V_E et V_B."],
      deriv: [
        { tex: tx`n(\mathrm{A^-})=C_B\,V_B`, alt: "n(A⁻) = C_B V_B", r: "un A⁻ formé par HO⁻ consommé" },
        { tex: tx`n(\mathrm{AH})=C_A\,V_A-C_B\,V_B=C_B(V_E-V_B)`, alt: "n(AH) = C_A V_A − C_B V_B = C_B(V_E − V_B)", r: "on remplace C_A V_A par C_B V_E" },
      ],
      pari: {
        label: "En divisant les deux lignes, [AH] / [A⁻] vaut…",
        ...VF([
          ["V_E / V_B − 1", true, "Oui : C_B(V_E − V_B) / (C_B V_B) = (V_E − V_B) / V_B = V_E / V_B − 1."],
          ["V_B / V_E", false, "Tu as renversé le rapport et perdu la soustraction. Divise n(AH) par n(A⁻).", "Lequel est au numérateur : n(AH) ou n(A⁻) ?"],
          ["V_E / V_B", false, "Tu as oublié le « − 1 » qui vient de − V_B / V_B dans (V_E − V_B) / V_B.", "Développe la fraction (V_E − V_B) / V_B."],
        ]),
        apres: { tex: [[tx`\dfrac{[\mathrm{AH}]}{[\mathrm{A^-}]}=\dfrac{V_E}{V_B}-1`, "[AH]/[A⁻] = V_E/V_B − 1"]] },
      } },
    { cle: "pourcent", beat: 5, scene: "phv", set: PV({ jeu: "lecon", curve: 1, ptV: POURCENT.V }), sujet: "pourcentage de la forme acide avant E",
      text: [`Application (forme du sujet 2022) : à V_B = ${pcV} mL (avec V_E = ${veS} mL), le rapport [AH]/[A⁻] vaut ${pcRap}.`, "Quel pourcentage de la forme acide reste-t-il dans le mélange ?"],
      verifie: {
        ...VF([
          [`${pcA} %`, true, `Oui : trois quarts d’acide restant, soit ${pcA} % (${pcRap} parts sur ${pcTot}).`],
          [`${pcB} %`, false, `Tu as donné la part de la forme basique A⁻. À ${pcV} mL, seul un quart a réagi : il reste ${pcA} % d’acide.`, `À V_B = ${pcV} mL (le quart de ${veS} mL), a-t-on consommé 1/4 ou 3/4 de l’acide ?`],
          ["50 %", false, `50 %, c’est à la demi-équivalence (${demiV} mL). Ici V_B = ${pcV} mL est deux fois plus petit.`, "À quel volume reste-t-il 50 % d’acide ?"],
        ]),
      } },

    /* ===== 6. L'indicateur coloré (4 étapes) ===== */
    { cle: "indicateur", beat: 6, scene: "phv", set: PV({ jeu: "axe", axeMode: "ind", rv: 0 }), sujet: "teinte d’un indicateur coloré selon le pH",
      text: ["Un [[indicateur|indicateur coloré]] est un couple acide/base HIn/In⁻ dont les deux formes n’ont pas la même couleur.", `La phénolphtaléine a pour [[virage|zone de virage]] ${indPh} (sujet 2020) : incolore pour HIn, rose pour In⁻. À pH = ${phExInd}, elle est…`],
      verifie: {
        ...VF([
          ["incolore", true, `Oui : pH = ${phExInd} est sous la zone ${indPh}, la forme acide HIn prédomine.`],
          ["rose", false, "Tu as inversé l’échelle de pH. Sous la zone de virage, c’est la forme acide HIn qui prédomine.", `pH = ${phExInd} est-il en dessous ou au-dessus de ${indPhMin} ?`],
          ["de teinte intermédiaire", false, `La teinte intermédiaire n’apparaît qu’à l’intérieur de la zone de virage (${indPhMin} à ${indPhMax}).`, `pH = ${phExInd} appartient-il à l’intervalle ${indPh} ?`],
        ]),
        reveal: [{ p: { rv: 1 }, d: 600 }],
      } },
    { cle: "bande", beat: 6, scene: "phv", set: PV({ jeu: "lecon", curve: 1, bandeMin: IND.helianthine20.min, bandeMax: IND.helianthine20.max, bandePos: 0, bandeShow: 1, bandeLab: `hélianthine (${indHel})` }),
      text: [`On met par erreur de l’hélianthine (zone ${indHel}) dans ce dosage d’acide éthanoïque.`, "Elle virera vers…"],
      pari: {
        reveal: [{ p: { bandePos: 1 }, d: 1400 }],
        ...BET([
          [`${combV1} mL, à l’équivalence`, `Tout indicateur ne vire pas à l’équivalence : l’hélianthine vire entre ${virHel}, bien avant ${veS} mL.`],
          ["les premiers millilitres", `Oui : la courbe traverse ${indHel} dès ${virHel}, bien avant l’équivalence.`, 1],
          ["jamais : sa zone est trop basse", `La courbe démarre à pH = ${ph0S} : elle traverse ${indHel} entre ${virHel}.`],
        ]),
      } },
    { cle: "choix", beat: 6, scene: "phv", set: PV({ jeu: "lecon", curve: 1, pe: 1, rv: 1, bandeMin: IND.phenolphtaleine.min, bandeMax: IND.phenolphtaleine.max, bandePos: 0, bandeShow: 0, bandeLab: `phénolphtaléine (${indPh})` }), sujet: "choisir l’indicateur coloré adéquat",
      text: [`Pour ce dosage (pH_E = ${phES}), on dispose de trois indicateurs : hélianthine (${indHel}), rouge de méthyle (${indRm}) et phénolphtaléine (${indPh}).`, "Lequel convient pour repérer l’équivalence ?"],
      verifie: {
        ...VF([
          ["la phénolphtaléine", true, `Oui : sa zone (${indPh}) contient pH_E = ${phES}, elle vire pendant le saut.`],
          ["le rouge de méthyle", false, `Sa zone (${indRm}) ne contient pas ${phES} : il vire de ${virRm}, trop tôt.`, `pH_E = ${phES} appartient-il à l’intervalle ${indRm} ?`],
          ["l’hélianthine", false, `Sa zone (${indHel}) est loin sous ${phES} : elle vire dès les premiers millilitres.`, `pH_E = ${phES} appartient-il à l’intervalle ${indHel} ?`],
        ]),
        reveal: [{ p: { bandeShow: 1, bandePos: 1 }, d: 1000 }],
        apres: { html: "<p><b>Critère : la zone de virage doit contenir pH_E.</b></p>" },
      } },
    { cle: "bbt", beat: 6, scene: "phv", set: PV({ jeu: "lecon", curve: 1, pe: 1, rv: 1, p7: 1, bandeMin: IND.bbt.min, bandeMax: IND.bbt.max, bandePos: 0, bandeShow: 0, bandeLab: `B.B.T (${indBbt})` }), sujet: "le B.B.T ne convient pas quand pH_E > 7,6",
      text: [`Le bleu de bromothymol, B.B.T (zone ${indBbt}, sujet 2018), vire autour de 7.`, `Dans ce dosage (pH_E = ${phES}), le B.B.T change de couleur…`],
      verifie: {
        ...VF([
          ["avant l’équivalence : il ne convient pas", true, `Oui : pH_E = ${phES} est au-dessus de ${fr(IND.bbt.max, 1)}, le B.B.T vire trop tôt.`],
          ["à l’équivalence : il convient car sa zone entoure 7", false, `Tu as supposé pH_E = 7. Ici pH_E = ${phES}, en dehors de ${indBbt}.`, `Combien vaut pH_E ici : 7 ou ${phES} ?`],
          ["après l’équivalence : il vire trop tard", false, `La zone ${indBbt} est sous ${phES} : la courbe la traverse avant l’équivalence.`, `La zone ${indBbt} est-elle en dessous ou au-dessus de ${phES} ?`],
        ]),
        reveal: [{ p: { bandeShow: 1, bandePos: 1 }, d: 900 }],
      } },

    /* ===== 7. Exploiter le résultat (4 étapes) ===== */
    { cle: "dilution", beat: 7, scene: "dosage", set: DO({ jeu: "chaine", cas: "s25", ch: "fiole" }), sujet: "remonter à C_0 après une dilution",
      text: [`Sujet 2025, question 1-3 (${s25B13} pt) : une solution commerciale (S_0) a été diluée ${s25Dil} fois pour donner (S_A), de concentration C_A = ${s25Ca} mol·L⁻¹.`, "Que vaut la concentration C_0 de (S_0) ?"],
      verifie: {
        ...VF([
          [`${s25C0} mol·L⁻¹`, true, `Oui : diluer divise la concentration par ${s25Dil}, donc C_0 = ${s25Dil} × C_A = ${s25C0} mol·L⁻¹.`],
          [`${s25FxD} mol·L⁻¹`, false, `Tu as divisé au lieu de multiplier. La solution mère (S_0) est ${s25Dil} fois plus concentrée que (S_A).`, "La solution mère (S_0) est-elle plus ou moins concentrée que la solution diluée (S_A) ?"],
          [`${s25Ca} mol·L⁻¹`, false, "Tu as gardé la concentration diluée C_A. Remonte le facteur de dilution.", "Par combien a-t-on dilué (S_0) pour obtenir (S_A) ?"],
        ]),
      } },
    { cle: "masse", beat: 7, scene: "dosage", set: DO({ jeu: "chaine", cas: "s22", ch: "flacon" }), sujet: "masse dissoute dans un litre de S_0",
      text: [`Sujet 2022, question 2.4 (${s22B24} pt) : S_a (C_a = ${s22Ca} mol·L⁻¹) vient de S_0 diluée ${s22Dil} fois ; M = ${s22M} g·mol⁻¹.`, "Quelle masse m d’acide pur est dissoute dans 1 L de S_0 ?"],
      verifie: {
        ...VF([
          [`${s22m} g`, true, `Oui : C_0 = ${s22Dil}·C_a = ${fr(S22.C0, 1)} mol·L⁻¹, puis m = C_0·V·M = ${s22m} g pour 1 L.`],
          [`${s22FxD} g`, false, `Tu as oublié le facteur de dilution × ${s22Dil}. Calcule d’abord C_0 = ${s22Dil}·C_a.`, "As-tu utilisé C_a ou C_0 de la solution mère ?"],
          [`${s22FxP} g`, false, `Tu as multiplié par la prise d’essai (${s22Va} mL). On demande la masse dans 1 L de S_0.`, `Quel volume de S_0 demande l’énoncé : ${s22Va} mL ou 1 L ?`],
        ]),
      } },
    { cle: "etiquette", beat: 7, scene: "dosage", set: DO({ jeu: "chaine", cas: "s25", ch: "flacon" }), sujet: "vérifier une indication d’étiquette",
      text: [`Sujet 2025, question 1-4 (${s25B14} pt) : l’étiquette de (S_0) annonce ${s25Etiq} g·L⁻¹, avec M = ${s25M} g·mol⁻¹ et C_0 = ${s25C0} mol·L⁻¹.`, "Calcule la concentration massique C_0·M et conclus sur l’étiquette :"],
      verifie: {
        ...VF([
          [`C_0·M ≈ ${s25Cm} g·L⁻¹, proche de ${s25Etiq} g·L⁻¹ : étiquette vérifiée`, true, `Oui : C_0·M = ${s25C0} × ${s25M} ≈ ${s25Cm} g·L⁻¹, très proche des ${s25Etiq} g·L⁻¹ annoncés.`],
          [`C_0·M ≈ ${s25Cm} g·L⁻¹, différent de ${s25Etiq} g·L⁻¹ : étiquette non vérifiée`, false, `Tu as exigé une égalité stricte. En mesure expérimentale, ${s25Cm} g·L⁻¹ confirme l’indication ${s25Etiq} g·L⁻¹.`, `En chimie expérimentale, ${s25Cm} g·L⁻¹ est-il compatible avec ${s25Etiq} g·L⁻¹ ?`],
          [`C_0 / M ≈ ${s25DivM} g·L⁻¹, loin de ${s25Etiq} g·L⁻¹ : étiquette non vérifiée`, false, "Tu as divisé par M au lieu de multiplier. La concentration massique vaut C_0·M en g·L⁻¹.", "Quelle relation relie concentration molaire (mol·L⁻¹) et concentration massique (g·L⁻¹) ?"],
        ]),
      } },
    { cle: "ceq", beat: 7, scene: "table", set: TB({ mode: "ceq", cases: 12, rv: 0, fx: 10 }), sujet: "concentration d’un produit à l’équivalence",
      text: [`Sujet 2025, question 1-6 (${s25B16} pt) : V_A = ${s25Va} mL, V_BE = ${s25Ve} mL. On cherche la concentration C_eq des ions SO₃²⁻ à l’équivalence.`],
      deriv: [
        { tex: tx`x_\mathrm{max}=C_A\,V_A=${TS(S25.xmax, 1)}\ \mathrm{mol}`, alt: `x_max = C_A V_A = ${s25Xm} mol`, r: "à l’équivalence, les deux réactifs sont limitants" },
        { tex: tx`n(\mathrm{SO_3^{2-}})_E=x_\mathrm{max}`, alt: "n(SO₃²⁻)_E = x_max", r: "lecture de la ligne finale du tableau" },
      ],
      pari: {
        label: "Que vaut la concentration C_eq des ions SO₃²⁻ à l’équivalence ?",
        reveal: [{ p: { rv: 1 }, d: 600 }],
        ...VF([
          [`${s25Ceq} mol·L⁻¹`, true, `Oui : C_eq = x_max / (V_A + V_BE) = ${s25Xm} / (${fr(S25.VA + S25.VBE, 1)} × 10⁻³) ≈ ${s25Ceq} mol·L⁻¹.`],
          [`${s25FxVa} mol·L⁻¹`, false, "Tu as divisé par V_A seul. La soude versée a augmenté le volume du mélange : V_A + V_BE.", "Quel est le volume total du mélange dans le bécher à l’équivalence ?"],
          [`${s25FxVb} mol·L⁻¹`, false, "Tu as divisé par V_BE seul. Les ions SO₃²⁻ sont dans tout le volume V_A + V_BE.", "Dans quel volume total se trouvent les ions SO₃²⁻ ?"],
        ]),
      } },

    /* ===== 8. Retour à l'énigme (2 étapes) ===== */
    { cle: "retour-goutte", beat: 8, scene: "dosage", set: DO({ jeu: "enigme", V: V_AV_G, ind: 1, phm: 1, ghost: -1 }), seq: [{ p: { V: V_AP_G }, d: 1800, w: 300 }],
      text: () => [
        rappelGoutte(),
        `À ${veS} mL, le dernier acide est consommé. L’ajout suivant (${dvSaut} mL) laisse ses HO⁻ libres : le pH saute de ${phAvS} à ${phApS} et traverse d’un coup la zone ${indPh}.`,
        { t: "La couleur bascule parce que le pH saute.", fort: true },
      ] },
    { cle: "retour-volume", beat: 8, scene: "dosage", set: DO({ jeu: "enigme", V: V_AP_G, ind: 1, phm: 0, ghost: 1, sub: `*V*_{A} = ${vaS} mL · *C*_{B} = ${cbS} mol·L^{−1}` }), sujet: "le volume d’équivalence compte la quantité d’acide",
      text: () => [
        rappelCombien(),
        `Une autre solution d’acide éthanoïque (même V_A = ${vaS} mL) demande ${retV} mL de soude (${cbS} mol·L⁻¹). Sa concentration C_A vaut…`,
      ],
      verifie: {
        ...VF([
          [`${retCa} mol·L⁻¹`, true, `Oui : C_A = C_B·V_E / V_A = ${cbS} × ${retV} / ${vaS} = ${retCa} mol·L⁻¹.`],
          [`${caS} mol·L⁻¹`, false, "Tu as gardé l’ancienne concentration. Même acide ne veut pas dire même concentration : le volume V_E a changé.", "Si V_E change à V_A et C_B fixés, C_A reste-t-elle la même ?"],
          [`${retInv} mol·L⁻¹`, false, "Tu as inversé V_E et V_A. Isole C_A : C_A = C_B·V_E / V_A.", "Dans C_A·V_A = C_B·V_E, par quel volume divise-t-on ?"],
        ]),
      } },

    /* ===== 9. Au bac (8 étapes : 2018 commenté, puis 2024 à l'élève) ===== */
    { cle: "bac", beat: 9, scene: "phv", set: PV({ jeu: "s18", curve: 1, tg: 0, med: 0, pe: 0, rv: 0 }), sujet: "premier geste pour repérer E (sujet 2018)",
      text: [`Bac PC 2018, session normale (NS28F), exercice I, partie II (${s18BTot} pt) : acide lactique AH (V_A = ${s18Va} mL, K_A = 10^(−${s18Pka})) dosé par la soude (C_B = ${s18Cb} mol·L⁻¹).`, `Question 2 (${s18B[1]} pt) : déterminer V_BE et pH_E. Quel est ton premier geste ?`],
      verifie: {
        ...VF([
          ["Tracer deux tangentes parallèles et leur médiane", true, "Oui : la médiane coupe la courbe au point d’équivalence E."],
          ["Chercher sur la courbe le point où pH = 7", false, "Pour un acide faible dosé par la soude, pH_E > 7 : ce n’est pas le point où pH = 7.", "Pour un acide faible dosé par la soude, pH_E vaut-il 7 ?"],
          ["Calculer V_BE = C_A·V_A / C_B", false, "C_A est justement l’inconnue demandée à la question 3 : on commence par lire V_BE sur la courbe.", "Connaît-on C_A avant la question 3 ?"],
        ]),
        reveal: [{ p: { tg: 1, med: 1, pe: 1, rv: 1 }, d: 1400 }],
      } },
    { cle: "bac-lecture", beat: 9, scene: "phv", set: PV({ jeu: "s18", curve: 1, tg: 1, med: 1, pe: 1, rv: 1 }),
      text: [`Voici les deux premières questions rédigées (${s18B[0]} + ${s18B[1]} pt, barème du sujet).`],
      deriv: [
        { tex: tx`\mathrm{AH_{(aq)}}+\mathrm{HO^-_{(aq)}}\longrightarrow\mathrm{A^-_{(aq)}}+\mathrm{H_2O_{(l)}}`, alt: "AH(aq) + HO⁻(aq) → A⁻(aq) + H₂O(l)", r: "Q1 : une seule flèche, sans l’ion spectateur Na⁺" },
        { tex: tx`V_{BE}=${TN(S18.VE, 1)}\ \mathrm{mL}\qquad \mathrm{pH}_E=${TN(S18.pHE, 1)}`, alt: `V_BE = ${s18Ve} mL ; pH_E = ${s18Phe}`, r: "Q2 : intersection de la médiane et de la courbe" },
      ] },
    { cle: "bac-ca", beat: 9, scene: "phv", set: PV({ jeu: "s18", curve: 1, tg: 1, med: 1, pe: 1, rv: 1 }), sujet: "calcul de C_A (sujet 2018)",
      text: [`Question 3 (${s18B[2]} pt) : avec V_A = ${s18Va} mL, C_B = ${s18Cb} mol·L⁻¹ et V_BE = ${s18Ve} mL, C_A vaut…`],
      verifie: {
        ...VF([
          [`${s18Ca} mol·L⁻¹`, true, `Oui : C_A = C_B·V_BE / V_A = ${s18Cb} × ${s18Ve} / ${s18Va} = ${s18Ca} mol·L⁻¹.`],
          [`${s18Inv} mol·L⁻¹`, false, "Tu as inversé V_BE et V_A. Écris d’abord C_A = C_B·V_BE / V_A.", "Depuis C_A·V_A = C_B·V_BE, par quel volume divise-t-on ?"],
          [`${s18Cb} mol·L⁻¹`, false, "Tu as recopié C_B. Ici V_BE ≠ V_A.", "V_BE et V_A sont-ils égaux ici ?"],
        ]),
      } },
    { cle: "bac-ind", beat: 9, scene: "phv", set: PV({ jeu: "s18", curve: 1, tg: 1, med: 1, pe: 1, rv: 1, bandeMin: IND.rougeCresol.min, bandeMax: IND.rougeCresol.max, bandePos: 0, bandeShow: 0, bandeLab: `rouge de crésol (${indRc})` }), sujet: "indicateur coloré (sujet 2018)",
      text: [`Question 4 (${s18B[3]} pt) : choisis l’indicateur adéquat parmi hélianthine (${indH18}), B.B.T (${indBbt}) et rouge de crésol (${indRc}).`],
      verifie: {
        ...VF([
          ["rouge de crésol", true, `Oui : sa zone (${indRc}) est la seule qui contient pH_E = ${s18Phe}.`],
          ["B.B.T", false, `Tu as visé pH = 7. Ici pH_E = ${s18Phe} est en dehors de ${indBbt}.`, `pH_E = ${s18Phe} appartient-il à ${indBbt} ?`],
          ["hélianthine", false, `Sa zone (${indH18}) est bien en dessous de pH_E = ${s18Phe}.`, `pH_E = ${s18Phe} appartient-il à ${indH18} ?`],
        ]),
        reveal: [{ p: { bandeShow: 1, bandePos: 1 }, d: 900 }],
      } },
    { cle: "bac-rapport", beat: 9, scene: "phv", set: PV({ jeu: "s18", curve: 1, tg: 1, med: 1, pe: 1, rv: 1 }), sujet: "rapport [A⁻]/[AH] à V_B = V_BE (sujet 2018)",
      text: [`Question 5 (${s18B[4]} pt) : à V_B = ${s18Ve} mL (avec pK_A = ${s18Pka}), trouve [A⁻]/[AH] et l’espèce prédominante.`],
      verifie: {
        ...VF([
          [`${s18Rap} ; A⁻ prédomine`, true, `Oui : à V_B = V_BE, pH = pH_E = ${s18Phe}, donc [A⁻]/[AH] = 10^(pH_E − pK_A) = 10^${s18Diff} ≈ ${s18Rap}.`],
          ["1 ; aucune ne prédomine", false, `Le rapport vaut 1 à la demi-équivalence (${s18Ve2} mL), pas à ${s18Ve} mL.`, `V_B = ${s18Ve} mL est-il la demi-équivalence ou l’équivalence ?`],
          [`${s18RapInv} ; AH prédomine`, false, "Tu as calculé 10^(pK_A − pH), le rapport inverse [AH]/[A⁻].", "Comme pH_E > pK_A, quelle espèce prédomine : A⁻ ou AH ?"],
        ]),
        apres: {
          html: `<div class="ds-copie"><p><b>Piège évité.</b> Ici V_B = V_BE : la formule V_E/V_B − 1 donne 0 et ne sert plus ; on passe par K_A et pH_E lu.</p><p><b>Q1.</b> AH(aq) + HO⁻(aq) → A⁻(aq) + H₂O(l)</p><p><b>Q2.</b> Tangentes parallèles et médiane : V_BE = ${s18Ve} mL, pH_E = ${s18Phe}.</p><p><b>Q3.</b> C_A = C_B·V_BE / V_A = ${s18Ca} mol·L⁻¹.</p><p><b>Q4.</b> Rouge de crésol : sa zone (${indRc}) contient pH_E = ${s18Phe}.</p><p><b>Q5.</b> [A⁻]/[AH] = 10^(pH_E − pK_A) ≈ ${s18Rap} ≫ 1 : A⁻ prédomine.</p></div><p class="small">Barème imprimé du sujet 2018 : ${s18B.join(" + ")} = ${s18BTot} pt. Consigne : donner l’expression littérale avant le calcul numérique.</p>`,
        },
      } },
    { cle: "bac-2a", beat: 9, scene: "phv", set: PV({ jeu: "s24", curve: 1, der: 1, pe: 0, rv: 0 }), sujet: "lire V_BE avec la dérivée (sujet 2024)",
      text: [`À toi. Bac PC 2024, session normale, exercice 1, partie 2 : un comprimé de vitamine C (${s24Ann} g annoncés) dissous dans V_SA = ${s24Vsa} mL ; prise d’essai V_A = ${s24Va} mL, soude C_B = ${s24Cb} mol·L⁻¹.`, `Question 2 (${s24B[0]} pt) : V_BE vaut…`],
      verifie: {
        ...VF([
          [`${s24Ve} mL`, true, `Oui : V_BE se lit à l’abscisse du sommet du pic de (C₂), soit ${s24Ve} mL.`],
          [`${s24FxDer} mL`, false, "Tu as lu là où la dérivée retombe vers zéro. Le point E est sous le sommet du pic.", "V_BE se lit-il au sommet du pic ou quand la dérivée retombe ?"],
          [`${s24Ve2} mL`, false, "Tu as lu la demi-équivalence. Le pic de la dérivée est à l’équivalence.", "À quelle abscisse culmine le pic de (C₂) ?"],
        ]),
        reveal: [{ p: { pe: 1, rv: 1 }, d: 700 }],
      } },
    { cle: "bac-2b", beat: 9, scene: "phv", set: PV({ jeu: "s24", curve: 1, der: 1, pe: 1, rv: 1 }), sujet: "calculer C_A (sujet 2024)",
      text: [`Question 3 (${s24B[1]} pt) : avec V_A = ${s24Va} mL, C_B = ${s24Cb} mol·L⁻¹ et V_BE = ${s24Ve} mL, C_A vaut…`],
      verifie: {
        ...VF([
          [`${s24Ca} mol·L⁻¹`, true, `Oui : C_A = C_B·V_BE / V_A = ${s24Cb} × ${s24Ve} / ${s24Va} = ${s24Ca} mol·L⁻¹.`],
          [`${s24Inv} mol·L⁻¹`, false, "Tu as inversé V_BE et V_A. Isole C_A : C_A = C_B·V_BE / V_A.", "Par quel volume divise-t-on C_B·V_BE ?"],
          [`${s24Cb} mol·L⁻¹`, false, "Tu as recopié C_B. Les concentrations diffèrent car V_A ≠ V_BE.", "V_A et V_BE sont-ils égaux ?"],
        ]),
      } },
    { cle: "bac-2c", beat: 9, scene: "dosage", set: DO({ jeu: "chaine", cas: "s24", ch: "fiole" }), sujet: "masse dans la solution mère (sujet 2024)",
      text: [`Question 4 (${s24B[2]} pt) : avec M = ${s24M} g·mol⁻¹ et V_SA = ${s24Vsa} mL, quelle est la masse restante de vitamine C dans le comprimé ?`],
      verifie: {
        ...VF([
          [`${s24m} g`, true, `Oui : m = C_A·V_SA·M = ${s24Ca} × ${s24VsaL} × ${s24M} ≈ ${s24m} g.`],
          [`${s24FxP} g`, false, `Tu as utilisé la prise d’essai V_A = ${s24Va} mL. Le comprimé entier est dans V_SA = ${s24Vsa} mL.`, "Dans quel volume le comprimé entier a-t-il été dissous ?"],
          [`${s24Ann} g`, false, "Tu as recopié la masse annoncée. Le comprimé a réagi avec l’air : on calcule la masse restante.", "Pourquoi le sujet fait-il un dosage plutôt que lire l’étiquette ?"],
        ]),
      } },

    /* ===== 10. Bilan (4 étapes) ===== */
    { cle: "q1", beat: 10, scene: "phv", set: PV({ jeu: "s22", curve: 1, der: 1, rv: 0 }), sujet: "lire V_bE au sommet du pic, pas au bout d’une flèche",
      text: [`Sujet 2022, figure 2 : une copie lit V_bE = ${s22Fl} mL au bout de la flèche « dpH/dV_b », et trouve C_a ≈ ${s22Cp} mol·L⁻¹.`, "Quelle est son erreur ?"],
      verifie: {
        ...VF([
          ["la flèche désigne la courbe ; V_bE est au sommet du pic", true, `Oui : la flèche nomme la courbe sur sa queue descendante ; le sommet est sur ${s22Ve} mL.`],
          ["aucune : V_bE se lit là où la dérivée redevient nulle", false, "La dérivée est nulle loin de l’équivalence. V_bE est à l’abscisse du maximum.", "Où se lit V_bE sur la courbe dérivée ?"],
          ["il fallait lire V_bE là où la courbe coupe pH = 7", false, "Pour un acide faible dosé par la soude, pH_E > 7 : on ne lit pas V_bE à pH = 7.", "L’équivalence d’un acide faible est-elle à pH = 7 ?"],
        ]),
        reveal: [{ p: { rv: 1 }, d: 900 }],
      } },
    { cle: "q2", beat: 10, scene: "quiz", set: { qi: 0, rv: 0 }, sujet: "indicateur pour une base faible (sujet 2020)",
      text: [`Sujet 2020 : NH₃ dosé par HCl (pH_E ≈ ${s20Phe}).`, `Parmi hélianthine (${indHel}), rouge de méthyle (${indRm}) et phénolphtaléine (${indPh}), lequel convient ?`],
      verifie: {
        ...VF([
          ["rouge de méthyle", true, `Oui : sa zone (${indRm}) est la seule qui contient pH_E ≈ ${s20Phe}.`],
          ["phénolphtaléine", false, `Tu as repris l’indicateur d’un acide faible. Ici pH_E ≈ ${s20Phe} < 7.`, `pH_E ≈ ${s20Phe} appartient-il à ${indPh} ?`],
          ["hélianthine", false, `Sa zone (${indHel}) est trop basse pour contenir pH_E ≈ ${s20Phe}.`, `pH_E ≈ ${s20Phe} appartient-il à ${indHel} ?`],
        ]),
        reveal: [{ p: { rv: 1 }, d: 900 }],
      } },
    { cle: "q3", beat: 10, scene: "quiz", set: { qi: 1, rv: 0 }, sujet: "lire pK_A à la demi-équivalence",
      text: ["Sur la courbe de dosage d’un acide faible par la soude, on lit pH = pK_A en…"],
      verifie: {
        ...VF([
          ["V_B = V_E / 2", true, "Oui : à la demi-équivalence, [AH] = [A⁻], donc pH = pK_A."],
          ["V_B = V_E", false, "À V_E, il n’y a plus d’acide : le pH vaut pH_E, pas pK_A.", "À quel volume reste-t-il autant d’acide que de base conjuguée ?"],
          ["là où pH = 7", false, "L’égalité des deux formes a lieu au pK_A du couple, pas à pH = 7.", "L’égalité [AH] = [A⁻] impose-t-elle pH = 7 ou pH = pK_A ?"],
        ]),
        reveal: [{ p: { rv: 1 }, d: 900 }],
      } },
    { cle: "fin", beat: 10, scene: "end", seq: [{ p: { n: 5 }, d: 3000, w: 300 }],
      text: ["Fin de la séance."], html: () => profileHTML() },
  ];

  // espace insécable avant % et entre nombre et unité
  const pct = (s) => (typeof s === "string"
    ? s.replace(/(\d) %/g, "$1\u202f%").replace(/(\d|<\/sup>) (mol·L⁻¹|g·mol⁻¹|g·L⁻¹|mol|mL|L|g|pt)(?=[\s.,;:)<]|$)/g, "$1\u00a0$2")
    : s);
  const pctP = (p) => (typeof p === "string" ? pct(ix(p)) : p && typeof p === "object" ? { ...p, t: pct(ix(p.t)) } : p);
  const pctOpts = (P) => {
    if (!P) return;
    if (P.opts) P.opts.forEach((o) => { o.t = pct(o.t); o.fb = pct(o.fb); o.indice = pct(o.indice); });
    if (P.label) P.label = `<span>${pct(ix(P.label))}</span>`;
    if (P.apres) {
      const d = Object.getOwnPropertyDescriptor(P.apres, "html");
      if (d && !d.get && typeof P.apres.html === "string") P.apres.html = pct(ix(P.apres.html));
      else if (d && d.get) { const f = d.get; Object.defineProperty(P.apres, "html", { get: () => pct(ix(f())), enumerable: true, configurable: true }); }
    }
  };
  STEPS.forEach((st) => {
    if (typeof st.text === "function") {
      const f = st.text;
      st.text = () => { const v = f(); return (Array.isArray(v) ? v : [v]).filter((x) => x != null && x !== "").map(pctP); };
    } else st.text = (Array.isArray(st.text) ? st.text : [st.text]).filter((x) => x != null && x !== "").map(pctP);
    if (st.deriv) st.deriv.forEach((x) => { x.r = pct(ix(x.r)); });
    pctOpts(st.pari); pctOpts(st.verifie);
  });

  /* ---------- fiches de mots ---------- */
  const mots = {
    titrage: { t: "dosage (titrage)", d: "Opération qui détermine la concentration d’une espèce (le titré) en la faisant réagir totalement avec une solution de concentration connue (le titrant)." },
    burette: { t: "burette graduée", d: "Tube gradué muni d’un robinet qui verse la solution titrante et mesure le volume versé V<sub>B</sub>. Les mots « pipette » et « burette » ont été forgés par Gay-Lussac en 1824." },
    prise: { t: "prise d’essai", d: "Volume précis V<sub>A</sub> prélevé à la pipette jaugée dans la solution à doser et placé dans le bécher." },
    limitant: { t: "réactif limitant", d: "Réactif entièrement consommé le premier. Avant l’équivalence, c’est le titrant (HO⁻) ; après, c’est le titré (AH)." },
    equivalence: { t: "équivalence", d: "État du dosage où les réactifs ont été introduits dans les proportions de l’équation : C<sub>A</sub>·V<sub>A</sub> = C<sub>B</sub>·V<sub>E</sub>. Le réactif limitant change à l’équivalence." },
    saut: { t: "saut de pH", d: "Variation brutale du pH autour du volume équivalent V<sub>E</sub> : le dernier acide est consommé, et la goutte suivante laisse des ions HO⁻ libres." },
    demi: { t: "demi-équivalence", d: "État atteint à V<sub>B</sub> = V<sub>E</sub>/2 : la moitié de l’acide a réagi, [AH] = [A⁻], donc pH = pK<sub>A</sub>." },
    indicateur: { t: "indicateur coloré", d: "Couple acide/base HIn/In⁻ dont les formes acide et basique ont des couleurs différentes." },
    virage: { t: "zone de virage", d: "Intervalle de pH dans lequel l’indicateur coloré passe de sa teinte acide à sa teinte basique." },
    phenolphtaleine: { t: "phénolphtaléine", d: `Indicateur coloré incolore en milieu acide et rose en milieu basique. Zone de virage dans les sujets du bac : ${indPh}.` },
  };
  Object.values(mots).forEach((m) => { m.d = pct(m.d); });

  /* ---------- fin de séance ---------- */
  const bet = (k) => { const st = STEPS.find((s) => s.cle === k), j = S.first[k]; return (!st || j == null) ? null : !!st.pari.opts[j].juste; };
  function profileHTML() {
    const estV = (s) => !!(s.verifie || (s.pari && s.pari.opts.some((o) => o.ok)));
    const V = STEPS.filter(estV), vu = V.filter((s) => ctx.juste(s.k) != null), vok = V.filter((s) => ctx.juste(s.k) === true), vko = V.filter((s) => ctx.juste(s.k) === false);
    const P = STEPS.filter((s) => s.pari && !estV(s)), pv = P.filter((s) => bet(s.cle) != null);
    const Q = [["q1", "sommet du pic de la dérivée"], ["q2", "indicateur pour une base faible"], ["q3", "pK_A à la demi-équivalence"]];
    const res = Q.map(([k]) => ctx.juste(k));
    const ligne = `« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length || V.length}</b>. Tes paris : ${pv.length} faits.`;
    const rows = res.map((ok, i) => `<li class="${ok === true ? "ok" : ok === false ? "ko" : ""}">${ok === true ? "✓" : ok === false ? "✗" : "·"} ${ix(Q[i][1])}</li>`).join("");
    const bets = [];
    const a = bet("goutte"); if (a != null) bets.push(a ? "tu avais prévu le virage d’un coup" : "tu attendais un virage progressif");
    const b = bet("combien"); if (b != null) bets.push(b ? "tu avais vu que le volume double avec la concentration" : "le volume doublé t’avait échappé");
    const c = bet("pari-E"); if (c != null) bets.push(c ? "tu savais qu’il ne reste que CH₃COO⁻ à E" : "le contenu du bécher à E t’avait piégé");
    const d = bet("pHE"); if (d != null) bets.push(d ? "tu savais que pH_E > 7" : "pH = 7 t’avait tenté");
    const e = bet("allure"); if (e != null) bets.push(e ? "tu avais prévu le saut sur la courbe" : "tu imaginais une droite");
    const f = bet("bande"); if (f != null) bets.push(f ? "tu avais prévu le virage précoce de l’hélianthine" : "le virage de l’hélianthine t’avait surpris");
    const revoir = vko.map((x) => x.sujet).filter(Boolean);
    return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/dosage/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length ? `<p class="small">Tes paris : ${bets.join(" ; ")}.</p>` : ""}${revoir.length ? `<p class="small">À revoir : ${revoir.join(" ; ")}.</p>` : ""}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div><ol><li>Équation, flèche unique et K : exercices 1 et 2. Montage : exercice 3.</li><li>Volumes égaux et rapport inversé dans C_A·V_A = C_B·V_E : exercice 4. Contenu du bécher : exercice 5.</li><li>pH = 7, tangentes et dérivée nulle : exercice 6.</li><li>Demi-équivalence et rapport [AH]/[A⁻] : exercices 7 et 8.</li><li>Indicateur coloré : exercice 9. Dilution, prélèvement et C_eq : exercices 10 et 11.</li><li>Synthèse type bac : exercice 12.</li></ol></div></details>`;
  }

  /* ---------- contrôle curseur V_B libre à `rappel` (débloqué après réponse) ---------- */
  const CTL = {
    vol: {
      html: () => `<div class="ctl"><div class="ds-cur"><label><span><i>V</i><sub>B</sub></span><input id="sl-V" type="range" min="0" max="${VMAX_L}" step="0.5" value="0" aria-label="Volume de soude versé" disabled><output id="so-V" for="sl-V">Réponds d’abord</output></label></div></div>`,
      init() {
        const sc = scenes.phv, inp = $("#sl-V"), out = $("#so-V");
        if (!inp || !out) return;
        const maj = () => {
          const pret = ctx.juste("rappel") != null;
          inp.disabled = !pret;
          if (pret && out.textContent === "Réponds d’abord") out.textContent = "0,0\u00a0mL";
        };
        maj();
        root.addEventListener("click", () => setTimeout(maj, 0));
        inp.addEventListener("input", () => {
          if (inp.disabled) return;
          const v = Number(inp.value);
          out.textContent = `${fr(v, 1)}\u00a0mL · pH\u00a0${fr(phL(v), 2)}`;
          sc.p.curV = v;
          sc.render();
        });
      },
    },
  };

  const surSaut = (e) => {
    const b = e.target.closest && e.target.closest("[data-aller]");
    if (!b || !root.contains(b)) return;
    const i = STEPS.findIndex((s) => s.cle === b.dataset.aller);
    if (i >= 0) { e.preventDefault(); ctx.aller(i); }
  };
  root.addEventListener("click", surSaut);

  return {
    BEATS, STEPS, CTL, mots,
    reset() {},
    plain: (s) => s.replace(/ ?%/g, " pour cent").replace(/τ/g, " tau ").replace(/⇄/g, " double flèche ").replace(/→/g, " flèche "),
    demonter() { root.removeEventListener("click", surSaut); },
  };
});
}
