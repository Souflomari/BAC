#!/usr/bin/env node
/**
 * dette-manipulable — ce que le produit DOIT encore à l'élève qui manipule.
 *
 * LA LIGNE DURE. `.claude/CLAUDE.md`, décision ouverte n°4 : « the hard line
 * that generated assets never substitute for a manipulable interactive where
 * the pedagogy requires manipulation ». Une spec qui prescrit
 * `[[embed:slug]]` demande une chose que l'élève TOUCHE : un curseur qu'il
 * pousse, une masse qu'il change, un rayon qu'il balaie. Une figure figée
 * montre le résultat de ce geste ; elle ne le rend pas.
 *
 * CE QUI A ÉTÉ TROUVÉ, ET QUI EST À L'HONNEUR DES AUTEURS. Chaque
 * substitution est ÉCRITE, en tête du SVG qui remplace le manipulable, et
 * elle nomme ce qui est perdu : « curseurs m,k → ici, DEUX masses fixes
 * tracées côte à côte » ; « curseur Δt → ici, DEUX tailles de pas fixes » ;
 * « au lieu d'un curseur de rayon continu, TROIS rayons fixes ». Rien n'a été
 * maquillé. La discipline d'état honnête (ADR 0025) a tenu au point exact de
 * la substitution.
 *
 * CE QUI MANQUAIT : un endroit où les COMPTER. Chaque dette vit dans l'en-tête
 * d'un fichier que seul celui qui l'ouvre lira. `media-manipulable` (§11.129)
 * compte les `.interactive.json` — il ne sait rien de ces substitutions-là.
 * Aucun document du dépôt ne les réunit. C'est la leçon de l'ADR 0031, une
 * fois de plus : une dette qu'aucun registre ne nomme est invisible, même
 * quand chaque ligne est honnête.
 *
 * DEUX SENS :
 *   1. FRANC — une prescription `[[embed:slug]]` dans une spec doit être soit
 *      LIVRÉE (un descripteur `media/slug.json` avec une `url`, ou une scène
 *      3D `"tool": "scene3d"` enregistrée dans `scenes.json`), soit
 *      SUBSTITUÉE PAR ÉCRIT (un `media/slug.svg` dont l'en-tête dit qu'il
 *      remplace l'embed). Ni l'un ni l'autre = une promesse pédagogique
 *      tombée sans un mot.
 *   2. CLIQUET — le nombre de substitutions ne monte pas en silence. Chaque
 *      nouvelle est un manipulable que le produit doit à l'élève.
 *
 * CE QU'IL NE VOIT PAS — à mesurer, pas à taire :
 *   - une pédagogie qui EXIGE la manipulation sans qu'aucune spec ne l'ait
 *     jamais écrite : l'instrument lit des prescriptions, pas des besoins ;
 *   - si le manipulable livré manipule VRAIMENT la bonne grandeur ;
 *   - les onze notions de SVT, qui n'ont ni spec de ce genre ni embed (§11.119).
 *
 *   node scripts/dette-manipulable.mjs           → le registre
 *   node scripts/dette-manipulable.mjs --porte   → les deux sens
 */
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");
//  Mesuré au 2026-09-20 : 6. Descendu à 5 le 2026-09-23 — orbites-gravite est
//  livré en scène 3D (ADR 0041). Descendu à 4 le 2026-09-24 — la cuve à ondes
//  (cuve-a-ondes-diffraction) est livrée en manipulable plan. Un cliquet qu'on
//  ne redescend pas quand une dette est payée laisse une place libre à la
//  suivante, en silence (ADR 0034). Monter ce nombre, c'est reconnaître une
//  dette de plus.
const CLIQUET_SUBSTITUTIONS = 4;

//  Les scènes 3D de première partie ENREGISTRÉES dans le code. Un descripteur
//  `"tool": "scene3d"` ne compte pour livré que si sa scène y figure : un
//  descripteur qui nommerait une scène inexistante promettrait sans livrer.
const SCENES = JSON.parse(
  fs.readFileSync(path.resolve(ICI, "..", "src", "lib", "scene3d", "scenes.json"), "utf-8")
);

const MARQUE = /\[\[embed:([a-z0-9-]+)\]\]/g;
//  Le « remplace » et le « [[embed: » sont souvent séparés par un retour à la
//  ligne dans l'en-tête du SVG — un motif sur une seule ligne en manquait un
//  sur trois. Le `[\s\S]` est là pour ça.
const REMPLACE = /remplace[\s\S]{0,80}?(?:\[\[embed:|l'embed|le marqueur)/i;

const notions = [];
for (const m of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const s of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const p = path.join(dm, s);
    if (fs.existsSync(path.join(p, "lesson.md"))) notions.push([`${m}/${s}`, p]);
  }
}

const prescrits = [];   // { notion, slug, ou }
const substitues = [];  // { notion, slug, perte }
const livres = [];      // { notion, slug }
let muettes = [];

for (const [cle, dir] of notions) {
  const media = path.join(dir, "media");
  const fichiersMedia = fs.existsSync(media) ? fs.readdirSync(media) : [];

  //  Livrés : un descripteur avec une url (iframe tierce), ou une scène 3D de
  //  première partie dont la scène est enregistrée dans le code.
  const desc = new Set();
  for (const f of fichiersMedia) {
    if (!f.endsWith(".json") || /\.(motion|stages|interactive)\.json$/.test(f)) continue;
    try {
      const j = JSON.parse(fs.readFileSync(path.join(media, f), "utf-8"));
      // scene3d (three.js) ou scene2d (la cuve à ondes) : le même registre
      const scene = (j?.tool === "scene3d" || j?.tool === "scene2d") && typeof j?.scene === "string" && Object.hasOwn(SCENES, j.scene);
      if (typeof j?.url === "string" || scene) {
        desc.add(f.slice(0, -5));
        livres.push({ notion: cle, slug: f.slice(0, -5), moteur: scene ? `scène ${j.tool === "scene2d" ? "2D" : "3D"} ${j.scene}` : "iframe" });
      }
    } catch { /* JSON cassé : l'affaire d'une autre porte */ }
  }

  //  Substitués par écrit : un SVG dont l'en-tête le dit.
  const subs = new Set();
  for (const f of fichiersMedia) {
    if (!f.endsWith(".svg")) continue;
    const tete = fs.readFileSync(path.join(media, f), "utf-8").slice(0, 2500);
    if (!REMPLACE.test(tete)) continue;
    const slug = f.slice(0, -4);
    subs.add(slug);
    //  Ce qui est PERDU, tel que l'auteur l'a écrit : la première phrase qui
    //  suit « remplace ». C'est cette phrase qui rend la dette lisible.
    const m = tete.match(/remplace[\s\S]{0,400}?(?:\.|\n\n)/i);
    substitues.push({ notion: cle, slug, perte: (m ? m[0] : "").replace(/\s+/g, " ").trim().slice(0, 150) });
  }

  //  Prescrits : dans une spec, jamais dans lesson.md.
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".md") || f === "lesson.md") continue;
    const t = fs.readFileSync(path.join(dir, f), "utf-8");
    MARQUE.lastIndex = 0;
    for (const m of t.matchAll(MARQUE)) {
      const slug = m[1];
      if (slug === "slug") continue; // le gabarit qui décrit la syntaxe
      if (prescrits.some((p) => p.notion === cle && p.slug === slug)) continue;
      prescrits.push({ notion: cle, slug, ou: f });
      if (!desc.has(slug) && !subs.has(slug)) muettes.push({ notion: cle, slug, ou: f });
    }
  }
}

if (PORTE) {
  let rouge = 0;
  if (muettes.length) {
    console.error("━━ PROMESSE DE MANIPULATION TOMBÉE SANS UN MOT ━━");
    for (const m of muettes) console.error(`   ${m.notion} — la spec (${m.ou}) prescrit [[embed:${m.slug}]] : ni livré, ni substitution écrite.`);
    console.error("\n   Une spec qui prescrit un embed demande une chose que l'élève TOUCHE.\n   Soit on la livre, soit on écrit ce qu'on met à la place et ce qui est\n   perdu — comme les six autres le font déjà.\n");
    rouge++;
  }
  if (substitues.length > CLIQUET_SUBSTITUTIONS) {
    console.error(`━━ CLIQUET « MANIPULABLE SUBSTITUÉ » : ${CLIQUET_SUBSTITUTIONS} → ${substitues.length} ━━`);
    for (const s of substitues) console.error(`   ${s.notion}/${s.slug}`);
    console.error("\n   Chaque substitution est une chose que l'élève ne peut plus toucher.\n   Elles sont honnêtement écrites une par une ; c'est leur NOMBRE qui\n   doit rester sous les yeux.\n");
    rouge++;
  }
  if (rouge) process.exit(1);
  console.log(`dette-manipulable : porte tenue — ${prescrits.length} prescriptions, ${livres.length} manipulables livrés, ${substitues.length} substitutions écrites, 0 promesse muette ✓`);
  process.exit(0);
}

console.log("\n━━ ce que le produit doit encore à l'élève qui manipule ━━\n");
console.log(`  prescriptions [[embed:]] dans les specs ... ${prescrits.length}`);
console.log(`  manipulables LIVRÉS ...................... ${livres.length}`);
for (const l of livres) console.log(`     ✓ ${l.notion}/${l.slug}  (${l.moteur})`);
console.log(`\n  SUBSTITUTIONS ÉCRITES (la dette) ......... ${substitues.length}`);
for (const s of substitues) {
  console.log(`     · ${s.notion}/${s.slug}`);
  if (s.perte) console.log(`         « ${s.perte} »`);
}
console.log(`\n  promesses tombées SANS UN MOT ............ ${muettes.length}`);
for (const m of muettes) console.log(`     ✗ ${m.notion}/${m.slug} (${m.ou})`);
console.log(`\n  PORTÉE — l'instrument lit des PRESCRIPTIONS, pas des besoins : une\n  pédagogie qui exige la manipulation sans qu'aucune spec ne l'ait écrite\n  lui est invisible, et les onze notions de SVT n'ont ni spec de ce genre\n  ni embed (§11.119). Il ne juge pas non plus si le manipulable livré\n  manipule la bonne grandeur.\n`);
