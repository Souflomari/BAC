"use client";

/**
 * L'encadré repliable d'une scène — « ce que cette scène simplifie ».
 *
 * UNE COMMANDE, PAS UNE LIGNE DE TEXTE (vague 2 des noyaux, 2026-09-24). Le
 * `<summary>` nu mesurait 18 px de haut dans la cuve, la corde et les noyaux :
 * la seule commande de la colonne sous le plancher de 48 px (DESIGN-BIBLE §9),
 * et la porte ergonomie ne la voyait pas — elle ne cherchait que `button` et
 * `input`. Ici, la cible de la bible, le lavis et l'anneau de focus de la
 * maison, et un chevron qui dit qu'il s'ouvre (le triangle natif disparaît avec
 * `display: flex`). Une seule définition pour les trois scènes qui en ont un.
 */
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { frenchTypography } from "@/lib/frenchTypography";

export function EncadreRepli({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <details className="group text-caption text-secondary">
      <summary className="state-layer focus-ring -mx-2 flex min-h-touch w-fit cursor-pointer select-none list-none items-center gap-1.5 rounded-md px-2 [--focus-radius:8px] [&::-webkit-details-marker]:hidden">
        <Icon name="chevron-right" size={14} className="shrink-0 transition-transform duration-micro ease-enter group-open:rotate-90" />
        {frenchTypography(titre)}
      </summary>
      <p className="mt-1">{children}</p>
    </details>
  );
}
