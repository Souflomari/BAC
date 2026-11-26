"use client";

/**
 * DosagePilote : la leçon « Le dosage acido-basique » (format v3), sur le squelette commun.
 * Le moteur vit dans `dosage-moteur.js` (scènes : `dosage-scenes-{a,b,c}.js`, données sourcées
 * et calculs : `dosage-outils.js`), sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./dosage-moteur";

export function DosagePilote() {
  return (
    <PiloteCoquille
      nom="dosage"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="Le dosage acido-basique"
      filieres="SM · PC · SVT"
      exercices="/pilote/dosage/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Une énigme, et son mécanisme.</b> Douze millilitres de soude ne changent rien, puis deux gouttes font
            virer tout le bécher. Tu suis le bécher jeton par jeton, couplé au pH-mètre et à la courbe.
          </li>
          <li>
            <b>Lire et choisir avec exactitude.</b> Tangentes parallèles, maximum de la dérivée, demi-équivalence,
            indicateur coloré, puis chaîne de dilution et prélèvement. Les courbes sont calculées par le programme.
          </li>
          <li>
            <b>Les sujets du bac.</b> Un exemple commenté (PC 2018) et un second que tu complètes (PC 2024), avec les
            données et barèmes imprimés des sujets.
          </li>
        </>
      }
    />
  );
}
