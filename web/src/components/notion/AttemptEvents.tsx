"use client";

/**
 * AttemptEvents — the notion-level wiring that lets the answer components
 * emit attempt events (LEARNER-MODEL-SPEC / draft-048 write path).
 *
 * Three pieces:
 *   - `AttemptEventProvider` — mounted once per notion (NotionPageView,
 *     inside ChapterShell) carrying the notion id (`"<subject>/<slug>"`,
 *     the learner-model-data.json key format).
 *   - `useAttemptRecorder()` — consumed by McqItem / CheckpointItem /
 *     AttemptFirstExercise. Combines the notion id with the active chapter
 *     (useChapter) and returns fire-and-forget recorders built on the ONE
 *     shared payload builder (lib/events/payload.ts). FAIL-SAFE: outside
 *     the provider (options galleries, previews) every recorder is an
 *     inert no-op — same philosophy as useChapter()'s fallback: never
 *     throw, never fabricate.
 *   - `ChapterVisitRecorder` — a render-nothing effect component that
 *     emits one `record_chapter_visit` per chapter ACTIVATION (including
 *     the initial one), deduplicated per index for the page's lifetime.
 *
 * DEEP-LINK GUARD: ChapterShell mounts at chapter 0 and applies the
 * URL/hash-derived chapter in a one-time post-hydration layout effect
 * (SSR-mismatch fix — see ChapterShell.tsx). A passive effect scheduled on
 * the FIRST commit can therefore observe the pre-sync `current = 0` on a
 * `?chapitre=N` deep link — emitting a phantom chapter-0 visit that would
 * silently inflate the progress fold ("entamé"/"lu" derive from distinct
 * visited chapters). The recorder guards its first run with the SAME
 * URL-resolution helper the shell uses (`readChapterFromLocation`): if the
 * URL names a different chapter than `current`, the first emit is skipped
 * and the post-sync re-run emits the real one.
 *
 * CALM-CORE: nothing here renders, blocks, or awaits. The emitter itself
 * is hard-gated (no-op unless AUTH_MODE=live + a real session token) and
 * swallows every failure — see lib/events/emitter.ts. In today's default
 * `off` build this whole file is behaviorally inert.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useChapter, readChapterFromLocation } from "./ChapterShell";
import { recordAnswerEvent, recordChapterVisit } from "@/lib/events";
import {
  answerPayload,
  exerciseRevealPayload,
  type AuthoredChoice,
} from "@/lib/events/payload";

const NotionIdContext = createContext<string | null>(null);

export function AttemptEventProvider({
  notionId,
  children,
}: {
  /** `"<subject>/<slug>"` — must match the generated-map key format. */
  notionId: string;
  children: ReactNode;
}) {
  return (
    <NotionIdContext.Provider value={notionId}>
      {children}
    </NotionIdContext.Provider>
  );
}

export interface AttemptRecorder {
  /** MCQ item answered (items.yaml end-bank / chapter questions). */
  recordItemAnswer: (
    itemId: string,
    authoredChoices: readonly AuthoredChoice[] | undefined,
    chosenChoiceId: string
  ) => void;
  /** Inline checkpoint answered (checkpoints.yaml). */
  recordCheckpointAnswer: (
    itemId: string,
    authoredChoices: readonly AuthoredChoice[] | undefined,
    chosenChoiceId: string
  ) => void;
  /** Exercise-question reveal committed (« J'ai fait ma tentative »). */
  recordExerciseReveal: (exerciseId: string, questionId: string) => void;
}

const NOOP_RECORDER: AttemptRecorder = {
  recordItemAnswer: () => {},
  recordCheckpointAnswer: () => {},
  recordExerciseReveal: () => {},
};

export function useAttemptRecorder(): AttemptRecorder {
  const notionId = useContext(NotionIdContext);
  const { current } = useChapter();

  return useMemo(() => {
    if (!notionId) return NOOP_RECORDER;

    const answer = (
      kind: "item" | "checkpoint",
      itemId: string,
      authoredChoices: readonly AuthoredChoice[] | undefined,
      chosenChoiceId: string
    ) => {
      const payload = answerPayload({
        notionId,
        itemId,
        kind,
        authoredChoices,
        chosenChoiceId,
        chapterIndex: current,
      });
      if (payload) recordAnswerEvent(payload);
    };

    return {
      recordItemAnswer: (itemId, authoredChoices, chosenChoiceId) =>
        answer("item", itemId, authoredChoices, chosenChoiceId),
      recordCheckpointAnswer: (itemId, authoredChoices, chosenChoiceId) =>
        answer("checkpoint", itemId, authoredChoices, chosenChoiceId),
      recordExerciseReveal: (exerciseId, questionId) =>
        recordAnswerEvent(
          exerciseRevealPayload({
            notionId,
            exerciseId,
            questionId,
            chapterIndex: current,
          })
        ),
    };
  }, [notionId, current]);
}

/**
 * Render-nothing effect component: one visit event per chapter activation.
 * Mounted once, inside BOTH the provider and the ChapterShell.
 */
export function ChapterVisitRecorder() {
  const notionId = useContext(NotionIdContext);
  const { current, total } = useChapter();
  const firstRunRef = useRef(true);
  // Per-index dedupe for the page's lifetime: popstate/goTo round-trips to
  // an already-visited chapter don't re-emit (the fold's distinct-chapter
  // semantics wouldn't change, but there is no reason to send the bytes).
  const sentRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (!notionId) return;
    if (firstRunRef.current) {
      firstRunRef.current = false;
      // Deep-link guard — see the file doc comment.
      if (readChapterFromLocation(total) !== current) return;
    }
    if (sentRef.current.has(current)) return;
    sentRef.current.add(current);
    recordChapterVisit({
      notion_id: notionId,
      chapter_index: current,
      chapters_total: total,
    });
  }, [notionId, current, total]);

  return null;
}
