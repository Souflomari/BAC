/**
 * score-annonce.mjs — en correction d'épreuve, noter une question fait-il
 * changer une région live (HANDOFF §11.40) ? La barre « X/Y notées · N/20 »
 * doit être `aria-live="polite"` pour qu'un lecteur d'écran suive le total ;
 * le chrono, lui, reste `off`. Vérifie l'attribut et qu'une note change le texte.
 *   node scripts/score-annonce.mjs   (⚠️ depuis web/, serveur sur :3911)
 */
// En correction, noter une question fait-il changer une région live polie ?
import { chromium } from "playwright-core";
// Même défaut qu'avant (:3911, la convention écrite dans l'en-tête) —
// BASE permet en plus de viser un serveur déjà debout.
const BASE = process.env.BASE ?? "http://127.0.0.1:3911";
const nav = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium" });
const p = await nav.newPage({ viewport: { width: 1280, height: 900 } });
await p.goto(BASE + "/examens/sm-2025-normale", { waitUntil: "load" }); await p.waitForFunction(() => !!window.__bacVivant);
await p.getByRole("button", { name: /commencer/i }).first().click(); await p.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
await p.getByRole("button", { name: /terminer/i }).first().click(); await p.waitForSelector("[data-corrige-complet]", { timeout: 60000 });
const bar = await p.evaluate(() => { const b = document.querySelector("[data-barre-epreuve] p"); return { live: b?.getAttribute("aria-live"), atomic: b?.getAttribute("aria-atomic"), txt: b?.textContent.replace(/\s+/g, " ").trim() }; });
console.log(`barre : aria-live=${bar.live} aria-atomic=${bar.atomic} · « ${bar.txt} »`);
// noter la première question « Juste »
const avant = await p.evaluate(() => document.querySelector("[data-barre-epreuve] p").textContent.replace(/\s+/g, " ").trim());
await p.locator("[role=radio]").first().click(); await p.waitForTimeout(300);
const apres = await p.evaluate(() => document.querySelector("[data-barre-epreuve] p").textContent.replace(/\s+/g, " ").trim());
console.log(`avant : « ${avant} »\naprès une note : « ${apres} »\nla région relira : ${avant !== apres ? "OUI" : "non (texte inchangé)"}`);
await nav.close();
