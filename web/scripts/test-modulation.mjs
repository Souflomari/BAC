/**
 * test-modulation.mjs — le modèle du « banc de modulation »
 * (web/src/lib/scene2d/modulation-modele.ts ; spec
 * docs/pipeline/propositions/pc-ondes-em-modulation-scene-modulation.md §5, §14).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - les 9 couples (U0, Sm) de la table du §5.4 : U_max, U_min, A, m réglé,
 *    m lu — recopiés de la SPEC, pas du modèle ; le plancher de U_min à 0 est
 *    une BRANCHE (m = 1,50 ne donne pas −0,50) ;
 *  - les 4 crans de porteuse du §5.5 : Tp, comptage ENTIER (6 · 12 · 20 · 40),
 *    F/f entier (3 · 6 · 10 · 20) ;
 *  - les positions des 4 extrema d'enveloppe (1,25 · 3,75 · 6,25 · 8,75 div),
 *    et l'enveloppe INDÉPENDANTE de F — au bit près ;
 *  - les zéros du §5.6 (3,08 · 4,42 · 8,08 · 9,42 div — la spec écrit 8,06) et la bosse de 0,50 V ;
 *  - les 5 régimes du détecteur du §5.7 : τ, et la chute entre deux crêtes
 *    1 − e^{−Tp/τ} (91,8 · 46,5 · 22,1 · 11,8 · 4,9 %), à 10⁻¹² ;
 *  - la récurrence, rejouée ici depuis la spec : identique à 10⁻¹² quand m < 1 ;
 *  - u_C ≥ 0 et u_C ≥ u_S partout ; le plein-écran (3,50 div < 4,00).
 *
 *   node --test scripts/test-modulation.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/modulation-modele.ts"));

const proche = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} contre ${b}`);

// La table du §5.4, recopiée de la SPEC : [U0, Sm, A, Umax, Umin, m, m_lu].
const TABLE = [
  [2.0, 1.0, "1,00", "1,50", "0,50", "0,50", "0,50"],
  [2.0, 2.0, "1,00", "2,00", "0,00", "1,00", "1,00"],
  [2.0, 3.0, "1,00", "2,50", "0,00", "1,50", "1,00"],
  [3.0, 1.0, "1,50", "2,00", "1,00", "0,33", "0,33"],
  [3.0, 2.0, "1,50", "2,50", "0,50", "0,67", "0,67"],
  [3.0, 3.0, "1,50", "3,00", "0,00", "1,00", "1,00"],
  [4.0, 1.0, "2,00", "2,50", "1,50", "0,25", "0,25"],
  [4.0, 2.0, "2,00", "3,00", "1,00", "0,50", "0,50"],
  [4.0, 3.0, "2,00", "3,50", "0,50", "0,75", "0,75"],
];

test("les 9 couples de la table des extrema (§5.4), à l'affichage", () => {
  for (const [U0, Sm, A, max, min, m, mlu] of TABLE) {
    const e = M.extrema(U0, Sm);
    const ici = `U0 = ${U0}, Sm = ${Sm}`;
    assert.equal(M.nombre(M.amplitudeA(U0), 2), A, `${ici} : A`);
    assert.equal(M.nombre(e.max, 2), max, `${ici} : U_max`);
    assert.equal(M.nombre(e.min, 2), min, `${ici} : U_min`);
    assert.equal(M.nombre(M.tauxRegle(Sm, U0), 2), m, `${ici} : m réglé`);
    assert.equal(M.nombre(M.tauxLu(e.max, e.min), 2), mlu, `${ici} : m lu`);
    assert.ok(e.min >= 0, `${ici} : U_min ne descend jamais sous zéro`);
    // chaque extremum tombe EXACTEMENT sur un trait fin (0,25 V) — la raison des 4 sous-graduations
    for (const u of [e.max, e.min]) proche((u * M.SOUS_DIV) / M.V_PAR_DIV, Math.round((u * M.SOUS_DIV) / M.V_PAR_DIV), 1e-12, `${ici} : ${u} V sur un trait`);
    // A ≠ U0 aux trois composantes continues (le piège de notation, désamorcé)
    assert.notEqual(M.amplitudeA(U0), U0, `${ici} : A = U0`);
  }
});

test("le plancher de U_min est une branche : m = 1,50 ne donne pas −0,50", () => {
  assert.equal(M.extrema(2.0, 3.0).min, 0);
  assert.equal(M.extrema(3.0, 3.0).min, 0);
  proche(M.bosseSecondaire(2.0, 3.0), 0.5, 1e-12, "la bosse retournée A(m − 1)");
  assert.equal(M.bosseSecondaire(4.0, 2.0), 0);
});

test("le plein-écran : aucun réglage ne sort du cadre (3,50 div < 4,00)", () => {
  let pire = 0;
  for (const U0 of M.CONTINUES) for (const Sm of M.MODULANTES) pire = Math.max(pire, M.extrema(+U0, +Sm).max);
  proche(pire, 3.5, 1e-12, "le plus haut U_max");
  assert.ok(pire / M.V_PAR_DIV < M.DIV_Y / 2);
});

test("les 4 crans de porteuse (§5.5) : Tp, comptage entier, F/f entier", () => {
  const ATTENDU = { "1.2": ["0,833", 6, 3], "2.4": ["0,417", 12, 6], "4.0": ["0,250", 20, 10], "8.0": ["0,125", 40, 20] };
  for (const F of M.PORTEUSES) {
    const [Tp, n, r] = ATTENDU[F];
    assert.equal(M.troisCs(M.periodePorteuse(+F)), Tp, `F = ${F} : Tp`);
    assert.equal(M.oscillations(+F), n, `F = ${F} : comptage`);
    proche(+F * M.DUREE_MS, n, 1e-12, `F = ${F} : le comptage est un entier EXACT`);
    assert.equal(M.rapportFrequences(+F), r, `F = ${F} : F/f`);
  }
  assert.ok(!M.PORTEUSES.includes("2.0"), "2,0 kHz est la valeur en litige de 2017 N (§0.1)");
  proche(M.T_ENV_MS, 2.5, 1e-12, "T_env");
  proche(M.enDivisions(M.T_ENV_MS), 5, 1e-12, "T_env en divisions");
});

test("les 4 extrema d'enveloppe à 1,25 · 3,75 · 6,25 · 8,75 div, et l'enveloppe ne dépend pas de F", () => {
  const pos = [...M.maximaEnveloppe(), ...M.minimaEnveloppe()].map(M.enDivisions).sort((a, b) => a - b);
  [1.25, 3.75, 6.25, 8.75].forEach((d, i) => proche(pos[i], d, 1e-12, `extremum ${i}`));
  // aux maxima, E = U_max ; aux minima, E = U_min — aux 9 couples
  for (const [U0, Sm] of TABLE) {
    const e = M.extrema(U0, Sm);
    for (const t of M.maximaEnveloppe()) proche(M.enveloppe(t, U0, Sm), e.max, 1e-12, `E au maximum (${U0}, ${Sm})`);
    // au-delà de m = 1, l'instant du minimum porte la BOSSE retournée, A(m − 1) : U_min (lu) vaut 0 aux pincements
    const creux = Sm > U0 ? M.bosseSecondaire(U0, Sm) : e.min;
    for (const t of M.minimaEnveloppe()) proche(M.enveloppe(t, U0, Sm), creux, 1e-12, `E au minimum (${U0}, ${Sm})`);
  }
  // aux crêtes de la porteuse, |u_S| = E, quel que soit le cran
  for (const F of M.PORTEUSES) {
    const demi = M.periodePorteuse(+F) / 2;
    for (let k = 0; k * demi <= M.DUREE_MS; k++) proche(Math.abs(M.sortieMultiplieur(k * demi, +F, 4, 2)), M.enveloppe(k * demi, 4, 2), 1e-12, `F = ${F}, crête ${k}`);
  }
});

test("les zéros de l'enveloppe (§5.6) : 3,08 · 4,42 · 8,08 · 9,42 div ; contact unique à m = 1", () => {
  const z = M.zerosEnveloppe(2.0, 3.0).map(M.enDivisions);
  // La spec §5.6 écrit « 8,06 » : c'est 3,081 + 5,00 = 8,08 — coquille de la spec, relevée ici.
  assert.deepEqual(z.map((d) => M.nombre(d, 2)), ["3,08", "4,42", "8,08", "9,42"]);
  proche(z[0], 3.081, 1e-3, "premier zéro");
  proche(z[1], 4.419, 1e-3, "second zéro");
  proche(z[2] - z[0], 5, 1e-12, "périodicité");
  for (const d of z) proche(M.enveloppe(d * M.MS_PAR_DIV, 2.0, 3.0), 0, 1e-12, `E(${d}) = 0`);
  assert.deepEqual(M.zerosEnveloppe(3.0, 3.0).map(M.enDivisions), [3.75, 8.75]);
  assert.deepEqual(M.zerosEnveloppe(2.0, 2.0).map(M.enDivisions), [3.75, 8.75]);
  assert.deepEqual(M.zerosEnveloppe(4.0, 2.0), []);
});

test("les 5 régimes du détecteur (§5.7) : τ et la chute entre deux crêtes", () => {
  const ATTENDU = { "0.5": ["0,0500", "91,8"], "2.0": ["0,200", "46,5"], "5.0": ["0,500", "22,1"], "10": ["1,00", "11,8"], "25": ["2,50", "4,9"] };
  for (const R0 of M.DETECTEURS) {
    const tau = M.constanteTemps(+R0);
    const [t, chute] = ATTENDU[R0];
    assert.equal(M.troisCs(tau), t, `R0 = ${R0} : τ`);
    const c = (1 - Math.exp(-M.periodePorteuse(8) / tau)) * 100;
    assert.equal(M.nombre(c, 1), chute, `R0 = ${R0} : chute`);
  }
});

/** La récurrence de la SPEC (§5.2), rejouée ici : crêtes positives seules, E à l'instant pair. */
function recurrenceSpec(F, U0, Sm, R0) {
  const Tp = 1 / F, tau = R0 * 0.1, A = 0.5 * U0, m = Sm / U0;
  const E = (t) => A * Math.abs(1 + m * Math.sin(2 * Math.PI * 0.4 * t));
  const n0 = -Math.round(2.5 / Tp);
  let u = E(n0 * Tp);
  const out = [[n0 * Tp, u]];
  for (let n = n0 + 1; n * Tp <= 5 + 1e-9; n++) {
    u = Math.max(E(n * Tp), u * Math.exp(-Tp / tau));
    out.push([n * Tp, u]);
  }
  return out;
}

test("la récurrence du détecteur = celle de la spec, à 10⁻¹², aux 20 couples (F, R0) × 6 réglages m < 1", () => {
  for (const F of M.PORTEUSES)
    for (const R0 of M.DETECTEURS)
      for (const [U0, Sm] of TABLE.filter(([u, s]) => s < u)) {
        const spec = recurrenceSpec(+F, U0, Sm, +R0);
        const uC = M.detecteur(+F, U0, Sm, +R0);
        const { t, v } = M.crestes(+F, U0, Sm, +R0);
        for (const [tn, un] of spec) {
          const i = t.findIndex((x) => Math.abs(x - tn) < 1e-9);
          assert.ok(i >= 0, `instant ${tn} absent`);
          proche(v[i], un, 1e-12, `F = ${F}, R0 = ${R0}, (${U0}, ${Sm}), t = ${tn}`);
          if (tn >= 0) proche(uC(tn), un, 1e-12, `u_C(${tn})`);
        }
      }
});

test("u_C ≥ 0 et u_C ≥ u_S partout, aux 20 × 9 réglages ; le tracé remonte le flanc", () => {
  for (const F of M.PORTEUSES)
    for (const R0 of M.DETECTEURS)
      for (const [U0, Sm] of TABLE) {
        const uC = M.detecteur(+F, U0, Sm, +R0);
        for (let i = 0; i <= 2000; i++) {
          const t = (i / 2000) * M.DUREE_MS;
          const c = uC(t);
          assert.ok(c >= 0, `u_C(${t}) = ${c} < 0`);
          assert.ok(c >= M.sortieMultiplieur(t, +F, U0, Sm) - 1e-12, `u_C sous u_S à ${t}`);
        }
      }
});

test("sous la bosse retournée (m = 1,50), la crête positive est à l'instant IMPAIR : la porteuse est en opposition de phase", () => {
  const F = 8, demi = 1 / (2 * F);
  // le milieu de la bosse : 2πft = 3π/2 (sin = −1), soit t = 1,875 ms
  const k = Math.round(1.875 / demi);
  const pair = k % 2 === 0 ? k : k + 1;
  assert.ok(M.sortieMultiplieur(pair * demi, F, 2, 3) < 0, "à l'instant pair, u_S est négatif");
  assert.ok(M.sortieMultiplieur((pair + 1) * demi, F, 2, 3) > 0, "à l'instant impair, u_S est positif");
  // à 1,875 ms, cos(2πFt) = cos(30π) = +1 : u_S = A(1 − m) = −0,50 V — une crête de la bosse, NÉGATIVE
  proche(M.sortieMultiplieur(1.875, F, 2, 3), -0.5, 1e-12, "la bosse culmine à |A(1 − m)| = 0,50 V, retournée");
});
