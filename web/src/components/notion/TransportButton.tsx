/**
 * TransportButton — the one shared learner-paced transport control.
 *
 * The "◂ Précédent / Suivant ▸ / Recommencer" step buttons for the figure
 * engines (MotionStage real-motion, MotionDiagram stepped reveal) were two
 * byte-near-identical hand-copied `btnBase` class strings. They now resolve to
 * THIS single source so the transport bar has one feedback vocabulary and one
 * disabled mechanism across both engines (ADR 0024):
 *
 *   - calm SECONDARY resting state (text-secondary), promotes to primary on hover
 *   - the ONE neutral `.state-layer` hover/pressed wash every control shares
 *   - 48×48px touch target (§9), rounded-md (8px) with a matching 8px focus ring
 *   - the single `.state-disabled`-equivalent: one opacity + not-allowed cursor
 *
 * It is a thin <button> wrapper: every native button prop (onClick, disabled,
 * aria-label, aria-describedby, type) forwards through, so each call site keeps
 * its exact semantics — only the styling is centralized.
 */

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const TRANSPORT_BTN_CLASS = cn(
  "inline-flex items-center gap-1.5 px-3 py-2 max-w-full",
  // §9 touch target: 48px
  "min-h-touch min-w-touch rounded-md",
  "text-caption font-medium",
  // Resting: text-secondary (calm, not primary)
  "text-secondary",
  "border border-subtle",
  "bg-surface-raised",
  "hover:text-primary hover:border-soft",
  "transition-colors duration-micro",
  // One interaction-feedback language (ADR 0024): neutral state-layer wash.
  "state-layer",
  // Focus ring matches the rounded-md (8px) host corner (ADR 0024).
  "focus-ring [--focus-radius:8px]",
  // The single disabled mechanism.
  "disabled:opacity-disabled disabled:cursor-not-allowed"
);

export const TransportButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(function TransportButton({ className, type = "button", ...props }, ref) {
  return (
    <button ref={ref} type={type} className={cn(TRANSPORT_BTN_CLASS, className)} {...props} />
  );
});
