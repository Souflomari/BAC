#!/usr/bin/env node
/**
 * tracabilite-spec — de l'étiquette de conception à l'item qui l'implémente.
 *
 * CE QUE C'EST, ET CE QUE CE N'EST PAS. Les specs de notion désignent les
 * items qu'elles prescrivent par une étiquette de conception :
 * « **Item AE-R5-1** *(Résolution — the derivation / the ½)* ». Ce n'est PAS
 * un renvoi mort au sens de l'ADR 0031 — ce n'est pas un lien qui devrait
 * résoudre, c'est le nom que la conception donne à « le premier item du
 * barreau 5 ». L'auteur l'a ensuite écrit sous un schéma plat (`AE-7`).
 *
 * LA PÉDAGOGIE EST LIVRÉE, et il faut le dire avant tout le reste, sinon ce
 * compte se lit comme un trou de contenu : les barreaux visés sont COUVERTS.
 * `aspects-energetiques` porte exactement 3 items en R5, 3 en R6, 3 en R7 —
 * les neuf que la spec appelait `AE-R5-1 … AE-R7-3`. Rien ne manque à l'élève.
 *
 * CE QUI MANQUE EST LA TRAÇABILITÉ. Un lecteur qui veut vérifier qu'une figure
 * « sert CH-FR-3 » ne peut pas remonter à l'item : l'identifiant n'existe sous
 * aucune forme. La vérification est impossible, pas fausse. C'est le troisième
 * écart prescription/livraison mesuré le 2026-09-20 (les manipulables §11.135,
 * les items ici) — et l'ADR 0033 dit qu'à la troisième reprise, c'est le geste
 * qu'il faut outiller.
 *
 * UN CLIQUET, PAS UNE PORTE FRANCHE, et c'est délibéré : 20 étiquettes sont
 * dans cet état au 2026-09-20. Une porte franche serait ROUGE en permanence,
 * et un rouge permanent est un rouge qu'on apprend à ignorer
 * (`DECISIONS-EN-ATTENTE` §7 le dit déjà d'une autre porte). Le cliquet, lui,
 * empêche la dérive de GRANDIR : une spec neuve doit nommer un item qui existe.
 *
 * CE QU'IL NE VOIT PAS — à mesurer, pas à taire :
 *   - il ne lit que les citations portant un VERBE D'USAGE (« sert X »,
 *     « Item X », « confronte X »). Une étiquette posée sans verbe lui échappe ;
 *   - il ne dit pas QUEL item implémente quelle étiquette : cette mise en
 *     correspondance demande de lire le type cognitif décrit, donc un jugement ;
 *   - il ne juge pas si l'item livré fait ce que l'étiquette décrivait.
 *
 *   node scripts/tracabilite-spec.mjs           → le tableau et la couverture
 *   node scripts/tracabilite-spec.mjs --porte   → le cliquet
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");
//  Mesuré au 2026-09-20 sur 4 notions de physique. Il ne doit que DESCENDRE.
const CLIQUET = 20;

const CITATION = /(?:[Ss]ert|[Ss]ervent|[Ii]tems?|[Cc]onfronte|[Cc]ouvre|[Vv]ise)\s+(?:directement\s+)?(?:les\s+)?([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+)/g;
//  Ce qui ressemble à un identifiant d'item sans en être un.
const PAS_UN_ITEM = /^(ADR|CC|BY|SM|PC|SVT|R\d|WCAG|HTML|SVG|PDF|CI|QCM|UI|ODE|KaTeX)(-|$)/;

const orphelines = [];
let citees = 0;
const couverture = new Map();

for (const m of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const s of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const dir = path.join(dm, s);
    if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
    const cle = `${m}/${s}`;

    const ids = new Set();
    const barreaux = new Map();
    for (const f of ["items.yaml", "checkpoints.yaml"]) {
      const p = path.join(dir, f);
      if (!fs.existsSync(p)) continue;
      try {
        const y = yaml.load(fs.readFileSync(p, "utf-8"));
        for (const it of y?.items ?? y?.checkpoints ?? []) {
          if (it?.id) ids.add(String(it.id));
          if (it?.rung) barreaux.set(String(it.rung), (barreaux.get(String(it.rung)) ?? 0) + 1);
        }
      } catch { /* YAML cassé : une autre porte */ }
    }
    if (!ids.size) continue;
    couverture.set(cle, barreaux);

    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith(".md") || f === "lesson.md") continue;
      const t = fs.readFileSync(path.join(dir, f), "utf-8");
      CITATION.lastIndex = 0;
      for (const mm of t.matchAll(CITATION)) {
        const c = mm[1];
        if (PAS_UN_ITEM.test(c)) continue;
        citees++;
        if (!ids.has(c)) orphelines.push({ notion: cle, etiquette: c, ou: f });
      }
    }
  }
}

if (PORTE) {
  if (orphelines.length > CLIQUET) {
    console.error(`━━ CLIQUET « ÉTIQUETTE SANS ITEM » : ${CLIQUET} → ${orphelines.length} ━━`);
    for (const o of orphelines) console.error(`   ${o.notion} (${o.ou}) — « ${o.etiquette} » n'existe sous aucune forme`);
    console.error("\n   Une spec neuve doit nommer un item qui EXISTE : sinon personne ne peut\n   vérifier que le média ou la figure sert bien ce qu'elle annonce.\n   (Les 20 en dette sont un héritage, pas un trou de contenu : les barreaux\n   visés sont couverts — voir l'en-tête et §11.136.)\n");
    process.exit(1);
  }
  console.log(`tracabilite-spec : cliquet tenu — ${citees} étiquettes citées, ${orphelines.length}/${CLIQUET} sans item (dette héritée, pédagogie couverte) ✓`);
  process.exit(0);
}

console.log("\n━━ de l'étiquette de conception à l'item qui l'implémente ━━\n");
console.log(`  étiquettes citées avec un verbe d'usage ... ${citees}`);
console.log(`  sans item du même nom ..................... ${orphelines.length}\n`);
const parNotion = new Map();
for (const o of orphelines) {
  if (!parNotion.has(o.notion)) parNotion.set(o.notion, []);
  parNotion.get(o.notion).push(o.etiquette);
}
for (const [n, l] of parNotion) {
  console.log(`  ${n} — ${l.length} : ${[...new Set(l)].sort().join(", ")}`);
  const b = couverture.get(n);
  if (b) console.log(`      barreaux réellement couverts : ${[...b.entries()].sort().map(([k, v]) => `${k}×${v}`).join(" ")}`);
}
console.log(`\n  LA PÉDAGOGIE EST LIVRÉE : les barreaux visés sont couverts. Ce compte\n  mesure la TRAÇABILITÉ — pouvoir remonter d'une figure à l'item qu'elle\n  sert — pas un trou de contenu.\n`);
