/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « La méiose, la fécondation et les brassages » : `division`, les deux divisions d'une cellule à
 * 2n = 4 vues comme dans la maquette « Méiose » (procédés 2 et 7 du rapport 10) : de vrais chromosomes
 * bichromatidiens (deux chromatides sœurs jointes par UN centromère), les tétrades, le fuseau (deux pôles,
 * une fibre vers chaque centromère) et la plaque équatoriale.
 *
 * Une seule grandeur pilote la division : `u`, de 0 à 6, un palier par entier.
 *   0 après la phase S, les quatre chromosomes dispersés dans le noyau
 *   1 prophase I : les homologues s'apparient (deux tétrades)
 *   2 métaphase I : les centromères de part et d'autre de la plaque, un homologue de chaque côté
 *   3 fin de la division I : deux cellules, chaque chromosome garde ses DEUX chromatides et son centromère
 *   4 métaphase II : un chromosome par cellule, centromère sur la plaque
 *   5 anaphase II : le centromère se clive, les chromatides sœurs partent vers les pôles
 *   6 quatre cellules, chromosomes à une seule chromatide
 * Entre deux entiers tout glisse (anaphase I vers 2,5, cytocinèse de 2,65 à 3, puis de 5,35 à 6). Jamais un centromère
 * ne se clive en division I : il ne se clive qu'après le palier 4.
 *
 * Autres paramètres :
 *   o    0 → 1, l'orientation de la petite paire sur la plaque (0 : les deux chromosomes du père du même côté,
 *        1 : la petite paire retournée) ; les gamètes en sont des fonctions
 *   al   garde : 1 écrit l'allèle de chaque chromosome (A, a, B, b), 0 ne l'écrit pas
 *   tet  garde : 1 encadre les tétrades et les nomme
 *   cnt  garde : 1 écrit sous chaque cellule le compte des chromosomes, des chromatides et de l'ADN
 *   gam  garde : 1 écrit sous chaque cellule le lot d'allèles qu'elle contient
 *   cmp  0, 1, 2 : la comparaison des orientations (1 : la première ; 2 : la première et la seconde)
 *   frz  garde : 1 écrit la frise 2n → n → n
 *   mit  garde : 1 réduit la méiose et dessine à côté la mitose (les chromosomes alignés un par un)
 * Couleurs : des classes seulement ; le chromosome d'origine paternelle est en `k-a`, celui de la mère en `k-ink`.
 */
import { etat, lignesCompteur, gametes, typesDe } from "./meiose-outils";

const CY = 342;                         // l'axe du fuseau (horizontal)
const PL = 500;                         // le plan équatorial
const YG = 275, YP = 430;               // hauteur de la grande et de la petite paire
const LG = 70, LP = 48;                 // demi-longueur d'une chromatide
const SPR = 10, BUL = 8;                 // demi-écart des chromatides sœurs, creux de leur arc
const WCH = 10;                         // épaisseur d'une chromatide
const SW = 34;                          // l'arc que décrit la petite paire quand on la retourne
const Y0 = 136, Y1 = 548;               // le haut et le bas des cellules
const CHR = [
  { id: "G1", big: true, pat: true, all: "A", side: -1 },
  { id: "G2", big: true, pat: false, all: "a", side: 1 },
  { id: "P1", big: false, pat: true, all: "B" },
  { id: "P2", big: false, pat: false, all: "b" },
];
const DISP = { G1: [440, 278], G2: [565, 312], P1: [455, 420], P2: [570, 405] };   // dans le noyau
const BIV = { G1: 368, G2: 412, P1: 588, P2: 632 };                                  // les tétrades, avant la plaque
const PII = [126, 458, 542, 874];                                                    // les pôles de la division II
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const lisse = (t) => t * t * (3 - 2 * t);
const bump = (u, a, b, c, d) => clamp((u - a) / (b - a), 0, 1) * clamp((d - u) / (d - c), 0, 1);
const f1 = (v) => Number(v).toFixed(1);

/** où est le chromosome au palier entier k : son centre, et l'écart d de ses deux chromatides à ce centre */
function cle(c, k, o) {
  const pi = Math.PI;
  const so = c.id === "P1" ? -Math.cos(pi * o) : c.id === "P2" ? Math.cos(pi * o) : c.side;
  const Y = c.big ? YG : YP, sw = c.id === "P1" ? -SW * Math.sin(pi * o) : c.id === "P2" ? SW * Math.sin(pi * o) : 0;
  switch (k) {
    case 0: return { x: DISP[c.id][0], y: DISP[c.id][1], d: SPR };
    case 1: return { x: BIV[c.id], y: Y, d: SPR };
    case 2: return { x: PL + 30 * so, y: Y + sw, d: SPR };
    case 3: return { x: PL + 280 * so, y: Y + sw, d: SPR };
    case 4: return { x: PL + 208 * so, y: Y, d: SPR };
    case 5: return { x: PL + 208 * so, y: Y, d: 80 };
    default: return { x: PL + 208 * so, y: Y, d: 104 };
  }
}
function pos(c, u, o) {
  const k = Math.min(5, Math.floor(u)), f = lisse(clamp(u - k, 0, 1)), a = cle(c, k, o), b = cle(c, k + 1, o);
  return { x: lerp(a.x, b.x, f), y: lerp(a.y, b.y, f), d: lerp(a.d, b.d, f) };
}
/** la phase de la figure ancienne (outils), pour le compteur : 1 après la phase S … 8 quatre cellules */
const phOf = (u) => (u < 0.5 ? 1 : u < 1.5 ? 2 : u < 2.25 ? 3 : u < 2.75 ? 4 : u < 3.5 ? 5 : u < 4.5 ? 6 : u < 5.5 ? 7 : 8);
const SOUS = (u) => (u < 0.5 ? "Début de prophase I : chromosomes dupliqués" : u < 1.4 ? "Prophase I : les homologues s’apparient" : u < 1.9 ? "Fin de prophase I : les tétrades gagnent la plaque"
  : u < 2.3 ? "Métaphase I" : u < 2.8 ? "Anaphase I" : u < 3.5 ? "Fin de la division I" : u < 4.5 ? "Métaphase II" : u < 5.5 ? "Anaphase II" : "Quatre cellules");

/** le tracé d'une chromatide : un arc de longueur 2L, à `off` du centre en travers, creusé de `bul` vers le centre, selon l'angle th (0 : vertical) */
function arcD(x, y, L, off, bul, th) {
  const sn = Math.sin(th), cs = Math.cos(th), ax = cs, ay = -sn, bx = sn, by = cs;
  const px = x + off * ax, py = y + off * ay, g = off < 0 ? -1 : 1, qx = x + (off - g * bul) * ax, qy = y + (off - g * bul) * ay;
  return `M${f1(px - L * bx)} ${f1(py - L * by)} Q${f1(qx)} ${f1(qy)} ${f1(px + L * bx)} ${f1(py + L * by)}`;
}

export function scenesD(ctx, O) {
  const { E, show, scene } = ctx;
  const { fx, setFx, titre } = O;
  const ln = (parent, k, w, extra) => E("line", { class: k, "stroke-width": w, "stroke-linecap": "round", ...(extra || {}) }, parent);
  const setL = (el, x1, y1, x2, y2) => { el.setAttribute("x1", f1(x1)); el.setAttribute("y1", f1(y1)); el.setAttribute("x2", f1(x2)); el.setAttribute("y2", f1(y2)); };
  const mkChrom = (parent, k) => {
    const g = E("g", {}, parent);
    const arcs = [0, 1].map(() => E("path", { class: `${k} nofill`, "stroke-width": WCH, "stroke-linecap": "round" }, g));
    const cen = E("circle", { r: 7.5, class: `s-bg ${k}`, "stroke-width": 3 }, g);
    const cen2 = [0, 1].map(() => E("circle", { r: 7.5, class: `s-bg ${k}`, "stroke-width": 3 }, g));
    return { g, arcs, cen, cen2 };
  };

  scene("division", {
    p: { u: 0, o: 0, al: 0, tet: 0, cnt: 0, gam: 0, cmp: 0, frz: 0, mit: 0 },
    build(g) {
      this.ti = titre(g, "Méiose d’une cellule à 2*n* = 4", "");
      this.frz = E("g", {}, g);
      [[190, "départ : 2*n*", "t-lab s-ink"], [345, "division I →", "t-lab2 s-a"], [500, "*n*", "t-lab s-ink"], [655, "division II →", "t-lab s-dim"], [810, "*n*", "t-lab s-ink"]].forEach(([x, t, c]) => fx(this.frz, x, 122, t, c, "middle"));
      /* le fond : les cellules, le noyau, les tétrades, les plaques */
      this.cells = [0, 1, 2, 3].map(() => E("rect", { class: "cell" }, g));
      this.nuc = E("circle", { class: "k-dim nofill", "stroke-width": 2, "stroke-dasharray": "8 6" }, g);
      this.nucT = fx(g, 500, 530, "enveloppe nucléaire", "t-sous", "middle");
      this.tetR = [0, 1].map(() => E("rect", { rx: 8, class: "k-dim nofill", "stroke-width": 1.8, "stroke-dasharray": "5 5" }, g));
      this.tetT = fx(g, 390, 196, "tétrade : 4 chromatides", "t-lab s-ink", "middle");
      this.pl = [0, 1, 2].map(() => ln(g, "k-dim", 1.8, { "stroke-dasharray": "7 6" }));
      this.plT = fx(g, 500, 160, "plaque équatoriale", "t-sous", "middle");
      /* le fuseau : les pôles, puis une fibre par chromatide */
      this.polI = [0, 1].map(() => E("circle", { r: 7, class: "s-ink" }, g));
      this.polII = [0, 1, 2, 3].map(() => E("circle", { r: 7, class: "s-ink" }, g));
      this.ch = CHR.map((c) => {
        const k = c.pat ? "k-a" : "k-ink", ob = { c, k };
        ob.fib = [0, 1].map(() => ln(g, "k-dim", 1.8));
        return ob;
      });
      /* les chromosomes (après les fibres : ils passent par-dessus), puis leurs allèles */
      this.ch.forEach((ob) => { Object.assign(ob, mkChrom(g, ob.k)); });
      this.ch.forEach((ob) => { ob.lab = [0, 1].map(() => E("text", { class: "me-all s-ink", "text-anchor": "middle" }, g)); ob.lab.forEach((t) => (t.textContent = ob.c.all)); });
      /* sous les cellules : le compteur, les lots d'allèles, la comparaison des orientations */
      // les cellules ont toutes le même compte : une seule écriture, centrée (quatre cellules étroites n'ont pas la place d'en porter chacune une)
      this.cntH = fx(g, 500, 604, "dans chaque cellule", "me-cnt s-dim", "middle");
      this.cnt = [0, 1, 2].map((i) => fx(g, 500, 636 + 32 * i, "", i === 2 ? "me-cnt s-ink" : "me-cnt s-dim", "middle"));
      this.gen = [0, 1, 2, 3].map(() => fx(g, 0, 574, "", "me-gen s-ink", "middle"));
      this.cmpT = [fx(g, 500, 654, "", "me-gen s-ink", "middle"), fx(g, 500, 690, "", "me-gen s-ink", "middle")];
      /* la mitose, à côté : quatre chromosomes alignés un par un sur la plaque (aucune transformation : positions calculées) */
      this.MG = E("g", {}, g);
      E("rect", { x: 628, y: 198, width: 332, height: 288, rx: 60, class: "cell" }, this.MG);
      ln(this.MG, "k-dim", 1.8, { "stroke-dasharray": "7 6" }).setAttribute("x1", 794);
      const mp = this.MG.lastChild; setL(mp, 794, 214, 794, 470);
      this.mitCh = [["k-a", LG, 252], ["k-ink", LG, 312], ["k-a", LP, 378], ["k-ink", LP, 436]].map(([k, L, y]) => {
        const m = mkChrom(this.MG, k), Lh = 0.7 * L;
        m.arcs.forEach((a, i) => a.setAttribute("d", arcD(794, y, Lh, i ? SPR : -SPR, BUL, Math.PI / 2)));
        m.cen.setAttribute("cx", 794); m.cen.setAttribute("cy", y);
        m.cen2.forEach((c) => (c.style.opacity = 0));
        return m;
      });
      this.capM = fx(g, 330, 520, "méiose : par paires", "t-titre s-ink", "middle");
      this.capT = fx(g, 795, 520, "mitose : un par un", "t-titre s-ink", "middle");
    },
    render() {
      const p = this.p, u = clamp(p.u, 0, 6), o = p.o, mit = clamp(p.mit, 0, 1), al = clamp(p.al, 0, 1);
      const s = lerp(1, 0.7, mit), X = (x) => 500 + (x - 500) * s - 170 * mit, Y = (y) => CY + (y - CY) * s, Ls = (l) => l * s;
      this.ti.set("Méiose d’une cellule à 2*n* = 4", SOUS(u));
      show(this.MG, mit); show(this.capM, mit); show(this.capT, mit);
      show(this.frz, clamp(p.frz, 0, 1));
      /* les cellules : une, deux (cytocinèse de la division I), quatre (division II) */
      const s1 = lisse(clamp((u - 2.65) / 0.35, 0, 1)), s2 = lisse(clamp((u - 5.35) / 0.65, 0, 1));
      const x1A = lerp(110, 96, s1), Rx1 = lerp(890, 512, s1), Rx2 = lerp(890, 904, s1);
      const R = [
        [x1A, lerp(lerp(890, 488, s1), 280, s2), 1],
        [lerp(488, 304, s2), 488, clamp(s2 * 4, 0, 1)],
        [Rx1, lerp(Rx2, 696, s2), clamp(s1 * 4, 0, 1)],
        [lerp(904, 720, s2), 904, clamp(s2 * 4, 0, 1)],
      ];
      const cc = R.map(([a, b, op], i) => {
        const r = this.cells[i];
        r.setAttribute("x", f1(X(a))); r.setAttribute("y", f1(Y(Y0))); r.setAttribute("width", f1(Math.max(0, Ls(b - a)))); r.setAttribute("height", f1(Ls(Y1 - Y0)));
        r.setAttribute("rx", f1(Ls(Math.min(90, Math.max(0, (b - a) / 2))))); r.style.opacity = op;
        return { x: (a + b) / 2, op };
      });
      /* le noyau */
      const nop = clamp(1 - (u - 0.1) / 0.5, 0, 1);
      this.nuc.setAttribute("cx", f1(X(500))); this.nuc.setAttribute("cy", f1(Y(CY))); this.nuc.setAttribute("r", f1(Ls(150))); show(this.nuc, nop);
      show(this.nucT, nop);
      /* les positions des chromosomes */
      const Q = {}; this.ch.forEach((ob) => { Q[ob.c.id] = pos(ob.c, u, o); });
      /* les tétrades : un cadre autour de chaque paire accolée */
      const wt = clamp(p.tet, 0, 1) * clamp((u - 0.6) / 0.3, 0, 1) * clamp((1.6 - u) / 0.3, 0, 1);
      [[Q.G1, Q.G2, LG], [Q.P1, Q.P2, LP]].forEach(([a, b, L], i) => {
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2, w = Math.abs(a.x - b.x) + 2 * (SPR + WCH / 2) + 22, h = 2 * L + 26, r = this.tetR[i];
        r.setAttribute("x", f1(X(cx) - Ls(w) / 2)); r.setAttribute("y", f1(Y(cy) - Ls(h) / 2)); r.setAttribute("width", f1(Ls(w))); r.setAttribute("height", f1(Ls(h))); r.style.opacity = wt;
        if (i === 0) { this.tetT.setAttribute("x", f1(X(cx))); this.tetT.setAttribute("y", f1(Y(cy) - Ls(h) / 2 - 9)); }
      });
      show(this.tetT, wt);
      /* les plaques : celle de la division I, puis une par cellule en division II */
      const opP1 = bump(u, 1.2, 1.5, 2.3, 2.6), opP2 = bump(u, 3.6, 3.9, 4.9, 5.2);
      [[PL, opP1], [PII[0] / 2 + PII[1] / 2, opP2], [PII[2] / 2 + PII[3] / 2, opP2]].forEach(([x, op], i) => { setL(this.pl[i], X(x), Y(172), X(x), Y(520)); this.pl[i].style.opacity = op; });
      this.plT.setAttribute("x", f1(X(PL))); this.plT.setAttribute("y", f1(Y(160))); show(this.plT, opP1 * clamp((2.3 - u) / 0.15, 0, 1));
      /* le fuseau : les pôles, et la fibre de chaque centromère ou chromatide vers son pôle */
      const opI = bump(u, 1.6, 1.95, 2.75, 3.0), opII = bump(u, 3.6, 3.9, 5.0, 5.3);
      const pI = [x1A + 30, Rx2 - 30];
      this.polI.forEach((c, i) => { c.setAttribute("cx", f1(X(pI[i]))); c.setAttribute("cy", f1(Y(CY))); c.style.opacity = opI; });
      this.polII.forEach((c, i) => { c.setAttribute("cx", f1(X(PII[i]))); c.setAttribute("cy", f1(Y(CY))); c.style.opacity = opII; });
      const sepF = clamp(u - 4, 0, 1), cenOp = clamp(1 - (u - 4) * 10, 0, 1), sepOp = clamp((u - 4) * 10, 0, 1), bul = BUL * clamp(1 - (u - 4) * 3, 0, 1);
      this.ch.forEach((ob) => {
        const q = Q[ob.c.id], L = ob.c.big ? LG : LP, xc = X(q.x), yc = Y(q.y), d = q.d;
        // les fibres : division I (une par chromosome, vers le pôle de son côté), division II (une par chromatide, vers l'un et l'autre pôle de sa cellule)
        if (u < 3.3) {
          setL(ob.fib[0], X(q.x < PL ? pI[0] : pI[1]), Y(CY), xc, yc); ob.fib[0].style.opacity = opI; ob.fib[1].style.opacity = 0;
        } else {
          const pr = q.x < PL ? [PII[0], PII[1]] : [PII[2], PII[3]];
          setL(ob.fib[0], X(pr[0]), Y(CY), X(q.x - d), yc); setL(ob.fib[1], X(pr[1]), Y(CY), X(q.x + d), yc);
          ob.fib[0].style.opacity = opII; ob.fib[1].style.opacity = opII;
        }
        // les chromatides : deux arcs joints par un seul centromère, qui ne se clive qu'après la métaphase II
        ob.arcs.forEach((a, i) => a.setAttribute("d", arcD(xc, yc, Ls(L), i ? d : -d, bul, 0)));
        ob.cen.setAttribute("cx", f1(xc)); ob.cen.setAttribute("cy", f1(yc)); ob.cen.style.opacity = cenOp;
        ob.cen2.forEach((c, i) => { c.setAttribute("cx", f1(X(q.x + (i ? d : -d)))); c.setAttribute("cy", f1(yc)); c.style.opacity = sepOp; });
        // l'allèle : au-dessus de la grande paire, sous la petite ; une lettre par chromatide quand elles sont séparées
        const ly = ob.c.big ? yc - Ls(L) - 10 : yc + Ls(L) + 30;
        ob.lab[0].setAttribute("x", f1(lerp(xc, X(q.x - d), sepOp))); ob.lab[1].setAttribute("x", f1(X(q.x + d)));
        ob.lab.forEach((t) => t.setAttribute("y", f1(ly)));
        ob.lab[0].style.opacity = al; ob.lab[1].style.opacity = al * sepOp;
      });
      /* le compteur sous chaque cellule */
      const L3 = lignesCompteur(phOf(u)), cn = clamp(p.cnt, 0, 1);
      this.cnt.forEach((t, j) => { setFx(t, L3[j]); t.style.opacity = cn * (1 - mit); });
      show(this.cntH, cn * (1 - mit) * cc[2].op);
      /* les lots d'allèles : deux cellules après la division I, quatre après la division II */
      const G = gametes(Math.round(o), 0, 1), gv = clamp(p.gam, 0, 1) * clamp((u - 2.85) / 0.15, 0, 1);
      this.gen.forEach((t, i) => { t.setAttribute("x", f1(X(cc[i].x))); setFx(t, G[i]); t.style.opacity = gv * cc[i].op * (i === 1 || i === 3 ? clamp((u - 5.6) / 0.3, 0, 1) : 1); });
      /* la comparaison des deux orientations, l'une sous l'autre */
      const cm = clamp(p.cmp, 0, 2), cur = Math.round(o);
      [0, 1].forEach((k) => {
        const t = this.cmpT[k];
        setFx(t, `orientation ${k + 1} : ${typesDe(k, 0, 1).join(" + ")}`);
        t.style.fontWeight = cur === k ? 700 : 400; t.style.opacity = clamp(cm - k, 0, 1);
      });
    },
  });
}
