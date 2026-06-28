/**
 * MarginRail
 *
 * Sticky left-margin wayfinder listing the lesson rungs (R0–R7…).
 *
 * Derives rungs from the lesson markdown by scanning for `## R…` headings.
 * Renders a quiet same-page anchor list with IntersectionObserver scroll-spy
 * to mark the current rung.
 *
 * Heading ID strategy:
 * rehype-slug (used in LessonRenderer) generates IDs via github-slugger.
 * Rather than trying to predict the exact ID from markdown text (error-prone
 * with accented characters), this component queries the DOM for h2 elements
 * whose text content starts with the rung label ("R0", "R1", etc.) and
 * observes those elements directly. The anchor href falls back to "#" + the
 * element's id attribute (set by rehype-slug) when found.
 *
 * Design requirements (#5 fix):
 * - Quiet / muted — never loud; calm-load approves quiet wayfinding
 * - Keyboard-focusable links (no aria-hidden on the nav)
 * - Sticky; aligned with the content column
 * - Current rung highlighted with a soft accent dot
 * - Desktop only (900px+) — collapses on mobile
 *
 * No browser storage — active state is ephemeral React state from
 * IntersectionObserver, reset on page navigation.
 *
 * This is a CLIENT component for IntersectionObserver and DOM queries.
 */

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface RungDef {
  label: string;    // e.g. "R0"
  title: string;    // e.g. "Accroche : le balancement électrique"
}

interface MarginRailProps {
  /** Raw lesson markdown — used to extract rung headings */
  lessonMd: string;
}

/**
 * Extract rung definitions from lesson markdown.
 * Matches lines like: ## R0 — Accroche : le balancement électrique
 * Returns only the label + title (no DOM ids yet — those come from DOM queries).
 */
function extractRungDefs(markdown: string): RungDef[] {
  const rungs: RungDef[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    // Match ## Rn… headings
    const m = line.match(/^##\s+(R\d+(?:\s*[-—]\s*.+)?)\s*$/);
    if (!m) continue;

    const fullText = m[1].trim();
    const labelMatch = fullText.match(/^(R\d+)/);
    if (!labelMatch) continue;
    const label = labelMatch[1];

    // Title: part after the separator
    const sepMatch = fullText.match(/^R\d+\s*[-—]\s*(.+)$/);
    const title = sepMatch ? sepMatch[1].trim() : fullText;

    rungs.push({ label, title });
  }

  return rungs;
}

// ── Resolved rung: includes the DOM element once found ───────────────────────
interface ResolvedRung extends RungDef {
  el: HTMLElement | null;
  href: string; // "#slug" from rehype-slug, or "#" fallback
}

export function MarginRail({ lessonMd }: MarginRailProps) {
  const rungDefs = useMemo(() => extractRungDefs(lessonMd), [lessonMd]);
  const [resolvedRungs, setResolvedRungs] = useState<ResolvedRung[]>([]);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Resolve DOM elements for each rung after mount
  useEffect(() => {
    if (rungDefs.length === 0) return;

    // Find h2 elements whose text content starts with the rung label.
    // rehype-slug sets id on the heading element; we use that for the href.
    const allH2 = Array.from(document.querySelectorAll<HTMLElement>("h2"));

    const resolved: ResolvedRung[] = rungDefs.map((def) => {
      // Find the h2 whose text content begins with this rung label
      const el = allH2.find((h) => {
        const text = h.textContent?.trim() ?? "";
        return text.startsWith(def.label);
      }) ?? null;

      const href = el?.id ? `#${el.id}` : "#";
      return { ...def, el, href };
    });

    setResolvedRungs(resolved);

    // Set up IntersectionObserver on the found headings
    observerRef.current?.disconnect();

    const observableEls = resolved
      .map((r) => r.el)
      .filter(Boolean) as HTMLElement[];

    if (observableEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      () => {
        // Find the rung whose heading is closest to and above the top 40% of viewport
        let found: string | null = null;
        for (const r of resolved) {
          if (!r.el) continue;
          const rect = r.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            found = r.label;
          }
        }
        setActiveLabel(found);
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: 0,
      }
    );

    observableEls.forEach((el) => observerRef.current!.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rungDefs]);

  if (rungDefs.length === 0) return null;

  // Render the rung list immediately (even before DOM is resolved)
  // so the rail appears on SSR/initial paint. Hrefs are updated after hydration.
  const rungs = resolvedRungs.length > 0 ? resolvedRungs : rungDefs.map((def) => ({
    ...def,
    el: null,
    href: "#",
  }));

  return (
    <nav
      className="notion-rail"
      aria-label="Navigation par rung de la leçon"
    >
      <ol className="flex flex-col gap-0.5 pt-1" role="list">
        {rungs.map((rung) => {
          const isActive = activeLabel === rung.label;
          return (
            <li key={rung.label}>
              <a
                href={rung.href}
                title={rung.title}
                className={cn(
                  "group flex items-center gap-2 py-1.5 pr-2 rounded-sm",
                  "text-caption font-medium",
                  "transition-colors duration-[150ms]",
                  "focus-visible:outline-2 focus-visible:outline-[#3E5C86] focus-visible:outline-offset-2",
                  isActive
                    ? "text-[#3E5C86]"
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {/* Active indicator dot */}
                <span
                  className={cn(
                    "flex-shrink-0 w-1.5 h-1.5 rounded-full",
                    "transition-all duration-[150ms]",
                    isActive
                      ? "bg-[#3E5C86]"
                      : "bg-[var(--color-border-soft)] group-hover:bg-[var(--color-text-tertiary)]"
                  )}
                  aria-hidden="true"
                />
                {/* Rung label — short (R0, R1, …) */}
                <span className="leading-none tabular-nums">{rung.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
