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
 * Layout (design brief #1 — "use the width; look finished"):
 *   - Outer band: max-w-notion (~1140px), centered, generous horizontal padding.
 *   - Left margin rail (56px): sticky section label + subtle vertical line.
 *     Shows "where am I" through the lesson rungs. Desktop only (≥900px).
 *   - Right content column: prose bounded at ~65ch; figures/motion/embeds/
 *     checkpoints break out to the full content column width (notion-wide-band).
 *   - On narrow screens: collapses to single column, rail disappears.
 *
 * Server component: all file I/O and markdown parsing happens on the server.
 * Interactive parts (EmbedPanel, CheckpointItem, MotionDiagram) are client
 * components hydrated in the browser.
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
import { ItemsSection } from "@/components/notion/ItemsSection";
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
          "rounded focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2"
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

// ── Margin rail — section label indicator ────────────────────────────────────
// Shows the subject as a rotated vertical label in the margin. Calm and subtle.
// Desktop only — hidden on narrow screens via CSS (notion-rail class).
function MarginRail({ subject }: { subject: string }) {
  return (
    <aside
      className="notion-rail"
      aria-hidden="true"
    >
      <div
        className={cn(
          "flex flex-col items-center gap-3 pt-2",
          "text-caption font-medium text-[var(--color-text-tertiary)] uppercase tracking-widest",
          "select-none"
        )}
      >
        {/* Rotated subject label */}
        <span
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
          className="opacity-60"
        >
          {subjectLabel(subject)}
        </span>
        {/* Subtle dot accent */}
        <span
          className={cn(
            "w-1 h-1 rounded-full",
            "bg-[#3E5C86] opacity-30"
          )}
        />
      </div>
    </aside>
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
    mediaEmbeds,
  } = notion;

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

      {/* Page heading — full band, above the content grid */}
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

      {/* ── Two-column layout: margin rail + content ─────────────────────── */}
      <div className="notion-page-grid">
        {/* Left rail — desktop only, hidden on narrow screens */}
        <MarginRail subject={meta.subject} />

        {/* Spacer column (desktop only) — the 24px gap between rail and content */}
        {/* This is the implicit grid gap — no extra div needed */}

        {/* Content column */}
        <div id="lesson-content" className="notion-content">
          {lessonMd ? (
            /*
             * NotionBody splits lessonMd on all [[type:slug]] markers and renders
             * prose, diagrams, animations, embeds, and checkpoints in authored order.
             * Prose segments are wrapped in notion-prose (~65ch); wide-band elements
             * (figures, motion, embeds, checkpoints) use the full content column.
             * Unknown slugs render nothing; no [[…]] literal ever reaches the DOM.
             */
            <NotionBody
              lessonMd={lessonMd}
              mediaSvgs={mediaSvgs}
              motionSvgs={motionSvgs}
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
              <ItemsSection itemsData={itemsData} />
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
