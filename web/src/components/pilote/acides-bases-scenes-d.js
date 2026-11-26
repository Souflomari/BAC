/* eslint-disable */
// @ts-nocheck
/**
 * Scènes d’« État d’équilibre, acides et bases » (V3), quatrième partie :
 *   - `avancement` : le tableau d’avancement (en concentrations, avec τ, ou pour deux couples) ;
 *   - `barres`     : comparaison de trois acides de même concentration (sujet 2021) ;
 *   - `bac`        : équations à étudier et copies rédigées ligne à ligne (sujets 2022 et 2020) ;
 *   - `quiz`       : copies fautives et questions de bilan (`r1` et `r2` masqués avant la réponse) ;
 *   - `end`        : les cinq idées retenues.
 * Copiées et adaptées des scènes de C3, sans rien importer d’une autre leçon.
 */
import {
  SAV_LOG, COEF_PILE, C0, COMP_ACIDES, C12, KE, PKE, TEMP_C, PH_NEUTRE,
  S22, S20, COPIE_22, COPIE_22_EQ, COPIE_20, COPIE_20_EQ, fr, sciF,
} from "./acides-bases-outils";

export function scenesD(ctx, O, QUIZ) {
  const { E, clamp, show, scene } = ctx;
  const { setFx, titre, lab } = O;

  /* ---------- 1. Le tableau d'avancement ---------- */
  const XC = [300, 488, 676, 864], YR = [262, 358, 454], CW = 180, CH = 78;
  const TETES = {
    conc: ["AH", "H_{2}O", "A^{−}", "H_{3}O^{+}"],
    tau: ["AH", "H_{2}O", "A^{−}", "H_{3}O^{+}"],
    c2012: ["CH_{3}COOH", "NH_{3}", "CH_{3}COO^{−}", "NH_{4}^{+}"],
  };
  const CASES = {
    conc: [
      ["*C*", "excès", "0", "0"],
      ["*C* − *x* / *V*", "excès", "*x* / *V*", "*x* / *V*"],
      ["*C* − 10^{−pH}", "excès", "10^{−pH}", "10^{−pH}"],
    ],
    tau: [
      ["*C*", "excès", "0", "0"],
      ["*C* − *x* / *V*", "excès", "*x* / *V*", "*x* / *V*"],
      ["*C*(1 − *τ*)", "excès", "*C* *τ*", "*C* *τ*"],
    ],
    c2012: [
      ["*n*", "*n*", "0", "0"],
      ["*n* − *x*", "*n* − *x*", "*x*", "*x*"],
      ["*n* − *x*_{f}", "*n* − *x*_{f}", "*x*_{f}", "*x*_{f}"],
    ],
  };

  scene("avancement", {
    p: { mode: "conc", cases: 4, fx: -1, tit: "", sub: "" },
    build(g) {
      this.ti = titre(g, "", "");
      this.unite = lab(g, 52, 198, "mol·L^{−1}", "ab-s s-c", "start", 23);
      this.tete = XC.map((x) => {
        const r = E("rect", { x: x - CW / 2, y: 162, width: CW, height: 56, class: "cell" }, g);
        return { r, t: lab(g, x, 198, "", "ab-g s-ink", "middle", 26) };
      });
      const lignes = [["état initial", "*x* = 0"], ["en cours", "*x*"], ["équilibre", "*x*_{f}"]];
      this.lig = lignes.map(([a, b], r) => {
        const gg = E("g", {}, g);
        lab(gg, 52, YR[r] - 6, a, "ab-l s-ink", "start", 25);
        lab(gg, 52, YR[r] + 24, b, "ab-s s-c", "start", 22);
        return gg;
      });
      this.cel = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
          const gg = E("g", {}, g);
          const rect = E("rect", { x: XC[c] - CW / 2, y: YR[r] - 40, width: CW, height: CH, class: "cell" }, gg);
          this.cel.push({ g: gg, rect, t: lab(gg, XC[c], YR[r] + 8, "", "ab-l s-ink", "middle", 25) });
        }
      }
    },
    render() {
      const p = this.p;
      const cols = TETES[p.mode] || TETES.conc;
      const mat = CASES[p.mode] || CASES.conc;
      setFx(this.unite, p.mode === "c2012" ? "mol" : "mol·L^{−1}");
      this.tete.forEach((h, c) => setFx(h.t, cols[c]));
      this.cel.forEach((cl, i) => {
        const r = Math.floor(i / 4), c = i % 4;
        const o = clamp(p.cases - i, 0, 1);
        cl.g.style.opacity = o;
        cl.g.setAttribute("transform", `translate(0 ${((1 - o) * 10).toFixed(1)})`);
        setFx(cl.t, mat[r][c]);
        cl.rect.setAttribute("class", i === Math.round(p.fx) ? "cell hl-a" : "cell");
      });
      this.lig.forEach((l, r) => show(l, clamp((p.cases - 4 * r) / 2, 0, 1)));
      this.ti.set(
        p.tit || "Tableau d’avancement",
        p.sub || (p.mode === "c2012" ? "CH₃COOH + NH₃ ⇄ CH₃COO⁻ + NH₄⁺" : "AH + H₂O ⇄ A⁻ + H₃O⁺ : concentrations en mol·L^{−1}"),
      );
    },
  });

  /* ---------- 2. Trois acides à même concentration (sujet 2021) ---------- */
  scene("barres", {
    p: { montrer: 0, tit: "", sub: "" },
    build(g) {
      this.ti = titre(g, "", "");
      const CX = [220, 500, 780], BY = 530, BW = 110;
      this.BY = BY;
      E("line", { x1: 110, x2: 890, y1: BY, y2: BY, class: "k-dim", "stroke-width": 2 }, g);
      this.cols = COMP_ACIDES.map((a, i) => {
        const cx = CX[i], gg = E("g", {}, g);
        lab(gg, cx, 160, a.formule, "ab-g s-ink", "middle", 28);
        lab(gg, cx, 196, `p*K*_{A} = ${fr(a.pka, i === 0 ? 2 : 1)}`, "ab-l s-c", "middle", 25);
        const phBox = E("rect", { x: cx - 76, y: 222, width: 152, height: 50, rx: 8, class: "cell" }, gg);
        const phTxt = lab(gg, cx, 256, "", "ab-g s-ink", "middle", 26);
        const bar = E("rect", { x: cx - BW / 2, width: BW, class: i === 0 ? "f-a k-a" : "f-b k-ink", "stroke-width": 3 }, gg);
        const tauTxt = lab(gg, cx, BY + 42, "", "ab-l s-ink", "middle", 25);
        return { a, cx, phBox, phTxt, bar, tauTxt };
      });
    },
    render() {
      const p = this.p, m = clamp(p.montrer, 0, 1), BY = this.BY;
      this.cols.forEach((c, i) => {
        const h = m * Math.max(8, (210 * c.a.tau) / 0.14);
        c.bar.setAttribute("y", (BY - h).toFixed(1));
        c.bar.setAttribute("height", h.toFixed(1));
        show(c.bar, m > 0.02 ? 1 : 0);
        c.phBox.setAttribute("class", m > 0.5 && i === 0 ? "cell hl-a" : "cell");
        setFx(c.phTxt, m > 0.5 ? `pH = ${fr(c.a.pH, 2)}` : "pH : ?");
        setFx(c.tauTxt, m > 0.5 ? `*τ* = ${fr(c.a.tau * 100, 1)} %` : "");
      });
      this.ti.set(
        p.tit || "Trois acides à même concentration",
        p.sub || `*C* = ${sciF(C0, 1)} mol·L^{−1} (tableau du sujet 2021)`,
      );
    },
  });

  /* ---------- 3. Équations et copies du bac ---------- */
  scene("bac", {
    p: { mode: "s2022", n: 0, tit: "", sub: "" },
    build(g) {
      this.ti = titre(g, "", "");

      /* Vue carte simple (sav-test, qr-solides, qr-exposants, deux-couples) */
      this.carteG = E("g", {}, g);
      E("rect", { x: 84, y: 240, width: 832, height: 196, rx: 10, class: "cell" }, this.carteG);
      this.cMain = lab(this.carteG, 500, 326, "", "ab-g s-ink", "middle", 32);
      this.cSub = lab(this.carteG, 500, 388, "", "ab-l s-c", "middle", 26);

      /* Vue copie sujet 2022 */
      this.g22 = E("g", {}, g);
      E("rect", { x: 50, y: 116, width: 900, height: 154, rx: 6, class: "nofill k-dim", "stroke-width": 2 }, this.g22);
      lab(this.g22, 74, 150, `*C*_{a} = ${sciF(S22.Ca, 0)} mol·L^{−1}   ·   pH = ${fr(S22.pH, 1)}`, "ab-l s-ink", "start", 23);
      lab(this.g22, 74, 184, COPIE_22_EQ, "ab-l s-ink", "start", 23);
      lab(this.g22, 74, 219, `1.3  Exprimer *Q*_{r,éq} avec *C*_{a} et [H_{3}O^{+}]_{éq}, calculer (${fr(S22.bareme[0], 2)} pt)`, "ab-l s-ink", "start", 23);
      lab(this.g22, 74, 252, `1.4  En déduire p*K*_{A}(C_{2}H_{5}COOH / C_{2}H_{5}COO^{−}) (${fr(S22.bareme[1], 1)} pt)`, "ab-l s-ink", "start", 23);
      lab(this.g22, 50, 304, "copie", "ab-s s-c", "start", 22);
      this.ln22 = COPIE_22.map((t, i) => {
        const gg = E("g", {}, this.g22), y = 346 + i * 60;
        lab(gg, 50, y, i === 0 ? "1.3" : i === 4 ? "1.4" : "", "ab-l s-c", "start", 24);
        lab(gg, 114, y, t, i >= 3 ? "ab-g s-ink" : "ab-l s-ink", "start", 24);
        return gg;
      });

      /* Vue copie sujet 2020 */
      this.g20 = E("g", {}, g);
      E("rect", { x: 50, y: 116, width: 900, height: 154, rx: 6, class: "nofill k-dim", "stroke-width": 2 }, this.g20);
      lab(this.g20, 74, 150, `*C*_{b} = ${sciF(S20.Cb, 0)} mol·L^{−1}   ·   pH = ${fr(S20.pH, 1)}   ·   *K*_{e} = ${sciF(KE, 0)}`, "ab-l s-ink", "start", 23);
      lab(this.g20, 74, 184, COPIE_20_EQ, "ab-l s-ink", "start", 23);
      lab(this.g20, 74, 219, `2.2  Calculer [HO^{−}]_{éq} (${fr(S20.bareme[0], 2)} pt)   ·   2.3  Calculer *τ* (${fr(S20.bareme[1], 1)} pt)`, "ab-l s-ink", "start", 23);
      this.q20Suite = lab(this.g20, 74, 252, `2.4  *Q*_{r,éq} = ${sciF(S20.qrImp, 2)} (${fr(S20.bareme[2], 1)} pt)  ·  2.5  p*K*_{A}(NH_{4}^{+}/NH_{3}) (${fr(S20.bareme[3], 1)} pt)`, "ab-l s-ink", "start", 22);
      lab(this.g20, 50, 304, "copie", "ab-s s-c", "start", 22);
      const nums20 = ["2.2", "2.3", "2.4", "2.5"];
      this.ln20 = COPIE_20.map((t, i) => {
        const gg = E("g", {}, this.g20), y = 352 + i * 68;
        lab(gg, 50, y, nums20[i], "ab-l s-c", "start", 24);
        lab(gg, 114, y, t, i === 3 ? "ab-g s-ink" : "ab-l s-ink", "start", 24);
        return gg;
      });
    },
    render() {
      const p = this.p, m = p.mode;
      const is22 = m === "s2022", is20 = m === "s2020";
      show(this.g22, is22 ? 1 : 0);
      show(this.g20, is20 ? 1 : 0);
      show(this.carteG, !is22 && !is20 ? 1 : 0);

      if (is22) {
        this.ln22.forEach((l, i) => {
          const o = clamp(p.n - i, 0, 1);
          l.style.opacity = o;
          l.setAttribute("transform", `translate(${((1 - o) * -14).toFixed(1)} 0)`);
        });
        this.ti.set(p.tit || "Bac PC 2022, session normale", p.sub || "exercice 1, partie 2 : acide propanoïque dans l’eau");
      } else if (is20) {
        show(this.q20Suite, p.n >= 1.9 ? 1 : 0);
        this.ln20.forEach((l, i) => {
          const o = clamp(p.n - i, 0, 1);
          l.style.opacity = o;
          l.setAttribute("transform", `translate(${((1 - o) * -14).toFixed(1)} 0)`);
        });
        this.ti.set(p.tit || "Bac PC 2020, session normale", p.sub || "exercice I, partie 1, §2 : solution d’ammoniac");
      } else if (m === "savoir") {
        setFx(this.cMain, `−log(${sciF(SAV_LOG.x, 1)}) = ?`);
        setFx(this.cSub, "logarithme décimal d’une puissance de 10");
        this.ti.set(p.tit || "Ce qu’il faut savoir", p.sub || "le logarithme décimal");
      } else if (m === "qr1") {
        setFx(this.cMain, "Zn_{(s)} + Cu^{2+}_{(aq)} ⇄ Zn^{2+}_{(aq)} + Cu_{(s)}");
        setFx(this.cSub, "espèces en présence : deux métaux solides et deux ions dissous");
        this.ti.set(p.tit || "Quotient de réaction : présence de solides", p.sub || "sujet 2012, session normale, 2ᵉ partie");
      } else if (m === "qr2") {
        setFx(this.cMain, `${COEF_PILE} Ag^{+}_{(aq)} + Cr_{(s)} ⇄ ${COEF_PILE} Ag_{(s)} + Cr^{3+}_{(aq)}`);
        setFx(this.cSub, "équation bilan de la pile argent-chrome");
        this.ti.set(p.tit || "Quotient de réaction : nombres stœchiométriques", p.sub || "sujet 2020, session normale, partie 2");
      } else if (m === "c2012") {
        setFx(this.cMain, "CH_{3}COOH_{(aq)} + NH_{3(aq)} ⇄ CH_{3}COO^{−}_{(aq)} + NH_{4(aq)}^{+}");
        setFx(this.cSub, `couple 1 : p*K*_{A1} = ${fr(C12.pka1, 1)}   ·   couple 2 : p*K*_{A2} = ${fr(C12.pka2, 1)}`);
        this.ti.set(p.tit || "Réaction entre deux couples acide/base", p.sub || "sujet 2012, session normale, question 1-2");
      }
    },
  });

  /* ---------- 4. Bilan : copies fautives et pièges ---------- */
  scene("quiz", {
    p: { qi: 0, rv: 0 },
    build(g) {
      this.ti = titre(g, "", "");
      this.big = lab(g, 500, 290, "", "ab-g s-ink", "middle", 30);
      this.sub = lab(g, 500, 352, "", "ab-l s-c", "middle", 26);
      this.r1 = lab(g, 500, 468, "", "ab-g s-ink", "middle", 27);
      this.r2 = lab(g, 500, 520, "", "ab-l s-a", "middle", 26);
    },
    render() {
      const i = clamp(Math.round(this.p.qi), 0, QUIZ.length - 1), q = QUIZ[i];
      this.ti.set(q.titre, q.tag);
      setFx(this.big, q.big);
      setFx(this.sub, q.sub);
      setFx(this.r1, q.r1);
      setFx(this.r2, q.r2);
      show(this.r1, this.p.rv);
      show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
    },
  });

  /* ---------- 5. Fin : les cinq idées retenues ---------- */
  scene("end", {
    p: { n: 0 },
    build(g) {
      titre(g, "Ce que tu as compris", "");
      const I = [
        ["*Q*_{r} : produits sur réactifs, sans solvant ni solide.", "Les coefficients des espèces dissoutes passent en exposant."],
        ["À l’équilibre, *Q*_{r,éq} = *K*, indépendant de l’état initial.", "*K* dépend de la température ; *τ* dépend de *K* et de *C*."],
        [`Eau : *K*_{e} = [H_{3}O^{+}][HO^{−}] = ${sciF(KE, 1)} à ${TEMP_C} °C.`, `p*K*_{e} = ${PKE} : neutre à pH ${PH_NEUTRE}, acide en dessous, basique au-dessus.`],
        ["Couple AH/A^{−} : pH = p*K*_{A} + log([A^{−}]_{éq} / [AH]_{éq}).", `Nature jugée face à ${PH_NEUTRE} ; espèce prédominante et teinte face au p*K*_{A}.`],
        ["Entre deux couples : *K* = *K*_{A1} / *K*_{A2}  (log *K* = p*K*_{A2} − p*K*_{A1}).", "L’acide qui réagit à gauche place son *K*_{A} au numérateur."],
      ];
      this.items = I.map((l, i) => {
        const gg = E("g", {}, g), y = 166 + i * 102;
        lab(gg, 68, y + 12, String(i + 1), "ab-g s-ink", "start", 34);
        lab(gg, 114, y, l[0], "ab-l s-ink", "start", 24);
        lab(gg, 114, y + 34, l[1], "ab-s s-c", "start", 21);
        return gg;
      });
    },
    render() {
      this.items.forEach((gg, i) => {
        const o = clamp(this.p.n - i, 0, 1);
        gg.style.opacity = o;
        gg.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`);
      });
    },
  });
}
