#!/usr/bin/env node
/**
 * lectures-graphiques.mjs — REGÉNÈRE l'inventaire de l'exposition K-8.
 *
 * POURQUOI CE SCRIPT EXISTE. `docs/audits/lectures-graphiques.md` recense les
 * entrées de banque dont le raisonnement s'appuie sur une lecture de figure —
 * la surface que `known-issues.md` **K-8** désigne comme jamais re-mesurée
 * contre la source la moins dégradée. Cet inventaire avait été bâti À LA MAIN
 * le 2026-08-28, sur une banque de 187 entrées.
 *
 * Il a pourri exactement comme un document à la main pourrit : la banque en
 * compte 234 au 2026-09-03, et les 47 entrées ajoutées entre-temps — sept
 * épreuves SPC converties les 28 et 29 août — n'avaient JAMAIS été passées au
 * repérage. Toutes sont servies à l'élève. Le chiffre « 89 entrées » que la
 * fiche K-8 et le HANDOFF citent était donc faux par défaut, sans que rien ne
 * le signale (constaté par `docs/audits/drapeaux-non-leves.md`).
 *
 * Un inventaire qu'on ne peut pas régénérer est un inventaire qui ment dès la
 * conversion suivante. Celui-ci se régénère :
 *
 *   node scripts/lectures-graphiques.mjs            → écrit le .md
 *   node scripts/lectures-graphiques.mjs --check    → n'écrit rien, sort en
 *                                                     échec si le .md est
 *                                                     périmé (usage CI)
 *
 * CE QU'IL MESURE, ET CE QU'IL NE MESURE PAS. Il compte les MENTIONS d'une
 * lecture de figure dans le texte d'une entrée. C'est une BORNE HAUTE de la
 * surface à re-mesurer, jamais une liste de défauts : le repérage attrape
 * aussi le raisonnement qui décrit un schéma sans qu'aucune valeur n'en
 * dépende. Le tri par nombre de mentions qu'il produit est d'ailleurs le
 * MAUVAIS ordre de passage pour une campagne — `docs/audits/k8-remesure-2017-2019.md`
 * § 8.5 a montré que le drapeau non levé prédit bien mieux l'erreur (4 sur 6
 * contre 1 sur 9). Cet inventaire dit l'ÉTENDUE ; `drapeaux-non-leves.md` dit
 * l'ORDRE.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "js-yaml";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RACINE = path.dirname(WEB);
const SORTIE = path.join(RACINE, "docs/audits/lectures-graphiques.md");
const CHECK = process.argv.includes("--check");

// Les formes qu'emploie réellement le corpus, relevées sur lui le 2026-09-03
// puis confrontées entrée par entrée à l'inventaire manuel du 2026-08-28.
//
// CETTE CONFRONTATION A CORRIGÉ LES DEUX LISTES, dans les deux sens :
//   — le manuel voyait trois entrées que ce script ratait. Deux étaient ses
//     propres FAUX POSITIFS : il comptait le mot « figure » dans des phrases
//     qui disent qu'il n'y en a PAS (« Aucune figure n'accompagne cette
//     partie », « énoncé intégralement textuel »). D'où la liste NEGATIONS
//     ci-dessous, qui neutralise ces tournures avant de compter.
//   — la troisième était un VRAI manque de ce script : « (voir figure) » et
//     « Figure F » ne ressemblent à aucune formule de lecture, et pourtant
//     l'entrée lit bien un dessin. D'où les deux derniers motifs.
//
// Dans un inventaire qui se veut BORNE HAUTE, un faux négatif coûte plus
// cher qu'un faux positif : une entrée oubliée sort du radar de K-8.
const NEGATIONS = [
  /aucune? figure[^.]*\./gi,
  /(?:sans|pas de) (?:figure|graphe|courbe)[^.]*\./gi,
  /ne figurent? (?:pas|plus)\b/gi, // « les ions ne figurent pas dans le bilan »
];

const MOTIFS = [
  /lectures? graphiques?/gi,
  /d['’]apr[èe]s (?:la |le |les )?(?:figure|graphe|courbe|trac[ée])/gi,
  /sur (?:la |le )?(?:figure|graphe|courbe)/gi,
  /\ble palier\b/gi,
  /\bla tangente\b/gi,
  /on (?:lit|rel[èe]ve|mesure)\b/gi,
  /\bà mi-hauteur\b/gi,
  /par lecture\b/gi,
  /\(?\bvoir (?:la )?figure\b\)?/gi,
  /\bfigure\s+[A-Z0-9]\b/g,
  /pentes? mesurées?/gi,
];

const COMPLETE_MIN = 19.5;

function texteDeLEntree(e) {
  const bouts = [e.intro, e.title, e.sourcing];
  for (const q of e.questions ?? []) {
    bouts.push(q.stem, q.reasoning);
    for (const s of q.steps ?? []) bouts.push(s.note, s.math);
  }
  for (const s of e.steps ?? []) bouts.push(s.note, s.math);
  return bouts.filter((x) => typeof x === "string").join("\n");
}

const entrees = [];
const totauxEpreuve = new Map();

for (const matiere of fs.readdirSync(path.join(RACINE, "content"))) {
  const base = path.join(RACINE, "content", matiere);
  if (!fs.statSync(base).isDirectory()) continue;
  for (const notion of fs.readdirSync(base)) {
    const f = path.join(base, notion, "bank.yaml");
    if (!fs.existsSync(f)) continue;
    const d = yaml.load(fs.readFileSync(f, "utf8"));
    for (const e of d?.entries ?? []) {
      const s = e.source ?? {};
      const cle = `${s.filiere}-${s.year}-${s.session}`;
      totauxEpreuve.set(cle, (totauxEpreuve.get(cle) ?? 0) + (e.bareme_total ?? 0));
      // On neutralise d'abord les phrases qui NIENT la présence d'une figure,
      // pour ne pas compter « aucune figure n'accompagne cette partie » comme
      // une lecture de figure — l'erreur exacte de l'inventaire manuel.
      let txt = texteDeLEntree(e);
      for (const re of NEGATIONS) txt = txt.replace(re, " ");
      let n = 0;
      for (const re of MOTIFS) n += (txt.match(re) ?? []).length;
      if (n > 0) {
        entrees.push({
          n, id: e.id, notion: `${matiere}/${notion}`,
          sujet: `${s.filiere} ${s.year} ${s.session}`,
          pts: e.bareme_total ?? 0, cle,
        });
      }
    }
  }
}

let totalBanque = 0;
for (const matiere of fs.readdirSync(path.join(RACINE, "content"))) {
  const base = path.join(RACINE, "content", matiere);
  if (!fs.statSync(base).isDirectory()) continue;
  for (const notion of fs.readdirSync(base)) {
    const f = path.join(base, notion, "bank.yaml");
    if (!fs.existsSync(f)) continue;
    totalBanque += (yaml.load(fs.readFileSync(f, "utf8"))?.entries ?? []).length;
  }
}

entrees.sort((a, b) => b.n - a.n || a.id.localeCompare(b.id));
const dansEpreuveComplete = (e) => (totauxEpreuve.get(e.cle) ?? 0) >= COMPLETE_MIN;
const servies = entrees.filter(dansEpreuveComplete).length;
const jour = new Date().toISOString().slice(0, 10);

const lignes = entrees.map(
  (e) => `| ${e.n} | \`${e.id}\` | \`${e.notion}\` | ${e.sujet} | ${e.pts} | ${dansEpreuveComplete(e) ? "oui" : "—"} |`
);

const doc = `# Lectures graphiques — l'inventaire de l'exposition K-8

> **GÉNÉRÉ par \`web/scripts/lectures-graphiques.mjs\` — ne pas éditer à la
> main.** Régénère avec \`node scripts/lectures-graphiques.mjs\`.
>
> **Ce document EST** la liste des entrées de banque dont le texte s'appuie sur
> une lecture de figure. C'est la surface que \`known-issues.md\` **K-8** désigne
> comme jamais re-mesurée contre la source la moins dégradée.
>
> **Ce qu'il N'EST PAS** : une liste de défauts. Le repérage attrape toute
> mention de figure, y compris quand le raisonnement décrit un schéma sans
> qu'aucune valeur n'en dépende. **C'est une borne haute.**
>
> **Et ce n'est PAS le bon ordre de passage.** Le tri par nombre de mentions
> ci-dessous dit l'ÉTENDUE de la surface. Pour savoir PAR OÙ COMMENCER, lis
> \`drapeaux-non-leves.md\` : la campagne du 2026-09-03 a montré qu'un drapeau
> non levé prédit l'erreur bien mieux que le nombre de mentions — 4 lectures
> fausses sur 6 drapeautées, contre 1 sur 9 non drapeautées. Trier par mentions
> aurait raté les deux entrées réfutées.
>
> **Pourquoi ce fichier est généré.** Sa version manuelle, datée du
> 2026-08-28, annonçait 89 entrées sur 187. La banque en comptait 234 six jours
> plus tard : 47 entrées ajoutées n'avaient jamais été passées au repérage, et
> toutes étaient servies. Le chiffre cité par K-8 et le HANDOFF était faux par
> défaut, sans que rien ne le signale.

**Chiffres au ${jour} : ${entrees.length} entrées sur ${totalBanque}**, dont
**${servies} appartiennent à une épreuve complète** (donc affichée à l'élève en
mode examen).

Trié par nombre de mentions.

| mentions | entrée | notion | sujet | pts | épreuve complète |
|---:|---|---|---|---:|:---:|
${lignes.join("\n")}
`;

if (CHECK) {
  const actuel = fs.existsSync(SORTIE) ? fs.readFileSync(SORTIE, "utf8") : "";
  // On compare tout sauf la date, qui change chaque jour sans que le fond bouge.
  const sansDate = (s) => s.replace(/\*\*Chiffres au \d{4}-\d{2}-\d{2}/, "**Chiffres au <date>");
  if (sansDate(actuel) !== sansDate(doc)) {
    console.error(
      `✗ ${path.relative(RACINE, SORTIE)} est PÉRIMÉ — ${entrees.length} entrées sur ${totalBanque} aujourd'hui.\n` +
        `  Régénère : node scripts/lectures-graphiques.mjs`
    );
    process.exit(1);
  }
  console.log(`✓ inventaire à jour — ${entrees.length} entrées sur ${totalBanque}, ${servies} servies`);
} else {
  fs.writeFileSync(SORTIE, doc, "utf8");
  console.log(`✓ écrit ${path.relative(RACINE, SORTIE)} — ${entrees.length} entrées sur ${totalBanque}, ${servies} servies`);
}
