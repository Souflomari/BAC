import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { typeScale, motion } from "./tokens";

/**
 * Merge Tailwind classes safely — deduplicate conflicting utilities.
 *
 * NOT the stock shadcn `twMerge`: the default tailwind-merge config only knows
 * Tailwind's built-in scale names. Every CUSTOM token key in
 * `tailwind.config.ts` must be registered here, or tailwind-merge misclassifies
 * it and SILENTLY DELETES it when a same-prefix class follows in one cn() call.
 *
 * This was audit finding U1 (docs/audits/fable-ui-content-audit.md §1): with
 * the default config, `cn("text-h1", …, "text-primary")`
 * classified `text-h1` as a text COLOR and dropped it — the entire designed
 * type hierarchy rendered at 16px on every page, unnoticed for five audit
 * rounds. The same mechanism hit `font-regular` (misread as a font FAMILY,
 * deleting `font-serif` or itself) and left the custom shadow/duration/ease/
 * max-w keys ungrouped, so conflicting pairs were BOTH kept and stylesheet
 * order — not call order — decided the winner.
 *
 * MAINTENANCE RULE (enforced by `scripts/dom-truth.mjs`): add a custom key to
 * `tailwind.config.ts` → register it in the matching classGroup below in the
 * same commit. The dom-truth battery fails if a registered font-size key does
 * not render at its designed value.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // fontSize — text-<key>, derived from tokens.ts typeScale (the source
      // tailwind.config also consumes) so this list can never drift from it.
      "font-size": [{ text: Object.keys(typeScale) }],
      // textColor — text-<key> COLORS (tailwind.config `textColor`). Distinct
      // group from font-size so cn("text-h1", "text-primary") keeps BOTH.
      "text-color": [{ text: ["primary", "secondary", "tertiary", "on-accent", "border-soft"] }],
      // borderColor — border-<key> (tailwind.config `borderColor`).
      "border-color": [{ border: ["subtle", "soft", "text-secondary"] }],
      // opacity — opacity-disabled (the one state-layer opacity token).
      opacity: [{ opacity: ["disabled"] }],
      // fontWeight — the one non-default key (font-regular)
      "font-weight": [{ font: ["regular"] }],
      // boxShadow — elevation scale (shadow-elevation-<n>). The legacy
      // shadow-subtle/soft aliases were removed in Phase A (dead + off-palette).
      shadow: [{ shadow: [{ elevation: ["0", "1", "2", "3", "4"] }] }],
      // transitionDuration / transitionTimingFunction — derived from tokens.ts
      // motion so these lists can never drift from the config's keys.
      duration: [{ duration: Object.keys(motion.duration) }],
      ease: [{ ease: Object.keys(motion.ease) }],
      // maxWidth — max-w-<key>
      "max-w": [
        {
          "max-w": [
            "reading",
            "content",
            "wide",
            "lead",
            "list",
            "page",
            "notion",
          ],
        },
      ],
      // ringColor — ring-focus
      "ring-color": [{ ring: ["focus"] }],
      // letterSpacing — tracking-eyebrow (Phase A / W3)
      tracking: [{ tracking: ["eyebrow"] }],
      // zIndex — semantic tiers (Phase A / W3)
      z: [{ z: ["raised", "header", "overlay"] }],
      // minHeight / minWidth — touch target (Phase A / W3)
      "min-h": [{ "min-h": ["touch"] }],
      "min-w": [{ "min-w": ["touch"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
