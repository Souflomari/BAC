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
 *
 * RÉVÉLATION PROGRESSIVE (2026-09-05, HANDOFF §11.20). Tout se rend côté
 * client ; rendu d'un coup, le sujet gelait un téléphone bon marché 3 à 15 s
 * au « Commencer » et 3 à 30 s au « Terminer ». Les questions se révèlent
 * par lots (budget ~80 formules), chaque lot dans une transition ; le sujet
 * finit toujours avant que le corrigé ne commence ; la racine porte
 * `data-sujet-complet` puis `data-corrige-complet` — les instruments les
 * attendent au lieu d'un délai (INSTRUMENTS, « protocole d'ouverture »).
 */

import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { Link } from "@/components/ui/Lien";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { ptsDepuisStem, formatPoints } from "@/lib/bareme";
import { notionHref } from "@/lib/subjects";
// Le pipeline markdown/KaTeX (MdBlock, ~126 ko gzip avec KaTeX) n'est PAS
// importé statiquement (2026-09-06, HANDOFF §11.27). Sur 3G lente (400 kb/s)
// et processeur ×4, le bouton « Commencer » était visible à 4–7 s et ignorait
// le doigt jusqu'à ~17 s : son onClick attendait l'hydratation, qui attendait
// tout le JavaScript de la route — dont ce pipeline, inutile avant l'appui.
// Il se charge APRÈS l'hydratation (le temps que l'élève lise les conditions)
// et `commencer` l'exige avant de lancer la révélation : les marqueurs
// `data-sujet-complet` / `data-corrige-complet` restent vrais.
type ModuleMd = typeof import("@/components/notion/AttemptFirstExercise");
type MdComponent = ModuleMd["MdBlock"];
const chargerMd = () => import("@/components/notion/AttemptFirstExercise");

export interface ExamQuestionData {
  id: string;
  part?: string;
  stem: string;
  reasoning: string;
}

export interface ExamExoData {
  /** Le numéro de l'exercice sur la copie (partagé par ses morceaux), s'il se lit. */
  numero: number | null;
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
  /** Le nombre d'exercices du SUJET (un exercice peut être servi en morceaux). */
  nbExercices: number;
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

function formatNote(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2).replace(".", ",").replace(/,?0+$/, "") || "0";
}


type ExoData = EpreuveData["exercices"][number];

/**
 * Les exercices DU SUJET : les morceaux consécutifs qui partagent un numéro de
 * copie forment un seul exercice (SPC 2023 normale : 4 exercices servis en 10
 * morceaux). Un morceau sans numéro lisible reste seul.
 */
interface GroupeExo {
  numero: number | null;
  /** Rang du premier morceau (pour l'ancre `#exo-n`). */
  premier: number;
  morceaux: number[];
  /** Somme des barèmes transcrits ; null si aucun morceau n'en porte. */
  pts: number | null;
}
function grouperExercices(exercices: ExoData[]): GroupeExo[] {
  const groupes: GroupeExo[] = [];
  exercices.forEach((exo, i) => {
    const dernier = groupes[groupes.length - 1];
    if (dernier && exo.numero != null && dernier.numero === exo.numero) {
      dernier.morceaux.push(i);
      if (exo.baremeTotal != null) dernier.pts = (dernier.pts ?? 0) + exo.baremeTotal;
    } else {
      groupes.push({ numero: exo.numero, premier: i, morceaux: [i], pts: exo.baremeTotal ?? null });
    }
  });
  return groupes;
}
const arrondi = (n: number) => Math.round(n * 100) / 100;

/**
 * GRILLE (refonte 2026-10) — la carte du sujet : une barre découpée au prorata
 * des points de chaque exercice DU SUJET. Les libellés sont des LIENS vers
 * l'exercice (ancres `#exo-n`) ; avant « Commencer », ce sont de simples
 * repères (le sujet n'est pas encore dans le DOM, il n'y a rien où sauter).
 */
function CarteSujet({
  groupes,
  liens,
  gagnesParExo,
}: {
  groupes: GroupeExo[];
  liens: boolean;
  /** En correction : les points que l'élève s'est accordés, par morceau. */
  gagnesParExo?: number[];
}) {
  return (
    <ol aria-label="Plan du sujet" className="flex w-full gap-1">
      {groupes.map((g, k) => {
        const gagnes = gagnesParExo ? g.morceaux.reduce((s, i) => s + gagnesParExo[i], 0) : null;
        const contenu = (
          <>
            <span className="block truncate text-caption font-semibold text-primary tnum">
              {g.numero != null ? `Ex. ${g.numero}` : "Partie"}
            </span>
            <span className="block truncate text-caption text-secondary tnum">
              {gagnes != null && g.pts != null
                ? `${formatPoints(arrondi(gagnes))} / ${formatPoints(arrondi(g.pts))}`
                : g.pts != null
                  ? `${formatPoints(arrondi(g.pts))} pts`
                  : ""}
            </span>
          </>
        );
        return (
          <li
            key={k}
            className="min-w-0 border-t-4 border-accent pt-1.5"
            style={{ flex: `${g.pts != null && g.pts > 0 ? g.pts : 1} 1 0` }}
          >
            {liens ? (
              <a
                href={`#exo-${g.premier + 1}`}
                className="block min-h-touch py-1 hover:underline focus-ring"
              >
                {contenu}
              </a>
            ) : (
              <span className="block py-1">{contenu}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Un exercice de l'épreuve, MÉMOÏSÉ (2026-09-05). La révélation progressive
 * fait un commit par question ; sans mémo, chaque commit réconciliait les dix
 * articles — 40 commits × tout l'arbre, et la mesure par question coûtait
 * plus qu'elle n'économisait (le sujet complet passait de 4,8 s à 11,8 s à
 * ×6). Les compteurs reçus sont BORNÉS à l'exercice : un article dont rien ne
 * change garde des props identiques et n'est pas re-rendu.
 *
 * GRILLE (refonte 2026-10) : plus de carte ni d'ombre. Un filet épais ouvre
 * l'exercice ; son numéro et ses points sont imprimés en grand ; chaque
 * question a sa colonne de barème à gauche — seulement quand le barème est
 * TRANSCRIT du sujet (tag « (x pt) »). Une part égale calculée n'est jamais
 * imprimée en marge comme si elle venait du sujet.
 */
const ExerciceArticle = memo(function ExerciceArticle({
  exo,
  i,
  nbSujet,
  nbCorrige,
  enCorrection,
  verdicts,
  setVerdicts,
  bareme,
  Md,
}: {
  exo: ExoData;
  i: number;
  nbSujet: number;
  nbCorrige: number;
  enCorrection: boolean;
  /** Le rendu markdown/KaTeX, chargé à la demande (voir l'en-tête du module). */
  Md: MdComponent;
  verdicts: Record<string, Verdict>;
  setVerdicts: React.Dispatch<React.SetStateAction<Record<string, Verdict>>>;
  bareme: Map<string, number>;
}) {
  return (
    <li key={i} id={`exo-${i + 1}`} className="scroll-mt-40">
      <article data-exam-exo className="border-t-2 border-accent pt-5">
        {/* Pas de <header class> ici : la feuille d'impression masque tout
            `header[class]` (chrome du site) — l'intitulé d'exercice, lui, doit
            s'imprimer. */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 gap-y-1 bp-medium:grid-cols-[4.5rem_minmax(0,1fr)_auto]">
          {/* Le numéro de l'exercice SUR LA COPIE (ses morceaux le partagent),
              jamais le rang du morceau dans la page. */}
          <span
            aria-hidden="true"
            className="font-display text-h1 font-bold leading-none text-primary wdth-62 tnum bp-medium:text-display"
          >
            {exo.numero ?? "·"}
          </span>
          <div className="min-w-0">
            {/* `min-w-0 break-words` : sur les vieux sujets SPC l'intitulé EST
                le titre (« Exercice de Chimie — Première partie : suivi
                conductimétrique ») ; à 200 % de texte sur 360 px, un mot long
                débordait la colonne (2026-09-05). */}
            <h2 className="min-w-0 break-words font-display text-h3 font-bold text-primary">
              {exo.exerciseLabel ?? `Exercice ${i + 1}`}
            </h2>
            {/* Le sujet de l'exercice — jamais tronqué (HANDOFF §11.38). */}
            <p className="mt-1 min-w-0 break-words text-body-sm text-secondary">
              {exo.titre}
            </p>
          </div>
          {exo.baremeTotal != null && (
            <p className="col-start-2 text-body-sm text-secondary bp-medium:col-start-auto bp-medium:text-right">
              <span className="font-display text-h2 font-bold text-primary wdth-75 tnum">
                {formatPoints(exo.baremeTotal)}
              </span>{" "}
              pts
            </p>
          )}
        </div>

        <div className="mt-6 space-y-6">
          {exo.intro && nbSujet > 0 && (
            <div className="bp-medium:pl-[5.75rem]">
              <Md className="max-w-[72ch]">{exo.intro}</Md>
            </div>
          )}
          {exo.questions.map((q, k) => {
            if (k >= nbSujet) return null;
            const cle = `${i}:${q.id}`;
            const verdict = verdicts[cle];
            const qPts = bareme.get(cle) ?? 0;
            const transcrit = ptsDepuisStem(q.stem);
            return (
              <div
                key={q.id}
                className="grid grid-cols-1 gap-x-5 border-t border-subtle pt-5 first:border-t-0 first:pt-0 bp-medium:grid-cols-[4.5rem_minmax(0,1fr)]"
              >
                {/* La colonne de barème — le point TRANSCRIT seulement. */}
                <p className="hidden pt-0.5 text-body-sm font-semibold text-secondary tnum bp-medium:block">
                  {transcrit != null ? `${formatPoints(transcrit)} pt` : ""}
                </p>
                <div className="min-w-0 max-w-[72ch]">
                  {q.part && (
                    <p className="mb-1 text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                      <Md inline>{q.part}</Md>
                    </p>
                  )}
                  <Md>{q.stem}</Md>

                  {/* ATTEMPT-FIRST ABSOLU : le raisonnement n’entre dans
                      le DOM qu’en phase correction — dom-truth l’asserte. */}
                  {enCorrection && k >= nbCorrige && (
                    <p className="mt-3 text-body-sm text-tertiary" aria-busy="true">
                      Le corrigé se prépare…
                    </p>
                  )}
                  {enCorrection && k < nbCorrige && (
                    <div
                      data-exam-corrige
                      className="mt-4 border-l-2 border-accent bg-surface-container-low py-4 pl-5 pr-4"
                    >
                      <p className="mb-2 text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                        Raisonnement expert
                      </p>
                      <Md>{q.reasoning}</Md>
                      <div
                        role="radiogroup"
                        aria-label={frenchTypography(`Auto-évaluation de la question (${formatPoints(qPts)} pt)`)}
                        className="mt-4 flex flex-wrap items-center gap-2"
                      >
                        <span className="text-body-sm text-secondary">
                          Ta copie :
                        </span>
                        {/* Motif ARIA « radiogroup » (HANDOFF §11.39) : UN arrêt de
                            tabulation par groupe — le radio coché, sinon le premier —
                            et les flèches déplacent le focus ET cochent. Avant : 144
                            radios tabulables pour 48 questions, flèches inertes. */}
                        {(["juste", "partiel", "faux"] as const).map((v, j, tous) => (
                          <button
                            key={v}
                            type="button"
                            role="radio"
                            aria-checked={verdict === v}
                            tabIndex={verdict === v || (!verdict && j === 0) ? 0 : -1}
                            onClick={() =>
                              setVerdicts((prev) => ({ ...prev, [cle]: v }))
                            }
                            onKeyDown={(e) => {
                              const pas = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                              if (!pas) return;
                              e.preventDefault();
                              const suivant = tous[(j + pas + tous.length) % tous.length];
                              setVerdicts((prev) => ({ ...prev, [cle]: suivant }));
                              const groupe = e.currentTarget.parentElement;
                              const cibles = groupe ? groupe.querySelectorAll<HTMLButtonElement>("[role=radio]") : null;
                              cibles?.[(j + pas + tous.length) % tous.length]?.focus();
                            }}
                            className={cn(
                              "min-h-touch border px-3 text-body-sm font-semibold tnum",
                              "state-layer focus-ring",
                              "transition-colors duration-micro ease-enter",
                              verdict === v
                                ? "border-accent bg-accent text-on-accent"
                                : "border-field bg-surface-raised text-primary"
                            )}
                          >
                            {v === "juste"
                              ? `Juste · ${formatPoints(qPts)} pt`
                              : v === "partiel"
                                ? `Partiel · ${formatPoints(qPts / 2)}`
                                : "Faux · 0"}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {nbSujet < exo.questions.length && (
            <p className="text-body-sm text-tertiary bp-medium:pl-[5.75rem]" aria-busy="true">
              Le sujet se prépare…
            </p>
          )}
          {enCorrection && (
            <p className="border-t border-subtle pt-4 text-body-sm bp-medium:pl-[5.75rem]">
              <Link
                href={notionHref(exo.subject, exo.notionSlug)}
                className={cn(
                  "font-semibold text-primary underline underline-offset-2 hover:text-secondary",
                  "focus-ring",
                  //  CIBLE TACTILE (§11.111) : 30 px de hauteur de frappe ;
                  //  `max-w-full break-words` : jamais de débord à 320 px et
                  //  200 % de texte (§11.183).
                  "inline-block max-w-full break-words py-1.5"
                )}
              >
                Revoir la notion — {exo.notionTitle} →
              </Link>
            </p>
          )}
        </div>
      </article>
    </li>
  );
});

export function EpreuveShell({ epreuve }: { epreuve: EpreuveData }) {
  const [phase, setPhase] = useState<Phase>("seuil");
  // `pret` : faux au rendu serveur et au premier rendu client, vrai après le
  // montage. Tant qu'il est faux, le bouton est désactivé et le dit : un
  // bouton visible qui ignore le doigt est la pire forme de lenteur (§8.7).
  const [pret, setPret] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreurChargement, setErreurChargement] = useState(false);
  const [Md, setMd] = useState<MdComponent | null>(null);
  const promesseMd = useRef<Promise<ModuleMd> | null>(null);
  useEffect(() => {
    setPret(true);
    // Préchargement du pipeline dès l'hydratation — le temps de lire les
    // conditions. Si l'élève appuie avant, `commencer` attend la même promesse.
    promesseMd.current ??= chargerMd();
    promesseMd.current.then((m) => setMd(() => m.MdBlock)).catch(() => {});
  }, []);
  const [secondes, setSecondes] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [verdicts, setVerdicts] = useState<Record<string, Verdict>>({});
  // RÉVÉLATION PROGRESSIVE (2026-09-05). Rendre d'un coup les 39 sujets —
  // 145 à 375 formules d'énoncé, 480 à 1 100 de corrigé — gelait un
  // téléphone bon marché (processeur ×6) 10 s au « Commencer » et 14 à 27 s
  // au « Terminer », en UNE tâche de 5 à 10 s. Les exercices se révèlent
  // maintenant un par un, chacun dans une transition (rendu découpé en
  // tranches, le fil reste libre entre deux), et le premier apparaît en une
  // fraction du temps. Deux compteurs : le sujet (phase en cours) et le
  // corrigé (phase correction) — les énoncés déjà rendus restent en place.
  // Les instruments attendent `data-sujet-complet` / `data-corrige-complet`.
  const [reveleSujet, setReveleSujet] = useState(0);
  const [reveleCorrige, setReveleCorrige] = useState(0);
  const [, startTransition] = useTransition();
  // L'unité de révélation est la QUESTION, pas l'exercice : un exercice de
  // corrigé dense (250 formules) restait une seule tâche de 3 à 4 s à ×6 ; une
  // question, c'est un bloc — la tâche la plus longue est bornée par le plus
  // gros bloc du sujet. `debuts[i]` = rang de la première question de
  // l'exercice i ; `nbUnites` = nombre total de questions.
  // Par LOTS, à budget (2026-09-05, quatrième mesure). Un commit par question
  // bornait la tâche la plus longue (0,6 s à ×6) mais quarante commits
  // coûtaient chacun une mise en page de toute la page — le corrigé complet
  // passait de 11,5 s à 22 s, mémo ou pas. On révèle donc autant de questions
  // par commit qu'en tient un budget de formules (le `$` compte les formules,
  // à peu près) : une dizaine de commits, chacun borné à ~80 formules, sauf
  // quand une seule question en porte plus — un bloc est atomique.
  const { debuts, nbUnites, poidsSujet, poidsCorrige } = useMemo(() => {
    const d: number[] = [];
    const ps: number[] = [];
    const pc: number[] = [];
    const formules = (t: string | undefined) => Math.max(1, Math.round(((t ?? "").match(/\$/g) ?? []).length / 2));
    let n = 0;
    for (const e of epreuve.exercices) {
      d.push(n);
      e.questions.forEach((q, k) => {
        ps.push(formules(q.stem) + (k === 0 ? formules(e.intro) : 0));
        pc.push(formules(q.reasoning));
      });
      n += e.questions.length;
    }
    return { debuts: d, nbUnites: n, poidsSujet: ps, poidsCorrige: pc };
  }, [epreuve]);
  const BUDGET_FORMULES = 80;
  const lotSuivant = useCallback((k: number, poids: number[]) => {
    // Le PREMIER lot d'une phase est une seule question : ce que l'élève voit
    // d'abord doit arriver le plus tôt possible (mesuré à ×6 : 3,5 s pour un
    // premier lot plein, ~1 s pour une question). Les lots suivants prennent
    // le budget.
    if (k === 0) return Math.min(nbUnites, 1);
    let j = k;
    let acc = 0;
    while (j < nbUnites && (j === k || acc + poids[j] <= BUDGET_FORMULES)) { acc += poids[j]; j++; }
    return j;
  }, [nbUnites]);
  useEffect(() => {
    if (phase === "seuil") return;
    // Le SUJET d'abord, toujours — même en phase correction. Un « Terminer »
    // tapé pendant que les énoncés se révèlent encore (un robot le fait en
    // 100 ms, un élève sur un téléphone lent le peut) laissait sinon les
    // exercices non révélés sans énoncé ET sans corrigé, tandis que le
    // compteur du corrigé atteignait la fin et posait son marqueur : dom-truth
    // a vu « 4/10 exercices corrigés » avec `data-corrige-complet` posé.
    const sujetAFinir = reveleSujet < nbUnites;
    const corrigeAFinir = phase === "correction" && reveleCorrige < nbUnites;
    if (!sujetAFinir && !corrigeAFinir) return;
    let annule = false;
    const id = window.requestAnimationFrame(() => {
      if (annule) return;
      startTransition(() => {
        if (sujetAFinir) setReveleSujet((k) => lotSuivant(k, poidsSujet));
        else setReveleCorrige((k) => lotSuivant(k, poidsCorrige));
      });
    });
    return () => { annule = true; window.cancelAnimationFrame(id); };
  }, [phase, reveleSujet, reveleCorrige, nbUnites, lotSuivant, poidsSujet, poidsCorrige]);
  const chronoFinal = useRef<number>(0);

  // ── Le focus et l'annonce aux deux gestes (HANDOFF §11.33). « Commencer »
  // et « Terminer » font DISPARAÎTRE le bouton appuyé : sans ceci, le focus
  // retombait sur <body> (le lecteur d'écran repart du haut, le clavier
  // retraverse l'en-tête) et rien ne disait que le sujet, puis le corrigé,
  // étaient là. Même idiome que le changement de chapitre d'une leçon
  // (ChapterShell) : le titre du premier exercice / le premier corrigé reçoit
  // le focus dès que le premier lot est rendu ; une région `status`
  // persistante — présente dès le seuil, sinon rien n'est lu — dit la phase.
  const [annonce, setAnnonce] = useState("");
  const focusFait = useRef<Phase>("seuil");
  useEffect(() => {
    if (phase === "seuil" || focusFait.current === phase) return;
    if (phase === "encours" && reveleSujet < 1) return;
    if (phase === "correction" && reveleCorrige < 1) return;
    focusFait.current = phase;
    const cible = document.querySelector<HTMLElement>(
      phase === "encours" ? "[data-exam-exo] h2" : "[data-exam-corrige]"
    );
    if (cible) {
      cible.tabIndex = -1;
      cible.focus({ preventScroll: false });
    }
    setAnnonce(
      phase === "encours"
        ? "Le sujet est affiché — le chrono a démarré."
        : "Le corrigé est affiché — note chaque question au barème."
    );
  }, [phase, reveleSujet, reveleCorrige]);
  const statut = (
    <p role="status" className="sr-only">
      {annonce}
    </p>
  );

  // Chrono : écoulé, 1 s, coupé en pause et en correction. L'onglet inactif
  // dérive avec setInterval — acceptable pour une répétition (pas un
  // instrument de certification, la note est « indicative »).
  useEffect(() => {
    if (phase !== "encours" || enPause) return;
    const t = setInterval(() => setSecondes((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [phase, enPause]);

  const commencer = useCallback(async () => {
    if (!Md) {
      setChargement(true);
      setErreurChargement(false);
      try {
        const m = await (promesseMd.current ??= chargerMd());
        setMd(() => m.MdBlock);
      } catch {
        // Réseau tombé entre la page et le module : on le dit, le bouton
        // revient, l'élève réessaie — plutôt qu'une page morte sans un mot.
        promesseMd.current = null;
        setChargement(false);
        setErreurChargement(true);
        return;
      }
      setChargement(false);
    }
    setReveleSujet(0);
    setPhase("encours");
    window.scrollTo({ top: 0 });
  }, [Md]);

  const terminer = useCallback(() => {
    chronoFinal.current = secondes;
    setReveleCorrige(0);
    setPhase("correction");
    window.scrollTo({ top: 0 });
  }, [secondes]);

  // Barème par question, résolu une fois : tag transcrit sinon part égale.
  const bareme = useMemo(() => {
    const m = new Map<string, number>();
    for (let i = 0; i < epreuve.exercices.length; i++) {
      const exo = epreuve.exercices[i];
      const tags = exo.questions.map((q) => ptsDepuisStem(q.stem));
      const somme = tags.reduce<number>((s, t) => s + (t ?? 0), 0);
      const manquants = tags.filter((t) => t == null).length;
      const reste = Math.max((exo.baremeTotal ?? 0) - somme, 0);
      const partEgale = manquants > 0 ? reste / manquants : 0;
      exo.questions.forEach((q, j) => {
        m.set(`${i}:${q.id}`, tags[j] ?? partEgale);
      });
    }
    return m;
  }, [epreuve]);

  const note = useMemo(() => {
    let gagne = 0;
    for (const [cle, v] of Object.entries(verdicts)) {
      const pts = bareme.get(cle) ?? 0;
      gagne += v === "juste" ? pts : v === "partiel" ? pts / 2 : 0;
    }
    const sur20 = epreuve.pts > 0 ? (gagne / epreuve.pts) * 20 : 0;
    const repondu = Object.keys(verdicts).length;
    const totalQ = epreuve.exercices.reduce((s, e) => s + e.questions.length, 0);
    return { gagne, sur20, repondu, totalQ };
  }, [verdicts, bareme, epreuve]);

  const depassement = secondes > epreuve.dureeOfficielleMin * 60;
  // Part de la durée officielle écoulée — un FAIT, dessiné comme un filet
  // d'encre qui s'allonge. Jamais de rouge, jamais de compte à rebours.
  const partDuree = Math.min(1, secondes / Math.max(1, epreuve.dureeOfficielleMin * 60));

  // En correction : les points que l'élève s'est accordés, exercice par
  // exercice (dérivés de SES verdicts — rien d'autre n'est inventé).
  const gagnesParExo = useMemo(() => {
    const g = epreuve.exercices.map(() => 0);
    for (const [cle, v] of Object.entries(verdicts)) {
      const i = Number(cle.slice(0, cle.indexOf(":")));
      const pts = bareme.get(cle) ?? 0;
      g[i] += v === "juste" ? pts : v === "partiel" ? pts / 2 : 0;
    }
    return g;
  }, [verdicts, bareme, epreuve]);

  const duree = `${epreuve.dureeOfficielleMin / 60} h`;
  const groupes = useMemo(() => grouperExercices(epreuve.exercices), [epreuve]);

  // ── Phase seuil ──────────────────────────────────────────────────────────
  if (phase === "seuil") {
    const consignes = [
      <>
        Durée officielle : <span className="font-semibold text-primary tnum">{duree}</span>.
        Le chrono affiche le temps écoulé, calmement. Tu peux le mettre en
        pause : c’est une répétition, pas une surveillance.
      </>,
      <>{frenchTypography("Travaille sur papier, comme le jour J — l’écran sert à lire le sujet.")}</>,
      <>
        Les corrections n’apparaissent qu’après « Terminer l’épreuve » ; tu
        t’auto-évalues ensuite question par question, au barème.
      </>,
    ];
    if (!epreuve.complete) {
      consignes.push(
        <span className="text-primary">
          {frenchTypography(
            `Épreuve partielle : ${formatPoints(epreuve.pts)} pts sur 20 sont disponibles — la note sera ramenée sur 20 par règle de trois, à titre indicatif.`
          )}
        </span>
      );
    }
    return (
      <>
        {statut}

        <section
          aria-label="Conditions de l'épreuve"
          className="grid grid-cols-1 gap-x-12 gap-y-10 border-t-2 border-accent pt-8 bp-large:grid-cols-12"
        >
          <div className="bp-large:col-span-7">
            <h2 className="font-display text-h2 font-bold text-primary">
              Avant de commencer
            </h2>
            <ol className="mt-6 border-t border-subtle">
              {consignes.map((c, k) => (
                <li
                  key={k}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-subtle py-4"
                >
                  <span aria-hidden="true" className="font-display text-h2 font-bold leading-none text-primary wdth-62 tnum">
                    {k + 1}
                  </span>
                  <p className="max-w-[64ch] text-body text-secondary">{c}</p>
                </li>
              ))}
            </ol>
            <button
              type="button"
              onClick={commencer}
              disabled={!pret || chargement}
              aria-busy={!pret || chargement || undefined}
              data-primary-action
              className="btn-primary mt-8"
            >
              Commencer l’épreuve
            </button>
            {/* Avant l'hydratation, c'est la ligne globale « La page se prépare… »
                (HydrationNotice, §11.28) qui parle ; ici, seulement l'attente du
                module après l'appui. */}
            {chargement && (
              <p className="mt-2 text-caption text-tertiary" role="status">
                Le sujet se prépare…
              </p>
            )}
            {erreurChargement && (
              <p className="mt-2 text-caption text-primary" role="alert">
                Le sujet n’a pas pu se charger — vérifie la connexion et réessaie.
              </p>
            )}
          </div>

          <div className="bp-large:col-span-5">
            <h2 className="font-display text-h2 font-bold text-primary">
              Le sujet
            </h2>
            <p className="mt-2 text-body-sm text-secondary">
              {epreuve.nbExercices} exercice{epreuve.nbExercices > 1 ? "s" : ""} à traiter
              dans l’ordre de ton choix — la largeur de chaque bloc suit son barème.
            </p>
            <div className="mt-6">
              <CarteSujet groupes={groupes} liens={false} />
            </div>
            <ul className="mt-6 border-t border-subtle">
              {epreuve.exercices.map((exo, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-3 border-b border-subtle py-3"
                >
                  <span aria-hidden="true" className="text-body-sm font-semibold text-tertiary tnum">
                    {exo.numero ?? "·"}
                  </span>
                  <span className="min-w-0 break-words text-body-sm text-primary">
                    {exo.exerciseLabel ?? `Exercice ${i + 1}`}
                  </span>
                  <span className="text-body-sm font-semibold text-primary tnum">
                    {exo.baremeTotal != null ? `${formatPoints(exo.baremeTotal)} pts` : ""}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    );
  }

  // Impossible une fois `commencer` passé (il attend le module) ; TypeScript
  // ne le sait pas.
  if (!Md) return null;

  const enCorrection = phase === "correction";
  const sujetComplet = reveleSujet >= nbUnites;
  const corrigeComplet = enCorrection && sujetComplet && reveleCorrige >= nbUnites;
  const aNoter = note.totalQ - note.repondu;

  return (
    <div
      data-sujet-complet={sujetComplet ? "" : undefined}
      data-corrige-complet={corrigeComplet ? "" : undefined}
    >
      {statut}
      {/* Barre d’épreuve — sticky, sobre. Le chrono est un FAIT, pas une
          alarme : jamais de rouge, jamais de compte à rebours. Le PREMIER
          <p> de la barre est la ligne d'état (chrono, puis note) — la porte
          score-annonce la lit là. */}
      <div
        data-barre-epreuve
        className={cn(
          "sticky top-16 z-raised mb-10 bg-surface-base pt-3",
          "print:static"
        )}
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {enCorrection ? (
            <p className="min-w-0 text-body-sm text-secondary" aria-live="polite" aria-atomic="true">
              Auto-évaluation —{" "}
              <span className="tnum">
                {note.repondu}/{note.totalQ}
              </span>{" "}
              questions notées ·{" "}
              <span data-note-indicative className="font-semibold text-primary tnum">
                {formatNote(note.sur20)} / 20
              </span>{" "}
              <span className="text-tertiary">(indicative)</span>
            </p>
          ) : (
            <p className="min-w-0 text-body-sm text-secondary" aria-live="off">
              <span className="sr-only">Temps écoulé : </span>
              <span data-chrono className="font-display text-h3 font-bold text-primary wdth-75 tnum">
                {formatDuree(secondes)}
              </span>
              <span className="ml-2 text-tertiary">sur {duree}</span>
              {depassement && (
                <span className="ml-2 text-tertiary">
                  — au-delà de la durée officielle
                </span>
              )}
            </p>
          )}
          <div className="hidden min-w-0 flex-1 bp-large:block print:hidden">
            <CarteSujet
              groupes={groupes}
              liens
              gagnesParExo={enCorrection ? gagnesParExo : undefined}
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            {!enCorrection && (
              <button
                type="button"
                onClick={() => setEnPause((p) => !p)}
                className={cn(
                  "min-h-touch border border-field px-4 text-body-sm font-semibold text-primary",
                  "state-layer focus-ring"
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
                <span className="font-semibold text-primary tnum">
                  {formatDuree(chronoFinal.current)}
                </span>
              </p>
            )}
          </div>
        </div>
        {/* Le filet du bas de la barre EST la durée : l'encre s'allonge avec
            le temps écoulé, jusqu'à la durée officielle. */}
        <div aria-hidden="true" className="mt-3 h-0.5 w-full bg-border-soft">
          <div
            className="h-full bg-accent"
            style={{ width: `${((enCorrection ? 0 : partDuree) * 100).toFixed(2)}%` }}
          />
        </div>
      </div>

      {enPause && !enCorrection && (
        <p role="status" className="mb-8 border-l-2 border-accent bg-surface-container-low px-4 py-3 text-body-sm text-secondary">
          En pause — le chrono est arrêté. Reprends quand tu es prêt.
        </p>
      )}

      <div className="grid grid-cols-1 gap-x-12 bp-large:grid-cols-[minmax(0,1fr)_20rem]">
        {/* Les exercices, dans l’ordre du sujet réel. */}
        <ol className="min-w-0 space-y-14" aria-label="Exercices de l'épreuve">
          {epreuve.exercices.map((exo, i) => (
            <ExerciceArticle
              key={i}
              exo={exo}
              i={i}
              nbSujet={Math.min(exo.questions.length, Math.max(0, reveleSujet - debuts[i]))}
              nbCorrige={enCorrection ? Math.min(exo.questions.length, Math.max(0, reveleCorrige - debuts[i])) : 0}
              enCorrection={enCorrection}
              verdicts={verdicts}
              setVerdicts={setVerdicts}
              bareme={bareme}
              Md={Md}
            />
          ))}
        </ol>

        {/* La colonne de copie — à partir de « large » seulement ; elle
            redit ce que la barre dit déjà, en plus posé. Masquée à
            l'impression : la feuille n'imprime que le sujet. */}
        <aside
          aria-label="Ta copie"
          className="hidden bp-large:block print:hidden"
        >
          <div className="sticky top-44 border-t-2 border-accent pt-5">
            {enCorrection ? (
              <>
                <p className="text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                  Note indicative
                </p>
                <p className="mt-2 text-body-sm text-secondary">
                  <span className="font-display text-display font-bold leading-none text-primary wdth-62 tnum">
                    {formatNote(note.sur20)}
                  </span>{" "}
                  / 20
                </p>
                <p className="mt-4 text-body-sm text-secondary">
                  {aNoter > 0 ? (
                    <span className="font-semibold text-signal tnum">
                      {aNoter} question{aNoter > 1 ? "s" : ""} à noter
                    </span>
                  ) : (
                    <span className="font-semibold text-primary">Toutes les questions sont notées.</span>
                  )}
                </p>
                <ul className="mt-6 border-t border-subtle">
                  {groupes.map((g, k) => (
                    <li
                      key={k}
                      className="flex items-baseline justify-between gap-3 border-b border-subtle py-2.5 text-body-sm"
                    >
                      <a href={`#exo-${g.premier + 1}`} className="min-w-0 truncate text-primary hover:underline focus-ring">
                        {g.numero != null ? `Exercice ${g.numero}` : "Partie"}
                      </a>
                      <span className="shrink-0 text-secondary tnum">
                        {formatPoints(arrondi(g.morceaux.reduce((t, i) => t + gagnesParExo[i], 0)))}
                        {g.pts != null && ` / ${formatPoints(arrondi(g.pts))}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="text-caption font-semibold uppercase tracking-eyebrow text-secondary">
                  Ta copie
                </p>
                <p className="mt-3 text-body text-primary">
                  {frenchTypography("Rédige sur papier, comme le jour J.")}
                </p>
                <p className="mt-2 text-body-sm text-secondary">
                  Les corrigés s’ouvrent après « Terminer l’épreuve » ; tu noteras
                  alors chaque question au barème.
                </p>
                <ul className="mt-6 border-t border-subtle">
                  {groupes.map((g, k) => (
                    <li
                      key={k}
                      className="flex items-baseline justify-between gap-3 border-b border-subtle py-2.5 text-body-sm"
                    >
                      <a href={`#exo-${g.premier + 1}`} className="min-w-0 truncate text-primary hover:underline focus-ring">
                        {g.numero != null ? `Exercice ${g.numero}` : "Partie"}
                      </a>
                      <span className="shrink-0 font-semibold text-primary tnum">
                        {g.pts != null ? `${formatPoints(arrondi(g.pts))} pts` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </aside>
      </div>

      {!enCorrection && (
        <div className="mt-14 flex border-t-2 border-accent pt-6">
          <button type="button" onClick={terminer} className="btn-primary">
            Terminer l’épreuve
          </button>
        </div>
      )}

      {enCorrection && (
        <section
          aria-label="Bilan de l'auto-évaluation"
          className="mt-14 grid grid-cols-1 gap-x-12 gap-y-4 border-t-2 border-accent pt-6 bp-large:grid-cols-12"
        >
          <h2 className="font-display text-h2 font-bold text-primary bp-large:col-span-4">
            Ton bilan
          </h2>
          <p className="max-w-[72ch] text-body text-secondary bp-large:col-span-8">
            {frenchTypography(
              `${formatPoints(note.gagne)} pts sur les ${formatPoints(epreuve.pts)} disponibles, soit`
            )}{" "}
            <span className="font-semibold text-primary tnum">
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
