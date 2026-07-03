/**
 * LessonRenderer
 *
 * Renders lesson.md as rich prose with live KaTeX math and GFM tables.
 *
 * DESIGN-BIBLE §3: math is live text, never images. KaTeX renders
 * synchronously — no reflow, no flash, no placeholder.
 *
 * remark-gfm enables GitHub Flavored Markdown: tables (| col | col |),
 * strikethrough, task lists, autolinks. Required so that the R4 "Synthèse
 * du rôle de R" table renders as a real <table> rather than raw pipe text.
 *
 * This is a server component (no "use client") — markdown rendering
 * happens on the server, so KaTeX output is in the initial HTML.
 */

import { Children } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import remarkFrenchTypography from "@/lib/remarkFrenchTypography";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";

interface LessonRendererProps {
  markdown: string;
  className?: string;
}


/**
 * Hover heading anchor (audit U5 — web-native texture): a § link that appears
 * on heading hover/focus so a student can copy a deep link to any section.
 * The id comes from rehype-slug (stable — computed from the SOURCE heading
 * text, so stripping the rendered R-tag does not change existing anchors).
 */
function HeadingAnchor({ id }: { id?: string }) {
  if (!id) return null;
  return (
    <a
      href={`#${id}`}
      className="heading-anchor focus-ring"
      aria-label="Lien direct vers cette section"
    >
      §
    </a>
  );
}

/**
 * Strip a leading "R<n> — " rung code from a heading's children while
 * PRESERVING the original child nodes (Day-8 fix: the previous version
 * rendered flattenText(children) — which destroyed KaTeX children, so
 * `## R2 — … et trouver $T_0$` rendered as literal "T0T_0T0" (MathML text +
 * TeX annotation + HTML text concatenated). Live student-visible defect
 * from Day 3 until today; caught only in a rendered option shot — §13.)
 * The prefix, when present, is always at the start of the FIRST text child;
 * later children (math spans, emphasis) pass through untouched.
 */
function stripRungPrefix(
  children: ReactNode
): { rung: string; rest: ReactNode[] } | null {
  const arr = Children.toArray(children);
  const first = arr[0];
  if (typeof first !== "string") return null;
  const m = first.match(/^(R\d+)\s*[—–-]\s*([\s\S]*)$/);
  if (!m) return null;
  return { rung: m[1], rest: [m[2], ...arr.slice(1)] };
}

/**
 * Rung heading renderer.
 *
 * Lesson rungs are authored as `## R0 — Title`. The R-codes are the pedagogy
 * spec's internal rung vocabulary — students never see them (audit U3, Day-3
 * batch): the rendered heading is the human title alone. The code moves to a
 * `data-rung` attribute, which is what MarginRail matches on (the previous
 * textContent-startsWith matching died with the visible tag). The h2 keeps its
 * slug `id` for anchors + scroll-margin, and gains the hover § anchor.
 */
function RungHeading({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const stripped = stripRungPrefix(children);
  if (stripped) {
    return (
      <h2 {...props} data-rung={stripped.rung}>
        {stripped.rest}
        <HeadingAnchor id={props.id} />
      </h2>
    );
  }
  return (
    <h2 {...props}>
      {children}
      <HeadingAnchor id={props.id} />
    </h2>
  );
}

/** h3 — same hover anchor; ALSO strips a leading R-code (July-2026 external
 * audit, residual class 3: the maths notion authors its rungs at h3, and the
 * U3 de-jargon strip only covered h2 — an instance fix that missed the
 * heading-level sibling). Children preserved (same Day-8 fix as h2). */
function SubHeading({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  const stripped = stripRungPrefix(children);
  if (stripped) {
    return (
      <h3 {...props} data-rung={stripped.rung}>
        {stripped.rest}
        <HeadingAnchor id={props.id} />
      </h3>
    );
  }
  return (
    <h3 {...props}>
      {children}
      <HeadingAnchor id={props.id} />
    </h3>
  );
}

export function LessonRenderer({ markdown, className }: LessonRendererProps) {
  return (
    <article
      className={cn(
        // .prose-lesson applies the reading-column typography from globals.css
        "prose-lesson",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkFrenchTypography]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeKatex, { strict: false, trust: false }],
        ]}
        components={{ h2: RungHeading, h3: SubHeading }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
