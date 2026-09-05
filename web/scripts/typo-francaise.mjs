/**
 * typo-francaise.mjs — la typographie française, dans le texte RENDU.
 *
 * Le français met une espace insécable fine (U+202F) devant `;`, `:`, `!`,
 * `?`, et à l'intérieur des guillemets « … ». Sans elle, une ligne peut
 * commencer par « : » ou « ? » — ce qu'aucun livre scolaire ne fait, et ce
 * qu'un élève lit comme du travail bâclé. L'apostrophe droite (`'`) est
 * l'autre marque d'un texte non relu.
 *
 * `remarkFrenchTypography` normalise la PROSE des leçons. La question que
 * cette sonde pose est l'autre : que reste-t-il ailleurs — dans les
 * étiquettes de figure écrites à la main, dans les légendes des sidecars,
 * dans les pages hors leçon ?
 *
 * On lit le texte RENDU (`innerText`), pas les fichiers : c'est ce que
 * l'élève voit qui compte, et la chaîne de rendu peut aussi bien réparer que
 * casser.
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
const PORT = Number(process.env.PORT_TYPO ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const porte = process.argv.includes("--porte");
if (routes.length === 0) {
  console.error("usage: node scripts/typo-francaise.mjs [--porte] <routes…>");
  process.exit(1);
}
// Les pages HORS LEÇON comptent autant : /atelier et une épreuve portaient à
// elles seules 65 écarts que la première passe n'avait pas vus, simplement
// parce qu'elles n'étaient pas dans la liste. Une porte ne juge que ce qu'on
// lui donne — la liste EST la portée.

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
  const t0 = Date.now();
  let pret = false;
  while (Date.now() - t0 < 60000) {
    try { if ((await fetch(`${BASE}/`)).ok) { pret = true; break; } } catch { /* pas encore */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) { console.error("✗ serveur absent — rien n'est mesuré"); try { process.kill(-serveur.pid); } catch {} process.exit(1); }
}
const arreter = () => { if (serveur?.pid) { try { process.kill(-serveur.pid); } catch {} } };

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
const page = await (await nav.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

const total = { haute: 0, guillemets: 0, apostrophe: 0 };
const exemples = [];
const parSite = {};

for (const route of routes) {
  const reponse = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  // UNE ROUTE QUI N'EXISTE PAS N'EST PAS UNE ROUTE PROPRE (2026-09-05).
  // La liste de routes EST la portée de cette porte, et une entrée fautive
  // l'amputait en silence : `/options` figurait dans la liste CI de la porte
  // typographie et rend un 404 depuis que les bancs d'options ont été purgés.
  // La porte mesurait la page « Page introuvable » et annonçait « ✓ /options ».
  // Un contrôle qui ne peut pas devenir rouge n'est pas un contrôle.
  if (reponse && reponse.status() !== 200) {
    console.error(`✗ ${route} — HTTP ${reponse.status()} : cette route n'existe pas, la porte ne mesure rien.`);
    process.exitCode = 1;
    continue;
  }
  // LES ÉNONCÉS D'ÉPREUVE SONT DERRIÈRE « Commencer » (2026-09-05). Même
  // angle mort que pour la porte accents : `EpreuveShell` démarre au « seuil »
  // et les 39 sujets n'entrent dans le DOM qu'après l'action primaire. Une
  // porte qui n'ouvre pas la page mesure le masthead et se déclare verte.
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
    // ET LA CORRECTION. Le raisonnement expert — la partie du produit qui
    // prétend enseigner — n'entre dans le DOM qu'en phase « correction »
    // (attempt-first absolu, gardé par dom-truth). Sans ce second clic, la
    // porte mesure l'énoncé et pas le corrigé.
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) {
      await terminer.first().click();
      await page.waitForTimeout(400);
    }
  }
  await page.waitForTimeout(250);
  const r = await page.evaluate(() => {
    const racine = document.querySelector("main");
    if (!racine) return null;
    // Chapitres dépliés : ce que l'élève voit au fil de sa lecture, pas
    // seulement le chapitre ouvert à l'arrivée.
    for (const g of racine.querySelectorAll("[hidden]")) g.removeAttribute("hidden");

    const NNBSP = "\u202F", NBSP = "\u00A0";
    const RE_APO = /\p{L}'\p{L}/gu;
    // Une lettre, un chiffre, une parenthèse ou un guillemet fermant ; une
    // espace ORDINAIRE facultative ; puis ; : ?. L'insécable fine, elle, ne
    // matche pas — c'est justement ce qu'on veut voir.
    const RE_HAUTE = new RegExp(`[\\p{L}\\d)»][ ${NBSP}]?[;:?](?!\\d)`, "gu");
    const RE_GUILL = new RegExp(`«[^${NNBSP}${NBSP}]|[^${NNBSP}${NBSP}]»`, "gu");

    const compte = { haute: 0, guillemets: 0, apostrophe: 0 };
    const sites = {};
    const ex = [];
    const w = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      // Le MathML de KaTeX double chaque formule, et le code n'est pas du
      // français. Le `\text{…}` d'une formule, LUI, en est — on le garde.
      // `style` et `script` sont des NŒUDS DE TEXTE dans le DOM : le CSS d'une
      // figure inlinée (« .f-edge { stroke: … } ») ressemble à du français mal
      // ponctué et faisait crier la sonde sur cinq leçons. Ce n'est pas de la
      // langue, c'est du code.
      if (n.parentElement?.closest(".katex-mathml, code, pre, style, script")) continue;
      const t = n.nodeValue || "";
      const a = (t.match(RE_APO) || []).length;
      const h = (t.match(RE_HAUTE) || []).length;
      const g = (t.match(RE_GUILL) || []).length;
      if (!a && !h && !g) continue;
      compte.apostrophe += a; compte.haute += h; compte.guillemets += g;
      let e = n.parentElement, chemin = [];
      while (e && e !== racine && chemin.length < 3) {
        chemin.push(e.tagName.toLowerCase() +
          (typeof e.className === "string" && e.className ? "." + e.className.split(/\s+/)[0] : ""));
        e = e.parentElement;
      }
      const cle = chemin.join(" < ");
      sites[cle] = (sites[cle] || 0) + a + h + g;
      if (ex.length < 2) ex.push(`${cle} :: ${t.trim().slice(0, 60)}`);
    }
    return { ...compte, sites, ex };
  });
  if (!r) { console.log(`  · ${route} — pas de <main>, page ignorée`); continue; }
  const n = r.haute + r.guillemets + r.apostrophe;
  total.haute += r.haute; total.guillemets += r.guillemets; total.apostrophe += r.apostrophe;
  for (const [k, v] of Object.entries(r.sites)) parSite[k] = (parSite[k] || 0) + v;
  for (const e of r.ex) if (exemples.length < 6) exemples.push(`${route} — ${e}`);
  console.log(
    `  ${n === 0 ? "✓" : "✗"} ${route} — ${r.haute} ponctuation haute, ` +
    `${r.guillemets} guillemet(s), ${r.apostrophe} apostrophe(s) droite(s)`
  );
}

const n = total.haute + total.guillemets + total.apostrophe;
// `routes.length` compterait les routes DEMANDÉES ; une route morte n'a pas été
// mesurée, et l'annoncer comme tenue serait exactement le mensonge que le
// garde-fou ci-dessus est là pour empêcher.
const mesurees = routes.length - (process.exitCode === 1 ? 1 : 0);
console.log(
  n === 0 && process.exitCode !== 1
    ? `\nLa typographie française tient sur ${mesurees} page(s) : aucune apostrophe droite, ` +
      `aucune espace manquante devant une ponctuation haute.`
    : `\n${n} écart(s) : ${total.haute} espace(s) manquante(s) devant une ponctuation haute, ` +
      `${total.guillemets} guillemet(s) mal espacé(s), ${total.apostrophe} apostrophe(s) droite(s).`
);
if (n > 0) {
  console.log("\n  Par site de rendu :");
  for (const [k, v] of Object.entries(parSite).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`    ${String(v).padStart(4)}  ${k}`);
  }
  for (const e of exemples) console.log(`   · ${e}`);
}
await nav.close();
arreter();
// Une route absente a déjà posé process.exitCode = 1 plus haut : la porte doit
// tomber même si toutes les pages REELLEMENT visitées sont propres. Sinon la
// liste de routes peut rétrécir en silence — le défaut que ce garde-fou existe
// pour empêcher.
if (porte && process.exitCode === 1) {
  console.error(
    "\n━━ porte typographie : ROMPUE — une route de la liste n'existe pas ━━\n" +
    "   La liste de routes EST la portée de cette porte. Une entrée fautive\n" +
    "   l'ampute sans rien dire : la page 404 est propre, et la porte annonce\n" +
    "   un ✓ pour une page que personne ne lit."
  );
  process.exit(1);
}
if (porte && n > 0) {
  console.error(
    "\n━━ porte typographie : le français du produit s'écrit d'une seule façon ━━\n" +
    "   (apostrophe ’ entre deux lettres, insécable fine devant ; : ? et dans\n" +
    "    les guillemets. La prose passe par `remarkFrenchTypography` ; ce qui\n" +
    "    ne passe pas par lui — titres, cartes, légendes, figures — se corrige\n" +
    "    à SA source : lib/chapters.ts, lib/content.ts, scripts/typo-figures.py,\n" +
    "    scripts/typo-math.py.)"
  );
  process.exit(1);
}
