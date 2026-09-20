#!/usr/bin/env node
/**
 * trois-moteurs.mjs — le produit, dans les TROIS moteurs de rendu.
 *
 * POURQUOI. Tout ce que ce dépôt a jamais mesuré l'a été dans Chromium :
 * `dom-truth` et ses 279 contrôles, les 258 figures aux pixels, le zoom à
 * 400 %, les balayages téléphone. Un élève marocain qui ouvre le site sur
 * l'iPhone d'un grand frère lit du WebKit ; sur un Firefox Android, du Gecko.
 * Aucun des deux n'avait jamais été ouvert. Ce n'est pas un raffinement : le
 * produit repose sur du KaTeX, des colonnes en `ch`, `content-visibility` pour
 * les chapitres repliés, un en-tête collant et un script de thème avant
 * peinture — cinq endroits où les moteurs divergent historiquement.
 *
 * CE QU'ELLE MESURE, et c'est une PARITÉ, pas une correction absolue : le même
 * vecteur de faits objectifs dans les trois moteurs, sur les mêmes pages. Une
 * DIVERGENCE est un candidat-défaut à regarder ; une valeur identique partout
 * ne dit pas qu'elle est bonne, seulement qu'elle est la même. Les deux
 * énoncés sont vrais et il faut les garder séparés (ADR 0031).
 *
 * CE QUE CE BANC N'EST PAS — et c'est la première chose à lire. Le WebKit de
 * Playwright sous Linux N'EST PAS Safari sur iOS : même moteur, autre portage
 * (GTK/WPE), autres polices système, autres barres de défilement. Mesuré ici :
 * il peint une barre CLASSIQUE de 10 px, ce qui ramène le viewport de mise en
 * page de 390 à 380 et laisse 5 px de défilement horizontal sur les leçons.
 * Chromium et Firefox, eux, n'en peignent aucune (0 px) et rendent 0 de
 * débordement. **Ces 5 px sont la barre, pas le produit** : les seuls éléments
 * qui dépassent la largeur de mise en page — un SVG de figure à 656 px — le
 * font dans les TROIS moteurs, à l'intérieur d'un conteneur qui défile, ce qui
 * est le dessin voulu. Ce que ce banc ne peut pas dire : ce que fait Safari sur
 * un vrai iPhone, dont la barre est en surimpression et ne prend aucune
 * largeur. C'est exactement le piège de la journée — accuser le produit d'un
 * défaut du banc — et il est écrit ici pour que personne n'ait à le repayer.
 *
 * INSTALLER LES MOTEURS (ils ne sont pas dans l'image) :
 *   PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     npx playwright@1.61.1 install firefox webkit
 *   PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npx playwright@1.61.1 install-deps webkit
 * WebKit REFUSE de démarrer sans la seconde commande (gstreamer, enchant,
 * woff2, x264…) ; Firefox démarre sans rien de plus.
 *
 *   node scripts/trois-moteurs.mjs           → le tableau et les divergences
 *   node scripts/trois-moteurs.mjs --porte   → rouge s'il y a divergence armée
 */
import { chromium, firefox, webkit } from "playwright-core";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const PORTE = process.argv.includes("--porte");
//  ESSAI ROUGE. Un « aucune divergence » sorti d'un comparateur neuf ne vaut
//  rien tant qu'on ne l'a pas vu en reconnaître une. Ce mode empêche UN seul
//  moteur (WebKit) de recevoir son JavaScript : il doit alors rester non
//  hydraté, et le comparateur doit signaler `hydratee` — sur cette classe et
//  sur ce moteur seulement.
//
//  POURQUOI PAS UN SABOTAGE DU HTML : retirer un titre du HTML servi crée un
//  DÉSACCORD d'hydratation, et React répare le DOM en refaisant le rendu
//  client — le comparateur retrouverait le même compte partout et l'essai
//  rouge prouverait le contraire de ce qu'il annonce. C'est la même leçon
//  qu'au §11.149 : un sabotage doit toucher ce qu'on mesure, pas ce que le
//  produit sait réparer.
const ESSAI_ROUGE = process.argv.includes("--essai-rouge");
//  SECOND ESSAI ROUGE, pour l'axe KaTeX : les polices de KaTeX sont refusées au
//  seul WebKit. Les formules restent au même NOMBRE — c'est tout l'intérêt —
//  mais aucune n'est plus dessinée par la bonne police, et `katexChargees`
//  tombe à 0 là et nulle part ailleurs.
const ESSAI_ROUGE_KATEX = process.argv.includes("--essai-rouge-katex");
const PORT = Number(process.env.PORT_MOTEURS ?? 4300 + (process.pid % 80));
const BASE = `http://127.0.0.1:${PORT}`;

const PAGES = [
  { nom: "accueil", url: "/" },
  { nom: "leçon (maths)", url: "/notions/maths/limites-continuite" },
  { nom: "leçon (philo)", url: "/notions/philo/la-verite" },
  { nom: "épreuve", url: "/examens/spc-2025-normale" },
  { nom: "commencer", url: "/commencer" },
];

const { spawn } = await import("node:child_process");
const serveur = spawn("npx", ["next", "start", "-p", String(PORT)], { cwd: WEB, stdio: "ignore", detached: true });
const arreter = () => { try { process.kill(-serveur.pid); } catch {} };
process.on("exit", arreter);
process.on("SIGINT", () => { arreter(); process.exit(130); });
let vivant = false;
for (let i = 0; i < 60; i++) {
  try { await fetch(BASE + "/"); vivant = true; break; } catch { await new Promise((r) => setTimeout(r, 1000)); }
}
if (!vivant) { console.error("trois-moteurs : `next start` n'a pas répondu."); process.exit(1); }

//  Le VECTEUR de faits. Chacun est un nombre ou un booléen — pas une capture,
//  pas un jugement : deux moteurs ne peignent jamais exactement les mêmes
//  pixels, et comparer des pixels ne produirait que du bruit. On compare ce
//  qui DOIT être identique.
const vecteur = () => {
  const d = document;
  const vis = (el) => !!(el && el.getClientRects().length);
  const chapitresReplies = [...d.querySelectorAll("[data-chapitre], details, [aria-expanded='false']")].length;
  //  Un panneau replié ne doit RIEN peindre : `content-visibility` n'est pas
  //  arrivé en même temps dans les trois moteurs, et un chapitre replié qui
  //  redevient visible, c'est la leçon entière déversée d'un coup.
  const repliesVisibles = [...d.querySelectorAll("[aria-expanded='false']")]
    .map((b) => b.getAttribute("aria-controls")).filter(Boolean)
    .map((id) => d.getElementById(id)).filter((p) => vis(p)).length;
  const col = d.querySelector("main")?.getBoundingClientRect().width ?? 0;
  return {
    hydratee: window.__bacVivant === true,
    debordement: Math.max(0, d.documentElement.scrollWidth - d.documentElement.clientWidth),
    katex: d.querySelectorAll(".katex").length,
    katexErreurs: d.querySelectorAll(".katex-error").length,
    //  COMPTER LES FORMULES NE SUFFIT PAS, et c'était un trou de cet instrument
    //  même : une formule rendue dans une police de SECOURS — parce que le
    //  woff2 de KaTeX n'a pas chargé dans ce moteur — compte quand même pour
    //  une. Le compte serait identique et le rendu faux.
    //
    //  J'ALLAIS ARMER DEUX MESURES QUI NE MESURENT RIEN. Éprouvées d'abord, en
    //  bloquant réellement les polices KaTeX (`route("**/*KaTeX*", abort)`) :
    //    · la largeur cumulée des `.katex` passe de 4 138 à 4 178 px — **+1,0 %**,
    //      noyé dans le bruit de mise en page (le même chiffre varie de 7 % entre
    //      moteurs à 390 px, par la seule largeur de barre de défilement) ;
    //    · le nombre de familles DÉCLARÉES reste 20 dans les deux cas.
    //  Seul le nombre de familles réellement CHARGÉES bouge : 2 → 0. C'est donc
    //  la seule des trois qui est armée. Mesurer le rouge AVANT de choisir le
    //  seuil, plutôt que deviner un seuil et croire au vert.
    katexLargeur: Math.round([...d.querySelectorAll(".katex")].reduce((a, e) => a + e.getBoundingClientRect().width, 0)),
    katexPolices: [...document.fonts].filter((f) => f.family.includes("KaTeX")).length,
    katexChargees: [...document.fonts].filter((f) => f.family.includes("KaTeX") && f.status === "loaded").length,
    sombre: d.documentElement.classList.contains("dark"),
    boutons: [...d.querySelectorAll("button")].filter((b) => vis(b) && !b.disabled).length,
    liens: [...d.querySelectorAll("a[href]")].filter(vis).length,
    titres: d.querySelectorAll("h1,h2,h3").length,
    chapitresReplies,
    repliesVisibles,
    largeurMain: Math.round(col),
    hauteurDoc: Math.round(d.documentElement.scrollHeight),
    //  LA BARRE DE DÉFILEMENT, mesurée et affichée, parce que sans elle les
    //  trois lignes du dessus se lisent de travers. Le WebKit de Linux peint
    //  une barre CLASSIQUE de 10 px : le viewport de mise en page tombe à 380
    //  et le document « déborde » de 5 px. Ce n'est pas un défaut du produit,
    //  c'est la barre — et Safari sur iOS, lui, peint une barre EN SURIMPRESSION
    //  qui ne prend aucune largeur. Voir l'en-tête, « ce que ce banc n'est pas ».
    barreDefilement: window.innerWidth - d.documentElement.clientWidth,
  };
};

const MOTEURS = [["chromium", chromium], ["firefox", firefox], ["webkit", webkit]];
const releve = {}; // page → moteur → vecteur

for (const [nom, type] of MOTEURS) {
  const args = nom === "chromium" ? [] : undefined;
  const b = await type.launch({
    ...(nom === "chromium" && process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}),
    ...(args ? { args } : {}),
  });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "dark" });
  const page = await ctx.newPage();
  if (ESSAI_ROUGE && nom === "webkit") await page.route("**/_next/static/chunks/**", (r) => r.abort());
  if (ESSAI_ROUGE_KATEX && nom === "webkit") await page.route("**/*KaTeX*", (r) => r.abort());
  for (const p of PAGES) {
    const erreurs = [];
    const onErr = (e) => erreurs.push(String(e).slice(0, 80));
    page.on("pageerror", onErr);
    try {
      await page.goto(BASE + p.url, { waitUntil: "domcontentloaded", timeout: 40000 });
      try { await page.waitForFunction(() => window.__bacVivant === true, { timeout: 30000 }); } catch {}
      await page.waitForTimeout(400);
      const v = await page.evaluate(vecteur);
      (releve[p.nom] ??= {})[nom] = { ...v, erreurs: erreurs.length };
    } catch (e) {
      (releve[p.nom] ??= {})[nom] = { echec: String(e).slice(0, 60) };
    }
    page.off("pageerror", onErr);
  }
  await b.close();
  console.log(`  · ${nom} mesuré`);
}
arreter();

//  CE QUI DOIT ÊTRE IDENTIQUE dans les trois moteurs, et pourquoi :
//   · hydratee     — sinon la page est morte dans ce moteur ;
//   · katex/katexErreurs — même contenu, même nombre de formules ; un écart
//     veut dire qu'un moteur n'a pas rendu des mathématiques ;
//   · repliesVisibles — un chapitre replié qui peint, c'est la leçon déversée ;
//   · sombre       — le script de thème avant peinture doit marcher partout ;
//   · erreurs      — une exception dans un seul moteur est un défaut de ce moteur ;
//   · titres/liens — la structure du document ne dépend pas du moteur.
//  PAS armés, et c'est écrit : `debordement`, `largeurMain`, `hauteurDoc`,
//  `boutons`. Les trois premiers dépendent de la métrique de fonte, qui diffère
//  légitimement d'un moteur à l'autre ; `boutons` compte la visibilité, qui
//  dépend du défilement. Ils sont AFFICHÉS — un écart énorme se verra — mais ne
//  font pas rougir la porte.
const ARMES = ["hydratee", "katex", "katexErreurs", "repliesVisibles", "sombre", "erreurs", "titres", "liens", "katexChargees"];
//  NI `katexLargeur` NI `katexPolices` ne sont armées, et c'est mesuré, pas
//  supposé — voir le commentaire du vecteur. Elles restent AFFICHÉES : un écart
//  énorme se verrait, et la largeur documente au passage que les moteurs ne
//  crénent pas pareil (« f(1) » : 33 px contre 26 px en WebKit, pour 0,5 %
//  d'écart sur le total à 1280 px et 7 % à 390 px, par la barre de défilement).
const AFFICHES = ["hydratee", "erreurs", "katex", "katexErreurs", "katexChargees", "katexPolices", "katexLargeur", "sombre", "repliesVisibles", "titres", "liens", "boutons", "barreDefilement", "debordement", "largeurMain", "hauteurDoc"];

console.log(`\n━━ le produit dans les trois moteurs — 390×844, thème système sombre ━━\n`);
const divergences = [];
for (const p of PAGES) {
  const r = releve[p.nom] ?? {};
  console.log(`  ${p.nom}  (${p.url})`);
  const echecs = MOTEURS.filter(([m]) => r[m]?.echec);
  for (const [m] of echecs) console.log(`     ✗ ${m} : ${r[m].echec}`);
  const ok = MOTEURS.filter(([m]) => r[m] && !r[m].echec).map(([m]) => m);
  for (const cle of AFFICHES) {
    const vals = ok.map((m) => `${m.slice(0, 2)}=${r[m][cle]}`);
    const distincts = new Set(ok.map((m) => String(r[m][cle])));
    const marque = distincts.size > 1 ? (ARMES.includes(cle) ? " ‹‹ DIVERGENCE" : " ·écart toléré") : "";
    console.log(`     ${cle.padEnd(16)} ${vals.join("  ")}${marque}`);
    if (distincts.size > 1 && ARMES.includes(cle)) divergences.push({ page: p.nom, cle, vals: vals.join(" ") });

  }
  for (const [m] of echecs) divergences.push({ page: p.nom, cle: "CHARGEMENT", vals: `${m} : ${r[m].echec}` });
  console.log();
}

if (!divergences.length) console.log("  aucune divergence sur les classes armées.\n");
else {
  console.log("━━ DIVERGENCES ENTRE MOTEURS ━━");
  for (const d of divergences) console.log(`   ✗ ${d.page} · ${d.cle} : ${d.vals}`);
  console.log();
}

if (ESSAI_ROUGE_KATEX) {
  const surKatex = divergences.filter((d) => d.cle === "katexChargees");
  const avecFormules = PAGES.filter((p) => (releve[p.nom]?.chromium?.katex ?? 0) > 0).length;
  if (surKatex.length === avecFormules && avecFormules > 0 && divergences.every((d) => d.cle === "katexChargees")) {
    console.log("━━ ESSAI ROUGE KaTeX : le comparateur a vu les polices manquantes ✓ ━━");
    console.log(`   ${surKatex.length}/${avecFormules} page(s) à formules signalées, et le COMPTE de formules n'a pas bougé —`);
    console.log("   ce qui est précisément le piège que cet axe existe pour éviter.\n");
    process.exit(0);
  }
  console.error("━━ ESSAI ROUGE KaTeX : le relevé ne correspond pas ━━");
  console.error(`   katexChargees signalé sur ${surKatex.length}/${avecFormules} · autres classes : ${[...new Set(divergences.filter((d) => d.cle !== "katexChargees").map((d) => d.cle))].join(", ") || "aucune"}\n`);
  process.exit(1);
}

if (ESSAI_ROUGE) {
  const surHydratee = divergences.filter((d) => d.cle === "hydratee");
  //  `liens` diverge aussi, de +1 sur chaque page, et c'est le PRODUIT QUI
  //  MARCHE : privé de ses morceaux, le moteur saboté affiche la veille
  //  d'hydratation (§11.29), dont le lien « Recharger » devient le PREMIER du
  //  document — vérifié en le lisant, pas en le supposant. L'attendre
  //  explicitement vaut mieux que l'exclure : si ce +1 disparaissait, la veille
  //  aurait cessé de fonctionner dans ce moteur, et l'essai rouge le dirait.
  const attendu = (d) => d.cle === "hydratee" || d.cle === "liens";
  const surLiens = divergences.filter((d) => d.cle === "liens");
  if (surHydratee.length === PAGES.length && surLiens.length === PAGES.length && divergences.every(attendu)) {
    console.log("━━ ESSAI ROUGE : le comparateur a vu le moteur privé de JavaScript ✓ ━━");
    console.log(`   ${surHydratee.length}/${PAGES.length} pages signalées sur « hydratee » (we=false),`);
    console.log(`   et ${surLiens.length}/${PAGES.length} sur « liens » (+1) : la veille d'hydratation`);
    console.log(`   pose son lien « Recharger » — elle fonctionne donc aussi dans ce moteur.\n`);
    process.exit(0);
  }
  if (!divergences.length) console.error("━━ ESSAI ROUGE : AVEUGLE — un moteur n'a pas hydraté et rien n'a été vu ━━\n");
  else {
    console.error("━━ ESSAI ROUGE : le relevé ne correspond pas à ce que le sabotage devait produire ━━");
    console.error(`   hydratee : ${surHydratee.length}/${PAGES.length} · liens : ${surLiens.length}/${PAGES.length}`);
    console.error(`   autres classes : ${[...new Set(divergences.filter((d) => !attendu(d)).map((d) => d.cle))].join(", ") || "aucune"}\n`);
  }
  process.exit(1);
}

if (PORTE && divergences.length) process.exit(1);
process.exit(0);
