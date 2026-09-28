/**
 * couverture-compte.mjs — LA convention de comptage du plancher diagnostique.
 *
 * Extrait de couverture-diagnostique.mjs le 2026-09-05, pour une raison de
 * principe : deux instruments mesurent désormais le plancher — celui qui juge
 * le CORPUS (couverture-diagnostique) et celui qui juge ce que le corpus DIT
 * de lui-même (resume-couverture). S'ils comptaient chacun de leur côté, ils
 * pourraient diverger sans que rien ne le signale, et le second accuserait le
 * premier de mentir en se trompant lui-même. Une seule fonction, donc, et un
 * seul endroit où la règle peut changer.
 *
 * LA RÈGLE, en une phrase : une misconception est ÉVALUABLE quand au moins
 * trois ITEMS DU BANC (items.yaml) portent son id sur au moins un distracteur.
 *
 * Les quatre précisions qui font toute la différence, chacune payée une fois :
 *   1. UN ITEM COMPTE UNE FOIS par misconception, quel que soit le nombre de
 *      ses distracteurs qui la portent. Trois distracteurs d'un même item ne
 *      font pas trois observations : l'élève n'en choisit qu'un.
 *   2. LA CLÉ NE COMPTE PAS. Seuls les distracteurs (`correct !== true`)
 *      portent une erreur ; un tag sur la bonne réponse serait un contresens.
 *   3. LES CHECKPOINTS NE COMPTENT PAS. Le modèle apprenant est construit à
 *      partir du banc de fin SEUL (build-learner-inputs) ; les checkpoints
 *      sont des clones formatifs surfacés en ligne. Les compter gonflerait le
 *      plancher d'un chiffre que la chaîne ne verra jamais.
 *   4. LES DEUX FORMES DE TAG comptent : `misconception: a` et
 *      `misconception: [a, b]`. Ne lire que la première rend muet le
 *      co-marquage d'un distracteur qui exhibe deux erreurs à la fois.
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

/** Le modèle n'évalue une misconception qu'à partir de ce nombre d'items du banc. */
export const PLANCHER = 3;

/**
 * Les tags qui ne sont PAS des misconceptions et n'ont donc pas à figurer
 * dans l'inventaire d'une notion. `hors_cadre_probe` marque un distracteur
 * SONDE DE BORD : il teste la limite du programme (« forcé » n'est pas un
 * régime d'oscillations libres) plutôt qu'une erreur nommée. La convention
 * est documentée dans pc/systemes-oscillants/items.yaml, bloc
 * `non_floor_tags`, avec sa règle : une sonde de bord n'est jamais la clé.
 */
export const SENTINELLES = new Set(["hors_cadre_probe"]);

/** Les tags d'un choix, normalisés en liste (voir précision 4 ci-dessus). */
export function tags(valeur) {
  if (typeof valeur === "string") return valeur.length > 0 ? [valeur] : [];
  if (Array.isArray(valeur)) return valeur.filter((v) => typeof v === "string" && v.length > 0);
  return [];
}

/** Charge un YAML, ou null si le fichier manque ou ne se lit pas. */
export function charger(p) {
  try {
    return yaml.load(fs.readFileSync(p, "utf-8"));
  } catch {
    return null;
  }
}

/** Les entrées réellement exploitables d'une liste d'items : des QCM identifiés. */
export function qcm(liste) {
  return (Array.isArray(liste) ? liste : []).filter(
    (i) => i && typeof i.id === "string" && i.type === "mcq" && Array.isArray(i.choices)
  );
}

/** Les notions du corpus, dans l'ordre, sous forme { matiere, slug, cle, dir }. */
export function listerNotions(contenu) {
  const sousDossiers = (p) =>
    fs
      .readdirSync(p)
      .filter((n) => !n.startsWith("_") && !n.startsWith("."))
      .filter((n) => fs.statSync(path.join(p, n)).isDirectory())
      .sort();
  const out = [];
  for (const matiere of sousDossiers(contenu))
    for (const slug of sousDossiers(path.join(contenu, matiere)))
      out.push({ matiere, slug, cle: `${matiere}/${slug}`, dir: path.join(contenu, matiere, slug) });
  return out;
}

/**
 * La mesure d'une notion. `detail` (optionnel) reçoit des lignes de trace.
 * Renvoie null si la notion n'a ni item de banc ni checkpoint.
 */
export function mesurerNotion({ matiere, slug, cle, dir }, detail = null) {
  const banc = charger(path.join(dir, "items.yaml")) || {};
  const chk = charger(path.join(dir, "checkpoints.yaml")) || {};

  const declarees = new Set((banc.misconceptions || []).map((m) => m && m.id).filter(Boolean));
  const itemsBanc = qcm(banc.items);
  const itemsChk = qcm(chk.checkpoints);
  if (itemsBanc.length === 0 && itemsChk.length === 0) return null;

  let distracteurs = 0;
  let sansTag = 0;
  let nulExplicite = 0;
  let fantomes = 0;
  const utilises = new Set();
  /** misconception → nombre d'items DU BANC qui la visent (règle du plancher) */
  const parMc = new Map();

  for (const [source, liste] of [
    ["banc", itemsBanc],
    ["checkpoint", itemsChk],
  ]) {
    for (const it of liste) {
      const vus = new Set();
      for (const c of it.choices) {
        if (!c || c.correct === true) continue;
        distracteurs++;
        const ts = tags(c.misconception);
        if (ts.length === 0) {
          sansTag++;
          if (c.misconception === null) nulExplicite++;
          if (detail) detail.push(`sans-tag   ${cle} ${it.id} ${c.id ?? "?"}`);
          continue;
        }
        for (const tag of ts) {
          if (SENTINELLES.has(tag)) continue; // sonde de bord : pas une misconception
          utilises.add(tag);
          if (!declarees.has(tag)) {
            fantomes++;
            if (detail) detail.push(`fantôme    ${cle} ${it.id} ${c.id ?? "?"} → ${tag}`);
          }
          if (source === "banc") vus.add(tag);
        }
      }
      for (const tag of vus) parMc.set(tag, (parMc.get(tag) || 0) + 1);
    }
  }

  let plancher = 0;
  let sousPlancher = 0;
  for (const [, n] of parMc) (n >= PLANCHER ? plancher++ : sousPlancher++);
  const orphelines = [...declarees].filter((id) => !utilises.has(id)).length;
  if (detail) for (const id of declarees) if (!utilises.has(id)) detail.push(`orpheline  ${cle} ${id}`);

  return {
    matiere,
    slug,
    cle,
    dir,
    banc,
    itemsBanc: itemsBanc.length,
    itemsChk: itemsChk.length,
    declarees: declarees.size,
    // L'ENSEMBLE, pas seulement son cardinal : resume-couverture en a besoin
    // pour repérer les misconceptions DÉCLARÉES qu'aucun item du banc ne vise
    // (zéro item — pires que sous le plancher, et absentes de `parMc` par
    // construction puisque celui-ci ne connaît que les tags rencontrés).
    declareesSet: declarees,
    distracteurs,
    sansTag,
    nulExplicite,
    omissions: sansTag - nulExplicite,
    fantomes,
    parMc,
    plancher,
    sousPlancher,
    orphelines,
    aveugle: plancher === 0,
  };
}
