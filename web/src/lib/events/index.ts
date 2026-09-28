/**
 * lib/events/index.ts — public surface of the attempt-event emitter.
 *
 * See emitter.ts for the full contract (honest-state rule, the three-mode
 * gating, the bounded retry queue). This file only re-exports; it adds no
 * behavior of its own.
 *
 * Wiring `configureEmitter` into the auth provider, and calling
 * `recordAnswerEvent` / `recordChapterVisit` from lesson/item components,
 * are later steps owned elsewhere — this module is the stable import point
 * for both.
 */
export {
  configureEmitter,
  recordAnswerEvent,
  recordChapterVisit,
} from "./emitter";

export type {
  AccessTokenGetter,
  AnswerEventKind,
  AnswerEventPayload,
  ChapterVisitPayload,
  EmitterConfig,
} from "./emitter";
