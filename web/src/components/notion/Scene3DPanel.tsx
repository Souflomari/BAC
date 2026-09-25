"use client";

/**
 * Scene3DPanel — l'aiguillage des scènes manipulables (ADR 0041).
 *
 * Le marqueur est `[[embed:<slug>]]`, comme tout manipulable ; le descripteur
 * `media/<slug>.json` porte `"tool": "scene3d"` et nomme sa scène. Chaque
 * scène a SON panneau (ses contrôles, ses lectures, ses conditions) bâti sur
 * les pièces communes de `./scene/` : ouverture au clic, cycle de vie du
 * rendu, pari, vues, transport, plateau collant. Une scène inconnue ne rend
 * rien — `validate-content` l'interdit en échec dur avant qu'elle n'arrive ici.
 */

import type { Scene3DDescriptor } from "@/lib/content";
import { ChampMagnetiquePanel } from "./scene/ChampMagnetiquePanel";
import { CordePanel } from "./scene/CordePanel";
import { CuvePanel } from "./scene/CuvePanel";
import { DiffractionPanel } from "./scene/DiffractionPanel";
import { TremplinPanel } from "./scene/TremplinPanel";
import { ManegePanel } from "./scene/ManegePanel";
import { ModulationPanel } from "./scene/ModulationPanel";
import { ElectrolysePanel } from "./scene/ElectrolysePanel";
import { NoyauxPanel } from "./scene/NoyauxPanel";
import { OrbiteGeostationnairePanel } from "./scene/OrbiteGeostationnairePanel";
import { SpherePlanDroitePanel } from "./scene/SpherePlanDroitePanel";
import { RevolutionPanel } from "./scene/RevolutionPanel";
import { VectorielPanel } from "./scene/VectorielPanel";
import { PlanComplexePanel } from "./scene/PlanComplexePanel";

const PANNEAUX: Record<string, React.ComponentType<{ scene: Scene3DDescriptor; className?: string }>> = {
  "orbite-geostationnaire": OrbiteGeostationnairePanel,
  "sphere-plan-droite": SpherePlanDroitePanel,
  "particule-champ-magnetique": ChampMagnetiquePanel,
  "produit-vectoriel": VectorielPanel,
  "solide-revolution": RevolutionPanel,
  "manege-rotation": ManegePanel,
  // Le premier manipulable PLAN sur ces pièces (`"tool": "scene2d"`) : ni
  // caméra, ni three.js — la diffraction dans une cuve est un phénomène plan
  // (ADR 0041, première correction).
  "cuve-a-ondes": CuvePanel,
  // Le deuxième : une corde vue de côté, ANALYTIQUE (une translation, aucun
  // solveur) — la photo de la corde et le film d'un point (spec-scene-corde).
  "corde-photo-film": CordePanel,
  // Le troisième : une courbe de décroissance sur le quadrillage du bac, et une
  // grille de noyaux qui tirent leur désintégration au sort — DEUX voies de
  // calcul, la loi et le tirage (spec-scene-noyaux).
  "courbe-et-noyaux": NoyauxPanel,
  // Le quatrième : un banc d'optique, sans temps ni course — la révélation pose
  // le réglage que le pari interrogeait, et la règle répond.
  "banc-de-diffraction": DiffractionPanel,
  "tremplin-circulaire": TremplinPanel,
  // Le sixième : un multiplieur et un écran d'oscilloscope, sans temps ni course —
  // la révélation de S4 BRANCHE l'étage de détection (spec-scene-modulation).
  "banc-de-modulation": ModulationPanel,
  // Le septième : la paillasse de la leçon — la tension décide du SENS, la charge I·Δt de la
  // QUANTITÉ, et une balance mesure la constante de Faraday (spec-scene-electrolyse).
  "banc-electrolyse": ElectrolysePanel,
  // Le huitième, et le premier des mathématiques en plan : un point, un coefficient, un
  // centre — le rapport, l'angle comme ÉCART, le centre comme point fixe (spec
  // docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md). Tout y est EXACT.
  "plan-complexe-transformation": PlanComplexePanel,
};

export function Scene3DPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const Panneau = PANNEAUX[scene.scene];
  return Panneau ? <Panneau scene={scene} className={className} /> : null;
}
