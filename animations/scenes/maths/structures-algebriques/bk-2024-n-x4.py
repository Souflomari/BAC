#!/usr/bin/env python3
"""Bac 2024 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Loi interne sur C x C*, groupe non commutatif et sous-groupe R x R*.
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
VALS_ENONCE = "0.5, 0.25, 3.5, 2024, 2019, 1, 2, 0, 4, 3, 5, 6, 7, 8"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7_q8()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2024 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 4 : Loi T sur C x C* & Groupe non commutatif (3,5 pts)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2024 SM : Groupe non commutatif et sous-groupe réel.")

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

        t1 = Text("Cadre & Définition de la loi T", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• On considère l'ensemble C x C* muni de la loi T définie par :", font_size=16, color=COL_MATH)
        c_loi = MathTex(
            r"\forall\big((a,b),(c,d)\big) \in (\mathbb{C}\times\mathbb{C}^*)^2, \quad (a,b)\,T\,(c,d) = (a\bar{d}+c,\ bd)",
            font_size=18,
            color=COL_MATH,
        )
        r2 = Text("• où d_barre désigne le conjugué du nombre complexe d.", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif 1 : Non-commutativité, associativité, neutre et symétrique.", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif 2 : Structure de groupe de (C x C*, T) et sous-groupe R x R*.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_loi, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Définition de la loi de composition interne T sur C x C*.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Non-commutativité de T
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-non-commutativite")
        self.ardoise()

        t1 = Text("Q1 & Q2 — Non-commutativité de la loi T (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,5 pt) : Calcul de (i,2) T (1,i) et (1,i) T (i,2) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(i,2)\,T\,(1,i) = (i\cdot\bar{i}+1,\ 2\cdot i) = (i(-i)+1,\ 2i) = (1+1,\ 2i) = (2,\ 2i)", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(1,i)\,T\,(i,2) = (1\cdot\bar{2}+i,\ i\cdot 2) = (2+i,\ 2i)", font_size=16, color=COL_MATH)

        r2 = Text("• Q2 (0,25 pt) : Comparaison des deux résultats :", font_size=16, color=COL_WARN)
        c3 = MathTex(r"2 \neq 2+i \implies (i,2)\,T\,(1,i) \neq (1,i)\,T\,(i,2)", font_size=17, color=COL_WARN)
        c4 = Text("La loi T n'est pas commutative dans C x C*.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(c4, buff=0.22)

        box = SurroundingRectangle(c4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 1 et 2 : Un contre-exemple prouve la non-commutativité.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 3 — Associativité de T
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("04-q3-associativite")
        self.ardoise()

        t1 = Text("Q3 — Associativité de la loi T (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Premier parenthésage : [(a,b) T (c,d)] T (e,f) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\big((a,b)\,T\,(c,d)\big)\,T\,(e,f) = (a\bar{d}+c,\, bd)\,T\,(e,f) = (a\bar{d}\bar{f}+c\bar{f}+e,\, bdf)", font_size=16, color=COL_MATH)

        r2 = Text("• Second parenthésage : (a,b) T [(c,d) T (e,f)] avec (df)_barre = d_barre * f_barre :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(a,b)\,T\,\big((c,d)\,T\,(e,f)\big) = (a,b)\,T\,(c\bar{f}+e,\, df) = (a\bar{d}\bar{f}+c\bar{f}+e,\, bdf)", font_size=16, color=COL_MATH)

        concl = Text("La loi T est associative dans C x C*.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : Les deux parenthésages coïncident => T est associative.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 4 — Élément neutre pour T
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("05-q4-neutre")
        self.ardoise()

        t1 = Text("Q4 — Élément neutre pour T (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Test à droite avec (0,1) in C x C* (car 1_barre = 1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(a,b)\,T\,(0,1) = (a\bar{1}+0,\ b\cdot 1) = (a,\ b)", font_size=18, color=COL_MATH)

        r2 = Text("• Test à gauche avec (0,1) (car 0 * b_barre = 0) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(0,1)\,T\,(a,b) = (0\cdot\bar{b}+a,\ 1\cdot b) = (a,\ b)", font_size=18, color=COL_MATH)

        concl = Text("(0,1) est l'élément neutre pour T dans C x C*.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : (0,1) est l'élément neutre à gauche et à droite.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Symétrique pour T
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-symetrique")
        self.ardoise()

        t1 = Text("Q5 — Symétrique d'un élément (a,b) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Pour tout (a,b) in C x C*, on teste le candidat (-a/b_barre, 1/b) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"(a,b)\,T\left(-\dfrac{a}{\bar{b}},\ \dfrac{1}{b}\right) = \left(a\cdot\overline{\left(\dfrac{1}{b}\right)} + \left(-\dfrac{a}{\bar{b}}\right),\ b\cdot\dfrac{1}{b}\right)",
            font_size=17,
            color=COL_MATH,
        )

        r2 = Text("• Comme (1/b)_barre = 1/b_barre, les termes de la première coordonnée s'annulent :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"= \left(\dfrac{a}{\bar{b}} - \dfrac{a}{\bar{b}},\ 1\right) = (0,\ 1)",
            font_size=18,
            color=COL_SUCCESS,
        )
        concl = Text("L'élément admet un inverse dans C x C*.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Vérification de la formule du symétrique.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 6 — Groupe non commutatif (C x C*, T)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("07-q6-groupe-non-commutatif")
        self.ardoise()

        t1 = Text("Q6 — (C x C*, T) groupe non commutatif (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Loi interne : b,d in C* => bd in C* => (a*d_barre+c, bd) in C x C*.", font_size=16, color=COL_MATH)
        r2 = Text("• Associativité : démontrée à la question 3.", font_size=16, color=COL_MATH)
        r3 = Text("• Élément neutre : (0,1) appartient à C x C* (Q4).", font_size=16, color=COL_MATH)
        r4 = Text("• Symétrique : (-a/b_barre, 1/b) in C x C* car b != 0 => 1/b in C* (Q5).", font_size=16, color=COL_MATH)
        r5 = Text("• Non-commutativité : établie à la question 2.", font_size=16, color=COL_WARN)

        concl = Text("(C x C*, T) est un groupe non commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(r5, buff=0.18)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (C x C*, T) est un groupe non commutatif.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Questions 7 & 8 — Sous-groupe R x R*
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7_q8(self):
        self.etape("08-q7-q8-sous-groupe-reels")
        self.ardoise()

        t1 = Text("Q7 & Q8 — Sous-groupe R x R* (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q7 (0,5 pt) : Pour (a,b), (c,d) in R x R*, d est réel donc d_barre = d :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(a,b)\,T\,(c,d) = (ad+c,\ bd) \in \mathbb{R}\times\mathbb{R}^*", font_size=17, color=COL_SUCCESS)
        c2 = Text("R x R* est stable par la loi T.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        r2 = Text("• Q8 (0,5 pt) : (0,1) in R x R* et pour tout (a,b) in R x R*, b_barre = b :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\text{sym}(a,b) = \left(-\dfrac{a}{b},\ \dfrac{1}{b}\right) \in \mathbb{R}\times\mathbb{R}^*", font_size=17, color=COL_SUCCESS)
        concl = Text("R x R* est un sous-groupe de (C x C*, T).", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.2)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 7 et 8 : R x R* est un sous-groupe de (C x C*, T).")
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
            "Bilan — Bac 2024 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q2 : (i,2) T (1,i) != (1,i) T (i,2) => T non commutative", font_size=16, color=COL_MATH)
        p2 = Text("• Q3 : (df)_barre = d_barre * f_barre => T associative sur C x C*", font_size=16, color=COL_MATH)
        p3 = Text("• Q4-Q5 : Neutre (0,1) et symétriques (-a/b_barre, 1/b) vérifiés", font_size=16, color=COL_MATH)
        p4 = Text("• Q6 : (C x C*, T) est un groupe non commutatif", font_size=16, color=COL_MATH)
        p5 = Text("• Q7-Q8 : R x R* stable et sous-groupe de (C x C*, T)", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2024 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
