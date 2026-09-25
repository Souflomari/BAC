/**
 * figures-id-divergents.mjs — deux figures d'une même leçon qui définissent le
 * MÊME identifiant DIFFÉREMMENT, alors que quelque chose le déréférence.
 *
 * POURQUOI CETTE PORTE EST SI ÉTROITE, ET POURQUOI C'EST LE SUJET.
 *
 * Dans une page, les figures sont INLINÉES. Leurs identifiants internes se
 * retrouvent donc tous dans le même document, et ils s'y répètent : mesuré le
 * 2026-09-21 sur les 62 leçons rendues, **189 `#step-1`**, plus une poignée de
 * dégradés et d'états. C'est sans effet — `MediaDiagram` masque les étapes en
 * réécrivant le MARKUP de chaque figure, `StagedFigure` interroge son propre
 * `svgRoot`, et jamais le document.
 *
 * `ancres-uniques` avait déjà tranché : armer une porte sur « aucun id
 * dupliqué » serait **rouge sur un fait inoffensif, et finirait désarmée**.
 * C'est juste, et cette porte-ci ne le fait pas.
 *
 * Ce qu'elle garde est la SEULE condition qui blesse. En SVG, `url(#id)` se
 * résout dans TOUT le document, pas dans la figure. Deux définitions du même
 * id : c'est la PREMIÈRE qui gagne, partout. Tant que les deux sont
 * identiques, personne ne voit rien — c'est l'état d'aujourd'hui, vérifié :
 * les deux `liquid-grad` d'`electrolyse` sont identiques à l'octet près, et
 * les quatre `r-body-grad` de `rlc-serie` viennent du même fichier posé quatre
 * fois.
 *
 * Le jour où quelqu'un modifie UNE des deux définitions — changer la couleur
 * du liquide dans une des deux cellules —, la figure éditée continue de
 * peindre avec l'ancienne, et **rien ne le dit**. Ni erreur, ni avertissement,
 * ni différence de pixels sur la figure qu'on vient de toucher. C'est un piège
 * posé pour le prochain auteur, pas un défaut d'aujourd'hui.
 *
 * TROIS CONDITIONS, toutes nécessaires : même id, défini par deux figures,
 * définitions DIFFÉRENTES, et l'id déréférencé par `url(#…)` ou `href="#…"`.
 * Deux sur trois ne font pas rouge.
 *
 * ── L'UNITÉ, ET POURQUOI ELLE N'EST PAS « LA NOTION » ─────────────────────
 * La première version groupait par NOTION : deux figures d'une même leçon.
 * C'était trop étroit, et l'erreur est celle de la journée — l'unité de mesure
 * plus petite que celle où vit le défaut. **Une page d'ÉPREUVE inline les
 * figures de plusieurs notions à la fois** : deux notions qui n'ont jamais
 * partagé une page de leçon se retrouvent côte à côte dans un sujet de bac, et
 * la collision d'identifiants y est exactement aussi silencieuse.
 *
 * L'unité est donc le CORPUS. C'est plus strict que nécessaire — deux notions
 * qui ne se croiseront jamais pourraient diverger sans dommage —, mais cela
 * évite de modéliser quelles pages peuvent réunir quelles figures, et c'est
 * un modèle qui se périmerait au premier assembleur d'épreuves modifié.
 * Mesuré avant de trancher : **0 collision inter-notions aujourd'hui**, donc
 * la règle stricte ne coûte rien et ne demande aucune exemption.
 *
 *   node scripts/figures-id-divergents.mjs [--porte]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CONTENU = path.join(path.dirname(WEB), "content");
const porte = process.argv.includes("--porte");

/** Le sous-arbre de l'élément qui porte cet id, espaces normalisés. */
function definition(svg, id) {
  const ouvre = new RegExp(`<([a-zA-Z][\\w:-]*)\\b[^>]*\\bid="${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
  const m = ouvre.exec(svg);
  if (!m) return null;
  const tag = m[1];
  //  Auto-fermant : tout tient dans la balise.
  const finBalise = svg.indexOf(">", m.index);
  if (svg[finBalise - 1] === "/") return svg.slice(m.index, finBalise + 1).replace(/\s+/g, " ").trim();
  //  Sinon on compte les ouvertures/fermetures du MÊME tag, car un <g> peut
  //  contenir des <g>.
  const jeton = new RegExp(`<${tag}\\b|</${tag}>`, "g");
  jeton.lastIndex = finBalise;
  let profondeur = 1, j;
  while ((j = jeton.exec(svg))) {
    profondeur += j[0][1] === "/" ? -1 : 1;
    if (profondeur === 0) return svg.slice(m.index, j.index + j[0].length).replace(/\s+/g, " ").trim();
  }
  return svg.slice(m.index).replace(/\s+/g, " ").trim();
}

let notions = 0, fichiers = 0, idsVus = 0;
const ecarts = [];

//  UN SEUL registre pour tout le corpus (voir l'en-tête : l'unité n'est pas la
//  notion, parce qu'une épreuve réunit les figures de plusieurs notions).
const defs = new Map();      // id → (chemin de figure → définition normalisée)
const references = new Set(); // ids déréférencés par n'importe quelle figure

for (const matiere of fs.readdirSync(CONTENU)) {
  const dm = path.join(CONTENU, matiere);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const notion of fs.readdirSync(dm)) {
    const dn = path.join(dm, notion);
    if (!fs.statSync(dn).isDirectory()) continue;
    const media = path.join(dn, "media");
    if (!fs.existsSync(media)) continue;
    notions++;
    for (const f of fs.readdirSync(media)) {
      if (!f.endsWith(".svg")) continue;
      fichiers++;
      const svg = fs.readFileSync(path.join(media, f), "utf8");
      for (const m of svg.matchAll(/\burl\(#([^)"'\s]+)\)/g)) references.add(m[1]);
      for (const m of svg.matchAll(/\b(?:xlink:)?href="#([^"]+)"/g)) references.add(m[1]);
      for (const m of svg.matchAll(/\bid="([^"]+)"/g)) {
        const id = m[1];
        idsVus++;
        if (!defs.has(id)) defs.set(id, new Map());
        defs.get(id).set(`${matiere}/${notion}/${f}`, definition(svg, id));
      }
    }
  }
}

for (const [id, parFigure] of defs) {
  if (parFigure.size < 2) continue;             // une seule figure le définit
  if (!references.has(id)) continue;            // personne ne s'en sert
  const distinctes = new Set([...parFigure.values()]);
  if (distinctes.size < 2) continue;            // définitions identiques : inoffensif
  const lesNotions = [...new Set([...parFigure.keys()].map((k) => k.split("/").slice(0, 2).join("/")))];
  ecarts.push(
    `  ✗ #${id} — ${parFigure.size} figures le définissent, ${distinctes.size} définitions ` +
    `DIFFÉRENTES, et il est déréférencé\n` +
    `      notion(s) : ${lesNotions.join(", ")}${lesNotions.length > 1 ? "   ← elles se croisent sur une page d'épreuve" : ""}\n` +
    [...parFigure.keys()].map((f) => `        · ${f}`).join("\n")
  );
}

console.log(`\n${notions} notions · ${fichiers} figures · ${idsVus} identifiants lus`);
if (ecarts.length === 0) {
  console.log(
    `\nAucun identifiant déréférencé n'est défini de DEUX façons DANS TOUT LE CORPUS.\n` +
    `Les doublons qui restent (les groupes « step-N », les dégradés posés plusieurs fois)\n` +
    `sont identiques à l'octet près : la première définition gagne, et elle dit la même\n` +
    `chose que les autres. L'unité est le corpus et non la notion, parce qu'une page\n` +
    `d'épreuve réunit les figures de plusieurs notions.`
  );
} else {
  console.log(`\n${ecarts.length} écart(s) :\n`);
  for (const e of ecarts) console.log(e);
}
if (porte && ecarts.length > 0) {
  console.error(`\n━━ porte identifiants de figures : la première définition gagne, partout ━━`);
  console.error(`   En SVG, « url(#id) » se résout dans TOUT le document, pas dans la figure.`);
  console.error(`   Deux définitions du même id sur une page : la seconde est ignorée, sans`);
  console.error(`   un mot. Renommer l'identifiant de l'une des deux figures suffit.`);
  process.exit(1);
}
