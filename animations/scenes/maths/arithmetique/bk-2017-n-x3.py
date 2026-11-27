#!/usr/bin/env python3
"""Bac 2017 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Petit théorème de Fermat et équation px + y^{p-1} = 2017.
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
VALS_ENONCE = "2017, 2016, 2, 5, 3, 7, 1, 4, 4096, 2010, 64, 729, 288, 279, 184, 1953, 1288, 0.25, 0.5, 0.75, 1.2, 2.3"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5_cas_non_7()
        self.chapitre_q5_cas_7()
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
            "Exercice 3 : Arithmétique & Théorème de Fermat (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2017 SM : Équation diophantienne et théorème de Fermat.")

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

        t1 = Text("Données de l'énoncé", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• 2017 est un nombre premier (admis).", font_size=16, color=COL_MATH)
        c_fact = MathTex(r"2016 = 2^5 \times 3^2 \times 7", font_size=18, color=COL_MATH)
        r2 = Text("• p est un nombre premier tel que :", font_size=16, color=COL_MATH)
        c_p = MathTex(r"p \geq 5", font_size=18, color=COL_EMPH)
        r3 = Text("• On cherche les couples (x, y) dans N* x N* tels que :", font_size=16, color=COL_TITLE)
        c_eq = MathTex(r"px + y^{p-1} = 2017", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c_fact, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c_p, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c_eq, buff=0.3)

        box = SurroundingRectangle(c_eq, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Équation px + y^(p-1) = 2017 avec p >= 5 premier.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Encadrement p < 2017
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-majoration-p")
        self.ardoise()

        t1 = Text("Question 1 — Majoration de p (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comme y in N*, on a y >= 1 donc :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"y \geq 1 \implies y^{p-1} \geq 1", font_size=18, color=COL_MATH)

        r2 = Text("• On isole px dans l'équation :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"px = 2017 - y^{p-1} \leq 2017 - 1 = 2016", font_size=18, color=COL_MATH)

        r3 = Text("• Comme x in N*, x >= 1 implique :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"p \leq px \leq 2016 \implies p < 2017", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p <= px <= 2016 < 2017.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Non-divisibilité de y par p
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-non-divisibilite")
        self.ardoise()

        t1 = Text("Question 2 — p ne divise pas y (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Raisonnement par l'absurde : supposons que p divise y.", font_size=16, color=COL_WARN)
        c1 = MathTex(r"p \mid y \implies p \mid y^{p-1}", font_size=17, color=COL_MATH)
        c2 = MathTex(r"p \mid px \text{ et } p \mid y^{p-1} \implies p \mid (px + y^{p-1}) = 2017", font_size=17, color=COL_MATH)

        r2 = Text("• Or 2017 est un nombre premier, donc ses seuls diviseurs sont 1 et 2017.", font_size=16, color=COL_MATH)
        c3 = MathTex(r"5 \leq p < 2017 \implies p \nmid 2017", font_size=17, color=COL_WARN)
        concl = Text("Contradiction : p ne divise pas y.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c3, buff=0.22)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : p ne divise pas y (par l'absurde).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — Petit théorème de Fermat et divisibilité
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-fermat-divisibilite")
        self.ardoise()

        t1 = Text("Question 3 — Théorème de Fermat & p | 2016 (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comme p est premier et p ne divise pas y (petit thm de Fermat) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"y^{p-1} \equiv 1 \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• En réduisant l'équation modulo p :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"px \equiv 0 \pmod p \implies y^{p-1} \equiv px + y^{p-1} = 2017 \pmod p", font_size=17, color=COL_MATH)

        r3 = Text("• En combinant les deux congruences :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"1 \equiv 2017 \pmod p \implies p \mid (2017 - 1) \implies p \mid 2016", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : y^(p-1) = 1 [p] et p divise 2016.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Identification p = 7
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-identification-p")
        self.ardoise()

        t1 = Text("Question 4 — Identification de p = 7 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Décomposition en facteurs premiers de 2016 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2016 = 2^5 \times 3^2 \times 7", font_size=18, color=COL_MATH)

        r2 = Text("• Comme p est premier et p divise 2016 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p \in \{2, 3, 7\}", font_size=18, color=COL_MATH)

        r3 = Text("• Or p >= 5, donc p ne peut être ni 2 ni 3 :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"p \geq 5 \implies p = 7", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : p = 7 est l'unique nombre premier possible.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — Cas p != 7
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5_cas_non_7(self):
        self.etape("07-q5-cas-p-different-7")
        self.ardoise()

        t1 = Text("Question 5 — Résolution : Cas p != 7 (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Les questions 1 à 4 établissent l'implication :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(x, y) \in \mathbb{N}^* \times \mathbb{N}^* \text{ solution de } px + y^{p-1} = 2017 \implies p = 7", font_size=16, color=COL_MATH)

        r2 = Text("• Par contraposée :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\text{Si } p \neq 7, \text{ l'équation n'admet aucune solution dans } \mathbb{N}^* \times \mathbb{N}^*.", font_size=16, color=COL_WARN)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c1, buff=0.3)
        self.ecrit(r2, buff=0.3)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_WARN, buff=0.12)
        self.play(Create(box))

        self.legende("Cas p != 7 : aucune solution dans N* x N*.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 5 — Cas p = 7
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5_cas_7(self):
        self.etape("08-q5-cas-p-egal-7")
        self.ardoise()

        t1 = Text("Question 5 — Résolution : Cas p = 7", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Pour p = 7, l'équation devient : 7x + y^6 = 2017", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x \geq 1 \implies y^6 = 2017 - 7x \leq 2010 \implies y \in \{1, 2, 3\} \quad (4^6 = 4096 > 2010)", font_size=16, color=COL_MATH)

        r2 = Text("• On teste les 3 valeurs possibles de y :", font_size=16, color=COL_MATH)
        c_y1 = MathTex(r"y = 1 \implies x = \frac{2017 - 1}{7} = \frac{2016}{7} = 288 \implies (288, 1)", font_size=16, color=COL_MATH)
        c_y2 = MathTex(r"y = 2 \implies x = \frac{2017 - 64}{7} = \frac{1953}{7} = 279 \implies (279, 2)", font_size=16, color=COL_MATH)
        c_y3 = MathTex(r"y = 3 \implies x = \frac{2017 - 729}{7} = \frac{1288}{7} = 184 \implies (184, 3)", font_size=16, color=COL_MATH)

        c_sol = MathTex(r"S = \{(288, 1),\ (279, 2),\ (184, 3)\}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c_y1, buff=0.2)
        self.ecrit(c_y2, buff=0.2)
        self.ecrit(c_y3, buff=0.2)
        self.ecrit(c_sol, buff=0.25)

        box = SurroundingRectangle(c_sol, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Cas p = 7 : trois couples solutions (288,1), (279,2), (184,3).")
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
            "Bilan — Bac 2017 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Majoration : p <= px <= 2016 < 2017", font_size=16, color=COL_MATH)
        p2 = Text("• Non-divisibilité : p ne divise pas y (car 2017 premier)", font_size=16, color=COL_MATH)
        p3 = Text("• Fermat : y^(p-1) = 1 [p] et px = 0 [p] => p divise 2016", font_size=16, color=COL_MATH)
        p4 = Text("• 2016 = 2^5 * 3^2 * 7 et p >= 5 => p = 7", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Solutions : S = {(288, 1), (279, 2), (184, 3)} pour p = 7, vide sinon", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2017 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
