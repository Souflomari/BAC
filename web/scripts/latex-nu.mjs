/**
 * latex-nu.mjs — le LaTeX affiché TEL QUEL, et celui qu'on fait dire tout haut.
 *
 * POURQUOI CET INSTRUMENT EXISTE (§11.166, 2026-09-21). Sur une page de maths,
 * l'élève lisait ceci, mot pour mot :
 *
 *     Partie II — Le plan complexe $(O;\vec{u},\vec{v})$ : $a=1+i$, $b=(1+i)m$
 *
 * Ce n'est pas un extrait de fichier : c'est le texte rendu. Le sur-titre de
 * partie était écrit en texte nu, sans passer par le moteur de formules.
 * Mesuré alors : **150 formules brutes sur 26 pages** (7 leçons sur 62,
 * 19 épreuves sur 39), depuis exactement deux sites de rendu.
 *
 * Et ce défaut était INVISIBLE à la porte typographie, parce qu'un second
 * défaut le masquait (§11.165) : la règle française, appliquée à la chaîne
 * brute, posait une espace fine devant le « ; » de `$(O;\vec{u}…)$` — ce que
 * la porte exigeait justement. Corriger le premier a révélé le second. Sans
 * instrument dédié, rien ne garde la propriété une fois les deux réparés.
 *
 * DEUX AXES, parce qu'un élève peut rencontrer du LaTeX de deux façons :
 *
 *   1. IL LE LIT. Une paire de `$` dont le contenu porte une marque de
 *      commande (`\`, `^`, `_`, `{`, `}`), dans un nœud de texte hors de
 *      toute formule rendue. Le filtre sur la marque de commande est
 *      délibéré : « 30 $ » n'est pas du LaTeX, et une paire de dollars sans
 *      rien de mathématique dedans ne prouve rien.
 *
 *   2. IL L'ENTEND. La même chose dans un `aria-label`, un `alt`, un `title`,
 *      le titre du document ou la méta-description — c'est-à-dire là où
 *      AUCUN moteur ne rendra jamais rien, et où un lecteur d'écran épelle
 *      « u tiret bas accolade ouvrante n plus un ». Ici on accepte aussi une
 *      séquence `\commande` nue et un `^{`/`_{`, qui n'ont besoin d'aucun
 *      dollar pour être illisibles à voix haute.
 *
 * CE QUE L'INSTRUMENT NE DIT PAS. Il ne juge pas la NOTATION parlée : la
 * carte des descriptions de figures écrit `u_n`, `E_n`, `n²` — un lecteur
 * d'écran dit « u tiret bas n », ce qui est imparfait mais c'est la
 * convention de la maison sur des dizaines d'entrées. La changer est une
 * décision éditoriale, pas un correctif. Seules les accolades LaTeX, étrangères
 * à cette convention, sont refusées ici.
 *
 * Usage :  node scripts/latex-nu.mjs [--porte] <routes…>
 *          BASE=http://127.0.0.1:3839 node scripts/latex-nu.mjs …   (serveur déjà là)
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// Port unique par exécution — même raison que dom-truth et typo-francaise :
// deux portes qui réclament le même port se mesurent l'une l'autre.
const PORT = Number(process.env.PORT_LATEX ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const porte = process.argv.includes("--porte");
if (routes.length === 0) {
  console.error("usage: node scripts/latex-nu.mjs [--porte] <routes…>");
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
const arreter = () => { if (serveur) { try { process.kill(-serveur.pid); } catch {} } };

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await nav.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

const total = { lu: 0, entendu: 0 };
const exemples = [];
let mesurees = 0;

for (const route of routes) {
  const reponse = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
  // Une route morte n'est pas une route propre : la liste EST la portée, et une
  // entrée fautive l'amputerait en silence (leçon de typo-francaise).
  if (reponse && reponse.status() !== 200) {
    console.error(`✗ ${route} — HTTP ${reponse.status()} : cette route n'existe pas, la porte ne mesure rien.`);
    process.exitCode = 1;
    continue;
  }
  try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 }); } catch { /* page sans marqueur */ }
  // Les énoncés d'épreuve vivent derrière « Commencer », le corrigé derrière
  // « Terminer » : sans ces deux clics on mesure le masthead.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) {
      await terminer.first().click();
      await page.waitForSelector("[data-corrige-complet]", { timeout: 60000 });
    }
  }
  const r = await page.evaluate(() => {
    const racine = document.querySelector("main");
    if (!racine) return null;
    // Chapitres dépliés : ce que l'élève voit au fil de sa lecture.
    for (const g of racine.querySelectorAll("[hidden]")) g.removeAttribute("hidden");

    const LU = /\$[^$\n]*[\\^_{}][^$\n]*\$/g;
    const ENTENDU = /\$[^$\n]*[\\^_{}][^$\n]*\$|\\[a-zA-Z]{2,}|[\^_]\{/;

    let lu = 0, entendu = 0;
    const ex = [];
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      // Dans une formule RENDUE, le LaTeX est à sa place (annotation MathML) ;
      // dans du code, il est cité, pas affiché par erreur.
      if (n.parentElement?.closest(".katex, code, pre, style, script")) continue;
      const m = (n.nodeValue || "").match(LU);
      if (!m) continue;
      lu += m.length;
      if (ex.length < 2) ex.push(`LU : ${m[0].slice(0, 60)}`);
    }
    // Les attributs se lisent sur TOUT le document, pas seulement <main> : le
    // masthead, le pied de page et les métadonnées se font annoncer aussi.
    for (const [sel, attr] of [["[aria-label]", "aria-label"], ["[alt]", "alt"], ["[title]", "title"]]) {
      for (const e of document.querySelectorAll(sel)) {
        const v = e.getAttribute(attr) || "";
        if (!ENTENDU.test(v)) continue;
        entendu++;
        if (ex.length < 4) ex.push(`ENTENDU (${attr}) : ${v.slice(0, 60)}`);
      }
    }
    if (ENTENDU.test(document.title)) { entendu++; if (ex.length < 4) ex.push(`ENTENDU (title) : ${document.title.slice(0, 60)}`); }
    const meta = document.querySelector('meta[name="description"]');
    const mc = meta ? meta.getAttribute("content") || "" : "";
    if (ENTENDU.test(mc)) { entendu++; if (ex.length < 4) ex.push(`ENTENDU (description) : ${mc.slice(0, 60)}`); }
    return { lu, entendu, ex };
  });
  if (!r) { console.log(`  · ${route} — pas de <main>, page ignorée`); continue; }
  mesurees++;
  total.lu += r.lu; total.entendu += r.entendu;
  const n = r.lu + r.entendu;
  for (const e of r.ex) if (exemples.length < 8) exemples.push(`${route} — ${e}`);
  console.log(`  ${n === 0 ? "✓" : "✗"} ${route} — ${r.lu} formule(s) LUE(S) brutes, ${r.entendu} attribut(s) ENTENDU(S) en LaTeX`);
}

const n = total.lu + total.entendu;
console.log(
  n === 0 && process.exitCode !== 1
    ? `\nAucun LaTeX nu sur ${mesurees} page(s) : rien de brut à l'écran, rien d'illisible à voix haute.`
    : `\n${n} écart(s) : ${total.lu} formule(s) affichée(s) telles quelles, ` +
      `${total.entendu} attribut(s) que le lecteur d'écran épellerait.`
);
if (n > 0) for (const e of exemples) console.log(`   · ${e}`);

await nav.close();
arreter();
if (porte && (n > 0 || process.exitCode === 1)) {
  console.error(`\n━━ porte LaTeX nu : une formule est faite pour être RENDUE ━━`);
  console.error(`   À l'écran : le champ passe par le pipeline markdown/KaTeX`);
  console.error(`   (MdBlock, MathText, ou MdBlock inline pour un libellé dans un <p>).`);
  console.error(`   À voix haute : la description s'écrit en notation parlée, pas en LaTeX.`);
  process.exit(1);
}
