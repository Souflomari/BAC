#!/usr/bin/env python3
"""Bac 2023 — Session Normale (Sciences Expérimentales) — Probabilités Conditionnelles (3 points)
Deux urnes en cascade, probabilité conditionnelle et loi du produit.
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
VALS_ENONCE = "6, 0, 1, 2, 5, 4, 3, 12, 0.5, 0.75, 0.25, 2023"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro_urnes()
        self.chapitre_q1a()
        self.chapitre_q1b()
        self.chapitre_q2()
        self.chapitre_q3a()
        self.chapitre_q3b()
        self.chapitre_q3c()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2023 — Session Normale (SExp)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Probabilités conditionnelles (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2023 SExp : Deux urnes en cascade et loi de probabilité.")

        self.play(FadeIn(titre, shift=UP * 0.3), FadeIn(soustitre, shift=UP * 0.2))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(soustitre))
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 02. Données et expérience des deux urnes
    # ─────────────────────────────────────────────────────────────
    def chapitre_intro_urnes(self):
        self.etape("02-intro-urnes")
        self.ardoise()

        t1 = Text("Expérience aléatoire à deux urnes", font_size=22, color=COL_TITLE, weight=BOLD)
        r1 = Text("• Urne U1 (6 boules) : {0, 0, 1, 1, 1, 2}", font_size=16, color=COL_MATH)
        r2 = Text("• Urne U2 (5 boules) : {1, 1, 1, 2, 2}", font_size=16, color=COL_MATH)
        r3 = Text("• Protocole :", font_size=16, color=COL_TITLE, weight=BOLD)
        r4 = Text("  1. On tire une boule de U1 (valeur a), qu'on dépose dans U2.", font_size=16, color=COL_EMPH)
        r5 = Text("  2. On tire ensuite une boule de U2 (valeur b).", font_size=16, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(r4, buff=0.2)
        self.ecrit(r5, buff=0.2)

        # Dessin des 2 urnes à droite
        cadre_u1 = RoundedRectangle(corner_radius=0.15, height=2.2, width=2.2, color=COL_MATH, stroke_width=1.5)
        cadre_u1.to_edge(RIGHT, buff=3.2).shift(DOWN * 0.5)
        lbl_u1 = Text("U1 (6)", font_size=16, color=COL_TITLE).next_to(cadre_u1, UP, buff=0.1)

        cadre_u2 = RoundedRectangle(corner_radius=0.15, height=2.2, width=2.2, color=COL_MATH, stroke_width=1.5)
        cadre_u2.to_edge(RIGHT, buff=0.6).shift(DOWN * 0.5)
        lbl_u2 = Text("U2 (5+1)", font_size=16, color=COL_TITLE).next_to(cadre_u2, UP, buff=0.1)

        fleche = Arrow(cadre_u1.get_right(), cadre_u2.get_left(), color=COL_EMPH, buff=0.15)
        lbl_f = Text("+1 boule (a)", font_size=16, color=COL_EMPH).next_to(fleche, UP, buff=0.05)

        grp_visuel = VGroup(cadre_u1, lbl_u1, cadre_u2, lbl_u2, fleche, lbl_f)

        self.play(FadeIn(grp_visuel))
        self.legende("Expérience : tirage dans U1, transfert dans U2, puis tirage dans U2.")
        self.pose(3.5)
        self.play(FadeOut(grp_visuel))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1.a — Probabilité de l'événement A
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1a(self):
        self.etape("03-q1a-event-a")
        self.ardoise()

        t1 = Text("Question 1.a — Événement A (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("A : « La boule tirée de U1 porte le nombre 1 »", font_size=16, color=COL_TITLE)

        r1 = Text("• L'urne U1 contient 6 boules dont trois portent le numéro 1 :", font_size=16, color=COL_MATH)
        c_calc = MathTex(r"p(A) = p(a = 1) = \frac{3}{6} = \frac{1}{2}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(enonce, buff=0.25)
        self.ecrit(r1, buff=0.3)
        self.ecrit(c_calc, buff=0.3)

        box = SurroundingRectangle(c_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1.a : p(A) = 3/6 = 1/2.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 1.b — Événement B : Produit ab = 2
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1b(self):
        self.etape("04-q1b-arbre-event-b")
        self.ardoise()

        t1 = Text("Question 1.b — Événement B : ab = 2 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        enonce = Text("B : « Le produit ab est égal à 2 » (chemins (1,2) ou (2,1))", font_size=16, color=COL_TITLE)

        r1 = Text("• Chemin 1 : a = 1 puis b = 2 (U2 contient alors {1,1,1,1,2,2}, 6 boules) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"p(a=1) \times p(b=2 \mid a=1) = \frac{1}{2} \times \frac{2}{6} = \frac{1}{6}", font_size=16, color=COL_MATH)

        r2 = Text("• Chemin 2 : a = 2 puis b = 1 (U2 contient alors {1,1,1,2,2,2}, 6 boules) :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p(a=2) \times p(b=1 \mid a=2) = \frac{1}{6} \times \frac{3}{6} = \frac{1}{12}", font_size=16, color=COL_MATH)

        c_tot = MathTex(r"p(B) = \frac{1}{6} + \frac{1}{12} = \frac{2 + 1}{12} = \frac{3}{12} = \frac{1}{4}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(enonce, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c_tot, buff=0.25)

        box = SurroundingRectangle(c_tot, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1.b : p(B) = 1/6 + 1/12 = 1/4.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 2 — Probabilité conditionnelle p(A/B)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("05-q2-proba-conditionnelle")
        self.ardoise()

        t1 = Text("Question 2 — Probabilité conditionnelle p(A/B) (0,75 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• L'événement A inter B correspond au seul chemin (a=1, b=2) :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"p(A \cap B) = p(a=1,\ b=2) = \frac{1}{6}", font_size=17, color=COL_MATH)

        r2 = Text("• Formule de la probabilité conditionnelle :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p(A/B) = \frac{p(A \cap B)}{p(B)} = \frac{1/6}{1/4} = \frac{4}{6} = \frac{2}{3}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : p(A/B) = (1/6) / (1/4) = 2/3.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 3.a — Variable aléatoire X : p(X = 0)
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3a(self):
        self.etape("06-q3a-variable-x-zero")
        self.ardoise()

        t1 = Text("Question 3.a — Variable aléatoire X = ab (0,25 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Le produit ab est nul si et seulement si a = 0 :", font_size=16, color=COL_MATH)
        r2 = Text("  (car aucune boule 0 n'est dans U2 au départ, b=0 ssi a=0)", font_size=16, color=COL_EMPH)
        c_calc = MathTex(r"p(X = 0) = p(a = 0) = \frac{2}{6} = \frac{1}{3}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c_calc, buff=0.3)

        box = SurroundingRectangle(c_calc, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3.a : p(X = 0) = 2/6 = 1/3.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 3.b — Loi de probabilité de X
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3b(self):
        self.etape("07-q3b-loi-de-x")
        self.ardoise()

        t1 = Text("Question 3.b — Loi de probabilité de X (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Valeurs possibles de X = ab : {0, 1, 2, 4}", font_size=16, color=COL_TITLE)
        c1 = MathTex(r"p(X=0) = \frac{1}{3} = \frac{4}{12}, \qquad p(X=2) = p(B) = \frac{1}{4} = \frac{3}{12}", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p(X=1) = p(a=1,\ b=1) = \frac{1}{2} \times \frac{4}{6} = \frac{1}{3} = \frac{4}{12}", font_size=16, color=COL_MATH)
        c3 = MathTex(r"p(X=4) = p(a=2,\ b=2) = \frac{1}{6} \times \frac{3}{6} = \frac{1}{12}", font_size=16, color=COL_MATH)

        tab = MathTex(
            r"\begin{array}{|c|c|c|c|c|} \hline "
            r"x_i & 0 & 1 & 2 & 4 \\ \hline "
            r"p(X=x_i) & \frac{1}{3} & \frac{1}{3} & \frac{1}{4} & \frac{1}{12} \\ \hline "
            r"\end{array}",
            font_size=17,
            color=COL_SUCCESS
        )

        c_somme = MathTex(r"\text{Somme : } \frac{4}{12} + \frac{4}{12} + \frac{3}{12} + \frac{1}{12} = \frac{12}{12} = 1", font_size=16, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(tab, buff=0.22)
        self.ecrit(c_somme, buff=0.22)

        box = SurroundingRectangle(tab, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3.b : Tableau de la loi de probabilité de X.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 3.c — Équiprobabilité de M et N
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3c(self):
        self.etape("08-q3c-equiprobabilite-m-n")
        self.ardoise()

        t1 = Text("Question 3.c — Événements M et N équiprobables (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• M : « ab pair non nul » correspond à X in {2, 4} :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"p(M) = p(X=2) + p(X=4) = \frac{1}{4} + \frac{1}{12} = \frac{3 + 1}{12} = \frac{4}{12} = \frac{1}{3}", font_size=17, color=COL_MATH)

        r2 = Text("• N : « ab = 1 » correspond à X = 1 :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"p(N) = p(X=1) = \frac{1}{3}", font_size=17, color=COL_MATH)

        concl = MathTex(r"p(M) = p(N) = \frac{1}{3} \implies M \text{ et } N \text{ sont équiprobables.}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3.c : p(M) = p(N) = 1/3, M et N sont équiprobables.")
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
            "Bilan — Bac 2023 SExp (Probabilités conditionnelles, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Événement A (a = 1) : p(A) = 3/6 = 1/2", font_size=16, color=COL_MATH)
        p2 = Text("• Événement B (ab = 2) : p(B) = 1/6 + 1/12 = 1/4", font_size=16, color=COL_MATH)
        p3 = Text("• Conditionnelle : p(A/B) = p(A inter B) / p(B) = (1/6)/(1/4) = 2/3", font_size=16, color=COL_MATH)
        p4 = Text("• Variable X = ab : p(X=0)=1/3, p(X=1)=1/3, p(X=2)=1/4, p(X=4)=1/12", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Équiprobabilité : p(M) = p(N) = 1/3", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan des probabilités conditionnelles Bac 2023 SExp.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
