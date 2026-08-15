"use client";

/**
 * PlanChaine — la page d'entrée d'une chaîne.
 *
 * Retour owner : « ça donne l'impression de notions qui arrivent au
 * hasard ; il faut une page au début qui dise voilà ce qu'il faut déjà
 * savoir, et le plan du début à la fin. »
 *
 * Trois choses, dans cet ordre :
 *   1. OÙ ON VA — l'exercice de bac qu'on saura faire à la fin. La
 *      promesse est concrète, pas « maîtriser les dérivées ».
 *   2. CE QU'IL FAUT DÉJÀ SAVOIR — dit franchement, avec la porte de
 *      sortie : si tu ne l'as pas, on redescend le chercher. C'est la
 *      règle R4 rendue visible pour l'élève, pas seulement vérifiée par
 *      un script.
 *   3. LE PLAN ENTIER — les cinq maillons, du collège au bac, visibles
 *      d'un coup. On ne cache pas la longueur du chemin.
 */

import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { COMPETENCES, ECRANS } from "@/lib/atelier/derivees";

const NIVEAU_TON: Record<string, string> = {
  "collège": "bg-surface-raised text-secondary",
  "lycée": "bg-surface-raised text-secondary",
  "bac": "bg-accent text-on-accent",
};

export function PlanChaine({ onDemarrer }: { onDemarrer: () => void }) {
  return (
    <div className="max-w-reading">
      {/* 1. où on va */}
      <section>
        <h2 className="font-serif text-h2 font-semibold text-primary">
          À la fin, tu sauras faire ça
        </h2>
        <div className="mt-3 rounded-lg border border-subtle bg-surface-container px-5 py-4">
          <p className="text-body text-primary">
            « Soit f(x) = x². Calculer f′(1), puis donner l’équation de la
            tangente à la courbe au point d’abscisse 1. »
          </p>
          <p className="mt-2 text-caption text-secondary">
            Une question de bac. Pas en récitant une formule — en sachant ce
            qu’elle mesure.
          </p>
        </div>
      </section>

      {/* 2. les prérequis, dits franchement */}
      <section className="mt-9">
        <h2 className="font-serif text-h3 font-semibold text-primary">
          Ce qu’il faut déjà savoir
        </h2>
        <ul className="mt-3 grid gap-2">
          {[
            "Lire les coordonnées d’un point dans un repère",
            "Diviser deux nombres (2 ÷ 4 = 0,5)",
          ].map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-body text-secondary">
              <Icon name="check" size={15} className="mt-1 shrink-0 text-accent" />
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-body-sm text-secondary">
          C’est tout. Si l’un des deux te manque, ce n’est pas grave — la
          chaîne commence au collège, et le premier écran les remet en place.
        </p>
      </section>

      {/* 3. le plan entier, sans cacher la longueur */}
      <section className="mt-9">
        <h2 className="font-serif text-h3 font-semibold text-primary">
          Le chemin, du début à la fin
        </h2>
        <ol className="mt-4 grid gap-0">
          {COMPETENCES.map((c, i) => {
            const n = ECRANS.filter((e) => e.competence === c.id).length;
            const dernier = i === COMPETENCES.length - 1;
            return (
              <li key={c.id} className="grid grid-cols-[auto_1fr] gap-x-4">
                {/* la colonne du fil */}
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      "text-body-sm font-semibold",
                      "border border-subtle bg-surface-raised text-primary"
                    )}
                  >
                    {i + 1}
                  </span>
                  {!dernier && <span className="w-px flex-1 bg-border-subtle" />}
                </div>
                <div className={cn("pb-6", dernier && "pb-0")}>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-body-lg font-medium text-primary">{c.titre}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-caption font-medium",
                        NIVEAU_TON[c.niveau]
                      )}
                    >
                      {c.niveau}
                    </span>
                  </div>
                  <p className="mt-1 text-caption text-tertiary">
                    {n} écran{n > 1 ? "s" : ""}
                    {c.requiert.length > 0 && (
                      <>
                        {" · s’appuie sur « "}
                        {COMPETENCES.find((x) => x.id === c.requiert[0])?.titre}
                        {" »"}
                      </>
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <button
        type="button"
        onClick={onDemarrer}
        className={cn(
          "mt-9 inline-flex min-h-touch items-center gap-2 rounded-full px-6 py-3",
          "bg-accent text-on-accent",
          "text-body font-medium",
          "state-layer focus-ring [--focus-radius:999px]",
          "transition-transform duration-micro ease-enter hover:scale-[1.02]"
        )}
      >
        Commencer
        <Icon name="arrow-right" size={16} />
      </button>
      <p className="mt-3 text-caption text-secondary">
        {ECRANS.length} écrans en tout — tu peux t’arrêter et reprendre.
      </p>
    </div>
  );
}
