"""Explication animée v4 — Bac 2024 SN (SExp), Problème : exponentielle et x,
fonction avec ln, points fixes et fonction réciproque.

Source de vérité : content/maths/fonction-logarithme/bank.yaml, entrée
bk-2024-n-x4 (vérifiée — examen national session normale 2024, Sciences
Expérimentales BIOF, code NS 22F, AlloSchool element/144505, Problème,
8 points, page 4 du scan).

Deux parties, 16 questions, 8 points au total :
  Partie I — Comparer u(x)=e^x et v(x)=x, puis une aire (1,25 pt) :
    q1 (0,5 pt)  : tracer (C_u) et (C_v) dans un même repère
    q2 (0,25 pt) : justifier graphiquement e^x - x > 0 pour tout x
    q3 (0,5 pt)  : aire délimitée par (C_u), (C_v), x=0 et x=1 (e - 3/2)
  Partie II — Étude de f(x) = x + 1 - ln(e^x - x) (6,75 pts) :
    q4 (0,25 pt) : domaine de définition (R tout entier grâce à Partie I)
    q5 (0,5 pt)  : autre écriture f(x) = 1 - ln(1 - x e^-x)
    q6 (0,5 pt)  : limite en +∞ = 1 et asymptote horizontale y = 1
    q7 (0,25 pt) : limite en -∞ = -∞
    q8 (0,5 pt)  : autre écriture pour x < 0
    q9 (0,75 pt) : limite f(x)/x en -∞ et branche parabolique de direction y=x
    q10 (0,5 pt) : dérivée f'(x) = (1-x)/(e^x - x)
    q11 (0,5 pt) : signe de f' et tableau de variations (max en 1 = 2-ln(e-1))
    q12 (0,75 pt): zéro unique de f sur ]-1, 0[ via corollaire du TVI
    q13 (0,5 pt) : figure (C_f) et (Δ), deux solutions α et β de f(x) = x
    q14 (0,5 pt) : relation e^α - e^β = α - β
    q15 (0,5 pt) : restriction g sur ]-∞, 1], réciproque g^-1 sur J = ]-∞, 2-ln(e-1)]
    q16 (0,75 pt): dérivabilité de g^-1 en 1 et calcul de (g^-1)'(1) = 1
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import math
import numpy as np
from manim import (
    Scene,
    VGroup,
    Axes,
    Line,
    DashedLine,
    Arrow,
    Dot,
    Text,
    MathTex,
    Rectangle,
    Polygon,
    Write,
    FadeIn,
    FadeOut,
    Create,
    Transform,
    ReplacementTransform,
    Circumscribe,
    Indicate,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    ORIGIN,
    UL,
    UR,
    DL,
    DR,
)

from bac_scene import BacScene
from bac_style import (
    BAC_BG,
    BAC_INK,
    BAC_INK_SOFT,
    BAC_INK_MUTED,
    BAC_ACCENT,
    BAC_ACCENT_STRONG,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_SUBTLE,
    BAC_SUCCESS,
    BAC_WARNING,
    BAC_ERROR,
)

COL_TITLE = BAC_ACCENT_STRONG
COL_MATH = BAC_INK
COL_THEO = BAC_ACCENT
COL_ALERT = BAC_ERROR
COL_TOOL = BAC_WARNING
COL_SECOND = BAC_INK_SOFT
COL_COURBE = BAC_ACCENT
COL_ASYMPT = BAC_INK_MUTED
COL_TANGENTE = BAC_WARNING
COL_VALEUR = BAC_ACCENT_STRONG
COL_DERIV = BAC_ACCENT_LIGHT
COL_BRANCH = BAC_INK_SOFT
COL_LIM = BAC_SUCCESS



def _u(x):
    """u(x) = e^x"""
    return math.exp(x)


def _v(x):
    """v(x) = x"""
    return x


def _f(x):
    """f(x) = x + 1 - ln(e^x - x)"""
    ex_minus_x = math.exp(x) - x
    if ex_minus_x <= 0:
        return -999.0
    return x + 1.0 - math.log(ex_minus_x)


# Points fixes de f(x) = x : e^x - x = e (e ≈ 2.71828)
# α ≈ -2.65342, β ≈ 1.42331
ALPHA_VAL = -2.65342
BETA_VAL = 1.42331
F_MAX = 2.0 - math.log(math.e - 1.0)  # ≈ 1.458675


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()

        # Partie I
        fig_uv = self.chapitre_plan_partie1()
        self.chapitre_q1(fig_uv)
        self.chapitre_q2(fig_uv)
        self.chapitre_q3(fig_uv)

        # Partie II
        fig_f = self.chapitre_plan_partie2(fig_uv)
        self.chapitre_q4(fig_f)
        self.chapitre_q5(fig_f)
        self.chapitre_q6(fig_f)
        self.chapitre_q7(fig_f)
        self.chapitre_q8(fig_f)
        self.chapitre_q9(fig_f)
        self.chapitre_q10(fig_f)
        self.chapitre_q11(fig_f)
        self.chapitre_q12(fig_f)
        self.chapitre_q13(fig_f)
        self.chapitre_q14(fig_f)
        self.chapitre_q15(fig_f)
        self.chapitre_q16(fig_f)

        # Bilan
        self.chapitre_fin(fig_f)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        titre = Text(
            "Bac 2024 — Session Normale (SExp)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.8)
        sous_titre = Text(
            "Problème : Exponentielle, Logarithme, Points fixes & Réciproque",
            font_size=20,
            color=BAC_INK,
        ).next_to(titre, DOWN, buff=0.35)
        bareme = Text(
            "8 points  •  16 questions  •  2 parties",
            font_size=18,
            color=COL_MATH,
        ).next_to(sous_titre, DOWN, buff=0.35)

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(sous_titre), FadeIn(bareme))
        self.legende(
            "Session normale 2024, Sciences Expérimentales — sujet officiel complet,",
            "articulé en deux parties : comparaison e^x et x, puis étude de f.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(FadeOut(titre), FadeOut(sous_titre), FadeOut(bareme))

    # ── Intro ─────────────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-enonce")
        p1 = Text(
            "Partie I : u(x) = e^x   et   v(x) = x   sur ℝ",
            font_size=22,
            color=COL_THEO,
            weight="BOLD",
        ).to_edge(UP, buff=1.2)
        p2 = MathTex(
            r"\text{Partie II : } f(x) = x + 1 - \ln\left(e^x - x\right) \quad \text{sur } \mathbb{R}",
            font_size=24,
            color=COL_MATH,
        ).next_to(p1, DOWN, buff=0.6)

        vigilance = Text(
            "Vigilance : la Partie I garantit que e^x - x > 0 partout sur ℝ,",
            font_size=18,
            color=COL_ALERT,
        ).next_to(p2, DOWN, buff=0.8)
        vigilance2 = Text(
            "condition absolue pour que ln(e^x - x) existe dans la Partie II (R1).",
            font_size=18,
            color=COL_ALERT,
        ).next_to(vigilance, DOWN, buff=0.25)

        self.play(FadeIn(p1), FadeIn(p2))
        self.play(FadeIn(vigilance), FadeIn(vigilance2))
        self.legende(
            "La Partie I n'est pas un exercice isolé : son résultat e^x > x",
            "fonde le domaine de définition de f dans la Partie II.",
        )
        self.pose(4.5)
        self.efface_legende()
        self.play(FadeOut(p1), FadeOut(p2), FadeOut(vigilance), FadeOut(vigilance2))

    # ── Plan Partie I (figure repère u et v) ──────────────────────────
    def chapitre_plan_partie1(self):
        self.etape("plan-axes-p1")
        # Repère orthonormé à droite pour Partie I
        axes = Axes(
            x_range=[-3.0, 3.2, 1],
            y_range=[-2.0, 5.2, 1],
            x_length=4.8,
            y_length=5.2,
            tips=False,
            axis_config={"color": BAC_INK_MUTED, "stroke_width": 1.5},
        ).to_edge(RIGHT, buff=0.6).shift(DOWN * 0.1)

        lbl_x = axes.get_x_axis_label(MathTex("x", font_size=18, color=BAC_INK_MUTED), edge=RIGHT, direction=RIGHT)
        lbl_y = axes.get_y_axis_label(MathTex("y", font_size=18, color=BAC_INK_MUTED), edge=UP, direction=UP)
        orig = MathTex("O", font_size=18, color=BAC_INK_MUTED).next_to(axes.c2p(0, 0), DL, buff=0.1)

        self.play(Create(axes), FadeIn(lbl_x), FadeIn(lbl_y), FadeIn(orig))
        self.graduations(axes, [-2, -1, 1, 2, 3], [-1, 1, 2, 3, 4, 5])

        fig_uv = {
            "axes": axes,
            "lbl_x": lbl_x,
            "lbl_y": lbl_y,
            "orig": orig,
            "group": VGroup(axes, lbl_x, lbl_y, orig),
        }
        return fig_uv

    # ── Q1 : Tracer (C_u) et (C_v) (0,5 pt) ───────────────────────────
    def chapitre_q1(self, fig_uv):
        badge = self.bandeau_question("Question 1", "0,5 pt")
        self.ardoise()
        axes = fig_uv["axes"]

        self.etape("q1-enonce")
        but = MathTex(
            r"\text{Tracer dans un même repère } (\mathcal{C}_u) \text{ et } (\mathcal{C}_v)",
            font_size=20,
        )
        self.ecrit(but)
        self.legende(
            "u(x) = e^x (courbe exponentielle) et v(x) = x (première bissectrice)",
            "sont tracées sur ℝ tout entier.",
        )
        self.pose(3.6)

        self.etape("q1-tracer-droite-v")
        m_v = MathTex(
            r"(\mathcal{C}_v) : y = x \quad (\text{droite affine passant par } O)",
            font_size=20, color=COL_SECOND,
        )
        self.ecrit(m_v, buff=0.45)
        courbe_v = axes.plot(
            lambda x: x, x_range=[-2.0, 3.0],
            color=COL_SECOND, stroke_width=2.5,
        )
        lbl_cv = MathTex(
            r"(\mathcal{C}_v) : y = x", font_size=18, color=COL_SECOND
        ).next_to(axes.c2p(2.2, 2.2), DL, buff=0.15)
        self.play(Create(courbe_v, run_time=1.4), FadeIn(lbl_cv))
        fig_uv["courbe_v"] = courbe_v
        fig_uv["lbl_cv"] = lbl_cv
        fig_uv["group"].add(courbe_v, lbl_cv)
        self.pose(3.2)

        self.etape("q1-tracer-courbe-u")
        m_u = MathTex(
            r"(\mathcal{C}_u) : y = e^x \quad (\text{exponentielle, } e^0=1, e^1=e)",
            font_size=20, color=COL_COURBE,
        )
        self.ecrit(m_u, buff=0.45)
        courbe_u = axes.plot(
            lambda x: math.exp(x), x_range=[-3.0, 1.64],
            color=COL_COURBE, stroke_width=3.5,
        )
        lbl_cu = MathTex(
            r"(\mathcal{C}_u) : y = e^x", font_size=18, color=COL_COURBE
        ).next_to(axes.c2p(1.5, math.exp(1.5)), UL, buff=0.1)
        pt_01 = Dot(axes.c2p(0, 1), radius=0.06, color=COL_COURBE)
        pt_1e = Dot(axes.c2p(1, math.e), radius=0.06, color=COL_COURBE)
        lbl_1e = MathTex(r"(1, e)", font_size=16, color=COL_COURBE).next_to(pt_1e, LEFT, buff=0.1)

        self.play(Create(courbe_u, run_time=1.8), FadeIn(lbl_cu), FadeIn(pt_01), FadeIn(pt_1e), FadeIn(lbl_1e))
        fig_uv["courbe_u"] = courbe_u
        fig_uv["lbl_cu"] = lbl_cu
        fig_uv["pt_01"] = pt_01
        fig_uv["pt_1e"] = pt_1e
        fig_uv["lbl_1e"] = lbl_1e
        fig_uv["group"].add(courbe_u, lbl_cu, pt_01, pt_1e, lbl_1e)

        self.encadre(couleur=COL_COURBE)
        self.legende(
            "(C_u) est strictement croissante, tend vers 0 en -∞ et",
            "reste visiblement au-dessus de (C_v). 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q2 : Justifier graphiquement e^x - x > 0 (0,25 pt) ─────────────
    def chapitre_q2(self, fig_uv):
        badge = self.bandeau_question("Question 2", "0,25 pt")
        self.ardoise()
        axes = fig_uv["axes"]

        self.etape("q2-enonce")
        but = MathTex(
            r"\text{Justifier graphiquement : } \forall x\in\mathbb{R},\ e^x - x > 0",
            font_size=20,
        )
        self.ecrit(but)
        self.legende(
            "Lecture directe : comparer la hauteur des deux courbes",
            "en chaque abscisse x réel.",
        )
        self.pose(3.4)

        self.etape("q2-lecture-graphique")
        # Flèches d'écart verticales
        fl1 = Arrow(axes.c2p(-1, -1), axes.c2p(-1, math.exp(-1)), buff=0.04, color=COL_TOOL, stroke_width=2.5)
        fl2 = Arrow(axes.c2p(0, 0), axes.c2p(0, 1), buff=0.04, color=COL_TOOL, stroke_width=2.5)
        fl3 = Arrow(axes.c2p(1, 1), axes.c2p(1, math.e), buff=0.04, color=COL_TOOL, stroke_width=2.5)
        lbl_pos = MathTex(
            r"(\mathcal{C}_u) \text{ au-dessus de } (\mathcal{C}_v)",
            font_size=16, color=COL_TOOL,
        ).next_to(axes.c2p(-0.3, 3.8), LEFT, buff=0.1)

        self.play(Create(fl1), Create(fl2), Create(fl3), FadeIn(lbl_pos))
        m1 = MathTex(
            r"\text{Sur tout }\mathbb{R},\ (\mathcal{C}_u) \text{ est strictement au-dessus de } (\mathcal{C}_v)",
            font_size=18,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "Les deux courbes ne se coupent nulle part : l'exponentielle",
            "domine strictement la première bissectrice sur ℝ.",
        )
        self.pose(3.8)

        self.etape("q2-conclusion")
        m2 = MathTex(
            r"\forall x\in\mathbb{R},\ u(x) > v(x) \iff e^x > x \iff e^x - x > 0",
            font_size=22, color=COL_LIM,
        )
        self.ecrit(m2, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Inégalité fondamentale : garantit e^x - x > 0 partout,",
            "ce qui assure l'existence de ln(e^x - x) dans la Partie II. 0,25 point.",
        )
        self.pose(4.2)
        self.play(FadeOut(fl1), FadeOut(fl2), FadeOut(fl3), FadeOut(lbl_pos))
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3 : Aire délimitée par (C_u), (C_v), x=0 et x=1 (0,5 pt) ─────
    def chapitre_q3(self, fig_uv):
        badge = self.bandeau_question("Question 3", "0,5 pt")
        self.ardoise()
        axes = fig_uv["axes"]

        self.etape("q3-enonce")
        but = MathTex(
            r"\text{Calculer l'aire délimitée par } (\mathcal{C}_u), (\mathcal{C}_v), x=0 \text{ et } x=1",
            font_size=18,
        )
        self.ecrit(but)
        self.legende(
            "Domaine plan compris entre les deux courbes de x=0 à x=1 :",
            "u(x) ≥ v(x) sur [0,1], donc l'intégrale de u - v donne l'aire.",
        )
        self.pose(3.6)

        self.etape("q3-colorier-aire")
        # Surface entre x=0 et x=1
        xs = np.linspace(0, 1, 40)
        pts = [axes.c2p(x, math.exp(x)) for x in xs] + [axes.c2p(x, x) for x in reversed(xs)]
        poly_aire = Polygon(*pts, fill_color=COL_TOOL, fill_opacity=0.35, stroke_width=0)
        lbl_aire = MathTex(r"\mathcal{A}", font_size=20, color=COL_TOOL).move_to(axes.c2p(0.55, 1.15))

        self.play(FadeIn(poly_aire), FadeIn(lbl_aire))
        m1 = MathTex(
            r"\mathcal{A} = \int_0^1 \big(u(x) - v(x)\big)\,dx = \int_0^1 \left(e^x - x\right)\,dx",
            font_size=22,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("u(x) ≥ v(x) sur [0,1] d'après Q2 : pas de valeur absolue nécessaire.")
        self.pose(3.6)

        self.etape("q3-primitive")
        m2 = MathTex(
            r"\int_0^1 (e^x - x)\,dx = \left[ e^x - \dfrac{x^2}{2} \right]_0^1",
            font_size=22,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("Primitive élémentaire : l'exponentielle s'intègre en e^x, x s'intègre en x²/2.")
        self.pose(3.4)

        self.etape("q3-calcul")
        m3 = MathTex(
            r"= \left(e^1 - \dfrac{1^2}{2}\right) - \left(e^0 - \dfrac{0^2}{2}\right) = \left(e - \dfrac12\right) - 1",
            font_size=20,
        )
        self.ecrit(m3, buff=0.45)
        self.pose(3.4)

        self.etape("q3-conclusion")
        m4 = MathTex(
            r"\mathcal{A} = e - \dfrac{3}{2} \quad (\text{unités d'aire})",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "e - 3/2 ≈ 2,72 - 1,5 = 1,22 > 0 : valeur exacte conforme",
            "à l'aire visible sur la figure. 0,5 point.",
        )
        self.pose(4.2)
        self.play(FadeOut(poly_aire), FadeOut(lbl_aire))
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Plan Partie II (nouvelle figure repère pour f) ────────────────
    def chapitre_plan_partie2(self, fig_uv):
        self.etape("plan-axes-p2")
        # Effacement propre de la figure Partie I
        membres_uv = self.fig_membres(fig_uv)
        self.play(FadeOut(membres_uv))

        # Repère orthonormé pour Partie II : x ∈ [-4.0, 4.2], y ∈ [-3.0, 4.2]
        axes = Axes(
            x_range=[-4.2, 4.4, 1],
            y_range=[-3.2, 4.4, 1],
            x_length=5.2,
            y_length=5.0,
            tips=False,
            axis_config={"color": BAC_INK_MUTED, "stroke_width": 1.5},
        ).to_edge(RIGHT, buff=0.5).shift(DOWN * 0.1)

        lbl_x = axes.get_x_axis_label(MathTex("x", font_size=18, color=BAC_INK_MUTED), edge=RIGHT, direction=RIGHT)
        lbl_y = axes.get_y_axis_label(MathTex("y", font_size=18, color=BAC_INK_MUTED), edge=UP, direction=UP)
        orig = MathTex("O", font_size=18, color=BAC_INK_MUTED).next_to(axes.c2p(0, 0), DL, buff=0.1)

        # Droite (Δ) : y = x (restreinte au cadre des axes)
        droite_d = axes.plot(
            lambda x: x, x_range=[-3.0, 3.8],
            color=COL_SECOND, stroke_width=2.0,
        )
        lbl_delta = MathTex(
            r"(\Delta) : y = x", font_size=18, color=COL_SECOND
        ).next_to(axes.c2p(3.2, 3.2), UL, buff=0.1)

        # Courbe (C_f)
        courbe_f = axes.plot(
            _f, x_range=[-4.0, 4.2],
            color=COL_COURBE, stroke_width=3.5,
        )
        lbl_cf = MathTex(
            r"(\mathcal{C}_f)", font_size=20, color=COL_COURBE
        ).next_to(axes.c2p(3.2, _f(3.2)), DOWN, buff=0.15)

        self.play(Create(axes), FadeIn(lbl_x), FadeIn(lbl_y), FadeIn(orig))
        self.graduations(axes, [-4, -3, -2, -1, 1, 2, 3, 4], [-3, -2, -1, 1, 2, 3, 4])
        self.play(Create(droite_d), FadeIn(lbl_delta), Create(courbe_f, run_time=1.8), FadeIn(lbl_cf))

        self.legende(
            "Partie II : f(x) = x + 1 - ln(e^x - x).",
            "Repère orthonormé conforme au scan d'examen, avec (C_f) et (Δ) : y = x.",
        )
        self.pose(4.0)
        self.efface_legende()

        fig_f = {
            "axes": axes,
            "lbl_x": lbl_x,
            "lbl_y": lbl_y,
            "orig": orig,
            "droite_d": droite_d,
            "lbl_delta": lbl_delta,
            "courbe_f": courbe_f,
            "lbl_cf": lbl_cf,
            "group": VGroup(axes, lbl_x, lbl_y, orig, droite_d, lbl_delta, courbe_f, lbl_cf),
        }
        return fig_f

    # ── Q4 : f est définie sur ℝ (0,25 pt) ────────────────────────────
    def chapitre_q4(self, fig_f):
        badge = self.bandeau_question("Question 4", "0,25 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but = MathTex(
            r"\text{Vérifier que } f \text{ est définie sur } \mathbb{R}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "f(x) = x + 1 - ln(e^x - x) existe si et seulement si",
            "l'argument sous le logarithme est strictement positif.",
        )
        self.pose(3.4)

        self.etape("q4-condition-domaine")
        m1 = MathTex(
            r"x \in \mathcal{D}_f \iff e^x - x > 0 \quad (\text{domaine de } \ln, \text{ R1})",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("Le logarithme n'admet que des arguments strictement positifs (R1).")
        self.pose(3.4)

        self.etape("q4-conclusion")
        m2 = MathTex(
            r"\forall x\in\mathbb{R},\ e^x - x > 0 \quad (\text{Partie I, question 2})",
            font_size=20,
        )
        m3 = MathTex(
            r"\implies \mathcal{D}_f = \mathbb{R}",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(m2, buff=0.45)
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "La Partie I a fondé ce résultat : f est bien définie sur ℝ tout entier. 0,25 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 : Autre écriture f(x) = 1 - ln(1 - x e^-x) (0,5 pt) ────────
    def chapitre_q5(self, fig_f):
        badge = self.bandeau_question("Question 5", "0,5 pt")
        self.ardoise()

        self.etape("q5-enonce")
        but = MathTex(
            r"\text{Montrer que } \forall x\in\mathbb{R},\ f(x) = 1 - \ln\left(1 - xe^{-x}\right)",
            font_size=20,
        )
        self.ecrit(but)
        self.legende(
            "Objectif : préparer le calcul de la limite en +∞",
            "en isolant le terme dominant e^x sous le logarithme.",
        )
        self.pose(3.6)

        self.etape("q5-factorisation")
        m1 = MathTex(
            r"e^x - x = e^x\left(1 - \dfrac{x}{e^x}\right) = e^x\left(1 - xe^{-x}\right)",
            font_size=21,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("On factorise par e^x, strictement positif et jamais nul pour tout x réel.")
        self.pose(3.4)

        self.etape("q5-propriete-ln")
        m2 = MathTex(
            r"\ln\left(e^x - x\right) = \ln(e^x) + \ln\left(1 - xe^{-x}\right) \quad (\text{propriété R2})",
            font_size=20,
        )
        m3 = MathTex(
            r"= x + \ln\left(1 - xe^{-x}\right) \quad (\ln(e^x) = x)",
            font_size=20, color=COL_MATH,
        )
        self.ecrit(m2, buff=0.45)
        self.ecrit(m3, buff=0.3)
        self.legende("Propriété du produit (R2) : ln(ab) = ln a + ln b ; ln et exp sont réciproques.")
        self.pose(3.6)

        self.etape("q5-conclusion")
        m4 = MathTex(
            r"f(x) = x + 1 - \Big[x + \ln\left(1 - xe^{-x}\right)\Big] = 1 - \ln\left(1 - xe^{-x}\right)",
            font_size=21, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Les termes en x se compensent exactement : écriture validée. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q6 : Limite en +∞ et asymptote horizontale (0,5 pt) ───────────
    def chapitre_q6(self, fig_f):
        badge = self.bandeau_question("Question 6", "0,5 pt")
        self.ardoise()
        axes = fig_f["axes"]

        self.etape("q6-enonce")
        but = MathTex(
            r"\lim_{x\to+\infty} f(x) = 1 \quad \text{et interprétation géométrique}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "On utilise la forme établie à la question précédente :",
            "f(x) = 1 - ln(1 - x e^-x).",
        )
        self.pose(3.4)

        self.etape("q6-croissance-comparee")
        m1 = MathTex(
            r"\lim_{x\to+\infty} xe^{-x} = 0 \quad (\text{croissance comparée de l'exponentielle})",
            font_size=19,
        )
        self.ecrit(m1, buff=0.45)
        self.legende(
            "L'exponentielle e^-x écrase x en +∞ (limite de référence).",
        )
        self.pose(3.4)

        self.etape("q6-limite-composee")
        m2 = MathTex(
            r"\lim_{x\to+\infty} \left(1 - xe^{-x}\right) = 1 \implies \lim_{x\to+\infty} \ln\left(1 - xe^{-x}\right) = \ln(1) = 0",
            font_size=19,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("Par continuité de ln en 1 (R1/R5) : ln(1) = 0.")
        self.pose(3.4)

        self.etape("q6-conclusion")
        m3 = MathTex(
            r"\lim_{x\to+\infty} f(x) = 1 - 0 = 1",
            font_size=28, color=COL_LIM,
        )
        m4 = Text(
            "La droite y = 1 est asymptote horizontale à (C_f) en +∞",
            font_size=17, color=COL_ASYMPT, weight="BOLD",
        )
        self.ecrit(m3, buff=0.5)
        self.ecrit(m4, buff=0.4)
        self.encadre(couleur=COL_LIM)

        # Tracé de l'asymptote horizontale sur la figure
        asympt = DashedLine(
            axes.c2p(0.0, 1.0), axes.c2p(4.3, 1.0),
            color=COL_ASYMPT, stroke_width=2.5, dash_length=0.1,
        )
        lbl_asympt = MathTex(
            r"y = 1", font_size=18, color=COL_ASYMPT
        ).next_to(axes.c2p(3.8, 1.0), UP, buff=0.08)
        self.play(Create(asympt, run_time=1.2), FadeIn(lbl_asympt))
        fig_f["asympt"] = asympt
        fig_f["lbl_asympt"] = lbl_asympt
        fig_f["group"].add(asympt, lbl_asympt)

        self.legende(
            "Quand x → +∞, la courbe se rapproche indéfiniment de la droite y = 1.",
            "0,5 point (0,25 pt limite + 0,25 pt interprétation).",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q7 : Limite en -∞ (0,25 pt) ───────────────────────────────────
    def chapitre_q7(self, fig_f):
        badge = self.bandeau_question("Question 7", "0,25 pt")
        self.ardoise()

        self.etape("q7-enonce")
        but = MathTex(
            r"\text{Calculer } \lim_{x\to-\infty} f(x)",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "On étudie chaque terme de f(x) = x + 1 - ln(e^x - x)",
            "au voisinage de -∞.",
        )
        self.pose(3.2)

        self.etape("q7-terme-ln")
        m1 = MathTex(
            r"\lim_{x\to-\infty} e^x = 0 \quad \text{et} \quad \lim_{x\to-\infty} (-x) = +\infty",
            font_size=20,
        )
        m2 = MathTex(
            r"\implies \lim_{x\to-\infty} \left(e^x - x\right) = +\infty \implies \lim_{x\to-\infty} \ln\left(e^x - x\right) = +\infty \quad (\text{R4})",
            font_size=18,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.35)
        self.legende("L'argument e^x - x tend vers +∞, donc son logarithme tend vers +∞ (R4).")
        self.pose(3.6)

        self.etape("q7-conclusion")
        m3 = MathTex(
            r"\lim_{x\to-\infty} (x+1) = -\infty \quad \text{et} \quad \lim_{x\to-\infty} -\ln(e^x-x) = -\infty",
            font_size=19,
        )
        m4 = MathTex(
            r"\lim_{x\to-\infty} f(x) = -\infty",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.45)
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Somme de deux termes qui tirent vers -∞ : pas d'indétermination. 0,25 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q8 : Autre écriture pour x < 0 (0,5 pt) ───────────────────────
    def chapitre_q8(self, fig_f):
        badge = self.bandeau_question("Question 8", "0,5 pt")
        self.ardoise()

        self.etape("q8-enonce")
        but = MathTex(
            r"\text{Montrer que pour } x < 0 : f(x) = x + 1 - \ln(-x) - \ln\left(1 - \dfrac{1}{xe^{-x}}\right)",
            font_size=18,
        )
        self.ecrit(but)
        self.legende(
            "Objectif : préparer l'étude de la branche infinie en -∞",
            "en factorisant cette fois par -x > 0.",
        )
        self.pose(3.6)

        self.etape("q8-factorisation-neg")
        m1 = MathTex(
            r"x < 0 \implies -x > 0 \quad \text{et} \quad e^x - x = -x\left(1 - \dfrac{e^x}{x}\right)",
            font_size=20,
        )
        m2 = MathTex(
            r"= -x\left(1 - \dfrac{1}{xe^{-x}}\right) \quad \left(\dfrac{e^x}{x} = \dfrac{1}{xe^{-x}}\right)",
            font_size=20, color=COL_MATH,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.3)
        self.legende("Factorisation par -x, strictement positif pour tout x négatif.")
        self.pose(3.6)

        self.etape("q8-propriete-produit")
        m3 = MathTex(
            r"\ln\left(e^x - x\right) = \ln(-x) + \ln\left(1 - \dfrac{1}{xe^{-x}}\right) \quad (\text{propriété R2})",
            font_size=19,
        )
        self.ecrit(m3, buff=0.45)
        self.legende("Les deux facteurs sont strictement positifs pour x < 0 : R2 s'applique.")
        self.pose(3.4)

        self.etape("q8-conclusion")
        m4 = MathTex(
            r"f(x) = x + 1 - \ln(-x) - \ln\left(1 - \dfrac{1}{xe^{-x}}\right)",
            font_size=20, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("Forme établie pour tout x < 0. 0,5 point.")
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q9 : Branche parabolique en -∞ de direction y = x (0,75 pt) ───
    def chapitre_q9(self, fig_f):
        badge = self.bandeau_question("Question 9", "0,75 pt")
        self.ardoise()

        self.etape("q9-enonce")
        but = MathTex(
            r"\lim_{x\to-\infty} \dfrac{f(x)}{x} = 1 \quad \text{et branche parabolique de direction } y = x",
            font_size=19,
        )
        self.ecrit(but)
        self.legende(
            "On divise la formule de Q8 par x pour déterminer la direction asymptotique.",
        )
        self.pose(3.4)

        self.etape("q9-division-par-x")
        m1 = MathTex(
            r"\dfrac{f(x)}{x} = 1 + \dfrac1x - \dfrac{\ln(-x)}{x} - \dfrac1x \ln\left(1 - \dfrac{1}{xe^{-x}}\right)",
            font_size=18,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("Chaque terme est analysé quand x → -∞.")
        self.pose(3.4)

        self.etape("q9-croissances-comparees")
        m2 = MathTex(
            r"X = -x \to +\infty \implies -\dfrac{\ln(-x)}{x} = \dfrac{\ln X}{X} \xrightarrow[X\to+\infty]{} 0 \quad (\text{R4})",
            font_size=18,
        )
        m3 = MathTex(
            r"xe^{-x} = -Xe^X \to -\infty \implies \dfrac{1}{xe^{-x}} \to 0 \implies \ln(1) = 0",
            font_size=18, color=COL_MATH,
        )
        self.ecrit(m2, buff=0.45)
        self.ecrit(m3, buff=0.3)
        self.legende("Croissance comparée (R4) et écrasement par l'exponentielle.")
        self.pose(3.6)

        self.etape("q9-limite-pente")
        m4 = MathTex(
            r"\lim_{x\to-\infty} \dfrac{f(x)}{x} = 1 + 0 - 0 - 0 = 1",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.45)
        self.legende("La pente asymptotique vaut 1 : même direction que (Δ) : y = x.")
        self.pose(3.4)

        self.etape("q9-conclusion-branche")
        m5 = MathTex(
            r"\lim_{x\to-\infty} \big(f(x) - x\big) = \lim_{x\to-\infty} \Big(1 - \ln(e^x-x)\Big) = -\infty",
            font_size=19,
        )
        m6 = Text(
            "(C_f) admet une branche parabolique de direction (Δ) : y = x en -∞",
            font_size=16, color=COL_BRANCH, weight="BOLD",
        )
        self.ecrit(m5, buff=0.45)
        self.ecrit(m6, buff=0.4)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Pas d'asymptote oblique : la courbe s'éloigne indéfiniment de (Δ) en suivant sa direction.",
            "0,75 point (0,5 pt limite + 0,25 pt branche parabolique).",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q10 : Dérivée f'(x) = (1-x)/(e^x - x) (0,5 pt) ────────────────
    def chapitre_q10(self, fig_f):
        badge = self.bandeau_question("Question 10", "0,5 pt")
        self.ardoise()

        self.etape("q10-enonce")
        but = MathTex(
            r"\text{Montrer que } \forall x\in\mathbb{R} : f'(x) = \dfrac{1 - x}{e^x - x}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "Dérivation de f(x) = x + 1 - ln(u(x)) avec u(x) = e^x - x.",
        )
        self.pose(3.4)

        self.etape("q10-derivee-composee")
        m1 = MathTex(
            r"u(x) = e^x - x > 0 \implies u'(x) = e^x - 1",
            font_size=20,
        )
        m2 = MathTex(
            r"\Big(\ln(e^x - x)\Big)' = \dfrac{u'(x)}{u(x)} = \dfrac{e^x - 1}{e^x - x} \quad (\text{règle R3})",
            font_size=20, color=COL_DERIV,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.35)
        self.legende("Formule (ln u)' = u'/u (R3) appliquée à u(x) = e^x - x.")
        self.pose(3.6)

        self.etape("q10-calcul-derivee")
        m3 = MathTex(
            r"f'(x) = 1 - \dfrac{e^x - 1}{e^x - x} = \dfrac{(e^x - x) - (e^x - 1)}{e^x - x}",
            font_size=21,
        )
        self.ecrit(m3, buff=0.45)
        self.legende("Mise au même dénominateur e^x - x > 0.")
        self.pose(3.4)

        self.etape("q10-conclusion")
        m4 = MathTex(
            r"f'(x) = \dfrac{1 - x}{e^x - x}",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("Les e^x se simplifient au numérateur. 0,5 point.")
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q11 : Signe de f' et tableau de variations (0,5 pt) ───────────
    def chapitre_q11(self, fig_f):
        badge = self.bandeau_question("Question 11", "0,5 pt")
        self.ardoise()
        axes = fig_f["axes"]

        self.etape("q11-enonce")
        but = MathTex(
            r"\text{Signe de } f'(x) \text{ et tableau de variations de } f \text{ sur } \mathbb{R}",
            font_size=20,
        )
        self.ecrit(but)
        self.legende(
            "Le dénominateur est strictement positif sur ℝ (Partie I Q2) :",
            "le signe de f' dépend uniquement du numérateur 1 - x.",
        )
        self.pose(3.6)

        self.etape("q11-signe-derivee")
        m1 = MathTex(
            r"\forall x\in\mathbb{R},\ e^x - x > 0 \implies \text{signe}\big(f'(x)\big) = \text{signe}(1 - x)",
            font_size=19,
        )
        m2 = MathTex(
            r"f'(x) > 0 \text{ sur } ]-\infty, 1[, \quad f'(1) = 0, \quad f'(x) < 0 \text{ sur } ]1, +\infty[",
            font_size=18, color=COL_DERIV,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.35)
        self.legende("f est strictement croissante sur ]-∞, 1] puis strictement décroissante sur [1, +∞[.")
        self.pose(3.8)

        self.etape("q11-maximum-f")
        m3 = MathTex(
            r"f(1) = 1 + 1 - \ln(e^1 - 1) = 2 - \ln(e - 1) \approx 1{,}46",
            font_size=20, color=COL_VALEUR,
        )
        self.ecrit(m3, buff=0.45)

        # Marquer le maximum sur la figure avec sa tangente horizontale
        pt_max = Dot(axes.c2p(1.0, F_MAX), radius=0.06, color=COL_VALEUR)
        tang_h = Line(
            axes.c2p(0.3, F_MAX), axes.c2p(1.7, F_MAX),
            color=COL_TANGENTE, stroke_width=2.5,
        )
        lbl_max = MathTex(
            r"(1, 2-\ln(e-1))", font_size=16, color=COL_VALEUR
        ).next_to(pt_max, UP, buff=0.1)
        self.play(FadeIn(pt_max), Create(tang_h), FadeIn(lbl_max))
        fig_f["pt_max"] = pt_max
        fig_f["tang_h"] = tang_h
        fig_f["lbl_max"] = lbl_max
        fig_f["group"].add(pt_max, tang_h, lbl_max)

        self.legende("f admet un maximum absolu en x = 1, valant f(1) = 2 - ln(e-1).")
        self.pose(3.8)

        self.etape("q11-conclusion")
        m4 = Text(
            "f croît de -∞ à 2 - ln(e-1), puis décroît vers 1 (asymptote)",
            font_size=17, color=COL_LIM, weight="BOLD",
        )
        self.ecrit(m4, buff=0.5)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Tableau de variations complet validé. 0,5 point.",
        )
        self.pose(4.0)
        self.play(FadeOut(lbl_max), FadeOut(tang_h))
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q12 : Zéro unique sur ]-1, 0[ via TVI (0,75 pt) ──────────────
    def chapitre_q12(self, fig_f):
        badge = self.bandeau_question("Question 12", "0,75 pt")
        self.ardoise()
        axes = fig_f["axes"]

        self.etape("q12-enonce")
        but = MathTex(
            r"\text{Montrer que } f(x) = 0 \text{ admet une solution unique dans } ]-1, 0[",
            font_size=19,
        )
        self.ecrit(but)
        self.legende(
            "Application du corollaire du théorème des valeurs intermédiaires (TVI) :",
            "continuité, stricte monotonie et changement de signe.",
        )
        self.pose(3.6)

        self.etape("q12-continuite-monotonie")
        m1 = MathTex(
            r"f \text{ est continue et strictement croissante sur } [-1, 0] \subset ]-\infty, 1]",
            font_size=19,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("[-1, 0] est inclus dans la branche croissante de f.")
        self.pose(3.4)

        self.etape("q12-calcul-images")
        m2 = MathTex(
            r"f(-1) = -1 + 1 - \ln(e^{-1} + 1) = -\ln\left(\dfrac1e + 1\right) \approx -0{,}31 < 0",
            font_size=18,
        )
        m3 = MathTex(
            r"f(0) = 0 + 1 - \ln(e^0 - 0) = 1 - \ln(1) = 1 > 0",
            font_size=19, color=COL_MATH,
        )
        self.ecrit(m2, buff=0.45)
        self.ecrit(m3, buff=0.3)
        self.legende("f(-1) < 0 et f(0) > 0 : 0 est strictement compris entre f(-1) et f(0).")
        self.pose(3.6)

        self.etape("q12-conclusion")
        m4 = MathTex(
            r"f(-1) \times f(0) < 0 \implies \exists!\, x_0 \in ]-1, 0[,\ f(x_0) = 0",
            font_size=22, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)

        # Zéro sur la figure
        x0_val = -0.47
        pt_zero = Dot(axes.c2p(x0_val, 0), radius=0.06, color=COL_LIM)
        lbl_zero = MathTex(r"x_0", font_size=16, color=COL_LIM).next_to(pt_zero, DR, buff=0.08)
        self.play(FadeIn(pt_zero), FadeIn(lbl_zero))

        self.legende(
            "Le corollaire du TVI garantit l'existence et l'unicité du zéro x_0. 0,75 point.",
        )
        self.pose(4.2)
        self.play(FadeOut(pt_zero), FadeOut(lbl_zero))
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q13 : Points fixes α et β de f(x) = x (0,5 pt) ────────────────
    def chapitre_q13(self, fig_f):
        badge = self.bandeau_question("Question 13", "0,5 pt")
        self.ardoise()
        axes = fig_f["axes"]

        self.etape("q13-enonce")
        but = MathTex(
            r"\text{Justifier graphiquement que } f(x) = x \text{ admet 2 solutions : } \alpha \text{ et } \beta",
            font_size=18,
        )
        self.ecrit(but)
        self.legende(
            "L'équation f(x) = x correspond aux intersections",
            "entre la courbe (C_f) et la première bissectrice (Δ) : y = x.",
        )
        self.pose(3.6)

        self.etape("q13-intersections")
        # Marquer α et β sur la figure
        pt_alpha = Dot(axes.c2p(ALPHA_VAL, ALPHA_VAL), radius=0.06, color=COL_TOOL)
        pt_beta = Dot(axes.c2p(BETA_VAL, BETA_VAL), radius=0.06, color=COL_TOOL)
        lbl_alpha = MathTex(r"\alpha \approx -2{,}65", font_size=16, color=COL_TOOL).next_to(pt_alpha, DL, buff=0.08)
        lbl_beta = MathTex(r"\beta \approx 1{,}42", font_size=16, color=COL_TOOL).next_to(pt_beta, DR, buff=0.1)

        self.play(FadeIn(pt_alpha), FadeIn(lbl_alpha), FadeIn(pt_beta), FadeIn(lbl_beta))
        fig_f["pt_alpha"] = pt_alpha
        fig_f["lbl_alpha"] = lbl_alpha
        fig_f["pt_beta"] = pt_beta
        fig_f["lbl_beta"] = lbl_beta
        fig_f["group"].add(pt_alpha, lbl_alpha, pt_beta, lbl_beta)

        m1 = MathTex(
            r"(\mathcal{C}_f) \text{ et } (\Delta) \text{ se coupent en exactement 2 points distincts}",
            font_size=19,
        )
        m2 = MathTex(
            r"\alpha \in ]-3, -2[ \quad (\alpha \approx -2{,}65) \quad \text{et} \quad \beta \in ]1, 2[ \quad (\beta \approx 1{,}42)",
            font_size=18, color=COL_TOOL,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.35)
        self.legende("Une intersection sur la branche croissante ]-∞, 1], une sur la branche décroissante [1, +∞[.")
        self.pose(3.8)

        self.etape("q13-conclusion")
        m3 = MathTex(
            r"\text{L'équation } f(x) = x \text{ admet exactement deux solutions : } \alpha \text{ et } \beta",
            font_size=20, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Stricte monotonie sur chaque branche : pas d'autre solution possible. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q14 : Relation e^α - e^β = α - β (0,5 pt) ─────────────────────
    def chapitre_q14(self, fig_f):
        badge = self.bandeau_question("Question 14", "0,5 pt")
        self.ardoise()

        self.etape("q14-enonce")
        but = MathTex(
            r"\text{Montrer que } e^\alpha - e^\beta = \alpha - \beta",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "On traduit que α et β sont solutions de l'équation f(x) = x.",
        )
        self.pose(3.4)

        self.etape("q14-equation-point-fixe")
        m1 = MathTex(
            r"f(x) = x \iff x + 1 - \ln(e^x - x) = x",
            font_size=21,
        )
        m2 = MathTex(
            r"\iff \ln(e^x - x) = 1 = \ln(e) \iff e^x - x = e",
            font_size=21, color=COL_MATH,
        )
        self.ecrit(m1, buff=0.45)
        self.ecrit(m2, buff=0.35)
        self.legende("Par injectivité de la fonction logarithme (R1) : ln A = ln B <=> A = B.")
        self.pose(3.6)

        self.etape("q14-difference")
        m3 = MathTex(
            r"e^\alpha - \alpha = e \quad \text{et} \quad e^\beta - \beta = e",
            font_size=20,
        )
        m4 = MathTex(
            r"(e^\alpha - \alpha) - (e^\beta - \beta) = e - e = 0",
            font_size=21,
        )
        self.ecrit(m3, buff=0.45)
        self.ecrit(m4, buff=0.35)
        self.legende("On soustrait membre à membre les deux égalités.")
        self.pose(3.4)

        self.etape("q14-conclusion")
        m5 = MathTex(
            r"e^\alpha - e^\beta = \alpha - \beta",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(m5, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Égalité algébrique démontrée élégamment à partir de la définition des points fixes. 0,5 point.",
        )
        self.pose(4.0)
        if "pt_alpha" in fig_f:
            self.play(
                FadeOut(fig_f["pt_alpha"]), FadeOut(fig_f["lbl_alpha"]),
                FadeOut(fig_f["pt_beta"]), FadeOut(fig_f["lbl_beta"]),
            )
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q15 : Réciproque g^-1 sur J (0,5 pt) ──────────────────────────
    def chapitre_q15(self, fig_f):
        badge = self.bandeau_question("Question 15", "0,5 pt")
        self.ardoise()

        self.etape("q15-enonce")
        but = MathTex(
            r"g = f_{|]-\infty, 1]} \text{ admet une réciproque } g^{-1} \text{ définie sur } J \text{ à préciser}",
            font_size=18,
        )
        self.ecrit(but)
        self.legende(
            "Théorème de la bijection : continuité et stricte monotonie",
            "sur l'intervalle I = ]-∞, 1].",
        )
        self.pose(3.6)

        self.etape("q15-theoreme-bijection")
        m1 = MathTex(
            r"g \text{ est continue et strictement croissante sur } I = ]-\infty, 1]",
            font_size=20,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("Propriétés héritées de f sur son intervalle de stricte croissance.")
        self.pose(3.4)

        self.etape("q15-intervalle-image")
        m2 = MathTex(
            r"J = g(I) = \left] \lim_{x\to-\infty} g(x),\, g(1) \right] = \Big] -\infty,\, 2 - \ln(e-1) \Big]",
            font_size=20,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("L'image de l'intervalle I par g est l'intervalle J = ]-∞, 2-ln(e-1)].")
        self.pose(3.6)

        self.etape("q15-conclusion")
        m3 = MathTex(
            r"g \text{ est une bijection de } I \text{ sur } J = \Big]-\infty,\, 2 - \ln(e-1)\Big]",
            font_size=20, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "g admet donc une fonction réciproque g^-1 définie sur J. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q16 : Dérivabilité de g^-1 en 1 et (g^-1)'(1) = 1 (0,75 pt) ───
    def chapitre_q16(self, fig_f):
        badge = self.bandeau_question("Question 16", "0,75 pt")
        self.ardoise()

        self.etape("q16-enonce")
        but = MathTex(
            r"\text{Montrer que } g^{-1} \text{ est dérivable en } 1 \text{ et calculer } (g^{-1})'(1)",
            font_size=19,
        )
        self.ecrit(but)
        self.legende(
            "Théorème de dérivation de la réciproque :",
            "(g^-1)'(y_0) = 1 / g'(x_0) avec y_0 = g(x_0) et g'(x_0) ≠ 0.",
        )
        self.pose(3.6)

        self.etape("q16-antecedent")
        m1 = MathTex(
            r"g(0) = f(0) = 1 \quad \text{avec } 0 \in I = ]-\infty, 1]",
            font_size=21,
        )
        self.ecrit(m1, buff=0.45)
        self.legende("L'antécédent de 1 par g est x_0 = 0.")
        self.pose(3.4)

        self.etape("q16-derivee-en-zero")
        m2 = MathTex(
            r"g'(0) = f'(0) = \dfrac{1 - 0}{e^0 - 0} = \dfrac{1}{1} = 1 \neq 0",
            font_size=22, color=COL_DERIV,
        )
        self.ecrit(m2, buff=0.45)
        self.legende("g est dérivable en 0 et sa dérivée en 0 est non nulle.")
        self.pose(3.4)

        self.etape("q16-conclusion")
        m3 = MathTex(
            r"(g^{-1})'(1) = \dfrac{1}{g'(0)} = \dfrac{1}{1} = 1",
            font_size=28, color=COL_LIM,
        )
        m4 = Text(
            "g^-1 est dérivable en 1 et (g^-1)'(1) = 1",
            font_size=18, color=COL_LIM, weight="BOLD",
        )
        self.ecrit(m3, buff=0.55)
        self.ecrit(m4, buff=0.4)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Théorème de la dérivée réciproque vérifié et appliqué : (g^-1)'(1) = 1.",
            "0,75 point (0,5 pt dérivabilité + 0,25 pt calcul).",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Bilan final ───────────────────────────────────────────────────
    def chapitre_fin(self, fig_f):
        self.etape("bilan")
        self.ardoise()

        # Effacement du repère Partie II pour un bilan pleine page
        membres_f = self.fig_membres(fig_f)
        self.play(FadeOut(membres_f))

        cadre = Rectangle(
            width=12.0, height=6.2,
            stroke_color=COL_TITLE, stroke_width=2.5,
            fill_color=BAC_BG, fill_opacity=0.95,
        ).move_to(ORIGIN)

        titre = Text(
            "Synthèse du Problème — Bac 2024 SN (8 points)",
            font_size=22, color=COL_TITLE, weight="BOLD",
        ).next_to(cadre.get_top(), DOWN, buff=0.35)

        t_p1 = Text(
            "• Partie I (1,25 pt) : (C_u) au-dessus de (C_v) => e^x - x > 0 ; Aire = e - 3/2",
            font_size=16, color=BAC_INK,
        ).next_to(titre, DOWN, buff=0.4).to_edge(LEFT, buff=1.0)

        t_p2a = Text(
            "• Partie II.1 (2,0 pts) : D_f = ℝ ; limites : en +∞ => 1 (asymptote y=1) ; en -∞ => -∞ (BP direction y=x)",
            font_size=16, color=BAC_INK,
        ).next_to(t_p1, DOWN, buff=0.3).to_edge(LEFT, buff=1.0)

        t_p2b = Text(
            "• Partie II.2 (1,75 pt) : f'(x)=(1-x)/(e^x-x), max en 1 = 2-ln(e-1) ; zéro unique x_0 ∈ ]-1, 0[",
            font_size=16, color=BAC_INK,
        ).next_to(t_p2a, DOWN, buff=0.3).to_edge(LEFT, buff=1.0)

        t_p2c = Text(
            "• Partie II.3 (1,75 pt) : f(x)=x => 2 solutions α, β avec e^α-e^β=α-β ; bijection g et (g^-1)'(1)=1",
            font_size=16, color=BAC_INK,
        ).next_to(t_p2b, DOWN, buff=0.3).to_edge(LEFT, buff=1.0)

        badge_score = Text(
            "Score total : 8,0 / 8,0 points — 16 questions traitées",
            font_size=18, color=COL_LIM, weight="BOLD",
        ).next_to(t_p2c, DOWN, buff=0.45).to_edge(LEFT, buff=1.0)

        self.play(Create(cadre), FadeIn(titre))
        self.play(FadeIn(t_p1), FadeIn(t_p2a), FadeIn(t_p2b), FadeIn(t_p2c))
        self.play(FadeIn(badge_score))
        self.legende(
            "Toutes les questions du problème 2024 ont été résolues avec rigueur,",
            "illustrations géométriques et justification complète. 8 / 8 points.",
        )
        self.pose(5.0)





