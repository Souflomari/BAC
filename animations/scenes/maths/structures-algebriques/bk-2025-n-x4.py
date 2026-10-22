#!/usr/bin/env python3
"""Bac 2025 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Ensemble de matrices E=I+xA, groupe pour x, loi T et corps commutatif via un isomorphisme.
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
VALS_ENONCE = "0.25, 1, 0.5, 3.5, 3.3, 2025, 2019, 2022, 2023, 0, 2, 3, 4, 5, 6, 7, 8, 9, 01, 02, 03, 04, 05, 06, 07, 08, 09"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7()
        self.chapitre_q8_q9()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2025 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 4 : Matrices E = I + xA & Corps commutatif (3,5 pts)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2025 SM : Matrices, groupe multiplicatif et corps (E, T, x).")

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

        t1 = Text("Cadre & Définitions de A et E", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• (M_3(R), +, x) anneau unitaire de neutre I et zéro O.", font_size=16, color=COL_MATH)
        c_mat = MathTex(
            r"A = \begin{pmatrix} -1 & -1 & 0 \\ -1 & -1 & 0 \\ -1 & 1 & -2 \end{pmatrix}, \qquad E = \{ M(x) = I + xA \mid x \in \mathbb{R} \}",
            font_size=17,
            color=COL_MATH,
        )
        r2 = Text("• Partie 1 : Produit M(x)M(y), non-inversibilité de M(1/2) et groupe pour x.", font_size=16, color=COL_TITLE)
        r3 = Text("• Partie 2 : Loi T, isomorphisme phi et structure de corps commutatif (E, T, x).", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_mat, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)

        self.legende("Introduction de la matrice A et de l'ensemble E = {I + xA}.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Produit matriciel
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-produit-matriciel")
        self.ardoise()

        t1 = Text("Q1 & Q2 — Carré de A & Formule du produit (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : Calcul du produit A^2 = A x A :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"A^2 = \begin{pmatrix} 2 & 2 & 0 \\ 2 & 2 & 0 \\ 2 & -2 & 4 \end{pmatrix} = -2\begin{pmatrix} -1 & -1 & 0 \\ -1 & -1 & 0 \\ -1 & 1 & -2 \end{pmatrix} = -2A",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Q2 (0,25 pt) : Produit M(x) x M(y) pour tous réels x,y :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"M(x)\times M(y) = (I+xA)(I+yA) = I + (x+y)A + xyA^2",
            font_size=16,
            color=COL_MATH,
        )
        c3 = MathTex(
            r"= I + (x+y)A - 2xyA = I + (x+y-2xy)A = M(x+y-2xy)",
            font_size=16,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(c3, buff=0.18)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 1 et 2 : A^2 = -2A permet de réduire le produit matriciel.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Questions 3 & 4 — Non-inversibilité de M(1/2)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_q4(self):
        self.etape("04-q3-q4-non-inversibilite")
        self.ardoise()

        t1 = Text("Q3 & Q4 — Non-inversibilité de M(1/2) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 (0,25 pt) : Calcul de M(1/2) = I + (1/2)A puis du produit par N :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"M\left(\dfrac{1}{2}\right) = \begin{pmatrix} 1/2 & -1/2 & 0 \\ -1/2 & 1/2 & 0 \\ -1/2 & 1/2 & 0 \end{pmatrix}, \quad N = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 1 \end{pmatrix} \implies M\left(\dfrac{1}{2}\right)\times N = O",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Q4 (0,25 pt) : Si M(1/2) était inversible dans M_3(R) :", font_size=16, color=COL_WARN)
        c2 = MathTex(
            r"M\left(\dfrac{1}{2}\right)^{-1}\times\left[M\left(\dfrac{1}{2}\right)\times N\right] = N \implies N = M\left(\dfrac{1}{2}\right)^{-1}\times O = O \quad (\text{Contradiction car } N \neq O)",
            font_size=16,
            color=COL_WARN,
        )
        concl = Text("La matrice M(1/2) n'est pas inversible dans (M_3(R), x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 3 et 4 : M(1/2) est un diviseur de zéro dans M_3(R).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 5 — Stabilité de E - {M(1/2)}
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("05-q5-stabilite-groupe")
        self.ardoise()

        t1 = Text("Q5 — Stabilité de E - {M(1/2)} pour x (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Identité fournie pour tous réels x,y :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\left(x - \dfrac{1}{2}\right)\left(y - \dfrac{1}{2}\right) = -\dfrac{1}{2}\left(x + y - 2xy - \dfrac{1}{2}\right) \iff x+y-2xy-\dfrac{1}{2} = -2\left(x-\dfrac{1}{2}\right)\left(y-\dfrac{1}{2}\right)",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Pour x != 1/2 et y != 1/2, les deux facteurs sont non nuls :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\left(x-\dfrac{1}{2}\right)\left(y-\dfrac{1}{2}\right) \neq 0 \implies x+y-2xy \neq \dfrac{1}{2}",
            font_size=16,
            color=COL_SUCCESS,
        )
        concl = Text("E - {M(1/2)} est stable pour la multiplication dans M_3(R).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Le produit de deux éléments évite la valeur 1/2.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 6 — Groupe commutatif (E - {M(1/2)}, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("06-q6-groupe-commutatif")
        self.ardoise()

        t1 = Text("Q6 — (E - {M(1/2)}, x) groupe commutatif (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Stabilité : établie à la question 5 ; Associativité : héritée de M_3(R).", font_size=16, color=COL_MATH)
        r2 = Text("• Commutativité : M(x)M(y) = M(x+y-2xy) = M(y+x-2yx) = M(y)M(x).", font_size=16, color=COL_MATH)
        r3 = Text("• Élément neutre : M(0) = I in E - {M(1/2)} car 0 != 1/2.", font_size=16, color=COL_MATH)
        r4 = Text("• Symétrique de M(x) pour x != 1/2 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"x+y-2xy=0 \iff y=\dfrac{x}{2x-1}, \quad y=\dfrac{1}{2} \implies 0=-1 \ (\text{impossible}) \implies M(y) \in E-\left\{M\left(\dfrac{1}{2}\right)\right\}",
            font_size=16,
            color=COL_SUCCESS,
        )
        concl = Text("(E - {M(1/2)}, x) est un groupe commutatif.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (E - {M(1/2)}, x) vérifie tous les axiomes du groupe.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 7 — Loi T & Homomorphisme phi
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("07-q7-morphisme-phi")
        self.ardoise()

        t1 = Text("Q7 — Loi T & Homomorphisme phi (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Loi T sur E : M(x) T M(y) = M(x + y - 1/2) et phi(x) = M((1-x)/2) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\varphi(x)\,T\,\varphi(y) = M\left(\dfrac{1-x}{2}\right)\,T\,M\left(\dfrac{1-y}{2}\right) = M\left(\dfrac{1-x}{2}+\dfrac{1-y}{2}-\dfrac{1}{2}\right) = M\left(\dfrac{1-(x+y)}{2}\right) = \varphi(x+y)",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Surjectivité de phi : pour tout M(z) in E, avec x = 1 - 2z in R :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\varphi(1-2z) = M\left(\dfrac{1-(1-2z)}{2}\right) = M(z) \implies \varphi(\mathbb{R}) = E",
            font_size=16,
            color=COL_SUCCESS,
        )
        concl = Text("phi est un homomorphisme surjectif de (R, +) sur (E, T).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : phi est un morphisme surjectif de (R,+) sur (E,T).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Questions 8 & 9 — Corps commutatif (E, T, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8_q9(self):
        self.etape("08-q8-q9-corps-commutatif")
        self.ardoise()

        t1 = Text("Q8 & Q9 — Corps commutatif (E, T, x) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q8 (0,25 pt) : phi injective car (1-x)/2=(1-y)/2 => x=y, donc phi isomorphisme :", font_size=16, color=COL_MATH)
        c1 = Text("(E, T) est un groupe commutatif de neutre phi(0) = M(1/2).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        r2 = Text("• Q9 (0,5 pt) : phi est aussi un isomorphisme pour la multiplication :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\varphi(x)\times\varphi(y) = M\left(\dfrac{1-x}{2}+\dfrac{1-y}{2}-2\cdot\dfrac{(1-x)(1-y)}{4}\right) = M\left(\dfrac{1-xy}{2}\right) = \varphi(xy)",
            font_size=16,
            color=COL_MATH,
        )
        r3 = Text("• Transport de structure : (R, +, x) corps commutatif => (E, T, x) corps commutatif.", font_size=16, color=COL_TITLE)
        concl = Text("(E, T, x) est un corps commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 8 et 9 : (E, T, x) est un corps commutatif.")
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
            "Bilan — Bac 2025 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q2 : A^2 = -2A => M(x)M(y) = M(x+y-2xy)", font_size=16, color=COL_MATH)
        p2 = Text("• Q3-Q4 : M(1/2)N = O => M(1/2) diviseur de zéro, non inversible", font_size=16, color=COL_MATH)
        p3 = Text("• Q5-Q6 : E - {M(1/2)} stable et groupe commutatif pour x", font_size=16, color=COL_MATH)
        p4 = Text("• Q7-Q8 : phi isomorphisme de (R,+) sur (E,T), neutre M(1/2)", font_size=16, color=COL_MATH)
        p5 = Text("• Q9 : phi(xy) = phi(x) x phi(y) => (E, T, x) corps commutatif", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2025 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
