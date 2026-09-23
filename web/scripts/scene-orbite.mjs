#!/usr/bin/env node
/**
 * scene-orbite.mjs — la scène 3D de l'orbite géostationnaire dit-elle VRAI ?
 *
 * La scène (ADR 0041) promet quatre choses à l'élève. La porte les vérifie
 * sur le rendu RÉEL — un `next start`, un Chromium qui dessine en WebGL
 * (SwiftShader, sans carte graphique) — et jamais sur le code :
 *
 *   1. RIEN AVANT LE CLIC. three.js ne se charge pas avec la leçon :
 *      `window.__THREE__` (posé par three.js à son import) est indéfini tant
 *      que la scène est fermée, défini après l'ouverture. Un manifeste de build
 *      ne peut pas le dire : un import() paresseux y est invisible (ADR 0039).
 *
 *   2. LES NOMBRES SONT JUSTES. Pour six rayons, la période, l'altitude, la
 *      vitesse et T²/r³ affichés sont recalculés ICI, par une seconde
 *      implémentation de la 3e loi de Kepler avec les constantes de la leçon
 *      (R10 : G = 6,67×10⁻¹¹, M_T = 5,97×10²⁴ kg, R_T = 6,37×10⁶ m,
 *      T_Terre = 24 h) — pas en important le module du produit, qui se
 *      donnerait raison à lui-même (ADR 0036 : une porte qui se cite elle-même
 *      se disculpe). Et la case « T = 24 h » n'est cochée qu'à UN rayon de la
 *      grille : 42 230 km — la scène ne montre pas de « plage » de rayons
 *      géostationnaires (CH-KEP-3).
 *
 *   3. LES PIXELS DISENT LA PHYSIQUE — c'est le cœur. Dans le référentiel
 *      terrestre, un satellite géostationnaire est IMMOBILE : l'image à 0 h,
 *      à 6 h et à 18 h est la même, au pixel près. Deux sens, sinon la porte
 *      pourrait être verte parce que rien ne se dessine :
 *        · à 26 000 km (T ≈ 11,6 h), les images DIFFÈRENT et la tache
 *          d'accent (satellite + trace) se DÉPLACE ;
 *        · au rayon géostationnaire mais dans le référentiel GÉOCENTRIQUE,
 *          elles diffèrent aussi : le même satellite bouge (CH-KEP-2).
 *
 *   4. LES ÉTAPES OUVRENT CE QU'ELLES DISENT. Chaque étape n'expose que son
 *      contrôle (les autres sont ABSENTS du DOM), pose l'état qu'annonce sa
 *      consigne, et le verdict suit : plan incliné → non ; sens contraire →
 *      non, et vitesse par rapport au sol = 2 v ; référentiel → v_sol = 0.
 *   5. SANS WEBGL, L'ÉTAT EST HONNÊTE. Un second navigateur, WebGL coupé : la
 *      scène le dit (« sans-webgl », message visible) et garde le curseur et
 *      les lectures justes — l'élève sans 3D ne perd pas la physique.
 *   (+ le temps ne coule que lancé et s'arrête à la pause ; le clavier pilote
 *    le rayon ; le thème sombre repeint le fond ; aucune erreur console.)
 *
 * QUATRE VERDICTS (ADR 0034) : VERT · ROUGE · MUET — si WebGL manque ici, la
 * porte ne peut rien dire des pixels, et elle le dit en sortant en échec
 * plutôt qu'en vert.
 *
 * ESSAI ROUGE : `--essai-rouge` retourne les attentes de chaque famille
 * (constante G faussée de 3 %, images « identiques » exigées là où elles
 * doivent différer et l'inverse, three.js exigé avant le clic, contrôles
 * d'une autre étape exigés). Chaque famille doit crier.
 *
 *   node scripts/scene-orbite.mjs --porte        (lève son propre next start)
 *   node scripts/scene-orbite.mjs --essai-rouge
 *   BASE=http://127.0.0.1:3000 node scripts/scene-orbite.mjs --porte
 */
import { chromium } from "playwright-core";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_SCENE ?? 3600 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/chute-mouvements-plans";

// ── La seconde physique (constantes de la leçon, R10) ─────────────────────
const G = 6.67e-11 * (ESSAI ? 1.03 : 1); // l'essai rouge fausse G de 3 %
const M_T = 5.97e24;
const R_T = 6.37e6;
const T_TERRE = 86400;
const periode = (r) => 2 * Math.PI * Math.sqrt((r * r * r) / (G * M_T));
const vitesse = (r) => Math.sqrt((G * M_T) / r);

/** « 35 860 km », « 24,00 h », « 9,91 × 10⁻¹⁴ s²/m³ » → nombre. */
function lireNombre(texte) {
  const t = texte.replace(/[\s  ]/g, "");
  const sci = t.match(/^(-?[\d,]+)×10([⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);
  if (sci) {
    const exp = [...sci[2]].map((c) => ({ "⁻": "-", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" })[c]).join("");
    return parseFloat(sci[1].replace(",", ".")) * 10 ** parseInt(exp, 10);
  }
  const m = t.match(/^-?[\d,]+/);
  return m ? parseFloat(m[0].replace(",", ".")) : NaN;
}
/** Égal à la précision affichée : un demi-chiffre du dernier rang. */
function egalAffiche(texte, attendu) {
  const t = texte.replace(/[\s  ]/g, "");
  const dec = (t.match(/^-?\d+,(\d+)/)?.[1] ?? "").length;
  const v = lireNombre(texte);
  if (/×10/.test(t)) return Math.abs(v - attendu) <= 0.005 * 10 ** Math.floor(Math.log10(attendu)) + 1e-30;
  return Math.abs(v - attendu) <= 0.5 * 10 ** -dec + 1e-9;
}

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
    console.error("scene-orbite : `next start` n'a pas répondu. Build absent ?");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

// ── Navigateur : WebGL par SwiftShader (aucune carte graphique en CI) ─────
// PW_CHROMIUM_PATH d'abord : la CI installe SON Chromium (§11.180).
const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
const labo = await ctx.newPage(); // décode les captures, loin de la page mesurée
await labo.goto("about:blank");
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(`pageerror : ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") erreurs.push(`console : ${m.text()}`); });

const resultats = []; // { famille, ok, detail }
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });

// ── Aller à la scène : le chapitre se lit dans le DOM, il ne se recopie pas ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate(() => {
  const s = document.querySelector("[data-scene]")?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
});
if (!chapitre) {
  console.error("scene-orbite : aucune scène [data-scene] dans la leçon — rien à mesurer (MUET).");
  await nav.close();
  process.exit(3);
}
await page.goto(`${BASE}${LECON}?chapitre=${chapitre}`, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator('[data-scene="orbite-geostationnaire"]');
await panneau.scrollIntoViewIfNeeded();

// ── 1. Rien avant le clic ──
const nbPanneaux = await page.locator("[data-scene]").count();
const etatInitial = await panneau.getAttribute("data-scene-etat");
const threeAvant = await page.evaluate(() => window.__THREE__ ?? null);
const canvasAvant = await panneau.locator("canvas").count();
noter("avant-clic", nbPanneaux === 1 && etatInitial === "ferme", `${nbPanneaux} panneau, état « ${etatInitial} »`);
noter("avant-clic", ESSAI ? threeAvant !== null : threeAvant === null, `window.__THREE__ avant le clic : ${threeAvant ?? "indéfini"}`);
noter("avant-clic", canvasAvant === 0, `${canvasAvant} canvas avant le clic`);

await page.waitForFunction(
  () => { const b = [...document.querySelectorAll("[data-scene] button")].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; },
  null, { timeout: 40000 }
).catch(() => {});
await panneau.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
await page.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
const etatOuvert = await panneau.getAttribute("data-scene-etat");
const threeApres = await page.evaluate(() => window.__THREE__ ?? null);
noter("avant-clic", threeApres !== null, `window.__THREE__ après le clic : ${threeApres ?? "indéfini"}`);
const rendu = etatOuvert === "prete";

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
async function regler(loc, v) {
  await loc.evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, v);
  await deuxImages();
  await page.waitForTimeout(120);
}
// Le curseur de temps est le PREMIER range du groupe « Le temps ».
const temps = (h) => regler(panneau.locator('[role="group"][aria-label="Le temps"] input[type="range"]'), h);
const rayon = (km) => regler(panneau.locator('input[type="number"]'), km);
const lecture = async (cle) => (await panneau.locator(`[data-lecture="${cle}"]`).first().textContent())?.trim() ?? "";
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const capture = async () => (await panneau.locator("canvas").screenshot()).toString("base64");
const attr = (n) => panneau.getAttribute(n);
const lanceTempsPresent = async () => (await panneau.getByRole("button", { name: "Lancer le temps" }).count()) > 0;
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();

// Les paris — lus dans le DESCRIPTEUR (le contenu), dans l'ordre auteur que le
// panneau garde : la porte sait où est le choix juste sans lire le texte rendu.
const { readFileSync } = await import("node:fs");
const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/chute-mouvements-plans/media/orbites-gravite.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexJuste = (id) => etapeDesc(id).pari.choix.findIndex((c) => c.juste);
const indexFaux = (id) => etapeDesc(id).pari.choix.findIndex((c) => !c.juste);
const parier = async (i) => {
  await panneau.locator("[data-pari-choix] li button").nth(i).click();
  await deuxImages();
};

const accent = await page.evaluate(() => {
  const c = document.createElement("canvas"); c.width = c.height = 1;
  const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector("[data-scene]")).getPropertyValue("--figure-accent").trim();
  x.fillRect(0, 0, 1, 1);
  return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
});

/** Compare deux captures DANS un navigateur (aucun décodeur PNG à installer). */
async function comparer(a, b) {
  return labo.evaluate(async ({ a, b, accent }) => {
    const lire = async (b64) => {
      const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
      const c = new OffscreenCanvas(img.width, img.height);
      const x = c.getContext("2d");
      x.drawImage(img, 0, 0);
      return x.getImageData(0, 0, img.width, img.height);
    };
    const [A, B] = [await lire(a), await lire(b)];
    let diff = 0;
    for (let i = 0; i < A.data.length; i += 4) {
      const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2]));
      if (d > 24) diff++;
    }
    const centre = (I) => {
      let n = 0, sx = 0, sy = 0;
      for (let y = 0; y < I.height; y++) for (let x = 0; x < I.width; x++) {
        const i = (y * I.width + x) * 4;
        if (Math.abs(I.data[i] - accent[0]) + Math.abs(I.data[i + 1] - accent[1]) + Math.abs(I.data[i + 2] - accent[2]) < 60) { n++; sx += x; sy += y; }
      }
      return n ? { n, x: sx / n, y: sy / n } : { n: 0, x: NaN, y: NaN };
    };
    const ca = centre(A), cb = centre(B);
    return { fraction: diff / (A.width * A.height), deplacement: Math.hypot(ca.x - cb.x, ca.y - cb.y), accentA: ca.n, accentB: cb.n };
  }, { a, b, accent });
}
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages);

// ── 4a. L'étape 1 et son PARI : rien ne s'ouvre avant l'engagement ──
{
  const avant = { pari: await attr("data-pari"), temps: await lanceTempsPresent(), ctl: await controles() };
  const ok = avant.pari === "attente" && !avant.temps && avant.ctl === "";
  noter("paris", ESSAI ? !ok : ok, `étape 1 avant le pari : phase « ${avant.pari} », « Lancer le temps » ${avant.temps ? "PRÉSENT" : "absent"}, contrôles [${avant.ctl}]`);
  // Un pari FAUX (rester au-dessus de P) : le verdict attend que la scène ait montré.
  await parier(etapeDesc("rayon").pari.choix.findIndex((c) => c.id === "reste"));
  const note = { pari: await attr("data-pari"), temps: await lanceTempsPresent(), res: await resultat(), ctl: await controles() };
  const okNote = note.pari === "note" && note.temps && note.res === "" && note.ctl === "";
  noter("paris", okNote, `après le pari, avant 6 h : phase « ${note.pari} », temps ${note.temps ? "ouvert" : "FERMÉ"}, verdict « ${note.res || "(aucun)"} », contrôles [${note.ctl}]`);
  await temps(6);
  const rev = { pari: await attr("data-pari"), res: await resultat(), ctl: await controles(), alt: await lecture("altitude") };
  const okRev = rev.pari === "revele" && (ESSAI ? /Bonne/.test(rev.res) : /incorrecte/.test(rev.res)) && rev.ctl === "rayon" && rev.alt !== "";
  noter("paris", ESSAI ? !okRev : okRev, `à 6 h : phase « ${rev.pari} », verdict « ${rev.res} » (pari faux), contrôles [${rev.ctl}], altitude « ${rev.alt} »`);
}

// ── 3. Les pixels (étape 1, pari révélé : le rayon est ouvert) ──
if (rendu) {
  await rayon(42230);
  await temps(0); const g0 = await capture();
  await temps(6); const g6 = await capture();
  await temps(18); const g18 = await capture();
  const a = await comparer(g0, g6), b = await comparer(g0, g18);
  const identiques = a.fraction <= 0.0005 && b.fraction <= 0.0005 && a.accentA > 0;
  noter("pixels", ESSAI ? !identiques : identiques,
    `géostationnaire, référentiel terrestre : ${(a.fraction * 100).toFixed(3)} % puis ${(b.fraction * 100).toFixed(3)} % de pixels changés entre 0 h, 6 h et 18 h (satellite : ${a.accentA} px d'accent)`);
  await rayon(26000);
  await temps(0); const d0 = await capture();
  await temps(6); const d6 = await capture();
  const c = await comparer(d0, d6);
  const bouge = c.fraction >= 0.002 && c.deplacement >= 10;
  noter("pixels", ESSAI ? !bouge : bouge,
    `26 000 km, référentiel terrestre : ${(c.fraction * 100).toFixed(2)} % de pixels changés, tache d'accent déplacée de ${c.deplacement.toFixed(0)} px en 6 h`);
} else {
  noter("pixels", false, `MUET — la scène n'a pas été rendue (état « ${etatOuvert} ») : rien à dire des pixels`);
}

// ── 4b. Les étapes : chacune pose son état, et n'ouvre son contrôle qu'après le pari ──
await suivant(); // → 2 (plan)
{
  const e = { ctl: await controles(), r: await attr("data-rayon-m"), i: await attr("data-inclinaison"), t: await attr("data-temps-s"), pari: await attr("data-pari") };
  noter("etapes", e.pari === "attente" && e.ctl === "" && e.r === "42230000" && e.i === "30" && e.t === "0",
    `étape 2 : phase « ${e.pari} », contrôles [${e.ctl}], r = ${e.r} m, inclinaison ${e.i}°, t = ${e.t} s`);
  await parier(indexJuste("plan"));
  await temps(24);
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste révélé à 24 h : « ${res} »`);
  const ctl = await controles();
  noter("etapes", ctl === (ESSAI ? "inclinaison,rayon" : "inclinaison") && (await attr("data-geostationnaire")) === "non",
    `étape 2 révélée : contrôles [${ctl}], géostationnaire ${await attr("data-geostationnaire")} (inclinée de 30°)`);
  await regler(panneau.locator('[data-controle="inclinaison"] input'), 0);
  noter("etapes", (await attr("data-geostationnaire")) === "oui", `étape 2, inclinaison ramenée à 0° : géostationnaire ${await attr("data-geostationnaire")}`);
}

await suivant(); // → 3 (sens)
{
  const e = { ref: await attr("data-referentiel"), sens: await attr("data-sens"), geo: await attr("data-geostationnaire") };
  noter("etapes", e.ref === "geocentrique" && e.sens === "retrograde" && e.geo === "non", `étape 3 : référentiel ${e.ref}, sens ${e.sens}, géostationnaire ${e.geo}`);
  await parier(indexJuste("sens"));
  await temps(6);
  const ctl = await controles();
  noter("etapes", ctl === "sens", `étape 3 révélée : contrôles [${ctl}]`);
  await panneau.getByLabel("Même sens que la Terre (vers l’est)").check();
  await deuxImages();
  noter("etapes", (await attr("data-geostationnaire")) === "oui", `étape 3, remis dans le sens de la Terre : géostationnaire ${await attr("data-geostationnaire")}`);
}

await suivant(); // → 4 (référentiel)
{
  const avant = await panneau.locator("[data-lecture='v-geo']").count();
  await parier(indexJuste("referentiel"));
  const e = { ctl: await controles(), vSol: await lecture("v-sol"), vGeo: await lecture("v-geo"), res: await resultat() };
  noter("etapes", avant === 0 && e.ctl === "referentiel" && lireNombre(e.vSol) === 0 && egalAffiche(e.vGeo, vitesse(42230e3) / 1000) && /Bonne/.test(e.res),
    `étape 4 : vitesses cachées avant le pari (${avant}), révélées tout de suite après — v_sol « ${e.vSol} », v « ${e.vGeo} », verdict « ${e.res} »`);
  if (rendu) {
    await panneau.getByLabel(/Géocentrique/).check();
    await temps(0); const h0 = await capture();
    await temps(6); const h6 = await capture();
    const d = await comparer(h0, h6);
    const bouge = d.fraction >= 0.002 && d.deplacement >= 10;
    noter("pixels", ESSAI ? !bouge : bouge,
      `géostationnaire, référentiel GÉOCENTRIQUE : ${(d.fraction * 100).toFixed(2)} % de pixels changés, tache d'accent déplacée de ${d.deplacement.toFixed(0)} px — le même satellite bouge`);
  }
}

await suivant(); // → 5 (libre)
await parier(indexJuste("libre"));
noter("etapes", (await controles()) === "inclinaison,rayon,referentiel,sens", `étape 5 : ouvre [${await controles()}]`);

// ── 2. Les nombres, à l'étape libre où tout est lu ──
{
  const kepler = [];
  const tr = new Map(); // rayon → T/r affiché
  for (const km of [7000, 20000, 42220, 42230, 42240, 60000]) {
    await rayon(km);
    const r = km * 1000;
    const T = periode(r);
    const [tP, tA, tV, tK, tR, t3] = [
      await lecture("periode"), await lecture("altitude"), await lecture("v-geo"),
      await lecture("kepler"), await lecture("t-r"), await lecture("t3-r2"),
    ];
    kepler.push(tK); tr.set(km, tR);
    const ok =
      egalAffiche(tP, T / 3600) && egalAffiche(tA, (r - R_T) / 1000) && egalAffiche(tV, vitesse(r) / 1000) &&
      egalAffiche(tK, (T * T) / (r * r * r)) && egalAffiche(tR, T / r) && egalAffiche(t3, (T * T * T) / (r * r));
    noter("nombres", ok, `r = ${km} km → T « ${tP} » (attendu ${(T / 3600).toFixed(3)} h), h « ${tA} », v « ${tV} », T/r « ${tR} », T²/r³ « ${tK} », T³/r² « ${t3} »`);
    const coche = await panneau.locator("ul li").filter({ hasText: "Une période de 24 h" }).locator('svg[aria-label="rempli"]').count();
    const attenduCoche = Math.abs(T / 3600 - 24) < 0.005;
    noter("nombres", (coche === 1) === attenduCoche, `r = ${km} km → « T = 24 h » ${coche ? "cochée" : "non cochée"}`);
  }
  // CH-KEP-1 : la 3e loi tient, ses rivales cassent — sous les yeux de l'élève.
  // T/r est jugé sur des rayons ÉLOIGNÉS : à trois chiffres significatifs,
  // 42 220, 42 230 et 42 240 km affichent tous 2,05 × 10⁻³ — c'est la
  // précision de l'affichage, pas une rivale qui tiendrait (premier passage :
  // « 4 valeurs sur 6 » accusait le produit d'une limite de la sonde).
  const eloignes = [7000, 20000, 42230, 60000].map((km) => tr.get(km));
  const kUnique = new Set(kepler).size, rUnique = new Set(eloignes).size;
  noter("nombres", kUnique === 1 && rUnique === eloignes.length,
    `T²/r³ affiché ${kUnique === 1 ? "identique" : "VARIABLE"} sur 6 rayons ; T/r prend ${rUnique} valeurs distinctes sur 4 rayons éloignés`);
}

// Le clavier pilote le rayon (source de vérité accessible : le range natif).
// On repart d'un rayon INTÉRIEUR : la boucle des nombres finit au maximum du
// curseur (60 000 km), où une flèche droite ne peut plus rien (premier passage).
await rayon(42230);
const r0 = Number(await attr("data-rayon-m"));
await panneau.locator('[data-controle="rayon"] input[type="range"]').focus();
for (let i = 0; i < 3; i++) await page.keyboard.press("ArrowRight");
await deuxImages();
const r1 = Number(await attr("data-rayon-m"));
noter("clavier", r1 - r0 === 30000, `trois flèches droite : r passe de ${r0 / 1000} à ${r1 / 1000} km`);

// Le temps ne coule que lancé, s'arrête à la pause, et une course s'arrête
// d'elle-même à la rotation terrestre suivante (24 h).
await temps(0);
await panneau.getByRole("button", { name: "Lancer le temps" }).click();
// On attend que le temps AVANCE, sans supposer une vitesse d'horloge : sous
// rendu logiciel (SwiftShader, la CI), une image prend ~130 ms — un délai fixe
// mesurait la lenteur du banc, pas le produit (premier passage de cette porte).
await page.waitForFunction(() => Number(document.querySelector("[data-scene]")?.getAttribute("data-temps-s")) > 0, null, { timeout: 15000 }).catch(() => {});
const tLance = Number(await attr("data-temps-s"));
await panneau.getByRole("button", { name: "Pause" }).click();
await deuxImages();
const tPause = Number(await attr("data-temps-s"));
await page.waitForTimeout(700);
const tApres = Number(await attr("data-temps-s"));
await temps(23.5);
await panneau.getByRole("button", { name: "Lancer le temps" }).click();
// On attend la BUTÉE (t ≥ 24 h) ET le retour du bouton « Lancer » : juste après
// le clic, l'ancien bouton existe encore — attendre le seul bouton répondrait
// avant que la course ait commencé.
await page.waitForFunction(() => {
  const sc = document.querySelector("[data-scene]");
  const b = [...(sc?.querySelectorAll("button") ?? [])].some((x) => /Lancer le temps/.test(x.textContent ?? ""));
  return Number(sc?.getAttribute("data-temps-s")) >= 86400 && b;
}, null, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(500); // une course qui ne s'arrêterait pas aurait avancé d'ici là
const tButee = Number(await attr("data-temps-s"));
noter("temps", tLance > 0 && tPause === tApres && tButee === 86400,
  `lancé : t = ${tLance} s ; en pause, t reste ${tPause} → ${tApres} s ; lancé à 23,5 h, la course s'arrête seule à ${tButee} s (24 h = 86400 s)`);

// Le thème sombre repeint le fond (les couleurs sont LUES sur les jetons).
if (rendu) {
  // Le fond = la couleur DOMINANTE du canvas. Un pixel de coin, premier essai,
  // tombait dans l'arrondi du conteneur (overflow hidden) et lisait le fond de
  // la PAGE : la sonde mesurait autre chose que ce qu'elle nommait.
  const fond = async () => labo.evaluate(async (b64) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const n = new Map();
    for (let i = 0; i < d.length; i += 4) { const k = (d[i] << 16) | (d[i + 1] << 8) | d[i + 2]; n.set(k, (n.get(k) ?? 0) + 1); }
    const [k] = [...n].sort((a, b) => b[1] - a[1])[0];
    return [(k >> 16) & 255, (k >> 8) & 255, k & 255];
  }, await capture());
  const jeton = () => page.evaluate(() => {
    const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
    x.fillStyle = getComputedStyle(document.querySelector("[data-scene]")).getPropertyValue("--figure-surface").trim();
    x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
  });
  const proche = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jClair = await jeton();
  await page.evaluate(() => document.documentElement.classList.add("dark"));
  await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), jSombre = await jeton();
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", proche(clair, jClair) && proche(sombre, jSombre) && !proche(clair, sombre),
    `fond clair ${clair} (jeton ${jClair}) ; fond sombre ${sombre} (jeton ${jSombre})`);
}

noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── 5. Sans WebGL : l'état honnête, et les calculs qui restent ──
// Un second navigateur, WebGL coupé. La scène doit le DIRE (état
// « sans-webgl », message visible) et garder ce qui ne dépend pas du rendu :
// le curseur de rayon et les lectures, toujours justes (feuille de charge,
// risque 9). Sinon l'élève sans 3D perdrait aussi la physique.
{
  const nav2 = await chromium.launch({
    executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
    args: ["--disable-webgl", "--disable-3d-apis"],
  });
  const p2 = await (await nav2.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p2.goto(`${BASE}${LECON}?chapitre=${chapitre}`, { waitUntil: "load", timeout: 60000 });
  await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const q = p2.locator('[data-scene="orbite-geostationnaire"]');
  await q.scrollIntoViewIfNeeded();
  await p2.waitForFunction(
    () => { const b = [...document.querySelectorAll("[data-scene] button")].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; },
    null, { timeout: 40000 }
  ).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p2.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
  const etat2 = await q.getAttribute("data-scene-etat");
  const message = await q.getByText("WebGL indisponible", { exact: false }).count();
  // Sans 3D, le pari et le temps fonctionnent : on parie, on avance à 6 h
  // (le curseur de temps), et le rayon s'ouvre comme ailleurs.
  await q.locator("[data-pari-choix] li button").nth(indexJuste("rayon")).click().catch(() => {});
  await q.locator('[role="group"][aria-label="Le temps"] input[type="range"]').evaluate((el) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, "6"); el.dispatchEvent(new Event("input", { bubbles: true }));
  }).catch(() => {});
  await p2.waitForTimeout(150);
  await q.locator('input[type="number"]').evaluate((el) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, "42230"); el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await p2.waitForTimeout(150);
  const tSans = (await q.locator('[data-lecture="periode"]').textContent())?.trim() ?? "";
  const attendu = ESSAI ? "prete" : "sans-webgl";
  noter("sans-webgl", etat2 === attendu && message === 1 && egalAffiche(tSans, periode(42230e3) / 3600),
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"}, et à 42 230 km la période lue reste « ${tSans} »`);
  await nav2.close();
}

// ── Verdict ──
const familles = [...new Set(resultats.map((r) => r.famille))];
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-orbite : la scène 3D de l'orbite géostationnaire (${BASE}${LECON}?chapitre=${chapitre})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);

if (!rendu) {
  console.error("\nMUET — WebGL n'a pas dessiné ici : la porte ne peut rien dire des pixels, elle ne sera pas verte.");
  process.exit(3);
}
if (ESSAI) {
  // Chaque famille dont on a retourné l'attente doit avoir crié.
  const visees = ["avant-clic", "nombres", "pixels", "etapes", "paris", "sans-webgl"];
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
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles.length} familles.` : `\nVERT — ${resultats.length} mesures, ${familles.length} familles.`);
process.exit(rouges.length ? 1 : 0);
