/**
 * typo-francaise.mjs — la typographie française, dans le texte RENDU.
 *
 * Le français met une espace insécable fine (U+202F) devant `;`, `:`, `!`,
 * `?`, et à l'intérieur des guillemets « … ». Sans elle, une ligne peut
 * commencer par « : » ou « ? » — ce qu'aucun livre scolaire ne fait, et ce
 * qu'un élève lit comme du travail bâclé. L'apostrophe droite (`'`) est
 * l'autre marque d'un texte non relu.
 *
 * `remarkFrenchTypography` normalise la PROSE des leçons. La question que
 * cette sonde pose est l'autre : que reste-t-il ailleurs — dans les
 * étiquettes de figure écrites à la main, dans les légendes des sidecars,
 * dans les pages hors leçon ?
 *
 * On lit le texte RENDU (`innerText`), pas les fichiers : c'est ce que
 * l'élève voit qui compte, et la chaîne de rendu peut aussi bien réparer que
 * casser.
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.PORT_TYPO ?? 3499);
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const porte = process.argv.includes("--porte");
if (routes.length === 0) {
  console.error("usage: node scripts/typo-francaise.mjs [--porte] <routes…>");
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
  if (!pret) { console.error("✗ serveur absent — rien n'est mesuré"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await nav.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

const total = { haute: 0, guillemets: 0, apostrophe: 0 };
const exemples = [];
const parSite = {};

for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);
  const r = await page.evaluate(() => {
    const racine = document.querySelector("main");
    if (!racine) return null;
    // Chapitres dépliés : ce que l'élève voit au fil de sa lecture, pas
    // seulement le chapitre ouvert à l'arrivée.
    for (const g of racine.querySelectorAll("[hidden]")) g.removeAttribute("hidden");

    const NNBSP = "\u202F", NBSP = "\u00A0";
    const RE_APO = /\p{L}'\p{L}/gu;
    // Une lettre, un chiffre, une parenthèse ou un guillemet fermant ; une
    // espace ORDINAIRE facultative ; puis ; : ?. L'insécable fine, elle, ne
    // matche pas — c'est justement ce qu'on veut voir.
    const RE_HAUTE = new RegExp(`[\\p{L}\\d)»][ ${NBSP}]?[;:?](?!\\d)`, "gu");
    const RE_GUILL = new RegExp(`«[^${NNBSP}${NBSP}]|[^${NNBSP}${NBSP}]»`, "gu");

    const compte = { haute: 0, guillemets: 0, apostrophe: 0 };
    const sites = {};
    const ex = [];
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      // Le MathML de KaTeX double chaque formule, et le code n'est pas du
      // français. Le `\text{…}` d'une formule, LUI, en est — on le garde.
      // `style` et `script` sont des NŒUDS DE TEXTE dans le DOM : le CSS d'une
      // figure inlinée (« .f-edge { stroke: … } ») ressemble à du français mal
      // ponctué et faisait crier la sonde sur cinq leçons. Ce n'est pas de la
      // langue, c'est du code.
      if (n.parentElement?.closest(".katex-mathml, code, pre, style, script")) continue;
      const t = n.nodeValue || "";
      const a = (t.match(RE_APO) || []).length;
      const h = (t.match(RE_HAUTE) || []).length;
      const g = (t.match(RE_GUILL) || []).length;
      if (!a && !h && !g) continue;
      compte.apostrophe += a; compte.haute += h; compte.guillemets += g;
      let e = n.parentElement, chemin = [];
      while (e && e !== racine && chemin.length < 3) {
        chemin.push(e.tagName.toLowerCase() +
          (typeof e.className === "string" && e.className ? "." + e.className.split(/\s+/)[0] : ""));
        e = e.parentElement;
      }
      const cle = chemin.join(" < ");
      sites[cle] = (sites[cle] || 0) + a + h + g;
      if (ex.length < 2) ex.push(`${cle} :: ${t.trim().slice(0, 60)}`);
    }
    return { ...compte, sites, ex };
  });
  if (!r) { console.log(`  · ${route} — pas de <main>, page ignorée`); continue; }
  const n = r.haute + r.guillemets + r.apostrophe;
  total.haute += r.haute; total.guillemets += r.guillemets; total.apostrophe += r.apostrophe;
  for (const [k, v] of Object.entries(r.sites)) parSite[k] = (parSite[k] || 0) + v;
  for (const e of r.ex) if (exemples.length < 6) exemples.push(`${route} — ${e}`);
  console.log(
    `  ${n === 0 ? "✓" : "✗"} ${route} — ${r.haute} ponctuation haute, ` +
    `${r.guillemets} guillemet(s), ${r.apostrophe} apostrophe(s) droite(s)`
  );
}

const n = total.haute + total.guillemets + total.apostrophe;
console.log(
  n === 0
    ? `\nLa typographie française tient sur ${routes.length} page(s) : aucune apostrophe droite, ` +
      `aucune espace manquante devant une ponctuation haute.`
    : `\n${n} écart(s) : ${total.haute} espace(s) manquante(s) devant une ponctuation haute, ` +
      `${total.guillemets} guillemet(s) mal espacé(s), ${total.apostrophe} apostrophe(s) droite(s).`
);
if (n > 0) {
  console.log("\n  Par site de rendu :");
  for (const [k, v] of Object.entries(parSite).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`    ${String(v).padStart(4)}  ${k}`);
  }
  for (const e of exemples) console.log(`   · ${e}`);
}
await nav.close();
arreter();
if (porte && n > 0) {
  console.error(
    "\n━━ porte typographie : le français du produit s'écrit d'une seule façon ━━\n" +
    "   (apostrophe ’ entre deux lettres, insécable fine devant ; : ? et dans\n" +
    "    les guillemets. La prose passe par `remarkFrenchTypography` ; ce qui\n" +
    "    ne passe pas par lui — titres, cartes, légendes, figures — se corrige\n" +
    "    à SA source : lib/chapters.ts, lib/content.ts, scripts/typo-figures.py,\n" +
    "    scripts/typo-math.py.)"
  );
  process.exit(1);
}
