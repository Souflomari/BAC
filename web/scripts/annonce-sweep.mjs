/**
 * Balayage ANNONCE — ce qu'un lecteur d'écran DIT, et quand il coupe la parole.
 *
 * Point 2 de la liste des angles morts (`docs/audits/INSTRUMENTS.md`).
 * L'OSSATURE est déjà gardée par dom-truth : niveaux de titres sans saut,
 * noms accessibles présents, landmarks en place. Ce qui ne l'était pas :
 * **ce qui est prononcé, dans quel ordre, et ce qui INTERROMPT.**
 *
 * Pour un produit qui se veut « un tuteur patient », l'interruption est le
 * point sensible : une région `aria-live="assertive"` coupe la phrase en
 * cours ; posée sur un compteur ou une barre de progression, elle transforme
 * la lecture d'une leçon en bégaiement.
 *
 * QUATRE FAITS PAR PAGE, tous lus dans l'arbre d'accessibilité ou le DOM,
 * jamais devinés :
 *
 *   1. LES RÉGIONS LIVE. Combien, de quelle politesse, et sur quoi. Une
 *      `assertive` doit être un ÉVÉNEMENT (une erreur, un résultat attendu),
 *      jamais un état qui change tout seul.
 *   2. LE PREMIER PAS AU CLAVIER. Le premier élément focusable doit être un
 *      lien d'évitement (« Aller au contenu »), sinon un lecteur d'écran
 *      traverse le chrome à chaque page.
 *   3. L'ORDRE ANNONCÉ CONTRE L'ORDRE VU. On compare la suite des noms
 *      accessibles à la suite des positions à l'écran : un élément annoncé
 *      loin de sa place visuelle désoriente.
 *   4. LE CHANGEMENT DE CHAPITRE. Après une navigation, le focus reste-t-il
 *      sur un bouton disparu (le pire cas : le focus retombe sur <body> et
 *      le lecteur repart du haut) ? Et le nouveau titre est-il annoncé ?
 */
import { chromium } from "playwright-core";
import { execSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`/notions/${m}/${s}`);
  }
}
// LES 39 ÉPREUVES, lues là où la liste est vraie (`listEpreuves()`), pas
// écrites en dur : une seule y figurait, et elle revenait propre parce que
// rien n'était encore dans le DOM.
const examens = execSync("node scripts/routes-examens.mjs", { cwd: process.cwd(), encoding: "utf8" }).trim().split(" ");
const ROUTES = ["/", "/examens", ...examens, "/matieres/pc", "/commencer", "/atelier", ...lecons];

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await nav.newPage({ viewport: { width: 1280, height: 900 } });

// UNE PAGE DONT LA FEUILLE DE STYLE MANQUE N'EST PAS UNE PAGE (2026-09-05) : un
// serveur `next start` qui survit au `next build` suivant sert un HTML qui
// pointe vers des CSS effacés du disque ; la page se rend sans globals.css et
// toute mesure de mise en page est fausse (INSTRUMENTS, piège n° 4). Arrêt.
page.on("response", (rep) => {
  if (rep.status() >= 400 && /\.css(\?|$)/.test(rep.url())) {
    console.error(`✗ feuille de style ${rep.status()} : ${rep.url()} — le serveur ne sert pas le build mesuré. Arrêt.`);
    process.exit(2);
  }
});

const politesses = new Map();   // "assertive sur .x" → [routes]
let sansEvitement = 0, desordre = 0, focusPerdu = 0, sansAnnonce = 0, vues = 0;
const dits = [];

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 120000 });
  // L'ÉPREUVE S'OUVRE EN DEUX TEMPS (2026-09-05). Ce qui parle sur cette page
  // — le chrono, la bannière de pause, les radios d'auto-évaluation — n'existe
  // qu'APRÈS « Commencer », et le corrigé qu'après « Terminer ». Sans les deux
  // clics, le balayage lisait un masthead : c'est-à-dire rien.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) { await terminer.first().click(); await page.waitForTimeout(400); }
  }
  vues++;
  const m = await page.evaluate(() => {
    const live = [...document.querySelectorAll("[aria-live], [role=alert], [role=status], output")].map((e) => ({
      politesse: e.getAttribute("aria-live") ||
        (e.getAttribute("role") === "alert" ? "assertive (role=alert)" :
         e.getAttribute("role") === "status" ? "polite (role=status)" : "polite (output)"),
      cible: e.tagName.toLowerCase() +
        (typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/)[0] : ""),
      vide: !(e.textContent || "").trim(),
    }));
    // ordre annoncé vs ordre vu : on prend les éléments focusables, dans
    // l'ordre du DOM, et on regarde si leur position à l'écran recule
    const focusables = [...document.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return r.width > 0 && r.height > 0 && cs.visibility !== "hidden";
      });
    let reculs = 0;
    for (let i = 1; i < focusables.length; i++) {
      const a = focusables[i - 1].getBoundingClientRect();
      const b = focusables[i].getBoundingClientRect();
      // un recul VERTICAL franc (plus de 120 px vers le haut) sans changement
      // de colonne : le lecteur remonte alors que le doigt descendait
      if (b.top < a.top - 120 && Math.abs(b.left - a.left) < 40) reculs++;
    }
    const premier = document.querySelector('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    return {
      live,
      reculs,
      premierNom: premier ? (premier.textContent || premier.getAttribute("aria-label") || "").trim().slice(0, 40) : "(aucun)",
      chapitres: document.querySelectorAll("[data-chapter-section]").length,
    };
  });

  for (const l of m.live) {
    const cle = `${l.politesse} sur ${l.cible}${l.vide ? " (vide au chargement)" : ""}`;
    if (!politesses.has(cle)) politesses.set(cle, []);
    politesses.get(cle).push(route);
  }
  if (!/aller au contenu|passer au contenu|skip/i.test(m.premierNom)) {
    sansEvitement++;
    dits.push(`  ${route} : premier focusable « ${m.premierNom} » — pas un lien d'évitement`);
  }
  if (m.reculs > 2) { desordre++; dits.push(`  ${route} : ${m.reculs} reculs francs dans l'ordre de tabulation`); }

  // 4. le changement de chapitre
  if (m.chapitres > 1) {
    const avant = await page.evaluate(() =>
      document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(400);
    const apres = await page.evaluate(() => ({
      index: document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?",
      focus: document.activeElement ? document.activeElement.tagName.toLowerCase() : "(rien)",
      focusVisible: document.activeElement && document.activeElement !== document.body,
      liveTexte: [...document.querySelectorAll("[aria-live]")].map((e) => (e.textContent || "").trim()).filter(Boolean).slice(0, 2),
    }));
    if (apres.index !== avant) {
      if (!apres.focusVisible) {
        focusPerdu++;
        dits.push(`  ${route} : après changement de chapitre, le focus est sur <body> — le lecteur repart du haut de la page`);
      }
      if (!apres.liveTexte.length) {
        sansAnnonce++;
        dits.push(`  ${route} : changement de chapitre ${avant} → ${apres.index} sans aucune région live renseignée`);
      }
    }
  }
}

console.log(`\n${vues} pages\n`);
console.log("RÉGIONS LIVE DU SITE");
for (const [cle, routes] of [...politesses.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(routes.length).padStart(3)} pages · ${cle}`);
}
console.log(`\n  sans lien d'évitement en tête : ${sansEvitement}`);
console.log(`  ordre de tabulation qui recule : ${desordre}`);
console.log(`  focus perdu au changement de chapitre : ${focusPerdu}`);
console.log(`  changement de chapitre non annoncé : ${sansAnnonce}`);
if (dits.length) { console.log("\nDÉTAIL (20 premiers)"); for (const d of dits.slice(0, 20)) console.log(d); }
await nav.close();
