/**
 * MarginNotes — Set-W1 OPTION CANDIDATE (Day-8 wide-viewport composition;
 * owner review pending — this renders only on the /options/wide/w1 route).
 *
 * The Tufte/Stripe pattern: expert asides and key definitions sit in the
 * right margin at the wide tier (≥1536px), anchored to their reference
 * sections; below that width they don't render (the same material stays
 * inline in the prose, as today). The margin the owner circled as dead
 * space becomes the aside channel.
 *
 * MOCK HONESTY: the notes below are REAL content (extracted definitions and
 * expert asides from this lesson — nothing invented), but the anchor map is
 * hand-authored for the demo. If W1 is picked, the channel gets an authored
 * source (template v2 gains a margin-note field per rung) instead of this
 * hardcoded map.
 *
 * Positioning: same rAF-throttled measurement pattern as MarginRail —
 * anchored to `h2[data-rung]` offsets, collision-pushed so notes never
 * overlap. Calm: no motion, quiet type, hairline accent.
 */

"use client";

import { useEffect, useState } from "react";

export interface MarginNote {
  rung: string;      // data-rung anchor, e.g. "R2"
  label: string;     // caps-caption label, e.g. "À retenir"
  html: string;      // pre-rendered note body (KaTeX HTML allowed)
}

export function MarginNotes({ notes }: { notes: MarginNote[] }) {
  const [placed, setPlaced] = useState<{ top: number; note: MarginNote }[]>([]);

  useEffect(() => {
    function measure() {
      const out: { top: number; note: MarginNote }[] = [];
      let lastBottom = 0;
      for (const note of notes) {
        const el = document.querySelector<HTMLElement>(`h2[data-rung="${note.rung}"]`);
        if (!el) continue;
        const top = Math.max(el.getBoundingClientRect().top + window.scrollY, lastBottom + 24);
        out.push({ top, note });
        lastBottom = top + 140; // estimated card height for collision push
      }
      setPlaced(out);
    }
    measure();
    window.addEventListener("resize", measure);
    // Re-measure once fonts/KaTeX settle.
    const t = setTimeout(measure, 600);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, [notes]);

  return (
    <div
      aria-hidden="true"
      data-margin-notes
      className="hidden bp-wide:block absolute top-0 bottom-0 pointer-events-none"
      style={{ left: "calc(100% + 32px)", width: "300px" }}
    >
      {placed.map(({ top, note }, i) => (
        <aside
          key={i}
          className="absolute w-full pl-4 border-l border-[var(--color-border-soft)]"
          style={{ top }}
        >
          <p className="text-caption font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
            {note.label}
          </p>
          <div
            className="mt-1 text-body-sm leading-relaxed text-[var(--color-text-secondary)]"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
        </aside>
      ))}
    </div>
  );
}
