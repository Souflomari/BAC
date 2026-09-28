#!/usr/bin/env node
/**
 * scene-diffraction — la porte du « banc de diffraction »
 * (pc/propagation-onde-lumineuse, R3 ; spec
 * content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et
 * trouve son panneau par `[data-scene="banc-de-diffraction"]`. La scène est
 * ANALYTIQUE : la porte refait chaque NOMBRE par sa propre arithmétique (les
 * constantes de la spec, écrites ICI), et lit les faits de PIXELS dans les
 * deux sens. Les repères du produit ne servent qu'à savoir OÙ regarder, jamais
 * à mesurer : l'échelle en travers est LUE sur les graduations de la règle,
 * les largeurs sur la bande de l'écran, l'éventail sur l'encre d'accent.
 *
 * LES FAMILLES (spec §11) : avant-clic · pas-de-3d · etapes · avant-pari ·
 * paris · nombres (N1…N10) · tache-et-regle · plus-etroite-plus-large ·
 * eventail-fixe · exageration-constante · fente-symbole · regle-graduee ·
 * graphe-droite · secondaires · palette · formule-graduee ·
 * fuite-inter-etapes · frontiere (une sonde par FORME) · latex · etiquettes et
 * cadre (1 280 et 390 px) · immobile · theme · console · ergonomie ; et,
 * depuis la vague 2 (HANDOFF §11.204) : annonce · lectures · coche ·
 * graphe-lisible — et, dans `etiquettes`, l'encre SOUS une étiquette sans fond.
 *
 *   node scripts/scene-diffraction.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-diffraction.mjs --essai-rouge  (chaque famille doit crier ;
 *                                                      chaque forme injectée, vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_DIFFRACTION ?? 3600 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/propagation-onde-lumineuse";
const SCENE = "banc-de-diffraction";
const OUVRIR = "Ouvrir le banc de diffraction";

// ── La seconde voie : les constantes de la SPEC (§5.1), rien du produit ────
// L'essai rouge RETOURNE les attentes (`juger`) ; il ne fausse pas aussi les
// constantes (leçon de la corde : deux inversions s'annulent).
const FENTES = ["0.060", "0.080", "0.100", "0.150", "0.200", "0.300", "1.000"];
const LASERS = ["450", "532", "600", "650"];
const CHEVEU = 0.08; // mm
const EXAG = 10;
/** L = 2λD/a, en cm (λ en nm, a en mm, D en m). */
const Lcm = (l, a, D) => ((2 * l * 1e-9 * D) / (a * 1e-3)) * 100;
const theta = (l, a) => (l * 1e-9) / (a * 1e-3);
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
function trois(x) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return virgule(x, d);
}
const EXP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
function sci(x, cs = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = (x / 10 ** e).toFixed(cs - 1);
  if (parseFloat(m) >= 10) { e += 1; m = (x / 10 ** e).toFixed(cs - 1); }
  return `${m.replace(".", ",")}×10${String(e).split("").map((c) => EXP[c]).join("")}`;
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
  if (!vivant) { console.error("scene-diffraction : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
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
/** Une mesure d'une famille VISÉE par l'essai rouge : l'essai retourne l'attente. */
const juger = (famille, ok, detail) => noter(famille, ESSAI ? !ok : ok, detail);

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/propagation-onde-lumineuse/media/banc-de-diffraction.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-diffraction : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
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
async function glisser(cle, v) {
  await panneau.locator(`[data-controle="${cle}"] input`).evaluate((el, val) => {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    set.call(el, String(val));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, v);
  await deuxImages();
  await page.waitForTimeout(30);
}
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

/** Les pixels d'ACCENT du canvas, comptés en CHROMINANCE (jamais en luminance — ADR 0041). */
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

/** Les pixels TEINTÉS qui ne sont pas l'accent (une teinte spectrale, par exemple). */
const pixelsHorsPalette = () => panneau.evaluate((el, accent) => {
  const cv = el.querySelector("canvas");
  const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data;
  const chroma = (r, g, b) => { const m = (r + g + b) / 3; return [r - m, g - m, b - m]; };
  const ca = chroma(...accent), na = Math.hypot(...ca);
  let n = 0;
  for (let i = 0; i < d.length; i += 4) {
    const c = chroma(d[i], d[i + 1], d[i + 2]), nc = Math.hypot(...c);
    if (nc > 20 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) < 0.6) n++;
  }
  return n;
}, accent);

/**
 * Une COLONNE (ou une rangée) du canvas : l'écart de chaque pixel au fond, en
 * luminance, et s'il est d'accent. Le fond est le jeton `--figure-surface`.
 */
const profilPixels = (axe, pos, de, a) => panneau.evaluate((el, { axe, pos, de, a, accent }) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const g = cv.getContext("2d");
  const P = Math.round(pos * dpr - 0.5), A = Math.max(0, Math.round(de * dpr)), B = Math.min(axe === "rangee" ? cv.width : cv.height, Math.round(a * dpr));
  const n = B - A;
  if (n <= 0) return { dpr, A, ecart: [], teinte: [] };
  const d = axe === "rangee" ? g.getImageData(A, P, n, 1).data : g.getImageData(P, A, 1, n).data;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
  const f = t.getImageData(0, 0, 1, 1).data;
  const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const ca = chroma(...accent), na = Math.hypot(...ca);
  const ecart = [], teinte = [];
  for (let k = 0; k < n; k++) {
    const r = d[4 * k], g2 = d[4 * k + 1], b = d[4 * k + 2];
    const c = chroma(r, g2, b), nc = Math.hypot(...c);
    teinte.push(nc > 12 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85);
    ecart.push(Math.abs(0.2126 * r + 0.7152 * g2 + 0.0722 * b - lf) + (nc > 12 ? nc : 0));
  }
  return { dpr, A, ecart, teinte };
}, { axe, pos, de, a, accent });

/** Les plages d'encre (écart > min) d'une colonne ou d'une rangée : leurs centres, en px CSS. */
async function plages(axe, pos, de, a, min = 40, filtre = "tout") {
  const { dpr, A, ecart, teinte } = await profilPixels(axe, pos, de, a);
  const out = [];
  let debut = -1, somme = 0, poids = 0;
  for (let k = 0; k <= ecart.length; k++) {
    const dans = k < ecart.length && ecart[k] > min && (filtre === "tout" || (filtre === "accent") === teinte[k]);
    if (dans) {
      if (debut < 0) { debut = k; somme = 0; poids = 0; }
      somme += (k + 0.5) * ecart[k]; poids += ecart[k];
    } else if (debut >= 0) {
      out.push({ centre: (A + somme / poids) / dpr, de: (A + debut) / dpr, a: (A + k) / dpr });
      debut = -1;
    }
  }
  return out;
}

/**
 * La RÈGLE, lue aux pixels : ses graduations FORTES (un trait de 7 px ; les
 * fines n'en font que 4) dans la colonne à 5,5 px du pied de la règle. Rend
 * leurs centres et le pas moyen — l'échelle en travers, en px par cm.
 */
async function regle() {
  const e = await repere("ecran"), eh = await repere("ecran-haut");
  if (!e || !eh) return null;
  const xr = e.x + 5;
  const hh = e.y - eh.y;
  const forts = (await plages("colonne", xr + 5.5, e.y - hh, e.y + hh, 40)).map((p) => p.centre);
  if (forts.length < 3) return null;
  const pas = forts.slice(1).map((c, i) => c - forts[i]);
  const moyen = (forts[forts.length - 1] - forts[0]) / (forts.length - 1);
  // la colonne des DEUX graduations (fines et fortes), à 2,5 px du pied
  const toutes = (await plages("colonne", xr + 2.5, e.y - hh, e.y + hh, 40)).map((p) => p.centre);
  return { forts, pas, moyen, toutes, ym: e.y, xe: e.x };
}

/**
 * La TACHE, lue sur la bande de l'écran (la colonne à 6 px devant l'écran) :
 * depuis l'axe, on monte et on descend jusqu'au premier MINIMUM d'encre — le
 * bord de la tache centrale ; puis au suivant. Rend les bords, en px.
 */
async function tache() {
  const e = await repere("ecran"), eh = await repere("ecran-haut");
  if (!e || !eh) return null;
  const hh = e.y - eh.y;
  const { dpr, A, ecart } = await profilPixels("colonne", e.x - 6.5, e.y - hh, e.y + hh);
  const ym = Math.round(e.y * dpr) - A;
  const minima = (sens) => {
    const out = [];
    let k = ym;
    let prec = ecart[k];
    for (k = ym + sens; k > 1 && k < ecart.length - 2 && out.length < 3; k += sens) {
      const v = ecart[k];
      // un minimum : plus bas que ses deux voisins (ou nul), et bien plus bas que le centre
      if (v <= ecart[k - 1] && v <= ecart[k + 1] && v < 0.3 * ecart[ym] && (v < ecart[k - sens * 2] || v === 0)) {
        // centre du creux (plateau de zéros compris)
        let j = k;
        while (ecart[j + sens] === v && j + sens > 0 && j + sens < ecart.length - 1) j += sens;
        out.push(((k + j) / 2 + 0.5 + A) / dpr);
        k = j + sens * 2;
      }
      prec = v;
    }
    return out;
  };
  const haut = minima(-1), bas = minima(1);
  // l'éclat de la première tache voisine (entre le 1er et le 2e creux, côté bas),
  // relatif au centre : c'est ce que l'éclaircissement déclaré rend visible
  let voisine = NaN;
  if (bas.length >= 2) {
    const k1 = Math.round(bas[0] * dpr) - A, k2 = Math.round(bas[1] * dpr) - A;
    let pic = 0;
    for (let k = k1; k <= k2; k++) pic = Math.max(pic, ecart[k] ?? 0);
    voisine = pic / Math.max(1, ecart[ym]);
  }
  return { haut, bas, voisine, largeur: haut.length && bas.length ? bas[0] - haut[0] : NaN, centre: haut.length && bas.length ? (bas[0] + haut[0]) / 2 : NaN, ym: e.y };
}

/** L'éventail : les deux rayons d'accent dans la colonne x, et leur écartement (px). */
async function eventail(x) {
  const e = await repere("ecran"), eh = await repere("ecran-haut");
  if (!e || !eh) return null;
  const hh = e.y - eh.y;
  const r = await plages("colonne", x, e.y - hh, e.y + hh, 10, "accent");
  if (r.length < 2) return { n: r.length, ecart: NaN };
  const h = r[0].centre, b = r[r.length - 1].centre;
  return { n: r.length, ecart: b - h, haut: h, bas: b };
}

/** La fente, aux pixels : le creux entre les deux morceaux de la plaque, dans sa colonne. */
async function fenteDessinee() {
  const f = await repere("fente"), oh = await repere("objet-haut");
  if (!f || !oh) return NaN;
  // la plaque : deux LONGUES plages d'encre neutre ; l'axe en tirets et les rayons d'accent n'en sont pas
  const r = (await plages("colonne", f.x, oh.y - 2, f.y + (f.y - oh.y) + 2, 60, "neutre")).filter((p) => p.a - p.de >= 10);
  const au = r.filter((p) => p.a <= f.y + 0.5), sous = r.filter((p) => p.de >= f.y - 0.5);
  if (!au.length || !sous.length) return NaN;
  return sous[0].de - au[au.length - 1].a;
}

// ── Avant le pari, la frontière, le LaTeX, la formule graduée ──
async function avantPari(ou, interdits = []) {
  const teinte = await pixelsAccent();
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const reponse = [];
  for (const r of ["rayon-haut", "crochet-L", "point-0", "point-courant", "ref-haut"]) if (await repere(r)) reponse.push(r);
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const dits = interdits.filter((m) => desc.includes(m));
  const ok = teinte === 0 && l === 0 && reponse.length === 0 && dits.length === 0 && (await controles()) === "";
  juger("avant-pari", ok, `${ou}, avant le pari : ${teinte} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, ${reponse.length ? `RÉPONSE DESSINÉE : ${reponse.join(", ")}` : "ni rayon, ni crochet, ni point"}, contrôles [${await controles()}]${dits.length ? ` — la description DIT : ${dits.join(", ")}` : ""}`);
}
/** L'état posé par l'étape (spec §12, table des états). */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { a: await attr("data-a-mm"), l: await attr("data-lambda-nm"), D: parseFloat(await attr("data-d-m")), o: await attr("data-objet"), v: await attr("data-vue"), ph: await attr("data-pari") };
  const ok = lu.a === e.a_mm && lu.l === e.lambda_nm && Math.abs(lu.D - e.D_m) < 1e-9 && lu.o === e.objet && lu.v === e.vue && lu.ph === "attente";
  juger("etapes", ok, `étape ${id} : a = ${lu.a} mm, λ = ${lu.l} nm, D = ${lu.D} m, ${lu.o}, vue ${lu.v}, pari « ${lu.ph} »`);
  const graphe = !!(await repere("graphe-o"));
  juger("etapes", graphe === (e.vue === "banc-et-graphe"), `étape ${id} : le graphe ${graphe ? "EXISTE" : "n'existe pas"} (attendu : ${e.vue === "banc-et-graphe" ? "oui" : "non"})`);
}

/** Un mot qui COMMENCE ici : `\b` ignore les lettres accentuées. */
const mot = (src) => new RegExp(`(?<!\\p{L})${src}`, "iu");
/** Un mot ENTIER (ni précédé ni suivi d'une lettre). */
const entier = (src) => new RegExp(`(?<!\\p{L})${src}(?!\\p{L})`, "iu");
const FORMES = [
  ["interférence", mot("interf[ée]r"), "des interférences"], ["interfrange", mot("interfrange"), "l'interfrange"], ["Young", /\bYoung\b/, "les fentes de Young"], ["bifente", mot("bifente"), "une bifente"], ["deux fentes", /deux fentes/i, "deux fentes"],
  ["cohérence", mot("cohéren"), "la cohérence"], ["déphasage", mot("déphasage"), "le déphasage"], ["différence de marche", /différence de marche/i, "la différence de marche"], ["frange", mot("frange"), "la frange centrale"],
  ["réseau", mot("réseau"), "un réseau"], ["traits par mm", /traits par mm/i, "500 traits par mm"], ["ordre k", /ordre\s*(k|1|2)\b/i, "l'ordre k"], ["k\\lambda", /k\s*\\lambda/, "k\\lambda"],
  ["sinc", /\bsinc\b/i, "sinc(u)"], ["sin(u)/u", /sin\s*\(\s*u\s*\)\s*\/\s*u/i, "sin(u)/u"], ["intensité", mot("intensité"), "l'intensité"], ["éclairement", mot("éclairement"), "l'éclairement"], ["I(θ)", /I\s*\(\s*(θ|\\theta)/, "I(θ)"], ["I_0", /I_0|I₀/, "I₀"],
  ["amplitude complexe", /amplitude complexe/i, "l'amplitude complexe"], ["Huygens", /Huygens/i, "le principe de Huygens"], ["Fresnel", /Fresnel/i, "Fresnel"], ["Fraunhofer", /Fraunhofer/i, "Fraunhofer"], ["source secondaire", /sources? secondaires?/i, "une source secondaire"],
  ["minimum d'ordre", /minimum d['’]ordre/i, "un minimum d'ordre 1"], ["annulation", mot("annulation"), "l'annulation"], ["extinction", mot("extinction"), "une extinction"], ["intégrale", mot("intégrale"), "l'intégrale"],
  ["polarisation", mot("polaris"), "la polarisation"], ["Doppler", /Doppler/i, "l'effet Doppler"],
  ["équation d'onde", /équation d['’]onde/i, "l'équation d'onde"], ["équation de propagation", /équation de propagation/i, "l'équation de propagation"], ["d'Alembert", /Alembert/i, "d'Alembert"], ["laplacien", mot("laplacien"), "le laplacien"], ["dérivée partielle", /dérivée partielle/i, "une dérivée partielle"],
  ["indice", mot("indice"), "l'indice du milieu"], ["n = c/v", /n\s*=\s*c\s*\/\s*v/, "n = c/v"], ["λ₀/n", /(\\lambda_0|λ₀|λ0)\s*\/\s*n/, "λ₀/n"], ["réfraction", mot("réfract"), "la réfraction"], ["milieu transparent", /milieu transparent/i, "un milieu transparent"], ["plongé dans", /plongée? dans/i, "plongé dans l'eau"],
  ["liquide", mot("liquide"), "un liquide"], ["eau", entier("eau"), "dans l'eau"], ["verre", entier("verre"), "du verre"],
  ["monochromatique", mot("monochromatique"), "une lumière monochromatique"], ["polychromatique", mot("polychromatique"), "polychromatique"], ["lumière blanche", /lumière blanche/i, "la lumière blanche"], ["spectre", mot("spectre"), "le spectre"], ["arc-en-ciel", /arc-en-ciel/i, "un arc-en-ciel"],
  ["prisme", mot("prisme"), "un prisme"], ["dispersion", mot("dispersi"), "la dispersion"], ["\\lambda_0", /\\lambda_0|λ₀/, "λ₀"], ["\\nu", /\\nu\b|ν/, "ν"], ["fréquence", mot("fréquence"), "la fréquence"],
  ["Babinet", /Babinet/i, "le théorème de Babinet"], ["complémentaire", mot("complémentaire"), "des écrans complémentaires"],
  ["> 10^{-3}", />\s*10\s*\^?\s*\{?\s*[-−]\s*3|>\s*10⁻³/, "λ/a > 10⁻³"], ["critère", mot("critère"), "le critère"], ["seuil", mot("seuil"), "un seuil"], ["condition chiffrée", /condition chiffrée/i, "une condition chiffrée"],
  ["luminosité", mot("luminosité"), "la luminosité"], ["brillance", mot("brillance"), "la brillance"], ["puissance", mot("puissance"), "la puissance"], ["watt", entier("watts?"), "5 watts"], ["W/m", /W\s*\/\s*m/, "W/m²"], ["lux", entier("lux"), "500 lux"], ["énergie", mot("énergie"), "l'énergie"], ["flux lumineux", /flux lumineux/i, "le flux lumineux"], ["photon", mot("photon"), "un photon"], ["quantique", mot("quantique"), "quantique"],
  ["°", /°/, "0,57°"], ["degré", mot("degré"), "en degrés"], ["\\deg", /\\deg/, "\\deg"],
  ["log", entier("log"), "log L"], ["semi-log", /semi-log/i, "papier semi-log"], ["logarithmique", mot("logarithm"), "une échelle logarithmique"], ["linéarisation", mot("linéaris"), "la linéarisation"],
  ["travaux pratiques", /travaux pratiques/i, "en travaux pratiques"], ["TP", /(?<!\p{L})TP(?!\p{L})/u, "un TP"], ["au laboratoire", /au laboratoire/i, "on a mesuré au laboratoire"], ["incertitude", mot("incertitude"), "l'incertitude"], ["± 1 mm", /±\s*1\s*mm/, "± 1 mm"],
];
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `forme(s) interdite(s) AFFICHÉE(S) : ${vues.join(", ")}` : `aucune des ${FORMES.length} formes interdites`}`);
}
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(theta|lambda|frac|dfrac|times|text)\b/g) ?? [];

/**
 * LA FORMULE GRADUÉE (spec §2.3) : la relation elle-même est un état qui fuit.
 * Lue dans le textContent (les annotations TeX de KaTeX comprises) : « λ/a »
 * sous TOUTES ses formes n'existe pas avant la révélation de S2, ni « 2λD »
 * avant celle de S3 — et existe APRÈS (sans quoi la famille ne mesure rien).
 */
const LAMBDA_SUR_A = /\\d?frac\s*\{\s*\\lambda\s*\}\s*\{\s*a\s*\}|\\lambda\s*\/\s*a(?![a-zA-Z])|λ\s*\/\s*a(?!\p{L})/u;
const DEUX_LAMBDA_D = /2\s*\\lambda\s*D|2\s*λ\s*D/;
const texteComplet = () => panneau.evaluate((el) => el.textContent ?? "");
async function formule(ou, { lambdaSurA, deuxLambdaD }) {
  const t = await texteComplet();
  const a = LAMBDA_SUR_A.test(t), b = DEUX_LAMBDA_D.test(t);
  const fautes = [];
  if (lambdaSurA !== undefined && a !== lambdaSurA) fautes.push(`« λ/a » ${a ? "PRÉSENT" : "ABSENT"} (attendu ${lambdaSurA ? "présent" : "absent"})`);
  if (deuxLambdaD !== undefined && b !== deuxLambdaD) fautes.push(`« 2λD » ${b ? "PRÉSENT" : "ABSENT"} (attendu ${deuxLambdaD ? "présent" : "absent"})`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `λ/a ${a ? "écrit" : "non écrit"}, 2λD ${b ? "écrit" : "non écrit"}, comme prévu`}`);
}

/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; près de ce qu'elles nomment. */
const ANCRES = { "nom-laser": "laser", "nom-objet": "objet-haut", "nom-ecran": "ecran-haut", "nom-theta": "fente", "nom-L": "crochet-L" };
const PRES = { "nom-laser": 36, "nom-objet": 36, "nom-ecran": 36, "nom-theta": 70, "nom-L": 36 };
async function etiquettesLisibles(ou, q = panneau) {
  const { textes, larg, haut, legende, ancres, encre } = await q.evaluate((el, ANCRES) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const transparent = (e) => { const c = getComputedStyle(e).backgroundColor; return c === "transparent" || /rgba\(.*,\s*0\)$/.test(c); };
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => visible(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), sansFond: transparent(e), ...boite(e) }));
    const lg = el.querySelector("[data-legende]");
    const legende = lg ? boite(lg) : null;
    const ancres = {};
    for (const [nom, r] of Object.entries(ANCRES)) {
      const s = el.querySelector(`[data-etiquette="${r}"]`);
      if (s && visible(s)) { const b = s.getBoundingClientRect(); ancres[nom] = { x: b.left - rc.left + b.width / 2, y: b.top - rc.top + b.height / 2 }; }
    }
    // L'encre SOUS une étiquette SANS FOND : son texte et le dessin se
    // superposent (vague 2 : « D (cm) » posé dans la rangée des nombres de
    // l'axe, sous « 200 » — aucune mesure ne regardait le canvas sous une
    // étiquette transparente, seulement les étiquettes entre elles)
    {
      const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
      const f = g.getImageData(cv.width - 1, 0, 1, 1).data;
      for (const a of textes) {
        if (!a.sansFond) continue;
        const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
        const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
        a.encreDessous = 0;
        if (w <= 0 || h <= 0) continue;
        const d = g.getImageData(x0, y0, w, h).data;
        for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) a.encreDessous++;
      }
    }
    let encre = null;
    if (legende) {
      const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
      const d = g.getImageData(Math.max(0, Math.floor(legende.x0 * dpr)), Math.max(0, Math.floor(legende.y0 * dpr)), Math.max(1, Math.ceil((legende.x1 - legende.x0) * dpr)), Math.max(1, Math.ceil((legende.y1 - legende.y0) * dpr))).data;
      const f = g.getImageData(cv.width - 1, 0, 1, 1).data;
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
    if (a.encreDessous > 0) fautes.push(`« ${a.nom} », sans fond, posée sur ${a.encreDessous} pixel(s) d'encre du dessin`);
    const o = ancres[a.nom];
    if (o) {
      const dist = Math.hypot(Math.max(a.x0 - o.x, 0, o.x - a.x1), Math.max(a.y0 - o.y, 0, o.y - a.y1));
      if (dist > PRES[a.nom]) fautes.push(`« ${a.nom} » à ${dist.toFixed(0)} px de ce qu'elle nomme (> ${PRES[a.nom]})`);
    }
  }
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s) (${textes.map((t) => t.nom).join(", ")})${fautes.length ? ` — ${fautes.join(" ; ")}` : `, ni chevauchées, ni sous la légende, dans le cadre, près de leur objet ; ${textes.filter((x) => x.sansFond).length} sans fond, chacune sur du blanc`}`);
  juger("cadre", encre === 0, `${ou} : ${encre === null ? "légende ABSENTE" : `${encre} pixel(s) d'encre sous la légende`} (attendu 0)`);
}

/** La tache, mesurée contre la règle : largeur en px = L (calculé ICI) × pas de la règle. */
async function tacheContreRegle(ou, l, a, D) {
  const r = await regle(), t = await tache();
  if (!r || !t || !Number.isFinite(t.largeur)) { juger("tache-et-regle", false, `${ou} : règle ${r ? "lue" : "ILLISIBLE"}, tache ${t && Number.isFinite(t.largeur) ? "lue" : "ILLISIBLE"}`); return null; }
  const attendu = Lcm(l, a, D) * r.moyen;
  return { r, t, attendu, ok: Math.abs(t.largeur - attendu) <= 2 };
}

// ════════════════════════════════════════════════════════════════════════
try {
  if (!pret) throw new Error("la scène n'a pas pu dessiner");

  // ── S1 : une fente deux fois plus fine ────────────────────────────────
  await etatPose("fente-deux-fois-plus-fine");
  await avantPari("étape 1", ["2,40", "deux fois"]);
  await formule("étape 1, avant le pari", { lambdaSurA: false, deuxLambdaD: false });
  {
    // la tache de DÉPART, à l'encre : 1,20 cm contre la règle (l'énoncé)
    const m = await tacheContreRegle("étape 1, avant", 600, 0.2, 2.0);
    if (m) juger("tache-et-regle", m.ok, `étape 1, avant le pari : tache de ${virgule(m.t.largeur, 1)} px, attendu ${virgule(m.attendu, 1)} (1,20 cm × ${virgule(m.r.moyen, 2)} px/cm lus sur la règle)`);
  }
  await parier(indexDe("fente-deux-fois-plus-fine", "deux-fois-plus-large"));
  {
    const res = await resultat();
    juger("paris", /bonne réponse/i.test(res), `étape 1, pari juste : « ${res} » — verdict immédiat`);
    juger("etapes", (await controles()) === "fente" && (await attr("data-a-mm")) === "0.100", `étape 1 révélée : contrôles [${await controles()}], la révélation pose a = ${await attr("data-a-mm")} mm (attendu 0.100)`);
    juger("nombres", (await lecture("largeur-tache")) === "2,40 cm" && (await lecture("ecart-angulaire")) === `${sci(theta(600, 0.1))} rad`, `étape 1 révélée : L « ${await lecture("largeur-tache")} », θ « ${await lecture("ecart-angulaire")} » (attendu 2,40 cm, ${sci(theta(600, 0.1))} rad)`);
    // la révélation CHANGE un réglage : elle doit le DIRE (vague 2, ergonomie —
    // la fente cochée passait de 0,200 à 0,100 mm en silence pour le lecteur d'écran)
    const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
    juger("annonce", /0,100\s*mm/.test(an) && /2,40\s*cm/.test(an), `étape 1 révélée : la région vivante dit « ${an || "(rien)"} » (attendu : la fente de 0,100 mm posée, et 2,40 cm)`);
    // la pièce EN PLACE se voit sans le pointeur (vague 2 : seule la ligne SURVOLÉE
    // portait une surface ; la cochée n'était qu'un rond de 13 px)
    await page.mouse.move(2, 2);
    await page.waitForTimeout(250);
    const voiles = await panneau.locator('[data-controle="fente"] label').evaluateAll((ls) => ls.map((l) => ({ coche: !!l.querySelector("input")?.checked, o: parseFloat(getComputedStyle(l, "::after").opacity) || 0 })));
    // L se lit SUR la scène, à côté de son crochet (la scène reste sous les yeux quand on règle)
    const surScene = espaces(await panneau.locator('[data-etiquette="nom-L"]').innerText().catch(() => ""));
    juger("lectures", /2,40\s*cm/.test(surScene), `étape 1 révélée : l'étiquette du crochet dit « ${surScene} » (attendu la valeur, 2,40 cm)`);
    const oc = voiles.filter((v) => v.coche).map((v) => v.o), on = voiles.filter((v) => !v.coche).map((v) => v.o);
    juger("coche", oc.length === 1 && on.length === 6 && Math.min(...oc) > Math.max(...on), `étape 1 révélée, pointeur ailleurs : voile de la pièce cochée ${oc.join(" · ") || "?"}, des six autres ${[...new Set(on)].join(" · ") || "?"} (la cochée doit porter plus)`);
  }
  await formule("étape 1, révélée", { lambdaSurA: false, deuxLambdaD: false });
  {
    // N4 et N8 : les sept pièces, à 600 nm et 2,00 m — a × L AFFICHÉS = 0,240, a/λ entier
    const fautes = [], largeurs = [], fentes = [];
    for (const a of FENTES) {
      await cocher('[data-controle="fente"]', a);
      const Ls = await lecture("largeur-tache");
      const Lnum = parseFloat(Ls.replace(",", "."));
      if (Ls !== `${trois(Lcm(600, parseFloat(a), 2.0))} cm`) fautes.push(`a = ${a} : L « ${Ls} »`);
      if (Math.abs(parseFloat(a) * Lnum - 0.24) > 1e-9) fautes.push(`a = ${a} : a × L = ${(parseFloat(a) * Lnum).toFixed(4)}`);
      const rap = (await lecture("rapport")).replace(/\s/g, "");
      if (!rap.startsWith(String(Math.round((parseFloat(a) * 1e-3) / 600e-9)))) fautes.push(`a = ${a} : rapport « ${rap} »`);
      fentes.push(await fenteDessinee());
      const t = await tache();
      largeurs.push(t?.largeur ?? NaN);
    }
    juger("nombres", fautes.length === 0, `N4 · N8 — les sept pièces à 600 nm : L à trois chiffres, a × L = 0,240 sur les valeurs AFFICHÉES, a/λ entier${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : ""}`);
    const f = fentes.filter(Number.isFinite);
    juger("fente-symbole", f.length === 7 && Math.max(...f) - Math.min(...f) <= 1, `la fente DESSINÉE aux sept pièces : ${fentes.map((x) => virgule(x, 1)).join(" · ")} px (un symbole : identique à 1 px)`);
    const decroit = largeurs.every(Number.isFinite) && largeurs.slice(1).every((w, i) => w < largeurs[i]);
    juger("plus-etroite-plus-large", decroit, `sens a (0,060 → 1,000 mm, 600 nm, 2,00 m) : taches de ${largeurs.map((w) => virgule(w, 0)).join(" · ")} px (strictement décroissantes)`);
  }
  await cocher('[data-controle="fente"]', "0.100");
  {
    const r = await regle();
    const t = await tache();
    const pasOk = r && r.pas.every((p) => Math.abs(p - r.moyen) <= 1);
    const surTrait = r && t && r.forts.some((c) => Math.abs(c - t.centre) <= 1);
    const fines = r ? r.toutes.length : 0;
    juger("regle-graduee", !!(pasOk && surTrait && r.forts.length >= 4 && fines >= 2 * r.forts.length - 2), `règle : ${r ? r.forts.length : 0} graduations fortes au pas de ${r ? r.pas.map((p) => virgule(p, 1)).join(" · ") : "?"} px (à 1 px), ${fines} traits en tout (une fine entre deux fortes) ; l'axe ${surTrait ? "SUR" : "HORS D'"}une graduation forte`);
  }
  await frontiere("étape 1 révélée");
  await etiquettesLisibles("étape 1 révélée");
  await suivant();

  // ── S2 : la même fente, un autre laser ────────────────────────────────
  await etatPose("meme-fente-autre-laser");
  await avantPari("étape 2", ["2,60", "plus large"]);
  await formule("étape 2, avant le pari", { lambdaSurA: false, deuxLambdaD: false });
  juger("palette", (await pixelsHorsPalette()) === 0, `étape 2, laser bleu : ${await pixelsHorsPalette()} pixel(s) teintés hors de la palette (attendu 0 — la tache ne prend jamais la couleur du laser)`);
  await parier(indexDe("meme-fente-autre-laser", "plus-large"));
  juger("etapes", (await controles()) === "couleur" && (await attr("data-lambda-nm")) === "650", `étape 2 révélée : contrôles [${await controles()}], la révélation pose λ = ${await attr("data-lambda-nm")} nm (attendu 650)`);
  await formule("étape 2, révélée", { lambdaSurA: true, deuxLambdaD: false });
  {
    const largeurs = [], fautes = [];
    for (const l of LASERS) {
      await cocher('[data-controle="couleur"]', l);
      const Ls = await lecture("largeur-tache");
      if (Ls !== `${trois(Lcm(+l, 0.1, 2.0))} cm`) fautes.push(`λ = ${l} : « ${Ls} »`);
      largeurs.push((await tache())?.largeur ?? NaN);
      const hp = await pixelsHorsPalette();
      if (hp) fautes.push(`λ = ${l} : ${hp} px hors palette`);
    }
    juger("nombres", fautes.filter((f) => !f.includes("palette")).length === 0, `N1 — la fente de 0,100 mm aux quatre lasers : ${fautes.filter((f) => !f.includes("palette")).join(" ; ") || "1,80 · 2,13 · 2,40 · 2,60 cm"}`);
    juger("palette", !fautes.some((f) => f.includes("palette")), `les quatre lasers, révélés : ${fautes.filter((f) => f.includes("palette")).join(" ; ") || "aucun pixel teinté hors de la palette"}`);
    const croit = largeurs.every(Number.isFinite) && largeurs.slice(1).every((w, i) => w > largeurs[i]);
    juger("plus-etroite-plus-large", croit, `sens λ (450 → 650 nm, 0,100 mm, 2,00 m) : taches de ${largeurs.map((w) => virgule(w, 0)).join(" · ")} px (strictement croissantes)`);
  }
  await frontiere("étape 2 révélée");
  await etiquettesLisibles("étape 2 révélée");
  await suivant();

  // ── S3 : l'écran qui recule, et le graphe ─────────────────────────────
  await etatPose("ecran-qui-recule");
  await avantPari("étape 3", ["proportionnel", "origine", "600"]);
  await formule("étape 3, avant le pari", { deuxLambdaD: false });
  {
    const lambdaVue = (await panneau.evaluate((el) => el.innerText)).includes("600 nm") || !!(await panneau.locator('[data-lecture="longueur-onde"], [data-lecture="rapport"]').count());
    juger("fuite-inter-etapes", !lambdaVue, `étape 3 : la longueur d'onde (l'INCONNUE) ${lambdaVue ? "est AFFICHÉE" : "n'est affichée nulle part"}`);
  }
  await parier(indexDe("ecran-qui-recule", "proportionnelle"));
  juger("etapes", (await controles()) === "distance" && Math.abs(parseFloat(await attr("data-d-m")) - 2.0) < 1e-9, `étape 3 révélée : contrôles [${await controles()}], la révélation pose D = ${await attr("data-d-m")} m (attendu 2,00)`);
  await formule("étape 3, révélée", { lambdaSurA: true, deuxLambdaD: true });
  {
    // … et APRÈS la révélation : λ s'y DÉDUIT de la pente, elle ne s'y lit jamais
    // comme une donnée. La campagne de sabotages (`lambda-en-S3`, la lecture
    // « longueur d'onde » ajoutée à S3) : cette famille ne regardait qu'AVANT le
    // pari, où aucune lecture n'existe — elle restait verte, et c'est `avant-pari`
    // qui l'attrapait, par la description (« un laser de 600 nm »). Sa PORTÉE
    // s'arrêtait à une phase de l'étape (ADR 0031).
    const donnee = await panneau.locator('[data-lecture="longueur-onde"], [data-lecture="rapport"]').count();
    const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
    const dite = /laser de \d/.test(desc);
    juger("fuite-inter-etapes", !donnee && !dite, `étape 3 révélée : la longueur d'onde du laser ${donnee ? "est AFFICHÉE comme une donnée" : dite ? "est DITE par la description" : "ne se lit que DÉDUITE de la pente"}`);
  }
  {
    // N2 · N5 : les 17 positions de l'écran
    const fautes = [], largeurs = [], rapports = [], eventails = [];
    const f = await repere("fente");
    for (let k = 0; k <= 16; k++) {
      const D = Math.round((0.4 + 0.1 * k) * 100) / 100;
      await glisser("distance", D);
      const Ls = await lecture("largeur-tache");
      if (Ls !== `${trois(Lcm(600, 0.06, D))} cm`) fautes.push(`D = ${D} : L « ${Ls} »`);
      if ((await lecture("pente")) !== "2,00×10⁻²") fautes.push(`D = ${D} : pente « ${await lecture("pente")} »`);
      if ((await lecture("lambda-deduite")) !== "600 nm") fautes.push(`D = ${D} : λ « ${await lecture("lambda-deduite")} »`);
      const t = await tache();
      const e = await repere("ecran");
      largeurs.push(t?.largeur ?? NaN);
      if (t && e && f) rapports.push({ r: t.largeur / (e.x - f.x), w: t.largeur, dx: e.x - f.x });
      // l'éventail, lu à distance FIXE de la fente (0,39 m), aux positions qui la dépassent
      if (D >= 0.8 && f && e) {
        const sx = (e.x - f.x) / D;
        eventails.push({ D, ev: await eventail(f.x + 0.39 * sx) });
      }
    }
    juger("nombres", fautes.length === 0, `N2 · N5 — les 17 positions de l'écran : L, la pente 2,00×10⁻² et λ = 600 nm${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : " exacts"}`);
    {
      // le curseur parle UNE fois par cran : L dans son aria-valuetext, et la
      // région vivante ne répète pas (vague 2 : deux énoncés par flèche)
      const avant = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
      await glisser("distance", 1.2);
      const vt = (await panneau.locator('[data-controle="distance"] input').getAttribute("aria-valuetext")) ?? "";
      const apres = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
      juger("annonce", /1,20\s*m/.test(vt) && /2,40\s*cm/.test(vt) && apres === avant, `étape 3, D = 1,20 m : le curseur dit « ${vt} » (attendu D et L) ; la région vivante ${apres === avant ? "se tait" : `PARLE AUSSI : « ${apres} »`}`);
    }
    const croit = largeurs.every(Number.isFinite) && largeurs.slice(1).every((w, i) => w > largeurs[i]);
    juger("plus-etroite-plus-large", croit, `sens D (0,40 → 2,00 m, 0,060 mm, 600 nm) : taches de ${virgule(largeurs[0], 0)} à ${virgule(largeurs[16], 0)} px (strictement croissantes)`);
    // largeur / distance fente–écran (px) : constant — jugé en PIXELS (à 0,40 m la
    // tache fait 15 px, un pixel y vaut 7 %)
    const moy = rapports.reduce((s, x) => s + x.r, 0) / (rapports.length || 1);
    const ecartMax = Math.max(...rapports.map((x) => Math.abs(x.w - moy * x.dx)));
    const ev = eventails.map((x) => x.ev?.ecart).filter(Number.isFinite);
    juger("eventail-fixe", ev.length === eventails.length && ev.length >= 4 && Math.max(...ev) - Math.min(...ev) <= 1.5 && rapports.length === 17 && ecartMax <= 1.5,
      `l'éventail, lu à 0,39 m de la fente, ${eventails.map((x) => `${virgule(x.D, 1)} m : ${x.ev ? virgule(x.ev.ecart, 1) : "?"} px`).join(" · ")} (le même à 1,5 px) ; la tache suit D : largeur ∝ distance, à ${virgule(ecartMax, 1)} px près (≤ 1,5)`);
  }
  {
    // le graphe : cinq points alignés avec l'origine, et des pas égaux
    // le point courant (un anneau) ailleurs que sur un point de mesure
    await glisser("distance", 1.0);
    const o = await repere("graphe-o");
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const p = await repere(`point-${i}`);
      if (!p) { pts.push(null); continue; }
      const col = await plages("colonne", p.x, p.y - 8, p.y + 8, 10, "accent");
      const rang = await plages("rangee", p.y, p.x - 8, p.x + 8, 10, "accent");
      pts.push(col.length && rang.length ? { x: rang.reduce((a, b) => (Math.abs(b.centre - p.x) < Math.abs(a.centre - p.x) ? b : a)).centre, y: col.reduce((a, b) => (Math.abs(b.centre - p.y) < Math.abs(a.centre - p.y) ? b : a)).centre } : null);
    }
    const ok = o && pts.every(Boolean);
    let detail = "points ou origine ILLISIBLES";
    let bon = false;
    if (ok) {
      const pente = (pts[4].y - o.y) / (pts[4].x - o.x);
      const ecarts = pts.map((p) => Math.abs(o.y + pente * (p.x - o.x) - p.y));
      const dx = pts.slice(1).map((p, i) => p.x - pts[i].x), dy = pts.slice(1).map((p, i) => p.y - pts[i].y);
      const reg = (v) => Math.max(...v) - Math.min(...v);
      bon = Math.max(...ecarts) <= 1.5 && reg(dx) <= 1.5 && reg(dy) <= 1.5;
      detail = `écart à la droite PAR L'ORIGINE ${ecarts.map((e) => virgule(e, 1)).join(" · ")} px (≤ 1,5) ; pas en D ${dx.map((v) => virgule(v, 1)).join(" · ")}, en L ${dy.map((v) => virgule(v, 1)).join(" · ")} (égaux à 1,5 px : axes linéaires)`;
    }
    juger("graphe-droite", bon, `étape 3 : ${detail}`);
  }
  await frontiere("étape 3 révélée");
  await etiquettesLisibles("étape 3 révélée");
  await suivant();

  // ── S4 : le cheveu ────────────────────────────────────────────────────
  await etatPose("le-cheveu");
  await avantPari("étape 4", ["3,00", "80", "même"]);
  await parier(indexDe("le-cheveu", "meme-figure"));
  juger("etapes", (await controles()) === "objet" && (await attr("data-objet")) === "cheveu", `étape 4 révélée : contrôles [${await controles()}], la révélation pose « ${await attr("data-objet")} » (attendu cheveu)`);
  {
    const Ls = await lecture("largeur-tache"), d = await lecture("diametre-deduit");
    juger("nombres", Ls === `${trois(Lcm(600, CHEVEU, 2.0))} cm` && d === "80,0 µm", `N6 — le cheveu : L « ${Ls} » (attendu 3,00 cm), d « ${d} » (attendu 80,0 µm)`);
    const m = await tacheContreRegle("étape 4, le cheveu", 600, CHEVEU, 2.0);
    if (m) juger("tache-et-regle", m.ok, `étape 4, le cheveu : tache de ${virgule(m.t.largeur, 1)} px, attendu ${virgule(m.attendu, 1)} (3,00 cm × ${virgule(m.r.moyen, 2)} px/cm)`);
  }
  await frontiere("étape 4 révélée");
  await etiquettesLisibles("étape 4 révélée");
  await suivant();

  // ── S5 : tout s'ouvre ─────────────────────────────────────────────────
  await etatPose("libre");
  await avantPari("étape 5");
  await parier(indexDe("libre", "fine-et-bleu"));
  {
    const res = await resultat();
    juger("paris", /incorrecte/i.test(res), `étape 5, pari faux (fine et bleu) : « ${res} » — verdict immédiat`);
    juger("etapes", (await controles()) === "couleur,distance,fente,objet", `étape 5 révélée : contrôles [${await controles()}]`);
    // les lectures nomment ce qui est À L'ÉCRAN, et la comparaison de l'étape se
    // lit d'un coup d'œil (vague 2, calme : huit lectures, dont une pente sans
    // droite, des bords et un rapport restés de S1 et S3)
    const cles = await panneau.locator("[data-lecture]").evaluateAll((els) => els.map((e) => e.getAttribute("data-lecture")));
    const iT = cles.indexOf("ecart-angulaire"), iM = cles.indexOf("theta-mesure");
    const intrus = cles.filter((c) => ["pente", "bords", "rapport"].includes(c));
    juger("lectures", intrus.length === 0 && iT >= 0 && iM === iT + 1, `étape 5, vue « banc » : lectures [${cles.join(", ")}] — ${intrus.length ? `SANS OBJET À L'ÉCRAN : ${intrus.join(", ")}` : "aucune sans objet"} ; θ et L/(2D) ${iM === iT + 1 ? "côte à côte" : "SÉPARÉS"}`);
  }
  {
    // N1 · N3 · N7 : les 28 combinaisons à 2,00 m ; tache-et-regle, exageration, secondaires
    const fautes = [], tr = [], ex = [], sec = [];
    const f = await repere("fente");
    for (const a of FENTES) {
      await cocher('[data-controle="fente"]', a);
      for (const l of LASERS) {
        await cocher('[data-controle="couleur"]', l);
        const aa = parseFloat(a), ll = parseFloat(l);
        const Ls = await lecture("largeur-tache"), ts = await lecture("ecart-angulaire"), tm = await lecture("theta-mesure");
        if (Ls !== `${trois(Lcm(ll, aa, 2.0))} cm`) fautes.push(`${a} mm · ${l} nm : L « ${Ls} »`);
        if (ts !== `${sci(theta(ll, aa))} rad`) fautes.push(`${a} mm · ${l} nm : θ « ${ts} »`);
        const tmv = parseFloat(tm.replace(",", ".").replace("×10", "e").replace(/⁻/g, "-").replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(c)));
        if (!(Math.abs(tmv - theta(ll, aa)) / theta(ll, aa) <= 0.005)) fautes.push(`${a} mm · ${l} nm : L/(2D) « ${tm} »`);
        const m = await tacheContreRegle(`${a} mm · ${l} nm`, ll, aa, 2.0);
        // une tache de moins de 8 px n'a pas de bords lisibles au pixel (1,000 mm à
        // 450 nm : 3,4 px — premier passage, lue 6,0) : elle n'est pas jugée ICI,
        // ses nombres le sont (N1), et le sens a la garde (plus-etroite-plus-large)
        if (m && m.attendu >= 8) tr.push({ c: `${a}·${l}`, ok: m.ok, lu: m.t.largeur, att: m.attendu });
        // l'exagération : le demi-écartement des rayons devant l'écran, sur la distance fente–face de la bande
        const e = await repere("ecran");
        if (e && f) {
          const x = e.x - 12 - 2;
          const ev = await eventail(x);
          const attendu = EXAG * theta(ll, aa) * (x - f.x);
          if (attendu >= 3 && ev && Number.isFinite(ev.ecart)) ex.push({ c: `${a}·${l}`, lu: ev.ecart / 2, att: attendu });
        }
        // les taches voisines : le SECOND minimum à 2 × (L/2) de l'axe
        const demi = m ? (Lcm(ll, aa, 2.0) / 2) * m.r.moyen : 0;
        if (m && demi >= 6 && m.t.haut.length >= 2 && m.t.bas.length >= 2) {
          // et la tache voisine se VOIT : sans l'éclaircissement déclaré (fit_caveat 3),
          // elle tomberait à ~5 % du centre et la légende parlerait de taches absentes
          sec.push({ c: `${a}·${l}`, ok: Math.abs(m.t.ym - m.t.haut[1] - 2 * demi) <= 2.5 && Math.abs(m.t.bas[1] - m.t.ym - 2 * demi) <= 2.5 && m.t.voisine >= 0.15, lu: (m.t.bas[1] - m.t.haut[1]) / 2, att: 2 * demi, eclat: m.t.voisine });
        }
      }
    }
    juger("nombres", fautes.length === 0, `N1 · N3 · N7 — les 28 combinaisons à 2,00 m : L, θ, et L/(2D) = λ/a à 0,5 %${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : ""}`);
    const trFaux = tr.filter((x) => !x.ok);
    juger("tache-et-regle", tr.length >= 20 && trFaux.length === 0, `les combinaisons à tache d'au moins 8 px (${tr.length} sur 28) : la tache peinte mesure L × (pas de la règle) à 2 px${trFaux.length ? ` — FAUX : ${trFaux.slice(0, 3).map((x) => `${x.c} ${virgule(x.lu, 1)} px pour ${virgule(x.att, 1)}`).join(" ; ")}` : ""}`);
    const exFaux = ex.filter((x) => Math.abs(x.lu - x.att) > 1.2);
    juger("exageration-constante", ex.length >= 16 && exFaux.length === 0, `les rayons s'ouvrent de ${EXAG} × θ, à ${ex.length} combinaisons lisibles (demi-écart ≥ 3 px) : ${exFaux.length ? `FAUX : ${exFaux.slice(0, 3).map((x) => `${x.c} ${virgule(x.lu, 1)} px pour ${virgule(x.att, 1)}`).join(" ; ")}` : "tous à 1,2 px du facteur déclaré"}`);
    const secFaux = sec.filter((x) => !x.ok);
    const eclats = sec.map((x) => x.eclat).filter(Number.isFinite);
    juger("secondaires", sec.length >= 6 && secFaux.length === 0, `les taches voisines : le second creux à 2 × L/2 de l'axe, ${sec.length} combinaisons lisibles${secFaux.length ? ` — FAUX : ${secFaux.slice(0, 3).map((x) => `${x.c} ${virgule(x.lu, 1)} px pour ${virgule(x.att, 1)}, éclat ${virgule(x.eclat * 100, 0)} %`).join(" ; ")}` : `, à 2,5 px ; éclat de la voisine ${virgule(Math.min(...eclats) * 100, 0)} à ${virgule(Math.max(...eclats) * 100, 0)} % du centre (≥ 15 %)`}`);
    // le facteur ÉCRIT sur la scène
    const leg = espaces(await panneau.locator("[data-legende]").innerText().catch(() => ""));
    juger("exageration-constante", new RegExp(`×\\s*${EXAG}\\b`).test(leg) && (await attr("data-exageration")) === String(EXAG), `le facteur écrit sur la scène : « ${leg} » (attendu ×${EXAG})`);
  }
  {
    // N9 : le cheveu diffracte comme la fente de 0,080 mm — à la chaîne près
    const fautes = [];
    for (const l of LASERS) {
      await cocher('[data-controle="couleur"]', l);
      await cocher('[data-controle="objet"]', "fente");
      await cocher('[data-controle="fente"]', "0.080");
      const Lf = await lecture("largeur-tache");
      await cocher('[data-controle="objet"]', "cheveu");
      const Lc = await lecture("largeur-tache");
      if (Lf !== Lc || Lc !== `${trois(Lcm(+l, CHEVEU, 2.0))} cm`) fautes.push(`${l} nm : fente « ${Lf} », cheveu « ${Lc} »`);
    }
    await cocher('[data-controle="objet"]', "fente");
    juger("nombres", fautes.length === 0, `N9 — le cheveu et la fente de 0,080 mm, aux quatre lasers : ${fautes.length ? fautes.join(" ; ") : "la même largeur, à la chaîne près"}`);
  }
  {
    // N10 : les bornes
    const r = await panneau.locator('[data-controle="distance"] input').evaluate((i) => [i.min, i.max, i.step]);
    const nf = await panneau.locator('[data-controle="fente"] input').count(), nc = await panneau.locator('[data-controle="couleur"] input').count();
    juger("nombres", r.join(",") === "0.4,2,0.1" && nf === 7 && nc === 4, `N10 — bornes : distance [${r.join(", ")}], ${nf} fentes, ${nc} lasers (attendu [0.4, 2, 0.1], 7, 4)`);
  }
  {
    // la vue du graphe à l'étape libre, et l'immobilité (rien ne bouge qui n'ait été réglé)
    await cocher("[data-vue-banc]", "banc-et-graphe");
    juger("etapes", !!(await repere("graphe-o")) && (await attr("data-vue")) === "banc-et-graphe", `étape 5 : la vue « banc et graphe » ${(await repere("graphe-o")) ? "montre" : "NE montre PAS"} le graphe`);
    juger("lectures", !!(await lecture("pente")), `étape 5, vue « banc et graphe » : la pente ${(await lecture("pente")) ? `se lit (« ${await lecture("pente")} »)` : "N'EST PAS lue"} — la droite est à l'écran`);
    const empreinte = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let h = 0; for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i]) >>> 0; return h; });
    const e0 = await empreinte();
    await page.waitForTimeout(1200);
    const e1 = await empreinte();
    juger("immobile", e0 === e1, `au repos, 1,2 s : l'image ${e0 === e1 ? "n'a pas changé (aucune boucle, aucun éclair)" : "A CHANGÉ sans réglage"}`);
  }
  await frontiere("étape 5 révélée");
  await etiquettesLisibles("étape 5 révélée, banc et graphe");
  juger("latex", (await latexBrut()).length === 0, `étape 5 révélée : ${(await latexBrut()).length} fragment(s) de LaTeX brut`);
} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
}

// ── La table des étapes, réécrite ICI contre le descripteur (fuite entre étapes) ──
{
  const attendu = { "fente-deux-fois-plus-fine": "fente", "meme-fente-autre-laser": "couleur", "ecran-qui-recule": "distance", "le-cheveu": "objet", libre: "couleur,distance,fente,objet" };
  const fautes = [];
  for (const e of descripteur.etapes) {
    if ([...e.controles].sort().join(",") !== attendu[e.id]) fautes.push(`${e.id} ouvre [${e.controles.join(",")}]`);
    if (e.etat?.vue === "banc-et-graphe" && e.id !== "ecran-qui-recule") fautes.push(`${e.id} pose le graphe`);
  }
  juger("fuite-inter-etapes", fautes.length === 0, `table du §7.6 : ${fautes.length ? fautes.join(" ; ") : "chaque réglage n'ouvre qu'à SON étape ; le graphe n'est posé qu'en S3 (et choisi en S5)"}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(cv.width - 3, 2, 1, 1).data; return [d[0], d[1], d[2]]; });
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
    const justes = ["deux-fois-plus-large", "plus-large", "proportionnelle", "meme-figure", "fine-et-rouge"];
    for (let k = 0; k < 5; k++) {
      const e = descripteur.etapes[k];
      await q.locator("[data-pari-choix] li button").nth(e.pari.choix.findIndex((c) => c.id === justes[k])).click();
      await p2.waitForTimeout(200);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q);
      if (k === 2) {
        // le graphe au téléphone : assez haut pour y LIRE cinq nombres et y voir
        // un point avancer d'un cran (vague 2 : en 4:3, 0 → 4,0 cm tenait en ~70 px)
        const h = await q.evaluate((el) => {
          const c = el.querySelector("canvas").getBoundingClientRect();
          const y = (n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); if (!e) return NaN; const r = e.getBoundingClientRect(); return r.top + r.height / 2 - c.top; };
          return { plot: y("graphe-o") - y("graphe-L5"), large: c.width, haut: c.height };
        });
        juger("graphe-lisible", h.plot >= 100, `390 px, étape 3 : l'axe L de 0 à 4,0 cm fait ${virgule(h.plot, 0)} px (au moins 100) — scène de ${virgule(h.large, 0)} × ${virgule(h.haut, 0)} px`);
        // … et une scène collante plus haute ne range aucune commande sous elle
        await q.locator("[data-titre-etape]").focus();
        const caches = [];
        let vus = 0;
        for (let i = 0; i < 30; i++) {
          await p2.keyboard.press("Tab");
          await p2.waitForTimeout(60);
          const m = await p2.evaluate((s) => {
            const a = document.activeElement;
            if (!a || !a.closest(s)) return { sorti: true };
            const collant = document.querySelector(s).querySelector("canvas").closest(".sticky");
            if (collant.contains(a) || !a.closest("[data-scene-grille]")) return { sorti: false, hors: true };
            const r = a.getBoundingClientRect(), b = collant.getBoundingClientRect().bottom;
            return { sorti: false, ok: r.top >= b - 1, quoi: `${a.tagName.toLowerCase()} « ${(a.textContent ?? "").trim().slice(0, 24)} »`, top: Math.round(r.top), b: Math.round(b) };
          }, `[data-scene="${SCENE}"]`);
          if (m.sorti) break;
          if (m.hors) continue;
          vus++;
          if (!m.ok) caches.push(`${m.quoi} à ${m.top} px, sous ${m.b}`);
        }
        juger("graphe-lisible", vus > 0 && caches.length === 0, `390 px, étape 3, scène carrée : ${vus} commande(s) de la colonne atteintes au Tab, ${caches.length ? `CACHÉES sous la scène : ${caches.slice(0, 3).join(" · ")}` : "aucune sous la scène collante"}`);
      }
      if (k < 4) { await q.getByRole("button", { name: "Étape suivante" }).click(); await p2.waitForTimeout(200); }
    }
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune ; ni temps ni course) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-diffraction : le banc de diffraction (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "nombres", "tache-et-regle", "plus-etroite-plus-large", "eventail-fixe", "exageration-constante", "fente-symbole", "regle-graduee", "graphe-droite", "secondaires", "palette", "formule-graduee", "fuite-inter-etapes", "frontiere", "latex", "etiquettes", "cadre", "immobile", "ergonomie", "annonce", "lectures", "coche", "graphe-lisible"];
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
