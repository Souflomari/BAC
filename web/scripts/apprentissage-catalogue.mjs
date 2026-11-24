/**
 * apprentissage-catalogue.mjs — le catalogue d'apprentissage ne dérive pas des leçons.
 *
 * Vérifie, sans navigateur ni build :
 *   1. pour chaque leçon cataloguée (aujourd'hui `logarithme`) : la signature (liste des `cle`),
 *      chaque question à options (cle présente, nombre d'options, option juste, début du texte de
 *      chaque option dans l'ordre de l'auteur), et qu'aucune question de la leçon ne manque ;
 *   2. pour chaque gabarit catalogué : il existe, ses capacités sont les mêmes, et l'ensemble des
 *      libellés `erreur` qu'il produit (400 graines) est exactement celui du catalogue ;
 *   3. pour le graphe transversal : chaque conception citée existe, chaque [leçon, gabarit,
 *      libellé] existe encore, chaque étape citée existe, chaque capacité est au référentiel.
 *
 * Les leçons en cours de correction (méiose, exponentielle, noyaux, dipôle RC, transmission) ne
 * produisent que des AVERTISSEMENTS (leurs libellés vont bouger) ; `--strict` les rend bloquants.
 *
 *   node --experimental-strip-types web/scripts/apprentissage-catalogue.mjs [--strict]
 *
 * Le moteur d'une leçon est chargé avec un `noyau.js` de remplacement (qui rend seulement le
 * script d'étapes) : aucun fichier de leçon n'est modifié ni exécuté dans un DOM.
 */
import { register } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RACINE = path.dirname(WEB);
const PILOTE = path.join(WEB, "src/components/pilote");
const strict = process.argv.includes("--strict");
const EN_CORRECTION = new Set(["meiose", "exponentielle", "noyaux", "dipole-rc", "transmission"]);

// un noyau de remplacement : il ne monte rien, il rend le script de la leçon
const STUB = `const stub=()=>new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>"":k==="style"?{}:stub(),apply:()=>stub(),set:()=>true});
export function monterLecon(root,construire){const scenes={};const base={E:()=>stub(),lerp:(a,b,t)=>a+(b-a)*t,clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),ease:t=>t,fr:x=>String(x),ty:s=>String(s),esc:s=>String(s),RM:{matches:true},wait:()=>Promise.resolve(),show(){},mtext:()=>stub(),setMT(){},svgPt:()=>({x:0,y:0}),scene:(id,def)=>{const s={id,...def,p:{...(def.p||{})},defaults:{...(def.p||{})},g:stub()};scenes[id]=s;return s;},scenes,hooks:{},S:{ans:{},first:{},lignes:{},vu:{},essais:{}},svg:stub(),defs:stub(),root:stub(),$:()=>stub(),stop(){},etape:()=>null,aller(){},rep:()=>undefined,juste:()=>null,renderMath(){},say(){},plain:t=>t,majNav(){},tween:()=>Promise.resolve(),voir(){}};
return construire(new Proxy(base,{get:(t,k)=>k in t?t[k]:stub()}));}`;
const HOOKS = `export async function resolve(spec, ctx, next) {
  if (/(^|\\/)noyau(\\.js)?$/.test(spec) && ctx.parentURL && ctx.parentURL.includes("/pilote/")) return { url: ${JSON.stringify("data:text/javascript," + encodeURIComponent(STUB))}, shortCircuit: true };
  if (spec.startsWith(".") && !/\\.[cm]?[jt]s$/.test(spec)) { try { return await next(spec + ".js", ctx); } catch {} }
  return next(spec, ctx);
}`;
register("data:text/javascript," + encodeURIComponent(HOOKS));
const leurre = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => "" : leurre), apply: () => leurre });
globalThis.window = leurre;
globalThis.document = leurre;
globalThis.matchMedia = () => ({ matches: true, addEventListener() {} });

const { LOGARITHME } = await import(path.join(WEB, "src/lib/apprentissage-catalogue/logarithme.ts"));
const { GRAPHE } = await import(path.join(WEB, "src/lib/apprentissage-catalogue/graphe-transversal.ts"));
const { hasard } = await import(path.join(PILOTE, "exercices/hasard.js"));
const LECONS = [LOGARITHME];

const erreurs = [];
const avertissements = [];
const signaler = (lecon, msg) => (EN_CORRECTION.has(lecon) && !strict ? avertissements : erreurs).push(`${lecon} : ${msg}`);

const plain = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

const etapesCache = new Map();
async function etapes(lecon) {
  if (!etapesCache.has(lecon)) {
    try {
      const m = await import(path.join(PILOTE, `${lecon}-moteur.js`));
      etapesCache.set(lecon, m.monterPilote(leurre).STEPS);
    } catch (e) {
      etapesCache.set(lecon, null);
      signaler(lecon, `le moteur ne se charge pas hors navigateur (${String(e.message).split("\n")[0]})`);
    }
  }
  return etapesCache.get(lecon);
}
const exosCache = new Map();
async function exercices(lecon) {
  if (!exosCache.has(lecon)) {
    const m = await import(path.join(PILOTE, `exercices/${lecon}.js`));
    const liste = Object.values(m).find((v) => Array.isArray(v) && v.every((x) => x && typeof x.gen === "function")) ?? [];
    const parId = new Map();
    for (const ex of liste) {
      const libelles = new Set();
      for (let g = 0; g < 400; g++) {
        let t;
        try { t = ex.gen(hasard(g)); } catch { continue; }
        for (const q of t.questions || []) {
          for (const o of q.options || []) if (o.erreur) libelles.add(o.erreur);
          for (const p of q.pieges || []) if (p.erreur) libelles.add(p.erreur);
        }
      }
      parId.set(ex.id, { ex, libelles });
    }
    exosCache.set(lecon, parId);
  }
  return exosCache.get(lecon);
}

// le référentiel : les identifiants de capacités existants
const capacites = new Set();
for (const f of readdirSync(path.join(RACINE, "docs/referentiel")).filter((f) => f.endsWith(".yaml"))) {
  const pref = f.replace(/\.yaml$/, "");
  for (const m of readFileSync(path.join(RACINE, "docs/referentiel", f), "utf8").matchAll(/\bid:\s*"([\d.]+)"/g)) capacites.add(`${pref} ${m[1]}`);
}
const verifierCapacite = (lecon, c, ou) => { if (!capacites.has(c)) signaler(lecon, `${ou} : capacité inconnue du référentiel « ${c} »`); };

const conceptions = new Map(GRAPHE.conceptions.map((k) => [k.id, k]));
let nQuestions = 0, nOptions = 0, nGabarits = 0, nLibelles = 0, nRefs = 0;

// 1 et 2 : les leçons cataloguées
for (const cat of LECONS) {
  const steps = await etapes(cat.lecon);
  if (!steps) continue;
  const sig = steps.map((s, i) => (s.cle != null ? String(s.cle) : String(i))).join(",");
  if (cat.signature && cat.signature !== sig) signaler(cat.lecon, "la liste des étapes a changé (signature différente) : relire le catalogue");
  const parCle = new Map(steps.map((s, i) => [s.cle != null ? String(s.cle) : String(i), s]));
  for (const [cle, q] of Object.entries(cat.questions)) {
    nQuestions++;
    const st = parCle.get(cle);
    const P = st && (st.verifie || st.pari);
    if (!P) { signaler(cat.lecon, `l'étape « ${cle} » n'existe plus ou n'a plus d'options`); continue; }
    if (P.opts.length !== q.options.length) signaler(cat.lecon, `« ${cle} » : ${P.opts.length} options dans la leçon, ${q.options.length} au catalogue`);
    const j = P.opts.findIndex((o) => o.ok);
    if ((j < 0 ? null : j) !== q.juste) signaler(cat.lecon, `« ${cle} » : l'option juste est ${j < 0 ? "absente" : j}, le catalogue dit ${q.juste}`);
    q.options.forEach((o, i) => {
      nOptions++;
      const vrai = P.opts[i] ? plain(P.opts[i].t) : "";
      if (!vrai.startsWith(o.t)) signaler(cat.lecon, `« ${cle} » option ${i} : « ${vrai.slice(0, 32)} » au lieu de « ${o.t} »`);
      if (o.e !== "aucune" && o.e !== "inattention" && !conceptions.has(o.e)) signaler(cat.lecon, `« ${cle} » option ${i} : conception inconnue « ${o.e} »`);
      if (q.juste === i && o.e !== "aucune") signaler(cat.lecon, `« ${cle} » : l'option juste porte une erreur`);
    });
    q.capacites.forEach((c) => verifierCapacite(cat.lecon, c, `« ${cle} »`));
  }
  for (const [cle, st] of parCle) if ((st.verifie || st.pari) && !(cle in cat.questions)) signaler(cat.lecon, `l'étape « ${cle} » a des options mais n'est pas au catalogue`);

  const exos = await exercices(cat.lecon);
  for (const [id, g] of Object.entries(cat.gabarits)) {
    nGabarits++;
    const vrai = exos.get(id);
    if (!vrai) { signaler(cat.lecon, `le gabarit « ${id} » n'existe plus`); continue; }
    if (JSON.stringify([...vrai.ex.capacites].sort()) !== JSON.stringify([...g.capacites].sort())) signaler(cat.lecon, `« ${id} » : capacités différentes de celles du gabarit`);
    if (vrai.ex.niveau !== g.niveau) signaler(cat.lecon, `« ${id} » : niveau ${vrai.ex.niveau}, le catalogue dit ${g.niveau}`);
    for (const lib of vrai.libelles) if (!(lib in g.erreurs)) signaler(cat.lecon, `« ${id} » : libellé d'erreur non catalogué « ${lib} »`);
    for (const [lib, e] of Object.entries(g.erreurs)) {
      nLibelles++;
      if (!vrai.libelles.has(lib)) signaler(cat.lecon, `« ${id} » : le libellé « ${lib} » n'est plus produit`);
      if (e !== "aucune" && e !== "inattention" && !conceptions.has(e)) signaler(cat.lecon, `« ${id} » : conception inconnue « ${e} »`);
    }
  }
  for (const id of exos.keys()) if (!(id in cat.gabarits)) signaler(cat.lecon, `le gabarit « ${id} » n'est pas au catalogue`);
}

// 3 : le graphe
for (const k of GRAPHE.conceptions) {
  if (!(k.lecon in GRAPHE.matieres)) erreurs.push(`graphe : « ${k.id} » cite une leçon inconnue « ${k.lecon} »`);
  k.capacites.forEach((c) => verifierCapacite(k.lecon, c, `conception « ${k.id} »`));
  for (const cle of k.etapes ?? []) {
    nRefs++;
    if (EN_CORRECTION.has(k.lecon)) { erreurs.push(`graphe : « ${k.id} » cite une étape de « ${k.lecon} », leçon en correction`); continue; }
    const steps = await etapes(k.lecon);
    if (steps && !steps.some((s) => String(s.cle) === cle)) signaler(k.lecon, `« ${k.id} » cite l'étape « ${cle} », absente`);
  }
  for (const [lecon, gab, lib] of k.exercices ?? []) {
    nRefs++;
    const exos = await exercices(lecon);
    const g = exos.get(gab);
    if (!g) signaler(lecon, `« ${k.id} » cite le gabarit « ${gab} », absent`);
    else if (!g.libelles.has(lib)) signaler(lecon, `« ${k.id} » cite le libellé « ${lib} », que « ${gab} » ne produit plus`);
  }
}
for (const a of GRAPHE.aretes) {
  if (!conceptions.has(a.aval)) erreurs.push(`graphe : arête vers une conception inconnue « ${a.aval} »`);
  if ("conception" in a.amont && !conceptions.has(a.amont.conception)) erreurs.push(`graphe : arête depuis une conception inconnue « ${a.amont.conception} »`);
  if ("capacite" in a.amont) verifierCapacite("graphe", a.amont.capacite, "arête");
  if (!a.raison || !a.exemple || !a.source) erreurs.push(`graphe : arête vers « ${a.aval} » sans raison, exemple ou source`);
}

for (const a of avertissements) console.log(`avertissement  ${a}`);
for (const e of erreurs) console.log(`ÉCART  ${e}`);
console.log(`\n${nQuestions} questions, ${nOptions} options, ${nGabarits} gabarits, ${nLibelles} libellés, ${nRefs} renvois du graphe, ${GRAPHE.aretes.length} arêtes : ${erreurs.length} écart(s), ${avertissements.length} avertissement(s).`);
process.exit(erreurs.length ? 1 : 0);
