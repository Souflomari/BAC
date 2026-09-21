/**
 * Le markdown d'une leçon ne doit pas repartir ENTIER dans la charge RSC.
 *
 * Né d'une mesure (§11.175). Un document de leçon pesait jusqu'à 3,89 Mo de
 * HTML pour 105 ko de texte lisible — 37 pour 1. La moitié (53,7 %) n'est pas
 * le DOM rendu mais la charge RSC : ce que l'App Router sérialise dans la page
 * pour hydrater les composants CLIENT. Tout ce qu'on passe en prop à une
 * frontière client y part en double du DOM déjà rendu.
 *
 * Le défaut trouvé : `MarginRail` et `ChapterMenuCompact` recevaient
 * `lessonMd` — la leçon entière — pour n'en tirer qu'une liste de titres de
 * chapitre. Deux frontières client, donc la leçon partait DEUX fois. Mesuré
 * sur `suites-numeriques` : 2 × 49 026 o.
 *
 * LA PORTE. Pour chaque leçon : le document servi ne doit contenir AUCUNE
 * occurrence d'une ligne de titre BRUTE du `lesson.md` (avec son code de
 * barreau `R<n> — `, que le rendu retire toujours). Cette sonde ne peut pas
 * confondre le rendu et la source, justement parce que le code de barreau ne
 * survit jamais au rendu : le trouver dans le document, c'est trouver la
 * SOURCE, pas le texte affiché.
 *
 * ROUGE PROUVÉ, VERT PROUVÉ (2026-09-21, HANDOFF §11.175) :
 *   - vert : 62 leçons, 0 occurrence, sur le build d'après le correctif ;
 *   - rouge : le document capturé AVANT le correctif (3 887 261 o) en porte
 *     exactement 2, toutes deux dans la charge RSC. Le document n'est pas
 *     versé en fixture — 3,89 Mo — mais `--essai-rouge` reconstitue le défaut
 *     et vérifie que le détecteur crie.
 *
 * Usage :
 *   node scripts/source-en-double.mjs [--porte] [routes…]
 *   node scripts/source-en-double.mjs --essai-rouge
 */
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE ?? "http://localhost:3111";
const args = process.argv.slice(2);
const PORTE = args.includes("--porte");
const ESSAI = args.includes("--essai-rouge");
const CONTENU = path.resolve("../content");

/**
 * LA SONDE : les MARQUEURS de ligne, pas le texte des titres.
 *
 * Premier jet, et son défaut — gardé écrit parce qu'il a rendu cette porte
 * VERTE À TORT pendant une heure. La sonde cherchait les 36 premiers
 * caractères du premier titre `## `. Or le texte que le produit sérialise
 * n'est pas celui du fichier : la typographie française est passée dessus.
 * `Accroche : le réservoir` devient `Accroche\u202f: le réservoir` — espace
 * fine insécable, écrite en plus sous sa forme ÉCHAPPÉE (six caractères).
 * La sonde littérale ne trouvait rien dès qu'un titre portait une ponctuation
 * haute, et annonçait « 62 leçons, 0 occurrence ». Rendue robuste aux formes,
 * la même sonde en trouvait **53 sur 62**.
 *
 * Mais ces 53 n'étaient PAS le défaut visé : c'est `react-markdown` qui passe
 * un `node` (le sous-arbre hast) à chaque composant, et ce sous-arbre porte le
 * texte du titre. 63 props `node` pour 31 739 o — 0,8 % du document. Une autre
 * cause, un autre ordre de grandeur, et un correctif qui toucherait le rendu.
 *
 * D'où la sonde finale, qui ne peut confondre ni l'une ni l'autre : les
 * MARQUEURS DE LIGNE (`[[exercise:…]]`, `[[checkpoint:…]]`, `[[figure:…]]`,
 * `[[motion:…]]`, `[[derivation:…]]`). Ils sont de la syntaxe de SOURCE pure :
 * le découpeur les consomme, ils n'atteignent jamais le DOM, aucun `node`
 * hast ne les porte, et aucune transformation typographique ne les touche.
 * Les trouver dans le document servi, c'est avoir trouvé une copie du
 * `lesson.md` — et rien d'autre.
 *
 * Mesuré sur `suites-numeriques` : la source porte 2/5/7/1 marqueurs ; le
 * document d'AVANT le correctif en portait exactement le DOUBLE (4/10/14/2),
 * une copie par frontière client ; celui d'APRÈS, zéro.
 */
const MARQUEURS = /\[\[(?:exercise|checkpoint|figure|motion|derivation):/g;

/**
 * EXEMPTION, écrite à côté du motif : les COMMENTAIRES XML des figures.
 *
 * Deux leçons criaient pour 2 marqueurs — `[[motion:…]]`, avec une ellipse
 * littérale. Ce n'était pas une copie du `lesson.md` : c'est l'en-tête d'un
 * SVG (`paquet-qui-se-deforme.svg`) qui RACONTE l'historique de la figure
 * (« remplace l'ancien [[motion:…]] par une figure statique »). Le SVG est
 * inliné dans la page, donc le commentaire part avec — invisible pour
 * l'élève, jamais rendu, et parfaitement légitime.
 *
 * `typo-francaise` porte déjà la même exemption pour la même raison. On
 * retire donc les commentaires avant de compter, sous leurs DEUX formes :
 * telle quelle dans le DOM, et échappée (`\u003c!--`) dans la charge RSC.
 */
function sansCommentaires(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\\u003c!--[\s\S]*?--\\u003e/g, "");
}

function compteSource(md) {
  return (md.match(MARQUEURS) || []).length;
}

function lecons() {
  const out = [];
  for (const subj of fs.readdirSync(CONTENU).sort()) {
    const d = path.join(CONTENU, subj);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const slug of fs.readdirSync(d).sort()) {
      const md = path.join(d, slug, "lesson.md");
      if (fs.existsSync(md)) out.push({ route: `/notions/${subj}/${slug}`, md });
    }
  }
  return out;
}

if (ESSAI) {
  // Le détecteur, mis à l'épreuve. Le document MALADE porte un marqueur de
  // source ; le SAIN porte le même texte RENDU (le marqueur consommé, donc
  // absent). Un détecteur qui crierait sur les deux ne mesurerait rien.
  const sain = `<html><body><p>Un exercice suit.</p><section data-exercise="r-variation">…</section></body></html>`;
  const malade = `<html><body><p>Un exercice suit.</p><script>self.__next_f.push([1,"[[exercise:r-variation]]"])</script></body></html>`;
  const vuSain = (sain.match(MARQUEURS) || []).length;
  const vuMalade = (malade.match(MARQUEURS) || []).length;
  console.log("essai rouge — sonde : les marqueurs de ligne du lesson.md");
  console.log(`  document SAIN   (marqueur consommé) : ${vuSain} → ${vuSain === 0 ? "rien, correct" : "FAUX POSITIF"}`);
  console.log(`  document MALADE (source recopiée)   : ${vuMalade} → ${vuMalade > 0 ? "le détecteur crie" : "LE DÉTECTEUR EST AVEUGLE"}`);
  if (vuSain > 0 || vuMalade === 0) {
    console.error("\nESSAI ROUGE ÉCHOUÉ : le détecteur ne distingue pas les deux documents.");
    process.exit(1);
  }
  console.log("\nessai rouge OK : muet sur le rendu, il crie sur la source.");
  process.exit(0);
}

const routes = args.filter((a) => a.startsWith("/"));
const cibles = routes.length
  ? lecons().filter((l) => routes.includes(l.route))
  : lecons();

let fautives = 0;
let sansSonde = 0;
for (const { route, md } of cibles) {
  const attendus = compteSource(fs.readFileSync(md, "utf8"));
  if (attendus === 0) { sansSonde++; continue; }
  const res = await fetch(BASE + route);
  const html = sansCommentaires(await res.text());
  const n = (html.match(MARQUEURS) || []).length;
  if (n > 0) {
    fautives++;
    const copies = (n / attendus).toFixed(1);
    console.log(`  ✗ ${route} — ${n} marqueur(s) de source dans le document servi`);
    console.log(`      la source en porte ${attendus} : soit ~${copies} copie(s) du lesson.md dans la page`);
  }
}

const vues = cibles.length - sansSonde;
if (fautives === 0) {
  console.log(`source-en-double : ${vues} leçon(s) — aucun marqueur de source dans les documents servis ✓`);
  if (sansSonde) console.log(`  (${sansSonde} leçon(s) sans aucun marqueur — hors portée, dit à voix haute)`);
  process.exit(0);
}
console.error(`\nsource-en-double : ${fautives} leçon(s) renvoient leur markdown source dans la page.`);
console.error("Cause habituelle : un composant CLIENT reçoit `lessonMd` en prop (§11.175).");
process.exit(PORTE ? 1 : 0);
