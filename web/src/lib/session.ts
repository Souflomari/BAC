/**
 * session.ts — the home session element's data contract (Day-4 freeze,
 * Set B = B1 "session-first", FABLE-DECIDED / OWNER-REVIEW-PENDING).
 *
 * THE HONEST-STATE RULE (owner directive, Day 4): the home surface never
 * fabricates progress. No invented "en cours", no fake resume position, no
 * mock history — the truthful first-visit state IS the design until real
 * per-student state exists.
 *
 * The contract is written for its future: when persistence lands (per-user
 * state is production-lane, human-gated — RULES §0/§3), `getTodaySession()`
 * starts returning `resume` states from real data and the home UI changes
 * ZERO markup — it already branches on `kind`.
 *
 *   start  — nothing in progress; suggest where to begin (deterministic:
 *            the most recently updated notion — a real, checkable fact).
 *   resume — REQUIRES persisted student state. Never constructed today.
 *
 * Server-side only (reads the content tree via listNotions).
 */

import { listNotions, type NotionMeta } from "@/lib/content";

export type SessionState =
  | {
      kind: "start";
      notion: NotionMeta;
      /** Why this notion — honest, stated to the student. */
      reason: string;
    }
  | {
      kind: "resume";
      notion: NotionMeta;
      /** Human position label, e.g. « Les trois régimes ». From real state only. */
      position: string;
      step: number;
      totalSteps: number;
    };

export function getTodaySession(): SessionState | null {
  const notions = listNotions();
  if (notions.length === 0) return null;

  // Deterministic, honest suggestion: the most recently updated notion.
  const [latest] = [...notions].sort(
    (a, b) => (b.updatedAtMs ?? 0) - (a.updatedAtMs ?? 0)
  );

  return {
    kind: "start",
    notion: latest,
    reason: "La notion la plus récente — on la prend depuis le début.",
  };
}
