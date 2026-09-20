/**
 * indice-absolu.mjs — l'indice de l'absolu : la bonne réponse se dénonce-t-elle
 * en étant la seule qui ne sur-affirme pas ?
 *
 * Après l'indice de LONGUEUR (la clé la plus longue, ou la plus courte), voici
 * l'autre chose qu'un item dit sans le dire. Tous les manuels de stratégie de
 * QCM enseignent la même règle : « barre les réponses qui contiennent toujours,
 * jamais, uniquement, aucun ». Elle marche parce qu'un rédacteur fabrique ses
 * distracteurs en poussant une idée jusqu'à l'excès — et l'excès s'écrit avec
 * ces mots-là.
 *
 * Sur ce corpus, avant campagne : 106 items où éliminer tout ce qui sur-affirme
 * ne laisse QU'UNE réponse debout, et dans 54 cas c'est la bonne — 51 %, contre
 * 25 % au hasard. Un élève qui n'a rien révisé double sa note sur ces items-là.
 *
 * Ce que « éligible » veut dire : un item QCM à choix multiples, avec exactement
 * une bonne réponse et au moins trois choix.
 *
 * Les nombres, par notion :
 *   • tranché    — les items où la stratégie DÉSIGNE une réponse : exactement un
 *                  choix survit à l'élimination des absolus. Ailleurs, la
 *                  stratégie ne dit rien et il n'y a pas d'indice à suivre.
 *   • exploit.   — le sous-ensemble où la réponse ainsi désignée EST la clé.
 *                  C'est le nombre que le cliquet garde.
 *   • inverse    — les items où exactement un choix PORTE un absolu (« coche
 *                  l'intrus »), et c'est la clé. Mesuré et gardé au même titre :
 *                  le remède du premier défaut — rendre à la clé l'absolu VRAI
 *                  qui lui revient — crée le second si on l'applique sans
 *                  regarder, et une porte qui ne garderait qu'un sens
 *                  autoriserait la campagne à déplacer le défaut au lieu de le
 *                  fermer.
 *
 * Ce que l'instrument NE DIT PAS, et qu'il faut garder en tête en le lisant :
 * un absolu dans un distracteur est le plus souvent CE QUI LE REND FAUX
 * (« une transformation spontanée est toujours rapide »). Le retirer
 * détruirait l'erreur que le distracteur incarne. Le remède n'est donc pas de
 * désarmer les distracteurs : c'est, dans l'ordre,
 *   1. rendre à la clé l'absolu VRAI qu'elle a le droit de porter — une loi
 *      physique, une définition, un théorème s'énoncent absolument, et les
 *      écrire ainsi est plus juste, pas moins ;
 *   2. retirer l'absolu GRATUIT d'un distracteur — celui dont l'erreur est
 *      ailleurs et que le « jamais » n'aide pas à porter.
 * Quand ni l'un ni l'autre n'est possible sans mentir ou sans casser l'erreur,
 * c'est l'instrument qui cède : la pédagogie passe avant la statistique.
 *
 * Trois modes :
 *   node scripts/indice-absolu.mjs            → le rapport + le docket
 *   node scripts/indice-absolu.mjs --porte    → le cliquet (sort 1 si ça empire)
 *   node scripts/indice-absolu.mjs --sceller  → réécrit la ligne de base
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const CONTENU = path.join(REPO, "content");
const BASE = path.join(ICI, "indice-absolu.base.json");

const ARGS = process.argv.slice(2);
const PORTE = ARGS.includes("--porte");
const SCELLER = ARGS.includes("--sceller");
const IDS = ARGS.includes("--ids");

/** En dessous de ce nombre d'items éligibles, un pourcentage est du bruit. */
const MIN_ELIGIBLES = 6;
/** Une notion neuve doit naître sous ce plafond d'indice exploitable. */
const PLAFOND_NEUF = 25;

/**
 * Les marqueurs d'absolu, au sens des manuels de stratégie de QCM : ceux qu'un
 * élève rusé apprend à fuir.
 *
 * « seul », « seulement » en sont VOLONTAIREMENT absents. En français scolaire
 * ils sont le plus souvent une précision utile — « seule la composante
 * tangentielle travaille », « il reste seulement à conclure » — et non une
 * sur-affirmation. Les inclure ferait crier l'instrument sur des centaines de
 * phrases justes : le bruit qui fait désarmer les portes.
 */
const ABSOLU =
  /(\btoujours\b|\bjamais\b|\bforcément\b|\bnécessairement\b|\bobligatoirement\b|\bsystématiquement\b|\buniquement\b|\bexclusivement\b|\bimpossible\b|\ben aucun cas\b|\bquel(?:le)? que soit\b|\bn'importe (?:quel|quelle|lequel)\b|\btous les\b|\btoutes les\b|\baucun\b|\baucune\b)/i;

function lire(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

function charger(fichier, cle) {
  const brut = lire(fichier);
  if (!brut) return [];
  let parse;
  try {
    parse = yaml.load(brut);
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

const matieres = fs
  .readdirSync(CONTENU)
  .filter((n) => !n.startsWith("_") && !n.startsWith("."))
  .filter((n) => fs.statSync(path.join(CONTENU, n)).isDirectory())
  .sort();

for (const matiere of matieres) {
  const dossierMatiere = path.join(CONTENU, matiere);
  const slugs = fs
    .readdirSync(dossierMatiere)
    .filter((n) => !n.startsWith("_") && !n.startsWith("."))
    .filter((n) => fs.statSync(path.join(dossierMatiere, n)).isDirectory())
    .sort();

  for (const slug of slugs) {
    const dir = path.join(dossierMatiere, slug);
    const items = [
      ...charger(path.join(dir, "items.yaml"), "items"),
      ...charger(path.join(dir, "checkpoints.yaml"), "checkpoints"),
    ];

    const n = { matiere, slug, eligibles: 0, tranche: 0, exploit: 0, invTranche: 0, invExploit: 0, cleAbs: 0, cleTotal: 0, distAbs: 0, distTotal: 0, cas: [] };

    for (const item of items) {
      const choix = item.choices;
      const justes = choix.map((c, i) => (c && c.correct === true ? i : -1)).filter((i) => i >= 0);
      if (justes.length !== 1) continue;
      const iJuste = justes[0];

      n.eligibles++;
      const porte = choix.map((c) => ABSOLU.test(String(c?.text ?? "")));

      //  L'ÉCART, ajouté le 2026-09-20 (§11.108). Les deux mesures ci-dessous
      //  comptent des ITEMS où le marqueur DÉSIGNE un choix unique. Elles ne
      //  disent rien de la CAUSE, qui est plus simple et plus profonde : un
      //  distracteur sur-affirme 1,4 fois plus souvent qu'une clé. C'est cet
      //  écart-là qu'un élève exploite, et il survit à la disparition de
      //  l'unicité — il suffit que DEUX choix sur-affirment pour que les deux
      //  tranches cessent de compter, alors que le biais, lui, reste entier.
      porte.forEach((a, i) => {
        if (i === iJuste) { n.cleTotal++; if (a) n.cleAbs++; }
        else { n.distTotal++; if (a) n.distAbs++; }
      });
      const sans = porte.map((p, i) => (p ? -1 : i)).filter((i) => i >= 0);
      const avec = porte.map((p, i) => (p ? i : -1)).filter((i) => i >= 0);

      if (sans.length === 1) {
        n.tranche++;
        if (sans[0] === iJuste) {
          n.exploit++;
          n.cas.push({ id: item.id, sens: "direct" });
        }
      }
      if (avec.length === 1) {
        n.invTranche++;
        if (avec[0] === iJuste) {
          n.invExploit++;
          n.cas.push({ id: item.id, sens: "inverse" });
        }
      }
    }

    if (n.eligibles > 0) notions.push(n);
  }
}

const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);
//  Un écart NÉGATIF existe et veut dire quelque chose : sur
//  `svt/genetique-humaine`, ce sont les CLÉS qui sur-affirment le plus (40 %
//  contre 38 %), et barrer les absolus y élimine la bonne réponse. Le signe se
//  lit donc, et « +-4 » ne se lit pas.
const signe = (x) => (x >= 0 ? `+${x}` : `${x}`);

// ── mode --sceller ──

if (SCELLER) {
  const base = {
    _lisezMoi:
      "Ligne de base du cliquet indice-absolu. Ces nombres ne doivent que DESCENDRE. " +
      "Régénérer avec `node scripts/indice-absolu.mjs --sceller` UNIQUEMENT après avoir " +
      "fait baisser l'indice — jamais pour faire taire une hausse.",
    _scelleLe: new Date().toISOString().slice(0, 10),
    notions: {},
  };
  for (const n of notions) {
    base.notions[`${n.matiere}/${n.slug}`] = {
      eligibles: n.eligibles,
      exploit: n.exploit,
      invExploit: n.invExploit,
      //  Les COMPTES, pas le pourcentage arrondi : deux entiers se comparent
      //  exactement, un pourcentage arrondi bouge d'un point sans qu'il se soit
      //  rien passé.
      cleAbs: n.cleAbs, cleTotal: n.cleTotal, distAbs: n.distAbs, distTotal: n.distTotal,
    };
  }
  fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + "\n", "utf-8");
  console.log(`indice-absolu : ligne de base scellée — ${notions.length} notions → ${path.relative(REPO, BASE)}`);
  process.exit(0);
}

// ── le rapport ──

const T = (f) => notions.reduce((s, n) => s + n[f], 0);
const totEligibles = T("eligibles"), totTranche = T("tranche"), totExploit = T("exploit");
const totInvTranche = T("invTranche"), totInvExploit = T("invExploit");

if (!PORTE) {
  console.log("");
  console.log("indice-absolu — la clé est-elle la seule réponse qui ne sur-affirme pas ?");
  console.log("═".repeat(96));
  console.log(
    `${"notion".padEnd(46)} ${"élig.".padStart(5)} ${"tranché".padStart(8)} ${"exploit.".padStart(9)} ${"inverse".padStart(8)} ${"inv.expl".padStart(9)}`
  );
  console.log("─".repeat(96));

  for (const n of [...notions].sort((a, b) => b.exploit + b.invExploit - (a.exploit + a.invExploit) || b.eligibles - a.eligibles)) {
    if (n.exploit + n.invExploit === 0 && !ARGS.includes("--tout")) continue;
    console.log(
      `${`${n.matiere}/${n.slug}`.padEnd(46)} ${String(n.eligibles).padStart(5)} ${String(n.tranche).padStart(8)} ${String(n.exploit).padStart(9)} ${String(n.invTranche).padStart(8)} ${String(n.invExploit).padStart(9)}`
    );
  }

  console.log("─".repeat(96));
  console.log(
    `${"TOTAL".padEnd(46)} ${String(totEligibles).padStart(5)} ${String(totTranche).padStart(8)} ${String(totExploit).padStart(9)} ${String(totInvTranche).padStart(8)} ${String(totInvExploit).padStart(9)}`
  );
  console.log("");
  console.log(
    `Sur les ${totTranche} items où la stratégie « barre tout ce qui sur-affirme » désigne UNE réponse,\n` +
      `elle tombe juste ${totExploit} fois — ${pct(totExploit, totTranche)} %, contre ~25 % au hasard à quatre choix.`
  );
  console.log(
    `Dans l'autre sens, sur les ${totInvTranche} items où un seul choix porte un absolu,\n` +
      `c'est la clé ${totInvExploit} fois — ${pct(totInvExploit, totInvTranche)} %.`
  );
  console.log("");
  if (IDS) {
    console.log("Les items concernés :");
    for (const n of notions)
      for (const c of n.cas)
        console.log(`  ${c.sens.padEnd(8)} ${`${n.matiere}/${n.slug}`.padEnd(46)} ${c.id}`);
    console.log("");
  }
}

// ── le cliquet ──

const brutBase = lire(BASE);
if (!brutBase) {
  console.error(
    `indice-absolu : pas de ligne de base (${path.relative(REPO, BASE)}).\n` +
      `Sceller la ligne de base d'abord : node scripts/indice-absolu.mjs --sceller`
  );
  process.exit(PORTE ? 1 : 0);
}
const base = JSON.parse(brutBase);
const echecs = [];

for (const n of notions) {
  const cle = `${n.matiere}/${n.slug}`;
  const ref = base.notions[cle];

  if (!ref) {
    for (const [quoi, v] of [["direct", n.exploit], ["inverse", n.invExploit]]) {
      const e = pct(v, n.eligibles);
      if (n.eligibles >= MIN_ELIGIBLES && e > PLAFOND_NEUF) {
        echecs.push(
          `${cle} — notion NEUVE à ${e} % d'indice ${quoi} exploitable (${v}/${n.eligibles}), ` +
            `plafond ${PLAFOND_NEUF} %.`
        );
      }
    }
    continue;
  }

  // Le cliquet compare des NOMBRES d'items, pas des pourcentages : ajouter de
  // bons items à une notion en dette ferait baisser son pourcentage sans avoir
  // réparé un seul item.
  if (n.exploit > ref.exploit) {
    echecs.push(
      `${cle} — indice DIRECT : ${ref.exploit} → ${n.exploit} item(s) où barrer les absolus désigne la clé.`
    );
  }
  //  TROISIÈME SENS — L'ÉCART (§11.108, 2026-09-20).
  //
  //  CE QU'IL ATTRAPE QUE LES DEUX AUTRES LAISSENT PASSER, et c'est mesuré :
  //  les deux sens ci-dessus ne comptent un item que si le marqueur DÉSIGNE un
  //  choix unique. Ajouter un absolu à un distracteur d'un item qui en compte
  //  déjà un fait donc TOMBER les deux tranches — l'item cesse d'être compté —
  //  pendant que le biais, lui, grossit. Un auteur peut ainsi faire descendre
  //  les deux chiffres en aggravant le corpus.
  //
  //  L'écart, lui, ne connaît pas l'unicité : il compte des CHOIX. « Un
  //  distracteur sur-affirme-t-il plus souvent qu'une clé ? » Mesuré sur le
  //  corpus : 24 % contre 17 %, soit 1,4 fois plus — et jusqu'à +27 points sur
  //  `philo/la-liberte`.
  //
  //  PAS DE TOLÉRANCE, et c'est voulu (ADR 0034, décision 3) : sur un cliquet,
  //  qui compare une notion à son propre passé, il n'y a pas de bruit à
  //  filtrer — il y a un changement, ou il n'y en a pas. Une première version
  //  de ce sens portait une marge de « +2 points » ; c'était rejouer à
  //  l'intérieur la faute que l'ADR venait de nommer. Ce qui subsiste est la
  //  comparaison de RATIOS exacts, pour qu'un arrondi ne fasse pas crier une
  //  porte tout seul, et un garde de PORTÉE (≥ 20 distracteurs) — qui n'est pas
  //  un seuil anti-bruit mais le refus de juger une notion de quatre choix.
  if (ref.distTotal !== undefined && n.distTotal >= 20) {
    const r = (a, b) => (b > 0 ? a / b : 0);
    const ecartNow = r(n.distAbs, n.distTotal) - r(n.cleAbs, n.cleTotal);
    const ecartRef = r(ref.distAbs, ref.distTotal) - r(ref.cleAbs, ref.cleTotal);
    const ecart = pct(n.distAbs, n.distTotal) - pct(n.cleAbs, n.cleTotal);
    const refEcart = pct(ref.distAbs, ref.distTotal) - pct(ref.cleAbs, ref.cleTotal);
    if (ecartNow > ecartRef + 1e-9) {
      echecs.push(
        `${cle} — ÉCART de sur-affirmation : ${signe(refEcart)} → ${signe(ecart)} points ` +
          `(clés ${pct(n.cleAbs, n.cleTotal)} %, distracteurs ${pct(n.distAbs, n.distTotal)} %). ` +
          `Barrer ce qui sur-affirme épargne la clé plus souvent qu'avant.`
      );
    }
  }

  if (n.invExploit > (ref.invExploit ?? 0)) {
    echecs.push(
      `${cle} — indice INVERSE : ${ref.invExploit ?? 0} → ${n.invExploit} item(s) où la clé est le seul choix qui sur-affirme.`
    );
  }
}

if (echecs.length > 0) {
  console.error("\n━━ cliquet indice-absolu : ROMPU ━━");
  for (const e of echecs) console.error(`   ${e}`);
  console.error(
    "\n   Le remède, dans l'ordre : (1) rendre à la clé l'absolu VRAI qu'elle a le\n" +
      "   droit de porter — une loi, une définition, un théorème s'énoncent\n" +
      "   absolument ; (2) retirer l'absolu GRATUIT d'un distracteur, celui dont\n" +
      "   l'erreur est ailleurs. Ne JAMAIS désarmer un distracteur dont l'absolu\n" +
      "   EST l'erreur : c'est lui qui enseigne.\n" +
      "   Détail : node scripts/indice-absolu.mjs --ids"
  );
  process.exit(1);
}

console.log(
  `indice-absolu : cliquet tenu — ${notions.length} notions, ${totExploit} direct + ${totInvExploit} inverse ` +
    `sur ${totEligibles} items éligibles, aucune notion n'a empiré ✓`
);
