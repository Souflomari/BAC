#!/usr/bin/env node
/**
 * scene-quotient — la porte de « l'échelle des quotients » (PC · evolution-spontanee, en tête de
 * R2 ; spec docs/pipeline/propositions/pc-evolution-spontanee-scene-quotient.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et trouve son panneau par
 * `[data-scene="echelle-des-quotients"]`. La scène est ANALYTIQUE : la porte refait chaque NOMBRE
 * par sa propre arithmétique — les crans et les trois K de la SPEC, écrits ICI en entiers (BigInt),
 * rien d'importé du produit (ADR 0036 : une porte qui cite l'écran se disculpe). Elle compare des
 * CHAÎNES exactes (le produit écrit Q_{r,i} à deux chiffres, EXACTEMENT ou rien — §5.4) et des
 * POSITIONS lues aux pixels, en fractions de l'échelle que les GRADUATIONS mesurées donnent (jamais
 * au pixel absolu, jamais depuis un repère que le produit déclare).
 *
 * LES FAMILLES (spec §11, amendées par la construction) : avant-clic · pas-de-3d · etapes · paris ·
 * avant-pari · fuite-inter-etapes · nombres (N1–N12, sur les états ATTEIGNABLES, les 75 à S5) ·
 * decades-affirmees (N13) · axe-decades · position-qri · position-k · cote-et-verdict ·
 * fleche-du-verdict · bande-de-travail · becher-et-roles · palette · formule-graduee · frontiere ·
 * fleches-chimiques · katex · lectures-entieres · etiquettes · cadre · annonce · console · ergonomie.
 *
 * Ce que la porte NE mesure PAS, écrit à côté (ADR 0035) : la mise en page à ≥ 560 px de canvas
 * (axe et bécher côte à côte) — le plateau n'y arrive pas aux largeurs mesurées (1 280 et 390 px de
 * fenêtre donnent un canvas de ~480 et ~360 px) ; `eclairs` et `sans-mouvement` — la scène n'a ni
 * temps ni course, rien ne s'anime (§6.1), ils seraient vides par construction ; les couleurs du
 * bécher au thème sombre (la `palette` est lue au thème clair seulement).
 *
 *   node scripts/scene-quotient.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-quotient.mjs --essai-rouge  (chaque famille doit crier)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { erreursKatex } from "./lib/katex-erreurs.mjs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_QUOTIENT ?? 3700 + (process.pid % 60));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/evolution-spontanee";
const SCENE = "echelle-des-quotients";
const OUVRIR = "Ouvrir l’échelle des quotients";

// ── La seconde voie : les constantes de la SPEC (§5.1–5.3), en entiers, rien du produit ──
const CRANS = ["1.0e-3", "1.0e-2", "2.5e-2", "1.0e-1", "5.0e-1"];
/** chaque cran, en entiers sur 10⁴ mol/L */
const SUR_DIX_MILLE = { "1.0e-3": 10n, "1.0e-2": 100n, "2.5e-2": 250n, "1.0e-1": 1000n, "5.0e-1": 5000n };
const EXPOSANT = { A: 1, B: 1, C: 2 };
/** K en fraction exacte — et c'est la CONSTANTE DÉCLARÉE qui porte l'unicité de l'équilibre (N3, §13.3) */
const K = { A: [18n * 10n ** 36n, 1n], B: [5n, 2n], C: [4n * 10n ** 15n, 1n] };
const K_TEX = { A: "1{,}8\\times10^{37}", B: "2{,}5", C: "4{,}0\\times10^{15}" };
const ION = { A: { p: "Zn^{2+}", o: "Cu^{2+}", mD: "Zn", mI: "Cu" }, B: { p: "Sn^{2+}", o: "Pb^{2+}", mD: "Sn", mI: "Pb" }, C: { p: "Cu^{2+}", o: "Ag^{+}", mD: "Cu", mI: "Ag" } };
const EXPRESSION = { A: "Q_r=\\dfrac{[Zn^{2+}]}{[Cu^{2+}]}", B: "Q_r=\\dfrac{[Sn^{2+}]}{[Pb^{2+}]}", C: "Q_r=\\dfrac{[Cu^{2+}]}{[Ag^{+}]^2}" };
const AXE = { min: -4, max: 42 };

const q = (b, p, o) => [SUR_DIX_MILLE[p] * 10n ** BigInt(4 * (EXPOSANT[b] - 1)), SUR_DIX_MILLE[o] ** BigInt(EXPOSANT[b])];
const cmp = ([a, b], [c, d]) => { const x = a * d, y = c * b; return x < y ? -1 : x > y ? 1 : 0; };
const lg = ([n, d]) => Math.log10(Number(n)) - Math.log10(Number(d));
const verdict = (b, p, o) => { const c = cmp(q(b, p, o), K[b]); return c < 0 ? "direct" : c > 0 ? "inverse" : "equilibre"; };
/** deux chiffres significatifs EXACTS ; décimal de 10⁻¹ à 10², scientifique ailleurs (§5.4, la liste) */
function deuxChiffres([num, den]) {
  const dix = (k) => (k >= 0 ? [10n ** BigInt(k), 1n] : [1n, 10n ** BigInt(-k)]);
  let e = 0;
  while (cmp([num, den], dix(e)) < 0) e--;
  while (cmp([num, den], dix(e + 1)) >= 0) e++;
  const [pn, pd] = dix(e - 1);
  const mn = num * pd, md = den * pn;
  if (mn % md !== 0n) return null;
  const M = Number(mn / md), a = Math.floor(M / 10), c = M % 10;
  if (e === -1) return `0{,}${a}${c}`;
  if (e === 0) return `${a}{,}${c}`;
  if (e === 1) return `${a}${c}`;
  if (e === 2) return `${a}${c}0`;
  return `${a}{,}${c}\\times10^{${e}}`;
}
const texCran = (c) => { const [m, e] = c.split("e"); return `${m.replace(".", "{,}")}\\times10^{${Number(e)}}\\text{mol/L}`; };
const ecartEntier = (b, p, o) => Math.floor(Math.abs(lg(K[b]) - lg(q(b, p, o))) + 1e-12);
const TEX_SENS = { direct: "sens direct (1)", inverse: "sens inverse (2)", equilibre: "déjà à l'équilibre" };

// ── Le serveur ──
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  if (await fetch(BASE + "/").then(() => true, () => false)) {
    console.error(`scene-quotient : un serveur répond déjà sur le port ${PORT} — il serait mesuré à la place du build. L'arrêter, ou choisir PORT_QUOTIENT.`);
    process.exit(1);
  }
  const journal = `${os.tmpdir()}/scene-quotient-${PORT}-${process.pid}.log`;
  const fd = fs.openSync(journal, "w");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: ["ignore", fd, fd], detached: true });
  let vivant = false;
  for (let k = 0; k < 60; k++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-quotient : `next start` n'a pas répondu. Build absent ?");
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
const imprimes = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });
const juger = (famille, ok, detail) => noter(famille, ESSAI ? !ok : ok, detail);
process.on("uncaughtException", (e) => {
  for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
  console.log(`  ✘ [execution] la porte s'est ARRÊTÉE en cours de mesure : ${String(e?.stack ?? e).split("\n").slice(0, 3).join(" | ")}`);
  for (const x of erreurs.slice(0, 3)) console.log(`      ${x.slice(0, 240)}`);
  console.log(`\nROUGE — arrêt en cours de mesure, après ${resultats.length} mesure(s) (${resultats.filter((r) => !r.ok).length} rouge(s)).`);
  process.exit(1);
});

// ── La seconde voie, contrôlée contre les TABLES de la spec avant toute mesure ──
{
  const f = [];
  const B = { direct: 0, inverse: 0, equilibre: 0 };
  for (const p of CRANS) for (const o of CRANS) B[verdict("B", p, o)]++;
  if (B.direct !== 15 || B.inverse !== 9 || B.equilibre !== 1) f.push(`bain B ${JSON.stringify(B)} (spec : 15 / 9 / 1)`);
  for (const b of ["A", "C"]) for (const p of CRANS) for (const o of CRANS) if (verdict(b, p, o) !== "direct") f.push(`${b} ${p}/${o} n'est pas direct`);
  const t = [["A", "1.0e-3", "1.0e-1", "1{,}0\\times10^{-2}"], ["B", "2.5e-2", "1.0e-2", "2{,}5"], ["C", "1.0e-1", "1.0e-2", "1{,}0\\times10^{3}"], ["A", "5.0e-1", "1.0e-3", "500"], ["C", "5.0e-1", "1.0e-3", "5{,}0\\times10^{5}"], ["B", "1.0e-3", "2.5e-2", "4{,}0\\times10^{-2}"]];
  for (const [b, p, o, x] of t) if (deuxChiffres(q(b, p, o)) !== x) f.push(`${b} ${p}/${o} → ${deuxChiffres(q(b, p, o))} (spec ${x})`);
  if (ecartEntier("A", "1.0e-3", "1.0e-1") !== 39 || ecartEntier("A", "5.0e-1", "1.0e-3") !== 34 || ecartEntier("C", "1.0e-1", "1.0e-2") !== 12) f.push("les écarts 39 / 34 / 12");
  noter("nombres", f.length === 0, `la seconde voie contre les tables de la spec : ${f.length ? f.join(" ; ") : "bain B 15 / 9 / 1, A et C tout direct, six valeurs de table, écarts 39 / 34 / 12"}`);
}

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/evolution-spontanee/media/echelle-des-quotients.json", import.meta.url), "utf-8"));
const E = descripteur.etapes;
const ID = E.map((e) => e.id);
const juste = (k) => E[k].pari.choix.findIndex((c) => c.juste === true);

// ── La table des étapes, réécrite ICI (spec §5.6, §5.7, §7.6 A ; la maison : rien avant un pari) ──
const POSE = [["A", "1.0e-3", "1.0e-1"], ["A", "1.0e-3", "1.0e-1"], ["B", "1.0e-1", "1.0e-2"], ["C", "1.0e-1", "1.0e-2"], ["B", "2.5e-2", "1.0e-2"]];
const REVELE = [null, ["A", "5.0e-1", "1.0e-3"], null, null, null];
const OUVERTS = ["oxydant", "oxydant,produit", "bain", "bain,oxydant", "bain,oxydant,produit"];
const BAINS_OFFERTS = [null, null, "A,B", "A,B,C", "A,B,C"];
const LECT_AVANT = ["equation,expression,k,qri", "ecart,equation,expression,k,qri", "equation,expression,k,qri", "equation,k", "equation,k,melange,qri"];
const LECT_APRES = ["equation,expression,k,qri,sens", "ecart,equation,expression,k,qri,sens", "equation,especes,expression,k,qri,sens", "ecart,equation,expression,k,qri,sens", "equation,especes,k,melange,qri,sens"];
const BANDE = [false, false, true, true, true];
{
  const f = [];
  if (E.length !== 5) f.push(`${E.length} étapes (5)`);
  E.forEach((e, k) => {
    const s = e.etat ?? {};
    if ([s.bain, s.c_produit, s.c_oxydant].join("|") !== POSE[k].join("|")) f.push(`${e.id} pose ${[s.bain, s.c_produit, s.c_oxydant].join("/")} (attendu ${POSE[k].join("/")})`);
    const r = e.etat_revele;
    if (!!r !== !!REVELE[k]) f.push(`${e.id} : etat_revele ${r ? "PRÉSENT" : "absent"}`);
    if (r && REVELE[k] && (r.c_produit !== REVELE[k][1] || r.c_oxydant !== REVELE[k][2])) f.push(`${e.id} révèle ${r.c_produit}/${r.c_oxydant}`);
    if ([...e.controles].sort().join(",") !== OUVERTS[k]) f.push(`${e.id} ouvre [${e.controles.join(", ")}] (attendu ${OUVERTS[k]})`);
  });
  juger("etapes", f.length === 0, `descripteur : ${f.length ? f.join(" ; ") : "cinq étapes, les états posés du §5.3, le seul etat_revele à S2, les contrôles que chaque révélation ouvre"}`);
  const g = [];
  for (const e of E) if (!e.pari || e.pari.choix.length !== 4 || e.pari.choix.filter((c) => c.juste).length !== 1 || e.pari.choix.some((c) => !c.retour)) g.push(`${e.id} : pari mal formé`);
  const rangs = E.map((_, k) => juste(k));
  if (new Set(rangs).size === 1) g.push(`la clé est au rang ${rangs[0] + 1} aux cinq paris`);
  juger("paris", g.length === 0, `descripteur : ${g.length ? g.join(" ; ") : `cinq paris de quatre choix, un seul juste, un retour chacun ; clé aux rangs ${rangs.map((r) => r + 1).join(", ")}`}`);
}

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-quotient : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();
juger("avant-clic", (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0, "panneau fermé, aucun canvas");
const ouvrir = async (qq, p) => {
  await p.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
  await qq.getByRole("button", { name: OUVRIR }).click();
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
const installer = (p) => p.evaluate(() => {
  window.__tex = (el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(` ${a ? a.textContent : k.textContent} `)); });
    return (c.textContent ?? "").replace(/[\s  ]+/g, " ").trim();
  };
});
await installer(page);
/** une chaîne normalisée pour comparer du TeX : sans blancs, sans « \, », sans « \  » ni « ~ », apostrophes droites */
const norm = (t) => (t ?? "").replace(/\\[,;: ]/g, "").replace(/~/g, "").replace(/[’']/g, "'").replace(/\s+/g, "");
const lectures = (qq = panneau) => qq.evaluate((el) => Object.fromEntries([...el.querySelectorAll("[data-lecture]")].map((d) => [d.getAttribute("data-lecture"), window.__tex(d)])));
const clesLectures = async (qq = panneau) => (await qq.locator("[data-lecture]").evaluateAll((els) => els.map((e) => e.getAttribute("data-lecture")))).sort().join(",");
const controles = async (qq = panneau) => (await qq.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const valeursControle = (c, qq = panneau) => qq.locator(`[data-controle="${c}"] input[type="radio"]`).evaluateAll((els) => els.map((e) => e.value).join(","));
const parier = async (i, qq = panneau, p = page) => { await qq.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(p); await p.waitForTimeout(80); };
const suivant = (qq = panneau, p = page) => qq.getByRole("button", { name: "Étape suivante" }).click().then(() => deuxImages(p)).then(() => p.waitForTimeout(150));
const cocher = async (c, v, qq = panneau, p = page) => { await qq.locator(`[data-controle="${c}"] input[value="${v}"]`).check(); await deuxImages(p); await p.waitForTimeout(30); };
const texteRendu = (qq = panneau) => qq.evaluate((el) => `${window.__tex(el)}\n${el.querySelector("canvas")?.getAttribute("aria-label") ?? ""}\n${[...el.querySelectorAll("canvas")].map((c) => c.getAttribute("aria-describedby") ? document.getElementById(c.getAttribute("aria-describedby"))?.textContent ?? "" : "").join(" ")}`);
const annonce = (qq = panneau) => qq.evaluate((el) => el.querySelector("[data-annonce]")?.textContent ?? "");
const chevronDit = (qq = panneau) => qq.evaluate((el) => (el.querySelector("[data-chevron]")?.textContent ?? "").trim());
const etat = async (qq = panneau) => ({ bain: await qq.getAttribute("data-bain"), p: await qq.getAttribute("data-c-produit"), o: await qq.getAttribute("data-c-oxydant") });
const jetonCouleur = (nom, p = page) => p.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/** Le canvas classé : 1 = accent (en CHROMINANCE), 2 = encre, 3 = encre douce (gris), 0 = fond. */
const classer = (qq = panneau, ac = accent) => qq.evaluate((el, accent) => {
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
    else if (nc < 25 && Math.abs(l - lf) > 12) cls[k] = 3;
    if (nc > 20 && cos < 0.6) horsPalette++;
  }
  window.__cls = { cls, w: cv.width, h: cv.height, dpr };
  return { accentN, horsPalette, dpr, larg: cv.clientWidth, haut: cv.clientHeight };
}, ac);

/**
 * LES DEUX RÈGLES, LUES AUX PIXELS. Une ligne d'encre qui traverse au moins 60 % du canvas est une
 * règle ; ses graduations sont les colonnes d'encre de 1 à 3 px présentes à la fois 2 px AU-DESSUS et
 * 2 px AU-DESSOUS de la ligne (le pivot n'est qu'au-dessus ; la pastille fait ~7 px). Le fond du
 * bécher (une ligne longue au téléphone) n'a aucune graduation : il n'est pas une règle. Après `classer`.
 */
const regles = (qq = panneau) => qq.evaluate(() => {
  const { cls, w, h, dpr } = window.__cls;
  const encre = (X, Y) => Y >= 0 && Y < h && X >= 0 && X < w && cls[Y * w + X] === 2;
  const lignes = [];
  for (let Y = 0; Y < h; Y++) {
    let best = 0, run = 0, debut = 0, bd = 0;
    for (let X = 0; X < w; X++) { if (encre(X, Y)) { if (!run) debut = X; run++; if (run > best) { best = run; bd = debut; } } else run = 0; }
    if (best >= 0.6 * w) lignes.push({ Y, x0: bd, x1: bd + best - 1 });
  }
  // les lignes consécutives forment une seule règle (un trait de 1 px peut en tenir 2 à l'anticrénelage)
  const groupes = [];
  for (const l of lignes) { const g = groupes[groupes.length - 1]; if (g && l.Y - g.Y1 <= 1) { g.Y1 = l.Y; g.x0 = Math.min(g.x0, l.x0); g.x1 = Math.max(g.x1, l.x1); } else groupes.push({ Y0: l.Y, Y1: l.Y, x0: l.x0, x1: l.x1 }); }
  const out = [];
  for (const g of groupes) {
    const yc = (g.Y0 + g.Y1) / 2, off = Math.round(2.5 * dpr);
    const au = Math.round(g.Y0 - off), ad = Math.round(g.Y1 + off);
    const runs = (Y) => { const r = []; let a = null; for (let X = g.x0 - Math.round(4 * dpr); X <= g.x1 + Math.round(4 * dpr) + 1; X++) { const v = encre(X, Y); if (v && a === null) a = X; if (!v && a !== null) { r.push([a, X - 1]); a = null; } } return r; };
    const haut = runs(au), bas = runs(ad);
    const fins = (r) => r.filter(([a, b]) => b - a + 1 <= Math.ceil(3 * dpr));
    const larges = (r) => r.filter(([a, b]) => b - a + 1 >= Math.round(5 * dpr));
    // UN CHEVRON prolonge la ligne d'un triangle plein (sur la ligne même, il est d'un seul tenant
    // avec elle) : juste au-dessus de la ligne, c'est une plage large collée à un BOUT. On la retire
    // de l'étendue de la règle, et on la rend à part (premier lancement : la bande « couvrait 8,18
    // décades », et son chevron était lu comme une pastille plafonnée)
    const dessus = runs(Math.round(g.Y0 - 1)).filter(([a, b]) => b - a + 1 >= Math.round(4 * dpr));
    let x0 = g.x0, x1 = g.x1;
    const chevron = { gauche: false, droite: false };
    for (const [a, b] of dessus) {
      if (a <= g.x0 + 2) { chevron.gauche = true; x0 = b; }
      if (b >= g.x1 - 2) { chevron.droite = true; x1 = a; }
    }
    const dedans = ([a, b]) => a > x0 + 1 && b < x1 - 1;
    const traits = fins(bas).filter(([a, b]) => fins(haut).some(([c, d]) => c <= b + 1 && a <= d + 1)).map(([a, b]) => (a + b + 1) / 2 / dpr);
    const pastilles = larges(bas).filter(dedans).filter(([a, b]) => larges(haut).some(([c, d]) => c <= b && a <= d)).map(([a, b]) => (a + b + 1) / 2 / dpr);
    if (traits.length >= 4) out.push({ y: (yc + 0.5) / dpr, x0: x0 / dpr, x1: (x1 + 1) / dpr, traits, pastilles, chevron });
  }
  return out;
});
/** Le réseau des graduations : le pas médian, chaque trait à son rang, la régression — et le plus grand écart au réseau. */
function reseau(traits) {
  if (traits.length < 4) return null;
  // le pas : la MOYENNE des écarts d'un seul rang, pas leur médiane. Les traits sont posés au
  // pixel (9 ou 10 px pour un pas de 9,63) : la médiane rendait 10, et sur 46 décades le rang du
  // dernier trait tombait à 44 — tout l'axe glissait de deux décades (premier lancement)
  const ecarts = traits.slice(1).map((c, i) => c - traits[i]);
  const med = [...ecarts].sort((a, b) => a - b)[Math.floor(ecarts.length / 2)];
  const simples = ecarts.filter((e) => e > 0.6 * med && e < 1.4 * med);
  const sp = simples.reduce((a, e) => a + e, 0) / simples.length;
  const pts = traits.map((c) => [Math.round((c - traits[0]) / sp), c]);
  const n = pts.length, sx = pts.reduce((s, p) => s + p[0], 0), sy = pts.reduce((s, p) => s + p[1], 0);
  const sxx = pts.reduce((s, p) => s + p[0] * p[0], 0), sxy = pts.reduce((s, p) => s + p[0] * p[1], 0);
  const pente = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const origine = sy / n - pente * (sx / n);
  const res = Math.max(...pts.map((p) => Math.abs(p[1] - (origine + pente * p[0]))));
  const rangs = new Set(pts.map((p) => p[0]));
  return { pente, origine, res, premier: traits[0], dernierRang: Math.max(...rangs), n, rangs };
}
/** le PIVOT : un anneau de rayon ~4,5 px, 13 px au-dessus d'une règle ; son centre, cherché sur toute la largeur. */
const pivotSur = (y, x0, x1, qq = panneau) => qq.evaluate((_el, { y, x0, x1 }) => {
  const { cls, w, h, dpr } = window.__cls;
  const encre = (X, Y) => Y >= 0 && Y < h && X >= 0 && X < w && cls[Y * w + X] === 2;
  let best = null, bn = -1;
  for (let cx = x0; cx <= x1; cx += 0.5) {
    const cy = y - 13;
    let n = 0, vide = 0;
    for (let k = 0; k < 24; k++) { const a = (k * Math.PI) / 12; if (encre(Math.floor((cx + 4.5 * Math.cos(a)) * dpr), Math.floor((cy + 4.5 * Math.sin(a)) * dpr))) n++; }
    // un anneau est CREUX : le centre n'est pas de l'encre (la pastille, elle, est pleine)
    for (const [dx, dy] of [[1.5, 0], [-1.5, 0], [0, -1.5]]) if (encre(Math.floor((cx + dx) * dpr), Math.floor((cy + dy) * dpr))) vide++;
    const score = n - 4 * vide;
    if (score > bn) { bn = score; best = cx; }
  }
  return bn >= 14 ? best : null;
}, { y, x0, x1 });
/** La flèche d'ACCENT sur la ligne y + 17 d'une règle : son étendue, et de quel côté est la POINTE (le bout le plus haut). */
const flecheSous = (y, qq = panneau) => qq.evaluate((_el, y) => {
  const { cls, w, h, dpr } = window.__cls;
  const Y = Math.round((y + 17) * dpr);
  let a = null, b = null;
  for (let X = 0; X < w; X++) for (let dy = -2; dy <= 2; dy++) if (cls[(Y + dy) * w + X] === 1) { if (a === null) a = X; b = X; }
  if (a === null) return null;
  const haut = (X) => { let n = 0; for (let dy = -6; dy <= 6; dy++) if (cls[(Y + dy) * w + X] === 1) n++; return n; };
  // la tête est un triangle : FINE contre la pointe, LARGE à sa base (~6 px du bout) — la mesure se
  // prend de 3 à 7 px de chaque bout (premier lancement : prise à 1–3 px, elle rendait « ? » partout)
  const zone = (x0, sens) => Math.max(...[3, 4, 5, 6, 7].map((k) => haut(x0 + sens * Math.round(k * dpr))));
  const g = zone(a, 1), d = zone(b, -1);
  return { x0: a / dpr, x1: (b + 1) / dpr, pointe: g > d + 1 ? "gauche" : d > g + 1 ? "droite" : "?" };
}, y);

// ── LE MESUREUR : ce que le dessin dit de l'état, en DÉCADES, depuis ses propres graduations ──
async function mesurer(qq = panneau) {
  const c = await classer(qq);
  const rs = await regles(qq);
  const axe = rs[0] ?? null, bande = rs[1] ?? null;
  const ra = axe ? reseau(axe.traits) : null, rb = bande ? reseau(bande.traits) : null;
  const decAxe = (x) => (ra ? AXE.min + (x - ra.premier) / ra.pente : NaN);
  const px = (v) => ra.premier + (v - AXE.min) * ra.pente;
  const kx = axe ? await pivotSur(axe.y, axe.x0, axe.x1, qq) : null;
  const kbx = bande ? await pivotSur(bande.y, bande.x0, bande.x1, qq) : null;
  const fA = axe ? await flecheSous(axe.y, qq) : null, fB = bande ? await flecheSous(bande.y, qq) : null;
  const ch = bande ? bande.chevron : null;
  return { c, axe, bande, ra, rb, decAxe, px, kx, kbx, fA, fB, ch };
}

/** Tout ce qu'un état ATTEIGNABLE doit montrer, recalculé ici et comparé à l'écran — nombres et pixels. */
async function verifierEtat(b, p, o, ou, { revele, bande, qri = true, qq = panneau }) {
  const m = await mesurer(qq);
  const lu = await lectures(qq);
  const fN = [], fQ = [], fK = [], fV = [], fF = [], fB = [];
  const Q = q(b, p, o), v = verdict(b, p, o), lQ = lg(Q), lK = lg(K[b]);
  // N1 · N4 · N8 · N12 — les chaînes
  if (qri && lu.qri !== undefined && norm(lu.qri) !== norm(deuxChiffres(Q))) fN.push(`Q_{r,i} écrit « ${lu.qri} » (attendu ${deuxChiffres(Q)})`);
  if (lu.k !== undefined && norm(lu.k) !== norm(K_TEX[b])) fN.push(`K écrit « ${lu.k} » (attendu ${K_TEX[b]})`);
  if (lu.ecart !== undefined) { const n = ecartEntier(b, p, o), att = n === 0 ? "moins d'un ordre de grandeur" : `au moins ${n} ordres de grandeur`; if (norm(lu.ecart) !== norm(att)) fN.push(`écart « ${lu.ecart} » (attendu « ${att} »)`); }
  if (lu.melange !== undefined) { const att = `[${ION[b].p}]=${texCran(p)}[${ION[b].o}]=${texCran(o)}`; if (norm(lu.melange).replace(/\\text\{mol\/L\}/g, "\\text{mol/L}") !== norm(att)) fN.push(`mélange « ${lu.melange} » (attendu ${att})`); }
  if (lu.expression !== undefined && norm(lu.expression) !== norm(EXPRESSION[b])) fN.push(`expression « ${lu.expression} » (attendu ${EXPRESSION[b]})`);
  if (lu.sens !== undefined && norm(lu.sens) !== norm(TEX_SENS[v])) fN.push(`sens « ${lu.sens} » (attendu « ${TEX_SENS[v]} »)`);
  if (lu.especes !== undefined) {
    const t = norm(lu.especes);
    const ok = v === "equilibre" ? /aucune/.test(t) : v === "direct" ? t.startsWith(norm(ION[b].mD)) && t.includes(norm(ION[b].o)) : t.startsWith(norm(ION[b].mI)) && t.includes(norm(ION[b].p));
    if (!ok) fN.push(`espèces « ${lu.especes} » (verdict ${v})`);
  }
  juger("nombres", fN.length === 0, `${ou} : ${fN.length ? fN.join(" ; ") : `${Object.keys(lu).length} lecture(s), justes au caractère près`}`);
  // l'axe d'ensemble : 46 décades au pas constant
  if (!m.ra) { juger("axe-decades", false, `${ou} : l'axe est ILLISIBLE (${m.axe ? `${m.axe.traits.length} traits` : "aucune règle"})`); return m; }
  // K et Q_{r,i}, aux pixels, en décades lues sur les graduations
  if (m.kx === null || Math.abs(m.decAxe(m.kx) - lK) * m.ra.pente > 2) fK.push(`pivot ${m.kx === null ? "INTROUVABLE" : `à ${m.decAxe(m.kx).toFixed(2)} décade (attendu ${lK.toFixed(2)}, ${((m.decAxe(m.kx) - lK) * m.ra.pente).toFixed(1)} px)`}`);
  juger("position-k", fK.length === 0, `${ou} : ${fK.length ? fK.join(" ; ") : `pivot K à ${m.decAxe(m.kx).toFixed(2)} décade`}`);
  const dots = m.axe.pastilles;
  if (qri) {
    const d = dots.map((x) => ({ x, e: Math.abs(m.decAxe(x) - lQ) * m.ra.pente })).sort((a, b2) => a.e - b2.e)[0];
    if (!d || d.e > 2) fQ.push(`pastille ${d ? `à ${m.decAxe(d.x).toFixed(2)} (attendu ${lQ.toFixed(2)}, ${d.e.toFixed(1)} px)` : "INTROUVABLE"}`);
    if (dots.length !== 1) fQ.push(`${dots.length} pastilles sur l'axe (attendu 1)`);
    juger("position-qri", fQ.length === 0, `${ou} : ${fQ.length ? fQ.join(" ; ") : `pastille à ${m.decAxe(dots[0]).toFixed(2)} décade, ${d.e.toFixed(1)} px de ${lQ.toFixed(2)}`}`);
    // le côté et la flèche, sur l'axe — et sur la BANDE quand elle est là (§11.2 : la tolérance « confondu » se lit sur elle)
    if (d && m.kx !== null) {
      const cote = d.x < m.kx - 0.5 ? "direct" : d.x > m.kx + 0.5 ? "inverse" : "equilibre";
      if (!bande && cote !== v && v !== "equilibre") fV.push(`sur l'axe, la pastille est ${cote === "direct" ? "à GAUCHE" : "à DROITE"} du pivot et le verdict est « ${v} »`);
      // UNE flèche : sur l'axe d'ensemble, sauf quand la bande porte le repère — c'est elle qui la montre
      const dansBandeAtt = bande && lQ >= lK - 4 && lQ <= lK + 4;
      if (revele && dansBandeAtt) { if (m.fA) fF.push("une flèche sur l'axe d'ensemble EN PLUS de celle de la bande"); }
      else if (revele) {
        if (v === "equilibre") { if (m.fA) fF.push(`une flèche d'accent à l'équilibre (${m.fA.x0.toFixed(0)}→${m.fA.x1.toFixed(0)} px)`); }
        else if (!m.fA) fF.push("AUCUNE flèche du verdict");
        else {
          const [xg, xd] = [Math.min(d.x, m.kx), Math.max(d.x, m.kx)];
          if (Math.abs(m.fA.x0 - xg) > 3 || Math.abs(m.fA.x1 - xd) > 3) fF.push(`la flèche va de ${m.fA.x0.toFixed(0)} à ${m.fA.x1.toFixed(0)} px (repère ${d.x.toFixed(0)}, pivot ${m.kx.toFixed(0)})`);
          const vers = m.kx > d.x ? "droite" : "gauche";
          if (m.fA.pointe !== vers) fF.push(`la pointe est à ${m.fA.pointe} (le pivot est à ${vers})`);
        }
      } else if (m.fA) fF.push("une flèche d'accent AVANT le pari");
    }
  } else {
    juger("avant-pari", dots.length === 0 && !m.fA, `${ou} : ${dots.length} pastille(s) sur l'axe, ${m.fA ? "une flèche" : "aucune flèche"} (attendu : RIEN — le pari porte sur la valeur)`);
  }
  // la bande de travail
  if (bande) {
    const fb = [];
    if (!m.bande || !m.rb) fb.push("bande ABSENTE ou illisible");
    else {
      // (a)(b) le pas constant, huit décades de large
      if (m.rb.res > 1) fb.push(`graduations de la bande à ${m.rb.res.toFixed(2)} px de leur réseau`);
      const huit = (m.bande.x1 - m.bande.x0) / m.rb.pente;
      if (Math.abs(huit - 8) > 0.1) fb.push(`la bande couvre ${huit.toFixed(2)} décades (8)`);
      // le pivot au centre
      if (m.kbx === null || Math.abs(m.kbx - (m.bande.x0 + 4 * m.rb.pente)) > 1.5) fb.push(`pivot de la bande ${m.kbx === null ? "INTROUVABLE" : `à ${((m.kbx - m.bande.x0) / m.rb.pente).toFixed(2)} décade de son bord (4)`}`);
      const decB = (x) => lK - 4 + (x - m.bande.x0) / m.rb.pente;
      const dansB = lQ >= lK - 4 && lQ <= lK + 4;
      const bd = m.bande.pastilles;
      if (qri) {
        if (dansB) {
          const e = bd.length ? Math.min(...bd.map((x) => Math.abs(decB(x) - lQ) * m.rb.pente)) : Infinity;
          if (bd.length !== 1 || e > 2) fb.push(`pastille de la bande ${bd.length ? `à ${e.toFixed(1)} px de ${lQ.toFixed(2)}` : "ABSENTE"} (${bd.length} pastille(s))`);
          if (m.ch.gauche || m.ch.droite) fb.push("un chevron alors que le repère est DANS la bande");
          // la tolérance « confondu » se lit ICI : 2 px sur la bande (§11.2 cote-et-verdict)
          if (bd.length === 1 && m.kbx !== null) {
            const sep = bd[0] - m.kbx;
            const cote = Math.abs(sep) <= 2 ? "equilibre" : sep < 0 ? "direct" : "inverse";
            if (cote !== v) fV.push(`dans la bande, repère à ${sep.toFixed(1)} px du pivot (${cote}) — le verdict est « ${v} »`);
            imprimes.push(`${ou} : séparation dans la bande ${sep.toFixed(1)} px (${(lQ - lK).toFixed(3)} décade)`);
          }
          if (revele && v !== "equilibre") {
            if (!m.fB) fF.push("aucune flèche dans la bande");
            else if (bd.length === 1 && m.kbx !== null) {
              const vers = m.kbx > bd[0] ? "droite" : "gauche";
              if (m.fB.pointe !== vers) fF.push(`dans la bande, la pointe est à ${m.fB.pointe} (le pivot est à ${vers})`);
              if (Math.abs(m.fB.x0 - Math.min(bd[0], m.kbx)) > 3 || Math.abs(m.fB.x1 - Math.max(bd[0], m.kbx)) > 3) fF.push(`la flèche de la bande va de ${m.fB.x0.toFixed(0)} à ${m.fB.x1.toFixed(0)} px (repère ${bd[0].toFixed(0)}, pivot ${m.kbx.toFixed(0)})`);
            }
          } else if (m.fB) fF.push(revele ? "une flèche dans la bande à l'équilibre" : "une flèche dans la bande AVANT le pari");
        } else {
          // hors bande : AUCUNE pastille, un chevron du bon côté, et l'écart dit juste (§5.5 B)
          if (bd.length) fb.push(`une pastille DANS la bande (à ${bd.map((x) => decB(x).toFixed(2)).join(", ")}) alors que Q_{r,i} est à ${lQ.toFixed(2)} — plafonnée`);
          const cote = lQ < lK - 4 ? "gauche" : "droite";
          if (!m.ch[cote] || m.ch[cote === "gauche" ? "droite" : "gauche"]) fb.push(`chevron ${m.ch.gauche ? "à gauche" : ""}${m.ch.droite ? "à droite" : ""}${!m.ch.gauche && !m.ch.droite ? "ABSENT" : ""} (attendu à ${cote})`);
          const dit = await chevronDit(qq), n = ecartEntier(b, p, o);
          if (norm(dit) !== norm(`à ${n} décades à ${cote}`)) fb.push(`le chevron dit « ${dit} » (attendu « à ${n} décades à ${cote} »)`);
        }
      } else if (bd.length || m.ch.gauche || m.ch.droite) fb.push("une pastille ou un chevron dans la bande AVANT le pari de S4");
    }
    juger("bande-de-travail", fb.length === 0, `${ou} : ${fb.length ? fb.join(" ; ") : `bande de 8 décades au pas constant (${m.rb.pente.toFixed(2)} px/décade), pivot au centre, ${lQ >= lK - 4 && lQ <= lK + 4 ? "repère à sa place" : "chevron du bon côté, écart dit juste"}`}`);
  }
  if (qri) juger("cote-et-verdict", fV.length === 0, `${ou} : ${fV.length ? fV.join(" ; ") : `le côté du repère dit « ${v} »`}`);
  if (qri) juger("fleche-du-verdict", fF.length === 0, `${ou} : ${fF.length ? fF.join(" ; ") : revele ? (v === "equilibre" ? "aucune flèche : déjà à l'équilibre" : "la flèche part du repère et pointe vers le pivot") : "aucune flèche avant le pari"}`);
  return m;
}

/** L'axe d'ensemble, pour lui-même : 47 graduations au pas constant, du 10⁻⁴ au 10⁴², IDENTIQUE d'un bain à l'autre. */
let axeRef = null;
async function axeDecades(ou, qq = panneau) {
  const m = await mesurer(qq);
  const f = [];
  if (!m.ra) f.push("illisible");
  else {
    if (m.ra.res > 1) f.push(`une graduation à ${m.ra.res.toFixed(2)} px de son réseau`);
    if (m.ra.dernierRang !== AXE.max - AXE.min) f.push(`${m.ra.dernierRang} intervalles (46)`);
    if (m.ra.n < 45) f.push(`${m.ra.n} graduations lues (47, une peut se cacher sous la pastille)`);
    if (axeRef && (Math.abs(axeRef.premier - m.ra.premier) > 0.5 || Math.abs(axeRef.pente - m.ra.pente) > 0.02)) f.push(`l'axe a BOUGÉ : ${m.ra.premier.toFixed(1)} px, ${m.ra.pente.toFixed(3)} px/décade (d'abord ${axeRef.premier.toFixed(1)}, ${axeRef.pente.toFixed(3)})`);
    axeRef ??= { premier: m.ra.premier, pente: m.ra.pente };
  }
  juger("axe-decades", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : `46 décades à ${m.ra.pente.toFixed(3)} px, écart au réseau ${m.ra.res.toFixed(2)} px`}`);
  return m;
}

/** Avant chaque pari : ni accent, ni contrôle, les seules lectures de l'énoncé ; à S4, ni pastille, ni chevron. */
async function avantPari(k) {
  const f = [];
  const { accentN } = await classer();
  if (accentN) f.push(`${accentN} px d'accent`);
  const ctl = await controles();
  if (ctl) f.push(`contrôles [${ctl}]`);
  const lec = await clesLectures();
  if (lec !== LECT_AVANT[k]) f.push(`lectures [${lec}] (l'énoncé en donne [${LECT_AVANT[k]}])`);
  const roles = await panneau.evaluate((el) => [...el.querySelectorAll('[data-etiquette="role-oxyde"], [data-etiquette="role-reduit"]')].filter((e) => (e.textContent ?? "").trim()).length);
  if (roles) f.push(`${roles} étiquette(s) de rôle`);
  const txt = await panneau.evaluate((el) => el.querySelector("[data-annonce]")?.textContent ?? "");
  if (/sens (direct|inverse)|équilibre/.test(txt)) f.push(`la région vivante dit « ${txt} »`);
  juger("avant-pari", f.length === 0, `étape ${k + 1} (${ID[k]}), avant le pari : ${f.length ? f.join(" ; ") : `aucun accent, aucun contrôle, aucun rôle ; lectures = l'énoncé [${LECT_AVANT[k]}]`}`);
  // la bande : absente avant S3 (aux pixels, pas au DOM : c'est un dessin)
  const rs = await regles();
  juger("fuite-inter-etapes", (rs.length >= 2) === BANDE[k], `étape ${k + 1} : ${rs.length} règle(s) dessinée(s) — la bande est ${rs.length >= 2 ? "PRÉSENTE" : "absente"} (attendu ${BANDE[k] ? "présente" : "absente"})`);
}
/** Après chaque révélation : les contrôles que l'étape ouvre, les crans de `bain` offerts, les lectures. */
async function ouvertApres(k) {
  const f = [];
  const ctl = await controles();
  if (ctl !== OUVERTS[k]) f.push(`contrôles [${ctl}] (attendu ${OUVERTS[k]})`);
  if (BAINS_OFFERTS[k] && (await valeursControle("bain")) !== BAINS_OFFERTS[k]) f.push(`le bain offre [${await valeursControle("bain")}] (attendu ${BAINS_OFFERTS[k]})`);
  if (ctl.includes("oxydant") && (await valeursControle("oxydant")) !== CRANS.join(",")) f.push("les crans d'oxydant");
  if (ctl.includes("produit") && (await valeursControle("produit")) !== CRANS.join(",")) f.push("les crans de produit");
  juger("fuite-inter-etapes", f.length === 0, `étape ${k + 1} révélée : ${f.length ? f.join(" ; ") : `ouverts [${OUVERTS[k]}]${BAINS_OFFERTS[k] ? `, bain [${BAINS_OFFERTS[k]}]` : ""}`}`);
  const lec = await clesLectures();
  juger("fuite-inter-etapes", lec === LECT_APRES[k], `étape ${k + 1} révélée : lectures [${lec}] (attendu [${LECT_APRES[k]}])`);
}

// ── La frontière (§9), une sonde par FORME ──
const DECIMAL = /\d\s*\.\s*\d|°/;
const FRONTIERE = [
  ["E°", /E\s*°|E\^\{?\\circ|E\^0/u], ["Nernst", /nernst/iu], ["potentiel standard", /potentiels? standards?/iu], ["ESH", /\bESH\b/u], ["plus noble", /plus nobles?/iu],
  ["ΔG", /\\Delta\s*G|ΔG/u], ["enthalpie", /enthalpie/iu], ["entropie", /entropie/iu], ["règle du gamma", /r[èe]gle du gamma/iu], ["série électrochimique", /s[ée]rie [ée]lectrochimique/iu],
  ["avancement", /avancement/iu], ["τ", /\\tau\b|τ/u], ["x_max", /x_\{?max/iu], ["réactif limitant", /r[ée]actif limitant/iu],
  ["chaleur", /chaleur/iu], ["exothermique", /exothermique/iu], ["joule", /(^|[^\p{L}])joules?(?![\p{L}])/iu],
  ["pile", /(^|[^\p{L}-])piles?(?![\p{L}-])/iu], ["anode", /anode/iu], ["cathode", /cathode/iu], ["borne", /(^|[^\p{L}])bornes?(?![\p{L}])/iu], ["courant", /(^|[^\p{L}])courants?(?![\p{L}])/iu], ["Faraday", /faraday/iu], ["pont salin", /pont salin/iu],
  ["pH", /(^|[^\p{L}])pH(?![\p{L}])/u], ["K_A", /K_\{?A\b|\bpK_?A/u], ["précipité", /pr[ée]cipit/iu], ["K_s", /K_\{?s\b/u],
  ["pente", /(^|[^\p{L}])pentes?(?![\p{L}])/iu], ["en fonction du temps", /en fonction du temps/iu], ["±", /±|\\pm/u], ["incertitude", /incertitude/iu], ["TP", /(^|[^\p{L}])TP(?![\p{L}])/u], ["protocole", /protocole/iu],
  ["1,0×10⁻⁶", /1\{?,\}?0\\times10\^\{-6\}/u], ["1,0×10⁻⁵", /1\{?,\}?0\\times10\^\{-5\}/u],
];
{
  const exemples = ["E°", "la relation de Nernst", "le potentiel standard", "l'ESH", "le plus noble", "\\Delta G", "l'enthalpie", "l'entropie", "la règle du gamma", "la série électrochimique", "l'avancement", "\\tau", "x_{max}", "le réactif limitant", "la chaleur", "exothermique", "en joules", "la pile", "l'anode", "la cathode", "la borne", "le courant", "Faraday", "le pont salin", "le pH", "K_A", "un précipité", "K_s", "la pente", "en fonction du temps", "±", "l'incertitude", "en TP", "le protocole", "1{,}0\\times10^{-6}", "1{,}0\\times10^{-5}"];
  const muets = FRONTIERE.filter(([, re], i) => !re.test(exemples[i])).map(([n]) => n);
  const bruits = FRONTIERE.filter(([, re]) => re.test("L'axe est logarithmique ; la constante K vaut 2,5 ; le quotient Q_{r,i} ; une lame d'étain ; un dépôt de plomb ; l'équation ; 10 puissance 42 ; le mélange à l'instant initial ; bornes de l'axe")).map(([n]) => n);
  noter("frontiere", muets.length === 0 && bruits.join() === "borne", `les ${FRONTIERE.length} formes, chacune contre son exemple : ${muets.length ? `MUETTES : ${muets.join(", ")}` : "chacune vue"} ; sur une phrase propre de la scène, seule « borne » répond (« bornes de l'axe », que la scène n'écrit pas) : ${bruits.join(", ") || "aucune"}`);
}
async function frontiere(ou, qq = panneau) {
  const t = await texteRendu(qq);
  const vues = FRONTIERE.filter(([, re]) => re.test(t)).map(([n]) => n);
  if (DECIMAL.test(t)) vues.push(`un point décimal ou un degré (« ${t.match(DECIMAL)[0]} »)`);
  const lu = await lectures(qq);
  for (const c of ["qri", "k"]) if (lu[c] !== undefined && /mol/.test(lu[c])) vues.push(`une UNITÉ sur la lecture ${c} (« ${lu[c]} ») — Q_r et K sont sans unité`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `AFFICHÉ : ${vues.join(" ; ")}` : `aucune des ${FRONTIERE.length} formes, aucun point décimal, aucune unité sur Q_{r,i} ni K`}`);
}

// ── La formule graduée (§7.6 C), étape par étape ──
const GRADUEE = [
  [1, "25 mélanges / ordres de grandeur", /25 m[ée]langes|sur 25|ordres? de grandeur/iu],
  [2, "étain / Sn", /[ée]tain|(^|[^\p{L}])Sn(?![\p{L}])/u], [2, "plomb / Pb", /plomb|(^|[^\p{L}])Pb(?![\p{L}])/u], [2, "dépôt", /d[ée]p[ôo]t/iu], [2, "essai précédent", /essai pr[ée]c[ée]dent/iu],
  [2, "K = 2,5", /2(?:\{,\}|,)5(?!\s*(?:\\times|×))/u], [2, "se retourne", /se retourne/iu], [2, "oxydé", /oxyd[ée]/iu], [2, "réduit", /r[ée]dui(t|re)/iu],
  [3, "argent / Ag", /argent|(^|[^\p{L}])Ag(?![\p{L}])/u], [3, "exposant", /exposant/iu], [3, "puissance", /(?<!10 )puissance/iu], [3, "au carré / ^2", /au carr[ée]|\]\^\{?2\}?(?![+\d])/u],
  [3, "coefficient stœchiométrique", /coefficient st[œo]e?chiom/iu], [3, "2017", /2017/u], [3, "aluminium", /aluminium/iu],
  [4, "équilibre", /[ée]quilibre/iu], [4, "n'évolue pas", /n['’][ée]volue pas/iu], [4, "microscopique", /microscopique/iu], [4, "se compensent", /se compensent/iu], [4, "aucune, à l'échelle", /aucune, [àa] l['’][ée]chelle/iu],
];
async function formuleGraduee(k, ou) {
  const t = await texteRendu();
  const vues = GRADUEE.filter(([depuis, , re]) => k < depuis && re.test(t)).map(([d, n]) => `${n} (permis à partir de S${d + 1})`);
  juger("formule-graduee", vues.length === 0, `${ou} : ${vues.length ? `FUITE : ${vues.join(" ; ")}` : "aucune chaîne d'une étape suivante"}`);
}

// ── Les flèches chimiques (§9.11) : une double flèche, sous ses TROIS formes ; jamais une simple ──
const DOUBLE = /\\rightleftharpoons|\\rightleftarrows|\\underset\{[^{}]*\}\{\\overset\{[^{}]*\}\{\\rightleftarrows\}\}/;
{
  const formes = ["\\rightleftharpoons", "\\rightleftarrows", "\\underset{(2)}{\\overset{(1)}{\\rightleftarrows}}", "\\underset{2}{\\overset{1}{\\rightleftarrows}}"];
  noter("fleches-chimiques", formes.every((x) => DOUBLE.test(x)) && !DOUBLE.test("\\rightarrow") && !DOUBLE.test("\\to"), `le motif de la double flèche : ${formes.length} formes vues, la simple flèche refusée`);
}
async function flechesChimiques(ou) {
  const lu = await lectures();
  const eq = lu.equation ?? "";
  const simple = /\\(rightarrow|to|longrightarrow)(?![a-z])/.test(eq.replace(DOUBLE, ""));
  juger("fleches-chimiques", DOUBLE.test(eq) && !simple, `${ou} : l'équation ${DOUBLE.test(eq) ? "porte une double flèche" : "n'a PAS de double flèche"}${simple ? " — et une flèche SIMPLE" : ""}`);
}

async function katex(ou, qq = panneau) {
  const brut = await qq.evaluate((el) => el.innerText.match(/\\(dfrac|tfrac|frac|times|text|rightleftharpoons|rightleftarrows|overset)\b|\$[^$]{1,40}\$/g) ?? []);
  const err = await qq.evaluate(erreursKatex);
  juger("katex", !brut.length && !err.length, `${ou} : ${brut.length ? `LaTeX BRUT : ${brut.slice(0, 3).join(", ")} ; ` : ""}${err.length} erreur(s) KaTeX${err.length ? ` (${err.slice(0, 2).map((x) => `${x.forme} « ${x.texte} »`).join(", ")})` : ""}`);
}
async function lecturesEntieres(ou, qq = panneau) {
  const r = await qq.evaluate((el) => {
    const dl = el.querySelector("[data-lectures]");
    if (!dl) return null;
    const b = dl.getBoundingClientRect();
    const dehors = [];
    let n = 0;
    for (const dd of dl.querySelectorAll("[data-lecture]")) {
      n++;
      for (const k of dd.querySelectorAll(".katex")) { const kb = k.getBoundingClientRect(); if (kb.right > b.right + 0.5 || kb.left < b.left - 0.5) dehors.push(`${dd.getAttribute("data-lecture")} (${Math.round(kb.left - b.left)} → ${Math.round(kb.right - b.left)} px pour ${Math.round(b.width)})`); }
    }
    return { n, dehors, largeur: Math.round(b.width) };
  });
  if (!r) return juger("lectures-entieres", false, `${ou} : aucune liste de lectures`);
  juger("lectures-entieres", r.n > 0 && !r.dehors.length, `${ou} : ${r.n} lecture(s) dans ${r.largeur} px — ${r.dehors.length ? `DÉBORDENT : ${r.dehors.join(", ")}` : "chaque formule tient dans la liste"}`);
}
/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre, jamais sur un trait ; six au plus (§6.2). */
async function etiquettesLisibles(ou, qq = panneau) {
  const { textes, larg, haut, obstacles, encre } = await qq.evaluate((el) => {
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
  if (textes.length > 6) fautes.push(`${textes.length} étiquettes à la fois (budget : 6)`);
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre, aucune sur un trait, ≤ 6"}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) de trait sous la légende (attendu 0)`);
}
/** La palette : tout pixel teinté a la teinte de l'accent (lue au jeton), rien d'autre. */
async function palette(ou) {
  const { horsPalette } = await classer();
  juger("palette", horsPalette === 0, `${ou} : ${horsPalette} pixel(s) teinté(s) hors de l'accent`);
}
/** Le bécher : les DEUX solides quand le bain a un verdict inverse atteignable (§5.5 C) ; « oxydé » sur le bon métal. */
async function becher(b, p, o, ou, revele) {
  const f = [];
  // quels bains ont un inverse parmi leurs 25 états : calculé ICI
  const aInverse = CRANS.some((pp) => CRANS.some((oo) => verdict(b, pp, oo) === "inverse"));
  const pos = await panneau.evaluate((el) => {
    const cv = el.querySelector("canvas").getBoundingClientRect();
    const c = (n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); if (!e || getComputedStyle(e).visibility !== "visible") return null; const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2 - cv.left, y: r.top + r.height / 2 - cv.top, t: (e.textContent ?? "").trim() }; };
    return { lame: c("lame"), depot: c("depot"), ox: c("role-oxyde"), red: c("role-reduit") };
  });
  // le dépôt, lu aux PIXELS là où le produit le déclare : des grains d'encre douce
  const grains = pos.depot ? await panneau.evaluate((_el, d) => { const { cls, w, h, dpr } = window.__cls; let n = 0; for (let Y = Math.round((d.y) * dpr); Y < Math.round((d.y + 18) * dpr); Y++) for (let X = Math.round((d.x - 12) * dpr); X < Math.round((d.x + 12) * dpr); X++) if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] >= 2) n++; return n; }, pos.depot) : 0;
  if (aInverse && (!pos.depot || grains < 20)) f.push(`bain ${b} : un sens inverse est atteignable et le bécher n'a PAS de second solide (${pos.depot ? `${grains} px de grains` : "aucun dépôt"})`);
  const v = verdict(b, p, o);
  if (revele && v !== "equilibre" && pos.ox?.t) {
    const surLame = pos.lame && pos.depot ? Math.hypot(pos.ox.x - pos.lame.x, pos.ox.y - pos.lame.y) < Math.hypot(pos.ox.x - pos.depot.x, pos.ox.y - pos.depot.y) : true;
    if ((v === "direct") !== surLame) f.push(`« oxydé » posé sur ${surLame ? "la LAME" : "le DÉPÔT"} alors que le verdict est « ${v} »`);
  }
  if (revele && v === "equilibre" && (pos.ox?.t || pos.red?.t)) f.push("des rôles à l'ÉQUILIBRE");
  juger("becher-et-roles", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : `${aInverse ? "lame ET dépôt (un inverse est atteignable)" : "la lame"}${revele && v !== "equilibre" && pos.ox?.t ? `, « oxydé » sur ${v === "direct" ? "la lame" : "le dépôt"}` : ""}`}`);
}
/** N13 — tout compte de décades AFFIRMÉ dans le texte de la scène, recalculé depuis les deux valeurs qu'il compare. */
const MOTS = { une: 1, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6 };
async function decadesAffirmees(ou, attendus) {
  const t = (await texteRendu()).replace(/\s+/g, " ");
  const vus = [...t.matchAll(/(\d+|une|un|deux|trois|quatre|cinq|six)\s+d[ée]cades?(?:\s+plus)?(?:\s+(?:[àa]|vers la)\s+(gauche|droite))?/giu)].map((m) => ({ n: MOTS[m[1].toLowerCase()] ?? Number(m[1]), sens: m[2]?.toLowerCase() ?? null }));
  const f = [];
  for (const a of attendus) if (!vus.some((v) => v.n === a.n && (a.sens === null || v.sens === a.sens))) f.push(`« ${a.n} décade(s)${a.sens ? ` à ${a.sens}` : ""} » attendu, non trouvé`);
  for (const v of vus) if (!attendus.some((a) => a.n === v.n && (a.sens === null || a.sens === v.sens || v.sens === null))) f.push(`« ${v.n} décade(s)${v.sens ? ` à ${v.sens}` : ""} » AFFIRMÉ sans correspondre à aucun calcul`);
  juger("decades-affirmees", f.length === 0, `${ou} : ${f.length ? f.join(" ; ") : `${vus.length} compte(s) de décades, chacun recalculé (${vus.map((v) => `${v.n}${v.sens ? ` ${v.sens}` : ""}`).join(", ") || "aucun"})`}`);
}

// ════════════════════════════════════════ LE PARCOURS ════════════════════════════════════════
if (pret) {
  // ── S1 : de quel côté ──
  await avantPari(0);
  await axeDecades("étape 1, énoncé");
  await verifierEtat(...POSE[0], "étape 1, avant le pari", { revele: false, bande: false });
  await becher(...POSE[0], "étape 1, avant le pari", false);
  await formuleGraduee(0, "étape 1, avant le pari");
  await flechesChimiques("étape 1");
  await etiquettesLisibles("étape 1, avant le pari");
  await parier(juste(0));
  await ouvertApres(0);
  for (const o of CRANS) {
    await cocher("oxydant", o);
    await verifierEtat("A", "1.0e-3", o, `étape 1, oxydant ${o}`, { revele: true, bande: false });
  }
  await becher("A", "1.0e-3", "5.0e-1", "étape 1 révélée", true);
  await formuleGraduee(0, "étape 1 révélée");
  await frontiere("étape 1 révélée");
  await katex("étape 1 révélée");
  await lecturesEntieres("étape 1 révélée");
  await palette("étape 1 révélée");
  await etiquettesLisibles("étape 1 révélée");
  await suivant();

  // ── S2 : vingt-cinq mélanges ──
  await avantPari(1);
  await verifierEtat(...POSE[1], "étape 2, avant le pari", { revele: false, bande: false });
  await formuleGraduee(1, "étape 2, avant le pari");
  await parier(juste(1));
  {
    const s = await etat();
    juger("etapes", s.bain === "A" && s.p === REVELE[1][1] && s.o === REVELE[1][2], `étape 2 révélée : l'état est ${s.bain}/${s.p}/${s.o} (la révélation pose le mélange extrême ${REVELE[1].join("/")})`);
    const a = await annonce();
    juger("annonce", /m[ée]lange extr[êe]me/.test(a), `étape 2 révélée : la région vivante dit « ${a.slice(0, 120)} »`);
  }
  await ouvertApres(1);
  await verifierEtat(...REVELE[1], "étape 2 révélée, le mélange extrême", { revele: true, bande: false });
  await decadesAffirmees("étape 2 révélée", []);
  {
    const t = norm(await texteRendu());
    juger("nombres", t.includes(norm("au moins 34 ordres de grandeur")), `étape 2 révélée : le retour et la lecture disent « au moins 34 ordres de grandeur » (recalculé : ${ecartEntier(...REVELE[1])})`);
  }
  let vus = 0;
  for (const p of CRANS) for (const o of CRANS) {
    await cocher("produit", p);
    await cocher("oxydant", o);
    await verifierEtat("A", p, o, `étape 2, ${p}/${o}`, { revele: true, bande: false });
    vus++;
  }
  imprimes.push(`étape 2 : ${vus} mélanges du bain A mesurés, aucun en sens inverse (recalculé : ${CRANS.flatMap((p) => CRANS.map((o) => verdict("A", p, o))).filter((v) => v === "inverse").length})`);
  await formuleGraduee(1, "étape 2 révélée");
  await frontiere("étape 2 révélée");
  await katex("étape 2 révélée");
  await suivant();

  // ── S3 : même geste, autre couple ──
  await avantPari(2);
  await verifierEtat(...POSE[2], "étape 3, avant le pari", { revele: false, bande: true });
  await becher(...POSE[2], "étape 3, avant le pari", false);
  await formuleGraduee(2, "étape 3, avant le pari");
  await etiquettesLisibles("étape 3, avant le pari");
  await parier(juste(2));
  await ouvertApres(2);
  const mB = await verifierEtat("B", "1.0e-1", "1.0e-2", "étape 3 révélée, bain B", { revele: true, bande: true });
  await becher("B", "1.0e-1", "1.0e-2", "étape 3 révélée, bain B", true);
  await etiquettesLisibles("étape 3 révélée, bain B");
  await cocher("bain", "A");
  const mA = await verifierEtat("A", "1.0e-1", "1.0e-2", "étape 3 révélée, bain A (même mélange)", { revele: true, bande: true });
  await axeDecades("étape 3, bain A");
  {
    // LE GESTE DE S3 : le repère ne bouge pas, le pivot saute de ~37 décades
    const qa = mA.axe?.pastilles?.[0], qb = mB.axe?.pastilles?.[0];
    const saut = mA.kx !== null && mB.kx !== null && mA.ra ? (mA.kx - mB.kx) / mA.ra.pente : NaN;
    juger("position-qri", qa !== undefined && qb !== undefined && Math.abs(qa - qb) <= 1, `étape 3, bain A ↔ B au même mélange : la pastille ${qa !== undefined && qb !== undefined ? `bouge de ${(qa - qb).toFixed(1)} px` : "INTROUVABLE"} (attendu 0 : Q_{r,i} est une propriété du MÉLANGE)`);
    juger("position-k", Math.abs(saut - (lg(K.A) - lg(K.B))) < 0.1, `étape 3, bain A ↔ B : le pivot saute de ${saut.toFixed(2)} décades (recalculé ${(lg(K.A) - lg(K.B)).toFixed(2)})`);
  }
  await cocher("bain", "B");
  await formuleGraduee(2, "étape 3 révélée");
  await frontiere("étape 3 révélée");
  await katex("étape 3 révélée");
  await lecturesEntieres("étape 3 révélée");
  await suivant();

  // ── S4 : l'exposant ──
  await avantPari(3);
  await verifierEtat(...POSE[3], "étape 4, avant le pari", { revele: false, bande: true, qri: false });
  await formuleGraduee(3, "étape 4, avant le pari");
  await etiquettesLisibles("étape 4, avant le pari");
  // le contre-essai : les QUATRE choix sont des expressions, et ils ne sont PAS des lectures
  {
    const choix = await panneau.locator("[data-pari-choix] li").count();
    juger("avant-pari", choix === 4 && !(await clesLectures()).includes("expression"), `étape 4, avant le pari : ${choix} choix au panneau, aucune LECTURE « expression » (contre-essai : un choix n'est pas une lecture)`);
  }
  await parier(juste(3));
  await ouvertApres(3);
  const m4 = await verifierEtat(...POSE[3], "étape 4 révélée", { revele: true, bande: true });
  // le retour juste (« deux décades plus à GAUCHE », juste ↔ exposant omis) et le chevron de la bande
  // (« à 12 décades à gauche », Q_{r,i} = 10³ contre K = 4×10¹⁵) — chacun recalculé ici
  await decadesAffirmees("étape 4 révélée", [{ n: Math.round(lg(q("C", "1.0e-1", "1.0e-2")) - lg([SUR_DIX_MILLE["1.0e-1"], SUR_DIX_MILLE["1.0e-2"]])), sens: "gauche" }, { n: ecartEntier("C", "1.0e-1", "1.0e-2"), sens: "gauche" }]);
  // la suite : un rang d'argent VERS LE BAS, et la marque parcourt DEUX décades vers la droite
  await cocher("oxydant", "1.0e-3");
  const m4b = await verifierEtat("C", "1.0e-1", "1.0e-3", "étape 4, argent à 1,0×10⁻³", { revele: true, bande: true });
  {
    const a = m4.axe?.pastilles?.[0], b2 = m4b.axe?.pastilles?.[0];
    const dec = a !== undefined && b2 !== undefined && m4.ra ? (b2 - a) / m4.ra.pente : NaN;
    juger("position-qri", Math.abs(dec - 2) < 0.1, `étape 4 : diviser [Ag⁺] par dix déplace la pastille de ${dec.toFixed(2)} décades (recalculé : ${(lg(q("C", "1.0e-1", "1.0e-3")) - lg(q("C", "1.0e-1", "1.0e-2"))).toFixed(2)}, vers la droite)`);
  }
  // F2 : bain B, sans toucher au cuivre, second ion à 1,0×10⁻² — l'état est ATTEIGNABLE et il dit « inverse »
  await cocher("bain", "B");
  await cocher("oxydant", "1.0e-2");
  await verifierEtat("B", "1.0e-1", "1.0e-2", "étape 4, bain B (le retour de l'inversé y envoie)", { revele: true, bande: true });
  for (const b of ["A", "B", "C"]) for (const o of CRANS) { await cocher("bain", b); await cocher("oxydant", o); await verifierEtat(b, "1.0e-1", o, `étape 4, ${b} ${o}`, { revele: true, bande: true }); }
  await formuleGraduee(3, "étape 4 révélée");
  await frontiere("étape 4 révélée");
  await katex("étape 4 révélée");
  await suivant();

  // ── S5 : pile sur le pivot ──
  await avantPari(4);
  await verifierEtat(...POSE[4], "étape 5, avant le pari", { revele: false, bande: true });
  await formuleGraduee(4, "étape 5, avant le pari");
  await etiquettesLisibles("étape 5, avant le pari (Q_{r,i} et K au même point)");
  {
    const lu = await lectures();
    juger("nombres", norm(lu.qri) === norm(lu.k) && norm(lu.k) === norm(K_TEX.B), `étape 5 : Q_{r,i} et K écrits « ${lu.qri} » et « ${lu.k} » — identiques au caractère près (N3)`);
  }
  const avant5 = await lectures();
  await parier(juste(4));
  await ouvertApres(4);
  {
    const apres = await lectures();
    juger("nombres", norm(apres.melange) === norm(avant5.melange), `étape 5 révélée : le mélange ne bouge pas d'un caractère (« ${apres.melange} ») — l'état initial EST l'état final (F10)`);
  }
  await verifierEtat(...POSE[4], "étape 5 révélée, l'équilibre", { revele: true, bande: true });
  await becher(...POSE[4], "étape 5 révélée", true);
  // la suite : un cran de Sn²⁺ vers le bas — Q = 1,0, et le verdict dit « direct »
  await cocher("produit", "1.0e-2");
  await verifierEtat("B", "1.0e-2", "1.0e-2", "étape 5, Sn²⁺ à 1,0×10⁻² (le faux seuil)", { revele: true, bande: true });
  // LES 75 ÉTATS — N1, N2, N3, N4, N10 et les pixels
  const eq = [];
  for (const b of ["A", "B", "C"]) {
    await cocher("bain", b);
    for (const p of CRANS) for (const o of CRANS) {
      await cocher("produit", p);
      await cocher("oxydant", o);
      await verifierEtat(b, p, o, `étape 5, ${b} ${p}/${o}`, { revele: true, bande: true });
      const lu = await lectures();
      if (/[ée]quilibre/.test(lu.sens ?? "")) eq.push(`${b} ${p}/${o}`);
    }
    await axeDecades(`étape 5, bain ${b}`);
  }
  juger("nombres", eq.length === 1 && eq[0] === "B 2.5e-2/1.0e-2", `les 75 états : ${eq.length} à l'équilibre (${eq.join(", ") || "aucun"}) — attendu un seul, B 2,5×10⁻² / 1,0×10⁻² (N3)`);
  await formuleGraduee(4, "étape 5 révélée");
  await frontiere("étape 5 révélée");
  await katex("étape 5 révélée");
  await lecturesEntieres("étape 5 révélée");
  await palette("étape 5 révélée");
}

// ── Au téléphone (390 px) : la bande sépare S3 et confond S5 ; les étiquettes aux cinq étapes ──
if (pret) {
  const nav2 = await lancer();
  try {
    const ctx2 = await nav2.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const p2 = await ctx2.newPage();
    await p2.bringToFront();
    await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
    await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    await installer(p2);
    const qq = p2.locator(`[data-scene="${SCENE}"]`);
    await qq.scrollIntoViewIfNeeded();
    await ouvrir(qq, p2);
    for (let k = 0; k < 5; k++) {
      await etiquettesLisibles(`390 px, étape ${k + 1}, avant le pari`, qq);
      if (k === 2 || k === 4) {
        const m = await mesurer(qq);
        const bd = m.bande?.pastilles ?? [];
        const sep = bd.length === 1 && m.kbx !== null ? Math.abs(bd[0] - m.kbx) : NaN;
        if (k === 2) juger("bande-de-travail", sep >= 16, `390 px, étape 3 : Q_{r,i} = 10 et K = 2,5 séparés de ${sep.toFixed(1)} px dans la bande (≥ 16)`);
        else juger("bande-de-travail", sep <= 2, `390 px, étape 5 : Q_{r,i} = K confondus à ${sep.toFixed(1)} px dans la bande (≤ 2)`);
        imprimes.push(`390 px, étape ${k + 1} : séparation dans la bande ${sep.toFixed(1)} px ; sur l'axe d'ensemble ${m.axe?.pastilles?.[0] !== undefined && m.kx !== null ? Math.abs(m.axe.pastilles[0] - m.kx).toFixed(1) : "?"} px`);
      }
      await parier(juste(k), qq, p2);
      await p2.waitForTimeout(120);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, qq);
      await lecturesEntieres(`390 px, étape ${k + 1} révélée`, qq);
      if (k < 4) await suivant(qq, p2);
    }
    await p2.evaluate(() => document.documentElement.style.setProperty("--font-scale", "1.125"));
    await p2.waitForTimeout(150);
    await lecturesEntieres("390 px, texte A+ (×1,125), étape 5", qq);
    await etiquettesLisibles("390 px, texte A+ (×1,125), étape 5", qq);
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
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-quotient : l'échelle des quotients (${URL_SCENE})`);
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
