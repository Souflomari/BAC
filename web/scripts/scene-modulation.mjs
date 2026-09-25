#!/usr/bin/env node
/**
 * scene-modulation — la porte du « banc de modulation »
 * (pc/ondes-em-modulation, R3 ; spec content/pc/ondes-em-modulation/spec-scene-modulation.md
 * §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et
 * trouve son panneau par `[data-scene="banc-de-modulation"]`. La scène est
 * ANALYTIQUE de bout en bout, détecteur compris : la porte refait chaque NOMBRE
 * par sa propre arithmétique (les constantes de la spec, écrites ICI), et lit
 * les faits de PIXELS dans les deux sens. Les repères du produit ne disent que
 * OÙ regarder, jamais COMBIEN : l'échelle (px par division) est LUE sur le
 * quadrillage, les tracés sur l'encre, la réponse sur la chrominance d'accent.
 *
 * LES FAMILLES (spec §11) : avant-clic · pas-de-3d · etapes · avant-pari ·
 * paris · nombres (N1…N12) · grille · enveloppe-inerte (LA mesure centrale) ·
 * cretes-et-grille · comptage · pincement · contact-exact · deux-traces ·
 * detecteur (N8 aux pixels, M2) · palette · formule-graduee ·
 * fuite-inter-etapes · frontiere (une sonde par FORME) · latex · etiquettes
 * et cadre (1 280 et 390 px) · immobile · annonce · theme · console ·
 * ergonomie.
 *
 * CE QUI N'EST PAS ARMÉ, ET POURQUOI (ADR 0035) : la frontière exacte du
 * décrochage, R0C0 = 1/(2πfm) (spec §11.2, M3), ne se mesure pas sur le
 * produit — le rhéostat n'a que cinq crans, et aucun ne tombe à 5 % de la
 * frontière. Ce qui la mériterait : un réglage continu de R0. M2 (le
 * décrochage présent à 1,00 et 2,50 ms, absent à 0,500 ms) est armé.
 *
 * LE DÉTECTEUR QUE LA PORTE REFAIT (écart à la spec §5.2, déclaré dans la spec
 * livrée) : la récurrence sur les DEUX extrema de chaque période de porteuse
 * — u_C(t_k) = max(u_S(t_k), u_C(t_{k−1})·e^{−Tp/(2τ)}) — et, entre deux
 * instants, max(décharge, u_S) : la diode idéale remonte le flanc. Quand
 * m < 1, c'est exactement la récurrence de la spec sur les crêtes positives.
 *
 *   node scripts/scene-modulation.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-modulation.mjs --essai-rouge  (chaque famille doit crier ;
 *                                                     chaque forme injectée, vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_MODULATION ?? 3800 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/ondes-em-modulation";
const SCENE = "banc-de-modulation";
const OUVRIR = "Ouvrir le banc de modulation";

// ── La seconde voie : les constantes de la SPEC (§5), rien du produit ──────
const KPM = 0.5; // k·Pm = 0,250 V⁻¹ × 2,00 V
const F_SIG = 0.4; // f = 400 Hz, en oscillations par ms
const T_ENV = 2.5; // ms
const DUREE = 5; // ms : 10 divisions × 0,50 ms
const MS_DIV = 0.5;
const PORTEUSES = [1.2, 2.4, 4.0, 8.0];
const MODULANTES = [1.0, 2.0, 3.0];
const CONTINUES = [2.0, 3.0, 4.0];
const DETECTEURS = [0.5, 2.0, 5.0, 10, 25];
const cranTxt = (x) => (Number.isInteger(x) && x >= 10 ? String(x) : x.toFixed(1));
const E = (t, U0, Sm) => KPM * U0 * Math.abs(1 + (Sm / U0) * Math.sin(2 * Math.PI * F_SIG * t));
const uS = (t, F, U0, Sm) => KPM * (U0 + Sm * Math.sin(2 * Math.PI * F_SIG * t)) * Math.cos(2 * Math.PI * F * t);
const extrema = (U0, Sm) => ({ max: KPM * (U0 + Sm), min: Sm >= U0 ? 0 : KPM * (U0 - Sm) });
const tauMs = (R0) => R0 * 0.1; // R0 (kΩ) × 100 nF, en ms
/** u_C(t), rejoué depuis la spec : récurrence aux demi-périodes, amorçage à −T_env, diode idéale entre deux instants. */
function detecteur(F, U0, Sm, R0) {
  const demi = 1 / (2 * F), tau = tauMs(R0);
  const k0 = -Math.round(T_ENV / demi), k1 = Math.round(DUREE / demi) + 1;
  const v = [E(k0 * demi, U0, Sm)];
  for (let k = k0 + 1; k <= k1; k++) v.push(Math.max(uS(k * demi, F, U0, Sm), v[v.length - 1] * Math.exp(-demi / tau)));
  return (t) => {
    const i = Math.min(v.length - 1, Math.max(0, Math.floor((t - k0 * demi) / demi + 1e-9)));
    return Math.max(v[i] * Math.exp(-(t - (k0 + i) * demi) / tau), uS(t, F, U0, Sm));
  };
}
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
function trois(x) {
  if (x === 0) return "0,00";
  const e = Math.floor(Math.log10(Math.abs(x)));
  let d = Math.max(0, 2 - e);
  if (Math.abs(parseFloat(x.toFixed(d))) >= 10 ** (e + 1)) d = Math.max(0, d - 1);
  return virgule(x, d);
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
  if (!vivant) { console.error("scene-modulation : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/ondes-em-modulation/media/banc-de-modulation.json", import.meta.url), "utf-8"));
const registre = JSON.parse(readFileSync(new URL("../src/lib/scene3d/scenes.json", import.meta.url), "utf-8"))[SCENE];
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-modulation : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
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
if (!pret) { console.error(`scene-modulation : le panneau n'est pas prêt (« ${await panneau.getAttribute("data-scene-etat")} ») — MUET, en échec.`); await nav.close(); process.exit(3); }
{
  const trois3 = await page.evaluate(() => window.__THREE__ ?? null);
  const deuxD = await panneau.locator("canvas").evaluate((c) => { try { return !!c.getContext("2d"); } catch { return false; } }).catch(() => false);
  juger("pas-de-3d", trois3 === null && deuxD, `panneau OUVERT : window.__THREE__ ${trois3 ?? "indéfini"} ; le canvas est ${deuxD ? "en 2d" : "PAS en 2d"}`);
}

// ── Outils ──
const deuxImages = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const attr = (n) => panneau.getAttribute(n);
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
/** Une lecture, KaTeX RENDU remplacé par sa source TeX (l'annotation) : la chaîne que le produit ÉCRIT. */
const lecture = (cle, q = panneau) => q.evaluate((el, cle) => {
  const dd = el.querySelector(`[data-lecture="${cle}"]`);
  if (!dd) return "";
  const c = dd.cloneNode(true);
  c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector("annotation"); k.replaceWith(document.createTextNode(`$${a?.textContent ?? ""}$`)); });
  return (c.textContent ?? "").replace(/[\s  ]+/g, " ").replace(/\{,\}/g, ",").trim();
}, cle);
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(100); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(150));
const cocher = async (ctrl, v) => { await panneau.locator(`[data-controle="${ctrl}"] input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(30); };
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
const J = { accent: await jetonCouleur("--figure-accent"), encre: await jetonCouleur("--figure-ink"), douce: await jetonCouleur("--figure-ink-soft"), surface: await jetonCouleur("--figure-surface") };

/**
 * Le canvas, classé pixel par pixel, dans `window.__cls` : 1 = accent (la
 * chrominance de l'accent, mesurée depuis le fond), 2 = encre FORTE (plus
 * sombre que le milieu entre l'encre et l'encre douce : le corps de u_C), 3 =
 * trait (neutre, au moins à mi-chemin du fond vers l'encre douce : u_S, les
 * axes, u_C), 0 = le reste (fond, quadrillage à 30 %). Rend le nombre de
 * pixels d'accent et de pixels teintés hors palette.
 */
const classer = (q = panneau) => q.evaluate((el, J) => {
  const cv = el.querySelector("canvas");
  const g = cv.getContext("2d");
  const d = g.getImageData(0, 0, cv.width, cv.height).data;
  const lum = (r, g2, b) => 0.2126 * r + 0.7152 * g2 + 0.0722 * b;
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const cf = chroma(...J.surface);
  const ca = chroma(...J.accent).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
  const lf = lum(...J.surface), le = lum(...J.encre), ld = lum(...J.douce);
  const forte = (le + ld) / 2, trait = lf - 0.5 * (lf - ld);
  const cls = new Uint8Array(cv.width * cv.height), L = new Float32Array(cv.width * cv.height);
  let accentN = 0, horsPalette = 0;
  for (let i = 0, k = 0; i < d.length; i += 4, k++) {
    const c = chroma(d[i], d[i + 1], d[i + 2]).map((x, j) => x - cf[j]), nc = Math.hypot(...c);
    const l = lum(d[i], d[i + 1], d[i + 2]);
    L[k] = l;
    const cos = nc > 0 ? (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) : 0;
    if (nc > 12 && cos > 0.85) { cls[k] = 1; accentN++; }
    else if (nc < 25 && l <= forte) cls[k] = 2;
    else if (nc < 25 && l <= trait) cls[k] = 3;
    if (nc > 20 && cos < 0.6) horsPalette++;
  }
  window.__cls = { cls, L, w: cv.width, h: cv.height, dpr: cv.width / cv.clientWidth, lf, ld };
  return { accentN, horsPalette };
}, J);

/**
 * LA GRILLE, LUE AUX PIXELS : les repères du cadre disent OÙ chercher ; la
 * rangée à 3,8 divisions au-dessus de l'axe (aucun tracé n'y monte : le plus
 * haut U_max vaut 3,50 — N11) donne les 11 verticales ; la colonne à
 * 0,1 division du bord gauche, les horizontales ; la bande libre de l'axe
 * vertical, ses traits fins. Rend l'échelle (px par division) LUE.
 */
async function grilleLue(q = panneau) {
  await classer(q);
  const hg = await q.evaluate((el) => { const c = el.querySelector("canvas").getBoundingClientRect(); const e = el.querySelector('[data-etiquette="ecran-hg"]'); const r = e?.getBoundingClientRect(); return r ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null; });
  const bd = await q.evaluate((el) => { const c = el.querySelector("canvas").getBoundingClientRect(); const e = el.querySelector('[data-etiquette="ecran-bd"]'); const r = e?.getBoundingClientRect(); return r ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null; });
  if (!hg || !bd) return null;
  return q.evaluate((el, { hg, bd }) => {
    const { cls, L, w, h, lf } = window.__cls;
    const dEst = (bd.x - hg.x) / 10;
    // une ligne de grille : NEUTRE (l'accent est une réponse, pas la grille — le crochet de
    // comptage est une horizontale) et plus sombre que le fond d'au moins 12 niveaux (quadrillage à 30 %)
    const sombre = (X, Y) => X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] !== 1 && lf - L[Y * w + X] > 12;
    /** les plages sombres d'une suite de pixels → leurs centres, en px CSS (le centre d'un pixel est à +0,5) */
    const centres = (n0, n1, estSombre) => {
      const out = [];
      let deb = null;
      for (let n = n0; n <= n1 + 1; n++) {
        const s = n <= n1 && estSombre(n);
        if (s && deb === null) deb = n;
        if (!s && deb !== null) { out.push((deb + n - 1) / 2 + 0.5); deb = null; }
      }
      return out;
    };
    // les verticales, sur la rangée à 3,8 div au-dessus de l'axe : aucun tracé n'y monte (N11)
    const yR = Math.round(hg.y + 0.2 * dEst - 0.5);
    const verticales = centres(Math.floor(hg.x - 3), Math.ceil(bd.x + 3), (X) => sombre(X, yR));
    // les horizontales, sur des RANGÉES : une ligne de grille assombrit ≥ 60 % de sa rangée, un
    // tracé ne la croise qu'en des points. (La première version lisait deux colonnes près du bord
    // gauche : là où le tracé passait SUR une ligne, la plage fusionnait, se décalait, et la ligne
    // était perdue — 7 horizontales lues sur 9, sur un produit juste.)
    const x0R = Math.ceil(hg.x + 2), x1R = Math.floor(bd.x - 2);
    const rangee = (Y) => { let n = 0; for (let X = x0R; X <= x1R; X++) if (sombre(X, Y)) n++; return n / (x1R - x0R + 1); };
    const horizontales = centres(Math.floor(hg.y - 3), Math.ceil(bd.y + 3), (Y) => rangee(Y) >= 0.6);
    return { verticales, horizontales, hg, bd, dEst };
  }, { hg, bd });
}

/** Les traits fins de l'axe vertical, dans la bande où aucun tracé ne passe (au-dessus de `libreSous`, en px sous le haut du cadre). */
const traitsFins = (xAxe, y0, yFin) => panneau.evaluate((el, { xAxe, y0, yFin }) => {
  const { L, w, lf } = window.__cls;
  const at = (x, y) => lf - L[Math.round(y - 0.5) * w + Math.round(x - 0.5)] > 25;
  const out = []; let deb = null;
  for (let y = y0 + 2; y <= yFin; y += 1) {
    // un trait fin : de l'encre à 2 px de l'axe, des DEUX côtés (le quadrillage n'en met qu'une ligne)
    const t = at(xAxe - 2, y + 0.5) && at(xAxe + 2, y + 0.5);
    if (t && deb === null) deb = y;
    if (!t && deb !== null) { out.push((deb + y - 1) / 2 + 0.5); deb = null; }
  }
  return out;
}, { xAxe, y0, yFin });

/**
 * Les tracés, colonne par colonne, dans l'écran : le plus haut et le plus bas
 * pixel de TRAIT (u_S), hors du décor que la porte a elle-même localisé (les
 * axes et leurs traits fins, le cadre) ; et le centre de l'encre FORTE (u_C).
 * En px CSS relatifs au canvas.
 */
const colonnes = (G, masque = null) => panneau.evaluate((el, { G, masque }) => {
  const { cls, w } = window.__cls;
  const out = [];
  // l'enveloppe de DÉPART (tirets d'encre, S3) est un décor que la porte sait situer : ±E0(t),
  // rejouée ici depuis la spec — sans ce masque, sa branche basse se lisait comme la crête
  // négative du tracé (3,50 div au renflement), et la haute comme un tracé qui ne touche pas l'axe
  const kpm = 0.5, f = 0.4;
  const E0 = masque ? (tt) => kpm * Math.abs(masque.U0 + masque.Sm * Math.sin(2 * Math.PI * f * tt)) : null;
  const x0 = Math.ceil(G.x0 + 2), x1 = Math.floor(G.x1 - 2);
  const decorX = (x) => Math.abs(x - G.xAxe) <= 4;
  const trait = (x) => { const j = Math.round(((x - G.x0) * 4) / G.d); return j % 4 !== 0 && Math.abs(x - (G.x0 + (j * G.d) / 4)) <= 1.2; };
  for (let X = x0; X <= x1; X++) {
    let top = null, bot = null, sw = 0, sy = 0, forteHaut = null, forteBas = null;
    const xc = X + 0.5, decor = decorX(xc), tick = trait(xc);
    const tt = ((xc - G.x0) / G.d) * 0.5;
    const yRef = E0 ? [0, 0.5, 1].flatMap((k) => { const t2 = tt + ((k - 0.5) / G.d) * 0.5; const v = E0(t2) * G.d; return [G.yc - v, G.yc + v]; }) : [];
    const surRef = (Y) => yRef.length > 0 && Math.min(...yRef.map((y) => Math.abs(Y + 0.5 - y))) <= 1.6;
    for (let Y = Math.ceil(G.y0 + 2); Y <= Math.floor(G.y1 - 2); Y++) {
      const c = cls[Y * w + X], dy = Math.abs(Y + 0.5 - G.yc);
      if (c === 2 && !decor && !surRef(Y)) { sw += 1; sy += Y + 0.5; if (forteHaut === null) forteHaut = Y + 0.5; forteBas = Y + 0.5; }
      // l'axe horizontal (1 px) et, aux colonnes des traits fins, leurs ±3 px ne sont pas un tracé
      if (dy <= 1 || (tick && dy <= 3.5) || decor || surRef(Y)) continue;
      if (c === 2 || c === 3) { if (top === null) top = Y + 0.5; bot = Y + 0.5; }
    }
    out.push({ x: xc, top, bot, forte: sw ? sy / sw : null, forteHaut, forteBas, nForte: sw });
  }
  return out;
}, { G, masque });

/** La grille mesurée → le repère de mesure de la porte (x0, x1, y0, y1, yc, xAxe, d). */
async function repereMesure(q = panneau) {
  const g = await grilleLue(q);
  if (!g || g.verticales.length < 2) return null;
  const V = g.verticales, H = g.horizontales;
  const d = (V[V.length - 1] - V[0]) / 10;
  return { g, d, x0: V[0], x1: V[V.length - 1], y0: H[0], y1: H[H.length - 1], yc: (H[0] + H[H.length - 1]) / 2, xAxe: (V[0] + V[V.length - 1]) / 2 };
}
const tDe = (G, x) => ((x - G.x0) / G.d) * MS_DIV;
/** L'enveloppe de départ, quand le produit la DESSINE (référence « départ » et réglage changé) : le masque de `colonnes`. */
async function masqueRef() {
  if ((await attr("data-reference")) !== "depart") return null;
  const e = etapeDesc(await attr("data-scene-etape"));
  const U0 = parseFloat(e.etat.U0_v), Sm = parseFloat(e.etat.Sm_v);
  const cU0 = parseFloat(await attr("data-u0-v")), cSm = parseFloat(await attr("data-sm-v"));
  return U0 === cU0 && Sm === cSm ? null : { U0, Sm };
}
const hDe = (G, v) => v * G.d; // 1,00 V/div

// ── Avant le pari, la frontière, le LaTeX, la formule graduée ──
const REPONSES = ["periode-a", "crochet-comptage", "curseur-max", "curseur-min", "pincement-0", "bosse-0", "decrochage", "vidange"];
async function avantPari(ou, interdits = [], sansDetecteur = false) {
  const { accentN } = await classer();
  const lectures = (await panneau.locator("[data-lecture]").evaluateAll((els) => els.map((e) => e.getAttribute("data-lecture")))).filter((c) => c !== "calibration");
  const reponse = [];
  for (const r of REPONSES) if (await repere(r)) reponse.push(r);
  if (sansDetecteur) for (const r of ["fin-uC", "borne-uC", "diode", "R0", "C0"]) if (await repere(r)) reponse.push(r);
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const dits = interdits.filter((m) => (m instanceof RegExp ? m.test(desc) : desc.includes(m))).map(String);
  const cal = await lecture("calibration");
  const ok = accentN === 0 && lectures.length === 0 && reponse.length === 0 && dits.length === 0 && (await controles()) === "" && cal.includes("1,00 V/div");
  juger("avant-pari", ok, `${ou}, avant le pari : ${accentN} px d'accent, lectures-réponses ${lectures.length ? `PRÉSENTES (${lectures.join(", ")})` : "absentes"}, calibration « ${cal} », ${reponse.length ? `RÉPONSE DESSINÉE : ${reponse.join(", ")}` : "aucune marque de réponse"}${sansDetecteur ? ", aucun étage de détection" : ""}, contrôles [${await controles()}]${dits.length ? ` — la description DIT : ${dits.join(", ")}` : ""}`);
}

const FORMES = [
  // §9.1 aucun spectre — une frontière d'INSTRUMENT
  ["spectre", /(^|[^\p{L}])spectr/iu, "le spectre"],
  ["raie", /(^|[^\p{L}])raies?(?![\p{L}])/iu, "une raie"],
  ["bande latérale", /bandes? latérales?/iu, "une bande latérale"],
  ["f_p ± f_s", /f_p\s*(\\pm|\+|-|−|±)\s*f_s|F\s*\\pm\s*f/u, "$f_p + f_s$"],
  ["produit-somme", /produit-somme/iu, "produit-somme"],
  ["Fourier", /fourier/iu, "Fourier"],
  ["domaine fréquentiel", /domaine fréquentiel|largeur de bande|encombrement/iu, "le domaine fréquentiel"],
  // §9.2 ni régime forcé, ni résonance, ni impédance
  ["résonance", /(^|[^\p{L}])résona/iu, "la résonance"],
  ["impédance", /impédance|réactance/iu, "l'impédance"],
  ["Z =", /(^|[^\p{L}_\\])Z\s*=/u, "$Z = R$"],
  ["déphasage", /(^|[^\p{L}])déphas/iu, "le déphasage"],
  ["phaseur", /phaseur/iu, "un phaseur"],
  ["facteur de qualité", /facteur de qualité|(^|[^\p{L}_\\])Q\s*=/u, "le facteur de qualité"],
  ["bande passante", /bande passante/iu, "la bande passante"],
  ["pulsation propre", /pulsation propre|\\omega_0|ω₀/u, "la pulsation propre"],
  // §9.3 aucune notation complexe
  ["complexe", /\\underline|j\\omega|jω|nombre complexe|module et argument|partie imaginaire|exponentielle complexe/iu, "un nombre complexe"],
  // §9.4 aucune puissance en alternatif
  ["puissance", /puissance (active|réactive)|facteur de puissance/iu, "la puissance active"],
  ["valeur efficace", /valeur efficace|U_\{?eff|(^|[^\p{L}])RMS(?![\p{L}])/iu, "la valeur efficace"],
  ["watt", /(^|[^\p{L}])watts?(?![\p{L}])|\d[\s  ]*W(?![\p{L}])/u, "12 W"],
  // §9.5 aucun composant actif
  ["transistor", /transistor/iu, "un transistor"],
  ["amplificateur opérationnel", /amplificateur opérationnel|ampli op|(^|[^\p{L}])AO(?![\p{L}])|gain différentiel|push-pull|alimentation symétrique|circuit interne/u, "un amplificateur opérationnel"],
  // §9.6 ni fonction de transfert, ni Bode, ni filtre calculé
  ["fonction de transfert", /fonction de transfert|H\(j/iu, "la fonction de transfert"],
  ["Bode", /(^|[^\p{L}])bode/iu, "Bode"],
  ["décibel", /décibel|(^|[^\p{L}])dB(?![\p{L}])/u, "−3 dB"],
  ["gain", /(^|[^\p{L}])gains?(?![\p{L}])|atténuation/iu, "le gain"],
  ["fréquence de coupure", /fréquence de coupure|(^|[^\p{L}])f_c(?![\p{L}])/iu, "la fréquence de coupure"],
  ["passe-bas", /passe-(bas|haut|bande)/iu, "un passe-bas"],
  ["premier ordre", /premier ordre/iu, "un premier ordre"],
  ["logarithmique", /logarithm|semi-log|(^|[^\p{L}])log(?![\p{L}])/iu, "une échelle logarithmique"],
  // §9.7 ni circuit accordé, ni sélection — R5, APRÈS
  ["circuit bouchon", /circuit (bouchon|accordé|d.accord)/iu, "le circuit bouchon"],
  ["accord", /(^|[^\p{L}])accord/iu, "l'accord"],
  ["f_0", /(^|[^\p{L}])f_0(?![\p{L}])|f_\{0\}|f₀/u, "$f_0$"],
  ["LC", /(^|[^\p{L}])LC(?![\p{L}])|\\sqrt\{LC\}/u, "$\\sqrt{LC}$"],
  ["bobine", /(^|[^\p{L}])bobine|inductance/iu, "la bobine"],
  ["condensateur variable", /condensateur variable/iu, "un condensateur variable"],
  ["station", /(^|[^\p{L}])stations?(?![\p{L}])/iu, "la station"],
  ["antenne", /(^|[^\p{L}])antenne/iu, "l'antenne"],
  ["récepteur radio", /récepteur radio/iu, "un récepteur radio"],
  ["sélection", /(^|[^\p{L}])sélecti/iu, "la sélection"],
  // §9.8 ni FM ni modulation de phase
  ["FM", /(^|[^\p{L}])FM(?![\p{L}])|modulation de (fréquence|phase)|(^|[^\p{L}])excursion|bande étroite/u, "la FM"],
  // §9.9 ni démodulation synchrone ni changement de fréquence
  ["démodulation synchrone", /démodulation (synchrone|cohérente)|oscillateur local|hétérodyne|fréquence intermédiaire|(^|[^\p{L}])battement|multiplication par la porteuse|mélangeur/iu, "la démodulation synchrone"],
  // §9.10 ni antenne ni longueur d'onde — R1, AVANT
  ["lambda", /\\lambda|λ|longueur d.onde|quart d.onde|(^|[^\p{L}])rayonn|onde électromagnétique|(^|[^\p{L}])propagation/iu, "$\\lambda/4$"],
  ["c = 3", /(^|[^\p{L}\d_])c\s*=\s*3/u, "$c = 3{,}00\\times10^{8}$"],
  // §9.11 ni débit ni numérique
  ["débit", /(^|[^\p{L}])débit|bits? par seconde|bit\/s|(^|[^\p{L}])bauds?(?![\p{L}])|vitesse de transmission|(^|[^\p{L}])numérique|échantillonnage/iu, "le débit"],
  // §9.12 aucune ondulation chiffrée, aucune frontière du décrochage
  ["ondulation", /(^|[^\p{L}])ondulation|ripple|2\\pi\s*f\s*m|\\frac\{1\}\{2\\pi\s*f\s*m\}/iu, "l'ondulation"],
  ["pourcentage", /\d[\s  ]*%/u, "5 %"],
  // §9.13 aucune incertitude
  ["incertitude", /incertitude|±|\\pm|erreur de lecture|précision de|demi-carreau près/iu, "l'incertitude"],
  // §9.14 aucune valeur en arbitrage de 2017 N
  ["2017", /2017|T_p\s*=\s*0(\{,\}|,)5(?![\d])\s*(\\\s*)?(\\text\{)?\s*ms|F_p\s*=\s*2(?![,{\d])|(^|[^\d,}])2((\{,\}|,)0)?\s*(\\\s*)?(\\text\{)?\s*kHz|2[\s  ]*000[\s  ]*Hz/u, "2{,}0 kHz"],
  // §9.15 la scène ne remplace pas le TP
  ["TP", /(^|[^\p{L}])TP(?![\p{L}])|travaux pratiques|mesuré au laboratoire|manipulation réelle/u, "en TP"],
];
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.textContent ?? "");
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `forme(s) interdite(s) AFFICHÉE(S) : ${vues.join(", ")}` : `aucune des ${FORMES.length} formes interdites`}`);
}
const latexBrut = () => panneau.evaluate((el) => {
  const c = el.cloneNode(true);
  c.querySelectorAll(".katex").forEach((k) => k.remove());
  const t = c.textContent ?? "";
  return (t.match(/\\(frac|dfrac|ll|cdot|sqrt|times|text|max|min)\b|\$[^$]{1,40}\$|[_^]\{/g) ?? []);
});
/**
 * La chaîne, construite en quatre temps (spec §2.3, §7.6) : ses FORMES, dans le
 * texte du panneau, annotations TeX comprises (la forme que le produit ÉCRIT).
 * Une clé absente de `attendu` n'est pas jugée.
 */
async function formule(ou, attendu) {
  const t = await panneau.evaluate((el) => el.textContent ?? "");
  const lu = {
    UMAX: /U_\{?max|U_\{?min|Umax|Umin/u.test(t),
    TAUX: /(^|[^\p{L}])taux(?![\p{L}])/iu.test(t),
    M_EGAL: /(^|[^\p{L}_\\])m\s*=/u.test(t),
    A_EGAL: /(^|[^\p{L}_\\])A\s*=/u.test(t),
    FORMULE_M: /\\frac\{U_\{max\}\s*-\s*U_\{min\}\}\{U_\{max\}\s*\+\s*U_\{min\}\}/u.test(t),
    SEUIL: /m\s*(<|\\leq|\\geq|≥|≤|\\ge|\\le)\s*1|(^|[^\p{L}])surmodulation|(^|[^\p{L}])pincement|bonne modulation|mauvaise modulation/iu.test(t),
    DETECTEUR: /R_0\s*C_0|R_0C_0|R0C0|(^|[^\p{L}])détecteur|(^|[^\p{L}])diode|(^|[^\p{L}])décharge|(^|[^\p{L}])condensateur|(^|[^\p{L}])rhéostat/iu.test(t),
    LL: /\\ll|≪/u.test(t),
    TP: /T_p|T_\{p\}/u.test(t),
  };
  const fautes = Object.entries(attendu).filter(([k, v]) => lu[k] !== v).map(([k, v]) => `${k} ${v ? "ABSENT (attendu)" : "ÉCRIT trop tôt"}`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : Object.keys(attendu).map((k) => `${k} ${lu[k] ? "écrit" : "non écrit"}`).join(", ")}`);
}

/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; sans fond, sur du blanc ; une étiquette opaque ne cache pas la réponse. */
async function etiquettesLisibles(ou, q = panneau) {
  const { textes, larg, haut, obstacles, encre } = await q.evaluate((el) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const transparent = (e) => { const c = getComputedStyle(e).backgroundColor; return c === "transparent" || /rgba\(.*,\s*0\)$/.test(c); };
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => visible(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), sansFond: transparent(e), ...boite(e) }));
    const obstacles = [...el.querySelectorAll("[data-legende]")].map((e) => ({ nom: "légende", ...boite(e) }));
    const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
    const f = g.getImageData(cv.width - 1, cv.height - 1, 1, 1).data;
    const tj = document.createElement("canvas").getContext("2d");
    tj.fillStyle = getComputedStyle(el).getPropertyValue("--figure-accent"); tj.fillRect(0, 0, 1, 1);
    const ac = tj.getImageData(0, 0, 1, 1).data;
    const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
    const cf = chroma(f[0], f[1], f[2]);
    const ca = chroma(ac[0], ac[1], ac[2]).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
    const estAccent = (r, g2, b) => { const c = chroma(r, g2, b).map((x, i) => x - cf[i]), nc = Math.hypot(...c); return nc >= 0.8 * na && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85; };
    for (const a of textes) {
      const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
      const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
      a.accentCache = 0; a.encreDessous = 0;
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      for (let i = 0; i < d.length; i += 4) {
        if (!a.sansFond && estAccent(d[i], d[i + 1], d[i + 2])) a.accentCache++;
        if (a.sansFond && Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) a.encreDessous++;
      }
    }
    let encre = 0;
    for (const o of obstacles) {
      const d = g.getImageData(Math.max(0, Math.floor(o.x0 * dpr)), Math.max(0, Math.floor(o.y0 * dpr)), Math.max(1, Math.ceil((o.x1 - o.x0) * dpr)), Math.max(1, Math.ceil((o.y1 - o.y0) * dpr))).data;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) encre++;
    }
    return { textes, larg: rc.width, haut: rc.height, obstacles, encre };
  });
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    for (const o of obstacles) if (a.x0 < o.x1 - 1 && o.x0 < a.x1 - 1 && a.y0 < o.y1 - 1 && o.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS la légende`);
    if (a.encreDessous > 0) fautes.push(`« ${a.nom} », sans fond, posée sur ${a.encreDessous} pixel(s) d'encre`);
    if (a.accentCache > 6) fautes.push(`« ${a.nom} », opaque, CACHE ${a.accentCache} pixel(s) de la réponse (accent)`);
  }
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.slice(0, 5).join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre"}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) dessiné(s) sous la légende, qui les CACHE (attendu 0)`);
}
/** L'état posé par l'étape (ou révélé). */
async function etatPose(id, revele = false) {
  const e = etapeDesc(id);
  const att = revele ? { ...e.etat, ...e.etat_revele } : e.etat;
  const lu = { F_khz: await attr("data-f-khz"), Sm_v: await attr("data-sm-v"), U0_v: await attr("data-u0-v"), R0_kohm: await attr("data-r0-kohm"), sortie: await attr("data-sortie"), reference: await attr("data-reference") };
  const faux = Object.keys(lu).filter((k) => lu[k] !== att[k]);
  const ph = await attr("data-pari");
  const ctrl = await controles();
  const ok = faux.length === 0 && (revele ? ph === "revele" && ctrl === [...e.controles].sort().join(",") : ph === "attente" && ctrl === "");
  juger("etapes", ok, `étape ${id}${revele ? " révélée" : ""} : ${Object.entries(lu).map(([k, v]) => `${k} ${v}`).join(", ")} ; pari « ${ph} » ; contrôles [${ctrl}]${faux.length ? ` — ÉCART sur ${faux.join(", ")}` : ""}`);
}

// ── Les mesures de PIXELS ──
/** Les crêtes d'un tracé u_S lu : maxima locaux de la hauteur au-dessus (et au-dessous) de l'axe. */
function cretes(cols, G, Tpx) {
  const w = Math.max(2, Math.round(0.35 * Tpx));
  const haut = cols.map((c) => (c.top === null ? -Infinity : G.yc - c.top));
  const bas = cols.map((c) => (c.bot === null ? -Infinity : c.bot - G.yc));
  const pics = (arr, signe) => {
    const out = [];
    for (let i = 0; i < arr.length; i++) {
      if (!(arr[i] > 2)) continue;
      // un maximum n'est une CRÊTE que si sa fenêtre entière est lue : au bord de l'écran, ou
      // contre les colonnes de l'axe vertical (décor, sans lecture), le bord de la fenêtre
      // devenait un faux sommet — plus bas que la vraie crête, cachée sous l'axe
      if (i - w < 0 || i + w > arr.length - 1) continue;
      let lue = true;
      for (let j = i - w; j <= i + w; j++) if (arr[j] === -Infinity) { lue = false; break; }
      if (!lue) continue;
      let max = true;
      for (let j = Math.max(0, i - w); j <= Math.min(arr.length - 1, i + w); j++) if (arr[j] > arr[i] || (arr[j] === arr[i] && j < i)) { max = false; break; }
      if (max) out.push({ x: cols[i].x, h: arr[i], signe });
    }
    return out;
  };
  return { haut: pics(haut, 1), bas: pics(bas, -1) };
}
/**
 * LES CRÊTES, LUES AUX INSTANTS DE LA SPEC. L'enveloppe ne touche le tracé qu'aux extrema de la
 * porteuse, t_k = k·T_p/2, où u_S vaut k·P_m·u(t_k)·(−1)^k — ce que la spec écrit, rejoué ici. Entre
 * deux, l'extremum LOCAL du tracé tombe à côté et SOUS l'enveloppe (1,5 px à 1,2 kHz : la première
 * version lisait les maxima locaux, et rougissait sur un produit juste). Chaque échantillon se lit
 * du côté que son signe prescrit (le haut de l'encre au-dessus de l'axe, le bas au-dessous), sur la
 * colonne qui CONTIENT x_k et ses deux voisines ; il est écarté au bord, contre l'axe vertical
 * (décor sans lecture), et là où l'enveloppe de départ passe à moins de 3 px de lui.
 */
function lireTk(G, cols, F, U0, Sm, masque = null) {
  const out = [];
  const E0 = masque ? (t) => KPM * Math.abs(masque.U0 + masque.Sm * Math.sin(2 * Math.PI * F_SIG * t)) : null;
  for (let k = 0; k <= Math.round(2 * F * DUREE); k++) {
    const tk = k / (2 * F), x = G.x0 + (tk / MS_DIV) * G.d;
    if (x < G.x0 + 3 || x > G.x1 - 3 || Math.abs(x - G.xAxe) <= 6) continue;
    const att = KPM * (U0 + Sm * Math.sin(2 * Math.PI * F_SIG * tk)) * (k % 2 ? -1 : 1) * G.d;
    if (E0 && Math.abs(Math.abs(att) - E0(tk) * G.d) < 3) continue;
    const voisines = cols.filter((c) => Math.abs(Math.floor(c.x) - Math.floor(x)) <= 1);
    let lu = null;
    for (const c of voisines) {
      const v = att >= 0 ? (c.top === null ? null : G.yc - c.top) : (c.bot === null ? null : -(c.bot - G.yc));
      if (v === null) continue;
      if (lu === null || (att >= 0 ? v > lu : v < lu)) lu = v;
    }
    out.push({ k, x, att, lu });
  }
  return out;
}
/**
 * LE COMPTAGE, LU SUR LA GRILLE : les passages à zéro MONTANTS du tracé (dernière colonne
 * entièrement sous l'axe → première entièrement au-dessus), numérotés, puis une droite de moindres
 * carrés : sa pente est la période de la porteuse EN PIXELS, et 10 divisions ÷ cette période est le
 * nombre d'oscillations. Un passage caché sous l'axe vertical ne décale pas la numérotation. (La
 * première version comptait des LOBES : une crête plate, peinte à mi-pixel sur deux rangées trop
 * claires, coupait un lobe en deux ; l'axe vertical en cachait un entier — 13 pour 6, 38 pour 40.)
 */
function compterOscillations(G, cols) {
  const signe = (c) => {
    const haut = c.top === null ? null : G.yc - c.top, bas = c.bot === null ? null : c.bot - G.yc;
    if (haut !== null && haut > 2 && (bas === null || bas < -2)) return 1;
    if (bas !== null && bas > 2 && (haut === null || haut < -2)) return -1;
    return 0;
  };
  const xs = [];
  let dernierNeg = null, etat = 0;
  for (const c of cols) {
    const s = signe(c);
    if (s === -1) { dernierNeg = c.x; etat = -1; }
    else if (s === 1) { if (etat === -1 && dernierNeg !== null) xs.push((dernierNeg + c.x) / 2); etat = 1; }
  }
  if (xs.length < 3) return { n: NaN, passages: xs.length, residu: Infinity };
  const ecarts = xs.slice(1).map((x, i) => x - xs[i]).sort((a, b) => a - b);
  const T0 = ecarts[Math.floor(ecarts.length / 2)];
  const idx = xs.map((x) => Math.round((x - xs[0]) / T0));
  const m = xs.length, sx = idx.reduce((a, b) => a + b, 0), sy = xs.reduce((a, b) => a + b, 0);
  const sxx = idx.reduce((a, b) => a + b * b, 0), sxy = idx.reduce((a, b, i) => a + b * xs[i], 0);
  const pente = (m * sxy - sx * sy) / (m * sxx - sx * sx), orig = (sy - pente * sx) / m;
  const residu = Math.max(...xs.map((x, i) => Math.abs(x - (orig + pente * idx[i]))));
  return { n: (10 * G.d) / pente, passages: m, residu };
}
/** L'enveloppe d'une suite de crêtes, interpolée en x. */
const interp = (pts, x) => {
  if (!pts.length) return NaN;
  if (x <= pts[0].x) return pts[0].h;
  for (let i = 1; i < pts.length; i++) if (x <= pts[i].x) { const a = pts[i - 1], b = pts[i]; return a.h + ((b.h - a.h) * (x - a.x)) / (b.x - a.x); }
  return pts[pts.length - 1].h;
};

try {
  // ═══ S1 — deux rythmes ═══
  await etatPose("deux-rythmes");
  await avantPari("étape 1", ["4,0 kHz", "4,00 kHz", "400 Hz", "vingt", "20 oscillations", /porteuse[^.;]{0,24}\d/u], true);
  await formule("étape 1, avant le pari", { UMAX: false, TAUX: false, M_EGAL: false, A_EGAL: false, SEUIL: false, DETECTEUR: false, LL: false, TP: false });
  await frontiere("étape 1, avant le pari");
  {
    // LA GRILLE, avant tout : l'échelle se LIT, elle n'est pas donnée
    const G = await repereMesure();
    const V = G?.g.verticales ?? [], H = G?.g.horizontales ?? [];
    const pasV = V.slice(1).map((x, i) => x - V[i]), pasH = H.slice(1).map((y, i) => y - H[i]);
    const irrV = pasV.length ? Math.max(...pasV.map((p) => Math.abs(p - G.d))) : Infinity;
    const irrH = pasH.length ? Math.max(...pasH.map((p) => Math.abs(p - G.d))) : Infinity;
    juger("grille", V.length === 11 && H.length === 9 && irrV <= 1 && irrH <= 1, `${V.length} verticales et ${H.length} horizontales lues (attendu 11 et 9 : 10 × 8 divisions, cadre compris), pas ${G ? virgule(G.d, 2) : "?"} px, écart au pas ${virgule(irrV, 2)} px et ${virgule(irrH, 2)} px (≤ 1)`);
    // les traits fins de l'axe vertical, dans la bande libre (de 4,0 à 2,3 divisions : E ≤ 2,00 au milieu)
    if (G) {
      const t = await traitsFins(G.xAxe, G.y0, G.yc - 2.3 * G.d);
      const attendus = [];
      for (let j = 1; G.y0 + (j * G.d) / 4 <= G.yc - 2.3 * G.d; j++) if (j % 4 !== 0) attendus.push(G.y0 + (j * G.d) / 4);
      const manquants = attendus.filter((y) => !t.some((u) => Math.abs(u - y) <= 1));
      const intrus = t.filter((u) => !attendus.some((y) => Math.abs(u - y) <= 1.5) && ![0, 1, 2].some((k) => Math.abs(u - (G.y0 + k * G.d)) <= 1.5));
      // de 4,0 à 2,3 divisions : les quarts j = 1, 2, 3, 5, 6 — CINQ (la première version exigeait 6 :
      // une erreur d'arithmétique de la porte, rouge sur un produit juste)
      juger("grille", manquants.length === 0 && intrus.length === 0 && attendus.length >= 5, `axe vertical : ${t.length} traits fins lus pour ${attendus.length} attendus au quart de division (4 sous-graduations) ; ${manquants.length} manquant(s), ${intrus.length} trait(s) hors du quart${intrus.length ? ` (à ${intrus.map((u) => virgule((u - G.y0) / G.d, 2)).join(", ")} div)` : ""}`);
      const cal = await panneau.evaluate((el) => ["calibration-v", "calibration-t"].map((n) => (el.querySelector(`[data-etiquette="${n}"]`)?.textContent ?? "").trim()));
      juger("grille", cal[0] === "1,00 V/div" && cal[1] === "0,50 ms/div", `calibration sous l'écran : « ${cal[0]} » et « ${cal[1]} »`);
      juger("grille", Math.abs(G.xAxe - V[5]) <= 1 && Math.abs(G.yc - H[4]) <= 1, `les deux axes médians tombent sur une ligne majeure (${virgule(Math.abs(G.xAxe - V[5]), 2)} et ${virgule(Math.abs(G.yc - H[4]), 2)} px)`);
    }
  }
  await parier(indexDe("deux-rythmes", "demi-periode"));
  {
    const res = await resultat();
    juger("paris", /incorrecte/i.test(res), `étape 1, pari faux (800 Hz) : « ${res} »`);
    await etatPose("deux-rythmes", true);
    juger("paris", (await panneau.locator("[data-pari-choix] li").count()) === 4, `étape 1 : ${await panneau.locator("[data-pari-choix] li").count()} choix (attendu 4)`);
  }
  await formule("étape 1, révélée", { UMAX: false, TAUX: false, M_EGAL: false, A_EGAL: false, SEUIL: false, DETECTEUR: false, LL: false, TP: true });
  {
    // N5 — les quatre crans de porteuse : comptage, Tp, F, T, f, F/f
    const fautes = [];
    const G = await repereMesure();
    const profils = {};
    const fEnv = [], fCompte = [], fSym = [], compte = [];
    let pireEnv = 0, pireCroise = 0;
    for (const F of PORTEUSES) {
      await cocher("porteuse", F.toFixed(1));
      const n = Math.round(F * DUREE);
      const att = {
        "comptage-porteuse": `${n} oscillations complètes sur les 10 divisions`,
        "porteuse-lue": `$T_p = ${trois(1 / F)}$ ms · $F = ${trois(F)}$ kHz`,
        "signal-lu": "5,00 div → $T = 2,50$ ms · $f = 400$ Hz",
        "rapport-frequences": String(Math.round(F * 1000) / 400),
      };
      for (const [k, v] of Object.entries(att)) { const l = await lecture(k); if (l !== v) fautes.push(`F = ${F} : ${k} « ${l} » (attendu « ${v} »)`); }
      // les pixels : la MESURE CENTRALE, l'enveloppe inerte — aux instants t_k de la spec
      await classer();
      const cols = await colonnes(G, await masqueRef());
      const tk = lireTk(G, cols, F, 4, 2);
      profils[F] = tk;
      for (const s of tk) {
        const ecart = s.lu === null ? Infinity : Math.abs(s.lu - s.att);
        pireEnv = Math.max(pireEnv, ecart);
        if (ecart > 1.2) fEnv.push(`F = ${F} : crête k = ${s.k} à ${virgule((s.x - G.x0) / G.d, 2)} div, ${s.lu === null ? "NON LUE" : `${virgule(s.lu, 1)} px`} pour ${virgule(s.att, 1)}`);
      }
      if (tk.length < 2 * F * DUREE - 4) fEnv.push(`F = ${F} : ${tk.length} crêtes lues seulement`);
      // le comptage, lu sur la grille
      const c = compterOscillations(G, cols);
      if (!(Math.abs(c.n - n) <= 0.05 && c.residu <= 1.5 && c.passages >= n - 2)) fCompte.push(`F = ${F} : ${virgule(c.n, 2)} oscillations lues sur ${c.passages} passages (résidu ${virgule(c.residu, 1)} px ; attendu ${n})`);
      else compte.push(virgule(c.n, 2));
      // u_S est symétrique autour de l'axe : chaque crête du haut contre la moyenne de ses deux voisines du bas
      if (F >= 4) for (let i = 1; i < tk.length - 1; i++) {
        const s = tk[i], a2 = tk[i - 1], b2 = tk[i + 1];
        if (s.att <= 0 || a2.k !== s.k - 1 || b2.k !== s.k + 1 || s.lu === null || a2.lu === null || b2.lu === null) continue;
        const bas = -(a2.lu + b2.lu) / 2;
        if (Math.abs(bas - s.lu) > 1.5 + 0.02 * s.lu) fSym.push(`F = ${F} à ${virgule((s.x - G.x0) / G.d, 2)} div : ${virgule(s.lu, 1)} px en haut, ${virgule(bas, 1)} en bas`);
      }
    }
    // d'un cran à l'autre : chaque crête contre l'enveloppe du cran le plus dense, interpolée
    const dense = profils[8].filter((s) => s.lu !== null).map((s) => ({ x: s.x, h: Math.abs(s.lu) }));
    for (const F of [1.2, 2.4, 4.0]) for (const s of profils[F]) {
      if (s.lu === null) continue;
      const ref = interp(dense, s.x);
      if (Number.isFinite(ref)) pireCroise = Math.max(pireCroise, Math.abs(Math.abs(s.lu) - ref));
    }
    juger("nombres", fautes.length === 0, `N5 — les quatre crans de porteuse : ${fautes.length ? fautes.slice(0, 3).join(" ; ") : "6 · 12 · 20 · 40 oscillations ; T_p 0,833 · 0,417 · 0,250 · 0,125 ms ; F/f 3 · 6 · 10 · 20"}`);
    juger("enveloppe-inerte", fEnv.length === 0 && pireCroise <= 1.8, `aux quatre crans (U0 = 4,0 V, Sm = 2,0 V), le tracé DESSINÉ aux ${Object.values(profils).reduce((a, p) => a + p.length, 0)} extrema de la porteuse (t_k = k·T_p/2) contre l'enveloppe de la spec : pire écart ${virgule(pireEnv, 2)} px (≤ 1,2) ; d'un cran à l'autre, ${virgule(pireCroise, 2)} px (≤ 1,8)${fEnv.length ? ` — ${fEnv.slice(0, 3).join(" ; ")}` : ""}`);
    juger("comptage", fCompte.length === 0, `la période de la porteuse, lue sur les passages à zéro montants du tracé : ${fCompte.length ? fCompte.join(" ; ") : `${compte.join(" · ")} oscillations sur les 10 divisions (attendu 6 · 12 · 20 · 40, à 0,05)`}`);
    juger("deux-traces", fSym.length === 0, `u_S symétrique autour de l'axe (F = 4,0 et 8,0 kHz) : ${fSym.length ? fSym.slice(0, 2).join(" ; ") : "l'enveloppe du bas est le miroir de celle du haut, à 1,5 px"}`);
    await cocher("porteuse", "4.0");
    // la RÉPONSE de S1 : la double flèche entre deux resserrements, et le crochet
    const a = await repere("periode-a"), b = await repere("periode-b"), k = await repere("crochet-comptage");
    const { accentN } = await classer();
    const long = a && b ? Math.abs(b.x - a.x) / G.d : NaN;
    juger("nombres", Math.abs(long - 5) <= 0.05 && Math.abs((a.x - G.x0) / G.d - 3.75) <= 0.05, `S1 révélée : la double flèche va de ${a ? virgule((a.x - G.x0) / G.d, 2) : "?"} à ${b ? virgule((b.x - G.x0) / G.d, 2) : "?"} div — ${virgule(long, 2)} divisions (attendu 3,75 → 8,75 : deux resserrements, 5,00 div)`);
    juger("avant-pari", accentN > 0 && !!k, `S1 révélée : ${accentN} px d'accent, crochet de comptage ${k ? "présent" : "ABSENT"} (après l'engagement, la réponse se dessine)`);
    const cote = await panneau.evaluate((el) => [el.querySelector('[data-etiquette="cote-periode"]')?.textContent, el.querySelector('[data-etiquette="cote-comptage"]')?.textContent]);
    juger("nombres", cote[0] === "5,00 div = 2,50 ms" && cote[1] === "20 oscillations", `S1 révélée : cotes « ${cote[0]} » et « ${cote[1]} »`);
  }
  await frontiere("étape 1 révélée");
  await etiquettesLisibles("étape 1 révélée");
  await suivant();

  // ═══ S2 — le taux par deux crêtes ═══
  await etatPose("le-taux-par-deux-cretes");
  await avantPari("étape 2", [/0,50(?!\s*ms)/u, "taux", "2,00 V"], true);
  await formule("étape 2, avant le pari", { FORMULE_M: false, SEUIL: false, DETECTEUR: false, LL: false });
  await parier(indexDe("le-taux-par-deux-cretes", "difference-sur-somme"));
  {
    const res = await resultat();
    juger("paris", /bonne réponse/i.test(res), `étape 2, pari juste : « ${res} »`);
    await etatPose("le-taux-par-deux-cretes", true);
  }
  await formule("étape 2, révélée", { UMAX: true, FORMULE_M: true, M_EGAL: true, SEUIL: false, DETECTEUR: false, LL: false });
  const couples = [];
  async function lireCouple(U0, Sm, ou, pixels = true) {
    const { max, min } = extrema(U0, Sm);
    const att = {
      extrema: `$U_{max} = ${virgule(max, 2)}$ div $= ${virgule(max, 2)}$ V · $U_{min} = ${virgule(min, 2)}$ div $= ${virgule(min, 2)}$ V`,
      "amplitude-a": `lue : $\\frac{U_{max}+U_{min}}{2} = ${virgule((max + min) / 2, 2)}$ V · réglée : $A = kP_mU_0 = ${virgule(KPM * U0, 2)}$ V`,
      entrees: `$U_0 = ${virgule(U0, 1)}$ V · $S_m = ${virgule(Sm, 1)}$ V`,
      "taux-lu": `$m = \\frac{U_{max}-U_{min}}{U_{max}+U_{min}} = ${virgule((max - min) / (max + min), 2)}$`,
      "taux-regle": `$m = S_m/U_0 = ${virgule(Sm / U0, 2)}$`,
    };
    const fautes = [];
    for (const [k, v] of Object.entries(att)) { const l = await lecture(k); if (l !== v) fautes.push(`(${U0}, ${Sm}) ${k} « ${l} » (attendu « ${v} »)`); }
    const lu = { tl: await lecture("taux-lu"), tr: await lecture("taux-regle") };
    couples.push({ U0, Sm, fautes, egaux: lu.tl.split("= ").pop() === lu.tr.split("= ").pop() });
    if (!pixels) return;
    // les crêtes DESSINÉES, aux renflements et aux resserrements, contre les nombres AFFICHÉS
    const G = await repereMesure();
    await classer();
    const cols = await colonnes(G, await masqueRef());
    const col = (div) => cols.reduce((a, c) => (Math.abs(c.x - (G.x0 + div * G.d)) < Math.abs(a.x - (G.x0 + div * G.d)) ? c : a));
    // à 4,0 et 2,4 kHz, les quatre extrema d'enveloppe tombent sur des crêtes NÉGATIVES : on lit le bas
    // (et u_C, toujours au-dessus de l'axe, ne peut pas s'y mêler)
    const amp = (c) => (c.bot === null ? 0 : c.bot - G.yc);
    const fP = [];
    for (const div of [1.25, 6.25]) { const h = amp(col(div)); if (Math.abs(h - hDe(G, max)) > 1.2) fP.push(`renflement à ${div} div : ${virgule(h, 1)} px pour ${virgule(hDe(G, max), 1)}`); }
    if (Sm < U0) for (const div of [3.75, 8.75]) { const h = amp(col(div)); if (Math.abs(h - hDe(G, min)) > 1.2) fP.push(`resserrement à ${div} div : ${virgule(h, 1)} px pour ${virgule(hDe(G, min), 1)}`); }
    juger("cretes-et-grille", fP.length === 0, `${ou} (${U0} V, ${Sm} V) : les crêtes dessinées aux quatre extrema contre U_max = ${virgule(max, 2)} et U_min = ${virgule(min, 2)} div × ${virgule(G.d, 2)} px lus sur la grille${fP.length ? ` — ${fP.join(" ; ")}` : " : à 1,2 px"}`);
    // aucun tracé ne sort du cadre (N11) : rien à moins d'une demi-division du bord
    const plusHaut = Math.min(...cols.map((c) => c.top ?? Infinity)), plusBas = Math.max(...cols.map((c) => c.bot ?? -Infinity));
    if ((G.yc - plusHaut) / G.d > 3.55 || (plusBas - G.yc) / G.d > 3.55) fP.push("hors cadre");
    juger("nombres", (G.yc - plusHaut) / G.d <= 3.55 && (plusBas - G.yc) / G.d <= 3.55, `N11 — ${ou} (${U0} V, ${Sm} V) : le tracé monte à ${virgule((G.yc - plusHaut) / G.d, 2)} et descend à ${virgule((plusBas - G.yc) / G.d, 2)} div (≤ 3,50 : jamais au bord)`);
    // la RÉPONSE de S2 : les deux curseurs, sur les nombres affichés
    const cM = await repere("curseur-max"), cm = await repere("curseur-min");
    if (cM && cm) juger("cretes-et-grille", Math.abs(G.yc - cM.y - hDe(G, max)) <= 1 && Math.abs(G.yc - cm.y - hDe(G, min)) <= 1, `${ou} : les curseurs U_max et U_min sont à ${virgule((G.yc - cM.y) / G.d, 2)} et ${virgule((G.yc - cm.y) / G.d, 2)} div`);
  }
  for (const Sm of MODULANTES) { await cocher("modulante", Sm.toFixed(1)); await lireCouple(4, Sm, "S2"); }
  await cocher("modulante", "2.0");
  await frontiere("étape 2 révélée");
  await etiquettesLisibles("étape 2 révélée");
  await cocher("modulante", "3.0");
  await etiquettesLisibles("étape 2, Sm = 3,0 V (u_S, U_max et U_min serrés)");
  await cocher("modulante", "2.0");
  await suivant();

  // ═══ S3 — on baisse la composante continue ═══
  await etatPose("on-baisse-la-continue");
  await avantPari("étape 3", ["pince", "zéro", "1,50", "surmodulation"], true);
  await formule("étape 3, avant le pari", { SEUIL: false, DETECTEUR: false, LL: false });
  await parier(indexDe("on-baisse-la-continue", "pincement"));
  {
    await etatPose("on-baisse-la-continue", true);
    const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
    juger("annonce", /composante continue à 2,0 V/.test(an) && /touche l.axe/.test(an), `étape 3 révélée : la région vivante dit « ${an} »`);
  }
  await formule("étape 3, révélée", { SEUIL: true, DETECTEUR: false, LL: false });
  {
    // les trois crans de la composante continue, à Sm = 3,0 V : 1,50 · 1,00 · 0,75
    for (const U0 of CONTINUES) {
      await cocher("continue", U0.toFixed(1));
      await lireCouple(U0, 3, "S3");
      const G = await repereMesure();
      await classer();
      const cols = await colonnes(G, await masqueRef());
      const amp = (c) => Math.max(c.top === null ? 0 : G.yc - c.top, c.bot === null ? 0 : c.bot - G.yc);
      const ampA = (div) => amp(cols.reduce((a, c) => (Math.abs(c.x - (G.x0 + div * G.d)) < Math.abs(a.x - (G.x0 + div * G.d)) ? c : a)));
      const m = 3 / U0;
      // aux extrema de la porteuse (4,0 kHz), le SIGNE et la hauteur de chaque crête : sous la bosse,
      // la crête change de signe (m > 1) — c'est ce qui distingue le pincement du contact exact (m = 1)
      const tk = lireTk(G, cols, 4, U0, 3, await masqueRef());
      const fausses = tk.filter((s) => Math.abs(s.att) >= 3 && (s.lu === null || Math.abs(s.lu - s.att) > 1.2));
      // les crêtes RETOURNÉES, mesurées : du signe opposé à celui de la porteuse seule, (−1)^k
      const retournees = tk.filter((s) => s.lu !== null && Math.abs(s.lu) >= 3 && Math.sign(s.lu) !== (s.k % 2 ? -1 : 1));
      if (m > 1) {
        // m = 1,50 : quatre contacts avec l'axe, une bosse de 0,50 div retournée entre deux
        const a = Math.asin(1 / m), z = [(Math.PI + a) / (2 * Math.PI * F_SIG), (2 * Math.PI - a) / (2 * Math.PI * F_SIG)];
        const zeros = [z[0], z[1], z[0] + T_ENV, z[1] + T_ENV].map((t) => t / MS_DIV);
        const touches = zeros.map((dv) => ampA(dv));
        // les cercles d'accent des pincements (la RÉPONSE, mesurée à part) mordent sur le tracé à ± 6 px
        // des zéros : les crêtes qui y tombent ne se lisent pas (4,7 px attendus, 6,0 lus sous le cercle)
        const sousRepere = (s) => zeros.some((dv) => Math.abs(s.x - (G.x0 + dv * G.d)) <= 8);
        for (let i = fausses.length - 1; i >= 0; i--) if (sousRepere(fausses[i])) fausses.splice(i, 1);
        const bosse = Math.max(0, ...retournees.map((s) => Math.abs(s.lu)));
        juger("pincement", touches.every((h) => h <= 1) && fausses.length === 0 && retournees.length >= 4, `m = 1,50 : aux zéros ${zeros.map((d) => virgule(d, 2)).join(" · ")} div, le tracé s'écarte de l'axe de ${touches.map((h) => virgule(h, 1)).join(" · ")} px (≤ 1) ; ${tk.length} crêtes lues aux t_k, ${fausses.length} hors de 1,2 px${fausses.length ? ` (${fausses.slice(0, 2).map((s) => `k = ${s.k} : ${s.lu === null ? "non lue" : virgule(s.lu, 1)} pour ${virgule(s.att, 1)}`).join(", ")})` : ""} ; ${retournees.length} crêtes RETOURNÉES sous les bosses (attendu ≥ 4 : l'opposition de phase), la plus haute à ${virgule(bosse / G.d, 2)} div (0,50 au sommet, qu'un t_k effleure)`);
        const P = [0, 1, 2, 3].map(async (i) => repere(`pincement-${i}`));
        const pins = await Promise.all(P);
        juger("pincement", pins.every((p, i) => p && Math.abs((p.x - G.x0) / G.d - zeros[i]) <= 0.05), `les marqueurs de pincement à ${pins.map((p) => (p ? virgule((p.x - G.x0) / G.d, 2) : "?")).join(" · ")} div`);
      } else if (m === 1) {
        // m = 1 exactement : le tracé effleure l'axe au creux, et AUCUNE crête ne change de signe
        const creux = [3.75, 8.75].map((dv) => ampA(dv));
        juger("contact-exact", creux.every((h) => h <= 1) && retournees.length === 0 && fausses.length === 0, `m = 1,00 (U0 = 3,0 V) : aux creux 3,75 et 8,75 div, le tracé s'écarte de l'axe de ${creux.map((h) => virgule(h, 1)).join(" et ")} px (≤ 1) ; ${tk.length} crêtes lues aux t_k, ${fausses.length} hors de 1,2 px, ${retournees.length} retournée(s) (attendu 0 : un contact, pas de bosse)`);
      } else {
        // m < 1 : le tracé ne touche jamais l'axe
        const pire = Math.min(...[3.75, 8.75].map(ampA));
        juger("pincement", pire >= hDe(G, extrema(U0, 3).min) - 1.2, `m = 0,75 : aux creux, le tracé reste à ${virgule(pire / G.d, 2)} div de l'axe (attendu 0,50 : il ne le touche pas)`);
      }
    }
    // le trait interrompu : l'enveloppe de DÉPART (U0 = 4,0 V), à l'encre, quand elle n'est plus la courante
    await cocher("continue", "2.0");
    const ref = await repere("reference");
    const G = await repereMesure();
    juger("etapes", !!ref && Math.abs((G.yc - ref.y) - hDe(G, E(0.3, 4, 3))) <= 1.5, `S3 : l'enveloppe de départ (4,0 V) ${ref ? `passe à ${virgule((G.yc - ref.y) / G.d, 2)} div à 0,60 div (attendu ${virgule(E(0.3, 4, 3), 2)})` : "n'est PAS dessinée"}`);
  }
  await frontiere("étape 3 révélée");
  await etiquettesLisibles("étape 3 révélée");
  await suivant();

  // ═══ S4 — la fenêtre du détecteur ═══
  await etatPose("la-fenetre-du-detecteur");
  await avantPari("étape 4", ["descente", "décroche", "suit"], true);
  await formule("étape 4, avant le pari", { DETECTEUR: true, LL: false });
  await parier(indexDe("la-fenetre-du-detecteur", "rate-la-descente"));
  {
    await etatPose("la-fenetre-du-detecteur", true);
    const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
    juger("annonce", /branche le détecteur/.test(an), `étape 4 révélée : la région vivante dit « ${an} »`);
    const vus = await Promise.all(["fin-uC", "borne-uC", "diode", "R0", "C0"].map(repere));
    juger("etapes", vus.every(Boolean), `étape 4 révélée : l'étage de détection et le second tracé ${vus.every(Boolean) ? "sont branchés" : "MANQUENT"}`);
  }
  await formule("étape 4, révélée", { LL: true });
  {
    // N6 — les cinq crans du rhéostat ; N8 et M2 aux pixels, à F = 8,0 kHz
    const fautes = [], fN8 = [], fM2 = [];
    let pireN8 = 0, plats = 0;
    for (const R0 of DETECTEURS) {
      await cocher("detecteur", cranTxt(R0));
      const l = await lecture("constante-temps"), att = `$R_0C_0 = ${virgule(R0, R0 >= 10 ? 0 : 1)}$ kΩ × 100 nF $= ${trois(tauMs(R0))}$ ms`;
      if (l !== att) fautes.push(`R0 = ${R0} : « ${l} » (attendu « ${att} »)`);
      const G = await repereMesure();
      await classer();
      const cols = await colonnes(G, await masqueRef());
      const uC = detecteur(8, 4, 2, R0);
      let decroche = 0;
      let lues = 0;
      for (const c of cols) {
        if (c.forte === null) continue;
        const t = tDe(G, c.x);
        // le BORD HAUT de l'encre forte contre le plus haut du modèle sur la largeur de la colonne,
        // élargie d'un demi-trait (1,1 px) : juste à toute pente. (La première version comparait le
        // BARYCENTRE de la colonne, hors « flancs » : à une crête aiguë suivie d'une décharge de
        // 23 px par colonne — R0 = 0,5 kΩ —, il tombait 10 px sous la courbe, sur un produit juste.)
        // sur la largeur du trait (± 1,1 px), le modèle est-il PLAT ? Alors le barycentre de l'encre
        // forte est la courbe, à 1,5 px. Sinon (flanc, crête aiguë, décharge de 23 px par colonne à
        // 0,5 kΩ), l'encre pleine ne couvre la colonne que là où le trait la traverse : la courbe du
        // modèle doit passer DANS cette plage, à 1,5 px près.
        const dt = (1.1 / G.d) * MS_DIV;
        let vmin = Infinity, vmax = -Infinity;
        for (let k = 0; k <= 8; k++) { const v = uC(t - dt + (2 * dt * k) / 8); vmin = Math.min(vmin, v); vmax = Math.max(vmax, v); }
        const yM = G.yc - hDe(G, uC(t));
        let ecart;
        if (hDe(G, vmax - vmin) < 1.5) { ecart = Math.abs(c.forte - yM); plats++; }
        else ecart = Math.max(0, c.forteHaut - 1.5 - yM, yM - c.forteBas - 1.5);
        lues++;
        pireN8 = Math.max(pireN8, ecart);
        if (ecart > 1.5) fN8.push(`R0 = ${R0} à ${virgule((c.x - G.x0) / G.d, 2)} div : encre forte de ${virgule((G.yc - c.forteHaut) / G.d, 2)} à ${virgule((G.yc - c.forteBas) / G.d, 2)} div (barycentre ${virgule((G.yc - c.forte) / G.d, 2)}) pour ${virgule(uC(t), 2)}`);
        // M2 : pendant la première descente (1,25 → 3,75 div), u_C au-dessus de l'enveloppe
        const dv = (c.x - G.x0) / G.d;
        if (dv >= 1.25 && dv <= 3.75) decroche = Math.max(decroche, (G.yc - c.forte) / G.d - E(t, 4, 2));
      }
      // anti-vacuité : le bord haut est lu sur presque toute la largeur de l'écran
      if (lues < 0.9 * cols.length) fN8.push(`R0 = ${R0} : u_C lu sur ${lues} colonnes seulement (sur ${cols.length})`);
      const attendu = tauMs(R0) >= 1;
      if ((decroche > 0.1) !== attendu && tauMs(R0) >= 0.5) fM2.push(`τ = ${trois(tauMs(R0))} ms : u_C dépasse l'enveloppe de ${virgule(decroche, 2)} div pendant la descente (${attendu ? "attendu > 0,10 : il décroche" : "attendu ≤ 0,10 : il suit"})`);
    }
    juger("nombres", fautes.length === 0, `N6 — les cinq crans du rhéostat : ${fautes.length ? fautes.slice(0, 2).join(" ; ") : "R0C0 0,0500 · 0,200 · 0,500 · 1,00 · 2,50 ms"}`);
    if (plats < 100) fN8.push(`seulement ${plats} colonnes PLATES lues au barycentre (attendu ≥ 100 sur les cinq crans)`);
    juger("detecteur", fN8.length === 0, `N8 aux pixels — F = 8,0 kHz, cinq crans : la courbe épaisse contre la récurrence rejouée ici, pire écart ${virgule(pireN8, 2)} px (≤ 1,5 : au barycentre sur ${plats} colonnes plates, dans la plage d'encre ailleurs)${fN8.length ? ` — ${fN8.slice(0, 3).join(" ; ")}` : ""}`);
    juger("detecteur", fM2.length === 0, `M2 — le décrochage, lu aux pixels : ${fM2.length ? fM2.join(" ; ") : "absent à 0,500 ms, présent à 1,00 et 2,50 ms"}`);
    await cocher("detecteur", "25");
    const dec = await repere("decrochage");
    juger("deux-traces", !!dec, `S4 révélée, 25 kΩ : le repère de décrochage ${dec ? "est posé" : "MANQUE"}`);
  }
  await frontiere("étape 4 révélée");
  await etiquettesLisibles("étape 4 révélée");
  await suivant();

  // ═══ S5 — le taux est bon, et rien ne marche ═══
  await etatPose("libre");
  await avantPari("étape 5", ["porteuse trop lente", "borne de gauche", "0,833"]);
  await parier(indexDe("libre", "augmenter-r"));
  {
    const res = await resultat();
    juger("paris", /incorrecte/i.test(res), `étape 5, pari faux (augmenter R0) : « ${res} »`);
    juger("etapes", (await controles()) === "continue,detecteur,modulante,porteuse", `étape 5 révélée : contrôles [${await controles()}]`);
    // N7 — la fenêtre aux 20 couples (F, R0)
    const fautes = [];
    for (const F of PORTEUSES) {
      await cocher("porteuse", F.toFixed(1));
      for (const R0 of DETECTEURS) {
        await cocher("detecteur", cranTxt(R0));
        const l = await lecture("fenetre"), att = `$1/F = ${trois(1 / F)}$ ms · $R_0C_0 = ${trois(tauMs(R0))}$ ms · $1/f = 2,50$ ms`;
        if (l !== att) fautes.push(`(${F}, ${R0}) « ${l} »`);
      }
    }
    juger("nombres", fautes.length === 0, `N7 — la fenêtre aux 20 couples (F, R0) : ${fautes.length ? fautes.slice(0, 2).join(" ; ") : "1/F · R0C0 · 1/f, à trois chiffres"}`);
    // N1–N4 aux neuf couples (F = 2,4 kHz : une crête NÉGATIVE tombe sur chaque extremum d'enveloppe)
    await cocher("porteuse", "2.4");
    await cocher("detecteur", "5.0");
    for (const U0 of CONTINUES) for (const Sm of MODULANTES) { await cocher("continue", U0.toFixed(1)); await cocher("modulante", Sm.toFixed(1)); await lireCouple(U0, Sm, "S5", U0 * Sm !== 0); }
    // les deux traces : u_C ≥ 0 partout, et au-dessus des crêtes de u_S
    const G = await repereMesure();
    await cocher("continue", "4.0"); await cocher("modulante", "2.0");
    const fT = [];
    for (const [F, R0] of [[8, 5], [8, 0.5], [1.2, 5], [8, 25]]) {
      await cocher("porteuse", F.toFixed(1)); await cocher("detecteur", cranTxt(R0));
      await classer();
      const cols = await colonnes(G, await masqueRef());
      const sous = cols.filter((c) => c.forte !== null && c.forte > G.yc + 1.5).length;
      const avecU = cols.filter((c) => c.nForte > 0).length;
      if (sous > 0 || avecU < 0.9 * cols.length) fT.push(`(${F} kHz, ${R0} kΩ) : ${sous} colonne(s) où u_C passe SOUS l'axe, u_C lu sur ${avecU}/${cols.length} colonnes`);
    }
    juger("deux-traces", fT.length === 0, `u_C, en trait épais, toujours au-dessus de l'axe et continu : ${fT.length ? fT.join(" ; ") : "aux quatre réglages"}`);
    await cocher("porteuse", "1.2"); await cocher("detecteur", "5.0");
    const vid = await repere("vidange");
    juger("deux-traces", !!vid, `S5 révélée (1,2 kHz, 5,0 kΩ) : le repère « le condensateur se vide » ${vid ? "est posé" : "MANQUE"}`);
  }
  {
    // N1–N4 : bilan des 9 couples
    const faux = couples.filter((c) => c.fautes.length);
    const sature = couples.filter((c) => c.Sm > c.U0);
    juger("nombres", faux.length === 0, `N1–N4 — ${couples.length} relevés aux 9 couples (U0, Sm) : ${faux.length ? faux.flatMap((c) => c.fautes).slice(0, 3).join(" ; ") : "U_max, U_min, A (lue et réglée), m lu et m réglé, à la chaîne"}`);
    juger("nombres", sature.every((c) => !c.egaux) && couples.filter((c) => c.Sm <= c.U0).every((c) => c.egaux), `N4 — taux lu et taux réglé : identiques aux couples m ≤ 1, DIFFÉRENTS aux couples m > 1 (${sature.length} relevé(s))`);
    // N12 — les crans, lus sur le DOM ET sur le registre
    const n = {};
    for (const c of ["porteuse", "modulante", "continue", "detecteur"]) n[c] = await panneau.locator(`[data-controle="${c}"] input`).count();
    const sansDeux = !(await panneau.locator('[data-controle="porteuse"] input[value="2.0"]').count()) && !registre.valeurs.F_khz.includes("2.0");
    juger("nombres", n.porteuse === 4 && n.modulante === 3 && n.continue === 3 && n.detecteur === 5 && sansDeux && registre.valeurs.F_khz.length === 4, `N12 — crans : ${n.porteuse} porteuses, ${n.modulante} signaux, ${n.continue} composantes continues, ${n.detecteur} rhéostats (attendu 4, 3, 3, 5) ; 2,0 kHz ${sansDeux ? "absent" : "PRÉSENT"} du DOM et du registre`);
  }
  {
    // la palette : aucun pixel hors des jetons ; u_S et u_C sans différence de TEINTE
    const { horsPalette } = await classer();
    const teintes = await panneau.evaluate((el) => {
      const { cls, w, h } = window.__cls;
      const d = el.querySelector("canvas").getContext("2d").getImageData(0, 0, w, h).data;
      let n2 = 0, c2 = 0, n3 = 0, c3 = 0;
      for (let k = 0; k < w * h; k++) {
        if (cls[k] !== 2 && cls[k] !== 3) continue;
        const r = d[4 * k], g = d[4 * k + 1], b = d[4 * k + 2], m = (r + g + b) / 3, c = Math.hypot(r - m, g - m, b - m);
        if (cls[k] === 2) { n2++; c2 += c; } else { n3++; c3 += c; }
      }
      return { forte: n2 ? c2 / n2 : 0, trait: n3 ? c3 / n3 : 0 };
    });
    juger("palette", horsPalette === 0 && Math.abs(teintes.forte - teintes.trait) <= 6, `étape 5 : ${horsPalette} pixel(s) teintés hors de la palette (attendu 0) ; chrominance moyenne de u_C ${virgule(teintes.forte, 1)}, de u_S ${virgule(teintes.trait, 1)} (une seule encre : à 6 près)`);
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

// ── La table des étapes, réécrite ICI contre le descripteur (fuite entre étapes, spec §7.6) ──
{
  const fautes = [];
  const attendu = { "deux-rythmes": "porteuse", "le-taux-par-deux-cretes": "modulante", "on-baisse-la-continue": "continue", "la-fenetre-du-detecteur": "detecteur", libre: "continue,detecteur,modulante,porteuse" };
  for (const e of descripteur.etapes) if ([...e.controles].sort().join(",") !== attendu[e.id]) fautes.push(`${e.id} ouvre [${e.controles.join(",")}]`);
  // les états ATTEIGNABLES avant chaque étape : l'état posé, la révélation, puis le contrôle ouvert sur tous ses crans
  const cle = { porteuse: "F_khz", modulante: "Sm_v", continue: "U0_v", detecteur: "R0_kohm" };
  const atteints = [];
  descripteur.etapes.forEach((e, i) => {
    const base = { ...e.etat, ...(e.etat_revele ?? {}) };
    let etats = [base];
    for (const c of e.controles) etats = etats.flatMap((s) => registre.valeurs[cle[c]].map((v) => ({ ...s, [cle[c]]: v })));
    atteints.push({ i, id: e.id, etats: [e.etat, ...etats] });
  });
  const avant = (k) => atteints.filter((a) => a.i < k).flatMap((a) => a.etats);
  if (avant(2).some((s) => parseFloat(s.Sm_v) >= parseFloat(s.U0_v))) fautes.push("m ≥ 1 atteignable avant S3");
  if (avant(3).some((s) => s.sortie === "modulee-et-detectee")) fautes.push("le détecteur branché avant la révélation de S4");
  if (atteints[3].etats[0].sortie !== "modulee") fautes.push("S4 s'ouvre détecteur BRANCHÉ");
  if (avant(4).some((s) => s.F_khz === "1.2" && s.sortie === "modulee-et-detectee")) fautes.push("(1,2 kHz, détecteur branché) atteignable avant S5");
  juger("fuite-inter-etapes", fautes.length === 0, `table du §7.6 : ${fautes.length ? fautes.join(" ; ") : "chaque réglage n'ouvre qu'à SON étape ; m ≥ 1 inatteignable avant S3 ; le détecteur n'existe qu'à la révélation de S4 ; (1,2 kHz, détecteur) inatteignable avant S5"}`);
}

// Le thème sombre repeint le fond.
{
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(cv.width - 3, cv.height - 3, 1, 1).data; return [d[0], d[1], d[2]]; });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  noter("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}

// ── La frontière sait-elle rougir, FORME PAR FORME ? (essai rouge seulement) ──
if (ESSAI) {
  const muettes = [];
  for (const [nom, , exemple] of FORMES) {
    await panneau.evaluate((el, x) => { const s = document.createElement("span"); s.setAttribute("data-sonde", ""); s.textContent = ` ${x} `; el.querySelector("[data-lectures], [data-notes]")?.appendChild(s); }, exemple);
    const t = await panneau.evaluate((el) => el.textContent ?? "");
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
    const justes = ["porteuse-4k", "difference-sur-somme", "pincement", "rate-la-descente", "porteuse-trop-lente"];
    for (let k = 0; k < 5; k++) {
      const e = descripteur.etapes[k];
      await q.locator("[data-pari-choix] li button").nth(e.pari.choix.findIndex((c) => c.id === justes[k])).click();
      await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 10000 }).catch(() => {});
      await p2.waitForTimeout(250);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q);
      if (k === 1) { await q.locator('[data-controle="modulante"] input[value="3.0"]').check(); await p2.waitForTimeout(150); await etiquettesLisibles("390 px, étape 2, Sm = 3,0 V", q); }
      if (k === 0) {
        // 40 oscillations au téléphone : la grille est-elle encore lue, et l'enveloppe encore inerte ?
        await q.locator('[data-controle="porteuse"] input[value="8.0"]').check(); await p2.waitForTimeout(150);
        const G = await repereMesure(q);
        juger("grille", !!G && G.g.verticales.length === 11 && G.d >= 20, `390 px : ${G?.g.verticales.length ?? 0} verticales lues, ${G ? virgule(G.d, 1) : "?"} px par division (≥ 20) — ${G ? virgule((G.d * 0.25), 1) : "?"} px par oscillation à 8,0 kHz`);
        await etiquettesLisibles("390 px, étape 1, 8,0 kHz", q);
      }
      if (k < 4) { await q.getByRole("button", { name: "Étape suivante" }).click(); await p2.waitForTimeout(200); }
    }
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune ; sans course) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-modulation : le banc de modulation (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "nombres", "grille", "enveloppe-inerte", "cretes-et-grille", "comptage", "pincement", "contact-exact", "deux-traces", "detecteur", "palette", "formule-graduee", "fuite-inter-etapes", "frontiere", "latex", "etiquettes", "cadre", "immobile", "annonce", "ergonomie"];
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
