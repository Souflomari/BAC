/**
 * scene-noyaux.mjs — la porte de « la courbe et les noyaux »
 * (pc/decroissance-radioactive, en tête de R4 ; spec
 * content/pc/decroissance-radioactive/spec-scene-noyaux.md §11).
 *
 * Elle lit le RENDU réel (`next start` + Chromium), jamais le code du produit,
 * et trouve son panneau par `[data-scene="courbe-et-noyaux"]` seul.
 *
 * DEUX VOIES, DEUX EXIGENCES (spec §5.3). La COURBE est la loi en forme
 * fermée : la seconde voie ci-dessous, écrite depuis la SPEC (N0, t½ ∈ {8 ; 4},
 * ln 2), sans importer un module du produit, refait les MÊMES nombres —
 * exactement (règle de la corde). La GRILLE est un tirage : la porte n'en
 * vérifie que des INVARIANTS, avec des bandes larges (règle de la cuve) — et
 * elle a le droit de mesurer en écarts-types ce que le produit n'a pas le droit
 * d'enseigner (spec §5.6 : ce que la porte mesure ne devient pas du contenu).
 *
 * CE QU'ELLE NE PEUT PAS VOIR EN COMPTANT, ET QU'ELLE GARDE AUTREMENT (spec
 * §11.1, N8) : une probabilité par pas biaisée de 1 % (λΔt au lieu de
 * 1 − e^(−λΔt)) décale la survie à une demi-vie de 0,24 écart-type sur 1 024
 * noyaux. Aucun comptage ne le distingue du bruit : la porte LIT la probabilité
 * exposée (`data-p-pas`) et la recalcule. (Et le test unitaire test-noyaux garde
 * le modèle lui-même.)
 *
 *   node scripts/scene-noyaux.mjs --porte        (lève son propre next start)
 *   node scripts/scene-noyaux.mjs --essai-rouge  (chaque famille doit crier ; et
 *                                                 chaque forme de la frontière,
 *                                                 injectée une à une, doit être vue)
 */
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_NOYAUX ?? 3800 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const LECON = "/notions/pc/decroissance-radioactive";
const SCENE = "courbe-et-noyaux";
const OUVRIR = "Ouvrir la courbe et les noyaux";

// ── La seconde voie : les constantes de la SPEC, rien du produit ──────────
// L'essai rouge RETOURNE les attentes (`juger`) ; il ne fausse PAS aussi les
// constantes (leçon de la corde : deux inversions s'annulent).
const N0 = 4.0e14;
const TH = { 8: 8.0, 4: 4.0 };
const DT = 0.25;
const noyaux = (iso, t) => N0 * Math.pow(2, -t / TH[iso]);
const lambdaJ = (iso) => Math.LN2 / TH[iso];
const activite = (iso, t) => (lambdaJ(iso) / 86400) * noyaux(iso, t);
const virgule = (x, d) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace(".", ",").replace("-", "−");
const EXP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
/** « 2,59×10¹⁴ » — écrit ICI, sans le code du produit. */
function sci(x, cs = 3) {
  let e = Math.floor(Math.log10(Math.abs(x)));
  let m = (x / 10 ** e).toFixed(cs - 1);
  if (parseFloat(m) >= 10) { e += 1; m = (x / 10 ** e).toFixed(cs - 1); }
  return `${m.replace(".", ",")}×10${String(e).split("").map((c) => EXP[c]).join("")}`;
}
const troisCs = (x) => virgule(x, Math.max(0, 2 - Math.floor(Math.log10(Math.abs(x)))));

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("scene-noyaux : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
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

const descripteur = JSON.parse(readFileSync(new URL("../../content/pc/decroissance-radioactive/media/courbe-et-noyaux.json", import.meta.url), "utf-8"));
const etapeDesc = (id) => descripteur.etapes.find((e) => e.id === id);
const indexDe = (id, choix) => etapeDesc(id).pari.choix.findIndex((c) => c.id === choix);

// ── Aller au panneau ──
await page.goto(BASE + LECON, { waitUntil: "load", timeout: 60000 });
await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
const chapitre = await page.evaluate((sc) => {
  const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
  return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
}, SCENE);
if (!chapitre) { console.error(`scene-noyaux : aucune scène ${SCENE} dans la leçon — rien à mesurer (MUET).`); await nav.close(); process.exit(3); }
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
/** La valeur écrite à côté d'un curseur (« t = 5,0 jours ») : l'instant et le départ ne sont plus des lectures, ils sont là. */
const valeurCurseur = async (c) => { const l = panneau.locator(`[data-controle="${c}"] span span`); return (await l.count()) ? espaces(await l.first().textContent().catch(() => "")) : ""; };
const etiquetteTexte = async (nom) =>
  espaces((await panneau.evaluate((el, n) => { const e = el.querySelector(`[data-etiquette="${n}"]`); return e && getComputedStyle(e).visibility === "visible" ? e.innerText ?? "" : ""; }, nom).catch(() => "")) ?? "");
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
  await page.waitForTimeout(30);
}
const cocher = async (sel, v) => { await panneau.locator(`${sel} input[value="${v}"]`).check(); await deuxImages(); await page.waitForTimeout(40); };
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
/**
 * La largeur du crochet, lue aux pixels : ses deux pointes sont des traits
 * VERTICAUX (± 7 px autour de la cote), lus 6 px au-dessus et 6 px au-dessous. Une courbe
 * en accent qui traverse ces rangées (le second isotope, à l'étape libre) n'y
 * est pas à la même abscisse — premier passage : lue comme une pointe, elle
 * donnait 69 px pour 54.
 */
async function largeurCrochet(g) {
  const cg = await repere("crochet-g");
  if (!cg || !g) return NaN;
  const haut = await etendueAccent("rangee", cg.y - 6, g.x0 - 2, g.x1 + 4), bas = await etendueAccent("rangee", cg.y + 6, g.x0 - 2, g.x1 + 4);
  if (!haut || !bas) return NaN;
  const centres = (e) => e.runs.map((r) => (r.de + r.a) / 2);
  // la pointe DROITE : présente aux deux rangées, à la même abscisse ;
  // la pointe GAUCHE : la première plage de la rangée du DESSOUS — au-dessus,
  // l'anneau du repère de départ (posé par-dessus le crochet) la recouvre quand
  // le crochet est bas (premier passage : t₁ = 24 j, NaN)
  const communs = centres(haut).filter((c) => centres(bas).some((d) => Math.abs(c - d) <= 1.2));
  const gauche = centres(bas)[0];
  const droite = communs[communs.length - 1];
  return Number.isFinite(gauche) && Number.isFinite(droite) && droite > gauche + 5 ? droite - gauche : NaN;
}
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
 * Les TRAITS d'une rangée ou d'une colonne du canvas du produit, lus aux
 * pixels : des plages d'encre NEUTRE (l'accent compte pour du fond) plus
 * sombres que le fond de `min` au moins ; pour chacune, son centre (pondéré par
 * l'écart au fond) et son pic d'écart. C'est l'instrument du quadrillage, de la
 * courbe et des axes — il ne lit aucun repère du produit.
 */
const traits = (axe, pos, de, a, min = 6) => panneau.evaluate((el, { axe, pos, de, a, min, accent }) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const g = cv.getContext("2d");
  const P = Math.round(pos * dpr - 0.5), A = Math.max(0, Math.round(de * dpr)), B = Math.round(a * dpr);
  const n = B - A;
  if (n <= 0) return [];
  const d = axe === "rangee" ? g.getImageData(A, P, n, 1).data : g.getImageData(P, A, 1, n).data;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
  const f = t.getImageData(0, 0, 1, 1).data;
  const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const ca = chroma(...accent), na = Math.hypot(...ca);
  const ecart = (k) => {
    const r = d[4 * k], g2 = d[4 * k + 1], b = d[4 * k + 2];
    const c = chroma(r, g2, b), nc = Math.hypot(...c);
    if (nc > 12 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85) return 0;
    return Math.abs(0.2126 * r + 0.7152 * g2 + 0.0722 * b - lf);
  };
  const plages = [];
  let k = 0;
  while (k < n) {
    if (ecart(k) <= min) { k++; continue; }
    let sw = 0, sp = 0, pic = 0;
    const debut = k;
    while (k < n && ecart(k) > min) { const w = ecart(k); sw += w; sp += w * (k + 0.5); pic = Math.max(pic, w); k++; }
    plages.push({ centre: (A + sp / sw) / dpr, pic, largeur: (k - debut) / dpr });
  }
  return plages;
}, { axe, pos, de, a, min, accent });

/** L'étendue des pixels d'ACCENT le long d'une rangée ou d'une colonne (px CSS) ; null s'il n'y en a pas. */
const etendueAccent = (axe, pos, de, a) => panneau.evaluate((el, { axe, pos, de, a, accent }) => {
  const cv = el.querySelector("canvas");
  const dpr = cv.width / cv.clientWidth;
  const g = cv.getContext("2d");
  const P = Math.round(pos * dpr - 0.5), A = Math.max(0, Math.round(de * dpr)), B = Math.min(axe === "rangee" ? cv.width : cv.height, Math.round(a * dpr));
  const n = B - A;
  const d = axe === "rangee" ? g.getImageData(A, P, n, 1).data : g.getImageData(P, A, 1, n).data;
  const chroma = (r, g2, b) => { const m = (r + g2 + b) / 3; return [r - m, g2 - m, b - m]; };
  const ca = chroma(...accent), na = Math.hypot(...ca);
  const runs = [];
  let dans = false, debut = 0;
  for (let k = 0; k <= n; k++) {
    let est = false;
    if (k < n) { const c = chroma(d[4 * k], d[4 * k + 1], d[4 * k + 2]), nc = Math.hypot(...c); est = nc > 12 && (c[0] * ca[0] + c[1] * ca[1] + c[2] * ca[2]) / (nc * na) > 0.85; }
    if (est && !dans) { dans = true; debut = k; }
    if (!est && dans) { dans = false; runs.push({ de: (A + debut) / dpr, a: (A + k) / dpr }); }
  }
  return runs.length ? { de: runs[0].de, a: runs[runs.length - 1].a, runs } : null;
}, { axe, pos, de, a, accent });

/**
 * Le CADRE du graphe, lu aux pixels : l'axe vertical (le premier trait fort de
 * la rangée), le bord droit (le dernier trait), l'axe du temps (le dernier
 * trait fort de la colonne), le haut du cadre (le premier trait). Les repères
 * du produit ne servent qu'à savoir OÙ regarder, jamais à mesurer.
 */
async function cadreGraphe(fenetre, yMax = 5) {
  const o = await repere("axe-t0"), f = await repere("axe-tfin"), h = await repere(`axe-y${yMax}`);
  if (!o || !f || !h) return null;
  // une rangée à 0,2 unité au-dessus de l'axe : sous la courbe partout (0,25 à 32 j)
  const pxU0 = (o.y - h.y) / yMax;
  const r = await traits("rangee", o.y - 0.2 * pxU0, o.x - 8, f.x + 6);
  const c = await traits("colonne", o.x + 0.62 * ((f.x - o.x) / fenetre) * 1, h.y - 8, o.y + 6);
  if (r.length < 2 || c.length < 2) return null;
  const x0 = r[0].centre, x1 = r[r.length - 1].centre;
  const yTop = c[0].centre, y1 = c[c.length - 1].centre;
  return { x0, x1, y1, yTop, pxJ: (x1 - x0) / fenetre, pxU: (y1 - yTop) / yMax, rangee: r, colonne: c };
}
const X = (g, t) => g.x0 + t * g.pxJ;
const Y = (g, v) => g.y1 - v * g.pxU;

/**
 * La COURBE à l'encre (pas l'accent), lue colonne par colonne : le centre du
 * trait le plus contrasté de la colonne, hors de l'axe et du haut du cadre.
 * Rend la valeur en unités de l'axe (NaN si la colonne n'a pas de courbe).
 */
/**
 * Des instants de lecture HORS des traits verticaux du quadrillage (tous les
 * 4 j) : sur un trait, la colonne entière est de l'encre et la courbe s'y fond
 * (premier passage : la colonne de 24 j lisait la courbe à 2,45 au lieu de
 * 0,50). Un instant à moins de 2,5 px d'un trait en est écarté de 2,5 px ; le
 * lecteur COMPARE ensuite à la loi à l'instant réellement lu.
 */
const horsTraits = (g, ts) => ts.map((t) => {
  const k = Math.round(t / 4) * 4;
  return k > 0 && Math.abs(t - k) * g.pxJ < 2.5 ? k + ((t >= k ? 1 : -1) * 2.5) / g.pxJ : t;
});
async function lireCourbe(g, ts) {
  const out = [];
  for (const t of ts) {
    const pl = (await traits("colonne", X(g, t), g.yTop + 3, g.y1 - 3)).filter((p) => p.pic > 120);
    if (!pl.length) { out.push(NaN); continue; }
    const p = pl.reduce((a, b) => (b.pic > a.pic ? b : a));
    out.push((g.y1 - p.centre) / g.pxU);
  }
  return out;
}

/** Avant le pari : aucun accent, ni lecture, ni bouton de course, et ce que l'étape ajoute. */
async function avantPari(ou, en_plus = []) {
  const teinte = await pixelsAccent();
  const l = await panneau.locator("[data-lectures], [data-lecture]").count();
  const b = await panneau.locator("[data-lancer]").count();
  const extra = [];
  for (const [nom, ok] of en_plus) if (!ok) extra.push(nom);
  const ok = teinte === 0 && l === 0 && b === 0 && extra.length === 0;
  juger("avant-pari", ok, `${ou}, avant le pari : ${teinte} px d'accent, lectures ${l ? "PRÉSENTES" : "absentes"}, bouton de course ${b ? "PRÉSENT" : "absent"}${extra.length ? ` — ${extra.join(" ; ")}` : ""}`);
}
/** L'état posé par l'étape (spec §12, table des états) ; l'appareil d'une autre étape n'existe pas. */
async function etatPose(id) {
  const e = etapeDesc(id).etat;
  const lu = { sup: await attr("data-support"), fen: await attr("data-fenetre"), iso: await attr("data-isotope"), gr: await attr("data-grandeur"), dep: parseFloat(await attr("data-depart-j")), ins: parseFloat(await attr("data-instant-j")), pop: await attr("data-population"), ctl: await controles(), ph: await attr("data-pari") };
  const ok = lu.sup === e.support && lu.fen === e.fenetre_j && lu.iso === e.t_demi_j && lu.gr === e.grandeur && lu.dep === e.depart_j && lu.ins === e.instant_j && (!e.population_n || lu.pop === e.population_n) && lu.ctl === "" && lu.ph === "attente";
  juger("etapes", ok, `étape ${id} : appareil ${lu.sup}, fenêtre ${lu.fen} j, t½ ${lu.iso} j, axe ${lu.gr}, départ ${lu.dep}, instant ${lu.ins}, population ${lu.pop}, contrôles [${lu.ctl}], pari « ${lu.ph} »`);
  const courbe = !!(await repere("axe-t0")), grille = !!(await repere("grille-0"));
  juger("etapes", (e.support === "courbe") === courbe && (e.support === "grille") === grille, `étape ${id} : appareils présents — courbe ${courbe ? "oui" : "non"}, grille ${grille ? "oui" : "non"} (attendu : ${e.support})`);
}
/**
 * La FRONTIÈRE (spec §9) : on interdit des FORMES, pas des noms (ADR 0036) —
 * symbole, forme LaTeX, flexions du verbe. Une sonde nommée par forme ;
 * l'essai rouge les injecte une à une dans le panneau et exige que chacune
 * soit vue (une forme qui ne fait rien rougir est une sonde manquante).
 */
/** Un mot qui COMMENCE ici : `\b` du JavaScript ignore les lettres accentuées, et « désintégrations » contient « intégration ». */
const mot = (src) => new RegExp(`(?<!\\p{L})${src}`, "iu");
const FORMES = [
  ["Euler", /\bEuler\b/, "la méthode d'Euler"], ["dN/dt", /d\s*N\s*\/\s*d\s*t/, "dN/dt = −λN"], ["résoudre l'équation", /résoudre l['’]équation/i, "résoudre l'équation"],
  ["pas de calcul", /pas de calcul/i, "un pas de calcul"], ["intégration", mot("intégration"), "par intégration"],
  ["filiation", mot("filiation"), "une filiation"], ["chaîne de désintégration", /chaîne de désintégration/i, "la chaîne de désintégration"], ["équilibre séculaire", /équilibre séculaire/i, "l'équilibre séculaire"], ["noyau fils", /noyau[x]? (petit-)?fils/i, "le noyau fils"], ["famille radioactive", /famille radioactive/i, "une famille radioactive"],
  ["défaut de masse", /défaut de masse/i, "le défaut de masse"], ["énergie de liaison", /énergie de liaison/i, "l'énergie de liaison"], ["MeV", /\bMeV\b/, "5 MeV"], ["fission", mot("fission"), "la fission"], ["fusion", mot("fusion"), "la fusion"], ["E = mc", /E\s*=\s*m\s*c/i, "E = mc²"],
  ["datation", mot("datation"), "la datation"], ["dater", /\bdater\b/i, "pour dater"], ["datant", /\bdatant\b/i, "en datant"], ["datée", /(?<!\p{L})datée?s?(?!\p{L})/iu, "une roche datée"], ["âge de", /âge d(e\b|['’])/i, "l'âge de la roche"], ["carbone 14", /carbone\s*14|C-14|¹⁴C/i, "le carbone 14"], ["archéo", mot("archéo"), "en archéologie"],
  ["section efficace", /section efficace/i, "la section efficace"], ["quark", mot("quark"), "un quark"], ["antineutrino", mot("antineutrino"), "un antineutrino"],
  ["ln(N", /ln\s*\(\s*N/, "ln(N) en fonction de t"], ["semi-log", /semi-log/i, "papier semi-log"], ["logarithmique", mot("logarithmique"), "une échelle logarithmique"], ["linéarisation", mot("linéaris"), "la linéarisation"],
  ["√", /√/, "√N"], ["\\sqrt", /\\sqrt/, "\\sqrt{N}"], ["racine carrée", /racine carrée/i, "la racine carrée"], ["écart-type", /écart[- ]type/i, "l'écart-type"], ["écart typ", /écart typ/i, "l'écart typique"], ["σ", /σ/, "σ = 4"], ["\\sigma", /\\sigma/, "\\sigma"],
  ["dispersion", mot("dispersion"), "la dispersion"], ["binomial", mot("binomial"), "la loi binomiale"], ["Poisson", /Poisson/, "la loi de Poisson"], ["loi normale", /loi normale/i, "la loi normale"], ["intervalle de confiance", /intervalle de confiance/i, "l'intervalle de confiance"], ["espérance", mot("espérance"), "l'espérance"], ["variance", mot("variance"), "la variance"],
  ["fluctuation chiffrée", /fluctuations?\s+(de|d['’])?\s*[±0-9]/i, "une fluctuation de 4 noyaux"], ["en moyenne ±", /en moyenne\s*[^.]{0,12}±/i, "en moyenne 32 ± 4"],
  ["p =", /(^|[^\p{L}])p\s*=\s*\d/u, "p = 0,021"], ["1 - e^", /1\s*[-−]\s*e\s*\^/, "1 - e^(−λΔt)"], ["e^{-λΔt}", /e\s*\^\s*\{?\s*[-−]\s*λ\s*Δ\s*t/, "e^{-λΔt}"], ["\\Delta t", /\\Delta\s*t/, "\\Delta t"], ["pas de temps", /pas de temps/i, "le pas de temps"],
  ["tirage de Bernoulli", /Bernoulli/i, "un tirage de Bernoulli"], ["seed", /\bseed\b/i, "la seed"], ["graine", /\bgraine\b/i, "la graine"], ["générateur", mot("générateur"), "le générateur"],
];
async function frontiere(ou) {
  const t = await panneau.evaluate((el) => el.innerText);
  const vues = FORMES.filter(([, re]) => re.test(t)).map(([n]) => n);
  juger("frontiere", vues.length === 0, `${ou} : ${vues.length ? `forme(s) interdite(s) AFFICHÉE(S) : ${vues.join(", ")}` : `aucune des ${FORMES.length} formes interdites`}`);
}
const latexBrut = async () => (await panneau.evaluate((el) => el.innerText)).match(/\$|\\(tau|text|frac|lambda|times|sqrt|Delta)\b/g) ?? [];

/** Les étiquettes : ni chevauchées, ni sous la légende, dans le cadre ; près de ce qu'elles nomment. */
const ANCRES = { "t-demi": "construction-t", t1: "depart" };
const PRES = 36;
async function etiquettesLisibles(ou, q = panneau) {
  const { textes, larg, haut, legende, ancres, encre, rangee } = await q.evaluate((el, ANCRES) => {
    const cv = el.querySelector("canvas");
    const rc = cv.getBoundingClientRect();
    const boite = (e) => { const b = e.getBoundingClientRect(); return { x0: b.left - rc.left, y0: b.top - rc.top, x1: b.right - rc.left, y1: b.bottom - rc.top }; };
    const visible = (e) => getComputedStyle(e).visibility === "visible";
    const textes = [...el.querySelectorAll("[data-etiquette]")].filter((e) => visible(e) && (e.textContent ?? "").trim()).map((e) => ({ nom: e.getAttribute("data-etiquette"), ...boite(e) }));
    const lg = el.querySelector("[data-legende]");
    const legende = lg ? boite(lg) : null;
    const ancres = {};
    for (const [nom, r] of Object.entries(ANCRES)) {
      const s = el.querySelector(`[data-etiquette="${r}"]`);
      if (s && visible(s)) { const b = s.getBoundingClientRect(); ancres[nom] = { x: b.left - rc.left + b.width / 2, y: b.top - rc.top + b.height / 2 }; }
    }
    // la cote du crochet : près du MILIEU de sa barre (vague 2, captures — à
    // 390 px, étape 5, elle avait dérivé à 40 px, sous la courbe de l'AUTRE
    // isotope, où « 8,0 jours » nommait la mauvaise courbe)
    const cg = el.querySelector('[data-etiquette="crochet-g"]'), cd = el.querySelector('[data-etiquette="crochet-d"]');
    if (cg && cd && visible(cg) && visible(cd)) {
      const a = cg.getBoundingClientRect(), b = cd.getBoundingClientRect();
      ancres.crochet = { x: (a.left + b.left) / 2 - rc.left, y: (a.top + b.top) / 2 - rc.top };
    }
    let encre = null;
    if (legende) {
      const dpr = cv.width / cv.clientWidth, g = cv.getContext("2d");
      const X0 = Math.max(0, Math.floor(legende.x0 * dpr)), Y0 = Math.max(0, Math.floor(legende.y0 * dpr));
      const W = Math.max(1, Math.ceil((legende.x1 - legende.x0) * dpr)), H = Math.max(1, Math.ceil((legende.y1 - legende.y0) * dpr));
      const d = g.getImageData(X0, Y0, W, H).data;
      const f = g.getImageData(cv.width - 1, 0, 1, 1).data;
      encre = 0;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - f[0]) + Math.abs(d[i + 1] - f[1]) + Math.abs(d[i + 2] - f[2]) > 60) encre++;
    }
    // la rangée des NOMBRES d'axe, sous l'axe du temps (courbe) ou du graphe du compte (grille)
    const o = el.querySelector('[data-etiquette="axe-t0"]') ?? el.querySelector('[data-etiquette="graphe-o"]');
    let rangee = null;
    if (o && getComputedStyle(o).visibility === "visible") { const b = o.getBoundingClientRect(); rangee = { y0: b.top - rc.top + b.height / 2 + 4, y1: b.top - rc.top + b.height / 2 + 17 }; }
    return { textes, larg: rc.width, haut: rc.height, legende, ancres, encre, rangee };
  }, ANCRES);
  const fautes = [];
  for (let i = 0; i < textes.length; i++) {
    const a = textes[i];
    if (a.x0 < -1 || a.y0 < -1 || a.x1 > larg + 1 || a.y1 > haut + 1) fautes.push(`« ${a.nom} » hors du cadre`);
    for (let j = i + 1; j < textes.length; j++) { const b = textes[j]; if (a.x0 < b.x1 - 1 && b.x0 < a.x1 - 1 && a.y0 < b.y1 - 1 && b.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » chevauche « ${b.nom} »`); }
    if (legende && a.x0 < legende.x1 - 1 && legende.x0 < a.x1 - 1 && a.y0 < legende.y1 - 1 && legende.y0 < a.y1 - 1) fautes.push(`« ${a.nom} » SOUS la légende`);
    // aucune étiquette dans la rangée des nombres d'axe, sauf les titres d'axes
    // (vague 2, dessin : « 16  8,0 jours  24 » — la réponse déguisée en graduation)
    if (rangee && !["axe-t", "axe-y", "graphe-t", "graphe-y"].includes(a.nom) && a.y0 < rangee.y1 && rangee.y0 < a.y1) fautes.push(`« ${a.nom} » dans la rangée des nombres d'axe`);
    const o = ancres[a.nom];
    if (o) {
      const dist = Math.hypot(Math.max(a.x0 - o.x, 0, o.x - a.x1), Math.max(a.y0 - o.y, 0, o.y - a.y1));
      if (dist > PRES) fautes.push(`« ${a.nom} » à ${dist.toFixed(0)} px de ce qu'elle nomme (> ${PRES})`);
    }
  }
  juger("etiquettes", fautes.length === 0, `${ou} : ${textes.length} étiquette(s) (${textes.map((t) => t.nom).join(", ")})${fautes.length ? ` — ${fautes.join(" ; ")}` : ", ni chevauchées, ni sous la légende, dans le cadre, près de leur objet"}`);
  juger("cadre", encre === 0, `${ou} : ${encre === null ? "légende ABSENTE" : `${encre} pixel(s) d'encre sous la légende`} (attendu 0)`);
}
/** Aucune étape n'ouvre un contrôle qui atteint l'état qu'un pari SUIVANT fait deviner (spec §7.6) — la table, écrite ICI. */
const REPOND_A = { depart: "et-si-on-part-plus-tard", population: "la-loi-est-une-loi-de-population", grandeur: "ce-que-compte-le-detecteur", isotope: "libre" };
async function sansFuite(id) {
  const ordre = descripteur.etapes.map((e) => e.id);
  const ici = ordre.indexOf(id);
  const ouverts = (await controles()).split(",").filter(Boolean);
  const fuites = ouverts.filter((c) => REPOND_A[c] && ordre.indexOf(REPOND_A[c]) > ici);
  juger("fuite-inter-etapes", fuites.length === 0, `étape ${id} révélée : contrôles [${ouverts.join(",")}]${fuites.length ? ` — ${fuites.join(", ")} atteint l'état d'un pari suivant` : " — aucun n'atteint l'état d'un pari suivant"}`);
}
/** Les pas des contrôles et la demi-vie tombent sur le pas du tirage (Δt = 0,25 j) ; la probabilité par pas, recalculée (N7, N8). */
async function grilleEtProba(ou) {
  const [a, b, c] = await Promise.all(["data-pas-demi", "data-pas-depart", "data-pas-instant"].map(async (n) => parseFloat((await attr(n)) ?? "NaN")));
  const iso = await attr("data-isotope");
  const entier = (x) => Number.isFinite(x) && Math.abs(x - Math.round(x)) < 1e-9;
  juger("nombres", entier(a) && a === TH[iso] / DT && b === 4 && c === 2, `N7 — ${ou} : t½/Δt = ${a}, pas du départ/Δt = ${b}, pas de l'instant/Δt = ${c} (attendu ${TH[iso] / DT}, 4, 2)`);
  const p = parseFloat((await attr("data-p-pas")) ?? "NaN");
  const attendu = 1 - Math.exp(-lambdaJ(iso) * DT);
  juger("nombres", Math.abs(p - attendu) < 1e-6, `N8 — ${ou} : probabilité par pas exposée ${p} (recalculée 1 − e^(−λΔt) = ${attendu.toFixed(7)} ; λΔt serait ${(lambdaJ(iso) * DT).toFixed(7)})`);
}

// ── La GRILLE, lue aux pixels ──
/** Chaque case : pleine (encre) ou vidée (le fond au centre). Géométrie lue sur les deux coins que pose le produit. */
async function cases() {
  const a = await repere("grille-0"), b = await repere("grille-1");
  const n = parseInt((await attr("data-population")) ?? "0", 10);
  if (!a || !b || !n) return null;
  return panneau.evaluate((el, { a, b, n }) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const g = cv.getContext("2d");
    const c = Math.round(Math.sqrt(n)), pas = (b.x - a.x) / c;
    const d = g.getImageData(0, 0, cv.width, cv.height).data;
    const t = document.createElement("canvas").getContext("2d");
    t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
    const f = t.getImageData(0, 0, 1, 1).data;
    const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    const pleines = [];
    for (let i = 0; i < n; i++) {
      const x = Math.floor((a.x + (i % c + 0.5) * pas) * dpr), y = Math.floor((a.y + (Math.floor(i / c) + 0.5) * pas) * dpr);
      const k = 4 * (y * cv.width + x);
      pleines.push(Math.abs(0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2] - lf) > 60);
    }
    return pleines;
  }, { a, b, n });
}
/** « 29 à 8,0 jours · 17 à 16 jours » → [29, 17] */
const comptes = (s) => { const m = s.match(/^(\d+) à [\d,]+ jours · (\d+) à 16 jours$/); return m ? [parseInt(m[1], 10), parseInt(m[2], 10)] : null; };
/** Un tirage entier, sans animation (« Image finale ») : rend [compte à t½, compte à 16 j]. */
async function tirageRapide() {
  const avant = parseInt((await attr("data-tirages")) ?? "0", 10);
  await panneau.locator("[data-image-finale]").click();
  await page.waitForFunction(([sc, n]) => { const e = document.querySelector(`[data-scene="${sc}"]`); return parseInt(e?.getAttribute("data-tirages") ?? "0", 10) > n && e?.getAttribute("data-course-finie") === "oui"; }, [SCENE, avant], { timeout: 20000 }).catch(() => {});
  await deuxImages();
  return comptes(await lecture("restants-comptes"));
}
/**
 * Une course de la grille, suivie IMAGE PAR IMAGE dans la page : chaque case
 * (pleine → vidée est permis une fois ; vidée → pleine, jamais), l'instant
 * affiché (il ne recule pas), les ÉCLAIRS au sens WCAG 2.3.1 (paires de
 * variations ≥ 0,10 de luminance relative, blocs de 4 px, fenêtre d'une
 * seconde), et la durée contre l'horloge.
 */
async function suivreCourse() {
  const a = await repere("grille-0"), b = await repere("grille-1");
  const n = parseInt((await attr("data-population")) ?? "0", 10);
  await panneau.locator("[data-lancer]").click();
  return panneau.evaluate(async (el, { a, b, n }) => {
    const cv = el.querySelector("canvas");
    const dpr = cv.width / cv.clientWidth;
    const g = cv.getContext("2d", { willReadFrequently: true });
    const c = Math.round(Math.sqrt(n)), pas = (b.x - a.x) / c;
    const t = document.createElement("canvas").getContext("2d");
    t.fillStyle = getComputedStyle(el).getPropertyValue("--figure-surface"); t.fillRect(0, 0, 1, 1);
    const f = t.getImageData(0, 0, 1, 1).data;
    const lf = 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
    const centres = Array.from({ length: n }, (_, i) => [Math.floor((a.x + (i % c + 0.5) * pas) * dpr), Math.floor((a.y + (Math.floor(i / c) + 0.5) * pas) * dpr)]);
    const etat = new Array(n).fill(true);
    let rallumees = 0, videes = 0, recul = 0, dernier = -1;
    // éclairs : blocs de 4 px du canvas entier
    const B = 4, W = Math.floor(cv.width / B), H = Math.floor(cv.height / B);
    const lut = new Float32Array(256);
    for (let v = 0; v < 256; v++) { const x = v / 255; lut[v] = x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }
    const ref = new Float32Array(W * H).fill(-1), sens = new Int8Array(W * H);
    const bascules = Array.from({ length: W * H }, () => []);
    const t0 = performance.now();
    let images = 0;
    for (;;) {
      await new Promise((res) => requestAnimationFrame(res));
      images++;
      const d = g.getImageData(0, 0, cv.width, cv.height).data;
      centres.forEach(([x, y], i) => {
        const k = 4 * (y * cv.width + x);
        const pleine = Math.abs(0.2126 * d[k] + 0.7152 * d[k + 1] + 0.0722 * d[k + 2] - lf) > 60;
        if (pleine && !etat[i]) rallumees++;
        if (!pleine && etat[i]) videes++;
        etat[i] = pleine;
      });
      const tj = parseFloat(el.getAttribute("data-t-jours") ?? "0");
      if (tj < dernier - 1e-9) recul++;
      dernier = tj;
      const now = performance.now();
      for (let by = 0; by < H; by++) for (let bx = 0; bx < W; bx++) {
        const k = 4 * ((by * B + 2) * cv.width + bx * B + 2);
        const L = 0.2126 * lut[d[k]] + 0.7152 * lut[d[k + 1]] + 0.0722 * lut[d[k + 2]];
        const j = by * W + bx;
        if (ref[j] < 0) { ref[j] = L; continue; }
        const dl = L - ref[j];
        if (Math.abs(dl) >= 0.1) { const s = dl > 0 ? 1 : -1; if (s !== sens[j]) { bascules[j].push(now); sens[j] = s; } ref[j] = L; }
      }
      if (el.getAttribute("data-course-finie") === "oui" || now - t0 > 15000) break;
    }
    const duree = (performance.now() - t0) / 1000;
    let pire = 0;
    for (const bs of bascules) for (let i = 0; i < bs.length; i++) { let k = i; while (k + 1 < bs.length && bs[k + 1] - bs[i] <= 1000) k++; pire = Math.max(pire, Math.floor((k - i + 1) / 2)); }
    return { rallumees, videes, recul, images, duree, eclairs: pire, finale: etat };
  }, { a, b, n });
}

try {
// ═══ Étape 1 : où se lit la demi-vie ══════════════════════════════════════
await etatPose("ou-lire-la-demi-vie");
let pxJ32 = NaN;
{
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  const construction = !!(await repere("construction-t"));
  const curseur = await repere("curseur"), o = await repere("axe-t0");
  await avantPari("étape 1", [
    ["la construction est DÉJÀ tracée", !construction],
    [`le curseur n'est pas à t = 0`, curseur && o && Math.abs(curseur.x - o.x) <= 1.5],
    [`la description lue dit « ${(desc.match(/moitié|8,0 jours/) ?? [""])[0]} »`, !/moitié|8,0 jours/.test(desc)],
  ]);
  // LE QUADRILLAGE, l'énoncé, présent avant le pari ; LA FENÊTRE de 10 jours (spec §2.3)
  const g = await cadreGraphe(10);
  if (!g) juger("quadrillage", false, "étape 1 : cadre du graphe illisible aux pixels");
  else {
    const internes = g.rangee.slice(1, -1).filter((p) => p.pic < 120);
    const attendus = [[4, "fin"], [8, "majeur"]];
    const fautes = [];
    for (const [t, genre] of attendus) {
      const p = internes.find((q) => Math.abs(q.centre - X(g, t)) <= 1);
      if (!p) fautes.push(`aucun trait à ${t} j`);
      else if ((genre === "majeur") !== (p.pic > Math.max(...internes.filter((q) => q !== p).map((q) => q.pic), 0))) fautes.push(`le trait de ${t} j n'est pas ${genre === "majeur" ? "plus appuyé" : "plus léger"} que les autres`);
    }
    if (internes.length !== attendus.length) fautes.push(`${internes.length} traits verticaux dans le cadre (attendu ${attendus.length} : 4 j fin, 8 j majeur)`);
    // la colonne : les horizontaux à chaque demi-unité, les entiers plus appuyés, et la courbe plus contrastée que tout
    const col = g.colonne.slice(1, -1);
    const courbe = col.filter((p) => p.pic >= 120);
    const grilleV = col.filter((p) => p.pic < 120);
    for (let k = 1; k <= 9; k++) {
      const v = k / 2;
      const p = grilleV.find((q) => Math.abs(q.centre - Y(g, v)) <= 1);
      const pres = courbe.some((q) => Math.abs(q.centre - Y(g, v)) <= 3);
      if (!p && !pres) fautes.push(`aucun trait horizontal à ${virgule(v, 1)}`);
    }
    const majeurs = grilleV.filter((p) => [1, 2, 3, 4].some((v) => Math.abs(p.centre - Y(g, v)) <= 1));
    const fins = grilleV.filter((p) => [0.5, 1.5, 2.5, 3.5, 4.5].some((v) => Math.abs(p.centre - Y(g, v)) <= 1));
    const minMaj = Math.min(...majeurs.map((p) => p.pic)), maxFin = Math.max(...fins.map((p) => p.pic));
    const picCourbe = courbe.length ? Math.max(...courbe.map((p) => p.pic)) : 0;
    if (!(minMaj > maxFin)) fautes.push(`les majeurs (${minMaj.toFixed(0)}) ne sont pas plus appuyés que les fins (${maxFin.toFixed(0)})`);
    if (!(picCourbe > Math.max(...majeurs.map((p) => p.pic)))) fautes.push(`la courbe (${picCourbe.toFixed(0)}) n'est pas plus contrastée que le quadrillage (${Math.max(...majeurs.map((p) => p.pic)).toFixed(0)})`);
    juger("quadrillage", fautes.length === 0, `étape 1, AVANT le pari : ${fautes.length ? fautes.join(" ; ") : `fin à 4 j, majeur à 8 j, cadre à 10 j ; horizontaux tous les 0,5 ; contrastes fins ${maxFin.toFixed(0)} < majeurs ${minMaj.toFixed(0)} < courbe ${picCourbe.toFixed(0)}`}`);
    // la fenêtre : le cadre s'arrête à 10 j, la courbe aussi, à N(10)
    const [vFin] = await lireCourbe(g, [9.9]);
    juger("fenetre-s1", (await attr("data-fenetre")) === "10" && Math.abs(vFin - noyaux("8", 9.9) / 1e14) * g.pxU <= 2, `étape 1 : fenêtre ${await attr("data-fenetre")} j ; la courbe à 9,9 j lue à ${virgule(vFin, 3)} (attendu ${virgule(noyaux("8", 9.9) / 1e14, 3)}), cadre de ${virgule((g.x1 - g.x0) / g.pxJ, 1)} j`);
    // la courbe : décroissante, convexe, juste
    const ts = horsTraits(g, Array.from({ length: 21 }, (_, k) => 0.25 + (k * 9.5) / 20));
    const vs = await lireCourbe(g, ts);
    const ecarts = vs.map((v, k) => Math.abs(v - noyaux("8", ts[k]) / 1e14) * g.pxU);
    const decroit = vs.every((v, k) => k === 0 || v < vs[k - 1]);
    juger("courbe-juste", vs.every(Number.isFinite) && decroit && Math.max(...ecarts) <= 2, `étape 1 : 21 colonnes de 0,25 à 9,75 j — ${decroit ? "décroissante" : "PAS décroissante"}, écart max à la loi ${Math.max(...ecarts).toFixed(2)} px (≤ 2)`);
  }
}
await parier(indexDe("ou-lire-la-demi-vie", "ordonnee-moitie"));
{
  const res = await resultat();
  juger("paris", /Bonne réponse/.test(res), `étape 1, verdict immédiat (pas de course) : « ${res} »`);
  juger("avant-pari", (await pixelsAccent()) > 0, "étape 1 révélée : la construction apparaît, et l'accent avec");
  juger("etapes", (await controles()) === "instant", `étape 1 révélée : contrôles [${await controles()}]`);
  const max = await panneau.locator('[data-controle="instant"] input').getAttribute("max");
  juger("fenetre-s1", max === "10", `étape 1 révélée : le curseur s'arrête à ${max} j (attendu 10 : la deuxième demi-vie, à 16 j, reste hors d'atteinte)`);
  // LA CONSTRUCTION finit sur un CROISEMENT de traits majeurs (spec §5.2)
  const g = await cadreGraphe(10);
  if (g) {
    const h = await etendueAccent("rangee", Y(g, 2), g.x0 - 4, g.x1);
    const v = await etendueAccent("colonne", X(g, 8), g.yTop, g.y1 + 6);
    const ok = h && v && Math.abs(h.de - g.x0) <= 4 && Math.abs(h.a - X(g, 8)) <= 5 && Math.abs(v.a - g.y1) <= 5 && Math.abs(v.de - Y(g, 2)) <= 5;
    juger("lecture-t-demi", ok, `étape 1 révélée : horizontale d'accent à la hauteur 2 de ${h ? virgule(h.de, 0) : "?"} à ${h ? virgule(h.a, 0) : "?"} px (attendu ${virgule(g.x0, 0)} → ${virgule(X(g, 8), 0)}) ; verticale à 8 j de ${v ? virgule(v.de, 0) : "?"} à ${v ? virgule(v.a, 0) : "?"} px (attendu ${virgule(Y(g, 2), 0)} → ${virgule(g.y1, 0)})`);
  }
  // N1 — le curseur aux 21 positions : N(t) à trois chiffres, par égalité de chaîne
  const fautes = [];
  for (let k = 0; k <= 20; k++) {
    const t = k * 0.5;
    await glisser("instant", t);
    const ln = await lecture("noyaux"), li = await valeurCurseur("instant");
    if (ln !== `${sci(noyaux("8", t))} noyaux`) fautes.push(`t = ${t} : « ${ln} » (attendu ${sci(noyaux("8", t))} noyaux)`);
    if (li !== `t = ${virgule(t, 1)} jours`) fautes.push(`t = ${t} : curseur « ${li} »`);
  }
  juger("nombres", fautes.length === 0, `N1 — N(t) au curseur, 21 positions${fautes.length ? ` : ${fautes.slice(0, 3).join(" ; ")}` : " : les vingt et une exactes, à trois chiffres"}`);
  juger("nombres", (await lecture("demi-vie")) === "8,0 jours", `demi-vie lue « ${await lecture("demi-vie")} » (attendu 8,0 jours)`);
  const texte = await panneau.evaluate((el) => el.innerText);
  juger("nombres", !/%/.test(texte), `N3 — aucun pourcentage affiché hors de la grille (${/%/.test(texte) ? "un « % » AFFICHÉ" : "aucun"})`);
  await grilleEtProba("étape 1");
  await glisser("instant", 5);
  await sansFuite("ou-lire-la-demi-vie");
  await etiquettesLisibles("étape 1 révélée");
  await frontiere("étape 1 révélée");
}

// ═══ Étape 2 : et si on part plus tard ════════════════════════════════════
await suivant();
await etatPose("et-si-on-part-plus-tard");
{
  const desc = (await panneau.locator("canvas").getAttribute("aria-label")) ?? "";
  await avantPari("étape 2", [
    ["le crochet est DÉJÀ posé", !(await repere("crochet-g"))],
    ["le repère du départ (l'énoncé) est ABSENT", !!(await repere("depart"))],
    [`la description lue dit « ${(desc.match(/huit|même|inchangé/i) ?? [""])[0]} »`, !/huit|même|inchangé/i.test(desc)],
  ]);
  const g = await cadreGraphe(32);
  if (g) {
    pxJ32 = g.pxJ;
    // la courbe entière (32 j) : décroissante, CONVEXE sur des triplets de 4 j, juste, et par le croisement (8 j ; 2)
    // (pas de colonne à moins de 1,2 j de 16 : l'anneau du repère de départ y recouvre la courbe)
    const ts = horsTraits(g, Array.from({ length: 33 }, (_, k) => Math.min(31.8, 0.2 + k * 0.99)).filter((t) => Math.abs(t - 16) > 1.2));
    const vs = await lireCourbe(g, ts);
    const ecarts = vs.map((v, k) => Math.abs(v - noyaux("8", ts[k]) / 1e14) * g.pxU);
    const trip = [];
    for (let t = 0.5; t + 8 <= 31.5; t += 4) if ([t, t + 4, t + 8].every((u) => Math.abs(u - 16) > 1.2)) trip.push(t);
    // (les triplets tombent à 0,5 j des traits de 4 j : hors des traits dès 5 px par jour)
    const vt = await lireCourbe(g, trip.flatMap((t) => [t, t + 4, t + 8]));
    const convexe = trip.every((_, i) => vt[3 * i] + vt[3 * i + 2] - 2 * vt[3 * i + 1] > 0);
    const decroit = vs.every((v, k) => k === 0 || v < vs[k - 1] + 0.004);
    // le passage à 8 j : la moyenne de deux colonnes à ± 3 px du trait de 8 j (la courbe y est presque droite)
    const [va, vb] = await lireCourbe(g, [8 - 3 / g.pxJ, 8 + 3 / g.pxJ]);
    const v8 = (va + vb) / 2;
    const croisement = Math.abs(v8 - 2) * g.pxU;
    juger("courbe-juste", vs.every(Number.isFinite) && decroit && convexe && Math.max(...ecarts) <= 2 && croisement <= 2, `étape 2, 32 jours : ${decroit ? "décroissante" : "PAS décroissante"}, ${convexe ? "convexe" : "PAS CONVEXE"} (${trip.length} triplets de 4 j), écart max ${Math.max(...ecarts).toFixed(2)} px, passage à 8 j à ${croisement.toFixed(2)} px du trait « 2 » (≤ 2)`);
  }
}
await parier(indexDe("et-si-on-part-plus-tard", "moins-car-uses"));
{
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 2, pari faux (les noyaux s'usent) : « ${res} »`);
  juger("etapes", (await controles()) === "depart", `étape 2 révélée : contrôles [${await controles()}]`);
  const g = await cadreGraphe(32);
  // LE CROCHET : sa largeur, aux pixels, aux 25 départs ; sa durée affichée, par égalité de chaîne
  const largeurs = [];
  const fautes = [];
  for (let t1 = 0; t1 <= 24; t1++) {
    await glisser("depart", t1);
    largeurs.push(await largeurCrochet(g));
    const ld = await lecture("duree-de-moitie"), lr = await lecture("restants-depart"), lt = (await valeurCurseur("depart")).replace(/^t₁ = /, ""), le = await etiquetteTexte("crochet");
    if (ld !== "8,0 jours") fautes.push(`t₁ = ${t1} : durée « ${ld} »`);
    if (lr !== `${sci(noyaux("8", t1))} noyaux`) fautes.push(`t₁ = ${t1} : hauteur « ${lr} » (attendu ${sci(noyaux("8", t1))} noyaux)`);
    if (lt !== `${virgule(t1, 1)} jours`) fautes.push(`t₁ = ${t1} : départ « ${lt} »`);
    if (le !== "8,0 jours") fautes.push(`t₁ = ${t1} : cote du crochet « ${le} »`);
  }
  juger("nombres", fautes.length === 0, `N4 — le crochet aux 25 départs${fautes.length ? ` : ${fautes.slice(0, 3).join(" ; ")}` : " : 8,0 jours vingt-cinq fois, hauteur N(t₁) exacte"}`);
  const lmin = Math.min(...largeurs), lmax = Math.max(...largeurs);
  const attendue = 8 * (g?.pxJ ?? pxJ32);
  juger("crochet-invariant", largeurs.every(Number.isFinite) && lmax - lmin <= 1 && Math.abs((lmin + lmax) / 2 - attendue) <= 1, `les 25 crochets, lus aux pixels : ${virgule(lmin, 1)} à ${virgule(lmax, 1)} px (un intervalle majeur : ${virgule(attendue, 1)} px) — ${lmax - lmin <= 1 ? "la même largeur partout" : "LA LARGEUR BOUGE"}`);
  await grilleEtProba("étape 2");
  juger("un-seul-echantillon", (await attr("data-deux-courbes")) === "non" && !(await repere("second-0")), "étape 2 : une seule courbe");
  await glisser("depart", 16);
  await sansFuite("et-si-on-part-plus-tard");
  await etiquettesLisibles("étape 2 révélée");
  await frontiere("étape 2 révélée");
}

// ═══ Étape 3 : soixante-quatre noyaux ═════════════════════════════════════
await suivant();
await etatPose("la-loi-est-une-loi-de-population");
{
  const c0 = await cases();
  const vides = c0 ? c0.filter((p) => !p).length : -1;
  await avantPari("étape 3", [[`${vides} case(s) déjà vidée(s)`, vides === 0 && c0.length === 64]]);
}
await parier(indexDe("la-loi-est-une-loi-de-population", "autour-de-32"));
{
  juger("paris", (await attr("data-pari")) === "note", `étape 3 : après le pari, le verdict ATTEND la course (pari « ${await attr("data-pari")} »)`);
  const course = await suivreCourse();
  await deuxImages();
  const res = await resultat();
  juger("paris", /Bonne réponse/.test(res), `étape 3, verdict après la course : « ${res} »`);
  juger("case-ne-se-rallume-pas", course.rallumees === 0 && course.recul === 0, `course suivie sur ${course.images} images : ${course.videes} case(s) vidée(s), ${course.rallumees} RALLUMÉE(S), le temps a reculé ${course.recul} fois`);
  juger("eclairs", course.eclairs <= 3, `WCAG 2.3.1 : au pire ${course.eclairs} éclair(s) par seconde sur un bloc de 4 px (≤ 3)`);
  // la durée contre l'HORLOGE : 16 jours à 0,25 s le jour = 4,0 s
  if (course.duree < 3.6) juger("performance", false, `la course a duré ${course.duree.toFixed(2)} s : PLUS VITE que l'échelle déclarée (4,0 s)`);
  else if (course.duree > 4.6) avertissements.push(`la course a duré ${course.duree.toFixed(2)} s (déclaré : 4,0 s) — la machine n'a pas suivi`);
  else noter("performance", true, `course de ${course.duree.toFixed(2)} s à l'horloge (déclaré : 16 jours × 0,25 s = 4,0 s)`);
  // ce qu'on compte est ce qu'on dessine
  const [demi, fin] = comptes(await lecture("restants-comptes")) ?? [NaN, NaN];
  const c = await cases();
  const pleines = c ? c.filter(Boolean).length : -1;
  juger("grille-comptee", pleines === fin && String(fin) === (await attr("data-restants")), `fin de course : ${pleines} case(s) pleine(s) aux pixels, lecture « ${await lecture("restants-comptes")} », data-restants ${await attr("data-restants")}`);
  juger("nombres", (await lecture("noyaux")) === "32 à 8,0 jours · 16 à 16 jours", `la loi prévoit « ${await lecture("noyaux")} »`);
  const ec = await lecture("ecart-a-la-loi");
  juger("nombres", ec === `${virgule((Math.abs(demi - 32) / 32) * 100, 1)} %`, `écart à la loi « ${ec} » pour ${demi} restants à 8 j (attendu ${virgule((Math.abs(demi - 32) / 32) * 100, 1)} %)`);
  juger("etapes", (await controles()) === "population", `étape 3 révélée : contrôles [${await controles()}]`);
  // LE TIRAGE EST VIVANT : un second tirage n'éteint pas les mêmes cases (le MOTIF, jamais le compte)
  const motifA = course.finale;
  const comptesDemi = [demi];
  for (let k = 0; k < 4; k++) comptesDemi.push((await tirageRapide())?.[0] ?? NaN);
  const motifB = await cases();
  const differe = motifA && motifB ? motifA.filter((v, i) => v !== motifB[i]).length : 0;
  const tousMoitie = comptesDemi.every((v) => v === 32);
  juger("tirage-vivant", differe > 0 && !tousMoitie, `cinq tirages à 64 : ${comptesDemi.join(" · ")} restants à 8 j ; ${differe} case(s) différente(s) entre le premier et le dernier motif${tousMoitie ? " — EXACTEMENT 32 à chaque fois" : ""}`);
  const hist = await lecture("tirages-precedents");
  juger("nombres", hist === comptesDemi.join(" · "), `derniers tirages « ${hist} » (attendu ${comptesDemi.join(" · ")})`);
  // LE TIRAGE EST JUSTE : 5 tirages × 3 populations dans ±5σ (bandes de la PORTE, spec §11.2)
  const BANDES = { 64: [12, 52], 256: [88, 168], 1024: [432, 592] };
  const hors = [];
  const vus = {};
  for (const n of [64, 256, 1024]) {
    await cocher('[data-controle="population"]', n);
    vus[n] = [];
    for (let k = 0; k < 5; k++) {
      const r = await tirageRapide();
      vus[n].push(r?.[0]);
      if (!r || r[0] < BANDES[n][0] || r[0] > BANDES[n][1]) hors.push(`${n} : ${r?.[0]}`);
    }
    const cc = await cases();
    if (!cc || cc.length !== n || cc.filter(Boolean).length !== (comptes(await lecture("restants-comptes")) ?? [0, -1])[1]) hors.push(`${n} : grille ${cc?.length} cases, comptée ${cc?.filter(Boolean).length} ≠ lecture`);
  }
  juger("tirage-juste", hors.length === 0, `5 tirages × 3 populations, à 8 j : 64 → ${vus[64].join(" · ")} ; 256 → ${vus[256].join(" · ")} ; 1024 → ${vus[1024].join(" · ")}${hors.length ? ` — HORS DES BANDES : ${hors.join(" ; ")}` : " (bandes ±5σ : [12;52], [88;168], [432;592])"}`);
  // … et la MOYENNE des cinq, à ±5σ/√5. Les bandes d'un tirage seul laissent
  // passer un biais franc : p majorée de 20 % donne ~446 restants sur 1 024,
  // DANS [432 ; 592]. La moyenne de cinq le voit (bande [476 ; 548] à 1 024) ;
  // elle attrape un biais sur p d'environ 15 % à 1 024, pas 6 % comme la spec
  // l'écrivait (§11.2) — c'est ce qu'elle mesure, et c'est écrit.
  const moy = (v) => v.reduce((a, b) => a + b, 0) / v.length;
  const horsMoy = [64, 256, 1024].filter((n) => Math.abs(moy(vus[n]) - n / 2) > (5 * (Math.sqrt(n) / 2)) / Math.sqrt(5));
  juger("tirage-juste", horsMoy.length === 0, `moyennes des cinq tirages : ${[64, 256, 1024].map((n) => `${n} → ${virgule(moy(vus[n]), 1)} (bande ${virgule(n / 2 - (5 * Math.sqrt(n)) / 2 / Math.sqrt(5), 0)} à ${virgule(n / 2 + (5 * Math.sqrt(n)) / 2 / Math.sqrt(5), 0)})`).join(" ; ")}${horsMoy.length ? ` — HORS : ${horsMoy.join(", ")}` : ""}`);
  // LA DISPERSION DÉCROÎT : écart relatif sur 20 tirages à 64 contre 1024 — attendu 4, bande [2 ; 8]
  const serie = async (n) => { await cocher('[data-controle="population"]', n); const v = []; for (let k = 0; k < 20; k++) v.push((await tirageRapide())?.[0] ?? NaN); return v; };
  const sd = (v) => { const m = v.reduce((a, b) => a + b, 0) / v.length; return Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / (v.length - 1)); };
  const s64 = await serie(64), s1024 = await serie(1024);
  const rapport = sd(s64) / 32 / (sd(s1024) / 512);
  juger("dispersion-decroit", Number.isFinite(rapport) && rapport >= 2 && rapport <= 8, `20 tirages à 64 et à 1024 : écart relatif ${virgule((sd(s64) / 32) * 100, 1)} % contre ${virgule((sd(s1024) / 512) * 100, 1)} % — rapport ${virgule(rapport, 2)} (attendu 4, bande [2 ; 8])`);
  await cocher('[data-controle="population"]', 64);
  await tirageRapide();
  await grilleEtProba("étape 3");
  await sansFuite("la-loi-est-une-loi-de-population");
  await etiquettesLisibles("étape 3 révélée");
  await frontiere("étape 3 révélée");
}

// ═══ Étape 4 : ce que compte le détecteur ═════════════════════════════════
await suivant();
await etatPose("ce-que-compte-le-detecteur");
{
  const axe = await etiquetteTexte("axe-y");
  await avantPari("étape 4", [[`l'axe vertical porte « ${axe} »`, /noyaux/.test(axe) && !/Bq/.test(axe)]]);
  // le quadrillage à 32 jours, sans curseur ni repère : fins et majeurs à leur place
  const g = await cadreGraphe(32);
  if (g) {
    const internes = g.rangee.slice(1, -1).filter((p) => p.pic < 120);
    const fautes = [];
    for (const t of [4, 8, 12, 16, 20, 24, 28]) if (!internes.some((q) => Math.abs(q.centre - X(g, t)) <= 1)) fautes.push(`aucun trait à ${t} j`);
    if (internes.length !== 7) fautes.push(`${internes.length} traits verticaux (attendu 7)`);
    const maj = internes.filter((q) => [8, 16, 24].some((t) => Math.abs(q.centre - X(g, t)) <= 1)), fin = internes.filter((q) => [4, 12, 20, 28].some((t) => Math.abs(q.centre - X(g, t)) <= 1));
    if (!(Math.min(...maj.map((p) => p.pic)) > Math.max(...fin.map((p) => p.pic)))) fautes.push("les majeurs ne sont pas plus appuyés que les fins");
    juger("quadrillage", fautes.length === 0, `étape 4, avant le pari, 32 jours : ${fautes.length ? fautes.join(" ; ") : "fins à 4, 12, 20, 28 j ; majeurs à 8, 16, 24 ; cadre à 32"}`);
    // les AXES LINÉAIRES : les majeurs verticaux équidistants à 1 px, et les horizontaux aussi
    const majeursX = g.rangee.slice(1, -1).filter((p) => p.pic < 120 && p.pic > 40);
    const pos = [8, 16, 24].map((t) => majeursX.find((q) => Math.abs(q.centre - X(g, t)) <= 1.5)?.centre ?? NaN);
    const pasX = [pos[0] - g.x0, pos[1] - pos[0], pos[2] - pos[1], g.x1 - pos[2]];
    // Tolérance 1,5 px, et pourquoi : le produit pose chaque trait au milieu
    // d'un pixel (±0,5 px), deux intervalles peuvent donc différer d'1 px
    // EXACTEMENT — 107 et 108. À « ≤ 1 », l'arrondi flottant du barycentre
    // faisait rougir cette égalité (vague 2 : 107,00 · 108,00, ROUGE) ; elle
    // passait avant par chance. Une échelle logarithmique les écarte de dizaines de px.
    juger("axes-lineaires", pasX.every(Number.isFinite) && Math.max(...pasX) - Math.min(...pasX) <= 1.5, `étape 4 : intervalles des majeurs du temps ${pasX.map((p) => virgule(p, 2)).join(" · ")} px (équidistants à 1,5 px — un pixel de pose, plus l'arrondi)`);
    {
      const col = g.colonne.slice(1, -1).filter((p) => p.pic < 120 && p.pic > 40);
      const ys = [1, 2, 3, 4].map((v) => col.find((q) => Math.abs(q.centre - Y(g, v)) <= 1.5)?.centre ?? NaN);
      const pasY = [g.y1 - ys[0], ys[0] - ys[1], ys[1] - ys[2], ys[2] - ys[3], ys[3] - g.yTop];
      juger("axes-lineaires", pasY.every(Number.isFinite) && Math.max(...pasY) - Math.min(...pasY) <= 1.5, `étape 4 : intervalles des majeurs verticaux ${pasY.map((p) => virgule(p, 2)).join(" · ")} px (équidistants à 1,5 px — une échelle logarithmique les écarterait)`);
    }
    // la courbe des NOYAUX, pour la comparer à celle de l'activité
    var avantBascule = await lireCourbe(g, [2, 6, 10, 14, 18, 22, 26, 30]);
    var gS4 = g;
  }
}
await parier(indexDe("ce-que-compte-le-detecteur", "au-meme-endroit"));
{
  const res = await resultat();
  juger("paris", /Bonne réponse/.test(res), `étape 4, verdict immédiat : « ${res} »`);
  juger("etapes", (await controles()) === "grandeur", `étape 4 révélée : contrôles [${await controles()}]`);
  await cocher('[data-controle="grandeur"]', "activite");
  const axe = await etiquetteTexte("axe-y"), la = await lecture("activite"), ln = await lecture("noyaux");
  juger("nombres", la === `${sci(activite("8", 0))} Bq` && ln === `${sci(noyaux("8", 0))} noyaux` && /𝐴|^A\b/.test(axe) && !/𝑎/.test(axe) && /Bq/.test(axe), `N2 — activité « ${la} » (attendu ${sci(activite("8", 0))} Bq), noyaux « ${ln} », axe « ${axe} » (attendu A, jamais a)`);
  juger("nombres", (await lecture("lambda")) === `0,0866 j⁻¹ · ${sci(lambdaJ("8") / 86400)} s⁻¹`, `λ lue « ${await lecture("lambda")} »`);
  // le tracé ne bouge pas quand l'axe change de grandeur (A = λN, λ constante)
  const g = await cadreGraphe(32);
  if (g && avantBascule) {
    const apres = await lireCourbe(g, [2, 6, 10, 14, 18, 22, 26, 30]);
    const d = Math.max(...apres.map((v, k) => Math.abs(v - avantBascule[k]) * g.pxU));
    juger("courbe-juste", d <= 1.5, `étape 4 : la courbe de l'activité et celle des noyaux à ${d.toFixed(2)} px l'une de l'autre (≤ 1,5 : A = λN ne déplace aucun instant)`);
    const h = await etendueAccent("rangee", Y(g, activite("8", 0) / 1e8 / 2), g.x0 - 4, g.x1);
    const v = await etendueAccent("colonne", X(g, 8), g.yTop, g.y1 + 6);
    const ok = h && v && Math.abs(h.a - X(g, 8)) <= 5 && Math.abs(v.a - g.y1) <= 5;
    juger("lecture-t-demi", ok, `étape 4, sur l'activité : la construction finit à ${h ? virgule(h.a, 0) : "?"} px (attendu ${virgule(X(g, 8), 0)}), sur l'axe du temps à ${v ? virgule(v.a, 0) : "?"} px`);
  }
  juger("un-seul-echantillon", (await attr("data-deux-courbes")) === "non" && !(await repere("second-0")), "étape 4 : une seule courbe");
  await sansFuite("ce-que-compte-le-detecteur");
  await etiquettesLisibles("étape 4 révélée");
  await frontiere("étape 4 révélée");
  await cocher('[data-controle="grandeur"]', "noyaux");
}

// ═══ Étape 5 : libre ══════════════════════════════════════════════════════
await suivant();
await etatPose("libre");
await avantPari("étape 5", [["une seconde courbe AVANT le pari", (await attr("data-deux-courbes")) === "non" && !(await repere("second-0"))]]);
await parier(indexDe("libre", "deux-fois-plus-grande"));
{
  const res = await resultat();
  juger("paris", /incorrecte/.test(res), `étape 5, pari faux (λ double, t½ double) : « ${res} » — verdict immédiat`);
  juger("etapes", (await controles()) === "depart,grandeur,instant,isotope", `étape 5 révélée, la courbe : contrôles [${await controles()}]`);
  // la seconde courbe, en accent, passe par le croisement (4 j ; 2) — le crochet
  // est d'abord écarté : posé à 0, sa barre (à l'encre sur l'iode, depuis la
  // vague 2) passe SUR ce croisement
  await glisser("depart", 20);
  const g = await cadreGraphe(32);
  if (g) {
    const v = await etendueAccent("colonne", X(g, 4), g.yTop + 2, g.y1 - 3);
    const centres = v ? v.runs.map((r) => (r.de + r.a) / 2) : [];
    const ok = centres.some((c) => Math.abs(c - Y(g, 2)) <= 2.5);
    juger("courbe-juste", ok, `étape 5 : la seconde courbe coupe 4 j à ${centres.map((c) => virgule((g.y1 - c) / g.pxU, 2)).join(" · ") || "?"} (attendu 2, le croisement d'un fin et d'un majeur)`);
  }
  await cocher('[data-controle="isotope"]', "4");
  const fautes = [];
  if ((await lecture("demi-vie")) !== "4,0 jours") fautes.push(`demi-vie « ${await lecture("demi-vie")} »`);
  if ((await lecture("lambda")) !== `0,173 j⁻¹ · ${sci(lambdaJ("4") / 86400)} s⁻¹`) fautes.push(`λ « ${await lecture("lambda")} »`);
  if ((await lecture("tau")) !== `${troisCs(1 / lambdaJ("4"))} jours`) fautes.push(`τ « ${await lecture("tau")} »`);
  // N6 — la cohérence t½ = τ ln 2 sur les valeurs AFFICHÉES
  const num = (s) => parseFloat(s.replace(/[^\d,]/g, "").replace(",", "."));
  const coh = Math.abs(num(await lecture("tau")) * Math.LN2 - num(await lecture("demi-vie"))) / num(await lecture("demi-vie"));
  if (coh > 0.01) fautes.push(`t½ = τ ln 2 à ${(coh * 100).toFixed(1)} %`);
  for (let t1 = 0; t1 <= 24; t1 += 3) { await glisser("depart", t1); const ld = await lecture("duree-de-moitie"); if (ld !== "4,0 jours") fautes.push(`isotope rapide, t₁ = ${t1} : « ${ld} »`); }
  for (let k = 0; k <= 20; k += 4) { await glisser("instant", k * 0.5); const ln = await lecture("noyaux"); if (ln !== `${sci(noyaux("4", k * 0.5))} noyaux`) fautes.push(`isotope rapide, t = ${k * 0.5} : « ${ln} »`); }
  await cocher('[data-controle="grandeur"]', "activite");
  await glisser("instant", 0);
  if ((await lecture("activite")) !== `${sci(activite("4", 0))} Bq`) fautes.push(`activité « ${await lecture("activite")} » (attendu ${sci(activite("4", 0))} Bq)`);
  await cocher('[data-controle="grandeur"]', "noyaux");
  await cocher('[data-controle="isotope"]', "8");
  if ((await lecture("tau")) !== `${troisCs(1 / lambdaJ("8"))} jours`) fautes.push(`τ de l'iode « ${await lecture("tau")} »`);
  juger("nombres", fautes.length === 0, `N4 · N5 · N6 — les deux isotopes${fautes.length ? ` : ${fautes.slice(0, 4).join(" ; ")}` : " : λ, τ, t½, activité, crochet et curseur exacts ; t½ = τ ln 2"}`);
  // le crochet de l'isotope rapide : un intervalle FIN (4 j), aux pixels
  await cocher('[data-controle="isotope"]', "4");
  const larg = [];
  for (const t1 of [0, 9, 20]) {
    await glisser("depart", t1);
    larg.push(await largeurCrochet(g));
  }
  juger("crochet-invariant", g && larg.every((w) => Math.abs(w - 4 * g.pxJ) <= 2), `isotope rapide : crochets de ${larg.map((w) => virgule(w, 1)).join(" · ")} px (un intervalle fin : ${g ? virgule(4 * g.pxJ, 1) : "?"} px, à 2 px)`);
  await cocher('[data-controle="isotope"]', "8");
  // LE CROCHET A LA TEINTE DE SA COURBE, et les courbes se nomment dans la
  // légende (vague 2, captures). Dans les deux sens : sur l'iode, aucune encre
  // d'accent sur la barre du crochet (y = 2, de 0,5 à 3,5 jours — la courbe
  // accent n'y passe pas, elle est à 2,18 à 3,5 j) ; sur le second isotope, la
  // même barre, en accent, couvre ce segment.
  if (g) {
    await glisser("depart", 0);
    const surIode = await etendueAccent("rangee", Y(g, 2), X(g, 0.5), X(g, 3.5));
    await cocher('[data-controle="isotope"]', "4");
    const surSecond = await etendueAccent("rangee", Y(g, 2), X(g, 0.5), X(g, 3.5));
    await cocher('[data-controle="isotope"]', "8");
    const couvre = (v) => (v ? v.runs.reduce((n, r) => n + (r.a - r.de), 0) : 0);
    const lIode = couvre(surIode), lSecond = couvre(surSecond), attendu = X(g, 3.5) - X(g, 0.5);
    juger("crochet-invariant", lIode <= 2 && lSecond >= attendu - 4,
      `étape 5 : barre du crochet, d'accent sur ${virgule(lIode, 0)} px quand il mesure l'iode (attendu 0 : l'encre de SA courbe), sur ${virgule(lSecond, 0)} px quand il mesure le second isotope (attendu ≈ ${virgule(attendu, 0)})`);
    const cle = await panneau.evaluate((el) => (el.querySelector("[data-legende] [data-cle-courbes]")?.textContent ?? "").replace(/\s+/g, " ").trim());
    // et le texte LU les sépare (« iode 131second isotope » au premier passage)
    juger("etiquettes", /iode 131\W+second isotope/.test(cle), `étape 5 : la légende nomme les deux courbes, séparées à la lecture (« ${cle || "rien"} »)`);
  }
  await frontiere("étape 5 révélée, la courbe");
  await etiquettesLisibles("étape 5 révélée, la courbe");
  const brut = (await latexBrut()).length;
  juger("latex", brut === 0, `étape 5 révélée : ${brut} fragment(s) de LaTeX brut`);
  // l'autre appareil : la grille, à l'étape libre
  await cocher("[data-vue-support]", "grille");
  juger("etapes", (await controles()) === "isotope,population" && !!(await repere("grille-0")), `étape 5, la grille : contrôles [${await controles()}], grille ${(await repere("grille-0")) ? "présente" : "ABSENTE"}`);
  await cocher('[data-controle="isotope"]', "4");
  await cocher('[data-controle="population"]', 1024);
  const r = await tirageRapide();
  // quatre demi-vies en seize jours : 1024 / 16 = 64, bande large de la porte
  juger("tirage-juste", r && r[1] >= 30 && r[1] <= 100 && r[0] >= 432 && r[0] <= 592, `isotope rapide, 1024 noyaux : ${r?.[0]} à 4 j, ${r?.[1]} à 16 j (bandes [432;592] et [30;100])`);
  await grilleEtProba("étape 5, isotope rapide");
  await frontiere("étape 5 révélée, la grille");
}

} catch (e) {
  noter("parcours", false, `le parcours s'est arrêté à l'étape « ${await attr("data-scene-etape").catch(() => "?")} » (pari ${await attr("data-pari").catch(() => "?")}) : ${String(e?.message ?? e).split("\n")[0]}`);
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

// ── Au téléphone (390 px) : les étiquettes se lisent encore, étape 1 révélée ──
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
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 1 révélée", q);
    await q.getByRole("button", { name: "Étape suivante" }).click();
    await q.locator("[data-pari-choix] li button").nth(2).click();
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 2 révélée", q);
    // Les étapes 3 à 5 AUSSI (vague 2, captures) : à 390 px, étape 5, « second
    // isotope » s'était posé dans la rangée des nombres du temps et masquait le
    // « 8 » — la porte ne mesurait au téléphone que les étapes 1 et 2, et le
    // placement ne se juge qu'aux dimensions où il se fait (ADR 0031 : la PORTÉE
    // se mesure à part).
    await q.getByRole("button", { name: "Étape suivante" }).click();
    await q.locator("[data-pari-choix] li button").nth(1).click();
    await q.locator("[data-lancer]").click();
    await p2.waitForFunction((sc) => document.querySelector(`[data-scene="${sc}"]`)?.getAttribute("data-pari") === "revele", SCENE, { timeout: 30000 }).catch(() => {});
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 3 révélée", q);
    await q.getByRole("button", { name: "Étape suivante" }).click();
    await q.locator("[data-pari-choix] li button").first().click();
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 4 révélée", q);
    await q.getByRole("button", { name: "Étape suivante" }).click();
    await q.locator("[data-pari-choix] li button").nth(1).click();
    await p2.waitForTimeout(200);
    await etiquettesLisibles("390 px, étape 5 révélée, la courbe", q);
  } finally {
    await nav2.close();
  }
}

// ── Sans mouvement (prefers-reduced-motion) : la grille CALCULE sans animer —
//    l'image finale arrive d'un coup, aucun instant intermédiaire. ──
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
    for (let k = 0; k < 2; k++) { await q.getByRole("button", { name: "Étape suivante" }).click(); await p3.waitForTimeout(120); }
    await q.locator("[data-pari-choix] li button").first().click();
    const vus = await q.evaluate(async (el) => {
      const ts = new Set();
      el.querySelector("[data-lancer]").click();
      const t0 = performance.now();
      while (performance.now() - t0 < 1500) {
        await new Promise((r) => requestAnimationFrame(r));
        ts.add(el.getAttribute("data-t-jours"));
        if (el.getAttribute("data-course-finie") === "oui" && performance.now() - t0 > 400) break;
      }
      return { ts: [...ts], finie: el.getAttribute("data-course-finie") };
    });
    const intermediaires = vus.ts.filter((t) => t !== "0" && t !== "16");
    juger("sans-mouvement", vus.finie === "oui" && intermediaires.length === 0, `mouvement réduit demandé : course ${vus.finie === "oui" ? "finie" : "PAS finie"} en moins de 1,5 s ; instants vus [${vus.ts.join(", ")}] — ${intermediaires.length ? "des images INTERMÉDIAIRES" : "aucune image intermédiaire"}`);
  } finally {
    await nav3.close();
  }
}

// ── Ergonomie : le clavier et le téléphone, sur le rendu (famille commune) ──
await ergonomie({ lancer: () => lancer(), url: URL_SCENE, scene: SCENE, noter, essai: ESSAI, ouvrir: OUVRIR, course: 2 });

// ── Verdict ──
console.log(`\n${ESSAI ? "ESSAI ROUGE — " : ""}scene-noyaux : la courbe et les noyaux (${URL_SCENE})`);
for (const r of resultats) console.log(`  ${r.ok ? "·" : "✘"} [${r.famille}] ${r.detail}`);
for (const a of avertissements) console.log(`  ⚠ [performance] ${a}`);
if (!pret) { console.error("\nMUET — la scène n'a pas pu dessiner ici : la porte ne peut rien dire des pixels."); process.exit(3); }
if (ESSAI) {
  const visees = ["avant-clic", "pas-de-3d", "etapes", "avant-pari", "paris", "nombres", "quadrillage", "courbe-juste", "axes-lineaires", "fenetre-s1", "lecture-t-demi", "crochet-invariant", "un-seul-echantillon", "case-ne-se-rallume-pas", "eclairs", "grille-comptee", "tirage-vivant", "tirage-juste", "dispersion-decroit", "sans-mouvement", "frontiere", "latex", "fuite-inter-etapes", "etiquettes", "cadre", "ergonomie"];
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
console.log(rouges.length ? `\nROUGE — ${rouges.length} manquement(s) sur ${resultats.length} mesures, ${familles} familles.` : `\n${avertissements.length ? "VERT AVEC AVERTISSEMENT" : "VERT"} — ${resultats.length} mesures, ${familles} familles.`);
process.exit(rouges.length ? 1 : 0);
