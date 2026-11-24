/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Noyaux, masse et énergie » (V3), deuxième partie : les calculs (`calcul`, copie
 * adaptée de `masse`), le diagramme (N, Z) avec trois noyaux nommés (`nz`, copie adaptée de la leçon
 * voisine) et la courbe d'Aston (`aston`, copie adaptée de `horloge` : une courbe avec lecture
 * graphique, un curseur à crans de plus). La courbe est tracée en −E_ℓ/A, comme dans les sujets
 * (décision du relecteur) : le noyau le plus stable est le point le plus bas.
 *
 * Toutes les valeurs viennent de noyaux-outils.js.
 */
import {
  fg, fr, ent, sg, sciF, MP, MN, MHE, MD, MT, F931, DM_HE, DT, SOLEIL, S19, S23, FISSION, N_GRAMME, E_GRAMME_J, C, U_KG, MEV_J, E_1G, UMEV,
  NUCL, ELA, ELT, ASTON_NOYAUX, POINT_FANTOME, EL_HE, M_SEP_HE,
} from "./noyaux-outils";

export const NOM_N = (k) => `^{${NUCL[k].A}}${NUCL[k].X}`;

const CAS = [
  { id: "einstein", t: "Une masse est une énergie", s: "la relation d’équivalence masse-énergie", l: ["*E* = *mc*^{2}", `*c* = ${sciF(C, 3)} m·s^{−1}`], f: "si un système perd Δ*E*, sa masse baisse de Δ*E* / *c*^{2}", r1: "", r2: "" },
  { id: "gramme1", t: "Un gramme de matière", s: "son énergie de masse", l: ["*m* = 1 g = 10^{−3} kg", `*c* = ${sciF(C, 3)} m·s^{−1}`], f: "*E* = *mc*^{2}", r1: `*E* ≈ ${sciF(E_1G, 0)} J`, r2: "" },
  { id: "unite", t: "L’unité de masse atomique", s: "1 u en kilogrammes, en joules, puis en MeV", l: [`1 u = ${fg(U_KG * 1e27, 5)} × 10^{−27} kg`, `1 MeV = ${fg(MEV_J * 1e13, 5)} × 10^{−13} J`], f: `*E* = 1 u × *c*^{2} ≈ ${fg((U_KG * C * C) * 1e10, 4)} × 10^{−10} J`, r1: `1 u ↔ ${fg(F931, 1)} MeV/*c*^{2}`, r2: "" },
  { id: "dm", t: "Le défaut de masse de l’hélium 4", s: "les masses de noyaux, en u (arrondies comme dans un énoncé)",
    l: [`*m*_{p} = ${fg(MP, 5)} u`, `*m*_{n} = ${fg(MN, 5)} u`, `*m*(^{4}He) = ${fg(MHE, 5)} u`], f: "Δ*m* = 2 *m*_{p} + 2 *m*_{n} − *m*(^{4}He)",
    r1: `Δ*m* ≈ ${fg(DM_HE, 5)} u`, r2: "" },
  { id: "dmU", t: "Le défaut de masse de l’uranium 235", s: "92 protons, et combien de neutrons ?", l: ["*Z* = 92 et *A* = 235"], f: "Δ*m* = 92 *m*_{p} + ? × *m*_{n} − *m*(^{235}U)", r1: "", r2: "" },
  { id: "tritium", t: "Le défaut de masse du tritium", s: "un noyau de ^{3}H : *m* = 3,015 50 u", l: [`*m*_{p} = ${fg(MP, 5)} u`, `*m*_{n} = ${fg(MN, 5)} u`, `*m*(^{3}H) = ${fg(MT, 5)} u`], f: "Δ*m* = *Z* *m*_{p} + (*A* − *Z*) *m*_{n} − *m*(^{3}H)", r1: `Δ*m* ≈ ${fg(MP + 2 * MN - MT, 5)} u`, r2: "" },
  { id: "rn", t: "Lequel tient le mieux ses nucléons ?", s: "sujet 2019 : une énergie de liaison pour chaque noyau",
    l: [`^{222}Rn : *E*_{ℓ} ≈ ${fg(S19.elRn, 1)} MeV`, `^{218}Po : *E*_{ℓ} ≈ ${fg(S19.elPo, 1)} MeV`], f: "on compare *E*_{ℓ}/*A*, pas *E*_{ℓ}",
    r1: `^{222}Rn : *E*_{ℓ}/*A* = ${fg(S19.rn, 2)} MeV/nucléon`, r2: `^{218}Po : *E*_{ℓ}/*A* = ${fg(S19.po, 2)} MeV/nucléon` },
  { id: "pbfe", t: "Un noyau lourd contre un noyau moyen", s: "énergies de liaison de l’AME2020",
    l: [`^{208}Pb : *E*_{ℓ} ≈ ${fg(ELT("208Pb"), 0)} MeV`, `^{56}Fe : *E*_{ℓ} ≈ ${fg(ELT("56Fe"), 0)} MeV`], f: "on compare *E*_{ℓ}/*A*, pas *E*_{ℓ}",
    r1: `^{208}Pb : ${fg(ELA("208Pb"), 2)} MeV/nucléon`, r2: `^{56}Fe : ${fg(ELA("56Fe"), 2)} MeV/nucléon` },
  { id: "bilan", t: "Le bilan de ^{2}H + ^{3}H → ^{4}He + n", s: "les masses de noyaux, en u",
    l: [`*m*(^{2}H) = ${fg(MD, 5)} u`, `*m*(^{3}H) = ${fg(MT, 5)} u`, `*m*(^{4}He) = ${fg(MHE, 5)} u`, `*m*(n) = ${fg(MN, 5)} u`], f: "Δ*E* = Δ*m* *c*^{2}, avec Δ*m* = Σ*m*(produits) − Σ*m*(réactifs)",
    r1: `Δ*m* ≈ ${fg(DT.dm, 5)} u`, r2: `Δ*E* ≈ ${fg(DT.de, 2)} MeV` },
  { id: "gramme", t: "Un gramme d’uranium 235", s: "si tous ses noyaux fissionnent",
    l: [`*N* = (1/235) × 6,02 × 10^{23} ≈ ${sciF(N_GRAMME, 1)}`, "185 MeV par noyau ; 1 MeV = 1,602 × 10^{−13} J"], f: "*E* = *N* × *E*_{lib}",
    r1: `*E* ≈ ${sciF(E_GRAMME_J, 1)} J`, r2: "" },
  { id: "u235", t: "Uranium 235", s: "*Z* = 92 : combien de nucléons ?", l: [`*E*_{ℓ} ≈ ${fg(ELT("235U"), 0)} MeV`], f: "*E*_{ℓ}/*A* = *E*_{ℓ} divisée par *A*",
    r1: `*E*_{ℓ}/*A* ≈ ${fg(ELA("235U"), 2)} MeV/nucléon`, r2: "" },
  { id: "sujet23", t: "Sujet 2023 : fusion du tritium et du deutérium", s: "énergies de liaison, données du sujet",
    l: [`*E*_{ℓ}(^{2}H) = ${fg(S23.h2, 3)} MeV (donnée du sujet)`, `*E*_{ℓ}(^{3}H) = ${fg(S23.h3, 3)} MeV`, `*E*_{ℓ}(^{4}He) = ${fg(S23.he, 3)} MeV`], f: "*E*_{lib} = |Δ*E*|",
    r1: `*E*_{lib} = ${fg(S23.lib, 3)} MeV`, r2: "" },
];
export const CI = Object.fromEntries(CAS.map((c, i) => [c.id, i]));

export function scenesB(ctx, O) {
const { E, lerp, clamp, show, scene } = ctx;
const { fx, setFx, titre } = O;

/* ---------- l'encadré de calcul : des données, un résultat caché ---------- */
scene("calcul", {
  p: { ci: 0, ok: 0, ok2: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.cs = CAS.map((c) => {
      const cg = E("g", {}, g);
      E("rect", { x: 150, y: 150, width: 700, height: 215 + c.l.length * 50 + 46 - 150, rx: 14, class: "cell" }, cg);
      c.l.forEach((l, i) => fx(cg, 190, 215 + i * 50, l, "nx-v s-ink"));
      fx(cg, 190, 215 + c.l.length * 50 + 14, c.f, "nx-a s-c");
      const r1 = fx(cg, 500, 520, c.r1, "t-cle s-a", "middle"), r2 = c.r2 ? fx(cg, 500, 584, c.r2, "t-cle s-a", "middle") : null;
      return { g: cg, r1, r2 };
    });
  },
  render() {
    const p = this.p, i0 = Math.round(p.ci);
    this.cs.forEach((c, i) => { const o = clamp(1 - Math.abs(p.ci - i) * 2, 0, 1); show(c.g, o); show(c.r1, p.ok); if (c.r2) show(c.r2, p.ok2); });
    this.ti.set(CAS[clamp(i0, 0, CAS.length - 1)].t, CAS[clamp(i0, 0, CAS.length - 1)].s);
  },
});

/* ---------- le diagramme (N, Z) : trois noyaux nommés (copie adaptée de la leçon voisine) ---------- */
scene("nz", {
  p: { pt: 1 },
  build(g) {
    titre(g, "Le diagramme (*N*, *Z*)", "il dit si un noyau est stable, pas lequel tient le mieux ses nucléons");
    const L = 190, R = 850, T = 160, B = 590, X = (n) => L + ((R - L) * n) / 150, Y = (z) => B - ((B - T) * z) / 100;
    E("line", { x1: L, y1: B, x2: R, y2: B, class: "k-ink", "stroke-width": 2 }, g);
    E("line", { x1: L, y1: T, x2: L, y2: B, class: "k-ink", "stroke-width": 2 }, g);
    E("line", { x1: X(0), y1: Y(0), x2: X(100), y2: Y(100), class: "k-dim", "stroke-width": 1.5, "stroke-dasharray": "7 7" }, g);
    const val = [[2, 2], [10, 10], [20, 20], [35, 30], [51, 40], [69, 50], [84, 60], [103, 70], [126, 82]];
    const d = val.map(([n, z], i) => `${i ? "L" : "M"}${X(n).toFixed(1)} ${Y(z).toFixed(1)}`).join(" ");
    E("path", { d, class: "k-ink nofill", "stroke-width": 22, "stroke-opacity": 0.14, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    E("path", { d, class: "k-ink nofill", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
    fx(g, R, B + 40, "*N* (neutrons)", "t-lab s-ink", "end"); fx(g, L - 14, T - 14, "*Z* (protons)", "t-lab s-ink", "middle");
    fx(g, X(70), Y(86), "*N* = *Z*", "t-lab2 s-dim", "end"); fx(g, X(122), Y(50), "vallée de stabilité", "t-lab s-ink", "middle");
    this.pts = ["4He", "56Fe", "238U"].map((k, i) => {
      const n = NUCL[k], pg = E("g", {}, g), x = X(n.A - n.Z), y = Y(n.Z);
      E("circle", { cx: x, cy: y, r: 10, class: "s-ink" }, pg);
      const dx = i === 2 ? -18 : 18, anc = i === 2 ? "end" : "start";
      fx(pg, x + dx, y + (i === 0 ? -14 : 28), `${NOM_N(k)} : *N* = ${n.A - n.Z}, *Z* = ${n.Z}`, "nx-a s-ink", anc);
      return pg;
    });
  },
  render() { this.pts.forEach((pg, i) => show(pg, clamp(this.p.pt * 3 - i, 0, 1))); },
});

/* ---------- la courbe d'Aston, en −E_ℓ/A ---------- */
const AL = 175, AR = 905, AT = 175, AB = 590, EMAX = 9.5;
const AXA = (a) => AL + ((AR - AL) * a) / 240, AYA = (e) => AT + ((AB - AT) * e) / EMAX;   // e = E_ℓ/A, en MeV/nucléon
scene("aston", {
  p: { pts: 0, curve: 0, nuc: 7, top: 0, fu: 0, fi: 0, ff: 0, fiU: 0, lire: 0 },
  build(g) {
    this.ti = titre(g, "La courbe d’Aston", "−*E*_{ℓ}/*A* en fonction de *A* : les noyaux les plus stables sont en bas");
    E("line", { x1: AL, y1: AB + 10, x2: AR + 10, y2: AB + 10, class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: AL, y1: AT - 20, x2: AL, y2: AB + 10, class: "k-dim", "stroke-width": 1.5 }, g);
    for (let a = 0; a <= 240; a += 40) { E("line", { x1: AXA(a), x2: AXA(a), y1: AB + 10, y2: AB + 17, class: "k-dim" }, g); fx(g, AXA(a), AB + 42, String(a), "nx-t s-c", "middle"); }
    for (let e = 0; e <= 8; e += 2) { E("line", { x1: AL - 7, x2: AL, y1: AYA(e), y2: AYA(e), class: "k-dim" }, g); fx(g, AL - 12, AYA(e) + 7, e === 0 ? "0" : `−${e}`, "nx-t s-c", "end"); }
    fx(g, AR + 10, AB + 72, "*A* (nombre de nucléons)", "nx-t s-ink", "end");
    fx(g, AL + 10, AT - 30, "−*E*_{ℓ}/*A* (MeV/nucléon)", "nx-t s-ink");
    // la bande des plus stables, puis la courbe
    this.band = E("rect", { x: AXA(46), y: AYA(8.3), width: AXA(72) - AXA(46), height: AB + 10 - AYA(8.3), class: "band" }, g);
    this.bandL = fx(g, AXA(59), AYA(8.3) - 12, "les plus stables", "nx-a s-ink", "middle");
    const P = ASTON_NOYAUX.map((k) => ({ k, x: AXA(NUCL[k].A), y: AYA(ELA(k)) }));
    this.P = P;
    this.cv = E("path", { d: P.map((q, i) => `${i ? "L" : "M"}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(" "), class: "k-ink nofill", "stroke-width": 3, "stroke-linejoin": "round", pathLength: 1000, "stroke-dasharray": "1000 1000" }, g);
    this.dots = P.map((q) => E("circle", { cx: q.x.toFixed(1), cy: q.y.toFixed(1), r: 8, class: "nx-pt" }, g));
    // les flèches : fusion (à gauche) et fission (à droite)
    const fl = (x1, y1, x2, y2, l, ax, ay, anc) => { const fg0 = E("g", {}, g); E("line", { x1, y1, x2, y2, class: "k-a", "stroke-width": 4.5, "marker-end": "url(#nxarwA)" }, fg0); fx(fg0, ax, ay, l, "nx-n s-a", anc || "start"); return fg0; };
    const c12 = P[ASTON_NOYAUX.indexOf("12C")], ca = P[ASTON_NOYAUX.indexOf("40Ca")], u5 = P[ASTON_NOYAUX.indexOf("235U")], xe = P[ASTON_NOYAUX.indexOf("140Xe")];
    this.fu = fl(c12.x + 6, c12.y - 36, ca.x - 14, ca.y - 40, "fusion", c12.x - 10, c12.y - 62);
    this.fi = fl(u5.x - 10, u5.y - 36, xe.x + 14, xe.y - 40, "fission", u5.x - 20, u5.y - 62, "end");
    // la fission de l'uranium 235 : trois points en rouge
    this.fiU = E("g", {}, g);
    ["235U", "94Sr", "140Xe"].forEach((k) => { const q = P[ASTON_NOYAUX.indexOf(k)]; E("circle", { cx: q.x, cy: q.y, r: 10, class: "s-a" }, this.fiU); fx(this.fiU, q.x + (k === "94Sr" ? -4 : 0), q.y + (k === "235U" ? 40 : -22), `${NOM_N(k)}`, "nx-a s-ink", k === "94Sr" ? "end" : "middle"); });
    // le pari « fer + fer » : le point fantôme, A = 112
    const gh = NUCL[POINT_FANTOME], gx = AXA(gh.A), gy = AYA(ELA(POINT_FANTOME)), fe = P[ASTON_NOYAUX.indexOf("56Fe")];
    this.ff = E("g", {}, g);
    E("circle", { cx: gx, cy: gy, r: 10, class: "k-a nofill", "stroke-width": 3, "stroke-dasharray": "4 4" }, this.ff);
    E("line", { x1: fe.x + 14, y1: fe.y - 6, x2: gx - 14, y2: gy - 14, class: "k-a", "stroke-width": 3.5, "marker-end": "url(#nxarwA)" }, this.ff);
    fx(this.ff, gx + 6, gy + 44, `A = 112 : ${fg(ELA(POINT_FANTOME), 2)}`, "nx-a s-ink", "middle");
    // le curseur : le noyau désigné
    this.cur = E("g", {}, g);
    this.curC = E("circle", { r: 13, class: "k-a nofill", "stroke-width": 4 }, this.cur);
    this.curT = fx(g, AR + 10, 128, "", "nx-g s-ink", "end");
  },
  render() {
    const p = this.p, n = this.P.length;
    this.dots.forEach((d, i) => show(d, clamp(p.pts * (n + 1) - i, 0, 1)));
    this.cv.style.strokeDashoffset = (1000 * (1 - clamp(p.curve, 0, 1))).toFixed(0);
    show(this.band, 0.7 * p.top); show(this.bandL, p.top);
    show(this.fu, p.fu); show(this.fi, p.fi); show(this.ff, p.ff); show(this.fiU, p.fiU);
    const i = clamp(Math.round(p.nuc), 0, n - 1), q = this.P[i], k = ASTON_NOYAUX[i];
    this.curC.setAttribute("cx", q.x.toFixed(1)); this.curC.setAttribute("cy", q.y.toFixed(1));
    show(this.cur, p.lire); show(this.curT, p.lire);
    setFx(this.curT, `${NOM_N(k)} : ${fg(ELA(k), 2)} MeV/nucléon`);
  },
});
}
