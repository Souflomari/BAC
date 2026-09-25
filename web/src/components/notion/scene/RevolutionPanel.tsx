"use client";

/**
 * RevolutionPanel — « le solide de révolution » (maths/calcul-integral, R9 ;
 * ADR 0041 ; spec : content/maths/calcul-integral/spec-extension.md §9).
 *
 * Pourquoi de la 3D ici : une région PLANE qui tourne engendre un SOLIDE — le
 * passage du plan à l'espace est le concept. La coupe perpendiculaire à l'axe
 * est un disque, et toute figure plane le dessine en ellipse ; vu le long de
 * (Ox), il redevient un vrai cercle, et son rayon f(x) se lit au bon endroit.
 *
 * Pas de temps : les paris se révèlent au choix. Avant le pari, l'ISSUE — le
 * solide coupé et son disque, les tranches, le cube unité, la fiche, les
 * lectures, la phrase lue au lecteur d'écran — n'existe pas (§11.190).
 *
 * FRONTIÈRE (limite SExp, spec §3.2) : les tranches s'affichent, elles ne
 * s'additionnent jamais — aucune somme n'est écrite dans ce panneau, et le
 * seul volume affiché est la valeur EXACTE de l'intégrale.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as R from "@/lib/scene3d/revolution";
import type { MontreRevolution, SceneRevolution } from "@/lib/scene3d/solide-revolution";
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

type NomVue = "biais" | "face" | "cote";

const VUES: Record<NomVue, Vue> = {
  biais: { azimut: -58, elevation: 20, libelle: "De biais" },
  face: { azimut: 0, elevation: 0, libelle: "Le long de l’axe" },
  cote: { azimut: -90, elevation: 0, libelle: "De côté" },
};

function nomVue(v: unknown): NomVue | undefined {
  return v === "biais" || v === "face" || v === "cote" ? v : undefined;
}

function idFonction(v: unknown): R.IdFonction | undefined {
  return v === "racine" || v === "cone" || v === "log" ? v : undefined;
}

function appliquer(etat: Scene3DEtat | undefined, courant: R.EtatRevolution): R.EtatRevolution {
  if (!etat) return courant;
  const fonction = idFonction(etat.fonction) ?? courant.fonction;
  const F = R.FONCTIONS[fonction];
  return {
    fonction,
    alpha: typeof etat.balayage_deg === "number" ? etat.balayage_deg : courant.alpha,
    x: R.xSurGrille(F, typeof etat.x_tranche === "number" ? etat.x_tranche : courant.x),
    n: typeof etat.n_tranches === "number" ? etat.n_tranches : courant.n,
    k: typeof etat.unite_cm === "number" ? etat.unite_cm : courant.k,
  };
}

const ETAT_DE_BASE: R.EtatRevolution = { fonction: "racine", alpha: 0, x: 2.25, n: 1, k: 1 };

export function RevolutionPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<R.EtatRevolution>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const vueInitiale = nomVue(etapes[0]?.etat?.vue) ?? "biais";
  const [vue, setVue] = useState<NomVue | null>(vueInitiale);
  const [angles, setAngles] = useState(VUES[vueInitiale]);

  const idTitre = useId();
  const idConsigne = useId();
  const etiquetteX = useRef<HTMLSpanElement>(null);
  const etiquetteY = useRef<HTMLSpanElement>(null);
  const etiquetteRayon = useRef<HTMLSpanElement>(null);
  const etiquetteCube = useRef<HTMLSpanElement>(null);
  const repereCentre = useRef<HTMLSpanElement>(null);
  const repereBord = useRef<HTMLSpanElement>(null);

  // Pas de temps : l'issue attend le pari, et rien d'autre.
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const issue = pari.etapeOuverte;
  const F = R.FONCTIONS[etat.fonction];

  // Ce que la scène a le droit de dessiner à cette étape.
  const montre = useMemo<MontreRevolution>(
    () => ({
      coupe: issue && etape.controles.includes("tranche"),
      planDeCoupe: !issue && etape.controles.includes("tranche"),
      tranches: issue && etape.controles.includes("tranches"),
      cube: issue && etape.controles.includes("unite"),
    }),
    [issue, etape.controles]
  );

  const renduRef = useRef<SceneRevolution | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.orienter(angles.azimut, angles.elevation);
    s.mettreAJour(etat, montre);
    s.rendre();
    const e = s.etiquettes();
    poser(etiquetteX.current, e.x);
    poser(etiquetteY.current, e.y);
    // « f(x) » à gauche du milieu du rayon, jamais sur le trait.
    poser(etiquetteRayon.current, e.rayon);
    if (etiquetteRayon.current) etiquetteRayon.current.style.transform = `translate(${e.rayon.x}px, ${e.rayon.y}px) translate(calc(-100% - 8px), -50%)`;
    poser(etiquetteCube.current, e.cube);
    poser(repereCentre.current, e.centre);
    poser(repereBord.current, e.bord);
  }, [etat, angles, montre]);

  const rendu = useSceneRendu<SceneRevolution>(() => import("@/lib/scene3d/solide-revolution").then((m) => m.creerSceneRevolution), dessiner);
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

  // La fiche ne montre que ce que les étapes ont DÉJÀ établi : ses lignes
  // répondaient, dès l'étape 1, aux paris de la coupe (le disque, πf²) et de
  // l'unité (k³) — rien avant le pari, c'est par SCÈNE, pas par étape (revue
  // WAVE 2).
  // « Acquis » = l'étape qui l'établit a été RÉVÉLÉE — pas seulement dépassée :
  // un élève qui passe une étape sans parier ne reçoit pas sa réponse en prime.
  const acquis = (controle: string) => {
    const e = etapes.find((x) => x.controles.includes(controle));
    if (!e) return false;
    return e.pari ? pari.revelee(e.id, etape.id) : etapes.indexOf(e) <= indexEtape;
  };

  // ── Lectures (toutes calculées, jamais recopiées) ──
  const V = R.volume(F);
  const rayon = F.f(etat.x);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const balayageOuvert = etape.controles.includes("balayage");
  const partiel = balayageOuvert && etat.alpha < 360;
  const xTexte = R.nombre(etat.x);

  // Pendant le balayage, la phrase dit le volume BALAYÉ, comme la lecture —
  // deux volumes différents à l'écran au même instant, c'était deux réponses
  // à une seule question (revue WAVE 2).
  const issueTexte =
    (partiel
      ? `Balayée de ${etat.alpha}° sur 360°, la région a engendré ${R.enPi((V / Math.PI) * (etat.alpha / 360))} unités de volume ; au tour complet, V = π ∫ f(x)² dx = ${R.enPi(V / Math.PI)}. `
      : `Le solide engendré par ${F.texte} a pour volume V = π ∫ f(x)² dx = ${R.enPi(V / Math.PI)} unités de volume. `) +
    (montre.coupe || etape.controles.includes("tranche")
      ? `Sa coupe à l’abscisse ${xTexte} est un disque plein de rayon ${R.valeur(rayon)}, d’aire ${R.enPi(rayon * rayon)}.`
      : montre.cube
        ? `Dans un repère orthonormé d’unité ${etat.k} cm, 1 u.v. = ${etat.k ** 3} cm³ : V = ${R.enPi((V / Math.PI) * etat.k ** 3)} cm³.`
        : "");

  const description = useMemo(
    () =>
      `Scène en trois dimensions : la région sous la courbe de ${F.texte}, qui tourne autour de l’axe des abscisses — ` +
      (etat.alpha <= 0 ? "elle n’a pas encore tourné." : etat.alpha >= 360 ? "un tour complet." : `balayée de ${etat.alpha}° sur 360°.`) +
      (issue ? ` ${issueTexte}` : ""),
    [F.texte, etat.alpha, issue, issueTexte]
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

  const legende = etat.alpha <= 0 ? F.texte : etat.alpha >= 360 ? `${F.texte} — un tour complet` : `${F.texte} — balayée de ${etat.alpha}°`;

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-fonction={etat.fonction}
      data-alpha={etat.alpha}
      data-x={etat.x}
      data-n={etat.n}
      data-k={etat.k}
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
          legende={legende}
          messageSansWebgl="Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les paris, les réglages et les calculs restent justes ; la figure de la tranche, plus bas dans la leçon, en montre l’essentiel."
          onRelancer={rendu.relancer}
          vues={<VuesBloc vues={VUES} vue={vue} onVue={choisirVue} visibilite="hidden bp-expanded:flex" />}
        >
          <Etiquette refEl={etiquetteX} nom="x">
            <span className="font-normal italic text-secondary">x</span>
          </Etiquette>
          <Etiquette refEl={etiquetteY} nom="y">
            <span className="font-normal italic text-secondary">y</span>
          </Etiquette>
          <Etiquette refEl={etiquetteRayon} nom="rayon">
            <MathText>{"$f(x)$"}</MathText>
          </Etiquette>
          <Etiquette refEl={etiquetteCube} nom="cube" texte="1 u.v." />
          {/* Deux repères SANS texte — le centre de la coupe et le haut de son
              bord : l'élève ne voit rien ; la porte y lit, à l'échelle de
              l'écran, si le disque est un cercle et combien il pèse. */}
          <Etiquette refEl={repereCentre} nom="centre" texte="" />
          <Etiquette refEl={repereBord} nom="bord" texte="" />
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

          {ouvre("balayage") &&
            curseur("balayage", "Angle balayé : α =", `${etat.alpha}°`, 0, 360, R.PAS_BALAYAGE, etat.alpha, (x) => setEtat((s) => ({ ...s, alpha: x })))}
          {ouvre("tranche") &&
            curseur("tranche", "Abscisse de la coupe : x =", xTexte, F.a, R.xMaxGrille(F), R.PAS_TRANCHE, etat.x, (x) =>
              setEtat((s) => ({ ...s, x: R.xSurGrille(R.FONCTIONS[s.fonction], x) }))
            )}
          {ouvre("tranches") &&
            curseur("tranches", "Nombre de tranches :", `${etat.n}`, 1, R.TRANCHES_MAX, 1, etat.n, (x) => setEtat((s) => ({ ...s, n: Math.round(x) })))}
          {ouvre("unite") &&
            curseur("unite", "Unité du repère orthonormé :", `${etat.k} cm`, R.UNITE_MIN, R.UNITE_MAX, 1, etat.k, (x) => setEtat((s) => ({ ...s, k: Math.round(x) })))}

          {ouvre("fonction") && (
            <fieldset className="flex flex-col gap-1" data-controle="fonction">
              <legend className="mb-1 text-body-sm text-secondary">La fonction qui tourne</legend>
              {R.ORDRE_FONCTIONS.map((id) => (
                <label key={id} className={LIGNE_RADIO}>
                  <input
                    type="radio"
                    name={`${idTitre}-fonction`}
                    checked={etat.fonction === id}
                    onChange={() => setEtat((s) => ({ ...s, fonction: id, x: R.xSurGrille(R.FONCTIONS[id], s.x) }))}
                    className="accent-figure-ink-soft"
                  />
                  <MathText>{`$${R.FONCTIONS[id].ecriture}$ sur $${R.FONCTIONS[id].intervalle}$`}</MathText>
                </label>
              ))}
            </fieldset>
          )}

          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("aire_region") && ligneLecture("aire_region", <>Aire de la région (u.a.)</>, R.valeur(R.aireRegion(F)))}
              {lectures.includes("rayon") && ligneLecture("rayon", <MathText>{`Rayon de la coupe : $f(${xTexte.replace(",", "{,}")})$`}</MathText>, R.valeur(rayon))}
              {lectures.includes("aire_tranche") &&
                ligneLecture("aire_tranche", <MathText>{"Aire de la coupe : $\\pi f(x)^2$"}</MathText>, R.enPi(rayon * rayon))}
              {lectures.includes("volume") &&
                (partiel
                  ? ligneLecture("volume", <>Volume balayé (u.v.)</>, R.enPi((V / Math.PI) * (etat.alpha / 360)))
                  : ligneLecture("volume", <MathText>{"$V = \\pi\\int_a^b f(x)^2\\,\\mathrm{d}x$ (u.v.)"}</MathText>, R.enPi(V / Math.PI)))}
              {lectures.includes("verification_cone") &&
                etat.fonction === "cone" &&
                ligneLecture(
                  "verification_cone",
                  <MathText>{`Le cône : $\\dfrac{\\pi r^2 h}{3}$, $r = ${R.nombre(F.f(F.b))}$, $h = ${R.nombre(F.b - F.a)}$`}</MathText>,
                  R.enPi((F.f(F.b) ** 2 * (F.b - F.a)) / 3)
                )}
              {lectures.includes("volume_cm3") &&
                ligneLecture("volume_cm3", <>{`Volume en cm³ (1 u.v. = ${etat.k ** 3} cm³)`}</>, R.enPi((V / Math.PI) * etat.k ** 3))}
            </dl>
          )}

          {/* La fiche : la formule, la coupe, l'unité — après la révélation
              seulement, elle EST la réponse (§11.190). */}
          {issue && (
            <div className="rounded-lg border border-subtle px-4 py-3" data-fiche>
              <p className="mb-2 text-caption font-medium text-secondary">Le volume d’un solide de révolution</p>
              <div className="flex flex-col gap-1 text-body-sm text-primary">
                <MathText>{"$V = \\pi\\displaystyle\\int_a^b \\big(f(x)\\big)^2\\,\\mathrm{d}x$ en unités de volume"}</MathText>
                {acquis("tranche") && <MathText>{"La coupe à l'abscisse $x$ : un disque plein de rayon $f(x)$, d'aire $\\pi f(x)^2$"}</MathText>}
                {acquis("unite") && <MathText>{"Repère orthonormé d'unité $k$ cm : $1$ u.v. $= k^3$ cm³"}</MathText>}
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
