/**
 * /options/figtext/[v] — MP-V1 step-text legibility candidates (owner
 * decision aid; TEMPORARY — deleted after the owner's pick, same lifecycle
 * as /options/wide and /options/masthead).
 *
 * Owner finding (mastery-push-plan.md, Lane V1): "the writing that explains
 * the steps is too small beneath the interactive visuals and not visible
 * enough" — the stage explanation IS the teaching and must read as primary
 * text, not as a caption.
 *
 *   a1 — promote in place: body scale, primary tone, below the figure.
 *        Minimal change, maximal legibility.
 *   a2 — lede treatment: body-lg reading serif with the stage number as a
 *        small accent ordinal beside it. More presence.
 *   a3 — side-by-side at the wide tier (≥1280px): the text sits beside the
 *        figure, vertically centered on the active stage; a1's below-figure
 *        treatment on narrow viewports.
 *
 * All render the REAL limites-continuité notion (6 staged figures, one with
 * a drag-point manipulation — asymptotes, chapter 2). The default notion
 * surface is byte-identical: the variant flag exists only on this route.
 * On the owner's pick the winner is encoded in DESIGN-BIBLE + TOKENS with
 * same-commit dom-truth updates (the plan's step V1.1).
 */

import { notFound } from "next/navigation";
import { NotionPageView } from "@/components/notion/NotionPageView";
import type { FigTextOption } from "@/components/notion/StagedFigure";

const VARIANTS: FigTextOption[] = ["a1", "a2", "a3"];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v }));
}

export default function FigTextOptionPage({
  params,
}: {
  params: { v: string };
}) {
  const v = params.v as FigTextOption;
  if (!VARIANTS.includes(v)) notFound();
  return <NotionPageView id="maths/limites-continuite" figTextOption={v} />;
}
