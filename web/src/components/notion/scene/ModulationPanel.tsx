"use client";

/**
 * ModulationPanel — « le banc de modulation » : un multiplieur, un écran
 * d'oscilloscope, un détecteur de crête (pc/ondes-em-modulation, en tête de
 * R3 ; spec content/pc/ondes-em-modulation/spec-scene-modulation.md).
 *
 * Le sixième manipulable PLAN sur l'appareillage des scènes (ADR 0041) :
 * opt-in au clic, étapes, pari avant tout, un contrôle neuf par étape, porte
 * qui lit le rendu. Ni temps ni course : un oscilloscope en régime établi ne
 * « démarre » pas. Le verdict est immédiat, et la RÉVÉLATION pose le réglage
 * que le pari décrivait (`etat_revele`) : à S3 la composante continue tombe à
 * 2,0 V, à S4 l'étage de détection se BRANCHE — il n'existe pas dans le DOM
 * avant, et l'on ne peut pas répondre au pari du détecteur depuis une étape où
 * il n'est pas.
 *
 * UNE CHAÎNE CONSTRUITE EN QUATRE TEMPS (spec §2.3) : S1 lit les deux
 * périodes, S2 les extrema et le taux, S3 le seuil, S4 la fenêtre du
 * détecteur. Le texte même de la chaîne est un état qui fuit — aucune lecture,
 * aucun libellé n'écrit « U_max » avant S2, ni « m < 1 » avant S3, ni « R_0C_0 »
 * avant S4.
 */

import { createRef, useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import type { Scene3DDescriptor, Scene3DEtat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MathText } from "../ChoiceButton";
import * as M from "@/lib/scene2d/modulation-modele";
import type { Marque, Reglage, RenduModulation } from "@/lib/scene2d/modulation-rendu";
import { GRILLE_SCENE, LIGNE_RADIO, MARGE_FOCUS_CARRE } from "./commun";
import { EncadreRepli } from "./EncadreRepli";
import { useSceneRendu } from "./useSceneRendu";
import { usePari } from "./usePari";
import { SceneOptIn } from "./SceneOptIn";
import { ConsigneEtape } from "./ConsigneEtape";
import { PariBloc } from "./PariBloc";
import { TransportEtapes } from "./TransportEtapes";
import { Etiquette, Plateau, boiteLegende, disposer, poser } from "./Plateau";

interface EtatBanc {
  F: M.Porteuse;
  Sm: M.Modulante;
  U0: M.Continue;
  R0: M.Detecteur;
  sortie: M.Sortie;
  reference: M.Reference;
}

const parmi = <T extends string>(liste: readonly T[], v: unknown, defaut: T): T => ((liste as readonly string[]).includes(String(v)) ? (String(v) as T) : defaut);

function appliquer(e: Scene3DEtat | undefined, c: EtatBanc): EtatBanc {
  if (!e) return c;
  return {
    F: parmi(M.PORTEUSES, e.F_khz, c.F),
    Sm: parmi(M.MODULANTES, e.Sm_v, c.Sm),
    U0: parmi(M.CONTINUES, e.U0_v, c.U0),
    R0: parmi(M.DETECTEURS, e.R0_kohm, c.R0),
    sortie: parmi(M.SORTIES, e.sortie, c.sortie),
    reference: parmi(M.REFERENCES, e.reference, c.reference),
  };
}

const ETAT_DE_BASE: EtatBanc = { F: "4.0", Sm: "2.0", U0: "4.0", R0: "5.0", sortie: "modulee", reference: "aucune" };

const reglageDe = (e: EtatBanc): Reglage => ({ F: parseFloat(e.F), Sm: parseFloat(e.Sm), U0: parseFloat(e.U0), R0: parseFloat(e.R0) });

/** Ce que la révélation de chaque étape ajoute à l'accent (spec §7). */
const MARQUES: Record<string, readonly Marque[]> = {
  "deux-rythmes": ["periode", "comptage"],
  "le-taux-par-deux-cretes": ["extrema"],
  "on-baisse-la-continue": ["pincement"],
  "la-fenetre-du-detecteur": ["decrochage"],
  libre: ["vidange", "decrochage"],
};

const REPERES = [
  "ecran-hg", "ecran-bd", "ecran-o",
  ...Array.from({ length: M.DIV_X + 1 }, (_, k) => `div-x${k}`),
  ...Array.from({ length: M.DIV_Y + 1 }, (_, k) => `div-y${k}`),
  "fin-uS", "fin-uC", "periode-a", "periode-b", "crochet-comptage", "curseur-max", "curseur-min",
  "pincement-0", "pincement-1", "pincement-2", "pincement-3", "bosse-0", "bosse-1", "decrochage", "vidange",
  "borne-uS", "borne-uC", "multiplieur", "diode", "R0", "C0", "reference",
] as const;

// ── L'écriture des nombres ────────────────────────────────────────────────
const V2 = (x: number) => M.nombre(x, 2);
const tex = (s: string) => s.replace(/,/g, "{,}");
const ms3 = (x: number) => `${M.troisCs(x)} ms`;

export function ModulationPanel({ scene, className }: { scene: Scene3DDescriptor; className?: string }) {
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
    u: useRef<HTMLSpanElement>(null),
    p: useRef<HTMLSpanElement>(null),
    uSm: useRef<HTMLSpanElement>(null),
    uCm: useRef<HTMLSpanElement>(null),
    R0: useRef<HTMLSpanElement>(null),
    C0: useRef<HTMLSpanElement>(null),
    calV: useRef<HTMLSpanElement>(null),
    calT: useRef<HTMLSpanElement>(null),
    uS: useRef<HTMLSpanElement>(null),
    uC: useRef<HTMLSpanElement>(null),
    periode: useRef<HTMLSpanElement>(null),
    comptage: useRef<HTMLSpanElement>(null),
    max: useRef<HTMLSpanElement>(null),
    min: useRef<HTMLSpanElement>(null),
    ref: useRef<HTMLSpanElement>(null),
    decrochage: useRef<HTMLSpanElement>(null),
    vidange: useRef<HTMLSpanElement>(null),
  };
  // Des repères SANS texte : l'élève ne voit rien ; la porte y lit OÙ regarder —
  // jamais COMBIEN : les échelles se lisent sur la grille, les tracés sur l'encre.
  const repRefs = useRef(Object.fromEntries(REPERES.map((n) => [n, createRef<HTMLSpanElement>()])) as Record<(typeof REPERES)[number], React.RefObject<HTMLSpanElement>>);

  // ── Le pari : sans temps, le verdict est immédiat ──
  const pari = usePari(etape.pari, { attend: false, montre: true });
  const ouvre = (c: string) => pari.etapeOuverte && etape.controles.includes(c);
  const revele = pari.phase === "revele" || pari.phase === "aucun";
  const libre = etape.controles.length > 1;
  const lectures = pari.etapeOuverte ? etape.lectures ?? [] : [];
  const detecte = etat.sortie === "modulee-et-detectee";
  const marques = revele ? MARQUES[etape.id] ?? [] : [];

  // la révélation pose, UNE fois par entrée dans l'étape, le réglage que le pari
  // décrivait — et le DIT : le lecteur d'écran n'entend pas l'image changer
  useEffect(() => {
    if (pari.phase !== "revele" || reveleApplique.current) return;
    reveleApplique.current = true;
    const r = etape.etat_revele;
    if (!r) return;
    const s = appliquer(r, etatRef.current);
    setEtat(s);
    const g = reglageDe(s);
    const ext = M.extrema(g.U0, g.Sm);
    const pose =
      r.U0_v !== undefined
        ? `baisse la composante continue à ${M.cran(s.U0)} V, sans toucher au signal : les crêtes montent à ${V2(ext.max)} divisions et l’enveloppe touche l’axe`
        : r.sortie !== undefined
          ? `branche le détecteur derrière le multiplieur — une diode, puis ${M.C0_NF} nF en parallèle avec ${M.cran(s.R0)} kΩ — et affiche la tension du condensateur, en trait épais`
          : "pose le réglage du pari";
    setAnnonce(`La scène ${pose}.`);
  }, [pari.phase, etape]);

  // ── Rendu ──
  const renduRef = useRef<RenduModulation | null>(null);
  const reference = etat.reference === "depart" ? reglageDe(appliquer(etape.etat, etat)) : null;
  const dessiner = useCallback(() => {
    const s = renduRef.current;
    if (!s) return;
    s.mettreAJour({ courant: reglageDe(etat), detecte, marques, reference });
    s.rendre();
    const p = s.reperes();
    const cache = { x: 0, y: 0, visible: false };
    const en = (n: string, visible = true) => (p[n] && visible ? p[n] : cache);
    // la calibration : sous le cadre, aux deux coins (une place fixe, rien ne s'y croise)
    poser(refs.calV.current, en("calibration-v"), "0%", "0%");
    poser(refs.calT.current, en("calibration-t"), "0%", "-100%");
    disposer(
      [
        // les noms des voies, en bout de tracé, dans la marge de droite
        { el: refs.uS.current, p: en("fin-uS"), directions: [[1, 0], [1, -1], [1, 1], [1, -1.6], [1, 1.6]], portee: 32 },
        { el: refs.uC.current, p: en("fin-uC", detecte), directions: [[1, -1], [1, 0], [1, -1.6], [1, 1]], portee: 32 },
        { el: refs.max.current, p: en("curseur-max"), directions: [[1, 0], [1, -1], [1, 1]], portee: 18 },
        { el: refs.min.current, p: en("curseur-min"), directions: [[1, 0], [1, 1], [1, -1]], portee: 18 },
        { el: refs.periode.current, p: en("cote-periode"), directions: [[0, -1], [0, -1.6], [0, 1]], portee: 18 },
        { el: refs.comptage.current, p: en("crochet-comptage"), directions: [[0, 1], [0, 1.6], [0, -1]], portee: 18 },
        { el: refs.decrochage.current, p: en("decrochage"), directions: [[1, -1], [0, -1], [-1, -1], [1, 0]], portee: 32 },
        { el: refs.vidange.current, p: en("vidange"), directions: [[1, -1], [0, -1], [-1, -1], [1, 0]], portee: 32 },
        { el: refs.ref.current, p: en("reference"), directions: [[0, -1], [1, -1], [-1, -1]], portee: 18 },
        // le montage
        { el: refs.u.current, p: en("entree-u"), directions: [[0, -1], [0.5, -1], [-0.5, -1]], portee: 8 },
        { el: refs.p.current, p: en("entree-p"), directions: [[0, 1], [0.5, 1], [0, -1]], portee: 8 },
        { el: refs.uSm.current, p: en("nom-uS-montage"), directions: [[0, -1], [0.5, -1], [-0.5, -1]], portee: 8 },
        { el: refs.uCm.current, p: en("nom-uC-montage", detecte), directions: [[0, -1], [0.5, -1], [-0.5, -1]], portee: 8 },
        // R0 à GAUCHE de sa résistance : à droite, au téléphone, il tombait sur le rail (porte, 390 px)
        { el: refs.R0.current, p: en("R0-gauche", detecte), directions: [[-1, 0], [-1, -0.6], [-1, 0.6]], portee: 8 },
        { el: refs.C0.current, p: en("C0", detecte), directions: [[1, 0], [1, -1], [1, 1]], portee: 8 },
      ],
      s.segments(),
      s.cadre(),
      [boiteLegende(rendu.hoteRef.current), ...s.zones()].filter((b): b is NonNullable<typeof b> => b !== null)
    );
    for (const n of REPERES) poser(repRefs.current[n].current, p[n] ?? cache);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etat, revele, indexEtape, detecte]);

  const rendu = useSceneRendu<RenduModulation>(() => import("@/lib/scene2d/modulation-rendu").then((m) => m.creerRenduModulation), dessiner);
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

  // ── Les nombres (une seule voie : le modèle) ──
  const g = reglageDe(etat);
  const ext = M.extrema(g.U0, g.Sm);
  const Tp = M.periodePorteuse(g.F);
  const n = M.oscillations(g.F);
  const tau = M.constanteTemps(g.R0);

  const regler = (patch: Partial<EtatBanc>) => {
    const s = { ...etatRef.current, ...patch };
    setEtat(s);
    const r = reglageDe(s);
    const e = M.extrema(r.U0, r.Sm);
    // chaque réglage est DIT : le lecteur d'écran ne relit pas l'image
    if (patch.F !== undefined) setAnnonce(`Porteuse à ${M.cran(s.F)} kHz : ${M.oscillations(r.F)} oscillations sur l’écran ; l’enveloppe ne change pas.`);
    else if (patch.Sm !== undefined || patch.U0 !== undefined)
      setAnnonce(
        `${patch.Sm !== undefined ? `Amplitude du signal ${M.cran(s.Sm)} V` : `Composante continue ${M.cran(s.U0)} V`} : crêtes à ${V2(e.max)} division${e.max >= 2 ? "s" : ""} aux renflements, ${V2(e.min)} aux resserrements${r.Sm >= r.U0 ? ", l’enveloppe touche l’axe" : ""}.`
      );
    else if (patch.R0 !== undefined) setAnnonce(`Rhéostat sur ${M.cran(s.R0)} kΩ : constante de temps ${ms3(M.constanteTemps(r.R0))}.`);
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
        libelleOuvrir="Ouvrir le banc de modulation"
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

  // ce que le lecteur d'écran entend : le montage et l'écran, sans rien de ce qu'un pari fait deviner
  const forme = (() => {
    if (!detecte) return "";
    const uC = M.detecteur(g.F, g.U0, g.Sm, g.R0);
    let creux = 0, ecart = 0;
    for (let i = 0; i <= 400; i++) {
      const t = (i / 400) * M.DUREE_MS;
      const E = M.enveloppe(t, g.U0, g.Sm);
      creux = Math.max(creux, E - uC(t));
      ecart = Math.max(ecart, uC(t) - E);
    }
    return creux > 0.25
      ? " En trait épais, la tension du condensateur retombe presque jusqu’à l’axe entre deux crêtes, en dents de scie profondes."
      : ecart > 0.1
        ? " En trait épais, la tension du condensateur monte avec les crêtes puis s’en écarte, presque en ligne droite, avant de les rejoindre plus loin."
        : " En trait épais, la tension du condensateur longe les crêtes, en dents de scie fines.";
  })();
  const surmodule = g.Sm >= g.U0;
  const description =
    `Montage : un multiplieur, boîte marquée X, reçoit la tension à transmettre et la porteuse ; sa sortie est branchée sur l’oscilloscope.` +
    (detecte ? ` Derrière le multiplieur, une diode, puis un condensateur de ${M.C0_NF} nF en parallèle avec un rhéostat de ${M.cran(etat.R0)} kΩ ; la tension du condensateur est sur la seconde voie.` : "") +
    ` Écran de 10 divisions sur 8 ; 1,00 V par division, 0,50 ms par division. Sur l’écran, une oscillation rapide sous une enveloppe lente` +
    (surmodule
      ? (revele ? ` ; elle s’écarte de l’axe jusqu’à ${V2(ext.max)} divisions, et l’enveloppe touche l’axe${g.Sm > g.U0 ? ", avec entre deux contacts une petite bosse retournée" : ""}.` : ".")
      : `, qui s’écarte de l’axe jusqu’à ${V2(ext.max)} divisions aux renflements et ${V2(ext.min)} aux resserrements.`) +
    (lectures.includes("comptage-porteuse") ? ` On compte ${n} oscillations sur les 10 divisions.` : "") +
    forme;

  const blocLectures = (
    <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
      {/* la calibration est l'ÉNONCÉ : visible à toutes les étapes, avant tout pari */}
      {ligneLecture("calibration", "Réglages de l’écran", "1,00 V/div · 0,50 ms/div · 10 × 8 divisions")}
      {lectures.includes("comptage-porteuse") && ligneLecture("comptage-porteuse", "Porteuse, comptée", `${n} oscillations complètes sur les 10 divisions`)}
      {lectures.includes("porteuse-lue") && ligneLecture("porteuse-lue", "Porteuse, lue", <MathText>{`$T_p = ${tex(M.troisCs(Tp))}$ ms · $F = ${tex(M.troisCs(g.F))}$ kHz`}</MathText>)}
      {lectures.includes("signal-lu") &&
        ligneLecture("signal-lu", "Signal modulant, lu", <MathText>{`5,00 div → $T = ${tex(M.troisCs(M.T_ENV_MS))}$ ms · $f = ${M.F_SIGNAL_HZ}$ Hz`}</MathText>)}
      {lectures.includes("rapport-frequences") && ligneLecture("rapport-frequences", <MathText>{"Rapport $F/f$"}</MathText>, String(M.rapportFrequences(g.F)))}
      {lectures.includes("extrema") &&
        ligneLecture(
          "extrema",
          "Crêtes, lues",
          <MathText>{`$U_{max} = ${tex(V2(ext.max))}$ div $= ${tex(V2(ext.max))}$ V · $U_{min} = ${tex(V2(ext.min))}$ div $= ${tex(V2(ext.min))}$ V`}</MathText>
        )}
      {lectures.includes("amplitude-a") &&
        ligneLecture(
          "amplitude-a",
          <MathText>{"Amplitude $A$"}</MathText>,
          <MathText>{`lue : $\\frac{U_{max}+U_{min}}{2} = ${tex(V2(M.amplitudeLue(ext.max, ext.min)))}$ V · réglée : $A = kP_mU_0 = ${tex(V2(M.amplitudeA(g.U0)))}$ V`}</MathText>
        )}
      {lectures.includes("entrees") && ligneLecture("entrees", "Entrées réglées", <MathText>{`$U_0 = ${tex(M.cran(etat.U0))}$ V · $S_m = ${tex(M.cran(etat.Sm))}$ V`}</MathText>)}
      {lectures.includes("taux-lu") &&
        ligneLecture("taux-lu", "Taux, lu", <MathText>{`$m = \\frac{U_{max}-U_{min}}{U_{max}+U_{min}} = ${tex(V2(M.tauxLu(ext.max, ext.min)))}$`}</MathText>)}
      {lectures.includes("taux-regle") && ligneLecture("taux-regle", "Taux, réglé", <MathText>{`$m = S_m/U_0 = ${tex(V2(M.tauxRegle(g.Sm, g.U0)))}$`}</MathText>)}
      {lectures.includes("constante-temps") &&
        ligneLecture("constante-temps", "Constante de temps", <MathText>{`$R_0C_0 = ${tex(M.cran(etat.R0))}$ kΩ × ${M.C0_NF} nF $= ${tex(M.troisCs(tau))}$ ms`}</MathText>)}
      {lectures.includes("fenetre") &&
        ligneLecture("fenetre", "Les trois durées", <MathText>{`$1/F = ${tex(M.troisCs(Tp))}$ ms · $R_0C_0 = ${tex(M.troisCs(tau))}$ ms · $1/f = ${tex(M.troisCs(M.T_ENV_MS))}$ ms`}</MathText>)}
    </dl>
  );

  const notes = [
    "Banc d’essai : la porteuse est à quelques kilohertz, comme sur les oscillogrammes des sujets ; une porteuse de radio (900 kHz) ferait 450 oscillations par division — indessinable.",
    indexEtape >= 1
      ? "Oscilloscope idéal : les hauteurs sont calculées ; sur un vrai écran le trait a une épaisseur, et $m$ n’est connu qu’à quelques centièmes."
      : "Oscilloscope idéal : les hauteurs et les durées sont calculées ; sur un vrai écran, le trait a une épaisseur.",
    "On lit l’enveloppe — la courbe que les sommets touchent —, comme le font les sujets ; quand la porteuse est lente, aucune crête ne tombe exactement sur un extremum, et les nombres affichés sont ceux de l’enveloppe.",
    "Quatre traits fins par division, et non cinq comme sur un oscilloscope réel : chaque hauteur de crête lue ici tombe exactement sur un trait. Les formules s’écrivent avec cos ; l’écran est décalé d’un quart de période d’enveloppe, pour que les quatre extrema tombent dans le cadre.",
    ...(detecte
      ? ["Diode et condensateur parfaits : les petites dents de scie qui restent au meilleur réglage viennent de ce que la porteuse n’est que 20 fois plus rapide que le signal ; sur une vraie radio, elle l’est 300 fois."]
      : []),
  ];

  const groupe = (id: string, legende: string, valeurs: readonly string[], courant: string, unite: string, choisir: (v: string) => void) => (
    <fieldset className="flex flex-col gap-1" data-controle={id}>
      <legend className="mb-1 text-body-sm text-secondary">{frenchTypography(legende)}</legend>
      <div className="flex flex-wrap gap-x-1">
        {valeurs.map((x) => (
          <label key={x} className={LIGNE_RADIO}>
            <input type="radio" name={`${idTitre}-${id}`} value={x} checked={courant === x} onChange={() => choisir(x)} className="accent-figure-ink-soft" />
            <span className="tabular-nums">{frenchTypography(`${M.cran(x)} ${unite}`)}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={rendu.panneau}
      data-scene-etape={etape.id}
      data-pari={pari.phase}
      data-f-khz={etat.F}
      data-sm-v={etat.Sm}
      data-u0-v={etat.U0}
      data-r0-kohm={etat.R0}
      data-sortie={etat.sortie}
      data-reference={etat.reference}
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
          legende={<MathText>{"$k = 0{,}250$ V⁻¹ · $P_m = 2{,}00$ V"}</MathText>}
          messageSansWebgl="Ce navigateur n’affiche pas le banc (dessin indisponible). Les paris et les réglages restent."
          onRelancer={rendu.relancer}
          // le montage ET l'écran empilés : en 4:3 au téléphone, l'écran n'aurait
          // que 20 px par division pour quarante oscillations
          format="carre-partout"
        >
          <Etiquette refEl={refs.u} nom="nom-u" discret>
            <MathText>{"$u(t)$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.p} nom="nom-p" discret>
            <MathText>{"$p(t)$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.uSm} nom="nom-uS-montage" fond>
            <MathText>{"$u_S$"}</MathText>
          </Etiquette>
          {/* une étiquette cachée reste dans le TEXTE du panneau : celles qui répondent
              n'ont de contenu qu'une fois leur étape révélée — le détecteur n'existe
              pas avant S4, « U_max » pas avant S2 (la leçon du tremplin, a_T) */}
          <Etiquette refEl={refs.uCm} nom="nom-uC-montage" fond>
            {detecte && <MathText>{"$u_C$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.R0} nom="nom-R0" discret>
            {detecte && <MathText>{"$R_0$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.C0} nom="nom-C0" discret>
            {detecte && <MathText>{"$C_0$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.calV} nom="calibration-v" texte="1,00 V/div" discret />
          <Etiquette refEl={refs.calT} nom="calibration-t" texte="0,50 ms/div" discret />
          <Etiquette refEl={refs.uS} nom="nom-uS" fond>
            <MathText>{"$u_S$"}</MathText>
          </Etiquette>
          <Etiquette refEl={refs.uC} nom="nom-uC" fond>
            {detecte && <MathText>{"$u_C$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.periode} nom="cote-periode" fond texte={marques.includes("periode") ? "5,00 div = 2,50 ms" : ""} />
          <Etiquette refEl={refs.comptage} nom="cote-comptage" fond texte={marques.includes("comptage") ? `${n} oscillations` : ""} />
          <Etiquette refEl={refs.max} nom="cote-max" fond>
            {marques.includes("extrema") && <MathText>{"$U_{max}$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.min} nom="cote-min" fond>
            {marques.includes("extrema") && <MathText>{"$U_{min}$"}</MathText>}
          </Etiquette>
          <Etiquette refEl={refs.ref} nom="nom-ref" texte="départ" fond discret />
          <Etiquette refEl={refs.decrochage} nom="nom-decrochage" texte={marques.includes("decrochage") ? "ici, elle ne suit plus" : ""} fond />
          {/* court : « ici, le condensateur se vide » faisait six divisions au téléphone, et
              couvrait la crête de u_C que l'étape fait regarder */}
          <Etiquette refEl={refs.vidange} nom="nom-vidange" fond>
            {marques.includes("vidange") && <MathText>{"ici, $C_0$ se vide"}</MathText>}
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

          {/* à l'étape libre, quatre groupes de réglages : les lectures les PRÉCÈDENT,
              comme au banc de diffraction — après eux, au téléphone, elles tombaient
              loin sous la scène collante */}
          {libre && blocLectures}

          <div className="flex flex-col gap-5">
            {ouvre("porteuse") && groupe("porteuse", "La porteuse (fréquence F)", M.PORTEUSES, etat.F, "kHz", (x) => regler({ F: x as M.Porteuse }))}
            {ouvre("modulante") && groupe("modulante", "Le signal à transmettre (amplitude Sm)", M.MODULANTES, etat.Sm, "V", (x) => regler({ Sm: x as M.Modulante }))}
            {ouvre("continue") && groupe("continue", "La composante continue (U0)", M.CONTINUES, etat.U0, "V", (x) => regler({ U0: x as M.Continue }))}
            {ouvre("detecteur") && detecte && groupe("detecteur", "Le rhéostat du détecteur (R0)", M.DETECTEURS, etat.R0, "kΩ", (x) => regler({ R0: x as M.Detecteur }))}
          </div>

          {!libre && blocLectures}

          {pari.tempsOuvert && (
            <div className="flex flex-col gap-2" data-notes>
              <EncadreRepli titre="Ce que ce banc simplifie">
                {/* les notes suivent la chaîne : le taux n'y paraît qu'à partir de S2, le
                    détecteur qu'une fois branché — une note est du texte, et le texte fuit */}
                <MathText>{frenchTypography(notes.join(" "))}</MathText>
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
