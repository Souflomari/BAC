#!/usr/bin/env node
/**
 * scene-plan-complexe — la porte du « plan complexe »
 * (maths/nombres-complexes-2, en tête de R5 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et
 * trouve son panneau par `[data-scene="plan-complexe-transformation"]`. La scène
 * est ANALYTIQUE : la porte refait chaque NOMBRE par sa propre arithmétique (les
 * crans de la spec, écrits ICI, en flottants) — et, particularité de cette scène,
 * elle compare des FORMES EXACTES : « 2\sqrt{5} » et « 4,47 » sont le même nombre
 * et pas la même réponse (spec §11). Deux mesures par lecture : (a) l'égalité de
 * CHAÎNE contre les tables de la spec (§5.3), recopiées ici ; (b) l'égalité
 * NUMÉRIQUE à 10⁻⁹ entre la chaîne LUE, évaluée par un petit lecteur de TeX, et
 * le calcul flottant refait — pour attraper une belle forme exacte qui ne vaut
 * pas le bon nombre.
 *
 * Les PIXELS sont lus dans les deux sens. L'échelle est LUE sur les graduations
 * des deux axes (régression sur les traits), jamais prise au produit ; le cercle
 * unité est mesuré en deux cordes ; les points sont cherchés comme des DISQUES
 * autour de la place que la porte calcule ; l'arc est lu sur ses pixels d'accent,
 * et ses deux extrémités comparées aux deux directions.
 *
 * LES FAMILLES (spec §11, amendées par la construction) : avant-clic · pas-de-3d
 * · etapes · paris · avant-pari · nombres (N1…N10, aux 70 + 15 états) ·
 * isotropie · quadrillage-opaque · point-a-sa-place · colineaires ·
 * longueurs-au-rapport · arc-entre-les-bonnes-directions · point-fixe-immobile
 * · une-seule-etiquette-au-point-fixe · balayage-invariants · lectures-entieres · palette ·
 * formule-graduee · fuite-inter-etapes · frontiere · katex · etiquettes ·
 * etiquettes-pres · cadre · immobile · annonce · theme · console · ergonomie.
 *
 * Ce que la porte NE mesure PAS, écrit à côté de ce qu'elle mesure (ADR 0035) :
 * le PAS des graduations (tous les 1 ou tous les 2 selon la largeur) — elle lit
 * l'échelle sur les TRAITS, qui existent à toutes les unités, et les nombres ne
 * portent aucune information que les traits n'aient ; la forme des flèches des
 * axes ; les noms u⃗, v⃗ (peints, sans repère). Et `eclairs` (spec §11.3) devient
 * `immobile` : rien n'anime cette scène, sauf la main.
 *
 *   node scripts/scene-plan-complexe.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-plan-complexe.mjs --essai-rouge  (chaque famille doit crier ;
 *                                                        chaque forme injectée, vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_PLAN ?? 3860 + (process.pid % 60));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/nombres-complexes-2";
const SCENE = "plan-complexe-transformation";
const OUVRIR = "Ouvrir le plan complexe";

// ── La seconde voie : les crans de la SPEC (§5.2), en flottants, rien du produit ──
const R3 = Math.sqrt(3);
const COEF = { "2": [2, 0], "0.5": [0.5, 0], i: [0, 1], "-2": [-2, 0], "1+i": [1, 1], "2i": [0, 2], "sqrt3+i": [R3, 1] };
const POINT = { "1+i": [1, 1], "2i": [0, 2], "2": [2, 0], "4": [4, 0], "1-i": [1, -1] };
const CENTRE = { O: [0, 0], A: [2, 0] };
const FORMULE = { "rotation-A": { a: [0, 1], b: [2, -2] }, "homothetie-A": { a: [2, 0], b: [-2, 0] }, "les-deux": { a: [1, 1], b: [1, -1] } };
// l'ORDRE des crans, écrit — pas `Object.keys` : JavaScript range d'abord les clés qui
// ressemblent à des entiers (« 2 », « 4 »), et la table A se lisait dans le désordre
// (premier passage de la porte : 135 rouges, dont une centaine venaient de là)
const COEFS = ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"], POINTS = ["1+i", "2i", "2", "4", "1-i"];
const add = (u, v) => [u[0] + v[0], u[1] + v[1]];
const sub = (u, v) => [u[0] - v[0], u[1] - v[1]];
const mul = (u, v) => [u[0] * v[0] - u[1] * v[1], u[0] * v[1] + u[1] * v[0]];
const div = (u, v) => { const n = v[0] * v[0] + v[1] * v[1]; return [(u[0] * v[0] + u[1] * v[1]) / n, (u[1] * v[0] - u[0] * v[1]) / n]; };
const abs = (u) => Math.hypot(u[0], u[1]);
const proche = (u, v, e = 1e-9) => Math.abs(u[0] - v[0]) < e && Math.abs(u[1] - v[1]) < e;
/** La transformation, par la seconde voie : z' depuis a ET b ; ω deux fois — b/(1−a), et la résolution de (1−a)ω = b en réels. */
function transfo(c, centre, enonce) {
  if (enonce === "coefficient") {
    const a = COEF[c], w = CENTRE[centre];
    return { a, b: mul(w, sub([1, 0], a)), w, w2: w };
  }
  const { a, b } = FORMULE[enonce];
  const w = div(b, sub([1, 0], a));
  // (1−a)ω = b, écrit en réels : [p −q ; q p]·[x ; y] = [b0 ; b1], p = 1 − a0, q = −a1 ; Cramer
  const p = 1 - a[0], q = -a[1], det = p * p + q * q;
  const w2 = [(b[0] * p + b[1] * q) / det, (b[1] * p - b[0] * q) / det];
  return { a, b, w, w2 };
}
const image = (t, z) => add(mul(t.a, z), t.b);

// ── Les tables du §5.3, recopiées de la SPEC — dans la FORME que le produit écrit (ADR 0039) ──
// Les étiquettes du plan portent le \tfrac du modèle ; les LECTURES, la fraction pleine.
const TABLE_A = {
  "2": ["2+2i", "4i", "4", "8", "2-2i"],
  "0.5": ["\\tfrac{1}{2}+\\tfrac{1}{2}\\,i", "i", "1", "2", "\\tfrac{1}{2}-\\tfrac{1}{2}\\,i"],
  i: ["-1+i", "-2", "2i", "4i", "1+i"],
  "-2": ["-2-2i", "-4i", "-4", "-8", "-2+2i"],
  "1+i": ["2i", "-2+2i", "2+2i", "4+4i", "2"],
  "2i": ["-2+2i", "-4", "4i", "8i", "2+2i"],
  "sqrt3+i": ["(\\sqrt{3}-1)+(\\sqrt{3}+1)i", "-2+2\\sqrt{3}\\,i", "2\\sqrt{3}+2i", "4\\sqrt{3}+4i", "(\\sqrt{3}+1)+(1-\\sqrt{3})i"],
};
const TABLE_E = {
  "les-deux": { w: "1+i", zp: ["1+i", "-1+i", "3+i", "5+3i", "3-i"], a: "1+i" },
  "homothetie-A": { w: "2", zp: ["2i", "-2+4i", "2", "6", "-2i"], a: "2" },
  "rotation-A": { w: "2", zp: ["1-i", "-2i", "2", "2+2i", "3-i"], a: "i" },
};
const TEX_POINT = { "1+i": "1+i", "2i": "2i", "2": "2", "4": "4", "1-i": "1-i" };
const MODULE = { "2": "2", "0.5": "\\dfrac{1}{2}", i: "1", "-2": "2", "1+i": "\\sqrt{2}", "2i": "2", "sqrt3+i": "2" };
const ARG = { "2": "0", "0.5": "0", i: "\\dfrac{\\pi}{2}", "-2": "\\pi", "1+i": "\\dfrac{\\pi}{4}", "2i": "\\dfrac{\\pi}{2}", "sqrt3+i": "\\dfrac{\\pi}{6}" };
const MODULE_A = { "rotation-A": "1", "homothetie-A": "2", "les-deux": "\\sqrt{2}" };
const ARG_A = { "rotation-A": "\\dfrac{\\pi}{2}", "homothetie-A": "0", "les-deux": "\\dfrac{\\pi}{4}" };
const DEVELOPPEE = { "rotation-A": "z'=i\\,z+2-2i", "homothetie-A": "z'=2\\,z-2", "les-deux": "z'=(1+i)\\,z+1-i" };

/**
 * Le LECTEUR de TeX de la porte (sa propre voie, pas celle du modèle) : nombres,
 * i, \pi, \sqrt{n}, \dfrac|\tfrac|\frac{·}{·}, parenthèses, + − et le produit
 * implicite. Rend un complexe [re, im], ou null si la chaîne sort de ce petit
 * langage — ce qui, sur une lecture, est déjà un défaut.
 */
function evalTex(s) {
  const t = s.replace(/\\,|\\;|\\!|\s/g, "").replace(/−/g, "-");
  let i = 0;
  const voir = (x) => t.startsWith(x, i);
  const prendre = (x) => { if (!voir(x)) throw new Error(`attendu ${x} à ${i} dans ${t}`); i += x.length; };
  function groupe() { prendre("{"); const v = expr(); prendre("}"); return v; }
  function facteur() {
    const m = /^\d+/.exec(t.slice(i));
    if (m) { i += m[0].length; return [Number(m[0]), 0]; }
    if (voir("i")) { i++; return [0, 1]; }
    if (voir("\\pi")) { i += 3; return [Math.PI, 0]; }
    if (voir("\\sqrt")) { i += 5; const v = voir("{") ? groupe() : (() => { const d = /^\d/.exec(t.slice(i)); i++; return [Number(d[0]), 0]; })(); return [Math.sqrt(v[0]), 0]; }
    for (const f of ["\\dfrac", "\\tfrac", "\\frac"]) if (voir(f)) { i += f.length; const n = groupe(), d = groupe(); return div(n, d); }
    if (voir("(")) { i++; const v = expr(); prendre(")"); return v; }
    throw new Error(`facteur inattendu à ${i} dans ${t}`);
  }
  function terme() {
    let v = facteur();
    while (i < t.length && !voir("+") && !voir("-") && !voir(")") && !voir("}")) v = mul(v, facteur());
    return v;
  }
  function expr() {
    let signe = 1;
    if (voir("-")) { i++; signe = -1; } else if (voir("+")) i++;
    let v = terme().map((x) => x * signe);
    while (voir("+") || voir("-")) { const s2 = voir("-") ? -1 : 1; i++; v = add(v, terme().map((x) => x * s2)); }
    return v;
  }
  try { const v = expr(); return i === t.length ? v : null; } catch { return null; }
}
/** Un argument lu (« \dfrac{\pi}{6} », « -\dfrac{\pi}{12} », « \pi », « 0 ») → sa valeur réelle, ou null. */
const evalArg = (s) => { const v = evalTex(s); return v && Math.abs(v[1]) < 1e-12 ? v[0] : null; };
const DECIMAL = /\d\s*[.,]\s*\d|\{,\}|°|degré|(^|[^\p{L}])deg(?![\p{L}])/u;

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  // LE BANC D'ABORD (ADR 0035) : si un serveur répond DÉJÀ sur ce port, le nôtre ne s'y lierait
  // pas, et la porte mesurerait l'ancien — un autre build que celui qu'elle croit juger
  if (await fetch(BASE + "/").then(() => true, () => false)) {
    console.error(`scene-plan-complexe : un serveur répond déjà sur le port ${PORT} — il serait mesuré à la place du build. L'arrêter, ou choisir PORT_PLAN.`);
    process.exit(1);
  }
  const journal = `${os.tmpdir()}/scene-plan-complexe-${PORT}-${process.pid}.log`;
  const fd = fs.openSync(journal, "w");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: ["ignore", fd, fd], detached: true });
  let vivant = false;
  for (let k = 0; k < 60; k++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-plan-complexe : `next start` n'a pas répondu. Build absent ?");
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
// UNE PORTE QUI MEURT EN COURS DE MESURE perdait tout ce qu'elle avait déjà vu : une exception
// (un clic que le panneau, planté, ne prend plus) sortait sans rien imprimer, et la campagne de
// sabotages lisait « MANQUÉ » là où la porte avait déjà rougi trois fois (campagne du plan
// complexe, 2026-09-25 : deux sabotages de calcul plantaient le rendu à l'étape 3). Elle imprime
// désormais ce qu'elle a mesuré, puis l'ARRÊT lui-même, rouge, avec les erreurs de la page.
process.on("uncaughtException", (e) => {
  for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
  console.log(`  ✘ [execution] la porte s'est ARRÊTÉE en cours de mesure : ${String(e?.message ?? e).split("\n")[0]}`);
  for (const x of erreurs.slice(0, 3)) console.log(`      ${x.slice(0, 240)}`);
  console.log(`\nROUGE — arrêt en cours de mesure, après ${resultats.length} mesure(s) (${resultats.filter((r) => !r.ok).length} rouge(s)).`);
  process.exit(1);
});
/** Ce qui s'IMPRIME sans compter (ni mesure, ni rouge) : les règles de la maison (ADR 0039) */
const imprimes = [];

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/nombres-complexes-2/media/plan-complexe-transformation.json", import.meta.url), "utf-8"));
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
if (!chapitre) { console.error(`scene-plan-complexe : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();
{
  const ferme = (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0;
  juger("avant-clic", ferme, "panneau fermé, aucun canvas");
}
await page.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
await panneau.getByRole("button", { name: OUVRIR }).click();
await page.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
const pret = (await panneau.getAttribute("data-scene-etat")) === "prete";
{
  const trois3 = await page.evaluate(() => window.__THREE__ ?? null);
  const webgl = await page.evaluate(() => [...document.querySelectorAll("canvas")].some((c) => { try { return !!(c.getContext("webgl2") || c.getContext("webgl")) && false; } catch { return false; } }));
  const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
  juger("pas-de-3d", trois3 === null && deuxD && !webgl, `panneau OUVERT : window.__THREE__ ${trois3 ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
}

// ── Outils ──
const deuxImages = (p = page) => p.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n) => panneau.getAttribute(n);
/**
 * Le TeX d'un nœud : chaque formule KaTeX remplacée par sa source (l'annotation),
 * le reste en texte (ADR 0039 : la forme que le produit ÉCRIT). Installé une fois
 * par page sur `window` — pas de `new Function` dans la page, qu'une CSP refuserait.
 */
const installer = (p) => p.evaluate(() => {
  window.__tex = (el) => {
    const c = el.cloneNode(true);
    // ce qui est RÉSERVÉ (invisible et muet, pour garder une hauteur) n'est ni vu ni entendu : pas lu
    c.querySelectorAll("[data-reserve]").forEach((r) => r.remove());
    c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(` ${a ? a.textContent : k.textContent} `)); });
    return (c.textContent ?? "").replace(/[\s  ]+/g, " ").trim();
  };
});
await installer(page);
const lectures = (q = panneau) => q.evaluate((el) => Object.fromEntries([...el.querySelectorAll("[data-lecture]")].map((d) => [d.getAttribute("data-lecture"), window.__tex(d)])));
/** Une étiquette du plan, en TeX ; "" si cachée ou vide. */
const etiquette = (nom, q = panneau) => q.evaluate((el, n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); return e && getComputedStyle(e).visibility === "visible" ? window.__tex(e).replace(/\s+/g, "") : ""; }, nom);
const controles = async (q = panneau) => (await q.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i, q = panneau, p = page) => { await q.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(p); await p.waitForTimeout(80); };
const suivant = (q = panneau, p = page) => q.getByRole("button", { name: "Étape suivante" }).click().then(() => deuxImages(p)).then(() => p.waitForTimeout(150));
const cocher = async (ctl, v, q = panneau, p = page) => { await q.locator(`[data-controle="${ctl}"] input[value="${v}"]`).check(); await deuxImages(p); await p.waitForTimeout(20); };
/** Un repère (étiquette sans texte), en px CSS relatifs au canvas ; null s'il n'est pas visible. */
const repere = (nom, q = panneau) => q.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
/** Le texte du panneau dans la forme que le PRODUIT écrit, description lue comprise. */
const texteRendu = (q = panneau) => q.evaluate((el) => `${window.__tex(el)}\n${el.querySelector("canvas")?.getAttribute("aria-label") ?? ""}`);
const jetonCouleur = (nom, p = page) => p.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/**
 * Le canvas, classé pixel par pixel (px de l'appareil) : 1 = accent (fort ou
 * lissé), 2 = encre (neutre, à plus de 60 de luminance du fond), 0 = le reste.
 * Un pixel TEINTÉ hors de l'accent est hors palette. Gardé en `window.__cls`.
 */
const classer = (q = panneau) => q.evaluate((el, accent) => {
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
  window.__cls = { cls, w: cv.width, h: cv.height, dpr, d, f: [f[0], f[1], f[2]] };
  return { accentN, horsPalette, dpr };
}, accent);

/**
 * L'ÉCHELLE, LUE (jamais prise au produit) : la rangée de l'axe réel et la colonne
 * de l'axe imaginaire sont celles qui portent le plus d'encre ; les traits des
 * graduations, lus dans la rangée juste SOUS l'axe réel et la colonne juste à
 * GAUCHE de l'axe imaginaire, donnent par régression le nombre de px par unité
 * sur chaque axe, et l'origine. Le cercle unité est lu en deux demi-cordes, à
 * x = ½ (vers le bas) et à y = ½ (vers la gauche) : √3/2 d'unité chacune si le
 * repère est isotrope. À appeler après `classer`.
 */
const echelleLue = (q = panneau) => q.evaluate(() => {
  const { cls, w, h, dpr } = window.__cls;
  const encre = (X, Y) => cls[Y * w + X] === 2;
  let yAxe = 0, xAxe = 0, mY = -1, mX = -1;
  for (let Y = 0; Y < h; Y++) { let n = 0; for (let X = 0; X < w; X++) if (encre(X, Y)) n++; if (n > mY) { mY = n; yAxe = Y; } }
  for (let X = 0; X < w; X++) { let n = 0; for (let Y = 0; Y < h; Y++) if (encre(X, Y)) n++; if (n > mX) { mX = n; xAxe = X; } }
  // le centre d'une plage, en coordonnées de pixel (le pixel k couvre [k, k+1]) ; les plages à
  // moins de 9 px d'un bord sont les POINTES des axes, pas des graduations
  const runs = (vals) => { const c = []; let a = null; vals.forEach((v, k) => { if (v && a === null) a = k; if ((!v || k === vals.length - 1) && a !== null) { const m = (a + (v ? k : k - 1)) / 2 + 0.5; if (m > 9 * dpr && m < vals.length - 9 * dpr) c.push(m); a = null; } }); return c; };
  const off = Math.max(2, Math.round(2 * dpr));
  const cx = runs([...Array(w)].map((_, X) => encre(X, yAxe + off)));
  const cy = runs([...Array(h)].map((_, Y) => encre(xAxe - off, Y)));
  const regresse = (cs, o) => {
    const k0 = cs.findIndex((c) => Math.abs(c - o) <= 1.5);
    if (k0 < 0 || cs.length < 5) return null;
    const pts = cs.map((c, j) => [j - k0, c]);
    const n = pts.length, sx = pts.reduce((s, p) => s + p[0], 0), sy = pts.reduce((s, p) => s + p[1], 0);
    const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.reduce((s, p) => s + p[0] * p[1], 0);
    const pente = (n * sxy - sx * sy) / (n * sxx - sx * sx);
    const res = Math.max(...pts.map((p) => Math.abs(p[1] - (sy / n + pente * (p[0] - sx / n)))));
    return { pente, origine: sy / n - pente * (sx / n), n, gauche: k0, droite: n - 1 - k0, res };
  };
  const gx = regresse(cx, xAxe + 0.5), gy = regresse(cy, yAxe + 0.5);
  if (!gx || !gy) return { ok: false, cx: cx.length, cy: cy.length };
  const sX = gx.pente / dpr, sY = gy.pente / dpr; // px CSS par unité (Y compte vers le BAS)
  const o = { x: gx.origine / dpr, y: gy.origine / dpr };
  // demi-cordes du cercle unité
  const Xm = Math.floor(gx.origine + gx.pente * 0.5);
  let bas = null;
  for (let Y = Math.round(gy.origine) + off + 1; Y < Math.min(h, gy.origine + 1.6 * gy.pente); Y++) if (encre(Xm, Y)) { bas = (Y + 0.5 - gy.origine) / dpr; break; }
  const Ym = Math.floor(gy.origine - gy.pente * 0.5);
  let gauche = null;
  for (let X = Math.round(gx.origine) - off - 1; X > Math.max(0, gx.origine - 1.6 * gx.pente); X--) if (encre(X, Ym)) { gauche = (gx.origine - X - 0.5) / dpr; break; }
  return { ok: true, sX, sY, o, ticksX: [gx.gauche, gx.droite], ticksY: [gy.gauche, gy.droite], res: Math.max(gx.res, gy.res) / dpr, bas, gauche, larg: w / dpr, haut: h / dpr };
});

/** Un DISQUE (M, M′) cherché autour de la place attendue : le pixel qui voit le plus de pixels du genre donné à ≤ 3 px. */
const disque = (att, genre, q = panneau) => q.evaluate((_el, { att, genre }) => {
  const { cls, w, h, dpr } = window.__cls;
  const R = Math.round(3 * dpr), F = Math.round(12 * dpr);
  const cx = Math.round(att.x * dpr), cy = Math.round(att.y * dpr);
  let best = null, bn = -1;
  for (let Y = cy - F; Y <= cy + F; Y++) for (let X = cx - F; X <= cx + F; X++) {
    let n = 0;
    for (let v = -R; v <= R; v++) for (let u = -R; u <= R; u++) { if (u * u + v * v > R * R) continue; const x = X + u, y = Y + v; if (x >= 0 && y >= 0 && x < w && y < h && (genre === 0 ? cls[y * w + x] !== 0 : cls[y * w + x] === genre)) n++; }
    // à égalité (deux disques pleins dans la fenêtre : M et M′ à c = ½), le plus proche de la place attendue
    const sc = n - 0.01 * Math.hypot(X - cx, Y - cy);
    if (sc > bn) { bn = sc; best = { x: (X + 0.5) / dpr, y: (Y + 0.5) / dpr, n }; }
  }
  const plein = Math.PI * R * R;
  if (!best || best.n < 0.7 * plein) return null;
  // le CENTRE, au sous-pixel : le barycentre des pixels du disque à ≤ 5 px de l'argmax — le
  // halo de surface (1,5 px) posé sous chaque disque masque les traits qui y arrivent, il
  // ne reste là que le disque ; l'argmax seul est au pixel près, et deux pixels d'erreur sur
  // un rapport de longueurs en font 3 % (premier passage de la porte)
  const bx = Math.round(best.x * dpr - 0.5), by = Math.round(best.y * dpr - 0.5), R5 = 5 * dpr;
  let sx = 0, sy = 0, n = 0;
  for (let Y = by - Math.ceil(R5); Y <= by + Math.ceil(R5); Y++) for (let X = bx - Math.ceil(R5); X <= bx + Math.ceil(R5); X++) {
    if ((X - bx) ** 2 + (Y - by) ** 2 > R5 * R5 || X < 0 || Y < 0 || X >= w || Y >= h) continue;
    const c = cls[Y * w + X];
    if (genre === 0 ? c !== 0 : c === genre) { sx += X + 0.5; sy += Y + 0.5; n++; }
  }
  return { x: sx / n / dpr, y: sy / n / dpr, n: best.n };
}, { att, genre });

/**
 * L'ARC, lu sur ses pixels d'accent autour du centre : on écarte ce qui touche la
 * droite (ΩM′) et le disque M′, on garde l'anneau le plus peuplé, et l'on rend
 * l'ouverture, mesurée DEPUIS la direction ΩM (δ = 0 sur ΩM), et où pèse la pointe.
 */
const arcLu = (c, m, mp, phi, q = panneau) => q.evaluate((_el, { c, m, mp, phi }) => {
  const { cls, w, h, dpr } = window.__cls;
  const th1 = Math.atan2(-(m.y - c.y), m.x - c.x);
  const pts = [];
  const dl = (px, py) => { const vx = mp.x - c.x, vy = mp.y - c.y, L = Math.hypot(vx, vy) || 1; const t = Math.max(0, Math.min(1, ((px - c.x) * vx + (py - c.y) * vy) / (L * L))); return Math.hypot(px - c.x - t * vx, py - c.y - t * vy); };
  for (let Y = 0; Y < h; Y++) for (let X = 0; X < w; X++) {
    if (cls[Y * w + X] !== 1) continue;
    const x = (X + 0.5) / dpr, y = (Y + 0.5) / dpr;
    const r = Math.hypot(x - c.x, y - c.y);
    if (r < 16 || r > 80) continue;
    if (dl(x, y) < 3.5 || Math.hypot(x - mp.x, y - mp.y) < 8) continue;
    pts.push({ r, th: Math.atan2(-(y - c.y), x - c.x) });
  }
  if (pts.length < 10) return null;
  const hist = new Map();
  for (const p of pts) hist.set(Math.round(p.r), (hist.get(Math.round(p.r)) ?? 0) + 1);
  const Rm = [...hist.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const norm = (d) => { let x = d; const lo = phi >= 0 ? -Math.PI / 2 : -1.5 * Math.PI; while (x < lo) x += 2 * Math.PI; while (x >= lo + 2 * Math.PI) x -= 2 * Math.PI; return x; };
  const arc = pts.filter((p) => Math.abs(p.r - Rm) <= 2.5).map((p) => norm(p.th - th1));
  const pointe = pts.filter((p) => Math.abs(p.r - Rm) > 1.8 && Math.abs(p.r - Rm) < 6).map((p) => norm(p.th - th1));
  const moy = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);
  return { Rm, n: arc.length, min: Math.min(...arc), max: Math.max(...arc), pointe: moy(pointe) };
}, { c, m, mp, phi });

// ── La frontière (§9), une sonde par FORME ──
const FORMES = [
  // §9.1 rien de R6 ni de R7
  ["w =", /(^|[^\p{L}\\])w\s*=/u, "w = "],
  ["z_C / z_B", /z_\{?[BC]\b/u, "z_C"],
  ["triangle", /(^|[^\p{L}])triangles?(?![\p{L}])|isocèle|équilatéral|rectangle en/iu, "isocèle"],
  ["alignement", /(^|[^\p{L}])align(é|ée|és|ées|ement)(?![\p{L}])|colinéaire/iu, "aligné"],
  ["cocyclique", /cocyclique|birapport/iu, "cocyclique"],
  ["lieu", /ensembles? de(s)? points|(^|[^\p{L}])lieu(?![\p{L}])/iu, "lieu"],
  ["médiatrice", /médiatrice|cercle de diamètre|angle inscrit|thalès/iu, "médiatrice"],
  // §9.2 le mot « similitude », INTERDIT dans le panneau
  ["similitude", /similitude|(^|[^\p{L}])similaire|(^|[^\p{L}])semblable/iu, "similitude"],
  // §9.3 aucune similitude indirecte
  ["indirecte", /indirecte|antidéplacement|\\bar\s*z|réflexion|symétrie (glissée|axiale)|retournement|projecti(f|ve)|(^|[^\p{L}])inversion/iu, "réflexion"],
  // §9.4 aucune composition de deux transformations nommées
  ["composition", /composée de deux|composition de|\\circ|puis la rotation|suivie de|groupe des|conjuguée par/iu, "\\circ"],
  // §9.5 aucune racine n-ième
  ["racine n-ième", /racines? n-ième|racines? \$?n\$?-ième|racines de l.unité|z\^\{?n\}?\s*=|2k\\pi\s*\/\s*n|polygone régulier|\\rho\s*e\^/iu, "racines de l'unité"],
  // §9.6 aucune algèbre linéaire
  ["matrice", /matrice|\\begin\{[pb]matrix\}|déterminant|\\det|application linéaire|endomorphisme|(^|[^\p{L}])noyau|vecteur propre|base canonique|\\mathbb\{R\}\^2/iu, "matrice"],
  // §9.7 aucune trigonométrie au-delà de la table
  ["trigonométrie", /linéaris|(^|[^\p{L}])euler|e\^\{i\\theta\}\s*\+\s*e\^|angle moitié|\\(cos|sin)\^\{?[23]|\\tan|arctan|formule d.addition/iu, "arctan"],
  // §9.9 aucune équation du second degré
  ["second degré", /discriminant|\\Delta\s*=|a\s*z\^2|second degré|viète|somme et produit des racines|\\delta\^2/iu, "discriminant"],
  // §9.10 aucun repère nommé autrement
  ["polaire", /coordonnées polaires|repère polaire|\\rho(?![\p{L}])|\(\s*r\s*,\s*\\theta\s*\)/iu, "coordonnées polaires"],
];
/** §9.12 : aucun nombre hors des grilles — les radicaux et les fractions de π que la scène peut écrire. */
function grilles(t) {
  const rac = [...t.matchAll(/\\sqrt\{?(\d+)\}?/g)].map((m) => Number(m[1]));
  const pis = [...t.matchAll(/\\[dt]?frac\{\d*\\pi\}\{(\d+)\}/g)].map((m) => Number(m[1]));
  const hors = [...rac.filter((r) => ![2, 3, 5, 10].includes(r)).map((r) => `√${r}`), ...pis.filter((d) => ![2, 3, 4, 6, 12].includes(d)).map((d) => `π/${d}`)];
  return { rac: [...new Set(rac)], pis: [...new Set(pis)], hors };
}
/** Le texte que la frontière lit : celui du panneau, SANS la leçon « au lieu de » (la locution n'est pas un lieu géométrique). */
const pourFrontiere = (t) => t.replace(/au lieu d/giu, "au_lieu d");
async function frontiere(ou, q = panneau) {
  const t = pourFrontiere(await texteRendu(q));
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  const g = grilles(t);
  if (g.hors.length) vues.push(`nombres hors des grilles : ${[...new Set(g.hors)].join(", ")}`);
  const lu = Object.values(await lectures(q)).join(" ");
  if (DECIMAL.test(lu)) vues.push(`un décimal ou un degré dans les LECTURES (${lu.match(DECIMAL)[0]})`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `AFFICHÉ : ${vues.join(" ; ")}` : `aucune des ${FORMES.length} formes interdites ; radicaux {${g.rac.join(", ")}}, dénominateurs de π {${g.pis.join(", ")}} — dans les grilles ; aucun décimal ni degré dans les lectures`}`);
}
async function katex(ou, q = panneau) {
  const r = await q.evaluate((el) => {
    const brut = el.innerText.match(/\\(dfrac|tfrac|frac|sqrt|pi|arg|Omega|omega)\b|\$[^$]{1,40}\$/g) ?? [];
    const erreurs = el.querySelectorAll(".katex-error").length;
    const c = el.cloneNode(true);
    c.querySelectorAll(".katex").forEach((k) => k.remove());
    const grecs = (c.textContent ?? "").match(/[ωΩ]/g) ?? [];
    return { brut, erreurs, grecs: grecs.length };
  });
  juger("katex", !r.brut.length && !r.erreurs && !r.grecs, `${ou} : ${r.brut.length ? `LaTeX BRUT : ${r.brut.slice(0, 3).join(", ")} ; ` : ""}${r.erreurs} erreur(s) KaTeX ; ${r.grecs} ω/Ω hors KaTeX (Geist dessine ω comme Ω, ADR 0030)`);
}

/**
 * La formule graduée (spec §7.6 C), ÉTAPE par ÉTAPE : les formes INTERDITES de
 * l'étape courante, dans le texte du panneau (annotations TeX et description
 * comprises), et celles qu'elle doit employer.
 */
const FG = {
  rapport: /(^|[^\p{L}])rapports?(?![\p{L}])|quotient|\\[dt]?frac\{O\s*M'\}\{O\s*M\}|÷/iu,
  ecart: /(^|[^\p{L}])écarts?(?![\p{L}])|différence/iu,
  argZ: /\\arg\s*\(\s*z'?\s*\)/u,
  pi: /\\pi/u,
  centre: /(^|[^\p{L}])centres?(?![\p{L}])|point fixe|z'\s*-\s*z_A|\\omega|(^|[^\p{L}])ω/iu,
  azb: /z'\s*=\s*a\s*z|az\s*\+\s*b|a\\,?z\s*\+\s*b/u,
  angleTransf: /angle de la transformation|(^|[^\p{L}])arcs?(?![\p{L}])|(^|[^\p{L}])direct(?![\p{L}])|horaire/iu,
  bouge: /invariant|ne bouge pas|z_\\Omega|\\dfrac\{b\}\{1-a\}|b\s*\/\s*\(1\s*-\s*a\)/iu,
  developpee: /développ|\\dfrac\{z'\s*-\s*\\omega\}|\\omega\s*=|z'\s*=\s*[^()=]*?\\,\s*z\s*[+-]/u,
};
const INTERDIT = {
  [ID[0]]: ["rapport", "ecart", "argZ", "pi", "centre", "azb"],
  [ID[1]]: ["argZ", "ecart", "angleTransf", "centre", "azb"],
  [ID[2]]: ["centre", "bouge", "azb"],
  [ID[3]]: ["azb", "developpee"],
  [ID[4]]: [],
};
async function formule(ou, id, emploie = []) {
  const t = await texteRendu();
  const fautes = [];
  for (const k of INTERDIT[id]) if (FG[k].test(t)) fautes.push(`« ${k} » ÉCRIT trop tôt (${t.match(FG[k])?.[0]?.trim()})`);
  for (const k of emploie) if (!FG[k].test(t)) fautes.push(`« ${k} » ABSENT (l'étape l'emploie)`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `aucune de [${INTERDIT[id].join(", ")}]${emploie.length ? `, et [${emploie.join(", ")}] employé` : ""}`}`);
}
{
  const fautes = [];
  for (const e of E) {
    const textes = [e.consigne, e.titre, e.pari?.question, e.suite, ...(e.pari?.choix ?? []).flatMap((c) => [c.texte, c.retour])].filter(Boolean);
    // la `suite` n'existe qu'APRÈS la révélation : elle a droit à la frontière de l'étape
    for (const k of INTERDIT[e.id] ?? []) for (const x of textes) if (FG[k].test(x)) fautes.push(`${e.id} : « ${k} » dans « ${x.slice(0, 60)}… »`);
  }
  juger("formule-graduee", fautes.length === 0, `les textes du descripteur (consignes, questions, choix, retours, suites — ceux qu'aucun parcours n'affiche) : ${fautes.length ? fautes.slice(0, 4).join(" ; ") : "aucune forme avant son étape"}`);
}

/**
 * LES LECTURES, ENTIÈRES (vague 2, dessin) : une formule KaTeX ne se coupe pas — trop large,
 * elle DÉBORDE sa colonne, et ce qui dépasse est rogné par le bord du panneau. La critique
 * l'affirmait sur des captures (« z′ = iz » coupé) ; la capture ne tranche pas (c'était la
 * valeur entière, à c = i et centre O), la boîte, si : chaque formule d'une lecture doit
 * tenir entre les bords de la liste, et dans sa propre case.
 */
async function lecturesEntieres(ou, q = panneau) {
  const r = await q.evaluate((el) => {
    const dl = el.querySelector("[data-lectures]");
    if (!dl) return null;
    const b = dl.getBoundingClientRect();
    // la BOÎTE de chaque formule, pas le `scrollWidth` de sa case : sous un radical, KaTeX pose
    // un étai de 2 px (`vlist-s`) qu'il annule par une marge de −2 px — invisible, mais compté
    // par `scrollWidth` (premier passage : « √2 » donné pour débordant dans une case de 23 px
    // où sa boîte tenait de 0 à 23)
    const dehors = [], horsCase = [];
    let n = 0;
    for (const dd of dl.querySelectorAll("[data-lecture]")) {
      n++;
      const c = dd.getBoundingClientRect();
      for (const k of dd.querySelectorAll(".katex")) {
        if (k.closest("[data-reserve]")) continue;
        const kb = k.getBoundingClientRect();
        if (kb.right > b.right + 0.5 || kb.left < b.left - 0.5) dehors.push(`${dd.getAttribute("data-lecture")} (${Math.round(kb.left - b.left)} → ${Math.round(kb.right - b.left)} px pour une liste de ${Math.round(b.width)})`);
        else if (kb.right > c.right + 0.5 || kb.left < c.left - 0.5) horsCase.push(`${dd.getAttribute("data-lecture")} (${Math.round(kb.left - c.left)} → ${Math.round(kb.right - c.left)} px pour une case de ${Math.round(c.width)})`);
      }
    }
    return { n, dehors, defile: horsCase, largeur: Math.round(b.width) };
  });
  if (!r) return juger("lectures-entieres", false, `${ou} : aucune liste de lectures`);
  const ok = r.n > 0 && r.dehors.length === 0 && r.defile.length === 0;
  juger("lectures-entieres", ok, `${ou} : ${r.n} lecture(s) dans ${r.largeur} px — ${ok ? "chaque formule tient entre les bords de la liste" : [r.n === 0 ? "AUCUNE lecture (mesure vide)" : "", r.dehors.length ? `DÉBORDENT : ${r.dehors.join(", ")}` : "", r.defile.length ? `sortent de leur case : ${r.defile.join(", ")}` : ""].filter(Boolean).join(" ; ")}`);
}

/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; sur du blanc ; au plus six ; près de ce qu'elles nomment. */
/** Au-delà de ces distances (px, du point au bord de l'étiquette), un FILET doit relier l'étiquette à son point (le seuil du produit : 14). */
const PRES = [["nom-m", "m", 14], ["nom-mp", "mp", 14], ["nom-centre", "centre", 14], ["nom-angle", "arc-milieu", 20]];
async function etiquettesLisibles(ou, q = panneau) {
  const { textes, larg, haut, obstacles, encre, reperes } = await q.evaluate((el) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const transparent = (e) => { const c = getComputedStyle(e).backgroundColor; return c === "transparent" || /rgba\(.*,\s*0\)$/.test(c); };
    const tous = [...el.querySelectorAll("[data-etiquette]")].filter(visible);
    const textes = tous.filter((e) => (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), sansFond: transparent(e), ...boite(e) }));
    const reperes = Object.fromEntries(tous.filter((e) => !(e.textContent ?? "").trim()).map((e) => { const b = boite(e); return [e.getAttribute("data-etiquette"), { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 }]; }));
    const obstacles = [...el.querySelectorAll("[data-legende]")].map((e) => ({ nom: "légende", ...boite(e) }));
    const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
    const f = g.getImageData(cv.width - 1, cv.height - 1, 1, 1).data;
    // un pixel « d'encre » s'écarte du fond de plus de 60 en LUMINANCE, comme dans `classer` : le
    // quadrillage (27 niveaux) est un fond, pas un trait — une somme de trois canaux le comptait
    const lum = (r, g2, b) => 0.2126 * r + 0.7152 * g2 + 0.0722 * b;
    const lf = lum(f[0], f[1], f[2]);
    const trait = (d, i) => Math.abs(lum(d[i], d[i + 1], d[i + 2]) - lf) > 60 || Math.abs(d[i] - d[i + 1]) + Math.abs(d[i + 1] - d[i + 2]) > 40;
    for (const a of textes) {
      const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
      const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
      a.encreDessous = 0;
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      let ix0 = Infinity, iy0 = Infinity, ix1 = -Infinity, iy1 = -Infinity;
      for (let i = 0, k = 0; i < d.length; i += 4, k++) if (trait(d, i)) { a.encreDessous++; const X = k % w, Y = Math.floor(k / w); ix0 = Math.min(ix0, X); ix1 = Math.max(ix1, X); iy0 = Math.min(iy0, Y); iy1 = Math.max(iy1, Y); }
      // OÙ, dans la boîte : pour qu'un rouge se lise sans deviner
      if (a.encreDessous) a.ou = `x ${(ix0 / dpr).toFixed(0)}–${(ix1 / dpr).toFixed(0)}, y ${(iy0 / dpr).toFixed(0)}–${(iy1 / dpr).toFixed(0)} px dans une boîte de ${(w / dpr).toFixed(0)} × ${(h / dpr).toFixed(0)}`;
    }
    let encre = 0;
    for (const o of obstacles) {
      const d = g.getImageData(Math.max(0, Math.floor(o.x0 * dpr)), Math.max(0, Math.floor(o.y0 * dpr)), Math.max(1, Math.ceil((o.x1 - o.x0) * dpr)), Math.max(1, Math.ceil((o.y1 - o.y0) * dpr))).data;
      for (let i = 0; i < d.length; i += 4) if (trait(d, i)) encre++;
    }
    return { textes, larg: rc.width, haut: rc.height, obstacles, encre, reperes };
  });
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    for (const o of obstacles) if (a.x0 < o.x1 - 1 && o.x0 < a.x1 - 1 && a.y0 < o.y1 - 1 && o.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS la légende`);
    if (a.encreDessous > 0) fautes.push(`« ${a.nom} », ${a.sansFond ? "sans fond" : "à pastille"}, posée sur ${a.encreDessous} pixel(s) d'encre (${a.ou})`);
  }
  if (textes.length > 6) fautes.push(`${textes.length} étiquettes à la fois (budget du §6.2 : six)`);
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre, aucune posée sur un trait, sous le budget de six"}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) d'encre sous la légende, qui les CACHE (attendu 0)`);
  const parNom = Object.fromEntries(textes.map((t) => [t.nom, t]));
  const ecart = (b, p) => Math.hypot(Math.max(b.x0 - p.x, 0, p.x - b.x1), Math.max(b.y0 - p.y, 0, p.y - b.y1));
  const loin = [], vus = [], coupes = [];
  // les traits que la porte connaît elle-même : les deux axes, et les segments du centre (ou de O) à M et à M′
  const coupe = (a, b, c, d) => { const o = (p, q2, r) => (q2.x - p.x) * (r.y - p.y) - (q2.y - p.y) * (r.x - p.x); const d1 = o(c, d, a), d2 = o(c, d, b), d3 = o(a, b, c), d4 = o(a, b, d); return d1 * d2 < 0 && d3 * d4 < 0; };
  const pivot = reperes.centre ?? reperes.origine;
  const traits = [
    ...(reperes.origine ? [["l'axe réel", { x: -1e4, y: reperes.origine.y }, { x: 1e4, y: reperes.origine.y }], ["l'axe imaginaire", { x: reperes.origine.x, y: -1e4 }, { x: reperes.origine.x, y: 1e4 }]] : []),
    ...(pivot && reperes.m ? [["le segment vers M", pivot, reperes.m]] : []),
    ...(pivot && reperes.mp ? [["le segment vers M′", pivot, reperes.mp]] : []),
  ];
  for (const [nom, ref, max] of PRES) {
    const b = parNom[nom], p = reperes[ref];
    if (!b || !p) continue;
    const d = ecart(b, p);
    // l'anneau du point fixe (rayon 9, trait 2) est un obstacle : ce qu'il entoure se nomme à côté de lui
    const surAnneau = reperes.anneau && Math.hypot(reperes.anneau.x - p.x, reperes.anneau.y - p.y) < 2;
    const lim = max + (surAnneau ? 11 : 0);
    if (d <= lim) { vus.push(`${nom.replace("nom-", "")} ${d.toFixed(0)}`); continue; }
    // plus loin : un FILET doit la relier à son point — lu sur les pixels, du bord du point
    // (7 px) au bord de l'étiquette (2 px), et au moins 85 % du chemin tracé
    const qx = Math.max(b.x0, Math.min(p.x, b.x1)), qy = Math.max(b.y0, Math.min(p.y, b.y1));
    const tr = await q.evaluate((el, { p, qx, qy }) => {
      const cv = el.querySelector("canvas"); const dpr = cv.width / cv.clientWidth; const g = cv.getContext("2d");
      const f = g.getImageData(cv.width - 1, cv.height - 1, 1, 1).data;
      const lum = (r, g2, b) => 0.2126 * r + 0.7152 * g2 + 0.0722 * b;
      const L = Math.hypot(qx - p.x, qy - p.y), ux = (qx - p.x) / L, uy = (qy - p.y) / L;
      let n = 0, oui = 0;
      for (let t = 8; t <= L - 3; t += 1.5) {
        n++;
        const x = p.x + ux * t, y = p.y + uy * t;
        let vu = false;
        for (const [a, b2] of [[0, 0], [0.7, 0], [-0.7, 0], [0, 0.7], [0, -0.7]]) {
          const d = g.getImageData(Math.floor((x + a) * dpr), Math.floor((y + b2) * dpr), 1, 1).data;
          if (Math.abs(lum(d[0], d[1], d[2]) - lum(f[0], f[1], f[2])) > 40) vu = true;
        }
        if (vu) oui++;
      }
      return { n, oui };
    }, { p, qx, qy });
    const relie = tr.n > 0 && tr.oui / tr.n >= 0.85;
    if (relie) {
      const L = Math.hypot(qx - p.x, qy - p.y), a = { x: p.x + ((qx - p.x) / L) * 7, y: p.y + ((qy - p.y) / L) * 7 };
      for (const [nt, u, v] of traits) if (coupe(a, { x: qx, y: qy }, u, v)) coupes.push(`le filet de « ${nom.replace("nom-", "")} » coupe ${nt}`);
    }
    vus.push(`${nom.replace("nom-", "")} ${d.toFixed(0)}${relie ? " (filet)" : ""}`);
    if (!relie) loin.push(`« ${nom} » à ${d.toFixed(1)} px de ${ref} (au plus ${lim}), et AUCUN filet ne l'y relie (${tr.oui}/${tr.n})`);
  }
  juger("etiquettes-pres", loin.length === 0 && vus.length >= 1, `${ou} : ${loin.length ? loin.join(" ; ") : `chacune près de ce qu'elle nomme (px : ${vus.join(" · ")})`}`);
  // IMPRIMÉ, PAS ARMÉ (ADR 0039 : une règle de la maison s'imprime à côté sans rougir) : le placeur
  // fait payer un filet qui coupe un trait, mais peut le garder quand toute autre place est pire
  if (coupes.length) imprimes.push(`[etiquettes-filets] ${ou} : ${coupes.join(" ; ")} (le placeur n'a pas trouvé mieux)`);
}

// ── L'échelle et les positions : la porte place elle-même chaque point ──
let E0 = null; // l'échelle lue, à l'étape 1
const px = (z, e = E0) => ({ x: e.o.x + e.sX * z[0], y: e.o.y - e.sY * z[1] });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/** Avant le pari : aucun accent, aucune lecture, aucun contrôle, aucun arc ni anneau ; M′ présent à l'encre SEULEMENT à S3 et S5 ; Ω ABSENT à S5. */
async function avantPari(k) {
  const id = ID[k];
  const { accentN } = await classer();
  const fautes = [];
  if (accentN) fautes.push(`${accentN} px d'accent`);
  if (await panneau.locator("[data-lectures], [data-lecture]").count()) fautes.push("lectures PRÉSENTES");
  if (await controles()) fautes.push(`contrôles [${await controles()}]`);
  for (const r of ["arc-debut", "anneau"]) if (await repere(r)) fautes.push(`${r} DESSINÉ`);
  if (await etiquette("nom-angle")) fautes.push("étiquette d'angle AFFICHÉE");
  const donnee = E[k].etat.image === "donnee";
  const mp = await repere("mp");
  const z = POINT[E[k].etat.z], t = transfo(E[k].etat.c ?? "2", E[k].etat.centre ?? "O", E[k].etat.enonce);
  if (donnee) {
    const d = mp && (await disque(px(image(t, z)), 2));
    if (!d) fautes.push("M′ ABSENT alors que la consigne le donne (exception du §7.6)");
    if (!(await etiquette("nom-mp"))) fautes.push("l'affixe de M′ ABSENTE (l'énoncé la donne)");
  } else if (mp || (await etiquette("nom-mp"))) fautes.push("M′ DESSINÉ ou nommé");
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  if (E[k].etat.enonce !== "coefficient") {
    // S5 : Ω n'a AUCUNE existence d'énoncé — ni point, ni nom, ni description (règle 2 du tremplin)
    if (await repere("centre")) fautes.push("Ω DESSINÉ");
    if (await etiquette("nom-centre")) fautes.push("Ω NOMMÉ");
    if (/Ω|centre/iu.test(desc)) fautes.push("la description NOMME le centre");
  }
  const interdits = { [ID[0]]: ["2+2i", "2 + 2i", "plus loin", "tourne"], [ID[1]]: ["4√2", "2√2", "deux fois"], [ID[2]]: ["π/6", "écart"], [ID[3]]: ["2+2i", "anneau", "ne bouge pas"], [ID[4]]: ["Ω", "π/4", "√2"] }[id];
  const dits = interdits.filter((m) => desc.includes(m));
  if (dits.length) fautes.push(`la description DIT : ${dits.join(", ")}`);
  juger("avant-pari", fautes.length === 0, `étape ${k + 1} (${id}), avant le pari : ${fautes.length ? fautes.join(" ; ") : `aucun accent, aucune lecture, aucun contrôle, ni arc ni anneau${donnee ? ", M′ À L'ENCRE avec son affixe (l'énoncé le donne)" : ", aucun M′"}${E[k].etat.enonce !== "coefficient" ? ", et Ω n'existe nulle part — ni point, ni nom, ni description" : ""}`}`);
}

/** L'état posé par l'étape (data-*) et la phase du pari. */
async function etatPose(k) {
  const e = E[k].etat;
  const lu = { c: await attr("data-c"), z: await attr("data-z"), centre: await attr("data-centre"), enonce: await attr("data-enonce"), ph: await attr("data-pari") };
  const ok = (e.c === undefined || lu.c === e.c) && lu.z === e.z && (e.centre === undefined || lu.centre === e.centre) && lu.enonce === e.enonce && lu.ph === "attente";
  juger("etapes", ok, `étape ${k + 1} (${ID[k]}) : c = ${lu.c}, z = ${lu.z}, centre ${lu.centre}, énoncé « ${lu.enonce} », pari « ${lu.ph} »`);
}
/** Après la révélation : les contrôles de l'étape, et ses lectures — ni plus, ni moins. */
async function ouvertApres(k) {
  const e = E[k];
  const enCoef = (await attr("data-enonce")) === "coefficient";
  const attendus = e.controles.filter((c) => enCoef || !["coefficient", "centre"].includes(c)).sort().join(",");
  const lus = await controles();
  const l = Object.keys(await lectures()).sort();
  const centreO = enCoef && (await attr("data-centre")) === "O";
  const lAtt = (e.lectures ?? []).filter((x) => x !== "argument-image" || centreO).sort();
  juger("etapes", lus === attendus && l.join(",") === lAtt.join(","), `étape ${k + 1} révélée : contrôles [${lus}] (attendu [${attendus}]) ; lectures [${l.join(", ")}]${l.join(",") === lAtt.join(",") ? "" : ` (attendu [${lAtt.join(", ")}])`}`);
}

/** Tout ce qu'un état affiche, mesuré contre la seconde voie (N1…N10) et contre ses pixels. */
/** La chaîne est-elle ENTOURÉE d'une paire de parenthèses (celle qui s'ouvre en tête se ferme en queue) ? */
function entoure(x) {
  if (!x.startsWith("(")) return false;
  let p = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] === "(") p++;
    else if (x[i] === ")" && --p === 0) return i === x.length - 1;
  }
  return false;
}
async function mesurerEtat(c, zc, centre, enonce, ou) {
  const t = transfo(c, centre, enonce);
  const z = POINT[zc], zp = image(t, z);
  const fixe = proche(z, t.w);
  const L = await lectures();
  const f = [];
  // N1 / N7 — l'image, sur son étiquette
  const eMp = await etiquette("nom-mp"), eM = await etiquette("nom-m");
  if (fixe) {
    if (eMp) f.push(`N8 : une étiquette de M′ au point fixe (« ${eMp} »)`);
    if (eM !== "M=M'") f.push(`N8 : l'étiquette du point fixe dit « ${eM} » (attendu « M=M' »)`);
  } else {
    // « M'(2+2i) » sur une ligne ; « M' » puis l'affixe nue sur deux (sans parenthèses de plus
    // autour d'une affixe qui en porte déjà) — on n'ôte que la paire qui ENTOURE l'affixe
    const reste = eMp.replace(/^M'/, "");
    const aff = entoure(reste) ? reste.slice(1, -1) : reste;
    const v = evalTex(aff);
    if (!v || !proche(v, zp)) f.push(`N1 : M′ affiché « ${aff} » vaut ${v ? v.map((x) => x.toFixed(4)).join(" ; ") : "?"}, attendu ${zp.map((x) => x.toFixed(4)).join(" ; ")}`);
    if (enonce === "coefficient" && centre === "O" && aff !== TABLE_A[c][POINTS.indexOf(zc)]) f.push(`N1 : forme « ${aff} » ≠ table A « ${TABLE_A[c][POINTS.indexOf(zc)]} »`);
    if (enonce !== "coefficient" && aff !== TABLE_E[enonce].zp[POINTS.indexOf(zc)]) f.push(`N7 : forme « ${aff} » ≠ table E « ${TABLE_E[enonce].zp[POINTS.indexOf(zc)]} »`);
    if (eM !== `M(${TEX_POINT[zc]})`) f.push(`l'étiquette de M dit « ${eM} »`);
  }
  if (!proche(t.w, t.w2)) f.push("N7 : les deux calculs de ω de la porte divergent");
  // N2 — le module
  const modAtt = enonce === "coefficient" ? MODULE[c] : MODULE_A[enonce];
  if (L["module-c"] !== undefined && L["module-c"] !== modAtt) f.push(`N2 : |a| lu « ${L["module-c"]} » (attendu « ${modAtt} »)`);
  if (L["module-c"] !== undefined && Math.abs((evalTex(L["module-c"]) ?? [NaN])[0] - abs(t.a)) > 1e-9) f.push(`N2 : |a| lu ne vaut pas ${abs(t.a)}`);
  // N3 — les distances et le rapport
  if (L.distances !== undefined) {
    const m = /=\s*(.+?)\s+et\s+.*?=\s*(.+)$/.exec(L.distances);
    const d1 = m && evalTex(m[1]), d2 = m && evalTex(m[2]);
    if (!d1 || !d2 || Math.abs(d1[0] - abs(sub(z, t.w))) > 1e-9 || Math.abs(d2[0] - abs(sub(zp, t.w))) > 1e-9) f.push(`N3 : distances lues « ${L.distances} » (attendu ${abs(sub(z, t.w)).toFixed(4)} et ${abs(sub(zp, t.w)).toFixed(4)})`);
  }
  if (L.rapport !== undefined) {
    if (fixe ? L.rapport !== "—" : L.rapport !== modAtt) f.push(`N3 : rapport lu « ${L.rapport} » (attendu « ${fixe ? "—" : modAtt} »)`);
  }
  // N4 — l'argument du coefficient
  const argAtt = enonce === "coefficient" ? ARG[c] : ARG_A[enonce];
  if (L["argument-c"] !== undefined && L["argument-c"] !== argAtt) f.push(`N4 : arg lu « ${L["argument-c"]} » (attendu « ${argAtt} »)`);
  // N5 / N6 — l'angle, un ÉCART, ramené dans ]−π ; π]
  if (L.angle !== undefined) {
    if (fixe ? L.angle !== "—" : L.angle !== argAtt) f.push(`N6 : angle lu « ${L.angle} » (attendu « ${fixe ? "—" : argAtt} »)`);
    const v = evalArg(L.angle);
    if (!fixe && (v === null || v <= -Math.PI + 1e-9 || v > Math.PI + 1e-9)) f.push(`N6 : angle « ${L.angle} » hors de ]−π ; π]`);
  }
  if (L["argument-image"] !== undefined) {
    const m = /\\arg\(z'\)=\s*(.+?)\s+\\arg\(z\)=\s*(.+)$/.exec(L["argument-image"]);
    const aZp = m?.[1], aZ = m?.[2];
    const vZp = aZp && evalArg(aZp), vZ = aZ && evalArg(aZ);
    if (vZp == null || Math.abs(vZp - Math.atan2(zp[1], zp[0])) > 1e-9 || vZ == null || Math.abs(vZ - Math.atan2(z[1], z[0])) > 1e-9) f.push(`N5 : arguments lus « ${L["argument-image"]} »`);
    const surAxe = z[1] === 0 && z[0] > 0;
    if (L.angle !== undefined && (aZp === L.angle) !== surAxe) f.push(`N5 : angle et argument de l'image ${aZp === L.angle ? "ÉGAUX" : "DIFFÉRENTS"} à z = ${zc} (attendu ${surAxe ? "égaux" : "différents"})`);
  }
  // N7 / N8 — le point fixe, l'écriture, le rapport inverse
  if (L["point-fixe"] !== undefined) { const v = evalTex(L["point-fixe"]); if (!v || !proche(v, t.w)) f.push(`N8 : point fixe lu « ${L["point-fixe"]} »`); }
  if (L["rapport-inverse"] !== undefined) {
    const v = evalTex(L["rapport-inverse"]);
    if (fixe ? L["rapport-inverse"] !== "—" : !v || !proche(v, t.a)) f.push(`N7 : (z′ − ω)/(z − ω) lu « ${L["rapport-inverse"]} » (attendu ${fixe ? "—" : "a"})`);
  }
  if (L.ecriture !== undefined) {
    const [fact, dev] = L.ecriture.split(/\s+(?=z'=)/);
    const m = /^z'(?:-(.+?))?=(.+?)\\,(?:\((z(?:-(.+))?)\)|z)$/.exec(fact.replace(/\s/g, ""));
    const W = m ? (m[1] ? evalTex(m[1]) : [0, 0]) : null, F = m ? evalTex(m[2]) : null, W2 = m ? (m[4] ? evalTex(m[4]) : [0, 0]) : null;
    if (!m || !W || !F || !W2 || !proche(W, t.w) || !proche(W2, t.w) || !proche(F, t.a)) f.push(`N7 : forme factorisée lue « ${fact} »`);
    if (dev) {
      const md = /^z'=(.+?)\\,z(.*)$/.exec(dev.replace(/\s/g, ""));
      const A = md && evalTex(md[1]), B = md && (md[2] ? evalTex(md[2]) : [0, 0]);
      if (!A || !B || !proche(A, t.a) || !proche(B, t.b)) f.push(`N7 : forme développée lue « ${dev} »`);
      if (enonce !== "coefficient" && dev.replace(/\s/g, "") !== DEVELOPPEE[enonce]) f.push(`N7 : « ${dev} » ≠ la formule donnée « ${DEVELOPPEE[enonce]} »`);
    }
  }
  // N10 — aucun décimal, aucun degré, dans les lectures
  const tl = Object.values(L).join(" ");
  if (DECIMAL.test(tl)) f.push(`N10 : décimal ou degré dans les lectures (« ${tl.match(DECIMAL)[0]} »)`);
  juger("nombres", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : `z′ = ${zp.map((x) => +x.toFixed(4)).join(" ; ")}${fixe ? " (point fixe)" : ""} — ${Object.keys(L).length} lecture(s), formes et valeurs justes`}`);
  // ── les pixels ──
  await classer();
  const mA = px(z), mpA = px(zp), wA = px(t.w);
  // au point fixe, le centre (carré, à l'accent quand il est CHERCHÉ) et l'anneau se posent sur M
  const dM = await disque(mA, fixe ? 0 : 2);
  const mpEncre = (await attr("data-scene-etape")) === ID[2] || (await attr("data-scene-etape")) === ID[4];
  const dMp = fixe ? null : await disque(mpA, mpEncre ? 2 : 1);
  const fp = [];
  if (!dM || dist(dM, mA) > 2) fp.push(`M dessiné ${dM ? `à ${dist(dM, mA).toFixed(1)} px de sa place` : "INTROUVABLE"}`);
  if (!fixe && (!dMp || dist(dMp, mpA) > 2)) fp.push(`M′ dessiné ${dMp ? `à ${dist(dMp, mpA).toFixed(1)} px de sa place` : "INTROUVABLE"} (attendu en ${zp.map((x) => x.toFixed(2)).join(" ; ")})`);
  juger("point-a-sa-place", fp.length === 0, `${ou} : ${fp.length ? fp.join(" ; ") : "M et M′ dessinés là où leur affixe les met, à ≤ 2 px"}`);
  if (fixe) {
    const rmp = await repere("mp");
    const apart = rmp && dM && dist(rmp, dM) > 1.5;
    juger("point-fixe-immobile", !!dM && dist(dM, wA) <= 1.5 && !apart, `${ou} : le point fixe ${dM ? `à ${dist(dM, wA).toFixed(1)} px du centre` : "INTROUVABLE"} ; M′ ${apart ? `DESSINÉ à part (${dist(rmp, dM).toFixed(1)} px)` : "confondu avec lui"}`);
    const n = [await etiquette("nom-m"), await etiquette("nom-mp")].filter(Boolean);
    juger("une-seule-etiquette-au-point-fixe", n.length === 1 && n[0] === "M=M'", `${ou} : ${n.length} étiquette(s) au point fixe : ${n.map((x) => `« ${x} »`).join(", ") || "aucune"}`);
  } else if (dM && dMp) {
    juger("point-fixe-immobile", dist(dM, dMp) >= 8, `${ou} : hors du point fixe, M′ est à ${dist(dM, dMp).toFixed(1)} px de M (au moins 8)`);
    const wPx = px(t.w);
    const lm = dist(dM, wPx), lmp = dist(dMp, wPx);
    const rap = abs(sub(zp, t.w)) / abs(sub(z, t.w));
    // 2 %, ou 1,5 px sur ΩM′ quand il est court (la détection d'un disque est au pixel)
    juger("longueurs-au-rapport", Math.abs(lmp - rap * lm) <= Math.max(0.02 * lmp, 2), `${ou} : ΩM′/ΩM mesuré ${(lmp / lm).toFixed(3)} en pixels, lu ${rap.toFixed(3)}`);
  }
  // l'arc, entre les bonnes directions
  const k12 = Math.round((Math.atan2(...[...div(t.a, [1, 0])].reverse()) * 12) / Math.PI);
  if (!fixe && L.angle !== undefined && L.angle !== "0" && dM && (dMp || mpEncre)) {
    const phi = evalArg(L.angle) ?? (k12 * Math.PI) / 12;
    const a = await arcLu(wA, mA, mpA, phi);
    const ok = a && Math.abs(a.min - Math.min(0, phi)) < 0.14 && Math.abs(a.max - Math.max(0, phi)) < 0.2 && a.pointe !== null && Math.abs(a.pointe - phi) < 0.35;
    juger("arc-entre-les-bonnes-directions", ok, `${ou} : ${a ? `arc de rayon ${a.Rm} px, de ${(a.min * 180 / Math.PI).toFixed(0)}° à ${(a.max * 180 / Math.PI).toFixed(0)}° depuis ΩM (attendu 0° → ${(phi * 180 / Math.PI).toFixed(0)}°), pointe à ${a.pointe === null ? "?" : (a.pointe * 180 / Math.PI).toFixed(0)}°` : "AUCUN arc lu"}`);
  }
}

// ── Le parcours, étape par étape (1 280 px) ──
if (pret) {
  // ── S1 ──
  await etatPose(0);
  await avantPari(0);
  await formule("étape 1, avant le pari", ID[0]);
  await frontiere("étape 1, avant le pari");
  await katex("étape 1, avant le pari");
  await etiquettesLisibles("1 280 px, étape 1, avant le pari");
  // L'ISOTROPIE, lue sur les graduations et le cercle unité (§11.2)
  await classer();
  E0 = await echelleLue();
  if (E0.ok) {
    const ecartEch = Math.abs(E0.sX - E0.sY) / E0.sX;
    const demi = Math.sqrt(3) / 2;
    const cordes = E0.bas !== null && E0.gauche !== null && Math.abs(E0.bas - E0.gauche) <= 1 && Math.abs(E0.bas - demi * E0.sY) <= 1.5 && Math.abs(E0.gauche - demi * E0.sX) <= 1.5;
    juger("isotropie", ecartEch <= 0.005 && cordes, `px/unité : ${E0.sX.toFixed(3)} sur l'axe réel, ${E0.sY.toFixed(3)} sur l'axe imaginaire (écart ${(ecartEch * 100).toFixed(2)} %, au plus 0,5 %) ; demi-cordes du cercle unité ${E0.bas?.toFixed(1)} px (verticale) et ${E0.gauche?.toFixed(1)} px (horizontale), attendu ${(demi * E0.sX).toFixed(1)}`);
    const carre = Math.abs(E0.larg - E0.haut) <= 1 && E0.ticksX[0] === E0.ticksX[1] && E0.ticksY[0] === E0.ticksY[1] && E0.ticksX[0] === E0.ticksY[0] && Math.abs(E0.larg / 2 / E0.sX - 9) < 0.05;
    juger("isotropie", carre, `le cadre : ${E0.larg.toFixed(0)} × ${E0.haut.toFixed(0)} px ; graduations ${E0.ticksX.join(" | ")} de part et d'autre de O en x, ${E0.ticksY.join(" | ")} en y ; demi-largeur ${(E0.larg / 2 / E0.sX).toFixed(2)} unités (fenêtre [−9 ; 9]², CARRÉE)`);
  } else juger("isotropie", false, `échelle illisible (${E0.cx} traits en x, ${E0.cy} en y)`);
  // LE QUADRILLAGE, OPAQUE : un nœud a la valeur d'une ligne (§6.2)
  {
    const q = await panneau.evaluate((el, e) => {
      const cv = el.querySelector("canvas"); const dpr = cv.width / cv.clientWidth; const g = cv.getContext("2d");
      // le pixel le plus SOMBRE à ±1 : la ligne est posée au demi-pixel, la place calculée peut tomber à côté
      const lire = (x, y, dx = 1, dy = 1) => { let m = null; for (let v = -dy; v <= dy; v++) for (let u = -dx; u <= dx; u++) { const d = [...g.getImageData(Math.floor(x * dpr) + u, Math.floor(y * dpr) + v, 1, 1).data].slice(0, 3); if (!m || d[0] + d[1] + d[2] < m[0] + m[1] + m[2]) m = d; } return m; };
      const res = [];
      for (const [gx, gy] of [[5, -6], [6, -7], [-6, -5], [7, 5]]) {
        const X = e.o.x + e.sX * gx, Y = e.o.y - e.sY * gy;
        const noeud = lire(X, Y), ligne = lire(X, Y - e.sY * 0.4, 1, 0), fond = lire(X + e.sX * 0.5, Y - e.sY * 0.5, 0, 0);
        res.push({ noeud, ligne, fond });
      }
      return res;
    }, E0);
    const ecarts = q.map(({ noeud, ligne }) => Math.max(...noeud.map((v, i) => Math.abs(v - ligne[i]))));
    const visibles = q.every(({ ligne, fond }) => Math.max(...ligne.map((v, i) => Math.abs(v - fond[i]))) >= 6);
    juger("quadrillage-opaque", Math.max(...ecarts) <= 2 && visibles, `nœud contre ligne, quatre nœuds hors du dessin : écarts ${ecarts.join(", ")} niveau(x) (au plus 2) ; la grille ${visibles ? "se voit" : "NE SE VOIT PAS"} sur le fond`);
  }
  {
    const { horsPalette } = await classer();
    juger("palette", horsPalette === 0, `étape 1 : ${horsPalette} pixel(s) teinté(s) hors du jeton d'accent`);
  }
  // l'immobilité : rien n'anime la scène
  {
    const h = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let s = 0; for (let i = 0; i < d.length; i += 97) s = (s * 31 + d[i]) >>> 0; return s; });
    const a = await h(); await page.waitForTimeout(500); const b = await h();
    juger("immobile", a === b, `deux images à 500 ms d'intervalle, sans geste : ${a === b ? "identiques" : "DIFFÉRENTES — quelque chose anime la scène"}`);
  }
  await parier(juste(0));
  juger("paris", /bonne/i.test(await resultat()), `étape 1 : le choix juste donne « ${await resultat()} »`);
  await ouvertApres(0);
  await formule("étape 1 révélée", ID[0]);
  await mesurerEtat("2", "1+i", "O", "coefficient", "étape 1 révélée (c = 2)");
  // deux segments COLINÉAIRES : le plus court DESSUS (l'encre de OM ne disparaît pas sous l'accent)
  {
    await classer();
    // sur l'AXE du segment OM, à 30, 50 et 70 % : l'encre de OM, pas l'accent de OM′ qui passe dessous
    // (les franges lissées d'un trait posé sur un autre gardent un peu de teinte : on lit le cœur)
    const pts = [0.3, 0.5, 0.7].map((u) => px([u, u]));
    const g = await panneau.evaluate((el, ps) => { const { cls, w, dpr } = window.__cls; return ps.map((p) => cls[Math.floor(p.y * dpr) * w + Math.floor(p.x * dpr)]); }, pts);
    juger("colineaires", g.every((c) => c === 2), `c = 2 : sur l'axe de OM (sous OM′, colinéaire), à 30, 50 et 70 % : ${g.map((c) => (c === 2 ? "encre" : c === 1 ? "ACCENT" : "fond")).join(", ")} — le segment le plus court est tracé DESSUS`);
  }
  // l'annonce : un réglage est DIT
  await cocher("coefficient", "-2");
  {
    const a = (await panneau.locator("[data-annonce]").textContent()) ?? "";
    juger("annonce", /−2−2i|−2 − 2i/.test(a.replace(/\s/g, "")) || a.replace(/\s/g, "").includes("M′en−2−2i"), `coefficient −2 : la région vivante dit « ${a.trim()} »`);
  }
  await mesurerEtat("-2", "1+i", "O", "coefficient", "étape 1, c = −2 (écart brut −π)");
  await cocher("coefficient", "2");
  await frontiere("étape 1 révélée");
  await etiquettesLisibles("1 280 px, étape 1 révélée");
  await suivant();

  // ── S2 ──
  await etatPose(1);
  await avantPari(1);
  await formule("étape 2, avant le pari", ID[1]);
  await parier(juste(1));
  juger("paris", /bonne/i.test(await resultat()), `étape 2 : « ${await resultat()} »`);
  await ouvertApres(1);
  await formule("étape 2 révélée", ID[1], ["rapport"]);
  for (const z of POINTS) { await cocher("point", z); await mesurerEtat("2i", z, "O", "coefficient", `étape 2, z = ${z}`); }
  await cocher("point", "1-i");
  await katex("étape 2 révélée");
  await etiquettesLisibles("1 280 px, étape 2 révélée");
  await suivant();

  // ── S3 ──
  await etatPose(2);
  await avantPari(2);
  await formule("étape 3, avant le pari", ID[2]);
  await parier(juste(2));
  juger("paris", /bonne/i.test(await resultat()), `étape 3 : « ${await resultat()} »`);
  await ouvertApres(2);
  await formule("étape 3 révélée", ID[2], ["ecart", "argZ"]);
  await mesurerEtat("sqrt3+i", "2i", "O", "coefficient", "étape 3 révélée");
  await frontiere("étape 3 révélée");
  await katex("étape 3 révélée");
  await etiquettesLisibles("1 280 px, étape 3 révélée");
  // LE BALAYAGE : les invariants restent écrits, le positionnel s'efface, et tout revient au relâchement
  {
    const avant = await lectures();
    const m0 = await repere("m");
    const INV = ["module-c", "distances", "rapport", "argument-c", "angle"];
    const curseur = panneau.locator('[data-controle="balayage"] input');
    const dit = () => panneau.locator("[data-annonce]").textContent().then((x) => (x ?? "").trim());
    const f = [];
    await curseur.focus();
    // UNE flèche doit se VOIR (vague 2, ergonomie : au cran de 1°, une pression déplaçait M de
    // moins d'un pixel) — et le début du geste doit se DIRE, une fois
    await page.keyboard.press("ArrowRight");
    await deuxImages(); await page.waitForTimeout(60);
    const m05 = await repere("m");
    if (!m05 || !m0 || dist(m0, m05) < 3) f.push(`une flèche déplace M de ${m0 && m05 ? dist(m0, m05).toFixed(1) : "?"} px (au moins 3 : sinon rien ne bouge à l'écran)`);
    const dit1 = await dit(), vt1 = await curseur.getAttribute("aria-valuetext");
    if (!/glisse sur son cercle/.test(dit1) || !/restent les mêmes/.test(dit1)) f.push(`le début du balayage n'est pas dit (région vivante : « ${dit1} »)`);
    for (let j = 1; j < 8; j++) await page.keyboard.press("ArrowRight");
    await deuxImages(); await page.waitForTimeout(60);
    const vt8 = await curseur.getAttribute("aria-valuetext");
    if (!vt1 || !vt8 || vt1 === vt8 || !/Échap/.test(vt8)) f.push(`la valeur dite du curseur ne varie pas avec le geste (« ${vt1} » puis « ${vt8} »)`);
    const pendant = await lectures();
    const m1 = await repere("m");
    const eM = await etiquette("nom-m"), eMp = await etiquette("nom-mp");
    for (const l of INV) if (pendant[l] !== avant[l]) f.push(`« ${l} » CHANGE (${avant[l]} → ${pendant[l]})`);
    if (pendant["argument-image"] !== "—") f.push(`argument de l'image « ${pendant["argument-image"]} » pendant le balayage (attendu « — »)`);
    if (/\d/.test(eM + eMp)) f.push(`un chiffre sur les étiquettes de M/M′ (« ${eM} », « ${eMp} »)`);
    if (!m1 || !m0 || dist(m0, m1) < 10) f.push(`M n'a pas bougé (${m0 && m1 ? dist(m0, m1).toFixed(1) : "?"} px) — balayage INERTE`);
    if ((await attr("data-z")) !== "2i" || (await attr("data-c")) !== "sqrt3+i") f.push("l'ÉTAT a changé");
    const tl = Object.values(pendant).join(" ");
    if (DECIMAL.test(tl)) f.push(`un décimal pendant le balayage : ${tl.match(DECIMAL)[0]}`);
    // l'arc, pendant : toujours entre ΩM et ΩM′
    await classer();
    const th = (40 * Math.PI) / 180;
    const mF = [-2 * Math.sin(th), 2 * Math.cos(th)];
    const mpF = mul(COEF["sqrt3+i"], mF);
    const a = await arcLu(px([0, 0]), px(mF), px(mpF), Math.PI / 6);
    if (!a || Math.abs(a.min) > 0.14 || Math.abs(a.max - Math.PI / 6) > 0.2) f.push(`l'arc, pendant le balayage, ${a ? `va de ${(a.min * 57.3).toFixed(0)}° à ${(a.max * 57.3).toFixed(0)}°` : "INTROUVABLE"} (attendu 0° → 30° depuis ΩM)`);
    await page.keyboard.press("Escape");
    await deuxImages(); await page.waitForTimeout(60);
    if (!/revenu à sa place/.test(await dit())) f.push(`le relâchement n'est pas dit (région vivante : « ${await dit()} »)`);
    const apres = await lectures();
    const m2 = await repere("m");
    for (const l of Object.keys(avant)) if (apres[l] !== avant[l]) f.push(`« ${l} » n'est pas revenue (${avant[l]} → ${apres[l]})`);
    if (!m2 || dist(m0, m2) > 0.5) f.push("M n'est pas revenu à sa place au relâchement (Échap)");
    // à la souris : tenir, glisser, lâcher
    const b = await curseur.boundingBox();
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.mouse.down();
    await page.mouse.move(b.x + b.width * 0.8, b.y + b.height / 2, { steps: 5 });
    await deuxImages();
    const tenu = await lectures();
    if (tenu["argument-image"] !== "—") f.push("à la souris, pendant : l'argument de l'image n'est pas « — »");
    await page.mouse.up();
    await deuxImages(); await page.waitForTimeout(60);
    const lache = await lectures();
    for (const l of Object.keys(avant)) if (lache[l] !== avant[l]) f.push(`à la souris, « ${l} » n'est pas revenue au relâchement`);
    juger("balayage-invariants", f.length === 0, `étape 3 : ${f.length ? f.join(" ; ") : `au clavier puis à la souris, une flèche déplace M de ${dist(m0, m05).toFixed(1)} px et huit de ${dist(m0, m1).toFixed(0)} px ; les cinq invariants restent écrits au caractère près, l'argument de l'image vaut « — », aucun chiffre sur M et M′, l'arc garde 30° entre ΩM et ΩM′ ; le début et le relâchement sont DITS, la valeur du curseur varie ; relâché, tout revient`}`);
  }
  // N5 et N6 aux cinq points, à c = √3 + i : l'écart ne bouge pas, et ne coïncide avec l'argument de l'image que sur l'axe réel
  for (const z of POINTS) { await cocher("point", z); await mesurerEtat("sqrt3+i", z, "O", "coefficient", `étape 3, z = ${z}`); }
  // LES 35 COUPLES coefficient-point, à l'étape qui écrit les six lectures : depuis la vague 2,
  // S4 et S5 n'écrivent plus que ce qu'elles découvrent ou emploient (le module et l'argument de
  // c, l'argument de l'image n'y sont plus), et c'est ici que N2, N4 et N5 se mesurent partout
  for (const c of COEFS) { await cocher("coefficient", c); for (const z of POINTS) { await cocher("point", z); await mesurerEtat(c, z, "O", "coefficient", `étape 3, c = ${c}, z = ${z}`); } }
  await cocher("coefficient", "sqrt3+i"); await cocher("point", "2i");
  await lecturesEntieres("1 280 px, étape 3");
  await suivant();

  // ── S4 ──
  await etatPose(3);
  await avantPari(3);
  await formule("étape 4, avant le pari", ID[3]);
  {
    const eA = await etiquette("nom-centre");
    juger("avant-pari", eA === "A(2)", `étape 4, avant le pari : le centre A est l'ÉNONCÉ — étiquette « ${eA} » (attendu « A(2) »)`);
  }
  await parier(juste(3));
  juger("paris", /bonne/i.test(await resultat()), `étape 4 : « ${await resultat()} »`);
  await ouvertApres(3);
  await formule("étape 4 révélée", ID[3], ["centre"]);
  {
    await classer();
    const a = px([2, 0]);
    const anneau = await panneau.evaluate((el, p) => { const { cls, w, dpr } = window.__cls; let n = 0, tot = 0; for (let k = 0; k < 72; k++) { const th = (k * Math.PI) / 36; for (const r of [8, 9, 10]) { tot++; const x = Math.round((p.x + r * Math.cos(th)) * dpr), y = Math.round((p.y + r * Math.sin(th)) * dpr); if (cls[y * w + x] === 1) { n++; break; } } } return n; }, a);
    juger("point-fixe-immobile", anneau >= 60, `étape 4 révélée : l'anneau du point fixe autour de A — accent lu sur ${anneau}/72 directions (au moins 60)`);
  }
  for (const z of POINTS) { await cocher("point", z); await mesurerEtat("i", z, "A", "coefficient", `étape 4, centre A, z = ${z}`); if (z === "2") await etiquettesLisibles("1 280 px, étape 4, au point fixe"); }
  await cocher("point", "2");
  await cocher("centre", "O");
  await mesurerEtat("i", "2", "O", "coefficient", "étape 4, centre O, z = 2");
  await cocher("centre", "A"); await cocher("point", "4");
  await frontiere("étape 4 révélée");
  await katex("étape 4 révélée");
  await etiquettesLisibles("1 280 px, étape 4 révélée");
  await suivant();

  // ── S5 ──
  await etatPose(4);
  await avantPari(4);
  await parier(juste(4));
  juger("paris", /bonne/i.test(await resultat()), `étape 5 : « ${await resultat()} »`);
  await ouvertApres(4);
  await formule("étape 5 révélée", ID[4], ["centre", "developpee"]);
  {
    const eW = await etiquette("nom-centre");
    juger("etapes", eW === "\\Omega(1+i)", `étape 5 révélée : le centre CHERCHÉ se pose — « ${eW} »`);
  }
  // N9 — les CRANS : exactement 7 coefficients, 5 points, 2 centres, 4 énoncés, et aucun curseur
  // hors du balayage (qui n'existe qu'à S3) — un cran de plus (c = 1 : le point fixe partout
  // trivial, §7.6 D) ou un curseur continu rougit ici
  {
    await cocher("enonce", "coefficient");
    const n = await panneau.evaluate((el) => Object.fromEntries(["coefficient", "point", "centre", "enonce"].map((c) => [c, el.querySelectorAll(`[data-controle="${c}"] input[type="radio"]`).length])));
    const curseurs = await panneau.locator('input[type="range"]').count();
    const ok = n.coefficient === 7 && n.point === 5 && n.centre === 2 && n.enonce === 4 && curseurs === 0;
    juger("nombres", ok, `N9, les crans à S5 : ${n.coefficient} coefficients, ${n.point} points, ${n.centre} centres, ${n.enonce} énoncés (attendu 7, 5, 2, 4) ; ${curseurs} curseur(s) continu(s) (attendu 0)`);
    await cocher("enonce", "les-deux");
  }
  // les 15 états en mode `enonce`, puis les 70 états en mode `coefficient`
  for (const en of ["les-deux", "rotation-A", "homothetie-A"]) {
    await cocher("enonce", en);
    for (const z of POINTS) { await cocher("point", z); await mesurerEtat("2", z, "O", en, `${en}, z = ${z}`); }
  }
  await cocher("enonce", "coefficient");
  for (const centre of ["O", "A"]) {
    await cocher("centre", centre);
    for (const c of COEFS) { await cocher("coefficient", c); for (const z of POINTS) { await cocher("point", z); await mesurerEtat(c, z, centre, "coefficient", `centre ${centre}, c = ${c}, z = ${z}`); } }
  }
  await cocher("enonce", "les-deux"); await cocher("point", "4");
  await lecturesEntieres("1 280 px, étape 5 révélée");
  await frontiere("étape 5 révélée");
  await katex("étape 5 révélée");
  await etiquettesLisibles("1 280 px, étape 5 révélée");
  {
    const { horsPalette } = await classer();
    juger("palette", horsPalette === 0, `étape 5 révélée : ${horsPalette} pixel(s) teinté(s) hors du jeton d'accent`);
  }
}

// ── La table des étapes, réécrite ICI contre le descripteur (spec §7.6 A) ──
{
  const attenduCtl = { [ID[0]]: "coefficient", [ID[1]]: "point", [ID[2]]: "balayage,coefficient,point", [ID[3]]: "centre,point", [ID[4]]: "centre,coefficient,enonce,point" };
  const premiere = { "angle": 2, "argument-c": 2, "argument-image": 2, "point-fixe": 3, "ecriture": 3, "rapport-inverse": 4, "distances": 1, "rapport": 1 };
  const fautes = [];
  E.forEach((e, k) => {
    if ([...e.controles].sort().join(",") !== attenduCtl[e.id]) fautes.push(`${e.id} ouvre [${e.controles.join(",")}]`);
    for (const l of e.lectures ?? []) if ((premiere[l] ?? 0) > k) fautes.push(`${e.id} lit « ${l} » avant l'étape ${premiere[l] + 1}`);
    if (e.etat_revele) fautes.push(`${e.id} porte un etat_revele (aucun n'est déclaré, §15.3)`);
  });
  juger("fuite-inter-etapes", fautes.length === 0, `table du §7.6 A : ${fautes.length ? fautes.join(" ; ") : "coefficient à S1, S3, S5 ; point de S2 à S5 ; centre à S4 et S5 ; énoncé à S5 ; balayage à S3 SEULEMENT ; angle, arg c, arg de l'image pas avant S3 ; point fixe, écriture pas avant S4 ; rapport inverse pas avant S5"}`);
  // aucune lecture ne répète le dessin : z et z′ sont à côté de leurs points (§5.6)
  const doubles = E.flatMap((e) => (e.lectures ?? []).filter((l) => ["affixe", "image", "z", "zp"].includes(l)).map((l) => `${e.id} : « ${l} »`));
  juger("fuite-inter-etapes", doubles.length === 0, `aucune lecture ne répète le plan${doubles.length ? ` — ${doubles.join(" ; ")}` : ""}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(cv.width - 3, cv.height - 3, 1, 1).data; return [d[0], d[1], d[2]]; });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  const { horsPalette } = await classer();
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  juger("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre) && horsPalette === 0, `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js}) ; en sombre, ${horsPalette} px hors palette`);
}

// ── La frontière sait-elle rougir, FORME PAR FORME ? (essai rouge seulement) ──
if (ESSAI && pret) {
  const muettes = [];
  const exemples = [...FORMES.map(([n, , x]) => [n, x]), ["radical hors grille", "\\sqrt{7}"], ["π hors grille", "\\dfrac{\\pi}{5}"]];
  for (const [nom, exemple] of exemples) {
    await panneau.evaluate((el, x) => { const s = document.createElement("span"); s.setAttribute("data-sonde", ""); s.textContent = ` ${x} `; el.querySelector("[data-lectures], [data-notes]")?.appendChild(s); }, exemple);
    const t = pourFrontiere(await texteRendu());
    const vue = FORMES.some(([n, re]) => n === nom && re.test(t)) || (nom.endsWith("hors grille") && grilles(t).hors.length > 0);
    if (!vue) muettes.push(nom);
    await panneau.evaluate((el) => el.querySelectorAll("[data-sonde]").forEach((s) => s.remove()));
  }
  noter("frontiere-sondes", muettes.length === 0, `${exemples.length} formes injectées une à une dans le panneau : ${muettes.length ? `MUETTES : ${muettes.join(", ")}` : "chacune vue par sa sonde"}`);
  const mG = [];
  for (const [k, x] of [["rapport", "le rapport"], ["ecart", "l'écart"], ["argZ", "\\arg(z')"], ["pi", "\\pi"], ["centre", "le centre"], ["azb", "z' = az + b"], ["angleTransf", "l'arc"], ["bouge", "ne bouge pas"], ["developpee", "z'=i\\,z+2-2i"]]) if (!FG[k].test(` ${x} `)) mG.push(k);
  noter("frontiere-sondes", mG.length === 0, `les formes de la formule graduée : ${mG.length ? `MUETTES : ${mG.join(", ")}` : "chacune vue par sa sonde"}`);
  // le décimal et le degré, dans les lectures
  const mD = ["1,41", "0.52", "30°", "30 degrés"].filter((x) => !DECIMAL.test(x));
  noter("frontiere-sondes", mD.length === 0, `décimaux et degrés : ${mD.length ? `MUETS : ${mD.join(", ")}` : "chacun vu"}`);
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Au téléphone (390 px) : les étiquettes se lisent aux cinq étapes, et au grand texte ──
{
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
    await p2.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
    await q.getByRole("button", { name: OUVRIR }).click();
    await p2.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"]`, { timeout: 40000 }).catch(() => {});
    for (let k = 0; k < 5; k++) {
      await etiquettesLisibles(`390 px, étape ${k + 1}, avant le pari`, q);
      await parier(juste(k), q, p2);
      await p2.waitForTimeout(120);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q);
      await lecturesEntieres(`390 px, étape ${k + 1} révélée`, q);
      if (k === 0) for (const c of ["0.5", "-2", "2i", "sqrt3+i"]) { await cocher("coefficient", c, q, p2); await etiquettesLisibles(`390 px, étape 1, c = ${c}`, q); }
      if (k === 3) for (const z of ["2", "1+i", "2i"]) { await cocher("point", z, q, p2); await etiquettesLisibles(`390 px, étape 4, z = ${z}`, q); }
      if (k === 4) for (const en of ["rotation-A", "homothetie-A"]) { await cocher("enonce", en, q, p2); await etiquettesLisibles(`390 px, étape 5, ${en}`, q); }
      if (k < 4) await suivant(q, p2);
    }
    await p2.evaluate(() => document.documentElement.style.setProperty("--font-scale", "1.125"));
    await p2.waitForTimeout(120);
    for (const en of ["les-deux", "rotation-A"]) { await cocher("enonce", en, q, p2); await etiquettesLisibles(`390 px, texte A+ (×1,125), étape 5, ${en}`, q); await lecturesEntieres(`390 px, texte A+ (×1,125), étape 5, ${en}`, q); }
    // la forme la plus large : le coefficient 1 + i autour de A, « z′ − 2 = (1 + i)(z − 2) » et sa forme développée
    await cocher("enonce", "coefficient", q, p2); await cocher("centre", "A", q, p2); await cocher("coefficient", "1+i", q, p2);
    await lecturesEntieres("390 px, texte A+ (×1,125), étape 5, c = 1 + i autour de A", q);
    await cocher("enonce", "les-deux", q, p2);
    await p2.evaluate(() => document.documentElement.style.removeProperty("--font-scale"));
    await frontiere("390 px, étape 5 révélée", q);
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune ; aucune course) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-plan-complexe : le plan complexe (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
for (const x of imprimes) console.log(`  ○ ${x}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "paris", "avant-pari", "nombres", "isotropie", "quadrillage-opaque", "point-a-sa-place", "colineaires", "longueurs-au-rapport", "arc-entre-les-bonnes-directions", "point-fixe-immobile", "une-seule-etiquette-au-point-fixe", "balayage-invariants", "lectures-entieres", "palette", "formule-graduee", "fuite-inter-etapes", "frontiere", "katex", "etiquettes", "etiquettes-pres", "cadre", "immobile", "annonce", "theme", "ergonomie"];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  const muettes = visees.filter((f) => !crient.includes(f));
  const sondes = resultats.filter((r) => r.famille === "frontiere-sondes" && !r.ok);
  if (sondes.length) { for (const s of sondes) console.error(`  ✘ ${s.detail}`); process.exit(1); }
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille sabotée rougit ; chaque forme de la frontière est vue.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
