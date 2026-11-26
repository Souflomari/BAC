"use client";

/**
 * AcidesBasesPilote : la leçon « État d’équilibre, acides et bases » (format v3), deuxième leçon de
 * chimie (chapitres C4 et C5), sur le squelette commun. Le moteur vit dans `acides-bases-moteur.js`
 * (scènes : `acides-bases-scenes-{a,b,c,d}.js`, données sourcées et calculs : `acides-bases-outils.js`),
 * sur `noyau.js`.
 */

import { PiloteCoquille } from "./PiloteCoquille";
import { monterPilote } from "./acides-bases-moteur";

export function AcidesBasesPilote() {
  return (
    <PiloteCoquille
      nom="acides-bases"
      matiere="Physique-chimie · 2ᵉ Bac"
      titre="État d’équilibre, acides et bases"
      filieres="SM · PC · SVT"
      exercices="/pilote/acides-bases/exercices"
      monter={monterPilote}
      touches="← → pour avancer · 1 2 3 pour répondre"
      pourquoi={
        <>
          <li>
            <b>Deux frontières sur l’axe des pH.</b> Une solution acide prend avec l’hélianthine la teinte de la
            soude. Pour comprendre pourquoi, tu construis le quotient de réaction, la constante d’équilibre, le
            produit ionique de l’eau (la frontière 7) et le p<i>K</i><sub>A</sub> d’un couple.
          </li>
          <li>
            <b>Des modèles honnêtes et des teintes nommées.</b> Les courbes par tic illustrent la convergence vers le
            même palier&#8239;; les valeurs de pH des flacons sont calculées par le programme&#8239;; les teintes des
            indicateurs sont écrites en toutes lettres.
          </li>
          <li>
            <b>Selon ta filière.</b> Toute la leçon est au programme de SM, PC et SVT, à l’exception des trois étapes
            sur le diagramme de distribution (PC et SM seulement), signalées et sautables en un clic pour SVT.
          </li>
        </>
      }
    />
  );
}
