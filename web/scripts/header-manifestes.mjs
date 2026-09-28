/**
 * header-manifestes.mjs — le header d'une page offre-t-il vraiment ce qu'il
 * MONTRE (HANDOFF §11.180) ?
 *
 * Le header porte deux commandes alimentées par des manifestes calculés
 * CÔTÉ SERVEUR et passés en props : le panneau « Notions » et la palette ⌘K
 * (notions + épreuves). Quand une page oublie de les passer, rien ne casse
 * et rien ne le dit : `PanneauNotions` renvoie `null` pour chaque matière
 * dont la liste est vide, donc le bouton ouvre un panneau de 720 px sur
 * RIEN, et la palette s'ouvre sur une liste vide. Une commande offerte qui
 * ne mène nulle part — le contraire du contrat d'état honnête.
 *
 * C'est arrivé deux fois, et aucune porte ne l'a vu :
 *   - /connexion    : ni notions ni épreuves (la page était un composant
 *                     CLIENT, elle ne POUVAIT pas appeler les manifestes,
 *                     serveur seulement) — panneau vide, palette vide ;
 *   - /atelier      : notions mais pas d'épreuves — « 2025 » ne trouvait
 *                     rien, exactement le défaut que §11.34 avait corrigé
 *                     partout ailleurs.
 *
 * Ce que la porte mesure, et comment :
 *   1. Elle ÉNUMÈRE les types de page depuis `src/app/**‍/page.tsx` — elle ne
 *      lit pas une liste écrite à la main. Un type de page NEUF qui n'a pas
 *      d'URL concrète dans la table ci-dessous fait ROUGIR la porte au lieu
 *      d'être sauté en silence : c'est la direction qui empêche de la
 *      contourner en ajoutant une route.
 *   2. Sur chaque URL, elle fait CE QUE FERAIT L'ÉLÈVE : ⌘K, puis clic sur
 *      « Notions », et elle compte ce qui s'affiche. Pas de lecture de
 *      source, pas d'inspection de props — le rendu, jusqu'au bout.
 *
 * ROUGE (exit 1) si, sur une page quelconque : la palette n'offre aucune
 * notion, ou n'offre aucune épreuve, ou le panneau Notions n'a aucune
 * colonne. ROUGE aussi si un type de page n'est pas dans la table.
 *
 *   BASE=http://127.0.0.1:3911 node scripts/header-manifestes.mjs   (⚠️ depuis web/)
 *   node scripts/header-manifestes.mjs --essai-rouge    (prouve qu'elle sait rougir)
 */
import { chromium } from "playwright-core";
import { readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

// Sans BASE explicite, la porte lève son propre `next start` et le tue par son
// GROUPE (`-pid`, d'où `detached`) : tuer le seul enveloppeur npm laisse un
// serveur orphelin qui sert un build périmé, et la mesure d'après accuse le
// produit (serveur-frais.mjs, §11.111). Même motif que preferences-secours.
// Sans cela la porte n'est PAS autonome en CI, où rien n'écoute d'avance.
const ESSAI = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_HEADER ?? 3800 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true,
  });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("header-manifestes : `next start` n'a pas répondu. Build absent ?");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

/**
 * Un type de page → une URL concrète à mesurer. La CLÉ est le chemin de
 * route tel que `src/app` le nomme (segments dynamiques compris). Ajouter
 * une page sans l'inscrire ici fait rougir la porte — c'est voulu.
 */
const URLS = {
  "/": "/",
  "/atelier": "/atelier",
  "/commencer": "/commencer",
  "/connexion": "/connexion",
  "/examens": "/examens",
  "/examens/[id]": "/examens/sm-2025-normale",
  "/matieres/[subject]": "/matieres/pc",
  "/notions/[subject]/[slug]": "/notions/pc/rlc-serie",
  "/options/wide/[v]": "/options/wide/w1",
};
/** Le 404 n'est pas un `page.tsx` : il se mesure par une URL qui n'existe pas. */
const QUATRE_CENT_QUATRE = "/cette-route-n-existe-pas-porte-header";

/** Les types de page présents dans le dépôt, calculés et non recopiés. */
function typesDePage(racine) {
  const trouves = [];
  (function descendre(dir) {
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) descendre(p);
      else if (e === "page.tsx") {
        const rel = relative(racine, p).split(sep).slice(0, -1).join("/");
        trouves.push("/" + rel);
      }
    }
  })(racine);
  return trouves.map((r) => (r === "/" ? "/" : r.replace(/\/$/, ""))).sort();
}

/** Ce que l'élève voit, mesuré dans le DOM rendu. */
async function mesurer(page, url, saboter) {
  await page.goto(`${BASE}${url}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  // Le déclencheur « Notions » est `disabled` tant que React n'a pas repris
  // la main (ADR 0032) — attendre l'hydratation, sinon on mesure l'attente.
  await page.waitForFunction(
    () => [...document.querySelectorAll("button")].some((b) => b.textContent?.trim() === "Notions" && !b.disabled),
    null,
    { timeout: 40000 }
  ).catch(() => {});

  // --- la palette ⌘K
  await page.keyboard.press("Control+k");
  await page.waitForSelector(".palette-item", { timeout: 8000 }).catch(() => {});
  if (saboter) {
    // Sabotage au NIVEAU MESURÉ : on retire ce que la porte compte. Cela
    // prouve que l'instrument distingue présent d'absent ; cela ne prouve
    // pas que le produit les sert (c'est le vert sur les 10 pages qui le dit).
    await page.evaluate(() => document.querySelectorAll(".palette-item").forEach((n) => n.remove()));
  }
  // COMPTER PAR GROUPE, pas par soustraction. Premier jet : `notions = total -
  // épreuves`. La palette porte AUSSI un groupe fixe « Aller à » de trois
  // raccourcis, présent même quand le manifeste est vide : /connexion cassée
  // affichait donc « 3 notions » au lieu de 0, et seule la colonne épreuves
  // la faisait rougir. Une unité fausse noie le signal (ADR 0039) — ici elle
  // désarmait une des trois conditions sans rien dire.
  const palette = await page.evaluate(() => {
    const texte = (el) => (el?.textContent || "").trim();
    let notions = 0, epreuves = 0, raccourcis = 0, matieres = 0;
    for (const g of document.querySelectorAll("[cmdk-group]")) {
      const titre = texte(g.querySelector("[cmdk-group-heading]"));
      const items = [...g.querySelectorAll(".palette-item")];
      if (titre.startsWith("Épreuve")) { epreuves += items.length; continue; }
      if (titre === "Aller à") { raccourcis += items.length; continue; }
      // Un groupe de MATIÈRE : sa première entrée est « Toute la matière »,
      // qui mène à la page matière et n'est pas une notion.
      matieres++;
      notions += items.filter((i) => !texte(i).startsWith("Toute la matière")).length;
    }
    return { notions, epreuves, raccourcis, matieres };
  });
  await page.keyboard.press("Escape");

  // --- le panneau Notions
  // Par le NOM ACCESSIBLE : le déclencheur contient aussi un chevron, et
  // `textContent` brut porte les blancs du JSX — `getByRole` normalise.
  const bouton = page.getByRole("button", { name: "Notions" }).first();
  let colonnes = 0;
  if (await bouton.count()) {
    await bouton.click({ timeout: 8000 }).catch(() => {});
    await page.waitForSelector(".panneau-colonne", { timeout: 6000 }).catch(() => {});
    if (saboter) {
      await page.evaluate(() => document.querySelectorAll(".panneau-colonne").forEach((n) => n.remove()));
    }
    colonnes = await page.evaluate(() => document.querySelectorAll(".panneau-colonne").length);
    await page.keyboard.press("Escape");
  }
  return { ...palette, colonnes, boutonNotions: (await bouton.count()) > 0 };
}

// ---------------------------------------------------------------- direction 2
// Un type de page neuf qui n'est pas dans la table doit ROUGIR.
const racine = new URL("../src/app/", import.meta.url).pathname;
const types = typesDePage(racine);
const inconnus = types.filter((t) => !(t in URLS));
const fantomes = Object.keys(URLS).filter((t) => !types.includes(t));

let rouge = 0;
if (inconnus.length) {
  console.log(`ROUGE — ${inconnus.length} type(s) de page hors table : ${inconnus.join(", ")}`);
  console.log("        ajoute une URL concrète dans URLS, sinon la page n'est jamais mesurée.");
  rouge += inconnus.length;
}
if (fantomes.length) {
  console.log(`ROUGE — ${fantomes.length} entrée(s) de table sans page : ${fantomes.join(", ")}`);
  rouge += fantomes.length;
}

if (ESSAI) {
  // L'autre direction, éprouvée pour de vrai : une table à laquelle il manque
  // une page doit crier. On la simule sans toucher au dépôt.
  const faux = types.filter((t) => t !== types[0]);
  const manquant = types.filter((t) => !faux.includes(t));
  console.log(`\nESSAI ROUGE (direction table) : page « ${manquant[0]} » retirée de la table`);
  console.log(manquant.length ? "  → la porte crie : ROUGE ✔" : "  → la porte reste muette ✘");
}

// ---------------------------------------------------------------- direction 1
const routes = [...Object.entries(URLS).map(([t, u]) => [t, u]), ["(404)", QUATRE_CENT_QUATRE]];
// PW_CHROMIUM_PATH d'abord : la CI installe SON Chromium et passe le chemin.
// Le chemin en dur ne vaut que dans ce conteneur — une porte armée en CI qui
// l'ignore tombe là-bas sur un exécutable absent (§11.180).
const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

console.log(`\n${ESSAI ? "ESSAI ROUGE (direction rendu) — " : ""}manifestes du header, ${routes.length} types de page :`);
console.log("  type                          notions  matières  épreuves  raccourcis  colonnes");
for (const [type, url] of routes) {
  const m = await mesurer(page, url, ESSAI);
  const mauvais = m.notions === 0 || m.epreuves === 0 || (m.boutonNotions && m.colonnes === 0);
  if (mauvais && !ESSAI) rouge++;
  console.log(
    `  ${mauvais ? "✘" : "·"} ${type.padEnd(28)} ${String(m.notions).padStart(5)}    ${String(m.matieres).padStart(6)}    ${String(m.epreuves).padStart(6)}      ${String(m.raccourcis).padStart(6)}    ${String(m.colonnes).padStart(5)}`
  );
}
await nav.close();

if (ESSAI) {
  console.log("\n  (sabotage au niveau mesuré : tout doit être à 0 ci-dessus — sinon l'instrument ne voit pas ce qu'il compte)");
  process.exit(0);
}
console.log(rouge ? `\nROUGE — ${rouge} manquement(s).` : "\nVERT — chaque type de page sert les deux manifestes.");
process.exit(rouge ? 1 : 0);
