"""Explication animée v3 — Bac 2018 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2018-n-x2 (vérifiée contre le scan officiel, NS 22F).
a = -1/2 + (3/2)i SANS radical ; d = -1/2 + (√3/2)i AVEC radical.

Standard v3 = v2 (règle du zéro implicite, sections cliquables) +
la grammaire visuelle de DESIGN.md : signaling (entourer/flécher les
morceaux DANS la formule), couche de sens (« que signifie… ? » avant
chaque calcul), zones d'écran dures + ardoise (jamais de chevauchement).

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    Circle,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    ReplacementTransform,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
    PI,
    TAU,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_BORDER,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Code couleur sémantique (DESIGN.md §2) : a sarcelle, b or, c vert.
COL_A, COL_B, COL_C = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-huit, session normale, "
    "sciences expérimentales : nombres complexes, sur trois points. On "
    "construit la compréhension geste par geste, sans rien supposer connu.",
    "q1": "Question un. On identifie les trois coefficients directement "
    "dans l'équation, on découvre ce que le discriminant SIGNIFIE — un "
    "détecteur du nombre et du type de racines — puis on le calcule "
    "morceau par morceau, jusqu'aux deux racines conjuguées.",
    "plan": "On place les racines dans le plan complexe : partie réelle en "
    "horizontal, partie imaginaire en vertical ; le conjugué est le reflet "
    "dans l'axe réel.",
    "q2a": "Question deux a. Le module, c'est la distance de O au point ; "
    "l'argument, c'est l'angle depuis l'axe réel positif. On les calcule "
    "pour d — attention, d porte racine de trois sur deux, à ne pas "
    "confondre avec l'affixe de A — et d s'écrit e puissance i deux pi "
    "sur trois.",
    "q2b": "Question deux b. Une rotation de centre O multiplie l'affixe "
    "par e puissance i thêta. On fait tourner A, et l'affixe de B est d "
    "fois a.",
    "q3a": "Question trois a. Une translation ajoute l'affixe du vecteur : "
    "c égale b plus a ; on substitue, on factorise par a, et on calcule d "
    "plus un.",
    "q3b": "Question trois b. Module de c sur a égal à un : les côtés O A "
    "et O C sont égaux. Argument pi sur trois : l'angle en O vaut soixante "
    "degrés. Isocèle avec un sommet à soixante degrés : équilatéral.",
}

A_AFF = complex(-0.5, 1.5)
D_AFF = complex(-0.5, np.sqrt(3) / 2)
B_AFF = D_AFF * A_AFF
C_AFF = B_AFF + A_AFF


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        plan = self.chapitre_plan()
        self.chapitre_q2a(plan)
        a_dot, a_lbl, b_dot, b_lbl = self.chapitre_q2b(plan)
        self.chapitre_q3(plan, a_dot, a_lbl, b_dot, b_lbl)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2018 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS 22F",
        )

    # ── Q1 : plein écran (pas encore de figure) ───────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,75 pt")

        # Étape : lire l'énoncé.
        self.etape("q1-enonce")
        eq = MathTex(
            "2", "z^2", "+", "2", "z", "+", "5", "= 0", font_size=54
        ).shift(2.3 * UP)
        self.play(Write(eq, run_time=1.6))
        self.legende(
            "On doit résoudre cette équation dans l'ensemble des nombres",
            "complexes : les solutions ont le droit de ne pas être réelles.",
        )
        self.pose(2.6)

        # Étape : reconnaître la forme générale.
        self.etape("q1-forme")
        forme = MathTex(
            "a", "z^2", "+", "b", "z", "+", "c", "= 0", font_size=38
        ).next_to(eq, DOWN, buff=0.55)
        forme.set_color(BAC_INK_SOFT)
        forme[0].set_color(COL_A)
        forme[3].set_color(COL_B)
        forme[6].set_color(COL_C)
        self.play(FadeIn(forme, shift=0.2 * DOWN))
        self.legende(
            "C'est la forme générale du second degré : a z² + b z + c = 0.",
            "Notre équation a exactement cette forme. Identifions a, b et c.",
        )
        self.pose(2.8)

        # Étape : LE signaling — entourer a, b, c dans l'équation,
        # et les relier par des flèches à leurs valeurs.
        self.etape("q1-coefficients")
        lab_a = MathTex("a = 2", font_size=44, color=COL_A)
        lab_b = MathTex("b = 2", font_size=44, color=COL_B)
        lab_c = MathTex("c = 5", font_size=44, color=COL_C)
        labels = VGroup(lab_a, lab_b, lab_c).arrange(RIGHT, buff=1.6).shift(0.15 * UP)
        cadres, fleches = VGroup(), VGroup()
        for part, lab, col in ((eq[0], lab_a, COL_A), (eq[3], lab_b, COL_B), (eq[6], lab_c, COL_C)):
            part.set_color(col)
            cadres.add(self.entoure(part, col))
            self.play(FadeIn(lab, shift=0.15 * UP), run_time=0.5)
            fleches.add(self.fleche_vers(part, lab, col))
        self.legende(
            "Devant z² il y a 2 : c'est a. Devant z il y a 2 : c'est b.",
            "Tout seul, il y a 5 : c'est c. Chaque couleur suit son coefficient.",
        )
        self.pose(3.4)

        # Étape : l'outil — le discriminant, écrit avec les couleurs.
        self.etape("q1-outil-discriminant")
        self.play(FadeOut(forme), FadeOut(cadres), FadeOut(fleches))
        delta_def = MathTex(
            r"\Delta = ", "b", r"^2 - 4\,", "a", r"\,", "c", font_size=46
        ).shift(1.0 * DOWN + 3.4 * LEFT)
        delta_def[1].set_color(COL_B)
        delta_def[3].set_color(COL_A)
        delta_def[5].set_color(COL_C)
        cadre_outil = SurroundingRectangle(delta_def, color=BAC_ACCENT, buff=0.22, corner_radius=0.1)
        self.play(labels.animate.shift(0.55 * UP), Write(delta_def), Create(cadre_outil))
        self.legende(
            "L'outil du second degré : le discriminant. Sa formule réutilise",
            "nos trois coefficients — les couleurs montrent où chacun va.",
        )
        self.pose(3.0)

        # Étape de SENS : que signifie Δ ?
        self.etape("q1-sens-delta")
        cas = VGroup(
            Text("Δ > 0 → deux racines réelles", font_size=20, color=BAC_INK_SOFT),
            Text("Δ = 0 → une racine double", font_size=20, color=BAC_INK_SOFT),
            Text("Δ < 0 → deux racines complexes conjuguées", font_size=20, color=BAC_INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        cas.next_to(cadre_outil, RIGHT, buff=0.55).align_to(cadre_outil, UP)
        surligne = SurroundingRectangle(cas[2], color=BAC_WARNING, buff=0.1, corner_radius=0.08)
        self.play(FadeIn(cas[0]), FadeIn(cas[1]), FadeIn(cas[2]))
        self.play(Create(surligne))
        self.legende(
            "Que SIGNIFIE Δ ? C'est un détecteur : son signe annonce combien",
            "de racines existent, et de quel type. C'est pour ça qu'on le",
            "calcule en premier — il nous dit à quoi nous attendre.",
        )
        self.pose(3.8)

        # Étape : b², puis 4ac — dans la moitié droite, libérée par la table.
        self.etape("q1-calcul-b2")
        self.play(FadeOut(cas), FadeOut(surligne))
        c1 = MathTex("b", "^2 = 2^2 = 4", font_size=42)
        c1[0].set_color(COL_B)
        c1.next_to(cadre_outil, RIGHT, buff=1.0).align_to(cadre_outil, UP)
        self.play(Write(c1))
        self.legende("D'abord b au carré : 2 au carré, c'est 2 fois 2, donc 4.")
        self.pose(2.4)

        self.etape("q1-calcul-4ac")
        c2 = MathTex(r"4\,", "a", r"\,", "c", r" = 4 \times 2 \times 5 = 40", font_size=42)
        c2[1].set_color(COL_A)
        c2[3].set_color(COL_C)
        c2.next_to(c1, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c2))
        self.legende(
            "Puis 4 a c : 4 fois 2, ça fait 8, et 8 fois 5, ça fait 40."
        )
        self.pose(2.6)

        # Étape : Δ = −36.
        self.etape("q1-calcul-delta")
        c3 = MathTex(r"\Delta = 4 - 40 = -36", font_size=46, color=BAC_ACCENT_STRONG)
        c3.next_to(c2, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c3))
        self.legende(
            "Delta = 4 moins 40 = moins 36. Négatif — le détecteur annonce :",
            "deux racines complexes conjuguées. Exactement notre troisième cas.",
        )
        self.pose(3.2)

        # Étape : apprivoiser √Δ quand Δ < 0.
        self.etape("q1-delta-negatif")
        self.play(FadeOut(eq), FadeOut(labels), FadeOut(delta_def), FadeOut(cadre_outil),
                  FadeOut(c1), FadeOut(c2),
                  c3.animate.to_edge(LEFT, buff=0.65).to_edge(UP, buff=1.3))
        c4 = MathTex(r"-36 = 36\times(-1) = (6i)^2", font_size=44).next_to(
            c3, DOWN, aligned_edge=LEFT, buff=0.55
        )
        rappel_i = MathTex(r"i^2 = -1", font_size=36, color=BAC_INK_SOFT).next_to(
            c4, RIGHT, buff=1.0
        )
        cadre_i = SurroundingRectangle(rappel_i, color=BAC_BORDER, buff=0.15, corner_radius=0.08)
        self.play(Write(c4), FadeIn(rappel_i), Create(cadre_i))
        self.legende(
            "Delta négatif n'arrête rien dans ℂ : moins 36, c'est (6i)²,",
            "puisque i² = −1. Le « racine de delta » s'écrira donc 6i.",
        )
        self.pose(3.4)

        # Étape : la formule des racines, et la substitution.
        self.etape("q1-formule")
        formule = MathTex(
            r"z = \dfrac{-b \pm 6i}{2a} = \dfrac{-2 \pm 6i}{4}",
            font_size=44,
        ).next_to(c4, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(formule))
        self.legende(
            "La formule des racines : (−b ± « racine de delta ») sur 2a.",
            "On remplace : b = 2, a = 2, racine de delta = 6i. D'où (−2 ± 6i)/4.",
        )
        self.pose(3.2)

        # Étape : simplifier chaque fraction, sans sauter.
        self.etape("q1-simplifier")
        self.play(FadeOut(c3), FadeOut(c4), FadeOut(rappel_i), FadeOut(cadre_i),
                  formule.animate.shift(2.9 * UP))
        simp = MathTex(
            r"\dfrac{-2}{4} = -\dfrac12", r"\qquad\qquad \dfrac{6}{4} = \dfrac32",
            font_size=42, color=BAC_ACCENT_STRONG,
        ).next_to(formule, DOWN, aligned_edge=LEFT, buff=0.6)
        self.play(Write(simp))
        self.legende(
            "On simplifie chaque morceau séparément : −2/4 = −1/2,",
            "et 6/4 = 3/2. Aucune fraction ne reste à moitié réduite.",
        )
        self.pose(2.8)

        # Étape : les solutions — seules en scène (l'ardoise se vide avant).
        self.etape("q1-solutions")
        self.play(FadeOut(formule), FadeOut(simp))
        sols = MathTex(
            r"S = \left\{\,-\dfrac12 - \dfrac32\,i\ ;\ -\dfrac12 + \dfrac32\,i\,\right\}",
            font_size=46, color=BAC_ACCENT,
        ).to_edge(LEFT, buff=0.85).shift(0.3 * UP)
        self.play(Write(sols, run_time=1.8))
        self.legende(
            "Deux solutions conjuguées : même partie réelle −1/2, parties",
            "imaginaires opposées. La question 1 est faite — 0,75 point.",
        )
        self.pose(3.0)

        # Étape : retenir z₁ pour la suite.
        self.etape("q1-retenir")
        z1_box = SurroundingRectangle(
            sols[0][-9:-1], color=BAC_WARNING, buff=0.12, corner_radius=0.08
        )
        self.play(Create(z1_box))
        self.legende(
            "Retiens la racine à partie imaginaire POSITIVE : −1/2 + (3/2)i.",
            "Elle devient l'affixe du point A à la question 2. Rien n'est gratuit.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, sols, z1_box)))

    # ── Le plan complexe ──────────────────────────────────────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-2.4, 1.8, 1],
            y_range=[-1.9, 2.3, 1],
            x_length=5.6,
            y_length=5.6,
            background_line_style={
                "stroke_color": BAC_BORDER,
                "stroke_width": 1,
                "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED,
                "stroke_width": 2,
                "include_ticks": False,
                "include_tip": False,
            },
        ).shift(3.15 * RIGHT + 0.35 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(1.75), DOWN, buff=0.18
        )
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.2j), LEFT, buff=0.18
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self.legende(
            "Le plan complexe : l'axe horizontal porte la partie réelle,",
            "l'axe vertical la partie imaginaire. Chaque nombre = un point.",
        )
        self.pose(3.0)

        self.etape("plan-z1")
        guide_x = DashedLine(plan.n2p(0), plan.n2p(-0.5), color=BAC_WARNING, stroke_width=3)
        guide_y = DashedLine(plan.n2p(-0.5), plan.n2p(A_AFF), color=BAC_WARNING, stroke_width=3)
        z1 = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.075)
        z1_lbl = MathTex(r"z_1", font_size=32, color=BAC_ACCENT).next_to(z1, UP + RIGHT, buff=0.1)
        self._z1_lbl = z1_lbl  # repris en 2)b) : z1 DEVIENT A
        self.play(Create(guide_x))
        self.play(Create(guide_y))
        self.play(FadeIn(z1), Write(z1_lbl))
        self.legende(
            "Pour z₁ = −1/2 + (3/2)i : un demi vers la GAUCHE (partie réelle",
            "négative), puis un et demi vers le HAUT (partie imaginaire).",
        )
        self.pose(3.2)
        self.play(FadeOut(guide_x), FadeOut(guide_y))

        self.etape("plan-z2")
        z2 = Dot(plan.n2p(A_AFF.conjugate()), color=BAC_INK_MUTED, radius=0.065)
        z2_lbl = MathTex(r"z_2", font_size=32, color=BAC_INK_MUTED).next_to(
            z2, RIGHT, buff=0.14
        )
        sym = DashedLine(plan.n2p(A_AFF), plan.n2p(A_AFF.conjugate()),
                         color=BAC_INK_MUTED, stroke_width=2)
        self.play(FadeIn(z2), Write(z2_lbl), Create(sym))
        self.legende(
            "Que signifie « conjugué » ? Le REFLET dans l'axe réel : même",
            "partie réelle, partie imaginaire opposée. z₂ est le miroir de z₁.",
        )
        self.pose(3.2)
        self.play(FadeOut(sym), FadeOut(VGroup(re_lbl, im_lbl)))
        self.efface_legende()
        return plan

    # ── Q2a : sens du module et de l'argument, puis calculs ───────
    def chapitre_q2a(self, plan):
        badge = self.bandeau_question("2) a)", "0,25 pt")
        self.ardoise()

        # Étape : lire l'énoncé + la mise en garde d ≠ a.
        self.etape("q2a-enonce")
        d_def = MathTex(r"d = -\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}\,i", font_size=44)
        self.ecrit(d_def)
        a_def = MathTex(
            r"a = -\dfrac{1}{2} + \dfrac{3}{2}\,i\ \neq\ d", font_size=34, color=BAC_ERROR
        )
        self.ecrit(a_def, buff=0.5)
        d_dot = Dot(plan.n2p(D_AFF), color=BAC_ACCENT_STRONG, radius=0.07)
        d_lbl = MathTex("d", font_size=34, color=BAC_ACCENT_STRONG).next_to(
            d_dot, UP + LEFT, buff=0.1
        )
        self.play(FadeIn(d_dot, scale=1.6), Write(d_lbl))
        self.legende(
            "On veut la forme trigonométrique de d. Piège de lecture : d porte",
            "RACINE DE 3 sur 2 ; l'affixe a porte 3/2 sans radical. Deux",
            "nombres différents — le rouge te le rappelle.",
        )
        self.pose(3.6)
        self.nettoie(garder=1)

        # Étape de SENS : le module = la distance à O.
        self.etape("q2a-sens-module")
        seg = Line(plan.n2p(0), plan.n2p(D_AFF), color=BAC_WARNING, stroke_width=4)
        seg_lbl = MathTex("|d|", font_size=30, color=BAC_WARNING).next_to(
            seg.get_center(), LEFT, buff=0.15
        )
        self.play(Create(seg), Write(seg_lbl))
        self.legende(
            "Que SIGNIFIE le module ? C'est la DISTANCE de O au point d —",
            "la longueur du segment doré. Un nombre, une longueur.",
        )
        self.pose(3.2)

        # Étape : calculer le module, carré par carré.
        self.etape("q2a-calcul-module")
        m1 = MathTex(
            r"|d| = \sqrt{\left(-\tfrac12\right)^2 + \left(\tfrac{\sqrt3}{2}\right)^2}"
            r" = \sqrt{\tfrac14 + \tfrac34} = \sqrt{1} = 1",
            font_size=38,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "Racine de la somme des carrés : (−1/2)² = 1/4, (√3/2)² = 3/4,",
            "somme 1, racine 1. Le module de d vaut exactement 1.",
        )
        self.pose(3.4)

        # Étape de SENS : l'argument = l'angle depuis l'axe réel.
        self.etape("q2a-sens-argument")
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))
        cercle = Circle(radius=r_unit, color=BAC_INK_MUTED, stroke_width=1.5).move_to(plan.n2p(0))
        axe = Line(plan.n2p(0), plan.n2p(1))
        od = Line(plan.n2p(0), plan.n2p(D_AFF))
        ang = Angle(axe, od, radius=0.55, color=BAC_ACCENT, stroke_width=3)
        ang_lbl = MathTex(r"\theta", font_size=28, color=BAC_ACCENT).next_to(
            ang, UP + RIGHT, buff=0.08
        )
        self.play(Create(cercle))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE l'argument ? L'ANGLE θ mesuré depuis l'axe réel",
            "positif, en tournant vers d. Et comme |d| = 1, d est SUR le",
            "cercle unité — le cercle de rayon 1 centré en O.",
        )
        self.pose(3.6)
        self.nettoie(garder=1)

        # Étape : identifier θ par les valeurs remarquables.
        self.etape("q2a-calcul-argument")
        arg = MathTex(
            r"\cos\theta = -\tfrac12,\ \ \sin\theta = \tfrac{\sqrt3}{2}"
            r"\ \Longrightarrow\ \theta = \dfrac{2\pi}{3}",
            font_size=38,
        )
        self.ecrit(arg, buff=0.55)
        # L'angle qu'on vient de nommer se montre : θ devient 2π/3 SUR l'arc.
        ang_lbl2 = MathTex(r"\tfrac{2\pi}{3}", font_size=26, color=BAC_ACCENT).move_to(
            ang_lbl
        )
        self.play(ReplacementTransform(ang_lbl, ang_lbl2))
        ang_lbl = ang_lbl2
        self.legende(
            "cos θ = partie réelle / module = −1/2 ; sin θ = partie",
            "imaginaire / module = √3/2. C'est la valeur remarquable 2π/3 —",
            "regarde l'arc : l'angle porte maintenant son nom.",
        )
        self.pose(3.4)

        # Étape : conclusion.
        self.etape("q2a-conclusion")
        concl = MathTex(
            r"d = \cos\dfrac{2\pi}{3} + i\,\sin\dfrac{2\pi}{3} = e^{i\frac{2\pi}{3}}",
            font_size=42, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "La forme trigonométrique demandée. Son écriture exponentielle",
            "e^{i2π/3} signifie : LE point du cercle unité à l'angle 2π/3.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, seg, seg_lbl, ang, ang_lbl)))

    # ── Q2b : la rotation ─────────────────────────────────────────
    def chapitre_q2b(self, plan):
        badge = self.bandeau_question("2) b)", "0,5 pt")
        self.ardoise()

        self.etape("q2b-placer-A")
        a_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.08)
        a_lbl = MathTex(r"A(a)", font_size=34, color=BAC_ACCENT).next_to(
            a_dot, UP + RIGHT, buff=0.1
        )
        rappel = MathTex(r"a = -\dfrac12 + \dfrac32\,i = z_1", font_size=42)
        self.ecrit(rappel)
        # z₁ DEVIENT le point A : l'étiquette se transforme, elle ne s'empile pas.
        self.play(FadeIn(a_dot, scale=1.6), ReplacementTransform(self._z1_lbl, a_lbl))
        self.legende(
            "Le point A a pour affixe a = −1/2 + (3/2)i : EXACTEMENT la",
            "racine z₁ gardée à la question 1. L'exercice se tient.",
        )
        self.pose(3.0)

        self.etape("q2b-outil-rotation")
        outil = MathTex(
            r"\text{rotation}(O,\theta):\ z \longmapsto e^{i\theta}\, z",
            font_size=40,
        )
        self.ecrit(outil, buff=0.6)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        self.play(Create(cadre))
        self.legende(
            "L'outil : une rotation de centre O et d'angle θ MULTIPLIE",
            "l'affixe par e^{iθ}. Module 1 : la distance à O ne change pas ;",
            "et l'angle augmente de θ. C'est toute la rotation, en une formule.",
        )
        self.pose(3.8)

        self.etape("q2b-tourner")
        origine = plan.n2p(0)
        rayon = float(np.linalg.norm(plan.n2p(A_AFF) - origine))
        angle_a = float(np.angle(A_AFF))
        arc = Arc(
            radius=rayon, start_angle=angle_a, angle=TAU / 3,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        b_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT_STRONG, radius=0.08)
        self.play(Create(arc, run_time=3.6), MoveAlongPath(b_dot, arc, run_time=3.6))
        b_lbl = MathTex(r"B(b)", font_size=34, color=BAC_ACCENT_STRONG).next_to(
            b_dot, LEFT, buff=0.14
        )
        self.play(Write(b_lbl))
        self.legende(
            "Le rôle de l'animation : VOIR la rotation. A tourne d'un tiers",
            "de tour autour de O, à distance constante. L'arrivée est B.",
        )
        self.pose(3.0)

        # Étape : MONTRER l'angle de la rotation, pas seulement le dire.
        self.etape("q2b-angle")
        oa_r = Line(origine, plan.n2p(A_AFF), color=BAC_WARNING, stroke_width=3)
        ob_r = Line(origine, plan.n2p(B_AFF), color=BAC_WARNING, stroke_width=3)
        ang_rot = Angle(oa_r, ob_r, radius=0.65, other_angle=False,
                        color=BAC_ACCENT, stroke_width=3)
        # Étiquette posée au milieu de l'arc, poussée vers l'extérieur —
        # jamais sur le « O » de l'origine.
        milieu = ang_rot.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_rot_lbl = MathTex(r"\tfrac{2\pi}{3}", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.42 * direction
        )
        self.play(Create(oa_r), Create(ob_r))
        self.play(Create(ang_rot), FadeIn(ang_rot_lbl))
        self.legende(
            "Le voici, l'angle de la rotation : entre OA et OB, exactement",
            "2π/3. Et les deux segments dorés ont la MÊME longueur —",
            "la rotation conserve la distance à O.",
        )
        self.pose(3.6)

        self.etape("q2b-conclusion")
        concl = MathTex(
            r"b = e^{i\frac{2\pi}{3}}\cdot a = d\cdot a",
            font_size=46, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.6)
        self.legende(
            "Donc b = e^{i2π/3} × a. Et e^{i2π/3} = d, démontré en 2)a).",
            "Conclusion : b = d·a — exactement ce qui était demandé.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre, arc, oa_r, ob_r, ang_rot, ang_rot_lbl)))
        return a_dot, a_lbl, b_dot, b_lbl

    # ── Q3 : translation puis triangle ────────────────────────────
    def chapitre_q3(self, plan, a_dot, a_lbl, b_dot, b_lbl):
        badge = self.bandeau_question("3) a)", "0,75 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q3a-outil-translation")
        outil = MathTex(r"t_{\overrightarrow{OA}}:\ z \longmapsto z + a", font_size=40)
        self.ecrit(outil)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        vec = Line(origine, plan.n2p(A_AFF), color=BAC_ACCENT, stroke_width=3).add_tip(
            tip_width=0.16, tip_length=0.16
        )
        self.play(Create(cadre), Create(vec))
        self.legende(
            "Nouvel outil : la translation de vecteur OA. Translater, c'est",
            "AJOUTER l'affixe a. Une rotation multiplie ; une translation",
            "additionne. Deux gestes, deux opérations différentes.",
        )
        self.pose(3.6)

        self.etape("q3a-translater")
        # MONTRER la translation : le vecteur OA se recopie, tel quel,
        # à partir de B — même direction, même longueur — puis B glisse
        # le long de ce rail jusqu'à C.
        vec2 = vec.copy().set_color(BAC_ACCENT_LIGHT)
        decalage = plan.n2p(B_AFF) - plan.n2p(0)
        self.play(vec2.animate.shift(decalage), run_time=3.0)
        c_dot = Dot(plan.n2p(B_AFF), color=BAC_SUCCESS, radius=0.08)
        self.add(c_dot)
        self.play(c_dot.animate.move_to(plan.n2p(C_AFF)), run_time=2.0)
        c_lbl = MathTex(r"C(c)", font_size=34, color=BAC_SUCCESS).next_to(
            c_dot, UP + LEFT, buff=0.1
        )
        e1 = MathTex(r"c = b + a", font_size=44)
        self.play(Write(c_lbl))
        self.ecrit(e1, buff=0.6)
        self.legende(
            "Regarde le vecteur : le MÊME OA, recopié à partir de B — même",
            "direction, même longueur. B glisse le long de ce rail jusqu'à C.",
            "Translater par OA, c'est ajouter a : c = b + a.",
        )
        self.pose(3.4)

        self.etape("q3a-substituer")
        e2 = MathTex(r"c = d\,a + a", font_size=44)
        self.ecrit(e2, buff=0.5)
        self.legende(
            "On remplace b par ce qu'on a démontré : b = d·a. Donc",
            "c = d·a + a. Toujours réutiliser les questions précédentes.",
        )
        self.pose(2.8)

        self.etape("q3a-factoriser")
        e3 = MathTex(r"c = a\,(d + 1)", font_size=44, color=BAC_ACCENT_STRONG)
        self.ecrit(e3, buff=0.5)
        self.legende(
            "a est en facteur commun : on le sort. c = a(d + 1).",
            "La factorisation est l'astuce clé de cette question.",
        )
        self.pose(2.8)

        self.etape("q3a-calculer-d-plus-1")
        e4 = MathTex(
            r"d+1 = \left(-\tfrac12 + 1\right) + \tfrac{\sqrt3}{2}\,i"
            r" = \tfrac12 + \tfrac{\sqrt3}{2}\,i",
            font_size=38,
        )
        self.ecrit(e4, buff=0.5)
        e5 = MathTex(
            r"c = a\left(\tfrac12 + \tfrac{\sqrt3}{2}\,i\right)",
            font_size=44, color=BAC_ACCENT,
        )
        self.ecrit(e5, buff=0.5)
        self.legende(
            "d + 1 : seule la partie réelle bouge, −1/2 + 1 = 1/2 ; la partie",
            "imaginaire reste √3/2. On obtient la forme demandée. 0,75 point.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre, vec, vec2)))

        # ---- 3) b) ----
        badge = self.bandeau_question("3) b)", "0,75 pt")
        self.ardoise()

        self.etape("q3b-quotient")
        q1 = MathTex(
            r"\dfrac{c}{a} = d + 1 = \tfrac12 + \tfrac{\sqrt3}{2}\,i",
            font_size=42,
        )
        self.ecrit(q1)
        self.legende(
            "On étudie le quotient c/a (a ≠ 0, on a le droit de diviser).",
            "D'après 3)a) : c/a = d + 1 = 1/2 + (√3/2)i.",
        )
        self.pose(3.0)

        self.etape("q3b-module")
        oa = Line(origine, plan.n2p(A_AFF), color=BAC_WARNING, stroke_width=4)
        oc = Line(origine, plan.n2p(C_AFF), color=BAC_WARNING, stroke_width=4)
        q2 = MathTex(
            r"\left|\dfrac{c}{a}\right| = \sqrt{\tfrac14+\tfrac34} = 1"
            r"\ \Longrightarrow\ OC = OA",
            font_size=38,
        )
        self.play(Create(oa), Create(oc))
        self.ecrit(q2, buff=0.55)
        self.legende(
            "Module : 1/4 + 3/4 = 1, racine 1 = 1. Or |c/a| = OC/OA — le",
            "rapport des deux distances dorées. Rapport 1 : OC = OA.",
            "Le triangle est donc isocèle en O.",
        )
        self.pose(3.6)

        self.etape("q3b-argument")
        ang = Angle(oa, oc, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"60^\circ", font_size=28, color=BAC_ACCENT).move_to(
            milieu + 0.4 * direction
        )
        q3 = MathTex(
            r"\arg\dfrac{c}{a} = \dfrac{\pi}{3}"
            r"\ \Longrightarrow\ \widehat{AOC} = 60^\circ",
            font_size=38,
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.ecrit(q3, buff=0.5)
        self.legende(
            "Argument : cos = 1/2, sin = √3/2 — c'est π/3. Et arg(c/a), c'est",
            "l'ANGLE entre OA et OC : l'angle en O vaut 60 degrés — l'arc bleu.",
        )
        self.pose(3.4)

        self.etape("q3b-triangle")
        ac = Line(plan.n2p(A_AFF), plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        concl = MathTex(
            r"\text{isocèle} + 60^\circ\ \Longrightarrow\ OAC\ \text{équilatéral}",
            font_size=40, color=BAC_SUCCESS,
        )
        self.play(Create(ac))
        self.ecrit(concl, buff=0.5)
        triangle = VGroup(oa, oc, ac)
        self.play(triangle.animate.set_color(BAC_SUCCESS), run_time=1.0)
        self.legende(
            "Isocèle en O, sommet à 60° : les angles de la base font",
            "(180 − 60)/2 = 60° chacun. Trois angles égaux : OAC est",
            "ÉQUILATÉRAL. Démonstration terminée — 0,75 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Δ est un détecteur : son signe annonce le type des racines.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Module = distance à O · argument = angle depuis l'axe réel.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Rotation de centre O : on MULTIPLIE l'affixe par e^(iθ).",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Translation de vecteur OA : on ADDITIONNE l'affixe a.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Isocèle + 60° au sommet = équilatéral.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=24, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
