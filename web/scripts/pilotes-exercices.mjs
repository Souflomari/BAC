/**
 * pilotes-exercices — le vérificateur des exercices des leçons pilotes.
 *
 *   node scripts/pilotes-exercices.mjs [--tirages 300] [--porte]
 *
 * Chaque exercice est un gabarit dont la réponse est calculée par le code
 * (src/components/pilote/exercices/). Ce script rejoue des centaines de
 * tirages de chaque gabarit et refuse :
 *   - une capacité absente du référentiel officiel (docs/referentiel/) ;
 *   - un tirage sans énoncé, sans question ou sans correction ;
 *   - un QCM sans exactement une bonne réponse, avec deux options
 *     identiques, ou une mauvaise réponse sans explication ;
 *   - une réponse numérique non finie, sans tolérance, ou une valeur
 *     « piège » qui se confond avec la bonne réponse ;
 *   - une formule que KaTeX refuse ;
 *   - un tirage qui change d'une fois sur l'autre avec la même graine.
 * C'est RULES 15 appliqué aux exercices des pilotes.
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { CATALOGUE } from "../src/components/pilote/exercices/catalogue.js";
import { defautsGabarit, defautsTirage } from "../src/components/pilote/exercices/modele.js";
import { hasard } from "../src/components/pilote/exercices/hasard.js";
import { rendre, formule } from "../src/components/pilote/exercices/texte.js";

const args = process.argv.slice(2);
const i = args.indexOf("--tirages");
const TIRAGES = i >= 0 ? Number(args[i + 1]) : 300;
const PORTE = args.includes("--porte");

const REF = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../../docs/referentiel");
const connues = new Set();
for (const f of fs.readdirSync(REF).filter((x) => x.endsWith(".yaml") && x !== "examen.yaml")) {
  const doc = f.replace(/\.yaml$/, "");
  const marcher = (n) => {
    if (Array.isArray(n)) return n.forEach(marcher);
    if (n && typeof n === "object") {
      if (n.id && n.libelle) connues.add(`${doc} ${n.id}`);
      Object.values(n).forEach(marcher);
    }
  };
  marcher(yaml.load(fs.readFileSync(path.join(REF, f), "utf8")));
}

let defauts = 0;
for (const [pilote, liste] of Object.entries(CATALOGUE)) {
  const ids = new Set();
  let tirages = 0;
  for (const ex of liste) {
    const dg = defautsGabarit(ex, connues);
    if (ids.has(ex.id)) dg.push("identifiant en double");
    ids.add(ex.id);
    const vus = new Map();
    const enonces = new Set();
    for (let g = 1; g <= TIRAGES; g++) {
      let t, t2;
      try {
        t = ex.gen(hasard(g));
        t2 = ex.gen(hasard(g));
      } catch (e) {
        vus.set(`le gabarit plante : ${e.message}`, g);
        continue;
      }
      tirages++;
      if (JSON.stringify(t) !== JSON.stringify(t2)) vus.set("même graine, tirage différent", g);
      for (const d of defautsTirage(ex, t, { capacitesConnues: connues, rendre, formule })) if (!vus.has(d)) vus.set(d, g);
      enonces.add(JSON.stringify([t.enonce, t.questions.map((q) => q.q)]));
    }
    const tous = [...dg, ...[...vus].map(([d, g]) => `${d} (graine ${g})`)];
    if (tous.length) {
      defauts += tous.length;
      console.log(`✗ ${pilote} · ${ex.id}`);
      for (const d of tous.slice(0, 6)) console.log(`    ${d}`);
      if (tous.length > 6) console.log(`    … et ${tous.length - 6} autre(s)`);
    }
    if (enonces.size < 2) console.log(`  info · ${pilote} · ${ex.id} : un seul énoncé sur ${TIRAGES} tirages`);
  }
  console.log(`${pilote} : ${liste.length} exercice(s), ${tirages} tirages vérifiés`);
}
if (defauts) {
  console.log(`pilotes-exercices : ${defauts} défaut(s)`);
  if (PORTE) process.exit(1);
} else console.log("pilotes-exercices : aucun défaut ✓");
