"use client";

/**
 * Scene3DPanel — une scène 3D de première partie dans une leçon (ADR 0041).
 *
 * Le marqueur est `[[embed:<slug>]]`, comme tout manipulable ; le descripteur
 * `media/<slug>.json` porte `"tool": "scene3d"`. Première scène :
 * l'orbite géostationnaire (pc/chute-mouvements-plans, R10), qui solde la
 * substitution écrite en tête de `orbites-gravite.svg` — « au lieu d'un
 * curseur de rayon continu, TROIS rayons fixes » — par le curseur continu.
 *
 * ── Pourquoi de la 3D ICI, et pas ailleurs ────────────────────────────────
 * Deux des trois conditions géostationnaires sont spatiales : le PLAN de
 * l'orbite et le SENS de rotation. Une figure plane les énonce ; seule une
 * scène qu'on tourne les montre. Et la misconception CH-KEP-2 (« immobile
 * dans l'absolu ») se casse en changeant de RÉFÉRENTIEL sous les yeux de
 * l'élève — le même satellite, immobile au-dessus de P dans le référentiel
 * terrestre, file à 3,07 km/s dans le géocentrique. C'est la manipulation qui
 * enseigne (VISION : « an interactive appears because manipulation is the path
 * to understanding »), pas le relief.
 *
 * ── Feuille de charge (DESIGN-BIBLE, mode audit d'abord) ─────────────────
 *   §0/§7  opt-in : la scène est FERMÉE par défaut, comme EmbedPanel ;
 *          three.js n'est chargé qu'au clic (import dynamique).
 *   §5     le temps est EN PAUSE à l'ouverture ; rien ne bouge qui n'ait été
 *          lancé ; rendu à la demande — aucune boucle quand rien ne change.
 *   §7     des ÉTAPES : une consigne et UN contrôle neuf par étape (rayon →
 *          plan → sens → référentiel), puis l'étape libre. Les contrôles
 *          d'une étape à venir sont ABSENTS du DOM, pas grisés ; chaque étape
 *          déclare SES lectures (aucune par défaut). La scène est COLLANTE :
 *          l'image qu'on change reste sous les yeux pendant qu'on règle, et
 *          chaque contrôle porte un `scroll-margin-top` pour qu'un focus ne se
 *          range jamais sous elle (WCAG 2.4.11).
 *   PC     chaque étape commence par un PARI (VISION : « confront the wrong
 *          model ») : tant que l'élève n'a pas parié, ni le temps ni le
 *          contrôle de l'étape n'existent. Quand le temps révèle
 *          (`revele_apres_h`), le verdict attend que la SCÈNE ait montré la
 *          réponse ; le contrôle de l'étape et ses lectures s'ouvrent ensuite.
 *          Même grammaire que les points d'arrêt (ChoiceButton, ResultRow).
 *   §2     l'accent marque DEUX choses : l'action (« Lancer le temps ») et le
 *          satellite. Curseurs, coches, numéro d'étape restent neutres
 *          (critique calme, 2026-09-23 : il était dépensé six fois).
 *   §9     contrôles natifs (range, number, radio, button) ; conditions en
 *          TEXTE + glyphe, jamais la couleur seule ; le verdict est une
 *          région live qui ne parle que quand il CHANGE ; le canvas est une
 *          image décrite ; glisser pour tourner la vue ne bloque jamais le
 *          défilement vertical (touch-action: pan-y), et les trois vues
 *          prédéfinies en sont l'équivalent clavier.
 *   état   toutes les lectures sont CALCULÉES (`kepler.ts`) ; aucune mémoire
 *          navigateur — chaque montage repart de l'étape 1.
 *   §13    le canvas ne s'imprime pas : le panneau est `print:hidden`, et la
 *          figure figée qui le précède dans la leçon couvre le papier.
 *   ADR 0032  le bouton d'ouverture est `disabled` + `aria-busy` tant que
 *          React n'a pas la main.
 *
 * ── Les états du panneau (data-scene-etat) ────────────────────────────────
 *   ferme → chargement → prete
 *                      ↘ sans-webgl  (la 3D manque ; les calculs restent)
 *                      ↘ erreur      (module non chargé, contexte perdu ;
 *                                     un bouton relance)
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type {
  NotionChoice,
  Scene3DControle,
  Scene3DDescriptor,
  Scene3DEtape,
  Scene3DEtat,
  Scene3DLecture,
} from "@/lib/content";
import { useHydrated } from "@/lib/useHydrated";
import { cn } from "@/lib/utils";
import { frenchTypography } from "@/lib/frenchTypography";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CheckIcon, CrossIcon, Icon, InteractiveIcon, PauseIcon, PlayIcon } from "@/components/ui/Icon";
import { TransportButton, TRANSPORT_BTN_CLASS } from "./TransportButton";
import { ChoiceButton, MathText, ResultRow } from "./ChoiceButton";
import * as K from "@/lib/scene3d/kepler";
import type { SceneOrbite } from "@/lib/scene3d/orbite-geostationnaire";

type EtatPanneau = "ferme" | "chargement" | "prete" | "sans-webgl" | "erreur";
type NomVue = "biais" | "dessus" | "cote";

const VUES: Record<NomVue, { azimut: number; elevation: number; libelle: string }> = {
  biais: { azimut: 28, elevation: 20, libelle: "De biais" },
  dessus: { azimut: 28, elevation: 88, libelle: "Du pôle Nord" },
  cote: { azimut: 28, elevation: 0, libelle: "Dans le plan de l’équateur" },
};

/** Temps simulé par seconde réelle : une heure par seconde (un jour en 24 s). */
const HEURES_PAR_SECONDE = 1;
const TEMPS_MAX = 48 * 3600;
/** Une pression sur « Lancer le temps » court au plus une rotation terrestre. */
const COURSE = 24 * 3600;
/** Le curseur neutre : l'accent est réservé à l'action et au satellite (§2). */
const CURSEUR = "w-full accent-figure-ink-soft";
const RAYON_MIN_KM = 7000;
const RAYON_MAX_KM = 60000;

function rayonDepuis(v: Scene3DEtat["rayon_km"], courant: number): number {
  if (v === "geo") return K.RAYON_GEO_GRILLE;
  if (typeof v === "number") return Math.round((v * 1000) / K.PAS_RAYON) * K.PAS_RAYON;
  return courant;
}

function appliquer(etat: Scene3DEtat | undefined, courant: K.EtatOrbite): K.EtatOrbite {
  if (!etat) return courant;
  return {
    rayon: rayonDepuis(etat.rayon_km, courant.rayon),
    inclinaison: etat.inclinaison_deg ?? courant.inclinaison,
    sens: etat.sens ? (etat.sens === "retrograde" ? -1 : 1) : courant.sens,
    referentiel: etat.referentiel ?? courant.referentiel,
    // Entrer dans une étape qui pose un état : le satellite repart à la
    // verticale de P. La consigne le dit.
    temps: 0,
  };
}

const ETAT_DE_BASE: K.EtatOrbite = {
  rayon: 26_000_000,
  inclinaison: 0,
  sens: 1,
  referentiel: "terrestre",
  temps: 0,
};

interface Scene3DPanelProps {
  scene: Scene3DDescriptor;
  className?: string;
}

export function Scene3DPanel({ scene, className }: Scene3DPanelProps) {
  const hydrated = useHydrated();
  const [panneau, setPanneau] = useState<EtatPanneau>("ferme");
  const [tentative, setTentative] = useState(0);

  const etapes = scene.etapes;
  const [indexEtape, setIndexEtape] = useState(0);
  const etape: Scene3DEtape = etapes[indexEtape];
  const [etat, setEtat] = useState<K.EtatOrbite>(() => appliquer(etapes[0]?.etat, ETAT_DE_BASE));
  const [vue, setVue] = useState<NomVue | null>(etapes[0]?.etat?.vue ?? "biais");
  const [angles, setAngles] = useState(VUES[etapes[0]?.etat?.vue ?? "biais"]);
  const [enLecture, setEnLecture] = useState(false);
  // Le pari de l'étape courante : le choix, et s'il est RÉVÉLÉ (collant : une
  // fois la réponse montrée, remettre le temps à zéro ne la cache pas).
  const [choixPari, setChoixPari] = useState<string | null>(null);
  const [pariRevele, setPariRevele] = useState(false);

  const idTitre = useId();
  const idConsigne = useId();

  const hoteRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<SceneOrbite | null>(null);
  const etiquetteN = useRef<HTMLSpanElement>(null);
  const etiquetteP = useRef<HTMLSpanElement>(null);

  const ouvre = (c: Scene3DControle) => etape.controles.includes(c);

  // ── Aller à une étape : pose son état, arrête le temps ──
  const allerA = useCallback(
    (i: number) => {
      const e = etapes[i];
      setIndexEtape(i);
      setEnLecture(false);
      setChoixPari(null);
      setPariRevele(false);
      setEtat((courant) => appliquer(e.etat, courant));
      if (e.etat?.vue) {
        setVue(e.etat.vue);
        setAngles(VUES[e.etat.vue]);
      }
    },
    [etapes]
  );

  // ── Rendu 3D : à chaque changement d'état, et seulement alors ──
  const dessiner = useCallback(() => {
    const s = sceneRef.current;
    if (!s) return;
    s.mettreAJour(etat);
    s.orienter(angles.azimut, angles.elevation);
    s.rendre();
    const { N, P } = s.etiquettes();
    for (const [ref, p] of [
      [etiquetteN, N],
      [etiquetteP, P],
    ] as const) {
      const el = ref.current;
      if (!el) continue;
      // « P » se pose au-dessus de son point, pas dessus : le point, l'équateur
      // et la verticale s'y croisent déjà.
      el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, ${ref === etiquetteP ? "-120%" : "-50%"})`;
      el.style.visibility = p.visible ? "visible" : "hidden";
    }
  }, [etat, angles]);

  useEffect(() => {
    dessiner();
  }, [dessiner]);

  // ── Chargement de three.js, au clic seulement ──
  useEffect(() => {
    if (panneau !== "chargement") return;
    let annule = false;
    import("@/lib/scene3d/orbite-geostationnaire")
      .then((rendu) => {
        if (annule) return;
        const canvas = canvasRef.current;
        const hote = hoteRef.current;
        if (!canvas || !hote) return;
        try {
          sceneRef.current = rendu.creerSceneOrbite(canvas, hote);
        } catch {
          setPanneau("sans-webgl");
          return;
        }
        const r = hote.getBoundingClientRect();
        sceneRef.current.redimensionner(r.width, r.height);
        setPanneau("prete");
      })
      .catch(() => {
        if (!annule) setPanneau("erreur");
      });
    return () => {
      annule = true;
    };
  }, [panneau, tentative]);

  // Le rendu dépend de l'état « prete » (la scène vient d'exister).
  useEffect(() => {
    if (panneau === "prete") dessiner();
  }, [panneau, dessiner]);

  // ── Redimensionnement, thème, contexte perdu, démontage ──
  useEffect(() => {
    if (panneau !== "prete") return;
    const hote = hoteRef.current;
    const canvas = canvasRef.current;
    const s = sceneRef.current;
    if (!hote || !canvas || !s) return;
    const ro = new ResizeObserver(([entree]) => {
      const { width, height } = entree.contentRect;
      s.redimensionner(width, height);
      dessinerRef.current();
    });
    ro.observe(hote);
    const mo = new MutationObserver(() => {
      s.relireCouleurs();
      dessinerRef.current();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    const perdu = (ev: Event) => {
      ev.preventDefault();
      setEnLecture(false);
      setPanneau("erreur");
    };
    canvas.addEventListener("webglcontextlost", perdu);
    return () => {
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener("webglcontextlost", perdu);
    };
  }, [panneau]);

  const dessinerRef = useRef(dessiner);
  dessinerRef.current = dessiner;

  useEffect(
    () => () => {
      sceneRef.current?.detruire();
      sceneRef.current = null;
    },
    []
  );

  // ── Le temps : il ne coule que lancé à la main ──
  // Le temps courant est lu dans une référence, pas dans un updater de
  // setState : React applique les updaters au rendu suivant, un drapeau
  // « fini » posé dedans serait lu trop tôt et la boucle ne s'arrêterait
  // jamais à 48 h.
  const tempsRef = useRef(etat.temps);
  tempsRef.current = etat.temps;
  useEffect(() => {
    if (!enLecture) return;
    let id = 0;
    let avant: number | null = null;
    // Une course s'arrête à la prochaine rotation terrestre complète (24 h,
    // puis 48 h) : la trace d'un jour est l'image complète, et une scène
    // laissée seule ne tourne pas indéfiniment.
    const butee = Math.min(TEMPS_MAX, (Math.floor(tempsRef.current / COURSE + 1e-9) + 1) * COURSE);
    const pas = (maintenant: number) => {
      if (avant !== null) {
        // Plafond à 0,25 s : au retour d'un onglet caché, le satellite ne saute
        // pas de plusieurs heures ; mais un appareil lent (7 images/s mesurées
        // sous rendu logiciel) garde l'annonce « 1 h par seconde » vraie — un
        // plafond à 0,1 s la rendait fausse de 25 %.
        const dt = Math.min(0.25, (maintenant - avant) / 1000);
        const t = Math.min(butee, tempsRef.current + dt * HEURES_PAR_SECONDE * 3600);
        tempsRef.current = t;
        setEtat((e) => ({ ...e, temps: t }));
        if (t >= butee) {
          setEnLecture(false);
          return;
        }
      }
      avant = maintenant;
      id = requestAnimationFrame(pas);
    };
    id = requestAnimationFrame(pas);
    return () => cancelAnimationFrame(id);
  }, [enLecture]);

  // ── Glisser pour tourner la vue ──
  const glisse = useRef<{ x: number; y: number; souris: boolean } | null>(null);
  const surPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.button !== 0) return;
    glisse.current = { x: e.clientX, y: e.clientY, souris: e.pointerType === "mouse" };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const surPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const g = glisse.current;
    if (!g) return;
    const dx = e.clientX - g.x;
    const dy = e.clientY - g.y;
    g.x = e.clientX;
    g.y = e.clientY;
    setVue(null);
    setAngles((a) => ({
      ...a,
      azimut: a.azimut - dx * 0.4,
      // Au doigt, le vertical appartient au défilement de la page.
      elevation: g.souris ? Math.max(-80, Math.min(88, a.elevation + dy * 0.3)) : a.elevation,
    }));
  };
  const surPointerUp = () => {
    glisse.current = null;
  };

  // ── Lectures (toutes calculées) ──
  const T = K.periode(etat.rayon);
  const cond = K.conditions(etat);
  const vGeo = K.vitesseOrbitale(etat.rayon);
  const vSol = K.norme(K.vitesseTerrestre(etat));
  const rayonKm = Math.round(etat.rayon / 1000);
  const [saisieRayon, setSaisieRayon] = useState<string | null>(null);

  const description = useMemo(
    () =>
      `Scène en trois dimensions : la Terre, son axe, le point P de l’équateur et sa verticale, et un satellite ` +
      `sur une orbite de rayon ${K.formatKm(etat.rayon)}, inclinée de ${K.formatDegres(etat.inclinaison)} sur l’équateur, ` +
      `parcourue ${etat.sens === 1 ? "dans le même sens que la rotation de la Terre" : "en sens contraire de la rotation de la Terre"}, ` +
      `vue dans le référentiel ${etat.referentiel === "terrestre" ? "terrestre (lié au sol)" : "géocentrique"}.`,
    [etat.rayon, etat.inclinaison, etat.sens, etat.referentiel]
  );

  // ── Le pari ──
  const pari = etape.pari;
  const choixNotion: NotionChoice[] = useMemo(
    () => (pari?.choix ?? []).map((c) => ({ id: c.id, text: c.texte, correct: c.juste, feedback: c.retour, misconception: c.misconception })),
    [pari]
  );
  const seuilRevele = (pari?.revele_apres_h ?? 0) * 3600;
  useEffect(() => {
    if (pari && choixPari !== null && !pariRevele && etat.temps >= seuilRevele) setPariRevele(true);
  }, [pari, choixPari, pariRevele, etat.temps, seuilRevele]);
  const phase: "aucun" | "attente" | "note" | "revele" = !pari
    ? "aucun"
    : choixPari === null
      ? "attente"
      : pariRevele
        ? "revele"
        : "note";
  const tempsOuvert = phase !== "attente";
  const etapeOuverte = phase === "aucun" || phase === "revele";
  const choixRetenu = pari?.choix.find((c) => c.id === choixPari);
  const lectures: Scene3DLecture[] = etapeOuverte ? etape.lectures ?? [] : [];

  const verdict = cond.geostationnaire
    ? "Géostationnaire : vu du sol, le satellite reste au-dessus de P."
    : "Pas géostationnaire : vu du sol, le satellite ne reste pas au-dessus de P.";

  // ══ Rendu ══════════════════════════════════════════════════════════════

  if (panneau === "ferme") {
    return (
      <div
        className={cn("my-10 notion-wide-band print:hidden", className)}
        data-scene={scene.scene}
        data-scene-etat="ferme"
      >
        <Eyebrow tone="muted" decorative className="mb-3">
          Scène 3D
        </Eyebrow>
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4",
            "w-full rounded-xl bg-surface-raised shadow-elevation-1",
            "px-8 py-14 text-center"
          )}
        >
          <InteractiveIcon size={36} className="text-border-soft" />
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium text-secondary">
              {frenchTypography(scene.title ?? "Scène manipulable")}
            </p>
            {scene.caption && (
              <p className="text-caption text-secondary max-w-[52ch] leading-relaxed">
                {frenchTypography(scene.caption)}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setPanneau("chargement")}
            disabled={!hydrated}
            aria-busy={!hydrated || undefined}
            className={cn("btn-primary", "focus-ring")}
          >
            <PlayIcon size={14} />
            Ouvrir la scène 3D
          </button>
        </div>
      </div>
    );
  }

  const conditionLigne = (ok: boolean, texte: string, detail: React.ReactNode) => (
    <li className="flex items-start gap-2">
      {/* Coche et croix en encre : le glyphe ET le texte portent le sens (§9),
          l'accent reste à l'action et au satellite (§2). */}
      <span className={cn("mt-0.5 shrink-0", ok ? "text-primary" : "text-secondary")}>
        {ok ? <CheckIcon size={16} title="rempli" /> : <CrossIcon size={16} title="non rempli" />}
      </span>
      <span className="min-w-0 break-words">
        <span className="text-primary">{texte}</span>
        {detail ? (
          <>
            {" "}
            <span className="text-secondary tabular-nums">{detail}</span>
          </>
        ) : null}
      </span>
    </li>
  );

  // Les vues prédéfinies (l'équivalent clavier du glisser). Rendues à DEUX
  // endroits selon la largeur, jamais les deux à la fois (`display: none`
  // les retire de l'arbre d'accessibilité et de l'ordre de tabulation) : sous
  // la scène collante sur grand écran, après les réglages au téléphone.
  const blocVues = (visibilite: string) => (
    <div
      className={cn(
        "flex-wrap items-center gap-2",
        "[&_button]:scroll-mt-[calc(3.5rem+75vw+1rem)] bp-expanded:[&_button]:scroll-mt-24",
        visibilite
      )}
      role="group"
      aria-label="Orientation de la vue"
    >
      <span className="text-caption text-secondary">{frenchTypography("Vue :")}</span>
      {(Object.keys(VUES) as NomVue[]).map((v) => (
        <button
          key={v}
          type="button"
          aria-pressed={vue === v}
          onClick={() => {
            setVue(v);
            setAngles(VUES[v]);
          }}
          className={cn(
            TRANSPORT_BTN_CLASS,
            // Enfoncé : fond, encre ET graisse — jamais la couleur seule (§9).
            vue === v && "bg-surface-container-high border-soft text-primary font-semibold"
          )}
        >
          {VUES[v].libelle}
        </button>
      ))}
    </div>
  );

  return (
    <section
      className={cn("my-10 notion-wide-band print:hidden", className)}
      aria-labelledby={idTitre}
      data-scene={scene.scene}
      data-scene-etat={panneau}
      data-scene-etape={etape.id}
      data-rayon-m={etat.rayon}
      data-inclinaison={etat.inclinaison}
      data-sens={etat.sens === 1 ? "direct" : "retrograde"}
      data-referentiel={etat.referentiel}
      data-temps-s={Math.round(etat.temps)}
      data-geostationnaire={cond.geostationnaire ? "oui" : "non"}
      data-pari={phase}
    >
      <Eyebrow tone="muted" decorative className="mb-3">
        Scène 3D
      </Eyebrow>

      {/* ── La consigne de l'étape : AVANT la scène (on lit, puis on manipule) ── */}
      <div className="mb-4 max-w-reading">
        <p id={idTitre} className="text-body font-semibold text-primary">
          {frenchTypography(etape.titre)}
        </p>
        <p id={idConsigne} className="mt-2 min-w-0 break-words font-display text-body-lg text-primary">
          {frenchTypography(etape.consigne)}
        </p>
      </div>

      <div className="grid gap-5 bp-expanded:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] bp-expanded:items-start">
        {/* ── La scène ── COLLANTE, à toutes les largeurs : quand les réglages
            s'allongent (un pari, son retour, le temps, le contrôle, les
            lectures), l'image qu'on change reste sous les yeux. Au téléphone,
            le curseur de rayon tombait à ~750 px sous la scène une fois le pari
            révélé : l'élève réglait le rayon sans voir le satellite. Sous le
            header (56 px) au téléphone, en 4:3 pour laisser ~400 px aux
            réglages qui défilent dessous ; en carré sur grand écran. */}
        <div className="sticky top-14 z-10 bp-expanded:top-20 bp-expanded:self-start">
          <div
            ref={hoteRef}
            className={cn(
              // Le fond du conteneur EST la surface des figures : pas de saut
              // de ton entre le chargement et la première image. Élévation 1,
              // comme la figure figée qui la précède.
              "relative w-full overflow-hidden rounded-xl",
              "bg-figure-surface shadow-elevation-1",
              // Carré sur grand écran : la caméra cadre une SPHÈRE (l'orbite
              // peut s'incliner jusqu'au pôle) ; un 4:3 y gaspillait un quart
              // de la largeur. Au téléphone, 4:3 : la scène collante doit
              // laisser de la place aux réglages qui défilent dessous.
              "aspect-[4/3] bp-expanded:aspect-square"
            )}
          >
            <canvas
              ref={canvasRef}
              role="img"
              aria-label={description}
              className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
              onPointerDown={surPointerDown}
              onPointerMove={surPointerMove}
              onPointerUp={surPointerUp}
              onPointerCancel={surPointerUp}
            />
            <span
              ref={etiquetteN}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 text-caption font-semibold text-primary"
              style={{ visibility: "hidden" }}
            >
              N
            </span>
            <span
              ref={etiquetteP}
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 text-caption font-semibold text-primary"
              style={{ visibility: "hidden" }}
            >
              P
            </span>
            <p className="pointer-events-none absolute left-3 top-2 text-caption text-secondary">
              {etat.referentiel === "terrestre" ? "Référentiel terrestre — vu du sol" : "Référentiel géocentrique"}
            </p>

            {panneau === "chargement" && (
              <div className="absolute inset-0 flex items-center justify-center bg-figure-surface">
                <p className="text-caption text-secondary">Chargement de la scène…</p>
              </div>
            )}
            {(panneau === "sans-webgl" || panneau === "erreur") && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-figure-surface px-6 text-center">
                <p className="text-body-sm text-secondary max-w-[44ch]">
                  {panneau === "sans-webgl"
                    ? "Ce navigateur n’affiche pas la 3D (WebGL indisponible). Les réglages et les calculs à côté restent justes ; la figure au-dessus montre les trois rayons."
                    : "La scène 3D s’est interrompue."}
                </p>
                {panneau === "erreur" && (
                  <button
                    type="button"
                    className={TRANSPORT_BTN_CLASS}
                    onClick={() => {
                      sceneRef.current?.detruire();
                      sceneRef.current = null;
                      setTentative((n) => n + 1);
                      setPanneau("chargement");
                    }}
                  >
                    <Icon name="reset" size={13} />
                    Relancer la scène
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-3">{blocVues("hidden bp-expanded:flex")}</div>
        </div>

        {/* ── Les réglages ── */}
        {/* Au téléphone, les réglages suivent IMMÉDIATEMENT la scène : le curseur
            qu'on pousse reste sous l'image qu'il change (§7, attention non
            partagée). Les vues passent après. Sur grand écran, les vues
            reviennent sous la scène et les réglages occupent la colonne. */}
        {/* `scroll-margin-top` : un contrôle qui reçoit le focus (Tab) ou qu'on
            fait défiler jusqu'à lui ne doit JAMAIS se cacher sous la scène
            collante (WCAG 2.2 — 2.4.11, focus non masqué). Au téléphone la
            scène fait 3/4 de la largeur, sous le header de 56 px ; sur grand
            écran elle est à côté, seul le header compte. */}
        <div
          className={cn(
            "flex min-w-0 flex-col gap-5",
            "[&_button]:scroll-mt-[calc(3.5rem+75vw+1rem)] [&_input]:scroll-mt-[calc(3.5rem+75vw+1rem)]",
            "bp-expanded:[&_button]:scroll-mt-24 bp-expanded:[&_input]:scroll-mt-24"
          )}
        >
          {/* Le pari — AVANT toute preuve. Même grammaire que les points
              d'arrêt : ChoiceButton, puis ResultRow une fois révélé. */}
          {pari && (
            <div className="flex flex-col gap-3" data-pari-bloc>
              <div className="min-w-0 break-words text-body text-primary">
                <MathText>{pari.question}</MathText>
              </div>
              {phase === "note" && choixRetenu ? (
                <p className="text-body-sm text-secondary" aria-live="polite">
                  {frenchTypography("Ton pari : ")}
                  <span className="text-primary">
                    <MathText>{choixRetenu.texte}</MathText>
                  </span>
                  {frenchTypography(". Lance le temps et regarde : la scène répond d'abord.")}
                </p>
              ) : (
                <ul role="list" className="space-y-2" aria-label="Choix" data-pari-choix>
                  {choixNotion.map((c, i) => (
                    <ChoiceButton
                      key={c.id}
                      choice={c}
                      index={i}
                      answered={phase === "revele"}
                      selectedId={choixPari}
                      onSelect={(id) => {
                        setChoixPari(id);
                        if ((pari.revele_apres_h ?? 0) === 0) setPariRevele(true);
                      }}
                      feedbackId={`${idTitre}-pari-${c.id}`}
                      idleSurface="bg-surface-raised"
                      revealCorrectFeedback
                      disabledExtra={["cursor-default", "bg-surface-raised", "border-subtle", "shadow-elevation-0"]}
                    />
                  ))}
                </ul>
              )}
              <ResultRow answered={phase === "revele"} isCorrect={!!choixRetenu?.juste} />
            </div>
          )}

          {/* Le temps — ouvert dès que l'élève a parié */}
          {tempsOuvert && (
            <div className="flex flex-col gap-2" role="group" aria-label="Le temps">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={cn("btn-primary", "focus-ring")}
                  onClick={() => {
                    if (!enLecture && etat.temps >= TEMPS_MAX) setEtat((e) => ({ ...e, temps: 0 }));
                    setEnLecture((l) => !l);
                  }}
                >
                  {enLecture ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
                  {enLecture ? "Pause" : etat.temps >= TEMPS_MAX ? "Relancer depuis 0 h" : "Lancer le temps"}
                </button>
                <button
                  type="button"
                  className={TRANSPORT_BTN_CLASS}
                  onClick={() => {
                    setEnLecture(false);
                    setEtat((e) => ({ ...e, temps: 0 }));
                  }}
                  aria-label="Remettre le temps à 0 h"
                >
                  <Icon name="reset" size={13} />
                  <span>0 h</span>
                </button>
              </div>
              <label className="flex flex-col gap-1">
                <span className="text-body-sm text-secondary">
                  {frenchTypography("Temps écoulé :")}{" "}
                  <span className="tabular-nums text-primary">{K.formatTemps(etat.temps)}</span>
                  <span className="text-caption"> (1 h de simulation par seconde)</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={48}
                  step={0.1}
                  value={Math.round(etat.temps / 360) / 10}
                  onChange={(e) => {
                    setEnLecture(false);
                    setEtat((st) => ({ ...st, temps: parseFloat(e.target.value) * 3600 }));
                  }}
                  aria-valuetext={`${K.formatTemps(etat.temps)} écoulées`}
                  className={CURSEUR}
                />
              </label>
            </div>
          )}

          {/* La suite, et le contrôle neuf de l'étape — une fois le pari révélé */}
          {etapeOuverte && etape.suite && (
            <p className="min-w-0 break-words font-display text-body-lg text-primary" data-suite>
              {frenchTypography(etape.suite)}
            </p>
          )}

          {etapeOuverte && ouvre("rayon") && (
            <div className="flex flex-col gap-1" data-controle="rayon">
              <label htmlFor={`${idTitre}-rayon`} className="text-body-sm text-secondary">
                Rayon de l’orbite <i>r</i>
              </label>
              <input
                id={`${idTitre}-rayon`}
                type="range"
                min={RAYON_MIN_KM}
                max={RAYON_MAX_KM}
                step={K.PAS_RAYON / 1000}
                value={rayonKm}
                onChange={(e) => setEtat((st) => ({ ...st, rayon: parseFloat(e.target.value) * 1000 }))}
                aria-valuetext={`${K.formatKm(etat.rayon)}, période ${K.formatHeures(T)}`}
                className={CURSEUR}
              />
              <div className="flex flex-wrap items-baseline gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  min={RAYON_MIN_KM}
                  max={RAYON_MAX_KM}
                  step={K.PAS_RAYON / 1000}
                  aria-label="Rayon de l’orbite, en kilomètres"
                  value={saisieRayon ?? String(rayonKm)}
                  onChange={(e) => {
                    setSaisieRayon(e.target.value);
                    const v = parseFloat(e.target.value);
                    if (Number.isFinite(v) && v >= RAYON_MIN_KM && v <= RAYON_MAX_KM) {
                      setEtat((st) => ({ ...st, rayon: Math.round((v * 1000) / K.PAS_RAYON) * K.PAS_RAYON }));
                    }
                  }}
                  onBlur={() => setSaisieRayon(null)}
                  className={cn(
                    "w-[9ch] min-h-touch rounded-md border border-subtle bg-surface-raised px-2",
                    "text-body-sm text-primary tabular-nums focus-ring [--focus-radius:8px]"
                  )}
                />
                <span className="text-body-sm text-secondary">km</span>
              </div>
            </div>
          )}

          {etapeOuverte && ouvre("inclinaison") && (
            <label className="flex flex-col gap-1" data-controle="inclinaison">
              <span className="text-body-sm text-secondary">
                {frenchTypography("Inclinaison du plan de l’orbite sur l’équateur :")}{" "}
                <span className="tabular-nums text-primary">{K.formatDegres(etat.inclinaison)}</span>
              </span>
              <input
                type="range"
                min={0}
                max={90}
                step={1}
                value={etat.inclinaison}
                onChange={(e) => setEtat((st) => ({ ...st, inclinaison: parseFloat(e.target.value) }))}
                aria-valuetext={K.formatDegres(etat.inclinaison)}
                className={CURSEUR}
              />
            </label>
          )}

          {etapeOuverte && ouvre("sens") && (
            <fieldset className="flex flex-col gap-1" data-controle="sens">
              <legend className="mb-1 text-body-sm text-secondary">Sens de rotation du satellite</legend>
              {(
                [
                  [1, "Même sens que la Terre (vers l’est)"],
                  [-1, "Sens contraire (vers l’ouest)"],
                ] as const
              ).map(([v, libelle]) => (
                <label key={v} className="flex min-h-touch items-center gap-2 text-body-sm text-primary">
                  <input
                    type="radio"
                    name={`${idTitre}-sens`}
                    checked={etat.sens === v}
                    onChange={() => setEtat((st) => ({ ...st, sens: v }))}
                    className="accent-figure-ink-soft"
                  />
                  {libelle}
                </label>
              ))}
            </fieldset>
          )}

          {etapeOuverte && ouvre("referentiel") && (
            <fieldset className="flex flex-col gap-1" data-controle="referentiel">
              <legend className="mb-1 text-body-sm text-secondary">Référentiel d’observation</legend>
              {(
                [
                  ["terrestre", "Terrestre : lié au sol, il tourne avec la Terre"],
                  ["geocentrique", "Géocentrique : centré sur la Terre, axes fixes"],
                ] as const
              ).map(([v, libelle]) => (
                <label key={v} className="flex min-h-touch items-center gap-2 text-body-sm text-primary">
                  <input
                    type="radio"
                    name={`${idTitre}-ref`}
                    checked={etat.referentiel === v}
                    onChange={() => setEtat((st) => ({ ...st, referentiel: v }))}
                    className="accent-figure-ink-soft"
                  />
                  {frenchTypography(libelle)}
                </label>
              ))}
            </fieldset>
          )}

          {/* Les lectures de l'étape, calculées — aucune par défaut, et juste
              sous le contrôle qui les fait bouger. */}
          {lectures.length > 0 && (
            <dl className="flex flex-col gap-2 text-body-sm" data-lectures>
              {(
                [
                  ["periode", <>Période <i>T</i></>, K.formatHeures(T), "periode-dl"],
                  ["altitude", <>Altitude <i>h</i> = <i>r</i> − <i>R</i><sub>T</sub></>, K.formatKm(etat.rayon - K.R_TERRE), "altitude"],
                  ["v-geo", <>Vitesse <i>v</i> dans le référentiel géocentrique</>, K.formatKmParSeconde(vGeo), "v-geo"],
                  ["v-sol", <>Vitesse par rapport au sol</>, K.formatKmParSeconde(vSol), "v-sol"],
                  ["rapports", <><i>T</i>&#8239;/&#8239;<i>r</i></>, K.formatRapportTSurR(T, etat.rayon), "t-r"],
                  ["rapports", <><i>T</i>²&#8239;/&#8239;<i>r</i>³</>, K.formatRapportKepler(T, etat.rayon), "kepler"],
                  ["rapports", <><i>T</i>³&#8239;/&#8239;<i>r</i>²</>, K.formatRapportT3SurR2(T, etat.rayon), "t3-r2"],
                ] as const
              )
                .filter(([groupe]) => lectures.includes(groupe))
                .map(([, terme, valeur, cle]) => (
                  <div key={cle} className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 border-b border-subtle pb-1.5">
                    <dt className="text-secondary">{terme}</dt>
                    <dd className="tabular-nums text-primary" data-lecture={cle}>
                      {valeur}
                    </dd>
                  </div>
                ))}
            </dl>
          )}

          {/* Les trois conditions, et le verdict. Le détail d'une condition
              n'est écrit que si aucun contrôle visible ne le montre déjà
              (critique calme : un même fait deux fois dans le même regard). */}
          <div className="rounded-lg border border-subtle px-4 py-3">
            <p className="mb-2 text-caption font-medium text-secondary">Les trois conditions</p>
            <ul className="flex flex-col gap-1.5 text-body-sm">
              {conditionLigne(cond.periode, "Une période de 24 h", <>— ici <span data-lecture="periode">{K.formatHeures(T)}</span></>)}
              {conditionLigne(
                cond.plan,
                "Une orbite dans le plan de l’équateur",
                etapeOuverte && ouvre("inclinaison") ? null : `— ici inclinée de ${K.formatDegres(etat.inclinaison)}`
              )}
              {conditionLigne(
                cond.sens,
                "Le même sens de rotation que la Terre",
                etapeOuverte && ouvre("sens") ? null : `— ici ${etat.sens === 1 ? "vers l’est" : "vers l’ouest"}`
              )}
            </ul>
            <p className="mt-2 text-body-sm font-medium text-primary" aria-live="polite" aria-atomic="true" data-verdict>
              {frenchTypography(verdict)}
            </p>
          </div>
        </div>

        {/* Au téléphone, les vues viennent APRÈS les réglages. */}
        {blocVues("flex bp-expanded:hidden")}
      </div>

      {/* ── Le transport des étapes (la grammaire de StagedFigure) ── */}
      <div className="mt-5 flex flex-wrap items-center gap-2" role="group" aria-label="Étapes de la scène">
        <TransportButton
          onClick={() => allerA(indexEtape - 1)}
          disabled={indexEtape === 0}
          aria-label="Étape précédente"
        >
          <Icon name="chevron-left" size={14} />
          <span>Précédent</span>
        </TransportButton>
        <span
          className="min-w-[6ch] select-none text-center text-caption tabular-nums text-secondary"
          aria-live="polite"
          aria-atomic="true"
        >
          {`Étape ${indexEtape + 1} / ${etapes.length}`}
        </span>
        <TransportButton
          onClick={() => allerA(indexEtape === etapes.length - 1 ? 0 : indexEtape + 1)}
          aria-label={indexEtape === etapes.length - 1 ? "Recommencer depuis l’étape 1" : "Étape suivante"}
          aria-describedby={idConsigne}
        >
          {indexEtape === etapes.length - 1 ? (
            <>
              <Icon name="reset" size={13} />
              <span>Recommencer</span>
            </>
          ) : (
            <>
              <span>Suivant</span>
              <Icon name="chevron-right" size={14} />
            </>
          )}
        </TransportButton>
      </div>
    </section>
  );
}
