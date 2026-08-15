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
import { SPATIAL } from "@/lib/m3-motion";

const W = 520;
const H = 380;

/* ── repère commun ─────────────────────────────────────────────────────── */

function useRepere(xmin: number, xmax: number, ymin: number, ymax: number) {
  const m = { g: 52, d: 20, h: 22, b: 46 };
  const px = (x: number) => m.g + ((x - xmin) / (xmax - xmin)) * (W - m.g - m.d);
  const py = (y: number) => H - m.b - ((y - ymin) / (ymax - ymin)) * (H - m.h - m.b);
  return { px, py, m };
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

/* ── la pente, niveau collège ──────────────────────────────────────────── */

/**
 * Une droite passant par O et un point B que l'élève déplace. Le triangle
 * « on avance de / on monte de » se redessine en direct, et la pente
 * s'écrit comme le quotient des deux — jamais comme une formule tombée du
 * ciel.
 */
export function FigurePente({
  bx: bx0 = 4, by: by0 = 2, onChange, erreur = null, erreurLabel,
}: {
  bx?: number; by?: number; onChange?: (pente: number) => void;
  /** La pente qu'implique la réponse fausse de l'élève. Elle est tracée en
   *  PARTANT de la bonne droite : l'écart se voit se creuser (R3). */
  erreur?: number | null;
  erreurLabel?: string;
}) {
  const [bx, setBx] = useState(bx0);
  const [by, setBy] = useState(by0);
  const { px, py } = useRepere(-0.6, 6, -0.6, 5);
  const pente = by / bx;

  // Le point suit le curseur au ressort : la figure se déforme, elle ne
  // saute pas d'un état à l'autre.
  const ax = useRessort(bx, SPATIAL.standardDefault);
  const ay = useRessort(by, SPATIAL.standardDefault);
  const apente = ay / Math.max(ax, 0.01);

  // La droite fausse part de la bonne et s'en écarte (progression 0 → 1,
  // avec le dépassement M3 : elle va un peu trop loin puis se pose).
  const p = useApparition(erreur ?? "aucune", { ressort: SPATIAL.expressiveDefault });
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

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label={`Droite passant par l'origine et le point B de coordonnées ${bx} et ${by}. On avance de ${bx}, on monte de ${by}, donc la pente vaut ${by} sur ${bx}.`}
        className="block w-full">
        <Grille xmin={-0.6} xmax={6} ymin={-0.6} ymax={5} px={px} py={py} />
        <Axes xmin={-0.6} xmax={6} ymin={-0.6} ymax={5} px={px} py={py}
          gradX={[1, 2, 3, 4, 5]} gradY={[1, 2, 3, 4]} />

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

      {/* Les commandes : l'élève AGIT (R1). Deux curseurs plutôt qu'un
          glisser-déposer libre — au clavier comme au doigt, et on ne perd
          jamais le point hors du cadre. */}
      <div className="mt-5 grid gap-2.5">
        <label className="flex items-center gap-3 text-body text-secondary">
          <span className="w-28 shrink-0 text-primary font-medium">on avance de</span>
          <input type="range" min={1} max={5} step={1} value={bx}
            onChange={(e) => maj(Number(e.target.value), by)}
            aria-label="on avance de" className="flex-1 accent-accent" />
          <span className="w-6 tabular-nums text-primary font-semibold">{bx}</span>
        </label>
        <label className="flex items-center gap-3 text-body text-secondary">
          <span className="w-28 shrink-0 text-primary font-medium">on monte de</span>
          <input type="range" min={0} max={4} step={1} value={by}
            onChange={(e) => maj(bx, Number(e.target.value))}
            aria-label="on monte de" className="flex-1 accent-accent" />
          <span className="w-6 tabular-nums text-primary font-semibold">{by}</span>
        </label>
        <p className={cn("mt-1 text-body-lg text-primary")}>
          pente ={" "}
          <span className="tabular-nums font-semibold text-accent">
            {by} / {bx} = {(by / bx).toFixed(2).replace(".", ",")}
          </span>
        </p>
      </div>
    </figure>
  );
}
