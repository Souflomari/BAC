/**
 * formules-rendues.mjs — aucune formule ne doit s'afficher en LaTeX brut.
 *
 * POURQUOI CETTE PORTE EXISTE (2026-09-05). KaTeX, quand il n'arrive pas à
 * lire une formule, ne disparaît pas : il PEINT LA SOURCE, en rouge, dans un
 * `span.katex-error`. Un élève en correction d'épreuve lisait donc, à la
 * place du raisonnement :
 *
 *     \qquad\Longrightarrow\qquad
 *     v_L = \frac{c}{n_L}$$
 *
 *     **L'application numérique.**
 *
 * 49 formules, sur 11 des 39 sujets. Rien ne pouvait le voir : les pages
 * d'épreuve n'étaient balayées par aucune porte, et le corrigé n'entre dans
 * le DOM qu'après DEUX actions — « Commencer l'épreuve », puis « Terminer ».
 *
 * LA CAUSE, pour que la porte serve à quelque chose : un bloc de maths
 * d'affichage écrit
 *
 *     $$n_L = \frac{c}{v_L}
 *     \qquad\Longrightarrow\qquad
 *     v_L = \frac{c}{n_L}$$
 *
 * — les `$$` collés au contenu, sur plusieurs lignes. Le lecteur markdown ne
 * reconnaît alors pas le bloc, passe la chaîne entière à KaTeX, et KaTeX
 * bute sur le `$$` qu'elle contient (« Can't use function '$' in math
 * mode »). La forme canonique — les deux `$$` SEULS sur leur ligne — rend
 * partout. 215 blocs remis en forme dans 47 fichiers.
 *
 * DEUX DIRECTIONS, et aucune ne suffit seule.
 *
 *   1. À LA SOURCE. Chaque `$…$` et `$$…$$` du corpus est passé à KaTeX.
 *      71 174 formules ; une seule refusée le 2026-09-05 (« 90^\\circ » —
 *      une contre-oblique de trop dans un scalaire YAML non quoté, là où le
 *      voisin quoté écrivait la même chose correctement). Cette passe atteint
 *      ce qu'aucune page n'atteint : les 49 `exercises.yaml`, les
 *      descriptions de misconceptions, tout ce qui vit derrière une réponse.
 *      Elle est AVEUGLE au défaut du markdown : chacune des 49 formules
 *      cassées ci-dessus était, prise seule, du LaTeX parfaitement valide.
 *
 *   2. AU RENDU. Aucun `span.katex-error` sur les 101 pages. Cette passe voit
 *      le défaut de markdown, et rien d'autre : elle ne peut pas ouvrir ce
 *      que l'élève n'ouvre pas non plus en trois clics.
 *
 * Ce que cette porte NE dit pas : qu'une formule est juste. Elle dit qu'elle
 * est LISIBLE. Une formule fausse mais bien formée passe ici sans un mot.
 *
 *   node scripts/formules-rendues.mjs [--porte] [routes…]
 *   (sans routes : les 62 leçons + les 39 épreuves. ⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
import { spawn, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import katex from "katex";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PORT = Number(process.env.PORT_FORMULES ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const porte = process.argv.includes("--porte");
let routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));

if (routes.length === 0) {
  const R = path.join(WEB, "..", "content");
  for (const m of fs.readdirSync(R)) {
    const d = path.join(R, m);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const n of fs.readdirSync(d)) {
      if (fs.existsSync(path.join(d, n, "lesson.md"))) routes.push(`/notions/${m}/${n}`);
    }
  }
  routes = routes.concat(
    execSync("node scripts/routes-examens.mjs", { cwd: WEB, encoding: "utf8" }).trim().split(" ")
  );
}

// ── 1. À LA SOURCE ────────────────────────────────────────────────────────
const CLES_TEXTE =
  /^(text|label|stem|question|prompt|note|title|titre|description|feedback|reasoning|explanation|intro|statement|body|content|summary|conclusion|caption|alt|expression|latex|formule)$/i;

function formulesDuCorpus() {
  const ROOT = path.join(WEB, "..", "content");
  const chaines = [];
  const rec = (v, c, f) => {
    if (typeof v === "string") { if (CLES_TEXTE.test(c)) chaines.push([f, v]); return; }
    if (Array.isArray(v)) { for (const x of v) rec(x, c, f); return; }
    if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) rec(x, k, f);
  };
  (function w(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { w(p); continue; }
      const rel = path.relative(ROOT, p);
      if (/\.ya?ml$/.test(e.name)) {
        let doc; try { doc = yaml.load(fs.readFileSync(p, "utf8")); } catch { continue; }
        rec(doc, "", rel);
      } else if (/\.md$/.test(e.name)) {
        chaines.push([rel, fs.readFileSync(p, "utf8").replace(/```[\s\S]*?```/g, " ")]);
      }
    }
  })(ROOT);
  return chaines;
}

let nSource = 0;
const sourceKo = [];
for (const [f, t] of formulesDuCorpus()) {
  for (const m of t.matchAll(/\$\$([\s\S]+?)\$\$|(?<!\$)\$([^$\n]+?)\$(?!\$)/g)) {
    const src = (m[1] ?? m[2] ?? "").trim();
    if (!src) continue;
    nSource++;
    try {
      katex.renderToString(src, { throwOnError: true, displayMode: !!m[1], strict: false, trust: true });
    } catch (e) {
      sourceKo.push(`${f} :: ${src.slice(0, 60).replace(/\s+/g, " ")} — ${String(e.message).slice(0, 80)}`);
    }
  }
}
if (nSource < 10000) {
  // ⚠️ `content/` est résolu depuis web/ : un total absurdement bas veut dire
  // qu'on ne lit rien, et un zéro silencieux rendrait cette moitié verte.
  console.error(`✗ ${nSource} formule(s) lues à la source — lancé depuis le mauvais répertoire ? (il faut web/)`);
  process.exit(1);
}
console.log(
  sourceKo.length === 0
    ? `À la source : ${nSource} formules, toutes acceptées par KaTeX.`
    : `À la source : ${sourceKo.length} formule(s) refusées par KaTeX sur ${nSource}.`
);
for (const x of sourceKo.slice(0, 12)) console.log("   · " + x);

// ── 2. AU RENDU ───────────────────────────────────────────────────────────
let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  serveur.unref();
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

let total = 0;
let mesurees = 0;
const details = [];

for (const route of routes) {
  const reponse = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  if (reponse && reponse.status() !== 200) {
    console.error(`✗ ${route} — HTTP ${reponse.status()} : cette route n'existe pas, la porte ne mesure rien.`);
    process.exitCode = 1;
    continue;
  }
  // Les deux actions d'une épreuve : l'énoncé, puis le corrigé.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) { await terminer.first().click(); await page.waitForTimeout(400); }
  }
  mesurees++;
  const r = await page.evaluate(() => {
    for (const g of document.querySelectorAll("[hidden]")) g.removeAttribute("hidden");
    const e = [...document.querySelectorAll(".katex-error")];
    return e.map((x) => ({
      msg: (x.getAttribute("title") || "").slice(0, 120),
      src: (x.textContent || "").replace(/\s+/g, " ").slice(0, 80),
    }));
  });
  if (r.length) {
    total += r.length;
    console.log(`  ✗ ${route} — ${r.length} formule(s) en LaTeX brut`);
    for (const x of r.slice(0, 2)) details.push(`${route} :: ${x.src} — ${x.msg}`);
  } else {
    console.log(`  ✓ ${route}`);
  }
}

console.log(
  total === 0
    ? `\nToutes les formules se rendent, sur ${mesurees} page(s) mesurée(s) sur ${routes.length}.`
    : `\n${total} formule(s) affichées en LaTeX brut, sur ${mesurees} page(s) mesurée(s) sur ${routes.length}.`
);
if (details.length) { console.log("\n  Détail :"); for (const d of details.slice(0, 12)) console.log("   · " + d); }
console.log(
  "\n━━ porte formules : une formule illisible n'enseigne rien ━━\n" +
    "La cause la plus fréquente est un bloc `$$…$$` dont les délimiteurs ne sont\n" +
    "pas SEULS sur leur ligne : le lecteur markdown ne voit alors pas le bloc et\n" +
    "passe le `$$` de clôture à KaTeX, qui refuse. Corriger À LA SOURCE."
);

await nav.close();
if (porte && (total > 0 || sourceKo.length > 0 || process.exitCode === 1)) { arreter(); process.exit(1); }
arreter();
process.exit(0);
