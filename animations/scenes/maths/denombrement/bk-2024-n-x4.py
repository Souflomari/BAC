#!/usr/bin/env python3
"""Bac 2024 — Session Normale (Sciences Expérimentales) — Dénombrement & Probabilités (2 points)
Urne à trois numéros — même numéro, somme des numéros et indépendance.
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
VALS_ENONCE = "7, 4, 2, 1, 3, 21, 6, 5, 63, 0.5, 2024, 1.3, 2.2"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro_urne()
        self.chapitre_omega()
        self.chapitre_q1_a()
        self.chapitre_q2_b()
        self.chapitre_q3_inter()
        self.chapitre_q4_indep()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2024 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 4 : Probabilités & Indépendance (2 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2024 SExp : Probabilités, somme et indépendance.")

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

        t1 = Text("Composition de l'urne (7 boules au total)", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• 4 boules portant le numéro 1", font_size=16, color=COL_MATH)
        r2 = Text("• 2 boules portant le numéro 2", font_size=16, color=COL_EMPH)
        r3 = Text("• 1 boule portant le numéro 3", font_size=16, color=COL_WARN)
        r4 = Text("• Tirage simultané de 2 boules au hasard", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.3)

        # Dessin de l'urne à droite
        cadre_urne = RoundedRectangle(corner_radius=0.2, height=3.6, width=4.4, color=COL_MATH, stroke_width=2)
        cadre_urne.to_edge(RIGHT, buff=0.8).shift(DOWN * 0.2)
        lbl_urne = Text("Urne (7 boules)", font_size=16, color=COL_TITLE).next_to(cadre_urne, UP, buff=0.15)

        # 4 boules n°1 (haut)
        b_1a = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([-1.2, 0.8, 0]))
        lbl_1a = Text("1", font_size=16, color=COL_MATH).move_to(b_1a)
        b_1b = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([-0.4, 0.8, 0]))
        lbl_1b = Text("1", font_size=16, color=COL_MATH).move_to(b_1b)
        b_1c = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([0.4, 0.8, 0]))
        lbl_1c = Text("1", font_size=16, color=COL_MATH).move_to(b_1c)
        b_1d = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([1.2, 0.8, 0]))
        lbl_1d = Text("1", font_size=16, color=COL_MATH).move_to(b_1d)

        # 2 boules n°2 (milieu)
        b_2a = Circle(radius=0.25, color=COL_EMPH, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([-0.6, -0.1, 0]))
        lbl_2a = Text("2", font_size=16, color=COL_EMPH).move_to(b_2a)
        b_2b = Circle(radius=0.25, color=COL_EMPH, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.6, -0.1, 0]))
        lbl_2b = Text("2", font_size=16, color=COL_EMPH).move_to(b_2b)

        # 1 boule n°3 (bas)
        b_3a = Circle(radius=0.25, color=COL_WARN, fill_opacity=0.4).move_to(cadre_urne.get_center() + np.array([0.0, -0.9, 0]))
        lbl_3a = Text("3", font_size=16, color=COL_WARN).move_to(b_3a)

        grp_visuel = VGroup(
            cadre_urne, lbl_urne,
            b_1a, lbl_1a, b_1b, lbl_1b, b_1c, lbl_1c, b_1d, lbl_1d,
            b_2a, lbl_2a, b_2b, lbl_2b,
            b_3a, lbl_3a
        )

        self.play(FadeIn(grp_visuel))
        self.legende("Urne : 4 boules n°1, 2 boules n°2 et 1 boule n°3.")
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

        t1 = Text("Univers des possibles — Tirage de 2 parmi 7", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Tirer simultanément 2 boules parmi 7 correspond à une combinaison :", font_size=16, color=COL_MATH)
        c_form = MathTex(r"\text{card}(\Omega) = \binom{7}{2}", font_size=19, color=COL_MATH)
        c_calc = MathTex(r"\binom{7}{2} = \frac{7 \times 6}{2 \times 1} = 21", font_size=18, color=COL_SUCCESS)
        concl = Text("Il y a 21 tirages possibles (dénominateur commun).", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_form, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(c_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Cardinal de l'univers : card(Omega) = 21.")
        self.pose(3.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 1 — Événement A (Même numéro)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_a(self):
        self.etape("04-q1-event-a")
        self.ardoise()

        t1 = Text("Question 1 — Événement A (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A : « Les deux boules tirées portent le même numéro »", font_size=16, color=COL_TITLE)

        r1 = Text("• Trois cas disjoints : deux n°1 OU deux n°2 OU deux n°3", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(A) = \underbrace{\binom{4}{2}}_{\text{deux n°1}} + \underbrace{\binom{2}{2}}_{\text{deux n°2}} + \underbrace{\binom{1}{2}}_{\text{deux n°3}} = 6 + 1 + 0 = 7", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(A) = \frac{\text{card}(A)}{\text{card}(\Omega)} = \frac{7}{21} = \frac{1}{3}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(A) = 7/21 = 1/3 (même numéro).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2 — Événement B (Somme des numéros égale à 4)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_b(self):
        self.etape("05-q2-event-b")
        self.ardoise()

        t1 = Text("Question 2 — Événement B (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("B : « La somme des numéros des boules tirées est 4 »", font_size=16, color=COL_TITLE)

        r1 = Text("• Deux décompositions possibles de 4 avec deux boules :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\text{Cas (1, 3) : } \binom{4}{1} \times \binom{1}{1} = 4 \times 1 = 4", font_size=17, color=COL_MATH)
        c2 = MathTex(r"\text{Cas (2, 2) : } \binom{2}{2} = 1", font_size=17, color=COL_MATH)
        c_tot = MathTex(r"\text{card}(B) = 4 + 1 = 5", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(B) = \frac{\text{card}(B)}{\text{card}(\Omega)} = \frac{5}{21}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.22)
        self.ecrit(c2, buff=0.22)
        self.ecrit(c_tot, buff=0.22)
        self.ecrit(p_calc, buff=0.25)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : p(B) = 5/21 (somme des numéros = 4).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3 — Intersection A inter B
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_inter(self):
        self.etape("06-q3-event-a-inter-b")
        self.ardoise()

        t1 = Text("Question 3 — Probabilité de l'intersection (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A et B : « Même numéro ET somme égale à 4 »", font_size=16, color=COL_TITLE)

        r1 = Text("• Si les 2 boules portent le même numéro x, leur somme vaut 2x.", font_size=16, color=COL_MATH)
        r2 = Text("• 2x = 4 impose x = 2 : les deux boules portent le numéro 2.", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(A \cap B) = \binom{2}{2} = 1", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(A \cap B) = \frac{\text{card}(A \cap B)}{\text{card}(\Omega)} = \frac{1}{21}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.22)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : p(A inter B) = 1/21 (deux boules n°2).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 4 — Test d'indépendance
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4_indep(self):
        self.etape("07-q4-independance")
        self.ardoise()

        t1 = Text("Question 4 — Test d'indépendance de A et B (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Rappel du critère : A et B indépendants ssi p(A inter B) = p(A) * p(B).", font_size=16, color=COL_MATH)
        c1 = MathTex(r"p(A) \times p(B) = \frac{1}{3} \times \frac{5}{21} = \frac{5}{63}", font_size=18, color=COL_MATH)
        c2 = MathTex(r"p(A \cap B) = \frac{1}{21} = \frac{3}{63}", font_size=18, color=COL_MATH)
        comp = MathTex(r"\frac{3}{63} \neq \frac{5}{63} \implies p(A \cap B) \neq p(A) \times p(B)", font_size=18, color=COL_WARN)
        concl = Text("Conclusion : Les événements A et B ne sont pas indépendants.", font_size=16, color=COL_WARN, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(comp, buff=0.25)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_WARN, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : A et B ne sont pas indépendants.")
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
            "Bilan — Bac 2024 SExp (Probabilités & Indépendance, 2 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Univers card(Omega) = C_7^2 = 21 (tirage simultané de 2 parmi 7)", font_size=16, color=COL_MATH)
        p2 = Text("• Événement A (même numéro) : p(A) = (6+1+0)/21 = 7/21 = 1/3", font_size=16, color=COL_MATH)
        p3 = Text("• Événement B (somme = 4) : p(B) = (4+1)/21 = 5/21", font_size=16, color=COL_MATH)
        p4 = Text("• Intersection A inter B (deux n°2) : p(A inter B) = 1/21 = 3/63", font_size=16, color=COL_MATH)
        p5 = Text("• Produit : p(A) * p(B) = 5/63 != 3/63", font_size=16, color=COL_WARN)
        p6 = Text("• Les événements A et B NE sont PAS indépendants", font_size=16, color=COL_WARN, weight=BOLD)

        pts = VGroup(p1, p2, p3, p4, p5, p6).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan du calcul des probabilités Bac 2024 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
