#!/usr/bin/env node
/**
 * tracabilite-spec — les renvois de STRUCTURE qui ne résolvent pas.
 *
 * Deux paires, même espèce : une référence qu'on ne peut pas suivre.
 *   SENS 1 — l'étiquette de conception d'une spec et l'item qui l'implémente.
 *   SENS 2 — le barreau qu'un item vise et le chapitre qui devrait le porter.
 *   SENS 3 — l'INVERSE exact : le chapitre qui existe et qu'aucun item ne vise.
 *             Un barreau que l'élève lit et ne peut pas s'entraîner dessus.
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
//  SENS 2 — mesuré au 2026-09-20, et c'est exactement le compte du §11.69,
//  retrouvé notion par notion et barreau par barreau : 7 + 4 + 5. La classe
//  n'a pas bougé depuis qu'elle a été consignée. C'est une PORTE D'OWNER
//  ouverte (rattachement éditorial), donc un cliquet et non une porte franche.
const CLIQUET_BARREAUX = 16;
//  SENS 3 — mesuré au 2026-09-20 : 13 barreaux portent un chapitre et aucun
//  item ni point d'arrêt. **Douze des treize sont en SVT**, et ils touchent
//  les 11 notions sur 11 ; maths 0/14, pc 0/25, philo 1/12. Le barreau manquant
//  est presque toujours le DERNIER (R6 à R9) — le sommet, celui où l'élève
//  devrait affronter l'épreuve. C'est le CINQUIÈME axe indépendant qui isole
//  le même sous-ensemble (§11.114 le sommet sourcé 0/11, §11.119 la marche
//  d'entrée 0/102, les leçons muettes 11/13, §11.129 la figure manipulable
//  0/11). Cliquet, parce que c'est le standard de fabrication SVT qui est en
//  cause et que cela se tranche au niveau du propriétaire.
const CLIQUET_SANS_ITEM = 13;

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

//  ── SENS 3 : le chapitre existe, aucun item ne le vise (§11.141) ──────────
//  Mesuré dans la MÊME boucle que le sens 2, donc sur exactement le même
//  relevé de titres : deux directions d'une seule relation, jamais deux
//  lectures qui pourraient diverger.
const chapitresSansItem = [];

//  ── SENS 2 : le barreau visé par un item n'a pas de chapitre (§11.69) ──────
//  L'accrochage au chapitre se fait par le code : un item qui vise un code sans
//  titre ne peut être ni présenté au bon endroit, ni compté dans un
//  dénominateur honnête. `validate-content` le signale déjà — mais en
//  AVERTISSEMENT, et une fois par barreau, pas par item. §11.69 a été trouvé en
//  triant ces avertissements « que personne ne relit parce qu'ils ne bloquent
//  rien ». Le cliquet compte les ITEMS, et il bloque.
//
//  LES TITRES SE LISENT À TOUT NIVEAU. Une notion range ses barreaux en `###`
//  sous un `##` « Décortiquer » : un motif qui n'accepte que `##` déclare 23
//  faux orphelins sur cette seule notion — mesuré, en écrivant ce sens.
const barreauxOrphelins = [];
for (const m of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const s of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const dir = path.join(dm, s);
    const f = path.join(dir, "lesson.md");
    if (!fs.existsSync(f)) continue;
    const md = fs.readFileSync(f, "utf-8");
    const titres = new Set([...md.matchAll(/^#{1,6}[ \t]*(R(?:\d+|-[a-z]+))\b/gm)].map((x) => x[1]));
    if (!titres.size) continue;
    const vises = new Set();
    for (const fn of ["items.yaml", "checkpoints.yaml"]) {
      const p = path.join(dir, fn);
      if (!fs.existsSync(p)) continue;
      let y;
      try { y = yaml.load(fs.readFileSync(p, "utf-8")); } catch { continue; }
      for (const it of y?.items ?? y?.checkpoints ?? []) {
        const r = String(it?.rung ?? "").trim();
        if (r) vises.add(r);
        if (r && /^R(\d+|-[a-z]+)$/.test(r) && !titres.has(r)) {
          barreauxOrphelins.push({ notion: `${m}/${s}`, id: it?.id, rung: r });
        }
      }
    }
    //  Le sens 3, sur le même relevé.
    for (const t of [...titres].filter((x) => /^R\d+$/.test(x)).sort((a, b) => +a.slice(1) - +b.slice(1))) {
      if (!vises.has(t)) chapitresSansItem.push({ notion: `${m}/${s}`, rung: t });
    }
  }
}

if (PORTE) {
  if (barreauxOrphelins.length > CLIQUET_BARREAUX) {
    console.error(`━━ CLIQUET « BARREAU SANS CHAPITRE » : ${CLIQUET_BARREAUX} → ${barreauxOrphelins.length} ━━`);
    for (const o of barreauxOrphelins) console.error(`   ${o.notion}:${o.id} vise ${o.rung}, que lesson.md ne porte à aucun niveau de titre`);
    console.error("\n   Un item qui vise un code sans titre ne peut être ni présenté au bon\n   endroit, ni compté dans un dénominateur honnête (§11.69).\n");
    process.exit(1);
  }
  if (chapitresSansItem.length > CLIQUET_SANS_ITEM) {
    console.error(`━━ CLIQUET « BARREAU QU'ON NE PEUT PAS S'ENTRAÎNER » : ${CLIQUET_SANS_ITEM} → ${chapitresSansItem.length} ━━`);
    for (const c of chapitresSansItem) console.error(`   ${c.notion} — le chapitre ${c.rung} existe, aucun item ni point d'arrêt ne le vise`);
    console.error("\n   L'élève lit le barreau et ne peut rien y tenter. La VISION promet une\n   rampe qu'on GRAVIT, pas une qu'on lit.\n");
    process.exit(1);
  }
  if (orphelines.length > CLIQUET) {
    console.error(`━━ CLIQUET « ÉTIQUETTE SANS ITEM » : ${CLIQUET} → ${orphelines.length} ━━`);
    for (const o of orphelines) console.error(`   ${o.notion} (${o.ou}) — « ${o.etiquette} » n'existe sous aucune forme`);
    console.error("\n   Une spec neuve doit nommer un item qui EXISTE : sinon personne ne peut\n   vérifier que le média ou la figure sert bien ce qu'elle annonce.\n   (Les 20 en dette sont un héritage, pas un trou de contenu : les barreaux\n   visés sont couverts — voir l'en-tête et §11.136.)\n");
    process.exit(1);
  }
  console.log(`tracabilite-spec : cliquets tenus — ${orphelines.length}/${CLIQUET} étiquettes sans item, ${barreauxOrphelins.length}/${CLIQUET_BARREAUX} items sans chapitre, ${chapitresSansItem.length}/${CLIQUET_SANS_ITEM} chapitres sans item ✓`);
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
console.log(`\n  ── SENS 2 : items visant un barreau sans chapitre ── ${barreauxOrphelins.length}`);
for (const o of barreauxOrphelins) console.log(`     ✗ ${o.notion}:${o.id} → ${o.rung}`);
console.log(`\n  ── SENS 3 : chapitres qu'aucun item ne vise ── ${chapitresSansItem.length}`);
for (const c of chapitresSansItem) console.log(`     ✗ ${c.notion} — ${c.rung}`);
console.log(`\n  SUR LE SENS 1 SEULEMENT : la pédagogie est livrée. Les barreaux que les\n  étiquettes visaient sont couverts — ce compte-là mesure la TRAÇABILITÉ,\n  pouvoir remonter d'une figure à l'item qu'elle sert, pas un trou de contenu.\n  LE SENS 3 EST D'UNE AUTRE NATURE : un chapitre qu'aucun item ne vise est un\n  barreau que l'élève lit sans pouvoir rien y tenter. Ne pas lire la phrase\n  ci-dessus comme si elle couvrait les trois sens.\n`);
