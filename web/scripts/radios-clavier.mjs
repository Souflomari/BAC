/**
 * radios-clavier.mjs — l'auto-évaluation d'un corrigé d'épreuve au CLAVIER
 * (HANDOFF §11.39). Combien des radios « Juste / Partiel / Faux » sont des
 * arrêts de tabulation (le motif ARIA `radiogroup` en veut UN par groupe), et
 * les flèches déplacent-elles le focus et cochent-elles ? A trouvé : 144
 * radios tabulables pour 48 questions → 48 après roving tabindex.
 *   node scripts/radios-clavier.mjs   (⚠️ depuis web/, serveur sur :3911)
 */
import { chromium } from "playwright-core";
const nav = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await nav.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto("http://127.0.0.1:3911/examens/sm-2025-normale", { waitUntil: "load" }); await p.waitForFunction(() => !!window.__bacVivant);
await p.getByRole("button", { name: /commencer/i }).first().click(); await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
await p.getByRole("button", { name: /terminer/i }).first().click(); await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 });
const ou = () => p.evaluate(() => { const a = document.activeElement; if (!a || a === document.body) return "body"; return `${a.tagName.toLowerCase()}[${a.getAttribute("role") || ""}${a.getAttribute("aria-checked") != null ? " checked=" + a.getAttribute("aria-checked") : ""}] « ${(a.textContent || a.getAttribute("aria-label") || "").trim().slice(0, 22)} »`; });
const n = await p.evaluate(() => ({ groupes: document.querySelectorAll("[role=radiogroup]").length, radios: document.querySelectorAll("[role=radio]").length, tabbables: [...document.querySelectorAll("[role=radio]")].filter((r) => r.tabIndex >= 0).length }));
console.log(`${n.groupes} groupes · ${n.radios} radios · ${n.tabbables} radios dans l'ordre de tabulation (motif ARIA : 1 par groupe)`);
// se placer avant le premier groupe, puis Tab
await p.evaluate(() => { const g = document.querySelector("[role=radiogroup]"); const b = document.createElement("button"); b.id = "amorce"; g.parentElement.insertBefore(b, g); b.focus(); });
const suite = [];
for (let i = 0; i < 6; i++) { await p.keyboard.press("Tab"); suite.push(await ou()); }
console.log("6 Tab depuis avant le premier groupe :\n  " + suite.join("\n  "));
// flèches dans un groupe
await p.evaluate(() => document.querySelector("[role=radiogroup] [role=radio]").focus());
const avant = await ou(); await p.keyboard.press("ArrowRight"); const apres = await ou(); await p.keyboard.press("ArrowDown"); const apres2 = await ou();
console.log(`flèche → : ${avant} → ${apres} → ${apres2}`);
// Espace / Entrée cochent ?
await p.evaluate(() => document.querySelector("[role=radiogroup] [role=radio]").focus());
await p.keyboard.press("Space"); const coche = await ou();
console.log(`Espace : ${coche}`);
await nav.close();
