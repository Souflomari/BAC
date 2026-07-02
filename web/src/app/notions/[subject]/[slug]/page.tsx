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
import { NotionPageView } from "@/components/notion/NotionPageView";

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  const notions = listNotions();
  return notions.map((n) => ({
    subject: n.subject,
    slug: n.slug,
  }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { subject: string; slug: string };
}): Promise<Metadata> {
  const id = `${params.subject}/${params.slug}`;
  const notion = loadNotion(id);
  if (!notion) return { title: "Notion introuvable" };
  return { title: notion.meta.title };
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function NotionPage({
  params,
}: {
  params: { subject: string; slug: string };
}) {
  return <NotionPageView id={`${params.subject}/${params.slug}`} />;
}
