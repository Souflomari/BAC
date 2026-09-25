/**
 * recherche-palette.mjs — ce que la palette ⌘K RÉPOND à ce qu'un élève tape.
 *
 * POURQUOI (2026-09-11, HANDOFF §11.34). Sondé : « physique » 26 résultats,
 * « philo » 13 — mais « maths » 0 et « svt » 0 (les values ne portaient que le
 * nom long de la matière), « 2025 » 0 (les épreuves n'étaient pas dans la
 * palette), et Échap rendait le focus à <body>. Corrigé : alias de matière,
 * groupe Épreuves, retour du focus. Cet instrument rejoue les requêtes.
 *
 * CE QU'ON MESURE : la palette vide (combien d'entrées), puis pour chaque
 * requête le nombre de résultats et les premiers ; enfin Échap — le focus
 * revient-il sur le bouton qui a ouvert la palette ? Rouge (exit 1) si une
 * requête de matière (maths, svt, physique, philo) ou d'année (2025) ne
 * trouve rien, ou si le focus ne revient pas.
 *
 *   BASE=http://127.0.0.1:3911 node scripts/recherche-palette.mjs   (⚠️ depuis web/)
 */
import { chromium } from "playwright-core";
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const p = await nav.newPage({ viewport: { width: 1280, height: 800 } });
await p.goto(`${BASE}/notions/pc/rlc-serie`, { waitUntil: "load" });
await p.waitForFunction(() => !!window.__bacVivant);
let rouge = 0;
const resultats = () => p.evaluate(() => [...document.querySelectorAll("[cmdk-item]")].map((e) => (e.textContent || "").replace(/\s+/g, " ").trim().slice(0, 34)));
// ouverture par le bouton de l'en-tête, au clavier
const bouton = p.locator("header button").filter({ hasText: /recherch/i }).first();
await bouton.focus(); await p.keyboard.press("Enter"); await p.waitForTimeout(400);
const tous = await resultats();
console.log(`palette vide : ${tous.length} entrées`);
const attendus = new Set(["maths", "svt", "physique", "philo", "2025", "rattrapage"]);
for (const q of ["maths", "svt", "physique", "philo", "pc", "bio", "2025", "bac 2025", "rattrapage", "sm 2025", "spc 2019", "examen", "dériv", "deriv", "proba", "acide", "nucléaire"]) {
  await p.keyboard.press("Control+a"); await p.keyboard.type(q, { delay: 5 }); await p.waitForTimeout(200);
  const r = await resultats();
  if (attendus.has(q) && r.length === 0) rouge++;
  console.log(`  « ${q} »`.padEnd(18), `→ ${String(r.length).padStart(2)}${attendus.has(q) && r.length === 0 ? " ✗" : ""} : ${r.slice(0, 3).join(" | ")}${r.length > 3 ? " …" : ""}`);
}
await p.keyboard.press("Escape"); await p.waitForTimeout(300);
const focus = await p.evaluate(() => { const a = document.activeElement; return a && a !== document.body ? `${a.tagName.toLowerCase()} « ${(a.getAttribute("aria-label") || a.textContent || "").replace(/\s+/g, " ").trim().slice(0, 30)} »` : "body"; });
const revenu = /recherch/i.test(focus);
if (!revenu) rouge++;
console.log(`Échap → focus sur ${focus} ${revenu ? "✓" : "✗ (devrait revenir sur le bouton Rechercher)"}`);
await nav.close();
console.log(rouge ? `ROUGE : ${rouge} défaut(s)` : "VERT");
process.exit(rouge ? 1 : 0);
