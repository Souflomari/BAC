/**
 * test-typographie.mjs — tests unitaires de `web/src/lib/frenchTypography.ts`.
 *
 * Cette fonction est appliquée au texte que l'élève LIT : la prose des leçons
 * (via `remarkFrenchTypography`), les libellés d'exercice, les intitulés de
 * l'assembleur d'épreuves. Ses quatre règles étaient jusqu'ici gardées
 * uniquement par `typo-francaise.mjs`, qui mesure le rendu de quelques pages —
 * un filet à grosses mailles pour une fonction pure de trente lignes.
 *
 * Le cas qui a motivé ce fichier : la règle (d), la liaison insécable entre un
 * nombre et son unité — et le premier test rouge qu'on lui a fait passer, qui
 * a montré que la crainte était mal placée. On croyait l'ORDRE de la liste
 * d'unités déterminant (`m` avant `mA` aurait coupé l'unité en deux) : la
 * liste inversée exprès, les tests sont restés verts. Ce qui protège
 * réellement, c'est le lookahead final — sans lui « 3 mètres » et
 * « l'exercice 3 montre » se lieraient. Les tests ci-dessous gardent LES DEUX
 * comportements, celui qu'on craignait et celui qui compte.
 *
 * Depuis `web/` :   node --test scripts/test-typographie.mjs
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
const { frenchTypography: f } = jiti(path.join(WEB, "src/lib/frenchTypography.ts"));

const NNBSP = " "; // espace fine insécable
const NBSP = " "; // espace insécable

test("(a) l'apostrophe droite entre deux lettres devient typographique", () => {
  assert.equal(f("l'élève"), "l’élève");
  assert.equal(f("aujourd'hui"), "aujourd’hui");
});

test("(a) une apostrophe qui n'est pas entre deux lettres est laissée seule", () => {
  assert.equal(f("'x"), "'x");
  assert.equal(f("5'"), "5'");
});

test("(b) une paire de guillemets droits autour de prose devient « … »", () => {
  assert.equal(f('il dit "bonjour" ici'), `il dit «${NNBSP}bonjour${NNBSP}» ici`);
});

test("(b) une paire sans lettre est laissée seule", () => {
  assert.equal(f('"123"'), '"123"');
});

test("(c) espace fine insécable devant la ponctuation haute", () => {
  assert.equal(f("Vraiment ?"), `Vraiment${NNBSP}?`);
  assert.equal(f("Vraiment?"), `Vraiment${NNBSP}?`);
  assert.equal(f("a : b ; c !"), `a${NNBSP}: b${NNBSP}; c${NNBSP}!`);
});

test("(d) un nombre est lié à son unité par une espace insécable", () => {
  assert.equal(f("un bidon de 3 L"), `un bidon de 3${NBSP}L`);
  assert.equal(f("à 0 °C"), `à 0${NBSP}°C`);
  assert.equal(f("une masse de 2,5 kg"), `une masse de 2,5${NBSP}kg`);
  assert.equal(f("30 % des élèves"), `30${NBSP}% des élèves`);
  assert.equal(f("10 Ω"), `10${NBSP}Ω`);
});

test("(d) une unité à plusieurs lettres se lie d'un bloc", () => {
  // Vérifié le 2026-09-05 : ces cas passent MÊME avec la liste inversée
  // (`m` avant `mA`). Le remplacement n'insère qu'une espace dans un créneau
  // déjà consommé, et il n'y a pas d'espace entre `m` et `A` à déranger.
  // Le test reste : il épingle le comportement, pas la crainte.
  assert.equal(f("25 mA"), `25${NBSP}mA`);
  assert.equal(f("12 mL"), `12${NBSP}mL`);
  assert.equal(f("3 min"), `3${NBSP}min`);
  assert.equal(f("40 MeV"), `40${NBSP}MeV`);
  assert.equal(f("5 mol"), `5${NBSP}mol`);
});

// LE test qui garde vraiment la règle : c'est le lookahead final, pas l'ordre
// de la liste. Retirez `(?![\p{L}\d])` et ces quatre assertions tombent.
test("(d) une unité ÉCRITE EN TOUTES LETTRES reste un mot ordinaire", () => {
  assert.equal(f("3 mètres"), "3 mètres");
  assert.equal(f("2 Ampères"), "2 Ampères");
  assert.equal(f("4 axiomes"), "4 axiomes");
  assert.equal(f("l'exercice 3 montre"), "l’exercice 3 montre");
});

test("(d) un nombre déjà lié à son unité n'est pas retouché", () => {
  assert.equal(f(`3${NBSP}L`), `3${NBSP}L`);
});

test("la fonction est idempotente", () => {
  const cas = [
    `un bidon de 3 L à 0 °C : 25 mA, "voilà" !`,
    "l'élève dit : 30 % ; 2,5 kg ?",
    "3 mètres, 4 axiomes",
  ];
  for (const c of cas) {
    const une = f(c);
    assert.equal(f(une), une, `non idempotent sur « ${c} »`);
  }
});

// ── LA COUTURE (2026-09-21, §11.164) ──────────────────────────────────────
//
// Les tests ci-dessus mesurent la fonction PURE, qui reçoit une chaîne. Le
// défaut que cette section garde ne vit pas dans une chaîne : il vit entre
// DEUX. Le corpus écrit « une molécule, l'**amylase salivaire**, qui », et
// mdast en fait trois nœuds ; l'apostrophe ferme le premier, la lettre qui la
// suit ouvre le second. La règle (a) exige une lettre après l'apostrophe dans
// la MÊME chaîne — elle ne pouvait structurellement pas la voir.
//
// Mesuré le 2026-09-21 sur le texte rendu, chapitres dépliés : 152 apostrophes
// droites lisibles sur 50 des 71 pages, dont ZÉRO vue par la porte
// `typo-francaise` — qui appliquait son motif nœud par nœud, du même geste que
// le plugin. Le plugin et sa porte partageaient l'angle mort ; la porte
// répondait honnêtement à une question plus étroite que son en-tête (ADR 0033).
//
// Ces tests sont le filet FIN : ils tournent en une seconde, sans navigateur
// et sans construction, et ils tombent dès que la passe de couture disparaît.
const { default: remarkFrenchTypography } = jiti(path.join(WEB, "src/lib/remarkFrenchTypography.ts"));

/** Rend le markdown en la suite de ses nœuds terminaux, pour lire la couture. */
async function noeuds(md) {
  const { unified } = await import("unified");
  const { default: remarkParse } = await import("remark-parse");
  const { default: remarkMath } = await import("remark-math");
  const { visit } = await import("unist-util-visit");
  const traite = unified().use(remarkParse).use(remarkMath);
  const arbre = traite.use(remarkFrenchTypography).runSync(traite.parse(md));
  let out = "";
  visit(arbre, (n) => {
    if (typeof n.value === "string" && ["text", "inlineCode", "inlineMath"].includes(n.type)) out += n.value;
  });
  return out;
}

test("(couture) l'apostrophe qui précède du GRAS devient typographique", async () => {
  assert.equal(await noeuds("une molécule, l'**amylase salivaire**, qui"),
    "une molécule, l’amylase salivaire, qui");
});

test("(couture) idem devant de l'ITALIQUE et devant un LIEN", async () => {
  assert.equal(await noeuds("l'*enzyme* agit"), "l’enzyme agit");
  assert.equal(await noeuds("l'[amylase](/a) agit"), "l’amylase agit");
});

test("(couture) l'apostrophe qui SUIT du gras devient typographique", async () => {
  assert.equal(await noeuds("**l**'amylase agit"), "l’amylase agit");
});

test("(couture) devant du CODE ou des MATHS, elle reste droite", async () => {
  // Ce n'est pas une élision française : c'est une apostrophe devant du code
  // ou du LaTeX. La règle (a) la laisse tranquille pour la même raison, et la
  // passe de couture doit s'aligner sur elle plutôt que sur l'apparence.
  assert.equal(await noeuds("l'`code` suit"), "l'code suit");
  assert.equal(await noeuds("l'$x$ suit"), "l'x suit");
});

test("(couture) elle ne franchit jamais un bloc", async () => {
  // Deux paragraphes ne sont pas frères inline : « mot' » en fin de l'un et
  // « Autre » au début du suivant ne forment pas une élision.
  assert.equal(await noeuds("fin de phrase'\n\nAutre paragraphe"),
    "fin de phrase'Autre paragraphe");
});

test("(couture) la passe reste idempotente", async () => {
  const une = await noeuds("l'**amylase** et l'*eau*");
  assert.equal(une, "l’amylase et l’eau");
  assert.equal(await noeuds(une), une);
});

// ── LES MATHS NE SONT PAS DE LA PROSE (2026-09-21, §11.165) ───────────────
//
// L'en-tête du fichier affirmait que les maths n'arrivent jamais jusqu'ici,
// parce que le GREFFON ne visite que des nœuds `text`. Vrai du greffon ; faux
// de la fonction, qu'une soixantaine d'endroits appellent sur une chaîne brute
// (titres d'exercice, légendes, libellés d'épreuve, `aria-label`) — LaTeX
// compris. Mesuré sur le rendu : 24 espaces fines injectées dans des formules,
// sur 10 pages, dont des `\;` coupés en deux.
const NNBSP_ = " ";

test("(maths) la ponctuation haute DANS une formule n'est pas espacée", () => {
  assert.equal(f("le repère $(O;\\vec{i},\\vec{j})$ est direct"),
    "le repère $(O;\\vec{i},\\vec{j})$ est direct");
  assert.equal(f("$(E')\;: y'' = 0$"), "$(E')\;: y'' = 0$");
});

test("(maths) la commande d'espacement \; reste intacte", () => {
  // Le cas qui a fait ouvrir ce fil : la fine glissée ENTRE `\` et `;`.
  const dedans = "$0{,}3\;\\ 0{,}6\;\\ 0{,}9$";
  assert.equal(f(dedans), dedans);
  assert.ok(!f(dedans).includes(NNBSP_));
});

test("(maths) la prose AUTOUR de la formule est toujours traitée", () => {
  assert.equal(f("Exercice 2 : le repère $(O;\\vec{i})$ ; conclure"),
    `Exercice 2${NNBSP_}: le repère $(O;\\vec{i})$${NNBSP_}; conclure`);
  assert.equal(f("l'aire de $S$ vaut 3 L"), "l’aire de $S$ vaut 3 L");
});

test("(maths) un $ non apparié laisse tout le reste en prose", () => {
  // Conservateur, et c'est le comportement d'avant la segmentation.
  assert.equal(f("le prix est 30 $ pour 2 : c'est cher"),
    `le prix est 30 $ pour 2${NNBSP_}: c’est cher`);
});

test("(maths) les maths en bloc ($$) sont protégées aussi", () => {
  assert.equal(f("avant $$x : y$$ après : fin"), `avant $$x : y$$ après${NNBSP_}: fin`);
});

test("(maths) la segmentation reste idempotente", () => {
  const src = "Exercice 3 : $f'(x)\;: x>0$ et l'unité 5 mA ; voilà";
  const une = f(src);
  assert.equal(f(une), une);
  assert.ok(!une.slice(une.indexOf("$"), une.lastIndexOf("$")).includes(NNBSP_));
});

// ── LE MARQUEUR DE BLOC DANS UN LIBELLÉ EN LIGNE (§11.166) ────────────────
//
// Mesuré, pas supposé : rendre le sur-titre de partie dans le moteur markdown
// a fait apparaître 10 erreurs d'hydratation React (#418) sur
// `pc/reactions-acido-basiques`, zéro avant. Le corpus y écrit
// `part: "1. Solution aqueuse d'acide propanoïque"` — et `1.` en tête de ligne
// EST une liste ordonnée. Un `<ol>` dans le `<p>` du libellé est de l'HTML
// invalide ; le navigateur referme le `<p>`, et l'arbre client cesse de
// ressembler à l'arbre servi.
const { echappeBloc } = jiti(path.join(WEB, "src/lib/markdownEnLigne.ts"));

test("(en ligne) « 1. » et « 1) » en tête cessent d'ouvrir une liste", () => {
  assert.equal(echappeBloc("1. Solution aqueuse d'acide propanoïque"),
    "1\\. Solution aqueuse d'acide propanoïque");
  assert.equal(echappeBloc("1) Dosage de l'acide carboxylique"),
    "1\\) Dosage de l'acide carboxylique");
});

test("(en ligne) puce, citation et titre sont échappés aussi", () => {
  for (const [src, att] of [["- a", "\\- a"], ["* a", "\\* a"], ["+ a", "\\+ a"],
                            ["> a", "\\> a"], ["# a", "\\# a"]])
    assert.equal(echappeBloc(src), att);
});

test("(en ligne) un marqueur AILLEURS que en tête est laissé seul", () => {
  assert.equal(echappeBloc("Partie 1. suite"), "Partie 1. suite");
  assert.equal(echappeBloc("a - b"), "a - b");
});

test("(en ligne) chaque ligne est traitée, pas seulement la première", () => {
  assert.equal(echappeBloc("titre\n- puce"), "titre\n\\- puce");
});

test("(en ligne) une formule n'est pas touchée", () => {
  assert.equal(echappeBloc("$(E_\\alpha)\;: z^2 - 2iz = 0$"),
    "$(E_\\alpha)\;: z^2 - 2iz = 0$");
});
