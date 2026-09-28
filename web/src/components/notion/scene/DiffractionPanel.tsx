"use client";

/**
 * DiffractionPanel — « le banc de diffraction » : un laser, une fente (ou un
 * cheveu), un écran avec sa règle, et le graphe L = f(D) du sujet national
 * 2021 (pc/propagation-onde-lumineuse, en tête de R3 ; spec
 * content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md).
 *
 * Le quatrième manipulable PLAN sur l'appareillage des scènes (ADR 0041) :
 * opt-in au clic, étapes, pari avant tout, un contrôle neuf par étape, porte
 * qui lit le rendu. Ni temps ni course : la lumière ne met rien de mesurable
 * à traverser deux mètres. Le verdict est immédiat, et la RÉVÉLATION pose le
 * réglage que le pari interrogeait (`etat_revele`) — c'est la scène qui montre
 * la réponse, sur la règle, avant le texte.
 *
 * UNE FORMULE CONSTRUITE EN TROIS TEMPS (spec §2.3) : S1 installe a, S2 ajoute
 * λ, S3 ajoute D. Le texte même de la relation est un état qui fuit — aucune
 * lecture, aucun libellé n'écrit « λ/a » avant S2 ni « 2λD » avant S3.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/diffraction-modele";
import type { Reglage, RenduDiffraction, VueBanc } from "@/lib/scene2d/diffraction-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatBanc {
  a: M.Fente;
  lambda: M.Laser;
  D: number;
  objet: M.Objet;
  vue: VueBanc;
  reference: "aucune" | "depart";
}

const borne = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));

function appliquer(e: Scene3DEtat | undefined, c: EtatBanc): EtatBanc {
  if (!e) return c;
  const a = String(e.a_mm ?? ""), l = String(e.lambda_nm ?? "");
  return {
    a: (M.FENTES as readonly string[]).includes(a) ? (a as M.Fente) : c.a,
    lambda: (M.LASERS as readonly string[]).includes(l) ? (l as M.Laser) : c.lambda,
    D: typeof e.D_m === "number" ? borne(M.surGrille(e.D_m, M.D_PAS, M.D_MIN), M.D_MIN, M.D_MAX) : c.D,
    objet: e.objet === "cheveu" ? "cheveu" : e.objet === "fente" ? "fente" : c.objet,
    vue: e.vue === "banc-et-graphe" ? "banc-et-graphe" : e.vue === "banc" ? "banc" : c.vue,
    reference: e.reference === "depart" ? "depart" : e.reference === "aucune" ? "aucune" : c.reference,
  };
}

const ETAT_DE_BASE: EtatBanc = { a: "0.200", lambda: "600", D: 2.0, objet: "fente", vue: "banc", reference: "aucune" };

const reglageDe = (e: EtatBanc): Reglage => ({ dim: M.dimension(e.objet, e.a), lambda: parseFloat(e.lambda), D: e.D, objet: e.objet });

const REPERES = [
  "laser", "fente", "objet-haut", "fente-bord-haut", "fente-bord-bas",
  "ecran", "ecran-haut", "bord-haut", "bord-bas",
  ...Array.from({ length: 21 }, (_, k) => `regle-${k}`),
  "cote-D-g", "cote-D-d", "ref-haut", "ref-bas", "rayon-haut", "rayon-bas", "crochet-L",
  "graphe-o", "graphe-D50", "graphe-D100", "graphe-D150", "graphe-D200",
  "graphe-L1", "graphe-L2", "graphe-L3", "graphe-L4", "graphe-L5",
  "point-0", "point-1", "point-2", "point-3", "point-4", "point-courant",
] as const;

const cm = (x: number) => `${M.troisCs(x)} cm`;
const metres = (D: number) => `${M.nombre(D, 2)} m`;
const radians = (x: number) => `${M.scientifique(x, 3)} rad`;

export function DiffractionPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatBanc>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatBanc>(etat);
  etatRef.current = etat;
  /** la révélation de CETTE entrée dans l'étape a-t-elle déjà posé son réglage ? */
  const reveleApplique = useRef(false);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    laser: useRef<HTMLSpanElement>(null),
    objet: useRef<HTMLSpanElement>(null),
    ecran: useRef<HTMLSpanElement>(null),
    regle: useRef<HTMLSpanElement>(null),
    coteD: useRef<HTMLSpanElement>(null),
    theta: useRef<HTMLSpanElement>(null),
    L: useRef<HTMLSpanElement>(null),
    ref: useRef<HTMLSpanElement>(null),
    grapheD: useRef<HTMLSpanElement>(null),
    grapheL: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit, en pixels,
  // la règle, la tache, l'éventail, le graphe.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const graphe = etat.vue === "banc-et-graphe";
  const libre = etape.controles.length > 1;
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  // λ n'est pas affichée à l'étape où elle est l'INCONNUE (S3) : ni lecture, ni description
  const lambdaConnue = (etape.lectures ?? []).includes("longueur-onde") || libre;

  // la révélation pose, UNE fois par entrée dans l'étape, le réglage que le pari
  // interrogeait — et le DIT : la fente cochée change, la description du canvas
  // aussi, et l'élève au lecteur d'écran n'entendait que le verdict (vague 2)
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const r = etape.etat_revele;
    if (!r) return;
    const s = appliquer(r, etatRef.current);
    setEtat(s);
    const Ls = cm(M.largeurTache(s.lambda, M.dimension(s.objet, s.a), s.D));
    const pose =
      r.objet !== undefined ? (s.objet === "cheveu" ? "met un cheveu à la place de la fente" : `remet la fente de ${M.ecrireFente(parseFloat(s.a))}`)
      : r.a_mm !== undefined ? `pose la fente de ${M.ecrireFente(parseFloat(s.a))}`
      : r.lambda_nm !== undefined ? `pose le laser de ${M.ecrireLaser(s.lambda)}`
      : r.D_m !== undefined ? `recule l’écran à ${metres(s.D)}`
      : "pose le réglage du pari";
    setAnnonce(`La scène ${pose} : la tache centrale mesure ${Ls}.`);
  }, [pari.phase, etape]);

  // ── Rendu ──
  const renduRef = useRef<RenduDiffraction | null>(null);
  const reference = etat.reference === "depart" ? reglageDe(appliquer(etape.etat, etat)) : null;
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({ courant: reglageDe(etat), vue: etat.vue, revele, reference });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    poser(refs.coteD.current, en("cote-D"), "-50%", "-50%");
    poser(refs.regle.current, en("regle-titre"), "-100%", "0%");
    poser(refs.grapheL.current, en("graphe-titre-L", graphe), "0%", "0%");
    // sous la rangée des nombres, calé à droite (le titre tombait sous « 200 »)
    poser(refs.grapheD.current, en("graphe-titre-D", graphe), "0%", "-100%");
    disposer(
      [
        // le laser se nomme SOUS son boîtier : au-dessus, sa place est celle de la
        // plaque (captures, 390 px : « laser » chevauchait « fente »)
        { el: refs.laser.current, p: en("laser", true), directions: [[0, 1], [0, 1.6], [0, -1]], portee: 18 },
        // le cheveu est sur l'axe, là où l'éventail et l'arc de θ s'ouvrent : son nom
        // va en haut à GAUCHE, au-dessus du faisceau incident (le laser se nomme
        // en dessous ; l'arc de θ, en haut à droite)
        { el: refs.objet.current, p: en("objet-haut"), directions: etat.objet === "fente" ? [[0, -1], [0, -1.6], [1, -1], [-1, -1]] : [[-1, -1], [-1, -1.6], [0, -1.6], [-1, 1]], portee: 18 },
        { el: refs.ecran.current, p: en("ecran-haut"), directions: [[0, -1], [-1, -1], [0, -1.6]], portee: 18 },
        { el: refs.theta.current, p: en("arc", revele), directions: [[1, -1], [1, 0], [0, -1], [1, -2]], portee: 18 },
        // « L » au-dessus de l'axe, « départ » en dessous (son repère est le BAS de
        // son crochet) : l'ordre ne s'échange jamais, même serrés sur l'axe
        { el: refs.L.current, p: en("crochet-L", revele), directions: [[-1, -1], [-1, 0], [0, -1]], portee: 18 },
        { el: refs.ref.current, p: en("ref", revele && !!p["ref"]), directions: [[-1, 1], [0, 1], [-1, 0]], portee: 18 },
      ],
      s.segments(),
      s.cadre(),
      [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, revele, graphe, indexEtape]);

  const rendu = useSceneRendu<RenduDiffraction>(() => import("@/lib/scene2d/diffraction-rendu").then((m) => m.creerRenduDiffraction), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      reveleApplique.current = false;
      setEtat((c) => appliquer(e.etat, c));
    },
    [etapes, pari, indexEtape]
  );

  // ── Les nombres (une seule voie : la relation) ──
  const dim = M.dimension(etat.objet, etat.a);
  const L = M.largeurTache(etat.lambda, dim, etat.D);
  const [b1, b2] = M.bords(L);
  const th = M.theta(etat.lambda, dim);
  const p = M.pente(L, etat.D);

  const regler = (patch: Partial<EtatBanc>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    const d = M.dimension(s.objet, s.a);
    const Ls = cm(M.largeurTache(s.lambda, d, s.D));
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image
    if (patch.a !== undefined) setAnnonce(`Fente de ${M.ecrireFente(parseFloat(s.a))} : la tache centrale mesure ${Ls}.`);
    else if (patch.lambda !== undefined) setAnnonce(`Laser de ${M.ecrireLaser(s.lambda)} : la tache centrale mesure ${Ls}.`);
    // le curseur porte L dans son `aria-valuetext` : une annonce EN PLUS le faisait
    // parler deux fois par cran, une phrase en retard sur la main (vague 2)
    else if (patch.objet !== undefined) setAnnonce(s.objet === "cheveu" ? `Un cheveu à la place de la fente : la tache centrale mesure ${Ls}.` : `La fente de ${M.ecrireFente(parseFloat(s.a))} : la tache centrale mesure ${Ls}.`);
    else if (patch.vue !== undefined) setAnnonce(s.vue === "banc-et-graphe" ? "Vue : le banc, et le graphe de L en fonction de D." : "Vue : le banc seul.");
  };

  if (rendu.panneau === "ferme") {
    return (
      <SceneOptIn
        sceneId={scene.scene}
        titre={scene.title}
        legende={scene.caption}
        onOuvrir={rendu.ouvrir}
        className={className}
        surtitre="Simulation"
        libelleOuvrir="Ouvrir le banc de diffraction"
      />
    );
  }

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode) => (
    <div key={cleL} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="ml-auto text-right tabular-nums text-primary" data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  const nomObjet = etat.objet === "fente" ? `une fente de ${M.ecrireFente(dim)}` : "un cheveu";
  const description =
    `Banc d’optique vu en coupe, largeurs dessinées dix fois plus grandes que les distances : un laser${lambdaConnue ? ` de ${M.ecrireLaser(etat.lambda)}` : ""}, ${nomObjet}, et un écran à ${metres(etat.D)} portant une règle graduée en centimètres. Sur l’écran, une tache centrale de ${cm(L)}, encadrée de taches plus petites.` +
    (revele ? ` Deux rayons partent de la fente vers les bords de la tache ; l’angle entre l’axe et un rayon vaut ${radians(th)}.` : "") +
    (graphe ? (revele ? " À côté, le graphe de L en fonction de D : cinq points alignés sur une droite qui passe par l’origine." : " À côté, une feuille quadrillée vide : L en fonction de D.") : "");

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lectures.includes("largeur-fente") &&
          (etat.objet === "fente"
            ? ligneLecture("largeur-fente", <MathText>{"Largeur de la fente, $a$"}</MathText>, M.ecrireFente(dim))
            : ligneLecture("largeur-fente", "Sur le trajet", "un cheveu"))}
        {lectures.includes("longueur-onde") && ligneLecture("longueur-onde", <MathText>{"Longueur d'onde du laser, $\\lambda$"}</MathText>, M.ecrireLaser(etat.lambda))}
        {lectures.includes("distance") && !ouvre("distance") && ligneLecture("distance", <MathText>{"Distance fente–écran, $D$"}</MathText>, metres(etat.D))}
        {lectures.includes("largeur-tache") && ligneLecture("largeur-tache", <MathText>{"Largeur de la tache centrale, $L$"}</MathText>, cm(L))}
        {lectures.includes("bords") && ligneLecture("bords", "Ses bords, lus sur la règle", `${M.nombre(b1, 2)} cm et ${M.nombre(b2, 2)} cm`)}
        {lectures.includes("ecart-angulaire") && ligneLecture("ecart-angulaire", <MathText>{"Demi-écart angulaire, $\\theta$"}</MathText>, radians(th))}
        {lectures.includes("theta-mesure") && ligneLecture("theta-mesure", <MathText>{"L'angle depuis la mesure, $L/(2D)$"}</MathText>, radians(M.thetaMesure(L, etat.D)))}
        {lectures.includes("rapport") &&
          ligneLecture("rapport", etat.objet === "fente" ? "La fente, en longueurs d'onde" : "Le cheveu, en longueurs d'onde", <MathText>{`${M.entier(M.rapport(dim, etat.lambda))} fois $\\lambda$`}</MathText>)}
        {/* la pente est celle d'une DROITE : sans le graphe à l'écran, elle ne nomme rien */}
        {lectures.includes("pente") && graphe && ligneLecture("pente", <MathText>{"Pente de la droite, $p = L/D$"}</MathText>, M.scientifique(p, 3))}
        {lectures.includes("lambda-deduite") && ligneLecture("lambda-deduite", <MathText>{"Longueur d'onde déduite, $\\lambda = p\\,a/2$"}</MathText>, `${M.entier(M.lambdaDeduite(p, dim))} nm`)}
        {lectures.includes("diametre-deduit") && etat.objet === "cheveu" &&
          ligneLecture("diametre-deduit", <MathText>{"Diamètre déduit, $d = 2\\lambda D/L$"}</MathText>, `${M.troisCs(M.diametreDeduit(etat.lambda, etat.D, L))} µm`)}
      </dl>
    ) : null;

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-a-mm={etat.a}
      data-lambda-nm={etat.lambda}
      data-d-m={etat.D.toFixed(2)}
      data-objet={etat.objet}
      data-vue={etat.vue}
      data-exageration={M.EXAGERATION}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Simulation
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} cle={etape.id} rang={{ index: indexEtape, total: etapes.length }} />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          legende={`Largeurs ×${M.EXAGERATION} · angles exagérés`}
          messageSansWebgl="Ce navigateur n’affiche pas le banc (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          // le graphe veut de la hauteur : carré PARTOUT — au téléphone, en 4:3, le
          // tracé n'avait que 61 px pour cinq nombres (vague 2) ; la marge du
          // focus suit la hauteur de la scène collante (MARGE_FOCUS_CARRE)
          format={graphe ? "carre-partout" : "paysage-haut"}
        >
          <Etiquette refEl={refs.laser} nom="nom-laser" texte="laser" fond />
          <Etiquette refEl={refs.objet} nom="nom-objet" texte={etat.objet === "fente" ? "fente" : "cheveu"} fond />
          <Etiquette refEl={refs.ecran} nom="nom-ecran" texte="écran" fond />
          <Etiquette refEl={refs.regle} nom="nom-regle" texte="cm" />
          <Etiquette refEl={refs.coteD} nom="nom-cote-D" fond>
            <MathText>{`$D = ${M.nombre(etat.D, 2).replace(",", "{,}")}$ m`}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.theta} nom="nom-theta" fond>
            <MathText>{"$\\theta$"}</MathText>
          </Etiquette>
          {/* L porte SA valeur, comme D : la scène collante reste sous les yeux quand
              on règle, la liste des lectures non — au téléphone, à l'étape libre,
              elle était à des centaines de pixels des pièces (vague 2, ergonomie) */}
          <Etiquette refEl={refs.L} nom="nom-L" fond>
            <MathText>{`$L = ${M.troisCs(L).replace(",", "{,}")}$ cm`}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.ref} nom="nom-ref" texte="départ" fond />
          <Etiquette refEl={refs.grapheL} nom="nom-graphe-L" texte="L (cm)" />
          <Etiquette refEl={refs.grapheD} nom="nom-graphe-D" texte="D (cm)" />
          {REPERES.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
          ))}
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", graphe ? MARGE_FOCUS_CARRE : MARGE_FOCUS)}>
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

          {/* à l'étape libre, quatre groupes de réglages : les lectures les PRÉCÈDENT —
              après eux, au téléphone, « L » était à ~850 px des pièces de fente,
              pour ~500 px visibles sous la scène collante (vague 2, ergonomie) */}
          {libre && blocLectures}

          {libre && pari.etapeOuverte && (
            <fieldset className="flex flex-col gap-1" data-vue-banc>
              <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Ce que la scène montre")}</legend>
              {(["banc", "banc-et-graphe"] as const).map((x) => (
                <label key={x} className={LIGNE_RADIO}>
                  <input type="radio" name={`${idTitre}-vue`} value={x} checked={etat.vue === x} onChange={() => regler({ vue: x })} className="accent-figure-ink-soft" />
                  {frenchTypography(x === "banc" ? "le banc seul" : "le banc et le graphe de L en fonction de D")}
                </label>
              ))}
            </fieldset>
          )}

          <div className="flex flex-col gap-5">
            {ouvre("fente") && (
              <fieldset className="flex flex-col gap-1" data-controle="fente">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("La fente (sept pièces)")}</legend>
                <div className="flex flex-wrap gap-x-1">
                  {M.FENTES.map((x) => (
                    <label key={x} className={LIGNE_RADIO}>
                      <input type="radio" name={`${idTitre}-fente`} value={x} checked={etat.a === x} onChange={() => regler({ a: x })} className="accent-figure-ink-soft" />
                      <span className="tabular-nums">{frenchTypography(M.ecrireFente(parseFloat(x)))}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {ouvre("couleur") && (
              <fieldset className="flex flex-col gap-1" data-controle="couleur">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Le laser")}</legend>
                <div className="flex flex-wrap gap-x-1">
                  {M.LASERS.map((x) => (
                    <label key={x} className={LIGNE_RADIO}>
                      <input type="radio" name={`${idTitre}-couleur`} value={x} checked={etat.lambda === x} onChange={() => regler({ lambda: x })} className="accent-figure-ink-soft" />
                      <span className="tabular-nums">{frenchTypography(M.ecrireLaser(x))}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {ouvre("distance") && (
              <label className="flex flex-col gap-1" data-controle="distance">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("La distance fente–écran :")} <span className="tabular-nums text-primary" aria-hidden="true">{frenchTypography(`D = ${metres(etat.D)}`)}</span>
                </span>
                <input
                  type="range"
                  min={M.D_MIN}
                  max={M.D_MAX}
                  step={M.D_PAS}
                  value={etat.D}
                  onChange={(e) => regler({ D: borne(M.surGrille(parseFloat(e.target.value), M.D_PAS, M.D_MIN), M.D_MIN, M.D_MAX) })}
                  aria-valuetext={`D = ${metres(etat.D)}, tache centrale de ${cm(L)}`}
                  className={CURSEUR}
                />
              </label>
            )}

            {ouvre("objet") && (
              <fieldset className="flex flex-col gap-1" data-controle="objet">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Sur le trajet du faisceau")}</legend>
                {(["fente", "cheveu"] as const).map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-objet`} value={x} checked={etat.objet === x} onChange={() => regler({ objet: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(x === "fente" ? `la fente de ${M.ecrireFente(parseFloat(etat.a))}` : "un cheveu, à la place exacte de la fente")}
                  </label>
                ))}
              </fieldset>
            )}
          </div>

          {!libre && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que ce banc simplifie">
                {frenchTypography(
                  `Largeurs ×${M.EXAGERATION} : sans cela, la tache serait plus fine qu’un trait. Les rapports sont exacts, les angles non — sur un vrai banc, le plus ouvert de cette scène vaut à peine plus d’un centième de radian. Le trait de la fente est un symbole : sa largeur dessinée ne change pas, le nombre à côté, si. Les taches voisines sont éclaircies pour rester visibles ; en vrai, elles sont environ vingt fois plus faibles. Banc idéal : les largeurs sont calculées ; sur un vrai montage, on lit la règle au millimètre près, et l’accord n’est jamais parfait.`
                )}
              </EncadreRepli>
            </div>
          )}
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite" data-annonce>
        {annonce}
      </p>
      <TransportEtapes index={indexEtape} total={etapes.length} onAller={allerA} idConsigne={idConsigne} />
    </section>
  );
}
