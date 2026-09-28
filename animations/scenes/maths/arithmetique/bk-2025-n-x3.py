#!/usr/bin/env python3
"""Bac 2025 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Critère d'Euler, petit théorème de Fermat et équation modulo 11.
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
VALS_ENONCE = "0.5, 0.25, 1, 2, 11, 25, 17, 6, 12, 5, 32, 10, 20, 8, 4, 3, 2025, 1.11"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2_q3()
        self.chapitre_q4()
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
            "Bac 2025 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Critère d'Euler, Fermat & Modulo 11 (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2025 SM : Critère d'Euler et applications modulo 11.")

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

        t1 = Text("Cadre de l'exercice & Hypothèses", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Soit p un nombre premier impair (p >= 3).", font_size=16, color=COL_MATH)
        r2 = Text("• Soit a un entier premier avec p : PGCD(a, p) = 1.", font_size=16, color=COL_MATH)

        r3 = Text("• Partie A : Montrer a^((p-1)/2) = 1 ou -1 [p] (critère d'Euler).", font_size=16, color=COL_TITLE)
        r4 = Text("• Partie B : Étude de l'équation ax^2 = 1 [p].", font_size=16, color=COL_TITLE)
        r5 = Text("• Parties C & D : Applications avec p = 11 (Bézout et inexistence).", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(r3, buff=0.22)
        self.ecrit(r4, buff=0.22)
        self.ecrit(r5, buff=0.22)

        self.legende("Hypothèses : p premier impair et PGCD(a, p) = 1.")
        self.pose(3.5)
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Partie A : Critère d'Euler
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-partie-a-euler")
        self.ardoise()

        t1 = Text("Partie A — Critère d'Euler (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Par le petit théorème de Fermat (PGCD(a, p) = 1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"a^{p-1} \equiv 1 \pmod p \implies a^{p-1} - 1 \equiv 0 \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• Différence de carrés avec (p-1)/2 entier :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"a^{p-1} - 1 = \left(a^{\frac{p-1}{2}} - 1\right)\left(a^{\frac{p-1}{2}} + 1\right) \equiv 0 \pmod p", font_size=17, color=COL_MATH)

        r3 = Text("• Par le lemme d'Euclide (p premier divise un produit) :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"a^{\frac{p-1}{2}} \equiv 1 \pmod p \quad \text{ou} \quad a^{\frac{p-1}{2}} \equiv -1 \pmod p", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : a^((p-1)/2) = 1 [p] ou -1 [p] par Fermat et Euclide.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Questions 2 & 3 — Partie B : Équation ax^2 = 1 [p]
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_q3(self):
        self.etape("04-q2-q3-partie-b-equation-ax2")
        self.ardoise()

        t1 = Text("Partie B — Équation ax^2 = 1 [p] (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q2 (0,5 pt) : Si p | x_0 => a*x_0^2 = 0 [p] => 0 = 1 [p] (impossible) :", font_size=16, color=COL_WARN)
        c1 = MathTex(r"p \nmid x_0 \implies \mathrm{PGCD}(p,\, x_0) = 1 \implies x_0^{\,p-1} \equiv 1 \pmod p", font_size=17, color=COL_MATH)

        r2 = Text("• Q3 (0,25 pt) : On élève a*x_0^2 = 1 [p] à la puissance (p-1)/2 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(a\,x_0^2)^{\frac{p-1}{2}} = a^{\frac{p-1}{2}} \times x_0^{\,p-1} \equiv 1^{\frac{p-1}{2}} = 1 \pmod p", font_size=17, color=COL_MATH)
        c3 = MathTex(r"a^{\frac{p-1}{2}} \times 1 \equiv 1 \pmod p \implies a^{\frac{p-1}{2}} \equiv 1 \pmod p", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie B : ax^2 = 1 [p] impose a^((p-1)/2) = 1 [p].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 4 — Partie C : Diviseur premier de 2^(2n+1)-1
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("05-q4-partie-c-diviseur-premier")
        self.ardoise()

        t1 = Text("Partie C — Diviseur premier de 2^(2n+1) - 1 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Soit n >= 1 et p premier impair divisant 2^(2n+1) - 1 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2^{2n+1} \equiv 1 \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• On isole le carré parfait (2^n)^2 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2^{2n+1} = 2 \times \left(2^n\right)^2 \implies 2 \times \left(2^n\right)^2 \equiv 1 \pmod p", font_size=17, color=COL_MATH)

        r3 = Text("• C'est la forme ax^2 = 1 [p] avec a = 2 et x_0 = 2^n. Par la Partie B :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2^{\frac{p-1}{2}} \equiv 1 \pmod p", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : Si p | 2^(2n+1)-1 alors 2^((p-1)/2) = 1 [p].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Partie C : Existence de solution (Bézout)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-partie-c-bezout-11")
        self.ardoise()

        t1 = Text("Partie C — Équation diophantienne avec 11 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On veut prouver l'existence d'une solution à 11x + (2^(2n+1)-1)y = 1 :", font_size=16, color=COL_MATH)
        r2 = Text("• Si 11 divisait 2^(2n+1)-1, par Q4 (p=11) on aurait :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2^{\frac{11-1}{2}} = 2^5 = 32 \equiv 1 \pmod{11}", font_size=17, color=COL_WARN)

        r3 = Text("• Or 32 = 2 x 11 + 10 = 10 [11] != 1 [11] : contradiction !", font_size=16, color=COL_WARN)
        c2 = MathTex(r"11 \nmid (2^{2n+1}-1) \implies \mathrm{PGCD}\!\left(11,\, 2^{2n+1}-1\right) = 1", font_size=17, color=COL_MATH)

        r4 = Text("• Par le théorème de Bézout, l'équation admet au moins une solution dans Z^2 :", font_size=16, color=COL_SUCCESS)
        c3 = MathTex(r"(\exists\, x, y \in \mathbb{Z}) \quad 11x + \left(2^{2n+1}-1\right)y = 1", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.18)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r4, buff=0.18)
        self.ecrit(c3, buff=0.22)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : PGCD(11, 2^(2n+1)-1) = 1 => existence de solutions.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 6 — Partie D : Équivalence de (F)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("07-q6-partie-d-equivalence-F")
        self.ardoise()

        t1 = Text("Partie D — Transformation de (F) modulo 11 (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• (F) : x^2 + 5x + 2 = 0 [11]. Multiplions par 4 (PGCD(4, 11) = 1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"4x^2 + 20x + 8 \equiv 0 \pmod{11}", font_size=17, color=COL_MATH)

        r2 = Text("• Complétion du carré : 4x^2+20x+8 = (2x+5)^2 - 25 + 8 = (2x+5)^2 - 17 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(2x+5)^2 \equiv 17 \equiv 6 \pmod{11}", font_size=17, color=COL_MATH)

        r3 = Text("• Multiplions par 2 (PGCD(2, 11) = 1) :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2(2x+5)^2 \equiv 12 \equiv 1 \pmod{11}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (F) <=> 2(2x+5)^2 = 1 [11].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 7 — Partie D : Inexistence de solution pour (F)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("08-q7-partie-d-inexistence-F")
        self.ardoise()

        t1 = Text("Partie D — Inexistence de solution pour (F) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Si x était solution de (F), alors 2(2x+5)^2 = 1 [11].", font_size=16, color=COL_MATH)
        r2 = Text("• En posant y_0 = 2x+5, cela donne 2*y_0^2 = 1 [11] (forme ax^2 = 1 [p]) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2\,y_0^2 \equiv 1 \pmod{11} \implies 2^{\frac{11-1}{2}} = 2^5 \equiv 1 \pmod{11}", font_size=17, color=COL_WARN)

        r3 = Text("• Or 2^5 = 32 = 10 [11] != 1 [11] : contradiction directe !", font_size=16, color=COL_WARN)
        concl = Text("L'équation (F) n'admet aucune solution dans Z.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : 2^5 = 10 != 1 [11] => (F) n'a aucune solution dans Z.")
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
            "Bilan — Bac 2025 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Partie A : a^((p-1)/2) = 1 ou -1 [p] (critère d'Euler)", font_size=16, color=COL_MATH)
        p2 = Text("• Partie B : ax^2 = 1 [p] => a^((p-1)/2) = 1 [p]", font_size=16, color=COL_MATH)
        p3 = Text("• Partie C : p | 2^(2n+1)-1 => 2^((p-1)/2) = 1 [p] => PGCD(11, 2^(2n+1)-1)=1", font_size=16, color=COL_MATH)
        p4 = Text("• Bézout : 11x + (2^(2n+1)-1)y = 1 admet des solutions dans Z^2", font_size=16, color=COL_MATH)
        p5 = Text("• Partie D : (F) <=> 2(2x+5)^2 = 1 [11] => 2^5 = 1 [11] impossible => S = vide", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2025 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
