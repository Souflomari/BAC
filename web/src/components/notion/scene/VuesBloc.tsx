"use client";

/**
 * Les vues prédéfinies — l'équivalent clavier du glisser. Rendues à DEUX
 * endroits selon la largeur, jamais les deux à la fois (`display: none` les
 * retire de l'arbre d'accessibilité et de l'ordre de tabulation) : sous la
 * scène collante sur grand écran, après les réglages au téléphone.
 */
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import type { Vue } from "./commun";

export function VuesBloc<N extends string>({
  vues,
  vue,
  onVue,
  visibilite,
}: {
  vues: Record<N, Vue>;
  vue: N | null;
  onVue: (n: N) => void;
  visibilite: string;
}) {
  return (
    <div
      className={cn(
        "flex-wrap items-center gap-2",
        "[&_button]:scroll-mt-[calc(3.5rem+75vw+1rem)] bp-expanded:[&_button]:scroll-mt-24",
        visibilite
      )}
      role="group"
      aria-label="Orientation de la vue"
    >
      <span className="text-caption text-secondary">{frenchTypography("Vue :")}</span>
      {(Object.keys(vues) as N[]).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={vue === v}
          onClick={() => onVue(v)}
          className={cn(
            TRANSPORT_BTN_CLASS,
            // Enfoncé : fond, encre ET graisse — jamais la couleur seule (§9).
            vue === v && "bg-surface-container-high border-soft text-primary font-semibold"
          )}
        >
          {vues[v].libelle}
        </button>
      ))}
    </div>
  );
}
