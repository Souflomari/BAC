/**
 * polices.mjs — ce que les POLICES coûtent, et à quoi elles servent.
 *
 * POURQUOI (2026-09-11, HANDOFF §11.35). Chaque page téléchargeait 324 ko de
 * polices — plus que son JavaScript sur la liste des épreuves — dont 84 ko de
 * sous-ensemble latin-ext PRÉCHARGÉ que l'accueil n'employait pour aucun
 * caractère (« œ » est dans le sous-ensemble latin), et 70 ko de Geist Mono
 * pour 80 caractères. Depuis : `subsets: ["latin"]`, 239 ko et 4 fichiers.
 *
 * CE QU'ON MESURE, par page : les fichiers woff2 téléchargés (nom court, ko) ;
 * puis, toutes pages confondues et chapitres dépliés, le nombre de caractères
 * de texte visible par famille / graisse / style — ce qui dit quelle face
 * sert vraiment (Geist Mono : 80 caractères sur cinq pages).
 *
 *   BASE=http://127.0.0.1:3911 node scripts/polices.mjs [routes…]   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/notions/pc/rlc-serie", "/notions/philo/la-verite", "/examens/sm-2025-normale", "/notions/maths/geometrie-espace"];
const usage = new Map();
for (const r of routes) {
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 800 } }); const p = await ctx.newPage();
  await p.goto(`${process.env.BASE ?? "http://127.0.0.1:3911"}${r}`, { waitUntil: "networkidle", timeout: 60000 });
  // dérouler tous les chapitres pour que leurs styles comptent
  await p.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach((e) => { e.hidden = false; }));
  const e = await p.evaluate(() => {
    const paires = new Map();
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n; while ((n = w.nextNode())) { if (!n.textContent.trim()) continue; const el = n.parentElement; if (!el) continue; const cs = getComputedStyle(el); if (cs.display === "none") continue; const fam = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(); const cle = `${fam} ${cs.fontWeight} ${cs.fontStyle === "italic" ? "italique" : ""}`.trim(); paires.set(cle, (paires.get(cle) || 0) + n.textContent.trim().length); }
    const fichiers = performance.getEntriesByType("resource").filter((x) => /woff2/.test(x.name)).map((x) => `${x.name.split("/").pop().replace(/-s\.p\.woff2|\.p\.woff2|-s\.woff2|\.woff2/, "")} ${Math.round(x.transferSize / 1024)} ko`);
    return { paires: [...paires], fichiers };
  });
  for (const [k, v] of e.paires) usage.set(k, (usage.get(k) || 0) + v);
  console.log(`${r.padEnd(34)} fichiers de police : ${e.fichiers.length} (${e.fichiers.reduce((s, f) => s + Number(f.split(" ")[1]), 0)} ko) · ${e.fichiers.join(" | ")}`);
  await ctx.close();
}
console.log("\ncaractères de texte par famille/graisse (toutes pages, chapitres dépliés) :");
for (const [k, v] of [...usage].sort((a, b) => b[1] - a[1])) console.log(`  ${k.padEnd(40)} ${v}`);
await nav.close();
