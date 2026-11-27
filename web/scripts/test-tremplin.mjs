/**
 * test-tremplin.mjs — le modèle du « tremplin circulaire »
 * (web/src/lib/scene2d/tremplin-modele.ts ; proposition
 * content/pc/lois-de-newton/spec-scene-tremplin.md §5.7, §14).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - la table A (a_N = v²/R, 12 couples) à trois chiffres significatifs ;
 *  - la table B : a_N × R = v², sur les valeurs AFFICHÉES (81,0 · 144 · 324) ;
 *  - la table C : ‖a‖ aux gaz ET au freinage — identiques AU BIT PRÈS (une seule
 *    fonction, a_T au carré) ;
 *  - la table D : a·v = a_T·v, et la nature lue sur son signe ;
 *  - la table E : v et a_N le long de l'arc (20,3 m/s en C, gaz, R = 20 m) ;
 *  - le zéro de a_N sur la droite, STRUCTUREL (une branche, pas un 1/R) ;
 *  - la géométrie : la piste descend à −10° jusqu'à B, l'arc tourne de 28°, la
 *    distance au centre reste R, et la course s'arrête en B.
 *
 *   node --test scripts/test-tremplin.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/tremplin-modele.ts"));

// Les tables du §5.7, recopiées de la SPEC (pas du modèle).
const TABLE_A = { 9: ["8,10", "5,40", "4,05", "2,70"], 12: ["14,4", "9,60", "7,20", "4,80"], 18: ["32,4", "21,6", "16,2", "10,8"] };
const TABLE_C = { 9: ["9,27", "7,03", "6,05", "5,25"], 12: ["15,1", "10,6", "8,49", "6,58"], 18: ["32,7", "22,1", "16,8", "11,7"] };
const CARRE = { 9: "81,0", 12: "144", 18: "324" };

test("table A — a_N = v²/R à l'entrée, trois chiffres", () => {
  for (const v of M.VITESSES)
    M.RAYONS.forEach((R, j) => {
      const r = M.lire(+v, +R, "tenue", M.abscisse("entree", +R));
      assert.equal(M.troisCs(r.aN), TABLE_A[v][j], `v = ${v}, R = ${R}`);
    });
});

test("table B — a_N × R = v² sur les valeurs AFFICHÉES", () => {
  for (const v of M.VITESSES)
    for (const R of M.RAYONS) {
      const aff = parseFloat(M.troisCs(M.lire(+v, +R, "tenue", 0).aN).replace(",", "."));
      assert.equal(M.troisCs(aff * +R), CARRE[v], `v = ${v}, R = ${R} : ${aff} × ${R}`);
    }
});

test("table C — ‖a‖ identique aux gaz et au freinage, au bit près", () => {
  for (const v of M.VITESSES)
    M.RAYONS.forEach((R, j) => {
      const g = M.lire(+v, +R, "gaz", 0), f = M.lire(+v, +R, "freinage", 0);
      assert.equal(g.a, f.a, `v = ${v}, R = ${R}`);
      assert.equal(M.troisCs(g.a), TABLE_C[v][j], `v = ${v}, R = ${R} : ${g.a}`);
    });
});

test("table D — a·v = a_T·v, et la nature sur son signe", () => {
  const attendu = { 9: ["+40,5", "0", "−40,5"], 12: ["+54,0", "0", "−54,0"], 18: ["+81,0", "0", "−81,0"] };
  for (const v of M.VITESSES)
    M.REGIMES.forEach((reg, j) => {
      const r = M.lire(+v, 20, reg, 0);
      assert.equal(M.ecrireAV(r.av), attendu[v][j], `v = ${v}, ${reg}`);
      assert.equal(r.nature, ["accéléré", "uniforme", "retardé"][j]);
    });
  // uniforme, et pourtant ‖a‖ ≠ 0 dans l'arc
  const u = M.lire(18, 20, "tenue", 1);
  assert.equal(u.nature, "uniforme");
  assert.ok(u.a > 16);
});

test("table E — le long de l'arc (R = 20 m, v_B = 18,0)", () => {
  const E = {
    approche: { tenue: ["18,0", "0,00"], gaz: ["16,4", "0,00"], freinage: ["19,4", "0,00"] },
    entree: { tenue: ["18,0", "16,2"], gaz: ["18,0", "16,2"], freinage: ["18,0", "16,2"] },
    milieu: { tenue: ["18,0", "16,2"], gaz: ["19,2", "18,4"], freinage: ["16,7", "14,0"] },
    sortie: { tenue: ["18,0", "16,2"], gaz: ["20,3", "20,6"], freinage: ["15,4", "11,8"] },
  };
  for (const rep of M.REPERES)
    for (const reg of M.REGIMES) {
      const r = M.lire(18, 20, reg, M.abscisse(rep, 20));
      assert.deepEqual([M.troisCs(r.v), M.troisCs(r.aN)], E[rep][reg], `${rep}, ${reg}`);
    }
});

test("le zéro de a_N sur la droite est une BRANCHE, aux 36 réglages", () => {
  for (const v of M.VITESSES)
    for (const R of M.RAYONS)
      for (const reg of M.REGIMES) {
        const r = M.lire(+v, +R, reg, M.abscisse("approche", +R));
        assert.equal(r.aN, 0);
        assert.equal(M.troisCs(r.aN), "0,00");
        assert.equal(r.droite, true);
      }
});

test("la géométrie : −10° avant B, +18° en C, rotation 28°, distance au centre = R", () => {
  for (const R of M.RAYONS) {
    const r = +R, s = M.longueurArc(r);
    assert.ok(Math.abs(M.angleTangente(-3, r) * 180 / Math.PI + 10) < 1e-12);
    assert.ok(Math.abs(M.angleTangente(s, r) * 180 / Math.PI - 18) < 1e-12);
    const [cx, cy] = M.centre(r);
    for (let k = 0; k <= 20; k++) {
      const [x, y] = M.position((k / 20) * s, r);
      assert.ok(Math.abs(Math.hypot(x - cx, y - cy) - r) < 1e-9, `R = ${R}, k = ${k}`);
    }
    const [bx, by] = M.position(0, r);
    assert.ok(Math.abs(bx) < 1e-12 && Math.abs(by) < 1e-12);
    // le dénivelé et la portée du tremplin (spec §5.1)
    const [xc, yc] = M.position(s, r);
    assert.ok(Math.abs(yc - r * 0.033751) < 1e-5 && Math.abs(xc - r * 0.482665) < 1e-5);
  }
});

test("la course : part de −9,0 m, s'arrête en B ; (9 m/s, gaz) part du repos", () => {
  for (const v of M.VITESSES)
    for (const reg of M.REGIMES) {
      const aT = M.A_T[reg], T = M.dureeCourse(+v, aT);
      assert.ok(Math.abs(M.abscisseCourse(0, +v, aT) + 9) < 1e-12);
      assert.ok(Math.abs(M.abscisseCourse(T, +v, aT)) < 1e-9, `v = ${v}, ${reg}`);
      assert.ok(Math.abs(M.abscisseCourse(10 * T, +v, aT)) < 1e-9);
    }
  assert.equal(M.vitesseDepart(9, 4.5), 0);
  assert.equal(M.troisCs(M.vitesseDepart(12, -4.5)), "15,0");
  assert.equal(M.troisCs(M.dureeCourse(18, 0) * M.RALENTI), "3,00");
});
