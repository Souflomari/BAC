/**
 * portee-corpus.mjs — une fonctionnalité livrée, sur combien de pages ?
 *
 * POURQUOI (angle mort n° 7, ouvert le 2026-09-05). `dom-truth` prouve qu'un
 * mécanisme FONCTIONNE : il le teste sur des leçons témoins et il a raison de
 * le faire. Mais il ne dit rien de sa PORTÉE — sur combien de pages du corpus
 * ce mécanisme a réellement quelque chose à montrer.
 *
 * Le cas qui a ouvert la question : la zone « à retenir », livrée, vérifiée,
 * verte au harnais… et vide sur 100 % de la philosophie, faute d'un bloc
 * `$$…$$` à replier dessus. Le mécanisme marchait ; il n'avait rien à dire
 * sur un quart du corpus, et aucun instrument ne pouvait le signaler.
 *
 * CE QUE CE SCRIPT COMPTE, par notion et par matière — rien que des faits de
 * fichier, aucune heuristique :
 *
 *   points d'arrêt   `[[checkpoint:…]]` seuls sur leur ligne dans lesson.md
 *   figures          `[[figure:…]]`
 *   étagées          sidecars `media/*.stages.json` (la figure qui se révèle)
 *   mouvements       `[[motion:…]]`
 *   embarqués        `[[embed:…]]` (GeoGebra, PhET, Desmos…)
 *   interactives     sidecars `media/*.interactive.json`
 *   dérivations      `[[derivation:…]]`
 *   exercices        `[[exercise:…]]`
 *   à retenir        chapitres portant une carte (sidecar OU repli `$$…$$`)
 *
 * CE QU'IL NE DIT PAS, et c'est important : si la portée est BONNE. Une
 * fonctionnalité présente une fois est peut-être exactement ce qu'il fallait
 * (une dérivation dépliable n'a de sens que là où il y a une dérivation) ;
 * une autre absente partout est peut-être une dette. Ce script fournit le
 * tableau, pas le verdict — le verdict est pédagogique.
 *
 *   node scripts/portee-corpus.mjs            → le tableau par notion
 *   node scripts/portee-corpus.mjs --resume   → les totaux par matière seuls
 */
import fs from "node:fs";
import path from "node:path";
import jitiFactory from "jiti";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const WEB = path.resolve(ICI, "..");
const CONTENU = path.resolve(WEB, "..", "content");
const RESUME = process.argv.includes("--resume");

const jiti = jitiFactory(path.join(ICI, "x.mjs"), {
  interopDefault: true,
  alias: { "@": path.join(WEB, "src") },
});
const { cartesParChapitre, parseRetenir } = jiti(path.join(WEB, "src/lib/retenir.ts"));
const { extractChapterHeadings } = jiti(path.join(WEB, "src/lib/chapters.ts"));

const marqueurs = (md, type) =>
  (md.match(new RegExp(`^[ \\t]*\\[\\[${type}:[a-zA-Z0-9_-]+\\]\\][ \\t]*$`, "gm")) || []).length;

const COLONNES = [
  ["ch.", "chapitres"], ["arrêt", "checkpoints"], ["fig", "figures"],
  ["étag", "etagees"], ["mvt", "motions"], ["emb", "embeds"],
  ["itx", "interactives"], ["dér", "derivations"], ["exo", "exercices"],
  ["retenir", "retenir"],
];

const notions = [];
for (const m of fs.readdirSync(CONTENU).sort()) {
  const dm = path.join(CONTENU, m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const s of fs.readdirSync(dm).sort()) {
    const d = path.join(dm, s);
    const lesson = path.join(d, "lesson.md");
    if (!fs.existsSync(lesson)) continue;
    const md = fs.readFileSync(lesson, "utf-8");
    const media = fs.existsSync(path.join(d, "media")) ? fs.readdirSync(path.join(d, "media")) : [];
    const sc = path.join(d, "retenir.json");
    const sidecar = fs.existsSync(sc) ? parseRetenir(JSON.parse(fs.readFileSync(sc, "utf-8"))) : null;
    const chapitres = Math.max(1, extractChapterHeadings(md).length);
    const cartes = cartesParChapitre(md, sidecar, chapitres);
    notions.push({
      matiere: m, slug: s, chapitres,
      checkpoints: marqueurs(md, "checkpoint"),
      figures: marqueurs(md, "figure"),
      etagees: media.filter((f) => f.endsWith(".stages.json")).length,
      motions: marqueurs(md, "motion"),
      embeds: marqueurs(md, "embed"),
      interactives: media.filter((f) => f.endsWith(".interactive.json")).length,
      derivations: marqueurs(md, "derivation"),
      exercices: marqueurs(md, "exercise"),
      retenir: cartes.filter(Boolean).length,
    });
  }
}

const somme = (l, c) => l.reduce((s, n) => s + n[c], 0);
const matieres = [...new Set(notions.map((n) => n.matiere))];

console.log("");
console.log("portee-corpus — une fonctionnalité livrée, sur combien de pages ?");
console.log("═".repeat(104));

if (!RESUME) {
  console.log(
    "notion".padEnd(44) + COLONNES.map(([t]) => t.padStart(8)).join("")
  );
  console.log("─".repeat(104));
  for (const n of notions)
    console.log(
      `${n.matiere}/${n.slug}`.padEnd(44) +
        COLONNES.map(([, c]) => String(n[c]).padStart(8)).join("")
    );
  console.log("─".repeat(104));
}

console.log("matière".padEnd(44) + COLONNES.map(([t]) => t.padStart(8)).join(""));
console.log("─".repeat(104));
for (const m of matieres) {
  const l = notions.filter((n) => n.matiere === m);
  console.log(
    `${m} (${l.length} notions)`.padEnd(44) +
      COLONNES.map(([, c]) => String(somme(l, c)).padStart(8)).join("")
  );
}
console.log("─".repeat(104));
console.log(
  `TOTAL (${notions.length} notions)`.padEnd(44) +
    COLONNES.map(([, c]) => String(somme(notions, c)).padStart(8)).join("")
);
console.log("");

// La lecture qui compte : sur combien de NOTIONS chaque mécanisme apparaît.
console.log("Sur combien de notions chaque mécanisme apparaît au moins une fois :");
for (const [titre, c] of COLONNES.slice(1)) {
  const k = notions.filter((n) => n[c] > 0).length;
  const barre = "█".repeat(Math.round((k / notions.length) * 40));
  console.log(
    `  ${titre.padEnd(9)} ${String(k).padStart(2)}/${notions.length}  ${barre}`
  );
}
console.log("");
console.log(
  "Ce tableau ne dit PAS si une portée est bonne. Une dérivation dépliable n'a de\n" +
    "sens que là où il y a une dérivation ; une figure absente sur toute une matière\n" +
    "est peut-être une dette. Le verdict est pédagogique, pas mécanique."
);
console.log("");
