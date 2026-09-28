#!/usr/bin/env node
/**
 * dollars-apparies.mjs — chaque champ de texte du corpus a-t-il ses `$` appariés ?
 *
 * POURQUOI, et c'est une dépendance CACHÉE de quatre portes déjà armées.
 * `validate-content`, `eleve-ruse`, `accents-campagne` et `dom-truth` retirent
 * les maths avant de lire le texte, toutes avec le même motif :
 *
 *     .replace(/\$[^$]*\$/g, " ")
 *
 * Ce motif apparie les dollars DE GAUCHE À DROITE. Tant que chaque champ a un
 * nombre PAIR de `$`, il retire exactement les formules. Dès qu'un champ en a
 * un nombre impair, il avale tout le texte entre le dollar orphelin et le
 * suivant — et les quatre portes cessent silencieusement de lire ce passage.
 * Elles resteraient vertes : elles ne verraient plus le défaut, c'est tout.
 *
 * CE QUE ÇA A COÛTÉ AILLEURS (§11.158, §11.159) : le même appariement, appliqué
 * à des fichiers markdown ENTIERS, masquait un tiers des expressions du corpus
 * et 16 473 mots de prose. Dans les fichiers markdown, la parade est de ne
 * jamais apparier au-delà d'une ligne. Dans les champs YAML, la parade n'existe
 * pas : une formule peut légitimement s'y écrire sur deux lignes (un bloc plié
 * les rejoint), donc le motif DOIT pouvoir franchir un saut de ligne. La seule
 * garantie possible est donc en amont : que les champs soient appariés.
 *
 * MESURÉ (2026-09-20) : **73 611 champs de texte, 0 impair.** Les 1 326 lignes
 * du corpus qui portent un nombre impair de `$` sont des formules pliées dans un
 * bloc YAML — le fichier est impair, le CHAMP ne l'est pas, et c'est le champ
 * que les portes voient. La propriété tient donc aujourd'hui ; rien ne la
 * tenait.
 *
 *   node scripts/dollars-apparies.mjs           → le compte
 *   node scripts/dollars-apparies.mjs --porte   → cliquet à 0
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");

const fichiers = [];
(function marcher(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) marcher(p);
    else if (e.name.endsWith(".yaml")) fichiers.push(p);
  }
})(CONTENU);
fichiers.sort();

let champs = 0;
const impairs = [];
for (const f of fichiers) {
  let doc;
  try { doc = yaml.load(fs.readFileSync(f, "utf-8")); } catch { continue; }
  const visite = (v, chemin) => {
    if (typeof v === "string") {
      champs++;
      const n = (v.match(/\$/g) ?? []).length;
      if (n % 2) impairs.push({ f: path.relative(path.resolve(ICI, "..", ".."), f), chemin, extrait: v.replace(/\s+/g, " ").slice(0, 90) });
    } else if (Array.isArray(v)) v.forEach((x, i) => visite(x, `${chemin}[${i}]`));
    else if (v && typeof v === "object") for (const k of Object.keys(v)) visite(v[k], `${chemin}.${k}`);
  };
  visite(doc, path.basename(f, ".yaml"));
}

console.log(`\n━━ les « $ » des champs de texte sont-ils appariés ? ━━\n`);
console.log(`  fichiers YAML de contenu ......... ${fichiers.length}`);
console.log(`  champs de texte .................. ${champs}`);
console.log(`  champs à nombre IMPAIR de « $ » .. ${impairs.length}\n`);
for (const i of impairs.slice(0, 15)) {
  console.log(`  ✗ ${i.f}`);
  console.log(`      ${i.chemin} : « ${i.extrait} »`);
}
if (impairs.length > 15) console.log(`  … et ${impairs.length - 15} autres\n`);

if (PORTE) {
  if (impairs.length) {
    console.error(`━━ ROUGE : ${impairs.length} champ(s) ont un « $ » orphelin ━━`);
    console.error("   Quatre portes armées retirent les maths avec `/\\$[^$]*\\$/g` avant de lire");
    console.error("   le texte. Un dollar orphelin leur fait avaler tout le passage suivant —");
    console.error("   elles restent VERTES en ayant cessé de le lire. Réparer le champ, pas la porte.\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquet tenu — ${champs} champs, 0 dollar orphelin.\n`);
}
process.exit(0);
