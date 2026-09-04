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
const fichiers = args.filter((a) => !a.startsWith("--"));

if (fichiers.length === 0) {
  console.error("usage: node scripts/figure-preview.mjs [--dark] <chemin-svg>…");
  process.exit(1);
}

// Les jetons du thème demandé, depuis la source générée.
const css = readFileSync(path.join(WEB, "src/app/tokens.generated.css"), "utf8");
const bloc = sombre ? css.slice(css.indexOf(".dark")) : css.slice(0, css.indexOf(".dark"));
// [A-Za-z0-9-] et non [a-z0-9-] — voir PIÈGE PAYÉ en tête de fichier.
const jetons = [...bloc.matchAll(/(--(?:figure|color)-[A-Za-z0-9-]+):\s*([^;]+);/g)];
const declarations = jetons.map(([, k, v]) => `  ${k}: ${v.trim()};`).join("\n");

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
const defauts = await page.evaluate(() => {
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
    const boites = textes.map((t) => ({ t, b: boiteRacine(t), s: t.textContent.trim() }));
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
            ? bt.b.y + bt.b.height * 0.62
            : bt.b.y + bt.b.height * 0.15;
          const basBoite = bt.b.y + bt.b.height * 0.85;
          if (
            x > bt.b.x && x < bt.b.x + bt.b.width &&
            y > hautBoite && y < basBoite
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
                  `sur ${Math.round(longueur)} px — soit ${Math.round((longueur / Math.max(bt.b.width, 1)) * 100)} % ` +
                  `de la largeur de l'étiquette` +
                  ` · texte en (${Math.round(bt.b.x)};${Math.round(bt.b.y + bt.b.height)})` +
                  ` · tracé ${g.getAttribute("d") ? "d=" + g.getAttribute("d").slice(0, 28).replace(/\s+/g, " ") : [...g.attributes].filter((at) => /^(x1|y1|x2|y2|cx|cy|r|points)$/.test(at.name)).map((at) => at.name + "=" + at.value.slice(0, 12)).join(" ")}`,
        });
      }
    }
  });
  return out;
});

await navigateur.close();
const nbMotion = fichiers.filter((f) => /\.motion\.svg$/.test(f)).length;
console.log(`\n${cartesDom.length} figure(s) → ${sortie}  (thème ${sombre ? "sombre" : "clair"})`);
if (nbMotion > 0) {
  console.log(
    `${nbMotion} figure(s) de mouvement capturée(s) mais NON sondée(s) :` +
      " le rendu statique d'un .motion.svg n'est l'état d'aucun instant du film."
  );
}
if (defauts.length === 0) {
  console.log("Mesure : aucun texte hors cadre, aucun chevauchement > 40 %.");
} else {
  console.log(`\nMESURE — ${defauts.length} défaut(s) :`);
  for (const d of defauts) {
    console.log(`  ✗ [${path.basename(fichiers[d.fig] ?? "?")}] ${d.type} : « ${d.txt} »`);
    console.log(`      ${d.detail}`);
  }
}
console.log("\nLa mesure ne remplace pas le regard : ouvre les PNG.");
