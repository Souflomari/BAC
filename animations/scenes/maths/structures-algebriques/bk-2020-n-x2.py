#!/usr/bin/env python3
"""Bac 2020 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Partie stable de M2(R), groupe non commutatif, homomorphisme depuis (R*, x).
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
VALS_ENONCE = "0.5, 1, 3.5, 2020, 2019, 2, 4, 0"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2020 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 2 : Matrices 2x2, Groupe non commutatif & Isomorphisme (3,5 pts)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2020 SM : Structure de groupe non commutatif et transport.")

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

        t1 = Text("Cadre & Définition de l'ensemble E", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• On rappelle que (M_2(R), +, x) est un anneau unitaire d'unité I = [[1,0],[0,1]].", font_size=16, color=COL_MATH)
        r2 = Text("• On considère le sous-ensemble E de M_2(R) défini par :", font_size=16, color=COL_MATH)
        c_mat = MathTex(
            r"E = \left\{ \begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix} \ \Big/\ x \in \mathbb{R},\ y \in \mathbb{R}^* \right\}",
            font_size=18,
            color=COL_MATH,
        )
        r3 = Text("• Partie I : Stabilité, non-commutativité et structure de groupe de (E, x).", font_size=16, color=COL_TITLE)
        r4 = Text("• Partie II : Sous-ensemble F et homomorphisme depuis (R*, x).", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c_mat, buff=0.25)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Définition de l'ensemble de matrices E dans M_2(R).")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Stabilité de E pour la multiplication
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-stabilite-E")
        self.ardoise()

        t1 = Text("Q1 — Stabilité de E pour le produit matriciel (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Soient deux matrices de E avec x,a in R et y,b in R* :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix}\begin{pmatrix} 1 & a \\ 0 & b \end{pmatrix} = \begin{pmatrix} 1 & a + xb \\ 0 & yb \end{pmatrix}",
            font_size=18,
            color=COL_MATH,
        )

        r2 = Text("• Comme y != 0 et b != 0, le produit y*b est non nul (yb in R*) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"yb \neq 0 \implies \begin{pmatrix} 1 & a + xb \\ 0 & yb \end{pmatrix} \in E", font_size=18, color=COL_SUCCESS)
        c3 = Text("E est une partie stable de (M_2(R), x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : E est stable pour la multiplication matricielle.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Non-commutativité de la multiplication dans E
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-non-commutativite")
        self.ardoise()

        t1 = Text("Q2 — Non-commutativité de la multiplication dans E (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Dans l'ordre inverse, le coefficient haut-droit devient x+ay au lieu de a+xb :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\begin{pmatrix} 1 & a \\ 0 & b \end{pmatrix}\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix} = \begin{pmatrix} 1 & x + ay \\ 0 & by \end{pmatrix}",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Contre-exemple numérique avec x=0, y=2, a=1, b=1 :", font_size=16, color=COL_WARN)
        c2 = MathTex(
            r"\begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix}\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 0 & 2 \end{pmatrix} \quad \neq \quad \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & 2 \end{pmatrix} = \begin{pmatrix} 1 & 2 \\ 0 & 2 \end{pmatrix}",
            font_size=16,
            color=COL_WARN,
        )
        c3 = Text("La multiplication n'est pas commutative dans E.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : La loi x n'est pas commutative dans E.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — Calcul des produits symétriques
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-symetriques-E")
        self.ardoise()

        t1 = Text("Q3 — Vérification du symétrique dans E (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Pour tout x in R et y in R*, on teste la matrice candidate [[1, -x/y], [0, 1/y]] :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix}\begin{pmatrix} 1 & -\dfrac{x}{y} \\ 0 & \dfrac{1}{y} \end{pmatrix} = \begin{pmatrix} 1 & -\dfrac{x}{y} + x\cdot\dfrac{1}{y} \\ 0 & y\cdot\dfrac{1}{y} \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Dans l'ordre inverse :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\begin{pmatrix} 1 & -\dfrac{x}{y} \\ 0 & \dfrac{1}{y} \end{pmatrix}\begin{pmatrix} 1 & x \\ 0 & y \end{pmatrix} = \begin{pmatrix} 1 & x - \dfrac{x}{y}\cdot y \\ 0 & \dfrac{1}{y}\cdot y \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I",
            font_size=16,
            color=COL_MATH,
        )
        c3 = Text("L'élément admet un inverse à gauche et à droite égal à I.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Vérification du candidat symétrique dans E.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Groupe non commutatif (E, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-groupe-non-commutatif-E")
        self.ardoise()

        t1 = Text("Q4 — (E, x) est un groupe non commutatif (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Stabilité : E est stable pour x (Q1).", font_size=16, color=COL_MATH)
        r2 = Text("• Associativité : la multiplication matricielle est toujours associative.", font_size=16, color=COL_MATH)
        r3 = Text("• Élément neutre : I = [[1, 0], [0, 1]] appartient à E (x=0 in R, y=1 in R*).", font_size=16, color=COL_MATH)
        r4 = Text("• Symétrique : pour toute matrice de E, son symétrique appartient à E car 1/y != 0 (Q3).", font_size=16, color=COL_MATH)
        r5 = Text("• Non-commutativité : établie à la question 2.", font_size=16, color=COL_WARN)

        concl = Text("(E, x) est un groupe non commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(r5, buff=0.18)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : (E, x) est un groupe non commutatif.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — Homomorphisme phi depuis (R*, x) vers (E, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("07-q5-homomorphisme-phi")
        self.ardoise()

        t1 = Text("Q5 — Homomorphisme phi : (R*, x) -> (E, x) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• F = { M(x) = [[1, x-1], [0, x]] / x in R* }. Soit phi(x) = M(x).", font_size=16, color=COL_MATH)
        r2 = Text("• Calcul de phi(x) x phi(t) pour x, t in R* :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"\varphi(x)\times\varphi(t) = \begin{pmatrix} 1 & x-1 \\ 0 & x \end{pmatrix}\begin{pmatrix} 1 & t-1 \\ 0 & t \end{pmatrix} = \begin{pmatrix} 1 & (t-1) + (x-1)t \\ 0 & xt \end{pmatrix}",
            font_size=16,
            color=COL_MATH,
        )

        r3 = Text("• Simplification du terme haut-droit : (t-1) + (xt - t) = xt - 1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\varphi(x)\times\varphi(t) = \begin{pmatrix} 1 & xt-1 \\ 0 & xt \end{pmatrix} = M(xt) = \varphi(x\times t)",
            font_size=17,
            color=COL_SUCCESS,
        )
        c3 = Text("phi est un homomorphisme de (R*, x) vers (E, x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : phi est un homomorphisme de (R*, x) vers (E, x).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 6 — Groupe commutatif (F, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("08-q6-groupe-commutatif-F")
        self.ardoise()

        t1 = Text("Q6 — Structure de (F, x) & Élément neutre (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• F = phi(R*) par définition même de F (surjectivité de phi sur F).", font_size=16, color=COL_MATH)
        r2 = Text("• Injectivité : phi(x) = phi(t) => x = t (le coefficient bas-droit vaut x).", font_size=16, color=COL_MATH)
        r3 = Text("• phi est donc un isomorphisme de (R*, x) vers (F, x).", font_size=16, color=COL_MATH)
        r4 = Text("• Comme (R*, x) est un groupe commutatif, par transport de structure :", font_size=16, color=COL_MATH)

        c1 = Text("(F, x) est un groupe commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        r5 = Text("• L'élément neutre est l'image du neutre 1 de R* :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\varphi(1) = M(1) = \begin{pmatrix} 1 & 1-1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r5, buff=0.18)
        self.ecrit(c2, buff=0.22)

        box = SurroundingRectangle(c1, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (F, x) groupe commutatif de neutre I.")
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
            "Bilan — Bac 2020 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : E est une partie stable de (M_2(R), x)", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : La multiplication matricielle n'est pas commutative dans E", font_size=16, color=COL_MATH)
        p3 = Text("• Q3-Q4 : Neutre I et symétriques dans E => (E, x) groupe non commutatif", font_size=16, color=COL_MATH)
        p4 = Text("• Q5 : phi(x) = M(x) est un homomorphisme de (R*, x) vers (E, x)", font_size=16, color=COL_MATH)
        p5 = Text("• Q6 : phi isomorphisme de (R*, x) sur (F, x) => (F, x) groupe commutatif de neutre I", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2020 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
