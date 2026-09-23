#!/usr/bin/env node
/**
 * scene-sphere.mjs — la scène 3D « sphère, plan, droite » dit-elle VRAI ?
 *
 * Deuxième scène de première partie (maths/geometrie-espace, R9 ; ADR 0041).
 * Même principe que `scene-orbite` : on vérifie le RENDU RÉEL (next start,
 * Chromium en WebGL par SwiftShader), jamais le code.
 *
 *   1. RIEN AVANT LE CLIC — `window.__THREE__` indéfini tant que la scène est
 *      fermée.
 *   2. LES NOMBRES — d, r = √(R² − d²), HM, la corde, recalculés ICI par une
 *      seconde implémentation (et non en important `sphere.ts`). L'exemple
 *      travaillé de la leçon (z = 0, R = 3 → d = 2, r = √5 ≈ 2,24) doit
 *      s'afficher tel quel ; la tangence (d = R) est EXACTE sur la grille de
 *      0,1 (k = 5 : tangent ; 5,1 : vide ; 4,9 : sécant) ; la case courante des
 *      « trois cas » suit.
 *   3. LES PIXELS, dans les deux sens — la couleur d'accent est l'intersection :
 *      un cercle (beaucoup de pixels), un point (peu), rien (aucun) ; vu de
 *      dessus, le cercle RÉTRÉCIT quand d augmente ; une droite à la même
 *      distance donne deux points, pas un cercle.
 *   4. LES PARIS — rien ne s'ouvre avant l'engagement ; ici pas de temps, le
 *      verdict tombe au choix (un pari faux est dit faux, un juste est dit juste).
 *   4 bis. AVANT LE PARI, RIEN NE RÉPOND (§11.190) — ni l'intersection dessinée
 *      (zéro pixel d'accent), ni la fiche des trois cas (sa case cochée EST la
 *      réponse), ni la description lue au lecteur d'écran. Trouvé en relisant
 *      la scène, pas par la porte : l'étape 2 montrait ses deux points et
 *      cochait « deux points » avant que l'élève ait parié.
 *   5. LES ÉTAPES — chacune pose son état et n'ouvre que son contrôle.
 *   6. AUCUN LaTeX BRUT dans le panneau ouvert — une consigne `$d$` rendue en
 *      texte s'affichait telle quelle (trouvé en regardant la scène) ; la porte
 *      LaTeX nu, elle, ne lit que la scène FERMÉE.
 *   (+ clavier, thème sombre, état sans WebGL, aucune erreur console.)
 *
 * QUATRE VERDICTS (ADR 0034) : sans WebGL au banc, MUET — en échec.
 * `--essai-rouge` retourne l'attente de chaque famille — dont la misconception
 * même de la leçon : recalculer r avec R² + d² au lieu de R² − d² doit crier.
 *
 *   node scripts/scene-sphere.mjs --porte
 *   node scripts/scene-sphere.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_SPHERE ?? 3500 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/maths/geometrie-espace";

// ── La seconde géométrie (données de la leçon, R9 : S(0,0,2), R = 3) ─────
const ZS = 2;
const distance = (k) => Math.abs(k - ZS);
// L'essai rouge recalcule avec la misconception de la leçon : R² + d².
const rayonCercle = (k, R) => Math.sqrt(R * R + (ESSAI ? 1 : -1) * distance(k) ** 2);
const cas = (k, R) => {
  const d = Math.round(distance(k) * 10), r = Math.round(R * 10);
  return d > r ? "vide" : d === r ? "tangent" : "secant";
};

/** « √5 ≈ 2,24 », « 1,5 », « ≈ 5,20 » → le nombre DÉCIMAL affiché (le dernier). */
function lireNombre(texte) {
  const t = texte.replace(/[\s  ]/g, "");
  const tous = [...t.matchAll(/-?\d+(?:,\d+)?/g)].map((m) => m[0]);
  if (!tous.length) return NaN;
  return parseFloat(tous[tous.length - 1].replace(",", "."));
}
const proche = (lu, attendu, dec = 2) => Math.abs(lu - attendu) <= 0.5 * 10 ** -dec + 1e-9;

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
    console.error("scene-sphere : `next start` n'a pas répondu. Build absent ?");
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/maths/geometrie-espace/media/sphere-plan.json", import.meta.url), "utf-8"));
const pariDe = (id) => descripteur.etapes.find((e) => e.id === id).pari;
const indexJuste = (id) => pariDe(id).choix.findIndex((c) => c.juste);

// ── Aller à la scène (le chapitre se lit dans le DOM) ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate(() => {
  const s = document.querySelector('[data-scene="sphere-plan-droite"]')?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
});
if (!chapitre) {
  console.error("scene-sphere : aucune scène sphere-plan-droite dans la leçon — rien à mesurer (MUET).");
  await nav.close();
  process.exit(3);
}
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator('[data-scene="sphere-plan-droite"]');
await panneau.scrollIntoViewIfNeeded();

// ── 1. Rien avant le clic ──
const threeAvant = await page.evaluate(() => window.__THREE__ ?? null);
noter("avant-clic", (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0, "scène fermée, aucun canvas");
noter("avant-clic", ESSAI ? threeAvant !== null : threeAvant === null, `window.__THREE__ avant le clic : ${threeAvant ?? "indéfini"}`);
await page.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="sphere-plan-droite"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
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
  await page.waitForTimeout(100);
}
const k = (v) => regler('[data-controle="position"] input', v);
const R = (v) => regler('[data-controle="rayon"] input', v);
const attr = (n) => panneau.getAttribute(n);
const lecture = async (cle) => ((await panneau.locator(`[data-lecture="${cle}"]`).first().textContent().catch(() => "")) ?? "").trim();
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages);
const vue = (nom) => panneau.getByRole("button", { name: nom }).first().click().then(deuxImages);
const capture = async () => (await panneau.locator("canvas").screenshot()).toString("base64");
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(sqrt|mathcal|frac|text)\b/g) ?? [];
const fiches = () => panneau.locator("[data-fiche]").count();
const descriptionCanvas = async () => (await panneau.locator("canvas").getAttribute("aria-label").catch(() => "")) ?? "";
/** La description ne doit rien dire de l'issue avant le pari. */
const ISSUE_DITE = /intersection|point commun|points communs|touche la sphère/;

const accent = await page.evaluate(() => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector('[data-scene="sphere-plan-droite"]')).getPropertyValue("--figure-accent").trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
});
/** Pixels d'accent (l'intersection) : combien, et leur étendue horizontale. */
async function accentDe(b64) {
  return labo.evaluate(async ({ b64, accent }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    let n = 0, xmin = Infinity, xmax = -Infinity;
    for (let y = 0; y < img.height; y++) for (let px = 0; px < img.width; px++) {
      const i = (y * img.width + px) * 4;
      if (Math.abs(d[i] - accent[0]) + Math.abs(d[i + 1] - accent[1]) + Math.abs(d[i + 2] - accent[2]) < 60) { n++; xmin = Math.min(xmin, px); xmax = Math.max(xmax, px); }
    }
    return { n, largeur: n ? xmax - xmin : 0 };
  }, { b64, accent });
}

/**
 * 4 bis. AVANT LE PARI, RIEN NE RÉPOND — zéro pixel d'accent (l'intersection
 * n'est pas dessinée), aucune fiche des trois cas, et une description qui
 * décrit l'ÉNONCÉ (sphère, plan ou droite, distance) sans dire l'issue.
 * Puis, le pari posé, l'issue apparaît : c'est la moitié qui prouve que la
 * première n'est pas un canvas vide ou une fiche perdue.
 */
async function avantPari(ou) {
  const f = await fiches(), desc = await descriptionCanvas();
  const px = rendu ? (await accentDe(await capture())).n : 0;
  const muet = f === 0 && px === 0 && !ISSUE_DITE.test(desc) && desc.length > 0;
  noter("avant-pari", ESSAI ? !muet : muet,
    `${ou}, avant le pari : fiche ${f ? "AFFICHÉE" : "absente"}, ${px} px d'accent, description « ${desc.slice(0, 110)}${desc.length > 110 ? "…" : ""} »`);
}

// ── 4. Étape 1 : le pari d'abord ──
{
  const avant = { pari: await attr("data-pari"), ctl: await controles(), lec: await panneau.locator("[data-lectures]").count() };
  const ok = avant.pari === "attente" && avant.ctl === "" && avant.lec === 0;
  noter("paris", ESSAI ? !ok : ok, `étape 1 avant le pari : phase « ${avant.pari} », contrôles [${avant.ctl}], lectures ${avant.lec ? "PRÉSENTES" : "absentes"}`);
  await avantPari("étape 1 (le plan à mi-rayon)");
  // Un pari FAUX : la misconception de la leçon, √(R² + d²).
  await parier(pariDe("plan").choix.findIndex((c) => c.id === "plus"));
  const apres = { pari: await attr("data-pari"), res: await resultat(), ctl: await controles(), d: await lecture("d") };
  const okF = apres.pari === "revele" && (ESSAI ? /Bonne/.test(apres.res) : /incorrecte/.test(apres.res)) && apres.ctl === "position" && proche(lireNombre(apres.d), 1.5, 1);
  noter("paris", ESSAI ? !okF : okF, `pari faux (√(R² + d²)) : phase « ${apres.pari} », verdict « ${apres.res} », contrôles [${apres.ctl}], d « ${apres.d} »`);
  const brut1 = (await latexBrut()).length;
  noter("latex", ESSAI ? brut1 > 0 : brut1 === 0, `étape 1 révélée : ${brut1} fragment(s) de LaTeX brut`);
  {
    const f = await fiches(), desc = await descriptionCanvas();
    const px = rendu ? (await accentDe(await capture())).n : 1;
    const dit = f === 1 && px > 0 && ISSUE_DITE.test(desc);
    noter("avant-pari", ESSAI ? !dit : dit, `étape 1, pari posé : fiche ${f ? "affichée" : "ABSENTE"}, ${px} px d'accent, la description dit l'issue : ${ISSUE_DITE.test(desc) ? "oui" : "NON"}`);
  }
}

// ── 3. Les pixels (étape 1 : le plan, R = 3) ──
if (rendu) {
  await vue("De biais");
  await k(0.5); const secant = await accentDe(await capture());
  await k(5); const tangent = await accentDe(await capture());
  await k(5.5); const vide = await accentDe(await capture());
  const ok = secant.n > 400 && tangent.n > 0 && tangent.n < secant.n / 4 && vide.n === 0;
  noter("pixels", ESSAI ? !ok : ok, `accent (l'intersection) — sécant ${secant.n} px, tangent ${tangent.n} px, vide ${vide.n} px`);
  await vue("De dessus");
  const largeurs = [];
  for (const kk of [2, 0, -0.8]) { await k(kk); largeurs.push((await accentDe(await capture())).largeur); }
  const decroit = largeurs[0] > largeurs[1] && largeurs[1] > largeurs[2] && largeurs[2] > 0;
  noter("pixels", ESSAI ? !decroit : decroit, `vu de dessus, largeur du cercle pour d = 0 ; 2 ; 2,8 : ${largeurs.join(" > ")} px`);
  await vue("De biais");
} else {
  noter("pixels", false, `MUET — la scène n'a pas été rendue (état « ${etatOuvert} »)`);
}

// ── 5. Les étapes ──
await suivant(); // → droite
{
  const e = { ctl: await controles(), objet: await attr("data-objet"), k: await attr("data-k"), pari: await attr("data-pari") };
  noter("etapes", e.pari === "attente" && e.ctl === "" && e.objet === "droite" && e.k === "0.5", `étape 2 : phase « ${e.pari} », contrôles [${e.ctl}], objet ${e.objet}, k = ${e.k}`);
  await avantPari("étape 2 (la droite)");
  await parier(indexJuste("droite"));
  const ctl = await controles();
  const hmTxt = await lecture("hm"), corde = await lecture("corde");
  const okL = ctl === (ESSAI ? "objet,position" : "objet") && proche(lireNombre(hmTxt), rayonCercle(0.5, 3)) && proche(lireNombre(corde), 2 * rayonCercle(0.5, 3));
  noter("etapes", okL, `étape 2 révélée : contrôles [${ctl}], HM « ${hmTxt} », corde « ${corde} »`);
  if (rendu) {
    const droite = await accentDe(await capture());
    await panneau.getByLabel("Un plan (P)").check(); await deuxImages();
    const plan = await accentDe(await capture());
    await panneau.getByLabel("Une droite (D), dans ce plan").check(); await deuxImages();
    const ok = droite.n > 0 && droite.n < plan.n / 3;
    noter("pixels", ESSAI ? !ok : ok, `même distance d = 1,5 : droite ${droite.n} px d'accent (deux points), plan ${plan.n} px (un cercle)`);
  }
}

await suivant(); // → rayon
{
  const e = { k: await attr("data-k"), r: await attr("data-r"), objet: await attr("data-objet") };
  noter("etapes", e.k === "0" && e.r === "3" && e.objet === "plan", `étape 3 : k = ${e.k}, R = ${e.r}, objet ${e.objet} (le plan z = 0 de l'exemple)`);
  await parier(indexJuste("rayon"));
  noter("paris", ESSAI ? !/Bonne/.test(await resultat()) : /Bonne/.test(await resultat()), `étape 3, pari juste : « ${await resultat()} »`);
  const vus = [];
  for (const rr of [1.9, 2, 2.1]) { await R(rr); vus.push(await attr("data-cas")); }
  noter("etapes", vus.join(",") === "vide,tangent,secant", `plan z = 0 (d = 2), R = 1,9 ; 2 ; 2,1 → ${vus.join(" ; ")}`);
}

await suivant(); // → libre
await avantPari("étape 4 (d = 3,5 > R)");
await parier(indexJuste("libre"));
noter("etapes", (await controles()) === "objet,position,rayon", `étape 4 : ouvre [${await controles()}]`);

// ── 2. Les nombres, à l'étape libre ──
{
  await panneau.getByLabel("Un plan (P)").check(); await deuxImages();
  const essais = [[0, 3], [0.5, 3], [2, 3], [4.9, 3], [5, 3], [5.1, 3], [-1, 3], [0, 2.5], [3.3, 1.5]];
  for (const [kk, rr] of essais) {
    await R(rr); await k(kk);
    const c = cas(kk, rr);
    const [dTxt, rTxt, casLu, courante] = [await lecture("d"), await lecture("r"), await attr("data-cas"), await panneau.locator('[data-cas-ligne][aria-current="true"]').getAttribute("data-cas-ligne")];
    const rAttendu = c === "secant" ? rayonCercle(kk, rr) : 0;
    const okR = c === "secant" ? proche(lireNombre(rTxt), rAttendu) : c === "tangent" ? /un seul point/.test(rTxt) : /aucun point/.test(rTxt);
    noter("nombres", casLu === c && courante === c && proche(lireNombre(dTxt), distance(kk), 1) && okR,
      `z = ${kk}, R = ${rr} → d « ${dTxt} », r « ${rTxt} », cas ${casLu} (case cochée : ${courante})`);
  }
  // L'exemple travaillé de la leçon, tel quel.
  await R(3); await k(0);
  const rEx = await lecture("r");
  noter("nombres", /√\s*5/.test(rEx) && proche(lireNombre(rEx), Math.sqrt(5)), `exemple travaillé (z = 0, R = 3) : r « ${rEx} » (attendu √5 ≈ 2,24)`);
  const brut4 = (await latexBrut()).length;
  noter("latex", ESSAI ? brut4 > 0 : brut4 === 0, `étape libre : ${brut4} fragment(s) de LaTeX brut`);
}

// Le clavier pilote la position (le range natif est la source de vérité).
{
  await k(0);
  await panneau.locator('[data-controle="position"] input').focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await deuxImages();
  const k1 = Number(await attr("data-k"));
  noter("clavier", Math.abs(k1 - 0.2) < 1e-9, `deux flèches droite depuis z = 0 : z = ${k1}`);
}

// Le thème sombre repeint le fond (couleur dominante du canvas).
if (rendu) {
  const fond = async () => labo.evaluate(async (b64) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data; const n = new Map();
    for (let i = 0; i < d.length; i += 4) { const kk = (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]; n.set(kk, (n.get(kk) ?? 0) + 1); }
    const [kk] = [...n].sort((a, b) => b[1] - a[1])[0]; return [(kk >> 16) & 255, (kk >> 8) & 255, kk & 255];
  }, await capture());
  const jeton = () => page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
    x.fillStyle = getComputedStyle(document.querySelector('[data-scene="sphere-plan-droite"]')).getPropertyValue("--figure-surface").trim();
    x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
  });
  const pres = (u, v) => u.every((kk, i) => Math.abs(kk - v[i]) <= 6);
  const clair = await fond(), jc = await jeton();
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jeton();
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}

noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── 6. Sans WebGL : l'état honnête, et les calculs qui restent ──
{
  const nav2 = await lancer(["--disable-webgl", "--disable-3d-apis"]);
  const p2 = await (await nav2.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
  await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const q = p2.locator('[data-scene="sphere-plan-droite"]');
  await q.scrollIntoViewIfNeeded();
  await p2.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="sphere-plan-droite"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p2.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
  const etat2 = await q.getAttribute("data-scene-etat");
  const message = await q.getByText("WebGL indisponible", { exact: false }).count();
  await q.locator("[data-pari-choix] li button").nth(indexJuste("plan")).click().catch(() => {});
  await q.locator('[data-controle="position"] input').evaluate((el) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, "0"); el.dispatchEvent(new Event("input", { bubbles: true }));
  }).catch(() => {});
  await p2.waitForTimeout(150);
  const rSans = ((await q.locator('[data-lecture="r"]').textContent().catch(() => "")) ?? "").trim();
  noter("sans-webgl", etat2 === (ESSAI ? "prete" : "sans-webgl") && message === 1 && proche(lireNombre(rSans), Math.sqrt(5)),
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"}, et à z = 0 le rayon lu reste « ${rSans} »`);
  await nav2.close();
}

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-sphere : sphère, plan, droite (${URL_SCENE})`);
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
