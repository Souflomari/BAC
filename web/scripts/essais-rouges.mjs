#!/usr/bin/env node
/**
 * essais-rouges.mjs — rejouer TOUS les essais rouges, d'un coup.
 *
 * POURQUOI CE FICHIER EXISTE (§11.106, 2026-09-20). « Porte vérifiée rouge »
 * était, jusqu'ici, une PHRASE dans un document. Une phrase ne se relance pas :
 * six mois plus tard, personne ne sait si la porte crie encore, et §11.104 a
 * montré que trois de ces phrases étaient fausses le jour même où elles ont
 * été écrites — l'outil lisait un ERR_MODULE_NOT_FOUND comme un rouge.
 *
 * Une propriété qu'on ne peut pas remesurer n'est pas une propriété : c'est un
 * souvenir. Ce script transforme chaque essai rouge en COMMANDE, et la CI peut
 * alors répondre à la question qu'aucune porte ne pose sur elle-même :
 * **est-ce que mes portes peuvent encore devenir rouges ?**
 *
 * Il délègue chaque essai à `essai-rouge.mjs`, qui garantit le pré-contrôle
 * vert, la casse d'UNE occurrence, et la restauration octet pour octet.
 *
 * LES TROIS CODES D'UN ESSAI, et pourquoi il faut les distinguer :
 *   0 — la porte est passée ROUGE. Elle voit.
 *   1 — la porte est restée VERTE. **AMBIGU** : la porte est aveugle, OU
 *       l'essai est mal construit. Sur les six premiers essais, la moitié des
 *       échecs venait de l'essai (§11.105). Diagnostiquer, ne pas conclure.
 *   2 — le motif `de` n'existe plus dans le fichier. Rien n'a été cassé, donc
 *       RIEN N'A ÉTÉ MESURÉ. Ce n'est pas un succès : c'est un essai à réparer.
 *   4 — la porte était déjà rouge, ou la commande n'a pas tourné.
 *
 *   node scripts/essais-rouges.mjs          → rejoue tout
 *   node scripts/essais-rouges.mjs §11.100  → rejoue ceux dont l'id contient ça
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const filtre = process.argv.slice(2).find((a) => !a.startsWith("--"));

/** Le contenu exact du fichier, ou null s'il est illisible. */
function lireOctets(p) {
  try { return fs.readFileSync(p, "utf-8"); } catch { return null; }
}

const { essais } = JSON.parse(fs.readFileSync(path.join(ICI, "essais-rouges.manifeste.json"), "utf-8"));
const liste = filtre ? essais.filter((e) => e.id.includes(filtre) || e.quoi.includes(filtre)) : essais;

console.log(`\n━━ essais rouges : ${liste.length} porte(s) — chacune peut-elle encore crier ? ━━\n`);

let echecs = 0, muets = 0;
for (const e of liste) {
  const abs = path.resolve(WEB, e.fichier);
  const avant = lireOctets(abs);
  const r = spawnSync(
    "node",
    [
      "scripts/essai-rouge.mjs",
      "--fichier", e.fichier,
      "--de", e.de,
      "--vers", e.vers,
      "--porte", e.porte ?? `node scripts/validate-content.mjs --strict ${e.notion}`,
      ...(e.attendu ? ["--attendu", e.attendu] : []),
      ...(e.motif ? ["--motif", e.motif] : []),
    ],
    { cwd: WEB, encoding: "utf-8" }
  );
  const code = r.status;
  const marque =
    code === 0 ? (e.attendu === "avertissement" ? "⚠ AVERTI" : "✓ ROUGE ")
    : code === 2 ? "· MUET  "
    : code === 4 ? "✗ PRÉ    "
    : "✗ VERTE ";
  console.log(`  ${marque}  ${e.id.padEnd(13)} ${e.quoi}`);
  if (code === 2) {
    muets++;
    console.log(`           le motif n'existe plus dans ${e.fichier} — RIEN N'A ÉTÉ MESURÉ, répare l'essai`);
  } else if (code !== 0) {
    echecs++;
    for (const l of `${r.stdout}${r.stderr}`.split("\n").filter((l) => /^✗|répertoire|commande/.test(l)).slice(0, 3)) {
      console.log(`           ${l.trim()}`);
    }
  }
  //  Un essai restauré laisse le fichier INTACT ; on le vérifie plutôt que de
  //  le supposer, parce que c'est le genre de supposition qui coûte une journée
  //  de travail (§11.97, §11.98, §11.100).
  //
  //  PREMIÈRE VERSION, ET SON FAUX POSITIF (§11.112) : elle interrogeait
  //  `git status`. Or un fichier peut porter des modifications VOULUES et non
  //  encore committées — c'était le cas le jour même, en pleine campagne de
  //  contenu — et la suite annonçait alors « la restauration a échoué » sur un
  //  essai parfaitement restauré. Une alerte qui se déclenche chaque fois qu'on
  //  travaille est une alerte qu'on apprend à ignorer (§11.110).
  //
  //  On compare donc les OCTETS d'avant et d'après, ce qui est la question
  //  posée — et non l'état du fichier par rapport à git, qui est une autre.
  const apres = lireOctets(abs);
  if (avant !== null && apres !== avant) {
    console.error(`           ⚠ ${e.fichier} diffère de son état d'AVANT l'essai — la restauration a échoué`);
    echecs++;
  }
}

console.log();
if (muets) {
  console.log(`  ${muets} essai(s) MUET(s) : leur motif a disparu du corpus. Un essai muet ne prouve`);
  console.log(`  rien et se répare en une ligne dans essais-rouges.manifeste.json.`);
}
if (echecs) {
  console.error(`━━ ${echecs} porte(s) n'ont pas crié ━━`);
  console.error(`   AMBIGU : la porte est aveugle, OU l'essai est mal construit. Sur les six`);
  console.error(`   premiers essais de cette suite, la moitié des échecs venait de l'essai.`);
  console.error(`   Diagnostiquer avant de « réparer » une porte qui marche (§11.105).\n`);
  process.exit(1);
}
console.log(`━━ les ${liste.length} portes crient encore ━━\n`);
