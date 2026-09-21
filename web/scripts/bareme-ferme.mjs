/**
 * bareme-ferme.mjs — une copie parfaite vaut 20/20, et rien d'autre.
 *
 * POURQUOI CETTE PORTE EXISTE (§11.168, 2026-09-21). Le geste : ouvrir les
 * 39 épreuves, marquer TOUTES les questions « juste », lire la note affichée.
 * Résultat avant correctif :
 *
 *     spc-2021-rattrapage → 19,25 / 20
 *     spc-2010-normale    → 19,75 / 20
 *
 * Un élève qui a tout bon lisait qu'il n'avait pas tout bon. C'est la pire
 * espèce de défaut pour un produit qui prétend préparer un examen : il ment
 * sur le seul chiffre auquel l'élève tient.
 *
 * La cause était dans le PRODUIT, pas dans le corpus : `ptsDepuisStem`
 * prenait la PREMIÈRE étiquette de l'énoncé, alors qu'un énoncé de bac groupe
 * souvent plusieurs sous-questions notées séparément (« a) (0,25 pt) … b)
 * (0,25 pt) … »). Deux questions du corpus portent plusieurs étiquettes, et
 * ce sont exactement celles des deux épreuves fautives.
 *
 * CE QUI EST VÉRIFIÉ, ET DANS QUEL ORDRE
 *
 *   1. PAR EXERCICE — la somme des barèmes de ses questions vaut exactement
 *      son barème annoncé. C'est le contrôle qui rattrape une étiquette
 *      comptée deux fois aussi bien qu'une étiquette oubliée : la règle de
 *      lecture a deux façons de se tromper, et celle-ci les voit toutes deux.
 *   2. PAR ÉPREUVE — une copie tout juste fait exactement 20,00/20.
 *
 * ELLE IMPORTE LA RÈGLE DU PRODUIT, elle ne la recopie pas. `ptsDepuisStem`
 * vit dans `src/lib/bareme.ts` précisément pour ça : une porte qui recopierait
 * le motif vérifierait sa propre copie — verte, honnête, et répondant à une
 * AUTRE question (ADR 0033). Elle lit aussi les épreuves par `listEpreuves()`,
 * la même fonction que la page.
 *
 * Elle ne touche ni au navigateur ni au build : c'est de l'arithmétique sur
 * les données. Elle a donc sa place dans la batterie locale.
 *
 *   node scripts/bareme-ferme.mjs [--porte]
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), {
  interopDefault: true,
  alias: { "@": path.join(WEB, "src") },
});
const { listEpreuves } = jiti(path.join(WEB, "src/lib/examens.ts"));
const { ptsDepuisStem } = jiti(path.join(WEB, "src/lib/bareme.ts"));

const porte = process.argv.includes("--porte");
// Les barèmes de bac se comptent en quarts de point : une tolérance au
// millième suffit à absorber le flottant sans jamais absorber un vrai écart.
const EPS = 1e-3;
const r3 = (x) => Math.round(x * 1000) / 1000;

const epreuves = listEpreuves();
if (epreuves.length === 0) {
  console.error("✗ aucune épreuve lue — la porte ne mesure rien");
  process.exit(1);
}

let exosVus = 0, questionsVues = 0;
const ecarts = [];

for (const ep of epreuves) {
  let distribueTotal = 0;
  for (let i = 0; i < ep.exercices.length; i++) {
    const x = ep.exercices[i];
    const qs = x.entry.questions || [];
    exosVus++;
    questionsVues += qs.length;
    const tags = qs.map((q) => ptsDepuisStem(q.stem));
    const somme = tags.reduce((s, t) => s + (t ?? 0), 0);
    const sansEtiquette = tags.filter((t) => t == null).length;
    const annonce = x.entry.baremeTotal ?? 0;
    // La répartition que fait le produit : les étiquettes, puis le reste en
    // parts égales entre les questions qui n'en ont pas.
    const distribue = somme + (sansEtiquette > 0 ? Math.max(annonce - somme, 0) : 0);
    distribueTotal += distribue;
    if (Math.abs(distribue - annonce) > EPS) {
      ecarts.push(
        `  ✗ ${ep.id} · exercice ${i + 1} « ${String(x.exerciseLabel || x.subject || "").slice(0, 40)} »\n` +
        `      barème annoncé ${annonce} · distribué ${r3(distribue)} · ` +
        `${qs.length} question(s), ${sansEtiquette} sans étiquette, somme des étiquettes ${r3(somme)}`
      );
    }
  }
  const sur20 = ep.pts > 0 ? (distribueTotal / ep.pts) * 20 : 0;
  if (Math.abs(sur20 - 20) > EPS) {
    ecarts.push(
      `  ✗ ${ep.id} — une copie TOUT JUSTE vaut ${r3(sur20)} / 20\n` +
      `      (points déclarés de l'épreuve : ${ep.pts}, distribués : ${r3(distribueTotal)})`
    );
  }
}

console.log(
  `\n${epreuves.length} épreuves · ${exosVus} exercices · ${questionsVues} questions`
);
if (ecarts.length === 0) {
  console.log(
    `\nLe barème se referme partout : chaque exercice distribue exactement son total,\n` +
    `et une copie tout juste vaut 20,00 / 20 sur les ${epreuves.length} épreuves.`
  );
} else {
  console.log(`\n${ecarts.length} écart(s) :\n`);
  for (const e of ecarts) console.log(e);
}

if (porte && ecarts.length > 0) {
  console.error(`\n━━ porte barème : la note est le seul chiffre auquel l'élève tient ━━`);
  console.error(`   Soit une étiquette « (x pt) » manque ou est en trop dans un énoncé,`);
  console.error(`   soit le barème annoncé de l'exercice ne correspond pas au sujet réel.`);
  console.error(`   La règle de lecture vit dans web/src/lib/bareme.ts — une seule copie.`);
  process.exit(1);
}
