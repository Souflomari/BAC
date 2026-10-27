"use client";

/**
 * RadioactivitePilote — la leçon pilote « décroissance radioactive »
 * (refonte 2026-10, deuxième version), sur le squelette commun. L'élève lance
 * lui-même les dés. Le moteur vit dans `radioactivite-moteur.js`, sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./radioactivite-moteur";

export function RadioactivitePilote() {
  return (
    <PiloteCoquille
      nom="radioactivite"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Décroissance radioactive"
      filieres="SM · PC · SVT"
      exercices="/pilote/radioactivite/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre · L pour lancer"
      pourquoi={
        <>
          <li>
            <b>Le hasard d’abord, la formule ensuite.</b> C’est toi qui lances les dés&#8239;: la loi{" "}
            <i>N</i>(<i>t</i>)&#8239;=&#8239;<i>N</i>₀e<sup>−λ<i>t</i></sup> arrive comme le résumé de ce que tes dés
            ont fait.
          </li>
          <li>
            <b>L’histoire comme moteur.</b> Chaque idée arrive parce que quelqu’un en a eu besoin — Becquerel,
            Rutherford, Libby — et finit à Jebel Irhoud, au Maroc.
          </li>
          <li>
            <b>Le bac en ligne de mire.</b> Un raisonnement rédigé comme le correcteur l’attend, puis trois
            questions tirées des pièges des sujets.
          </li>
        </>
      }
    />
  );
}
