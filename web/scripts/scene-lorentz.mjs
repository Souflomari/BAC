#!/usr/bin/env node
/**
 * scene-lorentz.mjs — la scène 3D « une particule chargée dans un champ
 * magnétique » dit-elle VRAI ?
 *
 * Troisième scène de première partie (pc/chute-mouvements-plans, R6 ;
 * ADR 0041). Même principe que `scene-orbite` et `scene-sphere` : on vérifie
 * le RENDU RÉEL (next start, Chromium en WebGL par SwiftShader), jamais le code.
 *
 *   1. RIEN AVANT LE CLIC — `window.__THREE__` indéfini tant que la scène est
 *      fermée.
 *   2. LES NOMBRES — R = m v₀ / (|q| B), F = |q| v B et la déviation
 *      sin θ = ℓ / R, recalculés ICI par une seconde implémentation (et non en
 *      important `lorentz.ts`), aux constantes de la leçon. L'exemple travaillé
 *      (électron, 1,0 × 10⁷ m/s, 1,0 mT, couloir de 2,0 cm) doit s'afficher tel
 *      quel : R ≈ 5,7 cm, θ ≈ 21° ; et un champ assez fort pour que R < ℓ doit
 *      dire « demi-tour », pas un angle.
 *   3 bis. LE GLYPHE — vu comme la figure du manuel, le champ entrant se lit ⊗
 *      (une croix dans l'anneau), le sortant ⊙ (un point) ; lu à l'échelle de
 *      l'écran, entre deux repères que le produit pose (voir glypheLu).
 *   3. LES PIXELS, le cœur — le CÔTÉ où la trajectoire s'infléchit, lu sur
 *      l'image pour les quatre couples (électron/positon × entrant/sortant) :
 *      la tache d'accent (la trajectoire d'un tour) se décale du point
 *      d'entrée vers le côté que donne F = q v ∧ B, et vers l'autre si l'on
 *      retourne UN signe. Et doubler B divise par deux le cercle DESSINÉ.
 *   4. LA VITESSE — lue pendant la course, à plusieurs instants : la même,
 *      toujours ; l'angle entre F et v, 90°. La force ne travaille pas.
 *   5. LES PARIS — rien ne s'ouvre avant l'engagement ; le verdict attend que
 *      la particule ait parcouru la fraction de course annoncée.
 *   6. AVANT LE PARI, RIEN NE RÉPOND (§11.190) — ni la fiche, ni la flèche F
 *      (son étiquette reste cachée), ni une description qui dirait l'issue.
 *   7. LES ÉTAPES — chacune pose son état et n'ouvre que son contrôle.
 *   8. AUCUN LaTeX BRUT dans le panneau ouvert.
 *   (+ clavier, thème sombre, état sans WebGL, aucune erreur console.)
 *
 * La porte LANCE la particule et attend la course, en temps réel (2 ns de vol
 * par seconde) : c'est le produit qui avance, pas un curseur qu'on pousse.
 *
 * QUATRE VERDICTS (ADR 0034) : sans WebGL au banc, MUET — en échec.
 * `--essai-rouge` retourne l'attente de chaque famille — dont la misconception
 * même de la leçon : un rayon qui CROÎTRAIT avec B, et le côté pris sur
 * v ∧ B sans le signe de q.
 *
 *   node scripts/scene-lorentz.mjs --porte
 *   node scripts/scene-lorentz.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_LORENTZ ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/chute-mouvements-plans";
const SCENE = "particule-champ-magnetique";

// ── La seconde physique (constantes de la leçon, R6) ─────────────────────
const Q = 1.6e-19;
const M = 9.1e-31;
const ELL = 2.0; // cm
/** R en cm — pour CHRONOMÉTRER la course : jamais saboté (la porte doit
 *  attendre le vrai quart de tour, même en essai rouge). */
const rayonVrai = (B, v0) => ((M * v0 * 1e7) / (Q * B * 1e-3)) * 100;
/** R en cm — ce que l'affichage DOIT dire. L'essai rouge prend la
 *  misconception : un rayon qui CROÎT avec B. */
const rayonCm = (B, v0) => (ESSAI ? rayonVrai(1, v0) * B : rayonVrai(B, v0));
const forceN = (B, v) => Q * v * 1e7 * B * 1e-3;
const deviationDeg = (B, v0) => {
  const R = rayonCm(B, v0);
  return R > ELL ? (Math.asin(ELL / R) * 180) / Math.PI : null;
};
/** Le côté (+1 : le haut de la figure) : F = q v ∧ B, v = +x, x̂ ∧ ẑ = −ŷ. */
const coteAttendu = (particule, sens) => {
  const q = particule === "electron" ? -1 : 1;
  const bz = sens === "sortant" ? 1 : -1;
  const s = -q * bz;
  return ESSAI ? -s : s;
};

const CHIFFRES = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };
/** « ≈ 5,7 cm » → 5.7 ; « 1,6 × 10⁻¹⁵ N » → 1.6e-15 ; « ≈ 21° » → 21. */
function lireNombre(texte) {
  const t = (texte ?? "").replace(/[\s  ]/g, "");
  const sci = t.match(/(-?\d+(?:,\d+)?)×10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)/);
  if (sci) return parseFloat(sci[1].replace(",", ".")) * 10 ** parseInt([...sci[2]].map((c) => CHIFFRES[c]).join(""), 10);
  const m = t.match(/-?\d+(?:,\d+)?/);
  return m ? parseFloat(m[0].replace(",", ".")) : NaN;
}
const decimalesR = (R) => (R < 1 ? 2 : R < 10 ? 1 : 0);
const procheR = (lu, R) => Math.abs(lu - R) <= 0.5 * 10 ** -decimalesR(R) + 1e-9;
const procheF = (lu, F) => {
  const e = Math.floor(Math.log10(F));
  return Math.abs(lu - F) <= 0.05 * 10 ** e * 1.0001;
};

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
    console.error("scene-lorentz : `next start` n'a pas répondu. Build absent ?");
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/chute-mouvements-plans/media/champ-magnetique.json", import.meta.url), "utf-8"));
const pariDe = (id) => descripteur.etapes.find((e) => e.id === id).pari;
const indexJuste = (id) => pariDe(id).choix.findIndex((c) => c.juste);
const indexDe = (id, choix) => pariDe(id).choix.findIndex((c) => c.id === choix);

// ── Aller à la scène (le chapitre se lit dans le DOM) ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) {
  console.error(`scene-lorentz : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`);
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
await page.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="particule-champ-magnetique"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
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
const champ = (v) => regler('[data-controle="champ"] input', v);
const vitesse = (v) => regler('[data-controle="vitesse"] input', v);
const attr = (n) => panneau.getAttribute(n);
const lecture = async (cle) => ((await panneau.locator(`[data-lecture="${cle}"]`).first().textContent().catch(() => "")) ?? "").trim();
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages);
const boutonCourse = () => panneau.locator('[role="group"][aria-label="La course de la particule"] button').first();
const courseOuverte = async () => (await panneau.locator('[role="group"][aria-label="La course de la particule"]').count()) > 0;
const fiches = () => panneau.locator("[data-fiche]").count();
const descriptionCanvas = async () => (await panneau.locator("canvas").getAttribute("aria-label").catch(() => "")) ?? "";
const ISSUE_DITE = /cercle de rayon|dévié|demi-tour|ressort/;
const etiquetteFVisible = () => panneau.evaluate((el) => {
  const f = el.querySelector('[data-etiquette="F"]');
  return f ? getComputedStyle(f).visibility === "visible" : null;
});
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(vec|wedge|dfrac|frac|theta|text)\b/g) ?? [];
const capture = async () => (await panneau.locator("canvas").screenshot()).toString("base64");

/** Lance la course et attend qu'elle soit finie (temps réel : 2 ns de vol par seconde). */
async function courseComplete() {
  if ((await attr("data-course-finie")) === "oui") {
    await panneau.getByRole("button", { name: /départ/i }).first().click().catch(() => {});
    await deuxImages();
  }
  await boutonCourse().click();
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
  await deuxImages();
  await page.waitForTimeout(120);
}
async function lancerJusqua(ns) {
  await boutonCourse().click();
  await page.waitForFunction(({ sc, ns }) => parseFloat(document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-t-ns") ?? "0") >= ns, { sc: SCENE, ns }, { timeout: 60000 }).catch(() => {});
}

const accent = await page.evaluate(() => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector('[data-scene="particule-champ-magnetique"]')).getPropertyValue("--figure-accent").trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
});
const encreDouce = await page.evaluate(() => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector('[data-scene="particule-champ-magnetique"]')).getPropertyValue("--figure-ink-soft").trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
});
/** La tache d'accent (particule + trajectoire) : combien, son centre, sa hauteur. */
async function accentDe(b64) {
  return labo.evaluate(async ({ b64, accent }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    let n = 0, sx = 0, sy = 0, ymin = Infinity, ymax = -Infinity;
    for (let y = 0; y < img.height; y++) for (let px = 0; px < img.width; px++) {
      const i = (y * img.width + px) * 4;
      if (Math.abs(d[i] - accent[0]) + Math.abs(d[i + 1] - accent[1]) + Math.abs(d[i + 2] - accent[2]) < 60) { n++; sx += px; sy += y; ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); }
    }
    return { n, x: n ? sx / n : NaN, y: n ? sy / n : NaN, hauteur: n ? ymax - ymin : 0 };
  }, { b64, accent });
}

/**
 * 3 bis. LE GLYPHE DIT CE QU'IL VEUT DIRE. Vu comme la figure du manuel, une
 * flèche de champ ENTRANT montre son empennage (une croix dans l'anneau : ⊗),
 * une flèche SORTANT sa pointe (un point : ⊙). Le produit pose deux repères
 * invisibles : le centre d'un glyphe et le bord de son anneau — la sonde lit
 * donc À L'ÉCHELLE DE L'ÉCRAN, en fractions du rayon R, jamais en pixels :
 *   - l'anneau : sur le cercle de rayon R (24 angles), un trait ?
 *   - les bras : sur les deux diagonales, de 0,45 R à 0,65 R, un trait à ±0,2 R
 *     (la perspective décale l'empennage, 0,7 cm au-dessus de l'anneau, d'un
 *     pixel ou deux — la tolérance suit l'échelle) ;
 *   - le plein : la part du disque central (ρ ≤ 0,2 R) couverte d'encre opaque.
 * ⊗ : anneau ≥ 75 %, bras ≥ 75 %, plein ≤ 50 %. ⊙ : anneau ≥ 75 %, plein ≥
 * 80 %, bras ≤ 35 %. Les deux ne peuvent pas être vrais ensemble.
 *
 * Mesuré avant d'être cru (§11.191) : à 1280/×1 par cette porte, deux fois ;
 * à 768/×1, 390/×2 et 390/×3 par la même fonction lancée à la main — ⊗ : bras
 * 95-100 %, plein 0-24 % ; ⊙ : bras 0-10 %, plein 92-100 %. La PREMIÈRE sonde (le rayon lu sur l'image, des bras cherchés au
 * pixel près) était ROUGE sur un produit juste : à 6 px de rayon, la tête du ⊙
 * débordait sur sa bande, et la croix du ⊗, décalée d'un pixel, passait entre
 * ses échantillons. C'était la sonde (ADR 0034). Trouvé à l'écran, avant : la
 * tête d'une flèche entrante dessinait un disque, et le ⊗ se lisait ⊙.
 */
async function glypheLu() {
  const b64 = await capture();
  const pos = await panneau.evaluate((el) => {
    const c = el.querySelector("canvas").getBoundingClientRect();
    const centre = (sel) => { const r = el.querySelector(sel).getBoundingClientRect(); return [r.left + r.width / 2 - c.left, r.top + r.height / 2 - c.top]; };
    const [x, y] = centre('[data-etiquette="glyphe"]');
    const [bx, by] = centre('[data-etiquette="glyphe-bord"]');
    return { x, y, bx, by, dpr: devicePixelRatio };
  });
  return labo.evaluate(async ({ b64, pos, encreDouce }) => {
    const img = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const c = new OffscreenCanvas(img.width, img.height); const x = c.getContext("2d"); x.drawImage(img, 0, 0);
    const d = x.getImageData(0, 0, img.width, img.height).data;
    const k = pos.dpr, cx = pos.x * k, cy = pos.y * k;
    const R = Math.hypot(pos.bx - pos.x, pos.by - pos.y) * k;
    const px = (u, v) => { const i = (Math.round(v) * img.width + Math.round(u)) * 4; return [d[i], d[i + 1], d[i + 2]]; };
    // le fond : la couleur la plus fréquente autour du glyphe
    const compte = new Map(), P = Math.ceil(1.6 * R);
    for (let v = -P; v <= P; v++) for (let u = -P; u <= P; u++) { const q = px(cx + u, cy + v).join(","); compte.set(q, (compte.get(q) ?? 0) + 1); }
    const fond = [...compte.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map(Number);
    const ecart = (p) => Math.abs(p[0] - fond[0]) + Math.abs(p[1] - fond[1]) + Math.abs(p[2] - fond[2]);
    const trace = (p) => ecart(p) > 45;
    let anneau = 0;
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI) / 12, ux = Math.cos(a), uy = Math.sin(a), tol = Math.max(1, 0.12 * R);
      let vu = false;
      for (let t = -tol; t <= tol && !vu; t += 0.5) vu = trace(px(cx + (R + t) * ux, cy + (R + t) * uy));
      if (vu) anneau++;
    }
    let bras = 0, total = 0;
    for (const [dx, dy] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const ux = dx / Math.SQRT2, uy = dy / Math.SQRT2;
      for (let r = 0.45 * R; r <= 0.65 * R; r += 0.5) {
        total++;
        let vu = false;
        for (let t = -0.2 * R; t <= 0.2 * R && !vu; t += 0.5) vu = trace(px(cx + r * ux - t * uy, cy + r * uy + t * ux));
        if (vu) bras++;
      }
    }
    const opaque = 0.7 * ecart(encreDouce);
    let pleins = 0, n = 0;
    const rc = 0.2 * R, m = Math.ceil(rc);
    for (let v = -m; v <= m; v++) for (let u = -m; u <= m; u++) {
      if (u * u + v * v > rc * rc) continue;
      n++; if (ecart(px(cx + u, cy + v)) > opaque) pleins++;
    }
    return { R: Math.round(R * 10) / 10, anneau: anneau / 24, bras: total ? bras / total : 0, plein: n ? pleins / n : 0 };
  }, { b64, pos, encreDouce });
}
const croix = (g) => g.anneau >= 0.75 && g.bras >= 0.75 && g.plein <= 0.5;
const point = (g) => g.anneau >= 0.75 && g.plein >= 0.8 && g.bras <= 0.35;
const pc = (x) => `${Math.round(x * 100)} %`;
const glypheDit = (g) => `${croix(g) ? "⊗" : point(g) ? "⊙" : "ni ⊗ ni ⊙"} (anneau ${pc(g.anneau)}, bras ${pc(g.bras)}, plein ${pc(g.plein)})`;

/** 6. Avant le pari : ni fiche, ni flèche F, ni issue dans la description. */
async function avantPari(ou) {
  const f = await fiches(), desc = await descriptionCanvas(), fVisible = await etiquetteFVisible();
  // `null` : l'étiquette n'existe pas — la sonde ne voit rien, ce n'est pas un « caché ».
  const muet = f === 0 && fVisible === false && !ISSUE_DITE.test(desc) && desc.length > 0;
  noter("avant-pari", ESSAI ? !muet : muet,
    `${ou}, avant le pari : fiche ${f ? "AFFICHÉE" : "absente"}, étiquette F ${fVisible === null ? "INTROUVABLE" : fVisible ? "VISIBLE" : "cachée"}, description « ${desc.slice(0, 100)}${desc.length > 100 ? "…" : ""} »`);
}

// ── Étape 1 : le côté ──
{
  const avant = { pari: await attr("data-pari"), ctl: await controles(), course: await courseOuverte() };
  const ok = avant.pari === "attente" && avant.ctl === "" && !avant.course;
  noter("paris", ESSAI ? !ok : ok, `étape 1 avant le pari : phase « ${avant.pari} », contrôles [${avant.ctl}], course ${avant.course ? "OUVERTE" : "fermée"}`);
  await avantPari("étape 1 (le côté)");
  // Un pari FAUX : la misconception — le côté de v ∧ B, sans le signe de q.
  await parier(indexDe("sens", "haut"));
  const note = { pari: await attr("data-pari"), res: await resultat(), course: await courseOuverte(), ctl: await controles() };
  noter("paris", note.pari === "note" && note.res === "" && note.course && note.ctl === "",
    `pari posé, course non lancée : phase « ${note.pari} », verdict « ${note.res || "(aucun)"} », course ${note.course ? "ouverte" : "FERMÉE"}, contrôles [${note.ctl}]`);
  // Le verdict attend un quart de tour : T = 2πR/v₀, aux valeurs que l'étape POSE
  // (lues dans le descripteur, pas recopiées ici).
  const e1 = descripteur.etapes[0].etat;
  const T = (2 * Math.PI * rayonVrai(e1.B_mT, e1.v0)) / e1.v0; // ns
  await lancerJusqua(T / 8);
  await boutonCourse().click(); // pause
  await deuxImages();
  const tot = { pari: await attr("data-pari"), res: await resultat() };
  noter("paris", tot.pari === "note" && tot.res === "", `à un huitième de tour : phase « ${tot.pari} », verdict « ${tot.res || "(aucun)"} » (il attend le quart)`);
  await lancerJusqua(T / 4 + 0.2);
  await page.waitForTimeout(150);
  const rev = { pari: await attr("data-pari"), res: await resultat(), ctl: await controles() };
  const okRev = rev.pari === "revele" && (ESSAI ? /Bonne/.test(rev.res) : /incorrecte/.test(rev.res)) && rev.ctl === "particule";
  noter("paris", ESSAI ? !okRev : okRev, `au quart de tour : phase « ${rev.pari} », verdict « ${rev.res} » (pari faux), contrôles [${rev.ctl}]`);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape 1 révélée : ${brut} fragment(s) de LaTeX brut`);
  const f = await fiches();
  noter("avant-pari", ESSAI ? f !== 0 : f === 1, `étape 1 révélée : fiche ${f ? "affichée" : "ABSENTE"}`);
}

// ── 3. Les pixels : le côté, électron puis positon (étape 1, champ entrant) ──
async function coteLu() {
  // La particule seule, au point d'entrée, puis un tour complet : la tache
  // d'accent (le cercle entier) se centre sur C = (0, σR).
  await panneau.getByRole("button", { name: /départ/i }).first().click();
  await deuxImages();
  const depart = await accentDe(await capture());
  await courseComplete();
  const tour = await accentDe(await capture());
  const dy = tour.y - depart.y; // vers le BAS de l'image si > 0
  return { cote: Math.abs(dy) < 5 ? 0 : dy > 0 ? -1 : 1, dy, hauteur: tour.hauteur, n: tour.n };
}
if (rendu) {
  const e1 = await coteLu();
  const attenduE = coteAttendu("electron", "entrant");
  noter("pixels", e1.cote === attenduE, `électron, champ entrant : la tache d'accent se décale de ${e1.dy.toFixed(0)} px (${e1.cote === 1 ? "vers le haut" : e1.cote === -1 ? "vers le bas" : "nulle part"}) — attendu ${attenduE === 1 ? "le haut" : "le bas"}`);
  await panneau.getByLabel(/Un positon/).check(); await deuxImages();
  const p1 = await coteLu();
  const attenduP = coteAttendu("positon", "entrant");
  noter("pixels", p1.cote === attenduP, `positon, champ entrant : décalage ${p1.dy.toFixed(0)} px (${p1.cote === 1 ? "vers le haut" : p1.cote === -1 ? "vers le bas" : "nulle part"}) — attendu ${attenduP === 1 ? "le haut" : "le bas"}`);
  await panneau.getByLabel(/Un électron/).check(); await deuxImages();
} else {
  noter("pixels", false, `MUET — la scène n'a pas été rendue (état « ${etatOuvert} »)`);
}

// ── Étape 2 : la vitesse ──
await suivant();
{
  const e = { ctl: await controles(), b: await attr("data-b"), reg: await attr("data-region"), pari: await attr("data-pari"), t: await attr("data-t-ns") };
  const e2 = descripteur.etapes[1].etat;
  noter("etapes", e.pari === "attente" && e.ctl === "" && e.b === String(e2.B_mT) && e.reg === "partout" && e.t === "0",
    `étape 2 : phase « ${e.pari} », contrôles [${e.ctl}], B = ${e.b} mT, champ ${e.reg}, t = ${e.t} ns`);
  await avantPari("étape 2 (la vitesse)");
  await parier(indexJuste("vitesse"));
  await courseComplete();
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 2, pari juste, révélé après un tour : « ${res} »`);
  const ctl = await controles();
  noter("etapes", ctl === (ESSAI ? "particule,vitesse" : "vitesse"), `étape 2 révélée : contrôles [${ctl}]`);
  // 4. La vitesse, lue PENDANT la course, à plusieurs instants.
  await panneau.getByRole("button", { name: /départ/i }).first().click(); await deuxImages();
  await boutonCourse().click();
  const vus = [], angles = [], forces = [];
  const T2 = (2 * Math.PI * rayonVrai(e2.B_mT, e2.v0)) / e2.v0;
  for (const ns of [0.1, 0.35, 0.6, 0.85].map((f) => f * T2)) {
    await page.waitForFunction(({ sc, ns }) => parseFloat(document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-t-ns") ?? "0") >= ns, { sc: SCENE, ns }, { timeout: 30000 }).catch(() => {});
    vus.push(await lecture("v")); angles.push(await lecture("angle")); forces.push(await lecture("F"));
  }
  const vConst = vus.every((v) => Math.abs(lireNombre(v) - e2.v0 * 1e7) < 1e3) && new Set(vus).size === 1;
  const angle90 = angles.every((a) => lireNombre(a) === 90);
  const fConst = forces.every((f) => procheF(lireNombre(f), forceN(e2.B_mT, e2.v0)));
  const ok = vConst && angle90 && fConst;
  noter("vitesse", ESSAI ? !ok : ok, `pendant la course (à 10, 35, 60 et 85 % du tour) : v « ${[...new Set(vus)].join(" | ")} », angle « ${[...new Set(angles)].join(" | ")} », F « ${[...new Set(forces)].join(" | ")} »`);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
}

// ── Étape 3 : le rayon ──
await suivant();
{
  const e = { b: await attr("data-b"), pari: await attr("data-pari") };
  const e3 = descripteur.etapes[2].etat;
  noter("etapes", e.b === String(e3.B_mT) && e3.B_mT === 2 * e3.trace_B_mT && e.pari === "attente", `étape 3 : B = ${e.b} mT (le double de ${e3.trace_B_mT}), phase « ${e.pari} »`);
  await avantPari("étape 3 (le rayon)");
  await parier(indexJuste("rayon"));
  await courseComplete();
  const res = await resultat();
  noter("paris", ESSAI ? !/Bonne/.test(res) : /Bonne/.test(res), `étape 3, pari juste, révélé après un tour : « ${res} »`);
  const rFort = await lecture("R");
  const hFort = rendu ? (await accentDe(await capture())).hauteur : 0;
  await champ(e3.trace_B_mT);
  const rFaible = await lecture("R");
  let hFaible = 0;
  if (rendu) { await courseComplete(); hFaible = (await accentDe(await capture())).hauteur; }
  const okN = procheR(lireNombre(rFort), rayonCm(e3.B_mT, e3.v0)) && procheR(lireNombre(rFaible), rayonCm(e3.trace_B_mT, e3.v0));
  noter("nombres", okN, `v₀ = ${e3.v0} : R lu « ${rFort} » à ${e3.B_mT} mT, « ${rFaible} » à ${e3.trace_B_mT} mT — attendu ${rayonCm(e3.B_mT, e3.v0).toFixed(3)} et ${rayonCm(e3.trace_B_mT, e3.v0).toFixed(3)} cm`);
  if (rendu) {
    const rapport = hFort / hFaible;
    const okP = rapport > 0.4 && rapport < 0.62;
    noter("pixels", ESSAI ? !okP : okP, `hauteur du cercle DESSINÉ : ${hFort} px à ${e3.B_mT} mT, ${hFaible} px à ${e3.trace_B_mT} mT — rapport ${rapport.toFixed(2)} (attendu ½)`);
  }
}

// ── Étape 4 : le couloir — l'exemple travaillé ──
await suivant();
{
  const e = { b: await attr("data-b"), reg: await attr("data-region"), v0: await attr("data-v0") };
  noter("etapes", e.b === "1" && e.reg === "couloir" && e.v0 === "1", `étape 4 : B = ${e.b} mT, champ ${e.reg}, v₀ = ${e.v0} × 10⁷ m/s (l'exemple travaillé)`);
  await avantPari("étape 4 (le couloir)");
  await parier(indexJuste("couloir"));
  await courseComplete();
  const R = await lecture("R"), th = await lecture("theta");
  const okEx = /5,7/.test(R) && /21/.test(th) && procheR(lireNombre(R), rayonCm(1, 1)) && Math.abs(lireNombre(th) - deviationDeg(1, 1)) <= 0.5;
  noter("nombres", okEx, `exemple travaillé : R « ${R} », θ « ${th} » (attendu ≈ 5,7 cm et ≈ 21°)`);
  // R < ℓ : demi-tour, et plus d'angle à lire.
  await champ(3);
  const th3 = await lecture("theta"), iss = (await panneau.locator("[data-issue]").textContent().catch(() => "")) ?? "";
  const okDT = (deviationDeg(3, 1) === null) === /demi-tour/.test(th3) && /demi-tour/.test(iss) === (deviationDeg(3, 1) === null);
  noter("nombres", okDT, `B = 3,0 mT (R ≈ ${rayonCm(3, 1).toFixed(2)} cm, ℓ = 2,0 cm) : θ « ${th3} », issue « ${iss.trim().slice(0, 80)} »`);
}

// ── Étape 5 : libre — les quatre couples, et les nombres ──
await suivant();
{
  const e = { p: await attr("data-particule"), s: await attr("data-sens") };
  noter("etapes", e.p === "positon" && e.s === "sortant", `étape 5 : ${e.p}, champ ${e.s}`);
  await avantPari("étape 5 (deux inversions)");
  await parier(indexJuste("libre"));
  await lancerJusqua(3);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 30000 }).catch(() => {});
  const ctl = await controles();
  noter("etapes", ctl === "champ,particule,region,sens,vitesse", `étape 5 : ouvre [${ctl}]`);
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});

  if (rendu) {
    // 3 bis. Le glyphe, vu comme la figure du manuel, particule au départ.
    await panneau.getByRole("button", { name: /départ/i }).first().click(); await deuxImages();
    const sortant = await glypheLu();
    await panneau.getByLabel(/Entrant/).check(); await deuxImages();
    const entrant = await glypheLu();
    await panneau.getByLabel(/Sortant/).check(); await deuxImages();
    const ok = croix(entrant) && point(sortant);
    noter("glyphe", ESSAI ? !ok : ok,
      `vu comme le manuel (anneau de ${entrant.R} px) : champ entrant → ${glypheDit(entrant)} ; sortant → ${glypheDit(sortant)}`);
    // Les deux couples restants, champ SORTANT (3,0 mT, v₀ = 1,0 : un tour en 4 s).
    await champ(3);
    for (const particule of ["positon", "electron"]) {
      await panneau.getByLabel(particule === "positon" ? /Un positon/ : /Un électron/).check(); await deuxImages();
      const c = await coteLu();
      const attendu = coteAttendu(particule, "sortant");
      noter("pixels", c.cote === attendu, `${particule}, champ sortant : décalage ${c.dy.toFixed(0)} px (${c.cote === 1 ? "vers le haut" : c.cote === -1 ? "vers le bas" : "nulle part"}) — attendu ${attendu === 1 ? "le haut" : "le bas"}`);
    }
  }

  // 2. Les nombres, sur la grille — champ partout, au départ (la particule est
  // dans le champ, F = |q| v₀ B).
  await panneau.getByLabel(/Dans tout l’espace|Dans tout l'espace/).check(); await deuxImages();
  const essais = [[2, 1], [0.5, 2], [3, 0.5], [1.3, 1.7], [2.7, 0.9]];
  for (const [B, v0] of essais) {
    await champ(B); await vitesse(v0);
    const [R, F] = [await lecture("R"), await lecture("F")];
    const ok = procheR(lireNombre(R), rayonCm(B, v0)) && procheF(lireNombre(F), forceN(B, v0));
    noter("nombres", ok, `B = ${B} mT, v₀ = ${v0} × 10⁷ m/s → R « ${R} » (attendu ${rayonCm(B, v0).toFixed(3)}), F « ${F} » (attendu ${forceN(B, v0).toExponential(2)})`);
  }
  // Et la déviation, au couloir.
  await panneau.getByLabel(/couloir/).check(); await deuxImages();
  for (const [B, v0] of [[1, 1], [0.5, 1.5], [2.5, 1.2], [2.9, 1]]) {
    await champ(B); await vitesse(v0);
    const th = await lecture("theta");
    const att = deviationDeg(B, v0);
    const ok = att === null ? /demi-tour/.test(th) : Math.abs(lireNombre(th) - att) <= 0.5;
    noter("nombres", ok, `couloir, B = ${B} mT, v₀ = ${v0} → θ « ${th} » (attendu ${att === null ? "demi-tour" : `${att.toFixed(2)}°`})`);
  }
  const brut = (await latexBrut()).length;
  noter("latex", ESSAI ? brut > 0 : brut === 0, `étape libre : ${brut} fragment(s) de LaTeX brut`);
}

// Le clavier pilote le champ (le range natif est la source de vérité).
{
  await champ(2);
  await panneau.locator('[data-controle="champ"] input').focus();
  await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  await deuxImages();
  const b = Number(await attr("data-b"));
  noter("clavier", Math.abs(b - 2.2) < 1e-9, `deux flèches droite depuis 2,0 mT : B = ${b} mT`);
}

// Le thème sombre repeint le fond (couleur dominante du canvas).
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
    x.fillStyle = getComputedStyle(document.querySelector('[data-scene="particule-champ-magnetique"]')).getPropertyValue("--figure-surface").trim();
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

// ── Sans WebGL : l'état honnête, et la course qui reste ──
{
  const nav2 = await lancer(["--disable-webgl", "--disable-3d-apis"]);
  const p2 = await (await nav2.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
  await p2.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
  await p2.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  const q = p2.locator(`[data-scene="${SCENE}"]`);
  await q.scrollIntoViewIfNeeded();
  await p2.waitForFunction(() => { const b = [...document.querySelectorAll('[data-scene="particule-champ-magnetique"] button')].find((x) => x.textContent?.includes("Ouvrir la scène 3D")); return b && !b.disabled; }, null, { timeout: 40000 }).catch(() => {});
  await q.getByRole("button", { name: "Ouvrir la scène 3D" }).click();
  await p2.waitForSelector('[data-scene-etat="prete"], [data-scene-etat="sans-webgl"], [data-scene-etat="erreur"]', { timeout: 40000 }).catch(() => {});
  const etat2 = await q.getAttribute("data-scene-etat");
  const message = await q.getByText("WebGL indisponible", { exact: false }).count();
  await q.locator("[data-pari-choix] li button").nth(indexJuste("sens")).click().catch(() => {});
  await q.locator('[role="group"][aria-label="La course de la particule"] button').first().click().catch(() => {});
  await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 30000 }).catch(() => {});
  const phase = await q.getAttribute("data-pari");
  const ctl = await q.locator("[data-controle]").count();
  noter("sans-webgl", etat2 === (ESSAI ? "prete" : "sans-webgl") && message === 1 && phase === "revele" && ctl === 1,
    `WebGL coupé : état « ${etat2} », message ${message ? "affiché" : "ABSENT"}, la course révèle quand même le pari (phase « ${phase} », ${ctl} contrôle ouvert)`);
  await nav2.close();
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (revue du 2026-09-24) ──
await ergonomie({ lancer: lancer, url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, course: 0 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-lorentz : une particule chargée dans un champ magnétique (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!rendu) {
  console.error("\nMUET — WebGL n'a pas dessiné ici : la porte ne peut rien dire des pixels, elle ne sera pas verte.");
  process.exit(3);
}
if (ESSAI) {
  const visees = ["avant-clic", "nombres", "pixels", "glyphe", "vitesse", "etapes", "paris", "avant-pari", "latex", "sans-webgl", "ergonomie"];
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
