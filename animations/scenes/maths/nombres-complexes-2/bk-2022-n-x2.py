# scene_class: Explication
# bank_entry: bk-2022-n-x2
# title: Équation avec la racine cubique de l'unité, transformation et triangle équilatéral
# notion: nombres-complexes-2
# session: 2022-normale-sm
# bareme: 3.5 points

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Axes,
    ComplexPlane,
    Circle,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    Polygon,
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

# ── Palette sémantique ────────────────────────────────────────────────
COL_TITLE = BAC_ACCENT_STRONG
COL_MATH = BAC_INK
COL_EMPH = BAC_ACCENT
COL_WARN = BAC_ERROR
COL_SUCCESS = BAC_SUCCESS
COL_POINT_P = "#16a34a"  # vert émeraude
COL_POINT_Q = "#9333ea"  # violet
COL_POINT_R = "#ea580c"  # orange vif
COL_TRIANGLE = BAC_ACCENT

# ── Textes narratifs ──────────────────────────────────────────────────
NARRATION = {
    "titre": "Baccalauréat National 2022, Session Normale, Sciences Mathématiques. Exercice deux : racine cubique de l'unité, rotation et triangle équilatéral.",
    "intro": "L'exercice comprend deux parties : la résolution d'une équation quadratique faisant intervenir j, puis l'étude géométrique d'un triangle équilatéral construit par une rotation.",
    "q1": "Question 1 : Vérification que j au cube vaut 1 et que 1 plus j plus j carré est nul.",
    "q2a": "Question 2a : Calcul du discriminant Delta de l'équation Em et factorisation sous forme d'un carré parfait.",
    "q2b": "Question 2b : Résolution de l'équation donnant pour solutions m et m j.",
    "q3": "Question 3 : Pour m égal 1 plus i, calcul de la somme des racines à la puissance 2022 montrant que le résultat est un imaginaire pur.",
    "q4": "Question 1 de la partie deux : Nature et éléments caractéristiques de la transformation phi, qui est une rotation de centre O et d'angle pi sur 3.",
    "q5": "Question 2a de la partie deux : Calcul des affixes des images A prime, B prime et C prime par la rotation phi.",
    "q6a": "Question 2b de la partie deux : Détermination des affixes des trois milieux P, Q et R.",
    "q6b": "Question 2b suite : Preuve par télescopage de la relation fondamentale p plus q j plus r j carré égal 0.",
    "q7a": "Question 2c de la partie deux : Factorisation de la relation en rapport de nombres complexes au sommet R.",
    "q7b": "Question 2c suite : Conclusion géométrique montrant que le triangle PQR est équilatéral direct.",
    "bilan": "Synthèse complète de l'exercice : propriétés algébriques de j, rotations et triangles équilatéraux.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Partie I : Équation (E_m) ─────────────────────────────────
        self.chapitre_q1()
        self.chapitre_q2a()
        self.chapitre_q2b()
        self.chapitre_q3()

        # ── Partie II : Transformation et triangle PQR ───────────────
        self.chapitre_q4()
        self.chapitre_q5()
        self.chapitre_q6a()
        self.chapitre_q6b()
        self.chapitre_q7a()
        fig = self.chapitre_q7b()

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin(fig)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2022 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        )
        soustitre = Text(
            "Exercice 2 : Racines cubiques de l'unité, rotation et triangle équilatéral",
            font_size=20,
            color=COL_MATH,
        )
        badge = Text("3,5 points", font_size=16, color=COL_EMPH)
        grp = VGroup(titre, soustitre, badge).arrange(DOWN, buff=0.25)
        grp.move_to(ORIGIN)

        narration = Text(NARRATION["titre"], font_size=13, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(FadeIn(grp, shift=UP * 0.3), FadeIn(narration))
        self.pose(1.5)
        self.play(FadeOut(grp), FadeOut(narration))

    # ── Introduction ──────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro")
        self.titre_zone = Text(
            "Plan de résolution · Nombres Complexes",
            font_size=22,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        items = [
            "1. Partie I : Racine j = e^{i 2pi/3}, équation (E_m) et puissance 2022-ième",
            "2. Partie II : Transformation phi : z' = (1+j)z = e^{i pi/3}z (rotation)",
            "3. Milieux P, Q, R et relation fondamentale : p + q j + r j^2 = 0",
            "4. Rapport (p-r)/(q-r) = -j = e^{-i pi/3} => Triangle PQR équilatéral",
        ]
        vg = VGroup(*[Text(it, font_size=16, color=COL_MATH) for it in items])
        vg.arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        vg.next_to(self.titre_zone, DOWN, buff=0.4, aligned_edge=LEFT)

        narration = Text(NARRATION["intro"], font_size=13, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(vg, shift=DOWN * 0.2), FadeIn(narration))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(vg), FadeOut(narration))

    # ── Partie I : Question 1 (j^3 = 1 et 1 + j + j^2 = 0) ─────────────
    def chapitre_q1(self):
        self.etape("03-q1-cubique")
        self.titre_zone = Text(
            "Question 1 — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Soit j = -1/2 + i sqrt(3)/2 = e^{i 2pi/3}. Vérifier que j^3 = 1 et 1 + j + j^2 = 0.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"j^3 = \left(e^{i\frac{2\pi}{3}}\right)^3 = e^{i 2\pi} = 1",
            font_size=24,
            color=COL_TITLE,
        )
        eq2 = MathTex(
            r"j^2 = e^{i\frac{4\pi}{3}} = -\frac{1}{2} - i\frac{\sqrt{3}}{2}",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"1 + j + j^2 = 1 + \left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) + \left(-\frac{1}{2} - i\frac{\sqrt{3}}{2}\right) = 0",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.35, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q1"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie I : Question 2.a (Discriminant Delta) ───────────────────
    def chapitre_q2a(self):
        self.etape("04-q2a-discriminant")
        self.titre_zone = Text(
            "Question 2.a — 0,25 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Équation (E_m) : z^2 + m j^2 z + m^2 j = 0. Montrer que Delta = (m(1 - j))^2.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"\Delta = b^2 - 4ac = (m j^2)^2 - 4(1)(m^2 j) = m^2 j^4 - 4 m^2 j",
            font_size=23,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\text{Comme } j^4 = j^3 \times j = j \implies \Delta = m^2(j - 4j) = -3 m^2 j",
            font_size=23,
            color=COL_TITLE,
        )
        eq3 = MathTex(
            r"\text{Or } (1 - j)^2 = 1 - 2j + j^2 = (1 + j^2) - 2j = -j - 2j = -3j",
            font_size=23,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\Delta = m^2(-3j) = m^2(1 - j)^2 = \big(m(1 - j)\big)^2",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.28, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q2a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3))
        self.pose(0.4)
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie I : Question 2.b (Solutions z1 et z2) ───────────────────
    def chapitre_q2b(self):
        self.etape("05-q2b-solutions")
        self.titre_zone = Text(
            "Question 2.b — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Déterminer z_1 et z_2 les deux solutions de l'équation (E_m).",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"z = \frac{-b \pm \delta}{2a} = \frac{-m j^2 \pm m(1 - j)}{2}",
            font_size=23,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"z_1 = \frac{m(-j^2 + 1 - j)}{2} = \frac{m(1 - (j + j^2))}{2} = \frac{m(1 - (-1))}{2} = m",
            font_size=23,
            color=COL_TITLE,
        )
        eq3 = MathTex(
            r"z_2 = \frac{m(-j^2 - 1 + j)}{2} = \frac{m(j - 1 - (-1 - j))}{2} = \frac{m(2j)}{2} = m j",
            font_size=23,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\mathcal{S} = \big\{ m, \; m j \big\} \quad (\text{contrôle Viète : } z_1 + z_2 = -mj^2, \; z_1 z_2 = m^2 j)",
            font_size=23,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.28, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q2b"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3))
        self.pose(0.4)
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie I : Question 3 (Puissance 2022-ième) ────────────────────
    def chapitre_q3(self):
        self.etape("06-q3-puissance-somme")
        self.titre_zone = Text(
            "Question 3 — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Pour m = 1 + i, montrer que (z_1 + z_2)^{2022} est un imaginaire pur.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"z_1 + z_2 = m(1 + j) = -m j^2 = -\big(\sqrt{2} e^{i\frac{\pi}{4}}\big) e^{i\frac{4\pi}{3}} = \sqrt{2} e^{i\pi} e^{i\frac{\pi}{4}} e^{i\frac{4\pi}{3}} = \sqrt{2} e^{i\frac{7\pi}{12}}",
            font_size=21,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"(z_1 + z_2)^{2022} = \big(\sqrt{2}\big)^{2022} e^{i \times 2022 \times \frac{7\pi}{12}} = 2^{1011} e^{i \frac{14154\pi}{12}}",
            font_size=22,
            color=COL_TITLE,
        )
        eq3 = MathTex(
            r"14154 = 589 \times 24 + 18 \implies 2022 \times \frac{7\pi}{12} \equiv \frac{18\pi}{12} = \frac{3\pi}{2} \; [2\pi]",
            font_size=22,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"(z_1 + z_2)^{2022} = 2^{1011} e^{i\frac{3\pi}{2}} = -2^{1011} i \in i\mathbb{R}^* \quad (\text{imaginaire pur})",
            font_size=23,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.26, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q3"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3))
        self.pose(0.4)
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 1 (Nature de phi) ─────────────────────────
    def chapitre_q4(self):
        self.etape("07-q4-nature-phi")
        self.titre_zone = Text(
            "Partie II — Question 1 — 0,25 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Transformation phi : M(z) |-> M'(z') avec z' = (1 + j)z. Déterminer sa nature et ses éléments.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"1 + j = 1 + \left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = \frac{1}{2} + i\frac{\sqrt{3}}{2} = e^{i\frac{\pi}{3}}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"|1 + j| = 1 \quad \text{et} \quad \arg(1 + j) \equiv \frac{\pi}{3} \; [2\pi]",
            font_size=24,
            color=COL_TITLE,
        )
        eq3 = MathTex(
            r"z' - 0 = e^{i\frac{\pi}{3}}(z - 0) \iff \varphi = \mathcal{R}\left(O, \; \frac{\pi}{3}\right) \quad (\text{Rotation de centre } O \text{ et d'angle } \frac{\pi}{3})",
            font_size=23,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.32, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q4"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 2.a (Images A', B', C') ───────────────────
    def chapitre_q5(self):
        self.etape("08-q5-images-abc")
        self.titre_zone = Text(
            "Partie II — Question 2.a — 0,75 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "A(m), B(mj), C(mj^2). Images par phi : A'(a'), B'(b'), C'(c'). Montrer a' = -m j^2, b' = -m, c' = -m j.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq_rem = MathTex(
            r"1 + j + j^2 = 0 \iff 1 + j = -j^2",
            font_size=23,
            color=COL_WARN,
        )
        eq1 = MathTex(
            r"a' = (1 + j)m = (-j^2)m = -m j^2",
            font_size=24,
            color=COL_TITLE,
        )
        eq2 = MathTex(
            r"b' = (1 + j)(mj) = (-j^2)(mj) = -m j^3 = -m \quad (\text{car } j^3 = 1)",
            font_size=24,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"c' = (1 + j)(mj^2) = (-j^2)(mj^2) = -m j^4 = -m j \quad (\text{car } j^4 = j)",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq_rem, eq1, eq2, eq3).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.28, aligned_edge=LEFT)
        cadre = SurroundingRectangle(VGroup(eq1, eq2, eq3), color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q5"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq_rem))
        self.pose(0.4)
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 2.b (Milieux P, Q, R) ─────────────────────
    def chapitre_q6a(self):
        self.etape("09-q6-milieux-formules")
        self.titre_zone = Text(
            "Partie II — Question 2.b — 0,25 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Milieux P, Q, R de [BA'], [CB'], [AC']. Écrire leurs affixes en fonction de m et j.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"p = \frac{b + a'}{2} = \frac{mj + (-mj^2)}{2} = \frac{m(j - j^2)}{2}",
            font_size=24,
            color=COL_POINT_P,
        )
        eq2 = MathTex(
            r"q = \frac{c + b'}{2} = \frac{mj^2 + (-m)}{2} = \frac{m(j^2 - 1)}{2}",
            font_size=24,
            color=COL_POINT_Q,
        )
        eq3 = MathTex(
            r"r = \frac{a + c'}{2} = \frac{m + (-mj)}{2} = \frac{m(1 - j)}{2}",
            font_size=24,
            color=COL_POINT_R,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)
        cadre = SurroundingRectangle(grp, color=BAC_BORDER, buff=0.12)

        narration = Text(NARRATION["q6a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 2.b (Relation p + qj + rj^2 = 0) ──────────
    def chapitre_q6b(self):
        self.etape("10-q6-relation-pqr")
        self.titre_zone = Text(
            "Partie II — Question 2.b (suite)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer la relation fondamentale : p + q j + r j^2 = 0.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"q j = \frac{m(j^3 - j)}{2} = \frac{m(1 - j)}{2}",
            font_size=24,
            color=COL_POINT_Q,
        )
        eq2 = MathTex(
            r"r j^2 = \frac{m(j^2 - j^3)}{2} = \frac{m(j^2 - 1)}{2}",
            font_size=24,
            color=COL_POINT_R,
        )
        eq3 = MathTex(
            r"p + q j + r j^2 = \frac{m}{2}\Big[ (j - j^2) + (1 - j) + (j^2 - 1) \Big] = \frac{m}{2} \times 0",
            font_size=24,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"p + q j + r j^2 = 0 \quad (\text{télescopage complet des six termes})",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.28, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q6b"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3))
        self.pose(0.4)
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 2.c (Rapport au sommet R) ─────────────────
    def chapitre_q7a(self):
        self.etape("11-q7-rapport-sommet-r")
        self.titre_zone = Text(
            "Partie II — Question 2.c — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire que le triangle PQR est équilatéral. Étape 1 : Isoler le rapport (p - r)/(q - r).",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        eq1 = MathTex(
            r"j^2 = -1 - j \implies p + q j + r(-1 - j) = 0 \iff (p - r) + j(q - r) = 0",
            font_size=23,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"(p - r) = -j(q - r) \iff \frac{p - r}{q - r} = -j",
            font_size=24,
            color=COL_TITLE,
        )
        eq3 = MathTex(
            r"-j = -\left(-\frac{1}{2} + i\frac{\sqrt{3}}{2}\right) = \frac{1}{2} - i\frac{\sqrt{3}}{2} = e^{-i\frac{\pi}{3}}",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)
        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        narration = Text(NARRATION["q7a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))
        self.play(Write(eq1))
        self.pose(0.4)
        self.play(Write(eq2))
        self.pose(0.4)
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Partie II : Question 2.c (Nature équilatérale & Figure) ────────
    def chapitre_q7b(self):
        self.etape("12-q7-nature-equilateral")
        self.titre_zone = Text(
            "Partie II — Question 2.c (suite)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        eq1 = MathTex(
            r"\left|\frac{p - r}{q - r}\right| = |-j| = 1 \implies RP = RQ",
            font_size=21,
            color=COL_TITLE,
        )
        eq2 = MathTex(
            r"\arg\left(\frac{p - r}{q - r}\right) \equiv -\frac{\pi}{3} \; [2\pi] \implies \big(\vec{RQ}, \vec{RP}\big) \equiv -\frac{\pi}{3} \; [2\pi]",
            font_size=20,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"\begin{cases} RP = RQ \\ (\vec{RQ}, \vec{RP}) \equiv -\frac{\pi}{3} \; [2\pi] \end{cases} \implies PQR \text{ équilatéral direct}",
            font_size=20,
            color=COL_SUCCESS,
        )
        col_gauche = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        col_gauche.next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.25)
        col_gauche.shift(LEFT * 0.1)
        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        axes = Axes(
            x_range=[-2.5, 2.5, 1],
            y_range=[-2.5, 2.5, 1],
            x_length=4.2,
            y_length=4.2,
            tips=False,
            axis_config={"color": BAC_BORDER, "stroke_width": 1.2},
        )
        axes.next_to(col_gauche, RIGHT, buff=0.4)
        axes.shift(UP * 0.1)
        labels_axes = self.graduations(axes, x_vals=[-2, -1, 1, 2], y_vals=[-2, -1, 1, 2])

        ang_m = np.pi / 6
        rm = 1.4
        zm = rm * np.exp(1j * ang_m)
        zj = np.exp(1j * 2 * np.pi / 3)

        za = zm
        zb = zm * zj
        zc = zm * (zj**2)

        zap = -zm * (zj**2)
        zbp = -zm
        zcp = -zm * zj

        zp = (zb + zap) / 2
        zq = (zc + zbp) / 2
        zr = (za + zcp) / 2

        pt_P = axes.c2p(zp.real, zp.imag)
        pt_Q = axes.c2p(zq.real, zq.imag)
        pt_R = axes.c2p(zr.real, zr.imag)

        poly_pqr = Polygon(pt_P, pt_Q, pt_R, color=COL_SUCCESS, stroke_width=2.5, fill_color=COL_SUCCESS, fill_opacity=0.15)
        dot_P = Dot(pt_P, color=COL_POINT_P, radius=0.06)
        dot_Q = Dot(pt_Q, color=COL_POINT_Q, radius=0.06)
        dot_R = Dot(pt_R, color=COL_POINT_R, radius=0.06)

        lbl_P = Text("P", font_size=15, color=COL_POINT_P).next_to(dot_P, UP, buff=0.1)
        lbl_Q = Text("Q", font_size=15, color=COL_POINT_Q).next_to(dot_Q, LEFT, buff=0.1)
        lbl_R = Text("R", font_size=15, color=COL_POINT_R).next_to(dot_R, RIGHT, buff=0.1)

        grp_fig = VGroup(axes, labels_axes, poly_pqr, dot_P, dot_Q, dot_R, lbl_P, lbl_Q, lbl_R)

        narration = Text(NARRATION["q7b"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(col_gauche), Create(axes), FadeIn(labels_axes), FadeIn(narration))
        self.play(Create(poly_pqr), FadeIn(dot_P), FadeIn(dot_Q), FadeIn(dot_R), Write(lbl_P), Write(lbl_Q), Write(lbl_R), Create(cadre))
        self.pose(1.5)

        fig_dict = {
            "titre": self.titre_zone,
            "col": col_gauche,
            "cadre": cadre,
            "fig": grp_fig,
            "narration": narration,
        }
        return fig_dict

    # ── Bilan ──────────────────────────────────────────────────────────
    def chapitre_fin(self, fig):
        self.etape("13-bilan")
        self.play(
            FadeOut(fig["titre"]),
            FadeOut(fig["col"]),
            FadeOut(fig["cadre"]),
            FadeOut(fig["fig"]),
            FadeOut(fig["narration"]),
        )

        titre = Text(
            "Bilan de l'exercice — Bac 2022 (SM)",
            font_size=22,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        items = [
            "• Identités de j : j^3 = 1  et  1 + j + j^2 = 0  =>  1 + j = -j^2",
            "• Discriminant : Delta = (m(1-j))^2  =>  Solutions S = {m, mj}",
            "• Forme exponentielle : z_1 + z_2 = sqrt(2) e^{i 7pi/12} => (z_1+z_2)^{2022} = -2^{1011}i (imaginaire pur)",
            "• Transformation phi : Rotation R(O, pi/3)",
            "• Télescopage des milieux : p + q j + r j^2 = 0",
            "• Triangle équilatéral : (p - r)/(q - r) = -j = e^{-i pi/3}",
        ]
        vg = VGroup(*[Text(it, font_size=15, color=COL_MATH) for it in items])
        vg.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        vg.next_to(titre, DOWN, buff=0.35, aligned_edge=LEFT)

        cadre = SurroundingRectangle(vg, color=COL_SUCCESS, buff=0.2)

        narration = Text(NARRATION["bilan"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(titre), FadeIn(vg, shift=UP * 0.2), Create(cadre), FadeIn(narration))
        self.pose(1.5)
        self.play(FadeOut(titre), FadeOut(vg), FadeOut(cadre), FadeOut(narration))
