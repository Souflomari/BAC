/**
 * sphere-plan.ts — le RENDU three.js de la scène « sphère, plan, droite »
 * (maths/geometrie-espace, R9), chargé au clic.
 *
 * Ce que l'élève voit, et rien d'autre (DESIGN-BIBLE §6) :
 *   · la sphère, TRANSLUCIDE (on doit voir le cercle à l'intérieur), avec
 *     trois méridiens et son équateur pour lire sa forme ;
 *   · son centre S, le projeté H, le segment [SH] (la distance d) ;
 *   · le plan (P) — un carré translucide — ou la droite (D) ;
 *   · en ACCENT, la seule idée : l'intersection — le cercle, le point de
 *     tangence, ou les deux points ;
 *   · le triangle SHM rectangle en H, quand il existe : c'est le Pythagore de
 *     la leçon (R² = d² + HM²), posé sur la figure.
 *
 * Aucune physique ici non plus : tout vient de `sphere.ts`. Couleurs lues sur
 * les jetons (`palette.ts`), traits d'épaisseur constante (`traits.ts`),
 * lumière douce attachée à la caméra.
 *
 * Repère : maths (x, y, z), z vers le haut → three.js (x, z, −y).
 */
import {
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { couleur, lireJetons, melange } from "./palette";
import { cercle, remplacerPositions, trait, type Line2 } from "./traits";
import { CENTRE, cas, distance, hm, type EtatSphere } from "./sphere";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface SceneSphere {
  /** `issue` : l'intersection (et le triangle SHM) est-elle montrée ? Pas avant
   *  le pari — elle EST la réponse (§11.190). */
  mettreAJour(etat: EtatSphere, issue: boolean): void;
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  etiquettes(): { S: Projection; H: Projection; M: Projection | null };
  detruire(): void;
}

const DEMI_PLAN = 4.6; // demi-côté du carré qui figure le plan
const DEMI_DROITE = 5.2; // demi-longueur de la droite affichée
/** Cadre fixe : la sphère la plus grande (R = 4) et le plan tiennent toujours.
 *  La caméra ne bouge pas quand R change — c'est la sphère qui grandit. */
const CADRE = 5.6;

/** maths (x, y, z) → three (x, z, −y), avec S au centre de la scène. */
const vs = (x: number, y: number, z: number) => new Vector3(x, z - CENTRE.z, -y);

export function creerSceneSphere(canvas: HTMLCanvasElement, hote: HTMLElement): SceneSphere {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(32, 1, 0.1, 200);
  scene.add(camera);
  // Même calibration que la scène de l'orbite (mesurée sur le rendu) : le
  // centre éclairé retombe sur le jeton, le limbe descend à ~0,66.
  scene.add(new AmbientLight(0xffffff, 1.85));
  const douce = new DirectionalLight(0xffffff, 1.35);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);

  // ── La sphère ──
  const sphere = new Group();
  scene.add(sphere);
  const coque = new Mesh(
    new SphereGeometry(1, 72, 48),
    new MeshLambertMaterial({ transparent: true, opacity: 0.22, depthWrite: false })
  );
  sphere.add(coque);
  const reperes: Line2[] = [];
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3;
    reperes.push(trait(cercle(1, 96, (u) => [Math.cos(u) * Math.cos(a), Math.sin(u), -Math.cos(u) * Math.sin(a)]), 1, { opacite: 0.5 }));
  }
  reperes.push(trait(cercle(1, 96, (u) => [Math.cos(u), 0, -Math.sin(u)]), 1, { opacite: 0.5 }));
  reperes.forEach((l) => sphere.add(l));

  const pointS = new Mesh(new SphereGeometry(0.07, 20, 14), new MeshBasicMaterial());
  scene.add(pointS);

  // ── Le plan (P) ──
  const plan = new Group();
  scene.add(plan);
  const nappe = new Mesh(
    new PlaneGeometry(2 * DEMI_PLAN, 2 * DEMI_PLAN),
    new MeshBasicMaterial({ transparent: true, opacity: 0.38, side: DoubleSide, depthWrite: false })
  );
  nappe.rotation.x = -Math.PI / 2;
  plan.add(nappe);
  const bord = trait(
    [-DEMI_PLAN, 0, -DEMI_PLAN, DEMI_PLAN, 0, -DEMI_PLAN, DEMI_PLAN, 0, DEMI_PLAN, -DEMI_PLAN, 0, DEMI_PLAN, -DEMI_PLAN, 0, -DEMI_PLAN],
    1.5
  );
  plan.add(bord);

  // ── La droite (D) ──
  const droite = trait([-DEMI_DROITE, 0, 0, DEMI_DROITE, 0, 0], 2);
  scene.add(droite);

  // ── L'intersection — l'accent ──
  const cercleInter = trait([0, 0, 0, 1, 0, 0], 3);
  scene.add(cercleInter);
  const pointTangent = new Mesh(new SphereGeometry(0.11, 20, 14), new MeshBasicMaterial());
  scene.add(pointTangent);
  const pointA = new Mesh(new SphereGeometry(0.11, 20, 14), new MeshBasicMaterial());
  const pointB = new Mesh(new SphereGeometry(0.11, 20, 14), new MeshBasicMaterial());
  scene.add(pointA, pointB);

  // ── H, [SH], et le triangle SHM ──
  const pointH = new Mesh(new SphereGeometry(0.06, 16, 12), new MeshBasicMaterial());
  scene.add(pointH);
  const segSH = trait([0, 0, 0, 0, 1, 0], 1.5, { pointille: true });
  scene.add(segSH);
  const segHM = trait([0, 0, 0, 1, 0, 0], 1.5);
  const segSM = trait([0, 0, 0, 1, 0, 0], 1.5, { pointille: true });
  scene.add(segHM, segSM);

  // ORDRE DE DESSIN — trouvé par la porte, pas à l'œil. La sphère et le plan
  // sont translucides et dessinés APRÈS les objets opaques : ils se fondaient
  // PAR-DESSUS le cercle, qui est posé sur l'une et couché dans l'autre. Le
  // cercle perdait sa couleur (71 pixels d'accent pur sur ~1 800 dessinés),
  // et vu de dessus, sous la calotte, il disparaissait des mesures. Les
  // marques (intersection en accent, points et segments en encre) passent
  // donc en dernier, en couleur pure : l'accent désigne l'intersection sans
  // être voilé par ce qu'il intersecte.
  for (const l of [cercleInter, droite, segSH, segHM, segSM]) {
    l.material.transparent = true;
    l.renderOrder = 10;
  }
  for (const m of [pointTangent, pointA, pointB, pointS, pointH]) {
    (m.material as MeshBasicMaterial).transparent = true;
    m.renderOrder = 11;
  }

  let jetons = lireJetons(hote);
  function appliquerCouleurs() {
    jetons = lireJetons(hote);
    const { surface, encre, encreDouce, accent } = jetons;
    renderer.setClearColor(couleur(surface), 1);
    (coque.material as MeshLambertMaterial).color = couleur(melange(surface, encreDouce, 0.35));
    reperes.forEach((l) => l.material.color.copy(couleur(encreDouce)));
    (pointS.material as MeshBasicMaterial).color = couleur(encre);
    (nappe.material as MeshBasicMaterial).color = couleur(melange(surface, encreDouce, 0.18));
    bord.material.color.copy(couleur(encreDouce));
    droite.material.color.copy(couleur(encre));
    cercleInter.material.color.copy(couleur(accent));
    for (const p of [pointTangent, pointA, pointB]) (p.material as MeshBasicMaterial).color = couleur(accent);
    (pointH.material as MeshBasicMaterial).color = couleur(encre);
    for (const l of [segSH, segHM, segSM]) l.material.color.copy(couleur(encreDouce));
  }
  appliquerCouleurs();

  let azimut = 32;
  let elevation = 18;
  let largeurCss = 480;
  let hauteurCss = 480;
  let dernier: EtatSphere | null = null;
  let issueMontree = true;
  // M : sur le cercle, du côté de la caméra (le triangle se lit de face).
  let angleM = 0;
  const posM = new Vector3();
  let mVisible = false;

  function placerCamera() {
    const a = (azimut * Math.PI) / 180;
    const e = (elevation * Math.PI) / 180;
    const fovV = (camera.fov * Math.PI) / 180;
    const fovH = 2 * Math.atan(Math.tan(fovV / 2) * camera.aspect);
    const d = CADRE / Math.sin(Math.min(fovV, fovH) / 2);
    camera.position.set(d * Math.cos(e) * Math.cos(a), d * Math.sin(e), -d * Math.cos(e) * Math.sin(a));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    angleM = a - 0.9; // un peu à droite de la direction de la caméra
  }

  function mettreAJour(e: EtatSphere, issue: boolean) {
    issueMontree = issue;
    const R = e.R;
    const d = distance(e);
    const c = cas(e);
    const r = hm(e);
    const yScene = e.k - CENTRE.z; // cote du plan, relative à S

    sphere.scale.setScalar(R);
    const estPlan = e.objet === "plan";
    plan.visible = estPlan;
    plan.position.set(0, yScene, 0);
    droite.visible = !estPlan;
    droite.position.set(0, yScene, 0);

    // H : le projeté de S — (0, 0, k) dans les deux cas.
    pointH.position.set(0, yScene, 0);
    remplacerPositions(segSH, [0, 0, 0, 0, yScene, 0]);
    segSH.visible = d > 0;
    segSH.material.dashSize = 0.18;
    segSH.material.gapSize = 0.12;

    cercleInter.visible = issue && estPlan && c === "secant";
    if (cercleInter.visible) remplacerPositions(cercleInter, cercle(r, 160, (u) => [Math.cos(u), 0, -Math.sin(u)]).map((v, i) => (i % 3 === 1 ? yScene : v)));
    pointTangent.visible = issue && c === "tangent";
    pointTangent.position.set(0, yScene, 0);
    pointA.visible = pointB.visible = issue && !estPlan && c === "secant";
    pointA.position.copy(vs(r, 0, e.k));
    pointB.position.copy(vs(-r, 0, e.k));

    // Le triangle SHM : M sur le cercle (plan) ou l'un des deux points (droite).
    mVisible = issue && c === "secant";
    if (mVisible) {
      if (estPlan) posM.set(r * Math.cos(angleM), yScene, -r * Math.sin(angleM));
      else posM.copy(pointA.position);
      remplacerPositions(segHM, [0, yScene, 0, posM.x, posM.y, posM.z]);
      remplacerPositions(segSM, [0, 0, 0, posM.x, posM.y, posM.z]);
      segSM.material.dashSize = 0.18;
      segSM.material.gapSize = 0.12;
    }
    segHM.visible = segSM.visible = mVisible;
    dernier = e;
  }

  function redimensionner(largeur: number, hauteur: number) {
    largeurCss = Math.max(1, Math.round(largeur));
    hauteurCss = Math.max(1, Math.round(hauteur));
    renderer.setSize(largeurCss, hauteurCss, false);
    camera.aspect = largeurCss / hauteurCss;
    for (const l of [...reperes, bord, droite, cercleInter, segSH, segHM, segSM]) l.material.resolution.set(largeurCss, hauteurCss);
    placerCamera();
  }

  function projeter(v: Vector3, devantSphere: boolean): Projection {
    const p = v.clone().project(camera);
    return { x: ((p.x + 1) / 2) * largeurCss, y: ((1 - p.y) / 2) * hauteurCss, visible: devantSphere && p.z > -1 && p.z < 1 };
  }

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-80, Math.min(88, e));
      placerCamera();
      if (dernier) mettreAJour(dernier, issueMontree);
    },
    redimensionner,
    relireCouleurs() {
      appliquerCouleurs();
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      const hPos = pointH.position.clone();
      return {
        S: projeter(new Vector3(0, 0, 0), true),
        H: projeter(hPos, true),
        M: mVisible ? projeter(posM, true) : null,
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
      renderer.forceContextLoss();
    },
  };
}
