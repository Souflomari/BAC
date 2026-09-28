/**
 * Sonde de pagination — item 2 de l'ordre de travail post-Fable.
 *
 * La pagination est RENDERER-LEVEL : elle s'applique à toutes les leçons sans
 * qu'aucune ne l'ait demandée. C'est exactement ce qui la rend risquée — une
 * leçon dont la structure sort de l'ordinaire (titres `##` sans barreau,
 * figure animée, chapitre de banque synthétique) n'a jamais été REGARDÉE, et
 * personne ne le saurait.
 *
 * L'ordre de travail demandait des captures d'écran. On mesure plutôt le DOM :
 * une capture prouve qu'une page s'affiche, pas qu'UN SEUL chapitre est
 * visible, ni que la flèche gauche au chapitre 1 ne descend pas à −1, ni que
 * l'impression déplie tout. Ce sont des faits vérifiables ; on les vérifie.
 *
 * Onze contrôles par leçon, tous exprimés comme une promesse tenue ou rompue.
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3431";
const LECONS = [
  ["pc/lois-de-newton", "9 chapitres — la leçon de référence de la spec"],
  ["maths/suites-numeriques", "11 chapitres + figure animée"],
  ["maths/probabilites-conditionnelles", "la SEULE leçon à titres ## non-barreau"],
  ["svt/genetique-humaine", "SVT — porte propriétaire, jamais regardée en pagination"],
  ["philo/la-verite", "philo — LessonEnd/items, structure la plus éloignée"],
];

let ok = 0;
let ko = 0;
const anomalies = [];
const flashs = [];

function dit(bon, leçon, quoi, detail) {
  if (bon) { ok++; return; }
  ko++;
  anomalies.push({ leçon, quoi, detail });
  console.log(`✗ [${leçon}] ${quoi}\n    ${detail}`);
}

/**
 * PIÈGE PAYÉ UNE FOIS. Première version : `waitForSelector('[data-chapter-
 * active="true"]')`. Il rend la main INSTANTANÉMENT — le serveur rend déjà le
 * chapitre 0 actif (NotionBody:778). La sonde mesurait donc le HTML d'avant
 * hydratation et déclarait tous les liens profonds cassés. Trois leçons sur
 * cinq « en échec », zéro défaut réel : c'était la sonde qui était pressée.
 *
 * Il n'existe aucun marqueur d'hydratation dans le DOM, alors on la PROUVE :
 * on presse une flèche et on attend que ça prenne. Si le clavier répond, le
 * shell est vivant. C'est aussi le contrôle 6, qu'on ne compte donc qu'une
 * fois.
 */
const attendreActif = (page, i, ms = 15000) =>
  page.waitForFunction(
    (n) =>
      document.querySelector(`[data-chapter-section][data-chapter-index="${n}"]`)
        ?.getAttribute("data-chapter-active") === "true",
    i,
    { timeout: ms }
  );

const nav = async (page, url) => {
  await page.goto(url, { waitUntil: "load" });
};

async function prouverHydratation(page, total) {
  if (total <= 1) { await page.waitForTimeout(400); return true; }
  await page.keyboard.press("ArrowRight");
  await attendreActif(page, 1);
  await page.keyboard.press("ArrowLeft");
  await attendreActif(page, 0);
  return true;
}

const etat = (page) =>
  page.evaluate(() => {
    const secs = [...document.querySelectorAll("[data-chapter-section]")];
    const visibles = secs.filter((s) => getComputedStyle(s).display !== "none");
    const actifs = secs.filter((s) => s.getAttribute("data-chapter-active") === "true");
    const pos = document.querySelector(".chapter-position");
    const railItems = document.querySelectorAll(".notion-rail li").length;
    const railActif = document.querySelector('.notion-rail button[aria-current="step"]');
    return {
      total: secs.length,
      visibles: visibles.map((s) => Number(s.getAttribute("data-chapter-index"))),
      actifs: actifs.map((s) => Number(s.getAttribute("data-chapter-index"))),
      position: pos ? pos.textContent.trim() : null,
      railItems,
      railActif: railActif ? railActif.textContent.trim().slice(0, 40) : null,
      transport: document.querySelectorAll(".chapter-transport:not([hidden])").length,
      url: location.search,
    };
  });

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});

for (const [route, note] of LECONS) {
  const page = await navigateur.newPage({ viewport: { width: 1280, height: 900 } });
  const url = `${BASE}/notions/${route}`;
  try {
    // ── 1. HTML brut, sans JS : tous les chapitres présents ────────────────
    // La pagination est une couche d'affichage, pas un découpage du contenu.
    // Si le serveur n'envoyait que le chapitre 1, l'indexation, l'impression
    // et les ancres profondes seraient toutes fausses en même temps.
    // Les `<script>` de Next rejouent le même balisage dans la charge RSC :
    // compter sur le document entier donnait exactement le double. On ne
    // compte que le HTML.
    const brut = (await (await fetch(url)).text()).replace(/<script[\s\S]*?<\/script>/g, "");
    const nBrut = (brut.match(/data-chapter-section/g) ?? []).length;
    dit(nBrut >= 1, route, "HTML serveur : chapitres présents", `${nBrut} sections dans le HTML brut`);

    await nav(page, url);
    const brutEtat = await etat(page);
    await prouverHydratation(page, brutEtat.total);
    const e1 = await etat(page);

    // ── 2. un seul chapitre visible, et c'est le premier ───────────────────
    dit(
      e1.visibles.length === 1 && e1.visibles[0] === 0,
      route, "chargement : un seul chapitre visible, le premier",
      `visibles = [${e1.visibles.join(", ")}] sur ${e1.total}`
    );

    // ── 3. le HTML brut porte le même compte que le DOM hydraté ────────────
    dit(nBrut === e1.total, route, "compte serveur = compte client",
      `${nBrut} au serveur, ${e1.total} après hydratation`);

    // ── 4. la position dit la vérité ───────────────────────────────────────
    const attendu1 = `Chapitre 1 / ${e1.total}`;
    dit(e1.total === 1 ? e1.position === null : e1.position === attendu1,
      route, "affordance de position",
      `« ${e1.position} » (attendu « ${attendu1} »${e1.total === 1 ? " ou rien" : ""})`);

    // ── 5. le rail a une entrée par chapitre ───────────────────────────────
    dit(e1.railItems === e1.total, route, "rail : une entrée par chapitre",
      `${e1.railItems} entrées pour ${e1.total} chapitres`);

    // ── 6. flèche droite = chapitre suivant, et l'URL le dit ───────────────
    await page.keyboard.press("ArrowRight");
    await attendreActif(page, 1);
    const e2 = await etat(page);
    dit(e2.visibles.length === 1 && e2.visibles[0] === 1 && e2.url.includes("chapitre=2"),
      route, "flèche droite → chapitre 2",
      `visibles = [${e2.visibles.join(", ")}], url = « ${e2.url} »`);

    // ── 7. flèche gauche depuis le chapitre 1 : rien ne bouge ──────────────
    // Le clamp est dans goTo ; sans lui, `current` passerait à −1 et AUCUNE
    // section ne serait active — une page blanche, sans message.
    await page.keyboard.press("ArrowLeft");
    await attendreActif(page, 0);
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(200);
    const e3 = await etat(page);
    dit(e3.visibles.length === 1 && e3.visibles[0] === 0,
      route, "flèche gauche au chapitre 1 : bornée",
      `visibles = [${e3.visibles.join(", ")}]`);

    // ── 8. lien profond `?chapitre=n` ──────────────────────────────────────
    // On MESURE au passage le « flash du chapitre 1 » que la spec assume
    // (ChapterShell, commentaire de tête) : le HTML statique ne peut pas
    // connaître la query string, donc le premier peint est toujours le
    // chapitre 1, et le bon chapitre arrive avec l'hydratation. Cet arbitrage
    // était écrit ; sa DURÉE ne l'était pas.
    const cible = Math.min(3, e1.total);
    const t0 = Date.now();
    await nav(page, `${url}?chapitre=${cible}`);
    let flash = null;
    try { await attendreActif(page, cible - 1); flash = Date.now() - t0; } catch { /* rompu ci-dessous */ }
    const e4 = await etat(page);
    dit(e4.visibles.length === 1 && e4.visibles[0] === cible - 1,
      route, `lien profond ?chapitre=${cible}`,
      `visibles = [${e4.visibles.join(", ")}], position « ${e4.position} »`);
    if (flash !== null) flashs.push([route, flash]);

    // ── 9. hors bornes : on retombe au chapitre 1, jamais dans le vide ─────
    await nav(page, `${url}?chapitre=999`);
    await prouverHydratation(page, e1.total);
    const e5 = await etat(page);
    dit(e5.visibles.length === 1 && e5.visibles[0] === 0,
      route, "?chapitre=999 → retour au chapitre 1",
      `visibles = [${e5.visibles.join(", ")}]`);

    // ── 10. ancre profonde `#titre` → son chapitre ─────────────────────────
    // Une ancre partagée (ou un lien interne du corpus) doit ouvrir le
    // chapitre qui CONTIENT le titre, pas le chapitre 1 avec un scroll dans
    // du contenu masqué.
    const ancre = await page.evaluate(() => {
      const secs = [...document.querySelectorAll("[data-chapter-section]")];
      for (let i = secs.length - 1; i > 0; i--) {
        const h = secs[i].querySelector("h2[id], h3[id]");
        if (h) return { id: h.id, index: i };
      }
      return null;
    });
    if (ancre) {
      await nav(page, `${url}#${ancre.id}`);
      try { await attendreActif(page, ancre.index); } catch { /* rompu ci-dessous */ }
      const e6 = await etat(page);
      dit(e6.visibles.length === 1 && e6.visibles[0] === ancre.index,
        route, `ancre #${ancre.id} → chapitre ${ancre.index + 1}`,
        `visibles = [${e6.visibles.join(", ")}]`);
    } else {
      dit(true, route, "ancre profonde", "aucun titre avec id hors du chapitre 1 — sans objet");
    }

    // ── 11. impression : tout déplié, chrome de navigation retiré ──────────
    await nav(page, `${url}?chapitre=2`);
    try { await attendreActif(page, 1); } catch { /* la sonde 8 l'aura déjà dit */ }
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(120);
    const imp = await page.evaluate(() => {
      const secs = [...document.querySelectorAll("[data-chapter-section]")];
      const vis = secs.filter((s) => getComputedStyle(s).display !== "none").length;
      const visible = (sel) => {
        const el = document.querySelector(sel);
        return el ? getComputedStyle(el).display !== "none" : null;
      };
      return {
        total: secs.length, vis,
        rail: visible(".notion-rail"),
        position: visible(".chapter-position"),
        transport: visible(".chapter-transport"),
        retenir: visible(".notion-retenir"),
      };
    });
    dit(imp.vis === imp.total, route, "impression : tous les chapitres dépliés",
      `${imp.vis} visibles sur ${imp.total}`);
    dit(imp.rail !== true && imp.position !== true && imp.transport !== true && imp.retenir !== true,
      route, "impression : chrome d'écran retiré",
      `rail=${imp.rail} position=${imp.position} transport=${imp.transport} retenir=${imp.retenir}`);
    await page.emulateMedia({ media: "screen" });
  } catch (err) {
    dit(false, route, "SONDE INTERROMPUE", String(err).split("\n")[0]);
  }
  await page.close();
  console.log(`· ${route} — ${note}`);
}

await navigateur.close();
if (flashs.length) {
  console.log("\nFlash du chapitre 1 sur lien profond (arbitrage assumé, spec §1.3) :");
  for (const [r, ms] of flashs) console.log(`  ${String(ms).padStart(5)} ms  ${r}`);
}
console.log(`\n${ok} tenues, ${ko} rompues`);
process.exit(ko ? 1 : 0);
