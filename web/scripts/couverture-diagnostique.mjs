/**
 * couverture-diagnostique.mjs — le moteur de diagnostic voit-il quelque chose ?
 *
 * Tout le produit repose sur une boucle : l'élève se trompe, le modèle
 * apprenant reconnaît QUELLE erreur il vient de commettre, et la remédiation
 * vise cette erreur-là. Le seul fil qui relie ces trois moments est un champ :
 * `misconception:` sur un distracteur. Sans lui, une mauvaise réponse n'est
 * qu'un point perdu — le produit redevient un quiz.
 *
 * Ce que la chaîne fait de ce champ (LEARNER-MODEL-SPEC, build-learner-inputs) :
 *   • `learner-model-data.json` = { notion → { misconception → nb d'items } },
 *     construit à partir du BANC DE FIN SEUL (items.yaml) — les checkpoints
 *     sont délibérément exclus du décompte, pour ne pas compter deux fois ;
 *   • le modèle ne déclare une misconception ÉVALUABLE que si elle est
 *     couverte par ≥ 3 items du banc (le PLANCHER). En dessous, son état reste
 *     « unassessed » à jamais — ni détectée, ni écartée.
 *
 * D'où quatre nombres par notion, et un verdict :
 *   • sans tag    — distracteurs sans `misconception:` exploitable. Une réponse
 *                   fausse que la chaîne ne sait rattacher à rien. La colonne
 *                   « dont nul » en isole la part DÉLIBÉRÉE : `misconception:
 *                   null`, écrit par l'auteur pour dire « ce distracteur n'est
 *                   pas piloté par une erreur nommée ». Les deux comptent
 *                   pareil pour le moteur — une réponse fausse qu'il ne sait
 *                   pas nommer — mais pas pour le lecteur : l'un est un oubli,
 *                   l'autre une décision.
 *   • fantômes    — distracteurs dont le tag n'est PAS déclaré dans le bloc
 *                   `misconceptions:` de la notion. La chaîne compte l'id, mais
 *                   rien ne peut en afficher le libellé : l'élève verrait un
 *                   diagnostic sans nom.
 *   • plancher    — misconceptions couvertes par ≥ 3 items du banc : les seules
 *                   que le modèle peut réellement évaluer.
 *   • sous-plancher — couvertes par 1 ou 2 items : déclarées, visées, et
 *                   pourtant inévaluables. C'est la dette la plus trompeuse,
 *                   parce qu'elle a l'air d'un travail fait.
 *   • omissions   — sans tag MOINS les nuls explicites : les distracteurs dont
 *                   le champ manque tout court. Gardé par une PORTE FRANCHE à
 *                   zéro depuis le 2026-09-05 : le corpus entier a été passé en
 *                   revue, donc un champ absent est désormais toujours un oubli.
 *   • AVEUGLE     — aucune misconception au plancher. Sur cette notion, le
 *                   modèle ne dira jamais rien de l'élève.
 *
 * Ce que l'instrument NE dit PAS : si le tag est le BON. Un distracteur peut
 * porter un id parfaitement déclaré et ne rien avoir à voir avec l'erreur qu'il
 * incarne. Seule une relecture pédagogique le dira — comme pour les indices de
 * forme, l'instrument garde la plomberie, pas le sens.
 *
 * Trois modes :
 *   node scripts/couverture-diagnostique.mjs           → le rapport
 *   node scripts/couverture-diagnostique.mjs --porte   → le cliquet (CI)
 *   node scripts/couverture-diagnostique.mjs --sceller → réécrit la ligne de base
 */
import fs from "node:fs";
import path from "node:path";
import { PLANCHER, listerNotions, mesurerNotion } from "./lib/couverture-compte.mjs";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const CONTENU = path.join(REPO, "content");
const BASE = path.join(ICI, "couverture-diagnostique.base.json");

const ARGS = process.argv.slice(2);
const PORTE = ARGS.includes("--porte");
const SCELLER = ARGS.includes("--sceller");
const DETAIL = ARGS.includes("--detail");

// ── la mesure ──
// La convention de comptage vit dans scripts/lib/couverture-compte.mjs, parce
// que resume-couverture.mjs la partage : deux instruments qui compteraient
// chacun de leur côté finiraient par s'accuser mutuellement de mentir.

const notions = [];
const detail = DETAIL ? [] : null;

for (const n of listerNotions(CONTENU)) {
  const m = mesurerNotion(n, detail);
  if (m) notions.push(m);
}

// ── mode --sceller ──

if (SCELLER) {
  const base = {
    _lisezMoi:
      "Ligne de base du cliquet couverture-diagnostique. `sansTag` et `fantomes` ne doivent que " +
      "DESCENDRE ; `plancher` ne doit que MONTER. Régénérer avec " +
      "`node scripts/couverture-diagnostique.mjs --sceller` UNIQUEMENT après avoir amélioré la " +
      "couverture — jamais pour faire taire une régression.",
    _scelleLe: new Date().toISOString().slice(0, 10),
    notions: Object.fromEntries(
      notions.map((n) => [n.cle, { sansTag: n.sansTag, fantomes: n.fantomes, plancher: n.plancher }])
    ),
  };
  fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + "\n", "utf-8");
  console.log(
    `couverture-diagnostique : ligne de base scellée — ${notions.length} notions → ${path.relative(REPO, BASE)}`
  );
  process.exit(0);
}

// ── le rapport ──

const T = (f) => notions.reduce((s, n) => s + n[f], 0);
const aveugles = notions.filter((n) => n.aveugle);

if (!PORTE) {
  console.log("");
  console.log("couverture-diagnostique — le moteur voit-il quelque chose, et sur quelles notions ?");
  console.log("═".repeat(122));
  console.log(
    `${"notion".padEnd(44)} ${"banc".padStart(5)} ${"distr.".padStart(6)} ${"sans tag".padStart(9)} ` +
      `${"dont nul".padStart(9)} ${"fantômes".padStart(9)} ${"plancher".padStart(9)} ${"sous-pl.".padStart(9)} ${"orph.".padStart(6)}`
  );
  console.log("─".repeat(122));
  for (const n of [...notions].sort(
    (a, b) => a.plancher - b.plancher || b.sansTag - a.sansTag || a.cle.localeCompare(b.cle)
  )) {
    console.log(
      `${n.cle.padEnd(44)} ${String(n.itemsBanc).padStart(5)} ${String(n.distracteurs).padStart(6)} ` +
        `${String(n.sansTag).padStart(9)} ${String(n.nulExplicite).padStart(9)} ${String(n.fantomes).padStart(9)} ${String(n.plancher).padStart(9)} ` +
        `${String(n.sousPlancher).padStart(9)} ${String(n.orphelines).padStart(6)}` +
        (n.aveugle ? "  ← AVEUGLE" : "")
    );
  }
  console.log("─".repeat(122));
  console.log(
    `${"TOTAL".padEnd(44)} ${String(T("itemsBanc")).padStart(5)} ${String(T("distracteurs")).padStart(6)} ` +
      `${String(T("sansTag")).padStart(9)} ${String(T("nulExplicite")).padStart(9)} ${String(T("fantomes")).padStart(9)} ${String(T("plancher")).padStart(9)} ` +
      `${String(T("sousPlancher")).padStart(9)} ${String(T("orphelines")).padStart(6)}`
  );
  console.log("");
  console.log(
    `${aveugles.length} notion(s) sur ${notions.length} sont AVEUGLES : aucune misconception n'y atteint\n` +
      `le plancher de ${PLANCHER} items du banc, donc le modèle n'y dira jamais rien de l'élève.`
  );
  console.log(
    `${T("sansTag")} distracteur(s) sur ${T("distracteurs")} ne portent aucun tag exploitable — une\n` +
      `réponse fausse que la chaîne ne sait rattacher à aucune erreur nommée. ${T("nulExplicite")} d'entre\n` +
      `eux portent un \`misconception: null\` EXPLICITE : une décision d'auteur, pas un oubli.`
  );
  console.log("");
  if (DETAIL) {
    for (const d of detail) console.log(`  ${d}`);
    console.log("");
  }
}

// ── le cliquet ──

const brut = (() => {
  try {
    return fs.readFileSync(BASE, "utf-8");
  } catch {
    return null;
  }
})();
if (!brut) {
  console.error(
    `couverture-diagnostique : pas de ligne de base (${path.relative(REPO, BASE)}).\n` +
      `Sceller d'abord : node scripts/couverture-diagnostique.mjs --sceller`
  );
  process.exit(PORTE ? 1 : 0);
}
const base = JSON.parse(brut);
const echecs = [];

for (const n of notions) {
  const ref = base.notions[n.cle];
  if (!ref) {
    // Notion NEUVE : elle naît sans dette. Un contenu écrit aujourd'hui n'a
    // aucune raison de livrer des distracteurs muets.
    if (n.omissions > 0)
      echecs.push(`${n.cle} — notion NEUVE avec ${n.omissions} distracteur(s) sans champ misconception.`);
    if (n.fantomes > 0)
      echecs.push(`${n.cle} — notion NEUVE avec ${n.fantomes} tag(s) non déclaré(s) dans son inventaire.`);
    continue;
  }
  if (n.sansTag > ref.sansTag)
    echecs.push(`${n.cle} — distracteurs SANS TAG : ${ref.sansTag} → ${n.sansTag}.`);
  // PORTE FRANCHE, pas cliquet : depuis le 2026-09-05, tout distracteur du
  // corpus porte soit un tag, soit un `misconception: null` EXPLICITE. Un
  // champ simplement ABSENT est donc toujours un oubli, jamais une décision —
  // et il n'y a plus de dette à amortir sur cette ligne.
  if (n.omissions > 0)
    echecs.push(
      `${n.cle} — ${n.omissions} distracteur(s) sans champ \`misconception\`. ` +
        `Écrire le tag, ou \`misconception: null\` si le distracteur ne porte volontairement aucune erreur nommée.`
    );
  if (n.fantomes > ref.fantomes)
    echecs.push(`${n.cle} — tags FANTÔMES (non déclarés) : ${ref.fantomes} → ${n.fantomes}.`);
  if (n.plancher < ref.plancher)
    echecs.push(`${n.cle} — misconceptions ÉVALUABLES : ${ref.plancher} → ${n.plancher}. Le plancher ne recule pas.`);
}

if (echecs.length > 0) {
  console.error("\n━━ cliquet couverture-diagnostique : ROMPU ━━");
  for (const e of echecs) console.error(`   ${e}`);
  console.error(
    "\n   Un distracteur sans tag est une erreur d'élève que le produit voit passer\n" +
      "   sans la nommer. Un tag non déclaré est un diagnostic sans libellé. Une\n" +
      "   misconception qui retombe sous 3 items du banc redevient inévaluable.\n" +
      "   Détail : node scripts/couverture-diagnostique.mjs --detail"
  );
  process.exit(1);
}

console.log(
  `couverture-diagnostique : cliquet tenu — ${notions.length} notions, ${T("sansTag")} distracteur(s) sans tag, ` +
    `${T("fantomes")} fantôme(s), ${T("plancher")} misconception(s) évaluable(s) ✓`
);
