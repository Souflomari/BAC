#!/usr/bin/env node
/**
 * rampe-bac.mjs — la rampe atteint-elle une VRAIE question de bac ?
 *
 * CE QU'ELLE GARDE. VISION, « ce qu'est une notion » : la rampe va « from easy,
 * fully-scaffolded problems, through medium, through hard, **to actual past-bac
 * questions, to fresh variations on those bac questions so nothing can be
 * memorized** ». Les deux derniers barreaux sont la promesse entière : sans
 * eux, l'élève a appris la leçon et n'a jamais rencontré l'épreuve.
 *
 * TROIS ÉTATS, et ils ne veulent pas dire la même chose :
 *   SOURCÉE   — un exercice structuré au barreau « bac », `sourcing.status:
 *               sourced` : l'élève affronte un vrai sujet tombé.
 *   NON SOURCÉE — l'exercice existe au sommet mais son sujet n'a pas été
 *               retrouvé. Template v2 §C rend cette case incochable par un
 *               agent : c'est une porte de propriétaire, pas une dette de code.
 *   SANS FICHIER — aucun `exercises.yaml`. La leçon peut porter un chapitre
 *               « Pour t'entraîner » en PROSE (c'est le cas des treize), avec
 *               exercice travaillé et raisonnement à voix haute : la pédagogie
 *               y est. Ce qui manque est l'exercice ATTAQUABLE et le sujet
 *               RÉEL — l'élève lit une correction au lieu de tenter une épreuve.
 *
 * MESURÉ À L'ARMEMENT (2026-09-20) : 47/62 sourcées, 2 non sourcées
 * (`pc/rlc-serie`, déjà porte ouverte §0 du HANDOFF, et
 * `pc/atome-mecanique-newton`, qui ne l'était pas), 13 sans fichier — **dont
 * les ONZE notions de SVT**, soit la matière entière, plus `philo/l-histoire`
 * et `philo/le-bonheur` (2 sur 12, donc une irrégularité et non un choix de
 * genre : les dix autres notions de philo en ont).
 *
 *   node scripts/rampe-bac.mjs           → le tableau
 *   node scripts/rampe-bac.mjs --porte   → le cliquet (une rampe ne redescend pas)
 *   node scripts/rampe-bac.mjs --sceller → refait la référence
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const BASE = path.join(ICI, "rampe-bac.base.json");
const PORTE = process.argv.includes("--porte");
const SCELLER = process.argv.includes("--sceller");

const etat = {}; // notion → "sourcee" | "non-sourcee" | "sans-fichier" | "sans-sommet"

for (const matiere of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, matiere);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const slug of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const dir = path.join(dm, slug);
    if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
    const cle = `${matiere}/${slug}`;
    const f = path.join(dir, "exercises.yaml");

    if (!fs.existsSync(f)) { etat[cle] = "sans-fichier"; continue; }
    let doc;
    try { doc = yaml.load(fs.readFileSync(f, "utf-8")); } catch { etat[cle] = "sans-sommet"; continue; }
    const ex = Array.isArray(doc?.exercises) ? doc.exercises : [];
    //  Le sommet se reconnaît au barreau, pas à la position : une notion peut
    //  poser sa variation fraîche APRÈS le sujet réel.
    const bac = ex.filter((e) => /bac/i.test(String(e?.id ?? "")) || /bac/i.test(String(e?.rung ?? "")));
    if (!bac.length) { etat[cle] = "sans-sommet"; continue; }
    etat[cle] = bac.some((e) => String(e?.sourcing?.status ?? "") === "sourced") ? "sourcee" : "non-sourcee";
  }
}

const compte = (v) => Object.values(etat).filter((x) => x === v).length;
const total = Object.keys(etat).length;

if (SCELLER) {
  fs.writeFileSync(BASE, JSON.stringify({ scelle_le: new Date().toISOString().slice(0, 10), etat }, null, 2) + "\n");
  console.log(`rampe-bac : référence scellée — ${compte("sourcee")}/${total} rampes atteignent un sujet réel`);
  process.exit(0);
}

if (PORTE) {
  if (!fs.existsSync(BASE)) { console.error("rampe-bac : pas de référence. Lance --sceller."); process.exit(1); }
  const ref = JSON.parse(fs.readFileSync(BASE, "utf-8")).etat;
  //  UN SEUL SENS suffit ici, et c'est délibéré : une rampe qui atteignait un
  //  sujet réel ne peut plus cesser de l'atteindre. Le sens inverse — en
  //  ajouter — est le travail qu'on souhaite, pas une régression à empêcher.
  const casses = [];
  for (const [cle, v] of Object.entries(etat)) {
    if (ref[cle] === "sourcee" && v !== "sourcee") {
      casses.push(`${cle} — la rampe atteignait un sujet de bac SOURCÉ, elle est retombée à « ${v} ».`);
    }
  }
  if (casses.length) {
    console.error("━━ cliquet rampe-bac : ROMPU ━━");
    for (const c of casses) console.error(`   ${c}`);
    console.error("\n   Les deux derniers barreaux sont la promesse entière de la rampe :\n   sans eux, l'élève a appris la leçon et n'a jamais rencontré l'épreuve.\n");
    process.exit(1);
  }
  console.log(`rampe-bac : cliquet tenu — ${compte("sourcee")}/${total} rampes atteignent un sujet de bac sourcé ✓`);
  process.exit(0);
}

console.log("\n━━ la rampe atteint-elle une vraie question de bac ? ━━\n");
console.log(`  sommet SOURCÉ (un vrai sujet tombé) ........ ${compte("sourcee")}/${total}`);
console.log(`  sommet présent, sujet NON retrouvé ......... ${compte("non-sourcee")}`);
console.log(`  aucun exercises.yaml ....................... ${compte("sans-fichier")}`);
console.log(`  exercices présents, aucun sommet « bac » ... ${compte("sans-sommet")}\n`);
const parMatiere = {};
for (const [cle, v] of Object.entries(etat)) {
  const m = cle.split("/")[0];
  (parMatiere[m] ??= { t: 0, s: 0 }).t++;
  if (v === "sourcee") parMatiere[m].s++;
}
for (const [m, v] of Object.entries(parMatiere)) console.log(`  ${m.padEnd(8)} ${v.s}/${v.t}`);
console.log();
for (const [cle, v] of Object.entries(etat)) if (v !== "sourcee") console.log(`  ✗ ${cle.padEnd(44)} ${v}`);
console.log();
