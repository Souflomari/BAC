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

import { useCallback, useEffect } from "react";
import { Mafs, Coordinates, Plot, Line, Point, Text as MafsText, Theme, useMovablePoint } from "mafs";
import { useRessort } from "./useRessort";
import { useApparition } from "./Apparition";
import { SPATIAL } from "@/lib/m3-motion";

const A_X = 1;
const H_MIN = 0.08;
const H_MAX = 1.6;
const f = (x: number) => x * x;

export function FigureSecanteMafs({
  onPente,
  erreurPente = null,
  erreurLabel,
}: {
  /** Remonte la pente de (AB) à chaque déplacement de B — c'est elle que
   *  l'écran de type « réglage » compare à sa cible. Appelée dans un effet,
   *  jamais pendant le rendu : remonter un état au parent en plein rendu
   *  est précisément ce que React interdit. */
  onPente?: (pente: number) => void;
  /** La pente qu'AFFIRME la réponse fausse : tracée en A, à côté de la
   *  vraie. Répondre « 0 » dessine une horizontale — on voit qu'elle ne
   *  colle pas à la courbe. C'est R3 : montrer, pas rédiger. */
  erreurPente?: number | null;
  erreurLabel?: string;
}) {
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

  useEffect(() => {
    onPente?.(pente);
  }, [pente, onPente]);

  // La droite fausse ne surgit pas à sa place : elle PART de la sécante que
  // l'élève a sous les yeux et s'en écarte. On ne lui dit pas que c'est
  // faux — il regarde sa réponse quitter la courbe (R3).
  const p = useApparition(erreurPente ?? "aucune", { ressort: SPATIAL.expressiveDefault });
  const penteErreurAnimee =
    erreurPente == null ? pente : pente + (erreurPente - pente) * p;

  const proche = h <= 0.3;
  // Le quotient affiché doit se VÉRIFIER à la calculette. À deux décimales,
  // « 0,17 / 0,08 » donne 2,125 alors qu'on écrit 2,08 à côté — un élève
  // qui contrôle trouve un désaccord et a raison. On ouvre donc la précision
  // quand h devient petit, pour que la division écrite tombe juste.
  const decimales = h < 0.5 ? 3 : 2;
  // Quand B colle à A, le triangle mesure quelques pixels : y accrocher deux
  // étiquettes les empile sur A et sur B et rend le coin illisible. On les
  // retire — les mêmes nombres restent lus en clair sous la figure, donc on
  // ne perd aucune information, seulement l'encombrement.
  const triangleLisible = h >= 0.6;
  // Abscisse où poser l'étiquette de la droite fausse : au bord droit du
  // cadre, ou plus tôt si la droite sort par le haut avant d'y arriver.
  const xEtiquetteErreur = Math.min(
    3,
    A_X + (7.2 - f(A_X)) / Math.max(penteErreurAnimee, 0.001)
  );

  return (
    <figure className="m-0">
      {/* Cadrage : B monte jusqu'à (2,6 ; 6,76) au bout de sa course, et les
          étiquettes de graduation ont besoin d'air en bas — sans cette marge
          Mafs rognait le « -1 » contre le bord. */}
      <Mafs
        height={440}
        viewBox={{ x: [-0.35, 3.4], y: [-1.2, 8] }}
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

        {/* la courbe : c'est le TERRAIN, donc à l'encre, pas en couleur —
            les couleurs sont réservées à ce qu'on mesure dessus. */}
        <Plot.OfX y={f} color={Theme.foreground} />

        {/* la sécante */}
        <Line.PointSlope point={[A_X, f(A_X)]} slope={pente} color={Theme.orange} />

        {/* Le triangle du taux de variation. MÊMES COULEURS que la figure du
            collège : ce qu'on avance en bleu, ce qu'on monte en brun. Un
            élève doit reconnaître le même geste d'une figure à l'autre —
            avant, les deux segments étaient verts et se confondaient avec la
            sécante. */}
        <Line.Segment
          point1={[A_X, f(A_X)]}
          point2={[A_X + h, f(A_X)]}
          color={Theme.blue}
        />
        <Line.Segment
          point1={[A_X + h, f(A_X)]}
          point2={[A_X + h, f(A_X + h)]}
          color={Theme.red}
        />
        {/* Les deux côtés sont NOMMÉS, dans les mêmes mots et les mêmes
            couleurs qu'au collège. C'est là que se joue le transfert : sans
            ces étiquettes, l'élève voit deux traits ; avec elles, il voit le
            même geste qu'il a déjà fait sur une droite. */}
        {triangleLisible && (
          <>
            <MafsText
              x={A_X + h / 2}
              y={f(A_X) - 0.45}
              color={Theme.blue}
              size={17}
            >
              {`h = ${h.toFixed(decimales).replace(".", ",")}`}
            </MafsText>
            <MafsText
              x={A_X + h}
              y={(f(A_X) + f(A_X + h)) / 2}
              attach="e"
              attachDistance={12}
              color={Theme.red}
              size={17}
            >
              {`+ ${(f(A_X + h) - f(A_X)).toFixed(decimales).replace(".", ",")}`}
            </MafsText>
          </>
        )}

        {/* la droite que l'élève vient d'affirmer */}
        {erreurPente != null && (
          <>
            <Line.PointSlope
              point={[A_X, f(A_X)]}
              slope={penteErreurAnimee}
              color={Theme.violet}
              style="dashed"
              weight={3}
            />
            {/* L'étiquette se pose SUR la droite, au bord du cadre : posée au
                milieu elle tombait sur le triangle du taux de variation. On
                prend le premier des deux bords que la droite rencontre. */}
            <MafsText
              x={xEtiquetteErreur}
              y={f(A_X) + penteErreurAnimee * (xEtiquetteErreur - A_X)}
              attach="n"
              attachDistance={10}
              color={Theme.violet}
              size={18}
            >
              {erreurLabel ?? `pente ${erreurPente}`}
            </MafsText>
          </>
        )}

        <Point x={A_X} y={f(A_X)} color={Theme.foreground} />
        {/* A et B sont nommés dans la consigne ET dans les questions : sans
            étiquette sur la figure, l'élève doit deviner lequel est lequel. */}
        <MafsText x={A_X - 0.2} y={f(A_X) - 0.55} color={Theme.foreground} size={19}>
          A
        </MafsText>
        {/* B s'éloigne de son point quand il colle à A, sinon les deux
            étiquettes se chevauchent au même endroit. */}
        <MafsText
          x={A_X + h + (triangleLisible ? 0.2 : 0.42)}
          y={f(A_X + h) + (triangleLisible ? 0.38 : 0.62)}
          color={Theme.orange}
          size={19}
        >
          B
        </MafsText>
        {B.element}
      </Mafs>

      <div className="mt-4 grid gap-1.5">
        <p className="text-body text-secondary">
          Attrape <span className="font-medium text-primary">B</span> et fais-le
          glisser vers <span className="font-medium text-primary">A</span>.
        </p>
        {/* Le quotient est écrit EN ENTIER, dans la même forme qu'au collège
            (« pente = 2 / 4 = 0,50 ») : c'est la même opération, sur une
            courbe. Afficher seulement le résultat cacherait justement ce
            qu'on veut faire reconnaître. */}
        <p className="text-body-lg text-primary">
          pente de (AB) ={" "}
          <span className="tabular-nums" style={{ color: "var(--figure-regime-pseudo)" }}>
            {(f(A_X + h) - f(A_X)).toFixed(decimales).replace(".", ",")}
          </span>
          {" / "}
          <span className="tabular-nums" style={{ color: "var(--figure-energy-C)" }}>
            {h.toFixed(decimales).replace(".", ",")}
          </span>
          {" = "}
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
          B ne peut pas atteindre A : en h = 0, la division n’existe plus.
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
