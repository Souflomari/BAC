#!/usr/bin/env node
/**
 * scene-vectoriel.mjs — la scène 3D « le produit vectoriel » dit-elle VRAI ?
 *
 * Quatrième scène de première partie (maths/geometrie-espace, R3 ; ADR 0041).
 * Même principe que les trois autres : le RENDU RÉEL (next start, Chromium en
 * WebGL par SwiftShader), jamais le code.
 *
 *   1. RIEN AVANT LE CLIC — `window.__THREE__` indéfini tant que la scène est
 *      fermée.
 *   2. LES NOMBRES — u ∧ v recalculé ICI par une seconde implémentation, la
 *      formule de la leçon composante par composante (et non en important
 *      `vectoriel.ts`) : coordonnées, norme, aires, et les deux produits
 *      scalaires nuls, sur une grille de réglages (θ, ‖v‖, φ, ordre) ;
 *      l'exemple travaillé tel quel, AB ∧ AC = (0 ; 0 ; 4), triangle d'aire 2.
 *   3. LES PIXELS — la flèche du produit (la seule chose en accent pur) : vue
 *      de côté, elle monte pour u ∧ v et DESCEND pour v ∧ u ; sa hauteur à 30°
 *      est la moitié de celle à 90° (sin 30° = ½) ; à θ = 0, elle disparaît.
 *   4. LES PARIS et 5. AVANT LE PARI, RIEN NE RÉPOND (§11.190) — zéro pixel
 *      d'accent, aucune fiche, une description sans l'issue ; puis tout.
 *   6. LES ÉTAPES — chacune pose son état et n'ouvre que ses contrôles.
 *   7. AUCUN LaTeX BRUT dans le panneau ouvert.
 *   (+ clavier, thème sombre, état sans WebGL, aucune erreur console.)
 *
 * QUATRE VERDICTS (ADR 0034) : sans WebGL au banc, MUET — en échec.
 * `--essai-rouge` retourne l'attente de chaque famille — dont une erreur de la
 * leçon : l'ordre des facteurs ignoré (v ∧ u pris pour u ∧ v).
 *
 *   node scripts/scene-vectoriel.mjs --porte
 *   node scripts/scene-vectoriel.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_VECTORIEL ?? 3800 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/geometrie-espace";
const SCENE = "produit-vectoriel";

// ── La seconde géométrie (la formule de la leçon, R3) ──────────────────────
const U = [2, 0, 0];
const rad = (d) => (d * Math.PI) / 180;
const vecV = (t, lv, p) => [lv * Math.cos(rad(t)), lv * Math.sin(rad(t)) * Math.cos(rad(p)), lv * Math.sin(rad(t)) * Math.sin(rad(p))];
const croix = ([x, y, z], [a, b, c]) => [y * c - z * b, z * a - x * c, x * b - y * a];
/** Le produit attendu. L'essai rouge ignore l'ordre des facteurs. */
const attendu = (t, lv, p, ordre) => {
  const v = vecV(t, lv, p);
  const w = ordre === "uv" ? croix(U, v) : croix(v, U);
  return ESSAI ? w.map((x) => -x) : w;
};
const norme = (a) => Math.hypot(...a);

/** « ≈ (0 ; −3,06 ; 2,57) » → [0, −3.06, 2.57] ; « ≈ 2,83 » → [2.83]. */
function lireNombres(texte) {
  return [...(texte ?? "").replace(/−/g, "-").matchAll(/-?\d+(?:,\d+)?/g)].map((m) => parseFloat(m[0].replace(",", ".")));
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
    console.error("scene-vectoriel : `next start` n'a pas répondu. Build absent ?");
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/geometrie-espace/media/produit-vectoriel.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexJuste = (id) => etapeDesc(id).pari.choix.findIndex((c) => c.juste);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller à la scène ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) {
  console.error(`scene-vectoriel : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`);
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
await page.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="produit-vectoriel"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
await panneau.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
await page.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
const etatOuvert = await panneau.getAttribute("data-scene-etat");
const rendu = etatOuvert === "prete";
noter("avant-clic", (await page.evaluate(() => window.__THREE__ ?? null)) !== null, "window.__THREE__ défini après le clic");

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
async function regler(sel, v) {
  await panneau.locator(sel).evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, v);
  await deuxImages();
  await page.waitForTimeout(80);
}
const angle = (v) => regler('[data-controle="angle"] input', v);
const longueur = (v) => regler('[data-controle="longueur"] input', v);
const inclinaison = (v) => regler('[data-controle="inclinaison"] input', v);
const ordre = async (o) => { await panneau.locator('[data-controle="ordre"] input[type="radio"]').nth(o === "uv" ? 0 : 1).check(); await deuxImages(); };
const attr = (n) => panneau.getAttribute(n);
/** Les espaces de la typographie française (fine insécable avant « ; »,
 *  insécable) ramenées à l'espace simple : la porte lit le NOMBRE, pas la
 *  typographie (qui a sa propre porte). Sans ça, « (0 ; 0 ; 4) » affiché
 *  juste ne correspondait pas à « (0 ; 0 ; 4) » cherché. */
const espaces = (t) => (t ?? "").replace(/[\s\u00a0\u202f]+/g, " ").trim();
const lecture = async (cle) => espaces(await panneau.locator(`[data-lecture="${cle}"]`).first().textContent().catch(() => ""));
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages);
const vue = (nom) => panneau.getByRole("button", { name: nom }).first().click().then(deuxImages);
const fiches = () => panneau.locator("[data-fiche]").count();
const descriptionCanvas = async () => (await panneau.locator("canvas").getAttribute("aria-label").catch(() => "")) ?? "";
const ISSUE_DITE = /perpendiculaire à u|vecteur nul|aire du parallélogramme/;
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(vec|wedge|overrightarrow|sqrt|cdot|text)\b/g) ?? [];
const capture = async () => (await panneau.locator("canvas").screenshot()).toString("base64");

const accent = await page.evaluate(() => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector('[data-scene="produit-vectoriel"]')).getPropertyValue("--figure-accent").trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
});
/** La flèche du produit (accent pur) : combien de pixels, son centre, sa hauteur. */
async function accentDe(b64) {
  return labo.evaluate(async ({ b64, accent }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    let n = 0, sy = 0, ymin = Infinity, ymax = -Infinity;
    for (let y = 0; y < img.height; y++) for (let px = 0; px < img.width; px++) {
      const i = (y * img.width + px) * 4;
      if (Math.abs(d[i] - accent[0]) + Math.abs(d[i + 1] - accent[1]) + Math.abs(d[i + 2] - accent[2]) < 60) { n++; sy += y; ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }
    }
    return { n, y: n ? sy / n : NaN, hauteur: n ? ymax - ymin : 0 };
  }, { b64, accent });
}

async function avantPari(ou) {
  const f = await fiches(), desc = await descriptionCanvas();
  const px = rendu ? (await accentDe(await capture())).n : 0;
  const muet = f === 0 && px === 0 && !ISSUE_DITE.test(desc) && desc.length > 0;
  noter("avant-pari", ESSAI ? !muet : muet,
    `${ou}, avant le pari : fiche ${f ? "AFFICHÉE" : "absente"}, ${px} px d'accent, description « ${desc.slice(0, 100)}${desc.length > 100 ? "…" : ""} »`);
}

// ── Étape 1 : la direction ──
{
  const avant = { pari: await attr("data-pari"), ctl: await controles(), lec: await panneau.locator("[data-lectures]").count() };
  const ok = avant.pari === "attente" && avant.ctl === "" && avant.lec === 0;
  noter("paris", ESSAI ? !ok : ok, `étape 1 avant le pari : phase « ${avant.pari} », contrôles [${avant.ctl}], lectures ${avant.lec ? "PRÉSENTES" : "absentes"}`);
  await avantPari("étape 1 (la direction)");
  // Un pari FAUX : la somme AB + AC.
  await parier(indexDe("direction", "somme"));
  const apres = { pari: await attr("data-pari"), res: await resultat(), ctl: await controles(), coord: await lecture("coordonnees") };
  const w = attendu(90, 2, 0, "uv");
  const lus = lireNombres(apres.coord);
  const okF = apres.pari === "revele" && /incorrecte/.test(apres.res) && apres.ctl === "angle" && lus.length === 3 && lus.every((x, i) => proche2(x, w[i]));
  noter("paris", ESSAI ? !okF : okF, `pari faux (la somme) : phase « ${apres.pari} », verdict « ${apres.res} », contrôles [${apres.ctl}], AB ∧ AC lu « ${apres.coord} »`);
  const f = await fiches(), px = rendu ? (await accentDe(await capture())).n : 1;
  noter("avant-pari", ESSAI ? !(f === 1 && px > 0) : f === 1 && px > 0, `étape 1, pari posé : fiche ${f ? "affichée" : "ABSENTE"}, ${px} px d'accent`);
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 1 révélée : ${brut} fragment(s) de LaTeX brut`);
}

// ── 3. Les pixels, vus de côté : la hauteur de la flèche suit sin θ ──
if (rendu) {
  await vue("De côté");
  await angle(90); const a90 = await accentDe(await capture());
  await angle(30); const a30 = await accentDe(await capture());
  await angle(0); const a0 = await accentDe(await capture());
  const rapport = a30.hauteur / a90.hauteur;
  const ok = a90.n > 0 && rapport > 0.4 && rapport < 0.62 && a0.n === 0;
  noter("pixels", ESSAI ? !ok : ok, `vue de côté, hauteur de la flèche : ${a90.hauteur} px à 90°, ${a30.hauteur} px à 30° (rapport ${rapport.toFixed(2)}, attendu ½), ${a0.n} px d'accent à 0°`);
  await angle(90);
  await vue("De biais");
} else {
  noter("pixels", false, `MUET — la scène n'a pas été rendue (état « ${etatOuvert} »)`);
}

// ── Étape 2 : l'ordre ──
await suivant();
{
  const e = { ordre: await attr("data-ordre"), pari: await attr("data-pari"), ctl: await controles() };
  noter("etapes", e.ordre === "vu" && e.pari === "attente" && e.ctl === "", `étape 2 : ordre ${e.ordre}, phase « ${e.pari} », contrôles [${e.ctl}]`);
  await avantPari("étape 2 (l'ordre)");
  await parier(indexJuste("ordre"));
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste : « ${res} »`);
  noter("etapes", (await controles()) === (ESSAI ? "angle,ordre" : "ordre"), `étape 2 révélée : contrôles [${await controles()}]`);
  if (rendu) {
    await vue("De côté");
    const bas = await accentDe(await capture()); // v ∧ u
    await ordre("uv");
    const haut = await accentDe(await capture()); // u ∧ v
    // L'essai rouge attend l'inverse : u ∧ v en bas.
    const ok = haut.n > 0 && bas.n > 0 && (ESSAI ? haut.y > bas.y + 20 : haut.y < bas.y - 20);
    noter("pixels", ok, `vue de côté : u ∧ v centré à y = ${haut.y.toFixed(0)} px, v ∧ u à y = ${bas.y.toFixed(0)} px — ${haut.y < bas.y ? "u ∧ v au-dessus" : "u ∧ v EN DESSOUS"}`);
    await vue("De biais");
  }
}

// ── Étape 3 : l'aire ──
await suivant();
{
  const e = { t: await attr("data-theta"), lv: await attr("data-lv") };
  noter("etapes", e.t === "150" && e.lv === "2", `étape 3 : θ = ${e.t}°, ‖v‖ = ${e.lv}`);
  await avantPari("étape 3 (l'aire)");
  await parier(indexDe("aire", "deux"));
  const res = await resultat();
  noter("paris", ESSAI ? !/incorrecte/.test(res) : /incorrecte/.test(res), `étape 3, pari faux (la norme prise pour l'aire du triangle) : « ${res} »`);
  const [para, tri, nrm] = [await lecture("aire-para"), await lecture("aire-tri"), await lecture("norme")];
  const w = attendu(150, 2, 0, "uv");
  const ok = proche2(lireNombres(nrm)[0], norme(w)) && proche2(lireNombres(para)[0], norme(w)) && proche2(lireNombres(tri)[0], norme(w) / 2);
  noter("nombres", ok, `θ = 150° : ‖u ∧ v‖ « ${nrm} », parallélogramme « ${para} », triangle « ${tri} » (attendu ${norme(w).toFixed(3)} et ${(norme(w) / 2).toFixed(3)})`);
}

// ── Étape 4 : colinéaires ──
await suivant();
{
  const e = { t: await attr("data-theta") };
  noter("etapes", e.t === "0", `étape 4 : θ = ${e.t}°`);
  await avantPari("étape 4 (colinéaires)");
  await parier(indexJuste("colineaires"));
  const c = await lecture("coordonnees");
  const ok = lireNombres(c).length === 3 && lireNombres(c).every((x) => x === 0);
  noter("nombres", ESSAI ? !ok : ok, `θ = 0° : u ∧ v lu « ${c} » (attendu le vecteur nul)`);
  if (rendu) {
    const px = (await accentDe(await capture())).n;
    noter("pixels", ESSAI ? px > 0 : px === 0, `θ = 0°, pari posé : ${px} px d'accent (la flèche nulle ne se dessine pas)`);
  }
}

// ── Étape 5 : perspective, puis les nombres sur une grille ──
await suivant();
{
  const e = { phi: await attr("data-phi") };
  noter("etapes", e.phi === "50", `étape 5 : plan incliné de ${e.phi}°`);
  await avantPari("étape 5 (la perspective)");
  await parier(indexJuste("perspective"));
  noter("etapes", (await controles()) === "angle,inclinaison,longueur,ordre", `étape 5 : ouvre [${await controles()}]`);
  const grille = [[90, 2, 0, "uv"], [90, 2, 50, "uv"], [45, 2, 0, "uv"], [120, 1.5, 30, "vu"], [60, 3, 90, "uv"], [180, 3, 0, "uv"], [35, 0.5, 15, "vu"]];
  for (const [t, lv, p, o] of grille) {
    await angle(t); await longueur(lv); await inclinaison(p); await ordre(o);
    const [c, n, su, sv, para] = [await lecture("coordonnees"), await lecture("norme"), await lecture("scal-u"), await lecture("scal-v"), await lecture("aire-para")];
    const w = attendu(t, lv, p, o);
    const lus = lireNombres(c);
    const ok = lus.length === 3 && lus.every((x, i) => proche2(x, w[i])) && proche2(lireNombres(n)[0], norme(w)) &&
      lireNombres(su)[0] === 0 && lireNombres(sv)[0] === 0 && proche2(lireNombres(para)[0], norme(w));
    noter("nombres", ok, `θ = ${t}°, ‖v‖ = ${lv}, φ = ${p}°, ${o === "uv" ? "u ∧ v" : "v ∧ u"} → « ${c} », norme « ${n} », u·w « ${su} », v·w « ${sv} » (attendu ${w.map((x) => x.toFixed(2)).join(" ; ")})`);
  }
  // L'exemple travaillé, tel quel.
  await angle(90); await longueur(2); await inclinaison(0); await ordre("uv");
  const ex = await lecture("coordonnees"), tri = await lecture("aire-tri");
  noter("nombres", /\(0 ; 0 ; 4\)/.test(ex) && lireNombres(tri)[0] === 2, `exemple travaillé : AB ∧ AC « ${ex} », aire(ABC) « ${tri} » (attendu (0 ; 0 ; 4) et 2)`);
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape libre : ${brut} fragment(s) de LaTeX brut`);
}

// Le clavier pilote l'angle.
{
  await angle(90);
  await panneau.locator('[data-controle="angle"] input').focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await deuxImages();
  const t = Number(await attr("data-theta"));
  noter("clavier", t === 100, `deux flèches droite depuis 90° : θ = ${t}°`);
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
  const jeton = () => page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
    x.fillStyle = getComputedStyle(document.querySelector('[data-scene="produit-vectoriel"]')).getPropertyValue("--figure-surface").trim();
    x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
  });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jeton();
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jeton();
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
  await p2.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="produit-vectoriel"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p2.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
  const etat2 = await q.getAttribute("data-scene-etat");
  const message = await q.getByText("WebGL indisponible", { exact: false }).count();
  await q.locator("[data-pari-choix] li button").nth(indexJuste("direction")).click().catch(() => {});
  await p2.waitForTimeout(150);
  const c = espaces(await q.locator('[data-lecture="coordonnees"]').textContent().catch(() => ""));
  noter("sans-webgl", etat2 === (ESSAI ? "prete" : "sans-webgl") && message === 1 && /\(0 ; 0 ; 4\)/.test(c),
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"}, et AB ∧ AC lu reste « ${c} »`);
  await nav2.close();
}

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-vectoriel : le produit vectoriel (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!rendu) {
  console.error("\nMUET — WebGL n'a pas dessiné ici : la porte ne peut rien dire des pixels, elle ne sera pas verte.");
  process.exit(3);
}
if (ESSAI) {
  const visees = ["avant-clic", "nombres", "pixels", "etapes", "paris", "avant-pari", "latex", "sans-webgl"];
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
