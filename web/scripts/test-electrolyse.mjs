/**
 * test-electrolyse.mjs — le modèle du « banc d'électrolyse »
 * (web/src/lib/scene2d/electrolyse-modele.ts ; spec
 * content/pc/electrolyse/spec-scene-electrolyse.md §5.7, §12.2).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - la table A : Q = I·Δt aux 9 couples ;
 *  - les tables B et C : les deux masses, au milligramme ;
 *  - la table D : n(e⁻) = 2·m/M sur la masse AFFICHÉE, à quatre chiffres ;
 *  - la table E : F = Q/n(e⁻) sur les valeurs AFFICHÉES — 9,65·10⁴ à six
 *    charges, et 9,70·10⁴ à la septième (Q = 270 C) : l'écart DOIT se produire ;
 *  - les deux couples de même charge (540 C et 1 080 C) ;
 *  - l'invariance au câblage (les masses changent de signe, F ne bouge pas) ;
 *  - l'invariance aux trois tensions, STRUCTURELLE : aucune fonction de calcul
 *    ne prend la tension (on le vérifie sur leurs signatures).
 *
 *   node --test scripts/test-electrolyse.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/electrolyse-modele.ts"));

// Les tables du §5.7, recopiées de la SPEC (pas du modèle).
const TABLE_A = { 100: [180, 270, 540], 200: [360, 540, 1080], 400: [720, 1080, 2160] };
const TABLE_B = { 180: "0,061", 270: "0,091", 360: "0,122", 540: "0,183", 720: "0,244", 1080: "0,366", 2160: "0,732" };
const TABLE_C = { 180: "0,059", 270: "0,089", 360: "0,118", 540: "0,178", 720: "0,237", 1080: "0,355", 2160: "0,711" };
const TABLE_D = { 180: "1{,}865\\times10^{-3}", 270: "2{,}783\\times10^{-3}", 360: "3{,}731\\times10^{-3}", 540: "5{,}596\\times10^{-3}", 720: "7{,}462\\times10^{-3}", 1080: "1{,}119\\times10^{-2}", 2160: "2{,}239\\times10^{-2}" };
const TABLE_E = { 180: "9{,}65\\times10^{4}", 270: "9{,}70\\times10^{4}", 360: "9{,}65\\times10^{4}", 540: "9{,}65\\times10^{4}", 720: "9{,}65\\times10^{4}", 1080: "9{,}65\\times10^{4}", 2160: "9{,}65\\times10^{4}" };

const couples = () => M.INTENSITES.flatMap((i) => M.DUREES.map((d, j) => ({ i: +i, d: +d, j })));

test("table A — Q = I·Δt aux neuf couples", () => {
  for (const { i, d, j } of couples()) {
    const r = M.lire(i, d, "oppose");
    assert.ok(Math.abs(r.Q - TABLE_A[i][j]) < 1e-9, `${i} mA × ${d} s : ${r.Q}`);
  }
});

test("tables B et C — les deux masses au milligramme, signées", () => {
  for (const { i, d } of couples()) {
    const r = M.lire(i, d, "oppose");
    const Q = Math.round(r.Q);
    assert.equal(M.ecrireMasse(r.masseZinc), "+" + TABLE_B[Q], `zinc à ${Q} C`);
    assert.equal(M.ecrireMasse(r.masseCuivre), "−" + TABLE_C[Q], `cuivre à ${Q} C`);
  }
  // 0,366 g est le nombre de la leçon (lesson.md:177 : ≈ 0,37 g à 1 080 C)
  assert.equal(M.ecrireMasse(M.lire(200, 5400, "oppose").masseZinc), "+0,366");
});

test("table D — n(e⁻) = 2·m/M sur la masse AFFICHÉE, quatre chiffres", () => {
  for (const { i, d } of couples()) {
    const r = M.lire(i, d, "oppose");
    assert.equal(M.scientifique(r.electrons, 4), TABLE_D[Math.round(r.Q)], `${i} mA × ${d} s`);
  }
});

test("table E — F sur les valeurs AFFICHÉES : six à 9,65·10⁴, le septième à 9,70·10⁴", () => {
  const vus = new Set();
  for (const { i, d } of couples()) {
    const r = M.lire(i, d, "oppose");
    const Q = Math.round(r.Q);
    assert.equal(M.scientifique(r.faraday, 3), TABLE_E[Q], `${Q} C`);
    vus.add(M.scientifique(r.faraday, 3));
  }
  assert.deepEqual([...vus].sort(), ["9{,}65\\times10^{4}", "9{,}70\\times10^{4}"]);
});

test("les deux couples de même charge affichent les MÊMES chaînes", () => {
  const eq = (a, b) => {
    const x = M.lire(...a, "oppose"), y = M.lire(...b, "oppose");
    assert.equal(M.ecrireCharge(x.Q), M.ecrireCharge(y.Q));
    assert.equal(M.ecrireMasse(x.masseZinc), M.ecrireMasse(y.masseZinc));
  };
  eq([100, 5400], [200, 2700]);
  eq([200, 5400], [400, 2700]);
  assert.equal(M.ecrireCharge(M.lire(200, 5400, "oppose").Q), "1 080");
});

test("l'invariance au câblage : les masses changent de signe, F ne bouge pas d'un caractère", () => {
  for (const { i, d } of couples()) {
    const o = M.lire(i, d, "oppose"), a = M.lire(i, d, "accord");
    assert.equal(a.masseZinc, -o.masseZinc);
    assert.equal(a.masseCuivre, -o.masseCuivre);
    assert.equal(M.scientifique(a.faraday, 3), M.scientifique(o.faraday, 3));
    assert.equal(M.scientifique(a.electrons, 4), M.scientifique(o.electrons, 4));
    assert.equal(o.sens, "impose");
    assert.equal(a.sens, "spontane");
  }
});

test("la tension n'est l'argument d'AUCUNE fonction de calcul", () => {
  // lire(iMa, dureeS, cablage, p) — quatre paramètres, aucun n'est une tension
  assert.equal(M.lire.length, 3);
  for (const f of [M.charge, M.masseExacte, M.electrons, M.faradayMesure, M.sens]) assert.ok(f.length <= 2, f.name);
  assert.deepEqual([...M.TENSIONS], ["2.0", "6.0", "12.0"]);
});

test("la course : le facteur d'accélération est constant, la course finit à la valeur affichée", () => {
  assert.deepEqual(M.DUREES.map((d) => M.dureeEcran(+d)), [2, 3, 6]);
  const fin = M.lire(400, 5400, "oppose", 1), mi = M.lire(400, 5400, "oppose", 0.5);
  assert.equal(M.ecrireMasse(fin.masseZinc), "+0,732");
  assert.equal(M.ecrireMasse(mi.masseZinc), "+0,366");
  assert.equal(M.lire(400, 5400, "oppose", 0).masseZinc, 0);
  assert.equal(M.ecrireDuree(5400), "1 h 30");
  assert.equal(M.ecrireDuree(2700), "45 min");
  assert.equal(M.ecrireDuree(4020), "1 h 07");
});

test("la route fermée de S4 (§5.7 F) : Q/F et la balance diffèrent au quatrième chiffre", () => {
  const r = M.lire(400, 5400, "oppose");
  assert.equal(M.scientifique(M.chiffres(r.Q / M.FARADAY, 4), 4), "2{,}238\\times10^{-2}");
  assert.equal(M.scientifique(r.electrons, 4), "2{,}239\\times10^{-2}");
});
