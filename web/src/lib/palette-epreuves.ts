/**
 * Les 39 épreuves, en quelques octets chacune, pour la palette ⌘K (HANDOFF
 * §11.34 : « 2025 », « rattrapage » ne trouvaient rien). Côté SERVEUR
 * seulement — `lib/examens` lit le corpus sur disque ; chaque page serveur
 * passe le résultat à PageShell, qui ne peut pas l'importer lui-même (il est
 * aussi rendu par la page client /connexion).
 */
import { listEpreuves, epreuveTitre, filiereLabel } from "@/lib/examens";
import type { EpreuvePourPalette } from "@/components/ui/CommandPalette";

export function manifesteEpreuves(): EpreuvePourPalette[] {
  return listEpreuves().map((e) => ({
    id: e.id,
    titre: epreuveTitre(e),
    filiere: e.filiere,
    filiereLabel: filiereLabel(e.filiere),
    year: e.year,
    session: e.session,
  }));
}
