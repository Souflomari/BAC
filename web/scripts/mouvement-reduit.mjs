#!/usr/bin/env node
/**
 * mouvement-reduit.mjs — « réduire les animations » est-il respecté PARTOUT ?
 *
 * POURQUOI. Le mécanisme existe et il est bien fait : `globals.css` écrase les
 * durées de transition à 0,01 ms sous `prefers-reduced-motion: reduce`,
 * `MotionDiagram` révèle toutes ses étapes d'un coup, et `dom-truth` le vérifie
 * — **sur une figure, dans une leçon.** C'est la preuve que le mécanisme
 * FONCTIONNE. Ce n'est pas la mesure de ce qu'il ATTEINT : un mécanisme et sa
 * PORTÉE sont deux choses (ADR 0031), et le corpus n'a jamais été balayé sous
 * ce réglage.
 *
 * Ce que ça vaut pour un élève : `prefers-reduced-motion` n'est pas un confort.
 * Il est demandé par les élèves sujets au mal des transports vestibulaire, aux
 * migraines vestibulaires et aux troubles de l'attention — exactement la
 * population qu'une révision de trois heures met le plus à l'épreuve. WCAG 2.3.3
 * (AAA) et 2.2.2 en dépendent.
 *
 * CE QU'ELLE MESURE, sur chaque page et dans les deux réglages :
 *   · les animations VIVANTES (`document.getAnimations()`) de plus de 100 ms ;
 *   · les éléments dont la durée de transition calculée dépasse 50 ms ;
 *   · les éléments dont la durée d'animation calculée dépasse 50 ms.
 * Sous `reduce`, les trois doivent tomber à zéro.
 *
 * LE TÉMOIN EST OBLIGATOIRE : si les mêmes comptes sortent identiques dans les
 * deux réglages, ce n'est pas que le produit respecte la préférence — c'est que
 * la sonde ne voit aucun mouvement du tout, et son zéro ne vaut rien. La porte
 * exige donc que le réglage NORMAL montre du mouvement quelque part.
 *
 *   node scripts/mouvement-reduit.mjs           → le tableau
 *   node scripts/mouvement-reduit.mjs --porte   → cliquet
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const RACINE = path.resolve(WEB, "..");
const PORTE = process.argv.includes("--porte");
//  ESSAI ROUGE : la seconde passe n'émule PAS `reduce`. Tout ce que la porte
//  exige de voir disparaître reste alors là, et elle doit crier — sur ses deux
//  sens. Une porte qui reste verte quand on lui retire la préférence qu'elle
//  garde ne garde rien.
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_MOUVEMENT ?? 4700 + (process.pid % 80));
const BASE = `http://127.0.0.1:${PORT}`;

const routes = ["/", "/commencer", "/examens", "/atelier"];
for (const m of fs.readdirSync(path.join(RACINE, "content")).sort()) {
  const dm = path.join(RACINE, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm).sort()) {
    if (fs.existsSync(path.join(dm, n, "lesson.md"))) routes.push(`/notions/${m}/${n}`);
  }
}

const { spawn } = await import("node:child_process");
const serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
const arreter = () => { try { process.kill(-serveur.pid); } catch {} };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
let vivant = false;
for (let i = 0; i < 60; i++) {
  try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
}
if (!vivant) { console.error("mouvement-reduit : `next start` n'a pas répondu."); process.exit(1); }

//  SECOND SENS — et il a fallu le réécrire, parce que le premier posait la
//  question d'un composant aux commandes d'un autre (ADR 0033).
//
//  IL Y A DEUX VOIES DE MOUVEMENT, et leurs contrats sous « reduce » sont
//  OPPOSÉS — les deux à juste titre :
//
//   · MotionDiagram (des `<g id="step-N">` dans un SVG ordinaire) promet de
//     tout révéler d'un coup et de RETIRER la barre : « under reduced-motion
//     all steps are visible at once; there is nothing to step through »
//     (MotionDiagram.tsx, lignes 205-210).
//   · MotionStage (la voie `.motion.json`, jouée par GSAP) promet le
//     contraire : « every advance SEEKS instantly to the target settle point
//     (zero animation). Controls still advance; the student still drives the
//     reveal » (MotionStage.tsx, lignes 21-24). Retirer la barre priverait
//     l'élève du contenu — c'est LUI qui déroule.
//
//  Premier jet : j'ai appliqué le contrat du premier aux commandes du second
//  et déclaré ROUGE six notions qui respectaient le leur à la lettre. La voie
//  se lit dans le DÉPÔT, pas dans le DOM : une notion qui porte un
//  `*.motion.json` est de la voie MotionStage.
const sondeMotion = () => ({
  controles: document.querySelectorAll('[role="group"][aria-label^="Contrôles"]').length,
  etapes: document.querySelectorAll('g[id^="step-"]').length,
  etapesCachees: [...document.querySelectorAll('g[id^="step-"]')].filter((g) => getComputedStyle(g).display === "none").length,
});

const sonde = () => {
  const vivantes = document.getAnimations().filter((a) => {
    const d = a.effect?.getTiming?.().duration;
    return a.playState === "running" && typeof d === "number" && d > 100;
  }).length;
  let trans = 0, anim = 0;
  const lire = (v) => (v || "").split(",").map((x) => {
    const s = x.trim();
    return s.endsWith("ms") ? parseFloat(s) : s.endsWith("s") ? parseFloat(s) * 1000 : 0;
  });
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (lire(cs.transitionDuration).some((d) => d > 50)) trans++;
    if (lire(cs.animationDuration).some((d) => d > 50) && cs.animationName !== "none") anim++;
  }
  return { vivantes, trans, anim };
};

const nav = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const releve = {};
for (const reglage of ["no-preference", "reduce"]) {
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: reglage === "reduce" && !ESSAI_ROUGE ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  const par = {};
  for (const r of routes) {
    try {
      await page.goto(BASE + r, { waitUntil: "domcontentloaded", timeout: 40000 });
      try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 }); } catch {}
      //  On ouvre les chapitres : un mouvement dans un chapitre replié ne
      //  tourne pas, et le compter clos serait mesurer une absence de dessin.
      for (const d of await page.$$("details:not([open]) > summary")) { try { await d.click({ timeout: 300 }); } catch {} }
      await page.waitForTimeout(500);
      par[r] = { ...(await page.evaluate(sonde)), ...(await page.evaluate(sondeMotion)) };
    } catch (e) { par[r] = { erreur: String(e).slice(0, 50) }; }
  }
  releve[reglage] = par;
  await ctx.close();
  const t = Object.values(par).reduce((a, v) => ({ vivantes: a.vivantes + (v.vivantes ?? 0), trans: a.trans + (v.trans ?? 0), anim: a.anim + (v.anim ?? 0) }), { vivantes: 0, trans: 0, anim: 0 });
  console.log(`  · ${reglage.padEnd(14)} ${routes.length} pages · ${t.vivantes} animation(s) vivante(s) · ${t.trans} transition(s) > 50 ms · ${t.anim} animation(s) CSS > 50 ms`);
}
await nav.close();
arreter();

const N = releve["no-preference"], R = releve["reduce"];
//  Les six notions qui portent une figure de mouvement — celles où le contrat
//  a quelque chose à garder. Les autres n'ont ni étape ni barre de transport.
const AVEC_MOUVEMENT = routes.filter((r) => (N[r]?.etapes ?? 0) > 0);
//  La voie se lit dans le dépôt : `content/<m>/<n>/**/*.motion.json`.
const VOIE_STAGE = new Set();
for (const m of fs.readdirSync(path.join(RACINE, "content")).sort()) {
  const dm = path.join(RACINE, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm).sort()) {
    const dn = path.join(dm, n);
    if (!fs.statSync(dn).isDirectory()) continue;
    const trouve = (d) => fs.readdirSync(d, { withFileTypes: true }).some((e) =>
      e.isDirectory() ? trouve(path.join(d, e.name)) : e.name.endsWith(".motion.json"));
    if (trouve(dn)) VOIE_STAGE.add(`/notions/${m}/${n}`);
  }
}
const totN = Object.values(N).reduce((a, v) => a + (v.vivantes ?? 0) + (v.trans ?? 0) + (v.anim ?? 0), 0);
const fautives = routes.filter((r) => R[r] && !R[r].erreur && (R[r].vivantes > 0 || R[r].trans > 0 || R[r].anim > 0));

console.log(`\n━━ « réduire les animations » sur ${routes.length} pages ━━\n`);
console.log(`  mouvement détecté en réglage NORMAL (témoin) ....... ${totN}`);
console.log(`  pages où du mouvement SUBSISTE sous « reduce » ..... ${fautives.length}`);
console.log(`  pages portant une figure à étapes .................. ${AVEC_MOUVEMENT.length}`);
const ctrlN = AVEC_MOUVEMENT.reduce((a, r) => a + (N[r].controles ?? 0), 0);
const ctrlR = AVEC_MOUVEMENT.reduce((a, r) => a + (R[r].controles ?? 0), 0);
const cachN = AVEC_MOUVEMENT.reduce((a, r) => a + (N[r].etapesCachees ?? 0), 0);
const cachR = AVEC_MOUVEMENT.reduce((a, r) => a + (R[r].etapesCachees ?? 0), 0);
const etapes = AVEC_MOUVEMENT.reduce((a, r) => a + (N[r].etapes ?? 0), 0);
console.log(`     étapes au total ................................ ${etapes}`);
console.log(`     barres de transport : normal ${ctrlN} → reduce ${ctrlR}`);
console.log(`     étapes CACHÉES      : normal ${cachN} → reduce ${cachR}\n`);
for (const r of AVEC_MOUVEMENT) {
  const stage = VOIE_STAGE.has(r);
  //  MotionStage : la barre DOIT rester (l'élève déroule lui-même).
  //  MotionDiagram : la barre DOIT disparaître (tout est déjà révélé).
  const ok = stage ? R[r].controles > 0 : R[r].controles === 0 && R[r].etapesCachees === 0;
  console.log(`  ${ok ? "✓" : "✗"} ${r.padEnd(46)} ${stage ? "MotionStage " : "MotionDiagram"} · ${N[r].etapes} étape(s) · sous reduce : ${R[r].controles} barre(s), ${R[r].etapesCachees} cachée(s)`);
}
console.log();
for (const r of fautives.slice(0, 20)) {
  console.log(`  ✗ ${r.padEnd(46)} vivantes=${R[r].vivantes} transitions=${R[r].trans} animations=${R[r].anim}`);
}
if (fautives.length > 20) console.log(`  … et ${fautives.length - 20} autres`);
console.log();

if (ESSAI_ROUGE) {
  const cri = fautives.length > 0 || AVEC_MOUVEMENT.some((r) => !VOIE_STAGE.has(r) && R[r].controles > 0);
  if (cri) {
    console.log("━━ ESSAI ROUGE : la porte a crié quand la préférence n'était plus appliquée ✓ ━━");
    console.log(`   ${fautives.length} page(s) bougent encore, et les barres MotionDiagram sont restées.\n`);
    process.exit(0);
  }
  console.error("━━ ESSAI ROUGE : AVEUGLE — sans « reduce », la porte n'a rien vu ━━\n");
  process.exit(1);
}

if (PORTE) {
  if (totN === 0) {
    console.error("━━ PORTE MUETTE ━━");
    console.error("   Le réglage NORMAL ne montre AUCUN mouvement : la sonde ne mesure rien, et");
    console.error("   son zéro sous « reduce » ne prouve rien (ADR 0034).\n");
    process.exit(1);
  }
  if (!AVEC_MOUVEMENT.length) {
    console.error("━━ SECOND SENS MUET ━━");
    console.error("   Aucune figure à étapes trouvée : le contrat de MotionDiagram n'a été");
    console.error("   éprouvé nulle part, et son vert ne dit rien.\n");
    process.exit(1);
  }
  if (ctrlN === 0) {
    console.error("━━ SECOND SENS MUET ━━");
    console.error("   Aucune barre de transport en réglage NORMAL : il n'y avait rien à faire");
    console.error("   disparaître, donc rien n'a été prouvé.\n");
    process.exit(1);
  }
  const casses = AVEC_MOUVEMENT.filter((r) => VOIE_STAGE.has(r)
    ? R[r].controles === 0                                  // la barre a disparu : l'élève ne peut plus dérouler
    : R[r].controles > 0 || R[r].etapesCachees > 0);         // la barre reste, ou du contenu est caché
  if (casses.length) {
    console.error(`━━ ROUGE : ${casses.length} figure(s) à étapes ne respectent pas leur contrat ━━`);
    for (const r of casses) console.error(`   ${r} (${VOIE_STAGE.has(r) ? "MotionStage" : "MotionDiagram"}) — ${R[r].controles} barre(s), ${R[r].etapesCachees} étape(s) cachée(s)`);
    console.error("\n   MotionDiagram : tout révélé, aucune barre. MotionStage : barre GARDÉE,");
    console.error("   l'élève déroule lui-même, sans aucune animation.\n");
    process.exit(1);
  }
  if (fautives.length) {
    console.error(`━━ ROUGE : ${fautives.length} page(s) bougent encore sous « réduire les animations » ━━`);
    console.error("   La préférence n'est pas un confort : elle est demandée par les élèves");
    console.error("   sujets aux migraines vestibulaires et aux troubles de l'attention.\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquet tenu — ${totN} mouvement(s) en réglage normal, 0 sous « reduce ».`);
  const nStage = AVEC_MOUVEMENT.filter((r) => VOIE_STAGE.has(r)).length;
  console.log(`  ✓ contrats tenus sur ${AVEC_MOUVEMENT.length} page(s) à étapes — ${nStage} MotionStage (barre gardée) et ${AVEC_MOUVEMENT.length - nStage} MotionDiagram (barre retirée : ${ctrlN} → ${ctrlR}).\n`);
}
process.exit(0);
