/**
 * French-typography normalizer.
 *
 * Applies two French orthotypographic conventions to a plain-text string:
 *
 *  (a) The straight ASCII apostrophe (U+0027 `'`) becomes the typographic
 *      apostrophe / right single quotation mark (U+2019 `’`) when it sits
 *      *between two letters* — e.g. `l'élève` → `l’élève`. Apostrophes that
 *      are not between letters (quote marks, feet/minute marks, code-ish
 *      uses) are left alone.
 *
 *  (b) A NARROW NO-BREAK SPACE (U+202F) is placed before the "high"
 *      punctuation marks `;` `:` `!` `?`, and on the inner side of the
 *      French guillemets — after `«` and before `»`. Any existing regular
 *      space in that slot is replaced; if none is present the narrow space
 *      is inserted. The narrow no-break space keeps the punctuation glued
 *      to its word across line wraps.
 *
 * The function is pure (no I/O, no globals), well-typed, dependency-free,
 * and idempotent: running it on its own output yields the same string.
 *
 * @param s - The input prose string.
 * @returns The normalized string.
 */

const APOSTROPHE_STRAIGHT = "'"; // '
const APOSTROPHE_TYPO = "’"; // ’
const NNBSP = " "; // NARROW NO-BREAK SPACE
const NBSP = " "; // NO-BREAK SPACE

// Any horizontal space we are willing to absorb/replace in a punctuation slot:
// regular space, no-break space, and the narrow no-break space itself
// (so the transform is idempotent and also normalizes a plain NBSP).
const SPACE_CLASS = `[ \\t${NBSP}${NNBSP}]`;

/**
 * Match a straight apostrophe that is flanked on both sides by a letter.
 * `\p{L}` (any Unicode letter) is used so accented French letters count.
 * Lookbehind/lookahead keep the surrounding letters out of the match so
 * only the apostrophe is replaced.
 */
const APOSTROPHE_BETWEEN_LETTERS = new RegExp(
  `(?<=\\p{L})${APOSTROPHE_STRAIGHT}(?=\\p{L})`,
  "gu",
);

/**
 * Normalize the slot *before* a high-punctuation mark (`;` `:` `!` `?`).
 * Captures any run of absorbable space (possibly empty) immediately before
 * the mark and replaces the whole slot with a single narrow no-break space
 * followed by the mark.
 */
const BEFORE_HIGH_PUNCT = new RegExp(`${SPACE_CLASS}*([;:!?])`, "gu");

/**
 * Normalize the slot *after* an opening guillemet `«`.
 */
const AFTER_OPENING_GUILLEMET = new RegExp(`(«)${SPACE_CLASS}*`, "gu");

/**
 * Normalize the slot *before* a closing guillemet `»`.
 */
const BEFORE_CLOSING_GUILLEMET = new RegExp(`${SPACE_CLASS}*(»)`, "gu");

export function frenchTypography(s: string): string {
  let out = s;

  // (a) straight apostrophe → typographic apostrophe, between letters only.
  out = out.replace(APOSTROPHE_BETWEEN_LETTERS, APOSTROPHE_TYPO);

  // (b) narrow no-break space around French punctuation.
  out = out.replace(BEFORE_HIGH_PUNCT, `${NNBSP}$1`);
  out = out.replace(AFTER_OPENING_GUILLEMET, `$1${NNBSP}`);
  out = out.replace(BEFORE_CLOSING_GUILLEMET, `${NNBSP}$1`);

  return out;
}

export default frenchTypography;
