"use client";

/**
 * Le plateau : la scène COLLANTE et ses états.
 *
 * Collante à toutes les largeurs : quand les réglages s'allongent (un pari,
 * son retour, le temps, le contrôle, les lectures), l'image qu'on change
 * reste sous les yeux. Au téléphone, sous le header (56 px) et en 4:3 pour
 * laisser ~400 px aux réglages qui défilent dessous ; en carré sur grand
 * écran, où la caméra cadre une sphère.
 *
 * Le fond du conteneur EST la surface des figures (pas de saut de ton entre
 * le chargement et la première image) ; élévation 1, comme les figures figées.
 */
import type React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import type { EtatPanneau } from "./commun";

export function Plateau({
  hoteRef,
  canvasRef,
  panneau,
  description,
  glisser,
  legende,
  messageSansWebgl,
  onRelancer,
  vues,
  format = "carre",
  children,
}: {
  hoteRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  panneau: EtatPanneau;
  /** ce que le lecteur d'écran entend : la scène décrite en mots */
  description: string;
  /** le glisser-pour-tourner d'une scène 3D ; absent pour une scène plane (la cuve) */
  glisser?: {
    onPointerDown: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerMove: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerUp: React.PointerEventHandler<HTMLCanvasElement>;
    onPointerCancel: React.PointerEventHandler<HTMLCanvasElement>;
  };
  /** l'étiquette posée en haut à gauche de la scène (référentiel, mode…) */
  legende?: React.ReactNode;
  /** sans WebGL : ce qui reste, et où trouver la figure figée */
  messageSansWebgl: string;
  onRelancer: () => void;
  /** les vues (grand écran), sous la scène */
  vues?: React.ReactNode;
  /**
   * « carre » : 4:3 au téléphone, carré sur grand écran (une caméra qui cadre
   * une sphère) ; « paysage » : 3:2 partout (la cuve à ondes, 24 × 16 cm, vue
   * de dessus — un carré y perdrait un tiers de l'écran) ; « paysage-haut » :
   * 3:2 sur grand écran, 4:3 au téléphone (la corde : la corde ET un film
   * empilés — à 3:2 et 390 px, le film n'avait plus que 46 px).
   */
  format?: "carre" | "paysage" | "paysage-haut";
  /** les étiquettes HTML posées sur la scène (N, P, H…) */
  children?: React.ReactNode;
}) {
  return (
    <div className="sticky top-14 z-10 bp-expanded:top-20 bp-expanded:self-start">
      <div
        ref={hoteRef}
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          "bg-figure-surface shadow-elevation-1",
          format === "paysage" ? "aspect-[3/2]" : format === "paysage-haut" ? "aspect-[4/3] bp-expanded:aspect-[3/2]" : "aspect-[4/3] bp-expanded:aspect-square"
        )}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={description}
          className={cn("absolute inset-0 h-full w-full", glisser && "cursor-grab active:cursor-grabbing")}
          style={{ touchAction: "pan-y" }}
          {...(glisser ?? {})}
        />
        {children}
        {/* une pastille de surface : sur la cuve, la légende tombe sur les rides */}
        {legende && <p className="pointer-events-none absolute left-2 top-1.5 rounded-sm bg-figure-surface px-1 text-caption text-secondary" data-legende>{legende}</p>}

        {panneau === "chargement" && (
          <div className="absolute inset-0 flex items-center justify-center bg-figure-surface">
            <p className="text-caption text-secondary">Chargement de la scène…</p>
          </div>
        )}
        {(panneau === "sans-webgl" || panneau === "erreur") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-figure-surface px-6 text-center">
            <p className="text-body-sm text-secondary max-w-[44ch]">
              {panneau === "sans-webgl" ? messageSansWebgl : "La scène 3D s’est interrompue."}
            </p>
            {panneau === "erreur" && (
              <button type="button" className={TRANSPORT_BTN_CLASS} onClick={onRelancer}>
                <Icon name="reset" size={13} />
                Relancer la scène
              </button>
            )}
          </div>
        )}
      </div>
      {vues && <div className="mt-3">{vues}</div>}
    </div>
  );
}

/**
 * Une étiquette HTML posée sur la scène, placée par le rendu à chaque image.
 * `texte` pour une lettre (N, P, S…) ; `children` pour une notation qui passe
 * par KaTeX (un vecteur, $\vec F$) — la même écriture que la leçon.
 */
export function Etiquette({
  refEl,
  texte,
  nom,
  fond,
  children,
}: {
  refEl: React.RefObject<HTMLSpanElement>;
  texte?: string;
  /** un nom stable pour les portes, qui lisent l'étiquette sans deviner son rendu KaTeX */
  nom?: string;
  /** une pastille de surface sous le texte — quand la scène peint jusque sous l'étiquette (la cuve) */
  fond?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <span
      ref={refEl}
      data-etiquette={nom ?? texte}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-0 top-0 whitespace-nowrap text-caption font-semibold text-primary",
        // une pastille : un peu d'air vertical, et une graisse moyenne — la pastille assure déjà le contraste
        fond && "rounded-sm bg-figure-surface px-1.5 py-0.5 font-medium"
      )}
      style={{ visibility: "hidden" }}
    >
      {children ?? texte}
    </span>
  );
}

/** Pose une étiquette sur sa projection (pixels CSS du canvas). */
export function poser(el: HTMLSpanElement | null, p: { x: number; y: number; visible: boolean }, decalageY = "-50%", decalageX = "-50%") {
  if (!el) return;
  el.style.transform = `translate(${p.x}px, ${p.y}px) translate(${decalageX}, ${decalageY})`;
  el.style.visibility = p.visible ? "visible" : "hidden";
}

type Point2 = { x: number; y: number };
export type Boite = { x0: number; y0: number; x1: number; y1: number };

/** La boîte de la légende du plateau, en pixels de la scène (null : pas de légende). */
export function boiteLegende(hote: HTMLElement | null): Boite | null {
  const l = hote?.querySelector<HTMLElement>("[data-legende]");
  if (!l) return null;
  return { x0: l.offsetLeft, y0: l.offsetTop, x1: l.offsetLeft + l.offsetWidth, y1: l.offsetTop + l.offsetHeight };
}

/** Le segment [a, b] traverse-t-il la boîte ? (découpage de Liang–Barsky) */
function traverse(a: Point2, b: Point2, r: Boite): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const p = [-dx, dx, -dy, dy];
  const q = [a.x - r.x0, r.x1 - a.x, a.y - r.y0, r.y1 - a.y];
  for (let i = 0; i < 4; i++) {
    if (p[i] === 0) {
      if (q[i] < 0) return false;
    } else {
      const t = q[i] / p[i];
      if (p[i] < 0) {
        if (t > t1) return false;
        if (t > t0) t0 = t;
      } else {
        if (t < t0) return false;
        if (t < t1) t1 = t;
      }
    }
  }
  return true;
}

const chevauche = (a: Boite, b: Boite) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;

/** Les directions essayées autour de l'ancre, dans cet ordre de préférence. */
const DIRECTIONS: readonly (readonly [number, number])[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [0.5, -1],
  [-0.5, -1],
  [0.5, 1],
  [-0.5, 1],
];
/** Les distances (px) entre l'ancre et le bord le plus proche de l'étiquette. */
const DISTANCES = [0, 8, 18, 32, 50, 75, 105, 140];

/**
 * Pose des étiquettes de TEXTE autour de leur ancre sans qu'elles se
 * chevauchent, sans qu'un trait de la scène les barre, et dans le cadre.
 *
 * Né des captures du manège (2026-09-24) : vue du dessus — la vue même que le
 * retour du pari demande —, « 245 N » et « dans le plan de rotation : 0 N »
 * tombaient sur le même point ; vue de côté, « 245 N » était barré par sa
 * propre flèche. `poser` centre une étiquette SUR son ancre ; une ancre posée
 * sur un trait donne une étiquette barrée.
 *
 * Pour chaque étiquette, dans l'ordre donné (la première est prioritaire), on
 * essaie son ancre si `surAncre` (une ancre déjà décalée de la géométrie),
 * puis douze directions à huit distances, et l'on garde la place au COÛT le
 * plus bas : hors du cadre ≫ sur une étiquette déjà posée ≫ barrée par un
 * trait ≫ loin de l'ancre. Une première version gardait la première place
 * parfaite, sinon la première qui ne chevauchait rien — la porte l'a prise en
 * défaut deux fois sur quatre-vingt-dix mesures (une étiquette barrée par le
 * rayon peint, une autre hors du cadre) : quand rien n'est parfait, c'est la
 * moins mauvaise qu'il faut, pas la première.
 *
 * Les REPÈRES sans texte ne passent jamais par ici : la porte les lit à leur
 * point exact. Toutes les tailles sont lues AVANT toute écriture (une seule
 * mise en page par image).
 */
export function disposer(
  etiquettes: {
    el: HTMLSpanElement | null;
    p: { x: number; y: number; visible: boolean };
    surAncre?: boolean;
    directions?: readonly (readonly [number, number])[];
  }[],
  segments: readonly (readonly [Point2, Point2])[],
  cadre: { largeur: number; hauteur: number },
  /**
   * Des boîtes déjà OCCUPÉES, que les étiquettes évitent comme elles s'évitent
   * entre elles : la légende du plateau (une pastille opaque — à l'étape 4 de
   * la corde, elle recouvrait « S » et « M »), un anneau dessiné…
   */
  obstacles: readonly Boite[] = []
) {
  const tailles = etiquettes.map(({ el, p }) => (el && p.visible ? { w: el.offsetWidth, h: el.offsetHeight } : null));
  const posees: Boite[] = [...obstacles];
  const places: (Point2 | null)[] = etiquettes.map(({ p, surAncre, directions }, i) => {
    const t = tailles[i];
    if (!t) return null;
    const boite = (c: Point2): Boite => ({ x0: c.x - t.w / 2 - 2, y0: c.y - t.h / 2 - 2, x1: c.x + t.w / 2 + 2, y1: c.y + t.h / 2 + 2 });
    const cout = (c: Point2, rang: number, g: number) => {
      const b = boite(c);
      const deborde = Math.max(0, -b.x0) + Math.max(0, -b.y0) + Math.max(0, b.x1 - cadre.largeur) + Math.max(0, b.y1 - cadre.hauteur);
      let n = (deborde > 0 ? 100000 + deborde : 0) + g + rang * 0.01;
      for (const o of posees) if (chevauche(o, b)) n += 10000;
      for (const [a, z] of segments) if (traverse(a, z, b)) n += 1000;
      return n;
    };
    let meilleur: Point2 = { x: p.x, y: p.y };
    let meilleurCout = surAncre ? cout(meilleur, 0, 0) : Infinity;
    const dirs = directions ?? DIRECTIONS;
    DISTANCES.forEach((g) =>
      dirs.forEach(([dx, dy], rang) => {
        const c = { x: p.x + dx * (t.w / 2 + 5 + g), y: p.y + dy * (t.h / 2 + 3 + g) };
        const k = cout(c, rang, g);
        if (k < meilleurCout) {
          meilleurCout = k;
          meilleur = c;
        }
      })
    );
    posees.push(boite(meilleur));
    return meilleur;
  });
  etiquettes.forEach(({ el }, i) => {
    if (!el) return;
    const c = places[i];
    if (!c) {
      el.style.visibility = "hidden";
      return;
    }
    el.style.transform = `translate(${c.x}px, ${c.y}px) translate(-50%, -50%)`;
    el.style.visibility = "visible";
  });
}
