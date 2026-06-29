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
 * Rung heading renderer (ADR 0023 polish — resolve the masthead double-title).
 *
 * Lesson rungs are authored as `## R0 — Title`. Rendered naively, the serif
 * "R0 — Title" competes with the serif masthead title for "which is THE title"
 * within one fold. Here the "R0" prefix is demoted to a quiet tabular-SANS tag
 * (.rung-tag) and only the human title stays serif — so the masthead reads as
 * the title and rungs read as numbered sections. The h2 keeps its slug `id`
 * (for MarginRail anchors + scroll-margin); textContent still starts with "R0"
 * so the rail's rung matcher is unaffected.
 */
function RungHeading({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  const text = flattenText(children);
  const m = text.match(/^(R\d+)\s*[—–-]\s*([\s\S]+)$/);
  if (m) {
    return (
      <h2 {...props}>
        <span className="rung-tag" aria-hidden="true">{m[1]}</span>
        {m[2]}
      </h2>
    );
  }
  return <h2 {...props}>{children}</h2>;
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
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeKatex, { strict: false, trust: false }],
        ]}
        components={{ h2: RungHeading }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
