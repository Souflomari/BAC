"use client";

/**
 * CordePanel — « la corde : la photo et le film » : la relation
 * y_M(t) = y_S(t − τ), et les DEUX graphiques qu'on en tire
 * (pc/ondes-mecaniques-progressives, R3 ; spec
 * content/pc/ondes-mecaniques-progressives/spec-scene-corde.md).
 *
 * Le deuxième manipulable PLAN sur l'appareillage des scènes (ADR 0041,
 * addendum de la cuve à ondes) : opt-in au clic, étapes, pari avant tout, un
 * contrôle neuf par étape, porte qui lit le rendu — ni caméra, ni three.js. La
 * corde est ANALYTIQUE (`lib/scene2d/corde.ts`) : une translation, pas un
 * solveur. Montrée au ralenti déclaré (×5) : sa preuve est une forme et un
 * décalage, qui durent moins d'une demi-seconde. Avant le pari, la corde est
 * AU REPOS et les axes sont VIDES : rien de ce qui dépend de l'issue n'existe
 * (spec §7.6).
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as C from "@/lib/scene2d/corde";
import type { RenduCorde, Vue } from "@/lib/scene2d/corde-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS } from "./commun";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatCorde {
  d: number;
  geste: C.Geste;
  v: C.Vitesse;
  vue: Vue;
  instant: number;
  ecart: C.Ecart;
  reference: boolean;
}

/**
 * Où en est la course : au repos, la mesure, la fin. (L'étape 4 jouait d'abord
 * l'ancien geste, effaçait la corde, puis jouait le nouveau : 5,5 s avant le
 * verdict, dont une demi-seconde où rien ne bougeait. Vague 2 : la comparaison
 * est portée par la COURBE de référence, tracée en tirets dès le départ de la
 * course ; une seule course.)
 */
type Phase = "repos" | "mesure" | "finie";

const borne = (x: number, a: number, b: number) => Math.min(b, Math.max(a, x));
const estGeste = (v: unknown): v is C.Geste => C.GESTES.includes(v as C.Geste);
const estVue = (v: unknown): v is Vue => v === "film" || v === "photo" || v === "photos";

function appliquer(e: Scene3DEtat | undefined, courant: EtatCorde): EtatCorde {
  if (!e) return courant;
  const ecart = Number(e.camera_n);
  return {
    d: typeof e.d_m === "number" ? borne(C.surGrille(e.d_m, C.D_PAS, C.D_MIN), C.D_MIN, C.D_MAX) : courant.d,
    geste: estGeste(e.geste) ? e.geste : courant.geste,
    v: e.v_ms === "8" ? 8 : e.v_ms === "4" ? 4 : courant.v,
    vue: estVue(e.vue) ? e.vue : courant.vue,
    instant: typeof e.instant_s === "number" ? borne(C.surGrille(e.instant_s, C.T_PAS, C.T_MIN), C.T_MIN, C.T_MAX) : courant.instant,
    ecart: (C.ECARTS as readonly number[]).includes(ecart) ? (ecart as C.Ecart) : courant.ecart,
    reference: e.reference === "rampe",
  };
}

const ETAT_DE_BASE: EtatCorde = { d: 1.2, geste: "bosse", v: 4, vue: "film", instant: 0.25, ecart: 4, reference: false };
/** Le geste de la courbe de référence de l'étape 4 (spec §5.3). */
const GESTE_REFERENCE: C.Geste = "rampe";
/** La durée de la course quand l'étape compare à une référence (s de corde, spec §6). */
const DUREE_PHASE = 0.5;

/** Jusqu'où va la course, en s de corde : le film entier, l'instant de la photo, ou la seconde photo. */
function finCourse(e: EtatCorde): number {
  if (e.vue === "photo") return e.instant;
  if (e.vue === "photos") return C.instantPhoto(C.PHOTO_A + e.ecart);
  return e.reference ? DUREE_PHASE : C.T_FILM;
}

const REPERES = [
  "corde-x0", "corde-x1", "corde-x2", "corde-x3", "corde-x4", "corde-1cm", "corde-front", "S", "M", "M-axe",
  "encart-x0", "encart-x4", "encart-1cm",
  "film-t0", "film-t1", "film-y0", "film-ymax", "film-depart-S", "film-depart-M", "film-yS", "film-yM", "tau-debut", "tau-fin", "depart-commun",
  "pente-haut", "pente-bas",
  "cliche-a-x0", "cliche-a-x4", "cliche-a-1cm", "cliche-a-front", "cliche-b-x0", "cliche-b-x4", "cliche-b-1cm", "cliche-b-front",
] as const;

/** Le système demande-t-il moins de mouvement ? (lu au montage, et suivi) */
function useMouvementReduit() {
  const [reduit, setReduit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduit(mq.matches);
    const suivre = () => setReduit(mq.matches);
    mq.addEventListener?.("change", suivre);
    return () => mq.removeEventListener?.("change", suivre);
  }, []);
  return reduit;
}

export function CordePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatCorde>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [phase, setPhase] = useState<Phase>("repos");
  const [enLecture, setEnLecture] = useState(false);
  const [tCorde, setTCorde] = useState(0);
  const [facteur, setFacteur] = useState(1);
  /** étape 4 : jusqu'où le film de la référence a été tracé (null : pas de référence) */
  const [refJusqua, setRefJusqua] = useState<number | null>(null);
  /** après une course : le film est tracé jusqu'à la fin de la course, même quand la corde montre un instant antérieur */
  const [traceFin, setTraceFin] = useState(0);
  const [rapide, setRapide] = useState(false);
  const rapideRef = useRef(false);
  const mouvementReduit = useMouvementReduit();
  const tRef = useRef(0);
  const [annonce, setAnnonce] = useState("");
  const etatRef = useRef<EtatCorde>(etat);
  const phaseRef = useRef<Phase>(phase);
  etatRef.current = etat;
  phaseRef.current = phase;

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    S: useRef<HTMLSpanElement>(null),
    M: useRef<HTMLSpanElement>(null),
    axeX: useRef<HTMLSpanElement>(null),
    axeT: useRef<HTMLSpanElement>(null),
    axeY: useRef<HTMLSpanElement>(null),
    yS: useRef<HTMLSpanElement>(null),
    yM: useRef<HTMLSpanElement>(null),
    tau: useRef<HTMLSpanElement>(null),
    depart: useRef<HTMLSpanElement>(null),
    front: useRef<HTMLSpanElement>(null),
    geste: useRef<HTMLSpanElement>(null),
    photoA: useRef<HTMLSpanElement>(null),
    photoB: useRef<HTMLSpanElement>(null),
    regle: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit, en pixels,
  // les graduations, la main, M, le front, les départs des deux courbes.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : il attend la course entière ──
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const finie = phase === "finie";
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: finie });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const revele = pari.phase === "revele" || pari.phase === "aucun";

  const tau = C.retard(etat.d, etat.v);
  const anime = phase !== "repos";
  const tA = C.instantPhoto(C.PHOTO_A), tB = C.instantPhoto(C.PHOTO_A + etat.ecart);
  const cliches = etat.vue === "photos" && finie ? { tA, tB, nA: C.PHOTO_A, nB: C.PHOTO_A + etat.ecart } : null;
  const yMaxFilm = etat.reference || etat.geste === "rampe-haute" || etape.controles.includes("geste") ? 6 : 3;

  // ── Rendu ──
  const renduRef = useRef<RenduCorde | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    const enCourse = phase === "mesure";
    s.mettreAJour({
      vue: etat.vue,
      geste: etat.geste,
      v: etat.v,
      d: etat.d,
      t: tCorde,
      anime,
      trace: etat.vue === "film" ? (enCourse ? tCorde : finie ? traceFin : null) : null,
      reference: etat.vue === "film" && refJusqua !== null ? { geste: GESTE_REFERENCE, jusqua: refJusqua } : null,
      yMaxFilm,
      revele: revele && finie,
      repereTau: etat.vue === "film" && !etat.reference,
      departCommun: etat.reference,
      // l'encart à l'échelle vraie sert l'étape 1, et elle seule (vague 2 : il
      // revenait aux étapes 4 et 5, qu'aucun texte n'y rapportait) ; sa place
      // est réservée toute l'étape, pour que le film ne saute pas au verdict
      encart: etat.vue === "film" && indexEtape === 0,
      encartVrai: etat.vue === "film" && indexEtape === 0 && finie && revele,
      coteFront: etat.vue === "photo" || etape.controles.includes("instant"),
      cliches,
      regleMesure: true,
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const etroit = s.cadre().largeur < 480;
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    // les étiquettes FIXES : elles nomment l'appareil, elles ne répondent à rien
    // « x (m) » sous la règle graduée : celle de la corde, ou, en vue « photos »,
    // celle de la seconde photo (la corde du haut n'y porte pas de nombres)
    const regleX = etat.vue === "photos" ? p["cliche-b-x4"] : p["corde-x4"];
    poser(refs.axeX.current, regleX ? (etat.vue === "photos" ? { x: regleX.x - 34, y: regleX.y + 16, visible: !etroit } : { x: regleX.x - 14, y: regleX.y + 22, visible: !etroit }) : cache);
    poser(refs.geste.current, en("geste-titre"), "-100%");
    poser(refs.photoA.current, en("cliche-a-titre"), "0%", "-100%");
    poser(refs.photoB.current, en("cliche-b-titre"), "0%", "-100%");
    // celles qui BOUGENT avec la corde et les courbes : posées sans se chevaucher
    // les titres d'axes d'abord, à leur place (aucune direction essayée) : les
    // étiquettes qui bougent les évitent (premier passage : « y (cm) » sous « y_S »)
    const fixe: readonly (readonly [number, number])[] = [];
    disposer(
      [
        { el: refs.axeT.current, p: p["film-t1"] ? { x: p["film-t1"].x - 10, y: p["film-t1"].y - 14, visible: true } : cache, surAncre: true, directions: fixe },
        { el: refs.axeY.current, p: p["film-ymax"] ? { x: p["film-ymax"].x - 4, y: p["film-ymax"].y - 16, visible: true } : cache, surAncre: true, directions: fixe },
        // « S » à gauche de la main ; sous elle si la légende occupe la place
        { el: refs.S.current, p: p["S"] ? { x: p["S"].x - 10, y: p["S"].y, visible: true } : cache, surAncre: true, directions: [[0, 1.8]] },
        // « M » au-dessus de l'anneau ; dessous, ou de côté, quand M est haut
        { el: refs.M.current, p: p["M"] ?? cache, directions: [[0, -1], [0, 1], [1, -1], [-1, -1]] },
        { el: refs.yS.current, p: en("film-yS"), directions: [[-1, -1], [0, -1], [-1, 0], [1, -1], [1, 0]] },
        { el: refs.yM.current, p: en("film-yM", revele && finie), directions: [[1, -1], [1, 0], [0, -1]] },
        { el: refs.tau.current, p: en("tau"), surAncre: true },
        { el: refs.depart.current, p: en("depart-commun"), directions: [[1, 0], [1, 1]] },
        { el: refs.front.current, p: en("cote-front"), surAncre: true, directions: [[1, 1], [-1, 1]] },
        { el: refs.regle.current, p: en("regle-mesure"), surAncre: true },
      ],
      s.segments(),
      s.cadre(),
      // la légende du plateau (opaque) et l'anneau de M : aucune étiquette dessous
      [boiteLegende(rendu.hoteRef.current), p["M"] ? { x0: p["M"].x - 8, y0: p["M"].y - 8, x1: p["M"].x + 8, y1: p["M"].y + 8 } : null].filter(
        (b): b is NonNullable<typeof b> => b !== null
      )
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, phase, tCorde, traceFin, refJusqua, revele, finie, anime, yMaxFilm, lectures.join(",")]);

  const rendu = useSceneRendu<RenduCorde>(() => import("@/lib/scene2d/corde-rendu").then((m) => m.creerRenduCorde), dessiner, {
    surPerte: () => setEnLecture(false),
  });
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Changer de réglage ──
  const auRepos = useCallback((annoncer = true) => {
    if (annoncer && phaseRef.current !== "repos") setAnnonce("La corde est remise au repos : relance la main pour voir la secousse.");
    setEnLecture(false);
    setPhase("repos");
    setTCorde(0);
    tRef.current = 0;
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setEtat((c) => appliquer(e.etat, c));
      setRefJusqua(null);
      auRepos(false);
    },
    [etapes, pari, indexEtape, auRepos]
  );

  // ── La course ──
  const demarrer = (sansAnimation = mouvementReduit) => {
    const e = etatRef.current;
    rapideRef.current = sansAnimation;
    setRapide(sansAnimation);
    tRef.current = 0;
    setTCorde(0);
    setAnnonce(sansAnimation ? "La corde est calculée sans animation." : e.reference ? "La main donne le nouveau geste ; l’ancien est tracé en tirets." : "La main donne sa secousse.");
    // l'étape 4 : la courbe de l'ancien geste est tracée ENTIÈRE, en tirets, dès
    // le départ (après le pari : rien n'existe avant) ; seul le nouveau geste court
    if (e.reference) setRefJusqua(DUREE_PHASE);
    setPhase("mesure");
    setEnLecture(true);
  };

  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    // Le facteur de temps se mesure contre l'HORLOGE, par fenêtres d'une
    // demi-seconde (leçon de la cuve : un onglet ralenti ne doit pas se lire
    // comme un appareil qui suit).
    let cordeFenetre = 0;
    let murFenetre = 0;
    const terminer = (t: number) => {
      tRef.current = t;
      setTCorde(t);
      setTraceFin(t);
      setPhase("finie");
      setEnLecture(false);
      const e = etatRef.current;
      // la corde montre l'instant final : le curseur de l'instant le dit aussi
      if (e.vue === "film") setEtat((x) => ({ ...x, instant: C.surGrille(t, C.T_PAS, C.T_MIN) }));
      setAnnonce(
        e.vue === "photo"
          ? `Photo prise à t = ${C.nombre(t, 2)} s.`
          : e.vue === "photos"
            ? `Les deux photos sont prises, n°${C.PHOTO_A} et n°${C.PHOTO_A + e.ecart}.`
            : `Course terminée : image arrêtée à t = ${C.nombre(t, 2)} s ; la corde continuerait, le bout lointain absorbe.`
      );
    };
    const image = (maintenant: number) => {
      const dtReel = avant === null ? 0 : (maintenant - avant) / 1000;
      avant = maintenant;
      const ph = phaseRef.current;
      const e = etatRef.current;
      if (ph === "mesure") {
        const finPhase = finCourse(e);
        if (rapideRef.current) {
          // sans animation : l'image finale, tout de suite
          terminer(finPhase);
          return;
        } else {
          // un trou de plus de 2 s n'est pas la lenteur de l'appareil : l'onglet était caché
          const dt = Math.min(0.1, dtReel);
          const avance = dt / C.RALENTI;
          tRef.current = Math.min(finPhase, tRef.current + avance);
          if (dtReel > 0 && dtReel < 2) {
            murFenetre += dtReel;
            cordeFenetre += avance;
          }
          if (murFenetre >= 0.5) {
            setFacteur(Math.min(1, (cordeFenetre * C.RALENTI) / murFenetre));
            murFenetre = 0;
            cordeFenetre = 0;
          }
          setTCorde(tRef.current);
          if (tRef.current >= finPhase - 1e-12) {
            terminer(finPhase);
            return;
          }
        }
      }
      id = requestAnimationFrame(image);
    };
    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  const regler = (patch: Partial<EtatCorde>) => {
    const suivant = { ...etatRef.current, ...patch };
    setEtat(suivant);
    if (phaseRef.current === "finie") {
      // la corde est analytique : après une course, un réglage montre tout de
      // suite son image finale — relancer rejoue la course
      // l'instant règle la CORDE, dans les deux vues qui la montrent seule (la
      // photo, et le film de l'étape libre) : la bande du haut est alors la
      // photo prise à cet instant (critique pédagogique : à l'étape 5, le
      // curseur ne bougeait rien)
      const t = patch.instant !== undefined && suivant.vue !== "photos" ? suivant.instant : finCourse(suivant);
      // un réglage de la corde (pas de l'instant) refait tout le film
      if (patch.instant === undefined) setTraceFin(finCourse(suivant));
      tRef.current = t;
      setTCorde(t);
    } else if (phaseRef.current !== "repos") auRepos();
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
        libelleOuvrir="Ouvrir la corde"
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
  const aMesurer = "lance la course pour mesurer";
  const g = C.GESTE[etat.geste];
  /** l'instant que la corde montre après une course (et seulement alors) */
  const tPhoto = finie ? tCorde : etat.instant;
  const frontA = C.front(etat.v, tA), frontB = C.front(etat.v, tB);
  const mesureV = (frontB - frontA) / (tB - tA);
  const ralentiReel = Math.round(C.RALENTI / Math.max(0.05, facteur));
  const libelleLancer = enLecture ? "Pause" : finie ? "Relancer" : phase === "repos" ? (etat.vue === "photos" ? "Lancer la caméra" : "Lancer la main") : "Reprendre";
  const description =
    `Corde tendue de 4 m vue de côté, élongation dilatée 20 fois : la main S à gauche, le point M à ${C.m(etat.d)} de S.` +
    (etat.vue === "film" ? " Dessous, les axes du film : le temps en abscisse, l’élongation en ordonnée." : etat.vue === "photo" ? " La corde sera photographiée ; dessous, en petit, le geste de la main." : " Dessous, les deux photos de la caméra.") +
    (phase === "repos" ? " La corde est au repos." : finie ? ` Image arrêtée à t = ${C.nombre(tCorde, 2)} s.` : "");

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-d-m={etat.d}
      data-v-ms={etat.v}
      data-geste={etat.geste}
      data-vue={etat.vue}
      data-instant-s={etat.instant}
      data-camera-n={etat.ecart}
      data-reference={etat.reference ? "rampe" : "aucune"}
      data-t={Math.round(tCorde * 10000) / 10000}
      data-phase={phase}
      data-course-finie={finie ? "oui" : "non"}
      data-pari={pari.phase}
      data-facteur-temps={facteur.toFixed(2)}
      data-exageration={C.EXAGERATION}
      data-tau-pas={tau / C.DT}
      data-instant-pas={etat.instant / C.DT}
      data-geste-pas={g.duree / C.DT}
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
          legende={`Corde · ralenti ×${C.RALENTI} · verticale ×${C.EXAGERATION}`}
          messageSansWebgl="Ce navigateur n’affiche pas la corde (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          format="paysage-haut"
        >
          <Etiquette refEl={refs.S} nom="lettre-S" texte="S" />
          <Etiquette refEl={refs.M} nom="lettre-M" texte="M" />
          <Etiquette refEl={refs.axeX} nom="axe-x" texte="x (m)" />
          <Etiquette refEl={refs.axeT} nom="axe-t" texte="t (s)" />
          <Etiquette refEl={refs.axeY} nom="axe-y" texte="y (cm)" />
          <Etiquette refEl={refs.yS} nom="y-S" fond>
            <MathText>{"$y_S$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.yM} nom="y-M" fond>
            <MathText>{"$y_M$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.tau} nom="tau" fond>
            <MathText>{`$\\tau = ${C.nombre(tau, 2).replace(",", "{,}")}\\ \\text{s}$`}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.depart} nom="depart-commun" texte={`départ : ${C.s(tau)}`} fond />
          <Etiquette refEl={refs.front} nom="front" texte={`front : ${C.m(C.front(etat.v, tPhoto), 2)}`} fond />
          <Etiquette refEl={refs.geste} nom="geste">
            <MathText>{"le geste de $S$ : $y_S(t)$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.photoA} nom="photo-a" texte={`photo n°${C.PHOTO_A} · t = ${C.s(tA)}`} />
          <Etiquette refEl={refs.photoB} nom="photo-b" texte={`photo n°${C.PHOTO_A + etat.ecart} · t = ${C.s(tB)}`} />
          <Etiquette refEl={refs.regle} nom="regle" texte={`avance : ${C.m(frontB - frontA, 2)}`} fond />
          {REPERES.map((n) => (
            <Etiquette key={n} refEl={repRefs.current[n]} nom={n} texte="" />
          ))}
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
              invitation={etat.vue === "photos" ? "Lance la caméra et regarde : la corde répond d'abord." : "Lance la main et regarde : la corde répond d'abord."}
            />
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La course de la corde">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  data-lancer
                  onClick={() => {
                    if (enLecture) setEnLecture(false);
                    else if (phase === "repos" || phase === "finie") demarrer();
                    else setEnLecture(true);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {libelleLancer}
                </button>
                {/* Toujours MONTÉ, jamais inerte (vague 2) : il se démontait sous
                    le focus à la fin de la course qu'il abrégeait (focus à <body>),
                    et « Repos » sautait de place à chaque course. Pendant une
                    course, il l'abrège ; au repos ou après, il en donne l'image
                    finale sans la jouer — relancer dix fois ne coûte plus dix
                    fois cinq secondes. */}
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  data-image-finale
                  onClick={() => {
                    if (phase === "repos" || phase === "finie") demarrer(true);
                    else {
                      rapideRef.current = true;
                      setRapide(true);
                      setEnLecture(true);
                    }
                  }}
                >
                  <span>Image finale</span>
                </button>
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  onClick={() => {
                    if (phase !== "repos") auRepos();
                  }}
                  aria-disabled={phase === "repos" || undefined}
                  aria-label="Remettre la corde au repos"
                >
                  <Icon name="reset" size={13} />
                  <span>Repos</span>
                </button>
              </div>
              <p className="text-caption text-secondary" data-temps-corde>
                {frenchTypography(rapide && enLecture ? `Calcul sans animation : t = ${C.nombre(tCorde, 2)} s de corde.` : `Temps de corde : t = ${C.nombre(tCorde, 2)} s.`)}
              </p>
              {indexEtape === 0 && (
                <p className="text-caption text-secondary">{frenchTypography("Après une course, un réglage montre tout de suite sa nouvelle image ; « Relancer », ou Entrée sur un réglage, rejoue la course.")}</p>
              )}
            </div>
          )}

          <div
            className="flex flex-col gap-5"
            onKeyDown={(ev) => {
              // Entrée sur un réglage relance la course
              if (ev.key === "Enter" && (ev.target as HTMLElement).tagName === "INPUT" && pari.tempsOuvert && !enLecture) {
                ev.preventDefault();
                demarrer();
              }
            }}
          >
            {ouvre("point_m") && (
              <label className="flex flex-col gap-1" data-controle="point_m">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("Le point M, à la distance de S :")} <span className="tabular-nums text-primary" aria-hidden="true">{frenchTypography(`d = ${C.m(etat.d)}`)}</span>
                </span>
                <input
                  type="range"
                  min={C.D_MIN}
                  max={C.D_MAX}
                  step={C.D_PAS}
                  value={etat.d}
                  onChange={(e) => regler({ d: borne(C.surGrille(parseFloat(e.target.value), C.D_PAS, C.D_MIN), C.D_MIN, C.D_MAX) })}
                  aria-valuetext={`M à ${C.m(etat.d)} de S`}
                  className={CURSEUR}
                />
              </label>
            )}

            {ouvre("instant") && (
              <label className="flex flex-col gap-1" data-controle="instant">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("L’instant de la photo :")} <span className="tabular-nums text-primary" aria-hidden="true">{frenchTypography(`t₁ = ${C.s(etat.instant)}`)}</span>
                </span>
                <input
                  type="range"
                  min={C.T_MIN}
                  max={C.T_MAX}
                  step={C.T_PAS}
                  value={etat.instant}
                  onChange={(e) => regler({ instant: borne(C.surGrille(parseFloat(e.target.value), C.T_PAS, C.T_MIN), C.T_MIN, C.T_MAX) })}
                  aria-valuetext={`photo à ${C.s(etat.instant)}`}
                  className={CURSEUR}
                />
              </label>
            )}

            {ouvre("camera") && (
              <fieldset className="flex flex-col gap-1" data-controle="camera">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("L’écart entre les deux photos gardées")}</legend>
                {C.ECARTS.map((n) => (
                  <label key={n} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-camera`} value={n} checked={etat.ecart === n} onChange={() => regler({ ecart: n })} className="accent-figure-ink-soft" />
                    {frenchTypography(`photos n°${C.PHOTO_A} et n°${C.PHOTO_A + n} — ${n} intervalle${n > 1 ? "s" : ""}`)}
                  </label>
                ))}
              </fieldset>
            )}

            {ouvre("geste") && (
              <fieldset className="flex flex-col gap-1" data-controle="geste">
                <legend className="mb-1 text-body-sm text-secondary">Le geste de la main</legend>
                {C.GESTES.map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-geste`} value={x} checked={etat.geste === x} onChange={() => regler({ geste: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(`${C.GESTE[x].nom} — ${C.cm(C.GESTE[x].amplitudeCm)} en ${C.s(C.GESTE[x].montee)}`)}
                  </label>
                ))}
              </fieldset>
            )}

            {ouvre("tension") && (
              <fieldset className="flex flex-col gap-1" data-controle="tension">
                <legend className="mb-1 text-body-sm text-secondary">La corde</legend>
                {C.VITESSES.map((v) => (
                  <label key={v} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-tension`} value={v} checked={etat.v === v} onChange={() => regler({ v })} className="accent-figure-ink-soft" />
                    {frenchTypography(v === 4 ? "la corde du cours — célérité 4,0 m/s" : "la corde plus tendue — célérité 8,0 m/s")}
                  </label>
                ))}
              </fieldset>
            )}
          </div>

          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {lectures.includes("distance") && ligneLecture("distance", "Distance de S à M", C.m(etat.d))}
              {lectures.includes("celerite") && ligneLecture("celerite", "Célérité, fixée par la corde", C.ms(etat.v))}
              {lectures.includes("retard") && ligneLecture("retard", <MathText>{"Retard de $M$, $\\tau = d/v$"}</MathText>, C.s(tau))}
              {lectures.includes("instant") &&
                ligneLecture(
                  "instant",
                  etat.vue === "photos" ? "Instants des deux photos" : "Instant de la photo",
                  etat.vue === "photos" ? `n°${C.PHOTO_A} : ${C.s(tA)} · n°${C.PHOTO_A + etat.ecart} : ${C.s(tB)}` : finie ? C.s(tCorde) : aMesurer
                )}
              {lectures.includes("front") &&
                ligneLecture(
                  "front",
                  "Front, le point le plus avancé qui bouge",
                  etat.vue === "photos" ? (finie ? `${C.m(frontA, 2)} puis ${C.m(frontB, 2)}` : aMesurer) : finie ? C.m(C.front(etat.v, tCorde), 2) : aMesurer
                )}
              {lectures.includes("elongation-M") && ligneLecture("elongation-M", <MathText>{"Élongation de $M$, maintenant"}</MathText>, finie ? C.cm(C.elongation(etat.geste, etat.v, etat.d, tCorde)) : aMesurer)}
              {lectures.includes("duree-geste") && ligneLecture("duree-geste", "Durée du geste de la main", C.s(g.duree))}
              {lectures.includes("vitesse-M") &&
                ligneLecture(
                  "vitesse-M",
                  <MathText>{"Vitesse moyenne de $M$ pendant sa montée (hauteur ÷ durée)"}</MathText>,
                  `${C.ms(C.vitesseM(etat.geste), 2)} — ${C.cm(g.amplitudeCm)} en ${C.s(g.montee)}${etat.reference && etat.geste !== "rampe" ? ` (la référence : ${C.ms(C.vitesseM("rampe"), 2)})` : ""}`
                )}
              {lectures.includes("mesure-v") &&
                ligneLecture(
                  "mesure-v",
                  "Célérité mesurée sur les deux photos",
                  finie ? `(${C.nombre(frontB, 2)} − ${C.nombre(frontA, 2)}) m ÷ ${C.nombre(tB - tA, 2)} s = ${C.ms(mesureV)}` : aMesurer
                )}
            </dl>
          )}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              {finie && (
                <p className="text-caption text-secondary" data-fin-course>
                  {frenchTypography(
                    `${etat.vue === "photo" ? "La corde est figée à l’instant de la photo." : etat.vue === "photos" ? "Les deux photos sont prises ; la corde continuerait." : "Image arrêtée : la corde continuerait, le bout lointain absorbe."}${ralentiReel > C.RALENTI ? ` Sur cet appareil, la course a tourné au ralenti ×${ralentiReel}.` : ""}`
                  )}
                </p>
              )}
              <details className="text-caption text-secondary">
                <summary className="cursor-pointer select-none">{frenchTypography("Corde idéalisée : ce que cette corde simplifie")}</summary>
                <p className="mt-1">
                  {frenchTypography(
                    "Échelle verticale dilatée 20 fois : sans cela, une secousse de 3 cm sur 4 m de corde serait invisible — aucune pente lue à l’écran n’a donc de sens. Ralenti 5 fois : en vrai, tout ce que tu vois ici dure une seconde. L’extrémité lointaine est amortie : aucune onde ne revient. La corde est idéale — ni amortissement, ni dispersion : la secousse avance sans changer de forme."
                  )}
                </p>
              </details>
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
