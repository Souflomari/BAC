#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Expérimentales) — Équations Différentielles (1 point)
Équation du second ordre à racine double : résoudre puis identifier une solution.
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
VALS_ENONCE = "1, 0.5, 2, 4, -2, 2.5"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q2a_caracteristique()
        self.chapitre_q2a_solution()
        self.chapitre_q2b_forme_h()
        self.chapitre_q2b_conditions()
        self.chapitre_q2b_figure()
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
            "Exercice 4 : Équation différentielle du second ordre (1 pt)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SExp : Équation différentielle à racine double.")

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
        e_def = MathTex(r"(E) :\ y'' - 2y' + y = 0", font_size=19, color=COL_MATH)
        h_def = MathTex(r"h(x) = (x+1)e^x \quad (x \in \mathbb{R})", font_size=18, color=COL_MATH)
        cond = MathTex(r"\text{Conditions initiales : } h(0) = 1 \quad\text{et}\quad h'(0) = 2", font_size=17, color=COL_EMPH)

        self.ecrit(t1, buff=0.3)
        self.ecrit(e_def, buff=0.35)
        self.ecrit(h_def, buff=0.35)
        self.ecrit(cond, buff=0.35)

        self.legende("Présentation de (E) et de la fonction candidate h.")
        self.pose(2.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 2a : Équation caractéristique
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2a_caracteristique(self):
        self.etape("03-q2a-equation-caracteristique")
        self.ardoise()

        t1 = Text("Question 2.a — Partie 1 (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = MathTex(r"\text{Résoudre dans }\mathbb{R}\text{ l'équation différentielle }(E) : y'' - 2y' + y = 0", font_size=16, color=COL_TITLE)

        r1 = Text("• Équation caractéristique associée à (E) :", font_size=16, color=COL_MATH)
        eq_c = MathTex(r"r^2 - 2r + 1 = 0", font_size=18, color=COL_MATH)
        d1 = MathTex(r"\Delta = (-2)^2 - 4(1)(1) = 4 - 4 = 0", font_size=16, color=COL_MATH)
        d2 = MathTex(r"(r - 1)^2 = 0 \implies r = \frac{2}{2} = 1 \quad (\text{racine double})", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(eq_c, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.3)
        box = SurroundingRectangle(d2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2a : Discriminant nul, racine double r = 1.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2a : Solution générale de (E)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2a_solution(self):
        self.etape("04-q2a-solution-generale")
        self.ardoise()

        t1 = Text("Question 2.a — Partie 2 (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Structure de la solution générale (cas racine double r = 1) :", font_size=16, color=COL_MATH)
        r2 = MathTex(r"y(x) = (Ax + B)e^{rx} \quad\text{avec } r=1", font_size=17, color=COL_MATH)
        concl = MathTex(r"\mathcal{S}_{(E)} = \left\{ x \mapsto (Ax + B)e^x \;\big|\; A, B \in \mathbb{R} \right\}", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.3)
        self.ecrit(concl, buff=0.35)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 2a : Solution générale y(x) = (Ax + B) e^x.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2b : Forme de la solution h
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2b_forme_h(self):
        self.etape("05-q2b-forme-solution-h")
        self.ardoise()

        t1 = Text("Question 2.b — Partie 1 (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("Montrer que h est solution de (E) vérifiant h(0)=1 et h'(0)=2", font_size=16, color=COL_TITLE)

        p1 = Text("• Appartenance à la famille de solutions de (E) :", font_size=16, color=COL_MATH)
        p2 = MathTex(r"h(x) = (x+1)e^x = (1\cdot x + 1)e^x", font_size=17, color=COL_MATH)
        p3 = MathTex(r"\text{Ici } A = 1 \in \mathbb{R} \quad\text{et}\quad B = 1 \in \mathbb{R}", font_size=16, color=COL_MATH)
        concl = Text("Donc h est bien une solution de l'équation différentielle (E).", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(p1, buff=0.25)
        self.ecrit(p2, buff=0.3)
        self.ecrit(p3, buff=0.25)
        self.ecrit(concl, buff=0.3)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2b : h(x) correspond à A = 1 et B = 1.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 2b : Dérivée et vérification des conditions initiales
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2b_conditions(self):
        self.etape("06-q2b-derivee-et-conditions")
        self.ardoise()

        t1 = Text("Question 2.b — Partie 2 (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        d1 = Text("• Dérivée de h (règle du produit) :", font_size=16, color=COL_MATH)
        d2 = MathTex(r"h'(x) = 1\cdot e^x + (x+1)e^x = (x+2)e^x", font_size=17, color=COL_MATH)

        v1 = Text("• Vérification des conditions en x = 0 :", font_size=16, color=COL_MATH)
        v2 = MathTex(r"h(0) = (0+1)e^0 = 1\cdot 1 = 1 \quad (\text{première condition vérifiée})", font_size=16, color=COL_SUCCESS)
        v3 = MathTex(r"h'(0) = (0+2)e^0 = 2\cdot 1 = 2 \quad (\text{seconde condition vérifiée})", font_size=16, color=COL_SUCCESS)
        concl = Text("Conclusion : h est l'unique solution de (E) vérifiant h(0)=1 et h'(0)=2.", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(d1, buff=0.25)
        self.ecrit(d2, buff=0.25)
        self.ecrit(v1, buff=0.25)
        self.ecrit(v2, buff=0.22)
        self.ecrit(v3, buff=0.22)
        self.ecrit(concl, buff=0.25)
        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2b : h(0) = 1 et h'(0) = 2 vérifiés.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 2b : Illustration géométrique de la solution h
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2b_figure(self):
        self.etape("07-q2b-illustration-courbe")
        self.ardoise()

        t1 = Text("Représentation de la solution h", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = MathTex(r"h(x) = (x+1)e^x", font_size=17, color=COL_MATH)
        r2 = Text("• Point de départ : (0, h(0)) = (0, 1)", font_size=16, color=COL_MATH)
        r3 = Text("• Tangente en (0,1) : pente h'(0) = 2", font_size=16, color=COL_SUCCESS)
        r4 = MathTex(r"(T) :\ y = 2x + 1", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.3)
        self.ecrit(r3, buff=0.3)
        self.ecrit(r4, buff=0.3)

        # Repère Isotropie (§2.3) : scale = 1.0
        axes = Axes(
            x_range=[-3.0, 2.0, 1.0],
            y_range=[-1.0, 5.0, 1.0],
            x_length=5.0,
            y_length=6.0,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_tip": True},
        ).to_edge(RIGHT, buff=0.6).shift(DOWN * 0.1)

        self.play(Create(axes, run_time=1.0))
        labels_axes = self.graduations(axes, x_vals=[-2, -1, 1], y_vals=[-1, 1, 2, 3, 4])

        h_func = lambda x: (x + 1) * np.exp(x)
        curve_h = axes.plot(h_func, x_range=[-2.8, 1.1], color=COL_MATH, stroke_width=2.5)
        lbl_h = MathTex(r"(C_h)", font_size=16, color=COL_MATH).next_to(axes.c2p(0.8, 4.0), RIGHT, buff=0.05)

        tangente = axes.plot(lambda x: 2 * x + 1, x_range=[-0.8, 1.2], color=COL_EMPH, stroke_width=1.8)
        lbl_tan = MathTex(r"(T): y=2x+1", font_size=16, color=COL_EMPH).next_to(axes.c2p(0.8, 2.6), DR, buff=0.05)

        pt_0 = axes.c2p(0, 1)
        dot_0 = Dot(pt_0, color=COL_SUCCESS, radius=0.07)
        lbl_pt = MathTex(r"(0,1)", font_size=16, color=COL_SUCCESS).next_to(dot_0, UL, buff=0.05)

        fig_grp = VGroup(axes, labels_axes, curve_h, lbl_h, tangente, lbl_tan, dot_0, lbl_pt)

        self.play(Create(curve_h), FadeIn(lbl_h))
        self.play(Create(tangente), FadeIn(lbl_tan, dot_0, lbl_pt))

        self.legende("Courbe de h(x)=(x+1)e^x et tangente (T) de pente 2 en (0,1).")
        self.pose(4.0)
        self.play(FadeOut(fig_grp))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("08-bilan")
        titre = Text(
            "Bilan — Bac 2022 SExp (Équations Différentielles, 1 pt)",
            font_size=24,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.7)

        p1 = Text("• Équation (E) : y'' - 2y' + y = 0", font_size=16, color=COL_MATH)
        p2 = Text("• Équation caractéristique r^2 - 2r + 1 = 0 : racine double r = 1", font_size=16, color=COL_MATH)
        p3 = Text("• Solution générale : y(x) = (Ax + B)e^x avec A, B dans R", font_size=16, color=COL_SUCCESS)
        p4 = Text("• h(x) = (x+1)e^x correspond à A = 1 et B = 1", font_size=16, color=COL_MATH)
        p5 = Text("• Conditions vérifiées : h(0) = 1 et h'(0) = 2 (solution unique)", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.4)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de l'équation différentielle Bac 2022 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
