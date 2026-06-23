/**
 * LessonRenderer
 *
 * Renders lesson.md as rich prose with live KaTeX math.
 *
 * DESIGN-BIBLE §3: math is live text, never images. KaTeX renders
 * synchronously — no reflow, no flash, no placeholder.
 *
 * This is a server component (no "use client") — markdown rendering
 * happens on the server, so KaTeX output is in the initial HTML.
 */

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
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
        remarkPlugins={[remarkMath]}
        rehypePlugins={[
          [rehypeKatex, { strict: false, trust: false }],
        ]}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
