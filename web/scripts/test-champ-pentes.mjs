/**
 * test-champ-pentes.mjs — le modèle EXACT de « ce que l'équation dit en chaque point »
 * (web/src/lib/scene2d/champ-pentes-modele.ts ; spec
 * docs/pipeline/propositions/maths-equations-differentielles-scene-pentes.md §5.3, §11.1, §14.2).
 *
 * Chaque nombre refait par une SECONDE voie (flottants, depuis les crans recopiés de la spec —
 * rien du modèle) sur les 60 états (3 a × 4 b × 5 points), et les tables A, B, C, C′ de la spec
 * en CONTRÔLE PONCTUEL, jamais en source :
 *  - la pente a·y₀ + b aux 60 états, dans ½ℤ (N1, N5) ;
 *  - le palier −b/a aux 12 équations, dans ℤ, et dans [−4 ; 4] (table A, N2, N5) ;
 *  - la pente = a × écart au palier aux 60 états (N4) ;
 *  - la ligne du cran dégénéré : à a = −1 le palier égale b aux quatre crans, aux deux autres
 *    seulement à b = 0 (N10 — la réponse du pari de S6) ;
 *  - le point fixe : pente 0 en (0 ; 2) à (−1 ; 2) et (−½ ; 1) (N8) ;
 *  - la courbe : passe par son point, tend vers le palier à a < 0, fuit à a > 0 ; les trois courbes
 *    de S5 aux bords du cadre (table C) et leurs séparations minimales (table C′) ;
 *  - le plancher de S4 à l'état posé : e^{−2} u au bord droit (§5.1.1) ;
 *  - l'écriture : aucun zéro de queue, aucun « ≈ », entiers et \dfrac seulement (N6).
 *
 *   node --test scripts/test-champ-pentes.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/champ-pentes-modele.ts"));

// ── Seconde voie : les crans de la SPEC, en flottants ──
const A_F = { "-1": -1, "-0.5": -0.5, "0.5": 0.5 };
const B_F = { "-2": -2, "0": 0, "1": 1, "2": 2 };
const P_F = { origine: [0, 3], decale: [2, 3], haut: [0, 5], bas: [0, -3], sur: [0, 2] };
const v = (x) => x.n / x.d;
const ETATS = Object.keys(A_F).flatMap((a) => Object.keys(B_F).flatMap((b) => Object.keys(P_F).map((p) => ({ a, b, p }))));

test("60 états, et la grille est celle de la spec", () => {
  assert.equal(ETATS.length, 60);
  assert.deepEqual([...M.COEFS], Object.keys(A_F));
  // (pas Object.keys(B_F) : JavaScript range d'abord les clés entières, « -2 » passe en dernier)
  assert.deepEqual([...M.TERMES], ["-2", "0", "1", "2"]);
  assert.deepEqual([...M.POINTS], Object.keys(P_F));
  for (const p of M.POINTS) assert.deepEqual([...M.POINT_XY[p]], P_F[p]);
  assert.deepEqual([...M.FENETRE.x], [-8, 4]);
  assert.deepEqual([...M.FENETRE.y], [-6, 6]);
});

test("N1, N5 — la pente a·y₀ + b aux 60 états, dans ½ℤ, et elle ne dépend pas de x₀", () => {
  for (const { a, b, p } of ETATS) {
    const [, y0] = P_F[p];
    const m = M.pente(a, b, y0);
    assert.ok(Math.abs(v(m) - (A_F[a] * y0 + B_F[b])) < 1e-9, `${a},${b},${p}`);
    assert.ok(m.d === 1 || m.d === 2, `pente hors de ½ℤ : ${m.n}/${m.d}`);
  }
  // origine (0 ; 3) et decale (2 ; 3) : même hauteur, même pente — aux 12 équations
  for (const a of M.COEFS) for (const b of M.TERMES) assert.ok(M.egal(M.pente(a, b, 3), M.pente(a, b, 3)));
});

test("table B de la spec, en contrôle ponctuel", () => {
  const B = [
    ["-1", "0", 3, -3], ["-1", "0", 5, -5], ["-1", "0", -3, 3], ["-1", "0", 2, -2],
    ["-1", "2", 3, -1], ["-1", "2", 5, -3], ["-1", "2", -3, 5], ["-1", "2", 2, 0],
    ["-0.5", "2", 3, 0.5], ["-0.5", "2", 5, -0.5], ["-0.5", "2", -3, 3.5], ["-0.5", "2", 2, 1],
    ["0.5", "2", 3, 3.5], ["0.5", "2", 5, 4.5], ["0.5", "2", -3, 0.5], ["0.5", "2", 2, 3],
  ];
  for (const [a, b, y0, m] of B) assert.equal(v(M.pente(a, b, y0)), m, `${a},${b},${y0}`);
});

test("N2, N5 — le palier aux 12 équations : table A, entier, dans [−4 ; 4]", () => {
  const A = { "-1": [-2, 0, 1, 2], "-0.5": [-4, 0, 2, 4], "0.5": [4, 0, -2, -4] };
  for (const a of M.COEFS)
    M.TERMES.forEach((b, i) => {
      const k = M.palier(a, b);
      assert.equal(k.d, 1, `palier hors de ℤ à ${a},${b}`);
      assert.equal(v(k), A[a][i], `${a},${b}`);
      assert.equal(v(k), -B_F[b] / A_F[a] || 0);
      assert.equal(A_F[a] * v(k) + B_F[b], 0, "0 = a·k + b");
      assert.ok(Math.abs(v(k)) <= 4, "palier à ≥ 2 unités du bord");
    });
});

test("N4 — la pente vaut a × l'écart au palier, aux 60 états", () => {
  for (const { a, b, p } of ETATS) {
    const [, y0] = P_F[p];
    const e = M.ecartAuPalier(a, b, y0);
    assert.ok(e.d === 1 || e.d === 2);
    assert.ok(M.egal(M.fois(M.COEF_Q[a], e), M.pente(a, b, y0)), `${a},${b},${p}`);
  }
  // S4, P = (0 ; 5) : à a = −½, écarts 9, 5, 3, 1 et pentes −4,5, −2,5, −1,5, −0,5 ; à a = ½, 1, 5, 7, 9
  assert.deepEqual(M.TERMES.map((b) => v(M.ecartAuPalier("-0.5", b, 5))), [9, 5, 3, 1]);
  assert.deepEqual(M.TERMES.map((b) => v(M.pente("-0.5", b, 5))), [-4.5, -2.5, -1.5, -0.5]);
  assert.deepEqual(M.TERMES.map((b) => v(M.ecartAuPalier("0.5", b, 5))), [1, 5, 7, 9]);
  // les huit équations atteignables à S4 donnent cinq écarts distincts {1 ; 3 ; 5 ; 7 ; 9}
  const vus = new Set(["-0.5", "0.5"].flatMap((a) => M.TERMES.map((b) => v(M.ecartAuPalier(a, b, 5)))));
  assert.deepEqual([...vus].sort((x, y) => x - y), [1, 3, 5, 7, 9]);
});

test("N10 — le cran dégénéré : palier = b pour tout b à a = −1, et seulement à b = 0 ailleurs", () => {
  for (const b of M.TERMES) assert.equal(v(M.palier("-1", b)), B_F[b]);
  for (const a of ["-0.5", "0.5"])
    for (const b of M.TERMES) assert.equal(v(M.palier(a, b)) === B_F[b], b === "0", `${a},${b}`);
});

test("N8 — le point fixe : pente 0 en (0 ; 2) à (−1 ; 2) et (−½ ; 1), et la courbe y est constante", () => {
  for (const [a, b] of [["-1", "2"], ["-0.5", "1"]]) {
    assert.equal(v(M.pente(a, b, 2)), 0);
    const f = M.courbe(a, b, 0, 2);
    for (const x of [-8, -3, 0, 2, 4]) assert.ok(Math.abs(f(x) - 2) < 1e-12);
  }
});

test("N7 — la courbe passe par son point, tend vers le palier à a < 0, le fuit à a > 0", () => {
  for (const { a, b, p } of ETATS) {
    const [x0, y0] = P_F[p];
    const f = M.courbe(a, b, x0, y0);
    const k = -B_F[b] / A_F[a];
    assert.ok(Math.abs(f(x0) - y0) < 1e-12);
    // seconde voie : l'écart est multiplié par e^{a(x − x₀)}
    for (const x of [-8, -1, 0, 1.5, 4]) assert.ok(Math.abs(f(x) - (k + (y0 - k) * Math.exp(A_F[a] * (x - x0)))) < 1e-9);
    if (y0 !== k) {
      const e1 = Math.abs(f(x0 + 1) - k), e2 = Math.abs(f(x0 + 2) - k);
      if (A_F[a] < 0) assert.ok(e2 < e1, "a < 0 : l'écart rétrécit");
      else assert.ok(e2 > e1, "a > 0 : l'écart grandit");
      // jamais nul, jamais de l'autre côté
      for (const x of [-8, -4, 0, 2, 4]) assert.ok(Math.sign(f(x) - k) === Math.sign(y0 - k));
    }
  }
});

test("table C et C′ — les trois courbes de S5 (a = −½, b = 2, palier 4)", () => {
  const f = (y0) => M.courbe("-0.5", "2", 0, y0);
  const e2 = Math.exp(-2);
  assert.ok(Math.abs(f(5)(4) - (4 + e2)) < 1e-12 && Math.abs(f(5)(4) - 4.135) < 1e-3);
  assert.ok(Math.abs(f(2)(4) - 3.729) < 1e-3);
  assert.ok(Math.abs(f(-3)(4) - 3.053) < 1e-3);
  // où elles quittent le cadre par la gauche
  assert.ok(Math.abs(f(5)(-2 * Math.log(2)) - 6) < 1e-9);
  assert.ok(Math.abs(f(2)(-2 * Math.log(5)) + 6) < 1e-9);
  assert.ok(Math.abs(f(-3)(-2 * Math.log(10 / 7)) + 6) < 1e-9);
  // les séparations, minimales au bord droit : 3e⁻², 5e⁻², 8e⁻²
  assert.ok(Math.abs(f(5)(4) - f(2)(4) - 3 * e2) < 1e-12);
  assert.ok(Math.abs(f(2)(4) - f(-3)(4) - 5 * e2) < 1e-12);
  // en px : la plus serrée ≥ 12 px à 29,83 px/u (390) — le seuil de la porte (6 px) est sous son plancher
  assert.ok(3 * e2 * (358 / 12) > 12 && 3 * e2 * (358 / 12) > 6);
});

test("§5.1.1 — le plancher de S4 à l'état posé : e⁻² u au bord droit, ≥ 3 px aux deux largeurs", () => {
  const f = M.courbe("-0.5", "2", 0, 5);
  const e = f(4) - 4;
  assert.ok(Math.abs(e - Math.exp(-2)) < 1e-12);
  assert.ok(e * (560 / 12) > 6 && e * (358 / 12) > 4 && e * (358 / 12) > 3);
});

test("N6 — l'écriture est exacte : entiers et \\dfrac, sans zéro de queue ni « ≈ »", () => {
  for (const { a, b, p } of ETATS) {
    const [, y0] = P_F[p];
    for (const x of [M.pente(a, b, y0), M.palier(a, b), M.ecartAuPalier(a, b, y0)]) {
      const t = M.texQ(x);
      assert.match(t, /^-?(\d+|\\dfrac\{\d+\}\{2\})$/, t);
      assert.doesNotMatch(t, /[.,]|≈|approx/);
    }
  }
  assert.equal(M.texQ(M.q(-7, 2)), "-\\dfrac{7}{2}");
  assert.equal(M.clairQ(M.q(-7, 2)), "−7/2");
  assert.equal(M.texEquation("-1", "0"), "y' = -y");
  assert.equal(M.texEquation("-0.5", "2"), "y' = -0{,}5\\,y + 2");
  assert.equal(M.texEquation("0.5", "-2"), "y' = 0{,}5\\,y - 2");
});
