#!/usr/bin/env node
/**
 * scene-plan-complexe-rapport — la porte du « rapport lu depuis un sommet »
 * (maths/nombres-complexes-2, en tête de R6 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-w.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et trouve son
 * panneau par `[data-scene="plan-complexe-rapport"]` — la scène sœur vit sur la même
 * page, sous le même libellé d'ouverture. La scène est ANALYTIQUE : la porte refait
 * chaque NOMBRE par sa propre arithmétique (les affixes de la spec, écrits ICI, en
 * flottants), et compare des FORMES EXACTES : (a) égalité de CHAÎNE contre les tables
 * du §5.3, recopiées ici dans la forme que le produit écrit (ADR 0039) ; (b) égalité
 * NUMÉRIQUE à 10⁻⁹ entre la chaîne LUE, évaluée, et le calcul refait.
 *
 * LES ANGLES ATTENDUS VIENNENT DE LA PORTE, JAMAIS DE L'ÉCRAN (leçon de la campagne de
 * la scène sœur, 2026-09-25 : un arc et un angle faux dans le même sens se disculpaient
 * l'un l'autre quand l'attendu était lu sur la lecture affichée — ADR 0036).
 *
 * LES FAMILLES (spec §11, amendées par la construction) : avant-clic · pas-de-3d ·
 * etapes · paris · avant-pari · nombres (N1–N8 sur les états ATTEIGNABLES) ·
 * invariance-par-placement · formule-au-sommet · libelles-de-cran · isotropie ·
 * point-a-sa-place · numerateur-denominateur-distincts · arc-au-sommet ·
 * longueurs-au-rapport · angle-droit-marque · courbe-du-lieu · balayage-invariants ·
 * lectures-entieres · palette · formule-graduee · fuite-inter-etapes · frontiere ·
 * katex · etiquettes · cadre · annonce · console · ergonomie.
 *
 * Ce que la porte NE mesure PAS, écrit à côté de ce qu'elle mesure (ADR 0035) : les
 * 48 états du mode `triangle` — le PANNEAU n'en laisse atteindre que 11 (4 placements
 * à S1, 4 triangles à S2, 3 sommets à S3), et c'est le test unitaire
 * (`test-plan-complexe-rapport.mjs`) qui garde les 48 dans le modèle ; ici, chaque état
 * que l'élève PEUT voir est mesuré. L'arc à l'ENCRE de S3 n'est lu aux pixels qu'au
 * sommet A (aux sommets B et C, le sommet est à moins de deux unités d'un axe, dont
 * l'encre et les nombres se confondent avec l'arc) ; aux deux autres, sa présence et sa
 * valeur sont lues par l'étiquette.
 *
 *   node scripts/scene-plan-complexe-rapport.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-plan-complexe-rapport.mjs --essai-rouge  (chaque famille doit crier)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { erreursKatex } from "./lib/katex-erreurs.mjs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_RAPPORT ?? 3800 + (process.pid % 60));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/nombres-complexes-2";
const SCENE = "plan-complexe-rapport";
const OUVRIR = "Ouvrir le plan complexe";

// ── La seconde voie : les affixes de la SPEC (§5.2), en flottants, rien du produit ──
const R3 = Math.sqrt(3);
const AC = { "rect-isocele": [0, 4], equilateral: [2, 2 * R3], "demi-equilateral": [3, R3], aligne: [-2, 0] };
const PLACEMENT = { origine: [[0, 0], [1, 0]], posee: [[-2, 2], [1, 0]], tournee: [[2, -3], [0, 1]], retournee: [[4, 4], [-1, 0]] };
const POINT_M = { libre: [2, 4], "cercle-1": [R3, 1], "cercle-2": [-R3, 1], mediatrice: [0, 2 * R3], droite: [4, 0] };
const ZA_LIEU = [-2, 0], ZB_LIEU = [2, 0];
const add = (u, v) => [u[0] + v[0], u[1] + v[1]];
const sub = (u, v) => [u[0] - v[0], u[1] - v[1]];
const mul = (u, v) => [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]];
const div = (u, v) => { const n = v[0] * v[0] + v[1] * v[1]; return [(u[0] * v[0] + u[1] * v[1]) / n, (u[1] * v[0] - u[0] * v[1]) / n]; };
const abs = (u) => Math.hypot(u[0], u[1]);
/** l'argument dans ]−π ; π] — `atan2(−0, −x)` vaut −π : un zéro SIGNÉ du calcul flottant ne doit pas
 * changer la réponse (premier lancement, triangle 4 : « arg(w) lu ne vaut pas −3,1416 » contre π exact) */
const argF = (u) => { const a = Math.atan2(u[1], u[0]); return a <= -Math.PI + 1e-12 ? Math.PI : a; };
function triangle(f, p) {
  const [t, r] = PLACEMENT[p];
  return { A: t, B: add(t, mul(r, [4, 0])), C: add(t, mul(r, AC[f])) };
}
/** au sommet s : [numérateur, dénominateur, point du num, point du den] — la règle du BADGE (§5.2 C) */
function lectureF(T, s) {
  if (s === "A") return { num: sub(T.C, T.A), den: sub(T.B, T.A), vn: "C", vd: "B" };
  if (s === "B") return { num: sub(T.C, T.B), den: sub(T.A, T.B), vn: "C", vd: "A" };
  return { num: sub(T.B, T.C), den: sub(T.A, T.C), vn: "B", vd: "A" };
}

// ── Les tables du §5.3, recopiées de la SPEC, dans la FORME que le produit écrit (grand : \dfrac) ──
const TABLE_A = {
  "rect-isocele": { A: "i", B: "1-i", C: "1+i" },
  equilateral: { A: "\\dfrac{1+\\sqrt{3}\\,i}{2}", B: "\\dfrac{1-\\sqrt{3}\\,i}{2}", C: "\\dfrac{1+\\sqrt{3}\\,i}{2}" },
  "demi-equilateral": { A: "\\dfrac{3+\\sqrt{3}\\,i}{4}", B: "\\dfrac{1-\\sqrt{3}\\,i}{4}", C: "\\dfrac{\\sqrt{3}}{3}\\,i" },
  aligne: { A: "-\\dfrac{1}{2}", B: "\\dfrac{3}{2}", C: "3" },
};
const TABLE_B = {
  "rect-isocele": { A: ["1", "\\dfrac{\\pi}{2}"], B: ["\\sqrt{2}", "-\\dfrac{\\pi}{4}"], C: ["\\sqrt{2}", "\\dfrac{\\pi}{4}"] },
  equilateral: { A: ["1", "\\dfrac{\\pi}{3}"], B: ["1", "-\\dfrac{\\pi}{3}"], C: ["1", "\\dfrac{\\pi}{3}"] },
  "demi-equilateral": { A: ["\\dfrac{\\sqrt{3}}{2}", "\\dfrac{\\pi}{6}"], B: ["\\dfrac{1}{2}", "-\\dfrac{\\pi}{3}"], C: ["\\dfrac{\\sqrt{3}}{3}", "\\dfrac{\\pi}{2}"] },
  aligne: { A: ["\\dfrac{1}{2}", "\\pi"], B: ["\\dfrac{3}{2}", "0"], C: ["3", "0"] },
};
const CONCLUSIONS = {
  "rect-isocele": { A: ["isocèle", "rectangle"], B: [], C: [] },
  equilateral: { A: ["isocèle", "équilatéral"], B: ["isocèle", "équilatéral"], C: ["isocèle", "équilatéral"] },
  "demi-equilateral": { A: [], B: [], C: ["rectangle"] },
  aligne: { A: ["alignés"], B: ["alignés"], C: ["alignés"] },
};
const TABLE_C = { "rect-isocele": ["4", "4"], equilateral: ["4", "4"], "demi-equilateral": ["4", "2\\sqrt{3}"], aligne: ["4", "2"] };
const TABLE_E = {
  libre: ["\\sqrt{2}", "-\\dfrac{\\pi}{4}"], "cercle-1": ["2+\\sqrt{3}", "-\\dfrac{\\pi}{2}"], "cercle-2": ["2-\\sqrt{3}", "-\\dfrac{\\pi}{2}"],
  mediatrice: ["1", "-\\dfrac{\\pi}{3}"], droite: ["3", "0"],
};
const LIBELLES = {
  position: ["Placement 1", "Placement 2", "Placement 3", "Placement 4"],
  forme: ["Triangle 1", "Triangle 2", "Triangle 3", "Triangle 4"],
  sommet: ["A", "B", "C"],
  pointM: ["2+4i", "\\sqrt{3}+i", "-\\sqrt{3}+i", "2\\sqrt{3}\\,i", "4"],
};
const BADGE = { A: "w=\\dfrac{z_C-z_A}{z_B-z_A}", B: "w=\\dfrac{z_C-z_B}{z_A-z_B}", C: "w=\\dfrac{z_B-z_C}{z_A-z_C}", lieu: "u=\\dfrac{z-z_A}{z-z_B}" };
// Un décimal ou un degré, sous TOUTES les formes que la scène peut écrire : les lectures sont lues
// en TeX (window.__tex), où la virgule française s'écrit « {,} » — « 0{,}87 » échappait à « \d[.,]\d »,
// et la campagne de sabotages l'a trouvé (module arrondi à deux décimales : [frontiere] restée verte).
// La porte sœur (scene-plan-complexe.mjs) avait déjà la forme juste ; le motif est repris d'elle.
const DECIMAL = /\d\s*[.,]\s*\d|\{,\}|°|\\circ|degré|(^|[^\p{L}])deg(?![\p{L}])/u;

/** Un petit lecteur de TeX : ce que la scène écrit (fractions, √, i, π) → [re, im]. null s'il ne sait pas. */
function evalTex(s0) {
  let s = s0.replace(/\\,/g, "").replace(/\s+/g, "").replace(/\\[dt]?frac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*)\}/g, "(($1)/($2))");
  s = s.replace(/\\sqrt\{(\d+)\}/g, "S$1").replace(/\\pi/g, "P").replace(/−/g, "-");
  if (/[^0-9SPi()+\-*/.]/.test(s)) return null;
  // i et P comme facteurs implicites
  s = s.replace(/S(\d+)/g, "(Math.sqrt($1))").replace(/P/g, "(Math.PI)");
  s = s.replace(/(\d|\))\(/g, "$1*(").replace(/(\d|\))i/g, "$1*i").replace(/\)(\d)/g, ")*$1");
  try {
    const f = Function("i", `"use strict"; return (${s.replace(/(^|[^*\w])i/g, "$1(i)")});`);
    const a = f(0), b = f(1) - a;
    return Number.isFinite(a) && Number.isFinite(b) ? [a, b] : null;
  } catch { return null; }
}
const reel = (s) => { const v = evalTex(s); return v && Math.abs(v[1]) < 1e-12 ? v[0] : null; };

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  if (await fetch(BASE + "/").then(() => true, () => false)) {
    console.error(`scene-plan-complexe-rapport : un serveur répond déjà sur le port ${PORT} — il serait mesuré à la place du build. L'arrêter, ou choisir PORT_RAPPORT.`);
    process.exit(1);
  }
  const journal = `${os.tmpdir()}/scene-plan-complexe-rapport-${PORT}-${process.pid}.log`;
  const fd = fs.openSync(journal, "w");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: ["ignore", fd, fd], detached: true });
  let vivant = false;
  for (let k = 0; k < 60; k++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-plan-complexe-rapport : `next start` n'a pas répondu. Build absent ?");
    try { console.error(fs.readFileSync(journal, "utf8").split("\n").slice(-20).map((l) => "  | " + l).join("\n")); } catch {}
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const lancer = (args = []) => chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const nav = await lancer();
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(15000);
await page.bringToFront();
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(`pageerror : ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") erreurs.push(`console : ${m.text()}`); });

const resultats = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });
const juger = (famille, ok, detail) => noter(famille, ESSAI ? !ok : ok, detail);
// le motif du décimal, contre chaque forme qu'il doit voir (une porte qui ne voit pas « 0{,}87 » est verte pour rien)
{
  const muets = ["1,41", "0.52", "0{,}87", "30°", "30^\\circ", "30 degrés"].filter((x) => !DECIMAL.test(x));
  noter("frontiere", muets.length === 0, `le motif du décimal : ${muets.length ? `MUET sur ${muets.join(", ")}` : "6 formes, chacune vue (dont « 0{,}87 » et « ^\\circ »)"}`);
}
process.on("uncaughtException", (e) => {
  for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
  console.log(`  ✘ [execution] la porte s'est ARRÊTÉE en cours de mesure : ${String(e?.stack ?? e).split("\n").slice(0, 3).join(" | ")}`);
  for (const x of erreurs.slice(0, 3)) console.log(`      ${x.slice(0, 240)}`);
  console.log(`\nROUGE — arrêt en cours de mesure, après ${resultats.length} mesure(s) (${resultats.filter((r) => !r.ok).length} rouge(s)).`);
  process.exit(1);
});
const imprimes = [];

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/nombres-complexes-2/media/plan-complexe-rapport.json", import.meta.url), "utf-8"));
const E = descripteur.etapes;
const ID = E.map((e) => e.id);
const juste = (k) => E[k].pari.choix.findIndex((c) => c.juste === true);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-plan-complexe-rapport : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();
{
  const ferme = (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0;
  juger("avant-clic", ferme, "panneau fermé, aucun canvas");
}
const ouvrir = async (q, p) => {
  await p.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: OUVRIR }).click();
  await p.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
};
await ouvrir(panneau, page);
const pret = (await panneau.getAttribute("data-scene-etat")) === "prete";
{
  const trois3 = await page.evaluate(() => window.__THREE__ ?? null);
  const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
  juger("pas-de-3d", trois3 === null && deuxD, `panneau OUVERT : window.__THREE__ ${trois3 ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
}

// ── Outils ──
const deuxImages = (p = page) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n, q = panneau) => q.getAttribute(n);
const installer = (p) => p.evaluate(() => {
  window.__tex = (el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll("[data-reserve]").forEach((r) => r.remove());
    c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(` ${a ? a.textContent : k.textContent} `)); });
    return (c.textContent ?? "").replace(/[\s  ]+/g, " ").trim();
  };
});
await installer(page);
const sansBlanc = (t) => (t ?? "").replace(/\s+/g, "");
const lectures = (q = panneau) => q.evaluate((el) => Object.fromEntries([...el.querySelectorAll("[data-lecture]")].map((d) => [d.getAttribute("data-lecture"), window.__tex(d)])));
/** une sous-partie d'une lecture, par attribut (data-rapport="module", data-vecteur="num"…) */
const part = (sel, q = panneau) => q.evaluate((el, s) => { const e = el.querySelector(s); return e ? window.__tex(e) : null; }, sel);
const etiquette = (nom, q = panneau) => q.evaluate((el, n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); return e && getComputedStyle(e).visibility === "visible" ? window.__tex(e).replace(/\s+/g, "") : ""; }, nom);
const controles = async (q = panneau) => (await q.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const clesLectures = async (q = panneau) => (await q.locator("[data-lecture]").evaluateAll((els) => els.map((e) => e.getAttribute("data-lecture")))).sort().join(",");
const parier = async (i, q = panneau, p = page) => { await q.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(p); await p.waitForTimeout(80); };
const suivant = (q = panneau, p = page) => q.getByRole("button", { name: "Étape suivante" }).click().then(() => deuxImages(p)).then(() => p.waitForTimeout(150));
const cocher = async (ctl, v, q = panneau, p = page) => { await q.locator(`[data-controle="${ctl}"] input[value="${v}"]`).check(); await deuxImages(p); await p.waitForTimeout(30); };
const repere = (nom, q = panneau) => q.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
const texteRendu = (q = panneau) => q.evaluate((el) => `${window.__tex(el)}\n${el.querySelector("canvas")?.getAttribute("aria-label") ?? ""}`);
const legende = (q = panneau) => q.evaluate((el) => { const e = el.querySelector("[data-legende]"); return e ? window.__tex(e).replace(/\s+/g, "") : ""; });
const annonce = (q = panneau) => q.evaluate((el) => el.querySelector("[data-annonce]")?.textContent ?? "");
const jetonCouleur = (nom, p = page) => p.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/** Le canvas classé : 1 = accent, 2 = encre (neutre, à plus de 60 de luminance du fond), 0 = le reste. */
const classer = (q = panneau, ac = accent) => q.evaluate((el, accent) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
  const f = t.getImageData(0, 0, 1, 1).data;
  const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const cf = chroma(f[0], f[1], f[2]);
  const ca = chroma(...accent).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
  const cls = new Uint8Array(cv.width * cv.height);
  let accentN = 0, horsPalette = 0;
  for (let i = 0, k = 0; i < d.length; i += 4, k++) {
    const c = chroma(d[i], d[i + 1], d[i + 2]).map((x, j) => x - cf[j]), nc = Math.hypot(...c);
    const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const cos = nc > 0 ? (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) : 0;
    if (nc > 12 && cos > 0.85) { cls[k] = 1; accentN++; }
    else if (nc < 25 && Math.abs(l - lf) > 60) cls[k] = 2;
    if (nc > 20 && cos < 0.6) horsPalette++;
  }
  window.__cls = { cls, w: cv.width, h: cv.height, dpr, d, lf };
  return { accentN, horsPalette, dpr };
}, ac);

/** L'échelle LUE sur les graduations des deux axes (régression), et le cercle unité en deux demi-cordes. Après `classer`. */
const echelleLue = (q = panneau) => q.evaluate(() => {
  const { cls, w, h, dpr } = window.__cls;
  const encre = (X, Y) => cls[Y * w + X] === 2;
  let yAxe = 0, xAxe = 0, mY = -1, mX = -1;
  for (let Y = 0; Y < h; Y++) { let n = 0; for (let X = 0; X < w; X++) if (encre(X, Y)) n++; if (n > mY) { mY = n; yAxe = Y; } }
  for (let X = 0; X < w; X++) { let n = 0; for (let Y = 0; Y < h; Y++) if (encre(X, Y)) n++; if (n > mX) { mX = n; xAxe = X; } }
  const runs = (vals) => { const c = []; let a = null; vals.forEach((v, k) => { if (v && a === null) a = k; if ((!v || k === vals.length - 1) && a !== null) { const m = (a + (v ? k : k - 1)) / 2 + 0.5; if (m > 9 * dpr && m < vals.length - 9 * dpr) c.push(m); a = null; } }); return c; };
  const off = Math.max(2, Math.round(2 * dpr));
  const cx = runs([...Array(w)].map((_, X) => encre(X, yAxe + off)));
  const cy = runs([...Array(h)].map((_, Y) => encre(xAxe - off, Y)));
  // les graduations d'abord posées sur leur RÉSEAU : en mode lieu, le segment MA coupe la colonne
  // d'étude à 2 px de la graduation 2, et ce trait en plus décalait tous les rangs — 24,6 px par
  // unité en y au lieu de 26,8, un cercle unité « à 13,5 px » (premier lancement). Le pas est la
  // médiane des écarts ; on garde, par rang, la trace la plus proche du réseau, à ≤ 0,2 pas.
  const regresse = (cs, o) => {
    const k0 = cs.findIndex((c) => Math.abs(c - o) <= 1.5);
    if (k0 < 0 || cs.length < 5) return null;
    const ecarts = cs.slice(1).map((c, i) => c - cs[i]).sort((x, y) => x - y);
    const sp = ecarts[Math.floor(ecarts.length / 2)];
    const parRang = new Map();
    for (const c of cs) { const j = Math.round((c - cs[k0]) / sp), e = Math.abs(c - cs[k0] - j * sp); if (e < 0.2 * sp && (!parRang.has(j) || e < parRang.get(j).e)) parRang.set(j, { c, e }); }
    const pts = [...parRang.entries()].map(([j, v]) => [j, v.c]);
    if (pts.length < 5) return null;
    const n = pts.length, sx = pts.reduce((s, p) => s + p[0], 0), sy = pts.reduce((s, p) => s + p[1], 0);
    const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.reduce((s, p) => s + p[0] * p[1], 0);
    const pente = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const res = Math.max(...pts.map((p) => Math.abs(p[1] - (sy / n + pente * (p[0] - sx / n)))));
    return { pente, origine: sy / n - pente * (sx / n), res };
  };
  const gx = regresse(cx, xAxe + 0.5), gy = regresse(cy, yAxe + 0.5);
  if (!gx || !gy) return { ok: false, cx: cx.length, cy: cy.length };
  const Xm = Math.floor(gx.origine + gx.pente * 0.5);
  let bas = null;
  for (let Y = Math.round(gy.origine) + off + 1; Y < Math.min(h, gy.origine + 1.6 * gy.pente); Y++) if (encre(Xm, Y)) { bas = (Y + 0.5 - gy.origine) / dpr; break; }
  const Ym = Math.floor(gy.origine - gy.pente * 0.5);
  let gauche = null;
  for (let X = Math.round(gx.origine) - off - 1; X > Math.max(0, gx.origine - 1.6 * gx.pente); X--) if (encre(X, Ym)) { gauche = (gx.origine - X - 0.5) / dpr; break; }
  return { ok: true, sX: gx.pente / dpr, sY: gy.pente / dpr, o: { x: gx.origine / dpr, y: gy.origine / dpr }, res: Math.max(gx.res, gy.res) / dpr, bas, gauche, larg: w / dpr, haut: h / dpr };
});

/** Un DISQUE cherché autour de la place attendue : le barycentre des pixels du genre, à ≤ 12 px. */
const disque = (att, genre, q = panneau) => q.evaluate((_el, { att, genre }) => {
  const { cls, w, h, dpr } = window.__cls;
  const R = Math.round(3 * dpr), F = Math.round(12 * dpr);
  const cx = Math.round(att.x * dpr), cy = Math.round(att.y * dpr);
  let best = null, bn = -1;
  for (let Y = cy - F; Y <= cy + F; Y++) for (let X = cx - F; X <= cx + F; X++) {
    let n = 0;
    for (let v = -R; v <= R; v++) for (let u = -R; u <= R; u++) { if (u * u + v * v > R * R) continue; const x = X + u, y = Y + v; if (x >= 0 && y >= 0 && x < w && y < h && cls[y * w + x] === genre) n++; }
    const sc = n - 0.01 * Math.hypot(X - cx, Y - cy);
    if (sc > bn) { bn = sc; best = { x: (X + 0.5) / dpr, y: (Y + 0.5) / dpr, n }; }
  }
  if (!best || best.n < 0.7 * Math.PI * R * R) return null;
  const bx = Math.round(best.x * dpr - 0.5), by = Math.round(best.y * dpr - 0.5), R5 = 5 * dpr;
  let sx = 0, sy = 0, n = 0;
  for (let Y = by - Math.ceil(R5); Y <= by + Math.ceil(R5); Y++) for (let X = bx - Math.ceil(R5); X <= bx + Math.ceil(R5); X++) {
    if ((X - bx) ** 2 + (Y - by) ** 2 > R5 * R5 || X < 0 || Y < 0 || X >= w || Y >= h) continue;
    if (cls[Y * w + X] === genre) { sx += X + 0.5; sy += Y + 0.5; n++; }
  }
  return { x: sx / n / dpr, y: sy / n / dpr };
}, { att, genre });

/** La part des points d'un segment (px CSS) qui portent un pixel du genre à ≤ `tol` px. */
const couverture = (a, b, genre, tol = 1.5, q = panneau) => q.evaluate((_el, { a, b, genre, tol }) => {
  const { cls, w, h, dpr } = window.__cls;
  const L = Math.hypot(b.x - a.x, b.y - a.y);
  if (L < 1) return 0;
  let n = 0, oui = 0;
  for (let t = 0; t <= L; t += 1) {
    n++;
    const x = a.x + ((b.x - a.x) * t) / L, y = a.y + ((b.y - a.y) * t) / L;
    let vu = false;
    for (let v = -tol; v <= tol && !vu; v += 0.5) for (let u = -tol; u <= tol && !vu; u += 0.5) {
      const X = Math.floor((x + u) * dpr), Y = Math.floor((y + v) * dpr);
      if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === genre) vu = true;
    }
    if (vu) oui++;
  }
  return oui / n;
}, { a, b, genre, tol });

/**
 * L'ÉPAISSEUR d'un trait (px CSS) en un point, par la COUVERTURE et non par le compte des pixels
 * classés. Deuxième lancement : en comptant les pixels, un trait de 1,75 px en biais et un de 3,5 px
 * à l'horizontale lisaient tous deux « 3,0 px » — l'antialiasing étale le trait fin sur trois pixels
 * pâles. On lit donc la colonne (trait plutôt horizontal) ou la ligne de pixels (trait plutôt
 * vertical) qui passe par le point ; on y prend la plage CONTIGUË de pixels du genre la plus proche
 * du point, élargie d'un pixel de chaque côté (le bord pâle de l'antialiasing, d'aucun genre) ; chaque
 * pixel vaut sa couverture, (fond − lum) / (fond − lum de l'encre), bornée à [0 ; 1]. La section
 * d'une bande de largeur W par une colonne vaut W / |cos θ| : on multiplie par |cos θ|. Exact au
 * continu, indépendant de l'orientation — ce que le compte n'était pas.
 */
const epaisseur = (p, dir, genre, q = panneau) => q.evaluate((el, { p, dir, genre }) => {
  const { cls, w, h, dpr, d, lf } = window.__cls;
  const t0 = document.createElement("canvas").getContext("2d");
  t0.fillStyle = getComputedStyle(el).getPropertyValue(genre === 1 ? "--figure-accent" : "--figure-ink").trim();
  t0.fillRect(0, 0, 1, 1);
  const e = t0.getImageData(0, 0, 1, 1).data;
  const le = 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
  const hor = Math.abs(dir.x) >= Math.abs(dir.y);
  const X0 = Math.floor(p.x * dpr), Y0 = Math.floor(p.y * dpr), R = Math.round(10 * dpr);
  const at = (k) => (hor ? [X0, Y0 + k] : [X0 + k, Y0]);
  const dedans = ([X, Y]) => X >= 0 && Y >= 0 && X < w && Y < h;
  const du = (k) => { const q2 = at(k); return dedans(q2) && cls[q2[1] * w + q2[0]] === genre; };
  // la plage du genre la plus proche de k = 0
  let k0 = null;
  for (let r = 0; r <= R && k0 === null; r++) { if (du(r)) k0 = r; else if (du(-r)) k0 = -r; }
  if (k0 === null) return 0;
  let a = k0, b = k0;
  while (a - 1 >= -R && du(a - 1)) a--;
  while (b + 1 <= R && du(b + 1)) b++;
  let somme = 0;
  for (let k = a - 1; k <= b + 1; k++) {
    const q2 = at(k);
    if (!dedans(q2)) continue;
    const i = (q2[1] * w + q2[0]) * 4, l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    somme += Math.max(0, Math.min(1, (lf - l) / (lf - le)));
  }
  const cos = hor ? Math.abs(dir.x) : Math.abs(dir.y);
  return (somme * cos) / dpr;
}, { p, dir, genre });

/**
 * L'ARC au sommet c, lu sur ses pixels (genre) : on écarte ce qui touche les deux segments, les
 * points et les tracés que la PORTE sait placer elle-même (`exclus` : segments [a, b] et cercles
 * {c, r}, en px CSS — la longueur reportée à S2, les trois courbes de lieu à S4) ; on retient
 * l'anneau le plus peuplé DANS le secteur attendu, puis la plage angulaire CONTIGUË (trous ≤ 10°)
 * qui contient la direction médiane attendue, et l'on rend son ouverture MESURÉE DEPUIS la
 * direction du dénominateur (δ = 0 sur elle).
 *
 * Pourquoi une plage contiguë (premier lancement) : l'anneau d'un arc croise d'autres encres —
 * le filet de l'étiquette « π/6 » à S3, la cote reportée à S2 — qui ajoutaient −11° ou −14° à
 * une ouverture juste. Le secteur et la médiane viennent de la PORTE (arg recalculé), jamais de
 * l'écran : un arc tracé du mauvais côté laisse la médiane VIDE, et la mesure rend null.
 */
const arcLu = (c, pDen, pNum, phi, genre, exclus = [], q = panneau) => q.evaluate((_el, { c, pDen, pNum, phi, genre, exclus }) => {
  const { cls, w, h, dpr } = window.__cls;
  const th1 = Math.atan2(-(pDen.y - c.y), pDen.x - c.x);
  const dSeg = (px, py, a, b) => { const vx = b.x - a.x, vy = b.y - a.y, L = Math.hypot(vx, vy) || 1; const t = Math.max(0, Math.min(1, ((px - a.x) * vx + (py - a.y) * vy) / (L * L))); return Math.hypot(px - a.x - t * vx, py - a.y - t * vy); };
  const loin = (x, y) => exclus.every((e) => (e.r !== undefined ? Math.abs(Math.hypot(x - e.c.x, y - e.c.y) - e.r) >= 4 : dSeg(x, y, e[0], e[1]) >= 4));
  const lo = phi >= 0 ? -Math.PI / 2 : -1.5 * Math.PI;
  const norm = (d) => { let x = d; while (x < lo) x += 2 * Math.PI; while (x >= lo + 2 * Math.PI) x -= 2 * Math.PI; return x; };
  const pts = [];
  for (let Y = 0; Y < h; Y++) for (let X = 0; X < w; X++) {
    if (cls[Y * w + X] !== genre) continue;
    const x = (X + 0.5) / dpr, y = (Y + 0.5) / dpr;
    const r = Math.hypot(x - c.x, y - c.y);
    if (r < 16 || r > 70) continue;
    if (dSeg(x, y, c, pDen) < 4 || dSeg(x, y, c, pNum) < 4 || !loin(x, y)) continue;
    pts.push({ r, d: norm(Math.atan2(-(y - c.y), x - c.x) - th1) });
  }
  const a0 = Math.min(0, phi) - 0.1, a1 = Math.max(0, phi) + 0.1;
  const secteur = pts.filter((p) => p.d >= a0 && p.d <= a1);
  if (secteur.length < 10) return null;
  const hist = new Map();
  for (const p of secteur) hist.set(Math.round(p.r), (hist.get(Math.round(p.r)) ?? 0) + 1);
  const Rm = [...hist.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const deg = new Set(pts.filter((p) => Math.abs(p.r - Rm) <= 2.5).map((p) => Math.round((p.d * 180) / Math.PI)));
  // Deux sortes de degrés sans pixel. (1) Ceux dont le point de l'anneau tombe dans un TRACÉ EXCLU
  // (la cote, les courbes de lieu) : NEUTRES, ils ne rompent pas la plage — troisième lancement : sur
  // le cercle, la droite (AB) coupe l'arc en M et son écart de 16° cassait la plage à −58° au lieu de
  // −90° ; sur la médiatrice, la médiane même de l'arc tombait dans l'écart. (2) Ceux qui tombent
  // sur les deux SEGMENTS : ce sont les bouts naturels de l'arc, ils comptent comme vides (sinon la
  // plage traversait la flèche et ramassait le filet d'une étiquette au-delà). Les deux sortes sont
  // CACHÉES : un bout de plage suivi de degrés cachés jusqu'au bout attendu n'est pas un arc court,
  // c'est un arc qu'on ne voit pas finir — `gCache` / `dCache` disent jusqu'où l'on ne voit rien.
  const surAnneau = (k) => { const a = th1 + (k * Math.PI) / 180; return [c.x + Rm * Math.cos(a), c.y - Rm * Math.sin(a)]; };
  const exclu = (k) => { const [x, y] = surAnneau(k); return !exclus.every((e) => (e.r !== undefined ? Math.abs(Math.hypot(x - e.c.x, y - e.c.y) - e.r) >= 5 : dSeg(x, y, e[0], e[1]) >= 5)); };
  const cache = (k) => { const [x, y] = surAnneau(k); return exclu(k) || dSeg(x, y, c, pDen) < 5 || dSeg(x, y, c, pNum) < 5; };
  const m = Math.round((phi * 90) / Math.PI);
  // le degré PLEIN le plus proche de la médiane, à ≤ 20°, atteint sans traverser de vide
  let pres;
  for (let r = 0; r <= 20 && pres === undefined; r++) for (const k of [m + r, m - r]) if (pres === undefined && deg.has(k)) pres = k;
  if (pres === undefined) return null;
  const etendre = (k, s) => { let bout = k, trou = 0; for (let x = k + s; Math.abs(x - k) < 400; x += s) { if (deg.has(x)) { bout = x; trou = 0; } else if (exclu(x)) continue; else if (++trou > 10) break; } return bout; };
  const g = etendre(pres, -1), d = etendre(pres, 1);
  const auDela = (k, s) => { let x = k; while (Math.abs(x - k) < 400 && cache(x + s)) x += s; return x; };
  const gCache = auDela(g, -1), dCache = auDela(d, 1);
  return { Rm, n: deg.size, min: (g * Math.PI) / 180, max: (d * Math.PI) / 180, minCache: (gCache * Math.PI) / 180, maxCache: (dCache * Math.PI) / 180 };
}, { c, pDen, pNum, phi, genre, exclus });

/**
 * Un arc lu est-il l'arc attendu ? Chaque bout doit tomber à ≤ 0,2 rad du bout attendu — ou le bout
 * attendu doit se trouver dans l'étendue CACHÉE qui prolonge le bout lu (l'arc passe sous une flèche
 * ou sous un tracé exclu, on ne le voit pas finir). Un arc trop court dans une zone VISIBLE rougit.
 */
const arcJuste = (a, phi) => {
  if (!a) return false;
  const lo = Math.min(0, phi), hi = Math.max(0, phi), t = 0.2;
  return lo >= a.minCache - t && lo <= a.min + t && hi >= a.max - t && hi <= a.maxCache + t;
};
const degres = (x) => `${((x * 180) / Math.PI).toFixed(0)}°`;
const lireArc = (a) => `de ${degres(a.min)}${a.minCache < a.min - 0.01 ? ` (caché jusqu'à ${degres(a.minCache)})` : ""} à ${degres(a.max)}${a.maxCache > a.max + 0.01 ? ` (caché jusqu'à ${degres(a.maxCache)})` : ""}`;

// ── L'échelle, et la place que la PORTE calcule pour chaque point ──
let E0 = null;
const px = (z, e = E0) => ({ x: e.o.x + e.sX * z[0], y: e.o.y - e.sY * z[1] });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const unite = (a, b) => { const L = dist(a, b); return { x: (b.x - a.x) / L, y: (b.y - a.y) / L }; };

// ── La formule graduée (§7.5 C) : ce qu'une étape n'a PAS encore le droit d'écrire ──
const FG = {
  module: /(^|[^\p{L}])modules?(?![\p{L}])|\\vert\s*w\\vert|\|w\|/iu,
  argument: /(^|[^\p{L}])arguments?(?![\p{L}])|\\arg/iu,
  angle: /(^|[^\p{L}])angles?(?![\p{L}])/iu,
  longueur: /(^|[^\p{L}])longueurs?(?![\p{L}])/iu,
  distance: /(^|[^\p{L}])distances?(?![\p{L}])/iu,
  quotient: /(^|[^\p{L}])quotients?(?![\p{L}])/iu,
  "rapport des": /rapport des/iu,
  isocèle: /isocèle/iu,
  équilatéral: /équilatéral/iu,
  "rectangle en": /rectangle en/iu,
  aligné: /(^|[^\p{L}])align(é|ée|és|ées)(?![\p{L}])/iu,
  nature: /(^|[^\p{L}])nature(?![\p{L}])/iu,
  ensemble: /(^|[^\p{L}])ensembles?(?![\p{L}])/iu,
  lieu: /(^|[^\p{L}_])lieux?(?![\p{L}])/iu,
  médiatrice: /médiatrice/iu,
  "cercle de": /cercle de/iu,
  "imaginaire pur": /imaginaire pur/iu,
  réel: /(^|[^\p{L}])réels?(?![\p{L}])/iu,
  "ensemble des points": /ensembles? de(s)? points/iu,
  "angle inscrit": /angle inscrit/iu,
  Thalès: /thalès/iu,
};
const INTERDIT = {
  [ID[0]]: ["module", "argument", "angle", "longueur", "distance", "quotient", "rapport des", "isocèle", "équilatéral", "rectangle en", "aligné", "nature", "ensemble", "lieu", "médiatrice", "cercle de"],
  [ID[1]]: ["isocèle", "équilatéral", "rectangle en", "aligné", "imaginaire pur", "réel", "ensemble", "lieu", "médiatrice", "cercle de"],
  [ID[2]]: ["ensemble des points", "lieu", "médiatrice", "angle inscrit", "Thalès"],
  [ID[3]]: [],
};
/**
 * le texte que la formule graduée lit : sans « au lieu de » (une locution, pas un lieu géométrique),
 * ni « l'axe réel » (le NOM d'un axe, pas le critère « w réel » que S3 pose — premier lancement : le
 * retour `valeurs-absolues` de S2 dit « la direction de AC⃗ comptée depuis l'axe réel », et c'est
 * exactement la lecture que ce retour réfute ; le mot y est juste)
 */
const pourFG = (t) => t.replace(/au lieu d/giu, "au_lieu d").replace(/axe (des )?réels?/giu, "axeréel");
async function formule(ou, k) {
  const t = pourFG(await texteRendu());
  const fautes = INTERDIT[ID[k]].filter((c) => FG[c].test(t)).map((c) => `« ${c} » ÉCRIT trop tôt (${t.match(FG[c])?.[0]?.trim()})`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `aucune de [${INTERDIT[ID[k]].join(", ") || "—"}]`}`);
}
{
  // les textes du descripteur, y compris ceux qu'aucun parcours n'affiche (retours non choisis)
  const fautes = [];
  for (const e of E) {
    const textes = [e.consigne, e.titre, e.pari?.question, e.suite, ...(e.pari?.choix ?? []).flatMap((c) => [c.texte, c.retour])].filter(Boolean);
    for (const c of INTERDIT[e.id] ?? []) for (const x of textes) if (FG[c].test(pourFG(x))) fautes.push(`${e.id} : « ${c} » dans « ${x.slice(0, 60)}… »`);
  }
  juger("formule-graduee", fautes.length === 0, `les textes du descripteur (consignes, questions, choix, retours, suites) : ${fautes.length ? fautes.slice(0, 4).join(" ; ") : "aucune forme avant son étape"}`);
}

// ── La frontière (§9), une sonde par FORME ──
const FORMES = [
  ["birapport", /birapport|cocycliques?|quatre points|même cercle/iu],
  ["théorème", /angle inscrit|thalès|théorème des milieux/iu],
  ["similitude", /similitude|(^|[^\p{L}])semblables?(?![\p{L}])/iu],
  ["polaire", /coordonnées polaires|\(\s*r\s*,\s*\\theta\s*\)/iu],
  ["équation de droite", /(^|[^\p{L}\\])y\s*=\s*-?\d*x|x\^2\s*\+\s*y\^2/iu],
];
async function frontiere(ou, q = panneau) {
  const t = await texteRendu(q);
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  const lu = Object.values(await lectures(q)).join(" ");
  if (DECIMAL.test(lu)) vues.push(`un décimal ou un degré dans les LECTURES (${lu.match(DECIMAL)[0]})`);
  const angle = await etiquette("nom-angle", q);
  if (DECIMAL.test(angle)) vues.push(`un décimal ou un degré sur l'ÉTIQUETTE de l'arc (${angle})`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `AFFICHÉ : ${vues.join(" ; ")}` : `aucune des ${FORMES.length} formes interdites ; aucun décimal ni degré dans les lectures ni sur l'arc`}`);
}
async function katex(ou, q = panneau) {
  const brut = await q.evaluate((el) => el.innerText.match(/\\(dfrac|tfrac|frac|sqrt|pi|arg|vert)\b|\$[^$]{1,40}\$/g) ?? []);
  const err = await q.evaluate(erreursKatex);
  juger("katex", !brut.length && !err.length, `${ou} : ${brut.length ? `LaTeX BRUT : ${brut.slice(0, 3).join(", ")} ; ` : ""}${err.length} erreur(s) KaTeX${err.length ? ` (${err.slice(0, 2).map((x) => `${x.forme} « ${x.texte} »`).join(", ")})` : ""}`);
}
async function lecturesEntieres(ou, q = panneau) {
  const r = await q.evaluate((el) => {
    const dl = el.querySelector("[data-lectures]");
    if (!dl) return null;
    const b = dl.getBoundingClientRect();
    const dehors = [];
    let n = 0;
    for (const dd of dl.querySelectorAll("[data-lecture]")) {
      n++;
      for (const k of dd.querySelectorAll(".katex")) {
        if (k.closest("[data-reserve]")) continue;
        const kb = k.getBoundingClientRect();
        if (kb.right > b.right + 0.5 || kb.left < b.left - 0.5) dehors.push(`${dd.getAttribute("data-lecture")} (${Math.round(kb.left - b.left)} → ${Math.round(kb.right - b.left)} px pour ${Math.round(b.width)})`);
      }
    }
    return { n, dehors, largeur: Math.round(b.width) };
  });
  if (!r) return juger("lectures-entieres", false, `${ou} : aucune liste de lectures`);
  juger("lectures-entieres", r.n > 0 && !r.dehors.length, `${ou} : ${r.n} lecture(s) dans ${r.largeur} px — ${r.dehors.length ? `DÉBORDENT : ${r.dehors.join(", ")}` : "chaque formule tient dans la liste"}`);
}
/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre, jamais sur un trait ; au plus six (mode triangle) ou huit (mode lieu, trois noms de courbes). */
async function etiquettesLisibles(ou, budget, q = panneau) {
  const { textes, larg, haut, obstacles, encre } = await q.evaluate((el) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter(visible).filter((e) => (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), ...boite(e) }));
    const obstacles = [...el.querySelectorAll("[data-legende]")].map((e) => ({ nom: "légende", ...boite(e) }));
    const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
    const f = g.getImageData(cv.width - 1, cv.height - 1, 1, 1).data;
    const lum = (r, g2, b) => 0.2126 * r + 0.7152 * g2 + 0.0722 * b;
    const lf = lum(f[0], f[1], f[2]);
    const trait = (d, i) => Math.abs(lum(d[i], d[i + 1], d[i + 2]) - lf) > 60 || Math.abs(d[i] - d[i + 1]) + Math.abs(d[i + 1] - d[i + 2]) > 40;
    for (const a of textes) {
      const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
      const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
      a.encreDessous = 0;
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      for (let i = 0; i < d.length; i += 4) if (trait(d, i)) a.encreDessous++;
    }
    let encre = 0;
    for (const o of obstacles) {
      const d = g.getImageData(Math.max(0, Math.floor(o.x0 * dpr)), Math.max(0, Math.floor(o.y0 * dpr)), Math.max(1, Math.ceil((o.x1 - o.x0) * dpr)), Math.max(1, Math.ceil((o.y1 - o.y0) * dpr))).data;
      for (let i = 0; i < d.length; i += 4) if (trait(d, i)) encre++;
    }
    return { textes, larg: rc.width, haut: rc.height, obstacles, encre };
  });
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    for (const o of obstacles) if (a.x0 < o.x1 - 1 && o.x0 < a.x1 - 1 && a.y0 < o.y1 - 1 && o.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS la légende`);
    if (a.encreDessous > 0) fautes.push(`« ${a.nom} » posée sur ${a.encreDessous} pixel(s) de trait`);
  }
  if (textes.length > budget) fautes.push(`${textes.length} étiquettes à la fois (budget : ${budget})`);
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : `, ni chevauchées, ni sous la légende, dans le cadre, aucune sur un trait, ≤ ${budget}`}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) de trait sous la légende (attendu 0)`);
}

// ── Les mesures d'un ÉTAT du mode triangle, lu aux pixels et aux lectures ──
/** Positions des trois points, placées par la PORTE ; les disques cherchés là. */
async function pointsALeurPlace(T, ou) {
  const f = [];
  const vus = {};
  for (const n of ["A", "B", "C"]) {
    const d = await disque(px(T[n]), 2);
    vus[n] = d;
    if (!d || dist(d, px(T[n])) > 2) f.push(`${n} ${d ? `à ${dist(d, px(T[n])).toFixed(1)} px de sa place` : "INTROUVABLE"}`);
  }
  for (const [a, b] of [["A", "B"], ["A", "C"], ["B", "C"]]) if (dist(px(T[a]), px(T[b])) < 8) f.push(`${a} et ${b} à moins de 8 px`);
  juger("point-a-sa-place", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : "A, B, C dessinés là où leur affixe les met, à ≤ 2 px, et à ≥ 8 px l'un de l'autre"}`);
  return vus;
}
/** Les affixes affichées à côté des points, évaluées : le nombre ÉCRIT est bien le point DESSINÉ. */
async function affixesDesPoints(T, ou) {
  const f = [];
  for (const n of ["A", "B", "C"]) {
    const t = await etiquette(`nom-${n}`);
    const m = t.match(new RegExp(`^${n}\\((.+)\\)$`)) ?? (t.startsWith(n) ? [null, t.slice(1)] : null);
    const v = m && evalTex(m[1]);
    if (!v || Math.abs(v[0] - T[n][0]) > 1e-9 || Math.abs(v[1] - T[n][1]) > 1e-9) f.push(`${n} écrit « ${t} »`);
  }
  juger("nombres", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : "les trois affixes écrites valent les trois points de la spec"}`);
}
/** Les deux flèches : l'épaisse vers le point du DÉNOMINATEUR, et leurs longueurs au rapport |w|. */
async function flechesMesurees(T, s, genre, ou, { rapport = true } = {}) {
  const L = lectureF(T, s);
  const S = px(T[s]), PN = px(T[L.vn]), PD = px(T[L.vd]);
  const dN = unite(S, PN), dD = unite(S, PD);
  // la MÉDIANE sur toute la flèche, pas le maximum de deux points : à S3 l'arc à l'encre croise les
  // deux flèches à ≈ 41 px du sommet, et un point tombé sur lui lisait 3 px sur la flèche FINE
  // (premier lancement : « 3,0 px et 3,0 px » pour 3,5 et 1,75 tracés)
  const mediane = async (P, d) => {
    const L = dist(S, P), v = [];
    for (let t = 14; t <= L - 22; t += 3) v.push(await epaisseur({ x: S.x + d.x * t, y: S.y + d.y * t }, d, genre));
    v.sort((a, b) => a - b);
    return v.length ? v[Math.floor(v.length / 2)] : 0;
  };
  const eN = await mediane(PN, dN), eD = await mediane(PD, dD);
  const cN = await couverture({ x: S.x + dN.x * 9, y: S.y + dN.y * 9 }, { x: PN.x - dN.x * 16, y: PN.y - dN.y * 16 }, genre);
  const cD = await couverture({ x: S.x + dD.x * 9, y: S.y + dD.y * 9 }, { x: PD.x - dD.x * 16, y: PD.y - dD.y * 16 }, genre);
  const ok = cN > 0.9 && cD > 0.9 && eD >= eN + 1;
  juger("numerateur-denominateur-distincts", ok, `${ou} : flèche vers ${L.vd} (dénominateur) ${eD.toFixed(1)} px, vers ${L.vn} (numérateur) ${eN.toFixed(1)} px ; tracées sur ${(cD * 100).toFixed(0)} % et ${(cN * 100).toFixed(0)} % de leur longueur`);
  if (rapport) {
    const w = div(L.num, L.den);
    const lu = dist(S, PN) / dist(S, PD);
    juger("longueurs-au-rapport", Math.abs(lu - abs(w)) <= 0.02 * abs(w) + 0.01, `${ou} : ${s}${L.vn}/${s}${L.vd} mesuré ${lu.toFixed(3)} en pixels, |w| = ${abs(w).toFixed(3)}`);
  }
}
/** L'arc au sommet, attendu depuis la PORTE : de la direction du dénominateur, tourné de arg(w) recalculé. */
async function arcMesure(T, s, genre, ou, exclus = []) {
  const L = lectureF(T, s);
  const phi = argF(div(L.num, L.den));
  const a = await arcLu(px(T[s]), px(T[L.vd]), px(T[L.vn]), phi, genre, exclus);
  juger("arc-au-sommet", arcJuste(a, phi), `${ou} : ${a ? `arc de rayon ${a.Rm} px, ${lireArc(a)} depuis la flèche vers ${L.vd} (attendu 0° → ${degres(phi)})` : "AUCUN arc lu"}`);
}
/** Les lectures d'un état, contre les tables et contre le calcul refait. */
async function nombresTriangle(f, p, s, ou) {
  const T = triangle(f, p), L = lectureF(T, s), w = div(L.num, L.den);
  const lu = await lectures();
  const fautes = [];
  if (lu.w !== undefined) {
    const val = lu.w.replace(/\s/g, "");
    if (val !== TABLE_A[f][s]) fautes.push(`w écrit « ${val} » (table : « ${TABLE_A[f][s]} »)`);
    const v = evalTex(val);
    if (!v || Math.abs(v[0] - w[0]) > 1e-9 || Math.abs(v[1] - w[1]) > 1e-9) fautes.push(`w lu ne vaut pas (z_${L.vn}−z_${s})/(z_${L.vd}−z_${s}) recalculé`);
  }
  if (lu["module-w"] !== undefined) {
    const val = lu["module-w"].replace(/\s/g, "");
    if (val !== TABLE_B[f][s][0]) fautes.push(`|w| écrit « ${val} » (table : « ${TABLE_B[f][s][0]} »)`);
    const v = reel(val);
    if (v === null || Math.abs(v - abs(w)) > 1e-9) fautes.push(`|w| lu ne vaut pas ${abs(w).toFixed(4)}`);
  }
  if (lu["argument-w"] !== undefined) {
    const val = lu["argument-w"].replace(/\s/g, "");
    if (val !== TABLE_B[f][s][1]) fautes.push(`arg(w) écrit « ${val} » (table : « ${TABLE_B[f][s][1]} »)`);
    const v = reel(val);
    if (v === null || Math.abs(v - argF(w)) > 1e-9) fautes.push(`arg(w) lu ne vaut pas ${argF(w).toFixed(4)}`);
  }
  if (lu.vecteurs !== undefined) {
    const nm = sansBlanc(await part('[data-vecteur="num"]')), dn = sansBlanc(await part('[data-vecteur="den"]'));
    const vN = evalTex(nm.split("=").pop()), vD = evalTex(dn.split("=").pop());
    if (!nm.startsWith(`z_${L.vn}-z_${s}=`) || !vN || Math.abs(vN[0] - L.num[0]) > 1e-9 || Math.abs(vN[1] - L.num[1]) > 1e-9) fautes.push(`numérateur lu « ${nm} »`);
    if (!dn.startsWith(`z_${L.vd}-z_${s}=`) || !vD || Math.abs(vD[0] - L.den[0]) > 1e-9 || Math.abs(vD[1] - L.den[1]) > 1e-9) fautes.push(`dénominateur lu « ${dn} »`);
  }
  if (lu.longueurs !== undefined) {
    const t = lu.longueurs.replace(/\s/g, "");
    const exp = `${s}${L.vd}=${TABLE_C[f][0]}et${s}${L.vn}=${TABLE_C[f][1]}`;
    if (s === "A" && t !== exp) fautes.push(`longueurs « ${t} » (attendu « ${exp} »)`);
    const m = t.match(/=(.+?)et.*=(.+)$/);
    const a1 = m && reel(m[1]), a2 = m && reel(m[2]);
    if (!a1 || !a2 || Math.abs(a2 / a1 - abs(w)) > 1e-9) fautes.push("le quotient des deux longueurs lues n'est pas |w|");
  }
  if (lu.nature !== undefined) {
    const t = lu.nature;
    const concl = CONCLUSIONS[f][s];
    if (/aucune des/iu.test(t)) fautes.push("nature : un DÉCOMPTE (« aucune des… »)");
    if (!/\\vert w\\vert/.test(t) || !/\\arg\(w\)/.test(t)) fautes.push("nature : un critère n'est pas écrit");
    const allumes = ["isocèle", "équilatéral", "rectangle", "alignés"].filter((m) => m === "rectangle" ? /rectangle en/iu.test(t) : new RegExp(`⟹\\s*(isocèle en \\S+|${m})`, "iu").test(t) || (m === "équilatéral" && /⟹\s*équilatéral/iu.test(t)));
    const attendus = [...concl].sort().join(",");
    if (allumes.sort().join(",") !== attendus) fautes.push(`nature : conclusions [${allumes.join(", ")}] (attendu [${attendus}])`);
    if (/rien ne s’allume|rien ne s'allume/iu.test(t) !== (concl.length === 0)) fautes.push("nature : « rien ne s'allume » là où il ne le faut pas, ou absent");
  }
  juger("nombres", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `${Object.keys(lu).length} lecture(s), formes et valeurs justes`}`);
  return lu;
}

// ── Le parcours, étape par étape (1 280 px) ──
async function etatPose(k) {
  const e = E[k].etat;
  const lu = { forme: await attr("data-forme"), position: await attr("data-position"), sommet: await attr("data-sommet"), pointM: await attr("data-point-m"), mode: await attr("data-mode"), ph: await attr("data-pari") };
  const ok = Object.entries(e).every(([c, v]) => lu[c === "pointM" ? "pointM" : c] === v) && lu.ph === "attente";
  juger("etapes", ok, `étape ${k + 1} (${ID[k]}) : ${Object.entries(lu).map(([c, v]) => `${c} ${v}`).join(", ")}`);
}
const ENONCEES = { [ID[0]]: "", [ID[1]]: "w", [ID[2]]: "argument-w,module-w,w", [ID[3]]: "" };
const APRES = { [ID[0]]: "vecteurs,w", [ID[1]]: "argument-w,longueurs,module-w,w", [ID[2]]: "argument-w,module-w,nature,w", [ID[3]]: "rapport-lieu" };
const CTRL = { [ID[0]]: "position", [ID[1]]: "forme", [ID[2]]: "sommet", [ID[3]]: "pointM" };
async function avantPari(k) {
  const id = ID[k];
  const { accentN } = await classer();
  const fautes = [];
  if (accentN) fautes.push(`${accentN} px d'accent`);
  const ctl = await controles();
  if (ctl) fautes.push(`contrôles [${ctl}]`);
  const lec = await clesLectures();
  if (lec !== ENONCEES[id]) fautes.push(`lectures [${lec}] (l'énoncé en donne [${ENONCEES[id]}])`);
  if (await repere("angle-droit")) fautes.push("petit carré DESSINÉ");
  if (await repere("report-debut")) fautes.push("longueur reportée DESSINÉE");
  const e = E[k].etat;
  if (e.mode === "triangle") {
    const T = triangle(e.forme, e.position), L = lectureF(T, "A");
    const S = px(T.A), PD = px(T[L.vd]), dD = unite(S, PD);
    const trace = await couverture({ x: S.x + dD.x * 9, y: S.y + dD.y * 9 }, { x: PD.x - dD.x * 16, y: PD.y - dD.y * 16 }, 2);
    if (k === 0 && trace > 0.5) fautes.push("les flèches sont DÉJÀ tracées à S1");
    if (k > 0 && trace < 0.9) fautes.push(`les flèches, énoncé de l'étape ${k + 1}, sont ABSENTES (${(trace * 100).toFixed(0)} %)`);
    const arc = !!(await repere("arc-debut"));
    if (k === 2 && !arc) fautes.push("l'arc en A, énoncé de S3, est ABSENT");
    if (k < 2 && arc) fautes.push("un arc est DÉJÀ tracé");
  } else {
    for (const n of ["courbe-mediatrice", "courbe-cercle", "courbe-droite"]) if (await repere(n)) fautes.push(`${n} DESSINÉE`);
    if (await repere("arc-debut")) fautes.push("un arc en M est DÉJÀ tracé");
  }
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const dits = { [ID[0]]: ["flèche", "vecteur", "quart de tour"], [ID[1]]: ["arc", "reportée"], [ID[2]]: ["carré", "angle droit"], [ID[3]]: ["médiatrice", "courbes"] }[id].filter((m) => desc.includes(m));
  if (dits.length) fautes.push(`la description DIT : ${dits.join(", ")}`);
  juger("avant-pari", fautes.length === 0, `étape ${k + 1} (${id}), avant le pari : ${fautes.length ? fautes.join(" ; ") : `aucun accent, aucun contrôle, lectures = l'énoncé [${ENONCEES[id] || "aucune"}]${k === 1 ? ", les flèches à l'encre" : k === 2 ? ", les flèches et l'arc en A à l'encre" : ""}`}`);
}
async function ouvertApres(k) {
  const id = ID[k];
  const ctl = await controles(), lec = await clesLectures();
  juger("fuite-inter-etapes", ctl === CTRL[id] && lec === APRES[id], `étape ${k + 1} révélée : contrôles [${ctl}] (attendu [${CTRL[id]}]), lectures [${lec}] (attendu [${APRES[id]}])`);
}
async function libelles(ctl) {
  const r = await panneau.locator(`[data-controle="${ctl}"] label`).evaluateAll((ls) => ls.map((l) => ({ vu: window.__tex(l.querySelector("[data-libelle]") ?? l).replace(/\s+/g, ""), aria: l.querySelector("input")?.getAttribute("aria-label") ?? "" })));
  const vus = r.map((x) => x.vu);
  const attendus = LIBELLES[ctl].map((x) => x.replace(/\s+/g, ""));
  const ariaOk = r.every((x) => x.aria && !/\\|\$/.test(x.aria));
  juger("libelles-de-cran", JSON.stringify(vus) === JSON.stringify(attendus) && ariaOk, `contrôle ${ctl} : libellés [${vus.join(" · ")}] (attendu [${attendus.join(" · ")}])${ariaOk ? ", noms lus en clair" : ", un nom lu VIDE ou en TeX"}`);
}
async function badge(attendu, ou) {
  const b = await legende();
  juger("formule-au-sommet", b === attendu.replace(/\s+/g, ""), `${ou} : le badge écrit « ${b} » (attendu « ${attendu} »)`);
}

let T = null;
if (pret) {
  // ── S1 : depuis quel point ──
  await etatPose(0);
  await classer();
  E0 = await echelleLue();
  if (E0.ok) {
    const iso = Math.abs(E0.sX - E0.sY) / E0.sX;
    juger("isotropie", iso <= 0.005 && Math.abs(E0.larg - E0.haut) <= 1, `mode triangle : ${E0.sX.toFixed(3)} px/unité en x, ${E0.sY.toFixed(3)} en y (écart ${(iso * 100).toFixed(2)} %), cadre ${E0.larg.toFixed(0)} × ${E0.haut.toFixed(0)}`);
    juger("palette", E0.bas === null && E0.gauche === null, `mode triangle : ${E0.bas === null && E0.gauche === null ? "aucun cercle unité tracé (il n'y étalonne rien, §5.1)" : `un CERCLE UNITÉ est tracé (demi-cordes ${E0.bas?.toFixed(1)} / ${E0.gauche?.toFixed(1)} px)`}`);
  } else juger("isotropie", false, `échelle illisible (${E0.cx} traits en x, ${E0.cy} en y)`);
  if (E0.ok) {
    T = triangle("rect-isocele", "posee");
    await pointsALeurPlace(T, "étape 1, énoncé");
    await affixesDesPoints(T, "étape 1, énoncé");
    await badge(BADGE.A, "étape 1");
    await avantPari(0);
    await formule("étape 1, avant le pari", 0);
    await katex("étape 1, avant le pari");
    await etiquettesLisibles("étape 1, avant le pari", 6);
    const avant = await annonce();
    await parier(juste(0));
    juger("paris", (await attr("data-pari")) === "revele", `étape 1 : le bon choix révèle (pari « ${await attr("data-pari")} »)`);
    await ouvertApres(0);
    await libelles("position");
    const valeursW = [];
    for (const p of ["posee", "origine", "tournee", "retournee"]) {
      await cocher("position", p);
      if (p === "origine") juger("annonce", (await annonce()) !== avant && /Placement 1/.test(await annonce()), `étape 1 : changer de placement est DIT (« ${(await annonce()).slice(0, 80)} »)`);
      T = triangle("rect-isocele", p);
      await classer();
      await pointsALeurPlace(T, `étape 1, ${p}`);
      await affixesDesPoints(T, `étape 1, ${p}`);
      const lu = await nombresTriangle("rect-isocele", p, "A", `étape 1, ${p}`);
      valeursW.push(sansBlanc(lu.w));
      await flechesMesurees(T, "A", 1, `étape 1, ${p}`);
      const arc = !!(await repere("arc-debut"));
      juger("fuite-inter-etapes", !arc, `étape 1, ${p} : ${arc ? "un ARC est tracé — son étiquette écrirait un argument, interdit à S1" : "aucun arc (décision de construction)"}`);
      await formule(`étape 1, ${p}`, 0);
    }
    juger("invariance-par-placement", new Set(valeursW).size === 1, `étape 1 : w lu aux quatre placements [${valeursW.join(" · ")}] — ${new Set(valeursW).size === 1 ? "le même nombre, la figure seule a bougé" : "w CHANGE avec le placement"}`);
    await katex("étape 1 révélée");
    await lecturesEntieres("étape 1 révélée");
    await frontiere("étape 1 révélée");
    await suivant();

    // ── S2 : deux lectures ──
    await etatPose(1);
    T = triangle("demi-equilateral", "tournee");
    await avantPari(1);
    await nombresTriangle("demi-equilateral", "tournee", "A", "étape 2, énoncé");
    await formule("étape 2, avant le pari", 1);
    await etiquettesLisibles("étape 2, avant le pari", 6);
    await parier(juste(1));
    await ouvertApres(1);
    await libelles("forme");
    for (const f of ["demi-equilateral", "rect-isocele", "equilateral", "aligne"]) {
      await cocher("forme", f);
      T = triangle(f, "tournee");
      await classer();
      await pointsALeurPlace(T, `étape 2, ${f}`);
      await nombresTriangle(f, "tournee", "A", `étape 2, ${f}`);
      await flechesMesurees(T, "A", 2, `étape 2, ${f}`);
      // la longueur REPORTÉE : de A, le long de AB⃗, de longueur AC — lue aux pixels
      const L = lectureF(T, "A"), S = px(T.A), PD = px(T.B), PN = px(T.C), dD = unite(S, PD);
      const nx = -dD.y, ny = dD.x;
      // le côté du numérateur : la projection de AC⃗ sur la normale (un produit SCALAIRE — le premier
      // lancement l'écrivait en produit vectoriel, et cherchait la cote du mauvais côté de AB)
      const cote = (PN.x - S.x) * nx + (PN.y - S.y) * ny;
      const sg = cote > 0 ? -1 : 1;
      const o = { x: S.x + sg * nx * 9, y: S.y + sg * ny * 9 };
      const lNum = dist(S, PN), lDen = dist(S, PD);
      const fin = { x: o.x + dD.x * lNum, y: o.y + dD.y * lNum };
      // l'arc est lu HORS de la cote (sa ligne traverse l'anneau de l'arc à ≈ −13°) — la porte sait où elle est
      await arcMesure(T, "A", 1, `étape 2, ${f}`, [[o, { x: o.x + dD.x * lDen, y: o.y + dD.y * lDen }]]);
      const dessus = await couverture(o, fin, 1, 1.5);
      const au_dela = lDen - lNum > 10 ? await couverture({ x: fin.x + dD.x * 4, y: fin.y + dD.y * 4 }, { x: o.x + dD.x * (lDen - 4), y: o.y + dD.y * (lDen - 4) }, 1, 1) : 0;
      juger("longueurs-au-rapport", dessus > 0.85 && au_dela < 0.2, `étape 2, ${f} : la longueur reportée couvre ${(dessus * 100).toFixed(0)} % du segment [A, A + AC·u⃗_AB] décalé, et ${(au_dela * 100).toFixed(0)} % au-delà (vers B) — attendu ≥ 85 % et < 20 %`);
      await formule(`étape 2, ${f}`, 1);
    }
    await cocher("forme", "demi-equilateral");
    await etiquettesLisibles("étape 2 révélée", 6);
    await katex("étape 2 révélée");
    await lecturesEntieres("étape 2 révélée");
    await frontiere("étape 2 révélée");
    await suivant();

    // ── S3 : depuis quel sommet ──
    await etatPose(2);
    T = triangle("demi-equilateral", "retournee");
    await avantPari(2);
    await classer();
    await arcMesure(T, "A", 2, "étape 3, énoncé (arc à l'ENCRE en A)");
    await nombresTriangle("demi-equilateral", "retournee", "A", "étape 3, énoncé");
    await formule("étape 3, avant le pari", 2);
    await etiquettesLisibles("étape 3, avant le pari", 6);
    await parier(juste(2));
    await ouvertApres(2);
    await libelles("sommet");
    const ws = [];
    for (const s of ["A", "B", "C"]) {
      await cocher("sommet", s);
      await classer();
      await badge(BADGE[s], `étape 3, sommet ${s}`);
      const lu = await nombresTriangle("demi-equilateral", "retournee", s, `étape 3, sommet ${s}`);
      ws.push(sansBlanc(lu.w));
      await flechesMesurees(T, s, 2, `étape 3, sommet ${s}`, { rapport: false });
      // le petit carré : à C, et nulle part ailleurs (l'accent de S3, c'est lui seul)
      const pres = async (n) => q2(px(T[n]));
      const q2 = (c) => panneau.evaluate((_el, c) => { const { cls, w, h, dpr } = window.__cls; let n = 0, sx = 0, sy = 0; for (let Y = Math.floor((c.y - 18) * dpr); Y <= (c.y + 18) * dpr; Y++) for (let X = Math.floor((c.x - 18) * dpr); X <= (c.x + 18) * dpr; X++) if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === 1) { n++; sx += (X + 0.5) / dpr; sy += (Y + 0.5) / dpr; } return { n, x: n ? sx / n : 0, y: n ? sy / n : 0 }; }, c);
      const aC = await pres("C"), aA = await pres("A"), aB = await pres("B");
      const C = px(T.C), dA = unite(C, px(T.A)), dB = unite(C, px(T.B));
      const dedans = aC.n && ((aC.x - C.x) * dA.x + (aC.y - C.y) * dA.y) > 0 && ((aC.x - C.x) * dB.x + (aC.y - C.y) * dB.y) > 0;
      juger("angle-droit-marque", aC.n >= 8 && dedans && aA.n === 0 && aB.n === 0, `étape 3, sommet ${s} : ${aC.n} px d'accent en C (${dedans ? "dans l'angle ACB" : "HORS de l'angle ACB"}), ${aA.n} en A, ${aB.n} en B`);
      if (s === "A") await arcMesure(T, "A", 2, "étape 3 révélée, sommet A");
      else juger("arc-au-sommet", sansBlanc(await etiquette("nom-angle")) === TABLE_B["demi-equilateral"][s][1].replace(/\\dfrac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2"), `étape 3, sommet ${s} : l'étiquette de l'arc écrit « ${await etiquette("nom-angle")} » (attendu ${TABLE_B["demi-equilateral"][s][1]})`);
      await etiquettesLisibles(`étape 3 révélée, sommet ${s}`, 6);
      await formule(`étape 3, sommet ${s}`, 2);
    }
    juger("invariance-par-placement", new Set(ws).size === 3, `étape 3 : w aux trois sommets [${ws.join(" · ")}] — ${new Set(ws).size === 3 ? "trois nombres : la lecture dépend du SOMMET" : "w NE CHANGE PAS avec le sommet"}`);
    await cocher("sommet", "A");
    await katex("étape 3 révélée");
    await lecturesEntieres("étape 3 révélée");
    await frontiere("étape 3 révélée");
    await suivant();

    // ── S4 : le point qui bouge ──
    await etatPose(3);
    await classer();
    const E4 = await echelleLue();
    if (E4.ok) {
      const att = (Math.sqrt(3) / 2) * E4.sX;
      const okC = E4.bas !== null && E4.gauche !== null && Math.abs(E4.bas - att) <= 1.2 && Math.abs(E4.gauche - att) <= 1.2;
      juger("isotropie", okC, `mode lieu : le cercle unité en deux demi-cordes, ${E4.bas?.toFixed(2)} et ${E4.gauche?.toFixed(2)} px (attendu ${att.toFixed(2)} pour √3/2 d'unité)`);
      juger("palette", E4.bas !== null, `mode lieu : ${E4.bas !== null ? "le cercle unité est tracé (distracteur visible du pari)" : "le cercle unité est ABSENT"}`);
    }
    await avantPari(3);
    await badge(BADGE.lieu, "étape 4");
    await formule("étape 4, avant le pari", 3);
    await etiquettesLisibles("étape 4, avant le pari", 6);
    await parier(juste(3));
    await ouvertApres(3);
    await libelles("pointM");
    const balayable = async () => (await panneau.locator('[data-controle="balayage"] input[type="range"]').count()) > 0;
    for (const m of ["libre", "cercle-1", "cercle-2", "mediatrice", "droite"]) {
      await cocher("pointM", m);
      await classer();
      const z = POINT_M[m], u = div(sub(z, ZA_LIEU), sub(z, ZB_LIEU));
      const f = [];
      const d = await disque(px(z), 2);
      if (!d || dist(d, px(z)) > 2) f.push(`M ${d ? `à ${dist(d, px(z)).toFixed(1)} px` : "INTROUVABLE"}`);
      juger("point-a-sa-place", f.length === 0, `étape 4, ${m} : ${f.length ? f.join(" ; ") : "M dessiné là où son affixe le met"}`);
      const mod = sansBlanc(await part('[data-rapport="module"]')), arg = sansBlanc(await part('[data-rapport="argument"]'));
      const fn = [];
      if (mod !== `\\vertu\\vert=${TABLE_E[m][0]}`) fn.push(`|u| écrit « ${mod} » (table « ${TABLE_E[m][0]} »)`);
      if (arg !== `\\arg(u)=${TABLE_E[m][1]}`) fn.push(`arg(u) écrit « ${arg} » (table « ${TABLE_E[m][1]} »)`);
      const vm = reel(mod.split("=").pop()), va = reel(arg.split("=").pop());
      if (vm === null || Math.abs(vm - abs(u)) > 1e-9) fn.push(`|u| ne vaut pas MA/MB = ${abs(u).toFixed(4)}`);
      if (va === null || Math.abs(va - argF(u)) > 1e-9) fn.push(`arg(u) ne vaut pas ${argF(u).toFixed(4)}`);
      juger("nombres", fn.length === 0, `étape 4, ${m} : ${fn.length ? fn.join(" ; ") : `|u| et arg(u) exacts et justes`}`);
      juger("fuite-inter-etapes", (await balayable()) === (m !== "libre"), `étape 4, ${m} : le balayage est ${(await balayable()) ? "OUVERT" : "absent"} (attendu ${m !== "libre" ? "ouvert : M est sur un lieu" : "absent : 2 + 4i n'est sur aucun lieu"})`);
      if (Math.abs(argF(u)) > 1e-9) {
        // les trois courbes de lieu sont à l'accent, comme l'arc : la porte les écarte, elle sait où elles sont
        const courbesLieu = [[px([0, -9]), px([0, 9])], [px([-9, 0]), px([9, 0])], { c: px([0, 0]), r: 2 * E0.sX }];
        const a = await arcLu(px(z), px(ZB_LIEU), px(ZA_LIEU), argF(u), 1, courbesLieu);
        const phi = argF(u);
        juger("arc-au-sommet", arcJuste(a, phi), `étape 4, ${m} : ${a ? `arc en M ${lireArc(a)} depuis MB (attendu → ${degres(phi)})` : "AUCUN arc lu"}`);
      }
    }
    // les TROIS courbes, lues sur l'accent, loin des points
    {
      const f = [];
      // un POINT : un segment de 2 px centré sur lui (le premier lancement passait un segment de 10⁻⁶
      // unité, que `couverture` rend à 0 sous 1 px de long — la famille ne pouvait pas être verte)
      const sur = async (nom, pts) => { let n = 0; for (const p of pts) { const c = px(p); if ((await couverture({ x: c.x - 1, y: c.y }, { x: c.x + 1, y: c.y }, 1, 1.5)) > 0) n++; } if (n < pts.length) f.push(`${nom} : ${n}/${pts.length} points sur l'accent`); };
      await cocher("pointM", "libre");
      await classer();
      await sur("médiatrice", [[0, -7], [0, -5], [0, -3.5], [0, 6.5]]);
      await sur("droite (AB)", [[-7, 0], [-5.5, 0], [6, 0], [7.5, 0]]);
      await sur("cercle de diamètre [AB]", [200, 240, 300, 330].map((a) => [2 * Math.cos((a * Math.PI) / 180), 2 * Math.sin((a * Math.PI) / 180)]));
      juger("courbe-du-lieu", f.length === 0, `étape 4 révélée : ${f.length ? f.join(" ; ") : "les trois courbes tracées à l'accent (médiatrice, droite (AB), cercle de diamètre [AB])"}`);
    }
    await etiquettesLisibles("étape 4 révélée, 2 + 4i", 8);
    // ── le BALAYAGE, lieu par lieu (§6.1) ──
    for (const [m, inv, val, autre] of [["mediatrice", "module", "\\vertu\\vert=1", "argument"], ["cercle-1", "argument", "\\arg(u)=-\\dfrac{\\pi}{2}", "module"], ["droite", "argument", "\\arg(u)=0", "module"]]) {
      await cocher("pointM", m);
      const range = panneau.locator('[data-controle="balayage"] input[type="range"]');
      const haut0 = await panneau.locator('[data-lecture="rapport-lieu"]').evaluate((e) => e.getBoundingClientRect().height);
      await classer();
      const m0 = await disque(px(POINT_M[m]), 2);
      await range.focus();
      const vus = [], ann = [], pos = [];
      let fautes = [];
      for (let k = 0; k < 3; k++) {
        await page.keyboard.press(k === 0 ? "ArrowRight" : "ArrowRight");
        await deuxImages();
        await page.waitForTimeout(40);
        const p = Number(await attr("data-balayage-p"));
        const z = m === "mediatrice" ? [0, p] : m === "droite" ? [p, 0] : [2 * Math.cos((p * Math.PI) / 180), 2 * Math.sin((p * Math.PI) / 180)];
        await classer();
        const d = await disque(px(z), 2);
        pos.push(d);
        if (!d || dist(d, px(z)) > 2) fautes.push(`M hors de sa courbe à p = ${p}`);
        const garde = sansBlanc(await part(`[data-rapport="${inv}"]`)), efface = sansBlanc(await part(`[data-rapport="${autre}"]`));
        vus.push(garde);
        if (garde !== val) fautes.push(`l'invariant écrit « ${garde} » (attendu « ${val} »)`);
        if (efface !== "—") fautes.push(`la ligne ${autre} écrit « ${efface} » pendant le geste`);
        if ((await etiquette("nom-M")) !== "M") fautes.push(`l'étiquette de M écrit « ${await etiquette("nom-M")} » pendant le geste`);
        const ang = await etiquette("nom-angle");
        if (m === "mediatrice" && ang) fautes.push(`l'étiquette de l'arc écrit « ${ang} » sur la médiatrice (positionnelle)`);
        const valueText = await range.getAttribute("aria-valuetext");
        ann.push(valueText);
        const h = await panneau.locator('[data-lecture="rapport-lieu"]').evaluate((e) => e.getBoundingClientRect().height);
        if (Math.abs(h - haut0) > 0.5) fautes.push(`le bloc rapport-lieu passe de ${haut0} à ${h} px`);
      }
      const pas = m0 && pos[0] ? dist(m0, pos[0]) : 0;
      if (pas < 4) fautes.push(`un appui de flèche déplace M de ${pas.toFixed(1)} px (au moins 4)`);
      if (new Set(ann).size < 2 && !ann.every((a) => /toujours/.test(a ?? ""))) fautes.push("la valeur parlée ne varie pas");
      if (!ann.every((a) => (m === "mediatrice" ? /toujours 1/ : m === "droite" ? /toujours 0/ : /−π\/2/).test(a ?? ""))) fautes.push(`la valeur parlée ne contient pas l'invariant (« ${ann[0]} »)`);
      // la BORNE : cinquante appuis, et l'invariant tient toujours
      for (let k = 0; k < 50; k++) await page.keyboard.press(m === "mediatrice" ? "ArrowRight" : "ArrowLeft");
      await deuxImages();
      const pB = Number(await attr("data-balayage-p"));
      const gardeB = sansBlanc(await part(`[data-rapport="${inv}"]`));
      if (gardeB !== val) fautes.push(`à la borne (p = ${pB}), l'invariant écrit « ${gardeB} »`);
      if (m === "cercle-1" && !(pB > 0 && pB < 180)) fautes.push(`le cercle franchit l'axe réel (θ = ${pB}°)`);
      if (m === "droite" && !(pB > 2)) fautes.push(`la droite franchit B (x = ${pB})`);
      await page.keyboard.press("Escape");
      await deuxImages();
      const apres = sansBlanc(await part(`[data-rapport="${inv}"]`)), apresAutre = sansBlanc(await part(`[data-rapport="${autre}"]`));
      if ((await attr("data-balayage")) !== "non" || apres !== val || apresAutre === "—") fautes.push("Échap ne remet pas M à sa place, ou les lectures ne reviennent pas");
      juger("balayage-invariants", fautes.length === 0, `étape 4, balayage sur ${m} : ${fautes.length ? fautes.join(" ; ") : `« ${val} » tenu à trois positions et à la borne, l'autre ligne en « — » à hauteur constante, M sur sa courbe, pas de ${pas.toFixed(1)} px, la valeur parlée varie et dit l'invariant`}`);
    }
    await katex("étape 4 révélée");
    await lecturesEntieres("étape 4 révélée");
    await frontiere("étape 4 révélée");
  }
}

// ── La table des étapes, réécrite ICI contre le descripteur ──
{
  const f = [];
  const attendu = [["position"], ["forme"], ["sommet"], ["pointM", "balayage"]];
  E.forEach((e, k) => { if (JSON.stringify(e.controles) !== JSON.stringify(attendu[k])) f.push(`${e.id} ouvre [${e.controles.join(", ")}]`); });
  for (const e of E) if (e.pari.choix.length !== 4 || e.pari.choix.filter((c) => c.juste).length !== 1 || e.pari.choix.some((c) => !c.retour)) f.push(`${e.id} : pari mal formé`);
  juger("paris", f.length === 0, `descripteur : ${f.length ? f.join(" ; ") : "un contrôle neuf par étape ; quatre paris de quatre choix, un seul juste, un retour chacun"}`);
}

// ── Au téléphone (390 px) : l'isotropie, les étiquettes aux quatre étapes, et S3 (le plus encombré) ──
if (pret) {
  const nav2 = await lancer();
  try {
    const ctx2 = await nav2.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const p2 = await ctx2.newPage();
    await p2.bringToFront();
    await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
    await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    await installer(p2);
    const q = p2.locator(`[data-scene="${SCENE}"]`);
    await q.scrollIntoViewIfNeeded();
    await ouvrir(q, p2);
    await classer(q);
    const e2 = await echelleLue(q);
    juger("isotropie", e2.ok && Math.abs(e2.sX - e2.sY) / e2.sX <= 0.005, `390 px : ${e2.ok ? `${e2.sX.toFixed(3)} / ${e2.sY.toFixed(3)} px par unité` : "échelle illisible"}`);
    for (let k = 0; k < 4; k++) {
      await etiquettesLisibles(`390 px, étape ${k + 1}, avant le pari`, 6, q);
      await parier(juste(k), q, p2);
      await p2.waitForTimeout(120);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, k === 3 ? 8 : 6, q);
      await lecturesEntieres(`390 px, étape ${k + 1} révélée`, q);
      if (k === 2) for (const s of ["B", "C"]) { await cocher("sommet", s, q, p2); await etiquettesLisibles(`390 px, étape 3, sommet ${s}`, 6, q); await lecturesEntieres(`390 px, étape 3, sommet ${s}`, q); }
      if (k === 3) for (const m of ["cercle-1", "cercle-2", "mediatrice", "droite"]) { await cocher("pointM", m, q, p2); await etiquettesLisibles(`390 px, étape 4, ${m}`, 8, q); }
      if (k < 3) await suivant(q, p2);
    }
    await p2.evaluate(() => document.documentElement.style.setProperty("--font-scale", "1.125"));
    await p2.waitForTimeout(120);
    await lecturesEntieres("390 px, texte A+ (×1,125), étape 4", q);
    await p2.evaluate(() => document.documentElement.style.removeProperty("--font-scale"));
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie ──
if (pret) await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR });
{
  const seules = erreurs.filter((x) => !/favicon|404/.test(x));
  juger("console", seules.length === 0, `${seules.length} erreur(s) de page${seules.length ? ` : ${seules.slice(0, 2).join(" | ")}` : ""}`);
}

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-plan-complexe-rapport : le rapport lu depuis un sommet (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
for (const x of imprimes) console.log(`  ○ ${x}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = [...new Set(resultats.map((r) => r.famille))];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  const muettes = visees.filter((f) => !crient.includes(f));
  console.log(`\n  familles qui crient : ${crient.length}/${visees.length}`);
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille rougit quand on inverse son jugement.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
