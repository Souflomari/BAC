/**
 * indice-longueur.mjs — l'indice de longueur : la bonne réponse se dénonce-t-elle
 * en étant la plus longue ?
 *
 * `item-stats.mjs` mesure DEUX biais de la clé de correction : sa POSITION (réglée
 * par le mélange déterministe) et sa LONGUEUR — et il note lui-même, en toutes
 * lettres, que « length-tell is NOT fixed by shuffling order — reported for
 * visibility ». Ce script est la suite de cette phrase : il descend la mesure à
 * la NOTION, chiffre l'écart en caractères, et arme un cliquet pour que la dette
 * mesurée ne puisse plus grossir en silence.
 *
 * Pourquoi c'est un défaut d'élève, pas une coquetterie de statisticien : un
 * élève qui n'a pas révisé et qui coche systématiquement la réponse la plus
 * longue a raison 45 % du temps sur ce corpus, contre 25 % au hasard. Il gagne
 * des points sans savoir, l'item ne mesure plus ce qu'il prétend mesurer, et le
 * diagnostic qui en découle — le moteur de tout le reste du produit — est faux.
 *
 * Ce que « éligible » veut dire ici : un item QCM dont exactement un choix est
 * correct ET dont exactement un choix est strictement le plus long (pas d'ex
 * æquo). Les ex æquo sont exclus : sans choix strictement le plus long, il n'y
 * a pas d'indice à suivre.
 *
 * Quatre nombres par notion :
 *   • indice     — % des items éligibles où la bonne réponse est la plus longue.
 *                  Le hasard vaut 1/nombre-de-choix, soit 25 % à quatre choix.
 *   • exploit.   — le sous-ensemble qui se VOIT : la clé est la plus longue ET
 *                  l'avance dépasse à la fois ÉCART_MIN caractères et
 *                  AVANCE_MIN de la deuxième. C'est le nombre qui compte, et
 *                  c'est lui que le cliquet garde. Distinguer les deux n'est pas
 *                  une coquetterie : une clé qui dépasse de six caractères est
 *                  « la plus longue » sans être un indice, et une porte qui ne
 *                  saurait pas faire la différence exigerait des réécritures
 *                  cosmétiques — le genre de bruit qui fait désarmer les portes.
 *   • écart méd. — la médiane, en caractères, de (plus long − deuxième plus
 *                  long) sur les items où l'indice joue. C'est la taille de
 *                  l'indice : 12 caractères ne se voient pas, 120 sautent aux yeux.
 *   • contre     — % des items éligibles où la bonne réponse est strictement la
 *                  plus COURTE. L'indice INVERSE, tout aussi exploitable ;
 *                  la philo l'a (la clé y est souvent la formule la plus sèche).
 *   • c-expl.    — le sous-ensemble VISIBLE de l'indice inverse : la clé est la
 *                  plus courte ET le retard dépasse ÉCART_MIN caractères et
 *                  AVANCE_MIN de la clé elle-même. Le rapport se prend ici sur
 *                  la CLÉ (la plus courte), pas sur la deuxième : une clé de 30
 *                  caractères au milieu de trois réponses de 90 saute aux yeux,
 *                  alors que 30 caractères d'écart entre 300 et 330 ne se voient
 *                  pas. Gardé par le cliquet au même titre que l'indice direct.
 *
 * Deux modes :
 *   node scripts/indice-longueur.mjs            → le rapport complet + le docket
 *   node scripts/indice-longueur.mjs --porte    → le cliquet (sort 1 si ça empire)
 *   node scripts/indice-longueur.mjs --sceller  → réécrit la ligne de base
 *
 * Le cliquet, et pourquoi ce n'est pas une porte franche : 555 items sur 1221
 * portent l'indice aujourd'hui. Une porte qui exigerait 25 % partout échouerait
 * au premier commit et serait désarmée dans l'heure — c'est le mode de mort
 * habituel des portes trop ambitieuses. Le cliquet, lui, est tenable
 * immédiatement : une notion déjà en dette ne peut pas s'aggraver, une notion
 * neuve doit naître sous PLAFOND_NEUF. La dette se rembourse par le bas, sans
 * jamais pouvoir remonter.
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const ICI = path.dirname(new URL(import.meta.url).pathname);
const REPO = path.resolve(ICI, "..", "..");
const CONTENU = path.join(REPO, "content");
const BASE = path.join(ICI, "indice-longueur.base.json");

const ARGS = process.argv.slice(2);
const PORTE = ARGS.includes("--porte");
const SCELLER = ARGS.includes("--sceller");

/** Une notion neuve doit naître sous ce plafond d'indice EXPLOITABLE (hasard : 25 %). */
const PLAFOND_NEUF = 40;
/** En deçà, l'avance de la clé ne se voit pas à l'œil : 6 caractères ne trahissent rien. */
const ECART_MIN = 20;
/** …et elle doit aussi être relative : +20 caractères sur 400 ne se remarquent pas. */
const AVANCE_MIN = 0.2;
/** En dessous de ce nombre d'items éligibles, le pourcentage est du bruit. */
const MIN_ELIGIBLES = 6;

function lire(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

/** Charge et normalise la liste d'items d'un items.yaml / checkpoints.yaml. */
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
      it.choices.length >= 2
  );
}

/**
 * Longueur d'un choix, en caractères tels que l'ÉLÈVE les voit.
 *
 * On ne mesure pas la source YAML : les formules KaTeX y sont bien plus longues
 * que leur rendu. `$u_{n+1} = u_n + 3$` fait 19 caractères de source pour treize
 * à l'écran ; `$\\dfrac{a}{b}$` en fait 13 pour une fraction qui en occupe trois.
 * Sans cette correction, une notion de maths dont la clé porte la formule serait
 * déclarée « la plus longue » alors qu'à l'écran elle est la plus courte — le
 * défaut mesuré ne serait pas le défaut vu.
 *
 * L'approximation : dans chaque segment mathématique, on retire les commandes
 * (`\\dfrac`), les accolades, les indices/exposants et les espaces de contrôle,
 * et on compte ce qui reste. Ce n'est pas une métrique de mise en page, c'est un
 * ordre de grandeur — assez pour ne pas confondre une fraction avec un paragraphe.
 */
function longueur(texte) {
  if (typeof texte !== "string") return 0;
  return texte
    .replace(/\$\$?([^$]*)\$\$?/g, (_, m) =>
      m
        .replace(/\\[a-zA-Z]+/g, "x")
        .replace(/[{}^_&~]/g, "")
        .replace(/\\[,;! ]/g, "")
        .replace(/\s+/g, " ")
    )
    .trim().length;
}

function mediane(xs) {
  if (xs.length === 0) return 0;
  const t = [...xs].sort((a, b) => a - b);
  const m = Math.floor(t.length / 2);
  return t.length % 2 ? t[m] : Math.round((t[m - 1] + t[m]) / 2);
}

// ── la mesure ──

const notions = []; // { matiere, slug, eligibles, indice, contre, ecarts[], pires[] }

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

    const n = {
      matiere, slug, eligibles: 0,
      indice: 0, exploit: 0,
      contre: 0, contreExploit: 0,
      ecarts: [], pires: [],
    };

    for (const item of items) {
      const choix = item.choices;
      const justes = choix.map((c, i) => (c && c.correct === true ? i : -1)).filter((i) => i >= 0);
      if (justes.length !== 1) continue;
      const iJuste = justes[0];

      const L = choix.map((c) => longueur(c.text));
      const max = Math.max(...L);
      const min = Math.min(...L);
      if (L.filter((l) => l === max).length !== 1) continue; // ex æquo : pas d'indice

      n.eligibles++;

      if (L[iJuste] === max) {
        n.indice++;
        const second = Math.max(...L.filter((_, i) => i !== iJuste));
        const ecart = max - second;
        n.ecarts.push(ecart);
        const vu = ecart >= ECART_MIN && ecart >= second * AVANCE_MIN;
        if (vu) n.exploit++;
        n.pires.push({ id: item.id, ecart, cle: max, second, vu });
      } else if (L[iJuste] === min && L.filter((l) => l === min).length === 1) {
        n.contre++;
        const second = Math.min(...L.filter((_, i) => i !== iJuste));
        const retard = second - min;
        if (retard >= ECART_MIN && retard >= min * AVANCE_MIN) n.contreExploit++;
      }
    }

    if (n.eligibles > 0) notions.push(n);
  }
}

const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);

// ── mode --sceller : réécrit la ligne de base ──

if (SCELLER) {
  const base = {
    _lisezMoi:
      "Ligne de base du cliquet indice-longueur. Ces nombres ne doivent que DESCENDRE. " +
      "Régénérer avec `node scripts/indice-longueur.mjs --sceller` UNIQUEMENT après avoir " +
      "fait baisser l'indice — jamais pour faire taire une hausse.",
    _scelleLe: new Date().toISOString().slice(0, 10),
    notions: {},
  };
  for (const n of notions) {
    base.notions[`${n.matiere}/${n.slug}`] = {
      eligibles: n.eligibles,
      indice: n.indice,
      exploit: n.exploit,
      //  Le TAUX BRUT, scellé depuis le 2026-09-20. Le cliquet historique ne
      //  gardait que l'indice EXPLOITABLE ; une notion pouvait donc dériver de
      //  0 % à 55 % de clés-les-plus-longues sans qu'aucune avance ne franchisse
      //  le seuil de visibilité, et la porte restait verte. C'est arrivé.
      tauxBrut: n.eligibles ? Math.round((100 * n.indice) / n.eligibles) : 0,
      contreExploit: n.contreExploit,
    };
  }
  fs.writeFileSync(BASE, JSON.stringify(base, null, 2) + "\n", "utf-8");
  console.log(`indice-longueur : ligne de base scellée — ${notions.length} notions → ${path.relative(REPO, BASE)}`);
  process.exit(0);
}

// ── le rapport ──

const totalEligibles = notions.reduce((s, n) => s + n.eligibles, 0);
const totalIndice = notions.reduce((s, n) => s + n.indice, 0);
const totalExploit = notions.reduce((s, n) => s + n.exploit, 0);
const totalContre = notions.reduce((s, n) => s + n.contre, 0);
const totalContreExploit = notions.reduce((s, n) => s + n.contreExploit, 0);
const tousEcarts = notions.flatMap((n) => n.ecarts);

if (!PORTE) {
  console.log("");
  console.log("indice-longueur — la bonne réponse se dénonce-t-elle en étant la plus longue ?");
  console.log("═".repeat(111));
  console.log(
    `${"notion".padEnd(46)} ${"élig.".padStart(5)} ${"indice".padStart(7)} ${"exploit.".padStart(9)} ${"écart méd.".padStart(10)} ${"contre".padStart(7)} ${"c-expl.".padStart(8)}`
  );
  console.log("─".repeat(111));

  const classees = [...notions].sort((a, b) => {
    const d =
      pct(b.exploit, b.eligibles) + pct(b.contreExploit, b.eligibles) -
      (pct(a.exploit, a.eligibles) + pct(a.contreExploit, a.eligibles));
    return d !== 0 ? d : b.eligibles - a.eligibles;
  });

  for (const n of classees) {
    const i = pct(n.indice, n.eligibles);
    const e = pct(n.exploit, n.eligibles);
    const ce = pct(n.contreExploit, n.eligibles);
    const marque = n.eligibles >= MIN_ELIGIBLES && Math.max(e, ce) >= 75 ? " ←" : "";
    console.log(
      `${`${n.matiere}/${n.slug}`.padEnd(46)} ${String(n.eligibles).padStart(5)} ${`${i}%`.padStart(7)} ${`${e}%`.padStart(9)} ${String(mediane(n.ecarts)).padStart(10)} ${`${pct(n.contre, n.eligibles)}%`.padStart(7)} ${`${ce}%`.padStart(8)}${marque}`
    );
  }

  console.log("─".repeat(111));
  console.log(
    `${"TOTAL".padEnd(46)} ${String(totalEligibles).padStart(5)} ${`${pct(totalIndice, totalEligibles)}%`.padStart(7)} ${`${pct(totalExploit, totalEligibles)}%`.padStart(9)} ${String(mediane(tousEcarts)).padStart(10)} ${`${pct(totalContre, totalEligibles)}%`.padStart(7)} ${`${pct(totalContreExploit, totalEligibles)}%`.padStart(8)}`
  );
  console.log("");
  console.log(
    `Le hasard vaut 25 % à quatre choix. « ← » marque les notions dont l'indice EXPLOITABLE atteint 75 %\nsur au moins ${MIN_ELIGIBLES} items éligibles :`
  );
  console.log(
    "c'est là qu'un élève qui coche le plus long sans lire l'énoncé a raison trois fois sur quatre."
  );
  console.log("« contre » est l'indice INVERSE — la clé strictement la plus courte ; il s'exploite aussi bien.");
  console.log("");

  // le docket : les dix items où l'écart est le plus criant
  const tous = notions
    .flatMap((n) => n.pires.map((p) => ({ ...p, notion: `${n.matiere}/${n.slug}` })))
    .sort((a, b) => b.ecart - a.ecart)
    .slice(0, 12);
  console.log("Les douze écarts les plus criants (clé − deuxième plus long, en caractères) :");
  for (const p of tous) {
    console.log(`  ${String(p.ecart).padStart(4)}  ${p.notion.padEnd(44)} ${p.id}   (clé ${p.cle} / 2ᵉ ${p.second})`);
  }
  console.log("");
}

// ── le cliquet ──

const brutBase = lire(BASE);
if (!brutBase) {
  console.error(
    `indice-longueur : pas de ligne de base (${path.relative(REPO, BASE)}).\n` +
      `Sceller la ligne de base d'abord : node scripts/indice-longueur.mjs --sceller`
  );
  process.exit(PORTE ? 1 : 0);
}
const base = JSON.parse(brutBase);
const echecs = [];

for (const n of notions) {
  const cle = `${n.matiere}/${n.slug}`;
  const ref = base.notions[cle];

  if (!ref) {
    for (const [quoi, v] of [["direct", n.exploit], ["inverse", n.contreExploit]]) {
      const e = pct(v, n.eligibles);
      if (n.eligibles >= MIN_ELIGIBLES && e > PLAFOND_NEUF) {
        echecs.push(
          `${cle} — notion NEUVE à ${e} % d'indice ${quoi} exploitable (${v}/${n.eligibles}), ` +
            `plafond ${PLAFOND_NEUF} %. Rapprocher les longueurs des choix.`
        );
      }
    }
    continue;
  }

  // Le cliquet compare des NOMBRES d'items, pas des pourcentages : ajouter de
  // bons items à une notion en dette ferait baisser son pourcentage sans avoir
  // réparé un seul item. Un ratio se trompe en récompensant le volume ; un
  // compte, non. La contrepartie assumée : agrandir une notion sans jamais
  // aggraver sa dette absolue est autorisé.
  //  ── SECONDE DIRECTION (ADR 0031 : une porte a deux sens quand un seul se
  //  contourne). Le sens « exploitable » ci-dessous compte les avances VISIBLES.
  //  Celui-ci compte le BIAIS : la part des items où la clé est strictement la
  //  plus longue, quelle que soit la marge. Mesuré le 2026-09-20, l'écart entre
  //  les deux sens est massif — l-histoire 55 % et le-bonheur 61 % de taux brut
  //  pour 0 % d'exploitable. Un élève qui coche la plus longue a raison plus
  //  d'une fois sur deux dans ces notions, et le premier sens ne le voit pas.
  //
  //  TOLÉRANCE : on ne signale qu'au-dessus du hasard (25 % à quatre choix) ET
  //  au-delà de 12 points de hausse. En dessous, le bruit d'échantillon d'une
  //  notion de quinze items dépasserait le signal — et une porte qui crie pour
  //  du bruit finit désarmée.
  if (ref.tauxBrut !== undefined) {
    const tauxBrut = n.eligibles ? Math.round((100 * n.indice) / n.eligibles) : 0;
    if (tauxBrut > 25 && tauxBrut - ref.tauxBrut > 12) {
      casses.push(
        `${cle} — le BIAIS de longueur MONTE : ${ref.tauxBrut} % → ${tauxBrut} % de clés ` +
          `strictement les plus longues (${n.indice}/${n.eligibles}). Aucune avance n'est encore ` +
          `« exploitable », et c'est précisément le point : ce sens-là mesure le biais, pas sa visibilité. ` +
          `Rallonge les DISTRACTEURS — ne raccourcis jamais la clé.`,
      );
    }
  }

  if (n.exploit > (ref.exploit ?? ref.indice)) {
    echecs.push(
      `${cle} — l'indice DIRECT exploitable MONTE : ${ref.exploit ?? ref.indice} → ${n.exploit} items ` +
        `(sur ${n.eligibles} éligibles). Le cliquet ne descend que.`
    );
  }
  if (ref.contreExploit !== undefined && n.contreExploit > ref.contreExploit) {
    echecs.push(
      `${cle} — l'indice INVERSE exploitable MONTE : ${ref.contreExploit} → ${n.contreExploit} items ` +
        `(sur ${n.eligibles} éligibles). La clé la plus COURTE se repère aussi bien que la plus longue.`
    );
  }
}

if (PORTE) {
  if (echecs.length > 0) {
    console.error("");
    console.error("indice-longueur : CLIQUET ROMPU");
    console.error("═".repeat(111));
    for (const e of echecs) console.error(`  ✗ ${e}`);
    console.error("");
    console.error(
      "Un item dont la bonne réponse est visiblement la plus longue se répond sans le lire.\n" +
        "Le remède est l'un des deux, jamais un troisième :\n" +
        "  • allonger les distracteurs jusqu'au registre de la clé (le remède pédagogique :\n" +
        "    un distracteur détaillé est un distracteur attirant, donc un meilleur diagnostic) ;\n" +
        "  • raccourcir la clé en déplaçant l'explication vers son `feedback` — c'est là\n" +
        "    qu'elle enseigne, pas dans le libellé du choix.\n" +
        "Si l'indice a été FAIT BAISSER ailleurs, resceller : node scripts/indice-longueur.mjs --sceller"
    );
    process.exit(1);
  }
  console.log(
    `indice-longueur : cliquet tenu — ${notions.length} notions, ` +
      `${totalExploit} direct + ${totalContreExploit} inverse sur ${totalEligibles} items ` +
      `portent un indice EXPLOITABLE, aucune notion n'a empiré ✓`
  );
  process.exit(0);
}

if (echecs.length > 0) {
  console.log("Cliquet (informatif — `--porte` pour la version qui échoue) :");
  for (const e of echecs) console.log(`  ✗ ${e}`);
  console.log("");
}
