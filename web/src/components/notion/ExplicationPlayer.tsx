"use client";

/**
 * ExplicationPlayer — l'explication animée d'un exercice de banque, pas à pas.
 *
 * ── La garde « tentative d'abord » (la règle qui prime sur tout le reste)
 * Cette vidéo EST le corrigé : elle déroule l'exercice entier, question
 * après question. La montrer avant la tentative reviendrait à publier le
 * raisonnement dans le DOM avant le commit — exactement ce que tout le
 * produit s'interdit. Le lecteur est donc derrière sa propre porte, avec
 * la formulation des autres portes du site, et **rien de la vidéo (ni
 * <video>, ni URL, ni transcript) n'est monté avant le clic**. La garde
 * dom-truth « attempt-first » s'étend ici verbatim.
 *
 * ── Le contrat de lecteur calme (ADR 0028 §3)
 *   · Aucune lecture automatique au montage ni à l'ouverture.
 *   · Rythme de l'élève : un clip par étape, qui s'arrête et attend.
 *   · Progression visible : « Étape n / N » + le libellé parlé de l'étape.
 *   · `prefers-reduced-motion` : aucune vidéo — affiche + transcript
 *     intégral, la même règle que Derivation/StagedFigure (tout est
 *     montré, les commandes disparaissent).
 *   · Transcript toujours visible sous le lecteur — a11y et révision
 *     silencieuse (un élève en salle d'étude lit au lieu d'écouter).
 *   · La vidéo complète reste offerte, en mode secondaire.
 *
 * ── La grammaire de transport est celle de MotionStage/MotionDiagram
 * TransportButton « Précédent » (désactivé à l'étape 1) · « Étape n / N »
 * (aria-live polite, aria-atomic) · « Suivant » devenant « Recommencer »
 * à la dernière étape. Pas de flèches clavier : ArrowLeft/Right
 * appartiennent au transport de chapitre (une geste, un propriétaire).
 *
 * Cœur calme : pas de minuteur, pas de score, pas de pourcentage
 * d'avancement, pas de célébration. Aucun stockage navigateur — l'étape
 * courante vit dans le state React et rien d'autre.
 *
 * COMPOSANT CLIENT.
 */

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { TransportButton } from "./TransportButton";
import { StagedFigure } from "./StagedFigure";
import type { ExplicationResolue, ExplicationInteractive } from "@/lib/explications";

function Transcript({ lignes }: { lignes: string[] }) {
  if (lignes.length === 0) return null;
  return (
    <div data-explication-transcript className="mt-3 max-w-reading">
      {lignes.map((l, i) => (
        <p key={i} className="text-body-sm text-secondary">
          {l}
        </p>
      ))}
    </div>
  );
}

export function ExplicationPlayer({
  explication = null,
  interactive = null,
  title,
}: {
  explication?: ExplicationResolue | null;
  /** Figure étagée — quand elle existe, elle REMPLACE la vidéo. */
  interactive?: ExplicationInteractive | null;
  title: string;
}) {
  const [revealed, setRevealed] = useState(false);
  const [step, setStep] = useState(1);
  const [full, setFull] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ne joue QUE sur une action délibérée de l'élève. Au montage et à
  // l'ouverture, la valeur reste false : c'est ce qui distingue « je
  // viens de cliquer Suivant » d'une lecture automatique subie.
  const suiteGesteRef = useRef(false);

  // Ces valeurs ne concernent que le repli vidéo. Elles doivent rester
  // sûres quand l'entrée n'a QUE de l'interactif (explication === null) —
  // les hooks, eux, tournent toujours dans le même ordre.
  const etapesVideo = explication?.steps ?? [];
  const total = etapesVideo.length;
  const courante = total > 0 ? etapesVideo[Math.min(step, total) - 1] : null;
  const atFirst = step <= 1;
  const atLast = step >= total;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Le <video> est remonté à chaque changement d'étape (clé = slug), donc
  // il repart en pause. On ne relance QUE si le changement vient d'un
  // clic sur le transport — jamais à l'ouverture du lecteur.
  useEffect(() => {
    if (!suiteGesteRef.current) return;
    suiteGesteRef.current = false;
    videoRef.current?.play().catch(() => {
      // Lecture refusée par le navigateur : le contrôle natif reste là,
      // l'élève lance lui-même. Rien à signaler.
    });
  }, [step, full]);

  function va(n: number) {
    suiteGesteRef.current = true;
    setStep(Math.min(Math.max(n, 1), total));
  }

  if (!revealed) {
    return (
      <div data-explication-gate className="mt-6 border-t border-subtle pt-5">
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-2",
            "min-h-touch rounded-md",
            "text-body-sm font-medium",
            "text-secondary",
            "border border-subtle",
            "bg-surface-raised",
            "hover:text-primary hover:border-soft",
            "transition-colors duration-micro",
            "state-layer focus-ring [--focus-radius:8px]"
          )}
        >
          <Icon name="play" size={13} />
          {interactive
            ? "J’ai fait ma tentative — voir l’explication pas à pas"
            : "J’ai fait ma tentative — voir l’explication animée"}
        </button>
        <p className="mt-2 text-caption text-secondary max-w-reading">
          L’explication reprend l’exercice entier, étape par étape. Elle vaut
          bien plus une fois que tu as buté quelque part — c’est le blocage qui
          rend l’explication utile.
        </p>
      </div>
    );
  }

  // L'interactif prime : figure manipulable, texte vivant, ~30 Ko, rythme
  // de l'élève. La vidéo n'est plus qu'un repli, le temps que les
  // explications soient converties.
  if (interactive) {
    return (
      <section
        data-explication
        data-explication-kind="interactive"
        aria-label={`Explication pas à pas — ${title}`}
        className="mt-6 border-t border-subtle pt-5"
      >
        <h4 className="text-caption font-medium uppercase tracking-eyebrow text-accent">
          Explication pas à pas
        </h4>
        <div className="mt-3">
          <StagedFigure
            svg={interactive.svg}
            slug={interactive.slug}
            stages={interactive.stages}
            label={title}
            /* On démarre TOUJOURS à l'étape 1 : l'explication d'un exercice
               se lit du début, contrairement aux figures de leçon dont
               l'étape d'entrée dépend de leur place dans le document. */
            initialStage={1}
          />
        </div>
      </section>
    );
  }

  if (!explication) return null;

  return (
    <section
      data-explication
      data-explication-kind="video"
      data-entry-id={explication.entry}
      aria-label={`Explication animée — ${title}`}
      className="mt-6 border-t border-subtle pt-5"
    >
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h4 className="text-caption font-medium uppercase tracking-eyebrow text-accent">
          Explication animée
        </h4>
        {/* Mode secondaire — la vidéo continue, d'un seul tenant. */}
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => {
              suiteGesteRef.current = false;
              setFull((f) => !f);
            }}
            className={cn(
              "text-caption text-secondary underline underline-offset-2",
              "hover:text-primary transition-colors duration-micro",
              "focus-ring [--focus-radius:4px] rounded-sm"
            )}
          >
            {full ? "Revenir au pas à pas" : "Voir la vidéo complète"}
          </button>
        )}
      </div>

      {reducedMotion ? (
        /* Mouvement réduit — aucune vidéo. L'affiche fixe et le transcript
           intégral portent le contenu : même parti que Derivation, où tout
           est montré d'un coup et les commandes disparaissent. */
        <div className="mt-4">
          {explication.posterUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={explication.posterUrl}
              alt=""
              className="w-full rounded-lg border border-subtle"
            />
          )}
          <p className="mt-2 text-caption text-secondary italic">
            Mouvement réduit activé — transcript intégral ci-dessous.
          </p>
          <ol className="mt-3 max-w-reading">
            {explication.steps.map((s) => (
              <li key={s.slug} className="mt-3">
                <p className="text-caption text-tertiary tabular-nums">
                  Étape {s.n} / {total}
                </p>
                <Transcript lignes={s.captions.length ? s.captions : [s.label]} />
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="mt-4">
          <video
            ref={videoRef}
            /* La clé force un remontage propre à chaque changement de
               source : sans elle, Chrome garde parfois la frame du clip
               précédent sous le nouveau. */
            key={full ? "full" : (courante?.slug ?? "v")}
            src={full ? explication.fullUrl : (courante?.url ?? "")}
            /* Chaque étape a SON affiche : une affiche globale montrerait
               l'image d'une autre étape que celle annoncée par le transport. */
            poster={
              (full ? explication.posterUrl : (courante?.posterUrl ?? null)) ?? undefined
            }
            controls
            /* Rien n'est tiré tant que l'élève ne lance pas : l'affiche
               suffit à montrer où on en est. */
            preload="none"
            playsInline
            className="w-full rounded-lg border border-subtle bg-surface-raised"
          />

          {!full && (
            <>
              <div
                className="mt-3 flex items-center gap-2 flex-wrap"
                role="group"
                aria-label={`Contrôles : explication animée — ${title}`}
              >
                <TransportButton
                  onClick={() => va(step - 1)}
                  disabled={atFirst}
                  aria-label="Étape précédente"
                >
                  <Icon name="chevron-left" size={14} />
                  <span className="hidden bp-medium:inline">Précédent</span>
                </TransportButton>

                <span
                  className={cn(
                    "text-caption text-secondary",
                    "tabular-nums select-none",
                    "min-w-[6ch] text-center"
                  )}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {`Étape ${step} / ${total}`}
                </span>

                <TransportButton
                  onClick={() => va(atLast ? 1 : step + 1)}
                  aria-label={atLast ? "Recommencer depuis l’étape 1" : "Étape suivante"}
                >
                  <span className="hidden bp-medium:inline">
                    {atLast ? "Recommencer" : "Suivant"}
                  </span>
                  <Icon name={atLast ? "reset" : "chevron-right"} size={14} />
                </TransportButton>
              </div>

              {/* Le libellé de l'étape + sa narration. C'est le transcript :
                  toujours présent, jamais replié — on lit aussi bien qu'on
                  écoute. */}
              <p className="mt-3 text-body-sm font-medium text-primary max-w-reading">
                {courante?.label}
              </p>
              {/* Le libellé EST la première phrase de narration : la
                  réafficher juste en dessous ferait doublon. On ne montre
                  donc que la suite. */}
              <Transcript
                lignes={
                  courante && courante.captions[0] === courante.label
                    ? courante.captions.slice(1)
                    : (courante?.captions ?? [])
                }
              />
            </>
          )}
        </div>
      )}
    </section>
  );
}
