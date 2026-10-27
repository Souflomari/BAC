#!/usr/bin/env node
/**
 * constantes-physiques — la valeur est-elle juste CONTRE LE MONDE ?
 *
 * POURQUOI. `arithmetique-rendue` relit les chaînes « a = b = c » et vérifie
 * que les segments s'accordent ENTRE EUX. Son en-tête nomme lui-même ce
 * qu'elle ne peut pas voir, et demande que ce soit mesuré plutôt que taillé
 * au silence (ADR 0031) : « une chaîne dont TOUS les segments sont justes
 * entre eux mais fausse par rapport au MONDE ». Deux masses fausses qui se
 * compensent passent sa porte. Une célérité de la lumière écrite
 * 3{,}00\times10^{7} aussi : l'arithmétique qui en découle sera impeccable.
 *
 * Cette porte-ci lit l'autre moitié : quelques grandeurs dont la valeur n'est
 * pas une affaire d'accord interne mais de fait physique.
 *
 * DEUX SENS, tous deux franchs :
 *   1. UNE CONSTANTE DÉCLARÉE FAUSSE. Le symbole ET l'unité doivent être
 *      présents — c'est la seule façon de distinguer la célérité `c` du
 *      coefficient `c` d'un trinôme, la pesanteur `g` du gramme, la constante
 *      de Planck `h` d'un accroissement. Mesuré à l'armement : 92 déclarations
 *      lues, 0 fausse (c : 3,00×10⁸ ×16 et 2,9979×10⁸ ×1 ; g : 9,8 ×38 et
 *      10 ×29 — les deux légitimes, 10 étant la simplification admise au bac ;
 *      N_A : 6,02×10²³ ; h : 6,63×10⁻³⁴ ; e : 1,6×10⁻¹⁹ ×6).
 *   2. UNE VITESSE QUI DÉPASSE c. Aucun arrondi ne l'excuse. 1 655 vitesses
 *      lues, 3 au-dessus de c — et les TROIS sont de la pédagogie voulue :
 *      elles nomment le piège pour le désamorcer (« ce résultat est
 *      physiquement interdit »). Elles sont exemptées NOMMÉMENT ci-dessous,
 *      jamais par motif : un motif sur « piège » ou « impossible » serait une
 *      exemption qu'une faute future pourrait s'offrir en recopiant un mot.
 *
 * CE QU'ELLE NE VOIT PAS — à mesurer, pas à taire :
 *   - toute déclaration sans `\text{unité}` collée au nombre : la porte
 *     affiche ce reste à chaque passage, c'est sa PORTÉE ;
 *   - les constantes hors de cette table (masses du proton/neutron, F, k, G) —
 *     absentes ou trop rares dans le corpus pour être distinguées d'une
 *     variable homonyme ;
 *   - une valeur juste appliquée à la mauvaise grandeur.
 *
 *   node scripts/constantes-physiques.mjs           → le tableau et la portée
 *   node scripts/constantes-physiques.mjs --porte   → rouge si un sens casse
 */
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");

//  Un nombre tel que le corpus les écrit : « 3{,}00 \times 10^{8} », « 9{,}8 ».
const NUM = String.raw`(\d+(?:\{,\}|[.,])?\d*)\s*(?:\\,|\;|\\ |~|\s)*(?:\\times|\\cdot)?\s*(?:\\,|\s)*(?:10\^\{?(-?\d+)\}?)?`;
const UNI = String.raw`\\(?:text|mathrm|mbox)\s*\{\s*([^{}]{1,24}?)\s*\}`;

function valeur(mantisse, exposant) {
  const m = Number(mantisse.replace("{,}", ".").replace(",", "."));
  if (!Number.isFinite(m)) return null;
  return exposant == null ? m : m * 10 ** Number(exposant);
}

//  La table. `unite` est testée sur l'unité NORMALISÉE (espaces ôtés).
//  `fenetre` = « on reconnaît une tentative de cette constante » ; `bon` = les
//  arrondis admis. Entre les deux, c'est une faute.
//
//  LES BORNES SONT LARGES D'UN CHEVEU, ET C'EST VOULU. « 6{,}02 » × 10^23 se
//  lit en virgule flottante 6.019999999999999e23, strictement INFÉRIEUR à
//  6.02e23 : une borne écrite à l'exacte valeur juste accusait le nombre juste.
//  La porte a dit « N_A faux » sur le seul N_A du corpus, qui est correct.
//  Une borne de tolérance n'est pas de la mollesse : c'est la reconnaissance
//  que le nombre lu et le nombre écrit ne sont pas le même objet.
const CONSTANTES = [
  { nom: "c (célérité de la lumière)", sym: /\bc\b/, unite: /^(m\.?s|m\/s)$/i,
    fenetre: [2.5e8, 3.6e8], bon: (x) => x >= 2.9978e8 && x <= 3.0001e8 },
  { nom: "g (intensité de pesanteur)", sym: /\bg\b/, unite: /^(m\.?s|m\/s|N\/kg|N\.?kg)$/i,
    //  10 est la simplification admise au bac marocain, 9,8 la valeur usuelle.
    fenetre: [8.5, 11.5], bon: (x) => (x >= 9.69 && x <= 9.84) || Math.abs(x - 10) < 1e-9 },
  { nom: "N_A (nombre d'Avogadro)", sym: /(N_?\{?A\}?|N_\{\\text\{A\}\}|\\mathcal\{N\})/, unite: /^mol$/i,
    fenetre: [5.5e23, 6.5e23], bon: (x) => x >= 6.0195e23 && x <= 6.0235e23 },
  { nom: "h (constante de Planck)", sym: /\bh\b/, unite: /^J\.?s$/i,
    fenetre: [6.0e-34, 7.0e-34], bon: (x) => x >= 6.6195e-34 && x <= 6.6305e-34 },
  { nom: "e (charge élémentaire)", sym: /\be\b/, unite: /^C$/,
    fenetre: [1.4e-19, 1.8e-19], bon: (x) => x >= 1.5995e-19 && x <= 1.6035e-19 },
  { nom: "R (constante des gaz parfaits)", sym: /\bR\b/, unite: /^J/,
    fenetre: [8.0, 8.6], bon: (x) => x >= 8.3095 && x <= 8.3155 },
];

const C_VIDE = 3.0e8;
//  L'unité d'une VITESSE, et rien d'autre. Un `\text{m}` nu est un mètre :
//  l'avoir accepté faisait lire « 7,8×10¹¹ m » (le rayon de l'orbite de
//  Jupiter) comme une vitesse supraluminique. Douze faux signalements sur
//  quinze venaient de là.
const UNITE_VITESSE = /^(m\.?s|m\/s)$/i;

//  Les TROIS passages où une vitesse supérieure à c est écrite exprès, pour
//  nommer le piège et le désamorcer. Exemptés un par un, avec leur raison :
//  un motif sur « piège » ou « interdit » serait une porte dérobée qu'une
//  faute future s'offrirait en recopiant un mot.
const EXEMPTIONS = [
  { fichier: "pc/propagation-onde-lumineuse/checkpoints.yaml", valeur: 4.5e8,
    raison: "choix B, correct: false, étiqueté mc…indice-vitesse-erronee — le distracteur EST la misconception" },
  { fichier: "pc/propagation-onde-lumineuse/bank.yaml", valeur: 4.5e8,
    raison: "« Le piège de cette question » — le texte dit « physiquement interdit » et explique pourquoi" },
  { fichier: "pc/propagation-onde-lumineuse/bank.yaml", valeur: 4.0e8,
    raison: "« Le piège nommé de cette question » — v = c×n au lieu de c/n, dénoncé sur place" },
];

//  « 9.8000e+0 » n'est pas une façon d'écrire 9,8. Un remplacement naïf de
//  « e+0 » mangeait l'exposant au lieu de le retirer.
function joli(x) {
  if (Math.abs(x) >= 1e-3 && Math.abs(x) < 1e4) return String(Number(x.toPrecision(6)));
  const [m, e] = x.toExponential(4).split("e");
  return `${Number(m)}×10^${Number(e)}`;
}

function* fichiers(dir) {
  for (const n of fs.readdirSync(dir).sort()) {
    if (n.startsWith(".")) continue;
    const p = path.join(dir, n);
    if (fs.statSync(p).isDirectory()) yield* fichiers(p);
    else if (/\.(md|ya?ml|json)$/.test(n)) yield p;
  }
}

const PAT = new RegExp(NUM + String.raw`\s*(?:\\,|\;|\\ |~|\s)*` + UNI, "g");
//  Le reste : « symbole = nombre » SANS unité collée. Ce n'est pas un défaut,
//  c'est la portée — ce que la porte laisse hors champ, et qu'elle affiche.
const SANS_UNITE = new RegExp(String.raw`\b([cghe]|N_?\{?A\}?|R)\s*(?:=|\\approx|\\simeq)\s*` + NUM, "g");

const fautes = [];
const supraluminiques = [];
let lues = 0, vitesses = 0, horsChamp = 0;
const parConstante = new Map();

for (const f of fichiers(CONTENU)) {
  const rel = path.relative(CONTENU, f);
  const s = fs.readFileSync(f, "utf-8");

  for (const m of s.matchAll(PAT)) {
    const x = valeur(m[1], m[2]);
    if (x == null) continue;
    const uni = m[3].replace(/\s+/g, "");
    const avant = s.slice(Math.max(0, m.index - 45), m.index);

    for (const k of CONSTANTES) {
      if (!k.unite.test(uni)) continue;
      if (x < k.fenetre[0] || x > k.fenetre[1]) continue;
      if (!new RegExp(k.sym.source + String.raw`\s*(?:=|\\approx|\\simeq)\s*$`).test(avant)) continue;
      lues++;
      const seau = parConstante.get(k.nom) ?? new Map();
      seau.set(x, (seau.get(x) ?? 0) + 1);
      parConstante.set(k.nom, seau);
      if (!k.bon(x)) fautes.push({ rel, nom: k.nom, x, ligne: s.slice(0, m.index).split("\n").length });
    }

    if (UNITE_VITESSE.test(uni)) {
      vitesses++;
      if (x > C_VIDE) {
        const exempt = EXEMPTIONS.find((e) => e.fichier === rel && Math.abs(e.valeur - x) < 1e-6 * x);
        if (!exempt) supraluminiques.push({ rel, x, ligne: s.slice(0, m.index).split("\n").length });
      }
    }
  }
  for (const _ of s.matchAll(SANS_UNITE)) horsChamp++;
}

if (PORTE) {
  let rouge = 0;
  if (fautes.length) {
    console.error("━━ CONSTANTE PHYSIQUE FAUSSE ━━");
    for (const f of fautes) console.error(`   ${f.rel}:${f.ligne} — ${f.nom} = ${f.x.toExponential(4)}`);
    console.error("\n   L'arithmétique qui en découle sera impeccable, et le résultat faux.\n   C'est exactement l'angle mort que `arithmetique-rendue` déclare.\n");
    rouge++;
  }
  if (supraluminiques.length) {
    console.error("━━ VITESSE SUPÉRIEURE À c ━━");
    for (const v of supraluminiques) console.error(`   ${v.rel}:${v.ligne} — ${v.x.toExponential(3)} m·s⁻¹ > 3,00×10⁸`);
    console.error("\n   Aucun arrondi n'excuse cela. Si c'est un piège nommé exprès,\n   il s'ajoute à EXEMPTIONS avec sa raison — visible dans le diff.\n");
    rouge++;
  }
  if (rouge) process.exit(1);
  console.log(`constantes-physiques : porte tenue — ${lues} déclarations justes, ${vitesses} vitesses lues, 0 au-dessus de c (${EXEMPTIONS.length} pièges exemptés nommément) ✓`);
  process.exit(0);
}

console.log("\n━━ les constantes physiques, contre le monde ━━\n");
for (const k of CONSTANTES) {
  const seau = parConstante.get(k.nom);
  if (!seau) { console.log(`  ${k.nom.padEnd(34)} — aucune déclaration avec son unité`); continue; }
  const detail = [...seau.entries()].sort((a, b) => b[1] - a[1])
    .map(([v, n]) => `${joli(v)} ×${n}${k.bon(v) ? "" : "  ✗"}`).join(", ");
  console.log(`  ${k.nom.padEnd(34)} ${detail}`);
}
console.log(`\n  déclarations évaluées .......... ${lues}`);
console.log(`  dont fausses ................... ${fautes.length}`);
console.log(`  vitesses en m·s⁻¹ lues ......... ${vitesses}`);
console.log(`  dont supérieures à c ........... ${supraluminiques.length} (hors ${EXEMPTIONS.length} pièges exemptés)`);
console.log(`\n  PORTÉE — « symbole = nombre » sans unité collée, donc HORS CHAMP : ${horsChamp}`);
console.log(`  C'est la majorité, et c'est assumé : sans l'unité, rien ne distingue\n  la célérité c du coefficient c d'un trinôme.\n`);
