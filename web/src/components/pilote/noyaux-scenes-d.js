/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « Noyaux, masse et énergie » : `assemblage`, la balance des nucléons séparés et du noyau
 * (procédé de la maquette « Noyaux » du rapport 11). Les mêmes 2 protons et 2 neutrons sont pesés deux
 * fois : séparés sur le plateau de gauche, puis réunis en noyau d'hélium 4 sur celui de droite. Le noyau
 * pèse moins : la balance penche du côté des nucléons séparés.
 *
 * Une seule grandeur pilote tout : `u`, de 0 à 2.
 *   0 → 1  les nucléons du plateau de droite glissent les uns vers les autres et se lient en noyau
 *   1 → 2  la balance penche, du côté des nucléons séparés (le plus lourd)
 * Deux gardes cachent ce que la question demande :
 *   dm   1 écrit la définition Δm = m(nucléons séparés) − m(noyau) ; à 0, elle n'est pas dite
 *   val  1 écrit les deux masses sous les plateaux et la valeur de Δm ; à 0, aucun nombre (la saisie de
 *        l'élève, à `calc-dm`, les fait apparaître ; une fois la saisie réussie, ils restent au retour)
 * Exactitude : la masse du noyau est INFÉRIEURE à celle des nucléons séparés ; l'inclinaison est exagérée
 * (Δm ≈ 0,75 % de la masse) et la scène le dit dans son sous-titre. Les masses viennent de noyaux-outils.js.
 * Couleurs : des classes seulement ; le rouge n'est donné qu'à Δm, la valeur qui agit.
 */
import { fg, MHE, M_SEP_HE, DM_HE } from "./noyaux-outils";

export function scenesD(ctx, O) {
const { E, clamp, show, scene, S } = ctx;
const { fx, setFx, titre } = O;

/* ---------- la géométrie : tout est calculé ici ---------- */
const PX = 500, PY = 275;                         // le pivot du fléau
const L = 320, AMAX = (8 * Math.PI) / 180;        // demi-longueur du fléau, inclinaison maximale (exagérée)
const STR = 200, PW = 140;                        // longueur des fils, demi-largeur d'un plateau
const R = 30;                                     // le rayon d'un nucléon
const NY = -32;                                   // la hauteur du centre d'un nucléon posé sur un plateau
const ROW = [-99, -33, 33, 99];                   // séparés : alignés sur le plateau
const CLU = [[-27, -86], [-27, -32], [27, -86], [27, -32]];   // liés : serrés en deux fois deux
const KIND = ["p", "n", "n", "p"];                // proton, neutron, neutron, proton
const lerp = (a, b, t) => a + (b - a) * t;
const lisse = (t) => t * t * (3 - 2 * t);
const setL = (l, x1, y1, x2, y2) => { l.setAttribute("x1", x1.toFixed(1)); l.setAttribute("y1", y1.toFixed(1)); l.setAttribute("x2", x2.toFixed(1)); l.setAttribute("y2", y2.toFixed(1)); };
const setC = (c, x, y) => { c.setAttribute("cx", x.toFixed(1)); c.setAttribute("cy", y.toFixed(1)); };
const setT = (t, x, y) => { t.setAttribute("x", x.toFixed(1)); t.setAttribute("y", y.toFixed(1)); };
const line = (parent, cls, w) => E("line", { class: cls, "stroke-width": w, "stroke-linecap": "round" }, parent);

scene("assemblage", {
  p: { u: 0, dm: 0, val: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    // le pied de la balance, puis le fléau et le pivot
    E("path", { d: `M${PX - 52} 640 L${PX + 52} 640 L${PX} ${PY} Z`, class: "cell" }, g);
    this.arm = line(g, "k-ink", 7);
    E("circle", { cx: PX, cy: PY, r: 9, class: "s-ink" }, g);
    // les deux plateaux : des fils, un plateau, des nucléons, puis le nom, le plus lourd ou plus léger, la masse
    this.side = [0, 1].map((i) => {
      const s = { s1: line(g, "k-dim", 2.5), s2: line(g, "k-dim", 2.5), pl: line(g, "k-ink", 6) };
      s.ring = E("circle", { r: 68, class: "k-dim nofill", "stroke-width": 2.5, "stroke-dasharray": "7 7" }, g);
      s.n = KIND.map((k) => {
        const c = E("circle", { r: R, class: k === "p" ? "prot" : "neut", "stroke-width": 2.5 }, g);
        const t = fx(g, 0, 0, k, k === "p" ? "nx-a s-bg" : "nx-a s-ink", "middle");
        return { c, t };
      });
      s.lab = fx(g, 0, 0, "2 p + 2 n séparés", "nx-n s-ink", "middle");
      s.tag = fx(g, 0, 0, i === 0 ? "plus lourd" : "plus léger", "nx-a s-c", "middle");
      s.val = fx(g, 0, 0, `${fg(i === 0 ? M_SEP_HE : MHE, 5)} u`, "nx-v s-ink", "middle");
      return s;
    });
    // la définition et la valeur de Δm, en haut, entre les deux plateaux
    this.f1 = fx(g, PX, 170, "Δ*m* = *m*(nucléons séparés) − *m*(noyau)", "nx-v s-ink", "middle");
    this.f2 = fx(g, PX, 208, `= ${fg(DM_HE, 5)} u`, "nx-n s-a", "middle");
  },
  render() {
    const p = this.p, u = clamp(p.u, 0, 2), bind = lisse(clamp(u, 0, 1)), tilt = lisse(clamp(u - 1, 0, 1));
    const val = Math.max(clamp(p.val, 0, 1), p.dm > 0.5 && S.dmok ? 1 : 0), dm = clamp(p.dm, 0, 1);
    const a = AMAX * tilt;
    // le côté des nucléons séparés (le plus lourd) descend ; celui du noyau monte
    const ends = [[PX - L * Math.cos(a), PY + L * Math.sin(a)], [PX + L * Math.cos(a), PY - L * Math.sin(a)]];
    setL(this.arm, ends[0][0], ends[0][1], ends[1][0], ends[1][1]);
    this.side.forEach((s, i) => {
      const [ex, ey] = ends[i], py = ey + STR, k = i === 0 ? 0 : bind;
      setL(s.s1, ex, ey, ex - PW, py); setL(s.s2, ex, ey, ex + PW, py); setL(s.pl, ex - PW, py, ex + PW, py);
      s.n.forEach((n, j) => {
        const x = ex + lerp(ROW[j], CLU[j][0], k), y = py + lerp(NY, CLU[j][1], k);
        setC(n.c, x, y); setT(n.t, x, y + 9);
      });
      setC(s.ring, ex, py - 59); show(s.ring, i === 1 ? clamp((bind - 0.6) * 2.5, 0, 1) : 0);
      setT(s.lab, ex, py + 56); setT(s.tag, ex, py + 94); setT(s.val, ex, py + 132);
      show(s.tag, clamp(tilt * 2 - 1, 0, 1)); show(s.val, val);
    });
    setFx(this.side[1].lab, bind > 0.5 ? "noyau ^{4}He" : "2 p + 2 n séparés");
    show(this.f1, dm); show(this.f2, dm * val);
    if (u < 0.05) this.ti.set("Les mêmes 4 nucléons, pesés deux fois", "2 protons et 2 neutrons de chaque côté");
    else if (tilt < 0.5) this.ti.set("À droite, les nucléons se lient", "ils forment un noyau d’hélium 4");
    else this.ti.set("Le noyau pèse moins que ses nucléons séparés", "inclinaison exagérée, pour se voir");
  },
});
}
