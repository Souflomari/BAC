/**
 * lib/events/emitter.ts — the client-side attempt-event emitter.
 *
 * HONEST-STATE RULE (non-negotiable for this file): this module never
 * fabricates state and never locally persists it. No `localStorage`, no
 * `sessionStorage`, no cookies, no in-memory cache that survives a reload —
 * an event either reaches the edge function (`record-notion-event`) or it is
 * silently dropped. The only "memory" this file keeps is a tiny bounded
 * retry queue for the CURRENT page's lifetime, cleared on reload like
 * everything else here. State belongs to the real data layer
 * (`user_answer_events` / `user_notion_progress`, draft-048/049) — never to
 * the browser.
 *
 * Hard no-op unless BOTH are true:
 *   1. `process.env.NEXT_PUBLIC_AUTH_MODE === "live"`
 *   2. `configureEmitter({ getAccessToken })` has been called AND the
 *      accessor resolves to a truthy token.
 * Until both hold, every exported function below is a silent no-op. This
 * keeps the "off"/"mock" builds byte-identical to today's app (AUTH-SPEC §5)
 * and keeps the emitter inert during SSR / prerender (no `fetch` fires).
 *
 * `configureEmitter` is called ONCE by the auth provider (a later wiring
 * step — not this file's concern). This module never imports `@supabase/*`
 * and never reaches for a session itself; it only ever asks the accessor it
 * was given.
 *
 * Never disturbs the learning session: every failure mode here (missing
 * config, network error, non-2xx response, malformed accessor) is swallowed
 * silently. This file must never throw into caller code and must never
 * block the UI thread — every send is fire-and-forget.
 */

/** Mirrors user_answer_events.kind (draft-048) exactly. */
export type AnswerEventKind = "item" | "checkpoint" | "exercise_reveal";

/**
 * Wire payload for one answer/checkpoint/exercise-reveal event. Field names
 * mirror the `record_answer_event` RPC params (draft-048) minus the `p_`
 * prefix and minus `user_id` (JWT-derived server-side, never client-sent).
 *
 * `item_misconceptions` is EXTRA context beyond the RPC's own columns: the
 * set of misconception ids this item targets (from the content's
 * items.yaml, precomputed by scripts/build-learner-inputs.mjs). The edge
 * function uses it only when `is_correct === true`, to run the clearing
 * check (LEARNER-MODEL-SPEC §3) — it is never written to a column itself.
 */
export interface AnswerEventPayload {
  notion_id: string;
  item_id: string;
  kind: AnswerEventKind;
  choice_index: number | null;
  is_correct: boolean | null;
  misconception_id: string | null;
  chapter_index: number | null;
  item_misconceptions: string[];
}

/** Wire payload for a chapter-visit event (record_chapter_visit, draft-048). */
export interface ChapterVisitPayload {
  notion_id: string;
  chapter_index: number;
  chapters_total: number;
}

/**
 * Returns the current access token, or a falsy value if there is no
 * session. May be sync or async — the emitter awaits either shape. Thrown
 * errors are swallowed (treated as "no token").
 */
export type AccessTokenGetter = () =>
  | string
  | null
  | undefined
  | Promise<string | null | undefined>;

export interface EmitterConfig {
  getAccessToken: AccessTokenGetter;
}

type EventBody =
  | ({ action: "answer" } & AnswerEventPayload)
  | ({ action: "visit" } & ChapterVisitPayload);

// ── Configuration (set once by the auth provider) ──────────────────────────

let tokenGetter: AccessTokenGetter | null = null;

/**
 * Wires the emitter to a session accessor. Until this is called, every
 * exported record* function is a no-op — there is no implicit fallback to a
 * global Supabase client (this module never imports `@supabase/*`).
 */
export function configureEmitter(config: EmitterConfig): void {
  tokenGetter = config.getAccessToken;
}

// ── Transport ────────────────────────────────────────────────────────────

const MAX_RETRY_QUEUE = 20;
const RETRY_DELAY_MS = 4000;

interface QueuedSend {
  body: EventBody;
  token: string;
}

// Page-lifetime only — never persisted, cleared implicitly on reload.
let retryQueue: QueuedSend[] = [];
let retryTimer: ReturnType<typeof setTimeout> | null = null;

function isLive(): boolean {
  return process.env.NEXT_PUBLIC_AUTH_MODE === "live";
}

function endpointUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base}/functions/v1/record-notion-event`;
}

async function rawSend(url: string, token: string, body: EventBody): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      // Lets the request complete even if the page is being unloaded/
      // navigated away from — this is a fire-and-forget diagnostic write,
      // not something the student should ever wait on.
      keepalive: true,
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Bounded, one-shot retry: queues at most MAX_RETRY_QUEUE entries; once a
 *  queued entry is retried (success or failure), it is never retried again.
 *  When the queue is full, new failures are dropped silently rather than
 *  growing unbounded — this file must never become a memory leak. */
function scheduleRetry(entry: QueuedSend): void {
  if (retryQueue.length >= MAX_RETRY_QUEUE) return;
  retryQueue.push(entry);
  if (retryTimer === null) {
    retryTimer = setTimeout(flushRetryQueue, RETRY_DELAY_MS);
  }
}

function flushRetryQueue(): void {
  retryTimer = null;
  const url = endpointUrl();
  const batch = retryQueue;
  retryQueue = [];
  if (!url) return; // config vanished between schedule and flush — drop silently
  for (const entry of batch) {
    // The ONE retry. Whatever happens here (ok or not), never re-enqueue.
    void rawSend(url, entry.token, entry.body);
  }
}

function dispatch(body: EventBody, token: string): void {
  const url = endpointUrl();
  if (!url) return;
  void rawSend(url, token, body).then((ok) => {
    if (!ok) scheduleRetry({ body, token });
  });
}

async function emit(body: EventBody): Promise<void> {
  if (!isLive()) return; // hard no-op outside live mode
  if (!tokenGetter) return; // not configured yet — no-op, never throws

  let token: string | null | undefined;
  try {
    token = await tokenGetter();
  } catch {
    return; // never disturb the learning session
  }
  if (!token) return;

  try {
    dispatch(body, token);
  } catch {
    // Swallow — this module must never throw into caller code.
  }
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Fire-and-forget: records one answer/checkpoint/exercise-reveal event.
 * No-op unless live mode + a configured session with a token. Never throws,
 * never returns anything the caller needs to await.
 */
export function recordAnswerEvent(e: AnswerEventPayload): void {
  void emit({ action: "answer", ...e });
}

/**
 * Fire-and-forget: records a chapter-visit event.
 * No-op unless live mode + a configured session with a token. Never throws,
 * never returns anything the caller needs to await.
 */
export function recordChapterVisit(v: ChapterVisitPayload): void {
  void emit({ action: "visit", ...v });
}
