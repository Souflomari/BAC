/**
 * lib/chapters.ts
 *
 * LESSON-EXPERIENCE-SPEC.md §1 — chapter-heading extraction, shared.
 *
 * A "chapter" is one `## ` heading in lesson.md (§1.1). RE-CENSUSED 2026-09-12:
 * for 56/62 lessons this coincides exactly with the `## R<n> — Title` rung
 * grammar, but SIX lessons mix plain (non-rung) `##` headings into the rung
 * sequence — the previous comment claimed only one, and was wrong:
 *
 *   probabilites-conditionnelles  6 headings / 1 rung   (authored on plain
 *                                                        headings, ledger §11.11)
 *   structures-algebriques       10 headings / 8 rungs  (plain at ch5, ch8)
 *   nombres-complexes-1           9 headings / 7 rungs  (plain at ch6, ch7)
 *   suites-numeriques            12 headings / 11 rungs (plain at ch10)
 *   limites-continuite            8 headings / 7 rungs  (plain last)
 *   derivabilite-etude-fonctions  7 headings / 6 rungs  (plain last)
 *
 * CONSEQUENCE — the shorthand "chapitre N = R(N−1)", used by the content
 * reviews and by the wave-1 critics, holds ONLY for the 56 pure-rung lessons.
 * In the six above, a plain heading SHIFTS every rung after it, so the true
 * chapter of a rung is `1 + (number of ## headings before it)`. Verified
 * 2026-09-12: the prose in those lessons already cites the TRUE rendered
 * number (structures-algebriques « un homomorphisme (chapitre 10) » = R7 ;
 * nombres-complexes-1 « chapitre 8 » = R5 géométrie), and a corpus sweep found
 * ZERO drifted citations. Applying the naive shorthand there would BREAK
 * correct citations — do not "fix" them.
 *
 * This module is the single source BOTH `NotionPageView` (server — needs the
 * real chapter COUNT to size the synthetic "S'entraîner" chapter and the
 * `ChapterShell` total) and `MarginRail` (client — builds the rail's entry
 * list) read from, so page and rail never drift on "how many chapters does
 * this lesson have."
 *
 * NOTE — a SEPARATE, independent re-derivation exists in NotionBody.tsx
 * (`chapterizeSegments`): it needs to split the already-marker-split
 * `Segment[]` array, a type private to that file, so it re-applies the SAME
 * `^##\s` line rule itself rather than importing from here. Both must agree
 * on chapter boundaries for a given lesson.md — guaranteed by using the
 * identical regex against the identical raw markdown, not by a shared
 * function (the two operate on different intermediate representations).
 */

import { frenchTypography } from "@/lib/frenchTypography";

const HEADING_LINE_RE = /^##\s+(.+?)\s*$/;
const RUNG_PREFIX_RE = /^(R\d+)\s*[-—]\s*(.+)$/;

export interface ChapterHeadingInfo {
  /** Full heading title as authored, minus any `R<n> — ` prefix. */
  title: string;
  /** Resting rail label — cut at " : " / " (" (existing MarginRail convention). */
  shortTitle: string;
  /** The rung code ("R3"), when the heading is rung-shaped. Undefined for
   *  plain `##` headings (probabilites-conditionnelles — ledger 11.11). */
  rung?: string;
}


/**
 * Retire les délimiteurs KaTeX d'un libellé de NAVIGATION.
 *
 * Audit du 2026-08-15 : le sommaire affichait « Signe de $f\'$ et sens de
 * variation », « L'ensemble $\\mathbb{C}$ », « $\\mathrm{PGCD}$ » — les
 * délimiteurs bruts, à l'écran, sur 4 des 8 pages de maths contrôlées. La
 * cause : KaTeX est appliqué au CORPS de la leçon, jamais aux titres
 * réinjectés dans la navigation.
 *
 * Le correctif n'est pas d'y brancher KaTeX. Un libellé de rail est un
 * repère de position, pas une formule : il doit rester lisible à 12 px, dans
 * une colonne de 52 px, et dans un `title=` de survol où le HTML n'existe
 * pas. On rend donc le TEXTE de la formule, pas sa mise en forme.
 *
 * `shortTitleOf` coupait déjà à « : » et « ( » en partie pour cette raison —
 * mais ça ne marche que si le dollar se trouve APRÈS le séparateur, ce qui
 * n'est vrai que par chance.
 */
const ENSEMBLES: Record<string, string> = {
  N: "ℕ", Z: "ℤ", Q: "ℚ", R: "ℝ", C: "ℂ",
};

export function sansLatex(texte: string): string {
  if (!texte.includes("$")) return texte;
  return texte
    // \mathbb{C} → ℂ (les ensembles ont un glyphe Unicode : on le prend)
    .replace(/\\mathbb\{([A-Z])\}/g, (_, l: string) => ENSEMBLES[l] ?? l)
    // \mathrm{PGCD}, \text{…}, \mathcal{…} → leur contenu
    .replace(/\\(?:mathrm|text|mathcal|mathbf|operatorname)\{([^}]*)\}/g, "$1")
    // toute autre commande : on garde ce qu'elle enveloppe, on jette la commande
    .replace(/\\[a-zA-Z]+\s*\{([^}]*)\}/g, "$1")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[${}]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Derive the short resting label from a heading title: the part before
 * " : " or " (" reads as the section's name ("Accroche", "Le cas amorti");
 * titles with neither stay whole. Also keeps raw KaTeX ($T_0$) out of the
 * rail — the dollar-bearing tails sit after these separators. Applies
 * uniformly to rung AND non-rung headings alike (ledger 11.11: non-rung
 * headings keep their text — this function does nothing rung-specific).
 */
export function shortTitleOf(title: string): string {
  // La découpe se fait AVANT la normalisation typographique : après elle, le
  // séparateur n'est plus « espace deux-points espace » mais une insécable
  // fine, et le `split(" : ")` ne mordrait plus. L'ordre compte.
  const cut = title.split(" : ")[0].split(" (")[0].trim();
  return frenchTypography(sansLatex(cut.length > 0 ? cut : title));
}

/**
 * Extract every `## ` heading from lesson markdown, in authored order — ALL
 * of them (§1.4 widens the rail from "rungs only" to cover the non-rung
 * exception), not just `## R<n> — …`.
 */
export function extractChapterHeadings(markdown: string): ChapterHeadingInfo[] {
  const out: ChapterHeadingInfo[] = [];
  for (const line of markdown.split("\n")) {
    const m = line.match(HEADING_LINE_RE);
    if (!m) continue;
    const fullText = m[1].trim();
    const rungMatch = fullText.match(RUNG_PREFIX_RE);
    const brut = sansLatex(rungMatch ? rungMatch[2].trim() : fullText);
    // TYPOGRAPHIE FRANÇAISE ICI, à la source des titres de chapitre — pas
    // dans chaque composant qui les affiche. Mesuré le 2026-09-05 : le corps
    // de la leçon disait « le pendule d’énergie » et le rail, juste à côté,
    // « le pendule d'énergie ». Deux apostrophes différentes pour le même
    // titre, à trois centimètres l'une de l'autre. Ce fichier est la source
    // unique que le rail ET la page lisent : normaliser ici les met d'accord
    // par construction, et non par vigilance.
    const title = frenchTypography(brut);
    out.push({
      title,
      shortTitle: shortTitleOf(brut),
      rung: rungMatch ? rungMatch[1] : undefined,
    });
  }
  return out;
}

/**
 * Le TEXTE de chaque chapitre, dans l'ordre authoré — même découpe que
 * `extractChapterHeadings`, mais on garde le corps et pas seulement le titre.
 *
 * La règle reproduit exactement celle de `chapterizeSegments` (NotionBody) :
 * ce qui précède le PREMIER `## ` fusionne dans le chapitre 0 plutôt que de
 * former un chapitre fantôme, et une leçon sans aucun `## ` rend un seul
 * chapitre. Les deux découpes DOIVENT rester d'accord — c'est l'index de
 * chapitre qui les relie (§1.1), pas un identifiant partagé.
 *
 * Utilisé par la zone « à retenir » (§3.2) pour son repli : à défaut de
 * sidecar, la première formule `$$…$$` du chapitre courant.
 */
export function splitChapterBodies(markdown: string): string[] {
  const lignes = markdown.split("\n");
  const corps: string[] = [];
  let courant: string[] = [];
  let vu = false;
  for (const ligne of lignes) {
    if (HEADING_LINE_RE.test(ligne)) {
      if (vu) {
        corps.push(courant.join("\n"));
        courant = [];
      }
      vu = true;
    }
    courant.push(ligne);
  }
  corps.push(courant.join("\n"));
  return corps;
}

/**
 * The real (lesson-derived) chapter count — min 1 even when lesson.md
 * carries no `## ` heading at all (every segment merges into one chapter;
 * mirrors NotionBody's own `chapterizeSegments` fallback). Returns 0 only
 * when there is no lesson markdown at all (nothing to paginate).
 */
export function realChapterCount(markdown: string | null): number {
  if (!markdown) return 0;
  return Math.max(1, extractChapterHeadings(markdown).length);
}

/**
 * Reading-time formula — words / 180 wpm, min 1. Same rule as
 * `readingMinutesOf` (web/src/lib/content.ts:311-319), applied to a single
 * chapter's PROSE text. Marker lines ([[figure:…]] etc.) have already been
 * split out into their own non-prose segments by the time a chapter's
 * minutes are computed, so — unlike the whole-lesson total — they no longer
 * contribute stray "words". An honest refinement, not a regression.
 */
export function minutesForText(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
