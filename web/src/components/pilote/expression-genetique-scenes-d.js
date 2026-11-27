/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « Du gène à la protéine » : `cadre`, le décalage du cadre de lecture (procédé de la maquette
 * « Expression génétique » du rapport 11). L'ARNm se lit 5′ → 3′, trois bases par trois, dans des crochets
 * qui NE BOUGENT PAS. Quand une base disparaît (ou s'ajoute), les bases qui suivent glissent d'un cran :
 * chaque crochet reçoit une base de son voisin, et tous les acides aminés en aval changent.
 *
 * Une seule grandeur pilote tout : `u`, de 0 à 3.
 *   0 → 1  la base supprimée se détache du ruban (insertion : la base ajoutée arrive au-dessus)
 *   1 → 2  les bases suivantes glissent d'un cran, les crochets restent
 *   2 → 3  les acides aminés sont relus dans les crochets : ceux qui changent passent en accent
 * Un paramètre de choix : `m`, 0 = la délétion du A de GAG (étape `decalage`), 1 = l'insertion d'un G au
 * début du triplet 3 (étape `v-insertion`). À u = 0, la scène montre l'ARNm normal et la base visée, jamais
 * le résultat : c'est le `reveal` de l'étape qui fait avancer u.
 * Exactitude : une substitution ne décalerait rien ; ici, séquence, codons et acides aminés sortent de
 * `analyser()` et de la table du code (expression-genetique-code.js), jamais d'une valeur tapée.
 */
import { CDS, AA3, L_MURE, FS6, INS3, analyser, aaDe, toARN } from "./expression-genetique-code";

export function scenesD(ctx) {
const { E, lerp, clamp, ty, show, scene } = ctx;
const txt = (parent, x, y, str, cls, anchor) => E("text", { x, y, class: cls, "text-anchor": anchor || "start", text: ty(str) }, parent);
const lisse = (t) => t * t * (3 - 2 * t);

const X0 = 96, PIT = 52, BW = 44, BH = 50;     // le ruban : 15 places dans les crochets, une 16ᵉ à droite
const YR = 226, LIFT = 74;                     // la hauteur du ruban, la hauteur dont la base mobile s'écarte
const NC = 5, NB = 15;                         // 5 codons dans la fenêtre, 15 bases
const MODES = [FS6, INS3].map((m) => {
  const A = analyser(m), W = 3 * (A.j - 1), dl = A.k - W;
  const norm = toARN(CDS.slice(W, W + NB + 1));
  const aaN = [], aaM = [];
  for (let c = 0; c < NC; c++) { aaN.push(aaDe(CDS.slice(W + 3 * c, W + 3 * c + 3))); aaM.push(aaDe(A.seq.slice(W + 3 * c, W + 3 * c + 3))); }
  const j0 = A.j - 1;                          // numéro du premier codon montré (comme dans l'atelier)
  const aval = [];                             // les codons de la fenêtre à partir du premier qui change
  for (let c = 0; c < NC; c++) if (j0 + c >= A.first) aval.push(c);
  const nd = aval.filter((c) => aaN[c] !== aaM[c]).length;
  const stop = A.tr.stop !== -1 ? A.tr.stop : null;
  return { m, A, W, dl, norm, aaN, aaM, j0, nd, na: aval.length,
    del: A.t === "d", ins: A.t === "i", base: A.t === "d" ? toARN(CDS[A.k]) : toARN(A.b),
    bilan: `${A.t === "d" ? "Délétion" : "Insertion"} : ${nd} acides aminés sur ${aval.length} changent, à partir du n° ${A.first}`,
    stopT: A.len != null ? `la chaîne s’arrête au codon ${stop} : ${A.len} acides aminés au lieu de ${L_MURE}` : "sans codon stop avant la fin du gène" };
});

scene("cadre", {
  p: { u: 0, m: 0 },
  build(g) {
    this.T = txt(g, 500, 64, "", "t-titre s-ink", "middle");
    this.S = txt(g, 500, 92, "", "t-sous", "middle");
    txt(g, X0 - 40, YR + 33, "5′", "t-sous", "middle");
    txt(g, X0 + 16 * PIT - 8 + 10, YR + 33, "3′", "t-sous", "middle");
    txt(g, X0 + 15 * PIT + BW, 190, "ARNm, lu de 5′ vers 3′", "t-sous", "end");
    // les bases : 16, un rectangle et une lettre chacune (les crochets, eux, ne bougent pas)
    this.bs = [...Array(NB + 1)].map(() => {
      const r = E("rect", { width: BW, height: BH, rx: 3, class: "cell" }, g);
      return { r, t: E("text", { class: "mono t-big s-ink", "text-anchor": "middle" }, g) };
    });
    // la base ajoutée (insertion) : créée après les bases, elle passe par-dessus
    this.nw = { r: E("rect", { width: BW, height: BH, rx: 3, class: "cell hl-a" }, g), t: E("text", { class: "mono t-big s-a", "text-anchor": "middle" }, g) };
    this.etq = txt(g, 0, 0, "", "t-lab2 s-a", "middle");
    // les crochets de lecture, leurs numéros, les acides aminés
    this.cr = []; this.num = []; this.bx = []; this.an = []; this.am = [];
    for (let c = 0; c < NC; c++) {
      const x0 = X0 + 3 * c * PIT - 3, x1 = X0 + (3 * c + 2) * PIT + BW + 3, mid = (x0 + x1) / 2;
      E("polyline", { points: `${x0},${YR + BH + 14} ${x0},${YR + BH + 30} ${x1},${YR + BH + 30} ${x1},${YR + BH + 14}`, class: "k-ink nofill", "stroke-width": 3 }, g);
      this.num.push(txt(g, mid, YR + BH + 62, "", "t-sous", "middle"));
      this.bx.push(E("rect", { x: mid - 66, y: YR + BH + 82, width: 132, height: 58, rx: 3, class: "cell" }, g));
      this.an.push(txt(g, mid, YR + BH + 120, "", "t-cle s-ink", "middle"));
      this.am.push(txt(g, mid, YR + BH + 120, "", "t-cle s-ink", "middle"));
    }
    this.b1 = txt(g, 500, 520, "", "t-lab2 s-ink", "middle");
    this.b2 = txt(g, 500, 554, "", "t-sous", "middle");
  },
  render() {
    const p = this.p, M = MODES[Math.round(p.m) ? 1 : 0], u = clamp(p.u, 0, 3);
    const pD = lisse(clamp(u, 0, 1)), sl = lisse(clamp(u - 1, 0, 1)), p3 = lisse(clamp(u - 2, 0, 1));
    const X = (s) => X0 + s * PIT, f = (v) => v.toFixed(1);
    const place = (b, s, y, o, base, cls, fill) => {
      b.r.setAttribute("x", f(X(s))); b.r.setAttribute("y", f(y)); b.t.setAttribute("x", f(X(s) + BW / 2)); b.t.setAttribute("y", f(y + 36));
      b.t.textContent = base; if (cls) b.r.setAttribute("class", cls); if (fill) b.t.setAttribute("class", fill);
      show(b.r, o); show(b.t, o);
    };
    this.bs.forEach((b, i) => {
      const base = M.norm[i] || "";
      if (i < M.dl) { place(b, i, YR, 1, base, "cell", "mono t-big s-ink"); return; }
      if (M.del) {
        if (i === M.dl) place(b, i, YR - LIFT * pD, (1 - 0.85 * pD) * (1 - sl), base, "cell hl-a", "mono t-big s-a");
        else place(b, i - sl, YR, i === NB ? sl : 1, base, "cell", "mono t-big s-ink");
      } else place(b, i + sl, YR, i === NB - 1 ? 1 - sl : i === NB ? 0 : 1, base, "cell", "mono t-big s-ink");
    });
    // la base ajoutée : elle arrive au-dessus du ruban, puis descend dans la place libérée
    const nw = this.nw;
    if (M.ins) place(nw, M.dl, YR - LIFT * (1 - sl), 0.55 + 0.45 * pD, M.base, "cell hl-a", "mono t-big s-a"); else { show(nw.r, 0); show(nw.t, 0); }
    // l'étiquette de la base touchée
    const ex = X(M.dl) + BW / 2, ey = YR - LIFT - 14;
    this.etq.setAttribute("x", f(ex)); this.etq.setAttribute("y", f(ey));
    this.etq.textContent = ty(M.del ? "base supprimée" : "base ajoutée"); show(this.etq, M.del ? pD * (1 - sl) : (1 - sl) * 1);
    // les crochets : les numéros, et les acides aminés relus
    for (let c = 0; c < NC; c++) {
      const ch = M.aaN[c] !== M.aaM[c], on = ch && p3 > 0.5;
      this.num[c].textContent = ty("n°" + (M.j0 + c));
      this.bx[c].setAttribute("class", on ? "cell hl-a" : "cell");
      const lab = (a) => a === "*" ? "Stop" : AA3[a];
      this.an[c].textContent = ty(lab(M.aaN[c])); this.am[c].textContent = ty(lab(M.aaM[c]));
      this.an[c].setAttribute("class", "t-cle s-ink"); this.am[c].setAttribute("class", "t-cle " + (ch ? "s-a" : "s-ink"));
      show(this.an[c], ch ? clamp(1 - 2 * p3, 0, 1) : 1); show(this.am[c], ch ? clamp(2 * p3 - 1, 0, 1) : 0);
    }
    this.b1.textContent = ty(M.bilan); this.b2.textContent = ty(M.stopT); show(this.b1, clamp((u - 2.6) * 5, 0, 1)); show(this.b2, clamp((u - 2.6) * 5, 0, 1));
    if (u < 0.05) { this.T.textContent = ty("Trois bases par trois, dans des crochets fixes"); this.S.textContent = ty(M.del ? "le A du codon n°" + (M.A.j) + " va être supprimé" : "un G va être ajouté au début du codon n°" + M.A.j); }
    else if (u < 1) { this.T.textContent = ty(M.del ? "Une base disparaît du ruban" : "Une base arrive sur le ruban"); this.S.textContent = ty("les crochets, eux, ne bougent pas"); }
    else if (u < 2) { this.T.textContent = ty("Les bases glissent d’un cran"); this.S.textContent = ty("chaque crochet reçoit une base de son voisin"); }
    else { this.T.textContent = ty("Les acides aminés sont relus dans les mêmes crochets"); this.S.textContent = ty("en accent, ceux qui ne sont plus les mêmes"); }
  },
});
}
