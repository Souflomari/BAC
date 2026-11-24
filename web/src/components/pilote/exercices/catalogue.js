// @ts-nocheck
/**
 * Les exercices de chaque leçon pilote, par nom de pilote. Le composant
 * ExercicesPilote les lit ici (les fonctions des gabarits ne peuvent pas
 * passer du serveur au navigateur) ; la page serveur n'y lit que les
 * identifiants de capacités, pour afficher leur libellé officiel.
 */
import { EXERCICES as logarithme } from "./logarithme.js";
import { EXERCICES as radioactivite } from "./radioactivite.js";
import { EXERCICES as expressionGenetique } from "./expression-genetique.js";
import { EXERCICES as exponentielle } from "./exponentielle.js";
import { EXERCICES as meiose } from "./meiose.js";
import { EXERCICES as noyaux } from "./noyaux.js";
import { EXERCICES as suites } from "./suites.js";
import { EXERCICES as dipoleRc } from "./dipole-rc.js";

export const CATALOGUE = {
  logarithme,
  radioactivite,
  "expression-genetique": expressionGenetique,
  exponentielle,
  meiose,
  noyaux,
  suites,
  "dipole-rc": dipoleRc,
};

/** Les séances au-delà de la première, quand une notion en a plusieurs : leur titre. */
export const SEANCES = {
  logarithme: { 2: "ln comme fonction" },
  exponentielle: { 2: "exp comme fonction" },
  suites: { 2: "Encadrer, comparer" },
};
