"use client";

/**
 * TransformationsNonTotalesPilote : la leçon « Transformations non totales » (format v3), première leçon de
 * chimie, sur le squelette commun. Le moteur vit dans `transformations-non-totales-moteur.js` (scènes :
 * `transformations-non-totales-scenes-{a,b,c,d}.js`, données sourcées et calculs :
 * `transformations-non-totales-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./transformations-non-totales-moteur";

export function TransformationsNonTotalesPilote() {
  return (
    <PiloteCoquille
      nom="transformations-non-totales"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Transformations non totales"
      filieres="SM · PC · SVT"
      exercices="/pilote/transformations-non-totales/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Une énigme, et son calcul.</b> Deux acides de même concentration n’ont pas le même pH. Tu paries, tu
            calcules jusqu’où l’acide a réagi avec le pH, puis tu reviens aux deux flacons à la fin. Les valeurs de pH
            sont calculées par le programme, pas mesurées au laboratoire.
          </li>
          <li>
            <b>Une loupe sur cent molécules.</b> Pour comprendre pourquoi la réaction s’arrête, tu regardes la
            solution tic par tic&#8239;: des protons partent, d’autres reviennent. C’est un modèle, avec cent molécules
            au lieu de milliards de milliards&#8239;; il ne mesure aucune durée.
          </li>
          <li>
            <b>Le bac en ligne de mire, selon ta filière.</b> Deux sujets de la série PC (2022 et 2023), cités avec leur
            barème. Le mot «&#8239;choc efficace&#8239;» est au programme de PC et SM&#8239;; la dilution est au
            programme de SVT, et un enrichissement en PC et SM.
          </li>
        </>
      }
    />
  );
}
