/**
 * orbite-geostationnaire.ts — le RENDU three.js de la scène (chargé au clic).
 *
 * Ce module n'est importé que dynamiquement, par `Scene3DPanel`, quand l'élève
 * ouvre la scène : three.js ne pèse rien sur une leçon qui ne l'ouvre pas
 * (`window.__THREE__` reste indéfini jusque-là — c'est ce que vérifie la
 * porte `scene-orbite`). Il ne contient AUCUNE physique : tout ce qu'il place
 * vient de `kepler.ts`, que les lectures chiffrées du panneau lisent aussi.
 *
 * LA LANGUE VISUELLE (DESIGN-BIBLE §6) — plat, doux, peu de 3D :
 *   · une Terre unie (mélange surface/encre douce), un graticule discret,
 *     l'équateur appuyé, le point P et sa verticale — rien d'autre au sol :
 *     ni continents, ni texture, ni nuit, ni étoiles. Le fond est la surface
 *     des figures, pas l'espace ;
 *   · une lumière DOUCE attachée à la caméra : l'ombrage donne le volume et
 *     ne change jamais quand on bascule de référentiel. Un « Soleil » fixe
 *     aurait fait défiler le terminateur jour/nuit dans le référentiel
 *     terrestre — physiquement juste, pédagogiquement du bruit : la seule
 *     chose qui doit bouger dans ce référentiel, c'est un satellite qui
 *     n'est pas géostationnaire ;
 *   · l'accent ne marque QU'UNE chose : le satellite et sa trace.
 *
 * Toutes les couleurs sont LUES à l'exécution sur les jetons `--figure-*`
 * (aucun hex ici) et relues quand le thème change.
 *
 * Unité de longueur de la scène : le rayon terrestre. Repère three.js :
 * X = x (vers P), Y = z (vers le Nord), Z = −y — une rotation d'angle a
 * autour du Nord, dans le sens direct, s'écrit alors `rotation.y = a`.
 */
import {
  AmbientLight,
  ConeGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { couleur, lireJetons, melange, type RGB } from "./palette";
import { cercle, remplacerPositions, trait, type Line2 } from "./traits";
import {
  angleTerre,
  periode,
  positionDansReferentiel,
  positionGeocentrique,
  R_TERRE,
  T_TERRE,
  type EtatOrbite,
  type Vec3,
} from "./kepler";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface SceneOrbite {
  /** Place tout ce qui dépend des réglages et du temps (ne rend pas). */
  mettreAJour(etat: EtatOrbite): void;
  /** Oriente la caméra autour de la Terre (degrés). */
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  /** Où dessiner les étiquettes HTML « N » et « P », en pixels CSS du canvas. */
  etiquettes(): { N: Projection; P: Projection };
  detruire(): void;
}

interface Palette {
  surface: RGB;
  encre: RGB;
  encreDouce: RGB;
  accent: RGB;
  terre: RGB;
  graticule: RGB;
}

function lirePalette(hote: HTMLElement): Palette {
  const { surface, encre, encreDouce, accent } = lireJetons(hote);
  // La Terre : la surface teintée d'encre douce — présente, jamais criarde.
  const terre = melange(surface, encreDouce, 0.2);
  // Le graticule : un cran d'encre au-dessus de la Terre, dans les deux thèmes.
  const graticule = melange(terre, encreDouce, 0.45);
  return { surface, encre, encreDouce, accent, terre, graticule };
}

// ── Géométrie ───────────────────────────────────────────────────────────────

/** Physique (m, z au Nord) → scène (rayons terrestres, Y au Nord). */
function versScene(p: Vec3, cible = new Vector3()): Vector3 {
  return cible.set(p.x / R_TERRE, p.z / R_TERRE, -p.y / R_TERRE);
}

// ── La scène ────────────────────────────────────────────────────────────────

export function creerSceneOrbite(canvas: HTMLCanvasElement, hote: HTMLElement): SceneOrbite {
  // Lève une erreur si WebGL est indisponible : le panneau l'attrape et
  // affiche l'état honnête « sans 3D » (les calculs, eux, restent).
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 4 / 3, 0.01, 2000);
  scene.add(camera);

  // Lumière douce, attachée à la caméra (voir l'en-tête). CALIBRÉE SUR LE
  // RENDU, pas à l'œil : avec 2,2 / 1,6, le centre de la Terre sortait à
  // 240 (clair) et 63 (sombre) pour un mélange de jetons à 221 et 57 — un
  // facteur ≈ 1,2 dans les deux thèmes, la Terre « présente, jamais criarde »
  // de l'en-tête rendait presque blanche (critique calme, mesuré le
  // 2026-09-23). Divisées par 1,2 : le centre éclairé retombe sur le jeton,
  // le limbe opposé à la lumière descend à ~0,66 — le volume, sans éclat.
  const ambiante = new AmbientLight(0xffffff, 1.85);
  const douce = new DirectionalLight(0xffffff, 1.35);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);
  scene.add(ambiante);

  // ── La Terre, et ce qui tourne avec elle ──
  const terre = new Group();
  scene.add(terre);

  const globe = new Mesh(new SphereGeometry(1, 72, 48), new MeshLambertMaterial());
  terre.add(globe);

  // Graticule SOBRE : trois grands cercles (tous les 60°) et deux parallèles
  // (±45°). Le premier en portait six et quatre — douze arcs sur une Terre de
  // 67 px au rayon géostationnaire : un hérissement qui noyait la flèche de
  // rotation que la consigne de l'étape 3 désigne (critique calme, 2026-09-23).
  const graticule: Line2[] = [];
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3;
    graticule.push(
      trait(
        cercle(1.003, 96, (u) => [Math.cos(u) * Math.cos(a), Math.sin(u), -Math.cos(u) * Math.sin(a)]),
        1
      )
    );
  }
  for (const lat of [-45, 45]) {
    const phi = (lat * Math.PI) / 180;
    graticule.push(
      trait(cercle(1.003, 96, (u) => [Math.cos(phi) * Math.cos(u), Math.sin(phi), -Math.cos(phi) * Math.sin(u)]), 1)
    );
  }
  graticule.forEach((l) => terre.add(l));

  const equateur = trait(cercle(1.004, 128, (u) => [Math.cos(u), 0, -Math.sin(u)]), 2);
  terre.add(equateur);

  const pointP = new Mesh(new SphereGeometry(1, 20, 14), new MeshBasicMaterial());
  pointP.position.set(1, 0, 0);
  terre.add(pointP);

  // La verticale de P : un satellite géostationnaire s'y tient, à tout instant.
  const verticale = trait([1, 0, 0, 8, 0, 0], 1.5, { pointille: true });
  terre.add(verticale);

  // ── L'axe des pôles et le sens de rotation de la Terre ──
  const axe = trait([0, -1.45, 0, 0, 1.6, 0], 1.5);
  scene.add(axe);

  const sensTerre = new Group();
  // Assez large pour se lire depuis le pôle (où il entoure l'axe au-dessus du
  // disque terrestre), assez haut pour ne pas toucher la calotte vue de biais.
  const ARC0 = -0.35 * Math.PI;
  const ARC1 = 1.15 * Math.PI;
  const RAYON_ARC = 0.5;
  const HAUT_ARC = 1.42;
  const arc: number[] = [];
  for (let k = 0; k <= 48; k++) {
    const u = ARC0 + ((ARC1 - ARC0) * k) / 48;
    arc.push(RAYON_ARC * Math.cos(u), HAUT_ARC, -RAYON_ARC * Math.sin(u));
  }
  const arcTrait = trait(arc, 2);
  sensTerre.add(arcTrait);
  const pointe = new Mesh(new ConeGeometry(0.08, 0.2, 16), new MeshBasicMaterial());
  // La pointe au bout de l'arc, dans le sens des angles croissants (direct vu du Nord).
  pointe.position.set(RAYON_ARC * Math.cos(ARC1), HAUT_ARC, -RAYON_ARC * Math.sin(ARC1));
  const tangente = new Vector3(-Math.sin(ARC1), 0, -Math.cos(ARC1));
  pointe.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), tangente);
  sensTerre.add(pointe);
  scene.add(sensTerre);

  // ── L'orbite (référentiel géocentrique), la trace, le satellite ──
  // Pointillée, comme les orbites de la figure figée qui précède la scène :
  // la même langue graphique, et le trait plein reste à la trace.
  // À demi-opacité : en thème sombre, l'encre douce pleine (≈ 8:1) criait plus
  // fort que le satellite qu'elle encadre.
  const orbite = trait([0, 0, 0, 1, 0, 0], 1.5, { pointille: true, opacite: 0.5 });
  scene.add(orbite);

  const trace = trait([0, 0, 0, 0, 0, 0], 2.5, { opacite: 0.6 });
  trace.frustumCulled = false;
  scene.add(trace);

  const satellite = new Mesh(new SphereGeometry(1, 24, 16), new MeshBasicMaterial());
  scene.add(satellite);

  // ── Couleurs ──
  let palette = lirePalette(hote);
  function appliquerPalette() {
    palette = lirePalette(hote);
    renderer.setClearColor(couleur(palette.surface), 1);
    (globe.material as MeshLambertMaterial).color = couleur(palette.terre);
    graticule.forEach((l) => l.material.color.copy(couleur(palette.graticule)));
    equateur.material.color.copy(couleur(palette.encreDouce));
    (pointP.material as MeshBasicMaterial).color = couleur(palette.encre);
    verticale.material.color.copy(couleur(palette.encreDouce));
    axe.material.color.copy(couleur(palette.encreDouce));
    // Le sens de rotation de la Terre est une donnée de l'étape 3 : encre pleine.
    arcTrait.material.color.copy(couleur(palette.encre));
    (pointe.material as MeshBasicMaterial).color = couleur(palette.encre);
    orbite.material.color.copy(couleur(palette.encreDouce));
    trace.material.color.copy(couleur(palette.accent));
    (satellite.material as MeshBasicMaterial).color = couleur(palette.accent);
  }
  appliquerPalette();

  // ── État de vue ──
  let azimut = 28;
  let elevation = 20;
  let cadre = 8;
  let largeurCss = 640;
  let hauteurCss = 480;

  function placerCamera() {
    const a = (azimut * Math.PI) / 180;
    const e = (elevation * Math.PI) / 180;
    const fovV = (camera.fov * Math.PI) / 180;
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * camera.aspect);
    const d = cadre / Math.sin(Math.min(fovV, fovH) / 2);
    camera.position.set(d * Math.cos(e) * Math.cos(a), d * Math.sin(e), -d * Math.cos(e) * Math.sin(a));
    camera.near = Math.max(0.01, d - cadre * 1.6);
    camera.far = d + cadre * 1.6;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  let dernierEtat: EtatOrbite | null = null;
  let dernierRayon = -1;
  let derniereInclinaison = -1;
  const tmp = new Vector3();

  function mettreAJour(e: EtatOrbite) {
    const rS = e.rayon / R_TERRE;
    const geocentrique = e.referentiel === "geocentrique";

    // Le cadre suit le rayon : la Terre et l'orbite restent à la vraie échelle
    // l'une de l'autre, c'est la caméra qui recule.
    cadre = Math.max(rS, 1.55) * 1.08;
    placerCamera();

    terre.rotation.y = geocentrique ? angleTerre(e.temps) : 0;
    sensTerre.visible = geocentrique;
    orbite.visible = geocentrique;

    // Tailles lisibles quel que soit le cadre (le satellite n'est pas à l'échelle).
    const s = 0.021 * cadre;
    satellite.scale.setScalar(s);
    pointP.scale.setScalar(Math.max(0.035, 0.009 * cadre));
    verticale.material.dashSize = 0.035 * cadre;
    verticale.material.gapSize = 0.025 * cadre;
    orbite.material.dashSize = 0.05 * cadre;
    orbite.material.gapSize = 0.035 * cadre;

    if (rS !== dernierRayon) {
      remplacerPositions(verticale, [1, 0, 0, rS * 1.12, 0, 0]);
      dernierRayon = -1; // force l'orbite ci-dessous
    }
    if (rS !== dernierRayon || e.inclinaison !== derniereInclinaison) {
      const pts: number[] = [];
      const n = 256;
      for (let k = 0; k <= n; k++) {
        const t = (periode(e.rayon) * k) / n;
        versScene(positionGeocentrique({ ...e, sens: 1 }, t), tmp);
        pts.push(tmp.x, tmp.y, tmp.z);
      }
      remplacerPositions(orbite, pts);
      dernierRayon = rS;
      derniereInclinaison = e.inclinaison;
    }

    versScene(positionDansReferentiel(e), satellite.position);

    // La trace : le chemin des dernières 24 h DANS LE RÉFÉRENTIEL AFFICHÉ,
    // calculé pour les réglages ACTUELS (comme si le satellite les avait
    // toujours eus). Dans le référentiel terrestre, un satellite
    // géostationnaire n'en laisse aucune : il ne bouge pas.
    const debut = Math.max(0, e.temps - T_TERRE);
    const duree = e.temps - debut;
    if (duree > 0) {
      const T = periode(e.rayon);
      const n = Math.min(720, Math.max(24, Math.ceil(duree / (T / 48))));
      const pts: number[] = [];
      let etendue = 0;
      for (let k = 0; k <= n; k++) {
        versScene(positionDansReferentiel(e, debut + (duree * k) / n), tmp);
        pts.push(tmp.x, tmp.y, tmp.z);
        etendue = Math.max(etendue, Math.hypot(tmp.x - pts[0], tmp.y - pts[1], tmp.z - pts[2]));
      }
      // Une trace qui ne s'étend sur rien (le géostationnaire vu du sol) n'est
      // pas dessinée : des segments de longueur nulle n'ont pas de direction,
      // et un trait épais sans direction peut laisser un artefact à l'écran.
      if (etendue > 1e-6) {
        remplacerPositions(trace, pts);
        trace.visible = true;
      } else {
        trace.visible = false;
      }
    } else {
      trace.visible = false;
    }
    dernierEtat = e;
  }

  function redimensionner(largeur: number, hauteur: number) {
    largeurCss = Math.max(1, Math.round(largeur));
    hauteurCss = Math.max(1, Math.round(hauteur));
    renderer.setSize(largeurCss, hauteurCss, false);
    camera.aspect = largeurCss / hauteurCss;
    for (const l of [...graticule, equateur, verticale, axe, arcTrait, orbite, trace]) {
      l.material.resolution.set(largeurCss, hauteurCss);
    }
    placerCamera();
  }

  function projeter(v: Vector3, normale: Vector3 | null): Projection {
    const p = v.clone().project(camera);
    const devant =
      normale === null || normale.dot(camera.position.clone().sub(v)) > 0; // face tournée vers la caméra
    return {
      x: ((p.x + 1) / 2) * largeurCss,
      y: ((1 - p.y) / 2) * hauteurCss,
      visible: devant && p.z > -1 && p.z < 1,
    };
  }

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-80, Math.min(88, e));
      placerCamera();
    },
    redimensionner,
    relireCouleurs() {
      appliquerPalette();
      if (dernierEtat) mettreAJour(dernierEtat);
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      terre.updateMatrixWorld(true);
      const posP = terre.localToWorld(new Vector3(1.05, 0.05, 0));
      const normaleP = terre.localToWorld(new Vector3(1, 0, 0)).normalize();
      return {
        N: projeter(new Vector3(0, 1.82, 0), null),
        P: projeter(posP, normaleP),
      };
    },
    detruire() {
      scene.traverse((o) => {
        const m = o as Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = (m as { material?: { dispose(): void } | { dispose(): void }[] }).material;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      // Rend le contexte au navigateur : il en limite le nombre, et l'élève
      // peut ouvrir et fermer la scène autant qu'il veut.
      renderer.forceContextLoss();
    },
  };
}
