/**
 * test-noyaux.mjs — le modèle de « la courbe et les noyaux »
 * (web/src/lib/scene2d/noyaux-modele.ts ; spec §5, §12 étape 2).
 *
 * Ce que ce test garde, et que la porte au navigateur ne peut pas voir :
 *  - la probabilité par pas est 1 − e^(−λΔt), et non λΔt : (1 − p)^32 = 0,5 à
 *    10⁻¹² près pour l'iode (32 pas = une demi-vie), (1 − p)^16 = 0,5 pour le
 *    second isotope. Un biais de 1 % sur p (le sabotage n°1 de la spec) décale
 *    la survie à une demi-vie de 0,5000 à 0,4962 : 0,24 écart-type sur 1 024
 *    noyaux, invisible à tout comptage raisonnable — d'où ce test, et la lecture
 *    de `data-p-pas` par la porte ;
 *  - la durée de moitié, CALCULÉE depuis la loi, vaut t½ aux 25 positions de
 *    départ (le fait de l'étape 2) ;
 *  - un tirage ne rallume jamais une case (le compte ne remonte pas).
 *
 *   node --test scripts/test-noyaux.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/noyaux-modele.ts"));

/** Un générateur à graine (LCG de Numerical Recipes) : le test ne dépend pas du hasard du jour. */
function lcg(graine) {
  let s = graine >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

test("une demi-vie en pas ENTIERS, et la probabilité par pas exacte", () => {
  assert.equal(M.T_DEMI["8"] / M.DT, 32);
  assert.equal(M.T_DEMI["4"] / M.DT, 16);
  assert.ok(Math.abs(Math.pow(1 - M.pPas("8"), 32) - 0.5) < 1e-12, `(1 − p)^32 = ${Math.pow(1 - M.pPas("8"), 32)}`);
  assert.ok(Math.abs(Math.pow(1 - M.pPas("4"), 16) - 0.5) < 1e-12);
  assert.ok(Math.abs(M.pPas("8") - 0.0214279) < 1e-6, `p = ${M.pPas("8")}`);
  assert.ok(Math.abs(M.pPas("4") - 0.0423967) < 1e-6, `p = ${M.pPas("4")}`);
});

test("la durée de moitié vaut t½ aux 25 positions de départ, pour les deux isotopes", () => {
  for (const iso of ["8", "4"]) {
    for (let t1 = M.DEPART_MIN; t1 <= M.DEPART_MAX; t1 += M.DEPART_PAS) {
      assert.equal(M.nombre(M.dureeDeMoitie(iso, t1), 1), iso === "8" ? "8,0" : "4,0", `isotope ${iso}, départ ${t1} j`);
    }
  }
});

test("la loi aux repères de la spec (§5.1)", () => {
  assert.equal(M.scientifique(M.noyaux("8", 0)), "4,0×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 4)), "2,8×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 8)), "2,0×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 10)), "1,7×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 16)), "1,0×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 24)), "5,0×10¹³");
  assert.equal(M.scientifique(M.activite("8", 0)), "4,0×10⁸");
  assert.equal(M.scientifique(M.activite("4", 0)), "8,0×10⁸");
  assert.equal(M.troisCs(M.lambdaJ("8")), "0,0866");
  assert.equal(M.troisCs(M.tau("8")), "11,5");
  assert.equal(M.troisCs(M.tau("4")), "5,77");
  assert.equal(M.scientifique(M.lambdaS("8"), 3), "1,00×10⁻⁶");
});

test("au curseur, trois chiffres significatifs — ceux que citent les retours — et 21 positions toutes distinctes", () => {
  // les retours et les suites de la scène citent ces nombres : « à dix jours, il
  // reste 1,68×10¹⁴ », « à cinq jours : 2,59×10¹⁴ », « à 4,0 jours, 2,83×10¹⁴ »
  assert.equal(M.scientifique(M.noyaux("8", 10), 3), "1,68×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 5), 3), "2,59×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 4), 3), "2,83×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 8), 3), "2,00×10¹⁴");
  assert.equal(M.scientifique(M.noyaux("8", 16), 3), "1,00×10¹⁴");
  assert.equal(M.scientifique(M.activite("8", 0), 3), "4,01×10⁸");
  assert.equal(M.scientifique(M.lambdaS("4"), 3), "2,01×10⁻⁶");
  // à deux chiffres, 9,0 et 9,5 jours afficheraient tous deux 1,8×10¹⁴ : le
  // curseur paraîtrait bloqué (le défaut de l'orbite, « douze positions à 24,0 h »)
  assert.equal(M.scientifique(M.noyaux("8", 9)), M.scientifique(M.noyaux("8", 9.5)));
  for (const iso of ["8", "4"]) {
    const vus = new Set();
    for (let t = M.INSTANT_MIN; t <= M.INSTANT_MAX; t += M.INSTANT_PAS) vus.add(M.scientifique(M.noyaux(iso, t), 3));
    assert.equal(vus.size, 21, `isotope ${iso} : ${vus.size} valeurs distinctes sur 21`);
  }
});

test("un tirage : autour de la moitié à une demi-vie, et aucune case ne se rallume", () => {
  const aleatoire = lcg(20260924);
  for (const n of M.POPULATIONS) {
    const tirage = M.tirer("8", n, aleatoire);
    let avant = n;
    for (let t = 0; t <= M.COURSE_J; t += M.DT) {
      const r = M.restants(tirage, t);
      assert.ok(r <= avant, `population ${n} : le compte remonte à t = ${t} (${avant} → ${r})`);
      avant = r;
    }
    const demi = M.restants(tirage, 8);
    // la bande large de la porte (±5σ) : le tirage est juste, pas exact
    const s = Math.sqrt(n) / 2;
    assert.ok(Math.abs(demi - n / 2) <= 5 * s, `population ${n} : ${demi} restants à 8 j`);
  }
});
