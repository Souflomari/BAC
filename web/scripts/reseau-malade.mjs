/**
 * Balayage RÉSEAU MALADE — la connexion qui rampe, pas celle qui meurt.
 *
 * Point 4 de la liste des angles morts (`docs/audits/INSTRUMENTS.md`) :
 * `horsligne-sweep` mesure la coupure FRANCHE, et la coupure franche est le
 * cas FACILE — le navigateur sait qu'il est hors ligne, l'application aussi.
 * Le cas réel d'un élève marocain en 3G de bord de village est l'autre :
 * **le réseau répond, mais mal**. 300 ms de latence, quelques centaines de
 * kbit/s, et une requête sur cinq qui n'arrive jamais.
 *
 * C'est le pire cas pour une application à chargement fractionné : un seul
 * morceau de JavaScript perdu peut laisser une page qui S'AFFICHE mais ne
 * RÉPOND à rien — l'élève voit son cours, appuie, et rien ne bouge. Aucun
 * instrument de ce dépôt ne mesurait cela.
 *
 * CINQ SCÈNES :
 *   1. PREMIER CHARGEMENT à 20 % de pertes. La prose arrive-t-elle ? Et
 *      surtout : au bout de combien de temps un APPUI change-t-il enfin de
 *      chapitre — la seule définition honnête de « la page marche ».
 *   2. UN MORCEAU DE JAVASCRIPT PERDU, ciblé. Le HTML est rendu côté
 *      serveur : le cours doit rester LISIBLE même si l'hydratation échoue.
 *      Reste-t-il lisible ? Et l'élève est-il prévenu que ça ne répond plus ?
 *   3. NAVIGATION vers une autre leçon sous pertes. Arrive-t-elle ? En
 *      combien de temps ? Ou l'élève tombe-t-il sur le mur de Chrome, en
 *      anglais, comme hors ligne ?
 *   4. RÉPONDRE À UN QCM sous pertes. Le retour est-il rendu côté client —
 *      donc immunisé — ou attend-il le réseau ?
 *   5. GUÉRISON. Le réseau redevient bon : l'application se remet-elle à
 *      naviguer sans rechargement ?
 *
 * PERTES DÉTERMINISTES. Le tirage est un générateur à graine (`--graine`),
 * pour qu'un défaut trouvé soit REJOUABLE — une mesure aléatoire qu'on ne
 * peut pas rejouer ne sert à rien.
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const LECON = process.env.LECON ?? "/notions/pc/rlc-serie";
const args = process.argv.slice(2);
const lire = (nom, defaut) => {
  const i = args.indexOf(`--${nom}`);
  return i >= 0 && args[i + 1] ? Number(args[i + 1]) : defaut;
};
const PERTE = lire("perte", 0.2);
const LATENCE = lire("latence", 300);
const GRAINE = lire("graine", 20260904);

// Générateur à graine (mulberry32) : mêmes pertes d'un run à l'autre.
let etat = GRAINE >>> 0;
const alea = () => {
  etat = (etat + 0x6d2b79f5) >>> 0;
  let t = etat;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");

const comptes = { total: 0, perdues: 0 };
let pertesActives = false;
let cibleUnique = null;      // scène 2 : ne perdre QU'UN morceau, choisi

await page.route("**/*", async (route) => {
  const url = route.request().url();
  if (!url.startsWith(BASE)) return route.continue();
  comptes.total++;
  if (cibleUnique && url.includes(cibleUnique)) {
    comptes.perdues++;
    return route.abort("failed");
  }
  if (pertesActives && alea() < PERTE) {
    comptes.perdues++;
    return route.abort("failed");
  }
  return route.continue();
});

const brider = (latence) => cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: latence,
  downloadThroughput: (400 * 1024) / 8,   // ~400 kbit/s
  uploadThroughput: (200 * 1024) / 8,
});
const guerir = () => cdp.send("Network.emulateNetworkConditions",
  { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

const dire = (ok, texte) => console.log(`  ${ok ? "✓" : "✗"} ${texte}`);
const chapitre = () => page.evaluate(() =>
  document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");

/** Le seul test honnête de « ça marche » : un APPUI change-t-il de chapitre ? */
async function delaiReactif(limite = 25000) {
  const t0 = Date.now();
  const depart = await chapitre();
  while (Date.now() - t0 < limite) {
    await page.keyboard.press("ArrowRight").catch(() => {});
    await page.waitForTimeout(250);
    if ((await chapitre()) !== depart) return Date.now() - t0;
  }
  return null;
}

console.log(
  `\nRÉSEAU MALADE — ${LECON}\n` +
  `perte ${(PERTE * 100).toFixed(0)} %, latence ${LATENCE} ms, ~400 kbit/s, graine ${GRAINE}\n`
);

// ── 0. LE TÉMOIN — sans lui, tout le reste est invérifiable ─────────────
// Un « jamais réactif » ne vaut rien si l'on n'a pas prouvé que la mesure
// SAIT dire « réactif ». On joue donc la même scène sur un réseau parfait :
// si le témoin échoue, l'instrument se tait au lieu de conclure.
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
const tTemoin = await delaiReactif(10000);
dire(tTemoin !== null,
  `0. TÉMOIN, réseau parfait : réactif ${tTemoin === null ? "JAMAIS — L'INSTRUMENT NE MESURE RIEN" : `après ${tTemoin} ms`}`);
if (tTemoin === null) {
  console.log("\n  L'appui clavier ne change pas de chapitre même sans perte :");
  console.log("  la suite ne serait pas une mesure du réseau. Arrêt.");
  await nav.close();
  process.exit(2);
}

// ── 1. premier chargement sous pertes ────────────────────────────────────
await brider(LATENCE);
pertesActives = true;
const t0 = Date.now();
let erreurNav = null;
let essais = 0;
// LA REQUÊTE DU DOCUMENT PEUT ÊTRE CELLE QUI SE PERD. Il n'y a alors pas
// d'application du tout : l'élève voit le mur du navigateur, en anglais.
// Un humain réessaie ; l'instrument aussi, et il DIT combien de fois.
for (; essais < 3; essais++) {
  erreurNav = null;
  await page.goto(`${BASE}${LECON}`, { waitUntil: "domcontentloaded", timeout: 60000 })
    .catch((e) => { erreurNav = e.message.split("\n")[0].replace(/^page\.goto: /, ""); });
  if (!erreurNav) break;
}
const tHtml = Date.now() - t0;
if (essais > 0) {
  console.log(`     (le document lui-même s'est perdu ${essais} fois — sans réessai,` +
    " l'élève n'a AUCUNE application, seulement le mur du navigateur en anglais)");
}
const prose = await page.evaluate(() =>
  (document.querySelector("main")?.innerText ?? "").trim().length).catch(() => 0);
dire(!erreurNav && prose > 400,
  `1. premier chargement : HTML en ${tHtml} ms, ${prose} caractères de prose` +
  (erreurNav ? ` — ÉCHEC : ${erreurNav}` : ""));
const tReactif = await delaiReactif();
dire(tReactif !== null,
  `   réactif au clavier ${tReactif === null ? "JAMAIS (25 s)" : `après ${tReactif} ms`}` +
  ` · ${comptes.perdues}/${comptes.total} requêtes perdues`);
if (tReactif === null) {
  // La page est morte : l'élève est-il PRÉVENU ? La veille se déclenche à
  // 12 s, et les 25 s de la sonde sont déjà passées.
  const veille = await page.evaluate(() => {
    const e = document.getElementById("hydratation-perdue");
    return e instanceof HTMLElement && !e.hidden && e.innerText.trim().length > 20;
  }).catch(() => false);
  dire(veille,
    `   ${veille ? "mais la VEILLE D'HYDRATATION l'a prévenu et propose de recharger"
                 : "et RIEN ne le prévient — page lisible, page morte, silence"}`);
}

// ── 2. un morceau de JavaScript perdu, et lui seul ───────────────────────
pertesActives = false;
await guerir();
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
const morceaux = await page.evaluate(() =>
  performance.getEntriesByType("resource")
    .map((r) => r.name)
    .filter((n) => /\/_next\/static\/chunks\/.*\.js$/.test(n)));
if (morceaux.length === 0) {
  dire(false, "2. aucun morceau JS repéré — scène non jouée (l'instrument le dit plutôt que de se taire)");
} else {
  // Le PLUS GROS : c'est celui qui a le plus de chances de manquer, et celui
  // dont l'absence coûte le plus.
  const tailles = await page.evaluate(() =>
    Object.fromEntries(performance.getEntriesByType("resource")
      .filter((r) => /\/_next\/static\/chunks\/.*\.js$/.test(r.name))
      .map((r) => [r.name, r.transferSize || r.encodedBodySize || 0])));
  const choisi = Object.entries(tailles).sort((a, b) => b[1] - a[1])[0][0];
  cibleUnique = choisi.replace(BASE, "");
  const ctxNeuf = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p2 = await ctxNeuf.newPage();
  await p2.route("**/*", async (route) => {
    if (route.request().url().includes(cibleUnique)) return route.abort("failed");
    return route.continue();
  });
  await p2.goto(`${BASE}${LECON}`, { waitUntil: "domcontentloaded", timeout: 60000 }).catch(() => {});
  // 14 s : la veille d'hydratation se déclenche à 12 s (PageShell).
  await p2.waitForTimeout(14000);
  const lisible = await p2.evaluate(() => (document.querySelector("main")?.innerText ?? "").trim().length);
  const avant2 = await p2.evaluate(() =>
    document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
  await p2.keyboard.press("ArrowRight");
  await p2.waitForTimeout(1200);
  const apres2 = await p2.evaluate(() =>
    document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
  // On cherche la VEILLE, pas un mot au hasard dans la page : un bandeau
  // rendu et révélé, ou rien.
  const avertit = await p2.evaluate(() => {
    const e = document.getElementById("hydratation-perdue");
    if (!e || e.hidden) return false;
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && e.innerText.trim().length > 20;
  });
  dire(lisible > 400,
    `2. morceau JS perdu (${(tailles[choisi] / 1024).toFixed(0)} ko) : ${lisible} caractères restent lisibles`);
  dire(apres2 !== avant2 || avertit,
    `   ${apres2 !== avant2 ? "et la page RÉPOND quand même" :
      avertit ? "la page ne répond plus, mais la VEILLE D'HYDRATATION prévient et propose de recharger" :
      "la page ne répond plus ET NE PRÉVIENT PAS — le cours est lisible, l'élève est bloqué en silence"}`);
  await ctxNeuf.close();
  cibleUnique = null;
}

// ── 3. navigation vers une autre leçon sous pertes ───────────────────────
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
// PIÈGE PAYÉ (2026-09-04) : le premier `a[href^="/notions/"]` de la page est
// dans le PANNEAU NOTIONS du header, replié — boîte 0×0. Playwright ne peut
// pas le cliquer, `page.click` expirait au bout de 30 s, le `.catch()` avalait
// l'erreur, et la scène concluait « navigation perdue » alors qu'AUCUN CLIC
// n'avait eu lieu. Un lien qu'on ne peut pas cliquer n'est pas une mesure du
// réseau. On exige donc une cible VISIBLE, comme celle qu'un élève touche.
// SECOND PIÈGE, découvert dans la foulée : une page de leçon n'a AUCUN lien
// visible vers une autre LEÇON — ils vivent tous dans le panneau Notions du
// header, replié. Le geste réel d'un élève qui quitte sa leçon, c'est le lien
// de matière ou l'accueil. On prend donc n'importe quelle route interne
// visible, en préférant une leçon si par hasard il y en a une.
const cible = await page.evaluate(() => {
  const ici = location.pathname;
  const visible = (x) => {
    const r = x.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) return false;
    const cs = getComputedStyle(x);
    return cs.visibility !== "hidden" && cs.display !== "none" &&
      !x.closest("[hidden],[aria-hidden='true']");
  };
  const liens = [...document.querySelectorAll('a[href^="/"]')].filter((x) => {
    const h = (x.getAttribute("href") || "").split("?")[0].split("#")[0];
    return h && h !== ici && !h.startsWith("//") && visible(x);
  });
  const a = liens.find((x) => x.getAttribute("href").startsWith("/notions/")) ?? liens[0];
  return a ? a.getAttribute("href") : null;
});
if (!cible) {
  dire(false, "3. aucun lien vers une autre leçon trouvé — scène non jouée");
} else {
  await brider(LATENCE);
  pertesActives = true;
  const t1 = Date.now();
  let clicOk = true;
  await page.click(`a[href="${cible}"]`, { timeout: 10000 })
    .catch((e) => { clicOk = false; console.log(`     ✗ LE CLIC N'A PAS EU LIEU : ${e.message.split("\n")[0]}`); });
  let arrive = false;
  for (let i = 0; i < 60; i++) {
    await page.waitForTimeout(500);
    const u = page.url();
    if (u.includes(cible.split("?")[0])) {
      const p = await page.evaluate(() =>
        (document.querySelector("main")?.innerText ?? "").trim().length).catch(() => 0);
      if (p > 400) { arrive = true; break; }
    }
  }
  const t = Date.now() - t1;
  const vue = await page.evaluate(() => ({
    url: location.pathname,
    mur: /ERR_|No internet|Aw, Snap|This site can/i.test(document.body.innerText),
    titre: (document.querySelector("h1")?.innerText ?? "").slice(0, 48),
    prose: (document.querySelector("main")?.innerText ?? "").trim().length,
  })).catch(() => ({ url: "?", mur: true, titre: "", prose: 0 }));
  dire(arrive && clicOk,
    `3. navigation vers ${cible} : ${!clicOk ? "NON MESURÉE (clic impossible)" :
      arrive ? `arrivée en ${t} ms` : `PERDUE au bout de ${t} ms`}`);
  console.log(`     l'élève voit : ${vue.url} · « ${vue.titre} » · ${vue.prose} caractères` +
    (vue.mur ? " · MUR DU NAVIGATEUR (message en anglais)" : ""));
  if (!arrive && clicOk) {
    console.log("     et RIEN ne le dit — il est resté sur la page de départ" +
      " sans aucun signe que son clic a échoué");
  }
}

// ── 4. répondre à un QCM sous pertes ─────────────────────────────────────
pertesActives = false;
await guerir();
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
// Le QCM n'est pas au premier chapitre : on le CHERCHE, chapitre par
// chapitre, au lieu de conclure « pas de QCM » depuis la page d'accueil de
// la leçon — une scène non jouée par paresse d'instrument est un angle mort
// de plus, pas un résultat.
// `data-item-id` est l'ancre stable posée par McqItem (elle sert déjà à
// dom-truth) : on vise CELLE-LÀ, pas une forme de libellé qui changera.
const trouverQcm = () => page.evaluate(() =>
  Boolean(document.querySelector("[data-item-id] button")));
let aQcm = await trouverQcm();
for (let i = 0; i < 12 && !aQcm; i++) {
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);
  aQcm = await trouverQcm();
}
if (!aQcm) {
  dire(false, "4. aucun QCM trouvé en 12 chapitres — scène non jouée (et c'est l'instrument qui le dit, pas un silence)");
} else {
  await brider(LATENCE);
  pertesActives = true;
  const avantTexte = await page.evaluate(() => document.body.innerText.length);
  await page.evaluate(() => {
    document.querySelector("[data-item-id] button")?.click();
  });
  await page.waitForTimeout(1500);
  const apresTexte = await page.evaluate(() => document.body.innerText.length);
  dire(apresTexte !== avantTexte,
    `4. réponse à un QCM sous pertes : le retour ${apresTexte !== avantTexte ? "s'affiche" : "NE S'AFFICHE PAS"}`);
}

// ── 5. guérison ─────────────────────────────────────────────────────────
// DEUX CIBLES, et la distinction compte pour qui devra corriger : si la
// route qui a échoué reste morte alors qu'une AUTRE passe, le routeur a
// empoisonné cette entrée-là ; si les deux restent mortes, il est coincé
// tout entier. Et dans les deux cas, on demande si un rechargement répare —
// c'est la différence entre « attends » et « recharge », le seul conseil
// qu'on pourrait donner à un élève.
pertesActives = false;
await guerir();
await page.waitForTimeout(1500);

async function essayer(href, etiquette) {
  const avant = await page.evaluate(() => location.pathname);
  const existe = await page.$(`a[href="${href}"]`);
  if (!existe) return `${etiquette} : lien absent de la page`;
  let ok = true;
  await page.click(`a[href="${href}"]`, { timeout: 10000 }).catch(() => { ok = false; });
  if (!ok) return `${etiquette} : clic impossible — NON MESURÉ`;
  for (let i = 0; i < 30; i++) {
    await page.waitForTimeout(500);
    const u = await page.evaluate(() => location.pathname);
    if (u !== avant) {
      const p = await page.evaluate(() =>
        (document.querySelector("main")?.innerText ?? "").trim().length);
      if (p > 400) return `${etiquette} : arrivée en ${(i + 1) * 500} ms`;
    }
  }
  return null;
}

const memeCible = cible ? await essayer(cible, `la route qui avait échoué (${cible})`) : null;
dire(Boolean(memeCible), `5. guérison — ${memeCible ?? `la route qui avait échoué (${cible}) reste MORTE après 15 s`}`);

if (!memeCible) {
  // N'IMPORTE QUELLE autre route interne, pas seulement une leçon : la
  // question est « le routeur est-il coincé en entier ? », et l'accueil ou
  // une page de matière y répond aussi bien.
  const autre = await page.evaluate((exclu) => {
    const ici = location.pathname;
    const a = [...document.querySelectorAll('a[href^="/"]')]
      .find((x) => {
        const h = (x.getAttribute("href") || "").split("?")[0].split("#")[0];
        if (!h || h === ici || h === exclu || h.startsWith("//")) return false;
        const r = x.getBoundingClientRect();
        return r.width >= 8 && r.height >= 8 && !x.closest("[hidden],[aria-hidden='true']");
      });
    return a ? a.getAttribute("href") : null;
  }, cible ? cible.split("?")[0] : null);
  const r2 = autre ? await essayer(autre, `une AUTRE route (${autre})`) : "aucune autre route en page";
  console.log(`     ${r2 ?? `une AUTRE route (${autre}) reste morte aussi — le routeur est coincé en entier`}`);
  await page.reload({ waitUntil: "domcontentloaded" }).catch(() => {});
  await page.waitForTimeout(1500);
  const ok = await page.evaluate(() =>
    (document.querySelector("main")?.innerText ?? "").trim().length).catch(() => 0);
  console.log(`     un rechargement ${ok > 400 ? "répare" : "ne répare pas"} (${ok} caractères)`);
}

console.log(`\n${comptes.perdues} requête(s) perdue(s) sur ${comptes.total} au total.`);
await nav.close();
