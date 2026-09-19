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
 * MESURE À L'ÉCRITURE (2026-09-05) : 72 pages visitées, 108 cibles internes
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
// Motif d'impression.mjs et de dom-truth, mot pour mot : si BASE n'est pas
// fourni, l'instrument lève son PROPRE serveur et le tue en sortant. C'est
// ce qui lui permet d'entrer en CI, où aucun serveur partagé ne tourne.
const PORT = Number(process.env.PORT_LIENS ?? 3700 + (process.pid % 200));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

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

// ── PORTÉE, corrigée le 2026-09-19 ────────────────────────────────────────────
// Cet instrument balayait 10 routes fixes + les 62 notions = 72 pages, et
// AUCUNE page d'épreuve. Son « 0 lien mort » ne portait donc que sur le versant
// leçon : la moitié la plus dense en liens du site — les épreuves et leurs
// corrigés — n'était pas regardée du tout. Un vert qui ne dit pas « conforme »
// mais « pas regardé » (ADR 0031 : la PORTÉE se mesure séparément du
// fonctionnement). Les routes d'épreuve sont désormais énumérées par la même
// source que les portes impression et presse-papier, pour qu'une épreuve neuve
// entre dans le balayage sans qu'on ait à y penser.
{
  const { execFileSync } = await import("node:child_process");
  const brut = execFileSync(process.execPath, [path.join(WEB, "scripts", "routes-examens.mjs")], {
    encoding: "utf8",
  });
  const examens = brut.split(/\s+/).filter((r) => r.startsWith("/examens/"));
  if (!examens.length) {
    console.error("liens-internes : routes-examens.mjs n'a rendu aucune route — portée incomplète, j'arrête");
    process.exit(2);
  }
  pages.push(...examens);
}

let serveur = null;
if (AUTONOME) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const debut = Date.now();
  let pret = false;
  while (Date.now() - debut < 60000) {
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) {
    console.error("✗ serveur absent — aucun lien n'est vérifié");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

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
arreter();

console.log(
  morts === 0
    ? `\nliens internes : ${pages.length} pages visitées, ${cibles.size} cibles distinctes, 0 morte ✓`
    : `\n${morts} lien(s) interne(s) mort(s) sur ${cibles.size} cibles distinctes.`
);
if (morts > 0) process.exitCode = 1;
