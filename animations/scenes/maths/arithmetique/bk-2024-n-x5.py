#!/usr/bin/env python3
"""Bac 2024 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Fermat pour deux premiers et résolution modulo 221.
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
VALS_ENONCE = "1, 0.5, 3, 221, 13, 17, 192, 12, 16, 2024, 155, 9, 119, 2024.13, 2024.17"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3()
        self.chapitre_q4_coprimalite()
        self.chapitre_q4_resolution()
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
            "Exercice 5 : Fermat à deux modules & Résolution mod 221 (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2024 SM : Fermat croisé et résolution mod 221.")

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

        t1 = Text("Cadre et hypothèses de l'exercice", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Soient p et q deux nombres premiers distincts.", font_size=16, color=COL_MATH)
        r2 = Text("• Soit r un entier naturel tel que :", font_size=16, color=COL_MATH)
        c_cop = MathTex(r"\mathrm{PGCD}(r, p) = 1 \quad \text{et} \quad \mathrm{PGCD}(r, q) = 1", font_size=18, color=COL_MATH)

        r3 = Text("• Partie A : Établir que pq divise r^((p-1)(q-1)) - 1.", font_size=16, color=COL_TITLE)
        r4 = Text("• Partie B : Résoudre 2024^192 x = 3 [221] dans Z.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c_cop, buff=0.3)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.25)

        box = SurroundingRectangle(c_cop, color=COL_MATH, buff=0.12)
        self.play(Create(box))

        self.legende("Hypothèses : p, q premiers distincts et r premier avec p et q.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Partie A : Fermat pour p et pour q
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-fermat-p-q")
        self.ardoise()

        t1 = Text("Partie A — Petit théorème de Fermat (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Comme p est premier et p ne divise pas r :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"r^{p-1} \equiv 1 \pmod p \implies p \mid (r^{p-1} - 1)", font_size=18, color=COL_SUCCESS)

        r2 = Text("• De même, q est premier et q ne divise pas r :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"r^{q-1} \equiv 1 \pmod q \implies q \mid (r^{q-1} - 1)", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(VGroup(c1, c2), color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 1 : Application de Fermat à p et à q.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Partie A : Puissance croisée
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-puissance-croisee")
        self.ardoise()

        t1 = Text("Partie A — Élévation aux puissances (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• En élevant r^(p-1) = 1 [p] à la puissance (q-1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"r^{(p-1)(q-1)} = \left(r^{p-1}\right)^{q-1} \equiv 1^{q-1} \equiv 1 \pmod p \implies p \mid \left(r^{(p-1)(q-1)} - 1\right)", font_size=16, color=COL_MATH)

        r2 = Text("• En élevant r^(q-1) = 1 [q] à la puissance (p-1) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"r^{(p-1)(q-1)} = \left(r^{q-1}\right)^{p-1} \equiv 1^{p-1} \equiv 1 \pmod q \implies q \mid \left(r^{(p-1)(q-1)} - 1\right)", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(VGroup(c1, c2), color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 2 : p et q divisent tous deux r^((p-1)(q-1)) - 1.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — Partie A : Produit pq et lemme de Gauss
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-produit-pq-gauss")
        self.ardoise()

        t1 = Text("Partie A — Divisibilité par pq (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• p et q sont deux nombres premiers distincts :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\mathrm{PGCD}(p,\, q) = 1", font_size=18, color=COL_MATH)

        r2 = Text("• Par le corollaire du théorème de Gauss :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p \mid c \quad \text{et} \quad q \mid c \quad \text{avec } \mathrm{PGCD}(p,q)=1 \implies pq \mid c", font_size=17, color=COL_MATH)
        c3 = MathTex(r"pq \mid \left(r^{(p-1)(q-1)} - 1\right) \iff r^{(p-1)(q-1)} \equiv 1 \pmod{pq}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : pq divise r^((p-1)(q-1)) - 1 car PGCD(p,q)=1.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Partie B : Décomposition & Coprimalité
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4_coprimalite(self):
        self.etape("06-q4-coprimalite-2024")
        self.ardoise()

        t1 = Text("Partie B — Décomposition de 221 & Coprimalité (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On donne 221 = 13 x 17 (p = 13 et q = 17 premiers distincts).", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(p-1)(q-1) = (13-1)(17-1) = 12 \times 16 = 192", font_size=18, color=COL_MATH)

        r2 = Text("• Divisions euclidiennes de 2024 par 13 et 17 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2024 = 13 \times 155 + 9 \implies 13 \nmid 2024 \implies \mathrm{PGCD}(2024, 13) = 1", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2024 = 17 \times 119 + 1 \implies 17 \nmid 2024 \implies \mathrm{PGCD}(2024, 17) = 1", font_size=16, color=COL_MATH)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(VGroup(c2, c3), color=COL_MATH, buff=0.12)
        self.play(Create(box))

        self.legende("Partie B : PGCD(2024, 13)=PGCD(2024, 17)=1 et 192=12x16.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4 — Partie B : Résolution dans Z
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4_resolution(self):
        self.etape("07-q4-resolution-mod-221")
        self.ardoise()

        t1 = Text("Partie B — Résolution de 2024^192 x = 3 [221] (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Par la question 3 avec p = 13, q = 17 et r = 2024 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"221 \mid \left(2024^{192} - 1\right) \implies 2024^{192} \equiv 1 \pmod{221}", font_size=18, color=COL_MATH)

        r2 = Text("• L'équation se simplifie immédiatement :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2024^{192}\,x \equiv 3 \pmod{221} \iff 1 \cdot x \equiv 3 \pmod{221}", font_size=18, color=COL_MATH)
        c3 = MathTex(r"x \equiv 3 \pmod{221} \iff x = 3 + 221k \quad (k \in \mathbb{Z})", font_size=18, color=COL_MATH)

        sol = MathTex(r"S = \{\, 3 + 221k \ : \ k \in \mathbb{Z} \,\}", font_size=20, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.22)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c3, buff=0.22)
        self.ecrit(sol, buff=0.28)

        box = SurroundingRectangle(sol, color=COL_SUCCESS, buff=0.15)
        self.play(Create(box))

        self.legende("Question 4 : S = {3 + 221k | k in Z}.")
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
            "Bilan — Bac 2024 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Q1 : Fermat donne r^(p-1) = 1 [p] et r^(q-1) = 1 [q]", font_size=16, color=COL_MATH)
        p2 = Text("• Q2 : Puissances croisées => p et q divisent r^((p-1)(q-1)) - 1", font_size=16, color=COL_MATH)
        p3 = Text("• Q3 : PGCD(p,q)=1 => pq divise r^((p-1)(q-1)) - 1 (Gauss)", font_size=16, color=COL_MATH)
        p4 = Text("• Q4a : 221 = 13 x 17, 192 = 12 x 16, PGCD(2024, 13)=PGCD(2024, 17)=1", font_size=16, color=COL_MATH)
        p5 = Text("• Q4b : 2024^192 = 1 [221] => x = 3 [221] => S = {3 + 221k | k in Z}", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.28, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2024 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
