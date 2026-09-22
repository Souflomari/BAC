/**
 * verdict-qcm.mjs — l'élève qui répond JUSTE est-il dit juste ?
 *
 * POURQUOI CET INSTRUMENT EXISTE (§11.184). `dom-truth` porte depuis
 * longtemps une note qu'aucun instrument n'avait levée :
 *
 *     TODO(post-answer states): the solution <summary> and correctness rows
 *     only exist after answering an item — battery v2 should drive one
 *     interaction.
 *
 * Personne ne vérifiait donc l'état APRÈS RÉPONSE. Or c'est le pire défaut
 * possible pour ce produit : un élève à qui l'on dit « faux » alors qu'il a
 * juste n'apprend pas — il perd confiance dans le seul juge qu'il a.
 *
 * CE QU'ON MESURE, sans jamais comparer du TEXTE. Les choix sont mélangés
 * (`lib/shuffle.ts`, graine = `item.id`). On rejoue le MÊME mélange ici —
 * la copie conforme d'`item-stats.mjs`, celle que `dom-truth` croise déjà —
 * pour savoir à quelle POSITION la bonne réponse atterrit. On clique cette
 * position et on exige « Bonne réponse. » ; on clique une autre position et
 * on exige « Réponse incorrecte ». Aucune correspondance de chaîne rendue :
 * la typographie française et KaTeX réécrivent le texte, et une sonde qui
 * compare du texte rendu à du texte source se trompe de question (ADR 0039).
 *
 * DEUX DIRECTIONS, parce qu'une seule se triche : un composant qui dirait
 * TOUJOURS « Bonne réponse. » passerait la première et pas la seconde.
 *
 * On vérifie aussi ce que la note de `dom-truth` nommait : après la réponse,
 * la ligne de verdict (`role="status"`) existe, et le repli explicatif
 * (`<details>`) est là — un item qui ne montre RIEN après une réponse est
 * muet au moment exact où l'élève attend quelque chose (§11.133).
 *
 * ROUGE (exit 1) si un verdict contredit la donnée, ou si un item répond
 * sans verdict ni explication. MUET (exit 1 aussi) si aucun item n'a pu être
 * mesuré — un zéro qui ne vient de nulle part n'est pas un vert (ADR 0034).
 *
 *   node scripts/verdict-qcm.mjs [--porte] [routes…]      (⚠️ depuis web/)
 *   node scripts/verdict-qcm.mjs --essai-rouge
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const args = process.argv.slice(2);
const PORTE = args.includes("--porte");
const ESSAI = args.includes("--essai-rouge");
const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const CONTENT = path.join(REPO, "content");

// ── copie conforme de web/src/lib/shuffle.ts (comme item-stats.mjs) ──
// Si l'algorithme change là-bas, il change ICI, dans le même commit.
function hashString(s) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { hash ^= s.charCodeAt(i); hash = Math.imul(hash, 0x01000193); }
  return hash >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  const r = arr.slice(); const rand = mulberry32(seed);
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
const positionCorrecte = (item) =>
  seededShuffle(item.choices ?? [], hashString(item.id)).findIndex((c) => c.correct);

// ── la donnée : id d'item → position attendue de la bonne réponse ──
const attendu = new Map();
const routesCorpus = [];
for (const m of fs.readdirSync(CONTENT)) {
  for (const n of fs.readdirSync(path.join(CONTENT, m))) {
    const f = path.join(CONTENT, m, n, "items.yaml");
    if (!fs.existsSync(f)) continue;
    routesCorpus.push(`/notions/${m}/${n}`);
    for (const it of yaml.load(fs.readFileSync(f, "utf8")).items ?? []) {
      //  CLÉ = notion + id, JAMAIS l'id seul. Neuf ids sont partagés par deux
      //  notions (`LIB-1..9`, philo/la-liberte et svt/liberation-energie-…,
      //  §11.178). Keyée sur l'id nu, cette carte gardait l'item SVT et
      //  mesurait la leçon de philo contre la mauvaise attente : quatre
      //  fausses contradictions, sur un produit correct. La collision était
      //  dite « latente aujourd'hui, piège demain » — c'est demain.
      attendu.set(`/notions/${m}/${n}::${it.id}`, { pos: positionCorrecte(it), n: (it.choices ?? []).length });
    }
  }
}

if (ESSAI) {
  // L'ESSAI ROUGE est JOUÉ, pas décrit. On décale la position attendue de
  // chaque item : le produit répond juste, l'attente est fausse, la porte
  // DOIT crier sur les deux directions. Saboter le produit demanderait une
  // reconstruction et n'atteindrait pas la porte (ADR 0038) — on sabote donc
  // la seule chose qui soit à portée : ce que la porte croit savoir.
  //  On décale de −1, pas de +1. Avec +1, la cible « distracteur » devient
  //  `réelle+2`, qui reste un distracteur : le produit répond correctement
  //  FAUX et cette direction-là ne crie pas. Avec −1, la cible « juste »
  //  tombe sur un distracteur ET la cible « distracteur » tombe sur la vraie
  //  bonne réponse : les DEUX directions doivent crier. Un essai rouge qui
  //  n'éprouve qu'une moitié de la porte laisse l'autre moitié non éprouvée.
  for (const [id, v] of attendu) if (v.n > 1) attendu.set(id, { ...v, pos: (v.pos + v.n - 1) % v.n });
  console.log("ESSAI ROUGE — position attendue décalée de −1 pour chaque item.");
  console.log("  La porte doit signaler DES DEUX CÔTÉS : « dit FAUX » sur la bonne, « dit JUSTE » sur le distracteur.\n");
}

const PORT = Number(process.env.PORT_VERDICT ?? 3300 + (process.pid % 90));
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
  if (!vivant) { console.error("verdict-qcm : `next start` n'a pas répondu. Build absent ?"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });

const routes = args.filter((a) => a.startsWith("/")).length
  ? args.filter((a) => a.startsWith("/")) : routesCorpus;

const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const page = await nav.newPage({ viewport: { width: 1280, height: 900 } });

let mesures = 0, fautes = [], sansVerdict = [];
const vus = new Set();
for (const route of routes) {
  await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
  await page.waitForFunction(() => !!window.__bacVivant, null, { timeout: 40000 }).catch(() => {});
  await page.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false)));
  await page.waitForTimeout(250);

  const ids = await page.evaluate(() =>
    [...document.querySelectorAll("[data-item-id]")].map((e) => e.getAttribute("data-item-id")));
  const connus = ids.filter((i) => attendu.has(`${route}::${i}`));
  for (const i of connus) vus.add(`${route}::${i}`);
  if (!connus.length) continue;

  // TOUS les items de la page, pas deux. Répondre verrouille l'item RÉPONDU,
  // pas ses voisins : chaque McqItem porte son propre état local. Une seule
  // charge de page couvre donc toute la leçon, et les 62 chargements couvrent
  // le corpus entier au lieu d'un échantillon de 124.
  // Les directions ALTERNENT : un item sur deux est répondu juste, l'autre
  // avec un distracteur — les deux sens sont éprouvés dans chaque leçon.
  const plan = connus.map((id, i) => [id, i % 2 === 0]);

  for (const [id, viserJuste] of plan) {
    const att = attendu.get(`${route}::${id}`);
    if (att.n < 2) continue;
    const cible = viserJuste ? att.pos : (att.pos + 1) % att.n;
    const r = await page.evaluate(({ id, cible }) => {
      const hote = document.querySelector(`[data-item-id="${id}"]`);
      if (!hote) return { err: "item absent" };
      const boutons = [...hote.querySelectorAll("button")].filter((b) => b.getAttribute("aria-pressed") !== null);
      if (boutons.length <= cible) return { err: `seulement ${boutons.length} choix` };
      boutons[cible].click();
      return { ok: true, nb: boutons.length };
    }, { id, cible });
    if (r.err) { sansVerdict.push(`${route}:${id} — ${r.err}`); continue; }
    await page.waitForTimeout(450);
    // TOUS les `role="status"` de l'item, pas le premier. `ChoiceButton` en
    // pose un par choix (le feedback de la ligne) EN PLUS de la ligne de
    // verdict : `querySelector` rendait un conteneur vide et l'item passait
    // pour muet. Une sonde qui prend le premier élément d'une classe qu'elle
    // croit unique répond à une autre question (ADR 0033).
    const etat = await page.evaluate((id) => {
      const hote = document.querySelector(`[data-item-id="${id}"]`);
      const textes = [...(hote?.querySelectorAll('[role="status"]') ?? [])].map((e) => (e.textContent || "").trim());
      return { verdict: textes.filter(Boolean).join(" | "), details: !!hote?.querySelector("details") };
    }, id);
    mesures++;
    const ditJuste = /Bonne réponse/.test(etat.verdict);
    const ditFaux = /incorrecte/.test(etat.verdict);
    if (!ditJuste && !ditFaux) { sansVerdict.push(`${route}:${id} — aucun verdict après réponse`); continue; }
    if (!etat.details) sansVerdict.push(`${route}:${id} — verdict sans explication dépliable`);
    if (viserJuste && !ditJuste) fautes.push(`${route}:${id} — position ${cible} est la BONNE réponse, le produit dit FAUX`);
    if (!viserJuste && !ditFaux) fautes.push(`${route}:${id} — position ${cible} est un DISTRACTEUR, le produit dit JUSTE`);
  }
}
await nav.close();

//  LA PORTÉE, dite à voix haute. Un total d'items « couverts » qui ne dit pas
//  combien sont restés hors d'atteinte est un plancher déguisé en somme
//  (ADR 0036). Les non-vus sont les items qu'aucune page de leçon ne rend —
//  points d'arrêt, items de banque, chapitres non montés — pas des échecs.
const jamaisVus = [...attendu.keys()].filter((k) => !vus.has(k));
console.log(`\nverdict-qcm : ${mesures} réponse(s) mesurée(s) sur ${routes.length} leçon(s)`);
console.log(`  items connus ${attendu.size} · rendus et répondus ${vus.size} · jamais rendus ${jamaisVus.length}`);
if (jamaisVus.length) console.log(`  (échantillon non rendu : ${jamaisVus.slice(0, 3).map((k) => k.split("::")[1]).join(", ")}…)`);
if (fautes.length) { console.error(`\n${fautes.length} VERDICT(S) QUI CONTREDISENT LA DONNÉE :`); for (const f of fautes) console.error(`  ✗ ${f}`); }
if (sansVerdict.length) { console.error(`\n${sansVerdict.length} item(s) muet(s) ou incomplet(s) :`); for (const s of sansVerdict.slice(0, 10)) console.error(`  ⚠ ${s}`); }
if (mesures === 0) { console.error("MUET : aucune réponse mesurée — rien n'a été vérifié."); process.exit(1); }
if (ESSAI) {
  const crie = fautes.length > 0;
  console.log(crie
    ? `\nessai rouge OK : ${fautes.length} contradiction(s) signalée(s) sur ${mesures} réponse(s) — la porte sait rougir.`
    : "\nESSAI ROUGE RATÉ : attente faussée et la porte est restée VERTE — elle ne mesure pas ce qu'elle dit.");
  process.exit(crie ? 0 : 1);
}
if (!fautes.length && !sansVerdict.length) console.log("VERT — chaque bonne réponse est dite bonne, chaque distracteur est dit faux, et tous montrent une explication.");
process.exit((fautes.length || sansVerdict.length) && PORTE ? 1 : 0);
