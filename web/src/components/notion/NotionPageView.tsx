/**
 * NotionPageView — the notion page's full render, extracted from the route so
 * the masthead option variants (Day-3 set A) render the real page, not a mock.
 *
 * DAY-4 FREEZE (Set A = A3, FABLE-DECIDED / OWNER-REVIEW-PENDING — ledger
 * docs/audits/fable-day3-ledger.md): the DEFAULT masthead is now the A3
 * masthead BAND — text-display-lg (56px) serif title in a full-bleed
 * surface-container-low band with a bottom hairline, breadcrumb + title +
 * metadata aligned to the page SPINE (not the centered prose measure — the
 * band is chapter furniture, it spans the page's structural edge). a1/a2
 * remain as option variants for the owner's laptop review; if overridden,
 * swap = change the default below. Spec: docs/design/PAGE-ANATOMY-SPECS.md.
 *
 * The masthead anatomy (all variants):
 *   breadcrumb (nav) → serif title → METADATA LINE (level chip · reading time ·
 *   updated date — audit amendment #3). No eyebrow (U3 doubled-label kill).
 *
 * Page end: LessonEnd (the Set-C C2 refile) — the session-close handoff.
 *
 * Server component.
 */

import { notFound } from "next/navigation";
import { loadNotion, listNotions } from "@/lib/content";
import { PageShell } from "@/components/ui/PageShell";
import { NotionBody } from "@/components/notion/NotionBody";
import { ItemsSection, buildCheckpointCloneIds } from "@/components/notion/ItemsSection";
import { MarginRail } from "@/components/notion/MarginRail";
import { Icon } from "@/components/ui/Icon";
import { LessonEnd } from "@/components/notion/LessonEnd";
import { cn } from "@/lib/utils";
import { subjectLabel } from "@/lib/subjects";

export { subjectLabel };

export type MastheadVariant = "a1" | "a2" | "a3";

// ── Subject display labels ────────────────────────────────────────────────────
// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ subject, title }: { subject: string; title: string }) {
  return (
    <nav
      aria-label="Fil d’Ariane"
      className="mb-8 flex items-center gap-2 flex-wrap text-body-sm text-[var(--color-text-secondary)]"
    >
      <a
        href="/"
        className={cn(
          "hover:text-accent",
          "transition-colors duration-micro",
          "rounded focus-ring"
        )}
      >
        Notions
      </a>
      <Icon name="chevron-right" size={16} className="text-[var(--color-text-tertiary)]" />
      <span className="text-[var(--color-text-secondary)]">{subjectLabel(subject)}</span>
      <Icon name="chevron-right" size={16} className="text-[var(--color-text-tertiary)]" />
      <span
        className="text-[var(--color-text-primary)] font-medium truncate max-w-[28ch]"
        aria-current="page"
      >
        {title}
      </span>
    </nav>
  );
}

// ── Masthead metadata line (audit amendment #3 — web-native texture) ──────────
// Level chip · reading time · updated date. Sans, secondary, quiet. The level
// is app-wide truth today ("2ᵉ Bac · Sciences"); per-notion filière detail
// needs a small content-meta file — ledgered as a Day-5 content-schema item.
function MastheadMeta({
  readingMinutes,
  updatedAt,
}: {
  readingMinutes?: number;
  updatedAt?: string;
}) {
  const parts: string[] = ["2ᵉ Bac · Sciences"];
  if (readingMinutes) parts.push(`${readingMinutes} min de lecture`);
  if (updatedAt) parts.push(`mis à jour ${updatedAt}`);
  return (
    <p className="mt-4 text-body-sm text-[var(--color-text-secondary)]">
      {parts.join("  ·  ")}
    </p>
  );
}

// ── Page view ─────────────────────────────────────────────────────────────────
export function NotionPageView({
  id,
  mastheadVariant = "a3",
}: {
  id: string;
  mastheadVariant?: MastheadVariant;
}) {
  const notion = loadNotion(id);
  if (!notion) notFound();

  const {
    meta,
    lessonMd,
    itemsData,
    checkpoints,
    exercises,
    derivations,
    mediaSvgs,
    motionSvgs,
    motionSpecs,
    mediaEmbeds,
  } = notion;

  const checkpointCloneIds = buildCheckpointCloneIds(checkpoints);

  // LessonEnd next-suggestion: deterministic + honest — the most recently
  // updated OTHER notion (interleaving another subject beats repeating this
  // one). No fabricated ordering; if no other notion exists, LessonEnd offers
  // only the return-home path.
  const others = listNotions().filter((n) => n.id !== id);
  const nextNotion = others.length > 0 ? others[0] : null;

  const hasAnyContent =
    !!lessonMd ||
    !!itemsData ||
    Object.keys(mediaSvgs).length > 0 ||
    Object.keys(motionSvgs).length > 0 ||
    Object.keys(mediaEmbeds).length > 0;

  // Masthead title classes per variant (Set A). a1 = shipped control.
  const titleClass = {
    a1: "text-h1",
    a2: "text-[2.75rem] leading-[1.1] tracking-[-0.026em]",
    a3: "text-display-lg max-w-[26ch]", // frozen display tier (TOKENS v2); measure-capped
  }[mastheadVariant];

  const onSpine = mastheadVariant === "a3"; // band variant: masthead on the page spine
  const masthead = (
    <>
      <div className={onSpine ? undefined : "notion-prose"}>
        <Breadcrumb subject={meta.subject} title={meta.title} />
      </div>
      <header className={cn(onSpine ? "mb-0" : "notion-prose mb-10")}>
        <h1
          className={cn(
            "font-serif font-bold text-[var(--color-text-primary)]",
            titleClass
          )}
        >
          {meta.title}
        </h1>
        <MastheadMeta
          readingMinutes={meta.readingMinutes}
          updatedAt={meta.updatedAt}
        />
      </header>
    </>
  );

  return (
    <PageShell width="notion">
      {/* Skip-to-content for keyboard users (DESIGN-BIBLE §9) */}
      <a
        href="#lesson-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-4 focus:py-2 focus:rounded-lg",
          "focus:bg-accent focus:text-[var(--color-text-on-accent)] focus:text-body-sm focus:font-medium"
        )}
      >
        Aller au contenu de la leçon
      </a>

      {/* a3: the masthead lives in a full-bleed tonal band ABOVE the grid; the
          band breaks to the viewport edges while its content stays on the page
          spine (margin/padding cancel-out). Grid content starts under it. */}
      {mastheadVariant === "a3" && (
        <div
          data-band="masthead"
          className={cn(
            "-mt-12 md:-mt-16 mb-12 py-12",
            "mx-[calc(50%-50vw)] px-[calc(50vw-50%)]",
            "bg-[var(--color-surface-container-low)]",
            "border-b border-[var(--color-border-subtle)]"
          )}
        >
          {/* Inside the band the masthead spans the notion band, not the prose
              column — the width is part of the A3 statement. */}
          <div>{masthead}</div>
        </div>
      )}

      {/* ── Two-column layout: margin rail + content ─────────────────────── */}
      <div className="notion-page-grid">
        {lessonMd ? (
          <MarginRail lessonMd={lessonMd} />
        ) : (
          <div className="notion-rail" aria-hidden="true" />
        )}

        {/* Content column */}
        <div id="lesson-content" className="notion-content">
          {mastheadVariant !== "a3" && masthead}

          {lessonMd ? (
            <NotionBody
              lessonMd={lessonMd}
              exercises={exercises}
              derivations={derivations}
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
                "text-body-sm text-[var(--color-text-secondary)]"
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

          {/* Session-close handoff (bible §8; Set-C C2 refile, Day-4 build) */}
          {hasAnyContent && <LessonEnd next={nextNotion} />}

          {/* Fallback: notion directory exists but all content is absent */}
          {!hasAnyContent && (
            <div
              className={cn(
                "mt-12 rounded-xl border border-dashed border-[var(--color-border-subtle)]",
                "px-8 py-10 text-center",
                "text-body-sm text-[var(--color-text-secondary)]"
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
