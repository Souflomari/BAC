/**
 * LessonEnd — the lesson surface's session-close handoff.
 *
 * Spec: docs/design/PAGE-ANATOMY-SPECS.md §LessonEnd (anatomy, data contract,
 * invariants) — read that section before touching this file. Governed also by
 * DESIGN-BIBLE §8 (periphery: one clear "what's next", never a feed of
 * options) and §11 (page anatomy: the lesson's session-close moment lives
 * HERE, not in the footer — SiteFooter stays a quiet colophon).
 *
 * Anatomy (in order): a caps-caption "Et maintenant" label (shared Eyebrow,
 * muted + decorative — the aside's aria-label already names the region) →
 * ONE recommendation row, rendered only when `next` is non-null (a plain
 * state-layer link row, NOT a filled button and NOT a boxed card — the
 * surface's one btn-primary belongs to the embed, and flowing content here
 * is not panel-boxed per §11 section-rhythm) → a quiet "Retour aux notions"
 * link, always present.
 *
 * HONEST-STATE RULE: `next` is computed deterministically by the caller
 * (NotionPageView — today: most recently updated OTHER notion). This
 * component never fabricates ordering, progress, or student state, and never
 * renders a progressbar.
 */

import { Link } from "@/components/ui/Lien";
import type { NotionMeta } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { subjectLabel, notionHref } from "@/lib/subjects";

// ── Subject display labels (mirrors NotionPageView's notion-surface map) ──────
export function LessonEnd({
  next,
  currentSubject,
}: {
  next: NotionMeta | null;
  /**
   * La matière de la leçon qu'on VIENT de finir. Sert à une seule chose :
   * savoir si la suggestion change de matière ou non.
   *
   * POURQUOI CE PARAMÈTRE EXISTE (2026-09-05). Le surtitre était
   * « Changer de matière — <matière> », en dur, quelle que soit la
   * suggestion. Ça tenait tant que la suggestion était tirée de la DATE DE
   * FICHIER : elle sautait d'une matière à l'autre au hasard, et l'étiquette
   * tombait juste assez souvent pour ne pas se faire remarquer.
   *
   * Le correctif du matin — la fin de leçon suit désormais l'ordre du
   * programme — a rendu l'étiquette FAUSSE sur **58 leçons sur 62** : le
   * chapitre suivant est presque toujours dans la même matière, et l'élève
   * qui finit « Autrui » lisait « CHANGER DE MATIÈRE — PHILOSOPHIE » suivi de
   * « L'histoire ». Réparer une chose en avait cassé une autre, et seul le
   * fait de REGARDER la page l'a montré.
   */
  currentSubject?: string;
}) {
  const changeDeMatiere = next != null && currentSubject != null && next.subject !== currentSubject;
  return (
    <aside
      data-lesson-end
      aria-label="Et maintenant"
      className="notion-prose mt-20 pt-8 border-t border-subtle"
    >
      <Eyebrow tone="muted" decorative>Et maintenant</Eyebrow>

      {/* ONE recommendation — rendered only from real, deterministic caller
          state. No substitute content, no apology copy when next is null. */}
      {next && (
        <Link
          href={notionHref(next.subject, next.slug)}
          className={cn(
            "group mt-4 flex items-center justify-between gap-6",
            // The -mx-6 bleed (so the state-layer hover extends past the text
            // measure) only at ≥600px, where the centered notion-prose column
            // has room for it. At compact width the column is full-bleed and a
            // 24px negative margin overshoots the 16px page gutter → 8px of
            // horizontal page scroll (bible §1: never at 390). Compact keeps
            // the padding, drops the bleed.
            "px-6 py-6 rounded-xl bp-medium:-mx-6",
            "state-layer focus-ring [--focus-radius:16px]"
          )}
        >
          <span className="min-w-0">
            <span className="block text-caption font-medium uppercase tracking-eyebrow text-secondary">
              {changeDeMatiere ? "Changer de matière" : "La suite du parcours"} —{" "}
              {subjectLabel(next.subject)}
            </span>
            <span className="mt-2 block font-display text-h3 font-semibold text-primary group-hover:text-accent transition-colors duration-micro">
              {next.title}
            </span>
          </span>
          <Icon name="arrow-right" size={20} className="flex-shrink-0 text-accent" />
        </Link>
      )}

      <Link
        href="/"
        className={cn(
          "mt-6 inline-block",
          "text-body-sm text-secondary hover:text-primary",
          "transition-colors duration-micro ease-enter",
          "state-layer rounded px-2 py-1 -mx-2",
          "focus-ring [--focus-radius:8px]"
        )}
      >
        Retour aux notions
      </Link>
    </aside>
  );
}
