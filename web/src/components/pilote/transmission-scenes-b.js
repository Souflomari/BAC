/* eslint-disable */
// @ts-nocheck
/**
 * Scène NOUVELLE de la leçon « Les lois statistiques de la transmission des caractères » : `echiquier`
 * (accordée par le relecteur, plan §9.2). Deux modes :
 *   · `crx` : le schéma de croisement des sujets, en trois lignes (Parents · Génotypes · résultat) ;
 *   · `grille` : l'échiquier à deux entrées, de 1 × 1 à 4 × 4 : gamètes et proportions en entête,
 *     chaque case porte génotype, phénotype entre crochets et fraction ; cases barrées d'une croix
 *     (gène létal) ; `aire` fait prendre aux lignes et colonnes une largeur proportionnelle à la
 *     proportion du gamète (le « carré des aires ») ; `obs` ajoute l'observé ; `tot` compte les cases.
 * À 390 px, une grille de 8 cases ou plus n'affiche que les phénotypes ; le génotype de la case
 * touchée s'écrit sous la grille (plan §9.2).
 *
 * Toutes les positions sont calculées à partir des proportions des gamètes ; aucune couleur écrite en
 * dur : les classes k-*, s-*, f-*, cell, hl-a seulement. Le texte d'une case se réduit (taille, puis
 * nombre de lignes) pour tenir dans la case.
 */

const TEL = typeof matchMedia === "function" ? matchMedia("(max-width: 899px)") : { matches: false };
const sup = (s) => String(s).replace(/⁺/g, "^{+}");

export function scenesB(ctx, O) {
  const { E, lerp, clamp, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const clear = (g) => { while (g.firstChild) g.removeChild(g.firstChild); };
  const setL = (el, x1, y1, x2, y2) => { el.setAttribute("x1", x1.toFixed(1)); el.setAttribute("y1", y1.toFixed(1)); el.setAttribute("x2", x2.toFixed(1)); el.setAttribute("y2", y2.toFixed(1)); };
  const f1 = (v) => v.toFixed(1);
  // une graine : lisse (un cercle) ou ridée (un contour ondulé)
  const graine = (g, cx, cy, r, type) => {
    if (type === "lisse") return E("circle", { cx, cy, r, class: "k-ink nofill", "stroke-width": 3 }, g);
    let d = "";
    for (let i = 0; i <= 48; i++) { const a = (i / 48) * 2 * Math.PI, rr = r * (1 + 0.13 * Math.sin(7 * a)); d += `${i ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`; }
    return E("path", { d: d + "Z", class: "k-ink nofill", "stroke-width": 3, "stroke-linejoin": "round" }, g);
  };

  scene("echiquier", {
    p: { crx: 0, v1: 0, v2: 0, v3: 0, fcnt: 0, cr: null, grille: 0, G: null, fill: 99, phe: 0, cls: "", aire: 0, obs: 0, tot: 0, leg: 0, hd: 1, sel: -1, wl: 1, gn: 0, xb: 1 },
    manual: new Set(), onCell: null,
    build(g) {
      this.ti = titre(g, "", "");
      this.X = E("g", {}, g);
      this.R = E("g", {}, g);
      this._cr = undefined; this._G = undefined;
    },
    /* ---------- le schéma de croisement ---------- */
    buildCrx(cr) {
      const X = this.X; clear(X); this.r1 = this.r2 = this.r3 = null;
      if (!cr) return;
      const n = cr.p.length, xs = n === 1 ? [560] : [400, 720];
      // ligne 1 : les parents
      this.r1 = E("g", {}, X); const g1 = this.r1;
      fx(g1, 40, 168, "Parents", "t-titre s-ink", "start", 26);
      cr.p.forEach((ph, i) => {
        if (cr.ic && cr.ic[i]) graine(g1, xs[i], 150, 28, cr.ic[i]);
        fx(g1, xs[i], 232, ph, "t-big2 s-ink", "middle", 42);
        fx(g1, xs[i], 266, cr.pn[i], "t-lab s-dim", "middle", 24);
      });
      if (n === 2) fx(g1, 560, 232, "×", "t-big2 s-ink", "middle", 42);
      // ligne 2 : les génotypes et leurs gamètes
      this.r2 = E("g", {}, X); const g2 = this.r2;
      fx(g2, 40, 346, "Génotypes", "t-titre s-ink", "start", 26);
      cr.g.forEach((gt, i) => {
        fx(g2, xs[i], 350, gt, "t-big2 s-ink", "middle", 40);
        if (cr.gm) fx(g2, xs[i], 388, cr.gm[i], "t-lab s-dim", "middle", 24);
      });
      if (n === 2) fx(g2, 560, 350, "×", "t-big2 s-ink", "middle", 40);
      // ligne 3 : la génération obtenue
      this.r3 = E("g", {}, X); const g3 = this.r3;
      fx(g3, 40, 500, cr.gen, "t-cle s-ink", "start", 34);
      this.q = fx(g3, 560, 506, "?", "t-huge s-dim", "middle", 60);
      this.res = E("g", {}, g3);
      const m = cr.res.length, rx = m === 1 ? [560] : [380, 740];
      cr.res.forEach((it, i) => {
        if (it.ic) graine(this.res, rx[i] - (m === 1 ? 130 : 130), 496, 26, it.ic);
        fx(this.res, rx[i] - (it.ic ? 90 : 0) + (it.ic ? 0 : 0), 506, it.t, "t-lab2 s-ink", it.ic ? "start" : "middle", 30);
      });
      if (m === 2 && cr.res.every((x) => x.w)) {
        const tot = cr.res[0].w + cr.res[1].w, W = 640, x0 = 240, w1 = (cr.res[0].w / tot) * W;
        E("rect", { x: x0, y: 550, width: w1, height: 34, class: "reg f-b" }, this.res);
        E("rect", { x: x0 + w1, y: 550, width: W - w1, height: 34, class: "reg f-a" }, this.res);
        E("rect", { x: x0, y: 550, width: W, height: 34, class: "k-ink nofill", "stroke-width": 2 }, this.res);
      }
      if (cr.note) fx(g3, 560, 628, cr.note, "t-lab s-dim", "middle", 24);
    },
    /* ---------- les grilles ---------- */
    buildGrille(G) {
      const R = this.R; clear(R); this.gs = [];
      this.sel = fx(R, 500, 700, "", "t-lab2 s-ink", "middle", 30);
      [].concat(G || []).forEach((D) => {
        const gg = E("g", {}, R), o = { D, g: gg };
        o.sub = fx(gg, 0, 0, D.legende || "", "t-lab2 s-ink", "middle", 24);
        o.colH = D.cols.map(() => ({ g: E("g", {}, gg) }));
        o.colH.forEach((c, i) => { c.a = fx(c.g, 0, 0, "", "t-lab2 s-ink", "middle", 26); c.b = fx(c.g, 0, 0, "", "t-lab2 s-ink", "middle", 26); c.l = E("line", { class: "k-dim", "stroke-width": 1.5 }, c.g); });
        o.rowH = D.rows.map(() => ({ g: E("g", {}, gg) }));
        o.rowH.forEach((c) => { c.a = fx(c.g, 0, 0, "", "t-lab2 s-ink", "end", 26); c.b = fx(c.g, 0, 0, "", "t-lab2 s-ink", "end", 26); });
        o.cells = D.cells.map((x, i) => {
          const cg = E("g", { style: "cursor:pointer" }, gg), c = { x, g: cg };
          c.r = E("rect", { class: "cell", rx: 6 }, cg);
          c.t = [0, 1, 2, 3].map(() => fx(cg, 0, 0, "", "t-lab s-ink", "middle", 20));
          c.k1 = E("line", { class: "k-dim", "stroke-width": 2.5, "stroke-linecap": "round" }, cg);
          c.k2 = E("line", { class: "k-dim", "stroke-width": 2.5, "stroke-linecap": "round" }, cg);
          cg.addEventListener("click", () => { this.p.sel = i; this.onCell && this.onCell(i, D); this.render(); });
          return c;
        });
        o.leg = D.classes.map(() => fx(gg, 0, 0, "", "t-lab s-ink", "start", 22));
        this.gs.push(o);
      });
    },
    render() {
      const p = this.p, tel = TEL.matches;
      if (p.cr !== this._cr) { this._cr = p.cr; this.buildCrx(p.cr); }
      if (p.G !== this._G) { this._G = p.G; this.buildGrille(p.G); }
      const gr = clamp(p.grille, 0, 1), cx = clamp(p.crx, 0, 1) * (1 - gr);
      show(this.X, cx); show(this.R, gr);
      this.ti.set(gr > 0.5 ? "Échiquier de croisement" : ((p.cr && p.cr.titre) || ""), gr > 0.5 && this.gs.length === 1 ? (this.gs[0].D.sub || "") : "");
      if (this.r1) {
        show(this.r1, p.v1); show(this.r2, p.v2); show(this.r3, p.v3);
        show(this.q, 1 - clamp(p.fcnt, 0, 1)); show(this.res, clamp(p.fcnt, 0, 1));
      }
      if (gr > 0) this.renderGrilles(tel);
    },
    renderGrilles(tel) {
      const p = this.p, n = this.gs.length, aire = clamp(p.aire, 0, 1);
      this.gs.forEach((o, gi) => {
        const D = o.D, cols = D.cols.length, rows = D.rows.length;
        const bw = n === 1 ? 920 : 450, bx = n === 1 ? 40 : 40 + gi * 480, by = 120;
        const HW = 128, HH = 100, ix = bx + HW, iy = by + HH, iw = bw - HW;
        const ih = n === 2 || rows === 1 ? 250 : rows === 2 ? 360 : tel ? 350 : 380;
        const norm = (arr) => { const s = arr.reduce((a, b) => a + b.p, 0); return arr.map((x) => x.p / s); };
        // les aires suivent les proportions ; une classe étroite garde au moins 64 unités pour se lire (le reste se réduit d'autant)
        const etire = (fr, tot, sol) => { const raw = fr.map((f) => f * tot); if (aire < 0.5 || raw.length < 3) return raw; const bas = raw.map((x) => x < sol), manque = raw.reduce((a, x, i) => a + (bas[i] ? sol - x : 0), 0), gros = raw.reduce((a, x, i) => a + (bas[i] ? 0 : x), 0); return raw.map((x, i) => (bas[i] ? sol : x * (1 - manque / gros))); };
        const cw = etire(norm(D.cols).map((f) => lerp(1 / cols, f, aire)), iw, 64), rh = norm(D.rows).map((f) => lerp(1 / rows, f, aire) * ih);
        const cx0 = cw.map((_, i) => ix + cw.slice(0, i).reduce((a, b) => a + b, 0)), ry0 = rh.map((_, i) => iy + rh.slice(0, i).reduce((a, b) => a + b, 0));
        setFx(o.sub, D.legende || "", 24); o.sub.setAttribute("x", f1(bx + bw / 2)); o.sub.setAttribute("y", f1(by - 8)); o.sub.style.opacity = n > 1 ? 1 : 0;
        // les entêtes : proportion au-dessus, gamète dessous ; les colonnes étroites en quinconce, avec un trait
        let nb = 0;
        o.colH.forEach((c, i) => {
          const g = D.cols[i], w = cw[i], mid = cx0[i] + w / 2, etroit = w < 92 && cols > 1;
          const niv = etroit ? nb++ % 2 : 0, yb = iy - 12 - niv * 62, fs = tel ? 32 : 26;
          setFx(c.a, g.pl, fs); setFx(c.b, sup(g.h.join(D.mode === "lie" ? " " : "/ ") + (D.mode === "lie" ? "" : "/")), fs);
          const ax = etroit ? mid : mid, an = etroit ? "end" : "middle";
          c.a.setAttribute("text-anchor", an); c.b.setAttribute("text-anchor", an);
          c.a.setAttribute("x", f1(etroit ? mid + 10 : mid)); c.b.setAttribute("x", f1(etroit ? mid + 10 : mid));
          c.b.setAttribute("y", f1(yb)); c.a.setAttribute("y", f1(yb - fs - 4));
          setL(c.l, mid, yb + 6, mid, iy); c.l.style.opacity = etroit ? p.hd : 0; c.g.style.opacity = p.hd;
        });
        o.rowH.forEach((c, i) => {
          const g = D.rows[i], mid = ry0[i] + rh[i] / 2, fs = tel ? 32 : 26;
          setFx(c.a, g.pl, fs); setFx(c.b, sup(g.h.join(D.mode === "lie" ? " " : "/ ") + (D.mode === "lie" ? "" : "/")), fs);
          c.a.setAttribute("x", f1(ix - 14)); c.b.setAttribute("x", f1(ix - 14)); c.a.setAttribute("y", f1(mid - 4)); c.b.setAttribute("y", f1(mid + fs)); c.g.style.opacity = p.hd;
        });
        // les cases
        o.cells.forEach((c, i) => {
          const x = c.x, w = cw[x.ci], h = rh[x.ri], X0 = cx0[x.ci], Y0 = ry0[x.ri];
          const manuel = p.fill < 0, fait = manuel ? (this.manual.has(`${gi}:${i}`) ? 1 : 0) : clamp(p.fill - i, 0, 1);
          const hl = p.cls && (p.cls === "rec" ? x.rec : x.phe === p.cls && !x.bar);
          c.r.setAttribute("x", f1(X0 + 2)); c.r.setAttribute("y", f1(Y0 + 2)); c.r.setAttribute("width", f1(Math.max(1, w - 4))); c.r.setAttribute("height", f1(Math.max(1, h - 4)));
          c.r.setAttribute("class", `cell${hl ? " hl-a" : ""}`);
          c.g.style.opacity = p.cls && !hl ? 0.6 : 1;
          // les lignes de la case, par priorité : phénotype, fraction, génotype, observé
          const obsT = D.obsC && D.obsC[x.phe];
          let L = [];
          const grande = D.cells.length >= 8 && tel;
          if (p.gn) L.push(["geno", x.geno]);
          else {
            if (!grande) L.push(["geno", x.geno]);
            if (p.phe) L.push(["phe", x.phe]);
            if (p.wl && (!grande || !p.phe)) L.push(["w", x.wlab]);
          }
          if (!L.length) L.push(["phe", x.phe]);                      // à 390 px, une grille de 8 cases ou plus : les phénotypes seuls (plan §9.2)
          if (p.obs && obsT && !grande && D.classes.length === D.cells.length) L.push(["obs", `obs. ${obsT}`]);    // une classe = une case, sinon l'observé s'écrit dans la légende
          const ordre = ["geno", "phe", "w", "obs"];
          L.sort((a, b) => ordre.indexOf(a[0]) - ordre.indexOf(b[0]));
          const mini = tel ? 24 : 13, fsMax = tel ? 36 : 26;
          const taille = (ls) => Math.min(fsMax, (h - 14) / (ls.length * 1.3), (w - 10) / (Math.max(...ls.map((l) => l[1].replace(/\^\{|\}/g, "").length)) * 0.6));
          const retire = tel ? ["geno", "obs", "w"] : ["obs", "geno"];
          while (taille(L) < mini && L.length > 1) { const k = retire.find((r) => L.some((l) => l[0] === r)); if (!k) break; L = L.filter((l) => l[0] !== k); }
          const fs0 = taille(L), minuscule = fs0 < (tel ? 20 : 11.5), fs = Math.max(8, fs0), lh = fs * 1.3, top = Y0 + h / 2 - ((L.length - 1) * lh) / 2 + fs * 0.34;
          c.t.forEach((t, j) => {
            const l = L[j];
            if (!l) { t.style.opacity = 0; return; }
            setFx(t, sup(l[1]), fs);
            t.setAttribute("x", f1(X0 + w / 2)); t.setAttribute("y", f1(top + j * lh));
            t.style.opacity = fait * (x.bar && p.xb ? 0.6 : 1) * (minuscule || w < 60 || h < 40 ? 0 : 1);
          });
          // la case barrée : une seule diagonale, fine et grise, pour ne pas écraser le texte
          const b = p.fill !== 0 && x.bar && D.bar !== false ? fait * clamp(p.xb, 0, 1) : 0, m = Math.min(w, h) * 0.2;
          setL(c.k1, X0 + w - m - 2, Y0 + m + 2, X0 + m + 2, Y0 + h - m - 2); setL(c.k2, 0, 0, 0, 0);
          c.k1.style.opacity = b; c.k2.style.opacity = 0;
          c.r.style.opacity = manuel ? 1 : 1;
        });
        // la légende : ce que chaque classe compte
        const ly = iy + ih + 12, deux = D.rows.length >= 3 && !p.obs;
        o.leg.forEach((t, k) => {
          const cl = D.classes[k], obsT = D.obsT && D.obsT[cl.key];
          const s = `${cl.key} : ${p.tot ? `${cl.n} case${cl.n > 1 ? "s" : ""} sur ${cl.N}` : cl.lab}${p.obs && obsT ? ` · observé ${obsT}` : ""}`;
          setFx(t, s, tel ? 30 : 22); t.setAttribute("x", f1(bx + 8 + (deux ? (k % 2) * 460 : 0))); t.setAttribute("y", f1(ly + 26 + (deux ? Math.floor(k / 2) : k) * (tel ? 34 : 28)));
          t.style.opacity = (p.leg || p.tot || p.obs) && n === 1 ? 1 : 0;
          t.setAttribute("class", `t-lab ${p.cls === cl.key ? "s-a" : "s-ink"}`);
        });
      });
      // le génotype de la case touchée (téléphone)
      const o0 = this.gs[0], i = p.sel;
      const txt = o0 && i >= 0 && o0.D.cells[i] && tel ? `${o0.D.cells[i].geno}  ${o0.D.cells[i].phe}` : "";
      setFx(this.sel, sup(txt), 30); this.sel.style.opacity = txt ? 1 : 0;
    },
  });
}
