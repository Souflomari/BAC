"use client";

/**
 * VectorielPanel — « le produit vectoriel » (maths/geometrie-espace, R3 ;
 * ADR 0041).
 *
 * Pourquoi de la 3D ici : le produit vectoriel fabrique un TROISIÈME vecteur,
 * perpendiculaire au plan des deux premiers — une direction qui sort du plan
 * de la feuille. La figure plane de la leçon doit la dessiner en perspective,
 * et c'est précisément là que l'œil se trompe (« se fier au dessin »). Ici,
 * on tourne autour : l'angle droit se vérifie de côté, l'aire se lit de
 * dessus, et l'ordre des facteurs retourne la flèche sous les yeux.
 *
 * La scène part de l'exemple travaillé : u = AB = (2 ; 0 ; 0), v = AC =
 * (0 ; 2 ; 0), AB ∧ AC = (0 ; 0 ; 4), aire(ABC) = 2. Pas de temps ici : les
 * paris se révèlent au choix. Avant le pari, l'ISSUE — la flèche du produit,
 * le parallélogramme, la fiche, la phrase lue au lecteur d'écran — n'existe
 * pas (§11.190).
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as G from "@/lib/scene3d/vectoriel";
import type { SceneVectoriel } from "@/lib/scene3d/produit-vectoriel";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS, type Vue } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { useGlisserVue } from "./useGlisserVue";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { VuesBloc } from "./VuesBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, poser } from "./Plateau";

type NomVue = "biais" | "dessus" | "cote";

const VUES: Record<NomVue, Vue> = {
  biais: { azimut: 35, elevation: 22, libelle: "De biais" },
  dessus: { azimut: 35, elevation: 88, libelle: "De dessus" },
  cote: { azimut: 35, elevation: 0, libelle: "De côté" },
};

function nomVue(v: unknown): NomVue | undefined {
  return v === "biais" || v === "dessus" || v === "cote" ? v : undefined;
}

function appliquer(etat: Scene3DEtat | undefined, courant: G.EtatVectoriel): G.EtatVectoriel {
  if (!etat) return courant;
  return {
    theta: typeof etat.theta_deg === "number" ? etat.theta_deg : courant.theta,
    lv: typeof etat.v_norme === "number" ? etat.v_norme : courant.lv,
    phi: typeof etat.phi_deg === "number" ? etat.phi_deg : courant.phi,
    ordre: etat.ordre === "uv" || etat.ordre === "vu" ? etat.ordre : courant.ordre,
  };
}

const ETAT_DE_BASE: G.EtatVectoriel = { theta: 90, lv: 2, phi: 0, ordre: "uv" };

export function VectorielPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<G.EtatVectoriel>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "biais";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteA = useRef<HTMLSpanElement>(null);
  const etiquetteU = useRef<HTMLSpanElement>(null);
  const etiquetteV = useRef<HTMLSpanElement>(null);
  const etiquetteW = useRef<HTMLSpanElement>(null);
  const etiquetteX = useRef<HTMLSpanElement>(null);
  const etiquetteY = useRef<HTMLSpanElement>(null);
  const etiquetteZ = useRef<HTMLSpanElement>(null);

  // Pas de temps : les paris se révèlent au choix. L'issue attend le pari.
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const issue = pari.etapeOuverte;

  const renduRef = useRef<SceneVectoriel | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.orienter(angles.azimut, angles.elevation);
    s.mettreAJour(etat, issue);
    s.rendre();
    const e = s.etiquettes();
    poser(etiquetteA.current, e.A);
    poser(etiquetteU.current, e.u);
    poser(etiquetteV.current, e.v);
    poser(etiquetteW.current, e.w);
    poser(etiquetteX.current, e.x);
    poser(etiquetteY.current, e.y);
    poser(etiquetteZ.current, e.z);
  }, [etat, angles, issue]);

  const rendu = useSceneRendu<SceneVectoriel>(() => import("@/lib/scene3d/produit-vectoriel").then((m) => m.creerSceneVectoriel), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      // Chaque étape garde son pari ; « Recommencer » (dernière → première) repart à blanc.
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((courant) => appliquer(e.etat, courant));
      const v = nomVue(e.etat?.vue);
      if (v) {
        setVue(v);
        setAngles(VUES[v]);
      }
    },
    [etapes, pari, indexEtape]
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
  const v = G.vecteurV(etat);
  const w = G.produit(etat);
  const nw = G.norme(w);
  const aire = G.aireParallelogramme(etat);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const nomProduit = etat.ordre === "uv" ? "u ∧ v" : "v ∧ u";
  const texProduit = etat.ordre === "uv" ? "\\vec u \\wedge \\vec v" : "\\vec v \\wedge \\vec u";

  const issueTexte =
    nw < 1e-9
      ? `Le produit vectoriel est le vecteur nul : u et v sont colinéaires, le parallélogramme est aplati (aire 0).`
      : `${nomProduit} = ${G.coordonnees(w)} : perpendiculaire à u et à v, de norme ${G.valeur(nw)} — l’aire du parallélogramme construit sur u et v.`;

  const description = useMemo(
    () =>
      `Scène en trois dimensions : depuis le point A, le vecteur u = ${G.coordonnees(G.U)} et le vecteur v = ${G.coordonnees(v)}, ` +
      `qui font un angle de ${etat.theta}°.` +
      (issue ? ` ${issueTexte}` : ""),
    [v, etat.theta, issue, issueTexte]
  );

  if (rendu.panneau === "ferme") {
    return <SceneOptIn sceneId={scene.scene} titre={scene.title} legende={scene.caption} onOuvrir={rendu.ouvrir} className={className} />;
  }

  const ligneLecture = (cle: string, terme: React.ReactNode, valeur: string) => (
    <div key={cle} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="tabular-nums text-primary" data-lecture={cle}>
        {frenchTypography(valeur)}
      </dd>
    </div>
  );

  const curseur = (cle: string, libelle: string, valeur: string, min: number, max: number, pas: number, courant: number, changer: (x: number) => void) => (
    <label className="flex flex-col gap-1" data-controle={cle}>
      <span className="text-body-sm text-secondary">
        {frenchTypography(libelle)} <span className="tabular-nums text-primary">{frenchTypography(valeur)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={pas}
        value={courant}
        onChange={(e) => changer(parseFloat(e.target.value))}
        aria-valuetext={valeur}
        className={CURSEUR}
      />
    </label>
  );

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-theta={etat.theta}
      data-lv={etat.lv}
      data-phi={etat.phi}
      data-ordre={etat.ordre}
      data-pari={pari.phase}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
      </Eyebrow>
      <ConsigneEtape
        idTitre={idTitre}
        idConsigne={idConsigne}
        titre={etape.titre}
        consigne={etape.consigne}
        cle={etape.id}
        rang={{ index: indexEtape, total: etapes.length }}
      />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          glisser={glisser}
          legende={etat.phi === 0 ? "Le plan de u et v est horizontal" : `Le plan de u et v est incliné de ${etat.phi}°`}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes ; la figure du produit vectoriel, plus bas dans la leçon, en montre l’essentiel."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteA} texte="A" />
          <Etiquette refEl={etiquetteU} nom="u">
            <MathText>{"$\\vec u$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteV} nom="v">
            <MathText>{"$\\vec v$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteW} nom="produit">
            <MathText>{`$${texProduit}$`}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteX} nom="x">
            <span className="font-normal italic text-secondary">x</span>
          </Etiquette>
          <Etiquette refEl={etiquetteY} nom="y">
            <span className="font-normal italic text-secondary">y</span>
          </Etiquette>
          <Etiquette refEl={etiquetteZ} nom="z">
            <span className="font-normal italic text-secondary">z</span>
          </Etiquette>
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

          {/* Au téléphone, les vues viennent juste après le pari et le lancement —
              plus après la fiche, à 1 500 px de la scène qu'elles tournent. */}
          <VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="flex bp-expanded:hidden" />

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {ouvre("angle") &&
            curseur("angle", "Angle entre u et v : θ =", `${etat.theta}°`, 0, 180, G.PAS_ANGLE, etat.theta, (x) => setEtat((s) => ({ ...s, theta: x })))}
          {ouvre("longueur") &&
            curseur("longueur", "Norme de v : ‖v‖ =", G.nombre(etat.lv), G.LONGUEUR_MIN, G.LONGUEUR_MAX, G.PAS_LONGUEUR, etat.lv, (x) =>
              setEtat((s) => ({ ...s, lv: x }))
            )}
          {ouvre("inclinaison") &&
            curseur("inclinaison", "Inclinaison du plan de u et v : φ =", `${etat.phi}°`, 0, 90, G.PAS_ANGLE, etat.phi, (x) => setEtat((s) => ({ ...s, phi: x })))}

          {ouvre("ordre") && (
            <fieldset className="flex flex-col gap-1" data-controle="ordre">
              <legend className="mb-1 text-body-sm text-secondary">L’ordre des facteurs</legend>
              {(
                [
                  ["uv", "$\\vec u \\wedge \\vec v$"],
                  ["vu", "$\\vec v \\wedge \\vec u$"],
                ] as const
              ).map(([o, libelle]) => (
                <label key={o} className={LIGNE_RADIO}>
                  <input
                    type="radio"
                    name={`${idTitre}-ordre`}
                    checked={etat.ordre === o}
                    onChange={() => setEtat((s) => ({ ...s, ordre: o }))}
                    className="accent-figure-ink-soft"
                  />
                  <MathText>{libelle}</MathText>
                </label>
              ))}
            </fieldset>
          )}

          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("coordonnees") && ligneLecture("coordonnees", <MathText>{`$${texProduit}$`}</MathText>, G.coordonnees(w))}
              {lectures.includes("norme") && ligneLecture("norme", <MathText>{`$\\|${texProduit}\\|$`}</MathText>, G.valeur(nw))}
              {lectures.includes("aire") && ligneLecture("aire-para", <>Aire du parallélogramme</>, G.valeur(aire))}
              {lectures.includes("aire") && ligneLecture("aire-tri", <>Aire du triangle (la moitié)</>, G.valeur(aire / 2))}
              {lectures.includes("orthogonalite") &&
                ligneLecture("scal-u", <MathText>{`$\\vec u \\cdot (${texProduit})$`}</MathText>, G.nombre(G.scalaire(G.U, w)))}
              {lectures.includes("orthogonalite") &&
                ligneLecture("scal-v", <MathText>{`$\\vec v \\cdot (${texProduit})$`}</MathText>, G.nombre(G.scalaire(v, w)))}
            </dl>
          )}

          {/* La fiche : la définition, la norme-aire, l'antisymétrie — après la
              révélation seulement, elle EST la réponse (§11.190). */}
          {issue && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-fiche>
              <p className="mb-2 text-caption font-medium text-secondary">Le produit vectoriel</p>
              <div className="flex flex-col gap-1 text-body-sm text-primary">
                <MathText>{"$\\vec u \\wedge \\vec v = (y z' - z y'\\,;\\ z x' - x z'\\,;\\ x y' - y x')$"}</MathText>
                <MathText>{"$\\|\\vec u \\wedge \\vec v\\| = \\|\\vec u\\|\\,\\|\\vec v\\|\\,\\sin\\theta$ : l'aire du parallélogramme"}</MathText>
                <MathText>{"$\\vec v \\wedge \\vec u = -\\,\\vec u \\wedge \\vec v$"}</MathText>
              </div>
              <p className="mt-2 text-body-sm font-medium text-primary" data-issue>
                {frenchTypography(issueTexte)}
              </p>
            </div>
          )}
        </div>
      </div>

      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
