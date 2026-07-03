/**
 * Notion page — /notions/[subject]/[slug]
 *
 * URL maps directly to the content directory structure:
 *   /notions/pc/rlc-serie → content/pc/rlc-serie/
 *
 * The full render lives in NotionPageView (extracted Day 3 so the masthead
 * option variants — /options/masthead/a1..a3 — render the REAL page while the
 * owner's Set-A decision is pending). This route is the production surface:
 * it always renders the default (a1/control) masthead.
 *
 * Server component: all file I/O and markdown parsing happens on the server.
 */

import type { Metadata } from "next";
import { loadNotion, listNotions } from "@/lib/content";
import { subjectLabel } from "@/lib/subjects";
import { NotionPageView } from "@/components/notion/NotionPageView";

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  const notions = listNotions();
  return notions.map((n) => ({
    subject: n.subject,
    slug: n.slug,
  }));
}

// ── Metadata (head pack — July-2026 external-audit F5) ────────────────────────
// Description = computable facts only (subject, level, reading time) — the
// honest-metadata rule; no marketing copy generated per page.
function notionDescription(subject: string, minutes?: number): string {
  const parts = [
    `Leçon de ${subjectLabel(subject)} — 2ᵉ Bac sciences (Maroc)`,
  ];
  if (minutes) parts.push(`${minutes} min de lecture`);
  parts.push("un tuteur calme, une notion à fond.");
  return parts.join(" · ");
}

export async function generateMetadata({
  params,
}: {
  params: { subject: string; slug: string };
}): Promise<Metadata> {
  const id = `${params.subject}/${params.slug}`;
  const notion = loadNotion(id);
  if (!notion) return { title: "Notion introuvable" };
  const { meta } = notion;
  const path = `/notions/${params.subject}/${params.slug}`;
  const description = notionDescription(meta.subject, meta.readingMinutes);
  return {
    title: meta.title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: meta.title,
      description,
      url: path,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "BAC · sciences" }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NotionPage({
  params,
}: {
  params: { subject: string; slug: string };
}) {
  const id = `${params.subject}/${params.slug}`;
  // Per-notion JSON-LD (LearningResource) — computable facts only.
  const notion = loadNotion(id);
  const jsonLd = notion
    ? {
        "@context": "https://schema.org",
        "@type": "LearningResource",
        name: notion.meta.title,
        inLanguage: "fr",
        educationalLevel: "2ᵉ année du baccalauréat (Maroc)",
        about: subjectLabel(notion.meta.subject),
        timeRequired: notion.meta.readingMinutes
          ? `PT${notion.meta.readingMinutes}M`
          : undefined,
        url: `https://bac-pink.vercel.app/notions/${params.subject}/${params.slug}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <NotionPageView id={id} />
    </>
  );
}
