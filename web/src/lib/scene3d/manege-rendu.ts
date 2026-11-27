/**
 * manege-rendu.ts — le RENDU three.js de la scène « le manège »
 * (pc/rotation-axe-fixe, R2 ; ADR 0041), chargé au clic.
 *
 * Ce que l'élève voit — L'ÉNONCÉ, toujours là :
 *   · l'axe Δ, dessiné comme une DROITE (jamais comme le point ⊙ de la figure
 *     plane : c'est sa direction qui décide) ;
 *   · le manège, un disque, son bord, et son RAYON PEINT (le repère d'angle) ;
 *   · les enfants, sur le diamètre peint, à la distance réglée de l'axe ;
 *   · la force sélectionnée, à l'ENCRE — une donnée, pas une réponse : le
 *     poids (245 N) au siège, ou la poussée (30 N) au point de poussée, posé
 *     sur le rayon perpendiculaire. Une seule échelle, 1,00 m pour 100 N
 *     (spec §6) : 2,45 m contre 0,30 m, et c'est ce rapport 8:1 qui argumente.
 *
 * Ce que la scène AJOUTE pour répondre — à l'ACCENT, et seulement après le
 * pari (spec §7.6) : la droite d'action, le bras de levier, les arcs des deux
 * points marqués. La trace de l'essai précédent est en pointillé, à l'encre
 * douce.
 *
 * Toute la physique vient de `manege.ts` ; ce fichier ne calcule aucun moment,
 * il dessine l'angle et le bras qu'on lui donne.
 *
 * Repère three : y vers le HAUT. Axe vertical : Δ = l'axe y, le disque dans le
 * plan (x, z), θ > 0 dans le sens trigonométrique vu du dessus. Axe basculé :
 * Δ = l'axe z (il pointe vers la caméra « de côté »), la roue dans le plan
 * (x, y) — exactement la figure du pendule pesant de R6.
 */
import {
  AmbientLight,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Quaternion,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { couleur, lireJetons, melange } from "./palette";
import { cercle, remplacerPositions, trait, type Line2 } from "./traits";
import { POIDS, POUSSEE, RAYON, type Axe, type Force, type Occupants } from "./manege";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

/** Ce que le panneau pose sur la scène. Tout ce qui répond attend le pari. */
export interface EtatRendu {
  axe: Axe;
  /** l'angle tourné depuis le départ (rad, ≥ 0) — le rendu choisit le sens */
  theta: number;
  rSieges: number;
  occupants: Occupants;
  force: Force;
  rPoussee: number;
  /** la droite d'action de la force (accent, pointillé) */
  droiteAction: boolean;
  /** le bras de levier à dessiner (m) ; null = aucun segment */
  bras: number | null;
  /** les arcs du siège et du repère du bord (accent) */
  arcs: boolean;
  /** la position finale de l'essai précédent (pointillé), ou null */
  trace: number | null;
}

export interface SceneManege {
  mettreAJour(e: EtatRendu): void;
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  etiquettes(): {
    axe: Projection;
    force: Projection;
    bras: Projection;
    composante: Projection;
    trace: Projection;
    /** repères SANS texte pour la porte : le centre, le bout du rayon peint,
     *  le siège marqué, la queue et la pointe de la force, les deux bouts du
     *  bras — elle mesure les pixels ENTRE eux */
    centre: Projection;
    repere: Projection;
    siege: Projection;
    queue: Projection;
    pointe: Projection;
    brasPied: Projection;
    brasBout: Projection;
  };
  /** les traits qu'une étiquette de texte ne doit pas couvrir (pixels CSS) :
   *  l'axe, le rayon peint, la flèche, et — quand ils sont dessinés — le bras
   *  de levier, la droite d'action et la trace */
  segments(): [Projection, Projection][];
  /** la taille du canvas, en pixels CSS */
  cadre(): { largeur: number; hauteur: number };
  detruire(): void;
}

const EPAISSEUR = 0.08;
const R_ENFANT = 0.1;
const M_PAR_N = 1 / 100; // 1,00 m de flèche pour 100 N
const HAUT = new Vector3(0, 1, 0);

interface Fleche {
  groupe: Group;
  corps: Line2;
  tete: Mesh;
}

function fleche(largeur: number): Fleche {
  const corps = trait([0, 0, 0, 1, 0, 0], largeur);
  const tete = new Mesh(new ConeGeometry(1, 1, 20), new MeshBasicMaterial());
  const groupe = new Group();
  groupe.add(corps, tete);
  return { groupe, corps, tete };
}

/** Pose une flèche de `depuis` à `vers`, tête proportionnée mais bornée. */
function poserFleche(f: Fleche, depuis: Vector3, vers: Vector3) {
  const v = vers.clone().sub(depuis);
  const n = v.length();
  f.groupe.visible = n > 1e-6;
  if (!f.groupe.visible) return;
  const u = v.clone().divideScalar(n);
  const longueurTete = Math.min(0.2, n * 0.42);
  const base = vers.clone().sub(u.clone().multiplyScalar(longueurTete));
  remplacerPositions(f.corps, [...depuis.toArray(), ...base.toArray()]);
  f.tete.scale.set(longueurTete * 0.36, longueurTete, longueurTete * 0.36);
  f.tete.position.copy(vers.clone().sub(u.clone().multiplyScalar(longueurTete / 2)));
  f.tete.quaternion.copy(new Quaternion().setFromUnitVectors(HAUT, u));
}

export function creerSceneManege(canvas: HTMLCanvasElement, hote: HTMLElement): SceneManege {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 400);
  scene.add(camera);
  scene.add(new AmbientLight(0xffffff, 1.9));
  const douce = new DirectionalLight(0xffffff, 1.2);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);

  // ── Le socle : il porte l'axe et le manège, et bascule avec l'axe ──
  const socle = new Group();
  scene.add(socle);

  const axe = trait([0, -1.0, 0, 0, 1.2, 0], 2);
  socle.add(axe);

  // ── Ce qui tourne ──
  const tournant = new Group();
  socle.add(tournant);
  const matDisque = new MeshLambertMaterial();
  const disque = new Mesh(new CylinderGeometry(RAYON, RAYON, EPAISSEUR, 96), matDisque);
  disque.position.y = -EPAISSEUR / 2;
  tournant.add(disque);
  const bord = trait(cercle(RAYON, 96, (a) => [Math.cos(a), 0.004 / RAYON, Math.sin(a)]), 1.5);
  tournant.add(bord);
  // Trois rayons discrets, et le RAYON PEINT (vers +x) : c'est lui qu'on lit.
  const rayons = [1, 2, 3].map((k) => {
    const a = (k * Math.PI) / 2;
    return trait([0, 0.004, 0, RAYON * Math.cos(a), 0.004, -RAYON * Math.sin(a)], 1, { opacite: 0.5 });
  });
  rayons.forEach((r) => tournant.add(r));
  const rayonPeint = trait([0, 0.006, 0, RAYON, 0.006, 0], 3.2);
  tournant.add(rayonPeint);
  const matEncre = new MeshBasicMaterial();
  const repere = new Mesh(new SphereGeometry(0.045, 16, 12), matEncre);
  repere.position.set(RAYON, 0.02, 0);
  tournant.add(repere);
  const matEnfant = new MeshLambertMaterial();
  const enfants = [0, 1].map(() => {
    const m = new Mesh(new SphereGeometry(R_ENFANT, 24, 16), matEnfant);
    tournant.add(m);
    return m;
  });

  // ── Les arcs des deux points marqués (accent, dans le repère du socle) ──
  const arcSiege = trait([0, 0, 0, 1, 0, 0], 2.2);
  const arcBord = trait([0, 0, 0, 1, 0, 0], 2.2);
  socle.add(arcSiege, arcBord);

  // ── La trace de l'essai précédent (pointillé, encre douce) ──
  const trace = trait([0, 0, 0, 1, 0, 0], 1.6, { pointille: true });
  socle.add(trace);

  // ── La force (encre) et ce qui répond (accent), dans le repère du monde ──
  const force = fleche(2.6);
  scene.add(force.groupe);
  const droiteAction = trait([0, 0, 0, 1, 0, 0], 1.4, { pointille: true });
  const bras = trait([0, 0, 0, 1, 0, 0], 2.6);
  scene.add(droiteAction, bras);

  const traits = [axe, bord, ...rayons, rayonPeint, arcSiege, arcBord, trace, force.corps, droiteAction, bras];
  for (const l of traits) {
    l.material.transparent = true;
    l.renderOrder = 10;
  }
  force.tete.renderOrder = 11;

  function appliquerCouleurs() {
    const { surface, encre, encreDouce, accent } = lireJetons(hote);
    renderer.setClearColor(couleur(surface), 1);
    axe.material.color.copy(couleur(encre));
    matDisque.color = couleur(melange(surface, encreDouce, 0.16));
    bord.material.color.copy(couleur(encreDouce));
    rayons.forEach((l) => l.material.color.copy(couleur(encreDouce)));
    rayonPeint.material.color.copy(couleur(encre));
    matEncre.color = couleur(encre);
    matEnfant.color = couleur(melange(surface, encre, 0.5));
    force.corps.material.color.copy(couleur(encre));
    (force.tete.material as MeshBasicMaterial).color = couleur(encre);
    for (const l of [arcSiege, arcBord, droiteAction, bras]) l.material.color.copy(couleur(accent));
    trace.material.color.copy(couleur(encreDouce));
  }
  appliquerCouleurs();

  let azimut = -60;
  let elevation = 28;
  let largeurCss = 480;
  let hauteurCss = 360;
  let axeCadre: Axe | null = null;
  let coins: Vector3[] = [];
  const cible = new Vector3();

  /**
   * Le cadrage : le PIRE cas de l'orientation d'axe — le disque et la flèche
   * du poids (2,45 m), où qu'elle puisse être. Il ne change qu'avec l'axe :
   * jamais pendant une course, jamais quand l'élève change la force (spec §6).
   */
  function cadrer(a: Axe) {
    axeCadre = a;
    const pts: Vector3[] = [];
    const L = POIDS * M_PAR_N + R_ENFANT + 0.1;
    if (a === "vertical") {
      for (let k = 0; k < 24; k++) {
        const t = (k * Math.PI) / 12;
        const x = (RAYON + 0.25) * Math.cos(t), z = (RAYON + 0.25) * Math.sin(t);
        pts.push(new Vector3(x, 0.35, z), new Vector3(x, -L, z));
      }
      pts.push(new Vector3(0, 1.35, 0));
    } else {
      // La roue (plan x, y) et la flèche du poids au siège, sur le quart de
      // tour qu'il parcourt, de l'horizontale à l'équilibre.
      for (let k = 0; k < 24; k++) {
        const t = (k * Math.PI) / 12;
        pts.push(new Vector3((RAYON + 0.25) * Math.cos(t), (RAYON + 0.25) * Math.sin(t), 0));
      }
      for (let k = 0; k <= 8; k++) {
        const p = (k * Math.PI) / 16;
        const x = RAYON * Math.cos(p), y = -RAYON * Math.sin(p);
        pts.push(new Vector3(x + 0.15, y - L, 0.2), new Vector3(x - 0.15, y - L, 0.2));
      }
      pts.push(new Vector3(0, 0, 1.35), new Vector3(0, 0, -1.1));
    }
    coins = pts;
    const mn = new Vector3(Infinity, Infinity, Infinity), mx = new Vector3(-Infinity, -Infinity, -Infinity);
    for (const p of pts) {
      mn.min(p);
      mx.max(p);
    }
    cible.copy(mn).add(mx).multiplyScalar(0.5);
  }

  function placerCamera() {
    const ar = (azimut * Math.PI) / 180;
    const er = (elevation * Math.PI) / 180;
    const dir = new Vector3(Math.cos(er) * Math.cos(ar), Math.sin(er), -Math.cos(er) * Math.sin(ar));
    camera.up.set(0, 1, 0);
    // Vu du dessus, le haut de l'écran reste le même à chaque visite.
    if (elevation > 80) camera.up.set(0, 0, -1);
    camera.updateProjectionMatrix();
    const tient = (dist: number) => {
      camera.position.copy(dir).multiplyScalar(dist).add(cible);
      camera.lookAt(cible);
      camera.updateMatrixWorld();
      return coins.every((c) => {
        const p = c.clone().project(camera);
        return Math.abs(p.x) <= 0.9 && Math.abs(p.y) <= 0.86 && p.z < 1;
      });
    };
    let lo = 1;
    let hi = 400;
    for (let i = 0; i < 28; i++) {
      const m = (lo + hi) / 2;
      if (tient(m)) hi = m;
      else lo = m;
    }
    tient(hi);
  }

  let dernier: EtatRendu | null = null;
  const posForce = new Vector3();
  const posBras = new Vector3();
  const posComposante = new Vector3();
  const posTrace = new Vector3();
  const queue = new Vector3();
  const pointe = new Vector3();
  const brasPied = new Vector3();
  const brasBout = new Vector3();
  let brasVisible = false;
  let traceVisible = false;
  const actionA = new Vector3();
  const actionB = new Vector3();
  const traceBout = new Vector3();

  /** Un point du repère du socle, dans le monde. */
  const monde = (x: number, y: number, z: number) => socle.localToWorld(new Vector3(x, y, z));

  function mettreAJour(e: EtatRendu) {
    dernier = e;
    if (axeCadre !== e.axe) {
      cadrer(e.axe);
      placerCamera();
    }
    socle.rotation.set(e.axe === "horizontal" ? Math.PI / 2 : 0, 0, 0);
    // Axe vertical : θ > 0 tourne dans le sens trigonométrique vu du dessus.
    // Axe basculé : le siège DESCEND — c'est le sens inverse dans le repère
    // du socle (son z local pointe vers le bas du monde).
    const psi = e.axe === "horizontal" ? -e.theta : e.theta;
    tournant.rotation.set(0, psi, 0);

    // Les enfants, sur le diamètre peint : le siège marqué en +x.
    enfants[0].position.set(e.rSieges, R_ENFANT, 0);
    enfants[1].position.set(-e.rSieges, R_ENFANT, 0);
    enfants[1].visible = e.occupants === "deux";
    scene.updateMatrixWorld(true);

    // ── Les arcs : de l'angle 0 à l'angle tourné, dans le socle ──
    const arc = (r: number) => {
      const n = Math.max(2, Math.ceil(Math.abs(e.theta) / 0.05));
      const pts: number[] = [];
      for (let k = 0; k <= n; k++) {
        const a = (psi * k) / n;
        pts.push(r * Math.cos(a), 0.012, -r * Math.sin(a));
      }
      return pts;
    };
    const arcsVisibles = e.arcs && e.axe === "vertical" && e.theta > 1e-4;
    arcSiege.visible = arcBord.visible = arcsVisibles;
    if (arcsVisibles) {
      remplacerPositions(arcSiege, arc(e.rSieges));
      remplacerPositions(arcBord, arc(RAYON));
    }

    // ── La trace de l'essai précédent ──
    traceVisible = e.trace !== null && e.axe === "vertical";
    trace.visible = traceVisible;
    if (traceVisible) {
      const a = e.trace as number;
      remplacerPositions(trace, [0, 0.008, 0, RAYON * Math.cos(a), 0.008, -RAYON * Math.sin(a)]);
      trace.material.dashSize = 0.08;
      trace.material.gapSize = 0.06;
      posTrace.copy(monde(RAYON * 1.12 * Math.cos(a), 0.05, -RAYON * 1.12 * Math.sin(a)));
      traceBout.copy(monde(RAYON * Math.cos(a), 0.008, -RAYON * Math.sin(a)));
    }

    // ── La force sélectionnée ──
    droiteAction.visible = bras.visible = false;
    brasVisible = false;
    let point: Vector3;
    let dir: Vector3;
    if (e.force === "poids" || e.axe === "horizontal") {
      // Le poids, vertical dans le monde, au centre du siège marqué.
      point = enfants[0].getWorldPosition(new Vector3());
      dir = new Vector3(0, -1, 0);
      queue.copy(point);
      pointe.copy(point).add(dir.clone().multiplyScalar(POIDS * M_PAR_N));
      poserFleche(force, queue, pointe);
    } else {
      // La poussée, au point du rayon perpendiculaire (90° en avance sur le
      // rayon peint) : elle ARRIVE au point, elle le pousse.
      const a = psi + Math.PI / 2;
      const u = new Vector3(Math.cos(a), 0, -Math.sin(a));
      const tg = new Vector3(-Math.sin(a), 0, -Math.cos(a));
      point = monde(e.rPoussee * u.x, 0.05, e.rPoussee * u.z);
      const dLocal = e.force === "tangentielle" ? tg : u.clone().negate();
      dir = monde(dLocal.x, dLocal.y, dLocal.z).sub(monde(0, 0, 0)).normalize();
      pointe.copy(point);
      queue.copy(point).sub(dir.clone().multiplyScalar(POUSSEE * M_PAR_N));
      poserFleche(force, queue, pointe);
    }
    posForce.copy(queue).add(pointe).multiplyScalar(0.5);
    posComposante.copy(queue).add(new Vector3(0, 0.25, 0));

    if (e.droiteAction) {
      const loin = e.force === "poids" || e.axe === "horizontal" ? 3.2 : 2.2;
      const a = point.clone().sub(dir.clone().multiplyScalar(loin));
      const b = point.clone().add(dir.clone().multiplyScalar(loin));
      actionA.copy(a);
      actionB.copy(b);
      remplacerPositions(droiteAction, [...a.toArray(), ...b.toArray()]);
      droiteAction.material.dashSize = 0.09;
      droiteAction.material.gapSize = 0.07;
      droiteAction.visible = true;
    }
    if (e.bras !== null && e.bras > 1e-6) {
      if (e.axe === "horizontal") {
        // Du pied sur Δ, à la hauteur de l'axe, jusqu'à la verticale du siège :
        // horizontal, et il fond à mesure que le siège descend.
        brasPied.set(0, 0, point.z);
        brasBout.set(point.x, 0, point.z);
      } else {
        brasPied.copy(monde(0, 0.05, 0));
        brasBout.copy(point);
      }
      remplacerPositions(bras, [...brasPied.toArray(), ...brasBout.toArray()]);
      bras.visible = brasVisible = true;
      posBras.copy(brasPied).add(brasBout).multiplyScalar(0.5).add(new Vector3(0, 0.16, 0));
    }
  }

  function redimensionner(largeur: number, hauteur: number) {
    largeurCss = Math.max(1, Math.round(largeur));
    hauteurCss = Math.max(1, Math.round(hauteur));
    renderer.setSize(largeurCss, hauteurCss, false);
    camera.aspect = largeurCss / hauteurCss;
    for (const l of traits) l.material.resolution.set(largeurCss, hauteurCss);
    placerCamera();
  }

  function projeter(v: Vector3, visible: boolean): Projection {
    const q = v.clone().project(camera);
    return { x: ((q.x + 1) / 2) * largeurCss, y: ((1 - q.y) / 2) * hauteurCss, visible: visible && q.z > -1 && q.z < 1 };
  }

  cadrer("vertical");
  placerCamera();

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-10, Math.min(89, e));
      placerCamera();
    },
    redimensionner,
    relireCouleurs() {
      appliquerCouleurs();
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      const d = dernier;
      const bout = tournant.localToWorld(new Vector3(RAYON, 0.02, 0));
      const siege = enfants[0].getWorldPosition(new Vector3());
      const haut = socle.localToWorld(new Vector3(0, 1.28, 0));
      return {
        axe: projeter(haut, true),
        force: projeter(posForce, !!d),
        bras: projeter(posBras, brasVisible),
        composante: projeter(posComposante, !!d),
        trace: projeter(posTrace, traceVisible),
        centre: projeter(socle.localToWorld(new Vector3(0, 0.02, 0)), true),
        repere: projeter(bout, true),
        siege: projeter(siege, true),
        queue: projeter(queue, !!d),
        pointe: projeter(pointe, !!d),
        brasPied: projeter(brasPied, brasVisible),
        brasBout: projeter(brasBout, brasVisible),
      };
    },
    segments() {
      const s: [Projection, Projection][] = [
        [projeter(socle.localToWorld(new Vector3(0, -1.0, 0)), true), projeter(socle.localToWorld(new Vector3(0, 1.2, 0)), true)],
        [projeter(tournant.localToWorld(new Vector3(0, 0.006, 0)), true), projeter(tournant.localToWorld(new Vector3(RAYON, 0.006, 0)), true)],
      ];
      if (dernier) s.push([projeter(queue, true), projeter(pointe, true)]);
      if (brasVisible) s.push([projeter(brasPied, true), projeter(brasBout, true)]);
      if (droiteAction.visible) s.push([projeter(actionA, true), projeter(actionB, true)]);
      if (traceVisible) s.push([projeter(socle.localToWorld(new Vector3(0, 0.008, 0)), true), projeter(traceBout, true)]);
      return s;
    },
    cadre() {
      return { largeur: largeurCss, hauteur: hauteurCss };
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
