"use client";

/**
 * student-state.ts — the StudentState CONTRACT (DASHBOARD-SPEC §2) and its
 * live read layer (LEARNER-MODEL-SPEC.md).
 *
 * The `StudentState` TYPE is UNCHANGED — still exactly DASHBOARD-SPEC §2's
 * contract (`lastSession` + `perNotion`), the shape every dashboard
 * component has always rendered against. What changes in this file is HOW a
 * `StudentState` instance gets filled: `useStudentState()` — a hook, because
 * filling it now means a real network read (RLS SELECT-self against the
 * three draft-048/049 tables, through the BROWSER Supabase client — same
 * lazy, dynamic-`import()`-only discipline as `auth/provider.tsx`'s
 * `loadSupabase`), which is asynchronous and gated on a live authenticated
 * session (AUTH-SPEC §5).
 *
 * `useStudentState()` resolves `state: null` (and `nextUp: null`,
 * `loading: false`) in every case that is NOT "AUTH_MODE === 'live' AND a
 * real session exists":
 *  - AUTH_MODE "off"/"mock" — `@supabase/*` is NEVER imported in these
 *    builds (AUTH-SPEC §2's zero-byte rule): this module's dynamic
 *    `import("@/lib/auth/supabase-client")` call site is reached ONLY from
 *    inside the `mode === "live"` branch of the effect below.
 *  - "live" with no session — the honest signed-out state.
 *  - "live" with a session but a read error — degrades to the same `null`
 *    rather than throwing into a render (logged, not surfaced as UI).
 *
 * A "live" session with an EMPTY read (a brand-new student, zero rows in
 * all three tables) is a REAL, different answer from "we haven't asked yet"
 * — `computeStudentState([])` (learner-model.ts) returns the non-null
 * `{ lastSession: null, perNotion: {} }`. Every current consumer's lookup
 * (`state?.perNotion[id]`, `state?.lastSession`) reads identically for both
 * `null` and that empty object, so this distinction changes nothing visible
 * today — it exists so a future caller can tell "no session" from "session,
 * nothing yet" without re-deriving it.
 *
 * Still NO browser-storage substitute here (no localStorage/sessionStorage/
 * cookies as a state crutch) — the three tables ARE the real data layer this
 * file was always documented to wait for; Supabase's own httpOnly session
 * cookie (written by `@supabase/ssr`, read only inside `supabase-client.ts`)
 * is the only "storage" anywhere in this path, exactly as in
 * `auth/provider.tsx`.
 */

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/provider";
import floorMapData from "@/lib/learner-model-data.json";
import {
  computeStudentState,
  nextUpRecommendation,
  type AnswerEvent,
  type AnswerEventKind,
  type FloorMap,
  type MisconceptionState,
  type NextUpPick,
  type NotionProgress,
} from "@/lib/learner-model";

const floorMap = floorMapData as FloorMap;

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

// ── DB row → learner-model input shape (snake_case → camelCase only) ───────

function rowToAnswerEvent(row: Record<string, unknown>): AnswerEvent {
  return {
    id: row.id as number,
    userId: row.user_id as string,
    notionId: row.notion_id as string,
    itemId: row.item_id as string,
    kind: row.kind as AnswerEventKind,
    choiceIndex: (row.choice_index as number | null) ?? null,
    isCorrect: (row.is_correct as boolean | null) ?? null,
    misconceptionId: (row.misconception_id as string | null) ?? null,
    chapterIndex: (row.chapter_index as number | null) ?? null,
    createdAt: row.created_at as string,
  };
}

function rowToNotionProgress(row: Record<string, unknown>): NotionProgress {
  const visited = row.chapters_visited;
  return {
    userId: row.user_id as string,
    notionId: row.notion_id as string,
    chaptersVisited: Array.isArray(visited) ? (visited as number[]) : [],
    chaptersTotal: (row.chapters_total as number | null) ?? null,
    lastChapterIndex: (row.last_chapter_index as number | null) ?? null,
    itemsAttempted: (row.items_attempted as number | null) ?? 0,
    itemsCorrect: (row.items_correct as number | null) ?? 0,
    firstVisitAt: row.first_visit_at as string,
    lastVisitAt: row.last_visit_at as string,
  };
}

function rowToMisconceptionState(row: Record<string, unknown>): MisconceptionState {
  return {
    userId: row.user_id as string,
    notionId: row.notion_id as string,
    misconceptionId: row.misconception_id as string,
    exhibitedCount: (row.exhibited_count as number | null) ?? 0,
    firstExhibitedAt: (row.first_exhibited_at as string | null) ?? null,
    lastExhibitedAt: (row.last_exhibited_at as string | null) ?? null,
    remediationAttempts: (row.remediation_attempts as number | null) ?? 0,
    clearedAt: (row.cleared_at as string | null) ?? null,
  };
}

// ── The hook ────────────────────────────────────────────────────────────

interface LearnerModelSnapshot {
  state: StudentState | null;
  /** Predicates 1-3 of the NextUp ladder (LEARNER-MODEL-SPEC §5) — `null`
   *  means "none of 1-3 fired", which is NextUp.tsx's own cue to fall
   *  through to its predicate-4 (`parcours`) logic. Bundled into this same
   *  hook (rather than a second one) so the three tables are read ONCE per
   *  mount, not fetched twice by two independent hooks. */
  nextUp: NextUpPick | null;
  loading: boolean;
}

const EMPTY_SNAPSHOT: LearnerModelSnapshot = { state: null, nextUp: null, loading: false };

/**
 * useStudentState — the ONE hook every dashboard surface reads live learner
 * state through. Must be called from a Client Component (this module is
 * "use client").
 *
 * First render (and every render in "off"/"mock", or "live" signed-out)
 * always yields `EMPTY_SNAPSHOT` — the exact same value SSR would have
 * produced — so there is no hydration mismatch; a "live" session's real
 * data replaces it asynchronously after mount, same pattern as
 * `auth/provider.tsx`'s own session hydration and `useFiliere`'s
 * `mounted` gate.
 */
export function useStudentState(): LearnerModelSnapshot {
  const { mode, user } = useAuth();
  const [snapshot, setSnapshot] = useState<LearnerModelSnapshot>(EMPTY_SNAPSHOT);

  useEffect(() => {
    if (mode !== "live" || !user) {
      setSnapshot(EMPTY_SNAPSHOT);
      return;
    }

    let cancelled = false;
    setSnapshot((s) => ({ ...s, loading: true }));

    import("@/lib/auth/supabase-client")
      .then(async ({ getBrowserSupabase }) => {
        if (cancelled) return;
        const supabase = getBrowserSupabase();
        const userId = user.id;

        const [eventsRes, progressRes, statesRes] = await Promise.all([
          supabase.from("user_answer_events").select("*").eq("user_id", userId),
          supabase.from("user_notion_progress").select("*").eq("user_id", userId),
          supabase.from("user_notion_misconception_states").select("*").eq("user_id", userId),
        ]);
        if (cancelled) return;

        const readError = eventsRes.error ?? progressRes.error ?? statesRes.error;
        if (readError) {
          console.error("[student-state] échec de lecture (RLS self-read) :", readError);
          setSnapshot(EMPTY_SNAPSHOT);
          return;
        }

        const events = (eventsRes.data ?? []).map(rowToAnswerEvent);
        const progress = (progressRes.data ?? []).map(rowToNotionProgress);
        const states = (statesRes.data ?? []).map(rowToMisconceptionState);

        const state = computeStudentState(progress);
        const nextUp = nextUpRecommendation(events, progress, states, floorMap, new Date());

        setSnapshot({ state, nextUp, loading: false });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error("[student-state] échec du chargement live :", err);
        setSnapshot(EMPTY_SNAPSHOT);
      });

    return () => {
      cancelled = true;
    };
  }, [mode, user]);

  return snapshot;
}
