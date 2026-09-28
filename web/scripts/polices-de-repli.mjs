/**
 * polices-de-repli.mjs — quels caractères ne sont PAS dessinés par la police
 * du site, et par quoi ils le sont à la place.
 *
 * Point 6 des angles morts (`docs/audits/INSTRUMENTS.md`) : le corpus contient
 * des dizaines de caractères hors du sous-ensemble `latin` chargé (→, ≠, ✓, α,
 * β, ᵉ…), et l'arabe des sujets de philo n'a de glyphe dans AUCUNE fonte du
 * site. Ils tombent donc sur un repli système — une autre fonte, d'autres
 * métriques, au milieu d'une phrase.
 *
 * COMMENT ON LE SAIT SANS DEVINER : le protocole DevTools expose
 * `CSS.getPlatformFontsForNode`, qui rend les fontes RÉELLEMENT utilisées pour
 * un nœud et le nombre de glyphes dessinés par chacune. Un nœud qui en
 * mobilise deux a subi un repli, et l'API dit lequel.
 *
 * CE QUE ÇA NE DIT PAS : si le repli se VOIT. Une fonte de repli aux métriques
 * proches passe inaperçue ; une autre saute aux yeux. L'instrument localise,
 * il ne juge pas — c'est la capture qui tranche.
 *
 * NI CE QU'UNE POLICE DESSINE À LA PLACE (2026-09-24). Geist 1.7.2 PRÉTEND
 * avoir « ω » et dessine « Ω » : pas de repli, un seul nom de police pour le
 * nœud — cet instrument n'a rien à dire, et la vitesse angulaire s'affichait
 * en ohm. Ce défaut-là est mesuré par `glyphes-confondus.mjs` (armé en CI),
 * qui compare les glyphes, pas les noms de polices.
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.PORT_POLICES ?? 3493);
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (routes.length === 0) {
  console.error("usage: node scripts/polices-de-repli.mjs <routes…>");
  process.exit(1);
}

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const t0 = Date.now();
  let pret = false;
  while (Date.now() - t0 < 60000) {
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) { console.error("✗ serveur absent"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("DOM.enable");
await cdp.send("CSS.enable");

const parFonte = new Map();
const parCaractere = new Map();
const exemples = [];

for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    for (const g of document.querySelectorAll("main [hidden]")) g.removeAttribute("hidden");
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);

  const ids = await page.evaluate(() => {
    const racine = document.querySelector("main");
    if (!racine) return [];
    // Latin de base + ponctuation courante : tout ce qui SORT de là est
    // suspect, et seul le suspect vaut un aller-retour au protocole.
    const COURANT = /^[ -ɏ‘’“”–—…  \n\t]*$/;
    const out = [];
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let n, i = 0;
    while ((n = w.nextNode())) {
      const t = (n.nodeValue || "").trim();
      if (t.length < 2) continue;
      const p = n.parentElement;
      if (!p || p.closest(".katex-mathml, svg, code, pre, style, script")) continue;
      if (COURANT.test(t)) continue;
      p.setAttribute("data-police-i", String(i));
      // Les caractères EXOTIQUES du nœud : c'est eux qu'il faudra couvrir si
      // l'on veut supprimer le repli, et l'inventaire vaut plus que le compte.
      const rares = [...new Set([...t].filter((c) => !COURANT.test(c)))].join("");
      out.push({ i, txt: t.slice(0, 46), rares });
      i++;
    }
    return out;
  });

  let replis = 0;
  const doc = await cdp.send("DOM.getDocument");
  for (const { i, txt, rares } of ids) {
    let nodeId = null;
    try {
      const found = await cdp.send("DOM.querySelector", { nodeId: doc.root.nodeId, selector: `[data-police-i="${i}"]` });
      nodeId = found.nodeId;
    } catch { /* nœud disparu */ }
    if (!nodeId) continue;
    let fonts = [];
    try {
      const r = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
      fonts = r.fonts || [];
    } catch { continue; }
    if (fonts.length <= 1) continue;
    replis++;
    for (const f of fonts) parFonte.set(f.familyName, (parFonte.get(f.familyName) || 0) + f.glyphCount);
    for (const c of rares) {
      const cle = `${c}\u0000U+${c.codePointAt(0).toString(16).toUpperCase().padStart(4, "0")}`;
      parCaractere.set(cle, (parCaractere.get(cle) || 0) + 1);
    }
    if (exemples.length < 8) {
      exemples.push(`${route} — « ${txt} » → ${fonts.map((f) => `${f.familyName} (${f.glyphCount})`).join(" + ")}`);
    }
  }
  console.log(`  ${replis === 0 ? "✓" : "·"} ${route} — ${ids.length} nœud(s) suspects, ${replis} avec repli de fonte`);
}

console.log("\nFontes réellement mobilisées (glyphes) :");
for (const [f, n] of [...parFonte.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(6)}  ${f}`);
}
console.log("\nCaractères présents dans les nœuds à repli (à couvrir pour le supprimer) :");
for (const [cle, n] of [...parCaractere.entries()].sort((a, b) => b[1] - a[1]).slice(0, 24)) {
  const [c, u] = cle.split("\u0000");
  console.log(`  ${String(n).padStart(4)}  ${c}  ${u}`);
}
for (const e of exemples) console.log(`   · ${e}`);
await nav.close();
arreter();
