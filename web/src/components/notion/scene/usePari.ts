"use client";

/**
 * usePari — le PARI d'une étape (ADR 0041 §6).
 *
 *   aucun   : l'étape n'a pas de pari — tout est ouvert ;
 *   attente : l'élève n'a pas parié — ni le temps ni le contrôle n'existent,
 *             et RIEN de ce qui dépend de l'issue n'est montré (§11.190) ;
 *   note    : il a parié ; le temps est ouvert, le verdict attend que la
 *             SCÈNE ait montré la réponse ;
 *   revele  : verdict, « pourquoi », puis contrôle et lectures de l'étape.
 *
 * Ce que « la scène a montré » veut dire est propre à chaque scène : des heures
 * simulées pour l'orbite (`revele_apres_h`), une fraction de la course pour la
 * particule dans le champ (`revele_apres_course`), rien pour une scène sans
 * temps. Le panneau le calcule et le passe ici : `attend` (ce pari attend-il
 * la scène ?) et `montre` (la scène l'a-t-elle montré ?).
 *
 * La révélation est COLLANTE : une fois montrée, remettre le temps à zéro ne
 * la cache pas. `reinitialiser` est appelé par le panneau en changeant
 * d'étape, dans le même lot que le changement d'index (pas d'image
 * intermédiaire où le pari d'une étape s'afficherait avec l'état d'une autre).
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NotionChoice, Scene3DPari } from "@/lib/content";

export type PhasePari = "aucun" | "attente" | "note" | "revele";

export function usePari(pari: Scene3DPari | undefined, { attend, montre }: { attend: boolean; montre: boolean }) {
  const [choixId, setChoixId] = useState<string | null>(null);
  const [revele, setRevele] = useState(false);

  useEffect(() => {
    if (pari && choixId !== null && !revele && montre) setRevele(true);
  }, [pari, choixId, revele, montre]);

  const choixNotion: NotionChoice[] = useMemo(
    () =>
      (pari?.choix ?? []).map((c) => ({
        id: c.id,
        text: c.texte,
        correct: c.juste,
        feedback: c.retour,
        misconception: c.misconception,
      })),
    [pari]
  );

  const phase: PhasePari = !pari ? "aucun" : choixId === null ? "attente" : revele ? "revele" : "note";

  const choisir = useCallback(
    (id: string) => {
      setChoixId(id);
      if (!attend) setRevele(true);
    },
    [attend]
  );
  const reinitialiser = useCallback(() => {
    setChoixId(null);
    setRevele(false);
  }, []);

  return {
    phase,
    choixId,
    choixRetenu: pari?.choix.find((c) => c.id === choixId),
    choixNotion,
    choisir,
    reinitialiser,
    /** le temps (s'il existe) s'ouvre dès le pari */
    tempsOuvert: phase !== "attente",
    /** le contrôle, la suite, les lectures ET l'issue de l'étape, une fois révélé */
    etapeOuverte: phase === "aucun" || phase === "revele",
  };
}
