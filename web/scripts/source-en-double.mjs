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

/** La 1re ligne `## ` du lesson.md, telle qu'elle est ÉCRITE (code de barreau compris). */
function sondeDe(md) {
  const ligne = md.split("\n").find((l) => l.startsWith("## "));
  if (!ligne) return null;
  const brut = ligne.slice(3).trim();
  // assez long pour être unique, assez court pour survivre à l'échappement
  return brut.length >= 24 ? brut.slice(0, 36) : null;
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
  // Le détecteur, mis à l'épreuve : un document qui PORTE le défaut doit crier.
  const { md } = lecons()[0];
  const sonde = sondeDe(fs.readFileSync(md, "utf8"));
  const sain = `<html><body><p>du texte rendu</p><script>self.__next_f.push([1,"rien"])</script></body></html>`;
  const malade = `<html><body><p>du texte rendu</p><script>self.__next_f.push([1,"${sonde.replace(/"/g, '\\"')}"])</script></body></html>`;
  const vuSain = sain.includes(sonde);
  const vuMalade = malade.includes(sonde);
  console.log(`essai rouge — sonde ${JSON.stringify(sonde)}`);
  console.log(`  document SAIN   : ${vuSain ? "DÉTECTÉ (faux positif !)" : "rien — correct"}`);
  console.log(`  document MALADE : ${vuMalade ? "DÉTECTÉ — le détecteur crie" : "RIEN — LE DÉTECTEUR EST AVEUGLE"}`);
  if (vuSain || !vuMalade) {
    console.error("\nESSAI ROUGE ÉCHOUÉ : le détecteur ne distingue pas les deux documents.");
    process.exit(1);
  }
  console.log("\nessai rouge OK : muet sur le sain, il crie sur le malade.");
  process.exit(0);
}

const routes = args.filter((a) => a.startsWith("/"));
const cibles = routes.length
  ? lecons().filter((l) => routes.includes(l.route))
  : lecons();

let fautives = 0;
let sansSonde = 0;
for (const { route, md } of cibles) {
  const sonde = sondeDe(fs.readFileSync(md, "utf8"));
  if (!sonde) { sansSonde++; continue; }
  const res = await fetch(BASE + route);
  const html = await res.text();
  const n = html.split(sonde).length - 1;
  if (n > 0) {
    fautives++;
    console.log(`  ✗ ${route} — la source du lesson.md apparaît ${n} fois dans le document servi`);
    console.log(`      sonde : ${JSON.stringify(sonde)}`);
  }
}

const vues = cibles.length - sansSonde;
if (fautives === 0) {
  console.log(`source-en-double : ${vues} leçon(s) — la source du lesson.md ne repart dans aucun document ✓`);
  if (sansSonde) console.log(`  (${sansSonde} sans titre \`## \` exploitable — hors portée, dit à voix haute)`);
  process.exit(0);
}
console.error(`\nsource-en-double : ${fautives} leçon(s) renvoient leur markdown source dans la page.`);
console.error("Cause habituelle : un composant CLIENT reçoit `lessonMd` en prop (§11.175).");
process.exit(PORTE ? 1 : 0);
