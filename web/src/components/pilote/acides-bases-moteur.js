/* eslint-disable */
// @ts-nocheck
/**
 * Leçon « État d’équilibre, puis acides et bases en solution » (`acides-bases`, V3).
 * Plan : docs/refonte/specs/acides-bases.md (fiches C4 et C5). Deuxième leçon pilote de chimie.
 *
 * Douze parties, 51 étapes : ce qu’il faut savoir (sautable), l’énigme (hélianthine jaune à pH 5,0),
 * le quotient de réaction Q_r, trois flacons et la constante d’équilibre K (puis la dilution),
 * l’eau et K_e (frontière 7), K_A et pK_A (comparaison des acides et des bases), la prédominance
 * (et la distribution en PC et SM, sautable pour SVT), deux couples face à face, l’indicateur coloré,
 * le retour à l’énigme, deux sujets du bac (2022 et 2020), le bilan.
 *
 * Aucun nombre affiché n’est écrit à la main ici : tout provient de `acides-bases-outils.js`.
 */
import { monterLecon } from "./noyau";
import {
  fr, ent, sciH, sciF, TN, TS, outilsAb, VERIF_DEFAUTS,
  SAV_LOG, ENIGME, INDICATEURS, C_TRIO, C0, F_DIL, PH_TRIO, TAU_TRIO, QR_VAL, COEF_PILE, MEME_K, TICS,
  TEMP_C, PKE, KE, PH_NEUTRE, H_NEUTRE, PH_AXE_MIN, PH_AXE_MAX, NAT_EX, HO_PH,
  PKA, KA_NOM, COMP_ACIDES, S21, COMP_BASES,
  PREDOM, DOM_BORNES, DIST_1, CROIS, PREDOM_DIST,
  C12, K_PROCHES, MELANGE, PH_TRANSFERT,
  S22, S20, Q1_23, Q2_COMP, rapCouple, teinteInd,
} from "./acides-bases-outils";
import { scenesA } from "./acides-bases-scenes-a";
import { scenesC } from "./acides-bases-scenes-c";
import { scenesD } from "./acides-bases-scenes-d";

export function monterPilote(root) {
  return monterLecon(root, (ctx) => {
    const { clamp, scenes, S } = ctx;
    const $ = ctx.$;
    const tx = String.raw;
    const O = outilsAb(ctx);
    if (VERIF_DEFAUTS.length) throw new Error("contrôles acides-bases invalides : " + VERIF_DEFAUTS.join(" ; "));

    /* ---------- Nombres formatés depuis les outils ---------- */
    const savX = sciH(SAV_LOG.x, 1), savRep = ent(SAV_LOG.rep), savNeg = fr(SAV_LOG.fauxSigne, 0), savExp = ent(SAV_LOG.exp);
    const phHcl = fr(ENIGME.phHcl, 1), phSoude = fr(ENIGME.phSoude, 1), phFl = fr(ENIGME.phFlacon, 1);
    const zHelB = fr(ENIGME.zoneBas, 1), zHelH = fr(ENIGME.zoneHaut, 1), vers4 = ent(ENIGME.vers), pkaHel = fr(PKA.hel, 1);
    const zBbtB = fr(INDICATEURS.bbt.zone[0], 1), zBbtH = fr(INDICATEURS.bbt.zone[1], 1);
    const zPhB = fr(INDICATEURS.phph.zone[0], 1), zPhH = fr(INDICATEURS.phph.zone[1], 0);
    const phTr = fr(PH_TRANSFERT, 1);

    const Cv = sciH(C0, 1), C1v = sciH(C_TRIO[0], 1), C3v = sciH(C_TRIO[2], 1), fDil = ent(F_DIL);
    const ph2 = fr(PH_TRIO[1], 2), ph3 = fr(PH_TRIO[2], 2);
    const tau1P = fr(TAU_TRIO[0] * 100, 1), tau2P = fr(TAU_TRIO[1] * 100, 1), tau3P = fr(TAU_TRIO[2] * 100, 1), tau3Prond = fr(TAU_TRIO[2] * 100, 0);
    const qr2S = sciH(QR_VAL.rep, 2), qr2Fx1 = sciH(QR_VAL.fauxSansCarre, 2), qr2Fx2 = sciH(QR_VAL.fauxInverse, 2), reste96 = fr(QR_VAL.restePct, 0);
    const coefAg = ent(COEF_PILE);
    const qr3S = sciH(MEME_K.rep, 2), qr3Int = sciH(MEME_K.fauxIntact, 2), qr3Sc = sciH(MEME_K.fauxSansCarre, 2);

    const t25 = ent(TEMP_C), pkeS = ent(PKE), keS = sciH(KE, 1), keCourt = `10<sup>−${pkeS}</sup>`, ph7 = ent(PH_NEUTRE), h7 = sciH(H_NEUTRE, 1);
    const natPh = fr(NAT_EX.pH, 1), natH = sciH(NAT_EX.h, 1), natHo = sciH(NAT_EX.ho, 1);
    const hoV = sciH(HO_PH.ho, 1), hoRep = fr(HO_PH.rep, 1), hoFx1 = fr(HO_PH.fauxPoh, 1), hoFx2 = fr(HO_PH.fauxPlus, 1);

    const kaEx = sciH(KA_NOM.ka, 1), pkaEth = fr(PKA.ethan, 1), pkaNeg = fr(KA_NOM.fauxSigne, 1), pkaFxExp = fr(KA_NOM.fauxExp, 1), phC3 = fr(KA_NOM.phC3, 1);
    const pkaMet = fr(PKA.metha, 2), pkaBen = fr(PKA.benzo, 1), pkaPro = fr(PKA.propan, 1), pkaNh4 = fr(PKA.nh4, 1);
    const Ca21 = fr(S21.Ca, 2), tau21P = fr(S21.tauPct, 2), qr21S = sciH(S21.qrImp, 2);
    const phNh3 = fr(COMP_BASES[0].pH, 1), phEthB = fr(COMP_BASES[1].pH, 1);

    const phPred = fr(PREDOM.pH, 1), rapPred = fr(PREDOM.rap, 0);
    const phDist = fr(DIST_1.pH, 1), pDist = fr(DIST_1.part, 0), pTout = ent(DIST_1.fauxTout), pLin = ent(DIST_1.fauxLin);
    const dNum = ent(DIST_1.num), dDen = ent(DIST_1.den);
    const crNeutre = fr(CROIS.fauxNeutre, 1), cr99 = fr(CROIS.faux99, 1);
    const pdPh1 = fr(PREDOM_DIST.ph1, 1), pdPh2 = fr(PREDOM_DIST.ph2, 1);
    const pdP1 = fr(PREDOM_DIST.p1, 0), pdP2 = fr(PREDOM_DIST.p2, 1), pdL1 = ent(PREDOM_DIST.fauxLin1), pdL2 = ent(PREDOM_DIST.fauxLin2);

    const n12S = sciH(C12.n, 1), k12S = sciH(C12.K, 1), k12Inv = sciH(C12.fauxInv, 1), k12Del = fr(C12.fauxDelta, 1);
    const rac12 = fr(C12.racK, 0), tau12 = fr(C12.tau, 2), tau12Demi = fr(C12.fauxDemi, 2), tau12Inv = sciH(C12.fauxInvRac, 1);
    const b12_2 = ent(C12.bareme[1]), b12_3 = ent(C12.bareme[2]);
    const kPr = fr(K_PROCHES.K, 2), tauPr = fr(K_PROCHES.tau, 2), tauPrPct = fr(K_PROCHES.tau * 100, 0);
    const melRep = fr(MELANGE.rep, 1), melDiff = fr(MELANGE.fauxDiff, 1), melSom = fr(MELANGE.fauxSomme, 1);

    const Ca22 = sciH(S22.Ca, 0), ph22 = fr(S22.pH, 1), h22 = sciH(S22.h, 1), qr22 = sciH(S22.qr, 2), pka22 = fr(S22.pka, 2), pka22Neg = fr(S22.fauxSigne, 2);
    const b22_3 = fr(S22.bareme[0], 2), b22_4 = fr(S22.bareme[1], 1);

    const Cb20 = sciH(S20.Cb, 1), ph20 = fr(S20.pH, 1), ho20 = sciH(S20.ho, 1), h3o20 = sciH(S20.fauxH3o, 1), surPh20 = sciH(S20.fauxSurPh, 1);
    const tau20 = sciH(S20.tau, 1), tauH20 = sciH(S20.fauxTauH, 1), tauInv20 = fr(S20.fauxTauInv, 0);
    const qr20 = sciH(S20.qrImp, 2), ka20 = sciH(S20.ka, 1), pka20 = fr(S20.pka, 1), pkaQr20 = fr(S20.fauxPkaQr, 1);
    const b20_2 = fr(S20.bareme[0], 2), b20_3 = fr(S20.bareme[1], 1), b20_4 = fr(S20.bareme[2], 1), b20_5 = fr(S20.bareme[3], 1);

    const pka23_1 = fr(Q1_23.pka1, 2), pka23_2 = fr(Q1_23.pka2, 2), k23S = sciH(Q1_23.K, 1), k23Inv = fr(Q1_23.fauxInv, 0);
    const kaBenS = sciH(Q2_COMP.kaBenzo, 1), pkaBenCalc = fr(Q2_COMP.pkaBenzo, 1);

    /* ---------- Cartouches de bilan pour la scène `quiz` ---------- */
    const QUIZ = [
      {
        titre: "Piège de copie",
        tag: "sujet 2023, §2, question 2.2",
        big: "CH_{3}COOH_{(aq)} + HCOO^{−}_{(aq)} ⇄ CH_{3}COO^{−}_{(aq)} + HCOOH_{(aq)}",
        sub: `copie : *K* = *K*_{A2} / *K*_{A1} = 10^{${pka23_1} − ${pka23_2}} ≈ ${k23Inv}`,
        r1: `rapport renversé : *K* = *K*_{A1} / *K*_{A2} ≈ ${sciF(Q1_23.K, 1)}`,
        r2: "l’acide qui réagit à gauche donne son *K*_{A} au numérateur",
      },
      {
        titre: "Comparer deux acides",
        tag: "constante d’acidité et p*K*_{A}",
        big: `C_{6}H_{5}COOH : *K*_{A} = ${sciF(Q2_COMP.kaBenzo, 1)}   ·   CH_{3}COOH : p*K*_{A} = ${pkaEth}`,
        sub: "à même concentration, lequel est le plus fort ?",
        r1: `l’acide benzoïque : p*K*_{A} = ${pkaBenCalc} < ${pkaEth}`,
        r2: "on compare deux p*K*_{A} entre eux, pas un *K*_{A} et un p*K*_{A}",
      },
      {
        titre: "Piège de copie",
        tag: "dilution d’une réaction entre deux couples",
        big: "CH_{3}COOH_{(aq)} + C_{6}H_{5}COO^{−}_{(aq)} ⇄ CH_{3}COO^{−}_{(aq)} + C_{6}H_{5}COOH_{(aq)}",
        sub: `mélange à l’équilibre, dilué ${fDil} fois`,
        r1: "deux concentrations en haut, deux en bas : *Q*_{r} ne change pas",
        r2: "*Q*_{r} reste égal à *K* : *τ* garde la même valeur",
      },
    ];
    scenesA(ctx, O);
    scenesC(ctx, O);
    scenesD(ctx, O, QUIZ);

    /* ---------- Mise en forme typographique du panneau (sans lookbehind) ---------- */
    const IX = {
      "pK_A1": "p<i>K</i><sub>A1</sub>", "pK_A2": "p<i>K</i><sub>A2</sub>", "pK_A": "p<i>K</i><sub>A</sub>", "pK_e": "p<i>K</i><sub>e</sub>",
      "K_A1": "<i>K</i><sub>A1</sub>", "K_A2": "<i>K</i><sub>A2</sub>", "K_A": "<i>K</i><sub>A</sub>", "K_e": "<i>K</i><sub>e</sub>",
      "Q_r,éq": "<i>Q</i><sub>r,éq</sub>", "Q_r": "<i>Q</i><sub>r</sub>",
      "C_a": "<i>C</i><sub>a</sub>", "C_b": "<i>C</i><sub>b</sub>", "C_1": "<i>C</i><sub>1</sub>", "C_2": "<i>C</i><sub>2</sub>", "C_3": "<i>C</i><sub>3</sub>",
      "n_1": "<i>n</i><sub>1</sub>", "n_2": "<i>n</i><sub>2</sub>",
      "x_max": "<i>x</i><sub>max</sub>", "x_f": "<i>x</i><sub>f</sub>",
      "[H₃O⁺]_éq": "[H₃O⁺]<sub>éq</sub>", "[HO⁻]_éq": "[HO⁻]<sub>éq</sub>",
      "[AH]_éq": "[AH]<sub>éq</sub>", "[A⁻]_éq": "[A⁻]<sub>éq</sub>",
      "[CH₃COOH]_éq": "[CH₃COOH]<sub>éq</sub>", "[CH₃COO⁻]_éq": "[CH₃COO⁻]<sub>éq</sub>",
      "[C₂H₅COOH]_éq": "[C₂H₅COOH]<sub>éq</sub>", "[C₂H₅COO⁻]_éq": "[C₂H₅COO⁻]<sub>éq</sub>",
      "[NH₃]_éq": "[NH₃]<sub>éq</sub>", "[NH₄⁺]_éq": "[NH₄⁺]<sub>éq</sub>",
      "τ": "<i>τ</i>", "K": "<i>K</i>", "C": "<i>C</i>", "V": "<i>V</i>", "x": "<i>x</i>", "n": "<i>n</i>",
    };
    const IXRE = /pK_A1|pK_A2|pK_A|pK_e|K_A1|K_A2|K_A|K_e|Q_r,éq|Q_r|C_a|C_b|C_1|C_2|C_3|n_1|n_2|x_max|x_f|\[H₃O⁺\]_éq|\[HO⁻\]_éq|\[AH\]_éq|\[A⁻\]_éq|\[CH₃COOH\]_éq|\[CH₃COO⁻\]_éq|\[C₂H₅COOH\]_éq|\[C₂H₅COO⁻\]_éq|\[NH₃\]_éq|\[NH₄⁺\]_éq|τ|(^|[^\p{L}\p{N}_°])(K|C|V|x|n)(?![\p{L}\p{N}_’'])/gu;
    const ix = (s) => typeof s !== "string" ? s : s.split(/(<sub>.*?<\/sub>|<sup>.*?<\/sup>|<i>.*?<\/i>|<\/?[a-zA-Z][^>]*>|\[\[[^\]]*\]\])/).map((p, i) => (i % 2 ? p : p.replace(IXRE, (m, pre, lettre) => (lettre ? pre + IX[lettre] : IX[m] || m)))).join("");

    const BET = (t) => ({ opts: t.map(([x, fb, j]) => ({ t: ix(x), fb: ix(fb), juste: !!j })) });
    const VF = (t) => ({ opts: t.map(([x, ok, fb, indice]) => ({ t: ix(x), ok, fb: ix(fb), indice: ix(indice) })) });
    const saut = (cle, vers, oui, non) => ({
      get html() {
        return ctx.juste(cle)
          ? `<button type="button" class="ab-saut" data-aller="${vers}">${oui} →</button>`
          : `<p class="small">${non}</p>`;
      },
    });
    const sautPcSm = () => `<button type="button" class="ab-saut" data-aller="deux-couples">Filière SVT : passer à la suite →</button>`;

    /* Constructeurs d'états complets par scène */
    const BE = (o) => ({
      jeu: "becher", tit: "", sub: "", flacons: 1, mode: "", ind: "", teinte: 0, ref: 0, ph: 1, ph2: 0, pv: 0, nomx: "",
      tic: 0, gq: 1, grad: 0, qrf: 0, phm: 0, pal: 0, gros: 0, tr: 0,
      cv: 0, kl: 0, tb: 0, hl: 0, dl: 0, ph3: 0, chute: 0, remonte: 0, ...o,
    });
    const ZO = (o) => BE({ jeu: "zoom", ...o });
    const TR = (o) => BE({ jeu: "trio", ...o });
    const AX = (o) => ({
      tit: "", sub: "", p7: 0, dsol: 0, couple: "aucun", pk1: -1, pk2: -1, eq50: 0, dcp: 0,
      b0: -1, b1: -1, ph: -1, ph2: -1, rap: 0, dist: 0, pct: 0, sw: 0, ...o,
    });
    const AV = (o) => ({ mode: "conc", cases: 4, fx: -1, tit: "", sub: "", ...o });
    const BA = (o) => ({ montrer: 0, tit: "", sub: "", ...o });
    const BC = (o) => ({ mode: "s2022", n: 0, tit: "", sub: "", ...o });

    function rappelHelianthine() {
      const j = S.first.helianthine;
      if (j == null) return "";
      return [
        "À l’énigme, tu avais parié rouge : le flacon a pris la teinte jaune.",
        "À l’énigme, tu avais parié juste : le flacon a pris la teinte jaune.",
        "À l’énigme, tu avais parié orange : le flacon a pris la teinte jaune.",
      ][j];
    }

    /* ---------- Les 12 parties ---------- */
    const BEATS = [
      { name: "Ce qu’il faut savoir", court: "Savoir" },
      { name: "L’énigme", court: "Énigme" },
      { name: "Où en est le mélange", court: "Qr" },
      { name: "Trois flacons, un même acide", court: "Flacons" },
      { name: "L’eau elle-même", court: "L’eau" },
      { name: "La constante d’acidité", court: "KA" },
      { name: "Qui l’emporte ?", court: "Espèces" },
      { name: "Deux couples face à face", court: "Couples" },
      { name: "L’indicateur coloré", court: "Teintes" },
      { name: "Retour à l’énigme", court: "Retour" },
      { name: "Au bac", court: "Au bac" },
      { name: "Bilan", court: "Bilan" },
    ];

    const STEPS = [
      /* ===== 0. Ce qu'il faut savoir (3) ===== */
      {
        cle: "sav-test", beat: 0, scene: "bac", set: BC({ mode: "savoir" }), sujet: "le logarithme décimal d’une puissance de 10",
        text: ["Ce qu’il faut savoir : juste du premier coup, tu passes directement à l’énigme.", `Que vaut −log(${savX}) ?`],
        verifie: {
          ...VF([
            [`${savRep}`, true, `Oui : log(10<sup>−${savExp}</sup>) = −${savExp}, donc −log(${savX}) = ${savRep}.`],
            [`${savNeg}`, false, `Signe du « − » oublié : log(10<sup>−${savExp}</sup>) vaut ${savNeg}, et le signe moins devant donne +${savRep}.`, `Que vaut log(10^(−${savExp})) avant de prendre l’opposé ?`],
            [`10<sup>${savExp}</sup>`, false, `Logarithme et puissance de 10 confondus : log(10<sup>x</sup>) rend l’exposant x, pas une puissance de 10.`, `Que rend log(10^x) : une puissance de 10, ou l’exposant x ?`],
          ]),
          apres: saut("sav-test", "helianthine", "Je le sais : passer à l’énigme", 'La suite rappelle l’essentiel. Pour revoir le logarithme : <a href="/pilote/logarithme">leçon sur le logarithme</a>.'),
        },
      },
      {
        cle: "sav-eq", beat: 0, scene: "avancement", set: AV({ mode: "conc", cases: 4 }), sujet: "[AH]_éq = C − 10^(−pH)",
        text: ["On dissout un acide AH dans l’eau, à la concentration apportée C : AH + H₂O ⇄ A⁻ + H₃O⁺.", "Le pH à l’équilibre est connu. Que vaut [AH]_éq ?"],
        verifie: {
          ...VF([
            ["C − 10<sup>−pH</sup>", true, "Oui : chaque AH qui réagit donne un H₃O⁺, donc [AH]_éq = C − [H₃O⁺]_éq = C − 10<sup>−pH</sup>."],
            ["C", false, "Acide faible supposé intact : ce qui a réagi doit être retiré de C, même si c’est peu.", "L’acide a-t-il gardé toutes ses molécules, ou perdu ce qui s’est transformé en A⁻ ?"],
            ["10<sup>−pH</sup>", false, "Réactif restant et produit formé échangés : 10<sup>−pH</sup> est [H₃O⁺]_éq = [A⁻]_éq, pas [AH]_éq.", "10^(−pH) mesure-t-il l’acide restant ou les ions H₃O⁺ formés ?"],
          ]),
          reveal: [{ p: { cases: 12 }, d: 700 }],
        },
      },
      {
        cle: "sav-rappel", beat: 0, scene: "avancement", set: AV({ mode: "conc", cases: 12 }),
        text: [
          "Trois relations reviennent dans toute la leçon.",
          "Le pH et [H₃O⁺] se répondent : [H₃O⁺] = 10<sup>−pH</sup> et pH = −log[H₃O⁺].",
          "Le logarithme transforme produits et quotients : log(<i>a</i> · <i>b</i>) = log <i>a</i> + log <i>b</i> et log(<i>a</i> / <i>b</i>) = log <i>a</i> − log <i>b</i> ; pour un acide avec l’eau, τ = [H₃O⁺]_éq / C.",
        ],
        tex: [
          [tx`[\mathrm{H_3O^+}]=10^{-\mathrm{pH}}`, "[H₃O⁺] = 10^(−pH)"],
          [tx`\log\!\left(\dfrac{a}{b}\right)=\log a-\log b`, "log(a/b) = log a − log b"],
        ],
      },

      /* ===== 1. L'énigme (3) ===== */
      {
        cle: "helianthine", beat: 1, scene: "solution",
        set: BE({ ind: "hel", pv: ENIGME.phFlacon, ph: 1, teinte: 0, ref: 1, tit: "Deux gouttes d’hélianthine", sub: `solution de pH ${phFl}` }),
        text: [
          `L’[[helianthine|hélianthine]] est rouge dans l’acide chlorhydrique (pH ${phHcl}) et jaune dans la soude (pH ${phSoude}).`,
          `Ce troisième flacon contient une solution acide, de pH ${phFl}.`,
          "Deux gouttes d’hélianthine dans ce flacon : quelle teinte prend-il ?",
        ],
        pari: {
          reveal: [{ p: { teinte: 1 }, d: 1200 }],
          ...BET([
            ["rouge : la solution est acide", "C’est ce que dit l’idée « acide, donc rouge ». Le flacon dit autre chose : il prend la teinte jaune."],
            ["jaune : comme dans la soude", "Oui : le flacon devient jaune, la teinte de la soude, alors que la solution est acide.", 1],
            ["orange : la solution est peu acide", "Tu as supposé que la teinte suit le pH pas à pas jusqu’à la neutralité. Le flacon est franchement jaune."],
          ]),
        },
      },
      {
        cle: "virage", beat: 1, scene: "solution", ctl: "virage", needLabel: "Passe sous 3,1 puis au-dessus de 4,4 d’abord",
        set: BE({ ind: "hel", pv: ENIGME.phFlacon, ph: 1, teinte: 1, ref: 1, tit: "Faire varier le pH du flacon", sub: "repère l’intervalle où la teinte change" }),
        text: [
          "Fais descendre puis remonter le pH du flacon.",
          `Repère entre quelles valeurs de pH la teinte bascule entre le jaune et le rouge (tableau du sujet 2020 : ${zHelB} – ${zHelH}).`,
        ],
      },
      {
        cle: "question", beat: 1, scene: "solution",
        set: BE({ ind: "hel", pv: ENIGME.phFlacon, ph: 1, teinte: 1, ref: 1, tit: "Deux gouttes d’hélianthine", sub: `bascule observée entre ${zHelB} et ${zHelH}` }),
        text: [
          `La teinte ne change qu’entre ${zHelB} et ${zHelH}, loin de ${ph7}.`,
          { t: `Une solution acide où l’hélianthine a la teinte de la soude : pourquoi, et pourquoi bascule-t-elle vers ${vers4} plutôt que ${ph7} ?`, fort: true },
        ],
      },

      /* ===== 2. Où en est le mélange (5) ===== */
      {
        cle: "qr-monte", beat: 2, scene: "solution",
        set: ZO({ tic: 0, gq: 1, qrf: 0, phm: 0, pal: 0, tit: "Un nombre, tic après tic" }),
        text: [
          "Reprends la loupe de la leçon précédente sur l’acide éthanoïque dans l’eau.",
          "À chaque tic, on calcule le rapport [A⁻][H₃O⁺] / [AH] avec les concentrations du bécher.",
          "Au fil des tics, ce rapport…",
        ],
        pari: {
          reveal: [{ p: { tic: TICS }, d: 3000 }],
          apres: { html: "<p>Au palier, des molécules réagissent encore, autant dans chaque sens : c’est l’équilibre dynamique.</p>" },
          ...BET([
            ["monte, puis se stabilise avec le compte des A⁻", "Oui : la courbe monte tant que le compte des ions grandit, puis forme un palier.", 1],
            ["monte tant qu’il reste des AH à céder leur proton", `Rapport confondu avec un compteur cumulé : il suit la composition, pas le stock restant. Au palier, il reste ${reste96} % des AH et le rapport ne bouge plus.`],
            ["monte, puis redescend quand le sens inverse l’emporte", "Sens inverse supposé prendre le dessus : il finit par compenser le sens direct, sans le dépasser."],
          ]),
        },
      },
      {
        cle: "qr-nom", beat: 2, scene: "solution",
        set: ZO({ tic: TICS, gq: 1, qrf: 1, phm: 0, pal: 0, tit: "Le quotient de réaction" }),
        sujet: "l’eau solvant absente de Q_r",
        text: [
          "Ce rapport se nomme le [[quotient|quotient de réaction]], noté Q_r : les produits au numérateur, les réactifs au dénominateur.",
          "H₂O est un réactif de l’équation, et pourtant il ne figure pas dans Q_r. Pourquoi ?",
        ],
        pari: {
          ...VF([
            ["l’eau est le solvant, pas une espèce dissoute", true, "Oui : seules les espèces dissoutes entrent par leur concentration dans Q_r ; le solvant n’y figure pas."],
            ["l’eau ne réagit pas : elle sert à dissoudre", false, "Eau réduite à un simple décor : elle a capté le proton pour devenir H₃O⁺, elle a donc réagi. C’est son rôle de solvant qui l’écarte de Q_r.", "Quelle espèce a capté le proton H⁺ cédé par AH ?"],
            ["l’eau est trop peu abondante pour compter", false, "Abondance de l’eau prise à rebours : le solvant entoure toutes les molécules dissoutes, sa quantité est immense et quasi constante.", "Dans une solution diluée, quelle est l’espèce la plus abondante ?"],
          ]),
        },
      },
      {
        cle: "qr-valeur", beat: 2, scene: "solution",
        set: ZO({ tic: TICS, gq: 1, qrf: 1, phm: 1, pal: 0, tit: "Valeur de *Q*_{r} au palier" }),
        sujet: "calculer Q_r,éq depuis C et le pH",
        text: [
          `Pour ce flacon d’acide éthanoïque, C = ${Cv} mol·L⁻¹ et le pH calculé vaut ${ph2}.`,
          "Au palier, que vaut Q_r ?",
        ],
        verifie: {
          ...VF([
            [`${qr2S}`, true, `Oui : [A⁻]_éq = [H₃O⁺]_éq = 10<sup>−${ph2}</sup>, et (10<sup>−${ph2}</sup>)² / (${Cv} − 10<sup>−${ph2}</sup>) ≈ ${qr2S}.`],
            [`${qr2Fx1}`, false, `Un seul facteur mis au numérateur : [A⁻]_éq et [H₃O⁺]_éq valent tous deux 10<sup>−${ph2}</sup>, leur produit est (10<sup>−${ph2}</sup>)².`, "Combien de concentrations figurent au numérateur de [A⁻][H₃O⁺] / [AH] ?"],
            [`${qr2Fx2}`, false, "Quotient renversé : tu as placé le réactif en haut et les produits en bas.", "Dans Q_r, les produits sont-ils au numérateur ou au dénominateur ?"],
          ]),
          reveal: [{ p: { pal: 1 }, d: 700 }],
          apres: { html: "<p>Par convention, Q_r s’écrit sans unité (chaque concentration étant en mol·L⁻¹). À l’équilibre, on le note Q_r,éq.</p>" },
        },
      },
      {
        cle: "qr-solides", beat: 2, scene: "bac", set: BC({ mode: "qr1" }), sujet: "les solides ne figurent pas dans Q_r",
        text: [
          "Sujet 2012, session normale, 2ᵉ partie : réaction entre le zinc solide et les ions cuivre II en solution.",
          "Quelle est l’expression littérale de Q_r ?",
        ],
        pari: {
          ...VF([
            ["[Zn²⁺] / [Cu²⁺]", true, "Oui : seuls les ions dissous Zn²⁺(aq) et Cu²⁺(aq) figurent dans Q_r."],
            ["[Zn²⁺][Cu] / ([Cu²⁺][Zn])", false, "Solides inclus dans Q_r : Zn(s) et Cu(s) ne sont pas dissous en solution, ils ne figurent pas dans Q_r.", "Un métal solide possède-t-il une concentration molaire en solution ?"],
            ["[Cu²⁺] / [Zn²⁺]", false, "Quotient renversé : tu as mis le réactif Cu²⁺ au numérateur et le produit Zn²⁺ au dénominateur.", "Quel ion est formé à droite de la double flèche ?"],
          ]),
          apres: { html: "<p>Comme le solvant, un solide ne figure pas dans l’expression de Q_r.</p>" },
        },
      },
      {
        cle: "qr-exposants", beat: 2, scene: "bac", set: BC({ mode: "qr2" }), sujet: "les coefficients deviennent des exposants dans Q_r",
        text: [
          "Sujet 2020, session normale, partie 2 : l’équation bilan de la pile argent-chrome.",
          "Quelle est l’expression littérale de Q_r ?",
        ],
        pari: {
          ...VF([
            [`[Cr³⁺] / [Ag⁺]<sup>${coefAg}</sup>`, true, `Oui : les solides Ag(s) et Cr(s) sont écartés, et le coefficient ${coefAg} devant Ag⁺ devient l’exposant ${coefAg}.`],
            [`[Cr³⁺] / (${coefAg}[Ag⁺])`, false, `Coefficient écrit en facteur au lieu d’exposant : ${coefAg} ions Ag⁺ engagés donnent [Ag⁺] × [Ag⁺] × [Ag⁺] = [Ag⁺]<sup>${coefAg}</sup>.`, `Dans Q_r, le nombre stœchiométrique ${coefAg} multiplie-t-il la concentration ou passe-t-il en exposant ?`],
            ["[Cr³⁺] / [Ag⁺]", false, `Coefficient stœchiométrique oublié : l’équation engage ${coefAg} ions Ag⁺(aq), d’où [Ag⁺]<sup>${coefAg}</sup> au dénominateur.`, "Quel est le nombre stœchiométrique devant Ag⁺(aq) dans l’équation ?"],
          ]),
          apres: { html: "<p>Dans Q_r, le nombre stœchiométrique de chaque espèce dissoute passe en exposant de sa concentration.</p>" },
        },
      },

      /* ===== 3. Trois flacons, un même acide (6) ===== */
      {
        cle: "trois-flacons", beat: 3, scene: "solution", tag: "1864",
        set: TR({ cv: 0, grad: 0, kl: 0, tb: 0, hl: 0, dl: 0, ph3: 0, tit: "Trois flacons d’acide éthanoïque" }),
        text: [
          `Trois flacons du même acide éthanoïque : C_1 = ${C1v}, C_2 = ${Cv} et C_3 = ${C3v} mol·L⁻¹.`,
          `Au milieu, Q_r,éq = ${qr2S} et τ = ${tau2P} % ; à droite, dix fois plus dilué, τ monte à ${tau3Prond} %.`,
          "Dans ce flacon dix fois plus dilué, Q_r,éq…",
        ],
        pari: {
          reveal: [{ p: { cv: 1 }, d: 2500 }],
          apres: { html: "<p>En 1864, Guldberg et Waage proposent qu’à l’équilibre, un même rapport des concentrations se retrouve quel que soit le mélange initial.</p>" },
          ...BET([
            ["triple", "Q_r,éq lu comme τ : τ a triplé, mais les concentrations ont été divisées par dix, et le rapport retombe sur la même hauteur."],
            ["garde la même valeur", "Oui : les trois courbes rejoignent le même palier, quelle que soit la concentration de départ.", 1],
            ["est divisé par 10", "Q_r,éq supposé proportionnel à C : comme τ augmente quand C baisse, le rapport [A⁻]_éq [H₃O⁺]_éq / [AH]_éq retrouve la même valeur."],
          ]),
        },
      },
      {
        cle: "meme-k-calc", beat: 3, scene: "solution",
        set: TR({ cv: 1, grad: 0, kl: 0, tb: 0, hl: 3, ph3: 1, tit: "Vérification sur le flacon dilué" }),
        sujet: "calculer Q_r,éq sans négliger ce qui a réagi",
        text: [
          `Vérifie par le calcul sur le troisième flacon : C_3 = ${C3v} mol·L⁻¹ et pH = ${ph3}.`,
          "Que vaut Q_r,éq ?",
        ],
        verifie: {
          ...VF([
            [`${qr3S}`, true, `Oui : (10<sup>−${ph3}</sup>)² / (${C3v} − 10<sup>−${ph3}</sup>) ≈ ${qr3S}.`],
            [`${qr3Int}`, false, `Acide supposé intact ([AH]_éq pris égal à C_3) : ici ${tau3Prond} % de l’acide a réagi, il faut garder C_3 − 10<sup>−${ph3}</sup> au dénominateur.`, "Que vaut [AH]_éq dans la ligne finale du tableau : C_3, ou C_3 − 10^(−pH) ?"],
            [`${qr3Sc}`, false, `Carré oublié au numérateur : [A⁻]_éq et [H₃O⁺]_éq valent chacun 10<sup>−${ph3}</sup>, soit (10<sup>−${ph3}</sup>)² en haut.`, "Combien d’ions produits multiplient leurs concentrations au numérateur ?"],
          ]),
          apres: { html: `<p>${qr2S} et ${qr3S} : le léger écart vient de l’arrondi du pH à deux décimales. Sans arrondi, les trois flacons donnent exactement la même valeur.</p>` },
        },
      },
      {
        cle: "k-nom", beat: 3, scene: "solution",
        set: TR({ cv: 1, grad: 1, kl: 1, tb: 0, hl: 0, ph3: 1, tit: "La constante d’équilibre K" }),
        sujet: "K ne dépend que de la réaction et de la température",
        text: [
          "Cette valeur commune de Q_r,éq se nomme la [[constante|constante d’équilibre]] K associée à l’équation de la réaction.",
          "Laquelle de ces opérations sur la solution peut changer la valeur de K ?",
        ],
        pari: {
          ...VF([
            ["la chauffer", true, "Oui : K est associée à l’équation de la réaction à une température donnée ; changer la température peut changer K."],
            ["la diluer dix fois", false, "K supposée dépendre de la concentration : les trois flacons ont des concentrations différentes et pourtant le même K.", "Les trois flacons de concentrations différentes avaient-ils le même K ou trois K différents ?"],
            ["y ajouter un catalyseur", false, "Catalyseur supposé déplacer l’équilibre : il accélère autant les deux sens et laisse K inchangé.", "Un catalyseur modifie-t-il l’état d’équilibre ou seulement la durée pour l’atteindre ?"],
          ]),
          apres: { html: "<p>Pour une équation donnée, K ne dépend que de la température : elle est indépendante des concentrations initiales.</p>" },
        },
      },
      {
        cle: "tau-k", beat: 3, scene: "solution",
        set: TR({ cv: 1, grad: 1, kl: 1, tb: 1, hl: 0, ph3: 1, tit: "Un seul K, trois taux d’avancement" }),
        sujet: "τ dépend à la fois de K et de l’état initial",
        text: [
          `Un même K pour les trois flacons, et pourtant τ vaut ${tau1P} %, ${tau2P} % et ${tau3P} %.`,
          "Pour une transformation donnée, le taux d’avancement final τ dépend…",
        ],
        pari: {
          ...VF([
            ["de K et de C", true, "Oui : τ dépend à la fois de la constante d’équilibre K et de l’état initial du système (ici C)."],
            ["de K seulement", false, `État initial supposé sans effet : ici K est le même pour les trois flacons, et τ prend trois valeurs différentes.`, "Dans ces trois flacons de même K, τ garde-t-il la même valeur ?"],
            ["de C seulement", false, "Nature de la réaction oubliée : à même concentration C, l’acide chlorhydrique et l’acide éthanoïque n’ont pas le même τ.", "Deux acides différents pris à la même concentration C ont-ils le même τ ?"],
          ]),
        },
      },
      {
        cle: "dilution-k", beat: 3, scene: "solution",
        set: TR({ cv: 1, grad: 1, kl: 1, tb: 1, hl: 2, dl: 1, chute: 0, remonte: 0, ph3: 1, tit: "À l’instant de la dilution" }),
        sujet: "Q_r à l’instant d’une dilution",
        text: [
          `On dilue ${fDil} fois le flacon du milieu, qui était à l’équilibre (Q_r = K).`,
          `À l’instant de la dilution, chaque concentration d’espèce dissoute est divisée par ${fDil}. Que vaut alors Q_r ?`,
        ],
        pari: {
          ...VF([
            [`K / ${fDil}`, true, `Oui : (1/${fDil})² au numérateur divisé par (1/${fDil}) au dénominateur multiplie Q_r par 1/${fDil}.`],
            ["K", false, "Q_r confondu avec K : K est la valeur à l’équilibre, tandis que Q_r se calcule dans l’état considéré, où chaque concentration vient d’être divisée.", "Q_r garde-t-il toujours la valeur K, ou se calcule-t-il avec les concentrations de l’instant ?"],
            [`${fDil} K`, false, `Quotient renversé : il y a deux concentrations en haut et une seule en bas, donc (1/${fDil})² / (1/${fDil}) = 1/${fDil}.`, "Combien de concentrations sont divisées par 10 au numérateur, et combien au dénominateur ?"],
          ]),
          reveal: [{ p: { chute: 1 }, d: 900 }],
        },
      },
      {
        cle: "dilution-sens", beat: 3, scene: "solution",
        set: TR({ cv: 1, grad: 1, kl: 1, tb: 1, hl: 2, dl: 1, chute: 1, remonte: 0, ph3: 1, tit: "Après la chute de *Q*_{r}" }),
        text: [
          `Juste après la dilution, Q_r vaut K / ${fDil}.`,
          "Que se passe-t-il ensuite ?",
        ],
        pari: {
          reveal: [{ p: { remonte: 1 }, d: 2400 }],
          apres: { html: `<p>C’est le passage de τ de ${tau2P} % à ${tau3P} % observé dans la leçon précédente. Prévoir le sens d’évolution par le calcul : leçon « évolution spontanée ».</p>` },
          ...BET([
            ["il remonte jusqu’à K : la réaction avance dans le sens direct", `Oui : le système évolue jusqu’à retrouver Q_r,éq = K, et τ monte de ${tau2P} % à ${tau3P} %.`, 1],
            [`il reste à K / ${fDil} : la réaction s’est arrêtée au premier équilibre`, "Équilibre lu comme un arrêt définitif : les deux réactions n’ont jamais cessé, le système évolue jusqu’à retrouver K."],
            ["il descend encore : la dilution fait reculer l’acide", `Dilution supposée faire reculer la dissociation : Q_r remonte vers K et τ augmente jusqu’à ${tau3P} %.`],
          ]),
        },
      },

      /* ===== 4. L'eau elle-même (4) ===== */
      {
        cle: "autoprotolyse", beat: 4, scene: "solution",
        set: ZO({ gros: 1, tr: 0, tit: "Deux molécules d’eau", sub: "l’eau est à la fois acide et base" }),
        sujet: "l’équation de l’autoprotolyse de l’eau",
        text: [
          "Même l’eau pure contient quelques ions : l’eau est un ampholyte (couples H₃O⁺/H₂O et H₂O/HO⁻).",
          "Une molécule d’eau cède un proton à une autre molécule d’eau. Quelle est l’équation de la réaction ?",
        ],
        pari: {
          ...VF([
            ["2 H₂O(l) ⇄ H₃O⁺(aq) + HO⁻(aq)", true, "Oui : une molécule d’eau cède H⁺ (devient HO⁻) et une seconde le capte (devient H₃O⁺)."],
            ["H₂O(l) ⇄ H⁺(aq) + HO⁻(aq)", false, "Demi-équation prise pour une équation de réaction : en solution aqueuse, H⁺ ne reste pas libre, une autre molécule H₂O le capte.", "Un proton H⁺ reste-t-il libre dans l’eau, ou est-il capté par une seconde molécule H₂O ?"],
            ["H₂O(l) ⇄ H₃O⁺(aq) + HO⁻(aq)", false, "Une seule molécule d’eau écrite à gauche : compte les atomes d’hydrogène, il en faut quatre de chaque côté.", "Combien d’atomes H y a-t-il dans H₃O⁺ + HO⁻ ?"],
          ]),
          reveal: [{ p: { tr: 1 }, d: 1500 }],
          apres: { html: "<p>Cette réaction très limitée est l’[[autoprotolyse|autoprotolyse de l’eau]].</p>" },
        },
      },
      {
        cle: "neutre", beat: 4, scene: "axe",
        set: AX({ p7: 0, dsol: 0, tit: "Le produit ionique de l’eau", sub: `échelle de pH à ${t25} °C` }),
        sujet: "K_e, pK_e et le pH d’une solution neutre à 25 °C",
        text: ["La constante d’équilibre associée à l’autoprotolyse de l’eau se nomme le [[produit-ionique|produit ionique de l’eau]], noté K_e."],
        deriv: [
          { tex: tx`K_e=[\mathrm{H_3O^+}][\mathrm{HO^-}]`, alt: "K_e = [H₃O⁺][HO⁻]", r: "Q_r,éq de 2 H₂O(l) ⇄ H₃O⁺(aq) + HO⁻(aq) : l’eau solvant n’y figure pas" },
          { tex: tx`K_e=${TS(KE,1)},\quad \mathrm{p}K_e=-\log K_e=${pkeS}`, alt: `K_e = ${keS} ; pK_e = −log K_e = ${pkeS}`, r: `valeurs usuelles données à ${t25} °C dans les sujets` },
          { tex: tx`[\mathrm{H_3O^+}]=[\mathrm{HO^-}]`, alt: "[H₃O⁺] = [HO⁻]", r: "définition d’une solution neutre, à toute température" },
        ],
        pari: {
          label: `Quel est le pH d’une solution neutre à ${t25} °C ?`,
          ...VF([
            [`${ph7}`, true, `Oui : [H₃O⁺]² = K_e = ${keCourt}, donc [H₃O⁺] = ${h7} mol·L⁻¹ et pH = ${ph7}.`],
            [`${pkeS}`, false, `pK_e pris tout entier pour le pH neutre : [H₃O⁺]² = K_e donne 2 pH = pK_e, il faut diviser ${pkeS} par 2.`, `Si [H₃O⁺]² = 10^(−${pkeS}), que vaut [H₃O⁺] ?`],
            [`${h7}`, false, `Concentration prise pour le pH : ${h7} mol·L⁻¹ est [H₃O⁺], et son pH vaut −log(${h7}) = ${ph7}.`, "Le pH est-il égal à [H₃O⁺] ou à −log[H₃O⁺] ?"],
          ]),
          reveal: [{ p: { p7: 1 }, d: 700 }],
        },
      },
      {
        cle: "nature", beat: 4, scene: "axe",
        set: AX({ p7: 1, dsol: 0, ph: NAT_EX.pH, tit: "Nature d’une solution aqueuse", sub: `comparer [H₃O⁺] et [HO⁻] à ${t25} °C` }),
        sujet: "déterminer la nature d’une solution par son pH",
        text: [
          `À ${t25} °C, une solution de pH ${natPh} contient [H₃O⁺] = ${natH} mol·L⁻¹ et [HO⁻] = K_e / [H₃O⁺] = ${natHo} mol·L⁻¹.`,
          "Cette solution est…",
        ],
        pari: {
          ...VF([
            ["acide : [HO⁻] < [H₃O⁺]", true, `Oui : [H₃O⁺] > [HO⁻], ce qui correspond à pH < ${ph7} à ${t25} °C.`],
            ["basique : elle contient des ions HO⁻", false, "Présence d’ions HO⁻ confondue avec basicité : toute solution aqueuse contient des HO⁻ (car [H₃O⁺][HO⁻] = K_e), seule la comparaison à [H₃O⁺] décide.", "Une solution acide peut-elle avoir [HO⁻] = 0 si [H₃O⁺][HO⁻] = K_e ?"],
            ["neutre : les deux ions y sont présents", false, "Coexistence des deux ions confondue avec neutralité : une solution n’est neutre que si [H₃O⁺] = [HO⁻].", "Compare 1,0 × 10^(−5) et 1,0 × 10^(−9) : les deux concentrations sont-elles égales ?"],
          ]),
          reveal: [{ p: { dsol: 1 }, d: 800 }],
          apres: { html: `<p>À ${t25} °C : solution acide si pH &lt; ${ph7}, neutre si pH = ${ph7}, basique si pH &gt; ${ph7}.</p>` },
        },
      },
      {
        cle: "ho-ph", beat: 4, scene: "axe",
        set: AX({ p7: 1, dsol: 1, ph: -1, tit: "Trouver le pH à partir de [HO⁻]", sub: `à ${t25} °C, p*K*_{e} = ${pkeS}` }),
        sujet: "calculer le pH à partir de [HO⁻]",
        text: [
          `À ${t25} °C, une solution aqueuse contient [HO⁻] = ${hoV} mol·L⁻¹.`,
          "Quel est son pH ?",
        ],
        verifie: {
          ...VF([
            [`${hoRep}`, true, `Oui : [H₃O⁺] = K_e / [HO⁻] = 5,0 × 10<sup>−12</sup> mol·L⁻¹, d’où pH = −log[H₃O⁺] = ${hoRep}.`],
            [`${hoFx1}`, false, `−log[HO⁻] pris directement pour le pH : ${hoFx1} serait un pH acide, alors qu’ici [HO⁻] = ${hoV} mol·L⁻¹ donne une solution basique ; passe par [H₃O⁺] = K_e / [HO⁻].`, "Avec [HO⁻] = 2,0 × 10^(−3) mol·L⁻¹, la solution est-elle acide ou basique ?"],
            [`${hoFx2}`, false, `Signe de log[HO⁻] perdu : pH = ${pkeS} + log[HO⁻], et log(${hoV}) vaut −${hoFx1}, donc ${pkeS} − ${hoFx1} = ${hoRep}.`, `log(${hoV}) est-il positif ou négatif ?`],
          ]),
          reveal: [{ p: { ph: HO_PH.rep }, d: 800 }],
          apres: { tex: [[tx`[\mathrm{H_3O^+}]=\dfrac{K_e}{[\mathrm{HO^-}]}\implies \mathrm{pH}=\mathrm{p}K_e+\log[\mathrm{HO^-}]`, "[H₃O⁺] = K_e / [HO⁻] ⇒ pH = pK_e + log[HO⁻]"]] },
        },
      },

      /* ===== 5. La constante d'acidité (5) ===== */
      {
        cle: "rappel", beat: 5, scene: "solution",
        set: BE({ nomx: "acide méthanoïque", ph: 0, tit: "Rappel à mi-parcours", sub: "on dilue dix fois la solution à l’équilibre" }),
        sujet: "K et τ après une dilution",
        text: [
          "Mi-parcours : c’est le bon moment pour une pause. Avant de repartir, un rappel.",
          `On dilue ${fDil} fois une solution d’acide méthanoïque à l’équilibre (à température constante). Au nouvel équilibre…`,
        ],
        verifie: {
          ...VF([
            ["K garde la même valeur et τ est plus grand", true, "Oui : K ne dépend pas de la concentration initiale, tandis que τ augmente quand on dilue un acide dans l’eau."],
            ["K et τ sont tous les deux plus grands", false, "K supposée varier avec la dilution : seule la température change K pour une équation donnée.", "La dilution à température constante change-t-elle K ?"],
            ["K et τ restent tous les deux inchangés", false, "τ supposé fixé par K seul : τ dépend à la fois de K et de la concentration initiale C, qui a changé.", "τ dépend-il de K seul, ou de K et de C ?"],
          ]),
        },
      },
      {
        cle: "ka-nom", beat: 5, scene: "solution",
        set: BE({ pv: QR_VAL.pH, ph: 1, tit: "La constante d’acidité *K*_{A}" }),
        sujet: "K_A et la relation pK_A = −log K_A",
        text: [
          "Pour la réaction d’un acide AH avec l’eau, la constante K s’appelle la [[constante-acidite|constante d’acidité]] K_A du couple AH/A⁻, et l’on pose [[pka|pK_A]] = −log K_A.",
          `Pour le couple CH₃COOH / CH₃COO⁻, K_A = ${kaEx}. Que vaut son pK_A ?`,
        ],
        tex: [
          [tx`K_A=\dfrac{[\mathrm{A^-}]_{\text{éq}}[\mathrm{H_3O^+}]_{\text{éq}}}{[\mathrm{AH}]_{\text{éq}}}`, "K_A = [A⁻]_éq [H₃O⁺]_éq / [AH]_éq"],
          [tx`\mathrm{p}K_A=-\log K_A`, "pK_A = −log K_A"],
        ],
        pari: {
          ...VF([
            [`${pkaEth}`, true, `Oui : pK_A = −log(${kaEx}) ≈ ${pkaEth}.`],
            [`${pkaNeg}`, false, `Signe moins oublié : log(${kaEx}) ≈ ${pkaNeg}, donc pK_A = −log K_A ≈ +${pkaEth}.`, "La définition de pK_A comporte-t-elle un signe moins devant log K_A ?"],
            [`${pkaFxExp}`, false, `Mantisse ignorée : tu n’as lu que l’exposant 5 dans ${kaEx}, or −log(1,6 × 10<sup>−5</sup>) = 5 − log 1,6 ≈ ${pkaEth}.`, `1,6 × 10^(−5) est-il égal à 1,0 × 10^(−5) ?`],
          ]),
          apres: { html: `<p>C’est avec cette constante du couple que la leçon précédente avait calculé le pH ${phC3}.</p>` },
        },
      },
      {
        cle: "comparer-acides", beat: 5, scene: "barres", set: BA({ montrer: 0 }),
        sujet: "comparer des acides de même concentration par leur pK_A",
        text: [
          `Trois solutions d’acides à la même concentration C = ${Cv} mol·L⁻¹ (tableau du sujet 2021) : HCOOH (pK_A = ${pkaMet}), C₆H₅COOH (${pkaBen}) et C₂H₅COOH (${pkaPro}).`,
          "Laquelle a le pH le plus bas ?",
        ],
        pari: {
          ...VF([
            ["HCOOH : son pK_A est le plus petit", true, `Oui : plus petit pK_A veut dire plus grand K_A, donc plus d’ions H₃O⁺ formés et pH plus bas.`],
            ["C₂H₅COOH : son pK_A est le plus grand", false, "K_A et pK_A comparés à l’envers : à cause du signe moins dans pK_A = −log K_A, le plus grand K_A correspond au plus petit pK_A.", "Quand K_A augmente, que fait pK_A = −log K_A ?"],
            ["les trois ont le même pH : même C", false, "Force et concentration confondues : à même concentration C, trois K_A différents donnent trois τ et trois pH différents.", "Même C mais trois constantes K_A différentes : l’avancement final est-il le même ?"],
          ]),
          reveal: [{ p: { montrer: 1 }, d: 900 }],
          apres: { html: "<p><b>À même concentration, l’acide le plus fort a le plus grand K_A, donc le plus petit pK_A.</b></p>" },
        },
      },
      {
        cle: "ka-tau", beat: 5, scene: "avancement", set: AV({ mode: "tau", cases: 8, tit: "Exprimer *K*_{A} avec *C* et *τ*" }),
        sujet: "K_A = C τ² / (1 − τ)",
        text: ["Sujets 2015, 2019 et 2021 : exprimer K_A (ou Q_r,éq) d’un acide dans l’eau en fonction de C et de τ."],
        deriv: [
          { tex: tx`[\mathrm{H_3O^+}]_{\text{éq}}=[\mathrm{A^-}]_{\text{éq}}=C\,\tau`, alt: "[H₃O⁺]_éq = [A⁻]_éq = C τ", r: "car τ = x_f / x_max = [H₃O⁺]_éq / C", p: { cases: 12 } },
          { tex: tx`[\mathrm{AH}]_{\text{éq}}=C-C\,\tau=C(1-\tau)`, alt: "[AH]_éq = C − C τ = C(1 − τ)", r: "l’acide restant à l’équilibre dans le tableau" },
        ],
        pari: {
          label: "Donc K_A en fonction de C et τ s’écrit…",
          ...VF([
            ["C τ² / (1 − τ)", true, "Oui : (C τ)² / (C(1 − τ)) = C τ² / (1 − τ), après simplification par C."],
            ["C τ²", false, "Acide supposé intact ([AH]_éq remplacé par C) : le dénominateur exact garde le facteur (1 − τ).", "Que vaut [AH]_éq : C, ou C(1 − τ) ?"],
            ["τ² / (1 − τ)", false, "Concentration C simplifiée deux fois : le numérateur contient C² et le dénominateur C, il reste donc un facteur C en haut.", "Que donne C² divisé par C ?"],
          ]),
          apres: {
            tex: [[tx`K_A=\dfrac{C\,\tau^2}{1-\tau}`, "K_A = C τ² / (1 − τ)"]],
            html: `<p>Sujet 2021, question 2.3 : avec C_a = ${Ca21} mol·L⁻¹ et τ = ${tau21P} %, on retrouve Q_r,éq ≈ ${qr21S}.</p>`,
          },
        },
      },
      {
        cle: "bases-comparer", beat: 5, scene: "solution",
        set: BE({ flacons: 2, ph: 0, ph2: 0 }),
        sujet: "comparer des bases de même concentration par le pK_A de leur couple",
        text: [
          `Deux solutions de bases à la même concentration C = ${Cv} mol·L⁻¹ : NH₃ (couple NH₄⁺/NH₃, pK_A = ${pkaNh4}) et CH₃COO⁻ (couple CH₃COOH/CH₃COO⁻, pK_A = ${pkaEth}).`,
          "Laquelle a le pH le plus élevé ?",
        ],
        pari: {
          ...VF([
            ["NH₃ : son couple a le plus grand pK_A", true, `Oui : plus le pK_A du couple est grand, plus la base conjuguée réagit avec l’eau (pH ${phNh3} contre ${phEthB}).`],
            ["CH₃COO⁻ : son couple a le plus petit pK_A", false, "Règle des acides recopiée sur les bases : un petit pK_A désigne un acide plus fort, donc une base conjuguée plus faible.", "Un petit pK_A favorise-t-il l’acide du couple ou sa base conjuguée ?"],
            ["les deux ont le même pH : même C", false, "Force et concentration confondues : les deux couples n’ont pas le même pK_A, les deux bases ne réagissent donc pas autant.", "Deux bases de couples différents réagissent-elles autant avec l’eau à même C ?"],
          ]),
          reveal: [{ p: { ph: 1, ph2: 1 }, d: 900 }],
        },
      },

      /* ===== 6. Qui l'emporte ? (7, dont 3 PC/SM sautables) ===== */
      {
        cle: "rapport", beat: 6, scene: "axe",
        set: AX({ p7: 1, dsol: 0, couple: "ethan", pk1: PKA.ethan, tit: "Relier le pH, le p*K*_{A} et le rapport des formes" }),
        sujet: "établir pH = pK_A + log([A⁻]_éq / [AH]_éq)",
        text: ["Sujet 2024, session normale, question 5-1 : isolons le rapport [A⁻]_éq / [AH]_éq dans l’expression de K_A."],
        deriv: [
          { tex: tx`\dfrac{[\mathrm{A^-}]_{\text{éq}}}{[\mathrm{AH}]_{\text{éq}}}=\dfrac{K_A}{[\mathrm{H_3O^+}]_{\text{éq}}}`, alt: "[A⁻]_éq / [AH]_éq = K_A / [H₃O⁺]_éq", r: "on divise K_A = [A⁻]_éq [H₃O⁺]_éq / [AH]_éq par [H₃O⁺]_éq" },
          { tex: tx`\log\!\left(\dfrac{[\mathrm{A^-}]_{\text{éq}}}{[\mathrm{AH}]_{\text{éq}}}\right)=\log K_A-\log[\mathrm{H_3O^+}]_{\text{éq}}`, alt: "log([A⁻]_éq / [AH]_éq) = log K_A − log[H₃O⁺]_éq", r: "logarithme d’un quotient" },
        ],
        pari: {
          label: "Comme pH = −log[H₃O⁺]_éq et pK_A = −log K_A, on obtient…",
          ...VF([
            ["pH = pK_A + log([A⁻]_éq / [AH]_éq)", true, "Oui : log K_A − log[H₃O⁺]_éq = −pK_A + pH, soit pH = pK_A + log([A⁻]_éq / [AH]_éq)."],
            ["pH = pK_A − log([A⁻]_éq / [AH]_éq)", false, "Échelle de pH lue à l’envers : quand le pH grandit, [H₃O⁺] diminue et c’est la base A⁻ qui gagne, le signe devant le log est donc +.", "Quand le pH augmente, le rapport [A⁻]_éq / [AH]_éq doit-il augmenter ou diminuer ?"],
            ["pH = log K_A + log([A⁻]_éq / [AH]_éq)", false, "Signe de pK_A perdu : log K_A vaut −pK_A ; en passant de l’autre côté de l’égalité, −pK_A devient +pK_A.", "Par quoi remplace-t-on log K_A : par pK_A ou par −pK_A ?"],
          ]),
        },
      },
      {
        cle: "egalite", beat: 6, scene: "axe",
        set: AX({ p7: 1, dsol: 0, couple: "ethan", pk1: PKA.ethan, eq50: 0, tit: "La frontière d’un couple" }),
        sujet: "à pH = pK_A, [A⁻]_éq = [AH]_éq",
        text: [
          "Dans une solution contenant le couple AH/A⁻, les deux formes ont la même concentration : [A⁻]_éq = [AH]_éq.",
          "Que vaut alors le pH ?",
        ],
        pari: {
          ...VF([
            ["pK_A", true, "Oui : [A⁻]_éq / [AH]_éq = 1 et log 1 = 0, donc pH = pK_A."],
            [`${ph7}`, false, `Frontière de l’eau confondue avec celle du couple : ${ph7} marque [H₃O⁺] = [HO⁻], tandis que [A⁻]_éq = [AH]_éq a lieu à pH = pK_A.`, "pH = 7 marque-t-il l’égalité [A⁻] = [AH], ou l’égalité [H₃O⁺] = [HO⁻] ?"],
            ["pK_A + 1", false, "Valeur de log 1 prise égale à 1 : comme 10⁰ = 1, log 1 vaut 0 et non 1.", "Que vaut log 1 (l’exposant de 10 qui donne 1) ?"],
          ]),
          reveal: [{ p: { eq50: 1 }, d: 700 }],
        },
      },
      {
        cle: "predom", beat: 6, scene: "axe",
        set: AX({ p7: 1, dsol: 0, couple: "ethan", pk1: PKA.ethan, ph: PREDOM.pH, rap: 0, tit: "Deux frontières distinctes" }),
        sujet: "distinguer nature de la solution et espèce prédominante",
        text: [
          `Un mélange d’acide éthanoïque et d’éthanoate de sodium (pK_A = ${pkaEth}) a un pH égal à ${phPred} (donnée de l’énoncé, à ${t25} °C).`,
          "Cette solution est…",
        ],
        pari: {
          ...VF([
            ["acide, et CH₃COO⁻ prédomine", true, `Oui : pH ${phPred} < ${ph7} donc la solution est acide ; et pH ${phPred} > ${pkaEth} donc la base CH₃COO⁻ prédomine.`],
            ["acide, donc CH₃COOH prédomine", false, `Nature de la solution prise pour la forme prédominante : « acide » se juge face à ${ph7}, mais le couple bascule à pK_A = ${pkaEth}.`, `Pour savoir quelle forme du couple l’emporte, compare-t-on ${phPred} à ${ph7} ou à ${pkaEth} ?`],
            ["basique, puisque CH₃COO⁻ prédomine", false, `Forme basique majoritaire prise pour une solution basique : la nature de la solution se juge uniquement face à ${ph7}, et ${phPred} < ${ph7}.`, `À ${t25} °C, une solution de pH ${phPred} est-elle en dessous ou au-dessus de ${ph7} ?`],
          ]),
          reveal: [{ p: { rap: 1 }, d: 700 }],
          apres: {
            tex: [[tx`\dfrac{[\mathrm{CH_3COO^-}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}}=10^{${TN(PREDOM.pH,1)}-${TN(PREDOM.pka,1)}}\approx ${rapPred}`, `[CH₃COO⁻]_éq / [CH₃COOH]_éq = 10^(${phPred} − ${pkaEth}) ≈ ${rapPred}`]],
            html: `<p>Il y a environ ${rapPred} fois plus d’ions CH₃COO⁻ que de molécules CH₃COOH dans cette solution pourtant acide.</p>`,
          },
        },
      },
      {
        cle: "domaines", beat: 6, scene: "axe", ctl: "axe_ph", needLabel: `Franchis ${pkaEth} dans les deux sens d’abord`,
        set: AX({ p7: 1, dsol: 1, couple: "ethan", pk1: PKA.ethan, dcp: 0, ph: PREDOM.pH, rap: 1, tit: "Le diagramme de prédominance" }),
        text: [
          `Fais glisser le pH de part et d’autre de pK_A = ${pkaEth} et regarde le rapport [CH₃COO⁻] / [CH₃COOH] passer par 1.`,
          "Les deux zones obtenues forment le [[predominance|diagramme de prédominance]] du couple.",
        ],
      },
      {
        cle: "distribution", beat: 6, scene: "axe", tag: "PC et SM",
        set: AX({ couple: "ethan", pk1: PKA.ethan, dcp: 1, ph: DIST_1.pH, dist: 0, pct: 0, tit: "Du rapport au pourcentage" }),
        sujet: "calculer ou lire le pourcentage d’une forme",
        text: [
          "Filières PC et SM. En SVT, le diagramme de distribution n’est pas à ton programme.",
          `À pH = ${phDist}, une unité au-dessus de pK_A (${pkaEth}), quelle part du couple est sous forme CH₃COO⁻ ?`,
        ],
        html: sautPcSm,
        pari: {
          ...VF([
            [`environ ${pDist} %`, true, `Oui : [A⁻] / [AH] = 10¹ = ${dNum}, soit ${dNum} parts sur ${dDen} : ${dNum}/${dDen} ≈ ${pDist} %.`],
            [`${pTout} %`, false, "Frontière lue comme une bascule totale : au-dessus du pK_A la base prédomine, mais il reste encore de la forme acide.", "À pH = pK_A + 1, le rapport [A⁻] / [AH] vaut 10 : reste-t-il 0 molécule AH ou 1 sur 11 ?"],
            [`environ ${pLin} %`, false, `Variation supposée linéaire : une unité de pH multiplie le rapport par ${dNum} (${dNum} sur ${dDen}), elle n’ajoute pas dix points.`, "À pH = pK_A + 1, que vaut [A⁻] / [AH] = 10^(pH − pK_A) ?"],
          ]),
          reveal: [{ p: { dist: 1, pct: 1 }, d: 900 }],
          apres: { html: "<p>Ces deux courbes en fonction du pH constituent le [[distribution|diagramme de distribution]] du couple.</p>" },
        },
      },
      {
        cle: "croisement", beat: 6, scene: "axe", tag: "PC et SM",
        set: AX({ couple: "metha", pk1: -1, dcp: 0, ph: -1, dist: 1, pct: 0, tit: "Lire le p*K*_{A} sur un diagramme de distribution", sub: "couple HCOOH / HCOO⁻" }),
        sujet: "lire le pK_A au croisement des courbes de distribution",
        text: [
          "Filières PC et SM. Voici le diagramme de distribution du couple HCOOH / HCOO⁻.",
          "Que vaut le pK_A de ce couple ?",
        ],
        html: sautPcSm,
        pari: {
          ...VF([
            [`${pkaMet}`, true, `Oui : les deux courbes se croisent à 50 % lorsque [HCOO⁻] = [HCOOH], c’est-à-dire en pH = pK_A = ${pkaMet}.`],
            [`${crNeutre}`, false, `Égalité des formes placée à la neutralité de l’eau : sur le graphique, le croisement à 50 % est entre 3 et 4, pas en ${crNeutre}.`, "À quelle abscisse pH les deux courbes se coupent-elles à 50 % ?"],
            [`${cr99}`, false, "pK_A lu là où une forme approche 100 % : le pK_A se lit au point d’intersection des deux courbes, à 50 %.", "À pH = pK_A, chaque forme représente-t-elle 50 % ou presque 100 % ?"],
          ]),
          reveal: [{ p: { pk1: PKA.metha, ph: PKA.metha }, d: 700 }],
        },
      },
      {
        cle: "predom-distrib", beat: 6, scene: "axe", tag: "PC et SM",
        set: AX({ couple: "ethan", pk1: PKA.ethan, dcp: 1, ph: PREDOM_DIST.ph1, ph2: PREDOM_DIST.ph2, dist: 0, pct: 0, tit: "Prédominer n’est pas être seul" }),
        sujet: "distinguer prédominance (> 50 %) et présence quasi exclusive",
        text: [
          `Couple CH₃COOH / CH₃COO⁻ (pK_A = ${pkaEth}) : l’ion CH₃COO⁻ prédomine à pH ${pdPh1} comme à pH ${pdPh2}.`,
          "Quelle est sa part dans chacune de ces deux solutions ?",
        ],
        html: sautPcSm,
        pari: {
          ...VF([
            [`environ ${pdP1} % et ${pdP2} %`, true, `Oui : juste au-dessus du pK_A (${pdPh1}), CH₃COO⁻ dépasse à peine la moitié ; trois unités au-dessus (${pdPh2}), il frôle 100 %.`],
            [`${pTout} % et ${pTout} %`, false, "Prédominance confondue avec présence unique : prédominer signifie seulement dépasser 50 %, pas atteindre 100 % dès qu’on franchit le pK_A.", `À pH ${pdPh1}, tout près de ${pkaEth}, les deux formes sont-elles presque égales ou l’acide a-t-il disparu ?`],
            [`environ ${pdL1} % et ${pdL2} %`, false, `Variation supposée linéaire (dix points par unité) : trois unités au-dessus du pK_A donnent un rapport 10³ = 1 000, soit ${pdP2} %.`, "Trois unités au-dessus du pK_A, que vaut le rapport [A⁻] / [AH] = 10³ ?"],
          ]),
          reveal: [{ p: { dist: 1, pct: 1 }, d: 900 }],
        },
      },

      /* ===== 7. Deux couples face à face (4) ===== */
      {
        cle: "deux-couples", beat: 7, scene: "bac", set: BC({ mode: "c2012" }),
        sujet: "exprimer K d’une réaction acido-basique avec K_A1 et K_A2",
        text: [
          `Sujet 2012, session normale, question 1-2 (${b12_2} pt) : CH₃COOH (pK_A1 = ${pkaEth}) réagit avec NH₃ (couple NH₄⁺/NH₃, pK_A2 = ${pkaNh4}).`,
        ],
        deriv: [
          { tex: tx`K=\dfrac{[\mathrm{CH_3COO^-}][\mathrm{NH_4^+}]}{[\mathrm{CH_3COOH}][\mathrm{NH_3}]}`, alt: "K = [CH₃COO⁻][NH₄⁺] / ([CH₃COOH][NH₃])", r: "expression de Q_r,éq associée à l’équation écrite" },
          { tex: tx`K=\dfrac{[\mathrm{CH_3COO^-}][\mathrm{H_3O^+}]}{[\mathrm{CH_3COOH}]}\times\dfrac{[\mathrm{NH_4^+}]}{[\mathrm{NH_3}][\mathrm{H_3O^+}]}`, alt: "K = ([CH₃COO⁻][H₃O⁺]/[CH₃COOH]) × ([NH₄⁺]/([NH₃][H₃O⁺]))", r: "on multiplie en haut et en bas par [H₃O⁺]_éq pour faire apparaître les deux couples" },
        ],
        pari: {
          label: "Donc K s’écrit…",
          ...VF([
            [`K_A1 / K_A2 ≈ ${k12S}`, true, `Oui : le premier facteur vaut K_A1 et le second 1 / K_A2, donc K = K_A1 / K_A2 = 10<sup>${pkaNh4} − ${pkaEth}</sup> ≈ ${k12S}.`],
            [`K_A2 / K_A1 ≈ ${k12Inv}`, false, "Rapport des K_A renversé : [NH₄⁺] / ([NH₃][H₃O⁺]) est l’inverse de K_A2, donc K_A2 est au dénominateur.", "Que vaut [NH₃][H₃O⁺] / [NH₄⁺] : K_A2 ou 1 / K_A2 ?"],
            [`pK_A2 − pK_A1 = ${k12Del}`, false, `Écart des pK_A pris pour K lui-même : ${k12Del} est log K, donc K = 10<sup>${k12Del}</sup> ≈ ${k12S}.`, "pK_A2 − pK_A1 est-il égal à K, ou à log K ?"],
          ]),
          apres: {
            tex: [[tx`K=\dfrac{K_{A1}}{K_{A2}}=10^{\mathrm{p}K_{A2}-\mathrm{p}K_{A1}}`, "K = K_A1 / K_A2 = 10^(pK_A2 − pK_A1)"]],
            html: "<p>Repère sûr : l’acide qui réagit à gauche de l’équation met son K_A au numérateur.</p>",
          },
        },
      },
      {
        cle: "k-total", beat: 7, scene: "avancement", set: AV({ mode: "c2012", cases: 12 }),
        sujet: "calculer τ à partir d’un grand K (mélange équimolaire)",
        text: [`Suite du sujet 2012, question 1-3 (${b12_3} pt) : on part de quantités égales n_1 = n_2 = n = ${n12S} mol, avec K ≈ ${k12S}.`],
        deriv: [
          { tex: tx`K=\dfrac{(x_\mathrm{f}/V)^2}{((n-x_\mathrm{f})/V)^2}=\dfrac{x_\mathrm{f}^2}{(n-x_\mathrm{f})^2}`, alt: "K = x_f² / (n − x_f)²", r: "les quatre espèces dissoutes partagent le même volume V, qui se simplifie" },
          { tex: tx`\dfrac{x_\mathrm{f}}{n-x_\mathrm{f}}=\sqrt{K}\approx ${rac12}`, alt: `x_f / (n − x_f) = √K ≈ ${rac12}`, r: "les quantités étant positives, on prend la racine carrée" },
        ],
        pari: {
          label: "Que vaut alors τ = x_f / n ?",
          ...VF([
            [`≈ ${tau12} : pratiquement totale`, true, `Oui : x_f / (n − x_f) = τ / (1 − τ) = √K, d’où τ = √K / (1 + √K) ≈ ${tau12}.`],
            [`≈ ${tau12Demi} : la double flèche partage en deux`, false, "Double flèche lue comme un partage moitié-moitié : τ ne se lit pas sur ⇄, il se calcule à partir de K.", `Si x_f / (n − x_f) ≈ ${rac12}, x_f est-il égal à n − x_f ou beaucoup plus grand ?`],
            [`≈ ${tau12Inv} : le rapport vaut 1 / √K`, false, `Rapport inversé : √K vaut x_f / (n − x_f) ≈ ${rac12}, c’est donc n − x_f qui est très petit devant x_f.`, `Si x_f est ${rac12} fois plus grand que n − x_f, τ = x_f / n est-il proche de 1 ou de 0 ?`],
          ]),
          apres: {
            tex: [[tx`\tau=\dfrac{\sqrt{K}}{1+\sqrt{K}}\approx ${TN(C12.tau,2)}`, `τ = √K / (1 + √K) ≈ ${tau12}`]],
            html: `<p>C’est le τ ≈ ${tau12} cité sans démonstration dans la leçon précédente.</p>`,
          },
        },
      },
      {
        cle: "k-proches", beat: 7, scene: "axe",
        set: AX({ couple: "deux", pk1: PKA.benzo, pk2: PKA.ethan, tit: "Deux couples de p*K*_{A} proches", sub: "CH₃COOH + C₆H₅COO⁻ ⇄ CH₃COO⁻ + C₆H₅COOH" }),
        sujet: "interpréter une constante K voisine de 1",
        text: [
          `On fait maintenant réagir CH₃COOH (pK_A1 = ${pkaEth}) avec l’ion benzoate C₆H₅COO⁻ (pK_A2 = ${pkaBen}).`,
          `Ici K = 10<sup>${pkaBen} − ${pkaEth}</sup> ≈ ${kPr}. Cette transformation…`,
        ],
        pari: {
          ...VF([
            ["est limitée : ni totale, ni négligeable", true, `Oui : avec K ≈ ${kPr}, les quatre espèces coexistent en proportions comparables à l’équilibre.`],
            ["est totale : un acide rencontre une base", false, "Toute réaction acide-base supposée totale : seule une grande constante K (en pratique K > 10⁴) rend la transformation quasi totale.", `K ≈ ${kPr} est-il très grand devant 1 ?`],
            ["n’a presque pas lieu : K est inférieur à 1", false, `K < 1 lu comme « rien ne réagit » : pour des quantités égales, √K / (1 + √K) donne τ ≈ ${tauPr} (${tauPrPct} % des réactifs réagissent).`, `Avec √${kPr} = 0,50, que donne √K / (1 + √K) ?`],
          ]),
          apres: { html: `<p>Pour un mélange initial équimolaire, τ = √K / (1 + √K) ≈ ${tauPr} : un tiers des réactifs a réagi.</p>` },
        },
      },
      {
        cle: "ph-melange", beat: 7, scene: "axe",
        set: AX({ couple: "deux", pk1: PKA.benzo, pk2: PKA.ethan, ph: -1, tit: "pH d’un mélange équimolaire de deux couples" }),
        sujet: "établir le pH d’un mélange équimolaire A₁H + A₂⁻",
        text: ["Forme du sujet 2023, question 2.3 : dans ce mélange parti de quantités égales de CH₃COOH et de C₆H₅COO⁻, cherchons le pH à l’équilibre."],
        deriv: [
          {
            tex: tx`\mathrm{pH}=\mathrm{p}K_{A1}+\log\dfrac{[\mathrm{CH_3COO^-}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}}`,
            alt: "pH = pK_A1 + log([CH₃COO⁻]_éq/[CH₃COOH]_éq)",
            r: "et de même pH = pK_A2 + log([C₆H₅COO⁻]_éq / [C₆H₅COOH]_éq) dans le même bécher",
          },
          {
            tex: tx`\dfrac{[\mathrm{CH_3COO^-}]_{\text{éq}}}{[\mathrm{CH_3COOH}]_{\text{éq}}}=\dfrac{[\mathrm{C_6H_5COOH}]_{\text{éq}}}{[\mathrm{C_6H_5COO^-}]_{\text{éq}}}`,
            alt: "[CH₃COO⁻]_éq / [CH₃COOH]_éq = [C₆H₅COOH]_éq / [C₆H₅COO⁻]_éq",
            r: "quantités initiales égales (n − x_f et x_f) : les deux rapports sont inverses, leurs log sont opposés",
          },
        ],
        pari: {
          label: "En additionnant les deux égalités, le pH du mélange vaut…",
          ...VF([
            [`(pK_A1 + pK_A2) / 2 = ${melRep}`, true, `Oui : les deux logarithmes opposés s’annulent, d’où 2 pH = pK_A1 + pK_A2 et pH = ${melRep}.`],
            [`(pK_A1 − pK_A2) / 2 = ${melDiff}`, false, "Différence utilisée à la place de la somme : la différence des pK_A sert dans log K, tandis qu’ici on additionne les deux relations de pH.", `Un pH de ${melDiff} est-il cohérent pour un mélange de couples autour de ${pkaBen} et ${pkaEth} ?`],
            [`pK_A1 + pK_A2 = ${melSom}`, false, "Division par 2 oubliée : additionner pH = … et pH = … donne 2 pH à gauche, pas pH.", "Que donne pH + pH dans le membre de gauche ?"],
          ]),
          reveal: [{ p: { ph: MELANGE.rep }, d: 800 }],
          apres: { html: "<p>Attention : cette relation ne s’applique que si l’acide 1 et la base 2 ont été introduits en quantités égales.</p>" },
        },
      },

      /* ===== 8. L'indicateur coloré (2) ===== */
      {
        cle: "indicateur", beat: 8, scene: "axe",
        set: AX({ couple: "hel", pk1: PKA.hel, b0: ENIGME.zoneBas, b1: ENIGME.zoneHaut, ph: ENIGME.phFlacon, sw: 0, dcp: 0, tit: "L’indicateur est un couple HIn / In⁻" }),
        sujet: "forme prédominante d’un indicateur coloré",
        text: [
          "Un [[indicateur|indicateur coloré]] acido-basique est un couple HIn / In⁻ dont les deux formes n’ont pas la même teinte.",
          `Pour l’hélianthine, pK_A ≈ ${pkaHel}, HIn est rouge et In⁻ est jaune. Dans le flacon de l’énigme, à pH ${phFl}, quelle forme prédomine ?`,
        ],
        pari: {
          ...VF([
            ["In⁻", true, `Oui : pH ${phFl} > ${pkaHel}, donc la forme basique In⁻ prédomine et donne au flacon sa teinte jaune.`],
            ["HIn", false, `Nature acide de la solution confondue avec la forme HIn : le couple de l’hélianthine bascule autour de son pK_A (${pkaHel}), et ${phFl} > ${pkaHel}.`, `Compare le pH (${phFl}) au pK_A de l’hélianthine (${pkaHel}) : lequel est le plus grand ?`],
            ["autant de HIn que de In⁻", false, `Égalité des formes placée au mauvais pH : [HIn] = [In⁻] n’a lieu qu’en pH = pK_A ≈ ${pkaHel}.`, "À quel pH a-t-on autant de HIn que de In⁻ ?"],
          ]),
          reveal: [{ p: { dcp: 1, sw: 1 }, d: 800 }],
        },
      },
      {
        cle: "zone-virage", beat: 8, scene: "axe",
        set: AX({ couple: "bbt", b0: INDICATEURS.bbt.zone[0], b1: INDICATEURS.bbt.zone[1], ph: ENIGME.phFlacon, sw: 0, dcp: 0, tit: "La zone de virage d’un indicateur" }),
        sujet: "exploiter la zone de virage d’un indicateur coloré",
        text: [
          "L’intervalle de pH où la teinte bascule d’une forme à l’autre est la [[virage|zone de virage]], située autour du pK_A de l’indicateur.",
          `Le BBT (sujet 2018) a sa forme acide jaune, sa forme basique bleue et sa zone de virage entre ${zBbtB} et ${zBbtH}. À pH ${phFl}, quelle est sa teinte ?`,
        ],
        pari: {
          ...VF([
            ["jaune", true, `Oui : ${phFl} est en dessous de ${zBbtB}, la forme acide du BBT impose donc sa teinte jaune.`],
            ["bleue", false, `Tous les indicateurs supposés virer au même pH : la zone du BBT (${zBbtB} – ${zBbtH}) est au-dessus de ${phFl}, c’est donc sa forme acide qui l’emporte.`, `Le pH ${phFl} est-il inférieur à ${zBbtB} ou supérieur à ${zBbtH} ?`],
            ["intermédiaire", false, `Teinte sensible étendue hors de la zone : on ne voit la teinte intermédiaire qu’entre ${zBbtB} et ${zBbtH}.`, `Le pH ${phFl} appartient-il à l’intervalle [${zBbtB} ; ${zBbtH}] ?`],
          ]),
          reveal: [{ p: { dcp: 1, sw: 1 }, d: 800 }],
          apres: { html: '<p class="small">Choisir l’indicateur coloré d’un dosage : leçon « dosage acido-basique ».</p>' },
        },
      },

      /* ===== 9. Retour à l'énigme (2) ===== */
      {
        cle: "retour", beat: 9, scene: "axe",
        set: AX({ p7: 1, dsol: 1, couple: "hel", pk1: PKA.hel, b0: ENIGME.zoneBas, b1: ENIGME.zoneHaut, dcp: 1, ph: ENIGME.phFlacon, sw: 1, tit: "Deux frontières sur l’axe des pH" }),
        text: () => [
          rappelHelianthine(),
          `À pH ${phFl} < ${ph7} (frontière de l’eau, K_e), la solution est acide ; mais à pH ${phFl} > ${zHelH} (au-dessus de la zone de l’hélianthine, pK_A ≈ ${pkaHel}), In⁻ prédomine et la colore en jaune.`,
          { t: `Un indicateur compare le pH à son propre pK_A, pas à ${ph7}.`, fort: true },
        ],
      },
      {
        cle: "retour-transfert", beat: 9, scene: "axe",
        set: AX({ p7: 1, dsol: 0, couple: "phph", b0: INDICATEURS.phph.zone[0], b1: INDICATEURS.phph.zone[1], dcp: 0, ph: PH_TRANSFERT, sw: 0, tit: "Transfert : la phénolphtaléine" }),
        sujet: "teinte d’un indicateur dans une solution basique sous sa zone",
        text: [
          `La phénolphtaléine (tableau du sujet 2020) est incolore sous sa zone de virage (${zPhB} – ${zPhH}) et rose au-dessus.`,
          `On en verse deux gouttes dans une solution basique de pH ${phTr}. Elle y est…`,
        ],
        verifie: {
          ...VF([
            ["incolore", true, `Oui : la solution est basique (${phTr} > ${ph7}), mais ${phTr} < ${zPhB}, sous la zone de virage de la phénolphtaléine.`],
            ["rose", false, `Basicité de la solution confondue avec la forme basique de l’indicateur : « basique » se juge face à ${ph7}, mais la teinte rose n’apparaît qu’au-dessus de ${zPhB}.`, `Compare pH = ${phTr} à la borne basse ${zPhB} de la zone de virage.`],
            ["rose pâle", false, `Teinte intermédiaire placée hors de la zone : ${phTr} est strictement sous ${zPhB}, la forme acide incolore domine nettement.`, `Le pH ${phTr} est-il dans la zone [${zPhB} ; ${zPhH}] ou en dessous ?`],
          ]),
          reveal: [{ p: { dsol: 1, dcp: 1, sw: 1 }, d: 800 }],
        },
      },

      /* ===== 10. Au bac (6) ===== */
      {
        cle: "bac", beat: 10, scene: "bac", set: BC({ mode: "s2022", n: 0 }),
        sujet: "premier geste pour exprimer Q_r,éq (sujet 2022)",
        text: [
          `Bac PC 2022, session normale, exercice 1, partie 2, §1 (la suite du sujet commencé en C3) : acide propanoïque, C_a = ${Ca22} mol·L⁻¹ et pH = ${ph22}.`,
          `Question 1.3 (${b22_3} pt) : exprimer Q_r,éq en fonction de C_a et [H₃O⁺]_éq, puis calculer sa valeur. Quel est ton premier geste ?`,
        ],
        verifie: {
          ...VF([
            ["écrire Q_r,éq sur l’équation, puis lire le tableau", true, "Oui : on pose la définition sur l’équation 1.1, puis on remplace chaque concentration à l’équilibre à l’aide du tableau."],
            ["poser d’emblée Q_r,éq = [H₃O⁺]²_éq / C_a", false, "Acide supposé intact sans passer par le tableau : l’énoncé demande l’expression exacte, qui garde C_a − [H₃O⁺]_éq au dénominateur.", "Dans le tableau d’avancement, que vaut [C₂H₅COOH]_éq en fonction de C_a et [H₃O⁺]_éq ?"],
            [`poser pK_A = pH = ${ph22}, puis calculer 10<sup>−p<i>K</i><sub>A</sub></sup>`, false, "pH de la solution pris pour le pK_A du couple : le pH dépend de C_a, tandis que le pK_A se déduira de Q_r,éq à la question suivante.", "Le pH d’un acide seul dans l’eau est-il égal au pK_A de son couple ?"],
          ]),
          reveal: [{ p: { n: 1 }, d: 700 }],
        },
      },
      {
        cle: "bac-ed", beat: 10, scene: "bac", set: BC({ mode: "s2022", n: 1 }),
        text: [
          `Voici la rédaction complète de la question 1.3 (${b22_3} pt), avec la pensée de celui qui l’écrit.`,
          "L’expression littérale précède toujours l’application numérique.",
        ],
        deriv: [
          { tex: tx`Q_{r,\text{éq}}=\dfrac{[\mathrm{C_2H_5COO^-}]_{\text{éq}}[\mathrm{H_3O^+}]_{\text{éq}}}{[\mathrm{C_2H_5COOH}]_{\text{éq}}}`, alt: "Q_r,éq = [C₂H₅COO⁻]_éq [H₃O⁺]_éq / [C₂H₅COOH]_éq", r: "je pars de l’équation 1.1 : produits sur réactifs, sans l’eau solvant", p: { n: 1 } },
          { tex: tx`[\mathrm{C_2H_5COOH}]_{\text{éq}}=C_a-[\mathrm{H_3O^+}]_{\text{éq}}`, alt: "[C₂H₅COOH]_éq = C_a − [H₃O⁺]_éq", r: "et [C₂H₅COO⁻]_éq = [H₃O⁺]_éq sur la ligne d’équilibre du tableau", p: { n: 2 } },
          { tex: tx`Q_{r,\text{éq}}=\dfrac{[\mathrm{H_3O^+}]_{\text{éq}}^2}{C_a-[\mathrm{H_3O^+}]_{\text{éq}}}`, alt: "Q_r,éq = [H₃O⁺]²_éq / (C_a − [H₃O⁺]_éq)", r: "j’écris l’expression littérale exacte demandée par l’énoncé", p: { n: 3 } },
          { tex: tx`Q_{r,\text{éq}}=\dfrac{(10^{-${TN(S22.pH,1)}})^2}{${TS(S22.Ca,0)}-10^{-${TN(S22.pH,1)}}}\approx ${TS(S22.qr,2)}`, alt: `[H₃O⁺]_éq ≈ ${h22} mol·L⁻¹ ⇒ Q_r,éq ≈ ${qr22}`, r: `avec [H₃O⁺]_éq = 10^(−${ph22}) ≈ ${h22} mol·L⁻¹ ; Q_r,éq est sans unité`, p: { n: 4 } },
        ],
      },
      {
        cle: "bac-pka", beat: 10, scene: "bac", set: BC({ mode: "s2022", n: 4 }),
        sujet: "déduire pK_A de Q_r,éq (sujet 2022)",
        text: [
          `Question 1.4 (${b22_4} pt) : en déduire la valeur du pK_A du couple C₂H₅COOH(aq) / C₂H₅COO⁻(aq).`,
          "Que vaut ce pK_A ?",
        ],
        pari: {
          ...VF([
            [`${pka22}`, true, `Oui : pour la réaction de l’acide avec l’eau, K_A = Q_r,éq ≈ ${qr22}, d’où pK_A = −log K_A ≈ ${pka22}.`],
            [`${ph22}`, false, `pK_A confondu avec le pH de la solution : ${ph22} est le pH mesuré, alors que pK_A = −log K_A.`, "Quelle relation définit pK_A à partir de K_A ?"],
            [`${pka22Neg}`, false, `Signe moins oublié dans pK_A = −log K_A : log(${qr22}) est négatif, son opposé vaut +${pka22}.`, "Que vaut −log(1,28 × 10^(−5)) : un nombre positif ou négatif ?"],
          ]),
          reveal: [{ p: { n: 5 }, d: 700 }],
          apres: {
            html: `<div class="ab-copie"><p><b>1.3 Littéral.</b> Q_r,éq = [C₂H₅COO⁻]_éq [H₃O⁺]_éq / [C₂H₅COOH]_éq = [H₃O⁺]²_éq / (C_a − [H₃O⁺]_éq).</p><p><b>1.3 Numérique.</b> Avec [H₃O⁺]_éq = 10<sup>−${ph22}</sup> ≈ ${h22} mol·L⁻¹, Q_r,éq ≈ ${qr22}.</p><p><b>1.4 Identification.</b> Pour la réaction de l’acide avec l’eau, K_A = Q_r,éq.</p><p><b>1.4 Calcul.</b> pK_A = −log K_A = −log(${qr22}) ≈ ${pka22}.</p></div><p class="small">Barème imprimé du sujet 2022 : ${b22_3} + ${b22_4} pt. Consigne imprimée : « On donnera les expressions littérales avant de passer aux applications numériques. »</p>`,
          },
        },
      },
      {
        cle: "bac-2a", beat: 10, scene: "bac", set: BC({ mode: "s2020", n: 0 }),
        sujet: "calculer [HO⁻]_éq depuis le pH (sujet 2020)",
        text: [
          `À toi. Bac PC 2020, session normale, exercice I, partie 1, §2 : solution d’ammoniac NH₃, C_b = ${Cb20} mol·L⁻¹, pH = ${ph20}, K_e = ${keCourt} à ${t25} °C.`,
          `Question 2.2 (${b20_2} pt) : calculer la concentration [HO⁻]_éq.`,
        ],
        pari: {
          ...VF([
            [`10<sup>pH − ${pkeS}</sup> ≈ ${ho20} mol·L⁻¹`, true, `Oui : [HO⁻]_éq = K_e / [H₃O⁺]_éq = 10<sup>−${pkeS}</sup> / 10<sup>−${ph20}</sup> ≈ ${ho20} mol·L⁻¹.`],
            [`10<sup>−pH</sup> ≈ ${h3o20} mol·L⁻¹`, false, `[H₃O⁺]_éq calculée à la place de [HO⁻]_éq : 10<sup>−pH</sup> donne [H₃O⁺]_éq, il reste à utiliser [HO⁻]_éq = K_e / [H₃O⁺]_éq.`, "Que donne 10^(−pH) : [H₃O⁺]_éq ou [HO⁻]_éq ?"],
            [`K_e / pH ≈ ${surPh20} mol·L⁻¹`, false, "pH pris pour une concentration dans K_e / [H₃O⁺] : il faut diviser K_e par 10<sup>−pH</sup>, pas par pH.", "Dans K_e = [H₃O⁺][HO⁻], divise-t-on K_e par pH ou par 10^(−pH) ?"],
          ]),
          reveal: [{ p: { n: 1 }, d: 700 }],
        },
      },
      {
        cle: "bac-2b", beat: 10, scene: "bac", set: BC({ mode: "s2020", n: 1 }),
        sujet: "calculer τ d’une base avec [HO⁻]_éq (sujet 2020)",
        text: [
          `Question 2.3 (${b20_3} pt) : calculer le taux d’avancement final τ de la réaction NH₃(aq) + H₂O(l) ⇄ NH₄⁺(aq) + HO⁻(aq).`,
          "Que vaut τ ?",
        ],
        pari: {
          ...VF([
            [`[HO⁻]_éq / C_b ≈ ${tau20}`, true, `Oui : la base produit un ion HO⁻ par molécule ayant réagi, donc x_f = [HO⁻]_éq V et τ = [HO⁻]_éq / C_b ≈ ${tau20}.`],
            [`[H₃O⁺]_éq / C_b ≈ ${tauH20}`, false, "Formule d’un acide appliquée à une base : ici le produit formé à chaque avancement x est HO⁻, pas H₃O⁺.", "Quel ion apparaît à droite de l’équation NH₃ + H₂O ⇄ NH₄⁺ + HO⁻ ?"],
            [`C_b / [HO⁻]_éq ≈ ${tauInv20}`, false, "Rapport inversé : un taux d’avancement vérifie toujours τ ≤ 1, x_f est au numérateur.", "Un taux d’avancement final τ peut-il valoir 25 ?"],
          ]),
          reveal: [{ p: { n: 2 }, d: 700 }],
        },
      },
      {
        cle: "bac-2c", beat: 10, scene: "bac", set: BC({ mode: "s2020", n: 2 }),
        sujet: "déduire pK_A du Q_r,éq d’une base avec l’eau (sujet 2020)",
        text: [`Questions 2.4 (${b20_4} pt) et 2.5 (${b20_5} pt) : après vérification de Q_r,éq, en déduire le pK_A du couple NH₄⁺ / NH₃.`],
        deriv: [
          { tex: tx`Q_{r,\text{éq}}=\dfrac{[\mathrm{HO^-}]_{\text{éq}}^2}{C_b-[\mathrm{HO^-}]_{\text{éq}}}\approx ${TS(S20.qr,2)}`, alt: `Q_r,éq = [HO⁻]²_éq / (C_b − [HO⁻]_éq) ≈ ${qr20}`, r: "question 2.4 : Q_r,éq = [NH₄⁺][HO⁻] / [NH₃] de la base NH₃ avec l’eau", p: { n: 3 } },
          { tex: tx`K_A(\mathrm{NH_4^+/NH_3})=\dfrac{[\mathrm{NH_3}][\mathrm{H_3O^+}]}{[\mathrm{NH_4^+}]}`, alt: "K_A(NH₄⁺/NH₃) = [NH₃][H₃O⁺] / [NH₄⁺]", r: "définition : le K_A d’un couple est toujours celui de son acide (NH₄⁺) avec l’eau" },
        ],
        pari: {
          label: "Question 2.5 : que vaut pK_A(NH₄⁺ / NH₃) ?",
          ...VF([
            [`${pka20} : car K_A = K_e / Q_r,éq`, true, `Oui : K_A × Q_r,éq = [H₃O⁺][HO⁻] = K_e, donc K_A = K_e / Q_r,éq ≈ ${ka20} et pK_A ≈ ${pka20}.`],
            [`${pkaQr20} : car K_A = Q_r,éq`, false, "Q_r,éq d’une base avec l’eau pris pour K_A : Q_r,éq concerne NH₃ + H₂O, alors que K_A concerne NH₄⁺ + H₂O ; leur produit vaut K_e.", "Que donne le produit K_A × Q_r,éq quand on multiplie les deux fractions ?"],
            [`${ph20} : car pK_A = pH`, false, "pH de la solution pris pour le pK_A du couple : le pH dépend de C_b, tandis que pK_A = −log K_A.", "Le pK_A d’un couple est-il égal au pH de la solution ?"],
          ]),
          reveal: [{ p: { n: 4 }, d: 700 }],
          apres: {
            html: `<div class="ab-copie"><p><b>2.2 Ions HO⁻.</b> [HO⁻]_éq = K_e / [H₃O⁺]_éq = 10<sup>pH − ${pkeS}</sup> ≈ ${ho20} mol·L⁻¹.</p><p><b>2.3 Taux τ.</b> τ = x_f / x_max = [HO⁻]_éq / C_b ≈ ${tau20}.</p><p><b>2.4 Quotient.</b> Q_r,éq = [HO⁻]²_éq / (C_b − [HO⁻]_éq) ≈ ${qr20}.</p><p><b>2.5 Constante pK_A.</b> K_A = K_e / Q_r,éq ≈ ${ka20}, d’où pK_A = −log K_A ≈ ${pka20}.</p></div><p class="small">Barème imprimé du sujet 2020 : ${b20_2} + ${b20_3} + ${b20_4} + ${b20_5} pt.</p>`,
          },
        },
      },

      /* ===== 11. Bilan (4) ===== */
      {
        cle: "q1", beat: 11, scene: "quiz", set: { qi: 0, rv: 0 },
        sujet: "sens du rapport K_A1 / K_A2 dans une copie",
        text: [
          `Sujet 2023, §2, question 2.2 : CH₃COOH (pK_A1 = ${pka23_1}) réagit avec HCOO⁻ (pK_A2 = ${pka23_2}).`,
          `Une copie écrit : K = K_A2 / K_A1 = 10<sup>${pka23_1} − ${pka23_2}</sup> ≈ ${k23Inv}, réaction quasi totale. Quelle est son erreur ?`,
        ],
        verifie: {
          ...VF([
            [`rapport renversé : K = K_A1 / K_A2 ≈ ${k23S}`, true, `Oui : l’acide à gauche est CH₃COOH, donc K = K_A1 / K_A2 = 10<sup>${pka23_2} − ${pka23_1}</sup> ≈ ${k23S}.`],
            ["aucune : pour cette équation, K = K_A2 / K_A1", false, "Rapport des K_A accepté à l’envers : CH₃COOH est au dénominateur de Q_r,éq, c’est donc K_A1 qui vient au numérateur.", "Quel est l’acide qui cède son proton à gauche de l’équation : CH₃COOH ou HCOOH ?"],
            ["il fallait multiplier : K = K_A1 × K_A2", false, "Produit écrit au lieu d’un quotient : dans K_A1 × K_A2, [H₃O⁺]² resterait au numérateur au lieu de se simplifier.", "Comment simplifie-t-on [H₃O⁺] entre deux constantes d’acidité : par un produit ou par un quotient ?"],
          ]),
          reveal: [{ p: { rv: 1 }, d: 1200 }],
        },
      },
      {
        cle: "q2", beat: 11, scene: "quiz", set: { qi: 1, rv: 0 },
        sujet: "convertir avant de comparer K_A et pK_A",
        text: [
          `Acide benzoïque : K_A = ${kaBenS}. Acide éthanoïque : pK_A = ${pkaEth}.`,
          "À même concentration, lequel est l’acide le plus fort ?",
        ],
        verifie: {
          ...VF([
            [`l’acide benzoïque : pK_A = ${pkaBenCalc} < ${pkaEth}`, true, `Oui : −log(${kaBenS}) ≈ ${pkaBenCalc} < ${pkaEth}, l’acide benzoïque a le plus petit pK_A.`],
            [`l’acide éthanoïque : ${pkaEth} > ${kaBenS}`, false, "Un K_A et un pK_A comparés directement sans conversion : il faut d’abord exprimer les deux couples avec la même grandeur.", "Peut-on comparer directement K_A et pK_A sans calculer −log K_A ?"],
            ["l’acide éthanoïque : son pK_A est plus grand", false, "Échelle des pK_A lue à l’envers : l’acide le plus fort a le plus grand K_A, donc le plus petit pK_A.", "L’acide le plus fort a-t-il le plus grand pK_A ou le plus petit pK_A ?"],
          ]),
          reveal: [{ p: { rv: 1 }, d: 1200 }],
        },
      },
      {
        cle: "q3", beat: 11, scene: "quiz", set: { qi: 2, rv: 0 },
        sujet: "effet de la dilution selon l’équation de la réaction",
        text: [
          "Reprends la réaction entre deux couples : CH₃COOH(aq) + C₆H₅COO⁻(aq) ⇄ CH₃COO⁻(aq) + C₆H₅COOH(aq), à l’équilibre.",
          `On dilue ce mélange ${fDil} fois. Que fait le taux d’avancement final τ ?`,
        ],
        verifie: {
          ...VF([
            ["il ne change pas", true, `Oui : deux concentrations en haut et deux en bas sont divisées par ${fDil}, donc Q_r reste égal à K et τ ne bouge pas.`],
            ["il augmente", false, `Règle de l’acide dans l’eau généralisée à tort : ici (1/${fDil})² / (1/${fDil})² = 1, Q_r ne chute pas lors de la dilution.`, "Combien d’espèces dissoutes figurent au numérateur et au dénominateur de Q_r ici ?"],
            ["il diminue", false, "Dilution supposée faire reculer l’équilibre : Q_r garde exactement la valeur K, aucun sens ne l’emporte.", "Que devient Q_r quand les quatre concentrations sont divisées par 10 ?"],
          ]),
          reveal: [{ p: { rv: 1 }, d: 1200 }],
        },
      },
      {
        cle: "fin", beat: 11, scene: "end", seq: [{ p: { n: 5 }, d: 3200, w: 300 }],
        text: ["Fin de la séance."],
        html: () => profileHTML(),
      },
    ];

    STEPS.forEach((st) => {
      if (st.ctl === "virage") st.need = () => !!(S.abVirBas && S.abVirHaut);
      if (st.ctl === "axe_ph") st.need = () => !!(S.abDomBas && S.abDomHaut);
    });

    /* Espaces insécables avant % et unités */
    const pct = (s) => typeof s === "string"
      ? s.replace(/(\d) %/g, "$1\u202f%").replace(/(\d|<\/sup>) (mol·L⁻¹|mol|mL|L|pt|°C)(?=[\s.,;:)<]|$)/g, "$1\u00a0$2")
      : s;
    const pctP = (p) => typeof p === "string" ? pct(ix(p)) : p && typeof p === "object" ? { ...p, t: pct(ix(p.t)) } : p;
    const pctOpts = (P) => {
      if (!P) return;
      if (P.opts) P.opts.forEach((o) => { o.t = pct(o.t); o.fb = pct(o.fb); o.indice = pct(o.indice); });
      if (P.label) P.label = `<span>${pct(ix(P.label))}</span>`;
      if (P.apres) {
        const d = Object.getOwnPropertyDescriptor(P.apres, "html");
        if (d && !d.get && typeof P.apres.html === "string") P.apres.html = pct(ix(P.apres.html));
        else if (d && d.get) {
          const f = d.get;
          Object.defineProperty(P.apres, "html", { get: () => pct(ix(f())), enumerable: true, configurable: true });
        }
      }
    };
    STEPS.forEach((st) => {
      if (typeof st.text === "function") {
        const f = st.text;
        st.text = () => { const v = f(); return (Array.isArray(v) ? v : [v]).filter((x) => x != null && x !== "").map(pctP); };
      } else {
        st.text = (Array.isArray(st.text) ? st.text : [st.text]).filter((x) => x != null && x !== "").map(pctP);
      }
      if (st.deriv) st.deriv.forEach((x) => { x.r = pct(ix(x.r)); });
      pctOpts(st.pari);
      pctOpts(st.verifie);
    });

    /* ---------- Fiches de mots (aucune ne dévoile la question de l'étape ni de la suivante) ---------- */
    const mots = {
      helianthine: {
        t: "hélianthine",
        d: `Un indicateur coloré acido-basique usuel au laboratoire : rouge dans une solution très acide (pH ${phHcl}), jaune dans une solution de soude (pH ${phSoude}).`,
      },
      quotient: {
        t: "quotient de réaction",
        d: "Grandeur sans unité, notée <i>Q</i><sub>r</sub>, associée à l’équation d’une réaction dans un état donné du système : produit des concentrations des produits sur celui des réactifs (en mol·L<sup>−1</sup>). À l’équilibre, on l’écrit <i>Q</i><sub>r,éq</sub>.",
      },
      constante: {
        t: "constante d’équilibre",
        d: "Valeur prise par le quotient de réaction <i>Q</i><sub>r,éq</sub> à l’état d’équilibre du système. Associée à l’équation écrite de la réaction, elle est sans unité et ne dépend pas de la composition initiale.",
      },
      autoprotolyse: {
        t: "autoprotolyse de l’eau",
        d: "Réaction très limitée d’une molécule d’eau (acide du couple H₂O/HO⁻) avec une autre molécule d’eau (base du couple H₃O⁺/H₂O) : 2 H₂O<sub>(l)</sub> ⇄ H₃O⁺<sub>(aq)</sub> + HO⁻<sub>(aq)</sub>.",
      },
      "produit-ionique": {
        t: "produit ionique de l’eau",
        d: `Constante d’équilibre de l’autoprotolyse de l’eau : <i>K</i><sub>e</sub> = [H₃O⁺]<sub>éq</sub> · [HO⁻]<sub>éq</sub>. À ${t25} °C, <i>K</i><sub>e</sub> = ${keS} et p<i>K</i><sub>e</sub> = −log <i>K</i><sub>e</sub> = ${pkeS}.`,
      },
      "constante-acidite": {
        t: "constante d’acidité",
        d: "Constante d’équilibre <i>K</i><sub>A</sub> associée à l’équation de la réaction d’un acide AH avec l’eau : <i>K</i><sub>A</sub> = [A⁻]<sub>éq</sub> [H₃O⁺]<sub>éq</sub> / [AH]<sub>éq</sub>, sans unité.",
      },
      pka: {
        t: "pK_A",
        d: "p<i>K</i><sub>A</sub> = −log <i>K</i><sub>A</sub>. Le « p » reprend la notation du pH introduite en 1909 par Sørensen au laboratoire Carlsberg.",
      },
      predominance: {
        t: "diagramme de prédominance",
        d: "Axe gradué en pH séparé en pH = p<i>K</i><sub>A</sub> : pour pH &lt; p<i>K</i><sub>A</sub>, la forme acide AH prédomine ([AH] &gt; [A⁻]) ; pour pH &gt; p<i>K</i><sub>A</sub>, la forme basique A⁻ prédomine.",
      },
      distribution: {
        t: "diagramme de distribution",
        d: "En PC et SM : graphique représentant les pourcentages des espèces acide et basique d’un couple en fonction du pH ; à tout pH, la somme des deux pourcentages vaut 100 %.",
      },
      indicateur: {
        t: "indicateur coloré",
        d: "Couple acide/base HIn / In⁻ ajouté à très faible concentration (quelques gouttes), dont la forme acide HIn et la forme basique In⁻ n’ont pas la même teinte en solution.",
      },
      virage: {
        t: "zone de virage",
        d: "Intervalle de pH, entourant le p<i>K</i><sub>A</sub> de l’indicateur coloré, dans lequel aucune des deux formes HIn et In⁻ n’impose seule sa couleur : la solution y prend la teinte sensible.",
      },
    };
    Object.values(mots).forEach((m) => { m.d = pct(m.d); m.t = ix(m.t); });

    /* ---------- Fin de séance : résultats, paris rappelés et renvoi piège par piège (B7) ---------- */
    const bet = (k) => {
      const st = STEPS.find((s) => s.cle === k), j = S.first[k];
      return !st || j == null ? null : !!st.pari.opts[j].juste;
    };
    function profileHTML() {
      const V = STEPS.filter((s) => s.verifie);
      const vu = V.filter((s) => ctx.juste(s.k) != null);
      const vok = V.filter((s) => ctx.juste(s.k) === true);
      const vko = V.filter((s) => ctx.juste(s.k) === false);
      const P = STEPS.filter((s) => s.pari && !s.verifie && !s.pari.opts.some((o) => o.ok));
      const pv = P.filter((s) => bet(s.cle) != null);
      const Q = [
        ["q1", "sens du rapport K_A1 / K_A2 dans une copie"],
        ["q2", "comparer un K_A et un pK_A"],
        ["q3", "dilution d’une réaction entre deux couples"],
      ];
      const res = Q.map(([k]) => ctx.juste(k));
      const ligne = `« Vérifie » réussies du premier coup : <b>${vok.length} sur ${vu.length || V.length}</b>. Tes paris : ${pv.length} faits.`;
      const rows = res.map((ok, i) => `<li class="${ok === true ? "ok" : ok === false ? "ko" : ""}">${ok === true ? "✓" : ok === false ? "✗" : "·"} ${ix(Q[i][1])}</li>`).join("");

      const bets = [];
      const b1 = bet("helianthine"); if (b1 != null) bets.push(b1 ? "tu avais prévu la teinte jaune à pH 5,0" : "« rouge » ou « orange » t’avait tenté à l’énigme");
      const b2 = bet("qr-monte"); if (b2 != null) bets.push(b2 ? "tu avais vu que Q_r se stabilise au palier" : "tu pensais que Q_r continue de monter ou redescend");
      const b3 = bet("trois-flacons"); if (b3 != null) bets.push(b3 ? "tu avais prévu le même Q_r,éq pour le flacon dilué" : "tu pensais que Q_r,éq change avec la concentration");
      const b4 = bet("dilution-sens"); if (b4 != null) bets.push(b4 ? "tu avais prévu que Q_r remonte jusqu’à K" : "tu pensais que Q_r reste à K/10 ou descend");
      const jBac = ctx.juste("bac"); if (jBac != null) bets.push(jBac ? "au bac, tu es parti de l’équation et du tableau" : "au bac, le premier geste sur Q_r,éq mérite d’être revu");

      const revoir = vko.map((x) => x.sujet).filter(Boolean);
      return `<p class="res">${pct(ligne)}</p><a class="lien-exos" href="/pilote/acides-bases/exercices">Faire les exercices →</a>
<details class="detail"><summary>Voir le détail</summary><ul class="prof">${rows}</ul>${bets.length ? `<p class="small">Tes paris : ${pct(ix(bets.join(" ; ")))}.</p>` : ""}${revoir.length ? `<p class="small">À revoir : ${pct(ix(revoir.join(" ; ")))}.</p>` : ""}<div class="next"><div class="pari-k">Dans les exercices, piège par piège</div>${pct(ix("<ol><li>Q_r renversé, solvant, solide ou coefficient : l’exercice 1.</li><li>K confondu avec Q_r, température et dilution : l’exercice 2.</li><li>K_e, nature d’une solution et pH depuis [HO⁻] : l’exercice 3.</li><li>Acide supposé intact, K_A et pK_A depuis le pH ou τ : les exercices 4 et 5.</li><li>Force et concentration, K_A et pK_A mêlés : l’exercice 6.</li><li>Rapport K_A1 / K_A2 et pH d’un mélange équimolaire : les exercices 7 et 8.</li><li>Nature face à 7 et prédominance face au pK_A : l’exercice 9.</li><li>Diagramme de distribution (PC et SM) : l’exercice 10.</li><li>Teinte et zone de virage d’un indicateur : l’exercice 11.</li><li>Les sujets complets du bac : l’exercice 12.</li></ol>"))}</div></details>`;
    }

    /* ---------- Contrôles interactifs ---------- */
    S.abVirBas = false; S.abVirHaut = false; S.abVirPh = ENIGME.phFlacon;
    S.abDomBas = false; S.abDomHaut = false; S.abDomPh = PREDOM.pH;

    const CTL = {
      virage: {
        html: () => `<div class="ctl"><div class="ab-cur"><label><span>pH</span><input id="sl-vir" type="range" min="${ENIGME.phMin}" max="${ENIGME.phMax}" step="0.1" value="${S.abVirPh}" aria-label="pH du flacon"><output id="so-vir" for="sl-vir">${fr(S.abVirPh, 1)}</output></label></div><div class="ctl-btns"><button type="button" class="ctl-btn alt" id="ab-vir-auto">Montre-moi un exemple</button></div></div><p class="ctl-note" id="ab-vir-note"></p>`,
        init() {
          const sc = scenes.solution, sl = $("#sl-vir"), out = $("#so-vir"), nt = $("#ab-vir-note");
          const maj = (v, interaction) => {
            const pv = clamp(Number(v), ENIGME.phMin, ENIGME.phMax);
            S.abVirPh = pv; sl.value = pv; out.textContent = fr(pv, 1);
            if (interaction) {
              if (pv < ENIGME.zoneBas - 0.05) S.abVirBas = true;
              if (pv > ENIGME.zoneHaut + 0.05) S.abVirHaut = true;
            }
            sc.p.pv = pv; sc.p.teinte = 1; sc.render();
            const info = teinteInd("hel", pv);
            nt.innerHTML = pct(`À pH = ${fr(pv, 1)} : <b>${info.mot}</b>.<br>${S.abVirBas ? "✓" : "·"} sous ${zHelB} &nbsp; ${S.abVirHaut ? "✓" : "·"} au-dessus de ${zHelH}`);
            ctx.majNav();
          };
          sl.addEventListener("input", () => { ctx.stop(); maj(sl.value, true); });
          $("#ab-vir-auto").addEventListener("click", async () => {
            ctx.stop();
            S.abVirBas = true; maj(2.2, true);
            await ctx.tween(sc, { pv: 2.2 }, 500);
            S.abVirHaut = true; maj(5.2, true);
            await ctx.tween(sc, { pv: 5.2 }, 500);
          });
          maj(S.abVirPh, false);
        },
      },
      axe_ph: {
        html: () => `<div class="ctl"><div class="ab-cur"><label><span>pH</span><input id="sl-dom" type="range" min="${PH_AXE_MIN}" max="${PH_AXE_MAX}" step="0.1" value="${S.abDomPh}" aria-label="pH sur l’axe"><output id="so-dom" for="sl-dom">${fr(S.abDomPh, 1)}</output></label></div><div class="ctl-btns"><button type="button" class="ctl-btn alt" id="ab-dom-auto">Montre-moi un exemple</button></div></div><p class="ctl-note" id="ab-dom-note"></p>`,
        init() {
          const sc = scenes.axe, sl = $("#sl-dom"), out = $("#so-dom"), nt = $("#ab-dom-note");
          const maj = (v, interaction) => {
            const pv = clamp(Number(v), PH_AXE_MIN, PH_AXE_MAX);
            S.abDomPh = pv; sl.value = pv; out.textContent = fr(pv, 1);
            if (interaction) {
              if (pv <= DOM_BORNES.bas) S.abDomBas = true;
              if (pv >= DOM_BORNES.haut) S.abDomHaut = true;
            }
            sc.p.ph = pv;
            sc.p.dcp = S.abDomBas && S.abDomHaut ? 1 : 0;
            sc.render();
            const r = rapCouple(pv, PKA.ethan);
            const rAff = r >= 100 || r <= 0.01 ? sciH(r, 1) : r >= 10 ? fr(r, 0) : fr(r, 2);
            const dom = Math.abs(pv - PKA.ethan) < 0.05 ? "égalité des deux formes" : pv < PKA.ethan ? "CH₃COOH prédomine" : "CH₃COO⁻ prédomine";
            nt.innerHTML = pct(ix(`[CH₃COO⁻] / [CH₃COOH] ≈ ${rAff} (${dom}).<br>${S.abDomBas ? "✓" : "·"} pH &lt; pK_A &nbsp; ${S.abDomHaut ? "✓" : "·"} pH &gt; pK_A`));
            ctx.majNav();
          };
          sl.addEventListener("input", () => { ctx.stop(); maj(sl.value, true); });
          $("#ab-dom-auto").addEventListener("click", async () => {
            ctx.stop();
            S.abDomBas = true; maj(DOM_BORNES.exBas, true);
            await ctx.tween(sc, { ph: DOM_BORNES.exBas }, 450);
            S.abDomHaut = true; maj(DOM_BORNES.exHaut, true);
            await ctx.tween(sc, { ph: DOM_BORNES.exHaut, dcp: 1 }, 550);
          });
          maj(S.abDomPh, false);
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
      reset() {
        S.abVirBas = false; S.abVirHaut = false; S.abVirPh = ENIGME.phFlacon;
        S.abDomBas = false; S.abDomHaut = false; S.abDomPh = PREDOM.pH;
      },
      plain: (s) => s.replace(/ ?%/g, " pour cent").replace(/τ/g, " tau ").replace(/⇄/g, " double flèche ").replace(/→/g, " flèche "),
      demonter() { root.removeEventListener("click", surSaut); },
    };
  });
}
