/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Noyaux, masse et énergie » (V3), première partie : la désintégration du polonium 210
 * et la fission de l'uranium 235 (`desint`, copie adaptée de la leçon voisine), l'axe des durées du
 * Soleil (`soleil`, copie adaptée de `choix`), et la figure-clé, le diagramme d'énergie (`niveaux`,
 * scène d'un type nouveau).
 *
 * `niveaux` : des niveaux horizontaux, des flèches verticales cotées, une accolade. Toutes les
 * positions verticales viennent des énergies de noyaux-outils.js (jamais posées à l'œil) ; un écart
 * trop petit pour se voir est dilaté, et la scène le dit dans son sous-titre. Couleurs : classes
 * seulement (k-ink, k-a, k-dim, s-ink, s-a).
 */
import {
  fg, fr, ent, sg, sciF, UMEV, F931, MP, MN, MHE, M_SEP_HE, DM_HE, EL_HE, E_REAC_DT, SOLEIL, DE_SOLEIL_X, DE_DT_X, ASTON, S20,
  AGE_SOLEIL, KELVIN_CHIMIE, KELVIN_GRAVITE, DUREE_100,
} from "./noyaux-outils";

export function scenesA(ctx, O) {
const { E, lerp, clamp, show, scene, defs } = ctx;
const { fx, setFx, titre, noyau } = O;

[["nxarw", "s-ink"], ["nxarwA", "s-a"]].forEach(([id, c]) => {
  const mk = E("marker", { id, viewBox: "0 0 10 10", refX: "8", refY: "5", markerWidth: "6", markerHeight: "6", orient: "auto-start-reverse" }, defs);
  E("path", { d: "M0 0L10 5L0 10z", class: c }, mk);
});

/* ---------- le polonium 210 (sujet 2020) et la fission de l'uranium 235 ---------- */
scene("desint", {
  p: { ty: 0, rv: 1 },
  build(g) {
    this.ti = titre(g, "", "");
    const PX = 180, Y = 320;
    // cas 0 : ²¹⁰Po → ²⁰⁶Pb + α (le sujet 2020 N, Exercice III)
    const c0 = E("g", {}, g);
    noyau(c0, PX, Y, 92, 40, 60, 10.5);
    fx(c0, PX, 470, "polonium 210", "rd-fort s-ink", "middle"); fx(c0, PX, 498, "*A* = 210 · *Z* = 84", "t-lab s-ink", "middle");
    E("line", { x1: 300, x2: 410, y1: Y, y2: Y, class: "k-dim", "stroke-width": 2.5, "marker-end": "url(#nxarw)" }, c0);
    const f0 = E("g", {}, c0), i0 = E("g", {}, c0);
    noyau(f0, 540, Y, 92, 39, 61, 10.5);
    fx(f0, 540, 470, "plomb 206", "rd-fort s-ink", "middle"); fx(f0, 540, 498, "*A* = 206 · *Z* = 82", "t-lab s-ink", "middle");
    E("circle", { cx: 540, cy: Y, r: 80, class: "k-dim nofill", "stroke-width": 2, "stroke-dasharray": "6 6" }, i0);
    fx(i0, 540, Y + 9, "?", "t-cle s-dim", "middle"); fx(i0, 540, 470, "noyau fils", "rd-fort s-ink", "middle"); fx(i0, 540, 498, "*A* = ? · *Z* = ?", "t-lab s-ink", "middle");
    fx(c0, 690, Y + 9, "+", "t-cle s-ink", "middle");
    E("circle", { cx: 820, cy: Y, r: 34, class: "k-a nofill", "stroke-width": 3 }, c0); noyau(c0, 820, Y, 13, 2, 2, 10);
    fx(c0, 820, 470, "particule α", "rd-fort s-ink", "middle"); fx(c0, 820, 498, "*A* = 4 · *Z* = 2", "t-lab s-ink", "middle");
    // cas 1 : n + ²³⁵U → ⁹⁴Sr + ¹⁴⁰Xe + 2 n
    const c1 = E("g", {}, g);
    E("circle", { cx: 70, cy: Y, r: 12, class: "neut", "stroke-width": 2.2 }, c1); fx(c1, 70, Y - 28, "neutron", "t-lab s-ink", "middle");
    fx(c1, 110, Y + 9, "+", "t-cle s-ink", "middle");
    noyau(c1, 215, Y, 82, 40, 60, 9.5);
    fx(c1, 200, 470, "uranium 235", "rd-fort s-ink", "middle"); fx(c1, 200, 498, "*A* = 235 · *Z* = 92", "t-lab s-ink", "middle");
    E("line", { x1: 320, x2: 400, y1: Y, y2: Y, class: "k-dim", "stroke-width": 2.5, "marker-end": "url(#nxarw)" }, c1);
    const f1 = E("g", {}, c1), i1 = E("g", {}, c1);
    noyau(f1, 490, Y - 20, 52, 24, 36, 7.5); noyau(f1, 650, Y + 18, 66, 30, 44, 8.5);
    fx(f1, 490, 470, "strontium 94", "rd-fort s-ink", "middle"); fx(f1, 490, 498, "*A* = 94 · *Z* = 38", "t-lab s-ink", "middle");
    fx(f1, 650, 540, "xénon 140", "rd-fort s-ink", "middle"); fx(f1, 650, 568, "*A* = 140 · *Z* = 54", "t-lab s-ink", "middle");
    [[800, Y - 70], [880, Y - 20]].forEach(([x, y]) => { E("circle", { cx: x, cy: y, r: 12, class: "neut", "stroke-width": 2.2 }, f1); E("line", { x1: x - 30, y1: y + 14, x2: x - 14, y2: y + 5, class: "k-a", "stroke-width": 2.5 }, f1); });
    fx(f1, 860, Y - 100, "2 neutrons", "t-lab s-ink", "middle");
    E("circle", { cx: 490, cy: Y, r: 70, class: "k-dim nofill", "stroke-width": 2, "stroke-dasharray": "6 6" }, i1);
    fx(i1, 490, Y + 9, "?", "t-cle s-dim", "middle"); fx(i1, 490, 470, "deux noyaux, et des neutrons", "rd-fort s-ink", "middle");
    this.cas = [{ g: c0, fg: f0, inc: i0 }, { g: c1, fg: f1, inc: i1 }];
  },
  render() {
    const p = this.p;
    this.cas.forEach((c, i) => { show(c.g, clamp(1 - Math.abs(p.ty - i) * 2, 0, 1)); show(c.fg, p.rv); show(c.inc, 1 - p.rv); });
    if (p.ty > 0.5) this.ti.set("Fission de l’uranium 235", "un neutron casse le noyau en deux noyaux moyens");
    else this.ti.set("Le polonium 210 émet une particule α", "sujet 2020 : noyau père → noyau fils + particule");
  },
});

/* ---------- l'axe des durées : 1 an à 100 milliards d'années ---------- */
const LX = (a) => 100 + (800 * Math.log10(a)) / 11;
scene("soleil", {
  p: { age: 0, chim: 0, grav: 0, fus: 0 },
  build(g) {
    this.ti = titre(g, "Combien de temps le Soleil peut-il briller ?", "des durées, de un an à cent milliards d’années (échelle logarithmique)");
    E("line", { x1: LX(1), x2: LX(1e11) + 10, y1: 520, y2: 520, class: "k-dim", "stroke-width": 1.5 }, g);
    [[1, "1 an"], [1e2, "100 ans"], [1e4, "10 000 ans"], [1e6, "1 million"], [1e8, "100 millions"], [1e10, "10 milliards"], [1e11, "100 milliards"]].forEach(([a, l]) => {
      E("line", { x1: LX(a), x2: LX(a), y1: 520, y2: 527, class: "k-dim" }, g); fx(g, LX(a), 552, l, "t-sous", "middle");
    });
    const rep = (a, y, l1, l2, cls, anc) => {
      const gg = E("g", {}, g), x = LX(a);
      E("line", { x1: x, x2: x, y1: y + 12, y2: 520, class: cls, "stroke-width": 2, "stroke-dasharray": "5 5" }, gg);
      E("circle", { cx: x, cy: 520, r: 7, class: cls === "k-a" ? "s-a" : "s-ink" }, gg);
      fx(gg, x + (anc === "end" ? -12 : 12), y - 14, l1, "rd-fort s-ink", anc || "start"); fx(gg, x + (anc === "end" ? -12 : 12), y + 10, l2, "t-lab s-ink", anc || "start");
      return gg;
    };
    this.chim = rep(KELVIN_CHIMIE, 430, "feu chimique : ≈ 3 000 ans", "Kelvin, 1862", "k-ink");
    this.grav = rep(KELVIN_GRAVITE, 350, "contraction : ≈ 30 millions d’années", "Kelvin cherche ailleurs", "k-ink", "end");
    this.age = rep(AGE_SOLEIL, 270, "âge du Soleil : 4,6 milliards d’années", "datation des météorites", "k-ink", "end");
    this.fus = rep(DUREE_100, 190, `fusion de l’hydrogène : ≈ ${ent(DUREE_100 / 1e9)} milliards d’années`, "si tout l’hydrogène y passait", "k-a", "end");
  },
  render() { const p = this.p; show(this.chim, p.chim); show(this.grav, p.grav); show(this.age, p.age); show(this.fus, p.fus); },
});

/* ---------- le diagramme d'énergie (la figure-clé, scène d'un type nouveau) ---------- */
const AX = 135, X0 = 190, X1 = 960, YA = 205, YB = 560;
const NOMS = { nuc: "nucléons séparés" };
/** place des niveaux (énergies décroissantes) entre yA et yB ; un écart sous `min` pixels est dilaté, les autres se partagent le reste */
function placer(E, y0, y1, min) {
  const g = E.slice(1).map((e, i) => E[i] - e), tot = g.reduce((a, b) => a + b, 0);
  let px = g.map((x) => (x / tot) * (y1 - y0)), dil = false;
  const petits = px.map((x) => x < min);
  if (petits.some(Boolean)) {
    dil = true;
    const reste = y1 - y0 - petits.filter(Boolean).length * min, somme = g.filter((_, i) => !petits[i]).reduce((a, b) => a + b, 0);
    px = px.map((x, i) => (petits[i] ? min : (g[i] / somme) * reste));
  }
  const ys = [y0]; px.forEach((x) => ys.push(ys[ys.length - 1] + x));
  return { ys, dil };
}
/** les jeux de niveaux : chacun calcule ses positions à partir des énergies de la leçon */
function jeux() {
  const J = {};
  // Aston : quatre protons contre un noyau d'hélium (masses, en u)
  {
    const m = [ASTON.m4p, ASTON.mHe], { ys } = placer([0, -(m[0] - m[1]) * UMEV], YA, YB, 100);
    J.H4 = { u: true, coupe: true, dil: true, titre: "Aston pèse l’hydrogène et l’hélium", ref: m[0], mB: m[1], ys, e: [0, -(m[0] - m[1]) * UMEV],
      niv: [{ k: "A", y: ys[0], nom: "4 ^{1}H", vu: `${fg(m[0], 5)} u`, ve: "" }, { k: "B", y: ys[1], nom: "^{4}He", vu: `${fg(m[1], 5)} u`, ve: "" }],
      fl: [], acc: { a: 0, b: 1, x: 250, l: [["il manque", `${fr(ASTON.part * 100, 2)} %`], ["il manque", `${fr(ASTON.part * 100, 2)} %`]] } };
  }
  // l'hélium : 2 p + 2 n séparés, puis le noyau (u, puis MeV)
  {
    const m = [M_SEP_HE, MHE], { ys } = placer([0, -(m[0] - m[1]) * UMEV], YA, YB, 100);
    J.He = { u: true, coupe: true, dil: true, titre: "La masse d’un noyau d’hélium", ref: m[0], mB: m[1], ys, e: [0, -(m[0] - m[1]) * UMEV],
      niv: [{ k: "A", y: ys[0], nom: "2 p + 2 n séparés", vu: `${fg(m[0], 5)} u`, ve: "" }, { k: "B", y: ys[1], nom: "noyau ^{4}He", vu: `${fg(m[1], 5)} u`, ve: `${fg(-EL_HE, 1)} MeV` }],
      acc: { a: 0, b: 1, x: 235, l: [["Δ*m*", `${fg(DM_HE, 5)} u`], ["Δ*m* *c*^{2}", `${sg(EL_HE)} MeV`]] },
      fl: [{ id: "up", a: 1, b: 0, x: 450, cls: "k-a", l: ["à fournir", `*E*_{ℓ} ≈ ${sg(EL_HE)} MeV`] }, { id: "down", a: 0, b: 1, x: 700, cls: "k-ink", l: ["libérée à", "la formation"] }] };
  }
  // ²H + ³H → ⁴He + n : trois niveaux, en MeV
  {
    const { ys } = placer([0, -E_REAC_DT, -EL_HE], YA, YB, 100);
    J.DT = { u: false, titre: "Un bilan sur l’échelle d’énergie", ref: 0, ys, e: [0, -E_REAC_DT, -EL_HE],
      niv: [{ k: "A", y: ys[0], nom: "nucléons séparés", vu: "", ve: "" }, { k: "B", y: ys[1], nom: "^{2}H + ^{3}H", vu: "", ve: "" }, { k: "C", y: ys[2], nom: "^{4}He + n", vu: "", ve: `${fg(-EL_HE, 1)} MeV` }],
      fl: [{ id: "rUp", a: 1, b: 0, x: 230, cls: "k-ink", l: ["on fournit", "Σ*E*_{ℓ}(réactifs)"] }, { id: "rDown", a: 0, b: 2, x: 480, cls: "k-ink", l: ["on récupère", "*E*_{ℓ}(^{4}He)"] },
        { id: "de", a: 1, b: 2, x: 720, cls: "k-a", l: ["Δ*E*", `${fg(DE_DT_X, 2)} MeV`] }] };
  }
  // 4 ¹H → ⁴He + 2 e⁺ : le Soleil
  {
    const { ys } = placer([0, DE_SOLEIL_X], YA, YB, 100);
    J.soleil = { u: false, titre: "Dans le Soleil", ref: 0, ys, e: [0, DE_SOLEIL_X],
      niv: [{ k: "A", y: ys[0], nom: "4 ^{1}H", vu: "", ve: "" }, { k: "B", y: ys[1], nom: "^{4}He + 2 e^{+}", vu: "", ve: "" }],
      fl: [{ id: "de", a: 0, b: 1, x: 450, cls: "k-a", l: ["Δ*E*", `≈ ${fg(DE_SOLEIL_X, 1)} MeV`] }] };
  }
  // le sujet 2020 : valeurs absolues, axe coupé, deux niveaux du bas dilatés
  {
    const E3 = [0, -S20.elPo, -S20.elProd], { ys, dil } = placer(E3, YA + 10, YB - 10, 110);
    J.po2020 = { u: false, coupe: true, dil, titre: "Sujet 2020 : le diagramme d’énergie", ref: 0, ys, sansGrad: true,
      niv: [{ k: "A", y: ys[0], nom: "126 n + 84 p séparés", vu: "", ve: `${fg(S20.nuc / 1e6, 6)} × 10^{5} MeV` }, { k: "B", y: ys[1], nom: "^{210}Po", vu: "", ve: `${fg(S20.po / 1e6, 6)} × 10^{5} MeV` },
        { k: "C", y: ys[2], nom: "^{206}Pb + ^{4}He", vu: "", ve: `${fg(S20.pb / 1e6, 6)} × 10^{5} MeV` }],
      fl: [{ id: "up", a: 1, b: 0, x: 300, cls: "k-ink", l: ["*E*_{ℓ}(Po)", `${fg(S20.elPo, 1)} MeV`] }, { id: "de", a: 1, b: 2, x: 560, cls: "k-a", l: ["*E*_{lib}", `${fg(S20.eLib, 1)} MeV`] }] };
  }
  return J;
}
const JEUX = jeux();
// la graduation d'un jeu linéaire : ordonnée d'une masse (u) ou d'une énergie (MeV, 0 aux nucléons séparés)
function graduations(J, mode) {
  const g = [], y0 = J.ys[0], y1 = J.ys[J.ys.length - 1];
  if (mode === "u") {
    const m0 = J.ref, px = (y1 - y0) / (m0 - J.mB);
    for (let v = Math.ceil((m0 - (y1 + 40 - y0) / px) * 100 - 1e-9) / 100; v <= m0 + 38 / px + 1e-9; v += 0.01) { const y = y0 + (m0 - v) * px; if (y >= y0 - 38 && y <= y1 + 40) g.push({ y, t: fr(v, 2) }); }
  } else {
    const e1 = J.e[J.e.length - 1], px = (y1 - y0) / -e1;
    for (let v = 0; v >= e1 - 40 / px - 1e-9; v -= 10) { const y = y0 - v * px; if (y <= y1 + 40) g.push({ y, t: fr(v, 0) }); }
  }
  return g;
}

scene("niveaux", {
  p: { jeu: "He", lvA: 0, lvB: 0, lvC: 0, nom: 1, dm: 0, dmv: 0, axe: 0, up: 0, down: 0, route: 0, de: 0, cut: 0, val: 1 },
  build(g) {
    this.ti = titre(g, "", "");
    this.dyn = E("g", {}, g);
    this._jeu = null;
  },
  monter(id) {
    const J = JEUX[id], d = this.dyn; d.textContent = "";
    this.J = J; this._jeu = id;
    const ya = YA - 52, yb = YB + 50;
    // l'axe vertical, ses deux graduations (u et MeV) et son titre
    E("line", { x1: AX, x2: AX, y1: ya, y2: yb, class: "k-dim", "stroke-width": 1.5 }, d);
    this.tU = E("g", {}, d); this.tE = E("g", {}, d);
    if (!J.sansGrad) {
      if (J.u) graduations(J, "u").forEach((t) => { E("line", { x1: AX - 7, x2: AX, y1: t.y, y2: t.y, class: "k-dim" }, this.tU); fx(this.tU, AX - 12, t.y + 6, t.t, "nx-t s-c", "end"); });
      graduations(J, "e").forEach((t) => { E("line", { x1: AX - 7, x2: AX, y1: t.y, y2: t.y, class: "k-dim" }, this.tE); fx(this.tE, AX - 12, t.y + 6, t.t, "nx-t s-c", "end"); });
    }
    this.atU = fx(this.tU, AX, ya - 14, "masse (u)", "nx-t s-ink", "middle");
    this.atE = fx(this.tE, AX, ya - 14, "énergie (MeV)", "nx-t s-ink", "middle");
    // l'axe coupé : deux traits obliques
    this.brk = E("g", {}, d);
    if (J.coupe) { const yb0 = J.sansGrad ? (J.ys[1] + J.ys[2]) / 2 : yb - 6; [0, 9].forEach((o) => E("line", { x1: AX - 12, y1: yb0 + o + 5, x2: AX + 12, y2: yb0 + o - 5, class: "k-ink", "stroke-width": 2.2 }, this.brk)); }
    // les niveaux
    this.lv = J.niv.map((n) => {
      const lg = E("g", {}, d);
      E("line", { x1: X0, x2: X1, y1: n.y, y2: n.y, class: "k-ink", "stroke-width": 4 }, lg);
      const nm = fx(lg, X1, n.y - 12, n.nom, "nx-n s-ink", "end");
      const vu = fx(lg, X1, n.y + 32, n.vu || "", "nx-v s-ink", "end"), ve = fx(lg, X1, n.y + 32, n.ve || "", "nx-v s-ink", "end");
      return { g: lg, nm, vu, ve, y: n.y, hasU: !!n.vu, hasE: !!n.ve };
    });
    // l'accolade Δm
    if (J.acc) {
      const a = J.acc, x = a.x, y1 = J.niv[a.a].y + 8, y2 = J.niv[a.b].y - 8, ym = (y1 + y2) / 2, r = 12;
      this.ac = E("g", {}, d);
      E("path", { d: `M${x} ${y1} Q${x + r} ${y1} ${x + r} ${y1 + r} L${x + r} ${ym - r} Q${x + r} ${ym} ${x + 2 * r} ${ym} Q${x + r} ${ym} ${x + r} ${ym + r} L${x + r} ${y2 - r} Q${x + r} ${y2} ${x} ${y2}`, class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.ac);
      this.acT = [0, 1].map((m) => ({ a: fx(this.ac, x + 2 * r + 12, ym - 4, a.l[m][0], "nx-n s-ink"), b: fx(this.ac, x + 2 * r + 12, ym + 26, a.l[m][1], "nx-v s-ink") }));
      this.acPath = this.ac.querySelector("path");
    } else this.ac = null;
    // les flèches
    this.fl = (J.fl || []).map((f) => {
      const fg0 = E("g", {}, d), y1 = J.niv[f.a].y, y2 = J.niv[f.b].y, ym = (y1 + y2) / 2;
      const ln = E("line", { x1: f.x, x2: f.x, y1, y2: y1, class: f.cls, "stroke-width": 4.5, "marker-end": `url(#${f.cls === "k-a" ? "nxarwA" : "nxarw"})` }, fg0);
      const l1 = fx(fg0, f.x + 16, ym - 4, f.l[0], "nx-n s-ink"), l2 = fx(fg0, f.x + 16, ym + 24, f.l[1], "nx-a s-ink");
      return { ...f, g: fg0, ln, l1, l2, y1, y2 };
    });
  },
  render() {
    const p = this.p;
    if (this._jeu !== p.jeu) this.monter(p.jeu);
    const J = this.J, ax = J.u ? clamp(p.axe, 0, 1) : 1, lv = [p.lvA, p.lvB, p.lvC];
    const [T, S] = this._titres(J, ax, p);
    this.ti.set(T, S);
    show(this.tU, 1 - ax); show(this.tE, ax);
    show(this.brk, J.coupe ? (J.sansGrad ? clamp(p.cut, 0, 1) : 1 - ax) : 0);
    this.lv.forEach((n, i) => {
      const o = clamp(lv[i], 0, 1); show(n.g, o); n.g.setAttribute("transform", `translate(0 ${((o - 1) * 34).toFixed(1)})`);
      show(n.nm, p.nom);
      const u = n.hasU ? 1 - ax : 0, e = n.hasE ? ax : 0;
      show(n.vu, u); show(n.ve, e);
    });
    if (this.ac) {
      const k = clamp(p.dm, 0, 1); show(this.ac, k); this.acPath.style.strokeDashoffset = (1000 * (1 - k)).toFixed(0);
      this.acT.forEach((t, m) => { const o = m === 0 ? 1 - ax : ax; const hu = J === JEUX.H4 ? 1 : 0; show(t.a, o * k); show(t.b, o * clamp(p.dmv + hu, 0, 1) * k); });
    }
    this.fl.forEach((f) => {
      let k = 0;
      if (f.id === "up") k = p.up; else if (f.id === "down") k = p.down; else if (f.id === "de") k = p.de;
      else if (f.id === "rUp") k = p.route * 2; else if (f.id === "rDown") k = p.route * 2 - 1;
      k = clamp(k, 0, 1); show(f.g, k > 0.001 ? 1 : 0);
      const y = lerp(f.y1, f.y2, k), dir = Math.sign(f.y2 - f.y1), cut = k > 0.5 ? 4 : 0;
      f.ln.setAttribute("y2", (y - dir * cut).toFixed(1));
      show(f.l1, clamp(k * 2 - 1, 0, 1)); show(f.l2, clamp(k * 2 - 1, 0, 1) * clamp(p.val, 0, 1));
    });
  },
  _titres(J, ax, p) {
    const id = this._jeu;
    if (id === "H4") return [J.titre, "axe coupé : l’écart est dilaté pour se voir"];
    if (id === "He") return [ax > 0.5 ? "Le même écart, en énergie" : J.titre, ax > 0.5 ? "énergie : le zéro est aux nucléons séparés" : "axe coupé : l’écart est dilaté pour se voir"];
    if (id === "DT") return [J.titre, "énergie : le zéro est aux nucléons séparés"];
    if (id === "soleil") return [J.titre, "énergie : le zéro est à quatre noyaux d’hydrogène"];
    return [J.titre, "axe coupé : l’écart des deux niveaux du bas est dilaté"];
  },
});
}
