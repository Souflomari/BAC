"use client";

/**
 * Le titre et la consigne de l'étape — AVANT la scène : on lit, puis on
 * manipule. La consigne passe par MathText (KaTeX + typographie française) :
 * une consigne de maths porte des formules, et une chaîne `$d$` rendue en
 * texte brut s'afficherait telle quelle (trouvé sur la scène de la sphère).
 *
 * LE TITRE REÇOIT LE FOCUS à l'ouverture de la scène et à chaque changement
 * d'étape (revue ergonomie du 2026-09-24). Avant : ouvrir la scène démontait
 * le bouton qui avait le focus (renvoyé à <body>), et « Suivant », tout en
 * bas d'un panneau de 1 400 à 1 900 px, laissait l'écran sur la queue du
 * panneau pendant que la consigne neuve — la phrase qui dit de quoi parle
 * l'étape — était hors de vue, au-dessus. Maintenant la page remonte au haut
 * de la scène si le titre n'est pas visible (instantané : aucune animation),
 * et le focus s'y pose ; le lecteur d'écran lit le titre, puis, par
 * `aria-describedby` sur « Suivant », la consigne.
 */
import { useEffect, useRef } from "react";
import { frenchTypography } from "@/lib/frenchTypography";
import { MathText } from "../ChoiceButton";

/** Sous le header collant (56 px), avec de l'air. */
const HAUT_LIBRE = 64;

export function ConsigneEtape({
  idTitre,
  idConsigne,
  titre,
  consigne,
  cle,
  rang,
}: {
  idTitre: string;
  idConsigne: string;
  titre: string;
  consigne: string;
  /** l'identité de l'étape : à l'ouverture, puis à chaque changement, le titre prend le focus */
  cle?: string;
  /** la place de l'étape (« Étape 2 / 5 ») — dite en haut, là où l'on lit, et pas seulement au bas du panneau */
  rang?: { index: number; total: number };
}) {
  const titreRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = titreRef.current;
    if (!el || cle === undefined) return;
    const r = el.getBoundingClientRect();
    if (r.top < HAUT_LIBRE || r.bottom > window.innerHeight) el.closest("section")?.scrollIntoView({ block: "start" });
    el.focus({ preventScroll: true });
  }, [cle]);

  return (
    <div className="mb-4 max-w-reading">
      {rang && rang.total > 1 && (
        <p className="mb-1 text-caption tabular-nums text-secondary" data-rang-etape>
          {`Étape ${rang.index + 1} / ${rang.total}`}
        </p>
      )}
      <p id={idTitre} ref={titreRef} tabIndex={-1} data-titre-etape className="text-body font-semibold text-primary">
        {frenchTypography(titre)}
      </p>
      {/* La mesure se pose SUR le paragraphe : `ch` se résout dans la police de
          l'élément, et le conteneur est en sans-serif — posée sur lui, la
          mesure laissait passer 77 à 85 caractères de serif par ligne (revue
          visuelle de la cuve, vague 2 ; le cas de l'ADR 0038). Et `lead`
          (52ch), pas `reading` (65ch) : mesuré sur le rendu (vague 2 de la
          corde), la consigne est en Geist, dont le zéro — l'unité `ch` — est
          large (11,3 px à 17 px) ; 65ch y laissaient des lignes de 87
          caractères, 58ch encore 86, là où la prose de la leçon, en serif,
          plafonne à 78. La mesure se juge en caractères LUS, pas en `ch`. */}
      <p id={idConsigne} data-consigne className="mt-2 min-w-0 max-w-lead break-words font-display text-body-lg text-primary">
        <MathText>{consigne}</MathText>
      </p>
    </div>
  );
}
