/**
 * scene-corde.mjs — la porte de « la corde : la photo et le film »
 * (pc/ondes-mecaniques-progressives, R3 ; spec
 * content/pc/ondes-mecaniques-progressives/spec-scene-corde.md §11).
 *
 * Elle lit le RENDU réel (`next start` + Chromium), jamais le code du produit,
 * et trouve son panneau par `[data-scene="corde-photo-film"]` seul.
 *
 * LA RÈGLE DE LA CUVE NE S'APPLIQUE PAS ICI (spec §11.1). La porte de la cuve
 * refusait de recalculer les nombres d'une SIMULATION et n'établissait que des
 * invariants. La corde, elle, est ANALYTIQUE : la seconde voie ci-dessous,
 * écrite depuis la SPEC (quatre gestes, v ∈ {4 ; 8}, caméra à 20 images/s) et
 * sans importer aucun module du produit, recalcule les MÊMES nombres,
 * exactement. Un écart quelconque est un défaut, pas du bruit.
 *
 * Les faits de PIXELS se lisent sur le canvas DU PRODUIT, dans la page : la
 * hauteur de la corde colonne par colonne (échelle lue sur les repères), le
 * départ des deux courbes du film, la position du front sur les clichés.
 *
 *   node scripts/scene-corde.mjs --porte        (lève son propre next start)
 *   node scripts/scene-corde.mjs --essai-rouge  (chaque famille doit crier)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie, listes } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_CORDE ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/ondes-mecaniques-progressives";
const SCENE = "corde-photo-film";
const OUVRIR = "Ouvrir la corde";

// ── La seconde voie : les constantes de la SPEC, rien du produit ──────────
// L'essai rouge RETOURNE les attentes (`juger`) ; il ne fausse PAS aussi la
// constante. Le premier essai faisait les deux — et quatre familles fondées sur
// v (retard-signe, celerite-independante, photos-distinctes, instant-photo)
// restaient vertes : fausses par la constante, remises d'aplomb par le retour.
// Une seule inversion par famille, sinon elles s'annulent.
const V_COURS = 4; // m/s
const GESTES = {
  bosse: { s: [[0, 0], [0.1, 1], [0.2, 0]], A: 3, montee: 0.1, duree: 0.2 },
  rampe: { s: [[0, 0], [0.1, 1]], A: 3, montee: 0.1, duree: 0.1 },
  "rampe-haute": { s: [[0, 0], [0.1, 1]], A: 6, montee: 0.1, duree: 0.1 },
  "rampe-lente": { s: [[0, 0], [0.2, 1]], A: 3, montee: 0.2, duree: 0.2 },
};
const yS = (g, t) => {
  const { s, A } = GESTES[g];
  if (t <= 0) return 0;
  for (let i = 1; i < s.length; i++) if (t <= s[i][0]) return A * (s[i - 1][1] + ((s[i][1] - s[i - 1][1]) * (t - s[i - 1][0])) / (s[i][0] - s[i - 1][0]));
  return A * s[s.length - 1][1];
};
const y = (g, v, x, t) => (t < x / v ? 0 : yS(g, t - x / v));
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",");

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("scene-corde : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const lancer = (args = []) => chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const nav = await lancer();
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.setDefaultTimeout(15000);
// La page MESURÉE au premier plan : un onglet d'arrière-plan reçoit environ une
// image par seconde (leçon de la cuve).
await page.bringToFront();
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(`pageerror : ${e.message}`));
page.on("console", (m) => { if (m.type() === "error") erreurs.push(`console : ${m.text()}`); });

const resultats = [];
const avertissements = [];
const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });
/** Une mesure d'une famille VISÉE par l'essai rouge : l'essai retourne l'attente. */
const juger = (famille, ok, detail) => noter(famille, ESSAI ? !ok : ok, detail);

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/ondes-mecaniques-progressives/media/corde-photo-film.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-corde : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
const URL_SCENE = `${BASE}${LECON}?chapitre=${chapitre}`;
await page.goto(URL_SCENE, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const panneau = page.locator(`[data-scene="${SCENE}"]`);
await panneau.scrollIntoViewIfNeeded();

// ── Rien avant le clic ; pas de 3D, même ouvert ──
{
  const ferme = (await panneau.getAttribute("data-scene-etat")) === "ferme" && (await panneau.locator("canvas").count()) === 0;
  juger("avant-clic", ferme, "panneau fermé, aucun canvas");
}
await page.waitForFunction(([sc, lib]) => { const b = [...document.querySelectorAll(`[data-scene="${sc}"] button`)].find((x) => x.textContent?.includes(lib)); return b && !b.disabled; }, [SCENE, OUVRIR], { timeout: 40000 }).catch(() => {});
await panneau.getByRole("button", { name: OUVRIR }).click();
await page.waitForSelector(`[data-scene="${SCENE}"][data-scene-etat="prete"], [data-scene="${SCENE}"][data-scene-etat="sans-webgl"], [data-scene="${SCENE}"][data-scene-etat="erreur"]`, { timeout: 40000 }).catch(() => {});
const pret = (await panneau.getAttribute("data-scene-etat")) === "prete";
{
  const trois = await page.evaluate(() => window.__THREE__ ?? null);
  const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
  juger("pas-de-3d", trois === null && deuxD, `panneau OUVERT : window.__THREE__ ${trois ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
}

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
const lecture = async (cle) => { const l = panneau.locator(`[data-lecture="${cle}"]`); return (await l.count()) ? espaces(await l.first().textContent().catch(() => "")) : ""; };
/** La valeur affichée à côté d'un curseur (« d = 1,2 m »). */
const valeurCurseur = async (c) => { const l = panneau.locator(`[data-controle="${c}"] span span`); return (await l.count()) ? espaces(await l.first().textContent().catch(() => "")) : ""; };
/** Le texte d'une étiquette posée sur la scène, si elle est visible. */
const etiquetteTexte = async (nom) =>
  espaces((await panneau.evaluate((el, n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); return e && getComputedStyle(e).visibility === "visible" ? e.textContent ?? "" : ""; }, nom).catch(() => "")) ?? "");
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(150));
async function glisser(cle, v) {
  await panneau.locator(`[data-controle="${cle}"] input`).evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, v);
  await deuxImages();
  await page.waitForTimeout(40);
}
const cocher = async (cle, v) => { await panneau.locator(`[data-controle="${cle}"] input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(40); };
async function courir() {
  await panneau.locator("[data-lancer]").click();
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
  await deuxImages();
  const f = parseFloat((await attr("data-facteur-temps")) ?? "1");
  if (f < 0.95) avertissements.push(`facteur de temps ${f} : la machine n'a pas suivi le ralenti ×5`);
}
/** Un repère (étiquette sans texte), en px CSS relatifs au canvas ; null s'il n'est pas visible. */
const repere = (nom) => panneau.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
/** L'échelle d'une corde dessinée : base, px par m, px par cm (vertical), lus sur SES repères. */
async function echelle(nom = "corde") {
  const x0 = await repere(`${nom}-x0`), x4 = await repere(`${nom}-x4`), c1 = await repere(`${nom}-1cm`);
  if (!x0 || !x4 || !c1) return null;
  return { x0: x0.x, base: x0.y, pxM: (x4.x - x0.x) / 4, pxCm: x0.y - c1.y };
}
/**
 * La hauteur (cm) de la corde dessinée aux abscisses `xs` (m), lue sur les
 * PIXELS du canvas du produit : dans la colonne, le centre des pixels d'encre
 * forte (écart de luminance au fond > 110) entre le haut de la bande et la
 * base + 3 px. L'échelle vient des repères de la même corde.
 */
async function hauteurs(xs, nom = "corde", haut = 0, sansAccent = false) {
  const e = await echelle(nom);
  if (!e) return null;
  return panneau.evaluate((el, { xs, e, haut, sansAccent }) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const g = cv.getContext("2d");
    const fond = getComputedStyle(el).getPropertyValue("--figure-surface");
    const t = document.createElement("canvas").getContext("2d");
    t.fillStyle = fond; t.fillRect(0, 0, 1, 1);
    const f = t.getImageData(0, 0, 1, 1).data;
    const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    const y0 = Math.max(0, Math.round(haut * dpr)), y1 = Math.round((e.base + 3) * dpr);
    // Le centre du PREMIER trait d'encre depuis le haut, dans une colonne : le
    // barycentre des pixels du trait, pesés par leur écart au fond (le lissage
    // compte). Premier passage : le centre de la plage « d'encre forte » d'une
    // colonne ARRONDIE — sur une pente de 1,5 px/px, l'arrondi de colonne et le
    // seuil faisaient 1,7 px d'écart, et la bosse symétrique sortait « à 1,58 et
    // 1,51 cm ». La hauteur est maintenant INTERPOLÉE entre les deux colonnes
    // qui encadrent l'abscisse exacte.
    const centre = (X) => {
      const d = g.getImageData(X, y0, 1, y1 - y0).data;
      // `sansAccent` : un pixel COLORÉ (l'accent) compte pour du fond — la corde
      // est à l'encre, neutre. Sans cela, sur les clichés révélés, la RÈGLE que
      // le produit trace depuis ses propres nombres (xA, xB) était lue comme la
      // corde : le sabotage « deux photos au même instant » restait vert.
      const colore = (k) => Math.max(d[4 * k], d[4 * k + 1], d[4 * k + 2]) - Math.min(d[4 * k], d[4 * k + 1], d[4 * k + 2]) > 40;
      const ecart = (k) => (sansAccent && colore(k) ? 0 : Math.abs(0.2126 * d[4 * k] + 0.7152 * d[4 * k + 1] + 0.0722 * d[4 * k + 2] - lf));
      let k0 = -1;
      for (let k = 0; k < y1 - y0; k++) if (ecart(k) > 110) { k0 = k; break; }
      if (k0 < 0) return NaN;
      let a = k0, b = k0;
      while (a > 0 && ecart(a - 1) > 25) a--;
      while (b < y1 - y0 - 1 && ecart(b + 1) > 25) b++;
      let sw = 0, sy = 0;
      for (let k = a; k <= b; k++) { const w = ecart(k); sw += w; sy += w * (k + 0.5); }
      return sy / sw / dpr + y0 / dpr;
    };
    return xs.map((x) => {
      const Xf = (e.x0 + x * e.pxM) * dpr - 0.5;
      const X = Math.floor(Xf), f = Xf - X;
      const [c0, c1] = [centre(X), centre(X + 1)];
      const yc = !Number.isFinite(c0) ? c1 : !Number.isFinite(c1) ? c0 : c0 * (1 - f) + c1 * f;
      return (e.base - yc) / e.pxCm;
    });
  }, { xs, e, haut, sansAccent });
}
const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");
/** Les pixels d'accent (en CHROMINANCE : la teinte, pas la clarté) dans tout le canvas. */
const pixelsAccent = () => panneau.evaluate((el, accent) => {
  const cv = el.querySelector("canvas");
  const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data;
  const chroma = (r, g, b) => { const m = (r + g + b) / 3; return [r - m, g - m, b - m]; };
  const ca = chroma(...accent), na = Math.hypot(...ca);
  let n = 0;
  for (let i = 0; i < d.length; i += 4) {
    const c = chroma(d[i], d[i + 1], d[i + 2]), nc = Math.hypot(...c);
    if (nc > 12 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85) n++;
  }
  return n;
}, accent);
/**
 * Le FILM, lu aux pixels : pour chaque trace (l'accent = y_M après la
 * révélation ; l'encre douce = y_S), la première colonne où elle s'élève d'au
 * moins `seuil` px au-dessus de la base, sa hauteur max, et sa largeur au-dessus
 * du seuil. Le seuil (12 px) passe au-dessus du crochet τ, posé à 5 px.
 */
async function lireFilm(seuil = 12) {
  const t0 = await repere("film-t0"), t1 = await repere("film-t1"), ym = await repere("film-ymax");
  if (!t0 || !t1 || !ym) return null;
  const douce = await jetonCouleur("--figure-ink-soft");
  return panneau.evaluate((el, { t0, t1, ym, accent, douce, seuil }) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const g = cv.getContext("2d");
    const X0 = Math.round((t0.x + 3) * dpr), X1 = Math.round((t1.x - 4) * dpr);
    const Y0 = Math.round((ym.y - 4) * dpr), Y1 = Math.round((t0.y - seuil) * dpr);
    const d = g.getImageData(X0, Y0, X1 - X0, Y1 - Y0).data;
    const W = X1 - X0, H = Y1 - Y0;
    const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
    const ca = chroma(...accent), na = Math.hypot(...ca);
    const estAccent = (i) => { const c = chroma(d[i], d[i + 1], d[i + 2]), nc = Math.hypot(...c); return nc > 12 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85; };
    const estDouce = (i) => Math.abs(d[i] - douce[0]) + Math.abs(d[i + 1] - douce[1]) + Math.abs(d[i + 2] - douce[2]) < 90 && !estAccent(i);
    const trace = (test) => {
      let premier = -1, largeur = 0, haut = Infinity;
      const hautCol = new Array(W).fill(Infinity);
      for (let x = 0; x < W; x++) {
        let vu = false;
        for (let yy = 0; yy < H; yy++) if (test(4 * (yy * W + x))) { vu = true; haut = Math.min(haut, yy); hautCol[x] = Math.min(hautCol[x], yy); }
        if (vu) { if (premier < 0) premier = x; largeur++; }
      }
      if (premier < 0) return null;
      // le SOMMET : le milieu des colonnes qui touchent le point le plus haut (à 1 px près)
      const cols = hautCol.map((v, x) => (v <= haut + 1 ? x : -1)).filter((x) => x >= 0);
      const sommet = cols.length ? (cols[0] + cols[cols.length - 1]) / 2 : NaN;
      return { premier: (X0 + premier) / dpr, sommet: (X0 + sommet) / dpr, largeur: largeur / dpr, hauteur: (Y1 - Y0 - haut) / dpr + seuil };
    };
    return { M: trace(estAccent), S: trace(estDouce), pxS: (t1.x - t0.x) / 1.0 };
  }, { t0, t1, ym, accent, douce, seuil });
}
/** Avant le pari : la corde au repos, aucun accent, ni lecture, ni bouton de course, t = 0. */
async function avantPari(ou) {
  const h = await hauteurs([0.2, 0.6, 1.0, 2.0, 3.0, 3.8]);
  const plate = h && h.every((v) => Number.isFinite(v) && Math.abs(v) < 0.08);
  const teinte = await pixelsAccent();
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const b = await panneau.locator("[data-lancer]").count();
  const t = parseFloat((await attr("data-t")) ?? "NaN");
  const film = (await attr("data-vue")) === "film" ? await lireFilm(3) : null;
  const vide = !film || (film.M === null && film.S === null);
  const ok = plate && teinte === 0 && l === 0 && b === 0 && t === 0 && vide;
  juger("avant-pari", ok, `${ou}, avant le pari : corde ${plate ? "au repos" : `DÉFORMÉE (${(h ?? []).map((v) => virgule(v, 2)).join(" · ")} cm)`}, ${teinte} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, bouton de course ${b ? "PRÉSENT" : "absent"}, t = ${t} s${film ? `, film ${vide ? "vide" : "DÉJÀ TRACÉ"}` : ""}`);
}
/** L'état posé par l'étape (spec §12, table des états). */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { d: parseFloat(await attr("data-d-m")), g: await attr("data-geste"), v: await attr("data-v-ms"), vue: await attr("data-vue"), ref: await attr("data-reference"), ctl: await controles(), ph: await attr("data-pari") };
  const ok = Math.abs(lu.d - e.d_m) < 1e-9 && lu.g === e.geste && lu.v === e.v_ms && lu.vue === e.vue && lu.ref === e.reference && lu.ctl === "" && lu.ph === "attente";
  juger("etapes", ok, `étape ${id} : d = ${lu.d} m, geste ${lu.g}, v = ${lu.v} m/s, appareil ${lu.vue}, référence ${lu.ref}, contrôles [${lu.ctl}], pari « ${lu.ph} »`);
  // un appareil qui n'est pas celui de l'étape n'existe pas (spec §5.3)
  const film = !!(await repere("film-t0")), cliche = !!(await repere("cliche-a-x0"));
  const okV = (e.vue === "film") === film && (e.vue === "photos") === cliche;
  juger("etapes", okV, `étape ${id} : appareils présents — film ${film ? "oui" : "non"}, clichés ${cliche ? "oui" : "non"} (attendu : ${e.vue})`);
}
/** La frontière du §9 : aucune chaîne interdite dans le panneau ouvert, aucune valeur en degrés. */
const INTERDITS = /λ|longueur d'onde|\bpériode\b|fréquence|\bHz\b|sinuso[iï]d|y\s*\(\s*x|\bx\s*\/\s*v\b|∂|réflexion|interf[ée]r|Doppler|\d\s?°/i;
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const m = t.match(INTERDITS);
  juger("frontiere", !m, `${ou} : ${m ? `« ${m[0]} » AFFICHÉ` : "aucune chaîne interdite (période, fréquence, λ, y(x, x/v, réflexion, degrés…)"}`);
}
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(tau|text|frac|Delta|times|sqrt)\b/g) ?? [];
/** Les étiquettes : ni chevauchées, ni hors du cadre. */
/**
 * Chaque étiquette qui BOUGE nomme un objet : elle se pose près de lui. La
 * vague 2 a vu, à 390 px, « y_S » posé sur la CORDE, deux bandes au-dessus du
 * film qu'il nomme — ni chevauché, ni hors du cadre : vert pour cette porte.
 * La distance se mesure de la boîte de l'étiquette au repère que le produit
 * pose sur l'objet.
 */
const ANCRES = { "y-S": "film-yS", "y-M": "film-yM", "lettre-M": "M", "lettre-S": "S" };
const PRES = 36; // px, de la boîte au point
async function etiquettesLisibles(ou, p = page, q = panneau) {
  const { textes, larg, haut, legende, ancres, encre } = await q.evaluate((el, ANCRES) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => visible(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), ...boite(e) }));
    const lg = el.querySelector("[data-legende]");
    const legende = lg ? boite(lg) : null;
    // le point d'ancrage de chaque étiquette qui bouge : le repère (span vide) posé par le produit
    const ancres = {};
    for (const [nom, r] of Object.entries(ANCRES)) {
      const s = el.querySelector(`[data-etiquette="${r}"]`);
      if (s && visible(s)) { const b = s.getBoundingClientRect(); ancres[nom] = { x: b.left - rc.left + b.width / 2, y: b.top - rc.top + b.height / 2 }; }
    }
    // l'encre du canvas SOUS la légende : ce que la légende opaque cache
    let encre = null;
    if (legende) {
      const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
      const X0 = Math.max(0, Math.floor(legende.x0 * dpr)), Y0 = Math.max(0, Math.floor(legende.y0 * dpr));
      const W = Math.max(1, Math.ceil((legende.x1 - legende.x0) * dpr)), H = Math.max(1, Math.ceil((legende.y1 - legende.y0) * dpr));
      const d = g.getImageData(X0, Y0, W, H).data;
      const f = g.getImageData(0, cv.height - 1, 1, 1).data; // un coin : le fond
      encre = 0;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) encre++;
    }
    return { textes, larg: rc.width, haut: rc.height, legende, ancres, encre };
  }, ANCRES);
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    if (legende && a.x0 < legende.x1 - 1 && legende.x0 < a.x1 - 1 && a.y0 < legende.y1 - 1 && legende.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS la légende`);
    const o = ancres[a.nom];
    if (o) {
      const dx = Math.max(a.x0 - o.x, 0, o.x - a.x1), dy = Math.max(a.y0 - o.y, 0, o.y - a.y1);
      const dist = Math.hypot(dx, dy);
      if (dist > PRES) fautes.push(`« ${a.nom} » à ${dist.toFixed(0)} px de ce qu'elle nomme (> ${PRES})`);
    }
  }
  const nAncrees = textes.filter((a) => ancres[a.nom]).length;
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s) (${textes.map((t) => t.nom).join(", ")})${fautes.length ? ` — ${fautes.join(" ; ")}` : `, ni chevauchées, ni sous la légende, dans le cadre ; ${nAncrees} posée(s) à moins de ${PRES} px de leur objet`}`);
  // LE CADRE : rien de ce que la corde dessine ne monte sous la légende opaque
  // (vague 2 : à l'étape 4, la rampe de 6 cm y cachait la main et son palier)
  juger("cadre", encre === 0, `${ou} : ${encre === null ? "légende ABSENTE" : `${encre} pixel(s) d'encre sous la légende`} (attendu 0)`);
}
/** Aucune étape ne répond à un pari suivant (spec §7.6) — la table, écrite ICI. */
const REPOND_A = { instant: "la-photo-a-t1", camera: "deux-photos", geste: "le-meme-geste-en-plus-grand", tension: "libre" };
async function sansFuite(id) {
  const ordre = descripteur.etapes.map((e) => e.id);
  const ici = ordre.indexOf(id);
  const ouverts = (await controles()).split(",").filter(Boolean);
  const fuites = ouverts.filter((c) => REPOND_A[c] && ordre.indexOf(REPOND_A[c]) > ici);
  juger("fuite-inter-etapes", fuites.length === 0, `étape ${id} révélée : contrôles [${ouverts.join(",")}]${fuites.length ? ` — ${fuites.join(", ")} atteint l'état d'un pari suivant` : " — aucun n'atteint l'état d'un pari suivant"}`);
}
/** Les trois grilles, à la position courante : τ, t₁ et la durée du geste sur le pas du modèle (5 ms). */
async function grille(ou) {
  const v = ["data-tau-pas", "data-instant-pas", "data-geste-pas"].map(async (n) => parseFloat((await attr(n)) ?? "NaN"));
  const [a, b, c] = await Promise.all(v);
  const entier = (x) => Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-6;
  juger("grille-exacte", entier(a) && entier(b) && entier(c), `${ou} : τ/Δt = ${a}, t₁/Δt = ${b}, durée du geste/Δt = ${c} (entiers attendus)`);
}
/**
 * Pendant une course : chaque image, l'abscisse du repère de M (elle ne doit
 * JAMAIS bouger), l'état « levé / au repos » de quatre colonnes de la corde
 * (au plus deux changements chacune : un seul geste), et les éclairs au sens
 * WCAG 2.3.1 sur le canvas entier. Rend quand la course est finie.
 */
async function suivreCourse(colonnes) {
  const e = await echelle();
  await panneau.locator("[data-lancer]").click();
  const r = await panneau.evaluate(async (el, { e, colonnes, sc }) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const g = cv.getContext("2d");
    const mEl = el.querySelector('[data-etiquette="M"]');
    const xsM = [];
    const etats = colonnes.map(() => ({ leve: false, changes: 0 }));
    const fond = (() => { const t = document.createElement("canvas").getContext("2d"); t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1); const f = t.getImageData(0, 0, 1, 1).data; return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; })();
    // les éclairs, comme la porte de la cuve : paires de variations ≥ 0,10 de luminance relative
    const pas = 4, W = Math.floor(cv.width / pas), H = Math.floor(cv.height / pas);
    const tmp = document.createElement("canvas"); tmp.width = W; tmp.height = H;
    const gt = tmp.getContext("2d", { willReadFrequently: true });
    const lut = new Float32Array(256);
    for (let v = 0; v < 256; v++) { const x = v / 255; lut[v] = x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }
    const ext = new Float32Array(W * H).fill(-1), sens = new Int8Array(W * H), chg = new Uint16Array(W * H);
    const t0 = performance.now();
    let images = 0;
    for (;;) {
      await new Promise((res) => requestAnimationFrame(res));
      images++;
      const r = mEl?.getBoundingClientRect(), c = cv.getBoundingClientRect();
      if (r && getComputedStyle(mEl).visibility === "visible") xsM.push(r.left + r.width / 2 - c.left);
      colonnes.forEach((x, k) => {
        const X = Math.round((e.x0 + x * e.pxM) * dpr);
        const y0 = Math.round((e.base - 3 * e.pxCm * 1.05 - 6) * dpr), y1 = Math.round((e.base - 3) * dpr);
        const d = g.getImageData(X, y0, 1, y1 - y0).data;
        let leve = false;
        for (let i = 0; i < d.length; i += 4) if (Math.abs(0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2] - fond) > 110) { leve = true; break; }
        if (leve !== etats[k].leve) { etats[k].changes++; etats[k].leve = leve; }
      });
      gt.drawImage(cv, 0, 0, W, H);
      const d = gt.getImageData(0, 0, W, H).data;
      for (let k = 0; k < W * H; k++) {
        const L = 0.2126 * lut[d[4 * k]] + 0.7152 * lut[d[4 * k + 1]] + 0.0722 * lut[d[4 * k + 2]];
        if (ext[k] < 0) { ext[k] = L; continue; }
        const dl = L - ext[k];
        if (Math.abs(dl) >= 0.1 && Math.min(L, ext[k]) < 0.8 && Math.sign(dl) !== sens[k]) { chg[k]++; sens[k] = Math.sign(dl); ext[k] = L; }
        else if ((sens[k] > 0 && L > ext[k]) || (sens[k] < 0 && L < ext[k])) ext[k] = L;
      }
      if (document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui") break;
      if (performance.now() - t0 > 60000) break;
    }
    const s = (performance.now() - t0) / 1000;
    let pire = 0;
    for (let k = 0; k < W * H; k++) pire = Math.max(pire, Math.floor(chg[k] / 2) / s);
    const dx = xsM.length ? Math.max(...xsM) - Math.min(...xsM) : NaN;
    return { dx, nM: xsM.length, changes: etats.map((z) => z.changes), images, eclairsParS: Math.round(pire * 10) / 10, secondes: Math.round(s * 10) / 10 };
  }, { e, colonnes, sc: SCENE });
  await deuxImages();
  const f = parseFloat((await attr("data-facteur-temps")) ?? "1");
  if (f < 0.95) avertissements.push(`facteur de temps ${f} : la machine n'a pas suivi le ralenti ×5`);
  return r;
}
const exact = (lu, attendu) => lu === attendu;
/**
 * Le front de la corde principale, lu aux PIXELS : la colonne levée la plus à
 * droite, au centimètre. Le seuil (0,08 cm, ~1,7 px) décale le front lu de
 * seuil ÷ pente derrière le vrai — 1 cm pour une rampe de 3 cm, 0,5 pour 6 cm :
 * c'est pourquoi les comparaisons tolèrent 2 à 3 cm. L'anneau de M, de l'encre
 * au-dessus de la base même au repos, est évité (premier passage : un front
 * « à 1,62 m » qui était M).
 */
async function frontPx() {
  const d = parseFloat((await attr("data-d-m")) ?? "NaN");
  const xs = Array.from({ length: 400 }, (_, k) => Math.round(k * 0.01 * 1000) / 1000).filter((x) => !(Math.abs(x - d) <= 0.08));
  const hs = (await hauteurs(xs)) ?? [];
  let dernier = -1;
  hs.forEach((v, k) => { if (v > 0.08) dernier = k; });
  return dernier < 0 ? NaN : xs[dernier];
}

// Un parcours qui CASSE est un rouge, pas une exception : les mesures faites
// jusque-là s'impriment, et la famille « parcours » dit où il s'est arrêté.
try {
// ═══ Étape 1 : le film de M ═══════════════════════════════════════════════
await etatPose("le-film-de-M");
await avantPari("étape 1");
// la bosse de l'étape 1 est son PROPRE miroir (spec §2.3) : le descripteur le garantit
juger("fuite-inter-etapes", etapeDesc("le-film-de-M").etat.geste === "bosse", `étape 1 : geste « ${etapeDesc("le-film-de-M").etat.geste} » — la bosse symétrique ne dit rien du sens de lecture de la photo`);
await parier(indexDe("le-film-de-M", "avance"));
{
  juger("paris", (await attr("data-pari")) === "note", `étape 1, pari posé : phase « ${await attr("data-pari")} » — la corde répond d'abord`);
  const suivi = await suivreCourse([0.4, 1.6, 2.0, 3.2]);
  juger("M-n-avance-pas", suivi.nM >= 20 && suivi.dx <= 0.5, `pendant la course : le repère de M suivi sur ${suivi.nM} images bouge de ${Number.isFinite(suivi.dx) ? suivi.dx.toFixed(2) : "?"} px en abscisse (attendu 0 : M monte et descend, il n'avance pas)`);
  juger("pas-de-periodicite", suivi.changes.every((c) => c <= 2) && suivi.changes.some((c) => c === 2), `pendant la course : changements « au repos ↔ levé » aux colonnes 0,4 · 1,6 · 2,0 · 3,2 m : ${suivi.changes.join(" · ")} (au plus 2 : un seul geste)`);
  juger("eclairs", suivi.eclairsParS <= 3 && suivi.images >= 20, `pendant la course (${suivi.secondes} s, ${suivi.images} images) : au plus ${suivi.eclairsParS} éclair(s)/s en un point (≤ 3, WCAG 2.3.1)`);
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 1, verdict après la course : « ${res} »`);
  // Le film, aux pixels : M part PLUS TARD que S, de τ ; même forme
  const f = await lireFilm();
  const tau = 1.2 / V_COURS;
  // Sommet à sommet : le départ (« premier pixel au-dessus du seuil ») dépend de
  // l'épaisseur du trait et du lissage — S est tracée plus fine que M, et le
  // premier passage lisait 123 px pour 125 attendus. Les deux sommets, eux,
  // sont des points, et leur écart est τ exactement.
  const decalage = f?.M && f?.S ? f.M.sommet - f.S.sommet : NaN;
  juger("retard-signe", Number.isFinite(decalage) && Math.abs(decalage - tau * f.pxS) <= 2, `film : le sommet de M est ${Number.isFinite(decalage) ? decalage.toFixed(1) : "?"} px après celui de S (attendu τ × ${f ? f.pxS.toFixed(1) : "?"} px/s = ${f ? (tau * f.pxS).toFixed(1) : "?"} px, à droite)`);
  // en pixels absolus : S (1,6 px, encre douce) et M (2,4 px, accent) n'ont pas le
  // même trait ; un M atténué de 20 % perd ~15 px de hauteur, un M étiré ~15 px de largeur
  const formeOk = f?.M && f?.S && Math.abs(f.M.hauteur - f.S.hauteur) <= 3 && Math.abs(f.M.largeur - f.S.largeur) <= 5;
  juger("forme-conservee", formeOk, `film : hauteur de M ${f?.M ? f.M.hauteur.toFixed(1) : "?"} px / de S ${f?.S ? f.S.hauteur.toFixed(1) : "?"} px ; largeur ${f?.M ? f.M.largeur.toFixed(1) : "?"} / ${f?.S ? f.S.largeur.toFixed(1) : "?"} px (même forme : à 3 px et 5 px près, l'écart des deux traits)`);
  // La bosse à la fin de la course (t = 1,0 s) : symétrique autour de son sommet (3,6 m)
  const [a, b] = (await hauteurs([3.4, 3.8])) ?? [NaN, NaN];
  juger("miroir-inerte", Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= 0.02 * 3, `la corde à t = 1,0 s : ${virgule(a, 2)} cm à 3,4 m, ${virgule(b, 2)} cm à 3,8 m (la bosse est son propre miroir, à 2 % près)`);
  // Les nombres, par la seconde voie
  // (la distance n'est plus une lecture — vague 2 : elle doublait l'étiquette
  // du curseur ; c'est l'étiquette du curseur qu'on lit)
  const lus = { retard: await lecture("retard"), distance: await valeurCurseur("point_m"), celerite: await lecture("celerite"), vitesse: await lecture("vitesse-M") };
  const vM = GESTES.bosse.A / 100 / GESTES.bosse.montee;
  const okN = exact(lus.retard, `${virgule(tau, 2)} s`) && exact(lus.distance, "d = 1,2 m") && exact(lus.celerite, `${virgule(V_COURS, 1)} m/s`) && lus.vitesse.startsWith(`${virgule(vM, 2)} m/s`);
  juger("nombres", okN, `étape 1 révélée : retard « ${lus.retard} », curseur « ${lus.distance} », célérité « ${lus.celerite} », vitesse de M « ${lus.vitesse} »`);
  // L'exagération, déclarée ×20 ; l'encart, à l'échelle vraie
  const e = await echelle(), en = await echelle("encart");
  const rapport = e ? (e.pxCm * 100) / e.pxM : NaN;
  const vrai = en ? (en.pxCm * 100) / en.pxM : NaN;
  juger("exageration", Math.abs(rapport / 20 - 1) <= 0.02 && Math.abs(vrai - 1) <= 0.01, `échelles : la corde, verticale / horizontale = ${Number.isFinite(rapport) ? rapport.toFixed(2) : "?"} (attendu 20) ; l'encart « à l'échelle vraie » = ${Number.isFinite(vrai) ? vrai.toFixed(3) : "ABSENT"} (attendu 1)`);
  juger("etapes", (await controles()) === "point_m", `étape 1 révélée : contrôles [${await controles()}]`);
  await sansFuite("le-film-de-M");
  await etiquettesLisibles("étape 1 révélée");
  await frontiere("étape 1 révélée");
  // N1 — τ = d/v aux huit positions de M
  const fautes = [];
  for (let k = 1; k <= 8; k++) {
    const d = Math.round(0.4 * k * 10) / 10;
    await glisser("point_m", d);
    const lu = await lecture("retard");
    if (lu !== `${virgule(d / V_COURS, 2)} s`) fautes.push(`d = ${d} : « ${lu} »`);
    await grille(`étape 1, d = ${virgule(d, 1)} m`);
  }
  juger("nombres", fautes.length === 0, `N1 — τ = d/v aux 8 positions de M (4,0 m/s)${fautes.length ? ` : ${fautes.join(" ; ")}` : " : les huit exactes"}`);
  await glisser("point_m", 1.2);
  {
    const l = await listes(page, `[data-scene="${SCENE}"]`);
    juger("ergonomie", l.n > 0 && l.fautes.length === 0, `étape 1 révélée : ${l.n} liste(s) de lectures, ${l.fautes.length ? `INTRUS : ${l.fautes.join(" · ")}` : "rien que des couples terme/valeur"}`);
  }
}

// ═══ Étape 2 : la photo à t₁ ══════════════════════════════════════════════
await suivant();
await etatPose("la-photo-a-t1");
await avantPari("étape 2");
await parier(indexDe("la-photo-a-t1", "recopie"));
{
  await courir();
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 2, verdict après la course : « ${res} »`);
  const t = parseFloat((await attr("data-t")) ?? "NaN");
  juger("nombres", Math.abs(t - 0.25) < 1e-9, `étape 2 : la course a gelé la corde à t = ${t} s (t₁ = 0,25 s)`);
  // LE MIROIR : haut près de S, bas vers le front
  const [h02, h09] = (await hauteurs([0.2, 0.9])) ?? [NaN, NaN];
  juger("miroir", h02 >= 0.95 * 3 && h09 <= 0.3 * 3, `photo à 0,25 s : ${virgule(h02, 2)} cm à 0,20 m (≥ 95 % de 3,0), ${virgule(h09, 2)} cm à 0,90 m (≤ 30 %) — la corde DESCEND vers le front`);
  // le front net : au-delà du front, la corde est à sa ligne de repos
  const e = await echelle();
  const xf = V_COURS * 0.25;
  const loin = [];
  for (let x = xf + 0.05; x <= 3.9; x += 0.25) loin.push(Math.round(x * 100) / 100);
  const hl = (await hauteurs(loin)) ?? [];
  const pxAuDela = hl.map((v) => Math.abs(v) * (e?.pxCm ?? 0));
  juger("front-net", hl.length > 0 && pxAuDela.every((p) => p <= 0.75), `au-delà du front (${virgule(xf, 2)} m) : écart à la ligne de repos ≤ ${pxAuDela.length ? Math.max(...pxAuDela).toFixed(2) : "?"} px sur ${hl.length} colonnes (attendu ≈ 0)`);
  // une seule source : la déformation est UN seul morceau, qui part de S
  // (les colonnes à moins de 0,1 m de M sont évitées : son anneau est de l'encre)
  const xs = Array.from({ length: 39 }, (_, k) => Math.round((0.05 + k * 0.1) * 100) / 100).filter((x) => Math.abs(x - 1.2) > 0.1);
  const hs = (await hauteurs(xs)) ?? [];
  const leve = hs.map((v) => v > 0.1);
  let morceaux = 0;
  leve.forEach((l, i) => { if (l && (i === 0 || !leve[i - 1])) morceaux++; });
  juger("une-seule-source", morceaux === 1 && leve[0], `photo à 0,25 s : ${morceaux} morceau(x) déformé(s) le long de la corde, ${leve[0] ? "le premier part de S" : "RIEN près de S"}`);
  // (le front n'est plus une lecture à l'étape 2 : il est écrit SUR la photo)
  const lf = await etiquetteTexte("front");
  juger("nombres", lf === `front : ${virgule(Math.min(4, xf), 2)} m`, `front écrit sur la photo « ${lf} » (attendu ${virgule(xf, 2)} m)`);
  juger("avant-pari", (await pixelsAccent()) > 0, `étape 2 révélée : l'accent (la pente, la cote du front) apparaît après le verdict`);
  juger("etapes", (await controles()) === "instant", `étape 2 révélée : contrôles [${await controles()}]`);
  await sansFuite("la-photo-a-t1");
  await etiquettesLisibles("étape 2 révélée");
  await frontiere("étape 2 révélée");
  // N2 — le front v·t aux 21 instants de la photo (un album : la corde saute d'un cliché au suivant)
  const fautes = [];
  for (let k = 0; k <= 20; k++) {
    const ti = Math.round(0.05 * k * 100) / 100;
    await glisser("instant", ti);
    const lu = await etiquetteTexte("front");
    const tl = parseFloat((await attr("data-t")) ?? "NaN");
    if (lu !== `front : ${virgule(Math.min(4, V_COURS * ti), 2)} m` || Math.abs(tl - ti) > 1e-9) fautes.push(`t₁ = ${ti} : « ${lu} », corde à ${tl} s`);
    if (k % 5 === 0) await grille(`étape 2, t₁ = ${virgule(ti, 2)} s`);
  }
  juger("nombres", fautes.length === 0, `N2 — le front v·t₁ aux 21 instants (4,0 m/s)${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : " : les vingt et un exacts"}`);
  // le front touche M à τ = 0,30 s (la suite de l'étape le fait chercher) : la
  // pente finit sur M, rien au-delà (colonnes à 0,1 m de part et d'autre, hors de l'anneau de M)
  await glisser("instant", 0.3);
  const [h11, h13] = (await hauteurs([1.1, 1.3])) ?? [NaN, NaN];
  const a11 = y("rampe", V_COURS, 1.1, 0.3);
  juger("nombres", Math.abs(h11 - a11) <= 0.06 && Math.abs(h13) < 0.06, `à t₁ = 0,30 s : ${virgule(h11, 2)} cm à 1,1 m (attendu ${virgule(a11, 2)}), ${virgule(h13, 2)} cm à 1,3 m (attendu 0) — le front arrive sur M, pas plus loin`);
}

// ═══ Étape 3 : deux photos ════════════════════════════════════════════════
await suivant();
await etatPose("deux-photos");
await avantPari("étape 3");
{
  const dansBande = async (nom) => { const e = await echelle(nom); return e ? e.base - 3 * e.pxCm * 1.1 - 8 : 0; };
  const vides = [...((await hauteurs([0.5, 1.0, 1.5, 2.0], "cliche-a", await dansBande("cliche-a"))) ?? []), ...((await hauteurs([0.5, 1.0, 1.5, 2.0], "cliche-b", await dansBande("cliche-b"))) ?? [])];
  // un cadre vide n'a AUCUN trait d'encre (NaN) : la corde n'y est pas encore
  juger("avant-pari", vides.length === 8 && vides.every((v) => !Number.isFinite(v)), `étape 3, avant le pari : les deux cadres de photo sont vides (${vides.filter((v) => !Number.isFinite(v)).length}/${vides.length} colonnes sans trait)`);
}
await parier(indexDe("deux-photos", "depuis-S"));
{
  await courir();
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 3, verdict après la course : « ${res} »`);
  const ea = await echelle("cliche-a"), eb = await echelle("cliche-b");
  const memeEchelle = ea && eb && Math.abs(ea.pxM / eb.pxM - 1) <= 0.01;
  // le front de chaque cliché, lu aux pixels : la colonne levée la plus à droite
  const front = async (nom) => {
    const xs = Array.from({ length: 400 }, (_, k) => Math.round(k * 0.01 * 1000) / 1000);
    const hs = (await hauteurs(xs, nom, (await echelle(nom)).base - 3 * (await echelle(nom)).pxCm * 1.1 - 8, true)) ?? [];
    let dernier = -1;
    hs.forEach((v, k) => { if (v > 0.08) dernier = k; });
    return dernier < 0 ? NaN : xs[dernier];
  };
  const fa = await front("cliche-a"), fb = await front("cliche-b");
  const avance = fb - fa;
  const attendue = V_COURS * (0.4 - 0.2);
  juger("photos-distinctes", memeEchelle && Math.abs(avance - attendue) <= 0.03 && avance > 0.1, `deux clichés : px/m ${ea ? ea.pxM.toFixed(1) : "?"} et ${eb ? eb.pxM.toFixed(1) : "?"} ; fronts lus aux pixels ${virgule(fa, 2)} m et ${virgule(fb, 2)} m — avance ${virgule(avance, 2)} m (attendu v·Δt = ${virgule(attendue, 2)} m)`);
  juger("etapes", (await controles()) === "camera", `étape 3 révélée : contrôles [${await controles()}]`);
  await sansFuite("deux-photos");
  await etiquettesLisibles("étape 3 révélée");
  await frontiere("étape 3 révélée");
  // N5, N6 — la caméra : les INTERVALLES comptent le temps ; la célérité mesurée, par SA chaîne
  const fautes = [];
  for (const n of [1, 2, 4, 5]) {
    await cocher("camera", n);
    // (les instants ne sont plus une lecture : ils sont écrits sur les photos)
    const li = `${await etiquetteTexte("photo-a")} | ${await etiquetteTexte("photo-b")}`, lm = await lecture("mesure-v"), lf = await lecture("front");
    const tA = 4 / 20, tB = (4 + n) / 20;
    if (li !== `photo n°4 · t = ${virgule(tA, 2)} s | photo n°${4 + n} · t = ${virgule(tB, 2)} s`) fautes.push(`écart ${n} : titres des photos « ${li} »`);
    if (lf !== `${virgule(V_COURS * tA, 2)} m puis ${virgule(V_COURS * tB, 2)} m`) fautes.push(`écart ${n} : fronts « ${lf} »`);
    // la chaîne AFFICHÉE : (xB − xA) ÷ Δt = v, recalculée par la porte depuis ses propres nombres
    const m = lm.replace(/−/g, "-").match(/\(([\d,]+) - ([\d,]+)\) m ÷ ([\d,]+) s = ([\d,]+) m\/s/);
    const num = (s) => parseFloat(s.replace(",", "."));
    if (!m) fautes.push(`écart ${n} : mesure « ${lm} » illisible`);
    else {
      const [xB, xA, dt, v] = [num(m[1]), num(m[2]), num(m[3]), num(m[4])];
      if (Math.abs(dt - n / 20) > 1e-9 || Math.abs((xB - xA) / dt - v) > 0.05 || virgule(v, 1) !== virgule(V_COURS, 1)) fautes.push(`écart ${n} : chaîne « ${lm} »`);
    }
  }
  juger("nombres", fautes.length === 0, `N5 · N6 — la caméra aux quatre écarts (1, 2, 4, 5 intervalles)${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : " : instants, fronts et chaîne de mesure exacts"}`);
  await cocher("camera", 4);
}

// ═══ Étape 4 : le même geste, deux fois plus haut ═════════════════════════
await suivant();
await etatPose("le-meme-geste-en-plus-grand");
await avantPari("étape 4");
await parier(indexDe("le-meme-geste-en-plus-grand", "plus-tot"));
{
  await courir();
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 4, verdict après la course : « ${res} »`);
  // le geste de 6 cm, à t = 0,5 s : la plus haute corde de la scène. Rien sous la
  // légende, et les étiquettes à leur place — mesuré ICI, avec ce geste (vague 2 :
  // la mesure de l'étape 4 se faisait après la boucle des gestes, sur la rampe
  // LENTE de 3 cm, et la rampe haute sous la légende n'était vue par rien)
  await etiquettesLisibles("étape 4, rampe haute à 0,5 s");
  // la célérité ne dépend pas du geste : le front, aux pixels, au même endroit
  const fHaute = await frontPx();
  await cocher("geste", "rampe");
  const fBasse = await frontPx();
  juger("celerite-independante", Number.isFinite(fHaute) && Math.abs(fHaute - fBasse) <= 0.02 && Math.abs(fBasse - V_COURS * 0.5) <= 0.031 && Math.abs(fHaute - V_COURS * 0.5) <= 0.031, `à t = 0,5 s : front de la rampe haute ${virgule(fHaute, 2)} m, de la rampe ${virgule(fBasse, 2)} m (attendu ${virgule(V_COURS * 0.5, 2)} m pour les deux)`);
  // N3, N7 — l'élongation de M à t = 0,5 s et sa vitesse de montée, pour les quatre gestes
  const fautes = [];
  for (const g of ["bosse", "rampe", "rampe-haute", "rampe-lente"]) {
    await cocher("geste", g);
    const le = await lecture("elongation-M"), lv = await lecture("vitesse-M");
    const ye = y(g, V_COURS, 1.2, 0.5), vm = GESTES[g].A / 100 / GESTES[g].montee;
    if (le !== `${virgule(ye, 1)} cm`) fautes.push(`${g} : élongation « ${le} » (attendu ${virgule(ye, 1)} cm)`);
    if (!lv.startsWith(`${virgule(vm, 2)} m/s`)) fautes.push(`${g} : vitesse de M « ${lv} »`);
    await grille(`étape 4, geste ${g}`);
  }
  juger("nombres", fautes.length === 0, `N3 · N7 — M à 1,2 m, t = 0,5 s, pour les quatre gestes${fautes.length ? ` : ${fautes.join(" ; ")}` : " : élongation et vitesse de montée exactes"}`);
  juger("etapes", (await controles()) === "geste", `étape 4 révélée : contrôles [${await controles()}]`);
  await sansFuite("le-meme-geste-en-plus-grand");
  await etiquettesLisibles("étape 4 révélée");
  await frontiere("étape 4 révélée");
}

// ═══ Étape 5 : libre ══════════════════════════════════════════════════════
await suivant();
await etatPose("libre");
await avantPari("étape 5");
await parier(indexDe("libre", "le-plus-proche"));
{
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 5, pari faux (le plus proche) : « ${res} » — verdict immédiat`);
  juger("etapes", (await controles()) === "geste,instant,point_m,tension", `étape 5 révélée : contrôles [${await controles()}]`);
  // les deux montages du pari, par la seconde voie : 1,6/4 = 3,2/8
  const fautes = [];
  for (const [v, d] of [[4, 1.6], [8, 3.2]]) {
    await cocher("tension", v);
    await glisser("point_m", d);
    const vv = v === 4 ? V_COURS : 2 * V_COURS;
    const lu = await lecture("retard");
    if (lu !== `${virgule(d / vv, 2)} s`) fautes.push(`v = ${v}, d = ${d} : « ${lu} »`);
  }
  // N1 à 8 m/s, aux huit positions
  for (let k = 1; k <= 8; k++) {
    const d = Math.round(0.4 * k * 10) / 10;
    await glisser("point_m", d);
    const lu = await lecture("retard");
    if (lu !== `${virgule(d / (2 * V_COURS), 2)} s`) fautes.push(`8 m/s, d = ${d} : « ${lu} »`);
  }
  juger("nombres", fautes.length === 0, `N1 — les deux montages du pari, puis τ = d/v aux 8 positions à 8,0 m/s${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : " : exacts (0,40 s et 0,40 s)"}`);
  // aucun retour : sur la corde tendue, à t = 1,0 s, la secousse a quitté la corde
  await cocher("geste", "bosse");
  await courir();
  const gauche = (await hauteurs([0.3, 0.8, 1.3, 1.8])) ?? [];
  juger("pas-de-retour", gauche.length === 4 && gauche.every((v) => Math.abs(v) <= 0.02 * 3), `8,0 m/s, t = 1,0 s : la moitié gauche à ${gauche.map((v) => virgule(v, 2)).join(" · ")} cm (≤ 2 % de 3,0 : aucune onde ne revient)`);
  // L'INSTANT DE LA PHOTO, à l'étape libre (vue « film ») : la corde EST la
  // photo prise à cet instant — le curseur la déplace, la lecture du front dit ce
  // que la corde montre. (Critique pédagogique : le curseur ne bougeait rien, et
  // le front lu venait du curseur, pas de la corde.)
  await cocher("tension", 4);
  await glisser("point_m", 1.6);
  await glisser("instant", 0.3);
  {
    const lf = await lecture("front"), fp = await frontPx(), t = parseFloat((await attr("data-t")) ?? "NaN");
    const ok = Math.abs(t - 0.3) < 1e-9 && lf === `${virgule(V_COURS * 0.3, 2)} m` && Math.abs(fp - V_COURS * 0.3) <= 0.03;
    juger("instant-photo", ok, `étape 5, instant de la photo à 0,30 s : la corde à t = ${t} s, front lu « ${lf} », front dessiné à ${virgule(fp, 2)} m (attendu ${virgule(V_COURS * 0.3, 2)} m)`);
  }
  await glisser("instant", 0.4);
  {
    const lf = await lecture("front"), le = await lecture("elongation-M");
    const ok = lf === `${virgule(V_COURS * 0.4, 2)} m` && le === "0,0 cm";
    juger("instant-photo", ok, `étape 5, à 0,40 s : front lu « ${lf} » — il touche M, à 1,6 m ; élongation de M « ${le} » (attendu 0,0 : il vient d'être atteint)`);
  }
  await frontiere("étape 5 révélée");
  await etiquettesLisibles("étape 5 révélée");
  const brut = (await latexBrut()).length;
  juger("latex", brut === 0, `étape 5 révélée : ${brut} fragment(s) de LaTeX brut`);
}

} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (phase ${await attr("data-phase").catch(() => "?")}, pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(Math.floor(cv.width / 2), 2, 1, 1).data; return [d[0], d[1], d[2]]; });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Au téléphone (390 px) : les étiquettes se lisent encore ──
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
    await q.locator("[data-pari-choix] li button").first().click();
    await q.locator("[data-lancer]").click();
    await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-course-finie") === "oui", SCENE, { timeout: 60000 }).catch(() => {});
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 1 révélée", p2, q);
  } finally {
    await nav2.close();
  }
}

// ── Sans mouvement (prefers-reduced-motion) : la corde CALCULE sans animer —
//    l'image finale arrive d'un coup, aucune image intermédiaire. ──
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
    const vus = await q.evaluate(async (el) => {
      const ts = new Set();
      el.querySelector("[data-lancer]").click();
      const t0 = performance.now();
      while (performance.now() - t0 < 1500) {
        await new Promise((r) => requestAnimationFrame(r));
        ts.add(el.getAttribute("data-t"));
        if (el.getAttribute("data-course-finie") === "oui" && performance.now() - t0 > 400) break;
      }
      return { ts: [...ts], finie: el.getAttribute("data-course-finie") };
    });
    const intermediaires = vus.ts.filter((t) => t !== "0" && t !== "1");
    juger("sans-mouvement", vus.finie === "oui" && intermediaires.length === 0, `mouvement réduit demandé : course ${vus.finie === "oui" ? "finie" : "PAS finie"} en moins de 1,5 s ; instants vus [${vus.ts.join(", ")}] — ${intermediaires.length ? "des images INTERMÉDIAIRES" : "aucune image intermédiaire"}`);
  } finally {
    await nav3.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR, course: 0 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-corde : la corde, la photo et le film (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
for (const a of avertissements) console.log(`  ⚠ [performance] ${a}`);
if (!pret) { console.error("\nMUET — la corde n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "nombres", "grille-exacte", "miroir", "miroir-inerte", "front-net", "retard-signe", "forme-conservee", "M-n-avance-pas", "celerite-independante", "exageration", "photos-distinctes", "une-seule-source", "pas-de-retour", "pas-de-periodicite", "instant-photo", "eclairs", "sans-mouvement", "frontiere", "latex", "fuite-inter-etapes", "etiquettes", "cadre", "ergonomie"];
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
