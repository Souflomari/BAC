/**
 * portee-hors-lecon.mjs — ce que les surfaces HORS LEÇON ont à montrer.
 *
 * POURQUOI (angle mort n° 7, seconde moitié). `portee-corpus.mjs` répond à
 * « sur combien de leçons ce mécanisme a-t-il quelque chose à montrer ». Il
 * s'arrête à la porte de la leçon. Les autres surfaces du produit —
 * l'assembleur d'épreuves, l'atelier — n'avaient aucun compteur, et ce sont
 * elles qu'un élève ouvre le mois du bac.
 *
 * CE QUE CE SCRIPT COMPTE, rien que des faits de fichier :
 *
 *   épreuves        assemblées depuis les banques (lib/examens)
 *   morceaux        entrées de banque servies sur une épreuve (un exercice
 *                   du sujet peut se découper entre plusieurs notions)
 *   questions       questions d'épreuve, toutes épreuves confondues
 *   raisonnement    questions portant un `reasoning` non vide
 *   dérivation      questions portant des `steps` (le pas-à-pas déplié)
 *   renvois visuels « figure 3 », « le schéma ci-contre »… dans l'énoncé
 *   substitution    ces renvois qui trouvent une DESCRIPTION dans l'entrée
 *
 * CE QU'IL NE DIT PAS. Si 77 % de dérivations est assez. C'est une question
 * pédagogique ; le tableau est le fait.
 *
 * ⚠️ À LANCER DEPUIS `web/` — `lib/content.ts` résout la racine du contenu
 * relativement au répertoire courant, et rend une liste VIDE ailleurs (sans
 * erreur : le script annonce alors sereinement zéro épreuve).
 *
 *   node scripts/portee-hors-lecon.mjs           → le tableau par épreuve
 *   node scripts/portee-hors-lecon.mjs --resume  → les totaux seuls
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RESUME = process.argv.includes("--resume");
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": path.join(WEB, "src") },
});
const { listEpreuves } = jiti(path.join(WEB, "src/lib/examens.ts"));
const { listNotions } = jiti(path.join(WEB, "src/lib/content.ts"));

// Un RENVOI VISUEL : l'énoncé désigne quelque chose qui se regarde.
const RENVOI = /\b(figure|schéma|graphe|document)s?\s*(?:n[°o]\s*)?(\d+|[A-H]\b|ci-(?:contre|dessous|dessus))/gi;
// Une DESCRIPTION : un bloc d'emphase qui OUVRE sur « Figure N ». Le corpus
// emploie au moins cinq conventions (italique numéroté, gras numéroté, gras
// « Le dispositif (figure 1) », lettré « Figure A » pour une figure que le
// sujet ne numérote pas, et la description en ligne après le renvoi). Ce
// motif n'attrape que les quatre premières : le comptage « sans
// substitution » est donc un MAJORANT, à trancher à la main.
const DESCR = /(?:^|\n)[ \t]*[*_]{1,2}\s*(?:la |le |les )?(?:figure|schéma|graphe|graphique|document|courbe)s?\s*(?:n[°o]\s*)?(\d+|[A-H]\b)?/gi;
const cle = (s) => String(s).toLowerCase().replace(/^ci-.*/, "SANSNUM");

const eps = listEpreuves();
const lignes = eps.map((e) => {
  const qs = e.exercices.flatMap((x) => x.entry.questions ?? []);
  let renvois = 0;
  let orphelins = 0;
  for (const x of e.exercices) {
    const t = [x.entry.intro ?? "", ...(x.entry.questions ?? []).map((q) => q.stem ?? "")].join("\n");
    const vus = new Set([...t.matchAll(RENVOI)].map((m) => cle(m[2])));
    if (!vus.size) continue;
    const dits = new Set([...t.matchAll(DESCR)].map((m) => (m[1] ? cle(m[1]) : "SANSNUM")));
    renvois += vus.size;
    orphelins += [...vus].filter((k) => !dits.has(k)).length;
  }
  return {
    id: e.id,
    pts: e.pts,
    morceaux: e.exercices.length,
    q: qs.length,
    raison: qs.filter((q) => (q.reasoning ?? "").trim()).length,
    steps: qs.filter((q) => (q.steps ?? []).length).length,
    renvois,
    orphelins,
  };
});

const T = (f) => lignes.reduce((s, r) => s + r[f], 0);
if (!RESUME) {
  console.log(
    "épreuve".padEnd(22) + "pts".padStart(6) + "morc".padStart(6) + "quest".padStart(7) +
    "raison".padStart(8) + "dériv".padStart(7) + "renvois".padStart(9) + "sans descr.".padStart(13)
  );
  for (const r of [...lignes].sort((a, b) => a.steps / (a.q || 1) - b.steps / (b.q || 1))) {
    console.log(
      r.id.padEnd(22) + String(r.pts).padStart(6) + String(r.morceaux).padStart(6) +
      String(r.q).padStart(7) + String(r.raison).padStart(8) + String(r.steps).padStart(7) +
      String(r.renvois).padStart(9) + String(r.orphelins).padStart(13)
    );
  }
  console.log();
}
const notions = listNotions();
const pct = (a, b) => (b ? ((100 * a) / b).toFixed(0) + " %" : "—");
console.log(`épreuves            ${eps.length}`);
console.log(`morceaux servis     ${T("morceaux")}`);
console.log(`questions           ${T("q")}`);
console.log(`avec raisonnement   ${T("raison")}  (${pct(T("raison"), T("q"))})`);
console.log(`avec dérivation     ${T("steps")}  (${pct(T("steps"), T("q"))})`);
console.log(`renvois visuels     ${T("renvois")} distincts · ${T("orphelins")} sans bloc de description (majorant — voir DESCR)`);
console.log(`atelier             1 notion sur ${notions.length} (prototype : maths/dérivées)`);
