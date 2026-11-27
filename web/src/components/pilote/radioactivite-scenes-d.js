/* eslint-disable */
// @ts-nocheck
/**
 * Scène de « La décroissance radioactive » : `transmutation`, le noyau et le diagramme (N, Z) montrés
 * ensemble (procédé de la maquette « Radioactivité » du rapport 11). Dans le noyau, un nucléon change de
 * nature et une particule part ; au même instant, le point de ce noyau saute d'une case en diagonale sur le
 * diagramme (N, Z).
 *
 * Une seule grandeur pilote tout : `u`, de 0 à 1.
 *   0 → 0,4   le nucléon change de nature (β⁻ : un neutron devient proton ; β⁺ : un proton devient neutron)
 *   0,15 → 0,75   la particule quitte le noyau
 *   0,45 → 1   le point saute sur (N, Z) ; le noyau fils est nommé
 * `cas` choisit le noyau : 0, le carbone 14 (β⁻, saut (N − 1 ; Z + 1)) ; 1, le fluor 18 (β⁺, saut (N + 1 ; Z − 1)).
 * Garde : à u = 0, la scène ne montre que le noyau père et son point ; le noyau fils, la particule et le
 * saut n'apparaissent qu'avec u (la réponse d'une question sur le fils va dans `reveal`). Au cas 1, le
 * nucléon qui va changer n'est pas encerclé avant la réponse (le texte ne dit pas lequel).
 *
 * Exactitude : A = N + Z ne change pas, la charge se conserve (β⁻ : le nucléon neutre devient chargé, la
 * particule est négative ; β⁺ : l'inverse) ; l'antineutrino n'est pas dessiné (il n'est pas dans la leçon).
 * Couleurs : des classes seulement ; le rouge n'est donné qu'à ce qui change (le nucléon, la particule, le point).
 */
export function scenesD(ctx, O) {
const { E, lerp, clamp, show, scene } = ctx;
const { fx, setFx, titre, noyau } = O;

const lisse = (t) => t * t * (3 - 2 * t);
/** les deux noyaux : père, fils (nom, symbole, A, Z), la fenêtre du diagramme, et le sens du changement */
const CAS = [
  { pere: ["carbone 14", "C", 14, 6], fils: ["azote 14", "N", 14, 7], bm: true, n0: 5, z0: 5, part: "β^{−}" },
  { pere: ["fluor 18", "F", 18, 9], fils: ["oxygène 18", "O", 18, 8], bm: false, n0: 7, z0: 7, part: "β^{+}" },
];
const CX = 255, CY = 340;                                    // le centre du noyau
const X0 = 600, Y0 = 560, W = 340, NB = 4;                   // le diagramme : le coin bas gauche, le côté, le nombre de cases par axe
const SC = W / NB;

scene("transmutation", {
  p: { u: 0, cas: 0 },
  build(g) {
    this.ti = titre(g, "", "");
    this.cs = CAS.map((c) => {
      const [, sp, A, Z] = c.pere, N = A - Z, [, sf, , Zf] = c.fils, Nf = A - Zf;
      const cg = E("g", {}, g);
      const X = (n) => X0 + (n - c.n0) * SC, Y = (z) => Y0 - (z - c.z0) * SC;
      /* ----- le noyau : tous ses nucléons, dans un cercle en pointillé ----- */
      const R = 28 * Math.sqrt(A);
      E("circle", { cx: CX, cy: CY, r: R + 40, class: "k-dim nofill", "stroke-width": 2, "stroke-dasharray": "7 7" }, cg);
      const pts = noyau(cg, CX, CY, R, Z, N, 24);
      // le nucléon qui change : de la nature voulue, le plus haut et le plus à droite (la particule part vers le haut)
      let jn = -1, best = -1e9;
      pts.forEach((q, i) => { if (q.p === !c.bm && (q.x - CX) - (q.y - CY) > best) { best = (q.x - CX) - (q.y - CY); jn = i; } });
      const q0 = pts[jn];
      // elle part vers le haut et la droite, sans monter sur le titre ni sur le diagramme
      const tx = Math.min(q0.x + 190 * 0.87, 500), ty = Math.max(q0.y - 190 * 0.5, 200);
      const ring = E("circle", { cx: q0.x.toFixed(1), cy: q0.y.toFixed(1), r: 36, class: "k-a nofill", "stroke-width": 3 }, cg);
      const trail = E("line", { class: "k-a", "stroke-width": 2.5, "stroke-dasharray": "3 7", "stroke-linecap": "round" }, cg);
      const part = E("circle", { r: 11, class: c.bm ? "s-a" : "k-a nofill", "stroke-width": 3 }, cg);
      const lp = fx(cg, tx, ty - 26, c.part, "t-cle s-a", "middle");
      const compte = fx(cg, CX, 540, `${Z} p + ${N} n`, "t-cle s-ink", "middle");
      // la légende : proton plein, neutron vide
      E("circle", { cx: 80, cy: 628, r: 12, class: "prot", "stroke-width": 1.6 }, cg); fx(cg, 102, 635, "proton", "t-lab s-ink");
      E("circle", { cx: 240, cy: 628, r: 12, class: "neut", "stroke-width": 1.6 }, cg); fx(cg, 262, 635, "neutron", "t-lab s-ink");
      /* ----- le diagramme (N, Z) : les axes, N = Z, les graduations ----- */
      E("line", { x1: X0, y1: Y0, x2: X0 + W + 14, y2: Y0, class: "k-ink", "stroke-width": 2 }, cg);
      E("line", { x1: X0, y1: Y0 - W - 14, x2: X0, y2: Y0, class: "k-ink", "stroke-width": 2 }, cg);
      const a = Math.max(c.n0, c.z0), b = Math.min(c.n0, c.z0) + NB;
      E("line", { x1: X(a), y1: Y(a), x2: X(b), y2: Y(b), class: "k-dim", "stroke-width": 2, "stroke-dasharray": "7 7" }, cg);
      fx(cg, X(b) - 6, Y(b - 0.7), "*N* = *Z*", "t-lab s-c", "end");
      for (let v = 1; v < NB; v++) {
        fx(cg, X(c.n0 + v), Y0 + 30, String(c.n0 + v), "t-lab s-c", "middle");
        fx(cg, X0 - 12, Y(c.z0 + v) + 6, String(c.z0 + v), "t-lab s-c", "end");
      }
      fx(cg, X(c.n0 + NB), Y0 + 30, "*N*", "t-cle s-ink", "middle");
      fx(cg, X0 - 12, Y(c.z0 + NB) + 6, "*Z*", "t-cle s-ink", "end");
      // le noyau père : un point vide ; le point mobile, rouge, laisse un trait derrière lui
      E("circle", { cx: X(N), cy: Y(Z), r: 8, class: "s-bg k-dim", "stroke-width": 2.5 }, cg);
      // les noms des deux points : du côté opposé au trait, pour ne pas le recouvrir
      if (c.bm) fx(cg, X(N) + 16, Y(Z) + 26, `^{${A}}${sp}`, "t-cle s-ink");
      else fx(cg, X(N) - 16, Y(Z) - 16, `^{${A}}${sp}`, "t-cle s-ink", "end");
      const jl = E("line", { class: "k-a", "stroke-width": 3.5, "stroke-linecap": "round" }, cg);
      const jd = E("circle", { r: 10, class: "s-a" }, cg);
      const lf = c.bm ? fx(cg, X(Nf) - 16, Y(Zf) - 16, `^{${A}}${sf}`, "t-cle s-a", "end") : fx(cg, X(Nf) + 16, Y(Zf) + 26, `^{${A}}${sf}`, "t-cle s-a");
      const lv = fx(cg, X((N + Nf) / 2) + 26, Y((Z + Zf) / 2) + 6, `*N* ${Nf > N ? "+" : "−"} 1, *Z* ${Zf > Z ? "+" : "−"} 1`, "t-lab s-ink");
      return { g: cg, c, pts, jn, q0, tx, ty, ring, trail, part, lp, compte, jl, jd, lf, lv, X, Y, N, Z, Nf, Zf };
    });
  },
  render() {
    const p = this.p, u = clamp(p.u, 0, 1), k = Math.round(clamp(p.cas, 0, 1));
    const trans = lisse(clamp(u / 0.4, 0, 1)), eject = lisse(clamp((u - 0.15) / 0.6, 0, 1)), jump = lisse(clamp((u - 0.45) / 0.55, 0, 1));
    this.cs.forEach((s, i) => {
      show(s.g, i === k ? 1 : 0);
      if (i !== k) return;
      const c = s.c, flip = trans > 0.5, A = c.pere[2];
      // le nucléon change de nature à mi-course de la transformation
      s.pts.forEach((q, j) => q.c.setAttribute("class", (j === s.jn ? (c.bm ? flip : !flip) : q.p) ? "prot" : "neut"));
      show(s.ring, (c.bm ? 1 : clamp(u * 10, 0, 1)) * (1 - clamp((trans - 0.5) * 4, 0, 1)));
      // la particule part du nucléon, droit vers l'extérieur
      const ex = lerp(s.q0.x, s.tx, eject), ey = lerp(s.q0.y, s.ty, eject);
      s.part.setAttribute("cx", ex.toFixed(1)); s.part.setAttribute("cy", ey.toFixed(1));
      s.trail.setAttribute("x1", s.q0.x.toFixed(1)); s.trail.setAttribute("y1", s.q0.y.toFixed(1)); s.trail.setAttribute("x2", ex.toFixed(1)); s.trail.setAttribute("y2", ey.toFixed(1));
      show(s.part, trans > 0.5 ? 1 : 0); show(s.trail, clamp(eject * 4, 0, 1) * (trans > 0.5 ? 1 : 0)); show(s.lp, clamp((eject - 0.8) * 5, 0, 1));
      setFx(s.compte, flip ? `${s.Zf} p + ${s.Nf} n` : `${s.Z} p + ${s.N} n`);
      // le point saute d'une case, en diagonale ; N + Z = A ne change pas
      const dn = lerp(s.N, s.Nf, jump), dz = lerp(s.Z, s.Zf, jump);
      s.jd.setAttribute("cx", s.X(dn).toFixed(1)); s.jd.setAttribute("cy", s.Y(dz).toFixed(1));
      s.jl.setAttribute("x1", s.X(s.N).toFixed(1)); s.jl.setAttribute("y1", s.Y(s.Z).toFixed(1)); s.jl.setAttribute("x2", s.X(dn).toFixed(1)); s.jl.setAttribute("y2", s.Y(dz).toFixed(1));
      show(s.jl, clamp(jump * 20, 0, 1)); show(s.jd, 1);
      show(s.lf, clamp((jump - 0.7) * 4, 0, 1)); show(s.lv, clamp((jump - 0.85) * 6, 0, 1));
      const nom = c.pere[0], fils = c.fils[0];
      if (jump > 0.75) this.ti.set(`Il est devenu un noyau d’${fils}`, `${s.Zf} protons et ${s.Nf} neutrons : un autre élément`);
      else if (u > 0) this.ti.set(`Le ${nom} se désintègre`, c.bm ? "un de ses neutrons se change en proton…" : "un de ses protons se change en neutron…");
      else this.ti.set(`Un noyau instable : le ${nom}`, `${s.Z} protons et ${s.N} neutrons${c.bm ? " ; l’un des neutrons va changer" : ""}`);
    });
  },
});
}
