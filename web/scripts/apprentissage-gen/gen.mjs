// usage: node --experimental-strip-types gen.mjs <lecon>  (lit spec-<lecon>.mjs, écrit le catalogue)
import { register } from "node:module";
import { writeFileSync } from "node:fs";
import path from "node:path";
const WEB = path.dirname(path.dirname(path.dirname(new URL(import.meta.url).pathname)));
const PILOTE = path.join(WEB, "src/components/pilote");
const STUB = `const stub=()=>new Proxy(function(){},{get:(t,k)=>k===Symbol.toPrimitive?()=>"":k==="style"?{}:stub(),apply:()=>stub(),set:()=>true});
export function monterLecon(root,construire){const scenes={};const base={E:()=>stub(),lerp:(a,b,t)=>a+(b-a)*t,clamp:(x,a,b)=>Math.max(a,Math.min(b,x)),ease:t=>t,fr:x=>String(x),ty:s=>String(s),esc:s=>String(s),RM:{matches:true},wait:()=>Promise.resolve(),show(){},mtext:()=>stub(),setMT(){},svgPt:()=>({x:0,y:0}),scene:(id,def)=>{const s=new Proxy({id,...def,p:{...(def.p||{})},defaults:{...(def.p||{})},g:stub()},{get:(t,k)=>k in t||typeof k==="symbol"?t[k]:stub()});scenes[id]=s;return s;},scenes,hooks:{},S:{ans:{},first:{},lignes:{},vu:{},essais:{}},svg:stub(),defs:stub(),root:stub(),$:()=>stub(),stop(){},etape:()=>null,aller(){},rep:()=>undefined,juste:()=>null,renderMath(){},say(){},plain:t=>t,majNav(){},tween:()=>Promise.resolve(),voir(){}};
return construire(new Proxy(base,{get:(t,k)=>k in t?t[k]:stub()}));}`;
const HOOKS = `export async function resolve(spec, ctx, next) {
  if (/(^|\\/)noyau(\\.js)?$/.test(spec) && ctx.parentURL && ctx.parentURL.includes("/pilote/")) return { url: ${JSON.stringify("data:text/javascript," + encodeURIComponent(STUB))}, shortCircuit: true };
  if (spec.startsWith(".") && !/\\.[cm]?[jt]s$/.test(spec)) { try { return await next(spec + ".js", ctx); } catch {} }
  return next(spec, ctx);
}`;
register("data:text/javascript," + encodeURIComponent(HOOKS));
const leurre = new Proxy(function () {}, { get: (t, k) => (k === Symbol.toPrimitive ? () => "" : leurre), apply: () => leurre });
globalThis.window = leurre; globalThis.document = leurre;
globalThis.matchMedia = () => ({ matches: true, addEventListener() {} });
const plain = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const { hasard } = await import(path.join(PILOTE, "exercices/hasard.js"));
const { GRAPHE } = await import(path.join(WEB, "src/lib/apprentissage-catalogue/graphe-transversal.ts"));
const ids = new Set(GRAPHE.conceptions.map((k) => k.id));
const lecon = process.argv[2];
const spec = (await import(path.join(path.dirname(new URL(import.meta.url).pathname), `spec-${lecon}.mjs`))).default;
const J = (x) => JSON.stringify(x);
const lab = (s) => (s === "-" ? "aucune" : s === "i" ? "inattention" : s);
const errs = [];
const steps = (await import(path.join(PILOTE, `${lecon}-moteur.js`))).monterPilote(leurre).STEPS;
const sig = steps.map((s, i) => (s.cle != null ? String(s.cle) : String(i))).join(",");
const lignes = [];
const stats = { q: 0, conc: 0, inat: 0, auc: 0, g: 0, gconc: 0, ginat: 0, gauc: 0 };
for (const s of steps) {
  const P = s.verifie || s.pari; if (!P) continue;
  const cle = String(s.cle);
  const j = P.opts.findIndex((o) => o.ok); const juste = j < 0 ? null : j;
  let sp = spec.q[cle];
  if (!sp) { if (juste === null) sp = [""] ; else { errs.push(`question non spécifiée ${cle}`); continue; } }
  const [capk, ...labs0] = sp;
  const labs = juste === null && labs0.length === 0 ? P.opts.map(() => "-") : labs0;
  if (labs.length !== P.opts.length) errs.push(`${cle}: ${labs.length} étiquettes pour ${P.opts.length} options`);
  const caps = capk ? spec.caps[capk] : [];
  if (!caps) errs.push(`${cle}: capacités inconnues ${capk}`);
  const opts = P.opts.map((o, i) => {
    const e = lab(labs[i] ?? "?");
    if (juste === null && e !== "aucune") errs.push(`${cle}: pari non noté avec étiquette`);
    if (i === juste && e !== "aucune") errs.push(`${cle}: option juste étiquetée`);
    if (e !== "aucune" && e !== "inattention" && !ids.has(e) && !(spec.nouvelles || []).includes(e)) errs.push(`${cle}: conception inconnue ${e}`);
    if (i !== juste) { if (e === "aucune") stats.auc++; else if (e === "inattention") stats.inat++; else stats.conc++; }
    return `{ t: ${J(Array.from(plain(o.t)).slice(0, 32).join("").trimEnd())}, e: ${J(e)} }`;
  });
  stats.q++;
  const key = /^[a-z][a-z0-9]*$/i.test(cle) ? cle : J(cle);
  lignes.push(`    ${key}: { capacites: ${capk ? capk : "[]"}, juste: ${juste}, options: [${opts.join(", ")}] },`);
}
for (const k of Object.keys(spec.q)) if (!steps.some((s) => String(s.cle) === k && (s.verifie || s.pari))) errs.push(`spec: étape inconnue ${k}`);
const m = await import(path.join(PILOTE, `exercices/${lecon}.js`));
const liste = Object.values(m).find((v) => Array.isArray(v) && v.every((x) => x && typeof x.gen === "function")) ?? [];
const glignes = [];
for (const ex of liste) {
  const lib = []; const nopt = new Map();
  for (let g = 0; g < 400; g++) { let t; try { t = ex.gen(hasard(g)); } catch { continue; }
    for (const q of t.questions || []) {
      if (q.type === "qcm") nopt.set(q.options.length, (nopt.get(q.options.length) || 0) + 1);
      for (const o of [...(q.options || []), ...(q.pieges || [])]) if (o.erreur && !lib.includes(o.erreur)) lib.push(o.erreur); } }
  const mode = [...nopt].sort((a, b) => b[1] - a[1] || b[0] - a[0])[0]?.[0] ?? 3;
  const sp = spec.g[ex.id];
  if (!sp) { errs.push(`gabarit non spécifié ${ex.id} (${lib.length} libellés: ${J(lib)})`); continue; }
  // une table : soit un tableau dans l'ordre où les libellés apparaissent, soit { libellé: étiquette }
  const parLib = Array.isArray(sp) ? null : sp;
  if (parLib) { for (const l of Object.keys(parLib)) if (!lib.includes(l)) errs.push(`${ex.id}: libellé inconnu ${J(l)}`); }
  else if (sp.length !== lib.length) errs.push(`${ex.id}: ${sp.length} étiquettes pour ${lib.length} libellés ${J(lib)}`);
  const etiq = (l, i) => (parLib ? parLib[l] : sp[i]) ?? "?";
  const er = lib.map((l, i) => {
    const e = lab(etiq(l, i));
    if (e === "?") errs.push(`${ex.id}: libellé sans étiquette ${J(l)}`);
    if (e !== "aucune" && e !== "inattention" && !ids.has(e) && !(spec.nouvelles || []).includes(e)) errs.push(`${ex.id}: conception inconnue ${e}`);
    if (e === "aucune") stats.gauc++; else if (e === "inattention") stats.ginat++; else stats.gconc++;
    return `${J(l)}: ${J(e)}`;
  });
  stats.g++;
  glignes.push(`    ${J(ex.id)}: {\n      capacites: ${J(ex.capacites).replace(/","/g, "\", \"")}, niveau: ${ex.niveau}, optionsQcm: ${mode},\n      erreurs: {\n        ${er.join(",\n        ")},\n      },\n    },`);
  if (process.env.VOIR) console.log(ex.id, lib.map((l, i) => `\n   ${l} => ${lab(etiq(l, i))}`).join(""));
}
for (const k of Object.keys(spec.g)) if (!liste.some((x) => x.id === k)) errs.push(`spec: gabarit inconnu ${k}`);
if (errs.length) { console.log(errs.join("\n")); process.exit(1); }
const NOM = spec.nom;
const caps = Object.entries(spec.caps).map(([k, v]) => `const ${k} = ${J(v).replace(/","/g, '", "')};`).join("\n");
const out = `${spec.entete.trim()}
import type { CatalogueLecon } from "../apprentissage";

${caps}

export const ${NOM}: CatalogueLecon = {
  lecon: ${J(lecon)},
  matiere: ${J(spec.matiere)},
  signature:
    ${J(sig)},
  questions: {
${lignes.join("\n")}
  },
  gabarits: {
${glignes.join("\n")}
  },
};
`;
writeFileSync(path.join(WEB, `src/lib/apprentissage-catalogue/${lecon}.ts`), out);
console.log(lecon, J(stats));
