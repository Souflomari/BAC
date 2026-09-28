"use client";

/**
 * TremplinPanel — « le tremplin circulaire » : la moto du sujet national 2019 N
 * sur sa piste, et la base de Freinet (pc/lois-de-newton, R3, avant l'énoncé
 * de la deuxième loi ; spec
 * content/pc/lois-de-newton/spec-scene-tremplin.md).
 *
 * Le cinquième manipulable PLAN sur l'appareillage des scènes (ADR 0041) :
 * opt-in au clic, étapes, pari avant tout, un contrôle neuf par étape, une
 * COURSE — la moto part 9,0 m avant B et s'arrête en B, où la composante
 * normale APPARAÎT : c'est la scène qui répond, avant le texte.
 *
 * LE VECTEUR ACCÉLÉRATION N'A AUCUNE EXISTENCE D'ÉNONCÉ (spec §7.6) : avant
 * l'engagement, aucune flèche d'accélération, aucun u_N, aucun centre, aucun
 * pixel d'accent — même sur la droite, même quand il est non nul.
 *
 * `etat_revele`, DANS UNE SCÈNE À COURSE : le réglage que le pari décrit
 * (vitesse, rayon, régime) est posé à l'ENGAGEMENT — la course qui répond doit
 * courir dans ce réglage-là ; le repère (`entree`), à la RÉVÉLATION — c'est là
 * que la course s'arrête.
 *
 * UNE RELATION CONSTRUITE EN QUATRE TEMPS (spec §2.3) : S1 l'existence et la
 * direction de la composante normale, S2 le carré de v, S3 a_N = v²/R, S4
 * la relation entière et a·v. Aucun libellé, aucune lecture n'écrit une forme
 * avant son étape.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TRANSPORT_BTN_CLASS } from "../TransportButton";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/tremplin-modele";
import type { Reglage, RenduTremplin } from "@/lib/scene2d/tremplin-rendu";
import { GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatTremplin {
  v: M.Vitesse;
  R: M.Rayon;
  regime: M.Regime;
  repere: M.Repere;
  reference: "aucune" | "depart";
}

type Phase = "repos" | "course" | "finie";

function appliquer(e: Scene3DEtat | undefined, c: EtatTremplin, sansRepere = false): EtatTremplin {
  if (!e) return c;
  const v = String(e.v_ms ?? ""), R = String(e.R_m ?? ""), reg = String(e.regime ?? ""), rep = String(e.repere ?? "");
  return {
    v: (M.VITESSES as readonly string[]).includes(v) ? (v as M.Vitesse) : c.v,
    R: (M.RAYONS as readonly string[]).includes(R) ? (R as M.Rayon) : c.R,
    regime: (M.REGIMES as readonly string[]).includes(reg) ? (reg as M.Regime) : c.regime,
    repere: !sansRepere && (M.REPERES as readonly string[]).includes(rep) ? (rep as M.Repere) : c.repere,
    reference: e.reference === "depart" ? "depart" : e.reference === "aucune" ? "aucune" : c.reference,
  };
}

const ETAT_DE_BASE: EtatTremplin = { v: "18", R: "20", regime: "tenue", repere: "approche", reference: "aucune" };

const reglageDe = (e: EtatTremplin): Reglage => ({ vB: +e.v, R: +e.R, regime: e.regime });

const REPERES_PORTE = [
  "depart", "B", "C", "G", "uT-bout", "uN-bout", "a-bout", "aT-bout", "aN-bout", "centre", "rayon-bout", "ref",
  "temoin-m-g", "temoin-m-d", "temoin-a-g", "temoin-a-d",
  ...Array.from({ length: 21 }, (_, k) => `arc-${k}`),
] as const;

/** Le système demande-t-il moins de mouvement ? */
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

const ms = (x: number) => `${M.troisCs(x)} m·s⁻¹`;
const ms2 = (x: number) => `${M.troisCs(x)} m·s⁻²`;
const LIEU: Record<M.Repere, string> = {
  approche: "sur la droite, 6,0 m avant B",
  entree: "à l’entrée du tremplin, en B",
  milieu: "au milieu du tremplin",
  sortie: "au bout du tremplin, en C",
};
const PILOTAGE: Record<M.Regime, string> = { gaz: "il garde les gaz", tenue: "il tient sa vitesse", freinage: "il freine" };

/** La boîte du tableau de bord (un obstacle pour les étiquettes, comme la légende). */
function boiteTableau(hote: HTMLElement | null) {
  const l = hote?.querySelector<HTMLElement>("[data-tableau]");
  if (!l) return null;
  return { x0: l.offsetLeft, y0: l.offsetTop, x1: l.offsetLeft + l.offsetWidth, y1: l.offsetTop + l.offsetHeight };
}

export function TremplinPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatTremplin>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [phase, setPhase] = useState<Phase>("repos");
  const [enLecture, setEnLecture] = useState(false);
  const [lCourse, setLCourse] = useState(-M.APPROCHE_M);
  const [annonce, setAnnonce] = useState("");
  /** le centre du tremplin tient-il dans le dessin ? (décidé par le RENDU, relu après chaque dessin) */
  const [centreDansLeCadre, setCentreDansLeCadre] = useState(false);
  const mouvementReduit = useMouvementReduit();
  const rapideRef = useRef(false);
  const tRef = useRef(0);
  const etatRef = useRef<EtatTremplin>(etat);
  const phaseRef = useRef<Phase>(phase);
  etatRef.current = etat;
  phaseRef.current = phase;
  /** l'engagement et la révélation de CETTE entrée dans l'étape ont-ils posé leur réglage ? */
  const engageApplique = useRef(false);
  const reveleApplique = useRef(false);

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    B: useRef<HTMLSpanElement>(null),
    C: useRef<HTMLSpanElement>(null),
    a10: useRef<HTMLSpanElement>(null),
    a18: useRef<HTMLSpanElement>(null),
    uT: useRef<HTMLSpanElement>(null),
    uN: useRef<HTMLSpanElement>(null),
    a: useRef<HTMLSpanElement>(null),
    aT: useRef<HTMLSpanElement>(null),
    aN: useRef<HTMLSpanElement>(null),
    centre: useRef<HTMLSpanElement>(null),
    ref: useRef<HTMLSpanElement>(null),
    tm: useRef<HTMLSpanElement>(null),
    ta: useRef<HTMLSpanElement>(null),
  };
  const repRefs = useRef(Object.fromEntries(REPERES_PORTE.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES_PORTE)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : il attend la course ENTIÈRE (la scène répond en B) ──
  const finie = phase === "finie";
  const fraction = etape.pari?.revele_apres_course ?? 0;
  const pari = usePari(etape.pari, { attend: fraction > 0, montre: finie });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const engage = pari.phase !== "attente";
  const libre = etape.controles.length > 1;
  const tangentielle = etape.controles.includes("pilotage");
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];

  // l'ENGAGEMENT pose le réglage que le pari décrit (la course doit courir dans ce réglage-là)
  useEffect(() => {
    if (pari.phase !== "note" || engageApplique.current) return;
    engageApplique.current = true;
    const r = etape.etat_revele;
    if (r) setEtat((c) => appliquer(r, c, true));
    setAnnonce("Le pari est pris : lance la moto.");
  }, [pari.phase, etape]);

  // la RÉVÉLATION pose le repère où la course s'est arrêtée, et le DIT
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const r = etape.etat_revele;
    const s = r ? appliquer(r, etatRef.current) : etatRef.current;
    setEtat(s);
    const lu = M.lire(+s.v, +s.R, s.regime, M.abscisse(s.repere, +s.R));
    setAnnonce(`La moto est en B, à ${ms(lu.v)} : l’accélération y mesure ${ms2(lu.a)}.`);
  }, [pari.phase, etape]);

  // ── La position de G ──
  const l = phase === "course" || (!revele && phase !== "finie") ? lCourse : M.abscisse(etat.repere, +etat.R);
  // l'accélération n'existe qu'une fois la course lancée ; sa décomposition, qu'à la révélation
  const acceleration = engage && (phase !== "repos" || revele);
  const base = revele && phase !== "course";
  const reference = base && etat.reference === "depart" ? reglageDe(appliquer(etape.etat, etat)) : null;

  // ── Rendu ──
  const renduRef = useRef<RenduTremplin | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({ courant: reglageDe(etat), l, acceleration, base, tangentielle, reference });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && p[n].visible && visible ? p[n] : cache);
    const sous = (q: { x: number; y: number; visible: boolean }) => ({ ...q, y: q.y + 6 });
    // au-dessus de leur trait, sans le toucher (« 5 m », sans fond, posé sur son
    // propre témoin : 23 px d'encre sous l'étiquette, porte `etiquettes`)
    poser(refs.tm.current, en("temoin-m"), "calc(-100% - 4px)", "-50%");
    poser(refs.ta.current, en("temoin-a"), "calc(-100% - 4px)", "-50%");
    const decompose = base && !!p["aT-bout"];
    const dedans = !!p["centre"]?.visible;
    // le texte de l'étiquette change avec lui : un second passage la replace à sa taille
    if (dedans !== centreDansLeCadre) setCentreDansLeCadre(dedans);
    disposer(
      [
        // sous le trait qui marque B (et C) : 6 px sous le point, sinon l'étiquette
        // sans fond se pose sur le bas du trait
        { el: refs.B.current, p: sous(en("B")), directions: [[0, 1], [1, 1], [-1, 1]], portee: 18 },
        { el: refs.C.current, p: sous(en("C")), directions: [[0, 1], [1, 1], [1, 0]], portee: 18 },
        { el: refs.a10.current, p: en("angle-10"), directions: [[-1, 0], [-1, -1], [-1, 1]], portee: 8 },
        { el: refs.a18.current, p: en("angle-18"), directions: [[1, 0], [1, -1], [1, 1]], portee: 8 },
        { el: refs.a.current, p: en("a-bout", acceleration), directions: [[1, -1], [-1, -1], [0, -1], [1, 0], [-1, 0]], portee: 18 },
        { el: refs.aN.current, p: en("aN-bout", decompose), directions: [[-1, -1], [-1, 0], [0, -1]], portee: 18 },
        // a_T et u_T sont COLINÉAIRES (aux gaz, leurs pointes à 5 px l'une de
        // l'autre) : a_T sous la piste, u_T au-dessus ; de même a_N à gauche de la
        // normale, u_N à droite d'abord (390 px, S5 : 7,20 m·s⁻² ≈ 30 px, les deux
        // pointes confondues)
        // …au-dessus seulement si le dessous est pris (390 px : « B », « 10° » et les témoins s'y serrent)
        { el: refs.aT.current, p: en("aT-bout", decompose), directions: [[0, 1], [1, 1], [-1, 1], [1, -1], [-1, -1], [0, -1]], portee: 18 },
        { el: refs.uT.current, p: en("uT-bout", !p["uT-confondu"]?.visible), directions: [[0, -1], [1, -1], [-1, -1], [1, 1]], portee: 18 },
        { el: refs.uN.current, p: en("uN-bout", base && !p["uN-confondu"]?.visible), directions: [[1, 0], [-1, 0], [1, -1], [-1, -1]], portee: 18 },
        // le centre dans le cadre : nommé à côté de son point ; hors du cadre : au
        // bout du rayon, avec sa distance (spec §5.8)
        { el: refs.centre.current, p: p["centre"]?.visible ? en("centre", base) : en("rayon-bout", base && !!p["rayon-bout"]), directions: p["centre"]?.visible ? [[1, 0], [-1, 0], [0, 1]] : [[1, 1], [-1, 1], [0, 1]], portee: 18 },
        // « départ » du côté de la normale où ne sont ni u_T ni son étiquette (S2)
        { el: refs.ref.current, p: en("ref", base), directions: [[-1, 0], [-1, 1], [-1, -1], [1, 1], [1, 0]], portee: 18 },
      ],
      s.segments(),
      s.cadre(),
      [boiteLegende(rendu.hoteRef.current), boiteTableau(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES_PORTE) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, l, acceleration, base, tangentielle, indexEtape, centreDansLeCadre]);

  const rendu = useSceneRendu<RenduTremplin>(() => import("@/lib/scene2d/tremplin-rendu").then((m) => m.creerRenduTremplin), dessiner, {
    surPerte: () => setEnLecture(false),
  });
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Changer d'étape : la moto revient au départ de la course ──
  const auRepos = useCallback(() => {
    setEnLecture(false);
    setPhase("repos");
    tRef.current = 0;
    setLCourse(-M.APPROCHE_M);
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      engageApplique.current = false;
      reveleApplique.current = false;
      setEtat((c) => appliquer(e.etat, c));
      auRepos();
    },
    [etapes, pari, indexEtape, auRepos]
  );

  // ── La course : de −9,0 m jusqu'à B, au ralenti ×6, mesuré contre l'HORLOGE ──
  const demarrer = (sansAnimation = mouvementReduit) => {
    rapideRef.current = sansAnimation;
    tRef.current = 0;
    setLCourse(-M.APPROCHE_M);
    setPhase("course");
    setEnLecture(true);
    setAnnonce(sansAnimation ? "Course calculée sans animation." : "La moto part.");
  };

  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    const e = etatRef.current;
    const vB = +e.v, aT = M.A_T[e.regime];
    const T = M.dureeCourse(vB, aT);
    const terminer = () => {
      tRef.current = T;
      setLCourse(0);
      setEtat((c) => ({ ...c, repere: "entree" }));
      setPhase("finie");
      setEnLecture(false);
      // l'arrivée se DIT, à chaque course : une relance déplace le repère en B, et
      // un réglage qui bouge sans un mot contredit « chaque réglage est dit »
      // (vague 2 : la position « au milieu » revenait « à l'entrée » en silence)
      const lu = M.lire(vB, +e.R, e.regime, 0);
      setAnnonce(`La moto est en B, à ${ms(lu.v)} : l’accélération y mesure ${ms2(lu.a)}.`);
    };
    const image = (maintenant: number) => {
      const dtEcran = avant === null ? 0 : Math.min(0.1, (maintenant - avant) / 1000);
      avant = maintenant;
      if (rapideRef.current) {
        terminer();
        return;
      }
      tRef.current = Math.min(T, tRef.current + dtEcran / M.RALENTI);
      setLCourse(M.abscisseCourse(tRef.current, vB, aT));
      if (tRef.current >= T - 1e-12) {
        terminer();
        return;
      }
      id = requestAnimationFrame(image);
    };
    id = requestAnimationFrame(image);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  const regler = (patch: Partial<EtatTremplin>) => {
    const s = { ...etatRef.current, ...patch };
    // un réglage pendant une relance ARRÊTE la course : elle courait dans l'ancien
    // réglage (figé à son départ) pendant que le dessin suivait le nouveau — la
    // moto et les nombres se désaccordaient (vague 2) ; la scène montre le repère
    if (phaseRef.current === "course") {
      setEnLecture(false);
      setPhase("finie");
    }
    setEtat(s);
    const lu = M.lire(+s.v, +s.R, s.regime, M.abscisse(s.repere, +s.R));
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image
    if (patch.repere !== undefined) setAnnonce(`La moto ${LIEU[s.repere]} : ${lu.droite ? "pas de courbure" : `rayon ${s.R} m`}, vitesse ${ms(lu.v)}.`);
    else if (patch.v !== undefined) setAnnonce(`Vitesse en B : ${ms(+s.v)}.`);
    else if (patch.R !== undefined) setAnnonce(`Tremplin de ${s.R} m de rayon.`);
    else if (patch.regime !== undefined) setAnnonce(`Pilotage : ${PILOTAGE[s.regime]}.`);
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
        libelleOuvrir="Ouvrir le tremplin"
      />
    );
  }

  // ── Les nombres (une seule voie : la cinématique) ──
  const lu = M.lire(+etat.v, +etat.R, etat.regime, l);
  const luRepere = M.lire(+etat.v, +etat.R, etat.regime, M.abscisse(etat.repere, +etat.R));
  const aNaff = parseFloat(M.troisCs(luRepere.aN).replace(",", "."));

  const ligneLecture = (cleL: string, terme: React.ReactNode, valeur: React.ReactNode) => (
    <div key={cleL} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
      <dt className="text-secondary">{terme}</dt>
      <dd className="ml-auto text-right tabular-nums text-primary" data-lecture={cleL}>
        {typeof valeur === "string" ? frenchTypography(valeur) : valeur}
      </dd>
    </div>
  );

  const description =
    `La piste du sujet de 2019, vue de côté : une droite qui descend à 10 degrés, raccordée en B à un tremplin circulaire de ${etat.R} mètres de rayon qui relève la piste jusqu’au point C, à 18 degrés au-dessus de l’horizontale. La moto, réduite à un point, est ${l < -M.APPROCHE_REPERE_M - 0.01 && phase !== "course" ? "au départ de la course, 9,0 m avant B" : phase === "course" ? "en route vers B" : LIEU[etat.repere]}${phase === "course" ? "" : `, à ${ms(lu.v)}`} ; le vecteur unitaire tangent à la piste y est dessiné.` +
    (acceleration && lu.a > 0 ? ` Une flèche d’accélération de ${ms2(lu.a)} part de la moto.` : "") +
    (base && !lu.droite ? " Le vecteur unitaire normal, et un rayon en tirets, pointent vers le centre du virage." : "");

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {lectures.includes("vitesse") && ligneLecture("vitesse", <MathText>{"Vitesse au repère, $v$"}</MathText>, ms(luRepere.v))}
        {lectures.includes("rayon") && ligneLecture("rayon", "Rayon de la piste au repère", luRepere.droite ? "droite : pas de courbure" : `${etat.R} m`)}
        {lectures.includes("acceleration-normale") && ligneLecture("acceleration-normale", <MathText>{"Composante normale, $a_N$"}</MathText>, ms2(luRepere.aN))}
        {lectures.includes("aN-fois-R") && !luRepere.droite && ligneLecture("aN-fois-R", <MathText>{"Le produit $a_N \\times R$"}</MathText>, `${M.troisCs(aNaff * +etat.R)} m²·s⁻²`)}
        {lectures.includes("acceleration-tangentielle") && ligneLecture("acceleration-tangentielle", <MathText>{"Composante tangentielle, $a_T = dv/dt$"}</MathText>, `${M.signe3(luRepere.aT)} m·s⁻²`)}
        {lectures.includes("acceleration") && ligneLecture("acceleration", <MathText>{"Norme de l’accélération, $\\|\\vec a\\|$"}</MathText>, ms2(luRepere.a))}
        {lectures.includes("produit-a-v") && ligneLecture("produit-a-v", <MathText>{"Le produit $\\vec a\\cdot\\vec v$"}</MathText>, `${M.ecrireAV(luRepere.av)} m²·s⁻³`)}
        {lectures.includes("nature") && ligneLecture("nature", "Nature du mouvement", luRepere.nature)}
      </dl>
    ) : null;

  // Le tableau de bord, SUR la scène collante (leçon de la vague 2 du banc) :
  // la vitesse toujours — c'est le compteur ; a_N après la révélation ; a_T et
  // a·v quand l'étape les a ouverts. La liste des lectures défile, lui non.
  const tableau = (
    <div className="pointer-events-none absolute right-2 top-1.5 flex flex-col items-end gap-0.5 rounded-sm bg-figure-surface px-1 text-caption tabular-nums text-primary" data-tableau>
      <span data-compteur>
        <MathText>{`$v = ${M.troisCs(lu.v).replace(",", "{,}")}$ m·s⁻¹`}</MathText>
      </span>
      {base && (
        <span data-tableau-an>
          <MathText>{`$a_N = ${M.troisCs(lu.aN).replace(",", "{,}")}$ m·s⁻²`}</MathText>
        </span>
      )}
      {/* aux étapes du pilotage, la NORME aussi : au téléphone, le pilotage est
          sous les lectures, et seul le tableau reste sous les yeux quand on le
          règle (vague 2 — 16,8 · 16,2 · 16,8 à S4, 8,49 inchangé à S5) */}
      {base && tangentielle && (
        <span data-tableau-a>
          <MathText>{`$\\|\\vec a\\| = ${M.troisCs(lu.a).replace(",", "{,}")}$ m·s⁻²`}</MathText>
        </span>
      )}
      {base && tangentielle && (
        <span data-tableau-av>
          <MathText>{`$\\vec a\\cdot\\vec v = ${M.ecrireAV(lu.av).replace(",", "{,}").replace("−", "-")}$ m²·s⁻³`}</MathText>
        </span>
      )}
    </div>
  );

  const libelleLancer = enLecture ? "Pause" : phase === "course" ? "Reprendre" : finie || revele ? "Relancer la moto" : "Lancer la moto";

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-course={phase}
      data-v-ms={etat.v}
      data-r-m={etat.R}
      data-regime={etat.regime}
      data-repere={etat.repere}
      data-l-m={l.toFixed(3)}
      data-ralenti={M.RALENTI}
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
          legende="Deux échelles : mètres et m·s⁻²"
          messageSansWebgl="Ce navigateur n’affiche pas la piste (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          // PAYSAGE (3:2 sur grand écran, 4:3 au téléphone) : carré, le dessin
          // tenait dans le quart du bas et le haut restait vide pendant toute la
          // course — pour un centre de virage qui n'apparaît qu'après le pari
          // (vague 2, deux critiques d'accord). Hors du cadre, le rayon s'arrête
          // au bord et dit « centre : à 20 m », comme au téléphone depuis le début.
          format="paysage-haut"
        >
          {tableau}
          <Etiquette refEl={refs.B} nom="nom-B" texte="B" />
          <Etiquette refEl={refs.C} nom="nom-C" texte="C" />
          <Etiquette refEl={refs.a10} nom="nom-angle-10" texte="10°" />
          <Etiquette refEl={refs.a18} nom="nom-angle-18" texte="18°" />
          <Etiquette refEl={refs.uT} nom="nom-uT" fond>
            <MathText>{"$\\vec u_T$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.uN} nom="nom-uN" fond>
            <MathText>{"$\\vec u_N$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.a} nom="nom-a" fond>
            <MathText>{"$\\vec a$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.aN} nom="nom-aN" fond>
            <MathText>{"$a_N$"}</MathText>
          </Etiquette>
          {/* « a_T » n'EXISTE qu'aux étapes qui l'ont ouverte : une étiquette cachée
              reste dans le texte du panneau, et le texte de la relation fuit (S4) */}
          <Etiquette refEl={refs.aT} nom="nom-aT" fond>
            {tangentielle && <MathText>{"$a_T$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.centre} nom="nom-centre" texte={centreDansLeCadre ? "centre du virage" : `centre : à ${etat.R} m`} fond discret />
          <Etiquette refEl={refs.ref} nom="nom-ref" texte="départ" fond discret />
          <Etiquette refEl={refs.tm} nom="nom-temoin-m" texte="5 m" />
          {/* les deux témoins parlent la même langue : texte du plateau, sans pastille (vague 2) */}
          <Etiquette refEl={refs.ta} nom="nom-temoin-a" texte="10 m·s⁻²" />
          {REPERES_PORTE.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
          ))}
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS)}>
          {etape.pari && (
            <PariBloc
              pari={etape.pari}
              invitation="Lance la moto et regarde : la piste répond d'abord."
              phase={pari.phase}
              choixId={pari.choixId}
              choixRetenu={pari.choixRetenu}
              choixNotion={pari.choixNotion}
              onChoisir={pari.choisir}
              idBase={idTitre}
            />
          )}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="La course de la moto">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  data-lancer
                  onClick={() => {
                    if (enLecture) setEnLecture(false);
                    else if (phase === "course") setEnLecture(true);
                    else demarrer();
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {libelleLancer}
                </button>
                {/* Toujours MONTÉ : pendant une course il l'abrège ; sinon il la
                    calcule sans la jouer et donne l'image d'arrivée en B. */}
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  data-image-finale
                  onClick={() => {
                    if (phase === "course") {
                      rapideRef.current = true;
                      setEnLecture(true);
                    } else demarrer(true);
                  }}
                >
                  <span>Image finale</span>
                </button>
              </div>
            </div>
          )}

          {pari.etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              <MathText>{etape.suite}</MathText>
            </p>
          )}

          {libre && blocLectures}

          <div className="flex flex-col gap-5">
            {ouvre("position") && (
              <fieldset className="flex flex-col gap-1" data-controle="position">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Où est la moto")}</legend>
                {M.REPERES.map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-position`} value={x} checked={etat.repere === x} onChange={() => regler({ repere: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(LIEU[x])}
                  </label>
                ))}
              </fieldset>
            )}

            {ouvre("vitesse") && (
              <fieldset className="flex flex-col gap-1" data-controle="vitesse">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("La vitesse en B")}</legend>
                <div className="flex flex-wrap gap-x-1">
                  {M.VITESSES.map((x) => (
                    <label key={x} className={LIGNE_RADIO}>
                      <input type="radio" name={`${idTitre}-vitesse`} value={x} checked={etat.v === x} onChange={() => regler({ v: x })} className="accent-figure-ink-soft" />
                      <span className="tabular-nums">{frenchTypography(`${M.nombre(+x, 1)} m·s⁻¹`)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {ouvre("rayon") && (
              <fieldset className="flex flex-col gap-1" data-controle="rayon">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Le tremplin (quatre pièces)")}</legend>
                <div className="flex flex-wrap gap-x-1">
                  {M.RAYONS.map((x) => (
                    <label key={x} className={LIGNE_RADIO}>
                      <input type="radio" name={`${idTitre}-rayon`} value={x} checked={etat.R === x} onChange={() => regler({ R: x })} className="accent-figure-ink-soft" />
                      <span className="tabular-nums">{frenchTypography(`R = ${x} m`)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {ouvre("pilotage") && (
              <fieldset className="flex flex-col gap-1" data-controle="pilotage">
                <legend className="mb-1 text-body-sm text-secondary">{frenchTypography("Dans le tremplin")}</legend>
                {M.REGIMES.map((x) => (
                  <label key={x} className={LIGNE_RADIO}>
                    <input type="radio" name={`${idTitre}-pilotage`} value={x} checked={etat.regime === x} onChange={() => regler({ regime: x })} className="accent-figure-ink-soft" />
                    {frenchTypography(PILOTAGE[x])}
                  </label>
                ))}
              </fieldset>
            )}
          </div>

          {!libre && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que cette scène simplifie">
                {frenchTypography(
                  "Deux échelles : une pour les longueurs de la piste, une pour les accélérations — chacune a son témoin, et une flèche d’accélération ne se compare jamais à une longueur de piste. Les vecteurs unitaires ont une longueur de convention : elle ne mesure rien. Le motard est réduit à un point, son centre d’inertie. Le raccordement en B est idéalisé : la piste passe d’un coup de la droite au cercle ; sur une vraie piste, le passage est adouci. Le rayon du tremplin n’est pas donné par le sujet : il est choisi. Et la course est ralentie six fois : les vitesses affichées sont les vraies."
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
