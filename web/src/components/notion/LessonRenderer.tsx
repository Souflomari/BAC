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

/** Flatten a React children tree to its plain text (rung titles are plain). */
function flattenText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return flattenText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
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
  const text = flattenText(children);
  const m = text.match(/^(R\d+)\s*[—–-]\s*([\s\S]+)$/);
  if (m) {
    return (
      <h2 {...props} data-rung={m[1]}>
        {m[2]}
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

/** h3 — same hover anchor, no rung semantics. */
function SubHeading({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
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
