#!/usr/bin/env python3
"""Bac 2022 — Session Normale (Sciences Expérimentales) — Dénombrement & Probabilités (3 points)
Urne à trois couleurs — quatre probabilités par dénombrement.
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
COL_BLANC = "#CBD5E0"      # Gris clair pour les boules blanches
BAC_INK_SOFT = "#718096"   # Gris doux graduations/axes

# Constantes et nombres de la banque pour la fidélité
VALS_ENONCE = "10, 3, 4, 6, 120, 20, 2, 60, 15, 36, 40, 0.75, 2022"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro_urne()
        self.chapitre_omega()
        self.chapitre_q1_a()
        self.chapitre_q2_b()
        self.chapitre_q3_c()
        self.chapitre_q4_d()
        self.chapitre_controle()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2022 — Session Normale (SExp)",
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

        self.legende("Bac 2022 SExp : Probabilités et combinaisons.")

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
        r1 = Text("• 3 boules blanches", font_size=16, color=COL_MATH)
        r2 = Text("• 3 boules vertes", font_size=16, color=COL_VERT)
        r3 = Text("• 4 boules rouges", font_size=16, color=COL_ROUGE)
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

        # 3 blanches (haut)
        b_w1 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([-1.0, 1.0, 0]))
        lbl_w1 = Text("B", font_size=16, color=COL_MATH).move_to(b_w1)
        b_w2 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([0.0, 1.0, 0]))
        lbl_w2 = Text("B", font_size=16, color=COL_MATH).move_to(b_w2)
        b_w3 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([1.0, 1.0, 0]))
        lbl_w3 = Text("B", font_size=16, color=COL_MATH).move_to(b_w3)

        # 3 vertes (milieu)
        b_v1 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-1.0, 0.0, 0]))
        lbl_v1 = Text("V", font_size=16, color=COL_VERT).move_to(b_v1)
        b_v2 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.0, 0.0, 0]))
        lbl_v2 = Text("V", font_size=16, color=COL_VERT).move_to(b_v2)
        b_v3 = Circle(radius=0.25, color=COL_VERT, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([1.0, 0.0, 0]))
        lbl_v3 = Text("V", font_size=16, color=COL_VERT).move_to(b_v3)

        # 4 rouges (bas)
        b_r1 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-1.5, -0.9, 0]))
        lbl_r1 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r1)
        b_r2 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-0.5, -0.9, 0]))
        lbl_r2 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r2)
        b_r3 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.5, -0.9, 0]))
        lbl_r3 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r3)
        b_r4 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([1.5, -0.9, 0]))
        lbl_r4 = Text("R", font_size=16, color=COL_ROUGE).move_to(b_r4)

        grp_visuel = VGroup(
            cadre_urne, lbl_urne,
            b_w1, lbl_w1, b_w2, lbl_w2, b_w3, lbl_w3,
            b_v1, lbl_v1, b_v2, lbl_v2, b_v3, lbl_v3,
            b_r1, lbl_r1, b_r2, lbl_r2, b_r3, lbl_r3, b_r4, lbl_r4
        )

        self.play(FadeIn(grp_visuel))
        self.legende("Urne : 3 blanches, 3 vertes et 4 rouges (10 boules).")
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
        r1 = Text("• Tirer 3 boules simultanément parmi 10 correspond à une combinaison :", font_size=16, color=COL_MATH)
        c_form = MathTex(r"\text{card}(\Omega) = \binom{10}{3}", font_size=19, color=COL_MATH)
        c_calc = MathTex(r"\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = \frac{720}{6} = 120", font_size=18, color=COL_SUCCESS)
        concl = Text("Il y a 120 tirages possibles (dénominateur commun).", font_size=16, color=COL_SUCCESS)

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
    # 04. Question 1 — Événement A (Aucune rouge)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_a(self):
        self.etape("04-q1-event-a")
        self.ardoise()

        t1 = Text("Question 1 — Événement A (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A : « N'obtenir aucune boule rouge »", font_size=16, color=COL_TITLE)

        r1 = Text("• Les 3 boules sont choisies parmi les 6 non-rouges (3 B + 3 V) :", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(A) = \binom{6}{3} = \frac{6 \times 5 \times 4}{3 \times 2 \times 1} = 20", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(A) = \frac{\text{card}(A)}{\text{card}(\Omega)} = \frac{20}{120} = \frac{1}{6}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(A) = 20/120 = 1/6 (aucune rouge).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2 — Événement B (3 blanches ou 3 vertes)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_b(self):
        self.etape("05-q2-event-b")
        self.ardoise()

        t1 = Text("Question 2 — Événement B (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("B : « Obtenir trois boules blanches ou trois boules vertes »", font_size=16, color=COL_TITLE)

        r1 = Text("• Deux cas incompatibles (principe additif) :", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(B) = \underbrace{\binom{3}{3}}_{\text{3 blanches}} + \underbrace{\binom{3}{3}}_{\text{3 vertes}} = 1 + 1 = 2", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(B) = \frac{\text{card}(B)}{\text{card}(\Omega)} = \frac{2}{120} = \frac{1}{60}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : p(B) = 2/120 = 1/60 (3 blanches ou 3 vertes).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3 — Événement C (Exactement une rouge)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_c(self):
        self.etape("06-q3-event-c")
        self.ardoise()

        t1 = Text("Question 3 — Événement C (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("C : « Obtenir exactement une boule rouge »", font_size=16, color=COL_TITLE)

        r1 = Text("• Choix combiné (principe multiplicatif) :", font_size=16, color=COL_MATH)
        r2 = Text("  1 rouge parmi 4 ET 2 non-rouges parmi 6", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(C) = \binom{4}{1} \times \binom{6}{2} = 4 \times 15 = 60", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(C) = \frac{\text{card}(C)}{\text{card}(\Omega)} = \frac{60}{120} = \frac{1}{2}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : p(C) = 60/120 = 1/2 (exactement 1 rouge).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4 — Événement D (Au moins deux rouges)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4_d(self):
        self.etape("07-q4-event-d")
        self.ardoise()

        t1 = Text("Question 4 — Événement D (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("D : « Obtenir au moins deux boules rouges »", font_size=16, color=COL_TITLE)

        r1 = Text("• Deux cas incompatibles : exactement 2 rouges OU exactement 3 rouges", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\text{Exactement 2 rouges : } \binom{4}{2} \times \binom{6}{1} = 6 \times 6 = 36", font_size=17, color=COL_MATH)
        c2 = MathTex(r"\text{Exactement 3 rouges : } \binom{4}{3} \times \binom{6}{0} = 4 \times 1 = 4", font_size=17, color=COL_MATH)
        c_tot = MathTex(r"\text{card}(D) = 36 + 4 = 40", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(D) = \frac{\text{card}(D)}{\text{card}(\Omega)} = \frac{40}{120} = \frac{1}{3}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.22)
        self.ecrit(r1, buff=0.22)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c_tot, buff=0.22)
        self.ecrit(p_calc, buff=0.25)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : p(D) = 40/120 = 1/3 (au moins 2 rouges).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Contrôle par la partition de l'univers
    # ─────────────────────────────────────────────────────────────
    def chapitre_controle(self):
        self.etape("08-controle-partition")
        self.ardoise()

        t1 = Text("Contrôle global : Partition selon le nb de rouges", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Le nombre de boules rouges tirées peut être 0, 1, 2 ou 3 :", font_size=16, color=COL_MATH)
        p_0 = MathTex(r"p(\text{0 rouge}) = p(A) = \frac{20}{120}", font_size=17, color=COL_MATH)
        p_1 = MathTex(r"p(\text{1 rouge}) = p(C) = \frac{60}{120}", font_size=17, color=COL_MATH)
        p_23 = MathTex(r"p(\ge \text{2 rouges}) = p(D) = \frac{40}{120}", font_size=17, color=COL_MATH)
        s_tot = MathTex(r"\text{Somme : } \frac{20 + 60 + 40}{120} = \frac{120}{120} = 1", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(p_0, buff=0.25)
        self.ecrit(p_1, buff=0.25)
        self.ecrit(p_23, buff=0.25)
        self.ecrit(s_tot, buff=0.3)

        box = SurroundingRectangle(s_tot, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Contrôle : p(0 rouge) + p(1 rouge) + p(>= 2 rouges) = 1.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("09-bilan")
        titre = Text(
            "Bilan — Bac 2022 SExp (Dénombrement & Probabilités, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Univers card(Omega) = C_10^3 = 120 (tirage simultané de 3 parmi 10)", font_size=16, color=COL_MATH)
        p2 = Text("• Événement A (aucune rouge) : p(A) = 20/120 = 1/6", font_size=16, color=COL_MATH)
        p3 = Text("• Événement B (3 blanches ou 3 vertes) : p(B) = (1+1)/120 = 1/60", font_size=16, color=COL_MATH)
        p4 = Text("• Événement C (exactement 1 rouge) : p(C) = 60/120 = 1/2", font_size=16, color=COL_MATH)
        p5 = Text("• Événement D (au moins 2 rouges) : p(D) = (36+4)/120 = 40/120 = 1/3", font_size=16, color=COL_SUCCESS)
        p6 = Text("• Somme cohérente : p(0R) + p(1R) + p(>=2R) = 1", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5, p6).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan du calcul des probabilités Bac 2022 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
