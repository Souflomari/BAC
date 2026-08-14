#!/usr/bin/env python3
"""Bac 2020 — Session Normale (Sciences Expérimentales) — Problème (7 points)
Étude d'une fonction avec l'exponentielle : asymptote oblique, position relative,
dérivée opposée d'un carré, point d'inflexion, TVI, courbe et réciproque.
"""

from manim import *
import numpy as np
import sys
from pathlib import Path

# Inclusion des classes communes
sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
from bac_scene import BacScene

# Couleurs conformes à la charte
COL_MATH = "#2B6CB0"       # Bleu principal
COL_WARN = "#C53030"       # Rouge / attention / avertissement
COL_EMPH = "#D69E2E"       # Jaune / mise en valeur
COL_SUCCESS = "#2F855A"    # Vert validation
COL_TITLE = "#1A365D"      # Bleu nuit pour titres
BAC_INK_SOFT = "#718096"   # Gris doux graduations/axes

# Constantes et nombres de la banque pour la fidélité
VALS_ENONCE = "0.7, 1.1, 1.4, 0.5, 0.75, 0.25, 1, 2, 3, 4, 5, 8, 2.5"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2a()
        self.chapitre_q2b()
        self.chapitre_q3()
        self.chapitre_q4a()
        self.chapitre_q4b()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7()
        self.chapitre_q8a()
        self.chapitre_q8b()
        self.chapitre_q8c()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2020 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Problème : Exponentielle, asymptote oblique, inflexion & réciproque",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2020 SExp : exponentielle, inflexion et réciproque.")

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.2))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 02. Données de l'exercice
    # ─────────────────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro")
        self.ardoise()

        t1 = Text("Données de l'exercice", font_size=22, color=COL_TITLE, weight=BOLD)
        f_def = MathTex(r"f(x) = -x + \frac{5}{2} - \frac{1}{2}e^{x-2}\left(e^{x-2}-4\right)", font_size=18, color=COL_MATH)
        d_def = MathTex(r"\mathcal{D}_f = \mathbb{R}", font_size=18, color=COL_MATH)
        c_def = Text("(C) est la courbe de f dans un repère orthonormé (unité : 2 cm)", font_size=16, color=BAC_INK_SOFT)
        rem_exp = MathTex(r"\forall x \in \mathbb{R},\quad e^{x-2} > 0", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.3)
        self.ecrit(f_def, buff=0.35)
        self.ecrit(d_def, buff=0.3)
        self.ecrit(c_def, buff=0.3)
        self.ecrit(rem_exp, buff=0.35)

        self.legende("Présentation de f sur R et de sa courbe (C).")
        self.pose(2.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 : Limites aux bornes
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-limites-f")
        self.ardoise()

        t1 = Text("Question 1 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que }\lim_{x\to-\infty} f(x) = +\infty \text{ et } \lim_{x\to+\infty} f(x) = -\infty", font_size=17, color=COL_TITLE)
        
        c1 = Text("• Limite en -infini :", font_size=17, color=COL_MATH)
        l1 = MathTex(r"\lim_{x\to-\infty} e^{x-2} = 0 \implies \lim_{x\to-\infty} \left[-\frac{1}{2}e^{x-2}(e^{x-2}-4)\right] = 0", font_size=16, color=COL_MATH)
        l2 = MathTex(r"\lim_{x\to-\infty} \left(-x+\frac{5}{2}\right) = +\infty \implies \lim_{x\to-\infty} f(x) = +\infty", font_size=16, color=COL_SUCCESS)

        c2 = Text("• Limite en +infini :", font_size=17, color=COL_MATH)
        l3 = MathTex(r"\lim_{x\to+\infty} e^{x-2} = +\infty \implies \lim_{x\to+\infty} \left[-\frac{1}{2}e^{x-2}(e^{x-2}-4)\right] = -\infty", font_size=16, color=COL_MATH)
        l4 = MathTex(r"\lim_{x\to+\infty} (-x) = -\infty \implies \lim_{x\to+\infty} f(x) = -\infty", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(l1, buff=0.22)
        self.ecrit(l2, buff=0.22)
        self.ecrit(c2, buff=0.25)
        self.ecrit(l3, buff=0.22)
        self.ecrit(l4, buff=0.22)
        res = SurroundingRectangle(VGroup(l2, l4), color=COL_SUCCESS, buff=0.12)
        self.play(Create(res))

        self.legende("Question 1 : Limites aux bornes en ±infini.")
        self.pose(3.0)
        self.play(FadeOut(res))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2a : Asymptote oblique (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2a(self):
        self.etape("04-q2a-asymptote-delta")
        self.ardoise()

        t1 = Text("Question 2.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Démontrer que }(\Delta) : y = -x + \frac{5}{2} \text{ est asymptote à }(C)\text{ en }-\infty", font_size=16, color=COL_TITLE)
        
        diff = MathTex(r"f(x) - \left(-x+\frac{5}{2}\right) = -\frac{1}{2}e^{x-2}\left(e^{x-2}-4\right)", font_size=17, color=COL_MATH)
        lim_diff = MathTex(r"\lim_{x\to-\infty} \left[f(x) - \left(-x+\frac{5}{2}\right)\right] = -\frac{1}{2}\times 0 \times (-4) = 0", font_size=16, color=COL_SUCCESS)
        concl = Text("Donc la droite (Delta) est asymptote oblique à (C) au voisinage de -infini.", font_size=16, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(diff, buff=0.3)
        self.ecrit(lim_diff, buff=0.3)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2a : Asymptote oblique (Delta) en -infini.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2b : Position relative de (C) et (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2b(self):
        self.etape("05-q2b-position-relative")
        self.ardoise()

        t1 = Text("Question 2.b (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Résoudre } e^{x-2}-4=0 \text{ puis étudier la position relative de }(C)\text{ et }(\Delta)", font_size=16, color=COL_TITLE)

        r1 = MathTex(r"e^{x-2}-4=0 \iff e^{x-2}=4 \iff x-2=\ln 4 \iff x = 2+\ln 4", font_size=16, color=COL_MATH)
        sign_ecart = MathTex(r"\text{Comme } e^{x-2}>0,\quad f(x)-y_{(\Delta)} \text{ a le signe de } 4 - e^{x-2}", font_size=16, color=COL_MATH)

        p1 = MathTex(r"\bullet\ x \in ]-\infty, 2+\ln 4] \implies e^{x-2} \le 4 \implies f(x)-y_{(\Delta)} \ge 0 \implies (C) \text{ au-dessus de }(\Delta)", font_size=16, color=COL_SUCCESS)
        p2 = MathTex(r"\bullet\ x \in [2+\ln 4, +\infty[ \implies e^{x-2} \ge 4 \implies f(x)-y_{(\Delta)} \le 0 \implies (C) \text{ en dessous de }(\Delta)", font_size=16, color=COL_WARN)
        p3 = MathTex(r"\bullet\ \text{Intersection en } x = 2+\ln 4", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(sign_ecart, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.25)

        self.legende("Question 2b : Position relative de (C) et (Delta).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3 : Branche parabolique en +infini
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("06-q3-branche-parabolique")
        self.ardoise()

        t1 = Text("Question 3 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que }\lim_{x\to+\infty} \frac{f(x)}{x} = -\infty \text{ et interpréter géométriquement}", font_size=16, color=COL_TITLE)

        q_def = MathTex(r"\frac{f(x)}{x} = -1 + \frac{5}{2x} - \frac{1}{2x}e^{x-2}(e^{x-2}-4)", font_size=16, color=COL_MATH)
        minoration = MathTex(r"\text{Pour } x \ge 2+\ln 8,\quad e^{x-2}-4 \ge \frac{1}{2}e^{x-2} \implies \frac{e^{x-2}(e^{x-2}-4)}{x} \ge \frac{1}{2}\frac{e^{2x-4}}{x}", font_size=16, color=COL_MATH)
        lim_cv = MathTex(r"\text{En posant } X=2x-4,\quad \lim_{X\to+\infty} \frac{e^X}{X} = +\infty \implies \lim_{x\to+\infty}\frac{f(x)}{x} = -\infty", font_size=16, color=COL_MATH)
        concl = Text("Interprétation : (C) admet une branche parabolique de direction (Oy) en +infini.", font_size=16, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(q_def, buff=0.25)
        self.ecrit(minoration, buff=0.25)
        self.ecrit(lim_cv, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Branche parabolique de direction (Oy).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4a : Dérivée f'(x) = -(e^{x-2}-1)^2
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4a(self):
        self.etape("07-q4a-derivee-fprime")
        self.ardoise()

        t1 = Text("Question 4.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que pour tout } x \in \mathbb{R},\quad f'(x) = -\left(e^{x-2}-1\right)^2", font_size=16, color=COL_TITLE)

        d1 = MathTex(r"f(x) = -x + \frac{5}{2} - \frac{1}{2}e^{2x-4} + 2e^{x-2}", font_size=16, color=COL_MATH)
        d2 = MathTex(r"f'(x) = -1 - \frac{1}{2}(2)e^{2x-4} + 2e^{x-2} = -1 - e^{2x-4} + 2e^{x-2}", font_size=16, color=COL_MATH)
        d3 = MathTex(r"f'(x) = -\left(e^{2x-4} - 2e^{x-2} + 1\right) = -\left(e^{x-2}-1\right)^2", font_size=17, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.25)
        self.ecrit(d3, buff=0.3)
        box = SurroundingRectangle(d3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4a : Forme factorisée de f'.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 4b : Tableau de variations
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4b(self):
        self.etape("08-q4b-tableau-variations")
        self.ardoise()

        t1 = Text("Question 4.b (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Dresser le tableau de variations de la fonction f sur R", font_size=16, color=COL_TITLE)

        p_sign = MathTex(r"\forall x \in \mathbb{R},\quad f'(x) \le 0 \quad\text{et}\quad f'(x)=0 \iff x=2", font_size=16, color=COL_MATH)
        p_val = MathTex(r"f(2) = -2 + \frac{5}{2} - \frac{1}{2}(1)(1-4) = \frac{1}{2} + \frac{3}{2} = 2", font_size=16, color=COL_MATH)
        p_strict = Text("f est strictement décroissante sur R (zéro isolé en x=2)", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p_sign, buff=0.25)
        self.ecrit(p_val, buff=0.25)
        self.ecrit(p_strict, buff=0.25)

        # Tableau de variations Manim
        tv_box = Rectangle(width=5.4, height=2.0, color=BAC_INK_SOFT, stroke_width=1.5)
        tv_box.to_edge(RIGHT, buff=0.8).shift(UP * 0.1)

        l_horiz1 = Line(tv_box.get_left() + UP * 0.45, tv_box.get_right() + UP * 0.45, color=BAC_INK_SOFT, stroke_width=1)
        l_horiz2 = Line(tv_box.get_left() + DOWN * 0.15, tv_box.get_right() + DOWN * 0.15, color=BAC_INK_SOFT, stroke_width=1)
        l_vert = Line(tv_box.get_top() + LEFT * 1.5, tv_box.get_bottom() + LEFT * 1.5, color=BAC_INK_SOFT, stroke_width=1)

        lbl_x = MathTex("x", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + UP * 0.7)
        lbl_fp = MathTex("f'(x)", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + UP * 0.15)
        lbl_f = MathTex("f(x)", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + DOWN * 0.55)

        x_vals = MathTex(r"-\infty \qquad\qquad 2 \qquad\qquad +\infty", font_size=16, color=COL_MATH).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.3)
        signs = MathTex(r"-\qquad\quad 0 \quad\qquad -", font_size=17, color=COL_WARN).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.85)

        val_inf1 = MathTex(r"+\infty", font_size=16, color=COL_TITLE).move_to(tv_box.get_left() + RIGHT * 1.6 + DOWN * 0.25)
        val_pt = MathTex(r"2", font_size=16, color=COL_SUCCESS).move_to(tv_box.get_left() + RIGHT * 3.2 + DOWN * 0.55)
        val_inf2 = MathTex(r"-\infty", font_size=16, color=COL_TITLE).move_to(tv_box.get_left() + RIGHT * 4.9 + DOWN * 0.85)

        arr1 = Arrow(start=tv_box.get_left() + RIGHT * 1.8 + DOWN * 0.3, end=tv_box.get_left() + RIGHT * 3.0 + DOWN * 0.52, color=COL_WARN, buff=0.04, stroke_width=2, max_tip_length_to_length_ratio=0.25)
        arr2 = Arrow(start=tv_box.get_left() + RIGHT * 3.4 + DOWN * 0.58, end=tv_box.get_left() + RIGHT * 4.6 + DOWN * 0.82, color=COL_WARN, buff=0.04, stroke_width=2, max_tip_length_to_length_ratio=0.25)

        tv_grp = VGroup(
            tv_box, l_horiz1, l_horiz2, l_vert,
            lbl_x, lbl_fp, lbl_f, x_vals, signs,
            arr1, arr2, val_inf1, val_pt, val_inf2
        )

        self.play(FadeIn(tv_grp))
        self.legende("Question 4b : Tableau de variations de f.")
        self.pose(3.5)
        self.play(FadeOut(tv_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Question 5 : Dérivée seconde et point d'inflexion A(2,2)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("09-q5-inflexion-A22")
        self.ardoise()

        t1 = Text("Question 5 (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer } f''(x) \text{ puis montrer que } A(2,2) \text{ est point d'inflexion de }(C)", font_size=16, color=COL_TITLE)

        d1 = MathTex(r"f'(x) = -\left(e^{x-2}-1\right)^2 = -v(x)^2 \implies f''(x) = -2v(x)v'(x)", font_size=16, color=COL_MATH)
        d2 = MathTex(r"f''(x) = -2\left(e^{x-2}-1\right)e^{x-2} = 2e^{x-2}\left(1-e^{x-2}\right)", font_size=17, color=COL_MATH)
        
        s1 = MathTex(r"\text{Comme } 2e^{x-2}>0,\quad f''(x) \text{ a le signe de } 1 - e^{x-2}", font_size=16, color=COL_MATH)
        s2 = MathTex(r"\bullet\ x < 2 \implies e^{x-2} < 1 \implies f''(x) > 0 \quad ((C)\text{ convexe})", font_size=16, color=COL_SUCCESS)
        s3 = MathTex(r"\bullet\ x > 2 \implies e^{x-2} > 1 \implies f''(x) < 0 \quad ((C)\text{ concave})", font_size=16, color=COL_WARN)
        s4 = MathTex(r"f''(2) = 0 \text{ avec changement de signe et } f(2)=2 \implies A(2,2) \text{ point d'inflexion}", font_size=16, color=COL_EMPH)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.25)
        self.ecrit(s1, buff=0.25)
        self.ecrit(s2, buff=0.22)
        self.ecrit(s3, buff=0.22)
        self.ecrit(s4, buff=0.25)
        box = SurroundingRectangle(s4, color=COL_EMPH, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : f''(x) s'annule et change de signe en 2.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 10. Question 6 : TVI et existence de alpha
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("10-q6-tvi-alpha")
        self.ardoise()

        t1 = Text("Question 6 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que } f(x)=0 \text{ admet une unique solution } \alpha \in ]2+\ln 3, 2+\ln 4[", font_size=16, color=COL_TITLE)

        b1 = MathTex(r"f \text{ continue et strictement décroissante sur } \mathbb{R}, \text{ avec } f(\mathbb{R})=\mathbb{R}", font_size=16, color=COL_MATH)
        b2 = MathTex(r"0 \in \mathbb{R} \implies \exists!\,\alpha \in \mathbb{R},\quad f(\alpha)=0", font_size=16, color=COL_MATH)

        v1 = MathTex(r"\bullet\ f(2+\ln 3) = -(2+\ln 3) + \frac{5}{2} - \frac{1}{2}(3)(3-4) = 2 - \ln 3 > 0 \quad (\ln 3 \approx 1.1)", font_size=16, color=COL_SUCCESS)
        v2 = MathTex(r"\bullet\ f(2+\ln 4) = -(2+\ln 4) + \frac{5}{2} - \frac{1}{2}(4)(4-4) = \frac{1}{2} - \ln 4 < 0 \quad (\ln 4 \approx 1.4)", font_size=16, color=COL_WARN)
        
        concl = MathTex(r"f(2+\ln 3) \times f(2+\ln 4) < 0 \implies \alpha \in ]2+\ln 3, 2+\ln 4[", font_size=16, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(b1, buff=0.25)
        self.ecrit(b2, buff=0.25)
        self.ecrit(v1, buff=0.25)
        self.ecrit(v2, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : TVI et encadrement de la racine alpha.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 11. Question 7 : Tracé de (C) et (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("11-q7-trace-courbe-C")
        self.ardoise()

        t1 = Text("Question 7 (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Construction de (Delta) et (C) dans le repère orthonormé", font_size=16, color=COL_TITLE)

        r1 = Text("• (Delta) : y = -x + 2.5 (asymptote en -infini)", font_size=16, color=COL_MATH)
        r2 = Text("• A(2,2) : point d'inflexion (tangente horizontale)", font_size=16, color=COL_MATH)
        r3 = Text("• alpha in ]3.1, 3.4[ : zéro de f", font_size=16, color=COL_MATH)
        r4 = Text("• Branche parabolique (Oy) en +infini", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.25)

        # Repère Isotropie (§2.3) : scale = 0.60
        # x_range: [-3, 5] (8 unités) -> x_length = 4.8
        # y_range: [-4, 5] (9 unités) -> y_length = 5.4
        axes = Axes(
            x_range=[-3, 5, 1],
            y_range=[-4, 5, 1],
            x_length=4.8,
            y_length=5.4,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.5, "include_tip": True},
        ).to_edge(RIGHT, buff=0.5).shift(DOWN * 0.1)

        labels_axes = self.graduations(axes, x_vals=[-2, -1, 1, 2, 3, 4], y_vals=[-3, -2, -1, 1, 2, 3, 4])

        # Asymptote Delta
        delta_func = lambda x: -x + 2.5
        line_delta = axes.plot(delta_func, x_range=[-2.4, 4.5], color=COL_EMPH, stroke_width=2.0)
        lbl_delta = MathTex(r"(\Delta)", font_size=16, color=COL_EMPH).next_to(axes.c2p(-1.8, 4.3), UR, buff=0.05)

        # Courbe (C)
        f_func = lambda x: -x + 2.5 - 0.5 * np.exp(x - 2) * (np.exp(x - 2) - 4)
        curve_C = axes.plot(f_func, x_range=[-2.8, 3.65], color=COL_MATH, stroke_width=2.5)
        lbl_C = MathTex(r"(C)", font_size=16, color=COL_MATH).next_to(axes.c2p(3.2, -2.0), RIGHT, buff=0.08)

        # Points remarquables
        p_A = axes.c2p(2, 2)
        dot_A = Dot(p_A, color=COL_SUCCESS, radius=0.06)
        lbl_A = MathTex("A(2,2)", font_size=16, color=COL_SUCCESS).next_to(dot_A, UR, buff=0.06)

        # Tangente horizontale en A(2,2) car f'(2)=0
        tan_A = Line(axes.c2p(1.2, 2), axes.c2p(2.8, 2), color=COL_SUCCESS, stroke_width=2.0)

        # Zéro alpha ≈ 3.25
        alpha_val = 3.255
        p_alpha = axes.c2p(alpha_val, 0)
        dot_alpha = Dot(p_alpha, color=COL_TITLE, radius=0.05)
        lbl_alpha = MathTex(r"\alpha", font_size=16, color=COL_TITLE).next_to(dot_alpha, UR, buff=0.05)

        fig_grp = VGroup(axes, labels_axes, line_delta, lbl_delta, curve_C, lbl_C, tan_A, dot_A, lbl_A, dot_alpha, lbl_alpha)

        self.play(Create(axes), FadeIn(labels_axes))
        self.play(Create(line_delta), FadeIn(lbl_delta))
        self.play(Create(curve_C), FadeIn(lbl_C), Create(tan_A), FadeIn(dot_A, lbl_A), FadeIn(dot_alpha, lbl_alpha))

        self.legende("Question 7 : Tracé de (Delta) et (C).")
        self.pose(4.0)
        self.play(FadeOut(fig_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 12. Question 8a : Bijection et fonction réciproque
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8a(self):
        self.etape("12-q8a-reciproque-bijection")
        self.ardoise()

        t1 = Text("Question 8.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Montrer que f admet une fonction réciproque f^(-1) sur R", font_size=16, color=COL_TITLE)

        p1 = Text("• f est continue sur R (dérivable sur R)", font_size=16, color=COL_MATH)
        p2 = Text("• f est strictement décroissante sur R", font_size=16, color=COL_MATH)
        p3 = MathTex(r"\bullet\ f(\mathbb{R}) = \left]\lim_{x\to+\infty} f(x),\ \lim_{x\to-\infty} f(x)\right[ = ]-\infty, +\infty[ = \mathbb{R}", font_size=16, color=COL_MATH)
        
        concl = Text("Donc f réalise une bijection de R sur R et admet une fonction réciproque f^(-1) définie sur R.", font_size=16, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p1, buff=0.3)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.3)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8a : Bijection de f sur R.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 13. Question 8b : Tracé de la courbe de f^{-1}
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8b(self):
        self.etape("13-q8b-trace-reciproque")
        self.ardoise()

        t1 = Text("Question 8.b (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Construction de la courbe (C') de f^(-1) par symétrie", font_size=16, color=COL_TITLE)

        r1 = Text("• Symétrie orthogonale d'axe (D) : y = x", font_size=16, color=COL_MATH)
        r2 = Text("• (Delta) perp (y=x) donc (Delta) est son propre symétrique", font_size=16, color=COL_MATH)
        r3 = Text("• A(2,2) in (y=x) est invariant, tangente verticale", font_size=16, color=COL_MATH)
        r4 = Text("• (C') coupe l'axe (Oy) en alpha ≈ 3.25", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.25)

        # Repère Isotropie (§2.3) : scale = 0.58
        axes = Axes(
            x_range=[-4, 5, 1],
            y_range=[-4, 5, 1],
            x_length=5.22,
            y_length=5.22,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.5, "include_tip": True},
        ).to_edge(RIGHT, buff=0.4).shift(DOWN * 0.1)

        labels_axes = self.graduations(axes, x_vals=[-3, -2, -1, 1, 2, 3, 4], y_vals=[-3, -2, -1, 1, 2, 3, 4])

        # Première bissectrice y = x
        line_bissec = axes.plot(lambda x: x, x_range=[-3.5, 4.5], color=BAC_INK_SOFT, stroke_width=1.5)
        lbl_bissec = MathTex(r"y=x", font_size=16, color=BAC_INK_SOFT).next_to(axes.c2p(4.0, 4.0), UR, buff=0.05)

        # Asymptote Delta : y = -x + 2.5
        line_delta = axes.plot(lambda x: -x + 2.5, x_range=[-1.8, 4.3], color=COL_EMPH, stroke_width=1.8)
        lbl_delta = MathTex(r"(\Delta)", font_size=16, color=COL_EMPH).next_to(axes.c2p(-1.5, 4.0), UR, buff=0.05)

        # Courbe (C) de f
        f_func = lambda x: -x + 2.5 - 0.5 * np.exp(x - 2) * (np.exp(x - 2) - 4)
        curve_C = axes.plot(f_func, x_range=[-2.2, 3.65], color=COL_MATH, stroke_width=2.2)
        lbl_C = MathTex(r"(C)", font_size=16, color=COL_MATH).next_to(axes.c2p(3.2, -2.0), RIGHT, buff=0.05)

        # Courbe (C') de f^(-1) par symétrie paramétrique (f(t), t)
        t_vals = np.linspace(-2.2, 3.65, 200)
        c_prime_points = [axes.c2p(f_func(t), t) for t in t_vals]
        curve_C_prime = VMobject(color=COL_SUCCESS, stroke_width=2.2)
        curve_C_prime.set_points_smoothly(c_prime_points)
        lbl_Cp = MathTex(r"(C')", font_size=16, color=COL_SUCCESS).next_to(axes.c2p(-2.0, 3.2), UP, buff=0.05)

        # Point invariant A(2,2)
        dot_A = Dot(axes.c2p(2, 2), color=COL_TITLE, radius=0.06)
        lbl_A = MathTex("A(2,2)", font_size=16, color=COL_TITLE).next_to(dot_A, DR, buff=0.06)

        fig_grp = VGroup(axes, labels_axes, line_bissec, lbl_bissec, line_delta, lbl_delta, curve_C, lbl_C, curve_C_prime, lbl_Cp, dot_A, lbl_A)

        self.play(Create(axes), FadeIn(labels_axes), Create(line_bissec), FadeIn(lbl_bissec))
        self.play(Create(line_delta), FadeIn(lbl_delta), Create(curve_C), FadeIn(lbl_C))
        self.play(Create(curve_C_prime), FadeIn(lbl_Cp), FadeIn(dot_A, lbl_A))

        self.legende("Question 8b : Tracé de (C') par symétrie d'axe y=x.")
        self.pose(4.0)
        self.play(FadeOut(fig_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 14. Question 8c : Dérivée de la réciproque
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8c(self):
        self.etape("14-q8c-derivee-reciproque")
        self.ardoise()

        t1 = Text("Question 8.c (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer } (f^{-1})'(2-\ln 3) \quad (\text{remarquer } f^{-1}(2-\ln 3) = 2+\ln 3)", font_size=16, color=COL_TITLE)

        f1 = MathTex(r"\text{D'après la Q6 : } f(2+\ln 3) = 2-\ln 3 \iff f^{-1}(2-\ln 3) = 2+\ln 3", font_size=16, color=COL_MATH)
        f2 = MathTex(r"\text{Formule : } (f^{-1})'(y_0) = \frac{1}{f'(x_0)} \quad\text{avec } x_0 = f^{-1}(y_0)", font_size=16, color=COL_MATH)
        f3 = MathTex(r"f'(2+\ln 3) = -\left(e^{(2+\ln 3)-2}-1\right)^2 = -(3-1)^2 = -4", font_size=16, color=COL_MATH)
        f4 = MathTex(r"(f^{-1})'(2-\ln 3) = \frac{1}{f'(2+\ln 3)} = \frac{1}{-4} = -\frac{1}{4}", font_size=17, color=COL_SUCCESS)
        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(f1, buff=0.25)
        self.ecrit(f2, buff=0.25)
        self.ecrit(f3, buff=0.25)
        self.ecrit(f4, buff=0.3)
        box = SurroundingRectangle(f4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8c : Dérivée de la réciproque en 2 - ln 3.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 15. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("15-bilan")
        titre = Text(
            "Bilan du Problème — Bac 2020 SExp (7 points)",
            font_size=24,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.7)

        p1 = Text("• Limites en ±infini & asymptote oblique (Delta) : y = -x + 2.5 en -infini", font_size=16, color=COL_MATH)
        p2 = Text("• Position relative : (C) au-dessus de (Delta) sur ]-infini, 2+ln 4], en dessous ensuite", font_size=16, color=COL_MATH)
        p3 = Text("• Dérivée f'(x) = -(exp(x-2)-1)^2 <= 0 : f strictement décroissante sur R", font_size=16, color=COL_MATH)
        p4 = Text("• Dérivée seconde f''(x) = 2exp(x-2)(1-exp(x-2)) : point d'inflexion en A(2,2)", font_size=16, color=COL_MATH)
        p5 = Text("• TVI : unique racine alpha in ]2+ln 3, 2+ln 4[", font_size=16, color=COL_MATH)
        p6 = Text("• Réciproque f^(-1) définie sur R, courbe (C') symétrique par rapport à y = x", font_size=16, color=COL_SUCCESS)
        p7 = Text("• Dérivée de la réciproque : (f^(-1))'(2-ln 3) = -1/4", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5, p6, p7).arrange(DOWN, buff=0.20, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan complet du problème Bac 2020 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()



