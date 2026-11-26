/* eslint-disable */
// @ts-nocheck
/**
 * Scènes d’« État d’équilibre, acides et bases » (V3), première partie : la scène `solution`,
 * avec trois jeux :
 *   - `becher` : un flacon (l’énigme de l’hélianthine, ou un acide seul) ou deux flacons de bases ;
 *   - `trio`   : trois flacons du même acide éthanoïque à trois concentrations et leurs courbes Q_r(tic)
 *                qui rejoignent le même palier K, puis la chute à K/10 et la remontée lors de la dilution ;
 *   - `zoom`   : délégué à `acides-bases-scenes-b.js`.
 *
 * Aucune couleur nouvelle : les teintes d’indicateur sont écrites en toutes lettres (« rouge », « jaune »,
 * « teinte intermédiaire ») et n’utilisent que les remplissages de jetons existants (`f-a`, `f-b`, `f-c`).
 */
import { zoomBuild } from "./acides-bases-scenes-b";
import {
  C0, V_ML, ENIGME, INDICATEURS, teinteInd, QR_VAL, COMP_BASES,
  C_TRIO, PH_TRIO, TAU_TRIO, KA_CACHE, F_DIL, TICS_TRIO, COURBES_QR, COURBE_REMONTE,
  fr, sciF,
} from "./acides-bases-outils";

export function scenesA(ctx, O) {
  const { E, clamp, lerp, show, scene } = ctx;
  const { setFx, titre, lab } = O;

  /** Un flacon et son pH-mètre autour de (0, 0) */
  function unite(parent) {
    const gu = E("g", {}, parent);
    const nom = lab(gu, -30, -142, "", "ab-g s-ink", "middle", 28);
    const liq = E("path", { d: "M-108 10 L-108 140 Q-108 160 -88 160 L28 160 Q48 160 48 140 L48 10 Z", class: "f-b" }, gu);
    E("path", { d: "M-110 -56 L-110 140 Q-110 162 -88 162 L28 162 Q50 162 50 140 L50 -56", class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round" }, gu);
    E("line", { x1: -108, x2: 48, y1: 10, y2: 10, class: "k-ink", "stroke-width": 2.5 }, gu);
    lab(gu, -122, 20, `${fr(V_ML, 0)} mL`, "ab-l s-c", "end", 24);
    const conc = lab(gu, -30, 208, "", "ab-l s-ink", "middle", 26);
    E("path", { d: "M145 -56 L145 -106 L-30 -106 L-30 124", class: "k-ink nofill", "stroke-width": 4, "stroke-linejoin": "round", "stroke-linecap": "round" }, gu);
    E("circle", { cx: -30, cy: 124, r: 8, class: "s-ink" }, gu);
    E("rect", { x: 80, y: -56, width: 132, height: 204, rx: 12, class: "cell" }, gu);
    E("rect", { x: 92, y: -36, width: 108, height: 72, rx: 6, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
    lab(gu, 102, -6, "pH", "ab-s s-c", "start", 24);
    const val = lab(gu, 192, 26, "", "ab-g s-ink", "end", 32);
    E("circle", { cx: 120, cy: 102, r: 10, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
    E("circle", { cx: 168, cy: 102, r: 10, class: "s-bg k-ink", "stroke-width": 2.5 }, gu);
    return { g: gu, nom, liq, conc, val };
  }

  /** Jeu `trio` : trois flacons et le graphe Q_r(tic) */
  function trioBuild(g) {
    const root = E("g", {}, g);
    const CX = [112, 276, 440];
    const EXPS = ["10^{−1}", "10^{−2}", "10^{−3}"];
    const fls = CX.map((cx, i) => {
      const gf = E("g", {}, root);
      const tC = lab(gf, cx, 152, `*C*_{${i + 1}} = ${EXPS[i]}`, "ab-l s-ink", "middle", 25);
      const liq = E("path", {
        d: `M${cx - 42} 236 L${cx - 42} 302 Q${cx - 42} 316 ${cx - 28} 316 L${cx + 28} 316 Q${cx + 42} 316 ${cx + 42} 302 L${cx + 42} 236 Z`,
        class: "f-b",
      }, gf);
      const bord = E("path", {
        d: `M${cx - 44} 198 L${cx - 44} 302 Q${cx - 44} 318 ${cx - 28} 318 L${cx + 28} 318 Q${cx + 44} 318 ${cx + 44} 302 L${cx + 44} 198`,
        class: "k-ink nofill", "stroke-width": 3.5, "stroke-linejoin": "round",
      }, gf);
      E("line", { x1: cx - 42, x2: cx + 42, y1: 236, y2: 236, class: "k-ink", "stroke-width": 2 }, gf);
      const phRect = E("rect", { x: cx - 58, y: 334, width: 116, height: 50, rx: 8, class: "s-bg k-ink", "stroke-width": 2.2 }, gf);
      lab(gf, cx - 46, 367, "pH", "ab-s s-c", "start", 22);
      const phVal = lab(gf, cx + 48, 368, "", "ab-g s-ink", "end", 27);

      const barG = E("g", {}, gf);
      E("line", { x1: cx - 46, x2: cx + 46, y1: 536, y2: 536, class: "k-dim", "stroke-width": 2 }, barG);
      const barR = E("rect", { x: cx - 28, width: 56, class: "f-b k-ink", "stroke-width": 2.5 }, barG);
      const barT = lab(barG, cx, 574, "", "ab-l s-ink", "middle", 25);
      return { gf, cx, tC, liq, bord, phRect, phVal, barG, barR, barT };
    });
    const tauLeg = lab(root, 276, 614, "taux d’avancement final *τ*", "ab-s s-c", "middle", 24);

    const dlBadge = E("g", {}, root);
    E("rect", { x: 204, y: 112, width: 144, height: 42, rx: 8, class: "cell hl-a" }, dlBadge);
    lab(dlBadge, 276, 141, `dilué ×${fr(F_DIL, 0)}`, "ab-g s-a", "middle", 26);

    /* Graphe Q_r(tic) à droite */
    const GX0 = 618, GX1 = 944, GY0 = 516, GY1 = 186, YMAX = 2.0e-5;
    const Y = (q) => GY0 - ((GY0 - GY1) * clamp(q, 0, YMAX)) / YMAX;
    const gr = E("g", {}, root);
    E("line", { x1: GX0, y1: GY0, x2: GX1 + 12, y2: GY0, class: "k-dim", "stroke-width": 2.5 }, gr);
    E("line", { x1: GX0, y1: GY0, x2: GX0, y2: GY1 - 18, class: "k-dim", "stroke-width": 2.5 }, gr);
    lab(gr, GX0 + 12, GY1 - 22, "*Q*_{r}", "ab-g s-ink", "start", 28);
    lab(gr, GX1 + 10, GY0 + 62, "tic", "ab-l s-c", "end", 25);

    const xTicks = [0, 1, 2, 3].map(() => ({
      l: E("line", { y1: GY0, y2: GY0 + 7, class: "k-dim", "stroke-width": 2 }, gr),
      t: lab(gr, 0, GY0 + 32, "", "t-sous s-c", "middle", 23),
    }));

    const gradG = E("g", {}, gr);
    [1.0e-5, 2.0e-5].forEach((v) => {
      const y = Y(v);
      E("line", { x1: GX0 - 7, x2: GX0, y1: y, y2: y, class: "k-dim", "stroke-width": 2 }, gradG);
      lab(gradG, GX0 - 12, y + 8, sciF(v, 0), "t-sous s-c", "end", 22);
    });

    const dash = ["10 6", "", "4 5"];
    const courbes = [0, 1, 2].map((i) => {
      const pl = E("polyline", { class: "k-ink nofill", "stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, gr);
      if (dash[i]) pl.setAttribute("stroke-dasharray", dash[i]);
      return pl;
    });

    const chuteL = E("line", { class: "k-a", "stroke-width": 4, "stroke-dasharray": "6 5" }, gr);
    const remonteP = E("polyline", { class: "k-a nofill", "stroke-width": 4.5, "stroke-linejoin": "round", "stroke-linecap": "round" }, gr);
    const ptDil = E("circle", { r: 7, class: "s-a" }, gr);

    const klG = E("g", {}, gr);
    const yK = Y(KA_CACHE);
    E("line", { x1: GX0, x2: GX1 + 6, y1: yK, y2: yK, class: "k-ink", "stroke-width": 2.5, "stroke-dasharray": "8 6" }, klG);
    lab(klG, GX1 + 14, yK + 9, "*K*", "ab-g s-ink", "start", 30);

    const kDixT = lab(gr, GX0 + 196, Y(KA_CACHE / F_DIL) + 34, `*K* / ${fr(F_DIL, 0)}`, "ab-g s-a", "middle", 26);

    lab(root, 500, 672, "Modèle : courbes moyennes par tic (un tic n’est pas une durée mesurée).", "ab-s s-c", "middle", 22);

    return {
      render(p, ti) {
        show(root, 1);
        const dl = p.dl > 0.5;
        const xmax = dl ? 75 : TICS_TRIO;
        const X = (t) => GX0 + ((GX1 - GX0) * t) / xmax;
        const xv = dl ? [0, 25, 50, 75] : [0, 15, 30, 45];
        xTicks.forEach((tk, j) => {
          const x = X(xv[j]);
          tk.l.setAttribute("x1", x.toFixed(1)); tk.l.setAttribute("x2", x.toFixed(1));
          tk.t.setAttribute("x", x.toFixed(1)); setFx(tk.t, String(xv[j]));
        });

        show(dlBadge, p.dl);
        show(gradG, p.grad);
        show(klG, p.kl);
        show(tauLeg, p.tb);

        const rem = clamp(p.remonte, 0, 1), chu = clamp(p.chute, 0, 1);
        fls.forEach((f, i) => {
          const actif = Math.round(p.hl) === i + 1;
          f.bord.setAttribute("class", actif ? "k-a nofill" : "k-ink nofill");
          f.bord.setAttribute("stroke-width", actif ? 4.5 : 3.5);
          f.phRect.setAttribute("class", actif ? "s-bg k-a" : "s-bg k-ink");
          show(f.tC, dl && i === 1 ? 0 : 1);

          const phMontre = i === 1 || (i === 2 && (p.ph3 > 0.5 || p.grad > 0.5)) || (i === 0 && p.grad > 0.5);
          const phV = i === 1 && dl && rem > 0.5 ? lerp(PH_TRIO[1], PH_TRIO[2], rem) : PH_TRIO[i];
          setFx(f.phVal, phMontre ? fr(phV, 2) : "—");

          show(f.barG, p.tb);
          const tauV = i === 1 && dl ? lerp(TAU_TRIO[1], TAU_TRIO[2], rem) : TAU_TRIO[i];
          const bh = Math.max(6, (92 * tauV) / 0.14);
          f.barR.setAttribute("y", (536 - bh).toFixed(1));
          f.barR.setAttribute("height", bh.toFixed(1));
          f.barR.setAttribute("class", actif && dl && rem > 0.02 ? "f-a k-a" : "f-b k-ink");
          setFx(f.barT, `${fr(tauV * 100, 1)} %`);
        });

        const cv = clamp(p.cv, 0, 1), kFin = Math.round(cv * TICS_TRIO);
        courbes.forEach((pl, i) => {
          if (dl && i !== 1) { show(pl, 0); return; }
          show(pl, cv > 0.02 ? 1 : 0);
          let pts = "";
          for (let k = 0; k <= kFin; k++) pts += `${X(k).toFixed(1)},${Y(COURBES_QR[i][k]).toFixed(1)} `;
          pl.setAttribute("points", pts.trim());
          const rouge = Math.round(p.hl) === i + 1 && !dl;
          pl.setAttribute("class", rouge ? "k-a nofill" : "k-ink nofill");
          pl.setAttribute("stroke-width", rouge ? 4.5 : 3.2);
        });

        if (dl && chu > 0.02) {
          const x45 = X(TICS_TRIO), yHaut = Y(KA_CACHE), yBas = Y(lerp(KA_CACHE, KA_CACHE / F_DIL, chu));
          chuteL.setAttribute("x1", x45.toFixed(1)); chuteL.setAttribute("x2", x45.toFixed(1));
          chuteL.setAttribute("y1", yHaut.toFixed(1)); chuteL.setAttribute("y2", yBas.toFixed(1));
          show(chuteL, 1);
          show(kDixT, chu > 0.85 ? 1 : 0);
          if (rem > 0.02) {
            const kr = rem * 30, kf = Math.min(30, Math.floor(kr + 1e-9)), frRem = kf >= 30 ? 0 : kr - kf;
            let rpts = "";
            for (let k = 0; k <= kf; k++) rpts += `${X(TICS_TRIO + k).toFixed(1)},${Y(COURBE_REMONTE[k]).toFixed(1)} `;
            const qNow = frRem > 1e-3 && kf < 30 ? lerp(COURBE_REMONTE[kf], COURBE_REMONTE[kf + 1], frRem) : COURBE_REMONTE[kf];
            if (frRem > 1e-3 && kf < 30) rpts += `${X(TICS_TRIO + kr).toFixed(1)},${Y(qNow).toFixed(1)}`;
            remonteP.setAttribute("points", rpts.trim());
            show(remonteP, 1);
            ptDil.setAttribute("cx", X(TICS_TRIO + kr).toFixed(1));
            ptDil.setAttribute("cy", Y(qNow).toFixed(1));
          } else {
            show(remonteP, 0);
            ptDil.setAttribute("cx", x45.toFixed(1));
            ptDil.setAttribute("cy", yBas.toFixed(1));
          }
          show(ptDil, 1);
        } else {
          show(chuteL, 0); show(remonteP, 0); show(ptDil, 0); show(kDixT, 0);
        }

        ti.set(
          p.tit || "Trois flacons d’acide éthanoïque",
          p.sub || "concentrations en mol·L^{−1} : trois états initiaux du même acide",
        );
      },
      hide() { show(root, 0); },
    };
  }

  scene("solution", {
    p: {
      jeu: "becher", tit: "", sub: "",
      flacons: 1, mode: "", ind: "", teinte: 0, ref: 0, ph: 1, ph2: 0, pv: 0, nomx: "",
      tic: 0, gq: 1, grad: 0, qrf: 0, phm: 0, pal: 0, gros: 0, tr: 0,
      cv: 0, kl: 0, tb: 0, hl: 0, dl: 0, ph3: 0, chute: 0, remonte: 0,
    },
    build(g) {
      this.ti = titre(g, "", "");
      this.B = E("g", {}, g);

      /* Pastilles de référence de l'hélianthine */
      this.refG = E("g", {}, this.B);
      E("rect", { x: 86, y: 118, width: 384, height: 48, rx: 8, class: "cell" }, this.refG);
      lab(this.refG, 278, 150, `pH ${fr(ENIGME.phHcl, 1)} (acide) : ${INDICATEURS.hel.acide}`, "ab-l s-ink", "middle", 25);
      E("rect", { x: 530, y: 118, width: 384, height: 48, rx: 8, class: "cell" }, this.refG);
      lab(this.refG, 722, 150, `pH ${fr(ENIGME.phSoude, 1)} (soude) : ${INDICATEURS.hel.base}`, "ab-l s-ink", "middle", 25);

      this.u = [unite(this.B), unite(this.B)];

      /* Cartouche de teinte écrite en toutes lettres */
      this.swG = E("g", {}, this.B);
      this.swR = E("rect", { x: 250, y: 608, width: 500, height: 54, rx: 10, class: "cell" }, this.swG);
      this.swT = lab(this.swG, 500, 644, "", "ab-g s-ink", "middle", 28);

      this.T = trioBuild(g);
      this.Z = zoomBuild(ctx, O, g);
    },
    render() {
      const p = this.p;
      if (p.jeu === "zoom") { this.Z.render(p, this.ti); this.T.hide(); show(this.B, 0); return; }
      if (p.jeu === "trio") { this.T.render(p, this.ti); this.Z.hide(); show(this.B, 0); return; }

      this.Z.hide(); this.T.hide(); show(this.B, 1);
      const aff = (v, on, dec) => (on > 0.5 ? fr(v, dec) : "- - , -");

      if (p.flacons === 2) {
        const [a, b] = this.u;
        show(this.refG, 0); show(this.swG, 0);
        a.g.setAttribute("transform", "translate(265 392)");
        b.g.setAttribute("transform", "translate(725 392)");
        show(a.g, 1); show(b.g, 1);
        a.liq.setAttribute("class", "f-b"); b.liq.setAttribute("class", "f-b");
        const [b1, b2] = COMP_BASES;
        setFx(a.nom, `${b1.formule}  (p*K*_{A} = ${fr(b1.pka, 1)})`);
        setFx(b.nom, `${b2.formule}  (p*K*_{A} = ${fr(b2.pka, 1)})`);
        setFx(a.conc, `*C* = ${sciF(C0, 1)} mol·L^{−1}`);
        setFx(b.conc, `*C* = ${sciF(C0, 1)} mol·L^{−1}`);
        setFx(a.val, aff(b1.pH, p.ph, 1));
        setFx(b.val, aff(b2.pH, p.ph2, 1));
        this.ti.set(p.tit || "Deux solutions de base, même concentration", p.sub || "laquelle donne le pH le plus élevé ?");
      } else {
        const [a, b] = this.u;
        show(b.g, 0); show(a.g, 1);
        const estInd = p.ind === "hel";
        a.g.setAttribute("transform", `translate(460 ${estInd ? 396 : 404}) scale(1.18)`);
        show(this.refG, p.ref);
        show(this.swG, estInd ? 1 : 0);

        const pv = p.pv > 0 ? p.pv : QR_VAL.pH;
        if (estInd) {
          setFx(a.nom, p.nomx || "flacon testé");
          setFx(a.conc, "");
          setFx(a.val, aff(pv, p.ph, 1));
          if (p.teinte > 0.5) {
            const info = teinteInd("hel", pv);
            a.liq.setAttribute("class", info.zone < 0 ? "f-a" : info.zone > 0 ? "f-b" : "f-c");
            this.swR.setAttribute("class", info.zone < 0 ? "cell hl-a" : "cell");
            setFx(this.swT, info.zone === 0 ? `${info.mot} (${fr(ENIGME.zoneBas, 1)} – ${fr(ENIGME.zoneHaut, 1)})` : `teinte observée : ${info.mot}`);
          } else {
            a.liq.setAttribute("class", "f-c");
            this.swR.setAttribute("class", "cell");
            setFx(this.swT, "teinte observée : ?");
          }
          this.ti.set(p.tit || "Deux gouttes d’hélianthine", p.sub || `solution de pH ${fr(pv, 1)}`);
        } else {
          a.liq.setAttribute("class", "f-b");
          setFx(a.nom, p.nomx || "acide éthanoïque");
          setFx(a.conc, `*C* = ${sciF(C0, 1)} mol·L^{−1}`);
          setFx(a.val, aff(pv, p.ph, 2));
          this.ti.set(p.tit || "Acide éthanoïque dans l’eau", p.sub || "constante d’acidité du couple CH₃COOH / CH₃COO⁻");
        }
      }
    },
  });
}
