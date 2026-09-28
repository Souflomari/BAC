#!/usr/bin/env node
/**
 * indice-refus.mjs — l'indice du refus : le choix qui ne s'engage pas
 * est-il celui qu'on peut barrer sans rien savoir ?
 *
 * TROISIÈME tell de QCM mesuré sur ce corpus, après la LONGUEUR
 * (`indice-longueur.mjs`) et l'ABSOLU (`indice-absolu.mjs`). C'est le plus
 * large des trois, et de loin le plus fiable.
 *
 * LA MESURE QUI A OUVERT LE DOSSIER (2026-09-20, sur 1 974 items à clé unique).
 * Sept tells candidats passés au même protocole ; deux sortent du bruit :
 *
 *     tell                                          tire   clé   hasard  marge
 *     un seul choix REFUSE de s'engager              221    4 %   25 %   −21 pts
 *     un seul choix porte une formule                122   57 %   25 %   +31 pts
 *     un seul choix N'EN porte pas                   168    5 %   25 %   −20 pts
 *     le clang (un mot du tronc reparaît)            266   14 %   25 %   −11 pts
 *     un seul choix nie                              535   28 %   25 %    +3 pts
 *     trois choix commencent pareil, un diffère      418   27 %   25 %    +2 pts
 *     un seul choix est au pluriel                   176   28 %   25 %    +3 pts
 *
 * La notation (« un seul choix porte une formule ») n'est qu'un PROXY : ce que
 * l'élève repère n'est pas le symbole, c'est l'ENGAGEMENT. Un choix qui donne
 * $v^2/r$ s'engage ; un choix qui dit « impossible à savoir sans refaire le
 * calcul » ne s'engage pas. C'est cette seconde forme que ce script mesure,
 * directement.
 *
 * LE DÉFAUT, EN CLAIR. Dans 221 items, exactement un choix refuse de conclure.
 * Il est la bonne réponse 9 fois sur 221 — 4 %, contre 25 % au hasard. Un élève
 * qui n'a rien révisé et qui barre systématiquement ce choix a raison 96 % du
 * temps, et passe de 25 % à 32 % sur ces items-là sans avoir rien appris.
 * Vingt et une notions ne l'ont JAMAIS mis en bonne réponse, pas une fois.
 *
 * POURQUOI CE N'EST PAS « SUPPRIMER CES DISTRACTEURS ». « Croire qu'il manque
 * une donnée » est une vraie erreur d'élève, et le corpus la traite comme
 * telle : 206 des 214 distracteurs de refus portent un `misconception:`. Le
 * défaut n'est pas qu'ils existent — c'est qu'ils ne sont JAMAIS vrais. Savoir
 * qu'on ne peut pas conclure est une compétence du bac (forme indéterminée,
 * données insuffisantes) ; un corpus où le refus est toujours faux enseigne
 * exactement le contraire.
 *
 * CE QUE `indice-absolu` VOIT DÉJÀ — mesuré, pas supposé (ADR 0033, le cas
 * « exacte sur une autre question »). Sa liste contient « impossible » et
 * « aucun ». Sur les 221 items, il en tire 91 (41 %) au titre de l'une ou
 * l'autre de ses conditions. **Cent trente lui sont invisibles (59 %)**, et
 * même sur les 91 il répond à une autre question — « un seul choix
 * sur-affirme-t-il ? » — dont le cliquet ne bouge pas quand celui-ci empire.
 * Les deux instruments ne se remplacent donc pas.
 *
 *   node scripts/indice-refus.mjs            → le tableau
 *   node scripts/indice-refus.mjs --detail   → les items, notion par notion
 *   node scripts/indice-refus.mjs --sceller  → refait la référence
 *   node scripts/indice-refus.mjs --porte    → le cliquet (sort 1 si ça empire)
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const CONTENU = path.join(REPO, "content");
const BASE = path.join(ICI, "indice-refus.base.json");

const ARGS = process.argv.slice(2);
const PORTE = ARGS.includes("--porte");
const SCELLER = ARGS.includes("--sceller");
const DETAIL = ARGS.includes("--detail");

/** En dessous de ce nombre d'items qui tirent, un pourcentage est du bruit. */
const MIN_TRANCHE = 4;
/** Une notion neuve ne peut pas naître au-dessus de cette fiabilité d'élimination. */
const PLAFOND_NEUF = 85;

/**
 * Les formes du refus. Chacune dit la même chose : « je ne tranche pas ».
 *
 * CE QUI EN EST EXCLU, ET COMMENT. « Non : PGCD(4,6)=2 ≠ 1, donc on ne peut
 * pas conclure — contre-exemple : 12 » contient le mot à mot du refus et n'en
 * est pas un : ce choix TRANCHE (« Non »), le prouve, et donne un
 * contre-exemple. Un élève ne peut pas le barrer à vue. Le motif est donc
 * ANCRÉ AU DÉBUT de la proposition : le refus doit être ce que le choix dit,
 * pas une clause dans un raisonnement. Une amorce courte (« Rien : », « Non, »)
 * est retirée avant l'ancrage, parce qu'elle ne change pas la nature du choix.
 *
 * PREMIÈRE VERSION DE CE FICHIER : le motif n'était pas ancré, et cette
 * note-ci décrivait déjà l'exclusion. Le code ne la faisait pas. AR-19 était
 * compté comme un refus — c'est-à-dire que l'instrument comptait à son crédit
 * le seul cas de `maths/arithmetique` où le refus « est la clé ». La note
 * disait vrai de l'intention, faux du code : exactement le défaut que les
 * portes de §11.99 cherchent ailleurs.
 */
const REFUS_DEBUT = [
  /^on ne peut (?:pas |rien )(?:conclure|savoir|dire|affirmer|determiner|calculer|repondre|trancher|comparer|prevoir|etablir)\b/,
  /^on ne peut pas\b(?=[\s.!?]*$)/,
  /^on ne sait pas\b/,
  /^impossible (?:a|de|d')\s*(?:dire|savoir|determiner|calculer|conclure|comparer|trancher|prevoir|repondre|etablir)\b/,
  /^il est impossible de (?:conclure|savoir|dire|determiner|trancher|repondre)\b/,
  /^(?:c'est )?(?:indeterminable|indecidable)\b/,
  /^(?:cela |ca )?ne peut (?:pas )?etre determine/,
  /^rien\b(?=[\s.!?]*$)/,
];

/** Celles-ci sont un refus où qu'elles tombent : rien d'autre n'est affirmé. */
const REFUS_PARTOUT = [
  /\baucune des (?:reponses|propositions|affirmations|autres)\b/,
  /\bpas assez d'(?:informations|elements|donnees)\b/,
  /\bil manque (?:des|une) (?:donnees|donnee|informations|information)\b/,
];

/**
 * Une amorce courte ne change pas la nature du choix : « Rien : on ne peut pas
 * conclure » refuse autant que « On ne peut pas conclure ». On la retire avant
 * d'ancrer. Ce qui suit doit alors ÊTRE le refus.
 */
const AMORCE = /^(?:rien|non|oui|si|peut-etre|aucun|aucune)\s*[:,\u2014-]\s*/;

/** Le texte, sans accents ni casse : les motifs ci-dessus sont écrits en clair. */
function aplati(t) {
  return String(t ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

const refuse = (texte) => {
  const t = aplati(texte).trim();
  if (REFUS_PARTOUT.some((r) => r.test(t))) return true;
  const noyau = t.replace(AMORCE, "");
  return REFUS_DEBUT.some((r) => r.test(noyau));
};

function charger(fichier, cle) {
  let parse;
  try {
    parse = yaml.load(fs.readFileSync(fichier, "utf-8"));
  } catch {
    return [];
  }
  const liste = parse && Array.isArray(parse[cle]) ? parse[cle] : [];
  return liste.filter(
    (it) =>
      it &&
      typeof it.id === "string" &&
      it.type === "mcq" &&
      Array.isArray(it.choices) &&
      it.choices.length >= 3
  );
}

// ── la mesure ──

const notions = [];
let distracteursRefus = 0;
let distracteursRefusSansTag = 0;

const matieres = fs
  .readdirSync(CONTENU)
  .filter((n) => !n.startsWith("_") && !n.startsWith("."))
  .filter((n) => fs.statSync(path.join(CONTENU, n)).isDirectory())
  .sort();

for (const matiere of matieres) {
  const dm = path.join(CONTENU, matiere);
  const slugs = fs
    .readdirSync(dm)
    .filter((n) => !n.startsWith("_") && !n.startsWith("."))
    .filter((n) => fs.statSync(path.join(dm, n)).isDirectory())
    .sort();

  for (const slug of slugs) {
    const dir = path.join(dm, slug);
    if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
    const items = [
      ...charger(path.join(dir, "items.yaml"), "items"),
      ...charger(path.join(dir, "checkpoints.yaml"), "checkpoints"),
    ];

    const n = { matiere, slug, eligibles: 0, tranche: 0, cle: 0, cas: [] };

    for (const item of items) {
      const choix = item.choices;
      const justes = choix.map((c, i) => (c && c.correct === true ? i : -1)).filter((i) => i >= 0);
      if (justes.length !== 1) continue;
      const iJuste = justes[0];
      n.eligibles++;

      const r = choix.map((c) => refuse(c?.text));
      choix.forEach((c, i) => {
        if (!r[i] || i === iJuste) return;
        distracteursRefus++;
        if (!c.misconception) distracteursRefusSansTag++;
      });

      const quiRefuse = r.map((x, i) => (x ? i : -1)).filter((i) => i >= 0);
      if (quiRefuse.length !== 1) continue;
      n.tranche++;
      const estCle = quiRefuse[0] === iJuste;
      if (estCle) n.cle++;
      n.cas.push({ id: item.id, estCle, texte: String(choix[quiRefuse[0]].text).replace(/\s+/g, " ").slice(0, 96) });
    }

    if (n.tranche > 0) notions.push(n);
  }
}

/** Fiabilité d'élimination : barrer ce choix, c'est avoir raison X % du temps. */
const fiab = (n) => (n.tranche ? Math.round((100 * (n.tranche - n.cle)) / n.tranche) : 0);

const totalTranche = notions.reduce((s, n) => s + n.tranche, 0);
const totalCle = notions.reduce((s, n) => s + n.cle, 0);
const fiabCorpus = totalTranche ? Math.round((100 * (totalTranche - totalCle)) / totalTranche) : 0;

// ── sceller ──

if (SCELLER) {
  const base = {
    scelle_le: new Date().toISOString().slice(0, 10),
    corpus: { tranche: totalTranche, cle: totalCle, fiabilite: fiabCorpus },
    notions: Object.fromEntries(
      notions.map((n) => [`${n.matiere}/${n.slug}`, { tranche: n.tranche, cle: n.cle, fiabilite: fiab(n) }])
    ),
  };
  fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + "\n", "utf-8");
  console.log(`indice-refus : référence scellée — ${notions.length} notions, ${totalTranche} items qui tirent, ${fiabCorpus} % de fiabilité`);
  process.exit(0);
}

// ── le tableau ──

if (!PORTE) {
  console.log("\n━━ indice du refus : le choix qui ne s'engage pas est-il barrable à vue ? ━━\n");
  console.log(
    "notion".padEnd(44) + "items".padStart(6) + "tirent".padStart(8) + "clé".padStart(6) + "élimin.".padStart(9)
  );
  console.log("─".repeat(73));
  for (const n of [...notions].sort((a, b) => fiab(b) - fiab(a) || b.tranche - a.tranche)) {
    const marque = n.tranche >= MIN_TRANCHE && fiab(n) >= 90 ? " ←" : "";
    console.log(
      `${`${n.matiere}/${n.slug}`.padEnd(44)}${String(n.eligibles).padStart(6)}${String(n.tranche).padStart(8)}${String(n.cle).padStart(6)}${`${fiab(n)} %`.padStart(9)}${marque}`
    );
  }
  console.log("─".repeat(73));
  console.log(
    `${"CORPUS".padEnd(44)}${"".padStart(6)}${String(totalTranche).padStart(8)}${String(totalCle).padStart(6)}${`${fiabCorpus} %`.padStart(9)}`
  );
  const jamais = notions.filter((n) => n.tranche >= MIN_TRANCHE && n.cle === 0);
  console.log(
    `\n  ${jamais.length} notions (≥${MIN_TRANCHE} items qui tirent) où le refus n'est JAMAIS la bonne réponse.`
  );
  console.log(
    `  ${distracteursRefus} distracteurs de refus dans le corpus, dont ${distracteursRefusSansTag} sans \`misconception:\`` +
      ` — ${Math.round((100 * (distracteursRefus - distracteursRefusSansTag)) / Math.max(1, distracteursRefus))} % sont donc DIAGNOSTIQUÉS.`
  );
  console.log(
    `  Ce n'est pas un corpus qui bâcle : c'est un corpus qui enseigne, sans le vouloir,\n  que refuser de conclure est toujours faux.\n`
  );

  if (DETAIL) {
    for (const n of [...notions].sort((a, b) => b.tranche - a.tranche)) {
      if (n.tranche < 2) continue;
      console.log(`\n── ${n.matiere}/${n.slug} — ${n.tranche} items, clé ${n.cle} fois ──`);
      for (const c of n.cas) console.log(`  ${c.estCle ? "✔CLÉ " : "     "}${c.id.padEnd(22)} « ${c.texte} »`);
    }
    console.log();
  }
  process.exit(0);
}

// ── le cliquet ──
//
// DEUX SENS, parce qu'un seul se contourne (ADR 0031). Ne surveiller que la
// FIABILITÉ laisserait un auteur ajouter dix distracteurs de refus de plus à
// fiabilité constante : le corpus empire, la porte reste verte. Ne surveiller
// que le NOMBRE laisserait rendre chaque refus plus systématiquement faux à
// nombre constant. Il faut les deux.

if (!fs.existsSync(BASE)) {
  console.error("indice-refus : pas de référence. Lance --sceller d'abord.");
  process.exit(1);
}
const ref = JSON.parse(fs.readFileSync(BASE, "utf-8"));
const casses = [];

for (const n of notions) {
  const cle = `${n.matiere}/${n.slug}`;
  const r = ref.notions[cle];

  if (!r) {
    if (n.tranche >= MIN_TRANCHE && fiab(n) > PLAFOND_NEUF) {
      casses.push(
        `${cle} — notion NEUVE à ${fiab(n)} % de fiabilité d'élimination (${n.tranche - n.cle}/${n.tranche}). ` +
          `Le plafond pour une notion neuve est ${PLAFOND_NEUF} %. Un refus qui n'est jamais vrai s'apprend en deux items.`
      );
    }
    continue;
  }

  // Sens 1 — le NOMBRE d'items où le tell tire ne remonte pas.
  if (n.tranche > r.tranche) {
    casses.push(
      `${cle} — ${r.tranche} → ${n.tranche} items où un seul choix refuse de s'engager. ` +
        `Le cliquet ne monte pas : chaque item de plus est un item de plus barrable à vue.`
    );
  }

  // Sens 2 — le nombre de fois où le refus est VRAI ne descend pas.
  //
  // PREMIÈRE VERSION, ET POURQUOI ELLE ÉTAIT INERTE (§11.104). Ce sens
  // surveillait d'abord la FIABILITÉ, sous garde `tranche >= MIN_TRANCHE`.
  // Or aucune notion à quatre items qui tirent ou plus n'a de refus vrai : les
  // dix-neuf sont déjà à 100 %, c'est-à-dire au PLAFOND. La fiabilité ne
  // pouvait donc pas monter, et le sens ne pouvait pas devenir rouge. Une
  // porte qui ne peut pas crier ne garde rien (ADR 0031) — et celle-ci a
  // échoué à son propre essai rouge, ce qui est exactement à quoi sert un
  // essai rouge.
  //
  // Le comptage direct n'a ni seuil ni bruit : les deux seuls items du corpus
  // où « on ne peut pas conclure » est la bonne réponse sont ce qui empêche le
  // corpus d'enseigner que le refus est toujours faux. Les perdre est la
  // régression à empêcher, et elle se compte.
  if (n.cle < r.cle) {
    casses.push(
      `${cle} — ${r.cle} → ${n.cle} item(s) où le refus est la BONNE réponse. ` +
        `Ce sont eux qui empêchent le corpus d'enseigner que refuser est toujours faux.`
    );
  }

  // Sens 3 — la fiabilité ne remonte pas là où elle a encore de la marge.
  if (n.tranche >= MIN_TRANCHE && r.fiabilite < 100 && fiab(n) > r.fiabilite) {
    casses.push(
      `${cle} — élimination fiable à ${r.fiabilite} % → ${fiab(n)} % (${n.tranche - n.cle}/${n.tranche}). ` +
        `Barrer le choix qui ne s'engage pas devient PLUS payant qu'avant.`
    );
  }
}

if (casses.length) {
  console.error("━━ cliquet indice-refus : ROMPU ━━");
  for (const c of casses) console.error(`   ${c}`);
  console.error(
    "\n   Un choix qui refuse de conclure et qui n'est jamais la bonne réponse apprend\n" +
      "   à l'élève à le barrer sans lire. Il apprend aussi, en creux, que « on ne peut\n" +
      "   pas conclure » est toujours faux — ce qui est faux, et évalué au bac.\n" +
      "   Détail : node scripts/indice-refus.mjs --detail\n"
  );
  process.exit(1);
}

console.log(
  `indice-refus : cliquet tenu — ${notions.length} notions, ${totalTranche} items qui tirent, ${fiabCorpus} % de fiabilité d'élimination ✓`
);
