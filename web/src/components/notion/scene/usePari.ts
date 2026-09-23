"use client";

/**
 * usePari — le PARI d'une étape (ADR 0041 §6).
 *
 *   aucun   : l'étape n'a pas de pari — tout est ouvert ;
 *   attente : l'élève n'a pas parié — ni le temps ni le contrôle n'existent ;
 *   note    : il a parié ; le temps est ouvert, le verdict attend que la
 *             SCÈNE ait montré la réponse (`revele_apres_h` heures simulées) ;
 *   revele  : verdict, « pourquoi », puis contrôle et lectures de l'étape.
 *
 * La révélation est COLLANTE : une fois montrée, remettre le temps à zéro ne
 * la cache pas. `reinitialiser` est appelé par le panneau en changeant
 * d'étape, dans le même lot que le changement d'index (pas d'image
 * intermédiaire où le pari d'une étape s'afficherait avec l'état d'une autre).
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import type { NotionChoice, Scene3DPari } from "@/lib/content";

export type PhasePari = "aucun" | "attente" | "note" | "revele";

export function usePari(pari: Scene3DPari | undefined, tempsSimule: number) {
  const [choixId, setChoixId] = useState<string | null>(null);
  const [revele, setRevele] = useState(false);
  const seuil = (pari?.revele_apres_h ?? 0) * 3600;

  useEffect(() => {
    if (pari && choixId !== null && !revele && tempsSimule >= seuil) setRevele(true);
  }, [pari, choixId, revele, tempsSimule, seuil]);

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
      if ((pari?.revele_apres_h ?? 0) === 0) setRevele(true);
    },
    [pari]
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
    /** le contrôle, la suite et les lectures de l'étape, une fois révélé */
    etapeOuverte: phase === "aucun" || phase === "revele",
  };
}
