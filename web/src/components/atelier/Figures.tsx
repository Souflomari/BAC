"use client";

/**
 * Figures manipulables de l'atelier « dérivées » (NORTH-STAR-V2 §3).
 *
 * Règle R5 : la figure porte l'idée, la prose ne fait que légender. On
 * teste chaque figure en se demandant « si je la retire, l'écran devient-il
 * incompréhensible ? » — si la réponse est non, c'est du manuel déguisé.
 *
 * FigurePente — la pente comme « on monte de, on avance de ». Niveau
 * collège, le socle que personne ne revoit.
 *
 * Le mouvement n'est pas décoratif. Deux gestes seulement, et chacun dit
 * quelque chose :
 *   · le point B et son triangle SUIVENT le curseur avec un ressort M3, au
 *     lieu de sauter — on voit la figure se déformer, donc on voit que la
 *     pente est une déformation continue et non une suite d'images ;
 *   · la droite d'une réponse fausse PART de la bonne droite et s'en
 *     écarte sous les yeux de l'élève (R3). L'écart n'est pas décrit, il
 *     est parcouru.
 *
 * (L'ancienne `FigureSecante` faite main a été retirée : elle a été
 * remplacée par `FigureSecanteMafs`, et garder deux versions de la même
 * figure dont une inatteignable est exactement le genre d'état malhonnête
 * que le projet s'interdit.)
 */

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRessort } from "./useRessort";
import { useApparition } from "./Apparition";
import { useLargeurConteneur, hauteurScene } from "./useLargeurConteneur";
import { SPATIAL } from "@/lib/m3-motion";

/* ── le repère ─────────────────────────────────────────────────────────── */

/**
 * DEUX DÉFAUTS RÉGLÉS ENSEMBLE (2026-08-17), tous deux révélés en élargissant
 * le panneau.
 *
 * 1. LES UNITÉS N'ÉTAIENT PAS CARRÉES. Le viewBox était figé à 520×380 pour
 *    une plage de 6,6 × 5,6 unités : 67,9 px par unité en x, 55,7 en y. Une
 *    pente de 1 était donc dessinée à 39,4° au lieu de 45°. Sur une figure
 *    dont le sujet EST la pente, c'est la figure qui ment sur ce qu'elle
 *    enseigne — le défaut le plus grave qu'on puisse avoir ici, et il a
 *    survécu à tous les audits parce qu'à 520 px personne ne mesure l'angle.
 *
 * 2. LE TEXTE SE MISE À L'ÉCHELLE AVEC LE CADRE. Un viewBox fixe rendu à
 *    1200 px multiplie chaque glyphe par 2,3 : les étiquettes devenaient
 *    énormes. C'est le §3.15 de l'audit Fable, vu en grand.
 *
 * La correction est la même pour les deux : le viewBox vaut exactement la
 * taille rendue (1 unité SVG = 1 pixel écran), donc le texte garde sa taille
 * en points, et l'étendue en x se DÉDUIT de la place disponible à partir
 * d'une unité commune aux deux axes. Un panneau plus large montre plus de
 * repère, pas une figure grossie.
 */
const MARGES = { g: 52, d: 24, h: 24, b: 48 };
/** Plage verticale montrée, en unités mathématiques. Fixe : c'est elle qui
 *  fixe l'échelle, la largeur suit. */
const Y_MIN = -0.6;
const Y_MAX = 5;

function repereCarre(W: number, H: number) {
  const m = MARGES;
  const utile = { w: Math.max(10, W - m.g - m.d), h: Math.max(10, H - m.h - m.b) };
  // L'unité est commune aux deux axes — c'est toute l'affaire.
  const u = utile.h / (Y_MAX - Y_MIN);
  const xSpan = utile.w / u;
  // On centre la zone utile (-0,6 → 6) quand le panneau offre plus large.
  const xMin = Y_MIN - Math.max(0, (xSpan - 6.6) / 2);
  const xMax = xMin + xSpan;
  const px = (x: number) => m.g + (x - xMin) * u;
  const py = (y: number) => H - m.b - (y - Y_MIN) * u;
  return { px, py, xMin, xMax, u };
}

function Grille({
  xmin, xmax, ymin, ymax, px, py, pas = 1,
}: {
  xmin: number; xmax: number; ymin: number; ymax: number;
  px: (x: number) => number; py: (y: number) => number; pas?: number;
}) {
  const lignes = [];
  for (let x = Math.ceil(xmin); x <= xmax; x += pas) {
    lignes.push(
      <line key={`v${x}`} x1={px(x)} y1={py(ymin)} x2={px(x)} y2={py(ymax)}
        stroke="var(--figure-grid)" strokeWidth={1} />
    );
  }
  for (let y = Math.ceil(ymin); y <= ymax; y += pas) {
    lignes.push(
      <line key={`h${y}`} x1={px(xmin)} y1={py(y)} x2={px(xmax)} y2={py(y)}
        stroke="var(--figure-grid)" strokeWidth={1} />
    );
  }
  return <g>{lignes}</g>;
}

function Axes({
  xmin, xmax, ymin, ymax, px, py, gradX = [], gradY = [],
}: {
  xmin: number; xmax: number; ymin: number; ymax: number;
  px: (x: number) => number; py: (y: number) => number;
  gradX?: number[]; gradY?: number[];
}) {
  return (
    <g>
      <line x1={px(xmin)} y1={py(0)} x2={px(xmax)} y2={py(0)}
        stroke="var(--figure-ink-soft)" strokeWidth={1.6} />
      <line x1={px(0)} y1={py(ymin)} x2={px(0)} y2={py(ymax)}
        stroke="var(--figure-ink-soft)" strokeWidth={1.6} />
      {gradX.map((x) => (
        <g key={`gx${x}`}>
          <line x1={px(x)} y1={py(0) - 4} x2={px(x)} y2={py(0) + 4}
            stroke="var(--figure-ink-soft)" strokeWidth={1.4} />
          <text x={px(x)} y={py(0) + 21} fontSize={14} textAnchor="middle"
            fill="var(--figure-ink-soft)">{x}</text>
        </g>
      ))}
      {gradY.map((y) => (
        <g key={`gy${y}`}>
          <line x1={px(0) - 4} y1={py(y)} x2={px(0) + 4} y2={py(y)}
            stroke="var(--figure-ink-soft)" strokeWidth={1.4} />
          <text x={px(0) - 10} y={py(y) + 5} fontSize={14} textAnchor="end"
            fill="var(--figure-ink-soft)">{y}</text>
        </g>
      ))}
    </g>
  );
}

/* ── Stepper — le contrôle du dock (refonte Studio R3) ─────────────────── */

/**
 * −/+ à pas de 1, readout mono au centre, cible tactile pleine (48 px,
 * bible §9). Remplace les curseurs natifs nus (« piste de 4 px, poignée de
 * 14, pas de valeur au drag » — critique externe §3.9) : chaque pression
 * est UN cran, la valeur est écrite en mono à côté du geste.
 */
function Stepper({
  label,
  valeur,
  min,
  max,
  onChange,
  teinte,
  desactive = false,
}: {
  label: string;
  valeur: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  teinte: string;
  desactive?: boolean;
}) {
  const bouton = cn(
    "flex min-h-touch min-w-touch items-center justify-center select-none",
    "text-h4 font-medium text-secondary hover:text-primary",
    "state-layer focus-ring [--focus-radius:8px]",
    "disabled:opacity-35 disabled:pointer-events-none",
    "transition-colors duration-micro ease-enter active:scale-95"
  );
  return (
    <div
      className={cn(
        "flex items-center overflow-hidden rounded-lg border border-subtle bg-surface-raised",
        desactive && "opacity-60"
      )}
    >
      <button type="button" onClick={() => onChange(Math.max(min, valeur - 1))}
        disabled={desactive || valeur <= min} aria-label={`${label} : diminuer`} className={bouton}>
        −
      </button>
      <div className="flex min-w-[7rem] flex-col items-center border-x border-subtle px-3 py-1">
        <span className="text-caption font-medium" style={{ color: teinte }}>
          {label}
        </span>
        <span className="font-mono text-body-lg font-semibold tabular-nums text-primary">
          {valeur}
        </span>
      </div>
      <button type="button" onClick={() => onChange(Math.min(max, valeur + 1))}
        disabled={desactive || valeur >= max} aria-label={`${label} : augmenter`} className={bouton}>
        +
      </button>
    </div>
  );
}

/* ── la pente, niveau collège ──────────────────────────────────────────── */

/**
 * Une droite passant par O et un point B que l'élève déplace. Le triangle
 * « on avance de / on monte de » se redessine en direct, et la pente
 * s'écrit comme le quotient des deux — jamais comme une formule tombée du
 * ciel.
 */
export function FigurePente({
  bx: bx0 = 4, by: by0 = 2, onChange, erreur = null, erreurLabel, fige = false,
}: {
  bx?: number; by?: number; onChange?: (pente: number) => void;
  /**
   * Commandes verrouillées. Sur un écran dont l'énoncé cite « on avance de 4,
   * on monte de 2 », les curseurs actifs laissaient l'élève déplacer B sous
   * un énoncé figé : la figure affichait alors 4/2 = 2,00 pendant que la
   * validation continuait de tenir 0,5 pour la bonne réponse et que l'encart
   * final affirmait « ici 2 ÷ 4 = 0,5 ». On enseignait un résultat faux avec
   * l'autorité d'une bonne réponse (audit 2026-08-15, P0-4).
   */
  fige?: boolean;
  /** La pente qu'implique la réponse fausse de l'élève. Elle est tracée en
   *  PARTANT de la bonne droite : l'écart se voit se creuser (R3). */
  erreur?: number | null;
  erreurLabel?: string;
}) {
  const [bx, setBx] = useState(bx0);
  const [by, setBy] = useState(by0);
  // La figure épouse SON panneau : viewBox = taille rendue, unités carrées.
  const { ref: cadre, largeur } = useLargeurConteneur<HTMLElement>();
  const W = Math.max(320, Math.round(largeur) || 520);
  const H = hauteurScene(W);
  const { px, py, xMin, xMax } = repereCarre(W, H);
  const pente = by / bx;

  // Le point suit le curseur au ressort : la figure se déforme, elle ne
  // saute pas d'un état à l'autre.
  const ax = useRessort(bx, SPATIAL.standardDefault);
  const ay = useRessort(by, SPATIAL.standardDefault);
  const apente = ay / Math.max(ax, 0.01);

  // La droite fausse part de la bonne et s'en écarte. Ressort STANDARD, pas
  // expressif : avec l'amortissement expressif (0,8) la droite dépasse la
  // pente affirmée de ~1,5 % avant de revenir — elle montre donc, une
  // fraction de seconde, une pente qui n'est pas la réponse de l'élève. Le
  // dépassement est aussi interdit par la bible §5. Les deux raisons vont
  // dans le même sens.
  const p = useApparition(erreur ?? "aucune", { ressort: SPATIAL.standardDefault });
  const penteFausse = erreur == null ? pente : pente + (erreur - pente) * p;

  function maj(nx: number, ny: number) {
    const cx = Math.min(5, Math.max(1, Math.round(nx)));
    const cy = Math.min(4, Math.max(0, Math.round(ny)));
    setBx(cx); setBy(cy); onChange?.(cy / cx);
  }

  /** Bout de la demi-droite de pente m, coupée au bord du cadre. */
  function bout(m: number, xmax = 5.8, ymax = 4.6) {
    if (m <= 0) return { x: xmax, y: 0 };
    const x = Math.min(xmax, ymax / m);
    return { x, y: m * x };
  }
  const bJuste = bout(apente);
  const bFausse = bout(penteFausse);
  // Une droite raide sort par le HAUT du cadre : son étiquette doit alors
  // partir vers la droite, sinon elle recule sur l'axe des ordonnées et le
  // chevauche. (Défaut vu à l'audit visuel : « ta réponse : 8 » à cheval
  // sur l'axe.)
  const fausseSortParLeHaut = bFausse.x < 5.79;
  // Les graduations suivent la plage réellement affichée : un panneau large
  // en montre plus, au lieu de laisser du repère nu.
  const gradX: number[] = [];
  for (let k = Math.ceil(xMin); k <= Math.floor(xMax); k++) if (k !== 0) gradX.push(k);

  return (
    <figure className="m-0" ref={cadre}>
      <div className="fond-points px-2 pt-2">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img"
        aria-label={`Droite passant par l'origine et le point B de coordonnées ${bx} et ${by}. On avance de ${bx}, on monte de ${by}, donc la pente vaut ${by} sur ${bx}.`}
        className="block w-full">
        <Grille xmin={xMin} xmax={xMax} ymin={-0.6} ymax={5} px={px} py={py} />
        <Axes xmin={xMin} xmax={xMax} ymin={-0.6} ymax={5} px={px} py={py}
          gradX={gradX} gradY={[1, 2, 3, 4]} />

        {/* le triangle avance / monte */}
        <line x1={px(0)} y1={py(0)} x2={px(ax)} y2={py(0)}
          stroke="var(--figure-energy-C)" strokeWidth={3} strokeLinecap="round" />
        <line x1={px(ax)} y1={py(0)} x2={px(ax)} y2={py(ay)}
          stroke="var(--figure-regime-pseudo)" strokeWidth={3} strokeLinecap="round" />
        <text x={px(ax / 2)} y={py(0) + 38} fontSize={16} textAnchor="middle"
          fontWeight={600} fill="var(--figure-energy-C)">on avance de {bx}</text>
        <text x={px(ax) + 12} y={py(ay / 2)} fontSize={16} fontWeight={600}
          fill="var(--figure-regime-pseudo)">on monte de {by}</text>

        {/* la droite juste */}
        <line x1={px(0)} y1={py(0)} x2={px(bJuste.x)} y2={py(bJuste.y)}
          stroke="var(--figure-accent)" strokeWidth={3} strokeLinecap="round" />

        {/* la droite que DONNERAIT la réponse de l'élève. On ne lui dit pas
            qu'il a tort : sa pente s'écarte de la bonne, et l'écart se voit
            se creuser. */}
        {erreur != null && (
          <g className="erreur-tracee">
            <line x1={px(0)} y1={py(0)} x2={px(bFausse.x)} y2={py(bFausse.y)}
              stroke="var(--figure-regime-aperiodic)" strokeWidth={3}
              strokeDasharray="8 6" strokeLinecap="round" />
            <text
              x={px(bFausse.x) + (fausseSortParLeHaut ? 12 : -8)}
              y={py(bFausse.y) + (fausseSortParLeHaut ? 22 : -12)}
              fontSize={16} fontWeight={700}
              textAnchor={fausseSortParLeHaut ? "start" : "end"}
              fill="var(--figure-regime-aperiodic)">
              {erreurLabel ?? `ta pente : ${erreur}`}
            </text>
          </g>
        )}

        <circle cx={px(0)} cy={py(0)} r={4.5} fill="var(--figure-ink)" />
        <g>
          <circle cx={px(ax)} cy={py(ay)} r={10} fill="var(--figure-accent)" />
          {/* Sur une droite raide, l'étiquette posée en haut à droite tombe
              SUR la droite elle-même (défaut vu à l'audit, pente 2). On la
              passe alors à gauche, du côté vide. */}
          <text
            x={px(ax) + (apente > 1.2 ? -15 : 15)}
            y={py(ay) - 12}
            fontSize={17} fontWeight={700}
            textAnchor={apente > 1.2 ? "end" : "start"}
            fill="var(--figure-accent)">B</text>
        </g>
      </svg>

      </div>

      {/* LE DOCK (refonte Studio R3) : steppers −/+ readout mono + la
          formule en pilule — le calcul que l'élève fabrique, écrit en
          entier, dans la langue du collège. Sur un écran figé la figure
          ILLUSTRE l'énoncé : steppers gelés, pas cachés — l'élève voit
          d'où viennent les deux nombres dont on lui parle. */}
      <div className="flex flex-wrap items-stretch gap-2 border-t border-subtle bg-surface-container-low px-3 py-3 bp-medium:px-4">
        <Stepper label="on avance de" valeur={bx} min={1} max={5} desactive={fige}
          onChange={(v) => maj(v, by)} teinte="var(--figure-energy-C)" />
        <Stepper label="on monte de" valeur={by} min={0} max={4} desactive={fige}
          onChange={(v) => maj(bx, v)} teinte="var(--figure-regime-pseudo)" />
        <output
          aria-live="polite"
          className="ml-auto flex min-w-[9rem] flex-col justify-center rounded-lg border border-subtle bg-accent-subtle px-3 py-1 text-right"
        >
          <span className="text-caption font-medium uppercase tracking-eyebrow text-secondary">
            pente
          </span>
          <span className="font-mono text-body-lg font-semibold tabular-nums text-accent">
            {by} / {bx} = {(by / bx).toFixed(2).replace(".", ",")}
          </span>
        </output>
      </div>
    </figure>
  );
}
