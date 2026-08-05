/**
 * SessionCard — the ONE primary element of the dashboard (DASHBOARD-SPEC §1.1).
 *
 * Extracted from the original home page.tsx (Day-4 B1 "session-first"; the
 * markup/classes below are UNCHANGED from that build, and unchanged again by
 * this session's read-layer work — DASHBOARD-SPEC §6 moved it to its own
 * file without restyling it, and this pass only changes WHERE `session`
 * comes from, never the JSX it produces from one.
 *
 * Now a Client Component: `useStudentState()` (student-state.ts) is the live
 * read layer, and `sessionFromState` (session.ts, pure) turns its
 * `StudentState | null` into the same `SessionState` shape this component
 * has always branched on. `notions` is now a prop (computed server-side in
 * page.tsx, same as every other dashboard component already receives it) —
 * session.ts itself no longer reads the content tree, so this file stays a
 * valid Client Component (importing `@/lib/content` for its `fs` read would
 * not be). In "off"/"mock" builds, and on every signed-out/loading render in
 * "live", `state` is `null` and `sessionFromState` degrades to EXACTLY the
 * old (pre-read-layer) "start" behavior — byte-identical output.
 *
 * The one wording change (already shipped, unrelated to this pass): the
 * zero-state ("start") caption reads « Commence ici » instead of the resume
 * framing's « Aujourd'hui » — DASHBOARD-SPEC §3's exact wording for the
 * first-visit degraded render. Carries the page's ONE `[data-primary-action]`
 * (DASHBOARD-SPEC §5).
 */

"use client";

import Link from "next/link";
import { sessionFromState } from "@/lib/session";
import { useStudentState } from "@/lib/student-state";
import { subjectLabel, notionHref } from "@/lib/subjects";
import { Icon } from "@/components/ui/Icon";
import { Cover } from "@/components/covers/Cover";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

export function SessionCard({ notions }: { notions: NotionMeta[] }) {
  const { state } = useStudentState();
  const session = sessionFromState(notions, state);
  if (!session) return null;

  const { notion } = session;

  return (
    <section aria-label="La session du jour" className="max-w-list">
      <div
        className={cn(
          "rounded-xl overflow-hidden",
          "bg-surface-container-high shadow-elevation-2",
          "bp-medium:grid bp-medium:grid-cols-[1fr_240px]"
        )}
      >
        <div className="px-8 py-8">
          <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
            {session.kind === "start" ? "Commence ici" : "Aujourd’hui"} ·{" "}
            {subjectLabel(notion.subject)}
          </p>
          <h2 className="mt-2 font-serif text-h2 font-bold text-primary">
            {notion.title}
          </h2>
          <p className="mt-2 text-body text-secondary">
            {session.kind === "start" ? (
              <>
                Nouvelle notion — on la prend depuis le début
                {notion.readingMinutes ? ` (≈ ${notion.readingMinutes} min de lecture)` : ""}.
              </>
            ) : (
              <>
                Reprise à « {session.position} » — section {session.step} sur{" "}
                {session.totalSteps}.
              </>
            )}
          </p>

          {/* Progress renders ONLY from real resume state — never fabricated. */}
          {session.kind === "resume" && (
            <div
              className="mt-5 h-1 rounded-full bg-border-subtle"
              role="progressbar"
              aria-valuenow={Math.round((session.step / session.totalSteps) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progression dans la notion"
            >
              <div
                className="h-1 rounded-full bg-accent"
                style={{ width: `${(session.step / session.totalSteps) * 100}%` }}
              />
            </div>
          )}

          <Link
            href={notionHref(notion.subject, notion.slug)}
            data-primary-action=""
            className={cn("mt-6 btn-primary focus-ring")}
          >
            {session.kind === "start" ? "Commencer la session" : "Reprendre la session"}
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        <div className="hidden bp-medium:block relative">
          <Cover
            subject={notion.subject}
            slug={notion.slug}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
