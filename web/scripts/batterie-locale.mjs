/**
 * batterie-locale — le job `source` de la CI (.github/workflows/ci.yml), lancé en local avant de
 * pousser. Sans navigateur ni build : environ 30 secondes.
 *
 *   node scripts/batterie-locale.mjs        (depuis web/)
 *   ../scripts/verif-commit.sh              (la même chose, sur le commit et non sur l'arbre de travail)
 *
 * Garder cette liste alignée sur le job `source` de ci.yml : c'est la même, dans le même ordre.
 */
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";

const contenu = readdirSync("../content", { withFileTypes: true })
  .filter((m) => m.isDirectory())
  .flatMap((m) => readdirSync(`../content/${m.name}`, { withFileTypes: true })
    .filter((n) => n.isDirectory() && !n.name.includes("_media-test"))
    .map((n) => `content/${m.name}/${n.name}`))
  .sort();
const tests = readdirSync("scripts").filter((f) => /^test-.*\.mjs$/.test(f)).map((f) => `scripts/${f}`);

const ETAPES = [
  ["tests unitaires", ["node", "--test", ...tests]],
  ["jetons du design", ["node", "scripts/generate-tokens.mjs", "--check"]],
  ["jetons : aucun usage arbitraire", ["node", "scripts/token-gate.mjs"]],
  ["liens entre fichiers", ["node", "scripts/liens-fichiers.mjs", "--porte"]],
  ["validate-content", ["node", "scripts/validate-content.mjs", "--strict", ...contenu]],
  ["calculs numériques", ["node", "scripts/calculs-numeriques.mjs", "--porte"]],
  ["nombres affichés", ["node", "scripts/arithmetique-rendue.mjs", "--strict"]],
  ["constantes physiques", ["node", "scripts/constantes-physiques.mjs", "--porte"]],
  ["barème sur 20", ["node", "scripts/bareme-ferme.mjs", "--porte"]],
  ["dollars appariés", ["node", "scripts/dollars-apparies.mjs", "--porte"]],
  ["ids de figures", ["node", "scripts/figures-id-divergents.mjs", "--porte"]],
  ["énoncés jumeaux", ["node", "scripts/enonces-jumeaux.mjs", "--porte"]],
  ["prose répétée", ["node", "scripts/prose-jumelle.mjs", "--porte"]],
  ["QCM : longueur", ["node", "scripts/indice-longueur.mjs", "--porte"]],
  ["QCM : absolus", ["node", "scripts/indice-absolu.mjs", "--porte"]],
  ["QCM : refus", ["node", "scripts/indice-refus.mjs", "--porte"]],
  ["QCM : ruses", ["node", "scripts/eleve-ruse.mjs", "--porte"]],
  ["modèle apprenant", ["node", "scripts/build-learner-inputs.mjs", "--verifie"]],
  ["migrations", ["node", "scripts/portes-migrations.mjs", "--porte"]],
  ["exercices des pilotes", ["node", "--no-warnings", "scripts/pilotes-exercices.mjs", "--porte"]],
];

let rouges = 0;
const t0 = Date.now();
for (const [nom, [cmd, ...args]] of ETAPES) {
  const r = spawnSync(cmd, args, { encoding: "utf8" });
  const ok = r.status === 0;
  if (!ok) rouges++;
  console.log(`${ok ? "✓" : "✗"} ${nom}`);
  if (!ok) console.log(((r.stdout || "") + (r.stderr || "")).trim().split("\n").slice(-15).map((l) => "    " + l).join("\n"));
}
const modeles = spawnSync("grep", ["-rnE", "claude-(opus|sonnet|fable|haiku)", "content/", "docs/sujets/", "web/src/", "animations/"], { cwd: "..", encoding: "utf8" });
if (modeles.status === 0) { rouges++; console.log("✗ identifiant de modèle dans le produit\n" + modeles.stdout); }
else console.log("✓ aucun identifiant de modèle dans le produit");

console.log(`\n${rouges === 0 ? "batterie verte" : `${rouges} contrôle(s) rouge(s)`} — ${Math.round((Date.now() - t0) / 1000)} s`);
process.exit(rouges === 0 ? 0 : 1);
