"use client";

/**
 * ChoiceButton — the single shared MCQ/checkpoint choice surface.
 *
 * De-duplicates what were two ~95%-identical hand-copies: McqItem's
 * `ChoiceButton` and CheckpointItem's `CheckpointChoiceButton`. Both now import
 * and render THIS component; their only genuine differences are expressed as
 * props, not forks:
 *
 *   - `idleSurface` — the idle option background. MCQ reads on the at-rest
 *     RAISED tone (surface-raised); the inline checkpoint reads on the BASE
 *     tone (surface-base). Everything else about the idle state (the shared
 *     .state-layer feedback language, elevation lift, border change,
 *     active:scale press) is identical and lives here.
 *   - `disabledExtra` — the post-answer non-selected/non-correct row. The two
 *     originals diverged only in their surface var and whether they pinned
 *     `cursor-default`; this prop carries those exact extra classes so each
 *     component's rendered class set is preserved byte-for-byte.
 *   - `feedbackId` — the per-choice feedback element id is wired by the caller
 *     (the two used different id schemes), so aria-describedby is preserved.
 *
 * The diagnostic-feedback slot itself is identical markup in both: the
 * checkpoint's "names the wrong model" behavior comes from the CONTENT in
 * `choice.feedback`, not the rendering. So the feedback block is shared; only
 * the slot's id is parameterized.
 *
 * This module also exports the shared `MathText` (KaTeX-aware text renderer) and
 * `ResultRow` (the calm binary summary row) that were duplicated verbatim in
 * both files.
 *
 * Every ADR 0024 detail is preserved exactly: the .state-layer / .state-disabled
 * classes, the focus-ring [--focus-radius:12px], the ResultIcon usage, the
 * text-success-on / text-error-on badge colors, the success/error/
 * revealed-correct state styling, the duration/ease tokens, and all aria/roles/
 * keyboard wiring. This is a pure de-duplication refactor — pixels and a11y do
 * not change.
 */

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkFrenchTypography from "@/lib/remarkFrenchTypography";
import rehypeKatexHtml from "@/lib/rehypeKatexHtml";
import { KatexSpan } from "./KatexSpan";
import { useHydrated } from "@/lib/useHydrated";
import type { NotionChoice } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ResultIcon } from "@/components/ui/Icon";

// ── Math-aware text renderer ──────────────────────────────────────────────────
// `memo` (2026-09-05, HANDOFF §11.23) : ce composant fait passer sa chaîne par
// remark + KaTeX À CHAQUE rendu du parent. Un QCM se re-rend à chaque clic de
// réponse (état local) — et re-parsait son énoncé et ses quatre choix. Deux
// props, des chaînes : identiques ⇒ rien à refaire. Même défaut, même remède
// que `MdBlock` (§11.20).
export const MathText = memo(function MathText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("math-text", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkFrenchTypography]}
        rehypePlugins={[[rehypeKatexHtml, { strict: false, trust: false }]]}
        components={{
          p: ({ children }) => <span>{children}</span>,
          span: KatexSpan,
        }}
      >
        {children}
      </ReactMarkdown>
    </span>
  );
});

// ── Choice state ──────────────────────────────────────────────────────────────
type ChoiceState = "idle" | "selected-correct" | "selected-incorrect";

export const CHOICE_LABELS = ["A", "B", "C", "D", "E", "F"];

// ── Individual choice button ──────────────────────────────────────────────────
export interface ChoiceButtonProps {
  choice: NotionChoice;
  index: number;
  answered: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Fully-resolved id for the per-choice feedback element (aria-describedby). */
  feedbackId: string;
  /**
   * Idle option background utility. MCQ: "bg-surface-raised";
   * inline checkpoint: "bg-surface-base".
   */
  idleSurface: string;
  /**
   * Extra classes for the post-answer non-selected/non-correct row, appended
   * after the shared `state-disabled`. Carries each call site's exact surface
   * + cursor classes so the rendered class set is preserved verbatim.
   */
  disabledExtra: string[];
  /**
   * Quand l'élève s'est trompé, faut-il AUSSI afficher le retour du bon choix
   * (la ligne révélée en vert), et pas seulement celui qu'il a coché ?
   *
   * `false` (défaut, McqItem) : la banque de fin porte son explication dans
   * `item.solution`, rendu juste en dessous par McqItem — dupliquer le retour
   * de la clé au-dessus n'ajouterait rien.
   *
   * `true` (CheckpointItem) : un point d'arrêt n'a PAS de `solution` (0 sur
   * 362, mesuré le 2026-09-05). Sans cela, l'élève qui se trompe voit son
   * erreur nommée et la bonne réponse surlignée — sans jamais lire pourquoi
   * elle est bonne. Un tuteur qui montre la réponse sans la justifier ne fait
   * que la moitié du travail (VISION : « un tuteur patient »).
   */
  revealCorrectFeedback?: boolean;
}

export function ChoiceButton({
  choice,
  index,
  answered,
  selectedId,
  onSelect,
  feedbackId,
  idleSurface,
  disabledExtra,
  revealCorrectFeedback = false,
}: ChoiceButtonProps) {
  const isSelected = selectedId === choice.id;
  const label = CHOICE_LABELS[index] ?? String(index + 1);

  let state: ChoiceState = "idle";
  if (answered && isSelected) {
    state = choice.correct ? "selected-correct" : "selected-incorrect";
  }

  // Avant l'hydratation, le choix est rendu mais son onClick n'existe pas
  // encore : désactivé + `aria-busy` + curseur d'attente (HANDOFF §11.28).
  const hydrated = useHydrated();
  const isRevealedCorrect = answered && choice.correct && !isSelected;
  // La justification du bon choix, montrée à qui s'est trompé.
  // Porte le TEXTE (et non un booléen) pour que TypeScript le rétrécisse.
  const revealedFeedback =
    isRevealedCorrect && revealCorrectFeedback ? choice.feedback : undefined;

  // LE CHOIX RETENU GARDE LE FOCUS (revue ergonomie, 2026-09-24). Désactiver
  // le bouton qui a le focus le renvoie à <body> : l'élève au clavier qui
  // venait de répondre repartait du haut de la page — à chaque point d'arrêt
  // du produit, et à chaque pari des scènes 3D. Le choix coché reste donc
  // focalisable (`aria-disabled`, son onClick ne fait déjà plus rien) ; les
  // autres sortent de l'ordre de tabulation (`disabled`), comme avant.
  const inerte = answered && !isSelected;
  return (
    <li>
      <button
        type="button"
        disabled={inerte || !hydrated}
        aria-disabled={(answered && isSelected) || undefined}
        aria-busy={!hydrated || undefined}
        onClick={() => !answered && onSelect(choice.id)}
        aria-pressed={isSelected}
        aria-describedby={
          (isSelected && answered) || revealedFeedback ? feedbackId : undefined
        }
        className={cn(
          // Base layout
          "w-full flex items-start gap-3",
          "text-left",
          "px-4 py-3",
          "rounded-lg",
          "border",
          // Typography
          "text-body font-regular",
          // Transition — 250ms (standard) ease-between for correctness reveals
          "transition-all duration-standard ease-between",
          // Touch target ≥ 48px (§9)
          "min-h-touch",
          // Focus ring — migrated to .focus-ring utility; match the rounded-lg
          // (12px) corner so the outline rounds with the host (ADR 0024).
          "focus-ring [--focus-radius:12px]",
          // Idle state: elevation-1 at rest, elevation-2 on hover, flat on press.
          // #6: accent-wash on hover removed (calm-load — reading/thinking surface).
          // .state-layer provides the ONE neutral hover/pressed feedback language;
          // elevation lift + border change + active:scale remain for tactility.
          state === "idle" && !isRevealedCorrect && [
            "state-layer",
            idleSurface,
            "border-subtle",
            "text-primary",
            "shadow-elevation-1",
            "hover:shadow-elevation-2",
            "hover:border-soft",
            "active:shadow-elevation-0",
            "active:scale-[0.99]",
            hydrated ? "cursor-pointer" : "cursor-progress",
          ],
          // Selected & correct
          state === "selected-correct" && [
            "bg-success-subtle",
            "border-success",
            "text-primary",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // Selected & incorrect
          state === "selected-incorrect" && [
            "bg-error-subtle",
            "border-error",
            "text-primary",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // After answering: reveal correct answer (unselected) — keep its
          // success colors fully lit (it is the answer to read), not dimmed.
          isRevealedCorrect && [
            "bg-success-subtle",
            "border-success",
            "text-primary",
            "shadow-elevation-0",
            "cursor-default",
          ],
          // After answering: non-selected, non-correct — the single inert
          // dimmed treatment (.state-disabled = one opacity + inert). The extra
          // surface/cursor classes are supplied per call site (idleSurface base
          // tone vs raised tone; checkpoint pins cursor-default).
          answered && !isSelected && !isRevealedCorrect && [
            "state-disabled",
            ...disabledExtra,
          ]
        )}
      >
        {/* Choice label letter — A, B, C, D… */}
        <span
          className={cn(
            "flex-shrink-0 flex items-center justify-center",
            "w-6 h-6 rounded-sm mt-0.5",
            "text-caption font-semibold",
            "transition-colors duration-standard ease-between",
            state === "idle" && !isRevealedCorrect && [
              "bg-border-subtle",
              "text-secondary",
            ],
            // On-semantic text: a letter on a FILLED success/error chip uses the
            // on-color (dark-mode contrast fix — text-white fails where the dark
            // success/error fills are light).
            state === "selected-correct" && [
              "bg-success",
              "text-success-on",
            ],
            state === "selected-incorrect" && [
              "bg-error",
              "text-error-on",
            ],
            isRevealedCorrect && [
              "bg-success",
              "text-success-on",
            ],
            answered && !isSelected && !isRevealedCorrect && [
              "bg-border-subtle",
              // #1: 12px letter badge text — promoted from tertiary to secondary
              "text-secondary",
            ]
          )}
          aria-hidden="true"
        >
          {label}
        </span>

        {/* Choice content — may contain KaTeX */}
        {/* `overflow-x-auto` : une réponse peut être une formule seule et
            insécable ($CH_3COOH/CH_3COO^-$ mesure 222 px). Sur un écran de
            320 px elle débordait du bouton et emportait la page ; elle défile
            désormais dans sa propre ligne. Le témoin « correct/incorrect »
            reste DANS ce conteneur, donc toujours à la suite du texte. */}
        <span className="flex-1 min-w-0 overflow-x-auto">
          <MathText>{choice.text}</MathText>

          {/* Animated correctness indicator — color + icon + text (never color alone §9) */}
          {isSelected && answered && (
            <span
              className={cn(
                "ml-2 inline-flex items-center gap-1",
                "text-caption font-semibold",
                state === "selected-correct" && "text-success",
                state === "selected-incorrect" && "text-error"
              )}
              aria-hidden="true"
            >
              {state === "selected-correct"
                ? (
                  <>
                    <ResultIcon kind="correct" animate size={16} />
                    <span>correct</span>
                  </>
                )
                : (
                  <>
                    <ResultIcon kind="incorrect" animate size={16} />
                    <span>incorrect</span>
                  </>
                )}
            </span>
          )}
        </span>
      </button>

      {/* Per-choice feedback — shown after answering, only for selected choice.
          Identical markup across MCQ and checkpoint; the checkpoint's
          model-naming is carried by choice.feedback content, not the slot. */}
      {isSelected && answered && choice.feedback && (
        <div
          id={feedbackId}
          role="status"
          className={cn(
            "mt-2 ml-9",
            "px-4 py-3 rounded-lg",
            "border-l-2",
            "text-body-sm",
            // Le retour porte souvent la formule corrigée en entier.
            "overflow-x-auto",
            state === "selected-correct" && [
              "bg-success-subtle",
              "border-success",
              "text-primary",
            ],
            state === "selected-incorrect" && [
              "bg-error-subtle",
              "border-error",
              "text-primary",
            ]
          )}
        >
          <MathText>{choice.feedback}</MathText>
        </div>
      )}

      {/* Justification du BON choix, pour l'élève qui s'est trompé.
          Même gabarit que le bloc ci-dessus, toujours en tonalité succès —
          la ligne qu'il commente est celle qui est surlignée en vert. Ne
          s'affiche que sur opt-in (`revealCorrectFeedback`), donc jamais dans
          la banque de fin, dont la clé n'a pas de `feedback` de toute façon et
          dont l'explication est portée par `item.solution`. */}
      {revealedFeedback && (
        <div
          id={feedbackId}
          /* PAS de role="status" ici, délibérément. Répondre déclenche déjà
             DEUX régions live : le retour du choix coché, et la ligne de
             résultat. En ajouter une troisième ferait s'empiler trois
             annonces sur un même geste. Ce bloc est du contenu explicatif —
             il est lu dans l'ordre du document, et il est la description
             (aria-describedby) de la ligne correcte. */
          className={cn(
            "mt-2 ml-9",
            "px-4 py-3 rounded-lg",
            "border-l-2",
            "text-body-sm",
            "overflow-x-auto",
            "bg-success-subtle",
            "border-success",
            "text-primary"
          )}
        >
          <MathText>{revealedFeedback}</MathText>
        </div>
      )}
    </li>
  );
}

// ── Shared summary/result row ─────────────────────────────────────────────────
//
// The calm, binary post-answer summary — no score, no tally, no celebration.
// Identical in McqItem and CheckpointItem; shared here. Renders nothing until
// answered (the caller previously guarded with `answered && (...)`; kept here so
// the call sites read the same).
export function ResultRow({
  answered,
  isCorrect,
}: {
  answered: boolean;
  isCorrect: boolean;
}) {
  if (!answered) return null;

  return (
    <div
      className={cn(
        "mt-5 pt-5",
        "border-t border-subtle",
        "flex items-center gap-2",
        "text-body-sm font-medium",
        isCorrect
          ? "text-success"
          : "text-error"
      )}
      role="status"
      aria-live="polite"
    >
      {/* SVG icon + text: never color alone (§9) */}
      <span aria-hidden="true" className="flex-shrink-0">
        {isCorrect
          ? <ResultIcon kind="correct" size={14} />
          : <ResultIcon kind="incorrect" size={14} />}
      </span>
      <span>
        {isCorrect
          ? "Bonne réponse."
          : "Réponse incorrecte — voir le détail ci-dessus."}
      </span>
    </div>
  );
}
