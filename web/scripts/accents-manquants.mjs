/**
 * accents-manquants.mjs — le français sans ses accents, dans le texte RENDU.
 *
 * `typo-francaise.mjs` regarde la PONCTUATION : apostrophes droites, espaces
 * manquantes devant `;` `:` `?`. Il ne regarde pas les LETTRES. Or le corpus
 * contient, à côté d'une prose soignée, des passages entiers écrits sans le
 * moindre accent — « egalite verifiee », « Reduction au meme denominateur »,
 * « L'eleve croit que la recurrence d'Euler resout exactement l'equation
 * differentielle ». Ces phrases sont rendues à l'élève au même titre que le
 * reste : dans les notes d'une dérivation, dans le libellé d'un item.
 *
 * Pourquoi ça compte, et pas seulement pour la beauté : un élève marocain de
 * terminale écrit ses copies en français et sera noté dessus. Un support de
 * révision qui écrit « theoreme » lui enseigne une orthographe fausse aussi
 * sûrement qu'il lui enseigne le théorème. Et un produit qui n'accentue pas
 * son français se lit comme un brouillon — la confiance se perd là.
 *
 * CE QUE LA SONDE CHERCHE, ET CE QU'ELLE S'INTERDIT DE CHERCHER
 *
 * Uniquement des mots dont la forme SANS accent n'existe pas en français.
 * « theoreme », « equation », « deja », « meme », « etre » : aucun de ces mots
 * n'a d'existence propre, les signaler ne peut pas se tromper. Sont exclus, et
 * l'exclusion est la partie importante de la liste : « cote » (une cote, une
 * côte, un côté), « des » (des / dès), « sur » (sur / sûr), « ou » (ou / où),
 * « a » (a / à), « croissante » et « suivante » (qui ne portent aucun accent).
 * Une sonde qui crie sur un mot correct est désarmée dans la semaine ; mieux
 * vaut en manquer que d'en inventer.
 *
 * La DÉTECTION est sûre ; la CORRECTION ne l'est pas toujours. « eleve » est à
 * coup sûr fautif, mais se corrige en « élève » ou en « élevé » selon la
 * phrase. La sonde signale ; c'est une relecture humaine ou une passe assistée
 * qui tranche, jamais un remplacement aveugle.
 *
 * Usage : node scripts/accents-manquants.mjs [--porte] <routes…>
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
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
const PORT = Number(process.env.PORT_ACCENTS ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const porte = process.argv.includes("--porte");
if (routes.length === 0) {
  console.error("usage: node scripts/accents-manquants.mjs [--porte] <routes…>");
  process.exit(1);
}

/**
 * Les mots cherchés viennent d'un fichier PARTAGÉ avec le script de réparation
 * (`scripts/accents-francais.py --exporter`). Deux listes tenues à la main dans
 * deux langages divergent — et une sonde plus étroite que la réparation déclare
 * propre ce qu'elle ne sait pas voir. Le premier essai de cette sonde ne
 * connaissait que 130 formes quand la réparation en connaissait 600 : le test
 * négatif l'a montré (sur trois mots sabotés volontairement, elle n'en voyait
 * qu'un). D'où la source unique.
 *
 * Règle d'admission dans cette liste, inchangée : la forme SANS accent ne doit
 * pas être un mot français. « cote », « des », « sur », « ou », « croissante »
 * n'y sont pas et n'y seront jamais.
 */
const MOTS = JSON.parse(
  fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "accents.mots.json"), "utf-8")
).formes;
const MOTIF = "(?:" + MOTS.join("|") + ")";

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

let total = 0;
// LE TEXTE D'EXAMEN EST TRANSCRIT VERBATIM, FAUTES COMPRISES (2026-09-05).
// Les sujets officiels contiennent leurs propres coquilles — « désintegration »,
// « coincïde » (tréma mal placé), « complétement », « la reception ». Le corpus
// les reproduit TELLES QUELLES et les signale d'un « (sic) » au point d'usage :
// c'est une règle éditoriale, pas un oubli, et la corriger détruirait la fidélité
// au sujet que l'élève verra le jour de l'épreuve. La porte saute donc un mot
// suivi d'un « (sic » dans les 60 caractères — la marque EST l'exemption.
// Une passe de correction avait accentué « la reception *(sic)* » du rattrapage
// 2012 ; c'est ce qui a rendu cette exemption nécessaire.
// PAGES RÉELLEMENT MESURÉES (2026-09-05). Le compte affiché disait
// `routes.length` : sur une liste dont TOUTES les routes rendaient un 404,
// la porte annonçait « aucun mot désaccentué sur 62 pages » — une phrase
// fausse, juste au-dessus de « porte ROMPUE ». Le refus 404 arrête bien la
// porte ; c'est le CHIFFRE qui mentait. On compte ce qu'on a ouvert.
let mesurees = 0;
const parSite = {};
const parMot = {};
const exemples = [];

for (const route of routes) {
  const reponse = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  // UNE ROUTE QUI N'EXISTE PAS N'EST PAS UNE ROUTE PROPRE (2026-09-05).
  // La liste de routes EST la portée de cette porte, et une entrée fautive
  // l'amputait en silence : `/options` figurait dans la liste CI de la porte
  // typographie et rend un 404 depuis que les bancs d'options ont été purgés.
  // La porte mesurait la page « Page introuvable » et annonçait « ✓ /options ».
  // Un contrôle qui ne peut pas devenir rouge n'est pas un contrôle.
  if (reponse && reponse.status() !== 200) {
    console.error(`✗ ${route} — HTTP ${reponse.status()} : cette route n'existe pas, la porte ne mesure rien.`);
    process.exitCode = 1;
    continue;
  }
  // LES ÉNONCÉS D'ÉPREUVE N'ENTRENT DANS LE DOM QU'APRÈS « Commencer »
  // (2026-09-05). `EpreuveShell` a trois phases et démarre au « seuil » : la
  // page /examens/<id> ne contient, au chargement, que le masthead et les
  // conditions. Les 39 sujets — le plus gros bloc de prose française du
  // produit après les leçons, et le seul transcrit VERBATIM — n'avaient donc
  // jamais été balayés : la porte les rendait verts en ne mesurant rien.
  // C'est la règle de l'ADR 0031 : la PORTÉE d'un mécanisme se mesure à part
  // de son bon fonctionnement.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
  }
  mesurees++;
  await page.waitForTimeout(200);
  const r = await page.evaluate((motif) => {
    const racine = document.querySelector("main");
    if (!racine) return null;
    for (const g of racine.querySelectorAll("[hidden]")) g.removeAttribute("hidden");
    const RE = new RegExp(`(?<![\\p{L}\\p{M}-])(${motif})(?![\\p{L}\\p{M}-])`, "giu");

    let n = 0;
    const sites = {}, mots = {}, ex = [];
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let nd;
    while ((nd = w.nextNode())) {
      // Le MathML de KaTeX double chaque formule et n'est pas du français ;
      // `code`/`pre` portent du code ; `style`/`script` sont des nœuds de texte
      // dont le contenu ressemble à des mots sans en être.
      if (nd.parentElement?.closest(".katex-mathml, code, pre, style, script")) continue;
      const t = nd.nodeValue || "";
      // Le « (sic) » vit dans un <em> VOISIN, pas dans ce nœud de texte : on
      // regarde le bloc entier, sinon l'exemption ne verrait jamais la marque.
      const bloc = (nd.parentElement?.closest("p, li, td, th, blockquote, div")?.textContent) || t;
      const trouves = [];
      for (const m of t.matchAll(RE)) {
        const dansBloc = bloc.indexOf(m[0], Math.max(0, bloc.indexOf(t)));
        const suite = dansBloc < 0 ? "" : bloc.slice(dansBloc + m[0].length, dansBloc + m[0].length + 60);
        if (/\(\s*sic/i.test(suite)) continue;   // transcription verbatim assumée
        trouves.push(m[0]);
      }
      if (trouves.length === 0) continue;
      n += trouves.length;
      for (const m of trouves) mots[m.toLowerCase()] = (mots[m.toLowerCase()] || 0) + 1;
      let e = nd.parentElement, chemin = [];
      while (e && e !== racine && chemin.length < 3) {
        chemin.push(e.tagName.toLowerCase() +
          (typeof e.className === "string" && e.className ? "." + e.className.split(/\s+/)[0] : ""));
        e = e.parentElement;
      }
      const cle = chemin.join(" < ");
      sites[cle] = (sites[cle] || 0) + trouves.length;
      if (ex.length < 2) ex.push(`${cle} :: ${t.trim().slice(0, 90)}`);
    }
    return { n, sites, mots, ex };
  }, MOTIF);

  if (!r) { console.log(`  · ${route} — pas de <main>, page ignorée`); continue; }
  total += r.n;
  for (const [k, v] of Object.entries(r.sites)) parSite[k] = (parSite[k] || 0) + v;
  for (const [k, v] of Object.entries(r.mots)) parMot[k] = (parMot[k] || 0) + v;
  for (const e of r.ex) if (exemples.length < 10) exemples.push(`${route} — ${e}`);
  console.log(`  ${r.n === 0 ? "✓" : "✗"} ${route} — ${r.n} mot(s) sans accent`);
}

console.log(
  total === 0
    ? `\nAucun mot français désaccentué sur ${mesurees} page(s) mesurée(s) sur ${routes.length}.`
    : `\n${total} occurrence(s) de mots français écrits sans leurs accents, sur ${mesurees} page(s) mesurée(s) sur ${routes.length}.`
);
if (total > 0) {
  console.log("\n  Par mot :");
  for (const [k, v] of Object.entries(parMot).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`    ${String(v).padStart(4)}  ${k}`);
  }
  console.log("\n  Par site de rendu :");
  for (const [k, v] of Object.entries(parSite).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`    ${String(v).padStart(4)}  ${k}`);
  }
  for (const e of exemples) console.log(`   · ${e}`);
}
await nav.close();
arreter();
// Une route absente a déjà posé process.exitCode = 1 : la porte doit tomber
// même si toutes les pages RÉELLEMENT visitées sont propres. La liste de
// routes EST la portée ; une entrée fautive l'ampute sans rien dire.
if (porte && process.exitCode === 1) {
  console.error("\n━━ porte ROMPUE — une route de la liste n'existe pas (voir le ✗ ci-dessus) ━━");
  process.exit(1);
}
if (porte && total > 0) {
  console.error(
    "\n━━ porte accents : le produit enseigne aussi l'orthographe qu'il écrit ━━\n" +
      "Corriger À LA SOURCE (content/…), jamais au rendu : le texte fautif vient des\n" +
      "fichiers de contenu, et une réparation côté composant les laisserait intacts."
  );
  process.exit(1);
}
