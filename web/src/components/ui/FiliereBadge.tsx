/**
 * FiliereBadge — the header's quiet filière affordance (Day-9 site skeleton).
 *
 * Shows the chosen stream as a small chip. Craft addition (dropdown pass):
 * the chip now opens a quick-switch menu — pick another filière and
 * `useFiliere`'s `setFiliere` applies it INSTANTLY (no navigation); every
 * consumer of `useFiliere()` elsewhere (dashboard, matières list) re-renders
 * on its own, since the preference lives in that one hook. The full
 * onboarding flow (/commencer) stays one item away for a first-time choice
 * or a from-scratch browse of all four filières.
 *
 * Client-only (reads the persisted preference); renders nothing until
 * mounted so the server and first client paint agree (no hydration flash).
 * Periphery, quiet — the header stays minimal (§0).
 */

"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { getFiliere, FILIERES } from "@/lib/curriculum";
import { useFiliere } from "@/lib/useFiliere";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Icon } from "./Icon";

export function FiliereBadge() {
  const { filiere, setFiliere, mounted } = useFiliere();
  if (!mounted) return null;

  const f = getFiliere(filiere);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1",
            "text-body-sm font-medium",
            "state-layer focus-ring [--focus-radius:9999px]",
            "transition-colors duration-micro ease-enter",
            f
              ? "bg-accent-subtle text-accent"
              : "border border-subtle text-secondary hover:text-primary"
          )}
          title={f ? `Filière : ${f.name}` : undefined}
        >
          {f ? f.short : frenchTypography("Choisis ta filière")}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="end"
          className={cn(
            "z-50 min-w-[240px] rounded-xl p-1.5",
            "border border-subtle bg-surface-raised",
            "shadow-elevation-2",
            // Calm opacity/scale settle — no bounce/overshoot (§5). Plain CSS
            // transition (no framer-motion/GSAP) keyed to Radix's data-state.
            "transition-[opacity,transform] duration-micro ease-enter",
            "data-[state=open]:opacity-100 data-[state=closed]:opacity-0",
            "data-[state=open]:scale-100 data-[state=closed]:scale-95"
          )}
        >
          {FILIERES.map((fil) => {
            const active = fil.id === filiere;
            return (
              <DropdownMenu.Item
                key={fil.id}
                onSelect={() => setFiliere(fil.id)}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-md px-2.5 py-2",
                  "state-layer focus-ring [--focus-radius:6px]",
                  "transition-colors duration-micro ease-between",
                  active
                    ? "bg-accent-subtle text-accent"
                    : "text-secondary hover:text-primary"
                )}
              >
                <span className="flex flex-col">
                  <span className="text-body-sm font-medium">{fil.name}</span>
                  <span className="text-caption text-tertiary">
                    {fil.short}
                  </span>
                </span>
                {active ? (
                  <Icon name="check" size={16} className="text-accent flex-shrink-0" />
                ) : null}
              </DropdownMenu.Item>
            );
          })}

          <div className="my-1 border-t border-subtle" />

          <DropdownMenu.Item asChild>
            <Link
              href="/commencer"
              className={cn(
                "block rounded-md px-2.5 py-2",
                "state-layer focus-ring [--focus-radius:6px]",
                "text-body-sm text-secondary hover:text-primary",
                "transition-colors duration-micro ease-between"
              )}
            >
              {frenchTypography("Voir toutes les filières")}
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
