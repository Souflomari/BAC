"use client";

/**
 * Figures manipulables de l'atelier « dérivées » (NORTH-STAR-V2 §3).
 *
 * Règle R5 : la figure porte l'idée, la prose ne fait que légender. On
 * teste chaque figure en se demandant « si je la retire, l'écran devient-il
 * incompréhensible ? » — si la réponse est non, c'est du manuel déguisé.
 *
 * Deux figures, deux moments du raisonnement :
 *   · FigurePente     — la pente comme « on monte de, on avance de ».
 *                       Niveau collège, le socle que personne ne revoit.
 *   · FigureSecante   — LE moment : B glisse vers A, la sécante devient la
 *                       tangente, et la pente calculée converge sous les
 *                       yeux de l'élève. C'est la dérivée, vue et non dite.
 */

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

const W = 460;
const H = 340;

/* ── repère commun ─────────────────────────────────────────────────────── */

function useRepere(xmin: number, xmax: number, ymin: number, ymax: number) {
  const m = { g: 46, d: 16, h: 18, b: 40 };
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
          <text x={px(x)} y={py(0) + 19} fontSize={13} textAnchor="middle"
            fill="var(--figure-ink-soft)">{x}</text>
        </g>
      ))}
      {gradY.map((y) => (
        <g key={`gy${y}`}>
          <line x1={px(0) - 4} y1={py(y)} x2={px(0) + 4} y2={py(y)}
            stroke="var(--figure-ink-soft)" strokeWidth={1.4} />
          <text x={px(0) - 9} y={py(y) + 4} fontSize={13} textAnchor="end"
            fill="var(--figure-ink-soft)">{y}</text>
        </g>
      ))}
    </g>
  );
}

/* ── 1. la pente, niveau collège ───────────────────────────────────────── */

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
  /** La pente qu'implique la réponse fausse de l'élève. Dessinée À CÔTÉ de
   *  la bonne : c'est la figure qui montre l'écart, pas un paragraphe. */
  erreur?: number | null;
  erreurLabel?: string;
}) {
  const [bx, setBx] = useState(bx0);
  const [by, setBy] = useState(by0);
  const { px, py } = useRepere(-0.6, 6, -0.6, 5);
  const id = useId();
  const pente = by / bx;

  function maj(nx: number, ny: number) {
    const cx = Math.min(5, Math.max(1, Math.round(nx)));
    const cy = Math.min(4, Math.max(0, Math.round(ny)));
    setBx(cx); setBy(cy); onChange?.(cy / cx);
  }

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label={`Droite passant par l'origine et le point B de coordonnées ${bx} et ${by}. On avance de ${bx}, on monte de ${by}, donc la pente vaut ${by} sur ${bx}.`}
        className="rounded-lg bg-surface-raised">
        <Grille xmin={-0.6} xmax={6} ymin={-0.6} ymax={5} px={px} py={py} />
        <Axes xmin={-0.6} xmax={6} ymin={-0.6} ymax={5} px={px} py={py}
          gradX={[1, 2, 3, 4, 5]} gradY={[1, 2, 3, 4]} />

        {/* le triangle avance / monte */}
        <line x1={px(0)} y1={py(0)} x2={px(bx)} y2={py(0)}
          stroke="var(--figure-energy-C)" strokeWidth={2.4} />
        <line x1={px(bx)} y1={py(0)} x2={px(bx)} y2={py(by)}
          stroke="var(--figure-regime-pseudo)" strokeWidth={2.4} />
        <text x={px(bx / 2)} y={py(0) + 32} fontSize={14} textAnchor="middle"
          fontWeight={600} fill="var(--figure-energy-C)">on avance de {bx}</text>
        <text x={px(bx) + 10} y={py(by / 2)} fontSize={14} fontWeight={600}
          fill="var(--figure-regime-pseudo)">on monte de {by}</text>

        {/* la droite juste */}
        <line x1={px(0)} y1={py(0)} x2={px(5.8)} y2={py(pente * 5.8)}
          stroke="var(--figure-accent)" strokeWidth={2.6} strokeLinecap="round" />

        {/* la droite que DONNERAIT la réponse de l'élève. On ne lui dit pas
            qu'il a tort : on trace sa pente, et l'écart se voit. */}
        {erreur != null && (
          <g className="erreur-tracee">
            <line x1={px(0)} y1={py(0)}
              x2={px(Math.min(5.8, 4.6 / Math.max(erreur, 0.01)))}
              y2={py(Math.min(4.6, erreur * 5.8))}
              stroke="var(--figure-regime-aperiodic)" strokeWidth={2.6}
              strokeDasharray="7 5" strokeLinecap="round" />
            <text
              x={px(Math.min(5.4, 4.2 / Math.max(erreur, 0.01)))}
              y={py(Math.min(4.4, erreur * 5.4)) - 8}
              fontSize={14} fontWeight={700} textAnchor="end"
              fill="var(--figure-regime-aperiodic)">
              {erreurLabel ?? `ta pente : ${erreur}`}
            </text>
          </g>
        )}

        <circle cx={px(0)} cy={py(0)} r={4} fill="var(--figure-ink)" />
        {/* B — déplaçable au clavier ET à la souris */}
        <g>
          <circle cx={px(bx)} cy={py(by)} r={9} fill="var(--figure-accent)"
            className="cursor-grab" />
          <text x={px(bx) + 13} y={py(by) - 11} fontSize={15} fontWeight={700}
            fill="var(--figure-accent)">B</text>
        </g>
      </svg>

      {/* Les commandes : l'élève AGIT (R1). Deux curseurs plutôt qu'un
          glisser-déposer libre — au clavier comme au doigt, et on ne perd
          jamais le point hors du cadre. */}
      <div className="mt-3 grid gap-2">
        <label className="flex items-center gap-3 text-body-sm text-secondary">
          <span className="w-24 shrink-0 text-primary font-medium">on avance de</span>
          <input type="range" min={1} max={5} step={1} value={bx}
            onChange={(e) => maj(Number(e.target.value), by)}
            aria-label="on avance de" className="flex-1 accent-accent" />
          <span className="w-6 tabular-nums text-primary font-medium">{bx}</span>
        </label>
        <label className="flex items-center gap-3 text-body-sm text-secondary">
          <span className="w-24 shrink-0 text-primary font-medium">on monte de</span>
          <input type="range" min={0} max={4} step={1} value={by}
            onChange={(e) => maj(bx, Number(e.target.value))}
            aria-label="on monte de" className="flex-1 accent-accent" />
          <span className="w-6 tabular-nums text-primary font-medium">{by}</span>
        </label>
        <p key={id} className="mt-1 text-body-sm text-primary">
          pente ={" "}
          <span className="tabular-nums font-medium text-accent">
            {by} / {bx} = {(by / bx).toFixed(2).replace(".", ",")}
          </span>
        </p>
      </div>
    </figure>
  );
}

/* ── 2. la sécante qui devient tangente — le moment ────────────────────── */

/**
 * f(x) = x², point A fixé en x = 1. L'élève rapproche B de A avec un
 * curseur : la sécante pivote, et sa pente — affichée en direct — descend
 * vers 2. Rien n'est affirmé ; tout est constaté.
 *
 * On ne va PAS jusqu'à h = 0 : c'est mathématiquement le cœur du sujet
 * (en h = 0 le quotient n'existe pas) et pédagogiquement le bon moment
 * pour le dire. La figure le signale au lieu de le masquer.
 */
export function FigureSecante({
  hInit = 1.5, onH,
}: { hInit?: number; onH?: (h: number) => void }) {
  const [h, setH] = useState(hInit);
  const f = (x: number) => x * x;
  const a = 1;
  const { px, py } = useRepere(-0.3, 3.1, -0.5, 7);

  const courbe = Array.from({ length: 121 }, (_, i) => {
    const x = -0.3 + (i / 120) * 3.4;
    return `${i === 0 ? "M" : "L"}${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`;
  }).join(" ");

  const pente = (f(a + h) - f(a)) / h;           // = 2 + h
  // sécante prolongée jusqu'aux bords, pour qu'elle se lise comme une droite
  const yEn = (x: number) => f(a) + pente * (x - a);

  return (
    <figure className="m-0">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
        aria-label={`Courbe de f de x égale x au carré. Le point A est en x égale 1. Le point B est en x égale ${(a + h).toFixed(2)}. La droite qui passe par A et B a pour pente ${pente.toFixed(2)}. Quand B se rapproche de A, cette pente se rapproche de 2.`}
        className="rounded-lg bg-surface-raised">
        <Grille xmin={-0.3} xmax={3.1} ymin={-0.5} ymax={7} px={px} py={py} />
        <Axes xmin={-0.3} xmax={3.1} ymin={-0.5} ymax={7} px={px} py={py}
          gradX={[1, 2, 3]} gradY={[2, 4, 6]} />

        {/* la tangente visée, en pointillés : la cible qu'on approche */}
        <line x1={px(-0.3)} y1={py(f(a) + 2 * (-0.3 - a))}
          x2={px(3.1)} y2={py(f(a) + 2 * (3.1 - a))}
          stroke="var(--figure-ink-soft)" strokeWidth={1.4} strokeDasharray="5 5"
          opacity={0.55} />

        <path d={courbe} fill="none" stroke="var(--figure-energy-C)" strokeWidth={2.6} />

        {/* la sécante */}
        <line x1={px(-0.3)} y1={py(yEn(-0.3))} x2={px(3.1)} y2={py(yEn(3.1))}
          stroke="var(--figure-accent)" strokeWidth={2.6} strokeLinecap="round" />

        {/* le triangle du taux de variation */}
        <line x1={px(a)} y1={py(f(a))} x2={px(a + h)} y2={py(f(a))}
          stroke="var(--figure-regime-pseudo)" strokeWidth={2} />
        <line x1={px(a + h)} y1={py(f(a))} x2={px(a + h)} y2={py(f(a + h))}
          stroke="var(--figure-regime-pseudo)" strokeWidth={2} />

        <circle cx={px(a)} cy={py(f(a))} r={6} fill="var(--figure-ink)" />
        <text x={px(a) - 17} y={py(f(a)) + 5} fontSize={15} fontWeight={700}
          fill="var(--figure-ink)">A</text>
        <circle cx={px(a + h)} cy={py(f(a + h))} r={8} fill="var(--figure-accent)" />
        <text x={px(a + h) + 12} y={py(f(a + h)) - 8} fontSize={15} fontWeight={700}
          fill="var(--figure-accent)">B</text>
      </svg>

      <div className="mt-3">
        <label className="flex items-center gap-3 text-body-sm text-secondary">
          <span className="shrink-0 text-primary font-medium">rapproche B de A</span>
          {/* curseur inversé : pousser à droite = h qui diminue, donc le
              geste « je rapproche » va dans le sens de la lecture */}
          <input type="range" min={0.05} max={1.5} step={0.05} value={1.55 - h}
            onChange={(e) => { const nh = 1.55 - Number(e.target.value); setH(nh); onH?.(nh); }}
            aria-label="rapprocher B de A" className="flex-1 accent-accent" />
        </label>
        <div className="mt-3 grid gap-1 text-body-sm">
          <p className="text-secondary">
            écart <span className="tabular-nums font-medium text-primary">h = {h.toFixed(2).replace(".", ",")}</span>
          </p>
          <p className="text-primary">
            pente de (AB) ={" "}
            <span className={cn("tabular-nums font-semibold",
              h <= 0.25 ? "text-accent" : "text-primary")}>
              {pente.toFixed(2).replace(".", ",")}
            </span>
            {h <= 0.25 && <span className="ml-2 text-secondary">→ ça se stabilise vers 2</span>}
          </p>
        </div>
      </div>
    </figure>
  );
}
