"""Explication animée — Bac 2018 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2018-n-x2 (vérifiée contre le scan officiel, NS 22F).
Toutes les valeurs sont celles de l'énoncé — dont l'affixe
a = -1/2 + (3/2)i (sans radical), confirmée par double re-lecture.

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
    Create,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    ComplexPlane,
    ReplacementTransform,
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
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
)

# Narration par chapitre (doublage ElevenLabs, Phase E3 — ne pas supprimer).
NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-huit, session normale, "
    "filière sciences expérimentales : nombres complexes, sur trois points.",
    "q1": "On résout l'équation deux z carré plus deux z plus cinq égale zéro. "
    "Le discriminant vaut moins trente-six : il est strictement négatif, donc "
    "l'équation admet deux racines complexes conjuguées, moins un demi plus ou "
    "moins trois demis i.",
    "q2a": "Le nombre d, de module un et d'argument deux pi sur trois, s'écrit "
    "e puissance i deux pi sur trois : c'est exactement l'opérateur d'une "
    "rotation de centre O et d'angle deux pi sur trois.",
    "q2b": "Le point A a pour affixe la racine de partie imaginaire positive "
    "trouvée à la question un. Faire tourner A autour de O d'un angle deux pi "
    "sur trois, c'est multiplier son affixe par d : b égale d fois a.",
    "q3a": "La translation de vecteur O A ajoute a à chaque affixe : c égale "
    "b plus a, c'est-à-dire d a plus a, donc a facteur de d plus un — et d "
    "plus un vaut un demi plus racine de trois sur deux i.",
    "q3b": "Le quotient c sur a vaut d plus un, de module un et d'argument pi "
    "sur trois. Module un : O C égale O A. Argument pi sur trois : l'angle en "
    "O vaut soixante degrés. Un triangle isocèle dont l'angle au sommet vaut "
    "soixante degrés est équilatéral.",
}

# Les affixes exactes de l'énoncé.
A_AFF = complex(-0.5, 1.5)                       # a = -1/2 + (3/2)i
D_AFF = complex(-0.5, np.sqrt(3) / 2)            # d = -1/2 + (√3/2)i
B_AFF = D_AFF * A_AFF                            # b = d·a
C_AFF = B_AFF + A_AFF                            # c = b + a


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        plan, elements = self.chapitre_plan()
        a_dot, a_lbl = self.chapitre_q2(plan)
        self.chapitre_q3(plan, a_dot, a_lbl)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.carte_titre(
            "BAC 2018 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS 22F",
        )

    # ── Q1 : résoudre 2z² + 2z + 5 = 0 ────────────────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,75 pt")
        eq = MathTex(r"2z^2 + 2z + 5 = 0", font_size=48)
        eq.shift(1.6 * UP)
        self.play(Write(eq))
        self.pose(1.0)

        delta = MathTex(
            r"\Delta = 2^2 - 4 \times 2 \times 5 = -36",
            font_size=40,
        ).next_to(eq, DOWN, buff=0.7)
        self.play(Write(delta))
        self.pose(1.2)

        delta2 = MathTex(
            r"\Delta = -36 = (6i)^2", r"\quad<\quad 0",
            font_size=40,
        ).move_to(delta)
        delta2[1].set_color(BAC_ACCENT_STRONG)
        self.play(ReplacementTransform(delta, delta2))
        self.pose(1.2)

        roots = MathTex(
            r"z = \frac{-2 \pm 6i}{4}",
            r"\quad\Longrightarrow\quad",
            r"z_1 = -\frac{1}{2} + \frac{3}{2}i,\;\; z_2 = -\frac{1}{2} - \frac{3}{2}i",
            font_size=40,
        ).next_to(delta2, DOWN, buff=0.7)
        roots[2].set_color(BAC_ACCENT)
        self.play(Write(roots))
        self.pose(2.4)
        self.play(FadeOut(VGroup(badge, eq, delta2, roots)))

    # ── Le plan complexe partagé par la suite ─────────────────────
    def chapitre_plan(self):
        plan = ComplexPlane(
            x_range=[-2.4, 1.8, 1],
            y_range=[-1.9, 2.3, 1],
            x_length=6.6,
            y_length=6.6,
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
        ).shift(2.9 * RIGHT + 0.1 * DOWN)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        self.play(Create(plan), FadeIn(o_lbl), run_time=1.4)

        # Les deux racines de la question 1, replacées dans le plan.
        z1 = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.07)
        z2 = Dot(plan.n2p(A_AFF.conjugate()), color=BAC_INK_MUTED, radius=0.06)
        z1_lbl = MathTex(r"z_1", font_size=32, color=BAC_ACCENT).next_to(z1, UP + RIGHT, buff=0.1)
        z2_lbl = MathTex(r"z_2", font_size=32, color=BAC_INK_MUTED).next_to(z2, DOWN + RIGHT, buff=0.1)
        self.play(FadeIn(z1, z1_lbl, z2, z2_lbl))
        self.pose(1.4)
        return plan, VGroup(o_lbl, z1, z1_lbl, z2, z2_lbl)

    # ── Q2 : d en forme trigonométrique, puis la rotation A → B ──
    def chapitre_q2(self, plan):
        badge = self.bandeau_question("2) a)", "0,25 pt")

        # Cercle unité + point d.
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))
        cercle = Circle(radius=r_unit, color=BAC_INK_MUTED, stroke_width=1.5).move_to(plan.n2p(0))
        d_dot = Dot(plan.n2p(D_AFF), color=BAC_ACCENT_STRONG, radius=0.07)
        d_lbl = MathTex("d", font_size=34, color=BAC_ACCENT_STRONG).next_to(d_dot, UP + LEFT, buff=0.1)
        self.play(Create(cercle), FadeIn(d_dot, d_lbl))

        trig = VGroup(
            MathTex(r"d = -\frac{1}{2} + \frac{\sqrt{3}}{2}i", font_size=38),
            MathTex(r"|d| = 1,\ \ \arg d = \frac{2\pi}{3}", font_size=38),
            MathTex(r"d = e^{i\frac{2\pi}{3}}", font_size=44, color=BAC_ACCENT_STRONG),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).to_edge(LEFT, buff=0.7).shift(0.8 * UP)
        for ligne in trig:
            self.play(Write(ligne))
            self.pose(0.9)
        self.pose(1.2)
        self.play(FadeOut(badge), FadeOut(trig))

        # Q2b — la rotation.
        badge = self.bandeau_question("2) b)", "0,5 pt")
        a_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.08)
        a_lbl = MathTex(r"A(a)", font_size=34, color=BAC_ACCENT).next_to(a_dot, UP + RIGHT, buff=0.1)
        rappel = MathTex(
            r"a = -\frac{1}{2} + \frac{3}{2}i",
            font_size=38,
        ).to_edge(LEFT, buff=0.7).shift(1.6 * UP)
        note = Text(
            "— la racine z₁ de la question 1",
            font_size=24,
            color=BAC_INK_SOFT,
        ).next_to(rappel, DOWN, aligned_edge=LEFT, buff=0.25)
        self.play(FadeIn(a_dot), Write(a_lbl), Write(rappel))
        self.play(FadeIn(note))
        self.pose(1.6)

        # B = image de A par la rotation : trajet en arc autour de O.
        origine = plan.n2p(0)
        rayon = float(np.linalg.norm(plan.n2p(A_AFF) - origine))
        angle_a = float(np.angle(A_AFF))
        arc = Arc(
            radius=rayon,
            start_angle=angle_a,
            angle=TAU / 3,
            arc_center=origine,
            color=BAC_ACCENT_LIGHT,
            stroke_width=3,
        )
        b_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT_STRONG, radius=0.08)
        self.play(Create(arc), MoveAlongPath(b_dot, arc), run_time=2.4)
        b_lbl = MathTex(r"B(b)", font_size=34, color=BAC_ACCENT_STRONG).next_to(b_dot, DOWN + LEFT, buff=0.1)
        formule = MathTex(
            r"b = e^{i\frac{2\pi}{3}} \cdot a = d\cdot a",
            font_size=42,
            color=BAC_ACCENT_STRONG,
        ).next_to(note, DOWN, aligned_edge=LEFT, buff=0.6)
        self.play(Write(b_lbl), Write(formule))
        self.pose(2.2)
        self.play(FadeOut(VGroup(badge, rappel, note, formule, arc)))
        return a_dot, a_lbl

    # ── Q3 : translation, puis le triangle équilatéral ────────────
    def chapitre_q3(self, plan, a_dot, a_lbl):
        badge = self.bandeau_question("3) a)", "0,75 pt")
        origine = plan.n2p(0)

        # Vecteur OA puis translation de B par a.
        vec = Line(origine, plan.n2p(A_AFF), color=BAC_ACCENT, stroke_width=3).add_tip(
            tip_width=0.18, tip_length=0.18
        )
        self.play(Create(vec))
        c_dot = Dot(plan.n2p(B_AFF), color=BAC_SUCCESS, radius=0.08)
        self.add(c_dot)
        self.play(c_dot.animate.move_to(plan.n2p(C_AFF)), run_time=1.6)
        c_lbl = MathTex(r"C(c)", font_size=34, color=BAC_SUCCESS).next_to(c_dot, UP + LEFT, buff=0.1)
        calc = VGroup(
            MathTex(r"c = b + a = d\,a + a", font_size=38),
            MathTex(r"c = a\,(d + 1)", font_size=38),
            MathTex(
                r"c = a\left(\frac{1}{2} + \frac{\sqrt{3}}{2}i\right)",
                font_size=42,
                color=BAC_ACCENT_STRONG,
            ),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.45).to_edge(LEFT, buff=0.7).shift(1.2 * UP)
        self.play(Write(c_lbl))
        for ligne in calc:
            self.play(Write(ligne))
            self.pose(0.9)
        self.pose(1.0)
        self.play(FadeOut(badge), FadeOut(calc), FadeOut(vec))

        # Q3b — conclure : OAC équilatéral.
        badge = self.bandeau_question("3) b)", "0,75 pt")
        oa = Line(origine, plan.n2p(A_AFF), color=BAC_INK, stroke_width=3)
        oc = Line(origine, plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        ac = Line(plan.n2p(A_AFF), plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        angle = Angle(oc, oa, radius=0.55, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        angle_lbl = MathTex(r"\frac{\pi}{3}", font_size=30, color=BAC_ACCENT).next_to(
            angle, UP + LEFT, buff=0.08
        )
        self.play(Create(oa), Create(oc), Create(ac))
        self.play(Create(angle), FadeIn(angle_lbl))

        argu = VGroup(
            MathTex(r"\frac{c}{a} = d + 1 = e^{i\frac{\pi}{3}}", font_size=40),
            MathTex(r"\left|\tfrac{c}{a}\right| = 1 \;\Rightarrow\; OC = OA", font_size=36),
            MathTex(
                r"\arg\!\left(\tfrac{c}{a}\right) = \frac{\pi}{3} \;\Rightarrow\; \widehat{AOC} = 60^\circ",
                font_size=36,
            ),
            MathTex(r"\text{isocèle} + 60^\circ \;\Rightarrow\; OAC\ \text{équilatéral}",
                    font_size=38, color=BAC_SUCCESS),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).to_edge(LEFT, buff=0.7).shift(1.0 * UP)
        for ligne in argu:
            self.play(Write(ligne))
            self.pose(1.0)

        triangle = VGroup(oa, oc, ac)
        self.play(triangle.animate.set_color(BAC_SUCCESS), run_time=0.8)
        self.pose(2.4)
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        bilan = VGroup(
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=30, color=BAC_INK),
            Text("Rotation = multiplication par e^{iθ} · translation = addition d'affixe.",
                 font_size=26, color=BAC_INK_SOFT),
        ).arrange(DOWN, buff=0.4)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(2.6)
        self.play(FadeOut(bilan))
