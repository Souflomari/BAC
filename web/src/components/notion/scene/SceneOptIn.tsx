"use client";

/** La scène FERMÉE : une carte calme, un seul bouton (opt-in, comme EmbedPanel). */
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { useHydrated } from "@/lib/useHydrated";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InteractiveIcon, PlayIcon } from "@/components/ui/Icon";

export function SceneOptIn({
  sceneId,
  titre,
  legende,
  onOuvrir,
  className,
}: {
  sceneId: string;
  titre?: string;
  legende?: string;
  onOuvrir: () => void;
  className?: string;
}) {
  // Désactivé et `aria-busy` tant que React n'a pas la main (ADR 0032).
  const hydrated = useHydrated();
  return (
    <div className={cn("my-10 notion-wide-band print:hidden", className)} data-scene={sceneId} data-scene-etat="ferme">
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
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
          <p className="text-body-sm font-medium text-secondary">{frenchTypography(titre ?? "Scène manipulable")}</p>
          {legende && (
            <p className="text-caption text-secondary max-w-[52ch] leading-relaxed">{frenchTypography(legende)}</p>
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
          Ouvrir la scène 3D
        </button>
      </div>
    </div>
  );
}
