/**
 * /examens/[id] — une épreuve réelle, en trois phases (EXAM-MODE-SPEC §2).
 *
 * Page SERVEUR : assemble l'épreuve depuis les banques (lib/examens) et
 * passe des props SÉRIALISÉES au shell client. Le fs ne traverse jamais la
 * frontière client (contrainte PageShell/connexion, déjà mordue une fois).
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/ui/PageShell";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { listEpreuves, getEpreuve, epreuveTitre, filiereLabel } from "@/lib/examens";
import { frenchTypography } from "@/lib/frenchTypography";
import { formatPoints } from "@/lib/bareme";
import { EpreuveShell, type EpreuveData } from "@/components/examens/EpreuveShell";
import { manifesteEpreuves } from "@/lib/palette-epreuves";
import { manifestePourHeader } from "@/lib/palette-notions";

// Toutes les valeurs valides sont connues au build (generateStaticParams) ;
// une adresse inconnue reçoit alors la page « introuvable » PRÉRENDUE — en-tête,
// message, liens — au lieu d'un HTML vide que seul le JavaScript remplit
// (HANDOFF §11.32 : sur 3G lente, un élève au lien périmé regardait une page
// blanche 10 à 20 s ; sans JavaScript, pour toujours).
export const dynamicParams = false;

export function generateStaticParams() {
  return listEpreuves().map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const ep = getEpreuve(params.id);
  if (!ep) return { title: "Épreuve introuvable" };
  return {
    title: `${epreuveTitre(ep)} · ${filiereLabel(ep.filiere)}`,
    alternates: { canonical: `/examens/${params.id}` },
  };
}

/**
 * Le numéro de l'exercice SUR LA COPIE — le même que celui qui fait le compte
 * « N exercices » de `lib/examens` : le libellé (« Exercice 3 », « Exercice
 * II ») fait foi ; dans son silence, l'identifiant (`-x3`, convention K-7
 * bis) ; et une épreuve dont AUCUN libellé n'est numéroté se lit entièrement
 * sur les identifiants (SPC 2011 normale nomme ses exercices par discipline).
 * Plusieurs morceaux d'un même exercice partagent ce numéro.
 */
const NUMERO_LIBELLE = /Exercice\s+([IVX]+|\d+)/i;
const ROMAINS: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
function numeroSurLaCopie(label: string | undefined, id: string, parIdentifiant: boolean): number | null {
  if (!parIdentifiant && label) {
    const m = label.match(NUMERO_LIBELLE);
    if (m) {
      const brut = m[1].toUpperCase();
      const n = ROMAINS[brut] ?? parseInt(brut, 10);
      if (!Number.isNaN(n)) return n;
    }
  }
  const m = id.match(/-x(\d+)/i);
  return m ? parseInt(m[1], 10) : null;
}

export default function EpreuvePage({ params }: { params: { id: string } }) {
  const ep = getEpreuve(params.id);
  if (!ep) notFound();
  const parIdentifiant = ep.exercices.every((x) => !NUMERO_LIBELLE.test(x.exerciseLabel ?? ""));

  const data: EpreuveData = {
    id: ep.id,
    titre: epreuveTitre(ep),
    filiereLabel: filiereLabel(ep.filiere),
    pts: ep.pts,
    dureeOfficielleMin: ep.dureeOfficielleMin,
    complete: ep.complete,
    nbExercices: ep.nbExercices,
    exercices: ep.exercices.map((x) => ({
      numero: numeroSurLaCopie(x.exerciseLabel, x.entry.id, parIdentifiant),
      subject: x.subject,
      notionSlug: x.notionSlug,
      notionTitle: frenchTypography(x.notionTitle),
      // TYPOGRAPHIE FRANÇAISE SUR LE TEXTE NON-MARKDOWN (2026-09-05).
      // `intro`, `stem` et `reasoning` passent par MdBlock, donc par
      // `remarkFrenchTypography`. Ces quatre champs-ci sont rendus en texte
      // NU — en-tête d'exercice, titre, libellé de partie, nom de notion — et
      // sortaient donc avec des apostrophes droites et sans insécable devant
      // « : ? ; ». Mesuré le 2026-09-05, la première fois que la porte
      // typographie a su ouvrir une épreuve : 626 occurrences, sur les 39
      // sujets, sans exception. Un seul endroit répare la surface entière.
      exerciseLabel: x.exerciseLabel ? frenchTypography(x.exerciseLabel) : x.exerciseLabel,
      titre: frenchTypography(x.entry.title),
      baremeTotal: x.entry.baremeTotal,
      intro: x.entry.intro,
      questions: x.entry.questions.map((q) => ({
        id: q.id,
        part: (q as { part?: string }).part
          ? frenchTypography((q as { part?: string }).part as string)
          : (q as { part?: string }).part,
        stem: q.stem,
        reasoning: q.reasoning,
      })),
    })),
  };

  const faits: { valeur: string; unite: string; libelle: string }[] = [
    { valeur: String(ep.dureeOfficielleMin / 60), unite: "h", libelle: "durée officielle" },
    {
      valeur: formatPoints(ep.pts),
      unite: "pts",
      // « 10,5 pts » nu se lit « épreuve sur 10,5 » : la partielle le dit
      // tout de suite (SM 2020, la seule du corpus).
      libelle: ep.complete ? "barème national" : "sur 20 disponibles",
    },
    { valeur: String(ep.nbExercices), unite: ep.nbExercices > 1 ? "exercices" : "exercice", libelle: "sur le sujet" },
  ];

  return (
    <PageShell epreuves={manifesteEpreuves()} notions={manifestePourHeader()} width="page">
      <header className="mb-10">
        <Breadcrumb
          segments={[
            { label: "Accueil", href: "/" },
            { label: "Examens blancs", href: "/examens" },
            { label: `${ep.year} — ${ep.session === "normale" ? "normale" : "rattrapage"}` },
          ]}
        />
        {/* GRILLE (refonte 2026-10) : le titre à gauche, les trois faits qui
            décident de la séance à droite, en grands chiffres. */}
        <div className="grid grid-cols-1 items-end gap-x-12 gap-y-6 bp-large:grid-cols-12">
          <div className="bp-large:col-span-7">
            <p className="text-caption font-semibold uppercase tracking-eyebrow text-secondary">
              {filiereLabel(ep.filiere)}
            </p>
            <h1 className="mt-2 font-display text-h1 font-bold text-primary bp-medium:text-display">
              {epreuveTitre(ep)}
            </h1>
          </div>
          <dl className="grid grid-cols-3 gap-x-6 border-t-2 border-accent pt-3 bp-large:col-span-5">
            {faits.map((f) => (
              <div key={f.libelle} className="min-w-0">
                <dt className="text-caption text-secondary">{f.libelle}</dt>
                <dd className="mt-1 text-body-sm text-secondary">
                  <span className="font-display text-h1 font-bold leading-none text-primary wdth-62 tnum">
                    {f.valeur}
                  </span>{" "}
                  {f.unite}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>
      <EpreuveShell epreuve={data} />
    </PageShell>
  );
}
