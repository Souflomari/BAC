#!/usr/bin/env node
/**
 * preferences-secours.mjs — les deux préférences d'affichage survivent-elles
 * à un rendu client de SECOURS ?
 *
 * CE QU'ELLE GARDE. Le thème (`.dark`) et la taille du texte (`--font-scale`)
 * vivent sur `<html>`, posés avant la peinture par le script THEME_BOOT du
 * layout. Mais `<html>` est rendu par React, et le serveur le rend toujours
 * SANS les deux. Tant que l'hydratation réussit, React n'y touche pas. Quand
 * elle échoue — un désaccord serveur/navigateur, une exception rattrapée par
 * `error.tsx` —, React jette le HTML du serveur, refait un rendu client
 * complet, réapplique les attributs déclarés du layout, et les deux
 * préférences disparaissent. L'élève ne voit AUCUNE erreur : la page marche,
 * elle est juste repassée en clair, avec le texte redevenu petit.
 *
 * MESURÉ (2026-09-20, §11.149) : perdues sur les deux chemins de secours,
 * gardées sur une hydratation normale. Corrigé par GardePreferences.tsx, que
 * cette porte surveille.
 *
 * COMMENT ELLE PROVOQUE LE SECOURS. Elle n'a besoin d'AUCUNE route d'essai
 * dans le produit : elle intercepte le HTML servi d'une vraie page et y
 * remplace un texte que React va comparer à sa charge RSC. React voit un
 * désaccord, abandonne, et refait le rendu — le vrai chemin, sur une vraie
 * page.
 *
 * QUATRE VERDICTS HONNÊTES (ADR 0034). Une porte qui ne peut pas distinguer
 * « rien n'a cassé » de « rien n'a été mesuré » ment en vert :
 *   ROUGE  — le secours a eu lieu ET une préférence est tombée.
 *   VERTE  — le secours a eu lieu ET les deux ont tenu.
 *   MUETTE — l'injection n'a pas provoqué de secours : la porte n'a rien
 *            éprouvé. Sort en ERREUR, car une porte inerte est un mensonge
 *            vert (§11.122, ADR 0033).
 *   TÉMOIN — le chargement normal, sans injection, doit garder les deux ; s'il
 *            les perd, c'est l'instrument ou le produit qui est cassé en
 *            amont, et le reste de la mesure ne veut rien dire.
 *
 *   node scripts/preferences-secours.mjs                 → local (port 3819)
 *   node scripts/preferences-secours.mjs <base>          → une autre base
 */
import { chromium } from "playwright-core";
import fs from "node:fs";
import crypto from "node:crypto";
import { execSync } from "node:child_process";

//  Sans base explicite, la porte lève son propre `next start` — et le tue par
//  son GROUPE (`-pid`, d'où `detached`). Tuer le seul enveloppeur npm laisse
//  le serveur orphelin : mesuré ce jour, un serveur vieux de cinq heures
//  répondait encore sur son port et servait un build périmé — la mesure
//  d'après accusait le produit d'une route absente qui était en réalité la
//  mienne. Même motif que liens-internes.mjs.
const BASE_ARG = process.argv.find((a) => a.startsWith("http"));
const PORT = Number(process.env.PORT_SECOURS ?? 3900 + (process.pid % 90));
const BASE = BASE_ARG ?? `http://127.0.0.1:${PORT}`;
let serveur = null;
if (!BASE_ARG) {
  const { spawn } = await import("node:child_process");
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: new URL("..", import.meta.url).pathname, stdio: "ignore", detached: true,
  });
  let vivant = false;
  for (let i = 0; i < 60; i++) {
    try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
  }
  if (!vivant) {
    console.error("preferences-secours : `next start` n'a pas répondu. Build absent ?");
    try { process.kill(-serveur.pid); } catch {}
    process.exit(1);
  }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
const ROUTE = "/";
const ECHELLE_ATTENDUE = "1.125"; // bac-textsize = large
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");

//  Pour viser une base DISTANTE depuis ce conteneur, il faut épingler la
//  clé du relais : Chromium n'a pas de `--cacert`, et son magasin NSS date de
//  la construction de l'image alors que le CA est frappé par session
//  (deploye-sweep.mjs porte la même épingle et la même raison).
function epingle() {
  const CA = "/root/.ccr/agent-proxy-ca.crt";
  if (!fs.existsSync(CA)) return null;
  try {
    const spki = execSync(`openssl x509 -in ${CA} -pubkey -noout | openssl pkey -pubin -outform der`, { maxBuffer: 1 << 20 });
    return crypto.createHash("sha256").update(spki).digest("base64");
  } catch { return null; }
}
const pin = epingle();
const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
  args: pin ? [`--ignore-certificate-errors-spki-list=${pin}`] : [],
});

async function mesure({ injecter, saboter = false }) {
  //  ESSAI ROUGE. Le premier rouge de cette porte a été obtenu contre
  //  l'artefact DÉPLOYÉ, qui datait d'avant le correctif — un rouge vrai, mais
  //  périssable : une fois le correctif en ligne, il n'y a plus nulle part où
  //  le rejouer, et une propriété qu'on ne peut plus mesurer est un souvenir
  //  (ADR 0034). Ce mode rend le rouge REJOUABLE en quelques secondes, sans
  //  reconstruire : il sabote les ENTRÉES de la garde dans le bundle servi —
  //  les deux clés de stockage y sont renommées — et met le système en clair
  //  pendant que le stockage dit sombre. La garde lit alors une clé vide,
  //  retombe sur la préférence système, et fait exactement ce qu'elle faisait
  //  avant d'exister : rien. Les deux axes doivent crier.
  //
  //  DEUX PIÈGES PAYÉS EN L'ÉCRIVANT, et ils sont le même :
  //
  //  1. Premier jet — la garde était neutralisée sur ses DEUX clés, avec le
  //     système en clair. La porte a bien crié, mais par la branche TÉMOIN :
  //     le sabotage cassait aussi le chargement NORMAL. L'essai rouge sortait
  //     donc vert-sur-rouge en ayant prouvé autre chose que ce qu'il annonce
  //     — une porte exacte sur une question voisine (ADR 0033).
  //  2. D'où le sabotage MINIMAL retenu : on ne renomme que `bac-textsize`, et
  //     le système reste en sombre. Le chargement normal est alors intact (le
  //     script de démarrage lit la vraie clé), et seul le RÉTABLISSEMENT après
  //     secours échoue. Le rouge est attribuable au seul chemin mesuré.
  //
  //  CE QU'IL PROUVE, ET PAS PLUS : que l'alarme fonctionne sur l'axe de la
  //  taille du texte, et que la garde est bien ce qui la tient après un
  //  secours. Il ne rejoue pas le défaut d'origine — celui-là est daté, et la
  //  commande qui l'a montré est dans le HANDOFF §11.149. L'axe du THÈME n'est
  //  pas sabotable de la même façon (la garde retombe sur la préférence
  //  système, qui donne la bonne réponse) : il reste couvert par la mesure
  //  contre l'artefact déployé, et c'est écrit plutôt que passé sous silence.
  const ctx = await nav.newContext({ colorScheme: "dark" });
  const page = await ctx.newPage();
  let secours = false;
  //  DEUX FORMES DU MÊME SIGNAL, et la première m'a manqué (ADR 0036 §1). En
  //  DÉVELOPPEMENT, React écrit le désaccord en toutes lettres dans la console
  //  (« did not match the server-rendered HTML »). En PRODUCTION — le seul
  //  build que cette porte mesure — il le LÈVE, minifié, sans texte :
  //  « Minified React error #418 ». Une porte qui n'écoutait que la console et
  //  que l'anglais est revenue MUETTE sur un désaccord pourtant provoqué.
  //  418 = l'hydratation a échoué · 423 = la racine bascule en rendu client
  //  · 425 = le texte ne correspond pas. Ce sont les trois du secours.
  const estSecours = (t) =>
    /hydrat|did not match|didn't match|server HTML/i.test(t) ||
    /Minified React error #(418|423|425)\b/.test(t);
  page.on("console", (m) => { if (estSecours(m.text())) secours = true; });
  page.on("pageerror", (e) => { if (estSecours(String(e))) secours = true; });
  //  SECOND TÉMOIN, indépendant du journal : le rendu de secours RÉÉCRIT
  //  l'attribut `class` de <html> — c'est l'instant même où la préférence
  //  tombe. Un observateur posé avant tout script le compte.
  //  Posé sur `document` et non sur `document.documentElement` : un script
  //  d'initialisation tourne AVANT que <html> existe, et `observe(null)` lève
  //  — silencieusement, puisque rien ne lit cette erreur. Premier jet : le
  //  témoin annonçait « 0 réécriture » sur une page où la classe changeait
  //  deux fois. Un témoin muet qui s'affiche à côté d'un verdict vert est pire
  //  que pas de témoin.
  await page.addInitScript(() => {
    window.__mutClasse = 0;
    new MutationObserver((l) => {
      for (const m of l) if (m.target === document.documentElement) window.__mutClasse++;
    }).observe(document, { attributes: true, subtree: true, attributeFilter: ["class"] });
  });
  //  Le premier passage pose les préférences ; c'est aussi lui qui prouve que
  //  la base répond.
  await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.evaluate(() => {
    localStorage.setItem("bac-theme", "dark");
    localStorage.setItem("bac-textsize", "large");
  });
  if (saboter) {
    await page.route("**/_next/static/**/*.js", async (r) => {
      const rep = await r.fetch();
      const js = (await rep.text()).replaceAll('"bac-textsize"', '"bac-textsXze"');
      await r.fulfill({ response: rep, body: js });
    });
  }
  if (injecter) {
    await page.route(BASE + ROUTE, async (r) => {
      const rep = await r.fetch();
      let html = await rep.text();
      //  Un texte VISIBLE, rendu par React et présent tel quel dans le HTML :
      //  on le remplace par une chaîne de même longueur pour ne rien changer
      //  d'autre que le contenu comparé.
      const cible = html.match(/>([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' ]{11,40})</);
      if (cible) html = html.replace(cible[0], ">" + "z".repeat(cible[1].length) + "<");
      await r.fulfill({ response: rep, body: html });
    });
  }
  secours = false;
  await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForTimeout(3000);
  const etat = await page.evaluate(() => ({
    sombre: document.documentElement.classList.contains("dark"),
    echelle: document.documentElement.style.getPropertyValue("--font-scale"),
    mutations: window.__mutClasse ?? 0,
  }));
  await ctx.close();
  return { ...etat, secours };
}

console.log(`\n━━ les préférences survivent-elles à un rendu de secours ? — ${BASE} ━━\n`);

//  ── SECOND AXE : UNE PRÉFÉRENCE HOSTILE (§11.169, 2026-09-21) ────────────
//  La table des échelles est un LITTÉRAL D'OBJET, donc elle hérite
//  d'`Object.prototype`. `m["toString"]` y est une FONCTION — vraie —, et
//  `--font-scale` recevait « function toString() { [native code] } ». Cinq
//  clés donnaient ce résultat : toString, constructor, __proto__, valueOf,
//  hasOwnProperty.
//
//  CE QUE CELA CASSAIT, MESURÉ : rien. La valeur est invalide, CSS la jette,
//  et la page rend au pixel près comme sans préférence — 42 890 éléments,
//  distribution des tailles identique, 0 erreur de script. Le défaut est
//  LATENT : il est corrigé parce qu'il est faux, pas parce qu'il casse.
//  Cet axe existe pour qu'il le reste — le jour où une règle CSS lirait
//  `--font-scale` sans repli, du texte venu du stockage local choisirait la
//  taille de police d'un élève.
//
//  Le contrôle est volontairement LARGE : quelle que soit la valeur stockée,
//  `--font-scale` est soit vide, soit un nombre. Pas « n'est pas toString ».
const CLES_HOSTILES = ["toString", "constructor", "__proto__", "valueOf", "hasOwnProperty"];
const NOMBRE = /^\s*\d+(?:\.\d+)?\s*$/;

async function mesureHostile(valeur) {
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 60)));
  await page.addInitScript((v) => { try { localStorage.setItem("bac-textsize", v); } catch {} }, valeur);
  await page.goto(BASE + ROUTE, { waitUntil: "domcontentloaded", timeout: 30000 });
  try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 20000 }); } catch { /* pas de marqueur */ }
  const echelle = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue("--font-scale").trim());
  await ctx.close();
  return { echelle, erreurs: erreurs.length };
}

const hostiles = [];
for (const v of CLES_HOSTILES) {
  const r = await mesureHostile(v);
  const propre = r.echelle === "" || NOMBRE.test(r.echelle);
  console.log(`  HOSTILE bac-textsize=${JSON.stringify(v).padEnd(18)} --font-scale="${r.echelle.slice(0, 34)}"  ${propre ? "✓" : "✗"}`);
  if (!propre || r.erreurs) hostiles.push(`${v} → "${r.echelle.slice(0, 40)}"${r.erreurs ? ` (+${r.erreurs} erreur(s))` : ""}`);
}
console.log();

const temoin = await mesure({ injecter: false });
console.log(`  TÉMOIN  (hydratation normale)  sombre=${temoin.sombre}  --font-scale="${temoin.echelle}"`);
const essai = await mesure({ injecter: true, saboter: ESSAI_ROUGE });
console.log(`  SECOURS (désaccord injecté)    sombre=${essai.sombre}  --font-scale="${essai.echelle}"  secours détecté=${essai.secours}  (réécritures de class : ${essai.mutations})`);
console.log();

await nav.close();
arreter();

let code = 0;
if (hostiles.length > 0) {
  console.error("━━ ROUGE : une clé héritée écrit dans --font-scale ━━");
  for (const h of hostiles) console.error(`   • ${h}`);
  console.error("\n   La table des échelles est un littéral d'objet : `m[s]` y trouve aussi");
  console.error("   `toString`, `constructor`, `__proto__`… Filtrer avec");
  console.error("   `Object.prototype.hasOwnProperty.call(m, s)`, dans le script d'avant");
  console.error("   peinture (layout.tsx) ET dans GardePreferences.tsx.\n");
  code = 1;
}
if (!temoin.sombre || temoin.echelle !== ECHELLE_ATTENDUE) {
  console.error("━━ TÉMOIN ROUGE ━━");
  console.error("   Une hydratation NORMALE perd déjà une préférence. Rien de ce qui suit");
  console.error("   ne veut dire quoi que ce soit : c'est en amont qu'il faut regarder.\n");
  code = 1;
} else if (!essai.secours) {
  console.error("━━ PORTE MUETTE ━━");
  console.error("   L'injection n'a provoqué AUCUN rendu de secours : la porte n'a rien");
  console.error("   éprouvé. Elle serait verte sans avoir mesuré — c'est le mensonge que");
  console.error("   l'ADR 0033 nomme. Vérifier le motif d'injection contre le HTML servi.\n");
  code = 1;
} else if (!essai.sombre || essai.echelle !== ECHELLE_ATTENDUE) {
  console.error("━━ ROUGE : une préférence est tombée au rendu de secours ━━");
  if (!essai.sombre) console.error("   • le thème SOMBRE est perdu — la page repasse en clair, sans rien dire.");
  if (essai.echelle !== ECHELLE_ATTENDUE) console.error(`   • la taille du texte est perdue — --font-scale="${essai.echelle}" au lieu de ${ECHELLE_ATTENDUE}.`);
  console.error("\n   Le réglage même dont dépendent les élèves qui voient mal.");
  console.error("   GardePreferences.tsx doit être monté en tête du <body> (layout.tsx).\n");
  code = 1;
} else {
  console.log("  ✓ secours provoqué, thème et taille de texte tenus tous les deux.\n");
}
if (ESSAI_ROUGE) {
  //  Le sens s'inverse : ici, une porte qui CRIE est une porte qui marche.
  //  Mais elle doit crier PAR LA BONNE BRANCHE : un témoin rouge veut dire que
  //  le sabotage a débordé sur le contrôle, et l'essai ne prouve plus rien.
  const temoinIntact = temoin.sombre && temoin.echelle === ECHELLE_ATTENDUE;
  if (!temoinIntact) {
    console.error("━━ ESSAI ROUGE INCONCLUANT ━━");
    console.error("   Le sabotage a débordé sur le TÉMOIN : le rouge obtenu ne dit pas que");
    console.error("   la porte voit le défaut visé, seulement qu'elle voit quelque chose.\n");
    process.exit(1);
  }
  if (code === 1) {
    console.log("━━ ESSAI ROUGE : la porte a crié ✓ ━━");
    console.log("   Témoin intact, rétablissement de la taille de texte neutralisé → rouge par la");
    console.log("   branche SECOURS. L'alarme n'est pas morte, et elle crie pour la bonne raison.\n");
    process.exit(0);
  }
  console.error("━━ ESSAI ROUGE : la porte est RESTÉE VERTE — elle est AVEUGLE ━━");
  console.error("   La garde a été neutralisée et la porte n'a rien vu. Elle ne protège rien.\n");
  process.exit(1);
}
process.exit(code);
