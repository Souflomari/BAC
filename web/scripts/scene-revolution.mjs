#!/usr/bin/env node
/**
 * scene-revolution.mjs — la scène 3D « le solide de révolution » dit-elle VRAI ?
 *
 * Cinquième scène de première partie (maths/calcul-integral, R9 ; ADR 0041 ;
 * spec : content/maths/calcul-integral/spec-extension.md §9). Même principe
 * que les quatre autres : le RENDU RÉEL (next start, Chromium en WebGL par
 * SwiftShader), jamais le code.
 *
 *   1. RIEN AVANT LE CLIC — `window.__THREE__` indéfini tant que la scène est
 *      fermée.
 *   2. LES NOMBRES — V = π ∫ f² recalculé ICI par une seconde voie (Simpson sur
 *      f², et non la primitive du produit) pour les trois fonctions ; le rayon
 *      et l'aire de la coupe sur une grille d'abscisses ; la conversion
 *      1 u.v. = k³ cm³ pour k = 1, 2, 3 ; l'aire de la région.
 *   3. LES PIXELS, dans les deux sens (spec §9.5) — vue LE LONG DE L'AXE, la
 *      coupe est un DISQUE PLEIN (ses pixels remplissent π R²) et un CERCLE
 *      (largeur = hauteur au pixel près), du rayon que le produit dit à la même
 *      profondeur ; vue de BIAIS, la même coupe n'est plus un cercle. Le
 *      balayage fait grandir le dessin ; chaque tranche empilée a le rayon de
 *      f en son milieu. (« f double, l'aire quadruple » se juge sur les
 *      NOMBRES : deux coupes ne sont pas à la même distance de l'œil, et la
 *      perspective grossit la plus proche.)
 *   4. LA FRONTIÈRE SExp (spec §3.2, B1) — les tranches s'affichent, elles ne
 *      s'additionnent JAMAIS : aucun Σ, aucune « somme » dans le panneau, et le
 *      volume lu ne dépend pas du nombre de tranches.
 *   5. LES PARIS et 6. AVANT LE PARI, RIEN NE RÉPOND (§11.190) — ni fiche, ni
 *      lectures, ni pixel d'accent, ni issue dans la description, ni cube.
 *   7. LES ÉTAPES — chacune pose son état et n'ouvre que son contrôle.
 *   8. AUCUN LaTeX BRUT dans le panneau ouvert.
 *   (+ clavier, thème sombre, état sans WebGL, aucune erreur console.)
 *
 * QUATRE VERDICTS (ADR 0034) : sans WebGL au banc, MUET — en échec.
 * `--essai-rouge` retourne l'attente de chaque famille — dont la misconception
 * même de la leçon : le rayon non élevé au carré (V = π ∫ f).
 *
 *   node scripts/scene-revolution.mjs --porte
 *   node scripts/scene-revolution.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_REVOLUTION ?? 3900 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/calcul-integral";
const SCENE = "solide-revolution";

// ── La seconde voie : Simpson sur f², jamais la primitive du produit ──────
const FONCTIONS = {
  racine: { f: (x) => Math.sqrt(Math.max(0, x)), a: 0, b: 4 },
  cone: { f: (x) => (2 * x) / 3, a: 0, b: 3 },
  log: { f: (x) => Math.sqrt(Math.max(0, Math.log(x))), a: 1, b: Math.E },
};
function simpson(g, a, b, n = 2000) {
  const h = (b - a) / n;
  let s = g(a) + g(b);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(a + i * h);
  return (s * h) / 3;
}
/** Le volume attendu. L'essai rouge prend la misconception : π ∫ f. */
const volumeAttendu = (id) => {
  const F = FONCTIONS[id];
  return Math.PI * simpson(ESSAI ? F.f : (x) => F.f(x) ** 2, F.a, F.b);
};
const aireAttendue = (id) => simpson(FONCTIONS[id].f, FONCTIONS[id].a, FONCTIONS[id].b);

/** Le DERNIER nombre d'une lecture : « 8π ≈ 25,13 » → 25.13 ; « 1,5 » → 1.5. */
function dernierNombre(texte) {
  const tous = [...(texte ?? "").replace(/−/g, "-").replace(/[\s  ]/g, "").matchAll(/-?\d+(?:,\d+)?/g)];
  return tous.length ? parseFloat(tous[tous.length - 1][0].replace(",", ".")) : NaN;
}
const proche2 = (lu, x) => Math.abs(lu - x) <= 0.005 + 1e-9;

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
    console.error("scene-revolution : `next start` n'a pas répondu. Build absent ?");
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
page.on("console", (m) => { if (m.type() === "error") erreurs.push(`console : ${m.text()}`); });

const resultats = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/calcul-integral/media/solide-de-revolution.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexJuste = (id) => etapeDesc(id).pari.choix.findIndex((c) => c.juste);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller à la scène (le chapitre se lit dans le DOM, par SON nom) ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) {
  console.error(`scene-revolution : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`);
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
const etatOuvert = await panneau.getAttribute("data-scene-etat");
const rendu = etatOuvert === "prete";
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
  await page.waitForTimeout(80);
}
const fonction = async (id) => { await panneau.locator('[data-controle="fonction"] input[type="radio"]').nth(["racine", "cone", "log"].indexOf(id)).check(); await deuxImages(); await page.waitForTimeout(80); };
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
const lecture = async (cle) => espaces(await panneau.locator(`[data-lecture="${cle}"]`).first().textContent().catch(() => ""));
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages);
const vue = (nom) => panneau.getByRole("button", { name: nom }).first().click().then(deuxImages);
const fiches = () => panneau.locator("[data-fiche]").count();
const nbLectures = () => panneau.locator("[data-lectures]").count();
const descriptionCanvas = async () => (await panneau.locator("canvas").getAttribute("aria-label").catch(() => "")) ?? "";
const ISSUE_DITE = /unités de volume|disque plein|cm³ :/;
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(int|pi|sqrt|dfrac|frac|mathrm|text|displaystyle)\b/g) ?? [];
const capture = async () => (await panneau.locator("canvas").screenshot()).toString("base64");
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

const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");
const surface = await jetonCouleur("--figure-surface");

/**
 * Ce que l'image dit, en trois comptes :
 *  - `pur` : les pixels d'ACCENT PUR (le bord et le rayon de la coupe) et leur
 *    boîte ;
 *  - `teinte` : les pixels TEINTÉS d'accent (le disque plein, les tranches) —
 *    un écart au fond qui va dans la direction de l'accent, pas du gris ;
 *  - `dessin` : tout ce qui n'est pas le fond.
 * `centre`/`rayon` (en pixels) restreignent `teinte` à un disque autour d'un
 * repère posé par le produit.
 */
async function lireImage(b64, zone = null) {
  return labo.evaluate(async ({ b64, accent, surface, zone }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    // La TEINTE se lit dans la chrominance (la couleur moins son gris), pas
    // dans l'écart au fond : sur fond clair, n'importe quel gris plus sombre se
    // projette « vers » un accent sombre (premier passage : le solide gris de
    // l'énoncé comptait 78 366 px « teintés » avant le pari). Un pixel est
    // teinté d'accent si sa chrominance va dans la direction de celle de
    // l'accent, et qu'elle est assez forte pour ne pas être du bruit.
    const chroma = (p) => { const m = (p[0] + p[1] + p[2]) / 3; return [p[0] - m, p[1] - m, p[2] - m]; };
    const ca = chroma(accent), na = Math.hypot(...ca);
    let pur = 0, teinte = 0, dessin = 0, xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
    const colonnes = new Map();
    for (let y = 0; y < img.height; y++) for (let px = 0; px < img.width; px++) {
      const i = (y * img.width + px) * 4;
      const v = [d[i] - surface[0], d[i + 1] - surface[1], d[i + 2] - surface[2]];
      if (Math.abs(v[0]) + Math.abs(v[1]) + Math.abs(v[2]) > 24) dessin++;
      if (Math.abs(d[i] - accent[0]) + Math.abs(d[i + 1] - accent[1]) + Math.abs(d[i + 2] - accent[2]) < 60) {
        pur++; xmin = Math.min(xmin, px); xmax = Math.max(xmax, px); ymin = Math.min(ymin, y); ymax = Math.max(ymax, y);
      }
      const cp = chroma([d[i], d[i + 1], d[i + 2]]), nc = Math.hypot(...cp);
      if (nc > 12 && (cp[0] * ca[0] + cp[1] * ca[1] + cp[2] * ca[2]) / (nc * na) > 0.85) {
        if (zone && Math.hypot(px - zone.x, y - zone.y) > zone.r) continue;
        teinte++;
        const col = colonnes.get(px) ?? [Infinity, -Infinity];
        colonnes.set(px, [Math.min(col[0], y), Math.max(col[1], y)]);
      }
    }
    const larg = pur ? xmax - xmin + 1 : 0, haut = pur ? ymax - ymin + 1 : 0;
    // Les colonnes teintées : de gauche à droite, leur hauteur.
    const xs = [...colonnes.keys()].sort((a, b) => a - b);
    return { pur, teinte, dessin, larg, haut, gauche: xs[0] ?? NaN, droite: xs[xs.length - 1] ?? NaN, colonnes: xs.map((k) => [k, colonnes.get(k)[1] - colonnes.get(k)[0] + 1]) };
  }, { b64, accent, surface, zone });
}

/** 6. Avant le pari : ni fiche, ni lectures, ni accent (pur ou teinté), ni issue dite. */
async function avantPari(ou, extra = null) {
  const f = await fiches(), l = await nbLectures(), desc = await descriptionCanvas();
  const img = rendu ? await lireImage(await capture()) : { pur: 0, teinte: 0 };
  const cube = await etiquetteVisible("cube");
  const muet = f === 0 && l === 0 && img.pur === 0 && img.teinte < 40 && !ISSUE_DITE.test(desc) && desc.length > 0 && cube !== true && (extra ? extra.ok : true);
  noter("avant-pari", ESSAI ? !muet : muet,
    `${ou}, avant le pari : fiche ${f ? "AFFICHÉE" : "absente"}, lectures ${l ? "PRÉSENTES" : "absentes"}, ${img.pur} px d'accent pur, ${img.teinte} px teintés, cube ${cube ? "VISIBLE" : "absent"}${extra ? `, ${extra.detail}` : ""}, description « ${desc.slice(0, 90)}${desc.length > 90 ? "…" : ""} »`);
}

// ── Étape 1 : la région tourne ──
{
  const e = { f: await attr("data-fonction"), a: await attr("data-alpha"), pari: await attr("data-pari"), ctl: await controles() };
  const ok = e.f === "racine" && e.a === "0" && e.pari === "attente" && e.ctl === "";
  noter("paris", ESSAI ? !ok : ok, `étape 1 avant le pari : f ${e.f}, balayage ${e.a}°, phase « ${e.pari} », contrôles [${e.ctl}]`);
  await avantPari("étape 1 (le balayage)");
  // Un pari FAUX : « 2π fois l'aire ».
  await parier(indexDe("balayage", "2pi_aire"));
  const apres = { pari: await attr("data-pari"), res: await resultat(), ctl: await controles(), aire: await lecture("aire_region") };
  const okF = apres.pari === "revele" && /incorrecte/.test(apres.res) && apres.ctl === "balayage" && proche2(dernierNombre(apres.aire), aireAttendue("racine"));
  noter("paris", ESSAI ? !okF : okF, `pari faux (2π × aire) : phase « ${apres.pari} », verdict « ${apres.res} », contrôles [${apres.ctl}], aire de la région « ${apres.aire} » (attendu ${aireAttendue("racine").toFixed(3)})`);
  const f = await fiches();
  noter("avant-pari", ESSAI ? f !== 1 : f === 1, `étape 1, pari posé : fiche ${f ? "affichée" : "ABSENTE"}`);
  // Le balayage : le dessin grandit, le volume balayé suit l'angle.
  const comptes = [];
  for (const a of [0, 90, 180, 360]) {
    await regler("balayage", a);
    comptes.push(rendu ? (await lireImage(await capture())).dessin : 0);
  }
  const croit = comptes.every((n, i) => i === 0 || n > comptes[i - 1]);
  if (rendu) noter("pixels", ESSAI ? !croit : croit, `balayage 0°, 90°, 180°, 360° : ${comptes.join(", ")} px dessinés (le solide grandit avec l'angle)`);
  await regler("balayage", 180);
  const moitie = dernierNombre(await lecture("volume"));
  await regler("balayage", 360);
  const entier = dernierNombre(await lecture("volume"));
  const V = volumeAttendu("racine");
  noter("nombres", proche2(moitie, V / 2) && proche2(entier, V),
    `volume lu à 180° : ${moitie}, à 360° : ${entier} (attendu ${(V / 2).toFixed(3)} et ${V.toFixed(3)})`);
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 1 révélée : ${brut} fragment(s) de LaTeX brut`);
}

// ── Étape 2 : la coupe est un disque ──
await suivant();
{
  const e = { a: await attr("data-alpha"), x: await attr("data-x"), pari: await attr("data-pari"), ctl: await controles() };
  noter("etapes", e.a === "360" && e.x === "2.25" && e.pari === "attente" && e.ctl === "", `étape 2 : balayage ${e.a}°, coupe en x = ${e.x}, phase « ${e.pari} », contrôles [${e.ctl}]`);
  await avantPari("étape 2 (la coupe)");
  await parier(indexJuste("tranche"));
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste : « ${res} »`);
  noter("etapes", (await controles()) === (ESSAI ? "balayage,tranche" : "tranche"), `étape 2 révélée : contrôles [${await controles()}]`);
  // Les nombres de la coupe, sur une grille d'abscisses.
  for (const x of [1, 2.25, 3, 4, 0.5]) {
    await regler("tranche", x);
    const [r, s] = [await lecture("rayon"), await lecture("aire_tranche")];
    const f = FONCTIONS.racine.f(x);
    const sAtt = ESSAI ? Math.PI * f : Math.PI * f * f;
    noter("nombres", proche2(dernierNombre(r), Math.round(f * 100) / 100) && proche2(dernierNombre(s), sAtt),
      `coupe en x = ${x} : rayon « ${r} », aire « ${s} » (attendu ${f.toFixed(3)} et ${sAtt.toFixed(3)})`);
  }
  // 3. LES PIXELS : le long de l'axe, la coupe est un DISQUE PLEIN, circulaire,
  //    du rayon que le produit dit (ses repères : le centre et le haut du bord,
  //    à la MÊME profondeur que le disque — la perspective n'y entre pas). Le
  //    rapport entre deux coupes n'est PAS jugé ici : elles ne sont pas à la
  //    même distance de l'œil, la perspective grossit la plus proche ; « f
  //    double, l'aire quadruple » est jugé sur les nombres, plus haut.
  if (rendu) {
    const mesurer = async (x) => {
      await regler("tranche", x);
      const c = await repere("centre"), b = await repere("bord");
      const R = Math.hypot(b.x - c.x, b.y - c.y);
      const img = await lireImage(await capture(), { x: c.x, y: c.y, r: R * 1.06 });
      return { ...img, R };
    };
    await vue("Le long de l’axe");
    const disquePlein = (m) => {
      const Rpx = (m.larg + m.haut) / 4;
      const remplissage = m.teinte / (Math.PI * Rpx * Rpx);
      return { ok: m.pur > 0 && Math.abs(m.larg - m.haut) <= 3 && Math.abs(Rpx - m.R) <= Math.max(2, 0.04 * m.R) && remplissage > 0.85 && remplissage < 1.15, Rpx, remplissage };
    };
    for (const x of [1, 4]) {
      const m = await mesurer(x);
      const d = disquePlein(m);
      noter("pixels", ESSAI ? !d.ok : d.ok,
        `le long de l'axe, coupe en x = ${x} : ${m.larg}×${m.haut} px (un cercle ?), rayon ${d.Rpx.toFixed(1)} px contre ${m.R.toFixed(1)} px au repère du produit, rempli à ${(d.remplissage * 100).toFixed(0)} % (un disque PLEIN, pas un anneau)`);
    }
    // L'autre sens : de biais, la même coupe n'est plus un cercle.
    await vue("De biais");
    const biais = await mesurer(4);
    const ellipse = biais.pur > 0 && biais.larg < 0.8 * biais.haut;
    noter("pixels", ESSAI ? !ellipse : ellipse, `de biais : la même coupe fait ${biais.larg}×${biais.haut} px — une ellipse, pas un cercle`);
    await regler("tranche", 2.25);
  } else {
    noter("pixels", false, `MUET — la scène n'a pas été rendue (état « ${etatOuvert} »)`);
  }
}

// ── Étape 3 : empiler les tranches ──
await suivant();
{
  const e = { n: await attr("data-n"), pari: await attr("data-pari") };
  noter("etapes", e.n === "1" && e.pari === "attente", `étape 3 : ${e.n} tranche, phase « ${e.pari} »`);
  await avantPari("étape 3 (les tranches)");
  await parier(indexDe("tranches", "perimetre"));
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 3, pari faux (le périmètre) : « ${res} »`);
  noter("etapes", (await controles()) === "tranches", `étape 3 révélée : contrôles [${await controles()}]`);
  // 4. LA FRONTIÈRE : aucune somme écrite, et le volume lu ne dépend pas de n.
  const lus = [];
  let sommes = 0;
  for (const n of [1, 8, 16]) {
    await regler("tranches", n);
    lus.push(await lecture("volume"));
    const texte = await panneau.evaluate((el) => el.innerText);
    sommes += (texte.match(/Σ|∑|\bsomme\b|\btotal\b/gi) ?? []).length;
  }
  // La valeur VRAIE ici, pas celle de l'essai rouge : cette famille juge
  // l'invariance et l'absence de somme — retourner aussi le volume attendu
  // annulait le retournement de la famille (premier essai rouge : 8/9).
  const vrai = Math.PI * simpson((x) => FONCTIONS.racine.f(x) ** 2, FONCTIONS.racine.a, FONCTIONS.racine.b);
  const constant = lus.every((t) => t === lus[0]) && proche2(dernierNombre(lus[0]), vrai);
  const ok = sommes === 0 && constant;
  noter("frontiere", ESSAI ? !ok : ok, `n = 1, 8, 16 : ${sommes} « Σ / somme / total » dans le panneau ; volume lu « ${lus.join(" » / « ")} » (le même, la valeur exacte)`);
  // Les pixels des tranches, vus de côté : chacune a le rayon de f en son milieu.
  if (rendu) {
    await vue("De côté");
    await regler("tranches", 4);
    const img = await lireImage(await capture());
    const L = img.droite - img.gauche;
    const hauteurA = (fr) => {
      const x = img.gauche + fr * L;
      const proches = img.colonnes.filter(([k]) => Math.abs(k - x) <= 2).map(([, h]) => h);
      return proches.length ? Math.max(...proches) : 0;
    };
    const h = [0.125, 0.375, 0.625, 0.875].map(hauteurA);
    const att = [0.5, 1.5, 2.5, 3.5].map((x) => FONCTIONS.racine.f(x) / FONCTIONS.racine.f(3.5));
    const lu = h.map((v) => v / h[3]);
    const ok2 = h[3] > 0 && lu.every((v, i) => Math.abs(v - att[i]) <= 0.06);
    noter("pixels", ESSAI ? !ok2 : ok2,
      `de côté, 4 tranches : hauteurs ${h.join(", ")} px — rapports ${lu.map((v) => v.toFixed(2)).join(" / ")} (attendu ${att.map((v) => v.toFixed(2)).join(" / ")} : le rayon de f au milieu de chaque tranche)`);
    await vue("De biais");
  }
}

// ── Étape 4 : le cône, puis les trois fonctions ──
await suivant();
{
  const e = { f: await attr("data-fonction"), pari: await attr("data-pari") };
  noter("etapes", e.f === "cone" && e.pari === "attente", `étape 4 : fonction ${e.f}, phase « ${e.pari} »`);
  await avantPari("étape 4 (le cône)");
  await parier(indexJuste("fonction"));
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 4, pari juste : « ${res} »`);
  noter("etapes", (await controles()) === "fonction", `étape 4 révélée : contrôles [${await controles()}]`);
  const verif = await lecture("verification_cone");
  noter("nombres", proche2(dernierNombre(verif), (Math.PI * 4 * 3) / 3), `le cône : πr²h/3 lu « ${verif} » (attendu ${(4 * Math.PI).toFixed(3)})`);
  for (const id of ["racine", "log", "cone"]) {
    await fonction(id);
    const v = await lecture("volume");
    const att = volumeAttendu(id);
    noter("nombres", proche2(dernierNombre(v), att), `fonction ${id} : volume lu « ${v} » (attendu, par Simpson sur f², ${att.toFixed(3)})`);
  }
}

// ── Étape 5 : des u.v. aux cm³ ──
await suivant();
{
  const e = { k: await attr("data-k"), f: await attr("data-fonction") };
  noter("etapes", e.k === "2" && e.f === "racine", `étape 5 : unité ${e.k} cm, fonction ${e.f}`);
  await avantPari("étape 5 (les unités)");
  await parier(indexDe("unite", "carre"));
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 5, pari faux (k²) : « ${res} »`);
  const cube = await etiquetteVisible("cube");
  noter("avant-pari", ESSAI ? cube !== true : cube === true, `étape 5, pari posé : le cube unité ${cube ? "est posé" : "MANQUE"}`);
  for (const k of [1, 2, 3]) {
    await regler("unite", k);
    const v = await lecture("volume_cm3");
    const att = volumeAttendu("racine") * k ** 3;
    noter("nombres", proche2(dernierNombre(v), att), `unité ${k} cm : « ${v} » (attendu 1 u.v. = ${k ** 3} cm³ → ${att.toFixed(3)})`);
  }
  // Le clavier pilote l'unité.
  await regler("unite", 1);
  await panneau.locator('[data-controle="unite"] input').focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await deuxImages();
  const k = Number(await attr("data-k"));
  noter("clavier", k === 3, `deux flèches droite depuis 1 cm : unité ${k} cm`);
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 5 révélée : ${brut} fragment(s) de LaTeX brut`);
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

// ── Sans WebGL : l'état honnête, et les calculs qui restent ──
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
  await q.locator("[data-pari-choix] li button").nth(indexJuste("balayage")).click().catch(() => {});
  await p2.waitForTimeout(150);
  const aire = espaces(await q.locator('[data-lecture="aire_region"]').textContent().catch(() => ""));
  noter("sans-webgl", etat2 === (ESSAI ? "prete" : "sans-webgl") && message === 1 && proche2(dernierNombre(aire), aireAttendue("racine")),
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"}, et l'aire de la région lue reste « ${aire} »`);
  await nav2.close();
}

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-revolution : le solide de révolution (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!rendu) {
  console.error("\nMUET — WebGL n'a pas dessiné ici : la porte ne peut rien dire des pixels, elle ne sera pas verte.");
  process.exit(3);
}
if (ESSAI) {
  const visees = ["avant-clic", "nombres", "pixels", "frontiere", "etapes", "paris", "avant-pari", "latex", "sans-webgl"];
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
