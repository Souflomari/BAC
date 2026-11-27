#!/usr/bin/env python3
"""Bac 2019 — Session Normale (Sciences Expérimentales) — Géométrie dans l'espace (3 points)
Produit vectoriel, plan (ABC), sphère (S), distance et section circulaire.
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
VALS_ENONCE = "0, 1, 2, 3, 4, 5, 2.1, 22, 2019, 2026, 68527, 1.73, 2.24, 0.75, 0.5, 3.0, 01, 02, 03, 04, 05, 06, 07, 08"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2019 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 1 : Géométrie dans l'espace (3 points)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2019 SExp : Produit vectoriel, plan et sphère.")

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.2))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 02. Données de l'exercice
    # ─────────────────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro-donnees")
        self.ardoise()

        t1 = Text("Cadre & Points de l'espace", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Espace rapporté à un repère orthonormé direct (O, i, j, k).", font_size=16, color=COL_MATH)
        c_pts = MathTex(
            r"A(1,\,-1,\,-1), \qquad B(0,\,-2,\,1), \qquad C(1,\,-2,\,0)",
            font_size=18,
            color=COL_MATH,
        )
        r2 = Text("• Sphère (S) : x^2 + y^2 + z^2 - 4x + 2y - 2z + 1 = 0.", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif 1 : Équation du plan (ABC) et caractéristiques de (S).", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif 2 : Calcul de distance et nature de l'intersection (ABC) inter (S).", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_pts, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Introduction des points A, B, C et de la sphère (S).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Produit vectoriel AB ^ AC
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-vecteur-normal-plan")
        self.ardoise()

        t1 = Text("Q1 — Produit vectoriel AB ^ AC (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Coordonnées des vecteurs AB et AC :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\vec{AB} = (0-1,\,-2-(-1),\,1-(-1)) = (-1,\,-1,\,2)",
            font_size=17,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"\vec{AC} = (1-1,\,-2-(-1),\,0-(-1)) = (0,\,-1,\,1)",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Calcul du produit vectoriel :", font_size=16, color=COL_MATH)
        c3 = MathTex(
            r"\vec{AB}\wedge\vec{AC} = \begin{pmatrix} (-1)(1) - (2)(-1) \\ (2)(0) - (-1)(1) \\ (-1)(-1) - (-1)(0) \end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 1 \end{pmatrix} = \vec{i} + \vec{j} + \vec{k}",
            font_size=16,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : AB ^ AC = (1, 1, 1) est orthogonal au plan (ABC).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Équation cartésienne du plan (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-equation-plan")
        self.ardoise()

        t1 = Text("Q2 — Équation cartésienne de (ABC) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• n = (1, 1, 1) est un vecteur normal au plan (ABC) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(ABC) : \quad x + y + z + d = 0", font_size=18, color=COL_MATH)

        r2 = Text("• Le point A(1, -1, -1) appartient au plan (ABC) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"1 + (-1) + (-1) + d = 0 \iff -1 + d = 0 \iff d = 1", font_size=17, color=COL_MATH)

        concl = MathTex(r"(ABC) : \quad x + y + z + 1 = 0", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : Équation du plan (ABC) : x + y + z + 1 = 0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — Sphère (S) : centre et rayon
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-sphere-centre-rayon")
        self.ardoise()

        t1 = Text("Q3 — Centre & Rayon de la sphère (S) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Équation initiale de (S) : x^2 + y^2 + z^2 - 4x + 2y - 2z + 1 = 0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x^2 - 4x) + (y^2 + 2y) + (z^2 - 2z) + 1 = 0", font_size=17, color=COL_MATH)

        r2 = Text("• Complétion des carrés parfaits :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(x-2)^2 - 4 + (y+1)^2 - 1 + (z-1)^2 - 1 + 1 = 0 \iff (x-2)^2 + (y+1)^2 + (z-1)^2 = 5", font_size=16, color=COL_MATH)

        concl = MathTex(r"\text{Centre } \Omega(2,\,-1,\,1), \qquad \text{Rayon } R = \sqrt{5}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Sphère (S) de centre Omega(2,-1,1) et rayon R=sqrt(5).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Distance d(Omega, (ABC))
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-distance-point-plan")
        self.ardoise()

        t1 = Text("Q4 — Distance de Omega au plan (ABC) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Distance du point Omega(2, -1, 1) au plan (ABC) : x+y+z+1=0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"d(\Omega,\,(ABC)) = \dfrac{|2 + (-1) + 1 + 1|}{\sqrt{1^2 + 1^2 + 1^2}} = \dfrac{3}{\sqrt{3}} = \sqrt{3}",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c1, buff=0.28)

        box = SurroundingRectangle(c1, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : Distance d(Omega, (ABC)) = sqrt(3).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — Intersection du plan (ABC) et de la sphère (S)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("07-q5-intersection-cercle")
        self.ardoise()

        t1 = Text("Q5 — Section sphère-plan : Cercle (Gamma) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comparaison de la distance d au rayon R :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"d(\Omega,\,(ABC)) = \sqrt{3} \approx 1{,}73, \qquad R = \sqrt{5} \approx 2{,}24",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Comme 3 < 5, on a sqrt(3) < sqrt(5) soit d < R :", font_size=16, color=COL_MATH)
        concl = Text(
            "Le plan (ABC) coupe la sphère (S) selon un cercle (Gamma).",
            font_size=17,
            color=COL_SUCCESS,
            weight=BOLD,
        )

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Comme d < R, le plan (ABC) coupe (S) selon un cercle.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("08-bilan")
        titre = Text(
            "Bilan — Bac 2019 SExp (Géométrie dans l'espace, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : AB ^ AC = (1, 1, 1) = i + j + k", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : Équation cartésienne de (ABC) : x + y + z + 1 = 0", font_size=16, color=COL_MATH)
        p3 = Text("• Q3 : Sphère (S) de centre Omega(2, -1, 1) et de rayon R = sqrt(5)", font_size=16, color=COL_MATH)
        p4 = Text("• Q4 : Distance d(Omega, (ABC)) = 3 / sqrt(3) = sqrt(3)", font_size=16, color=COL_MATH)
        p5 = Text("• Q5 : d = sqrt(3) < sqrt(5) = R => Intersection = cercle (Gamma)", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la géométrie de l'espace Bac 2019 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
