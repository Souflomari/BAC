/**
 * Le catalogue complet : toutes les leçons étiquetées et le graphe transversal, assemblés.
 * C'est le seul point d'entrée de l'interface (la page « où j'en suis ») ; une leçon nouvellement
 * étiquetée s'ajoute à la liste `LECONS`, rien d'autre ne change. Le contrôle
 * `web/scripts/apprentissage-catalogue.mjs` lit cette même liste (et signale une leçon du graphe
 * qui n'y serait pas).
 */
import { composerCatalogue, type CatalogueLecon } from "../apprentissage";
import { GRAPHE } from "./graphe-transversal";
import { LOGARITHME } from "./logarithme";
import { EXPONENTIELLE } from "./exponentielle";
import { SUITES } from "./suites";
import { RADIOACTIVITE } from "./radioactivite";
import { NOYAUX } from "./noyaux";
import { DIPOLE_RC } from "./dipole-rc";
import { DIPOLE_RL } from "./dipole-rl";
import { TRANSFORMATIONS_NON_TOTALES } from "./transformations-non-totales";
import { ACIDES_BASES } from "./acides-bases";
import { COMPLEXES } from "./complexes";
import { EXPRESSION_GENETIQUE } from "./expression-genetique";
import { MEIOSE } from "./meiose";
import { TRANSMISSION } from "./transmission";

export const LECONS: CatalogueLecon[] = [
  LOGARITHME,
  EXPONENTIELLE,
  SUITES,
  RADIOACTIVITE,
  NOYAUX,
  DIPOLE_RC,
  DIPOLE_RL,
  TRANSFORMATIONS_NON_TOTALES,
  ACIDES_BASES,
  COMPLEXES,
  EXPRESSION_GENETIQUE,
  MEIOSE,
  TRANSMISSION,
];

export const CATALOGUE = composerCatalogue(LECONS, GRAPHE);
