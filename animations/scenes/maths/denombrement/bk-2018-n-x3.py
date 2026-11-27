#!/usr/bin/env python3
"""Bac 2018 — Session Normale (Sciences Expérimentales) — Dénombrement & Probabilités (3 points)
Urne à deux couleurs numérotées — dénombrement puis variable aléatoire binomiale.
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
COL_ROUGE = "#E53E3E"      # Rouge pour les boules rouges
COL_BLANC = "#CBD5E0"      # Gris clair pour les boules blanches
BAC_INK_SOFT = "#718096"   # Gris doux graduations/axes

# Constantes et nombres de la banque pour la fidélité
VALS_ENONCE = "9, 5, 4, 1, 2, 3, 84, 14, 6, 21, 42, 25, 72, 75, 216, 15, 36, 1.5, 0.5, 2018"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro_urne()
        self.chapitre_omega()
        self.chapitre_q1_a()
        self.chapitre_q1_b()
        self.chapitre_q1_c()
        self.chapitre_q2_binomiale()
        self.chapitre_q3_px1()
        self.chapitre_q3_px2()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2018 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Dénombrement & Loi Binomiale (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2018 SExp : Dénombrement, probabilités et loi binomiale.")

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

        t1 = Text("Données de l'urne (9 boules au total)", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• 5 boules rouges portant les nombres : 1, 1, 2, 2, 2", font_size=16, color=COL_ROUGE)
        r2 = Text("• 4 boules blanches portant les nombres : 1, 2, 2, 2", font_size=16, color=COL_MATH)
        r3 = Text("• Tirage : 3 boules tirées simultanément et au hasard", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.3)

        # Représentation visuelle de l'urne à droite
        cadre_urne = RoundedRectangle(corner_radius=0.2, height=3.6, width=4.4, color=COL_MATH, stroke_width=2)
        cadre_urne.to_edge(RIGHT, buff=0.8).shift(DOWN * 0.2)
        lbl_urne = Text("Urne (9 boules)", font_size=16, color=COL_TITLE).next_to(cadre_urne, UP, buff=0.15)

        # 5 boules rouges (1, 1, 2, 2, 2)
        b_r1 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([-1.5, 0.8, 0]))
        num_r1 = Text("1", font_size=16, color=COL_ROUGE).move_to(b_r1)
        b_r2 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([-0.7, 0.8, 0]))
        num_r2 = Text("1", font_size=16, color=COL_ROUGE).move_to(b_r2)
        b_r3 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([0.1, 0.8, 0]))
        num_r3 = Text("2", font_size=16, color=COL_ROUGE).move_to(b_r3)
        b_r4 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([0.9, 0.8, 0]))
        num_r4 = Text("2", font_size=16, color=COL_ROUGE).move_to(b_r4)
        b_r5 = Circle(radius=0.25, color=COL_ROUGE, fill_opacity=0.3).move_to(cadre_urne.get_center() + np.array([1.7, 0.8, 0]))
        num_r5 = Text("2", font_size=16, color=COL_ROUGE).move_to(b_r5)

        # 4 boules blanches (1, 2, 2, 2)
        b_w1 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([-1.1, -0.6, 0]))
        num_w1 = Text("1", font_size=16, color=COL_MATH).move_to(b_w1)
        b_w2 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([-0.3, -0.6, 0]))
        num_w2 = Text("2", font_size=16, color=COL_MATH).move_to(b_w2)
        b_w3 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([0.5, -0.6, 0]))
        num_w3 = Text("2", font_size=16, color=COL_MATH).move_to(b_w3)
        b_w4 = Circle(radius=0.25, color=COL_MATH, fill_opacity=0.15).move_to(cadre_urne.get_center() + np.array([1.3, -0.6, 0]))
        num_w4 = Text("2", font_size=16, color=COL_MATH).move_to(b_w4)

        grp_visuel = VGroup(
            cadre_urne, lbl_urne,
            b_r1, num_r1, b_r2, num_r2, b_r3, num_r3, b_r4, num_r4, b_r5, num_r5,
            b_w1, num_w1, b_w2, num_w2, b_w3, num_w3, b_w4, num_w4
        )

        self.play(FadeIn(grp_visuel))
        self.legende("Urne : 5 rouges (1,1,2,2,2) et 4 blanches (1,2,2,2).")
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
        r1 = Text("• Tirer 3 boules simultanément parmi 9 correspond à une combinaison :", font_size=16, color=COL_MATH)
        c_form = MathTex(r"\text{card}(\Omega) = \binom{9}{3}", font_size=19, color=COL_MATH)
        c_calc = MathTex(r"\binom{9}{3} = \frac{9 \times 8 \times 7}{3 \times 2 \times 1} = \frac{504}{6} = 84", font_size=18, color=COL_SUCCESS)
        concl = Text("Il y a 84 tirages équiprobables au total (dénominateur commun).", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_form, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(c_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Cardinal de l'univers : card(Omega) = 84.")
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

        t1 = Text("Question 1 — Événement A (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A : « Les 3 boules tirées sont de même couleur »", font_size=16, color=COL_TITLE)

        r1 = Text("• Deux cas disjoints (principe additif) : 3 rouges OU 3 blanches", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(A) = \binom{5}{3} + \binom{4}{3} = 10 + 4 = 14", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(A) = \frac{\text{card}(A)}{\text{card}(\Omega)} = \frac{14}{84} = \frac{1}{6}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(A) = 14/84 = 1/6 (même couleur).")
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

        t1 = Text("Question 1 — Événement B (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("B : « Les 3 boules tirées portent le même nombre »", font_size=16, color=COL_TITLE)

        r1 = Text("• Regroupement par numéro :", font_size=16, color=COL_MATH)
        r2 = Text("  - Portant le numéro 1 : 2 rouges + 1 blanche = 3 boules", font_size=16, color=COL_MATH)
        r3 = Text("  - Portant le numéro 2 : 3 rouges + 3 blanches = 6 boules", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"\text{card}(B) = \binom{3}{3} + \binom{6}{3} = 1 + 20 = 21", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(B) = \frac{\text{card}(B)}{\text{card}(\Omega)} = \frac{21}{84} = \frac{1}{4}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(c_calc, buff=0.25)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(B) = 21/84 = 1/4 (même numéro).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 1 — Probabilité de l'événement C
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1_c(self):
        self.etape("06-q1-event-c")
        self.ardoise()

        t1 = Text("Question 1 — Événement C (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("C : « Les 3 boules sont de même couleur ET portent le même nombre »", font_size=16, color=COL_TITLE)

        r1 = Text("• Cas possibles :", font_size=16, color=COL_MATH)
        r2 = Text("  - 3 boules rouges portant le numéro 2 : 1 seule façon (3 parmi 3)", font_size=16, color=COL_ROUGE)
        r3 = Text("  - 3 boules blanches portant le numéro 2 : 1 seule façon (3 parmi 3)", font_size=16, color=COL_MATH)
        r4 = Text("  (Le numéro 1 n'a pas assez de boules dans chaque couleur)", font_size=16, color=COL_WARN)

        c_calc = MathTex(r"\text{card}(C) = \binom{3}{3} + \binom{3}{3} = 1 + 1 = 2", font_size=18, color=COL_MATH)
        p_calc = MathTex(r"p(C) = \frac{\text{card}(C)}{\text{card}(\Omega)} = \frac{2}{84} = \frac{1}{42}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.2)
        self.ecrit(r3, buff=0.2)
        self.ecrit(r4, buff=0.2)
        self.ecrit(c_calc, buff=0.25)
        self.ecrit(p_calc, buff=0.3)

        box = SurroundingRectangle(p_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : p(C) = 2/84 = 1/42 (même couleur et même numéro).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 2 — Répétition avec remise : Loi binomiale
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2_binomiale(self):
        self.etape("07-q2-loi-binomiale-parametres")
        self.ardoise()

        t1 = Text("Question 2 — Paramètres de la variable X (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("On répète l'épreuve 3 fois avec remise. X = nb de réalisations de A.", font_size=16, color=COL_TITLE)

        r1 = Text("• Répétition de n = 3 épreuves identiques et indépendantes (avec remise).", font_size=16, color=COL_MATH)
        r2 = Text("• Chaque tirage a 2 issues : Succès (A est réalisé) ou Échec.", font_size=16, color=COL_MATH)
        r3 = MathTex(r"\text{Probabilité de succès : } p = p(A) = \frac{1}{6}", font_size=17, color=COL_MATH)
        concl = MathTex(r"X \sim \mathcal{B}\left(3,\ \frac{1}{6}\right) \quad (\text{loi binomiale de paramètres } n=3 \text{ et } p=1/6)", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.3)
        self.ecrit(concl, buff=0.35)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : X suit la loi binomiale B(3, 1/6).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 3 — Calcul de p(X = 1)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_px1(self):
        self.etape("08-q3-calcul-p-x1")
        self.ardoise()

        t1 = Text("Question 3 — Calcul de p(X = 1) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = MathTex(r"\text{Formule générale : } p(X = k) = \binom{n}{k} p^k (1-p)^{n-k}", font_size=17, color=COL_MATH)
        c1 = MathTex(r"p(X = 1) = \binom{3}{1}\left(\frac{1}{6}\right)^1\left(1 - \frac{1}{6}\right)^{3-1}", font_size=18, color=COL_MATH)
        c2 = MathTex(r"p(X = 1) = 3 \times \frac{1}{6} \times \left(\frac{5}{6}\right)^2 = 3 \times \frac{1}{6} \times \frac{25}{36}", font_size=17, color=COL_MATH)
        c3 = MathTex(r"p(X = 1) = \frac{75}{216} = \frac{25}{72}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c1, buff=0.3)
        self.ecrit(c2, buff=0.3)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : p(X = 1) = 75/216 = 25/72.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 09. Question 3 — Calcul de p(X = 2)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3_px2(self):
        self.etape("09-q3-calcul-p-x2")
        self.ardoise()

        t1 = Text("Question 3 — Calcul de p(X = 2) (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        c1 = MathTex(r"p(X = 2) = \binom{3}{2}\left(\frac{1}{6}\right)^2\left(1 - \frac{1}{6}\right)^{3-2}", font_size=18, color=COL_MATH)
        c2 = MathTex(r"p(X = 2) = 3 \times \left(\frac{1}{36}\right) \times \left(\frac{5}{6}\right) = \frac{15}{216}", font_size=17, color=COL_MATH)
        c3 = MathTex(r"p(X = 2) = \frac{15}{216} = \frac{5}{72}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(c1, buff=0.35)
        self.ecrit(c2, buff=0.3)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : p(X = 2) = 15/216 = 5/72.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 10. Bilan
    # ─────────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("10-bilan")
        titre = Text(
            "Bilan — Bac 2018 SExp (Dénombrement & Probabilités, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Univers card(Omega) = C_9^3 = 84 (tirage simultané)", font_size=16, color=COL_MATH)
        p2 = Text("• Événement A (même couleur) : p(A) = 14/84 = 1/6", font_size=16, color=COL_MATH)
        p3 = Text("• Événement B (même nombre) : p(B) = 21/84 = 1/4", font_size=16, color=COL_MATH)
        p4 = Text("• Événement C (même couleur et nombre) : p(C) = 2/84 = 1/42", font_size=16, color=COL_MATH)
        p5 = Text("• Variable binomiale X ~ B(3, 1/6) (répétition avec remise)", font_size=16, color=COL_SUCCESS)
        p6 = Text("• Probabilités : p(X = 1) = 25/72 et p(X = 2) = 5/72", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5, p6).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan du dénombrement et de la loi binomiale Bac 2018 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
