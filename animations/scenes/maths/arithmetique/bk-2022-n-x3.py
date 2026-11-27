#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Petit théorème de Fermat et Bézout pour (x+1)^n - x^n = ny.
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
VALS_ENONCE = "1, 2, 0.25, 0.5, 3, 2022"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6_q7()
        self.chapitre_q8()
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
            "Exercice 3 : Fermat & Bézout pour (x+1)^n - x^n = ny (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2022 SM : Inexistence de solutions de (E_n) dans Z^2.")

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

        t1 = Text("Équation diophantienne (E_n)", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Soit n > 1 un entier. On considère dans N^2 l'équation :", font_size=16, color=COL_MATH)
        c_eq = MathTex(r"(E_n) : (x + 1)^n - x^n = ny", font_size=18, color=COL_SUCCESS)

        r2 = Text("• Soit p le plus petit diviseur premier de n.", font_size=16, color=COL_MATH)
        r3 = Text("• But : prouver que (E_n) n'admet aucune solution dans Z^2.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c_eq, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)

        box = SurroundingRectangle(c_eq, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Données : n > 1, p plus petit diviseur premier de n.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Partie A : Congruence et Coprimalité
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-congruence-coprimalite")
        self.ardoise()

        t1 = Text("Partie A — Congruence modulo p & Coprimalité (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : p | n => p | ny => (x+1)^n - x^n = ny = 0 [p] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x + 1)^n \equiv x^n \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• Q2 (0,25 pt) : Si p | x => p | (x+1)^n => p | (x+1) (lemme d'Euclide) :", font_size=16, color=COL_WARN)
        c2 = MathTex(r"p \mid x \ \text{et}\ p \mid (x+1) \implies p \mid 1 \quad (\text{impossible car } p \geq 2)", font_size=16, color=COL_WARN)

        r3 = Text("• De même p ne divise pas x+1 :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\mathrm{PGCD}(p,\, x) = \mathrm{PGCD}(p,\, x+1) = 1", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie A : (x+1)^n = x^n [p] et p premier avec x et x+1.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 3 — Partie A : Petit théorème de Fermat
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("04-q3-fermat-puissance-p-1")
        self.ardoise()

        t1 = Text("Partie A — Petit théorème de Fermat (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comme p est premier et p ne divise ni x ni (x+1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x^{p-1} \equiv 1 \pmod p \quad \text{et} \quad (x+1)^{p-1} \equiv 1 \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• Les deux termes sont congrus à 1 modulo p :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(x+1)^{p-1} \equiv x^{p-1} \pmod p", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : (x+1)^(p-1) = x^(p-1) = 1 [p] par Fermat.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 4 — Partie B : Le cas n pair
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("05-q4-cas-n-pair")
        self.ardoise()

        t1 = Text("Partie B — Le cas n pair (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Si n est pair, son plus petit diviseur premier est p = 2.", font_size=16, color=COL_MATH)
        r2 = Text("• D'après la question 2 : PGCD(2, x) = PGCD(2, x+1) = 1 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x \ \text{et}\ x+1 \ \text{sont tous les deux impairs}", font_size=18, color=COL_WARN)

        r3 = Text("• Or x et x+1 sont consécutifs : l'un est pair, l'autre impair !", font_size=16, color=COL_WARN)
        c2 = Text("Contradiction : aucune solution dans Z^2 si n est pair.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie B : Si n pair, p = 2 force x et x+1 impairs, impossible.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 5 — Partie C : Bézout entre n et p-1
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("06-q5-bezout-n-impair")
        self.ardoise()

        t1 = Text("Partie C — Bézout entre n et p-1 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Soit d = PGCD(n, p-1). On a d <= p-1 < p.", font_size=16, color=COL_MATH)
        r2 = Text("• Si d > 1, soit q un diviseur premier de d :", font_size=16, color=COL_WARN)
        c1 = MathTex(r"q \mid d \implies q \mid n \quad \text{avec} \quad q \leq d < p", font_size=17, color=COL_WARN)

        r3 = Text("• Contradiction car p est le PLUS PETIT diviseur premier de n !", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\mathrm{PGCD}(n,\, p-1) = 1 \implies (\exists\, u,v \in \mathbb{Z})\quad nu + (p-1)v = 1", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : PGCD(n, p-1) = 1 => nu + (p-1)v = 1 par Bézout.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Questions 6 & 7 — Division euclidienne & Positivité
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6_q7(self):
        self.etape("07-q6-q7-division-euclidienne")
        self.ardoise()

        t1 = Text("Partie C — Division euclidienne & Positivité (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q6 (0,25 pt) : Division euclidienne u = (p-1)q + r :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"n\big((p-1)q + r\big) + (p-1)v = 1 \implies nr = 1 - (p-1)(v + nq)", font_size=16, color=COL_MATH)

        r2 = Text("• Q7 (0,5 pt) : En posant v' = -(v+nq), on a nr = 1 + (p-1)v' :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"r \geq 1 \quad (\text{sinon } p = 2 \text{ exclu car } n \text{ impair}) \implies nr \geq 1", font_size=16, color=COL_MATH)
        c3 = MathTex(r"(p-1)v' = nr - 1 \geq 0 \implies v' \geq 0", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Questions 6-7 : nr = 1 + (p-1)v' avec r >= 1 et v' >= 0.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 8 — Conclusion générale
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8(self):
        self.etape("08-q8-conclusion-generale")
        self.ardoise()

        t1 = Text("Partie C — Conclusion générale (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On élève (x+1)^n = x^n aux puissances r et v' (positives) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x+1)^{nr} = (x+1)(x+1)^{(p-1)v'} \equiv (x+1)x^{(p-1)v'} \pmod p", font_size=16, color=COL_MATH)
        c2 = MathTex(r"x^{nr} = x \cdot x^{(p-1)v'} \implies \big((x+1) - x\big)x^{(p-1)v'} \equiv 0 \pmod p", font_size=16, color=COL_MATH)

        r2 = Text("• Donc p divise x^(p-1)v' => p divise x (lemme d'Euclide) :", font_size=16, color=COL_WARN)
        c3 = MathTex(r"p \mid x \quad (\text{contradiction directe avec } p \nmid x)", font_size=17, color=COL_WARN)

        concl = Text("L'équation (E_n) n'admet aucune solution dans Z^2.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8 : Contradiction finale => S = vide dans Z^2.")
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
            "Bilan — Bac 2022 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Partie A : (x+1)^n = x^n [p], coprimalité et Fermat", font_size=16, color=COL_MATH)
        p2 = Text("• Partie B (n pair) : p = 2 force x et x+1 impairs => contradiction", font_size=16, color=COL_MATH)
        p3 = Text("• Partie C (n impair) : PGCD(n, p-1) = 1 => nu + (p-1)v = 1", font_size=16, color=COL_MATH)
        p4 = Text("• Division : nr = 1 + (p-1)v' avec r >= 1 et v' >= 0", font_size=16, color=COL_MATH)
        p5 = Text("• Contradiction : p | x => S = vide dans Z^2 pour tout n > 1", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2022 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
