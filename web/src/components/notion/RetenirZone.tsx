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

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

// Même garde isomorphe que ChapterShell : Next rend les composants « use
// client » côté serveur pour le HTML initial, et React s'y plaint de
// useLayoutEffect.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { useChapter } from "./ChapterShell";
import type { RetenirCarte } from "@/lib/retenir";

export function RetenirZone({ cartes }: { cartes: (RetenirCarte | null)[] }) {
  const { current } = useChapter();
  const carte = cartes[current] ?? null;

  /**
   * METTRE LA FORMULE À LA TAILLE DE LA COLONNE.
   *
   * La colonne fait 264 px. KaTeX ne sait pas se réduire tout seul : une
   * intégration par parties mesure 331 px et se faisait COUPER au bord de la
   * carte — l'élève voyait une formule tronquée sans rien pour le lui dire,
   * ce qui est exactement le genre de demi-vérité que la zone doit éviter.
   *
   * On mesure après rendu et on applique un facteur d'échelle, avec un
   * PLANCHER à 0,78 : en dessous, le texte mathématique tombe sous ~10 px et
   * cesse d'être lisible — mieux vaut alors laisser défiler que rendre
   * illisible. La hauteur du conteneur est corrigée du même facteur, sans
   * quoi la mise à l'échelle laisserait un blanc sous la formule.
   */
  const boite = useRef<HTMLDivElement>(null);
  /**
   * Et si, même au plancher, la formule ne tient toujours pas ? On ne la
   * montre PAS. Une intégration par parties mesure 331 px dans une colonne
   * de 264 : réduite à 0,78 elle dépasse encore de 109 px, et la carte
   * servait alors une formule COUPÉE au bord, sans rien pour le signaler.
   * C'est la demi-vérité que toute cette zone est censée refuser. Silence.
   */
  const [tropLarge, setTropLarge] = useState(false);
  useIsoLayoutEffect(() => {
    const hote = boite.current;
    if (!hote) return;
    const formule = hote.firstElementChild as HTMLElement | null;
    if (!formule) return;
    formule.style.transform = "";
    hote.style.height = "";
    // KaTeX rend un <span class="katex"> — un élément EN LIGNE, dont
    // clientWidth et scrollWidth valent 0. Première version : la mise à
    // l'échelle ne s'appliquait jamais, et rien ne le disait. On force
    // inline-block (indispensable aussi pour que `transform` prenne effet sur
    // un élément en ligne) et on mesure la boîte réelle.
    formule.style.display = "inline-block";
    const dispo = hote.clientWidth;
    const naturel = formule.getBoundingClientRect().width;
    if (!dispo || !naturel || naturel <= dispo) {
      setTropLarge(false);
      return;
    }
    const k = Math.max(0.78, dispo / naturel);
    formule.style.transformOrigin = "left top";
    formule.style.transform = `scale(${k})`;
    hote.style.height = `${Math.ceil(formule.getBoundingClientRect().height * k)}px`;
    setTropLarge(naturel * k > dispo + 1);
  }, [carte]);

  // Rien pour ce chapitre : rien du tout. Le conteneur de grille existe
  // toujours (il tient la colonne), mais il reste vide.
  return (
    <div className="notion-retenir" aria-hidden="true" data-retenir-zone>
      {carte && (
        <aside
          data-retenir-carte
          data-retenir-source={carte.source}
          // `hidden` plutôt que démontage : le nœud doit rester mesurable pour
          // que l'effet puisse ré-évaluer si la colonne change (thème, zoom,
          // fenêtre redimensionnée) — et `[hidden]` retire la carte du rendu
          // ET des mesures du harnais, donc l'état honnête reste vérifiable.
          hidden={tropLarge}
          className="rounded-lg border border-subtle bg-surface-raised px-5 py-4"
        >
          {/* LE TITRE DIT SA SOURCE, et c'est délibéré.
              Une carte AUTHORÉE (sidecar) affirme « à retenir » : quelqu'un a
              choisi cette formule comme le résultat du chapitre. Une carte de
              REPLI n'a pas ce droit — elle a pris la première formule
              détachée qui tienne debout, ce qui donne le plus souvent la
              bonne, mais parfois un exemple travaillé (« lim(2x+1) = 7 »).
              Écrire « À RETENIR » au-dessus de celle-là serait un mensonge
              d'étiquette. Elle annonce donc ce qu'elle est : la formule du
              chapitre. Deux mots, et la colonne cesse de sur-promettre. */}
          <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
            {carte.source === "sidecar" ? "À retenir" : "Formule du chapitre"}
          </p>
          {carte.titre && (
            <p className="mt-1 text-body-sm font-medium text-primary">{carte.titre}</p>
          )}
          {/* La colonne fait 264 px : une intégrale un peu longue la déborde.
              KaTeX ne sait pas se réduire tout seul, alors on descend d'un
              cran ou deux selon la longueur de la source — mesuré sur le
              corpus, cela fait tenir la quasi-totalité des formules. Ce qui
              dépasse encore défile horizontalement plutôt que d'être coupé,
              et la carte ne prétend jamais montrer ce qu'elle tronque. */}
          <div
            ref={boite}
            className={cn(
              "mt-2 overflow-x-auto text-primary",
              carte.formula.length > 70
                ? "text-[12.5px]"
                : carte.formula.length > 45
                  ? "text-[13.5px]"
                  : "text-[15px]"
            )}
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
