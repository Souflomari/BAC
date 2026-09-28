#!/usr/bin/env node
/**
 * scene-champ-pentes — la porte de « ce que l'équation dit en chaque point »
 * (maths/equations-differentielles, R2 ; spec
 * docs/pipeline/propositions/maths-equations-differentielles-scene-pentes.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et trouve son panneau par
 * `[data-scene="champ-des-pentes"]`. La scène est ANALYTIQUE : la porte refait chaque NOMBRE par sa
 * propre arithmétique (les crans de la spec, écrits ICI, en flottants), et compare (a) des chaînes
 * EXACTES dans la forme que le produit écrit (entiers, \dfrac{n}{2} — ADR 0039) et (b) leur valeur,
 * évaluée, au calcul refait, à 10⁻⁹. Les PENTES ATTENDUES DES SEGMENTS VIENNENT DE LA PORTE, jamais
 * de l'écran (ADR 0036).
 *
 * LES FAMILLES (spec §11, amendées par la construction) : avant-clic · pas-de-3d · etapes · paris ·
 * stem-non-contamine · avant-pari · nombres (N1–N10) · isotropie · segment-a-la-bonne-pente ·
 * segment-longueur-fixe · champ-lisible · ligne-du-palier · courbe-clippee-pas-plafonnee ·
 * courbes-jamais-confondues · courbe-jamais-sur-le-palier · point-fixe · palette ·
 * quadrillage-opaque · formule-graduee · fuite-inter-etapes · frontiere · katex · etiquettes · cadre ·
 * lectures-entieres · sans-mouvement · annonce · console · ergonomie.
 *
 * LES DEUX FAMILLES DE SÉPARATION SONT BORNÉES À L'ÉTAT POSÉ DE LEUR ÉTAPE (spec §11.2, BLOCKING-1) :
 * `courbe-jamais-sur-le-palier` à l'état posé de S4 (a = −½, b = 2, P = (0 ; 5)) et à lui seul ;
 * `courbes-jamais-confondues` à l'état posé de S5 (les trois départs) et à lui seul. Ailleurs, la
 * confusion arrive DANS le cadre sur un produit juste (0,55 px au bord gauche à a = +½, b = −2) — ce
 * sont l'ORDRE et le non-franchissement qui y sont mesurés, pas la distance. Les deux planchers sont
 * RECALCULÉS ici depuis l'échelle lue, et une porte dont le seuil dépasse son plancher sort MUETTE.
 *
 * Ce que la porte NE mesure PAS, écrit à côté (ADR 0035) : « jamais » (aucun dessin ne le montre,
 * §10.3) ; les 60 états du modèle au pixel — les nombres des 60 sont gardés par
 * `test-champ-pentes.mjs`, les pentes dessinées ici aux 12 équations, à S6, où elles sont toutes
 * atteignables ; la lisibilité du CALME des 169 marques au téléphone (vague 2, des yeux).
 * ÉCART À LA SPEC, décidé à la construction et écrit dans le panneau : AUCUN contrôle n'existe avant
 * le pari, à aucune étape (la spec rouvrait b, point, champ, famille dès l'énoncé de S6) ; et à S2
 * l'« exception » mesurée avant le pari est le point FIXE (0 ; 3) à l'encre — pas un champ (§7.7 A :
 * « le segment en P, le segment au point fixe, [...] restent absents »).
 *
 *   node scripts/scene-champ-pentes.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-champ-pentes.mjs --essai-rouge  (chaque famille doit crier)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { erreursKatex } from "./lib/katex-erreurs.mjs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_PENTES ?? 3900 + (process.pid % 60));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/equations-differentielles";
const SCENE = "champ-des-pentes";
const OUVRIR = "Ouvrir le plan";

// ── La seconde voie : les crans de la SPEC (§5.2), en flottants, rien du produit ──
const XA = -8, XB = 4, YA = -6, YB = 6;
const A_F = { "-1": -1, "-0.5": -0.5, "0.5": 0.5 };
const B_F = { "-2": -2, "0": 0, "1": 1, "2": 2 };
const COEFS = ["-1", "-0.5", "0.5"], TERMES = ["-2", "0", "1", "2"];
const POINTS = { origine: [0, 3], decale: [2, 3], haut: [0, 5], bas: [0, -3], sur: [0, 2] };
const POINT_FIXE = [0, 3];
const DEPARTS = [[0, 5], [0, 2], [0, -3]];
const penteF = (a, b, y) => A_F[a] * y + B_F[b];
const palierF = (a, b) => -B_F[b] / A_F[a] || 0;
const courbeF = (a, b, x0, y0) => { const k = palierF(a, b); return (x) => k + (y0 - k) * Math.exp(A_F[a] * (x - x0)); };
/** la forme EXACTE que le produit écrit (ADR 0039) : « -3 », « \dfrac{7}{2} », « -\dfrac{1}{2} » */
const exact = (v) => {
  const d2 = Math.round(v * 2);
  if (Math.abs(v * 2 - d2) > 1e-9) return null;
  if (d2 % 2 === 0) return `${d2 / 2 || 0}`;
  return `${d2 < 0 ? "-" : ""}\\dfrac{${Math.abs(d2)}}{2}`;
};
/** une chaîne lue, évaluée : entier ou ±\dfrac{n}{d} */
const evalQ = (t) => {
  const s = (t ?? "").replace(/\s+/g, "").replace(/−/g, "-");
  let m = s.match(/^(-?)\\dfrac\{(\d+)\}\{(\d+)\}$/);
  if (m) return (m[1] ? -1 : 1) * (Number(m[2]) / Number(m[3]));
  m = s.match(/^-?\d+$/);
  return m ? Number(s) : null;
};
// Un décimal, un arrondi ou un « ≈ », sous TOUTES les formes (la virgule française s'écrit « {,} » en TeX)
const INEXACT = /\d\s*[.,]\s*\d|\{,\}|≈|\\approx|~/u;

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  if (await fetch(BASE + "/").then(() => true, () => false)) {
    console.error(`scene-champ-pentes : un serveur répond déjà sur le port ${PORT} — il serait mesuré à la place du build. L'arrêter, ou choisir PORT_PENTES.`);
    process.exit(1);
  }
  const journal = `${os.tmpdir()}/scene-champ-pentes-${PORT}-${process.pid}.log`;
  const fd = fs.openSync(journal, "w");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: ["ignore", fd, fd], detached: true });
  let vivant = false;
  for (let k = 0; k < 60; k++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-champ-pentes : `next start` n'a pas répondu. Build absent ?");
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
process.on("uncaughtException", (e) => {
  for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
  console.log(`  ✘ [execution] la porte s'est ARRÊTÉE en cours de mesure : ${String(e?.stack ?? e).split("\n").slice(0, 3).join(" | ")}`);
  for (const x of erreurs.slice(0, 3)) console.log(`      ${x.slice(0, 240)}`);
  console.log(`\nROUGE — arrêt en cours de mesure, après ${resultats.length} mesure(s) (${resultats.filter((r) => !r.ok).length} rouge(s)).`);
  process.exit(1);
});
const imprimes = [];

// le motif de l'inexact, contre chaque forme qu'il doit voir (une porte qui ne voit pas « 3{,}5 » est verte pour rien)
{
  const muets = ["3,50", "0.5", "3{,}5", "≈ 4", "\\approx 4"].filter((x) => !INEXACT.test(x));
  noter("nombres", muets.length === 0, `le motif de l'inexact : ${muets.length ? `MUET sur ${muets.join(", ")}` : "5 formes, chacune vue (dont « 3{,}5 » et « \\approx »)"}`);
}

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/equations-differentielles/media/champ-des-pentes.json", import.meta.url), "utf-8"));
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
if (!chapitre) { console.error(`scene-champ-pentes : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();
{
  const ferme = (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0;
  juger("avant-clic", ferme, "panneau fermé, aucun canvas");
  const titre = await panneau.evaluate((el) => el.textContent ?? "");
  juger("frontiere", !/champ (des|de) pentes|champ de directions/iu.test(titre), `carte fermée : ${/champ (des|de) pentes/iu.test(titre) ? "« champ des pentes » ÉCRIT (§9.7)" : "le titre porte la question, jamais « champ des pentes »"}`);
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
  const webgl = await page.evaluate(() => [...document.querySelectorAll("canvas")].some((c) => { try { return !!(c.__webgl || false); } catch { return false; } }));
  juger("pas-de-3d", trois3 === null && deuxD && !webgl, `panneau OUVERT : window.__THREE__ ${trois3 ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
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
const part = (sel, q = panneau) => q.evaluate((el, s) => { const e = el.querySelector(s); return e ? window.__tex(e) : null; }, sel);
const controles = async (q = panneau) => (await q.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const crans = (c, q = panneau) => q.locator(`[data-controle="${c}"] input`).evaluateAll((els) => els.map((e) => e.value));
const clesLectures = async (q = panneau) => (await q.locator("[data-lecture]").evaluateAll((els) => els.map((e) => e.getAttribute("data-lecture")))).sort().join(",");
const parier = async (i, q = panneau, p = page) => { await q.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(p); await p.waitForTimeout(80); };
const suivant = (q = panneau, p = page) => q.getByRole("button", { name: "Étape suivante" }).click().then(() => deuxImages(p)).then(() => p.waitForTimeout(150));
const cocher = async (ctl, v, q = panneau, p = page) => { await q.locator(`[data-controle="${ctl}"] input[value="${v}"]`).check(); await deuxImages(p); await p.waitForTimeout(30); };
const texteRendu = (q = panneau) => q.evaluate((el) => `${window.__tex(el)}\n${el.querySelector("canvas")?.getAttribute("aria-label") ?? ""}`);
const legendeTex = (q = panneau) => q.evaluate((el) => { const e = el.querySelector("[data-legende]"); return e ? window.__tex(e).replace(/\s+/g, "") : ""; });
const annonce = (q = panneau) => q.evaluate((el) => el.querySelector("[data-annonce]")?.textContent ?? "");
const descr = (q = panneau) => q.locator("canvas").getAttribute("aria-label").then((x) => x ?? "");
const jetonCouleur = (nom, p = page) => p.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/**
 * Le canvas classé : 1 = accent, 2 = encre (neutre, à plus de 60 de luminance du fond), 0 = le reste.
 * `horsPalette` : les pixels teintés dont la teinte n'est pas celle de l'accent — avec le cône du
 * correctif de scene-quotient (cos ≤ 0,85 : la zone morte entre 0,6 et 0,85 laissait passer une teinte
 * voisine, 2026-09-28).
 */
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
    if (nc > 20 && cos <= 0.85) horsPalette++;
  }
  window.__cls = { cls, w: cv.width, h: cv.height, dpr, d, lf };
  return { accentN, horsPalette, dpr };
}, ac);

/**
 * L'échelle LUE sur les graduations des deux axes, avec le RANG de chaque graduation : la fenêtre se
 * lit comme les rangs extrêmes trouvés (−8 et 4 en x, −6 et 6 en y). Après `classer`, à un état où
 * aucun segment de champ ne croise la rangée d'étude (S1 avant le pari).
 */
const echelleLue = (q = panneau) => q.evaluate(() => {
  const { cls, w, h, dpr } = window.__cls;
  const encre = (X, Y) => X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === 2;
  let yAxe = 0, xAxe = 0, mY = -1, mX = -1;
  for (let Y = 0; Y < h; Y++) { let n = 0; for (let X = 0; X < w; X++) if (encre(X, Y)) n++; if (n > mY) { mY = n; yAxe = Y; } }
  for (let X = 0; X < w; X++) { let n = 0; for (let Y = 0; Y < h; Y++) if (encre(X, Y)) n++; if (n > mX) { mX = n; xAxe = X; } }
  const runs = (vals) => { const c = []; let a = null; vals.forEach((v, k) => { if (v && a === null) a = k; if ((!v || k === vals.length - 1) && a !== null) { c.push((a + (v ? k : k - 1)) / 2 + 0.5); a = null; } }); return c; };
  const off = Math.max(2, Math.round(2 * dpr));
  const cx = runs([...Array(w)].map((_, X) => encre(X, yAxe + off)));
  const cy = runs([...Array(h)].map((_, Y) => encre(xAxe - off, Y)));
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
    const rangs = pts.map((p) => p[0]);
    return { pente, origine: sy / n - pente * (sx / n), min: Math.min(...rangs), max: Math.max(...rangs), n };
  };
  const gx = regresse(cx, xAxe + 0.5), gy = regresse(cy, yAxe + 0.5);
  if (!gx || !gy) return { ok: false, cx: cx.length, cy: cy.length };
  // les rangs en y sont comptés vers le BAS de l'écran : le rang +k de la régression est y = −k
  return { ok: true, sX: gx.pente / dpr, sY: gy.pente / dpr, o: { x: gx.origine / dpr, y: gy.origine / dpr }, fx: [gx.min, gx.max], fy: [-gy.max, -gy.min], larg: w / dpr, haut: h / dpr };
});

let E0 = null;
const px = (z, e = E0) => ({ x: e.o.x + e.sX * z[0], y: e.o.y - e.sY * z[1] });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

/** Les boîtes des étiquettes et de la légende, en px CSS du canvas (les sondes les évitent). */
const boitesTexte = (q = panneau) => q.evaluate((el) => {
  const rc = el.querySelector("canvas").getBoundingClientRect();
  return [...el.querySelectorAll("[data-etiquette], [data-legende]")].filter((e) => getComputedStyle(e).visibility === "visible" && (e.textContent ?? "").trim()).map((e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left - 2, y0: b.top - rc.top - 2, x1: b.right - rc.left + 2, y1: b.bottom - rc.top + 2 }; });
});

/**
 * Les SEGMENTS DU CHAMP, lus aux pixels d'encre autour de chaque point entier (px CSS) : l'angle
 * (direction principale), la longueur (étendue le long de cette direction), le nombre de pixels.
 * On écarte les bandes des deux axes (2,5 px) et les boîtes données. Après `classer`.
 */
const segmentsLus = (centres, R, exclus, axe, q = panneau) => q.evaluate((_el, { centres, R, exclus, axe }) => {
  const { cls, w, h, dpr } = window.__cls;
  return centres.map((c) => {
    const xs = [], ys = [];
    for (let Y = Math.floor((c.y - R) * dpr); Y <= Math.ceil((c.y + R) * dpr); Y++) for (let X = Math.floor((c.x - R) * dpr); X <= Math.ceil((c.x + R) * dpr); X++) {
      if (X < 0 || Y < 0 || X >= w || Y >= h || cls[Y * w + X] !== 2) continue;
      const x = (X + 0.5) / dpr, y = (Y + 0.5) / dpr;
      if (Math.hypot(x - c.x, y - c.y) > R) continue;
      if (Math.abs(x - axe.x) < 2.5 || Math.abs(y - axe.y) < 2.5) continue;
      if (exclus.some((b) => x >= b.x0 && x <= b.x1 && y >= b.y0 && y <= b.y1)) continue;
      xs.push(x); ys.push(y);
    }
    const n = xs.length;
    if (n < 6) return { n, angle: null, long: 0 };
    const mx = xs.reduce((s, v) => s + v, 0) / n, my = ys.reduce((s, v) => s + v, 0) / n;
    let sxx = 0, syy = 0, sxy = 0;
    for (let i = 0; i < n; i++) { const dx = xs[i] - mx, dy = ys[i] - my; sxx += dx * dx; syy += dy * dy; sxy += dx * dy; }
    const th = 0.5 * Math.atan2(2 * sxy, sxx - syy);
    const ux = Math.cos(th), uy = Math.sin(th);
    let lo = Infinity, hi = -Infinity;
    for (let i = 0; i < n; i++) { const t = (xs[i] - mx) * ux + (ys[i] - my) * uy; lo = Math.min(lo, t); hi = Math.max(hi, t); }
    // l'angle en repère MATHÉMATIQUE (y vers le haut), dans ]−90° ; 90°]
    let a = (-th * 180) / Math.PI;
    while (a <= -90) a += 180;
    while (a > 90) a -= 180;
    return { n, angle: a, long: hi - lo, cx: mx, cy: my, bouts: [{ x: mx + lo * ux, y: my + lo * uy }, { x: mx + hi * ux, y: my + hi * uy }] };
  });
}, { centres, R, exclus, axe });
const ecartAngle = (a, b) => { let d = Math.abs(a - b) % 180; return Math.min(d, 180 - d); };
const dSegSeg = (p, q2, r, s) => {
  const dPS = (P, A, B) => { const vx = B.x - A.x, vy = B.y - A.y, L2 = vx * vx + vy * vy || 1; const t = Math.max(0, Math.min(1, ((P.x - A.x) * vx + (P.y - A.y) * vy) / L2)); return Math.hypot(P.x - A.x - t * vx, P.y - A.y - t * vy); };
  return Math.min(dPS(p, r, s), dPS(q2, r, s), dPS(r, p, q2), dPS(s, p, q2));
};

/** Les pixels d'ACCENT d'une colonne (px CSS x), en plages : leurs centres (px CSS y). Après `classer`. */
const accentColonne = (x, q = panneau) => q.evaluate((_el, x) => {
  const { cls, w, h, dpr } = window.__cls;
  const X = Math.floor(x * dpr);
  if (X < 0 || X >= w) return [];
  const c = []; let a = null;
  for (let Y = 0; Y <= h; Y++) {
    const v = Y < h && cls[Y * w + X] === 1;
    if (v && a === null) a = Y;
    if (!v && a !== null) { c.push((a + Y) / 2 / dpr); a = null; }
  }
  return c;
}, x);
/** La part d'une rangée (px CSS) couverte par un genre, entre deux abscisses. Après `classer`. */
const couvertureRangee = (y, x0, x1, genre, tol = 1, q = panneau) => q.evaluate((_el, { y, x0, x1, genre, tol }) => {
  const { cls, w, h, dpr } = window.__cls;
  let n = 0, oui = 0;
  for (let x = x0; x <= x1; x += 1) {
    n++;
    let vu = false;
    for (let v = -tol; v <= tol && !vu; v += 0.5) { const X = Math.floor(x * dpr), Y = Math.floor((y + v) * dpr); if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === genre) vu = true; }
    if (vu) oui++;
  }
  return oui / Math.max(1, n);
}, { y, x0, x1, genre, tol });

// ── La formule graduée (§7.7 C) : ce qu'une étape n'a PAS encore le droit d'écrire ──
const MOT = (m) => new RegExp(`(^|[^\\p{L}])${m}(?![\\p{L}])`, "iu");
const FG = {
  b: /(^|[^\p{L}\\])b(?![\p{L}])/u,
  palier: MOT("paliers?"),
  plat: MOT("(plat|plate|plats|plates)"),
  horizontal: MOT("horizonta(l|le|ux|les)"),
  parallèle: MOT("parallèles?"),
  abscisse: MOT("abscisses?"),
  courbe: MOT("courbes?"),
  famille: MOT("familles?"),
  "-b/a": /\\dfrac\{b\}\{a\}|-b\/a|−b\/a/u,
  "solution qui passe par": /solution qui passe par/iu,
  "s'approche": /s['’]approche/iu,
  "n'arrive pas": /n['’]arrive pas/iu,
  ralentit: MOT("ralenti(t|ssent)?"),
  trajectoire: MOT("trajectoires?"),
  atteint: MOT("atteint"),
  "tend vers": /tend vers/iu,
  "plusieurs solutions": /plusieurs solutions/iu,
  "écart au palier": /écart au palier/iu,
  "b(a+1)": /b\s*\(\s*a\s*\+\s*1\s*\)/u,
  "a = −1": /(^|[^\p{L}])a\s*=\s*[-−]\s*1(?![\d{,])/u,
  "le palier vaut b": /(le palier|la ligne plate) (vaut|est|c['’]est) (toujours )?b(?![\p{L}])/iu,
  "tombe sur la valeur de b": /tombe[^.]{0,20}sur la valeur de b/iu,
  "à chaque cran de b": /à (chaque|tous les) crans? de b/iu,
  "pour tout b": /pour tout b(?![\p{L}])|quel que soit b(?![\p{L}])/iu,
  plusieurs: MOT("plusieurs"),
  "toutes les solutions": /toutes les solutions/iu,
  "se coupent": /se coupent/iu,
  "d'où qu'elles partent": /d['’]où qu['’]elles partent/iu,
  recopier: MOT("recopi(er|e|es|ent)"),
  "au-dessous … montent": /au-dessous[^.]{0,40}mont(ent|e)/iu,
  unique: MOT("uniques?"),
  "un seul réglage": /un seul réglage/iu,
};
const INTERDIT = [
  ["b", "palier", "plat", "horizontal", "parallèle", "abscisse", "courbe", "famille", "-b/a"],
  ["b", "palier", "plat", "courbe", "famille", "solution qui passe par", "-b/a", "s'approche", "n'arrive pas", "ralentit"],
  ["courbe", "trajectoire", "s'approche", "atteint", "tend vers", "famille", "plusieurs solutions", "écart au palier", "b(a+1)", "a = −1", "le palier vaut b", "tombe sur la valeur de b", "à chaque cran de b", "pour tout b"],
  ["famille", "plusieurs", "toutes les solutions", "se coupent", "d'où qu'elles partent", "b(a+1)", "a = −1", "le palier vaut b", "recopier", "à chaque cran de b", "pour tout b", "au-dessous … montent"],
  ["b(a+1)", "a = −1", "le palier vaut b", "recopier", "unique", "un seul réglage", "à chaque cran de b", "pour tout b"],
  [],
];
/** S1 : une liste BLANCHE de nombres, dans ce que l'étape affirme (consigne, question, suite, lectures) — §7.7 C, L-e */
const NOMBRES_S1 = new Set(["0", "2", "3", "5", "-3", "-1", "-2", "-5", "1"]);
async function formule(ou, k) {
  const t = await texteRendu();
  const fautes = INTERDIT[k].filter((c) => FG[c].test(t)).map((c) => `« ${c} » ÉCRIT trop tôt (${t.match(FG[c])?.[0]?.trim()})`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `aucune de [${INTERDIT[k].join(", ") || "—"}]`}`);
}
{
  // les textes du descripteur, y compris ceux qu'aucun parcours n'affiche (retours non choisis)
  const fautes = [];
  E.forEach((e, k) => {
    const textes = [e.consigne, e.titre, e.pari?.question, e.suite, ...(e.pari?.choix ?? []).flatMap((c) => [c.texte, c.retour])].filter(Boolean);
    for (const c of INTERDIT[k] ?? []) for (const x of textes) {
      // le distracteur `recopie-b` de S3 DIT « c'est la valeur de b » : un énoncé faux NÉCESSAIRE (§7.7 C, 3e passe)
      if (FG[c].test(x)) fautes.push(`${e.id} : « ${c} » dans « ${x.slice(0, 70)}… »`);
    }
    if (k === 0) {
      const affirme = [e.consigne, e.pari?.question, e.suite].filter(Boolean).join(" ");
      const hors = [...affirme.replace(/\(\s*0\s*\\?,?\s*;\s*/g, "(0;").matchAll(/[-−]?\d+/g)].map((m) => m[0].replace("−", "-")).filter((n) => !NOMBRES_S1.has(n));
      if (hors.length) fautes.push(`${e.id} : nombre(s) hors de la liste blanche de S1 : ${[...new Set(hors)].join(", ")}`);
    }
  });
  juger("formule-graduee", fautes.length === 0, `les textes du descripteur (consignes, questions, choix, retours, suites) : ${fautes.length ? fautes.slice(0, 5).join(" ; ") : "aucune forme avant son étape"}`);
}

// ── La frontière (§9), une sonde par FORME ──
const FORMES = [
  ["Ce^{ax}", /Ce\^\{|C\s*e\^\{|e\^\{[-−]?a\s*x\}/u], ["\\exp", /\\exp/u], ["exponentielle", MOT("exponentielles?")],
  ["solution générale", /solution générale|ensemble des solutions/iu], ["C ∈ ℝ", /C\s*\\in\s*\\mathbb\{R\}/u], ["constante d'intégration", /constante d['’]intégration/iu],
  ["y(x) =", /y\s*\(\s*x\s*\)\s*=/u], ["y = C", /(^|[^\p{L}'’])y\s*=\s*C(?![\p{L}])/u],
  ["condition initiale", /condition initiale/iu], ["x_0", /x_0|x_\{0\}|y_0\s*=|y\(x_0\)/u], ["déterminer C", /déterminer C(?![\p{L}])|fixer la constante|épingler/iu], ["pour que la courbe passe par", /pour que la courbe passe par/iu],
  ["y''", /y''|y\^\{\\prime\\prime\}|y″/u], ["second ordre", /second ordre|équation caractéristique|discriminant|\\Delta\s*=|racine double/iu], ["\\omega", /\\omega|pulsation|\\cos|\\sin|oscill|(^|[^\p{L}])période/iu],
  ["RC", /(^|[^\p{L}])(RC|RL)(?![\p{L}])|u_C|i\(t\)|\\tau|constante de temps/u],
  ["électricité", /condensateur|bobine|résistance|(^|[^\p{L}])(dé)?charge(?![\p{L}])|circuit|intensité|tension|(^|[^\p{L}])volts?(?![\p{L}])|ampère|(^|[^\p{L}])ohm|farad|henry/iu],
  ["unités", /(^|[^\p{L}])(seconde|minute)s?(?![\p{L}])|°C|degré|°/iu], ["thermique", /température|café|tasse|refroidi/iu], ["radioactivité", /radioactiv|\\lambda|N_0|N\(t\)/u],
  ["second membre", /second membre|f\(x\)|g\(x\)|variation de la constante|solution particulière/iu],
  ["méthode", /séparation des variables|séparer les variables|\\dfrac\{dy\}\{y\}|\\int|intégrer|logarithme|\\ln|fonction auxiliaire/iu],
  ["Euler", /euler|pas à pas|pas de discrétisation|\\Delta x|\\Delta t|approximation|approché|tangente successive|taylor|développement limité/iu],
  ["systèmes dynamiques", /champ de vecteurs|champ de directions|champ (des|de) pentes|courbe intégrale|isocline|portrait de phase|plan de phase|point d['’]équilibre|équilibre stable|stabilité|attracteur|autonome|(^|[^\p{L}])flot(?![\p{L}])|cauchy|unicité/iu],
  ["algèbre linéaire", /matrice|\\begin\{pmatrix\}|système différentiel|dérivée partielle|\\partial|vecteur propre/iu],
  ["a = 0", /(^|[^\p{L}])a\s*=\s*0(?![\d{,])|y'\s*=\s*b(?![\p{L}])/u],
  ["examen", /examen|au bac|le bac|les sujets|un sujet|annale|chaque année|presque toujours|le plus courant|(^|[^\p{L}])souvent|(^|[^\p{L}])revient|classique|tombe souvent|on te le demandera/iu],
];
{
  // chaque sonde, contre la forme qu'elle doit voir (une sonde muette sur sa propre forme ne mesure rien)
  const essais = { "Ce^{ax}": "y = Ce^{ax}", exponentielle: "l'exponentielle", "solution générale": "la solution générale", unités: "20 °C", thermique: "la tasse de café", Euler: "la méthode d'Euler", "systèmes dynamiques": "un champ des pentes", examen: "au bac, souvent", "a = 0": "si a = 0", "second membre": "un second membre" };
  const muettes = Object.entries(essais).filter(([n, t]) => !FORMES.find(([m]) => m === n)[1].test(t)).map(([n]) => n);
  noter("frontiere", muettes.length === 0, `les sondes, contre leur propre forme : ${muettes.length ? `MUETTES : ${muettes.join(", ")}` : `${Object.keys(essais).length} formes, chacune vue`}`);
  // le mot « piège » SEUL reste permis (§9.12) — contre-essai
  noter("frontiere", !FORMES.some(([, re]) => re.test("c'est le piège le plus coûteux de ce chapitre")), "contre-essai : « le piège le plus coûteux de ce chapitre » laisse la frontière VERTE (§9.12)");
}
const pourFrontiere = (t) => t.replace(/y'\s*=\s*-?\d*\{?,?\}?\d*\\?,?\s*y/gu, "EQ");
async function frontiere(ou, q = panneau) {
  const t = await texteRendu(q);
  const vues = FORMES.filter(([, re]) => re.test(pourFrontiere(t))).map(([n]) => n);
  const lu = Object.values(await lectures(q)).join(" ");
  if (INEXACT.test(lu)) vues.push(`un nombre INEXACT dans les LECTURES (${lu.match(INEXACT)[0]})`);
  // §9.10 : les nombres des LECTURES et du BADGE sont dans les grilles
  const badge = await legendeTex(q);
  const m = badge.match(/^y'=(-?[\d{},]*\\?,?y|-y)([+-]\d)?$/);
  if (!m) vues.push(`le badge écrit « ${badge} » (hors des formes y' = a y + b de la grille)`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `AFFICHÉ : ${vues.join(" ; ")}` : `aucune des ${FORMES.length} formes ; lectures exactes ; badge dans la grille`}`);
}
{
  const fautes = [];
  for (const e of E) {
    const textes = [e.consigne, e.titre, e.pari?.question, e.suite, ...(e.pari?.choix ?? []).flatMap((c) => [c.texte, c.retour])].filter(Boolean);
    for (const x of textes) for (const [n, re] of FORMES) if (re.test(pourFrontiere(x))) fautes.push(`${e.id} : « ${n} » dans « ${x.slice(0, 60)}… »`);
  }
  for (const k of ["title_fr", "caption_fr"]) if (descripteur[k] && FORMES.some(([, re]) => re.test(descripteur[k]))) fautes.push(`${k} : forme interdite`);
  juger("frontiere", fautes.length === 0, `les textes du descripteur : ${fautes.length ? fautes.slice(0, 4).join(" ; ") : "aucune forme du §9"}`);
}
async function katex(ou, q = panneau) {
  const brut = await q.evaluate((el) => el.innerText.match(/\\(dfrac|tfrac|frac|sqrt|mathbb)\b|\$[^$]{1,40}\$/g) ?? []);
  const err = await q.evaluate(erreursKatex);
  juger("katex", !brut.length && !err.length, `${ou} : ${brut.length ? `LaTeX BRUT : ${brut.slice(0, 3).join(", ")} ; ` : ""}${err.length} erreur(s) KaTeX`);
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
      for (const k of dd.querySelectorAll(".katex")) { const kb = k.getBoundingClientRect(); if (kb.right > b.right + 0.5 || kb.left < b.left - 0.5) dehors.push(dd.getAttribute("data-lecture")); }
    }
    return { n, dehors, largeur: Math.round(b.width) };
  });
  if (!r) return juger("lectures-entieres", false, `${ou} : aucune liste de lectures`);
  juger("lectures-entieres", r.n > 0 && !r.dehors.length, `${ou} : ${r.n} lecture(s) dans ${r.largeur} px — ${r.dehors.length ? `DÉBORDENT : ${r.dehors.join(", ")}` : "chaque formule tient dans la liste"}`);
}
/**
 * Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; au plus trois (plus le badge :
 * quatre, §6.2). Sur un plan couvert de segments, une pastille recouvre forcément du CHAMP — ce qui ne
 * doit pas être sous une étiquette, c'est la RÉPONSE et l'énoncé : l'accent, la bande des axes, la ligne
 * du palier, et le segment en P. Et sous la légende, rien du tout (`cadre`).
 */
async function etiquettesLisibles(ou, q = panneau, e0 = E0, ctxEtat = {}) {
  const { textes, larg, haut, legende, accentSous, encreLegende } = await q.evaluate((el) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter(visible).filter((e) => (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), ...boite(e) }));
    const lg = el.querySelector("[data-legende]");
    const legende = lg ? boite(lg) : null;
    const { cls, w, h, dpr } = window.__cls;
    const compte = (b, genre) => { let n = 0; for (let Y = Math.max(0, Math.floor(b.y0 * dpr)); Y < Math.min(h, Math.ceil(b.y1 * dpr)); Y++) for (let X = Math.max(0, Math.floor(b.x0 * dpr)); X < Math.min(w, Math.ceil(b.x1 * dpr)); X++) if (cls[Y * w + X] === genre) n++; return n; };
    return { textes, larg: rc.width, haut: rc.height, legende, accentSous: textes.map((t) => compte(t, 1)), encreLegende: legende ? compte(legende, 2) + compte(legende, 1) : 0 };
  });
  const fautes = [];
  const inter = (a, b) => a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1;
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) if (inter(a, textes[j])) fautes.push(`« ${a.nom} » chevauche « ${textes[j].nom} »`);
    if (legende && inter(a, legende)) fautes.push(`« ${a.nom} » SOUS la légende`);
    if (accentSous[i] > 0) fautes.push(`« ${a.nom} » posée sur ${accentSous[i]} px d'ACCENT (la réponse)`);
    if (e0) {
      const o = e0.o;
      if (a.y0 < o.y + 1.5 && a.y1 > o.y - 1.5 && a.x1 > 0) fautes.push(`« ${a.nom} » sur l'axe des abscisses`);
      if (a.x0 < o.x + 1.5 && a.x1 > o.x - 1.5) fautes.push(`« ${a.nom} » sur l'axe des ordonnées`);
      if (ctxEtat.palier !== undefined && ctxEtat.palier !== null) { const yk = px([0, ctxEtat.palier], e0).y; if (a.y0 < yk + 1.5 && a.y1 > yk - 1.5) fautes.push(`« ${a.nom} » sur la ligne du palier`); }
      if (ctxEtat.P) { const c = px(ctxEtat.P, e0), r = ctxEtat.L / 2 + 1; if (a.x0 < c.x + r && a.x1 > c.x - r && a.y0 < c.y + r && a.y1 > c.y - r) fautes.push(`« ${a.nom} » sur le segment en P`); }
    }
  }
  if (textes.length > 3) fautes.push(`${textes.length} étiquettes à la fois, plus le badge (budget : quatre en tout)`);
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s) + le badge${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre, rien de la réponse dessous"}`);
  juger("cadre", encreLegende === 0, `${ou} : ${encreLegende} pixel(s) de trait sous la légende (attendu 0)`);
}

// ── Les lectures d'un état, contre le calcul refait ──
async function nombres(ou, a, b, point, lusAttendus) {
  const lu = await lectures();
  const [, y0] = POINTS[point];
  const fautes = [];
  const verifier = (cle, texte, v) => {
    const t = sansBlanc(texte);
    if (exact(v) === null) { fautes.push(`${cle} : la porte attend un nombre hors de ½ℤ (${v})`); return; }
    if (t !== exact(v)) fautes.push(`${cle} écrit « ${t} » (attendu « ${exact(v)} »)`);
    const e = evalQ(t);
    if (e === null || Math.abs(e - v) > 1e-9) fautes.push(`${cle} lu ne vaut pas ${v}`);
    if (INEXACT.test(t)) fautes.push(`${cle} INEXACT (« ${t} »)`);
  };
  if (lu.pente !== undefined) verifier("pente", lu.pente, penteF(a, b, y0));
  if (lu["pentes-comparees"] !== undefined) {
    const fixe = sansBlanc(await part('[data-pente="fixe"]')), enP = sansBlanc(await part('[data-pente="P"]'));
    const vF = evalQ(fixe.split(":").pop()), vP = evalQ(enP.split(":").pop());
    if (!/^en\(0\\,;3\)/.test(fixe)) fautes.push(`le point fixe écrit « ${fixe} »`);
    if (vF === null || Math.abs(vF - penteF(a, b, 3)) > 1e-9) fautes.push(`pente en (0 ; 3) lue « ${fixe} » (attendu ${penteF(a, b, 3)})`);
    if (vP === null || Math.abs(vP - penteF(a, b, y0)) > 1e-9) fautes.push(`pente en P lue « ${enP} » (attendu ${penteF(a, b, y0)})`);
    if (/[QR](?![\p{L}])/u.test(fixe + enP)) fautes.push("un point nommé Q ou R (une seule lettre dans la scène, §5.6)");
  }
  if (lu.palier !== undefined) {
    verifier("palier", lu.palier, palierF(a, b));
    if (!Number.isInteger(palierF(a, b))) fautes.push("palier hors de ℤ");
    if (/dfrac\{b\}|b\/a/.test(lu.palier)) fautes.push("la lecture palier écrit la FORMULE (§9.1)");
  }
  if (lu["ecart-au-palier"] !== undefined) {
    verifier("ecart-au-palier", lu["ecart-au-palier"], y0 - palierF(a, b));
    // N4 : la pente vaut a × l'écart
    if (lu.pente !== undefined) { const p = evalQ(sansBlanc(lu.pente)), e = evalQ(sansBlanc(lu["ecart-au-palier"])); if (p === null || e === null || Math.abs(p - A_F[a] * e) > 1e-9) fautes.push("pente ≠ a × écart"); }
  }
  const cles = Object.keys(lu).sort().join(",");
  if (lusAttendus !== undefined && cles !== lusAttendus) fautes.push(`lectures [${cles}] (attendu [${lusAttendus}])`);
  juger("nombres", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `${Object.keys(lu).length} lecture(s), formes et valeurs exactes`}`);
  return lu;
}

// ── Les SEGMENTS d'un état, mesurés aux pixels contre les pentes de la PORTE ──
function centresDuChamp(e0, P, marques, j = null) {
  const c = [];
  for (let jj = YA; jj <= YB; jj++) {
    if (j !== null && jj !== j) continue;
    for (let i = XA; i <= XB; i++) {
      if (i === 0 || jj === 0) continue;
      if (marques.some(([mx, my]) => Math.hypot(i - mx, jj - my) < 0.01)) continue;
      c.push({ i, j: jj, ...px([i, jj], e0) });
    }
  }
  return c;
}
async function champMesure(ou, a, b, { e0 = E0, q = panneau, marques = [], sauterRangee = null, L = 22, toutes = true } = {}) {
  const exclus = await boitesTexte(q);
  const cs = centresDuChamp(e0, null, marques).filter((c) => sauterRangee === null || c.j !== sauterRangee);
  const lus = await segmentsLus(cs.map((c) => ({ x: c.x, y: c.y })), L / 2 + 2, exclus, e0.o, q);
  const fautes = [], longs = [];
  let mesures = 0, absents = 0;
  for (let k = 0; k < cs.length; k++) {
    const s = lus[k], c = cs[k];
    if (s.angle === null) { absents++; continue; }
    // un segment partiellement sous une étiquette : son angle reste lisible, pas sa longueur
    const entier = s.n >= 0.6 * L;
    const att = (Math.atan(penteF(a, b, c.j)) * 180) / Math.PI;
    const d = ecartAngle(s.angle, att);
    mesures++;
    if (d > 1 && entier) fautes.push(`(${c.i} ; ${c.j}) : ${s.angle.toFixed(1)}° (attendu ${att.toFixed(1)}°)`);
    if (entier) longs.push(s.long);
  }
  void absents; void toutes; // la PRÉSENCE des segments est la famille `champ-lisible`, pas celle-ci
  juger("segment-a-la-bonne-pente", fautes.length === 0 && mesures >= 100, `${ou} : ${mesures} segments mesurés${fautes.length ? ` — ${fautes.slice(0, 4).join(" ; ")}${fautes.length > 4 ? ` (+${fautes.length - 4})` : ""}` : ", chacun à ≤ 1° de arctan(a·y + b)"}`);
  longs.sort((x, y) => x - y);
  const eta = longs.length ? longs[longs.length - 1] - longs[0] : 99;
  juger("segment-longueur-fixe", longs.length >= 80 && eta <= 1.5, `${ou} : ${longs.length} longueurs de ${longs[0]?.toFixed(1)} à ${longs[longs.length - 1]?.toFixed(1)} px (étendue ${eta.toFixed(2)}, attendu ≤ 1,5)`);
  return { cs, lus };
}
/** le pas du champ et l'écart entre segments voisins (§6.2 : pas de 1 à toutes les largeurs, écart ≥ 6 px) */
function champLisible(ou, cs, lus, e0 = E0) {
  const par = new Map(cs.map((c, k) => [`${c.i},${c.j}`, lus[k]]));
  let min = Infinity, ou_ = "";
  for (const c of cs) {
    const s = par.get(`${c.i},${c.j}`);
    if (!s?.bouts) continue;
    for (const [di, dj] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
      const t = par.get(`${c.i + di},${c.j + dj}`);
      if (!t?.bouts) continue;
      const d = dSegSeg(s.bouts[0], s.bouts[1], t.bouts[0], t.bouts[1]);
      if (d < min) { min = d; ou_ = `(${c.i} ; ${c.j})–(${c.i + di} ; ${c.j + dj})`; }
    }
  }
  const presents = lus.filter((s) => s.angle !== null).length;
  juger("champ-lisible", presents >= 0.8 * cs.length && min >= 6, `${ou} : ${presents}/${cs.length} points entiers portent un segment (pas de 1) ; écart minimal entre voisins ${min.toFixed(1)} px ${ou_} (attendu ≥ 6)`);
}

// ── Les courbes, lues colonne par colonne sur l'accent ──
async function courbesLues(xs, e0 = E0, q = panneau) {
  const r = [];
  for (const x of xs) r.push({ x, ys: await accentColonne(px([x, 0], e0).x, q) });
  return r;
}

// ── La table des étapes, réécrite ICI contre le descripteur (§7.7 A, §5.5) ──
const CTRL_ATTENDUS = [
  { point: 5 },
  { champ: 4, point: 5 },
  { b: 4, point: 5 },
  { a: ["-0.5", "0.5"], b: 4 },
  { a: ["-0.5", "0.5"], b: 4, champ: 4, famille: 3, point: 5 },
  { a: ["-1", "-0.5", "0.5"], b: 4, champ: 4, famille: 3, point: 5 },
];
const LECT_ATTENDUES = ["pente", "pentes-comparees", "palier,pente", "ecart-au-palier,palier,pente", "ecart-au-palier,palier,pente", "palier"];
{
  const f = [];
  if (E.length !== 6) f.push(`${E.length} étapes (attendu 6)`);
  for (const e of E) {
    const ch = e.pari?.choix ?? [];
    if (ch.length !== 4 || ch.filter((c) => c.juste).length !== 1 || ch.some((c) => !c.retour)) f.push(`${e.id} : pari mal formé`);
    if (new Set(ch.map((c) => sansBlanc(c.texte))).size !== ch.length) f.push(`${e.id} : deux choix au même texte`);
  }
  const rangs = E.map((_, k) => juste(k));
  if (new Set(rangs).size === 1) f.push(`la clé est au rang ${rangs[0] + 1} aux six paris`);
  juger("paris", f.length === 0, `descripteur : ${f.length ? f.join(" ; ") : `six paris de quatre choix, un seul juste, un retour chacun, textes distincts ; rangs de la clé [${rangs.map((r) => r + 1).join(", ")}]`}`);
}
{
  // STEM : aucune étape dont un choix porte `palier-recopie-b` ne POSE a = −1, et le cran −1 n'est OFFERT
  // par aucun contrôle avant S6 (§7.7 E, 3e passe)
  const f = [];
  E.forEach((e, k) => {
    const porte = (e.pari?.choix ?? []).some((c) => [c.misconception].flat().some((m) => /palier-recopie-b/.test(m ?? "")));
    if (porte && e.etat?.a === "-1") f.push(`${e.id} porte palier-recopie-b et POSE a = −1`);
    if (k < 5 && (e.controles ?? []).includes("a")) { const offerts = e.crans?.a ?? COEFS; if (offerts.includes("-1")) f.push(`${e.id} OFFRE le cran −1 du coefficient`); }
  });
  const s6 = E[5];
  if (s6?.etat?.a !== "-0.5") f.push(`S6 pose a = ${s6?.etat?.a} (attendu −0,5)`);
  if (s6?.etat_revele?.a !== "-1") f.push(`la révélation de S6 pose a = ${s6?.etat_revele?.a} (attendu −1)`);
  const sansMc = (s6?.pari?.choix ?? []).filter((c) => !c.juste && !c.misconception).map((c) => c.id);
  if (JSON.stringify(sansMc) !== JSON.stringify(["b-zero-seulement"])) f.push(`S6 : distracteurs sans étiquette [${sansMc.join(", ")}] (attendu [b-zero-seulement], §13.20)`);
  juger("stem-non-contamine", f.length === 0, `descripteur : ${f.length ? f.join(" ; ") : "aucune étape porteuse de palier-recopie-b ne pose a = −1 ; le cran −1 n'est offert qu'à S6, après la révélation ; b-zero-seulement seul sans étiquette"}`);
}

async function etatPose(k) {
  const e = E[k].etat;
  const lu = { a: await attr("data-a"), b: await attr("data-b"), point: await attr("data-point"), champ: await attr("data-champ"), famille: await attr("data-famille"), ph: await attr("data-pari") };
  const ok = Object.entries(e).every(([c, v]) => lu[c] === v) && lu.ph === "attente";
  juger("etapes", ok, `étape ${k + 1} (${ID[k]}) : ${Object.entries(lu).map(([c, v]) => `${c} ${v}`).join(", ")}`);
}

/** Avant le pari : ce que la spec permet, et rien de plus (§7.7, §11.2 avant-pari) */
async function avantPari(k) {
  const { accentN } = await classer();
  const fautes = [];
  if (accentN) fautes.push(`${accentN} px d'accent`);
  const ctl = await controles();
  if (ctl) fautes.push(`contrôles [${ctl}]`);
  const lec = await clesLectures();
  if (lec) fautes.push(`lectures [${lec}]`);
  const e = E[k].etat;
  const P = POINTS[e.point];
  // les segments : aucun à S1, S2, S3 ; tout le plan à S4, S5, S6 (l'énoncé)
  const exclus = await boitesTexte();
  const cs = centresDuChamp(E0, P, [P, ...(k === 1 ? [POINT_FIXE] : []), ...(k === 4 ? DEPARTS : [])]);
  const lus = await segmentsLus(cs.map((c) => ({ x: c.x, y: c.y })), 13, exclus, E0.o);
  const presents = lus.filter((s) => s.angle !== null && s.n >= 10).length;
  const enP = (await segmentsLus([px(P)], 13, exclus, E0.o))[0];
  if (k <= 2 && presents > 0) fautes.push(`${presents} segment(s) de champ DÉJÀ tracés`);
  if (k <= 2 && enP.n > 40) fautes.push(`un segment en P DÉJÀ tracé (${enP.n} px)`);
  if (k >= 3 && presents < 0.8 * cs.length) fautes.push(`le champ, énoncé de l'étape, est ABSENT (${presents}/${cs.length})`);
  // la ligne du palier : absente à S1–S3 (absence TOTALE à S3), présente à l'ENCRE à S4–S6
  const vu = (await attr("data-palier-vu")) === "oui";
  const desc = await descr();
  const nomPalier = await panneau.evaluate((el) => { const x = el.querySelector('[data-etiquette="nom-palier"]'); return x && getComputedStyle(x).visibility === "visible" ? x.textContent : ""; });
  if (k <= 2 && (vu || /tirets|ligne plate|palier/iu.test(desc) || nomPalier)) fautes.push("la ligne du palier EXISTE (trait, étiquette ou description)");
  if (k >= 3) {
    const kk = palierF(e.a, e.b), yk = px([0, kk]).y;
    const cov = await couvertureRangee(yk, px([XA, 0]).x + 2, px([-1, 0]).x, 2, 1.2);
    if (!vu || cov < 0.3) fautes.push(`la ligne du palier, énoncé de l'étape, est ABSENTE (${(cov * 100).toFixed(0)} % d'encre sur y = ${kk})`);
  }
  // le point fixe (0 ; 3) : énoncé de S2, à l'encre ; nulle part ailleurs
  const fixe = await panneau.evaluate((el) => { const x = el.querySelector('[data-etiquette="nom-fixe"]'); return x && getComputedStyle(x).visibility === "visible" ? window.__tex(x).replace(/\s+/g, "") : ""; });
  if (k === 1 && !/\(0\\,;3\)/.test(fixe)) fautes.push(`le point fixe (0 ; 3), énoncé de S2, n'est pas nommé (« ${fixe} »)`);
  if (k !== 1 && fixe) fautes.push(`un point fixe nommé hors de S2 (« ${fixe} »)`);
  // la description lue ne dit rien de l'issue
  const dits = [["−3", "descend", "pente"], ["même", "parallèle", "treize"], ["tirets", "horizonta", "palier"], ["courbe", "rapproche"], ["courbe", "croiser"], ["−1", "moins un", "unique"]][k].filter((m) => desc.includes(m));
  if (dits.length) fautes.push(`la description DIT : ${dits.join(", ")}`);
  juger("avant-pari", fautes.length === 0, `étape ${k + 1} (${ID[k]}), avant le pari : ${fautes.length ? fautes.join(" ; ") : `aucun accent, aucun contrôle, aucune lecture${k >= 3 ? ", le champ et la ligne du palier à l'encre (l'énoncé)" : k === 1 ? ", le point fixe (0 ; 3) à l'encre" : ", aucun segment"}`}`);
}
async function ouvertApres(k) {
  const f = [];
  const att = CTRL_ATTENDUS[k];
  const ctl = await controles();
  if (ctl !== Object.keys(att).sort().join(",")) f.push(`contrôles [${ctl}] (attendu [${Object.keys(att).sort().join(",")}])`);
  for (const [c, n] of Object.entries(att)) {
    const vs = await crans(c);
    const ok = Array.isArray(n) ? JSON.stringify(vs) === JSON.stringify(n) : vs.length === n;
    if (!ok) f.push(`${c} offre [${vs.join(" ; ")}] (attendu ${Array.isArray(n) ? `[${n.join(" ; ")}]` : `${n} crans`})`);
  }
  const lec = await clesLectures();
  if (lec !== LECT_ATTENDUES[k]) f.push(`lectures [${lec}] (attendu [${LECT_ATTENDUES[k]}])`);
  juger("fuite-inter-etapes", f.length === 0, `étape ${k + 1} révélée : ${f.length ? f.join(" ; ") : `contrôles [${ctl}] avec leurs crans, lectures [${lec}]`}`);
}

let L22 = 22;
if (pret) {
  await etatPose(0);
  await classer();
  E0 = await echelleLue();
  if (E0.ok) {
    const iso = Math.abs(E0.sX - E0.sY) / E0.sX;
    const fenetre = E0.fx[0] === XA && E0.fx[1] === XB && E0.fy[0] === YA && E0.fy[1] === YB;
    juger("isotropie", iso <= 0.005 && Math.abs(E0.larg - E0.haut) <= 1 && fenetre, `1 280 px : ${E0.sX.toFixed(3)} px/unité en x, ${E0.sY.toFixed(3)} en y (écart ${(iso * 100).toFixed(2)} %), plateau ${E0.larg.toFixed(0)} × ${E0.haut.toFixed(0)}, fenêtre lue x ∈ [${E0.fx.join(" ; ")}], y ∈ [${E0.fy.join(" ; ")}] (attendu [−8 ; 4] × [−6 ; 6])`);
    L22 = E0.larg < 540 ? 16 : 22;
    // les deux planchers de séparation, RECALCULÉS depuis l'échelle lue (§11.2) — un seuil au-dessus sort MUET
    const planS4 = Math.exp(-2) * E0.sY, planS5 = 3 * Math.exp(-2) * E0.sY;
    imprimes.push(`planchers à l'état posé : S4 ${planS4.toFixed(2)} px (seuil 3), S5 ${planS5.toFixed(2)} px (seuil 6)`);
    if (planS4 < 3 || planS5 < 6) { console.error(`\nMUET — un seuil de séparation dépasse son propre plancher (S4 ${planS4.toFixed(2)} < 3 ou S5 ${planS5.toFixed(2)} < 6) : la porte ne peut pas être verte sur un produit juste.`); process.exit(3); }
  } else juger("isotropie", false, `échelle illisible (${E0.cx} traits en x, ${E0.cy} en y)`);
  // le quadrillage OPAQUE : un nœud vaut une ligne (règle du banc de modulation)
  if (E0.ok) {
    const lum = await panneau.evaluate((el, pts) => { const { d, w, dpr } = window.__cls; return pts.map((p) => { const i = (Math.floor(p.y * dpr) * w + Math.floor(p.x * dpr)) * 4; return 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]; }); }, [px([-6, 4]), px([-6, 4.5]), px([-5.5, 4])]);
    juger("quadrillage-opaque", Math.abs(lum[0] - lum[1]) <= 2 && Math.abs(lum[0] - lum[2]) <= 2, `nœud (−6 ; 4) ${lum[0].toFixed(0)}, ses lignes ${lum[1].toFixed(0)} et ${lum[2].toFixed(0)} (écart ≤ 2)`);
  }
  if (E0.ok) {
    // ── S1 ──
    await avantPari(0);
    await formule("étape 1, avant le pari", 0);
    await katex("étape 1, avant le pari");
    await etiquettesLisibles("étape 1, avant le pari", panneau, E0, { P: POINTS.origine, L: L22 });
    juger("etapes", (await legendeTex()) === "y'=-y", `étape 1 : le badge écrit « ${await legendeTex()} » (attendu « y'=-y »)`);
    const avant = await annonce();
    await parier(juste(0));
    juger("paris", (await attr("data-pari")) === "revele", `étape 1 : le bon choix révèle (pari « ${await attr("data-pari")} »)`);
    await ouvertApres(0);
    for (const p of Object.keys(POINTS)) {
      await cocher("point", p);
      if (p === "haut") juger("annonce", (await annonce()) !== avant && /\(0 ; 5\)/.test(await annonce()), `étape 1 : déplacer P est DIT (« ${(await annonce()).slice(0, 80)} »)`);
      await nombres(`étape 1, P en ${POINTS[p].join(" ; ")}`, "-1", "0", p, "pente");
      await classer();
      const exclus = await boitesTexte();
      const s = (await segmentsLus([px(POINTS[p])], L22 / 2 + 2, exclus, E0.o))[0];
      const att = (Math.atan(penteF("-1", "0", POINTS[p][1])) * 180) / Math.PI;
      const autres = (await segmentsLus(centresDuChamp(E0, null, [POINTS[p]]).map((c) => ({ x: c.x, y: c.y })), 13, exclus, E0.o)).filter((x) => x.angle !== null && x.n >= 10).length;
      juger("segment-a-la-bonne-pente", s.angle !== null && ecartAngle(s.angle, att) <= 1.5 && autres === 0, `étape 1, P en ${POINTS[p].join(" ; ")} : le segment en P ${s.angle === null ? "ABSENT" : `à ${s.angle.toFixed(1)}° (attendu ${att.toFixed(1)}°)`}, ${autres} autre(s) segment(s)`);
      await formule(`étape 1, P en ${POINTS[p].join(" ; ")}`, 0);
    }
    await cocher("point", "origine");
    await etiquettesLisibles("étape 1 révélée", panneau, E0, { P: POINTS.origine, L: L22 });
    await katex("étape 1 révélée");
    await lecturesEntieres("étape 1 révélée");
    await frontiere("étape 1 révélée");
    await suivant();

    // ── S2 ──
    await etatPose(1);
    await avantPari(1);
    await formule("étape 2, avant le pari", 1);
    await etiquettesLisibles("étape 2, avant le pari", panneau, E0, { P: POINTS.decale, L: L22 });
    await parier(juste(1));
    await ouvertApres(1);
    // la révélation étend le champ à l'horizontale de P : treize segments parallèles, et rien ailleurs
    {
      await classer();
      const exclus = await boitesTexte();
      const ligne = centresDuChamp(E0, null, [POINTS.decale, POINT_FIXE], 3);
      const lus = await segmentsLus(ligne.map((c) => ({ x: c.x, y: c.y })), L22 / 2 + 2, exclus, E0.o);
      const ok = lus.filter((s) => s.angle !== null && ecartAngle(s.angle, -45) <= 1.5 && s.n >= 0.6 * L22).length;
      const ailleurs = (await segmentsLus(centresDuChamp(E0, null, [], null).filter((c) => c.j !== 3).map((c) => ({ x: c.x, y: c.y })), 13, exclus, E0.o)).filter((s) => s.angle !== null && s.n >= 10).length;
      juger("segment-a-la-bonne-pente", ok >= ligne.length - 2 && ailleurs === 0, `étape 2 révélée : ${ok}/${ligne.length} segments de l'horizontale y = 3 à −45° (pente −3 : ${(-Math.atan(3) * 180 / Math.PI).toFixed(1)}°… attendu arctan(−3))`.replace("à −45°", `à arctan(−3)`) + `, ${ailleurs} segment(s) ailleurs`);
    }
    const vals = [];
    for (const p of Object.keys(POINTS)) {
      await cocher("point", p);
      const lu = await nombres(`étape 2, P en ${POINTS[p].join(" ; ")}`, "-1", "0", p, "pentes-comparees");
      const f = sansBlanc(await part('[data-pente="fixe"]')).split(":").pop(), pp = sansBlanc(await part('[data-pente="P"]')).split(":").pop();
      vals.push({ p, egales: f === pp, memeY: POINTS[p][1] === 3 });
      void lu;
      await formule(`étape 2, P en ${POINTS[p].join(" ; ")}`, 1);
    }
    // N3 : égales EXACTEMENT quand P est à la hauteur du point fixe — les deux sens
    juger("nombres", vals.every((v) => v.egales === v.memeY) && vals.some((v) => v.egales) && vals.some((v) => !v.egales), `étape 2, N3 : les deux pentes lues sont égales en [${vals.filter((v) => v.egales).map((v) => v.p).join(", ")}] et différentes en [${vals.filter((v) => !v.egales).map((v) => v.p).join(", ")}] (attendu : égales à la hauteur 3 seulement)`);
    await cocher("point", "decale");
    for (const c of ["plan", "ligne", "un-point", "aucun"]) { await cocher("champ", c); if (c === "plan") juger("annonce", /tout le plan/.test(await annonce()), `étape 2 : changer les segments est DIT (« ${await annonce()} »)`); }
    await cocher("champ", "ligne");
    await etiquettesLisibles("étape 2 révélée", panneau, E0, { P: POINTS.decale, L: L22 });
    await katex("étape 2 révélée");
    await lecturesEntieres("étape 2 révélée");
    await frontiere("étape 2 révélée");
    await suivant();

    // ── S3 ──
    await etatPose(2);
    await avantPari(2);
    await formule("étape 3, avant le pari", 2);
    await etiquettesLisibles("étape 3, avant le pari", panneau, E0, { P: POINTS.haut, L: L22 });
    await parier(juste(2));
    await ouvertApres(2);
    {
      // après la révélation : le champ ENTIER à l'encre, la ligne ET la rangée plate à l'accent, rien d'autre
      const { accentN } = await classer();
      const yk = px([0, 4]).y;
      const lig = await couvertureRangee(yk, px([XA, 0]).x + 3, px([XB, 0]).x - 3, 1, 1.5);
      const hors = await panneau.evaluate((el, yk) => { const { cls, w, h, dpr } = window.__cls; let n = 0; for (let Y = 0; Y < h; Y++) { const y = (Y + 0.5) / dpr; if (Math.abs(y - yk) <= 12) continue; for (let X = 0; X < w; X++) if (cls[Y * w + X] === 1) n++; } return n; }, yk);
      juger("avant-pari", lig > 0.9 && hors === 0 && accentN > 0, `étape 3 révélée : l'accent couvre ${(lig * 100).toFixed(0)} % de la rangée y = 4 (ligne + segments plats), ${hors} px d'accent HORS de la rangée (attendu 0 : le champ révélé est à l'encre, pédagogie I9)`);
    }
    await champMesure("étape 3 révélée (a = −½, b = 2)", "-0.5", "2", { marques: [POINTS.haut], sauterRangee: 4, L: L22 });
    for (const b of TERMES) {
      await cocher("b", b);
      await classer();
      const k = palierF("-0.5", b), yk = px([0, k]).y;
      const lig = await couvertureRangee(yk, px([XA, 0]).x + 3, px([-1, 0]).x, 1, 1.5);
      juger("ligne-du-palier", lig > 0.9, `étape 3, b = ${b} : la ligne (accent) couvre ${(lig * 100).toFixed(0)} % de y = −b/a = ${k} recalculé (attendu ≥ 90 %)`);
      await nombres(`étape 3, b = ${b}`, "-0.5", b, "haut", "palier,pente");
      await formule(`étape 3, b = ${b}`, 2);
    }
    await cocher("b", "2");
    // N8 à S3 : P en (0 ; 2) avec (a ; b) = (−½ ; 1) — la pente lue vaut 0
    await cocher("b", "1");
    await cocher("point", "sur");
    {
      const lu = await lectures();
      juger("point-fixe", sansBlanc(lu.pente) === "0", `étape 3, (a ; b) = (−½ ; 1), P en (0 ; 2) : la pente lue vaut « ${sansBlanc(lu.pente)} » (attendu 0)`);
    }
    await cocher("point", "haut");
    await cocher("b", "2");
    await etiquettesLisibles("étape 3 révélée", panneau, E0, { P: POINTS.haut, L: L22, palier: 4 });
    await katex("étape 3 révélée");
    await lecturesEntieres("étape 3 révélée");
    await frontiere("étape 3 révélée");
    await suivant();

    // ── S4 ──
    await etatPose(3);
    await avantPari(3);
    await formule("étape 4, avant le pari", 3);
    await etiquettesLisibles("étape 4, avant le pari", panneau, E0, { P: POINTS.haut, L: L22, palier: 4 });
    await parier(juste(3));
    await ouvertApres(3);
    {
      // courbe-jamais-sur-le-palier, À L'ÉTAT POSÉ DE S4 ET À LUI SEUL (§11.2, BLOCKING-1)
      await classer();
      const f = courbeF("-0.5", "2", 0, 5), yk = px([0, 4]).y;
      const xs = [];
      for (let x = -2 * Math.log(2) + 0.05; x <= XB - 0.02; x += 0.05) xs.push(x);
      const cols = await courbesLues(xs);
      let min = Infinity, dev = 0, manques = 0, prec = Infinity, remonte = 0;
      for (const { x, ys } of cols) {
        const att = px([x, f(x)]).y;
        const c = ys.filter((y) => Math.abs(y - yk) > 1.2).sort((a, b) => Math.abs(a - att) - Math.abs(b - att))[0];
        if (c === undefined || Math.abs(c - att) > 2) { manques++; continue; }
        dev = Math.max(dev, Math.abs(c - att));
        const sep = yk - c;
        min = Math.min(min, sep);
        if (sep > prec + 0.8) remonte++;
        prec = sep;
      }
      juger("courbe-jamais-sur-le-palier", min >= 3 && manques <= 3 && remonte === 0, `étape 4, état posé (a = −½, b = 2, P = (0 ; 5)) : ${cols.length - manques}/${cols.length} colonnes lues, séparation minimale ${min.toFixed(2)} px (seuil 3, plancher ${(Math.exp(-2) * E0.sY).toFixed(2)}), l'écart ne remonte jamais (${remonte})`);
      juger("nombres", manques <= 3 && dev <= 2, `étape 4, N7 : la courbe lue à ≤ ${dev.toFixed(2)} px de 4 + e^{−x/2} recalculé, sur ${cols.length - manques} colonnes`);
    }
    for (const a of ["-0.5", "0.5"]) for (const b of TERMES) {
      await cocher("a", a);
      await cocher("b", b);
      await nombres(`étape 4, a = ${a}, b = ${b}`, a, b, "haut", "ecart-au-palier,palier,pente");
      await formule(`étape 4, a = ${a}, b = ${b}`, 3);
    }
    {
      // courbe-clippee-pas-plafonnee, DANS LES DEUX SENS : à a = ½, la courbe SORT (par le haut) et ne longe pas le bord
      await cocher("a", "0.5");
      await cocher("b", "2");
      await classer();
      const haut = px([0, YB]).y;
      const bord = await panneau.evaluate((el, { y0, x0, x1 }) => { const { cls, w, dpr } = window.__cls; let run = 0, max = 0; for (let X = Math.floor(x0 * dpr); X < x1 * dpr; X++) { let v = false; for (let Y = Math.floor((y0 - 1) * dpr); Y <= (y0 + 2) * dpr; Y++) if (cls[Y * w + X] === 1) v = true; run = v ? run + 1 : 0; max = Math.max(max, run); } return max / dpr; }, { y0: haut, x0: px([XA, 0]).x, x1: px([XB, 0]).x });
      const tardif = await accentColonne(px([3, 0]).x);
      const sortie = await accentColonne(px([0.1, 0]).x);
      juger("courbe-clippee-pas-plafonnee", bord <= 3 && tardif.length === 0 && sortie.length > 0, `étape 4, a = ½, b = 2 : la plus longue plage d'accent au ras du bord haut mesure ${bord.toFixed(1)} px (≤ 3 : pas plafonnée) ; en x = 3, ${tardif.length} trace(s) (attendu 0 : sortie) ; en x = 0,1, ${sortie.length} (attendu ≥ 1 : elle part de P)`);
      await cocher("a", "-0.5");
    }
    await etiquettesLisibles("étape 4 révélée", panneau, E0, { P: POINTS.haut, L: L22, palier: 4 });
    await katex("étape 4 révélée");
    await lecturesEntieres("étape 4 révélée");
    await frontiere("étape 4 révélée");
    await suivant();

    // ── S5 ──
    await etatPose(4);
    await avantPari(4);
    await formule("étape 5, avant le pari", 4);
    await etiquettesLisibles("étape 5, avant le pari", panneau, E0, { P: POINTS.bas, L: L22, palier: 4 });
    await parier(juste(4));
    await ouvertApres(4);
    {
      // courbes-jamais-confondues, À L'ÉTAT POSÉ DE S5 ET À LUI SEUL : trois courbes, ordre constant, ≥ 6 px
      await classer();
      const fs = DEPARTS.map(([x0, y0]) => courbeF("-0.5", "2", x0, y0));
      const yk = px([0, 4]).y;
      const xs = [];
      for (let x = -0.6; x <= XB - 0.02; x += 0.05) if (Math.abs(x) > 0.25) xs.push(x);
      const cols = await courbesLues(xs);
      let min = Infinity, lues = 0, desordre = 0, franchit = 0, dev = 0;
      for (const { x, ys } of cols) {
        const att = fs.map((f) => px([x, f(x)]).y);
        const trouves = att.map((a) => ys.filter((y) => Math.abs(y - yk) > 1.2).sort((u, v) => Math.abs(u - a) - Math.abs(v - a))[0]);
        if (trouves.some((t, i) => t === undefined || Math.abs(t - att[i]) > 2)) continue;
        lues++;
        dev = Math.max(dev, ...trouves.map((t, i) => Math.abs(t - att[i])));
        if (!(trouves[0] < trouves[1] && trouves[1] < trouves[2])) desordre++;
        min = Math.min(min, trouves[1] - trouves[0], trouves[2] - trouves[1]);
        if (trouves[0] > yk || trouves[1] < yk || trouves[2] < yk) franchit++;
      }
      juger("courbes-jamais-confondues", lues >= 0.8 * cols.length && min >= 6 && desordre === 0 && franchit === 0, `étape 5, état posé (trois départs) : ${lues}/${cols.length} colonnes aux trois courbes lues, séparation minimale ${min.toFixed(2)} px (seuil 6, plancher ${(3 * Math.exp(-2) * E0.sY).toFixed(2)}), ordre ${desordre ? "ROMPU" : "constant"}, ${franchit} franchissement(s) de la ligne`);
      juger("nombres", lues >= 0.8 * cols.length && dev <= 2, `étape 5, N7 : les trois courbes lues à ≤ ${dev.toFixed(2)} px de 4 + (y₀ − 4)·e^{−x/2} recalculé`);
    }
    {
      // l'ORDRE et le non-franchissement se BALAIENT sur tous les réglages atteignables (faits d'ordre, pas de distance)
      const f = [];
      for (const a of ["-0.5", "0.5"]) for (const b of TERMES) {
        await cocher("a", a);
        await cocher("b", b);
        await classer();
        const fs = DEPARTS.map(([x0, y0]) => courbeF(a, b, x0, y0));
        const k = palierF(a, b);
        for (const x of [-0.5, 0.5, 1.5]) {
          const vis = fs.map((g) => g(x)).filter((v) => v > YA + 0.3 && v < YB - 0.3);
          const ys = (await accentColonne(px([x, 0]).x)).map((y) => (E0.o.y - y) / E0.sY);
          for (const v of vis) if (!ys.some((y) => Math.abs(y - v) < 0.12)) f.push(`a = ${a}, b = ${b}, x = ${x} : la courbe attendue en y = ${v.toFixed(2)} MANQUE`);
          for (const [x0, y0] of DEPARTS) { const g = courbeF(a, b, x0, y0)(x); if (y0 !== k && Math.sign(g - k) !== Math.sign(y0 - k)) f.push(`a = ${a}, b = ${b} : la porte elle-même croit à un franchissement`); }
        }
      }
      juger("courbes-jamais-confondues", f.length === 0, `étape 5, balayage des 8 équations atteignables : ${f.length ? f.slice(0, 3).join(" ; ") : "chaque courbe là où la porte la calcule, aucune ne change de côté de la ligne"}`);
      await cocher("a", "-0.5");
      await cocher("b", "2");
    }
    {
      // N8 : à (a ; b) = (−½ ; 1) et P en (0 ; 2), la courbe EST la ligne plate : l'accent PLEIN sur y = 2
      await cocher("b", "1");
      await cocher("famille", "une");
      await cocher("point", "sur");
      await classer();
      const y2 = px([0, 2]).y;
      const plein = await couvertureRangee(y2, px([XA, 0]).x + 3, px([XB, 0]).x - 3, 1, 1);
      juger("point-fixe", plein >= 0.95, `étape 5, (a ; b) = (−½ ; 1), P en (0 ; 2) : l'accent couvre ${(plein * 100).toFixed(0)} % de y = 2 (attendu ≥ 95 % : une solution CONSTANTE, pas la seule ligne en tirets)`);
      await cocher("point", "bas");
      await cocher("famille", "trois");
      await cocher("b", "2");
    }
    for (const p of Object.keys(POINTS)) { await cocher("point", p); await nombres(`étape 5, P en ${POINTS[p].join(" ; ")}`, "-0.5", "2", p, "ecart-au-palier,palier,pente"); await formule(`étape 5, P en ${POINTS[p].join(" ; ")}`, 4); }
    await cocher("point", "bas");
    await etiquettesLisibles("étape 5 révélée", panneau, E0, { P: POINTS.bas, L: L22, palier: 4 });
    await katex("étape 5 révélée");
    await lecturesEntieres("étape 5 révélée");
    await frontiere("étape 5 révélée");
    await suivant();

    // ── S6 ──
    await etatPose(5);
    await avantPari(5);
    juger("avant-pari", (await attr("data-a")) === "-0.5" && (await panneau.locator('[data-controle="a"]').count()) === 0, `étape 6, avant le pari : a vaut ${await attr("data-a")} (attendu −0,5) ET le contrôle a est ${(await panneau.locator('[data-controle="a"]').count()) ? "PRÉSENT" : "absent"} du DOM — deux faits, deux sondes (B2)`);
    await formule("étape 6, avant le pari", 5);
    await etiquettesLisibles("étape 6, avant le pari", panneau, E0, { P: POINTS.sur, L: L22, palier: 2 });
    await parier(juste(5));
    juger("avant-pari", (await attr("data-a")) === "-1" && (await panneau.locator('[data-controle="a"]').count()) === 1, `étape 6 révélée : a vaut ${await attr("data-a")} (attendu −1) et le contrôle a est ${(await panneau.locator('[data-controle="a"]').count()) ? "présent" : "ABSENT"} (la suite le demande)`);
    await ouvertApres(5);
    // N10 : à a = −1, palier = b aux quatre crans ; aux deux autres a, seulement à b = 0 — lu sur la LECTURE
    {
      const f = [];
      for (const a of COEFS) for (const b of TERMES) {
        await cocher("a", a);
        await cocher("b", b);
        const lu = sansBlanc((await lectures()).palier);
        const egal = evalQ(lu) === B_F[b];
        if (egal !== (a === "-1" || b === "0")) f.push(`a = ${a}, b = ${b} : palier lu « ${lu} »`);
        await nombres(`étape 6, a = ${a}, b = ${b}`, a, b, "sur", "palier");
        // ligne-du-palier, aux 12 équations : la ligne (accent) à −b/a, et les segments qui la portent PLATS
        await classer();
        const k = palierF(a, b), yk = px([0, k]).y;
        const lig = await couvertureRangee(yk, px([XA, 0]).x + 3, px([-1, 0]).x, 1, 1.5);
        const exclus = await boitesTexte();
        const rangee = await segmentsLus(centresDuChamp(E0, null, [POINTS.sur], k).filter((c) => c.i < -1).map((c) => ({ x: c.x, y: c.y })), L22 / 2 + 2, exclus, E0.o);
        const plats = rangee.filter((s) => s.angle !== null && s.n >= 6 && ecartAngle(s.angle, 0) <= 1).length, lus_ = rangee.filter((s) => s.angle !== null && s.n >= 6).length;
        juger("ligne-du-palier", lig > 0.6 && (k === 0 || (lus_ >= 3 && plats === lus_)), `étape 6, a = ${a}, b = ${b} : la ligne couvre ${(lig * 100).toFixed(0)} % de y = ${k} ; ${k === 0 ? "sur l'axe" : `${plats}/${lus_} segments de la rangée plats`}`);
      }
      juger("nombres", f.length === 0, `étape 6, N10 : ${f.length ? f.join(" ; ") : "palier = b aux quatre crans à a = −1, et seulement à b = 0 aux deux autres"}`);
    }
    {
      // les 12 équations au pixel : chaque segment à arctan(a·y + b) (le sabotage le plus important de la campagne : une pente qui dépendrait de x)
      const tous = [];
      for (const a of COEFS) for (const b of TERMES) {
        await cocher("a", a);
        await cocher("b", b);
        await classer();
        const { cs, lus } = await champMesure(`étape 6, a = ${a}, b = ${b}`, a, b, { marques: [POINTS.sur], sauterRangee: palierF(a, b), L: L22 });
        if (a === "-1" && b === "2") tous.push({ cs, lus });
      }
      champLisible("1 280 px, a = −1, b = 2 (pente maximale 8)", tous[0].cs, tous[0].lus);
    }
    {
      // palette : aucune teinte hors des jetons, courbes comprises
      await cocher("a", "-0.5");
      await cocher("b", "2");
      await cocher("famille", "trois");
      const { horsPalette } = await classer();
      juger("palette", horsPalette === 0, `étape 6, trois courbes : ${horsPalette} pixel(s) teinté(s) hors de l'accent (attendu 0)`);
    }
    {
      // sans-mouvement : rien n'anime — deux images à 400 ms d'écart sont identiques
      const h1 = await panneau.evaluate((el) => { const c = el.querySelector("canvas"); return c.toDataURL().length + ":" + c.toDataURL().slice(-64); });
      await page.waitForTimeout(400);
      const h2 = await panneau.evaluate((el) => { const c = el.querySelector("canvas"); return c.toDataURL().length + ":" + c.toDataURL().slice(-64); });
      juger("sans-mouvement", h1 === h2, `étape 6 : deux images à 400 ms d'écart ${h1 === h2 ? "identiques" : "DIFFÉRENTES — quelque chose anime"}`);
    }
    await etiquettesLisibles("étape 6 révélée, trois courbes", panneau, E0, { P: POINTS.sur, L: L22, palier: 4 });
    await katex("étape 6 révélée");
    await lecturesEntieres("étape 6 révélée");
    await frontiere("étape 6 révélée");
  }
}

// ── Au téléphone (390 px) : le carré, l'isotropie, la fenêtre, les planchers, le champ, les étiquettes ──
if (pret && E0?.ok) {
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
    const fen = e2.ok && e2.fx[0] === XA && e2.fx[1] === XB && e2.fy[0] === YA && e2.fy[1] === YB;
    juger("isotropie", e2.ok && Math.abs(e2.sX - e2.sY) / e2.sX <= 0.005 && Math.abs(e2.larg - e2.haut) <= 1 && fen, `390 px : ${e2.ok ? `${e2.sX.toFixed(3)} / ${e2.sY.toFixed(3)} px par unité, plateau ${e2.larg.toFixed(0)} × ${e2.haut.toFixed(0)}, fenêtre x ∈ [${e2.fx.join(" ; ")}], y ∈ [${e2.fy.join(" ; ")}]` : "échelle illisible"}`);
    if (e2.ok) {
      const pl4 = Math.exp(-2) * e2.sY, pl5 = 3 * Math.exp(-2) * e2.sY;
      imprimes.push(`390 px : planchers S4 ${pl4.toFixed(2)} px, S5 ${pl5.toFixed(2)} px`);
      if (pl4 < 3 || pl5 < 6) { console.error(`\nMUET — à 390 px, un seuil de séparation dépasse son plancher (S4 ${pl4.toFixed(2)}, S5 ${pl5.toFixed(2)}).`); process.exit(3); }
      const L16 = e2.larg < 540 ? 16 : 22;
      const ctxP = [POINTS.origine, POINTS.decale, POINTS.haut, POINTS.haut, POINTS.bas, POINTS.sur];
      const pal = [null, null, 4, 4, 4, 2];
      for (let k = 0; k < 6; k++) {
        await classer(q);
        await etiquettesLisibles(`390 px, étape ${k + 1}, avant le pari`, q, e2, { P: ctxP[k], L: L16, palier: k >= 3 ? pal[k] : undefined });
        await parier(juste(k), q, p2);
        await p2.waitForTimeout(120);
        await classer(q);
        await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q, e2, { P: ctxP[k], L: L16, palier: k >= 2 ? (k === 5 ? 1 : pal[k]) : undefined });
        await lecturesEntieres(`390 px, étape ${k + 1} révélée`, q);
        if (k === 3) {
          // le plancher de S4 à 390 px, à l'état posé
          const f = courbeF("-0.5", "2", 0, 5), yk = px([0, 4], e2).y;
          let min = Infinity, n = 0;
          for (let x = 0.2; x <= XB - 0.02; x += 0.1) { const att = px([x, f(x)], e2).y; const c = (await accentColonne(px([x, 0], e2).x, q)).filter((y) => Math.abs(y - yk) > 1.2).sort((a, b) => Math.abs(a - att) - Math.abs(b - att))[0]; if (c === undefined || Math.abs(c - att) > 2) continue; n++; min = Math.min(min, yk - c); }
          juger("courbe-jamais-sur-le-palier", n >= 30 && min >= 3, `390 px, état posé de S4 : ${n} colonnes, séparation minimale ${min.toFixed(2)} px (seuil 3, plancher ${pl4.toFixed(2)})`);
        }
        if (k === 5) {
          // le champ au téléphone : pas de 1, écart ≥ 6 px, à la pente maximale
          await cocher("b", "2", q, p2);
          await classer(q);
          const exclus = await boitesTexte(q);
          const cs = centresDuChamp(e2, null, [POINTS.sur]).filter((c) => c.j !== palierF("-1", "2"));
          const lus = await segmentsLus(cs.map((c) => ({ x: c.x, y: c.y })), L16 / 2 + 2, exclus, e2.o, q);
          champLisible("390 px, a = −1, b = 2 (pente maximale 8)", cs, lus, e2);
        }
        if (k < 5) await suivant(q, p2);
      }
      await p2.evaluate(() => document.documentElement.style.setProperty("--font-scale", "1.125"));
      await p2.waitForTimeout(120);
      await lecturesEntieres("390 px, texte A+ (×1,125), étape 6", q);
      await p2.evaluate(() => document.documentElement.style.removeProperty("--font-scale"));
    }
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
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-champ-pentes : ce que l'équation dit en chaque point (${URL_SCENE})`);
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
