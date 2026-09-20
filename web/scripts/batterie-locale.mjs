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
  //  §11.122 : la CI le lance à CHAQUE construction, via le crochet `prebuild`
  //  de npm — jamais écrit nulle part, donc invisible à la garde ci-dessous
  //  jusqu'à aujourd'hui. C'est le contrôle de la source unique du design :
  //  `tokens.ts` génère les variables CSS, et ceci vérifie qu'elles n'ont pas
  //  divergé. Sans lui, « tout est vert » en local pouvait précéder un rouge en
  //  CI — exactement ce que cette batterie existe pour empêcher.
  { nom: "generate-tokens", cmd: ["scripts/generate-tokens.mjs", "--check"] },
  //  §11.125 : la liste de mots que la porte accents LIT doit couvrir ce que le
  //  script de réparation CONNAÎT. Une sonde plus étroite que la réparation
  //  déclare propre ce qu'elle ne sait pas voir. En python3, comme sa source.
  { nom: "accents (liste)", cmd: null },
  { nom: "liens-fichiers", cmd: ["scripts/liens-fichiers.mjs", "--porte"] },
  { nom: "validate-content", cmd: null },                     // traité à part
  { nom: "lectures-graphiques", cmd: ["scripts/lectures-graphiques.mjs", "--check"] },
  { nom: "token-gate", cmd: ["scripts/token-gate.mjs"] },
  { nom: "contrast-gate", cmd: ["scripts/contrast-gate.mjs"] },
  { nom: "indice-longueur", cmd: ["scripts/indice-longueur.mjs", "--porte"] },
  { nom: "indice-absolu", cmd: ["scripts/indice-absolu.mjs", "--porte"] },
  { nom: "indice-refus", cmd: ["scripts/indice-refus.mjs", "--porte"] },
  { nom: "eleve-ruse", cmd: ["scripts/eleve-ruse.mjs", "--porte"] },
  { nom: "porte-engagement", cmd: ["scripts/porte-engagement.mjs", "--porte"] },
  { nom: "enonces-jumeaux", cmd: ["scripts/enonces-jumeaux.mjs", "--porte"] },
  { nom: "modele-a-jour", cmd: ["scripts/build-learner-inputs.mjs", "--verifie"] },
  { nom: "rampe-bac", cmd: ["scripts/rampe-bac.mjs", "--porte"] },
  { nom: "rampe-entree", cmd: ["scripts/rampe-entree.mjs", "--porte"] },
  { nom: "couverture-diagnostique", cmd: ["scripts/couverture-diagnostique.mjs", "--porte"] },
  { nom: "resume-couverture", cmd: ["scripts/resume-couverture.mjs", "--porte"] },
  { nom: "arithmetique-rendue", cmd: ["scripts/arithmetique-rendue.mjs", "--strict"] },
  // Énumérateur de routes que l'étape dom-truth consomme : sans navigateur,
  // et le lancer attrape un plantage de l'énumérateur avant la CI.
  { nom: "routes-examens", cmd: ["scripts/routes-examens.mjs"] },
  // La porte des portes (ADR 0033) : elle lance validate-content sous
  // couverture V8 et signale toute porte dont le SCAN ne tourne sur rien.
  // Sans navigateur, et c'est le seul contrôle qui puisse dire qu'un ✓ ne
  // vaut rien — il a donc sa place ici plus qu'ailleurs.
  { nom: "portee-portes", cmd: ["scripts/portee-portes.mjs"] },
  // La suite d'essais rouges (ADR 0034) : elle casse une occurrence, mesure, et
  // restaure. Sans navigateur, et c'est le seul contrôle qui réponde à « mes
  // portes peuvent-elles encore crier ? » — la question qu'aucune porte ne pose
  // sur elle-même.
  { nom: "essais-rouges", cmd: ["scripts/essais-rouges.mjs"] },
];

// Hors champ ASSUMÉ : navigateur ou build requis. Leur absence est un choix.
const HORS_CHAMP = new Set([
  "dom-truth.mjs", "figure-preview.mjs", "copie-maths.mjs", "impression.mjs",
  "zoom-sweep.mjs", "formules-rendues.mjs", "ancres-uniques.mjs",
  "donnees-sweep.mjs", "typo-francaise.mjs", "accents-manquants.mjs",
  // liens-internes démarre `next start` et pilote un navigateur sur 111 pages :
  // il lui faut donc un build ET Playwright. Hors champ pour la même raison que
  // dom-truth, et non par oubli.
  "liens-internes.mjs",
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

//  --garde : ne lancer QUE le contrôle de dérive du bas de ce fichier.
//  Il existe pour que cette garde soit MESURABLE à part. Lancée dans la
//  batterie entière, elle est noyée par les portes de contenu — et un essai
//  rouge ne peut rien prouver sur une commande déjà rouge pour une autre
//  raison (§11.104). Une propriété qu'on ne peut pas re-mesurer est un
//  souvenir (ADR 0034 §5).
const GARDE_SEULE = process.argv.includes("--garde");

if (!GARDE_SEULE) console.log("\n━━ batterie locale (les contrôles de gates.yml qui ne demandent pas de navigateur) ━━\n");
let rouges = 0;

if (!GARDE_SEULE && !lance("tests unitaires", "node",
  ["--test", ...readdirSync(join(WEB, "scripts")).filter((f) => /^test-.*\.mjs$/.test(f)).map((f) => `scripts/${f}`)],
  WEB)) rouges++;

// PIÈGE, consigné trois fois (§11.47, puis ici) : validate-content résout ses
// dossiers par `path.join(REPO, dir)`. Un chemin en `../content/…` ne résout
// donc PAS, et l'outil échoue sur « pas de lesson.md » — pas sur le contenu.
// On le lance depuis la racine, avec des chemins relatifs au dépôt.
if (!GARDE_SEULE && !lance("accents (liste)", "python3",
  ["scripts/accents-francais.py", "--verifier", "web/scripts/accents.mots.json"],
  REPO)) rouges++;

if (!GARDE_SEULE && !lance("validate-content (62)", "node",
  ["web/scripts/validate-content.mjs", ...dossiersNotions(), "--strict"],
  REPO)) rouges++;

for (const e of GARDE_SEULE ? [] : ETAPES) {
  if (!e.cmd) continue;
  if (!lance(e.nom, "node", e.cmd, WEB)) rouges++;
}

// ── Le garde-fou : cette liste est-elle encore à jour ? ──
const yml = readFileSync(join(REPO, ".github/workflows/gates.yml"), "utf8");
//  PIÈGE MESURÉ (§11.122). La première version de cette garde ne cherchait que
//  les appels DIRECTS — la forme « node » suivie d'un chemin sous `scripts/`.
//  Or la CI atteint HUIT scripts autrement :
//    • par `npm run <nom>`, dont la vraie commande vit dans package.json
//      (`npm run dom-truth`, les six suites `npm run test-*`) ;
//    • par le crochet `prebuild`, que npm déclenche SEUL avant `npm run build`
//      et que rien n'écrit donc dans le YAML (`generate-tokens --check`).
//  La garde voyait 28 des 36 scripts réellement lancés. Une porte ajoutée à la
//  CI sous forme `npm run …` pouvait donc manquer à cette batterie sans que
//  rien ne crie — c'est la dérive de §11.81, dans la garde même qui la
//  surveille. Un mécanisme et sa PORTÉE sont deux choses (ADR 0031).
const scriptsNpm = JSON.parse(readFileSync(join(WEB, "package.json"), "utf8")).scripts ?? {};
const depuisCmd = (cmd) => [...String(cmd ?? "").matchAll(/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1]);
const lancesParCI = new Set(
  [...yml.matchAll(/node\s+scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1])
);
for (const [, nom] of yml.matchAll(/npm run ([a-z0-9:-]+)/g)) {
  for (const f of depuisCmd(scriptsNpm[nom])) lancesParCI.add(f);
  //  npm lance `prebuild` de lui-même avant `build` : personne ne l'écrit.
  if (nom === "build") for (const f of depuisCmd(scriptsNpm.prebuild)) lancesParCI.add(f);
}
const couverts = new Set(ETAPES.filter((e) => e.cmd).map((e) => e.cmd[0].replace("scripts/", "")));
// Lancés plus haut, hors de la boucle ETAPES : ils ont besoin d'arguments calculés.
couverts.add("validate-content.mjs");
//  Les six suites `test-*.mjs` sont lancées en bloc par le `node --test` du
//  haut de ce fichier : couvertes en substance, jamais nommées dans ETAPES.
for (const f of readdirSync(join(WEB, "scripts"))) if (/^test-.*\.mjs$/.test(f)) couverts.add(f);
const oublis = [...lancesParCI].filter((f) => !couverts.has(f) && !HORS_CHAMP.has(f)).sort();

//  ── SECOND SENS (§11.123) : l'inverse exact du précédent ──
//
//  La garde ci-dessus demande « la CI lance-t-elle une porte que j'ignore ? ».
//  Elle ne demande pas « existe-t-il un script que PERSONNE ne lance et que
//  AUCUN catalogue ne nomme ? ». Quatre étaient dans ce cas au 2026-09-20,
//  dont `wide-measure.mjs`, dont l'en-tête demande explicitement d'être
//  REJOUÉ après les arbitrages du propriétaire — introuvable, donc jamais
//  rejoué. Un script qu'aucun catalogue ne nomme est un script que personne
//  ne retrouve.
//
//  Les deux sens ensemble disent quelque chose ; chacun seul laisse une porte
//  de sortie (ADR 0031).
const tousScripts = readdirSync(join(WEB, "scripts")).filter((f) => f.endsWith(".mjs"));
const catalogue = new Set(
  [...readFileSync(join(REPO, "docs/audits/INSTRUMENTS.md"), "utf8")
    .matchAll(/web\/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1])
);
const orphelins = tousScripts.filter(
  (f) => !/^test-.*\.mjs$/.test(f) && !lancesParCI.has(f) && !couverts.has(f) &&
         !HORS_CHAMP.has(f) && !catalogue.has(f)
).sort();

console.log();
if (orphelins.length) {
  console.log("━━ DES INSTRUMENTS QUE PERSONNE NE LANCE ET QU'AUCUN CATALOGUE NE NOMME ━━");
  for (const f of orphelins) console.log(`     • ${f}`);
  console.log("   Les ajouter à docs/audits/INSTRUMENTS.md (avec leur colonne « ne dit RIEN de »),");
  console.log("   ou à ETAPES / HORS_CHAMP s'ils doivent tourner. Un script introuvable est un");
  console.log("   script mort — et `wide-measure.mjs` demandait dans son en-tête d'être rejoué.");
  rouges++;
} else {
  console.log(`  ✓ aucun instrument orphelin (${tousScripts.length} scripts, ${catalogue.size} catalogués)`);
}

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

if (!GARDE_SEULE) console.log(rouges ? `\n━━ ${rouges} contrôle(s) ROUGE(s) — ne pas pousser en prétendant le contraire ━━\n`
                   : "\n━━ tout est vert ━━\n");
process.exit(rouges ? 1 : 0);
