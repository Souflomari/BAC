/**
 * lib/shuffle.ts
 *
 * Deterministic answer-choice shuffling.
 *
 * WHY DETERMINISTIC (never Math.random()):
 *   - SSR/hydration parity: McqItem/CheckpointItem render on the server first
 *     (Next.js RSC/SSR) and again on the client during hydration. If the
 *     choice order differed between those two passes, React would throw a
 *     hydration mismatch (the exact class of bug ADR-tracked elsewhere in
 *     this codebase — see dom-truth.mjs's deep-linked-chapter sweep for a
 *     real instance of that failure mode). A PRNG seeded from the item's own
 *     id produces the SAME order on every render, on every machine, forever.
 *   - dom-truth stability: the rendered-truth instrument (web/scripts/
 *     dom-truth.mjs) asserts against live DOM content. A non-deterministic
 *     shuffle would make "the first rendered choice" a moving target and
 *     break any assertion that reads choice text/order.
 *   - Screenshot/visual-review stability: components-shots.mjs and friends
 *     capture the product for human/critic review. Choices reshuffling on
 *     every capture would make diffs noisy and reviews non-reproducible.
 *   - Still un-biased across items: the seed is derived from the item's own
 *     id (hashString), so DIFFERENT items land on DIFFERENT permutations —
 *     this isn't a fixed shuffle, it's a stable-per-item one. The 58%
 *     choice-A bias measured in file order (web/scripts/item-stats.mjs)
 *     disappears because each item's correct choice lands on a
 *     hash-dependent position instead of wherever the author happened to
 *     type it first.
 *
 * Pure, dependency-free. No Math.random, no Date.now, no external state.
 *
 * KEEP IN SYNC: web/scripts/item-stats.mjs and web/scripts/dom-truth.mjs each
 * duplicate a copy of hashString + mulberry32 + the shuffle (Node scripts
 * can't import from web/src/lib without a bundler). If you change the
 * algorithm here, update those two duplicates in the same commit — the
 * dom-truth cross-check sweep exists specifically to catch drift between
 * this file and its duplicates.
 */

/**
 * FNV-1a, 32-bit. A small, fast, well-distributed non-cryptographic hash.
 * Deterministic across platforms/runs for the same input string.
 */
export function hashString(s: string): number {
  let hash = 0x811c9dc5; // FNV offset basis (32-bit)
  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193); // FNV prime
  }
  return hash >>> 0; // unsigned 32-bit
}

/**
 * mulberry32 — a tiny, fast, deterministic 32-bit PRNG. Given the same seed
 * it produces the same sequence of floats in [0, 1) every time.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic Fisher-Yates shuffle. Non-mutating: returns a new array,
 * leaves `arr` untouched. Same `arr` + same `seed` → same output, always.
 */
export function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = arr.slice();
  const rand = mulberry32(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Shuffle a list of choices deterministically, seeded by `seedKey` (the
 * item's own id, optionally prefixed with the notion id — e.g.
 * "maths/probabilites-conditionnelles/RC-7" — when the caller has one, to
 * further decorrelate items that happen to share an id across notions).
 *
 * The RETURNED array's index order is what callers should use to derive the
 * displayed A/B/C/D letter (position, not choice.id) — the choice objects
 * themselves (id, correct, feedback, …) are untouched, so selection state
 * and correctness lookups keyed by choice.id remain valid regardless of
 * display order.
 */
export function shuffledChoices<T>(choices: T[], seedKey: string): T[] {
  return seededShuffle(choices, hashString(seedKey));
}
