/**
 * test-learner-model.mjs — unit tests for `web/src/lib/learner-model.ts`
 * (LEARNER-MODEL-SPEC.md), the pure read-layer classifier/mastery/NextUp
 * functions. Case-table style, run via Node's built-in test runner.
 *
 * `learner-model.ts` is loaded straight from TypeScript source via `jiti`
 * (already a devDependency, used the same way by `scripts/dom-truth.mjs`
 * to load `interactive-figures/*.ts` at test time) — no build step, no
 * ts-node, nothing that needs `npm run build` first. `learner-model.ts`'s
 * one `import type { StudentState } from "./student-state"` is a
 * TYPE-ONLY import (erased at transpile time), so this never touches
 * `student-state.ts`'s "use client" / React / Supabase code — the module
 * under test really is plain, dependency-free TypeScript.
 *
 * Run from `web/`:
 *   node --test scripts/test-learner-model.mjs
 *
 * (Also wired as `npm run test-learner-model`.)
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });
const lm = jiti(path.join(WEB, "src/lib/learner-model.ts"));

const {
  classifyMisconception,
  classifyMisconceptions,
  notionMasteryState,
  computeStudentState,
  nextUpRecommendation,
} = lm;

// ── Fixture helpers ─────────────────────────────────────────────────────

const NOTION = "pc/rlc-serie";
const MC = "mc.physics.rlc_serie.resistance-entretient-oscillations";

function mkEvent(overrides = {}) {
  return {
    id: 1,
    userId: "u1",
    notionId: NOTION,
    itemId: "it-1",
    kind: "item",
    choiceIndex: 0,
    isCorrect: false,
    misconceptionId: null,
    chapterIndex: null,
    createdAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

function mkExhibition(id, createdAt, chapterIndex = 0, misconceptionId = MC, notionId = NOTION) {
  return mkEvent({ id, notionId, misconceptionId, chapterIndex, createdAt, isCorrect: false });
}

function mkState(overrides = {}) {
  return {
    userId: "u1",
    notionId: NOTION,
    misconceptionId: MC,
    exhibitedCount: 2,
    firstExhibitedAt: "2026-01-01T00:00:00.000Z",
    lastExhibitedAt: "2026-01-02T00:00:00.000Z",
    remediationAttempts: 0,
    clearedAt: null,
    ...overrides,
  };
}

function mkProgress(overrides = {}) {
  return {
    userId: "u1",
    notionId: NOTION,
    chaptersVisited: [],
    chaptersTotal: 10,
    lastChapterIndex: null,
    itemsAttempted: 0,
    itemsCorrect: 0,
    firstVisitAt: "2026-01-01T00:00:00.000Z",
    lastVisitAt: "2026-01-01T00:00:00.000Z",
    ...overrides,
  };
}

const FLOOR_MET = { [NOTION]: { [MC]: 3 } }; // count >= 3 → floor met
const FLOOR_UNMET = { [NOTION]: { [MC]: 2 } }; // count < 3 → floor NOT met

// ── (a) classifyMisconception — LEARNER-MODEL-SPEC §3 ───────────────────

test("classifyMisconception: floor not met (count < 3) → unassessed, even with exhibitions+cleared", () => {
  const events = [mkExhibition(1, "2026-01-01"), mkExhibition(2, "2026-01-02")];
  const state = mkState({ clearedAt: "2026-01-03T00:00:00.000Z" });
  assert.equal(classifyMisconception(NOTION, MC, events, state, FLOOR_UNMET), "unassessed");
});

test("classifyMisconception: floor met, no exhibitions → unassessed", () => {
  assert.equal(classifyMisconception(NOTION, MC, [], null, FLOOR_MET), "unassessed");
});

test("classifyMisconception: floor met, 1 exhibition → unassessed (below the 2-exhibition floor)", () => {
  const events = [mkExhibition(1, "2026-01-01")];
  assert.equal(classifyMisconception(NOTION, MC, events, null, FLOOR_MET), "unassessed");
});

test("classifyMisconception: floor met, 2 exhibitions, no cleared_at → active", () => {
  const events = [mkExhibition(1, "2026-01-01"), mkExhibition(2, "2026-01-02")];
  assert.equal(classifyMisconception(NOTION, MC, events, null, FLOOR_MET), "active");
  const state = mkState({ clearedAt: null });
  assert.equal(classifyMisconception(NOTION, MC, events, state, FLOOR_MET), "active");
});

test("classifyMisconception: floor met, cleared_at set → cleared", () => {
  const events = [mkExhibition(1, "2026-01-01"), mkExhibition(2, "2026-01-02")];
  const state = mkState({ clearedAt: "2026-01-03T00:00:00.000Z" });
  assert.equal(classifyMisconception(NOTION, MC, events, state, FLOOR_MET), "cleared");
});

test("classifyMisconception: re-exhibited after clearing (clearedAt reopened to null by the write path) → active again", () => {
  // Simulates record_notion_misconception_exhibited's own reopening
  // (draft-049): a fresh exhibition event lands, and the state row's
  // cleared_at is reset to NULL by the RPC. The read layer just re-reads
  // the ladder against the new events/state — no special-casing needed.
  const events = [
    mkExhibition(1, "2026-01-01"),
    mkExhibition(2, "2026-01-02"),
    // two "clearing" successes would live only as is_correct=true events
    // with no misconceptionId (not exhibitions) — irrelevant to this count.
    mkExhibition(3, "2026-02-01"), // the re-exhibition
  ];
  const reopened = mkState({ clearedAt: null, remediationAttempts: 1 });
  assert.equal(classifyMisconception(NOTION, MC, events, reopened, FLOOR_MET), "active");
});

test("classifyMisconceptions: enumerates floor-declared pairs and defensively includes stray state rows", () => {
  const otherNotion = "pc/rc-charge";
  const otherMc = "mc.physics.rc_charge.some-other";
  const floorMap = { [NOTION]: { [MC]: 3 } };
  const states = [mkState({ notionId: otherNotion, misconceptionId: otherMc, clearedAt: null })];
  const out = classifyMisconceptions([], states, floorMap);
  const keys = out.map((c) => `${c.notionId}::${c.misconceptionId}`).sort();
  assert.deepEqual(keys, [`${NOTION}::${MC}`, `${otherNotion}::${otherMc}`].sort());
  // the floor-declared pair with zero events is unassessed; the stray
  // state-row pair (no floor entry at all) is unassessed too.
  for (const c of out) assert.equal(c.classification, "unassessed");
});

// ── (b) notionMasteryState — LEARNER-MODEL-SPEC §4, incl. the 21-day edge ──

test("notionMasteryState: no progress row → non-ouvert", () => {
  assert.equal(notionMasteryState(null, new Date("2026-01-01")).state, "non-ouvert");
});

test("notionMasteryState: progress row, nothing visited, nothing attempted → non-ouvert", () => {
  const p = mkProgress({ chaptersVisited: [], itemsAttempted: 0 });
  assert.equal(notionMasteryState(p, new Date("2026-01-01")).state, "non-ouvert");
});

test("notionMasteryState: nothing visited but items attempted → exercé", () => {
  const p = mkProgress({ chaptersVisited: [], itemsAttempted: 3 });
  const r = notionMasteryState(p, new Date("2026-01-01"));
  assert.equal(r.state, "exercé");
  assert.equal(r.itemsAttempted, 3);
});

test("notionMasteryState: some chapters visited, not all → entamé (ch. k/N)", () => {
  const p = mkProgress({ chaptersVisited: [0, 1, 2], chaptersTotal: 10, lastVisitAt: "2026-01-01" });
  const r = notionMasteryState(p, new Date("2026-01-02"));
  assert.equal(r.state, "entamé");
  assert.equal(r.chapterK, 3); // max(0,1,2)+1
  assert.equal(r.chaptersTotal, 10);
});

test("notionMasteryState: all chapters visited, recent, no items → lu", () => {
  const p = mkProgress({
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 3,
    itemsAttempted: 0,
    lastVisitAt: "2026-01-10T00:00:00.000Z",
  });
  const r = notionMasteryState(p, new Date("2026-01-15T00:00:00.000Z"));
  assert.equal(r.state, "lu");
});

test("notionMasteryState: all chapters visited AND items attempted → exercé (outranks lu)", () => {
  const p = mkProgress({
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 3,
    itemsAttempted: 5,
    lastVisitAt: "2026-01-10T00:00:00.000Z",
  });
  const r = notionMasteryState(p, new Date("2026-01-15T00:00:00.000Z"));
  assert.equal(r.state, "exercé");
});

test("notionMasteryState: 21-day boundary — exactly 21 days is NOT à revoir (rule is strictly > 21)", () => {
  const lastVisitAt = "2026-01-01T00:00:00.000Z";
  const p = mkProgress({ chaptersVisited: [0, 1, 2], chaptersTotal: 3, itemsAttempted: 0, lastVisitAt });
  const now = new Date("2026-01-22T00:00:00.000Z"); // exactly 21.0 days later
  assert.equal(notionMasteryState(p, now).state, "lu");
});

test("notionMasteryState: 21-day boundary — just over 21 days IS à revoir", () => {
  const lastVisitAt = "2026-01-01T00:00:00.000Z";
  const p = mkProgress({ chaptersVisited: [0, 1, 2], chaptersTotal: 3, itemsAttempted: 0, lastVisitAt });
  const now = new Date("2026-01-22T00:00:01.000Z"); // 21 days + 1 second
  assert.equal(notionMasteryState(p, now).state, "à revoir");
});

test("notionMasteryState: à revoir outranks exercé (staleness is the higher-priority signal)", () => {
  const lastVisitAt = "2026-01-01T00:00:00.000Z";
  const p = mkProgress({
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 3,
    itemsAttempted: 4,
    lastVisitAt,
  });
  const now = new Date("2026-02-01T00:00:00.000Z"); // well past 21 days
  assert.equal(notionMasteryState(p, now).state, "à revoir");
});

test("notionMasteryState: content grew since the stored snapshot → regresses lu to entamé (ledger 14.4)", () => {
  const p = mkProgress({
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 3, // stored snapshot: 3 chapters at last visit
    itemsAttempted: 0,
    lastVisitAt: "2026-01-10T00:00:00.000Z",
  });
  const now = new Date("2026-01-15T00:00:00.000Z");
  const withoutLiveTotal = notionMasteryState(p, now); // no currentChaptersTotal supplied
  assert.equal(withoutLiveTotal.state, "lu");
  const withGrownContent = notionMasteryState(p, now, 5); // content now has 5 chapters
  assert.equal(withGrownContent.state, "entamé");
  assert.equal(withGrownContent.chapterK, 3);
});

// ── (c) computeStudentState — DASHBOARD-SPEC §2 contract ────────────────

test("computeStudentState: empty rows → non-null, empty, honest zero", () => {
  const s = computeStudentState([]);
  assert.deepEqual(s, { lastSession: null, perNotion: {} });
});

test("computeStudentState: one row → perNotion filled and lastSession points to it", () => {
  const p = mkProgress({
    notionId: NOTION,
    chaptersVisited: [2, 0, 1],
    chaptersTotal: 10,
    lastChapterIndex: 2,
    itemsAttempted: 4,
    itemsCorrect: 3,
    lastVisitAt: "2026-01-05T00:00:00.000Z",
  });
  const s = computeStudentState([p]);
  assert.deepEqual(s.perNotion[NOTION], {
    opened: true,
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 10,
    itemsAttempted: 4,
    itemsCorrect: 3,
    lastVisit: "2026-01-05T00:00:00.000Z",
  });
  assert.deepEqual(s.lastSession, { notionId: NOTION, chapterIndex: 2, at: "2026-01-05T00:00:00.000Z" });
});

test("computeStudentState: lastSession picks the row with the MAX last_visit_at", () => {
  const older = mkProgress({ notionId: "pc/rc-charge", lastVisitAt: "2026-01-01T00:00:00.000Z", lastChapterIndex: 1 });
  const newer = mkProgress({ notionId: NOTION, lastVisitAt: "2026-01-10T00:00:00.000Z", lastChapterIndex: 4 });
  const s = computeStudentState([older, newer]);
  assert.equal(s.lastSession.notionId, NOTION);
  assert.equal(s.lastSession.chapterIndex, 4);
});

// ── (d) nextUpRecommendation — LEARNER-MODEL-SPEC §5 priority ladder ────

test("nextUpRecommendation: no data at all → null (caller falls through to parcours)", () => {
  assert.equal(nextUpRecommendation([], [], [], {}, new Date("2026-01-01")), null);
});

test("nextUpRecommendation: predicate 1 (misconception-active) wins even when predicates 2 and 3 also hold", () => {
  const floorMap = { [NOTION]: { [MC]: 3 } };
  const events = [
    mkExhibition(1, "2026-01-01T00:00:00.000Z", 2),
    mkExhibition(2, "2026-01-02T00:00:00.000Z", 3),
  ];
  const states = [mkState({ clearedAt: null, lastExhibitedAt: "2026-01-02T00:00:00.000Z" })];
  // predicate-2 bait: lastSession is entamé (not lu).
  const entameProgress = mkProgress({
    notionId: "pc/rc-charge",
    chaptersVisited: [0],
    chaptersTotal: 5,
    lastVisitAt: "2026-03-01T00:00:00.000Z",
  });
  // predicate-3 bait: an à-revoir notion.
  const revoirProgress = mkProgress({
    notionId: "maths/probabilites-conditionnelles",
    chaptersVisited: [0, 1],
    chaptersTotal: 2,
    itemsAttempted: 0,
    lastVisitAt: "2025-01-01T00:00:00.000Z",
  });
  const now = new Date("2026-03-02T00:00:00.000Z");
  const pick = nextUpRecommendation(events, [entameProgress, revoirProgress], states, floorMap, now);
  assert.equal(pick.source, "misconception-active");
  assert.equal(pick.notionId, NOTION);
  assert.equal(pick.chapterIndex, 3); // most recent exhibition's chapter_index
});

test("nextUpRecommendation: predicate 1 picks the OLDEST last_exhibited_at among several active misconceptions", () => {
  const mcOld = "mc.a";
  const mcNew = "mc.b";
  const floorMap = { [NOTION]: { [mcOld]: 3, [mcNew]: 3 } };
  const events = [
    mkExhibition(1, "2026-01-01T00:00:00.000Z", 1, mcOld),
    mkExhibition(2, "2026-01-02T00:00:00.000Z", 1, mcOld),
    mkExhibition(3, "2026-02-01T00:00:00.000Z", 2, mcNew),
    mkExhibition(4, "2026-02-02T00:00:00.000Z", 2, mcNew),
  ];
  const states = [
    mkState({ misconceptionId: mcOld, clearedAt: null, lastExhibitedAt: "2026-01-02T00:00:00.000Z" }),
    mkState({ misconceptionId: mcNew, clearedAt: null, lastExhibitedAt: "2026-02-02T00:00:00.000Z" }),
  ];
  const pick = nextUpRecommendation(events, [], states, floorMap, new Date("2026-03-01"));
  assert.equal(pick.source, "misconception-active");
  // mcOld is the more mature (older last_exhibited_at) → its notion wins.
  assert.equal(pick.chapterIndex, 1);
});

test("nextUpRecommendation: predicate 2 (reprise) fires when no active misconception and lastSession is entamé", () => {
  const p = mkProgress({
    notionId: NOTION,
    chaptersVisited: [0, 1],
    chaptersTotal: 10,
    lastVisitAt: "2026-01-05T00:00:00.000Z",
  });
  const pick = nextUpRecommendation([], [p], [], {}, new Date("2026-01-06"));
  assert.equal(pick.source, "reprise");
  assert.equal(pick.notionId, NOTION);
  assert.equal(pick.chapterIndex, 2); // max(0,1)+1
  assert.equal(pick.chaptersTotal, 10);
});

test("nextUpRecommendation: predicate 3 (revision) fires when lastSession is NOT entamé but another notion is à revoir", () => {
  const luLastSession = mkProgress({
    notionId: "pc/rc-charge",
    chaptersVisited: [0, 1],
    chaptersTotal: 2,
    itemsAttempted: 0,
    lastVisitAt: "2026-03-01T00:00:00.000Z", // recent → lu, not entamé, not à revoir
  });
  const staleNotion = mkProgress({
    notionId: NOTION,
    chaptersVisited: [0, 1, 2],
    chaptersTotal: 3,
    itemsAttempted: 0,
    lastVisitAt: "2026-01-01T00:00:00.000Z", // stale → à revoir
  });
  const now = new Date("2026-03-02T00:00:00.000Z");
  const pick = nextUpRecommendation([], [luLastSession, staleNotion], [], {}, now);
  assert.equal(pick.source, "revision");
  assert.equal(pick.notionId, NOTION);
  assert.ok(pick.daysSinceVisit >= 60);
});

test("nextUpRecommendation: predicate 3 picks the OLDEST last_visit_at among several à-revoir notions", () => {
  const older = mkProgress({
    notionId: NOTION,
    chaptersVisited: [0],
    chaptersTotal: 1,
    lastVisitAt: "2025-06-01T00:00:00.000Z",
  });
  const newer = mkProgress({
    notionId: "pc/rc-charge",
    chaptersVisited: [0],
    chaptersTotal: 1,
    lastVisitAt: "2025-12-01T00:00:00.000Z",
  });
  const now = new Date("2026-03-01T00:00:00.000Z");
  const pick = nextUpRecommendation([], [older, newer], [], {}, now);
  assert.equal(pick.source, "revision");
  assert.equal(pick.notionId, NOTION);
});
