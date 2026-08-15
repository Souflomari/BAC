"use client";

/**
 * FigureSecanteMafs — la sécante qui devient tangente, en Mafs.
 *
 * Ce qui change par rapport à la version faite main :
 *   · B se GLISSE le long de la courbe (MovablePoint contraint), au lieu
 *     d'être piloté par un curseur à côté. Le geste devient direct : on
 *     rapproche B de A avec le doigt, on ne règle plus un paramètre.
 *   · Le tracé, le repère et les graduations viennent de Mafs — plus de
 *     projection ni d'axes recodés à la main, donc plus de risque de
 *     figure fausse.
 *   · La pente affichée est animée par un ressort M3, ce qui fait qu'on
 *     VOIT le nombre se poser au lieu de sauter.
 *
 * Contrainte de fond conservée : on ne laisse jamais B atteindre A. En
 * h = 0 le quotient n'existe pas, et c'est précisément l'idée à faire
 * passer — la figure bute, elle ne triche pas.
 */

import { useCallback } from "react";
import { Mafs, Coordinates, Plot, Line, Point, Theme, useMovablePoint } from "mafs";
import { useRessort } from "./useRessort";
import { SPATIAL } from "@/lib/m3-motion";

const A_X = 1;
const H_MIN = 0.08;
const H_MAX = 1.6;
const f = (x: number) => x * x;

export function FigureSecanteMafs({ onH }: { onH?: (h: number) => void }) {
  // B vit SUR la courbe : la contrainte projette n'importe quel geste sur
  // le graphe, et borne h pour que B ne se pose jamais exactement sur A.
  const contrainte = useCallback(([x]: [number, number]): [number, number] => {
    const borne = Math.min(A_X + H_MAX, Math.max(A_X + H_MIN, x));
    return [borne, f(borne)];
  }, []);

  const B = useMovablePoint([A_X + H_MAX, f(A_X + H_MAX)], {
    constrain: contrainte,
    color: Theme.orange,
  });

  const h = B.point[0] - A_X;
  const pente = (f(A_X + h) - f(A_X)) / h; // = 2 + h
  const penteAnimee = useRessort(pente, SPATIAL.expressiveDefault);
  onH?.(h);

  const proche = h <= 0.3;

  return (
    <figure className="m-0">
      <Mafs
        height={380}
        viewBox={{ x: [-0.4, 3], y: [-0.6, 7] }}
        preserveAspectRatio={false}
      >
        <Coordinates.Cartesian />

        {/* la tangente visée — la cible qu'on approche, jamais annoncée */}
        <Line.PointSlope
          point={[A_X, f(A_X)]}
          slope={2}
          style="dashed"
          color={Theme.foreground}
          opacity={0.35}
        />

        <Plot.OfX y={f} color={Theme.blue} />

        {/* la sécante */}
        <Line.PointSlope point={[A_X, f(A_X)]} slope={pente} color={Theme.orange} />

        {/* le triangle du taux de variation : ce qu'on avance, ce qu'on monte */}
        <Line.Segment
          point1={[A_X, f(A_X)]}
          point2={[A_X + h, f(A_X)]}
          color={Theme.green}
        />
        <Line.Segment
          point1={[A_X + h, f(A_X)]}
          point2={[A_X + h, f(A_X + h)]}
          color={Theme.green}
        />

        <Point x={A_X} y={f(A_X)} color={Theme.foreground} />
        {B.element}
      </Mafs>

      <div className="mt-3 grid gap-1">
        <p className="text-body-sm text-secondary">
          Attrape <span className="font-medium text-primary">B</span> et fais-le
          glisser vers <span className="font-medium text-primary">A</span>.
        </p>
        <p className="text-body text-primary">
          pente de (AB) ={" "}
          <span className="tabular-nums font-semibold text-accent">
            {penteAnimee.toFixed(2).replace(".", ",")}
          </span>
          {proche && (
            <span className="ml-2 text-body-sm text-secondary">
              — ça se pose vers 2
            </span>
          )}
        </p>
        <p className="text-caption text-tertiary">
          écart h = {h.toFixed(2).replace(".", ",")} — B ne peut pas atteindre A
        </p>
      </div>
      <span className="sr-only">
        Courbe de f de x égale x au carré. A est en x égale 1. B, déplaçable le
        long de la courbe, est à un écart h de {h.toFixed(2)}. La pente de la
        droite AB vaut {pente.toFixed(2)} et se rapproche de 2 quand B approche
        de A.
      </span>
    </figure>
  );
}
