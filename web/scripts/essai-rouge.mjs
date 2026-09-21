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
import { spawnSync } from "node:child_process";

const A = process.argv.slice(2);
const opt = (n, d) => { const i = A.indexOf(`--${n}`); return i === -1 ? d : A[i + 1]; };

const fichier = opt("fichier");
const de = opt("de");
const vers = opt("vers");
const porte = opt("porte");
const attendu = opt("attendu", "rouge");
//  TROISIÈME VERDICT (§11.106). Toutes les portes ne font pas échouer la
//  construction : certaines AVERTISSENT délibérément — §11.71 le dit en toutes
//  lettres (« rien ne casse pour l'élève »). Mesurer une telle porte au code de
//  sortie la déclare aveugle, ce qu'elle n'est pas. `--attendu avertissement`
//  exige donc deux choses à la fois : la porte reste VERTE, et son avertissement
//  APPARAÎT — vérifié contre `--motif`. Un avertissement supposé n'est pas une
//  propriété ; un avertissement vu en est une.
const motif = opt("motif");

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

//  LE PRÉ-CONTRÔLE, ET POURQUOI IL A FALLU L'AJOUTER (§11.104, 2026-09-20).
//  `execSync` ne distingue pas « la porte a tourné et a échoué » de « la
//  commande n'a jamais tourné ». Lancé depuis `web/scripts/` au lieu de
//  `web/`, un `node scripts/<une-porte>.mjs` sort en ERR_MODULE_NOT_FOUND — code non
//  nul — et cet outil annonçait fièrement « ✓ passée ROUGE, elle VOIT ce
//  défaut ». Trois essais rouges ont été déclarés ce jour-là sur des portes
//  qui n'avaient pas tourné une seule fois.
//
//  C'est le cas MORT d'ADR 0033, tombé à l'intérieur de l'instrument écrit
//  pour le détecter ailleurs. La règle en sort renforcée : un essai rouge ne
//  prouve rien tant qu'on n'a pas établi que la porte était VERTE juste avant,
//  sur l'arbre intact, avec cette commande-là et depuis ce répertoire-là.
//
//  SECOND DÉFAUT DU MÊME OUTIL, trouvé le même jour (§11.106). `execSync` ne
//  rend QUE stdout quand la commande réussit : sur un passage VERT, tout ce que
//  la porte a écrit sur stderr était perdu. Une porte qui AVERTIT sans faire
//  échouer — §11.71 le fait exprès — était donc invisible ici, et l'essai la
//  déclarait aveugle. `spawnSync` rend les deux flux dans les deux cas.
function lancePorte() {
  const r = spawnSync(porte, { cwd: process.cwd(), encoding: "utf8", shell: true });
  return { rouge: r.status !== 0, sortie: `${r.stdout ?? ""}${r.stderr ?? ""}` };
}

const avant = lancePorte();
if (avant.rouge) {
  console.error(`✗ la porte est DÉJÀ rouge (ou n'a pas tourné) sur l'arbre INTACT — rien n'est mesuré.`);
  console.error(`  commande : ${porte}`);
  console.error(`  répertoire : ${process.cwd()}`);
  for (const l of avant.sortie.trim().split("\n").slice(0, 5)) console.error(`  ${l}`);
  console.error(`  Si c'est un ERR_MODULE_NOT_FOUND, la commande n'a jamais tourné : relance`);
  console.error(`  depuis le répertoire où ses chemins résolvent (souvent web/).`);
  process.exit(4);
}
console.log(`· pré-contrôle : la porte est VERTE sur l'arbre intact — l'essai peut mesurer quelque chose`);

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

  const { rouge, sortie } = lancePorte();
  const lignes = sortie.split("\n").filter((l) => /✗|ROMPU|failure|échec|erreur/i.test(l));
  for (const l of lignes.slice(0, 6)) console.log(`   ${l.trim()}`);

  //  TROISIÈME DÉFAUT DU MÊME OUTIL (§11.164, 2026-09-21). Le pré-contrôle
  //  établit que la commande TOURNE sur l'arbre intact. Il n'établit pas
  //  qu'elle tourne encore une fois le fichier cassé — et une sabotage peut
  //  empêcher la commande d'ARRIVER jusqu'à la porte.
  //
  //  Le cas vécu : casser `FIN_APOSTROPHE.test(gauche.value) &&` en `false &&`
  //  rend la branche inatteignable ; TypeScript cesse de réduire
  //  `gauche.value` à `string` ; `npm run build` échoue sur « Type error » ;
  //  la porte ne tourne JAMAIS. Code de sortie non nul → cet outil annonçait
  //  « ✓ passée ROUGE, elle VOIT ce défaut ». Le rouge venait de `tsc`.
  //
  //  C'est le cas MORT d'ADR 0033 une seconde fois, déplacé d'un cran : non
  //  plus « la commande n'a jamais tourné » (le pré-contrôle l'attrape) mais
  //  « la sabotage a cassé autre chose que ce qu'on mesure ».
  //
  //  Une sabotage qui empêche la compilation n'est pas un essai rouge, c'est
  //  une panne. Les marqueurs ci-dessous sont ceux d'une chaîne d'outils qui
  //  s'arrête AVANT la porte — jamais ceux d'une porte qui crie.
  const PANNE = [
    /Failed to compile/,
    /^Type error:/m,
    /ERR_MODULE_NOT_FOUND/,
    /Cannot find module/,
    /build worker exited with code/,
    /^SyntaxError:/m,
    //  `tsc` en direct n'écrit NI « Failed to compile » NI « Type error: » —
    //  ces deux-là sont la mise en forme de Next. Lui écrit
    //  « fichier(126,26): error TS18048: … ». Le premier jet de cette liste
    //  ne le reconnaissait pas, et l'essai qui devait prouver le détecteur
    //  est reparti « ✓ ROUGE » : le détecteur d'angle mort avait le sien.
    //  Mesuré, pas supposé — la sabotage a été rejouée à la main pour lire
    //  le texte exact avant d'écrire le motif.
    /\berror TS\d+:/,
  ];
  const panne = PANNE.find((m) => m.test(sortie));
  if (rouge && panne) {
    console.error(`✗ AMBIGU : la commande est tombée AVANT d'atteindre la porte.`);
    console.error(`  marqueur : ${panne}`);
    console.error(`  La sabotage a cassé la chaîne d'outils (compilation, résolution de module),`);
    console.error(`  pas le comportement que la porte mesure. Le code de sortie vient de là,`);
    console.error(`  pas d'un défaut vu. Réécris la sabotage pour qu'elle COMPILE : sur du code`);
    console.error(`  typé, viser une VALEUR (une constante réécrite) plutôt qu'une CONDITION`);
    console.error(`  — une condition mise à \`false\` supprime aussi le rétrécissement de type.`);
  }

  const vu = motif ? new RegExp(motif).test(sortie) : false;
  const ok = panne && rouge ? false
    : attendu === "rouge" ? rouge
    : attendu === "avertissement" ? (!rouge && vu)
    : !rouge;
  //  Le verdict dit ce qui a été ÉTABLI, pas seulement ce qui s'est passé :
  //  un essai `--attendu vert` qui passe n'établit pas que la porte voit
  //  quelque chose — il établit qu'elle ne crie pas à tort.
  console.log(panne && rouge
    ? `✗ verdict SUSPENDU — voir ci-dessus`
    : ok
    ? (attendu === "rouge"
        ? `✓ la porte est passée ROUGE, comme attendu — elle VOIT ce défaut`
        : attendu === "avertissement"
        ? `⚠ la porte a AVERTI sans faire échouer, comme attendu — elle voit, et le dit sans bloquer`
        : `✓ la porte est restée VERTE, comme attendu — pas de faux positif sur ce changement`)
    : attendu === "avertissement" && !rouge
    ? `✗ la porte est restée VERTE et N'A PAS AVERTI — elle est AVEUGLE au défaut introduit`
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
