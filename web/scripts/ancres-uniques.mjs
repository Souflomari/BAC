/**
 * ancres-uniques.mjs — deux sections ne peuvent pas porter la même ancre.
 *
 * POURQUOI. Chaque titre d'une leçon porte une ancre « § » (audit U5) : un
 * élève peut copier un lien profond vers la section qu'il lit, pour y revenir
 * ou l'envoyer à quelqu'un. Cette promesse repose entièrement sur l'unicité
 * de l'`id` du titre.
 *
 * LE DÉFAUT QUE CET INSTRUMENT A TROUVÉ (2026-09-05 ; consigné en juillet
 * dans LESSON-EXPERIENCE-SPEC §6 et jamais repris). Depuis la pagination,
 * `LessonRenderer` est appelé une fois par SEGMENT de prose, et `rehype-slug`
 * remet son compteur d'unicité à zéro à chaque passe. Résultat mesuré :
 * `maths/suites-numeriques` portait HUIT titres « L'erreur à repérer » avec
 * le même id — sept ancres sur huit renvoyaient à la première.
 *
 * CE QU'IL JUGE, ET CE QU'IL NE JUGE PAS. Uniquement les ids de TITRES
 * (h1–h6) : ce sont eux que l'ancre « § » publie. Les ids internes des SVG
 * (`step-1`, un dégradé, un `clipPath`) sont eux aussi dupliqués dans le
 * document — une même figure peut être posée plusieurs fois — mais c'est sans
 * effet ici, vérifié deux fois : `MediaDiagram` masque les étapes en
 * réécrivant le MARKUP de chaque figure (jamais par `getElementById`), et un
 * balayage statique du corpus n'a trouvé AUCUN identifiant défini
 * DIFFÉREMMENT par deux figures d'une même notion tout en étant déréférencé
 * par `url(#…)`. Armer une porte sur « aucun id dupliqué » aurait donc été
 * rouge sur un fait inoffensif — et aurait fini désarmée.
 *
 * CE RAISONNEMENT EST TENU, ET IL EST DÉSORMAIS OUTILLÉ (2026-09-21, §11.172).
 * La conclusion « pas de porte large » laissait le DANGER sans garde : le jour
 * où quelqu'un modifie une seule des deux définitions identiques, la figure
 * éditée continue de peindre avec l'ancienne, sans un mot. La condition
 * nommée ci-dessus — même id, définitions DIFFÉRENTES, et déréférencé — est
 * exactement celle que garde `figures-id-divergents.mjs`. Elle est verte
 * aujourd'hui, et elle reste muette sur les doublons inoffensifs : 49 notions
 * sur 51 définissent un `step-N` différemment d'une figure à l'autre, et la
 * porte ne dit rien, parce que personne ne les déréférence.
 *
 *   node scripts/ancres-uniques.mjs [routes…]           → le rapport
 *   node scripts/ancres-uniques.mjs --porte [routes…]   → la porte (CI)
 *
 * Sans routes, toutes les leçons du corpus.
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const REPO = path.resolve(WEB, "..");
const PORTE = process.argv.includes("--porte");
// PORT UNIQUE PAR EXÉCUTION (2026-09-05). Les ports fixes se marchaient
// dessus : `copie-maths` et `ancres-uniques` réclamaient tous deux 3497,
// `donnees-sweep` et `accents-manquants` tous deux 3496. Chaque porte lance
// son propre `next start` détaché et le tue en fin de course — mais tuer
// l'enveloppe `npx` ORPHELINE son enfant `next-server`, défaut déjà écrit en
// toutes lettres dans l'en-tête de dom-truth. Une porte qui trouve le port
// occupé sonde alors le serveur d'une AUTRE porte : au mieux elle mesure un
// build voisin, au pire elle attend.
//
// C'est le motif de dom-truth, mot pour mot : l'espace 3200-3699 est assez
// large pour que deux exécutions simultanées ne se croisent pas.
const PORT = Number(process.env.PORT ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

let routes = process.argv.slice(2).filter((a) => a.startsWith("/"));
if (!routes.length) {
  routes = [];
  for (const m of fs.readdirSync(path.join(REPO, "content"))) {
    const d = path.join(REPO, "content", m);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const s of fs.readdirSync(d))
      if (fs.existsSync(path.join(d, s, "lesson.md"))) routes.push(`/notions/${m}/${s}`);
  }
  routes.sort();
}

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  let pret = false;
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
  }
  if (!pret) { console.error("✗ serveur absent — rien n'est mesuré"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
// LE CROCHET « exit » NE SUFFIT PAS, ET C'EST CE QUI A TRONQUÉ LA CI
// (mesuré le 2026-09-05). Un enfant `spawn`é garde un handle sur la boucle
// d'événements du parent tant qu'il n'est pas `unref()`. Sans ça, Node ne
// décide JAMAIS de sortir — et le crochet « exit », qui devait tuer le
// serveur, attend un événement que le serveur empêche. Boucle fermée.
//
// Le chemin d'ÉCHEC s'en sortait (`process.exit(1)` est brutal) ; le chemin
// de SUCCÈS imprimait « porte tenue ✓ » puis restait en vie. Sur le run CI
// 442 : la porte a fini son travail à ~15:03, et le job a été tué à 15:10:43
// par la limite de 30 min, emportant les DEUX portes suivantes (données,
// hygiène model-id) qui n'ont jamais tourné. La pastille disait « cancelled ».
serveur?.unref();
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await nav.newPage();
const fautifs = [];
let titresVus = 0;

for (const r of routes) {
  await page.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded", timeout: 120000 });
  const { doublons, n } = await page.evaluate(() => {
    const compte = new Map();
    for (const h of document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")) {
      const e = compte.get(h.id) ?? { k: 0, textes: [] };
      e.k++;
      if (e.textes.length < 3) e.textes.push((h.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60));
      compte.set(h.id, e);
    }
    return {
      n: [...compte.values()].reduce((s, e) => s + e.k, 0),
      doublons: [...compte].filter(([, e]) => e.k > 1).map(([id, e]) => ({ id, k: e.k, textes: e.textes })),
    };
  });
  titresVus += n;
  if (doublons.length) fautifs.push({ r, doublons });
  if (!PORTE)
    console.log(`  ${doublons.length ? "✗" : "✓"} ${r.padEnd(46)} ${String(n).padStart(3)} titres` +
      (doublons.length ? ` — ${doublons.length} ancre(s) dupliquée(s)` : ""));
}
await nav.close();

if (fautifs.length) {
  console.error("\n━━ porte ancres-uniques : ROMPUE ━━");
  for (const { r, doublons } of fautifs) {
    console.error(`   ${r}`);
    for (const d of doublons) console.error(`      #${d.id} ×${d.k} — « ${d.textes.join(" » / « ")} »`);
  }
  console.error(
    "\n   Deux titres qui partagent une ancre, c'est un lien profond qui ment :\n" +
      "   l'élève copie le lien de la section qu'il lit et retombe sur la première\n" +
      "   homonyme. Le compteur d'unicité doit être PARTAGÉ par les segments\n" +
      "   (web/src/lib/rehypeSlugPartage.ts), jamais remis à zéro par segment."
  );
  process.exit(1);
}

console.log(
  `\nancres-uniques : porte tenue — ${routes.length} leçons, ${titresVus} titres, 0 ancre dupliquée ✓`
);
arreter();
process.exit(0);
