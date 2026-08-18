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
import type { NotionItem } from "@/lib/content";
import { realChapterCount } from "@/lib/chapters";
import { PageShell } from "@/components/ui/PageShell";
import { NotionBody } from "@/components/notion/NotionBody";
import { buildCheckpointCloneIds } from "@/components/notion/ItemsSection";
import { MarginRail } from "@/components/notion/MarginRail";
import { ChapterShell, ChapterPosition, ChapterTransport } from "@/components/notion/ChapterShell";
import { AttemptEventProvider, ChapterVisitRecorder } from "@/components/notion/AttemptEvents";
import { Icon } from "@/components/ui/Icon";
import { LessonEnd } from "@/components/notion/LessonEnd";
import { ExerciseBank } from "@/components/notion/ExerciseBank";
import { cn } from "@/lib/utils";
import { Cover } from "@/components/covers/Cover";
import { subjectLabel, subjectHref } from "@/lib/subjects";
import { Breadcrumb as SharedBreadcrumb } from "@/components/ui/Breadcrumb";
import { MarginNotes, type MarginNote } from "./MarginNotes";
import { KeyFormulaRail, type KeyFormula } from "./KeyFormulaRail";

export { subjectLabel };

export type MastheadVariant = "a1" | "a2" | "a3";

// ── Breadcrumb (Day-9: now the shared component; the notion crumb goes
//    Accueil › <matière index> › <notion>, so the subject segment LINKS to
//    the subject's chapter list — real wayfinding up the tree). ──
function Breadcrumb({ subject, title }: { subject: string; title: string }) {
  return (
    <SharedBreadcrumb
      segments={[
        { label: "Accueil", href: "/" },
        { label: subjectLabel(subject), href: subjectHref(subject) },
        { label: title },
      ]}
    />
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
    <p className="mt-4 text-body-sm text-secondary">
      {parts.join("  ·  ")}
    </p>
  );
}

// ── Page view ─────────────────────────────────────────────────────────────────
/** Day-8 wide-viewport option candidates (owner review pending; rendered
 *  only by /options/wide/[v] — the default surface is unchanged):
 *  Set M composes the masthead band (m1 cover-in-band · m2 bounded band ·
 *  m3 watermark); Set W composes the wide content region (w1 margin notes ·
 *  w2 symmetric re-center + earned full-bleed · w3 key-formula rail). */
export type WideOption = "m1" | "m2" | "m3" | "w1" | "w2" | "w3";

export function NotionPageView({
  id,
  mastheadVariant = "a3",
  wideOption,
  marginNotes,
  keyFormulas,
}: {
  id: string;
  mastheadVariant?: MastheadVariant;
  wideOption?: WideOption;
  marginNotes?: MarginNote[];
  keyFormulas?: KeyFormula[];
}) {
  const notion = loadNotion(id);
  if (!notion) notFound();

  const {
    meta,
    lessonMd,
    itemsData,
    checkpoints,
    exercises,
    bank,
    derivations,
    mediaSvgs,
    motionSvgs,
    motionSpecs,
    mediaStages,
    mediaInteractive,
    mediaEmbeds,
  } = notion;

  // Inline-items model (LESSON-EXPERIENCE-SPEC §1.1): group every diagnostic
  // item by its rung so NotionBody can render each chapter's questions inline
  // at the end of that chapter. Items that are cloned as inline checkpoints
  // (`item_source: clone_of_<id>`) are excluded so the student never meets the
  // identical question twice. Items with no rung fall into a bucket that
  // matches no chapter → NotionBody's orphan safety-net renders them.
  const checkpointCloneIds = buildCheckpointCloneIds(checkpoints);
  const itemsByRung: Record<string, NotionItem[]> = {};
  for (const item of itemsData?.items ?? []) {
    if (checkpointCloneIds.has(item.id)) continue;
    const key = item.rung ?? "__no_rung__";
    (itemsByRung[key] ??= []).push(item);
  }

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

  // ── Pagination (LESSON-EXPERIENCE-SPEC §1 + BANK-SPEC §1) ─────────────────
  // `realChapters` = the lesson's own `## ` chapters (lib/chapters.ts — the
  // SAME rule MarginRail uses, so the two never disagree). Each chapter hosts
  // its own diagnostic questions inline. BANK-SPEC §1 revives the trailing
  // « S'entraîner » chapter (the `hasTrailingChapter` slot NotionBody carries)
  // — but ONLY when the notion has a bank.yaml. Every other notion's chapter
  // count is exactly the real chapters, unchanged. `totalChapters` is what
  // ChapterShell uses to size keyboard/URL clamping and the "Chapitre n / N".
  const realChapters = lessonMd ? realChapterCount(lessonMd) : 0;
  const realChapterCountClamped = Math.max(1, realChapters);
  // A non-null bank (bank.yaml present, even with zero entries) gets the
  // trailing chapter — its honest empty state IS a real render (BANK-SPEC §1).
  const hasBank = bank !== null;
  const trailingChapterIndex = realChapterCountClamped; // 0-based: after the last real chapter
  const totalChapters = realChapterCountClamped + (hasBank ? 1 : 0);

  // Masthead title classes per variant (Set A). a1 = shipped control.
  const titleClass = {
    a1: "text-h1",
    // a2 is a deliberate A/B display spec; it becomes a token when V1 encodes
    // it as the default (Phase C). token-gate-allow
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
            "font-display font-bold text-primary",
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
    <PageShell notions={listNotions().map((n) => ({ subject: n.subject, slug: n.slug, title: n.title, readingMinutes: n.readingMinutes }))} width={wideOption === "w2" ? "notionWide" : "notion"}>
      {/* Skip-to-content for keyboard users (DESIGN-BIBLE §9) */}
      <a
        href="#lesson-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-4 focus:py-2 focus:rounded-lg",
          "focus:bg-accent focus:text-on-accent focus:text-body-sm focus:font-medium"
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
            "-mt-12 bp-medium:-mt-16 mb-12 py-12",
            // Set-M2 candidate: the band is BOUNDED to the content width —
            // page background outside, the wide-viewport void becomes honest
            // margin instead of empty band interior. All other variants keep
            // the shipped full-bleed plane.
            wideOption === "m2"
              ? "rounded-xl px-8 border border-subtle"
              : "mx-[calc(50%-50vw)] px-[calc(50vw-50%)] border-b border-subtle",
            "bg-surface-container-low",
            // Set-M3 candidate needs a clipping context for its watermark.
            wideOption === "m3" && "relative overflow-hidden"
          )}
        >
          {/* Set-M1 candidate: the notion's cover motif composes the band's
              right region at the wide tier (COVER-SPEC masthead tie-in,
              promoted from echo to presence — Imprint grammar). Dark mode by
              construction: the cover's own background var equals the band's,
              so only the motif reads. Never behind the title (grid cell). */}
          {wideOption === "m1" ? (
            <div className="bp-large:grid bp-large:grid-cols-[1fr_400px] bp-large:items-center bp-large:gap-12">
              <div>{masthead}</div>
              <div className="hidden bp-large:block" aria-hidden="true">
                <Cover
                  subject={meta.subject}
                  slug={meta.slug}
                  className="max-h-[220px] w-auto ml-auto"
                />
              </div>
            </div>
          ) : wideOption === "m3" ? (
            <>
              {/* Set-M3 candidate: a faint oversized motif watermark holds the
                  band's right region — typographic composition, no new
                  information, clipped by the band. */}
              <div
                aria-hidden="true"
                className="hidden bp-large:block absolute -right-16 -top-24 w-[720px] opacity-[0.14] pointer-events-none"
              >
                <Cover subject={meta.subject} slug={meta.slug} className="!bg-transparent" />
              </div>
              <div className="relative">{masthead}</div>
            </>
          ) : (
            /* Inside the band the masthead spans the notion band, not the
               prose column — the width is part of the A3 statement. */
            <div>{masthead}</div>
          )}
        </div>
      )}

      {/* ── Two-column layout: margin rail + content, both paginated ──────
          LESSON-EXPERIENCE-SPEC §1.3: ChapterShell wraps rail + content so
          BOTH can read/drive the current-chapter context (MarginRail's
          active highlighting + activation, the position affordance, every
          chapter's own prev/next). NotionBody and the synthetic chapter
          below are the ONLY things ChapterShell toggles visibility on — the
          shell itself renders no lesson content of its own. */}
      <ChapterShell totalChapters={totalChapters}>
        {/* Attempt-event wiring (tutor-first plan, Lane E): the provider
            gives McqItem/CheckpointItem/AttemptFirstExercise the notion id;
            the recorder emits one visit event per chapter activation. Both
            are behaviorally inert in off/mock builds (emitter hard-gate). */}
        <AttemptEventProvider notionId={`${meta.subject}/${meta.slug}`}>
        <ChapterVisitRecorder />
        <div className="notion-page-grid">
          {lessonMd ? (
            <MarginRail
              lessonMd={lessonMd}
              hasItems={hasBank}
              bankCount={hasBank ? bank!.entries.length : undefined}
            />
          ) : (
            <div className="notion-rail" aria-hidden="true" />
          )}

          {/* Content column. Set-W1/W3 candidates anchor their right-margin
              channel to this column (absolute, outside the container, in the
              wide-tier void the owner circled). */}
          <div id="lesson-content" className={cn("notion-content", (wideOption === "w1" || wideOption === "w3") && "relative")}>
            {/* Mobile-only twin of the rail's "Chapitre n / N" (rail is
                display:none below 600px — globals.css:764-788): the SAME
                context, so the two copies can never disagree. */}
            <ChapterPosition className="mb-6 bp-medium:hidden" />

            {wideOption === "w1" && marginNotes && <MarginNotes notes={marginNotes} />}
            {wideOption === "w3" && keyFormulas && <KeyFormulaRail formulas={keyFormulas} />}
            {mastheadVariant !== "a3" && masthead}

            {lessonMd ? (
              <NotionBody
                lessonMd={lessonMd}
                exercises={exercises}
                derivations={derivations}
                mediaSvgs={mediaSvgs}
                motionSvgs={motionSvgs}
                motionSpecs={motionSpecs}
                mediaStages={mediaStages}
                mediaInteractive={mediaInteractive}
                mediaEmbeds={mediaEmbeds}
                checkpoints={checkpoints}
                itemsByRung={itemsByRung}
                hasTrailingChapter={hasBank}
                lessonEnd={hasAnyContent ? <LessonEnd next={nextNotion} /> : undefined}
              />
            ) : (
              <div
                className={cn(
                  "rounded-xl border border-dashed border-subtle",
                  "px-8 py-10 text-center",
                  "text-body-sm text-secondary"
                )}
              >
                Leçon en cours de préparation.
              </div>
            )}

            {/* Inline-items model (spec §1.1): each chapter's diagnostic
                questions render inside that chapter (NotionBody →
                ChapterQuestions). The trailing « S'entraîner » chapter below
                (BANK-SPEC §1) is the ONE synthetic chapter — present only when
                the notion has a bank.yaml. */}

            {/* ── Trailing « S'entraîner » bank chapter (BANK-SPEC §1) ──────
                Rendered as ONE more paginated chapter section (same
                data-chapter-section contract NotionBody's chapters use, so
                ChapterShell toggles it identically) at index
                `trailingChapterIndex` — after the lesson's last real chapter.
                It hosts the bank cards + LessonEnd (which no longer closes
                NotionBody's last chapter, since hasTrailingChapter is true) +
                the chapter's own prev transport. Absent entirely for notions
                without a bank.yaml — their pagination is unchanged. */}
            {hasBank && (
              <section
                data-chapter-section
                data-chapter-index={trailingChapterIndex}
                data-chapter-active="false"
                hidden
                className="chapter-view"
              >
                <ExerciseBank bank={bank!} />
                {hasAnyContent && <LessonEnd next={nextNotion} />}
                <ChapterTransport index={trailingChapterIndex} />
              </section>
            )}

            {/* Fallback: notion directory exists but all content is absent */}
            {!hasAnyContent && (
              <div
                className={cn(
                  "mt-12 rounded-xl border border-dashed border-subtle",
                  "px-8 py-10 text-center",
                  "text-body-sm text-secondary"
                )}
              >
                Contenu en cours de préparation.
              </div>
            )}
          </div>
        </div>
        </AttemptEventProvider>
      </ChapterShell>
    </PageShell>
  );
}
