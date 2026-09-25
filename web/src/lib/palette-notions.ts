/**
 * Le manifeste léger des notions pour le header — panneau Notions + palette
 * ⌘K. Quatre champs par notion, pas le `NotionMeta` entier : le header n'a
 * besoin que de quoi nommer une notion, la ranger dans sa matière, y mener,
 * et afficher « N min » dans la palette (CommandPalette, `readingMinutes`).
 *
 * Pourquoi un module et pas une projection par page : la même expression
 * `listNotions().map(…)` vivait dans HUIT fichiers (les cinq copies d'une
 * `manifestePourHeader()` locale, plus trois inlines — `/atelier`,
 * `not-found`, `NotionPageView`). Un fait, huit sources : la neuvième page
 * qui monte PageShell héritait du silence plutôt que du manifeste, et rien
 * ne le disait. Sœur de `palette-epreuves.ts`, même contrat.
 *
 * Côté SERVEUR seulement — `lib/content` lit le corpus sur disque. Chaque
 * page serveur passe le résultat à PageShell, qui ne peut pas l'importer
 * lui-même : il est aussi rendu depuis la coquille de /connexion.
 */
import { listNotions } from "@/lib/content";
import type { NotionPourPalette } from "@/components/ui/CommandPalette";

export function manifestePourHeader(): NotionPourPalette[] {
  return listNotions().map((n) => ({
    subject: n.subject,
    slug: n.slug,
    title: n.title,
    readingMinutes: n.readingMinutes,
  }));
}
