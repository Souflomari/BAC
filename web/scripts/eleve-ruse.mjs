#!/usr/bin/env node
/**
 * eleve-ruse.mjs — combien un élève qui n'a RIEN révisé peut-il obtenir sur
 * notre banc diagnostique, rien qu'en appliquant les ficelles du QCM ?
 *
 * POURQUOI CE SCRIPT EXISTE. Trois instruments mesurent chacun UN tell —
 * `indice-longueur`, `indice-absolu`, `indice-refus`. Chacun rapporte sa
 * tranche et son pourcentage. **Personne n'a jamais mesuré leur UNION.** Or
 * c'est l'union qui compte : un élève n'applique pas une ficelle, il les
 * applique toutes, dans l'ordre où elles lui viennent.
 *
 * Trois chiffres à 45 %, 51 % et 99 % sur des tranches qui se recouvrent ne
 * disent rien du total. Il faut le calculer.
 *
 * POURQUOI ÇA COMPTE PLUS QUE LES TROIS SÉPARÉMENT. Ce n'est pas une question
 * de note : c'est une question de MODÈLE D'APPRENANT. Le moteur lit les
 * réponses de l'élève comme des indices de maîtrise. Une bonne réponse obtenue
 * à la ficelle est un FAUX POSITIF versé au modèle : le produit croit qu'une
 * misconception est levée alors qu'elle est intacte, et cesse de la travailler.
 * Le tell ne coûte donc pas quelques points sur un score — il aveugle
 * l'instrument qui est la raison d'être du produit (VISION, l'anatomie de la
 * notion).
 *
 * LA STRATÉGIE, FIXÉE D'AVANCE ET NON AJUSTÉE APRÈS COUP. Dans cet ordre, et
 * chaque étape ne s'applique que si elle laisse au moins un choix debout :
 *
 *   1. barrer ce qui refuse de conclure          (indice-refus : 99 % fiable)
 *   2. barrer ce qui sur-affirme                 (indice-absolu)
 *   3. barrer l'unique choix qui reprend un mot du tronc   (le clang, INVERSÉ
 *      sur ce corpus : 14 % de clés contre 25 % au hasard, sur 266 items)
 *   4. parmi les survivants, cocher le plus long (indice-longueur)
 *
 * L'espérance est calculée EXACTEMENT, pas simulée : si la clé survit et est
 * strictement la plus longue, 1 ; si elle est à égalité avec k−1 autres, 1/k ;
 * si elle a été barrée, 0.
 *
 * LE HASARD N'EST PAS UNE HYPOTHÈSE, C'EST UN CALCUL. La stratégie ne lit
 * jamais `correct` : elle arrête un ensemble de finalistes F à partir des
 * seuls textes, puis tire dedans. Si la clé était tirée au sort parmi les n
 * choix, l'espérance vaudrait exactement (somme sur i de [i dans F]/|F|) / n,
 * c'est-à-dire 1/n. Le « hasard » affiché est cette valeur exacte, pas une
 * convention — l'écart mesuré est donc un écart à une référence démontrée.
 *
 * LE TÉMOIN, ET CE QU'IL NE CONTRÔLE PAS. Le même calcul tourne en cochant le
 * plus COURT sans rien barrer. S'il montait lui aussi, la mesure capterait un
 * artefact et non une ficelle ; il descend à 14,4 %, symétriquement. Mais il
 * n'inverse que l'étape de LONGUEUR, pas les trois éliminations. Pour
 * celles-là la garantie est ailleurs : chacune a son instrument, sa tranche
 * mesurée et son cliquet vérifié rouge.
 *
 *   node scripts/eleve-ruse.mjs           → le chiffre, et la ventilation
 *   node scripts/eleve-ruse.mjs --etapes  → l'apport de chaque ficelle, isolée
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const CONTENU = path.resolve(ICI, "..", "..", "content");
const ETAPES = process.argv.includes("--etapes");
const PORTE = process.argv.includes("--porte");
const SCELLER = process.argv.includes("--sceller");
const BASE = path.join(ICI, "eleve-ruse.base.json");

// ── les trois motifs, repris mot pour mot de leurs instruments ──

const ABSOLU =
  /(\btoujours\b|\bjamais\b|\bforcément\b|\bnécessairement\b|\bobligatoirement\b|\bsystématiquement\b|\buniquement\b|\bexclusivement\b|\bimpossible\b|\ben aucun cas\b|\bquel(?:le)? que soit\b|\bn'importe (?:quel|quelle|lequel)\b|\btous les\b|\btoutes les\b|\baucun\b|\baucune\b)/i;

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
const REFUS_PARTOUT = [
  /\baucune des (?:reponses|propositions|affirmations|autres)\b/,
  /\bpas assez d'(?:informations|elements|donnees)\b/,
  /\bil manque (?:des|une) (?:donnees|donnee|informations|information)\b/,
];
const AMORCE = /^(?:rien|non|oui|si|peut-etre|aucun|aucune)\s*[:,—-]\s*/;

const aplati = (t) =>
  String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

const refuse = (texte) => {
  const t = aplati(texte).trim();
  if (REFUS_PARTOUT.some((r) => r.test(t))) return true;
  return REFUS_DEBUT.some((r) => r.test(t.replace(AMORCE, "")));
};

const STOP = new Set(
  "alors ainsi apres aucun aucune aussi autre autres avant avec beaucoup cela celle celles celui cette ceux chaque comme dans deux donc elle elles encore entre etre faire fait toute toutes tous leur leurs mais meme moins parce plus pour pourquoi quand quel quelle quels quelles sans selon sont sous suivant suivante suivantes suivants sur toujours trois vers etait etaient nous vous point points valeur valeurs cas exemple partir donne donnee donnees suite ordre autour lorsque puisque expression proposition affirmation reponse reponses choix laquelle lequel lesquels lesquelles".split(" ")
);
const motsUtiles = (s) => {
  const t = aplati(s).replace(/\$[^$]*\$/g, " ").replace(/[^a-z' ]/g, " ");
  return new Set(t.split(/\s+/).filter((w) => w.length >= 6 && !STOP.has(w)));
};

/** La longueur telle que l'élève la voit : le texte rendu, formules comprises. */
const longueur = (c) => String(c?.text ?? "").length;

/**
 * LE SEUIL DE VISIBILITÉ, et pourquoi il a fallu l'ajouter (§11.107).
 *
 * La première version de ce script cochait « le plus long » au CARACTÈRE PRÈS.
 * Un élève ne compte pas les caractères : il regarde. `indice-longueur` le sait
 * depuis toujours et n'appelle « exploitable » qu'un écart d'au moins 20
 * caractères ET d'au moins 20 % — parce que « +20 sur 400 ne se remarquent
 * pas ».
 *
 * Les deux instruments se contredisaient donc sur ce qu'un élève SAIT FAIRE, et
 * l'écart n'était pas mince : sur `pc/lois-de-newton`, la clé est strictement
 * la plus longue 22 fois sur 38 (58 %) — mais `indice-longueur` y compte 0 %
 * d'indice exploitable, parce qu'aucun de ces écarts ne se voit.
 *
 * Ce script adopte donc le MÊME critère. Quand l'écart ne se voit pas, l'élève
 * ne tranche pas : il tire parmi les survivants. Le chiffre qui en sort est plus
 * petit et il est le bon — les deux instruments répondent enfin à la même
 * question.
 */
const ECART_MIN = 20;
const AVANCE_MIN = 0.2;
const seVoit = (premier, second) => premier - second >= ECART_MIN && premier - second >= second * AVANCE_MIN;

// ── la stratégie ──

/**
 * Renvoie l'espérance de réussite de l'élève rusé sur cet item.
 * `sens` vaut +1 (la ficelle normale) ou −1 (le témoin inversé).
 */
function esperance(item, iJuste, sens) {
  let vivants = item.choices.map((_, i) => i);

  const barrer = (predicat) => {
    const restants = vivants.filter((i) => !predicat(i));
    if (restants.length >= 1 && restants.length < vivants.length) vivants = restants;
  };

  if (sens === 1) {
    barrer((i) => refuse(item.choices[i].text));
    barrer((i) => ABSOLU.test(String(item.choices[i].text ?? "")));
    const ms = motsUtiles(item.stem);
    if (ms.size) {
      const echo = vivants.filter((i) => {
        const cs = motsUtiles(item.choices[i].text);
        for (const w of ms) if (cs.has(w)) return true;
        return false;
      });
      if (echo.length === 1) barrer((i) => i === echo[0]);
    }
  }

  // Cocher : le plus long (sens +1) ou le plus court (témoin −1) — mais
  // SEULEMENT si l'écart se voit. Sinon l'élève n'a aucun signal et tire parmi
  // les survivants.
  const tailles = vivants.map((i) => longueur(item.choices[i]));
  const tri = [...tailles].sort((a, b) => (sens === 1 ? b - a : a - b));
  const extreme = tri[0];
  const suivant = tri.find((t) => t !== extreme);
  const tranche =
    suivant === undefined
      ? false
      : sens === 1
        ? seVoit(extreme, suivant)
        : seVoit(suivant, extreme);
  const finalistes = tranche ? vivants.filter((i) => longueur(item.choices[i]) === extreme) : vivants;
  return finalistes.includes(iJuste) ? 1 / finalistes.length : 0;
}

// ── la mesure ──

function charger(fichier, cle) {
  let parse;
  try {
    parse = yaml.load(fs.readFileSync(fichier, "utf-8"));
  } catch {
    return [];
  }
  const l = parse && Array.isArray(parse[cle]) ? parse[cle] : [];
  return l.filter(
    (it) => it && typeof it.id === "string" && it.type === "mcq" && Array.isArray(it.choices) && it.choices.length >= 3
  );
}

const notions = [];
for (const matiere of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
  const dm = path.join(CONTENU, matiere);
  if (!fs.statSync(dm).isDirectory()) continue;
  for (const slug of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
    const dir = path.join(dm, slug);
    if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
    const items = [
      ...charger(path.join(dir, "items.yaml"), "items"),
      ...charger(path.join(dir, "checkpoints.yaml"), "checkpoints"),
    ];
    const n = { matiere, slug, items: 0, ruse: 0, hasard: 0, temoin: 0 };
    for (const item of items) {
      const justes = item.choices.map((c, i) => (c && c.correct === true ? i : -1)).filter((i) => i >= 0);
      if (justes.length !== 1) continue;
      n.items++;
      n.hasard += 1 / item.choices.length;
      n.ruse += esperance(item, justes[0], 1);
      n.temoin += esperance(item, justes[0], -1);
    }
    if (n.items) notions.push(n);
  }
}

const T = notions.reduce(
  (a, n) => ({ items: a.items + n.items, ruse: a.ruse + n.ruse, hasard: a.hasard + n.hasard, temoin: a.temoin + n.temoin }),
  { items: 0, ruse: 0, hasard: 0, temoin: 0 }
);
const pc = (x, n) => `${((100 * x) / n).toFixed(1)} %`;

if (!PORTE && !SCELLER) {
console.log("\n━━ l'élève rusé : ce qu'on obtient sur notre banc sans avoir rien révisé ━━\n");
console.log(`  items à clé unique, ≥3 choix ............ ${T.items}`);
console.log(`  au hasard ............................... ${pc(T.hasard, T.items)}`);
console.log(`  avec les quatre ficelles ................ ${pc(T.ruse, T.items)}   ← ${((100 * (T.ruse - T.hasard)) / T.items).toFixed(1)} points gagnés sans rien savoir`);
console.log(`  TÉMOIN (stratégie inverse) .............. ${pc(T.temoin, T.items)}   ${T.temoin < T.hasard ? "✓ le témoin DESCEND : la mesure capte bien une ficelle" : "✗ le témoin monte aussi — artefact, pas ficelle"}`);
console.log(
  `\n  Sur 20 points de bac, c'est ${(20 * (T.ruse - T.hasard) / T.items).toFixed(1)} point(s) qui n'appartiennent pas à l'élève\n  — et autant de faux positifs versés au modèle d'apprenant.\n`
);
}

if (ETAPES) {
  // L'apport de chaque ficelle SEULE, pour savoir laquelle porte le total.
  const seule = (nom, appliquer) => {
    let s = 0;
    for (const matiere of fs.readdirSync(CONTENU).filter((n) => !n.startsWith(".")).sort()) {
      const dm = path.join(CONTENU, matiere);
      if (!fs.statSync(dm).isDirectory()) continue;
      for (const slug of fs.readdirSync(dm).filter((n) => !n.startsWith(".")).sort()) {
        const dir = path.join(dm, slug);
        if (!fs.existsSync(path.join(dir, "lesson.md"))) continue;
        for (const item of [
          ...charger(path.join(dir, "items.yaml"), "items"),
          ...charger(path.join(dir, "checkpoints.yaml"), "checkpoints"),
        ]) {
          const j = item.choices.map((c, i) => (c && c.correct === true ? i : -1)).filter((i) => i >= 0);
          if (j.length !== 1) continue;
          s += appliquer(item, j[0]);
        }
      }
    }
    console.log(`  ${nom.padEnd(40)} ${pc(s, T.items)}`);
  };
  console.log("── chaque ficelle SEULE (puis « cocher le plus long ») ──");
  console.log(`  ${"au hasard".padEnd(40)} ${pc(T.hasard, T.items)}`);
  //  Ces sous-mesures emploient EXACTEMENT le même seuil de visibilité que la
  //  mesure principale. Un instrument dont le tableau contredit son propre
  //  total ne mesure rien de sûr — c'est le défaut qui a rendu ce seuil
  //  nécessaire (§11.107), il n'est pas question de le rejouer à l'intérieur.
  const cocheLePlusLong = (it, j, vivants) => {
    const t = [...vivants.map((i) => longueur(it.choices[i]))].sort((a, b) => b - a);
    const suivant = t.find((x) => x !== t[0]);
    const f = suivant !== undefined && seVoit(t[0], suivant)
      ? vivants.filter((i) => longueur(it.choices[i]) === t[0])
      : vivants;
    return f.includes(j) ? 1 / f.length : 0;
  };
  seule("le plus long, sans rien barrer", (it, j) => cocheLePlusLong(it, j, it.choices.map((_, i) => i)));
  seule("+ barrer le refus", (it, j) => {
    let v = it.choices.map((_, i) => i);
    const r = v.filter((i) => !refuse(it.choices[i].text));
    if (r.length >= 1 && r.length < v.length) v = r;
    return cocheLePlusLong(it, j, v);
  });
  console.log(`  ${"+ barrer l'absolu + le clang (total)".padEnd(40)} ${pc(T.ruse, T.items)}`);
  console.log();
}

// ── le cliquet ──
//
// CE QU'IL APPORTE DE PLUS que les trois cliquets par tell : le CLANG n'a pas
// d'instrument à lui, donc pas de cliquet. Une régression qui n'ajoute qu'un
// écho du tronc dans un seul distracteur passe VERTE devant `indice-longueur`,
// `indice-absolu` et `indice-refus`, et ROUGE ici. C'est sa raison d'être ; le
// reste est du recouvrement assumé, et écrit comme tel.

if (PORTE || SCELLER) {
  const etat = {
    scelle_le: new Date().toISOString().slice(0, 10),
    corpus: { items: T.items, ruse: Math.round((1000 * T.ruse) / T.items) / 10 },
    notions: Object.fromEntries(
      notions.map((n) => [
        `${n.matiere}/${n.slug}`,
        { items: n.items, ruse: Math.round((1000 * n.ruse) / n.items) / 10 },
      ])
    ),
  };

  if (SCELLER) {
    fs.writeFileSync(BASE, JSON.stringify(etat, null, 2) + "\n", "utf-8");
    console.log(`eleve-ruse : référence scellée — ${T.items} items, ${etat.corpus.ruse} % à la ficelle`);
    process.exit(0);
  }

  if (!fs.existsSync(BASE)) {
    console.error("eleve-ruse : pas de référence. Lance --sceller d'abord.");
    process.exit(1);
  }
  const ref = JSON.parse(fs.readFileSync(BASE, "utf-8"));
  const casses = [];

  // Un dixième de point absorbe l'arrondi, rien de plus.
  if (etat.corpus.ruse > ref.corpus.ruse + 0.1) {
    casses.push(`CORPUS — ${ref.corpus.ruse} % → ${etat.corpus.ruse} % obtenables sans rien savoir.`);
  }
  for (const [cle, v] of Object.entries(etat.notions)) {
    const r = ref.notions[cle];
    if (!r) {
      if (v.items >= 8 && v.ruse > 40) {
        casses.push(`${cle} — notion NEUVE à ${v.ruse} % à la ficelle (plafond 40 % pour une notion neuve).`);
      }
      continue;
    }
    if (v.items >= 8 && v.ruse > r.ruse + 0.1) {
      casses.push(`${cle} — ${r.ruse} % → ${v.ruse} % obtenables à la ficelle.`);
    }
  }

  if (casses.length) {
    console.error("━━ cliquet eleve-ruse : ROMPU ━━");
    for (const c of casses) console.error(`   ${c}`);
    console.error(
      "\n   Chaque point gagné à la ficelle est un faux positif versé au modèle\n" +
        "   d'apprenant : le produit croit une misconception levée alors qu'elle est\n" +
        "   intacte, et cesse de la travailler.\n" +
        "   Détail : node scripts/eleve-ruse.mjs --etapes\n"
    );
    process.exit(1);
  }

  console.log(
    `eleve-ruse : cliquet tenu — ${T.items} items, ${etat.corpus.ruse} % obtenables à la ficelle ` +
      `(hasard ${((100 * T.hasard) / T.items).toFixed(1)} %) ✓`
  );
  process.exit(0);
}


console.log("── les 12 notions les plus exploitables ──");
for (const n of [...notions].sort((a, b) => b.ruse / b.items - a.ruse / a.items).slice(0, 12)) {
  console.log(
    `  ${`${n.matiere}/${n.slug}`.padEnd(44)} ${String(n.items).padStart(3)} items   hasard ${pc(n.hasard, n.items).padStart(7)}   rusé ${pc(n.ruse, n.items).padStart(7)}`
  );
}
console.log();
