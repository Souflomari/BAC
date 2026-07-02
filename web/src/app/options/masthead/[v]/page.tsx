/**
 * OPTION SET A — masthead/display scale variants (Day-3 taste decision aid).
 *
 * /options/masthead/a1 — control: 30px text-h1 (what ships today)
 * /options/masthead/a2 — ~44px, tightened
 * /options/masthead/a3 — ~56px display in a full-bleed masthead band
 *
 * Renders the REAL RLC notion through NotionPageView so the owner judges the
 * actual page, not a mock. TEMPORARY: this whole /options tree is deleted once
 * the owner's pick is inlined (ledger: docs/audits/fable-day3-ledger.md).
 * Excluded from search engines via robots metadata.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotionPageView, type MastheadVariant } from "@/components/notion/NotionPageView";

const VARIANTS: MastheadVariant[] = ["a1", "a2", "a3"];

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ v }));
}

export const metadata: Metadata = {
  title: "Option — masthead",
  robots: { index: false, follow: false },
};

export default function MastheadOption({ params }: { params: { v: string } }) {
  if (!VARIANTS.includes(params.v as MastheadVariant)) notFound();
  return (
    <NotionPageView
      id="pc/rlc-serie"
      mastheadVariant={params.v as MastheadVariant}
    />
  );
}
