#!/usr/bin/env python3
"""Bac 2024 — Session Normale (Sciences Expérimentales) — Géométrie dans l'espace (3 points)
Équation d'un plan, sphère, section circulaire et médiatrice d'un segment.
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
VALS_ENONCE = "-1, 0, 1, 2, 3, 4, 5, 6, 9, 16, 25, 0.1, 1.2, 2.1, 22, 2024, 2026, 144505, 0.5, 0.25, 3.0, 01, 02, 03, 04, 05, 06, 07, 08, 09"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3_q4()
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
            "Bac 2024 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 2 : Géométrie de l'espace (3 points)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2024 SExp : Plan, sphère, cercle et médiatrice.")

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

        t1 = Text("Cadre & Données de l'espace", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Espace rapporté à un repère orthonormé (O, i, j, k).", font_size=16, color=COL_MATH)
        c_pts = MathTex(
            r"A(-1,\,0,\,-1), \qquad B(1,\,2,\,-1), \qquad \vec{n}(2,\,-2,\,1)",
            font_size=17,
            color=COL_MATH,
        )
        r2 = Text("• Plan (P) passant par A de vecteur normal n(2, -2, 1).", font_size=16, color=COL_MATH)
        r3 = Text("• Sphère (S) de centre Omega(2, -1, 0) et de rayon R = 5.", font_size=16, color=COL_MATH)
        r4 = Text("• Objectif 1 : Équations de (P) et (S), distance d(Omega, (P)) et section circulaire.", font_size=16, color=COL_TITLE)
        r5 = Text("• Objectif 2 : Droite (Delta) orthogonale, centre du cercle et médiatrice de [AB].", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c_pts, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(r4, buff=0.2)
        self.ecrit(r5, buff=0.2)

        self.legende("Introduction des points A, B, du plan (P) et de la sphère (S).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Équation cartésienne du plan (P)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-equation-plan")
        self.ardoise()

        t1 = Text("Q1 — Équation cartésienne du plan (P) (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Le plan (P) passe par A(-1, 0, -1) et a pour normale n(2, -2, 1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"a(x - x_A) + b(y - y_A) + c(z - z_A) = 0",
            font_size=17,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"2\left(x - (-1)\right) - 2(y - 0) + 1\left(z - (-1)\right) = 0 \iff 2x + 2 - 2y + z + 1 = 0",
            font_size=16,
            color=COL_MATH,
        )

        concl = MathTex(r"(P) : \ 2x - 2y + z + 3 = 0", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : Équation du plan (P) : 2x - 2y + z + 3 = 0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Équation de la sphère (S)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-equation-sphere")
        self.ardoise()

        t1 = Text("Q2 — Équation de la sphère (S) (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Centre Omega(2, -1, 0) et rayon R = 5 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"(x - x_\Omega)^2 + (y - y_\Omega)^2 + (z - z_\Omega)^2 = R^2",
            font_size=17,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"(x - 2)^2 + (y - (-1))^2 + (z - 0)^2 = 5^2",
            font_size=17,
            color=COL_MATH,
        )

        concl = MathTex(r"(S) : \ (x - 2)^2 + (y + 1)^2 + z^2 = 25", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : Équation de (S) : (x - 2)^2 + (y + 1)^2 + z^2 = 25.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Questions 3 & 4 — Distance d(Omega, (P)) et section circulaire
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_q4(self):
        self.etape("05-q3-q4-distance-section-cercle")
        self.ardoise()

        t1 = Text("Q3-Q4 — Distance & Section circulaire (Gamma) (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 : Distance du centre Omega(2, -1, 0) au plan (P) : 2x - 2y + z + 3 = 0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"d(\Omega,\,(P)) = \dfrac{\big|2(2) - 2(-1) + 1(0) + 3\big|}{\sqrt{2^2 + (-2)^2 + 1^2}} = \dfrac{|4 + 2 + 0 + 3|}{\sqrt{9}} = \dfrac{9}{3} = 3",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Q4 : Comparaison avec le rayon R = 5 de la sphère :", font_size=16, color=COL_MATH)
        concl = MathTex(
            r"d(\Omega,\,(P)) = 3 < R = 5 \implies (P) \text{ coupe } (S) \text{ selon un cercle } (\Gamma)",
            font_size=16,
            color=COL_SUCCESS,
        )
        r3 = Text("• Rayon du cercle (Gamma) par le théorème de Pythagore :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"r = \sqrt{R^2 - d^2} = \sqrt{5^2 - 3^2} = \sqrt{25 - 9} = \sqrt{16} = 4",
            font_size=17,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(concl, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)

        box = SurroundingRectangle(VGroup(concl, c2), color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 3 & 4 : d = 3 < 5 => Cercle (Gamma) de rayon r = 4.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Droite (Delta) perpendiculaire à (P)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-droite-delta")
        self.ardoise()

        t1 = Text("Q5 — Représentation paramétrique de (Delta) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (Delta) passe par Omega(2, -1, 0) et est perpendiculaire au plan (P) :", font_size=16, color=COL_MATH)
        r2 = Text("• Vecteur directeur de (Delta) = vecteur normal de (P) = n(2, -2, 1) :", font_size=16, color=COL_MATH)

        concl = MathTex(
            r"(\Delta) : \begin{cases} x = 2 + 2t \\ y = -1 - 2t \\ z = t \end{cases} \qquad (t \in \mathbb{R})",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 5 : Droite (Delta) passant par Omega.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 6 — Point H centre du cercle (Gamma)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("07-q6-centre-du-cercle")
        self.ardoise()

        t1 = Text("Q6 — H(0, 1, -1) est le centre du cercle (Gamma) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Appartenance de H à la droite (Delta) pour t = -1 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"t = -1 \implies \begin{cases} x = 2 + 2(-1) = 0 \\ y = -1 - 2(-1) = 1 \\ z = -1 \end{cases} \implies H(0,\,1,\,-1) \in (\Delta)",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Appartenance de H au plan (P) : 2x - 2y + z + 3 = 0 :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"2(0) - 2(1) + (-1) + 3 = 0 - 2 - 1 + 3 = 0 \implies H \in (P)",
            font_size=16,
            color=COL_MATH,
        )

        concl = MathTex(
            r"H \in (\Delta)\cap (P) \implies H(0,\,1,\,-1) \text{ est le centre du cercle } (\Gamma)",
            font_size=17,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : H(0, 1, -1) est le centre du cercle (Gamma).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 7 — (Delta) médiatrice du segment [AB]
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("08-q7-mediatrice-segment")
        self.ardoise()

        t1 = Text("Q7 — (Delta) est une médiatrice de [AB] (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Milieu du segment [AB] avec A(-1, 0, -1) et B(1, 2, -1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\text{Milieu de } [AB] = \left(\dfrac{-1+1}{2},\,\dfrac{0+2}{2},\,\dfrac{-1+(-1)}{2}\right) = (0,\,1,\,-1) = H \in (\Delta)",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Vecteur AB et orthogonalité avec la direction de (Delta) : n(2, -2, 1) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\vec{AB} = B - A = (2,\,2,\,0) \implies \vec{n}\cdot\vec{AB} = 2(2) + (-2)(2) + 1(0) = 4 - 4 + 0 = 0",
            font_size=16,
            color=COL_MATH,
        )

        concl = MathTex(
            r"H \in (\Delta) \text{ et } (\Delta) \perp (AB) \implies (\Delta) \text{ est une médiatrice du segment } [AB]",
            font_size=16,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : (Delta) est médiatrice du segment [AB].")
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
            "Bilan — Bac 2024 SExp (Géométrie dans l'espace, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q2 : Plan (P) : 2x - 2y + z + 3 = 0 et (S) : (x-2)^2 + (y+1)^2 + z^2 = 25", font_size=16, color=COL_MATH)
        p2 = Text("• Q3-Q4 : d(Omega, (P)) = 3 < 5 => Section circulaire (Gamma) de rayon r = 4", font_size=16, color=COL_MATH)
        p3 = Text("• Q5 : Droite (Delta) passant par Omega(2, -1, 0) dirigée par n(2, -2, 1)", font_size=16, color=COL_MATH)
        p4 = Text("• Q6 : H(0, 1, -1) in (Delta) cap (P) est le centre du cercle (Gamma)", font_size=16, color=COL_MATH)
        p5 = Text("• Q7 : (Delta) passe par le milieu H de [AB] et (Delta) perp (AB) => médiatrice", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la géométrie de l'espace Bac 2024 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
