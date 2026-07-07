/**
 * student-state.ts — the StudentState CONTRACT (DASHBOARD-SPEC §2).
 *
 * This file is the shape the dashboard renders against once real per-user
 * persistence exists (production lane, human-gated — AUTH-SPEC §4 gate,
 * HANDOFF §0.4/§0.5; schema drafts live at docs/drafts/migrations/048-049,
 * LEARNER-MODEL-SPEC §2). Nothing here touches a live project.
 *
 * `getStudentState()` returns `null` today, on purpose:
 *  - there is no browser-storage substitute (the artifacts rule — no
 *    localStorage/sessionStorage/cookies standing in for real learning
 *    state, unlike the filière DEVICE PREFERENCE in useFiliere.ts, which is
 *    a real choice, not fabricated progress);
 *  - there is no fabricated progress (honest-state — absolute here, per
 *    DASHBOARD-SPEC's own framing: a dashboard is exactly the place fake
 *    progress would be tempting, and exactly the place it is banned).
 *
 * Every dashboard component MUST render truthfully from a `null`
 * StudentState — that degraded render is DASHBOARD-SPEC §3's specified
 * zero-state (a calm table of contents, honest fact-lines, an absent
 * milestone slot), not an invented interim design.
 */

export type StudentState = {
  lastSession: { notionId: string; chapterIndex: number; at: string } | null;
  perNotion: Record<
    string,
    {
      opened: boolean;
      /** Real visited chapter indices — never a fabricated/interpolated set. */
      chaptersVisited: number[];
      chaptersTotal: number;
      /** Real attempts — never a "views" count standing in for attempts. */
      itemsAttempted: number;
      itemsCorrect: number;
      /** ISO timestamp. */
      lastVisit: string;
    }
  >;
};

/**
 * Returns `null` until persistence lands (AUTH-SPEC §4 gate). The dashboard
 * MUST render truthfully from `null` — DASHBOARD-SPEC §3's degraded render,
 * never a fabricated interim state.
 */
export function getStudentState(): StudentState | null {
  return null;
}
