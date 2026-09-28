/**
 * js-ventilation.mjs — quel JavaScript une page fait-elle télécharger, morceau
 * par morceau, et quelle part en est le pipeline markdown/KaTeX côté client ?
 *
 * POURQUOI (2026-09-06, HANDOFF §11.26). Le profil du changement de chapitre
 * (§11.22) a nommé les morceaux remark/micromark et KaTeX exécutés dans le
 * navigateur. Ni `poids-sweep` ni `donnees-sweep` ne ventilent le JS par
 * morceau. Ceci le fait : pour chaque route, les scripts reçus (octets
 * TRANSFÉRÉS, donc gzip), le total de la page, la part des morceaux
 * markdown/KaTeX, et pour ceux-là l'initiateur et la priorité — un morceau
 * chargé en `Low` par le routeur est un préchargement, pas un besoin de la
 * page.
 *
 * Les morceaux markdown/KaTeX sont reconnus à leur CONTENU (le fichier servi
 * cite `katex`, `micromark` ou `remark-`), pas à leur nom, qui change à chaque
 * build.
 *
 *   BASE=http://127.0.0.1:3911 node scripts/js-ventilation.mjs [routes…]   (⚠️ depuis web/)
 *   (sans routes : une leçon dense, une leçon SVT sans formules, une épreuve, l'accueil)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/notions/pc/rlc-serie", "/notions/svt/moyens-de-defense", "/examens/sm-2025-normale", "/"];
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const contenu = new Map();
async function estMarkdown(url) {
  if (contenu.has(url)) return contenu.get(url);
  let md = false;
  try { const t = await (await fetch(url)).text(); md = /katex|micromark|remark-/.test(t); } catch {}
  contenu.set(url, md); return md;
}
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Network.enable");
  const meta = new Map(), enc = new Map();
  cdp.on("Network.requestWillBeSent", (e) => meta.set(e.requestId, { url: e.request.url, init: e.initiator.type, prio: e.request.initialPriority }));
  cdp.on("Network.responseReceived", (e) => { const m = meta.get(e.requestId); if (m) m.type = e.type; });
  cdp.on("Network.loadingFinished", (e) => enc.set(e.requestId, e.encodedDataLength));
  await p.goto(`${BASE}${r}`, { waitUntil: "networkidle", timeout: 120000 });
  await p.waitForTimeout(1500);
  const rows = [...meta.entries()].map(([id, m]) => ({ ...m, enc: enc.get(id) ?? 0 }));
  const js = rows.filter((x) => x.type === "Script" || /\.js(\?|$)/.test(x.url));
  for (const x of js) x.md = await estMarkdown(x.url);
  const ko = (a) => (a.reduce((s, x) => s + x.enc, 0) / 1024).toFixed(0);
  const md = js.filter((x) => x.md);
  console.log(`${r.padEnd(34)} ${String(js.length).padStart(2)} scripts · JS ${String(ko(js)).padStart(4)} ko · page ${String(ko(rows)).padStart(5)} ko · markdown/KaTeX ${md.length} morceaux, ${ko(md)} ko (${md.map((x) => `${x.init}/${x.prio}`).join(", ")})`);
  for (const x of js.sort((a, b) => b.enc - a.enc).slice(0, 5)) console.log(`   ${String((x.enc / 1024).toFixed(0)).padStart(5)} ko  ${x.url.split("/").pop().slice(0, 44).padEnd(44)} ${x.md ? "markdown/KaTeX" : ""}`);
  await ctx.close();
}
await nav.close();
console.log("FIN=0");
