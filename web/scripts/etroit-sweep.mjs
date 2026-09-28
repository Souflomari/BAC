/**
 * Balayage ÉTROIT — le corpus entier à la largeur d'un téléphone.
 *
 * POURQUOI. L'élève marocain de terminale lit sur un téléphone. Le harnais
 * dom-truth mesure le débord horizontal à 1536 et 1920 px (la largeur du
 * propriétaire) et balaie le header de 320 à 1280 px sur l'ACCUEIL. Les 62
 * leçons, elles, n'ont jamais été mesurées en dessous de 1280. Une formule
 * détachée un peu longue, un tableau à quatre colonnes, une figure à
 * viewBox large : chacun suffit à faire glisser la page sous le doigt, et
 * personne ne le saurait depuis un écran d'ordinateur.
 *
 * CE QU'ON MESURE. Le débord est un fait binaire du document :
 * `scrollWidth > innerWidth`. Pas d'heuristique. Quand il y en a un, on
 * remonte le coupable — le nœud le plus PROFOND dont le bord droit dépasse,
 * en ignorant ceux qu'un ancêtre défilable contient légitimement (une
 * formule dans un `overflow-x:auto` DOIT dépasser : c'est ainsi qu'elle
 * reste lisible sans écraser la page).
 *
 * LES DÉFILEURS FANTÔMES (2026-09-27, porte d'ergonomie du plan complexe R6).
 * Un conteneur `overflow: auto` dont le contenu dépasse est un défileur :
 * Chromium le rend atteignable au Tab dès qu'il n'a aucun enfant focalisable.
 * Quand le dépassement ne cache RIEN, c'est un arrêt invisible et un glissement
 * parasite sous le doigt. Mesuré sur les 62 leçons à 390 px : 2 808 défileurs
 * de 1 à 8 px (1 759 formules en ligne, 570 choix de QCM, 136 énoncés).
 *
 * CE QUI EST ARMÉ : le défileur VERTICAL d'une boîte faite pour défiler EN
 * LARGEUR (`overflow-x: auto` force `overflow-y: auto`), qui dépasse en hauteur
 * de 1 à 8 px. Il n'a jamais rien à montrer : c'est la profondeur d'une fraction
 * KaTeX sous la dernière ligne, pas une ligne de texte (la plus petite fait
 * 16 px). La borne DÉFINIT la catégorie, elle ne filtre pas du bruit (ADR 0034).
 *
 * CE QUI N'EST PAS ARMÉ, écrit à côté (ADR 0035) : le petit dépassement en
 * LARGEUR (1 à 8 px). Il peut être l'approche du dernier glyphe d'une formule
 * (rien à montrer) OU la fin réelle d'une formule trop longue (à montrer) — la
 * page ne sait pas les distinguer. Il est COMPTÉ et imprimé, par sorte, sans
 * rougir ; DECISIONS-EN-ATTENTE §31 dit la condition qui mériterait une porte
 * (et pourquoi le correctif « rembourrage + marge négative » sur la formule en
 * ligne a été retiré : 163 paragraphes devenaient défileurs à sa place).
 *
 * TOUS LES CHAPITRES SONT DÉPLIÉS avant la mesure. Un chapitre masqué qui
 * déborde débordera le jour où l'élève y arrivera ; ne mesurer que le
 * premier reviendrait à ne regarder qu'un dixième du produit.
 */
import { chromium } from "playwright-core";
import { execSync } from "node:child_process";
import { readdirSync, existsSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3433";
// L'ESSAI ROUGE (2026-09-24, §11.193 — la porte entre en CI, elle doit savoir
// rougir). Sur trois leçons et l'accueil, à 320 px, un bloc de 2 000 px est
// posé dans la page AVANT la mesure : chaque page doit alors déborder, et la
// porte le dire. Un défaut posé dans le DOM atteint la mesure elle-même — ce
// n'est pas une attente retournée (ADR 0038).
const ESSAI = process.argv.includes("--essai-rouge");
const LARGEURS = ESSAI ? [320] : (process.env.LARGEURS ?? "320,360,390").split(",").map(Number);

const lecons = [];
for (const m of readdirSync("../content")) {
  const d = `../content/${m}`;
  if (!existsSync(d) || !readdirSync(d).length) continue;
  for (const s of readdirSync(d)) {
    if (existsSync(`${d}/${s}/lesson.md`)) lecons.push(`${m}/${s}`);
  }
}

// Les pages hors leçon : elles n'ont pas de chapitres à déplier, mais elles
// portent les mêmes risques (tableaux d'épreuves, cartes de matière, en-tête).
// LES 39 ÉPREUVES, lues là où la liste est vraie (2026-09-05) : une seule
// figurait ici, et elle revenait propre parce que l'énoncé n'était pas dans
// le DOM — `EpreuveShell` démarre au « seuil ». Mesuré à la main avant
// d'entrer ici, ouvertes en deux clics : 39 × 3 largeurs, 0 débord.
const examens = execSync("node scripts/routes-examens.mjs", { cwd: process.cwd(), encoding: "utf8" }).trim().split(" ");
const AUTRES = ESSAI ? ["/"] : [
  "/",
  "/matieres/maths",
  "/matieres/pc",
  "/matieres/svt",
  "/examens",
  ...examens,
  "/commencer",
  "/atelier",
];
if (ESSAI) lecons.splice(3);

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await navigateur.newPage({ viewport: { width: 360, height: 780 } });

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

// Les polices d'abord : un dépassement de 2 px se mesure avec les métriques de
// KaTeX, pas avec celles de la police de repli (un instrument au pixel près ne
// peut pas lire une page à moitié chargée — ADR 0040).
const mesure = async () => {
  await page.evaluate(() => document.fonts.ready.then(() => 0));
  return page.evaluate((essai) => {
    if (essai) {
      const bloc = document.createElement("div");
      bloc.setAttribute("data-essai-rouge", "");
      bloc.style.cssText = "width:2000px;height:1px";
      document.body.appendChild(bloc);
      // et un défileur FANTÔME : une boîte faite pour défiler en largeur, qui dépasse de 4 px en
      // HAUTEUR (la forme exacte d'une fraction KaTeX sous la dernière ligne), sans enfant focalisable
      const f = document.createElement("div");
      f.setAttribute("data-essai-rouge", "");
      f.style.cssText = "overflow-x:auto;width:100px;height:20px;line-height:20px";
      f.innerHTML = '<span style="display:inline-block;height:24px;vertical-align:top">x</span>';
      document.body.appendChild(f);
    }
    // Déplier tout : le shell ne pose `hidden` que lors de ses effets, et on
    // ne le re-déclenche pas ici — la mesure reste stable.
    document.querySelectorAll("[data-chapter-section]").forEach((s) => (s.hidden = false));
    const W = window.innerWidth;
    const debord = document.documentElement.scrollWidth - W;
    const fantomes = [];
    const enLargeur = {};
    for (const el of document.querySelectorAll("body *")) {
      const cs = getComputedStyle(el);
      const dx = /(auto|scroll)/.test(cs.overflowX), dy = /(auto|scroll)/.test(cs.overflowY);
      if (!dx && !dy) continue;
      // un élément EN LIGNE n'est pas un conteneur de défilement, quel que soit son overflow
      if (cs.display === "inline" || cs.display === "contents") continue;
      if (!el.clientWidth && !el.clientHeight) continue;
      const ox = dx ? el.scrollWidth - el.clientWidth : 0, oy = dy ? el.scrollHeight - el.clientHeight : 0;
      if (el.querySelector("a[href],button,input,select,textarea,summary,[tabindex]")) continue;
      // le petit dépassement en LARGEUR seul : compté, par sorte (non armé)
      if (!(dx && dy && oy > 0 && oy <= 8)) {
        if (ox > 0 && ox <= 8 && oy <= 0) { const k = el.classList.contains("katex") ? "formule en ligne" : el.tagName === "TABLE" ? "tableau" : el.classList.contains("katex-display") ? "formule détachée" : "autre"; enLargeur[k] = (enLargeur[k] ?? 0) + 1; }
        continue;
      }
      fantomes.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""} (${ox > 0 ? `${ox} px à droite` : ""}${ox > 0 && oy > 0 ? ", " : ""}${oy > 0 ? `${oy} px en bas` : ""}) · « ${(el.textContent ?? "").trim().slice(0, 40)} »`);
    }
    if (debord <= 1) return { debord, coupables: [], fantomes, enLargeur };

    // Un ancêtre qui DÉFILE (auto/scroll) contient légitimement un enfant
    // trop large. Un ancêtre `overflow-x: hidden`, lui, COUPE : il n'explique
    // aucun débord du document — et l'exclure avait pour effet de rendre le
    // rapport muet sur les cinq cas trouvés. Piège payé une fois.
    const defilable = (el) => {
      for (let n = el.parentElement; n; n = n.parentElement) {
        const o = getComputedStyle(n).overflowX;
        if (o === "auto" || o === "scroll") return true;
      }
      return false;
    };
    const trouves = [];
    for (const el of document.querySelectorAll("body *")) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.right <= W + 1) continue;
      if (defilable(el)) continue;
      // Le plus PROFOND : si un enfant déjà retenu est dedans, on garde
      // l'enfant et on jette le parent, sinon chaque débord remonte dix
      // ancêtres et le rapport devient illisible.
      if (trouves.some((t) => el.contains(t.el))) continue;
      trouves.push({
        el,
        info: `${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : ""} → ${Math.round(r.right - W)}px hors cadre · « ${(el.textContent ?? "").trim().slice(0, 48)} »`,
      });
      if (trouves.length >= 4) break;
    }
    return { debord, coupables: trouves.map((t) => t.info), fantomes, enLargeur };
  }, ESSAI);
};

let fautes = 0;
let fantomesPages = 0, fantomesTotal = 0;
const enLargeurTotal = {};
const rapport = [];
for (const largeur of LARGEURS) {
  await page.setViewportSize({ width: largeur, height: 780 });
  let ko = 0;
  for (const l of lecons) {
    await page.goto(`${BASE}/notions/${l}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(60);
    const m = await mesure();
    for (const [k, n] of Object.entries(m.enLargeur)) enLargeurTotal[k] = (enLargeurTotal[k] ?? 0) + n;
    if (m.debord > 1) {
      ko++; fautes++;
      rapport.push({ largeur, lecon: l, debord: m.debord, coupables: m.coupables });
      console.log(`✗ ${largeur}px [${l}] débord de ${m.debord}px`);
      for (const c of m.coupables) console.log(`      ${c}`);
    }
    if (m.fantomes.length) {
      fantomesPages++; fantomesTotal += m.fantomes.length;
      console.log(`✗ ${largeur}px [${l}] ${m.fantomes.length} défileur(s) fantôme(s)`);
      for (const c of m.fantomes.slice(0, 3)) console.log(`      ${c}`);
    }
  }
  console.log(`— ${largeur}px : ${lecons.length - ko}/${lecons.length} leçons sans débord`);

  let ka = 0;
  for (const r of AUTRES) {
    await page.goto(`${BASE}${r}`, { waitUntil: "domcontentloaded" });
    // L'énoncé, puis le corrigé : les deux temps d'une épreuve.
    const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
    if (await commencer.count()) {
      await commencer.first().click();
      await page.waitForSelector("[data-sujet-complet]", { timeout: 60000 });
      const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
      if (await terminer.count()) { await terminer.first().click(); await page.waitForSelector("[data-corrige-complet]", { timeout: 60000 }); }
    }
    await page.waitForTimeout(60);
    const m = await mesure();
    if (m.debord > 1) {
      ka++; fautes++;
      rapport.push({ largeur, lecon: r, debord: m.debord, coupables: m.coupables });
      console.log(`✗ ${largeur}px [${r}] débord de ${m.debord}px`);
      for (const c of m.coupables) console.log(`      ${c}`);
    }
    if (m.fantomes.length) {
      fantomesPages++; fantomesTotal += m.fantomes.length;
      console.log(`✗ ${largeur}px [${r}] ${m.fantomes.length} défileur(s) fantôme(s)`);
      for (const c of m.fantomes.slice(0, 3)) console.log(`      ${c}`);
    }
  }
  console.log(`— ${largeur}px : ${AUTRES.length - ka}/${AUTRES.length} pages hors leçon sans débord`);
}
await navigateur.close();
console.log(`\n${lecons.length + AUTRES.length} pages × ${LARGEURS.length} largeurs — ${fautes} débord(s), ${fantomesTotal} défileur(s) fantôme(s) sur ${fantomesPages} page(s)`);
console.log(`  ○ non armé (DECISIONS §31) — défileurs de 1 à 8 px EN LARGEUR, sur les leçons, somme des largeurs : ${Object.entries(enLargeurTotal).map(([k, n]) => `${n} ${k}`).join(", ") || "aucun"}`);
if (ESSAI) {
  const attendu = (lecons.length + AUTRES.length) * LARGEURS.length;
  if (fautes === attendu && fantomesPages === attendu) {
    console.log(`ESSAI ROUGE — ✔ le bloc posé fait déborder les ${attendu} pages, le défileur posé est vu sur les ${attendu}, et la porte le dit.`);
    process.exit(0);
  }
  console.error(`ESSAI ROUGE — ✘ débord vu sur ${fautes}/${attendu} page(s), défileur fantôme vu sur ${fantomesPages}/${attendu} : la porte ne sait pas rougir.`);
  process.exit(1);
}
process.exit(fautes || fantomesTotal ? 1 : 0);
