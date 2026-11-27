"use client";

/**
 * NoyauxPilote — la leçon « Noyaux, masse et énergie » (format v3), suite de la leçon sur la
 * décroissance radioactive, sur le squelette commun. Le moteur vit dans `noyaux-moteur.js`
 * (scènes : `noyaux-scenes-{a,b,c}.js`, données sourcées et calculs : `noyaux-outils.js`), sur
 * `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./noyaux-moteur";

export function NoyauxPilote() {
  return (
    <PiloteCoquille
      nom="noyaux"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Noyaux, masse et énergie"
      filieres="SM · PC · SVT"
      exercices="/pilote/noyaux/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Une énigme, et son calcul.</b> En 1862, aucune énergie connue ne fait briller le Soleil assez longtemps.
            En 1920, Aston pèse des noyaux et trouve qu’une masse manque. Tu paries, puis tu calcules ce que vaut cette
            masse, et tu reviens au Soleil à la fin.
          </li>
          <li>
            <b>Une seule figure pour quatre idées.</b> Le diagramme d’énergie sert le défaut de masse, l’énergie de
            liaison, le bilan d’une réaction et le sujet du bac. Toutes les valeurs sont calculées par le programme à
            partir de données sourcées&#8239;: aucune n’est recopiée à la main.
          </li>
          <li>
            <b>Le bac en ligne de mire.</b> Deux sujets de la série PC (2020 et 2023), cités avec leur barème, puis la
            copie d’un autre sujet (2019) et ses pièges. En SVT, la partie sur la fission et la fusion se saute&#8239;:
            elle n’est pas à ton programme.
          </li>
        </>
      }
    />
  );
}
