/**
 * figure-preview.mjs — l'audit VISUEL d'une figure, sans lancer le site.
 *
 * Pourquoi : `validate-content` vérifie la STRUCTURE d'une figure (compte
 * d'étapes == max step-N, contrat de couleurs — cette dernière porte n'a
 * réellement existé qu'à partir du 2026-09-03 ; cette docstring l'affirmait
 * depuis des semaines alors que rien ne la vérifiait), jamais son RENDU. Or le
 * défaut n°1 constaté sur les figures est visuel : étiquettes qui se
 * chevauchent, courbe qui sort du cadre, repère écrasé. La bible §10 exige
 * de REGARDER — cet outil rend ce regard bon marché : il compose une page
 * autonome avec les vrais jetons du thème et capture chaque figure.
 *
 * Usage :
 *   node scripts/figure-preview.mjs <chemin-svg> [<chemin-svg>…]
 *   node scripts/figure-preview.mjs --dark content/pc/rlc-serie/media/regimes-uc.svg
 *
 * Sort les PNG dans le dossier temporaire annoncé en fin d'exécution ; TOUS
 * les groupes step-N sont visibles à la fois — c'est l'état où tout se
 * superpose, donc celui qui révèle les collisions.
 *
 * PIÈGE PAYÉ (2026-08-22, à ne pas refaire) : l'extraction des jetons doit
 * être SENSIBLE À LA CASSE des noms — `--figure-energy-C` et
 * `--figure-energy-L` finissent par une majuscule. Une classe `[a-z0-9-]+`
 * les laisse tomber, la variable n'est pas déclarée, et les courbes
 * d'énergie deviennent INVISIBLES : on croit à une figure cassée alors que
 * c'est l'instrument qui ment. Le premier audit de cette session a failli
 * déclarer un faux défaut sur `diagrammes-energie-elastique` pour cette
 * raison exacte.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { chromium } from "playwright-core";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const RACINE = path.dirname(WEB);

const args = process.argv.slice(2);
const sombre = args.includes("--dark");
// --porte : sortie non nulle si une classe ARMÉE trouve quoi que ce soit.
// Cinq classes sont armées, et seulement parce qu'elles sont PROPRES sur
// tout le corpus VIVANT au 2026-09-04 :
//   · « déborde »      — un texte qui sort du cadre de la figure (0 cas) ;
//   · « hors panneau » — un texte qui sort de SON panneau (0 cas) ;
//   · « contraste grave » et « contraste faible » — un texte sous le seuil de
//     SC 1.4.3 contre ce qui est VRAIMENT peint derrière lui (101 trouvés le
//     2026-09-04, 71 corrigés, 30 versés à la dette owner, donc hors porte) ;
//   · « texte invisible » — un texte effacé par une étape ultérieure (3
//     corrigés ; 3 recouvrements VOULUS, déclarés dans leur fichier).
// « barre » (85 cas, tous sous 30 %) et « chevauche » (7 cas, tous dans la
// figure sous dette owner) restent INFORMATIFS : armer une porte sur une
// classe sale, c'est devoir la désarmer le lendemain.
//
// LA PORTE NE VOIT QUE LA PASSE RAPIDE — le modèle de peinture, vérifié aux
// pixels sur ses seuls candidats. Elle manque donc ~17 % des cas : ceux qu'un
// modèle ne peut pas voir, un texte recouvert par une forme peinte APRÈS lui.
// Elle garde contre la régression ordinaire ; pour CERTIFIER un corpus, c'est
// `--pixels-tous` qui fait foi.
const porte = args.includes("--porte");
// --pixels-tous : l'étage pixel ne se contente plus de VÉRIFIER les candidats
// du modèle, il passe TOUS les textes du corpus. Coûteux (deux captures par
// texte, ~25 min sur 258 figures) mais c'est le seul balayage qui attrape ce
// que le modèle ne peut pas voir par construction : un texte RECOUVERT par une
// forme peinte APRÈS lui. Le modèle s'arrête au texte — il ignore tout ce qui
// passe par-dessus. Les pixels, eux, ne s'arrêtent nulle part.
const pixelsTous = args.includes("--pixels-tous");
const CLASSES_ARMEES = new Set([
  "déborde", "hors panneau", "contraste grave", "contraste faible",
  "texte invisible", "texte recouvert",
]);
const fichiers = args.filter((a) => !a.startsWith("--"));

if (fichiers.length === 0 && !args.includes("--jetons")) {
  console.error("usage: node scripts/figure-preview.mjs [--dark] <chemin-svg>…  |  [--dark] --jetons");
  process.exit(1);
}

// Les jetons du thème demandé, depuis la source générée — composés COMME LE
// NAVIGATEUR LES COMPOSE : la base `:root`, puis, en sombre, les surcharges du
// bloc `.dark` (et lui seul).
//
// PIÈGE PAYÉ N°3 (2026-09-24) — pendant dix-neuf jours, le mode sombre de
// cette porte a mesuré le thème CLAIR. On prenait le texte de `.dark` jusqu'à
// la FIN du fichier ; depuis le 2026-09-05 (087440e2, « le papier n'a pas de
// thème »), la fin du fichier est un bloc `@media print` qui redéclare TOUS
// les jetons clairs sous `:root.dark`. Collectés dans l'ordre, les clairs
// venaient en dernier et gagnaient : les PNG « -sombre » étaient identiques
// à l'octet près aux PNG clairs, et la porte « contraste — thème sombre » de
// la CI mesurait le clair une seconde fois, verte. Vu le jour où une figure
// neuve a été regardée dans les deux thèmes (ADR 0039 : deux valeurs qui
// devraient différer et sont égales à l'octet près sont un défaut de mesure).
const css = readFileSync(path.join(WEB, "src/app/tokens.generated.css"), "utf8");
const debutSombre = css.indexOf(".dark {");
const finSombre = debutSombre < 0 ? -1 : css.indexOf("}", debutSombre);
if (debutSombre < 0 || finSombre < 0) {
  console.error("  ✗ INSTRUMENT MUET : bloc `.dark { … }` introuvable dans tokens.generated.css — aucun thème ne peut être composé honnêtement");
  process.exit(2);
}
const blocClair = css.slice(0, debutSombre);
const blocSombre = css.slice(debutSombre, finSombre + 1);
const bloc = sombre ? blocClair + blocSombre : blocClair;
// [A-Za-z0-9-] et non [a-z0-9-] — voir PIÈGE PAYÉ en tête de fichier.
const RE_JETON = /(--(?:figure|color)-[A-Za-z0-9-]+):\s*([^;]+);/g;
const jetons = [...bloc.matchAll(RE_JETON)];
// Même nom déclaré deux fois dans le même bloc : le DERNIER gagne, comme en CSS.
const declarations = jetons.map(([, k, v]) => `  ${k}: ${v.trim()};`).join("\n");
// L'instrument prouve qu'il a changé de thème avant de parler du thème : en
// sombre, la surface des figures DOIT différer de la claire. Sinon on sort
// MUET, en échec — jamais un vert sur le mauvais thème.
{
  const valeur = (texte, nom) => {
    let v = null;
    for (const [, k, x] of texte.matchAll(RE_JETON)) if (k === nom) v = x.trim();
    return v;
  };
  const surfaceClaire = valeur(blocClair, "--figure-surface");
  const surfaceDemandee = valeur(bloc, "--figure-surface");
  if (!surfaceClaire || !surfaceDemandee) {
    console.error("  ✗ INSTRUMENT MUET : --figure-surface introuvable dans les jetons composés");
    process.exit(2);
  }
  if (sombre && surfaceDemandee === surfaceClaire) {
    console.error(`  ✗ INSTRUMENT MUET : thème sombre demandé, mais --figure-surface vaut ${surfaceDemandee}, comme en clair — la porte mesurerait le clair une seconde fois`);
    process.exit(2);
  }
  // `--jetons` : la composition et ce contrôle SEULS, sans navigateur — c'est
  // la forme sous laquelle les essais rouges §11.195 le rejouent (la CI les
  // lance sans Chromium). Le contrôle est le MÊME code que celui qui précède
  // toute capture : le rejouer seul, c'est rejouer celui de la porte.
  if (args.includes("--jetons")) {
    console.log(`jetons du thème ${sombre ? "sombre" : "clair"} : --figure-surface = ${surfaceDemandee} (clair : ${surfaceClaire}), ${jetons.length} déclarations`);
    process.exit(0);
  }
}

/**
 * PIÈGE PAYÉ N°2 (2026-09-03) — l'instrument rendait des carrés de 26 px.
 *
 * Le contrat de figure impose `viewBox` SEUL, sans width/height : c'est ce
 * qui laisse le composant décider de la taille en page. Mais un SVG sans
 * width/height n'a pas de taille intrinsèque, et son défaut CSS (100 %)
 * ne peut pas se résoudre dans un conteneur en `width: max-content` — la
 * dépendance est circulaire. Chromium tranchait autrefois en faveur du
 * 300×150 par défaut ; il tranche désormais à ZÉRO. Les captures
 * mesuraient alors 26×26 — exactement le padding (2×12) plus la bordure
 * (2×1) de la carte, un SVG effondré à rien.
 *
 * Le défaut était SILENCIEUX de la pire façon : la sonde de débordement et
 * de chevauchement continuait d'annoncer « aucun défaut » (getBBox() lit
 * le système de coordonnées du viewBox, indifférent à la taille rendue),
 * si bien que l'outil affirmait une figure saine en produisant une image
 * vide. Un instrument d'audit VISUEL qui ne montre rien tout en certifiant
 * que tout va bien est pire que pas d'instrument.
 *
 * Le correctif dimensionne chaque SVG depuis son propre viewBox, ICI, dans
 * le harnais — jamais dans le fichier, qui doit rester conforme au
 * contrat. Taille naturelle préservée (1 unité de viewBox = 1 px), donc la
 * remarque du 2026-08-22 sur la stabilité des métriques tient toujours.
 */
let largeurMax = 0;
const cartes = fichiers
  .map((f) => {
    const abs = path.isAbsolute(f) ? f : path.join(RACINE, f);
    const svg = readFileSync(abs, "utf8").replace(/<\?xml[^>]*\?>/, "");
    const vb = svg.match(/viewBox="\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s+([-\d.]+)\s*"/);
    if (!vb) {
      console.error(`  ✗ ${path.basename(f)} : pas de viewBox lisible — impossible de dimensionner`);
      process.exit(1);
    }
    const [, , , w, h] = vb;
    // Injecté dans la COPIE servie au navigateur, pas dans le fichier.
    //
    // FUSIONNÉ, jamais ajouté (piège payé le 2026-09-03, dans l'heure qui a
    // suivi le correctif de dimensionnement) : une figure peut porter son
    // PROPRE style sur la racine — par exemple `text-anchor:middle` scopé à
    // elle seule. Poser un second attribut `style` produit un doublon, et le
    // parseur HTML ne garde que le PREMIER : le style de la figure était
    // silencieusement jeté, et les neuf figures concernées se remettaient à
    // s'aligner à gauche. Le diagnostic a failli être « ma correction des
    // figures est fausse » alors que c'était l'instrument.
    const dims = `width:${Number(w)}px;height:${Number(h)}px`;
    const dimensionne = /<svg\b[^>]*\sstyle="/.test(svg)
      ? svg.replace(/(<svg\b[^>]*\sstyle=")/, `$1${dims};`)
      : svg.replace(/<svg\b/, `<svg style="${dims}"`);
    largeurMax = Math.max(largeurMax, Number(w));
    // Les figures de MOUVEMENT sont rendues mais NON sondées — voir la note
    // « ce que la sonde refuse de mesurer » plus bas.
    const attrMotion = /\.motion\.svg$/.test(f) ? ' data-motion="1"' : "";
    return `<h2>${path.basename(f)}</h2><div class="carte"${attrMotion}>${dimensionne}</div>`;
  })
  .join("\n");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
:root {
${declarations}
}
body { background: var(--color-surface-base); font-family: system-ui, sans-serif; padding: 24px; }
h2 { font-size: 13px; color: var(--color-text-tertiary); margin: 24px 0 8px; font-weight: 500; }
.carte { background: var(--figure-surface); border: 1px solid var(--color-border-subtle);
         border-radius: 12px; padding: 12px; width: max-content; max-width: 100%; }
/* Taille NATURELLE (le viewBox), jamais width:100%. Mesuré le 2026-08-22 :
   à l'échelle, les métriques de texte varient assez pour qu'un chevauchement
   à 60 % apparaisse à quatre figures et disparaisse à une seule — un
   instrument qui change d'avis selon le nombre d'entrées ne vaut rien. */
svg { display: block; }
</style></head><body>${cartes}</body></html>`;

const sortie = path.join(RACINE, ".figure-preview");
mkdirSync(sortie, { recursive: true });
const page_html = path.join(sortie, "page.html");
writeFileSync(page_html, html, "utf8");

const navigateur = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM_PATH || "/opt/pw-browsers/chromium",
});
// La fenêtre s'adapte à la figure la plus large (piège payé le 2026-09-03) :
// à 900 px fixes, une figure de 920 était bridée par le `max-width: 100%` de
// la carte et la capture la rognait à droite. J'ai failli déclarer un
// débordement sur `univers-restreint` — dont la sonde disait pourtant, avec
// raison, que rien ne sortait du viewBox. Un instrument ne doit jamais
// fabriquer le défaut qu'il prétend détecter.
const page = await navigateur.newPage({
  viewport: { width: Math.max(900, largeurMax + 100), height: 1200 },
});
await page.goto(`file://${page_html}`, { waitUntil: "networkidle" });
// Les métriques de texte ne sont stables qu'une fois les polices appliquées :
// sans cette attente, un même fichier mesuré seul ou en lot ne donne pas le
// même verdict (constaté le 2026-08-22 sur un chevauchement à 60 %).
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

// L'INSTRUMENT SE CONTRÔLE LUI-MÊME (ajouté avec le correctif du 2026-09-03).
// La leçon du carré de 26 px : un outil d'audit visuel doit prouver qu'il a
// rendu quelque chose avant de dire quoi que ce soit du contenu. On compare
// la boîte rendue à la taille attendue du viewBox : un écart franc signifie
// que c'est le HARNAIS qui a échoué, pas la figure — et on le dit en
// échouant, plutôt qu'en livrant une image vide accompagnée d'un verdict
// rassurant.
const cartesDom = await page.$$(".carte");
let harnaisCasse = 0;
for (let i = 0; i < cartesDom.length; i++) {
  const nom = path.basename(fichiers[i], ".svg") + (sombre ? "-sombre" : "") + ".png";
  const boite = await cartesDom[i].boundingBox();
  const attendu = await cartesDom[i].evaluate((el) => {
    const svg = el.querySelector("svg");
    const vb = (svg?.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    return { w: vb[2], h: vb[3] };
  });
  const rendu = { w: (boite?.width ?? 0) - 26, h: (boite?.height ?? 0) - 26 };
  if (rendu.w < attendu.w * 0.5 || rendu.h < attendu.h * 0.5) {
    console.error(
      `  ✗ ${nom} : HARNAIS EN ÉCHEC — le SVG s'est rendu à ${Math.round(rendu.w)}×${Math.round(rendu.h)} ` +
        `pour un viewBox de ${attendu.w}×${attendu.h}. La capture ne montrerait rien : ne t'y fie pas. ` +
        `(Cause déjà vue : un SVG à viewBox seul n'a pas de taille intrinsèque et s'effondre à zéro — ` +
        `voir PIÈGE PAYÉ N°2 en tête de fichier.)`
    );
    harnaisCasse++;
    continue;
  }
  await cartesDom[i].screenshot({ path: path.join(sortie, nom) });
  console.log(`  ✓ ${nom}  (${Math.round(rendu.w)}×${Math.round(rendu.h)})`);
}
if (harnaisCasse) {
  await navigateur.close();
  console.error(
    `\n${harnaisCasse} figure(s) non capturée(s) : l'instrument refuse de certifier ce qu'il n'a pas rendu.`
  );
  process.exit(1);
}

/**
 * Ce que l'œil rate et que la mesure attrape (ajouté après une chasse de
 * trois défauts, 2026-08-22) :
 *   — DÉBORDEMENT : un texte hors du viewBox est coupé à l'affichage. Cause
 *     déjà vue : `text-anchor` en ATTRIBUT de présentation, battu par tout
 *     CSS ambiant — le texte se centre sur son x et sort du cadre. Le
 *     correctif qui tient est un `style="text-anchor:…"` inline.
 *   — CHEVAUCHEMENT : deux étiquettes qui se recouvrent de plus de 40 % de
 *     la plus petite. Le seuil laisse passer les frôlements voulus.
 *
 * HONNÊTETÉ DE L'INSTRUMENT : la détection de chevauchement est INDICATIVE,
 * pas une certification. Les métriques de texte renvoyées par getBBox()
 * fluctuent avec le contexte de rendu — un même fichier mesuré seul ou en
 * lot peut passer de « 61 % de recouvrement » à « rien », près du seuil.
 * Elle sert à DIRIGER LE REGARD vers une zone suspecte ; c'est la capture
 * qui tranche. Le débordement, lui, est fiable (comparaison à un cadre
 * fixe, sans dépendance aux métriques fines).
 */
const defauts = await page.evaluate((sombreActif) => {
  const out = [];
  // On indexe les CARTES, pas les <svg> : une figure qui en imbriquerait un
  // second décalerait tous les indices et le rapport nommerait le mauvais
  // fichier. Aucune ne le fait aujourd'hui — l'index reste juste par accident.
  document.querySelectorAll(".carte").forEach((carte, iFig) => {
    const svg = carte.querySelector("svg");
    if (!svg) return;
    // CE QUE LA SONDE REFUSE DE MESURER (2026-09-04) — les `.motion.svg`.
    //
    // Une figure de mouvement est jouée par MotionStage : le moteur pose les
    // états initiaux (opacités à zéro, translations) puis déroule la partition
    // `.motion.json`. Le rendu STATIQUE n'est donc l'état d'AUCUN instant du
    // film — c'est la superposition de toutes les positions authorées. Rien à
    // voir avec une figure stagée, dont la dernière étape est bel et bien une
    // vue que l'élève voit.
    //
    // Passées à la sonde, les 10 figures de mouvement du corpus rendaient 111
    // « défauts » sur 144 — soit 77 % du rapport en pur bruit. Un instrument
    // dont les trois quarts des cris sont faux finit ignoré, et c'est ce qui
    // était arrivé de fait : le premier balayage du corpus (2026-09-03) les a
    // écartées À LA MAIN, sans que rien dans l'outil ne le dise. On l'écrit.
    //
    // La capture PNG, elle, reste produite : elle sert à vérifier qu'aucun
    // élément ne manque et que les couleurs tiennent.
    if (carte.hasAttribute("data-motion")) return;
    const vb = (svg.getAttribute("viewBox") || "0 0 0 0").split(/\s+/).map(Number);
    const [vx, vy, vw, vh] = vb;
    // PIÈGE PAYÉ N°4 (2026-09-04) — getBBox() rend la boîte dans l'espace
    // utilisateur PROPRE à l'élément, transformations non appliquées. Un
    // <text> dans un <g transform="translate(...) rotate(...)"> était donc
    // mesuré à la place qu'il occuperait SANS son transform : la sonde
    // comparait des boîtes exprimées dans des repères différents, ce qui
    // peut aussi bien inventer un chevauchement qu'en manquer un, et fausse
    // le test de débordement (comparé, lui, au viewBox du SVG racine).
    // 7 figures du corpus portent un transform et du texte — la surface est
    // petite, l'erreur ne l'était pas. On ramène tout dans le repère du
    // SVG racine (= les coordonnées du viewBox) via getScreenCTM().
    const versRacine = svg.getScreenCTM()?.inverse() ?? null;
    const boiteRacine = (el) => {
      const b = el.getBBox();
      if (!versRacine || !el.getScreenCTM) return b;
      const m = versRacine.multiply(el.getScreenCTM());
      if (m.b === 0 && m.c === 0 && m.a === 1 && m.d === 1 && m.e === 0 && m.f === 0) return b;
      const coins = [
        [b.x, b.y], [b.x + b.width, b.y],
        [b.x, b.y + b.height], [b.x + b.width, b.y + b.height],
      ].map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
      const xs = coins.map((c) => c[0]);
      const ys = coins.map((c) => c[1]);
      const x0 = Math.min(...xs), y0 = Math.min(...ys);
      return { x: x0, y: y0, width: Math.max(...xs) - x0, height: Math.max(...ys) - y0 };
    };
    const textes = [...svg.querySelectorAll("text")];
    // On garde DEUX descriptions de chaque texte :
    //   · `b`   — sa boîte englobante dans le repère racine, pour comparer des
    //            textes entre eux ;
    //   · `loc` + `inv` — sa boîte dans SON PROPRE repère, et la matrice qui y
    //            ramène un point. Indispensable pour un texte TOURNÉ : la
    //            boîte englobante axée d'un texte incliné à 28° est bien plus
    //            grande que le texte, et toute droite parallèle à celui-ci la
    //            traverse. La sonde des tracés a cru barrer « pente = 4π²/(GM) »
    //            (kepler3-linearisation) alors que l'étiquette longe sa droite
    //            à 11 px de distance, comme une étiquette de pente doit le faire.
    const boites = textes.map((t) => {
      let inv = null;
      try {
        if (versRacine && t.getScreenCTM) inv = versRacine.multiply(t.getScreenCTM()).inverse();
      } catch { inv = null; }
      return { t, b: boiteRacine(t), loc: t.getBBox(), inv, s: t.textContent.trim() };
    });
    for (const { t, b, s } of boites) {
      if (!s) continue;
      if (b.x < vx - 1 || b.x + b.width > vx + vw + 1 || b.y + b.height > vy + vh + 1) {
        out.push({
          fig: iFig, type: "déborde", txt: s.slice(0, 40),
          detail: `x ${Math.round(b.x)}→${Math.round(b.x + b.width)} · cadre ${vx}→${vx + vw}` +
                  ` · ancrage calculé ${getComputedStyle(t).textAnchor}`,
        });
      }
    }
    // LE MASQUAGE EST UNE TECHNIQUE LÉGITIME, et la sonde l'ignorait
    // (corrigé le 2026-09-03). Une figure stagée qui REMPLACE un texte à
    // l'étape suivante — « Circuit RLC série » qui devient « Circuit LC
    // idéal », l'équation amortie qui devient l'équation idéale — pose un
    // aplat opaque à la couleur du fond par-dessus l'ancien texte, puis
    // écrit le nouveau. Les deux <text> restent dans le DOM (le SVG peint
    // en ordre document, le dernier gagne) et se recouvrent donc à 100 %
    // au sens des boîtes — alors que l'élève n'en voit qu'un.
    //
    // C'était une classe ENTIÈRE de faux positifs : sur les 38
    // chevauchements du premier balayage du corpus, tous portaient sur des
    // figures stagées, et ceux à 100 % étaient précisément des
    // remplacements masqués — le masque est même documenté en commentaire
    // dans rlc-schema.svg. Une sonde qui crie au défaut sur une technique
    // que le corpus emploie exprès finit ignorée, ce qui la rend pire
    // qu'absente.
    //
    // On regarde donc ce qui est peint ENTRE les deux textes : si un
    // élément opaque, posé après le premier et avant le second, couvre le
    // premier, le recouvrement est voulu et on se tait.
    const estOpaque = (el) => {
      const st = getComputedStyle(el);
      const f = st.fill;
      if (!f || f === "none" || f.startsWith("url(")) return false;
      if (parseFloat(st.fillOpacity || "1") < 0.95) return false;
      if (parseFloat(st.opacity || "1") < 0.95) return false;
      // rgba(...) avec alpha faible
      const m = f.match(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/);
      if (m && parseFloat(m[1]) < 0.95) return false;
      return true;
    };
    const couvre = (bb, cible) =>
      bb.x <= cible.x + 0.5 && bb.y <= cible.y + 0.5 &&
      bb.x + bb.width >= cible.x + cible.width - 0.5 &&
      bb.y + bb.height >= cible.y + cible.height - 0.5;
    const tousLesNoeuds = [...svg.querySelectorAll("*")];
    const rang = new Map(tousLesNoeuds.map((el, k) => [el, k]));
    const masques = tousLesNoeuds.filter(
      (el) => /^(rect|circle|ellipse|polygon|path)$/i.test(el.tagName) && estOpaque(el)
    );

    for (let i = 0; i < boites.length; i++) {
      for (let j = i + 1; j < boites.length; j++) {
        const a = boites[i].b, c = boites[j].b;
        if (!boites[i].s || !boites[j].s) continue;
        const ox = Math.min(a.x + a.width, c.x + c.width) - Math.max(a.x, c.x);
        const oy = Math.min(a.y + a.height, c.y + c.height) - Math.max(a.y, c.y);
        if (ox <= 0 || oy <= 0) continue;
        const aire = ox * oy;
        const petite = Math.min(a.width * a.height, c.width * c.height);
        if (petite > 0 && aire / petite > 0.4) {
          // Le premier texte est-il effacé avant que le second soit peint ?
          const rA = rang.get(boites[i].t), rB = rang.get(boites[j].t);
          const masque = masques.some((m) => {
            const r = rang.get(m);
            if (!(r > rA && r < rB)) return false;
            let bb; try { bb = boiteRacine(m); } catch { return false; }
            return couvre(bb, a);
          });
          if (masque) continue; // remplacement voulu, pas une collision
          out.push({
            fig: iFig, type: "chevauche", txt: boites[i].s.slice(0, 26),
            detail: `avec « ${boites[j].s.slice(0, 26)} » — ${Math.round((aire / petite) * 100)} % de recouvrement`,
          });
        }
      }
    }

    // ── TROISIÈME SONDE : LE TRACÉ QUI BARRE UNE ÉTIQUETTE (2026-09-04) ─────
    //
    // Classe découverte EN REGARDANT, pendant le tri des 35 chevauchements,
    // et que rien ne mesurait : une courbe, un axe ou une flèche qui passe
    // AU TRAVERS d'un texte. Six cas réels trouvés à l'œil sur les 24
    // figures ouvertes — la porteuse de 900 kHz barrant « 1 200 kHz », la
    // droite N = Z barrant sa PROPRE étiquette, l'oscillation traversant
    // « u_C ≈ U_0 + s_m(t) », les arêtes d'un arbre barrant « Soupe ». Sur
    // 244 figures jamais ouvertes, il y en a forcément d'autres.
    //
    // COMMENT : on échantillonne chaque géométrie tracée le long de son
    // contour (getPointAtLength, ~1 px de pas), on ramène les points dans le
    // repère de la racine, et on compte ceux qui tombent dans la boîte d'un
    // texte, RÉTRÉCIE de 15 % en hauteur pour qu'un trait qui longe un texte
    // sans le toucher ne compte pas.
    //
    // CE QU'ON NE COMPTE PAS, et pourquoi — sans ces trois exclusions la
    // sonde crierait sur presque toutes les figures et finirait ignorée :
    //   · les traits FINS (< 1,5 px) et ceux peints en --figure-grid : une
    //     étiquette d'axe posée sur une grille légère est normale et lisible.
    //   · les traversées COURTES (< 8 px cumulés) : un trait qui écorne un
    //     coin de boîte ne barre pas le mot.
    //   · les textes protégés par un aplat opaque posé entre le tracé et
    //     eux — la pastille est une technique légitime (detecteur-crete).
    const hexVersRGB = (h) => {
      const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(h.trim());
      if (!m) return null;
      let c = m[1];
      if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
      return `rgb(${parseInt(c.slice(0, 2), 16)},${parseInt(c.slice(2, 4), 16)},${parseInt(c.slice(4, 6), 16)})`;
    };
    const grilleRGB = hexVersRGB(
      getComputedStyle(svg).getPropertyValue("--figure-grid") || ""
    );
    // ── QUATRIÈME SONDE, THÈME SOMBRE SEULEMENT : les grands aplats CLAIRS ──
    //
    // La porte de couleur (validate-content) garantit que les figures parlent
    // en JETONS. Elle ne garantit pas le RENDU : un aplat peint avec un jeton
    // clair — ou une exception « COULEURS SÉMANTIQUES » un peu large — reste
    // un rectangle blanc sur une page sombre. C'est le défaut connu de
    // loi-mailles-build (49 % de sa surface reste claire en sombre), et rien
    // ne le mesurait ailleurs : les trois balayages visuels du corpus n'ont
    // porté que sur le thème clair.
    //
    // On mesure donc, en sombre, la part du cadre couverte par une forme dont
    // la LUMINANCE dépasse 0,6. Le seuil de signalement est 8 % : en dessous,
    // c'est une pastille ou une étiquette, pas une gêne.
    if (sombreActif) {
      // CE QU'ON CHERCHE : une couleur qui NE SUIT PAS LE THÈME. Un aplat
      // peint avec un jeton est par construction juste en sombre — c'est tout
      // l'objet des jetons. Le défaut, c'est la couleur qui reste claire parce
      // qu'elle est codée en dur (loi-mailles-build, energy-exchange) ou parce
      // qu'une exception « COULEURS SÉMANTIQUES » est plus large qu'il ne faut.
      // On exclut donc les valeurs qui SONT celles des jetons du thème sombre.
      const jetonsSombres = new Set();
      {
        const st = getComputedStyle(document.documentElement);
        for (const nom of Array.from(st).filter((n) => n.startsWith("--figure-") || n.startsWith("--color-"))) {
          const brut = st.getPropertyValue(nom).trim();
          const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(brut);
          if (!m) continue;
          let c = m[1];
          if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
          jetonsSombres.add(
            `rgb(${parseInt(c.slice(0, 2), 16)},${parseInt(c.slice(2, 4), 16)},${parseInt(c.slice(4, 6), 16)})`
          );
        }
      }
      const lum = (couleur) => {
        const m = couleur.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!m) return null;
        const [r, v, b] = [1, 2, 3].map((i) => Number(m[i]) / 255);
        return 0.2126 * r + 0.7152 * v + 0.0722 * b;
      };
      const aire = Math.abs(vw * vh) || 1;
      let claire = 0;
      const coupables = [];
      for (const el of svg.querySelectorAll("rect,circle,ellipse,polygon,path")) {
        const st = getComputedStyle(el);
        if (!st.fill || st.fill === "none" || st.fill.startsWith("url(")) continue;
        if (parseFloat(st.fillOpacity || "1") < 0.5) continue;
        if (parseFloat(st.opacity || "1") < 0.5) continue;
        if (jetonsSombres.has(st.fill.replace(/\s/g, ""))) continue;
        const l = lum(st.fill);
        if (l === null || l < 0.6) continue;
        let bb;
        try { bb = boiteRacine(el); } catch { continue; }
        const a = Math.max(0, bb.width) * Math.max(0, bb.height);
        if (a / aire < 0.01) continue;
        claire += a;
        coupables.push(`${el.tagName.toLowerCase()} ${Math.round((a / aire) * 100)}%`);
      }
      const part = claire / aire;
      if (part > 0.08) {
        out.push({
          fig: iFig, type: "clair-en-sombre", txt: `${Math.round(part * 100)} % du cadre`,
          detail: `reste CLAIR en thème sombre — ${coupables.slice(0, 4).join(", ")}` +
                  (coupables.length > 4 ? `, +${coupables.length - 4}` : ""),
        });
      }
    }

    const geoms = [...svg.querySelectorAll("path,line,polyline,polygon,circle,ellipse")];
    for (const g of geoms) {
      if (typeof g.getTotalLength !== "function") continue;
      const st = getComputedStyle(g);
      if (!st.stroke || st.stroke === "none") continue;
      const largeur = parseFloat(st.strokeWidth || "1");
      if (!(largeur >= 1)) continue;
      if (parseFloat(st.strokeOpacity || "1") < 0.5) continue;
      if (parseFloat(st.opacity || "1") < 0.5) continue;
      // UNE RATURE EST VOULUE. division-euclidienne-droite barre « q = -13 ? »
      // exprès : c'est le piège de la figure, et le trait DIT qu'il est faux.
      // La sonde ne peut pas deviner l'intention — la figure la déclare, par
      // data-rature sur le trait. C'est le même contrat que
      // « COULEURS SÉMANTIQUES: » pour la porte de couleur : on ne supprime
      // pas l'exception, on exige qu'elle soit écrite.
      if (g.hasAttribute("data-rature")) continue;
      // La couleur de grille est faite pour passer sous le texte : une
      // graduation posée sur un quadrillage léger est normale et lisible.
      // ATTENTION : getComputedStyle rend « rgb(232, 230, 225) » là où le
      // jeton vaut « #E8E6E1 » — comparer les deux chaînes ne marche PAS
      // (première version de cette sonde, corrigée dans la foulée). On
      // convertit le jeton en rgb() avant de comparer.
      if (grilleRGB && st.stroke.replace(/\s/g, "") === grilleRGB) continue;
      let L = 0;
      try { L = g.getTotalLength(); } catch { continue; }
      if (!(L > 0)) continue;
      const m = versRacine && g.getScreenCTM ? versRacine.multiply(g.getScreenCTM()) : null;
      const pas = Math.max(1, L / 4000);
      const dedans = new Map();
      for (let d = 0; d <= L; d += pas) {
        let pt;
        try { pt = g.getPointAtLength(d); } catch { break; }
        const x = m ? m.a * pt.x + m.c * pt.y + m.e : pt.x;
        const y = m ? m.b * pt.x + m.d * pt.y + m.f : pt.y;
        for (const bt of boites) {
          if (!bt.s) continue;
          // Point ramené dans le repère PROPRE du texte (exact, même tourné).
          const px = bt.inv ? bt.inv.a * x + bt.inv.c * y + bt.inv.e : x;
          const py = bt.inv ? bt.inv.b * x + bt.inv.d * y + bt.inv.f : y;
          const bb = bt.inv ? bt.loc : bt.b;
          // getBBox rend la boîte EM, pas la boîte d'encre. Pour la plupart
          // des mots l'écart est sans conséquence ; pour « … », « . », « , »
          // ou « _ », l'encre tient dans le bas de la boîte et tout le haut
          // est vide. Sans ce cas particulier, les quatre « … » posés au bord
          // d'une droite numérotée (division-euclidienne-droite) sortaient à
          // 94 % alors que les points sont bien SOUS l'axe, vérifié sur la
          // capture. On rétrécit donc la boîte de ces textes-là à son tiers
          // bas — c'est étroit et c'est dit, plutôt que large et faux.
          const encreBasse = /^[…._,]+$/.test(bt.s);
          const hautBoite = encreBasse
            ? bb.y + bb.height * 0.62
            : bb.y + bb.height * 0.15;
          const basBoite = bb.y + bb.height * 0.85;
          if (
            px > bb.x && px < bb.x + bb.width &&
            py > hautBoite && py < basBoite
          ) {
            dedans.set(bt, (dedans.get(bt) ?? 0) + pas);
          }
        }
      }
      // Extrémités du tracé, dans le repère de la racine : une AMORCE qui
      // vient toucher son étiquette a une extrémité collée à la boîte, et
      // ce n'est pas un défaut. Une vraie traversée, elle, entre d'un côté
      // et ressort de l'autre. On ne garde donc les crossings courts que si
      // les deux bouts du tracé sont loin ; les longs (≥ 20 px dans la
      // boîte) comptent quoi qu'il arrive — c'est le cas des arêtes qui
      // partaient du CENTRE d'un nœud et sortaient en barrant son mot.
      const bouts = [];
      for (const d of [0, L]) {
        let pt; try { pt = g.getPointAtLength(d); } catch { continue; }
        bouts.push(
          m ? { x: m.a * pt.x + m.c * pt.y + m.e, y: m.b * pt.x + m.d * pt.y + m.f } : pt
        );
      }
      const distBoite = (b0, pt) => {
        const dx = Math.max(b0.x - pt.x, 0, pt.x - (b0.x + b0.width));
        const dy = Math.max(b0.y - pt.y, 0, pt.y - (b0.y + b0.height));
        return Math.hypot(dx, dy);
      };
      for (const [bt, longueur] of dedans) {
        const proche = bouts.some((pt) => distBoite(bt.b, pt) <= 8);
        const largeurTexte = bt.inv ? bt.loc.width : bt.b.width;
        if (longueur < (proche ? 20 : 10)) continue;
        const rT = rang.get(bt.t), rG = rang.get(g);
        const protege = masques.some((mk) => {
          const r = rang.get(mk);
          if (!(r > rG && r < rT)) return false;
          let bb; try { bb = boiteRacine(mk); } catch { return false; }
          return couvre(bb, bt.b);
        });
        if (protege) continue;
        out.push({
          fig: iFig, type: "barre", txt: bt.s.slice(0, 26),
          detail: `traversé par un <${g.tagName.toLowerCase()}> tracé à ${largeur.toFixed(1)} px ` +
                  `sur ${Math.round(longueur)} px — soit ${Math.round((longueur / Math.max(largeurTexte, 1)) * 100)} % ` +
                  `de la largeur de l'étiquette` +
                  ` · texte en (${Math.round(bt.b.x)};${Math.round(bt.b.y + bt.b.height)})` +
                  ` · tracé ${g.getAttribute("d") ? "d=" + g.getAttribute("d").slice(0, 28).replace(/\s+/g, " ") : [...g.attributes].filter((at) => /^(x1|y1|x2|y2|cx|cy|r|points)$/.test(at.name)).map((at) => at.name + "=" + at.value.slice(0, 12)).join(" ")}`,
        });
      }
    }

    // ── SONDE 5 : le texte qui sort de SON panneau ────────────────────────
    //
    // Classe nommée le 2026-09-03 (un cas réel corrigé à la main sur
    // travail-force-signe), restée sans instrument jusqu'ici. Elle est
    // DIFFÉRENTE du « texte hors cadre » : l'étiquette reste bien dans la
    // figure, mais elle déborde du PANNEAU auquel elle appartient — la moitié
    // gauche d'un diptyque, la boîte d'une étape, la bande d'une zone. Ce
    // qu'on lit alors n'est pas faux, c'est mal attribué : une légende du
    // panneau A qui empiète sur le panneau B semble parler de B.
    //
    // DÉFINITION MÉCANIQUE : pour chaque texte, on prend le PLUS PETIT
    // rectangle qui contient son centre — c'est son panneau. S'il déborde de
    // ce rectangle de plus de 2 px, on le signale. Le fond de figure est un
    // rectangle comme un autre : un texte qui n'est dans aucune boîte plus
    // petite est jugé par rapport à lui, ce qui est exactement le bon
    // critère.
    //
    // TROIS EXCLUSIONS, écrites parce qu'elles sont légitimes :
    //   · un rectangle qui occupe plus de 85 % de la largeur OU de la hauteur
    //     du cadre n'est pas un panneau mais le FOND de la figure — et un
    //     texte ne « sort » pas de son fond, il sort du cadre, ce que la
    //     sonde 1 mesure déjà. (88 % laissait passer le fond de
    //     bilan-forces-chute-frottement, large de 650 pour un cadre de 740.) ;
    //   · un texte dont le centre n'est dans AUCUN rectangle (étiquette
    //     posée sur le blanc) n'a pas de panneau à respecter ;
    //   · `data-hors-panneau` sur le texte, pour une légende volontairement
    //     à cheval (aucun cas connu à ce jour — l'attribut existe pour que
    //     l'exception, si elle arrive, soit ÉCRITE dans le fichier).
    // Un rectangle TOURNÉ n'est pas un panneau : c'est un objet du dessin
    // (la tige d'un pendule, une lame, une flèche épaisse), et sa boîte
    // englobante axe-alignée n'a aucun sens comme cadre d'appartenance.
    // Piège payé une fois : la tige de `pendule-pesant-bras-levier`, inclinée,
    // donnait une « boîte » de 169×227 dont l'étiquette « rappel vers θ = 0 »
    // sortait de 31 px — alors qu'elle est simplement posée à côté du dessin.
    const nonTourne = (r) => {
      try {
        const m = versRacine && r.getScreenCTM ? versRacine.multiply(r.getScreenCTM()) : null;
        return !m || (Math.abs(m.b) < 0.01 && Math.abs(m.c) < 0.01);
      } catch { return true; }
    };
    const rects = [...svg.querySelectorAll("rect")]
      .filter(nonTourne)
      .map((r) => ({ el: r, b: boiteRacine(r) }))
      .filter((r) => r.b && r.b.width > 30 && r.b.height > 20);
    const cadreW = vw || 0;
    const cadreH = vh || 0;
    for (const bt of boites) {
      if (!bt.s || !bt.b || bt.t.hasAttribute("data-hors-panneau")) continue;
      const cx = bt.b.x + bt.b.width / 2;
      const cy = bt.b.y + bt.b.height / 2;
      const contenants = rects.filter(
        (r) =>
          cx >= r.b.x && cx <= r.b.x + r.b.width &&
          cy >= r.b.y && cy <= r.b.y + r.b.height &&
          (!cadreW || r.b.width <= cadreW * 0.85) &&
          (!cadreH || r.b.height <= cadreH * 0.85)
      );
      if (!contenants.length) continue;
      contenants.sort((u, v) => u.b.width * u.b.height - v.b.width * v.b.height);
      const p = contenants[0].b;
      const debG = p.x - bt.b.x;
      const debD = bt.b.x + bt.b.width - (p.x + p.width);
      const debH = p.y - bt.b.y;
      const debB = bt.b.y + bt.b.height - (p.y + p.height);
      const pire = Math.max(debG, debD, debH, debB);
      // SEUIL À 12 px, et il est motivé. Le premier relevé (seuil 2 px) a
      // rendu 50 cas, dont une vingtaine d'étiquettes d'AXE — « t (s) », « y »,
      // « U₀ », « uC » — qui dépassent de 4 à 9 px du rectangle du graphe.
      // C'est la convention même d'un repère : l'étiquette d'axe vit juste en
      // dehors de l'aire tracée. Et ce que cette sonde cherche, c'est
      // l'étiquette MAL ATTRIBUÉE — celle qui empiète assez sur le panneau
      // voisin pour sembler lui appartenir. Cinq pixels n'attribuent rien à
      // personne ; douze, oui.
      if (pire < 12) continue;
      const cote = pire === debG ? "à gauche" : pire === debD ? "à droite" : pire === debH ? "en haut" : "en bas";
      out.push({
        fig: iFig,
        type: "hors panneau",
        txt: bt.s.slice(0, 26),
        detail:
          `sort de ${Math.round(pire)} px ${cote} de son panneau ` +
          `(${Math.round(p.width)}×${Math.round(p.height)} en ${Math.round(p.x)};${Math.round(p.y)}) ` +
          `· texte ${Math.round(bt.b.width)}×${Math.round(bt.b.height)} en ${Math.round(bt.b.x)};${Math.round(bt.b.y)}`,
      });
    }
  });

  // ══════════════════════════════════════════════════════════════════════
  // SONDE 6 — LE CONTRASTE D'UN TEXTE CONTRE CE QUI EST PEINT DERRIÈRE LUI.
  //
  // `contrast-gate` juge les 80 paires de la palette : chaque jeton d'encre
  // contre chaque jeton de fond, dans les deux thèmes. Il ne dit RIEN du
  // voisinage réel à l'intérieur d'une figure — une étiquette en
  // `--figure-ink` posée sur un aplat `--figure-accent` peut tomber à 2:1
  // sans qu'aucune porte ne bouge, parce que les deux jetons sont
  // parfaitement conformes chacun de son côté.
  //
  // COMMENT ON TROUVE LE FOND, sans lire un seul pixel — et les DEUX pièges
  // qu'il a fallu payer avant d'y arriver :
  //
  //   1. `elementsFromPoint` ne répond QUE pour un point dans la fenêtre
  //      VISIBLE. La page d'aperçu empile 258 figures ; la fonction rendait
  //      donc un tableau vide pour presque toutes, la sonde retombait sur
  //      « surface de la figure », et dix « R » blancs posés sur des billes
  //      rouges étaient annoncés à 1,00:1 contre du blanc.
  //   2. La boîte englobante N'EST PAS la forme. Le rectangle d'un `path`
  //      diagonal contient des points que le tracé ne couvre pas, et les
  //      quatre coins d'un cercle n'en font pas partie.
  //
  // On procède donc par GÉOMÉTRIE EXACTE et par ORDRE DE PEINTURE, ce qui
  // est le modèle réel de SVG : `isPointInFill` dit si le point tombe dans
  // l'aire remplie de la forme (converti dans son repère par la CTM), et on
  // COMPOSITE toutes les formes qui le contiennent dans l'ordre du document,
  // chacune avec son `fill-opacity` et l'opacité de ses groupes parents.
  // Une bande d'accent à 28 % ne se lit pas comme un aplat d'accent : elle
  // se lit comme le mélange de l'accent et de ce qui est dessous. Ignorer
  // cela, c'était inventer des défauts.
  //
  // SEUILS. SC 1.4.3 demande 4,5:1 pour du texte normal, 3:1 pour du grand
  // texte (≥ 24 px, ou ≥ 18,66 px en gras) — les deux cas sont traités. Les
  // étiquettes de figure font 9 à 13 px, donc c'est presque toujours 4,5.
  // On SIGNALE sous le seuil et on nomme « grave » à moins des trois quarts.
  const lum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  // Rend [r, g, b, a] — l'alpha compte : c'est lui qui distingue un aplat
  // d'une voile. `none`, `url(#…)` (dégradé, motif) et l'absence rendent null.
  const rgb = (couleur) => {
    const m = /rgba?\(([^)]+)\)/.exec(couleur || "");
    if (!m) return null;
    const p = m[1].split(",").map((x) => parseFloat(x));
    return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
  };
  // Peindre `dessus` (avec son alpha) par-dessus `dessous` (opaque).
  const composer = (dessous, dessus, alpha) => {
    const a = Math.max(0, Math.min(1, alpha));
    return [0, 1, 2].map((i) => dessous[i] * (1 - a) + dessus[i] * a);
  };
  // Opacité cumulée des groupes parents jusqu'au <svg>.
  const opaciteHeritee = (e, racine) => {
    let o = 1;
    for (let n = e; n && n !== racine; n = n.parentElement) {
      o *= parseFloat(getComputedStyle(n).opacity || "1");
    }
    return o;
  };
  const ratio = (a, b) => {
    const la = lum(...a), lb = lum(...b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  let replis = 0;

  document.querySelectorAll(".carte").forEach((carte, iFig) => {
    const svg = carte.querySelector("svg");
    if (!svg) return;
    // Le rendu statique d'un .motion.svg superpose des états qui ne coexistent
    // à aucun instant du film : y juger un contraste, c'est juger une image
    // que personne ne verra jamais.
    if (carte.hasAttribute("data-motion")) return;
    // Un `background-color` transparent ne peint rien : on remonte au corps.
    const opaque = (c) => (c && c[3] >= 0.5 ? c : null);
    const fondCarte = opaque(rgb(getComputedStyle(carte).backgroundColor)) ||
                      opaque(rgb(getComputedStyle(document.body).backgroundColor)) ||
                      [255, 255, 255, 1];
    let iTexte = -1;
    for (const t of svg.querySelectorAll("text")) {
      iTexte++;                      // rang du <text> dans le document = rang
                                     // dans le FICHIER : de quoi viser juste
                                     // quand deux étiquettes portent le même
                                     // texte et qu'une seule est fautive.
      // JUGER LES FEUILLES, PAS LE BLOC. Une étiquette comme
      // `<text><tspan fill="…">L</tspan><tspan fill="…">, r</tspan></text>`
      // n'a PAS de couleur propre : `getComputedStyle(text).fill` y rend le
      // noir par défaut, alors qu'aucun glyphe n'est peint en noir. Jugé au
      // niveau du <text>, le balayage en thème sombre annonçait trois
      // « 1,20:1, encre noire » parfaitement faux. On descend donc aux
      // porteurs de texte : les tspans quand il y en a, le <text> sinon.
      const tspans = [...t.querySelectorAll("tspan")].filter(
        (x) => (x.textContent || "").trim() && !x.querySelector("tspan")
      );
      const porteurs = tspans.length ? tspans : [t];
      for (const porteur of porteurs) {
      const s = (porteur.textContent || "").trim();
      if (!s) continue;
      const cs = getComputedStyle(porteur);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      // Un texte sous 0,5 d'opacité est traité comme un ornement et n'est pas
      // jugé — angle mort ASSUMÉ, et il faut le savoir : si un jour une
      // information passe par une opacité aussi basse, cette sonde la manque.
      if (parseFloat(cs.opacity || "1") < 0.5) continue;
      const encre = rgb(cs.fill);
      if (!encre) continue;
      const b = porteur.getBoundingClientRect();
      if (b.width < 2 || b.height < 2) continue;
      const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
      // QUATRIÈME PIÈGE PAYÉ, et le plus vicieux parce qu'il dépendait du
      // NOMBRE DE FIGURES mesurées. Le test d'appartenance se faisait en
      // coordonnées de FENÊTRE : sur la page d'aperçu du corpus entier, une
      // figure en bas est à y ≈ 90 000, et l'inversion de la CTM à ces
      // grandeurs perd assez de précision pour qu'une pointe de flèche de
      // 8 px « contienne » un point situé à côté. Résultat : cinq textes
      // déclarés recouverts en lot, aucun en solo — un instrument qui change
      // d'avis selon le nombre d'entrées ne vaut rien (la même leçon que le
      // 2026-08-22 sur les chevauchements, apprise une seconde fois).
      //
      // On travaille donc dans le REPÈRE UTILISATEUR du SVG, où tout tient
      // entre 0 et ~1000 : centre du texte via getBBox() ramené au repère
      // racine par sa CTM, puis renvoyé dans le repère de chaque forme.
      const bb = porteur.getBBox();
      const ctmT = porteur.getCTM();
      const centre = ctmT
        ? new DOMPoint(bb.x + bb.width / 2, bb.y + bb.height / 2).matrixTransform(ctmT)
        : null;
      // Le repli sur la boîte englobante est GROSSIER : il déclare « dedans »
      // des points qu'une forme diagonale ne couvre pas. Il doit rester un
      // filet de sécurité, jamais le chemin ordinaire — un oubli d'argument
      // l'a rendu ordinaire pendant une passe, et le modèle s'est mis à
      // proposer 176 faux contrastes au lieu de 10. On le COMPTE donc, et le
      // rapport le dit : un repli silencieux transforme un instrument exact
      // en compteur de bruit sans que rien ne prévienne.
      const dansLaForme = (e, p) => {
        try {
          const c = e.getCTM();
          if (!c || !p) throw new Error("pas de CTM");
          return e.isPointInFill(p.matrixTransform(c.inverse()));
        } catch {
          replis++;
          const r2 = e.getBoundingClientRect();
          return cx >= r2.x && cx <= r2.x + r2.width && cy >= r2.y && cy <= r2.y + r2.height;
        }
      };
      // Une GRILLE, pas un point. Un texte à moitié recouvert reste illisible,
      // et son centre peut très bien être dégagé : c'est le cas de « la même
      // couche, » dans pli-faille-profondeur, dont il ne dépassait qu'une
      // virgule et un « s ». Quinze points suffisent à le dire.
      const grille = [];
      if (ctmT) {
        for (const fx of [0.1, 0.3, 0.5, 0.7, 0.9]) {
          for (const fy of [0.3, 0.5, 0.7]) {
            grille.push(new DOMPoint(bb.x + bb.width * fx, bb.y + bb.height * fy).matrixTransform(ctmT));
          }
        }
      }
      // PAS `elementsFromPoint`, ET C'EST LE PIÈGE QUI A COÛTÉ DEUX PASSES.
      // Cette fonction ne répond QUE pour un point dans la fenêtre visible ;
      // la page d'aperçu empile 258 figures, donc elle rendait un tableau
      // VIDE pour presque toutes, et la sonde retombait sur « surface de la
      // figure » — dix « R » blancs posés sur des billes rouges annoncés à
      // 1,00:1 contre du blanc. On cherche donc géométriquement : parmi les
      // formes PEINTES du même SVG dont la boîte contient le centre du
      // texte, la DERNIÈRE dans l'ordre du document est celle du dessus.
      let fond = fondCarte.slice(0, 3), nomFond = "surface de la figure";
      for (const e of svg.querySelectorAll("circle, ellipse, rect, path, polygon, line, text")) {
        if (e === t) break;                       // on ne peint plus après le texte
        if (e.tagName === "text") continue;       // un chevauchement d'étiquettes
                                                  // est un AUTRE défaut, jugé ailleurs
        if (e.contains(t) || t.contains(e)) continue;
        const ce = getComputedStyle(e);
        if (ce.visibility === "hidden" || ce.display === "none") continue;
        const peint = rgb(ce.fill);
        if (!peint) continue;
        const alpha = peint[3] *
                      parseFloat(ce.fillOpacity || "1") *
                      opaciteHeritee(e, svg);
        if (alpha <= 0.01) continue;
        // GÉOMÉTRIE EXACTE (voir `dansLaForme` plus haut) : le point testé
        // contre l'AIRE REMPLIE de la forme, pas contre sa boîte.
        if (!dansLaForme(e, centre)) continue;
        fond = composer(fond, peint, alpha);
        nomFond = `${e.tagName.toLowerCase()}${e.getAttribute("class") ? "." + e.getAttribute("class").split(/\s+/)[0] : ""}`;
      }
      // ── CE QUI PASSE PAR-DESSUS ────────────────────────────────────
      // Les étapes d'une figure sont CUMULATIVES (StagedFigure :
      // `wanted = fullyRevealed || n <= stage`, groupes insérés en
      // `beforeend`). Ce qu'un step peint recouvre POUR DE BON ce qu'un step
      // antérieur avait peint. Un texte au contraste nominal parfait peut
      // donc être purement et simplement effacé — trois figures le
      // faisaient, dont une à 17,35:1.
      //
      // Le modèle regarde donc AUSSI ce qui vient après le texte dans
      // l'ordre du document, et accumule le voile. Au-delà de 0,85, il
      // propose « texte invisible » ; l'étage pixel tranche en retirant le
      // texte et en regardant si l'image bouge.
      const voiles = (grille.length ? grille : [centre]).map(() => 0);
      let vu = false;
      const couvrants = [];
      const elemsCouvrants = [];
      for (const e of svg.querySelectorAll("circle, ellipse, rect, path, polygon, line, text")) {
        if (e === t) { vu = true; continue; }   // le <text> parent marque le rang
        if (!vu) continue;                        // peint AVANT : déjà composé
        if (e.tagName === "text") continue;       // un texte qui en couvre un
                                                  // autre est un chevauchement
        if (e.contains(t) || t.contains(e)) continue;
        const ce = getComputedStyle(e);
        if (ce.visibility === "hidden" || ce.display === "none") continue;
        const peint = rgb(ce.fill);
        if (!peint) continue;
        const alpha = peint[3] * parseFloat(ce.fillOpacity || "1") * opaciteHeritee(e, svg);
        if (alpha <= 0.01) continue;
        const pts = grille.length ? grille : [centre];
        let touche = false;
        for (let k = 0; k < pts.length; k++) {
          if (!dansLaForme(e, pts[k])) continue;
          voiles[k] = 1 - (1 - voiles[k]) * (1 - alpha);
          touche = true;
        }
        if (!touche) continue;
        couvrants.push(`${e.tagName.toLowerCase()}@${alpha.toFixed(2)}`);
        elemsCouvrants.push(e);
      }
      // Couverture = part MOYENNE du texte qui disparaît sous ce qui vient
      // après lui. `voile` (le centre seul) reste pour la composition du fond.
      const couverture = voiles.reduce((a, b) => a + b, 0) / voiles.length;
      const voile = voiles[Math.floor(voiles.length / 2)];

      // L'encre elle-même peut être une voile : une étiquette à 40 % ne se
      // lit pas comme sa couleur nominale.
      const alphaEncre = encre[3] *
                         parseFloat(cs.fillOpacity || "1") *
                         opaciteHeritee(porteur, svg);
      const encreVue = alphaEncre >= 0.99 ? encre.slice(0, 3) : composer(fond, encre, alphaEncre);
      // SC 1.4.3 : 3:1 pour du grand texte (≥ 24 px, ou ≥ 18,66 px en gras).
      const px = parseFloat(cs.fontSize);
      const gras = parseInt(cs.fontWeight, 10) >= 700;
      const seuil = px >= 24 || (gras && px >= 18.66) ? 3 : 4.5;
      const r = ratio(encreVue, fond);
      // Un texte à moitié effacé est un défaut même quand son contraste est
      // parfait — c'est la classe que rien ne voyait avant le 2026-09-04.
      if (r >= seuil && couverture < 0.5) continue;
      // Marqué pour l'ÉTAGE PIXEL, qui ira vérifier ce que le modèle avance.
      const idc = String(out.length);
      porteur.setAttribute("data-contraste-id", idc);
      for (const e of elemsCouvrants) {
        e.setAttribute("data-couvre",
          `${e.getAttribute("data-couvre") ?? ""} ${idc}`.trim());
      }
      out.push({
        fig: iFig,
        id: idc,
        iTexte,
        encre: encreVue.map(Math.round),
        encreBrute: encre.slice(0, 3).map(Math.round),
        couvrants: couvrants.slice(0, 4),
        couverture,
        alphaEncre,
        seuil,
        modele: r,
        type: couverture >= 0.9 ? "texte invisible"
            : couverture >= 0.5 ? "texte recouvert"
            : r < seuil * 0.75 ? "contraste grave" : "contraste faible",
        txt: s.slice(0, 26),
        // Le texte du PARENT aussi : quand on juge un tspan (« 2+ »), une
        // exemption écrite sur l'étiquette entière (« Cu2+ ») doit encore
        // mordre. Sans ça, descendre aux feuilles casse les déclarations.
        txtParent: (t.textContent || "").trim().slice(0, 40),
        detail:
          `${r.toFixed(2)}:1 — encre rgb(${encreVue.map(Math.round).join(",")}) ` +
          `sur ${nomFond} rgb(${fond.map(Math.round).join(",")}) · ` +
          `${Math.round(px)}px${gras ? " gras" : ""} · SC 1.4.3 demande ${seuil === 3 ? "3" : "4,5"}:1`,
      });
      }   // fin des porteurs de ce <text>
    }
  });

  if (replis > 0) {
    out.push({
      fig: -1,
      type: "instrument",
      txt: "repli sur la boîte englobante",
      detail:
        `${replis} test(s) d'appartenance ont dû se replier sur la boîte ` +
        "englobante faute de CTM — la géométrie n'était donc PAS exacte pour eux.",
    });
  }
  return out;
}, sombre);

/**
 * ÉTAGE PIXEL — le modèle propose, les pixels disposent.
 *
 * La sonde 6 calcule le fond en SIMULANT le modèle de peinture de SVG :
 * géométrie exacte, ordre du document, `fill-opacity`, opacité des groupes.
 * C'est fidèle — mais c'est un modèle, et un modèle se trompe en silence.
 * Deux fois déjà aujourd'hui il s'est trompé, et deux fois il avait l'air
 * sûr de lui : 418 défauts annoncés avant la prise en compte des voiles,
 * 60 « blanc sur blanc » avant la correction de `elementsFromPoint`.
 *
 * Alors on mesure pour de vrai. Pour chaque candidat : on capture la zone
 * du texte, on CACHE le texte, on recapture. La seconde image ne contient
 * plus que le fond — c'est la vérité terrain, sans une ligne de modèle. On
 * en prend la couleur MÉDIANE (robuste aux bords et aux traits qui passent)
 * et on recalcule le rapport. Le verdict rendu est celui des pixels.
 *
 * Bénéfice secondaire, gratuit : la différence entre les deux images dit si
 * le texte change quoi que ce soit à l'image. Un texte dont le retrait ne
 * change RIEN est un texte que l'élève ne voit pas — le défaut le plus
 * grave de la classe, et le seul qui ne dépende d'aucun seuil.
 */
// « texte invisible » DOIT être dans cette liste : c'est une proposition du
// modèle comme une autre, et elle passe au crible des pixels comme les
// autres. L'oublier (première version, 2026-09-04) faisait publier telles
// quelles cinq propositions jamais vérifiées — exactement ce que tout cet
// étage existe pour empêcher.
const candidats = defauts.filter(
  (d) => typeof d.type === "string" &&
    (d.type.startsWith("contraste") || d.type === "texte invisible" || d.type === "texte recouvert")
);
if (pixelsTous) {
  const tous = await page.evaluate(() => {
    const out = [];
    let n = 1e6;
    document.querySelectorAll(".carte").forEach((carte, iFig) => {
      const svg = carte.querySelector("svg");
      if (!svg || carte.hasAttribute("data-motion")) return;
      let iTexte = -1;
      for (const t of svg.querySelectorAll("text")) {
        iTexte++;
        if (t.hasAttribute("data-contraste-id")) continue;   // déjà candidat
        const s = (t.textContent || "").trim();
        if (!s) continue;
        const cs = getComputedStyle(t);
        if (cs.visibility === "hidden" || cs.display === "none") continue;
        const m = /rgba?\(([^)]+)\)/.exec(cs.fill || "");
        if (!m) continue;
        const p = m[1].split(",").map((x) => parseFloat(x));
        let o = p.length > 3 ? p[3] : 1;
        o *= parseFloat(cs.fillOpacity || "1");
        for (let e = t; e && e !== svg; e = e.parentElement) o *= parseFloat(getComputedStyle(e).opacity || "1");
        const px = parseFloat(cs.fontSize);
        const gras = parseInt(cs.fontWeight, 10) >= 700;
        const idc = String(n++);
        t.setAttribute("data-contraste-id", idc);
        out.push({
          fig: iFig, id: idc, iTexte, txt: s.slice(0, 26), exploratoire: true,
          encreBrute: [p[0], p[1], p[2]].map(Math.round), alphaEncre: o,
          seuil: px >= 24 || (gras && px >= 18.66) ? 3 : 4.5,
        });
      }
    });
    return out;
  });
  console.log(`Étage pixel intégral : ${tous.length} texte(s) supplémentaire(s) à mesurer un par un.`);
  candidats.push(...tous);
}
if (candidats.length) {
  const lum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const rapport = (a, b) => {
    const la = lum(...a), lb = lum(...b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  // TROISIÈME PIÈGE PAYÉ, ET LE PLUS SOURNOIS. Première version de cet
  // étage : capture `fullPage` avec un `clip` en coordonnées du document.
  // Sur cette page — 258 figures empilées, plus de 100 000 px de haut —
  // Chromium ne peut pas allouer la surface, et rend une image du FOND DE
  // PAGE pour tout ce qui est loin en bas. Résultat : « le retrait du texte
  // ne change rien » sur presque tous les candidats, avec un fond mesuré à
  // rgb(247,247,244) — la couleur du corps de la page, jamais celle d'une
  // carte de figure. L'instrument venait de certifier soixante-dix textes
  // invisibles qui sont parfaitement lisibles.
  //
  // On amène donc chaque texte DANS la fenêtre, on remesure sa boîte après
  // le défilement (`boundingBox` est relatif à la fenêtre), et on capture
  // sans `fullPage`. Et on garde le témoin : un fond mesuré égal au fond du
  // CORPS est physiquement impossible à l'intérieur d'une carte — si ça
  // arrive, c'est la capture qui a manqué sa cible, pas la figure qui est
  // fautive, et on le dit au lieu d'inventer un défaut.
  const fondCorps = await page.evaluate(() => {
    const m = /rgba?\(([^)]+)\)/.exec(getComputedStyle(document.body).backgroundColor);
    return m ? m[1].split(",").map((x) => Math.round(parseFloat(x))).slice(0, 3) : null;
  });
  let capturesRatees = 0;
  for (const d of candidats) {
    const el = await page.$(`[data-contraste-id="${d.id}"]`);
    if (!el) { d.pixels = "élément introuvable"; continue; }
    await el.scrollIntoViewIfNeeded();
    const b = await el.boundingBox();
    if (!b || b.width < 1 || b.height < 1) { d.pixels = "zone vide"; continue; }
    // BORNÉ À LA FENÊTRE. Un tspan d'exposant ramené en haut de page peut
    // déborder du cadre visible, et Playwright refuse alors la capture
    // (« Clipped area is either empty or outside the resulting image ») —
    // ce qui faisait tomber tout le balayage sur UNE figure. On rogne, et
    // si après rognage il ne reste rien, on le DIT au lieu de planter.
    const vp = page.viewportSize() ?? { width: 1280, height: 1200 };
    // MINIMUM DE 8 px, centré sur l'élément. Un tspan d'exposant fait 4×5 px :
    // rogné à la fenêtre il pouvait tomber sous 2 px, et l'instrument
    // renonçait à le juger (« zone hors fenêtre »). Une zone un peu plus large
    // que la lettre ne gêne pas la mesure — le fond y est le même — et elle
    // évite de laisser des textes non certifiés dans le rapport.
    const MIN = 8;
    const cxE = b.x + b.width / 2, cyE = b.y + b.height / 2;
    const w = Math.max(MIN, b.width + 2);
    const h = Math.max(MIN, b.height + 2);
    const x0 = Math.max(0, Math.min(cxE - w / 2, vp.width - w));
    const y0 = Math.max(0, Math.min(cyE - h / 2, vp.height - h));
    const clip = {
      x: Math.max(0, x0),
      y: Math.max(0, y0),
      width: Math.min(w, vp.width - Math.max(0, x0)),
      height: Math.min(h, vp.height - Math.max(0, y0)),
    };
    if (clip.width < 2 || clip.height < 2) { d.pixels = "zone hors fenêtre"; continue; }
    let echecCapture = null;
    const capturer = async () => {
      try {
        return (await page.screenshot({ clip })).toString("base64");
      } catch (e) {
        echecCapture = e.message.split("\n")[0];
        return null;
      }
    };
    const avant = await capturer();
    if (avant === null) { d.pixels = `capture impossible : ${echecCapture}`; continue; }
    await el.evaluate((e) => { e.style.visibility = "hidden"; });
    const apres = await capturer();
    await el.evaluate((e) => { e.style.visibility = ""; });
    if (apres === null) { d.pixels = `capture impossible : ${echecCapture}`; continue; }
    const comparer = async ([a, p]) => {
      const charge = (s64) =>
        new Promise((res, rej) => {
          const i = new Image();
          i.onload = () => res(i);
          i.onerror = rej;
          i.src = "data:image/png;base64," + s64;
        });
      const [ia, ib] = await Promise.all([charge(a), charge(p)]);
      const c = document.createElement("canvas");
      c.width = ia.width; c.height = ia.height;
      const x = c.getContext("2d", { willReadFrequently: true });
      x.drawImage(ia, 0, 0);
      const da = x.getImageData(0, 0, c.width, c.height).data;
      x.clearRect(0, 0, c.width, c.height);
      x.drawImage(ib, 0, 0);
      const db = x.getImageData(0, 0, c.width, c.height).data;
      let maxd = 0, changes = 0;
      const lums = [], cols = [];
      for (let i = 0; i < da.length; i += 4) {
        const delta = Math.max(
          Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2])
        );
        if (delta > maxd) maxd = delta;
        if (delta > 8) changes++;
        cols.push([db[i], db[i + 1], db[i + 2]]);
        lums.push(0.299 * db[i] + 0.587 * db[i + 1] + 0.114 * db[i + 2]);
      }
      // MÉDIANE et non moyenne : une moyenne mélangerait un trait d'axe qui
      // traverse la zone avec l'aplat, et inventerait une couleur qui n'est
      // peinte nulle part.
      const ordre = lums.map((l, i) => [l, i]).sort((u, v) => u[0] - v[0]);
      const fond = cols[ordre[Math.floor(ordre.length / 2)][1]];
      return { maxd, part: changes / (da.length / 4), fond, n: da.length / 4 };
    };
    const m = await page.evaluate(comparer, [avant, apres]);

    // COMBIEN DU TEXTE EST ENCORE VISIBLE ? La question ne se pose pas en
    // couleurs mais en SURFACE, et elle se mesure sans un gramme de modèle :
    //   · A/B  — avec et sans le texte : ce qu'il MARQUE réellement ;
    //   · D/E  — mêmes deux images, mais les formes qui le recouvrent
    //            elles-mêmes cachées : ce qu'il MARQUERAIT sans elles.
    // Le rapport des deux est la part effacée. Une étiquette dont il ne
    // dépasse qu'une virgule (« la même couche, » dans pli-faille-profondeur)
    // se voit ici, et NULLE PART ailleurs : son centre est dégagé ou non
    // selon le hasard du dessin, et son contraste est parfait.
    if (d.couverture > 0.05) {
      const cacherCouvrants = (cacher) =>
        page.evaluate(([idc, c]) => {
          for (const e of document.querySelectorAll(`[data-couvre~="${idc}"]`)) {
            e.style.visibility = c ? "hidden" : "";
          }
        }, [d.id, cacher]);
      await cacherCouvrants(true);
      const d1 = await capturer();
      await el.evaluate((e) => { e.style.visibility = "hidden"; });
      const e1 = await capturer();
      await el.evaluate((e) => { e.style.visibility = ""; });
      await cacherCouvrants(false);
      const mTotal = d1 && e1 ? await page.evaluate(comparer, [d1, e1]) : { part: 0 };
      d.couvertureMesuree = mTotal.part > 0.001
        ? Math.max(0, Math.min(1, 1 - m.part / mTotal.part))
        : null;
    }
    if (fondCorps && m.fond.every((c, i) => Math.abs(c - fondCorps[i]) <= 1)) {
      // Le témoin a parlé : cette capture n'est pas tombée dans la carte.
      capturesRatees++;
      d.pixels = "capture manquée (fond du corps mesuré) — non jugé";
      continue;
    }
    // L'encre est recomposée sur le fond MESURÉ : une étiquette à 40 %
    // d'opacité ne se lit pas comme sa couleur nominale, et le fond sur
    // lequel elle se dilue est celui des pixels, pas celui du modèle.
    const a = Math.max(0, Math.min(1, d.alphaEncre ?? 1));
    d.encre = a >= 0.99
      ? d.encreBrute.slice()
      : [0, 1, 2].map((i) => Math.round(m.fond[i] * (1 - a) + d.encreBrute[i] * a));
    const r = rapport(d.encre, m.fond);
    d.mesure = r;
    d.fondMesure = m.fond;
    d.invisible = m.maxd <= 8;
    d.pixels =
      `${r.toFixed(2)}:1 mesuré aux pixels — encre rgb(${d.encre.join(",")}) sur fond réel ` +
      `rgb(${m.fond.join(",")})` +
      (m.maxd <= 8
        ? " · LE RETRAIT DU TEXTE NE CHANGE RIEN À L'IMAGE : invisible"
        : ` · le texte marque ${(m.part * 100).toFixed(0)} % de sa zone (écart max ${m.maxd})`);
  }
  // Le modèle avait tort quand les pixels passent le seuil : on le dit, et on
  // retire le défaut. Un instrument qui garde ses faux positifs par prudence
  // apprend à ses lecteurs à ignorer ses sorties.
  const recouvert = (d) =>
    d.invisible ||
    (typeof d.couvertureMesuree === "number" && d.couvertureMesuree >= 0.5);
  const dementis = candidats.filter(
    (d) => !d.exploratoire && typeof d.mesure === "number" && d.mesure >= d.seuil && !recouvert(d)
  );
  for (const d of dementis) defauts.splice(defauts.indexOf(d), 1);
  // Les exploratoires n'étaient PAS des défauts : ils le deviennent seulement
  // si les pixels les condamnent. C'est le sens de la marche — le modèle
  // dirige le regard, la mesure tranche, et jamais l'inverse.
  const trouves = candidats.filter(
    (d) => d.exploratoire && (recouvert(d) || (typeof d.mesure === "number" && d.mesure < d.seuil))
  );
  for (const d of trouves) defauts.push(d);
  for (const d of candidats) {
    if (typeof d.mesure !== "number") continue;
    const cm = d.couvertureMesuree;
    if (d.invisible || (typeof cm === "number" && cm >= 0.9)) d.type = "texte invisible";
    else if (typeof cm === "number" && cm >= 0.5) d.type = "texte recouvert";
    else d.type = d.mesure < d.seuil * 0.75 ? "contraste grave" : "contraste faible";
    d.detail = `${d.pixels} · ${Math.round(d.px ?? 0) || ""}`.replace(/ · $/, "");
    d.detail = d.pixels + ` · SC 1.4.3 demande ${d.seuil === 3 ? "3" : "4,5"}:1` +
      (typeof d.couvertureMesuree === "number" && d.couvertureMesuree > 0.05
        ? ` · ${(d.couvertureMesuree * 100).toFixed(0)} % du texte effacé (mesuré) par ` +
          `${d.couvrants.join(", ")} — le modèle disait ${(d.couverture * 100).toFixed(0)} %`
        : "") +
      (typeof d.modele === "number" && Math.abs(d.mesure - d.modele) > 0.15
        ? ` (le modèle disait ${d.modele.toFixed(2)}:1)` : "");
  }
  const nonMesures = candidats.filter((d) => typeof d.mesure !== "number");
  if (nonMesures.length) {
    console.error(
      `\n✗ ÉTAGE PIXEL : ${nonMesures.length} candidat(s) NON mesuré(s) — ` +
        "l'instrument ne peut pas les certifier :"
    );
    for (const d of nonMesures.slice(0, 8)) {
      console.error(`   · [${path.basename(fichiers[d.fig] ?? "?")}] « ${d.txt} » → ${d.pixels ?? "raison inconnue"}`);
    }
  }
  if (capturesRatees) {
    console.error(
      `\n✗ ÉTAGE PIXEL CASSÉ : ${capturesRatees} capture(s) sont tombées sur le fond du corps ` +
        "au lieu de la carte. Les candidats concernés ne sont PAS jugés — l'instrument\n" +
        "  refuse de trancher sur une image qu'il sait fausse."
    );
  }
  if (dementis.length) {
    console.log(
      `\nÉtage pixel : ${dementis.length} candidat(s) démenti(s) par la mesure — ` +
        "le modèle de peinture les avait mal jugés, les pixels les blanchissent."
    );
    if (process.env.DEMENTIS) {
      for (const d of dementis.slice(0, 40)) {
        console.log(
          `    ~ [${path.basename(fichiers[d.fig] ?? "?")}] « ${d.txt} » — modèle : ` +
            `${(d.couverture * 100).toFixed(0)} % couvert par ${(d.couvrants ?? []).join(", ")} ; ` +
            `pixels : ${typeof d.couvertureMesuree === "number" ? (d.couvertureMesuree * 100).toFixed(0) + " %" : "—"}`
        );
      }
    }
  }
}

await navigateur.close();
const nbMotion = fichiers.filter((f) => /\.motion\.svg$/.test(f)).length;
console.log(`\n${cartesDom.length} figure(s) → ${sortie}  (thème ${sombre ? "sombre" : "clair"})`);
if (nbMotion > 0) {
  console.log(
    `${nbMotion} figure(s) de mouvement capturée(s) mais NON sondée(s) :` +
      " le rendu statique d'un .motion.svg n'est l'état d'aucun instant du film."
  );
}
// Une figure marquée DETTE OWNER est sous arbitrage : la repeindre
// reviendrait à décider qu'on la garde. Ses défauts sont RÉELS et doivent
// être comptés — mais séparément, sinon la dette owner pollue à jamais le
// décompte du corpus vivant et personne ne sait plus ce qui reste à faire.
const enDette = new Set(
  fichiers.filter((f) => {
    try {
      const abs = path.isAbsolute(f) ? f : path.join(RACINE, f);
      return /DETTE\s+OWNER\s*:/i.test(readFileSync(abs, "utf8"));
    } catch { return false; }
  })
);
// RECOUVREMENT ASSUMÉ — l'exception, sur le modèle de COULEURS SÉMANTIQUES.
//
// Les étapes d'une figure sont CUMULATIVES : ce qu'un step peint recouvre
// pour de bon ce qu'un step antérieur avait peint. C'est parfois le PROPOS
// même de la figure — l'ion Cu²⁺ qui devient un atome de cuivre au même
// site, le titre d'un schéma remplacé quand la résistance entre en scène,
// la porteuse choisie redessinée en accent par-dessus elle-même. Dans ces
// cas, « le retrait du texte ne change rien à l'image » est vrai ET voulu.
//
// On ne supprime pas la détection, on exige que l'exception soit DITE, et
// qu'elle NOMME le texte concerné entre guillemets français — un marqueur
// global ferait taire la sonde pour tout le fichier, y compris pour
// l'effacement accidentel qu'on y introduira demain.
const exempte = new Map();
for (const f of fichiers) {
  try {
    const abs = path.isAbsolute(f) ? f : path.join(RACINE, f);
    const src = readFileSync(abs, "utf8");
    const noms = new Set();
    for (const m of src.matchAll(/RECOUVREMENT\s+ASSUMÉ\s*:([^\n]*(?:\n(?!\s*(?:-->|[A-ZÉ]{4,}\s))[^\n]*)*)/gi)) {
      for (const g of m[1].matchAll(/«\s*([^»]+?)\s*»/g)) noms.add(g[1]);
    }
    if (noms.size) exempte.set(f, noms);
  } catch { /* fichier illisible : aucune exemption, et c'est le bon défaut */ }
}
const assumes = [];
for (let i = defauts.length - 1; i >= 0; i--) {
  const d = defauts[i];
  if (d.type !== "texte invisible" && d.type !== "texte recouvert") continue;
  const noms = exempte.get(fichiers[d.fig]);
  if (!noms) continue;
  // Le texte du rapport est tronqué à 26 caractères : on compare par préfixe.
  // ET on compare aussi au texte du PARENT : depuis qu'on juge les tspans un
  // par un, « Cu2+ » se présente en deux morceaux, « Cu » et « 2+ », et une
  // exemption écrite sur l'étiquette entière doit encore mordre sur les deux.
  for (const n of noms) {
    const parent = d.txtParent ?? "";
    if (n.startsWith(d.txt) || d.txt.startsWith(n.slice(0, 26)) ||
        (parent && (n.startsWith(parent) || parent.startsWith(n.slice(0, 40))))) {
      assumes.push(d);
      defauts.splice(i, 1);
      break;
    }
  }
}
const dette = defauts.filter((d) => enDette.has(fichiers[d.fig]));
const vifs = defauts.filter((d) => !enDette.has(fichiers[d.fig]));
if (vifs.length === 0) {
  console.log("\nMESURE — aucun défaut sur le corpus vivant.");
} else {
  console.log(`\nMESURE — ${vifs.length} défaut(s) sur le corpus vivant :`);
}
for (const d of vifs) {
  const rang = typeof d.iTexte === "number" ? ` (texte n°${d.iTexte})` : "";
  console.log(`  ✗ [${path.basename(fichiers[d.fig] ?? "?")}] ${d.type} : « ${d.txt} »${rang}`);
  console.log(`      ${d.detail}`);
}
if (assumes.length) {
  console.log(
    `\n${assumes.length} recouvrement(s) ASSUMÉ(s) — texte effacé par une étape ` +
      "ultérieure, déclaré et motivé dans le fichier :"
  );
  for (const d of assumes) {
    console.log(`  ○ [${path.basename(fichiers[d.fig] ?? "?")}] « ${d.txt} »`);
  }
}
if (dette.length) {
  console.log(
    `\n${dette.length} défaut(s) de plus sur des figures marquées DETTE OWNER — ` +
      "réels, non corrigés ici, et à porter au dossier d'arbitrage :"
  );
  for (const d of dette) {
    console.log(`  · [${path.basename(fichiers[d.fig] ?? "?")}] ${d.type} : « ${d.txt} »`);
    console.log(`      ${d.detail}`);
  }
}
console.log("\nLa mesure ne remplace pas le regard : ouvre les PNG.");

if (porte) {
  // Sur `vifs` et non `defauts` : une figure sous DETTE OWNER est un
  // arbitrage en attente, pas une régression à bloquer. Ses défauts sont
  // imprimés, comptés à part, et n'arrêtent pas le build.
  const bloquants = vifs.filter((d) => CLASSES_ARMEES.has(d.type));
  if (bloquants.length) {
    console.error(
      `\n━━ porte figures : ${bloquants.length} défaut(s) de classe armée ━━\n` +
        "   (« déborde » = texte hors du cadre ; « hors panneau » = texte qui\n" +
        "    sort de son panneau ; « contraste … » = texte sous le seuil de\n" +
        "    SC 1.4.3 CONTRE CE QUI EST VRAIMENT PEINT DERRIÈRE LUI, mesuré\n" +
        "    aux pixels ; « texte invisible » = texte effacé par une étape\n" +
        "    ultérieure — si c'est voulu, déclare-le dans le fichier par\n" +
        "    « RECOUVREMENT ASSUMÉ: « <le texte> » — <la raison> »)"
    );
    process.exit(1);
  }
  console.log(
    `porte figures : ${fichiers.length} figure(s), aucune sortie de cadre, ` +
      "aucune sortie de panneau, aucun texte sous le seuil de contraste, " +
      "aucun texte effacé ✓"
  );
}
