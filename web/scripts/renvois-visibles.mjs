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
 * Ce n'est pas une porte : 71 codes subsistent, tous dans des renvois que le
 * réécriveur refuse de deviner (voir `scripts/renvois-barreaux.py`). Armer
 * une porte sur une classe qui n'est pas vide obligerait à la désarmer le
 * lendemain.
 */
import { chromium } from "playwright-core";
import { readdirSync, existsSync } from "node:fs";
const routes=[];
for (const m of readdirSync("../content")) { const d=`../content/${m}`;
  if(!existsSync(d)||!readdirSync(d).length) continue;
  for (const s of readdirSync(d)) if (existsSync(`${d}/${s}/lesson.md`)) routes.push(`/notions/${m}/${s}`); }
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
let totR = 0, totRung = 0; const detail = [];
for (const r of routes) {
  await p.goto("http://127.0.0.1:3495"+r, { waitUntil: "networkidle" });
  await p.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach(s => s.hidden = false));
  // déplier tout ce qui est repliable : details, boutons « voir »
  await p.evaluate(() => { document.querySelectorAll("details").forEach(d => d.open = true); });
  const m = await p.evaluate(() => {
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
  if (!m.rungs && !m.codes) continue;
  totR += m.codes; totRung += m.rungs;
  detail.push({ r, ...m });
}
detail.sort((a,b)=>(b.rungs+b.codes)-(a.rungs+a.codes));
console.log(`VISIBLE À L'ÉCRAN : ${totRung} « rung » et ${totR} code(s) R sur ${detail.length} leçon(s)\n`);
for (const d of detail.slice(0, 25)) console.log(`  ${String(d.rungs).padStart(3)} rung · ${String(d.codes).padStart(3)} R  ${d.r}   ${d.listeCodes.join(",")}`);
console.log("\nContextes « rung » :");
for (const d of detail.slice(0, 6)) for (const c of d.ctx) console.log(`  ${d.r}\n     …${c}…`);
await b.close();
