/**
 * session.ts — the home session element's data contract (Day-4 freeze,
 * Set B = B1 "session-first", FABLE-DECIDED / OWNER-REVIEW-PENDING).
 *
 * THE HONEST-STATE RULE (owner directive, Day 4): the home surface never
 * fabricates progress. No invented "en cours", no fake resume position, no
 * mock history — the truthful first-visit state IS the design until real
 * per-student state exists.
 *
 *   start  — nothing in progress; suggest where to begin (deterministic :
 *            la PREMIÈRE notion du programme, `premiereDuParcours`. Ce point
 *            disait « la notion la plus récemment mise à jour — un fait réel
 *            et vérifiable » : la date de fichier n'en est pas un après un
 *            clone frais, et la ligne d'à côté disait autre chose. Corrigé
 *            le 2026-09-05, voir `startSession`).
 *   resume — REQUIRES persisted student state (LEARNER-MODEL-SPEC). Real
 *            now (`sessionFromState`, below) once a live `StudentState`
 *            carries a `lastSession`.
 *
 * This module is PURE and client-safe by construction: it takes `notions`
 * (already loaded server-side via `listNotions()`, e.g. in `page.tsx`) as a
 * plain argument rather than reading the content tree itself. That matters
 * concretely — `SessionCard.tsx` (this module's one caller) is now a Client
 * Component (`useStudentState()` is browser-only), and `@/lib/content`
 * imports Node's `fs` at its top level; if THIS file imported `listNotions`
 * directly, that `fs` import would get pulled into the CLIENT bundle the
 * moment any Client Component imported `session.ts`, breaking `next build`.
 * Keeping this module import-`NotionMeta`-as-a-TYPE-only (erased at compile
 * time) and accepting `notions` as data instead is what keeps it safe in
 * both a Server Component and a Client Component.
 */

import type { NotionMeta } from "@/lib/content";
import { premiereDuParcours } from "./curriculum";
import type { StudentState } from "@/lib/student-state";

export type SessionState =
  | {
      kind: "start";
      notion: NotionMeta;
      /** Why this notion — honest, stated to the student. */
      reason: string;
    }
  | {
      kind: "resume";
      notion: NotionMeta;
      /** Human position label, e.g. « Les trois régimes ». From real state only. */
      position: string;
      step: number;
      totalSteps: number;
    };

/** Deterministic, honest suggestion: the most recently updated notion. */
/**
 * La session d'un élève sans état : la PREMIÈRE notion du programme.
 *
 * Ce bloc triait les notions par `updatedAtMs` — la date de fichier — et
 * proposait « la plus récente ». Deux problèmes, corrigés le 2026-09-05 :
 *
 *   · c'était FAUX. Après un clone frais, donc à chaque déploiement, toutes
 *     les dates de fichier valent l'instant du checkout : « la plus
 *     récente » retombait sur l'ordre du système de fichiers. Le lien le
 *     plus important du site pointait où le hasard le mettait.
 *   · et ça CONTREDISAIT la ligne du dessous. `NextUp`, rendu trois lignes
 *     plus bas, répond à la même question par l'ordre du PROGRAMME. Sur une
 *     page d'accueil neuve, la carte proposait une notion de philosophie et
 *     la ligne suivante une de maths.
 *
 * `premiereDuParcours` (lib/curriculum.ts) est désormais la seule réponse, et
 * les deux surfaces la partagent. Sans filière — `session.ts` est pur et n'en
 * reçoit pas — la règle d'or s'applique d'elle-même : ne rien filtrer.
 */
function startSession(notions: NotionMeta[]): SessionState | null {
  if (notions.length === 0) return null;
  const construites = new Set(notions.map((n) => n.id));
  const premiereId = premiereDuParcours(construites);
  const premiere =
    (premiereId ? notions.find((n) => n.id === premiereId) : undefined) ?? notions[0];
  return {
    kind: "start",
    notion: premiere,
    reason: "La première notion du parcours — on la prend depuis le début.",
  };
}

/**
 * sessionFromState — the same B1 contract, now honestly resume-aware.
 *
 * `state.lastSession` (when present) is the real "aujourd'hui" fact: which
 * notion, which chapter, when. `step`/`totalSteps` render from that fact
 * plus `state.perNotion[notionId].chaptersTotal` (both real, stored
 * columns) — no fabricated numbers.
 *
 * `position` renders as the honest numeric fallback "Chapitre {n}" rather
 * than a curated chapter-HEADING label ("« Les trois régimes »"): the
 * curated title lives in lesson.md, which is `fs`-only content data this
 * client-side read has no path to without either a new server round-trip or
 * threading a chapter-title map down through props — both flagged here as a
 * follow-up, not invented in its place. The number is still a REAL fact
 * (the student's own recorded chapter index), never a placeholder.
 *
 * Falls back to `startSession` whenever `state` is `null`, has no
 * `lastSession`, or the referenced notion/perNotion entry can't be found
 * (e.g. a notion that existed when visited has since been removed from the
 * content tree) — always the same honest "start" framing, never a broken
 * resume.
 */
export function sessionFromState(
  notions: NotionMeta[],
  state: StudentState | null
): SessionState | null {
  if (state?.lastSession) {
    const { notionId, chapterIndex } = state.lastSession;
    const notion = notions.find((n) => n.id === notionId);
    const perNotion = state.perNotion[notionId];
    if (notion && perNotion) {
      const totalSteps = Math.max(1, perNotion.chaptersTotal || 1);
      const step = Math.min(Math.max(1, chapterIndex + 1), totalSteps);
      return {
        kind: "resume",
        notion,
        position: `Chapitre ${step}`,
        step,
        totalSteps,
      };
    }
  }
  return startSession(notions);
}
