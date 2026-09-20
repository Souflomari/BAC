#!/usr/bin/env node
/**
 * desaccords-hydratation.mjs — combien de pages du produit échouent à
 * s'hydrater, et lesquelles ?
 *
 * POURQUOI. §11.149 a montré ce qu'un désaccord d'hydratation COÛTE : React
 * abandonne le HTML du serveur, refait un rendu client complet, et les deux
 * préférences d'affichage posées sur `<html>` tombent avec lui. La porte
 * `preferences-secours` garde ce coût — elle provoque un désaccord et vérifie
 * que le produit y survit. Elle ne dit RIEN, et le dit explicitement, du
 * nombre de désaccords que le produit porte VRAIMENT. C'est deux questions, et
 * les confondre laisserait croire qu'un vert sur la première répond à la
 * seconde (ADR 0036 §5 : la prescription et la livraison se mesurent
 * séparément).
 *
 * CE QUE ÇA VAUT POUR UN ÉLÈVE. Un désaccord n'affiche aucune erreur. La page
 * marche. Mais elle est rendue DEUX fois — une fois par le serveur, jetée, une
 * fois par le navigateur —, ce qui sur un téléphone lent est exactement le
 * gel que §11.53 mesurait ; et les réglages d'affichage sautent.
 *
 * COMMENT. Toutes les routes PRÉRENDUES du build (`.next/server/app/**.html`),
 * une par une, sur un `next start` local. En production React ne rédige pas le
 * désaccord : il le LÈVE, minifié — #418 (l'hydratation a échoué), #423 (la
 * racine bascule en rendu client), #425 (le texte ne correspond pas). On
 * écoute donc `pageerror` autant que la console.
 *
 * PORTÉE, écrite plutôt que sous-entendue : les routes DYNAMIQUES non
 * prérendues ne sont pas ici, ni aucun état atteint par un clic. Une page peut
 * s'hydrater proprement puis désaccorder après une interaction : ce balayage ne
 * le verrait pas.
 *
 *   node scripts/desaccords-hydratation.mjs           → le tableau
 *   node scripts/desaccords-hydratation.mjs --porte   → cliquet (0 désaccord)
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const PORTE = process.argv.includes("--porte");
//  ESSAI ROUGE. Un « 0 désaccord » sorti d'un instrument neuf ne vaut rien tant
//  qu'on n'a pas vu l'instrument en reconnaître un. Ce mode en FABRIQUE un, sur
//  la page d'accueil et elle seule : il intercepte le HTML servi et y change un
//  texte que React compare à sa charge RSC. Le balayage doit alors signaler « / »
//  et elle seule — s'il ne signale rien, il est aveugle ; s'il signale tout, il
//  crie au loup.
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_HYDRA ?? 4100 + (process.pid % 80));
const BASE = `http://127.0.0.1:${PORT}`;
//  CLIQUET : mesuré au 2026-09-20. Zéro, et zéro est le seul chiffre honnête
//  ici — un désaccord toléré est un rendu double toléré.
const CLIQUET = 0;

const racine = path.join(WEB, ".next", "server", "app");
if (!fs.existsSync(racine)) {
  console.error("desaccords-hydratation : pas de build. Lance `npm run build`.");
  process.exit(1);
}
const routes = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".html")) {
      const r = p.slice(racine.length).replace(/\.html$/, "");
      routes.push(r === "/index" ? "/" : r);
    }
  }
})(racine);
routes.sort();

const { spawn } = await import("node:child_process");
const serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
const arreter = () => { try { process.kill(-serveur.pid); } catch {} };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
let vivant = false;
for (let i = 0; i < 60; i++) {
  try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
}
if (!vivant) { console.error("desaccords-hydratation : `next start` n'a pas répondu."); process.exit(1); }

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const ctx = await nav.newContext();
const page = await ctx.newPage();

//  Les trois codes du secours, et leurs formulations de développement — une
//  seule des deux formes suffit à rendre l'instrument aveugle sur l'autre
//  build (mesuré : la porte soeur est revenue MUETTE pour cette raison exacte).
const MOTIF = /Minified React error #(418|423|425)\b|hydrat|did not match|didn't match|server HTML/i;

if (ESSAI_ROUGE) {
  await page.route(BASE + "/", async (r) => {
    const rep = await r.fetch();
    let html = await rep.text();
    const m = html.match(/>([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' ]{11,40})</);
    if (m) html = html.replace(m[0], ">" + "z".repeat(m[1].length) + "<");
    await r.fulfill({ response: rep, body: html });
  });
}

const fautives = [];
let mesurees = 0;
for (const route of routes) {
  let vu = [];
  const onErr = (e) => { const t = String(e); if (MOTIF.test(t)) vu.push(t.match(/#(\d+)/)?.[0] ?? "texte"); };
  const onCons = (m) => { if (MOTIF.test(m.text())) vu.push(m.text().match(/#(\d+)/)?.[0] ?? "texte"); };
  page.on("pageerror", onErr);
  page.on("console", onCons);
  try {
    const rep = await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
    //  L'hydratation arrive APRÈS domcontentloaded : mesurer tout de suite,
    //  c'est constater l'absence d'une erreur qui n'a pas encore eu lieu. Et on
    //  n'ATTEND PAS un délai fixe — le produit pose lui-même son drapeau
    //  d'hydratation (`__bacVivant`, SignalVivant.tsx). Un délai fixe a déjà
    //  rendu deux verdicts opposés dans la même journée sur la commande de
    //  thème ; on attend donc l'ÉVÉNEMENT, pas la montre.
    let hydratee = true;
    try {
      await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 });
    } catch { hydratee = false; }
    //  Court répit APRÈS le drapeau : React lève #418/#423 pendant la reprise,
    //  donc parfois juste après que le rendu client a repris la main.
    await page.waitForTimeout(250);
    mesurees++;
    if (!hydratee) {
      //  Une page qui ne s'hydrate JAMAIS est pire qu'un désaccord, et un
      //  balayage qui ne cherche que des désaccords la laisserait passer en
      //  vert (ADR 0036 §1 : énumérer les FORMES avant de conclure à l'absence).
      fautives.push({ route, codes: "JAMAIS HYDRATÉE (__bacVivant absent à 25 s)", statut: rep?.status() ?? 0 });
    } else if (vu.length) {
      fautives.push({ route, codes: [...new Set(vu)].join(" "), statut: rep?.status() ?? 0 });
    }
  } catch (e) {
    fautives.push({ route, codes: `INJOIGNABLE (${String(e).slice(0, 40)})`, statut: 0 });
  }
  page.off("pageerror", onErr);
  page.off("console", onCons);
}
await nav.close();
arreter();

console.log(`\n━━ désaccords d'hydratation — ${mesurees}/${routes.length} routes prérendues mesurées ━━\n`);
if (!fautives.length) {
  console.log("  aucune route ne désaccorde à l'hydratation.\n");
} else {
  for (const f of fautives) console.log(`  ✗ ${f.route.padEnd(52)} ${f.codes}`);
  console.log();
}

if (ESSAI_ROUGE) {
  const vues = fautives.map((f) => f.route);
  if (vues.length === 1 && vues[0] === "/") {
    console.log("━━ ESSAI ROUGE : le balayage a vu le désaccord fabriqué, et lui seul ✓ ━━\n");
    process.exit(0);
  }
  if (!vues.length) {
    console.error("━━ ESSAI ROUGE : AVEUGLE — un désaccord a été fabriqué et rien n'a été vu ━━\n");
  } else {
    console.error(`━━ ESSAI ROUGE : le balayage signale ${vues.length} routes au lieu de la seule « / » ━━`);
    console.error(`   ${vues.join(", ")}\n`);
  }
  process.exit(1);
}

if (PORTE) {
  if (fautives.length > CLIQUET) {
    console.error(`━━ CLIQUET « DÉSACCORD D'HYDRATATION » : ${CLIQUET} → ${fautives.length} ━━`);
    console.error("   Une page qui désaccorde est rendue DEUX fois — une fois par le serveur,");
    console.error("   jetée, une fois par le navigateur —, et les réglages d'affichage posés sur");
    console.error("   <html> tombent avec le premier rendu (§11.149).\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquet tenu — 0 désaccord sur ${mesurees} routes prérendues.\n`);
}
process.exit(0);
