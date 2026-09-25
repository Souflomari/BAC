"use client";

/**
 * PlanComplexePanel — « le plan complexe » : un point M, un coefficient, un
 * centre, et l'image M' (Maths · nombres-complexes-2, tête de R5 ; spec
 * docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md).
 *
 * Le quatorzième manipulable sur l'appareillage des scènes (ADR 0041), le
 * premier des MATHÉMATIQUES en plan : opt-in au clic, étapes, pari avant tout,
 * un contrôle neuf par étape. Ni temps ni course : le verdict est immédiat, et
 * c'est le PLAN qui répond avant le texte — M' se pose, l'arc s'ouvre,
 * l'anneau marque le point qui ne bouge pas.
 *
 * UN SEUL NOMBRE, DEUX EFFETS, ET UN POINT QUI NE BOUGE PAS (spec §2.2). La
 * chaîne se construit en cinq temps : agrandir sans tourner (S1), le rapport
 * comme quotient (S2), l'angle comme ÉCART de deux directions (S3), le centre
 * comme point fixe (S4), et la lecture à l'envers d'une formule (S5).
 *
 * EXACT, OU RIEN (§5.4) : tout nombre écrit vient du modèle exact
 * (`plan-complexe-modele.ts`) ; les flottants ne servent qu'à dessiner.
 *
 * LE BALAYAGE (S3, après la révélation seulement) : M glisse continûment sur
 * son cercle autour du centre, et M' le suit. Il ne pose aucun cran et ne
 * change pas l'état — relâché, M revient à sa place. Pendant qu'il agit, ce qui
 * DÉPEND de la position (les affixes de M et M', leurs arguments) s'efface en
 * « — » ; ce qui n'en dépend pas (|c|, les distances, le rapport, arg c,
 * l'écart) reste écrit, exact — c'est précisément ce que le geste montre.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/plan-complexe-modele";
import type { RenduPlan } from "@/lib/scene2d/plan-complexe-rendu";
import { CURSEUR, GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatPlan {
  c: M.Coefficient;
  z: M.Point;
  centre: M.Centre;
  enonce: M.Enonce;
  reference: "aucune" | "depart";
  /** M' est-il DONNÉ par la consigne (S3, S5) ? il est alors à l'encre, avant le pari */
  image: "cachee" | "donnee";
}

const dans = <T extends string>(liste: readonly T[], v: unknown): v is T => typeof v === "string" && (liste as readonly string[]).includes(v);

function appliquer(e: Scene3DEtat | undefined, c: EtatPlan): EtatPlan {
  if (!e) return c;
  return {
    c: dans(M.COEFFICIENTS, e.c) ? e.c : c.c,
    z: dans(M.POINTS, e.z) ? e.z : c.z,
    centre: dans(M.CENTRES, e.centre) ? e.centre : c.centre,
    enonce: dans(M.ENONCES, e.enonce) ? e.enonce : c.enonce,
    reference: e.reference === "depart" ? "depart" : e.reference === "aucune" ? "aucune" : c.reference,
    image: e.image === "donnee" ? "donnee" : e.image === "cachee" ? "cachee" : c.image,
  };
}

const ETAT_DE_BASE: EtatPlan = { c: "2", z: "1+i", centre: "O", enonce: "coefficient", reference: "aucune", image: "cachee" };

const REPERES = [
  "origine", "cercle-e", "cercle-n", "cercle-o", "cercle-s", "coin-hg", "coin-bd", "axe-x-droite", "axe-y-haut",
  ...Array.from({ length: 17 }, (_, k) => `grad-x${k - 8}`).filter((n) => n !== "grad-x0"),
  ...Array.from({ length: 17 }, (_, k) => `grad-y${k - 8}`).filter((n) => n !== "grad-y0"),
  "m", "mp", "centre", "anneau", "ref", "arc-debut", "arc-fin", "arc-milieu",
] as const;

/** Un nombre TeX dit en clair (la description du canvas, la région vivante) */
function enClair(t: string): string {
  return t
    .replace(/\\tfrac\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}\{([^{}]*)\}/g, "($1)/$2")
    .replace(/\(\\pi\)/g, "π")
    .replace(/\\sqrt\{(\d+)\}/g, "√$1")
    .replace(/\\pi/g, "π")
    .replace(/\\Omega/g, "Ω")
    .replace(/\\,/g, "")
    .replace(/\((\d+)\)\//g, "$1/")
    .replace(/'/g, "′")
    .replace(/-/g, "−");
}

/**
 * Les RÉPONSES s'écrivent en fractions pleines : en \tfrac, à la taille d'une ligne
 * de lecture, π/6 ne se lisait pas — et c'est la réponse (captures de construction).
 * Les affixes des étiquettes du plan gardent le \tfrac du modèle.
 */
const grand = (t: string) => t.replace(/\\tfrac/g, "\\dfrac");

/** Un intitulé de lecture sur deux lignes : le nom, puis ce qu'il veut dire (la valeur reste sur la ligne). */
function DeuxLignes({ titre, sous }: { titre: string; sous: string }) {
  return (
    <span className="flex flex-col">
      <span>{frenchTypography(titre)}</span>
      <span className="text-caption">{frenchTypography(sous)}</span>
    </span>
  );
}

/**
 * Sur le PLAN, l'angle s'écrit en ligne (π/2) : la fraction pleine faisait une pastille de
 * 40 px de haut, et au téléphone, à S4, l'arc, A, M, M′ et leurs quatre étiquettes tiennent
 * dans deux unités — 40 px (captures de construction). La liste des lectures garde la
 * fraction pleine, qui s'y lit mieux.
 */
const enLigne = (t: string) => t.replace(/\\tfrac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");

/**
 * Une affixe LONGUE (celles qui portent √3, ou deux fractions) s'écrit SOUS le nom du point :
 * « M′((√3 − 1) + (√3 + 1)i) » mesurait 170 px sur un plan de 358, et ne tenait nulle part
 * sans barrer un axe (captures de construction, 390 px).
 */
const longue = (tex: string) => /\\sqrt|\\tfrac.*\\tfrac/.test(tex);

/**
 * Les directions du placeur, les douze de `disposer` d'abord, puis des diagonales plus fines :
 * une étiquette large (l'affixe sur deux lignes) au-dessus d'un point proche de l'axe
 * imaginaire n'avait que « tout droit » (qui barre l'axe) ou « en diagonale » (qui sort du
 * cadre) — il lui fallait l'entre-deux (390 px, c = √3 + i).
 */
const DIRECTIONS_FINES: readonly (readonly [number, number])[] = [
  [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [1, 1], [-1, -1], [-1, 1], [0.5, -1], [-0.5, -1], [0.5, 1], [-0.5, 1],
  ...[0.25, 0.8, 0.9].flatMap((f) => [[f, -1], [-f, -1], [f, 1], [-f, 1]] as [number, number][]),
];

/** Les directions de l'étiquette d'angle : la bissectrice (du centre vers le milieu de l'arc), puis ses voisines, puis les autres. */
function bissectrice(p: Record<string, { x: number; y: number }>): readonly (readonly [number, number])[] {
  const m = p["arc-milieu"], c = p["centre"];
  if (!m || !c) return DIRECTIONS_FINES;
  const th = Math.atan2(m.y - c.y, m.x - c.x);
  const dir = (a: number): [number, number] => { const x = Math.cos(a), y = Math.sin(a), k = Math.max(Math.abs(x), Math.abs(y)); return [x / k, y / k]; };
  return [dir(th), dir(th + 0.35), dir(th - 0.35), dir(th + 0.7), dir(th - 0.7), ...DIRECTIONS_FINES];
}

const fois = (a: [number, number], b: [number, number]): [number, number] => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];

export function PlanComplexePanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape = etapes[indexEtape];
  const [etat, setEtat] = useState<EtatPlan>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [annonce, setAnnonce] = useState("");
  /** le balayage, en degrés (jamais écrits) : 0 = M à sa place */
  const [balayage, setBalayage] = useState(0);
  const etatRef = useRef<EtatPlan>(etat);
  etatRef.current = etat;

  const idTitre = useId();
  const idConsigne = useId();
  const refs = {
    m: useRef<HTMLSpanElement>(null),
    mp: useRef<HTMLSpanElement>(null),
    centre: useRef<HTMLSpanElement>(null),
    angle: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit, en pixels, le repère et les points.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const lit = (l: string) => lectures.includes(l);
  const libre = etape.controles.length > 2;

  // ── Les nombres : une seule voie, le modèle exact ──
  const t = M.transformation(etat);
  const Z = M.point(etat.z);
  const Zp = M.image(t, Z);
  const fixe = M.egal(Z, t.omega);
  const k = M.ecart(t, Z);
  const coefficientMode = etat.enonce === "coefficient";
  // suivi d'une ESPACE partout où il précède une lettre : « \OmegaM » est une macro
  // inconnue de KaTeX, rendue en rouge (captures de construction, S5)
  const nomCentre = !coefficientMode ? "\\Omega" : etat.centre === "O" ? "O" : "A";

  // ce que le plan montre
  const mpMontre = revele || etat.image === "donnee";
  const centreMontre = t.donne || revele;
  const balaie = balayage !== 0 && ouvre("balayage");
  const phi = balaie ? (balayage * Math.PI) / 180 : 0;
  const w = M.enFlottants(t.omega);
  const aF = M.enFlottants(t.a);
  const zF = M.enFlottants(Z);
  // M sur son cercle autour du centre, et M' = ω + a (M − ω) — la même relation, en flottants
  const mF = ((): [number, number] => {
    const d = fois([zF[0] - w[0], zF[1] - w[1]], [Math.cos(phi), Math.sin(phi)]);
    return [w[0] + d[0], w[1] + d[1]];
  })();
  const mpF = ((): [number, number] => {
    const d = fois([mF[0] - w[0], mF[1] - w[1]], aF);
    return [w[0] + d[0], w[1] + d[1]];
  })();
  const arc = revele && lit("angle") && k !== null && k !== 0 ? k : null;
  const anneau = revele && lit("point-fixe");
  const depart = (() => {
    if (etat.reference !== "depart" || !revele) return null;
    const e0 = appliquer(etape.etat, etat);
    const zp0 = M.image(M.transformation(e0), M.point(e0.z));
    return M.egal(zp0, Zp) ? null : zp0;
  })();

  // ── Rendu ──
  const renduRef = useRef<RenduPlan | null>(null);
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({
      m: mF,
      mp: mpMontre ? mpF : null,
      mpEncre: etat.image === "donnee",
      centre: centreMontre ? w : null,
      centreAccent: !t.donne,
      anneau,
      arc,
      reference: depart ? M.enFlottants(depart) : null,
    });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    const autreCentre = centreMontre && !(w[0] === 0 && w[1] === 0);
    const entrees = [
        // l'angle AVANT M' : son étiquette doit rester contre l'arc, celle de M' peut
        // s'écarter de son point (390 px, S4 : « π/2 » recouvrait « M′( »)
        // la portée va jusqu'à 50 px : au-delà de 14, un FILET relie l'étiquette à son point
        // l'angle d'ABORD, et le long de sa BISSECTRICE : entre deux rayons proches (π/6), l'étiquette
        // ne tient qu'assez loin du centre, là où le secteur s'élargit (1 280 px, S3 : posée en
        // travers du rayon OM′) ; c'est l'étiquette la plus contrainte, elle choisit la première
        { el: refs.angle.current, p: en("arc-milieu", arc !== null), portee: 50, filet: 14, directions: bissectrice(p) },
        { el: refs.m.current, p: en("m"), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
        { el: refs.mp.current, p: en("mp", mpMontre && !fixe), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
        { el: refs.centre.current, p: en("centre", autreCentre), portee: 50, filet: 14, directions: DIRECTIONS_FINES },
      ];
    // UN FILET quand une étiquette a dû s'éloigner de son point (> 14 px) : à 20 px par unité, au
    // téléphone, « M′(½ + ½i) » ne tient pas entre O et M, et une étiquette loin de ce qu'elle
    // nomme en nomme une autre (captures de construction). Le placeur choisit la place EN
    // SACHANT le filet qu'elle demande ; on trace ceux qu'il a retenus.
    const places = disposer(entrees, s.segments(), s.cadre(), [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null));
    s.lier(places.flatMap((b) => (b?.filet ? [b.filet] : [])));
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, revele, balayage, indexEtape, pari.phase]);

  const rendu = useSceneRendu<RenduPlan>(() => import("@/lib/scene2d/plan-complexe-rendu").then((m) => m.creerRenduPlan), dessiner);
  renduRef.current = rendu.renduRef.current;
  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // Relâché, le balayage rend M à sa place — même si la main quitte le curseur
  const tient = useRef(false);
  useEffect(() => {
    const lacher = () => {
      if (!tient.current) return;
      tient.current = false;
      setBalayage(0);
    };
    window.addEventListener("pointerup", lacher);
    window.addEventListener("pointercancel", lacher);
    return () => {
      window.removeEventListener("pointerup", lacher);
      window.removeEventListener("pointercancel", lacher);
    };
  }, []);

  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      pari.changerEtape(etapes[indexEtape].id, e.id, i === 0 && indexEtape === etapes.length - 1);
      setBalayage(0);
      setEtat((c) => appliquer(e.etat, c));
    },
    [etapes, pari, indexEtape]
  );

  const regler = (patch: Partial<EtatPlan>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    setBalayage(0);
    const ts = M.transformation(s);
    const zp = enClair(M.texComplexe(M.image(ts, M.point(s.z))));
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image
    if (patch.c !== undefined) setAnnonce(`Coefficient c = ${enClair(M.TEX_COEFFICIENT[s.c])} : M′ en ${zp}.`);
    else if (patch.z !== undefined) setAnnonce(`M en ${enClair(M.TEX_POINT[s.z])} : M′ en ${zp}.`);
    else if (patch.centre !== undefined) setAnnonce(`${s.centre === "O" ? "Centre O, l’origine" : "Centre A, d’affixe 2"} : M′ en ${zp}.`);
    else if (patch.enonce !== undefined)
      setAnnonce(s.enonce === "coefficient" ? `Un coefficient et un centre : M′ en ${zp}.` : `Formule ${enClair(M.TEX_FORMULE[s.enonce])} : M′ en ${zp}.`);
  };

  if (rendu.panneau === "ferme") {
    return (
      <SceneOptIn
        sceneId={scene.scene}
        titre={scene.title}
        legende={scene.caption}
        onOuvrir={rendu.ouvrir}
        className={className}
        surtitre="Plan complexe"
        libelleOuvrir="Ouvrir le plan complexe"
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
  const math = (tex: string) => <MathText>{`$${tex}$`}</MathText>;
  const TIRET = "—";

  const texZ = M.texComplexe(Z), texZp = M.texComplexe(Zp);
  const OM = M.texRadical(M.moduleDe(M.sub(Z, t.omega)));
  const OMp = M.texRadical(M.moduleDe(M.sub(Zp, t.omega)));
  const rap = M.rapport(t, Z);
  const quo = M.quotient(t, Z);
  const argC = M.argument(t.a);
  const argZ = M.argument(Z), argZp = M.argument(Zp);
  // l'argument de l'image n'est EXACT qu'au centre O : ailleurs, 5 + 3i n'a pas
  // d'argument en fraction de π, et la scène n'écrit pas de décimal (§5.4)
  const argumentsExacts = coefficientMode && etat.centre === "O" && argZ !== null && argZp !== null;
  const lettre = coefficientMode ? "c" : "a";

  const blocLectures =
    lectures.length > 0 ? (
      <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
        {/* Aucune lecture ne RÉPÈTE le dessin (leçon du banc d'électrolyse) : z et z'
            sont à côté de leurs points, c sur le badge — la liste ne porte que ce que
            le plan ne peut pas montrer sans un nombre. */}
        {lit("module-c") && ligneLecture("module-c", <MathText>{coefficientMode ? "Module du coefficient, $|c|$" : "Module de $a$, $|a|$"}</MathText>, math(grand(M.texRadical(M.moduleDe(t.a)))))}
        {lit("distances") &&
          ligneLecture("distances", !coefficientMode ? "Distances au centre" : etat.centre === "O" ? "Distances à l’origine" : "Distances au centre A", <MathText>{`$${nomCentre} M = ${grand(OM)}$ et $${nomCentre} M' = ${grand(OMp)}$`}</MathText>)}
        {lit("rapport") && ligneLecture("rapport", <MathText>{`Rapport des distances, $\\dfrac{${nomCentre} M'}{${nomCentre} M}$`}</MathText>, rap ? math(grand(M.texRadical(rap))) : TIRET)}
        {lit("argument-c") && ligneLecture("argument-c", <MathText>{`Argument ${coefficientMode ? "du coefficient" : "de $a$"}, $\\arg(${lettre})$`}</MathText>, argC === null ? TIRET : math(grand(M.texAngle(argC))))}
        {lit("angle") && ligneLecture("angle", <DeuxLignes titre="Angle de la transformation" sous="l’écart des deux directions" />, k === null ? TIRET : math(grand(M.texAngle(k))))}
        {lit("argument-image") &&
          argumentsExacts &&
          ligneLecture(
            "argument-image",
            <DeuxLignes titre="Argument de l’image" sous="lu depuis l’axe réel" />,
            balaie ? (
              TIRET
            ) : (
              <span className="flex flex-col items-end gap-1.5">
                <span data-arg="image">{math(`\\arg(z')=${grand(M.texAngle(argZp!))}`)}</span>
                <span className="text-secondary" data-arg="point">
                  {math(`\\arg(z)=${grand(M.texAngle(argZ!))}`)}
                </span>
              </span>
            )
          )}
        {lit("point-fixe") && ligneLecture("point-fixe", "Point fixe : le centre, qui ne bouge pas", math(M.texComplexe(t.omega)))}
        {lit("ecriture") &&
          ligneLecture(
            "ecriture",
            "Écriture complexe",
            <span className="flex flex-col items-end gap-1">
              <span data-forme="factorisee">{math(M.texFactorisee(t))}</span>
              {etape.controles.includes("enonce") && <span data-forme="developpee">{math(M.texDeveloppee(t))}</span>}
            </span>
          )}
        {lit("rapport-inverse") && ligneLecture("rapport-inverse", <MathText>{"$\\dfrac{z'-\\omega}{z-\\omega}$, avec $\\omega$ l’affixe du centre"}</MathText>, quo ? math(M.texComplexe(quo)) : TIRET)}
      </dl>
    ) : null;

  const groupe = (id: string, legende: string, valeurs: readonly string[], courant: string, texte: (v: string) => string, choisir: (v: string) => void) => (
    <fieldset key={id} className="flex flex-col gap-1" data-controle={id}>
      <legend className="mb-1 text-body-sm text-secondary">
        <MathText>{legende}</MathText>
      </legend>
      <div className="flex flex-wrap gap-x-1">
        {valeurs.map((x) => (
          <label key={x} className={LIGNE_RADIO}>
            <input type="radio" name={`${idTitre}-${id}`} value={x} checked={courant === x} onChange={() => choisir(x)} className="accent-figure-ink-soft" />
            <span className="tabular-nums">
              <MathText>{texte(x)}</MathText>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  const lacher = () => {
    tient.current = false;
    setBalayage(0);
  };
  const groupes: Record<string, () => React.ReactNode> = {
    enonce: () =>
      groupe("enonce", "Ce qui est donné", M.ENONCES, etat.enonce, (v) => (v === "coefficient" ? "un coefficient $c$ et un centre" : `$${M.TEX_FORMULE[v as Exclude<M.Enonce, "coefficient">]}$`), (v) => regler({ enonce: v as M.Enonce })),
    coefficient: () =>
      coefficientMode && groupe("coefficient", "Le coefficient $c$", M.COEFFICIENTS, etat.c, (v) => `$${M.TEX_COEFFICIENT[v as M.Coefficient]}$`, (v) => regler({ c: v as M.Coefficient })),
    point: () => groupe("point", "Le point $M$, d’affixe $z$", M.POINTS, etat.z, (v) => `$${M.TEX_POINT[v as M.Point]}$`, (v) => regler({ z: v as M.Point })),
    centre: () =>
      coefficientMode && groupe("centre", "Le centre", M.CENTRES, etat.centre, (v) => (v === "O" ? "$O$, l’origine" : "$A$, d’affixe $2$"), (v) => regler({ centre: v as M.Centre })),
    balayage: () => (
      <label key="balayage" className="flex flex-col gap-1" data-controle="balayage">
        <span className="text-body-sm text-secondary">
          <MathText>{"Faire glisser $M$ sur son cercle — sans lâcher"}</MathText>
        </span>
        <input
          type="range"
          min={-180}
          max={180}
          step={1}
          value={balayage}
          onPointerDown={() => {
            tient.current = true;
          }}
          onChange={(e) => setBalayage(parseInt(e.target.value, 10) || 0)}
          onKeyDown={(e) => {
            if (e.key === "Escape") lacher();
          }}
          onBlur={lacher}
          aria-valuetext={balayage === 0 ? "M à sa place" : "M déplacé sur son cercle ; relâcher, ou Échap, le remet à sa place"}
          className={CURSEUR}
        />
      </label>
    ),
  };

  // ── Ce que le lecteur d'écran entend ──
  const nomC = etat.centre === "O" ? "O" : "A";
  const description =
    "Plan complexe, repère orthonormé gradué de −9 à 9 sur les deux axes, avec le cercle de rayon 1 centré en O. " +
    (coefficientMode ? `Coefficient c = ${enClair(M.TEX_COEFFICIENT[etat.c])}. ` : `Transformation donnée : ${enClair(M.TEX_FORMULE[etat.enonce as Exclude<M.Enonce, "coefficient">])}. `) +
    (coefficientMode && etat.centre === "A" ? "Le centre A, d’affixe 2. " : "") +
    (!coefficientMode && revele ? `Le centre Ω, d’affixe ${enClair(M.texComplexe(t.omega))}, marqué d’un anneau : il ne bouge pas. ` : "") +
    (balaie ? `Le point M, déplacé sur son cercle autour de ${coefficientMode ? nomC : "Ω"}. ` : `Le point M, d’affixe ${enClair(texZ)}. `) +
    (mpMontre ? (fixe ? "Son image M′ est M lui-même : le point ne bouge pas. " : balaie ? `Son image M′ le suit, à la même distance de ${coefficientMode ? nomC : "Ω"} et avec le même écart. ` : `Son image M′, d’affixe ${enClair(texZp)}. `) : "") +
    (arc !== null ? `Un arc marque l’angle de la transformation, de la direction de M à celle de M′ : ${enClair(M.texAngle(arc))}. ` : "") +
    (anneau && coefficientMode ? `Un anneau marque ${nomC} : c’est le point qui ne bouge pas.` : "");

  // la formule de la légende à la taille du texte (KaTeX la grossit de 21 %) : au téléphone et au
  // grand texte, « z′ = (1 + i)z + 1 − i » atteignait l'axe imaginaire et en cachait la pointe
  const legende = (
    <span className="[&_.katex]:text-[1em]">
      {coefficientMode ? math(`c = ${M.TEX_COEFFICIENT[etat.c]}`) : math(M.TEX_FORMULE[etat.enonce as Exclude<M.Enonce, "coefficient">])}
    </span>
  );

  return (
    <section
      className={cn("my-10 scroll-mt-14 bp-expanded:scroll-mt-20 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-c={etat.c}
      data-z={etat.z}
      data-centre={etat.centre}
      data-enonce={etat.enonce}
      data-balayage={balaie ? "oui" : "non"}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Plan complexe
      </Eyebrow>
      <ConsigneEtape idTitre={idTitre} idConsigne={idConsigne} titre={etape.titre} consigne={etape.consigne} cle={etape.id} rang={{ index: indexEtape, total: etapes.length }} />

      <div className={GRILLE_SCENE} data-scene-grille>
        <Plateau
          hoteRef={rendu.hoteRef}
          canvasRef={rendu.canvasRef}
          panneau={rendu.panneau}
          description={description}
          legende={legende}
          messageSansWebgl="Ce navigateur n’affiche pas le plan (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          // CARRÉ PARTOUT (spec §5.1) : l'ensemble atteignable d'une scène de rotation se
          // borne par un disque — un cadre rectangulaire laisse toujours sortir quelque chose
          format="carre-partout"
        >
          <Etiquette refEl={refs.m} nom="nom-m" fond>
            {mpMontre && fixe ? math("M=M'") : balaie ? math("M") : math(`M(${texZ})`)}
          </Etiquette>
          <Etiquette refEl={refs.mp} nom="nom-mp" fond>
            {mpMontre && !fixe && (
              <span className={etat.image === "donnee" ? undefined : "text-figure-accent"}>
                {balaie ? math("M'") : longue(texZp) ? <span className="flex flex-col items-center leading-tight">{math("M'")}{math(`(${texZp})`)}</span> : math(`M'(${texZp})`)}
              </span>
            )}
          </Etiquette>
          <Etiquette refEl={refs.centre} nom="nom-centre" fond>
            {centreMontre && <span className={t.donne ? undefined : "text-figure-accent"}>{math(`${nomCentre}(${M.texComplexe(t.omega)})`)}</span>}
          </Etiquette>
          <Etiquette refEl={refs.angle} nom="nom-angle" fond>
            {arc !== null && <span className="text-figure-accent">{math(enLigne(M.texAngle(arc)))}</span>}
          </Etiquette>
          {REPERES.map((r) => (
            <Etiquette key={r} refEl={repRefs.current[r]} nom={r} texte="" />
          ))}
        </Plateau>

        <div className={cn("flex min-w-0 flex-col gap-5", MARGE_FOCUS_CARRE)}>
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

          {libre && blocLectures}

          {/* dans l'ordre que l'ÉTAPE déclare */}
          <div className="flex flex-col gap-5">{etape.controles.filter(ouvre).map((c) => groupes[c]?.())}</div>

          {!libre && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que ce plan simplifie">
                {/* le texte de l'encadré obéit à la formule graduée comme le reste (spec §7.6 C) :
                    l'arc n'y paraît qu'aux étapes qui le tracent, et le mot « centre » n'y est pas */}
                {frenchTypography(
                  "Cinq positions pour le point, sept coefficients : c’est ce qui permet d’écrire chaque nombre exactement — une racine, une fraction de π, jamais un décimal. Entre deux positions, le point ne se pose pas. Le plan montre la règle sur des exemples ; il ne la démontre pas, et la démonstration vient juste après, dans le cours." +
                    ((etape.lectures ?? []).includes("angle") ? " L’arc de l’angle est dessiné à la même taille quel que soit l’éloignement du point : sans cela, tout près, il serait invisible." : "") +
                    (etat.reference === "depart" ? " Le petit cercle en tirets marque où arrivait le point au réglage de départ de l’étape." : "") +
                    " Le dessin est exact au pixel près, les nombres sont exacts tout court."
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
