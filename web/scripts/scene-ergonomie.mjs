#!/usr/bin/env node
/**
 * scene-ergonomie — la famille « ergonomie » des portes de scène, lancée SEULE,
 * sur les douze scènes (le banc de diffraction depuis le 2026-09-24, le
 * tremplin circulaire, le banc de modulation et le banc d'électrolyse depuis le
 * 2026-09-25).
 *
 * POURQUOI (2026-09-24, vague 2 des noyaux). La famille vit dans
 * `lib/scene-ergonomie.mjs` et chaque porte de scène l'appelle à la fin, après
 * une minute de mesures qui n'ont rien à voir. Un correctif de l'appareillage
 * COMMUN (le `<summary>` des encadrés, le focus après une course) touche les
 * neuf scènes d'un coup : le vérifier en lançant neuf portes, c'est dix minutes
 * pour une question d'une minute — et une porte prise dans un agrégat doit
 * pouvoir être lancée seule (ADR 0035). Ce lanceur ne REMPLACE aucune porte :
 * chacune garde sa famille ergonomie, avec les mêmes arguments qu'ici.
 *
 * Usage (depuis web/, après `npm run build`) :
 *   node scripts/scene-ergonomie.mjs                 (démarre `next start`)
 *   BASE=http://127.0.0.1:3990 node scripts/scene-ergonomie.mjs
 *   node scripts/scene-ergonomie.mjs corde noyaux    (quelques scènes)
 *   node scripts/scene-ergonomie.mjs --essai-rouge   (chaque scène doit crier)
 */
import { chromium } from "playwright-core";
import { ergonomie } from "./lib/scene-ergonomie.mjs";

const ESSAI = process.argv.includes("--essai-rouge");
const CHOIX = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const PORT = Number(process.env.PORT_ERGONOMIE ?? 3700 + (process.pid % 90));
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

// Les arguments de CHAQUE porte (`ergonomie({ … })` en fin de scene-*.mjs) :
// si l'un change là-bas, il change ici. `course` : le nombre de « Suivant »
// jusqu'à la première étape dont le pari attend la course (absent : la scène
// n'a pas de course).
const SCENES = [
  { nom: "orbite", lecon: "/notions/pc/chute-mouvements-plans", scene: "orbite-geostationnaire", course: 0 },
  { nom: "lorentz", lecon: "/notions/pc/chute-mouvements-plans", scene: "particule-champ-magnetique", course: 0 },
  { nom: "manege", lecon: "/notions/pc/rotation-axe-fixe", scene: "manege-rotation", course: 0 },
  { nom: "sphere", lecon: "/notions/maths/geometrie-espace", scene: "sphere-plan-droite" },
  { nom: "vectoriel", lecon: "/notions/maths/geometrie-espace", scene: "produit-vectoriel" },
  { nom: "revolution", lecon: "/notions/maths/calcul-integral", scene: "solide-revolution" },
  { nom: "cuve", lecon: "/notions/pc/ondes-mecaniques-periodiques", scene: "cuve-a-ondes", ouvrir: "Ouvrir la cuve à ondes", course: 0 },
  { nom: "corde", lecon: "/notions/pc/ondes-mecaniques-progressives", scene: "corde-photo-film", ouvrir: "Ouvrir la corde", course: 0 },
  { nom: "noyaux", lecon: "/notions/pc/decroissance-radioactive", scene: "courbe-et-noyaux", ouvrir: "Ouvrir la courbe et les noyaux", course: 2 },
  // sans course : la lumière ne met rien de mesurable à traverser deux mètres
  { nom: "diffraction", lecon: "/notions/pc/propagation-onde-lumineuse", scene: "banc-de-diffraction", ouvrir: "Ouvrir le banc de diffraction" },
  // la course de la première étape : le verdict attend que la moto soit en B
  { nom: "tremplin", lecon: "/notions/pc/lois-de-newton", scene: "tremplin-circulaire", ouvrir: "Ouvrir le tremplin", course: 0 },
  // sans course : un oscilloscope en régime établi ne « démarre » pas
  { nom: "modulation", lecon: "/notions/pc/ondes-em-modulation", scene: "banc-de-modulation", ouvrir: "Ouvrir le banc de modulation" },
  // la course de la première étape : le verdict attend la fin de la manipulation (30 min, 2 s d'écran)
  { nom: "electrolyse", lecon: "/notions/pc/electrolyse", scene: "banc-electrolyse", ouvrir: "Ouvrir le banc d’électrolyse", course: 0 },
  // sans course : le verdict est immédiat, c'est le plan qui répond
  { nom: "plan-complexe", lecon: "/notions/maths/nombres-complexes-2", scene: "plan-complexe-transformation", ouvrir: "Ouvrir le plan complexe" },
].filter((s) => CHOIX.length === 0 || CHOIX.includes(s.nom));
if (!SCENES.length) { console.error(`scene-ergonomie : aucune scène ne s'appelle ${CHOIX.join(", ")}.`); process.exit(2); }

// ── Serveur ────────────────────────────────────────────────────────────────
let serveur = null;
if (!process.env.BASE) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) { console.error("scene-ergonomie : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const lancer = (args = []) => chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });

/** Le chapitre de la scène, lu dans la leçon rendue — comme chaque porte. */
async function chapitreDe(lecon, scene) {
  const nav = await lancer();
  try {
    const p = await nav.newPage();
    await p.goto(BASE + lecon, { waitUntil: "load", timeout: 60000 });
    await p.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
    return await p.evaluate((sc) => {
      const s = document.querySelector(`[data-scene="${sc}"]`)?.closest("[data-chapter-section]");
      return s ? parseInt(s.getAttribute("data-chapter-index") ?? "-1", 10) + 1 : 0;
    }, scene);
  } finally {
    await nav.close();
  }
}

let rouges = 0;
let muettes = 0;
const crient = [];
for (const s of SCENES) {
  const chapitre = await chapitreDe(s.lecon, s.scene);
  if (!chapitre) { console.log(`\n✘ ${s.nom} : aucune scène ${s.scene} dans ${s.lecon} — MUET`); muettes++; continue; }
  const resultats = [];
  const noter = (famille, ok, detail) => resultats.push({ famille, ok: !!ok, detail });
  await ergonomie({ lancer, url: `${BASE}${s.lecon}?chapitre=${chapitre}`, scene: s.scene, noter, essai: ESSAI, ouvrir: s.ouvrir, course: s.course });
  const r = resultats.filter((x) => !x.ok);
  console.log(`\n${s.nom} (${s.scene}) : ${resultats.length} mesures, ${r.length} ${ESSAI ? "qui crient" : "rouge(s)"}`);
  for (const x of resultats) console.log(`  ${x.ok ? "·" : "✘"} ${x.detail}`);
  if (ESSAI && r.length) crient.push(s.nom);
  rouges += ESSAI ? 0 : r.length;
}

if (ESSAI) {
  const tues = SCENES.map((s) => s.nom).filter((n) => !crient.includes(n));
  console.log(tues.length || muettes ? `\nESSAI ROUGE — reste(nt) VERTE(S) : ${tues.join(", ")}` : `\nESSAI ROUGE — les ${SCENES.length} scènes crient.`);
  process.exit(tues.length || muettes ? 1 : 0);
}
console.log(rouges || muettes ? `\nROUGE — ${rouges} manquement(s)${muettes ? `, ${muettes} scène(s) muette(s)` : ""}.` : `\nVERT — ${SCENES.length} scène(s).`);
process.exit(rouges || muettes ? 1 : 0);
