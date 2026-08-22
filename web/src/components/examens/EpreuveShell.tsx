"use client";

/**
 * EpreuveShell — l'épreuve en conditions réelles (EXAM-MODE-SPEC §2, C5 v1).
 *
 * Machine à trois phases :
 *   « seuil »      les conditions + UNE action primaire (Commencer) ;
 *   « encours »    chrono ÉCOULÉ discret (jamais de compte à rebours rouge,
 *                  jamais de son), énoncés SEULS — attempt-first ABSOLU :
 *                  aucune correction dans le DOM avant « Terminer » (même
 *                  contrat que les leçons, asserté par dom-truth) ;
 *   « correction » raisonnement expert par question + auto-notation à trois
 *                  états (Juste / Partiel / Faux), note indicative /20,
 *                  renvois « Revoir la notion ».
 *
 * FRONTIÈRE CALME (bible §0) : le chrono et la note vivent ICI et seulement
 * ici — c'est la salle d'examen, périphérie assumée ; les leçons restent
 * sans chrono ni score. Aucune célébration, aucun rouge d'alerte, pas de
 * persistance (v1 : l'auto-évaluation meurt avec la page — honest-state,
 * la vraie persistance viendra avec l'auth).
 *
 * Barème par question : le tag « (x,xx pt) » des stems quand il existe
 * (transcrit du scan), sinon répartition égale du barème de l'exercice —
 * la note est étiquetée « indicative » précisément pour ça.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/components/ui/Lien";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { notionHref } from "@/lib/subjects";
import { MdBlock } from "@/components/notion/AttemptFirstExercise";

export interface ExamQuestionData {
  id: string;
  part?: string;
  stem: string;
  reasoning: string;
}

export interface ExamExoData {
  subject: string;
  notionSlug: string;
  notionTitle: string;
  exerciseLabel?: string;
  titre: string;
  baremeTotal?: number;
  intro?: string;
  questions: ExamQuestionData[];
}

export interface EpreuveData {
  id: string;
  titre: string;
  filiereLabel: string;
  pts: number;
  dureeOfficielleMin: number;
  complete: boolean;
  exercices: ExamExoData[];
}

type Phase = "seuil" | "encours" | "correction";
type Verdict = "juste" | "partiel" | "faux";

/** « 1 h 23 min » — le temps écoulé, sans dramaturgie. */
function formatDuree(totalSec: number): string {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h} h ${String(m).padStart(2, "0")} min`;
  if (m > 0) return `${m} min ${String(s).padStart(2, "0")}`;
  return `${s} s`;
}

/** Barème d'une question : le tag transcrit « (x,xx pt) » sinon null. */
function ptsDepuisStem(stem: string): number | null {
  const m = stem.match(/\((\d+(?:[.,]\d+)?)\s*(?:pt|pts|point)/i);
  if (!m) return null;
  return parseFloat(m[1].replace(",", "."));
}

function formatNote(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2).replace(".", ",").replace(/,?0+$/, "") || "0";
}

export function EpreuveShell({ epreuve }: { epreuve: EpreuveData }) {
  const [phase, setPhase] = useState<Phase>("seuil");
  const [secondes, setSecondes] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  const chronoFinal = useRef<number>(0);

  // Chrono : écoulé, 1 s, coupé en pause et en correction. L'onglet inactif
  // dérive avec setInterval — acceptable pour une répétition (pas un
  // instrument de certification, la note est « indicative »).
  useEffect(() => {
    if (phase !== "encours" || enPause) return;
    const t = setInterval(() => setSecondes((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, enPause]);

  const commencer = useCallback(() => {
    setPhase("encours");
    window.scrollTo({ top: 0 });
  }, []);

  const terminer = useCallback(() => {
    chronoFinal.current = secondes;
    setPhase("correction");
    window.scrollTo({ top: 0 });
  }, [secondes]);

  // Barème par question, résolu une fois : tag transcrit sinon part égale.
  const bareme = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < epreuve.exercices.length; i++) {
      const exo = epreuve.exercices[i];
      const tags = exo.questions.map((q) => ptsDepuisStem(q.stem));
      const somme = tags.reduce<number>((s, t) => s + (t ?? 0), 0);
      const manquants = tags.filter((t) => t == null).length;
      const reste = Math.max((exo.baremeTotal ?? 0) - somme, 0);
      const partEgale = manquants > 0 ? reste / manquants : 0;
      exo.questions.forEach((q, j) => {
        m.set(`${i}:${q.id}`, tags[j] ?? partEgale);
      });
    }
    return m;
  }, [epreuve]);

  const note = useMemo(() => {
    let gagne = 0;
    for (const [cle, v] of Object.entries(verdicts)) {
      const pts = bareme.get(cle) ?? 0;
      gagne += v === "juste" ? pts : v === "partiel" ? pts / 2 : 0;
    }
    const sur20 = epreuve.pts > 0 ? (gagne / epreuve.pts) * 20 : 0;
    const repondu = Object.keys(verdicts).length;
    const totalQ = epreuve.exercices.reduce((s, e) => s + e.questions.length, 0);
    return { gagne, sur20, repondu, totalQ };
  }, [verdicts, bareme, epreuve]);

  const depassement = secondes > epreuve.dureeOfficielleMin * 60;

  // ── Phase seuil ──────────────────────────────────────────────────────────
  if (phase === "seuil") {
    return (
      <section
        aria-label="Conditions de l'épreuve"
        className="rounded-xl border border-subtle bg-surface-raised p-6 shadow-elevation-1 bp-medium:p-8"
      >
        <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
          {epreuve.filiereLabel}
        </p>
        <h2 className="mt-1 font-display text-h2 font-bold text-primary">
          Avant de commencer
        </h2>
        <ul className="mt-4 space-y-2 text-body text-secondary">
          <li>
            Durée officielle :{" "}
            <span className="mono-inline text-primary">
              {epreuve.dureeOfficielleMin / 60} h
            </span>{" "}
            — le chrono affiche le temps écoulé, calmement. Tu peux le mettre
            en pause : c’est une répétition, pas une surveillance.
          </li>
          <li>
            {frenchTypography(
              "Travaille sur papier, comme le jour J — l'écran sert à lire le sujet."
            )}
          </li>
          <li>
            Les corrections n’apparaissent qu’après « Terminer l’épreuve » ;
            tu t’auto-évalues ensuite question par question, au barème.
          </li>
          {!epreuve.complete && (
            <li className="text-primary">
              {frenchTypography(
                `Épreuve partielle : ${formatNote(epreuve.pts)} pts sur 20 sont disponibles — la note sera ramenée sur 20 par règle de trois, à titre indicatif.`
              )}
            </li>
          )}
        </ul>
        <button type="button" onClick={commencer} data-primary-action className="btn-primary mt-8">
          Commencer l’épreuve
        </button>
      </section>
    );
  }

  const enCorrection = phase === "correction";

  return (
    <div>
      {/* Barre d'épreuve — sticky, discrète. Le chrono est un FAIT en mono,
          pas une alarme : jamais de rouge, jamais de compte à rebours. */}
      <div
        data-barre-epreuve
        className={cn(
          "sticky top-14 z-raised -mx-2 mb-8 flex items-center justify-between gap-3",
          "rounded-lg border border-subtle bg-surface-raised px-4 py-2 shadow-elevation-1"
        )}
      >
        {enCorrection ? (
          <p className="text-body-sm text-secondary">
            Auto-évaluation —{" "}
            <span className="mono-inline tabular-nums">
              {note.repondu}/{note.totalQ}
            </span>{" "}
            questions notées ·{" "}
            <span data-note-indicative className="mono-inline font-medium text-primary">
              {formatNote(note.sur20)} / 20
            </span>{" "}
            <span className="text-tertiary">(indicative)</span>
          </p>
        ) : (
          <p className="text-body-sm text-secondary" aria-live="off">
            <span data-chrono className="mono-inline tabular-nums">{formatDuree(secondes)}</span>
            {depassement && (
              <span className="ml-2 text-tertiary">
                — au-delà de la durée officielle
              </span>
            )}
          </p>
        )}
        <div className="flex items-center gap-2">
          {!enCorrection && (
            <button
              type="button"
              onClick={() => setEnPause((p) => !p)}
              className={cn(
                "rounded px-2 py-1 text-body-sm font-medium text-secondary hover:text-primary",
                "state-layer focus-ring [--focus-radius:8px]"
              )}
            >
              {enPause ? "Reprendre" : "Pause"}
            </button>
          )}
          {!enCorrection && (
            <button type="button" onClick={terminer} className="btn-primary">
              Terminer l’épreuve
            </button>
          )}
          {enCorrection && (
            <p className="text-body-sm text-tertiary">
              Temps mis :{" "}
              <span className="mono-inline tabular-nums">
                {formatDuree(chronoFinal.current)}
              </span>
            </p>
          )}
        </div>
      </div>

      {enPause && !enCorrection && (
        <p role="status" className="mb-8 rounded-lg border border-subtle bg-surface-container-low px-4 py-3 text-body-sm text-secondary">
          En pause — le chrono est arrêté. Reprends quand tu es prêt.
        </p>
      )}

      {/* Les exercices, dans l'ordre du sujet réel. */}
      <ol className="space-y-8" aria-label="Exercices de l'épreuve">
        {epreuve.exercices.map((exo, i) => (
          <li key={i}>
            <article
              data-exam-exo
              className="overflow-hidden rounded-xl border border-subtle bg-surface-raised shadow-elevation-1"
            >
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-subtle bg-surface-container-low px-5 py-3">
                <h2 className="text-h4 font-semibold text-primary">
                  {exo.exerciseLabel ?? `Exercice ${i + 1}`}
                </h2>
                <p className="min-w-0 flex-1 truncate text-body-sm text-secondary" title={exo.titre}>
                  {exo.titre}
                </p>
                {exo.baremeTotal != null && (
                  <span className="mono-inline shrink-0 text-body-sm text-tertiary">
                    {formatNote(exo.baremeTotal)} pts
                  </span>
                )}
              </header>
              <div className="space-y-5 px-5 py-5">
                {exo.intro && <MdBlock>{exo.intro}</MdBlock>}
                {exo.questions.map((q) => {
                  const cle = `${i}:${q.id}`;
                  const verdict = verdicts[cle];
                  const qPts = bareme.get(cle) ?? 0;
                  return (
                    <div key={q.id} className="border-t border-subtle pt-4 first:border-t-0 first:pt-0">
                      {q.part && (
                        <p className="mb-1 text-caption font-medium uppercase tracking-eyebrow text-tertiary">
                          {q.part}
                        </p>
                      )}
                      <MdBlock>{q.stem}</MdBlock>

                      {/* ATTEMPT-FIRST ABSOLU : le raisonnement n'entre dans
                          le DOM qu'en phase correction — dom-truth l'asserte. */}
                      {enCorrection && (
                        <div className="mt-3 rounded-lg border border-subtle bg-surface-container-low p-4">
                          <p className="mb-2 text-caption font-medium uppercase tracking-eyebrow text-secondary">
                            Raisonnement expert
                          </p>
                          <MdBlock>{q.reasoning}</MdBlock>
                          <div
                            role="radiogroup"
                            aria-label={frenchTypography(`Auto-évaluation de la question (${formatNote(qPts)} pt)`)}
                            className="mt-4 flex flex-wrap items-center gap-2"
                          >
                            <span className="text-body-sm text-secondary">
                              Ta copie :
                            </span>
                            {(["juste", "partiel", "faux"] as const).map((v) => (
                              <button
                                key={v}
                                type="button"
                                role="radio"
                                aria-checked={verdict === v}
                                onClick={() =>
                                  setVerdicts((prev) => ({ ...prev, [cle]: v }))
                                }
                                className={cn(
                                  "min-h-touch rounded-lg border px-3 text-body-sm font-medium",
                                  "state-layer focus-ring [--focus-radius:8px]",
                                  "transition-colors duration-micro ease-enter",
                                  verdict === v
                                    ? "border-field bg-surface-overlay text-primary shadow-elevation-1"
                                    : "border-subtle text-secondary hover:text-primary"
                                )}
                              >
                                {v === "juste"
                                  ? `Juste · ${formatNote(qPts)} pt`
                                  : v === "partiel"
                                    ? `Partiel · ${formatNote(qPts / 2)}`
                                    : "Faux · 0"}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                {enCorrection && (
                  <p className="border-t border-subtle pt-4 text-body-sm">
                    <Link
                      href={notionHref(exo.subject, exo.notionSlug)}
                      className={cn(
                        "font-medium text-accent underline-offset-2 hover:underline",
                        "focus-ring rounded [--focus-radius:4px]"
                      )}
                    >
                      Revoir la notion — {exo.notionTitle} →
                    </Link>
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>

      {!enCorrection && (
        <div className="mt-10 flex justify-center">
          <button type="button" onClick={terminer} className="btn-primary">
            Terminer l’épreuve
          </button>
        </div>
      )}

      {enCorrection && (
        <section
          aria-label="Bilan de l'auto-évaluation"
          className="mt-10 rounded-xl border border-subtle bg-surface-raised p-6 shadow-elevation-1"
        >
          <h2 className="font-display text-h3 font-semibold text-primary">
            Ton bilan
          </h2>
          <p className="mt-2 text-body text-secondary">
            {frenchTypography(
              `${formatNote(note.gagne)} pts sur les ${formatNote(epreuve.pts)} disponibles, soit`
            )}{" "}
            <span className="mono-inline font-medium text-primary">
              {formatNote(note.sur20)} / 20
            </span>{" "}
            — auto-évaluation indicative
            {!epreuve.complete && ", ramenée sur 20 par règle de trois"}. Le
            vrai gain est dans les questions marquées « Partiel » ou « Faux » :
            remonte aux notions par les liens de chaque exercice.
          </p>
        </section>
      )}
    </div>
  );
}
