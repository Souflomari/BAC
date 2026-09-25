/**
 * KeyFormulaRail — Set-W3 OPTION CANDIDATE (Day-8 wide-viewport composition;
 * owner review pending — renders only on the /options/wide/w3 route).
 *
 * A sparse contextual right rail at the wide tier (≥1536px): ONE sticky
 * "À retenir" card showing the CURRENT section's key formula — nothing else,
 * no list, no progress theater. Scroll-spy reuses MarginRail's deterministic
 * reading-line rule. Sections without a key formula show nothing (sparse by
 * design — the card appears only where a formula has been earned).
 *
 * MOCK HONESTY: formulas below are the lesson's own boxed results (KaTeX
 * strings taken verbatim from lesson.md). If W3 is picked, the map becomes
 * authored content (template v2 field), not this hardcoded demo.
 */

"use client";

import { useEffect, useState } from "react";
import katex from "katex";

export interface KeyFormula {
  rung: string;   // data-rung anchor
  title: string;  // one-line name, e.g. "Période propre"
  tex: string;    // KaTeX source
}

export function KeyFormulaRail({ formulas }: { formulas: KeyFormula[] }) {
  const [active, setActive] = useState<KeyFormula | null>(null);

  useEffect(() => {
    const els = formulas
      .map((f) => ({ f, el: document.querySelector<HTMLElement>(`h2[data-rung="${f.rung}"]`) }))
      .filter((x) => x.el);
    if (!els.length) return;
    const READING_LINE = 96;
    let ticking = false;
    function compute() {
      ticking = false;
      let found: KeyFormula | null = null;
      // Active = last formula whose section heading has passed the reading
      // line AND whose section is still current (next heading not passed).
      const heads = Array.from(document.querySelectorAll<HTMLElement>("h2[data-rung]"));
      let currentRung: string | null = null;
      for (const h of heads) {
        if (h.getBoundingClientRect().top <= READING_LINE) currentRung = h.dataset.rung ?? null;
        else break;
      }
      found = formulas.find((f) => f.rung === currentRung) ?? null;
      setActive(found);
    }
    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(compute); }
    }
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [formulas]);

  return (
    <div
      aria-hidden="true"
      data-key-formula-rail
      className="hidden bp-large:block absolute top-0 bottom-0 pointer-events-none"
      style={{ left: "calc(100% + 32px)", width: "300px" }}
    >
      <div className="sticky top-24">
        {active && (
          <aside className="rounded-lg px-5 py-4 bg-surface-raised border border-subtle">
            <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
              À retenir
            </p>
            <p className="mt-1 text-body-sm font-medium text-primary">
              {active.title}
            </p>
            <div
              className="mt-2 text-[15px] text-primary"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(active.tex, { throwOnError: false }),
              }}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
