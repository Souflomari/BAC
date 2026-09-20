#!/usr/bin/env node
/**
 * porte-engagement.mjs — la porte d'ENGAGEMENT produit-elle un signal ?
 *
 * CE QU'ELLE GARDE, ET POURQUOI C'EST LA VISION. L'anatomie de la notion place,
 * dans l'accroche, un point d'arrêt où l'élève **se prononce avant la
 * révélation**. C'est le seul endroit du parcours où il parie — et un pari dit
 * ce qu'il croit bien mieux qu'une réponse donnée après l'explication.
 *
 * Si les distracteurs de ce point d'arrêt ne portent pas de `misconception:`,
 * l'élève s'engage et **le produit ne retient rien**. La porte la plus
 * informative de la leçon devient une formalité.
 *
 * CE QU'AUCUN AUTRE INSTRUMENT NE DIT. `couverture-diagnostique` compte les
 * distracteurs muets sur TOUT le corpus : un point d'arrêt d'accroche muet s'y
 * noie dans les milliers d'autres choix. Cette porte-ci ne regarde QUE la porte
 * d'engagement, et elle est FRANCHE — parce qu'il y en a une par notion, soit
 * soixante-deux items dans tout le produit, et qu'aucun ne peut se permettre
 * d'être muet.
 *
 * LA PORTE D'ENGAGEMENT EST UNE CONVENTION D'IDENTIFIANT (`cp-r0-…`), PAS UNE
 * POSITION — et c'est une mesure, pas une supposition. Une première version de
 * ce contrôle cherchait le point d'arrêt placé DANS R0 et déclarait
 * `pc/reactions-acido-basiques` dépourvue. Faux : cette notion place
 * délibérément le sien au SOMMET, avant l'exercice de type bac, et son fichier
 * le dit en toutes lettres (« COMMIT gate », « placed IN R12, BEFORE r-bac »).
 * L'engagement est un RÔLE ; sa place dans la leçon est un choix d'auteur.
 *
 * MESURÉ À L'ARMEMENT (2026-09-20) : 62 notions sur 62, tous les distracteurs
 * de la porte d'engagement tagués. Une seule y manquait — `pc/rlc-serie`, dont
 * le choix « sans résistance, rien ne peut changer » portait un `null` explicite
 * mais SANS raison écrite, alors que la famille M1 le décrit mot pour mot
 * (« supprimer R stopperait tout »).
 *
 *   node scripts/porte-engagement.mjs           → le tableau
 *   node scripts/porte-engagement.mjs --porte   → la porte (sort 1 si un muet)
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");

const echecs = [];
let ok = 0, total = 0;

for (const matiere of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, matiere);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const slug of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const dir = path.join(dm, slug);
    if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
    total++;
    const cle = `${matiere}/${slug}`;

    let cps = [];
    try {
      const doc = yaml.load(fs.readFileSync(path.join(dir, "checkpoints.yaml"), "utf-8"));
      cps = Array.isArray(doc?.checkpoints) ? doc.checkpoints : [];
    } catch { /* pas de checkpoints.yaml : signalé ci-dessous */ }

    //  Le RÔLE d'abord (l'identifiant), la position ensuite — voir l'en-tête.
    const porte =
      cps.find((c) => typeof c?.id === "string" && /^cp-r0\b/.test(c.id)) ??
      cps.find((c) => typeof c?.lesson_placement === "string" && /_R0$/.test(c.lesson_placement)) ??
      cps.find((c) => c?.rung === "R0");

    if (!porte) { echecs.push(`${cle} — AUCUNE porte d'engagement : l'élève ne se prononce jamais avant la révélation.`); continue; }
    if (porte.type !== "mcq" || !Array.isArray(porte.choices)) { echecs.push(`${cle} — « ${porte.id} » n'est pas un QCM : rien à engager.`); continue; }

    const justes = porte.choices.map((c, i) => (c?.correct === true ? i : -1)).filter((i) => i >= 0);
    const distracteurs = porte.choices.filter((_, i) => !justes.includes(i));
    const muets = distracteurs.filter((c) => !c.misconception);

    if (muets.length) {
      echecs.push(
        `${cle} — « ${porte.id} » : ${muets.length}/${distracteurs.length} distracteur(s) sans \`misconception:\`. ` +
          `L'élève parie, le produit n'en retient rien. Premier muet : « ${String(muets[0].text).replace(/\s+/g, " ").slice(0, 70)} »`
      );
    } else ok++;
  }
}

if (PORTE) {
  if (echecs.length) {
    console.error("━━ porte d'engagement : ROMPUE ━━");
    for (const e of echecs) console.error(`   ${e}`);
    console.error(
      "\n   L'accroche est le seul endroit où l'élève se prononce AVANT de savoir.\n" +
        "   Un distracteur muet y coûte plus qu'ailleurs : c'est le pari le plus\n" +
        "   informatif du parcours, et il se perd.\n" +
        "   Soit on l'étiquette, soit on ÉCRIT pourquoi il reste nu.\n"
    );
    process.exit(1);
  }
  console.log(`porte-engagement : tenue — ${ok}/${total} notions, chaque porte d'engagement produit un signal complet ✓`);
  process.exit(0);
}

console.log(`\n━━ la porte d'engagement : l'élève parie, le produit retient-il ? ━━\n`);
console.log(`  notions dont tous les distracteurs d'engagement sont tagués : ${ok}/${total}`);
if (echecs.length) { console.log(); for (const e of echecs) console.log(`  ✗ ${e}`); }
console.log();
