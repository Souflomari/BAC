/**
 * impression.mjs — ce que l'élève obtient quand il IMPRIME son cours.
 *
 * Un élève marocain de terminale imprime. Il imprime pour annoter au stylo,
 * pour réviser sans écran, pour emporter en salle d'étude. La feuille est
 * donc un rendu du produit au même titre que la page — et, comme le
 * presse-papier avant elle, personne ne l'avait regardée.
 *
 * `globals.css` porte trois blocs `@media print` soignés : chrome masqué,
 * fond blanc, grille effondrée, figures non coupées, chapitres dépliés. Rien
 * ne vérifiait qu'ils font ce qu'ils disent — et c'est exactement la forme
 * d'affirmation que cette session a passé deux jours à démentir.
 *
 * SIX CONTRÔLES, en émulation `print` :
 *   1. le chrome disparaît (en-tête, rail, pied) ;
 *   2. TOUS les chapitres sont dépliés — sinon on imprime un dixième du cours ;
 *   3. rien ne dépasse la largeur de la page ;
 *   4. aucune figure n'est plus large que la colonne imprimable ;
 *   5. le texte est de l'encre sur du papier : pas de clair sur clair ;
 *   6. LE THÈME SOMBRE — un élève qui lit en sombre et qui imprime doit
 *      obtenir du noir sur blanc, pas des aplats noirs qui vident sa
 *      cartouche et qu'on ne peut pas annoter.
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// PORT UNIQUE PAR EXÉCUTION (2026-09-05). Les ports fixes se marchaient
// dessus : `copie-maths` et `ancres-uniques` réclamaient tous deux 3497,
// `donnees-sweep` et `accents-manquants` tous deux 3496. Chaque porte lance
// son propre `next start` détaché et le tue en fin de course — mais tuer
// l'enveloppe `npx` ORPHELINE son enfant `next-server`, défaut déjà écrit en
// toutes lettres dans l'en-tête de dom-truth. Une porte qui trouve le port
// occupé sonde alors le serveur d'une AUTRE porte : au mieux elle mesure un
// build voisin, au pire elle attend.
//
// C'est le motif de dom-truth, mot pour mot : l'espace 3200-3699 est assez
// large pour que deux exécutions simultanées ne se croisent pas.
const PORT = Number(process.env.PORT_IMPRESSION ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const porte = process.argv.includes("--porte");
if (routes.length === 0) {
  console.error("usage: node scripts/impression.mjs [--porte] /notions/pc/rlc-serie …");
  process.exit(1);
}

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const debut = Date.now();
  let pret = false;
  while (Date.now() - debut < 60000) {
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) { console.error("✗ serveur absent — rien n'est mesuré"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

// A4 à 96 dpi, marges par défaut de Chrome (~0,4 po de chaque côté).
// LA FENÊTRE VAUT LA COLONNE IMPRIMABLE, pas la feuille. À l'impression,
// Chrome met en page dans la zone imprimable ; simuler avec une fenêtre de
// 794 px fait « déborder » tout ce qui fait 100 % de large, et l'instrument
// annonce six faux débordements sur chaque leçon.
const LARGEUR_A4 = Math.round(8.27 * 96);          // 794 px
const MARGES = Math.round(0.8 * 96);               // 77 px
const COLONNE = LARGEUR_A4 - MARGES;               // 717 px

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await nav.newContext({ viewport: { width: COLONNE, height: 1123 } })).newPage();

const lum = (c) => {
  const m = /rgba?\(([^)]+)\)/.exec(c || "");
  if (!m) return null;
  const [r, g, b] = m[1].split(",").map(parseFloat);
  const f = (x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

let defauts = 0;
const dire = (ok, texte) => { if (!ok) defauts++; console.log(`  ${ok ? "✓" : "✗"} ${texte}`); };

for (const route of routes) {
  console.log(`\n${route}`);
  // UNE ROUTE QUI N'EXISTE PAS N'EST PAS UNE ROUTE PROPRE (2026-09-05). La
  // liste de routes EST la portée de cette porte ; une entrée fautive
  // l'amputait en silence. `/options`, dans la liste CI de la porte
  // typographie, rendait un 404 et se voyait annoncer « ✓ ».
  {
    const sonde = await page.goto(`${BASE}${route}`, { waitUntil: "domcontentloaded" });
    if (sonde && sonde.status() !== 200) {
      console.error(`✗ ${route} — HTTP ${sonde.status()} : cette route n'existe pas, la porte ne mesure rien.`);
      process.exitCode = 1;
      continue;
    }
  }
  for (const sombre of [false, true]) {
    await page.emulateMedia({ media: "screen" });
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    await page.evaluate((d) => {
      document.documentElement.classList.toggle("dark", d);
    }, sombre);
    // LES ÉPREUVES S'OUVRENT EN DEUX TEMPS (2026-09-05). Un élève imprime un
    // sujet pour le faire au stylo — c'est même l'usage le plus naturel de
    // cette page. Mais `EpreuveShell` démarre au « seuil » : sans les deux
    // clics, la porte impression mesurait le masthead et déclarait la page
    // propre. Même angle mort que les portes accents et typographie.
    const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
    if (await commencer.count()) {
      await commencer.first().click();
      await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
      const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
      if (await terminer.count()) { await terminer.first().click(); await page.waitForTimeout(300); }
    }
    await page.emulateMedia({ media: "print" });
    await page.waitForTimeout(300);

    const r = await page.evaluate((colonne) => {
      const boite = (s) => {
        const e = document.querySelector(s);
        if (!e) return null;
        const b = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return { w: b.width, h: b.height, display: cs.display, visibility: cs.visibility };
      };
      const chapitres = [...document.querySelectorAll("[data-chapter-index]")];
      const visibles = chapitres.filter((c) => {
        const b = c.getBoundingClientRect();
        return b.height > 4 && getComputedStyle(c).display !== "none";
      }).length;
      // Débordement horizontal : un élément dont la boîte sort de la colonne.
      // PAS les descendants d'un <svg> : la boîte d'un <path> ignore le
      // découpage du viewBox et rend des largeurs fantômes (8 239 px pour une
      // figure de 640). C'est le <svg> lui-même qui doit tenir dans la page,
      // et il est vérifié à part.
      let large = 0, pire = 0, coupable = "";
      for (const e of document.querySelectorAll("main *")) {
        // Ni les descendants d'un <svg> (boîte fantôme d'un <path>), ni ceux
        // du MathML de KaTeX : `.katex-mathml` fait 1×1 px et découpe, mais le
        // <math> qu'il contient déclare sa largeur naturelle — 822 px pour une
        // formule longue, alors que RIEN n'est peint. Deux pages entières
        // étaient déclarées fautives par cette boîte invisible.
        if (e.closest("svg") || e.closest(".katex-mathml")) continue;
        const b = e.getBoundingClientRect();
        if (b.width > colonne + 2) {
          large++;
          if (b.width > pire) {
            pire = b.width;
            coupable = e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.split(/\s+/)[0] : "");
          }
        }
      }
      let figuresLarges = 0;
      for (const s of document.querySelectorAll("main svg")) {
        if (s.getBoundingClientRect().width > colonne + 2) figuresLarges++;
      }
      return {
        header: boite("header"),
        rail: boite(".notion-rail"),
        footer: boite("footer"),
        chapitres: chapitres.length,
        visibles,
        large, pire: Math.round(pire), coupable,
        figuresLarges,
        fondCorps: getComputedStyle(document.body).backgroundColor,
        encreCorps: getComputedStyle(document.body).color,
        fondFigure: getComputedStyle(document.documentElement).getPropertyValue("--figure-surface").trim(),
        encreFigure: getComputedStyle(document.documentElement).getPropertyValue("--figure-ink").trim(),
      };
    }, COLONNE);

    const et = sombre ? " (thème sombre)" : "";
    if (!sombre) {
      dire(!r.header || r.header.h < 2, `chrome masqué à l'impression — en-tête ${r.header ? Math.round(r.header.h) + "px" : "absent"}, pied ${r.footer ? Math.round(r.footer.h) + "px" : "absent"}`);
      dire(r.chapitres === 0 || r.visibles === r.chapitres,
        `chapitres dépliés : ${r.visibles}/${r.chapitres}` +
        (r.visibles < r.chapitres ? " — l'élève imprimerait une fraction du cours" : ""));
      dire(r.large === 0, `rien ne dépasse la colonne (${COLONNE}px)` + (r.large ? ` — ${r.large} élément(s), pire ${r.pire}px : ${r.coupable}` : ""));
      dire(r.figuresLarges === 0, `figures dans la page` + (r.figuresLarges ? ` — ${r.figuresLarges} plus large(s) que la colonne` : ""));
    }
    // 5 et 6 : de l'encre sur du papier, quel que soit le thème lu à l'écran.
    const lf = lum(r.fondCorps), le = lum(r.encreCorps);
    dire(lf !== null && lf > 0.8, `papier blanc${et} — fond du corps ${r.fondCorps}`);
    dire(le !== null && le < 0.2, `encre noire${et} — texte du corps ${r.encreCorps}`);
    const lff = lum(r.fondFigure.startsWith("#") ? hexRgb(r.fondFigure) : r.fondFigure);
    dire(lff === null || lff > 0.8, `figures sur papier blanc${et} — --figure-surface = ${r.fondFigure || "(non défini)"}`);
  }
}

function hexRgb(h) {
  const s = h.replace("#", "");
  const n = s.length === 3 ? s.split("").map((c) => c + c).join("") : s;
  const v = parseInt(n, 16);
  return `rgb(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255})`;
}

console.log(defauts === 0 ? "\nL'impression rend le cours entier, en encre sur du papier." : `\n${defauts} défaut(s) d'impression.`);
await nav.close();
arreter();
// Une route absente a déjà posé process.exitCode = 1 : la porte doit tomber
// même si toutes les pages RÉELLEMENT visitées sont propres. La liste de
// routes EST la portée ; une entrée fautive l'ampute sans rien dire.
if (porte && process.exitCode === 1) {
  console.error("\n━━ porte ROMPUE — une route de la liste n'existe pas (voir le ✗ ci-dessus) ━━");
  process.exit(1);
}
if (porte && defauts > 0) process.exit(1);
