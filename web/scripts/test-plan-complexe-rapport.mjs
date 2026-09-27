/**
 * test-plan-complexe-rapport.mjs — le modèle EXACT du « rapport lu depuis un
 * sommet » (web/src/lib/scene2d/plan-complexe-rapport-modele.ts ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-w.md §5.3).
 *
 * Ce que ce test garde, avant tout navigateur :
 *  - la table A : les DOUZE valeurs de w (4 formes × 3 sommets), écrites comme la
 *    spec les écrit, et recalculées ici en flottants par une seconde voie (depuis
 *    les affixes de la SPEC, pas du modèle) ; et leur INVARIANCE par placement
 *    (48 états → 12 valeurs) ;
 *  - la table B : |w| et arg(w) aux douze, et la lecture `nature` — chaque critère
 *    avec sa valeur, jamais « aucune des quatre » (§5.3 B, IM-1) ;
 *  - la table C : AC/AB = |w| au sommet A ;
 *  - la table D : les 48 états DANS le cadre, `retournee` énuméré point par point
 *    (sa borne grossière |t| + 4 ≈ 9,66 dépasse le cadre, §5.3 D) ;
 *  - la table E : le mode `lieu`, u = (z + 2)/(z − 2) aux cinq crans — dont les deux
 *    modules 2 ± √3 que seule `racineR3` sait écrire exactement ;
 *  - le BALAYAGE : sur chaque lieu, l'invariant tient en tout point de sa borne, et
 *    CESSERAIT de tenir au-delà (§6.1 : c'est la borne qui fait l'invariant) ;
 *  - les libellés : une table id → affichage par contrôle, de la longueur de ses
 *    valeurs, et AUCUN libellé ne contient une réponse (§5.2, règle B1) ;
 *  - aucune écriture du modèle ne contient un décimal.
 *
 *   node --test scripts/test-plan-complexe-rapport.mjs   (⚠️ depuis web/)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true, alias: { "@": path.join(WEB, "src") } });
const M = jiti(path.join(WEB, "src/lib/scene2d/plan-complexe-rapport-modele.ts"));

// ── Seconde voie : les affixes recopiés de la SPEC, en flottants ──
const S3 = Math.sqrt(3);
const AC_F = { "rect-isocele": [0, 4], equilateral: [2, 2 * S3], "demi-equilateral": [3, S3], aligne: [-2, 0] };
const PLACEMENT_F = { origine: [[0, 0], [1, 0]], posee: [[-2, 2], [1, 0]], tournee: [[2, -3], [0, 1]], retournee: [[4, 4], [-1, 0]] };
const mulF = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const addF = ([a, b], [c, d]) => [a + c, b + d];
const subF = ([a, b], [c, d]) => [a - c, b - d];
const divF = (u, [c, d]) => { const n = c * c + d * d; return [(u[0] * c + u[1] * d) / n, (u[1] * c - u[0] * d) / n]; };
const proche = (u, v, e = 1e-9) => Math.abs(u[0] - v[0]) < e && Math.abs(u[1] - v[1]) < e;
function triangleF(f, p) {
  const [t, r] = PLACEMENT_F[p];
  return { A: t, B: addF(t, mulF(r, [4, 0])), C: addF(t, mulF(r, AC_F[f])) };
}
function wF(T, s) {
  if (s === "A") return divF(subF(T.C, T.A), subF(T.B, T.A));
  if (s === "B") return divF(subF(T.C, T.B), subF(T.A, T.B));
  return divF(subF(T.B, T.C), subF(T.A, T.C));
}

/** évalue une écriture TeX du modèle (\tfrac, \sqrt{3}, i) en flottants — seconde lecture */
function evalTex(t) {
  let s = t.replace(/\\,/g, "").replace(/\\dfrac|\\tfrac/g, "\\frac");
  s = s.replace(/\\frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*)\}/g, "(($1)/($2))");
  s = s.replace(/\\sqrt\{(\d+)\}/g, "Math.sqrt($1)").replace(/\\pi/g, "Math.PI");
  // i → (0,1) : on évalue a + b i en séparant par un i symbolique
  const re = Function("i", `return (${s.replace(/(\d|\))\s*(Math|\()/g, "$1*$2").replace(/(\d|\))i/g, "$1*i").replace(/^i|([^a-zA-Z*])i/g, "$1i")});`);
  // f(i) linéaire en i : f(0) = re, f(1) − f(0) = im
  const a = re(0), b = re(1) - a;
  return [a, b];
}

// ── Table A (§5.3 A), recopiée de la SPEC ──
const TABLE_A = {
  "rect-isocele": { A: "i", B: "1-i", C: "1+i" },
  equilateral: { A: "\\tfrac{1+\\sqrt{3}\\,i}{2}", B: "\\tfrac{1-\\sqrt{3}\\,i}{2}", C: "\\tfrac{1+\\sqrt{3}\\,i}{2}" },
  "demi-equilateral": { A: "\\tfrac{3+\\sqrt{3}\\,i}{4}", B: "\\tfrac{1-\\sqrt{3}\\,i}{4}", C: "\\tfrac{\\sqrt{3}}{3}\\,i" },
  aligne: { A: "-\\tfrac{1}{2}", B: "\\tfrac{3}{2}", C: "3" },
};
// ── Table B (§5.3 B) : |w| et arg(w) en douzièmes de π ──
const TABLE_B = {
  "rect-isocele": { A: ["1", 6], B: ["\\sqrt{2}", -3], C: ["\\sqrt{2}", 3] },
  equilateral: { A: ["1", 4], B: ["1", -4], C: ["1", 4] },
  "demi-equilateral": { A: ["\\tfrac{\\sqrt{3}}{2}", 2], B: ["\\tfrac{1}{2}", -4], C: ["\\tfrac{\\sqrt{3}}{3}", 6] },
  aligne: { A: ["\\tfrac{1}{2}", 12], B: ["\\tfrac{3}{2}", 0], C: ["3", 0] },
};
// les conclusions qui S'ALLUMENT (§5.3 B, dernière colonne)
const CONCLUSIONS = {
  "rect-isocele": { A: ["isocele", "rectangle"], B: [], C: [] },
  equilateral: { A: ["isocele", "equilateral"], B: ["isocele", "equilateral"], C: ["isocele", "equilateral"] },
  "demi-equilateral": { A: [], B: [], C: ["rectangle"] },
  aligne: { A: ["alignes"], B: ["alignes"], C: ["alignes"] },
};

test("table A — les douze valeurs de w, écrites comme la spec, et justes en valeur", () => {
  for (const f of M.FORMES)
    for (const s of M.SOMMETS) {
      const w = M.rapport(M.lecture(M.triangle(f, "origine"), s));
      assert.equal(M.texRapport(w), TABLE_A[f][s], `${f} · ${s}`);
      const attendu = wF(triangleF(f, "origine"), s);
      assert.ok(proche(M.enFlottants(w), attendu), `${f} · ${s} : valeur`);
      assert.ok(proche(evalTex(TABLE_A[f][s]), attendu, 1e-12), `${f} · ${s} : l'écriture de la SPEC vaut bien le nombre`);
    }
});

test("w ne dépend PAS du placement : 48 états, 12 valeurs (§5.2 B)", () => {
  for (const f of M.FORMES)
    for (const s of M.SOMMETS) {
      const ref = M.rapport(M.lecture(M.triangle(f, "origine"), s));
      for (const p of M.POSITIONS) {
        const w = M.rapport(M.lecture(M.triangle(f, p), s));
        assert.ok(M.egal(w, ref), `${f} · ${p} · ${s}`);
        assert.ok(proche(wF(triangleF(f, p), s), M.enFlottants(ref)), `${f} · ${p} · ${s} (seconde voie)`);
      }
    }
});

test("table B — modules, arguments, et la lecture `nature` (critères, jamais un décompte)", () => {
  for (const f of M.FORMES)
    for (const s of M.SOMMETS) {
      const w = M.rapport(M.lecture(M.triangle(f, "posee"), s));
      const [mod, k] = TABLE_B[f][s];
      assert.equal(M.moduleDe(w).tex, mod, `${f} · ${s} : |w|`);
      assert.equal(M.argument(w), k, `${f} · ${s} : arg`);
      assert.deepEqual(M.conclusions(w), CONCLUSIONS[f][s], `${f} · ${s} : conclusions`);
      const n = M.nature(w, s).join(" · ");
      assert.ok(!/aucune des/.test(n), `${f} · ${s} : jamais « aucune des quatre »`);
      assert.ok(n.includes("\\vert w\\vert"), `${f} · ${s} : le critère du module est écrit`);
      assert.ok(n.includes("\\arg(w)"), `${f} · ${s} : le critère de l'argument est écrit`);
      const allume = CONCLUSIONS[f][s].length > 0;
      assert.equal(/rien ne s’allume/.test(n), !allume, `${f} · ${s} : « rien ne s'allume » ⟺ aucune conclusion`);
      for (const c of CONCLUSIONS[f][s]) {
        const mot = { isocele: "isocèle", equilateral: "équilatéral", rectangle: "rectangle en", alignes: "alignés" }[c];
        assert.ok(n.includes(mot), `${f} · ${s} : « ${mot} » écrit`);
      }
    }
  // le quasi-succès (§5.3 B) : au sommet B de Triangle 3, l'angle de l'équilatéral, et le module qui l'interdit
  const nB = M.nature(M.rapport(M.lecture(M.triangle("demi-equilateral", "retournee"), "B")), "B").join(" ");
  assert.ok(/-\\dfrac\{\\pi\}\{3\}/.test(nB) && /\\dfrac\{1\}\{2\} \\neq 1/.test(nB), "le quasi-succès de S3 dit sa raison");
});

test("table C — AC/AB = |w| au sommet A", () => {
  const TABLE_C = { "rect-isocele": ["4", "4"], equilateral: ["4", "4"], "demi-equilateral": ["4", "2\\sqrt{3}"], aligne: ["4", "2"] };
  for (const f of M.FORMES) {
    const l = M.lecture(M.triangle(f, "tournee"), "A");
    assert.equal(M.moduleDe(l.den).tex, TABLE_C[f][0], `${f} : AB`);
    assert.equal(M.moduleDe(l.num).tex, TABLE_C[f][1], `${f} : AC`);
    assert.ok(Math.abs(M.moduleDe(l.num).f / M.moduleDe(l.den).f - M.moduleDe(M.rapport(l)).f) < 1e-12, `${f} : AC/AB = |w|`);
  }
});

test("les états des paris : S1, S2, S3 (§7.1–7.3)", () => {
  const t1 = M.triangle("rect-isocele", "posee");
  assert.deepEqual([t1.A, t1.B, t1.C].map(M.texComplexe), ["-2+2i", "2+2i", "-2+6i"]);
  const l1 = M.lecture(t1, "A");
  assert.deepEqual([l1.num, l1.den].map(M.texComplexe), ["4i", "4"]);
  // les trois distracteurs de S1 se RECALCULENT depuis leur modèle, et sont distincts
  assert.equal(M.texRapport(M.div(t1.C, t1.B)), "1+2i", "affixes divisées");
  assert.equal(M.texRapport(M.div(M.sub(t1.C, t1.A), t1.B)), "1+i", "demi-soustraction");
  assert.equal(M.texRapport(M.div(l1.den, l1.num)), "-i", "ordre inverse");
  const t2 = M.triangle("demi-equilateral", "tournee");
  assert.deepEqual([t2.A, t2.B, t2.C].map(M.texComplexe), ["2-3i", "2+i", "2-\\sqrt{3}"]);
  const l2 = M.lecture(t2, "A");
  assert.equal(M.texComplexe(l2.num), "-\\sqrt{3}+3i");
  // le distracteur « valeurs absolues » : |AC| = 2√3 et arg(AC) = 2π/3, séparables parce que AB n'est pas horizontal
  assert.equal(M.moduleDe(l2.num).tex, "2\\sqrt{3}");
  assert.equal(M.argument(l2.num), 8);
  assert.notEqual(M.argument(l2.num), M.argument(M.rapport(l2)));
  // « fraction retournée » : |1/w| = 2√3/3, arg = −π/6
  const inv = M.div(l2.den, l2.num);
  assert.equal(M.moduleDe(inv).tex, "\\tfrac{2\\sqrt{3}}{3}");
  assert.equal(M.argument(inv), -2);
  const t3 = M.triangle("demi-equilateral", "retournee");
  assert.deepEqual([t3.A, t3.B, t3.C].map(M.texComplexe), ["4+4i", "4i", "1+(4-\\sqrt{3})i"]);
});

test("table D — les 48 états dans le cadre, `retournee` énuméré point par point", () => {
  for (const f of M.FORMES) {
    const t = M.triangle(f, "retournee");
    for (const z of [t.A, t.B, t.C]) for (const v of M.enFlottants(z)) assert.ok(Math.abs(v) <= 6 + 1e-9, `${f} : ${M.texComplexe(z)}`);
  }
  assert.ok(M.excursion() <= 6 + 1e-9, `excursion ${M.excursion()}`);
  assert.ok(M.excursion() < M.FENETRE - 2.9, "marge ≥ 3 unités au cadre");
});

test("aucun état ne superpose deux points (écart ≥ 8 px au plus petit plateau, §6.2)", () => {
  const pxParUnite = 358 / 18;
  for (const f of M.FORMES)
    for (const p of M.POSITIONS) {
      const t = M.triangle(f, p);
      const pts = [t.A, t.B, t.C].map(M.enFlottants);
      for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) assert.ok(Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]) * pxParUnite >= 8, `${f} · ${p}`);
    }
});

test("table E — le mode `lieu`, u = (z + 2)/(z − 2), aux cinq crans", () => {
  const TABLE_E = {
    libre: { z: "2+4i", u: "1-i", mod: "\\sqrt{2}", k: -3 },
    "cercle-1": { z: "\\sqrt{3}+i", mod: "2+\\sqrt{3}", k: -6 },
    "cercle-2": { z: "-\\sqrt{3}+i", mod: "2-\\sqrt{3}", k: -6 },
    mediatrice: { z: "2\\sqrt{3}\\,i", u: "\\tfrac{1-\\sqrt{3}\\,i}{2}", mod: "1", k: -4 },
    droite: { z: "4", u: "3", mod: "3", k: 0 },
  };
  for (const m of M.POINTS_M) {
    const z = M.pointM(m);
    assert.equal(M.TEX_POINT_M[m], TABLE_E[m].z, `${m} : libellé = affixe`);
    const u = M.rapportLieu(z);
    if (TABLE_E[m].u) assert.equal(M.texRapport(u), TABLE_E[m].u, `${m} : u`);
    assert.equal(M.moduleDe(u).tex, TABLE_E[m].mod, `${m} : |u|`);
    assert.equal(M.argument(u), TABLE_E[m].k, `${m} : arg u`);
    const f = M.rapportLieuF(M.enFlottants(z));
    assert.ok(Math.abs(f.module - M.moduleDe(u).f) < 1e-12 && Math.abs(f.argument - (TABLE_E[m].k * Math.PI) / 12) < 1e-12, `${m} : seconde voie`);
  }
  // le fait de S4 en une ligne : même argument, modules différents ; module 1, argument quelconque
  assert.equal(M.argument(M.rapportLieu(M.pointM("cercle-1"))), M.argument(M.rapportLieu(M.pointM("cercle-2"))));
  assert.notEqual(M.moduleDe(M.rapportLieu(M.pointM("cercle-1"))).tex, M.moduleDe(M.rapportLieu(M.pointM("cercle-2"))).tex);
  // aucun cran n'est sur deux lieux (±2i et 0 sont délibérément absents, §5.2 D)
  for (const m of M.POINTS_M) {
    const [x, y] = M.enFlottants(M.pointM(m));
    const sur = [Math.abs(x) < 1e-9, Math.abs(Math.hypot(x, y) - 2) < 1e-9, Math.abs(y) < 1e-9].filter(Boolean).length;
    assert.equal(sur, m === "libre" ? 0 : 1, `${m} : sur ${sur} lieu(x)`);
  }
});

test("le BALAYAGE — l'invariant tient sur toute la borne, et la borne est ce qui le fait tenir (§6.1)", () => {
  for (const m of ["mediatrice", "cercle-1", "cercle-2", "droite"]) {
    const P = M.parcours(m);
    const lieu = M.LIEU_DU_CRAN[m];
    const inv = M.INVARIANT[lieu];
    const attendu = inv === "module" ? 1 : lieu === "cercle" ? -Math.PI / 2 : 0;
    assert.ok(P.depart >= P.min && P.depart <= P.max, `${m} : le cran est dans la borne`);
    let bouge = false;
    for (let p = P.min; p <= P.max + 1e-9; p += P.pas / 4) {
      const f = M.rapportLieuF(P.point(p));
      assert.ok(Math.abs((inv === "module" ? f.module : f.argument) - attendu) < 1e-9, `${m} : invariant à p = ${p}`);
      const autre = inv === "module" ? f.argument : f.module;
      if (Math.abs(autre - (inv === "module" ? M.rapportLieuF(P.point(P.depart)).argument : M.rapportLieuF(P.point(P.depart)).module)) > 1e-3) bouge = true;
    }
    assert.ok(bouge, `${m} : l'autre ligne BOUGE (sinon le geste ne montre rien)`);
    // au-delà de la borne : l'« invariant » cesse de l'être (cercle sous l'axe ; droite entre A et B)
    if (lieu === "cercle") assert.ok(Math.abs(M.rapportLieuF([0, -2]).argument - Math.PI / 2) < 1e-9, "sous l'axe, arg u = +π/2");
    if (lieu === "droite") assert.ok(Math.abs(Math.abs(M.rapportLieuF([0.5, 0]).argument) - Math.PI) < 1e-9, "entre A et B, arg u = π");
    // le pas déplace M d'au moins 4 px à 390 px (§5.5 point 3)
    const a = P.point(P.depart), b = P.point(P.depart + P.pas);
    assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1]) * (358 / 18) >= 4, `${m} : un pas ≥ 4 px`);
    // M reste dans le cadre
    for (const p of [P.min, P.max]) for (const v of P.point(p)) assert.ok(Math.abs(v) <= M.FENETRE - 0.5, `${m} : borne dans le cadre`);
  }
  assert.equal(M.parcours("libre"), null, "au cran 2 + 4i, aucun balayage");
});

test("les libellés — une table par contrôle, de la bonne longueur, et AUCUNE réponse (§5.2, B1)", () => {
  assert.deepEqual(Object.keys(M.LIBELLE_POSITION), [...M.POSITIONS]);
  assert.deepEqual(Object.keys(M.LIBELLE_FORME), [...M.FORMES]);
  assert.deepEqual(Object.keys(M.LIBELLE_SOMMET), [...M.SOMMETS]);
  assert.deepEqual(Object.keys(M.TEX_POINT_M), [...M.POINTS_M]);
  const tous = [...Object.values(M.LIBELLE_POSITION), ...Object.values(M.LIBELLE_FORME), ...Object.values(M.TEX_POINT_M)].join(" ").toLowerCase();
  for (const mot of ["origine", "pos", "tourn", "retourn", "rect", "isoc", "équilat", "equilat", "demi", "align", "cercle", "médiatrice", "mediatrice", "droite", "libre"]) assert.ok(!tous.includes(mot), `aucun libellé ne contient « ${mot} »`);
});

test("le registre et le modèle parlent des mêmes crans", () => {
  const reg = JSON.parse(readFileSync(path.join(WEB, "src/lib/scene3d/scenes.json"), "utf8"))["plan-complexe-rapport"];
  if (!reg) return; // l'entrée de registre vient à l'étape 3 de la construction
  assert.deepEqual(reg.valeurs.position, [...M.POSITIONS]);
  assert.deepEqual(reg.valeurs.forme, [...M.FORMES]);
  assert.deepEqual(reg.valeurs.sommet, [...M.SOMMETS]);
  assert.deepEqual(reg.valeurs.pointM, [...M.POINTS_M]);
  assert.deepEqual(reg.valeurs.mode, [...M.MODES]);
});

test("aucune écriture du modèle ne contient un décimal", () => {
  const ecrits = [];
  for (const f of M.FORMES)
    for (const p of M.POSITIONS) {
      const t = M.triangle(f, p);
      for (const s of M.SOMMETS) {
        const l = M.lecture(t, s), w = M.rapport(l);
        ecrits.push(M.texComplexe(t.A), M.texComplexe(t.B), M.texComplexe(t.C), M.texComplexe(l.num), M.texComplexe(l.den), M.texRapport(w), M.moduleDe(w).tex, ...M.nature(w, s));
      }
    }
  for (const m of M.POINTS_M) ecrits.push(M.moduleDe(M.rapportLieu(M.pointM(m))).tex, M.TEX_POINT_M[m]);
  for (const e of ecrits) assert.ok(!/\d[.,]\d|°/.test(e.replace(/\{,\}/g, "")), `« ${e} »`);
});
