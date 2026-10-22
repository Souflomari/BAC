#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Anneau de matrices E, homomorphisme vers (Z, x), inversibilité et intégrité.
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
VALS_ENONCE = "0.25, 0.5, 3.5, 2022, 1, 2, 3, 4, 0, 9, 6, 8"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5_q6_q7()
        self.chapitre_q8_q9()
        self.chapitre_q10()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2022 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 4 : Anneau de matrices, Morphisme & Intégrité (3,5 pts)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SM : Structure d'anneau intègre et étude d'inversibilité.")

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
        r1 = Text("• On rappelle que (M_2(R), +, x) est un anneau unitaire d'unité I.", font_size=16, color=COL_MATH)
        r2 = Text("• Pour tout (a,b) in Z^2, on pose :", font_size=16, color=COL_MATH)
        c_mat = MathTex(
            r"M(a,b) = \begin{pmatrix} a & 3b \\ b & a \end{pmatrix}, \quad E = \left\{ M(a,b) \ \Big/\ (a,b) \in \mathbb{Z}^2 \right\}",
            font_size=18,
            color=COL_MATH,
        )
        r3 = Text("• Homomorphisme : phi(M(a,b)) = |a^2 - 3b^2| vers (Z, x).", font_size=16, color=COL_TITLE)
        r4 = Text("• Objectif : Anneau commutatif, inversibilité, intégrité et question du corps.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c_mat, buff=0.25)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)

        self.legende("Définition de l'ensemble de matrices E à coefficients entiers.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Sous-groupe additif et Produit
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-sous-groupe-produit")
        self.ardoise()

        t1 = Text("Q1 & Q2 — Sous-groupe additif & Produit matriciel (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : Pour tout (a,b) et (c,d) in Z^2 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(a,b) + M(c,d) = M(a+c,\ b+d) \in E \quad \text{et} \quad -M(a,b) = M(-a,\ -b) \in E", font_size=16, color=COL_MATH)
        c2 = Text("E est un sous-groupe de (M_2(R), +).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        r2 = Text("• Q2 (0,25 pt) : Calcul du produit matriciel ligne par colonne :", font_size=16, color=COL_MATH)
        c3 = MathTex(
            r"M(a,b)\times M(c,d) = \begin{pmatrix} a & 3b \\ b & a \end{pmatrix}\begin{pmatrix} c & 3d \\ d & c \end{pmatrix} = \begin{pmatrix} ac+3bd & 3(ad+bc) \\ ad+bc & ac+3bd \end{pmatrix}",
            font_size=16,
            color=COL_MATH,
        )
        c4 = MathTex(r"= M(ac+3bd,\ ad+bc) \in E", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(c4, buff=0.22)

        box = SurroundingRectangle(c4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 1 et 2 : (E,+) sous-groupe et formule du produit.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 3 — Anneau commutatif et unitaire
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("04-q3-anneau-commutatif")
        self.ardoise()

        t1 = Text("Q3 — (E, +, x) anneau commutatif et unitaire (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (E, +) est un groupe abélien (Q1).", font_size=16, color=COL_MATH)
        r2 = Text("• x est associative et distributive par rapport à + dans E (hérité de M_2(R)).", font_size=16, color=COL_MATH)
        r3 = Text("• Commutativité de x dans E :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(a,b)\times M(c,d) = M(ac+3bd,\, ad+bc) = M(ca+3db,\, cb+da) = M(c,d)\times M(a,b)", font_size=16, color=COL_MATH)

        r4 = Text("• Élément unité : I = M(1,0) in E (1, 0 in Z).", font_size=16, color=COL_MATH)
        concl = Text("(E, +, x) est un anneau commutatif et unitaire.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r4, buff=0.18)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : (E, +, x) est un anneau commutatif et unitaire.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 4 — Homomorphisme phi vers (Z, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("05-q4-homomorphisme-phi")
        self.ardoise()

        t1 = Text("Q4 — Homomorphisme multiplicatif phi : (E, x) -> (Z, x) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Par définition : phi(M(a,b)) = |a^2 - 3b^2|.", font_size=16, color=COL_MATH)
        r2 = Text("• Calcul algébrique sur le produit M(a,b) x M(c,d) = M(ac+3bd, ad+bc) :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"(ac+3bd)^2 - 3(ad+bc)^2 = (a^2 c^2 + 6abcd + 9b^2 d^2) - 3(a^2 d^2 + 2abcd + b^2 c^2)",
            font_size=16,
            color=COL_MATH,
        )
        c2 = MathTex(
            r"= (a^2 - 3b^2)(c^2 - 3d^2)",
            font_size=17,
            color=COL_MATH,
        )
        c3 = MathTex(
            r"\varphi\big(M(a,b)\times M(c,d)\big) = |a^2-3b^2|\cdot |c^2-3d^2| = \varphi\big(M(a,b)\big)\times \varphi\big(M(c,d)\big)",
            font_size=16,
            color=COL_SUCCESS,
        )

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : phi est un homomorphisme de (E, x) vers (Z, x).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Questions 5, 6 & 7 — Inversibilité dans (E, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5_q6_q7(self):
        self.etape("06-q5-q6-q7-inversibilite")
        self.ardoise()

        t1 = Text("Q5, Q6 & Q7 — Inversibilité dans (E, x) (1,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q5 (0,25 pt) : M(a,b) x M(a,-b) = M(a^2 - 3b^2, 0) = (a^2 - 3b^2)*I.", font_size=16, color=COL_MATH)
        r2 = Text("• Q6 (0,5 pt) : Si M(a,b) inversible dans E : M(a,b) x N = I => phi(M)*phi(N) = phi(I) = 1 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\varphi(M(a,b)) \times \varphi(N) = 1 \quad (\text{dans } \mathbb{N}) \implies \varphi(M(a,b)) = 1", font_size=16, color=COL_SUCCESS)

        r3 = Text("• Q7 (0,5 pt) : Réciproquement, si phi(M(a,b)) = 1, alors a^2 - 3b^2 = +-1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"M(a,b) \times \left[(a^2 - 3b^2)\cdot M(a,-b)\right] = (a^2 - 3b^2)^2\cdot I = I", font_size=16, color=COL_SUCCESS)
        c3 = MathTex(r"M(a,b)^{-1} = (a^2 - 3b^2)\cdot M(a,-b) \in E", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 5 à 7 : M(a,b) inversible <=> phi(M(a,b)) = 1.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Questions 8 & 9 — Intégrité de l'anneau (E, +, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8_q9(self):
        self.etape("07-q8-q9-integrite")
        self.ardoise()

        t1 = Text("Q8 & Q9 — Intégrité de l'anneau (E, +, x) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q8 (0,25 pt) : phi(M(a,b)) = 0 <=> a^2 = 3b^2. Si b != 0, (a/b)^2 = 3 => sqrt(3) in Q :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\sqrt{3} \notin \mathbb{Q} \implies b = 0 \implies a = 0 \implies \varphi(M(a,b)) = 0 \iff a = b = 0", font_size=16, color=COL_SUCCESS)

        r2 = Text("• Q9 (0,25 pt) : Si M(a,b) x M(c,d) = O, en appliquant le morphisme phi :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\varphi(M(a,b)) \times \varphi(M(c,d)) = \varphi(O) = 0 \implies \varphi(M(a,b)) = 0 \ \text{ou} \ \varphi(M(c,d)) = 0", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\implies M(a,b) = O \quad \text{ou} \quad M(c,d) = O", font_size=17, color=COL_SUCCESS)
        concl = Text("L'anneau (E, +, x) est intègre.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 8 et 9 : phi(M)=0 <=> M=O => l'anneau E est intègre.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 10 — (E, +, x) n'est pas un corps
    # ─────────────────────────────────────────────────────────────
    def chapitre_q10(self):
        self.etape("08-q10-non-corps")
        self.ardoise()

        t1 = Text("Q10 — (E, +, x) est-il un corps ? (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Un corps exige que TOUT élément non nul soit inversible.", font_size=16, color=COL_MATH)
        r2 = Text("• Considérons la matrice M(2,0) = [[2,0],[0,2]] in E. Elle est non nulle (M != O) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\varphi(M(2,0)) = |2^2 - 3\cdot 0^2| = 4 \neq 1", font_size=18, color=COL_WARN)

        r3 = Text("• Par la question 6, M(2,0) n'est pas inversible dans (E, x) :", font_size=16, color=COL_WARN)
        concl = Text("(E, +, x) n'est pas un corps.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 10 : M(2,0) non inversible => (E, +, x) n'est pas un corps.")
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
            "Bilan — Bac 2022 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1-Q3 : E sous-groupe additif et anneau commutatif unitaire d'unité I", font_size=16, color=COL_MATH)
        p2 = Text("• Q4 : phi(M(a,b)) = |a^2 - 3b^2| homomorphisme multiplicatif vers (Z, x)", font_size=16, color=COL_MATH)
        p3 = Text("• Q5-Q7 : M(a,b) inversible <=> phi(M(a,b)) = 1, inverse = (a^2-3b^2) M(a,-b)", font_size=16, color=COL_MATH)
        p4 = Text("• Q8-Q9 : sqrt(3) irrationnel => phi(M)=0 <=> M=O => anneau E intègre", font_size=16, color=COL_MATH)
        p5 = Text("• Q10 : M(2,0) non nul non inversible => (E, +, x) n'est pas un corps", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2022 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
