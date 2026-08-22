"use client";

/**
 * CommandPalette — ⌘K, l'accès direct à tout (refonte Studio, R2).
 *
 * Audit Fable §3.8 : « ~60 notions, quatre matières, zéro champ de
 * recherche ». La palette est la réponse SOTA au catalogue : taper trois
 * lettres bat n'importe quelle liste organisée. Elle ne REMPLACE pas le
 * panneau Notions (qui montre la structure du programme) — elle
 * court-circuite pour qui sait déjà ce qu'il cherche.
 *
 * cmdk : la seule bibliothèque ajoutée pour ça (prévue et budgétée au plan
 * REFONTE-STUDIO §R2). Accessible par construction (combobox ARIA,
 * navigation aux flèches), filtrage flou intégré.
 *
 * Cœur calme : elle s'ouvre à la demande (⌘K / Ctrl+K / le bouton du
 * header), jamais seule ; Échap ferme ; aucun état n'est fabriqué.
 */

import { useCallback, useEffect, useState } from "react";
// R4 : le router de next-view-transitions — la navigation depuis la palette
// fond comme celle des liens, même crossfade, même dégradation (Firefox).
import { useTransitionRouter } from "next-view-transitions";
import { Command } from "cmdk";
import { subjectLabel, notionHref, subjectHref } from "@/lib/subjects";
import { Icon } from "./Icon";

export interface NotionPourPalette {
  subject: string;
  slug: string;
  title: string;
  readingMinutes?: number;
}

const ORDRE_MATIERES = ["maths", "pc", "svt", "philo", "si"];

/** Accents pliés, casse pliée — « genetique » trouve « génétique ». */
function normalise(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * Le filtre maison — substring STRICTE, jamais de sauts de lettres.
 *
 * Le scorer flou de cmdk assemble n'importe quelle requête en piochant des
 * lettres éparses ; nos values portent le nom long de la matière
 * (« …Sciences de la Vie et de la Terre »), ce qui suffit à compléter
 * presque tout — sondé : « atelier » classait une notion SVT devant l'Atelier
 * lui-même. Ici : chaque mot de la requête doit apparaître d'un bloc.
 * Prévisible, honnête, insensible aux accents.
 */
function filtreNet(value: string, search: string): number {
  const v = normalise(value);
  const q = normalise(search).trim();
  if (!q) return 1;
  const mots = q.split(/\s+/);
  if (!mots.every((m) => v.includes(m))) return 0;
  const premier = mots[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`^${premier}`).test(v)) return 3; // préfixe
  if (new RegExp(`[\\s-]${premier}`).test(v)) return 2; // début de mot
  return 1; // au milieu d'un mot
}

export function CommandPalette({ notions }: { notions: NotionPourPalette[] }) {
  const [ouverte, setOuverte] = useState(false);
  const router = useTransitionRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOuverte((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Le bouton du header (rendu dans un autre sous-arbre) ouvre la palette
  // par événement — évite de remonter un setState à travers PageShell.
  useEffect(() => {
    const ouvre = () => setOuverte(true);
    window.addEventListener("ouvrir-palette", ouvre);
    return () => window.removeEventListener("ouvrir-palette", ouvre);
  }, []);

  const va = useCallback(
    (href: string) => {
      setOuverte(false);
      router.push(href);
    },
    [router]
  );

  const parMatiere = ORDRE_MATIERES.map((m) => ({
    id: m,
    notions: notions.filter((n) => n.subject === m),
  })).filter((g) => g.notions.length > 0);

  return (
    <Command.Dialog
      open={ouverte}
      onOpenChange={setOuverte}
      label="Rechercher une notion"
      className="palette-commande"
      filter={filtreNet}
    >
      <div className="flex items-center gap-2 border-b border-subtle px-4">
        {/* La loupe, cohérente avec le header — le chevron orphelin lisait
            comme un prompt de terminal égaré (audit R6, P1-5/P2-10). */}
        <Icon name="loupe" size={14} className="shrink-0 text-tertiary" />
        <Command.Input
          placeholder="Chercher une notion, une matière…"
          className="h-12 w-full bg-transparent text-body text-primary placeholder:text-tertiary focus:outline-none"
        />
        <kbd className="rounded border border-subtle bg-surface-container-low px-1.5 py-0.5 font-mono text-caption text-tertiary">
          esc
        </kbd>
      </div>
      <Command.List className="max-h-[420px] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-body-sm text-tertiary">
          Rien ne correspond — essaie un autre mot.
        </Command.Empty>
        {parMatiere.map((g) => (
          <Command.Group key={g.id} heading={subjectLabel(g.id)} className="palette-groupe">
            {/* Pas de pastilles par ligne : l'en-tête de groupe nomme déjà
                la matière — les points étaient un double encodage (audit
                charge-calme P1-8). */}
            <Command.Item
              value={`matiere ${subjectLabel(g.id)}`}
              onSelect={() => va(subjectHref(g.id))}
              className="palette-item"
            >
              <span className="font-medium">Toute la matière</span>
              <span className="ml-auto font-mono text-caption tabular-nums text-tertiary">
                {g.notions.length}
              </span>
            </Command.Item>
            {g.notions.map((n) => (
              <Command.Item
                key={`${n.subject}/${n.slug}`}
                value={`${n.title} ${subjectLabel(n.subject)}`}
                onSelect={() => va(notionHref(n.subject, n.slug))}
                className="palette-item"
              >
                <span className="min-w-0 truncate">{n.title}</span>
                {n.readingMinutes != null && (
                  <span className="ml-auto shrink-0 font-mono text-caption tabular-nums text-tertiary">
                    {n.readingMinutes} min
                  </span>
                )}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
        <Command.Group heading="Aller à" className="palette-groupe">
          <Command.Item value="atelier derivees entrainement interactif" onSelect={() => va("/atelier")} className="palette-item">
            <Icon name="interactive" size={14} className="shrink-0 text-accent" />
            Atelier — les dérivées
          </Command.Item>
          <Command.Item value="accueil session programme" onSelect={() => va("/")} className="palette-item">
            <Icon name="arrow-right" size={14} className="shrink-0 text-tertiary" />
            Accueil
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
