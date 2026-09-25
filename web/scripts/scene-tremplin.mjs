#!/usr/bin/env node
/**
 * scene-tremplin — la porte du « tremplin circulaire »
 * (pc/lois-de-newton, R3 ; spec content/pc/lois-de-newton/spec-scene-tremplin.md §11 ;
 * ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et
 * trouve son panneau par `[data-scene="tremplin-circulaire"]`. La scène est
 * ANALYTIQUE : la porte refait chaque NOMBRE par sa propre arithmétique (les
 * constantes de la spec, écrites ICI), et lit les faits de PIXELS dans les deux
 * sens. Les repères du produit ne disent que OÙ regarder, jamais COMBIEN :
 * l'échelle des longueurs est LUE sur le témoin « 5 m », celle des
 * accélérations sur le témoin « 10 m·s⁻² », les flèches sur l'encre d'accent,
 * l'arc et ses angles sur le trait de la piste.
 *
 * LES FAMILLES (spec §11) : avant-clic · pas-de-3d · etapes · avant-pari ·
 * paris · course · nombres (N1…N10) · fleches-a-l-echelle ·
 * normale-vers-le-centre · droite-sans-normale · composition · tangente-vraie ·
 * arc-de-cercle · echelle-constante · unitaires-constants · signe-du-produit ·
 * palette · formule-graduee · fuite-inter-etapes · frontiere (une sonde par
 * FORME) · latex · etiquettes et cadre (1 280 et 390 px) · immobile · annonce ·
 * theme · console · ergonomie.
 *
 *   node scripts/scene-tremplin.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-tremplin.mjs --essai-rouge  (chaque famille doit crier ;
 *                                                   chaque forme injectée, vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_TREMPLIN ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/lois-de-newton";
const SCENE = "tremplin-circulaire";
const OUVRIR = "Ouvrir le tremplin";

// ── La seconde voie : les constantes de la SPEC (§5), rien du produit ──────
const VITESSES = [9, 12, 18];
const RAYONS = [10, 15, 20, 30];
const REGIMES = { gaz: 4.5, tenue: 0, freinage: -4.5 };
const RAD = Math.PI / 180;
const ROT = 28 * RAD;
const RALENTI = 6;
const abscisse = (rep, R) => (rep === "approche" ? -6 : rep === "entree" ? 0 : rep === "milieu" ? (R * ROT) / 2 : R * ROT);
const vit = (vB, aT, l) => Math.sqrt(Math.max(0, vB * vB + 2 * aT * l));
const aN = (v, R, l) => (l < 0 ? 0 : (v * v) / R);
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
function trois(x) {
  if (x === 0) return "0,00";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return virgule(x, d);
}
const signe = (x) => (x > 0 ? "+" : "") + trois(x);
const ecrireAV = (x) => (x === 0 ? "0" : signe(x));
/** la durée RÉELLE de la course de −9,0 m jusqu'à B */
const duree = (vB, aT) => (aT === 0 ? 9 / vB : (vB - vit(vB, aT, -9)) / aT);

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("scene-tremplin : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/lois-de-newton/media/tremplin-circulaire.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-tremplin : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
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
  const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
  juger("pas-de-3d", trois3 === null && deuxD, `panneau OUVERT : window.__THREE__ ${trois3 ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
}

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
const lecture = async (cle) => { const l = panneau.locator(`[data-lecture="${cle}"]`); return (await l.count()) ? espaces(await l.first().innerText().catch(() => "")) : ""; };
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(150));
const cocher = async (sel, v) => { await panneau.locator(`${sel} input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(30); };
/** Un repère (étiquette sans texte), en px CSS relatifs au canvas ; null s'il n'est pas visible. */
const repere = (nom) => panneau.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/**
 * Le canvas, classé pixel par pixel : 1 = accent FORT (la chrominance de
 * l'accent, à 80 % au moins de sa force : le corps d'une flèche), 3 = accent
 * faible (le rayon en tirets, le parallélogramme, les bords lissés), 2 = encre
 * (neutre et foncée), 0 = fond. Une flèche se mesure sur l'accent FORT : le
 * rayon vers le centre part de G dans la même direction que la composante
 * normale, et ses tirets, lus comme de l'accent, allongeaient la flèche.
 */
const classer = () => panneau.evaluate((el, accent) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const g = cv.getContext("2d");
  const d = g.getImageData(0, 0, cv.width, cv.height).data;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
  const f = t.getImageData(0, 0, 1, 1).data;
  const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const cf = chroma(f[0], f[1], f[2]);
  // la chrominance MESURÉE depuis le fond (un fond teinté ne compte pas comme accent)
  const ca = chroma(...accent).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
  const cls = new Uint8Array(cv.width * cv.height);
  let accentN = 0, horsPalette = 0;
  for (let i = 0, k = 0; i < d.length; i += 4, k++) {
    const c = chroma(d[i], d[i + 1], d[i + 2]).map((x, j) => x - cf[j]), nc = Math.hypot(...c);
    const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const cos = nc > 0 ? (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) : 0;
    if (nc > 12 && cos > 0.85) { cls[k] = nc >= 0.8 * na ? 1 : 3; accentN++; }
    else if (nc < 25 && Math.abs(l - lf) > 60) cls[k] = 2;
    if (nc > 20 && cos < 0.6) horsPalette++;
  }
  // la luminance brute, pour les centres SOUS-PIXEL du trait de la piste
  const lum = new Float32Array(cv.width * cv.height);
  for (let i = 0, k = 0; i < d.length; i += 4, k++) lum[k] = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
  window.__cls = { cls, lum, lf, w: cv.width, h: cv.height, dpr };
  return { accentN, horsPalette, dpr };
}, accent);

/**
 * La longueur d'une flèche, LUE aux pixels : depuis (x, y), le long de la
 * direction (ux, uy), la dernière distance où l'on trouve un pixel du genre
 * demandé (1 accent fort, 2 encre) à ±1 px du rayon, les trous de moins de
 * 3 px tolérés. `depuis` saute le point de la moto. La direction vient d'un
 * repère (OÙ regarder) ; si la flèche dessinée n'y est pas, la marche s'arrête
 * court, et la longueur est fausse : la direction est prouvée par les pixels.
 */
const longueurLeLong = (x, y, ux, uy, genre, max = 400, depuis = 7) => panneau.evaluate((el, { x, y, ux, uy, genre, max, depuis }) => {
  const { cls, w, h, dpr } = window.__cls;
  const at = (px, py) => {
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const X = Math.round((px + dx * 0.7) * dpr - 0.5), Y = Math.round((py + dy * 0.7) * dpr - 0.5);
      if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === genre) return true;
    }
    return false;
  };
  // une flèche d'accent peut passer SOUS un vecteur unitaire plus court qu'elle
  // (la plus courte de deux flèches colinéaires est dessinée dessus) : sur l'axe,
  // l'encre n'est pas un trou — la marche la traverse sans compter
  const encreSurAxe = (px, py) => {
    const X = Math.round(px * dpr - 0.5), Y = Math.round(py * dpr - 0.5);
    return X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === 2;
  };
  let dernier = -1, trou = 0;
  for (let d = depuis; d <= max; d += 0.5) {
    if (at(x + ux * d, y + uy * d)) { dernier = d; trou = 0; }
    else if (genre === 1 && encreSurAxe(x + ux * d, y + uy * d)) continue;
    else if (dernier >= 0 && (trou += 0.5) > 3) break;
  }
  return dernier;
}, { x, y, ux, uy, genre, max, depuis });

/**
 * Un témoin, lu dans sa rangée : la plage d'encre CONTINUE qui contient x0
 * (les trous de plus de 3 px l'arrêtent — le témoin des mètres et celui des
 * accélérations sont sur la même rangée, 64 px l'un de l'autre). Rend son
 * premier et son dernier pixel.
 */
const plageEn = (x0, y) => panneau.evaluate((el, { x0, y }) => {
  const { cls, w, dpr } = window.__cls;
  const encre = (x) => [-1, 0, 1].some((dy) => { const X = Math.round(x * dpr - 0.5), Y = Math.round((y + dy * 0.7) * dpr - 0.5); return X >= 0 && X < w && cls[Y * w + X] === 2; });
  const aller = (sens) => { let dernier = x0, trou = 0; for (let x = x0; x >= 0 && x < w / dpr; x += 0.5 * sens) { if (encre(x)) { dernier = x; trou = 0; } else if ((trou += 0.5) > 3) break; } return dernier; };
  return encre(x0) || encre(x0 + 1) ? { debut: aller(-1), fin: aller(1) } : null;
}, { x0, y });

/**
 * Les deux échelles, LUES sur les témoins. Celui des mètres est un trait entre
 * deux taquets de 1,5 px : sa longueur est l'écart des taquets (la plage moins
 * une épaisseur). Celui des accélérations est une flèche qui part à bout carré :
 * sa longueur est sa plage.
 */
async function echelles() {
  await classer();
  const mg = await repere("temoin-m-g"), ag = await repere("temoin-a-g");
  if (!mg || !ag) return null;
  const m = await plageEn(mg.x, mg.y), a = await plageEn(ag.x + 1, ag.y);
  if (!m || !a) return null;
  return { pxM: (m.fin - m.debut - 1.5) / 5, pxA: (a.fin - a.debut + 0.5) / 10 };
}

/** La tolérance d'une longueur de flèche : 3 px (la pointe lissée perd ~1,5 px sur l'accent FORT) + 1 % (l'échelle, lue à ±0,5 px sur 70 px). */
const tol = (L) => 3 + 0.01 * L;

/**
 * Un vecteur UNITAIRE, sous la réponse : sa longueur DÉCLARÉE (le repère de sa
 * pointe), confirmée aux pixels par les deux AILES de sa pointe — de l'encre à
 * 7 px en arrière de la pointe, à 2,2 px de part et d'autre de l'axe, là où ni
 * la flèche d'accent posée dessus (±1,5 px au plus) ni la piste (±1,5 px) ne
 * vont. Un vecteur dessiné ailleurs que là où son repère le dit n'a pas
 * d'ailes au repère.
 */
async function unitaireLu(bout) {
  const g = await repere("G"), b = await repere(bout);
  if (!g || !b) return null;
  const L = Math.hypot(b.x - g.x, b.y - g.y);
  const ux = (b.x - g.x) / L, uy = (b.y - g.y) / L, nx = -uy, ny = ux;
  const ailes = await panneau.evaluate((el, pts) => {
    const { cls, w, h, dpr } = window.__cls;
    return pts.map(([px, py]) => {
      let couvert = false;
      for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
        const X = Math.round((px + dx * 0.5) * dpr - 0.5), Y = Math.round((py + dy * 0.5) * dpr - 0.5);
        if (X < 0 || Y < 0 || X >= w || Y >= h) continue;
        const c = cls[Y * w + X];
        if (c === 2) return "encre";
        if (c === 1 || c === 3) couvert = true;
      }
      return couvert ? "couvert" : "vide";
    });
  }, [1, -1].map((c) => [b.x - 7 * ux + c * 2.2 * nx, b.y - 7 * uy + c * 2.2 * ny]));
  // une aile sous une flèche d'accent n'est ni vue ni démentie ; une aile VIDE dément le repère
  return { L, vide: ailes.includes("vide"), vue: ailes.every((a) => a === "encre"), couverte: ailes.every((a) => a === "couvert") };
}

/** L'état d'une flèche au point G, lu aux pixels (direction donnée par le repère de sa pointe). */
async function flecheLue(bout = "a-bout", genre = 1) {
  const g = await repere("G"), b = await repere(bout);
  if (!g || !b) return null;
  const L = Math.hypot(b.x - g.x, b.y - g.y);
  const ux = (b.x - g.x) / L, uy = (b.y - g.y) / L;
  const lu = await longueurLeLong(g.x, g.y, ux, uy, genre, L + 40);
  return { g, ux, uy, L: lu, repereL: L, bout: { x: g.x + ux * lu, y: g.y + uy * lu } };
}

/**
 * La piste DESSINÉE, lue aux pixels. Les repères disent OÙ chercher (la
 * colonne), la colonne dit où EST le trait : la plage d'encre de 2 à 8 px la
 * plus proche, acceptée à 3 px du repère. La droite : moindres carrés sur
 * 17 colonnes entre le départ et 55 px avant B (l'arc des 10° et l'horizontale
 * en tirets partent de B). L'arc : un cercle de Kåsa sur les colonnes des
 * 21 repères de l'arc. Les colonnes à moins de 36 px de G sont écartées (le
 * liseré de u_T efface la piste sous lui ; a_T la recouvre ; le point de la moto).
 */
async function pisteLue() {
  const dep = await repere("depart"), B = await repere("B"), G = await repere("G");
  const arcs = [];
  for (let k = 0; k <= 20; k++) arcs.push(await repere(`arc-${k}`));
  if (!dep || !B || !G) return null;
  const lu = await panneau.evaluate((el, { dep, B, G, arcs }) => {
    const { cls, lum, lf, w, h, dpr } = window.__cls;
    // Le trait dans une colonne : la plage d'encre de 2 à 8 px la plus proche de
    // y0, et son centre SOUS-PIXEL — le barycentre de la noirceur (lf − l) sur la
    // plage et son liseré lissé. Au rang entier près, un arc de 28° de 10 m de
    // rayon (4,5 px de flèche) donnait son rayon à ±8 %. Rend [x, y] : x est le
    // CENTRE de la colonne lue, pas l'abscisse demandée.
    const bande = (x, y0) => {
      const X = Math.round(x * dpr - 0.5);
      if (X < 0 || X >= w) return null;
      const plages = [];
      let debut = -1;
      for (let Y = 0; Y <= h; Y++) {
        const dedans = Y < h && cls[Y * w + X] === 2;
        if (dedans && debut < 0) debut = Y;
        if (!dedans && debut >= 0) { plages.push({ debut, fin: Y, c: (debut + Y) / 2 / dpr, n: (Y - debut) / dpr }); debut = -1; }
      }
      // la piste fait 3 px, ≤ 5 px dans une colonne (pente ≤ 18°, liseré lissé) : une
      // plage plus épaisse est un trait qui la CROISE (le trait de B, les tirets de
      // l'horizontale) — à B, la plage de 7 px tirait le cercle de 10 %
      const bonnes = plages.filter((p) => p.n >= 2 && p.n <= 5);
      if (!bonnes.length) return null;
      const b = bonnes.reduce((a, q) => (Math.abs(q.c - y0) < Math.abs(a.c - y0) ? q : a));
      let sw = 0, sy = 0;
      for (let Y = Math.max(0, b.debut - 1); Y <= Math.min(h - 1, b.fin); Y++) {
        const noir = Math.max(0, lf - lum[Y * w + X]);
        sw += noir; sy += noir * (Y + 0.5);
      }
      return sw > 0 ? [(X + 0.5) / dpr, sy / sw / dpr] : null;
    };
    const droite = [];
    const x0 = dep.x - 8, x1 = B.x - 55;
    for (let i = 0; i <= 16; i++) {
      const x = x0 + ((x1 - x0) * i) / 16;
      const yAtt = dep.y + ((B.y - dep.y) * (x - dep.x)) / (B.x - dep.x);
      if (Math.hypot(x - G.x, yAtt - G.y) < 36) continue;
      const q = bande(x, yAtt);
      if (q && Math.abs(q[1] - yAtt) <= 3) droite.push(q);
    }
    const arc = [];
    arcs.forEach((p, k) => {
      if (!p || Math.hypot(p.x - G.x, p.y - G.y) < 36) return;
      const q = bande(p.x, p.y);
      if (q && Math.abs(q[1] - p.y) <= 3) arc.push([q[0], q[1], k]);
    });
    let D = null;
    if (droite.length >= 4) {
      const n = droite.length, mx = droite.reduce((s, p) => s + p[0], 0) / n, my = droite.reduce((s, p) => s + p[1], 0) / n;
      const sxy = droite.reduce((s, p) => s + (p[0] - mx) * (p[1] - my), 0), sxx = droite.reduce((s, p) => s + (p[0] - mx) ** 2, 0);
      const a = sxy / sxx, b = my - a * mx;
      D = { n, a, b, pente: (Math.atan(a) * 180) / Math.PI, residu: Math.max(...droite.map((p) => Math.abs(p[1] - (a * p[0] + b)))) };
    }
    let C = null;
    if (arc.length >= 5) {
      // Kåsa : x² + y² + Dx + Ey + F = 0, aux moindres carrés
      const S = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], V = [0, 0, 0];
      for (const [x, y] of arc) {
        const r = [x, y, 1], z = -(x * x + y * y);
        for (let i = 0; i < 3; i++) { V[i] += r[i] * z; for (let j = 0; j < 3; j++) S[i][j] += r[i] * r[j]; }
      }
      const det = (m) => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
      const d0 = det(S);
      const sol = [0, 1, 2].map((c) => det(S.map((row, i) => row.map((v, j) => (j === c ? V[i] : v)))) / d0);
      let cx = -sol[0] / 2, cy = -sol[1] / 2, r = Math.sqrt(cx * cx + cy * cy - sol[2]);
      // Kåsa est biaisé vers les PETITS rayons sur un arc court et bruité (−4 % sur
      // 28°, premier passage) : il ne sert que de départ à un ajustement
      // GÉOMÉTRIQUE (Gauss–Newton sur la distance au cercle)
      for (let it = 0; it < 25; it++) {
        const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], bv = [0, 0, 0];
        for (const [x, y] of arc) {
          const d = Math.hypot(x - cx, y - cy), res = d - r;
          const j = [-(x - cx) / d, -(y - cy) / d, -1];
          for (let i = 0; i < 3; i++) { bv[i] -= j[i] * res; for (let k = 0; k < 3; k++) A[i][k] += j[i] * j[k]; }
        }
        const dA = det(A);
        if (!Number.isFinite(dA) || Math.abs(dA) < 1e-12) break;
        const pas = [0, 1, 2].map((c) => det(A.map((row, i) => row.map((v, k) => (k === c ? bv[i] : v)))) / dA);
        cx += pas[0]; cy += pas[1]; r += pas[2];
        if (Math.hypot(...pas) < 1e-6) break;
      }
      const premier = arc[0], dernier = arc[arc.length - 1];
      const rot = Math.abs(Math.atan2(dernier[1] - cy, dernier[0] - cx) - Math.atan2(premier[1] - cy, premier[0] - cx)) * 180 / Math.PI;
      C = { n: arc.length, cx, cy, r, residu: Math.max(...arc.map(([x, y]) => Math.abs(Math.hypot(x - cx, y - cy) - r))), kMin: premier[2], kMax: dernier[2], rot, pts: arc };
    }
    return { droite: D, arc: C };
  }, { dep, B, G, arcs });
  return { ...lu, xB: B.x };
}

/**
 * La tangente à la piste dessinée, en G, dans le sens du mouvement (x
 * croissant). Sur la droite ET en B : la pente de la droite LUE (en B, la
 * droite est tangente au cercle — `arc-de-cercle` le vérifie). Dans l'arc : la
 * CORDE entre deux points lus symétriques autour de G (même écart de repères
 * d'arc de part et d'autre) — parallèle, pour un cercle, à la tangente au
 * milieu ; la perpendiculaire au rayon du cercle de Kåsa faisait 1,7° d'erreur
 * sur un arc de 28° (premier passage). G doit être SUR le trait (à 1,5 px).
 */
function tangenteEn(g, piste) {
  if (!g || !piste) return null;
  const { droite: D, arc: C } = piste;
  const centre = C ? { x: C.cx, y: C.cy } : null;
  const surDroite = D && Math.abs(g.y - (D.a * g.x + D.b)) / Math.hypot(1, D.a) <= 1.5 && g.x <= piste.xB + 1.5;
  if (surDroite) {
    const L = Math.hypot(1, D.a);
    return { ux: 1 / L, uy: D.a / L, centre, surArc: g.x >= piste.xB - 1.5, par: "la droite" };
  }
  if (C && Math.abs(Math.hypot(g.x - C.cx, g.y - C.cy) - C.r) <= 1.5) {
    // la paire symétrique autour du repère d'arc de G, la plus large
    const par = new Map(C.pts.map(([x, y, k]) => [k, { x, y }]));
    const kg = kDeG(g, C);
    for (let j = 20; j >= 1 && kg !== null; j--) {
      const a = par.get(kg - j), z = par.get(kg + j);
      if (a && z) {
        const L = Math.hypot(z.x - a.x, z.y - a.y);
        return { ux: (z.x - a.x) / L, uy: (z.y - a.y) / L, centre, surArc: true, par: `la corde des repères ${kg - j} et ${kg + j}` };
      }
    }
    const rx = (g.x - C.cx) / C.r, ry = (g.y - C.cy) / C.r;
    let ux = -ry, uy = rx;
    if (ux < 0) { ux = -ux; uy = -uy; }
    return { ux, uy, centre, surArc: true, par: "le rayon du cercle lu" };
  }
  return null;
}
/** L'indice (entier) du repère d'arc où se trouve G, par l'angle au centre du cercle lu ; null s'il tombe entre deux. */
function kDeG(g, C) {
  const ang = (p) => Math.atan2(p.y - C.cy, p.x - C.cx);
  const pts = C.pts.map(([x, y, k]) => ({ k, t: ang({ x, y }) }));
  if (pts.length < 2) return null;
  // l'angle par pas de repère, lu sur les points eux-mêmes
  const [p0, p1] = [pts[0], pts[pts.length - 1]];
  const pas = (p1.t - p0.t) / (p1.k - p0.k);
  const k = p0.k + (ang(g) - p0.t) / pas;
  return Math.abs(k - Math.round(k)) <= 0.15 ? Math.round(k) : null;
}

// ── Avant le pari, la frontière, le LaTeX, la formule graduée ──
async function avantPari(ou, interdits = []) {
  const { accentN } = await classer();
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const reponse = [];
  for (const r of ["a-bout", "aN-bout", "aT-bout", "uN-bout", "centre", "rayon-bout"]) if (await repere(r)) reponse.push(r);
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const dits = interdits.filter((m) => desc.includes(m));
  const lance = await panneau.locator("[data-lancer]").count();
  const ok = accentN === 0 && l === 0 && reponse.length === 0 && dits.length === 0 && (await controles()) === "" && lance === 0;
  juger("avant-pari", ok, `${ou}, avant le pari : ${accentN} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, ${reponse.length ? `RÉPONSE DESSINÉE : ${reponse.join(", ")}` : "aucune flèche d'accélération, ni u_N, ni centre"}, bouton « Lancer » ${lance ? "PRÉSENT" : "absent"}, contrôles [${await controles()}]${dits.length ? ` — la description DIT : ${dits.join(", ")}` : ""}`);
}
async function engageSansCourse(ou) {
  const { accentN } = await classer();
  const reponse = [];
  for (const r of ["a-bout", "aN-bout", "uN-bout", "centre"]) if (await repere(r)) reponse.push(r);
  const l = await panneau.locator("[data-lecture]").count();
  const res = await resultat();
  juger("avant-pari", accentN === 0 && reponse.length === 0 && l === 0 && !/bonne|incorrecte/i.test(res), `${ou}, pari pris, moto pas encore lancée : ${accentN} px d'accent, ${reponse.length ? `DESSINÉ : ${reponse.join(", ")}` : "rien de la réponse"}, lectures ${l ? "PRÉSENTES" : "absentes"}, verdict ${res ? `« ${res} »` : "absent"}`);
}
/** Lancer la moto ; mesurer la course à l'horloge ; rendre sa durée (s) et le plus grand ℓ vu. */
async function laCourse() {
  const avant = parseFloat(await attr("data-l-m"));
  let lMax = -Infinity, premier = NaN;
  const t0 = Date.now();
  await panneau.locator("[data-lancer]").click();
  for (let i = 0; i < 300; i++) {
    const c = await attr("data-course");
    const l = parseFloat(await attr("data-l-m"));
    if (Number.isFinite(l) && c === "course") { if (Number.isNaN(premier)) premier = l; lMax = Math.max(lMax, l); }
    if (c === "finie") break;
    await page.waitForTimeout(40);
  }
  const t = (Date.now() - t0) / 1000;
  const fin = parseFloat(await attr("data-l-m"));
  lMax = Math.max(lMax, fin);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") !== "note", SCENE, { timeout: 5000 }).catch(() => {});
  await deuxImages();
  await page.waitForTimeout(120);
  return { t, lMax, avant, premier, fin };
}

/**
 * Les éclairs pendant une course (WCAG 2.3.1), mesurés IMAGE PAR IMAGE sur le
 * canvas réduit au quart : par case, le nombre d'inversions de luminance d'au
 * moins 0,1, ramené à la seconde. Attendu structurellement bas — un point qui
 * glisse éclaire chaque case une fois — et mesuré quand même (spec §11.3).
 */
const eclairsPendantCourse = () => panneau.evaluate(async (el) => {
  const cv = el.querySelector("canvas");
  const W = Math.ceil(cv.width / 4), H = Math.ceil(cv.height / 4);
  const t = document.createElement("canvas");
  t.width = W; t.height = H;
  const gt = t.getContext("2d", { willReadFrequently: true });
  const ext = new Float32Array(W * H).fill(-1), sens = new Int8Array(W * H), chg = new Uint16Array(W * H);
  el.querySelector("[data-lancer]").click();
  const t0 = performance.now();
  let images = 0;
  for (;;) {
    await new Promise((r) => requestAnimationFrame(r));
    images++;
    gt.clearRect(0, 0, W, H);
    gt.drawImage(cv, 0, 0, W, H);
    const d = gt.getImageData(0, 0, W, H).data;
    for (let k = 0; k < W * H; k++) {
      const L = (0.2126 * d[4 * k] + 0.7152 * d[4 * k + 1] + 0.0722 * d[4 * k + 2]) / 255;
      if (ext[k] < 0) { ext[k] = L; continue; }
      const dl = L - ext[k];
      if (Math.abs(dl) >= 0.1 && Math.sign(dl) !== sens[k]) { chg[k]++; sens[k] = Math.sign(dl); ext[k] = L; }
      else if ((sens[k] > 0 && L > ext[k]) || (sens[k] < 0 && L < ext[k])) ext[k] = L;
    }
    if (el.getAttribute("data-course") === "finie") break;
    if (performance.now() - t0 > 30000) break;
  }
  const s = (performance.now() - t0) / 1000;
  let pire = 0;
  for (let k = 0; k < W * H; k++) pire = Math.max(pire, Math.floor(chg[k] / 2) / s);
  return { images, secondes: Math.round(s * 10) / 10, pire: Math.round(pire * 10) / 10 };
});

const FORMES = [
  // §9.1 le saut, la parabole — le chapitre voisin
  ["saut", /(^|[^\p{L}])saut(s|er)?(?![\p{L}])/iu, "le saut"],
  ["parabole", /(^|[^\p{L}])parabol/iu, "une parabole"],
  // le NOM (la portée du saut), pas le participe : « a_N, portée par le vecteur
  // unitaire u_N » est le retour même de S1 (premier passage de la porte)
  ["portée", /(^|[^\p{L}])portée(?![\p{L}])(?!\s+par(?![\p{L}]))/iu, "la portée"],
  ["projectile", /(^|[^\p{L}])projectile/iu, "un projectile"],
  ["atterrissage", /(^|[^\p{L}])atterri/iu, "l'atterrissage"],
  ["décollage", /(^|[^\p{L}])décoll/iu, "le décollage"],
  ["V_C", /V_C|V_\{C\}/u, "$V_C$"],
  // §9.2 aucune force, aucune masse
  ["force", /(^|[^\p{L}])forces?(?![\p{L}])/iu, "une force"],
  ["vec F", /\\vec\s*\{?F|\\sum\s*\\vec/u, "$\\vec F$"],
  ["poids", /(^|[^\p{L}])poids(?![\p{L}])/iu, "le poids"],
  ["réaction", /(^|[^\p{L}])réaction(?![\p{L}])/iu, "la réaction"],
  ["masse", /(^|[^\p{L}])masses?(?![\p{L}])/iu, "la masse"],
  ["kg", /\d[\s  ]*kg(?![\p{L}])/iu, "190 kg"],
  ["newton", /(^|[^\p{L}])newtons?(?![\p{L}])|\d[\s  ]*N(?![\p{L}·])/u, "525 N"],
  ["centripète", /centripète/iu, "centripète"],
  ["centrifuge", /centrifuge/iu, "centrifuge"],
  ["pesanteur", /(^|[^\p{L}])pesanteur/iu, "la pesanteur"],
  ["frottement", /(^|[^\p{L}])frottement/iu, "le frottement"],
  // §9.3 aucune grandeur angulaire
  ["oméga", /oméga|\\omega|ω/iu, "ω"],
  ["angulaire", /(^|[^\p{L}])angulaire/iu, "vitesse angulaire"],
  ["moment", /(^|[^\p{L}])moments?(?![\p{L}])/iu, "le moment"],
  ["tr/min", /tr\/min|rad\/s|rad·s/iu, "tr/min"],
  ["période", /(^|[^\p{L}])période/iu, "la période"],
  // §9.4 aucune énergie
  ["énergie", /(^|[^\p{L}])énergie/iu, "l'énergie"],
  ["cinétique", /(^|[^\p{L}])cinétique/iu, "cinétique"],
  ["travail", /(^|[^\p{L}])travail(?![\p{L}])/iu, "le travail"],
  ["joule", /(^|[^\p{L}])joules?(?![\p{L}])/iu, "joule"],
  // §9.5 ni gravitation, ni satellite, ni Lorentz
  ["gravitation", /(^|[^\p{L}])gravitation/iu, "la gravitation"],
  ["Kepler", /kepler/iu, "Kepler"],
  ["satellite", /(^|[^\p{L}])satellite/iu, "un satellite"],
  ["orbite", /(^|[^\p{L}])orbit/iu, "l'orbite"],
  ["planète", /(^|[^\p{L}])planète/iu, "une planète"],
  ["Lorentz", /lorentz/iu, "Lorentz"],
  ["produit vectoriel", /\\wedge|∧/u, "$\\wedge$"],
  ["champ magnétique", /champ magnétique|\\vec\s*\{?B\}?/iu, "le champ magnétique"],
  // §9.6 ni équation différentielle, ni Euler
  ["équation différentielle", /équation différentielle/iu, "l'équation différentielle"],
  ["Euler", /(^|[^\p{L}])euler/iu, "Euler"],
  ["primitive", /(^|[^\p{L}])primitive|(^|[^\p{L}])intégr/iu, "une primitive"],
  // §9.7 rien de Frenet au-delà du plan
  ["binormale", /binormal/iu, "la binormale"],
  ["torsion", /(^|[^\p{L}])torsion/iu, "la torsion"],
  ["trièdre", /trièdre/iu, "le trièdre"],
  ["Serret", /serret/iu, "Frenet-Serret"],
  ["abscisse curviligne", /abscisse curviligne/iu, "l'abscisse curviligne"],
  ["kappa", /\\kappa|κ/u, "κ"],
  // §9.8–9.11
  ["vitesse limite", /vitesse limite/iu, "la vitesse limite"],
  ["référentiel non galiléen", /non galiléen|force d.inertie/iu, "référentiel non galiléen"],
  ["lagrangien", /lagrang|hamilton/iu, "le lagrangien"],
  ["oscillation", /(^|[^\p{L}])oscill|(^|[^\p{L}])pendule|(^|[^\p{L}])résonance/iu, "une oscillation"],
  // §9.13 aucune échelle non linéaire
  ["logarithmique", /(^|[^\p{L}])log(arithm|\b)|semi-log/iu, "une échelle logarithmique"],
  ["exagéré", /(^|[^\p{L}])exagér|hors échelle|pas à l.échelle/iu, "exagéré"],
  // §9.14 aucun graphe
  ["graphe", /(^|[^\p{L}])graphe|coefficient directeur|ordonnée à l.origine|courbe représentative|f\(t\)/iu, "le graphe"],
  // §9.16 pas un TP
  ["TP", /(^|[^\p{L}])TP(?![\p{L}])|travaux pratiques|incertitude|±|chronophotographie/u, "en TP"],
  // §9.14 encore : « pente » est le mot du graphe (le retour de S1 dit « la partie droite »)
  ["pente", /(^|[^\p{L}])pentes?(?![\p{L}])/iu, "la pente"],
  ["vec N", /\\vec\s*\{?N\}?(?![\p{L}_])/u, "$\\vec N$"],
  // spec §13.9 : la scène parle comme le cadre et les sujets — « Freinet » ; la
  // leçon nomme Frenet UNE fois, dans sa parenthèse d'orthographe, pas la scène
  ["Frenet", /(^|[^\p{L}])Frenet(?![\p{L}])/u, "la base de Frenet"],
];
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  // §9.12 : les seuls degrés affichés sont ceux de la piste
  const degres = [...t.matchAll(/(\d+(?:,\d+)?)[\s  ]*°/gu)].map((m) => m[1]);
  const autres = [...new Set(degres)].filter((d) => !["10", "18", "28"].includes(d));
  if (autres.length) vues.push(`degrés ${autres.join(", ")}`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `forme(s) interdite(s) AFFICHÉE(S) : ${vues.join(", ")}` : `aucune des ${FORMES.length} formes interdites ; degrés affichés ${[...new Set(degres)].join(", ") || "aucun"}`}`);
}
const latexBrut = () => panneau.evaluate((el) => {
  const t = el.innerText;
  return (t.match(/\\(frac|dfrac|vec|cdot|sqrt|times|text)\b|\$[^$]{1,40}\$/g) ?? []);
});
/**
 * La relation, construite en quatre temps (spec §2.3) : ses FORMES, dans le
 * texte du panneau (annotations TeX comprises). Le carré de la vitesse s'écrit
 * aussi EN MOTS (« $v$ au carré » : c'est la forme que le retour de S2 écrit).
 * Une clé absente de `attendu` n'est pas jugée : ce qui a été écrit à une étape
 * n'a pas à être RÉÉCRIT à la suivante ; il ne doit pas l'être AVANT.
 */
async function formule(ou, attendu) {
  const t = await panneau.evaluate((el) => el.textContent ?? "");
  const V2 = /v\^2|v²|v\^\{2\}|(^|[^\p{L}])au carré/u.test(t);
  const SUR_R = /\\d?frac\{v\^2\}\{R\}|v\^2\s*\/\s*R|v²\s*\/\s*R/.test(t);
  const DVDT = /\\d?frac\{dv\}\{dt\}|dv\s*\/\s*dt|a_T\b|a_\{T\}/.test(t);
  const AV = /\\vec\s*\{?a\}?\s*\\cdot\s*\\vec\s*\{?v|a\s*·\s*v(?![\p{L}])/u.test(t);
  const lu = { V2, SUR_R, DVDT, AV };
  const fautes = Object.entries(attendu).filter(([k, v]) => lu[k] !== v).map(([k, v]) => `${k} ${v ? "ABSENT (attendu)" : "ÉCRIT trop tôt"}`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : Object.keys(attendu).map((k) => `${k} ${lu[k] ? "écrit" : "non écrit"}`).join(", ")}`);
}

/** Les étiquettes : ni chevauchées, ni sous la légende ni le tableau, dans le cadre ; sans fond, sur du blanc ; près de ce qu'elles nomment. */
const ANCRES = { "nom-a": "a-bout", "nom-aN": "aN-bout", "nom-aT": "aT-bout", "nom-uT": "uT-bout", "nom-uN": "uN-bout", "nom-B": "B", "nom-C": "C" };
// la distance au point nommé : la portée du placement (18 px) plus la demi-taille de l'étiquette
const PRES = { "nom-a": 36, "nom-aN": 36, "nom-aT": 36, "nom-uT": 36, "nom-uN": 36, "nom-B": 36, "nom-C": 36 };
async function etiquettesLisibles(ou, q = panneau) {
  const { textes, larg, haut, obstacles, ancres, encre } = await q.evaluate((el, ANCRES) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const transparent = (e) => { const c = getComputedStyle(e).backgroundColor; return c === "transparent" || /rgba\(.*,\s*0\)$/.test(c); };
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => visible(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), sansFond: transparent(e), ...boite(e) }));
    const obstacles = [...el.querySelectorAll("[data-legende], [data-tableau]")].map((e) => ({ nom: e.hasAttribute("data-legende") ? "légende" : "tableau", ...boite(e) }));
    const ancres = {};
    for (const [nom, r] of Object.entries(ANCRES)) {
      const s = el.querySelector(`[data-etiquette="${r}"]`);
      if (s && visible(s)) { const b = s.getBoundingClientRect(); ancres[nom] = { x: b.left - rc.left + b.width / 2, y: b.top - rc.top + b.height / 2 }; }
    }
    const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
    const f = g.getImageData(cv.width - 1, cv.height - 1, 1, 1).data;
    // l'accent, en chrominance (comme `classer`) : ce qu'une étiquette À FOND ne doit pas cacher
    const tj = document.createElement("canvas").getContext("2d");
    tj.fillStyle = getComputedStyle(el).getPropertyValue("--figure-accent"); tj.fillRect(0, 0, 1, 1);
    const ac = tj.getImageData(0, 0, 1, 1).data;
    const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
    const cf = chroma(f[0], f[1], f[2]);
    const ca = chroma(ac[0], ac[1], ac[2]).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
    const estAccent = (r, g2, b) => { const c = chroma(r, g2, b).map((x, i) => x - cf[i]), nc = Math.hypot(...c); return nc >= 0.8 * na && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85; };
    for (const a of textes) {
      if (!a.sansFond) {
        // une étiquette opaque posée sur la RÉPONSE la cache (le nom de u_T sur le pied
        // des flèches d'accélération, captures de la porte) : l'accent fort sous elle
        const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
        const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
        a.accentCache = 0;
        if (w > 0 && h > 0) {
          const d = g.getImageData(x0, y0, w, h).data;
          for (let i = 0; i < d.length; i += 4) if (estAccent(d[i], d[i + 1], d[i + 2])) a.accentCache++;
        }
        continue;
      }
      const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
      const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
      a.encreDessous = 0;
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) a.encreDessous++;
    }
    let encre = 0;
    for (const o of obstacles) {
      const d = g.getImageData(Math.max(0, Math.floor(o.x0 * dpr)), Math.max(0, Math.floor(o.y0 * dpr)), Math.max(1, Math.ceil((o.x1 - o.x0) * dpr)), Math.max(1, Math.ceil((o.y1 - o.y0) * dpr))).data;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) encre++;
    }
    return { textes, larg: rc.width, haut: rc.height, obstacles, ancres, encre };
  }, ANCRES);
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    for (const o of obstacles) if (a.x0 < o.x1 - 1 && o.x0 < a.x1 - 1 && a.y0 < o.y1 - 1 && o.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS ${o.nom === "légende" ? "la légende" : "le tableau"}`);
    if (a.encreDessous > 0) fautes.push(`« ${a.nom} », sans fond, posée sur ${a.encreDessous} pixel(s) d'encre`);
    // quelques pixels lissés au bord d'une boîte ne cachent rien ; une flèche, si
    if (a.accentCache > 6) fautes.push(`« ${a.nom} », opaque, CACHE ${a.accentCache} pixel(s) de la réponse (accent)`);
    const o = ancres[a.nom];
    if (o) {
      const dist = Math.hypot(Math.max(a.x0 - o.x, 0, o.x - a.x1), Math.max(a.y0 - o.y, 0, o.y - a.y1));
      if (dist > PRES[a.nom]) fautes.push(`« ${a.nom} » à ${dist.toFixed(0)} px de ce qu'elle nomme (> ${PRES[a.nom]})`);
    }
  }
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende ou le tableau, dans le cadre, près de leur objet"}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) dessiné(s) sous la légende et le tableau de bord, qui les CACHENT (attendu 0)`);
}
/** L'état posé par l'étape. */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { v: await attr("data-v-ms"), R: await attr("data-r-m"), reg: await attr("data-regime"), rep: await attr("data-repere"), l: await attr("data-l-m"), ph: await attr("data-pari") };
  const ok = lu.v === e.v_ms && lu.R === e.R_m && lu.reg === e.regime && lu.rep === e.repere && lu.l === "-9.000" && lu.ph === "attente";
  juger("etapes", ok, `étape ${id} : v = ${lu.v}, R = ${lu.R}, ${lu.reg}, repère ${lu.rep}, moto à ℓ = ${lu.l} m, pari « ${lu.ph} »`);
}
async function revelePose(id) {
  const e = etapeDesc(id);
  const attendu = { ...e.etat, ...e.etat_revele };
  const lu = { v: await attr("data-v-ms"), R: await attr("data-r-m"), reg: await attr("data-regime"), rep: await attr("data-repere") };
  const ok = lu.v === attendu.v_ms && lu.R === attendu.R_m && lu.reg === attendu.regime && lu.rep === "entree" && (await controles()) === [...e.controles].sort().join(",");
  juger("etapes", ok, `étape ${id} révélée : v = ${lu.v}, R = ${lu.R}, ${lu.reg}, repère ${lu.rep} (attendu ${attendu.v_ms}, ${attendu.R_m}, ${attendu.regime}, entree) ; contrôles [${await controles()}]`);
}
/** La course : partie de −9,0 m, jamais au-delà de B, au ralenti ×6 mesuré contre l'HORLOGE. */
/**
 * La course : partie de −9,0 m (au repos avant le clic à la première course de
 * l'étape ; au premier relevé ensuite, à 0,5 m près), jamais au-delà de B, arrêtée
 * EN B, au ralenti ×6 mesuré contre l'HORLOGE (à 20 % : le relevé coûte des
 * allers-retours au navigateur).
 */
function jugerCourse(ou, c, vB, aT, auRepos = true) {
  const T = duree(vB, aT) * RALENTI;
  const depart = auRepos ? c.avant === -9 : c.premier <= -8.5;
  const ok = depart && c.lMax <= 0.0005 && c.fin === 0 && Math.abs(c.t - T) / T <= 0.2;
  juger("course", ok, `${ou} : ${auRepos ? `au repos ℓ = ${c.avant} m` : `premier relevé ℓ = ${virgule(c.premier, 2)} m`}, plus loin atteint ℓ = ${virgule(c.lMax, 3)} m, arrêtée à ℓ = ${virgule(c.fin, 3)} m (en B), durée ${virgule(c.t, 2)} s pour ${virgule(T, 2)} s attendues (ralenti ×${RALENTI}, à 20 %)`);
}

try {
  // ═══ S1 — le virage à vitesse tenue ═══
  await etatPose("le-virage-a-vitesse-tenue");
  await avantPari("étape 1", ["perpendiculaire", "centre", "16,2", "normale"]);
  await formule("étape 1, avant le pari", { V2: false, SUR_R: false, DVDT: false, AV: false });
  await frontiere("étape 1, avant le pari");
  await parier(indexDe("le-virage-a-vitesse-tenue", "vers-le-centre"));
  await engageSansCourse("étape 1");
  {
    const c = await laCourse();
    jugerCourse("étape 1 (18,0 m·s⁻¹, vitesse tenue)", c, 18, 0);
    const res = await resultat();
    juger("paris", /bonne réponse/i.test(res), `étape 1, pari juste, course finie : « ${res} »`);
    await revelePose("le-virage-a-vitesse-tenue");
    const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
    juger("annonce", /16,2\s*m·s⁻²/.test(an), `étape 1 révélée : la région vivante dit « ${an} » (attendu la flèche qui mesure 16,2 m·s⁻²)`);
    juger("nombres", (await lecture("acceleration-normale")) === "16,2 m·s⁻²" && (await lecture("vitesse")) === "18,0 m·s⁻¹" && (await lecture("rayon")) === "20 m", `étape 1 révélée : a_N « ${await lecture("acceleration-normale")} », v « ${await lecture("vitesse")} », R « ${await lecture("rayon")} »`);
  }
  await formule("étape 1, révélée", { V2: false, SUR_R: false, DVDT: false, AV: false });
  {
    // la géométrie de la piste, aux pixels (R = 20 m ici ; les quatre rayons à l'étape 5) —
    // lue moto sur la droite (aucune flèche dans l'arc), vitesse tenue
    await cocher('[data-controle="position"]', "approche");
    const e = await echelles();
    const piste = await pisteLue();
    const D = piste?.droite;
    juger("tangente-vraie", D && Math.abs(D.pente - 10) <= 0.5 && D.residu <= 1.5, `la droite d'approche, lue sur ${D?.n ?? 0} colonnes du trait : ${D ? virgule(D.pente, 2) : "?"}° sous l'horizontale (attendu 10,0 à 0,5°), écart au trait ${D ? virgule(D.residu, 1) : "?"} px`);
    // la base de Freinet en G : u_T sur la tangente de la piste LUE, a perpendiculaire, vers le centre LU
    await cocher('[data-controle="position"]', "milieu");
    await classer();
    const g = await repere("G"), tg = tangenteEn(g, piste);
    const uT = await repere("uT-bout");
    const angUT = tg && uT ? Math.acos(Math.min(1, Math.abs((uT.x - g.x) * tg.ux + (uT.y - g.y) * tg.uy) / Math.hypot(uT.x - g.x, uT.y - g.y))) / RAD : NaN;
    juger("tangente-vraie", tg?.surArc && angUT <= 1, `au milieu du tremplin, G ${tg ? (tg.surArc ? "est sur l'arc lu" : "est sur la DROITE") : "n'est PAS sur la piste dessinée"} ; u_T fait ${virgule(angUT, 2)}° avec la tangente lue (par ${tg?.par ?? "rien"} ; attendu ≤ 1°)`);
    const f = await flecheLue("a-bout", 1);
    const ang = tg && f ? Math.acos(Math.abs(f.ux * tg.ux + f.uy * tg.uy)) / RAD : NaN;
    const versCentre = tg?.centre && f ? f.ux * (tg.centre.x - g.x) + f.uy * (tg.centre.y - g.y) > 0 : false;
    juger("normale-vers-le-centre", Math.abs(ang - 90) <= 1 && versCentre, `au milieu, vitesse tenue : la flèche fait ${virgule(ang, 2)}° avec la piste (attendu 90 à 1°), et pointe ${versCentre ? "vers le centre du cercle lu" : "à l'OPPOSÉ du centre"}`);
    juger("fleches-a-l-echelle", f && e && Math.abs(f.L - 16.2 * e.pxA) <= tol(16.2 * e.pxA), `au milieu : la flèche mesure ${f ? virgule(f.L, 1) : "?"} px aux pixels, pour 16,2 × ${e ? virgule(e.pxA, 2) : "?"} px lus sur le témoin = ${e ? virgule(16.2 * e.pxA, 1) : "?"} (à ${e ? virgule(tol(16.2 * e.pxA), 1) : "?"} px)`);
    await cocher('[data-controle="position"]', "approche");
    const { accentN } = await classer();
    juger("droite-sans-normale", accentN === 0 && !(await repere("uN-bout")) && !(await repere("centre")) && !(await repere("rayon-bout")), `sur la droite, vitesse tenue : ${accentN} px d'accent (attendu 0 : accélération nulle), ${(await repere("uN-bout")) ? "u_N DESSINÉ" : "ni u_N"}, ${(await repere("centre")) || (await repere("rayon-bout")) ? "centre ou rayon DESSINÉ" : "ni centre ni rayon"}`);
    juger("nombres", (await lecture("acceleration-normale")) === "0,00 m·s⁻²" && (await lecture("rayon")) === "droite : pas de courbure", `sur la droite : a_N « ${await lecture("acceleration-normale")} », rayon « ${await lecture("rayon")} »`);
    await cocher('[data-controle="position"]', "entree");
  }
  await frontiere("étape 1 révélée");
  await etiquettesLisibles("étape 1 révélée");
  await suivant();

  // ═══ S2 — deux fois plus vite ═══
  await etatPose("deux-fois-plus-vite");
  await avantPari("étape 2", ["quatre", "carré", "16,2"]);
  await formule("étape 2, avant le pari", { V2: false, SUR_R: false, DVDT: false, AV: false });
  await parier(indexDe("deux-fois-plus-vite", "quatre-fois"));
  juger("etapes", (await attr("data-v-ms")) === "18", `étape 2, pari pris : l'engagement pose v = ${await attr("data-v-ms")} m·s⁻¹ (attendu 18 : la course court dans le réglage que la question décrit)`);
  await engageSansCourse("étape 2");
  {
    const c = await laCourse();
    jugerCourse("étape 2 (18,0 m·s⁻¹, vitesse tenue)", c, 18, 0);
    await revelePose("deux-fois-plus-vite");
    const fautes = [];
    for (const v of VITESSES) {
      await cocher('[data-controle="vitesse"]', String(v));
      const lu = await lecture("acceleration-normale");
      if (lu !== `${trois((v * v) / 20)} m·s⁻²`) fautes.push(`v = ${v} : « ${lu} »`);
    }
    juger("nombres", fautes.length === 0, `N1 — tremplin de 20 m, trois vitesses : ${fautes.length ? fautes.join(" ; ") : "4,05 · 7,20 · 16,2"}`);
    await cocher('[data-controle="vitesse"]', "18");
    // la référence (le réglage de départ, 9,0 m·s⁻¹) reste dessinée en tirets d'encre, à l'échelle
    const e = await echelles(), g = await repere("G"), ref = await repere("ref");
    const Lref = g && ref ? Math.hypot(ref.x - g.x, ref.y - g.y) : NaN;
    // « départ » nomme un bout qui SE VOIT : l'anneau d'encre, sur les quatre points cardinaux
    await classer();
    const anneau = ref ? await panneau.evaluate((el, { x, y }) => {
      const { cls, w, h, dpr } = window.__cls;
      const encre = (px, py) => { for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) { const X = Math.round((px + dx * 0.5) * dpr - 0.5), Y = Math.round((py + dy * 0.5) * dpr - 0.5); if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] === 2) return true; } return false; };
      return [[3.5, 0], [-3.5, 0], [0, 3.5], [0, -3.5]].filter(([a, b]) => encre(x + a, y + b)).length;
    }, ref) : 0;
    juger("etiquettes", anneau === 4, `étape 2 : le bout de la flèche de départ, nommé « départ », est un anneau d'encre vu sur ${anneau}/4 points (attendu 4 : visible même sur la hampe de u_N)`);
    juger("fleches-a-l-echelle", e && Math.abs(Lref - 4.05 * e.pxA) <= 3, `étape 2 : la flèche de départ (9,0 m·s⁻¹) va à ${virgule(Lref, 1)} px de G, pour 4,05 × ${virgule(e?.pxA ?? NaN, 2)} = ${virgule(4.05 * (e?.pxA ?? NaN), 1)} px`);
  }
  await formule("étape 2, révélée", { V2: true, SUR_R: false, DVDT: false, AV: false });
  await etiquettesLisibles("étape 2 révélée");
  await suivant();

  // ═══ S3 — deux fois plus serré ═══
  await etatPose("deux-fois-plus-serre");
  await avantPari("étape 3", ["double", "dénominateur", "21,6"]);
  await formule("étape 3, avant le pari", { SUR_R: false, DVDT: false, AV: false });
  await parier(indexDe("deux-fois-plus-serre", "double"));
  {
    const c = await laCourse();
    jugerCourse("étape 3 (18,0 m·s⁻¹, vitesse tenue)", c, 18, 0);
    await revelePose("deux-fois-plus-serre");
    const fautes = [];
    for (const R of RAYONS) {
      await cocher('[data-controle="rayon"]', String(R));
      const lu = await lecture("acceleration-normale"), p = await lecture("aN-fois-R");
      if (lu !== `${trois(324 / R)} m·s⁻²`) fautes.push(`R = ${R} : a_N « ${lu} »`);
      // N3 : le produit est calculé sur les valeurs AFFICHÉES — la chaîne de calcul
      const aff = parseFloat(lu.replace(",", "."));
      if (p !== `${trois(aff * R)} m²·s⁻²` || p !== "324 m²·s⁻²") fautes.push(`R = ${R} : a_N × R « ${p} »`);
    }
    juger("nombres", fautes.length === 0, `N1 · N3 — 18,0 m·s⁻¹, quatre tremplins : ${fautes.length ? fautes.join(" ; ") : "32,4 · 21,6 · 16,2 · 10,8, et a_N × R = 324 aux quatre"}`);
  }
  await formule("étape 3, révélée", { SUR_R: true, DVDT: false, AV: false });
  await etiquettesLisibles("étape 3 révélée");
  await suivant();

  // ═══ S4 — il garde les gaz ═══
  await etatPose("gaz-ou-frein");
  await avantPari("étape 4", ["bascule", "16,8", "accéléré"]);
  await formule("étape 4, avant le pari", { DVDT: false, AV: false });
  await parier(indexDe("gaz-ou-frein", "bascule-vers-lavant"));
  {
    const c = await laCourse();
    jugerCourse("étape 4 (18,0 m·s⁻¹ en B, gaz)", c, 18, 4.5);
    await revelePose("gaz-ou-frein");
    const fautes = [], fautesTableau = [];
    for (const [reg, aT] of Object.entries(REGIMES)) {
      await cocher('[data-controle="pilotage"]', reg);
      const a = Math.hypot(aT, 16.2);
      const lus = [await lecture("acceleration-normale"), await lecture("acceleration-tangentielle"), await lecture("acceleration"), await lecture("produit-a-v"), await lecture("nature")];
      const att = ["16,2 m·s⁻²", `${signe(aT)} m·s⁻²`, `${trois(a)} m·s⁻²`, `${ecrireAV(aT * 18)} m²·s⁻³`, aT > 0 ? "accéléré" : aT < 0 ? "retardé" : "uniforme"];
      lus.forEach((l, i) => { if (l !== att[i]) fautes.push(`${reg} : « ${l} » (attendu « ${att[i]} »)`); });
      const tab = espaces(await panneau.locator("[data-tableau-a] .katex-mathml annotation").textContent().catch(() => ""));
      if (!tab.includes(trois(a).replace(",", "{,}"))) fautesTableau.push(`${reg} : « ${tab || "absent"} »`);
    }
    juger("nombres", fautesTableau.length === 0, `S4 : le tableau de bord porte ‖a‖ aux trois pilotages (au téléphone, le pilotage est sous les lectures)${fautesTableau.length ? ` — ${fautesTableau.join(" ; ")}` : " : 16,8 · 16,2 · 16,8"}`);
    juger("nombres", fautes.length === 0, `N2 · N4 · N5 · N6 — 18,0 m·s⁻¹, R = 20 m, trois pilotages : ${fautes.length ? fautes.slice(0, 4).join(" ; ") : "a_N 16,2 inchangée ; a_T +4,50 / 0,00 / −4,50 ; ‖a‖ 16,8 / 16,2 / 16,8 ; a·v +81,0 / 0 / −81,0"}`);
    await cocher('[data-controle="pilotage"]', "gaz");
  }
  await formule("étape 4, révélée", { DVDT: true, AV: true });
  await etiquettesLisibles("étape 4 révélée");
  await suivant();

  // ═══ S5 — tout s'ouvre ═══
  await etatPose("libre");
  await avantPari("étape 5", ["8,49", "retardé", "−54"]);
  await parier(indexDe("libre", "accelere-8-49"));
  {
    const c = await laCourse();
    jugerCourse("étape 5 (12,0 m·s⁻¹ en B, freinage)", c, 12, -4.5);
    const res = await resultat();
    juger("paris", /incorrecte/i.test(res), `étape 5, pari faux (accéléré), course finie : « ${res} »`);
    juger("etapes", (await controles()) === "pilotage,position,rayon,vitesse", `étape 5 révélée : contrôles [${await controles()}]`);
    const fAnnonce = [];
    // la course aux 9 couples (vitesse × pilotage), sur le tremplin de 20 m : le
    // ralenti ne dépend d'aucun réglage, la moto s'arrête toujours en B
    await cocher('[data-controle="rayon"]', "20");
    for (const v of VITESSES) {
      await cocher('[data-controle="vitesse"]', String(v));
      for (const [reg, aT] of Object.entries(REGIMES)) {
        await cocher('[data-controle="pilotage"]', reg);
        jugerCourse(`étape 5, relancée (${virgule(v, 1)} m·s⁻¹ en B, ${reg})`, await laCourse(), v, aT, false);
        // l'arrivée d'une RELANCE se dit aussi (elle ramène le repère en B)
        const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
        const attendu = `${trois(Math.hypot(aT, (v * v) / 20))} m·s⁻²`;
        if (!an.includes("La moto est en B") || !an.includes(attendu)) fAnnonce.push(`${virgule(v, 1)}·${reg} : « ${an} » (attendu l'arrivée en B et ${attendu})`);
      }
    }
    juger("annonce", fAnnonce.length === 0, `étape 5, les 9 relances : ${fAnnonce.length ? fAnnonce.slice(0, 2).join(" ; ") : "chaque arrivée en B est dite, avec la norme de l'accélération"}`);
    // un réglage PENDANT une relance l'arrête : la moto ne court plus dans un réglage
    // que l'écran ne montre plus (vague 2)
    {
      await cocher('[data-controle="position"]', "milieu");
      await cocher('[data-controle="vitesse"]', "9");
      await cocher('[data-controle="pilotage"]', "gaz");
      await panneau.locator("[data-lancer]").click();
      await page.waitForTimeout(600);
      const avant = await attr("data-course");
      await cocher('[data-controle="vitesse"]', "18");
      await page.waitForTimeout(150);
      const apres = await attr("data-course"), l = parseFloat(await attr("data-l-m"));
      juger("course", avant === "course" && apres !== "course" && Math.abs(l - abscisse(await attr("data-repere"), 20)) < 0.002, `étape 5 : un réglage pendant la course (${avant}) → ${apres === "course" ? "la course CONTINUE dans l'ancien réglage" : `course arrêtée, la moto au repère (ℓ = ${virgule(l, 3)} m)`}`);
      // (un produit fautif laisse la course courir : on la termine, pour que les mesures suivantes ne héritent pas de son défaut)
      if ((await attr("data-course")) === "course") {
        await panneau.locator("[data-image-finale]").click();
        await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course") === "finie", SCENE, { timeout: 5000 }).catch(() => {});
      }
    }
    await cocher('[data-controle="vitesse"]', "18");
    await cocher('[data-controle="pilotage"]', "gaz");
    const ec = await eclairsPendantCourse();
    await deuxImages();
    juger("eclairs", ec.pire <= 3 && ec.images >= 20, `pendant une course (${ec.secondes} s, ${ec.images} images) : au plus ${ec.pire} éclair(s)/s sur une case de 4 px (≤ 3, WCAG 2.3.1)`);
    await cocher('[data-controle="vitesse"]', "12");
    await cocher('[data-controle="pilotage"]', "freinage");
  }
  {
    // les 36 réglages, à l'entrée du tremplin — et, sur la droite, le zéro
    // structurel. La piste de chaque rayon est LUE d'abord (moto sur la droite,
    // vitesse tenue : rien ne couvre l'arc), et chaque angle se juge contre elle.
    const fN = [], fPix = [], fComp = [], fNorm = [], fSigne = [], fDroite = [], fArc = [], vusArc = [], ech = [], unit = [];
    // les MARGES : le pire écart vu, imprimé à côté du seuil (une porte verte dit aussi de combien)
    const pire = { pix: 0, comp: 0, norm: 0, tan: 0 };
    const fNom = [];
    for (const R of RAYONS) {
      await cocher('[data-controle="rayon"]', String(R));
      await cocher('[data-controle="pilotage"]', "tenue");
      await cocher('[data-controle="position"]', "approche");
      const e0 = await echelles();
      const piste = await pisteLue();
      {
        // l'ARC : un cercle (écart au trait ≤ 1,5 px) de rayon R × (px/m lus sur le
        // témoin) à 5 %, qui tourne de 28° × (écart des repères lus)/20, et que la
        // droite touche en B (la droite est TANGENTE au cercle : le raccordement)
        const C = piste?.arc, D = piste?.droite;
        if (!C || !D || !e0) fArc.push(`R = ${R} : piste ILLISIBLE (${C?.n ?? 0} points d'arc, ${D?.n ?? 0} de droite)`);
        else {
          const attendu = R * e0.pxM, rotAtt = (28 * (C.kMax - C.kMin)) / 20;
          const raccord = Math.abs(D.a * C.cx - C.cy + D.b) / Math.hypot(1, D.a);
          vusArc.push(`R = ${R} m : ${virgule(C.r, 1)} px pour ${virgule(attendu, 1)} (à 3 %), ${virgule(C.rot, 1)}° pour ${virgule(rotAtt, 1)} (à 1°), écart au cercle ${virgule(C.residu, 2)} px, droite à ${virgule(raccord, 1)} px du centre`);
          if (C.n < 12 || C.residu > 1 || Math.abs(C.r - attendu) / attendu > 0.03 || Math.abs(C.rot - rotAtt) > 1 || Math.abs(raccord - C.r) > 1.5)
            fArc.push(`R = ${R} : ${C.n} points, écart au cercle ${virgule(C.residu, 1)} px, rayon ${virgule(C.r, 1)} px pour ${virgule(attendu, 1)}, rotation ${virgule(C.rot, 1)}° pour ${virgule(rotAtt, 1)}, la droite à ${virgule(raccord, 1)} px du centre (tangente : ${virgule(C.r, 1)})`);
        }
      }
      for (const v of VITESSES) {
        await cocher('[data-controle="vitesse"]', String(v));
        for (const [reg, aT] of Object.entries(REGIMES)) {
          const ici = `${v}·${R}·${reg}`;
          await cocher('[data-controle="pilotage"]', reg);
          await cocher('[data-controle="position"]', "entree");
          const n = (v * v) / R, a = Math.hypot(aT, n), av = aT * v;
          // (a_N × R n'est plus lu à S5 depuis la vague 2 : c'était un reste de S3 ; N3 se lit à S3)
          const lus = { an: await lecture("acceleration-normale"), a: await lecture("acceleration"), av: await lecture("produit-a-v"), nat: await lecture("nature"), anR: await lecture("aN-fois-R") };
          const att = { an: `${trois(n)} m·s⁻²`, a: `${trois(a)} m·s⁻²`, av: `${ecrireAV(av)} m²·s⁻³`, nat: av > 0 ? "accéléré" : av < 0 ? "retardé" : "uniforme", anR: "" };
          for (const k of Object.keys(att)) if (lus[k] !== att[k]) fN.push(`${ici} ${k} « ${lus[k]} »`);
          // les pixels : la flèche à l'échelle du TÉMOIN, la composition, la normale
          const e = await echelles();
          ech.push(e);
          const f = await flecheLue("a-bout", 1);
          if (f && e) pire.pix = Math.max(pire.pix, Math.abs(f.L - a * e.pxA) - 0.01 * a * e.pxA);
          if (!f || !e || Math.abs(f.L - a * e.pxA) > tol(a * e.pxA)) fPix.push(`${ici} : ${f ? virgule(f.L, 1) : "?"} px pour ${e ? virgule(a * e.pxA, 1) : "?"}`);
          const g = await repere("G");
          const tg = tangenteEn(g, piste);
          if (!tg?.surArc) fNorm.push(`${ici} : G, à l'entrée, n'est PAS sur l'arc lu`);
          const perp = (u) => Math.acos(Math.min(1, Math.abs(u.ux * tg.ux + u.uy * tg.uy))) / RAD;
          const versC = (u) => u.ux * (tg.centre.x - g.x) + u.uy * (tg.centre.y - g.y) > 0;
          if (aT !== 0) {
            const ft = await flecheLue("aT-bout", 1), fn = await flecheLue("aN-bout", 1);
            if (!ft || !fn || !f) fComp.push(`${ici} : composantes ILLISIBLES`);
            else {
              const sx = ft.bout.x + fn.bout.x - g.x, sy = ft.bout.y + fn.bout.y - g.y;
              const ecart = Math.hypot(sx - f.bout.x, sy - f.bout.y);
              pire.comp = Math.max(pire.comp, ecart);
              if (ecart > 3.5) fComp.push(`${ici} : a_T + a_N tombe à ${virgule(ecart, 1)} px de la pointe de a`);
              if (Math.abs(ft.L - Math.abs(aT) * e.pxA) > tol(Math.abs(aT) * e.pxA) || Math.abs(fn.L - n * e.pxA) > tol(n * e.pxA)) fPix.push(`${ici} : composantes ${virgule(ft.L, 1)} et ${virgule(fn.L, 1)} px pour ${virgule(Math.abs(aT) * e.pxA, 1)} et ${virgule(n * e.pxA, 1)}`);
              if (tg?.surArc) {
                pire.norm = Math.max(pire.norm, Math.abs(perp(fn) - 90));
                pire.tan = Math.max(pire.tan, perp(ft));
                if (Math.abs(perp(fn) - 90) > 1 || !versC(fn)) fNorm.push(`${ici} : a_N à ${virgule(perp(fn), 1)}° de la piste${versC(fn) ? "" : ", à l'OPPOSÉ du centre"}`);
                if (perp(ft) > 1) fNorm.push(`${ici} : a_T à ${virgule(perp(ft), 1)}° de la piste (attendu tangente)`);
              }
            }
          } else if (tg?.surArc && f) {
            pire.norm = Math.max(pire.norm, Math.abs(perp(f) - 90));
            if (Math.abs(perp(f) - 90) > 1 || !versC(f)) fNorm.push(`${ici} : a à ${virgule(perp(f), 1)}° de la piste${versC(f) ? "" : ", à l'OPPOSÉ du centre"}`);
          }
          // le signe de a·v AFFICHÉ, et la nature AFFICHÉE, contre l'ANGLE dessiné entre a et
          // la tangente (sens du mouvement : x croissant). Deux lectures du PRODUIT face à ses
          // pixels — jamais le produit calculé ici : la campagne du 2026-09-25 (« a·v = ‖a‖·v »)
          // a trouvé cette famille verte parce qu'elle comparait l'angle au calcul de la PORTE
          // (ADR 0033 : une porte exacte sur une question plus étroite que son en-tête).
          if (tg && f) {
            const dot = f.ux * tg.ux + f.uy * tg.uy;
            const lu = Math.abs(dot) < Math.sin(1.5 * RAD) ? 0 : Math.sign(dot);
            const affiche = /^\+/.test(lus.av) ? 1 : /^−/.test(lus.av) ? -1 : /^0(\s|$)/.test(lus.av) ? 0 : NaN;
            const nature = lus.nat === "accéléré" ? 1 : lus.nat === "retardé" ? -1 : lus.nat === "uniforme" ? 0 : NaN;
            if (lu !== affiche || lu !== nature) fSigne.push(`${ici} : angle dessiné ${lu > 0 ? "aigu" : lu < 0 ? "obtus" : "droit"}, a·v affiché « ${lus.av} », nature « ${lus.nat} »`);
          }
          // u_T et u_N : une longueur de convention, la même partout
          const uN = await unitaireLu("uN-bout"), uT = await unitaireLu("uT-bout");
          unit.push({ ici, uN, uT });
          // un NOM ne se pose que sur ce qui se voit : les deux ailes sous l'accent,
          // le vecteur unitaire est invisible, et son nom ne doit pas flotter
          for (const [nom, u] of [["nom-uN", uN], ["nom-uT", uT]]) {
            const vu = await panneau.locator(`[data-etiquette="${nom}"]`).evaluate((e) => getComputedStyle(e).visibility === "visible" && !!(e.textContent ?? "").trim());
            if (vu && u?.couverte) fNom.push(`${ici} : « ${nom} » nomme une flèche invisible (ses deux ailes sous l'accent)`);
          }
          // sur la droite : la composante normale nulle, par une BRANCHE
          await cocher('[data-controle="position"]', "approche");
          const anD = await lecture("acceleration-normale"), rD = await lecture("rayon");
          const uND = await repere("uN-bout"), aND = await repere("aN-bout");
          if (anD !== "0,00 m·s⁻²" || rD !== "droite : pas de courbure" || uND || aND) fDroite.push(`${ici} : a_N « ${anD} », rayon « ${rD} »${uND ? ", u_N dessiné" : ""}${aND ? ", composante normale dessinée" : ""}`);
          const { accentN } = await classer();
          if (aT === 0 && accentN > 0) fDroite.push(`${ici} : sur la droite à vitesse tenue, ${accentN} px d'accent (attendu 0)`);
          if (aT !== 0) {
            // sur la droite, la flèche reste TANGENTE (a = a_T u_T), et mesure |a_T|
            const fd = await flecheLue("a-bout", 1), gd = await repere("G"), tgd = tangenteEn(gd, piste);
            if (!fd || !tgd || tgd.surArc) fDroite.push(`${ici} : sur la droite, flèche ou piste ILLISIBLE`);
            else {
              const angD = Math.acos(Math.min(1, Math.abs(fd.ux * tgd.ux + fd.uy * tgd.uy))) / RAD;
              if (angD > 1.5 || Math.abs(fd.L - Math.abs(aT) * e.pxA) > tol(Math.abs(aT) * e.pxA)) fDroite.push(`${ici} : sur la droite, a à ${virgule(angD, 1)}° de la piste, ${virgule(fd.L, 1)} px pour ${virgule(Math.abs(aT) * e.pxA, 1)}`);
            }
          }
        }
      }
    }
    juger("etiquettes", fNom.length === 0, `les 36 réglages à l'entrée : ${fNom.length ? fNom.slice(0, 3).join(" ; ") : "aucun nom de vecteur unitaire posé sur une flèche invisible"}`);
    juger("arc-de-cercle", fArc.length === 0, `la piste aux quatre rayons, lue sur le trait : ${fArc.length ? fArc.join(" ; ") : vusArc.join(" · ")}`);
    juger("nombres", fN.length === 0, `N1 · N4 · N5 · N6 — les 36 réglages à l'entrée : ${fN.length ? fN.slice(0, 4).join(" ; ") : "a_N, ‖a‖, a·v et la nature exacts ; a_N × R absent (c'est la lecture de S3)"}`);
    juger("fleches-a-l-echelle", fPix.length === 0, `les 36 réglages : ‖a‖, et ses deux composantes quand a_T ≠ 0, mesurent leur valeur × (px par m·s⁻² LUS sur le témoin), à 3 px + 1 % (pire : ${virgule(pire.pix, 1)} px + 1 %)${fPix.length ? ` — FAUX : ${fPix.slice(0, 3).join(" ; ")}` : ""}`);
    juger("composition", fComp.length === 0, `les 24 réglages où a_T ≠ 0 : pointe de a_T + pointe de a_N = pointe de a (lues aux pixels), à 3,5 px (pire : ${virgule(pire.comp, 1)} px)${fComp.length ? ` — ${fComp.slice(0, 3).join(" ; ")}` : ""}`);
    juger("normale-vers-le-centre", fNorm.length === 0, `les 36 réglages à l'entrée : la composante normale à 90° de la piste LUE (à 1° ; pire : ${virgule(pire.norm, 2)}°), vers le centre du cercle lu ; la tangentielle sur la tangente (pire : ${virgule(pire.tan, 2)}°)${fNorm.length ? ` — ${fNorm.slice(0, 3).join(" ; ")}` : ""}`);
    juger("signe-du-produit", fSigne.length === 0, `les 36 réglages : le signe de a·v AFFICHÉ et la nature AFFICHÉE concordent avec l'angle DESSINÉ entre a et la tangente lue${fSigne.length ? ` — ${fSigne.slice(0, 3).join(" ; ")}` : ""}`);
    juger("droite-sans-normale", fDroite.length === 0, `les 36 réglages sur la droite : a_N « 0,00 », « pas de courbure », ni u_N ni composante normale ; à vitesse tenue, aucun accent ; sinon une flèche tangente de |a_T|${fDroite.length ? ` — ${fDroite.slice(0, 3).join(" ; ")}` : ""}`);
    const pxM = ech.map((e) => e?.pxM).filter(Number.isFinite), pxA = ech.map((e) => e?.pxA).filter(Number.isFinite);
    const etale = (t) => (Math.max(...t) - Math.min(...t)) / Math.min(...t);
    juger("echelle-constante", pxM.length === 36 && pxA.length === 36 && etale(pxM) <= 0.01 && etale(pxA) <= 0.01, `les 36 réglages : ${virgule(Math.min(...pxM), 3)} à ${virgule(Math.max(...pxM), 3)} px/m, ${virgule(Math.min(...pxA), 3)} à ${virgule(Math.max(...pxA), 3)} px par m·s⁻² (constants à 1 %)`);
    {
      const Ls = unit.flatMap((u) => [u.uN?.L, u.uT?.L]).filter(Number.isFinite);
      const sansAiles = unit.flatMap((u) => [u.uN?.vide ? `${u.ici} u_N` : null, u.uT?.vide ? `${u.ici} u_T` : null]).filter(Boolean);
      const vusN = unit.filter((u) => u.uN?.vue).length, vusT = unit.filter((u) => u.uT?.vue).length;
      const lus = unit.filter((u) => u.uN && u.uT).length;
      // au moins la moitié des pointes VUES (les autres sous une flèche d'accent : ni vues ni démenties)
      juger("unitaires-constants", lus === 36 && Math.max(...Ls) - Math.min(...Ls) <= 0.5 && sansAiles.length === 0 && vusN >= 18 && vusT >= 18, `u_T et u_N, aux 36 réglages à l'entrée : ${Ls.length ? `${virgule(Math.min(...Ls), 1)} à ${virgule(Math.max(...Ls), 1)} px` : "ILLISIBLES"} (${lus}/36 ; une convention : la même à 0,5 px) ; pointes vues aux pixels, deux ailes d'encre au repère : u_N ${vusN}/36, u_T ${vusT}/36 (les autres sous l'accent)${sansAiles.length ? ` — pointe DÉMENTIE (aile vide) : ${sansAiles.slice(0, 3).join(", ")}` : ""}`);
    }
  }
  {
    // N8 : le long de l'arc (R = 20 m, 18,0 m·s⁻¹), trois pilotages, quatre repères
    const fautes = [];
    await cocher('[data-controle="rayon"]', "20");
    await cocher('[data-controle="vitesse"]', "18");
    for (const [reg, aT] of Object.entries(REGIMES)) {
      await cocher('[data-controle="pilotage"]', reg);
      for (const rep of ["approche", "entree", "milieu", "sortie"]) {
        await cocher('[data-controle="position"]', rep);
        const l = abscisse(rep, 20), v = vit(18, aT, l);
        const lv = await lecture("vitesse"), la = await lecture("acceleration-normale");
        if (lv !== `${trois(v)} m·s⁻¹` || la !== `${trois(aN(v, 20, l))} m·s⁻²`) fautes.push(`${reg} · ${rep} : v « ${lv} », a_N « ${la} »`);
      }
    }
    juger("nombres", fautes.length === 0, `N8 — le long de l'arc (R = 20 m) : ${fautes.length ? fautes.slice(0, 4).join(" ; ") : "v et a_N aux 12 lieux, dont 20,3 m·s⁻¹ en C aux gaz"}`);
  }
  {
    // N9 : la norme, identique aux gaz et au freinage, À LA CHAÎNE près ; N10 : les crans
    const fautes = [];
    await cocher('[data-controle="position"]', "milieu");
    for (const R of RAYONS) {
      await cocher('[data-controle="rayon"]', String(R));
      for (const v of VITESSES) {
        await cocher('[data-controle="vitesse"]', String(v));
        await cocher('[data-controle="pilotage"]', "gaz");
        const ag = await lecture("acceleration");
        await cocher('[data-controle="pilotage"]', "freinage");
        const af = await lecture("acceleration");
        // au milieu, v diffère entre gaz et freinage : c'est à l'ENTRÉE que l'identité vaut
        await cocher('[data-controle="position"]', "entree");
        const af0 = await lecture("acceleration");
        await cocher('[data-controle="pilotage"]', "gaz");
        const ag0 = await lecture("acceleration");
        await cocher('[data-controle="position"]', "milieu");
        if (ag0 !== af0) fautes.push(`${v}·${R} : gaz « ${ag0} », freinage « ${af0} »`);
        if (ag === af && v > 0) fautes.push(`${v}·${R} : au milieu, gaz et freinage donnent la même norme « ${ag} » — la vitesse y diffère`);
      }
    }
    const nPos = await panneau.locator('[data-controle="position"] input').count(), nV = await panneau.locator('[data-controle="vitesse"] input').count();
    const nR = await panneau.locator('[data-controle="rayon"] input').count(), nP = await panneau.locator('[data-controle="pilotage"] input').count();
    juger("nombres", fautes.length === 0, `N9 — ‖a‖ à l'entrée, gaz contre freinage, aux 12 couples : ${fautes.length ? fautes.slice(0, 3).join(" ; ") : "identiques, à la chaîne près"}`);
    juger("nombres", nPos === 4 && nV === 3 && nR === 4 && nP === 3, `N10 — crans : ${nPos} repères, ${nV} vitesses, ${nR} tremplins, ${nP} pilotages (attendu 4, 3, 4, 3)`);
  }
  {
    const { horsPalette } = await classer();
    juger("palette", horsPalette === 0, `étape 5 : ${horsPalette} pixel(s) teintés hors de la palette (attendu 0)`);
    const empreinte = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let h = 0; for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i]) >>> 0; return h; });
    const e0 = await empreinte();
    await page.waitForTimeout(1200);
    const e1 = await empreinte();
    juger("immobile", e0 === e1, `au repos, 1,2 s : l'image ${e0 === e1 ? "n'a pas changé" : "A CHANGÉ sans réglage"}`);
  }
  await frontiere("étape 5 révélée");
  await etiquettesLisibles("étape 5 révélée");
  juger("latex", (await latexBrut()).length === 0, `étape 5 révélée : ${(await latexBrut()).length} fragment(s) de LaTeX brut`);
} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
}

// ── La table des étapes, réécrite ICI contre le descripteur (fuite entre étapes) ──
{
  const attendu = { "le-virage-a-vitesse-tenue": "position", "deux-fois-plus-vite": "vitesse", "deux-fois-plus-serre": "rayon", "gaz-ou-frein": "pilotage", libre: "pilotage,position,rayon,vitesse" };
  const fautes = [];
  for (const e of descripteur.etapes) if ([...e.controles].sort().join(",") !== attendu[e.id]) fautes.push(`${e.id} ouvre [${e.controles.join(",")}]`);
  juger("fuite-inter-etapes", fautes.length === 0, `table du §7.6 : ${fautes.length ? fautes.join(" ; ") : "chaque réglage n'ouvre qu'à SON étape, aucun n'est hérité — le réglage de S5 (12,0 ; freinage) est inatteignable avant S5"}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(cv.width - 3, cv.height - 3, 1, 1).data; return [d[0], d[1], d[2]]; });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}

// ── La frontière sait-elle rougir, FORME PAR FORME ? (essai rouge seulement) ──
if (ESSAI && pret) {
  const muettes = [];
  for (const [nom, , exemple] of FORMES) {
    await panneau.evaluate((el, x) => { const s = document.createElement("span"); s.setAttribute("data-sonde", ""); s.textContent = ` ${x} `; el.querySelector("[data-lectures], [data-notes]")?.appendChild(s); }, exemple);
    const t = await panneau.evaluate((el) => el.innerText);
    if (!FORMES.some(([n, re]) => n === nom && re.test(t))) muettes.push(nom);
    await panneau.evaluate((el) => el.querySelectorAll("[data-sonde]").forEach((s) => s.remove()));
  }
  noter("frontiere-sondes", muettes.length === 0, `${FORMES.length} formes injectées une à une dans le panneau : ${muettes.length ? `MUETTES : ${muettes.join(", ")}` : "chacune vue par sa sonde"}`);
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Sans mouvement (prefers-reduced-motion) : la course CALCULE sans animer —
//    la moto passe de −9,0 m à B d'un coup, aucune position intermédiaire. ──
{
  const nav3 = await lancer();
  try {
    const ctx3 = await nav3.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const p3 = await ctx3.newPage();
    await p3.bringToFront();
    await p3.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
    await p3.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    const q = p3.locator(`[data-scene="${SCENE}"]`);
    await q.scrollIntoViewIfNeeded();
    await p3.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
    await q.getByRole("button", { name: OUVRIR }).click();
    await p3.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"]`, { timeout: 40000 }).catch(() => {});
    await q.locator("[data-pari-choix] li button").first().click();
    await p3.waitForTimeout(150);
    const vus = await q.evaluate(async (el) => {
      const ls = new Set();
      el.querySelector("[data-lancer]").click();
      const t0 = performance.now();
      while (performance.now() - t0 < 1500) {
        await new Promise((r) => requestAnimationFrame(r));
        ls.add(el.getAttribute("data-l-m"));
        if (el.getAttribute("data-course") === "finie" && performance.now() - t0 > 400) break;
      }
      return { ls: [...ls], finie: el.getAttribute("data-course") === "finie" };
    });
    const intermediaires = vus.ls.filter((l) => l !== "-9.000" && l !== "0.000");
    juger("sans-mouvement", vus.finie && intermediaires.length === 0, `mouvement réduit demandé : course ${vus.finie ? "finie" : "PAS finie"} en moins de 1,5 s ; positions vues [${vus.ls.join(", ")}] — ${intermediaires.length ? "des positions INTERMÉDIAIRES" : "aucune position intermédiaire"}`);
  } finally {
    await nav3.close();
  }
}

// ── Au téléphone (390 px) : les étiquettes se lisent aux cinq étapes ──
{
  const nav2 = await lancer();
  try {
    const ctx2 = await nav2.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
    const p2 = await ctx2.newPage();
    await p2.bringToFront();
    await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
    await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    const q = p2.locator(`[data-scene="${SCENE}"]`);
    await q.scrollIntoViewIfNeeded();
    await p2.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
    await q.getByRole("button", { name: OUVRIR }).click();
    await p2.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"]`, { timeout: 40000 }).catch(() => {});
    const justes = ["vers-le-centre", "quatre-fois", "double", "bascule-vers-lavant", "retarde-8-49"];
    for (let k = 0; k < 5; k++) {
      const e = descripteur.etapes[k];
      await q.locator("[data-pari-choix] li button").nth(e.pari.choix.findIndex((c) => c.id === justes[k])).click();
      await p2.waitForTimeout(150);
      await q.locator("[data-image-finale]").click();
      await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 10000 }).catch(() => {});
      await p2.waitForTimeout(250);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q);
      if (k === 0) {
        for (const rep of ["milieu", "sortie"]) { await q.locator(`[data-controle="position"] input[value="${rep}"]`).check(); await p2.waitForTimeout(150); await etiquettesLisibles(`390 px, étape 1, ${rep}`, q); }
      }
      if (k < 4) { await q.getByRole("button", { name: "Étape suivante" }).click(); await p2.waitForTimeout(200); }
    }
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune ; la course de l'étape 1) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR, course: 0 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-tremplin : le tremplin circulaire (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "course", "eclairs", "sans-mouvement", "nombres", "fleches-a-l-echelle", "normale-vers-le-centre", "droite-sans-normale", "composition", "tangente-vraie", "arc-de-cercle", "echelle-constante", "unitaires-constants", "signe-du-produit", "palette", "formule-graduee", "fuite-inter-etapes", "frontiere", "latex", "etiquettes", "cadre", "immobile", "annonce", "ergonomie"];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  const muettes = visees.filter((f) => !crient.includes(f));
  const sondes = resultats.find((r) => r.famille === "frontiere-sondes");
  if (sondes && !sondes.ok) { console.error(`  ✘ ${sondes.detail}`); process.exit(1); }
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille sabotée rougit ; chaque forme de la frontière est vue.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
