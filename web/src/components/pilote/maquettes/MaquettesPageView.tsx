"use client";

import { useState } from "react";
import { MaquetteMeiose } from "./MaquetteMeiose";
import { MaquetteMeioseCrossing } from "./MaquetteMeioseCrossing";
import { MaquetteDipoleRc } from "./MaquetteDipoleRc";
import { MaquetteDipoleRcDecharge } from "./MaquetteDipoleRcDecharge";
import { MaquetteSuites } from "./MaquetteSuites";
import { MaquetteLogarithme } from "./MaquetteLogarithme";
import { MaquetteExponentielle } from "./MaquetteExponentielle";
import { MaquetteExponentielleMiroir } from "./MaquetteExponentielleMiroir";
import { MaquetteRadioactivite } from "./MaquetteRadioactivite";
import { MaquetteNoyaux } from "./MaquetteNoyaux";
import { MaquetteExpressionGenetique } from "./MaquetteExpressionGenetique";
import { MaquetteTransmission } from "./MaquetteTransmission";
import { MaquetteTransmissionLies } from "./MaquetteTransmissionLies";
import { useHydrated } from "@/lib/useHydrated";
import { ty } from "./outils";

type OngletId =
  | "meiose"
  | "meiose-crossing"
  | "dipole-rc"
  | "dipole-rc-decharge"
  | "suites"
  | "logarithme"
  | "exponentielle"
  | "exponentielle-miroir"
  | "radioactivite"
  | "noyaux"
  | "expression-genetique"
  | "transmission"
  | "transmission-lies";

const ONGLETS: { id: OngletId; label: string; matiere: string }[] = [
  { id: "meiose", label: "Méiose I", matiere: "SVT" },
  { id: "meiose-crossing", label: "Crossing-over", matiere: "SVT" },
  { id: "dipole-rc", label: "Dipôle RC", matiere: "PC" },
  { id: "dipole-rc-decharge", label: "RC décharge", matiere: "PC" },
  { id: "suites", label: "Suites", matiere: "Maths" },
  { id: "logarithme", label: "Logarithme", matiere: "Maths" },
  { id: "exponentielle", label: "Exponentielle", matiere: "Maths" },
  { id: "exponentielle-miroir", label: "Miroir ln / exp", matiere: "Maths" },
  { id: "radioactivite", label: "Radioactivité", matiere: "PC" },
  { id: "noyaux", label: "Noyaux Δm", matiere: "PC" },
  { id: "expression-genetique", label: "Cadre lecture", matiere: "SVT" },
  { id: "transmission", label: "Échiquier", matiere: "SVT" },
  { id: "transmission-lies", label: "Gènes liés", matiere: "SVT" },
];

export function MaquettesPageView() {
  const [onglet, setOnglet] = useState<OngletId>("meiose");
  // Aucune commande active dans le HTML prérendu (dom-truth) : les maquettes n'existent qu'une fois
  // la page prise en main par React, on ne sert donc aucun bouton avant.
  const pret = useHydrated();
  if (!pret) {
    return (
      <p className="text-body-sm text-secondary" aria-busy="true">
        {ty("Chargement des maquettes…")}
      </p>
    );
  }

  return (
    <div className="mq-page space-y-6">
      {/* Sélecteur des 13 maquettes : grille 3 colonnes sur téléphone, wrap fluide sur ordinateur */}
      <nav
        aria-label={ty("Choix de la maquette animée")}
        className="grid grid-cols-3 gap-1.5 bp-medium:flex bp-medium:flex-wrap bp-medium:gap-2"
      >
        {ONGLETS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            aria-pressed={onglet === tab.id}
            onClick={() => setOnglet(tab.id)}
            className="mq-seg px-2 bp-medium:px-3.5 text-caption bp-medium:text-body-sm"
          >
            <span className="hidden bp-medium:inline font-mono text-caption text-tertiary mr-1.5">{tab.matiere}</span>
            <span>{ty(tab.label)}</span>
          </button>
        ))}
      </nav>

      {onglet === "meiose" && <MaquetteMeiose />}
      {onglet === "meiose-crossing" && <MaquetteMeioseCrossing />}
      {onglet === "dipole-rc" && <MaquetteDipoleRc />}
      {onglet === "dipole-rc-decharge" && <MaquetteDipoleRcDecharge />}
      {onglet === "suites" && <MaquetteSuites />}
      {onglet === "logarithme" && <MaquetteLogarithme />}
      {onglet === "exponentielle" && <MaquetteExponentielle />}
      {onglet === "exponentielle-miroir" && <MaquetteExponentielleMiroir />}
      {onglet === "radioactivite" && <MaquetteRadioactivite />}
      {onglet === "noyaux" && <MaquetteNoyaux />}
      {onglet === "expression-genetique" && <MaquetteExpressionGenetique />}
      {onglet === "transmission" && <MaquetteTransmission />}
      {onglet === "transmission-lies" && <MaquetteTransmissionLies />}
    </div>
  );
}
