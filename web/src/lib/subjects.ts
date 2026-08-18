/**
 * subjects.ts — the ONE home of subject display labels and notion hrefs.
 *
 * Day-7 consolidation: both cold portability-test runs independently
 * flagged that this tiny map was duplicated per surface (page.tsx,
 * NotionPageView, LessonEnd) with no canonical home — and the duplication
 * had already drifted (one copy carried "philo", the others didn't).
 * Student-facing subject names are wording decisions; they change in
 * exactly one place: here.
 */

/**
 * L'ORDRE canonique des matières — LA constante que tout le monde consomme.
 * Avant la refonte Studio, quatre composants portaient chacun leur copie
 * (MasteryMap, SubjectProgress, Dashboard, NextUp) et AvailableShelf triait
 * alphabétiquement : l'accueil n'affichait pas les matières dans le même
 * ordre d'un module à l'autre. Une seule maison, comme les libellés.
 */
export const SUBJECT_ORDER = ["maths", "pc", "svt", "philo", "si"] as const;

export const SUBJECT_LABELS: Record<string, string> = {
  maths: "Mathématiques",
  pc: "Physique-Chimie",
  svt: "Sciences de la Vie et de la Terre",
  philo: "Philosophie",
  si: "Sciences de l'ingénieur",
};

/** Route to a subject's chapter index (Day-9 site skeleton). */
export function subjectHref(subject: string): string {
  return `/matieres/${encodeURIComponent(subject)}`;
}

/** Display label for a subject slug; unknown slugs render as themselves. */
export function subjectLabel(subject: string): string {
  return SUBJECT_LABELS[subject] ?? subject;
}

/** Canonical notion route. */
export function notionHref(subject: string, slug: string): string {
  return `/notions/${encodeURIComponent(subject)}/${encodeURIComponent(slug)}`;
}
