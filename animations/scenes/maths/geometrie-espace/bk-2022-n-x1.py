#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Expérimentales) — Géométrie dans l'espace (3 points)
Plan tangent à une sphère, droite perpendiculaire et distance à une droite.
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
VALS_ENONCE = "0, 1, 2, 3, 4, 0.1, 1.1, 1.2, 22, 2022, 2026, 136586, 0.5, 0.25, 3.0, 01, 02, 03, 04, 05, 06, 07, 08, 09"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7()
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
            "Exercice 1 : Géométrie dans l'espace (3 points)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SExp : Plan tangent, droite et sphère.")

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
            r"A(0,\,1,\,1), \qquad B(1,\,2,\,0), \qquad C(-1,\,1,\,2)",
            font_size=18,
            color=COL_MATH,
        )
        r2 = Text("• Sphère (S) de centre Omega(1, 1, 2) et de rayon R = sqrt(2).", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif 1 : Équation de (ABC) et tangence du plan à la sphère.", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif 2 : Droite (Delta) perpendiculaire à (ABC), tangence et distances.", font_size=16, color=COL_TITLE)

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
    # 03. Questions 1 & 2 — Produit vectoriel et équation du plan (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-plan-abc")
        self.ardoise()

        t1 = Text("Q1-Q2 — Vecteur normal & Plan (ABC) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Coordonnées des vecteurs AB et AC :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\vec{AB} = (1,\,1,\,-1), \qquad \vec{AC} = (-1,\,0,\,1)", font_size=17, color=COL_MATH)

        r2 = Text("• Calcul du produit vectoriel AB ^ AC :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\vec{AB}\wedge\vec{AC} = \begin{pmatrix} (1)(1) - (-1)(0) \\ (-1)(-1) - (1)(1) \\ (1)(0) - (1)(-1) \end{pmatrix} = \begin{pmatrix} 1 \\ 0 \\ 1 \end{pmatrix} = \vec{i} + \vec{k}",
            font_size=16,
            color=COL_SUCCESS,
        )

        r3 = Text("• Équation du plan (ABC) : n = (1, 0, 1) et A(0, 1, 1) in (ABC) :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"1(x) + 0(y) + 1(z) + d = 0 \implies 0 + 1 + d = 0 \implies d = -1", font_size=17, color=COL_MATH)

        concl = MathTex(r"(ABC) : \quad x + z - 1 = 0", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.18)
        self.ecrit(r1, buff=0.16)
        self.ecrit(c1, buff=0.16)
        self.ecrit(r2, buff=0.16)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r3, buff=0.16)
        self.ecrit(c3, buff=0.18)
        self.ecrit(concl, buff=0.2)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 1 & 2 : AB ^ AC = (1, 0, 1) et (ABC) : x + z - 1 = 0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 3 — Équation de la sphère (S)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("04-q3-sphere-equation")
        self.ardoise()

        t1 = Text("Q3 — Équation de la sphère (S) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Centre Omega(1, 1, 2) et rayon R = sqrt(2) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"(S) : \quad (x - x_\Omega)^2 + (y - y_\Omega)^2 + (z - z_\Omega)^2 = R^2",
            font_size=18,
            color=COL_MATH,
        )

        r2 = Text("• Forme centre-rayon et forme développée :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"(S) : \quad (x-1)^2 + (y-1)^2 + (z-2)^2 = 2",
            font_size=18,
            color=COL_SUCCESS,
        )
        c3 = MathTex(
            r"\iff x^2 + y^2 + z^2 - 2x - 2y - 4z + 4 = 0",
            font_size=17,
            color=COL_MATH,
        )

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Équation de la sphère (S) de rayon sqrt(2).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 4 — Tangence du plan (ABC) à la sphère (S) en A
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("05-q4-tangence-plan-sphere")
        self.ardoise()

        t1 = Text("Q4 — Tangence de (ABC) à (S) au point A (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Distance du centre Omega(1, 1, 2) au plan (ABC) : x+z-1=0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"d(\Omega,\,(ABC)) = \dfrac{|1 + 0(1) + 2 - 1|}{\sqrt{1^2 + 0^2 + 1^2}} = \dfrac{2}{\sqrt{2}} = \sqrt{2} = R",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Comme d(Omega, (ABC)) = R, le plan (ABC) est tangent à (S).", font_size=16, color=COL_SUCCESS)
        r3 = Text("• Vecteur Omega A et vecteur normal n = (1, 0, 1) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\vec{\Omega A} = A - \Omega = (-1,\,0,\,-1) = -1 \cdot \vec{n}",
            font_size=17,
            color=COL_MATH,
        )
        r4 = Text("• A in (ABC) et Omega A colinéaire à n => A est le point de tangence.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r4, buff=0.22)

        box = SurroundingRectangle(VGroup(r2, r4), color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : (ABC) est tangent à la sphère (S) au point A.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Représentation paramétrique de la droite (Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-droite-delta")
        self.ardoise()

        t1 = Text("Q5 — Droite (Delta) perpendiculaire à (ABC) (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (Delta) passe par C(-1, 1, 2) et est perpendiculaire à (ABC) :", font_size=16, color=COL_MATH)
        r2 = Text("• Vecteur directeur u = n = (1, 0, 1) :", font_size=16, color=COL_MATH)

        c1 = MathTex(
            r"(\Delta) : \quad \begin{cases} x = -1 + t \\ y = 1 \\ z = 2 + t \end{cases} \quad (t \in \mathbb{R})",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c1, buff=0.28)

        box = SurroundingRectangle(c1, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Représentation paramétrique de (Delta).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 6 — Tangence de la droite (Delta) à la sphère (S) en D
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("07-q6-tangence-droite-sphere")
        self.ardoise()

        t1 = Text("Q6 — Tangence de (Delta) à (S) au point D (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Distance point-droite : Omega C = (-2, 0, 0) et u = (1, 0, 1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\vec{\Omega C} \wedge \vec{u}_\Delta = (0,\,2,\,0) \implies d(\Omega,\,(\Delta)) = \dfrac{\|(0,2,0)\|}{\|(1,0,1)\|} = \dfrac{2}{\sqrt{2}} = \sqrt{2} = R",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Comme d(Omega, (Delta)) = R, la droite (Delta) est tangente à (S).", font_size=16, color=COL_SUCCESS)
        r3 = Text("• Recherche du point de contact D = C + t u :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\vec{\Omega D} \cdot \vec{u}_\Delta = 0 \iff (-2+t)(1) + 0 + t(1) = 0 \iff 2t - 2 = 0 \iff t = 1",
            font_size=16,
            color=COL_MATH,
        )
        concl = MathTex(r"D = (-1+1,\,1,\,2+1) \implies D(0,\,1,\,3)", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.18)
        self.ecrit(r1, buff=0.16)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.16)
        self.ecrit(r3, buff=0.16)
        self.ecrit(c2, buff=0.18)
        self.ecrit(concl, buff=0.2)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (Delta) est tangente à (S) au point D(0, 1, 3).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 7 — Produit scalaire AC . u et distance d(A, Delta)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("08-q7-distance-point-droite")
        self.ardoise()

        t1 = Text("Q7 — Distance du point A à la droite (Delta) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Calcul du produit scalaire AC . (i + k) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\vec{AC} \cdot (\vec{i}+\vec{k}) = (-1)(1) + 0(0) + 1(1) = -1 + 1 = 0 \implies \vec{AC} \perp \vec{u}_\Delta",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Comme C in (Delta) et AC perp u_Delta, le segment [AC] réalise la distance :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"d(A,\,(\Delta)) = AC = \|\vec{AC}\| = \sqrt{(-1)^2 + 0^2 + 1^2} = \sqrt{2}",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : Distance d(A, (Delta)) = AC = sqrt(2).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("09-bilan")
        titre = Text(
            "Bilan — Bac 2022 SExp (Géométrie dans l'espace, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q2 : AB ^ AC = i + k => Plan (ABC) : x + z - 1 = 0", font_size=16, color=COL_MATH)
        p2 = Text("• Q3 : Sphère (S) : (x-1)^2 + (y-1)^2 + (z-2)^2 = 2", font_size=16, color=COL_MATH)
        p3 = Text("• Q4 : d(Omega, (ABC)) = sqrt(2) = R => (ABC) tangent à (S) en A", font_size=16, color=COL_MATH)
        p4 = Text("• Q5-Q6 : (Delta) perpendiculaire à (ABC), tangente à (S) en D(0, 1, 3)", font_size=16, color=COL_MATH)
        p5 = Text("• Q7 : AC orthogonal à u_Delta => d(A, (Delta)) = AC = sqrt(2)", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la géométrie de l'espace Bac 2022 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
