#!/usr/bin/env node
/**
 * marge-etiquettes.mjs — combien de place reste-t-il à une étiquette avant que
 * la substitution de police la coupe ?
 *
 * D'OÙ VIENT LA QUESTION (§11.152). Le balayage à trois moteurs a trouvé cinq
 * figures dont une étiquette sort du cadre dans Firefox seulement. En ouvrant
 * le cas : l'étiquette d'axe « V (mL) » est posée à 2,8 unités du bord dans
 * Chromium — et Firefox la dessine 17 % plus large, donc dehors.
 *
 * MAIS LE DÉFAUT N'EST PAS « FIREFOX ». Les figures déclarent
 * `font-family="'IBM Plex Sans', system-ui, sans-serif"`, et **IBM Plex Sans
 * n'est chargée nulle part** : ni dans le conteneur, ni par l'application (le
 * layout ne charge que Geist et la serif de lecture). Chaque moteur, sur chaque
 * appareil, RETOMBE donc sur une police différente — celle du système de
 * l'élève. Une étiquette réglée au pixel près contre la substitution d'UN
 * moteur est un pari sur la police d'un inconnu.
 *
 * CE QU'ELLE MESURE, et c'est indépendant du moteur : pour chaque texte, la
 * MARGE qui le sépare du cadre, en unités ET en pourcentage de sa propre
 * largeur. Une marge de 8 % veut dire qu'une police 8 % plus large coupe
 * l'étiquette. C'est la grandeur qui décide, pas le nom du navigateur.
 *
 * SEUIL : 15 % de la largeur du texte. Une substitution de police change
 * couramment la largeur de 10 à 20 % (mesuré ici : +17 % entre deux moteurs sur
 * la même chaîne). En dessous de 15 %, l'étiquette est à la merci du premier
 * appareil qui n'a pas la police déclarée.
 *
 *   node scripts/marge-etiquettes.mjs           → le classement
 *   node scripts/marge-etiquettes.mjs --porte   → cliquet
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { chromium } from "playwright-core";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const RACINE = path.resolve(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");
const SEUIL = 0.15;
//  ESSAI ROUGE : une étiquette collée au bord est injectée dans la première
//  figure. Le compte doit monter d'exactement 1 — moins, la sonde est aveugle ;
//  plus, elle compte autre chose au passage.
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
//  Cliquet : mesuré au 2026-09-20, APRÈS la campagne de la même journée.
const CLIQUET = Number(process.env.CLIQUET_MARGES ?? 30);

const fichiers = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".svg") && !e.name.endsWith(".motion.svg")) fichiers.push(p);
  }
})(path.join(RACINE, "content"));
fichiers.sort();

const cartes = fichiers.map((f, iFig) => {
  let svg = fs.readFileSync(f, "utf8").replace(/<\?xml[^>]*\?>/, "");
  const vb = svg.match(/viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*"/);
  if (!vb) return "";
  const [, , , w, h] = vb;
  const dims = `width:${Number(w)}px;height:${Number(h)}px`;
  svg = /<svg\b[^>]*\sstyle="/.test(svg)
    ? svg.replace(/(<svg\b[^>]*\sstyle=")/, `$1${dims};`)
    : svg.replace(/<svg\b/, `<svg style="${dims}"`);
  if (ESSAI_ROUGE && iFig === 0) {
    const vx = Number(vb[1]), vy = Number(vb[2]);
    //  Posée à 1 unité du bord DROIT : marge ≈ 1u pour ~60u de large, soit
    //  moins de 2 % — bien sous le seuil, sans sortir du cadre (ce serait
    //  l'autre défaut, celui de `figure-preview`).
    svg = svg.replace(/<\/svg>/, `<text x="${vx + Number(w) - 61}" y="${vy + 20}" font-size="12">essai rouge marge</text></svg>`);
  }
  return `<div class="carte" data-fig="${path.relative(RACINE, f)}">${svg}</div>`;
}).filter(Boolean).join("\n");

const fichierPage = path.join(os.tmpdir(), `marges-${process.pid}.html`);
fs.writeFileSync(fichierPage, `<!doctype html><html><head><meta charset="utf-8"><style>
body{background:#fff;font-family:system-ui,sans-serif;padding:24px}.carte{display:inline-block;margin:8px}
</style></head><body>${cartes}</body></html>`);

const b = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {});
const page = await b.newPage();
await page.goto(`file://${fichierPage}`, { waitUntil: "networkidle" });
const serres = await page.evaluate(() => {
  const out = [];
  for (const carte of document.querySelectorAll(".carte")) {
    const svg = carte.querySelector("svg");
    if (!svg) continue;
    const [vx, vy, vw, vh] = (svg.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    const versRacine = svg.getScreenCTM()?.inverse() ?? null;
    const boiteRacine = (el) => {
      const b2 = el.getBBox();
      if (!versRacine || !el.getScreenCTM) return b2;
      const m = versRacine.multiply(el.getScreenCTM());
      if (m.b === 0 && m.c === 0 && m.a === 1 && m.d === 1 && m.e === 0 && m.f === 0) return b2;
      const coins = [[b2.x, b2.y], [b2.x + b2.width, b2.y], [b2.x, b2.y + b2.height], [b2.x + b2.width, b2.y + b2.height]]
        .map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
      const xs = coins.map((c) => c[0]), ys = coins.map((c) => c[1]);
      const x0 = Math.min(...xs), y0 = Math.min(...ys);
      return { x: x0, y: y0, width: Math.max(...xs) - x0, height: Math.max(...ys) - y0 };
    };
    for (const t of svg.querySelectorAll("text")) {
      const s = t.textContent.trim();
      if (!s) continue;
      let b2; try { b2 = boiteRacine(t); } catch { continue; }
      if (!b2 || b2.width <= 0) continue;
      //  La marge PERTINENTE est celle du côté vers lequel le texte grandit.
      //  Un texte ancré à gauche grandit à DROITE ; ancré à droite, à gauche ;
      //  centré, des deux côtés à la fois (donc moitié-moitié).
      const ancre = getComputedStyle(t).textAnchor || "start";
      const droite = (vx + vw) - (b2.x + b2.width);
      const gauche = b2.x - vx;
      const marge = ancre === "end" ? gauche : ancre === "middle" ? Math.min(gauche, droite) * 2 : droite;
      out.push({
        fig: carte.dataset.fig, txt: s.slice(0, 32), ancre,
        largeur: Math.round(b2.width * 10) / 10,
        marge: Math.round(marge * 10) / 10,
        part: b2.width > 0 ? Math.round((marge / b2.width) * 1000) / 10 : 0,
      });
    }
  }
  return out;
});
await b.close();
fs.unlinkSync(fichierPage);

const sous = serres.filter((e) => e.part < SEUIL * 100).sort((a, b2) => a.part - b2.part);
console.log(`\n━━ la marge d'une étiquette avant que la police la coupe — ${serres.length} textes, ${fichiers.length} figures ━━\n`);
console.log(`  seuil : ${SEUIL * 100} % de la largeur du texte\n`);
//  LE TOTAL AVANT LA LISTE, et pas seulement la liste : une énumération
//  tronquée à 30 lignes sans son total se lit comme un total (ADR 0036 §4).
console.log(`  ${sous.length} étiquette(s) sous le seuil, sur ${serres.length} textes mesurés.\n`);
if (!sous.length) console.log("  aucune étiquette sous le seuil.\n");
else {
  for (const e of sous.slice(0, 30)) {
    console.log(`  ✗ ${e.part.toString().padStart(6)} %  marge ${String(e.marge).padStart(6)}u / largeur ${String(e.largeur).padStart(6)}u  « ${e.txt} »`);
    console.log(`            ${e.fig}  (ancre ${e.ancre})`);
  }
  if (sous.length > 30) console.log(`  … et ${sous.length - 30} autres`);
  console.log();
}

if (ESSAI_ROUGE) {
  const vu = sous.some((e) => e.txt.startsWith("essai rouge marge"));
  if (vu && sous.length === CLIQUET + 1) {
    console.log("━━ ESSAI ROUGE : l'étiquette collée au bord a été vue, et elle seule ✓ ━━\n");
    process.exit(0);
  }
  console.error(`━━ ESSAI ROUGE : ${vu ? "compte inattendu" : "AVEUGLE — l'étiquette injectée n'a pas été vue"} ━━`);
  console.error(`   attendu ${CLIQUET + 1} sous le seuil, obtenu ${sous.length}\n`);
  process.exit(1);
}

if (PORTE) {
  if (sous.length > CLIQUET) {
    console.error(`━━ CLIQUET « MARGE D'ÉTIQUETTE » : ${CLIQUET} → ${sous.length} ━━`);
    console.error("   Une étiquette dont la marge est plus petite que ce qu'une substitution de");
    console.error("   police consomme sera coupée sur l'appareil d'un élève, sans que rien ne le");
    console.error("   dise. Les figures déclarent une police qui n'est chargée nulle part : chaque");
    console.error("   appareil retombe sur la sienne (§11.152).\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquet tenu — ${sous.length} étiquette(s) sous ${SEUIL * 100} % de marge.\n`);
}
process.exit(0);
