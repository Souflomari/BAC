/**
 * Balayage HORS LIGNE — ce que voit un élève quand la connexion tombe.
 *
 * Point 5 de la liste des angles morts (`docs/audits/INSTRUMENTS.md`).
 * L'élève visé lit sur un téléphone, souvent en 3G, parfois dans un train ou
 * un village où le réseau va et vient. La question n'est pas académique :
 * **que se passe-t-il quand la connexion meurt au milieu d'un chapitre ?**
 *
 * QUATRE SCÈNES, jouées dans l'ordre où elles arrivent vraiment :
 *
 *   1. LA LEÇON EST CHARGÉE, LE RÉSEAU MEURT. La navigation par chapitre
 *      doit continuer de marcher : tout est déjà dans la page. Si elle
 *      s'arrête, l'élève est enfermé sur un chapitre.
 *   2. IL CLIQUE VERS UNE AUTRE LEÇON. Next ne peut pas charger la route.
 *      Que voit-il ? Un message honnête, ou une page morte qui ne dit rien ?
 *   3. IL RÉPOND À UN QCM. Le retour (bonne/mauvaise réponse) est-il rendu
 *      côté client — donc encore là — ou attend-il le serveur ?
 *   4. LE RÉSEAU REVIENT. Est-ce que quelque chose se répare tout seul, ou
 *      faut-il recharger ?
 *
 * On ne juge pas la présence d'un service worker : le produit n'en a pas, et
 * c'est une décision d'architecture. On mesure ce que l'élève VIT avec ce
 * qui existe aujourd'hui.
 */
import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://127.0.0.1:3495";
const LECON = process.env.LECON ?? "/notions/pc/rlc-serie";

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);
await cdp.send("Network.enable");

const couper = () => cdp.send("Network.emulateNetworkConditions",
  { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
const rendre = () => cdp.send("Network.emulateNetworkConditions",
  { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });

const dire = (ok, texte) => console.log(`  ${ok ? "✓" : "✗"} ${texte}`);

console.log(`\nHORS LIGNE — ${LECON}\n`);

await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);

// ── 1. le réseau meurt, la navigation par chapitre doit survivre ─────────
await couper();
const avant = await page.evaluate(() =>
  document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(700);
const apres = await page.evaluate(() =>
  document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
dire(apres !== avant, `1. navigation par chapitre hors ligne : ${avant} → ${apres}`);

// ── 2. un lien vers une AUTRE leçon ──────────────────────────────────────
//
// On repart d'une page FRAÎCHE : la scène 1 a poussé une entrée d'historique
// (le changement de chapitre), et le « Retour » de la scène 2 bis mesurait
// alors ce recul-là, pas le retour depuis la page d'erreur. Premier jet :
// « rien ne revient » — c'était faux, et c'est le genre de conclusion qu'on
// ne corrige que si l'on rejoue la scène isolément.
// On se place VOLONTAIREMENT au chapitre 5 : la question n'est pas seulement
// « la leçon revient-elle ? » mais « l'élève retrouve-t-il SA PLACE ? ».
await rendre();
await page.goto(`${BASE}${LECON}?chapitre=5`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
const placeAvant = await page.evaluate(() =>
  document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?");
await couper();

const cible = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a[href^="/notions/"]')]
    .find((x) => !x.getAttribute("href").includes(location.pathname.split("/").pop()));
  return a ? a.getAttribute("href") : null;
});
let ecran = "(aucun lien trouvé)";
if (cible) {
  const urlAvant = page.url();
  await page.evaluate((h) => {
    const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href") === h);
    a?.click();
  }, cible);
  await page.waitForTimeout(3500);
  const urlReelle = page.url();
  ecran = await page.evaluate(() => {
    const t = document.body.innerText.trim();
    return {
      url: location.pathname,
      titre: (document.querySelector("h1")?.textContent || "").trim().slice(0, 60),
      debut: t.slice(0, 120).replace(/\s+/g, " "),
      vide: t.length < 40,
      messageReseau: /hors ligne|connexion|réseau|internet|réessay/i.test(t),
    };
  });
  const bouge = ecran.url !== new URL(urlAvant).pathname;
  dire(!ecran.vide, `2. clic vers ${cible} hors ligne — page ${bouge ? "changée" : "inchangée"}, ${ecran.vide ? "ÉCRAN VIDE" : "contenu présent"}`);
  console.log(`       url réelle=${urlReelle} · h1=« ${ecran.titre} »`);
  console.log(`       début : « ${ecran.debut} »`);
  console.log(`       message de réseau explicite : ${ecran.messageReseau ? "oui" : "NON"}`);
}

// ── 2 bis. IL FAIT « RETOUR ». Retrouve-t-il sa leçon, et son chapitre ? ──
//
// C'est la nuance qui décide de la gravité : si le bouton Retour ramène la
// leçon là où elle était, l'élève a perdu trois secondes ; sinon, il a perdu
// sa place et doit tout retrouver sur une connexion qui ne marche pas.
if (cible) {
  // `waitUntil: "load"` se résout parfois SUR la page d'erreur elle-même :
  // le premier jet concluait « rien ne revient » alors que la leçon revient
  // parfaitement. On attend donc que le DOM de la leçon soit là, pas qu'un
  // événement de chargement passe.
  await page.goBack({ waitUntil: "load", timeout: 30000 }).catch(() => {});
  await page.waitForSelector("[data-chapter-section]", { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(800);
  const urlBis = page.url();
  const retourne = await page.evaluate(() => ({
    url: location.pathname + location.search,
    chapitre: document.querySelector('[data-chapter-active="true"]')?.getAttribute("data-chapter-index") ?? "?",
    defile: Math.round(window.scrollY),
    vivant: !!document.querySelector("[data-chapter-section]"),
  }));
  dire(retourne.vivant,
    `2 bis. bouton Retour hors ligne : ${retourne.vivant ? "la leçon revient" : "RIEN NE REVIENT"} ` +
    `— place avant=${placeAvant}, après=${retourne.chapitre} ` +
    `(url=${urlBis}, chapitre actif=${retourne.chapitre}, défilement=${retourne.defile}px)`);
}

// ── 2 ter. ET SI LA LEÇON A DÉJÀ ÉTÉ VISITÉE ? ───────────────────────────
//
// Next garde en mémoire les routes déjà chargées (cache du routeur), et
// PRÉCHARGE les liens visibles. Ce préchargement coûte ~920 ko sur l'accueil
// — un vrai sujet pour un forfait marocain — mais il pourrait, en échange,
// garder la navigation vivante quand le réseau tombe. On mesure l'échange,
// au lieu de le supposer.
await rendre();
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
const voisine = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a[href^="/notions/"]')]
    .find((x) => !location.pathname.endsWith(x.getAttribute("href").split("/").pop()));
  return a ? a.getAttribute("href") : null;
});
if (voisine) {
  await page.goto(`${BASE}${voisine}`, { waitUntil: "networkidle" });   // on la VISITE
  await page.goBack({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await couper();
  await page.evaluate((h) => {
    const a = [...document.querySelectorAll("a")].find((x) => x.getAttribute("href") === h);
    a?.click();
  }, voisine);
  await page.waitForTimeout(3000);
  const urlTer = page.url();
  const etat = await page.evaluate(() => ({
    url: location.pathname,
    vivant: !!document.querySelector("[data-chapter-section]"),
    chrome: /ERR_[A-Z_]+|No internet/.test(document.body.innerText),
  }));
  dire(etat.vivant && !etat.chrome,
    `2 ter. leçon DÉJÀ VISITÉE, cliquée hors ligne : ${etat.vivant ? "elle s'ouvre" : "écran du navigateur"} (url=${urlTer})`);
}

// ── 3. répondre à un QCM hors ligne ──────────────────────────────────────
await rendre();
await page.goto(`${BASE}${LECON}`, { waitUntil: "networkidle" });
await page.evaluate(() => document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false)));
await page.waitForTimeout(500);
await couper();
const qcm = await page.evaluate(() => {
  // Un bouton de choix vit DANS un item de QCM ; on le prend par son
  // ancêtre, pas par sa classe (le nom de classe est du Tailwind, il change).
  const item = document.querySelector("[data-item-id]");
  const b = item ? item.querySelector("button") : null;
  if (!b) return { trouve: false };
  b.click();
  return { trouve: true, item: item.getAttribute("data-item-id") };
});
await page.waitForTimeout(1200);
if (qcm.trouve) {
  const retour = await page.evaluate(() => {
    const live = [...document.querySelectorAll("[aria-live]")].map((e) => (e.textContent || "").trim()).filter(Boolean);
    const marque = document.querySelectorAll('[data-correct], [aria-pressed="true"], [data-choisi="true"]').length;
    return { live: live.slice(0, 2), marque };
  });
  dire(retour.marque > 0 || retour.live.length > 0,
    `3. réponse à un QCM hors ligne : ${retour.marque} marque(s) d'état, régions live « ${retour.live.join(" | ")} »`);
} else {
  console.log("  · 3. aucun bouton de choix trouvé sur cette leçon");
}

// ── 4. le réseau revient ─────────────────────────────────────────────────
await rendre();
await page.waitForTimeout(1200);
// On cherche une BANNIÈRE d'erreur de l'application, pas le mot « erreur » :
// la prose des leçons dit « l'erreur classique à éviter » à chaque chapitre,
// et le premier jet du balayage le comptait comme une panne.
const repare = await page.evaluate(() => ({
  interactif: !!document.querySelector('[data-chapter-active="true"]'),
  banniere: !!document.querySelector('[role="alert"], [data-erreur], .error-boundary'),
  chromeErreur: /ERR_[A-Z_]+|No internet|Pas d.internet/.test(document.body.innerText),
}));
dire(repare.interactif && !repare.banniere && !repare.chromeErreur,
  `4. après retour du réseau : page ${repare.interactif ? "toujours vivante" : "MORTE"}` +
  `${repare.banniere ? ", bannière d'erreur affichée" : ""}${repare.chromeErreur ? ", page d'erreur du navigateur" : ""}`);

await nav.close();
