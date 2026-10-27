#!/usr/bin/env node
/**
 * stockage-refuse.mjs — l'élève dont le navigateur REFUSE le stockage.
 *
 * POURQUOI. Navigation privée, « bloquer les cookies et données de site »,
 * appareil d'école verrouillé, navigateur d'opérateur : dans tous ces cas,
 * `localStorage` ne rend pas `null` — **il LÈVE**. Et il lève à l'ACCÈS, pas
 * seulement à l'écriture : lire `window.localStorage` suffit à déclencher une
 * `SecurityError`. Une lecture non protégée dans un rendu React n'est donc pas
 * une préférence perdue, c'est une page morte.
 *
 * Le produit stocke quatre choses, toutes des préférences d'affichage ou de
 * navigation (jamais de l'état d'apprentissage — ADR 0025 §2.11) : le thème,
 * la taille du texte, la filière, et le drapeau de la veille. Aucune n'est
 * vitale. La question n'est donc pas « l'élève perd-il ses réglages » — c'est
 * oui, et c'est acceptable —, mais **la leçon reste-t-elle lisible et
 * répondable**.
 *
 * COMMENT. Un script d'initialisation remplace `localStorage` et
 * `sessionStorage` par des accesseurs qui lèvent, exactement comme un
 * navigateur qui refuse. Puis on parcourt : accueil → leçon → répondre à un
 * item → chapitre suivant ; et l'épreuve : ouvrir → « Commencer » → « Terminer ».
 * On compte les exceptions non rattrapées, on vérifie que le contenu est là,
 * et on regarde si la frontière d'erreur (§11.148) a pris la main — c'est
 * mieux qu'une page blanche, mais ça reste une leçon perdue.
 *
 *   node scripts/stockage-refuse.mjs           → le rapport
 *   node scripts/stockage-refuse.mjs --porte    → rouge si une étape casse
 */
import path from "node:path";
import { chromium } from "playwright-core";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const PORTE = process.argv.includes("--porte");
//  ESSAI ROUGE : les morceaux de JavaScript sont bloqués. Le banc DOIT alors
//  rapporter des échecs — sinon ses détecteurs ne détectent rien et son vert ne
//  vaut rien.
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
const PORT = Number(process.env.PORT_STOCKAGE ?? 4500 + (process.pid % 80));
const BASE = `http://127.0.0.1:${PORT}`;

const { spawn } = await import("node:child_process");
const serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
const arreter = () => { try { process.kill(-serveur.pid); } catch {} };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
let vivant = false;
for (let i = 0; i < 60; i++) {
  try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
}
if (!vivant) { console.error("stockage-refuse : `next start` n'a pas répondu."); process.exit(1); }

//  TROIS CAS, et ils ne lèvent pas au même endroit :
//   · refusé — l'ACCÈS lève (navigation privée, données bloquées) ;
//   · plein  — seule l'ÉCRITURE lève (`QuotaExceededError`), la lecture marche.
//  Le second était nommé comme non mesuré à la fin de §11.154 ; le laisser
//  écrit sans le fermer aurait été une dette de plus.
const QUOTA = () => {
  try {
    const vrai = window.localStorage;
    vrai.setItem = () => { throw new DOMException("Quota dépassé.", "QuotaExceededError"); };
  } catch {}
};

const REFUS = () => {
  const lever = () => { throw new DOMException("Le stockage est refusé par les réglages du navigateur.", "SecurityError"); };
  for (const cle of ["localStorage", "sessionStorage"]) {
    try { Object.defineProperty(window, cle, { configurable: true, get: lever }); } catch {}
  }
};

const nav = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
let echecs = 0;
const dit = (ok, txt, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${txt}${detail ? ` — ${detail}` : ""}`);
  if (!ok) echecs++;
};

for (const cas of ["temoin", "refuse", "plein"]) {
  const refuse = cas === "refuse";
  console.log(`\n━━ stockage ${cas === "temoin" ? "autorisé (témoin)" : refuse ? "REFUSÉ (navigation privée / données bloquées)" : "PLEIN (quota dépassé : l'écriture lève, la lecture marche)"} ━━\n`);
  const ctx = await nav.newContext({ viewport: { width: 390, height: 844 } });
  if (refuse) await ctx.addInitScript(REFUS);
  if (cas === "plein") await ctx.addInitScript(QUOTA);
  const page = await ctx.newPage();
  if (ESSAI_ROUGE) await page.route("**/_next/static/chunks/**", (r) => r.abort());
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 100)));

  //  0. LE SABOTAGE A-T-IL PRIS ? Sans ce contrôle, une colonne « refusé » qui
  //     n'a rien refusé du tout rendrait un vert parfaitement vide — la porte
  //     MUETTE de l'ADR 0034, sous un autre nom. On le demande à la page.
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 40000 });
  const leve = await page.evaluate(() => { try { void window.localStorage; return false; } catch { return true; } });
  if (refuse) dit(leve, "le refus de stockage est EFFECTIF (l'accès lève)");
  else if (cas === "plein") {
    const ecritureLeve = await page.evaluate(() => { try { localStorage.setItem("x", "1"); return false; } catch { return true; } });
    dit(!leve && ecritureLeve, "le quota dépassé est EFFECTIF (lecture OK, écriture lève)");
  } else dit(!leve, "témoin : le stockage répond normalement");

  //  1. L'accueil se rend-il, et le JavaScript prend-il la main ?
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 40000 });
  let hydratee = true;
  try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 }); } catch { hydratee = false; }
  dit(hydratee, "accueil — le JavaScript prend la main");
  const liens = await page.evaluate(() => document.querySelectorAll('a[href^="/notions/"]').length);
  dit(liens > 0, `accueil — ${liens} lien(s) de leçon`);

  //  2. Une leçon : le cours est-il là, et peut-on répondre ?
  await page.goto(BASE + "/notions/maths/limites-continuite", { waitUntil: "domcontentloaded", timeout: 40000 });
  try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 }); } catch {}
  await page.waitForTimeout(600);
  const frontiere = await page.evaluate(() => /s’est interrompue|s'est interrompue/.test(document.body.innerText));
  dit(!frontiere, "leçon — la frontière d'erreur n'a PAS pris la main");
  const texte = await page.evaluate(() => document.body.innerText.length);
  dit(texte > 3000, `leçon — ${texte} caractères rendus`);
  //  LES CHAPITRES SONT DES <details> REPLIÉS, et il faut les ouvrir avant de
  //  chercher un item — sinon on mesure une absence qui est le dessin. Premier
  //  jet : un sélecteur inventé (`input[type=radio]`, `button[data-choix]`) qui
  //  ne trouvait rien. Le TÉMOIN a échoué aux deux mêmes contrôles que l'essai,
  //  ce qui l'a dit tout de suite : un banc dont le témoin tombe ne mesure pas
  //  le produit. Sélecteurs repris de `deploye-sweep`, qui les a payés.
  for (const d of await page.$$("details:not([open]) > summary")) { try { await d.click({ timeout: 700 }); } catch {} }
  await page.waitForTimeout(500);
  const items = await page.$$("[data-item-id]");
  dit(items.length > 0, `leçon — ${items.length} item(s) atteignable(s) après ouverture des chapitres`);
  let repondu = 0;
  if (items.length) {
    const h = items[0];
    const avant = (await h.innerText()).length;
    const btn = await h.$("ul[role=list] button, ul[role=list] [role=button]");
    if (btn) {
      await btn.click().catch(() => {});
      await page.waitForTimeout(800);
      repondu = (await h.innerText()).length - avant;
    }
  }
  dit(repondu > 50, "leçon — répondre produit un retour", `${repondu} caractères de plus`);

  //  2 bis. LES DEUX COMMANDES QUI ÉCRIVENT. C'est là que le stockage PLEIN se
  //  distingue du stockage refusé : l'élève clique, l'écriture échoue, et la
  //  question est de savoir si le réglage s'applique quand même pour la session.
  //  Les deux composants posent l'effet APRÈS le `try` — c'est ce qu'on vérifie.
  //  À 390 px, les deux commandes vivent DERRIÈRE « Menu et réglages » — c'est
  //  le dessin (§11.146), et un banc qui clique sans ouvrir le menu mesure une
  //  absence qu'il a fabriquée. Le TÉMOIN l'a dit, encore : les deux contrôles
  //  tombaient dans les TROIS colonnes.
  const menu = page.getByRole("button", { name: /Menu et réglages/i }).first();
  if (await menu.count()) { await menu.click({ timeout: 8000 }).catch(() => {}); await page.waitForTimeout(400); }

  const avantThème = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  const bascule = page.locator("[data-theme-toggle]").first();
  if (await bascule.count()) {
    await bascule.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
  const apresThème = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  dit(avantThème !== apresThème, "la bascule de thème agit malgré tout");

  const avantTaille = await page.evaluate(() => document.documentElement.style.getPropertyValue("--font-scale"));
  const plus = page.getByRole("button", { name: "Agrandir la taille du texte" }).first();
  if (await plus.count()) {
    await plus.click({ timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(400);
  }
  const apresTaille = await page.evaluate(() => document.documentElement.style.getPropertyValue("--font-scale"));
  dit(avantTaille !== apresTaille, "l'agrandissement du texte agit malgré tout", `${avantTaille || "∅"} → ${apresTaille || "∅"}`);

  //  3. Une épreuve, jusqu'au corrigé.
  await page.goto(BASE + "/examens/spc-2025-normale", { waitUntil: "domcontentloaded", timeout: 40000 });
  try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 25000 }); } catch {}
  const commencer = page.getByRole("button", { name: /commencer/i }).first();
  let sujet = 0;
  if (await commencer.count()) {
    await commencer.click({ timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(1500);
    sujet = await page.evaluate(() => document.body.innerText.length);
  }
  dit(sujet > 5000, "épreuve — « Commencer » révèle le sujet", `${sujet} caractères`);

  console.log(`  ${erreurs.length ? "✗" : "✓"} ${erreurs.length} exception(s) non rattrapée(s)`);
  if (erreurs.length) { for (const e of [...new Set(erreurs)].slice(0, 5)) console.log(`      ${e}`); echecs++; }
  await ctx.close();
}
await nav.close();
arreter();

console.log();
if (ESSAI_ROUGE) {
  if (echecs > 0) {
    console.log(`━━ ESSAI ROUGE : le banc a rapporté ${echecs} échec(s) sur un produit privé de son JavaScript ✓ ━━`);
    console.log("   Ses détecteurs ne sont donc pas décoratifs.\n");
    process.exit(0);
  }
  console.error("━━ ESSAI ROUGE : AVEUGLE — JavaScript bloqué et le banc n'a rien vu ━━\n");
  process.exit(1);
}
if (echecs) {
  console.error(`━━ ${echecs} échec(s) — le stockage refusé casse quelque chose ━━`);
  console.error("   Un navigateur qui refuse le stockage LÈVE à l'accès, pas seulement à");
  console.error("   l'écriture. Une lecture non protégée dans un rendu n'est pas une");
  console.error("   préférence perdue : c'est une leçon perdue.\n");
  if (PORTE) process.exit(1);
} else {
  console.log("  ✓ stockage refusé : le cours reste lisible, répondable, et l'épreuve s'ouvre.\n");
}
process.exit(0);
