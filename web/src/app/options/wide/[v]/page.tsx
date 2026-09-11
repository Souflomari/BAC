/**
 * /options/wide/[v] — Day-8 wide-viewport composition candidates (owner
 * decision aid; TEMPORARY — deleted after the owner's Set-M/Set-W picks,
 * same lifecycle as /options/masthead and /options/home).
 *
 *   Set M (masthead completion):   m1 cover-in-band · m2 bounded band ·
 *                                  m3 motif watermark
 *   Set W (wide-content strategy): w1 margin notes · w2 symmetric re-center
 *                                  + earned full-bleed · w3 key-formula rail
 *
 * All render the REAL RLC notion. The W-mock data below is REAL lesson
 * content (verbatim formulas and definitions), hand-anchored for the demo;
 * a pick converts the channel into authored content (template v2 field).
 */

import { notFound } from "next/navigation";
import {
  NotionPageView,
  type WideOption,
} from "@/components/notion/NotionPageView";
import type { MarginNote } from "@/components/notion/MarginNotes";
import type { KeyFormula } from "@/components/notion/KeyFormulaRail";

const VARIANTS: WideOption[] = ["m1", "m2", "m3", "w1", "w2", "w3"];

// Toutes les valeurs valides sont connues au build (generateStaticParams) ;
// une adresse inconnue reçoit alors la page « introuvable » PRÉRENDUE — en-tête,
// message, liens — au lieu d'un HTML vide que seul le JavaScript remplit
// (HANDOFF §11.32 : sur 3G lente, un élève au lien périmé regardait une page
// blanche 10 à 20 s ; sans JavaScript, pour toujours).
export const dynamicParams = false;

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v }));
}

// W1 — expert asides + key definitions (verbatim from the lesson).
const MARGIN_NOTES: MarginNote[] = [
  {
    rung: "R1",
    label: "Définition",
    html: "Le courant est le <em>débit de charge</em> : i&nbsp;=&nbsp;dq/dt. Quand le condensateur se décharge, q diminue — le signe de i dit le sens réel.",
  },
  {
    rung: "R2",
    label: "Le geste expert",
    html: "On ne « résout » pas l’équation à froid : on <em>devine</em> une forme (le cosinus), puis on <em>vérifie</em> par substitution. C’est la méthode au programme.",
  },
  {
    rung: "R5",
    label: "Pourquoi on s’arrête",
    html: "Résoudre l’équation amortie demande des outils hors programme. On l’établit, on la lit — on ne la résout pas.",
  },
  {
    rung: "R7",
    label: "L’image à garder",
    html: "L’entretien, c’est remplir le seau percé exactement au débit où il fuit — le rythme reste celui du seau (L et C), jamais celui du robinet.",
  },
];

// W3 — the current section's key formula (verbatim boxed results).
const KEY_FORMULAS: KeyFormula[] = [
  { rung: "R1", title: "Énergie totale (cas idéal)", tex: "E = \\tfrac{1}{2}Cu_C^2 + \\tfrac{1}{2}Li^2 = \\text{cte}" },
  { rung: "R2", title: "Période propre", tex: "T_0 = 2\\pi\\sqrt{LC}" },
  { rung: "R3", title: "Effet Joule", tex: "P = Ri^2 > 0" },
  { rung: "R4", title: "Amortissement faible", tex: "T \\approx T_0 = 2\\pi\\sqrt{LC}" },
  { rung: "R5", title: "Équation amortie (on s’arrête là)", tex: "Lq'' + Rq' + \\tfrac{q}{C} = 0" },
  { rung: "R7", title: "Condition d’entretien", tex: "k = R" },
];

export default function WideOptionPage({
  params,
}: {
  params: { v: string };
}) {
  const v = params.v as WideOption;
  if (!VARIANTS.includes(v)) notFound();
  return (
    <NotionPageView
      id="pc/rlc-serie"
      wideOption={v}
      marginNotes={v === "w1" ? MARGIN_NOTES : undefined}
      keyFormulas={v === "w3" ? KEY_FORMULAS : undefined}
    />
  );
}
