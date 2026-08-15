/**
 * lib/chapters.ts
 *
 * LESSON-EXPERIENCE-SPEC.md §1 — chapter-heading extraction, shared.
 *
 * A "chapter" is one `## ` heading in lesson.md (§1.1). For 60/61 lessons
 * this coincides exactly with the `## R<n> — Title` rung grammar;
 * `content/maths/probabilites-conditionnelles/lesson.md` is the one census
 * exception with plain (non-rung) `##` headings — it paginates on those
 * as-authored (ledger `docs/audits/fable-day3-ledger.md` §11.11).
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
  const cut = title.split(" : ")[0].split(" (")[0].trim();
  return sansLatex(cut.length > 0 ? cut : title);
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
    const title = sansLatex(rungMatch ? rungMatch[2].trim() : fullText);
    out.push({
      title,
      shortTitle: shortTitleOf(title),
      rung: rungMatch ? rungMatch[1] : undefined,
    });
  }
  return out;
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
