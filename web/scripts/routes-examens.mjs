/**
 * routes-examens.mjs — imprime les routes des 39 épreuves, séparées par des
 * espaces, pour les portes qui balaient le rendu.
 *
 * POURQUOI CE FICHIER EXISTE (2026-09-05). Les pages d'épreuve n'avaient
 * JAMAIS été balayées. La liste de routes des portes ne portait que
 * `/examens` — la page de LISTE — et une seule page de sujet, ajoutée à la
 * main. Écrire les 39 identifiants en dur dans le YAML de CI les aurait figés
 * au jour de l'écriture : le corpus d'épreuves grandit, et une liste figée
 * aurait rendu vertes les épreuves ajoutées ensuite, sans jamais les ouvrir.
 * La liste se lit donc là où elle est VRAIE — `lib/examens.ts`, la même
 * fonction que la page /examens elle-même.
 *
 *   node scripts/routes-examens.mjs   →  /examens/sm-2025-normale /examens/…
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

const routes = listEpreuves().map((e) => `/examens/${e.id}`);
if (routes.length === 0) {
  // ⚠️ `lib/content.ts` résout la racine du contenu depuis le répertoire
  // courant : lancé ailleurs que dans web/, il rend une liste VIDE sans
  // erreur. Un zéro silencieux ici viderait la portée des deux portes.
  console.error("routes-examens : 0 épreuve — lancé depuis le mauvais répertoire ? (il faut web/)");
  process.exit(1);
}
console.log(routes.join(" "));
