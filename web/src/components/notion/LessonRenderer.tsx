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
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
