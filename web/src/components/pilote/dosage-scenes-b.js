/* eslint-disable */
// @ts-nocheck
/**
 * Scène `phv` (1000 × 720) : lectures graphiques sur pH = f(V_B) (courbe de la leçon, sujets 2018, 2022, 2024),
 * tangentes parallèles et médiane, courbe dérivée, demi-équivalence, bandes de virage, et axe des pH seul.
 */
import {
  VE_L, VMAX_L, PH_E, PKA_ETH, SAV, PH_EX_IND,
  phL, dphL, ph18, ph22, dph22, ph24, dph24, tangentesParalleles,
  S18, S22, S24, IND, VIR_LECON, fr, sciF,
} from "./dosage-outils";

export function scenesB(ctx, O) {
  const { E, clamp, show, scene } = ctx;
  const { setFx, titre, lab, axes } = O;

  const X0 = 126, X1 = 910, Y0 = 590, Y1 = 150;

  function sampleCurve(fn, vMax, n = 220) {
    const out = [];
    for (let i = 0; i <= n; i++) {
      const v = (vMax * i) / n;
      out.push([v, fn(v)]);
    }
    return out;
  }

  const CURVES = {
    lecon: { vmax: VMAX_L, pmax: 14, xs: 2, ys: 2, ve: VE_L, phe: PH_E, fn: phL, dfn: dphL, pts: sampleCurve(phL, VMAX_L), dpts: sampleCurve(dphL, VMAX_L), xLab: "*V*_{B} (mL)", tg: tangentesParalleles(phL, VE_L, PH_E, VMAX_L) },
    s18: { vmax: 20, pmax: 12, xs: 2, ys: 2, ve: S18.VE, phe: S18.pHE, fn: ph18, dfn: null, pts: sampleCurve(ph18, 20), dpts: null, xLab: "*V*_{B} (mL)", tg: tangentesParalleles(ph18, S18.VE, S18.pHE, 20, S18.pente) },
    s22: { vmax: 30, pmax: 12, xs: 5, ys: 2, ve: S22.VE, phe: ph22(S22.VE), fn: ph22, dfn: dph22, pts: sampleCurve(ph22, 30), dpts: sampleCurve(dph22, 30), xLab: "*V*_{b} (mL)", tg: null },
    s24: { vmax: 35, pmax: 14, xs: 5, ys: 2, ve: S24.VBE, phe: ph24(S24.VBE), fn: ph24, dfn: dph24, pts: sampleCurve(ph24, 35), dpts: sampleCurve(dph24, 35), xLab: "*V*_{B} (mL)", tg: null },
  };

  scene("phv", {
    p: {
      jeu: "lecon", curve: 1, tg: 0, med: 0, pe: 0, der: 0, demi: 0,
      lect: 0, bandeMin: 0, bandeMax: 0, bandePos: 0, bandeShow: 1, bandeLab: "",
      p7: 0, ptV: -1, curV: -1, rv: 0, axeMode: "predom", sub: "",
    },
    build(g) {
      this.ti = titre(g, "", "");

      /* ===== AXE DES pH SEUL (sav-test, sav-rappel, indicateur) ===== */
      this.gAxe = E("g", {}, g);
      const axX = (v) => 100 + (v / 14) * 800;
      E("line", { x1: axX(0), x2: axX(14) + 16, y1: 370, y2: 370, class: "k-ink", "stroke-width": 3 }, this.gAxe);
      for (let v = 0; v <= 14; v += 2) {
        E("line", { x1: axX(v), x2: axX(v), y1: 362, y2: 378, class: "k-dim", "stroke-width": 2 }, this.gAxe);
        lab(this.gAxe, axX(v), 408, fr(v, 0), "t-sous s-c", "middle", 22);
      }
      lab(this.gAxe, axX(14) + 14, 344, "pH", "ds-l s-ink", "end", 26);

      // mode prédominance
      this.axPre = E("g", {}, this.gAxe);
      const xPka = axX(PKA_ETH), xSav = axX(SAV.pH);
      E("line", { x1: xPka, x2: xPka, y1: 280, y2: 430, class: "k-ink", "stroke-width": 3 }, this.axPre);
      lab(this.axPre, xPka, 260, `p*K*_{A} = ${fr(PKA_ETH, 2)}`, "ds-g s-ink", "middle", 26);
      this.axPrePt = E("g", {}, this.axPre);
      E("circle", { cx: xSav, cy: 370, r: 9, class: "s-a" }, this.axPrePt);
      lab(this.axPrePt, xSav, 456, `pH = ${fr(SAV.pH, 1)}`, "ds-l s-a", "middle", 24);
      this.axPreRev = E("g", {}, this.axPre);
      lab(this.axPreRev, (axX(0) + xPka) / 2, 336, "CH_{3}COOH", "ds-l s-ink", "middle", 26);
      lab(this.axPreRev, (xPka + axX(14)) / 2, 336, "CH_{3}COO^{−}", "ds-l s-ink", "middle", 26);

      // mode indicateur (bande posée au-dessus de l'axe pour ne pas recouvrir les graduations)
      this.axInd = E("g", {}, this.gAxe);
      const xI1 = axX(IND.phenolphtaleine.min), xI2 = axX(IND.phenolphtaleine.max), xP5 = axX(PH_EX_IND);
      E("rect", { x: xI1, y: 298, width: xI2 - xI1, height: 72, class: "ds-bande" }, this.axInd);
      lab(this.axInd, (xI1 + xI2) / 2, 278, `zone de virage : ${fr(IND.phenolphtaleine.min, 1)} – ${fr(IND.phenolphtaleine.max, 0)}`, "ds-l s-a", "middle", 24);
      E("circle", { cx: xP5, cy: 370, r: 9, class: "s-a" }, this.axInd);
      lab(this.axInd, xP5, 456, `pH = ${fr(PH_EX_IND, 0)}`, "ds-l s-a", "middle", 24);
      this.axIndRev = E("g", {}, this.axInd);
      lab(this.axIndRev, (axX(0) + xI1) / 2, 338, "HIn (incolore)", "ds-l s-ink", "middle", 26);
      lab(this.axIndRev, (xI2 + axX(14)) / 2, 338, "In^{−} (rose)", "ds-l s-a", "middle", 26);

      /* ===== REPERE COURBE pH = f(V) ===== */
      this.gGr = E("g", {}, g);
      this.axG = E("g", {}, this.gGr);
      this.bandeR = E("rect", { x: X0, y: 200, width: 40, height: 40, class: "ds-bande" }, this.gGr);
      this.bandeT = lab(this.gGr, X1, 200, "", "ds-s s-a", "end", 22);
      this.bandeVir = E("rect", { x: X0, y: Y1, width: 10, height: Y0 - Y1, class: "ds-bande-v" }, this.gGr);
      this.p7G = E("g", {}, this.gGr);
      this.p7L = E("line", { x1: X0, x2: X1, y1: 0, y2: 0, class: "k-dim", "stroke-width": 2, "stroke-dasharray": "8 6" }, this.p7G);
      this.p7T = lab(this.p7G, X1, 0, "pH = 7", "ds-s s-c", "end", 22);
      this.cvP = E("path", { d: "", class: "nofill k-ink", "stroke-width": 3.5 }, this.gGr);
      this.derP = E("path", { d: "", class: "nofill k-a", "stroke-width": 2.5, "stroke-dasharray": "7 5" }, this.gGr);
      this.derLab = lab(this.gGr, 0, 0, "", "ds-s s-a", "start", 22);
      // flèche piège 2022 (étiquette dpH/dVb pointant vers 21,7 mL)
      this.s22Fl = E("g", {}, this.gGr);
      this.s22Line = E("path", { d: "", class: "nofill k-a", "stroke-width": 2.5 }, this.s22Fl);
      this.s22Box = E("rect", { x: 0, y: 0, width: 112, height: 38, rx: 4, class: "f-b k-a", "stroke-width": 2 }, this.s22Fl);
      this.s22Txt = lab(this.s22Fl, 0, 0, "dpH/d*V*_{b}", "ds-s s-a", "middle", 22);
      this.s22Rev = E("g", {}, this.gGr);
      this.s22RevL = E("line", { x1: 0, x2: 0, y1: Y1, y2: Y0, class: "k-a", "stroke-width": 2.5, "stroke-dasharray": "6 5" }, this.s22Rev);
      this.s22RevT = lab(this.s22Rev, 0, Y1 + 26, "", "ds-l s-a", "end", 24);

      // tangentes parallèles et médiane
      this.tgG = E("g", {}, this.gGr);
      this.tg1 = E("line", { class: "k-dim", "stroke-width": 2.5, "stroke-dasharray": "8 6" }, this.tgG);
      this.tg2 = E("line", { class: "k-dim", "stroke-width": 2.5, "stroke-dasharray": "8 6" }, this.tgG);
      this.medL = E("line", { class: "k-a", "stroke-width": 2.5, "stroke-dasharray": "6 4" }, this.gGr);

      // point E
      this.peG = E("g", {}, this.gGr);
      this.peV = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.peG);
      this.peH = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.peG);
      this.peC = E("circle", { r: 8, class: "s-a" }, this.peG);
      this.peT = lab(this.peG, 0, 0, "", "ds-l s-a", "start", 24);

      // demi-équivalence
      this.dmG = E("g", {}, this.gGr);
      this.dmV = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.dmG);
      this.dmH = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.dmG);
      this.dmC = E("circle", { r: 8, class: "s-a" }, this.dmG);
      this.dmT = lab(this.dmG, 0, 0, "", "ds-s s-a", "start", 22);

      // point de lecture arbitraire (pourcent, curseur V à rappel)
      this.ptG = E("g", {}, this.gGr);
      this.ptV = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "5 5" }, this.ptG);
      this.ptH = E("line", { class: "k-a", "stroke-width": 2, "stroke-dasharray": "5 5" }, this.ptG);
      this.ptC = E("circle", { r: 8, class: "s-a" }, this.ptG);
      this.ptT = lab(this.ptG, 0, 0, "", "ds-s s-a", "start", 22);

      this._lastJeu = "";
    },

    render() {
      const p = this.p;
      const isAxe = p.jeu === "axe";
      show(this.gAxe, isAxe ? 1 : 0);
      show(this.gGr, isAxe ? 0 : 1);

      if (isAxe) {
        const pr = p.axeMode === "predom";
        show(this.axPre, pr ? 1 : 0);
        show(this.axInd, pr ? 0 : 1);
        if (pr) {
          show(this.axPreRev, p.rv);
          this.ti.set("Espèce prédominante", p.sub || `couple CH_{3}COOH / CH_{3}COO^{−} · p*K*_{A} = ${fr(PKA_ETH, 2)}`);
        } else {
          show(this.axIndRev, p.rv);
          this.ti.set("Zone de virage d’un indicateur", p.sub || "un couple HIn / In^{−} aux deux formes de couleurs différentes");
        }
        return;
      }

      const C = CURVES[p.jeu] || CURVES.lecon;
      const X = (v) => X0 + (v / C.vmax) * (X1 - X0);
      const Y = (y) => Y0 - (y / C.pmax) * (Y0 - Y1);

      if (this._lastJeu !== p.jeu) {
        this._lastJeu = p.jeu;
        axes(this.axG, X, Y, 0, C.vmax, C.xs, C.pmax, C.ys, (v) => fr(v, 0), (v) => fr(v, 0), C.xLab, "pH", 62, 0);
        const dCv = C.pts.map(([v, y], i) => `${i ? "L" : "M"} ${X(v).toFixed(1)} ${Y(y).toFixed(1)}`).join(" ");
        this.cvP.setAttribute("d", dCv);
        if (C.dpts) {
          const dmax = Math.max(...C.dpts.map((q) => q[1]), 1);
          const dDer = C.dpts.map(([v, dy], i) => `${i ? "L" : "M"} ${X(v).toFixed(1)} ${(Y0 - (dy / dmax) * (Y0 - Y1 - 24)).toFixed(1)}`).join(" ");
          this.derP.setAttribute("d", dDer);
        } else {
          this.derP.setAttribute("d", "");
        }
      }

      show(this.cvP, p.curve);
      show(this.derP, p.der && C.dpts ? 1 : 0);
      show(this.derLab, p.der && C.dpts && p.jeu !== "s22" ? 1 : 0);
      if (p.der && C.dpts && p.jeu !== "s22") {
        this.derLab.setAttribute("x", (X(C.ve) + 14).toFixed(1));
        this.derLab.setAttribute("y", (Y1 + 36).toFixed(1));
        setFx(this.derLab, p.jeu === "s24" ? "(C_{2}) : dpH/d*V*_{B}" : "dpH/d*V*_{B}");
      }

      // figure 2022 : flèche vers 21,7 mL
      show(this.s22Fl, p.jeu === "s22" ? 1 : 0);
      show(this.s22Rev, p.jeu === "s22" && p.rv > 0.5 ? 1 : 0);
      if (p.jeu === "s22") {
        const xf = X(S22.Vfleche), yf = Y(0.6);
        const bx = X(24.5), by = Y(3.8);
        this.s22Box.setAttribute("x", bx.toFixed(1)); this.s22Box.setAttribute("y", (by - 26).toFixed(1));
        this.s22Txt.setAttribute("x", (bx + 56).toFixed(1)); this.s22Txt.setAttribute("y", (by + 1).toFixed(1));
        this.s22Line.setAttribute("d", `M ${bx.toFixed(1)} ${by.toFixed(1)} L ${xf.toFixed(1)} ${yf.toFixed(1)} M ${(xf + 10).toFixed(1)} ${(yf - 4).toFixed(1)} L ${xf.toFixed(1)} ${yf.toFixed(1)} L ${(xf + 4).toFixed(1)} ${(yf - 12).toFixed(1)}`);
        const xe = X(S22.VE);
        this.s22RevL.setAttribute("x1", xe.toFixed(1)); this.s22RevL.setAttribute("x2", xe.toFixed(1));
        this.s22RevT.setAttribute("x", (xe - 12).toFixed(1));
        setFx(this.s22RevT, `sommet : *V*_{bE} = ${fr(S22.VE, 1)} mL`);
      }

      // droite pH = 7
      const y7 = Y(7);
      this.p7L.setAttribute("y1", y7.toFixed(1)); this.p7L.setAttribute("y2", y7.toFixed(1));
      this.p7T.setAttribute("y", (y7 - 8).toFixed(1));
      show(this.p7G, p.p7);

      // vraies tangentes parallèles aux coudes et médiane passant par E
      show(this.tgG, p.tg);
      show(this.medL, p.med);
      if ((p.tg || p.med) && C.tg) {
        const { m, b1, b2, bMed } = C.tg;
        const clipSeg = (el, b) => {
          let va = Math.max(0, C.ve - 3.6), vb = Math.min(C.vmax, C.ve + 3.6);
          if (m * va + b < 0) va = -b / m;
          if (m * vb + b > C.pmax) vb = (C.pmax - b) / m;
          va = clamp(va, 0, C.vmax); vb = clamp(vb, 0, C.vmax);
          el.setAttribute("x1", X(va).toFixed(1)); el.setAttribute("y1", Y(m * va + b).toFixed(1));
          el.setAttribute("x2", X(vb).toFixed(1)); el.setAttribute("y2", Y(m * vb + b).toFixed(1));
        };
        clipSeg(this.tg1, b2);
        clipSeg(this.tg2, b1);
        clipSeg(this.medL, bMed);
      }

      // point E
      show(this.peG, p.pe);
      if (p.pe) {
        const xe = X(C.ve), ye = Y(C.phe);
        const isS24 = p.jeu === "s24";
        this.peV.setAttribute("x1", xe.toFixed(1)); this.peV.setAttribute("x2", xe.toFixed(1)); this.peV.setAttribute("y1", ye.toFixed(1)); this.peV.setAttribute("y2", Y0.toFixed(1));
        this.peH.setAttribute("x1", X0.toFixed(1)); this.peH.setAttribute("x2", xe.toFixed(1)); this.peH.setAttribute("y1", ye.toFixed(1)); this.peH.setAttribute("y2", ye.toFixed(1));
        this.peC.setAttribute("cx", xe.toFixed(1)); this.peC.setAttribute("cy", ye.toFixed(1));
        this.peT.setAttribute("x", (xe + 14).toFixed(1)); this.peT.setAttribute("y", (ye + 6).toFixed(1));
        setFx(this.peT, p.rv ? (isS24 ? `*V*_{BE} = ${fr(C.ve, 1)} mL` : `E (${fr(C.ve, 1)} mL ; ${fr(C.phe, 1)})`) : "E");
        show(this.peH, p.rv && !isS24 ? 1 : 0);
      }

      // demi-équivalence (étiquette sous la courbe à droite pour ne pas être coupée par le tracé)
      show(this.dmG, p.demi);
      if (p.demi) {
        const xd = X(C.ve / 2), yd = Y(C.fn(C.ve / 2));
        this.dmV.setAttribute("x1", xd.toFixed(1)); this.dmV.setAttribute("x2", xd.toFixed(1)); this.dmV.setAttribute("y1", yd.toFixed(1)); this.dmV.setAttribute("y2", Y0.toFixed(1));
        this.dmH.setAttribute("x1", X0.toFixed(1)); this.dmH.setAttribute("x2", xd.toFixed(1)); this.dmH.setAttribute("y1", yd.toFixed(1)); this.dmH.setAttribute("y2", yd.toFixed(1));
        this.dmC.setAttribute("cx", xd.toFixed(1)); this.dmC.setAttribute("cy", yd.toFixed(1));
        this.dmT.setAttribute("x", (xd + 14).toFixed(1)); this.dmT.setAttribute("y", (yd + 30).toFixed(1));
        setFx(this.dmT, p.rv ? `*V*_{E}/2 = ${fr(C.ve / 2, 1)} mL · pH = ${fr(PKA_ETH, 2)}` : `*V*_{E}/2 = ${fr(C.ve / 2, 1)} mL`);
        show(this.dmH, p.rv ? 1 : 0);
      }

      // bande de virage : à bandePos=0, hors du tracé à gauche de l'axe ; masquée si bandeShow=0
      const hasB = p.bandeMax > p.bandeMin && p.bandeShow > 0.05;
      show(this.bandeR, hasB ? 1 : 0);
      show(this.bandeT, hasB ? 1 : 0);
      show(this.bandeVir, hasB && p.bandePos > 0.7 && p.jeu === "lecon" && p.bandeMax < 5 ? 1 : 0);
      if (hasB) {
        const pos = clamp(p.bandePos, 0, 1);
        const yTop = Y(p.bandeMax), yBot = Y(p.bandeMin);
        const xLeft = X0 - 52 * (1 - pos);
        const w = 44 + pos * (X1 - X0 - 44);
        this.bandeR.setAttribute("x", xLeft.toFixed(1));
        this.bandeR.setAttribute("y", yTop.toFixed(1));
        this.bandeR.setAttribute("width", w.toFixed(1));
        this.bandeR.setAttribute("height", Math.max(4, yBot - yTop).toFixed(1));
        // étiquette à gauche si zone >= 5 (loin de "pH = 7" à droite), à droite si zone basse
        const leftLab = p.bandeMin >= 5;
        this.bandeT.setAttribute("x", (leftLab ? X0 + 16 : X1).toFixed(1));
        this.bandeT.setAttribute("text-anchor", leftLab ? "start" : "end");
        this.bandeT.setAttribute("y", (yTop - 8).toFixed(1));
        setFx(this.bandeT, p.bandeLab || `${fr(p.bandeMin, 1)} – ${fr(p.bandeMax, 1)}`);
        if (p.jeu === "lecon" && p.bandeMax < 5) {
          const x1 = X(VIR_LECON.hel[0]), x2 = X(VIR_LECON.hel[1]);
          this.bandeVir.setAttribute("x", x1.toFixed(1));
          this.bandeVir.setAttribute("width", Math.max(4, x2 - x1).toFixed(1));
        }
      }

      // point de lecture (curV ou ptV) : sous la courbe avant E pour éviter tout croisement
      const vv = p.curV >= 0 ? p.curV : p.ptV;
      show(this.ptG, vv >= 0 ? 1 : 0);
      if (vv >= 0) {
        const yv = C.fn(vv), xp = X(vv), yp = Y(yv);
        this.ptV.setAttribute("x1", xp.toFixed(1)); this.ptV.setAttribute("x2", xp.toFixed(1)); this.ptV.setAttribute("y1", yp.toFixed(1)); this.ptV.setAttribute("y2", Y0.toFixed(1));
        this.ptH.setAttribute("x1", X0.toFixed(1)); this.ptH.setAttribute("x2", xp.toFixed(1)); this.ptH.setAttribute("y1", yp.toFixed(1)); this.ptH.setAttribute("y2", yp.toFixed(1));
        this.ptC.setAttribute("cx", xp.toFixed(1)); this.ptC.setAttribute("cy", yp.toFixed(1));
        const rightSide = vv > C.vmax * 0.65;
        this.ptT.setAttribute("x", (xp + (rightSide ? -14 : 14)).toFixed(1));
        this.ptT.setAttribute("text-anchor", rightSide ? "end" : "start");
        this.ptT.setAttribute("y", (vv < C.ve ? yp + 30 : yp - 14).toFixed(1));
        setFx(this.ptT, p.curV >= 0 ? `*V*_{B} = ${fr(vv, 1)} mL · pH = ${fr(yv, 2)}` : `*V*_{B} = ${fr(vv, 1)} mL`);
      }

      const titres = {
        lecon: ["Courbe de dosage pH = f(*V*_{B})", "acide éthanoïque par la soude"],
        s18: ["Bac PC 2018, session normale", `acide lactique (*V*_{A} = ${fr(S18.VA, 0)} mL) par la soude (*C*_{B} = ${sciF(S18.CB, 0)} mol·L^{−1})`],
        s22: ["Bac PC 2022, session normale", "figure 2 : pH et dpH/d*V*_{b} (dérivée sans échelle)"],
        s24: ["Bac PC 2024, session normale", `figure 2 : vitamine C (*V*_{A} = ${fr(S24.VA, 1)} mL) par la soude`],
      };
      const [tt, ss] = titres[p.jeu] || titres.lecon;
      this.ti.set(tt, p.sub || ss);
    },
  });
}
