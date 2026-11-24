/* eslint-disable */
// @ts-nocheck
/**
 * Scènes de « Les suites numériques » (séance 1), troisième partie : les trois pièges du bilan
 * (`quiz`) et ce que l'élève a compris (`end`). Aucune couleur écrite en dur : les classes de
 * pilote.css seulement.
 */
export function scenesC(ctx, O, PIEGES) {
const { E, clamp, show, scene } = ctx;
const { fx, setFx } = O;

/* ---------- trois pièges des copies ---------- */
scene("quiz", {
  p: { qi: 0, rv: 0 },
  build(g) {
    this.tag = fx(g, 500, 210, "", "t-sous", "middle");
    this.big = fx(g, 500, 330, "", "t-big2 s-ink", "middle");
    this.r1 = fx(g, 500, 430, "", "t-lab2 s-ink", "middle");
    this.r2 = fx(g, 500, 474, "", "t-lab2 s-ink", "middle");
  },
  render() {
    const q = PIEGES[Math.round(this.p.qi)];
    setFx(this.tag, q.tag); setFx(this.big, q.big); setFx(this.r1, q.r1); setFx(this.r2, q.r2);
    show(this.r1, this.p.rv); show(this.r2, clamp(this.p.rv * 2 - 1, 0, 1));
  },
});

/* ---------- ce que tu sais maintenant ---------- */
scene("end", {
  p: { n: 0 },
  build(g) {
    fx(g, 90, 96, "Ce que tu as compris", "t-titre s-ink");
    // cinq blocs : le numéro en accent, une phrase courte en gras, la suite en gris, de l'air entre les blocs
    const I = [["La machine se dessine.", "L’escalier entre la courbe de *f* et la droite *y* = *x*."],
      ["La récurrence a deux pièces.", "L’initialisation, puis l’hérédité avec l’hypothèse nommée."],
      ["Le sens se lit sur *f*(*x*) − *x*.", "Sur l’intervalle où vivent les *u*_{*n*}, pas sur le sens de *f*."],
      ["Monotone et bornée : convergente.", "Le critère est admis ; un majorant n’est pas la limite."],
      ["ℓ = *f*(ℓ) vient après la convergence.", "*f* est continue ; un point fixe seul ne prouve rien."]];
    this.items = I.map((l, i) => { const gg = E("g", {}, g), y = 176 + i * 108; E("text", { x: 90, y: y + 8, class: "t-cle s-a", text: String(i + 1) }, gg); fx(gg, 140, y, l[0], "t-lab2 s-ink"); fx(gg, 140, y + 38, l[1], "t-lab s-dim"); return gg; });
  },
  render() { this.items.forEach((g, i) => { const o = clamp(this.p.n - i, 0, 1); g.style.opacity = o; g.setAttribute("transform", `translate(${((1 - o) * -16).toFixed(1)} 0)`); }); },
});
}
