/**
 * test-plan-complexe.mjs — le modèle EXACT du « plan complexe »
 * (web/src/lib/scene2d/plan-complexe-modele.ts ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md §5.3).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - la table A : z' = c·z aux 35 couples, centre O — ÉCRITURE exacte, et valeur
 *    recalculée ici en flottants par une seconde voie (§11 : une belle forme
 *    exacte qui ne vaut pas le bon nombre doit rougir) ;
 *  - la table B : |z'| = |c|·|z|, et les QUATRE modules distincts des sept crans ;
 *  - la table C : les arguments à c = √3 + i, dont le seul argument NÉGATIF de la
 *    grille (1 − i) — et l'écart π/6 aux cinq points ;
 *  - la borne −π : à c = −2, les points 1 + i et 2i donnent un écart brut de −π,
 *    et la scène doit écrire +π (§5.4) ;
 *  - la table D : la rotation de centre A, AM = AM' aux cinq points ;
 *  - la table E et le §5.2 D : les trois formules de S5, z' depuis a ET b,
 *    ω = b/(1 − a) recoupé par la définition (aω + b = ω), et (z' − ω)/(z − ω) = a ;
 *  - les 70 + 15 états DANS le cadre [−9 ; 9]², l'excursion maximale écrite ;
 *  - aucune écriture du modèle ne contient un décimal.
 *
 *   node --test scripts/test-plan-complexe.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/plan-complexe-modele.ts"));

// ── Les crans, recopiés de la SPEC en flottants (seconde voie, §11) ──
const S3 = Math.sqrt(3);
const C_F = { "2": [2, 0], "0.5": [0.5, 0], i: [0, 1], "-2": [-2, 0], "1+i": [1, 1], "2i": [0, 2], "sqrt3+i": [S3, 1] };
const Z_F = { "1+i": [1, 1], "2i": [0, 2], "2": [2, 0], "4": [4, 0], "1-i": [1, -1] };
const mulF = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];

// ── Les tables du §5.3, recopiées de la SPEC (pas du modèle) ──
const COEFS = ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"];
const POINTS = ["1+i", "2i", "2", "4", "1-i"];
const TABLE_A = {
  "2": ["2+2i", "4i", "4", "8", "2-2i"],
  "0.5": ["\\tfrac{1}{2}+\\tfrac{1}{2}\\,i", "i", "1", "2", "\\tfrac{1}{2}-\\tfrac{1}{2}\\,i"],
  i: ["-1+i", "-2", "2i", "4i", "1+i"],
  "-2": ["-2-2i", "-4i", "-4", "-8", "-2+2i"],
  "1+i": ["2i", "-2+2i", "2+2i", "4+4i", "2"],
  "2i": ["-2+2i", "-4", "4i", "8i", "2+2i"],
  "sqrt3+i": ["(\\sqrt{3}-1)+(\\sqrt{3}+1)i", "-2+2\\sqrt{3}\\,i", "2\\sqrt{3}+2i", "4\\sqrt{3}+4i", "(\\sqrt{3}+1)+(1-\\sqrt{3})i"],
};
const MODULE_C = { "2": "2", "0.5": "\\tfrac{1}{2}", i: "1", "-2": "2", "1+i": "\\sqrt{2}", "2i": "2", "sqrt3+i": "2" };
const TABLE_B = {
  "2": ["2\\sqrt{2}", "4", "4", "8", "2\\sqrt{2}"],
  "\\tfrac{1}{2}": ["\\tfrac{\\sqrt{2}}{2}", "1", "1", "2", "\\tfrac{\\sqrt{2}}{2}"],
  "1": ["\\sqrt{2}", "2", "2", "4", "\\sqrt{2}"],
  "\\sqrt{2}": ["2", "2\\sqrt{2}", "2\\sqrt{2}", "4\\sqrt{2}", "2"],
};
const ARG_C = { "2": "0", "0.5": "0", i: "\\tfrac{\\pi}{2}", "-2": "\\pi", "1+i": "\\tfrac{\\pi}{4}", "2i": "\\tfrac{\\pi}{2}", "sqrt3+i": "\\tfrac{\\pi}{6}" };
const TABLE_C = {
  argZ: ["\\tfrac{\\pi}{4}", "\\tfrac{\\pi}{2}", "0", "0", "-\\tfrac{\\pi}{4}"],
  argZp: ["\\tfrac{5\\pi}{12}", "\\tfrac{2\\pi}{3}", "\\tfrac{\\pi}{6}", "\\tfrac{\\pi}{6}", "-\\tfrac{\\pi}{12}"],
};
const TABLE_D = { zp: ["1-i", "-2i", "2", "2+2i", "3-i"], AM: ["\\sqrt{2}", "2\\sqrt{2}", "0", "2", "\\sqrt{2}"] };
const TABLE_E = {
  "les-deux": { omega: "1+i", zp: ["1+i", "-1+i", "3+i", "5+3i", "3-i"], OM: ["0", "\\sqrt{2}", "\\sqrt{2}", "\\sqrt{10}", "2"], OMp: ["0", "2", "2", "2\\sqrt{5}", "2\\sqrt{2}"], a: "1+i" },
  "homothetie-A": { omega: "2", zp: ["2i", "-2+4i", "2", "6", "-2i"], a: "2" },
  "rotation-A": { omega: "2", zp: ["1-i", "-2i", "2", "2+2i", "3-i"], a: "i" },
};

const T = (c, centre = "O", enonce = "coefficient") => M.transformation({ c, centre, enonce });
const tex = (u) => M.texComplexe(u);
const radical = (u) => M.texRadical(M.moduleDe(u));
const angle = (k) => (k === null ? null : M.texAngle(k));

test("les crans : 7 coefficients, 5 points, 2 centres, 4 énoncés — et rien entre (N9)", () => {
  assert.deepEqual([...M.COEFFICIENTS], COEFS);
  assert.deepEqual([...M.POINTS], POINTS);
  assert.deepEqual([...M.CENTRES], ["O", "A"]);
  assert.deepEqual([...M.ENONCES], ["coefficient", "rotation-A", "homothetie-A", "les-deux"]);
  assert.equal(M.FENETRE, 9);
});

test("table A — z' = c·z aux 35 couples, centre O : écriture exacte ET valeur (seconde voie)", () => {
  for (const c of COEFS)
    POINTS.forEach((z, j) => {
      const zp = M.image(T(c), M.point(z));
      assert.equal(tex(zp), TABLE_A[c][j], `c = ${c}, z = ${z}`);
      const [x, y] = mulF(C_F[c], Z_F[z]);
      const [xm, ym] = M.enFlottants(zp);
      assert.ok(Math.abs(x - xm) < 1e-9 && Math.abs(y - ym) < 1e-9, `valeur de c·z, c = ${c}, z = ${z}`);
    });
});

test("table B — |c| aux sept crans, quatre modules distincts, et |z'| = |c|·|z|", () => {
  for (const c of COEFS) assert.equal(radical(M.coefficient(c)), MODULE_C[c], `|${c}|`);
  assert.equal(new Set(Object.values(MODULE_C)).size, 4);
  for (const c of COEFS) {
    const ligne = TABLE_B[MODULE_C[c]];
    POINTS.forEach((z, j) => {
      const zp = M.image(T(c), M.point(z));
      assert.equal(radical(zp), ligne[j], `|c·z|, c = ${c}, z = ${z}`);
      assert.ok(Math.abs(M.radicalF(M.moduleDe(zp)) - Math.hypot(...mulF(C_F[c], Z_F[z]))) < 1e-9);
    });
  }
});

test("arguments des sept coefficients (N4), dans ]−π ; π]", () => {
  for (const c of COEFS) assert.equal(angle(M.argument(M.coefficient(c))), ARG_C[c], `arg ${c}`);
});

test("table C — c = √3 + i : arg z, arg z', et l'écart π/6 aux cinq points", () => {
  const t = T("sqrt3+i");
  POINTS.forEach((z, j) => {
    const Z = M.point(z);
    assert.equal(angle(M.argument(Z)), TABLE_C.argZ[j], `arg ${z}`);
    assert.equal(angle(M.argument(M.image(t, Z))), TABLE_C.argZp[j], `arg z' pour ${z}`);
    assert.equal(angle(M.ecart(t, Z)), "\\tfrac{\\pi}{6}", `écart pour ${z}`);
  });
  // N5 dans les DEUX sens : l'écart et l'argument de l'image coïncident EXACTEMENT sur l'axe réel
  const egaux = POINTS.filter((z) => angle(M.ecart(t, M.point(z))) === angle(M.argument(M.image(t, M.point(z)))));
  assert.deepEqual(egaux, ["2", "4"]);
});

test("l'écart vaut arg(c) aux 70 états, hors point fixe — et la borne −π s'écrit +π (§5.4)", () => {
  for (const centre of ["O", "A"])
    for (const c of COEFS)
      for (const z of POINTS) {
        const t = T(c, centre);
        const k = M.ecart(t, M.point(z));
        if (centre === "A" && z === "2") assert.equal(k, null, "au point fixe, pas d'écart");
        else assert.equal(angle(k), ARG_C[c], `écart, centre ${centre}, c = ${c}, z = ${z}`);
        if (k !== null) assert.ok(k > -12 && k <= 12, "dans ]−π ; π]");
      }
  // les deux états où l'écart BRUT tombe sur −π
  for (const z of ["1+i", "2i"]) {
    const t = T("-2");
    const brut = (M.argument(M.image(t, M.point(z))) ?? NaN) - (M.argument(M.point(z)) ?? NaN);
    assert.equal(brut, -12, `écart brut −π à z = ${z}`);
    assert.equal(angle(M.ecart(t, M.point(z))), "\\pi");
  }
});

test("table D — rotation de centre A (c = i) : les images, et AM = AM' aux cinq points", () => {
  const t = T("i", "A");
  POINTS.forEach((z, j) => {
    const Z = M.point(z);
    const zp = M.image(t, Z);
    assert.equal(tex(zp), TABLE_D.zp[j], `z' pour ${z}`);
    assert.equal(radical(M.sub(Z, t.omega)), TABLE_D.AM[j], `AM pour ${z}`);
    assert.equal(radical(M.sub(zp, t.omega)), TABLE_D.AM[j], `AM' pour ${z}`);
  });
  assert.equal(M.texFactorisee(t), "z'-2=i\\,(z-2)");
  assert.equal(M.texDeveloppee(t), "z'=i\\,z+2-2i", "la forme développée de S4 est la formule rotation-A de S5");
});

test("table E et §5.2 D — les trois formules : z' depuis a ET b, ω deux fois, (z' − ω)/(z − ω) = a", () => {
  for (const [enonce, e] of Object.entries(TABLE_E)) {
    const t = T("2", "O", enonce);
    assert.equal(tex(t.omega), e.omega, `ω de ${enonce} par b/(1 − a)`);
    assert.ok(M.egal(M.add(M.mul(t.a, t.omega), t.b), t.omega), `ω de ${enonce} vérifie ω = aω + b`);
    assert.equal(t.donne, false);
    POINTS.forEach((z, j) => {
      const Z = M.point(z);
      const zp = M.image(t, Z);
      assert.equal(tex(zp), e.zp[j], `${enonce}, z = ${z}`);
      // SANS le + b, l'image serait fausse : la table n'est pas celle de a·z
      if (enonce === "les-deux" && z === "2i") assert.notEqual(tex(M.mul(t.a, Z)), e.zp[j]);
      if (e.OM) {
        assert.equal(radical(M.sub(Z, t.omega)), e.OM[j]);
        assert.equal(radical(M.sub(zp, t.omega)), e.OMp[j]);
      }
      if (M.egal(Z, t.omega)) assert.ok(M.egal(zp, Z), `le point fixe de ${enonce} ne bouge pas`);
      else assert.equal(tex(M.div(M.sub(zp, t.omega), M.sub(Z, t.omega))), e.a, `(z' − ω)/(z − ω), ${enonce}, z = ${z}`);
    });
  }
  assert.equal(M.TEX_FORMULE["rotation-A"], "z'=i\\,z+2-2i");
  assert.equal(M.TEX_FORMULE["homothetie-A"], "z'=2\\,z-2");
  assert.equal(M.TEX_FORMULE["les-deux"], "z'=(1+i)\\,z+1-i");
  assert.equal(M.texFactorisee(T("2", "O", "les-deux")), "z'-(1+i)=(1+i)\\,(z-(1+i))");
});

test("les 70 + 15 états tiennent dans [−9 ; 9]², et l'excursion maximale au centre O vaut 8", () => {
  let max = 0;
  const dedans = (u, qui) => {
    const [x, y] = M.enFlottants(u);
    assert.ok(Math.abs(x) <= M.FENETRE && Math.abs(y) <= M.FENETRE, `${qui} hors du cadre : (${x}, ${y})`);
  };
  for (const centre of ["O", "A"])
    for (const c of COEFS)
      for (const z of POINTS) {
        const zp = M.image(T(c, centre), M.point(z));
        dedans(zp, `centre ${centre}, c = ${c}, z = ${z}`);
        if (centre === "O") max = Math.max(max, M.radicalF(M.moduleDe(zp)));
      }
  assert.ok(Math.abs(max - 8) < 1e-12);
  for (const enonce of ["rotation-A", "homothetie-A", "les-deux"])
    for (const z of POINTS) dedans(M.image(T("2", "O", enonce), M.point(z)), `${enonce}, z = ${z}`);
});

test("aucune écriture du modèle ne contient un décimal ni un degré (§5.4)", () => {
  const vus = [];
  for (const centre of ["O", "A"])
    for (const c of COEFS) {
      const t = T(c, centre);
      vus.push(M.texFactorisee(t), M.texDeveloppee(t), radical(t.a), angle(M.argument(t.a)));
      for (const z of POINTS) {
        const zp = M.image(t, M.point(z));
        vus.push(tex(zp), radical(M.sub(zp, t.omega)), angle(M.ecart(t, M.point(z))) ?? "");
      }
    }
  for (const s of vus) assert.ok(!/\d[.,]\d|°/.test(s), `décimal ou degré : ${s}`);
});
