/**
 * NotionPageView — the notion page's full render, extracted from the route so
 * the masthead option variants (Day-3 set A) render the real page, not a mock.
 *
 * DAY-4 FREEZE (Set A = A3, FABLE-DECIDED / OWNER-REVIEW-PENDING — ledger
 * docs/audits/fable-day3-ledger.md): the DEFAULT masthead is now the A3
 * masthead BAND — text-display-lg (56px) serif title in a full-bleed
 * surface-container-low band with a bottom hairline, breadcrumb + title +
 * metadata aligned to the page SPINE (not the centered prose measure — the
 * band is chapter furniture, it spans the page's structural edge). a1/a2
 * remain as option variants for the owner's laptop review; if overridden,
 * swap = change the default below. Spec: docs/design/PAGE-ANATOMY-SPECS.md.
 *
 * The masthead anatomy (all variants):
 *   breadcrumb (nav) → serif title → METADATA LINE (level chip · reading time ·
 *   updated date — audit amendment #3). No eyebrow (U3 doubled-label kill).
 *
 * Page end: LessonEnd (the Set-C C2 refile) — the session-close handoff.
 *
 * Server component.
 */

import { notFound } from "next/navigation";
import { loadNotion, listNotions } from "@/lib/content";
import { nextInParcours } from "@/lib/curriculum";
import type { NotionItem } from "@/lib/content";
import { realChapterCount, extractChapterHeadings } from "@/lib/chapters";
import { cartesParChapitre } from "@/lib/retenir";
import { PageShell } from "@/components/ui/PageShell";
import { NotionBody } from "@/components/notion/NotionBody";
import { buildCheckpointCloneIds } from "@/components/notion/ItemsSection";
import { MarginRail, ChapterMenuCompact } from "@/components/notion/MarginRail";
import { ChapterShell, ChapterPosition, ChapterTransport } from "@/components/notion/ChapterShell";
import { RetenirZone } from "@/components/notion/RetenirZone";
import { AttemptEventProvider, ChapterVisitRecorder } from "@/components/notion/AttemptEvents";
import { Icon } from "@/components/ui/Icon";
import { LessonEnd } from "@/components/notion/LessonEnd";
import { ExerciseBank } from "@/components/notion/ExerciseBank";
import { cn } from "@/lib/utils";
import { subjectLabel, subjectHref } from "@/lib/subjects";
import { Breadcrumb as SharedBreadcrumb } from "@/components/ui/Breadcrumb";
import { MarginNotes, type MarginNote } from "./MarginNotes";
import { KeyFormulaRail, type KeyFormula } from "./KeyFormulaRail";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";
import "./grille-notion.css";

export { subjectLabel };

export type MastheadVariant = "a1" | "a2" | "a3";
// CANDIDAT AU RETRAIT (2026-08-22, purge des bancs /options) : les bancs
// masthead a1/a2 sont supprimés — plus AUCUN appelant ne passe autre chose
// que le défaut a3. Les branches a1/a2 ci-dessous sont du code mort typé,
// gardées le temps d'une passe dédiée sur ce composant porteur (retirer la
// prop + les branches + ce type d'un seul geste, portes complètes).

// ── Breadcrumb (Day-9: now the shared component; the notion crumb goes
//    Accueil › <matière index> › <notion>, so the subject segment LINKS to
//    the subject's chapter list — real wayfinding up the tree). ──
function Breadcrumb({ subject, title }: { subject: string; title: string }) {
  return (
    <SharedBreadcrumb
      segments={[
        { label: "Accueil", href: "/" },
        { label: subjectLabel(subject), href: subjectHref(subject) },
        { label: title },
      ]}
    />
  );
}

// ── Masthead metadata line (audit amendment #3 — web-native texture) ──────────
// Level chip · reading time · updated date. Sans, secondary, quiet. The level
// is app-wide truth today ("2ᵉ Bac · Sciences"); per-notion filière detail
// needs a small content-meta file — ledgered as a Day-5 content-schema item.
/**
 * La ligne de métadonnées du masthead — des faits CALCULÉS uniquement
 * (PAGE-ANATOMY-SPECS §masthead).
 *
 * « mis à jour <mois année> » a été RETIRÉ le 2026-09-05, et c'est
 * l'application stricte de cette règle-là. La date venait du `mtime` de
 * `lesson.md` : après un clone frais — donc à chaque déploiement Vercel —
 * tous les fichiers portent l'instant du checkout, et les 62 leçons
 * auraient annoncé la même « mise à jour », celle du déploiement. Mesuré
 * ici même avant retrait : les 62 affichaient « septembre 2026 ».
 *
 * Ce n'était donc pas un fait calculé mais un fait FABRIQUÉ — la chose que
 * la règle d'état honnête interdit. Et la date ne suivait même pas le
 * contenu : une campagne qui réécrit `items.yaml` sans toucher `lesson.md`
 * ne la bougeait pas d'un jour.
 *
 * Le chemin de retour, s'il en faut un : un champ AUTORÉ dans le contenu
 * (« revu le … », comme `retenir.json` est autoré), pas une horloge de
 * système de fichiers. Une date vraie est un fait éditorial, pas une
 * propriété d'inode.
 */
function MastheadMeta({ readingMinutes }: { readingMinutes?: number }) {
  const parts: string[] = ["2ᵉ Bac · Sciences"];
  if (readingMinutes) parts.push(`${readingMinutes} min de lecture`);
  return (
    <p className="mt-4 text-body-sm text-secondary">
      {parts.join("  ·  ")}
    </p>
  );
}

// ── Fiche de la notion (Grille) ────────────────────────────────────────────────
// Trois faits CALCULÉS, en chiffres serrés : le nombre de chapitres de la
// leçon (la même règle que le rail, lib/chapters.ts), la durée de lecture
// autorée, et — seulement si la notion a une banque — le nombre de sujets de
// bac réels qu'elle propose. Aucun fait n'est inventé pour remplir la grille :
// une notion sans banque montre deux colonnes, pas trois.
function NotionFacts({
  chapters,
  readingMinutes,
  bankCount,
}: {
  chapters: number;
  readingMinutes?: number;
  bankCount?: number;
}) {
  const facts: { valeur: string; unite: string }[] = [];
  if (chapters > 0) facts.push({ valeur: String(chapters), unite: chapters > 1 ? "chapitres" : "chapitre" });
  if (readingMinutes) facts.push({ valeur: String(readingMinutes), unite: "min de lecture" });
  if (bankCount != null && bankCount > 0) facts.push({ valeur: String(bankCount), unite: bankCount > 1 ? "sujets de bac" : "sujet de bac" });
  if (facts.length === 0) return null;
  return (
    <dl data-notion-faits className="grid grid-cols-3 gap-x-6 border-t border-subtle pt-4">
      {facts.map((f) => (
        <div key={f.unite} className="min-w-0">
          <dt className="sr-only">{f.unite}</dt>
          <dd className="font-display wdth-62 text-h1 font-bold leading-none text-primary tnum">{f.valeur}</dd>
          <dd className="mt-2 text-body-sm text-secondary">{f.unite}</dd>
        </div>
      ))}
    </dl>
  );
}

// ── Page view ─────────────────────────────────────────────────────────────────
/** Day-8 wide-viewport option candidates (owner review pending; rendered
 *  only by /options/wide/[v] — the default surface is unchanged):
 *  Set M composes the masthead band (m1 cover-in-band · m2 bounded band ·
 *  m3 watermark); Set W composes the wide content region (w1 margin notes ·
 *  w2 symmetric re-center + earned full-bleed · w3 key-formula rail). */
export type WideOption = "m1" | "m2" | "m3" | "w1" | "w2" | "w3";

export function NotionPageView({
  id,
  mastheadVariant = "a3",
  wideOption,
  marginNotes,
  keyFormulas,
}: {
  id: string;
  mastheadVariant?: MastheadVariant;
  wideOption?: WideOption;
  marginNotes?: MarginNote[];
  keyFormulas?: KeyFormula[];
}) {
  const notion = loadNotion(id);
  if (!notion) notFound();

  const {
    meta,
    lessonMd,
    itemsData,
    checkpoints,
    exercises,
    bank,
    derivations,
    mediaSvgs,
    motionSvgs,
    motionSpecs,
    mediaStages,
    retenir,
    mediaInteractive,
    mediaEmbeds,
    mediaScenes,
  } = notion;

  // Inline-items model (LESSON-EXPERIENCE-SPEC §1.1): group every diagnostic
  // item by its rung so NotionBody can render each chapter's questions inline
  // at the end of that chapter. Items that are cloned as inline checkpoints
  // (`item_source: clone_of_<id>`) are excluded so the student never meets the
  // identical question twice. Items with no rung fall into a bucket that
  // matches no chapter → NotionBody's orphan safety-net renders them.
  const checkpointCloneIds = buildCheckpointCloneIds(checkpoints);
  const itemsByRung: Record<string, NotionItem[]> = {};
  for (const item of itemsData?.items ?? []) {
    if (checkpointCloneIds.has(item.id)) continue;
    const key = item.rung ?? "__no_rung__";
    (itemsByRung[key] ??= []).push(item);
  }

  // LessonEnd next-suggestion: l'ordre du PROGRAMME, pas celui du système de
  // fichiers. Ce bloc lisait `listNotions().filter(…)[0]` — l'ordre de
  // `readdirSync` — tout en affirmant en commentaire « la notion la plus
  // récemment mise à jour ». Résultat : la MÊME suggestion à la fin de toutes
  // les leçons. `nextInParcours` (lib/curriculum.ts) rend le chapitre
  // construit qui suit dans la matière, puis les matières suivantes, puis
  // boucle — déterministe, sans horloge, et fidèle au parcours de l'élève.
  const toutes = listNotions();
  const construites = new Set(toutes.map((n) => n.id));
  const suivanteId = nextInParcours(id, construites);
  const nextNotion =
    (suivanteId ? toutes.find((n) => n.id === suivanteId) : undefined) ?? null;

  const hasAnyContent =
    !!lessonMd ||
    !!itemsData ||
    Object.keys(mediaSvgs).length > 0 ||
    Object.keys(motionSvgs).length > 0 ||
    Object.keys(mediaEmbeds).length > 0 ||
    Object.keys(mediaScenes).length > 0;

  // ── Pagination (LESSON-EXPERIENCE-SPEC §1 + BANK-SPEC §1) ─────────────────
  // `realChapters` = the lesson's own `## ` chapters (lib/chapters.ts — the
  // SAME rule MarginRail uses, so the two never disagree). Each chapter hosts
  // its own diagnostic questions inline. BANK-SPEC §1 revives the trailing
  // « S'entraîner » chapter (the `hasTrailingChapter` slot NotionBody carries)
  // — but ONLY when the notion has a bank.yaml. Every other notion's chapter
  // count is exactly the real chapters, unchanged. `totalChapters` is what
  // ChapterShell uses to size keyboard/URL clamping and the "Chapitre n / N".
  // Les titres de chapitre, extraits UNE FOIS ici — côté serveur.
  //
  // MarginRail et ChapterMenuCompact sont des composants client, et n'ont
  // jamais eu besoin que de cette liste. Tant qu'on leur passait `lessonMd`,
  // la leçon entière partait deux fois dans la charge RSC du document, en
  // plus du DOM déjà rendu (§11.175). Un seul appel, un seul tableau, passé
  // aux deux : elles restent d'accord par construction, comme avant.
  const chapterHeadings = lessonMd ? extractChapterHeadings(lessonMd) : [];
  const realChapters = lessonMd ? realChapterCount(lessonMd) : 0;
  const realChapterCountClamped = Math.max(1, realChapters);
  // A non-null bank (bank.yaml present, even with zero entries) gets the
  // trailing chapter — its honest empty state IS a real render (BANK-SPEC §1).
  const hasBank = bank !== null;
  const trailingChapterIndex = realChapterCountClamped; // 0-based: after the last real chapter
  const totalChapters = realChapterCountClamped + (hasBank ? 1 : 0);

  // ── Zone « à retenir » (LESSON-EXPERIENCE-SPEC §3.2) ──────────────────────
  // Une carte (ou rien) par chapitre, calculée ICI, au build : le composant
  // client ne fait que choisir l'index courant. Le chapitre synthétique
  // « S'entraîner » reçoit null — une banque d'exercices n'a pas de formule à
  // retenir, et la zone se tait plutôt que d'en inventer une.
  const cartesRetenir = cartesParChapitre(lessonMd, retenir, totalChapters);

  // Masthead title classes per variant (Set A). a1 = shipped control.
  const titleClass = {
    a1: "text-h1",
    // a2 is a deliberate A/B display spec; it becomes a token when V1 encodes
    // it as the default (Phase C). token-gate-allow
    a2: "text-[2.75rem] leading-[1.1] tracking-[-0.026em]",
    a3: "text-display-lg max-w-[26ch]", // frozen display tier (TOKENS v2); measure-capped
  }[mastheadVariant];

  const onSpine = mastheadVariant === "a3"; // band variant: masthead on the page spine
  const masthead = (
    <>
      <div className={onSpine ? undefined : "notion-prose"}>
        <Breadcrumb subject={meta.subject} title={meta.title} />
      </div>
      <header className={cn(onSpine ? "mb-0" : "notion-prose mb-10")}>
        <h1
          className={cn(
            "font-display font-bold text-primary",
            titleClass
          )}
        >
          {meta.title}
        </h1>
        <MastheadMeta
          readingMinutes={meta.readingMinutes}
        />
      </header>
    </>
  );

  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width={wideOption === "w2" ? "notionWide" : wideOption ? "notion" : "page"}>
      {/* Skip-to-content for keyboard users (DESIGN-BIBLE §9) */}
      <a
        href="#lesson-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "focus:fixed focus:top-4 focus:left-4 focus:z-50",
          "focus:px-4 focus:py-2 focus:rounded-lg",
          "focus:bg-accent focus:text-on-accent focus:text-body-sm focus:font-medium"
        )}
      >
        Aller au contenu de la leçon
      </a>

      {/* a3: the masthead lives in a full-bleed tonal band ABOVE the grid; the
          band breaks to the viewport edges while its content stays on the page
          spine (margin/padding cancel-out). Grid content starts under it. */}
      {/* GRILLE (refonte 2026-10) — le bloc-titre remplace la bande grise
          pleine largeur et l'illustration de couverture : un fil d'Ariane, la
          matière au rouge signal, le titre en Archivo serrée, la ligne de
          métadonnées, puis les faits calculés (chapitres, lecture, sujets) en
          grands chiffres. Un filet d'encre ferme le bloc. `data-band` est
          gardé : c'est l'ancre que les portes lisent pour trouver le masthead. */}
      {mastheadVariant === "a3" && (
        <div data-band="masthead" className="mb-10 bp-medium:mb-12">
          <Breadcrumb subject={meta.subject} title={meta.title} />
          <div className="grid gap-8 bp-large:grid-cols-12 bp-large:items-end">
            <div className="min-w-0 bp-large:col-span-8">
              <p className="mb-3 text-body-sm font-semibold text-signal">
                {subjectLabel(meta.subject)}
              </p>
              <header className="mb-0">
                <h1 className={cn("font-display font-bold text-primary", "text-h1 bp-medium:text-display bp-large:text-display-lg", "max-w-[22ch]")}>
                  {meta.title}
                </h1>
                <MastheadMeta readingMinutes={meta.readingMinutes} />
              </header>
            </div>
            <div className="min-w-0 bp-large:col-span-4">
              <NotionFacts
                chapters={realChapters}
                readingMinutes={meta.readingMinutes}
                bankCount={hasBank ? bank!.entries.length : undefined}
              />
            </div>
          </div>
          <div aria-hidden="true" className="mt-8 h-0.5 bg-accent" />
        </div>
      )}

      {/* ── Two-column layout: margin rail + content, both paginated ──────
          LESSON-EXPERIENCE-SPEC §1.3: ChapterShell wraps rail + content so
          BOTH can read/drive the current-chapter context (MarginRail's
          active highlighting + activation, the position affordance, every
          chapter's own prev/next). NotionBody and the synthetic chapter
          below are the ONLY things ChapterShell toggles visibility on — the
          shell itself renders no lesson content of its own. */}
      <ChapterShell totalChapters={totalChapters}>
        {/* Attempt-event wiring (tutor-first plan, Lane E): the provider
            gives McqItem/CheckpointItem/AttemptFirstExercise the notion id;
            the recorder emits one visit event per chapter activation. Both
            are behaviorally inert in off/mock builds (emitter hard-gate). */}
        <AttemptEventProvider notionId={`${meta.subject}/${meta.slug}`}>
        <ChapterVisitRecorder />
        <div className="notion-page-grid" data-grille-notion>
          {lessonMd ? (
            <MarginRail
              headings={chapterHeadings}
              hasItems={hasBank}
              bankCount={hasBank ? bank!.entries.length : undefined}
            />
          ) : (
            <div className="notion-rail" aria-hidden="true" />
          )}

          {/* Content column. Set-W1/W3 candidates anchor their right-margin
              channel to this column (absolute, outside the container, in the
              wide-tier void the owner circled). */}
          <div id="lesson-content" className={cn("notion-content", (wideOption === "w1" || wideOption === "w3") && "relative")}>
            {/* Jumeau compact du rail (rail display:none sous 600 px).
                Audit R6 (ergonomie P1-7) : le texte inerte « Chapitre 1/10 »
                devient un MENU — un <details> fermé par défaut listant les
                mêmes chapitres que le rail (mêmes props, même construction :
                les deux surfaces ne peuvent pas diverger). Sans lui,
                atteindre le chapitre 7 coûtait six « suivant » et autant de
                défilements. Repli sans texte de leçon : le simple
                positionneur d'avant. */}
            {lessonMd ? (
              <ChapterMenuCompact
                headings={chapterHeadings}
                hasItems={hasBank}
                bankCount={hasBank ? bank!.entries.length : undefined}
                className="mb-6 bp-medium:hidden"
              />
            ) : (
              <ChapterPosition className="mb-6 bp-medium:hidden" />
            )}

            {wideOption === "w1" && marginNotes && <MarginNotes notes={marginNotes} />}
            {wideOption === "w3" && keyFormulas && <KeyFormulaRail formulas={keyFormulas} />}
            {mastheadVariant !== "a3" && masthead}

            {lessonMd ? (
              <NotionBody
                lessonMd={lessonMd}
                exercises={exercises}
                derivations={derivations}
                mediaSvgs={mediaSvgs}
                motionSvgs={motionSvgs}
                motionSpecs={motionSpecs}
                mediaStages={mediaStages}
                mediaInteractive={mediaInteractive}
                mediaEmbeds={mediaEmbeds}
                mediaScenes={mediaScenes}
                checkpoints={checkpoints}
                itemsByRung={itemsByRung}
                hasTrailingChapter={hasBank}
                lessonEnd={hasAnyContent ? <LessonEnd next={nextNotion} currentSubject={meta.subject} /> : undefined}
              />
            ) : (
              <div
                className={cn(
                  "rounded-xl border border-dashed border-subtle",
                  "px-8 py-10 text-center",
                  "text-body-sm text-secondary"
                )}
              >
                Leçon en cours de préparation.
              </div>
            )}

            {/* Inline-items model (spec §1.1): each chapter's diagnostic
                questions render inside that chapter (NotionBody →
                ChapterQuestions). The trailing « S'entraîner » chapter below
                (BANK-SPEC §1) is the ONE synthetic chapter — present only when
                the notion has a bank.yaml. */}

            {/* ── Trailing « S'entraîner » bank chapter (BANK-SPEC §1) ──────
                Rendered as ONE more paginated chapter section (same
                data-chapter-section contract NotionBody's chapters use, so
                ChapterShell toggles it identically) at index
                `trailingChapterIndex` — after the lesson's last real chapter.
                It hosts the bank cards + LessonEnd (which no longer closes
                NotionBody's last chapter, since hasTrailingChapter is true) +
                the chapter's own prev transport. Absent entirely for notions
                without a bank.yaml — their pagination is unchanged. */}
            {hasBank && (
              <section
                data-chapter-section
                data-chapter-index={trailingChapterIndex}
                data-chapter-active="false"
                hidden
                className="chapter-view"
              >
                <ExerciseBank bank={bank!} />
                {hasAnyContent && <LessonEnd next={nextNotion} currentSubject={meta.subject} />}
                <ChapterTransport index={trailingChapterIndex} />
              </section>
            )}

            {/* Fallback: notion directory exists but all content is absent */}
            {!hasAnyContent && (
              <div
                className={cn(
                  "mt-12 rounded-xl border border-dashed border-subtle",
                  "px-8 py-10 text-center",
                  "text-body-sm text-secondary"
                )}
              >
                Contenu en cours de préparation.
              </div>
            )}
          </div>

          {/* ── Zone « à retenir » (spec §3.2) — cinquième colonne de la
              grille, au palier ≥1536 seulement. Elle est CINQUIÈME ENFANT de
              .notion-page-grid, donc à côté du contenu et non dedans : c'est
              ce qui garantit que la colonne de prose ne bouge pas d'un pixel
              quand elle apparaît. Sous 1536, `display: none` la retire de la
              grille — sans quoi elle formerait une ligne fantôme sous le
              contenu, la grille n'ayant que trois colonnes à ce palier. */}
          <RetenirZone cartes={cartesRetenir} />
        </div>
        </AttemptEventProvider>
      </ChapterShell>
    </PageShell>
  );
}
