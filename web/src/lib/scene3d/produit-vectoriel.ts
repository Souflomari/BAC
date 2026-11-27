/**
 * produit-vectoriel.ts — le RENDU three.js de la scène « le produit
 * vectoriel » (maths/geometrie-espace, R3), chargé au clic.
 *
 * Ce que l'élève voit, et rien d'autre (DESIGN-BIBLE §6) :
 *   · trois axes discrets, le point A ;
 *   · u = AB et v, en encre : l'énoncé ;
 *   · en ACCENT, la seule idée : le produit vectoriel — sa flèche, et, en
 *     teinte légère, le parallélogramme dont sa norme est l'aire ;
 *   · une fois révélés : les angles droits entre le produit et u, v.
 *
 * L'ISSUE — la flèche du produit, le parallélogramme, les angles droits —
 * n'est dessinée qu'une fois le pari posé (§11.190) : u et v sont l'énoncé.
 *
 * Aucune géométrie ici : tout vient de `vectoriel.ts`. Couleurs lues sur les
 * jetons (`palette.ts`), traits d'épaisseur constante (`traits.ts`).
 *
 * Repère : maths (x, y, z), z vers le haut → three.js (x, z, −y).
 */
import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  ConeGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
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
import { couleur, lireJetons, melange } from "./palette";
import { remplacerPositions, trait } from "./traits";
import { U, norme, produit, vecteurV, type EtatVectoriel, type V3 } from "./vectoriel";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

export interface SceneVectoriel {
  /** `issue` : le produit, le parallélogramme et les angles droits sont-ils montrés ? */
  mettreAJour(etat: EtatVectoriel, issue: boolean): void;
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  etiquettes(): { A: Projection; u: Projection; v: Projection; w: Projection; x: Projection; y: Projection; z: Projection };
  detruire(): void;
}

/** maths (x, y, z) → three (x, z, −y) */
const vs = (p: V3) => new Vector3(p[0], p[2], -p[1]);
const HAUT = new Vector3(0, 1, 0);
const AXE = 2.6;

function fleche(largeur: number) {
  const corps = trait([0, 0, 0, 1, 0, 0], largeur);
  const tete = new Mesh(new ConeGeometry(0.1, 0.3, 18), new MeshBasicMaterial({ transparent: true }));
  const groupe = new Group();
  groupe.add(corps, tete);
  return { groupe, corps, tete };
}

function poserFleche(f: ReturnType<typeof fleche>, vers: Vector3) {
  const n = vers.length();
  if (n < 1e-6) {
    f.groupe.visible = false;
    return;
  }
  f.groupe.visible = true;
  const u = vers.clone().divideScalar(n);
  const recul = Math.min(0.3, n * 0.5);
  const base = vers.clone().sub(u.clone().multiplyScalar(recul));
  remplacerPositions(f.corps, [0, 0, 0, base.x, base.y, base.z]);
  f.tete.position.copy(vers.clone().sub(u.clone().multiplyScalar(recul / 2)));
  f.tete.scale.setScalar(Math.min(1, n / 0.6));
  f.tete.quaternion.copy(new Quaternion().setFromUnitVectors(HAUT, u));
}

export function creerSceneVectoriel(canvas: HTMLCanvasElement, hote: HTMLElement): SceneVectoriel {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(26, 1, 0.1, 400);
  scene.add(camera);
  scene.add(new AmbientLight(0xffffff, 1.85));
  const douce = new DirectionalLight(0xffffff, 1.35);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);

  // ── Les axes, discrets ──
  const axes = [
    trait([...vs([-0.4, 0, 0]).toArray(), ...vs([AXE, 0, 0]).toArray()], 1, { opacite: 0.45 }),
    trait([...vs([0, -0.4, 0]).toArray(), ...vs([0, AXE, 0]).toArray()], 1, { opacite: 0.45 }),
    trait([...vs([0, 0, -0.4]).toArray(), ...vs([0, 0, AXE]).toArray()], 1, { opacite: 0.45 }),
  ];
  axes.forEach((a) => scene.add(a));
  const pointA = new Mesh(new SphereGeometry(0.06, 16, 12), new MeshBasicMaterial({ transparent: true }));
  scene.add(pointA);

  // ── Le parallélogramme (teinte d'accent) et ses bords ──
  const geomPara = new BufferGeometry();
  geomPara.setAttribute("position", new BufferAttribute(new Float32Array(12), 3));
  geomPara.setIndex([0, 1, 2, 0, 2, 3]);
  const para = new Mesh(geomPara, new MeshBasicMaterial({ transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false }));
  scene.add(para);
  const bordsPara = trait([0, 0, 0, 1, 0, 0], 1.2, { pointille: true });
  scene.add(bordsPara);

  // ── u, v (encre) ; le produit (accent) ; les angles droits ──
  const flecheU = fleche(2.5);
  const flecheV = fleche(2.5);
  const flecheW = fleche(3);
  scene.add(flecheU.groupe, flecheV.groupe, flecheW.groupe);
  const angleU = trait([0, 0, 0, 1, 0, 0], 1.2);
  const angleV = trait([0, 0, 0, 1, 0, 0], 1.2);
  scene.add(angleU, angleV);

  // ORDRE DE DESSIN (§11.189) : le parallélogramme est translucide ; les
  // traits et les flèches passent après lui, en couleur pure.
  for (const l of [bordsPara, angleU, angleV, flecheU.corps, flecheV.corps, flecheW.corps]) {
    l.material.transparent = true;
    l.renderOrder = 10;
  }
  for (const m of [pointA, flecheU.tete, flecheV.tete, flecheW.tete]) m.renderOrder = 11;

  function appliquerCouleurs() {
    const { surface, encre, encreDouce, accent } = lireJetons(hote);
    renderer.setClearColor(couleur(surface), 1);
    axes.forEach((a) => a.material.color.copy(couleur(encreDouce)));
    (pointA.material as MeshBasicMaterial).color = couleur(encre);
    (para.material as MeshBasicMaterial).color = couleur(melange(surface, accent, 0.55));
    bordsPara.material.color.copy(couleur(encreDouce));
    for (const f of [flecheU, flecheV]) {
      f.corps.material.color.copy(couleur(encre));
      (f.tete.material as MeshBasicMaterial).color = couleur(encre);
    }
    flecheW.corps.material.color.copy(couleur(accent));
    (flecheW.tete.material as MeshBasicMaterial).color = couleur(accent);
    for (const l of [angleU, angleV]) l.material.color.copy(couleur(encreDouce));
  }
  appliquerCouleurs();

  let azimut = 35;
  let elevation = 22;
  let largeurCss = 480;
  let hauteurCss = 480;
  let dernier: { etat: EtatVectoriel; issue: boolean } | null = null;
  let posV = new Vector3();
  let posW = new Vector3();
  let wVisible = false;
  /**
   * Ce que la caméra cadre : TOUT ce que la scène peut montrer pour la norme,
   * l'inclinaison et l'ordre courants — v et le produit pour CHAQUE angle θ,
   * plus les axes. Cadrer le contenu courant ferait bouger la caméra à chaque
   * cran de θ ; cadrer le pire cas (‖v‖ = 3, les deux ordres) laissait la
   * moitié du canvas vide (vu à l'écran). La caméra ne bouge donc que quand
   * ‖v‖, φ ou l'ordre changent.
   */
  let cleCadre = "";
  let points: Vector3[] = [];
  let cible = new Vector3();

  function cadrer(e: EtatVectoriel) {
    const cle = `${e.lv}/${e.phi}/${e.ordre}`;
    if (cle === cleCadre) return false;
    cleCadre = cle;
    // Les étiquettes aussi : une étiquette posée au-delà d'une pointe doit
    // tenir dans l'image (vu à l'écran : « y » coupé au bord, « u ∧ v » dans la
    // légende du coin).
    const au = (p: V3, d: number): V3 => {
      const n = Math.hypot(p[0], p[1], p[2]);
      return n < 1e-9 ? p : [p[0] * (1 + d / n), p[1] * (1 + d / n), p[2] * (1 + d / n)];
    };
    const pts: V3[] = [[0, 0, 0], au(U, 0.5), [AXE + 0.45, 0, 0], [0, AXE + 0.45, 0], [-0.3, 0.3, AXE + 0.2], [-0.4, -0.4, -0.4]];
    for (let t = 0; t <= 180; t += 10) {
      const et = { ...e, theta: t };
      const v = vecteurV(et);
      const w = produit(et);
      pts.push(au(v, 0.5), au(w, 0.75), [U[0] + v[0], U[1] + v[1], U[2] + v[2]]);
    }
    points = pts.map(vs);
    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    points.forEach((p) => {
      min.min(p);
      max.max(p);
    });
    cible = min.clone().add(max).multiplyScalar(0.5);
    return true;
  }

  function placerCamera() {
    const a = (azimut * Math.PI) / 180;
    const e = (elevation * Math.PI) / 180;
    const dir = new Vector3(Math.cos(e) * Math.cos(a), Math.sin(e), -Math.cos(e) * Math.sin(a));
    const coins = points.length ? points : [vs([-2, -2, -2]), vs([2, 2, 2])];
    camera.updateProjectionMatrix();
    const tient = (d: number) => {
      camera.position.copy(dir).multiplyScalar(d).add(cible);
      camera.lookAt(cible);
      camera.updateMatrixWorld();
      return coins.every((c) => {
        const p = c.clone().project(camera);
        return Math.abs(p.x) <= 0.92 && Math.abs(p.y) <= 0.86 && p.z < 1;
      });
    };
    let lo = 2;
    let hi = 400;
    for (let i = 0; i < 26; i++) {
      const d = (lo + hi) / 2;
      if (tient(d)) hi = d;
      else lo = d;
    }
    tient(hi);
  }

  function mettreAJour(e: EtatVectoriel, issue: boolean) {
    dernier = { etat: e, issue };
    if (cadrer(e)) placerCamera();
    const v = vecteurV(e);
    const w = produit(e);
    posV = vs(v);
    poserFleche(flecheU, vs(U));
    poserFleche(flecheV, posV);

    posW = vs(w);
    wVisible = issue && norme(w) > 1e-9;
    if (wVisible) poserFleche(flecheW, posW);
    else flecheW.groupe.visible = false;

    // Le parallélogramme A, B = u, u + v, v.
    const pts = [vs([0, 0, 0]), vs(U), vs([U[0] + v[0], U[1] + v[1], U[2] + v[2]]), posV];
    const attr = geomPara.getAttribute("position") as BufferAttribute;
    pts.forEach((p, i) => attr.setXYZ(i, p.x, p.y, p.z));
    attr.needsUpdate = true;
    geomPara.computeBoundingSphere();
    para.visible = issue && norme(w) > 1e-9;
    remplacerPositions(bordsPara, [...pts[1].toArray(), ...pts[2].toArray(), ...pts[3].toArray()]);
    bordsPara.material.dashSize = 0.14;
    bordsPara.material.gapSize = 0.1;
    bordsPara.visible = issue && norme(w) > 1e-9;

    // Les angles droits entre le produit et u, puis v : un petit carré dans
    // chacun des deux plans (produit, u) et (produit, v).
    const montrerAngles = wVisible;
    angleU.visible = angleV.visible = montrerAngles;
    if (montrerAngles) {
      const k = 0.28;
      const uw = posW.clone().normalize().multiplyScalar(k);
      const uu = vs(U).normalize().multiplyScalar(k);
      const uv = posV.clone().normalize().multiplyScalar(k);
      remplacerPositions(angleU, [...uu.toArray(), ...uu.clone().add(uw).toArray(), ...uw.toArray()]);
      remplacerPositions(angleV, [...uv.toArray(), ...uv.clone().add(uw).toArray(), ...uw.toArray()]);
    }
  }

  function redimensionner(largeur: number, hauteur: number) {
    largeurCss = Math.max(1, Math.round(largeur));
    hauteurCss = Math.max(1, Math.round(hauteur));
    renderer.setSize(largeurCss, hauteurCss, false);
    camera.aspect = largeurCss / hauteurCss;
    for (const l of [...axes, bordsPara, angleU, angleV, flecheU.corps, flecheV.corps, flecheW.corps]) l.material.resolution.set(largeurCss, hauteurCss);
    placerCamera();
  }

  function projeter(v: Vector3, visible: boolean): Projection {
    const q = v.clone().project(camera);
    return { x: ((q.x + 1) / 2) * largeurCss, y: ((1 - q.y) / 2) * hauteurCss, visible: visible && q.z > -1 && q.z < 1 };
  }
  /** L'ancre d'une étiquette : un peu au-delà de la pointe. */
  const auDela = (p: Vector3, d = 0.38) => (p.length() < 1e-6 ? p.clone() : p.clone().add(p.clone().normalize().multiplyScalar(d)));
  /** Une flèche vue presque de face (le produit vu de dessus) se réduit à un
   *  point sur A : son étiquette s'empilerait sur celle de A — on la tait. */
  const detacheeDeA = (p: Vector3) => {
    const a = projeter(new Vector3(), true);
    const b = projeter(p, true);
    return Math.hypot(a.x - b.x, a.y - b.y) > 24;
  };

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-80, Math.min(88, e));
      placerCamera();
      if (dernier) mettreAJour(dernier.etat, dernier.issue);
    },
    redimensionner,
    relireCouleurs() {
      appliquerCouleurs();
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      return {
        A: projeter(new Vector3(-0.22, -0.18, 0.22), true),
        u: projeter(auDela(vs(U)), true),
        v: projeter(auDela(posV), posV.length() > 1e-6),
        w: projeter(auDela(posW, 0.45), wVisible && detacheeDeA(posW)),
        x: projeter(vs([AXE + 0.25, 0, 0]), true),
        y: projeter(vs([0, AXE + 0.25, 0]), true),
        // z à côté de l'axe, pas dans son prolongement : le produit, vertical,
        // passe par là.
        z: projeter(vs([-0.3, 0.3, AXE]), true),
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

