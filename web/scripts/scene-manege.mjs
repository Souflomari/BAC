#!/usr/bin/env node
/**
 * scene-manege.mjs — la scène 3D « le manège » dit-elle VRAI ?
 *
 * Sixième scène de première partie (pc/rotation-axe-fixe, R2 ; ADR 0041 ;
 * spec : content/pc/rotation-axe-fixe/spec-scene-manege.md §10). Même principe
 * que les cinq autres : le RENDU RÉEL (next start, Chromium en WebGL par
 * SwiftShader), jamais le code — et le panneau trouvé par SON nom
 * (`[data-scene="manege-rotation"]`), jamais par `[data-scene]` seul.
 *
 *   1. RIEN AVANT LE CLIC — `window.__THREE__` indéfini tant que la scène est
 *      fermée.
 *   2. LES NOMBRES, recalculés ICI par une SECONDE voie, depuis les seules
 *      constantes de la leçon (M = 60, R = 1,50, m = 25, F = 30, g = 9,8,
 *      t = 4,0) — aucun module du produit importé : J(r) = ½MR² + 2mr² ;
 *      M = F × r ; le « 0,0 » du poids et de la poussée radiale, à TOUTES les
 *      distances (égalité de chaîne) ; m g d = 367,5 axe basculé ;
 *      θ̈ = M / J (3 décimales : 0,625 et non 0,63) ; ω(4,0), θ(4,0) ; la fiche
 *      des deux points (v = d ω, s = d θ) ; le point de passage de R1.
 *   3. LES PIXELS, dans les deux sens (spec §10.2) :
 *        ne-tourne-pas — poids (et radiale) : 4,0 s de course, l'image ne
 *          bouge pas d'un pixel ; tangentielle : elle bouge ;
 *        angle-mesure — vu du dessus, le rayon peint a tourné de 286° (sièges
 *          à 0,30 m) et de 115° (à 1,50 m), à ±2° ; les deux diffèrent ;
 *        axe-bascule — la roue : le siège DESCEND de 90° ; axe vertical, même
 *          poids : il ne bouge pas ;
 *        poids-vu-de-dessus — de côté, la flèche du poids est une longue
 *          verticale ; du dessus, elle s'écrase (en fractions du rayon, jamais
 *          en pixels absolus) ;
 *        bras-de-levier — axe basculé : le segment raccourcit et disparaît ;
 *          poids et axe vertical : AUCUN segment (le dessiner serait
 *          enseigner l'erreur).
 *      Chaque mesure lue sur les repères du produit est VÉRIFIÉE aux pixels
 *      (l'encre ou l'accent est bien peint entre eux).
 *   4. LES PARIS, 5. AVANT LE PARI RIEN NE RÉPOND (ni lecture, ni fiche, ni
 *      bouton de course, ni pixel d'accent en chrominance, ni issue dans la
 *      description), 6. LES ÉTAPES, 7. LA FRONTIÈRE (spec §9 : ni moment
 *      cinétique, ni ∧, ni période, amplitude, pseudo…), 8. AUCUN LaTeX brut ;
 *      9. AUCUNE ÉTAPE NE RÉPOND À UN PARI SUIVANT (ce qu'une étape révélée
 *      ouvre n'atteint pas l'état qu'un pari suivant fait deviner) ;
 *      10. LES ÉTIQUETTES SE LISENT (ni chevauchées, ni barrées par la flèche,
 *      le bras ou le rayon peint, ni hors du cadre ; la trace dit ce qui a
 *      changé) — ces deux-là nées de la revue des captures du 2026-09-24 ;
 *      + thème, console, sans WebGL, et la famille ERGONOMIE partagée.
 *
 * QUATRE VERDICTS (ADR 0034) : sans WebGL au banc, MUET — en échec.
 * `--essai-rouge` retourne l'attente de chaque famille — dont les
 * misconceptions mêmes de la spec : J sans le disque (67,5 oublié), et le
 * poids qui tournerait (M = d × F).
 *
 *   node scripts/scene-manege.mjs --porte
 *   node scripts/scene-manege.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_MANEGE ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/rotation-axe-fixe";
const SCENE = "manege-rotation";

// ── La seconde voie : les constantes de la LEÇON, rien du produit ─────────
const MD = 60, R = 1.5, m = 25, F = 30, g = 9.8, T = 4.0;
/** J(r), deux enfants. L'essai rouge oublie le disque (spec §10.4, 3). */
const J = (r, n = 2) => (ESSAI ? 0 : 0.5 * MD * R * R) + n * m * r * r;
const thetaPP = (bras, r) => (F * bras) / J(r);
const omega = (bras, r, t = T) => thetaPP(bras, r) * t;
const theta = (bras, r, t = T) => 0.5 * thetaPP(bras, r) * t * t;
const deg = (x) => (x * 180) / Math.PI;

/** Le DERNIER nombre d'un texte : « 45,0 N·m » → 45 ; « 5,0 rad (286°) » → 286. */
function nombres(texte) {
  return [...(texte ?? "").replace(/−/g, "-").replace(/[\s  ]/g, "").matchAll(/-?\d+(?:,\d+)?/g)].map((x) => parseFloat(x[0].replace(",", ".")));
}
const premier = (t) => nombres(t)[0] ?? NaN;
const arrondi = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
/** Le nombre AFFICHÉ à d décimales, comparé à la valeur arrondie de la seconde voie. */
const egalA = (lu, x, d) => Math.abs(lu - arrondi(x, d)) <= 10 ** -d / 2 + 1e-9;

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true,
  });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-manege : `next start` n'a pas répondu. Build absent ?");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

// PW_CHROMIUM_PATH d'abord : la CI installe SON Chromium (§11.180).
const lancer = (args) => chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const nav = await lancer(["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]);
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const labo = await ctx.newPage();
await labo.goto("about:blank");
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(`pageerror : ${e.message}`));
page.on("console", (msg) => { if (msg.type() === "error") erreurs.push(`console : ${msg.text()}`); });

const resultats = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/rotation-axe-fixe/media/manege-axe-fixe.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);
const indexJuste = (id) => etapeDesc(id).pari.choix.findIndex((c) => c.juste);

// ── Aller à la scène (le chapitre se lit dans le DOM, par SON nom) ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) {
  console.error(`scene-manege : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`);
  await nav.close();
  process.exit(3);
}
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();

// ── 1. Rien avant le clic ──
const threeAvant = await page.evaluate(() => window.__THREE__ ?? null);
noter("avant-clic", (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0, "scène fermée, aucun canvas");
noter("avant-clic", ESSAI ? threeAvant !== null : threeAvant === null, `window.__THREE__ avant le clic : ${threeAvant ?? "indéfini"}`);
await page.waitForFunction((sc) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, SCENE, { timeout: 40000 }).catch(() => {});
await panneau.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
await page.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
const rendu = (await panneau.getAttribute("data-scene-etat")) === "prete";
noter("avant-clic", (await page.evaluate(() => window.__THREE__ ?? null)) !== null, "window.__THREE__ défini après le clic");

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
async function regler(cle, v) {
  await panneau.locator(`[data-controle="${cle}"] input`).evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, v);
  await deuxImages();
  await page.waitForTimeout(60);
}
const choisir = async (cle, v) => { await panneau.locator(`[data-controle="${cle}"] input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(60); };
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
// Absente, une lecture rend "" TOUT DE SUITE : `textContent()` sur un
// sélecteur vide attendrait son délai de 30 s avant d'échouer.
const lecture = async (cle) => {
  const l = panneau.locator(`[data-lecture="${cle}"]`);
  return (await l.count()) ? espaces(await l.first().textContent().catch(() => "")) : "";
};
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(120));
const vue = (nom) => panneau.getByRole("button", { name: nom }).first().click().then(deuxImages).then(() => page.waitForTimeout(80));
const fiches = () => panneau.locator("[data-fiche]").count();
const nbLectures = () => panneau.locator("[data-lectures], [data-lecture]").count();
const boutonsCourse = () => panneau.locator("[data-lancer]").count();
const descriptionCanvas = async () => (await panneau.locator("canvas").getAttribute("aria-label").catch(() => "")) ?? "";
const ISSUE_DITE = /\bnul|ne tourne pas|N·m|a tourné|367|0,0/;
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(Delta|mathcal|vec|cdot|ddot|dfrac|frac|text|times|pm)\b/g) ?? [];
/**
 * La capture du CANVAS SEUL : les étiquettes HTML posées par-dessus (« 245 N »,
 * « dans le plan de rotation : 0 N »…) sont masquées le temps de la prise —
 * sinon une étiquette qui paraît à la révélation compterait comme « l'image a
 * bougé », et la famille ne-tourne-pas mesurerait du texte.
 */
const capture = async () => {
  await page.addStyleTag({ content: `[data-scene="${SCENE}"] [data-etiquette]{visibility:hidden!important}` }).then((h) => h.evaluate((el) => el.setAttribute("data-capture-nue", "")));
  // Au centre de la fenêtre : près du bord haut, le header collant passerait
  // DEVANT le canvas et entrerait dans la capture (premier passage : 1 128 px
  // « changés » entre deux images d'un manège immobile).
  await panneau.locator("canvas").evaluate((el) => el.scrollIntoView({ block: "center" }));
  await deuxImages();
  const b64 = (await panneau.locator("canvas").screenshot()).toString("base64");
  await page.evaluate(() => document.querySelectorAll("style[data-capture-nue]").forEach((e) => e.remove()));
  return b64;
};
const etiquetteVisible = (nom) => panneau.evaluate((el, n) => {
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  return e ? getComputedStyle(e).visibility === "visible" : null;
}, nom);
/** La position (dans le canvas) d'un repère posé par le produit. */
const repere = (nom) => panneau.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const r = el.querySelector(`[data-etiquette="${n}"]`).getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top };
}, nom);
const tempsLu = async () => parseFloat((await attr("data-t")) ?? "NaN");

/** La course : on la lance, et on attend qu'elle finisse (ou l'instant `pauseA`, puis pause). */
async function courir({ pauseA = null } = {}) {
  const b = panneau.locator("[data-lancer]");
  await b.click();
  if (pauseA !== null) {
    await page.waitForFunction(([sc, t]) => parseFloat(document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-t") ?? "0") >= t, [SCENE, pauseA], { timeout: 20000 }).catch(() => {});
    await b.click();
    await deuxImages();
    await page.waitForTimeout(80);
    return;
  }
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  await deuxImages();
  await page.waitForTimeout(80);
}
/** Le temps et la fiche des deux points, lus d'un seul coup (le DOM est commité d'un bloc). */
const instantane = () => panneau.evaluate((el) => {
  const n = (t) => { const m = (t ?? "").replace(/−/g, "-").replace(/\s/g, "").match(/-?\d+(?:,\d+)?/); return m ? parseFloat(m[0].replace(",", ".")) : NaN; };
  const v = (cle, c) => n(el.querySelector(`[data-point="${cle}"] [${c}]`)?.textContent);
  return { t: parseFloat(el.getAttribute("data-t") ?? "NaN"), phase: el.getAttribute("data-pari"), fiche: !!el.querySelector('[data-point="siege"]'), vS: v("siege", "data-v"), vB: v("bord", "data-v"), sS: v("siege", "data-s"), sB: v("bord", "data-s") };
});
const auDepart = () => panneau.getByRole("button", { name: "Ramener le manège au repos" }).click().then(deuxImages);

const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");
const surface = await jetonCouleur("--figure-surface");

/**
 * L'image, en comptes : `pur` (accent pur) ; `teinte` (chrominance dans la
 * direction de l'accent — en CHROMINANCE, pas en luminance : un gris plus
 * sombre n'est pas un accent) ; `dessin` (tout ce qui n'est pas le fond).
 */
async function lireImage(b64) {
  return labo.evaluate(async ({ b64, accent, surface }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const chroma = (p) => { const mm = (p[0] + p[1] + p[2]) / 3; return [p[0] - mm, p[1] - mm, p[2] - mm]; };
    const ca = chroma(accent), na = Math.hypot(...ca);
    let pur = 0, teinte = 0, dessin = 0;
    for (let i = 0; i < d.length; i += 4) {
      const v = [d[i] - surface[0], d[i + 1] - surface[1], d[i + 2] - surface[2]];
      if (Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2]) > 24) dessin++;
      if (Math.abs(d[i] - accent[0]) + Math.abs(d[i + 1] - accent[1]) + Math.abs(d[i + 2] - accent[2]) < 60) pur++;
      const cp = chroma([d[i], d[i + 1], d[i + 2]]), nc = Math.hypot(...cp);
      if (nc > 12 && (cp[0] * ca[0] + cp[1] * ca[1] + cp[2] * ca[2]) / (nc * na) > 0.85) teinte++;
    }
    return { pur, teinte, dessin, n: d.length / 4 };
  }, { b64, accent, surface });
}

/** Combien de pixels diffèrent entre deux images (somme des écarts > 40). */
async function difference(a, b) {
  return labo.evaluate(async ({ a, b }) => {
    const lire = async (s) => {
      const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${s}`)).blob());
      const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
      return x.getImageData(0, 0, img.width, img.height).data;
    };
    const [da, db] = [await lire(a), await lire(b)];
    let n = 0;
    for (let i = 0; i < Math.min(da.length, db.length); i += 4)
      if (Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]) > 40) n++;
    return n;
  }, { a, b });
}

/**
 * La part des points d'un segment (du canvas) peints en ENCRE (plus sombres
 * que le fond de 60 au moins) ou en ACCENT (chrominance d'accent) — la
 * vérification, aux pixels, de ce que les repères du produit affirment.
 */
async function peintEntre(b64, p, q, mode = "encre") {
  return labo.evaluate(async ({ b64, p, q, mode, accent, surface }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const chroma = (px) => { const mm = (px[0] + px[1] + px[2]) / 3; return [px[0] - mm, px[1] - mm, px[2] - mm]; };
    const ca = chroma(accent), na = Math.hypot(...ca);
    const lum = (r, gg, b) => 0.2126 * r + 0.7152 * gg + 0.0722 * b;
    const ls = lum(...surface);
    let ok = 0, tot = 0;
    for (let k = 1; k < 40; k++) {
      const t = k / 40;
      const cx = p.x + (q.x - p.x) * t, cy = p.y + (q.y - p.y) * t;
      // Le point, ou l'un de ses voisins à 2 px près (un trait de 2 à 3 px).
      let vu = false;
      for (let dy = -2; dy <= 2 && !vu; dy++) for (let dx = -2; dx <= 2 && !vu; dx++) {
        const X = Math.round(cx + dx), Y = Math.round(cy + dy);
        if (X < 0 || Y < 0 || X >= img.width || Y >= img.height) continue;
        const i = (Y * img.width + X) * 4;
        if (mode === "encre") vu = ls - lum(d[i], d[i + 1], d[i + 2]) > 60;
        else {
          const cp = chroma([d[i], d[i + 1], d[i + 2]]), nc = Math.hypot(...cp);
          vu = nc > 12 && (cp[0] * ca[0] + cp[1] * ca[1] + cp[2] * ca[2]) / (nc * na) > 0.85;
        }
      }
      tot++; if (vu) ok++;
    }
    return ok / tot;
  }, { b64, p, q, mode, accent, surface });
}

/** L'angle (°) du segment centre → point, à l'écran, dans le sens trigonométrique (y vers le haut). */
const angleEcran = (c, p) => (Math.atan2(-(p.y - c.y), p.x - c.x) * 180) / Math.PI;
const tourne = (a0, a1) => ((a1 - a0) % 360 + 360) % 360;

/** 5. Avant le pari : ni lecture, ni fiche, ni bouton de course, ni accent, ni issue dite. */
async function avantPari(ou) {
  const f = await fiches(), l = await nbLectures(), b = await boutonsCourse(), desc = await descriptionCanvas();
  const img = rendu ? await lireImage(await capture()) : { pur: 0, teinte: 0 };
  const bras = await etiquetteVisible("bras"), trace = await etiquetteVisible("trace"), comp = await etiquetteVisible("composante");
  const muet = f === 0 && l === 0 && b === 0 && img.pur === 0 && img.teinte < 40 && !ISSUE_DITE.test(desc) && desc.length > 0 && bras !== true && trace !== true && comp !== true;
  noter("avant-pari", ESSAI ? !muet : muet,
    `${ou}, avant le pari : fiche ${f ? "AFFICHÉE" : "absente"}, lectures ${l ? "PRÉSENTES" : "absentes"}, bouton de course ${b ? "PRÉSENT" : "absent"}, ${img.pur} px d'accent pur, ${img.teinte} px teintés, bras ${bras ? "VISIBLE" : "absent"}, description « ${desc.slice(0, 80)}${desc.length > 80 ? "…" : ""} »`);
}
/** 7. La frontière : aucune des chaînes interdites du §9 dans le panneau. */
const INTERDITS = /moment cinétique|produit vectoriel|∧|\\wedge|période|pseudo|amplitude|harmonique|isochron|T₀|T_0|∫|\\int/i;
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const m = t.match(INTERDITS);
  noter("frontiere", ESSAI ? !!m : !m, `${ou} : ${m ? `« ${m[0]} » AFFICHÉ` : "aucune chaîne interdite (moment cinétique, ∧, période, amplitude…)"}`);
}
/**
 * 9. AUCUNE ÉTAPE NE RÉPOND À UN PARI SUIVANT (2026-09-24). L'étape 3 ouvrait
 * le curseur des sièges : en le poussant à 1,50 m et en relançant, on lisait
 * ω = 1,0 rad/s — la réponse exacte du pari de l'étape 4, une étape AVANT
 * qu'il soit posé (et sa « suite » affirmait « l'angle non plus » : faux, J
 * change avec les sièges). Aucune famille ne le voyait : chacune regardait
 * SON étape. Un réglage est le seul chemin vers un état ; ce qu'une étape
 * révélée ouvre ne doit pas atteindre l'état qu'un pari SUIVANT fait deviner.
 *   - les sièges (`distance`) répondent au pari de l'étape 4 ;
 *   - la poussée (`bras`) départage le pari de l'étape 5 (« tout près »
 *     contre « enfants près », à sièges égaux).
 * La table est écrite ICI, contre le descripteur : c'est un jugement sur ce
 * que chaque pari demande, pas une copie de la liste des contrôles.
 */
const REPOND_A = { distance: "repartition", bras: "libre" };
async function sansFuite(idEtape) {
  const ordre = descripteur.etapes.map((e) => e.id);
  const ici = ordre.indexOf(idEtape);
  const ouverts = (await controles()).split(",").filter(Boolean);
  const fuites = ouverts.filter((c) => REPOND_A[c] && ordre.indexOf(REPOND_A[c]) > ici);
  noter("fuite-inter-etapes", ESSAI ? fuites.length > 0 : fuites.length === 0,
    `étape ${idEtape} révélée : contrôles [${ouverts.join(",")}]${fuites.length ? ` — ${fuites.map((c) => `« ${c} » atteint l'état que devine le pari de l'étape ${REPOND_A[c]}`).join(" ; ")}` : " — aucun n'atteint l'état d'un pari suivant"}`);
}

/**
 * 10. LES ÉTIQUETTES SE LISENT (2026-09-24). Vue du dessus — celle que le
 * retour du pari de l'étape 1 demande —, « 245 N » et « dans le plan de
 * rotation : 0 N » tombaient sur le même point ; de côté, « 245 N » était
 * barré par sa propre flèche. Mesuré sur le RENDU : deux étiquettes de texte
 * visibles ne se chevauchent pas, aucune ne sort du canvas, et aucune n'est
 * traversée par la flèche, le bras de levier ou le rayon peint — segments lus
 * sur les repères SANS texte que le produit pose à leurs bouts. Le test de
 * traversée est écrit ici une seconde fois (Liang–Barsky), rien n'est importé.
 */
function traverse(a, b, r) {
  let t0 = 0, t1 = 1;
  const dx = b.x - a.x, dy = b.y - a.y;
  const p = [-dx, dx, -dy, dy], q = [a.x - r.x0, r.x1 - a.x, a.y - r.y0, r.y1 - a.y];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) { if (q[i] < 0) return false; continue; }
    const t = q[i] / p[i];
    if (p[i] < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
  }
  return true;
}
async function etiquettesLisibles(ou, q = panneau, pg = page) {
  await pg.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  const { textes, segs, larg, haut } = await q.evaluate((el) => {
    const cv = el.querySelector("canvas").getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - cv.left, y0: b.top - cv.top, x1: b.right - cv.left, y1: b.bottom - cv.top }; };
    const vis = (e) => e && getComputedStyle(e).visibility === "visible";
    const point = (n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); if (!vis(e)) return null; const b = boite(e); return { x: (b.x0 + b.x1) / 2, y: (b.y0 + b.y1) / 2 }; };
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => vis(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), ...boite(e) }));
    const segs = [["la flèche", point("queue"), point("pointe")], ["le bras de levier", point("bras-pied"), point("bras-bout")], ["le rayon peint", point("centre"), point("repere")]].filter(([, a, b]) => a && b);
    return { textes, segs, larg: cv.width, haut: cv.height };
  });
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » sort du canvas`);
    for (let j = i + 1; j < textes.length; j++) {
      const b = textes[j];
      if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`);
    }
    // La boîte réduite d'un pixel : un trait qui l'effleure ne la barre pas.
    const r = { x0: a.x0 + 1, y0: a.y0 + 1, x1: a.x1 - 1, y1: a.y1 - 1 };
    for (const [nom, p, q] of segs) if (traverse(p, q, r)) fautes.push(`« ${a.nom} » barrée par ${nom}`);
  }
  noter("etiquettes", ESSAI ? fautes.length > 0 : fautes.length === 0,
    `${ou} : ${textes.length} étiquette(s) de texte visibles (${textes.map((t) => t.nom).join(", ")})${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni barrées, dans le cadre"}`);
}

/** L'état posé par l'étape (spec §11, table des états). */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { force: await attr("data-force"), axe: await attr("data-axe"), r: parseFloat(await attr("data-r-sieges")), p: parseFloat(await attr("data-r-poussee")), o: await attr("data-occupants"), v: await attr("data-vue"), pari: await attr("data-pari"), ctl: await controles() };
  const ok = lu.force === e.force && lu.axe === e.axe && Math.abs(lu.r - e.r_sieges) < 1e-9 && Math.abs(lu.p - e.r_poussee) < 1e-9 && lu.o === e.occupants && lu.v === e.vue && lu.pari === "attente" && lu.ctl === "";
  noter("etapes", ESSAI ? !ok : ok, `étape ${id} : force ${lu.force}, axe ${lu.axe}, sièges ${lu.r} m, poussée ${lu.p} m, ${lu.o}, vue ${lu.v}, phase « ${lu.pari} », contrôles [${lu.ctl}]`);
}

// ═══ Étape 1 : le poids, parallèle à l'axe ═══════════════════════════════
await etatPose("poids-parallele");
await avantPari("étape 1 (le poids)");
{
  // Le poids, vu DE CÔTÉ (la vue d'ouverture) : une longue verticale.
  const c = await repere("centre"), rep = await repere("repere"), q = await repere("queue"), p = await repere("pointe");
  const rayonPx = Math.abs(rep.x - c.x);
  const haut = Math.abs(p.y - q.y), large = Math.abs(p.x - q.x);
  const img = rendu ? await capture() : null;
  const peint = img ? await peintEntre(img, q, p, "encre") : 0;
  const okCote = haut > 1.4 * rayonPx && large < 0.1 * rayonPx && peint > 0.8;
  noter("poids-vu-de-dessus", ESSAI ? !okCote : okCote, `de côté : flèche du poids ${haut.toFixed(0)} px de haut pour ${large.toFixed(0)} px de large (rayon du disque ${rayonPx.toFixed(0)} px, soit ${(haut / rayonPx).toFixed(2)} R), peinte à l'encre sur ${(peint * 100).toFixed(0)} % de sa longueur`);
  await vue("Du dessus");
  const c2 = await repere("centre"), rep2 = await repere("repere"), q2 = await repere("queue"), p2 = await repere("pointe");
  const r2 = Math.hypot(rep2.x - c2.x, rep2.y - c2.y);
  const l2 = Math.hypot(p2.x - q2.x, p2.y - q2.y);
  const okDessus = l2 < 0.25 * r2;
  noter("poids-vu-de-dessus", ESSAI ? !okDessus : okDessus, `du dessus : la même flèche ne mesure plus que ${l2.toFixed(0)} px, ${(l2 / r2).toFixed(2)} R — elle se réduit à un point, parallèle à l'axe`);
  await vue("De côté");
}
// Un pari FAUX : « 1,50 × 245 = 367,5 ».
await parier(indexDe("poids-parallele", "dF"));
{
  const ph = await attr("data-pari"), b = await boutonsCourse(), l = await nbLectures();
  noter("paris", ESSAI ? ph !== "note" : ph === "note" && b === 1 && l === 0, `étape 1, pari posé : phase « ${ph} », bouton de course ${b ? "présent" : "ABSENT"}, lectures ${l ? "PRÉSENTES trop tôt" : "encore absentes"} — la scène répond d'abord`);
  const img0 = rendu ? await capture() : null;
  const a = rendu ? await lireImage(img0) : { pur: 1 };
  noter("avant-pari", ESSAI ? a.pur === 0 : a.pur > 0, `étape 1, après le pari : ${a.pur} px d'accent pur (la droite d'action du poids)`);
  const brasVu = await etiquetteVisible("bras-pied");
  noter("bras-de-levier", ESSAI ? brasVu === true : brasVu !== true, `poids, axe vertical : ${brasVu ? "un segment de bras de levier est DESSINÉ" : "aucun segment de bras de levier (le dessiner enseignerait l'erreur)"}`);
  // La course entière : 4,0 s, et l'image ne bouge pas d'un pixel.
  const rep0 = await repere("repere");
  await courir();
  const fin = await tempsLu();
  const img1 = rendu ? await capture() : null;
  const diff = rendu ? await difference(img0, img1) : 0;
  const rep1 = await repere("repere");
  const bouge = Math.hypot(rep1.x - rep0.x, rep1.y - rep0.y);
  const ok = diff < 60 && bouge < 1;
  noter("ne-tourne-pas", ESSAI ? !ok : ok, `poids, 4,0 s de course (t lu ${fin} s) : ${diff} px ont changé, le bout du rayon peint a bougé de ${bouge.toFixed(1)} px`);
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 1, verdict après la course : « ${res} »`);
  const mom = await lecture("moment"), ang = await lecture("angle");
  const okN = mom === (ESSAI ? "367,5 N·m" : "0,0 N·m") && premier(ang) === 0;
  noter("nombres", okN, `poids, axe vertical : moment lu « ${mom} » (attendu, par égalité de chaîne, « 0,0 N·m ») ; angle « ${ang} »`);
  noter("etapes", (await controles()) === "force", `étape 1 révélée : contrôles [${await controles()}]`);
  const comp = await etiquetteVisible("composante");
  noter("avant-pari", ESSAI ? comp !== true : comp === true, `étape 1 révélée : « dans le plan de rotation : 0 N » ${comp ? "affiché" : "ABSENT"}`);
  await sansFuite("poids-parallele");
  // Les trois vues du poids révélé — « Du dessus » est celle que le retour du
  // pari demande, et celle où les deux étiquettes tombaient au même point.
  for (const nom of ["De côté", "Du dessus", "De biais"]) {
    await vue(nom);
    await etiquettesLisibles(`étape 1 révélée, le poids, vue « ${nom} »`);
  }
  await vue("De côté");
  // La radiale : elle non plus ne fait rien. La tangentielle : il part.
  await choisir("force", "radiale");
  const imgR0 = rendu ? await capture() : null;
  await courir();
  const imgR1 = rendu ? await capture() : null;
  const dR = rendu ? await difference(imgR0, imgR1) : 0;
  const momR = await lecture("moment");
  noter("ne-tourne-pas", ESSAI ? dR >= 60 : dR < 60 && momR === "0,0 N·m", `radiale, 4,0 s : ${dR} px ont changé ; moment lu « ${momR} »`);
  await choisir("force", "tangentielle");
  const imgT0 = rendu ? await capture() : null;
  await courir();
  const imgT1 = rendu ? await capture() : null;
  const dT = rendu ? await difference(imgT0, imgT1) : 0;
  const momT = await lecture("moment");
  noter("ne-tourne-pas", ESSAI ? dT < 2000 : dT > 2000 && egalA(premier(momT), F * R, 1), `tangentielle, 4,0 s : ${dT} px ont changé — il part ; moment lu « ${momT} » (attendu ${(F * R).toFixed(1)})`);
  // La trace de l'essai précédent dit ce qui a CHANGÉ (la force), pas un
  // réglage resté le même (elle disait « sièges à 1,50 m » — capture du
  // 2026-09-24) ; et de côté, où tout s'aplatit sur le disque, rien ne se
  // chevauche.
  const txtTrace = espaces(await panneau.locator('[data-etiquette="trace"]').textContent().catch(() => ""));
  const okTrace = /radiale/.test(txtTrace) && !/sièges/.test(txtTrace);
  noter("etiquettes", ESSAI ? !okTrace : okTrace, `étape 1, la radiale puis la tangentielle : la trace dit « ${txtTrace} » (attendu : la force de l'essai précédent, et elle seule)`);
  for (const nom of ["De côté", "Du dessus"]) {
    await vue(nom);
    await etiquettesLisibles(`étape 1, la tangentielle après la radiale, vue « ${nom} »`);
  }
  await frontiere("étape 1 révélée");
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 1 révélée : ${brut} fragment(s) de LaTeX brut`);
}

// ═══ Étape 2 : l'axe basculé ═════════════════════════════════════════════
await suivant();
await etatPose("axe-bascule");
await avantPari("étape 2 (l'axe basculé)");
await parier(indexJuste("axe-bascule"));
{
  await vue("De côté"); // l'axe pointe vers cette caméra : la roue de face
  const img0 = rendu ? await capture() : null;
  const s0 = await repere("siege"), c0 = await repere("centre");
  const pied = await repere("bras-pied"), bout = await repere("bras-bout");
  const long0 = Math.hypot(bout.x - pied.x, bout.y - pied.y);
  const brasPeint = img0 ? await peintEntre(img0, pied, bout, "accent") : 1;
  const rayonPx = Math.hypot(s0.x - c0.x, s0.y - c0.y);
  const mom0 = await lecture("moment").catch(() => "");
  await etiquettesLisibles("étape 2, pari posé, siège à l'horizontale, vue « De côté »");
  // La course : le siège descend ; le bras de levier fond.
  const longueurs = [long0];
  const b = panneau.locator("[data-lancer]");
  await b.click();
  for (let k = 0; k < 40; k++) {
    await page.waitForTimeout(60);
    const vis = await etiquetteVisible("bras-pied");
    if (!vis) { longueurs.push(0); break; }
    const [pp, bb] = [await repere("bras-pied"), await repere("bras-bout")];
    longueurs.push(Math.hypot(bb.x - pp.x, bb.y - pp.y));
    if ((await attr("data-course-finie")) === "oui") break;
  }
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  await deuxImages();
  // La dernière longueur, relue une fois la course finie (l'échantillon pris
  // dans la boucle peut dater de l'image d'avant : 15 px au premier passage).
  longueurs.push((await etiquetteVisible("bras-pied")) ? await (async () => { const [pp, bb] = [await repere("bras-pied"), await repere("bras-bout")]; return Math.hypot(bb.x - pp.x, bb.y - pp.y); })() : 0);
  const s1 = await repere("siege");
  const descendu = s1.y - s0.y;
  const a = tourne(angleEcran(c0, s1), angleEcran(c0, s0));
  const tFin = await tempsLu();
  const okB = descendu > 0.8 * rayonPx && Math.abs(a - 90) <= 2;
  noter("axe-bascule", ESSAI ? !okB : okB, `axe horizontal : le siège est descendu de ${descendu.toFixed(0)} px (rayon ${rayonPx.toFixed(0)} px), la roue a tourné de ${a.toFixed(1)}° (attendu 90 ± 2°), arrêtée à t = ${tFin} s — à l'équilibre`);
  const monotone = longueurs.every((x, i) => i === 0 || x <= longueurs[i - 1] + 0.5);
  const finBras = longueurs[longueurs.length - 1];
  const okL = long0 > 0.8 * rayonPx && brasPeint > 0.7 && monotone && finBras < 0.02 * rayonPx;
  noter("bras-de-levier", ESSAI ? !okL : okL, `axe horizontal : bras de levier ${long0.toFixed(0)} px au départ (peint à l'accent sur ${(brasPeint * 100).toFixed(0)} %), puis ${longueurs.slice(1, 6).map((x) => x.toFixed(0)).join(", ")}… ${monotone ? "décroissant" : "NON MONOTONE"}, ${finBras.toFixed(1)} px à la fin`);
  // À l'équilibre, la lecture garde le moment AU LÂCHER à côté du courant
  // (critique pédagogique B1 : le verdict ne tombe pas sur le « 0,0 » du
  // mauvais pari sans le 367,5 de la bonne réponse).
  const momF = await lecture("moment");
  const nF = nombres(momF);
  // Avant la révélation, aucune lecture n'existe (c'est le contrat) : le
  // moment au lâcher se lit dans la lecture à deux valeurs, après la course.
  const okM = mom0 === "" && egalA(nF[0], ESSAI ? 245 : m * g * R, 1) && /équilibre : 0,0 N·m$/.test(momF);
  noter("nombres", okM, `axe basculé : aucune lecture avant la révélation (« ${mom0} ») ; à l'équilibre « ${momF} » (attendu au lâcher m g d = ${(m * g * R).toFixed(1)}, puis 0,0)`);
  // La frontière du chapitre 7 (spec §9.4), tenue par l'instrument : axe
  // basculé, aucune vitesse angulaire, aucune accélération angulaire, aucune
  // durée à l'écran — la course est une rotation, pas une oscillation.
  const texteB = await panneau.evaluate((el) => el.innerText);
  const fuite = texteB.match(/ω|θ̈|rad\/s|rad·s⁻²|\d+,\d+\s?s\b/);
  noter("frontiere", ESSAI ? !!fuite : !fuite, `axe basculé, course finie : ${fuite ? `« ${fuite[0]} » AFFICHÉ` : "ni ω, ni θ̈, ni durée à l'écran"}`);
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste : « ${res} »`);
  noter("etapes", (await controles()) === "axe", `étape 2 révélée : contrôles [${await controles()}]`);
  await sansFuite("axe-bascule");
  await etiquettesLisibles("étape 2 révélée, à l'équilibre, vue « De côté »");
  // L'autre sens : axe vertical, le même poids, il ne bouge pas.
  await choisir("axe", "vertical");
  await vue("De côté");
  const sv0 = await repere("siege");
  const iv0 = rendu ? await capture() : null;
  await courir();
  const sv1 = await repere("siege");
  const iv1 = rendu ? await capture() : null;
  const dv = rendu ? await difference(iv0, iv1) : 0;
  const bougeV = Math.hypot(sv1.x - sv0.x, sv1.y - sv0.y);
  const momV = await lecture("moment");
  const immobile = bougeV < 1 && dv < 60;
  noter("axe-bascule", ESSAI ? !immobile : immobile, `axe vertical, même poids, 4,0 s : le siège a bougé de ${bougeV.toFixed(1)} px, ${dv} px ont changé ; moment lu « ${momV} »`);
  await frontiere("étape 2 révélée");
}

// ═══ Étape 3 : deux points, un seul angle ════════════════════════════════
await suivant();
await etatPose("deux-points");
await avantPari("étape 3 (deux points)");
await parier(indexJuste("deux-points"));
{
  // Pendant la course, avant la fin : le verdict attend, la fiche n'existe pas.
  await panneau.locator("[data-lancer]").click();
  await page.waitForFunction((sc) => parseFloat(document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-t") ?? "0") >= 1, SCENE, { timeout: 20000 }).catch(() => {});
  const pendant = await instantane();
  noter("paris", pendant.t < 4 && pendant.phase === "note" && !pendant.fiche, `étape 3, à t = ${pendant.t} s (course en cours) : phase « ${pendant.phase} », fiche des points ${pendant.fiche ? "DÉJÀ LÀ" : "pas encore"} — le verdict attend la course entière`);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  await deuxImages();
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 3, pari juste : « ${res} »`);
  const wF = omega(R, 0.3), thF = theta(R, 0.3);
  const lus = await instantane();
  const okP = egalA(lus.vS, 0.3 * wF, 2) && egalA(lus.vB, R * wF, 2) && egalA(lus.sS, 0.3 * thF, 2) && egalA(lus.sB, R * thF, 2);
  noter("nombres", okP, `fin de course (t = ${lus.t} s), sièges à 0,30 m : v = ${lus.vS} / ${lus.vB} m/s, s = ${lus.sS} / ${lus.sB} m (attendu ${(0.3 * wF).toFixed(2)} / ${(R * wF).toFixed(2)} et ${(0.3 * thF).toFixed(2)} / ${(R * thF).toFixed(2)})`);
  // Le point de passage de R1, relu PENDANT une seconde course : chaque
  // instantané doit tomber sur v = d θ̈ t AU TEMPS QU'IL PORTE, et celui qui
  // passe au plus près de 3,2 s est rapporté (0,60 et 3,00 m/s à 3,2 s pile).
  await auDepart();
  await panneau.locator("[data-lancer]").click();
  // Jusqu'à la fin de la COURSE, pas pour un nombre fixe de tours : le temps
  // simulé avance d'au plus 0,25 s par image (plafond du produit, contre les
  // sauts au retour d'un onglet), donc plus lentement que la montre quand un
  // banc chargé ne rend que quelques images par seconde.
  const vus = [];
  const debut = Date.now();
  while (Date.now() - debut < 40000) {
    const x = await instantane();
    vus.push(x);
    if (x.t >= 3.95) break;
    await page.waitForTimeout(40);
  }
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  const utiles = vus.filter((x) => x.t > 0.2 && x.t < 4);
  const fausses = utiles.filter((x) => !(egalA(x.vS, 0.3 * omega(R, 0.3, x.t), 2) && egalA(x.vB, R * omega(R, 0.3, x.t), 2)));
  const proche = utiles.reduce((a, x) => (!a || Math.abs(x.t - 3.2) < Math.abs(a.t - 3.2) ? x : a), null);
  noter("nombres", utiles.length >= 5 && fausses.length === 0,
    `pendant la course : ${utiles.length} instantanés, ${fausses.length} où la fiche s'écarte de v = d θ̈ t ; le plus proche de 3,2 s : t = ${proche?.t} s, v = ${proche?.vS} / ${proche?.vB} m/s (à 3,2 s pile : 0,60 et 3,00, les nombres de R1)`);
  noter("etapes", (await controles()) === "instant", `étape 3 révélée : contrôles [${await controles()}]`);
  // L'INSTANT (2026-09-24) — le curseur qui remplace celui des sièges : la
  // MÊME course, parcourue à la main. À t = 3,2 s pile, la fiche affiche les
  // deux vitesses de R1 — par égalité de CHAÎNE avec la seconde voie ; et à
  // chaque instant essayé, le temps posé est celui demandé, les quatre
  // nombres tombent sur v = d θ̈ t et s = ½ d θ̈ t², et le bord a parcouru
  // cinq fois le chemin du siège (le même angle, deux distances).
  {
    const chaine = (x) => `${arrondi(x, 2).toFixed(2).replace(".", ",")} m/s`;
    const faux = [];
    let chaines = null;
    for (const t of [0.8, 2.0, 3.2, 4.0]) {
      await regler("instant", t);
      const x = await instantane();
      const vTxt = await panneau.evaluate((el) => [...el.querySelectorAll("[data-point] [data-v]")].map((e) => (e.textContent ?? "").replace(/[\s  ]+/g, " ").trim()));
      const bons = Math.abs(x.t - t) < 1e-9 &&
        egalA(x.vS, 0.3 * omega(R, 0.3, t), 2) && egalA(x.vB, R * omega(R, 0.3, t), 2) &&
        egalA(x.sS, 0.3 * theta(R, 0.3, t), 2) && egalA(x.sB, R * theta(R, 0.3, t), 2) &&
        Math.abs(x.sB - 5 * x.sS) <= 0.05;
      if (!bons) faux.push(`t = ${t} : lu t = ${x.t}, v = ${x.vS} / ${x.vB}, s = ${x.sS} / ${x.sB}`);
      if (t === 3.2) chaines = vTxt;
    }
    const attendu = [chaine(0.3 * omega(R, 0.3, 3.2)), chaine(R * omega(R, 0.3, 3.2))];
    noter("nombres", faux.length === 0 && chaines?.[0] === attendu[0] && chaines?.[1] === attendu[1],
      `l'instant, posé à 0,8 · 2,0 · 3,2 · 4,0 s : ${faux.length ? faux.join(" ; ") : "les quatre nombres de la fiche tombent juste à chaque fois, le bord à cinq fois le chemin du siège"} ; à 3,2 s, la fiche affiche « ${chaines?.join(" » et « ")} » (attendu « ${attendu.join(" » et « ")} », les nombres de R1)`);
  }
  await sansFuite("deux-points");
  await frontiere("étape 3 révélée");
}

// ═══ Étape 4 : la répartition — et les angles, lus aux pixels ════════════
await suivant();
await etatPose("repartition");
await avantPari("étape 4 (la répartition)");
await parier(indexJuste("repartition"));
{
  const mesurer = async (r) => {
    // Avant la révélation, le contrôle n'existe pas (c'est le contrat) : le
    // premier essai court sur l'état que l'étape pose, 1,50 m.
    if (await panneau.locator('[data-controle="distance"] input').count()) await regler("distance", r);
    else if (Math.abs(parseFloat(await attr("data-r-sieges")) - r) > 1e-9) throw new Error(`sièges à ${await attr("data-r-sieges")} m, contrôle absent : impossible de régler ${r} m`);
    await vue("Du dessus");
    const c = await repere("centre"), a0 = await repere("repere");
    await courir();
    const a1 = await repere("repere");
    const img = rendu ? await capture() : null;
    const peint = img ? await peintEntre(img, c, a1, "encre") : 1;
    return { a: tourne(angleEcran(c, a0), angleEcran(c, a1)), peint, w: await lecture("omega"), th: await lecture("angle"), J: await lecture("inertie") };
  };
  const loin = await mesurer(1.5);
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 4, pari juste : « ${res} »`);
  const pres = await mesurer(0.3);
  const attLoin = deg(theta(R, 1.5)), attPres = deg(theta(R, 0.3));
  const okA = Math.abs(loin.a - attLoin) <= 2 && Math.abs(pres.a - attPres) <= 2 && loin.peint > 0.8 && pres.peint > 0.8;
  noter("angle-mesure", okA, `vu du dessus, le rayon peint a tourné de ${pres.a.toFixed(1)}° (sièges 0,30 m ; attendu ${attPres.toFixed(1)}°) et de ${loin.a.toFixed(1)}° (1,50 m ; attendu ${attLoin.toFixed(1)}°), peint à l'encre sur ${(pres.peint * 100).toFixed(0)} % / ${(loin.peint * 100).toFixed(0)} %`);
  noter("angle-mesure", ESSAI ? Math.abs(pres.a - loin.a) < 100 : Math.abs(pres.a - loin.a) >= 100, `les deux angles diffèrent de ${Math.abs(pres.a - loin.a).toFixed(0)}° (une scène qui ignorerait J les rendrait égaux)`);
  const traceVue = await etiquetteVisible("trace");
  noter("etapes", traceVue === true, `après deux essais, la trace pointillée de l'essai précédent est ${traceVue ? "posée, étiquetée" : "ABSENTE"}`);
  const okN = egalA(premier(loin.w), omega(R, 1.5), 1) && egalA(premier(pres.w), omega(R, 0.3), 1) &&
    egalA(premier(loin.th), theta(R, 1.5), 1) && egalA(premier(pres.th), theta(R, 0.3), 1) &&
    egalA(nombres(loin.J).at(-1), J(1.5), 1) && egalA(nombres(pres.J).at(-1), J(0.3), 1);
  noter("nombres", okN, `ω(4,0) lu ${loin.w} / ${pres.w}, θ lu ${loin.th} / ${pres.th}, J lu « ${loin.J} » / « ${pres.J} » (attendu ${omega(R, 1.5).toFixed(1)} / ${omega(R, 0.3).toFixed(1)} rad/s, ${theta(R, 1.5).toFixed(1)} / ${theta(R, 0.3).toFixed(1)} rad, J ${J(1.5).toFixed(1)} / ${J(0.3).toFixed(1)})`);
  noter("etapes", (await controles()) === "distance", `étape 4 révélée : contrôles [${await controles()}]`);
  await sansFuite("repartition");
  // La trace dit ce qui a changé : les sièges, et leur ancienne place.
  const txtTrace4 = espaces(await panneau.locator('[data-etiquette="trace"]').textContent().catch(() => ""));
  const okT4 = txtTrace4 === "essai précédent : sièges à 1,50 m";
  noter("etiquettes", ESSAI ? !okT4 : okT4, `étape 4, sièges ramenés de 1,50 m à 0,30 m : la trace dit « ${txtTrace4} »`);
  await etiquettesLisibles("étape 4 révélée, deux essais, vue « Du dessus »");
  await frontiere("étape 4 révélée");
}

// ═══ Étape 5 : libre — les trois réglages, et le zéro partout ════════════
await suivant();
await etatPose("libre");
await avantPari("étape 5 (libre)");
await parier(indexDe("libre", "tout-au-bord"));
{
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 5, pari faux (tout au bord) : « ${res} » — verdict immédiat, puis les contrôles s'ouvrent`);
  noter("etapes", (await controles()) === "bras,distance,force", `étape 5 révélée : contrôles [${await controles()}]`);
  await sansFuite("libre");
  for (const nom of ["De biais", "Du dessus", "De côté"]) {
    await vue(nom);
    await etiquettesLisibles(`étape 5 révélée, la tangentielle au bord, vue « ${nom} »`);
  }
  await vue("De biais");
  // J(r) sur une grille : ½MR² + 2mr², recomposé ici.
  for (const r of [0.1, 0.3, 0.8, 1.5]) {
    await regler("distance", r);
    const lu = await lecture("inertie");
    noter("nombres", egalA(nombres(lu).at(-1), J(r), 1), `J pour r = ${r} m : « ${lu} » (attendu ${J(r).toFixed(1)})`);
  }
  // Les trois réglages du pari : θ̈ à 3 décimales (0,625, pas 0,63).
  for (const [r, p] of [[0.3, 1.5], [1.5, 1.5], [0.3, 0.2]]) {
    await regler("distance", r);
    await regler("bras", p);
    const [mo, ac] = [await lecture("moment"), await lecture("acceleration")];
    noter("nombres", egalA(premier(mo), F * p, 1) && egalA(premier(ac), thetaPP(p, r), 3),
      `sièges ${r} m, poussée ${p} m : moment « ${mo} », θ̈ « ${ac} » (attendu ${(F * p).toFixed(1)} N·m et ${thetaPP(p, r).toFixed(3)} rad·s⁻²)`);
  }
  // Le troisième réglage, couru : ω et θ à 4,0 s.
  await courir();
  const [w3, th3] = [await lecture("omega"), await lecture("angle")];
  noter("nombres", egalA(premier(w3), omega(0.2, 0.3), 1) && egalA(premier(th3), theta(0.2, 0.3), 1) && Math.abs(nombres(th3)[1] - Math.round(deg(theta(0.2, 0.3)))) <= 1,
    `sièges 0,30 m, poussée 0,20 m, 4,0 s : ω « ${w3} », θ « ${th3} » (attendu ${omega(0.2, 0.3).toFixed(1)} rad/s, ${theta(0.2, 0.3).toFixed(1)} rad, ${Math.round(deg(theta(0.2, 0.3)))}°)`);
  // Le ZÉRO : le poids et la radiale, à toutes les distances — égalité de chaîne.
  let zeros = 0, vus = 0;
  const faux = [];
  for (const f of ["poids", "radiale"]) {
    await choisir("force", f);
    for (const r of [0.1, 0.8, 1.5]) for (const p of [0.2, 0.9, 1.5]) {
      await regler("distance", r);
      await regler("bras", p);
      const mo = await lecture("moment");
      vus++;
      if (mo === "0,0 N·m") zeros++; else faux.push(`${f} r=${r} p=${p} : « ${mo} »`);
    }
  }
  noter("nombres", ESSAI ? zeros !== vus : zeros === vus, `le poids (axe vertical) et la poussée radiale : « 0,0 N·m » dans ${zeros} réglages sur ${vus}${faux.length ? ` — ${faux.slice(0, 2).join(" · ")}` : ""}`);
  await frontiere("étape 5 révélée");
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 5 révélée : ${brut} fragment(s) de LaTeX brut`);
  // Les trois vues, au clavier comme à la souris.
  const vuesOk = [];
  for (const [nom, cle] of [["Du dessus", "dessus"], ["De biais", "biais"], ["De côté", "cote"]]) {
    await panneau.getByRole("button", { name: nom }).first().focus();
    await page.keyboard.press("Enter");
    await deuxImages();
    vuesOk.push((await attr("data-vue")) === cle);
  }
  noter("clavier", vuesOk.every(Boolean), `les trois vues au clavier (Entrée) : ${vuesOk.map((x) => (x ? "✓" : "✗")).join(" ")}`);
}

// Le thème sombre repeint le fond.
if (rendu) {
  const fond = async () => labo.evaluate(async (b64) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data; const n = new Map();
    for (let i = 0; i < d.length; i += 4) { const k = (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]; n.set(k, (n.get(k) ?? 0) + 1); }
    const [k] = [...n].sort((a, b) => b[1] - a[1])[0]; return [(k >> 16) & 255, (k >> 8) & 255, k & 255];
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

// ── Sans WebGL : l'état honnête, les paris, la course et les calculs ──
{
  const nav2 = await lancer(["--disable-webgl", "--disable-3d-apis"]);
  const p2 = await (await nav2.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
  await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const q = p2.locator(`[data-scene="${SCENE}"]`);
  await q.scrollIntoViewIfNeeded();
  await p2.waitForFunction((sc) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, SCENE, { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p2.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
  const etat2 = await q.getAttribute("data-scene-etat");
  const message = await q.getByText("WebGL indisponible", { exact: false }).count();
  await q.locator("[data-pari-choix] li button").nth(indexJuste("poids-parallele")).click().catch(() => {});
  await q.locator("[data-lancer]").click().catch(() => {});
  await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  await p2.waitForTimeout(150);
  const mo = espaces(await q.locator('[data-lecture="moment"]').textContent().catch(() => ""));
  noter("sans-webgl", etat2 === (ESSAI ? "prete" : "sans-webgl") && message === 1 && mo === "0,0 N·m",
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"} ; pari, course et calcul restent : moment lu « ${mo} »`);
  await nav2.close();
}

// ── Les étiquettes au téléphone (390 px) : un cadre deux fois plus étroit,
// où « dans le plan de rotation : 0 N » et « essai précédent : … » tiennent
// à peine — c'est là que la disposition a le moins de place. ──
{
  const nav3 = await lancer(["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"]);
  const p3 = await (await nav3.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
  await p3.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
  await p3.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const q = p3.locator(`[data-scene="${SCENE}"]`);
  await q.scrollIntoViewIfNeeded();
  await p3.waitForFunction((sc) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, SCENE, { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p3.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"]`, { timeout: 40000 }).catch(() => {});
  const finCourse = async () => {
    await q.locator("[data-lancer]").click();
    await p3.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 20000 }).catch(() => {});
  };
  const vueP = (nom) => q.getByRole("button", { name: nom }).first().click();
  await q.locator("[data-pari-choix] li button").nth(indexDe("poids-parallele", "dF")).click();
  await finCourse();
  for (const nom of ["De côté", "Du dessus", "De biais"]) {
    await vueP(nom);
    await etiquettesLisibles(`téléphone, étape 1 révélée, le poids, vue « ${nom} »`, q, p3);
  }
  await q.locator('[data-controle="force"] input[value="radiale"]').check();
  await finCourse();
  await q.locator('[data-controle="force"] input[value="tangentielle"]').check();
  await finCourse();
  for (const nom of ["De côté", "Du dessus", "De biais"]) {
    await vueP(nom);
    await etiquettesLisibles(`téléphone, étape 1, la tangentielle après la radiale, vue « ${nom} »`, q, p3);
  }
  await nav3.close();
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (revue du 2026-09-24) ──
await ergonomie({ lancer, url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, course: 0 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-manege : le manège (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!rendu) {
  console.error("\nMUET — WebGL n'a pas dessiné ici : la porte ne peut rien dire des pixels, elle ne sera pas verte.");
  process.exit(3);
}
if (ESSAI) {
  const visees = ["avant-clic", "nombres", "ne-tourne-pas", "angle-mesure", "axe-bascule", "poids-vu-de-dessus", "bras-de-levier", "etapes", "paris", "avant-pari", "frontiere", "latex", "sans-webgl", "ergonomie", "fuite-inter-etapes", "etiquettes"];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  if (crient.length !== visees.length) {
    console.error("  ✘ une famille sabotée reste VERTE : cette partie de la porte ne sait pas rougir.");
    process.exit(1);
  }
  console.log("  ✔ chaque famille sabotée rougit.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
