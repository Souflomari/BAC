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

import { Link } from "@/components/ui/Lien";
import { sessionFromState } from "@/lib/session";
import { useStudentState } from "@/lib/student-state";
import { subjectLabel, subjectLabelCourt, notionHref } from "@/lib/subjects";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { NotionMeta } from "@/lib/content";

export function SessionCard({ notions }: { notions: NotionMeta[] }) {
  const { state } = useStudentState();
  const session = sessionFromState(notions, state);
  if (!session) return null;

  const { notion } = session;

  return (
    <section aria-label="La session du jour">
      {/* GRILLE (refonte 2026-10) : la seule action primaire de la page est
          encadrée d'un filet noir de 2 px — un cadre d'affiche, pas une carte
          (ni ombre ni coins arrondis). Contrat inchangé : p-8 tout autour au
          bureau (dom-truth), un seul [data-primary-action], aucune
          progression sans état réel. */}
      <div className="border-2 border-accent bg-surface-raised p-6 bp-medium:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-caption font-semibold uppercase tracking-eyebrow text-secondary">
          <p className="flex flex-wrap items-baseline gap-x-3">
            <span className="text-primary" title={subjectLabel(notion.subject)}>
              {subjectLabelCourt(notion.subject)}
            </span>
            <span aria-hidden>·</span>
            <span>Leçon</span>
          </p>
          {notion.readingMinutes ? (
            <p className="tnum normal-case tracking-normal text-body-sm font-normal text-tertiary">
              ≈ {notion.readingMinutes} min de lecture
            </p>
          ) : null}
        </div>
        <h2 className="mt-3 max-w-[24ch] font-display text-h1 font-bold text-primary">
          {notion.title}
        </h2>
        <p className="mt-3 max-w-lead text-body-lg text-secondary">
          {session.kind === "start" ? (
            <>Nouvelle notion — on la prend depuis le début.</>
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
            className="mt-5 h-1 max-w-lead bg-border-subtle"
            role="progressbar"
            aria-valuenow={Math.round((session.step / session.totalSteps) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progression dans la notion"
          >
            <div
              className="h-1 bg-signal"
              style={{ width: `${(session.step / session.totalSteps) * 100}%` }}
            />
          </div>
        )}

        <Link
          href={notionHref(notion.subject, notion.slug)}
          data-primary-action=""
          className={cn("mt-7 btn-primary rounded-none focus-ring")}
        >
          {session.kind === "start" ? "Commencer la session" : "Reprendre la session"}
          <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </section>
  );
}
