"use client";

/**
 * SpherePlanDroitePanel — « la sphère, un plan, une droite »
 * (maths/geometrie-espace, R9 ; ADR 0041).
 *
 * Pourquoi de la 3D ici : l'intersection d'une sphère et d'un plan est un
 * CERCLE que la figure plane de la leçon doit dessiner en ellipse, et le
 * point de la leçon — « c'est la dimension de l'objet qui coupe qui décide de
 * la forme du résultat » — se VOIT en passant du plan à la droite à distance
 * égale : un cercle, puis deux points. Tout le reste est le Pythagore de la
 * leçon, posé sur la figure (le triangle SHM rectangle en H).
 *
 * La scène part de l'exemple travaillé : S(0, 0, 2), R = 3, (P) : z = k.
 * Pas de temps ici : les paris se révèlent au choix. Chaque étape ouvre UN
 * contrôle (la position, l'objet qui coupe, le rayon), puis l'étape libre.
 * Les nombres affichés sont en texte, hors KaTeX (seules les étiquettes de
 * formule passent par KaTeX) : ce que l'élève lit est ce que la porte lit.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon } from "@/components/ui/Icon";
import { MathText } from "../ChoiceButton";
import * as G from "@/lib/scene3d/sphere";
import type { SceneSphere } from "@/lib/scene3d/sphere-plan";
import { CURSEUR, MARGE_FOCUS, type Vue } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { useGlisserVue } from "./useGlisserVue";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { VuesBloc } from "./VuesBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, poser } from "./Plateau";

type NomVue = "biais" | "face" | "dessus";

const VUES: Record<NomVue, Vue> = {
  biais: { azimut: 32, elevation: 18, libelle: "De biais" },
  face: { azimut: 32, elevation: 0, libelle: "De face (le plan vu par la tranche)" },
  dessus: { azimut: 32, elevation: 88, libelle: "De dessus" },
};

const K_MIN = -2;
const K_MAX = 6;
const R_MIN = 1;
const R_MAX = 4;

function nomVue(v: unknown): NomVue | undefined {
  return v === "biais" || v === "face" || v === "dessus" ? v : undefined;
}

function appliquer(etat: Scene3DEtat | undefined, courant: G.EtatSphere): G.EtatSphere {
  if (!etat) return courant;
  return {
    objet: etat.objet === "plan" || etat.objet === "droite" ? etat.objet : courant.objet,
    k: typeof etat.k === "number" ? etat.k : courant.k,
    R: typeof etat.R === "number" ? etat.R : courant.R,
  };
}

const ETAT_DE_BASE: G.EtatSphere = { objet: "plan", k: 0.5, R: 3 };

export function SpherePlanDroitePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<G.EtatSphere>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "biais";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteS = useRef<HTMLSpanElement>(null);
  const etiquetteH = useRef<HTMLSpanElement>(null);
  const etiquetteM = useRef<HTMLSpanElement>(null);

  // Pas de temps dans cette scène : les paris se révèlent au choix.
  const pari = usePari(etape.pari, 0);
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);

  const renduRef = useRef<SceneSphere | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.orienter(angles.azimut, angles.elevation);
    s.mettreAJour(etat);
    s.rendre();
    const { S, H, M } = s.etiquettes();
    poser(etiquetteS.current, S, "-130%");
    // H SOUS son point, S au-dessus : vus de dessus, les deux se projettent
    // au même endroit et leurs étiquettes s'écrasaient l'une sur l'autre.
    poser(etiquetteH.current, H, "30%");
    poser(etiquetteM.current, M ?? { x: 0, y: 0, visible: false }, "-130%");
  }, [etat, angles]);

  const rendu = useSceneRendu<SceneSphere>(() => import("@/lib/scene3d/sphere-plan").then((m) => m.creerSceneSphere), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.reinitialiser();
      setEtat((courant) => appliquer(e.etat, courant));
      const v = nomVue(e.etat?.vue);
      if (v) {
        setVue(v);
        setAngles(VUES[v]);
      }
    },
    [etapes, pari]
  );

  const glisser = useGlisserVue(
    (dA, dE) => setAngles((a) => ({ ...a, azimut: a.azimut + dA, elevation: Math.max(-80, Math.min(88, a.elevation + dE)) })),
    () => setVue(null)
  );
  const choisirVue = (v: NomVue) => {
    setVue(v);
    setAngles(VUES[v]);
  };

  // ── Lectures (toutes calculées) ──
  const d = G.distance(etat);
  const c = G.cas(etat);
  const rac = G.racine(Math.max(0, G.radicande(etat)));
  const estPlan = etat.objet === "plan";
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const valeurHM = c === "secant" ? `${rac.exacte ?? `√${G.nombre(G.radicande(etat))}`}${rac.exacte ? "" : ` ${rac.approx}`}` : c === "tangent" ? "0 — un seul point, H" : "aucun point commun";

  const description = useMemo(
    () =>
      `Scène en trois dimensions : une sphère de centre S et de rayon ${G.nombre(etat.R)}, ` +
      (estPlan ? `coupée par un plan horizontal` : `et une droite horizontale`) +
      ` à la distance ${G.nombre(d)} de son centre. ` +
      (c === "vide"
        ? "Ils n'ont aucun point commun."
        : c === "tangent"
          ? `${estPlan ? "Le plan" : "La droite"} touche la sphère en un seul point, H.`
          : estPlan
            ? `Leur intersection est un cercle de centre H et de rayon ${rac.exacte ?? rac.approx.replace("≈", "environ")}.`
            : `Ils ont deux points communs, à ${rac.exacte ?? rac.approx.replace("≈", "environ")} de H.`),
    [etat.R, estPlan, d, c, rac.exacte, rac.approx]
  );

  if (rendu.panneau === "ferme") {
    return <SceneOptIn sceneId={scene.scene} titre={scene.title} legende={scene.caption} onOuvrir={rendu.ouvrir} className={className} />;
  }

  const R2 = G.nombre(etat.R * etat.R);
  const equationObjet = estPlan
    ? `$(\\mathcal P) : z = ${G.cote(etat.k).replace(",", "{,}")}$`
    : `$(\\mathcal D) : y = 0 \\text{ et } z = ${G.cote(etat.k).replace(",", "{,}")}$`;
  const qui = estPlan ? "le plan" : "la droite";
  const casListe: [G.Cas, string][] = [
    ["vide", "$d > R$ : aucun point commun"],
    ["tangent", `$d = R$ : un seul point — ${qui} est tangent${estPlan ? "" : "e"} en $H$`],
    ["secant", estPlan ? "$d < R$ : un cercle de centre $H$, de rayon $\\sqrt{R^2 - d^2}$" : "$d < R$ : deux points, symétriques par rapport à $H$"],
  ];

  const ligneLecture = (cle: string, terme: React.ReactNode, valeur: string) => (
    <div key={cle} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="tabular-nums text-primary" data-lecture={cle}>
        {frenchTypography(valeur)}
      </dd>
    </div>
  );

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-k={Math.round(etat.k * 10) / 10}
      data-r={Math.round(etat.R * 10) / 10}
      data-objet={etat.objet}
      data-cas={c}
      data-pari={pari.phase}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} />

      <div className="grid gap-5 bp-expanded:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] bp-expanded:items-start">
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          glisser={glisser}
          legende={estPlan ? "Sphère et plan" : "Sphère et droite"}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes ; la figure de la sphère coupée par un plan, plus bas dans la leçon, en montre l’essentiel."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteS} texte="S" />
          <Etiquette refEl={etiquetteH} texte="H" />
          <Etiquette refEl={etiquetteM} texte="M" />
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS)}>
          {etape.pari && (
            <PariBloc
              pari={etape.pari}
              phase={pari.phase}
              choixId={pari.choixId}
              choixRetenu={pari.choixRetenu}
              choixNotion={pari.choixNotion}
              onChoisir={pari.choisir}
              idBase={idTitre}
            />
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {ouvre("position") && (
            <label className="flex flex-col gap-1" data-controle="position">
              <span className="text-body-sm text-secondary">
                {frenchTypography(`Position ${estPlan ? "du plan (P)" : "de la droite (D)"} : z =`)}{" "}
                <span className="tabular-nums text-primary">{G.cote(etat.k)}</span>
              </span>
              <input
                type="range"
                min={K_MIN}
                max={K_MAX}
                step={G.PAS}
                value={etat.k}
                onChange={(e) => setEtat((st) => ({ ...st, k: Math.round(parseFloat(e.target.value) * 10) / 10 }))}
                aria-valuetext={`z = ${G.cote(etat.k)}, distance au centre ${G.nombre(d)}`}
                className={CURSEUR}
              />
            </label>
          )}

          {ouvre("objet") && (
            <fieldset className="flex flex-col gap-1" data-controle="objet">
              <legend className="mb-1 text-body-sm text-secondary">Ce qui coupe la sphère</legend>
              {(
                [
                  ["plan", "Un plan (P)"],
                  ["droite", "Une droite (D), dans ce plan"],
                ] as const
              ).map(([v, libelle]) => (
                <label key={v} className="flex min-h-touch items-center gap-2 text-body-sm text-primary">
                  <input
                    type="radio"
                    name={`${idTitre}-objet`}
                    checked={etat.objet === v}
                    onChange={() => setEtat((st) => ({ ...st, objet: v }))}
                    className="accent-figure-ink-soft"
                  />
                  {libelle}
                </label>
              ))}
            </fieldset>
          )}

          {ouvre("rayon") && (
            <label className="flex flex-col gap-1" data-controle="rayon">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Rayon de la sphère : R =")}{" "}
                <span className="tabular-nums text-primary">{G.nombre(etat.R)}</span>
              </span>
              <input
                type="range"
                min={R_MIN}
                max={R_MAX}
                step={G.PAS}
                value={etat.R}
                onChange={(e) => setEtat((st) => ({ ...st, R: Math.round(parseFloat(e.target.value) * 10) / 10 }))}
                aria-valuetext={`R = ${G.nombre(etat.R)}`}
                className={CURSEUR}
              />
            </label>
          )}

          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("d") &&
                ligneLecture("d", <MathText>{`$d(S, ${estPlan ? "(\\mathcal P)" : "(\\mathcal D)"}) = |k - 2|$`}</MathText>, G.nombre(d))}
              {lectures.includes("r") && estPlan && ligneLecture("r", <MathText>{"$r = \\sqrt{R^2 - d^2}$"}</MathText>, valeurHM)}
              {lectures.includes("hm") && !estPlan && ligneLecture("hm", <MathText>{"$HM = \\sqrt{R^2 - d^2}$"}</MathText>, valeurHM)}
              {lectures.includes("corde") &&
                !estPlan &&
                c === "secant" &&
                ligneLecture("corde", <>Longueur de la corde, 2&#8239;<i>HM</i></>, G.approche(2 * G.hm(etat)))}
            </dl>
          )}

          {/* La fiche : les équations, la distance, et les trois cas de la leçon —
              le cas courant porte une coche ET la graisse (§9 : jamais la couleur seule). */}
          <div className="rounded-lg border border-subtle px-4 py-3" data-fiche>
            <div className="flex flex-col gap-1 text-body-sm text-primary">
              <MathText>{`$(S) : x^2 + y^2 + (z-2)^2 = ${R2.replace(",", "{,}")}$`}</MathText>
              <MathText>{equationObjet}</MathText>
            </div>
            <p className="mb-1.5 mt-3 text-caption font-medium text-secondary">Trois cas</p>
            <ul className="flex flex-col gap-1.5 text-body-sm">
              {casListe.map(([k, texte]) => (
                <li key={k} className="flex items-start gap-2" data-cas-ligne={k} aria-current={k === c ? "true" : undefined}>
                  <span className="mt-0.5 w-4 shrink-0 text-primary">{k === c ? <CheckIcon size={16} title="cas actuel" /> : null}</span>
                  <span className={cn("min-w-0 break-words", k === c ? "font-medium text-primary" : "text-secondary")}>
                    <MathText>{texte}</MathText>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="flex bp-expanded:hidden" />
      </div>

      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
