/* eslint-disable */
// @ts-nocheck
/**
 * Scènes d’« État d’équilibre, acides et bases » (V3), troisième partie : la scène nouvelle `axe`
 * (décision du propriétaire, plan §3.3).
 *
 * Un seul axe horizontal de pH (0 à 14, gradué par unité) porte tour à tour ou ensemble :
 *   - la frontière 7 de l’eau (`p7`) et les domaines acide / basique de la solution (`dsol`) ;
 *   - un ou deux pK_A (`pk1`, `pk2`), les domaines de prédominance du couple (`dcp`) ou la zone de
 *     virage d’un indicateur (`b0`, `b1`) ;
 *   - un ou deux curseurs de pH (`ph`, `ph2`), le rapport [A⁻]/[AH] calculé en direct (`rap`), la
 *     teinte écrite en toutes lettres (`sw`), et en PC / SM le diagramme de distribution 0–100 % (`dist`)
 *     aligné verticalement sur le même axe de pH (couplage M2, état pur M3).
 *
 * Règle M9 : avant chaque question, aucun domaine, pourcentage ni nom de teinte demandé n’est affiché.
 */
import {
  PH_AXE_MIN, PH_AXE_MAX, PH_NEUTRE, COUPLES_AXE, INDICATEURS,
  teinteInd, rapCouple, partAcide, partBase, fr, sciF,
} from "./acides-bases-outils";

/** État pur d’un point de l’axe (règle M3) */
export function etatAxe(ph, pka) {
  const rap = pka >= 0 ? rapCouple(ph, pka) : null;
  const pB = pka >= 0 ? partBase(ph, pka) * 100 : null;
  const palier = ph <= 0.05 ? "très acide"
    : Math.abs(ph - PH_NEUTRE) < 0.05 ? "neutre"
    : pka >= 0 && Math.abs(ph - pka) < 0.05 ? "autant de chaque forme"
    : ph >= 13.95 ? "très basique" : "";
  return { ph, rap, pB, pA: pB != null ? 100 - pB : null, palier };
}

export function scenesC(ctx, O) {
  const { E, clamp, show, scene } = ctx;
  const { setFx, titre, lab } = O;

  const AX0 = 96, AX1 = 904;
  const X = (v) => AX0 + ((AX1 - AX0) * clamp(v, PH_AXE_MIN, PH_AXE_MAX)) / (PH_AXE_MAX - PH_AXE_MIN);

  scene("axe", {
    p: {
      tit: "", sub: "",
      p7: 0, dsol: 0, couple: "aucun",
      pk1: -1, pk2: -1, eq50: 0, dcp: 0,
      b0: -1, b1: -1,
      ph: -1, ph2: -1,
      rap: 0, dist: 0, pct: 0, sw: 0,
    },
    build(g) {
      this.ti = titre(g, "", "");

      /* ----- Axe gradué de pH (0 à 14) ----- */
      this.axG = E("g", {}, g);
      const AY = 158;
      this.AY = AY;
      E("line", { x1: AX0, y1: AY, x2: AX1 + 18, y2: AY, class: "k-ink", "stroke-width": 3, "marker-end": "url(#arw)" }, this.axG);
      for (let v = PH_AXE_MIN; v <= PH_AXE_MAX; v++) {
        E("line", { x1: X(v), x2: X(v), y1: AY - 6, y2: AY + 7, class: "k-ink", "stroke-width": v % 2 === 0 || v === 7 ? 2.5 : 1.6 }, this.axG);
        lab(this.axG, X(v), AY - 16, String(v), "t-sous s-c", "middle", 22);
      }
      lab(this.axG, AX1 + 30, AY + 8, "pH", "ab-g s-ink", "start", 26);

      /* ----- Bande 1 : nature de la solution aqueuse (frontière 7) ----- */
      this.solG = E("g", {}, g);
      this.solL = E("rect", { x: X(0), y: 188, width: X(7) - X(0), height: 52, rx: 4, class: "f-c k-line", "stroke-width": 1.5 }, this.solG);
      this.solR = E("rect", { x: X(7), y: 188, width: X(14) - X(7), height: 52, rx: 4, class: "f-b k-line", "stroke-width": 1.5 }, this.solG);
      lab(this.solG, X(3.5), 222, "solution acide", "ab-l s-ink", "middle", 25);
      lab(this.solG, X(10.5), 222, "solution basique", "ab-l s-ink", "middle", 25);

      this.p7G = E("g", {}, g);
      this.p7Line = E("line", { x1: X(7), x2: X(7), y1: AY - 10, y2: 248, class: "k-ink", "stroke-width": 3.5 }, this.p7G);
      this.p7Txt = lab(this.p7G, X(7), 274, "pH = 7", "ab-g s-ink", "middle", 25);

      /* ----- Bande 2 : prédominance du couple ou zone de virage ----- */
      this.cpG = E("g", {}, g);
      this.cpL = E("rect", { rx: 4, class: "f-c k-line", "stroke-width": 1.5 }, this.cpG);
      this.cpR = E("rect", { rx: 4, class: "f-b k-line", "stroke-width": 1.5 }, this.cpG);
      this.cpTL = lab(this.cpG, 0, 0, "", "ab-l s-ink", "middle", 25);
      this.cpTR = lab(this.cpG, 0, 0, "", "ab-l s-ink", "middle", 25);

      this.banG = E("g", {}, g);
      this.banR = E("rect", { rx: 4, class: "cell hl-a" }, this.banG);
      this.banT = lab(this.banG, 0, 0, "", "ab-l s-a", "middle", 24);

      /* Marques de pK_A */
      this.pk1G = E("g", {}, g);
      this.pk1L = E("line", { class: "k-ink", "stroke-width": 3, "stroke-dasharray": "6 4" }, this.pk1G);
      this.pk1T = lab(this.pk1G, 0, 0, "", "ab-g s-ink", "middle", 25);

      this.pk2G = E("g", {}, g);
      this.pk2L = E("line", { class: "k-ink", "stroke-width": 3, "stroke-dasharray": "6 4" }, this.pk2G);
      this.pk2T = lab(this.pk2G, 0, 0, "", "ab-g s-ink", "middle", 25);

      /* ----- Repère de distribution 0–100 % (PC et SM) ----- */
      this.distG = E("g", {}, g);
      const DY0 = 604, DY1 = 314;
      this.DY0 = DY0; this.DY1 = DY1;
      E("line", { x1: AX0, y1: DY0, x2: AX1 + 14, y2: DY0, class: "k-dim", "stroke-width": 2 }, this.distG);
      E("line", { x1: AX0, y1: DY0, x2: AX0, y2: DY1 - 14, class: "k-dim", "stroke-width": 2 }, this.distG);
      [0, 50, 100].forEach((v) => {
        const y = DY0 - ((DY0 - DY1) * v) / 100;
        E("line", { x1: AX0 - 6, x2: v === 50 ? AX1 : AX0, y1: y, y2: y, class: "k-dim", "stroke-width": v === 50 ? 1.5 : 2, ...(v === 50 ? { "stroke-dasharray": "6 6" } : {}) }, this.distG);
        lab(this.distG, AX0 - 12, y + 8, `${v} %`, "t-sous s-c", "end", 22);
      });
      this.cAcide = E("polyline", { class: "k-ink nofill", "stroke-width": 3.5, "stroke-dasharray": "10 6" }, this.distG);
      this.cBase = E("polyline", { class: "k-ink nofill", "stroke-width": 4 }, this.distG);
      this.lblAcide = lab(this.distG, AX0 + 22, DY1 + 36, "", "ab-g s-ink", "start", 25);
      this.lblBase = lab(this.distG, AX1 - 18, DY1 + 36, "", "ab-g s-ink", "end", 25);
      this.ptPct1 = E("circle", { r: 7, class: "s-a" }, this.distG);
      this.txtPct1 = lab(this.distG, 0, 0, "", "ab-g s-a", "start", 25);
      this.ptPct2 = E("circle", { r: 7, class: "s-a" }, this.distG);
      this.txtPct2 = lab(this.distG, 0, 0, "", "ab-g s-a", "end", 25);

      /* ----- Curseurs de pH ----- */
      this.cur1 = E("g", {}, g);
      this.cur1L = E("line", { class: "k-a", "stroke-width": 3, "stroke-dasharray": "5 4" }, this.cur1);
      this.cur1C = E("circle", { cy: AY, r: 8.5, class: "s-a" }, this.cur1);
      this.cur1T = lab(this.cur1, 0, 0, "", "ab-g s-a", "middle", 25);

      this.cur2 = E("g", {}, g);
      this.cur2L = E("line", { class: "k-a", "stroke-width": 3, "stroke-dasharray": "5 4" }, this.cur2);
      this.cur2C = E("circle", { cy: AY, r: 8.5, class: "s-a" }, this.cur2);
      this.cur2T = lab(this.cur2, 0, 0, "", "ab-g s-a", "middle", 25);

      /* ----- Cartouche bas : rapport [A⁻]/[AH], égalité, ou teinte écrite ----- */
      this.boxG = E("g", {}, g);
      this.boxR = E("rect", { x: 210, y: 500, width: 580, height: 68, rx: 10, class: "cell" }, this.boxG);
      this.boxT = lab(this.boxG, 500, 543, "", "ab-g s-ink", "middle", 28);
    },

    render() {
      const p = this.p, AY = this.AY, DY0 = this.DY0, DY1 = this.DY1;
      const YD = (pct) => DY0 - ((DY0 - DY1) * clamp(pct, 0, 100)) / 100;
      const distOn = p.dist > 0.02;
      const solOn = p.dsol > 0.02;

      show(this.solG, p.dsol);
      show(this.p7G, p.p7);
      this.p7Line.setAttribute("y2", solOn ? "246" : "202");
      this.p7Txt.setAttribute("y", solOn ? "274" : "232");
      setFx(this.p7Txt, solOn ? "neutre (7)" : "7");

      /* Position verticale de la bande du couple : plus haute si le graphe de distribution est affiché */
      const cy = distOn ? 188 : (solOn || p.p7 > 0.5 ? 304 : 230);
      const ch = distOn ? 48 : 58;
      const hasBan = p.b0 >= 0 && p.b1 > p.b0;
      const cp = COUPLES_AXE[p.couple] || COUPLES_AXE.ethan;
      const ind = INDICATEURS[p.couple] || null;

      if (p.dcp > 0.02) {
        show(this.cpG, p.dcp);
        const pivotG = hasBan ? p.b0 : (p.pk1 >= 0 ? p.pk1 : cp.pka);
        const pivotD = hasBan ? p.b1 : pivotG;
        this.cpL.setAttribute("x", X(0).toFixed(1));
        this.cpL.setAttribute("y", String(cy));
        this.cpL.setAttribute("width", Math.max(0, X(pivotG) - X(0)).toFixed(1));
        this.cpL.setAttribute("height", String(ch));
        this.cpR.setAttribute("x", X(pivotD).toFixed(1));
        this.cpR.setAttribute("y", String(cy));
        this.cpR.setAttribute("width", Math.max(0, X(14) - X(pivotD)).toFixed(1));
        this.cpR.setAttribute("height", String(ch));

        const txtG = ind ? (p.couple === "hel" ? `HIn (${ind.acide})` : ind.acide) : `${cp.acide}`;
        const txtD = ind ? (p.couple === "hel" ? `In^{−} (${ind.base})` : ind.base) : `${cp.base}`;
        this.cpTL.setAttribute("x", X(pivotG / 2).toFixed(1));
        this.cpTL.setAttribute("y", String(cy + ch / 2 + 9));
        setFx(this.cpTL, txtG);
        this.cpTR.setAttribute("x", X((pivotD + 14) / 2).toFixed(1));
        this.cpTR.setAttribute("y", String(cy + ch / 2 + 9));
        setFx(this.cpTR, txtD);
      } else {
        show(this.cpG, 0);
      }

      if (hasBan) {
        show(this.banG, 1);
        this.banR.setAttribute("x", X(p.b0).toFixed(1));
        this.banR.setAttribute("y", String(cy));
        this.banR.setAttribute("width", (X(p.b1) - X(p.b0)).toFixed(1));
        this.banR.setAttribute("height", String(ch));
        this.banT.setAttribute("x", X((p.b0 + p.b1) / 2).toFixed(1));
        this.banT.setAttribute("y", String(cy - 12));
        setFx(this.banT, `virage ${fr(p.b0, 1)} – ${fr(p.b1, 1)}`);
      } else {
        show(this.banG, 0);
      }

      /* Marques de pK_A */
      if (p.pk1 >= 0) {
        show(this.pk1G, 1);
        const x1 = X(p.pk1);
        const yBas = distOn ? DY0 : cy + ch + 8;
        this.pk1L.setAttribute("x1", x1.toFixed(1)); this.pk1L.setAttribute("x2", x1.toFixed(1));
        this.pk1L.setAttribute("y1", String(AY)); this.pk1L.setAttribute("y2", String(yBas));
        const decX = p.pk2 >= 0 ? -74 : 0;
        this.pk1T.setAttribute("x", (x1 + decX).toFixed(1));
        this.pk1T.setAttribute("y", String(distOn ? DY0 + 36 : yBas + 28));
        const dec = Math.abs(p.pk1 * 10 - Math.round(p.pk1 * 10)) > 1e-3 ? 2 : 1;
        setFx(this.pk1T, p.pk2 >= 0 ? `p*K*_{A2} = ${fr(p.pk1, dec)}` : `p*K*_{A} = ${fr(p.pk1, dec)}`);
      } else {
        show(this.pk1G, 0);
      }

      if (p.pk2 >= 0) {
        show(this.pk2G, 1);
        const x2 = X(p.pk2), yBas = cy + ch + 8;
        this.pk2L.setAttribute("x1", x2.toFixed(1)); this.pk2L.setAttribute("x2", x2.toFixed(1));
        this.pk2L.setAttribute("y1", String(AY)); this.pk2L.setAttribute("y2", String(yBas));
        this.pk2T.setAttribute("x", (x2 + 78).toFixed(1));
        this.pk2T.setAttribute("y", String(yBas + 28));
        setFx(this.pk2T, `p*K*_{A1} = ${fr(p.pk2, 1)}`);
      } else {
        show(this.pk2G, 0);
      }

      /* Courbes de distribution */
      show(this.distG, distOn ? p.dist : 0);
      if (distOn) {
        const pka = cp.pka;
        let pA = "", pB = "";
        for (let i = 0; i <= 140; i++) {
          const ph = (14 * i) / 140;
          pA += `${X(ph).toFixed(1)},${YD(partAcide(ph, pka) * 100).toFixed(1)} `;
          pB += `${X(ph).toFixed(1)},${YD(partBase(ph, pka) * 100).toFixed(1)} `;
        }
        this.cAcide.setAttribute("points", pA.trim());
        this.cBase.setAttribute("points", pB.trim());
        setFx(this.lblAcide, `% ${cp.acide}`);
        setFx(this.lblBase, `% ${cp.base}`);

        if (p.pct > 0.5 && p.ph >= 0) {
          const b1 = partBase(p.ph, pka) * 100;
          this.ptPct1.setAttribute("cx", X(p.ph).toFixed(1));
          this.ptPct1.setAttribute("cy", YD(b1).toFixed(1));
          this.txtPct1.setAttribute("x", (X(p.ph) + 14).toFixed(1));
          this.txtPct1.setAttribute("y", (YD(b1) + (b1 > 80 ? 28 : -12)).toFixed(1));
          setFx(this.txtPct1, `${fr(b1, b1 > 99 ? 1 : 0)} %`);
          show(this.ptPct1, 1); show(this.txtPct1, 1);
        } else {
          show(this.ptPct1, 0); show(this.txtPct1, 0);
        }

        if (p.pct > 0.5 && p.ph2 >= 0) {
          const b2 = partBase(p.ph2, pka) * 100;
          this.ptPct2.setAttribute("cx", X(p.ph2).toFixed(1));
          this.ptPct2.setAttribute("cy", YD(b2).toFixed(1));
          this.txtPct2.setAttribute("x", (X(p.ph2) - 12).toFixed(1));
          this.txtPct2.setAttribute("y", (YD(b2) + 32).toFixed(1));
          setFx(this.txtPct2, `${fr(b2, 1)} %`);
          show(this.ptPct2, 1); show(this.txtPct2, 1);
        } else {
          show(this.ptPct2, 0); show(this.txtPct2, 0);
        }
      }

      /* Curseurs de pH */
      const yCurBas = distOn ? DY0 : cy + ch + 10;
      if (p.ph >= 0) {
        show(this.cur1, 1);
        const x = X(p.ph);
        this.cur1L.setAttribute("x1", x.toFixed(1)); this.cur1L.setAttribute("x2", x.toFixed(1));
        this.cur1L.setAttribute("y1", String(AY)); this.cur1L.setAttribute("y2", String(yCurBas));
        this.cur1C.setAttribute("cx", x.toFixed(1));
        this.cur1T.setAttribute("x", (p.ph2 >= 0 && Math.abs(p.ph2 - p.ph) < 2.2 ? x - 36 : x).toFixed(1));
        this.cur1T.setAttribute("y", String(distOn ? DY0 + 62 : yCurBas + 58));
        const decPh = Math.abs(p.ph * 10 - Math.round(p.ph * 10)) > 1e-3 ? 2 : 1;
        setFx(this.cur1T, `pH ${fr(p.ph, decPh)}`);
      } else {
        show(this.cur1, 0);
      }

      if (p.ph2 >= 0) {
        show(this.cur2, 1);
        const x = X(p.ph2);
        this.cur2L.setAttribute("x1", x.toFixed(1)); this.cur2L.setAttribute("x2", x.toFixed(1));
        this.cur2L.setAttribute("y1", String(AY)); this.cur2L.setAttribute("y2", String(yCurBas));
        this.cur2C.setAttribute("cx", x.toFixed(1));
        this.cur2T.setAttribute("x", x.toFixed(1));
        this.cur2T.setAttribute("y", String(distOn ? DY0 + 62 : yCurBas + 58));
        setFx(this.cur2T, `pH ${fr(p.ph2, 1)}`);
      } else {
        show(this.cur2, 0);
      }

      /* Cartouche du bas (hors graphe de distribution) */
      if (!distOn && p.eq50 > 0.5) {
        show(this.boxG, 1);
        this.boxR.setAttribute("class", "cell");
        setFx(this.boxT, `à pH = p*K*_{A} : [${cp.base}]_{éq} = [${cp.acide}]_{éq}`);
      } else if (!distOn && p.rap > 0.5 && p.ph >= 0) {
        show(this.boxG, 1);
        this.boxR.setAttribute("class", "cell");
        const pka = p.pk1 >= 0 ? p.pk1 : cp.pka;
        const r = rapCouple(p.ph, pka);
        const rStr = r >= 100 || r <= 0.01 ? sciF(r, 1) : r >= 10 ? fr(r, 0) : fr(r, 2);
        setFx(this.boxT, `[${cp.base}] / [${cp.acide}] ≈ ${rStr}`);
      } else if (!distOn && p.sw > 0.5 && ind && p.ph >= 0) {
        show(this.boxG, 1);
        const info = teinteInd(p.couple, p.ph);
        this.boxR.setAttribute("class", info.zone < 0 ? "cell hl-a" : "cell");
        setFx(this.boxT, `teinte observée : ${info.mot}`);
      } else {
        show(this.boxG, 0);
      }

      this.ti.set(
        p.tit || (distOn ? "Diagramme de distribution" : "L’axe des pH"),
        p.sub || (ind ? `${ind.court} : un couple coloré sur l’axe des pH` : "de 0 à 14, à 25 °C"),
      );
    },
  });
}
