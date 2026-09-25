#!/usr/bin/env node
/**
 * arithmetique-rendue — la vérité arithmétique de ce que l'élève LIT.
 *
 * Une chaîne « a = b = c » affichée dans une leçon, un item, un corrigé ou une
 * entrée de banque est une PROMESSE : les segments valent la même chose. Cette
 * porte coupe chaque chaîne aux « = » / « \approx », évalue les segments
 * entièrement numériques, et compare ceux qu'elle sait évaluer.
 *
 * Née du triage de `pc/noyaux-masse-energie` (2026-09-19), où une somme fausse
 * n'avait été trouvée qu'à la main. Rien ne relisait les nombres.
 *
 * CE QU'ELLE NE VOIT PAS — à mesurer, pas à taire (ADR 0031) :
 *   - tout segment portant une lettre, une fraction, une racine, un indice :
 *     c'est la majorité du corpus, et c'est assumé ;
 *   - une chaîne dont TOUS les segments sont justes entre eux mais fausse
 *     par rapport au monde (deux masses fausses qui se compensent — le défaut
 *     même qui a motivé cette porte). **Partiellement repris depuis le
 *     2026-09-20 par `constantes-physiques.mjs`** (§11.131), qui lit les
 *     quelques grandeurs dont la valeur n'est pas affaire d'accord interne
 *     mais de fait physique : c, g, N_A, h, e, R, et toute vitesse dépassant
 *     c. Le reste de cet angle mort — une masse ou une longueur fausse contre
 *     le réel — n'est toujours lu par rien ;
 *   - les maths à cheval sur deux lignes (le $ ouvrant est ailleurs).
 * Elle affiche donc sa PORTÉE à chaque passage : combien de comparaisons elle
 * a réellement faites, combien elle a laissées hors champ.
 */
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

// La batterie locale lance les portes depuis `web/`, la CI depuis la racine.
// On résout donc le dépôt depuis l'emplacement DU SCRIPT, jamais depuis le
// cwd — sinon `find content` échoue et la porte rougit pour rien.
const REPO = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const STRICT = process.argv.includes("--strict");
const DETAIL = process.argv.includes("--detail");

const UNITE = /\\(?:text|mathrm|mbox|operatorname)\s*\{([^{}]*)\}(\^\{?-?\d+\}?)?/g;
// Une UNITÉ est un \text{} en FIN de segment. Ailleurs, ce balisage porte
// autre chose : un indice de variable (m_{\text{produits}}) ou un symbole
// chimique (m(^{4}_{2}\text{He})). Les compter comme unités faisait voir
// « deux unités » donc « conversion » donc chaîne écartée — et la porte est
// restée VERTE sur des défauts injectés exprès. Deux fois le même piège.
const UNITE_FIN = /\\(?:text|mathrm|mbox|operatorname)\s*\{([^{}]*)\}(\^\{?-?\d+\}?)?\s*$/;
// Le « ^ » DOIT passer : sans lui, « 1{,}44\\times10^{4} » est jugé non
// numérique et toute la notation scientifique — donc presque toute la
// physique — sort du champ. Mesuré : +99 comparaisons en l'ajoutant.
const SEG_OK = /^[\s0-9(){},.+\-^*]*$/;

/**
 * Les unités portées par un segment, avec leur exposant.
 *
 * PIÈGE, payé une fois : `\text{}` ne sert pas QU'aux unités. Il porte aussi
 * les indices de variable — `m_{\text{produits}}`, `\Delta m_{\text{réaction}}`.
 * Les compter comme unités faisait voir « deux unités » dans presque toute
 * chaîne de physique, donc « conversion », donc chaîne écartée : la porte est
 * restée VERTE sur deux défauts injectés exprès. Un `\text{}` précédé de `_{`
 * ou `^{` est un indice, pas une unité.
 */
function unites(seg) {
  const m = seg.replace(/["'`]/g, " ").match(UNITE_FIN);
  if (!m) return [];
  const t = m[1].replace(/[\s.]/g, "").toLowerCase();
  return t ? [t + (m[2] || "").replace(/[{}]/g, "")] : [];
}
// Les guillemets de YAML collent au dernier segment (`math: '… = 1{,}44…'`)
// et rendaient tout le champ illisible : mesuré, un défaut injecté dans un
// champ `math:` passait sous la porte pendant que celui d'un bloc $$ sautait.
// Mais on ne les retire QU'AUX BORNES : à l'intérieur, l'apostrophe est le
// signe de la DÉRIVÉE, et « $(-7)'=0$ » (juste) devenait « (-7) = 0 » (faux).
const deshabille = s => s.replace(UNITE, " ").replace(/\\[,;!:> ]/g, " ");

function valeur(seg) {
  const s = seg
    .replace(/(\d)\\,(\d)/g, "$1$2")          // 24\,948 = vingt-quatre mille…
    .replace(/\\(?:times|cdot)/g, "*")
    .replace(/\\left|\\right|\\big[lgr]?|\\Big[lgr]?/g, " ")
    .replace(/\{,\}/g, ".")
    .replace(/\^\{?(-?\d+)\}?/g, "**($1)")
    .replace(/\s+/g, " ")
    .trim();
  if (!s || !/\d/.test(s)) return null;
  if (!/^[-+*(). 0-9]+$/.test(s.replace(/\*\*/g, "*"))) return null;
  try {
    const v = Function(`"use strict";return (${s})`)();
    return Number.isFinite(v) ? v : null;
  } catch { return null; }
}

/** Chiffres significatifs AFFICHÉS — la tolérance se règle là-dessus. */
function precision(seg) {
  const m = seg.trim().match(/(\d+)\{,\}(\d+)/);
  if (m) return (m[1].replace(/^0+/, "").length || 0) + m[2].length;
  const e = seg.trim().match(/(\d+)/);
  return e ? e[1].replace(/^0+/, "").length || 1 : 6;
}

const fichiers = execSync(
  `find content -name '*.yaml' -o -name '*.md'`, { encoding: "utf8", cwd: REPO }
).trim().split("\n").filter(Boolean).sort();

let comparaisons = 0, horsChamp = 0, conversions = 0, exemptes = 0, blocs = 0;
const faux = [];

/** Analyse une chaîne « a = b = c » et compare les segments évaluables. */
// Les retours de distracteur CITENT l'égalité fausse de l'élève pour la
// défaire : « Tu as sans doute pris $(-1)^{2023} = 1$. Mais 2023 est impair ».
// L'égalité est fausse EXPRÈS. On ne lit donc pas une ligne qui la réfute.
const REFUTE = /\b(?:tu as (?:sans doute )?(?:pris|cru|écrit|calculé|posé)|à tort|au lieu de|erreur|erroné|c'est faux|ne vaut pas|n'est pas égal|confond)/i;

function chaine(bloc, f, l, contexte) {
  if (!/=|\\approx/.test(bloc)) return;
  if (contexte && REFUTE.test(contexte)) return;
  if (/\\equiv|\\pmod|\\%|\\pm/.test(bloc)) return;
  const approx = /\\approx/.test(bloc);
  const segs = bloc.split(/\\approx|=/);
  if (segs.length < 2) return;
  blocs++;

  // Une chaîne qui CHANGE d'unité est une conversion (« 25 min = 25×60 = 1500 s »),
  // pas une identité numérique : le segment du milieu est nu, et le comparer
  // au premier était la moitié des faux positifs mesurés. On écarte la chaîne
  // ENTIÈRE dès que deux unités distinctes y apparaissent.
  const vues = new Set();
  for (const sg of segs) for (const u of unites(sg)) vues.add(u);
  if (vues.size > 1) { conversions++; return; }

  const nus = segs.map(deshabille);
  // Une apostrophe résiduelle = dérivée : le segment n'est pas un nombre.
  const vals = nus.map(x =>
    !/['"`]/.test(x) &&
    SEG_OK.test(x.replace(/\\(times|cdot|left|right|big|Big|[lgr,;! ])/g, ""))
      ? valeur(x) : null);

  for (let k = 0; k + 1 < vals.length; k++) {
    if (vals[k] === null || vals[k + 1] === null) { horsChamp++; continue; }
    // Une égalité NUE (« 5 = 0 ») n'est pas un calcul mais un raisonnement
    // par l'absurde — il y en a trois, tous légitimes, dans le corpus.
    const calcul = x => /[+\-]\s*\d|\\times|\\cdot/.test(x.trim().replace(/^\s*-/, ""));
    if (!calcul(nus[k]) && !calcul(nus[k + 1])) { horsChamp++; continue; }
    comparaisons++;
    // La précision qui compte est celle du RÉSULTAT AFFICHÉ, pas celle du
    // premier nombre de l'expression : pour « 2\\times 7200 = 1{,}44\\times10^{4} »,
    // lire « 2 » donnait 1 chiffre significatif, donc 60 % de tolérance, donc
    // une porte qui laissait passer une erreur de 7 %. Mesuré sur un défaut
    // injecté qui a survécu à trois corrections successives.
    const p = precision(nus[k + 1]);
    const echelle = Math.max(Math.abs(vals[k]), Math.abs(vals[k + 1]));
    const tol = echelle * (approx ? 1.6 : 0.6) * 10 ** (1 - p) + 1e-12;
    if (Math.abs(vals[k] - vals[k + 1]) > tol)
      faux.push({ f, l, g: nus[k].trim(), d: nus[k + 1].trim(),
                  vg: vals[k], vd: vals[k + 1] });
  }
}

for (const f of fichiers) {
  // structures-algebriques raisonne dans Z/nZ, où « 2×3 = 1 » est JUSTE.
  // Treize égalités y sont modulaires sans porter \equiv. Exemption NOMMÉE :
  // si une autre notion passe au modulaire, elle ressortira ici en rouge.
  if (f.includes("structures-algebriques")) { exemptes++; continue; }
  let txt = readFileSync(join(REPO, f), "utf8");

  // 1. Les blocs $$…$$ D'ABORD, et JOINTS : ils courent sur plusieurs lignes,
  //    et les lire ligne à ligne ne montre qu'un fragment — « 2×1,00728 =
  //    6,01607 » sans le « 4,00151 + » qui le précède. Mesuré : quatre faux
  //    positifs, dont un dans la notion même qui a motivé cette porte.
  txt = txt.replace(/\$\$([\s\S]*?)\$\$/g, (tout, dedans, idx) => {
    const l = txt.slice(0, idx).split("\n").length;
    chaine(dedans.replace(/\s+/g, " "), f, l, txt.slice(Math.max(0, idx - 200), idx));
    return tout.replace(/[^\n]/g, " ");   // neutralisé, lignes préservées
  });

  // 2. Les $…$ SIMPLES, appariés et eux aussi joints : un « $T_0 = 2\\pi\\times\\n
  //    1{,}265\\times10^{-3} \\approx 7{,}95\\times10^{-3}$ » coupé par un retour à
  //    la ligne donnait deux nombres sans le 2π qui les relie. Mesuré une fois.
  txt = txt.replace(/\$([^$]*)\$/g, (tout, dedans, idx) => {
    const l = txt.slice(0, idx).split("\n").length;
    const deb = txt.lastIndexOf("\n", idx) + 1;
    chaine(dedans.replace(/\s+/g, " "), f, l, txt.slice(Math.max(0, deb - 200), idx));
    return tout.replace(/[^\n]/g, " ");
  });

  // 3. Ce qui reste sans aucun $ : les champs `math:` de YAML, en KaTeX nu.
  txt.split("\n").forEach((ligne, i) => {
    if (ligne.includes("$")) return;
    // `- math: 'Q = I\\,\\Delta t = …'` : on retire les guillemets de CLÉ et de
    // FIN de ligne, jamais ceux du milieu (l'apostrophe y est une dérivée).
    const nu = ligne
      .replace(/^(\s*-?\s*[\w.-]+:\s*)(['"])/, "$1 ")
      .replace(/(['"])\s*$/, " ");
    chaine(nu, f, i + 1, ligne);
  });
}

for (const x of faux)
  console.error(`  ✗ ${x.f}:${x.l} — « ${x.g} » et « ${x.d} » ne valent pas ` +
    `la même chose (${Number(x.vg.toPrecision(8))} contre ${Number(x.vd.toPrecision(8))})`);

console.log(
  `\n━━ arithmetique-rendue : ${comparaisons} comparaison(s) ÉVALUÉE(S), ` +
  `${faux.length} fausse(s) ━━`);
console.log(
  `   portée : ${blocs} chaîne(s) lue(s), ${horsChamp} paire(s) hors champ (segment non numérique, ` +
  `égalité nue, fragment de ligne), ${conversions} conversion(s) d'unité ` +
  `écartée(s), ${exemptes} fichier(s) exempté(s) (Z/nZ).`);
if (DETAIL && !faux.length)
  console.log(`   aucune fausse égalité — ce qui ne dit rien des ` +
    `${horsChamp} paires que cette porte ne sait pas lire.`);

process.exit(STRICT && faux.length ? 1 : 0);
