#!/usr/bin/env node
/**
 * prose-jumelle.mjs — deux leçons expliquent-elles des notions différentes
 * avec la MÊME prose ?
 *
 * POURQUOI. §11.118 a armé cette question pour les ÉNONCÉS d'items. La prose
 * des leçons, elle, n'avait jamais été comparée à elle-même. Or c'est là que
 * le copier-coller se loge le plus facilement : 62 leçons écrites en vagues,
 * un gabarit commun, et un paragraphe qui « marchait bien » ailleurs. Un élève
 * qui lit deux notions et retrouve le même paragraphe apprend que le produit
 * récite au lieu d'expliquer.
 *
 * COMMENT. Empreintes de 12 mots (formules et front-matter retirés), pour
 * chaque paire de leçons : le taux de recouvrement, et surtout **le plus long
 * passage commun**. Le taux dit une parenté diffuse ; la longueur dit un
 * copier-coller. Les deux ne se remplacent pas.
 *
 * MESURÉ (2026-09-20) : 62 leçons, 158 864 mots, 1 891 paires. Recouvrement
 * maximum **6,1 %** (philo/autrui ↔ philo/la-personne), plus long passage
 * commun **58 mots**. Aucune leçon n'est la copie d'une autre.
 *
 * TROIS FAMILLES DE PASSAGES LÉGITIMEMENT IDENTIQUES, lues à la main sur la
 * paire la plus proche — et toutes les trois DOIVENT rester identiques :
 *   1. le gabarit de MÉTHODE de la dissertation (« formuler la problématique…
 *      thèse, antithèse, dépassement ») — répété exprès, c'est la méthode ;
 *   2. une CITATION (« agis de telle sorte que tu traites l'humanité… ») — on
 *      ne paraphrase pas Kant pour faire varier le texte ;
 *   3. l'avertissement d'HONNÊTETÉ (« ce sujet est construit pour cette leçon,
 *      il n'est pas un sujet d'examen national authentique ») — un avertissement
 *      qui varierait serait moins fiable, pas plus.
 *
 *   node scripts/prose-jumelle.mjs           → le classement
 *   node scripts/prose-jumelle.mjs --porte   → les deux cliquets
 */
import fs from "node:fs";
import path from "node:path";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const PORTE = process.argv.includes("--porte");
const N = 12;
//  Cliquets mesurés au 2026-09-20, avec marge : 6,1 % et 58 mots aujourd'hui.
//  La marge n'est pas de la complaisance — les trois familles ci-dessus peuvent
//  s'allonger légitimement (une citation plus longue, une méthode enrichie).
//  Un rouge ici se LIT, il ne se corrige pas mécaniquement.
const CLIQUET_TAUX = Number(process.env.CLIQUET_TAUX ?? 8);
//  Le cliquet porte sur les passages HORS gabarit de méthode : celui-ci vaut
//  81 mots aujourd'hui et se répète à dessein. Sans le classement, il faudrait
//  tolérer 90 mots partout — donc laisser passer un paragraphe copié, qui fait
//  justement cette taille-là.
const CLIQUET_PASSAGE = Number(process.env.CLIQUET_PASSAGE ?? 60);

const lecons = {}, positions = {}, sources = {};
//  CE QUI DISTINGUE UN GABARIT D'UNE COPIE : LE NOMBRE DE LEÇONS.
//
//  Premier jet : j'exemptais tout passage porté par un chapitre de méthode.
//  L'essai rouge §11.159 — un paragraphe de 87 mots recopié d'une leçon à une
//  autre — est resté VERT, parce que je l'avais collé juste sous « Pour
//  t'entraîner ». **Une amnistie de chapitre est un trou où un copier-coller
//  se cache**, et c'est l'essai rouge qui l'a montré, pas la relecture.
//
//  La règle juste ne regarde pas le chapitre mais la DIFFUSION : un gabarit se
//  répète dans BEAUCOUP de leçons (la méthode de dissertation est dans les
//  douze leçons de philosophie) ; un copier-coller n'existe que dans DEUX.
//  Trois leçons ou plus : gabarit. Exactement deux : à lire.
//  Le chapitre reste AFFICHÉ, parce qu'il aide à lire — mais il n'exempte plus.
const DIFFUSION_GABARIT = 3;

//  (conservé pour l'affichage) LE GABARIT DE MÉTHODE est un chapitre, pas une phrase : « Étape 1 — Lire le
//  sujet », « Étape 2 — Formuler la problématique »… Ces chapitres DOIVENT se
//  répéter d'une leçon de philosophie à l'autre — c'est la méthode qu'on
//  enseigne, et la faire varier pour faire varier serait la desservir. On
//  classe donc un passage commun par le CHAPITRE qui le porte, au lieu de
//  tolérer une longueur en aveugle.
const CHAPITRE_METHODE = /^#{1,6}\s*(étape\s*\d|méthode|pour t'entra[îi]ner|dissertation|analyse de texte)/i;
//  L'AVERTISSEMENT D'HONNÊTETÉ est la troisième famille qui DOIT rester
//  identique : « ce sujet est construit pour cette leçon, il n'est pas présenté
//  comme un sujet d'examen national authentique ». Le faire varier pour faire
//  varier le rendrait moins fiable, pas plus. Il n'est pas reconnaissable au
//  chapitre — il chevauche la fin du précédent —, donc on le reconnaît à son
//  texte.
const AVERTISSEMENT = /sujet d'entra[îi]nement construit pour cette leçon|pas présenté comme un sujet d'examen national/i;
function chapitreDe(brut, offset) {
  const avant = brut.slice(0, offset);
  const i = avant.lastIndexOf("\n#");
  if (i < 0) return "";
  return avant.slice(i + 1, avant.indexOf("\n", i + 1) < 0 ? undefined : avant.length).split("\n")[0];
}
for (const m of fs.readdirSync(CONTENU).filter((x) => !x.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, m);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const n of fs.readdirSync(dm).sort()) {
    const f = path.join(dm, n, "lesson.md");
    if (!fs.existsSync(f)) continue;
    const brut = fs.readFileSync(f, "utf-8");
    //  MASQUÉ À LONGUEUR ÉGALE, pas supprimé : les positions doivent rester
    //  celles du fichier, sinon on ne peut plus retrouver le CHAPITRE qui porte
    //  un passage — et c'est le chapitre qui dit si une répétition est voulue.
    //  MASQUAGE LIGNE PAR LIGNE, et c'est un CHOIX D'ALGORITHME, pas un motif
    //  de plus. Trois motifs successifs ont échoué ici, chacun en avalant de la
    //  prose : `\$\$?[^$]*\$\$?` apparie les dollars de gauche à droite sur tout
    //  le fichier ; l'affichée non ancrée confond `$a$$b$` avec un `$$` ; et même
    //  ancrée sur la ligne, un bloc mal fermé emporte tout ce qui suit. Un
    //  paragraphe entier de `suites-numeriques` disparaissait ainsi, et l'essai
    //  rouge §11.159 restait VERT parce que le texte « copié » n'existait plus
    //  dans sa leçon d'origine.
    //
    //  Une expression régulière ne peut pas se rattraper d'un délimiteur mal
    //  formé — elle ne fait que propager l'erreur plus loin. Une boucle sur les
    //  lignes, elle, borne les dégâts à une ligne : un `$` esseulé laisse sa
    //  ligne en texte, ce qui est sans conséquence, au lieu d'emporter la page.
    const blanc = (x) => " ".repeat(x.length);
    let enAffichee = false;
    //  LE FRONT-MATTER N'EXISTE QUE S'IL COMMENCE LE FICHIER. Les leçons
    //  emploient `---` comme SÉPARATEUR de chapitre — `suites-numeriques` en a
    //  six —, et un motif `^---[\s\S]*?^---` non ancré au début avalait tout
    //  entre les deux premiers séparateurs : ici les lignes 3 à 38, dont le
    //  paragraphe que l'essai rouge venait d'y copier. La leçon commence par un
    //  titre, pas par du front-matter : il n'y avait rien à retirer du tout.
    const t = (brut.startsWith("---\n") ? brut.replace(/^---[\s\S]*?^---/m, blanc) : brut)
      .replace(/```[\s\S]*?```/g, blanc)
      .split("\n")
      .map((l) => {
        const dd = (l.match(/\$\$/g) ?? []).length;
        if (enAffichee) { if (dd > 0) enAffichee = false; return blanc(l); }
        if (l.trimStart().startsWith("$$")) { if (dd < 2) enAffichee = true; return blanc(l); }
        return l.replace(/\$[^$\n]*\$/g, blanc);
      })
      .join("\n");
    const jetons = [...t.toLowerCase().matchAll(/[a-zà-ÿ']+/g)];
    lecons[`${m}/${n}`] = jetons.map((j) => j[0]);
    positions[`${m}/${n}`] = jetons.map((j) => j.index);
    sources[`${m}/${n}`] = brut;
  }
}
const cles = Object.keys(lecons);
const empreintes = {};
for (const k of cles) {
  const s = new Set();
  for (let i = 0; i + N <= lecons[k].length; i++) s.add(lecons[k].slice(i, i + N).join(" "));
  empreintes[k] = s;
}

//  DIFFUSION : pour chaque empreinte, dans combien de leçons apparaît-elle ?
const diffusion = new Map();
for (const k of cles) for (const e of empreintes[k]) diffusion.set(e, (diffusion.get(e) ?? 0) + 1);

const paires = [];
let plusLongHorsMethode = 0, pireHorsMethode = null;
for (let i = 0; i < cles.length; i++) {
  for (let j = i + 1; j < cles.length; j++) {
    const a = cles[i], b = cles[j];
    let inter = 0;
    const petit = empreintes[a].size <= empreintes[b].size ? a : b;
    const grand = petit === a ? b : a;
    for (const e of empreintes[petit]) if (empreintes[grand].has(e)) inter++;
    if (!inter) continue;
    const taux = (inter / empreintes[petit].size) * 100;
    //  LE PLUS LONG PASSAGE COMMUN : c'est lui qui signe un copier-coller, là
    //  où le taux ne signe qu'une parenté de vocabulaire.
    let plusLong = 0;
    const A = lecons[a], sB = empreintes[b];
    let k2 = 0;
    while (k2 + N <= A.length) {
      if (sB.has(A.slice(k2, k2 + N).join(" "))) {
        let f2 = k2;
        while (f2 + N <= A.length && sB.has(A.slice(f2, f2 + N).join(" "))) f2++;
        const n2 = f2 - k2 + N - 1;
        //  Le chapitre du DÉBUT et celui de la FIN : un passage partagé peut
        //  commencer sous le chapitre précédent et se poursuivre dans le
        //  gabarit de méthode — c'est le cas de l'avertissement d'honnêteté, et
        //  ne regarder que le début le classait « hors méthode » à tort.
        const titre = chapitreDe(sources[a], positions[a][k2] ?? 0);
        const titreFin = chapitreDe(sources[a], positions[a][Math.min(f2 + N - 2, positions[a].length - 1)] ?? 0);
        const texte = A.slice(k2, f2 + N - 1).join(" ");
        //  La DIFFUSION du passage, lue sur sa première empreinte.
        const diff = diffusion.get(A.slice(k2, k2 + N).join(" ")) ?? 2;
        const gabarit = diff >= DIFFUSION_GABARIT || AVERTISSEMENT.test(texte);
        const methode = gabarit;
        plusLong = Math.max(plusLong, n2);
        if (!methode && n2 > plusLongHorsMethode) {
          plusLongHorsMethode = n2;
          pireHorsMethode = { a, b, n: n2, titre: (titre.trim() || titreFin.trim()).slice(0, 60), diff };
        }
        k2 = f2;
      } else k2++;
    }
    paires.push({ a, b, inter, taux, plusLong });
  }
}
paires.sort((x, y) => y.taux - x.taux);
const maxTaux = paires.length ? paires[0].taux : 0;
const maxPassage = paires.reduce((m, p) => Math.max(m, p.plusLong), 0);
const pirePassage = paires.find((p) => p.plusLong === maxPassage);

console.log(`\n━━ deux leçons écrivent-elles la même prose ? — ${cles.length} leçons, ${paires.length ? ((cles.length * (cles.length - 1)) / 2) : 0} paires ━━\n`);
console.log(`  mots de prose analysés ................ ${Object.values(lecons).reduce((a, v) => a + v.length, 0)}`);
console.log(`  recouvrement maximum .................. ${maxTaux.toFixed(1)} %  (cliquet ${CLIQUET_TAUX} %)`);
console.log(`  plus long passage commun .............. ${maxPassage} mots`);
if (pirePassage) console.log(`     entre ${pirePassage.a} et ${pirePassage.b}`);
console.log(`  plus long présent dans 2 leçons SEULEMENT  ${plusLongHorsMethode} mots  (cliquet ${CLIQUET_PASSAGE})`);
if (pireHorsMethode) console.log(`     entre ${pireHorsMethode.a} et ${pireHorsMethode.b}, sous « ${pireHorsMethode.titre} » (diffusion ${pireHorsMethode.diff})`);
console.log();
console.log("  les huit paires les plus proches :");
for (const p of paires.slice(0, 8)) {
  console.log(`     ${p.taux.toFixed(1).padStart(5)} %  passage max ${String(p.plusLong).padStart(3)} mots   ${p.a}  ↔  ${p.b}`);
}
console.log();

if (PORTE) {
  const casses = [];
  if (maxTaux > CLIQUET_TAUX) casses.push(`recouvrement ${maxTaux.toFixed(1)} % > ${CLIQUET_TAUX} % (${paires[0].a} ↔ ${paires[0].b})`);
  if (plusLongHorsMethode > CLIQUET_PASSAGE) casses.push(`passage de ${plusLongHorsMethode} mots présent dans CES DEUX leçons seulement > ${CLIQUET_PASSAGE} (${pireHorsMethode.a} ↔ ${pireHorsMethode.b}, sous « ${pireHorsMethode.titre} »)`);
  if (casses.length) {
    console.error("━━ ROUGE : deux leçons se ressemblent trop ━━");
    for (const c of casses) console.error(`   ${c}`);
    console.error("\n   Un rouge ici se LIT, il ne se corrige pas mécaniquement : trois familles");
    console.error("   de passages DOIVENT rester identiques (méthode, citation, avertissement");
    console.error("   d'honnêteté). Lire le passage avant de conclure.\n");
    process.exit(1);
  }
  console.log(`  ✓ cliquets tenus — ${maxTaux.toFixed(1)} % de recouvrement, ${plusLongHorsMethode} mots pour un passage propre à deux leçons.\n`);
}
process.exit(0);
