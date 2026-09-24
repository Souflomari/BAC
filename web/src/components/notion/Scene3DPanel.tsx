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
import { ManegePanel } from "./scene/ManegePanel";
import { OrbiteGeostationnairePanel } from "./scene/OrbiteGeostationnairePanel";
import { SpherePlanDroitePanel } from "./scene/SpherePlanDroitePanel";
import { RevolutionPanel } from "./scene/RevolutionPanel";
import { VectorielPanel } from "./scene/VectorielPanel";

const PANNEAUX: Record<string, React.ComponentType<{ scene: Scene3DDescriptor; className?: string }>> = {
  "orbite-geostationnaire": OrbiteGeostationnairePanel,
  "sphere-plan-droite": SpherePlanDroitePanel,
  "particule-champ-magnetique": ChampMagnetiquePanel,
  "produit-vectoriel": VectorielPanel,
  "solide-revolution": RevolutionPanel,
  "manege-rotation": ManegePanel,
};

export function Scene3DPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const Panneau = PANNEAUX[scene.scene];
  return Panneau ? <Panneau scene={scene} className={className} /> : null;
}
