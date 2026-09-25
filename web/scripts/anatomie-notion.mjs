#!/usr/bin/env node
/**
 * anatomie-notion — de quoi une notion est FAITE, et lesquelles sont amputées.
 *
 * CE N'EST PAS UNE PORTE, et c'est délibéré. Rien ici n'est une régression à
 * empêcher : ce sont des faits de fabrication que le propriétaire doit voir
 * pour trancher. Armer un cliquet dessus produirait des rouges permanents,
 * c'est-à-dire du bruit qu'on apprend à ignorer (ADR 0034 §9).
 *
 * POURQUOI CE SCRIPT EXISTE (§11.120, 2026-09-20). Le dépôt parle partout de
 * « la notion » comme d'une chose unique. Elle ne l'est pas : trois artefacts
 * sont universels (leçon, items, points d'arrêt) et tous les autres sont
 * inégalement répartis. Personne n'avait dressé l'inventaire.
 *
 * LE CONSTAT LE PLUS NET — LA CHAÎNE DU MÉLANGE COGNITIF, INTERROMPUE.
 *
 *   `research-lead` extrait du Cadre de Référence les ratios d'habiletés par
 *   sous-domaine (`docs/cadre/curriculum/*.yaml` → `habiletes.*.part_examen`,
 *   sourcés p.19). `pedagogy-architect` a pour consigne écrite de les citer
 *   dans le spec « pour que l'écriture d'items en aval colle au mélange
 *   cognitif de l'examen et donne au critique de fidélité bac une CIBLE
 *   NUMÉRIQUE ». Le champ qui porterait cette information sur un item est
 *   `habilete`.
 *
 *   Il est renseigné sur 36 items du corpus — TOUS dans `pc/rlc-serie`, où il
 *   l'est à 36/36. Les 61 autres notions : zéro. La cible existe en amont, la
 *   consigne existe, et le corpus ne porte la donnée que pour la notion
 *   pilote. Le mélange cognitif du produit est donc INCALCULABLE sur 97,8 %
 *   des items — non pas mauvais, incalculable.
 *
 *   C'est le motif ADR 0031 encore une fois : le mécanisme fonctionne là où
 *   il a été posé, et sa PORTÉE est de 1 sur 62.
 *
 * Même forme pour `spec.md` (2/62) et `derivations.yaml` / `retenir.json`
 * (1/62) : des artefacts de la notion pilote jamais généralisés. Pour
 * `retenir.json` c'est sans conséquence — le module a un repli documenté et
 * l'état vide est assumé (§10.18). Pour `habilete`, il n'y a pas de repli.
 *
 *   node scripts/anatomie-notion.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(ICI, "..", "..");

const ARTEFACTS = [
  ["lesson.md", "la leçon"],
  ["items.yaml", "les items diagnostiques"],
  ["checkpoints.yaml", "les points d'arrêt"],
  ["exercises.yaml", "les exercices"],
  ["bank.yaml", "la banque de sujets"],
  ["media", "les figures"],
  ["derivations.yaml", "les dérivations"],
  ["retenir.json", "le sidecar « à retenir »"],
  ["spec.md", "le spec de conception"],
];

const notions = [];
for (const m of fs.readdirSync(path.join(REPO, "content"))) {
  const dm = path.join(REPO, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm)) {
    const d = path.join(dm, n);
    if (!fs.existsSync(path.join(d, "items.yaml"))) continue;
    const a = {};
    for (const [f] of ARTEFACTS) a[f] = fs.existsSync(path.join(d, f));
    let items = [];
    try { items = yaml.load(fs.readFileSync(path.join(d, "items.yaml"), "utf8"))?.items ?? []; } catch { /* signalé ailleurs */ }
    notions.push({
      cle: `${m}/${n}`, mat: m, a,
      nItems: items.length,
      nHabilete: items.filter((it) => it && it.habilete).length,
    });
  }
}

const mats = [...new Set(notions.map((n) => n.mat))].sort();
const parMat = (m) => notions.filter((n) => n.mat === m);

console.log(`\n━━ anatomie des notions — ${notions.length} notions ━━\n`);
console.log("  " + "artefact".padEnd(38) + mats.map((m) => m.padStart(8)).join("") + "     total");
for (const [f, quoi] of ARTEFACTS) {
  const cols = mats.map((m) => { const v = parMat(m); return `${v.filter((n) => n.a[f]).length}/${v.length}`.padStart(8); }).join("");
  const tot = notions.filter((n) => n.a[f]).length;
  console.log(`  ${(f + "  — " + quoi).padEnd(38).slice(0, 38)}${cols}     ${tot}/${notions.length}`);
}

// ── Le mélange cognitif ──
const totItems = notions.reduce((s, n) => s + n.nItems, 0);
const totHab = notions.reduce((s, n) => s + n.nHabilete, 0);
const porteurs = notions.filter((n) => n.nHabilete > 0);
console.log(`\n  LE MÉLANGE COGNITIF — champ \`habilete\` sur un item`);
console.log(`     ${totHab} items sur ${totItems} le portent (${(100 * totHab / totItems).toFixed(1)} %)`);
for (const n of porteurs) console.log(`       • ${n.cle.padEnd(40)} ${n.nHabilete}/${n.nItems}`);
console.log(`     ${notions.length - porteurs.length} notions sur ${notions.length} n'en portent AUCUN.`);
console.log(`     La cible existe pourtant en amont : docs/cadre/curriculum/*.yaml → habiletes.*.part_examen.`);
console.log(`     Le mélange cognitif du produit est donc incalculable — non pas mauvais, incalculable.`);

// ── Les notions amputées d'une source d'exercices ──
const nus = notions.filter((n) => !n.a["exercises.yaml"] && !n.a["bank.yaml"]);
console.log(`\n  AUCUNE SOURCE D'EXERCICES (ni exercises.yaml ni bank.yaml) : ${nus.length}/${notions.length}`);
for (const n of nus) console.log(`     • ${n.cle}`);

console.log();
