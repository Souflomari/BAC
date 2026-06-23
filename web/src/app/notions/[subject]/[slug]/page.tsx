/**
 * Notion page — /notions/[subject]/[slug]
 *
 * URL maps directly to the content directory structure:
 *   /notions/maths/probabilites-conditionnelles
 *   → content/maths/probabilites-conditionnelles/
 *
 * Renders one notion: lesson (markdown + live KaTeX), inline SVG diagrams,
 * the interactive embed (or a graceful placeholder), and the MCQ items.
 *
 * This is a server component: all file I/O and markdown parsing happens on
 * the server. The interactive parts (EmbedPanel, McqItem) are client
 * components imported here and hydrated in the browser.
 *
 * DESIGN-BIBLE §7: the learning core is sacred.
 * - One idea at a time
 * - No engagement theater
 * - Math as live KaTeX text, never images (§3)
 * - Immediate per-action feedback (in McqItem)
 * - Full keyboard navigability (§9)
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadNotion, listNotions } from "@/lib/content";
import { PageShell } from "@/components/ui/PageShell";
import { NotionBody } from "@/components/notion/NotionBody";
import { ItemsSection } from "@/components/notion/ItemsSection";
import { cn } from "@/lib/utils";

// ── Static params ─────────────────────────────────────────────────────────────
// Pre-render all known notions at build time.
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
      className="mb-10 flex items-center gap-2 flex-wrap text-body-sm text-[var(--color-text-tertiary)]"
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

  const { meta, lessonMd, itemsData, mediaSvgs, mediaEmbeds } = notion;

  // Determine if the page is completely empty (no lesson, no items, no media)
  const hasAnyContent =
    !!lessonMd ||
    !!itemsData ||
    Object.keys(mediaSvgs).length > 0 ||
    Object.keys(mediaEmbeds).length > 0;

  return (
    <PageShell width="reading">
      {/* Skip-to-content link for keyboard users (DESIGN-BIBLE §9) */}
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

      {/* Breadcrumb */}
      <Breadcrumb subject={meta.subject} title={meta.title} />

      {/* Page heading — outside the bounded lesson column so the title
          can breathe at page width before the column clamps in */}
      <header className="mb-10">
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

      {/* ── Learning core ─────────────────────────────────────────────────── */}
      <div id="lesson-content">
        {lessonMd ? (
          /*
           * NotionBody splits lessonMd on [[figure:slug]] / [[embed:slug]]
           * markers and renders prose, diagrams, and embeds in authored order.
           * Every marker occurrence is rendered — repeated markers render
           * repeated components, each with a unique React key.
           * Unknown slugs silently render nothing (no crash, no literal text).
           */
          <NotionBody
            lessonMd={lessonMd}
            mediaSvgs={mediaSvgs}
            mediaEmbeds={mediaEmbeds}
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
        {itemsData && <ItemsSection itemsData={itemsData} />}

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
    </PageShell>
  );
}
