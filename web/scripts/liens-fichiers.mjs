/**
 * liens-fichiers.mjs — un chemin cité dans le dépôt mène-t-il quelque part ?
 *
 * POURQUOI. Ce projet se pilote par ses documents : `.claude/CLAUDE.md`
 * envoie vers la vision, la vision vers les règles, les agents vers la bible
 * de design, un runbook de bascule vers un répertoire de migrations. Chacun
 * de ces renvois est une INSTRUCTION — et un renvoi qui ne mène nulle part
 * est une instruction qu'on croit avoir donnée.
 *
 * Trouvé en armant cet instrument, le 2026-09-05 :
 *   · `docs/Product/` ET `docs/product/` existaient tous les deux. VISION.md
 *     et DESIGN-BIBLE.md vivaient dans le premier ; 23 renvois — dont ceux de
 *     `.claude/CLAUDE.md`, du README, du HANDOFF et de NEUF agents — citaient
 *     le second. Sur ce conteneur Linux, ces 23 renvois ne menaient à RIEN ;
 *     sur la machine de l'owner (Windows, insensible à la casse — cf.
 *     `scripts/branch-test.ps1`) les deux répertoires entrent en collision.
 *     Chaque agent à qui l'on disait « lis la vision d'abord » lisait le vide.
 *   · le runbook de bascule PRODUCTION demandait de copier des migrations
 *     depuis `docs/drafts/migrations/`, répertoire disparu depuis que les
 *     brouillons ont été promus.
 *   · `docs/README-docs.md`, l'index de la documentation, pointait
 *     `docs/RULES.md` au lieu de `docs/Rules/RULES.md`.
 *
 * CE QU'IL MESURE. Tout chemin ressemblant à un fichier du dépôt, cité dans
 * un fichier suivi par git (markdown, YAML, TS, MJS, workflows). Un chemin
 * est RÉSOLU s'il existe depuis la racine du dépôt, depuis `web/` (la
 * convention d'exécution des scripts : on les lance depuis là), ou depuis le
 * répertoire du fichier qui le cite.
 *
 * DEUX ZONES, ET C'EST LA SEULE FAÇON HONNÊTE DE L'ARMER :
 *
 *   · la zone VIVANTE — les documents qu'on lit pour AGIR : l'orientation,
 *     les agents, les compétences, la vision, les règles, les specs, les
 *     runbooks, le code, le contenu, la CI. Porte FRANCHE : un renvoi mort y
 *     est un défaut, toujours.
 *   · la zone d'ARCHIVE — la piste des ADR, les registres d'audit, le
 *     CHANGELOG, les rapports de reprise, les documents d'ancrage déclarés
 *     périmés. Ces textes NOMMENT délibérément ce qui n'existe plus : un ADR
 *     qui acte la suppression d'un agent doit pouvoir écrire son chemin.
 *     Exiger qu'ils résolvent reviendrait à réécrire l'histoire. Ils sont
 *     comptés et affichés, jamais gardés.
 *
 * CE QU'IL NE DIT PAS : si le document CIBLE dit encore ce que le renvoi
 * prétend. Un chemin qui résout peut pointer un texte périmé — c'est le
 * travail des humains, et des documents de réconciliation.
 *
 *   node scripts/liens-fichiers.mjs           → le rapport
 *   node scripts/liens-fichiers.mjs --porte   → la porte (CI)
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");

const suivis = execFileSync("git", ["ls-files"], { cwd: REPO, encoding: "utf-8" })
  .split("\n")
  .filter(Boolean);
const existe = new Set(suivis);

const LISIBLES = /\.(md|mjs|js|ts|tsx|yml|yaml)$/;
const RACINES = "docs|web|content|backend|animations|scripts|\\.claude|\\.github";
// Un chemin plausible : une racine connue, puis des segments, puis une
// extension. Pas de capture des URL (le `//` de https:// est exclu par la
// garde arrière) ni des chemins de code (`@/lib/...`, `node:fs`).
const CHEMIN = new RegExp(`(?<![\\w/.@-])((?:${RACINES})/[A-Za-z0-9._\\-/]+\\.[A-Za-z0-9]{1,8})`, "g");

/**
 * L'EXCEPTION VIT DANS LE FICHIER, et elle NOMME son chemin.
 *
 * Même règle que `RECOUVREMENT ASSUMÉ:` pour la sonde de contraste : un
 * document vivant a parfois de bonnes raisons de nommer ce qui n'existe
 * plus — « ceci remplace l'ancien `scripts/machin.py` », « le diagramme X
 * est retiré, ne le ressuscitez pas ». Il l'écrit alors noir sur blanc :
 *
 *     CHEMIN DISPARU: scripts/gemini_media.py — remplacé par le MCP gemini-image
 *
 * La sonde n'exempte QUE le chemin nommé, et seulement dans ce fichier-là.
 * Un marqueur qui vaudrait pour tout un fichier ferait taire l'instrument
 * pour le renvoi cassé qu'on y introduira demain.
 */
const MARQUEUR = /CHEMIN DISPARU:\s*([A-Za-z0-9._\-/]+)/g;

/** La zone d'ARCHIVE — les textes qui nomment volontairement le disparu. */
const ARCHIVE = [
  // La piste des ADR est append-only : un ADR qui acte une suppression doit
  // pouvoir écrire le chemin de ce qu'il supprime.
  /^docs\/decisions\//,
  // Les registres d'audit datent un état ; ils citent les preuves de ce
  // jour-là (captures, mesures) dont beaucoup ne sont pas versionnées.
  /^docs\/audits\/(?!INSTRUMENTS\.md$)/,
  // Journaux et rapports de reprise : de l'histoire, pas des instructions.
  /^CHANGELOG\.md$/,
  /^docs\/reestablish-state/,
  // Déclarés périmés par `.claude/CLAUDE.md` lui-même, en attente de fusion.
  /^docs\/grounding\//,
];
const archive = (f) => ARCHIVE.some((r) => r.test(f));

function resout(p, f) {
  const candidats = [p, path.posix.join("web", p), path.posix.join(path.dirname(f), p)];
  return candidats.some((c) => existe.has(path.posix.normalize(c)) || fs.existsSync(path.join(REPO, c)));
}

const morts = { vivant: [], archive: [] };
let scannes = 0;

for (const f of suivis) {
  if (!LISIBLES.test(f)) continue;
  let s;
  try {
    s = fs.readFileSync(path.join(REPO, f), "utf-8");
  } catch {
    continue;
  }
  scannes++;
  const dispensés = new Set([...s.matchAll(MARQUEUR)].map((m) => m[1]));
  const vus = new Set();
  for (const m of s.matchAll(CHEMIN)) {
    const p = m[1].replace(/[.,;:)»]+$/, "");
    if (vus.has(p)) continue;
    vus.add(p);
    if (resout(p, f)) continue;
    if (dispensés.has(p)) continue;
    morts[archive(f) ? "archive" : "vivant"].push({ f, p });
  }
}

if (!PORTE) {
  console.log("");
  console.log("liens-fichiers — un chemin cité mène-t-il quelque part ?");
  console.log("═".repeat(96));
  console.log(`${scannes} fichiers lus\n`);
  console.log(`ZONE VIVANTE — ${morts.vivant.length} renvoi(s) mort(s)\n`);
  for (const { f, p } of morts.vivant) console.log(`  ✗ ${p}\n      cité dans ${f}`);
  if (!morts.vivant.length) console.log("  (aucun)");
  console.log(`\nZONE D'ARCHIVE — ${morts.archive.length} renvoi(s) qui ne résolvent pas, et c'est permis`);
  console.log("  (ADR, registres d'audit, CHANGELOG, rapports de reprise, ancrage périmé :");
  console.log("   ces textes nomment délibérément ce qui n'existe plus.)\n");
  const parFichier = new Map();
  for (const { f, p } of morts.archive) parFichier.set(f, (parFichier.get(f) ?? []).concat(p));
  for (const [f, ps] of [...parFichier].sort((a, b) => b[1].length - a[1].length))
    console.log(`  ${String(ps.length).padStart(3)}×  ${f}`);
  console.log("");
}

if (morts.vivant.length) {
  console.error("\n━━ porte liens-fichiers : ROMPUE ━━");
  for (const { f, p } of morts.vivant) console.error(`   ${f} cite ${p} — qui n'existe pas.`);
  console.error(
    "\n   Un renvoi mort dans un document VIVANT est une instruction qu'on croit\n" +
      "   avoir donnée. Corriger le chemin, ou déplacer le texte dans la zone\n" +
      "   d'archive s'il relate de l'histoire (la liste vit en tête de ce script)."
  );
  process.exit(1);
}

console.log(
  `liens-fichiers : porte tenue — ${scannes} fichiers, 0 renvoi mort en zone vivante, ` +
    `${morts.archive.length} en archive (permis) ✓`
);
