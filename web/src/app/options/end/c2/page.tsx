/**
 * OPTION SET C — page end / footer, variant C2: "LESSON HANDOFF + colophon".
 *
 * Philosophy: the END of a lesson page is periphery real estate (bible §8) —
 * before the colophon, the page hands the student their next move ("Continuer :
 * …" / retour aux notions) in a calm end-band. The footer below stays quiet
 * but carries three columns: matières, la méthode (one line of mission), and
 * repères (cadre note, version). More furniture than C1 — the bet is that a
 * 5,000-word lesson deserves a considered landing, not just a hairline.
 *
 * TEMPORARY option route, deleted after the owner's Set-C pick.
 */

import type { Metadata } from "next";
import { Link } from "@/components/ui/Lien";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Option — fin de page C2",
  robots: { index: false, follow: false },
};

const CONTAINER = "w-full mx-auto px-4 bp-medium:px-6 bp-expanded:px-8 max-w-content";

export default function EndC2() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-base">
      <SiteHeader container={CONTAINER} />

      <main className={cn(CONTAINER, "flex-1 py-12 bp-medium:py-16")}>
        <div className="prose-lesson">
          <h2>Fermeture de l’arc</h2>
          <p>
            Tu sais maintenant répondre aux deux questions posées au début :
            l’énergie <strong>traverse</strong> entre condensateur et bobine, et
            c’est <strong>R</strong> qui, cycle après cycle, la dissipe. Rien ne
            s’est perdu — tout s’explique.
          </p>
        </div>

        {/* ── C2 part 1: the lesson-end handoff band ── */}
        <div
          className={cn(
            "mt-16 rounded-xl px-8 py-7",
            "bg-surface-container-high shadow-elevation-2",
            "flex flex-wrap items-center justify-between gap-6"
          )}
        >
          <div>
            <p className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
              Et maintenant
            </p>
            <p className="mt-2 font-display text-h3 font-semibold text-primary">
              Les exercices t’attendent plus bas — ou passe à la suite.
            </p>
          </div>
          <Link href="/" className="btn-primary focus-ring flex-shrink-0">
            Notion suivante
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </main>

      {/* ── C2 part 2: the three-column colophon ── */}
      <footer className="mt-24 border-t border-subtle bg-surface-container-low">
        <div className={cn(CONTAINER, "py-12")}>
          <div className="grid gap-10 bp-medium:grid-cols-3">
            <div>
              <h2 className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
                Matières
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/" className="text-body-sm text-primary hover:text-accent transition-colors duration-micro rounded focus-ring">
                    Physique-Chimie
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-body-sm text-primary hover:text-accent transition-colors duration-micro rounded focus-ring">
                    Mathématiques
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
                La méthode
              </h2>
              <p className="mt-3 text-body-sm text-secondary max-w-[36ch]">
                Un tuteur patient qui décortique chaque notion, montre le
                raisonnement, et te fait monter jusqu’aux vrais sujets du bac.
              </p>
            </div>
            <div>
              <h2 className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
                Repères
              </h2>
              <ul className="mt-3 space-y-2 text-body-sm text-secondary">
                <li>Aligné sur le cadre de référence national</li>
                <li>2ᵉ Bac · filières scientifiques</li>
              </ul>
            </div>
          </div>
          <p className="mt-10 pt-6 border-t border-subtle text-caption text-secondary">
            <span className="font-semibold text-primary">BAC</span>
            <span aria-hidden="true"> · </span>sciences — © 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
