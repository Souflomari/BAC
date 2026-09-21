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
 *  (b) A pair of straight ASCII double quotes (`"…"`) around French prose
 *      becomes a pair of guillemets (`« … »`). The corpus mixes the two: on
 *      `derivabilite-etude-fonctions` the SAME sentence renders with `"…"` in
 *      the lesson body and `« … »` in the checkpoint block right beneath it —
 *      visibly inconsistent to a student. Straight quotes in French prose are
 *      an anglicism; the pair is only converted when it wraps something
 *      containing a letter, so symbol-only spans and code-ish strings are left
 *      alone. Runs BEFORE (c) so the new guillemets get their narrow spaces.
 *
 *  (c) A NARROW NO-BREAK SPACE (U+202F) is placed before the "high"
 *      punctuation marks `;` `:` `!` `?`, and on the inner side of the
 *      French guillemets — after `«` and before `»`. Any existing regular
 *      space in that slot is replaced; if none is present the narrow space
 *      is inserted. The narrow no-break space keeps the punctuation glued
 *      to its word across line wraps.
 *
 *  (d) A NO-BREAK SPACE (U+00A0) binds a NUMBER to the SI UNIT that follows
 *      it — « 3 L », « 0 °C », « 25 mA ». The SI brochure (BIPM §5.4.3)
 *      requires a space there AND forbids the value and its symbol to be
 *      separated across a line break; a plain space does exactly what is
 *      forbidden. Measured on the corpus at 390 px on 2026-09-05: five
 *      breaks, on two lessons — « 3 » ending a line and « L » opening the
 *      next, in the very hook that asks the student to reason about two
 *      jerrycans. A rule here fixes the class for every page and for
 *      everything written after it, which editing five strings would not.
 *
 *      The unit list is deliberately CLOSED. It is written longest-first as
 *      a convention, but that order was TESTED and is NOT load-bearing: with
 *      `m` before `mA`, « 25 mA » still binds correctly, because the only
 *      thing the replacement inserts is a space in the slot the pattern
 *      already consumed — there is no space between `m` and `A` to disturb.
 *      (The first version of this comment claimed the opposite; the red test
 *      that was supposed to prove it passed, which is how the claim was
 *      caught.) What DOES the work is the trailing lookahead below.
 *
 *      Single-letter symbols that double as point or curve names in a maths
 *      corpus (A, C, N, T…) are included anyway: the worst case of a wrong
 *      bind is a line that wraps one word earlier — never a changed
 *      character.
 *
 * The function is pure (no I/O, no globals), well-typed, dependency-free,
 * and idempotent: running it on its own output yields the same string.
 *
 * @param s - The input prose string.
 * @returns The normalized string.
 */

const APOSTROPHE_STRAIGHT = "'"; // '
export const APOSTROPHE_TYPO = "’"; // ’
const NNBSP = " "; // NARROW NO-BREAK SPACE
const NBSP = " "; // NO-BREAK SPACE

// Any horizontal space we are willing to absorb/replace in a punctuation slot:
// regular space, no-break space, and the narrow no-break space itself
// (so the transform is idempotent and also normalizes a plain NBSP).
const SPACE_CLASS = `[ \\t${NBSP}${NNBSP}]`;

/**
 * Match a straight apostrophe that is flanked on both sides by a letter.
 * `\p{L}` (any Unicode letter) is used so accented French letters count.
 *
 * SANS LOOKBEHIND, ET C'EST LE SUJET (§11.163). La version précédente
 * s'écrivait `(?<=\p{L})'(?=\p{L})`. Le lookbehind n'existe dans WebKit
 * qu'à partir de **Safari 16.4 (mars 2023)** : sur un iPhone resté en iOS 15
 * — un 6s, un 7, un SE de première génération, c'est-à-dire exactement le
 * téléphone d'occasion d'un lycéen —, construire cette expression LÈVE, au
 * chargement du module, et le morceau entier meurt avec elle.
 *
 * La lettre de gauche est donc CAPTURÉE puis réécrite (`$1’`) au lieu d'être
 * regardée derrière. Le lookahead, lui, est universel. Comportement
 * identique, y compris sur les apostrophes en chaîne (« l'a'b ») : le groupe
 * ne consomme que la lettre de gauche, qui n'est jamais celle dont la
 * prochaine paire a besoin.
 */
const APOSTROPHE_BETWEEN_LETTERS = new RegExp(
  `(\\p{L})${APOSTROPHE_STRAIGHT}(?=\\p{L})`,
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

/**
 * A pair of straight double quotes wrapping prose that contains at least one
 * letter, on a single line.
 *
 * The letter requirement is the safety catch: it converts « "premiers entre
 * eux" » but leaves a symbol-only or numeric span alone. Code and math never
 * reach here — `remarkFrenchTypography` visits mdast `text` nodes only, and
 * `inlineCode`/`code`/`inlineMath`/`math` are separate node types.
 *
 * The inner class forbids `"` and newlines, so pairs cannot span lines and a
 * stray unpaired quote is left untouched rather than swallowing the rest of
 * the paragraph.
 */
const STRAIGHT_QUOTED_PROSE = /"([^"\n]*\p{L}[^"\n]*)"/gu;

/**
 * The SI unit symbols the corpus actually uses, longest first (a convention,
 * not a requirement — see the note in the file header).
 *
 * `°C` and `%` are here too: the degree sign and the percent sign take the
 * same non-breaking bind in French typography.
 */
const UNITES = [
  "MeV", "kHz", "MHz", "min", "mol", "bar", "rad", "µs", "µF", "ms", "cm", "mm", "km",
  "mL", "kg", "mg", "kJ", "mV", "mA", "nF", "pF", "mH", "eV", "tr", "°C", "Wb", "Hz",
  "Pa", "°", "%", "m", "s", "h", "g", "L", "N", "J", "W", "V", "A", "K", "T", "F", "H", "C", "Ω",
];

/**
 * A number, a plain (breakable) space, and a unit symbol standing alone.
 *
 * THE TRAILING LOOKAHEAD IS THE WHOLE SAFETY OF THIS RULE. Without it,
 * « 3 mètres » would bind its `m` and « l'exercice 3 montre » would bind a
 * word that is not a unit at all. Forbidding a letter or a digit right after
 * the symbol is what keeps a spelled-out unit an ordinary word that wraps
 * like one.
 */
const NOMBRE_UNITE = new RegExp(
  `(\\d(?:[.,]\\d+)?)[ \\t](${UNITES.map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}\\d])`,
  "gu",
);

export function frenchTypography(s: string): string {
  let out = s;

  // (a) straight apostrophe → typographic apostrophe, between letters only.
  out = out.replace(APOSTROPHE_BETWEEN_LETTERS, `$1${APOSTROPHE_TYPO}`);

  // (b) straight double-quote pair → guillemets, BEFORE the spacing pass so
  // the guillemets it produces receive their narrow no-break spaces below.
  out = out.replace(STRAIGHT_QUOTED_PROSE, "«$1»");

  // (c) narrow no-break space around French punctuation.
  out = out.replace(BEFORE_HIGH_PUNCT, `${NNBSP}$1`);
  out = out.replace(AFTER_OPENING_GUILLEMET, `$1${NNBSP}`);
  out = out.replace(BEFORE_CLOSING_GUILLEMET, `${NNBSP}$1`);

  // (d) a NO-BREAK space between a number and its unit (SI §5.4.3). Runs last:
  // the punctuation pass above never touches this slot, and running it here
  // keeps the function idempotent (a NBSP is not `[ \t]`, so a second pass
  // finds nothing left to bind).
  out = out.replace(NOMBRE_UNITE, `$1${NBSP}$2`);

  return out;
}

export default frenchTypography;
