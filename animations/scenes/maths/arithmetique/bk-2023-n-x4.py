#!/usr/bin/env python3
"""Bac 2023 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Résidus quadratiques modulo p, petit théorème de Fermat et formule de Moivre.
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
VALS_ENONCE = "2, 1, 3, 5, 8, 4, 0.25, 0.5, 3, 2023"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1_q2()
        self.chapitre_q3_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_q7()
        self.chapitre_q8()
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
            "Exercice 4 : Résidus quadratiques & Formule de Moivre (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2023 SM : Inexistence de racine de 2 mod p quand p = 5 [8].")

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

        t1 = Text("Équation (E) et cadre de l'exercice", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Soit p un nombre premier impair (p >= 3).", font_size=16, color=COL_MATH)
        r2 = Text("• On considère dans Z l'équation :", font_size=16, color=COL_MATH)
        c_eq = MathTex(r"(E) : x^2 \equiv 2 \pmod p", font_size=19, color=COL_SUCCESS)

        r3 = Text("• Objectif : montrer que si p = 5 [8], (E) n'admet aucune solution.", font_size=16, color=COL_TITLE)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c_eq, buff=0.3)
        self.ecrit(r3, buff=0.25)

        box = SurroundingRectangle(c_eq, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Équation (E) : x^2 = 2 [p] avec p premier impair.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Questions 1 & 2 — Partie A : Fermat & Factorisation
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_q2(self):
        self.etape("03-q1-q2-partie-a-fermat")
        self.ardoise()

        t1 = Text("Partie A — Fermat & Factorisation (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q1 (0,25 pt) : p impair => p ne divise pas 2 => par Fermat :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2^{p-1} \equiv 1 \pmod p", font_size=18, color=COL_MATH)

        r2 = Text("• Q2 (0,25 pt) : Identité remarquable 2^(p-1) - 1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\left(2^{\frac{p-1}{2}} - 1\right)\left(2^{\frac{p-1}{2}} + 1\right) = 2^{p-1} - 1 \equiv 0 \pmod p", font_size=17, color=COL_MATH)

        r3 = Text("• Par le lemme d'Euclide (p premier divise un produit) :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2^{\frac{p-1}{2}} \equiv 1 \pmod p \quad \text{ou} \quad 2^{\frac{p-1}{2}} \equiv -1 \pmod p", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie A : 2^((p-1)/2) = 1 [p] ou -1 [p].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Questions 3 & 4 — Partie B : Si x est solution de (E)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_q4(self):
        self.etape("04-q3-q4-partie-b-solution")
        self.ardoise()

        t1 = Text("Partie B — Si x est solution de (E) (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Q3 (0,5 pt) : Si p | x => x^2 = 0 [p] => 0 = 2 [p] => p | 2 (impossible car p >= 3) :", font_size=16, color=COL_WARN)
        c1 = MathTex(r"p \nmid x \implies \mathrm{PGCD}(p,\, x) = 1", font_size=17, color=COL_MATH)

        r2 = Text("• Q4 (0,5 pt) : Par Fermat, x^(p-1) = 1 [p], et x^(p-1) = (x^2)^((p-1)/2) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"x^{p-1} = (x^2)^{\frac{p-1}{2}} \equiv 2^{\frac{p-1}{2}} \pmod p", font_size=18, color=COL_MATH)
        c3 = MathTex(r"2^{\frac{p-1}{2}} \equiv 1 \pmod p", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Partie B : Toute solution vérifie 2^((p-1)/2) = 1 [p].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 5 — Partie C : Divisibilité des C_p^k
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("05-q5-partie-c-coefficients")
        self.ardoise()

        t1 = Text("Partie C — Coefficients binomiaux (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Identité fournie : k * C_p^k = p * C_(p-1)^(k-1) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"p \mid k\,C_p^k", font_size=18, color=COL_MATH)

        r2 = Text("• Pour 1 <= k <= p-1, p premier ne divise pas k => PGCD(p, k) = 1 :", font_size=16, color=COL_MATH)
        r3 = Text("• Par le théorème de Gauss :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p \mid C_p^k \quad \text{pour tout } k \in \{1, 2, \ldots, p-1\}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : p divise C_p^k pour 1 <= k <= p-1 (Gauss).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 6 — Partie D : Formule de Moivre
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("06-q6-partie-d-moivre")
        self.ardoise()

        t1 = Text("Partie D — Formule de Moivre pour (1+i)^p (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Forme trigonométrique de 1+i :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"1+i = \sqrt{2}\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)", font_size=18, color=COL_MATH)

        r2 = Text("• En élevant à la puissance p par la formule de Moivre :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(1+i)^p = (\sqrt{2})^p\left(\cos\frac{p\pi}{4} + i\sin\frac{p\pi}{4}\right)", font_size=18, color=COL_MATH)
        c3 = MathTex(r"(1+i)^p = 2^{\frac{p}{2}}\cos\!\left(p\frac{\pi}{4}\right) + i\,2^{\frac{p}{2}}\sin\!\left(p\frac{\pi}{4}\right)", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.25)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : (1+i)^p via module sqrt(2) et argument pi/4.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 7 — Partie D : Partie réelle et congruence
    # ─────────────────────────────────────────────────────────────
    def chapitre_q7(self):
        self.etape("07-q7-partie-d-congruence")
        self.ardoise()

        t1 = Text("Partie D — Partie réelle & Congruence modulo p (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Égalité des parties réelles :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2^{\frac{p}{2}}\cos\!\left(p\frac{\pi}{4}\right) = \sum_{k=0}^{\frac{p-1}{2}} (-1)^k C_p^{2k} \in \mathbb{Z}", font_size=17, color=COL_MATH)

        r2 = Text("• Pour k >= 1, 2k in {2, ..., p-1} => p | C_p^(2k) => C_p^(2k) = 0 [p] :", font_size=16, color=COL_MATH)
        r3 = Text("• Il ne reste que le terme k = 0, avec C_p^0 = 1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2^{\frac{p}{2}}\cos\!\left(p\frac{\pi}{4}\right) \equiv (-1)^0 C_p^0 \equiv 1 \pmod p", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c2, buff=0.25)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 7 : 2^(p/2)*cos(p*pi/4) in Z et = 1 [p].")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 8 — Partie E : Conclusion si p = 5 [8]
    # ─────────────────────────────────────────────────────────────
    def chapitre_q8(self):
        self.etape("08-q8-partie-e-conclusion")
        self.ardoise()

        t1 = Text("Partie E — Inexistence si p = 5 [8] (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Si p = 5 [8], alors cos(p*pi/4) = cos(5*pi/4) = -sqrt(2)/2 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"2^{\frac{p}{2}}\cos\!\left(p\frac{\pi}{4}\right) = 2^{\frac{p}{2}}\left(-\frac{\sqrt{2}}{2}\right) = -2^{\frac{p-1}{2}} \equiv 1 \pmod p", font_size=16, color=COL_MATH)
        c2 = MathTex(r"2^{\frac{p-1}{2}} \equiv -1 \pmod p", font_size=18, color=COL_WARN)

        r2 = Text("• Si (E) avait une solution, la Partie B imposerait :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"2^{\frac{p-1}{2}} \equiv 1 \pmod p \implies 1 \equiv -1 \pmod p \implies p \mid 2", font_size=17, color=COL_WARN)

        r3 = Text("• Or p >= 3 est impair : contradiction !", font_size=16, color=COL_WARN)
        concl = Text("L'équation (E) n'admet aucune solution dans Z si p = 5 [8].", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.2)
        self.ecrit(r1, buff=0.18)
        self.ecrit(c1, buff=0.18)
        self.ecrit(c2, buff=0.18)
        self.ecrit(r2, buff=0.18)
        self.ecrit(c3, buff=0.18)
        self.ecrit(r3, buff=0.18)
        self.ecrit(concl, buff=0.22)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 8 : 1 = -1 [p] => p | 2 impossible => pas de solution.")
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
            "Bilan — Bac 2023 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Partie A : 2^(p-1) = 1 [p] => 2^((p-1)/2) = 1 ou -1 [p]", font_size=16, color=COL_MATH)
        p2 = Text("• Partie B : x solution de (E) => PGCD(p,x)=1 => 2^((p-1)/2) = 1 [p]", font_size=16, color=COL_MATH)
        p3 = Text("• Partie C : p | C_p^k pour 1 <= k <= p-1 (Gauss)", font_size=16, color=COL_MATH)
        p4 = Text("• Partie D : (1+i)^p Moivre => 2^(p/2)*cos(p*pi/4) = 1 [p]", font_size=16, color=COL_MATH)
        p5 = Text("• Partie E : p = 5 [8] => 2^((p-1)/2) = -1 [p] => 1 = -1 impossible => S = vide", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2023 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
