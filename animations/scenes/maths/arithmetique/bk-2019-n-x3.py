#!/usr/bin/env python3
"""Bac 2019 — Session Normale (Sciences Mathématiques) — Arithmétique (3 points)
Congruences modulo 2969, Bézout et petit théorème de Fermat.
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
VALS_ENONCE = "2969, 2968, 8, 371, 1, -1, 0, 2, 0.5, 2019"


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        self.chapitre_q2()
        self.chapitre_q3()
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6()
        self.chapitre_fin()

    # ─────────────────────────────────────────────────────────────
    # 01. Titre
    # ─────────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2019 — Session Normale (SM)",
            font_size=32,
            color=COL_TITLE,
            weight=BOLD,
        )
        soustitre = Text(
            "Exercice 3 : Arithmétique, Bézout & Fermat (3 pts)",
            font_size=20,
            color=COL_MATH,
        )
        VGroup(titre, soustitre).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.legende("Bac 2019 SM : Congruences modulo 2969 et théorème de Fermat.")

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
        r1 = Text("• 2969 est un nombre premier (admis).", font_size=16, color=COL_MATH)
        r2 = Text("• Soient n et m deux entiers naturels vérifiant :", font_size=16, color=COL_MATH)
        c_cong = MathTex(r"n^8 + m^8 \equiv 0 \pmod{2969}", font_size=19, color=COL_SUCCESS)
        r3 = Text("• On va montrer pas à pas que :", font_size=16, color=COL_TITLE)
        c_but = MathTex(r"n \equiv 0 \pmod{2969} \quad \text{et} \quad m \equiv 0 \pmod{2969}", font_size=18, color=COL_EMPH)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c_cong, buff=0.3)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c_but, buff=0.3)

        box = SurroundingRectangle(c_cong, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Hypothèse : n^8 + m^8 = 0 [2969] avec 2969 premier.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 03. Question 1 — Inverse de n par Bézout
    # ─────────────────────────────────────────────────────────────
    def chapitre_q1(self):
        self.etape("03-q1-bezout-inverse")
        self.ardoise()

        t1 = Text("Question 1 — Inverse modulo 2969 par Bézout (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)
        hyp = Text("Hypothèse : 2969 ne divise pas n.", font_size=16, color=COL_TITLE)

        r1 = Text("• 2969 étant premier et ne divisant pas n :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"\mathrm{PGCD}(2969,\, n) = 1", font_size=18, color=COL_MATH)

        r2 = Text("• D'après le théorème de Bézout, il existe (u, v) in Z^2 tels que :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"u \cdot n + 2969 \cdot v = 1", font_size=18, color=COL_MATH)

        r3 = Text("• En réduisant cette égalité modulo 2969 :", font_size=16, color=COL_MATH)
        c3 = MathTex(r"u \cdot n \equiv 1 \pmod{2969}", font_size=18, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(hyp, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(c3, buff=0.3)

        box = SurroundingRectangle(c3, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 1 : u . n = 1 [2969] grâce au théorème de Bézout.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 04. Question 2 — Puissances (u*m)^8 et (u*m)^2968
    # ─────────────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("04-q2-puissance-2968")
        self.ardoise()

        t1 = Text("Question 2 — Calculs de puissances modulo 2969 (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• De n^8 + m^8 = 0 [2969], on tire m^8 = -n^8 [2969] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(u \cdot m)^8 = u^8 \cdot m^8 \equiv -\,(u \cdot n)^8 \equiv -(1)^8 = -1 \pmod{2969}", font_size=17, color=COL_MATH)

        r2 = Text("• Comme 2968 = 8 x 371 avec 371 impair :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"(u \cdot m)^{2968} = \big((u \cdot m)^8\big)^{371} \equiv (-1)^{371} = -1 \pmod{2969}", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 2 : (u.m)^2968 = -1 [2969] car 371 est impair.")
        self.pose(4.0)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 05. Question 3 — 2969 ne divise pas u*m
    # ─────────────────────────────────────────────────────────────
    def chapitre_q3(self):
        self.etape("05-q3-non-divisibilite-um")
        self.ardoise()

        t1 = Text("Question 3 — 2969 ne divise pas u*m (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Raisonnement par l'absurde : supposons que 2969 divise u*m.", font_size=16, color=COL_WARN)
        c1 = MathTex(r"2969 \mid u \cdot m \implies (u \cdot m)^8 \equiv 0 \pmod{2969}", font_size=17, color=COL_MATH)

        r2 = Text("• Or la question 2 donne (u.m)^8 = -1 [2969] :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"0 \equiv -1 \pmod{2969} \implies 2969 \mid 1", font_size=18, color=COL_WARN)
        concl = Text("Impossible car 2969 > 1. Donc 2969 ne divise pas u*m.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 3 : 2969 ne divise pas u.m (par l'absurde).")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 06. Question 4 — Petit théorème de Fermat
    # ─────────────────────────────────────────────────────────────
    def chapitre_q4(self):
        self.etape("06-q4-fermat-puissance-1")
        self.ardoise()

        t1 = Text("Question 4 — Petit théorème de Fermat (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• 2969 est premier et 2969 ne divise pas u*m (d'après Q3).", font_size=16, color=COL_MATH)
        r2 = Text("• Par le petit théorème de Fermat, a^(p-1) = 1 [p] :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"(u \cdot m)^{2969 - 1} \equiv 1 \pmod{2969}", font_size=18, color=COL_MATH)
        c2 = MathTex(r"(u \cdot m)^{2968} \equiv 1 \pmod{2969}", font_size=19, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(c2, buff=0.3)

        box = SurroundingRectangle(c2, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 4 : (u.m)^2968 = 1 [2969] d'après le théorème de Fermat.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 07. Question 5 — 2969 divise n
    # ─────────────────────────────────────────────────────────────
    def chapitre_q5(self):
        self.etape("07-q5-divisibilite-n")
        self.ardoise()

        t1 = Text("Question 5 — 2969 divise n (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• On compare les résultats de Q2 et Q4 pour (u.m)^2968 :", font_size=16, color=COL_MATH)
        c1 = MathTex(r"-1 \equiv (u \cdot m)^{2968} \equiv 1 \pmod{2969}", font_size=18, color=COL_MATH)

        r2 = Text("• Cela entraîne :", font_size=16, color=COL_MATH)
        c2 = MathTex(r"-1 \equiv 1 \pmod{2969} \implies 2969 \mid (1 - (-1)) = 2", font_size=18, color=COL_WARN)

        r3 = Text("• Or 2969 > 2 ne divise pas 2 : contradiction !", font_size=16, color=COL_WARN)
        concl = Text("L'hypothèse « 2969 ne divise pas n » est fausse : 2969 divise n.", font_size=16, color=COL_SUCCESS, weight=BOLD)

        self.ecrit(t1, buff=0.25)
        self.ecrit(r1, buff=0.25)
        self.ecrit(c1, buff=0.25)
        self.ecrit(r2, buff=0.25)
        self.ecrit(c2, buff=0.25)
        self.ecrit(r3, buff=0.25)
        self.ecrit(concl, buff=0.3)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 5 : Contradiction -1 = 1 [2969] => 2969 divise n.")
        self.pose(3.5)
        self.play(FadeOut(box))
        self.nettoie()
        self.efface_legende()

    # ─────────────────────────────────────────────────────────────
    # 08. Question 6 — Équivalence complète
    # ─────────────────────────────────────────────────────────────
    def chapitre_q6(self):
        self.etape("08-q6-equivalence-totale")
        self.ardoise()

        t1 = Text("Question 6 — Équivalence complète (0,5 pt)", font_size=22, color=COL_TITLE, weight=BOLD)

        r1 = Text("• Sens direct (=>) :", font_size=16, color=COL_TITLE)
        c1 = MathTex(r"n^8 + m^8 \equiv 0 \implies 2969 \mid n \implies n \equiv 0 \pmod{2969}", font_size=16, color=COL_MATH)
        c2 = MathTex(r"m^8 \equiv -\,n^8 \equiv 0 \implies 2969 \mid m^8 \implies 2969 \mid m \implies m \equiv 0 \pmod{2969}", font_size=16, color=COL_MATH)

        r2 = Text("• Sens réciproque (<=) :", font_size=16, color=COL_TITLE)
        c3 = MathTex(r"n \equiv 0 \text{ et } m \equiv 0 \implies n^8 + m^8 \equiv 0 + 0 = 0 \pmod{2969}", font_size=16, color=COL_MATH)

        concl = MathTex(r"n^8 + m^8 \equiv 0 \pmod{2969} \iff n \equiv 0 \text{ et } m \equiv 0 \pmod{2969}", font_size=17, color=COL_SUCCESS)

        self.ecrit(t1, buff=0.22)
        self.ecrit(r1, buff=0.2)
        self.ecrit(c1, buff=0.2)
        self.ecrit(c2, buff=0.2)
        self.ecrit(r2, buff=0.2)
        self.ecrit(c3, buff=0.2)
        self.ecrit(concl, buff=0.25)

        box = SurroundingRectangle(concl, color=COL_SUCCESS, buff=0.12)
        self.play(Create(box))

        self.legende("Question 6 : Équivalence démontrée dans les deux sens.")
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
            "Bilan — Bac 2019 SM (Arithmétique, 3 pts)",
            font_size=23,
            color=COL_TITLE,
            weight=BOLD,
        ).to_edge(UP, buff=0.6)

        p1 = Text("• Bézout : Si 2969 ne divise pas n, il existe u tel que u*n = 1 [2969]", font_size=16, color=COL_MATH)
        p2 = Text("• Puissances : (u*m)^8 = -1 [2969] et (u*m)^2968 = (-1)^371 = -1 [2969]", font_size=16, color=COL_MATH)
        p3 = Text("• Non-divisibilité : 2969 ne divise pas u*m (sinon 0 = -1)", font_size=16, color=COL_MATH)
        p4 = Text("• Fermat : (u*m)^2968 = 1 [2969] => contradiction -1 = 1 => 2969 divise n", font_size=16, color=COL_SUCCESS)
        p5 = Text("• Conclusion : n^8 + m^8 = 0 [2969] <=> n = 0 et m = 0 [2969]", font_size=16, color=COL_SUCCESS)

        pts = VGroup(p1, p2, p3, p4, p5).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        pts.next_to(titre, DOWN, buff=0.35)

        box = SurroundingRectangle(VGroup(titre, pts), color=COL_TITLE, buff=0.25, stroke_width=1.5)
        bilan = VGroup(box, titre, pts)

        self.play(FadeIn(bilan))
        self.legende("Bilan de la résolution arithmétique Bac 2019 SM.")
        self.pose(4.5)
        self.play(FadeOut(bilan))
        self.efface_legende()
