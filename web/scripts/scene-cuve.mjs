#!/usr/bin/env node
/**
 * scene-cuve.mjs — la cuve à ondes dit-elle VRAI ?
 *
 * Le manipulable 2D de pc/ondes-mecaniques-periodiques, R5 (spec :
 * content/pc/ondes-mecaniques-periodiques/spec-scene-cuve.md §11 ; ADR 0041).
 * Même principe que les six portes de scène : le RENDU RÉEL (next start,
 * Chromium), jamais le code — et le panneau trouvé par SON nom
 * (`[data-scene="cuve-a-ondes"]`).
 *
 * UNE RÈGLE NEUVE (spec §11.1). Une simulation ne se recalcule pas par une
 * seconde implémentation : un second solveur, avec les mêmes approximations,
 * ne prouverait rien de plus ; avec d'autres, il donnerait d'autres chiffres.
 * La seconde voie établit donc des INVARIANTS que le champ doit satisfaire
 * quelle que soit sa numérique, mesurés sur le rendu avec les constantes de la
 * spec (c = 0,20 m/s, grille 0,5 mm, quatre fréquences), sans importer aucun
 * module du produit :
 *   I1-I2 λ = c/f et la comparaison a/λ, lues par ÉGALITÉ DE CHAÎNE ;
 *   I3    la grille exacte : a et λ en nombre ENTIER de cellules, partout ;
 *   I4-I5 λ mesurée sur l'eau : la même devant et derrière la paroi (< 2 %),
 *         juste (< 3 % de c/f) et PAS égale au bit près à c/f (une mesure,
 *         pas un écho du réglage) ;
 *   I6    la fréquence au flotteur, la même avant et après la paroi ;
 *   I8    à λ fixée, l'amplitude à 60° CROÎT quand l'ouverture se referme ;
 *   I9    à ouverture fixée, elle CROÎT quand λ s'allonge — les deux phrases
 *         du chapitre, mesurées ;
 *   I10   la symétrie du profil ; I11 les bords absorbent (reflet < 10 %, > 0).
 * Et la porte a le droit de MESURER ce que le produit n'a pas le droit
 * d'ENSEIGNER (spec §9.1) : elle lit des amplitudes angulaires, le produit
 * n'affiche aucune largeur angulaire.
 *
 * Ce qu'elle ne mesure PAS, écrit à côté (ADR 0035) : la monotonie GLOBALE en
 * a/λ — deux réglages de même rapport ne donnent pas le même profil dans une
 * cuve de taille finie (champ proche), et la scène ne le prétend pas.
 *
 * QUATRE VERDICTS (ADR 0034). `--essai-rouge` retourne l'attente de chaque
 * famille — dont une célérité fausse dans la seconde voie (0,25 m/s).
 *
 *   node scripts/scene-cuve.mjs --porte
 *   node scripts/scene-cuve.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie, listes } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_CUVE ?? 3800 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/ondes-mecaniques-periodiques";
const SCENE = "cuve-a-ondes";
const OUVRIR = "Ouvrir la cuve à ondes";

// ── La seconde voie : les constantes de la SPEC, rien du produit ──────────
const C_CM_S = ESSAI ? 25 : 20; // cm/s — l'essai rouge se trompe de célérité
const DX_CM = 0.05;
const lambda = (f) => C_CM_S / f;
const virgule = (x, d) => x.toFixed(d).replace(".", ",");
const cmTexte = (x) => `${virgule(x, 2)} cm`;
function comparaison(a, f) {
  const r = a / lambda(f);
  const entier = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  const deuxCS = (x) => { const d = Math.max(0, 1 - Math.floor(Math.log10(Math.abs(x)))); return virgule(Number(x.toPrecision(2)), d); };
  if (Math.abs(r - 1) < 1e-9) return "a = λ";
  if (r > 1) return entier(r) ? `a = ${Math.round(r)}λ` : `a = ${deuxCS(r)}λ`;
  return entier(1 / r) ? `a = λ/${Math.round(1 / r)}` : `a = ${deuxCS(r)}λ`;
}

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("scene-cuve : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const lancer = (args = []) => chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const nav = await lancer();
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(15000);
const labo = await ctx.newPage();
await labo.goto("about:blank");
// La page MESURÉE au premier plan : un onglet d'arrière-plan reçoit environ une
// image par seconde, et la cuve calcule par image — la course de 2 s y durait
// plus de 90 s (premier passage de cette porte, 2026-09-24).
await page.bringToFront();
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(`pageerror : ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") erreurs.push(`console : ${m.text()}`); });

const resultats = [];
const avertissements = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/ondes-mecaniques-periodiques/media/cuve-a-ondes.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);
const indexJuste = (id) => etapeDesc(id).pari.choix.findIndex((c) => c.juste);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-cuve : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();

// ── 1. Rien avant le clic ; 2. pas de 3D, même ouvert ──
{
  // (le premier essai rouge l'a trouvée verte : elle ne retournait pas son attente)
  const ferme = (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0;
  noter("avant-clic", ESSAI ? !ferme : ferme, "panneau fermé, aucun canvas");
}
await page.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
await panneau.getByRole("button", { name: OUVRIR }).click();
await page.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
const pret = (await panneau.getAttribute("data-scene-etat")) === "prete";
const trois = await page.evaluate(() => window.__THREE__ ?? null);
const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
noter("pas-de-3d", ESSAI ? trois !== null || !deuxD : trois === null && deuxD, `panneau OUVERT : window.__THREE__ ${trois ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
const lecture = async (cle) => { const l = panneau.locator(`[data-lecture="${cle}"]`); return (await l.count()) ? espaces(await l.first().textContent().catch(() => "")) : ""; };
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(150));
async function regler(cle, v) {
  await panneau.locator(`[data-controle="${cle}"] input`).evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, v);
  await deuxImages();
}
const choisirF = async (f) => { await panneau.locator(`[data-controle="frequence"] input[value="${f}"]`).check(); await deuxImages(); };
/**
 * Une course entière (et son balayage, s'il y en a un) ; la durée est celle du
 * produit, ralenti compris. `pendant`, s'il est donné, tourne quand la cuve est
 * pleine (t ≥ 0,9 s de cuve), la course encore en marche.
 */
async function courir(pendant) {
  await panneau.locator("[data-lancer]").click();
  if (pendant) {
    await page.waitForFunction((sc) => parseFloat(document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-t") ?? "0") >= 0.9, SCENE, { timeout: 60000 }).catch(() => {});
    await pendant();
  }
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 90000 }).catch(() => {});
  await deuxImages();
  // le fondu du pâle au contraste d'étude (450 ms) : on lit l'image d'étude, pas le fondu
  await page.waitForTimeout(600);
  const f = parseFloat((await attr("data-facteur-temps")) ?? "1");
  if (f < 0.95) avertissements.push(`facteur de temps ${f} : la machine n'a pas suivi le ralenti ×5`);
}
const nombre = (t) => { const m = (t ?? "").replace(/−/g, "-").replace(/\s/g, "").match(/-?\d+(?:,\d+)?/); return m ? parseFloat(m[0].replace(",", ".")) : NaN; };
const profil = async () => ((await attr("data-profil")) ?? "").split(",").map(Number);
const ANGLES = Array.from({ length: 25 }, (_, k) => -60 + 5 * k);
const aAngle = (p, a) => p[ANGLES.indexOf(a)];
const repere = (nom) => panneau.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const r = el.querySelector(`[data-etiquette="${n}"]`)?.getBoundingClientRect();
  return r && getComputedStyle(el.querySelector(`[data-etiquette="${n}"]`)).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
const capture = async () => {
  await page.addStyleTag({ content: `[data-scene="${SCENE}"] [data-etiquette]{visibility:hidden!important}` }).then((h) => h.evaluate((el) => el.setAttribute("data-capture-nue", "")));
  await panneau.locator("canvas").evaluate((el) => el.scrollIntoView({ block: "center" }));
  await deuxImages();
  const b64 = (await panneau.locator("canvas").screenshot()).toString("base64");
  await page.evaluate(() => document.querySelectorAll("style[data-capture-nue]").forEach((e) => e.remove()));
  return b64;
};
const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");
const surface = await jetonCouleur("--figure-surface");

/** Dans une image : pixels d'accent (chrominance), et pixels « agités » (≠ fond) dans un rectangle. */
async function lireImage(b64, rect = null) {
  return labo.evaluate(async ({ b64, accent, surface, rect }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const chroma = (p) => { const m = (p[0] + p[1] + p[2]) / 3; return [p[0] - m, p[1] - m, p[2] - m]; };
    const ca = chroma(accent), na = Math.hypot(...ca);
    let teinte = 0, agites = 0, vus = 0, ecart = 0;
    const ls = 0.2126 * surface[0] + 0.7152 * surface[1] + 0.0722 * surface[2];
    for (let y = 0; y < img.height; y++) for (let X = 0; X < img.width; X++) {
      const i = (y * img.width + X) * 4;
      const cp = chroma([d[i], d[i + 1], d[i + 2]]), nc = Math.hypot(...cp);
      if (nc > 12 && (cp[0] * ca[0] + cp[1] * ca[1] + cp[2] * ca[2]) / (nc * na) > 0.85) teinte++;
      if (rect && X >= rect.x0 && X <= rect.x1 && y >= rect.y0 && y <= rect.y1) {
        vus++;
        if (Math.abs(d[i] - surface[0]) + Math.abs(d[i + 1] - surface[1]) + Math.abs(d[i + 2] - surface[2]) > 24) agites++;
        ecart += Math.abs(0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2] - ls);
      }
    }
    return { teinte, agites, vus, contraste: vus ? ecart / vus : 0 };
  }, { b64, accent, surface, rect });
}

/** L'échelle (px par cm) lue sur les repères du crochet de a. */
async function echelle() {
  const [p, q] = [await repere("a-debut"), await repere("a-fin")];
  const a = parseFloat((await attr("data-a-cm")) ?? "NaN");
  return p && q ? Math.abs(q.y - p.y) / a : NaN;
}
/** Le rectangle de l'eau INCIDENTE (entre la règle et la paroi, loin des segments) : plat avant le pari. */
async function eauIncidente() {
  const [r, h] = [await repere("regle"), await repere("ouverture-haut")];
  const k = await echelle();
  if (!r || !h || !Number.isFinite(k)) return null;
  // au-dessus de l'axe seulement : à l'étape 3, le flotteur est posé SUR l'axe,
  // et c'est de l'encre d'instrument, pas de l'eau (premier passage : 72 px)
  return { x0: Math.round(r.x + 1.0 * k), x1: Math.round(h.x - 3.5 * k), y0: Math.round(r.y - 6 * k), y1: Math.round(r.y - 1 * k) };
}
/**
 * L'agitation DERRIÈRE la paroi, à `dx` cm de l'ouverture et `dy` cm hors de
 * l'axe, RAPPORTÉE à celle de l'axe à la même distance : l'écart moyen de
 * luminance au fond, dans un carré d'au moins une longueur d'onde de côté (une
 * image arrêtée peut tomber sur un nœud ; une longueur d'onde entière, non).
 *
 * Un rapport, pas un compte de pixels « différents du fond » : la première
 * version comptait tout pixel à plus de 24 niveaux du fond, et la plus faible
 * ride visible y comptait autant que la crête du couloir — l'ombre d'une
 * ouverture de 8λ sortait « agitée à 91 % ».
 */
async function agitationRelative(dx, dy) {
  const h = await repere("ouverture-haut"), b = await repere("ouverture-bas");
  const k = await echelle();
  if (!h || !b || !Number.isFinite(k)) return null;
  const f = Number(await attr("data-f-hz"));
  const demi = (Math.max(1.2, lambda(f)) / 2) * k;
  const carre = (cx, cy) => ({ x0: Math.round(cx - demi), x1: Math.round(cx + demi), y0: Math.round(cy - demi), y1: Math.round(cy + demi) });
  const b64 = await capture();
  const yc = (h.y + b.y) / 2;
  const ici = await lireImage(b64, carre(h.x + dx * k, yc - dy * k));
  const axe = await lireImage(b64, carre(h.x + dx * k, yc));
  return axe.contraste > 0 ? { rapport: ici.contraste / axe.contraste, ici: ici.contraste, axe: axe.contraste } : null;
}

/**
 * LES ÉCLAIRS (WCAG 2.3.1, niveau A ; revue ergonomie de la vague 2). Pendant
 * une seconde, la porte lit le canvas DU PRODUIT à chaque image et compte, en
 * chaque point, les variations opposées de luminance relative d'au moins 0,10
 * dont la plus sombre est sous 0,80 — la définition du critère. Un point qui
 * « éclaire » plus de trois fois dans la seconde compte ; le verdict est la
 * plus grande part de points qui éclairent dans une fenêtre de 341 × 256 px
 * CSS (le champ visuel de 10° du critère), qui doit rester sous 25 %.
 *
 * La porte ne lit ni `pale`, ni un réglage : elle lit des pixels qui bougent.
 * Née du constat qu'au ralenti ×5, une onde de 40 Hz inversait chaque point
 * huit fois par seconde, sur plus de la moitié d'un champ de 10°.
 */
async function eclairs(dureeMs = 1000, cible = panneau) {
  return cible.evaluate(async (el, duree) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const pas = 3;
    const W = Math.floor(cv.width / pas), H = Math.floor(cv.height / pas);
    const tmp = document.createElement("canvas");
    tmp.width = W;
    tmp.height = H;
    const g = tmp.getContext("2d", { willReadFrequently: true });
    const n = W * H;
    const lut = new Float32Array(256);
    for (let v = 0; v < 256; v++) { const x = v / 255; lut[v] = x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }
    const ext = new Float32Array(n).fill(-1), sens = new Int8Array(n), changes = new Uint16Array(n);
    let images = 0;
    const t0 = performance.now();
    while (performance.now() - t0 < duree) {
      await new Promise((r) => requestAnimationFrame(r));
      g.drawImage(cv, 0, 0, W, H);
      const d = g.getImageData(0, 0, W, H).data;
      for (let k = 0; k < n; k++) {
        const i = 4 * k;
        const L = 0.2126 * lut[d[i]] + 0.7152 * lut[d[i + 1]] + 0.0722 * lut[d[i + 2]];
        const e = ext[k];
        if (e < 0) { ext[k] = L; continue; }
        const dl = L - e;
        if (Math.abs(dl) >= 0.1 && Math.min(L, e) < 0.8 && Math.sign(dl) !== sens[k]) {
          changes[k]++;
          sens[k] = Math.sign(dl);
          ext[k] = L;
        } else if ((sens[k] > 0 && L > e) || (sens[k] < 0 && L < e)) ext[k] = L;
      }
      images++;
    }
    const secondes = (performance.now() - t0) / 1000;
    // un point éclaire s'il fait plus de trois ÉCLAIRS (paires de variations) par seconde
    const eclaire = new Uint8Array(n);
    let maxParS = 0;
    for (let k = 0; k < n; k++) {
      const parS = Math.floor(changes[k] / 2) / secondes;
      if (parS > maxParS) maxParS = parS;
      if (parS > 3) eclaire[k] = 1;
    }
    // la pire fenêtre de 341 × 256 px CSS (bornée au canvas ; son aire, elle, reste pleine)
    const fw = Math.round((341 * dpr) / pas), fh = Math.round((256 * dpr) / pas);
    const I = new Uint32Array((W + 1) * (H + 1));
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) I[(y + 1) * (W + 1) + x + 1] = eclaire[y * W + x] + I[y * (W + 1) + x + 1] + I[(y + 1) * (W + 1) + x] - I[y * (W + 1) + x];
    const somme = (x0, y0, x1, y1) => I[y1 * (W + 1) + x1] - I[y0 * (W + 1) + x1] - I[y1 * (W + 1) + x0] + I[y0 * (W + 1) + x0];
    let pire = 0;
    const lx = Math.min(fw, W), ly = Math.min(fh, H);
    for (let y = 0; y + ly <= H; y += 2) for (let x = 0; x + lx <= W; x += 2) pire = Math.max(pire, somme(x, y, x + lx, y + ly));
    return { images, fraction: pire / (fw * fh), maxParS: Math.round(maxParS * 10) / 10 };
  }, dureeMs);
}

/** 5. Avant le pari : l'eau plate, aucun accent, aucune lecture, aucun bouton de course. */
async function avantPari(ou) {
  const rect = await eauIncidente();
  const img = pret ? await lireImage(await capture(), rect) : { teinte: 0, agites: 0, vus: 1 };
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const b = await panneau.locator("[data-lancer]").count();
  const t = parseFloat((await attr("data-t")) ?? "NaN");
  const plat = img.vus > 0 && img.agites === 0 && img.teinte === 0 && l === 0 && b === 0 && t === 0;
  noter("avant-pari", ESSAI ? !plat : plat, `${ou}, avant le pari : ${img.agites}/${img.vus} px d'eau agités, ${img.teinte} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, bouton de course ${b ? "PRÉSENT" : "absent"}, t = ${t} s`);
}
/** L'état posé par l'étape (spec §12, table des états). */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { a: parseFloat(await attr("data-a-cm")), f: await attr("data-f-hz"), ch: await attr("data-chemin"), ctl: await controles(), ph: await attr("data-pari") };
  const ok = Math.abs(lu.a - e.a_cm) < 1e-9 && lu.f === String(e.f_hz) && lu.ch === e.chemin && lu.ctl === "" && lu.ph === "attente";
  noter("etapes", ESSAI ? !ok : ok, `étape ${id} : a = ${lu.a} cm, f = ${lu.f} Hz, instrument ${lu.ch}, contrôles [${lu.ctl}], phase « ${lu.ph} »`);
}
/** I1-I2 : λ et la comparaison, par égalité de chaîne. */
async function nombresEnonce(ou) {
  const a = parseFloat(await attr("data-a-cm")), f = Number(await attr("data-f-hz"));
  const lam = await lecture("longueur-onde"), comp = await lecture("comparaison");
  const okL = lam === "" || lam === cmTexte(lambda(f));
  const okC = comp === "" || comp === comparaison(a, f);
  noter("nombres", okL && okC && (lam || comp), `${ou} : λ lue « ${lam} » (attendu « ${cmTexte(lambda(f))} »), comparaison « ${comp} » (attendu « ${comparaison(a, f)} »)`);
}
/** Les deux segments de l'énoncé, à la même échelle. */
async function deuxSegments(ou) {
  const [a0, a1, l0, l1] = [await repere("a-debut"), await repere("a-fin"), await repere("lambda-debut"), await repere("lambda-fin")];
  const a = parseFloat(await attr("data-a-cm")), f = Number(await attr("data-f-hz"));
  if (!a0 || !a1 || !l0 || !l1) { noter("deux-segments", false, `${ou} : repères absents`); return; }
  const r = Math.hypot(a1.x - a0.x, a1.y - a0.y) / Math.hypot(l1.x - l0.x, l1.y - l0.y);
  const attendu = a / lambda(f);
  const ok = Math.abs(r / attendu - 1) < 0.02;
  noter("deux-segments", ok, `${ou} : crochet de a / règle de λ = ${r.toFixed(3)} en pixels (attendu ${attendu.toFixed(3)})`);
}
/**
 * 7. La frontière : aucune chaîne interdite, nulle part dans le panneau ; et,
 * dans ce que la cuve CALCULE ou AFFICHE d'elle-même (lectures, étiquettes,
 * légendes, commandes), aucun angle que le récepteur ne lit pas — la scène ne
 * donne aucune largeur angulaire en nombre (spec §9.1). Les textes écrits de
 * l'étape (consigne, pari, suite) en sont exclus : ils nomment les positions
 * de l'instrument (« de 0° à 60° »), et validate-content les juge.
 */
const INTERDITS = /θ|\\theta|sin\s*θ|λ\s*\/\s*a\b|demi-largeur|largeur angulaire|Huygens|interf[ée]r|interfrange|Young|coh[ée]rence|Doppler|équation d'onde|équation de propagation|laplacien|∂|réfraction|dB\b|décibel/i;
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const m = t.match(INTERDITS);
  const calcule = await panneau.evaluate((el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll("[data-consigne], [data-pari-bloc], [data-suite]").forEach((e) => e.remove());
    return c.textContent ?? "";
  });
  const deg = [...calcule.matchAll(/([−-]?\d+)\s?°/g)].map((x) => Number(x[1].replace("−", "-")));
  const rec = Number((await attr("data-recepteur-deg")) ?? "NaN");
  const autres = deg.filter((d) => d !== rec);
  const ok = !m && autres.length === 0;
  noter("frontiere", ESSAI ? !ok : ok, `${ou} : ${m ? `« ${m[0]} » AFFICHÉ` : "aucune chaîne interdite"} ; degrés affichés ${deg.length ? `[${[...new Set(deg)].join(", ")}]` : "aucun"} (le récepteur : ${Number.isFinite(rec) ? rec : "—"})`);
}
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(lambda|text|frac|Delta|mathcal)\b/g) ?? [];
/**
 * Une seule ouverture, de la largeur annoncée : sur la colonne de la paroi, lue
 * sur l'eau PLATE (avant le pari — rien d'autre n'y est encré), exactement deux
 * morceaux de mur, et entre eux un intervalle de a × (px/cm) à 2 px près.
 * L'échelle vient du crochet de a ; le mur, des pixels : un crochet juste sur
 * une paroi percée ailleurs, ou deux fois, rougit.
 */
async function uneSeuleOuverture(ou) {
  const h = await repere("ouverture-haut");
  const k = await echelle();
  const a = parseFloat((await attr("data-a-cm")) ?? "NaN");
  const b64 = await capture();
  const morceaux = await labo.evaluate(async ({ b64, x, surface }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const g = c.getContext("2d"); g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, img.width, img.height).data;
    const lum = (i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const ls = 0.2126 * surface[0] + 0.7152 * surface[1] + 0.0722 * surface[2];
    const runs = [];
    let debut = -1;
    for (let y = 0; y < img.height; y++) {
      const encre = Math.abs(ls - lum((y * img.width + Math.round(x)) * 4)) > 80;
      if (encre && debut < 0) debut = y;
      if (!encre && debut >= 0) { runs.push([debut, y - 1]); debut = -1; }
    }
    if (debut >= 0) runs.push([debut, img.height - 1]);
    return runs.filter(([u, v]) => v - u >= 3);
  }, { b64, x: (h?.x ?? 0) + 1.5, surface });
  const trou = morceaux.length === 2 ? morceaux[1][0] - morceaux[0][1] - 1 : NaN;
  const ok = morceaux.length === 2 && Math.abs(trou - a * k) <= 2;
  noter("une-seule-ouverture", ESSAI ? !ok : ok, `${ou} : ${morceaux.length} morceau(x) de mur sur la colonne de la paroi ; ouverture de ${Number.isFinite(trou) ? trou : "?"} px pour a = ${a} cm × ${k.toFixed(2)} px/cm = ${(a * k).toFixed(1)} px`);
}
/** Les étiquettes : ni chevauchées, ni hors du cadre. */
async function etiquettesLisibles(ou) {
  const { textes, larg, haut } = await panneau.evaluate((el) => {
    const cv = el.querySelector("canvas").getBoundingClientRect();
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => getComputedStyle(e).visibility === "visible" && (e.textContent ?? "").trim()).map((e) => { const b = e.getBoundingClientRect(); return { nom: e.getAttribute("data-etiquette"), x0: b.left - cv.left, y0: b.top - cv.top, x1: b.right - cv.left, y1: b.bottom - cv.top }; });
    return { textes, larg: cv.width, haut: cv.height };
  });
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
  }
  noter("etiquettes", ESSAI ? fautes.length > 0 : fautes.length === 0, `${ou} : ${textes.length} étiquette(s) (${textes.map((t) => t.nom).join(", ")})${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, dans le cadre"}`);
}
/** 9. Aucune étape ne répond à un pari suivant (spec §7.6) — la table, écrite ICI. */
const REPOND_A = { frequence: "meme-fente-autre-onde", recepteur: "sur-l-arc" };
async function sansFuite(id) {
  const ordre = descripteur.etapes.map((e) => e.id);
  const ici = ordre.indexOf(id);
  const ouverts = (await controles()).split(",").filter(Boolean);
  const fuites = ouverts.filter((c) => REPOND_A[c] && ordre.indexOf(REPOND_A[c]) > ici);
  // l'état gagnant de l'étape libre (0,50 cm ; 5,0 Hz) exige les DEUX réglages ouverts ensemble
  if (ici < ordre.indexOf("libre") && ouverts.includes("fente") && ouverts.includes("frequence")) fuites.push("fente+frequence");
  noter("fuite-inter-etapes", ESSAI ? fuites.length > 0 : fuites.length === 0, `étape ${id} révélée : contrôles [${ouverts.join(",")}]${fuites.length ? ` — ${fuites.join(", ")} atteint l'état d'un pari suivant` : " — aucun n'atteint l'état d'un pari suivant"}`);
}

// Un parcours qui CASSE (un contrôle absent, une course qui ne finit pas) est
// un rouge, pas une exception : les mesures faites jusque-là s'impriment, et la
// famille « parcours » dit où il s'est arrêté.
try {
// ═══ Étape 1 : une large ouverture ═══════════════════════════════════════
await etatPose("ouverture-large");
await avantPari("étape 1");
await uneSeuleOuverture("étape 1, eau plate");
await deuxSegments("étape 1 (a = 8λ)");
await parier(indexDe("ouverture-large", "etalee"));
{
  const ph = await attr("data-pari");
  noter("paris", ESSAI ? ph !== "note" : ph === "note", `étape 1, pari posé : phase « ${ph} » — la cuve répond d'abord`);
  await courir(async () => {
    const r = await eclairs(1000);
    const ok = r.images >= 20 && r.fraction < 0.25;
    noter("eclairs", ESSAI ? !ok : ok, `40 Hz au ralenti ×5, cuve pleine : ${Math.round(r.fraction * 100)} % d'une fenêtre de 10° éclaire plus de 3 fois par seconde (au plus ${r.maxParS} éclairs/s en un point ; ${r.images} images lues ; attendu < 25 %, WCAG 2.3.1)`);
    // L'eau pâle se DIT, pendant la course qui l'exige — la première, avant le
    // verdict (la vague 2 rangeait la note dans la liste des lectures, masquée
    // jusqu'au verdict : elle ne s'affichait jamais au moment où elle servait).
    const note = await panneau.locator("[data-pale]").isVisible().catch(() => false);
    noter("eclairs", ESSAI ? !note : note, `pendant la première course à 40 Hz, avant le verdict : la note « eau pâle » est ${note ? "affichée" : "ABSENTE"}`);
  });
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 1, verdict après la course : « ${res} »`);
  await nombresEnonce("étape 1 révélée");
  {
    const l = await listes(page, `[data-scene="${SCENE}"]`);
    const ok = l.n > 0 && l.fautes.length === 0;
    noter("ergonomie", ESSAI ? !ok : ok, `étape 1 révélée : ${l.n} liste(s) de lectures, ${l.fautes.length ? `INTRUS : ${l.fautes.slice(0, 3).join(" · ")}` : "rien que des couples terme/valeur"}`);
  }
  const ombre = await agitationRelative(3.0, 5.0);
  const ok = ombre !== null && ombre.axe > 20 && ombre.rapport < 0.25;
  noter("va-tout-droit", ESSAI ? !ok : ok, `a = 8λ : à 3 cm derrière la paroi, l'ombre (5 cm hors de l'axe) est agitée à ${ombre === null ? "?" : Math.round(ombre.rapport * 100)} % de l'axe (écarts moyens ${ombre ? `${ombre.ici.toFixed(1)} / ${ombre.axe.toFixed(1)}` : "?"} niveaux ; attendu < 25 %)`);
  noter("etapes", (await controles()) === "fente", `étape 1 révélée : contrôles [${await controles()}]`);
  await sansFuite("ouverture-large");
  await etiquettesLisibles("étape 1 révélée");
  await frontiere("étape 1 révélée");
  // I3 — la grille exacte, à toutes les positions de l'ouverture
  const pasFaux = [];
  for (let k = 0; k <= 14; k++) {
    const a = 0.5 + 0.25 * k;
    await regler("fente", a);
    const cel = parseFloat((await attr("data-cellules-a")) ?? "NaN");
    if (!(Math.abs(cel - Math.round(cel)) < 1e-9 && Math.abs(cel - a / DX_CM) < 1e-6)) pasFaux.push(`${a} cm → ${cel}`);
  }
  noter("grille-exacte", ESSAI ? pasFaux.length > 0 : pasFaux.length === 0, `les 15 positions de l'ouverture, de 0,50 à 4,00 cm : ${pasFaux.length ? `NON ENTIÈRES — ${pasFaux.join(" ; ")}` : "toutes un nombre entier de cellules de 0,5 mm"}`);
}

// ═══ Étape 2 : la même ouverture, une autre onde ═════════════════════════
await suivant();
await etatPose("meme-fente-autre-onde");
await avantPari("étape 2");
await deuxSegments("étape 2 (a = λ/4)");
await parier(indexJuste("meme-fente-autre-onde"));
{
  // la phase de référence existe, puis la mesure
  await panneau.locator("[data-lancer]").click();
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-phase") === "reference", SCENE, { timeout: 10000 }).catch(() => {});
  const refVue = (await attr("data-phase")) === "reference";
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 90000 }).catch(() => {});
  await deuxImages();
  await page.waitForTimeout(600);
  noter("etapes", refVue, `étape 2 : la course joue d'abord la référence à 40 Hz ${refVue ? "(vue)" : "(ABSENTE)"}`);
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste : « ${res} »`);
  await nombresEnonce("étape 2 révélée");
  const ombre = await agitationRelative(3.0, 5.0);
  const okO = ombre !== null && ombre.rapport > 0.4;
  noter("zone-d-ombre", ESSAI ? !okO : okO, `a = λ/4 : à 3 cm derrière la paroi, 5 cm hors de l'axe — là où l'ombre géométrique serait — l'eau est agitée à ${ombre === null ? "?" : Math.round(ombre.rapport * 100)} % de l'axe (attendu > 40 % : l'onde contourne)`);
  noter("etapes", (await controles()) === "frequence", `étape 2 révélée : contrôles [${await controles()}]`);
  await sansFuite("meme-fente-autre-onde");
  // I3, suite : λ en cellules entières aux quatre crans
  const fausses = [];
  for (const f of [40, 20, 10, 5]) {
    await choisirF(f);
    const cel = parseFloat((await attr("data-cellules-lambda")) ?? "NaN");
    if (!(Math.abs(cel - Math.round(cel)) < 1e-9)) fausses.push(`${f} Hz → ${cel}`);
    await nombresEnonce(`étape 2, ${f} Hz`);
  }
  noter("grille-exacte", ESSAI ? fausses.length > 0 : fausses.length === 0, `les quatre longueurs d'onde : ${fausses.length ? fausses.join(" ; ") : "toutes un nombre entier de cellules"}`);
  await frontiere("étape 2 révélée");
}

// ═══ Étape 3 : ce que l'ouverture ne touche pas ══════════════════════════
await suivant();
await etatPose("ce-qui-ne-change-pas");
await avantPari("étape 3");
await uneSeuleOuverture("étape 3, eau plate");
await parier(indexJuste("ce-qui-ne-change-pas"));
{
  await courir();
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 3, pari juste : « ${res} »`);
  const f = Number(await attr("data-f-hz"));
  const dev = parseFloat((await attr("data-lambda-mesuree-devant")) ?? "NaN"), der = parseFloat((await attr("data-lambda-mesuree-derriere")) ?? "NaN");
  const L = lambda(f);
  const okI4 = Math.abs(dev - der) / L < 0.02;
  const okI5 = Math.abs(dev - L) / L < 0.03 && Math.abs(der - L) / L < 0.03;
  noter("nombres", okI4 && okI5, `λ mesurée sur l'eau : ${dev.toFixed(4)} cm devant, ${der.toFixed(4)} cm derrière (écart ${(Math.abs(dev - der) / L * 100).toFixed(2)} % ; attendu ${L.toFixed(2)} cm à 3 % près)`);
  noter("mesure-pas-echo", ESSAI ? dev === L || der === L : dev !== L && der !== L && Number.isFinite(dev) && Number.isFinite(der), `λ mesurée ≠ c/f au bit près : ${dev} et ${der} contre ${L} — une mesure, pas un écho du réglage`);
  const freqs = [];
  for (const x of [-4, -2, 3, 6, 10]) { await regler("sonde", x); freqs.push(parseFloat((await attr("data-f-sonde")) ?? "NaN")); }
  const okI6 = freqs.every((v) => Math.abs(v - f) / f < 0.01) && freqs.every((v) => v !== f);
  noter("nombres", okI6, `fréquence au flotteur, avant et après la paroi : ${freqs.map((v) => v.toFixed(3)).join(" · ")} Hz (attendu ${f} à 1 % près, et mesurée)`);
  const lu = await lecture("lambda-mesuree");
  noter("nombres", /avant : 2,0 cm · après : 2,0 cm/.test(lu), `lecture affichée « ${lu} » (deux chiffres significatifs : la précision à laquelle la simulation dit vrai)`);
  noter("etapes", (await controles()) === "sonde", `étape 3 révélée : contrôles [${await controles()}]`);
  await sansFuite("ce-qui-ne-change-pas");
  const refl = parseFloat((await attr("data-reflexion-max")) ?? "NaN");
  noter("nombres", refl > 0 && refl < 0.1, `les bords absorbent : reflet ${(refl * 100).toFixed(2)} % de l'onde incidente (attendu > 0 et < 10 %)`);
  await frontiere("étape 3 révélée");
}

// ═══ Étape 4 : le récepteur sur l'arc ════════════════════════════════════
await suivant();
await etatPose("sur-l-arc");
await avantPari("étape 4");
await parier(indexDe("sur-l-arc", "partout-pareil"));
{
  await panneau.locator("[data-lancer]").click();
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-phase") === "balayage", SCENE, { timeout: 90000 }).catch(() => {});
  const debut = (await attr("data-profil-points")) ?? "?";
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 30000 }).catch(() => {});
  await deuxImages();
  const fin = (await attr("data-profil-points")) ?? "?";
  const okP = Number(debut) <= 2 && Number(fin) === 13;
  noter("profil-construit", ESSAI ? !okP : okP, `le profil se construit sous le balayage : ${debut} point(s) au début, ${fin} à la fin (0° à 60°, pas de 5°)`);
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 4, pari faux (partout pareil) : « ${res} »`);
  const p = await profil();
  const sym = ANGLES.filter((a) => a > 0).map((a) => Math.abs(aAngle(p, a) - aAngle(p, -a)));
  noter("nombres", Math.max(...sym) <= 3, `symétrie du profil : écart max ${Math.max(...sym)} points entre +θ et −θ`);
  noter("etapes", (await controles()) === "fente,recepteur", `étape 4 révélée : contrôles [${await controles()}]`);
  await sansFuite("sur-l-arc");
  // I8 — à λ fixée (0,50 cm), l'amplitude à 60° croît quand l'ouverture se referme
  const a60 = [];
  for (const a of [4.0, 2.0, 1.0, 0.5]) { await regler("fente", a); await courir(); a60.push(aAngle(await profil(), 60)); }
  const croit = a60.every((v, i) => i === 0 || v > a60[i - 1]);
  noter("nombres", ESSAI ? !croit : croit, `I8 — à λ = 0,50 cm, amplitude à 60° pour a = 4,0 · 2,0 · 1,0 · 0,50 cm : ${a60.join(" · ")} % (strictement croissante)`);
  await etiquettesLisibles("étape 4 révélée");
  await frontiere("étape 4 révélée");
}

// ═══ Étape 5 : libre ═════════════════════════════════════════════════════
await suivant();
await etatPose("libre");
await avantPari("étape 5");
await parier(indexDe("libre", "tout-grand"));
{
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 5, pari faux (tout grand) : « ${res} » — verdict immédiat`);
  noter("etapes", (await controles()) === "fente,frequence,recepteur", `étape 5 révélée : contrôles [${await controles()}]`);
  // I9 — à ouverture fixée (0,50 cm), l'amplitude à 60° croît quand λ s'allonge
  await regler("fente", 0.5);
  const a60 = [];
  for (const f of [40, 20, 10, 5]) { await choisirF(f); await courir(); a60.push(aAngle(await profil(), 60)); }
  // Le profil est RELATIF (100 % = le maximum sur l'arc, spec §5.4) : une onde
  // qui rayonne déjà presque autant à 60° que droit devant ne peut plus
  // croître — elle SATURE. Exiger une croissance stricte jusqu'au bout ferait
  // rougir la porte sur du bruit de champ proche (l'arc est à 7 cm, moins de
  // deux longueurs d'onde à 5 Hz). Deux conditions, donc : chaque cran croît,
  // sauf entre deux valeurs déjà saturées ; et la variation d'un bout à
  // l'autre est franche (≥ 30 points) — une porte qui accepterait un profil
  // plat saturé partout ne mesurerait plus rien.
  const SATURE = 85;
  const croit = a60.every((v, i) => i === 0 || v > a60[i - 1] || (a60[i - 1] >= SATURE && v >= SATURE)) && a60[a60.length - 1] - a60[0] >= 30;
  noter("nombres", ESSAI ? !croit : croit, `I9 — à a = 0,50 cm, amplitude à 60° pour λ = 0,50 · 1,0 · 2,0 · 4,0 cm : ${a60.join(" · ")} % (croissante jusqu'à saturer, ≥ ${SATURE} %, et ≥ 30 points d'un bout à l'autre)`);
  await regler("recepteur", 60);
  const lu = await lecture("amplitude");
  noter("nombres", nombre(lu) === a60[3], `lecture « ${lu} » au récepteur posé à 60° (le relevé dit ${a60[3]} %)`);
  await frontiere("étape 5 révélée");
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 5 révélée : ${brut} fragment(s) de LaTeX brut`);
}

} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (phase ${await attr("data-phase").catch(() => "?")}, pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = async () => labo.evaluate(async (b64) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    // la marge au-dessus de la cuve, au milieu : un coin du canvas tombe hors du
    // plateau arrondi, sur le fond de la PAGE (premier passage : 247,247,244)
    const d = x.getImageData(Math.floor(img.width / 2), 2, 1, 1).data; return [d[0], d[1], d[2]];
  }, await capture());
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Sans mouvement (prefers-reduced-motion, WCAG 2.3.3) : la cuve CALCULE sans
//    animer — pendant le calcul, l'eau reste plate (aucun éclair), puis l'image
//    finale arrive. Une page neuve, un navigateur neuf, qui demande moins de
//    mouvement. ──
{
  const nav2 = await lancer();
  try {
    const ctx2 = await nav2.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const p2 = await ctx2.newPage();
    await p2.bringToFront();
    await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
    await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    const q = p2.locator(`[data-scene="${SCENE}"]`);
    await q.scrollIntoViewIfNeeded();
    await p2.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
    await q.getByRole("button", { name: OUVRIR }).click();
    await p2.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"]`, { timeout: 40000 }).catch(() => {});
    await q.locator("[data-pari-choix] li button").first().click();
    await q.locator("[data-lancer]").click();
    await p2.waitForTimeout(150);
    const legende = (await q.locator("[role=group][aria-label='La course de la cuve'] p").first().textContent().catch(() => "")) ?? "";
    const r = await eclairs(1000, q);
    await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
    const t = parseFloat((await q.getAttribute("data-t")) ?? "0");
    const ok = /sans animation/.test(legende) && r.maxParS === 0 && t >= 2.0;
    noter("sans-mouvement", ESSAI ? !ok : ok, `mouvement réduit demandé : « ${legende.trim().slice(0, 60)} » ; pendant le calcul, ${r.maxParS} éclair/s au plus en un point (${r.images} images) ; course finie à t = ${t} s`);
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-cuve : la cuve à ondes (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
for (const a of avertissements) console.log(`  ⚠ [performance] ${a}`);
if (!pret) { console.error("\nMUET — la cuve n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "eclairs", "sans-mouvement", "nombres", "va-tout-droit", "zone-d-ombre", "grille-exacte", "mesure-pas-echo", "profil-construit", "une-seule-ouverture", "etapes", "paris", "avant-pari", "frontiere", "latex", "fuite-inter-etapes", "etiquettes", "ergonomie"];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  const muettes = visees.filter((f) => !crient.includes(f));
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille sabotée rougit.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\n${avertissements.length ? "VERT AVEC AVERTISSEMENT" : "VERT"} — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
