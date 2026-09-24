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
import { aireSousCourbe } from "./aire-sous-courbe";
import { racinesUnite } from "./racines-unite";
import { suiteEscalier } from "./suite-escalier";
import { asymptotes } from "./asymptotes";
import { distributionCurseurPH } from "./distribution-curseur-pH";
import { eulerTailleDePas } from "./euler-taille-de-pas";
import { sandboxChuteFrottement } from "./sandbox-chute-frottement";

const REGISTRY: Record<string, InteractiveFigureModel> = {
  "tangente-derivee": tangenteDerivee,
  "aire-sous-courbe": aireSousCourbe,
  "racines-unite": racinesUnite,
  "suite-escalier": suiteEscalier,
  asymptotes,
  "distribution-curseur-pH": distributionCurseurPH,
  "euler-taille-de-pas": eulerTailleDePas,
  "sandbox-chute-frottement": sandboxChuteFrottement,
};

export function getInteractiveFigureModel(slug: string): InteractiveFigureModel | undefined {
  return REGISTRY[slug];
}

export type { InteractiveFigureModel, RecomputeResult } from "./types";
