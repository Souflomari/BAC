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
      {/* Refonte Studio (R6 avancé) : la carte devient TEXTE D'ABORD. Le
          panneau Cover de droite est parti — 5 motifs partagés par 61
          notions, « la feuille seule occupait la moitié de la carte pour un
          contenu quasi nul » (audit Fable §3.2). Le repérage passe par la
          couleur de matière (chip), l'espace récupéré va au contenu. */}
      <div
        className={cn(
          "rounded-xl border border-subtle bg-surface-raised",
          "px-6 py-7 bp-medium:px-8 bp-medium:py-8",
          "shadow-elevation-1"
        )}
      >
        {/* Audit R6 (charge-calme P1-3/P1-7) : \u00ab COMMENCE ICI \u00bb doublait le
            bouton qu'il annon\u00e7ait (\u00a711, \u00e9tiquettes doubl\u00e9es) et le libell\u00e9
            long en capitales track\u00e9es mangeait la carte \u00e0 390 px. La chip
            courte est le SEUL marqueur \u2014 le fond teint\u00e9 marque d\u00e9j\u00e0, le
            point int\u00e9rieur \u00e9tait un troisi\u00e8me encodage. */}
        <p className="flex flex-wrap items-center gap-2 text-caption font-medium uppercase tracking-eyebrow text-secondary">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1"
            style={{
              background: `var(--subject-${notion.subject}-subtle)`,
              color: `var(--subject-${notion.subject})`,
            }}
            title={subjectLabel(notion.subject)}
          >
            {subjectLabelCourt(notion.subject)}
          </span>
        </p>
        <h2 className="mt-3 max-w-lead font-display text-h1 font-bold text-primary">
          {notion.title}
        </h2>
        <p className="mt-2 max-w-lead text-body-lg text-secondary">
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
            className="mt-5 h-1 max-w-lead rounded-full bg-border-subtle"
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
    </section>
  );
}
