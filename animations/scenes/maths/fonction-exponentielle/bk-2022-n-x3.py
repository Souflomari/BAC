#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Expérimentales) — Problème (8,5 points)
Étude d'une fonction avec l'exponentielle : concavité, points d'inflexion,
fonction auxiliaire g, tracé, réciproque et suite récurrente.
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
VALS_ENONCE = "39, 1.39, 1.4, 4.5, 3.5, 0.5, 0.75, 0.25, 1, 2, 4, 8, 8.5"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3a()
        self.chapitre_q3b()
        self.chapitre_q4a()
        self.chapitre_q4b()
        self.chapitre_q4c()
        self.chapitre_q5a()
        self.chapitre_q5b()
        self.chapitre_q5c()
        self.chapitre_q6()
        self.chapitre_q7a()
        self.chapitre_q7b()
        self.chapitre_q8a()
        self.chapitre_q8b()
        self.chapitre_q8c_q8d()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2022 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Problème : Exponentielle, concavité, réciproque & suite (8,5 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SExp : étude complète, concavité et suite.")

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
        f_def = MathTex(r"f(x) = x\left(e^{\frac{x}{2}} - 1\right)^2", font_size=18, color=COL_MATH)
        d_def = MathTex(r"\mathcal{D}_f = \mathbb{R}", font_size=18, color=COL_MATH)
        c_def = Text("(C) est la courbe de f dans un repère orthonormé (unité : 1 cm)", font_size=16, color=BAC_INK_SOFT)
        rem = MathTex(r"\forall x \in \mathbb{R},\quad e^{\frac{x}{2}} > 0", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.3)
        self.ecrit(f_def, buff=0.35)
        self.ecrit(d_def, buff=0.3)
        self.ecrit(c_def, buff=0.3)
        self.ecrit(rem, buff=0.35)

        self.legende("Présentation de f sur R et de sa courbe (C).")
        self.pose(2.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 : Limites en ±infini
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-limites-f")
        self.ardoise()

        t1 = Text("Partie A — Question 1 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer }\lim_{x\to+\infty} f(x) \text{ et } \lim_{x\to-\infty} f(x)", font_size=17, color=COL_TITLE)

        c1 = Text("• Limite en +infini :", font_size=16, color=COL_MATH)
        l1 = MathTex(r"\lim_{x\to+\infty} e^{\frac{x}{2}} = +\infty \implies \lim_{x\to+\infty}\left(e^{\frac{x}{2}}-1\right)^2 = +\infty", font_size=16, color=COL_MATH)
        l2 = MathTex(r"\lim_{x\to+\infty} x = +\infty \implies \lim_{x\to+\infty} f(x) = +\infty", font_size=16, color=COL_SUCCESS)

        c2 = Text("• Limite en -infini :", font_size=16, color=COL_MATH)
        l3 = MathTex(r"\lim_{x\to-\infty} e^{\frac{x}{2}} = 0 \implies \left(e^{\frac{x}{2}}-1\right)^2 \to 1", font_size=16, color=COL_MATH)
        l4 = MathTex(r"\lim_{x\to-\infty} x = -\infty \implies \lim_{x\to-\infty} f(x) = -\infty", font_size=16, color=COL_SUCCESS)

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

        self.legende("Question 1 : Limites aux bornes de R.")
        self.pose(3.0)
        self.play(FadeOut(res))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 : Branche parabolique en +infini
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-branche-parabolique")
        self.ardoise()

        t1 = Text("Partie A — Question 2 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer }\lim_{x\to+\infty} \frac{f(x)}{x} \text{ et interpréter géométriquement}", font_size=17, color=COL_TITLE)

        q1 = MathTex(r"\frac{f(x)}{x} = \frac{x\left(e^{\frac{x}{2}}-1\right)^2}{x} = \left(e^{\frac{x}{2}}-1\right)^2 \quad (x \neq 0)", font_size=16, color=COL_MATH)
        lim_q = MathTex(r"\lim_{x\to+\infty} \frac{f(x)}{x} = \lim_{x\to+\infty} \left(e^{\frac{x}{2}}-1\right)^2 = +\infty", font_size=16, color=COL_SUCCESS)
        concl = Text("Interprétation : (C) admet une branche parabolique de direction (Oy) en +infini.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(q1, buff=0.3)
        self.ecrit(lim_q, buff=0.3)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : Branche parabolique de direction (Oy).")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3a : Asymptote (Delta) y = x en -infini
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3a(self):
        self.etape("05-q3a-asymptote-delta")
        self.ardoise()

        t1 = Text("Partie A — Question 3.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que }(\Delta) : y = x \text{ est asymptote à }(C)\text{ en }-\infty", font_size=16, color=COL_TITLE)

        diff1 = MathTex(r"f(x) - x = x\left[\left(e^{\frac{x}{2}}-1\right)^2 - 1\right] = x\left(e^x - 2e^{\frac{x}{2}}\right)", font_size=16, color=COL_MATH)
        diff2 = MathTex(r"f(x) - x = x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}}-2\right)", font_size=17, color=COL_MATH)
        
        lim_diff = MathTex(r"\text{En posant } X=\frac{x}{2}\to-\infty,\quad \lim_{x\to-\infty} x\,e^{\frac{x}{2}} = \lim_{X\to-\infty} 2X e^X = 0", font_size=16, color=COL_MATH)
        lim_tot = MathTex(r"\lim_{x\to-\infty} [f(x)-x] = 0 \times (0-2) = 0", font_size=16, color=COL_SUCCESS)
        concl = Text("Donc la droite (Delta) : y = x est asymptote à (C) au voisinage de -infini.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(diff1, buff=0.25)
        self.ecrit(diff2, buff=0.25)
        self.ecrit(lim_diff, buff=0.25)
        self.ecrit(lim_tot, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3a : Asymptote (Delta) : y = x en -infini.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3b : Position relative de (C) et (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3b(self):
        self.etape("06-q3b-position-relative")
        self.ardoise()

        t1 = Text("Partie A — Question 3.b (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Étudier le signe de } (f(x)-x) \text{ et la position relative de }(C)\text{ et }(\Delta)", font_size=16, color=COL_TITLE)

        f_pos = MathTex(r"f(x)-x = x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}}-2\right) \quad (e^{\frac{x}{2}}>0)", font_size=16, color=COL_MATH)
        r_zero = MathTex(r"e^{\frac{x}{2}}-2 = 0 \iff \frac{x}{2}=\ln 2 \iff x = 2\ln 2 = \ln 4", font_size=16, color=COL_MATH)

        p1 = MathTex(r"\bullet\ x \in ]-\infty, 0[\,\cup\,]\ln 4, +\infty[ \implies f(x)-x > 0 \implies (C) \text{ au-dessus de }(\Delta)", font_size=16, color=COL_SUCCESS)
        p2 = MathTex(r"\bullet\ x \in ]0, \ln 4[ \implies f(x)-x < 0 \implies (C) \text{ en dessous de }(\Delta)", font_size=16, color=COL_WARN)
        p3 = MathTex(r"\bullet\ \text{Points de contact en } O(0,0) \text{ et } (\ln 4, \ln 4)", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(f_pos, buff=0.25)
        self.ecrit(r_zero, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.25)

        self.legende("Question 3b : Position relative de (C) et (Delta).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4a : Dérivée f'(x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4a(self):
        self.etape("07-q4a-derivee-fprime")
        self.ardoise()

        t1 = Text("Partie B — Question 4.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que } f'(x) = \left(e^{\frac{x}{2}}-1\right)^2 + x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}}-1\right)", font_size=16, color=COL_TITLE)

        d1 = MathTex(r"f(x) = u(x)v(x) \quad\text{avec } u(x)=x \text{ et } v(x)=\left(e^{\frac{x}{2}}-1\right)^2", font_size=16, color=COL_MATH)
        d2 = MathTex(r"u'(x) = 1,\quad v'(x) = 2\left(e^{\frac{x}{2}}-1\right)\left(\frac{1}{2}e^{\frac{x}{2}}\right) = e^{\frac{x}{2}}\left(e^{\frac{x}{2}}-1\right)", font_size=16, color=COL_MATH)
        d3 = MathTex(r"f'(x) = u'(x)v(x) + u(x)v'(x) = \left(e^{\frac{x}{2}}-1\right)^2 + x\,e^{\frac{x}{2}}\left(e^{\frac{x}{2}}-1\right)", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.25)
        self.ecrit(d3, buff=0.3)
        box = SurroundingRectangle(d3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4a : Dérivée du produit f = u v.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 4b : Signe de la dérivée f'
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4b(self):
        self.etape("08-q4b-signe-fprime")
        self.ardoise()

        t1 = Text("Partie B — Question 4.b (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Vérifier que } x\left(e^{\frac{x}{2}}-1\right) \ge 0 \text{ puis déduire le signe de } f'(x)", font_size=16, color=COL_TITLE)

        s1 = MathTex(r"e^{\frac{x}{2}}-1 > 0 \iff \frac{x}{2} > 0 \iff x > 0", font_size=16, color=COL_MATH)
        s2 = MathTex(r"\text{Donc } x \text{ et } (e^{\frac{x}{2}}-1) \text{ ont le même signe : produit } \ge 0", font_size=16, color=COL_MATH)
        s3 = MathTex(r"f'(x) = \underbrace{\left(e^{\frac{x}{2}}-1\right)^2}_{\ge 0} + \underbrace{e^{\frac{x}{2}}}_{>0}\underbrace{x\left(e^{\frac{x}{2}}-1\right)}_{\ge 0} \ge 0", font_size=17, color=COL_SUCCESS)
        s4 = MathTex(r"f'(x) = 0 \iff x = 0 \quad (\text{zéro isolé}) \implies f \text{ strictement croissante sur } \mathbb{R}", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(s1, buff=0.25)
        self.ecrit(s2, buff=0.25)
        self.ecrit(s3, buff=0.3)
        self.ecrit(s4, buff=0.25)
        box = SurroundingRectangle(s4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4b : Signe positif de f'(x) sur R.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Question 4c : Tableau de variations de f
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4c(self):
        self.etape("09-q4c-tableau-variations")
        self.ardoise()

        t1 = Text("Partie B — Question 4.c (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Dresser le tableau de variations de f sur R", font_size=16, color=COL_TITLE)

        p1 = MathTex(r"\forall x \in \mathbb{R},\quad f'(x) \ge 0 \quad\text{avec } f'(0)=0", font_size=16, color=COL_MATH)
        p2 = MathTex(r"f(0) = 0\left(e^0-1\right)^2 = 0", font_size=16, color=COL_MATH)
        p3 = Text("f est strictement croissante de -infini à +infini.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.25)

        # Tableau de variations Manim
        tv_box = Rectangle(width=5.4, height=2.0, color=BAC_INK_SOFT, stroke_width=1.5)
        tv_box.to_edge(RIGHT, buff=0.8).shift(UP * 0.1)

        l_horiz1 = Line(tv_box.get_left() + UP * 0.45, tv_box.get_right() + UP * 0.45, color=BAC_INK_SOFT, stroke_width=1)
        l_horiz2 = Line(tv_box.get_left() + DOWN * 0.15, tv_box.get_right() + DOWN * 0.15, color=BAC_INK_SOFT, stroke_width=1)
        l_vert = Line(tv_box.get_top() + LEFT * 1.5, tv_box.get_bottom() + LEFT * 1.5, color=BAC_INK_SOFT, stroke_width=1)

        lbl_x = MathTex("x", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + UP * 0.7)
        lbl_fp = MathTex("f'(x)", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + UP * 0.15)
        lbl_f = MathTex("f(x)", font_size=16, color=COL_MATH).move_to(tv_box.get_left() + RIGHT * 0.55 + DOWN * 0.55)

        x_vals = MathTex(r"-\infty \qquad\qquad 0 \qquad\qquad +\infty", font_size=16, color=COL_MATH).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.3)
        signs = MathTex(r"+\qquad\quad 0 \quad\qquad +", font_size=17, color=COL_SUCCESS).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.85)

        val_inf1 = MathTex(r"-\infty", font_size=16, color=COL_TITLE).move_to(tv_box.get_left() + RIGHT * 1.6 + DOWN * 0.85)
        val_pt = MathTex(r"0", font_size=16, color=COL_SUCCESS).move_to(tv_box.get_left() + RIGHT * 3.2 + DOWN * 0.55)
        val_inf2 = MathTex(r"+\infty", font_size=16, color=COL_TITLE).move_to(tv_box.get_left() + RIGHT * 4.9 + DOWN * 0.25)

        arr1 = Arrow(start=tv_box.get_left() + RIGHT * 1.8 + DOWN * 0.82, end=tv_box.get_left() + RIGHT * 3.0 + DOWN * 0.58, color=COL_SUCCESS, buff=0.04, stroke_width=2, max_tip_length_to_length_ratio=0.25)
        arr2 = Arrow(start=tv_box.get_left() + RIGHT * 3.4 + DOWN * 0.52, end=tv_box.get_left() + RIGHT * 4.6 + DOWN * 0.3, color=COL_SUCCESS, buff=0.04, stroke_width=2, max_tip_length_to_length_ratio=0.25)

        tv_grp = VGroup(
            tv_box, l_horiz1, l_horiz2, l_vert,
            lbl_x, lbl_fp, lbl_f, x_vals, signs,
            arr1, arr2, val_inf1, val_pt, val_inf2
        )

        self.play(FadeIn(tv_grp))
        self.legende("Question 4c : Tableau de variations de f.")
        self.pose(3.5)
        self.play(FadeOut(tv_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 10. Question 5a : Dérivée seconde f''(x) = (1/2) e^{x/2} g(x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5a(self):
        self.etape("10-q5a-derivee-seconde-g")
        self.ardoise()

        t1 = Text("Partie C — Question 5.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que } f''(x) = \frac{1}{2}e^{\frac{x}{2}}g(x) \text{ avec } g(x) = (2x+4)e^{\frac{x}{2}} - x - 4", font_size=16, color=COL_TITLE)

        d1 = MathTex(r"f'(x) = (1+x)e^x - (2+x)e^{\frac{x}{2}} + 1", font_size=16, color=COL_MATH)
        d2 = MathTex(r"f''(x) = (2+x)e^x - \frac{x+4}{2}e^{\frac{x}{2}}", font_size=16, color=COL_MATH)
        d3 = MathTex(r"f''(x) = \frac{1}{2}e^{\frac{x}{2}}\left[(2x+4)e^{\frac{x}{2}} - x - 4\right] = \frac{1}{2}e^{\frac{x}{2}}g(x)", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.25)
        self.ecrit(d3, buff=0.3)
        box = SurroundingRectangle(d3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5a : f''(x) = (1/2) exp(x/2) g(x).")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 11. Question 5b : Lecture graphique du signe de g(x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5b(self):
        self.etape("11-q5b-lecture-courbe-g")
        self.ardoise()

        t1 = Text("Partie C — Question 5.b (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Déterminer le signe de } g(x) \text{ sur } \mathbb{R} \text{ à partir de la courbe }(C_g)", font_size=16, color=COL_TITLE)

        s1 = MathTex(r"\bullet\ g(\alpha) = 0 \quad (\alpha \approx -4.5) \quad\text{et}\quad g(0) = 0", font_size=16, color=COL_MATH)
        s2 = MathTex(r"\bullet\ x \in ]-\infty, \alpha[\,\cup\,]0, +\infty[ \implies g(x) > 0", font_size=16, color=COL_SUCCESS)
        s3 = MathTex(r"\bullet\ x \in ]\alpha, 0[ \implies g(x) < 0", font_size=16, color=COL_WARN)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(s1, buff=0.25)
        self.ecrit(s2, buff=0.25)
        self.ecrit(s3, buff=0.25)

        # Repère Isotropie pour g(x)
        # x_range: [-6, 2] (8 unités) -> x_length = 4.8
        # y_range: [-3, 5] (8 unités) -> y_length = 4.8
        axes_g = Axes(
            x_range=[-6, 2, 1],
            y_range=[-3, 5, 1],
            x_length=4.8,
            y_length=4.8,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_tip": True},
        ).to_edge(RIGHT, buff=0.6).shift(DOWN * 0.1)

        self.play(Create(axes_g))
        labels_g = self.graduations(axes_g, x_vals=[-5, -4, -2, 1], y_vals=[-2, -1, 2, 4])

        g_func = lambda x: (2 * x + 4) * np.exp(x / 2) - x - 4
        curve_g = axes_g.plot(g_func, x_range=[-5.5, 0.8], color=COL_MATH, stroke_width=2.2)
        lbl_g = MathTex(r"(C_g)", font_size=16, color=COL_MATH).next_to(axes_g.c2p(0.6, 3.5), RIGHT, buff=0.05)

        p_alpha = axes_g.c2p(-4.5, 0)
        dot_a = Dot(p_alpha, color=COL_EMPH, radius=0.06)
        lbl_a = MathTex(r"\alpha", font_size=16, color=COL_EMPH).next_to(dot_a, DOWN, buff=0.05)

        dot_0 = Dot(axes_g.c2p(0, 0), color=COL_EMPH, radius=0.06)
        lbl_0 = MathTex("O(0,0)", font_size=16, color=COL_EMPH).next_to(dot_0, DR, buff=0.05)

        g_grp = VGroup(axes_g, labels_g, curve_g, lbl_g, dot_a, lbl_a, dot_0, lbl_0)

        self.play(Create(curve_g), FadeIn(lbl_g, dot_a, lbl_a, dot_0, lbl_0))
        self.legende("Question 5b : Deux zéros de g en alpha ≈ -4.5 et 0.")
        self.pose(3.5)
        self.play(FadeOut(g_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 12. Question 5c : Concavité et points d'inflexion
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5c(self):
        self.etape("12-q5c-concavite-inflexions")
        self.ardoise()

        t1 = Text("Partie C — Question 5.c (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Étudier la concavité de }(C)\text{ et donner les abscisses des points d'inflexion}", font_size=16, color=COL_TITLE)

        s_exp = MathTex(r"\text{Comme } \frac{1}{2}e^{\frac{x}{2}}>0,\quad f''(x) \text{ a le même signe que } g(x)", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\bullet\ x \in ]-\infty, \alpha[\,\cup\,]0, +\infty[ \implies f''(x) > 0 \implies (C) \text{ est convexe}", font_size=16, color=COL_SUCCESS)
        c2 = MathTex(r"\bullet\ x \in ]\alpha, 0[ \implies f''(x) < 0 \implies (C) \text{ est concave}", font_size=16, color=COL_WARN)
        c3 = MathTex(r"\bullet\ f'' \text{ s'annule et change de signe en } x = \alpha \approx -4.5 \text{ et en } x = 0", font_size=16, color=COL_EMPH)
        concl = Text("Conclusion : (C) admet deux points d'inflexion d'abscisses alpha et 0.", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(s_exp, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(c3, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_EMPH, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5c : Deux points d'inflexion en alpha et 0.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 13. Question 6 : Tracé de la courbe (C) et de (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("13-q6-trace-courbe-C")
        self.ardoise()

        t1 = Text("Partie D — Question 6 (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Construction de la courbe (C) et de (Delta) : y = x", font_size=16, color=COL_TITLE)

        r1 = Text("• (Delta) : y = x (asymptote en -infini)", font_size=16, color=COL_MATH)
        r2 = Text("• Points d'inflexion : I(alpha, -3.5) et O(0,0)", font_size=16, color=COL_MATH)
        r3 = Text("• Tangente horizontale à l'origine : f'(0) = 0", font_size=16, color=COL_MATH)
        r4 = Text("• Intersection en (ln 4, ln 4) ≈ (1.4, 1.4)", font_size=16, color=COL_MATH)
        r5 = Text("• Branche parabolique (Oy) en +infini", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.25)
        self.ecrit(r5, buff=0.25)

        # Repère Isotropie (§2.3) : scale = 0.50
        axes = Axes(
            x_range=[-6, 4, 1],
            y_range=[-5, 5, 1],
            x_length=5.0,
            y_length=5.0,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.5, "include_tip": True},
        ).to_edge(RIGHT, buff=0.5).shift(DOWN * 0.1)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[-5, -3, -1, 1, 2, 3], y_vals=[-4, -2, 2, 4])

        # Asymptote Delta : y = x
        line_delta = axes.plot(lambda x: x, x_range=[-5.2, 4.0], color=COL_EMPH, stroke_width=1.8)
        lbl_delta = MathTex(r"(\Delta)", font_size=16, color=COL_EMPH).next_to(axes.c2p(-4.0, -4.0), UL, buff=0.05)

        # Courbe (C) de f
        f_func = lambda x: x * (np.exp(x / 2) - 1)**2
        curve_C = axes.plot(f_func, x_range=[-5.5, 2.1], color=COL_MATH, stroke_width=2.5)
        lbl_C = MathTex(r"(C)", font_size=16, color=COL_MATH).next_to(axes.c2p(1.9, 4.2), RIGHT, buff=0.05)

        # Points remarquables
        p_I = axes.c2p(-4.5, -3.5)
        dot_I = Dot(p_I, color=COL_WARN, radius=0.06)
        lbl_I = MathTex(r"I_1(\alpha, f(\alpha))", font_size=16, color=COL_WARN).next_to(dot_I, DL, buff=0.06)

        p_O = axes.c2p(0, 0)
        dot_O = Dot(p_O, color=COL_SUCCESS, radius=0.06)
        lbl_O = MathTex("O(0,0)", font_size=16, color=COL_SUCCESS).next_to(dot_O, DR, buff=0.06)

        p_K = axes.c2p(1.386, 1.386)
        dot_K = Dot(p_K, color=COL_TITLE, radius=0.06)
        lbl_K = MathTex(r"(\ln 4, \ln 4)", font_size=16, color=COL_TITLE).next_to(dot_K, UL, buff=0.06)

        fig_grp = VGroup(axes, labels_axes, line_delta, lbl_delta, curve_C, lbl_C, dot_I, lbl_I, dot_O, lbl_O, dot_K, lbl_K)

        self.play(Create(line_delta), FadeIn(lbl_delta))
        self.play(Create(curve_C), FadeIn(lbl_C), FadeIn(dot_I, lbl_I, dot_O, lbl_O, dot_K, lbl_K))

        self.legende("Question 6 : Tracé de (Delta) et (C).")
        self.pose(4.0)
        self.play(FadeOut(fig_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 14. Question 7a : Fonction réciproque f^{-1}
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7a(self):
        self.etape("14-q7a-reciproque-bijection")
        self.ardoise()

        t1 = Text("Partie D — Question 7.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Montrer que f admet une fonction réciproque f^(-1) sur R", font_size=16, color=COL_TITLE)

        p1 = Text("• f est continue sur R (dérivable sur R)", font_size=16, color=COL_MATH)
        p2 = Text("• f est strictement croissante sur R", font_size=16, color=COL_MATH)
        p3 = MathTex(r"\bullet\ f(\mathbb{R}) = \left]\lim_{x\to-\infty} f(x),\ \lim_{x\to+\infty} f(x)\right[ = ]-\infty, +\infty[ = \mathbb{R}", font_size=16, color=COL_MATH)
        
        concl = Text("Donc f réalise une bijection de R sur R et admet une réciproque f^(-1) sur R.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.3)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7a : Bijection de f de R sur R.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 15. Question 7b : Dérivée de la réciproque en ln 4
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7b(self):
        self.etape("15-q7b-derivee-reciproque")
        self.ardoise()

        t1 = Text("Partie D — Question 7.b (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer } (f^{-1})'(\ln 4)", font_size=17, color=COL_TITLE)

        p1 = MathTex(r"f(\ln 4) = \ln 4 \implies f^{-1}(\ln 4) = \ln 4", font_size=16, color=COL_MATH)
        p2 = MathTex(r"e^{\frac{\ln 4}{2}} = e^{\ln 2} = 2", font_size=16, color=COL_MATH)
        p3 = MathTex(r"f'(\ln 4) = (2-1)^2 + (\ln 4)(2)(2-1) = 1 + 2\ln 4", font_size=16, color=COL_MATH)
        p4 = MathTex(r"(f^{-1})'(\ln 4) = \frac{1}{f'(\ln 4)} = \frac{1}{1 + 2\ln 4}", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.25)
        self.ecrit(p3, buff=0.25)
        self.ecrit(p4, buff=0.3)
        box = SurroundingRectangle(p4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7b : Dérivée de la réciproque en ln 4.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 16. Question 8a : Encadrement par récurrence
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8a(self):
        self.etape("16-q8a-suite-encadrement")
        self.ardoise()

        t1 = Text("Partie D — Question 8.a (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer par récurrence que } \forall n \in \mathbb{N},\quad 0 < u_n < \ln 4 \quad (u_0=1,\ u_{n+1}=f(u_n))", font_size=16, color=COL_TITLE)

        i1 = MathTex(r"\bullet\ \text{Rang } n=0 :\ u_0 = 1 \text{ et } 0 < 1 < \ln 4 \approx 1.39 \quad (\text{vrai})", font_size=16, color=COL_MATH)
        h1 = MathTex(r"\bullet\ \text{Hérédité : Supposons } 0 < u_n < \ln 4", font_size=16, color=COL_MATH)
        h2 = MathTex(r"f \text{ strictement croissante } \implies f(0) < f(u_n) < f(\ln 4)", font_size=16, color=COL_MATH)
        h3 = MathTex(r"f(0)=0 \text{ et } f(\ln 4)=\ln 4 \implies 0 < u_{n+1} < \ln 4", font_size=16, color=COL_SUCCESS)
        concl = MathTex(r"\forall n \in \mathbb{N},\quad 0 < u_n < \ln 4", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(i1, buff=0.25)
        self.ecrit(h1, buff=0.25)
        self.ecrit(h2, buff=0.25)
        self.ecrit(h3, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8a : Encadrement strict 0 < u_n < ln 4.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 17. Question 8b : Décroissance de la suite
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8b(self):
        self.etape("17-q8b-suite-decroissance")
        self.ardoise()

        t1 = Text("Partie D — Question 8.b (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Montrer que la suite (u_n) est décroissante", font_size=16, color=COL_TITLE)

        d1 = MathTex(r"u_{n+1} - u_n = f(u_n) - u_n", font_size=16, color=COL_MATH)
        d2 = MathTex(r"\text{D'après la Q3.b, pour } x \in ]0, \ln 4[,\quad f(x) - x < 0", font_size=16, color=COL_MATH)
        d3 = MathTex(r"\text{Comme } 0 < u_n < \ln 4 \implies f(u_n) - u_n < 0 \implies u_{n+1} < u_n", font_size=16, color=COL_SUCCESS)
        concl = Text("Donc la suite (u_n) est strictement décroissante.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(d1, buff=0.3)
        self.ecrit(d2, buff=0.3)
        self.ecrit(d3, buff=0.3)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8b : Décroissance de (u_n).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 18. Questions 8c & 8d : Convergence et limite de (u_n)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8c_q8d(self):
        self.etape("18-q8c-q8d-suite-limite-zero")
        self.ardoise()

        t1 = Text("Partie D — Questions 8.c & 8.d (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Montrer que }(u_n)\text{ converge et calculer sa limite }\ell", font_size=16, color=COL_TITLE)

        c1 = Text("• Convergence (théorème de convergence monotone) :", font_size=16, color=COL_MATH)
        c2 = Text("(u_n) est décroissante et minorée par 0 => (u_n) converge vers l in [0, ln 4].", font_size=16, color=COL_MATH)

        l1 = Text("• Détermination de la limite :", font_size=16, color=COL_MATH)
        l2 = MathTex(r"u_{n+1} = f(u_n) \text{ et } f \text{ continue } \implies \ell = f(\ell) \iff f(\ell) - \ell = 0", font_size=16, color=COL_MATH)
        l3 = MathTex(r"\ell\,e^{\frac{\ell}{2}}\left(e^{\frac{\ell}{2}}-2\right) = 0 \iff \ell = 0 \quad\text{ou}\quad \ell = \ln 4", font_size=16, color=COL_MATH)
        l4 = MathTex(r"(u_n) \text{ décroissante avec } u_0=1 < \ln 4 \implies \ell < \ln 4 \implies \ell = 0", font_size=16, color=COL_SUCCESS)
        concl = MathTex(r"\lim_{n\to+\infty} u_n = 0", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.22)
        self.ecrit(l1, buff=0.25)
        self.ecrit(l2, buff=0.22)
        self.ecrit(l3, buff=0.22)
        self.ecrit(l4, buff=0.22)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Questions 8c-8d : Convergence et limite 0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 19. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("19-bilan")
        titre = Text(
            "Bilan du Problème — Bac 2022 SExp (8,5 points)",
            font_size=24,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.7)

        p1 = Text("• Limites en ±infini & branche parabolique (Oy) en +infini", font_size=16, color=COL_MATH)
        p2 = Text("• Asymptote (Delta) : y = x en -infini, position relative avec zéros en 0 et ln 4", font_size=16, color=COL_MATH)
        p3 = Text("• Dérivée f'(x) >= 0 : f strictement croissante sur R", font_size=16, color=COL_MATH)
        p4 = Text("• Concavité via g(x) : deux points d'inflexion en alpha ≈ -4.5 et 0", font_size=16, color=COL_MATH)
        p5 = Text("• Réciproque f^(-1) définie sur R avec (f^(-1))'(ln 4) = 1 / (1 + 2 ln 4)", font_size=16, color=COL_SUCCESS)
        p6 = Text("• Suite u(n+1)=f(u(n)) : encadrée dans ]0, ln 4[, décroissante, converge vers 0", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5, p6).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan complet du problème Bac 2022 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()



