#!/usr/bin/env python3
"""Bac 2018 — Session Normale (Sciences Expérimentales) — Géométrie dans l'espace (3 points)
Produit vectoriel, plan (ABC), sphère, droite orthogonale et section circulaire.
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
VALS_ENONCE = "0, 1, 2, 3, 4, 5, 6, 9, 16, 22, 23, 25, 2.2, 2018, 2026, 94699, 0.5, 0.25, 0.75, 3.0, 01, 02, 03, 04, 05, 06, 07, 08, 09"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1a()
        self.chapitre_q1b()
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
            "Bac 2018 — Session Normale (SExp)",
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

        self.legende("Bac 2018 SExp : Produit vectoriel, plan, sphère et droite.")

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
            r"A(0,\,-2,\,-2), \qquad B(1,\,-2,\,-4), \qquad C(-3,\,-1,\,2)",
            font_size=18,
            color=COL_MATH,
        )
        r2 = Text("• Sphère (S) : x^2 + y^2 + z^2 - 2x - 2z - 23 = 0.", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif 1 : Équation du plan (ABC) et éléments caractéristiques de (S).", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif 2 : Droite orthogonale (Delta) et section circulaire de (S) par (ABC).", font_size=16, color=COL_TITLE)

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
    # 03. Question 1a — Produit vectoriel AB ^ AC
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1a(self):
        self.etape("03-q1-vecteur-normal-plan")
        self.ardoise()

        t1 = Text("Q1 (a) — Produit vectoriel AB ^ AC (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Coordonnées des vecteurs AB et AC :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\vec{AB} = (1-0,\,-2-(-2),\,-4-(-2)) = (1,\,0,\,-2)",
            font_size=17,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"\vec{AC} = (-3-0,\,-1-(-2),\,2-(-2)) = (-3,\,1,\,4)",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Calcul du produit vectoriel :", font_size=16, color=COL_MATH)
        c3 = MathTex(
            r"\vec{AB}\wedge\vec{AC} = \begin{pmatrix} (0)(4) - (-2)(1) \\ (-2)(-3) - (1)(4) \\ (1)(1) - (0)(-3) \end{pmatrix} = \begin{pmatrix} 2 \\ 2 \\ 1 \end{pmatrix} = 2\vec{i} + 2\vec{j} + \vec{k}",
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

        self.legende("Question 1 (a) : AB ^ AC = (2, 2, 1) est orthogonal au plan (ABC).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 1b — Équation cartésienne du plan (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1b(self):
        self.etape("04-q1-equation-plan")
        self.ardoise()

        t1 = Text("Q1 (b) — Équation cartésienne de (ABC) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• n = (2, 2, 1) est un vecteur normal au plan (ABC) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(ABC) : \quad 2x + 2y + z + d = 0", font_size=18, color=COL_MATH)

        r2 = Text("• Le point A(0, -2, -2) appartient au plan (ABC) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2(0) + 2(-2) + (-2) + d = 0 \iff -6 + d = 0 \iff d = 6", font_size=17, color=COL_MATH)

        concl = MathTex(r"(ABC) : \quad 2x + 2y + z + 6 = 0", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 (b) : Équation cartésienne du plan (ABC) : 2x+2y+z+6=0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2 — Sphère (S) : centre et rayon
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("05-q2-sphere-centre-rayon")
        self.ardoise()

        t1 = Text("Q2 — Centre & Rayon de la sphère (S) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Équation initiale de (S) : x^2 + y^2 + z^2 - 2x - 2z - 23 = 0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x^2 - 2x) + y^2 + (z^2 - 2z) - 23 = 0", font_size=17, color=COL_MATH)

        r2 = Text("• Complétion des carrés parfaits :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(x-1)^2 - 1 + y^2 + (z-1)^2 - 1 - 23 = 0 \iff (x-1)^2 + y^2 + (z-1)^2 = 25", font_size=16, color=COL_MATH)

        concl = MathTex(r"\text{Centre } \Omega(1,\,0,\,1), \qquad \text{Rayon } R = \sqrt{25} = 5", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : Sphère (S) de centre Omega(1,0,1) et rayon R=5.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3 — Droite (Delta) orthogonale à (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("06-q3-droite-orthogonale")
        self.ardoise()

        t1 = Text("Q3 — Représentation paramétrique de (Delta) (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (Delta) passe par Omega(1, 0, 1) et est orthogonale à (ABC) :", font_size=16, color=COL_MATH)
        r2 = Text("• Son vecteur directeur u = n = (2, 2, 1) est le vecteur normal à (ABC).", font_size=16, color=COL_MATH)

        c1 = MathTex(
            r"(\Delta) : \quad \begin{cases} x = 1 + 2t \\ y = 2t \\ z = 1 + t \end{cases} \quad (t \in \mathbb{R})",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c1, buff=0.28)

        box = SurroundingRectangle(c1, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Représentation paramétrique de la droite (Delta).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4 — Point d'intersection H = (Delta) inter (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("07-q4-intersection-droite-plan")
        self.ardoise()

        t1 = Text("Q4 — Coordonnées de H = (Delta) inter (ABC) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Substitution des coordonnées de (Delta) dans l'équation de (ABC) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"2(1+2t) + 2(2t) + (1+t) + 6 = 0 \iff 9t + 9 = 0 \iff t = -1",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Coordonnées du point H pour t = -1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\begin{cases} x = 1 + 2(-1) = -1 \\ y = 2(-1) = -2 \\ z = 1 + (-1) = 0 \end{cases} \implies H(-1,\,-2,\,0)",
            font_size=17,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : Le point d'intersection est H(-1, -2, 0).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 5 — Distance d(Omega, (ABC)) & Section circulaire
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("08-q5-distance-cercle")
        self.ardoise()

        t1 = Text("Q5 — Distance & Section circulaire (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Distance de Omega(1, 0, 1) au plan (ABC) : 2x+2y+z+6=0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"d(\Omega,\,(ABC)) = \dfrac{|2(1) + 2(0) + 1(1) + 6|}{\sqrt{2^2 + 2^2 + 1^2}} = \dfrac{9}{\sqrt{9}} = \dfrac{9}{3} = 3",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Comme d = 3 < R = 5, le plan (ABC) coupe (S) selon un cercle :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\text{Rayon } r = \sqrt{R^2 - d^2} = \sqrt{5^2 - 3^2} = \sqrt{25 - 9} = \sqrt{16} = 4",
            font_size=17,
            color=COL_SUCCESS,
        )
        r3 = Text("• Le centre du cercle est le projeté orthogonal de Omega sur (ABC) : H(-1, -2, 0).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.22)

        box = SurroundingRectangle(VGroup(c2, r3), color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Section circulaire de rayon r=4 et centre H.")
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
            "Bilan — Bac 2018 SExp (Géométrie dans l'espace, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : AB ^ AC = (2, 2, 1) => Plan (ABC) : 2x + 2y + z + 6 = 0", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : Sphère (S) de centre Omega(1, 0, 1) et de rayon R = 5", font_size=16, color=COL_MATH)
        p3 = Text("• Q3 : Droite (Delta) orthogonale à (ABC) passant par Omega : x=1+2t, y=2t, z=1+t", font_size=16, color=COL_MATH)
        p4 = Text("• Q4 : Intersection (Delta) inter (ABC) = H(-1, -2, 0)", font_size=16, color=COL_MATH)
        p5 = Text("• Q5 : d(Omega, (ABC)) = 3 < 5 => Cercle de rayon r = 4 et centre H", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la géométrie de l'espace Bac 2018 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
