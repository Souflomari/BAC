/* eslint-disable */
// @ts-nocheck
/**
 * Scène nouvelle `dosage` (1000 × 720) : montage, bécher en jetons, pH-mètre et courbe pH = f(V_B)
 * couplés par le seul paramètre continu V (mL). État pur `etatDosage(V)` (règle M3) ; aucune couleur en dur
 * (classes de jetons seulement, teinte de l'indicateur écrite en toutes lettres) ; textes ≥ 22 unités (M5).
 */
import {
  CA_L, VA_L, CB_L, VE_L, VMAX_L, N_JETONS, JETON_MOL, PH_E,
  IND, phL, ph20, etatDosage, S20, S22, S24, S25, fr, sciF,
} from "./dosage-outils";

export function scenesA(ctx, O) {
  const { E, clamp, show, scene } = ctx;
  const { setFx, titre, lab, axes } = O;

  // pré-calcul des courbes pour ne pas recalculer à chaque frame
  const ptsLecon = [];
  for (let i = 0; i <= 200; i++) {
    const v = (VMAX_L * i) / 200;
    ptsLecon.push([v, phL(v)]);
  }
  const ptsZoom = [];
  for (let i = 0; i <= 80; i++) {
    const v = 11.9 + (0.2 * i) / 80;
    ptsZoom.push([v, phL(v)]);
  }
  const ptsBase = [];
  for (let i = 0; i <= 160; i++) {
    const v = (24 * i) / 160;
    ptsBase.push([v, ph20(v)]);
  }

  function polyPath(pts, X, Y, vMax) {
    let d = "";
    for (let i = 0; i < pts.length; i++) {
      const [v, y] = pts[i];
      if (v > vMax + 1e-6) break;
      d += (d ? " L " : "M ") + X(v).toFixed(1) + " " + Y(y).toFixed(1);
    }
    if (vMax >= 0 && pts.length) {
      const last = pts[pts.length - 1][0];
      if (vMax < last) {
        const y = vMax <= 20 ? phL(vMax) : phL(20);
        d += (d ? " L " : "M ") + X(vMax).toFixed(1) + " " + Y(y).toFixed(1);
      }
    }
    return d;
  }

  scene("dosage", {
    p: {
      jeu: "enigme", V: 11.95, ind: 1, jet: 0, phm: 0, cv: 0, lab: 0,
      zoom: 0, pe: 0, p7: 0, ghost: 0, ch: "", cas: "s25", rv: 0, hl: 0, eqc: 0, reac: 1, sub: "",
    },
    build(g) {
      this.ti = titre(g, "", "");

      /* ===== 1. JEU ENIGME ===== */
      this.gEn = E("g", {}, g);
      // burette principale (x=250)
      E("rect", { x: 234, y: 120, width: 32, height: 170, rx: 3, class: "nofill k-ink", "stroke-width": 2.5 }, this.gEn);
      this.enBurLiq = E("rect", { x: 236, y: 140, width: 28, height: 148, class: "f-b" }, this.gEn);
      for (let k = 0; k <= 4; k++) E("line", { x1: 234, x2: 244, y1: 135 + k * 34, y2: 135 + k * 34, class: "k-dim", "stroke-width": 2 }, this.gEn);
      E("polygon", { points: "242,290 258,290 252,322 248,322", class: "nofill k-ink", "stroke-width": 2 }, this.gEn);
      E("line", { x1: 226, x2: 274, y1: 304, y2: 304, class: "k-ink", "stroke-width": 3 }, this.gEn);
      this.enDrop = E("circle", { cx: 250, cy: 344, r: 5, class: "s-a" }, this.gEn);
      // bécher principal (x=150..350, y=370..540)
      this.enBeqLiq = E("rect", { x: 154, y: 425, width: 192, height: 111, class: "ds-liq" }, this.gEn);
      E("path", { d: "M 150 370 L 150 538 L 350 538 L 350 370", class: "nofill k-ink", "stroke-width": 3 }, this.gEn);
      this.enTeinte = lab(this.gEn, 250, 488, "incolore", "ds-g s-ink", "middle", 28);
      this.enVol = lab(this.gEn, 250, 585, "", "ds-l s-ink", "middle", 26);
      lab(this.gEn, 250, 620, `soude *C*_{B} = ${fr(CB_L, 2)} mol·L^{−1}`, "ds-s s-c", "middle", 22);

      // panneau droit énigme : soit pH-mètre (retour-goutte), soit 2e burette (combien)
      this.enPhBox = E("g", {}, this.gEn);
      E("rect", { x: 520, y: 210, width: 380, height: 220, rx: 8, class: "f-b k-ink", "stroke-width": 2.5 }, this.enPhBox);
      lab(this.enPhBox, 710, 256, "pH-mètre", "ds-s s-c", "middle", 22);
      this.enPhVal = lab(this.enPhBox, 710, 326, "", "ds-g s-a", "middle", 44);
      lab(this.enPhBox, 710, 390, `phénolphtaléine : ${fr(IND.phenolphtaleine.min, 1)} – ${fr(IND.phenolphtaleine.max, 0)}`, "ds-s s-ink", "middle", 22);

      this.enGhost = E("g", {}, this.gEn);
      E("rect", { x: 684, y: 120, width: 32, height: 170, rx: 3, class: "nofill k-dim", "stroke-width": 2.5, "stroke-dasharray": "6 4" }, this.enGhost);
      this.enGhLiq = E("rect", { x: 686, y: 160, width: 28, height: 128, class: "f-c" }, this.enGhost);
      E("polygon", { points: "692,290 708,290 702,322 698,322", class: "nofill k-dim", "stroke-width": 2 }, this.enGhost);
      this.enGhBeq = E("rect", { x: 604, y: 425, width: 192, height: 111, class: "ds-liq" }, this.enGhost);
      E("path", { d: "M 600 370 L 600 538 L 800 538 L 800 370", class: "nofill k-dim", "stroke-width": 3 }, this.enGhost);
      this.enGhTeinte = lab(this.enGhost, 700, 488, "2 × concentré", "ds-s s-c", "middle", 22);
      this.enGhVol = lab(this.enGhost, 700, 585, "*V*_{B} = ?", "ds-g s-a", "middle", 28);

      /* ===== 2. JEU MONTAGE ===== */
      this.gMo = E("g", {}, g);
      // support + burette (x=360)
      E("line", { x1: 210, x2: 210, y1: 118, y2: 606, class: "k-dim", "stroke-width": 4 }, this.gMo);
      E("line", { x1: 170, x2: 255, y1: 606, y2: 606, class: "k-dim", "stroke-width": 4 }, this.gMo);
      E("line", { x1: 210, x2: 344, y1: 205, y2: 205, class: "k-dim", "stroke-width": 3 }, this.gMo);
      E("rect", { x: 344, y: 125, width: 32, height: 175, rx: 3, class: "nofill k-ink", "stroke-width": 2.5 }, this.gMo);
      E("rect", { x: 346, y: 165, width: 28, height: 133, class: "f-b" }, this.gMo);
      for (let k = 0; k <= 4; k++) E("line", { x1: 344, x2: 354, y1: 145 + k * 34, y2: 145 + k * 34, class: "k-dim", "stroke-width": 2 }, this.gMo);
      E("polygon", { points: "352,300 368,300 362,332 358,332", class: "nofill k-ink", "stroke-width": 2 }, this.gMo);
      E("line", { x1: 336, x2: 384, y1: 314, y2: 314, class: "k-ink", "stroke-width": 3 }, this.gMo);
      // bécher (x=275..445, y=380..540) + barreau aimanté
      E("rect", { x: 279, y: 440, width: 162, height: 96, class: "ds-liq" }, this.gMo);
      E("path", { d: "M 275 380 L 275 538 L 445 538 L 445 380", class: "nofill k-ink", "stroke-width": 3 }, this.gMo);
      E("rect", { x: 340, y: 522, width: 40, height: 10, rx: 5, class: "s-ink" }, this.gMo);
      // agitateur magnétique
      E("rect", { x: 250, y: 542, width: 220, height: 64, rx: 6, class: "f-b k-ink", "stroke-width": 2.5 }, this.gMo);
      E("circle", { cx: 430, cy: 574, r: 12, class: "nofill k-ink", "stroke-width": 2 }, this.gMo);
      // sonde + câble + pH-mètre
      E("rect", { x: 406, y: 348, width: 12, height: 146, rx: 4, class: "s-ink" }, this.gMo);
      E("path", { d: "M 412 348 C 412 280, 620 280, 620 385", class: "nofill k-dim", "stroke-width": 2.5 }, this.gMo);
      E("rect", { x: 545, y: 385, width: 190, height: 110, rx: 6, class: "f-b k-ink", "stroke-width": 2.5 }, this.gMo);
      lab(this.gMo, 640, 452, "pH", "ds-g s-ink", "middle", 32);
      // 5 légendes (révélées par lab 1..5)
      const moLabs = [
        { x1: 382, y1: 185, x2: 500, y2: 185, tx: 512, ty: 192, t: "burette graduée (titrant)", a: "start" },
        { x1: 270, y1: 470, x2: 205, y2: 470, tx: 196, ty: 462, t: "bécher", t2: "(prise d’essai)", a: "end" },
        { x1: 476, y1: 574, x2: 545, y2: 574, tx: 556, ty: 582, t: "agitateur magnétique", a: "start" },
        { x1: 424, y1: 360, x2: 545, y2: 332, tx: 556, ty: 340, t: "sonde du pH-mètre", a: "start" },
        { x1: 742, y1: 440, x2: 785, y2: 440, tx: 794, ty: 448, t: "pH-mètre", a: "start" },
      ];
      this.moL = moLabs.map((m) => {
        const gg = E("g", {}, this.gMo);
        E("line", { x1: m.x1, y1: m.y1, x2: m.x2, y2: m.y2, class: "k-a", "stroke-width": 2 }, gg);
        lab(gg, m.tx, m.ty, m.t, "ds-s s-ink", m.a, 22);
        if (m.t2) lab(gg, m.tx, m.ty + 28, m.t2, "ds-s s-c", m.a, 22);
        return gg;
      });

      /* ===== 3. JEU JETONS ===== */
      this.gJe = E("g", {}, g);
      // burette compacte au-dessus du bécher
      E("rect", { x: 236, y: 112, width: 28, height: 120, rx: 3, class: "nofill k-ink", "stroke-width": 2.5 }, this.gJe);
      this.jeBurLiq = E("rect", { x: 238, y: 132, width: 24, height: 98, class: "f-b" }, this.gJe);
      E("polygon", { points: "244,232 256,232 252,258 248,258", class: "nofill k-ink", "stroke-width": 2 }, this.gJe);
      // grand bécher (x=70..430, y=282..588)
      E("rect", { x: 74, y: 318, width: 352, height: 266, class: "ds-liq" }, this.gJe);
      E("path", { d: "M 70 282 L 70 588 L 430 588 L 430 282", class: "nofill k-ink", "stroke-width": 3 }, this.gJe);
      // 12 jetons AH / A⁻ (grille 4 × 3)
      this.jeTok = [];
      for (let i = 0; i < N_JETONS; i++) {
        const col = i % 4, row = Math.floor(i / 4);
        const cx = 132 + col * 78, cy = 408 + row * 68;
        this.jeTok.push(E("circle", { cx, cy, r: 22, class: "ds-ah" }, this.gJe));
      }
      // 8 emplacements HO⁻ libres (au-dessus, rangée y=346)
      this.jeHo = [];
      for (let i = 0; i < 8; i++) {
        const cx = 104 + i * 42, cy = 346;
        this.jeHo.push(E("circle", { cx, cy, r: 15, class: "ds-ho" }, this.gJe));
      }
      // panneau compteur à droite (x=485..945, y=170..586)
      E("rect", { x: 485, y: 170, width: 460, height: 416, rx: 8, class: "f-b k-dim", "stroke-width": 2 }, this.gJe);
      this.jeVol = lab(this.gJe, 515, 224, "", "ds-g s-ink", "start", 28);
      this.jeC1 = lab(this.gJe, 515, 290, "", "ds-l s-ink", "start", 26);
      this.jeC2 = lab(this.gJe, 515, 348, "", "ds-l s-ink", "start", 26);
      this.jeC3 = lab(this.gJe, 515, 406, "", "ds-l s-a", "start", 26);
      this.jeEqBox = E("g", {}, this.gJe);
      E("rect", { x: 510, y: 454, width: 410, height: 96, rx: 6, class: "nofill k-a", "stroke-width": 2.5 }, this.jeEqBox);
      lab(this.jeEqBox, 715, 494, `${fr(N_JETONS, 0)} jetons HO^{−} versés`, "ds-l s-a", "middle", 24);
      lab(this.jeEqBox, 715, 530, `= ${fr(N_JETONS, 0)} jetons d’acide au départ`, "ds-l s-ink", "middle", 24);
      // légende en bas sur deux lignes pour éviter tout chevauchement à 390 px
      E("circle", { cx: 140, cy: 638, r: 12, class: "ds-ah" }, this.gJe);
      lab(this.gJe, 164, 646, "CH_{3}COOH", "ds-s s-ink", "start", 22);
      E("circle", { cx: 400, cy: 638, r: 12, class: "ds-am" }, this.gJe);
      lab(this.gJe, 424, 646, "CH_{3}COO^{−}", "ds-s s-ink", "start", 22);
      E("circle", { cx: 680, cy: 638, r: 12, class: "ds-ho" }, this.gJe);
      lab(this.gJe, 704, 646, "HO^{−} libre", "ds-s s-a", "start", 22);
      lab(this.gJe, 500, 690, `1 jeton = ${sciF(JETON_MOL, 1)} mol`, "ds-s s-c", "middle", 22);

      /* ===== 4. JEU COURBE (couplée : bécher + pH-mètre + pH = f(V_B)) ===== */
      this.gCv = E("g", {}, g);
      // mini bécher en haut à gauche (x=70..320, y=106..298)
      this.cvMini = E("g", {}, this.gCv);
      E("rect", { x: 74, y: 140, width: 242, height: 154, class: "ds-liq" }, this.cvMini);
      E("path", { d: "M 70 118 L 70 296 L 320 296 L 320 118", class: "nofill k-ink", "stroke-width": 2.5 }, this.cvMini);
      this.cvTok = [];
      for (let i = 0; i < N_JETONS; i++) {
        const col = i % 4, row = Math.floor(i / 4);
        this.cvTok.push(E("circle", { cx: 112 + col * 54, cy: 196 + row * 38, r: 13, class: "ds-ah" }, this.cvMini));
      }
      this.cvHo = [];
      for (let i = 0; i < 8; i++) {
        this.cvHo.push(E("circle", { cx: 95 + i * 28, cy: 158, r: 9, class: "ds-ho" }, this.cvMini));
      }
      // pH-mètre en haut au centre (x=370..650, y=126..276)
      E("rect", { x: 370, y: 126, width: 280, height: 150, rx: 8, class: "f-b k-ink", "stroke-width": 2.5 }, this.gCv);
      lab(this.gCv, 510, 166, "pH-mètre", "ds-s s-c", "middle", 22);
      this.cvPh = lab(this.gCv, 510, 238, "", "ds-g s-a", "middle", 40);
      // volume en haut à droite (x=690..940, y=126..276)
      E("rect", { x: 690, y: 126, width: 250, height: 150, rx: 8, class: "f-b k-dim", "stroke-width": 2 }, this.gCv);
      lab(this.gCv, 815, 166, "soude versée", "ds-s s-c", "middle", 22);
      this.cvVol = lab(this.gCv, 815, 236, "", "ds-g s-ink", "middle", 34);

      // repère en bas (x=120..920, y=346..636)
      this.cvAx = E("g", {}, this.gCv);
      this.cvP7 = E("g", {}, this.gCv);
      this.cvP7L = E("line", { x1: 120, x2: 920, y1: 0, y2: 0, class: "k-dim", "stroke-width": 2, "stroke-dasharray": "8 6" }, this.cvP7);
      this.cvP7T = lab(this.cvP7, 920, 0, "pH = 7", "ds-s s-c", "end", 22);
      this.cvHl = E("path", { d: "", class: "nofill k-a", "stroke-width": 7 }, this.gCv);
      this.cvPath = E("path", { d: "", class: "nofill k-ink", "stroke-width": 3.5 }, this.gCv);
      this.cvPt = E("circle", { cx: 120, cy: 500, r: 7, class: "s-a" }, this.gCv);
      this.cvPe = E("g", {}, this.gCv);
      this.cvPeV = E("line", { x1: 0, x2: 0, y1: 0, y2: 636, class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.cvPe);
      this.cvPeH = E("line", { x1: 120, x2: 0, y1: 0, y2: 0, class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.cvPe);
      this.cvPeC = E("circle", { cx: 0, cy: 0, r: 8, class: "s-a" }, this.cvPe);
      this.cvPeT = lab(this.cvPe, 0, 0, "", "ds-s s-a", "start", 22);
      this._lastZoom = -1;

      /* ===== 5. JEU BASE FAIBLE (sujet 2020 : NH3 par HCl) ===== */
      this.gBa = E("g", {}, g);
      this.baAx = E("g", {}, this.gBa);
      const bX = (v) => 130 + (v / 24) * 780;
      const bY = (y) => 610 - (y / 14) * 440;
      axes(this.baAx, bX, bY, 0, 24, 3, 14, 2, (v) => fr(v, 0), (v) => fr(v, 0), "*V*_{a} (mL)", "pH", 62);
      E("line", { x1: bX(0), x2: bX(24), y1: bY(7), y2: bY(7), class: "k-dim", "stroke-width": 2, "stroke-dasharray": "8 6" }, this.gBa);
      lab(this.gBa, bX(24), bY(7) - 10, "pH = 7", "ds-s s-c", "end", 22);
      this.baPt0 = E("circle", { cx: bX(0), cy: bY(ph20(0)), r: 7, class: "s-ink" }, this.gBa);
      this.baRev = E("g", {}, this.gBa);
      const dBa = ptsBase.map(([v, y], i) => `${i ? "L" : "M"} ${bX(v).toFixed(1)} ${bY(y).toFixed(1)}`).join(" ");
      E("path", { d: dBa, class: "nofill k-ink", "stroke-width": 3.5 }, this.baRev);
      E("line", { x1: bX(S20.VaE), x2: bX(S20.VaE), y1: bY(S20.pHE), y2: bY(0), class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.baRev);
      E("line", { x1: bX(0), x2: bX(S20.VaE), y1: bY(S20.pHE), y2: bY(S20.pHE), class: "k-a", "stroke-width": 2, "stroke-dasharray": "6 5" }, this.baRev);
      E("circle", { cx: bX(S20.VaE), cy: bY(S20.pHE), r: 8, class: "s-a" }, this.baRev);
      lab(this.baRev, bX(S20.VaE) + 16, bY(S20.pHE) - 10, `E (${fr(S20.VaE, 1)} mL ; ${fr(S20.pHE, 1)})`, "ds-l s-a", "start", 24);

      /* ===== 6. JEU CHAINE (flacon S0 → fiole → pipette → bécher) ===== */
      this.gCh = E("g", {}, g);
      const chX = [132, 377, 622, 868];
      const chIds = ["flacon", "fiole", "pipette", "becher"];
      this.chBoxes = chIds.map((id, i) => {
        const x = chX[i], gg = E("g", {}, this.gCh);
        const r = E("rect", { x: x - 102, y: 230, width: 204, height: 220, rx: 10, class: "f-b k-ink", "stroke-width": 2.5 }, gg);
        const t1 = lab(gg, x, 286, "", "ds-t s-ink", "middle", 24);
        const t2 = lab(gg, x, 344, "", "ds-s s-ink", "middle", 22);
        const t3 = lab(gg, x, 398, "", "ds-s s-c", "middle", 22);
        if (i < 3) E("path", { d: `M ${x + 106} 340 L ${x + 137} 340 M ${x + 127} 330 L ${x + 139} 340 L ${x + 127} 350`, class: "nofill k-dim", "stroke-width": 2.5 }, this.gCh);
        return { id, r, t1, t2, t3 };
      });
    },

    render() {
      const p = this.p;
      const st = etatDosage(p.V);
      show(this.gEn, p.jeu === "enigme" ? 1 : 0);
      show(this.gMo, p.jeu === "montage" ? 1 : 0);
      show(this.gJe, p.jeu === "jetons" ? 1 : 0);
      show(this.gCv, p.jeu === "courbe" ? 1 : 0);
      show(this.gBa, p.jeu === "base" ? 1 : 0);
      show(this.gCh, p.jeu === "chaine" ? 1 : 0);

      if (p.jeu === "enigme") {
        const hBur = clamp(150 * (1 - p.V / 25), 14, 150);
        this.enBurLiq.setAttribute("y", (288 - hBur).toFixed(1));
        this.enBurLiq.setAttribute("height", hBur.toFixed(1));
        const vire = p.ind && st.vir > 0.5;
        this.enBeqLiq.setAttribute("class", vire ? "ds-liq-vir" : "ds-liq");
        setFx(this.enTeinte, p.ind ? (vire ? "rose" : "incolore") : "solution acide");
        setFx(this.enVol, `*V*_{B} = ${fr(p.V, 2)} mL`);
        show(this.enDrop, p.V > 11.96 && p.V < 12.04 ? 1 : 0);
        show(this.enPhBox, p.phm ? 1 : 0);
        if (p.phm) setFx(this.enPhVal, `pH = ${fr(st.pH, 1)}`);
        show(this.enGhost, !p.phm && p.ghost >= 0 ? (p.ghost > 0 || p.rv >= 0 ? 1 : 0) : 0);
        if (p.ghost < 0) show(this.enGhost, 0);
        else if (!p.phm) {
          show(this.enGhost, 1);
          const gVire = p.ghost > 0.5;
          this.enGhBeq.setAttribute("class", gVire ? "ds-liq-vir" : "ds-liq");
          setFx(this.enGhTeinte, gVire ? "rose (2 × acide)" : "2 × concentré");
          setFx(this.enGhVol, gVire ? `*V*_{B} = ${fr(2 * VE_L, 1)} mL` : "*V*_{B} = ?");
        }
        this.ti.set("Le bécher et la burette", p.sub || `${fr(VA_L, 1)} mL d’acide éthanoïque · soude à ${fr(CB_L, 2)} mol·L^{−1}`);
      } else if (p.jeu === "montage") {
        this.moL.forEach((el, i) => show(el, clamp(p.lab - i, 0, 1)));
        this.ti.set("Le montage du dosage", p.sub || "dispositif expérimental d’un titrage pH-métrique");
      } else if (p.jeu === "jetons") {
        const hBur = clamp(98 * (1 - p.V / 20), 10, 98);
        this.jeBurLiq.setAttribute("y", (230 - hBur).toFixed(1));
        this.jeBurLiq.setAttribute("height", hBur.toFixed(1));
        const reac = p.reac > 0.5;
        const nPour = Math.floor(p.V + 1e-6);
        const nA = reac ? Math.floor(st.nA + 1e-6) : 0;
        const nHO = reac ? Math.floor(st.nHO + 1e-6) : 0;
        this.jeTok.forEach((c, i) => c.setAttribute("class", i < nA ? "ds-am" : "ds-ah"));
        this.jeHo.forEach((c, i) => show(c, i < nHO ? 1 : 0));
        setFx(this.jeVol, `*V*_{B} = ${fr(p.V, 1)} mL (${fr(nPour, 0)} jeton${nPour >= 2 ? "s" : ""} HO^{−})`);
        setFx(this.jeC1, reac ? `CH_{3}COOH restants : ${fr(Math.max(0, N_JETONS - nA), 0)}` : "CH_{3}COOH restants : ?");
        setFx(this.jeC2, reac ? `CH_{3}COO^{−} formés : ${fr(nA, 0)}` : "CH_{3}COO^{−} formés : ?");
        setFx(this.jeC3, reac ? `HO^{−} libres : ${fr(nHO, 0)}` : "HO^{−} libres : ?");
        show(this.jeEqBox, p.eqc);
        this.ti.set("Dans le bécher, jeton par jeton", p.sub || "chaque mL de soude apporte 1 jeton HO^{−}");
      } else if (p.jeu === "courbe") {
        show(this.cvMini, p.jet);
        if (p.jet) {
          const nA = Math.floor(st.nA + 1e-6), nHO = Math.floor(st.nHO + 1e-6);
          this.cvTok.forEach((c, i) => c.setAttribute("class", i < nA ? "ds-am" : "ds-ah"));
          this.cvHo.forEach((c, i) => show(c, i < nHO ? 1 : 0));
        }
        setFx(this.cvPh, p.phm ? `pH = ${fr(st.pH, p.zoom ? 1 : 2)}` : "pH = ?");
        setFx(this.cvVol, `${fr(p.V, p.zoom ? 2 : 1)} mL`);

        const z = p.zoom > 0.5 ? 1 : 0;
        const X = z ? (v) => 120 + ((v - 11.9) / 0.2) * 800 : (v) => 120 + (v / VMAX_L) * 800;
        const Y = z ? (y) => 636 - ((y - 5) / 7) * 290 : (y) => 636 - (y / 14) * 290;
        if (this._lastZoom !== z) {
          this._lastZoom = z;
          if (z) axes(this.cvAx, X, Y, 11.9, 12.1, 0.05, 12, 2, (v) => fr(v, 2), (v) => fr(v, 0), "*V*_{B} (mL)", "pH", 64, 5);
          else axes(this.cvAx, X, Y, 0, 20, 4, 14, 2, (v) => fr(v, 0), (v) => fr(v, 0), "*V*_{B} (mL)", "pH", 64, 0);
        }
        const y7 = Y(7);
        this.cvP7L.setAttribute("y1", y7.toFixed(1));
        this.cvP7L.setAttribute("y2", y7.toFixed(1));
        this.cvP7T.setAttribute("y", (y7 - 8).toFixed(1));
        show(this.cvP7, p.p7);

        const pts = z ? ptsZoom : ptsLecon;
        const vMax = p.cv > 0.01 ? (z ? p.V : Math.min(VMAX_L, p.V)) : -1;
        this.cvPath.setAttribute("d", vMax >= 0 ? polyPath(pts, X, Y, vMax) : "");
        show(this.cvPt, p.cv > 0.01 && p.phm ? 1 : 0);
        if (p.cv > 0.01) {
          this.cvPt.setAttribute("cx", X(clamp(p.V, z ? 11.9 : 0, z ? 12.1 : VMAX_L)).toFixed(1));
          this.cvPt.setAttribute("cy", Y(st.pH).toFixed(1));
        }
        // mise en valeur portion 4 → 8 mL
        if (p.hl && !z) {
          let dh = "";
          for (let v = 4; v <= 8 + 1e-6; v += 0.25) dh += (dh ? " L " : "M ") + X(v).toFixed(1) + " " + Y(phL(v)).toFixed(1);
          this.cvHl.setAttribute("d", dh);
          show(this.cvHl, 1);
        } else show(this.cvHl, 0);

        // point E
        show(this.cvPe, p.pe);
        if (p.pe) {
          const xe = X(VE_L), ye = Y(PH_E);
          this.cvPeV.setAttribute("x1", xe.toFixed(1)); this.cvPeV.setAttribute("x2", xe.toFixed(1)); this.cvPeV.setAttribute("y1", ye.toFixed(1));
          this.cvPeH.setAttribute("x2", xe.toFixed(1)); this.cvPeH.setAttribute("y1", ye.toFixed(1)); this.cvPeH.setAttribute("y2", ye.toFixed(1));
          this.cvPeC.setAttribute("cx", xe.toFixed(1)); this.cvPeC.setAttribute("cy", ye.toFixed(1));
          this.cvPeT.setAttribute("x", (xe + 14).toFixed(1)); this.cvPeT.setAttribute("y", (ye + 6).toFixed(1));
          setFx(this.cvPeT, p.phm ? `E (${fr(VE_L, 1)} mL ; ${fr(PH_E, 1)})` : "E");
          show(this.cvPeH, p.phm ? 1 : 0);
        }
        this.ti.set("La courbe de dosage", p.sub || `acide éthanoïque (${fr(VA_L, 1)} mL) par la soude (${fr(CB_L, 2)} mol·L^{−1})`);
      } else if (p.jeu === "base") {
        show(this.baRev, p.rv);
        this.ti.set("Dosage d’une base faible", p.sub || "sujet 2020 : ammoniac NH_{3} dosé par HCl");
      } else if (p.jeu === "chaine") {
        const defs = {
          s25: [
            ["Flacon (S_{0})", "étiquette", `${fr(S25.etiq, 0)} g·L^{−1}`],
            ["Fiole jaugée", `dilution × ${fr(S25.dil, 0)}`, `*C*_{A} = ${sciF(S25.CA, 1)}`],
            ["Pipette jaugée", "prise d’essai", `*V*_{A} = ${fr(S25.VA, 1)} mL`],
            ["Bécher", "dosage", `*V*_{BE} = ${fr(S25.VBE, 1)} mL`],
          ],
          s22: [
            ["Flacon (S_{0})", "1 L de S_{0}", `*M* = ${fr(S22.M, 0)} g·mol^{−1}`],
            ["Fiole jaugée", `dilution × ${fr(S22.dil, 0)}`, `*C*_{a} = ${sciF(S22.Ca, 0)}`],
            ["Pipette jaugée", "prise d’essai", `*V*_{a} = ${fr(S22.Va, 0)} mL`],
            ["Bécher", "dosage", `*V*_{bE} = ${fr(S22.VE, 1)} mL`],
          ],
          s24: [
            ["Comprimé", "dissous", `*M* = ${fr(S24.M, 0)} g·mol^{−1}`],
            ["Fiole (S_{A})", "volume total", `*V*_{SA} = ${fr(S24.VSA, 1)} mL`],
            ["Pipette jaugée", "prise d’essai", `*V*_{A} = ${fr(S24.VA, 1)} mL`],
            ["Bécher", "dosage", `*V*_{BE} = ${fr(S24.VBE, 1)} mL`],
          ],
        };
        const rows = defs[p.cas] || defs.s25;
        this.chBoxes.forEach((b, i) => {
          b.r.setAttribute("class", b.id === p.ch ? "f-b k-a" : "f-b k-ink");
          b.r.setAttribute("stroke-width", b.id === p.ch ? "4" : "2.5");
          setFx(b.t1, rows[i][0]); setFx(b.t2, rows[i][1]); setFx(b.t3, rows[i][2]);
        });
        this.ti.set("De l’échantillon au flacon", p.sub || "chaque étape change un volume ou une concentration");
      }
    },
  });
}
