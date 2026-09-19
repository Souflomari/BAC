#!/usr/bin/env node
/**
 * batterie-locale — ce qu'il faut avoir fait passer AVANT de pousser.
 *
 * POURQUOI CE SCRIPT EXISTE (§11.81, 2026-09-19). Pendant une semaine sans
 * CI, j'ai écrit « batterie locale » dans chaque message de commit en ne
 * lançant que quatre contrôles. `gates.yml` en lançait douze. Cinq des huit
 * portes sans navigateur étaient ROUGES, et trois de ces rouges étaient mes
 * propres régressions. Personne ne pouvait le voir : la CI était morte, et
 * ma batterie ne la reflétait pas.
 *
 * LA VRAIE LEÇON n'est pas « lancer ces huit-là ». C'est que la liste DÉRIVE.
 * Ce script se compare donc à `.github/workflows/gates.yml` et signale toute
 * commande `node scripts/…` que la CI lance et que lui ignore. Il ne peut pas
 * prendre du retard en silence — c'est tout l'intérêt.
 *
 * Ce qu'il NE fait pas : les étapes qui demandent un navigateur ou un build
 * (dom-truth, figures, presse-papier, impression, zoom, formules, ancres,
 * données). Elles sont déclarées ci-dessous comme volontairement hors champ,
 * pour que leur absence soit un CHOIX ÉCRIT et non un oubli.
 *
 *   node scripts/batterie-locale.mjs
 */
import { execFileSync } from "node:child_process";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const WEB = join(ICI, "..");
const REPO = join(WEB, "..");

// Les contrôles sans navigateur, dans l'ordre où gates.yml les lance.
const ETAPES = [
  { nom: "tests unitaires", cmd: null },                      // traité à part
  { nom: "liens-fichiers", cmd: ["scripts/liens-fichiers.mjs", "--porte"] },
  { nom: "validate-content", cmd: null },                     // traité à part
  { nom: "lectures-graphiques", cmd: ["scripts/lectures-graphiques.mjs", "--check"] },
  { nom: "token-gate", cmd: ["scripts/token-gate.mjs"] },
  { nom: "contrast-gate", cmd: ["scripts/contrast-gate.mjs"] },
  { nom: "indice-longueur", cmd: ["scripts/indice-longueur.mjs", "--porte"] },
  { nom: "indice-absolu", cmd: ["scripts/indice-absolu.mjs", "--porte"] },
  { nom: "couverture-diagnostique", cmd: ["scripts/couverture-diagnostique.mjs", "--porte"] },
  { nom: "resume-couverture", cmd: ["scripts/resume-couverture.mjs", "--porte"] },
  // Énumérateur de routes que l'étape dom-truth consomme : sans navigateur,
  // et le lancer attrape un plantage de l'énumérateur avant la CI.
  { nom: "routes-examens", cmd: ["scripts/routes-examens.mjs"] },
];

// Hors champ ASSUMÉ : navigateur ou build requis. Leur absence est un choix.
const HORS_CHAMP = new Set([
  "dom-truth.mjs", "figure-preview.mjs", "copie-maths.mjs", "impression.mjs",
  "zoom-sweep.mjs", "formules-rendues.mjs", "ancres-uniques.mjs",
  "donnees-sweep.mjs", "typo-francaise.mjs", "accents-manquants.mjs",
]);

function dossiersNotions() {
  const out = [];
  for (const m of readdirSync(join(REPO, "content"))) {
    const dm = join(REPO, "content", m);
    let subs; try { subs = readdirSync(dm); } catch { continue; }
    for (const n of subs) {
      if (existsSync(join(dm, n, "lesson.md"))) out.push(`content/${m}/${n}`);
    }
  }
  return out.sort();
}

function lance(label, bin, args, cwd) {
  process.stdout.write(`  ${label.padEnd(26)} `);
  try {
    execFileSync(bin, args, { cwd, stdio: "pipe" });
    console.log("✓");
    return true;
  } catch (e) {
    console.log("✗ ROUGE");
    const txt = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim().split("\n").slice(-4);
    for (const l of txt) console.log(`      ${l}`);
    return false;
  }
}

console.log("\n━━ batterie locale (les contrôles de gates.yml qui ne demandent pas de navigateur) ━━\n");
let rouges = 0;

if (!lance("tests unitaires", "node",
  ["--test", ...readdirSync(join(WEB, "scripts")).filter((f) => /^test-.*\.mjs$/.test(f)).map((f) => `scripts/${f}`)],
  WEB)) rouges++;

// PIÈGE, consigné trois fois (§11.47, puis ici) : validate-content résout ses
// dossiers par `path.join(REPO, dir)`. Un chemin en `../content/…` ne résout
// donc PAS, et l'outil échoue sur « pas de lesson.md » — pas sur le contenu.
// On le lance depuis la racine, avec des chemins relatifs au dépôt.
if (!lance("validate-content (62)", "node",
  ["web/scripts/validate-content.mjs", ...dossiersNotions(), "--strict"],
  REPO)) rouges++;

for (const e of ETAPES) {
  if (!e.cmd) continue;
  if (!lance(e.nom, "node", e.cmd, WEB)) rouges++;
}

// ── Le garde-fou : cette liste est-elle encore à jour ? ──
const yml = readFileSync(join(REPO, ".github/workflows/gates.yml"), "utf8");
const lancesParCI = new Set(
  [...yml.matchAll(/node\s+scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1])
);
const couverts = new Set(ETAPES.filter((e) => e.cmd).map((e) => e.cmd[0].replace("scripts/", "")));
// Lancés plus haut, hors de la boucle ETAPES : ils ont besoin d'arguments calculés.
couverts.add("validate-content.mjs");
const oublis = [...lancesParCI].filter((f) => !couverts.has(f) && !HORS_CHAMP.has(f)).sort();

console.log();
if (oublis.length) {
  console.log("━━ LA BATTERIE A PRIS DU RETARD SUR LA CI ━━");
  console.log("   gates.yml lance ces scripts, ce fichier les ignore, et ils ne sont pas");
  console.log("   déclarés hors champ :");
  for (const f of oublis) console.log(`     • ${f}`);
  console.log("   Ajoute-les à ETAPES, ou à HORS_CHAMP avec la raison. C'est exactement");
  console.log("   la dérive qui a laissé cinq portes rouges pendant une semaine (§11.81).");
  rouges++;
} else {
  console.log(`  ✓ la liste couvre gates.yml (${couverts.size} portes + ${HORS_CHAMP.size} hors champ assumés)`);
}

console.log(rouges ? `\n━━ ${rouges} contrôle(s) ROUGE(s) — ne pas pousser en prétendant le contraire ━━\n`
                   : "\n━━ tout est vert ━━\n");
process.exit(rouges ? 1 : 0);
