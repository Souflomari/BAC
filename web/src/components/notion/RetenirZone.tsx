"use client";

/**
 * RetenirZone — la colonne « à retenir », à droite, au palier ≥1536px.
 *
 * LESSON-EXPERIENCE-SPEC §3.2, item 1 de l'ordre de travail post-Fable.
 * Adaptée du candidat W3 `KeyFormulaRail` (qui reste intact pour l'historique
 * des routes `/options/wide/*`), avec UNE différence de fond :
 *
 *   W3 suivait le défilement (scroll-spy sur les titres). Ici, la leçon est
 *   PAGINÉE : le chapitre courant est un fait, pas une inférence. La zone lit
 *   `useChapter()` et prend la carte de cet index. Pas d'écouteur de scroll,
 *   pas de ligne de lecture, pas de requestAnimationFrame — donc rien qui
 *   puisse désigner un chapitre différent de celui que l'élève lit.
 *
 * ÉTAT HONNÊTE. Les cartes sont calculées au build (lib/retenir.ts) : sidecar
 * authoré d'abord, à défaut la première formule détachée du chapitre, sinon
 * RIEN. Un chapitre sans carte ne rend aucun conteneur — pas de cadre vide,
 * pas de « — », pas de squelette. Le calme vaut mieux que le remplissage, et
 * une colonne qui se tait dit la vérité sur ce chapitre.
 *
 * `aria-hidden` : la formule est DÉJÀ dans la prose du chapitre, à sa place,
 * lue dans son contexte. La reprendre dans le flux d'un lecteur d'écran la
 * ferait entendre deux fois sans rien ajouter. La zone est un repère visuel
 * périphérique — comme le rail de gauche, qui suit la même politique.
 */

import katex from "katex";
import { useChapter } from "./ChapterShell";
import type { RetenirCarte } from "@/lib/retenir";

export function RetenirZone({ cartes }: { cartes: (RetenirCarte | null)[] }) {
  const { current } = useChapter();
  const carte = cartes[current] ?? null;

  // Rien pour ce chapitre : rien du tout. Le conteneur de grille existe
  // toujours (il tient la colonne), mais il reste vide.
  return (
    <div className="notion-retenir" aria-hidden="true" data-retenir-zone>
      {carte && (
        <aside
          data-retenir-carte
          data-retenir-source={carte.source}
          className="rounded-lg border border-subtle bg-surface-raised px-5 py-4"
        >
          <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
            À retenir
          </p>
          {carte.titre && (
            <p className="mt-1 text-body-sm font-medium text-primary">{carte.titre}</p>
          )}
          <div
            className="mt-2 overflow-x-auto text-[15px] text-primary"
            dangerouslySetInnerHTML={{
              __html: katex.renderToString(carte.formula, {
                throwOnError: false,
                displayMode: false,
              }),
            }}
          />
          {carte.note && (
            <p className="mt-2 text-caption leading-relaxed text-secondary">{carte.note}</p>
          )}
        </aside>
      )}
    </div>
  );
}
