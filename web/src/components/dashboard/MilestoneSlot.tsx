/**
 * MilestoneSlot — the earned-milestone slot (DASHBOARD-SPEC §1.6).
 *
 * Specified, EMPTY at launch: a place where a REAL, rare milestone (a first
 * lesson finished, a first exercise chapter passed) could someday render
 * calmly — never streaks, never XP, never badges ("progress-made-vivid",
 * engagement at the edges only — bible §8).
 *
 * The slot renders `null` — absent from the DOM entirely, not a hidden or
 * greyed placeholder — until a real milestone is both DEFINED and EARNED
 * (the AttemptFirst motif: nothing prints until something real has
 * happened). No milestone rule is defined yet anywhere in the read layer
 * (`student-state.ts` / `learner-model.ts`) — whether or not a live
 * `StudentState` exists, there is nothing to earn: this always returns
 * `null` today.
 */

export function MilestoneSlot() {
  return null;
}
