/**
 * champ-magnetique.ts — le RENDU three.js de la scène « une particule chargée
 * dans un champ magnétique uniforme » (pc/chute-mouvements-plans, R6), chargé
 * au clic.
 *
 * Ce que l'élève voit, et rien d'autre (DESIGN-BIBLE §6) :
 *   · le champ B, en flèches : une tête d'un côté, un empennage de l'autre —
 *     vues de face, ce sont EXACTEMENT les ⊙ et ⊗ du manuel ; vues de biais,
 *     ce qu'ils ont toujours voulu dire, une direction perpendiculaire au plan ;
 *   · le couloir de champ (mode « couloir »), une bande translucide ;
 *   · en ACCENT, la seule idée : la particule et sa trajectoire ;
 *   · à la particule, v et F (en encre) ; à l'entrée, v₀ ∧ B en pointillé
 *     (ce que donne la main droite AVANT le signe de la charge) ;
 *   · une fois demandés : le centre C et le rayon, l'angle de déviation θ, et
 *     un cercle de référence en pointillé.
 *
 * Aucune physique ici : tout vient de `lorentz.ts`. Couleurs lues sur les
 * jetons (`palette.ts`), traits d'épaisseur constante (`traits.ts`), la même
 * lumière que les autres scènes.
 *
 * Repère : physique (x, y, z), z le long du champ → three.js (x − xc, z, −y) :
 * le plan du mouvement est horizontal, le champ vertical ; la vue « comme le
 * manuel » regarde d'en haut, le long du champ.
 */
import {
  AmbientLight,
  BoxGeometry,
  ConeGeometry,
  DirectionalLight,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Quaternion,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { couleur, lireJetons, melange } from "./palette";
import { cercle, remplacerPositions, trait, type Line2 } from "./traits";
import {
  CADRE,
  LARGEUR_COULOIR,
  composanteChamp,
  cote,
  coteProduit,
  normeForce,
  point,
  rayon,
  sortie,
  trajet,
  type EtatLorentz,
  type Region,
  type SensChamp,
} from "./lorentz";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

/** Ce que le panneau demande de montrer — l'issue n'apparaît qu'après le pari. */
export interface VueLorentz {
  etat: EtatLorentz;
  /** la force sur la particule (cachée tant que l'élève n'a pas parié) */
  force: boolean;
  /** v₀ ∧ B en pointillé à l'entrée (après la révélation) */
  produit: boolean;
  /** le centre C et le rayon */
  rayon: boolean;
  /** l'angle de déviation θ à la sortie du couloir */
  deviation: boolean;
}

export interface SceneLorentz {
  mettreAJour(v: VueLorentz): void;
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  etiquettes(): { v: Projection; F: Projection; B: Projection; produit: Projection; C: Projection; theta: Projection };
  detruire(): void;
}

/** Le centre du cadre (en x) : la scène est centrée sur lui. */
const XC = (CADRE.xMin + CADRE.xMax) / 2;
/** Demi-longueur d'une flèche de champ (cm). */
const H = 0.7;
/** Rayon de l'anneau qu'une flèche de champ traverse dans le plan (cm). */
const ANNEAU = 0.22;
/** Échelles des vecteurs : longueur (cm) par unité — linéaires, donc honnêtes. */
const CM_PAR_V = 1.3; // par 10⁷ m/s
// longueur(F) / R = 0,35 × 1,6 B² / 5,6875 ≤ 0,89 sur toute la grille (B ≤ 3 mT) :
// la flèche F ne dépasse jamais le centre vers lequel elle pointe.
const CM_PAR_F = 0.35; // par 10⁻¹⁵ N
const LONGUEUR_PRODUIT = 1.6;
/** Où l'étiquette d'une flèche se pose : au-delà de sa pointe (cm). */
const AU_DELA = 0.45;

/** physique (x, y, z) → three (x − xc, z, −y) */
const vp = (x: number, y: number, z = 0) => new Vector3(x - XC, z, -y);

const HAUT = new Vector3(0, 1, 0);

/** Une flèche : un trait et une tête conique, orientés à chaque image. */
function fleche(largeur: number, options: Partial<{ pointille: boolean }> = {}) {
  const corps = trait([0, 0, 0, 1, 0, 0], largeur, options);
  const tete = new Mesh(new ConeGeometry(0.13, 0.36, 16), new MeshBasicMaterial({ transparent: true }));
  const groupe = new Group();
  groupe.add(corps, tete);
  return { groupe, corps, tete };
}

function poserFleche(f: ReturnType<typeof fleche>, de: Vector3, vers: Vector3) {
  const d = vers.clone().sub(de);
  const n = d.length();
  if (n < 1e-6) {
    f.groupe.visible = false;
    return;
  }
  f.groupe.visible = true;
  const u = d.clone().divideScalar(n);
  const base = vers.clone().sub(u.clone().multiplyScalar(0.34));
  remplacerPositions(f.corps, [de.x, de.y, de.z, base.x, base.y, base.z]);
  f.tete.position.copy(vers.clone().sub(u.clone().multiplyScalar(0.18)));
  f.tete.quaternion.copy(new Quaternion().setFromUnitVectors(HAUT, u));
}

export function creerSceneLorentz(canvas: HTMLCanvasElement, hote: HTMLElement): SceneLorentz {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  // Un champ étroit : la vue « comme le manuel » doit ressembler à la figure
  // plane — une focale large écartait les flèches en éventail.
  const camera = new PerspectiveCamera(20, 1, 0.1, 800);
  scene.add(camera);
  scene.add(new AmbientLight(0xffffff, 1.85));
  const douce = new DirectionalLight(0xffffff, 1.35);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);

  // ── Le plan du mouvement : un cadre discret ──
  const cadre = trait(
    [
      ...vp(CADRE.xMin, CADRE.yMin).toArray(),
      ...vp(CADRE.xMax, CADRE.yMin).toArray(),
      ...vp(CADRE.xMax, CADRE.yMax).toArray(),
      ...vp(CADRE.xMin, CADRE.yMax).toArray(),
      ...vp(CADRE.xMin, CADRE.yMin).toArray(),
    ],
    1,
    { opacite: 0.35 }
  );
  scene.add(cadre);

  // ── Le couloir de champ ──
  const couloir = new Group();
  scene.add(couloir);
  const hauteurCouloir = CADRE.yMax - CADRE.yMin;
  const bande = new Mesh(
    new BoxGeometry(LARGEUR_COULOIR, 2 * H, hauteurCouloir),
    new MeshBasicMaterial({ transparent: true, opacity: 0.5, depthWrite: false })
  );
  bande.position.copy(vp(LARGEUR_COULOIR / 2, 0));
  couloir.add(bande);
  const faces = [0, LARGEUR_COULOIR].map((x) => trait([...vp(x, CADRE.yMin).toArray(), ...vp(x, CADRE.yMax).toArray()], 1.2));
  faces.forEach((f) => couloir.add(f));

  // ── Le champ : des flèches, tête d'un côté, empennage de l'autre ──
  const matChamp = new LineMaterial({ linewidth: 1, transparent: true, opacity: 0.55 });
  let traitsChamp: LineSegments2 | null = null;
  let tetesChamp: InstancedMesh | null = null;
  // Têtes OPAQUES et SANS FOND. Vue d'en haut, une tête qui vient vers l'œil
  // cache l'empennage sous elle : c'est un ⊙. Une tête qui s'éloigne ne doit
  // rien montrer — avec un fond, son disque apparaissait au centre de la croix
  // et le ⊗ se lisait ⊙, le contraire de ce qu'il dit (vu à l'écran).
  const matTetes = new MeshBasicMaterial();
  const geomTete = new ConeGeometry(0.1, 0.26, 14, 1, true);
  let champCle = "";

  function construireChamp(region: Region, sens: SensChamp) {
    const cle = `${region}/${sens}`;
    if (cle === champCle) return;
    champCle = cle;
    if (traitsChamp) {
      scene.remove(traitsChamp);
      traitsChamp.geometry.dispose();
    }
    if (tetesChamp) {
      scene.remove(tetesChamp);
      tetesChamp.dispose();
    }
    // Un maillage lâche (2 cm), décalé d'un demi-pas en y : aucune flèche ne
    // se plante sur la ligne d'entrée, où passe la particule.
    const xs = region === "couloir" ? [0.5, 1.5] : [-3.5, -1.5, 0.5, 2.5, 4.5, 6.5];
    const ys = [-5, -3, -1, 1, 3, 5];
    const bz = composanteChamp(sens);
    const segments: number[] = [];
    const matrices: Matrix4[] = [];
    const q = new Quaternion().setFromUnitVectors(HAUT, new Vector3(0, bz, 0));
    // L'empennage : champ entrant, il est EN HAUT, vers l'œil — une croix
    // franche dans l'anneau (⊗). Champ sortant, il est en bas, sous la tête —
    // plus petit qu'elle, pour qu'elle le recouvre (⊙).
    const e = (bz < 0 ? 0.17 : 0.085) / Math.SQRT2;
    for (const x of xs) {
      for (const y of ys) {
        // le corps : de l'empennage (−bz·H) à la base de la tête
        segments.push(...vp(x, y, -bz * H).toArray(), ...vp(x, y, bz * (H - 0.24)).toArray());
        // l'empennage : une croix
        segments.push(...vp(x - e, y - e, -bz * H).toArray(), ...vp(x + e, y + e, -bz * H).toArray());
        segments.push(...vp(x - e, y + e, -bz * H).toArray(), ...vp(x + e, y - e, -bz * H).toArray());
        // l'anneau, dans le plan du mouvement : la flèche le TRAVERSE. Vu d'en
        // haut, anneau + croix = ⊗, anneau + pointe = ⊙ — les symboles du
        // manuel ne sont que cette flèche vue de face.
        for (let k = 0; k < 20; k++) {
          const a0 = (2 * Math.PI * k) / 20;
          const a1 = (2 * Math.PI * (k + 1)) / 20;
          segments.push(
            ...vp(x + ANNEAU * Math.cos(a0), y + ANNEAU * Math.sin(a0)).toArray(),
            ...vp(x + ANNEAU * Math.cos(a1), y + ANNEAU * Math.sin(a1)).toArray()
          );
        }
        matrices.push(new Matrix4().compose(vp(x, y, bz * (H - 0.13)), q, new Vector3(1, 1, 1)));
      }
    }
    const g = new LineSegmentsGeometry();
    g.setPositions(segments);
    traitsChamp = new LineSegments2(g, matChamp);
    scene.add(traitsChamp);
    tetesChamp = new InstancedMesh(geomTete, matTetes, matrices.length);
    matrices.forEach((m, i) => tetesChamp!.setMatrixAt(i, m));
    tetesChamp.instanceMatrix.needsUpdate = true;
    scene.add(tetesChamp);
  }

  // ── Ce qui se lit sur le plan ──
  const reference = trait([0, 0, 0, 1, 0, 0], 1.5, { pointille: true });
  scene.add(reference);
  const trajectoire = trait([0, 0, 0, 1, 0, 0], 2.5);
  scene.add(trajectoire);
  const particule = new Mesh(new SphereGeometry(0.17, 24, 16), new MeshBasicMaterial({ transparent: true }));
  scene.add(particule);
  const flecheV = fleche(2.5);
  const flecheF = fleche(2.5);
  const flecheProduit = fleche(1.8, { pointille: true });
  scene.add(flecheV.groupe, flecheF.groupe, flecheProduit.groupe);
  const pointC = new Mesh(new SphereGeometry(0.08, 16, 12), new MeshBasicMaterial({ transparent: true }));
  const segmentR = trait([0, 0, 0, 1, 0, 0], 1.2, { pointille: true });
  scene.add(pointC, segmentR);
  const directionInitiale = trait([0, 0, 0, 1, 0, 0], 1.2, { pointille: true });
  const arcTheta = trait([0, 0, 0, 1, 0, 0], 1.5);
  scene.add(directionInitiale, arcTheta);

  // ORDRE DE DESSIN (appris sur la sphère, §11.189) : la bande est
  // translucide ; tout ce qui se lit passe APRÈS elle, en couleur pure.
  for (const l of [reference, trajectoire, segmentR, directionInitiale, arcTheta, flecheV.corps, flecheF.corps, flecheProduit.corps]) {
    l.material.transparent = true;
    l.renderOrder = 10;
  }
  for (const m of [particule, pointC, flecheV.tete, flecheF.tete, flecheProduit.tete]) m.renderOrder = 11;

  function appliquerCouleurs() {
    const { surface, encre, encreDouce, accent } = lireJetons(hote);
    renderer.setClearColor(couleur(surface), 1);
    cadre.material.color.copy(couleur(encreDouce));
    (bande.material as MeshBasicMaterial).color = couleur(melange(surface, encreDouce, 0.14));
    faces.forEach((f) => f.material.color.copy(couleur(encreDouce)));
    matChamp.color.copy(couleur(encreDouce));
    matTetes.color = couleur(encreDouce);
    reference.material.color.copy(couleur(encreDouce));
    trajectoire.material.color.copy(couleur(accent));
    (particule.material as MeshBasicMaterial).color = couleur(accent);
    for (const f of [flecheV, flecheF]) {
      f.corps.material.color.copy(couleur(encre));
      (f.tete.material as MeshBasicMaterial).color = couleur(encre);
    }
    flecheProduit.corps.material.color.copy(couleur(encreDouce));
    (flecheProduit.tete.material as MeshBasicMaterial).color = couleur(encreDouce);
    (pointC.material as MeshBasicMaterial).color = couleur(encreDouce);
    for (const l of [segmentR, directionInitiale, arcTheta]) l.material.color.copy(couleur(encreDouce));
  }
  appliquerCouleurs();

  let azimut = -90;
  let elevation = 88;
  let largeurCss = 480;
  let hauteurCss = 480;
  let derniere: VueLorentz | null = null;
  const posV = new Vector3();
  const posF = new Vector3();
  const posProduit = new Vector3();
  const etiqV = new Vector3();
  const etiqF = new Vector3();
  const etiqProduit = new Vector3();
  const posC = new Vector3();
  const posTheta = new Vector3();
  let vueV = false;
  let vueF = false;
  let vueProduit = false;
  let vueC = false;
  let vueTheta = false;

  // Les huit coins de la boîte à montrer : le cadre, et la hauteur des flèches.
  const COINS: Vector3[] = [];
  for (const x of [CADRE.xMin, CADRE.xMax]) for (const y of [CADRE.yMin, CADRE.yMax]) for (const z of [-H, H]) COINS.push(vp(x, y, z));

  /** La caméra se place à la distance la plus courte où toute la boîte tient
   *  dans l'image, QUELLE QUE SOIT la vue (d'en haut, de biais, par la tranche). */
  function placerCamera() {
    const a = (azimut * Math.PI) / 180;
    const e = (elevation * Math.PI) / 180;
    const dir = new Vector3(Math.cos(e) * Math.cos(a), Math.sin(e), -Math.cos(e) * Math.sin(a));
    camera.updateProjectionMatrix();
    const tient = (d: number) => {
      camera.position.copy(dir).multiplyScalar(d);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
      return COINS.every((c) => {
        const p = c.clone().project(camera);
        // Plus de marge en hauteur : la légende du plateau occupe le coin haut
        // (vu au téléphone, en 4:3, où la hauteur est la dimension qui limite).
        return Math.abs(p.x) <= 0.93 && Math.abs(p.y) <= 0.86 && p.z < 1;
      });
    };
    let lo = 5;
    let hi = 600;
    for (let i = 0; i < 26; i++) {
      const d = (lo + hi) / 2;
      if (tient(d)) hi = d;
      else lo = d;
    }
    tient(hi);
  }

  function pointilles(l: Line2) {
    l.material.dashSize = 0.2;
    l.material.gapSize = 0.14;
  }

  function mettreAJour(v: VueLorentz) {
    derniere = v;
    const e = v.etat;
    construireChamp(e.region, e.sens);
    couloir.visible = e.region === "couloir";

    const R = rayon(e);
    const s = cote(e);
    const p = point(e, e.t);

    // La trajectoire parcourue, et la particule.
    const chemin = trajet(e, e.t);
    trajectoire.visible = chemin.length > 1 && e.t > 0;
    if (trajectoire.visible) remplacerPositions(trajectoire, chemin.flatMap(([x, y]) => vp(x, y).toArray()));
    particule.position.copy(vp(p.x, p.y));

    // v, toujours (c'est une donnée de l'énoncé) ; F, jamais avant le pari.
    posV.copy(vp(p.x + p.vx * CM_PAR_V, p.y + p.vy * CM_PAR_V));
    poserFleche(flecheV, vp(p.x, p.y), posV);
    const nv = Math.hypot(p.vx, p.vy) || 1;
    etiqV.copy(vp(p.x + p.vx * CM_PAR_V + (p.vx / nv) * AU_DELA, p.y + p.vy * CM_PAR_V + (p.vy / nv) * AU_DELA));
    vueV = true;
    const dansChamp = p.phase === "champ";
    const longueurF = (normeForce(e, p) / 1e-15) * CM_PAR_F;
    if (v.force && dansChamp) {
      const cx = 0;
      const cy = s * R;
      const dx = cx - p.x;
      const dy = cy - p.y;
      const n = Math.hypot(dx, dy) || 1;
      posF.copy(vp(p.x + (dx / n) * longueurF, p.y + (dy / n) * longueurF));
      poserFleche(flecheF, vp(p.x, p.y), posF);
      // L'étiquette de F à CÔTÉ de la flèche, pas au-delà de sa pointe : F pointe
      // vers C, et au-delà de la pointe il y a… l'étiquette de C (vu à l'écran).
      const mx = p.x + (dx / n) * longueurF * 0.5;
      const my = p.y + (dy / n) * longueurF * 0.5;
      etiqF.copy(vp(mx + (dy / n) * AU_DELA, my - (dx / n) * AU_DELA));
      vueF = true;
    } else {
      flecheF.groupe.visible = false;
      vueF = false;
    }

    // v₀ ∧ B à l'entrée (en O) : ce que donne la main droite, avant le signe de q.
    if (v.produit) {
      posProduit.copy(vp(0, coteProduit(e.sens) * LONGUEUR_PRODUIT));
      poserFleche(flecheProduit, vp(0, 0), posProduit);
      etiqProduit.copy(vp(0, coteProduit(e.sens) * (LONGUEUR_PRODUIT + AU_DELA)));
      pointilles(flecheProduit.corps);
      vueProduit = true;
    } else {
      flecheProduit.groupe.visible = false;
      vueProduit = false;
    }

    // Le cercle de référence : même particule, même v₀, un autre champ.
    if (e.traceB !== null && e.region === "partout") {
      const Rr = rayon({ B: e.traceB, v0: e.v0 });
      const pts = cercle(Rr, 180, (u) => [Math.sin(u), s * (1 - Math.cos(u)), 0]);
      const enScene: number[] = [];
      for (let i = 0; i < pts.length; i += 3) enScene.push(...vp(pts[i], pts[i + 1]).toArray());
      remplacerPositions(reference, enScene);
      pointilles(reference);
      reference.visible = true;
    } else {
      reference.visible = false;
    }

    // Le centre et le rayon.
    vueC = v.rayon && (e.region === "partout" || p.phase !== "avant");
    pointC.visible = segmentR.visible = vueC;
    if (vueC) {
      posC.copy(vp(0, s * R));
      pointC.position.copy(posC);
      const bout = p.phase === "champ" ? vp(p.x, p.y) : vp(0, 0);
      remplacerPositions(segmentR, [...posC.toArray(), ...bout.toArray()]);
      pointilles(segmentR);
    }

    // La déviation θ à la sortie du couloir (si la particule le traverse).
    const so = sortie(e);
    vueTheta = v.deviation && so.type === "traverse" && p.phase === "apres";
    directionInitiale.visible = arcTheta.visible = vueTheta;
    if (vueTheta && so.type === "traverse") {
      const xs = LARGEUR_COULOIR;
      const ys = s * R * (1 - Math.cos(so.theta));
      remplacerPositions(directionInitiale, [...vp(xs, ys).toArray(), ...vp(xs + 1.8, ys).toArray()]);
      pointilles(directionInitiale);
      const n = 40;
      const arc: number[] = [];
      for (let k = 0; k <= n; k++) {
        const a = (so.theta * k) / n;
        arc.push(...vp(xs + 1.2 * Math.cos(a), ys + s * 1.2 * Math.sin(a)).toArray());
      }
      remplacerPositions(arcTheta, arc);
      const am = so.theta / 2;
      posTheta.copy(vp(xs + 1.65 * Math.cos(am), ys + s * 1.65 * Math.sin(am)));
    }
  }

  function redimensionner(largeur: number, hauteur: number) {
    largeurCss = Math.max(1, Math.round(largeur));
    hauteurCss = Math.max(1, Math.round(hauteur));
    renderer.setSize(largeurCss, hauteurCss, false);
    camera.aspect = largeurCss / hauteurCss;
    matChamp.resolution.set(largeurCss, hauteurCss);
    for (const l of [cadre, ...faces, reference, trajectoire, segmentR, directionInitiale, arcTheta, flecheV.corps, flecheF.corps, flecheProduit.corps])
      l.material.resolution.set(largeurCss, hauteurCss);
    placerCamera();
  }

  function projeter(v: Vector3, visible: boolean): Projection {
    const q = v.clone().project(camera);
    return { x: ((q.x + 1) / 2) * largeurCss, y: ((1 - q.y) / 2) * hauteurCss, visible: visible && q.z > -1 && q.z < 1 };
  }

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-80, Math.min(88, e));
      placerCamera();
      if (derniere) mettreAJour(derniere);
    },
    redimensionner,
    relireCouleurs() {
      appliquerCouleurs();
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      const e = derniere?.etat;
      // L'étiquette de B se pose sur la flèche du coin haut-droit du champ.
      const xB = e?.region === "couloir" ? 1.5 : 6.5;
      const bz = e ? composanteChamp(e.sens) : 1;
      return {
        v: projeter(etiqV, vueV),
        F: projeter(etiqF, vueF),
        B: projeter(vp(xB + 0.6, 5, bz * H), true),
        produit: projeter(etiqProduit, vueProduit),
        C: projeter(posC, vueC),
        theta: projeter(posTheta, vueTheta),
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
      geomTete.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
