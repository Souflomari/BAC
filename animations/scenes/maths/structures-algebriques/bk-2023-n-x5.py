#!/usr/bin/env python3
"""Bac 2023 — Session Normale (Sciences Mathématiques) — Structures algébriques (3,5 points)
Anneau de matrices M(x,y) sur R (pas un corps), corps G≅Q[√3] via un isomorphisme.
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
VALS_ENONCE = "0.5, 0.25, 3.5, 2023, 1, 2, 3, 4, 0, 5, 6, 7, 8, 9, 10, 11, 12"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_p1_q1_q2()
        self.chapitre_p1_q3_q4()
        self.chapitre_p1_q5_q6()
        self.chapitre_p2_q7_q8()
        self.chapitre_p2_q9_q10()
        self.chapitre_p2_q11_q12()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2023 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 5 : Anneau de matrices sur R & Corps sur Q (3,5 pts)",
            font_size=18,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2023 SM : Anneau non corps sur R et isomorphisme de corps sur Q.")

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
        r1 = Text("• On rappelle que (M_2(R), +, x) est un anneau non commutatif unitaire.", font_size=16, color=COL_MATH)
        r2 = Text("• Pour tout (x,y) in R^2, on pose :", font_size=16, color=COL_MATH)
        c_mat = MathTex(
            r"M(x,y) = \begin{pmatrix} x+y & y \\ 2y & x-y \end{pmatrix}, \quad E = \left\{ M(x,y) \ \Big/\ (x,y) \in \mathbb{R}^2 \right\}",
            font_size=18,
            color=COL_MATH,
        )
        r3 = Text("• Partie I : Anneau commutatif (E, +, x) et preuve qu'il n'est pas un corps.", font_size=16, color=COL_TITLE)
        r4 = Text("• Partie II : Restriction à Q -> Corps F = Q[sqrt(3)] et G = M(Q^2) via isomorphisme.", font_size=16, color=COL_TITLE)

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
    # 03. Partie I : Q1 & Q2 — Sous-groupe additif et Sous-espace vectoriel
    # ─────────────────────────────────────────────────────────────
    def chapitre_p1_q1_q2(self):
        self.etape("03-p1-q1-q2-sous-espace")
        self.ardoise()

        t1 = Text("Partie I — Q1 & Q2 : Sous-groupe et Sous-espace (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,5 pt) : Pour tout (x,y), (a,b) in R^2 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"M(x,y) + M(a,b) = M(x+a,\ y+b) \in E \quad \text{et} \quad -M(x,y) = M(-x,\ -y) \in E", font_size=16, color=COL_MATH)
        c2 = Text("E est un sous-groupe de (M_2(R), +).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        r2 = Text("• Q2 (0,25 pt) : E != ensemble vide (O in E), stable pour + et pour tout lambda in R :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\lambda\cdot M(x,y) = M(\lambda x,\ \lambda y) \in E", font_size=17, color=COL_MATH)
        c4 = Text("E est un sous-espace vectoriel de (M_2(R), +, .).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(c4, buff=0.22)

        box = SurroundingRectangle(c4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie I : E est un sous-groupe additif et un sous-espace vectoriel.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Partie I : Q3 & Q4 — Produit matriciel et Anneau commutatif
    # ─────────────────────────────────────────────────────────────
    def chapitre_p1_q3_q4(self):
        self.etape("04-p1-q3-q4-anneau-commutatif")
        self.ardoise()

        t1 = Text("Partie I — Q3 & Q4 : Produit et Anneau commutatif (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 (0,25 pt) : Calcul du produit matriciel ligne par colonne :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"M(x,y)\times M(a,b) = \begin{pmatrix} (x+y)(a+b)+2yb & (x+y)b+y(a-b) \\ 2y(a+b)+2b(x-y) & 2yb+(x-y)(a-b) \end{pmatrix}",
            font_size=16,
            color=COL_MATH,
        )
        c2 = MathTex(r"= M(xa+3yb,\ xb+ya) \in E", font_size=18, color=COL_SUCCESS)

        r2 = Text("• Q4 (0,5 pt) : (E,+) abélien, x associative et distributive (héritées de M_2(R)).", font_size=16, color=COL_MATH)
        r3 = Text("• Commutativité : M(x,y) x M(a,b) = M(ax+3by, ay+bx) = M(a,b) x M(x,y).", font_size=16, color=COL_MATH)
        r4 = Text("• Élément unité : I = M(1,0) in E.", font_size=16, color=COL_MATH)
        concl = Text("(E, +, x) est un anneau commutatif et unitaire.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie I : Formule du produit et structure d'anneau commutatif.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Partie I : Q5 & Q6 — Non-corps de (E, +, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_p1_q5_q6(self):
        self.etape("05-p1-q5-q6-non-corps")
        self.ardoise()

        t1 = Text("Partie I — Q5 & Q6 : (E, +, x) n'est pas un corps (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q5 (0,25 pt) : Calcul avec x=sqrt(3), y=1 et a=-sqrt(3), b=1 :", font_size=16, color=COL_MATH)
        c1 = MathTex(
            r"M(\sqrt{3}, 1)\times M(-\sqrt{3}, 1) = M\big(\sqrt{3}(-\sqrt{3})+3\cdot 1\cdot 1,\ \sqrt{3}\cdot 1 + 1(-\sqrt{3})\big) = M(0,0) = O",
            font_size=16,
            color=COL_WARN,
        )

        r2 = Text("• Q6 (0,25 pt) : Les matrices M(sqrt(3),1) et M(-sqrt(3),1) sont non nulles (y=1 != 0) :", font_size=16, color=COL_MATH)
        r3 = Text("• Si M(sqrt(3),1) était inversible : M(-sqrt(3),1) = M(sqrt(3),1)^(-1) x O = O (Contradiction).", font_size=16, color=COL_WARN)
        concl = Text("(E, +, x) n'est pas un corps.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie I : Diviseurs de zéro => (E, +, x) n'est pas un corps.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Partie II : Q7 & Q8 — Sous-groupe F - {0} de (R*, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_p2_q7_q8(self):
        self.etape("06-p2-q7-q8-sous-groupe-F")
        self.ardoise()

        t1 = Text("Partie II — Q7 & Q8 : Sous-groupe F - {0} de (R*, x) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q7 (0,25 pt) : Pour tout (x,y) in Q^2, x + y*sqrt(3) = 0 <=> x = y = 0 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"y \neq 0 \implies \sqrt{3} = -\dfrac{x}{y} \in \mathbb{Q} \quad (\text{Absurde car } \sqrt{3}\notin\mathbb{Q}) \implies x=y=0", font_size=16, color=COL_SUCCESS)

        r2 = Text("• Q8 (0,25 pt) : F = { x+y*sqrt(3) / (x,y) in Q^2 }. Stabilité de F-{0} pour x :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(x+y\sqrt{3})(a+b\sqrt{3}) = (xa+3yb) + (xb+ya)\sqrt{3} \in F-\{0\}", font_size=16, color=COL_MATH)

        r3 = Text("• Symétrique : inverse par quantité conjuguée (x^2 - 3y^2 != 0 car x,y in Q) :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\dfrac{1}{x+y\sqrt{3}} = \dfrac{x}{x^2-3y^2} - \dfrac{y}{x^2-3y^2}\sqrt{3} \in F-\{0\}", font_size=17, color=COL_SUCCESS)
        c4 = Text("F - {0} est un sous-groupe de (R*, x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(c4, buff=0.2)

        box = SurroundingRectangle(c4, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie II : F - {0} est un sous-groupe de (R*, x).")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Partie II : Q9 & Q10 — Isomorphisme phi : F - {0} -> G - {O}
    # ─────────────────────────────────────────────────────────────
    def chapitre_p2_q9_q10(self):
        self.etape("07-p2-q9-q10-isomorphisme-phi")
        self.ardoise()

        t1 = Text("Partie II — Q9 & Q10 : Morphisme phi : F-{0} -> G-{O} (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Soit phi(x + y*sqrt(3)) = M(x,y) pour (x,y) in Q^2 - {(0,0)}.", font_size=16, color=COL_MATH)
        r2 = Text("• Q9 (0,25 pt) : G = { M(x,y) / (x,y) in Q^2 }. Par définition de phi :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\varphi(F - \{0\}) = G - \{O\}", font_size=18, color=COL_SUCCESS)

        r3 = Text("• Q10 (0,25 pt) : Homomorphisme multiplicatif pour z = x+y*sqrt(3) et w = a+b*sqrt(3) :", font_size=16, color=COL_MATH)
        c2 = MathTex(
            r"\varphi(z\times w) = M(xa+3yb,\ xb+ya) = M(x,y)\times M(a,b) = \varphi(z)\times\varphi(w)",
            font_size=16,
            color=COL_SUCCESS,
        )
        c3 = Text("phi est un homomorphisme de (F-{0}, x) vers (E, x).", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie II : phi est un homomorphisme multiplicatif.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Partie II : Q11 & Q12 — Corps commutatif (G, +, x)
    # ─────────────────────────────────────────────────────────────
    def chapitre_p2_q11_q12(self):
        self.etape("08-p2-q11-q12-corps-G")
        self.ardoise()

        t1 = Text("Partie II — Q11 & Q12 : (G, +, x) corps commutatif (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q11 (0,25 pt) : phi est bijective de F-{0} sur G-{O} et morphisme :", font_size=16, color=COL_MATH)
        r2 = Text("• Comme (F-{0}, x) est un groupe commutatif, par isomorphisme :", font_size=16, color=COL_MATH)
        c1 = Text("(G - {O}, x) est un groupe commutatif.", font_size=17, color=COL_SUCCESS, weight=BOLD)

        r3 = Text("• Q12 (0,25 pt) : (G,+) sous-groupe de (E,+), x associative, distributive et commutative.", font_size=16, color=COL_MATH)
        r4 = Text("• Tout élément non nul de G est inversible dans (G, x) (Q11).", font_size=16, color=COL_MATH)
        concl = Text("(G, +, x) est un corps commutatif.", font_size=18, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(r4, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie II : (G, +, x) est un corps commutatif.")
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
            "Bilan — Bac 2023 SM (Structures algébriques, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• P.I Q1-Q4 : E sev et anneau commutatif unitaire dans M_2(R)", font_size=16, color=COL_MATH)
        p2 = Text("• P.I Q5-Q6 : M(sqrt(3),1) x M(-sqrt(3),1) = O => E n'est pas un corps", font_size=16, color=COL_MATH)
        p3 = Text("• P.II Q7-Q8 : x+y*sqrt(3)=0 <=> x=y=0 => F-{0} sous-groupe de (R*, x)", font_size=16, color=COL_MATH)
        p4 = Text("• P.II Q9-Q10 : phi isomorphisme de (F-{0}, x) sur (G-{O}, x)", font_size=16, color=COL_MATH)
        p5 = Text("• P.II Q11-Q12 : Transport de structure => (G, +, x) corps commutatif", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution des structures algébriques Bac 2023 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
