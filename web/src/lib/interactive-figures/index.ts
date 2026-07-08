/**
 * Slug -> InteractiveFigureModel registry (docs/design/INTERACTIVE-FIGURE-SPEC.md
 * §2.2). Same shape as MediaDiagram.tsx's STRUCTURAL_SLUGS/
 * VERTICALLY_STACKED_PANELS — a small named registry in app source, not a
 * dynamic import, so an unregistered slug degrades gracefully (StagedFigure
 * renders the plain staged figure, no manipulation, no error) rather than
 * throwing at build or render time.
 */

import type { InteractiveFigureModel } from "./types";
import { tangenteDerivee } from "./tangente-derivee";

const REGISTRY: Record<string, InteractiveFigureModel> = {
  "tangente-derivee": tangenteDerivee,
};

export function getInteractiveFigureModel(slug: string): InteractiveFigureModel | undefined {
  return REGISTRY[slug];
}

export type { InteractiveFigureModel, RecomputeResult } from "./types";
