#!/usr/bin/env python3
"""Bac 2020 — Session Normale (Sciences Mathématiques) — Arithmétique (3.5 points)
Une équation diophantienne sans solution, via Fermat modulo 13.
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
VALS_ENONCE = "7, 13, 5, 3, 12, 1, 14, 2, 10, 4, 100, 9, 81, 6, 0.5, 1, 2020"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
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
            "Bac 2020 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 1 : Équation diophantienne & Fermat modulo 13 (3,5 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2020 SM : Inexistence de solutions via Fermat modulo 13.")

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.2))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 02. Données de l'exercice
    # ─────────────────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro-equation")
        self.ardoise()

        t1 = Text("Équation diophantienne (D)", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• On considère dans Z x Z l'équation :", font_size=16, color=COL_MATH)
        c_eq = MathTex(r"(D) : 7x^3 - 13y = 5", font_size=20, color=COL_SUCCESS)
        r2 = Text("• 13 est un nombre premier.", font_size=16, color=COL_MATH)
        r3 = Text("• Objectif : calculer x^12 modulo 13 de deux façons pour prouver l'absence de solution.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c_eq, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)

        box = SurroundingRectangle(c_eq, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Équation (D) : 7x^3 - 13y = 5 dans Z x Z.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Coprimalité de x et 13
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-coprimalite-13")
        self.ardoise()

        t1 = Text("Question 1 — Coprimalité de x et 13 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Raisonnement par l'absurde : supposons que 13 divise x.", font_size=16, color=COL_WARN)
        c1 = MathTex(r"13 \mid x \implies 13 \mid 7x^3 \quad \text{et} \quad 13 \mid 13y", font_size=17, color=COL_MATH)
        c2 = MathTex(r"13 \mid (7x^3 - 13y) = 5 \implies 13 \mid 5", font_size=17, color=COL_WARN)

        r2 = Text("• Or 13 ne divise pas 5 : contradiction !", font_size=16, color=COL_MATH)
        c3 = MathTex(r"13 \nmid x \implies \mathrm{PGCD}(x,\, 13) = 1", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : x et 13 sont premiers entre eux.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Petit théorème de Fermat
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-fermat-puissance-1")
        self.ardoise()

        t1 = Text("Question 2 — Petit théorème de Fermat (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• 13 est un nombre premier et 13 ne divise pas x (d'après Q1).", font_size=16, color=COL_MATH)
        r2 = Text("• D'après le petit théorème de Fermat : a^(p-1) = 1 [p] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x^{13 - 1} \equiv 1 \pmod{13}", font_size=18, color=COL_MATH)
        c2 = MathTex(r"x^{12} \equiv 1 \pmod{13}", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : x^12 = 1 [13] par le petit théorème de Fermat.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — x^3 = 10 [13]
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-reduction-cube")
        self.ardoise()

        t1 = Text("Question 3 — Réduction modulo 13 : x^3 = 10 [13] (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• En réduisant (D) : 7x^3 - 13y = 5 modulo 13 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"7x^3 \equiv 5 \pmod{13}", font_size=18, color=COL_MATH)

        r2 = Text("• Inverse de 7 modulo 13 : 7 x 2 = 14 = 1 [13] :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"7 \times 2 = 14 \equiv 1 \pmod{13}", font_size=18, color=COL_EMPH)

        r3 = Text("• On multiplie par 2 des deux côtés :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2 \times 7x^3 \equiv 2 \times 5 \pmod{13} \implies x^3 \equiv 10 \pmod{13}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : x^3 = 10 [13] en multipliant par l'inverse 2.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — x^12 = 3 [13]
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-puissance-douze-trois")
        self.ardoise()

        t1 = Text("Question 4 — Calcul de x^12 via x^3 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comme 12 = 3 x 4, on élève à la puissance 4 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x^{12} = (x^3)^4 \equiv 10^4 \pmod{13}", font_size=18, color=COL_MATH)

        r2 = Text("• Calcul de 10^4 modulo 13 par étapes :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"10^2 = 100 = 7 \times 13 + 9 \equiv 9 \pmod{13}", font_size=17, color=COL_MATH)
        c3 = MathTex(r"10^4 = (10^2)^2 \equiv 9^2 = 81 = 6 \times 13 + 3 \equiv 3 \pmod{13}", font_size=17, color=COL_MATH)
        c_res = MathTex(r"x^{12} \equiv 3 \pmod{13}", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(c_res, buff=0.25)

        box = SurroundingRectangle(c_res, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : x^12 = 3 [13] en calculant 10^4 modulo 13.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — Inexistence de solutions
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("07-q5-contradiction-finale")
        self.ardoise()

        t1 = Text("Question 5 — Inexistence de solutions dans Z x Z (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On compare les deux valeurs obtenues pour x^12 modulo 13 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"1 \equiv x^{12} \equiv 3 \pmod{13}", font_size=18, color=COL_MATH)

        r2 = Text("• Cela implique :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"1 \equiv 3 \pmod{13} \implies 13 \mid (3 - 1) = 2", font_size=18, color=COL_WARN)

        r3 = Text("• Or 13 > 2 ne divise pas 2 : contradiction !", font_size=16, color=COL_WARN)
        concl = Text("L'équation (D) n'admet aucune solution dans Z x Z.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Contradiction 1 = 3 [13] => (D) n'a aucune solution.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("08-bilan")
        titre = Text(
            "Bilan — Bac 2020 SM (Arithmétique, 3,5 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Coprimalité : 13 | x => 13 | 5 impossible => PGCD(x, 13) = 1", font_size=16, color=COL_MATH)
        p2 = Text("• Fermat : x^12 = 1 [13] car 13 premier et 13 ne divise pas x", font_size=16, color=COL_MATH)
        p3 = Text("• Équation (D) : 7*x^3 = 5 [13] => 2*7*x^3 = 10 => x^3 = 10 [13]", font_size=16, color=COL_MATH)
        p4 = Text("• Puissance 4 : x^12 = 10^4 = 9^2 = 81 = 3 [13]", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Conclusion : 1 = 3 [13] impossible => S = vide dans Z x Z", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2020 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
