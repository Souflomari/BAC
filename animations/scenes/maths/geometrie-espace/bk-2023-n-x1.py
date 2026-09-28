#!/usr/bin/env python3
"""Bac 2023 — Session Normale (Sciences Expérimentales) — Géométrie dans l'espace (3 points)
Aire d'un triangle, tangence à une sphère et plans parallèles coupant un cercle.
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
VALS_ENONCE = "0, 1, 2, 3, 4, 5, 6, 8, 9, 12, 16, 18, 24, 32, 36, 144, 0.1, 2.1, 2.5, 8.4, 22, 2023, 2026, 137482, 0.5, 0.25, 3.0, 01, 02, 03, 04, 05, 06, 07, 08, 09"


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
            "Bac 2023 — Session Normale (SExp)",
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

        self.legende("Bac 2023 SExp : Aire, sphère et plans parallèles.")

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
            r"A(0,\,1,\,4), \qquad B(2,\,1,\,2), \qquad C(2,\,5,\,0), \qquad \Omega(3,\,4,\,4)",
            font_size=17,
            color=COL_MATH,
        )
        r2 = Text("• Sphère (S) : x^2 + y^2 + z^2 - 6x - 8y - 8z + 32 = 0.", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif 1 : Produit vectoriel, aire du triangle ABC et distance à (AC).", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif 2 : Distance de Omega à (ABC), tangence et plans parallèles sécants.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_pts, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Introduction des points A, B, C, Omega et de la sphère (S).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Produit vectoriel AB ^ AC
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-produit-vectoriel")
        self.ardoise()

        t1 = Text("Q1 — Produit vectoriel AB ^ AC (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Coordonnées des vecteurs AB et AC :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\vec{AB} = (2-0,\,1-1,\,2-4) = (2,\,0,\,-2)", font_size=17, color=COL_MATH)
        c2 = MathTex(r"\vec{AC} = (2-0,\,5-1,\,0-4) = (2,\,4,\,-4)", font_size=17, color=COL_MATH)

        r2 = Text("• Calcul du produit vectoriel :", font_size=16, color=COL_MATH)
        c3 = MathTex(
            r"\vec{AB}\wedge\vec{AC} = \begin{pmatrix} (0)(-4) - (-2)(4) \\ (-2)(2) - (2)(-4) \\ (2)(4) - (0)(2) \end{pmatrix} = \begin{pmatrix} 8 \\ 4 \\ 8 \end{pmatrix} = 4\begin{pmatrix} 2 \\ 1 \\ 2 \end{pmatrix} = 4\left(2\vec{i} + \vec{j} + 2\vec{k}\right)",
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

        self.legende("Question 1 : AB ^ AC = 4(2i + j + 2k) = (8, 4, 8).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Aire du triangle ABC et distance d(B, (AC))
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-aire-distance")
        self.ardoise()

        t1 = Text("Q2 — Aire(ABC) et distance d(B, (AC)) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Norme du produit vectoriel et aire du triangle ABC :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\|\vec{AB}\wedge\vec{AC}\| = \sqrt{8^2 + 4^2 + 8^2} = \sqrt{144} = 12 \implies \text{Aire}(ABC) = \dfrac{12}{2} = 6",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Longueur de la base [AC] :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"AC = \|\vec{AC}\| = \sqrt{2^2 + 4^2 + (-4)^2} = \sqrt{36} = 6", font_size=17, color=COL_MATH)

        r3 = Text("• Hauteur issue de B : Aire = (1/2) * AC * d(B, (AC)) :", font_size=16, color=COL_MATH)
        concl = MathTex(r"6 = \dfrac{1}{2} \times 6 \times d(B,\,(AC)) \iff 3\,d(B,\,(AC)) = 6 \implies d(B,\,(AC)) = 2", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(concl, buff=0.2)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : Aire(ABC) = 6 et d(B, (AC)) = 2.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Questions 3 & 4 — Milieu D et distance d(Omega, (ABC))
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_q4(self):
        self.etape("05-q3-q4-milieu-distance-centre")
        self.ardoise()

        t1 = Text("Q3-Q4 — Milieu D & Distance d(Omega, (ABC)) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 : D milieu de [AC] et vecteur D Omega :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"D = \left(\dfrac{0+2}{2},\,\dfrac{1+5}{2},\,\dfrac{4+0}{2}\right) = (1,\,3,\,2) \implies \vec{D\Omega} = \Omega - D = (2,\,1,\,2)",
            font_size=16,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"\dfrac{1}{4}(\vec{AB}\wedge\vec{AC}) = \dfrac{1}{4}(8,\,4,\,8) = (2,\,1,\,2) = \vec{D\Omega}",
            font_size=16,
            color=COL_SUCCESS,
        )

        r2 = Text("• Q4 : D in (ABC) et D Omega orthogonal à (ABC) :", font_size=16, color=COL_MATH)
        concl = MathTex(
            r"d(\Omega,\,(ABC)) = \|\vec{D\Omega}\| = \sqrt{2^2 + 1^2 + 2^2} = \sqrt{9} = 3",
            font_size=18,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 3 & 4 : D(1,3,2) et d(Omega, (ABC)) = 3.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Sphère (S) : centre et rayon
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-sphere-centre-rayon")
        self.ardoise()

        t1 = Text("Q5 — Centre & Rayon de la sphère (S) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Équation initiale de (S) : x^2 + y^2 + z^2 - 6x - 8y - 8z + 32 = 0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x^2 - 6x) + (y^2 - 8y) + (z^2 - 8z) + 32 = 0", font_size=17, color=COL_MATH)

        r2 = Text("• Complétion des carrés parfaits :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"(x-3)^2 - 9 + (y-4)^2 - 16 + (z-4)^2 - 16 + 32 = 0 \iff (x-3)^2 + (y-4)^2 + (z-4)^2 = 9",
            font_size=16,
            color=COL_MATH,
        )

        concl = MathTex(r"\text{Centre } \Omega(3,\,4,\,4), \qquad \text{Rayon } R = \sqrt{9} = 3", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Sphère (S) de centre Omega(3,4,4) et rayon R=3.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 6 — Tangence du plan (ABC) à la sphère (S) en D
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("07-q6-tangence-plan-sphere")
        self.ardoise()

        t1 = Text("Q6 — Tangence de (ABC) à (S) au point D (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Distance du centre Omega au plan (ABC) et rayon de (S) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"d(\Omega,\,(ABC)) = 3 = R \implies (ABC) \text{ est tangent à la sphère } (S)", font_size=17, color=COL_MATH)

        r2 = Text("• Identification du point de contact :", font_size=16, color=COL_MATH)
        r3 = Text("• D(1, 3, 2) in (ABC) et vecteur D Omega orthogonal au plan avec ||D Omega|| = 3 = R :", font_size=16, color=COL_MATH)

        concl = MathTex(
            r"(1-3)^2 + (3-4)^2 + (2-4)^2 = 4 + 1 + 4 = 9 = R^2 \implies D(1,\,3,\,2) \text{ est le point de tangence}",
            font_size=16,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (ABC) est tangent à (S) au point D(1, 3, 2).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 7 — Plans (Q1) et (Q2) parallèles à (ABC)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("08-q7-plans-paralleles-cercles")
        self.ardoise()

        t1 = Text("Q7 — Plans (Q1) et (Q2) parallèles à (ABC) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Forme des plans parallèles : n = (2, 1, 2) => (Q) : 2x + y + 2z + k = 0 :", font_size=16, color=COL_MATH)
        r2 = Text("• Section circulaire de rayon r = sqrt(5) sur sphère de rayon R = 3 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"R^2 = d^2 + r^2 \implies 9 = d^2 + 5 \implies d^2 = 4 \implies d = 2", font_size=17, color=COL_MATH)

        r3 = Text("• Distance de Omega(3, 4, 4) au plan (Q) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"d(\Omega,\,(Q)) = \dfrac{|2(3) + 4 + 2(4) + k|}{\sqrt{2^2 + 1^2 + 2^2}} = \dfrac{|18+k|}{3} = 2 \iff |18+k| = 6",
            font_size=16,
            color=COL_MATH,
        )
        concl = MathTex(
            r"(Q_1) : \ 2x + y + 2z - 12 = 0, \qquad (Q_2) : \ 2x + y + 2z - 24 = 0",
            font_size=17,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.18)
        self.ecrit(r1, buff=0.16)
        self.ecrit(r2, buff=0.16)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r3, buff=0.16)
        self.ecrit(c2, buff=0.18)
        self.ecrit(concl, buff=0.2)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : Équations cartésiennes des plans (Q1) et (Q2).")
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
            "Bilan — Bac 2023 SExp (Géométrie dans l'espace, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : AB ^ AC = 4(2i + j + 2k) = (8, 4, 8)", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : Aire(ABC) = 6 et d(B, (AC)) = 2", font_size=16, color=COL_MATH)
        p3 = Text("• Q3-Q4 : D(1, 3, 2) milieu de [AC] et d(Omega, (ABC)) = 3", font_size=16, color=COL_MATH)
        p4 = Text("• Q5-Q6 : Sphère (S) de centre Omega(3, 4, 4), R = 3, (ABC) tangent en D", font_size=16, color=COL_MATH)
        p5 = Text("• Q7 : Plans (Q1) : 2x+y+2z-12=0 et (Q2) : 2x+y+2z-24=0", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la géométrie de l'espace Bac 2023 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
