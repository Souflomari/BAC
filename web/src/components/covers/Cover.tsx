/**
 * Cover — the coded illustrated-cover starter set (Day 6, COVER-SPEC.md).
 *
 * The spec made flesh: flat vector, ONE motif per cover, muted figure-palette
 * hues via CSS vars (dark mode by construction), zero seductive detail
 * (DESIGN-BIBLE §6). ViewBox 320×200 (8:5). These are the few-shot reference
 * the future Gemini asset lane imitates; structural diagrams stay coded
 * (ADR 0017) — covers are mood, not instruction.
 *
 * Motif registry: per-subject defaults + per-notion specializations.
 * `coverFor(subject, slug)` picks the most specific available.
 */

import { cn } from "@/lib/utils";

type MotifId = "maths" | "pc" | "svt" | "rlc-serie";

/** One accent hue per cover, from the FIGURE palette only (COVER-SPEC). */
const ACCENT: Record<MotifId, string> = {
  maths: "var(--figure-energy-C)",
  pc: "var(--figure-accent)",
  svt: "var(--figure-energy-L)",
  "rlc-serie": "var(--figure-accent)",
};

function Motif({ id }: { id: MotifId }) {
  const accent = ACCENT[id];
  const ink = "var(--figure-ink-soft)";
  const grid = "var(--figure-grid)";

  switch (id) {
    case "maths":
      // Branching probability tree — one motif, thirds-anchored.
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M56 100 L136 60 M56 100 L136 140" stroke={ink} strokeWidth="3" />
          <path d="M136 60 L216 36 M136 60 L216 84" stroke={ink} strokeWidth="3" />
          <path d="M136 140 L216 116 M136 140 L216 164" stroke={accent} strokeWidth="3.5" />
          <circle cx="56" cy="100" r="7" fill={accent} />
          <circle cx="136" cy="60" r="6" fill={ink} />
          <circle cx="136" cy="140" r="6" fill={accent} />
          <circle cx="216" cy="36" r="5" fill={grid} />
          <circle cx="216" cy="84" r="5" fill={grid} />
          <circle cx="216" cy="116" r="5" fill={accent} />
          <circle cx="216" cy="164" r="5" fill={grid} />
        </g>
      );
    case "pc":
      // Damped oscillation — the subject's signature curve.
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M32 134 H288" stroke={grid} strokeWidth="2.5" />
          <path
            d="M32 134 C44 60, 56 60, 68 134 C80 196, 92 196, 104 134 C114 86, 124 86, 134 134 C143 172, 152 172, 161 134 C169 106, 177 106, 185 134 C192 156, 199 156, 206 134 C212 118, 218 118, 224 134 C229 145, 234 145, 239 134 C244 127, 249 127, 254 134 C258 139, 262 139, 266 134"
            stroke={accent}
            strokeWidth="3.5"
          />
        </g>
      );
    case "svt":
      // A leaf with veins — soft geometry, one motif.
      return (
        <g fill="none" strokeLinecap="round">
          <path
            d="M160 176 C96 152, 88 88, 118 40 C176 56, 216 104, 200 160 C188 172, 172 178, 160 176 Z"
            stroke={accent}
            strokeWidth="3.5"
            fill="var(--color-surface-container-lowest)"
          />
          <path d="M150 168 C142 128, 138 92, 124 52" stroke={ink} strokeWidth="2.5" />
          <path d="M144 140 L172 122 M139 112 L164 96 M133 84 L152 72" stroke={grid} strokeWidth="2.5" />
        </g>
      );
    case "rlc-serie":
      // The notion cover: damped trace + minimal C and L glyphs beneath.
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M32 108 H288" stroke={grid} strokeWidth="2.5" />
          <path
            d="M32 108 C46 30, 60 30, 74 108 C88 180, 102 180, 116 108 C128 52, 140 52, 152 108 C163 152, 174 152, 185 108 C194 76, 203 76, 212 108 C220 134, 228 134, 236 108 C243 90, 250 90, 257 108 C262 120, 267 120, 272 108"
            stroke={ACCENT["rlc-serie"]}
            strokeWidth="3.5"
          />
          {/* condensateur */}
          <path d="M96 168 V148 M112 168 V148" stroke={ink} strokeWidth="3.5" />
          {/* bobine */}
          <path
            d="M176 158 c0 -10 16 -10 16 0 c0 -10 16 -10 16 0 c0 -10 16 -10 16 0"
            stroke={ink}
            strokeWidth="3"
          />
        </g>
      );
  }
}

export function coverMotif(subject: string, slug?: string): MotifId {
  if (slug === "rlc-serie") return "rlc-serie";
  if (subject === "maths" || subject === "pc" || subject === "svt") return subject;
  return "pc";
}

export function Cover({
  subject,
  slug,
  className,
}: {
  subject: string;
  slug?: string;
  className?: string;
}) {
  const id = coverMotif(subject, slug);
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-hidden="true"
      data-cover={slug ?? subject}
      className={cn("block w-full h-auto", className)}
      style={{ backgroundColor: "var(--color-surface-container-low)" }}
    >
      <Motif id={id} />
    </svg>
  );
}
