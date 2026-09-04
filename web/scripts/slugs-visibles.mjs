/**
 * slugs-visibles — les noms de DOSSIER qui arrivent sous les yeux d'un élève.
 *
 * Même classe que les codes de barreau : du vocabulaire de rédaction laissé
 * dans le texte. « Tu as déjà rencontré, dans la leçon sur la vérité
 * (la-verite, chapitre 6), la démarche de Descartes » — `la-verite` est un
 * nom de dossier. L'élève ne l'a jamais vu ; le titre, « La vérité », il le
 * lit dans le rail et dans le fil d'Ariane.
 *
 * On compte sur le RENDU, `innerText`, chapitres dépliés : ce que le
 * navigateur donne à lire, pas ce que la source contient.
 *
 * Un slug est reconnu à son TIRET : `la-verite`, `suites-numeriques`. Les
 * slugs d'un seul mot — `autrui`, `travail`, `bonheur` — sont exclus, parce
 * qu'ils sont aussi des mots français ordinaires et que la leçon de philo
 * « Autrui » écrit légitimement « autrui » à chaque paragraphe.
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const routes = [];
const slugs = new Set();
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (!existsSync(`${d}/${s}/lesson.md`)) continue;
    routes.push(`/notions/${m}/${s}`);
    if (s.includes("-")) slugs.add(s);
  }
}

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await nav.newPage({ viewport: { width: 1280, height: 900 } });
let total = 0;
const detail = [];
for (const r of routes) {
  await page.goto(`${BASE}${r}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false)));
  const m = await page.evaluate((liste) => {
    const t = document.body.innerText;
    const trouves = {};
    for (const s of liste) {
      const re = new RegExp(`(?<![\\\\w/-])${s.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}(?![\\\\w/-])`, "g");
      const n = (t.match(re) || []).length;
      if (n) {
        const i = t.search(re);
        trouves[s] = { n, ctx: t.slice(Math.max(0, i - 60), i + 50).replace(/\s+/g, " ") };
      }
    }
    return trouves;
  }, [...slugs]);
  const n = Object.values(m).reduce((a, x) => a + x.n, 0);
  if (!n) continue;
  total += n;
  detail.push({ r, m, n });
}
detail.sort((a, b) => b.n - a.n);
console.log(`VISIBLE À L'ÉCRAN : ${total} slug(s) de leçon sur ${detail.length} page(s)\n`);
for (const d of detail) {
  console.log(`  ${String(d.n).padStart(3)}  ${d.r}`);
  for (const [s, v] of Object.entries(d.m).slice(0, 3)) console.log(`        ${s} ×${v.n} — …${v.ctx}…`);
}
await nav.close();
process.exit(total ? 1 : 0);
