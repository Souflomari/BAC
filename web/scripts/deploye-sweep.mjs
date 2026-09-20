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
 *     et pas seulement dans le dépôt.
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

const b = await chromium.launch({ executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium", args });
const p = await b.newPage({ viewport: { width: 1280, height: 900 } });
let echecs = 0;
const dit = (ok, txt) => { console.log(`  ${ok ? "✓" : "✗"} ${txt}`); if (!ok) echecs++; };

console.log(`\n━━ l'artefact DÉPLOYÉ — ${BASE} ━━\n`);

//  1. Quel commit est en ligne ?
await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
const sha = await p.evaluate(() => document.querySelector("[data-build-sha]")?.getAttribute("data-build-sha") ?? null);
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

await b.close();
console.log(`\n━━ deploye-sweep : ${echecs} échec(s) sur l'artefact ${sha ?? "?"} ━━\n`);
process.exit(echecs ? 1 : 0);
