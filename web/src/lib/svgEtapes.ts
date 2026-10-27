/**
 * svgEtapes.ts — découper une figure étagée (`<g id="step-N">`) en chaîne, sans
 * DOM : utilisable côté serveur comme côté client. Extrait de StagedFigure.tsx
 * (2026-09-24), inchangé.
 */
export interface ExtractedStepGroups {
  /** The SVG string with every step-N group spliced OUT. */
  template: string;
  /** step number → its full authored markup (`<g id="step-N" …>…</g>`). */
  groups: Map<number, string>;
}

// Matches a `<g>` closing tag, or a `<g …>` / self-closing `<g …/>` opening
// tag. SVG attribute values in authored content never contain a literal
// unescaped `>`, so `[^>]*` is safe here (same assumption the existing
// applyStepVisibility/applyViewBoxCrop string-level transforms already make).
const GROUP_TOKEN_RE = /<\/g>|<g\b[^>]*>/g;

export function extractStepGroups(svg: string): ExtractedStepGroups {
  interface StackFrame {
    start: number;
    stepN: number | null;
  }
  const stack: StackFrame[] = [];
  const found: { n: number; start: number; end: number }[] = [];

  GROUP_TOKEN_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = GROUP_TOKEN_RE.exec(svg))) {
    const text = m[0];
    const start = m.index;

    if (text === "</g>") {
      // Pop whatever group this closes. If it was a tracked step group, its
      // OWN matching close (by stack depth, not by first "</g>" seen) is
      // exactly this token — nested plain <g>s were already popped above it.
      const frame = stack.pop();
      if (frame && frame.stepN !== null) {
        found.push({ n: frame.stepN, start: frame.start, end: start + text.length });
      }
      continue;
    }

    // An opening tag `<g …>` or a self-closing `<g …/>`. Self-closing tags
    // never open a scope — they must NOT be pushed, or the depth count for
    // every subsequent "</g>" would be off by one.
    const idMatch = text.match(/\bid="step-(\d+)"/);
    const stepN = idMatch ? parseInt(idMatch[1], 10) : null;
    if (/\/>\s*$/.test(text)) {
      if (stepN !== null) found.push({ n: stepN, start, end: start + text.length });
      continue;
    }
    stack.push({ start, stepN });
  }

  found.sort((a, b) => a.start - b.start);
  const groups = new Map<number, string>();
  let template = "";
  let cursor = 0;
  for (const f of found) {
    template += svg.slice(cursor, f.start);
    groups.set(f.n, svg.slice(f.start, f.end)); // last write wins on a duplicate id
    cursor = f.end;
  }
  template += svg.slice(cursor);

  return { template, groups };
}

/** Inject (or refresh) `opacity="<value>"` on a group's own opening tag. */
function withOpacity(markup: string, opacity: number): string {
  return markup.replace(
    /^(<g\b[^>]*?)(\s*\/?)(>)/,
    (_, head: string, selfClose: string, gt: string) => {
      const stripped = head.replace(/\s+opacity="[^"]*"/, "");
      return `${stripped} opacity="${opacity}"${selfClose}${gt}`;
    }
  );
}

/**
 * Reassemble a figure: kept groups are appended, in ascending order, right
 * before `</svg>` — for these figures the step groups are already each
 * other's only siblings in authored order, so "base SVG (everything outside
 * step groups) + groups 1..current" (§2.3) reconstructs the original figure
 * exactly. `keepUpTo === null` keeps every group (reduced-motion / print);
 * groups above it are simply never appended — real DOM absence, not hiding.
 * `dimBelowStage === null` dims nothing (reduced-motion / print: "no other
 * treatment").
 */
export function assembleSvg(
  extracted: ExtractedStepGroups,
  keepUpTo: number | null,
  dimBelowStage: number | null
): string {
  const numbers = Array.from(extracted.groups.keys()).sort((a, b) => a - b);
  let appended = "";
  for (const n of numbers) {
    if (keepUpTo !== null && n > keepUpTo) continue;
    const raw = extracted.groups.get(n) as string;
    appended += dimBelowStage !== null && n < dimBelowStage ? withOpacity(raw, 0.55) : raw;
  }
  const closeIdx = extracted.template.lastIndexOf("</svg>");
  if (closeIdx === -1) return extracted.template + appended; // malformed SVG — never throws
  return extracted.template.slice(0, closeIdx) + appended + extracted.template.slice(closeIdx);
}

