"use client";

/**
 * BankCard — one « S'entraîner » bank entry as a calm, collapsible card
 * (BANK-SPEC §3). Anatomy:
 *
 *   - Header (always visible, the collapse toggle): title + the STUDENT-VISIBLE
 *     provenance badge « Bac 2019 · Normale » (+ « SM »/« SExp » for maths) +
 *     « /N pts » + « ~M min » + the compact paper label. Cards start CLOSED so
 *     the chapter scans as a list, not a wall (§3.2).
 *   - Body (rendered only when open): the intro (données) + the questions, each
 *     with the EXACT attempt-first contract (`AttemptFirstQuestions` reuse —
 *     stem visible, reasoning NEVER in the DOM before the per-question commit).
 *     The `data-exercise` wrapper is what dom-truth's attempt-first guard
 *     targets, verbatim from the summit exercises.
 *   - « fait » state (LIVE mode only, §3.4): a quiet check + « fait » when the
 *     journal already holds an `exercise_reveal` for one of this entry's
 *     questions (`item_id = "<entry_id>:<question_id>"`). Off / logged-out:
 *     NOTHING fait-related renders — honest-state, no placeholder, no tick.
 *
 * Calm core (DESIGN-BIBLE §0): no timers, no scores, no completion %, no
 * celebration. Barème tags stay inside the stems exactly as transcribed; there
 * is no self-scoring UI (that is phase B4). Tokens only, both themes.
 *
 * CLIENT component: collapse state + the live fait-state read.
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import type { NotionBankEntry } from "@/lib/content";
import { AttemptFirstQuestions, MdBlock } from "./AttemptFirstExercise";
import { useHydrated } from "@/lib/useHydrated";
import { useExerciseRevealIds, revealKey } from "@/lib/student-state";
import { ExplicationPlayer } from "./ExplicationPlayer";
import type { ExplicationResolue, ExplicationInteractive } from "@/lib/explications";
import { frenchTypography } from "@/lib/frenchTypography";

function sessionLabel(session: string): string {
  if (session === "normale") return "Normale";
  if (session === "rattrapage") return "Rattrapage";
  return session;
}

// Filière chip only for the maths streams (BANK-SPEC §3.1) — PC papers carry
// no stream chip (their filière is implicit in the subject).
function filiereChip(filiere?: string): string | null {
  return filiere === "SM" || filiere === "SExp" ? filiere : null;
}

// French decimal comma; drop a trailing ",0" so integers read « /5 pts ».
function formatPts(n?: number): string | null {
  if (n == null) return null;
  const s = Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
  return `/${s} pts`;
}

export function BankCard({
  entry,
  notionId,
  explication = null,
  interactive = null,
}: {
  entry: NotionBankEntry;
  /**
   * `"<subject>/<slug>"` — la notion qui HÉBERGE cette carte. Indispensable :
   * `entry.id` n'est unique que dans son propre `bank.yaml` (il encode la
   * position sur la copie du bac, pas la notion), donc la clé de révélation
   * doit porter les deux. Voir `revealKey` dans lib/student-state.
   */
  notionId: string;
  /** L'explication animée publiée pour cette entrée, ou null (état honnête). */
  explication?: ExplicationResolue | null;
  /** La figure interactive, quand elle existe — elle prime sur la vidéo. */
  interactive?: ExplicationInteractive | null;
}) {
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const revealIds = useExerciseRevealIds();
  // « fait » iff the journal holds a reveal for ANY of this entry's questions.
  // `null` (off / loading / logged-out) → false → nothing fait-related renders.
  const fait = revealIds
    ? entry.questions.some((q) =>
        revealIds.has(revealKey(notionId, `${entry.id}:${q.id}`))
      )
    : false;

  const provenance = `Bac ${entry.source.year} · ${sessionLabel(entry.source.session)}`;
  const chip = filiereChip(entry.source.filiere);
  const pts = formatPts(entry.baremeTotal);
  const dur = entry.durationMin != null ? `~${entry.durationMin} min` : null;
  const bodyId = `bank-body-${entry.id}`;

  const badgePill =
    "inline-flex items-center rounded-full px-2.5 py-0.5 " +
    "text-caption font-medium " +
    "bg-surface-raised text-secondary " +
    "border border-subtle";

  return (
    <article
      data-bank-card
      data-entry-id={entry.id}
      className={cn(
        "rounded-xl overflow-hidden",
        "border border-subtle",
        "bg-surface-container shadow-elevation-1"
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={!hydrated}
        aria-busy={!hydrated || undefined}
        aria-expanded={open}
        aria-controls={bodyId}
        className={cn(
          "group flex w-full items-start gap-3 text-left",
          "px-5 py-4 bp-medium:px-6 bp-medium:py-5",
          "state-layer focus-ring [--focus-radius:12px]"
        )}
      >
        {/* `overflow-x-auto` : la carte porte `overflow-hidden` pour arrondir
            ses coins, et à 200 % de taille de texte (SC 1.4.4) un titre
            d'exercice contenant une formule en ligne — insécable — était
            COUPÉ par ce clip, jusqu'à 55 caractères perdus sans rien pour le
            signaler. Il défile désormais dans sa propre boîte. */}
        <div className="flex-1 min-w-0 overflow-x-auto">
          <div className="flex items-start justify-between gap-3">
            {/* `min-w-0 break-words` (2026-09-05) : le titre est un item flex à
                côté de la pastille ; sans cela il ne descend pas sous son mot
                le plus long et, à 200 % de texte sur 320 px, dix titres sur
                douze défilaient hors de la carte (de 16 à 218 px). */}
            <h3 className="min-w-0 break-words font-display text-h3 font-semibold text-primary">
              {entry.title}
            </h3>
            {fait && (
              <span
                data-bank-fait
                className="mt-1 inline-flex flex-shrink-0 items-center gap-1 text-caption font-medium text-secondary"
              >
                <Icon name="check" size={14} className="text-accent" />
                fait
              </span>
            )}
          </div>

          {/* Provenance — student-visible by design (BANK-SPEC §3.1 / D1). */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-caption text-secondary">
            <span data-bank-provenance className={badgePill}>
              {provenance}
            </span>
            {chip && <span className={badgePill}>{chip}</span>}
            {pts && <span className="tabular-nums">{pts}</span>}
            {dur && <span className="tabular-nums">{dur}</span>}
          </div>

          {entry.source.exerciseLabel && (
            /* `max-w-reading` (2026-09-06, HANDOFF §11.25) : ce libellé de
               provenance fait souvent plus de 100 caractères en 12 px et
               courait sur toute la carte — 743 px, soit ~93 caractères par
               ligne, au-delà de la mesure de 75ch que la porte prose-measure
               exige de tout texte courant. La porte ne le voyait pas : le
               chapitre « S'entraîner » est replié au moment du contrôle. */
            <p className="mt-1.5 max-w-reading text-caption text-tertiary">
              {frenchTypography(entry.source.exerciseLabel)}
            </p>
          )}
        </div>

        <Icon
          name="chevron-right"
          size={18}
          className={cn(
            "mt-1 flex-shrink-0 text-secondary",
            "transition-transform duration-micro ease-enter",
            open && "rotate-90"
          )}
        />
      </button>

      {open && (
        <div id={bodyId} className="px-5 pb-6 bp-medium:px-6">
          {entry.intro && (
            <div className="pt-1">
              <MdBlock className="[&_p]:text-body-lg">{entry.intro}</MdBlock>
            </div>
          )}
          {/* The attempt-first questions — the same contract + composite-id
              recorder as the summit exercises. `data-exercise` is what
              dom-truth's attempt-first guard targets, verbatim. */}
          <div data-exercise={entry.id} aria-label={entry.title} className="mt-2">
            <AttemptFirstQuestions exerciseId={entry.id} questions={entry.questions} />
          </div>

          {/* L'explication animée vient APRÈS les questions, jamais avant :
              elle déroule le corrigé entier et porte donc sa propre garde
              « tentative d'abord » (cf. ExplicationPlayer). Absente de
              l'index → rien ne se rend du tout. */}
          {(interactive || explication) && (
            <ExplicationPlayer
              explication={explication}
              interactive={interactive}
              title={entry.title}
            />
          )}
        </div>
      )}
    </article>
  );
}
