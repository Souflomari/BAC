/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « Les lois statistiques de la transmission des caractères » : `rencontre`, l'échiquier F1 × F1
 * (L//ℓ × L//ℓ) où les gamètes glissent des bords vers la case, où le génotype naît de leur rencontre, et où
 * le bilan des phénotypes se remplit (procédé de la maquette « Transmission » du rapport 11).
 *
 * La grille, les gamètes, les génotypes, les phénotypes et les fractions viennent de `CAS.f2`
 * (transmission-outils.js) : rien n'est écrit à la main. Chaque case a sa progression `t`, de 0 à 1 :
 *   0 → 0,62   le gamète de la colonne descend, celui de la ligne glisse, jusqu'au-dessus et en dessous du centre
 *   0,62 → 0,82   ils se rejoignent au centre
 *   0,8 → 1    le génotype naît ; il porte alors la case (phénotype, fraction si leurs gardes le permettent)
 * La progression de la case i est le plus grand de : `fill − i` (le remplissage dans l'ordre : fill = 3,5 est
 * la quatrième case à mi-course), `c<i>` (une case remplie à part, au choix de l'élève), et 1 si l'élève l'a déjà
 * remplie (`manual`, quand `man` = 1).
 *
 * Gardes : `phe` 0 cache les phénotypes et le bilan (la réponse de « les phénotypes de la F2 ? ») ; `wl` 0 cache
 * la fraction de chaque case ; `cls` allume les cases d'un phénotype et en grise les autres.
 * Le bilan est une barre qui se remplit au fil des naissances de génotypes : [L] d'abord, [ℓ] à la suite.
 * Couleurs : des classes seulement ; le rouge n'est donné qu'au gamète en route et à l'en-tête qui le porte.
 */
import { CAS } from "./transmission-outils";

export function scenesD(ctx, O) {
  const { E, lerp, clamp, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const D = CAS.f2;
  const lisse = (t) => t * t * (3 - 2 * t);
  const f1 = (v) => v.toFixed(1);
  const sup = (s) => String(s).replace(/⁺/g, "^{+}");

  const GX = 270, GY = 235, CW = 270, CH = 150;                 // la grille : son coin, la taille d'une case
  const HX = 255;                                               // la colonne des en-têtes de lignes (ancrés à droite)
  const BX = GX, BY = 592, BW = CW * D.cols.length, BH = 36;    // la barre du bilan
  const cxOf = (ci) => GX + ci * CW + CW / 2, cyOf = (ri) => GY + ri * CH + CH / 2;
  const YG = 210;                                               // la ligne des gamètes en tête de colonne
  const gam = (h) => `${h.join("/ ")}/`;
  const plur = (n) => `${n} case${n > 1 ? "s" : ""}`;

  scene("rencontre", {
    p: { fill: 0, c0: 0, c1: 0, c2: 0, c3: 0, man: 0, phe: 0, wl: 0, cls: "" },
    manual: new Set(), onCell: null,
    build(g) {
      this.ti = titre(g, "Échiquier de croisement", "F1 × F1 : L//ℓ × L//ℓ");
      // les en-têtes : la proportion au-dessus du gamète
      this.colH = D.cols.map((c, ci) => ({ a: fx(g, cxOf(ci), 170, c.pl, "t-lab2 s-c", "middle", 28), b: fx(g, cxOf(ci), YG, sup(gam(c.h)), "t-big2 s-ink", "middle", 34) }));
      this.rowH = D.rows.map((r, ri) => ({ a: fx(g, HX, cyOf(ri) - 2, r.pl, "t-lab2 s-c", "end", 28), b: fx(g, HX, cyOf(ri) + 34, sup(gam(r.h)), "t-big2 s-ink", "end", 34) }));
      // les cases
      this.cells = D.cells.map((x, i) => {
        const cg = E("g", { style: "cursor:pointer" }, g);
        const r = E("rect", { x: f1(GX + x.ci * CW + 2), y: f1(GY + x.ri * CH + 2), width: CW - 4, height: CH - 4, rx: 6, class: "cell" }, cg);
        cg.addEventListener("click", () => { this.onCell && this.onCell(i); });
        const cx = cxOf(x.ci);
        return { g: cg, r, geno: fx(cg, cx, 0, x.geno, "t-big2 s-ink", "middle", 34), phe: fx(cg, cx, 0, x.phe, "t-lab2 s-c", "middle", 28), w: fx(cg, cx, 0, x.wlab, "t-lab2 s-ink", "middle", 28) };
      });
      // la barre du bilan : [L] d'abord, [ℓ] ensuite ; le contour par-dessus
      this.bar = E("g", {}, g);
      this.bL = E("rect", { y: BY, height: BH, class: "reg f-b" }, this.bar);
      this.bR = E("rect", { y: BY, height: BH, class: "reg f-a" }, this.bar);
      E("rect", { x: BX, y: BY, width: BW, height: BH, class: "k-ink nofill", "stroke-width": 2 }, this.bar);
      this.cl = D.classes.map((c, k) => fx(this.bar, k === 0 ? BX : BX + BW, BY + BH + 38, "", "t-lab2 s-ink", k === 0 ? "start" : "end", 28));
      // les gamètes en route, par-dessus tout : celui de la colonne, celui de la ligne
      this.fl = D.cells.map((x) => ({ c: fx(g, cxOf(x.ci), YG, sup(gam(D.cols[x.ci].h)), "t-big2 s-a", "middle", 34), r: fx(g, HX - 20, cyOf(x.ri) + 34, sup(gam(D.rows[x.ri].h)), "t-big2 s-a", "middle", 34) }));
    },
    render() {
      const p = this.p, ph = clamp(p.phe, 0, 1), wl = clamp(p.wl, 0, 1), man = clamp(p.man, 0, 1);
      const prog = D.cells.map((_, i) => Math.max(clamp(p.fill - i, 0, 1), clamp(p["c" + i], 0, 1), this.manual.has(i) ? man : 0));
      const actCol = new Set(), actRow = new Set();
      const cnt = D.classes.map(() => ({ x: 0, n: 0 }));
      D.cells.forEach((x, i) => {
        const t = prog[i], c = this.cells[i], f = this.fl[i];
        const glide = lisse(clamp(t / 0.62, 0, 1)), merge = lisse(clamp((t - 0.62) / 0.2, 0, 1)), born = lisse(clamp((t - 0.8) / 0.2, 0, 1));
        const cx = cxOf(x.ci), cy = cyOf(x.ri);
        // la case : allumée si son phénotype est celui qu'on regarde, grise sinon
        const nee = t > 0.9, hl = p.cls && x.phe === p.cls && !x.bar && nee;
        c.r.setAttribute("class", `cell${hl ? " hl-a" : ""}`);
        c.g.style.opacity = p.cls && !hl && nee ? 0.6 : 1;
        // les gamètes : de leurs en-têtes jusqu'au-dessus et en dessous du centre, puis ensemble au centre
        const yc = lerp(lerp(YG, cy - 30, glide), cy - 4, merge), yr = lerp(cy + 34, cy + 4, merge), xr = lerp(HX - 20, cx, glide);
        f.c.setAttribute("x", f1(cx)); f.c.setAttribute("y", f1(yc));
        f.r.setAttribute("x", f1(xr)); f.r.setAttribute("y", f1(yr));
        const vol = t > 0.001 ? 1 - born : 0;
        show(f.c, vol); show(f.r, vol);
        if (t > 0.001 && t < 0.85) { actCol.add(x.ci); actRow.add(x.ri); }
        // le génotype naît de la rencontre ; le phénotype et la fraction se posent dessous, selon leurs gardes
        // les lignes de la case : génotype, puis phénotype, puis fraction ; une ligne n'a sa place qu'à partir de l'instant où sa garde s'ouvre
        const sp = ph > 0.01 ? 1 : 0, sw = wl > 0.01 ? 1 : 0, nl = 1 + sp + sw, y0 = (j) => cy + (j - (nl - 1) / 2) * 40 + 10;
        c.geno.setAttribute("y", f1(y0(0))); c.phe.setAttribute("y", f1(y0(1))); c.w.setAttribute("y", f1(y0(1 + sp)));
        show(c.geno, born); show(c.phe, born * ph); show(c.w, born * wl);
        // le bilan : une case née compte pour sa classe
        const k = D.classes.findIndex((q) => q.key === x.phe);
        if (k >= 0) { cnt[k].x += born; if (born > 0.5) cnt[k].n++; }
      });
      // les en-têtes de la colonne et de la ligne qui portent un gamète en route
      this.colH.forEach((h, ci) => h.b.setAttribute("class", `t-big2 ${actCol.has(ci) ? "s-a" : "s-ink"}`));
      this.rowH.forEach((h, ri) => h.b.setAttribute("class", `t-big2 ${actRow.has(ri) ? "s-a" : "s-ink"}`));
      // la barre du bilan
      const wL = (cnt[0].x / D.N) * BW * ph, wR = ((cnt[1] ? cnt[1].x : 0) / D.N) * BW * ph;
      this.bL.setAttribute("x", f1(BX)); this.bL.setAttribute("width", f1(wL));
      this.bR.setAttribute("x", f1(BX + wL)); this.bR.setAttribute("width", f1(wR));
      show(this.bar, ph);
      this.cl.forEach((t, k) => { setFx(t, `${D.classes[k].key} : ${plur(cnt[k].n)} sur ${D.N}`, 28); t.setAttribute("class", `t-lab2 ${p.cls === D.classes[k].key ? "s-a" : "s-ink"}`); });
    },
  });
}
