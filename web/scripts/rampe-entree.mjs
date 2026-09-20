#!/usr/bin/env node
/**
 * rampe-entree — par où un élève en difficulté ENTRE dans une notion.
 *
 * POURQUOI CE SCRIPT EXISTE (§11.119, 2026-09-20). `rampe-bac.mjs` mesure le
 * SOMMET de la rampe — la notion mène-t-elle à un vrai sujet de bac. Personne
 * ne mesurait l'autre bout. Or c'est l'autre bout que promet la VISION : « un
 * tuteur patient qui prend un élève EN DIFFICULTÉ ». Une notion dont le
 * premier barreau démarre déjà haut n'a pas de marche d'entrée : l'élève qui
 * en a le plus besoin se cogne au premier item.
 *
 * MESURÉ AU 2026-09-20, et le résultat ne se discute pas par matière :
 *
 *     matière  notions  items/notion  barreaux  items de niveau 1
 *     maths      14        32,4         8,6      41 / 454  (9,0 %)
 *     pc         25        27,6         7,6      62 / 690  (9,0 %)
 *     philo      12        30,5         7,6      31 / 366  (8,5 %)
 *     svt        11         9,3         5,2       0 / 102  (0,0 %)
 *
 * Zéro sur cent deux. Les trois autres matières tombent indépendamment entre
 * 8,5 % et 9,0 % — une convention d'échelle propre à SVT expliquerait un
 * écart, pas une absence totale. Et l'écart se retrouve sur deux axes qui ne
 * dépendent d'AUCUNE étiquette : un tiers des items par notion, deux tiers
 * des barreaux.
 *
 * CE QUE ÇA REJOINT. C'est la troisième mesure indépendante qui isole les 11
 * notions SVT : §11.114 (la rampe n'atteint un sujet de bac SOURCÉ dans aucune
 * des 11) et l'inventaire des leçons muettes (11 des 13 sans point d'arrêt).
 * Trois axes, même sous-ensemble. Ce n'est pas un défaut par notion — c'est un
 * standard de fabrication différent, et cela se tranche au niveau du
 * propriétaire (docs/audits/rampe-entree-2026-09-20.md).
 *
 * L'ÉCHELLE N'EST DÉCLARÉE NULLE PART. `difficulty_level` va de 1 à 5 dans le
 * corpus (134 / 367 / 685 / 373 / 53) et aucun document de `docs/design/` ni
 * aucun agent ne dit ce que valent ces cinq crans. C'est une convention
 * implicite ; l'instrument la mesure sans la légitimer.
 *
 * DEUX SENS, tous deux CLIQUETS à une seule direction — comme `rampe-bac` :
 * on empêche la régression, on n'exige pas la réparation, parce que réparer
 * est un travail éditorial que l'outil ne peut pas faire.
 *   • SANS MARCHE — notions dont le premier barreau ne contient AUCUN item de
 *     niveau 1 : 12 au 2026-09-20 (les 11 SVT, plus `philo/analyse-de-texte`).
 *     Le nombre ne peut pas augmenter. Le chiffre a été POSÉ depuis la mesure
 *     et non depuis l'attente : j'avais écrit 11 de mémoire, ce qui aurait
 *     laissé un cran de jeu — un cliquet qui n'aurait pas vu la treizième.
 *   • RAMPE PLATE — notions dont la pente (moyenne du dernier barreau moins
 *     moyenne du premier) est inférieure à 1,0 cran. Le nombre ne peut pas
 *     augmenter.
 * Le second existe parce que le premier se satisfait d'UN item de niveau 1
 * posé en tête d'une notion par ailleurs plate.
 *
 *   node scripts/rampe-entree.mjs            # la mesure, en clair
 *   node scripts/rampe-entree.mjs --porte    # les deux cliquets
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");

// ── Cliquets : l'état MESURÉ au 2026-09-20, sur 62 notions. ──
//   node scripts/rampe-entree.mjs
const CLIQUET = { sansMarche: 12, plates: 4 };
const PENTE_MIN = 1.0;

const notions = [];
for (const m of fs.readdirSync(path.join(REPO, "content"))) {
  const dm = path.join(REPO, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm)) {
    if (fs.existsSync(path.join(dm, n, "items.yaml"))) notions.push([m, n]);
  }
}

const lignes = [];
for (const [m, n] of notions) {
  const items = yaml.load(fs.readFileSync(path.join(REPO, "content", m, n, "items.yaml"), "utf8"))?.items ?? [];
  const parBarreau = new Map();
  for (const it of items) {
    const r = String(it.rung ?? "").match(/^R(\d+)$/);
    if (!r || typeof it.difficulty_level !== "number") continue;
    const k = Number(r[1]);
    if (!parBarreau.has(k)) parBarreau.set(k, []);
    parBarreau.get(k).push(it.difficulty_level);
  }
  const barreaux = [...parBarreau.keys()].sort((a, b) => a - b);
  if (barreaux.length < 2) continue;
  const moy = (k) => { const v = parBarreau.get(k); return v.reduce((a, b) => a + b, 0) / v.length; };
  const premier = parBarreau.get(barreaux[0]);
  lignes.push({
    cle: `${m}/${n}`,
    matiere: m,
    nBarreaux: barreaux.length,
    nPremier: premier.length,
    niveau1: premier.filter((d) => d === 1).length,
    moyPremier: moy(barreaux[0]),
    pente: moy(barreaux[barreaux.length - 1]) - moy(barreaux[0]),
  });
}

const sansMarche = lignes.filter((l) => l.niveau1 === 0);
const plates = lignes.filter((l) => l.pente < PENTE_MIN);

console.log(`\n━━ rampe d'entrée — ${lignes.length} notions à ≥2 barreaux ━━\n`);
console.log("  matière   notions   1er barreau (moy)   pente moyenne   sans marche");
const parMat = new Map();
for (const l of lignes) { if (!parMat.has(l.matiere)) parMat.set(l.matiere, []); parMat.get(l.matiere).push(l); }
for (const [m, v] of [...parMat].sort()) {
  const a = (k) => v.reduce((s, x) => s + x[k], 0) / v.length;
  console.log(
    `  ${m.padEnd(9)} ${String(v.length).padStart(5)}   ${a("moyPremier").toFixed(2).padStart(13)}   ` +
    `${a("pente").toFixed(2).padStart(11)}   ${String(v.filter((x) => x.niveau1 === 0).length).padStart(9)}`
  );
}

console.log(`\n  SANS MARCHE — aucun item de niveau 1 au premier barreau : ${sansMarche.length}`);
for (const l of sansMarche.sort((a, b) => b.moyPremier - a.moyPremier)) {
  console.log(`     • ${l.cle.padEnd(46)} 1er barreau à ${l.moyPremier.toFixed(1)}/5 sur ${l.nPremier} item(s)`);
}
console.log(`\n  RAMPE PLATE — pente < ${PENTE_MIN.toFixed(1)} cran du premier au dernier barreau : ${plates.length}`);
for (const l of plates.sort((a, b) => a.pente - b.pente)) {
  console.log(`     • ${l.cle.padEnd(46)} pente ${l.pente >= 0 ? "+" : ""}${l.pente.toFixed(2)} sur ${l.nBarreaux} barreaux`);
}

if (PORTE) {
  let rouge = 0;
  if (sansMarche.length > CLIQUET.sansMarche) {
    console.log(`\n━━ CLIQUET « SANS MARCHE » : ${CLIQUET.sansMarche} → ${sansMarche.length} ━━`);
    console.log("   Une notion de plus n'offre aucune marche d'entrée à un élève en difficulté.");
    rouge++;
  }
  if (plates.length > CLIQUET.plates) {
    console.log(`\n━━ CLIQUET « RAMPE PLATE » : ${CLIQUET.plates} → ${plates.length} ━━`);
    console.log("   Une notion de plus ne monte pas : son dernier barreau n'est pas plus");
    console.log("   exigeant que son premier. Ce sens existe parce que le premier cliquet se");
    console.log("   satisfait d'UN item de niveau 1 posé en tête d'une notion par ailleurs plate.");
    rouge++;
  }
  console.log(rouge ? `\n━━ ${rouge} cliquet(s) ROUGE(s) ━━\n` : "\n━━ cliquets tenus ━━\n");
  process.exit(rouge ? 1 : 0);
}
console.log();
