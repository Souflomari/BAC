# scene_class: Explication
# bank_entry: bk-2024-n-x3
# title: Équation à paramètre, orthogonalité en O et lieu géométrique
# notion: nombres-complexes-2
# session: 2024-normale-sm
# bareme: 3.5 points

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Arc,
    Axes,
    Circle,
    Create,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
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
    DL,
    UL,
    DR,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_STRONG,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
)

# ── Palette sémantique ────────────────────────────────────────────────
COL_TITLE = BAC_ACCENT_STRONG
COL_MATH = BAC_INK
COL_EMPH = BAC_ACCENT
COL_WARN = BAC_ERROR
COL_SUCCESS = BAC_SUCCESS

# ── Textes narratifs ──────────────────────────────────────────────────
NARRATION = {
    "titre": "Baccalauréat National 2024, Session Normale, Sciences Mathématiques. Exercice trois : équation à paramètre alpha, orthogonalité en O et lieu géométrique.",
    "intro": "L'exercice étudie une équation du second degré à paramètre complexe, puis détermine le lieu des points Omega rendant le triangle OM1M2 rectangle en O.",
    "q1a": "Question 1a : Calcul direct du discriminant Delta égal à moins 4 facteur de 1 plus alpha.",
    "q1b": "Question 1b : Dans l'ensemble des complexes, l'équation admet deux solutions distinctes si et seulement si Delta est non nul, soit alpha différent de moins 1.",
    "q2": "Question 2 : Relations de Viète donnant directement la somme 2i et le produit alpha sans calculer les racines.",
    "q3a": "Question 3a : Pour alpha réel de la forme m carré moins 2m, le discriminant est un carré parfait et les racines sont im et i facteur de 2 moins m.",
    "q3b": "Question 3b : Les affixes z1 et z2 étant imaginaires pures, les points M1 et M2 sont situés sur l'axe imaginaire avec l'origine O : ils sont donc alignés.",
    "q4a": "Question 4a : Multiplication par le conjugué au dénominateur pour prouver l'équivalence entre quotient imaginaire pur et partie réelle du produit croisé nulle.",
    "q4b": "Question 4b : Développement des modules au carré pour relier la différence au carré, la somme au carré et le produit croisé.",
    "q4c": "Question 4c : Injection de la somme constante 2i pour conclure que le quotient est imaginaire pur si et seulement si la distance M1M2 vaut 2.",
    "q5a": "Question 5a : Identité algébrique reliant le carré de la différence à la somme et au produit de Viète, redonnant exactement Delta.",
    "q5b": "Question 5b : Synthèse géométrique : le triangle est rectangle en O si et seulement si alpha décrit le cercle de centre moins 1 et de rayon 1, privé de 0.",
    "bilan": "Synthèse générale de l'exercice : discriminant, Viète, orthogonalité par le module et lieu du cercle épointé.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Partie I : Équation générale (E_alpha) ───────────────────
        self.chapitre_q1a()
        self.chapitre_q1b()
        self.chapitre_q2()

        # ── Partie II : Cas particulier m réel ────────────────────────
        self.chapitre_q3a()
        fig_align = self.chapitre_q3b()

        # ── Partie II (suite) : Orthogonalité en O ────────────────────
        self.chapitre_q4a()
        self.chapitre_q4b()
        self.chapitre_q4c()

        # ── Partie II (fin) : Lieu géométrique Gamma ──────────────────
        self.chapitre_q5a()
        fig_cercle = self.chapitre_q5b()

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin(fig_cercle)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2024 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        )
        soustitre = Text(
            "Exercice 3 : Équation à paramètre, orthogonalité et lieu géométrique",
            font_size=18,
            color=COL_MATH,
        )
        badge = Text("3,5 points", font_size=16, color=COL_EMPH)
        grp = VGroup(titre, soustitre, badge).arrange(DOWN, buff=0.25)
        grp.move_to(ORIGIN)

        narration = Text(NARRATION["titre"], font_size=16, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(FadeIn(grp, shift=UP * 0.3), FadeIn(narration))
        self.pose(1.5)
        self.play(FadeOut(grp), FadeOut(narration))

    # ── Introduction ──────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro")
        self.titre_zone = Text(
            "Plan de résolution · Nombres Complexes",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        plan = VGroup(
            Text(
                "1. Partie I : Équation z^2 - 2iz + α = 0, discriminant Δ et relations de Viète",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "2. Partie II : Cas α = m^2 - 2m (m réel) et alignement des points O, M1, M2",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "3. Orthogonalité en O : équivalence Re(z1 z2_barre) = 0 et |z1 - z2| = 2",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "4. Synthèse : (z1 - z2)^2 = Δ et lieu géométrique Γ (cercle épointé)",
                font_size=16,
                color=COL_MATH,
            ),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        plan.next_to(self.titre_zone, DOWN, buff=0.4, aligned_edge=LEFT)

        narration = Text(NARRATION["intro"], font_size=16, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(plan, shift=RIGHT * 0.2), FadeIn(narration))
        self.pose(1.8)
        self.play(FadeOut(self.titre_zone), FadeOut(plan), FadeOut(narration))

    # ── Question 1.a ──────────────────────────────────────────────────
    def chapitre_q1a(self):
        self.etape("03-q1a-discriminant")
        self.titre_zone = Text(
            "Partie I — Question 1.a (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Équation (E_α) : z^2 - 2iz + α = 0. Montrer que Δ = -4(1 + α).",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\Delta = b^2 - 4ac = (-2i)^2 - 4(1)(\alpha)",
            font_size=25,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"(-2i)^2 = 4i^2 = -4 \implies \Delta = -4 - 4\alpha",
            font_size=25,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\Delta = -4(1 + \alpha)",
            font_size=26,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 1.b ──────────────────────────────────────────────────
    def chapitre_q1b(self):
        self.etape("04-q1b-racines-distinctes")
        self.titre_zone = Text(
            "Partie I — Question 1.b (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Déterminer les valeurs de α pour lesquelles (E_α) admet deux solutions distinctes.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\text{Dans } \mathbb{C},\; (E_\alpha) \text{ admet deux solutions distinctes} \iff \Delta \neq 0",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\Delta \neq 0 \iff -4(1+\alpha) \neq 0 \iff 1+\alpha \neq 0 \iff \alpha \neq -1",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\alpha \in \mathbb{C} \setminus \{-1\}",
            font_size=26,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 2 ────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("05-q2-viete")
        self.titre_zone = Text(
            "Partie I — Question 2 (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Déterminer la somme z1 + z2 et le produit z1 z2 des solutions de (E_α).",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q2"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\text{D'après les relations coefficients-racines (Viète) pour } a z^2 + b z + c = 0 :",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"z_1 + z_2 = -\frac{b}{a} = -\frac{-2i}{1} = 2i",
            font_size=25,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"z_1 z_2 = \frac{c}{a} = \frac{\alpha}{1} = \alpha",
            font_size=25,
            color=COL_EMPH,
        )
        grp_res = VGroup(eq2, eq3).arrange(RIGHT, buff=0.8)

        grp = VGroup(eq1, grp_res).arrange(DOWN, buff=0.3, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre = SurroundingRectangle(grp_res, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(grp_res), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.a ──────────────────────────────────────────────────
    def chapitre_q3a(self):
        self.etape("06-q3a-solutions-m")
        self.titre_zone = Text(
            "Partie II — Question 3.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Pour α = m^2 - 2m (m ∈ ℝ), déterminer z1 et z2 en fonction de m.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\Delta = -4(1 + \alpha) = -4(1 + m^2 - 2m) = -4(m - 1)^2 = \big[2i(m - 1)\big]^2",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"z = \frac{-b \pm \delta}{2a} = \frac{2i \pm 2i(m-1)}{2} = i\big[1 \pm (m-1)\big]",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"z_1 = i\big[1 + (m-1)\big] = i m \quad \text{et} \quad z_2 = i\big[1 - (m-1)\big] = i(2-m)",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.b ──────────────────────────────────────────────────
    def chapitre_q3b(self):
        self.etape("07-q3b-alignement")
        self.titre_zone = Text(
            "Partie II — Question 3.b (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire que pour tout m ∈ ℝ, les points O, M1 et M2 sont alignés.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        # Colonne de calculs à gauche
        eq1 = MathTex(
            r"z_1 = i m \quad \text{et} \quad z_2 = i(2-m) \quad (m \in \mathbb{R})",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"z_1 \in i\mathbb{R} \implies M_1 \in (O,\,\vec{v}) \quad (\text{axe imaginaire})",
            font_size=23,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"z_2 \in i\mathbb{R} \implies M_2 \in (O,\,\vec{v}) \quad (\text{axe imaginaire})",
            font_size=23,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"O,\, M_1,\, M_2 \in (O,\,\vec{v}) \implies O,\, M_1,\, M_2 \text{ alignés}",
            font_size=24,
            color=COL_SUCCESS,
        )
        calc_grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        calc_grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        # Figure géométrique à droite (axe imaginaire vertical)
        axes = Axes(
            x_range=[-1.5, 1.5, 1],
            y_range=[-1.0, 3.2, 1],
            x_length=3.5,
            y_length=4.0,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[-1, 1], y_vals=[1, 2, 3])

        # Exemple visuel avec m = 0.6 => z1 = 0.6 i, z2 = 1.4 i
        p_O = axes.c2p(0, 0)
        p_M1 = axes.c2p(0, 0.6)
        p_M2 = axes.c2p(0, 1.4)

        dot_O = Dot(p_O, color=COL_MATH, radius=0.06)
        lbl_O = MathTex("O", font_size=18, color=COL_MATH).next_to(dot_O, LEFT, buff=0.08)

        dot_M1 = Dot(p_M1, color=COL_EMPH, radius=0.06)
        lbl_M1 = MathTex("M_1", font_size=18, color=COL_EMPH).next_to(dot_M1, RIGHT, buff=0.08)

        dot_M2 = Dot(p_M2, color=COL_SUCCESS, radius=0.06)
        lbl_M2 = MathTex("M_2", font_size=18, color=COL_SUCCESS).next_to(dot_M2, RIGHT, buff=0.08)

        ligne_align = Line(axes.c2p(0, -0.8), axes.c2p(0, 2.8), color=COL_WARN, stroke_width=2.5)

        self.play(
            Create(ligne_align),
            FadeIn(dot_O), FadeIn(lbl_O),
            FadeIn(dot_M1), FadeIn(lbl_M1),
            FadeIn(dot_M2), FadeIn(lbl_M2),
        )
        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)

        fig_grp = VGroup(axes, labels_axes, ligne_align, dot_O, lbl_O, dot_M1, lbl_M1, dot_M2, lbl_M2)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_grp), FadeOut(cadre), FadeOut(fig_grp), FadeOut(narration))
        return fig_grp

    # ── Question 4.a ──────────────────────────────────────────────────
    def chapitre_q4a(self):
        self.etape("08-q4a-rapport-imaginaire")
        self.titre_zone = Text(
            "Partie II — Question 4.a (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que z1 / z2 est imaginaire pur si et seulement si Re(z1 z2_barre) = 0.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\text{Comme } O,\, M_1,\, M_2 \text{ non alignés} \implies z_2 \neq 0",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{z_1}{z_2} = \frac{z_1 \overline{z_2}}{z_2 \overline{z_2}} = \frac{z_1 \overline{z_2}}{|z_2|^2}",
            font_size=25,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\mathrm{Re}\left(\frac{z_1}{z_2}\right) = \frac{\mathrm{Re}(z_1\overline{z_2})}{|z_2|^2} \quad \text{avec } |z_2|^2 > 0",
            font_size=24,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"\frac{z_1}{z_2} \in i\mathbb{R} \iff \mathrm{Re}\left(\frac{z_1}{z_2}\right) = 0 \iff \mathrm{Re}(z_1\overline{z_2}) = 0",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 4.b ──────────────────────────────────────────────────
    def chapitre_q4b(self):
        self.etape("09-q4b-identite-modules")
        self.titre_zone = Text(
            "Partie II — Question 4.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que : |z1 - z2|^2 = |z1 + z2|^2 - 4 Re(z1 z2_barre).",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"|z_1 - z_2|^2 = (z_1 - z_2)\overline{(z_1 - z_2)} = |z_1|^2 + |z_2|^2 - 2\,\mathrm{Re}(z_1\overline{z_2})",
            font_size=23,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"|z_1 + z_2|^2 = (z_1 + z_2)\overline{(z_1 + z_2)} = |z_1|^2 + |z_2|^2 + 2\,\mathrm{Re}(z_1\overline{z_2})",
            font_size=23,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"|z_1|^2 + |z_2|^2 = |z_1 + z_2|^2 - 2\,\mathrm{Re}(z_1\overline{z_2})",
            font_size=23,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"|z_1 - z_2|^2 = |z_1 + z_2|^2 - 4\,\mathrm{Re}(z_1\overline{z_2})",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 4.c ──────────────────────────────────────────────────
    def chapitre_q4c(self):
        self.etape("10-q4c-module-difference")
        self.titre_zone = Text(
            "Partie II — Question 4.c (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire que z1 / z2 est imaginaire pur si et seulement si |z1 - z2| = 2.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4c"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"z_1 + z_2 = 2i \implies |z_1 + z_2| = |2i| = 2 \implies |z_1 + z_2|^2 = 4",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"|z_1 - z_2|^2 = 4 - 4\,\mathrm{Re}(z_1\overline{z_2})",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\frac{z_1}{z_2} \in i\mathbb{R} \iff \mathrm{Re}(z_1\overline{z_2}) = 0 \iff |z_1 - z_2|^2 = 4",
            font_size=24,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"\frac{z_1}{z_2} \in i\mathbb{R} \iff |z_1 - z_2| = 2 \quad (\text{car } |z_1-z_2| \ge 0)",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 5.a ──────────────────────────────────────────────────
    def chapitre_q5a(self):
        self.etape("11-q5a-carre-delta")
        self.titre_zone = Text(
            "Partie II — Question 5.a (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que pour tout α ∈ ℂ, on a : (z1 - z2)^2 = Δ.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q5a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"(z_1 - z_2)^2 = (z_1 + z_2)^2 - 4 z_1 z_2",
            font_size=25,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\text{Or d'après Viète (Q2) : } z_1 + z_2 = 2i \quad \text{et} \quad z_1 z_2 = \alpha",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"(z_1 - z_2)^2 = (2i)^2 - 4\alpha = -4 - 4\alpha = -4(1+\alpha)",
            font_size=25,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"(z_1 - z_2)^2 = \Delta",
            font_size=26,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 5.b ──────────────────────────────────────────────────
    def chapitre_q5b(self):
        self.etape("12-q5b-lieu-geometrique")
        self.titre_zone = Text(
            "Partie II — Question 5.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Déterminer l'ensemble Γ des points Ω(α) tels que OM1M2 soit rectangle en O.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q5b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        # Colonne de calculs à gauche
        eq1 = MathTex(
            r"OM_1M_2 \text{ rectangle en } O \iff \frac{z_1}{z_2} \in i\mathbb{R}^* \iff |z_1 - z_2| = 2",
            font_size=22,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"|z_1 - z_2| = 2 \iff |z_1 - z_2|^2 = 4 \iff |\Delta| = 4",
            font_size=22,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"|-4(1+\alpha)| = 4 \iff 4|1+\alpha| = 4 \iff |\alpha + 1| = 1",
            font_size=22,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\text{Triangle non aplati : } z_1 z_2 = \alpha \neq 0 \implies \Omega \neq O",
            font_size=22,
            color=COL_WARN,
        )
        eq5 = MathTex(
            r"\Gamma = \mathcal{C}(C(-1),\, 1) \setminus \{O(0)\}",
            font_size=24,
            color=COL_SUCCESS,
        )

        calc_grp = VGroup(eq1, eq2, eq3, eq4, eq5).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        calc_grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq5, color=COL_SUCCESS, buff=0.12)

        # Figure géométrique à droite : Cercle de centre (-1, 0) et rayon 1 privé de (0, 0)
        axes = Axes(
            x_range=[-2.5, 1.2, 1],
            y_range=[-1.5, 1.5, 1],
            x_length=4.5,
            y_length=3.6,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[-2, -1, 1], y_vals=[-1, 1])

        p_center = axes.c2p(-1, 0)
        p_origin = axes.c2p(0, 0)
        r_screen = np.linalg.norm(axes.c2p(0, 0) - axes.c2p(-1, 0))

        cercle = Circle(radius=r_screen, color=COL_SUCCESS, stroke_width=2.5).move_to(p_center)
        dot_C = Dot(p_center, color=COL_TITLE, radius=0.06)
        lbl_C = MathTex("C(-1)", font_size=16, color=COL_TITLE).next_to(dot_C, UL, buff=0.08)

        dot_O = Dot(p_origin, color=COL_MATH, radius=0.06)
        lbl_O = MathTex("O(0)", font_size=16, color=COL_MATH).next_to(dot_O, UR, buff=0.08)

        # Point exclu (trou blanc / rouge à l'origine)
        trou_O = Circle(radius=0.08, color=COL_WARN, fill_color=BAC_ERROR, fill_opacity=0.3, stroke_width=2).move_to(p_origin)
        lbl_exclu = Text("exclu (α=0)", font_size=16, color=COL_WARN).next_to(trou_O, DR, buff=0.06)

        self.play(
            Create(cercle),
            FadeIn(dot_C), FadeIn(lbl_C),
            FadeIn(dot_O), FadeIn(lbl_O),
            Create(trou_O), FadeIn(lbl_exclu),
        )

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4))
        self.play(Write(eq5), Create(cadre))
        self.pose(1.5)

        fig_grp = VGroup(axes, labels_axes, cercle, dot_C, lbl_C, dot_O, lbl_O, trou_O, lbl_exclu)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_grp), FadeOut(cadre), FadeOut(narration))
        return fig_grp

    # ── Bilan ──────────────────────────────────────────────────────────
    def chapitre_fin(self, fig=None):
        self.etape("13-bilan")
        if fig is not None:
            self.play(FadeOut(fig))

        titre = Text(
            "Bilan de l'exercice — Bac 2024 (SM)",
            font_size=24,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.6)

        points = VGroup(
            Text(
                "• Équation : (E_α) : z^2 - 2iz + α = 0  =>  Δ = -4(1 + α)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Deux solutions distinctes dans ℂ  <=>  Δ ≠ 0  <=>  α ∈ ℂ \\ {-1}",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Relations de Viète : z1 + z2 = 2i  et  z1 z2 = α",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Cas α = m^2 - 2m (m ∈ ℝ) : z1 = im, z2 = i(2-m)  =>  O, M1, M2 alignés sur (O, v)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Orthogonalité : z1/z2 ∈ iℝ  <=>  Re(z1 z2_barre) = 0  <=>  |z1 - z2| = 2",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Lieu géométrique : OM1M2 rectangle en O  <=>  |α + 1| = 1 et α ≠ 0",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Conclusion : Γ = C(C(-1), 1) \\ {O(0)} (cercle de centre -1 et rayon 1 épointé en 0)",
                font_size=16,
                color=COL_TITLE,
            ),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).next_to(titre, DOWN, buff=0.35, aligned_edge=LEFT).to_edge(LEFT, buff=0.8)

        cadre = SurroundingRectangle(points, color=COL_TITLE, buff=0.18)

        narration = Text(NARRATION["bilan"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(titre), FadeIn(points), Create(cadre), FadeIn(narration))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(points), FadeOut(cadre), FadeOut(narration))
