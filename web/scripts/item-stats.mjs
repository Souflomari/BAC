/**
 * item-stats.mjs — measures the answer-key position bias, before and after
 * the deterministic per-item shuffle (web/src/lib/shuffle.ts).
 *
 * Walks every content/<subject>/<slug>/items.yaml + checkpoints.yaml, and for
 * each MCQ item with exactly one `correct: true` choice, reports THREE things
 * per subject:
 *
 *   1. FILE-ORDER correct-letter distribution — where the correct choice sits
 *      as the author typed it, before any shuffle. This is the distribution
 *      that measured 58% choice-A in the reported bias.
 *   2. RENDERED (post-shuffle) correct-position distribution — where the
 *      correct choice lands once web/src/lib/shuffle.ts's deterministic,
 *      per-item-id-seeded shuffle is applied. Should read close to uniform.
 *   3. LENGTH-TELL — % of items where the correct choice's text is STRICTLY
 *      the longest choice (a second common answer-key giveaway, independent
 *      of position — shuffling the ORDER does not fix this; it's reported
 *      for visibility, not fixed by this change).
 *
 * This is a measurement tool, not a gate: it always exits 0. Read the table.
 *
 * Usage: node scripts/item-stats.mjs   (from web/, or `npm run item-stats`)
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");
const CONTENT = path.join(REPO, "content");

// ── keep in sync with web/src/lib/shuffle.ts — dom-truth cross-checks this ──
//
// This is a duplicate of hashString + mulberry32 + seededShuffle from
// web/src/lib/shuffle.ts. Node scripts here can't import TS from web/src
// without a bundler, so the algorithm is copied verbatim. If you change the
// shuffle algorithm in lib/shuffle.ts, update this copy AND the copy in
// dom-truth.mjs in the same commit — the dom-truth cross-check sweep exists
// specifically to catch the two drifting apart.
function hashString(s) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    hash ^= s.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  const result = arr.slice();
  const rand = mulberry32(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function shuffledChoices(choices, seedKey) {
  return seededShuffle(choices, hashString(seedKey));
}
// ── end keep-in-sync block ──

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function safeReadFile(p) {
  try {
    return fs.readFileSync(p, "utf-8");
  } catch {
    return null;
  }
}

/** Load + normalize the item list out of an items.yaml or checkpoints.yaml file. */
function loadItems(filePath, topKey) {
  const raw = safeReadFile(filePath);
  if (!raw) return [];
  let parsed;
  try {
    parsed = yaml.load(raw);
  } catch {
    return [];
  }
  const list = parsed && Array.isArray(parsed[topKey]) ? parsed[topKey] : [];
  return list.filter(
    (it) =>
      it &&
      typeof it.id === "string" &&
      it.type === "mcq" &&
      Array.isArray(it.choices) &&
      it.choices.length >= 2
  );
}

/** Per-subject accumulator. */
function freshStats() {
  return {
    nItems: 0,
    nSkippedAmbiguous: 0, // 0 or >1 correct choices — excluded from position stats
    fileOrderCounts: {}, // letter -> count
    renderedCounts: {}, // letter -> count
    lengthTellCount: 0, // correct choice strictly longest
    lengthTellEligible: 0, // items with no length ties for the max
  };
}

function bump(counts, letter) {
  counts[letter] = (counts[letter] ?? 0) + 1;
}

function pctRow(counts, n) {
  return LETTERS.slice(0, 4)
    .map((L) => {
      const c = counts[L] ?? 0;
      const pct = n > 0 ? ((c / n) * 100).toFixed(0) : "0";
      return `${L}:${pct}%`;
    })
    .join("  ");
}

// ── walk content/<subject>/<slug>/{items,checkpoints}.yaml ──

const bySubject = new Map(); // subject -> stats

if (!fs.existsSync(CONTENT)) {
  console.error(`item-stats: content/ not found at ${CONTENT}`);
  process.exit(0);
}

const subjects = fs
  .readdirSync(CONTENT)
  .filter((n) => !n.startsWith("_") && !n.startsWith("."))
  .filter((n) => fs.statSync(path.join(CONTENT, n)).isDirectory())
  .sort();

for (const subject of subjects) {
  const subjectPath = path.join(CONTENT, subject);
  const stats = freshStats();

  const slugs = fs
    .readdirSync(subjectPath)
    .filter((n) => !n.startsWith("_") && !n.startsWith("."))
    .filter((n) => fs.statSync(path.join(subjectPath, n)).isDirectory());

  for (const slug of slugs) {
    const dir = path.join(subjectPath, slug);
    const items = [
      ...loadItems(path.join(dir, "items.yaml"), "items"),
      ...loadItems(path.join(dir, "checkpoints.yaml"), "checkpoints"),
    ];

    for (const item of items) {
      stats.nItems++;
      const choices = item.choices;
      const correctIdxs = [];
      choices.forEach((c, i) => {
        if (c && c.correct === true) correctIdxs.push(i);
      });

      if (correctIdxs.length !== 1) {
        stats.nSkippedAmbiguous++;
        continue;
      }
      const correctIdx = correctIdxs[0];

      // 1. File-order position
      const fileLetter = LETTERS[correctIdx] ?? String(correctIdx + 1);
      bump(stats.fileOrderCounts, fileLetter);

      // 2. Rendered (post-shuffle) position — same seedKey convention as
      //    McqItem.tsx / CheckpointItem.tsx: the item's own id, alone.
      const shuffled = shuffledChoices(choices, item.id);
      const renderedIdx = shuffled.findIndex((c) => c && c.correct === true);
      const renderedLetter = LETTERS[renderedIdx] ?? String(renderedIdx + 1);
      bump(stats.renderedCounts, renderedLetter);

      // 3. Length-tell: is the correct choice's text STRICTLY the longest?
      const lengths = choices.map((c) => (typeof c.text === "string" ? c.text.trim().length : 0));
      const maxLen = Math.max(...lengths);
      const nAtMax = lengths.filter((l) => l === maxLen).length;
      if (nAtMax === 1) {
        stats.lengthTellEligible++;
        if (lengths[correctIdx] === maxLen) stats.lengthTellCount++;
      }
    }
  }

  bySubject.set(subject, stats);
}

// ── report ──

console.log("");
console.log("item-stats — answer-key position bias, file-order vs rendered (post-shuffle)");
console.log("═".repeat(100));
console.log(
  `${"subject".padEnd(10)} ${"n".padStart(4)}  ${"file-order (pre-shuffle)".padEnd(34)} ${"rendered (post-shuffle)".padEnd(34)} length-tell`
);
console.log("─".repeat(100));

let totalN = 0;
const totalFile = {};
const totalRendered = {};
let totalLengthTellCount = 0;
let totalLengthTellEligible = 0;

for (const [subject, stats] of bySubject) {
  const n = stats.nItems - stats.nSkippedAmbiguous;
  totalN += n;
  for (const L of LETTERS.slice(0, 4)) {
    totalFile[L] = (totalFile[L] ?? 0) + (stats.fileOrderCounts[L] ?? 0);
    totalRendered[L] = (totalRendered[L] ?? 0) + (stats.renderedCounts[L] ?? 0);
  }
  totalLengthTellCount += stats.lengthTellCount;
  totalLengthTellEligible += stats.lengthTellEligible;

  const lengthPct =
    stats.lengthTellEligible > 0
      ? `${((stats.lengthTellCount / stats.lengthTellEligible) * 100).toFixed(0)}%`
      : "n/a";

  console.log(
    `${subject.padEnd(10)} ${String(n).padStart(4)}  ${pctRow(stats.fileOrderCounts, n).padEnd(34)} ${pctRow(stats.renderedCounts, n).padEnd(34)} ${lengthPct}`
  );
  if (stats.nSkippedAmbiguous > 0) {
    console.log(`${"".padEnd(10)}       (${stats.nSkippedAmbiguous} item(s) skipped: 0 or >1 correct choices)`);
  }
}

console.log("─".repeat(100));
const totalLengthPct =
  totalLengthTellEligible > 0 ? `${((totalLengthTellCount / totalLengthTellEligible) * 100).toFixed(0)}%` : "n/a";
console.log(
  `${"TOTAL".padEnd(10)} ${String(totalN).padStart(4)}  ${pctRow(totalFile, totalN).padEnd(34)} ${pctRow(totalRendered, totalN).padEnd(34)} ${totalLengthPct}`
);
console.log("═".repeat(100));
console.log(
  "file-order = where the author placed the correct choice (pre-shuffle); rendered = where it lands after\n" +
  "lib/shuffle.ts's deterministic per-item shuffle. Rendered should read close to uniform (~25% each of A-D)\n" +
  "regardless of how skewed file-order is. length-tell is NOT fixed by shuffling order — reported for visibility."
);

process.exit(0);
