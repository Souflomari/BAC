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
import { listNotions } from "@/lib/content";
import { listEpreuves, getEpreuve, epreuveTitre, filiereLabel } from "@/lib/examens";
import { frenchTypography } from "@/lib/frenchTypography";
import { EpreuveShell, type EpreuveData } from "@/components/examens/EpreuveShell";

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

function manifestePourHeader() {
  return listNotions().map((n) => ({
    subject: n.subject,
    slug: n.slug,
    title: n.title,
    readingMinutes: n.readingMinutes,
  }));
}

export default function EpreuvePage({ params }: { params: { id: string } }) {
  const ep = getEpreuve(params.id);
  if (!ep) notFound();

  const data: EpreuveData = {
    id: ep.id,
    titre: epreuveTitre(ep),
    filiereLabel: filiereLabel(ep.filiere),
    pts: ep.pts,
    dureeOfficielleMin: ep.dureeOfficielleMin,
    complete: ep.complete,
    exercices: ep.exercices.map((x) => ({
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

  return (
    <PageShell notions={manifestePourHeader()} width="page">
      <header className="mb-8">
        <Breadcrumb
          segments={[
            { label: "Accueil", href: "/" },
            { label: "Examens blancs", href: "/examens" },
            { label: `${ep.year} — ${ep.session === "normale" ? "normale" : "rattrapage"}` },
          ]}
        />
        <h1 className="font-display text-h1 bp-medium:text-display font-bold text-primary">
          {epreuveTitre(ep)}
        </h1>
        <p className="mt-2 text-body-sm text-secondary">
          {filiereLabel(ep.filiere)} ·{" "}
          {/* « 10,5 pts » nu se lit « épreuve sur 10,5 ». Le sous-titre de
              l'index le dit déjà (« sur 20 disponibles ») ; le masthead de
              la page, lui, ne le disait qu'un panneau plus bas. La seule
              épreuve partielle du corpus (SM 2020) portait donc, en tête de
              page, un nombre dont le sens n'arrivait qu'après. */}
          <span className="mono-inline tabular-nums">
            {String(ep.pts).replace(".", ",")} pts
            {!ep.complete && " sur 20 disponibles"}
          </span>{" "}
          · {ep.dureeOfficielleMin / 60} h
        </p>
      </header>
      <EpreuveShell epreuve={data} />
    </PageShell>
  );
}
