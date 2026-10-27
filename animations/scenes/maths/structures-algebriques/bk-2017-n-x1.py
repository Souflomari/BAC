#!/usr/bin/env python3
"""Bac 2017 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Matrices 3x3, loi T par matrice pivot, homomorphisme depuis (C*, x) et corps commutatif.
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
VALS_ENONCE = "3, 0.5, 0.75, 3.5, 2017, 1, 2, 4, 0"


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
            "Bac 2017 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 1 : Matrices 3x3, Loi T & Corps commutatif (3,5 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2017 SM : Structure de corps commutatif sur (E, +, T).")

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

        t1 = Text("Cadre & Définitions de l'exercice", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Soit la matrice pivot A et la matrice M(a,b) pour (a,b) in R^2 :", font_size=16, color=COL_MATH)
        c_mat = MathTex(
            r"A = \begin{pmatrix}1&0&0\\1&1&0\\1&1&1\end{pmatrix}, \quad M(a,b) = \begin{pmatrix}a&b&-b\\0&0&0\\b&-a&a\end{pmatrix}",
            font_size=17,
            color=COL_MATH,
        )
        r2 = Text("• On pose E = { M(a,b) / (a,b) in R^2 }.", font_size=16, color=COL_MATH)
        r3 = Text("• Loi T : M(a,b) T M(c,d) = M(a,b) x A x M(c,d).", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif : Prouver que (E, +, T) est un corps commutatif.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c_mat, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Définition du pivot A, des matrices M(a,b) et de E.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Sous-groupe additif (E,+)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-sous-groupe-additif")
        self.ardoise()

        t1 = Text("Q1 — E sous-groupe de (M_3(R), +) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Stabilité pour l'addition :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(a,b) + M(c,d) = M(a+c,\ b+d) \in E", font_size=18, color=COL_MATH)

        r2 = Text("• Éléments neutre et symétrique :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"O = M(0,0) \in E \quad \text{et} \quad -M(a,b) = M(-a,\ -b) \in E", font_size=18, color=COL_MATH)

        r3 = Text("• E est non vide et stable par différence :", font_size=16, color=COL_MATH)
        c3 = Text("E est un sous-groupe commutatif de (M_3(R), +).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : E est un sous-groupe additif de M_3(R).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Stabilité pour la loi T
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-stabilite-loi-T")
        self.ardoise()

        t1 = Text("Q2 — Stabilité de E pour la loi T (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Premier produit M(a,b) x A :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"M(a,b) \times A = \begin{pmatrix}a&b&-b\\0&0&0\\b&-a&a\end{pmatrix}\begin{pmatrix}1&0&0\\1&1&0\\1&1&1\end{pmatrix} = \begin{pmatrix}a&0&-b\\0&0&0\\b&0&a\end{pmatrix}",
            font_size=16,
            color=COL_MATH,
        )

        r2 = Text("• Second produit (M(a,b) x A) x M(c,d) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"M(a,b)\,T\,M(c,d) = \begin{pmatrix}ac-bd&ad+bc&-(ad+bc)\\0&0&0\\ad+bc&-(ac-bd)&ac-bd\end{pmatrix}",
            font_size=16,
            color=COL_MATH,
        )
        c3 = MathTex(r"M(a,b)\,T\,M(c,d) = M(ac-bd,\ ad+bc) \in E", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : M(a,b) T M(c,d) = M(ac-bd, ad+bc) in E.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — Homomorphisme phi depuis (C*, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-homomorphisme-phi")
        self.ardoise()

        t1 = Text("Q3 — Homomorphisme phi : (C*, x) -> (E, T) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Soit z_1 = a+ib et z_2 = c+id. On a z_1 * z_2 = (ac-bd) + i(ad+bc) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\varphi(z_1 z_2) = M(ac-bd,\ ad+bc) = M(a,b)\,T\,M(c,d) = \varphi(z_1)\,T\,\varphi(z_2)", font_size=16, color=COL_SUCCESS)

        r2 = Text("• phi est un homomorphisme de groupes.", font_size=16, color=COL_MATH)
        r3 = Text("• Injectivité & Image de C* : a+ib != 0 <=> (a,b) != (0,0) <=> M(a,b) != O :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\varphi(\mathbb{C}^*) = E \setminus \{M(0,0)\} = E^*", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(VGroup(c1, c2), color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 3 : phi est un isomorphisme de (C*, x) sur (E*, T).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Groupe commutatif (E*, T) & Neutre J
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-groupe-commutatif-neutre")
        self.ardoise()

        t1 = Text("Q4 — Structure de (E*, T) & Élément neutre (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (C*, x) est un groupe commutatif de neutre 1.", font_size=16, color=COL_MATH)
        r2 = Text("• Par transport de structure via l'isomorphisme phi :", font_size=16, color=COL_MATH)
        c1 = Text("(E*, T) est un groupe commutatif.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        r3 = Text("• L'élément neutre J est l'image du neutre 1 de C* :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"J = \varphi(1) = \varphi(1 + i\cdot 0) = M(1,0) = \begin{pmatrix}1&0&0\\0&0&0\\0&-1&1\end{pmatrix}", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : (E*, T) groupe commutatif de neutre J = M(1,0).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — Distributivité de T par rapport à +
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("07-q5-distributivite-T-sur-plus")
        self.ardoise()

        t1 = Text("Q5 — Distributivité de T sur + dans E (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On calcule M(a,b) T (M(c,d) + M(e,f)) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(a,b)\,T\,M(c+e,\ d+f) = M\big(a(c+e)-b(d+f),\ a(d+f)+b(c+e)\big)", font_size=16, color=COL_MATH)

        r2 = Text("• Par distributivité dans R :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"= M(ac-bd,\ ad+bc) + M(ae-bf,\ af+be)", font_size=16, color=COL_MATH)
        c3 = MathTex(r"= \big(M(a,b)\,T\,M(c,d)\big) + \big(M(a,b)\,T\,M(e,f)\big)", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : T est distributive par rapport à + dans E.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 6 — (E, +, T) est un corps commutatif
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("08-q6-corps-commutatif")
        self.ardoise()

        t1 = Text("Q6 — (E, +, T) est un corps commutatif (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (E, +) est un groupe abélien de neutre O = M(0,0) (Q1).", font_size=16, color=COL_MATH)
        r2 = Text("• T est associative (produit matriciel) et distributive sur + (Q5).", font_size=16, color=COL_MATH)
        r3 = Text("• (E*, T) est un groupe commutatif d'unité J = M(1,0) (Q4).", font_size=16, color=COL_MATH)
        r4 = Text("• Tout élément non nul de E admet donc un symétrique pour T dans E.", font_size=16, color=COL_MATH)

        concl = Text("(E, +, T) est un corps commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(r4, buff=0.2)
        self.ecrit(concl, buff=0.28)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 6 : Conclusion — (E, +, T) est un corps commutatif.")
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
            "Bilan — Bac 2017 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : (E, +) sous-groupe additif abélien de M_3(R)", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : Stabilité de E pour T : M(a,b) T M(c,d) = M(ac-bd, ad+bc)", font_size=16, color=COL_MATH)
        p3 = Text("• Q3 : phi isomorphisme de (C*, x) sur (E*, T)", font_size=16, color=COL_MATH)
        p4 = Text("• Q4 : (E*, T) groupe commutatif de neutre J = M(1,0)", font_size=16, color=COL_MATH)
        p5 = Text("• Q5-Q6 : Distributivité de T sur + => (E, +, T) corps commutatif", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2017 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
