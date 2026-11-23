/**
 * L'adresse du site et son ouverture aux moteurs de recherche : une seule source.
 *
 * - `SITE_URL` : l'adresse d'aperçu, en attendant le nom de domaine (décision du propriétaire).
 * - `SITE_OUVERT` : faux tant que le site est en construction. Le passer à vrai retire le
 *   `noindex` de toutes les pages et ouvre `robots.txt` : c'est un geste de lancement, décidé
 *   par le propriétaire.
 */
export const SITE_URL = "https://bac-pink.vercel.app";
export const SITE_OUVERT = false;
