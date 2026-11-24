/**
 * Le plan du site, pour les moteurs de recherche : toutes les pages qu'un élève peut ouvrir.
 * Calculé depuis les mêmes sources que les pages (contenu, programme, épreuves) : une page
 * ajoutée y entre toute seule.
 *
 * Tant que le site est fermé à l'indexation (`robots` dans `layout.tsx`, `robots.ts`), ce plan
 * ne sert à personne ; il est prêt pour le jour où le propriétaire ouvre.
 */
import type { MetadataRoute } from "next";
import { listNotions } from "@/lib/content";
import { listEpreuves } from "@/lib/examens";
import { DEFAULT_SUBJECT_ORDER } from "@/lib/curriculum";
import { SITE_URL } from "@/lib/site";

const PILOTES = ["logarithme", "radioactivite", "expression-genetique", "exponentielle", "meiose"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "/",
    "/commencer",
    "/examens",
    ...DEFAULT_SUBJECT_ORDER.map((s) => `/matieres/${s}`),
    ...PILOTES.flatMap((p) => [`/pilote/${p}`, `/pilote/${p}/exercices`]),
    ...listNotions().map((n) => `/notions/${n.subject}/${n.slug}`),
    ...listEpreuves().map((e) => `/examens/${e.id}`),
  ];
  return pages.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}` }));
}
