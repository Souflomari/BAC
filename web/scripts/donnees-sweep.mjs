/**
 * Balayage DONNÉES — ce que le produit coûte au FORFAIT de l'élève.
 *
 * POURQUOI. C'est le point 1 de « ce que RIEN ne mesure encore »
 * (docs/audits/INSTRUMENTS.md), et il y est resté après que `poids-sweep` a
 * fermé la partie « temps de chargement » : le poids de PEINTURE et la
 * CONSOMMATION de données sont deux questions différentes, et la seconde est
 * la plus grave ici. L'élève visé achète des recharges de données. Ce qu'il
 * paie n'est pas ce que le chronomètre montre.
 *
 * LA DIFFÉRENCE, ET C'EST TOUT LE SUJET. `poids-sweep` somme les
 * `transferSize` du moment où la page se peint : c'est la mesure de
 * l'attente. Mais `next/link` précharge, APRÈS la peinture, la charge RSC
 * de chaque lien entré dans le champ de vision. Ces octets-là n'apparaissent
 * dans aucun LCP, dans aucun temps de blocage, dans aucune capture. Ils sont
 * invisibles à tous les instruments existants — et ils sont facturés.
 *
 * CE QU'ON MESURE, en octets de FIL (`encodedDataLength` du protocole
 * CDP : corps compressé + en-têtes, ce que l'opérateur compte), jamais en
 * taille de source :
 *
 *   · AVANT  — les octets demandés jusqu'à l'événement `load`. C'est le prix
 *              d'entrée : sans eux, pas de page.
 *   · APRÈS  — les octets demandés ENSUITE, page immobile, sans un geste de
 *              l'élève. C'est le préchargement. Personne ne l'a demandé.
 *   · DÉFILÉ — ce que le simple fait de faire défiler la page ajoute, parce
 *              que le préchargement de `next/link` se déclenche à l'entrée
 *              dans le champ de vision : sur une page de liste, défiler
 *              coûte de l'argent.
 *
 * QUATRE PASSES.
 *
 *   A — les routes de LISTE (accueil, matières, examens) à froid, immobiles
 *       puis défilées. Ce sont elles qui portent beaucoup de liens ; c'est
 *       là que le préchargement se voit.
 *   B — une leçon, à froid : le prix d'entrée d'un cours, et ce que la page
 *       tire toute seule ensuite.
 *   C — une SESSION type, cache actif, comme un vrai navigateur : accueil →
 *       matière → leçon → dérouler → répondre à un point d'arrêt. Le total
 *       est ce que l'élève paie vraiment pour une séance de révision, et la
 *       ventilation dit quelle part n'a servi à rien.
 *   D — l'en-tête `Save-Data: on` (Data Saver d'Android/Chrome, envoyé par
 *       le navigateur d'un élève qui a activé l'économiseur) : le produit
 *       en tient-il compte ? Un OUI/NON, mesuré.
 *
 * CE QU'IL NE DIT RIEN DE : le CDN, le cache HTTP de Vercel, la compression
 * réelle en production (Brotli côté Vercel plutôt que gzip local) — le total
 * transposable est l'ORDRE DE GRANDEUR, pas le chiffre à l'octet près. Et
 * il ne dit rien de ce que l'élève ferait VRAIMENT : la session de la passe
 * C est un parcours plausible, pas une statistique d'usage.
 *
 *   node scripts/donnees-sweep.mjs           → le rapport (quatre passes)
 *   node scripts/donnees-sweep.mjs --porte   → la porte (CI)
 *
 * LA PORTE est FRANCHE et à DEUX SENS, parce qu'un seul sens se satisfait
 * d'un produit cassé :
 *   · aucune page de liste ne doit tirer d'octets de préchargement sans un
 *     geste de l'élève — défiler une liste ne coûte rien ;
 *   · et le préchargement à l'INTENTION doit marcher. Supprimer tout
 *     préchargement passerait le premier contrôle en rendant la navigation
 *     plus lente ; le second l'interdit.
 * Le serveur est démarré par le script si `BASE` n'est pas fourni (même
 * convention qu'`impression.mjs`).
 */
import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import path from "node:path";

const PORTE = process.argv.includes("--porte");
const PORT = Number(process.env.PORT ?? 3496);
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const WEB = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ko = (n) => (n / 1024).toFixed(0);
const mo = (n) => (n / 1024 / 1024).toFixed(2);

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: WEB, stdio: "ignore", detached: true,
  });
  let pret = false;
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
  }
  if (!pret) {
    console.error("✗ serveur absent — rien n'est mesuré");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});

/** Attache un compteur d'octets de fil à un contexte, et rend le journal. */
async function compteur(ctx, page) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Page.enable");
  const req = new Map();
  const journal = [];
  let phase = "avant";
  cdp.on("Page.loadEventFired", () => { if (phase === "avant") phase = "apres"; });
  cdp.on("Network.requestWillBeSent", (e) => {
    const h = Object.fromEntries(
      Object.entries(e.request.headers).map(([k, v]) => [k.toLowerCase(), v])
    );
    req.set(e.requestId, {
      url: e.request.url.replace(BASE, ""),
      type: e.type,
      phase,
      rsc: "rsc" in h || /[?&]_rsc=/.test(e.request.url),
      prefetch: h["next-router-prefetch"] === "1",
      octets: 0,
      cache: false,
    });
  });
  cdp.on("Network.responseReceived", (e) => {
    const r = req.get(e.requestId);
    if (r) { r.mime = e.response.mimeType; r.statut = e.response.status; r.cache = !!(e.response.fromDiskCache || e.response.fromPrefetchCache); }
  });
  cdp.on("Network.loadingFinished", (e) => {
    const r = req.get(e.requestId);
    if (r) { r.octets = e.encodedDataLength; journal.push(r); }
  });
  cdp.on("Network.requestServedFromCache", (e) => {
    const r = req.get(e.requestId);
    if (r) r.cache = true;
  });
  return {
    cdp,
    journal,
    marquer: (p) => { phase = p; },
    bilan(filtre = () => true) {
      const l = journal.filter(filtre);
      const s = (f) => l.filter(f).reduce((a, r) => a + r.octets, 0);
      return {
        total: s(() => true),
        avant: s((r) => r.phase === "avant"),
        apres: s((r) => r.phase === "apres"),
        defile: s((r) => r.phase === "defile"),
        rsc: s((r) => r.rsc),
        prefetch: s((r) => r.prefetch),
        nPrefetch: l.filter((r) => r.prefetch).length,
        n: l.length,
      };
    },
  };
}

async function froid(route, { defiler = false, entetes = null, cpuOff = true } = {}) {
  const ctx = await nav.newContext({
    viewport: { width: 390, height: 780 },
    ...(entetes ? { extraHTTPHeaders: entetes } : {}),
  });
  const p = await ctx.newPage();
  const c = await compteur(ctx, p);
  await c.cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await p.goto(`${BASE}${route}`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(4000); // la page immobile : le préchargement a le temps de partir
  let apresImmobile = c.bilan();
  if (defiler) {
    c.marquer("defile");
    for (let i = 0; i < 12; i++) {
      await p.mouse.wheel(0, 900);
      await p.waitForTimeout(350);
    }
    await p.waitForTimeout(3000);
  }
  const b = c.bilan();
  const gros = [...c.journal].sort((a, b2) => b2.octets - a.octets).slice(0, 4);
  await ctx.close();
  return { ...b, apresImmobile, gros };
}

/* ── LA PORTE ─────────────────────────────────────────────────────────── */

/** Le geste d'intention part-il, et tire-t-il bien la route visée ? */
async function intention({ economise = false } = {}) {
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  if (economise) {
    // L'API Network Information n'est pas pilotable par un en-tête HTTP :
    // `Save-Data: on` et `navigator.connection.saveData` viennent du MÊME
    // réglage de l'appareil, mais Playwright ne peut poser que le premier.
    // On force donc la propriété que le produit LIT réellement.
    await p.addInitScript(() => {
      try {
        Object.defineProperty(navigator, "connection", {
          configurable: true,
          get: () => ({ saveData: true, effectiveType: "4g" }),
        });
      } catch {}
    });
  }
  const c = await compteur(ctx, p);
  await c.cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await p.goto(`${BASE}/`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3000);
  const avant = c.bilan().total;
  c.marquer("geste");
  const sel = "a[href^='/notions/']";
  const href = (await p.locator(sel).first().getAttribute("href")) ?? "";
  await p.locator(sel).first().hover({ timeout: 5000 });
  await p.waitForTimeout(2500);
  const vise = c.journal.some((r) => r.phase === "geste" && r.url.startsWith(href.split("?")[0]));
  const tire = c.bilan().total - avant;
  await ctx.close();
  return { href, vise, tire };
}

if (PORTE) {
  const echecs = [];
  const PLAFOND_DEFILE = 32 * 1024; // défiler une liste ne coûte rien

  for (const r of ["/", "/matieres/pc", "/examens"]) {
    const b = await froid(r, { defiler: true });
    if (b.prefetch > 0)
      echecs.push(
        `${r} — ${ko(b.prefetch)} ko préchargés en ${b.nPrefetch} requête(s) SANS un geste de l'élève. ` +
          `Le préchargement au champ de vision est revenu.`
      );
    if (b.defile > PLAFOND_DEFILE)
      echecs.push(`${r} — défiler la page a tiré ${ko(b.defile)} ko (plafond ${ko(PLAFOND_DEFILE)} ko).`);
  }

  const i = await intention();
  if (!i.vise)
    echecs.push(
      `le survol d'un lien de leçon ne précharge PLUS rien (${i.href}). ` +
        `Couper tout préchargement passerait le premier contrôle en rendant la navigation plus lente.`
    );

  const e = await intention({ economise: true });
  if (e.vise)
    echecs.push(
      `avec l'économiseur de données actif, le survol précharge quand même (${e.href}). ` +
        `L'élève a demandé qu'on dépense moins.`
    );

  await nav.close();
  if (echecs.length) {
    console.error("\n━━ porte donnees-sweep : ROMPUE ━━");
    for (const x of echecs) console.error(`   ${x}`);
    console.error(
      "\n   Le préchargement de next/link est invisible au chronomètre et facturé\n" +
        "   par l'opérateur. La politique vit dans src/components/ui/Lien.tsx.\n" +
        "   Rapport complet : node scripts/donnees-sweep.mjs"
    );
    process.exit(1);
  }
  console.log(
    `donnees-sweep : porte tenue — 3 pages de liste ne tirent rien sans geste, ` +
      `le survol précharge (${ko(i.tire)} ko), l'économiseur de données est honoré ✓`
  );
  process.exit(0);
}

console.log("");
console.log("donnees-sweep — ce que le produit coûte au forfait de l'élève");
console.log("═".repeat(96));
console.log("octets de FIL (corps compressé + en-têtes), cache vide, écran 390 px\n");

/* ── PASSE A — les pages de LISTE ─────────────────────────────────────── */
const LISTES = ["/", "/matieres/maths", "/matieres/pc", "/matieres/svt", "/matieres/philo", "/examens", "/commencer"];
console.log("=== PASSE A — les pages de liste : ce qu'on paie sans rien demander\n");
console.log(`${"route".padEnd(20)} ${"avant".padStart(8)} ${"après".padStart(8)} ${"défilé".padStart(8)} ${"TOTAL".padStart(8)}   ${"préchargé".padStart(9)} ${"req.".padStart(5)}`);
console.log("─".repeat(96));
const resA = [];
for (const r of LISTES) {
  const b = await froid(r, { defiler: true });
  resA.push([r, b]);
  console.log(
    `${r.padEnd(20)} ${(ko(b.avant) + " ko").padStart(8)} ${(ko(b.apres) + " ko").padStart(8)} ` +
      `${(ko(b.defile) + " ko").padStart(8)} ${(ko(b.total) + " ko").padStart(8)}   ` +
      `${(ko(b.prefetch) + " ko").padStart(9)} ${String(b.nPrefetch).padStart(5)}`
  );
}
console.log("");
for (const [r, b] of resA) {
  const part = b.total ? Math.round((b.prefetch / b.total) * 100) : 0;
  if (b.prefetch > 0)
    console.log(`  ${r} — le préchargement pèse ${ko(b.prefetch)} ko en ${b.nPrefetch} requête(s), soit ${part} % du total.`);
}

/* ── PASSE B — une leçon ──────────────────────────────────────────────── */
const LECONS = ["/notions/maths/suites-numeriques", "/notions/pc/reactions-acido-basiques", "/notions/philo/la-verite", "/notions/svt/moyens-de-defense"];
console.log("\n=== PASSE B — une leçon à froid : prix d'entrée, puis ce qu'elle tire seule\n");
console.log(`${"leçon".padEnd(46)} ${"avant".padStart(8)} ${"après".padStart(8)} ${"TOTAL".padStart(8)}   ${"préchargé".padStart(9)}`);
console.log("─".repeat(96));
for (const r of LECONS) {
  const b = await froid(r, { defiler: false });
  console.log(
    `${r.padEnd(46)} ${(ko(b.avant) + " ko").padStart(8)} ${(ko(b.apres) + " ko").padStart(8)} ` +
      `${(ko(b.total) + " ko").padStart(8)}   ${(ko(b.prefetch) + " ko").padStart(9)}`
  );
}

/* ── PASSE C — la session type, cache actif ───────────────────────────── */
console.log("\n=== PASSE C — une séance de révision, cache actif (le vrai coût)\n");
{
  const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
  const p = await ctx.newPage();
  const c = await compteur(ctx, p);
  const etapes = [];
  const jalon = (nom) => {
    const b = c.bilan();
    const prec = etapes.length ? etapes[etapes.length - 1].cumul : 0;
    etapes.push({ nom, cumul: b.total, pas: b.total - prec, prefetch: b.prefetch });
  };

  await p.goto(`${BASE}/`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3500);
  jalon("arrivée sur l'accueil");

  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 900); await p.waitForTimeout(300); }
  await p.waitForTimeout(2500);
  jalon("défiler l'accueil");

  await p.goto(`${BASE}/matieres/maths`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3000);
  jalon("ouvrir la matière maths");

  await p.goto(`${BASE}/notions/maths/suites-numeriques`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3500);
  jalon("ouvrir une leçon");

  // dérouler les chapitres : le contenu est-il déjà là, ou se télécharge-t-il ?
  const boutons = await p.locator("button, [role='button']").all();
  let ouverts = 0;
  for (const b of boutons.slice(0, 40)) {
    try {
      const e = await b.getAttribute("aria-expanded");
      if (e === "false") { await b.click({ timeout: 1500 }); ouverts++; await p.waitForTimeout(220); }
    } catch {}
    if (ouverts >= 10) break;
  }
  await p.waitForTimeout(2000);
  jalon(`dérouler ${ouverts} chapitre(s)`);

  await p.goto(`${BASE}/notions/maths/limites-continuite`, { waitUntil: "load", timeout: 120000 });
  await p.waitForTimeout(3000);
  jalon("passer à une deuxième leçon");

  console.log(`${"étape".padEnd(34)} ${"ce pas".padStart(9)} ${"cumul".padStart(9)}`);
  console.log("─".repeat(96));
  for (const e of etapes)
    console.log(`${e.nom.padEnd(34)} ${(ko(e.pas) + " ko").padStart(9)} ${(ko(e.cumul) + " ko").padStart(9)}`);
  const fin = c.bilan();
  console.log("─".repeat(96));
  console.log(
    `\n  Séance complète : ${mo(fin.total)} Mo. Dont ${ko(fin.prefetch)} ko de préchargement ` +
      `(${fin.nPrefetch} requêtes), soit ${fin.total ? Math.round((fin.prefetch / fin.total) * 100) : 0} %.`
  );
  console.log(
    `  Sur un forfait de 1 Go : ${Math.floor((1024 * 1024 * 1024) / (fin.total || 1))} séances de ce type.`
  );
  await ctx.close();
}

/* ── PASSE E — le préchargement à l'INTENTION fonctionne-t-il ? ───────── */
console.log("\n=== PASSE E — survol, focus, doigt posé : la charge part-elle ?\n");
{
  for (const [nom, geste] of [
    ["survol (pointerenter)", async (p, sel) => { await p.locator(sel).first().hover({ timeout: 5000 }); }],
    ["focus clavier", async (p, sel) => { await p.locator(sel).first().focus({ timeout: 5000 }); }],
    ["doigt posé (touchstart)", async (p, sel) => { await p.locator(sel).first().dispatchEvent("touchstart"); }],
  ]) {
    const ctx = await nav.newContext({ viewport: { width: 390, height: 780 } });
    const p = await ctx.newPage();
    const c = await compteur(ctx, p);
    await c.cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await p.goto(`${BASE}/`, { waitUntil: "load", timeout: 120000 });
    await p.waitForTimeout(3500);
    const avant = c.bilan();
    c.marquer("geste");
    let href = "(aucun lien de leçon)";
    try {
      const sel = "a[href^='/notions/']";
      href = (await p.locator(sel).first().getAttribute("href")) ?? href;
      await geste(p, sel);
      await p.waitForTimeout(2500);
    } catch (e) {
      href = `(geste impossible : ${e.message.split("\n")[0]})`;
    }
    const apres = c.bilan();
    const tire = apres.total - avant.total;
    const vise = c.journal.some((r) => r.phase === "geste" && r.url.startsWith(href.split("?")[0]));
    console.log(
      `  ${nom.padEnd(24)} ${(ko(tire) + " ko").padStart(8)} tirés · ` +
        `${vise ? "la route visée A ÉTÉ demandée ✓" : "la route visée n'a PAS été demandée ✗"}  ${href}`
    );
    await ctx.close();
  }
}

/* ── PASSE D — l'économiseur de données ───────────────────────────────── */
console.log("\n=== PASSE D — l'élève a activé l'économiseur de données\n");
{
  const normal = await intention();
  const econome = await intention({ economise: true });
  console.log(`  réglage normal        : survol → ${(ko(normal.tire) + " ko").padStart(7)} tirés · ${normal.vise ? "route visée demandée" : "rien"}`);
  console.log(`  économiseur actif     : survol → ${(ko(econome.tire) + " ko").padStart(7)} tirés · ${econome.vise ? "route visée demandée" : "rien"}`);
  console.log(
    `\n  ${econome.vise
      ? "L'économiseur n'est PAS honoré — le survol spécule quand même."
      : "L'économiseur est HONORÉ : aucune spéculation, seul le clic dépense."}`
  );
  console.log(
    "\n  (L'en-tête HTTP `Save-Data: on` et `navigator.connection.saveData` viennent\n" +
      "   du même réglage de l'appareil ; c'est la propriété JS que le produit lit,\n" +
      "   et c'est elle que cette passe force.)"
  );
}

await nav.close();
console.log("");
