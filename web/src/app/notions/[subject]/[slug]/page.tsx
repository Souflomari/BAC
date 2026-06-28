/**
 * Notion page — /notions/[subject]/[slug]
 *
 * URL maps directly to the content directory structure:
 *   /notions/pc/rlc-serie
 *   → content/pc/rlc-serie/
 *
 * Renders one notion: lesson (markdown + live KaTeX), inline SVG diagrams,
 * animated SVG diagrams, inline checkpoints, the interactive embed, and the
 * MCQ items section.
 *
 * Layout (DESIGN-BIBLE §4 — calm, symmetric):
 *   - Outer band: max-w-notion (~1140px), centered, generous horizontal padding.
 *   - Left margin rail (56px): sticky rung list (R0–R7…) with scroll-spy.
 *     Desktop only (≥900px); quiet/muted, keyboard-focusable.
 *   - Right content column: prose centered at ~65ch within the column;
 *     figures/motion/embeds/checkpoints break out to the full content column.
 *   - On narrow screens: collapses to single column, rail disappears.
 *
 * Fixes applied (#4, #5, #9):
 *   - Prose centered (not left-anchored) within the content column.
 *   - MarginRail is a real sticky rung list with scroll-spy (not a hollow label).
 *   - Checkpoint clones filtered from end bank via buildCheckpointCloneIds.
 *
 * Server component: all file I/O and markdown parsing happens on the server.
 * Interactive parts (EmbedPanel, CheckpointItem, MotionDiagram, MarginRail)
 * are client components hydrated in the browser.
 *
 * DESIGN-BIBLE §0: no engagement theater.
 * DESIGN-BIBLE §7: one primary thing per screen.
 * DESIGN-BIBLE §9: keyboard, focus, contrast, reduced-motion, touch targets.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadNotion, listNotions } from "@/lib/content";
import { PageShell } from "@/components/ui/PageShell";
import { NotionBody } from "@/components/notion/NotionBody";
import { ItemsSection, buildCheckpointCloneIds } from "@/components/notion/ItemsSection";
import { MarginRail } from "@/components/notion/MarginRail";
import { cn } from "@/lib/utils";

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  const notions = listNotions();
  return notions.map((n) => ({
    subject: n.subject,
    slug: n.slug,
  }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { subject: string; slug: string };
}): Promise<Metadata> {
  const id = `${params.subject}/${params.slug}`;
  const notion = loadNotion(id);
  if (!notion) return { title: "Notion introuvable" };
  return { title: notion.meta.title };
}

// ── Subject display labels ────────────────────────────────────────────────────
const SUBJECT_LABELS: Record<string, string> = {
  maths: "Mathématiques",
  pc:    "Physique-Chimie",
  svt:   "Sciences de la Vie et de la Terre",
};

function subjectLabel(s: string): string {
  return SUBJECT_LABELS[s] ?? s;
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({
  subject,
  title,
}: {
  subject: string;
  title: string;
}) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className="mb-8 flex items-center gap-2 flex-wrap text-body-sm text-[var(--color-text-tertiary)]"
    >
      <a
        href="/"
        className={cn(
          "hover:text-[var(--color-text-secondary)]",
          "transition-colors duration-[150ms]",
          // Focus ring — migrated to .focus-ring utility
          "rounded focus-ring"
        )}
      >
        Notions
      </a>
      <span aria-hidden="true">›</span>
      <span className="text-[var(--color-text-tertiary)]">
        {subjectLabel(subject)}
      </span>
      <span aria-hidden="true">›</span>
      <span
        className="text-[var(--color-text-secondary)] font-medium truncate max-w-[28ch]"
        aria-current="page"
      >
        {title}
      </span>
    </nav>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NotionPage({
  params,
}: {
  params: { subject: string; slug: string };
}) {
  const id = `${params.subject}/${params.slug}`;
  const notion = loadNotion(id);

  if (!notion) {
    notFound();
  }

  const {
    meta,
    lessonMd,
    itemsData,
    checkpoints,
    mediaSvgs,
    motionSvgs,
    motionSpecs,
    mediaEmbeds,
  } = notion;

  // Build the set of end-bank item ids that are cloned as inline checkpoints.
  // These are filtered out of the end bank to prevent duplicate questions (#9).
  const checkpointCloneIds = buildCheckpointCloneIds(checkpoints);

  const hasAnyContent =
    !!lessonMd ||
    !!itemsData ||
    Object.keys(mediaSvgs).length > 0 ||
    Object.keys(motionSvgs).length > 0 ||
    Object.keys(mediaEmbeds).length > 0;

  return (
    // "notion" width: max-w-notion (~1140px) — the outer page band.
    // Prose stays ~65ch inside; figures/embeds break to the full band.
    <PageShell width="notion">
      {/* Skip-to-content for keyboard users (DESIGN-BIBLE §9) */}
      <a
        href="#lesson-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-4 focus:py-2 focus:rounded-lg",
          "focus:bg-accent focus:text-white focus:text-body-sm focus:font-medium"
        )}
      >
        Aller au contenu de la leçon
      </a>

      {/* Breadcrumb — sits above the two-column grid, full width */}
      <Breadcrumb subject={meta.subject} title={meta.title} />

      {/* ── Two-column layout: margin rail + content ─────────────────────── */}
      <div className="notion-page-grid">
        {/*
         * Left rail — desktop only, hidden on narrow screens.
         * MarginRail is a client component with IntersectionObserver scroll-spy.
         * Falls back to null if no R-rungs detected.
         */}
        {lessonMd ? (
          <MarginRail lessonMd={lessonMd} />
        ) : (
          <div className="notion-rail" aria-hidden="true" />
        )}

        {/* Content column */}
        <div id="lesson-content" className="notion-content">
          {/* Page heading — centered within the prose measure (#4 fix) */}
          <header className="mb-10 notion-prose">
            <p
              className={cn(
                "mb-2 text-caption font-medium uppercase tracking-widest",
                "text-[var(--color-text-tertiary)]"
              )}
            >
              {subjectLabel(meta.subject)}
            </p>
            <h1
              className={cn(
                "text-h1 font-semibold text-[var(--color-text-primary)]"
              )}
              style={{ letterSpacing: "-0.02em" }}
            >
              {meta.title}
            </h1>
          </header>

          {lessonMd ? (
            /*
             * NotionBody splits lessonMd on all [[type:slug]] markers and renders
             * prose, diagrams, animations, embeds, and checkpoints in authored order.
             * Prose segments are wrapped in notion-prose (~65ch) and centered within
             * the content column (#4 fix); wide-band elements (figures, motion,
             * embeds, checkpoints) use the full content column.
             * Unknown slugs render nothing; no [[…]] literal ever reaches the DOM.
             */
            <NotionBody
              lessonMd={lessonMd}
              mediaSvgs={mediaSvgs}
              motionSvgs={motionSvgs}
              motionSpecs={motionSpecs}
              mediaEmbeds={mediaEmbeds}
              checkpoints={checkpoints}
            />
          ) : (
            <div
              className={cn(
                "rounded-xl border border-dashed border-[var(--color-border-subtle)]",
                "px-8 py-10 text-center",
                "text-body-sm text-[var(--color-text-tertiary)]"
              )}
            >
              Leçon en cours de préparation.
            </div>
          )}

          {/* MCQ items — always rendered after the lesson body */}
          {itemsData && (
            <div className="mt-16">
              <ItemsSection
                itemsData={itemsData}
                checkpointCloneIds={checkpointCloneIds}
              />
            </div>
          )}

          {/* Fallback: notion directory exists but all content is absent */}
          {!hasAnyContent && (
            <div
              className={cn(
                "mt-12 rounded-xl border border-dashed border-[var(--color-border-subtle)]",
                "px-8 py-10 text-center",
                "text-body-sm text-[var(--color-text-tertiary)]"
              )}
            >
              Contenu en cours de préparation.
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
