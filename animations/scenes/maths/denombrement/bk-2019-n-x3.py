#!/usr/bin/env python3
"""Bac 2019 — Session Normale (Sciences Expérimentales) — Dénombrement & Probabilités (3 points)
Urne à trois couleurs — même couleur et au moins deux boules identiques.
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
COL_VERT = "#38A169"       # Vert pour les boules vertes
COL_ROUGE = "#E53E3E"      # Rouge pour les boules rouges
COL_NOIR = "#4A5568"       # Gris foncé/noir pour la boule noire
BAC_INK_SOFT = "#718096"   # Gris doux graduations/axes

# Constantes et nombres de la banque pour la fidélité
VALS_ENONCE = "10, 3, 6, 1, 120, 21, 7, 40, 102, 17, 20, 15, 60, 81, 18, 2019"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro_urne()
        self.chapitre_omega()
        self.chapitre_q1_a()
        self.chapitre_q1_b()
        self.chapitre_q2_c_directe()
        self.chapitre_q2_c_complementaire()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2019 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Dénombrement & Probabilités (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2019 SExp : Calcul des probabilités et dénombrement.")

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.2))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 02. Données et composition de l'urne
    # ─────────────────────────────────────────────────────────────
    def chapitre_intro_urne(self):
        self.etape("02-intro-urne")
        self.ardoise()

        t1 = Text("Composition de l'urne (10 boules au total)", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• 3 boules vertes", font_size=16, color=COL_VERT)
        r2 = Text("• 6 boules rouges", font_size=16, color=COL_ROUGE)
        r3 = Text("• 1 boule noire", font_size=16, color=COL_NOIR)
        r4 = Text("• Tirage simultané de 3 boules au hasard", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.3)

        # Dessin de l'urne à droite
        cadre_urne = RoundedRectangle(corner_radius=0.2, height=3.8, width=4.6, color=COL_MATH, stroke_width=2)
        cadre_urne.to_edge(RIGHT, buff=0.8).shift(DOWN * 0.2)
        lbl_urne = Text("Urne (10 boules)", font_size=16, color=COL_TITLE).next_to(cadre_urne, UP, buff=0.15)

        # 3 vertes (haut)
        b_v1 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-1.0, 1.0, 0]))
        lbl_v1 = Text("V", font_size=16, color=COL_VERT).move_to(b_v1)
        b_v2 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.0, 1.0, 0]))
        lbl_v2 = Text("V", font_size=16, color=COL_VERT).move_to(b_v2)
        b_v3 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([1.0, 1.0, 0]))
        lbl_v3 = Text("V", font_size=16, color=COL_VERT).move_to(b_v3)

        # 6 rouges (milieu et bas gauche)
        b_r1 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-1.5, 0.1, 0]))
        lbl_r1 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r1)
        b_r2 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-0.5, 0.1, 0]))
        lbl_r2 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r2)
        b_r3 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.5, 0.1, 0]))
        lbl_r3 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r3)
        b_r4 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([1.5, 0.1, 0]))
        lbl_r4 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r4)
        b_r5 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-1.0, -0.8, 0]))
        lbl_r5 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r5)
        b_r6 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.0, -0.8, 0]))
        lbl_r6 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r6)

        # 1 noire (bas droite)
        b_n1 = Circle(radius=0.25, color=COL_NOIR, fill_opacity=0.6).move_to(cadre_urne.get_center() + np.array([1.0, -0.8, 0]))
        lbl_n1 = Text("N", font_size=16, color=WHITE).move_to(b_n1)

        grp_visuel = VGroup(
            cadre_urne, lbl_urne,
            b_v1, lbl_v1, b_v2, lbl_v2, b_v3, lbl_v3,
            b_r1, lbl_r1, b_r2, lbl_r2, b_r3, lbl_r3, b_r4, lbl_r4, b_r5, lbl_r5, b_r6, lbl_r6,
            b_n1, lbl_n1
        )

        self.play(FadeIn(grp_visuel))
        self.legende("Urne : 3 vertes, 6 rouges et 1 noire (10 boules).")
        self.pose(3.0)
        self.play(FadeOut(grp_visuel))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Cardinal de l'univers Omega
    # ─────────────────────────────────────────────────────────────
    def chapitre_omega(self):
        self.etape("03-univers-card-omega")
        self.ardoise()

        t1 = Text("Univers des possibles — Tirage simultané", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Tirage de 3 boules simultanément parmi 10 (combinaison) :", font_size=16, color=COL_MATH)
        c_form = MathTex(r"\text{card}(\Omega) = \binom{10}{3}", font_size=19, color=COL_MATH)
        c_calc = MathTex(r"\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = \frac{720}{6} = 120", font_size=18, color=COL_SUCCESS)
        concl = Text("Il y a 120 tirages possibles au total (équiprobabilité).", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_form, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(c_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Cardinal de l'univers : card(Omega) = 120.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 1 — Probabilité de l'événement A
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_a(self):
        self.etape("04-q1-event-a")
        self.ardoise()

        t1 = Text("Question 1 — Événement A (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A : « Obtenir trois boules vertes »", font_size=16, color=COL_TITLE)

        r1 = Text("• Il y a 3 boules vertes dans l'urne :", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(A) = \binom{3}{3} = 1", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(A) = \frac{\text{card}(A)}{\text{card}(\Omega)} = \frac{1}{120}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(A) = 1/120 (trois boules vertes).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 1 — Probabilité de l'événement B
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_b(self):
        self.etape("05-q1-event-b")
        self.ardoise()

        t1 = Text("Question 1 — Événement B (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("B : « Obtenir trois boules de même couleur »", font_size=16, color=COL_TITLE)

        r1 = Text("• Trois cas disjoints (principe additif) :", font_size=16, color=COL_MATH)
        r2 = Text("  - 3 vertes OU 3 rouges OU 3 noires", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(B) = \binom{3}{3} + \binom{6}{3} + \binom{1}{3} = 1 + 20 + 0 = 21", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(B) = \frac{\text{card}(B)}{\text{card}(\Omega)} = \frac{21}{120} = \frac{7}{40}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c_calc, buff=0.25)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(B) = 21/120 = 7/40 (même couleur).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 2 — Événement C (Méthode directe)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_c_directe(self):
        self.etape("06-q2-event-c-methode-directe")
        self.ardoise()

        t1 = Text("Question 2 — Événement C : Méthode directe (1 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("C : « Obtenir au moins deux boules de même couleur »", font_size=16, color=COL_TITLE)

        r1 = Text("• Décomposition en cas incompatibles : 3 identiques OU exactement 2 identiques", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\text{3 de même couleur : } \text{card}(B) = 21", font_size=16, color=COL_MATH)
        c2 = MathTex(r"\text{Exactement 2 vertes : } \binom{3}{2} \times \binom{7}{1} = 3 \times 7 = 21", font_size=16, color=COL_MATH)
        c3 = MathTex(r"\text{Exactement 2 rouges : } \binom{6}{2} \times \binom{4}{1} = 15 \times 4 = 60", font_size=16, color=COL_MATH)
        c_tot = MathTex(r"\text{card}(C) = 21 + (21 + 60 + 0) = 21 + 81 = 102", font_size=17, color=COL_MATH)
        p_calc = MathTex(r"p(C) = \frac{102}{120} = \frac{17}{20}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.22)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c1, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(c_tot, buff=0.22)
        self.ecrit(p_calc, buff=0.25)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : p(C) = 102/120 = 17/20 (méthode directe).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 2 — Contrôle par l'événement contraire
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_c_complementaire(self):
        self.etape("07-q2-event-c-complementaire")
        self.ardoise()

        t1 = Text("Question 2 — Contrôle par l'événement contraire", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• L'événement contraire de C est :", font_size=16, color=COL_MATH)
        r2 = Text("  « Obtenir 3 boules de 3 couleurs différentes » (1 V, 1 R et 1 N)", font_size=16, color=COL_EMPH)

        c1 = MathTex(r"\text{card}(\overline{C}) = \binom{3}{1} \times \binom{6}{1} \times \binom{1}{1} = 3 \times 6 \times 1 = 18", font_size=17, color=COL_MATH)
        p1 = MathTex(r"p(\overline{C}) = \frac{18}{120} = \frac{3}{20}", font_size=17, color=COL_MATH)
        p2 = MathTex(r"p(C) = 1 - p(\overline{C}) = 1 - \frac{3}{20} = \frac{17}{20}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c1, buff=0.3)
        self.ecrit(p1, buff=0.3)
        self.ecrit(p2, buff=0.3)

        box = SurroundingRectangle(p2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Contrôle : 1 - p(3 couleurs différentes) = 1 - 3/20 = 17/20.")
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
            "Bilan — Bac 2019 SExp (Dénombrement & Probabilités, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Univers card(Omega) = C_10^3 = 120 (tirage simultané de 3 parmi 10)", font_size=16, color=COL_MATH)
        p2 = Text("• Événement A (3 vertes) : p(A) = 1/120", font_size=16, color=COL_MATH)
        p3 = Text("• Événement B (3 même couleur) : p(B) = (1+20+0)/120 = 21/120 = 7/40", font_size=16, color=COL_MATH)
        p4 = Text("• Événement C (au moins 2 même couleur) : p(C) = 102/120 = 17/20", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Contrôle complémentaire : p(C) = 1 - p(1V, 1R, 1N) = 1 - 3/20 = 17/20", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan du calcul des probabilités Bac 2019 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
