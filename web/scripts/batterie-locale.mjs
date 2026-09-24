#!/usr/bin/env node
/**
 * batterie-locale — ce qu'il faut avoir fait passer AVANT de pousser.
 *
 * POURQUOI CE SCRIPT EXISTE (§11.81, 2026-09-19). Pendant une semaine sans
 * CI, j'ai écrit « batterie locale » dans chaque message de commit en ne
 * lançant que quatre contrôles. `gates.yml` en lançait douze. Cinq des huit
 * portes sans navigateur étaient ROUGES, et trois de ces rouges étaient mes
 * propres régressions. Personne ne pouvait le voir : la CI était morte, et
 * ma batterie ne la reflétait pas.
 *
 * LA VRAIE LEÇON n'est pas « lancer ces huit-là ». C'est que la liste DÉRIVE.
 * Ce script se compare donc à `.github/workflows/gates.yml` et signale toute
 * commande `node scripts/…` que la CI lance et que lui ignore. Il ne peut pas
 * prendre du retard en silence — c'est tout l'intérêt.
 *
 * Ce qu'il NE fait pas : les étapes qui demandent un navigateur ou un build
 * (dom-truth, figures, presse-papier, impression, zoom, formules, ancres,
 * données). Elles sont déclarées ci-dessous comme volontairement hors champ,
 * pour que leur absence soit un CHOIX ÉCRIT et non un oubli.
 *
 *   node scripts/batterie-locale.mjs
 */
import { execFileSync } from "node:child_process";
import yaml from "js-yaml";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const WEB = join(ICI, "..");
const REPO = join(WEB, "..");

// Les contrôles sans navigateur, dans l'ordre où gates.yml les lance.
const ETAPES = [
  { nom: "tests unitaires", cmd: null },                      // traité à part
  //  §11.122 : la CI le lance à CHAQUE construction, via le crochet `prebuild`
  //  de npm — jamais écrit nulle part, donc invisible à la garde ci-dessous
  //  jusqu'à aujourd'hui. C'est le contrôle de la source unique du design :
  //  `tokens.ts` génère les variables CSS, et ceci vérifie qu'elles n'ont pas
  //  divergé. Sans lui, « tout est vert » en local pouvait précéder un rouge en
  //  CI — exactement ce que cette batterie existe pour empêcher.
  { nom: "generate-tokens", cmd: ["scripts/generate-tokens.mjs", "--check"] },
  //  §11.125 : la liste de mots que la porte accents LIT doit couvrir ce que le
  //  script de réparation CONNAÎT. Une sonde plus étroite que la réparation
  //  déclare propre ce qu'elle ne sait pas voir. En python3, comme sa source.
  { nom: "accents (liste)", cmd: null },
  { nom: "liens-fichiers", cmd: ["scripts/liens-fichiers.mjs", "--porte"] },
  { nom: "validate-content", cmd: null },                     // traité à part
  { nom: "lectures-graphiques", cmd: ["scripts/lectures-graphiques.mjs", "--check"] },
  { nom: "token-gate", cmd: ["scripts/token-gate.mjs"] },
  { nom: "contrast-gate", cmd: ["scripts/contrast-gate.mjs"] },
  { nom: "indice-longueur", cmd: ["scripts/indice-longueur.mjs", "--porte"] },
  { nom: "indice-absolu", cmd: ["scripts/indice-absolu.mjs", "--porte"] },
  { nom: "indice-refus", cmd: ["scripts/indice-refus.mjs", "--porte"] },
  { nom: "eleve-ruse", cmd: ["scripts/eleve-ruse.mjs", "--porte"] },
  { nom: "porte-engagement", cmd: ["scripts/porte-engagement.mjs", "--porte"] },
  { nom: "enonces-jumeaux", cmd: ["scripts/enonces-jumeaux.mjs", "--porte"] },
  { nom: "modele-a-jour", cmd: ["scripts/build-learner-inputs.mjs", "--verifie"] },
  { nom: "rampe-bac", cmd: ["scripts/rampe-bac.mjs", "--porte"] },
  { nom: "rampe-entree", cmd: ["scripts/rampe-entree.mjs", "--porte"] },
  //  §11.128 : les deux non-négociables de sûreté PRODUCTION qui se vérifient
  //  statiquement — bloc de vérification assertant une cardinalité, et RLS
  //  activée dans la migration qui CRÉE la table. Ils sont énoncés dans
  //  `.claude/CLAUDE.md` comme « toujours en vigueur », dérivés d'incidents
  //  réels (046, 040, 047), et rien ne les mesurait.
  { nom: "portes-migrations", cmd: ["scripts/portes-migrations.mjs", "--porte"] },
  //  §11.129 : la VISION demande des figures MANIPULABLES, et le nomme par
  //  matière. 9 notions sur 62 en portent ; le cliquet empêche d'en perdre.
  { nom: "media-manipulable", cmd: ["scripts/media-manipulable.mjs", "--porte"] },
  { nom: "constantes-physiques", cmd: ["scripts/constantes-physiques.mjs", "--porte"] },
  { nom: "champs-morts", cmd: ["scripts/champs-morts.mjs", "--porte"] },
  { nom: "dette-manipulable", cmd: ["scripts/dette-manipulable.mjs", "--porte"] },
  { nom: "tracabilite-spec", cmd: ["scripts/tracabilite-spec.mjs", "--porte"] },
  { nom: "couverture-diagnostique", cmd: ["scripts/couverture-diagnostique.mjs", "--porte"] },
  { nom: "resume-couverture", cmd: ["scripts/resume-couverture.mjs", "--porte"] },
  { nom: "arithmetique-rendue", cmd: ["scripts/arithmetique-rendue.mjs", "--strict"] },
  // Énumérateur de routes que l'étape dom-truth consomme : sans navigateur,
  // et le lancer attrape un plantage de l'énumérateur avant la CI.
  { nom: "routes-examens", cmd: ["scripts/routes-examens.mjs"] },
  // La porte des portes (ADR 0033) : elle lance validate-content sous
  // couverture V8 et signale toute porte dont le SCAN ne tourne sur rien.
  // Sans navigateur, et c'est le seul contrôle qui puisse dire qu'un ✓ ne
  // vaut rien — il a donc sa place ici plus qu'ailleurs.
  { nom: "portee-portes", cmd: ["scripts/portee-portes.mjs"] },
  // Les égalités entièrement numériques du corpus : pur Node, une seconde, et
  // le seul contrôle qui touche au CALCUL plutôt qu'à la forme (§11.158).
  { nom: "calculs-numeriques", cmd: ["scripts/calculs-numeriques.mjs", "--porte"] },
  // Deux leçons qui écrivent la même prose : pur Node, quelques secondes.
  { nom: "prose-jumelle", cmd: ["scripts/prose-jumelle.mjs", "--porte"] },
  // La dépendance CACHÉE de quatre portes armées : un « $ » orphelin dans un
  // champ leur fait avaler le passage suivant, en restant vertes (§11.160).
  { nom: "dollars-apparies", cmd: ["scripts/dollars-apparies.mjs", "--porte"] },
  // Sans build, elle garde la SOURCE et le dit : un lookbehind dans `src/` tue
  // le morceau à l'analyse sur un iPhone resté en iOS 15 (§11.163).
  { nom: "syntaxe-vieux-moteurs", cmd: ["scripts/syntaxe-vieux-moteurs.mjs", "--porte"] },
  // Une copie parfaite vaut 20/20 — le seul chiffre auquel l'élève tient. Deux
  // épreuves sur 39 le refusaient (19,25 et 19,75) parce que la règle de
  // lecture du barème ne retenait que la PREMIÈRE étiquette d'un énoncé
  // groupé (§11.168). Arithmétique pure sur les données : ni build, ni
  // navigateur.
  { nom: "bareme-ferme", cmd: ["scripts/bareme-ferme.mjs", "--porte"] },
  // En SVG, « url(#id) » se résout dans TOUT le document : deux figures d'une
  // même page qui définissent le même id DIFFÉREMMENT, et la seconde est
  // ignorée sans un mot (§11.172). La porte ne crie que sur cette condition-là
  // — pas sur les doublons inoffensifs, que 49 notions portent.
  { nom: "figures-id-divergents", cmd: ["scripts/figures-id-divergents.mjs", "--porte"] },
  // La suite d'essais rouges (ADR 0034) : elle casse une occurrence, mesure, et
  // restaure. Sans navigateur, et c'est le seul contrôle qui réponde à « mes
  // portes peuvent-elles encore crier ? » — la question qu'aucune porte ne pose
  // sur elle-même.
  { nom: "essais-rouges", cmd: ["scripts/essais-rouges.mjs"] },
];

// Hors champ ASSUMÉ : navigateur ou build requis. Leur absence est un choix.
const HORS_CHAMP = new Set([
  "dom-truth.mjs", "figure-preview.mjs", "copie-maths.mjs", "impression.mjs",
  // glyphes-confondus lève son propre `next start` et dessine l'inventaire du
  // produit dans les piles de polices du site RENDU : build ET Playwright.
  // Hors champ ici pour la même raison que dom-truth — ARMÉE en CI
  // (2026-09-24). Son rouge se rejoue : `node scripts/glyphes-confondus.mjs --essai-rouge`.
  "glyphes-confondus.mjs",
  "zoom-sweep.mjs", "formules-rendues.mjs", "ancres-uniques.mjs",
  "donnees-sweep.mjs", "typo-francaise.mjs", "accents-manquants.mjs",
  // latex-nu : même famille que typo-francaise — il lance `next start` et lit le
  // DOM rendu de 110 pages, épreuves ouvertes comprises. Hors champ pour la
  // même raison, pas par oubli (§11.167).
  "latex-nu.mjs",
  // liens-internes démarre `next start` et pilote un navigateur sur 111 pages :
  // il lui faut donc un build ET Playwright. Hors champ pour la même raison que
  // dom-truth, et non par oubli.
  "liens-internes.mjs",
  // preferences-secours lève son propre `next start` et pilote un navigateur
  // pour provoquer un vrai rendu de secours : build ET Playwright. Hors champ
  // ici, armée en CI (§11.149). Son rouge se rejoue à la demande :
  // `node scripts/preferences-secours.mjs --essai-rouge`.
  "preferences-secours.mjs",
  // source-en-double lit le HTML SERVI des 62 leçons pour y chercher la source
  // du lesson.md : il lui faut donc un build et un `next start`. Hors champ
  // ici pour la même raison que dom-truth — ARMÉE en CI (§11.175). Son rouge
  // se rejoue à la demande : `node scripts/source-en-double.mjs --essai-rouge`.
  "source-en-double.mjs",
  // header-manifestes pilote un navigateur sur les 10 TYPES de page et fait ce
  // que ferait l'élève (⌘K, clic sur « Notions ») : build ET Playwright. Hors
  // champ ici pour la même raison que dom-truth — ARMÉE en CI (§11.180). Son
  // rouge se rejoue : `node scripts/header-manifestes.mjs --essai-rouge`.
  "header-manifestes.mjs",
  // verdict-qcm répond à des QCM dans un navigateur sur des leçons construites :
  // build ET Playwright. Hors champ ici pour la même raison que dom-truth —
  // ARMÉE en CI sur le corpus entier, job `qcm` (§11.184, §11.193). Son rouge se rejoue :
  // `node scripts/verdict-qcm.mjs --essai-rouge <routes…>`.
  "verdict-qcm.mjs",
  // scene-orbite ouvre la scène 3D dans un Chromium qui dessine en WebGL
  // (SwiftShader) et compare des PIXELS : build ET Playwright. Hors champ ici
  // pour la même raison que dom-truth — ARMÉE en CI (§11.187). Son rouge se
  // rejoue : `node scripts/scene-orbite.mjs --essai-rouge`.
  "scene-orbite.mjs",
  // scene-sphere, même raison que scene-orbite : la deuxième scène 3D, ses
  // pixels lus au navigateur après build — ARMÉE en CI (§11.189). Son rouge se
  // rejoue : `node scripts/scene-sphere.mjs --essai-rouge`.
  "scene-sphere.mjs",
  // scene-lorentz, même raison : la troisième scène 3D (la particule dans le
  // champ magnétique) se juge sur son rendu WebGL et sur une course lancée en
  // temps réel ; la CI la rejoue vert puis rouge :
  // `node scripts/scene-lorentz.mjs --essai-rouge`.
  "scene-lorentz.mjs",
  // scene-vectoriel, même raison : la quatrième scène 3D (le produit
  // vectoriel) se juge sur son rendu WebGL ; la CI la rejoue vert puis rouge :
  // `node scripts/scene-vectoriel.mjs --essai-rouge`.
  "scene-vectoriel.mjs",
  // scene-revolution, même raison : la cinquième scène 3D (le solide de
  // révolution, maths/calcul-integral R9), WebGL et deux passages en CI (job
  // `scenes`) ; `node scripts/scene-revolution.mjs --essai-rouge`.
  "scene-revolution.mjs",
  // scene-manege, même raison : la sixième scène 3D (le manège — le moment
  // d'une force PAR RAPPORT À UN AXE, pc/rotation-axe-fixe R2), WebGL, des
  // courses en temps réel, deux passages en CI (job `scenes`) ;
  // `node scripts/scene-manege.mjs --essai-rouge`.
  "scene-manege.mjs",
  // scene-cuve, même raison : la cuve à ondes (pc/ondes-mecaniques-periodiques
  // R5), le premier manipulable PLAN — un champ calculé en direct, des courses
  // au ralenti, deux passages en CI (job `scene-champ`) ;
  // `node scripts/scene-cuve.mjs --essai-rouge`.
  "scene-cuve.mjs",
  // figures-manipulables, même raison : build + navigateur, chaque figure
  // manipulable du corpus au rendu, deux passages en CI (job `scene-champ`) ;
  // `node scripts/figures-manipulables.mjs --essai-rouge`.
  "figures-manipulables.mjs",
  // etroit-sweep balaie le corpus entier au navigateur, à 320, 360 et 390 px :
  // build ET Playwright, ~6 min. Hors champ ici pour la même raison que
  // dom-truth — ARMÉE en CI dans son propre job, `telephone` (§11.193). Son
  // rouge se rejoue : `node scripts/etroit-sweep.mjs --essai-rouge` (serveur
  // lancé à part, BASE=…).
  "etroit-sweep.mjs",
  // temps-de-chargement mesure TTFB/FCP/LCP au navigateur, réseau bridé, trois
  // passages par route : build, Playwright, et des millisecondes qui sont
  // celles de CETTE machine. Ce n'est PAS une porte et ce n'en sera pas une —
  // un seuil en ms sur une machine partagée rougirait au hasard, et une porte
  // instable apprend à ignorer le rouge des autres (ADR 0036). Instrument de
  // mesure, lancé à la main (§11.175).
  "temps-de-chargement.mjs",
  // desaccords-hydratation lève son propre `next start` et charge les 118
  // routes prérendues : build ET Playwright. Hors champ ici, armée en CI
  // (§11.150). Son rouge se rejoue : `--essai-rouge` fabrique un désaccord sur
  // la seule page d'accueil et exige que le balayage la signale, elle seule.
  "desaccords-hydratation.mjs",
  // trois-moteurs demande DEUX moteurs absents de l'image (firefox, webkit) et,
  // pour WebKit, des paquets système installés par apt. Hors champ ici ET hors
  // CI — ce choix est écrit dans INSTRUMENTS avec ce qu'il coûte, plutôt que
  // laissé à deviner (§11.151). Les commandes d'installation sont dans son
  // en-tête ; son rouge se rejoue par `--essai-rouge`.
  "trois-moteurs.mjs",
  // marge-etiquettes ne demande que Chromium — il est donc en CI, contrairement
  // à trois-moteurs. Hors champ ICI seulement parce que la batterie locale
  // tourne sans navigateur (§11.152).
  "marge-etiquettes.mjs",
  // figures-trois-moteurs : même raison que trois-moteurs (firefox + webkit).
  "figures-trois-moteurs.mjs",
  // stockage-refuse lève son propre `next start` et pilote un navigateur : build
  // ET Playwright. Hors champ ici, armée en CI (§11.154).
  "stockage-refuse.mjs",
  // mouvement-reduit : build + navigateur, 66 pages × 2 réglages. Hors champ
  // ici, armée en CI (§11.155).
  "mouvement-reduit.mjs",
]);

function dossiersNotions() {
  const out = [];
  for (const m of readdirSync(join(REPO, "content"))) {
    const dm = join(REPO, "content", m);
    let subs; try { subs = readdirSync(dm); } catch { continue; }
    for (const n of subs) {
      if (existsSync(join(dm, n, "lesson.md"))) out.push(`content/${m}/${n}`);
    }
  }
  return out.sort();
}

function lance(label, bin, args, cwd) {
  process.stdout.write(`  ${label.padEnd(26)} `);
  try {
    execFileSync(bin, args, { cwd, stdio: "pipe" });
    console.log("✓");
    return true;
  } catch (e) {
    console.log("✗ ROUGE");
    const txt = `${e.stdout ?? ""}${e.stderr ?? ""}`.trim().split("\n").slice(-4);
    for (const l of txt) console.log(`      ${l}`);
    return false;
  }
}

//  --garde : ne lancer QUE le contrôle de dérive du bas de ce fichier.
//  Il existe pour que cette garde soit MESURABLE à part. Lancée dans la
//  batterie entière, elle est noyée par les portes de contenu — et un essai
//  rouge ne peut rien prouver sur une commande déjà rouge pour une autre
//  raison (§11.104). Une propriété qu'on ne peut pas re-mesurer est un
//  souvenir (ADR 0034 §5).
const GARDE_SEULE = process.argv.includes("--garde");

if (!GARDE_SEULE) console.log("\n━━ batterie locale (les contrôles de gates.yml qui ne demandent pas de navigateur) ━━\n");
let rouges = 0;

//  LES FICHIERS QUE GIT NE SUIT PAS ENCORE (2026-09-24, run 754). Plusieurs
//  portes lisent `git ls-files` (liens-fichiers, entre autres) : un fichier NEUF
//  non ajouté leur est invisible. La batterie était verte en local, la CI rouge
//  sur le même arbre — la spec de la cuve, neuve, citait un chemin mort, et
//  personne ne l'avait lue avant la poussée. Un fichier non suivi et non ignoré
//  au moment de la batterie est soit hors du commit (qu'on le range), soit dans
//  le commit sans avoir été mesuré : les deux se disent AVANT de pousser.
if (!GARDE_SEULE) {
  const nonSuivis = execFileSync("git", ["ls-files", "--others", "--exclude-standard"], { cwd: REPO, encoding: "utf-8" })
    .split("\n")
    .filter(Boolean);
  if (nonSuivis.length) {
    console.log(`  fichiers non suivis        ✗ ROUGE`);
    for (const f of nonSuivis.slice(0, 8)) console.log(`      ${f}`);
    if (nonSuivis.length > 8) console.log(`      … et ${nonSuivis.length - 8} autre(s)`);
    console.log("      Les portes qui lisent `git ls-files` ne les voient pas : `git add` avant la batterie.");
    rouges++;
  } else console.log(`  fichiers non suivis        ✓`);
}

if (!GARDE_SEULE && !lance("tests unitaires", "node",
  ["--test", ...readdirSync(join(WEB, "scripts")).filter((f) => /^test-.*\.mjs$/.test(f)).map((f) => `scripts/${f}`)],
  WEB)) rouges++;

// PIÈGE, consigné trois fois (§11.47, puis ici) : validate-content résout ses
// dossiers par `path.join(REPO, dir)`. Un chemin en `../content/…` ne résout
// donc PAS, et l'outil échoue sur « pas de lesson.md » — pas sur le contenu.
// On le lance depuis la racine, avec des chemins relatifs au dépôt.
if (!GARDE_SEULE && !lance("accents (liste)", "python3",
  ["scripts/accents-francais.py", "--verifier", "web/scripts/accents.mots.json"],
  REPO)) rouges++;

if (!GARDE_SEULE && !lance("validate-content (62)", "node",
  ["web/scripts/validate-content.mjs", ...dossiersNotions(), "--strict"],
  REPO)) rouges++;

for (const e of GARDE_SEULE ? [] : ETAPES) {
  if (!e.cmd) continue;
  if (!lance(e.nom, "node", e.cmd, WEB)) rouges++;
}

// ── Le garde-fou : cette liste est-elle encore à jour ? ──
const yml = readFileSync(join(REPO, ".github/workflows/gates.yml"), "utf8");

//  ── gates.yml EST-IL SEULEMENT DU YAML ? (§11.142) ────────────────────────
//  Tout ce qui suit lit ce fichier au MOTIF — `node scripts/…`, `npm run …`.
//  Un motif se moque de la validité : il trouve ses lignes dans un fichier que
//  GitHub refuserait de charger, et la garde annonce « 33 portes » d'un
//  workflow mort. C'est arrivé le 2026-09-20 : un nom d'étape contenant
//  « : » non cité (« cliquet : une spec… ») a rendu le fichier illisible
//  pendant SIX commits. Rien ne l'a dit, parce que la CI n'avait plus de
//  runner depuis la veille — le seul lecteur qui aurait protesté était absent.
//
//  Le contrôle est donc en TÊTE de la garde, et il s'arrête là : une liste
//  extraite d'un fichier invalide ne vaut rien, et la comparer serait donner
//  du crédit à un relevé faux.
try {
  const doc = yaml.load(yml);
  const etapes = Object.values(doc?.jobs ?? {}).reduce((n, j) => n + (j?.steps?.length ?? 0), 0);
  if (!etapes) throw new Error("aucune étape — la structure attendue (jobs.*.steps) n'est pas là");
  //  Toujours imprimé, même en mode garde seule : un contrôle qui peut passer
  //  au rouge doit dire aussi quand il passe au vert (ADR 0034).
  console.log(`  ✓ gates.yml est du YAML valide (${etapes} étapes)`);
} catch (e) {
  console.error("\n━━ gates.yml N'EST PAS DU YAML VALIDE ━━");
  console.error(`   ${String(e.message).split("\n")[0]}`);
  console.error("\n   GitHub refusera de charger ce workflow : AUCUNE porte ne tournera,\n   et le motif ci-dessous continuerait d'y lire des lignes comme si de rien\n   n'était. Un nom d'étape contenant « : » doit être entre guillemets.\n");
  process.exit(1);
}
//  PIÈGE MESURÉ (§11.122). La première version de cette garde ne cherchait que
//  les appels DIRECTS — la forme « node » suivie d'un chemin sous `scripts/`.
//  Or la CI atteint HUIT scripts autrement :
//    • par `npm run <nom>`, dont la vraie commande vit dans package.json
//      (`npm run dom-truth`, les six suites `npm run test-*`) ;
//    • par le crochet `prebuild`, que npm déclenche SEUL avant `npm run build`
//      et que rien n'écrit donc dans le YAML (`generate-tokens --check`).
//  La garde voyait 28 des 36 scripts réellement lancés. Une porte ajoutée à la
//  CI sous forme `npm run …` pouvait donc manquer à cette batterie sans que
//  rien ne crie — c'est la dérive de §11.81, dans la garde même qui la
//  surveille. Un mécanisme et sa PORTÉE sont deux choses (ADR 0031).
const scriptsNpm = JSON.parse(readFileSync(join(WEB, "package.json"), "utf8")).scripts ?? {};
const depuisCmd = (cmd) => [...String(cmd ?? "").matchAll(/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1]);
const lancesParCI = new Set(
  [...yml.matchAll(/node\s+scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1])
);
for (const [, nom] of yml.matchAll(/npm run ([a-z0-9:-]+)/g)) {
  for (const f of depuisCmd(scriptsNpm[nom])) lancesParCI.add(f);
  //  npm lance `prebuild` de lui-même avant `build` : personne ne l'écrit.
  if (nom === "build") for (const f of depuisCmd(scriptsNpm.prebuild)) lancesParCI.add(f);
}
const couverts = new Set(ETAPES.filter((e) => e.cmd).map((e) => e.cmd[0].replace("scripts/", "")));
// Lancés plus haut, hors de la boucle ETAPES : ils ont besoin d'arguments calculés.
couverts.add("validate-content.mjs");
//  Les six suites `test-*.mjs` sont lancées en bloc par le `node --test` du
//  haut de ce fichier : couvertes en substance, jamais nommées dans ETAPES.
for (const f of readdirSync(join(WEB, "scripts"))) if (/^test-.*\.mjs$/.test(f)) couverts.add(f);
const oublis = [...lancesParCI].filter((f) => !couverts.has(f) && !HORS_CHAMP.has(f)).sort();

//  ── SECOND SENS (§11.123) : l'inverse exact du précédent ──
//
//  La garde ci-dessus demande « la CI lance-t-elle une porte que j'ignore ? ».
//  Elle ne demande pas « existe-t-il un script que PERSONNE ne lance et que
//  AUCUN catalogue ne nomme ? ». Quatre étaient dans ce cas au 2026-09-20,
//  dont `wide-measure.mjs`, dont l'en-tête demande explicitement d'être
//  REJOUÉ après les arbitrages du propriétaire — introuvable, donc jamais
//  rejoué. Un script qu'aucun catalogue ne nomme est un script que personne
//  ne retrouve.
//
//  Les deux sens ensemble disent quelque chose ; chacun seul laisse une porte
//  de sortie (ADR 0031).
const tousScripts = readdirSync(join(WEB, "scripts")).filter((f) => f.endsWith(".mjs"));
const catalogue = new Set(
  [...readFileSync(join(REPO, "docs/audits/INSTRUMENTS.md"), "utf8")
    .matchAll(/web\/scripts\/([a-z0-9-]+\.mjs)/g)].map((m) => m[1])
);
const orphelins = tousScripts.filter(
  (f) => !/^test-.*\.mjs$/.test(f) && !lancesParCI.has(f) && !couverts.has(f) &&
         !HORS_CHAMP.has(f) && !catalogue.has(f)
).sort();

console.log();
if (orphelins.length) {
  console.log("━━ DES INSTRUMENTS QUE PERSONNE NE LANCE ET QU'AUCUN CATALOGUE NE NOMME ━━");
  for (const f of orphelins) console.log(`     • ${f}`);
  console.log("   Les ajouter à docs/audits/INSTRUMENTS.md (avec leur colonne « ne dit RIEN de »),");
  console.log("   ou à ETAPES / HORS_CHAMP s'ils doivent tourner. Un script introuvable est un");
  console.log("   script mort — et `wide-measure.mjs` demandait dans son en-tête d'être rejoué.");
  rouges++;
} else {
  console.log(`  ✓ aucun instrument orphelin (${tousScripts.length} scripts, ${catalogue.size} catalogués)`);
}

console.log();
if (oublis.length) {
  console.log("━━ LA BATTERIE A PRIS DU RETARD SUR LA CI ━━");
  console.log("   gates.yml lance ces scripts, ce fichier les ignore, et ils ne sont pas");
  console.log("   déclarés hors champ :");
  for (const f of oublis) console.log(`     • ${f}`);
  console.log("   Ajoute-les à ETAPES, ou à HORS_CHAMP avec la raison. C'est exactement");
  console.log("   la dérive qui a laissé cinq portes rouges pendant une semaine (§11.81).");
  rouges++;
} else {
  console.log(`  ✓ la liste couvre gates.yml (${couverts.size} portes + ${HORS_CHAMP.size} hors champ assumés)`);
}

//  ── TROISIÈME SENS (§11.180) : la porte peut-elle seulement TOURNER là-bas ? ──
//
//  Les deux gardes ci-dessus demandent si la liste est à jour. Aucune ne
//  demande si un script ARMÉ EN CI est capable de s'exécuter sur un runner.
//  Les instruments au navigateur se lancent ici sur `/opt/pw-browsers/chromium`,
//  un chemin de CE conteneur ; la CI, elle, installe son propre Chromium et en
//  passe le chemin par `PW_CHROMIUM_PATH`. Une porte armée qui ignore cette
//  variable tombe là-bas sur un exécutable absent : un rouge d'INFRASTRUCTURE
//  qui se lit comme un verdict produit.
//
//  Écrite le jour où j'ai commis exactement ça — une heure après avoir écrit
//  qu'« une porte armée qui n'a jamais été lancée n'est pas une porte
//  vérifiée ». Sur 59 instruments au navigateur, un seul avait le défaut, et
//  c'était le neuf. La règle ne suffit pas : il faut l'outiller (ADR 0033).
//  LA SONDE LIT LE CODE, PAS LES COMMENTAIRES. Premier jet : `src.includes(
//  "PW_CHROMIUM_PATH")` sur le fichier entier. Mon essai rouge a retiré la
//  variable de l'APPEL en laissant le commentaire qui la nomme juste au-dessus
//  — la garde est restée muette. Une règle se vérifie sur son EFFET, jamais sur
//  la présence de la déclaration (ADR 0038, 1ʳᵉ loi) : le commentaire EST la
//  déclaration. On retire donc commentaires et chaînes avant de chercher.
const sansCommentaires = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/(^|[^:])\/\/[^\n]*/g, "$1 ");
const sansOverride = [...lancesParCI].filter((f) => {
  const chemin = join(WEB, "scripts", f);
  if (!existsSync(chemin)) return false;
  const code = sansCommentaires(readFileSync(chemin, "utf8"));
  //  La variable peut être lue ailleurs qu'à l'appel (`const exe = process.env
  //  .PW_CHROMIUM_PATH || …`) : on exige qu'elle soit dans le CODE, pas sur la
  //  même ligne que `executablePath` — un motif plus étroit que la réalité
  //  rendrait la garde aveugle aux formes légitimes.
  return /chromium\.launch/.test(code) && !code.includes("PW_CHROMIUM_PATH");
}).sort();

console.log();
if (sansOverride.length) {
  console.log("━━ DES PORTES ARMÉES EN CI QUI NE POURRAIENT PAS Y DÉMARRER ━━");
  for (const f of sansOverride) console.log(`     • ${f}`);
  console.log("   Elles lancent Chromium sur un chemin en dur et ignorent PW_CHROMIUM_PATH,");
  console.log("   que gates.yml exporte. Sur un runner, l'exécutable n'est pas là : la porte");
  console.log("   échoue sur la CONNEXION au navigateur, pas sur le produit.");
  console.log("   Correctif : `process.env.PW_CHROMIUM_PATH || \"/opt/pw-browsers/chromium\"`.");
  rouges++;
} else {
  console.log("  ✓ chaque porte au navigateur armée en CI honore PW_CHROMIUM_PATH");
}

if (!GARDE_SEULE) console.log(rouges ? `\n━━ ${rouges} contrôle(s) ROUGE(s) — ne pas pousser en prétendant le contraire ━━\n`
                   : "\n━━ tout est vert ━━\n");
process.exit(rouges ? 1 : 0);
