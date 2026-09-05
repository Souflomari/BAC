/**
 * resume-couverture.mjs — le corpus dit-il la vérité SUR LUI-MÊME ?
 *
 * Chaque items.yaml se termine par un bloc `coverage_summary` : un tableau
 * écrit à la main qui annonce combien d'items couvrent chaque misconception et
 * si le PLANCHER diagnostique est atteint. Ce bloc est lu par des humains — le
 * mainteneur qui reprend une notion, l'auteur qui décide où porter l'effort —
 * et par personne d'autre. Rien ne l'exécute. C'est exactement la forme que
 * HANDOFF §9.5 nomme et proscrit : « un commentaire honnête n'est pas une
 * porte ». Un tableau juste le jour où il est écrit devient faux le jour où un
 * item bouge, sans un bruit.
 *
 * Mesuré le 2026-09-05 : QUATRE notions déclaraient `floor_met: true` alors
 * que 15 misconceptions déclarées et taguées siégeaient sous le plancher —
 * pc/aspects-energetiques (7), pc/systemes-oscillants (4),
 * pc/reactions-acido-basiques (3), pc/chute-mouvements-plans (1). Deux de ces
 * quatre notes expliquaient même, en toutes lettres et de bonne foi, pourquoi
 * leur inventaire se limitait aux ids qu'elles comptaient — en oubliant les
 * autres ids que leurs propres items portaient.
 *
 * CE QUE CET INSTRUMENT JUGE, et lui seul : les affirmations du résumé qui ont
 * UN SEUL sens possible, quelle que soit la convention de comptage du fichier.
 * Le corpus écrit ses tableaux par-misconception de six façons différentes
 * (`per_misconception`, `per_misconception_primary`, `..._any_distractor`,
 * `by_misconception`, `..._distractor_count`…) : certains comptent les items,
 * d'autres les distracteurs, d'autres les seules attributions primaires. Les
 * comparer entre eux serait accuser de mensonge une notion qui déclare
 * honnêtement une autre convention. Ces tableaux-là restent donc de la prose,
 * relus par des humains. Deux champs, en revanche, n'ont qu'une lecture :
 *
 *   • `floor_met` — « le modèle apprenant peut évaluer toutes les
 *     misconceptions de cette notion ». La seule convention qui compte ici est
 *     celle de la CHAÎNE (lib/couverture-compte.mjs), puisque c'est elle qui
 *     construit learner-model-data.json. Vrai ou faux, sans échappatoire.
 *   • `total_items` — un nombre d'items. Il n'y a pas deux façons de compter
 *     des lignes.
 *
 * `gated_floor_met` est délibérément IGNORÉ : c'est une affirmation de portée
 * réduite (« les misconceptions sondées par les checkpoints atteignent le
 * plancher »), légitime et non mécanisable sans deviner la portée.
 *
 * Quatre portes :
 *   A. FRANCHE — `floor_met: true` avec au moins une misconception sous le
 *      plancher. Le résumé se surestime : c'est la dette qui a l'air payée.
 *   B. FRANCHE — `floor_met: false` alors qu'aucune n'est sous le plancher. Le
 *      résumé se sous-estime. Moins grave, mais c'est le cliquet qui force une
 *      campagne d'items réussie à VENIR RETOURNER le drapeau : sans lui, le
 *      corpus s'améliore et sa documentation reste au passé.
 *   C. FRANCHE — `total_items` en désaccord avec le nombre d'items du fichier.
 *   D. CLIQUET — le nombre de notions SANS résumé ne peut que baisser, et une
 *      notion qui en avait un ne peut pas le perdre.
 *
 * Trois modes :
 *   node scripts/resume-couverture.mjs           → le rapport
 *   node scripts/resume-couverture.mjs --porte   → les portes (CI)
 *   node scripts/resume-couverture.mjs --sceller → réécrit la ligne de base
 *   (--ids ajoute au rapport la liste nommée des misconceptions sous plancher)
 */
import fs from "node:fs";
import path from "node:path";
import { PLANCHER, listerNotions, mesurerNotion } from "./lib/couverture-compte.mjs";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const CONTENU = path.join(REPO, "content");
const BASE = path.join(ICI, "resume-couverture.base.json");

const ARGS = process.argv.slice(2);
const PORTE = ARGS.includes("--porte");
const SCELLER = ARGS.includes("--sceller");
const IDS = ARGS.includes("--ids");

// ── la mesure ──

const notions = [];
for (const n of listerNotions(CONTENU)) {
  const m = mesurerNotion(n);
  if (!m) continue;
  const resume = m.banc && typeof m.banc.coverage_summary === "object" ? m.banc.coverage_summary : null;
  const sous = [...m.parMc].filter(([, k]) => k < PLANCHER).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));
  notions.push({
    cle: m.cle,
    items: Array.isArray(m.banc.items) ? m.banc.items.length : 0,
    plancher: m.plancher,
    sous,
    resume,
    // Le résumé peut être absent, ou présent sans le champ : deux états
    // différents. `undefined` = non affirmé, donc rien à contredire.
    floorMet: resume && typeof resume.floor_met === "boolean" ? resume.floor_met : undefined,
    totalItems: resume && typeof resume.total_items === "number" ? resume.total_items : undefined,
  });
}

const sansResume = notions.filter((n) => !n.resume).map((n) => n.cle);

// ── mode --sceller ──

if (SCELLER) {
  const base = {
    _lisezMoi:
      "Ligne de base du cliquet resume-couverture (porte D). `sansResume` ne doit que RÉTRÉCIR : " +
      "une notion qui a un bloc coverage_summary ne peut plus le perdre, et le nombre total de " +
      "notions qui en manquent ne peut que baisser. Régénérer avec " +
      "`node scripts/resume-couverture.mjs --sceller` UNIQUEMENT après avoir ÉCRIT un résumé " +
      "manquant — jamais pour faire taire une suppression.",
    _scelleLe: new Date().toISOString().slice(0, 10),
    sansResume,
  };
  fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + "\n", "utf-8");
  console.log(
    `resume-couverture : ligne de base scellée — ${sansResume.length} notion(s) sans résumé → ${path.relative(REPO, BASE)}`
  );
  process.exit(0);
}

// ── le rapport ──

if (!PORTE) {
  console.log("");
  console.log("resume-couverture — ce que chaque items.yaml DIT de sa couverture, contre ce qu'elle EST");
  console.log("═".repeat(104));
  console.log(
    `${"notion".padEnd(44)} ${"items".padStart(6)} ${"dit".padStart(6)} ${"évaluables".padStart(11)} ` +
      `${"sous pl.".padStart(9)} ${"floor_met".padStart(10)}   verdict`
  );
  console.log("─".repeat(104));
  for (const n of notions) {
    const dit = n.totalItems === undefined ? "—" : String(n.totalItems);
    const fm = n.floorMet === undefined ? "—" : n.floorMet ? "true" : "false";
    let verdict = "";
    if (!n.resume) verdict = "aucun résumé";
    else if (n.floorMet === true && n.sous.length > 0) verdict = `SE SURESTIME (${n.sous.length} sous plancher)`;
    else if (n.floorMet === false && n.sous.length === 0) verdict = "se sous-estime (plancher atteint)";
    else if (n.totalItems !== undefined && n.totalItems !== n.items) verdict = "total_items faux";
    console.log(
      `${n.cle.padEnd(44)} ${String(n.items).padStart(6)} ${dit.padStart(6)} ${String(n.plancher).padStart(11)} ` +
        `${String(n.sous.length).padStart(9)} ${fm.padStart(10)}   ${verdict}`
    );
    if (IDS && n.sous.length > 0)
      for (const [id, k] of n.sous) console.log(`${" ".repeat(46)}↳ ${id} — ${k} item(s)`);
  }
  console.log("─".repeat(104));
  console.log(
    `${notions.length} notions · ${sansResume.length} sans résumé · ` +
      `${notions.filter((n) => n.floorMet === true).length} déclarent le plancher atteint\n`
  );
}

// ── les portes ──

const echecs = [];

for (const n of notions) {
  // A — la dette qui a l'air payée.
  if (n.floorMet === true && n.sous.length > 0)
    echecs.push(
      `${n.cle} — \`floor_met: true\` alors que ${n.sous.length} misconception(s) sont sous le plancher ` +
        `de ${PLANCHER} items : ${n.sous.map(([id, k]) => `${id} (${k})`).join(", ")}.`
    );
  // B — la dette qu'on continue de déclarer après l'avoir payée.
  if (n.floorMet === false && n.sous.length === 0)
    echecs.push(
      `${n.cle} — \`floor_met: false\` alors qu'AUCUNE misconception n'est sous le plancher. ` +
        `La couverture a été complétée sans que le résumé soit retourné : passer le drapeau à \`true\`.`
    );
  // C — un nombre d'items ne se compte que d'une façon.
  if (n.totalItems !== undefined && n.totalItems !== n.items)
    echecs.push(`${n.cle} — \`total_items: ${n.totalItems}\` alors que le fichier porte ${n.items} items.`);
}

// D — le cliquet.
const brut = (() => {
  try {
    return fs.readFileSync(BASE, "utf-8");
  } catch {
    return null;
  }
})();
if (!brut) {
  console.error(
    `resume-couverture : pas de ligne de base (${path.relative(REPO, BASE)}).\n` +
      `Sceller d'abord : node scripts/resume-couverture.mjs --sceller`
  );
  process.exit(PORTE ? 1 : 0);
}
const base = JSON.parse(brut);
const refSans = new Set(base.sansResume || []);
for (const cle of sansResume)
  if (!refSans.has(cle))
    echecs.push(`${cle} — avait un bloc \`coverage_summary\` et ne l'a plus. Un résumé ne se supprime pas.`);
if (sansResume.length > refSans.size)
  echecs.push(
    `notions sans résumé : ${refSans.size} → ${sansResume.length}. Le cliquet ne remonte pas.`
  );

if (echecs.length > 0) {
  console.error("\n━━ resume-couverture : ROMPU ━━");
  for (const e of echecs) console.error(`   ${e}`);
  console.error(
    "\n   Un résumé de couverture est lu par des humains et par rien d'autre : c'est\n" +
      "   un commentaire, et un commentaire faux coûte plus cher qu'un commentaire\n" +
      "   absent — il fait renoncer à un travail qui reste à faire. Deux remèdes,\n" +
      "   jamais un troisième : écrire les items qui manquent, ou dire la vérité\n" +
      "   sur ce qui manque.\n" +
      "   Détail : node scripts/resume-couverture.mjs --ids"
  );
  process.exit(1);
}

console.log(
  `resume-couverture : portes tenues — ${notions.length} notions, ${sansResume.length} sans résumé, ` +
    `0 affirmation contredite par le corpus ✓`
);
