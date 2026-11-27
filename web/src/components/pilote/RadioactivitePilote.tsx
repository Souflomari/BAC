"use client";

/**
 * RadioactivitePilote — la leçon « décroissance radioactive » (V3), sur le
 * squelette commun. L'élève lance lui-même les dés. Le moteur vit dans
 * `radioactivite-moteur.js` (scènes : `radioactivite-scenes-{a,b,c}.js`),
 * sur `noyau.js`.
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
            <i>N</i>(<i>t</i>)&#8239;=&#8239;<i>N</i>
            <sub>0</sub>e<sup>−λ<i>t</i></sup> arrive comme le résumé de ce que tes dés ont fait. Les outils de maths
            nécessaires (exponentielle, ln) sont rappelés au moment où ils servent.
          </li>
          <li>
            <b>Une énigme, et sa réponse.</b> Pourquoi le gaz de Rutherford s’éteint-il en quelques minutes, quand
            l’uranium de Becquerel émet encore&#8239;? La leçon y répond à la fin.
          </li>
          <li>
            <b>Le bac en ligne de mire.</b> Écrire une désintégration, l’expression littérale d’abord, un exercice
            du sujet 2022 commenté, puis trois pièges des copies.
          </li>
        </>
      }
    />
  );
}
