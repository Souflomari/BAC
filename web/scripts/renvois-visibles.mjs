/**
 * renvois-visibles — combien de jargon de rédaction l'élève voit VRAIMENT.
 *
 * POURQUOI CET INSTRUMENT EXISTE, ET POURQUOI IL COMPTE SUR LE RENDU.
 * La campagne de juillet avait nettoyé `lesson.md` : 1 374 renvois
 * remplacés, porte armée, sujet clos. Compté sur le RENDU le 2026-09-04, il
 * restait **529 codes R et 19 « rung » sous les yeux d'un élève**, sur 38
 * leçons — venus des sidecars (l'énoncé d'un item, le raisonnement d'une
 * question de banque, la légende d'une figure), que la porte ne regardait
 * pas.
 *
 * On lit `document.body.innerText`, chapitres dépliés : ce que le navigateur
 * DONNE À LIRE, pas ce que la source contient. La charge RSC dans les
 * <script> en est exclue d'office — c'est du texte que personne ne lit.
 *
 * ÉTAT : 529 → 1, et le survivant est le résistor « R0 » du schéma RL, qui
 * vit dans un <svg> et dont le fichier le déclare (« CODES R LÉGITIMES: »).
 * La classe est donc VIDE hors figure, et gardée dans `dom-truth` — cet
 * outil reste le compteur détaillé, la porte est là-bas.
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";

// IL NE POUVAIT PAS DÉMARRER (corrigé le 2026-09-22, §11.182). Il visait un
// port EN DUR que rien ne documente et que rien ne lève : connexion refusée
// dès la première page, à chaque lancement. Un instrument catalogué, dont
// l'en-tête dit qu'il « reste le compteur détaillé », et que personne ne
// pouvait lancer. Il lève maintenant son propre `next start`, tué par son
// GROUPE (serveur-frais.mjs, §11.111), et honore BASE pour viser un serveur
// déjà debout.
const PORT = Number(process.env.PORT_RENVOIS ?? 3400 + (process.pid % 90));
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
    console.error("renvois-visibles : `next start` n'a pas répondu. Build absent ?");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
const routes=[];
for (const m of readdirSync("../content")) { const d=`../content/${m}`;
  if(!existsSync(d)||!readdirSync(d).length) continue;
  for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) routes.push(`/notions/${m}/${s}`); }
const b = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
let totR = 0, totRung = 0, lues = 0; const detail = [];
for (const r of routes) {
  // `networkidle` attendait 500 ms de silence réseau et n'y arrivait jamais :
  // 30 s par page × 62 = l'instrument dépassait 30 min sans rien rendre. Le
  // reste du dépôt attend `load` puis l'hydratation (`window.__bacVivant`),
  // qui est la vraie condition de « la page est lisible ».
  await p.goto(BASE+r, { waitUntil: "load", timeout: 60000 });
  await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  await p.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach(s => s.hidden = false));
  // déplier tout ce qui est repliable : details, boutons « voir »
  await p.evaluate(() => { document.querySelectorAll("details").forEach(d => d.open = true); });
  const m = await p.evaluate(() => {
    // LES FORMULES NE PORTENT PAS DE CODE DE BARREAU (2026-09-05). KaTeX rend
    // « R_0 » — un résistor — en spans dont l'innerText recolle « R0 », et la
    // sonde le comptait comme un code R. Une leçon RL entière était déclarée
    // fautive pour un résistor. On vide le texte des formules avant de lire.
    for (const k of document.querySelectorAll(".katex")) k.textContent = " ";
    // Ni une ÉTIQUETTE DE FIGURE : « R0 » est le résistor du schéma RL
    // (rl-schema.svg, onze fois), pas un barreau. Un code de barreau vit dans
    // la prose ; on lit la prose.
    for (const k of document.querySelectorAll("svg text")) k.textContent = " ";
    const t = document.body.innerText;
    const rungs = t.match(/\brungs?\b/gi) ?? [];
    const codes = t.match(/\bR\d+\b/g) ?? [];
    const ctx = [];
    for (const re of [/\brungs?\b/gi]) {
      let x; const rr = new RegExp(re.source, "gi");
      while ((x = rr.exec(t)) && ctx.length < 3) ctx.push(t.slice(Math.max(0, x.index - 60), x.index + 50).replace(/\n/g, " "));
    }
    return { rungs: rungs.length, codes: codes.length, listeCodes: [...new Set(codes)].slice(0, 6), ctx };
  });
  lues++;
  if (!m.rungs && !m.codes) continue;
  totR += m.codes; totRung += m.rungs;
  detail.push({ r, ...m });
}
detail.sort((a,b)=>(b.rungs+b.codes)-(a.rungs+a.codes));
// COMBIEN DE PAGES ONT ÉTÉ LUES, dit à voix haute (2026-09-22). Le compte
// « 0 leçon(s) » désignait les leçons FAUTIVES : un zéro identique sortait
// d'un balayage de 62 pages propres et d'un balayage qui n'avait rien ouvert.
// Un instrument doit distinguer VERT de MUET (ADR 0034).
console.log(`VISIBLE À L'ÉCRAN : ${totRung} « rung » et ${totR} code(s) R sur ${detail.length} leçon(s) fautive(s), ${lues}/${routes.length} leçons LUES\n`);
if (lues === 0) { console.error("MUET : aucune page lue — rien n'a été mesuré."); process.exit(1); }
for (const d of detail.slice(0, 25)) console.log(`  ${String(d.rungs).padStart(3)} rung · ${String(d.codes).padStart(3)} R  ${d.r}   ${d.listeCodes.join(",")}`);
console.log("\nContextes « rung » :");
for (const d of detail.slice(0, 6)) for (const c of d.ctx) console.log(`  ${d.r}\n     …${c}…`);
await b.close();
