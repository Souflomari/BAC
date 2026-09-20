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
 * LE DERNIER BARREAU, MESURÉ DEPUIS §11.124. L'en-tête ci-dessus cite la
 * promesse entière depuis l'armement — « to actual past-bac questions, TO FRESH
 * VARIATIONS on those bac questions so nothing can be memorized » — et ne
 * mesurait que sa première moitié. La variation fraîche est pourtant encodée
 * dans le corpus : un exercice dont l'identifiant la nomme (`r-variation`),
 * `sourcing.status: not-applicable` (elle n'est PAS un sujet réel, et le
 * prétendre serait un mensonge), et une note qui dit ce qui a été varié et
 * pourquoi.
 *
 * DEUX SENS DE PLUS :
 *   • LA VARIATION MANQUANTE (franche) — une notion dont le sommet est SOURCÉ
 *     doit porter une variation. Mesuré : 47 sur 47. La promesse tient partout
 *     où le sommet existe, et 49 notions en portent une — deux l'ont même sans
 *     sommet sourcé encore (`pc/rlc-serie`, `pc/atome-mecanique-newton`).
 *   • LA VARIATION MUETTE (cliquet, 2) — une variation sans note de conception
 *     est une affirmation sans raison : rien ne distingue une vraie variation
 *     anti-mémorisation d'un exercice posé là. 47 des 49 portent une note
 *     substantielle qui dit ce qui a été varié ; `philo/la-verite` et
 *     `philo/le-devoir` n'en portent aucune.
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
//  Cliquet du second sens : mesuré au 2026-09-20 (philo/la-verite, philo/le-devoir).
const CLIQUET_MUETTES = 2;

const etat = {}; // notion → "sourcee" | "non-sourcee" | "sans-fichier" | "sans-sommet"
const variations = {}; // notion → [{ id, note }]

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
    //  LE DERNIER BARREAU. L'identifiant nomme la variation — c'est la
    //  convention du corpus (49 sur 49), et elle est plus sûre qu'un motif sur
    //  la note : une note de sommet peut CITER le mot « variation » sans en
    //  être une (mesuré sur `philo/la-verite`).
    const varia = ex.filter((e) => /variation|variante/i.test(String(e?.id ?? "")));
    variations[cle] = varia.map((e) => ({ id: e.id, note: String(e?.sourcing?.note ?? "").trim() }));
  }
}

const compte = (v) => Object.values(etat).filter((x) => x === v).length;
const total = Object.keys(etat).length;

// ── LE DERNIER BARREAU : la variation fraîche ──
//  Calculé ICI, et non plus bas : le bloc `--porte` sort (`process.exit`) avant
//  d'atteindre la fin du fichier. Placés après lui, ces deux sens ne tournaient
//  JAMAIS sous `--porte` — la porte était verte parce qu'elle ne regardait pas.
//  C'est l'essai rouge §11.124a qui l'a dit, en revenant « AVEUGLE » : un essai
//  rouge ne sert à rien s'il ne peut pas contredire celui qui l'écrit.
const avecVar = Object.keys(variations).filter((c) => (variations[c] ?? []).length > 0);
const sourceesSansVar = Object.keys(etat).filter((c) => etat[c] === "sourcee" && !(variations[c] ?? []).length);
const muettes = [];
for (const [c, vs] of Object.entries(variations)) for (const v of vs) if (!v.note || v.note === "null") muettes.push(`${c}:${v.id}`);

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
  let rouge = 0;
  if (casses.length) {
    console.error("━━ cliquet rampe-bac : ROMPU ━━");
    for (const c of casses) console.error(`   ${c}`);
    console.error("\n   Les deux derniers barreaux sont la promesse entière de la rampe :\n   sans eux, l'élève a appris la leçon et n'a jamais rencontré l'épreuve.\n");
    rouge++;
  }
  //  SENS 2 (franche) — le sommet sourcé doit être suivi d'une variation.
  if (sourceesSansVar.length) {
    console.error("━━ VARIATION MANQUANTE ━━");
    for (const c of sourceesSansVar) console.error(`   ${c} — sommet sourcé, aucune variation fraîche derrière.`);
    console.error("\n   La notion mène l'élève jusqu'à un vrai sujet tombé, puis s'arrête là.\n   La VISION demande le barreau d'après — « so nothing can be memorized ».\n   Sans lui, le sommet est mémorisable.\n");
    rouge++;
  }
  //  SENS 3 (cliquet) — une variation sans note est une affirmation sans raison.
  if (muettes.length > CLIQUET_MUETTES) {
    console.error(`━━ CLIQUET « VARIATION MUETTE » : ${CLIQUET_MUETTES} → ${muettes.length} ━━`);
    for (const c of muettes) console.error(`   ${c}`);
    console.error("\n   Rien ne distingue une vraie variation anti-mémorisation d'un exercice\n   posé là. Les autres disent ce qui a été varié, et pourquoi.\n");
    rouge++;
  }
  if (rouge) process.exit(1);
  console.log(`rampe-bac : cliquet tenu — ${compte("sourcee")}/${total} rampes atteignent un sujet de bac sourcé ✓`);
  console.log(`rampe-bac : dernier barreau — ${avecVar.length}/${total} notions portent une variation fraîche, 0 sommet sourcé sans elle ✓`);
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

console.log("━━ le dernier barreau : la variation fraîche (anti-mémorisation) ━━\n");
console.log(`  notions portant une variation .............. ${avecVar.length}/${total}`);
console.log(`  sommet sourcé SANS variation .............. ${sourceesSansVar.length}`);
for (const c of sourceesSansVar) console.log(`     ✗ ${c}`);
console.log(`  variations SANS note de conception ........ ${muettes.length}`);
for (const c of muettes) console.log(`     ✗ ${c}`);
console.log();
