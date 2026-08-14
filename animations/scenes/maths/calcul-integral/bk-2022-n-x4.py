#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Expérimentales) — Calcul Intégral (1,5 points)
Primitive d'un produit en exponentielle, puis intégration par parties.
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
VALS_ENONCE = "1.5, 0.75, -1, 0, 1, 2, 2.72"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1a_primitive()
        self.chapitre_q1a_integrale()
        self.chapitre_q1a_aire()
        self.chapitre_q1b_ipp()
        self.chapitre_q1b_bord()
        self.chapitre_q1b_integrale_J()
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
            "Exercice 4 : Calcul intégral & intégration par parties (1,5 pt)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SExp : Primitive & intégration par parties.")

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
        h_def = MathTex(r"h(x) = (x+1)e^x \quad (x \in \mathbb{R})", font_size=18, color=COL_MATH)
        i_def = MathTex(r"I = \int_{-1}^{0} h(x)\,\mathrm{d}x = \int_{-1}^{0} (x+1)e^x\,\mathrm{d}x", font_size=18, color=COL_MATH)
        j_def = MathTex(r"J = \int_{-1}^{0} (x+1)^2 e^x\,\mathrm{d}x", font_size=18, color=COL_MATH)

        self.ecrit(t1, buff=0.3)
        self.ecrit(h_def, buff=0.35)
        self.ecrit(i_def, buff=0.35)
        self.ecrit(j_def, buff=0.35)

        self.legende("Présentation des fonctions et des intégrales I et J.")
        self.pose(2.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1a : Vérification de la primitive
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1a_primitive(self):
        self.etape("03-q1a-primitive-verification")
        self.ardoise()

        t1 = Text("Question 1.a — Partie 1 (0,375 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Vérifier que } x \mapsto x\,e^x \text{ est une primitive de } h \text{ sur } \mathbb{R}", font_size=16, color=COL_TITLE)

        r1 = Text("• Posons F(x) = x e^x. F est dérivable sur R comme produit.", font_size=16, color=COL_MATH)
        r2 = MathTex(r"F'(x) = (x)' e^x + x (e^x)' = 1\cdot e^x + x\cdot e^x", font_size=16, color=COL_MATH)
        r3 = MathTex(r"F'(x) = (x+1)e^x = h(x)", font_size=17, color=COL_SUCCESS)
        concl = Text("Donc la fonction x -> x e^x est bien une primitive de h sur R.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1a : (x e^x)' = (x+1) e^x = h(x).")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 1a : Calcul de l'intégrale I
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1a_integrale(self):
        self.etape("04-q1a-calcul-integrale-I")
        self.ardoise()

        t1 = Text("Question 1.a — Partie 2 (0,375 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer } I = \int_{-1}^{0} h(x)\,\mathrm{d}x", font_size=17, color=COL_TITLE)

        c1 = MathTex(r"I = \int_{-1}^{0} h(x)\,\mathrm{d}x = \left[x\,e^x\right]_{-1}^{0}", font_size=17, color=COL_MATH)
        c2 = MathTex(r"I = 0\cdot e^{0} - (-1)\cdot e^{-1}", font_size=17, color=COL_MATH)
        c3 = MathTex(r"I = 0 - \left(-\frac{1}{e}\right) = \frac{1}{e} = e^{-1}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(c1, buff=0.3)
        self.ecrit(c2, buff=0.3)
        self.ecrit(c3, buff=0.3)
        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 1a : Calcul de l'intégrale I = 1/e.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 1a : Illustration géométrique de l'aire I
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1a_aire(self):
        self.etape("05-q1a-illustration-aire-I")
        self.ardoise()

        t1 = Text("Interprétation géométrique de I", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• h(x) = (x+1)e^x >= 0 sur [-1, 0]", font_size=16, color=COL_MATH)
        r2 = MathTex(r"\bullet\ I = \int_{-1}^{0} h(x)\,\mathrm{d}x = \frac{1}{e} \approx 0.368", font_size=16, color=COL_SUCCESS)
        r3 = Text("• I représente l'aire sous la courbe (C_h) entre x = -1 et x = 0.", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.3)
        self.ecrit(r3, buff=0.3)

        # Repère Isotropie (§2.3) : scale = 1.6
        axes = Axes(
            x_range=[-2.0, 1.0, 0.5],
            y_range=[-0.5, 1.5, 0.5],
            x_length=4.8,
            y_length=3.2,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_tip": True},
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.1)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[-1.5, -1.0, -0.5, 0.5], y_vals=[-0.5, 0.5, 1.0])

        h_func = lambda x: (x + 1) * np.exp(x)
        curve_h = axes.plot(h_func, x_range=[-1.8, 0.4], color=COL_MATH, stroke_width=2.2)
        lbl_h = MathTex(r"(C_h)", font_size=16, color=COL_MATH).next_to(axes.c2p(0.3, 1.4), RIGHT, buff=0.05)

        area_I = axes.get_area(curve_h, x_range=[-1.0, 0.0], color=COL_SUCCESS, opacity=0.35)
        lbl_I = MathTex(r"I = \frac{1}{e}", font_size=16, color=COL_SUCCESS).move_to(axes.c2p(-0.4, 0.3))

        fig_grp = VGroup(axes, labels_axes, area_I, curve_h, lbl_h, lbl_I)

        self.play(Create(curve_h), FadeIn(lbl_h))
        self.play(FadeIn(area_I), FadeIn(lbl_I))

        self.legende("Aire sous la courbe de h sur [-1, 0] égale à 1/e.")
        self.pose(3.5)
        self.play(FadeOut(fig_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 1b : Choix des fonctions pour l'IPP
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1b_ipp(self):
        self.etape("06-q1b-choix-ipp")
        self.ardoise()

        t1 = Text("Question 1.b — Intégration par parties (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Calculer } J = \int_{-1}^{0} (x+1)^2 e^x\,\mathrm{d}x \text{ par IPP}", font_size=16, color=COL_TITLE)

        r1 = Text("• Formule d'intégration par parties :", font_size=16, color=COL_MATH)
        f_ipp = MathTex(r"\int_{a}^{b} u(x)v'(x)\,\mathrm{d}x = \left[u(x)v(x)\right]_{a}^{b} - \int_{a}^{b} u'(x)v(x)\,\mathrm{d}x", font_size=16, color=COL_MATH)

        r2 = Text("• Choix des facteurs (règle ALPES : polynôme en u, exp en v') :", font_size=16, color=COL_EMPH)
        u_def = MathTex(r"u(x) = (x+1)^2 \implies u'(x) = 2(x+1)", font_size=16, color=COL_MATH)
        v_def = MathTex(r"v'(x) = e^x \implies v(x) = e^x", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(f_ipp, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(u_def, buff=0.25)
        self.ecrit(v_def, buff=0.25)

        self.legende("Question 1b : Poser u(x) = (x+1)^2 et v'(x) = e^x.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 1b : Calcul du terme de bord
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1b_bord(self):
        self.etape("07-q1b-calcul-terme-bord")
        self.ardoise()

        t1 = Text("Question 1.b — Terme de bord et intégrale restante", font_size=22, color=COL_TITLE, weight=BOLD)

        b1 = MathTex(r"J = \left[(x+1)^2 e^x\right]_{-1}^{0} - \int_{-1}^{0} 2(x+1)e^x\,\mathrm{d}x", font_size=17, color=COL_MATH)
        
        c1 = Text("• Calcul du crochet de bord :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\left[(x+1)^2 e^x\right]_{-1}^{0} = (0+1)^2 e^{0} - (-1+1)^2 e^{-1} = 1\cdot 1 - 0 = 1", font_size=16, color=COL_SUCCESS)

        c3 = Text("• Lien avec l'intégrale I de la question 1.a :", font_size=16, color=COL_MATH)
        c4 = MathTex(r"\int_{-1}^{0} 2(x+1)e^x\,\mathrm{d}x = 2\int_{-1}^{0} (x+1)e^x\,\mathrm{d}x = 2I", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(b1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(c3, buff=0.25)
        self.ecrit(c4, buff=0.25)

        self.legende("Question 1b : Terme de bord = 1 et intégrale restante = 2I.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 1b : Conclusion et valeur exacte de J
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1b_integrale_J(self):
        self.etape("08-q1b-calcul-integrale-J")
        self.ardoise()

        t1 = Text("Question 1.b — Valeur finale de J", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = MathTex(r"J = 1 - 2I", font_size=18, color=COL_MATH)
        r2 = MathTex(r"\text{Comme } I = \frac{1}{e},\quad J = 1 - 2\left(\frac{1}{e}\right) = 1 - \frac{2}{e}", font_size=17, color=COL_MATH)
        r3 = MathTex(r"J = \frac{e - 2}{e}", font_size=19, color=COL_SUCCESS)
        rem = MathTex(r"\text{Remarque : } e \approx 2.72 > 2 \implies J > 0 \quad (\text{cohérent avec l'aire})", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.3)
        self.ecrit(r3, buff=0.3)
        self.ecrit(rem, buff=0.3)
        box = SurroundingRectangle(r3, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 1b : J = (e - 2) / e.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("09-bilan")
        titre = Text(
            "Bilan — Bac 2022 SExp (Calcul Intégral, 1,5 pt)",
            font_size=24,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.7)

        p1 = Text("• Primitive vérifiée : (x e^x)' = (x+1)e^x = h(x)", font_size=16, color=COL_MATH)
        p2 = Text("• Intégrale I = F(0) - F(-1) = 0 - (-1/e) = 1/e", font_size=16, color=COL_SUCCESS)
        p3 = Text("• IPP sur J avec u = (x+1)^2 et v' = e^x", font_size=16, color=COL_MATH)
        p4 = Text("• J = Terme de bord - 2I = 1 - 2/e = (e - 2)/e", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Valeur strictement positive car e ≈ 2.72 > 2", font_size=16, color=COL_MATH)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.4)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan du calcul intégral Bac 2022 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
