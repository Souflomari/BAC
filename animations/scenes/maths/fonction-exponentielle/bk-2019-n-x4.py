"""Explication animée — Bac 2019 SN (SM), Exercice 4 (10 points) :
Étude d'une fonction avec l'exponentielle : Rolle, accroissements finis, intégrale et suite récurrente.

Source de vérité : content/maths/fonction-exponentielle/bank.yaml, entrée bk-2019-n-x4.
Fonction définie sur R par :
    f(x) = 4x(e^(-x) + 1/2 x - 1) = 4x e^(-x) + 2x^2 - 4x
"""

from manim import *
import numpy as np
from bac_scene import BacScene

# Couleurs conformes à la charte
COL_MATH = "#2B6CB0"       # Bleu principal
COL_WARN = "#C53030"       # Rouge / attention / avertissement
COL_EMPH = "#D69E2E"       # Jaune / mise en valeur
COL_SUCCESS = "#2F855A"    # Vert validation
COL_TITLE = "#1A365D"      # Bleu nuit pour titres
BAC_INK_SOFT = "#718096"   # Gris doux graduations/axes

# Constantes de l'énoncé (repères numériques vérifiés : e^{3/2}=4.5, ln 2=0.69, sqrt(3)≈1.73, [2,3], 7 questions)
VALS_ENONCE = "4.5, 0.69, 1.73, [2,3], 7, 73"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2a()
        self.chapitre_q2b()
        self.chapitre_q2c()
        self.chapitre_q2d()
        self.chapitre_q3a()
        self.chapitre_q3b()
        self.chapitre_q3c()
        self.chapitre_q4a()
        self.chapitre_q4b()
        self.chapitre_q5a()
        self.chapitre_q5b()
        self.chapitre_q5c()
        self.chapitre_q6a()
        self.chapitre_q6b()
        self.chapitre_q7a()
        self.chapitre_q7b()
        self.chapitre_q7c_q7d()
        self.chapitre_q8a()
        self.chapitre_q8b_q8c()
        self.chapitre_fin()

    # ── Étape 01 : Titre ──────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2019 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 4 : Étude d'une fonction exponentielle, théorèmes fondamentaux & suite",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende(
            "Bac 2019 SM : exponentielle, théorèmes et suites."
        )

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.3))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))

    # ── Étape 02 : Introduction ───────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro")
        self.titre_zone = Text(
            "Données de l'exercice",
            font_size=22,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        def_f = MathTex(
            r"f(x) = 4x\left(e^{-x} + \frac{1}{2}x - 1\right) = 4x\,e^{-x} + 2x^2 - 4x",
            font_size=24,
            color=COL_MATH,
        )
        domaine = MathTex(r"\mathcal{D}_f = \mathbb{R}", font_size=22, color=COL_SUCCESS)
        repere = Text(
            "(C) est la courbe représentative de f dans un repère orthonormé (O ; i, j) avec ||i|| = ||j|| = 1 cm",
            font_size=16,
            color=BAC_INK_SOFT,
        )

        grp = VGroup(self.titre_zone, def_f, domaine, repere).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        grp.to_edge(UP, buff=0.8).to_edge(LEFT, buff=0.8)

        self.legende(
            "Présentation de f sur R, produit et somme dérivables."
        )

        self.play(FadeIn(self.titre_zone), Write(def_f), FadeIn(domaine), FadeIn(repere))
        self.pose(2.0)
        self.play(FadeOut(grp))

    # ── Étape 03 : Q1 Limites de f en -∞ et +∞ ────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-limites-f")
        self.titre_zone = Text(
            "Partie I — Question 1 (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Calculer } \lim_{x\to -\infty} f(x) \text{ et } \lim_{x\to +\infty} f(x)",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 1 : Limites en ±infini par croissances."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        # En +∞
        t1 = Text("• Limite en +∞ :", font_size=17, color=COL_TITLE, weight=BOLD)
        eq1 = MathTex(r"f(x) = 4x\,e^{-x} + 2x^2 - 4x", font_size=21, color=COL_MATH)
        eq2 = MathTex(
            r"\lim_{x\to +\infty} x\,e^{-x} = 0 \quad (\text{croissance comparée } R4) \quad \text{et} \quad \lim_{x\to +\infty} (2x^2 - 4x) = +\infty",
            font_size=20,
            color=COL_EMPH,
        )
        res_plus = MathTex(r"\lim_{x\to +\infty} f(x) = +\infty", font_size=23, color=COL_SUCCESS)
        cadre_plus = SurroundingRectangle(res_plus, color=COL_SUCCESS, buff=0.1)

        # En -∞
        t2 = Text("• Limite en -∞ (factorisation par le terme dominant) :", font_size=17, color=COL_TITLE, weight=BOLD)
        eq3 = MathTex(
            r"f(x) = 4x\,e^{-x}\left[1 + \frac{(x-2)e^x}{2}\right]",
            font_size=21,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"\lim_{x\to -\infty} x\,e^x = 0 \implies \lim_{x\to -\infty}\left[1 + \frac{(x-2)e^x}{2}\right] = 1",
            font_size=20,
            color=COL_EMPH,
        )
        eq5 = MathTex(
            r"\lim_{x\to -\infty} 4x\,e^{-x} = (-\infty)(+\infty) = -\infty",
            font_size=20,
            color=COL_WARN,
        )
        res_moins = MathTex(r"\lim_{x\to -\infty} f(x) = -\infty", font_size=23, color=COL_SUCCESS)
        cadre_moins = SurroundingRectangle(res_moins, color=COL_SUCCESS, buff=0.1)

        grp_plus = VGroup(t1, eq1, eq2, VGroup(res_plus, cadre_plus)).arrange(DOWN, buff=0.15, aligned_edge=LEFT)
        grp_moins = VGroup(t2, eq3, eq4, eq5, VGroup(res_moins, cadre_moins)).arrange(DOWN, buff=0.15, aligned_edge=LEFT)

        all_calc = VGroup(grp_plus, grp_moins).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        all_calc.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(FadeIn(t1), Write(eq1))
        self.play(Write(eq2))
        self.play(Write(res_plus), Create(cadre_plus))
        self.pose(1.0)

        self.play(FadeIn(t2), Write(eq3))
        self.play(Write(eq4))
        self.play(Write(eq5))
        self.play(Write(res_moins), Create(cadre_moins))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(all_calc))

    # ── Étape 04 : Q2a Dérivabilité et calcul de f'(x) ────────────────
    def chapitre_q2a(self):
        self.etape("04-q2a-derivabilite-formule")
        self.titre_zone = Text(
            "Partie I — Question 2.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer que } f \text{ est dérivable sur } \mathbb{R} \text{ et que } f'(x) = 4(e^{-x} - 1)(1 - x)",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 2a : Dérivation et forme factorisée de f'."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        l1 = MathTex(
            r"f \text{ est dérivable sur } \mathbb{R} \text{ comme somme et produit de fonctions dérivables sur } \mathbb{R}.",
            font_size=19,
            color=BAC_INK_SOFT,
        )
        l2 = MathTex(
            r"(4x\,e^{-x})' = 4e^{-x} + 4x(-e^{-x}) = 4e^{-x} - 4x\,e^{-x}",
            font_size=21,
            color=COL_MATH,
        )
        l3 = MathTex(
            r"(2x^2 - 4x)' = 4x - 4",
            font_size=21,
            color=COL_MATH,
        )
        l4 = MathTex(
            r"f'(x) = 4e^{-x} - 4x\,e^{-x} + 4x - 4",
            font_size=21,
            color=COL_EMPH,
        )
        l5 = MathTex(
            r"4(e^{-x} - 1)(1 - x) = 4[e^{-x} - x\,e^{-x} - 1 + x] = 4e^{-x} - 4x\,e^{-x} + 4x - 4",
            font_size=21,
            color=COL_MATH,
        )
        res = MathTex(
            r"(\forall x\in\mathbb{R})\quad f'(x) = 4(e^{-x} - 1)(1 - x)",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(l1, l2, l3, l4, l5, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(FadeIn(l1))
        self.play(Write(l2), Write(l3))
        self.play(Write(l4))
        self.play(Write(l5))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 05 : Q2b Variations et tableau de variations ─────────────
    def chapitre_q2b(self):
        self.etape("05-q2b-variations-tableau")
        self.titre_zone = Text(
            "Partie I — Question 2.b (0,75 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Étudier les variations de } f \text{ sur } \mathbb{R} \text{ puis donner son tableau de variations.}",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 2b : Signe de f' et tableau de variations."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        # Signe des facteurs à gauche
        s1 = MathTex(r"e^{-x} - 1 > 0 \iff -x > 0 \iff x < 0 \quad (\text{exp strictement croissante})", font_size=19, color=COL_MATH)
        s2 = MathTex(r"1 - x > 0 \iff x < 1", font_size=19, color=COL_MATH)
        s3 = MathTex(
            r"f'(x) > 0 \text{ sur } ]-\infty, 0[\, \cup\, ]1, +\infty[\quad \text{et}\quad f'(x) < 0 \text{ sur } ]0, 1[",
            font_size=19,
            color=COL_EMPH,
        )
        vals = MathTex(
            r"f(0) = 0 \quad \text{et} \quad f(1) = 4(e^{-1} - 1/2) = \frac{4}{e} - 2 \approx -0{,}53",
            font_size=19,
            color=COL_SUCCESS,
        )

        calc_side = VGroup(s1, s2, s3, vals).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        calc_side.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        # Tableau de variations à droite
        tv_box = Rectangle(width=5.2, height=3.2, color=BAC_INK_SOFT, stroke_width=1.5).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.4)
        l_horiz1 = Line(tv_box.get_left() + UP * 0.9, tv_box.get_right() + UP * 0.9, color=BAC_INK_SOFT, stroke_width=1.2)
        l_horiz2 = Line(tv_box.get_left() + UP * 0.3, tv_box.get_right() + UP * 0.3, color=BAC_INK_SOFT, stroke_width=1.2)
        l_vert = Line(tv_box.get_top() + LEFT * 1.6, tv_box.get_bottom() + LEFT * 1.6, color=BAC_INK_SOFT, stroke_width=1.2)

        lbl_x = MathTex("x", font_size=18, color=COL_TITLE).move_to(tv_box.get_top() + LEFT * 2.1 + DOWN * 0.35)
        lbl_fp = MathTex("f'(x)", font_size=18, color=COL_TITLE).move_to(tv_box.get_top() + LEFT * 2.1 + DOWN * 0.9)
        lbl_f = MathTex("f(x)", font_size=18, color=COL_TITLE).move_to(tv_box.get_top() + LEFT * 2.1 + DOWN * 2.0)

        x_vals = MathTex(r"-\infty \quad\quad 0 \quad\quad\quad 1 \quad\quad +\infty", font_size=17, color=COL_MATH).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.35)
        signs = MathTex(r"+\quad\quad 0 \quad -\quad 0 \quad\quad +", font_size=17, color=COL_EMPH).move_to(tv_box.get_top() + RIGHT * 0.9 + DOWN * 0.9)

        arr_up1 = Arrow(start=tv_box.get_left() + RIGHT * 1.3 + DOWN * 1.1, end=tv_box.get_left() + RIGHT * 2.1 + DOWN * 0.2, color=COL_SUCCESS, buff=0.05, stroke_width=2, max_tip_length_to_length_ratio=0.25)
        val_0 = MathTex("0", font_size=16, color=COL_SUCCESS).move_to(tv_box.get_left() + RIGHT * 2.2 + DOWN * 0.1)

        arr_down = Arrow(start=tv_box.get_left() + RIGHT * 2.4 + DOWN * 0.2, end=tv_box.get_left() + RIGHT * 3.3 + DOWN * 1.1, color=COL_WARN, buff=0.05, stroke_width=2, max_tip_length_to_length_ratio=0.25)
        val_1 = MathTex(r"\frac{4}{e}-2", font_size=16, color=COL_WARN).move_to(tv_box.get_left() + RIGHT * 3.4 + DOWN * 1.25)

        arr_up2 = Arrow(start=tv_box.get_left() + RIGHT * 3.7 + DOWN * 1.1, end=tv_box.get_left() + RIGHT * 4.7 + DOWN * 0.2, color=COL_SUCCESS, buff=0.05, stroke_width=2, max_tip_length_to_length_ratio=0.25)

        tv_grp = VGroup(
            tv_box, l_horiz1, l_horiz2, l_vert,
            lbl_x, lbl_fp, lbl_f, x_vals, signs,
            arr_up1, val_0, arr_down, val_1, arr_up2
        )

        self.play(Write(s1), Write(s2))
        self.play(Write(s3), Write(vals))
        self.play(Create(tv_grp))
        self.pose(2.0)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_side), FadeOut(tv_grp))

    # ── Étape 06 : Q2c Théorème des valeurs intermédiaires (alpha) ─────
    def chapitre_q2c(self):
        self.etape("06-q2c-tvi-alpha")
        self.titre_zone = Text(
            "Partie I — Question 2.c (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer qu'il existe un unique réel } \alpha \in \left]\frac{3}{2}, 2\right[ \text{ tel que } f(\alpha) = 0 \quad (\text{on prend } e^{3/2} = 4{,}5)",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 2c : TVI pour existence et unicité d'alpha."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        c1 = MathTex(
            r"f \text{ est continue et strictement croissante sur } [1, +\infty[, \text{ donc sur } [3/2, 2].",
            font_size=20,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"f\left(\frac{3}{2}\right) = 4\left(\frac{3}{2}\right)\left(e^{-3/2} + \frac{3}{4} - 1\right) = 6\left(e^{-3/2} - \frac{1}{4}\right)",
            font_size=20,
            color=COL_MATH,
        )
        c3 = MathTex(
            r"e^{3/2} = 4{,}5 \implies e^{-3/2} = \frac{1}{4{,}5} = \frac{2}{9} \approx 0{,}222 \implies f\left(\frac{3}{2}\right) \approx 6(0{,}222 - 0{,}25) < 0",
            font_size=19,
            color=COL_WARN,
        )
        c4 = MathTex(
            r"f(2) = 4(2)(e^{-2} + 1 - 1) = 8e^{-2} > 0 \quad (\text{car } e^{-2} > 0)",
            font_size=20,
            color=COL_EMPH,
        )
        c5 = MathTex(
            r"f(3/2) < 0 < f(2) \implies 0 \in f([3/2, 2])",
            font_size=20,
            color=COL_MATH,
        )
        res = MathTex(
            r"\text{Par le TVI (bijection), } \exists!\, \alpha \in \left]\frac{3}{2}, 2\right[\ ;\ f(\alpha) = 0",
            font_size=22,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(c1, c2, c3, c4, c5, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(FadeIn(c1))
        self.play(Write(c2))
        self.play(Write(c3))
        self.play(Write(c4))
        self.play(Write(c5))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 07 : Q2d Identité e^(-alpha) = 1 - alpha/2 ──────────────
    def chapitre_q2d(self):
        self.etape("07-q2d-identite-alpha")
        self.titre_zone = Text(
            "Partie I — Question 2.d (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Vérifier que : } e^{-\alpha} = 1 - \frac{\alpha}{2}",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 2d : Simplification de f(alpha) = 0."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        eq1 = MathTex(r"f(\alpha) = 0 \iff 4\alpha\left(e^{-\alpha} + \frac{1}{2}\alpha - 1\right) = 0", font_size=22, color=COL_MATH)
        eq2 = MathTex(r"\text{Comme } \alpha \in \left]\frac{3}{2}, 2\right[ \implies \alpha \neq 0", font_size=20, color=COL_EMPH)
        eq3 = MathTex(r"\implies e^{-\alpha} + \frac{\alpha}{2} - 1 = 0", font_size=22, color=COL_MATH)
        res = MathTex(r"e^{-\alpha} = 1 - \frac{\alpha}{2}", font_size=24, color=COL_SUCCESS)
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(eq1, eq2, eq3, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 08 : Q3a Théorème de Rolle appliqué à f' ────────────────
    def chapitre_q3a(self):
        self.etape("08-q3a-rolle-fprime")
        self.titre_zone = Text(
            "Partie I — Question 3.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{En appliquant le théorème de Rolle à } f', \text{ montrer qu'il existe } x_0 \in\,]0, 1[ \text{ tel que } f''(x_0) = 0",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 3a : Théorème de Rolle sur f' sur [0, 1]."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        h1 = MathTex(r"f' \text{ est continue sur } [0, 1] \text{ et dérivable sur } ]0, 1[", font_size=20, color=COL_MATH)
        h2 = MathTex(r"f'(0) = 0 \quad \text{et} \quad f'(1) = 0 \implies f'(0) = f'(1)", font_size=20, color=COL_EMPH)
        th = MathTex(r"\text{Hypothèses de Rolle vérifiées sur } [0, 1]", font_size=20, color=BAC_INK_SOFT)
        res = MathTex(
            r"\exists\, x_0 \in\,]0, 1[\ ;\ (f')'(x_0) = f''(x_0) = 0",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(h1, h2, th, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(FadeIn(h1))
        self.play(Write(h2))
        self.play(FadeIn(th))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 09 : Q3b Théorème des accroissements finis (f'') ────────
    def chapitre_q3b(self):
        self.etape("09-q3b-taf-fseconde")
        self.titre_zone = Text(
            "Partie I — Question 3.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{En appliquant le TAF à } f'', \text{ montrer que } (\forall x\in [0, 1]\setminus\{x_0\})\ ;\ \frac{f''(x)}{x - x_0} > 0",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 3b : TAF appliqué à f'' entre x et x0."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        c1 = MathTex(
            r"f''(x) = (4e^{-x} - 4x\,e^{-x} + 4x - 4)' = 4\left[1 + (x - 2)e^{-x}\right]",
            font_size=20,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"f^{(3)}(x) = 4\left[e^{-x} - (x - 2)e^{-x}\right] = 4e^{-x}(3 - x)",
            font_size=20,
            color=COL_MATH,
        )
        c3 = MathTex(
            r"x \in [0, 1] \implies 3 - x \in [2, 3] > 0 \implies f^{(3)}(x) > 0 \text{ sur } [0, 1]",
            font_size=20,
            color=COL_EMPH,
        )
        c4 = MathTex(
            r"\text{TAF sur } [x, x_0] \text{ ou } [x_0, x] : \exists\, c \text{ entre } x \text{ et } x_0 \text{ tel que } f''(x) - f''(x_0) = f^{(3)}(c)(x - x_0)",
            font_size=19,
            color=COL_MATH,
        )
        res = MathTex(
            r"f''(x_0) = 0 \implies \frac{f''(x)}{x - x_0} = f^{(3)}(c) > 0 \quad (\text{car } c \in [0, 1])",
            font_size=21,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(c1, c2, c3, c4, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(c1))
        self.play(Write(c2))
        self.play(Write(c3))
        self.play(Write(c4))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 10 : Q3c Point d'inflexion I(x0, f(x0)) ──────────────────
    def chapitre_q3c(self):
        self.etape("10-q3c-point-inflexion")
        self.titre_zone = Text(
            "Partie I — Question 3.c (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{En déduire que } I(x_0, f(x_0)) \text{ est un point d'inflexion de la courbe } (C)",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 3c : Point d'inflexion en x0 pour (C)."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        s1 = MathTex(
            r"\frac{f''(x)}{x - x_0} > 0 \implies f''(x) \text{ a le même signe que } (x - x_0)",
            font_size=21,
            color=COL_MATH,
        )
        s2 = MathTex(
            r"x < x_0 \implies f''(x) < 0 \quad (\text{concave}) \quad\text{et}\quad x > x_0 \implies f''(x) > 0 \quad (\text{convexe})",
            font_size=20,
            color=COL_EMPH,
        )
        s3 = MathTex(
            r"f'' \text{ s'annule et change de signe en } x_0",
            font_size=21,
            color=COL_WARN,
        )
        res = MathTex(
            r"I(x_0, f(x_0)) \text{ est un point d'inflexion de la courbe } (C)",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(s1, s2, s3, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(s1))
        self.play(Write(s2))
        self.play(Write(s3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 11 : Q4a Branches infinies ──────────────────────────────
    def chapitre_q4a(self):
        self.etape("11-q4a-branches-infinies")
        self.titre_zone = Text(
            "Partie I — Question 4.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Étudier les branches infinies de la courbe } (C)",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 4a : Branches paraboliques de direction (Oy)."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        eq_div = MathTex(r"\frac{f(x)}{x} = 4e^{-x} + 2x - 4 \quad (x\neq 0)", font_size=21, color=COL_MATH)

        # En +∞
        t1 = Text("• En +∞ :", font_size=17, color=COL_TITLE, weight=BOLD)
        l1 = MathTex(
            r"\lim_{x\to +\infty} \frac{f(x)}{x} = \lim_{x\to +\infty} (4e^{-x} + 2x - 4) = 0 + (+\infty) = +\infty",
            font_size=20,
            color=COL_EMPH,
        )
        r1 = MathTex(r"\implies (C) \text{ admet une branche parabolique de direction } (Oy) \text{ au voisinage de } +\infty", font_size=19, color=COL_SUCCESS)

        # En -∞
        t2 = Text("• En -∞ :", font_size=17, color=COL_TITLE, weight=BOLD)
        l2 = MathTex(
            r"\frac{f(x)}{x} = 4e^{-x}\left[1 + \frac{(x-2)e^x}{2}\right] \implies \lim_{x\to -\infty} \frac{f(x)}{x} = (+\infty)(1) = +\infty",
            font_size=20,
            color=COL_EMPH,
        )
        r2 = MathTex(r"\implies (C) \text{ admet une branche parabolique de direction } (Oy) \text{ au voisinage de } -\infty", font_size=19, color=COL_SUCCESS)

        grp = VGroup(eq_div, t1, l1, r1, t2, l2, r2).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(eq_div))
        self.play(FadeIn(t1), Write(l1), Write(r1))
        self.play(FadeIn(t2), Write(l2), Write(r2))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 12 : Q4b Tracé de la courbe (C) ─────────────────────────
    def chapitre_q4b(self):
        self.etape("12-q4b-courbe-C")
        self.titre_zone = Text(
            "Partie I — Question 4.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Représenter graphiquement la courbe } (C) \text{ dans le repère } (O ; \vec{i}, \vec{j})",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 4b : Tracé de (C) avec extrema et alpha."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        # Éléments remarquables à gauche
        p1 = Text("• Maximum local en (0, 0) : f(0) = 0", font_size=16, color=COL_MATH)
        p2 = Text("• Minimum local en (1, -0.53) : f(1) = 4/e - 2", font_size=16, color=COL_MATH)
        p3 = Text("• Deuxième zéro en alpha in ]1.5, 1.73[ : f(alpha) = 0", font_size=16, color=COL_EMPH)
        p4 = Text("• Deux branches paraboliques de direction (Oy)", font_size=16, color=BAC_INK_SOFT)

        info_side = VGroup(p1, p2, p3, p4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        info_side.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        # Repère orthonormé isotrope à droite (échelle x = échelle y = 1.0)
        axes = Axes(
            x_range=[-1.5, 2.8, 1],
            y_range=[-2.0, 3.5, 1],
            x_length=4.3,
            y_length=5.5,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.2)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[-1, 1, 2], y_vals=[-1, 1, 2, 3])

        # Fonction f(x) = 4x(e^(-x) + x/2 - 1)
        f_func = lambda x: 4 * x * (np.exp(-x) + 0.5 * x - 1)
        courbe = axes.plot(f_func, x_range=[-0.85, 2.5], color=COL_MATH, stroke_width=2.5)

        # Points remarquables
        p_O = axes.c2p(0, 0)
        dot_O = Dot(p_O, color=COL_TITLE, radius=0.06)
        lbl_O = MathTex("O(0,0)", font_size=16, color=COL_TITLE).next_to(dot_O, UL, buff=0.06)

        p_min = axes.c2p(1, 4/np.e - 2)
        dot_min = Dot(p_min, color=COL_WARN, radius=0.06)
        lbl_min = MathTex(r"\left(1, \frac{4}{e}-2\right)", font_size=16, color=COL_WARN).next_to(dot_min, DOWN, buff=0.06)

        # alpha ≈ 1.638
        alpha_val = 1.638
        p_alpha = axes.c2p(alpha_val, 0)
        dot_alpha = Dot(p_alpha, color=COL_SUCCESS, radius=0.06)
        lbl_alpha = MathTex(r"\alpha", font_size=16, color=COL_SUCCESS).next_to(dot_alpha, UR, buff=0.06)

        # Tangentes horizontales en 0 et 1
        tan0 = Line(axes.c2p(-0.4, 0), axes.c2p(0.4, 0), color=COL_EMPH, stroke_width=2)
        tan1 = Line(axes.c2p(0.6, 4/np.e - 2), axes.c2p(1.4, 4/np.e - 2), color=COL_EMPH, stroke_width=2)

        lbl_courbe = MathTex("(C)", font_size=18, color=COL_MATH).next_to(axes.c2p(2.2, f_func(2.2)), RIGHT, buff=0.08)

        self.play(FadeIn(info_side))
        self.play(
            Create(courbe), FadeIn(lbl_courbe),
            Create(tan0), Create(tan1),
            FadeIn(dot_O), FadeIn(lbl_O),
            FadeIn(dot_min), FadeIn(lbl_min),
            FadeIn(dot_alpha), FadeIn(lbl_alpha),
        )
        self.pose(2.0)

        fig_grp = VGroup(
            axes, labels_axes, courbe, lbl_courbe,
            tan0, tan1, dot_O, lbl_O, dot_min, lbl_min, dot_alpha, lbl_alpha
        )
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(info_side), FadeOut(fig_grp))

    # ── Étape 13 : Q5a Signe de f sur ]-∞, alpha] ─────────────────────
    def chapitre_q5a(self):
        self.etape("13-q5a-signe-f")
        self.titre_zone = Text(
            "Partie I — Question 5.a (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Vérifier que : } (\forall x\in\,]-\infty, \alpha])\ ;\ f(x) \le 0",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 5a : Signe négatif de f sur ]-infini, alpha]."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        m1 = MathTex(
            r"\bullet\ \text{Sur } ]-\infty, 0] :\ f \text{ est croissante} \implies f(x) \le f(0) = 0",
            font_size=20,
            color=COL_MATH,
        )
        m2 = MathTex(
            r"\bullet\ \text{Sur } [0, 1] :\ f \text{ est décroissante à partir de } f(0) = 0 \implies f(x) \le 0",
            font_size=20,
            color=COL_MATH,
        )
        m3 = MathTex(
            r"\bullet\ \text{Sur } [1, \alpha] :\ f \text{ est croissante jusqu'à } f(\alpha) = 0 \implies f(x) \le f(\alpha) = 0",
            font_size=20,
            color=COL_MATH,
        )
        res = MathTex(
            r"(\forall x\in\,]-\infty, \alpha])\quad f(x) \le 0",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(m1, m2, m3, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(m1))
        self.play(Write(m2))
        self.play(Write(m3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 14 : Q5b Intégrale et encadrement de alpha ──────────────
    def chapitre_q5b(self):
        self.etape("14-q5b-integrale-encadrement-alpha")
        self.titre_zone = Text(
            "Partie I — Question 5.b (0,75 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer que } \int_0^\alpha f(x)\,dx = \frac{2}{3}\alpha(\alpha^2 - 3) \text{ et en déduire que } \frac{3}{2} < \alpha \le \sqrt{3}",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 5b : Primitivation IPP et encadrement alpha."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        p1 = MathTex(
            r"F(x) = -4(x+1)e^{-x} + \frac{2}{3}x^3 - 2x^2 \quad (\text{primitive de } f,\ \text{avec IPP sur } 4x\,e^{-x})",
            font_size=19,
            color=COL_MATH,
        )
        p2 = MathTex(r"F(0) = -4(1)(1) + 0 - 0 = -4", font_size=19, color=COL_MATH)
        p3 = MathTex(
            r"F(\alpha) = -4(\alpha+1)\left(1 - \frac{\alpha}{2}\right) + \frac{2}{3}\alpha^3 - 2\alpha^2 = \frac{2}{3}\alpha^3 - 2\alpha - 4",
            font_size=19,
            color=COL_EMPH,
        )
        p4 = MathTex(
            r"\int_0^\alpha f(x)\,dx = F(\alpha) - F(0) = \frac{2}{3}\alpha^3 - 2\alpha = \frac{2}{3}\alpha(\alpha^2 - 3)",
            font_size=20,
            color=COL_SUCCESS,
        )
        p5 = MathTex(
            r"f \le 0 \text{ sur } [0, \alpha] \implies \int_0^\alpha f(x)\,dx \le 0 \implies \frac{2}{3}\alpha(\alpha^2 - 3) \le 0",
            font_size=19,
            color=COL_WARN,
        )
        res = MathTex(
            r"\alpha > 0 \implies \alpha^2 \le 3 \implies \frac{3}{2} < \alpha \le \sqrt{3}",
            font_size=22,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(p1, p2, p3, p4, p5, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(p1))
        self.play(Write(p2), Write(p3))
        self.play(Write(p4))
        self.play(Write(p5))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 15 : Q5c Calcul d'aire ──────────────────────────────────
    def chapitre_q5c(self):
        self.etape("15-q5c-aire-domaine")
        self.titre_zone = Text(
            "Partie I — Question 5.c (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Calculer en } \text{cm}^2 \text{ l'aire du domaine plan délimité par } (C),\, y=0,\, x=0,\, x=\alpha",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 5c : Aire du domaine sous l'axe Ox."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        # Calcul à gauche
        a1 = MathTex(
            r"\text{Sur } [0, \alpha],\ f(x) \le 0 \implies \text{Aire} = \int_0^\alpha \big(0 - f(x)\big)\,dx = -\int_0^\alpha f(x)\,dx",
            font_size=19,
            color=COL_MATH,
        )
        a2 = MathTex(
            r"\text{Aire} = -\frac{2}{3}\alpha(\alpha^2 - 3) = \frac{2}{3}\alpha(3 - \alpha^2) \times \|\vec{i}\|\cdot\|\vec{j}\|",
            font_size=19,
            color=COL_EMPH,
        )
        res = MathTex(
            r"\text{Aire} = \frac{2}{3}\alpha(3 - \alpha^2)\ \text{cm}^2",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        calc_side = VGroup(a1, a2, VGroup(res, cadre)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        calc_side.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        # Illustration géométrique du domaine à droite (repère isotrope)
        axes = Axes(
            x_range=[-0.5, 2.2, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=3.6,
            y_length=4.0,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[1], y_vals=[-1, 1])

        f_func = lambda x: 4 * x * (np.exp(-x) + 0.5 * x - 1)
        courbe = axes.plot(f_func, x_range=[-0.2, 1.9], color=COL_MATH, stroke_width=2.5)

        alpha_val = 1.638
        domaine = axes.get_area(courbe, x_range=[0, alpha_val], color=COL_EMPH, opacity=0.35)

        p_alpha = axes.c2p(alpha_val, 0)
        dot_alpha = Dot(p_alpha, color=COL_SUCCESS, radius=0.06)
        lbl_alpha = MathTex(r"\alpha", font_size=16, color=COL_SUCCESS).next_to(dot_alpha, UR, buff=0.05)

        self.play(Write(a1))
        self.play(
            Create(courbe),
            FadeIn(domaine),
            FadeIn(dot_alpha), FadeIn(lbl_alpha),
        )
        self.play(Write(a2))
        self.play(Write(res), Create(cadre))
        self.pose(2.0)

        fig_grp = VGroup(axes, labels_axes, courbe, domaine, dot_alpha, lbl_alpha)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_side), FadeOut(fig_grp))

    # ── Étape 16 : Q6a Majoration de la suite (u_n) par alpha ─────────
    def chapitre_q6a(self):
        self.etape("16-q6a-suite-majoration-alpha")
        self.titre_zone = Text(
            "Partie II — Question 1.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer par récurrence que : } (\forall n\in\mathbb{N})\ ;\ u_n < \alpha \quad (u_0 < \alpha,\ u_{n+1} = f(u_n) + u_n)",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 6a : Majoration stricte de u_n par alpha."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        r0 = MathTex(r"\bullet\ \text{Pour } n = 0 :\ u_0 < \alpha \quad (\text{hypothèse de l'énoncé, initialisation vérifiée})", font_size=20, color=COL_MATH)
        r1 = MathTex(r"\bullet\ \text{Hérédité : Supposons que } u_n < \alpha \text{ pour un entier } n \ge 0", font_size=20, color=COL_MATH)
        r2 = MathTex(
            r"u_n < \alpha \implies u_n \le \alpha \implies f(u_n) \le 0 \quad (\text{d'après la Partie I, Q5.a})",
            font_size=20,
            color=COL_EMPH,
        )
        r3 = MathTex(
            r"u_{n+1} = f(u_n) + u_n \le u_n < \alpha \implies u_{n+1} < \alpha",
            font_size=21,
            color=COL_SUCCESS,
        )
        res = MathTex(
            r"(\forall n\in\mathbb{N})\quad u_n < \alpha",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(r0, r1, r2, r3, VGroup(res, cadre)).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(r0))
        self.play(Write(r1))
        self.play(Write(r2))
        self.play(Write(r3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 17 : Q6b Décroissance de la suite (u_n) ─────────────────
    def chapitre_q6b(self):
        self.etape("17-q6b-suite-decroissance")
        self.titre_zone = Text(
            "Partie II — Question 1.b (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{En déduire que la suite } (u_n)_{n\in\mathbb{N}} \text{ est décroissante.}",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 6b : Décroissance de la suite (u_n)."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        d1 = MathTex(r"u_{n+1} - u_n = f(u_n) \quad (\text{par définition de la suite})", font_size=21, color=COL_MATH)
        d2 = MathTex(
            r"(\forall n\in\mathbb{N})\ u_n < \alpha \implies f(u_n) \le 0 \quad (\text{Partie I, Q5.a})",
            font_size=21,
            color=COL_EMPH,
        )
        d3 = MathTex(r"\implies u_{n+1} - u_n \le 0 \implies u_{n+1} \le u_n", font_size=21, color=COL_MATH)
        res = MathTex(
            r"\text{La suite } (u_n)_{n\in\mathbb{N}} \text{ est décroissante}",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(d1, d2, d3, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(d1))
        self.play(Write(d2))
        self.play(Write(d3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 18 : Q7a Étude de la fonction auxiliaire g ──────────────
    def chapitre_q7a(self):
        self.etape("18-q7a-fonction-g-positive")
        self.titre_zone = Text(
            "Partie II — Question 2.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{On pose } g(x) = e^{-x} + \frac{1}{2}x - \frac{3}{4}.\ \text{Montrer que : } (\forall x\in\mathbb{R})\ ;\ g(x) > 0 \quad (\ln 2 = 0{,}69)",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 7a : Minimum de g en ln 2 et positivité."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        g1 = MathTex(r"g'(x) = -e^{-x} + \frac{1}{2}", font_size=20, color=COL_MATH)
        g2 = MathTex(r"g'(x) = 0 \iff e^{-x} = \frac{1}{2} \iff -x = -\ln 2 \iff x = \ln 2", font_size=20, color=COL_EMPH)
        g3 = MathTex(
            r"g \text{ est strictement décroissante sur } ]-\infty, \ln 2] \text{ et strictement croissante sur } [\ln 2, +\infty[",
            font_size=19,
            color=COL_MATH,
        )
        g4 = MathTex(
            r"g(\ln 2) = e^{-\ln 2} + \frac{\ln 2}{2} - \frac{3}{4} = \frac{1}{2} + \frac{\ln 2}{2} - \frac{3}{4} = \frac{\ln 2}{2} - \frac{1}{4}",
            font_size=20,
            color=COL_MATH,
        )
        g5 = MathTex(
            r"g(\ln 2) \approx \frac{0{,}69}{2} - 0{,}25 = 0{,}345 - 0{,}25 = 0{,}095 > 0",
            font_size=20,
            color=COL_EMPH,
        )
        res = MathTex(
            r"\min_{\mathbb{R}} g > 0 \implies (\forall x\in\mathbb{R})\quad g(x) > 0",
            font_size=23,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(g1, g2, g3, g4, g5, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(g1))
        self.play(Write(g2))
        self.play(Write(g3))
        self.play(Write(g4))
        self.play(Write(g5))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 19 : Q7b Minoration de u_n par 0 dans le cas 0 <= u0 ────
    def chapitre_q7b(self):
        self.etape("19-q7b-suite-minoration-zero")
        self.titre_zone = Text(
            "Partie II — Question 2.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Sous l'hypothèse } 0 \le u_0, \text{ montrer que : } (\forall n\in\mathbb{N})\ ;\ 0 \le u_n \quad (f(x) + x = 4x\,g(x))",
            font_size=20,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 7b : Minoration de u_n par récurrence."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        i1 = MathTex(
            r"4x\,g(x) = 4x\left(e^{-x} + \frac{1}{2}x - \frac{3}{4}\right) = 4x\,e^{-x} + 2x^2 - 3x = f(x) + x",
            font_size=20,
            color=COL_MATH,
        )
        i2 = MathTex(r"\implies u_{n+1} = f(u_n) + u_n = 4u_n\,g(u_n)", font_size=21, color=COL_EMPH)
        i3 = MathTex(r"\bullet\ \text{Rang } n = 0 :\ u_0 \ge 0 \quad (\text{hypothèse du cas})", font_size=20, color=COL_MATH)
        i4 = MathTex(
            r"\bullet\ \text{Hérédité : Si } u_n \ge 0, \text{ comme } g(u_n) > 0 \implies u_{n+1} = 4u_n\,g(u_n) \ge 0",
            font_size=20,
            color=COL_MATH,
        )
        res = MathTex(
            r"(\forall n\in\mathbb{N})\quad 0 \le u_n < \alpha",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(i1, i2, i3, i4, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(i1))
        self.play(Write(i2))
        self.play(Write(i3))
        self.play(Write(i4))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 20 : Q7c & Q7d Convergence et limite de (u_n) ───────────
    def chapitre_q7c_q7d(self):
        self.etape("20-q7c-q7d-suite-limite-zero")
        self.titre_zone = Text(
            "Partie II — Questions 2.c & 2.d (0,75 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer que } (u_n)_{n\in\mathbb{N}} \text{ est convergente puis calculer sa limite } \lim_{n\to +\infty} u_n",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Questions 7c-7d : Convergence monotone et limite 0."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        # Convergence
        t1 = Text("• Convergence (théorème de la limite monotone) :", font_size=17, color=COL_TITLE, weight=BOLD)
        l1 = MathTex(
            r"(u_n) \text{ est décroissante (Q1.b) et minorée par } 0 \text{ (Q2.b)} \implies (u_n) \text{ converge vers } \ell \in [0, \alpha[",
            font_size=19,
            color=COL_EMPH,
        )

        # Limite
        t2 = Text("• Détermination de la limite :", font_size=17, color=COL_TITLE, weight=BOLD)
        l2 = MathTex(
            r"u_{n+1} = f(u_n) + u_n \quad\text{et}\ f \text{ continue} \implies \ell = f(\ell) + \ell \implies f(\ell) = 0",
            font_size=20,
            color=COL_MATH,
        )
        l3 = MathTex(
            r"f(x) = 0 \iff x \in \{0, \alpha\} \quad (\text{seuls zéros de } f \text{ d'après le tableau de variations})",
            font_size=19,
            color=COL_MATH,
        )
        l4 = MathTex(
            r"(u_n) \text{ décroissante} \implies \ell \le u_0 < \alpha \implies \ell \neq \alpha \implies \ell = 0",
            font_size=20,
            color=COL_WARN,
        )
        res = MathTex(
            r"\lim_{n\to +\infty} u_n = 0",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(t1, l1, t2, l2, l3, l4, VGroup(res, cadre)).arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(FadeIn(t1), Write(l1))
        self.play(FadeIn(t2), Write(l2))
        self.play(Write(l3))
        self.play(Write(l4))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 21 : Q8a Cas u0 < 0 : accroissements ────────────────────
    def chapitre_q8a(self):
        self.etape("21-q8a-suite-majoration-accroissements")
        self.titre_zone = Text(
            "Partie II — Question 3.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{On suppose que } u_0 < 0.\ \text{Montrer que : } (\forall n\in\mathbb{N})\ ;\ u_{n+1} - u_n \le f(u_0)",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Question 8a : Majoration des accroissements de u_n."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        k1 = MathTex(r"u_{n+1} - u_n = f(u_n) \quad (\text{par définition})", font_size=21, color=COL_MATH)
        k2 = MathTex(
            r"(u_n) \text{ décroissante} \implies (\forall n\in\mathbb{N})\ u_n \le u_0 < 0",
            font_size=21,
            color=COL_EMPH,
        )
        k3 = MathTex(
            r"f \text{ est strictement croissante sur } ]-\infty, 0] \implies f(u_n) \le f(u_0)",
            font_size=21,
            color=COL_MATH,
        )
        res = MathTex(
            r"(\forall n\in\mathbb{N})\quad u_{n+1} - u_n \le f(u_0)",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(k1, k2, k3, VGroup(res, cadre)).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        self.play(Write(k1))
        self.play(Write(k2))
        self.play(Write(k3))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 22 : Q8b & Q8c Somme télescopique et divergence vers -∞ ──
    def chapitre_q8b_q8c(self):
        self.etape("22-q8b-q8c-suite-limite-moins-infini")
        self.titre_zone = Text(
            "Partie II — Questions 3.b & 3.c (0,75 pt)",
            font_size=20,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6).to_edge(LEFT, buff=0.8)

        enonce = MathTex(
            r"\text{Montrer que } u_n \le u_0 + n\,f(u_0) \text{ et en déduire } \lim_{n\to +\infty} u_n",
            font_size=21,
            color=COL_MATH,
        ).next_to(self.titre_zone, DOWN, buff=0.2, aligned_edge=LEFT)

        self.legende(
            "Questions 8b-8c : Télescopage et limite -infini."
        )
        self.play(FadeIn(self.titre_zone), FadeIn(enonce))

        s1 = MathTex(
            r"\sum_{k=0}^{n-1} (u_{k+1} - u_k) \le \sum_{k=0}^{n-1} f(u_0) = n\,f(u_0)",
            font_size=21,
            color=COL_MATH,
        )
        s2 = MathTex(
            r"u_n - u_0 \le n\,f(u_0) \implies u_n \le u_0 + n\,f(u_0)",
            font_size=22,
            color=COL_EMPH,
        )
        s3 = MathTex(
            r"u_0 < 0 \text{ et } f \text{ strictement croissante sur } ]-\infty, 0] \implies f(u_0) < f(0) = 0",
            font_size=20,
            color=COL_WARN,
        )
        s4 = MathTex(
            r"f(u_0) < 0 \implies \lim_{n\to +\infty} \big(u_0 + n\,f(u_0)\big) = -\infty",
            font_size=21,
            color=COL_WARN,
        )
        res = MathTex(
            r"\text{Par comparaison : }\quad \lim_{n\to +\infty} u_n = -\infty",
            font_size=24,
            color=COL_SUCCESS,
        )
        cadre = SurroundingRectangle(res, color=COL_SUCCESS, buff=0.12)

        grp = VGroup(s1, s2, s3, s4, VGroup(res, cadre)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        self.play(Write(s1))
        self.play(Write(s2))
        self.play(Write(s3))
        self.play(Write(s4))
        self.play(Write(res), Create(cadre))
        self.pose(1.5)

        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp))

    # ── Étape 23 : Bilan de l'exercice ────────────────────────────────
    def chapitre_fin(self):
        self.etape("23-bilan")
        titre = Text(
            "Bilan de l'exercice — Bac 2019 SM (10 points)",
            font_size=24,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.7)

        p1 = Text("• Étude de f : limites en ±infini, dérivée factorisée 4(exp(-x)-1)(1-x), extrema en 0 et 1", font_size=16, color=COL_MATH)
        p2 = Text("• Théorèmes : Rolle sur f' donne f''(x0)=0, puis TAF donne inflexion en I(x0, f(x0))", font_size=16, color=COL_MATH)
        p3 = Text("• TVI & Intégrale : racine unique alpha in ]3/2, sqrt(3)], aire = (2/3)alpha(3-alpha^2) cm^2", font_size=16, color=COL_MATH)
        p4 = Text("• Suite récurrente u(n+1) = f(u_n) + u_n : toujours décroissante (f(u_n) <= 0)", font_size=16, color=COL_EMPH)
        p5 = Text("• Si 0 <= u0 < alpha : suite minorée par 0 (via f(x)+x = 4xg(x)), convergente vers 0", font_size=16, color=COL_SUCCESS)
        p6 = Text("• Si u0 < 0 : suite majorée par u0 + n f(u0), divergente vers -infini", font_size=16, color=COL_WARN)

        pts = VGroup(p1, p2, p3, p4, p5, p6).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.4)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.legende(
            "Bilan : étude complète, théorèmes et suite."
        )

        self.play(FadeIn(bilan))
        self.pose(5.0)
        self.play(FadeOut(bilan))

