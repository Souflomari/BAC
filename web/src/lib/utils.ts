import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely — deduplicate conflicting utilities.
 *
 * NOT the stock shadcn `twMerge`: the default tailwind-merge config only knows
 * Tailwind's built-in scale names. Every CUSTOM token key in
 * `tailwind.config.ts` must be registered here, or tailwind-merge misclassifies
 * it and SILENTLY DELETES it when a same-prefix class follows in one cn() call.
 *
 * This was audit finding U1 (docs/audits/fable-ui-content-audit.md §1): with
 * the default config, `cn("text-h1", …, "text-[var(--color-text-primary)]")`
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
      // fontSize — tailwind.config.ts `fontSize` (text-<key>)
      "font-size": [
        {
          text: [
            "caption",
            "body-sm",
            "body",
            "body-lg",
            "lead",
            "h4",
            "h3",
            "h2",
            "h1",
            "display",
          ],
        },
      ],
      // fontWeight — the one non-default key (font-regular)
      "font-weight": [{ font: ["regular"] }],
      // boxShadow — elevation scale + legacy aliases (shadow-<key>)
      shadow: [
        {
          shadow: ["subtle", "soft", { elevation: ["0", "1", "2", "3", "4"] }],
        },
      ],
      // transitionDuration — duration-<key>
      duration: [{ duration: ["micro", "standard", "slow"] }],
      // transitionTimingFunction — ease-<key>
      ease: [
        { ease: ["enter", "leave", "between", "emphasized", "standard-svg"] },
      ],
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
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
