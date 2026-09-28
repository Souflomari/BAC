#!/usr/bin/env python3
"""Bac 2021 — Session Normale (Sciences Mathématiques) — Arithmétique (4 points)
Bézout modulo 43, petit théorème de Fermat et restes chinois modulo 2021.
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
VALS_ENONCE = "47, 43, 1, 11, 12, 517, 516, 41, 4, 42, 44, 10, 527, 2021, 0.25, 0.75, 0.5, 2021, 43.4, 11.12, 43.47, 47.43"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3()
        self.chapitre_q4_q5()
        self.chapitre_q6()
        self.chapitre_q7_q8()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2021 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Bézout, Fermat & Restes chinois (4 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2021 SM : Équation, Fermat et congruences croisées.")

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

        t1 = Text("Structure de l'exercice en 3 parties", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Partie I : Équation diophantienne (E) dans Z x Z :", font_size=16, color=COL_MATH)
        c_e = MathTex(r"(E) : 47x - 43y = 1", font_size=18, color=COL_MATH)

        r2 = Text("• Partie II : Congruence modulo 43 dans Z :", font_size=16, color=COL_MATH)
        c_f = MathTex(r"(F) : x^{41} \equiv 4 \pmod{43}", font_size=18, color=COL_MATH)

        r3 = Text("• Partie III : Système de congruences (S) dans Z :", font_size=16, color=COL_MATH)
        c_s = MathTex(r"(S) : \begin{cases} x^{41} \equiv 4 \pmod{43} \\ x^{47} \equiv 10 \pmod{47} \end{cases}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c_e, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c_f, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c_s, buff=0.25)

        box = SurroundingRectangle(c_s, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Trois parties interconnectées utilisant 47x - 43y = 1.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Partie I : Résolution de (E)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-partie-1-bezout")
        self.ardoise()

        t1 = Text("Partie I — Résolution de (E) : 47x - 43y = 1 (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : Solution particulière (11, 12) :", font_size=16, color=COL_TITLE)
        c1 = MathTex(r"47 \times 11 - 43 \times 12 = 517 - 516 = 1", font_size=17, color=COL_MATH)

        r2 = Text("• Q2 (0,75 pt) : Soustraction membre à membre :", font_size=16, color=COL_TITLE)
        c2 = MathTex(r"47(x - 11) = 43(y - 12)", font_size=17, color=COL_MATH)

        r3 = Text("• Comme PGCD(43, 47) = 1, le théorème de Gauss donne :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"43 \mid (x - 11) \implies x = 11 + 43k, \quad y = 12 + 47k \quad (k \in \mathbb{Z})", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie I : S = {(11 + 43k, 12 + 47k) ; k in Z}.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 3 — Partie II : Fermat modulo 43
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("04-q3-partie-2-fermat")
        self.ardoise()

        t1 = Text("Partie II — Fermat modulo 43 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("(F) : x^41 = 4 [43]", font_size=16, color=COL_TITLE)

        r1 = Text("• Si 43 divisait x, alors x^41 = 0 [43], or 4 != 0 [43] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"43 \nmid x \implies \mathrm{PGCD}(x,\, 43) = 1", font_size=18, color=COL_MATH)

        r2 = Text("• Par le petit théorème de Fermat (43 premier, 43 ne divise pas x) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"x^{43 - 1} \equiv 1 \pmod{43} \implies x^{42} \equiv 1 \pmod{43}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : x^42 = 1 [43] par le petit théorème de Fermat.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Questions 4 & 5 — Partie II : Résolution de (F)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4_q5(self):
        self.etape("05-q4-q5-partie-2-resolution")
        self.ardoise()

        t1 = Text("Partie II — Résolution de (F) (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q4 (0,5 pt) : x^42 = x * x^41 = 4x [43] et x^42 = 1 [43] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"4x \equiv 1 \pmod{43}", font_size=17, color=COL_MATH)

        r2 = Text("• De 47*11 - 43*12 = 1, on a 4*11 = 1 [43] (car 47 = 4 [43]) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"4(x - 11) \equiv 0 \pmod{43} \implies x \equiv 11 \pmod{43}", font_size=17, color=COL_MATH)

        r3 = Text("• Q5 (0,5 pt) : Réciproque et ensemble des solutions dans Z :", font_size=16, color=COL_TITLE)
        c3 = MathTex(r"S = \{\, 11 + 43k \ : \ k \in \mathbb{Z} \,\}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie II : S = {11 + 43k ; k in Z}.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 6 — Partie III : Réduction du système (S)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("06-q6-partie-3-systeme")
        self.ardoise()

        t1 = Text("Partie III — Réduction du système (S) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Équation 1 : x^41 = 4 [43] donne x = 11 [43] (Partie II).", font_size=16, color=COL_MATH)

        r2 = Text("• Équation 2 : Par le théorème de Fermat, a^p = a [p] pour tout entier :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"x^{47} \equiv x \pmod{47}", font_size=18, color=COL_MATH)

        r3 = Text("• Comme x^47 = 10 [47], on en déduit directement :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"x \equiv 10 \pmod{47}", font_size=18, color=COL_MATH)

        c_sys = MathTex(r"(S') : \begin{cases} x \equiv 11 \pmod{43} \\ x \equiv 10 \pmod{47} \end{cases}", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c_sys, buff=0.25)

        box = SurroundingRectangle(c_sys, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (S) équivaut à x = 11 [43] et x = 10 [47].")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Questions 7 & 8 — Partie III : Restes chinois modulo 2021
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7_q8(self):
        self.etape("07-q7-q8-partie-3-chinois")
        self.ardoise()

        t1 = Text("Partie III — Résolution : x = 527 [2021] (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• x = 11 + 43k => 11 + 43k = 10 [47] => 43k = -1 [47] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"47 \times 11 - 43 \times 12 = 1 \implies 43 \times 12 \equiv -1 \pmod{47}", font_size=16, color=COL_MATH)

        r2 = Text("• Donc k = 12 [47] => k = 12 + 47t, et 43 x 47 = 2021 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"x = 11 + 43(12 + 47t) = 11 + 516 + 2021t = 527 + 2021t", font_size=17, color=COL_MATH)

        r3 = Text("• Q8 (0,5 pt) : Solutions de (S) dans Z :", font_size=16, color=COL_TITLE)
        c3 = MathTex(r"S = \{\, 527 + 2021k \ : \ k \in \mathbb{Z} \,\}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie III : S = {527 + 2021k ; k in Z}.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("08-bilan")
        titre = Text(
            "Bilan — Bac 2021 SM (Arithmétique, 4 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Partie I : 47x - 43y = 1 => S = {(11 + 43k, 12 + 47k)}", font_size=16, color=COL_MATH)
        p2 = Text("• Partie II : x^41 = 4 [43] => x^42 = 1 [43] => 4x = 1 [43] => x = 11 [43]", font_size=16, color=COL_MATH)
        p3 = Text("• Partie III (Fermat 47) : x^47 = x [47] => x = 10 [47]", font_size=16, color=COL_MATH)
        p4 = Text("• Combinaison Bézout : x = 11 + 43(12 + 47k) = 527 + 2021k", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Solution finale : S = {527 + 2021k ; k in Z}", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2021 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
