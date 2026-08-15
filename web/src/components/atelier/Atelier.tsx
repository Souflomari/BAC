"use client";

/**
 * Atelier — le parcours d'une chaîne de compétences (NORTH-STAR-V2).
 *
 * La boucle, et rien d'autre : un écran = une figure + deux phrases + une
 * chose à faire. L'élève agit, se trompe, reçoit une réponse qui vise SON
 * erreur, recommence, avance.
 *
 * COMPOSITION (refonte, retour owner : « les explications sont écrites en
 * petit à la fin, elles ne couvrent pas tout l'écran ; tout le côté visuel
 * n'est pas au niveau »). Deux panneaux, et le partage n'est pas cosmétique :
 *
 *   · LA SCÈNE, à gauche, sur une surface presque blanche, COLLANTE. C'est
 *     la moitié dominante et elle ne quitte jamais le champ de vision. Quand
 *     l'élève lit la réponse à son erreur, la figure qui trace cette erreur
 *     est encore sous ses yeux — sinon la figure n'est qu'une illustration
 *     qu'on a dépassée en scrollant.
 *   · LA CONDUITE, à droite, qui défile : le cadrage, la question, les
 *     réponses, puis la réponse à l'erreur — en taille de lecture, pas en
 *     note de bas de page.
 *
 * Cœur calme : pas de score, pas de minuteur, pas de série, pas de
 * célébration. On avance, c'est tout.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { FigurePente } from "./Figures";
import { FigureSecanteMafs } from "./FigureSecanteMafs";
import { COMPETENCES, ECRANS, type Ecran } from "@/lib/atelier/derivees";
import { PlanChaine } from "./PlanChaine";
import { Apparition } from "./Apparition";
import { useRessort } from "./useRessort";
import { SPATIAL } from "@/lib/m3-motion";

/* ── le rail de progression ────────────────────────────────────────────── */

/**
 * La chaîne, en une bande fine au-dessus de la scène plutôt qu'en colonne
 * à côté d'elle : la colonne latérale volait de la largeur à la figure, et
 * la figure est ce qui enseigne.
 */
function Rail({ courante, i, termine }: { courante: string; i: number; termine: boolean }) {
  const idx = COMPETENCES.findIndex((x) => x.id === courante);
  const avancement = useRessort((i + 1) / ECRANS.length, SPATIAL.standardSlow);

  return (
    <div data-chaine>
      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-lowest">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${Math.max(0, Math.min(1, avancement)) * 100}%` }}
        />
      </div>
      <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
        {COMPETENCES.map((c, k) => {
          // `termine` coche la DERNIÈRE compétence : sans lui, l'étape 5
          // restait éternellement « en cours » alors que l'élève venait de
          // répondre juste à la dernière question (audit 2026-08-15).
          const etat = k < idx || (k === idx && termine) ? "fait" : k === idx ? "ici" : "apres";
          return (
            <li key={c.id} className="flex items-center gap-2">
              {/* Les chevrons disparaissent en colonne étroite : le rail y
                  passe sur trois lignes et chaque retour à la ligne laissait
                  un chevron orphelin en tête de ligne. */}
              {k > 0 && (
                <span aria-hidden className="hidden text-tertiary bp-expanded:inline-flex">
                  <Icon name="chevron-right" size={12} />
                </span>
              )}
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption",
                  etat === "fait" && "text-secondary",
                  etat === "ici" && "bg-accent-subtle font-semibold text-accent",
                  etat === "apres" && "text-tertiary"
                )}
              >
                {etat === "fait" && <Icon name="check" size={12} />}
                {c.titre}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── la jauge des écrans de réglage ────────────────────────────────────── */

/**
 * Ce que l'élève fabrique, et ce qu'on lui demande, côte à côte et en grand.
 *
 * Sans elle, un écran de réglage laissait la moitié droite vide et la valeur
 * courante enterrée sous la figure : l'élève devait chercher où regarder
 * pour savoir s'il approchait. Le nombre est animé au ressort — on voit la
 * valeur MONTER vers la cible, ce qui est exactement l'information utile.
 */
function Jauge({ valeur, cible, atteint }: { valeur: number; cible: number; atteint: boolean }) {
  const v = useRessort(valeur, SPATIAL.standardFast);
  return (
    <div
      className={cn(
        "flex items-end justify-between gap-6 rounded-xl border px-5 py-4",
        atteint ? "border-accent bg-accent-subtle" : "border-subtle bg-surface-container-highest"
      )}
    >
      <div>
        <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
          ta pente
        </p>
        <p
          className={cn(
            "mt-1 font-serif text-display font-semibold tabular-nums leading-none",
            atteint ? "text-accent" : "text-primary"
          )}
        >
          {v.toFixed(2).replace(".", ",")}
        </p>
      </div>
      <div className="text-right">
        <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
          objectif
        </p>
        <p className="mt-1 font-serif text-h1 font-semibold tabular-nums leading-none text-secondary">
          {String(cible).replace(".", ",")}
        </p>
      </div>
    </div>
  );
}

/* ── l'atelier ─────────────────────────────────────────────────────────── */

export function Atelier() {
  // On entre par le PLAN, jamais directement dans le premier écran :
  // l'élève doit savoir où il va et ce qu'on suppose de lui avant de
  // commencer (retour owner : « ça arrive au hasard »).
  const [demarre, setDemarre] = useState(false);
  const [i, setI] = useState(0);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reussi, setReussi] = useState(false);
  const [valeur, setValeur] = useState(0.5);
  const [essaiReglage, setEssaiReglage] = useState(false);

  const ecran: Ecran = ECRANS[i];
  const option = useMemo(
    () => ecran.options?.find((o) => o.id === choisi) ?? null,
    [ecran, choisi]
  );

  const reglageOk =
    ecran.type === "reglage" &&
    ecran.cible != null &&
    Math.abs(valeur - ecran.cible) <= (ecran.tolerance ?? 0.001);

  const gagne = ecran.type === "choix" ? reussi : reglageOk && essaiReglage;
  const rate = option != null && !option.correct;

  function repondre(id: string) {
    const o = ecran.options?.find((x) => x.id === id);
    setChoisi(id);
    if (o?.correct) setReussi(true);
  }

  function recommencer() {
    setI(0); setChoisi(null); setReussi(false); setEssaiReglage(false);
    setValeur(0.5); setDemarre(false);
  }

  function suivant() {
    setI((n) => Math.min(n + 1, ECRANS.length - 1));
    setChoisi(null); setReussi(false); setEssaiReglage(false); setValeur(0.5);
  }

  const dernier = i === ECRANS.length - 1;

  if (!demarre) {
    return (
      <div className="mx-auto max-w-page px-5 py-10 bp-medium:px-8 bp-medium:py-14">
        <header className="max-w-reading">
          <p className="text-caption font-medium uppercase tracking-eyebrow text-accent">
            Prototype · chaîne de compétences
          </p>
          <h1 className="mt-2 font-serif text-h1 font-semibold text-primary">
            Les dérivées
          </h1>
          <p className="mt-3 text-body-lg text-secondary">
            De la pente vue au collège jusqu’au nombre dérivé du bac. Rien à lire
            d’abord : à chaque écran, tu fais quelque chose.
          </p>
        </header>
        <div className="mt-10">
          <PlanChaine onDemarrer={() => setDemarre(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-4 py-6 bp-medium:px-8 bp-medium:py-8">
      <Rail courante={ecran.competence} i={i} termine={dernier && gagne} />

      <div className="mt-6 grid gap-7 bp-expanded:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] bp-expanded:gap-10">
        {/* ── LA SCÈNE : la figure porte l'idée (R5), et elle reste visible ── */}
        <div className="bp-expanded:sticky bp-expanded:top-6 bp-expanded:self-start">
          <div
            className={cn(
              "rounded-xl border border-subtle p-4 bp-medium:p-6",
              // surface la plus claire du système : la scène est un plan
              // net, distinct du papier chaud du reste du site.
              "bg-surface-container-highest"
            )}
          >
            <Apparition cle={ecran.id} decalage={10} echelle={0.012}>
              {ecran.figure === "pente" && (
                <FigurePente
                  key={ecran.id}
                  bx={ecran.depart?.bx}
                  by={ecran.depart?.by}
                  fige={ecran.fige}
                  onChange={setValeur}
                  /* Le trait de l'erreur reste tant que l'élève n'a pas trouvé :
                     c'est LA figure qui lui répond, pas un paragraphe sous les
                     boutons. */
                  erreur={rate ? (option?.montre ?? null) : null}
                  erreurLabel={rate ? `ta réponse : ${option?.montre}` : undefined}
                />
              )}
              {ecran.figure === "secante" && (
                <FigureSecanteMafs
                  key={ecran.id}
                  hDepart={ecran.depart?.h}
                  /* Sur un écran de réglage, c'est la pente de (AB) qu'on
                     compare à la cible — la figure la remonte elle-même. */
                  onPente={ecran.type === "reglage" ? setValeur : undefined}
                  erreurPente={rate ? (option?.montre ?? null) : null}
                  erreurLabel={rate ? `ta réponse : ${option?.montre}` : undefined}
                />
              )}
            </Apparition>
          </div>
          <p className="mt-2.5 px-1 text-caption text-tertiary">
            Écran {i + 1} sur {ECRANS.length} · {COMPETENCES.find((c) => c.id === ecran.competence)?.titre}
          </p>
        </div>

        {/* ── LA CONDUITE : ce qu'on dit, ce qu'on demande, ce qu'on répond ── */}
        <div className="min-w-0">
          {/* ≤ 2 phrases (R2) */}
          <Apparition cle={ecran.id} delai={40}>
            <p className="font-serif text-h2 font-semibold leading-tight text-primary">
              {ecran.texte}
            </p>
          </Apparition>
          <Apparition cle={ecran.id} delai={90}>
            <p className="mt-4 text-lead text-secondary">{ecran.question}</p>
          </Apparition>

          {/* l'action (R1) */}
          {ecran.type === "choix" && (
            <div className="mt-6 grid gap-2.5">
              {ecran.options?.map((o, k) => {
                const actif = choisi === o.id;
                const montrerJuste = reussi && o.correct;
                return (
                  <Apparition key={o.id} cle={`${ecran.id}-${o.id}`} delai={140 + k * 55} decalage={10}>
                    <button
                      type="button"
                      onClick={() => repondre(o.id)}
                      disabled={reussi}
                      className={cn(
                        "w-full rounded-lg border px-5 py-4 text-left text-body-lg",
                        "state-layer focus-ring [--focus-radius:12px]",
                        "transition-colors duration-micro",
                        montrerJuste
                          ? "border-accent bg-accent-subtle font-medium text-primary"
                          : actif && !o.correct
                            ? "border-soft bg-surface-raised text-secondary"
                            : "border-subtle bg-surface-raised text-primary hover:border-soft",
                        reussi && !o.correct && "opacity-50"
                      )}
                    >
                      {o.label}
                    </button>
                  </Apparition>
                );
              })}
            </div>
          )}

          {ecran.type === "reglage" && ecran.cible != null && (
            <div className="mt-6">
              <Apparition cle={ecran.id} delai={140} decalage={10}>
                <Jauge valeur={valeur} cible={ecran.cible} atteint={reglageOk} />
              </Apparition>
              <button
                type="button"
                onClick={() => setEssaiReglage(true)}
                className={cn(
                  "mt-5 inline-flex min-h-touch items-center gap-2 rounded-full px-5 py-3",
                  "bg-accent text-on-accent text-body font-medium",
                  "state-layer focus-ring [--focus-radius:999px]",
                  "transition-transform duration-micro ease-enter hover:scale-[1.02]"
                )}
              >
                Vérifier mon réglage
              </button>
              {essaiReglage && !reglageOk && (
                <Apparition cle={`reglage-${valeur}`} decalage={12} className="mt-5">
                  <div role="status" className="rounded-xl border-l-[3px] border-soft bg-surface-container px-5 py-4">
                    <p className="text-body-lg text-primary">
                      Pas encore : ta pente vaut{" "}
                      <span className="tabular-nums font-semibold">
                        {valeur.toFixed(2).replace(".", ",")}
                      </span>
                      , on cherche {ecran.cible}.
                    </p>
                    {ecran.aide && (
                      <p className="mt-2 text-body text-secondary">{ecran.aide}</p>
                    )}
                  </div>
                </Apparition>
              )}
            </div>
          )}

          {/* ── la réponse à l'erreur — visée, jamais générique (R3) ──────
              Elle occupe le panneau, en taille de lecture. Ce n'est pas une
              note sous les boutons : c'est le moment où on enseigne. */}
          {rate && option && (
            <Apparition cle={`${ecran.id}-${option.id}-fb`} decalage={16} echelle={0.02} className="mt-6">
              <div
                data-feedback-erreur
                role="status"
                className="rounded-xl border-l-[3px] px-5 py-5 bp-medium:px-6 bp-medium:py-6"
                style={{
                  borderColor: "var(--figure-regime-aperiodic)",
                  background: "var(--color-surface-container-low)",
                }}
              >
                {option.montre != null && (
                  <p
                    className="flex items-center gap-2 text-caption font-semibold uppercase tracking-eyebrow"
                    style={{ color: "var(--figure-regime-aperiodic)" }}
                  >
                    <Icon name="arrow-right" size={13} />
                    Ta réponse est tracée sur la figure
                  </p>
                )}
                <p className={cn("text-lead leading-relaxed text-primary", option.montre != null && "mt-3")}>
                  {option.feedback}
                </p>
                {option.montre != null && (
                  <p className="mt-3 text-body text-secondary">
                    Le trait en pointillés, c’est ta pente. Compare-le au trait
                    plein : l’écart entre les deux, c’est ton erreur.
                  </p>
                )}
                <p className="mt-4 text-body-sm text-tertiary">
                  Reprends la figure, puis choisis à nouveau.
                </p>
              </div>
            </Apparition>
          )}

          {/* ce qu'on retient — APRÈS la réussite seulement */}
          {gagne && (
            <Apparition cle={`${ecran.id}-ok`} decalage={16} echelle={0.02} className="mt-6">
              {ecran.acquis && (
                <div
                  role="status"
                  className="rounded-xl border-l-[3px] border-accent bg-accent-subtle px-5 py-5 bp-medium:px-6 bp-medium:py-6"
                >
                  <p className="text-caption font-semibold uppercase tracking-eyebrow text-accent">
                    Ce qu’on retient
                  </p>
                  <p className="mt-2.5 text-lead leading-relaxed text-primary">{ecran.acquis}</p>
                </div>
              )}
              {!dernier && (
                <button
                  type="button"
                  onClick={suivant}
                  className={cn(
                    "mt-5 inline-flex min-h-touch items-center gap-2 rounded-full px-6 py-3",
                    "bg-accent text-on-accent text-body font-medium",
                    "state-layer focus-ring [--focus-radius:999px]",
                    "transition-transform duration-micro ease-enter hover:scale-[1.02]"
                  )}
                >
                  Continuer
                  <Icon name="arrow-right" size={16} />
                </button>
              )}
              {/* Fin de parcours : une SORTIE. L'audit du 2026-08-15 la
                  trouvait murée — le texte de fin n'était suivi d'aucune
                  action, sur une page qui ne portait par ailleurs aucun
                  lien. */}
              {dernier && (
                <div className="mt-5">
                  <p className="text-body-lg text-secondary">
                    Tu viens de reconstruire le nombre dérivé depuis la pente du
                    collège. C’est la fin de cette tranche du prototype.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={recommencer}
                      className={cn(
                        "inline-flex min-h-touch items-center gap-2 rounded-full px-5 py-3",
                        "border border-subtle bg-surface-raised text-primary",
                        "text-body font-medium",
                        "state-layer focus-ring [--focus-radius:999px]"
                      )}
                    >
                      Recommencer la chaîne
                    </button>
                    <Link
                      href="/notions/maths/derivabilite-etude-fonctions"
                      className={cn(
                        "inline-flex min-h-touch items-center gap-2 rounded-full px-5 py-3",
                        "bg-accent text-on-accent",
                        "text-body font-medium no-underline",
                        "state-layer focus-ring [--focus-radius:999px]"
                      )}
                    >
                      Lire la leçon complète
                      <Icon name="arrow-right" size={16} />
                    </Link>
                  </div>
                </div>
              )}
            </Apparition>
          )}
        </div>
      </div>
    </div>
  );
}
