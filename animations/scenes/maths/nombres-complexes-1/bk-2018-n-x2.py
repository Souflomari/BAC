"""Explication animée v2 — Bac 2018 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2018-n-x2 (vérifiée contre le scan officiel, NS 22F).
L'affixe de A est a = -1/2 + (3/2)i — SANS radical — confirmée par
double re-lecture ; d = -1/2 + (racine de 3 / 2)i porte le radical.

Standard v2 (ADR 0028, amendement 1) : règle du zéro implicite —
chaque geste algébrique est une étape (section Manim), expliquée en
trois temps (quoi, pourquoi, calcul écrit), au rythme calme. Le rendu
`--save_sections` produit un clip par étape pour le lecteur cliquable.

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    Circle,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    ReplacementTransform,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
    PI,
    TAU,
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
)

# Narration par chapitre (doublage ElevenLabs, Phase E3). Les légendes
# à l'écran, étape par étape, servent de transcription fine.
NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-huit, session normale, "
    "sciences expérimentales : nombres complexes, sur trois points. On va "
    "tout faire ensemble, geste par geste, sans rien supposer connu.",
    "q1": "Question un : résoudre une équation du second degré dans "
    "l'ensemble des nombres complexes. On identifie les coefficients, on "
    "calcule le discriminant morceau par morceau, on trouve un delta "
    "négatif, et on écrit les deux racines conjuguées.",
    "plan": "On place les deux racines dans le plan complexe : l'axe "
    "horizontal porte la partie réelle, l'axe vertical la partie "
    "imaginaire.",
    "q2a": "Question deux a : mettre le nombre d sous forme "
    "trigonométrique. Attention à ne pas confondre d, qui porte racine de "
    "trois sur deux, avec l'affixe de A qui porte trois demis. On calcule "
    "le module, on reconnaît l'angle, et d s'écrit e puissance i deux pi "
    "sur trois.",
    "q2b": "Question deux b : une rotation de centre O, c'est une "
    "multiplication de l'affixe par e puissance i thêta. On fait tourner A "
    "d'un angle deux pi sur trois, et l'affixe de l'image B est d fois a.",
    "q3a": "Question trois a : une translation ajoute une constante à "
    "l'affixe. Donc c égale b plus a. On remplace b par d fois a, on met a "
    "en facteur, et on calcule d plus un.",
    "q3b": "Question trois b : le quotient c sur a a pour module un et "
    "pour argument pi sur trois. Module un : les côtés O A et O C sont "
    "égaux. Argument pi sur trois : l'angle en O vaut soixante degrés. Un "
    "triangle isocèle dont l'angle au sommet vaut soixante degrés a ses "
    "trois angles égaux : il est équilatéral.",
}

# Les affixes exactes de l'énoncé.
A_AFF = complex(-0.5, 1.5)                # a = -1/2 + (3/2)i  (SANS radical)
D_AFF = complex(-0.5, np.sqrt(3) / 2)     # d = -1/2 + (√3/2)i (AVEC radical)
B_AFF = D_AFF * A_AFF                     # b = d·a
C_AFF = B_AFF + A_AFF                     # c = b + a

COL_G = {"buff": 0.65}  # marge de la colonne de calcul, bord gauche


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        plan = self.chapitre_plan()
        self.chapitre_q2a(plan)
        a_dot, a_lbl, b_dot, b_lbl = self.chapitre_q2b(plan)
        self.chapitre_q3(plan, a_dot, a_lbl, b_dot, b_lbl)
        self.chapitre_fin()

    # ── Petites aides locales ──────────────────────────────────────
    def colonne(self, *mobjects, haut=2.6, buff=0.42):
        """Empile des lignes de calcul en colonne, bord gauche."""
        bloc = VGroup(*mobjects).arrange(DOWN, aligned_edge=LEFT, buff=buff)
        bloc.to_edge(LEFT, **COL_G)
        bloc.shift((haut - bloc.get_top()[1]) * UP)
        return bloc

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2018 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS 22F",
        )

    # ── Q1 : résoudre 2z² + 2z + 5 = 0, en dix gestes ─────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,75 pt")

        # Étape : lire l'énoncé.
        self.etape("q1-enonce")
        eq = MathTex(r"2z^2 + 2z + 5 = 0", font_size=52).shift(1.7 * UP)
        self.play(Write(eq, run_time=1.6))
        self.legende(
            "On doit résoudre cette équation dans l'ensemble des nombres",
            "complexes : les solutions ont le droit de ne pas être réelles.",
        )
        self.pose(2.8)

        # Étape : reconnaître la forme et nommer les coefficients.
        self.etape("q1-coefficients")
        forme = MathTex(
            r"a\,z^2 + b\,z + c = 0", font_size=40, color=BAC_INK_SOFT
        ).next_to(eq, UP, buff=0.55)
        self.play(FadeIn(forme, shift=0.2 * DOWN))
        coefs = MathTex(
            r"a = 2", r"\qquad b = 2", r"\qquad c = 5", font_size=44
        ).next_to(eq, DOWN, buff=0.75)
        coefs.set_color(BAC_ACCENT_STRONG)
        self.play(Write(coefs, run_time=1.6))
        self.legende(
            "C'est une équation du second degré. On commence toujours pareil :",
            "on nomme les trois coefficients. Ici a = 2, b = 2 et c = 5.",
        )
        self.pose(3.0)

        # Étape : l'outil — le discriminant.
        self.etape("q1-outil-discriminant")
        delta_def = MathTex(r"\Delta = b^2 - 4ac", font_size=46).next_to(
            coefs, DOWN, buff=0.75
        )
        cadre = SurroundingRectangle(delta_def, color=BAC_ACCENT, buff=0.22, corner_radius=0.1)
        self.play(Write(delta_def), Create(cadre))
        self.legende(
            "L'outil : le discriminant. C'est son signe qui décide",
            "du type de solutions. On le calcule morceau par morceau.",
        )
        self.pose(3.0)
        self.play(FadeOut(forme), FadeOut(cadre))

        # Étape : b².
        self.etape("q1-calcul-b2")
        c1 = MathTex(r"b^2 = 2^2 = 4", font_size=42)
        bloc = self.colonne(c1, haut=0.1)
        self.play(FadeOut(delta_def), FadeOut(coefs), Write(c1))
        self.legende("D'abord b au carré : 2 au carré, c'est 2 fois 2, donc 4.")
        self.pose(2.6)

        # Étape : 4ac.
        self.etape("q1-calcul-4ac")
        c2 = MathTex(r"4ac = 4 \times 2 \times 5 = 40", font_size=42)
        c2.next_to(c1, DOWN, aligned_edge=LEFT, buff=0.42)
        self.play(Write(c2))
        self.legende(
            "Puis 4 a c : 4 fois 2, ça fait 8, et 8 fois 5, ça fait 40."
        )
        self.pose(2.6)

        # Étape : Δ.
        self.etape("q1-calcul-delta")
        c3 = MathTex(r"\Delta = 4 - 40 = -36", font_size=46, color=BAC_ACCENT_STRONG)
        c3.next_to(c2, DOWN, aligned_edge=LEFT, buff=0.42)
        self.play(Write(c3))
        self.legende(
            "Donc delta = 4 moins 40 = moins 36. Delta est strictement négatif."
        )
        self.pose(2.8)

        # Étape : que faire d'un Δ négatif ?
        self.etape("q1-delta-negatif")
        c4 = MathTex(
            r"-36 = 36\times(-1) = (6i)^2", font_size=42
        ).next_to(c3, DOWN, aligned_edge=LEFT, buff=0.42)
        rappel_i = MathTex(r"i^2 = -1", font_size=36, color=BAC_INK_SOFT).next_to(
            c4, RIGHT, buff=0.8
        )
        self.play(Write(c4), FadeIn(rappel_i))
        self.legende(
            "Delta négatif : pas de racine réelle, mais dans les complexes on",
            "continue. Moins 36, c'est (6i) au carré, puisque i au carré = −1.",
        )
        self.pose(3.2)

        # Étape : la formule des racines.
        self.etape("q1-formule")
        self.play(FadeOut(VGroup(c1, c2, rappel_i)))
        formule = MathTex(
            r"z = \dfrac{-b \pm 6i}{2a} = \dfrac{-2 \pm 6i}{4}", font_size=44
        )
        grp = VGroup(c3.copy(), c4.copy(), formule).arrange(
            DOWN, aligned_edge=LEFT, buff=0.42
        ).to_edge(LEFT, **COL_G).shift(1.2 * UP)
        self.play(
            ReplacementTransform(VGroup(c3, c4), VGroup(grp[0], grp[1])),
            Write(formule),
        )
        self.legende(
            "La formule du second degré : moins b plus-ou-moins « racine de",
            "delta », le tout sur 2a. Ici : (−2 ± 6i) sur 4.",
        )
        self.pose(3.2)

        # Étape : simplifier chaque fraction.
        self.etape("q1-simplifier")
        simp = MathTex(
            r"\dfrac{-2}{4} = -\dfrac12", r"\qquad \dfrac{6}{4} = \dfrac32",
            font_size=42, color=BAC_ACCENT_STRONG,
        ).next_to(grp, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(simp))
        self.legende(
            "On simplifie chaque morceau : −2/4 = −1/2, et 6/4 = 3/2.",
            "Rien ne reste implicite : chaque fraction est réduite.",
        )
        self.pose(2.8)

        # Étape : les deux solutions.
        self.etape("q1-solutions")
        sols = MathTex(
            r"S = \left\{\,-\dfrac12 - \dfrac32\,i\ ;\ -\dfrac12 + \dfrac32\,i\,\right\}",
            font_size=46, color=BAC_ACCENT,
        ).next_to(simp, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(sols, run_time=1.8))
        self.legende(
            "Les deux solutions sont conjuguées : même partie réelle,",
            "parties imaginaires opposées. La question 1 vaut 0,75 point.",
        )
        self.pose(3.0)

        # Étape : retenir la bonne racine pour la suite.
        self.etape("q1-retenir")
        z1_box = SurroundingRectangle(
            sols[0][-9:-1], color=BAC_WARNING, buff=0.12, corner_radius=0.08
        )
        self.play(Create(z1_box))
        self.legende(
            "Retiens la racine à partie imaginaire POSITIVE : −1/2 + (3/2)i.",
            "C'est elle qui devient l'affixe du point A à la question 2.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, eq, grp, simp, sols, z1_box)))

    # ── Le plan complexe, construit lentement ─────────────────────
    def chapitre_plan(self):
        # Étape : construire le plan.
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-2.4, 1.8, 1],
            y_range=[-1.9, 2.3, 1],
            x_length=5.6,
            y_length=5.6,
            background_line_style={
                "stroke_color": BAC_BORDER,
                "stroke_width": 1,
                "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED,
                "stroke_width": 2,
                "include_ticks": False,
                "include_tip": False,
            },
        ).shift(3.15 * RIGHT + 0.55 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(1.75), DOWN, buff=0.18
        )
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.2j), LEFT, buff=0.18
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self.legende(
            "Plaçons ces nombres dans le plan complexe : l'axe horizontal",
            "porte la partie réelle, l'axe vertical la partie imaginaire.",
        )
        self.pose(3.0)

        # Étape : placer z₁, coordonnée par coordonnée.
        self.etape("plan-z1")
        guide_x = DashedLine(plan.n2p(0), plan.n2p(-0.5), color=BAC_WARNING, stroke_width=3)
        guide_y = DashedLine(plan.n2p(-0.5), plan.n2p(A_AFF), color=BAC_WARNING, stroke_width=3)
        z1 = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.075)
        z1_lbl = MathTex(r"z_1", font_size=32, color=BAC_ACCENT).next_to(z1, UP + RIGHT, buff=0.1)
        self.play(Create(guide_x))
        self.play(Create(guide_y))
        self.play(FadeIn(z1), Write(z1_lbl))
        self.legende(
            "Pour z₁ = −1/2 + (3/2)i : un demi vers la GAUCHE (partie réelle",
            "négative), puis un et demi vers le HAUT (partie imaginaire).",
        )
        self.pose(3.2)
        self.play(FadeOut(guide_x), FadeOut(guide_y))

        # Étape : placer z₂ par symétrie.
        self.etape("plan-z2")
        z2 = Dot(plan.n2p(A_AFF.conjugate()), color=BAC_INK_MUTED, radius=0.065)
        z2_lbl = MathTex(r"z_2", font_size=32, color=BAC_INK_MUTED).next_to(
            z2, DOWN + RIGHT, buff=0.1
        )
        sym = DashedLine(plan.n2p(A_AFF), plan.n2p(A_AFF.conjugate()),
                         color=BAC_INK_MUTED, stroke_width=2)
        self.play(FadeIn(z2), Write(z2_lbl), Create(sym))
        self.legende(
            "z₂ est le conjugué de z₁ : même partie réelle, partie imaginaire",
            "opposée — donc le symétrique de z₁ par rapport à l'axe réel.",
        )
        self.pose(3.0)
        self.play(FadeOut(sym), FadeOut(VGroup(re_lbl, im_lbl)))
        self.efface_legende()
        return plan

    # ── Q2a : d en forme trigonométrique, sans rien sauter ────────
    def chapitre_q2a(self, plan):
        badge = self.bandeau_question("2) a)", "0,25 pt")

        # Étape : lire l'énoncé + LA mise en garde.
        self.etape("q2a-enonce")
        d_def = MathTex(
            r"d = -\dfrac{1}{2} + \dfrac{\sqrt{3}}{2}\,i", font_size=44
        )
        a_def = MathTex(
            r"a = -\dfrac{1}{2} + \dfrac{3}{2}\,i", font_size=36, color=BAC_INK_SOFT
        )
        garde = Text("≠ deux nombres différents !", font_size=22, color=BAC_ERROR)
        bloc = self.colonne(d_def, a_def, garde, haut=2.5)
        self.play(Write(d_def))
        self.play(FadeIn(a_def), FadeIn(garde))
        self.legende(
            "On veut la forme trigonométrique de d. Attention au piège de",
            "lecture : d porte RACINE DE 3 sur 2 ; l'affixe a porte 3/2, sans",
            "radical. Deux nombres différents — ne les confonds jamais.",
        )
        self.pose(3.6)
        self.play(FadeOut(a_def), FadeOut(garde))

        # Étape : le module, carré par carré.
        self.etape("q2a-module")
        m1 = MathTex(
            r"|d| = \sqrt{\left(-\tfrac12\right)^2 + \left(\tfrac{\sqrt3}{2}\right)^2}",
            font_size=40,
        )
        m2 = MathTex(
            r"= \sqrt{\tfrac14 + \tfrac34} = \sqrt{1} = 1", font_size=40,
            color=BAC_ACCENT_STRONG,
        )
        bloc2 = self.colonne(d_def.copy(), m1, m2, haut=2.5)
        self.play(ReplacementTransform(d_def, bloc2[0]), Write(m1))
        self.play(Write(m2))
        self.legende(
            "Le module : racine de la somme des deux carrés. (−1/2)² = 1/4,",
            "(√3/2)² = 3/4. Somme : 1/4 + 3/4 = 1. Racine de 1 = 1.",
        )
        self.pose(3.4)

        # Étape : l'argument, par les valeurs remarquables.
        self.etape("q2a-argument")
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))
        cercle = Circle(radius=r_unit, color=BAC_INK_MUTED, stroke_width=1.5).move_to(plan.n2p(0))
        d_dot = Dot(plan.n2p(D_AFF), color=BAC_ACCENT_STRONG, radius=0.07)
        d_lbl = MathTex("d", font_size=34, color=BAC_ACCENT_STRONG).next_to(d_dot, UP + LEFT, buff=0.1)
        arg = MathTex(
            r"\cos\theta = -\tfrac12,\ \ \sin\theta = \tfrac{\sqrt3}{2}"
            r"\ \Longrightarrow\ \theta = \dfrac{2\pi}{3}",
            font_size=38,
        ).next_to(bloc2, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Create(cercle), FadeIn(d_dot), Write(d_lbl))
        self.play(Write(arg))
        self.legende(
            "Comme |d| = 1, d est SUR le cercle unité. Son angle θ vérifie",
            "cos θ = −1/2 et sin θ = √3/2 : c'est la valeur remarquable 2π/3.",
        )
        self.pose(3.4)

        # Étape : conclusion de 2)a).
        self.etape("q2a-conclusion")
        concl = MathTex(
            r"d = \cos\dfrac{2\pi}{3} + i\,\sin\dfrac{2\pi}{3} = e^{i\frac{2\pi}{3}}",
            font_size=44, color=BAC_ACCENT_STRONG,
        ).next_to(arg, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(concl))
        self.legende(
            "La forme trigonométrique demandée — et son écriture",
            "exponentielle. Garde-la : c'est l'opérateur de la rotation.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, bloc2, m1, m2, arg, concl)))

    # ── Q2b : la rotation, geste par geste ────────────────────────
    def chapitre_q2b(self, plan):
        badge = self.bandeau_question("2) b)", "0,5 pt")

        # Étape : lire l'énoncé, placer A.
        self.etape("q2b-placer-A")
        a_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT, radius=0.08)
        a_lbl = MathTex(r"A(a)", font_size=34, color=BAC_ACCENT).next_to(
            a_dot, UP + RIGHT, buff=0.1
        )
        rappel = MathTex(
            r"a = -\dfrac12 + \dfrac32\,i = z_1", font_size=42
        )
        bloc = self.colonne(rappel, haut=2.3)
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl), Write(rappel))
        self.legende(
            "Le point A a pour affixe a = −1/2 + (3/2)i : EXACTEMENT la racine",
            "z₁ gardée à la question 1. L'exercice se tient — rien n'est gratuit.",
        )
        self.pose(3.2)

        # Étape : l'outil — rotation = multiplication par e^{iθ}.
        self.etape("q2b-outil-rotation")
        outil = MathTex(
            r"\text{rotation}(O,\theta):\ z \longmapsto e^{i\theta}\, z",
            font_size=40,
        ).next_to(bloc, DOWN, aligned_edge=LEFT, buff=0.55)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        self.play(Write(outil), Create(cadre))
        self.legende(
            "L'outil du cours : une rotation de centre O et d'angle θ",
            "multiplie l'affixe par e^{iθ}. Module 1 : la distance à O est",
            "conservée ; et l'angle augmente de θ. C'est toute la rotation.",
        )
        self.pose(3.6)

        # Étape : faire tourner A, lentement.
        self.etape("q2b-tourner")
        origine = plan.n2p(0)
        rayon = float(np.linalg.norm(plan.n2p(A_AFF) - origine))
        angle_a = float(np.angle(A_AFF))
        arc = Arc(
            radius=rayon, start_angle=angle_a, angle=TAU / 3,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        b_dot = Dot(plan.n2p(A_AFF), color=BAC_ACCENT_STRONG, radius=0.08)
        self.play(Create(arc, run_time=3.6), MoveAlongPath(b_dot, arc, run_time=3.6))
        b_lbl = MathTex(r"B(b)", font_size=34, color=BAC_ACCENT_STRONG).next_to(
            b_dot, DOWN + LEFT, buff=0.1
        )
        self.play(Write(b_lbl))
        self.legende(
            "On fait tourner A autour de O, d'un angle 2π/3 (un tiers de",
            "tour), SANS changer sa distance à O. Le point d'arrivée est B.",
        )
        self.pose(3.0)

        # Étape : conclure b = d·a.
        self.etape("q2b-conclusion")
        concl = MathTex(
            r"b = e^{i\frac{2\pi}{3}}\cdot a = d\cdot a",
            font_size=46, color=BAC_ACCENT_STRONG,
        ).next_to(outil, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(concl))
        self.legende(
            "Donc b = e^{i2π/3} × a. Et e^{i2π/3}, on vient de montrer en 2)a)",
            "que c'est d. Conclusion : b = d·a. C'est exactement ce qui était demandé.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, bloc, outil, cadre, concl, arc)))
        return a_dot, a_lbl, b_dot, b_lbl

    # ── Q3 : translation puis triangle équilatéral ────────────────
    def chapitre_q3(self, plan, a_dot, a_lbl, b_dot, b_lbl):
        badge = self.bandeau_question("3) a)", "0,75 pt")
        origine = plan.n2p(0)

        # Étape : l'outil — translation = addition d'affixe.
        self.etape("q3a-outil-translation")
        outil = MathTex(
            r"t_{\overrightarrow{OA}}:\ z \longmapsto z + a", font_size=40
        )
        bloc = self.colonne(outil, haut=2.3)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        vec = Line(origine, plan.n2p(A_AFF), color=BAC_ACCENT, stroke_width=3).add_tip(
            tip_width=0.16, tip_length=0.16
        )
        self.play(Write(outil), Create(cadre), Create(vec))
        self.legende(
            "Nouvel outil : la translation de vecteur OA. Translater par OA,",
            "c'est AJOUTER l'affixe a. Une rotation multiplie ; une",
            "translation additionne. Deux gestes, deux opérations.",
        )
        self.pose(3.6)

        # Étape : translater B, obtenir C, écrire c = b + a.
        self.etape("q3a-translater")
        c_dot = Dot(plan.n2p(B_AFF), color=BAC_SUCCESS, radius=0.08)
        self.add(c_dot)
        self.play(c_dot.animate.move_to(plan.n2p(C_AFF)), run_time=2.4)
        c_lbl = MathTex(r"C(c)", font_size=34, color=BAC_SUCCESS).next_to(
            c_dot, UP + LEFT, buff=0.1
        )
        e1 = MathTex(r"c = b + a", font_size=44).next_to(bloc, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(c_lbl), Write(e1))
        self.legende(
            "C est l'image de B par cette translation : son affixe est",
            "c = b + a. C'est la définition, appliquée — rien de plus.",
        )
        self.pose(3.0)

        # Étape : substituer b = d·a.
        self.etape("q3a-substituer")
        e2 = MathTex(r"c = d\,a + a", font_size=44).next_to(e1, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(e2))
        self.legende(
            "On remplace b par ce qu'on vient de démontrer : b = d·a.",
            "Donc c = d·a + a. Toujours réutiliser les questions précédentes.",
        )
        self.pose(2.8)

        # Étape : factoriser par a.
        self.etape("q3a-factoriser")
        e3 = MathTex(r"c = a\,(d + 1)", font_size=44, color=BAC_ACCENT_STRONG).next_to(
            e2, DOWN, aligned_edge=LEFT, buff=0.45
        )
        self.play(Write(e3))
        self.legende(
            "a est en facteur commun dans d·a + a : on le sort.",
            "c = a(d + 1). La factorisation, c'est l'astuce clé de la question.",
        )
        self.pose(2.8)

        # Étape : calculer d + 1.
        self.etape("q3a-calculer-d-plus-1")
        e4 = MathTex(
            r"d+1 = \left(-\tfrac12 + 1\right) + \tfrac{\sqrt3}{2}\,i"
            r" = \tfrac12 + \tfrac{\sqrt3}{2}\,i",
            font_size=40,
        ).next_to(e3, DOWN, aligned_edge=LEFT, buff=0.45)
        e5 = MathTex(
            r"c = a\left(\tfrac12 + \tfrac{\sqrt3}{2}\,i\right)",
            font_size=44, color=BAC_ACCENT,
        ).next_to(e4, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(e4))
        self.play(Write(e5))
        self.legende(
            "d + 1, calculé sur la partie réelle seulement : −1/2 + 1 = 1/2 ;",
            "la partie imaginaire ne bouge pas. On obtient la forme demandée.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, bloc, cadre, e1, e2, e3, e4, e5, vec)))

        # ---- 3) b) ----
        badge = self.bandeau_question("3) b)", "0,75 pt")

        # Étape : le quotient c/a.
        self.etape("q3b-quotient")
        q1 = MathTex(
            r"\dfrac{c}{a} = d + 1 = \tfrac12 + \tfrac{\sqrt3}{2}\,i",
            font_size=42,
        )
        bloc = self.colonne(q1, haut=2.3)
        self.play(Write(q1))
        self.legende(
            "On étudie le quotient c/a (a n'est pas nul, on a le droit).",
            "D'après 3)a), c = a(d+1), donc c/a = d + 1 = 1/2 + (√3/2)i.",
        )
        self.pose(3.0)

        # Étape : module du quotient → OC = OA.
        self.etape("q3b-module")
        q2 = MathTex(
            r"\left|\dfrac{c}{a}\right| = \sqrt{\tfrac14+\tfrac34} = 1"
            r"\ \Longrightarrow\ OC = OA",
            font_size=40,
        ).next_to(q1, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(q2))
        self.legende(
            "Module : 1/4 + 3/4 = 1, racine 1 = 1. Or |c/a| = OC/OA.",
            "Un quotient de module 1 : OC = OA. Le triangle est isocèle en O.",
        )
        self.pose(3.2)

        # Étape : argument du quotient → angle 60°.
        self.etape("q3b-argument")
        q3 = MathTex(
            r"\arg\dfrac{c}{a} = \dfrac{\pi}{3}"
            r"\ \Longrightarrow\ \widehat{AOC} = 60^\circ",
            font_size=40,
        ).next_to(q2, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(q3))
        self.legende(
            "Argument : cos = 1/2 et sin = √3/2, c'est π/3. Or arg(c/a) est",
            "l'angle entre OA et OC : l'angle en O vaut donc 60 degrés.",
        )
        self.pose(3.2)

        # Étape : tracer le triangle et conclure.
        self.etape("q3b-triangle")
        oa = Line(origine, plan.n2p(A_AFF), color=BAC_INK, stroke_width=3)
        oc = Line(origine, plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        ac = Line(plan.n2p(A_AFF), plan.n2p(C_AFF), color=BAC_INK, stroke_width=3)
        ang = Angle(oc, oa, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        ang_lbl = MathTex(r"60^\circ", font_size=28, color=BAC_ACCENT).next_to(
            ang, UP + LEFT, buff=0.06
        )
        self.play(Create(oa), Create(oc), Create(ac))
        self.play(Create(ang), FadeIn(ang_lbl))
        concl = MathTex(
            r"\text{isocèle} + 60^\circ\ \text{au sommet}"
            r"\ \Longrightarrow\ OAC\ \text{équilatéral}",
            font_size=40, color=BAC_SUCCESS,
        ).next_to(q3, DOWN, aligned_edge=LEFT, buff=0.5)
        self.play(Write(concl))
        triangle = VGroup(oa, oc, ac)
        self.play(triangle.animate.set_color(BAC_SUCCESS), run_time=1.0)
        self.legende(
            "Isocèle en O avec un angle au sommet de 60° : les deux angles de",
            "la base valent (180 − 60)/2 = 60° chacun. Trois angles de 60° :",
            "le triangle OAC est équilatéral. Démonstration terminée.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Second degré dans ℂ : Δ < 0 → racines conjuguées, √Δ avec i.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Rotation de centre O et d'angle θ : on MULTIPLIE par e^(iθ).",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• Translation de vecteur OA : on ADDITIONNE l'affixe a.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("• |c/a| = 1 et arg(c/a) = π/3 : isocèle + 60° = équilatéral.",
                 font_size=26, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=24, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
