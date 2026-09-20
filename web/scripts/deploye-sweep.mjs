#!/usr/bin/env node
/**
 * deploye-sweep — mesurer l'ARTEFACT DÉPLOYÉ, depuis ce conteneur.
 *
 * POURQUOI. `docs/audits/INSTRUMENTS.md`, « ce que RIEN ne mesure encore »,
 * point 9 : « la preview Vercel répond à curl en 0,7 s, mais le relais réseau
 * de la session coupe Chromium headless. Tout ce que les §11.20 à 11.25
 * mesurent l'est sur le build LOCAL de HEAD, jamais sur l'artefact déployé.
 * À refaire depuis une machine libre. »
 *
 * IL N'A PAS FALLU UNE AUTRE MACHINE. Le relais ne coupait rien : il
 * re-termine TLS avec son propre CA, et Chromium ne le connaissait pas —
 * `ERR_CERT_AUTHORITY_INVALID`, pas `ERR_CONNECTION_RESET`. Le magasin NSS de
 * l'image date de sa construction ; le CA de la session est écrit à chaque
 * démarrage, après. `certutil` n'est pas installé, donc on ÉPINGLE la clé
 * publique du CA lu sur le disque (`--ignore-certificate-errors-spki-list`) :
 * Chromium accepte exactement cette autorité-là et refuse toutes les autres.
 * Ce n'est PAS `--ignore-certificate-errors`, qui accepterait n'importe quoi.
 *
 * CE QU'IL MESURE, et il le fait sur ce qui est SERVI, pas sur ce qu'on croit
 * avoir poussé :
 *   • le COMMIT déployé, lu dans `data-build-sha` (SiteFooter) — et il dit
 *     s'il diffère de HEAD, parce qu'un chiffre mesuré sur un autre commit
 *     n'est pas un chiffre sur le nôtre ;
 *   • l'attente honnête avant hydratation (ADR 0032) : aucune commande servie
 *     ne doit être active ;
 *   • l'adresse inconnue (§11.67) : elle doit servir un vrai « introuvable »,
 *     pas une page vide que seul le JavaScript remplit ;
 *   • un TÉMOIN de correctif, pour vérifier qu'un correctif est bien EN LIGNE
 *     et pas seulement dans le dépôt ;
 *   • LE PARCOURS d'un élève sur un téléphone de 390px : accueil → l'action du
 *     jour → la leçon → répondre à un item. Un produit peut avoir quatre pages
 *     saines et une couture morte entre deux ;
 *   • LE PARCOURS D'ÉPREUVE : l'index → un vrai sujet → « Commencer » →
 *     « Terminer » → le corrigé et son auto-évaluation.
 *
 * CE QU'IL NE VOIT PAS — à mesurer, pas à taire :
 *   - le temps et la géométrie passent par le relais : les millisecondes
 *     mesurées ici ne sont PAS celles d'un élève marocain ;
 *   - la production, qui reste hors de portée et humainement gardée ;
 *   - tout ce qui demande un compte connecté.
 *
 *   node scripts/deploye-sweep.mjs [url]
 */
import { chromium } from "playwright-core";
import { execSync } from "node:child_process";
import fs from "node:fs";
import crypto from "node:crypto";

const BASE = process.argv[2] || "https://bac-pink.vercel.app";
const CA = "/root/.ccr/agent-proxy-ca.crt";

//  L'épingle se calcule ICI, à partir du fichier du relais : la recopier
//  en dur, c'est la voir pourrir au prochain démarrage de session.
function epingle() {
  if (!fs.existsSync(CA)) return null;
  const pem = fs.readFileSync(CA, "utf-8");
  const der = Buffer.from(pem.replace(/-----[^-]+-----|\s/g, ""), "base64");
  //  On extrait le SubjectPublicKeyInfo via openssl : le parser DER maison
  //  serait un second banc à vérifier, et ce n'est pas le sujet.
  try {
    const spki = execSync(`openssl x509 -in ${CA} -pubkey -noout | openssl pkey -pubin -outform der`, { maxBuffer: 1 << 20 });
    return crypto.createHash("sha256").update(spki).digest("base64");
  } catch { return null; }
}

const pin = epingle();
const args = pin ? [`--ignore-certificate-errors-spki-list=${pin}`] : [];
if (!pin) console.log("· pas de CA de relais lisible — lancement sans épingle (hors conteneur agent ?)");

const HEAD = (() => { try { return execSync("git rev-parse --short HEAD").toString().trim(); } catch { return "?"; } })();

//  ── LE RELAIS N'EST PAS LE PRODUIT ────────────────────────────────────────
//  Ce conteneur sort par un relais, et sous charge il rend des 502 qui n'ont
//  RIEN à voir avec l'artefact déployé : mesuré le 2026-09-20 sur une police
//  (`…723e11e5.p.woff2`) signalée 502 pendant un balayage, puis servie 200
//  cinq fois sur cinq à la main, en 71 ko. Une porte qui compte ce 502 comme
//  un défaut du produit crie au loup — et un rouge qui crie au loup est un
//  rouge qu'on apprend à ignorer.
//  On re-demande donc chaque adresse fautive, une fois, avant d'accuser.
async function confirmerEchec(url) {
  try {
    const r = await fetch(url, { redirect: "follow" });
    return r.status >= 400;   // toujours en échec → c'est le produit
  } catch { return false; }   // injoignable à la re-demande → on n'accuse pas
}

const b = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
let echecs = 0;
const dit = (ok, txt) => { console.log(`  ${ok ? "✓" : "✗"} ${txt}`); if (!ok) echecs++; };

console.log(`\n━━ l'artefact DÉPLOYÉ — ${BASE} ━━\n`);

//  1. Quel commit est en ligne ?
await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
//  Le tampon se lit dans le HTML SERVI, pas dans le DOM rendu. Avec le rendu
//  en flux, `domcontentloaded` peut arriver AVANT le pied de page : lu depuis
//  le DOM, le tampon manquait un passage sur deux et la sonde annonçait
//  « impossible de savoir ce qui est en ligne » sur un artefact parfaitement
//  sain. Le texte servi, lui, ne court pas.
const sha = await (async () => {
  try {
    const html = await (await fetch(BASE + "/")).text();
    return (html.match(/data-build-sha="([^"]+)"/) ?? [])[1] ?? null;
  } catch { return null; }
})();
if (!sha) { dit(false, "aucun `data-build-sha` servi — impossible de savoir CE QUI est en ligne"); }
else if (sha === HEAD) dit(true, `commit déployé ${sha} — c'est HEAD`);
else console.log(`  · commit déployé ${sha} — HEAD local est ${HEAD}. Tout ce qui suit décrit ${sha}, pas HEAD.`);

//  2. L'attente honnête avant hydratation (ADR 0032), sur les pages servies.
for (const route of ["/", "/notions/pc/rlc-serie", "/commencer", "/notions/philo/analyse-de-texte"]) {
  const r = await p.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 });
  const m = await p.evaluate(() => {
    const cmds = [...document.querySelectorAll("button, [role=button]")];
    return { n: cmds.length, actifs: cmds.filter((e) => !e.hasAttribute("disabled") && e.getAttribute("aria-busy") !== "true").length };
  });
  dit(r.status() === 200 && m.actifs === 0, `${route} — HTTP ${r.status()}, ${m.n} commandes servies, ${m.actifs} actives avant hydratation`);
}

//  3. L'adresse inconnue sert-elle un vrai « introuvable » ? (§11.67)
{
  const r = await p.goto(BASE + "/notions/pc/inexistant-xyz", { waitUntil: "domcontentloaded", timeout: 30000 });
  const txt = (await p.evaluate(() => document.body.innerText)).trim();
  dit(txt.length > 40, `adresse inconnue — HTTP ${r.status()}, ${txt.length} caractères servis sans JavaScript (une page vide serait ~0)`);
}

//  4. Le témoin de correctif : §11.133, le repli sur `correct_feedback`.
//     Sa présence EN LIGNE prouve qu'un correctif est déployé, pas seulement commis.
{
  await p.goto(BASE + "/notions/philo/analyse-de-texte", { waitUntil: "networkidle", timeout: 40000 });
  for (const d of await p.$$("details:not([open]) > summary")) { try { await d.click({ timeout: 600 }); } catch {} }
  const hote = await p.$('[data-item-id="ATX-M01-1"]');
  if (!hote) dit(false, "témoin §11.133 — l'item ATX-M01-1 est introuvable dans le DOM déployé");
  else {
    const btn = await hote.$("ul[role=list] button, ul[role=list] [role=button]");
    await btn?.click();
    await p.waitForTimeout(500);
    const vu = (await hote.innerText()).includes("Pourquoi cette réponse est la bonne");
    console.log(`  ${vu ? "✓" : "·"} témoin §11.133 — le repli « Pourquoi cette réponse est la bonne » ${vu ? "EST EN LIGNE" : "n'est pas encore déployé (normal si le commit en ligne le précède)"}`);
  }
}

//  5. LE PARCOURS D'UN ÉLÈVE, bout en bout, sur un téléphone (§11.143).
//     Les contrôles ci-dessus regardent des pages une par une. Celui-ci suit
//     le chemin : accueil → l'action du jour → la leçon → répondre. Un produit
//     peut avoir quatre pages saines et une couture morte entre deux.
{
  const tel = await b.newPage({ viewport: { width: 390, height: 844 } });
  const ennuis = [];
  tel.on("pageerror", (e) => ennuis.push(String(e.message).slice(0, 80)));
  const suspects = [];
  tel.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("favicon")) suspects.push(r.url()); });
  try {
    await tel.goto(BASE + "/", { waitUntil: "networkidle", timeout: 40000 });
    //  PIÈGE MESURÉ : attendre `networkidle` APRÈS le clic ne prouve rien —
    //  la condition est déjà satisfaite, la promesse revient avant que la
    //  navigation ait commencé, et on lit encore l'ancienne adresse. Mon
    //  premier jet a conclu que « Commencer la session » ne menait nulle part.
    //  Il faut attendre l'ADRESSE.
    await Promise.all([
      tel.waitForURL(/\/notions\//, { timeout: 20000 }),
      tel.click("section[aria-label='La session du jour'] a[href^='/notions/']"),
    ]);
    await tel.waitForLoadState("networkidle", { timeout: 40000 });
    dit(true, `parcours — « Commencer la session » mène à ${tel.url().replace(BASE, "")}`);

    for (const d of await tel.$$("details:not([open]) > summary")) { try { await d.click({ timeout: 500 }); } catch {} }
    await tel.waitForTimeout(400);
    const items = await tel.$$("[data-item-id]");
    dit(items.length > 0, `parcours — ${items.length} items atteignables sur la leçon`);
    if (items.length) {
      const h = items[0];
      const avant = (await h.innerText()).length;
      const btn = await h.$("ul[role=list] button, ul[role=list] [role=button]");
      if (!btn) dit(false, "parcours — l'item n'offre aucun choix cliquable");
      else {
        await btn.click();
        await tel.waitForTimeout(700);
        const apres = (await h.innerText()).length;
        const bb = await btn.boundingBox();
        dit(apres > avant, `parcours — répondre ajoute ${apres - avant} caractères de retour`);
        dit(!!bb && bb.height >= 44, `parcours — cible tactile du choix : ${bb ? Math.round(bb.height) : "?"}px`);
      }
    }
    const deb = await tel.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    dit(deb <= 0, `parcours — débordement horizontal : ${deb}px`);
    const confirmes = [];
    for (const u of [...new Set(suspects)]) if (await confirmerEchec(u)) confirmes.push(u.replace(BASE, "").slice(0, 50));
    const tot = ennuis.length + confirmes.length;
    dit(tot === 0, `parcours — ${tot} erreur(s) confirmée(s)${suspects.length ? ` (${new Set(suspects).size} réponse(s) ≥400 vue(s), ${confirmes.length} encore en échec à la re-demande)` : ""}${tot ? " : " + [...ennuis, ...confirmes].slice(0, 3).join(" · ") : ""}`);
  } catch (e) {
    dit(false, `parcours interrompu — ${String(e.message).split("\n")[0].slice(0, 90)}`);
  } finally { await tel.close(); }
}

//  6. LE PARCOURS D'ÉPREUVE (§11.144) — l'autre moitié du produit, et la plus
//     haute en enjeu : l'élève s'assoit devant un vrai sujet tombé.
//     ORDRE DES MESURES : les commandes de réponse n'existent QU'APRÈS
//     « Terminer ». Le sujet se compose sur papier ; le produit sert le
//     corrigé et l'élève s'y auto-évalue. Les compter avant, c'est mesurer
//     une absence qui est le dessin.
{
  const ep = await b.newPage({ viewport: { width: 390, height: 844 } });
  const ennuis = [];
  ep.on("pageerror", (e) => ennuis.push(String(e.message).slice(0, 80)));
  const suspectsEp = [];
  ep.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("favicon")) suspectsEp.push(r.url()); });
  try {
    await ep.goto(BASE + "/examens", { waitUntil: "networkidle", timeout: 40000 });
    const href = await ep.$eval("a[href^='/examens/']", (a) => a.getAttribute("href")).catch(() => null);
    if (!href) dit(false, "épreuve — l'index ne liste aucune épreuve");
    else {
      await Promise.all([
        ep.waitForURL((u) => u.pathname.startsWith("/examens/") && u.pathname.length > 10, { timeout: 20000 }),
        ep.click(`a[href='${href}']`),
      ]);
      await ep.waitForLoadState("networkidle", { timeout: 40000 });
      dit(true, `épreuve — ${href} ouverte`);
      const t0 = (await ep.innerText("body")).length;
      const dep = await ep.$("button:has-text('Commencer'), [role=button]:has-text('Commencer')");
      if (!dep) dit(false, "épreuve — aucun bouton « Commencer »");
      else {
        const bb = await dep.boundingBox();
        dit(!!bb && bb.height >= 44, `épreuve — cible tactile de « Commencer » : ${bb ? Math.round(bb.height) : "?"}px`);
        await dep.click();
        await ep.waitForTimeout(1500);
        const t1 = (await ep.innerText("body")).length;
        dit(t1 > t0, `épreuve — « Commencer » révèle ${t1 - t0} caractères de sujet`);
        const fin = await ep.$("button:has-text('Terminer'), [role=button]:has-text('Terminer')");
        if (!fin) dit(false, "épreuve — aucun bouton « Terminer »");
        else {
          await fin.click();
          await ep.waitForTimeout(2500);
          const t2 = (await ep.innerText("body")).length;
          dit(t2 > t1, `épreuve — « Terminer » révèle ${t2 - t1} caractères de corrigé`);
          const radios = await ep.$$("input[type=radio], [role=radio]");
          dit(radios.length > 0, `épreuve — ${radios.length} commandes d'auto-évaluation dans le corrigé`);
          //  §11.40 : le focus ne doit pas retomber sur <body> quand le
          //  bouton disparaît.
          const cible = await ep.evaluate(() => document.activeElement?.tagName ?? "null");
          dit(cible !== "BODY" && cible !== "null", `épreuve — focus après « Terminer » : ${cible} (pas <body>)`);
        }
      }
      const deb = await ep.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      dit(deb <= 0, `épreuve — débordement horizontal : ${deb}px`);
      const confEp = [];
      for (const u of [...new Set(suspectsEp)]) if (await confirmerEchec(u)) confEp.push(u.replace(BASE, "").slice(0, 50));
      const totEp = ennuis.length + confEp.length;
      dit(totEp === 0, `épreuve — ${totEp} erreur(s) confirmée(s)${suspectsEp.length ? ` (${new Set(suspectsEp).size} vue(s), ${confEp.length} confirmée(s))` : ""}${totEp ? " : " + [...ennuis, ...confEp].slice(0, 3).join(" · ") : ""}`);
    }
  } catch (e) {
    dit(false, `épreuve — parcours interrompu : ${String(e.message).split("\n")[0].slice(0, 90)}`);
  } finally { await ep.close(); }
}

//  7. LE THÈME (§11.146) — la préférence du système, la commande, et le FLASH.
//     Le carnet du jour 8 notait cette famille comme NON re-vérifiée : « le
//     second réfuteur (sombre / pas-de-flash) est mort sur une limite de
//     session avant de rapporter ». Elle l'est ici, sur l'artefact servi.
{
  for (const scheme of ["dark", "light"]) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: scheme });
    const pg = await ctx.newPage();
    //  Un flash, c'est une IMAGE de la mauvaise couleur : on relève la teinte
    //  à chaque rafraîchissement, et on ne garde que les CHANGEMENTS.
    //  PIÈGE MESURÉ : la couleur vit sur `body`, pas sur `documentElement`,
    //  dont le fond vaut `rgba(0, 0, 0, 0)` — une chaîne TRUTHY, donc un
    //  `a || b` ne bascule jamais. Premier jet : « une seule teinte,
    //  rgba(0,0,0,0) », c'est-à-dire rien du tout.
    await pg.addInitScript(() => {
      window.__t = [];
      const opaque = (c) => c && !/rgba\(0, 0, 0, 0\)|transparent/.test(c);
      const lire = () => {
        try {
          const bd = document.body && getComputedStyle(document.body).backgroundColor;
          const ht = getComputedStyle(document.documentElement).backgroundColor;
          const c = opaque(bd) ? bd : opaque(ht) ? ht : "aucune";
          if (!window.__t.length || window.__t[window.__t.length - 1] !== c) window.__t.push(c);
        } catch {}
        if (performance.now() < 4000) requestAnimationFrame(lire);
      };
      requestAnimationFrame(lire);
    });
    await pg.goto(BASE + "/", { waitUntil: "networkidle", timeout: 40000 });
    await pg.waitForTimeout(1200);
    const teintes = (await pg.evaluate(() => window.__t ?? [])).filter((c) => c !== "aucune");
    const attendu = scheme === "dark" ? /^rgb\((1?[0-9]|[0-4][0-9]), /  : /^rgb\(2[0-5][0-9], /;
    dit(teintes.length === 1, `thème — système ${scheme} : ${teintes.length} teinte(s) peinte(s)${teintes.length ? ` (${teintes.join(" → ")})` : ""}${teintes.length === 1 ? ", aucun flash" : ""}`);
    dit(teintes.length > 0 && attendu.test(teintes[teintes.length - 1]), `thème — système ${scheme} : la teinte finale suit la préférence du système`);
    await ctx.close();
  }
  //  La commande de thème est-elle ATTEIGNABLE sur un téléphone ? Elle est
  //  masquée sous 1280px dans l'en-tête, et vit derrière « Menu et réglages ».
  const tp = await b.newPage({ viewport: { width: 390, height: 844 } });
  await tp.goto(BASE + "/", { waitUntil: "networkidle", timeout: 40000 });
  let via = 0;
  try {
    const menu = await tp.$("header button[aria-label*='Menu']");
    if (menu) {
      await menu.click({ timeout: 3000 });
      //  Attendre que la commande PARAISSE, pas un délai fixe : un délai
      //  rendait ce contrôle instable d'un passage à l'autre (mesuré deux
      //  fois de suite, deux verdicts opposés).
      await tp.waitForFunction(() => [...document.querySelectorAll("button,[role=button],a,label")]
        .some((e) => /th[eè]me|sombre|clair/i.test((e.getAttribute("aria-label") ?? "") + " " + e.innerText)
                  && !!(e.offsetWidth || e.offsetHeight)), { timeout: 6000 }).catch(() => {});
    }
    via = await tp.evaluate(() => [...document.querySelectorAll("button,[role=button],a,label")]
      .filter((e) => /th[eè]me|sombre|clair/i.test((e.getAttribute("aria-label") ?? "") + " " + e.innerText))
      .filter((e) => !!(e.offsetWidth || e.offsetHeight)).length);
  } catch {}
  dit(via > 0, `thème — ${via} commande(s) atteignable(s) à 390px via « Menu et réglages »`);
  await tp.close();
}

await b.close();
console.log(`\n━━ deploye-sweep : ${echecs} échec(s) sur l'artefact ${sha ?? "?"} ━━\n`);
process.exit(echecs ? 1 : 0);
