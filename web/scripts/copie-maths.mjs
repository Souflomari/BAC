/**
 * copie-maths.mjs — ce que l'élève OBTIENT quand il copie son cours.
 *
 * Un élève qui révise recopie. Il sélectionne un paragraphe, il le colle dans
 * ses notes, dans un document, dans un message à un camarade. Ce que le
 * presse-papier lui donne est donc un rendu du produit au même titre que la
 * page — et personne ne l'avait jamais regardé.
 *
 * CE QUI CLOCHE. KaTeX rend CHAQUE formule deux fois : un arbre MathML pour
 * les lecteurs d'écran (`.katex-mathml`) et un arbre HTML pour l'œil
 * (`.katex-html`). Le premier est masqué VISUELLEMENT — `clip-path: inset(50%)`,
 * 1×1 px — mais il reste dans le flux, donc dans la SÉLECTION. Copier
 * « la tension u_C(t) aux bornes » rend « la tension 𝑢 𝐶 ( 𝑡 ) u C ​ (t) aux
 * bornes ». Et le MathML contient lui-même une annotation LaTeX, donc la
 * formule peut sortir jusqu'à TROIS fois.
 *
 * L'instrument sélectionne le contenu de chaque bloc de prose contenant une
 * formule, lit `getSelection().toString()`, et compte les formules dont le
 * texte MathML ET le texte HTML apparaissent tous les deux.
 */
import { chromium } from "playwright-core";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
// Comme `dom-truth` : si aucun BASE n'est fourni, l'instrument lève son
// PROPRE serveur sur un port de service. Sans cela il ne peut pas tourner en
// CI, et une porte qu'on ne peut pas exécuter en CI n'est pas une porte.
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
const PORT = Number(process.env.PORT_COPIE ?? 3200 + (process.pid % 500));
const AUTONOME = !process.env.BASE;
const BASE = process.env.BASE ?? `http://127.0.0.1:${PORT}`;

let serveur = null;
if (AUTONOME) {
  serveur = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: WEB, stdio: "ignore", detached: true,
  });
  const debut = Date.now();
  let pret = false;
  while (Date.now() - debut < 60000) {
    try {
      const r = await fetch(`${BASE}/`);
      if (r.ok) { pret = true; break; }
    } catch { /* pas encore là */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  if (!pret) {
    console.error("✗ le serveur n'a pas démarré — rien n'est mesuré");
    try { process.kill(-serveur.pid); } catch { /* déjà mort */ }
    process.exit(1);
  }
}
const arreter = () => {
  if (serveur?.pid) { try { process.kill(-serveur.pid); } catch { /* déjà mort */ } }
};
const routes = process.argv.slice(2).filter((a) => !a.startsWith("--"));
if (routes.length === 0) {
  console.error("usage: node scripts/copie-maths.mjs /notions/pc/rlc-serie …");
  process.exit(1);
}
const porte = process.argv.includes("--porte");
// --porte : verdict seul (texte brut, trois copies). Sans lui, la mesure du collage riche s'ajoute.

const nav = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
// Le presse-papier POUR DE VRAI. Une sélection construite à la main
// (`Range` + `selectNodeContents`) sérialise TOUT, y compris ce que
// `user-select: none` retire à l'utilisateur : elle mesure donc autre chose
// que ce que vit l'élève. On passe par ⌘A / ⌘C, le geste réel, et on lit le
// presse-papier. Piège payé le 2026-09-05 : la première version de cet
// instrument annonçait un correctif à moitié efficace alors qu'il était
// total — c'était la mesure qui n'avait pas changé de chemin.
const ctx = await nav.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
const page = await ctx.newPage();

const copierTout = async () => {
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+C");
  return page.evaluate(() => navigator.clipboard.readText());
};

/**
 * L'AUTRE SAVEUR DU PRESSE-PAPIER. Un élève qui colle dans Word ou Docs ne
 * reçoit pas `text/plain` mais `text/html`. Deux questions s'y posent, et une
 * seule a une bonne réponse :
 *   · le MathML y est-il encore MASQUÉ ? OUI — Chrome sérialise les styles
 *     calculés en ligne, donc `clip-path`, `position: absolute`, `width: 1px`
 *     et même `user-select: none` voyagent avec. Un éditeur qui honore les
 *     styles en ligne ne montrera pas la formule en double.
 *   · quelle TAILLE ? Mesurée sur `rlc-serie` : 855 ko de HTML pour 5,9 ko de
 *     texte — 145 fois. La cause n'est pas le produit mais la préflight de
 *     Tailwind, qui pose une trentaine de variables `--tw-*` sur CHAQUE
 *     élément ; Chrome les recopie toutes, sur chaque span. Rien à corriger
 *     ici sans toucher au socle CSS : c'est une mesure, pas une porte.
 */
const mesurerRiche = async () => {
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Control+C");
  return page.evaluate(async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const it of items) {
        if (!it.types.includes("text/html")) continue;
        const html = await (await it.getType("text/html")).text();
        const plain = it.types.includes("text/plain")
          ? await (await it.getType("text/plain")).text() : "";
        const j = html.indexOf("katex-mathml");
        const bout = j >= 0 ? html.slice(j, j + 3000) : "";
        return {
          html: html.length,
          plain: plain.length,
          masque: /clip-path|clip:/.test(bout) && /width:\s*1px/.test(bout),
          formules: (html.match(/katex-mathml/g) || []).length,
        };
      }
    } catch { /* le presse-papier riche n'est pas lisible partout */ }
    return null;
  });
};

let pagesSales = 0, fuitesTotal = 0, formules = 0;
const exemples = [];

// LE CRITÈRE, exact et binaire — et il a fallu en essayer trois.
//
// Ce qu'on veut savoir : le presse-papier contient-il autre chose que ce que
// l'élève voit ? On le demande donc à la page elle-même, en trois copies :
//
//   IDÉAL   — le MathML retiré du rendu (`display: none`) : par construction,
//             exactement ce que l'œil a devant lui ;
//   RÉEL    — la page telle qu'elle est livrée ;
//   TÉMOIN  — la sélection RENDUE au MathML (`user-select: text !important`),
//             c'est-à-dire l'état d'avant le correctif.
//
// Propre si RÉEL == IDÉAL, caractères blancs mis à part (retirer une boîte du
// rendu change la façon dont le navigateur sérialise les sauts de ligne, et
// ce n'est pas le sujet). Et l'instrument n'a le droit de conclure que si
// TÉMOIN != IDÉAL : sinon il ne sait pas voir le défaut qu'il prétend écarter.
//
// DEUX CRITÈRES JETÉS AVANT CELUI-LÀ, tous deux muets ou menteurs :
//   · chercher le bloc Unicode « Mathematical Alphanumeric Symbols » — le
//     MathML de KaTeX écrit « u », « C », « t » en lettres ORDINAIRES ici,
//     et le témoin restait muet sur une page pleine de formules doublées ;
//   · chercher la signature « texte MathML + texte HTML » collés — « u_n »
//     donne « un » + « un​ », et « …reste un u_n ou un u_n dedans… » la
//     déclenche sans qu'aucune formule ne soit doublée ; et dans une
//     dérivation, la fin d'une formule et le début de la suivante forment la
//     même suite de caractères. Un critère par sous-chaîne ne peut pas
//     distinguer une coïncidence de prose d'un doublon.
const sansEspaces = (t) => t.replace(/\s+/g, "");

const styler = (id, css) =>
  page.evaluate(([i, c]) => {
    document.getElementById(i)?.remove();
    if (!c) return;
    const st = document.createElement("style");
    st.id = i;
    st.textContent = c;
    document.head.appendChild(st);
  }, [id, css]);

for (const route of routes) {
  const reponse = await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
  // L'ÉPREUVE S'OUVRE EN DEUX TEMPS (2026-09-05). Copier une formule du
  // corrigé pour la coller dans ses notes est un geste d'élève ; le corrigé
  // n'entre dans le DOM qu'après « Commencer » puis « Terminer ».
  const commencer = page.getByRole("button", { name: /Commencer l.épreuve/i });
  if (await commencer.count()) {
    await commencer.first().click();
    await page.waitForSelector("[data-exam-exo]", { timeout: 10000 });
    const terminer = page.getByRole("button", { name: /Terminer l.épreuve/i });
    if (await terminer.count()) { await terminer.first().click(); await page.waitForTimeout(400); }
  }
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
  await page.waitForTimeout(400);
  // Déplier : un élève qui fait ⌘A copie aussi les chapitres repliés.
  await page.evaluate(() => {
    for (const g of document.querySelectorAll("main [hidden]")) g.removeAttribute("hidden");
  });
  const n = await page.evaluate(() => document.querySelectorAll("main .katex").length);
  formules += n;

  // Le collage RICHE est une MESURE (taille, masquage en ligne), pas un
  // critère : rien ne conclut dessus. En mode porte on l'épargne — mesuré le
  // 2026-09-05, il coûte 4 à 5,5 s par page dense (28 à 37 Mo de HTML à
  // sérialiser), soit un tiers des 12 min que la porte prenait en CI.
  const riche = porte ? null : await mesurerRiche();
  const reel = sansEspaces(await copierTout());
  await styler("copie-ideal", ".katex-mathml{display:none!important}");
  const ideal = sansEspaces(await copierTout());
  await styler("copie-ideal", null);
  await styler("copie-temoin", ".katex-mathml{user-select:text!important;-webkit-user-select:text!important}");
  const temoin = sansEspaces(await copierTout());
  await styler("copie-temoin", null);

  const propre = reel === ideal;
  const instrumentVoit = temoin !== ideal;
  const enTrop = reel.length - ideal.length;

  if (n === 0) {
    console.log(`  · ${route} — aucune formule, scène sans objet`);
    continue;
  }
  if (!instrumentVoit) {
    pagesSales++;
    console.log(`  ✗ ${route} — ${n} formule(s) ; TÉMOIN MUET : l'instrument ne sait pas voir le défaut, rien n'est conclu`);
    continue;
  }
  if (!propre) {
    pagesSales++;
    fuitesTotal += enTrop;
    if (exemples.length < 3) {
      const k = [...reel].findIndex((c, x) => c !== ideal[x]);
      exemples.push({ route, extrait: reel.slice(Math.max(0, k - 40), k + 60) });
    }
  }
  console.log(
    `  ${propre ? "✓" : "✗"} ${route} — ${n} formule(s) ; ` +
    `le témoin voit ${temoin.length - ideal.length} caractère(s) parasites sans le correctif, ` +
    `le livré en a ${enTrop}`
  );
  if (riche) {
    console.log(
      `      collage RICHE : ${(riche.html / 1024).toFixed(0)} ko de HTML pour ` +
      `${(riche.plain / 1024).toFixed(1)} ko de texte (×${(riche.html / Math.max(1, riche.plain)).toFixed(0)}) · ` +
      `MathML ${riche.masque ? "masqué en ligne ✓" : "SANS ses styles de masquage ✗"}`
    );
  }
}

console.log(
  fuitesTotal > 0
    ? `\n${fuitesTotal} caractère(s) parasites dans le presse-papier, ` +
      `sur ${pagesSales}/${routes.length} page(s) — ${formules} formules en jeu.`
    : `\nLe presse-papier rend EXACTEMENT ce que l'élève voit : ${routes.length} page(s), ` +
      `${formules} formules, zéro caractère en trop.`
);
for (const e of exemples) console.log(`   · ${e.route} : « …${e.extrait}… »`);

await nav.close();
arreter();
// Une route absente a déjà posé process.exitCode = 1 : la porte doit tomber
// même si toutes les pages RÉELLEMENT visitées sont propres. La liste de
// routes EST la portée ; une entrée fautive l'ampute sans rien dire.
if (porte && process.exitCode === 1) {
  console.error("\n━━ porte ROMPUE — une route de la liste n'existe pas (voir le ✗ ci-dessus) ━━");
  process.exit(1);
}
if (porte && fuitesTotal > 0) {
  console.error(
    "\n━━ porte copie : le presse-papier doit rendre EXACTEMENT ce que l'élève voit ━━\n" +
    "   (le MathML de KaTeX est masqué à l'œil mais reste dans la sélection —\n" +
    "    `user-select: none` sur `.katex-mathml`, dans globals.css)"
  );
  process.exit(1);
}
