/**
 * recherche-navigateur.mjs — ce que ⌘F trouve, et ce qu'il ne trouve pas.
 *
 * Deux questions, et elles pèsent toutes les deux sur des arbitrages ouverts :
 *
 *   1. LES CHAPITRES REPLIÉS SONT-ILS CHERCHABLES ? L'arbitrage « servir tous
 *      les chapitres d'un coup » (HANDOFF) met dans la balance ⌘F, l'impression,
 *      les liens profonds et le hors-ligne CONTRE 43 000 nœuds et 6 s de
 *      peinture. La moitié « ⌘F » était une AFFIRMATION ; la voici mesurée.
 *   2. LE MATHML MASQUÉ DE KATEX POLLUE-T-IL LA RECHERCHE ? Chaque formule est
 *      rendue deux fois ; si la copie masquée était trouvable, un élève qui
 *      cherche « uC » tomberait sur des occurrences invisibles.
 *
 * MÉTHODE, et sa limite : on utilise `window.find()`, qui partage la
 * machinerie de recherche de texte rendu du navigateur mais n'EST PAS l'UI de
 * ⌘F. Le résultat vaut comme indication forte, pas comme certitude sur toutes
 * les plateformes.
 *
 * PIÈGE PAYÉ (2026-09-05) : le premier jet prenait un mot au hasard dans un
 * chapitre masqué — « comprendre », qui figure AUSSI dans le chapitre visible.
 * `window.find` le trouvait, et la conclusion « ⌘F voit les chapitres
 * repliés » était fausse. Un mot commun ne prouve rien : il faut un mot qui
 * n'existe QUE là.
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
const s=spawn("npx",["next","start","-p","3494"],{stdio:"ignore",detached:true});
for(let i=0;i<80;i++){try{if((await fetch("http://127.0.0.1:3494/")).ok)break}catch{}await new Promise(r=>setTimeout(r,500));}
const nav=await chromium.launch({executablePath:"/opt/pw-browsers/chromium"});
const p=await (await nav.newContext()).newPage();
await p.goto("http://127.0.0.1:3494/notions/pc/rlc-serie",{waitUntil:"networkidle"});
await p.waitForTimeout(500);
const r=await p.evaluate(()=>{
  const out={};
  const ch=[...document.querySelectorAll("[data-chapter-index]")];
  out.chapitres=ch.length;
  out.masques=ch.filter(c=>c.hasAttribute("hidden")||getComputedStyle(c).display==="none").length;
  // Un mot pris dans un chapitre MASQUÉ
  const cache=ch.find(c=>c.hasAttribute("hidden")||getComputedStyle(c).display==="none");
  // UN MOT QUI N'EXISTE QUE LÀ. Premier jet : un mot pris au hasard dans le
  // chapitre masqué — « comprendre », qui figure AUSSI dans le chapitre
  // visible. `window.find` le trouvait, et la conclusion « ⌘F voit les
  // chapitres repliés » était fausse. Un mot commun ne prouve rien.
  const texteVisible = ch.filter(c=>!c.hasAttribute("hidden") && getComputedStyle(c).display!=="none")
    .map(c=>c.textContent||"").join(" ").toLowerCase();
  const mot=cache ? (cache.textContent||"").trim().split(/\s+/)
    .map(w=>w.replace(/[^\p{L}]/gu,""))
    .filter(w=>w.length>9 && !texteVisible.includes(w.toLowerCase()))[0] : null;
  out.motCache=mot;
  out.trouveDansMasque = mot ? window.find(mot, false, false, true) : null;
  window.getSelection().removeAllRanges();
  // Un mot du chapitre VISIBLE, pour prouver que window.find marche ici
  const vis=ch.find(c=>!c.hasAttribute("hidden") && getComputedStyle(c).display!=="none");
  const motV=vis ? (vis.textContent||"").trim().split(/\s+/).filter(w=>w.length>8)[3] : null;
  out.motVisible=motV;
  out.trouveDansVisible = motV ? window.find(motV, false, false, true) : null;
  window.getSelection().removeAllRanges();
  // Le MathML masqué : son texte est-il trouvable ?
  const mm=document.querySelector("main .katex-mathml");
  const t=(mm?.textContent||"").trim();
  out.texteMathml=t.slice(0,24);
  out.trouveMathml = t.length>4 ? window.find(t.slice(0,12), false, false, true) : null;
  window.getSelection().removeAllRanges();
  return out;
});
console.log(JSON.stringify(r,null,1));
await nav.close(); try{process.kill(-s.pid)}catch{}
