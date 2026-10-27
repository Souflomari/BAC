/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « décroissance radioactive » (V3), deuxième partie : les cent dés
 * (grille, graphe, survivant), le compte tic par tic, la courbe de la loi
 * (marches des demi-vies, pentes, tangente, activité), les mesures de
 * Rutherford et le détour par la fonction exponentielle.
 *
 * Couleurs : l'encre pour la loi, le rouge pour ce qui part (les 6, les dés de
 * l'élève, la grandeur qu'on cherche), le gris pour les autres séries.
 */
import { DE, ND, KMAX, TV, R5, EK, LAMD, TH, TAU, RUTH, fr, ent } from "./radioactivite-outils";

export function scenesB(ctx, O, D, AUTRES, GRANDES) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx, titre, courbe, axes, mkDie, setDie, leaveDie } = O;

/* ---------- cent dés, et le graphe de l'élève ---------- */
const GX = (k) => 520 + 19 * k, GY = (v) => 540 - 3.6 * v;
scene("des", {
  p: { dice: 0, k: 0, roll: 0, leave: 1, graph: 0, duel: 0, duelRv: 0, others: 0, big: 0, law: 0 },
  build(g) {
    this.ti = titre(g, "Cent dés, cent noyaux", "un 6 : ce noyau se désintègre et sort du jeu");
    // la grille est centrée seule, puis glisse à gauche quand le graphe (ou le duel) entre
    this.left = E("g", {}, g);
    this.grid = E("g", {}, this.left);
    this.dice = []; for (let i = 0; i < ND; i++) this.dice.push(mkDie(this.grid, 60 + (i % 10) * 38, 140 + Math.floor(i / 10) * 38, 32, 3));
    this.ring = E("rect", { width: 44, height: 44, rx: 8, class: "k-a nofill", "stroke-width": 3 }, this.left);
    this.cnt = fx(this.left, 60, 580, "", "t-cle s-ink");
    this.cnt2 = fx(this.left, 60, 610, "", "t-sous");
    this.gr = E("g", {}, g);
    axes(E("g", {}, this.gr), GX, GY, 20, 100, 5, 25, (v) => String(v), (v) => String(v), "tics", "dés restants, en % du départ");
    this.othG = E("g", {}, this.gr);
    this.oth = AUTRES.map((s) => { const gg = E("g", {}, this.othG); s.forEach((n, j) => E("circle", { cx: GX(j), cy: GY(n).toFixed(1), r: 3, class: "s-dim" }, gg)); return gg; });
    this.bigs = GRANDES.map((s) => E("polyline", { points: s.map((v, j) => `${GX(j)},${GY(v).toFixed(1)}`).join(" "), class: "k-dim nofill", "stroke-width": 1.4 }, this.gr));
    this.law = E("path", { d: courbe((k) => ND * R5 ** k, 0, 20, GX, GY), class: "k-ink nofill", "stroke-width": 3.4, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.gr);
    this.lawL = fx(this.gr, GX(9.5), GY(ND * R5 ** 9.5) - 28, "la loi de la population", "rd-fort s-ink");
    this.myL = E("polyline", { class: "k-a nofill", "stroke-width": 1.5 }, this.gr);
    this.my = Array.from({ length: KMAX + 1 }, () => E("circle", { r: 5, class: "s-a" }, this.gr));
    this.myT = fx(this.gr, 0, 0, "tes lancers", "rd-fort s-ink");
    this.legO = fx(this.gr, 900, 190, "points gris : 9 autres séries de 100 dés", "t-sous", "end");
    this.legB = fx(this.gr, 900, 214, "traits fins : 10 séries de 10 000 dés", "t-sous", "end");
    // le duel : le survivant (10 lancers sans 6) contre un dé neuf, deux dés visiblement différents
    this.du = E("g", {}, g);
    const SX = 532, FX = 790, DS = 100, DY = 170;
    this.dOld = mkDie(this.du, SX, DY, DS, 9); this.dNew = mkDie(this.du, FX, DY, DS, 9);
    E("rect", { x: SX - 9, y: DY - 9, width: DS + 18, height: DS + 18, rx: 20, class: "k-a nofill", "stroke-width": 3 }, this.du);
    fx(this.du, SX + DS / 2, DY - 26, "le survivant", "rd-fort s-ink", "middle");
    fx(this.du, FX + DS / 2, DY - 26, "un dé neuf", "rd-fort s-ink", "middle");
    fx(this.du, SX + DS / 2, DY + DS + 32, "encadré dans la grille", "t-sous", "middle");
    fx(this.du, FX + DS / 2, DY + DS + 32, "jamais lancé", "t-sous", "middle");
    this.dQ = fx(this.du, (SX + FX + DS) / 2, DY + DS / 2 + 10, "?", "t-cle s-dim", "middle");
    // l'histoire du survivant et la réponse n'apparaissent qu'avec la réponse au pari (la scène se lit en deux temps)
    this.histG = E("g", {}, this.du);
    fx(this.histG, SX - 9, 350, `ses ${TV} lancers`, "rd-fort s-ink");
    this.hist = Array.from({ length: TV }, (_, j) => { const x = SX - 9 + j * 40, d = mkDie(this.histG, x, 364, 32, 3); fx(this.histG, x + 16, 416, String(j + 1), "t-sous", "middle"); return d; });
    fx(this.histG, SX - 9, 452, `${TV} lancers, aucun 6 : voilà pourquoi il est encore là.`, "t-lab s-ink");
    this.dR = E("g", {}, this.du);
    fx(this.dR, (SX + FX + DS) / 2, 540, `1 chance sur ${DE}, pour chacun`, "t-cle s-a", "middle");
    fx(this.dR, (SX + FX + DS) / 2, 574, "au prochain lancer, quel que soit son passé", "t-sous", "middle");
  },
  render() {
    const p = this.p, kk = clamp(Math.floor(p.k + 1e-6), 0, KMAX), lv = clamp(p.leave, 0, 1), { face, dTic, NK, DK, VET, HIST, F_VET, F_NEUF } = D;
    show(this.grid, p.dice);
    this.left.setAttribute("transform", `translate(${(250 * (1 - Math.max(p.graph, p.duel))).toFixed(1)} 0)`);
    for (let i = 0; i < ND; i++) {
      const d = this.dice[i], t = dTic[i]; let l = 0;
      if (p.roll) { if (t <= kk) setDie(d, 0, "out"); else setDie(d, 1 + Math.floor(Math.random() * DE), ""); }
      else if (t < kk) setDie(d, 0, "out");
      else if (t === kk && kk > 0) { if (lv >= 1) setDie(d, 0, "out"); else { setDie(d, DE, "six"); l = lv; } }   // les 6 rougissent, puis quittent la grille
      else setDie(d, face[kk][i], "");
      leaveDie(d, l);
    }
    setFx(this.cnt, `il reste ${NK[kk]} dé${NK[kk] > 1 ? "s" : ""} sur ${ND}`); show(this.cnt, p.dice);
    setFx(this.cnt2, !kk ? "aucun lancer pour l’instant" : DK[kk] ? `tic ${kk} · ${DK[kk]} dé${DK[kk] > 1 ? "s ont" : " a"} fait 6` : `tic ${kk} · aucun dé n’a fait 6`); show(this.cnt2, p.dice);
    this.ring.setAttribute("x", 60 + (VET % 10) * 38 - 6); this.ring.setAttribute("y", 140 + Math.floor(VET / 10) * 38 - 6); show(this.ring, p.duel);
    show(this.gr, p.graph * (1 - p.duel));
    this.my.forEach((c, j) => { c.setAttribute("cx", GX(j)); c.setAttribute("cy", GY(NK[j]).toFixed(1)); c.style.opacity = j <= kk ? 1 : 0; });
    this.myL.setAttribute("points", NK.slice(0, kk + 1).map((n, j) => `${GX(j)},${GY(n).toFixed(1)}`).join(" "));
    // l'étiquette se pose au 3e tic : à droite du début de la courbe, la place est libre
    const jl = Math.min(kk, 3); this.myT.setAttribute("x", GX(jl) + 14); this.myT.setAttribute("y", (GY(NK[jl]) - 12).toFixed(1));
    show(this.myT, kk > 0 ? 1 - p.law : 0);
    const dimO = 1 - 0.6 * p.law;
    this.oth.forEach((o, r) => show(o, clamp(p.others * 9 - r, 0, 1) * dimO)); show(this.legO, p.others);
    this.bigs.forEach((b, s) => show(b, clamp(p.big * 10 - s, 0, 1) * 0.8 * dimO)); show(this.legB, p.big);
    this.law.style.strokeDashoffset = 1000 * (1 - p.law); show(this.lawL, clamp(p.law * 2 - 1, 0, 1));
    show(this.du, p.duel); show(this.dQ, 1 - p.duelRv); show(this.dR, p.duelRv); show(this.histG, p.duelRv);
    setDie(this.dOld, F_VET, ""); setDie(this.dNew, F_NEUF, ""); this.hist.forEach((d, j) => setDie(d, HIST[j], ""));
    this.ti.set(p.duel > 0.5 ? "Le survivant et le dé neuf" : p.law > 0.5 ? "Beaucoup de noyaux : une loi" : p.graph > 0.5 ? "Tes dés, tic après tic" : "Cent dés, cent noyaux",
      p.duel > 0.5 ? "lequel a le plus de chances de faire 6 ?" : p.law > 0.5 ? "chaque noyau est imprévisible, la population ne l’est pas" : "un 6 : ce noyau se désintègre et sort du jeu");
  },
});

/* ---------- cent dés, tic par tic : ce que le hasard donne en moyenne ---------- */
scene("comptes", {
  p: { n: 0, cap: 0 },
  build(g) {
    const BX = (k) => 116 + 76 * k, BW = 54, B0 = 540, H = 3.8;
    this.ti = titre(g, "Tic par tic, en moyenne", "");
    E("rect", { x: 260, y: 100, width: 20, height: 20, class: "f-b k-ink", "stroke-width": 1.5 }, g);
    fx(g, 288, 116, "5/6 : ils restent", "t-lab s-ink");
    E("rect", { x: 520, y: 100, width: 20, height: 20, class: "f-a k-a", "stroke-width": 1.5 }, g);
    fx(g, 548, 116, "1/6 : ils partent au tic suivant", "t-lab s-ink");
    E("line", { x1: BX(0) - 20, x2: BX(10) + BW + 20, y1: B0, y2: B0, class: "k-dim", "stroke-width": 1.5 }, g);
    fx(g, BX(0) - 14, B0 + 26, "tic", "t-sous", "end");
    fx(g, BX(0) - 14, B0 + 58, "partent", "t-sous", "end");
    this.bars = [];
    for (let k = 0; k <= 10; k++) {
      const gk = E("g", {}, g), h = H * EK(k), hc = h / DE;
      E("rect", { x: BX(k), y: B0 - (h - hc), width: BW, height: h - hc, class: "f-b k-ink", "stroke-width": 1.5 }, gk);
      const cap = E("rect", { x: BX(k), y: B0 - h, width: BW, height: hc, class: "f-a k-a", "stroke-width": 1.5 }, gk);
      fx(gk, BX(k) + BW / 2, B0 - h - 10, ent(Math.round(EK(k))), "rd-fort s-ink", "middle");
      fx(gk, BX(k) + BW / 2, B0 + 26, String(k), "t-sous", "middle");
      const lost = fx(gk, BX(k) + BW / 2, B0 + 58, "−" + ent(Math.round(EK(k) / DE)), "t-lab s-a", "middle");
      this.bars.push({ g: gk, cap, lost });
    }
  },
  render() {
    const p = this.p;
    this.bars.forEach((b, k) => { const o = clamp(p.n - k, 0, 1); b.g.style.opacity = o; b.g.setAttribute("transform", `translate(0 ${((1 - o) * 14).toFixed(1)})`); b.cap.style.opacity = p.cap; b.lost.style.opacity = p.cap; });
  },
});

/* ---------- la loi : marches, points de la formule, pentes, tangente, activité ---------- */
scene("loi", {
  p: { xmax: 20, curve: 1, run: 0, st1: 0, st2: 0, st3: 0, st4: 0, stSym: 0, tk: 0, n0: 0, pente: 0, lam: 0, th: 0, tan: 0, bars: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.ax = E("g", {}, g);
    this.clip = E("g", { "clip-path": "url(#rclip-loi)" }, g);
    this.runG = E("g", {}, this.clip); this.runP = Array.from({ length: KMAX + 1 }, () => E("circle", { r: 4, class: "s-a" }, this.runG));
    this.barG = E("g", {}, this.clip); this.barR = Array.from({ length: KMAX + 1 }, () => E("rect", { width: 14, class: "bar" }, this.barG));
    this.barE = E("path", { class: "k-ink nofill", "stroke-width": 2, "stroke-dasharray": "6 6" }, this.barG);
    this.barT = fx(this.barG, 0, 0, "", "rd-fort s-ink", "middle");
    this.barLeg = E("g", {}, g);
    fx(this.barLeg, 900, 230, "barres : tes 6, tic par tic", "t-lab s-ink", "end");
    fx(this.barLeg, 900, 256, "pointillés : un sixième des dés restants", "t-lab s-ink", "end");
    this.cv = E("path", { class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, this.clip);
    this.stairs = [1, 2, 3, 4].map(() => {
      const sg = E("g", {}, g);
      return { g: sg, h: E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, sg), v: E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, sg),
        dot: E("circle", { r: 5.5, class: "s-ink" }, sg), lab: fx(sg, 0, 0, "", "rd-fort s-ink"),
        br: E("path", { class: "k-a nofill", "stroke-width": 2 }, sg), brl: fx(sg, 0, 0, "*t*_{1/2}", "t-lab s-a", "middle") };
    });
    // les points de la formule : N1, N2, N3 sur la courbe, et le « × 5/6 » qui mène de l'un à l'autre
    this.tks = [1, 2, 3].map(() => { const sg = E("g", {}, g); return { g: sg, dot: E("circle", { r: 6.5, class: "s-ink" }, sg), lab: fx(sg, 0, 0, "", "rd-fort s-ink"), ar: E("path", { class: "k-dim nofill", "stroke-width": 2, "marker-end": "url(#rarw)" }, sg), arl: fx(sg, 0, 0, "× 5/6", "t-sous", "middle") }; });
    this.n0L = fx(g, 0, 0, "*N*_{0} = 100", "rd-fort s-ink");
    // les pentes : là où il reste 100 dés, puis 50 — la pente est proportionnelle à la hauteur
    this.pg = E("g", {}, g);
    this.pentes = [0, TH].map((k) => ({ k, l: E("line", { class: "k-a", "stroke-width": 3, "stroke-linecap": "round" }, this.pg), d: E("circle", { r: 6, class: "s-ink" }, this.pg), t: fx(this.pg, 0, 0, `pente ≈ −${fr(LAMD * EK(k), 1)} par tic`, "rd-fort s-ink") }));
    this.lamL = fx(g, 0, 0, `λ = ln(6/5) ≈ ${fr(LAMD, 3)} par tic`, "rd-fort s-ink");
    this.thL = fx(g, 0, 0, `*t*_{1/2} = ln 2 / λ ≈ ${fr(TH, 2)} tics`, "rd-fort s-ink");
    this.tanG = E("g", {}, g);
    this.tanL = E("line", { class: "k-a", "stroke-width": 2.5 }, this.tanG);
    this.tanD = E("circle", { r: 6, class: "s-ink" }, this.tanG);
    this.tanP = fx(this.tanG, 0, 0, "il reste 37 %", "rd-fort s-ink");
    this.tanT = fx(this.tanG, 0, 0, `τ = 1/λ ≈ ${fr(TAU, 2)} tics`, "rd-fort s-a");
    this.tanV = E("line", { class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, this.tanG);
  },
  render() {
    const p = this.p, X = (k) => 110 + (790 * k) / p.xmax, Y = (v) => 590 - (440 * v) / 100, N0 = 100, NK = D.NK, DK = D.DK;
    const key = p.xmax.toFixed(2);
    if (this._ax !== key) { this._ax = key; axes(this.ax, X, Y, p.xmax, 100, p.xmax <= 10 ? 1 : 5, 25, (v) => String(v), (v) => String(v), "tics", "*N* : dés restants"); }
    this.cv.setAttribute("d", courbe((k) => N0 * R5 ** k, 0, p.xmax, X, Y)); this.cv.style.strokeDashoffset = 1000 * (1 - p.curve);
    this.runP.forEach((c, j) => { c.setAttribute("cx", X(j).toFixed(1)); c.setAttribute("cy", Y(NK[j]).toFixed(1)); }); show(this.runG, 0.55 * p.run);
    const ops = [p.st1, p.st2, p.st3, p.st4];
    this.stairs.forEach((s, i) => {
      const n = i + 1, t = n * TH, v = N0 / 2 ** n, x = X(t), y = Y(v), x0 = X((n - 1) * TH);
      s.h.setAttribute("x1", X(0)); s.h.setAttribute("x2", x); s.h.setAttribute("y1", y); s.h.setAttribute("y2", y);
      s.v.setAttribute("x1", x); s.v.setAttribute("x2", x); s.v.setAttribute("y1", y); s.v.setAttribute("y2", Y(0));
      s.dot.setAttribute("cx", x); s.dot.setAttribute("cy", y);
      const num = fr(v, Number.isInteger(v) ? 0 : Number.isInteger(v * 10) ? 1 : 2);
      setFx(s.lab, p.stSym > 0.5 ? `${num} = *N*_{0}/${2 ** n}` : num); s.lab.setAttribute("x", x + 10); s.lab.setAttribute("y", y - 10);
      s.br.setAttribute("d", `M${(x0 + 2).toFixed(1)} 640v6H${(x - 2).toFixed(1)}v-6`);
      s.brl.setAttribute("x", ((x0 + x) / 2).toFixed(1)); s.brl.setAttribute("y", 672);
      show(s.g, ops[i]); show(s.lab, n === 1 && p.th > 0.5 ? 0 : 1);
    });
    const mv = (j) => ND * R5 ** j;
    this.tks.forEach((s, i) => {
      const j = i + 1, o = clamp(p.tk - i, 0, 1), x = X(j), y = Y(mv(j)), xp = X(j - 1), yp = Y(mv(j - 1)), cx = (xp + x) / 2 - 4, cy = Math.max(y, yp) + 38, ay = 0.25 * (yp + 14) + 0.5 * cy + 0.25 * (y + 12);
      s.dot.setAttribute("cx", x); s.dot.setAttribute("cy", y);
      setFx(s.lab, `*N*_{${j}} ≈ ${ent(Math.round(mv(j)))}`); s.lab.setAttribute("x", x + 12); s.lab.setAttribute("y", y - 12);
      s.ar.setAttribute("d", `M${xp + 6} ${yp + 14}Q${cx} ${cy} ${x - 8} ${y + 12}`);
      s.arl.setAttribute("x", cx); s.arl.setAttribute("y", ay + 28); show(s.g, o);
    });
    this.n0L.setAttribute("x", X(0) + 16); this.n0L.setAttribute("y", Y(N0) + 4); show(this.n0L, Math.max(p.n0, clamp(p.tk, 0, 1)));
    // pentes : un segment de tangente centré sur le point, de pente −λN
    this.pentes.forEach((q, i) => {
      const N = N0 * R5 ** q.k, s = -LAMD * N, dk = 1.6, x = X(q.k), y = Y(N);
      const xa = X(q.k - (i ? dk : 0)), ya = Y(N - s * (i ? dk : 0)), xb = X(q.k + dk), yb = Y(N + s * dk);
      q.l.setAttribute("x1", xa.toFixed(1)); q.l.setAttribute("y1", ya.toFixed(1)); q.l.setAttribute("x2", xb.toFixed(1)); q.l.setAttribute("y2", yb.toFixed(1));
      q.d.setAttribute("cx", x.toFixed(1)); q.d.setAttribute("cy", y.toFixed(1));
      // l'étiquette se pose au-dessus de la courbe, là où elle est libre
      q.t.setAttribute("x", (i ? X(TH) + 30 : X(0.9) + 16).toFixed(1)); q.t.setAttribute("y", (i ? Y(50) - 28 : Y(N0) + 50).toFixed(1));
    });
    show(this.pg, p.pente);
    this.lamL.setAttribute("x", X(7.5)); this.lamL.setAttribute("y", (Y(mv(7.5)) - 44).toFixed(1)); show(this.lamL, p.lam);
    this.thL.setAttribute("x", X(TH) + 14); this.thL.setAttribute("y", Y(50) - 40); show(this.thL, p.th);
    this.tanL.setAttribute("x1", X(0)); this.tanL.setAttribute("y1", Y(N0)); this.tanL.setAttribute("x2", X(TAU)); this.tanL.setAttribute("y2", Y(0));
    this.tanD.setAttribute("cx", X(TAU)); this.tanD.setAttribute("cy", Y(N0 * Math.exp(-1)));
    this.tanV.setAttribute("x1", X(TAU)); this.tanV.setAttribute("x2", X(TAU)); this.tanV.setAttribute("y1", Y(N0 * Math.exp(-1))); this.tanV.setAttribute("y2", Y(0));
    this.tanP.setAttribute("x", X(TAU) + 14); this.tanP.setAttribute("y", Y(N0 * Math.exp(-1)) - 12);
    this.tanT.setAttribute("x", X(TAU) + 12); this.tanT.setAttribute("y", Y(0) - 14); show(this.tanG, p.tan);
    // activité : les 6 de l'élève, tic par tic ; on montre celle où il restait ≈ 50 dés
    let jh = 1; for (let j = 1; j <= KMAX; j++) if (Math.abs(NK[j - 1] - 50) < Math.abs(NK[jh - 1] - 50)) jh = j;
    this.barR.forEach((r, j) => { if (!j) { r.style.display = "none"; return; } r.setAttribute("x", (X(j) - 7).toFixed(1)); r.setAttribute("y", Y(DK[j]).toFixed(1)); r.setAttribute("height", Math.max(0, Y(0) - Y(DK[j])).toFixed(1)); r.setAttribute("class", j === jh ? "bar hl" : "bar"); });
    this.barE.setAttribute("d", courbe((k) => (ND / DE) * R5 ** (k - 1), 1, Math.min(20, p.xmax), X, Y, 120));
    setFx(this.barT, `${DK[jh]} sur ${NK[jh - 1]}`); this.barT.setAttribute("x", X(jh)); this.barT.setAttribute("y", Y(Math.max(DK[jh], (ND / DE) * R5 ** (jh - 1))) - 24);
    show(this.barG, p.bars); show(this.barLeg, p.bars);
    let a = "La courbe des dés", b = "le nombre moyen de dés restants, tic après tic";
    if (p.tan > 0.5) { a = "La tangente à l’origine"; b = "elle coupe l’axe des temps en τ"; }
    else if (p.bars > 0.5) { a = "Combien de 6 à chaque tic ?"; b = "moins il reste de dés, moins il en part"; }
    else if (p.th > 0.5) { a = "La demi-vie, calculée"; b = "la largeur d’une marche"; }
    else if (p.lam > 0.5) { a = "Le λ des dés"; b = "un peu plus que 1/6"; }
    else if (p.pente > 0.5) { a = "La pente suit la hauteur"; b = "deux fois moins de dés, une pente deux fois plus douce"; }
    else if (p.tk > 0.5) { a = "Tic après tic"; b = "à chaque tic, on multiplie par 5/6"; }
    else if (ops.some((o) => o > 0.5)) { a = "Les marches de la demi-vie"; b = "la moitié, puis la moitié de la moitié…"; }
    this.ti.set(a, b);
  },
});

/* ---------- les mesures de Rutherford (1900) ---------- */
scene("ruther", {
  p: { pts: 0, stairs: 0 },
  build(g) {
    const X = (t) => 110 + (780 * t) / 360, Y = (v) => 590 - 440 * v;
    this.ti = titre(g, "Le gaz du thorium, mesuré par Rutherford", "Philosophical Magazine, janvier 1900, tableau III");
    axes(E("g", {}, g), X, Y, 360, 1, 60, 0.25, (v) => (v ? `${v / 60} min` : "0"), (v) => String(v).replace(".", ","), "*t*", "rayonnement mesuré (1 au départ)");
    this.st = [1, 2, 3, 4].map((n) => {
      const sg = E("g", {}, g), t = 60 * n, v = 1 / 2 ** n;
      E("line", { x1: X(0), x2: X(t), y1: Y(v), y2: Y(v), class: "k-a", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, sg);
      E("line", { x1: X(t), x2: X(t), y1: Y(v), y2: Y(0), class: "k-a", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, sg);
      return sg;
    });
    this.pts = RUTH.map(([t, v]) => E("circle", { cx: X(t), cy: Y(v), r: 7, class: "s-ink" }, g));
    this.a62 = fx(g, X(62) + 14, Y(0.51) - 12, "0,51 à 62 s", "rd-fort s-ink");
    this.a118 = fx(g, X(118) + 14, Y(0.23) - 12, "0,23 à 118 s : presque 1/4", "rd-fort s-a");
  },
  render() {
    const p = this.p;
    this.pts.forEach((c, j) => show(c, clamp(p.pts * RUTH.length - j, 0, 1))); show(this.a62, clamp(p.pts * 2 - 1, 0, 1));
    this.st.forEach((s, i) => show(s, clamp(p.stairs * 4 - i, 0, 1))); show(this.a118, clamp(p.stairs * 2 - 1, 0, 1));
  },
});

/* ---------- le détour : la fonction exponentielle, et ln ---------- */
scene("expo", {
  p: { ex: 0, emx: 0, tg: 0, ln2: 0 },
  build(g) {
    const X = (x) => 500 + 150 * x, Y = (y) => 580 - 80 * y; this.X = X; this.Y = Y;
    this.ti = titre(g, "La fonction exponentielle", "");
    E("line", { x1: X(-2.6), x2: X(2.6), y1: Y(0), y2: Y(0), class: "k-dim", "stroke-width": 1.5 }, g);
    E("line", { x1: X(0), x2: X(0), y1: Y(0), y2: Y(5.5), class: "k-dim", "stroke-width": 1.5 }, g);
    [-2, -1, 1, 2].forEach((v) => { E("line", { x1: X(v), x2: X(v), y1: Y(0), y2: Y(0) + 6, class: "k-dim" }, g); fx(g, X(v), Y(0) + 26, String(v).replace("-", "−"), "t-sous", "middle"); });
    [1, 2, 3, 4, 5].forEach((v) => { E("line", { x1: X(0) - 6, x2: X(0), y1: Y(v), y2: Y(v), class: "k-dim" }, g); fx(g, X(0) - 10, Y(v) + 5, String(v), "t-sous", "end"); });
    fx(g, X(2.6) + 12, Y(0) + 5, "*x*", "t-lab s-c");
    const cl = E("g", { "clip-path": "url(#rclip-expo)" }, g);
    this.cEx = E("path", { d: courbe(Math.exp, -2.6, 2.6, X, Y), class: "k-ink nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cl);
    this.cEm = E("path", { d: courbe((x) => Math.exp(-x), -2.6, 2.6, X, Y), class: "k-a nofill", "stroke-width": 3, pathLength: 1000, "stroke-dasharray": "1000 1000" }, cl);
    this.lEx = fx(g, X(1.62) + 14, Y(Math.exp(1.62)) + 6, "*y* = e^{x}", "rd-fort s-ink");
    this.lEm = fx(g, X(-1.62) - 14, Y(Math.exp(1.62)) + 6, "*y* = e^{−x}", "rd-fort s-ink", "end");
    // e^0 = 1 : l'étiquette à gauche, là où les deux courbes laissent de la place, reliée au point
    this.p01 = E("g", {}, g); E("circle", { cx: X(0), cy: Y(1), r: 6, class: "s-ink" }, this.p01);
    E("line", { x1: X(-1.02), y1: Y(0.62), x2: X(0) - 8, y2: Y(1) + 3, class: "k-dim", "stroke-width": 1.5 }, this.p01);
    fx(this.p01, X(-1.06), Y(0.62) + 6, "e^{0} = 1", "rd-fort s-ink", "end");
    // la tangente en x = 1 : y = e·x, sa pente vaut la hauteur
    this.tg = E("g", {}, g);
    E("line", { x1: X(0.4), y1: Y(Math.E * 0.4), x2: X(1.62), y2: Y(Math.E * 1.62), class: "k-dim", "stroke-width": 2, "stroke-dasharray": "7 6" }, this.tg);
    E("circle", { cx: X(1), cy: Y(Math.E), r: 6, class: "s-ink" }, this.tg);
    fx(this.tg, X(1) + 16, Y(Math.E) + 30, `en 1 : hauteur e ≈ ${fr(Math.E, 2)}, pente e ≈ ${fr(Math.E, 2)}`, "t-lab s-ink");
    // ln 2 : là où e^x vaut 2
    this.lg = E("g", {}, g);
    E("line", { x1: X(-2.6), x2: X(Math.LN2), y1: Y(2), y2: Y(2), class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, this.lg);
    E("line", { x1: X(Math.LN2), x2: X(Math.LN2), y1: Y(2), y2: Y(0), class: "k-dim", "stroke-dasharray": "5 6", "stroke-width": 1.8 }, this.lg);
    E("circle", { cx: X(Math.LN2), cy: Y(2), r: 6, class: "s-ink" }, this.lg);
    fx(this.lg, X(-2.5), Y(2) - 12, "e^{x} = 2", "rd-fort s-ink");
    fx(this.lg, X(Math.LN2), Y(0) + 56, `*x* = ln 2 ≈ ${fr(Math.LN2, 2)}`, "rd-fort s-ink", "middle");
  },
  render() {
    const p = this.p;
    this.cEx.style.strokeDashoffset = 1000 * (1 - p.ex); show(this.lEx, clamp(p.ex * 2 - 1, 0, 1)); show(this.p01, p.ex);
    this.cEm.style.strokeDashoffset = 1000 * (1 - p.emx); show(this.cEm, p.emx > 0 ? 1 : 0); show(this.lEm, clamp(p.emx * 2 - 1, 0, 1));
    show(this.tg, p.tg); show(this.lg, p.ln2);
    this.ti.set(p.ln2 > 0.5 ? "Le logarithme népérien" : "La fonction exponentielle",
      p.ln2 > 0.5 ? "ln défait l’exponentielle : e^{x} = 2 ⇔ *x* = ln 2" : p.emx > 0.5 ? "e^{−x} : de 1 vers 0, sans jamais l’atteindre" : "égale à sa propre dérivée, et e^{0} = 1");
  },
});
}
