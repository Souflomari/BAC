/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « La méiose, la fécondation et les brassages », deuxième partie :
 *   · `zoom`  : cellule, noyau, chromosome, ADN (copie réduite de la scène du pilote expression) ;
 *   · `adn`   : la courbe de la quantité d'ADN par cellule, en q (le gamète vaut q) ;
 *   · `table` : le nombre de types de gamètes pour n paires, 2ⁿ, puis le couple.
 * Aucune couleur écrite en dur : les classes de pilote.css seulement. Tout nombre affiché sort de
 * meiose-outils.js.
 */
import { fr, ent, sciF, types, couple, N_HOMME, ADN_G1, ADN_S, ADN_DIV1, ADN_DIV2, ADN_ZYGOTE } from "./meiose-outils";

export function scenesB(ctx, O) {
  const { E, lerp, clamp, ty, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const txt = (parent, x, y, str, cls, anchor) => E("text", { x, y, class: cls, "text-anchor": anchor || "start", text: ty(str) }, parent);

  /* ---------- le zoom : cellule → noyau → chromosome → ADN ---------- */
  scene("zoom", {
    p: { z: 0 },
    build(g) {
      const X = [44, 286, 528, 770], W = 186, Y0 = 190, H = 236;
      this.panels = X.map((x, i) => {
        const pg = E("g", {}, g), cx = x + W / 2, cy = Y0 + H / 2;
        E("rect", { x, y: Y0, width: W, height: H, rx: 6, class: "cell" }, pg);
        if (i === 0) {
          E("rect", { x: x + 16, y: Y0 + 44, width: W - 32, height: H - 88, rx: 30, class: "reg f-c" }, pg);
          E("rect", { x: x + 16, y: Y0 + 44, width: W - 32, height: H - 88, rx: 30, class: "k-ink nofill", "stroke-width": 2 }, pg);
          E("circle", { cx, cy, r: 30, class: "reg f-b" }, pg);
          E("circle", { cx, cy, r: 30, class: "k-ink nofill", "stroke-width": 2, "stroke-dasharray": "16 5" }, pg);
          pg.__sq = [cx - 40, cy - 40, 80];
        } else if (i === 1) {
          E("circle", { cx, cy, r: 84, class: "reg f-b" }, pg);
          E("circle", { cx, cy, r: 84, class: "k-ink nofill", "stroke-width": 2.5, "stroke-dasharray": "30 8" }, pg);
          [[-42, -34, 20], [30, -46, -30], [-8, 6, 40], [48, 20, -10], [-46, 40, -50], [20, 52, 15]].forEach(([dx, dy, r], k) => {
            const xg = E("g", { transform: `translate(${cx + dx} ${cy + dy}) rotate(${r})` }, pg);
            E("path", { d: "M-4 -18Q6 0 -4 18", class: (k === 2 ? "k-a" : "k-ink") + " nofill", "stroke-width": 6, "stroke-linecap": "round" }, xg);
          });
          pg.__sq = [cx - 30, cy - 30, 60];
        } else if (i === 2) {
          const xg = E("g", { transform: `translate(${cx} ${cy})` }, pg);
          E("path", { d: "M-12 -92Q16 0 -12 92", class: "k-a nofill", "stroke-width": 34, "stroke-linecap": "round" }, xg);
          E("path", { d: "M-12 -92Q16 0 -12 92", class: "k-line nofill", "stroke-width": 30, "stroke-linecap": "round" }, xg);
          for (let k = -4; k <= 4; k++) { const y = k * 20, t = (y + 92) / 184, mx = -12 + 56 * t * (1 - t); E("line", { x1: (mx - 17).toFixed(1), x2: (mx + 17).toFixed(1), y1: y - 6, y2: y + 8, class: "k-ink", "stroke-width": 2.5 }, xg); }
          pg.__sq = [cx - 34, cy - 70, 68];
        } else {
          let a = "", b = ""; const x0 = x + 14, x1 = x + W - 14;
          for (let xx = x0; xx <= x1; xx += 3) { const dy = 36 * Math.sin((xx - x0) / 15); a += (xx > x0 ? "L" : "M") + xx + " " + (cy + dy).toFixed(1); b += (xx > x0 ? "L" : "M") + xx + " " + (cy - dy).toFixed(1); }
          for (let xx = x0 + 6; xx <= x1; xx += 9) { const dy = 36 * Math.sin((xx - x0) / 15); E("line", { x1: xx, x2: xx, y1: cy + dy, y2: cy - dy, class: "k-line", "stroke-width": 1.5 }, pg); }
          E("path", { d: a, class: "k-ink nofill", "stroke-width": 3 }, pg); E("path", { d: b, class: "k-ink nofill", "stroke-width": 3 }, pg);
        }
        return pg;
      });
      ["cellule", "noyau", "chromosome", "ADN"].forEach((t, i) => txt(this.panels[i], X[i] + W / 2, Y0 + H + 34, t, "t-titre s-ink", "middle"));
      ["", "contient l’ADN", "ADN + protéines", "A, T, G, C"].forEach((t, i) => { if (t) txt(this.panels[i], X[i] + W / 2, Y0 + H + 60, t, "t-sous", "middle"); });
      this.zm = [0, 1, 2].map((i) => {
        const zg = E("g", {}, g), s = this.panels[i].__sq;
        E("rect", { x: s[0], y: s[1], width: s[2], height: s[2], class: "k-dim nofill", "stroke-width": 2 }, zg);
        E("line", { x1: s[0] + s[2], y1: s[1], x2: X[i + 1], y2: Y0, class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.5 }, zg);
        E("line", { x1: s[0] + s[2], y1: s[1] + s[2], x2: X[i + 1], y2: Y0 + H, class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 1.5 }, zg);
        return zg;
      });
      txt(g, 500, 120, "On zoome : de plus en plus petit", "t-titre s-ink", "middle");
      this.c46 = txt(g, 500, 540, "46 chromosomes par cellule humaine (23 dans un spermatozoïde ou un ovule)", "t-sous", "middle");
    },
    render() {
      const p = this.p;
      this.panels.forEach((pg, i) => (pg.style.opacity = clamp(p.z - i, 0, 1)));
      this.zm.forEach((zg, i) => (zg.style.opacity = clamp(p.z - i - 1, 0, 1) * 0.9));
      show(this.c46, clamp(p.z - 2, 0, 1));
    },
  });

  /* ---------- la quantité d'ADN par cellule : paliers, en q ---------- */
  // abscisses des segments (G1, S, division I, division II, gamètes), puis la fécondation
  const AX = { x0: 150, xs: [150, 270, 350, 550, 690, 820], xf: 930, y0: 560, h: 100 };
  const Yv = (v) => AX.y0 - AX.h * v;
  const MEIOSE = [[150, ADN_G1], [270, ADN_G1], [350, ADN_S], [520, ADN_S], [550, ADN_DIV1], [690, ADN_DIV1], [720, ADN_DIV2], [820, ADN_DIV2], [850, ADN_ZYGOTE], [930, ADN_ZYGOTE]];
  const MITOSE = [[150, ADN_G1], [270, ADN_G1], [350, ADN_S], [520, ADN_S], [550, ADN_G1], [700, ADN_G1]];
  const XFIN_MITOSE = [150, 270, 350, 550, 700];
  scene("adn", {
    p: { seg: 0, mit: 0, fec: 0, hl: 0 },
    build(g) {
      this.ti = titre(g, "La quantité d’ADN d’une cellule", "");
      // axes et graduations : q, 2q, 4q
      E("line", { x1: 130, x2: 130, y1: 130, y2: AX.y0, class: "k-ink", "stroke-width": 2 }, g);
      E("line", { x1: 130, x2: 950, y1: AX.y0, y2: AX.y0, class: "k-ink", "stroke-width": 2 }, g);
      [1, 2, 4].forEach((v) => { E("line", { x1: 130, x2: 950, y1: Yv(v), y2: Yv(v), class: "k-line", "stroke-width": 1.5, "stroke-dasharray": "3 6" }, g); fx(g, 116, Yv(v) + 7, v === 1 ? "*q*" : `${v}*q*`, "t-lab2 s-ink", "end"); });
      fx(g, 140, 128, "ADN par cellule", "t-sous", "start");
      fx(g, 950, AX.y0 + 62, "temps", "t-sous", "end");
      // le tracé : deux courbes (méiose, mitose), dévoilées de gauche à droite
      this.cm = E("path", { class: "k-ink nofill", "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      this.ct = E("path", { class: "k-ink nofill", "stroke-width": 5, "stroke-linejoin": "round", "stroke-linecap": "round" }, g);
      this.hlG = E("g", {}, g);
      E("line", { x1: 690, y1: Yv(ADN_DIV1), x2: 720, y2: Yv(ADN_DIV2), class: "k-a", "stroke-width": 9, "stroke-linecap": "round" }, this.hlG);
      this.hlT = fx(this.hlG, 738, Yv(1.5) + 10, "division II", "t-lab2 s-a", "start");
      // les étiquettes de phases sous l'axe
      this.labM = [["G1", 210], ["phase S", 310], ["division I", 450], ["division II", 620], ["gamètes", 770], ["fécondation", 890]].map(([t, x]) => fx(g, x, AX.y0 + 30, t, "t-sous", "middle"));
      this.labT = [["G1", 210], ["phase S", 310], ["mitose", 450], ["G1", 625]].map(([t, x]) => fx(g, x, AX.y0 + 30, t, "t-sous", "middle"));
      // séparateurs de segments
      this.sep = [270, 350, 550, 690, 820].map((x) => E("line", { x1: x, x2: x, y1: AX.y0, y2: AX.y0 + 40, class: "k-line", "stroke-width": 1.5 }, g));
    },
    render() {
      const p = this.p, m = p.mit > 0.5, pts = m ? MITOSE : MEIOSE, xs = m ? XFIN_MITOSE : AX.xs;
      // l'abscisse atteinte : par segment, puis la fécondation
      const k = clamp(p.seg, 0, xs.length - 1), i = Math.min(xs.length - 2, Math.floor(k));
      let xEnd = lerp(xs[i], xs[i + 1], k - i);
      if (!m && p.seg >= 5) xEnd = lerp(AX.xs[5], AX.xf, clamp(p.fec, 0, 1));
      const trace = (pp) => {
        let d = "";
        for (let j = 0; j < pp.length; j++) {
          const [x, v] = pp[j];
          if (x <= xEnd) d += (j ? "L" : "M") + x + " " + Yv(v).toFixed(1);
          else { const [xa, va] = pp[j - 1], t = (xEnd - xa) / (x - xa), vv = lerp(va, v, t); if (xEnd > xa) d += "L" + xEnd.toFixed(1) + " " + Yv(vv).toFixed(1); break; }
        }
        return d || "M150 " + Yv(2);
      };
      this.cm.setAttribute("d", trace(MEIOSE)); this.ct.setAttribute("d", trace(MITOSE));
      show(this.cm, m ? 0 : 1); show(this.ct, m ? 1 : 0);
      this.ti.set("La quantité d’ADN d’une cellule", m ? "au cours d’un cycle d’une cellule somatique (en *q*, celle d’un gamète)" : "au cours de la formation des gamètes (en *q*, celle d’un gamète)");
      const at = m ? [0.2, 1.2, 2.2, 3.5] : [0.2, 1.2, 2.2, 3.2, 4.5], aff = (j) => clamp((p.seg - at[j]) * 3, 0, 1);
      this.labM.forEach((t, j) => (t.style.opacity = m ? 0 : j < 5 ? aff(j) : clamp(p.fec * 3, 0, 1) * (p.seg >= 5 ? 1 : 0)));
      this.labT.forEach((t, j) => (t.style.opacity = m ? aff(j) : 0));
      this.sep.forEach((s, j) => (s.style.opacity = (m ? j < 4 : true) ? clamp((p.seg - (j + 0.6)) * 3, 0, 1) * (j === 4 && !m ? 1 : 1) : 0));
      show(this.hlG, p.hl * (m ? 0 : 1));
      // la chute 2q → q met l'étiquette en valeur
      this.hlT.setAttribute("x", 738);
    },
  });

  /* ---------- le nombre de types de gamètes : 2ⁿ, puis le couple ---------- */
  const LIGNES = [1, 2, 3];
  const ligneTypes = (n) => (n <= 3 ? `${Array(n).fill(2).join(" × ")} = ${ent(types(n))}` : `2^{${n}} = ${ent(types(n))}`);
  const ligneCouple = (n) => (n <= 3 ? `${ent(types(n))} × ${ent(types(n))} = ${ent(couple(n))}` : `2^{${n}} × 2^{${n}} ≈ ${sciF(couple(n), 1)}`);
  const lignePart = (n) => `1/${ent(types(n))} chacun`;
  scene("table", {
    p: { rows: 1, vis: 0, pr: 0, prv: 0, cpl: 0, cv: 0, big: 0, cro: 0 },
    build(g) {
      titre(g, "Les types de gamètes d’un individu", "sans crossing-over");
      const Y = [250, 335, 420], Y23 = 560;
      this.hd = [fx(g, 150, 190, "paires", "t-lab2 s-ink", "middle"), fx(g, 420, 190, "types de gamètes", "t-lab2 s-ink", "middle"),
        fx(g, 740, 190, "", "t-lab2 s-ink", "middle")];
      E("line", { x1: 60, x2: 940, y1: 208, y2: 208, class: "k-ink", "stroke-width": 2 }, g);
      this.row = LIGNES.map((n, i) => {
        const rg = E("g", {}, g), y = Y[i];
        return { rg, a: fx(rg, 150, y, `${n} paire${n > 1 ? "s" : ""}`, "t-cle s-ink", "middle"), b: fx(rg, 420, y, "", "t-cle s-ink", "middle"), c: fx(rg, 740, y, "", "t-cle s-ink", "middle"), n };
      });
      this.dots = fx(g, 150, 490, "…", "t-big s-dim", "middle");
      const rg = E("g", {}, g);
      this.hot = E("rect", { x: 60, y: Y23 - 44, width: 880, height: 70, rx: 4, class: "reg f-a" }, rg);
      this.r23 = { rg, a: fx(rg, 150, Y23, `${N_HOMME} paires`, "t-cle s-ink", "middle"), b: fx(rg, 420, Y23, "", "t-big2 s-ink", "middle"), c: fx(rg, 740, Y23, "", "t-big2 s-ink", "middle"), n: N_HOMME };
      this.homme = fx(rg, 150, Y23 + 30, "l’Homme", "t-sous", "middle");
      this.cro = fx(g, 500, 640, "avec le crossing-over : encore plus de types", "t-lab2 s-a", "middle");
    },
    render() {
      const p = this.p, third = p.cpl > 0.5 ? "cpl" : p.pr > 0.5 ? "pr" : "";
      setFx(this.hd[2], third === "cpl" ? "pour un couple" : third === "pr" ? "part de chaque type" : "");
      this.hd[2].style.opacity = third ? 1 : 0;
      const ligne = (r, n) => {
        const vu = n <= p.vis, c3 = third === "cpl" ? (n <= p.cv ? ligneCouple(n) : "?") : third === "pr" ? (n <= p.prv ? lignePart(n) : "?") : "";
        setFx(r.b, vu ? ligneTypes(n) : "?"); setFx(r.c, c3);
        r.c.style.opacity = third ? 1 : 0;
      };
      this.row.forEach((r, i) => { r.rg.style.opacity = clamp(p.rows - i, 0, 1); ligne(r, r.n); });
      const o23 = clamp((p.rows - 3) / 10, 0, 1);
      show(this.dots, o23); show(this.r23.rg, o23); ligne(this.r23, N_HOMME); show(this.hot, p.big * o23); show(this.cro, p.cro);
    },
  });
}
