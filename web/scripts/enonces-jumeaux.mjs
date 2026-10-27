#!/usr/bin/env node
/**
 * enonces-jumeaux — la même question deux fois.
 *
 * POURQUOI CE SCRIPT EXISTE (§11.118, 2026-09-20). LESSON-EXPERIENCE-SPEC §1.1
 * porte une promesse à l'élève, en toutes lettres : « pour que la même question
 * n'apparaisse jamais deux fois ». Le mécanisme existe — un point d'arrêt qui
 * reprend un item de chapitre déclare `item_source: clone_of_<id>`, et
 * `ItemsSection` retire alors cet id du chapitre. Il est implémenté, il est
 * documenté, et au 2026-09-20 les 21 clones du corpus le déclarent tous
 * correctement.
 *
 * Ce que RIEN ne garantissait : qu'il en reste ainsi. Un auteur qui ajoute un
 * point d'arrêt en recopiant l'énoncé d'un item, et qui oublie la ligne
 * `item_source:`, ne casse aucun test — il fait simplement voir deux fois la
 * même question à l'élève, dans la même leçon. C'est le cas ADR 0031 : la
 * PORTÉE d'un mécanisme se mesure à part de son fonctionnement. Celui-ci
 * fonctionne ; personne ne mesurait s'il ATTEIGNAIT encore tout le corpus.
 *
 * DEUX DIRECTIONS (ADR 0031), parce qu'une seule se contourne :
 *   • le clone NU — un énoncé de point d'arrêt identique à celui d'un item du
 *     même dossier, sans `item_source: clone_of_<cet id>` : l'item n'est pas
 *     retiré, l'élève voit deux fois. PORTE FRANCHE, 0 aujourd'hui.
 *   • la déclaration MORTE — un `item_source: clone_of_X` où X n'existe PAS
 *     dans `items.yaml`. `ItemsSection` ne retire alors rien, et la ligne donne
 *     l'illusion inverse : une coquille dans l'id désarme l'exclusion en
 *     silence. Franche aussi, 0 aujourd'hui.
 *
 *     CE QU'ELLE NE DIT PAS, et la première version le disait à tort (ADR 0033,
 *     la porte exacte sur une AUTRE question) : elle n'exige PAS que l'énoncé du
 *     point d'arrêt soit identique à celui de l'item. `clone_of_X` veut dire
 *     « dérivé de X », pas « recopié de X » — un clone REFORMULÉ reste un clone
 *     et doit retirer X. Exiger l'identité déclarait 111 des 132 déclarations
 *     « mortes » alors qu'aucune ne l'était. Quand une mesure annonce une
 *     catastrophe, vérifier le BANC avant le produit.
 * Sans la seconde, on passe la première en écrivant `item_source: clone_of_`
 * n'importe quoi. Sans la première, on la passe en effaçant la ligne.
 *
 * ET UNE MESURE, séparée (ADR 0034 §3 : un seuil se pose sur une MESURE,
 * jamais sur un cliquet) : les énoncés jumeaux ENTRE items — dans une même
 * notion, ou entre deux notions. Ceux-là ne sont pas un défaut mécanique mais
 * un arbitrage éditorial (au 2026-09-20 : 1 intra, 2 inter, tous consignés
 * pour le propriétaire dans docs/audits/). Le cliquet dit seulement qu'ils ne
 * peuvent pas AUGMENTER.
 *
 * PIÈGE, mesuré le jour même : ne PAS minusculer l'intérieur des `$…$`. En
 * maths la casse est la sémantique — « Dériver $F$ … $F'=f$ » et « Dériver $f$
 * … $f'=F$ » sont deux questions opposées, et une normalisation naïve les
 * déclare jumelles (faux positif sur `maths/calcul-integral:CI-31`).
 *
 *   node scripts/enonces-jumeaux.mjs            # la mesure, en clair
 *   node scripts/enonces-jumeaux.mjs --porte    # les 2 portes + le cliquet
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");

// ── Cliquet : l'état MESURÉ au 2026-09-20, sur 1974 énoncés. ──
//   node scripts/enonces-jumeaux.mjs
const CLIQUET = { intra: 1, inter: 1 };

/** Normalise un énoncé SANS toucher à la casse des maths (voir le PIÈGE). */
function norm(s) {
  const t = String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "");
  const parts = t.split(/(\$[^$]*\$)/g);
  return parts
    .map((p, i) => (i % 2 === 1 ? p : p.toLowerCase()))
    .join("")
    .replace(/\s+/g, " ")
    .replace(/[.,;:!?]+$/g, "")
    .trim();
}

/** Les points d'arrêt sont soit une liste d'items, soit des items nus. */
function pointsDArret(doc) {
  return (doc?.checkpoints ?? []).flatMap((c) => c?.items ?? [c]).filter(Boolean);
}

const notions = [];
for (const m of fs.readdirSync(path.join(REPO, "content"))) {
  const dm = path.join(REPO, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm)) {
    if (fs.existsSync(path.join(dm, n, "items.yaml"))) notions.push([m, n]);
  }
}

const clonesNus = [];      // porte 1
const declarationsMortes = []; // porte 2
const clonesConformes = [];
const tousEnonces = [];    // pour la mesure inter/intra
let nbPointsDArret = 0;

for (const [m, n] of notions) {
  const cle = `${m}/${n}`;
  const dossier = path.join(REPO, "content", m, n);
  const items = yaml.load(fs.readFileSync(path.join(dossier, "items.yaml"), "utf8"))?.items ?? [];
  for (const it of items) {
    if (it?.stem) tousEnonces.push({ notion: cle, id: it.id, k: norm(it.stem) });
  }
  const parEnonce = new Map();
  const ids = new Set();
  for (const it of items) {
    if (!it?.id) continue;
    ids.add(it.id);
    if (it.stem) parEnonce.set(norm(it.stem), it.id);
  }

  const fc = path.join(dossier, "checkpoints.yaml");
  if (!fs.existsSync(fc)) continue;
  let cps;
  try { cps = pointsDArret(yaml.load(fs.readFileSync(fc, "utf8"))); }
  catch (e) { console.log(`YAML illisible — ${cle}/checkpoints.yaml : ${e.message}`); process.exitCode = 2; continue; }

  for (const cp of cps) {
    if (!cp?.stem) continue;
    nbPointsDArret++;
    const src = String(cp.item_source ?? "");
    const jumeau = parEnonce.get(norm(cp.stem));
    const declare = src.startsWith("clone_of_") ? src.slice("clone_of_".length) : null;

    if (declare !== null) {
      // Direction 2 : la déclaration doit désigner un item QUI EXISTE et dont
      // l'énoncé est bien celui-ci. Sinon elle ne retire rien.
      if (!ids.has(declare)) {
        declarationsMortes.push(`${cle} — « ${cp.id} » déclare clone_of_${declare}, absent d'items.yaml`);
      } else {
        clonesConformes.push(`${cle}/${cp.id} → ${declare}${jumeau === declare ? " (énoncé identique)" : " (reformulé)"}`);
      }
    } else if (jumeau) {
      // Direction 1 : énoncé recopié, rien de déclaré → l'item reste au chapitre.
      clonesNus.push(`${cle} — « ${cp.id} » reprend l'énoncé de ${jumeau} sans item_source (l'item RESTE au chapitre)`);
    }
  }
}

// ── La mesure : jumeaux entre items ──
const par = new Map();
for (const r of tousEnonces) {
  if (!par.has(r.k)) par.set(r.k, []);
  par.get(r.k).push(r);
}
const intra = [], inter = [];
for (const g of par.values()) {
  if (g.length < 2) continue;
  for (let i = 0; i < g.length; i++) {
    for (let j = i + 1; j < g.length; j++) {
      const [a, b] = [g[i], g[j]];
      (a.notion === b.notion ? intra : inter).push(
        a.notion === b.notion ? `${a.notion} : ${a.id} ⟂ ${b.id}` : `${a.notion}:${a.id} ⟂ ${b.notion}:${b.id}`
      );
    }
  }
}

console.log(`\n━━ énoncés jumeaux — ${notions.length} notions · ${tousEnonces.length} items · ${nbPointsDArret} points d'arrêt ━━\n`);
console.log(`  clones de point d'arrêt DÉCLARÉS et conformes : ${clonesConformes.length}`);
console.log(`  énoncés jumeaux entre items : ${intra.length} dans une même notion, ${inter.length} entre notions`);
for (const l of intra) console.log(`     • [intra] ${l}`);
for (const l of inter) console.log(`     • [inter] ${l}`);

let rouge = 0;

if (clonesNus.length) {
  console.log(`\n━━ CLONE NU : ${clonesNus.length} ━━`);
  console.log("   Un point d'arrêt recopie l'énoncé d'un item sans le déclarer. `ItemsSection`");
  console.log("   ne retire donc pas l'item du chapitre : l'élève rencontre DEUX FOIS la même");
  console.log("   question dans la même leçon — ce que LESSON-EXPERIENCE-SPEC §1.1 interdit");
  console.log("   en toutes lettres. Correctif : `item_source: clone_of_<id>` sur le point d'arrêt.");
  for (const l of clonesNus) console.log(`     • ${l}`);
  rouge++;
}

if (declarationsMortes.length) {
  console.log(`\n━━ DÉCLARATION MORTE : ${declarationsMortes.length} ━━`);
  console.log("   `item_source: clone_of_X` désigne un item qui n'existe pas, ou dont l'énoncé");
  console.log("   n'est pas celui-ci. Rien n'est retiré du chapitre, et la ligne donne");
  console.log("   l'illusion inverse. C'est la seconde direction (ADR 0031) : sans elle, la");
  console.log("   porte ci-dessus se passe en écrivant n'importe quel `clone_of_`.");
  for (const l of declarationsMortes) console.log(`     • ${l}`);
  rouge++;
}

if (PORTE) {
  if (intra.length > CLIQUET.intra || inter.length > CLIQUET.inter) {
    console.log(`\n━━ LE CLIQUET A RECULÉ ━━`);
    console.log(`   intra ${CLIQUET.intra} → ${intra.length} · inter ${CLIQUET.inter} → ${inter.length}`);
    console.log("   Deux items posent la même question. Ce n'est pas un défaut mécanique mais");
    console.log("   un arbitrage éditorial : soit l'un des deux énoncés change, soit le cliquet");
    console.log("   est relevé DÉLIBÉRÉMENT, avec la raison écrite ici.");
    rouge++;
  }
  console.log(rouge ? `\n━━ ${rouge} porte(s) ROUGE(s) ━━\n` : "\n━━ porte tenue ━━\n");
  process.exit(rouge ? 1 : 0);
}
console.log();
