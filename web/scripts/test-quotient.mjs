/**
 * test-quotient.mjs — le modèle EXACT de « l'échelle des quotients »
 * (web/src/lib/scene2d/quotient-modele.ts ; spec
 * docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md §5, §7.6 A, §11.1).
 *
 * Ce que ce test garde, avant tout navigateur — chaque nombre refait par une SECONDE voie
 * (flottants et logarithmes, depuis les valeurs recopiées de la spec, rien du modèle) :
 *  - les 75 Q_r,i et les 75 verdicts, et les partitions : bain A 25 directs, bain B
 *    9 / 1 / 15, bain C 25 directs (§5.3 A–C) — la partition du bain B n'existe qu'à K = 2,5
 *    exactement (§13.3) : le test la refait aussi à 2,2 et 2,45 pour le montrer ;
 *  - l'état d'équilibre UNIQUE, (B, 2,5×10⁻², 1,0×10⁻²), égal à K au caractère près ;
 *  - l'exposant structurel du bain C : un facteur 10 sur [Ag⁺] déplace Q_r de DEUX décades ;
 *  - les quatre valeurs du pari de S4, deux à deux distinctes, et « exposant omis » à deux
 *    décades EXACTES à gauche de la juste (§5.3 D, porte N13) ;
 *  - le comptage du pari de S2 par modèle : 0 / 25 / 10 (§5.3 E) ;
 *  - les écarts entiers nommés : 39 à S1, 34 au mélange extrême de S2, 12 à S4 ;
 *  - l'ATTEIGNABILITÉ (§7.6 A) : 5 / 25 / 2 / 15 / 75 états après révélation, rien d'ouvert
 *    pendant les paris de S3, S4, S5, le cran C atteignable seulement après S4, le bain B
 *    après S3, et l'état d'équilibre hors d'atteinte avant S5 ;
 *  - chaque état dans l'axe [10⁻⁴ ; 10⁴²], chaque bande entière dans l'axe ;
 *  - chaque Q_r,i écrit EXACTEMENT à deux chiffres significatifs, jamais un arrondi.
 *
 *   node --test scripts/test-quotient.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/quotient-modele.ts"));

// ── Seconde voie : les valeurs de la SPEC, en flottants ──
const CRANS_F = [1.0e-3, 1.0e-2, 2.5e-2, 1.0e-1, 5.0e-1];
const K_F = { A: 1.8e37, B: 2.5, C: 4.0e15 };
const N_F = { A: 1, B: 1, C: 2 };
const qF = (b, p, o) => CRANS_F[p - 1] / CRANS_F[o - 1] ** N_F[b];
const etat = (bain, p, o) => ({ bain, produit: M.CRANS[p - 1], oxydant: M.CRANS[o - 1] });
const valeur = (tex) => Number(tex.replace(/\{,\}/g, ".").replace(/\\times10\^\{(-?\d+)\}/, "e$1"));
const proche = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(Math.abs(a), Math.abs(b));

test("les 75 Q_r,i : l'exact du modèle vaut le flottant de la spec, et s'écrit à deux chiffres", () => {
  let n = 0;
  for (const b of ["A", "B", "C"]) for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) {
    const s = etat(b, p, o);
    const tex = M.texQri(s);
    assert.ok(proche(valeur(tex), qF(b, p, o)), `${b} p=${p} o=${o} : écrit ${tex}, attendu ${qF(b, p, o)}`);
    assert.ok(proche(10 ** M.log10Q(M.qri(s)), qF(b, p, o)));
    n++;
  }
  assert.equal(n, 75);
});

test("les verdicts : A 25 directs, B 9 / 1 / 15, C 25 directs", () => {
  const compte = (b) => {
    const c = { direct: 0, inverse: 0, equilibre: 0 };
    for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) c[M.verdict(etat(b, p, o))]++;
    return c;
  };
  assert.deepEqual(compte("A"), { direct: 25, inverse: 0, equilibre: 0 });
  assert.deepEqual(compte("B"), { direct: 15, inverse: 9, equilibre: 1 });
  assert.deepEqual(compte("C"), { direct: 25, inverse: 0, equilibre: 0 });
  // seconde voie, en flottants (le verdict d'équilibre à 10⁻¹² relatif)
  for (const b of ["A", "B", "C"]) for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) {
    const q = qF(b, p, o), k = K_F[b];
    const v = Math.abs(q - k) <= 1e-12 * k ? "equilibre" : q < k ? "direct" : "inverse";
    assert.equal(M.verdict(etat(b, p, o)), v, `${b} p=${p} o=${o}`);
  }
});

test("l'équilibre est UNIQUE, en (B, 2,5×10⁻², 1,0×10⁻²), et il tient à K = 2,5 exactement (§13.3)", () => {
  const eq = [];
  for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) if (M.verdict(etat("B", p, o)) === "equilibre") eq.push([p, o]);
  assert.deepEqual(eq, [[3, 2]]);
  assert.equal(M.texQri(etat("B", 3, 2)), "2{,}5");
  // à 2,2 et 2,45 (les tables), la partition devient 10 / 0 / 15 : S5 n'existe plus
  for (const k of [2.2, 2.45]) {
    let inv = 0, equ = 0;
    for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) { const q = qF("B", p, o); if (Math.abs(q - k) < 1e-12) equ++; else if (q > k) inv++; }
    assert.deepEqual([inv, equ], [10, 0], `K = ${k}`);
  }
});

test("l'exposant du bain C : un facteur 10 sur [Ag⁺] déplace Q_r de DEUX décades", () => {
  const a = M.qri(etat("C", 4, 2)), b = M.qri(etat("C", 4, 1));
  const d = M.decadesEntre(a, b);
  assert.ok(Math.abs(d.decades - 2) < 1e-9 && d.sens === "droite");
  // et un rang vers le HAUT (×2,5) n'en fait que 0,796 : « un rang » n'est pas « un facteur dix »
  const c = M.decadesEntre(a, M.qri(etat("C", 4, 3)));
  assert.ok(Math.abs(c.decades - 2 * Math.log10(2.5)) < 1e-9 && c.sens === "gauche");
});

test("le pari de S4 : quatre valeurs distinctes, et « exposant omis » à DEUX décades à gauche", () => {
  const s = M.PLAN[3].pose;
  assert.deepEqual([s.bain, s.produit, s.oxydant], ["C", "1.0e-1", "1.0e-2"]);
  const v = M.pariS4(s);
  const tex = Object.fromEntries(Object.entries(v).map(([k, q]) => [k, M.texDeuxChiffres(q)]));
  assert.deepEqual(tex, { juste: "1{,}0\\times10^{3}", omis: "10", facteur: "5{,}0", inverse: "1{,}0\\times10^{-3}" });
  assert.equal(new Set(Object.values(tex)).size, 4);
  const d = M.decadesEntre(v.juste, v.omis);
  assert.ok(Math.abs(d.decades - 2) < 1e-9 && d.sens === "gauche", `juste → omis : ${d.decades} ${d.sens}`);
  assert.ok(Math.abs(M.decadesEntre(v.juste, v.facteur).decades - (3 - Math.log10(5))) < 1e-9);
  assert.ok(Math.abs(M.decadesEntre(v.juste, v.inverse).decades - 6) < 1e-9);
});

test("le pari de S2 : 0 sens inverse (juste), 25 (critère inversé), 10 (seuil à 1)", () => {
  assert.deepEqual(M.comptageS2(), { juste: 0, critereInverse: 25, seuilUn: 10 });
});

test("les écarts entiers nommés : 39 à S1, 34 au mélange extrême de S2, 12 à S4", () => {
  assert.equal(M.ecart(M.PLAN[0].pose).entier, 39);
  assert.equal(M.ecart(etat("A", 5, 1)).entier, 34);
  assert.equal(M.ecart(M.PLAN[3].pose).entier, 12);
  // seconde voie
  assert.equal(Math.floor(Math.log10(K_F.A) - Math.log10(qF("A", 1, 4))), 39);
  assert.equal(Math.floor(Math.log10(K_F.A) - Math.log10(qF("A", 5, 1))), 34);
  assert.equal(Math.floor(Math.log10(K_F.C) - Math.log10(qF("C", 4, 2))), 12);
});

test("l'atteignabilité, étape par étape (§7.6 A) — et le verrou de S5", () => {
  const cle = (s) => `${s.bain}|${s.produit}|${s.oxydant}`;
  const pendant = M.PLAN.map((e) => M.atteignables(e.pose, e.pendant).length);
  const apres = M.PLAN.map((e) => M.atteignables(e.pose, e.apres).length);
  assert.deepEqual(pendant, [1, 1, 1, 1, 1]); // aucun contrôle avant le pari, à AUCUNE étape (ADR 0041 §6)
  assert.deepEqual(apres, [5, 25, 2, 15, 75]);
  // rien d'ouvert pendant AUCUN pari
  for (const k of [0, 1, 2, 3, 4]) assert.deepEqual(M.PLAN[k].pendant, { oxydant: false, produit: false, bain: null });
  // tout ce qui est atteignable AVANT la révélation de S5 (paris et révélations de S1–S4, pari de S5)
  const avantS5 = new Set();
  M.PLAN.forEach((e, k) => {
    for (const s of M.atteignables(e.pose, e.pendant)) avantS5.add(cle(s));
    if (k < 4) for (const s of M.atteignables(e.pose, e.apres)) avantS5.add(cle(s));
  });
  const etats = [...avantS5].map((c) => { const [bain, produit, oxydant] = c.split("|"); return { bain, produit, oxydant }; });
  // le cran C : pas avant la révélation de S4 (le pari de S4 le POSE, sans le rendre atteignable ailleurs)
  const avantS4 = new Set();
  M.PLAN.slice(0, 3).forEach((e) => { for (const s of [...M.atteignables(e.pose, e.pendant), ...M.atteignables(e.pose, e.apres)]) avantS4.add(s.bain); });
  assert.ok(!avantS4.has("C"));
  // le bain B : pas avant S3
  const avantS3 = new Set();
  M.PLAN.slice(0, 2).forEach((e) => { for (const s of [...M.atteignables(e.pose, e.pendant), ...M.atteignables(e.pose, e.apres)]) avantS3.add(s.bain); });
  assert.ok(!avantS3.has("B"));
  // l'équilibre : seul le POSÉ du pari de S5 y est, et aucun autre état avant S5 ne l'atteint
  const equilibres = etats.filter((s) => M.verdict(s) === "equilibre").map(cle);
  assert.deepEqual(equilibres, ["B|2.5e-2|1.0e-2"]);
  const avantPariS5 = etats.filter((s) => cle(s) !== cle(M.PLAN[4].pose));
  assert.ok(avantPariS5.every((s) => M.verdict(s) !== "equilibre"));
  // après la révélation de S4 : le bain B avec produit figé à 1,0×10⁻¹ donne 100 / 10 / 4,0 / 1,0 / 0,20
  const bS4 = M.atteignables(M.PLAN[3].pose, M.PLAN[3].apres).filter((s) => s.bain === "B").map((s) => M.texQri(s));
  assert.deepEqual(bS4, ["100", "10", "4{,}0", "1{,}0", "0{,}20"]);
});

test("l'axe et les bandes : chaque état dans [10⁻⁴ ; 10⁴²], chaque bande entière dans l'axe", () => {
  for (const b of ["A", "B", "C"]) {
    const bd = M.bande(b);
    assert.ok(bd.min >= M.AXE.min && bd.max <= M.AXE.max, `bande ${b} [${bd.min} ; ${bd.max}]`);
    for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) {
      const l = M.log10Q(M.qri(etat(b, p, o)));
      assert.ok(l > M.AXE.min && l < M.AXE.max);
    }
  }
  // les 25 du bain B tiennent dans leur bande ; aucun de A ni de C n'est dans la sienne
  for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) {
    assert.ok(M.dansLaBande(etat("B", p, o)));
    assert.ok(!M.dansLaBande(etat("A", p, o)) && !M.dansLaBande(etat("C", p, o)));
  }
  // le mélange le plus proche de K : 34,56 décades au bain A, 9,90 au bain C (§5.5 B)
  assert.ok(Math.abs(M.ecart(etat("A", 5, 1)).decades - 34.556) < 1e-3);
  assert.ok(Math.abs(M.ecart(etat("C", 5, 1)).decades - 9.903) < 1e-3);
});

test("les écritures : K avec « = », les crans avec leur unité, jamais un point décimal", () => {
  assert.deepEqual(["A", "B", "C"].map((b) => M.COUPLES[b].kTex), ["K = 1{,}8\\times10^{37}", "K = 2{,}5", "K = 4{,}0\\times10^{15}"]);
  // deux mains écrivent K : la valeur qui juge (K) et le texte qu'on lit (kTex). Elles disent le MÊME nombre.
  for (const b of ["A", "B", "C"]) {
    const k = M.COUPLES[b].K;
    assert.equal(M.texDeuxChiffres({ num: k.m, den: 1n, E: k.e }), M.COUPLES[b].kTex.replace(/^K = /, ""), `bain ${b}`);
    assert.ok(proche(valeur(M.COUPLES[b].kTex.replace(/^K = /, "")), K_F[b]));
  }
  assert.deepEqual(M.CRANS.map((c) => M.texCran(c)), ["1{,}0\\times10^{-3}", "1{,}0\\times10^{-2}", "2{,}5\\times10^{-2}", "1{,}0\\times10^{-1}", "5{,}0\\times10^{-1}"]);
  for (const b of ["A", "B", "C"]) for (let p = 1; p <= 5; p++) for (let o = 1; o <= 5; o++) assert.ok(!/\d\.\d/.test(M.texQri(etat(b, p, o))));
});
