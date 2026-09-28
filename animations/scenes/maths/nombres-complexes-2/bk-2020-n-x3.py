"""Explication animée — Bac 2020 SN (SM), Exercice 3 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-2/bank.yaml,
entrée bk-2020-n-x3 (vérifiée, AlloSchool NS25 BIOF, Exercice 3, 3.5 points).

Partie I : Équation du 3e degré (E) : z^3 - 2mz^2 + 2m^2z - m^3 = 0.
- q1 (0,5 pt) : Résoudre dans C l'équation (E) sachant que m est racine.
- q2a (0,25 pt) : Vérifier que 1/z1 + 1/z2 = 1/m.
- q2b (0,5 pt) : Pour m = 1 + e^{iπ/3}, forme algébrique de z1 et z2.

Partie II : Géométrie dans le plan complexe avec m non nul.
- A(a = m e^{iπ/3}), B(b = m e^{-iπ/3}).
- P, Q, R centres des rotations d'angle π/2 (O -> A, A -> B, B -> O).
- q3 (0,25 pt) : O, A, B non alignés (rapport b/a = e^{-i2π/3} not in R).
- q4a (1 pt) : p = m (√2/2) e^{i 7π/12} et r = m (√2/2) e^{-i 7π/12}.
- q4b (0,5 pt) : q = m √2 sin(7π/12) = m (1+√3)/2.
- q5 (0,5 pt) : PR = OQ et (PR) ⊥ (OQ) via (r-p)/q = -i.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Angle,
    Arc,
    Arrow,
    Axes,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    Polygon,
    ReplacementTransform,
    RightAngle,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    ORIGIN,
    RIGHT,
    UP,
    UR,
    UL,
    DL,
    DR,
    PI,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_BORDER,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
    BAC_BG,
    BAC_SURFACE_RAISED,
)

# Palette thématique pour les complexes et rotations
COL_TITLE = BAC_ACCENT_STRONG
COL_PARTIE = BAC_ACCENT
COL_MATH = BAC_INK
COL_EMPH = BAC_ACCENT
COL_WARN = BAC_ERROR
COL_SUCCESS = BAC_SUCCESS

COL_PT_O = BAC_INK_MUTED
COL_PT_A = BAC_ACCENT
COL_PT_B = BAC_WARNING
COL_PT_P = BAC_SUCCESS
COL_PT_Q = "#9C27B0"  # Violet distinct
COL_PT_R = "#E91E63"  # Rose vif

NARRATION = {
    "titre": "Baccalauréat 2020, session normale, Sciences Mathématiques. "
    "Exercice trois : nombres complexes, équation du troisième degré et rotations.",
    "intro": "Soit m un complexe non nul. Première partie : factorisation et résolution "
    "d'une cubique. Deuxième partie : configuration géométrique avec trois centres de rotation.",
    "q1": "Question 1 : m est solution évidente. On factorise par z moins m et on résout "
    "le trinôme du second degré à discriminant négatif.",
    "q2a": "Question 2a : Les relations coefficients-racines de Viète donnent immédiatement "
    "la somme des inverses.",
    "q2b": "Question 2b : Pour m sous forme exponentielle via l'angle moitié, on calcule "
    "les formes algébriques de z1 et z2.",
    "q3": "Question 3 : On montre que le rapport b sur a n'est pas réel, donc O, A et B "
    "ne sont pas alignés.",
    "q4a": "Question 4a : On exprime les centres P et R des rotations envoyant O sur A et B sur O.",
    "q4b": "Question 4b : On détermine l'affixe du centre Q envoyant A sur B par simplification algébrique.",
    "q5": "Question 5 : Le quotient r moins p sur q vaut moins i, prouvant simultanément "
    "l'égalité des longueurs PR et OQ et leur orthogonalité.",
    "bilan": "Synthèse complète de l'exercice : factorisation cubique, angle moitié et géométrie des rotations.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Partie I : Résolution de l'équation (E) ────────────────────
        self.chapitre_q1()
        self.nettoie_partie1()
        self.chapitre_q2a()
        self.nettoie_partie1()
        self.chapitre_q2b()
        self.nettoie_partie1()

        # ── Partie II : Configuration géométrique et rotations ─────────
        fig = self.setup_figure_partie2()
        self.chapitre_q3(fig)
        self.nettoie_zone_gauche(fig)
        self.chapitre_q4a(fig)
        self.nettoie_zone_gauche(fig)
        self.chapitre_q4b(fig)
        self.nettoie_zone_gauche(fig)
        self.chapitre_q5(fig)

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin(fig)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        titre = Text(
            "Bac 2020 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.8)
        sous_titre = Text(
            "Exercice 3 : Équation cubique, Angle moitié & Rotations d'angle π/2",
            font_size=20,
            color=BAC_INK_SOFT,
        ).next_to(titre, DOWN, buff=0.3)
        pts = Text(
            "Barème : 3,5 points • 6 questions • Sciences Mathématiques",
            font_size=16,
            color=BAC_ACCENT,
        ).next_to(sous_titre, DOWN, buff=0.4)

        bandeau = VGroup(titre, sous_titre, pts)
        self.play(FadeIn(bandeau, shift=DOWN * 0.3), run_time=1.2)
        self.legende(NARRATION["titre"])
        self.pose(1.5)
        self.play(FadeOut(bandeau, shift=UP * 0.3), run_time=0.8)

    # ── Introduction ──────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro")
        t_part1 = Text(
            "Partie I : Équation (E) dans ℂ",
            font_size=22,
            color=COL_PARTIE,
            weight="BOLD",
        )
        t_eq = MathTex(
            r"(E) : z^3 - 2mz^2 + 2m^2z - m^3 = 0 \quad (m \in \mathbb{C}^*)",
            font_size=20,
            color=COL_MATH,
        )
        t_part2 = Text(
            "Partie II : Rotations d'angle π/2 et Orthogonalité",
            font_size=22,
            color=COL_PARTIE,
            weight="BOLD",
        )
        t_pts = MathTex(
            r"A(me^{i\pi/3}),\ B(me^{-i\pi/3}),\ P(\text{rot } O \to A),\ Q(\text{rot } A \to B),\ R(\text{rot } B \to O)",
            font_size=18,
            color=COL_MATH,
        )
        t_obj = Text(
            "Objectif : Comparer PR et OQ par un unique rapport complexe",
            font_size=18,
            color=COL_SUCCESS,
        )

        carte = VGroup(t_part1, t_eq, t_part2, t_pts, t_obj).arrange(
            DOWN, buff=0.45, aligned_edge=LEFT
        ).to_edge(LEFT, buff=1.0).shift(UP * 0.2)

        box = SurroundingRectangle(
            carte, color=BAC_BORDER, buff=0.4, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.9
        )

        self.play(FadeIn(box), FadeIn(carte), run_time=1.2)
        self.legende(NARRATION["intro"])
        self.pose(1.5)
        self.play(FadeOut(box), FadeOut(carte), run_time=0.8)

    # ── Question 1 ────────────────────────────────────────────────────
    def chapitre_q1(self):
        # Étape 1 : Énoncé et factorisation
        self.etape("q1-factorisation")
        q_head = self.titre_question(1, "0,5 pt")
        enonce = self.texte_enonce(
            "Résoudre dans ℂ l'équation (E) : z³ - 2mz² + 2m²z - m³ = 0\n"
            "(On remarque que m est une solution évidente)."
        )

        r_titre = Text("Factorisation par (z - m) :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.4).to_edge(LEFT, buff=0.8)
        
        eq_fact = MathTex(
            r"(E) \iff (z - m)(z^2 - mz + m^2) = 0",
            font_size=20,
            color=COL_MATH,
        ).next_to(r_titre, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        verif = Text(
            "Vérification : (z - m)(z² - mz + m²) = z³ - mz² + m²z - mz² + m²z - m³ = (E) ✓",
            font_size=16,
            color=BAC_INK_MUTED,
        ).next_to(eq_fact, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(r_titre), Write(eq_fact), run_time=1.2)
        self.play(FadeIn(verif), run_time=0.8)
        self.legende(NARRATION["q1"])
        self.pose(1.5)

        # Étape 2 : Résolution du trinôme
        self.etape("q1-trinome")
        r_trinome = Text("Résolution du facteur z² - mz + m² = 0 :", font_size=18, color=COL_EMPH).next_to(verif, DOWN, buff=0.35).to_edge(LEFT, buff=0.8)

        calc_delta = MathTex(
            r"\Delta = (-m)^2 - 4(1)(m^2) = m^2 - 4m^2 = -3m^2 = (i\,m\sqrt{3})^2",
            font_size=20,
            color=COL_MATH,
        ).next_to(r_trinome, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        warn_delta = Text(
            "Piège : Δ = -3m² < 0 si m réel, mais ici m ∈ ℂ*. Une racine carrée est δ = i m √3.",
            font_size=16,
            color=COL_WARN,
        ).next_to(calc_delta, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        self.play(FadeIn(r_trinome), Write(calc_delta), FadeIn(warn_delta), run_time=1.2)
        self.legende("Calcul du discriminant Δ = -3m² et extraction de sa racine carrée.")
        self.pose(1.5)

        # Étape 3 : Solutions de l'équation
        self.etape("q1-solutions")
        calc_racines = MathTex(
            r"z = \frac{m \pm i\,m\sqrt{3}}{2} = m\,\frac{1 \pm i\sqrt{3}}{2}",
            font_size=20,
            color=COL_MATH,
        ).next_to(warn_delta, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        sol_box = MathTex(
            r"\mathcal{S} = \left\{\, m,\ m\,\frac{1+i\sqrt{3}}{2},\ m\,\frac{1-i\sqrt{3}}{2} \,\right\}",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(calc_racines, DOWN, buff=0.3).to_edge(LEFT, buff=1.0)

        cadre_sol = SurroundingRectangle(sol_box, color=COL_SUCCESS, buff=0.2, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.8)

        self.play(Write(calc_racines), FadeIn(cadre_sol), Write(sol_box), run_time=1.2)
        self.legende("L'ensemble des solutions de l'équation (E) comporte 3 racines.")
        self.pose(1.5)

    # ── Question 2a ───────────────────────────────────────────────────
    def chapitre_q2a(self):
        # Étape 4 : Somme des inverses
        self.etape("q2a-somme-inverses")
        q_head = self.titre_question("2.a", "0,25 pt")
        enonce = self.texte_enonce(
            "Soient z₁ et z₂ les deux racines de z² - mz + m² = 0.\n"
            "Vérifier que : 1/z₁ + 1/z₂ = 1/m."
        )

        t_viete = Text("Relations de Viète sur le trinôme z² - mz + m² = 0 :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.4).to_edge(LEFT, buff=0.8)

        calc_viete = MathTex(
            r"z_1 + z_2 = -\frac{-m}{1} = m \quad \text{et} \quad z_1 \cdot z_2 = \frac{m^2}{1} = m^2",
            font_size=20,
            color=COL_MATH,
        ).next_to(t_viete, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        t_calc = Text("Mise au même dénominateur :", font_size=18, color=COL_EMPH).next_to(calc_viete, DOWN, buff=0.35).to_edge(LEFT, buff=0.8)

        calc_inv = MathTex(
            r"\frac{1}{z_1} + \frac{1}{z_2} = \frac{z_1 + z_2}{z_1 \cdot z_2} = \frac{m}{m^2} = \frac{1}{m}",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(t_calc, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        cadre_inv = SurroundingRectangle(calc_inv, color=COL_SUCCESS, buff=0.2, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.8)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_viete), Write(calc_viete), run_time=1.2)
        self.play(FadeIn(t_calc), FadeIn(cadre_inv), Write(calc_inv), run_time=1.2)
        self.legende(NARRATION["q2a"])
        self.pose(1.5)

    # ── Question 2b ───────────────────────────────────────────────────
    def chapitre_q2b(self):
        # Étape 5 : Angle moitié sur m
        self.etape("q2b-angle-moitie")
        q_head = self.titre_question("2.b", "0,5 pt")
        enonce = self.texte_enonce(
            "Dans le cas où m = 1 + e^{iπ/3}, écrire z₁ et z₂ sous forme algébrique."
        )

        t_m = Text("Forme trigonométrique de m (technique de l'angle moitié) :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.35).to_edge(LEFT, buff=0.8)

        calc_m = MathTex(
            r"m = 1 + e^{i\pi/3} = e^{i\pi/6}\left(e^{-i\pi/6} + e^{i\pi/6}\right) = 2\cos\left(\frac{\pi}{6}\right) e^{i\pi/6} = \sqrt{3}\,e^{i\pi/6}",
            font_size=19,
            color=COL_MATH,
        ).next_to(t_m, DOWN, buff=0.25).to_edge(LEFT, buff=1.0)

        t_exp = Text("Forme exponentielle de 1 ± i√3 :", font_size=18, color=COL_EMPH).next_to(calc_m, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)

        calc_exp = MathTex(
            r"1+i\sqrt{3} = 2e^{i\pi/3} \implies z_1 = m\,e^{i\pi/3}, \qquad 1-i\sqrt{3} = 2e^{-i\pi/3} \implies z_2 = m\,e^{-i\pi/3}",
            font_size=19,
            color=COL_MATH,
        ).next_to(t_exp, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_m), Write(calc_m), run_time=1.2)
        self.play(FadeIn(t_exp), Write(calc_exp), run_time=1.0)
        self.legende(NARRATION["q2b"])
        self.pose(1.5)

        # Étape 6 : Forme algébrique finale
        self.etape("q2b-formes-algebriques")
        t_z1 = Text("Calcul de z₁ :", font_size=18, color=COL_EMPH).next_to(calc_exp, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)

        calc_z1 = MathTex(
            r"z_1 = \sqrt{3}\,e^{i\pi/6} \cdot e^{i\pi/3} = \sqrt{3}\,e^{i\pi/2} = i\sqrt{3}",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(t_z1, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        t_z2 = Text("Calcul de z₂ :", font_size=18, color=COL_EMPH).next_to(calc_z1, DOWN, buff=0.25).to_edge(LEFT, buff=0.8)

        calc_z2 = MathTex(
            r"z_2 = \sqrt{3}\,e^{i\pi/6} \cdot e^{-i\pi/3} = \sqrt{3}\,e^{-i\pi/6} = \sqrt{3}\left(\frac{\sqrt{3}}{2} - \frac{i}{2}\right) = \frac{3}{2} - i\frac{\sqrt{3}}{2}",
            font_size=19,
            color=COL_SUCCESS,
        ).next_to(t_z2, DOWN, buff=0.2).to_edge(LEFT, buff=1.0)

        cadre_z1 = SurroundingRectangle(calc_z1, color=COL_SUCCESS, buff=0.15)
        cadre_z2 = SurroundingRectangle(calc_z2, color=COL_SUCCESS, buff=0.15)

        self.play(FadeIn(t_z1), FadeIn(cadre_z1), Write(calc_z1), run_time=1.0)
        self.play(FadeIn(t_z2), FadeIn(cadre_z2), Write(calc_z2), run_time=1.0)
        self.legende("Formes algébriques de z1 et z2 obtenues avec précision.")
        self.pose(1.5)

    # ── Partie II : Setup Figure ──────────────────────────────────────
    def setup_figure_partie2(self):
        # Repère complexe à droite
        axes = ComplexPlane(
            x_range=[-2.2, 3.2, 1],
            y_range=[-2.2, 2.8, 1],
            x_length=5.6,
            y_length=5.2,
            background_line_style={"stroke_color": BAC_BORDER, "stroke_opacity": 0.5},
        ).to_edge(RIGHT, buff=0.6).shift(DOWN * 0.1)

        # Point O
        pt_o = Dot(axes.c2p(0, 0), color=COL_PT_O, radius=0.07)
        lbl_o = MathTex(r"O", font_size=18, color=COL_PT_O).next_to(pt_o, DL, buff=0.1)

        lbl_re = MathTex(r"\text{Re}", font_size=16, color=BAC_INK_MUTED).next_to(axes.c2p(3.2, 0), DR, buff=0.1)
        lbl_im = MathTex(r"\text{Im}", font_size=16, color=BAC_INK_MUTED).next_to(axes.c2p(0, 2.8), UL, buff=0.1)

        # Canonical witness: m = 2 e^{iπ/6} => a = 2i, b = √3 - i
        # p = -1 + i, r ≈ 0.366 - 1.366i, q ≈ 2.366 + 1.366i
        pt_a = Dot(axes.c2p(0, 2.0), color=COL_PT_A, radius=0.08)
        lbl_a = MathTex(r"A(a)", font_size=18, color=COL_PT_A).next_to(pt_a, UL, buff=0.1)

        pt_b = Dot(axes.c2p(np.sqrt(3), -1.0), color=COL_PT_B, radius=0.08)
        lbl_b = MathTex(r"B(b)", font_size=18, color=COL_PT_B).next_to(pt_b, DR, buff=0.1)

        seg_oa = Line(axes.c2p(0, 0), axes.c2p(0, 2.0), color=COL_PT_A, stroke_width=2.5)
        seg_ob = Line(axes.c2p(0, 0), axes.c2p(np.sqrt(3), -1.0), color=COL_PT_B, stroke_width=2.5)
        seg_ab = DashedLine(axes.c2p(0, 2.0), axes.c2p(np.sqrt(3), -1.0), color=BAC_INK_MUTED, stroke_width=2)

        self.play(
            Create(axes),
            FadeIn(lbl_re),
            FadeIn(lbl_im),
            FadeIn(pt_o),
            FadeIn(lbl_o),
            FadeIn(pt_a),
            FadeIn(lbl_a),
            FadeIn(pt_b),
            FadeIn(lbl_b),
            Create(seg_oa),
            Create(seg_ob),
            Create(seg_ab),
            run_time=1.2,
        )

        # Graduations sur le repère
        grad = self.graduations(axes, [-2, -1, 1, 2, 3], [-2, -1, 1, 2])

        fig = {
            "axes": axes,
            "grad": grad,
            "lbl_re": lbl_re,
            "lbl_im": lbl_im,
            "pt_o": pt_o,
            "lbl_o": lbl_o,
            "pt_a": pt_a,
            "lbl_a": lbl_a,
            "pt_b": pt_b,
            "lbl_b": lbl_b,
            "seg_oa": seg_oa,
            "seg_ob": seg_ob,
            "seg_ab": seg_ab,
        }

        return fig

    # ── Question 3 ────────────────────────────────────────────────────
    def chapitre_q3(self, fig):
        # Étape 7 : Alignement O, A, B
        self.etape("q3-alignement")
        q_head = self.titre_question(3, "0,25 pt", x_pos=LEFT*3.5)
        enonce = self.texte_enonce(
            "Soient a = m e^{iπ/3} et b = m e^{-iπ/3} avec m ∈ ℂ*.\n"
            "Montrer que les points O, A et B ne sont pas alignés."
        )

        t_calc = Text("Calcul du rapport des affixes :", font_size=18, color=COL_EMPH).next_to(enonce, DOWN, buff=0.35).to_edge(LEFT, buff=0.6)

        calc_rap = MathTex(
            r"\frac{b - 0}{a - 0} = \frac{m\,e^{-i\pi/3}}{m\,e^{i\pi/3}} = e^{-i\pi/3 - i\pi/3} = e^{-i\frac{2\pi}{3}}",
            font_size=20,
            color=COL_MATH,
        ).next_to(t_calc, DOWN, buff=0.25).to_edge(LEFT, buff=0.8)

        t_arg = Text("Conclusion géométrique :", font_size=18, color=COL_EMPH).next_to(calc_rap, DOWN, buff=0.35).to_edge(LEFT, buff=0.6)

        calc_arg = MathTex(
            r"\arg\left(\frac{b}{a}\right) \equiv -\frac{2\pi}{3} \not\equiv 0\ [\pi] \implies \frac{b}{a} \notin \mathbb{R}",
            font_size=20,
            color=COL_MATH,
        ).next_to(t_arg, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        res_align = MathTex(
            r"\text{Les points } O,\ A \text{ et } B \text{ forment un triangle non aplati (non alignés)}",
            font_size=17,
            color=COL_SUCCESS,
        ).next_to(calc_arg, DOWN, buff=0.3).to_edge(LEFT, buff=0.8)

        cadre_res = SurroundingRectangle(res_align, color=COL_SUCCESS, buff=0.15, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.8)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_calc), Write(calc_rap), run_time=1.2)
        self.play(FadeIn(t_arg), Write(calc_arg), FadeIn(cadre_res), Write(res_align), run_time=1.2)
        self.legende(NARRATION["q3"])
        self.pose(1.5)

    # ── Question 4a ───────────────────────────────────────────────────
    def chapitre_q4a(self, fig):
        # Étape 8 : Centre d'une rotation d'angle π/2
        self.etape("q4a-formule-rotation")
        q_head = self.titre_question("4.a", "1,0 pt", x_pos=LEFT*3.5)
        enonce = self.texte_enonce(
            "P (resp. R) est le centre de la rotation d'angle π/2 envoyant O sur A (resp. B sur O).\n"
            "Montrer que p = m (√2/2) e^{i 7π/12} et r = m (√2/2) e^{-i 7π/12}."
        )

        t_formule = Text("Formule générale du centre d'une rotation d'angle π/2 :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_form = MathTex(
            r"z' - \omega = e^{i\pi/2}(z - \omega) \iff z' - \omega = i(z - \omega)",
            font_size=19,
            color=COL_MATH,
        ).next_to(t_formule, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_omega = MathTex(
            r"\omega(1 - i) = z' - iz \iff \omega = \frac{z' - iz}{1 - i} = (z' - iz) \cdot \frac{\sqrt{2}}{2} e^{i\pi/4}",
            font_size=19,
            color=COL_MATH,
        ).next_to(calc_form, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_formule), Write(calc_form), run_time=1.0)
        self.play(Write(calc_omega), run_time=1.0)
        self.legende("Formule résolue du centre de rotation d'angle droit.")
        self.pose(1.5)

        # Étape 9 : Affixes de P et R
        self.etape("q4a-affixes-p-r")
        t_p = Text("Pour le centre P (envoie O sur A, donc z=0 et z'=a) :", font_size=17, color=COL_EMPH).next_to(calc_omega, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_p = MathTex(
            r"p = \frac{a - 0}{1-i} = m\,e^{i\pi/3} \cdot \frac{\sqrt{2}}{2} e^{i\pi/4} = m\,\frac{\sqrt{2}}{2}\,e^{i\frac{7\pi}{12}}",
            font_size=19,
            color=COL_PT_P,
        ).next_to(t_p, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        t_r = Text("Pour le centre R (envoie B sur O, donc z=b et z'=0) :", font_size=17, color=COL_EMPH).next_to(calc_p, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_r = MathTex(
            r"r = \frac{0 - ib}{1-i} = -i\,b\,\frac{\sqrt{2}}{2}e^{i\pi/4} = e^{-i\pi/2} m\,e^{-i\pi/3} \frac{\sqrt{2}}{2}e^{i\pi/4} = m\,\frac{\sqrt{2}}{2}\,e^{-i\frac{7\pi}{12}}",
            font_size=18,
            color=COL_PT_R,
        ).next_to(t_r, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        # Tracé des points P et R sur la figure
        axes = fig["axes"]
        pt_p = Dot(axes.c2p(-1.0, 1.0), color=COL_PT_P, radius=0.08)
        lbl_p = MathTex(r"P(p)", font_size=18, color=COL_PT_P).next_to(pt_p, UL, buff=0.1)

        # r = m (√2/2) e^{-i 7π/12} ≈ 0.366 - 1.366 i
        pt_r = Dot(axes.c2p(0.366, -1.366), color=COL_PT_R, radius=0.08)
        lbl_r = MathTex(r"R(r)", font_size=18, color=COL_PT_R).next_to(pt_r, DL, buff=0.1)

        fig["pt_p"] = pt_p
        fig["lbl_p"] = lbl_p
        fig["pt_r"] = pt_r
        fig["lbl_r"] = lbl_r

        self.play(FadeIn(t_p), Write(calc_p), FadeIn(pt_p), FadeIn(lbl_p), run_time=1.1)
        self.play(FadeIn(t_r), Write(calc_r), FadeIn(pt_r), FadeIn(lbl_r), run_time=1.1)
        self.legende(NARRATION["q4a"])
        self.pose(1.5)

    # ── Question 4b ───────────────────────────────────────────────────
    def chapitre_q4b(self, fig):
        # Étape 10 : Centre Q
        self.etape("q4b-centre-q")
        q_head = self.titre_question("4.b", "0,5 pt", x_pos=LEFT*3.5)
        enonce = self.texte_enonce(
            "Q est le centre de la rotation d'angle π/2 envoyant A sur B.\n"
            "Montrer que q = m √2 sin(7π/12)."
        )

        t_calc = Text("Application de la formule au centre Q (z=a et z'=b) :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_q_alg = MathTex(
            r"q = \frac{b - ia}{1-i} \quad \text{avec } a = m\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right),\ b = m\left(\frac{1}{2} - i\frac{\sqrt{3}}{2}\right)",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_calc, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_num = MathTex(
            r"b - ia = m\left[\left(\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) - i\left(\frac{1}{2} + i\frac{\sqrt{3}}{2}\right)\right] = m\,\frac{1+\sqrt{3}}{2}\,(1 - i)",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_q_alg, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_simp = MathTex(
            r"q = \frac{m\,\frac{1+\sqrt{3}}{2}\,(1-i)}{1-i} = m\,\frac{1+\sqrt{3}}{2}",
            font_size=19,
            color=COL_PT_Q,
        ).next_to(calc_num, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_calc), Write(calc_q_alg), run_time=1.0)
        self.play(Write(calc_num), run_time=1.0)
        self.play(Write(calc_simp), run_time=1.0)
        self.legende("Simplification remarquable par (1 - i).")
        self.pose(1.5)

        # Étape 11 : Formule d'addition du sinus
        self.etape("q4b-sinus-addition")
        t_sin = Text("Identification avec √2 sin(7π/12) :", font_size=17, color=COL_EMPH).next_to(calc_simp, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_sin = MathTex(
            r"\sqrt{2}\sin\left(\frac{7\pi}{12}\right) = \sqrt{2}\sin\left(\frac{\pi}{3} + \frac{\pi}{4}\right) = \sqrt{2}\left(\frac{\sqrt{3}}{2}\frac{\sqrt{2}}{2} + \frac{1}{2}\frac{\sqrt{2}}{2}\right) = \frac{1+\sqrt{3}}{2}",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_sin, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        res_q = MathTex(
            r"q = m\,\sqrt{2}\sin\left(\frac{7\pi}{12}\right)",
            font_size=20,
            color=COL_SUCCESS,
        ).next_to(calc_sin, DOWN, buff=0.25).to_edge(LEFT, buff=0.8)

        cadre_q = SurroundingRectangle(res_q, color=COL_SUCCESS, buff=0.15, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.8)

        # Tracé du point Q sur la figure
        axes = fig["axes"]
        # q ≈ 2.366 + 1.366 i
        pt_q = Dot(axes.c2p(2.366, 1.366), color=COL_PT_Q, radius=0.08)
        lbl_q = MathTex(r"Q(q)", font_size=18, color=COL_PT_Q).next_to(pt_q, UR, buff=0.1)

        fig["pt_q"] = pt_q
        fig["lbl_q"] = lbl_q

        self.play(FadeIn(t_sin), Write(calc_sin), run_time=1.0)
        self.play(FadeIn(cadre_q), Write(res_q), FadeIn(pt_q), FadeIn(lbl_q), run_time=1.1)
        self.legende(NARRATION["q4b"])
        self.pose(1.5)

    # ── Question 5 ────────────────────────────────────────────────────
    def chapitre_q5(self, fig):
        # Étape 12 : Différence r - p
        self.etape("q5-calcul-difference")
        q_head = self.titre_question(5, "0,5 pt", x_pos=LEFT*3.5)
        enonce = self.texte_enonce(
            "Montrer que OQ = PR et que les deux droites (OQ) et (PR) sont perpendiculaires."
        )

        t_diff = Text("Calcul du vecteur PR (affixe r - p) :", font_size=17, color=COL_EMPH).next_to(enonce, DOWN, buff=0.3).to_edge(LEFT, buff=0.6)

        calc_diff = MathTex(
            r"r - p = m\,\frac{\sqrt{2}}{2}\left(e^{-i\frac{7\pi}{12}} - e^{i\frac{7\pi}{12}}\right) = -2i\,m\,\frac{\sqrt{2}}{2}\sin\left(\frac{7\pi}{12}\right)",
            font_size=18,
            color=COL_MATH,
        ).next_to(t_diff, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_diff_q = MathTex(
            r"r - p = -i\left[m\sqrt{2}\sin\left(\frac{7\pi}{12}\right)\right] = -i\,q",
            font_size=19,
            color=COL_MATH,
        ).next_to(calc_diff, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        self.play(FadeIn(q_head), FadeIn(enonce), FadeIn(t_diff), Write(calc_diff), run_time=1.0)
        self.play(Write(calc_diff_q), run_time=1.0)
        self.legende("La différence r - p se factorise immédiatement en -i q.")
        self.pose(1.5)

        # Étape 13 : Rapport et conclusion géométrique
        self.etape("q5-rapport-conclusion")
        t_rap = Text("Rapport complexe (affixe de PR / affixe de OQ) :", font_size=17, color=COL_EMPH).next_to(calc_diff_q, DOWN, buff=0.25).to_edge(LEFT, buff=0.6)

        calc_rap = MathTex(
            r"\frac{r - p}{q - 0} = -i",
            font_size=22,
            color=COL_SUCCESS,
        ).next_to(t_rap, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        calc_mod = MathTex(
            r"\left|\frac{r-p}{q}\right| = |-i| = 1 \implies \frac{PR}{OQ} = 1 \implies PR = OQ",
            font_size=18,
            color=COL_MATH,
        ).next_to(calc_rap, DOWN, buff=0.25).to_edge(LEFT, buff=0.8)

        calc_ang = MathTex(
            r"\arg\left(\frac{r-p}{q}\right) \equiv -\frac{\pi}{2}\ [2\pi] \implies (\vec{OQ}, \vec{PR}) \equiv -\frac{\pi}{2}\ [2\pi] \implies (PR) \perp (OQ)",
            font_size=17,
            color=COL_MATH,
        ).next_to(calc_mod, DOWN, buff=0.2).to_edge(LEFT, buff=0.8)

        # Tracé des segments [PR] et [OQ] sur la figure
        axes = fig["axes"]
        seg_pr = Line(axes.c2p(-1.0, 1.0), axes.c2p(0.366, -1.366), color=COL_PT_P, stroke_width=3)
        seg_oq = Line(axes.c2p(0, 0), axes.c2p(2.366, 1.366), color=COL_PT_Q, stroke_width=3)

        fig["seg_pr"] = seg_pr
        fig["seg_oq"] = seg_oq

        self.play(FadeIn(t_rap), Write(calc_rap), Create(seg_pr), Create(seg_oq), run_time=1.1)
        self.play(Write(calc_mod), Write(calc_ang), run_time=1.2)
        self.legende(NARRATION["q5"])
        self.pose(1.5)

    # ── Bilan ─────────────────────────────────────────────────────────
    def chapitre_fin(self, fig):
        self.nettoie_zone_gauche(fig)
        membres = self.fig_membres(fig)
        self.play(FadeOut(membres), run_time=0.6)
        self.etape("bilan")

        titre = Text(
            "Synthèse du Problème — Bac 2020 SN (3,5 points)",
            font_size=24,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=1.0)

        b1 = Text(
            "• Partie I (1,25 pt) : Résolution cubique (z - m)(z² - mz + m²) = 0, Viète, angle moitié",
            font_size=16,
            color=COL_MATH,
        )
        b2 = Text(
            "• Partie II.1 (0,25 pt) : Rapport b/a non réel => O, A, B forment un vrai triangle",
            font_size=16,
            color=COL_MATH,
        )
        b3 = Text(
            "• Partie II.2 (1,50 pt) : Formule du centre de rotation => affixes de P, R et Q",
            font_size=16,
            color=COL_MATH,
        )
        b4 = Text(
            "• Partie II.3 (0,50 pt) : (r - p)/q = -i => PR = OQ et droites (PR) et (OQ) perpendiculaires",
            font_size=16,
            color=COL_MATH,
        )
        score = Text(
            "Score total : 3,5 / 3,5 points — 6 questions traitées avec rigueur",
            font_size=18,
            color=COL_SUCCESS,
            weight="BOLD",
        )

        carte = VGroup(b1, b2, b3, b4, score).arrange(DOWN, buff=0.4, aligned_edge=LEFT).next_to(titre, DOWN, buff=0.6)
        box = SurroundingRectangle(
            VGroup(titre, carte), color=BAC_ACCENT, buff=0.4, fill_color=BAC_SURFACE_RAISED, fill_opacity=0.9
        )

        self.play(FadeIn(box), FadeIn(titre), FadeIn(carte), run_time=1.2)
        self.legende(NARRATION["bilan"])
        self.pose(1.5)
        self.play(FadeOut(box), FadeOut(titre), FadeOut(carte), run_time=0.8)

    # ── Helpers de nettoyage ──────────────────────────────────────────
    def nettoie_partie1(self):
        """Efface les éléments textuels de la partie 1."""
        a_garder = {self._badge_etape, self._legende}
        to_remove = [m for m in self.mobjects if m not in a_garder]
        if to_remove:
            self.play(*[FadeOut(m) for m in to_remove], run_time=0.5)

    def nettoie_zone_gauche(self, fig):
        """Efface tous les textes à gauche en conservant les objets de la figure."""
        membres_fig = set()
        for v in fig.values():
            if isinstance(v, (VGroup, list)):
                for item in v:
                    membres_fig.add(item)
            else:
                membres_fig.add(v)

        a_garder = {self._badge_etape, self._legende}.union(membres_fig)
        to_remove = [m for m in self.mobjects if m not in a_garder]
        if to_remove:
            self.play(*[FadeOut(m) for m in to_remove], run_time=0.5)

    def titre_question(self, num, bareme, x_pos=LEFT*2.0):
        t1 = Text(f"Question {num}", font_size=20, color=COL_TITLE, weight="BOLD")
        t2 = Text(f" — {bareme}", font_size=18, color=BAC_INK_MUTED)
        grp = VGroup(t1, t2).arrange(RIGHT, buff=0.15).to_edge(UP, buff=0.6).shift(x_pos)
        return grp

    def texte_enonce(self, txt):
        return Text(txt, font_size=16, color=BAC_INK_SOFT, line_spacing=1.2).to_edge(UP, buff=1.3).to_edge(LEFT, buff=0.6)
