"use client";

/**
 * Atelier — le parcours d'une chaîne de compétences (NORTH-STAR-V2).
 *
 * La boucle, et rien d'autre : un écran = une figure + deux phrases + une
 * chose à faire. L'élève agit, se trompe, reçoit une réponse qui vise SON
 * erreur, recommence, avance.
 *
 * Ce qui change par rapport au produit précédent, concrètement :
 *   · on ne peut pas avancer en lisant — il faut répondre juste ;
 *   · une erreur n'est jamais « faux » : c'est un texte écrit pour CE
 *     raisonnement-là (R3) ;
 *   · « ce qu'on retient » n'apparaît qu'APRÈS la réussite, jamais avant —
 *     sinon on retombe sur un cours qu'on lit.
 *
 * Cœur calme : pas de score, pas de minuteur, pas de série, pas de
 * célébration. On avance, c'est tout.
 */

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { FigurePente } from "./Figures";
import { FigureSecanteMafs } from "./FigureSecanteMafs";
import { COMPETENCES, ECRANS, type Ecran } from "@/lib/atelier/derivees";
import { PlanChaine } from "./PlanChaine";

function Chaine({ courante }: { courante: string }) {
  return (
    <ol data-chaine className="grid gap-1.5">
      {COMPETENCES.map((c, i) => {
        const idx = COMPETENCES.findIndex((x) => x.id === courante);
        const etat = i < idx ? "fait" : i === idx ? "ici" : "apres";
        return (
          <li key={c.id} className="flex items-center gap-2.5 text-body-sm">
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-semibold",
                etat === "fait" && "bg-accent text-inverse",
                etat === "ici" && "border-2 border-accent text-accent",
                etat === "apres" && "border border-subtle text-tertiary"
              )}
            >
              {etat === "fait" ? <Icon name="check" size={13} /> : i + 1}
            </span>
            <span className={cn(etat === "apres" ? "text-tertiary" : "text-primary")}>
              {c.titre}
            </span>
            <span className="ml-auto text-caption text-tertiary">{c.niveau}</span>
          </li>
        );
      })}
    </ol>
  );
}

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

  function repondre(id: string) {
    const o = ecran.options?.find((x) => x.id === id);
    setChoisi(id);
    if (o?.correct) setReussi(true);
  }

  function suivant() {
    setI((n) => Math.min(n + 1, ECRANS.length - 1));
    setChoisi(null); setReussi(false); setEssaiReglage(false); setValeur(0.5);
  }

  const dernier = i === ECRANS.length - 1;

  if (!demarre) return <PlanChaine onDemarrer={() => setDemarre(true)} />;

  return (
    <div className="grid gap-8 bp-medium:grid-cols-[minmax(0,1fr)_220px] bp-medium:gap-10">
      <div>
        {/* la figure — elle porte l'idée (R5) */}
        {ecran.figure === "pente" && (
          <FigurePente
            key={ecran.id}
            onChange={setValeur}
            /* Le trait de l'erreur reste tant que l'élève n'a pas trouvé :
               c'est LA figure qui lui répond, pas un paragraphe sous les
               boutons. */
            erreur={option && !option.correct ? (option.montre ?? null) : null}
            erreurLabel={option && !option.correct ? `ta réponse : ${option.label}` : undefined}
          />
        )}
        {ecran.figure === "secante" && <FigureSecanteMafs key={ecran.id} />}

        {/* ≤ 2 phrases (R2) */}
        <p className="mt-6 text-h3 font-serif font-semibold text-primary max-w-reading">{ecran.texte}</p>
        <p className="mt-3 text-body-lg text-secondary max-w-reading">{ecran.question}</p>

        {/* l'action (R1) */}
        {ecran.type === "choix" && (
          <div className="mt-5 grid gap-2 max-w-reading">
            {ecran.options?.map((o) => {
              const actif = choisi === o.id;
              const montrerJuste = reussi && o.correct;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => repondre(o.id)}
                  disabled={reussi}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-left text-body",
                    "state-layer focus-ring [--focus-radius:8px]",
                    "transition-colors duration-micro",
                    montrerJuste
                      ? "border-accent bg-surface-raised text-primary"
                      : actif && !o.correct
                        ? "border-soft bg-surface-raised text-secondary"
                        : "border-subtle text-primary hover:border-soft",
                    reussi && !o.correct && "opacity-55"
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
        )}

        {ecran.type === "reglage" && (
          <div className="mt-4 max-w-reading">
            <button
              type="button"
              onClick={() => setEssaiReglage(true)}
              className={cn(
                "inline-flex min-h-touch items-center gap-1.5 rounded-md px-3 py-2",
                "border border-subtle bg-surface-raised",
                "text-body-sm font-medium text-secondary",
                "hover:border-soft hover:text-primary",
                "state-layer focus-ring [--focus-radius:8px]"
              )}
            >
              Vérifier mon réglage
            </button>
            {essaiReglage && !reglageOk && (
              <div className="mt-3 rounded-lg border-l-2 border-soft bg-surface-raised px-4 py-3">
                <p className="text-body-sm text-primary">
                  Pas encore : ta pente vaut{" "}
                  <span className="tabular-nums font-medium">
                    {valeur.toFixed(2).replace(".", ",")}
                  </span>
                  , on cherche {ecran.cible}.
                </p>
                {ecran.aide && (
                  <p className="mt-1.5 text-body-sm text-secondary">{ecran.aide}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* la réponse à l'erreur — visée, jamais générique (R3) */}
        {option && !option.correct && (
          <div
            data-feedback-erreur
            className="mt-4 max-w-reading rounded-lg border-l-2 px-4 py-3"
            style={{ borderColor: "var(--figure-regime-aperiodic)", background: "var(--color-surface-raised)" }}
          >
            <p className="text-body text-primary">{option.feedback}</p>
            {option.montre != null && (
              <p className="mt-2 text-body-sm text-secondary">
                Ta pente est tracée en pointillés sur la figure — compare-la à la droite pleine.
              </p>
            )}
          </div>
        )}

        {/* ce qu'on retient — APRÈS la réussite seulement */}
        {gagne && (
          <div className="mt-5 max-w-reading">
            {ecran.acquis && (
              <div className="rounded-lg border-l-2 border-accent bg-surface-raised px-4 py-3">
                <p className="text-caption font-medium uppercase tracking-eyebrow text-accent">
                  Ce qu’on retient
                </p>
                <p className="mt-1.5 text-body text-primary">{ecran.acquis}</p>
              </div>
            )}
            {!dernier && (
              <button
                type="button"
                onClick={suivant}
                className={cn(
                  "mt-4 inline-flex min-h-touch items-center gap-1.5 rounded-md px-4 py-2",
                  "border border-subtle bg-surface-raised",
                  "text-body-sm font-medium text-primary",
                  "hover:border-soft",
                  "state-layer focus-ring [--focus-radius:8px]"
                )}
              >
                Continuer
                <Icon name="chevron-right" size={14} />
              </button>
            )}
            {dernier && (
              <p className="mt-4 text-body text-secondary">
                Tu viens de reconstruire le nombre dérivé depuis la pente du collège.
                C’est la fin de cette tranche du prototype.
              </p>
            )}
          </div>
        )}
      </div>

      {/* la chaîne : où on est, et d'où on vient */}
      <aside className="bp-medium:border-l bp-medium:border-subtle bp-medium:pl-6">
        <h2 className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
          La chaîne
        </h2>
        <div className="mt-3">
          <Chaine courante={ecran.competence} />
        </div>
        <p className="mt-4 text-caption text-tertiary">
          Écran {i + 1} sur {ECRANS.length}
        </p>
      </aside>
    </div>
  );
}
