/**
 * accents-campagne.mjs — la passe qui REND leurs accents au texte de l'eleve.
 *
 * CE N'EST PAS UNE PORTE. La porte, c'est `accents-manquants.mjs` : elle lit
 * le RENDU et refuse un mot francais ecrit sans ses accents. Ce script-ci est
 * l'outil de CAMPAGNE qui repare le corpus une fois, a la main, sous revue.
 *
 * POURQUOI IL A FALLU L'ECRIRE (2026-09-05). La porte annoncait « aucun mot
 * francais desaccentue sur 65 pages » — et le corpus contenait 938 occurrences
 * de formes nues dans le texte que l'eleve lit : « coherent », « etablie »,
 * « continuite », « recurrence », « champ magnetique ». La porte ne mentait
 * pas : elle mesurait sa LISTE, qui comptait 654 formes. Une pastille verte ne
 * dit pas que tout a ete mesure (ADR 0031, decision 9).
 *
 * COMMENT LES CANDIDATS SONT TROUVES, sans dictionnaire francais hors ligne :
 * par PREUVE INTERNE. Une forme nue est suspecte quand sa variante accentuee
 * existe deja dans le corpus et y est au moins cinq fois plus frequente —
 * « empeche » (2) contre « empeche » accentue (132). Le corpus est son propre
 * dictionnaire.
 *
 * TROIS GARDE-FOUS, et le troisieme est le seul qui compte vraiment :
 *
 *   1. Une seule variante accentuee. « piege » peut vouloir dire « piege » ou
 *      « piege » accentue autrement : ecarte, jamais devine.
 *   2. Contexte francais. Le mot doit etre entoure de francais — sinon c'est
 *      un chemin de fichier (`docs/sujets/maths/arithmetique.md`) ou de
 *      l'anglais. Les chemins sont refuses separement.
 *   3. LA RELECTURE DU DIFF, MOT PAR MOT. Les deux premiers ne suffisent pas.
 *      Trois faux positifs ont ete trouves ainsi, et AUCUN autrement :
 *        · « conjugue l'egalite tout entiere » — un IMPERATIF, pas un participe
 *        · « on conjugue d, pas b ni c »       — idem
 *        · « L'aveuglement des sociologues »   — le NOM, pas l'adverbe
 *      Ils sont maintenant dans EXCLUS. Une quatrieme passe en trouvera
 *      d'autres : la liste EXCLUS est faite pour grandir, pas pour etre juste
 *      du premier coup.
 *
 * Ce qu'il ne touche jamais : les cles YAML, les commentaires, le TeX, le code
 * inline, les blocs de code, les commentaires HTML. Et un fichier YAML qui ne
 * se recharge pas apres correction est laisse INTACT.
 *
 * Apres la passe : relire `git diff --word-diff`, puis reconstruire et relancer
 * `accents-manquants.mjs` sur les 62 lecons — c'est le RENDU qui tranche, pas
 * ce script. Les formes effectivement corrigees sont ensuite ajoutees a
 * `accents.mots.json` pour que la porte garde le terrain repris.
 *
 *   node scripts/accents-campagne.mjs              (simulation)
 *   node scripts/accents-campagne.mjs --appliquer  (ecrit)
 *
 * A LANCER DEPUIS web/.
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const WEB = process.cwd();
const ROOT = path.join(WEB, "..", "content");
const APPLIQUE = process.argv.includes("--appliquer");
// `exercises.yaml` — l'exercice SOMMET de chaque lecon — manquait a cette
// liste. Il est servi a l'eleve comme le reste, simplement derriere une
// tentative : c'est une raison de plus de le corriger, pas une raison de
// l'oublier. Ajoute le 2026-09-05, 49 fichiers.
const RENDU = /(?:^|\/)(lesson\.md|items\.yaml|bank\.yaml|checkpoints\.yaml|exercises\.yaml|retenir\.md|figures\.yaml)$/;

// Formes nues qui SONT du francais valide, ou dont la correction est ambigue,
// ou qui sont des mots anglais susceptibles d'etre voulus. Exclues sans debat :
// mieux vaut en manquer que d'en inventer.
const EXCLUS = new Set([
  "assume", "dirige", "isolement", "guide", "reforme", "parait", "croitre", "coute",
  "disparaitre", "reconnaitre", "reconnait", "cloture", "ambigue", "incline", "habille",
  "portes", "poses", "demandes", "annonces", "conserves", "combines", "consommes",
  "mobilises", "empruntes", "remplaces", "orientes", "captes", "utilises", "reserves",
  "these", "reunis", "etablis", "moities", "fixees", "tirees", "dipoles", "graduee",
  "predomine", "suggere", "prete", "legende", "decoupe", "preserve", "emetteur",
  "detecteur", "filiere", "etalon", "etage", "present", "evidence", "credit",
  "tolerance", "dependent", "resistor", "infinite", "decision", "revision", "creation",
  "detection", "separation", "division",
  // Verifiees UNE PAR UNE dans le diff de la premiere passe : la forme nue est
  // une conjugaison valide, et la passe les avait faussement accentuees.
  // « conjugue l'egalite tout entiere » (imperatif) devenait « conjugue » accentue.
  "conjugue", "honore", "aveuglement",
  // Trouvees a la DEUXIEME passe, toujours par relecture du diff : chacune
  // est une conjugaison ou un nom valide sans accent.
  "serre", "colore", "tires", "video", "separes",
]);


// ── les candidats, par PREUVE INTERNE ──────────────────────────────────────
// Une forme sans accent est suspecte quand sa variante accentuee existe dans
// le corpus ET y est au moins 5x plus frequente. Aucun dictionnaire externe :
// le corpus est son propre dictionnaire, et il ne peut pas etre indisponible.
const CLES_TEXTE = /^$|^(text|label|stem|question|prompt|note|title|titre|description|feedback|reasoning|explanation|hint|answer|statement|body|content|summary|intro|conclusion|caption|alt|misconception|correct_feedback|why|because)$/i;
const sansAccent = (x) => x.normalize("NFD").replace(/\p{M}/gu, "");

function candidats() {
  const chaines = [];
  const recolte = (v, f, cle) => {
    if (typeof v === "string") { if (CLES_TEXTE.test(cle)) chaines.push(v); return; }
    if (Array.isArray(v)) { for (const x of v) recolte(x, f, cle); return; }
    if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) recolte(x, f, k);
  };
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) { walk(p); continue; }
      const rel = path.relative(ROOT, p);
      if (!RENDU.test(rel)) continue;
      const brut = fs.readFileSync(p, "utf8");
      if (/\.ya?ml$/.test(rel)) { let doc; try { doc = yaml.load(brut); } catch { continue; } recolte(doc, rel, ""); }
      else chaines.push(brut.replace(/```[\s\S]*?```/g, " ").replace(/<!--[\s\S]*?-->/g, " "));
    }
  })(ROOT);

  const occ = new Map();
  for (const t of chaines) {
    const net = t.replace(/\$[^$]*\$/g, " ").replace(/\\[a-zA-Z]+/g, " ").replace(/`[^`]*`/g, " ").replace(/https?:\/\/\S+/g, " ");
    for (const m of net.matchAll(/(?<![\p{L}\p{M}\-_])[\p{L}\p{M}]{5,}(?![\p{L}\p{M}\-_])/gu)) {
      const w = m[0].toLowerCase();
      occ.set(w, (occ.get(w) || 0) + 1);
    }
  }
  const parNu = new Map();
  for (const [w, n] of occ) {
    if (w === sansAccent(w)) continue;
    const k = sansAccent(w);
    if (!parNu.has(k)) parNu.set(k, []);
    parNu.get(k).push([w, n]);
  }
  const out = [];
  for (const [w, n] of occ) {
    if (w !== sansAccent(w)) continue;
    const acc = parNu.get(w);
    if (!acc) continue;
    if (acc.reduce((a, [, c]) => a + c, 0) < 5 * n) continue;
    out.push({ w, n, acc: acc.map(([a]) => a) });
  }
  return out;
}

const cands = candidats();
const MAP = new Map();
for (const c of cands) {
  if (c.acc.length !== 1 || EXCLUS.has(c.w)) continue;
  MAP.set(c.w, c.acc[0]);
}

const STOP = /\b(le|la|les|des|une|un|du|de|est|sont|qui|que|pour|dans|avec|sur|par|cette|ce|se|on|il|elle|nous|vous|donc|mais|plus|moins|aux|au|leur|son|sa|ses|pas|ne|en|et|a|ou)\b/gi;
const ACCENT = /[\u00e0\u00e2\u00e4\u00e7\u00e8\u00e9\u00ea\u00eb\u00ee\u00ef\u00f4\u00f6\u00f9\u00fb\u00fc\u0153]/;
const ELIDE = /\b[ldcjmnstqu]\u2019|\b[ldcjmnstqu]'/gi;
const estFrancais = (ctx) => {
  const n = (ctx.match(STOP) || []).length + (ctx.match(ELIDE) || []).length;
  return n >= 3 || (n >= 1 && ACCENT.test(ctx));
};
const majuscule = (s, ref) => {
  // « ARRET » est une emphase, pas une phrase : la rendre « Arret » puis
  // « Arrêt » abîmerait le texte. Trois cas, dans cet ordre.
  if (ref.length > 1 && ref === ref.toUpperCase()) return s.toUpperCase();
  if (ref[0] === ref[0].toUpperCase()) return s[0].toUpperCase() + s.slice(1);
  return s;
};

let change = 0;
let saute = 0;
const parForme = new Map();
const sautes = [];
const fichiers = new Set();
const MOTIF = new RegExp("(?<![\\p{L}\\p{M}\\-_])(" + [...MAP.keys()].join("|") + ")(?![\\p{L}\\p{M}\\-_])", "giu");

function corrigeTexte(t, rel) {
  return t.replace(MOTIF, (m, _g, off, whole) => {
    const bas = m.toLowerCase();
    const cible = MAP.get(bas);
    if (!cible) return m;
    const autour = whole.slice(Math.max(0, off - 30), off + m.length + 30);
    if (/[\w.-]*\/[\w./-]*/.test(autour.slice(Math.max(0, autour.indexOf(m) - 12), autour.indexOf(m) + m.length + 12))) {
      saute++; sautes.push(rel + " | CHEMIN ..." + autour.replace(/\s+/g, " ").trim().slice(0, 80)); return m;
    }
    const ctx = whole.slice(Math.max(0, off - 70), off + 70);
    if (!estFrancais(ctx)) {
      saute++;
      sautes.push(rel + " | ..." + ctx.replace(/\s+/g, " ").trim().slice(0, 90) + "...");
      return m;
    }
    change++;
    parForme.set(bas, (parForme.get(bas) || 0) + 1);
    fichiers.add(rel);
    return majuscule(cible, m);
  });
}

const OUVRE = "";
const FERME = "";
// LES DIRECTIVES DE CONTENU SONT DU CODE (2026-09-05). `[[video:balancement]]`
// est lu par le rendu : la passe l'avait accentue en `[[vidéo:...]]` et
// l'integration video se serait tue en silence. Un slug de figure y avait
// echappe par accident — il porte un trait d'union, que la frontiere de mot
// exclut deja. Ne pas dependre d'un accident : on masque la directive entiere.
const masque = (s, jetons) =>
  s.replace(/\b[a-z]{4,}:[a-z0-9][a-z0-9-]{2,}|\[\[[^\]]*\]\]|\$\$[\s\S]*?\$\$|\$[^$\n]*\$|`[^`\n]*`|\\[a-zA-Z]+/g, (x) => {
    jetons.push(x);
    return OUVRE + (jetons.length - 1) + FERME;
  });
const demasque = (s, jetons) =>
  s.replace(new RegExp(OUVRE + "(\\d+)" + FERME, "g"), (_, i) => jetons[+i]);

// Les valeurs de chaines YAML uniquement : jamais une cle, jamais un commentaire.
function corrigeYaml(brut, rel) {
  const out = [];
  let zoneVerbatim = 0;
  for (const l of brut.split("\n")) {
    if (/^\s*#/.test(l)) { out.push(l); continue; }
    // TEXTE D'EXAMEN TRANSCRIT VERBATIM : on n'y touche pas. Les sujets
    // officiels portent leurs propres coquilles, le corpus les reproduit et
    // les signale d'un « (sic) ». La premiere passe avait accentue « la
    // reception *(sic)* » du rattrapage 2012 — la marque devenait absurde et
    // la fidelite au sujet, perdue.
    // Une annonce (« Coquilles de langue reproduites verbatim, non réparées : »)
    // est suivie de la LISTE des citations, sur les lignes d'apres, qui ne
    // portent plus la marque. La zone protegee court donc six lignes.
    if (/\(\s*sic|tel qu.imprim|verbatim|non r[ée]par|non corrig/i.test(l)) { zoneVerbatim = 6; out.push(l); continue; }
    if (zoneVerbatim > 0) { zoneVerbatim--; out.push(l); continue; }
    const m = l.match(/^(\s*(?:-\s*)?(?:[A-Za-z_][\w-]*:\s*)?)(.*)$/);
    const tete = m[1];
    let corps = m[2];
    if (/^\s*$/.test(corps)) { out.push(l); continue; }
    let queue = "";
    const iC = corps.search(/\s+#\s/);
    if (iC >= 0) { queue = corps.slice(iC); corps = corps.slice(0, iC); }
    const jetons = [];
    corps = demasque(corrigeTexte(masque(corps, jetons), rel), jetons);
    out.push(tete + corps + queue);
  }
  return out.join("\n");
}

function corrigeMd(brut, rel) {
  const jetons = [];
  let t = brut
    .replace(/```[\s\S]*?```/g, (x) => { jetons.push(x); return OUVRE + (jetons.length - 1) + FERME; })
    .replace(/<!--[\s\S]*?-->/g, (x) => { jetons.push(x); return OUVRE + (jetons.length - 1) + FERME; });
  t = masque(t, jetons);
  t = corrigeTexte(t, rel);
  return demasque(t, jetons);
}

(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    const rel = path.relative(ROOT, p);
    if (!RENDU.test(rel)) continue;
    const brut = fs.readFileSync(p, "utf8");
    const neuf = /\.ya?ml$/.test(rel) ? corrigeYaml(brut, rel) : corrigeMd(brut, rel);
    if (neuf !== brut && APPLIQUE) {
      if (/\.ya?ml$/.test(rel)) {
        try { yaml.load(neuf); } catch (err) {
          console.error("YAML casse, fichier laisse intact :", rel, err.message);
          continue;
        }
      }
      fs.writeFileSync(p, neuf);
    }
  }
})(ROOT);

console.log((APPLIQUE ? "APPLIQUE" : "SIMULATION") + " - formes surveillees :", MAP.size);
console.log("corrections :", change, "dans", fichiers.size, "fichier(s) | ignorees faute de contexte francais :", saute);
console.log("\ntop formes :");
for (const [w, n] of [...parForme].sort((a, b) => b[1] - a[1]).slice(0, 30)) {
  console.log("  " + w.padEnd(20) + n + "x -> " + MAP.get(w));
}
if (sautes.length) {
  console.log("\nignorees (echantillon) :");
  for (const s of sautes.slice(0, 14)) console.log("  " + s);
}
