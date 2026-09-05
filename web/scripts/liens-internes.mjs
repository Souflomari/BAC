/**
 * liens-internes.mjs — un lien du produit mène-t-il quelque part ?
 *
 * `liens-fichiers.mjs` garde les renvois des DOCUMENTS (un chemin cité dans
 * un .md existe-t-il). Celui-ci pose la même question du côté de l'ÉLÈVE : de
 * tous les `<a href="/…">` que le site rend, combien répondent autre chose
 * qu'un 200 ?
 *
 * Personne ne l'avait posée. Elle a un intérêt propre : une route peut
 * disparaître d'un build (les bancs `/options/masthead`, `/options/home` et
 * `/options/end` ont été purgés en août) sans que le lien qui la citait
 * disparaisse avec elle.
 *
 * MESURE À L'ÉCRITURE (2026-09-05) : 74 pages visitées, 108 cibles internes
 * distinctes, **0 morte**. La classe est propre.
 *
 * PAS DE PORTE, ET C'EST DÉLIBÉRÉ. Le job CI venait d'être mesuré à ~30 min
 * pour un budget de 30 — trois portes ne s'exécutaient plus du tout. Ajouter
 * ~180 navigations à ce job aurait aggravé exactement le défaut qu'on venait
 * de constater. L'instrument existe, se lance à la demande, et sa mise en
 * porte attend que le budget CI soit assaini (parallélisation des portes
 * navigateur, ou serveur partagé entre elles).
 *
 * ⚠️ À LANCER DEPUIS `web/`. Nécessite un serveur : `BASE=http://…` ou un
 * `next start` local.
 *
 *   BASE=http://127.0.0.1:3497 node scripts/liens-internes.mjs
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CONTENU = path.resolve(WEB, "..", "content");
const BASE = process.env.BASE ?? "http://127.0.0.1:3497";

const pages = [
  "/", "/examens", "/atelier", "/commencer", "/connexion",
  "/matieres/maths", "/matieres/pc", "/matieres/svt", "/matieres/philo", "/matieres/si",
];
for (const s of fs.readdirSync(CONTENU)) {
  const d = path.join(CONTENU, s);
  if (!fs.statSync(d).isDirectory() || s.startsWith("_")) continue;
  for (const n of fs.readdirSync(d)) {
    if (fs.statSync(path.join(d, n)).isDirectory()) pages.push(`/notions/${s}/${n}`);
  }
}

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const p = await nav.newPage({ viewport: { width: 1600, height: 900 } });

const cibles = new Map(); // href → pages qui le citent
for (const r of pages) {
  const res = await p.goto(BASE + r, { waitUntil: "domcontentloaded" });
  if (!res || res.status() !== 200) {
    console.error(`✗ page de départ ${r} — HTTP ${res ? res.status() : "?"}`);
    process.exitCode = 1;
    continue;
  }
  // Les chapitres sont présents-mais-masqués ; les <details> aussi. On déplie
  // pour voir TOUS les liens de la leçon, pas seulement ceux du chapitre actif.
  await p.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await p.waitForTimeout(60);
  const hrefs = await p.evaluate(() =>
    [...document.querySelectorAll("a[href]")]
      .map((a) => a.getAttribute("href"))
      .filter((h) => h && h.startsWith("/"))
  );
  for (const h of hrefs) {
    const clef = h.split("#")[0].split("?")[0];
    if (!cibles.has(clef)) cibles.set(clef, []);
    const l = cibles.get(clef);
    if (l.length < 3) l.push(r);
  }
}

let morts = 0;
for (const [href, citants] of cibles) {
  const res = await p.goto(BASE + href, { waitUntil: "domcontentloaded" }).catch(() => null);
  const st = res ? res.status() : 0;
  if (st === 200) continue;
  morts++;
  console.log(`✗ HTTP ${String(st).padStart(3)}  ${href}   cité par ${citants.join(", ")}`);
}
await nav.close();

console.log(
  morts === 0
    ? `\nliens internes : ${pages.length} pages visitées, ${cibles.size} cibles distinctes, 0 morte ✓`
    : `\n${morts} lien(s) interne(s) mort(s) sur ${cibles.size} cibles distinctes.`
);
if (morts > 0) process.exitCode = 1;
