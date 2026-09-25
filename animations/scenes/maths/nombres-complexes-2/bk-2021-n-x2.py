# scene_class: Explication
# bank_entry: bk-2021-n-x2
# title: Équation par relations coefficients-racines, rotations d'angle π/2 et cocyclicité
# notion: nombres-complexes-2
# session: 2021-normale-sm
# bareme: 4 points

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Axes,
    ComplexPlane,
    Circle,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    Polygon,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    ORIGIN,
    RIGHT,
    UP,
    UR,
    UL,
    DL,
    DR,
    PI,
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
    BAC_BG,
    BAC_SURFACE_RAISED,
)

# ── Palette sémantique ────────────────────────────────────────────────
COL_TITLE = BAC_ACCENT_STRONG
COL_MATH = BAC_INK
COL_EMPH = BAC_ACCENT
COL_WARN = BAC_ERROR
COL_SUCCESS = BAC_SUCCESS
COL_POINT_A = BAC_ACCENT_STRONG
COL_POINT_B = BAC_ACCENT
COL_POINT_C = BAC_ERROR
COL_POINT_D = BAC_SUCCESS
COL_POINT_P = "#16a34a"  # vert émeraude
COL_POINT_Q = "#9333ea"  # violet
COL_POINT_K = "#ea580c"  # orange vif

# ── Textes narratifs ──────────────────────────────────────────────────
NARRATION = {
    "titre": "Baccalauréat National 2021, Session Normale, Sciences Mathématiques. Exercice deux : équation cubique et relations de Viète, rotations et cocyclicité.",
    "intro": "L'exercice comporte trois parties : factorisation directe d'une équation du second degré, géométrie des rotations et configuration d'un carré cocyclique.",
    "q1a": "Question 1a : L'équation est sous forme somme-produit. On vérifie directement que c et a plus b en sont les deux racines distinctes.",
    "q1a_sol": "Conclusion pour la question 1a : l'ensemble des solutions de l'équation E est S égale l'ensemble formé de c et de a plus b.",
    "q1b": "Question 1b : En factorisant par l'angle moyen 5 pi sur 12, on obtient les formes exponentielles exactes des deux solutions.",
    "q1b_sol": "Formes exponentielles simplifiées grâce aux valeurs remarquables de cosinus et sinus de pi sur 12.",
    "q2a_p": "Question 2a : Formule du centre de rotation d'angle pi sur 2 envoyant B sur A, donnant 2p.",
    "q2a_q": "Question 2a suite : Formule du centre de rotation d'angle moins pi sur 2 envoyant C sur A, donnant 2q.",
    "q2b": "Question 2b : La différence p moins d vaut i facteur de q moins d, d'où un rapport égal à i.",
    "q2c": "Question 2c : Le rapport i prouve simultanément que le triangle PDQ est rectangle et isocèle en D.",
    "q3a": "Question 3a : Expression du milieu K de EF en fonction de a, b et c par simplification des affixes.",
    "q3b_para": "Question 3b : L'égalité d plus k égale p plus q prouve que DPKQ est un parallélogramme.",
    "q3b_carre": "Question 3b : Ayant deux côtés adjacents égaux et perpendiculaires, DPKQ est un carré, donc ses quatre sommets sont cocycliques.",
    "bilan": "Synthèse complète de l'exercice : équations de Viète, géométrie des rotations et cocyclicité démontrée avec rigueur.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Partie I : Équation (E) et formes exponentielles ─────────
        self.chapitre_q1a()
        self.chapitre_q1b()

        # ── Partie II & III : Figure géométrique ──────────────────────
        fig = self.chapitre_q2a_setup()
        self.chapitre_q2a_q(fig)
        self.chapitre_q2b(fig)
        self.chapitre_q2c(fig)
        self.chapitre_q3a(fig)
        self.chapitre_q3b_para(fig)
        self.chapitre_q3b_carre(fig)

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin(fig)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        titre = Text(
            "Bac 2021 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.8)
        sous_titre = Text(
            "Exercice 2 : Relations coefficients-racines, Rotations & Cocyclicité",
            font_size=20,
            color=BAC_INK_SOFT,
        ).next_to(titre, DOWN, buff=0.3)
        badge = Text(
            "Barème : 4 points • 7 questions • Sciences Mathématiques",
            font_size=16,
            color=COL_EMPH,
        ).next_to(sous_titre, DOWN, buff=0.4)

        self.play(FadeIn(titre), FadeIn(sous_titre), FadeIn(badge), run_time=1.0)
        self.legende(NARRATION["titre"])
        self.pose(1.5)
        self.play(FadeOut(titre), FadeOut(sous_titre), FadeOut(badge), run_time=0.6)

    # ── Introduction ──────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro")
        t_intro = Text("Structure de l'exercice :", font_size=22, color=COL_TITLE, weight="BOLD").to_edge(UP, buff=1.0)
        
        p1 = Text(
            "Partie I : Équation du second degré (E)\n"
            "• Reconnaissance de la forme somme/produit (Viète)\n"
            "• Formes exponentielles par factorisation d'angle moyen",
            font_size=16,
            color=COL_MATH,
            line_spacing=1.3,
        )
        p2 = Text(
            "Partie II & III : Géométrie des rotations et carré\n"
            "• Centres P et Q de rotations d'angles ±π/2 autour de ABC\n"
            "• Triangle PDQ rectangle isocèle en D (milieu de [BC])\n"
            "• Milieu K de [EF] et cocyclicité des points K, P, Q, D",
            font_size=16,
            color=COL_MATH,
            line_spacing=1.3,
        )

        carte = VGroup(p1, p2).arrange(DOWN, buff=0.5, aligned_edge=LEFT).next_to(t_intro, DOWN, buff=0.5)
        box = SurroundingRectangle(
            VGroup(t_intro, carte),
            color=BAC_ACCENT,
            buff=0.3,
            fill_color=BAC_SURFACE_RAISED,
            fill_opacity=0.5,
        )

        self.play(FadeIn(box), FadeIn(t_intro), FadeIn(carte), run_time=1.2)
        self.legende(NARRATION["intro"])
        self.pose(1.5)
        self.play(FadeOut(box), FadeOut(t_intro), FadeOut(carte), run_time=0.6)

    # ── Question 1a : Factorisation directe de (E) ────────────────────
    def chapitre_q1a(self):
        self.etape("q1a-viete")
        q_head = self.titre_question("1.a", "0,5 pt", x_pos=LEFT*2.5)
        enonce = self.texte_enonce("Résoudre dans ℂ l'équation : (E) : z² - (a+b+c)z + c(a+b) = 0.")

        t_viete = Text("Reconnaissance de la forme somme/produit (Viète) :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.35).to_edge(LEFT, buff=0.8)

        calc_dev = MathTex(
            r"(z-c)\big(z-(a+b)\big) = z^2 - \big(c+(a+b)\big)z + c(a+b) = z^2 - (a+b+c)z + c(a+b)",
            font_size=20,
            color=COL_MATH,
        ).next_to(t_viete, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        piege = Text(
            "Astuce : Inutile de calculer Δ ! L'énoncé donne directement la factorisation.",
            font_size=16,
            color=COL_WARN,
        ).next_to(calc_dev, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_viete), Write(calc_dev), run_time=1.2)
        self.play(FadeIn(piege), run_time=0.8)
        self.legende(NARRATION["q1a"])
        self.pose(1.5)

        self.etape("q1a-solutions")
        t_res = Text("Conclusion sur l'ensemble des solutions :", font_size=18, color=COL_EMPH).next_to(piege, DOWN, buff=0.35).to_edge(LEFT, buff=0.8)

        calc_sol = MathTex(
            r"(E) \iff (z-c)\big(z-(a+b)\big) = 0 \iff z = c \quad\text{ou}\quad z = a+b",
            font_size=20,
            color=COL_MATH,
        ).next_to(t_res, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        calc_set = MathTex(
            r"\mathcal{S} = \left\{\, c,\ a+b \,\right\} \qquad (\text{deux racines distinctes car } a+b \neq c)",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(calc_sol, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)
        cadre_set = SurroundingRectangle(calc_set, color=COL_SUCCESS, buff=0.15)

        self.play(FadeIn(t_res), Write(calc_sol), run_time=1.0)
        self.play(FadeIn(cadre_set), Write(calc_set), run_time=1.0)
        self.legende(NARRATION["q1a_sol"])
        self.pose(1.5)

    # ── Question 1b : Formes exponentielles ───────────────────────────
    def chapitre_q1b(self):
        # Efface la partie 1a
        self.nettoie_zone()

        self.etape("q1b-angle-moyen")
        q_head = self.titre_question("1.b", "0,5 pt", x_pos=LEFT*2.5)
        enonce = self.texte_enonce("Pour a = i, b = e^{iπ/3} et c = a - b, écrire les solutions sous forme exponentielle.")

        t_meth = Text("Factorisation par l'angle moyen (π/2 + π/3)/2 = 5π/12 :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)

        calc_apb = MathTex(
            r"a+b = e^{i\pi/2} + e^{i\pi/3} = e^{i\frac{5\pi}{12}}\left(e^{i\frac{\pi}{12}} + e^{-i\frac{\pi}{12}}\right) = 2\cos\left(\frac{\pi}{12}\right)e^{i\frac{5\pi}{12}}",
            font_size=19,
            color=COL_MATH,
        ).next_to(t_meth, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        calc_amb = MathTex(
            r"c = a-b = e^{i\pi/2} - e^{i\pi/3} = e^{i\frac{5\pi}{12}}\left(e^{i\frac{\pi}{12}} - e^{-i\frac{\pi}{12}}\right) = 2i\sin\left(\frac{\pi}{12}\right)e^{i\frac{5\pi}{12}}",
            font_size=19,
            color=COL_MATH,
        ).next_to(calc_apb, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_meth), Write(calc_apb), run_time=1.2)
        self.play(Write(calc_amb), run_time=1.0)
        self.legende(NARRATION["q1b"])
        self.pose(1.5)

        self.etape("q1b-formes-exponentielles")
        t_trigo = Text("Valeurs remarquables de cos(π/12) et sin(π/12) :", font_size=18, color=COL_EMPH).next_to(calc_amb, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)

        calc_val = MathTex(
            r"\cos\left(\frac{\pi}{12}\right) = \frac{\sqrt{6}+\sqrt{2}}{4} > 0, \qquad \sin\left(\frac{\pi}{12}\right) = \frac{\sqrt{6}-\sqrt{2}}{4} > 0, \quad i = e^{i\pi/2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_trigo, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        calc_sol_exp = MathTex(
            r"\mathcal{S} = \left\{\, \frac{\sqrt{6}-\sqrt{2}}{2}\,e^{i\frac{11\pi}{12}},\quad \frac{\sqrt{6}+\sqrt{2}}{2}\,e^{i\frac{5\pi}{12}} \,\right\}",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(calc_val, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)
        cadre_exp = SurroundingRectangle(calc_sol_exp, color=COL_SUCCESS, buff=0.15)

        self.play(FadeIn(t_trigo), Write(calc_val), run_time=1.0)
        self.play(FadeIn(cadre_exp), Write(calc_sol_exp), run_time=1.0)
        self.legende(NARRATION["q1b_sol"])
        self.pose(1.5)

    # ── Question 2a : Setup Figure & Centre P ─────────────────────────
    def chapitre_q2a_setup(self):
        # Efface la partie 1b
        self.nettoie_zone()

        self.etape("q2a-centre-p")

        # 1. Figure à droite
        axes = ComplexPlane(
            x_range=[-3.0, 4.0, 1],
            y_range=[-2.5, 4.5, 1],
            x_length=5.0,
            y_length=5.0,
            background_line_style={"stroke_color": BAC_BORDER, "stroke_width": 0.8, "stroke_opacity": 0.3},
        ).to_edge(RIGHT, buff=0.6).shift(DOWN*0.1)

        grad = self.graduations(axes, [-2, -1, 1, 2, 3], [-2, -1, 1, 2, 3, 4])
        t_re = Text("Re", font_size=16, color=BAC_INK_MUTED).next_to(axes.x_axis.get_end(), UR, buff=0.1)
        t_im = Text("Im", font_size=16, color=BAC_INK_MUTED).next_to(axes.y_axis.get_end(), UR, buff=0.1)

        # Points de base ABC
        # A = 0.5 + 2.0 i, B = -1.5 - 0.5 i, C = 2.0 - 1.0 i
        pt_a = Dot(axes.c2p(0.5, 2.0), color=COL_POINT_A, radius=0.07)
        pt_b = Dot(axes.c2p(-1.5, -0.5), color=COL_POINT_B, radius=0.07)
        pt_c = Dot(axes.c2p(2.0, -1.0), color=COL_POINT_C, radius=0.07)

        lbl_a = Text("A(a)", font_size=16, color=COL_POINT_A).next_to(pt_a, UP, buff=0.1)
        lbl_b = Text("B(b)", font_size=16, color=COL_POINT_B).next_to(pt_b, DL, buff=0.1)
        lbl_c = Text("C(c)", font_size=16, color=COL_POINT_C).next_to(pt_c, DR, buff=0.1)

        tri_abc = Polygon(
            axes.c2p(0.5, 2.0),
            axes.c2p(-1.5, -0.5),
            axes.c2p(2.0, -1.0),
            color=BAC_BORDER,
            stroke_width=1.5,
            stroke_opacity=0.6,
        )

        # Milieu D de [BC]
        pt_d = Dot(axes.c2p(0.25, -0.75), color=COL_POINT_D, radius=0.07)
        lbl_d = Text("D(d)", font_size=16, color=COL_POINT_D).next_to(pt_d, DOWN, buff=0.1)

        # Point P = -1.75 + 1.75 i
        pt_p = Dot(axes.c2p(-1.75, 1.75), color=COL_POINT_P, radius=0.07)
        lbl_p = Text("P(p)", font_size=16, color=COL_POINT_P).next_to(pt_p, UL, buff=0.1)

        fig = {
            "axes": axes,
            "grad": grad,
            "t_re": t_re,
            "t_im": t_im,
            "pt_a": pt_a,
            "lbl_a": lbl_a,
            "pt_b": pt_b,
            "lbl_b": lbl_b,
            "pt_c": pt_c,
            "lbl_c": lbl_c,
            "tri_abc": tri_abc,
            "pt_d": pt_d,
            "lbl_d": lbl_d,
            "pt_p": pt_p,
            "lbl_p": lbl_p,
        }

        # 2. Textes à gauche
        q_head = self.titre_question("2.a", "1,0 pt", x_pos=LEFT*2.0)
        enonce = self.texte_enonce("P centre de Rot(B→A, π/2), Q centre de Rot(C→A, -π/2).\nMontrer : 2p = b+a+(a-b)i et 2q = c+a+(c-a)i.")

        t_p = Text("1. Centre P (rotation d'angle π/2 envoyant B sur A) :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_p = MathTex(
            r"a - p = e^{i\pi/2}(b - p) = i(b - p) \iff p(1-i) = a - ib",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_p, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        calc_p2 = MathTex(
            r"p = \frac{(a-ib)(1+i)}{(1-i)(1+i)} = \frac{a+ai-ib+b}{2} = \frac{(a+b)+i(a-b)}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_p, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        res_p = MathTex(
            r"2p = b+a+(a-b)i",
            font_size=19,
            color=COL_POINT_P,
        ).next_to(calc_p2, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)
        cadre_p = SurroundingRectangle(res_p, color=COL_POINT_P, buff=0.12)

        fig["cadre_p"] = cadre_p

        # Animations
        self.play(
            Create(axes), FadeIn(t_re), FadeIn(t_im),
            FadeIn(pt_a), FadeIn(lbl_a),
            FadeIn(pt_b), FadeIn(lbl_b),
            FadeIn(pt_c), FadeIn(lbl_c),
            Create(tri_abc),
            FadeIn(pt_d), FadeIn(lbl_d),
            FadeIn(q_head), FadeIn(enonce),
            run_time=1.2,
        )
        self.play(FadeIn(t_p), Write(calc_p), run_time=1.0)
        self.play(Write(calc_p2), run_time=1.0)
        self.play(FadeIn(cadre_p), Write(res_p), FadeIn(pt_p), FadeIn(lbl_p), run_time=1.0)
        self.legende(NARRATION["q2a_p"])
        self.pose(1.5)

        return fig

    # ── Question 2a suite : Centre Q ──────────────────────────────────
    def chapitre_q2a_q(self, fig):
        self.etape("q2a-centre-q")

        cadre_p = fig["cadre_p"]
        t_q = Text("2. Centre Q (rotation d'angle -π/2 envoyant C sur A) :", font_size=17, color=COL_EMPH).next_to(cadre_p, DOWN, buff=0.2).to_edge(LEFT, buff=0.6)

        calc_q = MathTex(
            r"a - q = e^{-i\pi/2}(c - q) = -i(c - q) \iff q(1+i) = a + ic",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_q, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        calc_q2 = MathTex(
            r"q = \frac{(a+ic)(1-i)}{2} = \frac{(a+c)+i(c-a)}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_q, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        res_q = MathTex(
            r"2q = c+a+(c-a)i",
            font_size=19,
            color=COL_POINT_Q,
        ).next_to(calc_q2, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)
        cadre_q = SurroundingRectangle(res_q, color=COL_POINT_Q, buff=0.12)

        # Plot point Q sur figure : Q = 2.75 + 1.25 i
        axes = fig["axes"]
        pt_q = Dot(axes.c2p(2.75, 1.25), color=COL_POINT_Q, radius=0.07)
        lbl_q = Text("Q(q)", font_size=16, color=COL_POINT_Q).next_to(pt_q, UR, buff=0.1)
        fig["pt_q"] = pt_q
        fig["lbl_q"] = lbl_q

        self.play(FadeIn(t_q), Write(calc_q), run_time=1.0)
        self.play(Write(calc_q2), run_time=1.0)
        self.play(FadeIn(cadre_q), Write(res_q), FadeIn(pt_q), FadeIn(lbl_q), run_time=1.0)
        self.legende(NARRATION["q2a_q"])
        self.pose(1.5)

    # ── Question 2b : Calcul du quotient (p-d)/(q-d) ──────────────────
    def chapitre_q2b(self, fig):
        self.nettoie_zone_gauche(fig)
        self.etape("q2b-calcul-rapport")
        q_head = self.titre_question("2.b", "0,5 pt", x_pos=LEFT*2.0)
        enonce = self.texte_enonce("D milieu de [BC] (d = (b+c)/2). Calculer le quotient (p - d)/(q - d).")

        t_diff = Text("Différences par rapport au milieu D :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_pd = MathTex(
            r"p - d = \frac{(a+b)+i(a-b)}{2} - \frac{b+c}{2} = \frac{(a-c)+i(a-b)}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_diff, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_qd = MathTex(
            r"q - d = \frac{(a+c)+i(c-a)}{2} - \frac{b+c}{2} = \frac{(a-b)+i(c-a)}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_pd, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        t_factor = Text("Mise en facteur de i au dénominateur :", font_size=17, color=COL_EMPH).next_to(calc_qd, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_rel = MathTex(
            r"i(q-d) = \frac{i(a-b)-(c-a)}{2} = \frac{(a-c)+i(a-b)}{2} = p - d",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_factor, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        res_rap = MathTex(
            r"\frac{p - d}{q - d} = i",
            font_size=22,
            color=COL_SUCCESS,
        ).next_to(calc_rel, DOWN, buff=0.25).to_edge(LEFT, buff=0.8)
        cadre_rap = SurroundingRectangle(res_rap, color=COL_SUCCESS, buff=0.15)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_diff), Write(calc_pd), run_time=1.0)
        self.play(Write(calc_qd), run_time=1.0)
        self.play(FadeIn(t_factor), Write(calc_rel), run_time=1.0)
        self.play(FadeIn(cadre_rap), Write(res_rap), run_time=1.0)
        self.legende(NARRATION["q2b"])
        self.pose(1.5)

    # ── Question 2c : Nature du triangle PDQ ──────────────────────────
    def chapitre_q2c(self, fig):
        self.nettoie_zone_gauche(fig)
        self.etape("q2c-nature-pdq")
        q_head = self.titre_question("2.c", "0,5 pt", x_pos=LEFT*2.0)
        enonce = self.texte_enonce("En déduire la nature du triangle PDQ.")

        t_geom = Text("Interprétation géométrique du quotient complexe :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_mod = MathTex(
            r"\left|\frac{p-d}{q-d}\right| = |i| = 1 \iff \frac{DP}{DQ} = 1 \iff DP = DQ",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_geom, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_arg = MathTex(
            r"\arg\left(\frac{p-d}{q-d}\right) \equiv \arg(i) \equiv \frac{\pi}{2}\ [2\pi] \iff \left(\vec{DQ},\,\vec{DP}\right) \equiv \frac{\pi}{2}\ [2\pi]",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_mod, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        res_nature = MathTex(
            r"PDQ \text{ est un triangle rectangle et isocèle en } D",
            font_size=19,
            color=COL_SUCCESS,
        ).next_to(calc_arg, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)
        cadre_nature = SurroundingRectangle(res_nature, color=COL_SUCCESS, buff=0.15)

        # Tracé des côtés du triangle PDQ sur la figure
        axes = fig["axes"]
        seg_dp = Line(axes.c2p(0.25, -0.75), axes.c2p(-1.75, 1.75), color=COL_POINT_P, stroke_width=2.5)
        seg_dq = Line(axes.c2p(0.25, -0.75), axes.c2p(2.75, 1.25), color=COL_POINT_Q, stroke_width=2.5)
        seg_pq = Line(axes.c2p(-1.75, 1.75), axes.c2p(2.75, 1.25), color=BAC_INK_MUTED, stroke_width=1.5, stroke_opacity=0.7)

        fig["seg_dp"] = seg_dp
        fig["seg_dq"] = seg_dq
        fig["seg_pq"] = seg_pq

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_geom), Write(calc_mod), run_time=1.0)
        self.play(Write(calc_arg), run_time=1.0)
        self.play(
            FadeIn(cadre_nature), Write(res_nature),
            Create(seg_dp), Create(seg_dq), Create(seg_pq),
            run_time=1.2,
        )
        self.legende(NARRATION["q2c"])
        self.pose(1.5)

    # ── Question 3a : Affixe du milieu K de [EF] ──────────────────────
    def chapitre_q3a(self, fig):
        self.nettoie_zone_gauche(fig)
        self.etape("q3a-affixe-k")
        q_head = self.titre_question("3.a", "0,5 pt", x_pos=LEFT*2.0)
        enonce = self.texte_enonce("E symétrique de B par rapport à P, F symétrique de C par rapport à Q.\nK milieu de [EF]. Montrer que : k = a + (i/2)(c - b).")

        t_sym = Text("1. Affixes des symétriques E et F :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_ef = MathTex(
            r"P \text{ milieu de } [BE] \implies e = 2p - b, \qquad Q \text{ milieu de } [CF] \implies f = 2q - c",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_sym, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        t_k = Text("2. Milieu K de [EF] :", font_size=17, color=COL_EMPH).next_to(calc_ef, DOWN, buff=0.2).to_edge(LEFT, buff=0.6)

        calc_k1 = MathTex(
            r"k = \frac{e+f}{2} = \frac{(2p-b)+(2q-c)}{2} = p+q - \frac{b+c}{2} = p+q-d",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_k, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        calc_sum = MathTex(
            r"2p+2q = 2a + (b+c) + i(c-b) \implies k = \frac{2a+(b+c)+i(c-b)}{2} - \frac{b+c}{2}",
            font_size=17,
            color=COL_MATH,
        ).next_to(calc_k1, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        res_k = MathTex(
            r"k = a + \frac{i}{2}(c - b)",
            font_size=20,
            color=COL_POINT_K,
        ).next_to(calc_sum, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)
        cadre_k = SurroundingRectangle(res_k, color=COL_POINT_K, buff=0.12)

        # Plot K sur figure : K = 0.75 + 3.75 i
        axes = fig["axes"]
        pt_k = Dot(axes.c2p(0.75, 3.75), color=COL_POINT_K, radius=0.07)
        lbl_k = Text("K(k)", font_size=16, color=COL_POINT_K).next_to(pt_k, UP, buff=0.1)
        fig["pt_k"] = pt_k
        fig["lbl_k"] = lbl_k

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_sym), Write(calc_ef), run_time=1.0)
        self.play(FadeIn(t_k), Write(calc_k1), run_time=1.0)
        self.play(Write(calc_sum), run_time=1.0)
        self.play(FadeIn(cadre_k), Write(res_k), FadeIn(pt_k), FadeIn(lbl_k), run_time=1.0)
        self.legende(NARRATION["q3a"])
        self.pose(1.5)

    # ── Question 3b : Parallélogramme DPKQ ─────────────────────────────
    def chapitre_q3b_para(self, fig):
        self.nettoie_zone_gauche(fig)
        self.etape("q3b-parallelogramme")
        q_head = self.titre_question("3.b", "0,5 pt", x_pos=LEFT*2.0)
        enonce = self.texte_enonce("Montrer que les points K, P, Q et D sont cocycliques.")

        t_para = Text("1. DPKQ est un parallélogramme :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_para = MathTex(
            r"k = p+q-d \iff d+k = p+q \iff \frac{d+k}{2} = \frac{p+q}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_para, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        expl_para = Text(
            "Les diagonales [DK] et [PQ] ont le même milieu,\ndonc DPKQ est un parallélogramme.",
            font_size=16,
            color=COL_MATH,
            line_spacing=1.2,
        ).next_to(calc_para, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        # Segments du parallélogramme DPKQ
        axes = fig["axes"]
        seg_pk = Line(axes.c2p(-1.75, 1.75), axes.c2p(0.75, 3.75), color=COL_POINT_P, stroke_width=2)
        seg_qk = Line(axes.c2p(2.75, 1.25), axes.c2p(0.75, 3.75), color=COL_POINT_Q, stroke_width=2)
        diag_dk = DashedLine(axes.c2p(0.25, -0.75), axes.c2p(0.75, 3.75), color=COL_POINT_K, stroke_width=1.5)

        fig["seg_pk"] = seg_pk
        fig["seg_qk"] = seg_qk
        fig["diag_dk"] = diag_dk
        fig["expl_para"] = expl_para

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_para), Write(calc_para), run_time=1.0)
        self.play(FadeIn(expl_para), Create(seg_pk), Create(seg_qk), Create(diag_dk), run_time=1.0)
        self.legende(NARRATION["q3b_para"])
        self.pose(1.5)

    # ── Question 3b suite : Carré & Cocyclicité ───────────────────────
    def chapitre_q3b_carre(self, fig):
        self.etape("q3b-carre-cocyclicite")

        expl_para = fig["expl_para"]
        t_carre = Text("2. DPKQ est un carré, donc cocyclique :", font_size=17, color=COL_EMPH).next_to(expl_para, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_carre = MathTex(
            r"\begin{cases} DP = DQ \\ (DP) \perp (DQ) \end{cases} \implies DPKQ \text{ est un carré}",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_carre, DOWN, buff=0.15).to_edge(LEFT, buff=0.8)

        res_cocycl = MathTex(
            r"K,\, P,\, Q,\, D \text{ sont cocycliques sur le cercle de diamètre } [DK]",
            font_size=18,
            color=COL_SUCCESS,
        ).next_to(calc_carre, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)
        cadre_cocycl = SurroundingRectangle(res_cocycl, color=COL_SUCCESS, buff=0.15)

        # Cercle circonscrit au carré DPKQ
        axes = fig["axes"]
        pt_centre = axes.c2p(0.5, 1.5)
        rayon_scene = np.linalg.norm(axes.c2p(0.5, 1.5) - axes.c2p(0.25, -0.75))
        cercle = Circle(radius=rayon_scene, color=COL_SUCCESS, stroke_width=2).move_to(pt_centre)
        fig["cercle"] = cercle

        self.play(FadeIn(t_carre), Write(calc_carre), run_time=1.0)
        self.play(FadeIn(cadre_cocycl), Write(res_cocycl), Create(cercle), run_time=1.2)
        self.legende(NARRATION["q3b_carre"])
        self.pose(1.5)

    # ── Bilan ─────────────────────────────────────────────────────────
    def chapitre_fin(self, fig):
        self.nettoie_zone_gauche(fig)
        membres = self.fig_membres(fig)
        self.play(FadeOut(membres), run_time=0.6)
        self.etape("bilan")

        titre = Text(
            "Synthèse du Problème — Bac 2021 SN (4 points)",
            font_size=24,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=1.0)

        b1 = Text(
            "• Partie I.a (0,50 pt) : Forme somme/produit (Viète) => S = {c, a+b}",
            font_size=16,
            color=COL_MATH,
        )
        b2 = Text(
            "• Partie I.b (0,50 pt) : Factorisation angle moyen 5π/12 => formes exponentielles exactes",
            font_size=16,
            color=COL_MATH,
        )
        b3 = Text(
            "• Partie II.a (1,00 pt) : Formule du centre de rotation => 2p et 2q",
            font_size=16,
            color=COL_MATH,
        )
        b4 = Text(
            "• Partie II.b-c (1,00 pt) : (p-d)/(q-d) = i => PDQ rectangle isocèle en D",
            font_size=16,
            color=COL_MATH,
        )
        b5 = Text(
            "• Partie III (1,00 pt) : k = p+q-d => DPKQ carré => K, P, Q, D cocycliques",
            font_size=16,
            color=COL_MATH,
        )
        score = Text(
            "Score total : 4,0 / 4,0 points — 7 questions traitées avec rigueur",
            font_size=18,
            color=COL_SUCCESS,
            weight="BOLD",
        )

        carte = VGroup(b1, b2, b3, b4, b5, score).arrange(DOWN, buff=0.35, aligned_edge=LEFT).next_to(titre, DOWN, buff=0.5)
        box = SurroundingRectangle(
            VGroup(titre, carte), color=BAC_ACCENT, buff=0.4, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.9
        )

        self.play(FadeIn(box), FadeIn(titre), FadeIn(carte), run_time=1.2)
        self.legende(NARRATION["bilan"])
        self.pose(1.5)
        self.play(FadeOut(box), FadeOut(titre), FadeOut(carte), run_time=0.8)

    # ── Helpers de nettoyage ──────────────────────────────────────────
    def nettoie_zone(self):
        """Efface tous les éléments textuels ou transitoires du plan."""
        a_garder = {self._badge_etape, self._legende}
        to_remove = [m for m in self.mobjects if m not in a_garder]
        if to_remove:
            self.play(*[FadeOut(m) for m in to_remove], run_time=0.5)

    def nettoie_zone_gauche(self, fig):
        """Efface tous les textes à gauche en conservant les objets de la figure."""
        membres_fig = set()
        for v in fig.values():
            if isinstance(v, (VGroup, list)):
                for item in v:
                    membres_fig.add(item)
            else:
                membres_fig.add(v)

        a_garder = {self._badge_etape, self._legende}.union(membres_fig)
        to_remove = [m for m in self.mobjects if m not in a_garder]
        if to_remove:
            self.play(*[FadeOut(m) for m in to_remove], run_time=0.5)

    def fig_membres(self, fig):
        """Reconstitue la liste de tous les mobjects de la figure pour le fondu final."""
        membres = []
        for k, v in fig.items():
            if isinstance(v, (VGroup, list)):
                membres.extend(v)
            else:
                membres.append(v)
        return VGroup(*membres)

    def titre_question(self, num, bareme, x_pos=LEFT*2.0):
        t1 = Text(f"Question {num}", font_size=20, color=COL_TITLE, weight="BOLD")
        t2 = Text(f" — {bareme}", font_size=18, color=BAC_INK_MUTED)
        grp = VGroup(t1, t2).arrange(RIGHT, buff=0.15).to_edge(UP, buff=0.6).shift(x_pos)
        return grp

    def texte_enonce(self, txt):
        return Text(txt, font_size=16, color=BAC_INK_SOFT, line_spacing=1.2).to_edge(UP, buff=1.3).to_edge(LEFT, buff=0.6)
