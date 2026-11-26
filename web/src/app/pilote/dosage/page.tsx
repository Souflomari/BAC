/**
 * /pilote/dosage : la leçon pilote de chimie « Le dosage acido-basique » (format v3).
 */

import type { Metadata } from "next";
import "../logarithme/pilote.css";
import "./dosage.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { LienEvitement } from "@/components/ui/LienEvitement";
import { DosagePilote } from "@/components/pilote/DosagePilote";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/pilote/dosage" },
  title: "Le dosage acido-basique : la leçon",
  description:
    "Pourquoi deux gouttes font-elles virer tout le bécher ? Réaction totale du dosage, équivalence, courbe pH = f(V_B), tangentes et dérivée, demi-équivalence, indicateur coloré, dilution et sujets du bac.",
};

export default function PiloteDosagePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-base">
      <LienEvitement />
      <SiteHeader
        container={cn("w-full mx-auto px-gutter", "max-w-page")}
        notions={manifestePourHeader()}
        epreuves={manifesteEpreuves()}
      />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <DosagePilote />
      </main>
    </div>
  );
}
