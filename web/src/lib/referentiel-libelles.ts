/**
 * Le libellé officiel d'une capacité, lu dans le référentiel (docs/referentiel/,
 * cadres CNEE 2025 recopiés mot pour mot). Identifiant : « maths-sexp 1.2.16 »
 * = fichier maths-sexp.yaml, capacité 1.2.16. Lu au rendu serveur (statique).
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const cache = new Map<string, Map<string, string>>();

function capacitesDe(doc: string): Map<string, string> {
  const deja = cache.get(doc);
  if (deja) return deja;
  const m = new Map<string, string>();
  const f = path.join(process.cwd(), "..", "docs", "referentiel", `${doc}.yaml`);
  if (fs.existsSync(f)) {
    const marcher = (n: unknown): void => {
      if (Array.isArray(n)) return n.forEach(marcher);
      if (n && typeof n === "object") {
        const o = n as Record<string, unknown>;
        if (typeof o.id === "string" && typeof o.libelle === "string") m.set(o.id, o.libelle);
        Object.values(o).forEach(marcher);
      }
    };
    marcher(yaml.load(fs.readFileSync(f, "utf8")));
  }
  cache.set(doc, m);
  return m;
}

/** { "maths-sexp 1.2.16": "Maitriser le calcul algébrique sur les logarithmes." , … } */
export function libellesCapacites(ids: Iterable<string>): Record<string, string> {
  const r: Record<string, string> = {};
  for (const id of ids) {
    const [doc, num] = id.split(" ");
    const l = capacitesDe(doc).get(num);
    if (l) r[id] = l;
  }
  return r;
}
