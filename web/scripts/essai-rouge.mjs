#!/usr/bin/env node
//
//  essai-rouge.mjs — casser une porte sans jamais perdre de travail
//
//  POURQUOI CE FICHIER EXISTE. Une porte qui ne peut pas devenir ROUGE ne
//  mesure rien (ADR 0031). Il faut donc la casser exprès pour la croire. Mais
//  la manière évidente de défaire la casse — `git checkout -- fichier` —
//  DÉTRUIT tout ce qui n'est pas encore committé dans ce fichier. Ce piège est
//  consigné en HANDOFF §11.97, répété en §11.98, et repris une TROISIÈME fois
//  en §11.100. Trois notes n'ont rien empêché ; d'où cet outil.
//
//  Il copie hors de l'arbre, casse, mesure, et restaure DEPUIS LA COPIE —
//  y compris si la porte plante, si le motif ne s'applique pas, ou si on
//  interrompt au clavier.
//
//  USAGE
//    node scripts/essai-rouge.mjs \
//      --fichier ../content/philo/autrui/items.yaml \
//      --de "Seize familles étaient sous le plancher" \
//      --vers "Seize familles sont sous le plancher" \
//      --porte "node scripts/validate-content.mjs --strict content/philo/autrui"
//
//  Sort 0 si la porte est devenue ROUGE (l'essai réussit quand la porte
//  échoue), 1 si elle est restée verte — c'est-à-dire si la porte est
//  aveugle au défaut qu'on vient d'introduire. `--attendu vert` inverse.
//
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execSync } from "node:child_process";

const A = process.argv.slice(2);
const opt = (n, d) => { const i = A.indexOf(`--${n}`); return i === -1 ? d : A[i + 1]; };

const fichier = opt("fichier");
const de = opt("de");
const vers = opt("vers");
const porte = opt("porte");
const attendu = opt("attendu", "rouge");

if (!fichier || de === undefined || vers === undefined || !porte) {
  console.error("usage: --fichier <chemin> --de <texte> --vers <texte> --porte <commande> [--attendu rouge|vert]");
  process.exit(2);
}

const abs = path.resolve(fichier);
const original = fs.readFileSync(abs, "utf8");

//  La copie vit hors de l'arbre de travail : ni git, ni une porte, ni un
//  glob du dépôt ne peut la voir ou la balayer.
const refuge = fs.mkdtempSync(path.join(os.tmpdir(), "essai-rouge-"));
const copie = path.join(refuge, path.basename(abs));
fs.writeFileSync(copie, original);

let restaure = false;
const restaurer = () => {
  if (restaure) return;
  restaure = true;
  fs.writeFileSync(abs, fs.readFileSync(copie, "utf8"));
  fs.rmSync(refuge, { recursive: true, force: true });
};
//  Ceinture et bretelles : une interruption au clavier restaure aussi.
process.on("exit", restaurer);
for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) {
  process.on(sig, () => { restaurer(); process.exit(130); });
}

let code = 2;
try {
  const n = original.split(de).length - 1;
  if (n === 0) {
    console.error(`✗ le motif --de ne se trouve pas dans ${fichier} — rien à casser, donc rien de mesuré`);
    process.exit(2);
  }
  //  Une seule occurrence est cassée : un essai rouge doit isoler UN défaut,
  //  sinon on ne sait pas lequel la porte a vu.
  const i = original.indexOf(de);
  fs.writeFileSync(abs, original.slice(0, i) + vers + original.slice(i + de.length));
  console.log(`· ${fichier} : 1 occurrence cassée sur ${n} — « ${de.slice(0, 60)} » → « ${vers.slice(0, 60)} »`);

  let sortie = "", rouge = false;
  try {
    sortie = execSync(porte, { cwd: process.cwd(), encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    rouge = true;
    sortie = `${e.stdout ?? ""}${e.stderr ?? ""}`;
  }
  const lignes = sortie.split("\n").filter((l) => /✗|failure|échec|ERREUR/i.test(l));
  for (const l of lignes.slice(0, 6)) console.log(`   ${l.trim()}`);

  const ok = attendu === "rouge" ? rouge : !rouge;
  //  Le verdict dit ce qui a été ÉTABLI, pas seulement ce qui s'est passé :
  //  un essai `--attendu vert` qui passe n'établit pas que la porte voit
  //  quelque chose — il établit qu'elle ne crie pas à tort.
  console.log(ok
    ? (attendu === "rouge"
        ? `✓ la porte est passée ROUGE, comme attendu — elle VOIT ce défaut`
        : `✓ la porte est restée VERTE, comme attendu — pas de faux positif sur ce changement`)
    : `✗ la porte est restée ${rouge ? "ROUGE" : "VERTE"} : elle est AVEUGLE au défaut introduit`);
  code = ok ? 0 : 1;
} finally {
  restaurer();
  const rendu = fs.readFileSync(abs, "utf8");
  console.log(rendu === original
    ? `· ${fichier} restauré depuis la copie, octet pour octet`
    : `✗✗ RESTAURATION INCOMPLÈTE sur ${fichier} — n'écris rien de plus, compare à la main`);
  if (rendu !== original) code = 3;
}
process.exit(code);
