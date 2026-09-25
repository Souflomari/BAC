#!/usr/bin/env node
/**
 * media-manipulable — l'élève peut-il TOUCHER la figure, ou seulement la voir ?
 *
 * CE QU'IL GARDE (§11.129, 2026-09-20). La VISION distingue explicitement, par
 * matière, ce que « bien enseigné » veut dire — et elle le fait en termes
 * d'INTERACTION, pas de style :
 *
 *   • maths — « le couche conceptuelle … demande des interactives MANIPULABLES
 *     (glisser le point, prédire la tangente, la regarder se mettre à jour) » ;
 *   • physique-chimie — « c'est là que les simulations interactives paient le
 *     plus » ;
 *   • **SVT — « la pensée SVT est visuelle, donc elle a besoin de vraies
 *     interactions de CONSTRUCTION DE SCHÉMA (dessiner, étiqueter), PAS
 *     d'images affichées. »**
 *
 * `INTERACTIVE-FIGURE-SPEC` encode par ailleurs une demande explicite du
 * propriétaire (2026-07-07) : « plus de visualisations interactives ».
 *
 * TROIS ÉTAGES, et ils ne valent pas la même chose :
 *   STATIQUE    — un `.svg`. L'élève regarde.
 *   ÉTAGÉ       — `.stages.json` : révélation pas à pas, l'élève avance. Mieux
 *                 qu'une image, mais il ne manipule toujours rien.
 *   MANIPULABLE — `.interactive.json` (glisser un point, tirer un curseur,
 *                 bâti SUR l'étagé) ou un embed déclaré dans la leçon. C'est
 *                 le seul étage que la VISION appelle « interaction ».
 *
 * MESURÉ À L'ARMEMENT : **9 notions sur 62** portent du manipulable — 5 en
 * maths, 4 en pc. **SVT : 0 sur 11**, avec 49 SVG statiques et 37 étagés, ce
 * qui est exactement « des images affichées », la forme que sa ligne de la
 * VISION nomme comme insuffisante.
 *
 * C'est le CINQUIÈME axe indépendant à isoler les onze notions SVT (après le
 * sommet §11.114, les leçons muettes §11.37, l'entrée §11.119 et l'anatomie
 * §11.120) — et le plus tranchant, parce que la VISION nomme SVT en propre.
 *
 * CLIQUET À UNE SEULE DIRECTION : le nombre de notions portant du manipulable
 * ne peut pas baisser. On empêche la perte, on n'exige pas le gain — produire
 * une figure manipulable est un travail d'auteur, pas un correctif.
 *
 *   node scripts/media-manipulable.mjs            # la mesure
 *   node scripts/media-manipulable.mjs --porte    # le cliquet
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ICI = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(ICI, "..", "..");
const PORTE = process.argv.includes("--porte");

//  Mesuré au 2026-09-20 : 5 (maths) + 4 (pc) + 0 (philo) + 0 (svt).
//  Relevé à 10 le 2026-09-23 : maths/geometrie-espace porte la scène 3D
//  « sphère, plan, droite » (ADR 0041). Un cliquet qu'on ne resserre pas quand
//  la mesure gagne laisse perdre ce gain en silence (ADR 0034).
//  (La troisième scène, la particule dans le champ magnétique, §11.190, ne le
//  bouge pas : ce cliquet compte des NOTIONS, et pc/chute-mouvements-plans en
//  portait déjà une.)
//  Relevé à 11 le 2026-09-24 : pc/rotation-axe-fixe porte la scène du manège.
//  L'oubli s'est vu tout seul, et c'est la leçon : au run 751, l'essai rouge
//  §11.129 (une notion perd sa manipulable) est resté VERT — 11 → 10 tenait
//  encore le plancher de 10. Le cliquet non resserré ne perdait pas seulement
//  le gain : il rendait son propre essai rouge aveugle.
//  Relevé à 12 le 2026-09-24 (même commit que la scène) : pc/ondes-mecaniques-
//  periodiques porte la cuve à ondes.
//  Relevé à 13 le même jour, même commit : pc/reactions-acido-basiques porte
//  la figure manipulable du pH (distribution-curseur-pH).
//  Relevé à 14 le même jour, même commit que la scène : pc/ondes-mecaniques-
//  progressives porte la corde (la photo et le film). Elle ne solde aucune
//  dette écrite : c'est ce cliquet-ci qu'elle fait monter, pas l'autre.
//  Relevé à 15 le même jour, même commit que la scène : pc/decroissance-
//  radioactive porte la courbe et les noyaux. Elle ne solde, elle non plus,
//  aucune dette écrite (DÉCISIONS §24) — `dette-manipulable` ne bouge pas.
//  Relevé à 16 le même jour, même commit que la scène : pc/propagation-onde-
//  lumineuse porte le banc de diffraction. Aucune dette écrite non plus : le
//  trou qu'il ferme est MESURÉ (la seule figure de diffraction du corpus, sans
//  un nombre, exagérait son angle d'un facteur 54 sans le dire — spec §2.1).
//  Relevé à 17 le 2026-09-25, même commit que la scène : pc/lois-de-newton
//  porte le tremplin circulaire. Aucune dette écrite : le trou qu'il ferme est
//  MESURÉ — aucune figure du corpus ne montrait le vecteur accélération sur
//  une trajectoire courbe, ni ses deux composantes (spec §1).
//  Relevé à 18 le même jour, même commit que la scène : pc/ondes-em-modulation
//  porte le banc de modulation. Aucune dette écrite (le dossier n'avait aucun
//  `spec.md`) : le trou qu'il ferme est MESURÉ — sept sujets sur sept font
//  lire un oscillogramme, et aucune figure de la notion ne portait de
//  quadrillage ni de sensibilité (spec §0.3, §2.1).
const CLIQUET = 18;

const RE_EMBED = /\[\[(?:embed|geogebra|desmos|falstad|phet)[:\]]/gi;
const parMat = new Map();
const avecManip = [];

for (const m of fs.readdirSync(path.join(REPO, "content"))) {
  const dm = path.join(REPO, "content", m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm)) {
    const dn = path.join(dm, n);
    if (!fs.existsSync(path.join(dn, "lesson.md"))) continue;
    const md = path.join(dn, "media");
    let fichiers = [];
    try { fichiers = fs.readdirSync(md); } catch { /* pas de media/ */ }
    const statique = fichiers.filter((f) => f.endsWith(".svg") && !f.endsWith(".motion.svg")).length;
    const etage = fichiers.filter((f) => f.endsWith(".stages.json")).length;
    //  COMPTER CE QUI CHARGE, PAS CE QUI EXISTE (§11.129). La première version
    //  comptait les noms de fichiers : un `.interactive.json` au JSON cassé —
    //  donc mort au rendu — comptait encore comme manipulable, et l'essai rouge
    //  est revenu AVEUGLE. Il avait raison. On PARSE.
    const inter = fichiers.filter((f) => {
      if (!f.endsWith(".interactive.json")) return false;
      try { JSON.parse(fs.readFileSync(path.join(md, f), "utf8")); return true; }
      catch { return false; }
    }).length;
    let emb = 0;
    try { emb = (fs.readFileSync(path.join(dn, "lesson.md"), "utf8").match(RE_EMBED) ?? []).length; } catch { /* */ }
    if (!parMat.has(m)) parMat.set(m, { n: 0, statique: 0, etage: 0, inter: 0, emb: 0, manip: 0 });
    const a = parMat.get(m);
    a.n++; a.statique += statique; a.etage += etage; a.inter += inter; a.emb += emb;
    if (inter || emb) { a.manip++; avecManip.push(`${m}/${n}`); }
  }
}

const total = [...parMat.values()].reduce((s, a) => s + a.n, 0);
console.log(`\n━━ l'élève peut-il TOUCHER la figure ? — ${total} notions ━━\n`);
console.log("  matière  notions   statiques   étagées   manipulables   notions avec du manipulable");
for (const [m, a] of [...parMat].sort()) {
  console.log(
    `  ${m.padEnd(8)} ${String(a.n).padStart(6)} ${String(a.statique).padStart(11)} ${String(a.etage).padStart(9)} ` +
    `${String(a.inter + a.emb).padStart(14)}   ${a.manip}/${a.n}`,
  );
}
console.log(`\n  TOTAL : ${avecManip.length}/${total} notions portent quelque chose de manipulable`);
for (const c of avecManip) console.log(`     • ${c}`);

const svt = parMat.get("svt");
if (svt && svt.manip === 0) {
  console.log(`\n  SVT : 0/${svt.n} — ${svt.statique} SVG statiques, ${svt.etage} étagées, aucune manipulable.`);
  console.log(`  La VISION dit de SVT : « la pensée SVT est visuelle, donc elle a besoin de`);
  console.log(`  vraies interactions de construction de schéma (dessiner, étiqueter), PAS`);
  console.log(`  d'images affichées. » C'est un arbitrage de propriétaire, pas un défaut de code.`);
}
console.log();

if (PORTE) {
  if (avecManip.length < CLIQUET) {
    console.error(`━━ CLIQUET MANIPULABLE : ${CLIQUET} → ${avecManip.length} ━━`);
    console.error("   Une notion a perdu sa figure manipulable. Produire du manipulable est un");
    console.error("   travail d'auteur ; en perdre est une régression. Le sens inverse — en");
    console.error("   ajouter — n'est pas gardé, c'est le travail qu'on souhaite.");
    process.exit(1);
  }
  console.log(`media-manipulable : cliquet tenu — ${avecManip.length}/${total} notions ✓\n`);
}
