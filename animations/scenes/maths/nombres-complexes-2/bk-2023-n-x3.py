# scene_class: Explication
# bank_entry: bk-2023-n-x3
# title: Forme exponentielle, tangente de pi/12 et suites couplées
# notion: nombres-complexes-2
# session: 2023-normale-sm
# bareme: 3.5 points

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Axes,
    Create,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    Polygon,
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
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_STRONG,
    BAC_ERROR,
    BAC_INK,
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
    "titre": "Baccalauréat National 2023, Session Normale, Sciences Mathématiques. Exercice trois : forme exponentielle, tangente de pi sur 12 et suites couplées.",
    "intro": "L'exercice construit d'abord la forme exponentielle de u et la tangente de pi sur 12, puis étudie deux suites couplées et la géométrie des puissances successives.",
    "q1a": "Question 1a : Écriture sous forme exponentielle des nombres complexes 1 moins i et 1 plus i racine de 3.",
    "q1b": "Question 1b : Produit des deux exponentielles et déduction de l'exponentielle de i pi sur 12.",
    "q1c": "Question 1c : Identification des parties réelle et imaginaire pour obtenir la valeur exacte de tangente pi sur 12 égale à 2 moins racine de 3.",
    "q1d": "Question 1d : Écriture de u sous forme exponentielle u égal racine de 6 moins racine de 2 facteur de e puissance i pi sur 12.",
    "q2a": "Question 2a : Preuve par récurrence que x n plus i y n est égal à u puissance n pour les deux suites couplées.",
    "q2b": "Question 2b : Expression explicite de x n et y n en fonction de cosinus et sinus de n pi sur 12 par la formule de Moivre.",
    "q3a": "Question 3a : Condition d'alignement des points O, A 0 et A n équivalente à n multiple de 12.",
    "q3b_alg": "Question 3b : Calcul du quotient au sommet A n montrant qu'il est imaginaire pur, indépendant de n.",
    "q3b_geo": "Question 3b suite : Interprétation géométrique montrant que chaque triangle O A n A n plus 1 est rectangle en A n.",
    "bilan": "Synthèse générale de l'exercice : forme exponentielle, tangente de pi sur 12, suites couplées et spirale de triangles rectangles.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Question 1 : Formes exponentielles et u ───────────────────
        self.chapitre_q1a()
        self.chapitre_q1b()
        self.chapitre_q1c()
        self.chapitre_q1d()

        # ── Question 2 : Suites couplées ──────────────────────────────
        self.chapitre_q2a()
        self.chapitre_q2b()

        # ── Question 3 : Géométrie du plan complexe ───────────────────
        self.chapitre_q3a()
        self.chapitre_q3b_alg()
        fig = self.chapitre_q3b_geo()

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin(fig)

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2023 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        )
        soustitre = Text(
            "Exercice 3 : Forme exponentielle, tan(π/12) et suites couplées",
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
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        plan = VGroup(
            Text(
                "1. Formes exponentielles de 1-i et 1+i√3, déduction de exp(iπ/12)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "2. Valeur exacte tan(π/12) = 2-√3 et forme exponentielle de u",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "3. Suites couplées : récurrence x_n + i y_n = u^n et formules de Moivre",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "4. Géométrie : alignement (n multiple de 12) et triangles rectangles en An",
                font_size=16,
                color=COL_MATH,
            ),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        plan.next_to(self.titre_zone, DOWN, buff=0.4, aligned_edge=LEFT)

        narration = Text(NARRATION["intro"], font_size=12, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(plan, shift=RIGHT * 0.2), FadeIn(narration))
        self.pose(1.8)
        self.play(FadeOut(self.titre_zone), FadeOut(plan), FadeOut(narration))

    # ── Question 1.a ──────────────────────────────────────────────────
    def chapitre_q1a(self):
        self.etape("03-q1a-exp")
        self.titre_zone = Text(
            "Question 1.a — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Écrire sous forme exponentielle les nombres complexes : 1 - i et 1 + i√3.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        c1 = MathTex(
            r"|1 - i| = \sqrt{1^2 + (-1)^2} = \sqrt{2}, \quad "
            r"\begin{cases} \cos\theta = \frac{1}{\sqrt{2}} \\ \sin\theta = -\frac{1}{\sqrt{2}} \end{cases} "
            r"\implies \theta \equiv -\frac{\pi}{4}\;[2\pi]",
            font_size=24,
            color=COL_MATH,
        )
        exp1 = MathTex(r"1 - i = \sqrt{2}\,e^{-i\frac{\pi}{4}}", font_size=26, color=COL_EMPH)

        c2 = MathTex(
            r"|1 + i\sqrt{3}| = \sqrt{1^2 + (\sqrt{3})^2} = 2, \quad "
            r"\begin{cases} \cos\theta = \frac{1}{2} \\ \sin\theta = \frac{\sqrt{3}}{2} \end{cases} "
            r"\implies \theta \equiv \frac{\pi}{3}\;[2\pi]",
            font_size=24,
            color=COL_MATH,
        )
        exp2 = MathTex(r"1 + i\sqrt{3} = 2\,e^{i\frac{\pi}{3}}", font_size=26, color=COL_EMPH)

        grp_res = VGroup(exp1, exp2).arrange(RIGHT, buff=0.8)
        grp = VGroup(c1, c2, grp_res).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(grp_res, color=COL_SUCCESS, buff=0.12)

        self.play(Write(c1))
        self.play(Write(c2))
        self.play(Write(grp_res), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 1.b ──────────────────────────────────────────────────
    def chapitre_q1b(self):
        self.etape("04-q1b-produit")
        self.titre_zone = Text(
            "Question 1.b — 0,25 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que : ((1 - i)(1 + i√3)) / (2√2) = exp(iπ/12).",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1b"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"(1-i)(1+i\sqrt{3}) = \left(\sqrt{2}\,e^{-i\frac{\pi}{4}}\right) \times \left(2\,e^{i\frac{\pi}{3}}\right) "
            r"= 2\sqrt{2}\,e^{i\left(\frac{\pi}{3} - \frac{\pi}{4}\right)}",
            font_size=25,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{\pi}{3} - \frac{\pi}{4} = \frac{4\pi - 3\pi}{12} = \frac{\pi}{12} "
            r"\implies (1-i)(1+i\sqrt{3}) = 2\sqrt{2}\,e^{i\frac{\pi}{12}}",
            font_size=25,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\frac{(1-i)(1+i\sqrt{3})}{2\sqrt{2}} = \frac{2\sqrt{2}\,e^{i\frac{\pi}{12}}}{2\sqrt{2}} = e^{i\frac{\pi}{12}}",
            font_size=26,
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

    # ── Question 1.c ──────────────────────────────────────────────────
    def chapitre_q1c(self):
        self.etape("05-q1c-tan")
        self.titre_zone = Text(
            "Question 1.c — 0,25 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire que : tan(π/12) = 2 - √3.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1c"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"(1-i)(1+i\sqrt{3}) = 1 + i\sqrt{3} - i - i^2\sqrt{3} = (1+\sqrt{3}) + i(\sqrt{3}-1)",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"e^{i\frac{\pi}{12}} = \frac{1+\sqrt{3}}{2\sqrt{2}} + i\,\frac{\sqrt{3}-1}{2\sqrt{2}} "
            r"\implies \cos\frac{\pi}{12} = \frac{1+\sqrt{3}}{2\sqrt{2}}, \quad \sin\frac{\pi}{12} = \frac{\sqrt{3}-1}{2\sqrt{2}}",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\tan\frac{\pi}{12} = \frac{\sin\frac{\pi}{12}}{\cos\frac{\pi}{12}} = \frac{\sqrt{3}-1}{\sqrt{3}+1} "
            r"= \frac{(\sqrt{3}-1)^2}{(\sqrt{3}+1)(\sqrt{3}-1)} = \frac{4-2\sqrt{3}}{2} = 2 - \sqrt{3}",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 1.d ──────────────────────────────────────────────────
    def chapitre_q1d(self):
        self.etape("06-q1d-forme-u")
        self.titre_zone = Text(
            "Question 1.d — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que : u = (√6 - √2) exp(iπ/12).",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1d"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"u = 1 + (2-\sqrt{3})i = 1 + i\tan\frac{\pi}{12} = \frac{\cos\frac{\pi}{12} + i\sin\frac{\pi}{12}}{\cos\frac{\pi}{12}} = \frac{e^{i\frac{\pi}{12}}}{\cos\frac{\pi}{12}}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{1}{\cos\frac{\pi}{12}} = \frac{2\sqrt{2}}{\sqrt{3}+1} = \frac{2\sqrt{2}(\sqrt{3}-1)}{(\sqrt{3}+1)(\sqrt{3}-1)} = \sqrt{2}(\sqrt{3}-1) = \sqrt{6}-\sqrt{2}",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"u = (\sqrt{6}-\sqrt{2})\,e^{i\frac{\pi}{12}} \qquad \left(\text{et de façon équivalente : } u = \frac{e^{i\frac{\pi}{12}}}{\cos\frac{\pi}{12}}\right)",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.24, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 2.a ──────────────────────────────────────────────────
    def chapitre_q2a(self):
        self.etape("07-q2a-recurrence")
        self.titre_zone = Text(
            "Question 2.a — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Suites : x0=1, y0=0, x(n+1)=xn-(2-√3)yn, y(n+1)=(2-√3)xn+yn. Montrer : xn + i yn = u^n.",
            font_size=13,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q2a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq_init = MathTex(
            r"\text{Initialisation } (n=0) : \quad x_0 + i y_0 = 1 + 0\,i = 1 = u^0 \quad \checkmark",
            font_size=23,
            color=COL_EMPH,
        )
        eq_prod = MathTex(
            r"(x_n + i y_n) \cdot u = (x_n + i y_n)\big(1 + (2-\sqrt{3})i\big) "
            r"= \underbrace{\big[x_n - (2-\sqrt{3})y_n\big]}_{x_{n+1}} + i\,\underbrace{\big[(2-\sqrt{3})x_n + y_n\big]}_{y_{n+1}}",
            font_size=22,
            color=COL_MATH,
        )
        eq_hered = MathTex(
            r"\text{Hérédité : Si } x_n + i y_n = u^n, \text{ alors } x_{n+1} + i y_{n+1} = (x_n + i y_n)\cdot u = u^n \cdot u = u^{n+1}",
            font_size=23,
            color=COL_MATH,
        )
        eq_ccl = MathTex(
            r"\forall n \in \mathbb{N}, \quad x_n + i y_n = u^n",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq_init, eq_prod, eq_hered, eq_ccl).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq_ccl, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq_init))
        self.play(Write(eq_prod))
        self.play(Write(eq_hered))
        self.play(Write(eq_ccl), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 2.b ──────────────────────────────────────────────────
    def chapitre_q2b(self):
        self.etape("08-q2b-formules-xn-yn")
        self.titre_zone = Text(
            "Question 2.b — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire xn = cos(nπ/12)/(cos π/12)^n et yn = sin(nπ/12)/(cos π/12)^n.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q2b"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"u^n = \left(\frac{e^{i\frac{\pi}{12}}}{\cos\frac{\pi}{12}}\right)^n = \frac{e^{in\frac{\pi}{12}}}{\left(\cos\frac{\pi}{12}\right)^n} "
            r"= \frac{\cos\left(\frac{n\pi}{12}\right) + i\,\sin\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"x_n + i y_n = u^n = \frac{\cos\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n} + i\,\frac{\sin\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n}",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"x_n = \frac{\cos\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n} \quad \text{et} \quad y_n = \frac{\sin\left(\frac{n\pi}{12}\right)}{\left(\cos\frac{\pi}{12}\right)^n}",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.a ──────────────────────────────────────────────────
    def chapitre_q3a(self):
        self.etape("09-q3a-alignement")
        self.titre_zone = Text(
            "Question 3.a — 0,5 pt",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Déterminer les entiers n tels que O, A0 et An soient alignés.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3a"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"O,\,A_0,\,A_n \text{ alignés} \iff \frac{z_{A_n}-z_O}{z_{A_0}-z_O} \in \mathbb{R} \iff \frac{u^n}{u^0} = u^n \in \mathbb{R}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"u^n = (\sqrt{6}-\sqrt{2})^n \, e^{in\frac{\pi}{12}} \quad \text{avec } \sqrt{6}-\sqrt{2} > 0",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"u^n \in \mathbb{R} \iff n\frac{\pi}{12} \equiv 0\;[\pi] \iff \frac{n}{12} \in \mathbb{Z} \iff n \in 12\mathbb{N}",
            font_size=24,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"O,\, A_0,\, A_n \text{ alignés} \iff n \in \{0,\, 12,\, 24,\, 36,\, \dots\} \quad (n \text{ multiple de } 12)",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.b (Partie 1 : Algébrique) ───────────────────────────
    def chapitre_q3b_alg(self):
        self.etape("10-q3b-rapport-triangle")
        self.titre_zone = Text(
            "Question 3.b — 0,5 pt (Partie 1 : Rapport au sommet An)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que pour tout entier n, le triangle O An A(n+1) est rectangle en An.",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3b_alg"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\frac{z_O - z_{A_n}}{z_{A_{n+1}} - z_{A_n}} = \frac{0 - u^n}{u^{n+1} - u^n} = \frac{-u^n}{u^n(u - 1)} = \frac{-1}{u - 1}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"u - 1 = \big[1 + (2-\sqrt{3})i\big] - 1 = (2-\sqrt{3})i \quad (\text{imaginaire pur})",
            font_size=24,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"\frac{-1}{u - 1} = \frac{-1}{(2-\sqrt{3})i} = \frac{i}{2-\sqrt{3}} \in i\mathbb{R}^* \quad (\text{indépendant de } n)",
            font_size=24,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"\arg\left(\frac{z_O - z_{A_n}}{z_{A_{n+1}} - z_{A_n}}\right) \equiv \frac{\pi}{2}\;[\pi] \implies (\vec{A_n A_{n+1}},\, \vec{A_n O}) \equiv \frac{\pi}{2}\;[\pi]",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.b (Partie 2 : Géométrique) ──────────────────────────
    def chapitre_q3b_geo(self):
        self.etape("11-q3b-geometrie-spirale")
        self.titre_zone = Text(
            "Question 3.b (suite) — Illustration géométrique",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Pour tout n, le triangle O An A(n+1) est rectangle en An (spirale de triangles rectangles).",
            font_size=14,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3b_geo"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        # Repère et tracé des premiers sommets A0, A1, A2, A3, A4
        axes = Axes(
            x_range=[-0.3, 2.2, 1],
            y_range=[-0.3, 2.0, 1],
            x_length=4.8,
            y_length=4.0,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": False},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        u_val = 1 + (2 - np.sqrt(3)) * 1j
        pts_c = [u_val**k for k in range(5)]
        pts_coords = [axes.c2p(z.real, z.imag) for z in pts_c]
        p_origin = axes.c2p(0, 0)

        poly_lines = VGroup()
        points_dots = VGroup()
        labels_pts = VGroup()

        dot_O = Dot(p_origin, color=COL_MATH, radius=0.06)
        lbl_O = MathTex("O", font_size=18, color=COL_MATH).next_to(dot_O, DL, buff=0.08)
        points_dots.add(dot_O)
        labels_pts.add(lbl_O)

        for i, pt in enumerate(pts_coords):
            d = Dot(pt, color=COL_EMPH if i % 2 == 0 else COL_SUCCESS, radius=0.06)
            lbl = MathTex(f"A_{i}", font_size=16, color=d.get_color()).next_to(d, UR, buff=0.06)
            points_dots.add(d)
            labels_pts.add(lbl)
            poly_lines.add(Line(p_origin, pt, color=BAC_INK_SOFT, stroke_width=1.2))

        for i in range(len(pts_coords) - 1):
            poly_lines.add(Line(pts_coords[i], pts_coords[i + 1], color=COL_TITLE, stroke_width=2.0))

        # Triangles remplis
        tri_fill0 = Polygon(
            p_origin,
            pts_coords[0],
            pts_coords[1],
            color=COL_EMPH,
            fill_opacity=0.18,
            stroke_width=1.2,
        )
        tri_fill1 = Polygon(
            p_origin,
            pts_coords[1],
            pts_coords[2],
            color=COL_SUCCESS,
            fill_opacity=0.14,
            stroke_width=1.2,
        )

        sq_a0 = RightAngle(
            Line(pts_coords[0], pts_coords[1]),
            Line(pts_coords[0], p_origin),
            length=0.22,
            color=COL_WARN,
        )
        sq_a1 = RightAngle(
            Line(pts_coords[1], pts_coords[2]),
            Line(pts_coords[1], p_origin),
            length=0.22,
            color=COL_WARN,
        )

        explic = VGroup(
            MathTex(r"(\vec{A_n A_{n+1}},\, \vec{A_n O}) \equiv \frac{\pi}{2}\;[\pi]", font_size=24, color=COL_MATH),
            MathTex(r"\implies O A_n A_{n+1} \text{ rectangle en } A_n", font_size=24, color=COL_SUCCESS),
            MathTex(r"OA_{n+1}^2 = OA_n^2 + A_n A_{n+1}^2", font_size=23, color=COL_MATH),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).next_to(enonce, DOWN, buff=0.35, aligned_edge=LEFT)

        cadre = SurroundingRectangle(explic[1], color=COL_SUCCESS, buff=0.12)

        self.play(Create(axes))
        self.play(
            FadeIn(points_dots),
            FadeIn(labels_pts),
            Create(poly_lines),
            FadeIn(tri_fill0),
            FadeIn(tri_fill1),
            Create(sq_a0),
            Create(sq_a1),
        )
        self.play(Write(explic), Create(cadre))
        self.pose(1.5)

        fig_grp = VGroup(
            axes,
            points_dots,
            labels_pts,
            poly_lines,
            tri_fill0,
            tri_fill1,
            sq_a0,
            sq_a1,
        )
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(explic), FadeOut(cadre), FadeOut(narration))
        return fig_grp

    # ── Bilan ──────────────────────────────────────────────────────────
    def chapitre_fin(self, fig=None):
        self.etape("12-bilan")
        if fig is not None:
            self.play(FadeOut(fig))

        titre = Text(
            "Bilan de l'exercice — Bac 2023 (SM)",
            font_size=24,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.6)

        points = VGroup(
            Text(
                "• 1-i = √2 e^(-iπ/4) et 1+i√3 = 2 e^(iπ/3) => produit / 2√2 = e^(iπ/12)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Identification Re/Im => cos(π/12)=(1+√3)/(2√2), sin(π/12)=(√3-1)/(2√2) => tan(π/12) = 2-√3",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• u = (√6 - √2) e^(iπ/12) = e^(iπ/12) / cos(π/12)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Récurrence couplée : xn + i yn = u^n => xn = cos(nπ/12)/(cos π/12)^n, yn = sin(nπ/12)/(cos π/12)^n",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Alignement : O, A0, An alignés <=> u^n réel <=> n multiple de 12",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Triangles rectangles : (z_O - z_An)/(z_A(n+1) - z_An) = i/(2-√3) => O An A(n+1) rectangle en An",
                font_size=16,
                color=COL_MATH,
            ),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).next_to(titre, DOWN, buff=0.35, aligned_edge=LEFT).to_edge(LEFT, buff=0.8)

        cadre = SurroundingRectangle(points, color=COL_TITLE, buff=0.18)

        narration = Text(NARRATION["bilan"], font_size=13, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(titre), FadeIn(points), Create(cadre), FadeIn(narration))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(points), FadeOut(cadre), FadeOut(narration))
