/* eslint-disable */
// @ts-nocheck
/**
 * Scène `plan` de « Nombres complexes, première partie » : le plan complexe, dans un repère
 * ORTHONORMÉ (une seule unité sur les deux axes, sinon le quart de tour se voit déformé). Elle
 * porte la figure-clé « multiplier par i, c'est tourner d'un quart de tour », puis la somme, le
 * conjugué, le module, la distance, les solutions du second degré et les cercles du bac.
 * Aucune couleur écrite en dur : les classes de pilote.css seulement ; toutes les positions et
 * toutes les étiquettes sont CALCULÉES par complexes-outils.js (jamais posées à l'œil).
 *
 * L'état est une fonction pure de ses paramètres : aller, retour, pause et saut donnent la même image.
 *   · discrets (posés par `set`, ils sautent d'une étape à l'autre) : vue (0 : x de −5,5 à 7,5 ; 1 :
 *     x de −3 à 14,5, pour le produit z z̄), geste, pts et cercles (clés d'une liste fermée de
 *     complexes-outils.js), t1 / t2 / sub (les lectures chiffrées, écrites par le script) ;
 *   · numériques : zr, zi (le point principal), wr, wi (le vecteur de la somme), axeI, lab (les
 *     graduations et le nom de l'axe des imaginaires), zv, proj, eq, ov, ab, pv, pl (l'étiquette chiffrée
 *     du produit z z̄), lv ;
 *   · animés, UN à la fois dans une étape : u (le geste du point : paliers nommés ci-dessous), cu (le
 *     tracé du cercle, de 0 à 2π), su (le tracé du segment AB, de A vers B).
 * Paliers de `u` selon le geste : demi (z → −z, arc de centre O d'angle uπ) ; quart (z → iz, angle
 * uπ/2, l'équerre en O à u = 1) ; trans (z → z + w, translation de u·w) ; miroir (z → z̄, ordonnée
 * (1 − 2u)b) ; tour (1 → i → −1 → −i → 1, un tour en u = 1, un point étiqueté à chaque quart) ; prod
 * (z z̄ pour trois crans de z : l'un après l'autre, aux tiers de u). Sous prefers-reduced-motion, le
 * noyau saute d'un palier à l'autre.
 * Garde (M9) : avant `quart`, ni axe vertical ni i ; avant `fois-i`, ni iz ni l'équerre ; avant
 * `ou-zzbar`, z z̄ n'est pas placé ; avant `cercle` et `conjuguees`, ni cercle ni racines ; pendant
 * `bac`, le point −4 reste caché jusqu'à `bac-c`.
 */
import { C, ci, cnum, cmul, cconj, cneg, cadd, S as Ssvg, ENSEMBLES, CERCLES, OPTS_FOIS, ABC, fr, ent, rotation, zzbar, ZZBAR_CRANS, ZZBAR_VALEURS, racMod, modNum, AB, AB_TEX, qnum } from "./complexes-outils";

export const PLOT = { x0: 70, x1: 930, y0: 104, y1: 648 };
const VUES = [{ x0: -5.5, x1: 7.5, y0: -5, y1: 5.6 }, { x0: -3, x1: 14.5, y0: -5, y1: 5.6 }];
const NTX = 20, NTY = 12;

export function scenesB(ctx, O) {
const { E, clamp, show, scene, lerp, defs } = ctx;
const { fx, setFx } = O;

E("rect", { x: PLOT.x0, y: PLOT.y0 - 6, width: PLOT.x1 - PLOT.x0, height: PLOT.y1 - PLOT.y0 + 12 }, E("clipPath", { id: "cx-clip-plan" }, defs));
const pasMoins = (s) => String(s).replace("-", "−");
const proche = (v) => Math.abs(v - Math.round(v)) < 1e-6;

scene("plan", {
  p: { vue: 0, axeI: 0, lab: 0, zv: 0, zr: 3, zi: 2, geste: "", u: 0, wr: 1, wi: -4, eq: 0, pts: "", pv: 0, pl: 0, cercles: "", cu: 0, ab: 0, su: 0, opts: "", ov: 0, proj: 0, t1: "", t2: "", lv: 0, sub: "" },
  // la fenêtre courante et l'échelle : une seule unité sur les deux axes
  repere() {
    const v = clamp(this.p.vue, 0, 1), m = (k) => lerp(VUES[0][k], VUES[1][k], v);
    const x0 = m("x0"), x1 = m("x1"), y0 = m("y0"), y1 = m("y1");
    const U = Math.min((PLOT.x1 - PLOT.x0) / (x1 - x0), (PLOT.y1 - PLOT.y0) / (y1 - y0));
    const ox = PLOT.x0 + ((PLOT.x1 - PLOT.x0) - U * (x1 - x0)) / 2, oy = PLOT.y1 - ((PLOT.y1 - PLOT.y0) - U * (y1 - y0)) / 2;
    return { x0, x1, y0, y1, U, X: (x) => ox + U * (x - x0), Y: (y) => oy - U * (y - y0) };
  },
  build(g) {
    this.h2 = fx(g, 60, 58, "", "t-sous");
    this.l1 = fx(g, 940, 56, "", "t-lab2 s-ink", "end");
    this.l2 = fx(g, 940, 90, "", "t-lab2 s-ink", "end");
    // les axes et leurs graduations
    this.axX = E("line", { class: "k-dim", "stroke-width": 1.8 }, g);
    this.axY = E("line", { class: "k-dim", "stroke-width": 1.8 }, g);
    this.txs = Array.from({ length: NTX }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "middle") }));
    this.tys = Array.from({ length: NTY }, () => ({ l: E("line", { class: "k-dim" }, g), t: fx(g, 0, 0, "", "t-tick s-dim", "end") }));
    this.nomR = fx(g, 0, 0, "axe des réels", "t-lab s-dim");
    this.nomI = fx(g, 0, 0, "axe des imaginaires", "t-lab s-dim", "middle");
    this.oT = fx(g, 0, 0, "O", "t-lab s-ink", "end");
    // les cercles et le segment, sous les points
    const cg = E("g", { "clip-path": "url(#cx-clip-plan)" }, g);
    this.cir = [0, 1].map(() => E("path", { class: "k-a nofill", "stroke-width": 3.4, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linecap": "round" }, cg));
    this.cirT = [0, 1].map(() => fx(g, 0, 0, "", "t-lab2 s-ink"));
    this.rad = E("line", { class: "k-ink", "stroke-dasharray": "7 6", "stroke-width": 2.2 }, g);
    this.radT = fx(g, 0, 0, "", "t-lab2 s-ink");
    this.seg = E("path", { class: "k-a nofill", "stroke-width": 4.2, pathLength: 1000, "stroke-dasharray": "1000 1000", "stroke-linecap": "round" }, g);
    this.segT = fx(g, 0, 0, "", "t-lab2 s-ink", "middle");
    // la projection du point principal sur les axes
    this.pj = [0, 1].map(() => ({ l: E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 2 }, g), t: fx(g, 0, 0, "", "t-lab s-ink", "middle") }));
    // le geste : l'arc parcouru, la flèche, le lien du miroir, l'axe renforcé, l'équerre
    this.arc = E("path", { class: "k-dim nofill", "stroke-width": 3, "stroke-dasharray": "3 7", "stroke-linecap": "round" }, g);
    this.mir = E("line", { class: "k-dim", "stroke-dasharray": "5 5", "stroke-width": 2 }, g);
    this.mirAx = E("line", { class: "k-ink", "stroke-dasharray": "14 9", "stroke-width": 3.6 }, g);
    this.arr = E("line", { class: "k-a", "stroke-width": 4, "marker-end": "url(#arw)" }, g);
    this.eqr = E("path", { class: "k-ink nofill", "stroke-width": 2.6 }, g);
    // les points : le point principal, son conjugué (produit), le produit, les quatre quarts, les ensembles, les candidats
    const pt = (r, cls, anchor) => { const gg = E("g", {}, g); return { g: gg, c: E("circle", { r, class: cls }, gg), t: fx(gg, 0, 0, "", "t-lab2 s-ink", anchor) }; };
    this.pz = pt(8, "s-ink");
    this.pb = pt(8, "s-ink");
    this.pp = pt(9, "s-a");
    this.tq = [0, 1, 2, 3].map(() => pt(7, "s-ink"));
    this.ps = [0, 1, 2].map(() => pt(8, "s-ink"));
    this.pa = [0, 1].map(() => pt(8, "s-ink"));
    this.cand = [0, 1, 2].map(() => { const gg = E("g", {}, g); return { g: gg, c: E("circle", { r: 12, class: "k-ink nofill", "stroke-dasharray": "4 4", "stroke-width": 2.2 }, gg), t: fx(gg, 0, 0, "", "t-lab2 s-ink") }; });
    this.mp = pt(11, "s-a");
  },
  render() {
    const p = this.p, R = this.repere(), { X, Y, U, x0, x1, y0, y1 } = R, fix = (v) => v.toFixed(1);
    const set = (e, o) => { for (const k in o) e.setAttribute(k, typeof o[k] === "number" ? fix(o[k]) : o[k]); };
    const at = (e, x, y) => { e.setAttribute("x", fix(x)); e.setAttribute("y", fix(y)); };
    const line = (l, xa, ya, xb, yb) => set(l, { x1: X(xa), y1: Y(ya), x2: X(xb), y2: Y(yb) });
    // un point étiqueté : (x, y) dans le repère, un texte, une ancre choisie selon la place
    const dot = (o, x, y, txt, op = 1, dx = 12, dy = -12, milieu = false) => {
      set(o.c, { cx: X(x), cy: Y(y) }); const px = X(x);
      const fin = px > PLOT.x1 - 190, bas = y < -0.01 && dy < 0;
      if (txt != null) { setFx(o.t, txt); at(o.t, milieu ? px : px + (fin ? -dx : dx), Y(y) + (bas ? 34 : dy)); o.t.setAttribute("text-anchor", milieu ? "middle" : fin ? "end" : "start"); }
      show(o.g, op);
    };
    const cx0 = Y(0), cy0 = X(0);
    // les axes
    set(this.axX, { x1: X(x0), x2: X(x1), y1: cx0, y2: cx0 });
    set(this.axY, { x1: cy0, x2: cy0, y1: Y(y0), y2: Y(y1) }); show(this.axY, p.axeI);
    const lo = Math.ceil(x0 - 1e-9);
    this.txs.forEach((q, i) => { const v = lo + i, ok = v <= x1 + 1e-9; if (ok) { set(q.l, { x1: X(v), x2: X(v), y1: cx0 - 5, y2: cx0 + 5 }); if (v) { at(q.t, X(v), cx0 + 28); setFx(q.t, pasMoins(v)); } } q.l.style.opacity = ok ? 1 : 0; q.t.style.opacity = ok && v ? 1 : 0; });
    const jlo = Math.ceil(y0 - 1e-9);
    this.tys.forEach((q, i) => { const v = jlo + i, ok = v <= y1 + 1e-9 && v !== 0; if (ok) { set(q.l, { x1: cy0 - 5, x2: cy0 + 5, y1: Y(v), y2: Y(v) }); at(q.t, cy0 - 12, Y(v) + 6); setFx(q.t, Ssvg(C(0, v))); } q.l.style.opacity = ok ? p.axeI : 0; q.t.style.opacity = ok ? p.axeI * p.lab : 0; });
    // le nom de l'axe : à droite, ou à gauche quand la vue large place z z̄ près de l'extrémité droite
    this.nomR.setAttribute("text-anchor", p.vue < 0.5 ? "end" : "start"); at(this.nomR, p.vue < 0.5 ? X(x1) - 6 : X(x0) + 6, cx0 - 12);
    at(this.nomI, cy0, PLOT.y0 - 6); show(this.nomI, p.axeI * p.lab);
    at(this.oT, cy0 - 10, cx0 + 26);
    setFx(this.h2, p.sub || ""); setFx(this.l1, p.t1 || ""); setFx(this.l2, p.t2 || ""); show(this.l1, 1); show(this.l2, p.lv);

    // le point principal et le geste
    const g = p.geste, u = clamp(p.u, 0, 1);
    let zr = p.zr, zi = p.zi, kp = -1;
    if (g === "prod") { kp = u > 0 ? clamp(Math.ceil(u * 3 - 1e-9) - 1, 0, 2) : 0; const c = ZZBAR_CRANS[kp]; zr = qnum(c.re); zi = qnum(c.im); }
    const zc = proche(zr) && proche(zi) ? C(Math.round(zr), Math.round(zi)) : null;
    const lbl = (c) => (c ? Ssvg(c) : "");
    // le point principal : visible seulement quand l'étape le pose (et sous prod)
    const vis = g === "prod" ? 1 : p.zv;
    dot(this.pz, zr, zi, lbl(zc), vis);
    // projections : a et b
    const pjOn = p.proj * vis;
    set(this.pj[0].l, { x1: X(zr), y1: Y(zi), x2: X(zr), y2: Y(0) }); at(this.pj[0].t, X(zr), Y(0) - 14); setFx(this.pj[0].t, "*a*"); show(this.pj[0].l, pjOn); show(this.pj[0].t, pjOn);
    set(this.pj[1].l, { x1: X(zr), y1: Y(zi), x2: X(0), y2: Y(zi) }); at(this.pj[1].t, X(0) + 16, Y(zi) - 10); setFx(this.pj[1].t, "*b*"); show(this.pj[1].l, pjOn * p.axeI); show(this.pj[1].t, pjOn * p.axeI);
    // les gestes
    let arcD = "", mpOn = 0, mx = zr, my = zi, mt = "";
    const rayon = Math.hypot(zr, zi), ang0 = Math.atan2(zi, zr);
    const tracer = (a1) => { let d = ""; const n = Math.max(2, Math.ceil(Math.abs(a1) * 12)); for (let k = 0; k <= n; k++) { const a = ang0 + (a1 * k) / n; d += (k ? "L" : "M") + fix(X(rayon * Math.cos(a))) + " " + fix(Y(rayon * Math.sin(a))); } return d; };
    let eqOn = 0, mirOn = 0, arrOn = 0, tourOn = 0;
    if (g === "demi" || g === "quart") {
      const a1 = (g === "demi" ? Math.PI : Math.PI / 2) * u, r = rotation(zc || C(0), 0);
      mx = rayon * Math.cos(ang0 + a1); my = rayon * Math.sin(ang0 + a1); mpOn = u > 0.001 ? 1 : 0;
      arcD = u > 0.001 ? tracer(a1) : "";
      if (u >= 0.999 && zc) mt = lbl(g === "demi" ? cneg(zc) : cmul(ci, zc));
      if (g === "quart") eqOn = p.eq * clamp((u - 0.9) * 10, 0, 1);
    } else if (g === "trans") {
      mx = zr + u * p.wr; my = zi + u * p.wi; mpOn = u > 0.001 ? 1 : 0; arrOn = mpOn;
      if (u >= 0.999 && zc && proche(p.wr) && proche(p.wi)) mt = lbl(cadd(zc, C(Math.round(p.wr), Math.round(p.wi))));
    } else if (g === "miroir") {
      mx = zr; my = (1 - 2 * u) * zi; mpOn = u > 0.001 ? 1 : 0; mirOn = mpOn;
      if (u >= 0.999 && zc) mt = lbl(cconj(zc));
    } else if (g === "tour") {
      tourOn = 1; mpOn = u > 0.001 ? 1 : 0;
      const a1 = 2 * Math.PI * u; mx = rayon * Math.cos(ang0 + a1); my = rayon * Math.sin(ang0 + a1); arcD = u > 0.001 ? tracer(a1) : "";
    }
    set(this.arc, { d: arcD }); show(this.arc, arcD ? 1 : 0);
    // la flèche de la translation, posée sur z
    set(this.arr, { x1: X(zr), y1: Y(zi), x2: X(mx), y2: Y(my) }); show(this.arr, arrOn);
    set(this.mir, { x1: X(zr), y1: Y(zi), x2: X(mx), y2: Y(my) }); show(this.mir, mirOn);
    set(this.mirAx, { x1: X(x0), y1: cx0, x2: X(x1), y2: cx0 }); show(this.mirAx, mirOn);
    // l'équerre en O, entre OM et OM′
    const da = [Math.cos(ang0), Math.sin(ang0)], db = [-Math.sin(ang0), Math.cos(ang0)], s = 22 / U;
    set(this.eqr, { d: `M${fix(X(s * da[0]))} ${fix(Y(s * da[1]))}L${fix(X(s * (da[0] + db[0])))} ${fix(Y(s * (da[1] + db[1])))}L${fix(X(s * db[0]))} ${fix(Y(s * db[1]))}` }); show(this.eqr, eqOn);
    dot(this.mp, mx, my, mt, mpOn && g !== "prod" ? 1 : 0, 0, -22, true);
    // les quatre quarts : 1, i, −1, −i, étiquetés quand le point les atteint
    this.tq.forEach((o, k) => { const c = cmul(C(Math.round(zr), Math.round(zi)), pow(k)); const q = cnum(c); dot(o, q.x, q.y, Ssvg(c), tourOn * (k === 0 || u >= k / 4 - 1e-6 ? 1 : 0), k === 0 ? 12 : 12, k === 1 || k === 3 ? -12 : -12); });
    // le produit z z̄ : le conjugué de z, puis le point sur l'axe des réels
    const zb = zc ? cconj(zc) : null;
    dot(this.pb, zr, -zi, g === "prod" && zb ? Ssvg(zb) : "", g === "prod" ? 1 : 0);
    const prod = g === "prod" && u > 0 ? ZZBAR_VALEURS[kp] : 0;
    dot(this.pp, prod, 0, g === "prod" && p.pl > 0.5 ? ent(prod) : "", g === "prod" && u > 0 ? 1 : 0, 12, -16);
    // les candidats A, B, C (sans affixe)
    this.cand.forEach((o, k) => { const q = cnum(OPTS_FOIS[k]); set(o.c, { cx: X(q.x), cy: Y(q.y) }); setFx(o.t, ABC[k]); o.t.setAttribute("text-anchor", "middle"); at(o.t, X(q.x), Y(q.y) + 36); show(o.g, p.ov); });
    // les ensembles de points
    const E_ = ENSEMBLES[p.pts] || [];
    this.ps.forEach((o, k) => { const e = E_[k]; if (!e) { show(o.g, 0); return; } const q = cnum(e.z); dot(o, q.x, q.y, e.nom || Ssvg(e.z), p.pv); });
    // A et B
    [AB.a, AB.b].forEach((c, k) => { const q = cnum(c); dot(this.pa[k], q.x, q.y, `${k ? "B" : "A"}(${Ssvg(c)})`, p.ab); });
    const qa = cnum(AB.a), qb = cnum(AB.b);
    set(this.seg, { d: `M${fix(X(qa.x))} ${fix(Y(qa.y))}L${fix(X(qb.x))} ${fix(Y(qb.y))}` }); this.seg.style.strokeDashoffset = 1000 * (1 - p.su); show(this.seg, p.su > 0 ? p.ab : 0);
    setFx(this.segT, `*AB* = ${AB_TEX.ok}`); at(this.segT, (X(qa.x) + X(qb.x)) / 2 + 46, (Y(qa.y) + Y(qb.y)) / 2 - 8); show(this.segT, p.ab * clamp(p.su * 4 - 3, 0, 1));
    // les cercles
    const K = CERCLES[p.cercles] || [];
    this.cir.forEach((el, k) => {
      const c = K[k]; if (!c) { show(el, 0); show(this.cirT[k], 0); return; }
      const w = cnum(c.w), Rp = U * c.r, cx = X(w.x), cy = Y(w.y);
      set(el, { d: `M${fix(cx + Rp)} ${fix(cy)}A${fix(Rp)} ${fix(Rp)} 0 0 0 ${fix(cx - Rp)} ${fix(cy)}A${fix(Rp)} ${fix(Rp)} 0 0 0 ${fix(cx + Rp)} ${fix(cy)}` });
      el.style.strokeDashoffset = 1000 * (1 - p.cu); el.setAttribute("class", p.cercles === "bac" ? "k-ink nofill" : "k-a nofill"); el.setAttribute("stroke-dasharray", p.cercles === "bac" && k ? "1000 1000" : "1000 1000");
      show(el, p.cu > 0 ? 1 : 0);
      const a = k ? 1.1 : 2.4;
      if (c.nom) { setFx(this.cirT[k], c.nom); at(this.cirT[k], cx + (Rp + 14) * Math.cos(a), cy - (Rp + 14) * Math.sin(a)); this.cirT[k].setAttribute("text-anchor", Math.cos(a) < 0 ? "end" : "start"); show(this.cirT[k], p.cu >= 0.999 ? 1 : 0); } else show(this.cirT[k], 0);
    });
    // le rayon et sa longueur (le module)
    const rOn = p.cercles === "z" ? clamp(p.cu * 3, 0, 1) : 0, zq = cnum(C(Math.round(p.zr), Math.round(p.zi)));
    set(this.rad, { x1: X(0), y1: Y(0), x2: X(zq.x), y2: Y(zq.y) }); show(this.rad, rOn);
    setFx(this.radT, `|*z*| = ${racMod(C(Math.round(p.zr), Math.round(p.zi)))}`); at(this.radT, X(zq.x / 2) - 14, Y(zq.y / 2) - 16); this.radT.setAttribute("text-anchor", "end"); show(this.radT, rOn);
  },
});

function pow(k) { let r = C(1); for (let i = 0; i < k; i++) r = cmul(r, ci); return r; }
}
