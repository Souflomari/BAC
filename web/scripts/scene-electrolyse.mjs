#!/usr/bin/env node
/**
 * scene-electrolyse — la porte du « banc d'électrolyse »
 * (pc/electrolyse, en tête de R4 ; spec
 * content/pc/electrolyse/spec-scene-electrolyse.md §11 ; ADR 0041 §8).
 *
 * Elle lit le RENDU (next start + Chromium), jamais le code du produit, et
 * trouve son panneau par `[data-scene="banc-electrolyse"]`. La scène est
 * ANALYTIQUE : la porte refait chaque NOMBRE par sa propre arithmétique (les
 * constantes de la spec, écrites ICI), et lit les faits de PIXELS dans les deux
 * sens. Les repères du produit ne disent que OÙ regarder, jamais COMBIEN :
 * l'échelle du dépôt est LUE sur le témoin « 1 g », l'épaisseur et
 * l'amincissement des lames sur leur trait, l'aiguille et les flèches sur
 * leur encre.
 *
 * LES FAMILLES (spec §11) : avant-clic · pas-de-3d · etapes · avant-pari ·
 * paris · course (N11, contre l'horloge) · eclairs · sans-mouvement · nombres
 * (N1…N12 — N12, la ligne de la démonstration : 27 états, 9 jeux de valeurs) ·
 * depot-a-l-echelle · echelle-constante · aiguille · courant-oriente ·
 * electrons-a-contresens · fils-croises · etiquettes-electrodes ·
 * lame-et-balance · teinte-du-bain · palette · formule-graduee ·
 * fuite-inter-etapes · frontiere (une sonde par FORME, et les trois grilles de
 * nombres) · fleches-chimiques · latex · etiquettes et cadre (1 280 et 390 px)
 * · immobile · annonce · theme · console · ergonomie.
 *
 * Ce que la porte NE mesure PAS, écrit à côté de ce qu'elle mesure (ADR 0035) :
 * la règle d'échelle en centimètres de la spec (§11.2, `echelle-constante`,
 * second volet) — la paillasse est un SCHÉMA, pas un plan à l'échelle, et le
 * produit ne dessine qu'une échelle, celle du dépôt ; la porte ne la cherche
 * donc pas (spec LIVRÉE, ce que la construction a changé).
 *
 *   node scripts/scene-electrolyse.mjs --porte        (⚠️ depuis web/, après build)
 *   node scripts/scene-electrolyse.mjs --essai-rouge  (chaque famille doit crier ;
 *                                                      chaque forme injectée, vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_ELECTROLYSE ?? 3920 + (process.pid % 60));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/electrolyse";
const SCENE = "banc-electrolyse";
const OUVRIR = "Ouvrir le banc d’électrolyse";

// ── La seconde voie : les constantes de la SPEC (§5), rien du produit ──────
const MZN = 65.4, MCU = 63.5, F = 9.65e4, Z = 2, ACCELERE = 900;
const TENSIONS = ["2.0", "6.0", "12.0"];
const INTENSITES = [100, 200, 400];
const DUREES = [1800, 2700, 5400];
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
const cs = (x, n) => { if (x === 0) return 0; const e = Math.floor(Math.log10(Math.abs(x))); const f = 10 ** (n - 1 - e); return Math.round(x * f) / f; };
const mg = (m) => Math.round(m * 1000 + 1e-9) / 1000;
/** Tout ce que la spec dit du réglage (I en mA, Δt en s), en valeurs AFFICHÉES — la cascade du §5.7. */
function attendu(iMa, dt, cablage = "oppose") {
  const Q = (iMa / 1000) * dt;
  const zn = mg((Q * MZN) / (Z * F)), cu = mg((Q * MCU) / (Z * F));
  const n = cs((Z * zn) / MZN, 4);
  const f = cs(Q / n, 3);
  const s = cablage === "oppose" ? 1 : -1;
  return { Q, zn: s * zn, cu: -s * cu, n, f };
}
const milliers = (x) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const masse = (m) => `${m > 0 ? "+" : ""}${virgule(m, 3)} g`;
const sci = (x, n) => { const e = Math.floor(Math.log10(Math.abs(x)) + 1e-12); return `${(x / 10 ** e).toFixed(n - 1).replace(".", "{,}")}\\times10^{${e}}`; };
const DUREE = { 1800: "30 min = 1 800 s", 2700: "45 min = 2 700 s", 5400: "1 h 30 = 5 400 s" };
const SENS = { oppose: "sens imposé", accord: "sens spontané (le générateur accompagne)" };

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const journal = `${os.tmpdir()}/scene-electrolyse-${PORT}-${process.pid}.log`;
  const fd = fs.openSync(journal, "w");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: ["ignore", fd, fd], detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("scene-electrolyse : `next start` n'a pas répondu. Build absent ?");
    try { console.error(fs.readFileSync(journal, "utf8").split("\n").slice(-20).map((l) => "  | " + l).join("\n")); } catch {}
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/electrolyse/media/banc-electrolyse.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-electrolyse : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
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
const espaces = (t) => (t ?? "").replace(/[\s  ]+/g, " ").trim();
/**
 * Une lecture, dans la forme que le PRODUIT écrit (ADR 0039) : chaque formule
 * KaTeX remplacée par sa source TeX (l'annotation), le reste en texte.
 */
const lecture = (cle, q = panneau) => q.evaluate((el, cle) => {
  const dd = el.querySelector(`[data-lecture="${cle}"]`);
  if (!dd) return "";
  const c = dd.cloneNode(true);
  c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(a ? a.textContent : k.textContent)); });
  return (c.textContent ?? "").replace(/[\s  ]+/g, " ").trim();
}, cle);
const etiquette = (nom, q = panneau) => q.evaluate((el, n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); return e && getComputedStyle(e).visibility === "visible" ? (e.textContent ?? "").replace(/[\s  ]+/g, " ").trim() : ""; }, nom);
const controles = async () => (await panneau.locator("[data-controle]").evaluateAll((els) => els.map((e) => e.getAttribute("data-controle")))).sort().join(",");
const resultat = async () => ((await panneau.locator("[data-pari-bloc] [role=status]").last().textContent().catch(() => "")) ?? "").trim();
const parier = async (i) => { await panneau.locator("[data-pari-choix] li button").nth(i).click(); await deuxImages(); await page.waitForTimeout(80); };
const suivant = () => panneau.getByRole("button", { name: "Étape suivante" }).click().then(deuxImages).then(() => page.waitForTimeout(150));
const cocher = async (ctl, v, q = panneau) => { await q.locator(`[data-controle="${ctl}"] input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(30); };
/** Un repère (étiquette sans texte), en px CSS relatifs au canvas ; null s'il n'est pas visible. */
const repere = (nom, q = panneau) => q.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
/**
 * Le texte du panneau, dans la forme que le PRODUIT écrit (ADR 0039) : chaque
 * formule KaTeX remplacée par sa source TeX, la virgule protégée `{,}` rendue
 * à la virgule. Le `textContent` d'une formule KaTeX concatène le MathML, la
 * source et le rendu : « $1{,}1$ volt » s'y lisait « 1,11{,}11,1 volt », et la
 * grille des tensions y trouvait 11,1 V (premier passage de la porte). La
 * description lue au lecteur d'écran (l'aria-label du canvas) en fait partie.
 */
const texteRendu = (q = panneau) => q.evaluate((el) => {
  const c = el.cloneNode(true);
  c.querySelectorAll(".katex").forEach((k) => { const a = k.querySelector('annotation[encoding="application/x-tex"]'); k.replaceWith(document.createTextNode(` ${(a ? a.textContent : k.textContent).replace(/\{,\}/g, ",")} `)); });
  return `${c.textContent}\n${el.querySelector("canvas")?.getAttribute("aria-label") ?? ""}`;
});
/** Le centre d'une étiquette de TEXTE, relatif au canvas. */
const centreEtiquette = (nom, q = panneau) => q.evaluate((el, n) => {
  const c = el.querySelector("canvas").getBoundingClientRect();
  const e = el.querySelector(`[data-etiquette="${n}"]`);
  const r = e?.getBoundingClientRect();
  return r && getComputedStyle(e).visibility === "visible" && (e.textContent ?? "").trim() ? { x: r.left + r.width / 2 - c.left, y: r.top + r.height / 2 - c.top } : null;
}, nom);
const jetonCouleur = (nom) => page.evaluate(([sc, n]) => {
  const c = document.createElement("canvas"); c.width = c.height = 1; const x = c.getContext("2d");
  x.fillStyle = getComputedStyle(document.querySelector(`[data-scene="${sc}"]`)).getPropertyValue(n).trim();
  x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3);
}, [SCENE, nom]);
const accent = await jetonCouleur("--figure-accent");

/**
 * Le canvas, classé pixel par pixel : 1 = accent FORT, 3 = accent faible
 * (bords lissés, tirets), 2 = encre (neutre, à plus de 60 de luminance du
 * fond), 0 = le reste (fond, bains, lames pâles). Un pixel TEINTÉ hors de
 * l'accent est hors palette.
 */
const classer = (q = panneau) => q.evaluate((el, accent) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const g = cv.getContext("2d");
  const d = g.getImageData(0, 0, cv.width, cv.height).data;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
  const f = t.getImageData(0, 0, 1, 1).data;
  const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const cf = chroma(f[0], f[1], f[2]);
  const ca = chroma(...accent).map((x, i) => x - cf[i]), na = Math.hypot(...ca);
  const cls = new Uint8Array(cv.width * cv.height);
  let accentN = 0, horsPalette = 0;
  for (let i = 0, k = 0; i < d.length; i += 4, k++) {
    const c = chroma(d[i], d[i + 1], d[i + 2]).map((x, j) => x - cf[j]), nc = Math.hypot(...c);
    const l = 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
    const cos = nc > 0 ? (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) : 0;
    if (nc > 12 && cos > 0.85) { cls[k] = nc >= 0.8 * na ? 1 : 3; accentN++; }
    else if (nc < 25 && Math.abs(l - lf) > 60) cls[k] = 2;
    if (nc > 20 && cos < 0.6) horsPalette++;
  }
  window.__cls = { cls, w: cv.width, h: cv.height, dpr, d };
  return { accentN, horsPalette, dpr };
}, accent);

/** Les extrêmes des pixels du genre donné dans la rangée y, sur [x0, x1]. */
const extremes = (x0, x1, y, genre, q = panneau) => q.evaluate((el, { x0, x1, y, genre }) => {
  const { cls, w, dpr } = window.__cls;
  const Y = Math.round(y * dpr - 0.5);
  let a = null, b = null;
  for (let X = Math.max(0, Math.round(x0 * dpr)); X <= Math.min(w - 1, Math.round(x1 * dpr)); X++) {
    const c = cls[Y * w + X];
    const ok = genre === 2 ? c === 2 : c === 1 || c === 3;
    if (ok) { if (a === null) a = X; b = X; }
  }
  return a === null ? null : { a: a / dpr, b: (b + 1) / dpr };
}, { x0, x1, y, genre });

/** Le témoin « 1 g » : la plage d'encre de sa rangée, depuis son bord gauche. */
async function pxParGramme(q = panneau) {
  const g = await repere("temoin-g", q), dd = await repere("temoin-d", q);
  if (!g || !dd) return null;
  const e = await extremes(g.x - 3, dd.x + 3, g.y, 2, q);
  return e ? e.b - e.a : null;
}

/**
 * Depuis x (le milieu de la lame), dans la rangée y : de chaque côté, le
 * premier pixel PEINT (encre ou accent — le fond de la lame et le bain sont
 * pâles, classe 0) est le bord INTÉRIEUR du trait ; la plage peinte continue
 * qui le suit s'arrête au bord EXTÉRIEUR (le trait, et le dépôt collé à lui).
 */
const bordsLame = (x, y, q = panneau) => q.evaluate((el, { x, y }) => {
  const { cls, w, dpr } = window.__cls;
  const Y = Math.round(y * dpr - 0.5), X0 = Math.round(x * dpr - 0.5);
  const peint = (X) => X >= 0 && X < w && cls[Y * w + X] !== 0;
  const cote = (s) => {
    let X = X0, n = 0;
    while (!peint(X) && n < 40 * dpr) { X += s; n++; }
    if (!peint(X)) return null;
    const int = X;
    while (peint(X + s)) X += s;
    return { int, ext: X };
  };
  const g = cote(-1), d = cote(1);
  if (!g || !d) return null;
  return { int: (d.int - g.int - 1) / dpr, ext: (d.ext - g.ext + 1) / dpr, gExt: g.ext / dpr };
}, { x, y });
/** La part des pixels d'ACCENT le long d'une colonne, entre y0 et y1. */
const couverture = (x, y0, y1, q = panneau) => q.evaluate((el, { x, y0, y1 }) => {
  const { cls, w, dpr } = window.__cls;
  const X = Math.round(x * dpr - 0.5);
  let n = 0, a = 0;
  for (let Y = Math.round(y0 * dpr); Y <= Math.round(y1 * dpr); Y++) { n++; const c = cls[Y * w + X]; if (c === 1 || c === 3) a++; }
  return n ? a / n : 0;
}, { x, y0, y1 });

/**
 * Une lame, lue aux pixels. Hors du bain (rangée `-haut`), le trait d'origine ;
 * à mi-immersion : une lame qui s'AMINCIT a son bord intérieur qui rentre
 * (aminci = t, exactement) ; une lame qui GAGNE a son bord extérieur qui sort
 * (le dépôt couvre la moitié externe du trait : dépôt = écart/2 + 0,75, et
 * 0,75 au plus d'erreur sous 0,75 px). Et, pour trancher même à 1 px, la
 * colonne juste hors du bord d'origine : de l'accent PLEIN tout du long, c'est
 * un dépôt ; en TIRETS, c'est le contour d'une lame entamée (premier passage :
 * la mesure prenait les tirets pour un dépôt de 2,8 px).
 */
async function lameLue(nom, q = panneau) {
  const h = await repere(`lame-${nom}-haut`, q), m = await repere(`lame-${nom}-mi`, q), t = await repere(`lame-${nom}-tete`, q);
  if (!h || !m || !t) return null;
  const haut = await bordsLame(h.x, h.y, q), mi = await bordsLame(m.x, m.y, q);
  if (!haut || !mi) return null;
  const yLiq = 2 * h.y - t.y, yFond = 2 * m.y - yLiq;
  const cov = await couverture(haut.gExt + 0.25, yLiq + 3, yFond - 3, q);
  const ecart = mi.ext - haut.ext;
  return {
    aminci: Math.max(0, (haut.int - mi.int) / 2),
    depot: ecart > 0.5 ? ecart / 2 + 0.75 : 0,
    cov,
    genre: cov >= 0.9 ? "depot" : cov >= 0.3 ? "entaille" : "rien",
  };
}

/**
 * L'aiguille : les pixels d'encre ou d'accent DANS le cadran, au-dessus du
 * pivot, en deçà de la graduation — leur abscisse moyenne relative au pivot.
 */
async function aiguilleLue(q = panneau) {
  const p = await repere("ampere-pivot", q), z = await repere("ampere-zero", q);
  if (!p || !z) return null;
  const rG = p.y - z.y;
  return q.evaluate((el, { p, rG }) => {
    const { cls, w, h, dpr } = window.__cls;
    let n = 0, sx = 0;
    for (let Y = Math.round((p.y - rG + 6) * dpr); Y <= Math.round((p.y - 4) * dpr); Y++)
      for (let X = Math.round((p.x - rG) * dpr); X <= Math.round((p.x + rG) * dpr); X++) {
        if (X < 0 || Y < 0 || X >= w || Y >= h) continue;
        const r = Math.hypot(X / dpr - p.x, Y / dpr - p.y);
        if (r < 4 || r > rG - 6) continue;
        const c = cls[Y * w + X];
        if (c === 1 || c === 2 || c === 3) { n++; sx += X / dpr - p.x; }
      }
    return { n, dx: n ? sx / n : 0 };
  }, { p, rG });
}

/**
 * Le sens d'une flèche horizontale, lu aux pixels : dans la bande de ±5 px de
 * sa rangée, la hauteur de chaque colonne peinte ; la POINTE est là où la
 * colonne est la plus haute (le triangle), la hampe fait 2 px.
 */
async function sensFleche(queue, tete, q = panneau) {
  const a = await repere(queue, q), b = await repere(tete, q);
  if (!a || !b) return null;
  return q.evaluate((el, { a, b }) => {
    const { cls, w, h, dpr } = window.__cls;
    const x0 = Math.min(a.x, b.x) - 3, x1 = Math.max(a.x, b.x) + 3, y = a.y;
    let meilleur = -1, xM = null;
    for (let X = Math.round(x0 * dpr); X <= Math.round(x1 * dpr); X++) {
      let n = 0;
      for (let Y = Math.round((y - 5) * dpr); Y <= Math.round((y + 5) * dpr); Y++) if (X >= 0 && Y >= 0 && X < w && Y < h && cls[Y * w + X] !== 0) n++;
      if (n > meilleur) { meilleur = n; xM = X / dpr; }
    }
    return { sens: xM > (x0 + x1) / 2 ? 1 : -1, hauteur: meilleur / dpr };
  }, { a, b });
}

/** Un pixel moyen (3×3) d'un point du canvas. */
const pixel = (p, q = panneau) => q.evaluate((el, p) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const d = cv.getContext("2d").getImageData(Math.round(p.x * dpr) - 1, Math.round(p.y * dpr) - 1, 3, 3).data;
  const s = [0, 0, 0];
  for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) s[k] += d[i + k] / 9;
  return s;
}, p);

// ── Avant le pari, la frontière, le LaTeX, la formule graduée ──
async function avantPari(ou, { interdits = [], premiere = false, balanceZn = null } = {}) {
  const { accentN } = await classer();
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const dits = interdits.filter((m) => desc.toLowerCase().includes(m.toLowerCase()));
  const lance = await panneau.locator("[data-lancer]").count();
  const fautes = [];
  if (accentN) fautes.push(`${accentN} px d'accent`);
  if (l) fautes.push("lectures PRÉSENTES");
  if (lance) fautes.push("bouton « Lancer » PRÉSENT");
  if (await controles()) fautes.push(`contrôles [${await controles()}]`);
  if (dits.length) fautes.push(`la description DIT : ${dits.join(", ")}`);
  if (premiere) {
    for (const r of ["aiguille-bout", "i-g-tete", "i-d-tete", "e-g-tete", "e-d-tete"]) if (await repere(r)) fautes.push(`${r} DESSINÉ`);
    for (const n of ["nom-role-cu", "nom-role-zn"]) if (await etiquette(n)) fautes.push(`« ${await etiquette(n)} » affiché`);
    if ((await attr("data-p")) !== "0.000") fautes.push(`lames entamées (p = ${await attr("data-p")})`);
    for (const n of ["nom-balance-cu", "nom-balance-zn"]) if ((await etiquette(n)) !== "0,000 g") fautes.push(`balance « ${await etiquette(n)} »`);
  } else {
    // l'énoncé que la consigne décrit : l'aiguille et les rôles (acquis de S1), la pesée déjà faite
    if (!(await repere("aiguille-bout"))) fautes.push("aiguille ABSENTE (l'énoncé la montre)");
    if (!(await etiquette("nom-role-cu")) || !(await etiquette("nom-role-zn"))) fautes.push("rôles ABSENTS (l'énoncé les nomme)");
    if (balanceZn && (await etiquette("nom-balance-zn")) !== balanceZn) fautes.push(`balance du zinc « ${await etiquette("nom-balance-zn")} » (la consigne dit ${balanceZn})`);
  }
  juger("avant-pari", fautes.length === 0, `${ou}, avant le pari : ${fautes.length ? fautes.join(" ; ") : `aucun accent, aucune lecture, aucun « Lancer », aucun contrôle${premiere ? ", ni aiguille, ni flèche, ni rôle, lames neuves, balances à 0,000 g" : `, l'énoncé seul (aiguille et rôles à l'encre, balance du zinc ${balanceZn})`}`}`);
}
async function engageSansCourse(ou) {
  const { accentN } = await classer();
  const l = await panneau.locator("[data-lecture]").count();
  const res = await resultat();
  const p = await attr("data-p");
  juger("avant-pari", accentN === 0 && l === 0 && !/bonne|incorrecte/i.test(res) && p === "0.000", `${ou}, pari pris, circuit pas encore fermé : ${accentN} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, verdict ${res ? `« ${res} »` : "absent"}, lames ${p === "0.000" ? "neuves (p = 0)" : `ENTAMÉES (p = ${p})`}`);
}
/** Fermer le circuit ; mesurer la course à l'horloge ; rendre sa durée (s). */
async function laCourse() {
  const t0 = Date.now();
  await panneau.locator("[data-lancer]").click();
  let vu = new Set();
  for (let i = 0; i < 500; i++) {
    const c = await attr("data-course");
    vu.add(await attr("data-p"));
    if (c === "finie") break;
    await page.waitForTimeout(40);
  }
  const t = (Date.now() - t0) / 1000;
  await page.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") !== "note", SCENE, { timeout: 5000 }).catch(() => {});
  await deuxImages();
  await page.waitForTimeout(120);
  return { t, intermediaires: [...vu].filter((p) => p !== "0.000" && p !== "1.000").length };
}
function jugerCourse(ou, c, dt) {
  const T = dt / ACCELERE;
  juger("course", Math.abs(c.t - T) / T <= 0.15 && c.intermediaires >= 3, `${ou} : ${virgule(c.t, 2)} s à l'horloge pour ${virgule(T, 1)} s attendues (Δt/900, à 15 %) ; ${c.intermediaires} états intermédiaires vus (la balance MONTE)`);
}

const FORMES = [
  // §9.1 aucun potentiel standard
  ["E°", /E\s*°|E\^\\circ|E\^\{\\circ\}|E\^0|(^|[^\p{L}])E0(?![\p{L}\d])/u, "E°"],
  ["potentiel standard", /potentiel (standard|d.électrode|rédox)|échelle des potentiels/iu, "potentiel standard"],
  ["ESH", /(^|[^\p{L}])ESH(?![\p{L}])|électrode standard|hydrogène standard/u, "ESH"],
  ["Nernst", /nernst|0,059|RT\/nF/iu, "Nernst"],
  // §9.2 aucune surtension
  ["surtension", /surtension|surpotentiel|tension de décomposition|intensité-potentiel|tafel|densité de courant/iu, "surtension"],
  ["eta", /\\eta|η/u, "η"],
  // §9.3 aucune loi I(U), aucune résistance chiffrée
  ["loi d'Ohm", /loi d.ohm|(^|[^\p{L}])ohms?(?![\p{L}])|\\Omega|Ω/iu, "loi d'Ohm"],
  ["U = RI", /U\s*=\s*R\s*\\?,?\s*I|(^|[^\p{L}])R\s*=\s*\d/u, "U = RI"],
  ["résistance", /(^|[^\p{L}])résistances?(?![\p{L}])|conductance|conductivité/iu, "la résistance"],
  ["I(U)", /I\s*=\s*f\s*\(\s*U|I\s*\(\s*U\s*\)|(^|[^\p{L}])caractéristique|droite de charge|point de fonctionnement/iu, "I = f(U)"],
  // §9.4 aucune énergie chiffrée
  ["joule", /(^|[^\p{L}])joules?(?![\p{L}])|\\text\{J\}|kWh|(^|[^\p{L}])Wh(?![\p{L}])|effet joule/iu, "joule"],
  ["puissance", /(^|[^\p{L}])puissance|(^|[^\p{L}])watts?(?![\p{L}])|P\s*=\s*U\s*I|rendement énergétique|bilan énergétique/iu, "la puissance"],
  // §9.5 aucune thermodynamique
  ["enthalpie", /enthalpie|entropie|\\Delta_?r?\s*G|gibbs/iu, "l'enthalpie"],
  // §9.6 aucun rendement faradique
  ["rendement faradique", /rendement (faradique|de l.électrolyse)|réaction (parasite|secondaire)/iu, "rendement faradique"],
  // §9.7 aucun gaz
  ["volume molaire", /V_m|V_\{m\}|volume molaire|22,4|L[.·/]mol/u, "volume molaire"],
  ["gaz", /(^|[^\p{L}])gaz(?![\p{L}])|dégagement|(^|[^\p{L}])bulles?(?![\p{L}])|dihydrogène|dioxygène|dichlore|H_2|H₂|O_2|O₂|Cl_2/iu, "un gaz"],
  ["mL", /\d\s*mL(?![\p{L}])/u, "30 mL"],
  // §9.8 aucune application, aucun autre métal
  ["galvanoplastie", /galvanoplast|anode soluble|chromage|nickelage|argenture|dorure|cryolithe|bauxite/iu, "galvanoplastie"],
  // les SYMBOLES en position chimique (ion, demi-équation) : « Au bout de 30 min » n'est pas de l'or
  ["autre métal", /(^|[^\p{L}])(argent|nickel|aluminium|plomb|chrome)(?![\p{L}])|(^|[^\p{L}])(Ag|Ni|Al|Cr|Pb|Au|Na|Br)\s*(\^|_|\\rightleftharpoons|⇌)|(\\rightleftharpoons|⇌)\s*(Ag|Ni|Al|Cr|Pb|Au|Na|Br)(?![\p{L}])/u, "l'argent"],
  ["accumulateur", /accumulateur|batterie|recharge/iu, "un accumulateur"],
  // §9.9 aucun Q_r, aucun K, aucun avancement chiffré
  ["Q_r", /Q_\{?r|(^|[^\p{L}])K\s*=|constante d.équilibre|quotient de réaction|avancement|x_\{?max|\\tau/iu, "Q_r"],
  // §9.10 aucune concentration chiffrée
  ["concentration", /concentration|mol\s*[/·.]\s*L|\[Zn\^\{2\+\}\]|\[Cu\^\{2\+\}\]|(^|[^\p{L}])dilu|(^|[^\p{L}])satur/iu, "la concentration"],
  // §9.11 aucun pH
  ["pH", /(^|[^\p{L}])pH(?![\p{L}])|(^|[^\p{L}])pK|(^|[^\p{L}])acides?(?![\p{L}])|basique|hydroxyde|H_3O|équivalence/u, "le pH"],
  // §9.12 aucun graphe
  ["graphe", /(^|[^\p{L}])graphe|(^|[^\p{L}])pentes?(?![\p{L}])|coefficient directeur|ordonnée à l.origine|courbe représentative|m\s*=\s*f\(|Q\s*=\s*f\(/iu, "le graphe"],
  // §9.13 aucune incertitude chiffrée
  ["incertitude", /±|\\pm|incertitude|écart-type|erreur relative|précision relative|intervalle de confiance|répétabilité/iu, "±"],
  // §9.15 pas un TP
  ["TP", /(^|[^\p{L}])TP(?![\p{L}])|travaux pratiques|protocole|mode opératoire|manipulation à réaliser|(^|[^\p{L}])blouse|pissette|rinçage|séchage/u, "en TP"],
];
/** §9.16 : les trois grilles de nombres — tensions, intensités, durées. */
function grilles(t) {
  const n = (m) => parseFloat(m.replace(/[\s  ]/g, "").replace(",", "."));
  const V = [...t.matchAll(/(\d+(?:[,.]\d+)?)[\s  ]*(?:V(?![\p{L}])|volts?(?![\p{L}]))/gu)].map((m) => n(m[1]));
  const A = [...t.matchAll(/(\d+(?:[,.]\d+)?)[\s  ]*(?:A(?![\p{L}])|ampères?(?![\p{L}]))/gu)].map((m) => n(m[1]));
  const MIN = [...t.matchAll(/(\d+(?:[,.]\d+)?)[\s  ]*min(?:utes?)?(?![\p{L}])/gu)].map((m) => n(m[1]));
  const hors = [
    ...V.filter((x) => ![1.1, 2, 6, 12].includes(x)).map((x) => `${x} V`),
    ...A.filter((x) => ![0.1, 0.2, 0.4].includes(x)).map((x) => `${x} A`),
    // 0 : le chronomètre au départ (« t = 0 min »)
    ...MIN.filter((x) => ![0, 30, 45, 90].includes(x)).map((x) => `${x} min`),
  ];
  return { V: [...new Set(V)], A: [...new Set(A)], MIN: [...new Set(MIN)], hors };
}
async function frontiere(ou, q = panneau) {
  const t = await texteRendu(q);
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  const g = grilles(t);
  if (g.hors.length) vues.push(`nombres hors des grilles : ${[...new Set(g.hors)].join(", ")}`);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `AFFICHÉ : ${vues.join(" ; ")}` : `aucune des ${FORMES.length} formes interdites ; tensions {${g.V.join(" ; ")}} V, intensités {${g.A.join(" ; ")}} A, durées {${g.MIN.join(" ; ")}} min — dans les trois grilles`}`);
}
const latexBrut = () => panneau.evaluate((el) => (el.innerText.match(/\\(frac|dfrac|times|text|Delta|rightleftharpoons|mathcal)\b|\$[^$]{1,40}\$/g) ?? []));

/**
 * La formule graduée (spec §7.6 C), ÉTAPE par ÉTAPE : les formes INTERDITES de
 * l'étape courante, dans le texte du panneau (annotations TeX comprises), et
 * celles qu'elle doit employer. Une forme par sonde, dans les deux sens.
 */
const FORMES_GRADUEES = {
  masse: /(^|[^\p{L}])masses?(?![\p{L}])|(^|[^\p{L}])pèse/iu,
  produit: /I\s*\\,?\s*\\Delta\s*t|I\s*\\times\s*\\Delta|Q\s*=|(^|[^\p{L}])charges?(?![\p{L}])|coulombs?/iu,
  compte: /n\s*\(\s*e\s*\^|n\(e⁻\)|(^|[^\p{L}])mol(es?)?(?![\p{L}])/iu,
  // « constante » SEULE est le mot des énoncés (« courant d'intensité constante ») : la
  // porte cherche le NOM (premier passage : elle attrapait la consigne de S2)
  faraday: /faraday|\\mathcal\s*\{?F|9,65|9\{,\}65|C\s*[·./]\s*mol|constante\s+(de\s+faraday|universelle)/iu,
};
const INTERDIT = {
  "on-echange-les-fils": ["masse", "produit", "compte", "faraday"],
  "deux-fois-plus-longtemps": ["produit", "compte", "faraday"],
  "deux-fois-moins-de-courant": ["compte", "faraday"],
  "combien-d-electrons": ["faraday"],
  "on-double-la-tension": [],
};
async function formule(ou, id, emploie = []) {
  const t = await texteRendu();
  const fautes = [];
  for (const k of INTERDIT[id]) if (FORMES_GRADUEES[k].test(t)) fautes.push(`« ${k} » ÉCRIT trop tôt (${t.match(FORMES_GRADUEES[k])?.[0]?.trim()})`);
  for (const k of emploie) if (!FORMES_GRADUEES[k].test(t)) fautes.push(`« ${k} » ABSENT (l'étape l'emploie)`);
  juger("formule-graduee", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `aucune de [${INTERDIT[id].join(", ")}]${emploie.length ? `, et [${emploie.join(", ")}] employé` : ""}`}`);
}
/** La même table, sur TOUS les textes du descripteur (les retours qu'on n'a pas choisis ne passent pas à l'écran). */
{
  const fautes = [];
  for (const e of descripteur.etapes) {
    const textes = [e.consigne, e.pari?.question, ...(e.pari?.choix ?? []).flatMap((c) => [c.texte, c.retour])].filter(Boolean);
    for (const k of INTERDIT[e.id] ?? []) for (const x of textes) if (FORMES_GRADUEES[k].test(x)) fautes.push(`${e.id} : « ${k} » dans « ${x.slice(0, 50)}… »`);
  }
  juger("formule-graduee", fautes.length === 0, `les textes du descripteur (consignes, questions, choix, retours — ceux qu'aucun parcours n'affiche) : ${fautes.length ? fautes.slice(0, 3).join(" ; ") : "aucune forme avant son étape"}`);
}

/**
 * La convention de flèche (spec §9.17) : une formule qui porte une FLÈCHE est
 * une équation ; si elle contient e^-, c'est une demi-équation, à double
 * flèche ; sinon un bilan, à flèche simple. Lue sur les annotations KaTeX.
 */
async function flechesChimiques(ou) {
  const f = await panneau.evaluate((el) => [...el.querySelectorAll('annotation[encoding="application/x-tex"]')].map((a) => a.textContent ?? ""));
  const eqs = f.filter((x) => /\\rightleftharpoons|\\rightarrow|\\to\b|→|⇌/.test(x) && !/\\longrightarrow/.test(x));
  const fautes = eqs.filter((x) => (/e\^-|e\^\{-\}/.test(x) ? !/\\rightleftharpoons|⇌/.test(x) : /\\rightleftharpoons|⇌/.test(x)));
  return { n: eqs.length, demi: eqs.filter((x) => /e\^-|e\^\{-\}/.test(x)).length, fautes };
}

/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; sans fond, sur du blanc. */
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
    for (const a of textes) {
      if (!a.sansFond) continue;
      // les lectures posées DANS leur instrument (balances, « A ») : sur son fond blanc, jamais sur son trait
      const x0 = Math.max(0, Math.floor(a.x0 * dpr)), y0 = Math.max(0, Math.floor(a.y0 * dpr));
      const w = Math.min(cv.width - x0, Math.ceil((a.x1 - a.x0) * dpr)), h = Math.min(cv.height - y0, Math.ceil((a.y1 - a.y0) * dpr));
      a.encreDessous = 0;
      if (w <= 0 || h <= 0) continue;
      const d = g.getImageData(x0, y0, w, h).data;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) a.encreDessous++;
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
  }
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s)${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre, aucune sans fond posée sur un trait"}`);
  juger("cadre", encre === 0, `${ou} : ${encre} pixel(s) dessiné(s) sous la légende, qui les CACHE (attendu 0)`);
}
/** L'état posé par l'étape. */
async function etatPose(id, pAttendu) {
  const e = etapeDesc(id).etat;
  const lu = { u: await attr("data-u-v"), c: await attr("data-cablage"), i: await attr("data-i-ma"), d: await attr("data-duree-s"), p: await attr("data-p"), ph: await attr("data-pari") };
  const ok = lu.u === e.u_v && lu.c === e.cablage && lu.i === e.i_ma && lu.d === e.duree_s && lu.p === pAttendu && lu.ph === "attente";
  juger("etapes", ok, `étape ${id} : U = ${lu.u} V, ${lu.c}, I = ${lu.i} mA, Δt = ${lu.d} s, p = ${lu.p} (attendu ${pAttendu}), pari « ${lu.ph} »`);
}
async function engagePose(id) {
  const e = etapeDesc(id);
  const a = { ...e.etat, ...(e.etat_revele ?? {}) };
  const lu = { u: await attr("data-u-v"), c: await attr("data-cablage"), i: await attr("data-i-ma"), d: await attr("data-duree-s") };
  const ok = lu.u === a.u_v && lu.c === a.cablage && lu.i === a.i_ma && lu.d === a.duree_s;
  juger("etapes", ok, `étape ${id}, pari pris : l'engagement pose U = ${lu.u}, ${lu.c}, I = ${lu.i}, Δt = ${lu.d} (attendu ${a.u_v}, ${a.cablage}, ${a.i_ma}, ${a.duree_s}${e.etat_revele ? "" : " — aucun etat_revele, déclaré (spec §15.7)"})`);
}
async function revelePose(id) {
  const e = etapeDesc(id);
  const ctl = await controles();
  juger("etapes", ctl === [...e.controles].sort().join(",") && (await attr("data-pari")) === "revele", `étape ${id} révélée : contrôles [${ctl}] (attendu [${[...e.controles].sort().join(",")}])`);
}
async function juste(id, res) {
  juger("paris", /bonne réponse/i.test(res), `étape ${id}, pari juste, course finie : « ${res} »`);
}

/** Les pixels du circuit pour un câblage : l'aiguille, les deux flèches de chaque fil, le croisement, les rôles. */
async function circuitLu(ou, cablage) {
  await classer();
  const fautes = [];
  const oppose = cablage === "oppose";
  const ai = await aiguilleLue();
  const sensAttendu = oppose ? 1 : -1;
  if (!ai || ai.n < 4) fautes.push("aiguille INVISIBLE dans le cadran");
  else if (Math.sign(ai.dx) !== sensAttendu) fautes.push(`aiguille à ${ai.dx > 0 ? "DROITE" : "GAUCHE"} (attendu ${oppose ? "droite" : "gauche"})`);
  juger("aiguille", fautes.length === 0, `${ou} : aiguille lue sur ${ai?.n ?? 0} px, écart moyen au pivot ${virgule(ai?.dx ?? 0, 1)} px — ${fautes.length ? fautes.join(" ; ") : `du côté du sens (${oppose ? "imposé : à droite" : "spontané : à gauche"})`}`);
  // le courant sort par la borne + : fil de gauche vers la gauche en `oppose`, vers la droite en `accord` ; idem à droite
  const attenduI = oppose ? -1 : 1;
  const fi = [], fe = [];
  for (const cote of ["g", "d"]) {
    const i = await sensFleche(`i-${cote}-queue`, `i-${cote}-tete`), e = await sensFleche(`e-${cote}-queue`, `e-${cote}-tete`);
    if (!i) fi.push(`fil ${cote} : flèche du courant ILLISIBLE`);
    else if (i.sens !== attenduI) fi.push(`fil ${cote} : courant vers la ${i.sens > 0 ? "droite" : "gauche"} (attendu ${attenduI > 0 ? "droite" : "gauche"})`);
    if (!e || !i) fe.push(`fil ${cote} : flèche des électrons ILLISIBLE`);
    else if (e.sens !== -i.sens) fe.push(`fil ${cote} : électrons DANS LE SENS du courant`);
  }
  juger("courant-oriente", fi.length === 0, `${ou} : ${fi.length ? fi.join(" ; ") : `sur les deux fils, la pointe (lue aux pixels) va de la borne + vers sa lame, et de la lame vers la borne −`}`);
  juger("electrons-a-contresens", fe.length === 0, `${ou} : ${fe.length ? fe.join(" ; ") : "sur les deux fils, la pointe des électrons est à l'opposé de celle du courant"}`);
  // le croisement des fils : de l'encre au centre en `accord`, rien en `oppose`
  const x = await repere("croisement");
  const enc = x ? await panneau.evaluate((el, x) => { const { cls, w, dpr } = window.__cls; let n = 0; for (let dx = -2; dx <= 2; dx++) for (let dy = -2; dy <= 2; dy++) { const X = Math.round((x.x + dx) * dpr - 0.5), Y = Math.round((x.y + dy) * dpr - 0.5); if (cls[Y * w + X] === 2) n++; } return n; }, x) : -1;
  juger("fils-croises", oppose ? enc === 0 : enc > 0, `${ou} : ${enc} px d'encre au croisement (attendu ${oppose ? "0 : les fils descendent droit" : "> 0 : les fils se croisent"})`);
  // les rôles : « anode » près de la lame reliée à la borne + ; les lettres restent sur leur lame
  const lcu = await repere("lame-cu-mi"), lzn = await repere("lame-zn-mi");
  const rcu = await etiquette("nom-role-cu"), rzn = await etiquette("nom-role-zn");
  const ccu = await centreEtiquette("nom-role-cu"), czn = await centreEtiquette("nom-role-zn");
  const nomCu = await centreEtiquette("nom-cuivre"), nomZn = await centreEtiquette("nom-zinc");
  const pres = (c, l, autre) => c && l && autre && Math.abs(c.x - l.x) < Math.abs(c.x - autre.x);
  const fr = [];
  const anodeCu = rcu === "anode" && pres(ccu, lcu, lzn);
  const anodeZn = rzn === "anode" && pres(czn, lzn, lcu);
  if (oppose ? !anodeCu : !anodeZn) fr.push(`« anode » n'est pas sur la lame de la borne + (cuivre : « ${rcu} », zinc : « ${rzn} »)`);
  if ((oppose ? rzn : rcu) !== "cathode") fr.push(`« cathode » n'est pas sur la lame de la borne −`);
  if (!pres(nomCu, lcu, lzn) || !pres(nomZn, lzn, lcu)) fr.push("les lettres (A) et (B) ont QUITTÉ leur lame");
  juger("etiquettes-electrodes", fr.length === 0, `${ou} : ${fr.length ? fr.join(" ; ") : `« anode » sur la lame de la borne + (${oppose ? "cuivre (B)" : "zinc (A)"}), « cathode » sur l'autre, et « cuivre (B) » / « zinc (A) » à leur place`}`);
}

/** Une lame qui gagne s'épaissit ; une lame qui perd s'amincit — et la balance le dit du même signe. */
async function lamesEtBalances(ou, K) {
  await classer();
  const fautes = [];
  const lus = {};
  for (const [nom, bal] of [["cu", "nom-balance-cu"], ["zn", "nom-balance-zn"]]) {
    const l = await lameLue(nom);
    const t = await etiquette(bal);
    const m = parseFloat(t.replace("−", "-").replace(",", ".").replace(/[^\d.+-]/g, ""));
    lus[nom] = { l, m };
    if (!l || !Number.isFinite(m)) { fautes.push(`${nom} : ILLISIBLE`); continue; }
    // le GENRE se lit sur la colonne hors du bord d'origine (accent plein ou en tirets) ; au-delà
    // d'un pixel d'effet attendu, la MESURE doit aller dans le même sens
    const gagne = l.genre === "depot" && l.aminci < 0.5, perd = l.genre === "entaille" && l.depot === 0;
    if (m > 0 && !gagne) fautes.push(`${nom} : la balance dit ${t}, la lame ne s'épaissit pas (colonne : ${l.genre}, ${Math.round(l.cov * 100)} % d'accent ; amincie de ${virgule(l.aminci, 1)} px)`);
    if (m < 0 && !perd) fautes.push(`${nom} : la balance dit ${t}, la lame ne s'amincit pas (colonne : ${l.genre}, ${Math.round(l.cov * 100)} % d'accent ; dépôt ${virgule(l.depot, 1)} px)`);
  }
  const dit = (n) => `${lus[n].m > 0 ? "s'épaissit" : "s'amincit"} (${lus[n].l.genre === "depot" ? `dépôt plein, ${virgule(lus[n].l.depot, 1)} px` : `contour en tirets, amincie de ${virgule(lus[n].l.aminci, 1)} px`})`;
  juger("lame-et-balance", fautes.length === 0, `${ou} : ${fautes.length ? fautes.join(" ; ") : `cuivre ${await etiquette("nom-balance-cu")} ↔ ${dit("cu")} ; zinc ${await etiquette("nom-balance-zn")} ↔ ${dit("zn")}`}`);
  return lus;
}

try {
  // ═══ S1 — on échange les deux fils ═══
  await etatPose("on-echange-les-fils", "0.000");
  await avantPari("étape 1", { interdits: ["anode", "cathode", "oxydation", "se dissout"], premiere: true });
  await formule("étape 1, avant le pari", "on-echange-les-fils");
  await frontiere("étape 1, avant le pari");
  // le bain AU REPOS (lames neuves) : l'opacité de départ, la même aux deux bains
  const bainRepos = { cu: await pixel(await repere("bain-cu")), zn: await pixel(await repere("bain-zn")) };
  await parier(indexDe("on-echange-les-fils", "se-dissout-anode"));
  await engagePose("on-echange-les-fils");
  await engageSansCourse("étape 1");
  {
    const c = await laCourse();
    jugerCourse("étape 1 (30 min)", c, 1800);
    await juste("on-echange-les-fils", await resultat());
    await revelePose("on-echange-les-fils");
    const an = espaces(await panneau.locator("[data-annonce]").textContent().catch(() => ""));
    juger("annonce", /−0,122\s*g/.test(an) && /\+0,118\s*g/.test(an), `étape 1 révélée : la région vivante dit « ${an} » (attendu les deux pesées, −0,122 g et +0,118 g)`);
    const { accentN } = await classer();
    juger("avant-pari", accentN > 50, `étape 1 révélée : ${accentN} px d'accent (la réponse — aiguille, flèches, dépôt — apparaît avec l'accent)`);
    await circuitLu("étape 1 révélée (fils échangés)", "accord");
    await lamesEtBalances("étape 1 révélée (fils échangés)");
    const lu = { sens: await lecture("sens"), i: await lecture("intensite"), d: await lecture("duree"), fem: await lecture("fem") };
    juger("nombres", lu.sens === SENS.accord && lu.i === "0,200 A" && lu.d === DUREE[1800] && lu.fem === "environ 1,1 V", `N7 (étape 1) — sens « ${lu.sens} », I « ${lu.i} », Δt « ${lu.d} », E « ${lu.fem} »`);
    await cocher("branchement", "oppose");
    await circuitLu("étape 1, fils rétablis", "oppose");
    juger("nombres", (await lecture("sens")) === SENS.oppose, `N7 (étape 1, fils rétablis) — sens « ${await lecture("sens")} »`);
  }
  await formule("étape 1 révélée", "on-echange-les-fils");
  {
    // le retour juste de S1 écrit l'oxydation du zinc : une demi-équation, donc une double flèche
    const f = await flechesChimiques("étape 1");
    juger("fleches-chimiques", f.fautes.length === 0 && f.demi >= 1, `étape 1 révélée : ${f.n} équation(s), dont ${f.demi} demi-équation(s) ; ${f.fautes.length ? `FLÈCHE FAUSSE : ${f.fautes.join(" | ")}` : "la convention tenue"}`);
  }
  await frontiere("étape 1 révélée");
  await etiquettesLisibles("étape 1 révélée");
  await suivant();

  // ═══ S2 — deux fois plus longtemps ═══
  await etatPose("deux-fois-plus-longtemps", "1.000");
  await avantPari("étape 2", { interdits: ["double", "0,366", "proportionnel"], balanceZn: "+0,183 g" });
  await formule("étape 2, avant le pari", "deux-fois-plus-longtemps", ["masse"]);
  await parier(indexDe("deux-fois-plus-longtemps", "double"));
  await engagePose("deux-fois-plus-longtemps");
  await engageSansCourse("étape 2");
  {
    const c = await laCourse();
    jugerCourse("étape 2 (1 h 30)", c, 5400);
    await juste("deux-fois-plus-longtemps", await resultat());
    await revelePose("deux-fois-plus-longtemps");
    const fautes = [];
    for (const d of DUREES) {
      await cocher("duree", String(d));
      const a = attendu(200, d);
      const m = await lecture("masse-zinc");
      if (m !== masse(a.zn)) fautes.push(`${d} s : « ${m} » (attendu ${masse(a.zn)})`);
    }
    juger("nombres", fautes.length === 0, `N2 (étape 2) — 0,200 A, trois durées : ${fautes.length ? fautes.join(" ; ") : "+0,122 · +0,183 · +0,366 g"}`);
    // les éclairs, pendant une course entière (WCAG 2.3.1 : attendu structurellement vide, mesuré quand même)
    const ecl = await panneau.evaluate(async (el) => {
      const cv = el.querySelector("canvas");
      const W = Math.ceil(cv.width / 4), H = Math.ceil(cv.height / 4);
      const t = document.createElement("canvas"); t.width = W; t.height = H;
      const gt = t.getContext("2d", { willReadFrequently: true });
      const ext = new Float32Array(W * H).fill(-1), sens = new Int8Array(W * H), chg = new Uint16Array(W * H);
      el.querySelector("[data-lancer]").click();
      const t0 = performance.now();
      for (;;) {
        await new Promise((r) => requestAnimationFrame(r));
        gt.clearRect(0, 0, W, H); gt.drawImage(cv, 0, 0, W, H);
        const d = gt.getImageData(0, 0, W, H).data;
        for (let k = 0; k < W * H; k++) {
          const L = (0.2126 * d[4 * k] + 0.7152 * d[4 * k + 1] + 0.0722 * d[4 * k + 2]) / 255;
          if (ext[k] < 0) { ext[k] = L; continue; }
          const dl = L - ext[k];
          if (Math.abs(dl) >= 0.1 && Math.sign(dl) !== sens[k]) { chg[k]++; sens[k] = Math.sign(dl); ext[k] = L; }
          else if ((sens[k] > 0 && L > ext[k]) || (sens[k] < 0 && L < ext[k])) ext[k] = L;
        }
        if (el.getAttribute("data-course") === "finie" || performance.now() - t0 > 30000) break;
      }
      const s = (performance.now() - t0) / 1000;
      let pire = 0;
      for (let k = 0; k < W * H; k++) pire = Math.max(pire, Math.floor(chg[k] / 2) / s);
      return { s: Math.round(s * 10) / 10, pire: Math.round(pire * 10) / 10 };
    });
    juger("eclairs", ecl.pire < 3, `une course de ${virgule(ecl.s, 1)} s (1 h 30, 0,200 A) : ${virgule(ecl.pire, 1)} éclair(s) par seconde au pire (seuil WCAG 2.3.1 : 3)`);
  }
  await formule("étape 2 révélée", "deux-fois-plus-longtemps", ["masse"]);
  await etiquettesLisibles("étape 2 révélée");
  await suivant();

  // ═══ S3 — deux fois moins de courant ═══
  await etatPose("deux-fois-moins-de-courant", "1.000");
  await avantPari("étape 3", { interdits: ["moitié", "0,183", "produit", "coulomb"], balanceZn: "+0,366 g" });
  await formule("étape 3, avant le pari", "deux-fois-moins-de-courant");
  await parier(indexDe("deux-fois-moins-de-courant", "moitie"));
  await engagePose("deux-fois-moins-de-courant");
  {
    const c = await laCourse();
    jugerCourse("étape 3 (1 h 30, 0,100 A)", c, 5400);
    await juste("deux-fois-moins-de-courant", await resultat());
    await revelePose("deux-fois-moins-de-courant");
    // N4 : l'invariant du produit, AU CARACTÈRE PRÈS
    const pair = async (i, d) => { await cocher("courant", String(i)); await cocher("duree", String(d)); return `${await lecture("charge")} / ${await lecture("masse-zinc")}`; };
    const a1 = await pair(100, 5400), a2 = await pair(200, 2700), b1 = await pair(200, 5400), b2 = await pair(400, 2700);
    juger("nombres", a1 === a2 && b1 === b2 && a1 === "540 C / +0,183 g" && b1 === "1 080 C / +0,366 g", `N4 — (0,100 A ; 1 h 30) « ${a1} » = (0,200 A ; 45 min) « ${a2} » ; (0,200 A ; 1 h 30) « ${b1} » = (0,400 A ; 45 min) « ${b2} »`);
    juger("fuite-inter-etapes", (await panneau.locator('[data-lecture="quantite-electrons"], [data-lecture="faraday-mesure"]').count()) === 0, `étape 3 révélée, les 9 couples atteignables : ni « quantite-electrons » ni « faraday-mesure » dans le DOM`);
  }
  await formule("étape 3 révélée", "deux-fois-moins-de-courant", ["produit"]);
  await etiquettesLisibles("étape 3 révélée");
  await suivant();

  // ═══ S4 — combien de moles d'électrons ? ═══
  await etatPose("combien-d-electrons", "1.000");
  await avantPari("étape 4", { interdits: ["deux électrons par atome", "2,239", "multipli"], balanceZn: "+0,732 g" });
  await formule("étape 4, avant le pari", "combien-d-electrons");
  {
    const f = await flechesChimiques("étape 4");
    juger("fleches-chimiques", f.fautes.length === 0 && f.demi >= 1, `étape 4, avant le pari : ${f.n} équation(s) écrite(s), dont ${f.demi} demi-équation(s) ; ${f.fautes.length ? `FLÈCHE FAUSSE : ${f.fautes.join(" | ")}` : "toute demi-équation (e⁻) à double flèche, tout bilan à flèche simple"}`);
  }
  await parier(indexDe("combien-d-electrons", "deux-par-atome"));
  await engagePose("combien-d-electrons");
  await engageSansCourse("étape 4");
  {
    const c = await laCourse();
    jugerCourse("étape 4 (1 h 30, 0,400 A)", c, 5400);
    await juste("combien-d-electrons", await resultat());
    await revelePose("combien-d-electrons");
    const n = await lecture("quantite-electrons"), mc = await lecture("masse-cuivre"), q = await lecture("charge");
    juger("nombres", n === `${sci(attendu(400, 5400).n, 4)} mol` && mc === "−0,711 g" && q === "2 160 C", `N5 (étape 4) — n(e⁻) « ${n} », cuivre « ${mc} », Q « ${q} »`);
    juger("fuite-inter-etapes", (await panneau.locator('[data-lecture="faraday-mesure"]').count()) === 0 && !(await panneau.locator('[data-controle="tension"]').count()), `étape 4 révélée : « faraday-mesure » absente du DOM, la tension non réglable`);
  }
  await formule("étape 4 révélée", "combien-d-electrons", ["compte"]);
  await etiquettesLisibles("étape 4 révélée");
  await suivant();

  // ═══ S5 — on double la tension ═══
  await etatPose("on-double-la-tension", "1.000");
  await avantPari("étape 5", { interdits: ["9,65", "Faraday", "constante", "universelle", "ne bouge pas"], balanceZn: "+0,732 g" });
  await parier(indexDe("on-double-la-tension", "rien-ne-bouge"));
  await engagePose("on-double-la-tension");
  await engageSansCourse("étape 5");
  {
    const c = await laCourse();
    jugerCourse("étape 5 (12,0 V, 1 h 30, 0,400 A)", c, 5400);
    await juste("on-double-la-tension", await resultat());
    await revelePose("on-double-la-tension");
  }
  await formule("étape 5 révélée", "on-double-la-tension", ["faraday"]);
  {
    // N1–N12 : les 27 états (3 tensions × 3 intensités × 3 durées), puis l'échange des fils
    const fN = [], fN8 = [], fN12 = [], fN6 = [], fPix = [], fEch = [], fAig = [];
    const K = [];
    let septieme = null;
    await cocher("branchement", "oppose");
    for (const i of INTENSITES) {
      await cocher("courant", String(i));
      for (const d of DUREES) {
        await cocher("duree", String(d));
        const a = attendu(i, d);
        const parTension = [];
        for (const u of TENSIONS) {
          await cocher("tension", u);
          const lu = { q: await lecture("charge"), zn: await lecture("masse-zinc"), cu: await lecture("masse-cuivre"), n: await lecture("quantite-electrons"), f: await lecture("faraday-mesure"), i: await lecture("intensite"), s: await lecture("sens") };
          const at = { q: `${milliers(a.Q)} C`, zn: masse(a.zn), cu: masse(a.cu), n: `${sci(a.n, 4)} mol`, f: `${sci(a.f, 3)} C·mol⁻¹`, i: `${virgule(i / 1000, 3)} A`, s: SENS.oppose };
          for (const k of ["q", "zn", "cu", "n", "f", "s"]) if (lu[k] !== at[k]) fN.push(`${i} mA · ${d} s · ${u} V : ${k} « ${lu[k]} » (attendu « ${at[k]} »)`);
          if (lu.i !== at.i) fN8.push(`${u} V, ${i} mA : l'ampèremètre lit « ${lu.i} »`);
          parTension.push(`${lu.q} | ${lu.zn} | ${lu.f}`);
          if (i === 100 && d === 2700) septieme = lu.f;
          // les pixels : l'aiguille et le dépôt, les mêmes aux trois tensions
          await classer();
          const ai = await aiguilleLue();
          const k = await pxParGramme();
          if (k) K.push(k);
          const zn = await lameLue("zn"), cu = await lameLue("cu");
          fAig.push({ cle: `${i}·${d}`, u, dx: ai?.dx ?? NaN });
          if (k && zn && cu) {
            const tZn = Math.abs(a.zn) * k, tCu = Math.abs(a.cu) * k;
            if (Math.abs(zn.depot - tZn) > 1.5) fPix.push(`${i}·${d}·${u} V : dépôt du zinc ${virgule(zn.depot, 1)} px pour ${virgule(tZn, 1)} (masse affichée × ${virgule(k, 2)} px/g)`);
            if (Math.abs(cu.aminci - tCu) > 1.5) fPix.push(`${i}·${d}·${u} V : cuivre aminci de ${virgule(cu.aminci, 1)} px pour ${virgule(tCu, 1)}`);
            fEch.push({ cle: `${i}·${d}`, u, zn: zn.depot });
          } else fPix.push(`${i}·${d}·${u} V : lame ou témoin ILLISIBLE`);
        }
        if (new Set(parTension).size !== 1) fN12.push(`${i} mA · ${d} s : ${[...new Set(parTension)].join(" ≠ ")}`);
      }
    }
    juger("nombres", fN.length === 0, `N1 · N2 · N3 · N5 · N6 · N7 — les 27 états, lus contre la cascade de la spec (valeurs AFFICHÉES) : ${fN.length ? fN.slice(0, 4).join(" ; ") : "Q, les deux masses, n(e⁻), le quotient et le sens exacts, à la chaîne près"}`);
    juger("nombres", fN8.length === 0, `N8 — l'ampèremètre aux 27 états : ${fN8.length ? fN8.slice(0, 3).join(" ; ") : "la valeur réglée, identique aux trois tensions (aucune loi I(U))"}`);
    juger("nombres", fN12.length === 0, `N12 — LA DÉMONSTRATION : aux 9 couples (I ; Δt), charge, masse et quotient identiques AU CARACTÈRE PRÈS aux trois tensions (27 états, 9 jeux de valeurs)${fN12.length ? ` — FAUX : ${fN12.slice(0, 2).join(" ; ")}` : ""}`);
    juger("nombres", septieme === "9{,}70\\times10^{4} C·mol⁻¹", `N6 — le septième réglage (0,100 A ; 45 min, le plus petit dépôt) : « ${septieme} » (attendu 9,70·10⁴ : l'écart de pesée DOIT se produire)`);
    juger("depot-a-l-echelle", fPix.length === 0, `les 27 états : l'épaisseur du dépôt du zinc et l'amincissement du cuivre, lus aux pixels, valent la masse AFFICHÉE × le facteur lu sur le témoin, à 1,5 px${fPix.length ? ` — FAUX : ${fPix.slice(0, 3).join(" ; ")}` : ""}`);
    const etale = K.length ? (Math.max(...K) - Math.min(...K)) / Math.min(...K) : Infinity;
    const parCle = new Map();
    for (const e of fEch) { if (!parCle.has(e.cle)) parCle.set(e.cle, []); parCle.get(e.cle).push(e.zn); }
    const fTension = [...parCle].filter(([, t]) => Math.max(...t) - Math.min(...t) > 0.6).map(([c, t]) => `${c} : ${t.map((x) => virgule(x, 1)).join(" / ")} px`);
    juger("echelle-constante", K.length === 27 && etale <= 0.01 && fTension.length === 0, `le témoin « 1 g » aux 27 états : ${K.length ? `${virgule(Math.min(...K), 2)} à ${virgule(Math.max(...K), 2)} px` : "ILLISIBLE"} (constant à 1 %) ; le dépôt, le même aux trois tensions${fTension.length ? ` — il CHANGE avec la tension : ${fTension.slice(0, 2).join(" ; ")}` : ""}`);
    const aig = new Map();
    for (const e of fAig) { if (!aig.has(e.cle)) aig.set(e.cle, []); aig.get(e.cle).push(e.dx); }
    const fA = [...aig].filter(([, t]) => !t.every(Number.isFinite) || Math.max(...t) - Math.min(...t) > 1).map(([c, t]) => `${c} : ${t.map((x) => virgule(x, 1)).join(" / ")}`);
    const croit = [aig.get("100·5400"), aig.get("200·5400"), aig.get("400·5400")].map((t) => t?.[0] ?? NaN);
    juger("aiguille", fA.length === 0 && croit[0] < croit[1] && croit[1] < croit[2], `l'aiguille aux 27 états : la MÊME position aux trois tensions (à 1 px)${fA.length ? ` — elle BOUGE : ${fA.slice(0, 2).join(" ; ")}` : ""} ; elle dévie plus à 0,100 < 0,200 < 0,400 A (${croit.map((x) => virgule(x, 1)).join(" < ")} px)`);
    // N9 : l'échange des fils — les masses changent de signe, le quotient ne bouge pas d'un caractère
    const fN9 = [];
    await cocher("tension", "6.0");
    for (const i of INTENSITES)
      for (const d of DUREES) {
        await cocher("courant", String(i)); await cocher("duree", String(d));
        await cocher("branchement", "oppose");
        const o = { zn: await lecture("masse-zinc"), f: await lecture("faraday-mesure") };
        await cocher("branchement", "accord");
        const ac = { zn: await lecture("masse-zinc"), f: await lecture("faraday-mesure"), s: await lecture("sens") };
        const a = attendu(i, d, "accord");
        if (ac.f !== o.f || ac.zn !== masse(a.zn) || ac.s !== SENS.accord) fN9.push(`${i}·${d} : « ${o.zn} » → « ${ac.zn} », quotient « ${o.f} » → « ${ac.f} », sens « ${ac.s} »`);
      }
    juger("nombres", fN9.length === 0, `N9 — les 9 couples, fils échangés : ${fN9.length ? fN9.slice(0, 3).join(" ; ") : "les masses changent de signe, le quotient ne bouge pas d'un caractère, le sens devient spontané"}`);
    // les pixels du circuit et des lames, fils échangés puis rétablis (0,400 A ; 1 h 30)
    await cocher("courant", "400"); await cocher("duree", "5400");
    await cocher("branchement", "accord");
    await circuitLu("étape 5, fils échangés", "accord");
    await lamesEtBalances("étape 5, fils échangés");
    const bainAccord = { cu: await pixel(await repere("bain-cu")), zn: await pixel(await repere("bain-zn")) };
    await cocher("branchement", "oppose");
    await circuitLu("étape 5", "oppose");
    await lamesEtBalances("étape 5");
    const bainOppose = { cu: await pixel(await repere("bain-cu")), zn: await pixel(await repere("bain-zn")) };
    // teinte-du-bain : l'OPACITÉ d'un seul jeton — chaque pixel du bain sur le segment fond → encre douce
    const surf = await jetonCouleur("--figure-surface"), douce = await jetonCouleur("--figure-ink-soft");
    const alpha = (c) => { const num = [0, 1, 2].reduce((s, k) => s + (surf[k] - c[k]) * (surf[k] - douce[k]), 0); const den = [0, 1, 2].reduce((s, k) => s + (surf[k] - douce[k]) ** 2, 0); const a = num / den; const res = Math.max(...[0, 1, 2].map((k) => Math.abs(c[k] - (surf[k] + a * (douce[k] - surf[k]))))); return { a, res }; };
    const A = { r: alpha(bainRepos.cu), rz: alpha(bainRepos.zn), oc: alpha(bainOppose.cu), oz: alpha(bainOppose.zn), ac: alpha(bainAccord.cu), az: alpha(bainAccord.zn) };
    const res = Math.max(...Object.values(A).map((x) => x.res));
    const sens = A.oc.a > A.r.a + 0.03 && A.oz.a < A.rz.a - 0.03 && A.ac.a < A.r.a - 0.03 && A.az.a > A.rz.a + 0.03;
    juger("teinte-du-bain", res <= 3 && sens, `opacité du bain (fraction d'encre douce) — au repos cuivre ${virgule(A.r.a, 2)}, zinc ${virgule(A.rz.a, 2)} ; fils de la leçon : cuivre ${virgule(A.oc.a, 2)} ↑, zinc ${virgule(A.oz.a, 2)} ↓ ; échangés : cuivre ${virgule(A.ac.a, 2)} ↓, zinc ${virgule(A.az.a, 2)} ↑ ; écart au segment fond → encre douce ${virgule(res, 1)} (la teinte ne vire pas : ≤ 3)`);
    // N10 : les crans
    const n = async (c) => panneau.locator(`[data-controle="${c}"] input`).count();
    const crans = [await n("tension"), await n("branchement"), await n("courant"), await n("duree")];
    juger("nombres", crans.join(",") === "3,2,3,3", `N10 — crans : ${crans[0]} tensions, ${crans[1]} branchements, ${crans[2]} intensités, ${crans[3]} durées (attendu 3, 2, 3, 3)`);
    const lt = await lecture("tension");
    juger("nombres", lt === "6,0 V", `la lecture de la tension, S5 seulement : « ${lt} »`);
  }
  {
    const { horsPalette } = await classer();
    juger("palette", horsPalette === 0, `étape 5 : ${horsPalette} pixel(s) teintés hors de la palette (attendu 0)`);
    const empreinte = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(0, 0, cv.width, cv.height).data; let h = 0; for (let i = 0; i < d.length; i += 97) h = (h * 31 + d[i]) >>> 0; return h; });
    const e0 = await empreinte();
    await page.waitForTimeout(1200);
    const e1 = await empreinte();
    juger("immobile", e0 === e1, `au repos, 1,2 s : l'image ${e0 === e1 ? "n'a pas changé" : "A CHANGÉ sans réglage"}`);
    const f = await flechesChimiques("étape 5");
    juger("fleches-chimiques", f.fautes.length === 0, `étape 5 révélée : ${f.n} équation(s), ${f.demi} demi-équation(s) ; ${f.fautes.length ? `FLÈCHE FAUSSE : ${f.fautes.join(" | ")}` : "la convention tenue"}`);
  }
  await frontiere("étape 5 révélée");
  await etiquettesLisibles("étape 5 révélée");
  juger("latex", (await latexBrut()).length === 0, `étape 5 révélée : ${(await latexBrut()).length} fragment(s) de LaTeX brut`);
} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
}

// ── La table des étapes, réécrite ICI contre le descripteur (spec §7.6 A) ──
{
  const attenduCtl = {
    "on-echange-les-fils": "branchement",
    "deux-fois-plus-longtemps": "duree",
    // la durée est HÉRITÉE de S2, et c'est déclaré (spec §5.6) : elle seule permet de voir, à
    // l'étape même, que c'est le PRODUIT qui compte ; aucune lecture de S4 ou S5 n'y existe
    "deux-fois-moins-de-courant": "courant,duree",
    "combien-d-electrons": "courant,duree",
    "on-double-la-tension": "branchement,courant,duree,tension",
  };
  const lecturesInterdites = { "on-echange-les-fils": ["quantite-electrons", "faraday-mesure", "charge", "masse-zinc", "masse-cuivre", "tension"], "deux-fois-plus-longtemps": ["quantite-electrons", "faraday-mesure", "charge", "tension"], "deux-fois-moins-de-courant": ["quantite-electrons", "faraday-mesure", "tension"], "combien-d-electrons": ["faraday-mesure", "tension"], "on-double-la-tension": [] };
  const fautes = [];
  for (const e of descripteur.etapes) {
    if ([...e.controles].sort().join(",") !== attenduCtl[e.id]) fautes.push(`${e.id} ouvre [${e.controles.join(",")}]`);
    for (const l of lecturesInterdites[e.id] ?? []) if ((e.lectures ?? []).includes(l)) fautes.push(`${e.id} lit « ${l} »`);
  }
  juger("fuite-inter-etapes", fautes.length === 0, `table du §7.6 A : ${fautes.length ? fautes.join(" ; ") : "branchement à S1 et S5, durée de S2 à S5 (héritée à S3, déclaré), courant de S3 à S5, tension à S5 seulement ; n(e⁻) pas avant S4, le quotient pas avant S5"}`);
}

// Le thème sombre repeint le fond.
if (pret) {
  const fond = () => panneau.evaluate((el) => { const cv = el.querySelector("canvas"); const d = cv.getContext("2d").getImageData(cv.width - 3, cv.height - 3, 1, 1).data; return [d[0], d[1], d[2]]; });
  const pres = (u, v) => u.every((k, i) => Math.abs(k - v[i]) <= 6);
  const clair = await fond(), jc = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.add("dark")); await deuxImages(); await page.waitForTimeout(150);
  const sombre = await fond(), js = await jetonCouleur("--figure-surface");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  juger("theme", pres(clair, jc) && pres(sombre, js) && !pres(clair, sombre), `fond clair ${clair} (jeton ${jc}) ; sombre ${sombre} (jeton ${js})`);
}

// ── La frontière sait-elle rougir, FORME PAR FORME ? (essai rouge seulement) ──
if (ESSAI && pret) {
  const muettes = [];
  const exemples = [...FORMES.map(([n, , x]) => [n, x]), ["tension hors grille", "3,0 V"], ["intensité hors grille", "0,500 A"], ["durée hors grille", "20 min"]];
  for (const [nom, exemple] of exemples) {
    await panneau.evaluate((el, x) => { const s = document.createElement("span"); s.setAttribute("data-sonde", ""); s.textContent = ` ${x} `; el.querySelector("[data-lectures], [data-notes]")?.appendChild(s); }, exemple);
    const t = await texteRendu();
    const vue = FORMES.some(([n, re]) => n === nom && re.test(t)) || (nom.endsWith("hors grille") && grilles(t).hors.length > 0);
    if (!vue) muettes.push(nom);
    await panneau.evaluate((el) => el.querySelectorAll("[data-sonde]").forEach((s) => s.remove()));
  }
  noter("frontiere-sondes", muettes.length === 0, `${exemples.length} formes injectées une à une dans le panneau : ${muettes.length ? `MUETTES : ${muettes.join(", ")}` : "chacune vue par sa sonde"}`);
  // la formule graduée : chaque forme, injectée, est-elle vue par sa sonde ?
  const mG = [];
  for (const [k, x] of [["masse", "la masse"], ["produit", "$Q = I\\,\\Delta t$"], ["compte", "n(e^-)"], ["faraday", "constante de Faraday"]]) if (!FORMES_GRADUEES[k].test(` ${x} `)) mG.push(k);
  noter("frontiere-sondes", mG.length === 0, `les quatre formes de la formule graduée : ${mG.length ? `MUETTES : ${mG.join(", ")}` : "chacune vue par sa sonde"}`);
}
noter("console", erreurs.length === 0, erreurs.length ? erreurs.slice(0, 3).join(" | ") : "aucune erreur");
await nav.close();

// ── Sans mouvement (prefers-reduced-motion) : la course CALCULE sans animer ──
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
    await p3.waitForTimeout(150);
    const vus = await q.evaluate(async (el) => {
      const ps = new Set();
      el.querySelector("[data-lancer]").click();
      const t0 = performance.now();
      while (performance.now() - t0 < 1500) {
        await new Promise((r) => requestAnimationFrame(r));
        ps.add(el.getAttribute("data-p"));
        if (el.getAttribute("data-course") === "finie" && performance.now() - t0 > 400) break;
      }
      return { ps: [...ps], finie: el.getAttribute("data-course") === "finie" };
    });
    const intermediaires = vus.ps.filter((p) => p !== "0.000" && p !== "1.000");
    juger("sans-mouvement", vus.finie && intermediaires.length === 0, `mouvement réduit demandé : manipulation ${vus.finie ? "finie" : "PAS finie"} en moins de 1,5 s ; états vus [${vus.ps.join(", ")}] — ${intermediaires.length ? "des états INTERMÉDIAIRES" : "aucun état intermédiaire"}`);
  } finally {
    await nav3.close();
  }
}

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
    const justes = ["se-dissout-anode", "double", "moitie", "deux-par-atome", "rien-ne-bouge"];
    for (let k = 0; k < 5; k++) {
      const e = descripteur.etapes[k];
      await etiquettesLisibles(`390 px, étape ${k + 1}, avant le pari`, q);
      await q.locator("[data-pari-choix] li button").nth(e.pari.choix.findIndex((c) => c.id === justes[k])).click();
      await p2.waitForTimeout(150);
      await q.locator("[data-image-finale]").click();
      await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 10000 }).catch(() => {});
      await p2.waitForTimeout(250);
      await etiquettesLisibles(`390 px, étape ${k + 1} révélée`, q);
      if (k === 0) {
        await q.locator('[data-controle="branchement"] input[value="oppose"]').check();
        await p2.waitForTimeout(150);
        await etiquettesLisibles("390 px, étape 1, fils rétablis", q);
      }
      if (k < 4) { await q.getByRole("button", { name: "Étape suivante" }).click(); await p2.waitForTimeout(200); }
    }
    await frontiere("390 px, étape 5 révélée", q);
  } finally {
    await nav2.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune ; la course de l'étape 1) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR, course: 0 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-electrolyse : le banc d'électrolyse (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "course", "eclairs", "sans-mouvement", "nombres", "depot-a-l-echelle", "echelle-constante", "aiguille", "courant-oriente", "electrons-a-contresens", "fils-croises", "etiquettes-electrodes", "lame-et-balance", "teinte-du-bain", "palette", "formule-graduee", "fuite-inter-etapes", "frontiere", "fleches-chimiques", "latex", "etiquettes", "cadre", "immobile", "annonce", "theme", "ergonomie"];
  const crient = visees.filter((f) => resultats.some((r) => r.famille === f && !r.ok));
  console.log(`\n  familles sabotées qui crient : ${crient.length}/${visees.length} (${crient.join(", ")})`);
  const muettes = visees.filter((f) => !crient.includes(f));
  const sondes = resultats.filter((r) => r.famille === "frontiere-sondes" && !r.ok);
  if (sondes.length) { for (const s of sondes) console.error(`  ✘ ${s.detail}`); process.exit(1); }
  if (muettes.length) { console.error(`  ✘ reste(nt) VERTE(S) : ${muettes.join(", ")} — cette partie de la porte ne sait pas rougir.`); process.exit(1); }
  console.log("  ✔ chaque famille sabotée rougit ; chaque forme de la frontière est vue.");
  process.exit(0);
}
const rouges = resultats.filter((r) => !r.ok);
const familles = new Set(resultats.map((r) => r.famille)).size;
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\nVERT — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
