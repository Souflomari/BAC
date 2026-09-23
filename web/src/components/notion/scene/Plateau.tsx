"use client";

/**
 * Le plateau : la scène COLLANTE et ses états.
 *
 * Collante à toutes les largeurs : quand les réglages s'allongent (un pari,
 * son retour, le temps, le contrôle, les lectures), l'image qu'on change
 * reste sous les yeux. Au téléphone, sous le header (56 px) et en 4:3 pour
 * laisser ~400 px aux réglages qui défilent dessous ; en carré sur grand
 * écran, où la caméra cadre une sphère.
 *
 * Le fond du conteneur EST la surface des figures (pas de saut de ton entre
 * le chargement et la première image) ; élévation 1, comme les figures figées.
 */
import type React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import type { EtatPanneau } from "./commun";

export function Plateau({
  hoteRef,
  canvasRef,
  panneau,
  description,
  glisser,
  legende,
  messageSansWebgl,
  onRelancer,
  vues,
  children,
}: {
  hoteRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  panneau: EtatPanneau;
  /** ce que le lecteur d'écran entend : la scène décrite en mots */
  description: string;
  glisser: {
    onPointerDown: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerMove: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerUp: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerCancel: React.PointerEventHandler<HTMLCanvasElement>;
  };
  /** l'étiquette posée en haut à gauche de la scène (référentiel, mode…) */
  legende?: React.ReactNode;
  /** sans WebGL : ce qui reste, et où trouver la figure figée */
  messageSansWebgl: string;
  onRelancer: () => void;
  /** les vues (grand écran), sous la scène */
  vues?: React.ReactNode;
  /** les étiquettes HTML posées sur la scène (N, P, H…) */
  children?: React.ReactNode;
}) {
  return (
    <div className="sticky top-14 z-10 bp-expanded:top-20 bp-expanded:self-start">
      <div
        ref={hoteRef}
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          "bg-figure-surface shadow-elevation-1",
          "aspect-[4/3] bp-expanded:aspect-square"
        )}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={description}
          className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          {...glisser}
        />
        {children}
        {legende && <p className="pointer-events-none absolute left-3 top-2 text-caption text-secondary">{legende}</p>}

        {panneau === "chargement" && (
          <div className="absolute inset-0 flex items-center justify-center bg-figure-surface">
            <p className="text-caption text-secondary">Chargement de la scène…</p>
          </div>
        )}
        {(panneau === "sans-webgl" || panneau === "erreur") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-figure-surface px-6 text-center">
            <p className="text-body-sm text-secondary max-w-[44ch]">
              {panneau === "sans-webgl" ? messageSansWebgl : "La scène 3D s’est interrompue."}
            </p>
            {panneau === "erreur" && (
              <button type="button" className={TRANSPORT_BTN_CLASS} onClick={onRelancer}>
                <Icon name="reset" size={13} />
                Relancer la scène
              </button>
            )}
          </div>
        )}
      </div>
      {vues && <div className="mt-3">{vues}</div>}
    </div>
  );
}

/**
 * Une étiquette HTML posée sur la scène, placée par le rendu à chaque image.
 * `texte` pour une lettre (N, P, S…) ; `children` pour une notation qui passe
 * par KaTeX (un vecteur, $\vec F$) — la même écriture que la leçon.
 */
export function Etiquette({
  refEl,
  texte,
  nom,
  children,
}: {
  refEl: React.RefObject<HTMLSpanElement>;
  texte?: string;
  /** un nom stable pour les portes, qui lisent l'étiquette sans deviner son rendu KaTeX */
  nom?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      ref={refEl}
      data-etiquette={nom ?? texte}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 whitespace-nowrap text-caption font-semibold text-primary"
      style={{ visibility: "hidden" }}
    >
      {children ?? texte}
    </span>
  );
}

/** Pose une étiquette sur sa projection (pixels CSS du canvas). */
export function poser(el: HTMLSpanElement | null, p: { x: number; y: number; visible: boolean }, decalageY = "-50%") {
  if (!el) return;
  el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, ${decalageY})`;
  el.style.visibility = p.visible ? "visible" : "hidden";
}
