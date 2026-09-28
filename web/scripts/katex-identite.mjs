/**
 * katex-identite — la preuve que `rehypeKatexHtml` ne change RIEN au rendu.
 *
 * Le remplacement de `rehype-katex` (arbre React de 40 nœuds par formule)
 * par une chaîne HTML unique n'est acceptable qu'à une condition : que le
 * DOM produit soit identique AU CARACTÈRE PRÈS. Ce script l'établit sur le
 * corpus entier, pas sur un échantillon.
 *
 *   node scripts/katex-identite.mjs --capturer .empreintes/avant
 *   (on change le code, on rebuild)
 *   node scripts/katex-identite.mjs --comparer .empreintes/avant
 *
 * CE QU'ON COMPARE. Le HTML servi, débarrassé de ce qui change à chaque
 * build sans rien dire du rendu : la charge RSC dans les <script> (elle
 * DOIT changer — c'est tout l'objet du travail), les balises <script> et
 * <link> (chemins hachés par le build), et l'empreinte de commit du pied de
 * page. Ce qui reste est le balisage que
 * l'élève reçoit.
 */
import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const args = process.argv.slice(2);
const dir = args[1];
if (!dir || !["--capturer", "--comparer"].includes(args[0])) {
  console.error("usage: katex-identite.mjs --capturer|--comparer <dossier>");
  process.exit(2);
}

const routes = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (existsSync(`${d}/${s}/lesson.md`)) routes.push(`/notions/${m}/${s}`);
  }
}
routes.push("/", "/examens", "/examens/spc-2023-normale", "/matieres/pc", "/matieres/maths", "/matieres/svt", "/atelier", "/commencer");

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
// `reducedMotion` : sans lui, GSAP pose des styles en ligne sur chaque
// groupe d'une figure animée — jusqu'à 108 ko d'écart entre deux captures
// de la MÊME page, selon qu'il avait démarré ou non. Ce n'est pas du bruit
// qu'on masque, c'est une condition qu'on fixe.
const contexte = await navigateur.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: "reduce",
});
const page = await contexte.newPage();

const tirer = async (route) => {
  await page.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 120000 });
  // L'en-tête rend une barre différente une fois hydraté : il faut ATTENDRE
  // l'hydratation, pas l'espérer. `networkidle` puis une pause franche.
  await page.waitForLoadState("networkidle", { timeout: 120000 }).catch(() => {});
  await page.waitForTimeout(1200);
  return page.evaluate(() => document.documentElement.outerHTML);
};

const normaliser = (h) =>
  h
    .replace(/<script>self\.__next_f\.push\([\s\S]*?\)<\/script>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<link[^>]*>/g, "")
    // l'empreinte de build change à chaque commit et ne dit rien du rendu
    .replace(/data-build-sha="[^"]*"/g, 'data-build-sha="—"');

mkdirSync(dir, { recursive: true });
const nom = (r) => r.replace(/\//g, "_") || "_racine";

if (args[0] === "--capturer") {
  for (const r of routes) {
    const h = normaliser(await tirer(r));
    writeFileSync(`${dir}/${nom(r)}.html`, h);
  }
  console.log(`capturé : ${routes.length} routes dans ${dir}`);
} else {
  let differents = 0;
  for (const r of routes) {
    const f = `${dir}/${nom(r)}.html`;
    if (!existsSync(f)) { console.log(`  ?? pas d'empreinte pour ${r}`); continue; }
    const avant = readFileSync(f, "utf8");
    const apres = normaliser(await tirer(r));
    if (avant === apres) continue;
    differents++;
    const ha = createHash("sha256").update(avant).digest("hex").slice(0, 8);
    const hb = createHash("sha256").update(apres).digest("hex").slice(0, 8);
    console.log(`  DIFFÉRENT ${r}  ${ha} → ${hb}  (${avant.length} → ${apres.length} octets)`);
    // premier écart, en contexte
    let i = 0;
    while (i < avant.length && i < apres.length && avant[i] === apres[i]) i++;
    console.log(`     à l'octet ${i}`);
    console.log(`     avant : …${JSON.stringify(avant.slice(Math.max(0, i - 60), i + 100))}`);
    console.log(`     après : …${JSON.stringify(apres.slice(Math.max(0, i - 60), i + 100))}`);
  }
  console.log(`\n${routes.length} routes · ${differents} différentes`);
  await navigateur.close();
  process.exit(differents ? 1 : 0);
}
await navigateur.close();
