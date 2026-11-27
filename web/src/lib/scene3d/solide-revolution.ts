/**
 * solide-revolution.ts — le RENDU three.js de la scène « le solide de
 * révolution » (maths/calcul-integral, R9), chargé au clic.
 *
 * Ce que l'élève voit, et rien d'autre (DESIGN-BIBLE §6) :
 *   · l'axe des abscisses — l'axe de rotation — et (Oy), discrets ;
 *   · la courbe de f sur [a ; b] et la région sous elle : l'énoncé ;
 *   · le solide balayé, translucide, avec ses méridiennes (la courbe tous les
 *     30°) et quelques parallèles : on voit qu'il TOURNE ;
 *   · en ACCENT, la seule idée : la coupe à l'abscisse x — un disque PLEIN de
 *     rayon f(x) ; puis les tranches empilées ;
 *   · le cube unité, pour la conversion en cm³.
 *
 * L'ISSUE — le solide coupé et son disque, les tranches, le cube — n'est
 * dessinée qu'une fois le pari posé (§11.190) : c'est le panneau qui le dit,
 * par `MontreRevolution`.
 *
 * Aucune somme n'est calculée ici (limite SExp, spec §3.2) : les tranches
 * sont des cylindres DESSINÉS, jamais additionnés.
 *
 * Repère : maths (x, y, z) = three (x, y, z) — y vers le haut. L'axe de
 * rotation est (Ox) ; à l'angle θ, le point de la courbe d'abscisse x est
 * (x, f(x) cos θ, f(x) sin θ) : le balayage vient d'abord vers l'œil.
 */
import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  ConeGeometry,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { couleur, lireJetons, melange } from "./palette";
import { remplacerPositions, trait, type Line2 } from "./traits";
import { FONCTIONS, rayonMax, type EtatRevolution, type Fonction } from "./revolution";

export interface Projection {
  x: number;
  y: number;
  visible: boolean;
}

/** Ce que le panneau autorise à montrer — l'issue attend le pari. */
export interface MontreRevolution {
  /** la coupe : le solide tranché à l'abscisse x, le disque plein, son rayon */
  coupe: boolean;
  /** avant le pari de la coupe : le plan où l'on va couper (l'énoncé) */
  planDeCoupe: boolean;
  /** les tranches empilées — une image */
  tranches: boolean;
  /** le cube unité, posé à côté du solide */
  cube: boolean;
}

export interface SceneRevolution {
  mettreAJour(etat: EtatRevolution, montre: MontreRevolution): void;
  orienter(azimut: number, elevation: number): void;
  redimensionner(largeur: number, hauteur: number): void;
  relireCouleurs(): void;
  rendre(): void;
  etiquettes(): { x: Projection; y: Projection; rayon: Projection; cube: Projection; centre: Projection; bord: Projection };
  detruire(): void;
}

const NX = 72; // pas le long de l'axe
const NT = 96; // pas pour un tour complet
const rad = (d: number) => (d * Math.PI) / 180;
const pt = (x: number, r: number, t: number) => new Vector3(x, r * Math.cos(t), r * Math.sin(t));

function geometrie(pos: number[], idx: number[], normales = true) {
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
  g.setIndex(idx);
  if (normales) g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

/** La nappe balayée entre x0 et x1, de θ = 0 à θ = α. */
function nappe(F: Fonction, x0: number, x1: number, alpha: number) {
  const nt = Math.max(1, Math.ceil((NT * alpha) / (2 * Math.PI)));
  const pos: number[] = [];
  for (let i = 0; i <= NX; i++) {
    const x = x0 + ((x1 - x0) * i) / NX;
    const r = F.f(x);
    for (let j = 0; j <= nt; j++) pos.push(...pt(x, r, (alpha * j) / nt).toArray());
  }
  const idx: number[] = [];
  const w = nt + 1;
  for (let i = 0; i < NX; i++)
    for (let j = 0; j < nt; j++) {
      const p = i * w + j;
      idx.push(p, p + w, p + 1, p + 1, p + w, p + w + 1);
    }
  return geometrie(pos, idx);
}

/** La région plane sous la courbe, tournée de θ. */
function region(F: Fonction, t: number) {
  const pos: number[] = [];
  for (let i = 0; i <= NX; i++) {
    const x = F.a + ((F.b - F.a) * i) / NX;
    pos.push(...pt(x, 0, t).toArray(), ...pt(x, F.f(x), t).toArray());
  }
  const idx: number[] = [];
  for (let i = 0; i < NX; i++) {
    const p = 2 * i;
    idx.push(p, p + 2, p + 1, p + 1, p + 2, p + 3);
  }
  return geometrie(pos, idx, false);
}

/** Un secteur de disque dans le plan d'abscisse x, de θ = 0 à θ = α. */
function secteur(x: number, r: number, alpha: number) {
  const nt = Math.max(1, Math.ceil((NT * alpha) / (2 * Math.PI)));
  const pos: number[] = [x, 0, 0];
  for (let j = 0; j <= nt; j++) pos.push(...pt(x, r, (alpha * j) / nt).toArray());
  const idx: number[] = [];
  for (let j = 1; j <= nt; j++) idx.push(0, j, j + 1);
  return geometrie(pos, idx, false);
}

/** La courbe tournée de θ, en polyligne. */
function courbe(F: Fonction, t: number, x1 = F.b) {
  const out: number[] = [];
  for (let i = 0; i <= NX; i++) {
    const x = F.a + ((x1 - F.a) * i) / NX;
    out.push(...pt(x, F.f(x), t).toArray());
  }
  return out;
}

/** Un arc de parallèle : le cercle de rayon r à l'abscisse x, de 0 à α. */
function arc(x: number, r: number, alpha: number) {
  const nt = Math.max(2, Math.ceil((NT * alpha) / (2 * Math.PI)));
  const out: number[] = [];
  for (let j = 0; j <= nt; j++) out.push(...pt(x, r, (alpha * j) / nt).toArray());
  return out;
}

export function creerSceneRevolution(canvas: HTMLCanvasElement, hote: HTMLElement): SceneRevolution {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(24, 1, 0.1, 400);
  scene.add(camera);
  // Même calibration que la sphère (mesurée sur le rendu) : une coque
  // translucide qui se lit comme un volume, sans reflet.
  scene.add(new AmbientLight(0xffffff, 1.85));
  const douce = new DirectionalLight(0xffffff, 1.35);
  douce.position.set(-0.6, 0.8, 1);
  camera.add(douce);

  // ── Les axes ──
  const axeX = trait([0, 0, 0, 1, 0, 0], 1.5);
  const pointeX = new Mesh(new ConeGeometry(0.07, 0.22, 16), new MeshBasicMaterial());
  pointeX.rotation.z = -Math.PI / 2;
  const axeY = trait([0, 0, 0, 0, 1, 0], 1, { opacite: 0.45 });
  scene.add(axeX, pointeX, axeY);

  // ── Le solide : la nappe, son couvercle, les régions, les repères ──
  const matSolide = new MeshLambertMaterial({ transparent: true, opacity: 0.3, side: DoubleSide, depthWrite: false });
  const solide = new Mesh(new BufferGeometry(), matSolide);
  const couvercle = new Mesh(new BufferGeometry(), matSolide);
  const matRegion = new MeshBasicMaterial({ transparent: true, opacity: 0.6, side: DoubleSide, depthWrite: false });
  const regionFixe = new Mesh(new BufferGeometry(), matRegion);
  const regionMobile = new Mesh(new BufferGeometry(), matRegion);
  scene.add(solide, couvercle, regionFixe, regionMobile);

  const courbeFixe = trait([0, 0, 0, 1, 0, 0], 2.2);
  const courbeMobile = trait([0, 0, 0, 1, 0, 0], 2.2);
  scene.add(courbeFixe, courbeMobile);
  const meridiennes: Line2[] = [];
  for (let k = 1; k < 12; k++) {
    const l = trait([0, 0, 0, 1, 0, 0], 1, { opacite: 0.5 });
    meridiennes.push(l);
    scene.add(l);
  }
  const paralleles: Line2[] = [];
  for (let k = 0; k < 4; k++) {
    const l = trait([0, 0, 0, 1, 0, 0], 1, { opacite: 0.5 });
    paralleles.push(l);
    scene.add(l);
  }

  // ── La coupe : le disque plein, son bord, son rayon — l'accent ──
  const matDisque = new MeshBasicMaterial({ side: DoubleSide });
  const disque = new Mesh(new BufferGeometry(), matDisque);
  scene.add(disque);
  const bordDisque = trait([0, 0, 0, 1, 0, 0], 2.5);
  const rayonDisque = trait([0, 0, 0, 1, 0, 0], 2.5);
  scene.add(bordDisque, rayonDisque);
  const planCoupe = trait([0, 0, 0, 1, 0, 0], 1.2, { pointille: true });
  scene.add(planCoupe);

  // ── Les tranches empilées (une image) ──
  const matTranches = new MeshLambertMaterial({ transparent: true, opacity: 0.88, depthWrite: true });
  const tranches = new Group();
  scene.add(tranches);

  // ── Le cube unité ──
  const matCube = new MeshBasicMaterial({ transparent: true, opacity: 0.55, side: DoubleSide, depthWrite: false });
  const cube = new Mesh(new BoxGeometry(1, 1, 1), matCube);
  const aretes: Line2[] = [];
  for (let k = 0; k < 6; k++) {
    const l = trait([0, 0, 0, 1, 0, 0], 1.5);
    aretes.push(l);
    scene.add(l);
  }
  scene.add(cube);

  // ORDRE DE DESSIN (§11.189) : les surfaces translucides d'abord, les traits
  // en couleur pure ensuite — sans quoi la coque les délave.
  const traits = [axeX, axeY, courbeFixe, courbeMobile, ...meridiennes, ...paralleles, bordDisque, rayonDisque, planCoupe, ...aretes];
  for (const l of traits) {
    l.material.transparent = true;
    l.renderOrder = 10;
  }
  pointeX.renderOrder = 11;

  function appliquerCouleurs() {
    const { surface, encre, encreDouce, accent } = lireJetons(hote);
    renderer.setClearColor(couleur(surface), 1);
    axeX.material.color.copy(couleur(encreDouce));
    (pointeX.material as MeshBasicMaterial).color = couleur(encreDouce);
    axeY.material.color.copy(couleur(encreDouce));
    matSolide.color = couleur(melange(surface, encreDouce, 0.35));
    matRegion.color = couleur(melange(surface, encreDouce, 0.22));
    courbeFixe.material.color.copy(couleur(encre));
    courbeMobile.material.color.copy(couleur(encre));
    for (const l of [...meridiennes, ...paralleles, planCoupe]) l.material.color.copy(couleur(encreDouce));
    matDisque.color = couleur(melange(surface, accent, 0.4));
    bordDisque.material.color.copy(couleur(accent));
    rayonDisque.material.color.copy(couleur(accent));
    matTranches.color = couleur(melange(surface, accent, 0.45));
    matCube.color = couleur(melange(surface, encreDouce, 0.18));
    for (const l of aretes) l.material.color.copy(couleur(encre));
  }
  appliquerCouleurs();

  let azimut = -58;
  let elevation = 20;
  let largeurCss = 480;
  let hauteurCss = 480;
  let dernier: { etat: EtatRevolution; montre: MontreRevolution } | null = null;

  // ── Le cadrage : TOUT ce que la fonction courante peut montrer, fixé au
  //    changement de fonction — jamais pendant le balayage (spec §9.4). ──
  let cleCadre = "";
  let points: Vector3[] = [];
  let cible = new Vector3();
  let posCube = new Vector3();
  let rMax = 1;

  function cadrer(F: Fonction) {
    if (cleCadre === F.id) return false;
    cleCadre = F.id;
    rMax = rayonMax(F);
    const x0 = Math.min(0, F.a) - 0.35;
    const x1 = F.b + 1.05;
    // Le cube unité : au-dessus du bout étroit du solide, sans le toucher, et
    // à droite de (Oy) — posé contre l'axe, il le chevauchait (vu à l'écran).
    let haut = 0;
    for (let i = 0; i <= 20; i++) haut = Math.max(haut, F.f(F.a + 0.7 + i * 0.05));
    posCube = new Vector3(F.a + 1.2, Math.max(haut + 0.6, 0.6), 0);
    // Cadrer le SOLIDE, pas sa boîte : les coins d'une boîte débordent d'un
    // corps rond, et laissaient un quart du canvas vide sous lui (vu à l'écran).
    const pts: Vector3[] = [];
    for (let i = 0; i <= 12; i++) {
      const x = F.a + ((F.b - F.a) * i) / 12;
      const rr = F.f(x);
      for (let k = 0; k < 12; k++) pts.push(new Vector3(x, rr * Math.cos((k * Math.PI) / 6), rr * Math.sin((k * Math.PI) / 6)));
    }
    pts.push(new Vector3(x0, 0, 0), new Vector3(x1, 0, 0), new Vector3(0, rMax + 0.75, 0), new Vector3(0, -(rMax + 0.25), 0));
    // Le plan de coupe (l'énoncé de l'étape de la coupe) : ses coins aussi.
    const s = rMax + 0.25, xm = (F.a + F.b) / 2;
    for (const y of [-s, s]) for (const z of [-s, s]) pts.push(new Vector3(xm, y, z));
    for (const dx of [-0.5, 0.5]) for (const dy of [-0.5, 0.75]) for (const dz of [-0.5, 0.5]) pts.push(posCube.clone().add(new Vector3(dx, dy, dz)));
    points = pts;
    // La cible : le centre de la boîte de ce qui est montré. (Sur l'axe, elle
    // laissait vide sous le solide la place que (Oy) et son étiquette prennent
    // au-dessus — vu au téléphone.)
    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    pts.forEach((q) => {
      min.min(q);
      max.max(q);
    });
    cible = min.add(max).multiplyScalar(0.5);
    return true;
  }

  function placerCamera() {
    const a = rad(azimut);
    const e = rad(elevation);
    const dir = new Vector3(Math.cos(e) * Math.cos(a), Math.sin(e), -Math.cos(e) * Math.sin(a));
    const coins = points.length ? points : [new Vector3(-1, -1, -1), new Vector3(4, 2, 2)];
    camera.updateProjectionMatrix();
    const tient = (d: number) => {
      camera.position.copy(dir).multiplyScalar(d).add(cible);
      camera.lookAt(cible);
      camera.updateMatrixWorld();
      return coins.every((c) => {
        const p = c.clone().project(camera);
        // 0,82 en hauteur : la légende du coin haut-gauche garde sa place (au
        // téléphone, l'étiquette de (Oy) venait se poser dessus).
        return Math.abs(p.x) <= 0.92 && Math.abs(p.y) <= 0.82 && p.z < 1;
      });
    };
    let lo = 1;
    let hi = 400;
    for (let i = 0; i < 26; i++) {
      const d = (lo + hi) / 2;
      if (tient(d)) hi = d;
      else lo = d;
    }
    tient(hi);
  }

  let cleTranches = "";
  function poserTranches(F: Fonction, n: number, visible: boolean) {
    tranches.visible = visible;
    const cle = `${F.id}/${n}`;
    if (!visible || cle === cleTranches) return;
    cleTranches = cle;
    for (const c of [...tranches.children]) {
      tranches.remove(c);
      (c as Mesh).geometry.dispose();
    }
    const h = (F.b - F.a) / n;
    for (let i = 0; i < n; i++) {
      // Le rayon pris au MILIEU de la tranche : l'image la plus juste à l'œil.
      const r = F.f(F.a + (i + 0.5) * h);
      if (r < 1e-6) continue;
      const g = new CylinderGeometry(r, r, h * 0.94, 64, 1, false);
      const m = new Mesh(g, matTranches);
      m.rotation.z = -Math.PI / 2;
      m.position.set(F.a + (i + 0.5) * h, 0, 0);
      tranches.add(m);
    }
  }

  function remplacer(m: Mesh, g: BufferGeometry) {
    m.geometry.dispose();
    m.geometry = g;
  }

  let posRayon = new Vector3();
  let posCentre = new Vector3();
  let posBord = new Vector3();
  let rayonVisible = false;

  // Les géométries ne se refont que si ce qu'elles dessinent a changé : pendant
  // qu'on fait tourner la VUE, rien d'autre ne bouge (et un téléphone le sent).
  let cleGeometrie = "";

  // VUE LE LONG DE L'AXE : le fil de fer se tait (revue WAVE 2). Vus de face,
  // les parallèles deviennent des ANNEAUX concentriques, les méridiennes des
  // rayons, la courbe un rayon noir, le plan de coupe un carré qui ne dit plus
  // où l'on coupe : une roue — l'image même de « la coupe est un cercle », que
  // le pari de la coupe doit casser. Dans cette vue, seule la silhouette
  // reste ; la réponse arrive en accent après le pari.
  const FIL_DE_FER: { visible: boolean }[] = [...meridiennes, ...paralleles, courbeFixe, courbeMobile, planCoupe];
  const voulu = new Map<{ visible: boolean }, boolean>();
  function memoriserVisibilite() {
    for (const o of FIL_DE_FER) voulu.set(o, o.visible);
  }
  function leLongDeLAxe() {
    const a = rad(azimut);
    const e = rad(elevation);
    return Math.abs(Math.cos(e) * Math.cos(a)) > Math.cos(rad(12));
  }
  function appliquerVue() {
    const axial = leLongDeLAxe();
    for (const o of FIL_DE_FER) o.visible = (voulu.get(o) ?? o.visible) && !axial;
  }

  function mettreAJour(e: EtatRevolution, montre: MontreRevolution) {
    dernier = { etat: e, montre };
    const F = FONCTIONS[e.fonction];
    if (cadrer(F)) placerCamera();
    const cle = JSON.stringify([e.fonction, e.alpha, e.x, e.n, montre]);
    if (cle === cleGeometrie) return;
    cleGeometrie = cle;
    const alpha = rad(Math.max(0, Math.min(360, e.alpha)));
    const plein = e.alpha >= 360;

    // Les axes.
    const x0 = Math.min(0, F.a) - 0.35;
    remplacerPositions(axeX, [x0, 0, 0, F.b + 0.72, 0, 0]);
    pointeX.position.set(F.b + 0.8, 0, 0);
    remplacerPositions(axeY, [0, -(rMax + 0.25), 0, 0, rMax + 0.45, 0]);

    // Le solide — coupé à l'abscisse x si la coupe est montrée.
    const xFin = montre.coupe ? Math.max(F.a, Math.min(F.b, e.x)) : F.b;
    const avecSolide = alpha > 1e-6 && !montre.tranches;
    solide.visible = avecSolide && xFin > F.a + 1e-6;
    if (solide.visible) remplacer(solide, nappe(F, F.a, xFin, alpha));
    couvercle.visible = avecSolide && !montre.coupe && F.f(F.b) > 1e-6;
    if (couvercle.visible) remplacer(couvercle, secteur(F.b, F.f(F.b), alpha));

    // La région : l'énoncé. Elle tourne ; au tour complet elle est rentrée
    // dans le solide et ne se montre plus.
    regionFixe.visible = !plein && !montre.tranches;
    if (regionFixe.visible) remplacer(regionFixe, region(F, 0));
    regionMobile.visible = !plein && alpha > 1e-6 && !montre.tranches;
    if (regionMobile.visible) remplacer(regionMobile, region(F, alpha));
    remplacerPositions(courbeFixe, courbe(F, 0, xFin));
    courbeFixe.visible = true;
    courbeMobile.visible = alpha > 1e-6 && !plein;
    if (courbeMobile.visible) remplacerPositions(courbeMobile, courbe(F, alpha, xFin));

    // Les méridiennes, tous les 30°, jusqu'où le balayage est allé : pendant
    // le balayage elles MESURENT l'angle tourné. Au tour complet elles ne
    // mesurent plus rien — trois suffisent à dire la rondeur (90°, 180°,
    // 270°). Et sur les tranches empilées, aucune : dessinées par-dessus les
    // cylindres, elles se lisaient comme un défaut de rendu (revue WAVE 2).
    meridiennes.forEach((l, k) => {
      const deg = 30 * (k + 1);
      const t = rad(deg);
      l.visible = !montre.tranches && t <= alpha + 1e-9 && (!plein || deg % 90 === 0);
      if (l.visible) remplacerPositions(l, courbe(F, t, xFin));
    });
    // Quelques parallèles — dont le bord du couvercle ; au tour complet, ce
    // bord seul.
    paralleles.forEach((l, k) => {
      const x = F.a + ((F.b - F.a) * (k + 1)) / 4;
      const r = F.f(x);
      l.visible = !montre.tranches && alpha > 1e-6 && r > 1e-6 && x <= xFin + 1e-9 && (!plein || k === paralleles.length - 1);
      if (l.visible) remplacerPositions(l, arc(x, r, alpha));
    });

    // La coupe : le disque PLEIN, son bord, son rayon.
    const rc = F.f(xFin);
    disque.visible = bordDisque.visible = montre.coupe && rc > 1e-6;
    rayonVisible = rayonDisque.visible = montre.coupe && rc > 1e-6;
    posCentre = new Vector3(xFin, 0, 0);
    posBord = new Vector3(xFin, rc, 0);
    if (disque.visible) {
      remplacer(disque, secteur(xFin, rc, 2 * Math.PI));
      remplacerPositions(bordDisque, arc(xFin, rc, 2 * Math.PI));
      remplacerPositions(rayonDisque, [xFin, 0, 0, xFin, rc, 0]);
      posRayon = new Vector3(xFin, rc / 2, 0);
    }
    // Avant le pari : seulement le plan où l'on coupera.
    planCoupe.visible = montre.planDeCoupe;
    if (planCoupe.visible) {
      const xp = Math.max(F.a, Math.min(F.b, e.x));
      const s = rMax + 0.25;
      remplacerPositions(planCoupe, [xp, -s, -s, xp, s, -s, xp, s, s, xp, -s, s, xp, -s, -s]);
      planCoupe.material.dashSize = 0.12;
      planCoupe.material.gapSize = 0.09;
      posCentre = new Vector3(xp, 0, 0);
    }

    // Les tranches, une image.
    poserTranches(F, Math.max(1, Math.round(e.n)), montre.tranches);
    memoriserVisibilite();
    appliquerVue();

    // Le cube unité.
    cube.visible = montre.cube;
    aretes.forEach((l) => (l.visible = montre.cube));
    if (montre.cube) {
      cube.position.copy(posCube);
      const c = posCube;
      const s = 0.5;
      const P = (dx: number, dy: number, dz: number) => [c.x + dx * s, c.y + dy * s, c.z + dz * s];
      const bas = [P(-1, -1, -1), P(1, -1, -1), P(1, -1, 1), P(-1, -1, 1), P(-1, -1, -1)].flat();
      const haut = [P(-1, 1, -1), P(1, 1, -1), P(1, 1, 1), P(-1, 1, 1), P(-1, 1, -1)].flat();
      remplacerPositions(aretes[0], bas);
      remplacerPositions(aretes[1], haut);
      remplacerPositions(aretes[2], [...P(-1, -1, -1), ...P(-1, 1, -1)]);
      remplacerPositions(aretes[3], [...P(1, -1, -1), ...P(1, 1, -1)]);
      remplacerPositions(aretes[4], [...P(1, -1, 1), ...P(1, 1, 1)]);
      remplacerPositions(aretes[5], [...P(-1, -1, 1), ...P(-1, 1, 1)]);
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

  return {
    mettreAJour,
    orienter(a, e) {
      azimut = a;
      elevation = Math.max(-80, Math.min(88, e));
      placerCamera();
      appliquerVue();
    },
    redimensionner,
    relireCouleurs() {
      appliquerCouleurs();
    },
    rendre() {
      renderer.render(scene, camera);
    },
    etiquettes() {
      const F = dernier ? FONCTIONS[dernier.etat.fonction] : FONCTIONS.racine;
      return {
        x: projeter(new Vector3(F.b + 1.0, 0, 0), true),
        y: projeter(new Vector3(0, rMax + 0.65, 0), true),
        // « f(x) » : au milieu du rayon — le panneau la pose À GAUCHE du point,
        // pour qu'elle ne chevauche pas le trait (vu au téléphone).
        rayon: projeter(posRayon, rayonVisible),
        cube: projeter(posCube.clone().add(new Vector3(0, 0.78, 0)), !!dernier?.montre.cube),
        // Deux repères SANS texte pour la porte : le centre de la coupe et
        // le haut de son bord — l'élève ne voit rien.
        centre: projeter(posCentre, true),
        bord: projeter(posBord, rayonVisible),
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
