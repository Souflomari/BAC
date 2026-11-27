"use client";

/** La scène FERMÉE : une carte calme, un seul bouton (opt-in, comme EmbedPanel). */
import { cn } from "@/lib/utils";
import { MathText } from "../ChoiceButton";
import { useHydrated } from "@/lib/useHydrated";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InteractiveIcon, PlayIcon } from "@/components/ui/Icon";

export function SceneOptIn({
  sceneId,
  titre,
  legende,
  onOuvrir,
  className,
  surtitre = "Scène 3D",
  libelleOuvrir = "Ouvrir la scène 3D",
}: {
  sceneId: string;
  titre?: string;
  legende?: string;
  onOuvrir: () => void;
  className?: string;
  /** « Scène 3D » ; « Simulation » pour la cuve, qui n'est pas en 3D (ADR 0041) */
  surtitre?: string;
  libelleOuvrir?: string;
}) {
  // Désactivé et `aria-busy` tant que React n'a pas la main (ADR 0032).
  const hydrated = useHydrated();
  return (
    <div className={cn("my-10 notion-wide-band print:hidden", className)} data-scene={sceneId} data-scene-etat="ferme">
      <Eyebrow tone="muted" decorative className="mb-3">
        {surtitre}
      </Eyebrow>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          "w-full rounded-xl bg-surface-raised shadow-elevation-1",
          "px-8 py-14 text-center"
        )}
      >
        <InteractiveIcon size={36} className="text-border-soft" />
        <div className="flex flex-col gap-1">
          {/* le titre et la légende passent par le moteur de formules (§11.210) : la carte
              fermée du plan complexe affichait « rayon $1$, et un point $M$ » tel quel — la
              première chose que l'élève voit de la scène */}
          <p className="text-body-sm font-medium text-secondary">
            <MathText>{titre ?? "Scène manipulable"}</MathText>
          </p>
          {/* ALIGNÉE À GAUCHE dans un bloc centré : au-delà de deux ou trois lignes, un
              paragraphe centré n'a plus de bord fixe où revenir (la légende du tremplin
              fait quinze lignes au téléphone) ; une légende d'une ligne, dont la boîte
              épouse le texte, reste centrée (vague 2 du banc d'électrolyse, dessin et
              ergonomie) */}
          {legende && (
            <p className="mx-auto text-left text-caption text-secondary max-w-[52ch] leading-relaxed">
              <MathText>{legende}</MathText>
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onOuvrir}
          disabled={!hydrated}
          aria-busy={!hydrated || undefined}
          className={cn("btn-primary", "focus-ring")}
        >
          <PlayIcon size={14} />
          {libelleOuvrir}
        </button>
      </div>
    </div>
  );
}
