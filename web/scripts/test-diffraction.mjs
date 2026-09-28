/**
 * test-diffraction.mjs — le modèle du « banc de diffraction »
 * (web/src/lib/scene2d/diffraction-modele.ts ; spec
 * content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md §5.2, §14).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - les 28 largeurs de la table du §5.2 (7 fentes × 4 lasers, D = 2,00 m), à
 *    TROIS chiffres significatifs — la précision qui rend vrai à l'écran
 *    l'invariant a × L = 0,240 (à deux chiffres, 0,709 s'écrirait 0,71 et le
 *    produit tomberait à 0,213) ;
 *  - l'invariant a × L à 10⁻¹² (à 600 nm, D = 2,00 m) ;
 *  - les 17 positions de l'écran, toutes distinctes, L avançant de 0,200 cm
 *    exactement d'un cran à l'autre (une graduation fine du graphe) ;
 *  - la pente 2,00×10⁻² et λ = 600 nm ; d = 80,0 µm ;
 *  - l'identité fente / fil : le cheveu de 80 µm et la fente de 0,080 mm
 *    donnent la MÊME largeur, au bit près (une seule fonction — N9) ;
 *  - les zéros du profil de rendu à k·L/2.
 *
 *   node --test scripts/test-diffraction.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/diffraction-modele.ts"));

// La table du §5.2, recopiée de la SPEC (pas du modèle) : L en cm, à D = 2,00 m.
const TABLE = {
  "0.060": ["3,00", "3,55", "4,00", "4,33"],
  "0.080": ["2,25", "2,66", "3,00", "3,25"],
  "0.100": ["1,80", "2,13", "2,40", "2,60"],
  "0.150": ["1,20", "1,42", "1,60", "1,73"],
  "0.200": ["0,900", "1,06", "1,20", "1,30"],
  "0.300": ["0,600", "0,709", "0,800", "0,867"],
  "1.000": ["0,180", "0,213", "0,240", "0,260"],
};

test("les 28 largeurs de la table, à trois chiffres significatifs", () => {
  for (const a of M.FENTES)
    M.LASERS.forEach((l, j) => {
      const L = M.largeurTache(l, M.dimension("fente", a), 2.0);
      assert.equal(M.troisCs(L), TABLE[a][j], `a = ${a} mm, λ = ${l} nm : ${L}`);
    });
});

test("a × L = 0,240 aux sept crans, à 10⁻¹² et À L'AFFICHAGE", () => {
  for (const a of M.FENTES) {
    const L = M.largeurTache("600", M.dimension("fente", a), 2.0);
    assert.ok(Math.abs(parseFloat(a) * L - 0.24) < 1e-12, `a = ${a} : a × L = ${parseFloat(a) * L}`);
    const affiche = parseFloat(M.troisCs(L).replace(",", "."));
    assert.ok(Math.abs(parseFloat(a) * affiche - 0.24) < 1e-9, `a = ${a} : produit AFFICHÉ ${parseFloat(a) * affiche}`);
  }
});

test("l'écran : 17 positions distinctes, L avance d'une graduation fine (0,200 cm)", () => {
  const vus = [];
  for (let k = 0; k <= 16; k++) {
    const D = M.surGrille(M.D_MIN + k * M.D_PAS, M.D_PAS, M.D_MIN);
    const L = M.largeurTache("600", 0.06, D);
    vus.push(M.troisCs(L));
    assert.ok(Math.abs(L - (0.8 + 0.2 * k)) < 1e-12, `D = ${D} : L = ${L}`);
  }
  assert.equal(new Set(vus).size, 17);
  assert.equal(vus[0], "0,800");
  assert.equal(vus[16], "4,00");
  assert.equal(M.surGrille(M.D_MIN + 16 * M.D_PAS, M.D_PAS, M.D_MIN), 2.0);
});

test("la pente, λ déduite, le diamètre du cheveu", () => {
  for (const D of M.POINTS_D) {
    const L = M.largeurTache("600", 0.06, D);
    const p = M.pente(L, D);
    assert.equal(M.scientifique(p, 3), "2,00×10⁻²", `D = ${D}`);
    assert.ok(Math.abs(M.lambdaDeduite(p, 0.06) - 600) < 1e-9);
  }
  const Lcheveu = M.largeurTache("600", M.dimension("cheveu", "0.060"), 2.0);
  assert.equal(M.troisCs(Lcheveu), "3,00");
  assert.equal(M.troisCs(M.diametreDeduit("600", 2.0, Lcheveu)), "80,0");
});

test("le fil diffracte comme une fente de même largeur — au bit près", () => {
  for (const l of M.LASERS)
    for (const D of [0.4, 1.3, 2.0]) assert.equal(M.largeurTache(l, M.dimension("cheveu", "0.200"), D), M.largeurTache(l, M.dimension("fente", "0.080"), D));
});

test("θ, le rapport a/λ, et l'angle mesuré L/(2D)", () => {
  assert.equal(M.scientifique(M.theta("600", 0.2), 3), "3,00×10⁻³");
  assert.equal(M.scientifique(M.theta("532", 0.1), 3), "5,32×10⁻³");
  assert.equal(M.scientifique(M.theta("650", 0.06), 3), "1,08×10⁻²");
  assert.deepEqual(M.FENTES.map((a) => M.rapport(parseFloat(a), "600")), [100, 133, 167, 250, 333, 500, 1667]);
  assert.equal(M.entier(1667), "1 667");
  for (const a of M.FENTES)
    for (const l of M.LASERS) {
      const dim = parseFloat(a), L = M.largeurTache(l, dim, 1.7);
      assert.ok(Math.abs(M.thetaMesure(L, 1.7) - M.theta(l, dim)) < 1e-15);
    }
});

test("le profil de rendu : zéros à k·L/2, maximum sur l'axe", () => {
  assert.equal(M.profil(0, 2.4), 1);
  for (const k of [1, 2, 3]) assert.ok(M.profil((k * 2.4) / 2, 2.4) < 1e-20, `k = ${k}`);
  assert.ok(M.profil(0.3, 2.4) > M.profil(0.6, 2.4));
});
