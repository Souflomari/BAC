"use client";

/**
 * OuJEnSuis — la page de suivi de l'élève (docs/design/APPRENTISSAGE-DONNEES.md §5, §9.3, §10).
 *
 * Elle lit le journal de CET appareil, après l'hydratation, et le passe au modèle pur
 * (`apprentissage.ts`). Les phrases sur l'élève viennent du modèle ou du catalogue des conceptions :
 * rien n'est inventé ici. Ce que la page s'interdit : pourcentage, score global, série, badge, barre
 * de progression. « Pas encore assez de réponses pour le dire » est un état normal et s'affiche tel quel.
 * Aucune requête réseau.
 */

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/components/ui/Lien";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { analyser, bilan, type Action, type Analyse, type Bilan, type Categorie, type DiagnosticConception, type LigneBilan } from "@/lib/apprentissage";
import { CATALOGUE } from "@/lib/apprentissage-catalogue";
import { effacerJournal, lireJournal } from "@/lib/journal";
import { FILIERE_KEY } from "@/lib/useFiliere";
import { frenchTypography as fr } from "@/lib/frenchTypography";
import { useHydrated } from "@/lib/useHydrated";
import { cn } from "@/lib/utils";
import { titreLecon } from "./titres";

type Instantane = { journal: unknown[]; maintenant: Date; filiere: string | undefined };

const MATIERES: { id: "maths" | "physique" | "svt"; label: string }[] = [
  { id: "maths", label: "Mathématiques" },
  { id: "physique", label: "Physique-chimie" },
  { id: "svt", label: "SVT" },
];

const CATEGORIES: { id: Categorie; titre: string; marque: string }[] = [
  { id: "fragile", titre: "Fragile", marque: "bg-warning" },
  { id: "compris", titre: "Compris", marque: "bg-success" },
  { id: "reste_a_voir", titre: "Reste à voir", marque: "border border-text-secondary bg-transparent" },
];

const pluriel = (n: number, un: string, plusieurs: string) => `${n} ${n > 1 ? plusieurs : un}`;

const lienCible = (a: Action) => (a.cible.type === "etape" ? `/pilote/${a.cible.lecon}` : `/pilote/${a.cible.lecon}/exercices`);

function Marque({ classe }: { classe: string }) {
  return <span aria-hidden="true" className={cn("mt-[0.55em] inline-block h-2 w-2 shrink-0", classe)} />;
}

const lienDiscret =
  "inline-flex min-h-touch items-center text-body-sm font-semibold text-accent underline underline-offset-4 decoration-border-soft hover:decoration-current";

// ── 1. La prochaine chose à faire ───────────────────────────────────────────

function ActionBloc({ action, premiere, libelles }: { action: Action; premiere: boolean; libelles: Record<string, string> }) {
  const point = action.capacite ? libelles[action.capacite] : undefined;
  const titre = titreLecon(action.cible.lecon);
  const exo = action.cible.type === "gabarit";
  const quoi = { prerequis: "Vérifier un point de départ", conception: "S’exercer sur une erreur qui revient", revision: "Garder un point en mémoire" }[action.motif];
  const ou = exo ? `Exercices · ${titre}` : `Leçon · ${titre}`;
  const verbe = exo ? "Faire l’exercice" : "Rouvrir la leçon";
  return (
    <li
      data-state-source={action.regle}
      className={cn("border border-subtle p-5", premiere ? "bg-surface-raised" : "bg-surface-base")}
    >
      <p className="font-mono text-caption text-secondary">{fr(ou)}</p>
      <p className={cn("mt-1 font-display font-bold text-primary", premiere ? "text-h3" : "text-body-lg")}>{fr(quoi)}</p>
      {point && <p className="mt-2 max-w-reading text-body-sm text-primary">{fr(point)}</p>}
      <p className="mt-2 max-w-reading text-body-sm text-secondary">{fr(action.raison)}</p>
      <div className="mt-4">
        {premiere ? (
          <Link href={lienCible(action)} className="btn-primary" aria-label={fr(`${verbe} : ${titre}`)}>
            {verbe} <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <Link href={lienCible(action)} className={lienDiscret} aria-label={fr(`${verbe} : ${titre}`)}>
            {verbe} <span aria-hidden="true" className="ml-1">→</span>
          </Link>
        )}
      </div>
    </li>
  );
}

function ProchainePas({ actions, evenements, libelles }: { actions: Action[]; evenements: number; libelles: Record<string, string> }) {
  return (
    <section aria-labelledby="h-suite" className="mt-10">
      <h2 id="h-suite" className="font-display text-h2 font-bold text-primary">
        La prochaine chose à faire
      </h2>
      {actions.length > 0 ? (
        <ol className="mt-4 grid gap-3">
          {actions.map((a, i) => (
            <ActionBloc key={`${a.cible.lecon}-${a.regle}-${i}`} action={a} premiere={i === 0} libelles={libelles} />
          ))}
        </ol>
      ) : (
        <p className="mt-3 max-w-reading text-body text-secondary" data-state-source="actions:aucune">
          {fr(
            evenements > 0
              ? "Rien de précis à te proposer pour l’instant : les réponses de ton journal ne suffisent pas encore pour choisir. Continue une leçon ou une série d’exercices."
              : "Rien à proposer tant qu’il n’y a pas de réponses.",
          )}
        </p>
      )}
    </section>
  );
}

// ── 2. Compris / fragile / reste à voir ─────────────────────────────────────

function dateRevision(iso: string | null, maintenant: Date): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const finDuJour = new Date(maintenant);
  finDuJour.setHours(23, 59, 59, 999);
  if (d.getTime() <= finDuJour.getTime()) return "À revoir aujourd’hui.";
  return `Prochain passage : ${new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(d)}.`;
}

function Ligne({ l, libelles, maintenant }: { l: LigneBilan; libelles: Record<string, string>; maintenant: Date }) {
  const libelle = libelles[l.capacite] ?? `Capacité ${l.capacite.split(" ")[1] ?? l.capacite}`;
  const date = l.etat === "a_revoir" ? dateRevision(l.prochaineRevision, maintenant) : null;
  return (
    <li className="border-t border-subtle py-2 first:border-t-0" data-state-source={`capacite:${l.etat}`}>
      <p className="text-body-sm text-primary">{fr(libelle)}</p>
      {l.etat !== "jamais_vue" && (
        <p className="text-caption text-secondary">
          {fr(l.phrase)}
          {date ? ` ${fr(date)}` : ""}
        </p>
      )}
    </li>
  );
}

function Lecon({ nom, b, libelles, maintenant }: { nom: string; b: Bilan["parLecon"][string]; libelles: Record<string, string>; maintenant: Date }) {
  const total = b.lignes.length;
  const resume = [b.compris > 0 && pluriel(b.compris, "point compris", "points compris"), b.fragile > 0 && `${b.fragile} à consolider`, b.reste_a_voir > 0 && `${b.reste_a_voir} à voir`]
    .filter(Boolean)
    .join(" · ");
  const rien = b.compris === 0 && b.fragile === 0;
  const abordee = b.lignes.some((l) => l.etat !== "jamais_vue");
  return (
    <article className="border-t border-subtle py-5" aria-labelledby={`l-${nom}`}>
      <h4 id={`l-${nom}`} className="text-body-lg font-semibold text-primary">
        {fr(titreLecon(nom))}
      </h4>
      <p className="mt-1 text-caption text-secondary">
        {fr(rien ? (abordee ? `Pas encore assez de réponses pour le dire : ${pluriel(total, "point reste", "points restent")} à voir.` : `Pas encore commencée sur cet appareil : ${pluriel(total, "point à voir", "points à voir")}.`) : `${resume}, sur ${pluriel(total, "point", "points")}.`)}
      </p>
      {CATEGORIES.map((c) => {
        const lignes = b.lignes.filter((l) => l.categorie === c.id).sort((x, y) => Number(x.etat === "jamais_vue") - Number(y.etat === "jamais_vue"));
        if (lignes.length === 0) return null;
        const liste = (
          <ul>
            {lignes.map((l) => (
              <Ligne key={l.capacite} l={l} libelles={libelles} maintenant={maintenant} />
            ))}
          </ul>
        );
        const titre = (
          <span className="flex items-baseline gap-2 text-body-sm font-semibold text-primary">
            <Marque classe={c.marque} />
            {c.titre}
            <span className="font-mono text-caption font-normal text-secondary">{lignes.length}</span>
          </span>
        );
        return c.id === "reste_a_voir" ? (
          <details key={c.id} className="mt-4 group" open={lignes.some((l) => l.etat !== "jamais_vue")}>
            <summary className="flex min-h-touch cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
              {titre}
              <span aria-hidden="true" className="text-secondary group-open:hidden">
                +
              </span>
              <span className="sr-only group-open:hidden">(afficher)</span>
            </summary>
            {liste}
          </details>
        ) : (
          <div key={c.id} className="mt-4">
            <h5 className="min-h-0">{titre}</h5>
            {liste}
          </div>
        );
      })}
    </article>
  );
}

function Bilans({ analyse, libelles, maintenant, filiere }: { analyse: Analyse; libelles: Record<string, string>; maintenant: Date; filiere: string | undefined }) {
  const b = useMemo(() => bilan(analyse, CATALOGUE, filiere), [analyse, filiere]);
  const leconsSansMatiere = Object.entries(b.parLecon).filter(([, v]) => !v.matiere);
  return (
    <section aria-labelledby="h-bilan" className="mt-14">
      <h2 id="h-bilan" className="font-display text-h2 font-bold text-primary">
        Compris, fragile, à voir
      </h2>
      <p className="mt-2 max-w-reading text-body-sm text-secondary">
        {fr("Point par point, d’après les capacités du programme officiel. « Compris » n’apparaît que lorsque tu as réussi seul, sur des énoncés différents.")}
        {!filiere && fr(" Ta filière n’est pas choisie : les points des deux programmes (SM et PC ou SVT) sont tous listés.")}
      </p>
      {MATIERES.map((m) => {
        const lecons = Object.entries(b.parLecon).filter(([, v]) => v.matiere === m.id);
        const pm = b.parMatiere[m.id];
        if (lecons.length === 0 || !pm) return null;
        return (
          <div key={m.id} className="mt-8">
            <h3 className="font-display text-h3 font-bold text-primary">{m.label}</h3>
            <p className="mt-1 text-caption text-secondary">
              {fr(`${pluriel(pm.total, "point suivi", "points suivis")} : ${pm.compris} compris, ${pm.fragile} à consolider, ${pm.reste_a_voir} à voir.`)}
            </p>
            <div className="mt-3">
              {lecons.map(([nom, v]) => (
                <Lecon key={nom} nom={nom} b={v} libelles={libelles} maintenant={maintenant} />
              ))}
            </div>
          </div>
        );
      })}
      {leconsSansMatiere.length > 0 && (
        <div className="mt-8">
          {leconsSansMatiere.map(([nom, v]) => (
            <Lecon key={nom} nom={nom} b={v} libelles={libelles} maintenant={maintenant} />
          ))}
        </div>
      )}
    </section>
  );
}

// ── 3. Les erreurs repérées ─────────────────────────────────────────────────

const ETIQUETTE: Record<string, string> = { active: "À travailler", probable: "À vérifier" };

function Erreur({ d, aPrerequis }: { d: DiagnosticConception; aPrerequis: boolean }) {
  const k = CATALOGUE.conceptions[d.conception];
  const lieux = new Map<string, Set<string>>();
  for (const o of d.observations) {
    if (o.nature === "reussite") continue;
    if (!lieux.has(o.lecon)) lieux.set(o.lecon, new Set());
    lieux.get(o.lecon)!.add(o.source === "exo" ? "dans les exercices" : "dans la leçon");
  }
  const vue = [...lieux].map(([l, s]) => `${titreLecon(l)} (${[...s].join(", ")})`).join(" ; ");
  const exo = k?.exercices?.[0];
  return (
    <li className="border-t border-subtle py-5" data-state-source={`conception:${d.etat}`}>
      <p className="text-caption font-semibold uppercase tracking-wide text-secondary">{ETIQUETTE[d.etat]}</p>
      <p className="mt-1 max-w-reading text-body text-primary">{fr(d.phrase)}</p>
      {vue && <p className="mt-2 text-body-sm text-secondary">{fr(`Observée : ${vue}.`)}</p>}
      {aPrerequis && <p className="mt-1 text-body-sm text-secondary">{fr("Elle vient peut-être du point de départ signalé plus haut.")}</p>}
      {k && (
        <p className="mt-1 flex flex-wrap items-center gap-x-4 text-body-sm text-secondary">
          <span>Ce qui la corrige :</span>
          {k.etapes?.length ? (
            <Link href={`/pilote/${k.lecon}`} className={lienDiscret}>
              {fr(`Revoir la leçon « ${titreLecon(k.lecon)} »`)}
            </Link>
          ) : null}
          {exo ? (
            <Link href={`/pilote/${exo[0]}/exercices`} className={lienDiscret}>
              {fr(`Un exercice fait pour la déjouer`)}
            </Link>
          ) : null}
        </p>
      )}
    </li>
  );
}

function Erreurs({ analyse }: { analyse: Analyse }) {
  const ouvertes = analyse.conceptions.filter((d) => d.etat === "active" || d.etat === "probable");
  // « surmontée » n'a de sens que si l'erreur a vraiment été vue avant : sinon on ne dit rien
  const ecartees = analyse.conceptions.filter((d) => d.etat === "ecartee" && d.observations.some((o) => o.nature === "forte"));
  const hyps = analyse.hypotheses.filter((h) => h.statut !== "ecartee");
  return (
    <section aria-labelledby="h-erreurs" className="mt-14">
      <h2 id="h-erreurs" className="font-display text-h2 font-bold text-primary">
        Les erreurs repérées
      </h2>
      {ouvertes.length === 0 && hyps.length === 0 && ecartees.length === 0 ? (
        <p className="mt-3 max-w-reading text-body text-secondary" data-state-source="conceptions:aucune">
          {fr("Aucune erreur type n’est repérée pour l’instant. Cela ne veut pas dire qu’il n’y en a pas : il faut quelques réponses de plus pour en juger.")}
        </p>
      ) : (
        <>
          {hyps.map((h) => (
            <p key={h.amont} className="mt-3 max-w-reading text-body text-primary" data-state-source={`transversal:${h.statut}`}>
              {fr(h.phrase)}
            </p>
          ))}
          <ul className="mt-4">
            {ouvertes.map((d) => (
              <Erreur key={d.conception} d={d} aPrerequis={!!d.expliqueePar && hyps.length > 0} />
            ))}
          </ul>
          {ecartees.length > 0 && (
            <ul className="border-t border-subtle pt-4">
              {ecartees.map((d) => (
                <li key={d.conception} className="py-1 text-body-sm text-secondary" data-state-source="conception:ecartee">
                  <span className="font-semibold text-primary">Surmontée. </span>
                  {fr(d.phrase)}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}

// ── La page ─────────────────────────────────────────────────────────────────

function Vide() {
  const lecons = Object.keys(CATALOGUE.lecons);
  return (
    <section className="mt-10 border border-subtle bg-surface-raised p-6" aria-labelledby="h-vide" data-state-source="journal:vide">
      <h2 id="h-vide" className="font-display text-h3 font-bold text-primary">
        Rien à dire pour l’instant
      </h2>
      <p className="mt-2 max-w-reading text-body text-secondary">
        {fr("Ton journal est vide : aucune leçon ni aucun exercice n’a encore été fait sur cet appareil. Dès que tu auras répondu à quelques questions, cette page dira ce que tu as compris, ce qui est fragile et ce qui reste à voir.")}
      </p>
      <ul className="mt-4 grid gap-1">
        {lecons.map((l) => (
          <li key={l}>
            <Link href={`/pilote/${l}`} className={lienDiscret}>
              {fr(`Commencer par la leçon « ${titreLecon(l)} »`)} <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Effacer({ pret, surEffacer }: { pret: boolean; surEffacer: () => void }) {
  const [demande, setDemande] = useState(false);
  const attente = pret ? {} : { disabled: true, "aria-busy": true as const };
  return (
    <footer className="mt-16 border-t border-subtle pt-6">
      <p className="text-body-sm text-secondary">{fr("Ces données restent sur cet appareil. Rien n’est envoyé, rien n’est partagé.")}</p>
      {!demande ? (
        <button
          type="button"
          onClick={() => setDemande(true)}
          className="state-layer relative -ml-2 mt-1 inline-flex min-h-touch items-center px-2 text-body-sm text-secondary underline underline-offset-4 hover:text-primary"
          {...attente}
        >
          Effacer mes données
        </button>
      ) : (
        <div role="alertdialog" aria-labelledby="h-eff" className="mt-3 max-w-reading border border-subtle bg-surface-raised p-4">
          <p id="h-eff" className="text-body-sm text-primary">
            {fr("Effacer tout le journal de cet appareil ? Les leçons et les exercices sont conservés, mais cette page repartira de zéro. Cela ne se défait pas.")}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6">
            <button
              type="button"
              autoFocus
              onClick={() => {
                surEffacer();
                setDemande(false);
              }}
              className="inline-flex min-h-touch items-center text-body-sm font-semibold text-primary underline underline-offset-4"
            >
              Oui, tout effacer
            </button>
            <button type="button" onClick={() => setDemande(false)} className="inline-flex min-h-touch items-center text-body-sm text-secondary underline underline-offset-4">
              Non, garder
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}

export function OuJEnSuis({ libelles }: { libelles: Record<string, string> }) {
  const pret = useHydrated();
  const [inst, setInst] = useState<Instantane | null>(null);

  // Le journal et l'heure ne se prennent qu'une fois, au montage, après l'hydratation.
  useEffect(() => {
    if (!pret) return;
    let filiere: string | undefined;
    try {
      filiere = localStorage.getItem(FILIERE_KEY)?.toUpperCase() || undefined;
    } catch {
      filiere = undefined;
    }
    setInst({ journal: lireJournal(), maintenant: new Date(), filiere });
  }, [pret]);

  const analyse = useMemo(() => (inst ? analyser(inst.journal, CATALOGUE, { maintenant: inst.maintenant, filiere: inst.filiere }) : null), [inst]);

  return (
    <div className="pb-8">
      <header className="pt-2">
        <Breadcrumb segments={[{ label: "Accueil", href: "/" }, { label: "Où j’en suis" }]} />
        <h1 className="font-display text-h1 bp-medium:text-display font-bold text-primary">Où j’en suis</h1>
        <p className="mt-3 max-w-reading text-lead text-secondary">
          {fr("Ce que tes réponses permettent de dire, sans plus. Pas de note, pas de score : des faits, et la prochaine chose à faire.")}
        </p>
      </header>

      <div aria-live="polite">
        {!inst || !analyse ? (
          <p className="mt-10 text-body text-secondary" aria-busy="true" data-state-source="journal:lecture">
            {fr("Lecture du journal de cet appareil…")}
          </p>
        ) : analyse.lecture.evenements === 0 ? (
          <Vide />
        ) : (
          <>
            <p className="mt-6 font-mono text-caption text-secondary" data-state-source="journal:lu">
              {fr(`Fondé sur ${pluriel(analyse.lecture.evenements, "réponse", "réponses")}, gardées sur cet appareil.`)}
              {analyse.lecture.horlogeDouteuse ? fr(" L’horloge de l’appareil semble fausse : certaines dates ont été ramenées à des valeurs plausibles.") : ""}
            </p>
            <ProchainePas actions={analyse.actions} evenements={analyse.lecture.evenements} libelles={libelles} />
            <Bilans analyse={analyse} libelles={libelles} maintenant={inst.maintenant} filiere={inst.filiere} />
            <Erreurs analyse={analyse} />
          </>
        )}
      </div>

      <Effacer
        pret={pret}
        surEffacer={() => {
          effacerJournal();
          setInst((p) => ({ journal: [], maintenant: p?.maintenant ?? new Date(), filiere: p?.filiere }));
        }}
      />
    </div>
  );
}
