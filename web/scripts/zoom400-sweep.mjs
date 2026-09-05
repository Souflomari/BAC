/**
 * Balayage ZOOM 400 % — la forme stricte de WCAG SC 1.4.10 (Reflow).
 *
 * CE QUE LA NORME DIT VRAIMENT, et pourquoi les deux mesures précédentes ne
 * le disaient pas : le contenu doit se présenter SANS DÉFILEMENT À DEUX
 * DIMENSIONS à une largeur équivalente à **320 px CSS** ET une hauteur
 * équivalente à **256 px CSS** — c'est exactement une fenêtre 1280 × 1024
 * zoomée à 400 %. `etroit-sweep` mesure 320 px de large à HAUTEUR NORMALE ;
 * `zoom-sweep` double le texte à 1280 de large. Aucun des deux ne met la
 * hauteur sous pression.
 *
 * ET C'EST LA HAUTEUR QUI FAIT MAL. Sur 256 px, un en-tête collant de 56 px
 * mange 22 % de l'écran ; un bandeau de progression en mange encore. Ce qui
 * reste pour LIRE peut tomber sous la moitié. Une personne malvoyante qui
 * zoome à 400 % lit alors une leçon par la fente d'une boîte aux lettres.
 *
 * CE QU'ON MESURE, quatre faits par page :
 *   1. le débord horizontal (`scrollWidth > innerWidth`) — le défilement à
 *      deux dimensions que la norme interdit ;
 *   2. la part de la hauteur prise par les éléments COLLANTS (position
 *      sticky/fixed visibles) — le seuil de confort retenu ici est 25 %,
 *      au-delà on le signale ;
 *   3. qu'il reste au moins 3 lignes de prose visibles sous les barres ;
 *   4. que la navigation par chapitre reste ATTEIGNABLE (le menu compact,
 *      qui est déjà la garde de dom-truth à 390 px).
 *
 * Ce n'est PAS une porte tant que la classe n'est pas propre.
 */
import { chromium } from "playwright-core";
import { execSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const routes = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (existsSync(`${d}/${s}/lesson.md`)) routes.push(`/notions/${m}/${s}`);
  }
}
// LES 39 ÉPREUVES, lues là où la liste est vraie (2026-09-05). Une seule
// figurait ici, et revenait propre parce que l'énoncé n'était pas dans le DOM.
const examens = execSync("node scripts/routes-examens.mjs", { cwd: process.cwd(), encoding: "utf8" }).trim().split(" ");
const AUTRES = ["/", "/matieres/maths", "/matieres/pc", "/matieres/svt", "/examens",
                ...examens, "/commencer", "/atelier"];

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
// 320 × 256 CSS px : la fenêtre 1280 × 1024 vue à 400 %.
const page = await nav.newPage({ viewport: { width: 320, height: 256 } });

let debords = 0, barres = 0, etroits = 0, sansNav = 0, vus = 0;
const dits = [];

for (const route of [...AUTRES, ...routes]) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 120000 });
  // L'énoncé, puis le corrigé : les deux temps d'une épreuve.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) { await terminer.first().click(); await page.waitForTimeout(250); }
  }
  await page.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false)));
  vus++;
  const m = await page.evaluate(() => {
    const H = window.innerHeight;
    const collants = [...document.querySelectorAll("body *")].filter((e) => {
      const cs = getComputedStyle(e);
      if (cs.position !== "sticky" && cs.position !== "fixed") return false;
      const r = e.getBoundingClientRect();
      return r.height > 4 && r.width > 40 && cs.visibility !== "hidden" && cs.display !== "none";
    });
    // On ne compte QUE les bandes qui touchent le haut ou le bas : un
    // élément collant au milieu d'une colonne ne vole pas de hauteur.
    const bandes = collants
      .map((e) => ({ e, r: e.getBoundingClientRect() }))
      .filter(({ r }) => r.top <= 2 || r.bottom >= H - 2);
    // fusion des bandes qui se recouvrent, pour ne pas compter deux fois un
    // en-tête et son enfant collant
    let hauteur = 0;
    const tri = bandes.map(({ r }) => [Math.max(0, r.top), Math.min(H, r.bottom)]).sort((a, b) => a[0] - b[0]);
    let fin = -1;
    for (const [a, b] of tri) {
      if (a > fin) { hauteur += b - a; fin = b; }
      else if (b > fin) { hauteur += b - fin; fin = b; }
    }
    const nommees = [...new Set(bandes.map(({ e }) => e.tagName.toLowerCase() +
      (typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/)[0] : "")))];
    // hauteur de ligne de la prose, pour dire « combien de lignes restent »
    const p = document.querySelector(".prose-lesson p, main p, p");
    const interligne = p ? parseFloat(getComputedStyle(p).lineHeight) || 24 : 24;
    const menu = [...document.querySelectorAll("details")].some((d) =>
      d.querySelector("summary")?.textContent?.includes("Chapitre") && getComputedStyle(d).display !== "none");
    return {
      debord: document.documentElement.scrollWidth - window.innerWidth,
      hauteurBarres: Math.round(hauteur),
      part: Math.round((hauteur / H) * 100),
      lignes: Math.floor((H - hauteur) / interligne),
      nommees,
      chapitres: document.querySelectorAll("[data-chapter-section]").length,
      menu,
    };
  });

  const ennuis = [];
  if (m.debord > 0) { debords++; ennuis.push(`débord ${m.debord}px`); }
  if (m.part > 25) { barres++; ennuis.push(`barres collantes ${m.hauteurBarres}px = ${m.part}% (${m.nommees.join(", ")})`); }
  if (m.lignes < 3) { etroits++; ennuis.push(`${m.lignes} ligne(s) de prose sous les barres`); }
  if (m.chapitres > 1 && !m.menu) { sansNav++; ennuis.push("pas de menu de chapitres atteignable"); }
  if (ennuis.length) dits.push(`  ${route}\n       ${ennuis.join(" · ")}`);
}

console.log(`\n320 × 256 px (1280 × 1024 à 400 %) — ${vus} pages`);
console.log(`  débord horizontal        : ${debords}`);
console.log(`  barres collantes > 25 %  : ${barres}`);
console.log(`  moins de 3 lignes de prose: ${etroits}`);
console.log(`  navigation inatteignable : ${sansNav}`);
if (dits.length) { console.log("\nDÉTAIL"); for (const d of dits.slice(0, 25)) console.log(d); }
if (dits.length > 25) console.log(`  … et ${dits.length - 25} de plus`);
await nav.close();
