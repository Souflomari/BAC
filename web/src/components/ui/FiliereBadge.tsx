/**
 * FiliereBadge — the header's quiet filière affordance (Day-9 site skeleton).
 *
 * Shows the chosen stream as a small chip linking to /commencer (change it),
 * or a calm "Choisis ta filière" prompt when none is set. Client-only (reads
 * the persisted preference); renders nothing until mounted so the server and
 * first client paint agree (no hydration flash). Periphery, quiet — the
 * header stays minimal (§0).
 */

"use client";

import Link from "next/link";
import { getFiliere } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { cn } from "@/lib/utils";

export function FiliereBadge() {
  const { filiere, mounted } = useFiliere();
  if (!mounted) return null;

  const f = getFiliere(filiere);

  return (
    <Link
      href="/commencer"
      className={cn(
        "hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-body-sm font-medium",
        "state-layer focus-ring [--focus-radius:9999px]",
        "transition-colors duration-micro ease-enter",
        f
          ? "bg-[var(--color-accent-subtle)] text-accent"
          : "border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      )}
      title={f ? `Filière : ${f.name}` : undefined}
    >
      {f ? f.short : "Choisis ta filière"}
    </Link>
  );
}
