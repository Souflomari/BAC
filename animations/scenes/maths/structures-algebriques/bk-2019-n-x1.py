#!/usr/bin/env python3
"""Bac 2019 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Loi interne sur C, groupe, sous-groupe et isomorphisme vers des matrices.
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
VALS_ENONCE = "0.25, 0.5, 3.5, 2019, 1, 2, 4, 0"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3_q4()
        self.chapitre_q5_q6()
        self.chapitre_q7()
        self.chapitre_q8_q9()
        self.chapitre_q10()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2019 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 1 : Loi sur C, Sous-groupes & Isomorphisme (3,5 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2019 SM : Loi interne sur C et transport vers M_2(R).")

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

        t1 = Text("Cadre & Définition de la loi * sur C", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Pour tous (x,y) et (a,b) dans R^2, la loi * sur C est définie par :", font_size=16, color=COL_MATH)
        c_loi = MathTex(
            r"(x+yi) \ast (a+bi) = xa + \left(x^2 b + a^2 y\right)i",
            font_size=19,
            color=COL_MATH,
        )
        r2 = Text("• Partie I : Propriétés de * sur C (commutativité, associativité, neutre, symétrique).", font_size=16, color=COL_TITLE)
        r3 = Text("• Partie II : Sous-groupes E et G.", font_size=16, color=COL_TITLE)
        r4 = Text("• Partie III : Isomorphisme vers l'ensemble de matrices F.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_loi, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Définition de la loi * sur l'ensemble des complexes C.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Commutativité et Associativité
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-commutativite-associativite")
        self.ardoise()

        t1 = Text("Q1 & Q2 — Commutativité et Associativité (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : (a+bi) * (x+yi) = ax + (a^2 y + x^2 b)i = (x+yi) * (a+bi) :", font_size=16, color=COL_MATH)
        c1 = Text("La loi * est commutative sur C.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        r2 = Text("• Q2 (0,5 pt) : Pour z_1=x+yi, z_2=a+bi, z_3=c+di, on développe les deux membres :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"(z_1 \ast z_2) \ast z_3 = xac + \left(x^2 a^2 d + c^2 x^2 b + c^2 a^2 y\right)i",
            font_size=16,
            color=COL_MATH,
        )
        c3 = MathTex(
            r"z_1 \ast (z_2 \ast z_3) = xac + \left(x^2 a^2 d + x^2 c^2 b + a^2 c^2 y\right)i",
            font_size=16,
            color=COL_MATH,
        )
        c4 = Text("La loi * est associative sur C.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(c4, buff=0.22)

        box = SurroundingRectangle(c4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 1 et 2 : * est commutative et associative sur C.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Questions 3 & 4 — Élément neutre et Symétrique
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_q4(self):
        self.etape("04-q3-q4-neutre-symetrique")
        self.ardoise()

        t1 = Text("Q3 & Q4 — Neutre et Symétrique de x+yi (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 (0,25 pt) : (x+yi) * (p+qi) = xp + (x^2 q + p^2 y)i = x+yi => p=1, q=0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"e = 1 = 1 + 0i \quad \text{est l'élément neutre de } (\mathbb{C}, \ast)", font_size=17, color=COL_SUCCESS)

        r2 = Text("• Q4 (0,25 pt) : Pour x != 0, on teste s = 1/x - (y/x^4)i :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"(x+yi) \ast \left(\dfrac{1}{x} - \dfrac{y}{x^4}i\right) = x\cdot\dfrac{1}{x} + \left(x^2\left(-\dfrac{y}{x^4}\right) + \left(\dfrac{1}{x}\right)^2 y\right)i",
            font_size=16,
            color=COL_MATH,
        )
        c3 = MathTex(r"= 1 + \left(-\dfrac{y}{x^2} + \dfrac{y}{x^2}\right)i = 1 = e", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 3 et 4 : Neutre e = 1 et symétrique 1/x - (y/x^4)i.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Questions 5 & 6 — Le groupe commutatif (E, *)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5_q6(self):
        self.etape("05-q5-q6-groupe-E")
        self.ardoise()

        t1 = Text("Q5 & Q6 — Groupe commutatif (E, *) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• E = { x+yi / x > 0, y in R }. Pour z_1, z_2 in E, x>0 et a>0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"z_1 \ast z_2 = xa + (x^2 b + a^2 y)i \quad \text{avec } xa > 0 \implies z_1 \ast z_2 \in E", font_size=17, color=COL_MATH)

        r2 = Text("• Q6 (0,5 pt) : Axiomes dans E :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"e = 1 \in E \ (1>0) \quad \text{et} \quad \text{sym}(x+yi) = \dfrac{1}{x} - \dfrac{y}{x^4}i \in E \ \left(\dfrac{1}{x} > 0\right)", font_size=16, color=COL_MATH)
        c3 = Text("(E, *) est un groupe commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 5 et 6 : (E, *) est un groupe commutatif.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 7 — Sous-groupe G de (E, *)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("06-q7-sous-groupe-G")
        self.ardoise()

        t1 = Text("Q7 — G sous-groupe de (E, *) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• G = { 1+yi / y in R } est inclus dans E (partie réelle 1 > 0).", font_size=16, color=COL_MATH)
        r2 = Text("• Stabilité pour la loi * :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(1+yi) \ast (1+ci) = 1\cdot 1 + (1^2 c + 1^2 y)i = 1 + (y+c)i \in G", font_size=17, color=COL_MATH)

        r3 = Text("• Neutre et symétriques dans G :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"e = 1 = 1+0i \in G \quad \text{et} \quad \text{sym}(1+yi) = 1 - yi \in G", font_size=17, color=COL_MATH)
        c3 = Text("G est un sous-groupe de (E, *).", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : G = {1+yi} est un sous-groupe de (E, *).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Questions 8 & 9 — Isomorphisme phi : (E, *) -> (F, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8_q9(self):
        self.etape("07-q8-q9-isomorphisme-phi")
        self.ardoise()

        t1 = Text("Q8 & Q9 — Isomorphisme phi : (E, *) -> (F, x) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q8 (0,25 pt) : F = { M(x,y) = [[x, y], [0, x]] / x>0, y in R } stable pour x :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(x,y) \times M(a,b) = \begin{pmatrix}xa & xb+ya\\0 & xa\end{pmatrix} = M(xa,\ xb+ya) \in F", font_size=16, color=COL_MATH)

        r2 = Text("• Q9 (0,5 pt) : Morphisme pour phi(x+yi) = M(x^2, y) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\varphi(z_1 \ast z_2) = M((xa)^2,\, x^2 b + a^2 y) = M(x^2, y) \times M(a^2, b) = \varphi(z_1) \times \varphi(z_2)",
            font_size=16,
            color=COL_SUCCESS,
        )
        r3 = Text("• Bijection : x>0 => x^2=u admet l'unique solution x=sqrt(u) > 0.", font_size=16, color=COL_MATH)
        c3 = Text("phi est un isomorphisme de (E, *) vers (F, x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 8 et 9 : phi est un isomorphisme de (E, *) vers (F, x).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 10 — Groupe commutatif (F, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q10(self):
        self.etape("08-q10-groupe-F")
        self.ardoise()

        t1 = Text("Q10 — Structure de (F, x) (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (E, *) est un groupe commutatif (Q6).", font_size=16, color=COL_MATH)
        r2 = Text("• phi est un isomorphisme de (E, *) vers (F, x) (Q9).", font_size=16, color=COL_MATH)
        r3 = Text("• Par transport de structure :", font_size=16, color=COL_MATH)

        c1 = Text("(F, x) est un groupe commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        r4 = Text("• L'élément neutre est l'image du neutre 1 de E :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\varphi(1) = M(1^2, 0) = M(1,0) = \begin{pmatrix}1 & 0\\0 & 1\end{pmatrix} = I", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r4, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c1, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 10 : (F, x) groupe commutatif de neutre I.")
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
            "Bilan — Bac 2019 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q4 : Propriétés de * sur C : commutative, associative, e=1, symétrique", font_size=16, color=COL_MATH)
        p2 = Text("• Q5-Q6 : E = {x+yi / x>0} est stable pour * => (E, *) groupe commutatif", font_size=16, color=COL_MATH)
        p3 = Text("• Q7 : G = {1+yi} est un sous-groupe de (E, *)", font_size=16, color=COL_MATH)
        p4 = Text("• Q8-Q9 : phi(x+yi) = M(x^2, y) est un isomorphisme de (E, *) vers (F, x)", font_size=16, color=COL_MATH)
        p5 = Text("• Q10 : Transport de structure => (F, x) est un groupe commutatif de neutre I", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2019 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
