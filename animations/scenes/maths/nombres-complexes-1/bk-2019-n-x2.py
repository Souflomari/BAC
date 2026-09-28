"""Explication animée v4 — Bac 2019 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2019-n-x2 (vérifiée, AlloSchool NS22F, Exercice 2, 3 points).
a = 1 - i√3, b = 2 + 2i, c = √3 + i, d = -2 + 2√3 (d RÉEL, sur l'axe réel).

Six questions : 1) équation du second degré ; 2) a) vérification d'une
égalité d'affixes b) alignement de A, C, D ; 3) rotation traduite en
écriture complexe ; 4) a) h = i p b) triangle OHP rectangle isocèle en O.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste algébrique
= une étape, y compris le coefficient 1 invisible devant z²), couche de
sens avant chaque calcul (vecteur-affixe, rotation, module/argument d'un
produit-quotient), signaling dans la formule, zones d'écran dures.

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2019-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
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
)

# Code couleur des coefficients du second degré (DESIGN.md §2) : a
# sarcelle forte, b or, c vert. NB : ce sont les coefficients de
# l'ÉQUATION de Q1 — pas les points A, B, C de l'énoncé (le rouge le
# rappelle explicitement dans la scène, même lettres, objets différents).
COL_A, COL_B, COL_C = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

# Identité visuelle stable des SIX points de la figure (distincte du
# triplet ci-dessus) : A sarcelle, B sarcelle claire, C vert, D gris
# (réel, sur l'axe), H sarcelle forte (image par rotation), P or.
COL_PT_A, COL_PT_B, COL_PT_C, COL_PT_D = BAC_ACCENT, BAC_ACCENT_LIGHT, BAC_SUCCESS, BAC_INK_MUTED
COL_PT_H, COL_PT_P = BAC_ACCENT_STRONG, BAC_WARNING

NARRATION = {
    "titre": "Exercice deux du bac deux mille dix-neuf, session normale, "
    "sciences expérimentales : nombres complexes, sur trois points. Six "
    "questions, un même fil : une équation, un alignement, une rotation, "
    "un triangle.",
    "intro": "On donne d'emblée quatre points, A, B, C et D, avec leurs "
    "quatre affixes. On les retrouvera un par un, question après question.",
    "q1": "Question un. On identifie les coefficients de l'équation — y "
    "compris le 1 invisible devant z carré — on calcule le discriminant, "
    "et on résout dans les complexes. La racine gardée est exactement "
    "l'affixe a donnée dans l'énoncé.",
    "plan": "On place le point A dans le plan complexe : partie réelle en "
    "horizontal, partie imaginaire en vertical.",
    "q2": "Question deux a. On place C et D, puis on vérifie une égalité "
    "entre affixes en calculant séparément les deux membres.",
    "q3": "Question deux b. Une différence d'affixes est l'affixe d'un "
    "vecteur. Deux vecteurs colinéaires issus du même point : les trois "
    "points sont alignés.",
    "q4": "Question trois. Une rotation de centre O multiplie l'affixe "
    "par e puissance i thêta. On vérifie qu'un demi a est exactement ce "
    "facteur pour l'angle moins pi sur trois.",
    "q5": "Question quatre a. H est l'image de B par la rotation ; P a "
    "pour affixe a moins c. On vérifie que h égale i fois p — multiplier "
    "par i, c'est tourner d'un quart de tour.",
    "q6": "Question quatre b. L'égalité h égale i p dit tout : même "
    "distance à O, et angle droit en O. Le triangle O H P est rectangle "
    "et isocèle en O.",
}

A_AFF = complex(1, -np.sqrt(3))
B_AFF = complex(2, 2)
C_AFF = complex(np.sqrt(3), 1)
D_AFF = complex(-2 + 2 * np.sqrt(3), 0)
H_AFF = 0.5 * A_AFF * B_AFF
P_AFF = A_AFF - C_AFF


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        self.chapitre_q1()
        plan, a_dot, a_lbl = self.chapitre_plan()
        c_dot, c_lbl, d_dot, d_lbl = self.chapitre_q2(plan)
        self.chapitre_q3(plan, a_dot, c_dot, c_lbl, d_dot, d_lbl)
        self.chapitre_q4(plan, a_dot, a_lbl)
        h_dot, h_lbl, p_dot, p_lbl, op, oh = self.chapitre_q5(plan)
        self.chapitre_q6(plan, h_dot, h_lbl, p_dot, p_lbl, op, oh)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2019 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé ─────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère les points A, B, C, D d'affixes respectives :",
            font_size=28,
        ).shift(2.1 * UP)
        aff_a = MathTex(r"a = 1 - i\sqrt{3}", font_size=40)
        aff_b = MathTex(r"b = 2 + 2i", font_size=40)
        aff_c = MathTex(r"c = \sqrt{3} + i", font_size=40)
        aff_d = MathTex(r"d = -2 + 2\sqrt{3}", font_size=40)
        ligne1 = VGroup(aff_a, aff_b).arrange(RIGHT, buff=1.6)
        ligne2 = VGroup(aff_c, aff_d).arrange(RIGHT, buff=1.6)
        grille = VGroup(ligne1, ligne2).arrange(DOWN, buff=0.55).next_to(
            entete, DOWN, buff=0.7
        )
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(grille, shift=0.2 * UP), run_time=1.4)
        self.legende(
            "Quatre points sont donnés d'emblée, avec leurs affixes.",
            "On les retrouvera un par un, question après question.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(entete, grille)))

    # ── Q1 : plein écran (pas encore de figure) ───────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,75 pt")

        self.etape("q1-enonce")
        eq = MathTex("z^2", "-2", "z", "+", "4", "= 0", font_size=54).shift(2.3 * UP)
        self.play(Write(eq), run_time=1.6)
        self.legende(
            "On doit résoudre cette équation dans l'ensemble des nombres",
            "complexes : les solutions ont le droit de ne pas être réelles.",
        )
        self.pose(2.6)

        self.etape("q1-forme")
        forme = MathTex("a", "z^2", "+", "b", "z", "+", "c", "= 0", font_size=38)
        forme.set_color(BAC_INK_SOFT)
        forme[0].set_color(COL_A)
        forme[3].set_color(COL_B)
        forme[6].set_color(COL_C)
        forme.next_to(eq, DOWN, buff=0.55)
        self.play(FadeIn(forme, shift=0.2 * DOWN))
        self.legende(
            "C'est la forme générale du second degré : a z² + b z + c = 0.",
            "Repérons a, b et c dans NOTRE équation, un par un.",
        )
        self.pose(2.8)

        self.etape("q1-a-implicite")
        lab_a = MathTex("a = 1", font_size=40, color=COL_A).move_to(
            3.3 * LEFT + 0.15 * UP
        )
        cadre_a = self.entoure(eq[0], COL_A)
        self.play(FadeIn(lab_a, shift=0.15 * UP))
        fleche_a = self.fleche_vers(eq[0], lab_a, COL_A)
        self.legende(
            "Devant z², rien n'est écrit : c'est un 1 INVISIBLE. La règle",
            "du zéro implicite s'applique aussi aux coefficients : a = 1.",
        )
        self.pose(3.4)

        self.etape("q1-coefficients")
        lab_b = MathTex("b = -2", font_size=40, color=COL_B).next_to(
            lab_a, RIGHT, buff=1.4
        )
        lab_c = MathTex("c = 4", font_size=40, color=COL_C).next_to(
            lab_b, RIGHT, buff=1.4
        )
        cadre_b = self.entoure(eq[1], COL_B)
        self.play(FadeIn(lab_b, shift=0.15 * UP))
        fleche_b = self.fleche_vers(eq[1], lab_b, COL_B)
        cadre_c = self.entoure(eq[4], COL_C)
        self.play(FadeIn(lab_c, shift=0.15 * UP))
        fleche_c = self.fleche_vers(eq[4], lab_c, COL_C)
        labels = VGroup(lab_a, lab_b, lab_c)
        warn = Text(
            "a, b, c : coefficients de l'équation — pas les points de l'énoncé.",
            font_size=20, color=BAC_ERROR,
        ).next_to(labels, DOWN, buff=0.4)
        self.play(FadeIn(warn, shift=0.1 * UP))
        self.legende(
            "Devant z il y a −2, AVEC son signe : c'est b. Tout seul, il y a",
            "4 : c'est c. Ces a, b, c désignent les coefficients — pas les",
            "points A, B, C de l'énoncé, même si les lettres se ressemblent.",
        )
        self.pose(3.6)

        self.etape("q1-outil-discriminant")
        cadres = VGroup(cadre_a, cadre_b, cadre_c)
        fleches = VGroup(fleche_a, fleche_b, fleche_c)
        self.play(FadeOut(forme), FadeOut(cadres), FadeOut(fleches), FadeOut(warn))
        delta_def = MathTex(
            r"\Delta = ", "b", r"^2 - 4\,", "a", r"\,", "c", font_size=46
        ).shift(1.0 * DOWN + 3.4 * LEFT)
        delta_def[1].set_color(COL_B)
        delta_def[3].set_color(COL_A)
        delta_def[5].set_color(COL_C)
        cadre_outil = SurroundingRectangle(
            delta_def, color=BAC_ACCENT, buff=0.22, corner_radius=0.1
        )
        self.play(labels.animate.shift(0.55 * UP), Write(delta_def), Create(cadre_outil))
        self.legende(
            "L'outil du second degré : le discriminant. Sa formule réutilise",
            "nos trois coefficients — les couleurs montrent où chacun va.",
        )
        self.pose(3.0)

        self.etape("q1-sens-delta")
        cas = VGroup(
            Text("Δ > 0 → deux racines réelles", font_size=20, color=BAC_INK_SOFT),
            Text("Δ = 0 → une racine double", font_size=20, color=BAC_INK_SOFT),
            Text("Δ < 0 → deux racines complexes conjuguées", font_size=20, color=BAC_INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        cas.next_to(cadre_outil, RIGHT, buff=0.55).align_to(cadre_outil, UP)
        surligne = SurroundingRectangle(cas[2], color=BAC_WARNING, buff=0.1, corner_radius=0.08)
        self.play(FadeIn(cas[0]), FadeIn(cas[1]), FadeIn(cas[2]))
        self.play(Create(surligne))
        self.legende(
            "Que SIGNIFIE Δ ? Un détecteur : son signe annonce combien de",
            "racines existent, et de quel type. On le calcule en premier —",
            "il nous dit à quoi nous attendre.",
        )
        self.pose(3.8)

        self.etape("q1-calcul-b2")
        self.play(FadeOut(cas), FadeOut(surligne))
        c1 = MathTex("b", "^2 = (-2)^2 = 4", font_size=42)
        c1[0].set_color(COL_B)
        c1.next_to(cadre_outil, RIGHT, buff=1.0).align_to(cadre_outil, UP)
        self.play(Write(c1))
        self.legende(
            "D'abord b au carré : (−2) au carré, c'est (−2) fois (−2),",
            "donc 4 — moins fois moins donne plus.",
        )
        self.pose(2.8)

        self.etape("q1-calcul-4ac")
        c2 = MathTex(r"4\,", "a", r"\,", "c", r" = 4 \times 1 \times 4 = 16", font_size=42)
        c2[1].set_color(COL_A)
        c2[3].set_color(COL_C)
        c2.next_to(c1, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c2))
        self.legende("Puis 4 a c : 4 fois 1, ça fait 4, et 4 fois 4, ça fait 16.")
        self.pose(2.6)

        self.etape("q1-calcul-delta")
        c3 = MathTex(r"\Delta = 4 - 16 = -12", font_size=46, color=BAC_ACCENT_STRONG)
        c3.next_to(c2, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c3))
        self.legende(
            "Delta = 4 moins 16 = moins 12. Négatif : deux racines",
            "complexes conjuguées, notre troisième cas.",
        )
        self.pose(3.0)

        self.etape("q1-racine-delta")
        self.play(
            FadeOut(eq), FadeOut(labels), FadeOut(delta_def), FadeOut(cadre_outil),
            FadeOut(c1), FadeOut(c2),
            c3.animate.to_edge(LEFT, buff=0.65).to_edge(UP, buff=1.3),
        )
        c4 = MathTex(r"\sqrt{12} = \sqrt{4\times 3} = 2\sqrt{3}", font_size=38).next_to(
            c3, DOWN, aligned_edge=LEFT, buff=0.5
        )
        c5 = MathTex(
            r"\Delta < 0 \implies \sqrt{\Delta} = i\sqrt{12} = 2i\sqrt{3}", font_size=40
        ).next_to(c4, DOWN, aligned_edge=LEFT, buff=0.45)
        rappel_i = MathTex(r"i^2 = -1", font_size=34, color=BAC_INK_SOFT).next_to(
            c5, RIGHT, buff=0.9
        )
        cadre_i = SurroundingRectangle(
            rappel_i, color=BAC_INK_MUTED, buff=0.15, corner_radius=0.08
        )
        self.play(Write(c4))
        self.play(Write(c5), FadeIn(rappel_i), Create(cadre_i))
        self.legende(
            "On simplifie la racine de 12 : 4 fois 3, racine de 4 c'est 2,",
            "donc 2 racine de 3. Delta négatif : on écrit sa racine avec i,",
            "puisque i² = −1 : 2i racine de 3.",
        )
        self.pose(3.6)

        self.etape("q1-formule")
        formule = MathTex(
            r"z = \dfrac{-b \pm \sqrt{\Delta}}{2a} = \dfrac{2 \pm 2i\sqrt{3}}{2}",
            font_size=42,
        ).next_to(c5, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(formule))
        self.legende(
            "La formule des racines : (−b ± racine de Delta) sur 2a. On",
            "remplace : b = −2 donc −b = 2 ; a = 1 donc 2a = 2.",
        )
        self.pose(3.2)

        self.etape("q1-simplifier")
        self.play(
            FadeOut(c3), FadeOut(c4), FadeOut(c5), FadeOut(rappel_i), FadeOut(cadre_i),
            formule.animate.shift(2.9 * UP),
        )
        simp = MathTex(
            r"\dfrac{2}{2} = 1", r"\qquad\qquad \dfrac{2\sqrt{3}}{2} = \sqrt{3}",
            font_size=42, color=BAC_ACCENT_STRONG,
        ).next_to(formule, DOWN, aligned_edge=LEFT, buff=0.6)
        self.play(Write(simp))
        self.legende(
            "On simplifie chaque morceau séparément : 2/2 = 1, et",
            "2√3/2 = √3. Aucune fraction ne reste à moitié réduite.",
        )
        self.pose(2.8)

        self.etape("q1-solutions")
        self.play(FadeOut(formule), FadeOut(simp))
        sols = MathTex(
            r"S = \left\{\,", r"1 - i\sqrt{3}", r"\ ;\ ", r"1 + i\sqrt{3}", r"\,\right\}",
            font_size=46, color=BAC_ACCENT,
        ).to_edge(LEFT, buff=0.85).shift(0.3 * UP)
        self.play(Write(sols), run_time=1.8)
        self.legende(
            "Deux solutions conjuguées : même partie réelle 1, parties",
            "imaginaires opposées. Question 1 terminée — 0,75 point.",
        )
        self.pose(3.0)

        self.etape("q1-retenir")
        z1_box = SurroundingRectangle(
            sols[1], color=BAC_WARNING, buff=0.12, corner_radius=0.08
        )
        self.play(Create(z1_box))
        self.legende(
            "Cette racine, 1 − i√3, est EXACTEMENT l'affixe a donnée pour",
            "le point A dans l'énoncé. Rien n'est laissé au hasard.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, sols, z1_box)))

    # ── Le plan complexe : on y place A ─────────────────────────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-2, 4, 1],
            y_range=[-3.5, 2.5, 1],
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
        ).shift(3.15 * RIGHT + 0.35 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(3.4), UP, buff=0.12
        )
        im_lbl = Text("axe imaginaire", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.1j), RIGHT, buff=0.16
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self._graduations(plan, [-1, 1, 2, 3], [-3, -2, -1, 1])
        self.legende(
            "Le plan complexe : l'axe horizontal porte la partie réelle,",
            "l'axe vertical la partie imaginaire. Chaque affixe = un point.",
        )
        self.pose(3.0)

        self.etape("plan-A")
        guide_x = DashedLine(plan.n2p(0), plan.n2p(1), color=BAC_ACCENT, stroke_width=3)
        guide_y = DashedLine(plan.n2p(1), plan.n2p(A_AFF), color=BAC_ACCENT, stroke_width=3)
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        a_lbl = MathTex(r"A(a)", font_size=34, color=COL_PT_A).next_to(
            a_dot, UP + RIGHT, buff=0.1
        )
        self.play(Create(guide_x))
        self.play(Create(guide_y))
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.legende(
            "Pour a = 1 − i√3 : un pas vers la DROITE (partie réelle +1),",
            "puis un peu plus d'un pas et demi vers le BAS",
            "(partie imaginaire −√3, environ −1,73).",
        )
        self.pose(3.4)
        self.play(FadeOut(guide_x), FadeOut(guide_y))
        self.efface_legende()
        return plan, a_dot, a_lbl

    # ── Q2 a) : vérification d'une égalité d'affixes ────────────────
    def chapitre_q2(self, plan):
        badge = self.bandeau_question("2) a)", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        c_dot = Dot(plan.n2p(C_AFF), color=COL_PT_C, radius=0.07)
        c_lbl = MathTex("C(c)", font_size=32, color=COL_PT_C).next_to(
            c_dot, UP + RIGHT, buff=0.1
        )
        d_dot = Dot(plan.n2p(D_AFF), color=COL_PT_D, radius=0.07)
        # D est sur l'axe réel ; l'espace libre est en bas-droite (le haut
        # est réservé à l'étiquette du vecteur DC).
        d_lbl = MathTex("D(d)", font_size=32, color=COL_PT_D).next_to(
            d_dot, DOWN + RIGHT, buff=0.12
        )
        self.play(FadeIn(c_dot, scale=1.6), Write(c_lbl))
        self.play(FadeIn(d_dot, scale=1.6), Write(d_lbl))
        but = MathTex(r"a - d \overset{?}{=} -\sqrt{3}\,(c-d)", font_size=40)
        self.ecrit(but)
        self.legende(
            "On place C et D. On VÉRIFIE une égalité entre affixes : a",
            "moins d, comparé à moins racine de trois fois (c moins d).",
        )
        self.pose(3.4)

        self.etape("q2-calcul-a-moins-d")
        m1 = MathTex(
            r"a-d = (1-i\sqrt{3})-(-2+2\sqrt{3}) = (3-2\sqrt{3})-i\sqrt{3}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On soustrait le réel d : 1 + 2 − 2√3 pour la partie réelle,",
            "−√3 reste pour la partie imaginaire.",
        )
        self.pose(3.0)

        self.etape("q2-calcul-c-moins-d")
        m2 = MathTex(
            r"c-d = (\sqrt{3}+i)-(-2+2\sqrt{3}) = (2-\sqrt{3})+i",
            font_size=34,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Même soustraction pour c moins d : 2 − √3 en partie réelle,",
            "1 en partie imaginaire.",
        )
        self.pose(2.8)

        self.etape("q2-calcul-membre-droit")
        m3 = MathTex(
            r"-\sqrt{3}\,(c-d) = -\sqrt{3}(2-\sqrt{3}) - \sqrt{3}\,i = (3-2\sqrt{3})-i\sqrt{3}",
            font_size=30,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On développe : moins racine de 3 fois (2 moins racine de 3)",
            "donne 3 moins 2 racine de 3.",
        )
        self.pose(3.0)

        self.etape("q2-conclusion")
        concl = MathTex(r"a-d = -\sqrt{3}\,(c-d)", font_size=42, color=BAC_SUCCESS)
        self.ecrit(concl, buff=0.5)
        self.legende(
            "Les deux membres coïncident : (3 − 2√3) − i√3 des deux",
            "côtés. L'égalité est VÉRIFIÉE — 0,5 point.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return c_dot, c_lbl, d_dot, d_lbl

    # ── Q2 b) : alignement de A, C, D ─────────────────────────────────
    def chapitre_q3(self, plan, a_dot, c_dot, c_lbl, d_dot, d_lbl):
        badge = self.bandeau_question("2) b)", "0,25 pt")
        self.ardoise()

        self.etape("q3-sens-vecteur-affixe")
        rappel = MathTex(
            r"z_{\overrightarrow{MN}} = \text{affixe}(N) - \text{affixe}(M)",
            font_size=34,
        )
        self.ecrit(rappel)
        vec_da = Line(
            plan.n2p(D_AFF), plan.n2p(A_AFF), color=COL_PT_A, stroke_width=3
        ).add_tip(tip_width=0.14, tip_length=0.14)
        vec_dc = Line(
            plan.n2p(D_AFF), plan.n2p(C_AFF), color=COL_PT_C, stroke_width=3
        ).add_tip(tip_width=0.14, tip_length=0.14)
        lbl_da = MathTex(r"\overrightarrow{DA}", font_size=26, color=COL_PT_A).next_to(
            vec_da.get_center(), LEFT, buff=0.15
        )
        # Posée aux 3/4 du vecteur (côté C) — jamais sur l'étiquette de D.
        lbl_dc = MathTex(r"\overrightarrow{DC}", font_size=26, color=COL_PT_C).next_to(
            vec_dc.point_from_proportion(0.72), RIGHT, buff=0.16
        )
        self.play(Create(vec_da), Create(vec_dc))
        self.play(FadeIn(lbl_da), FadeIn(lbl_dc))
        self.legende(
            "Que SIGNIFIE une différence d'affixes ? L'affixe du VECTEUR :",
            "a − d est l'affixe de DA, c − d celle de DC — les deux",
            "flèches tracées depuis D.",
        )
        self.pose(3.6)

        self.etape("q3-colinearite")
        rel = MathTex(
            r"\overrightarrow{DA} = -\sqrt{3}\ \overrightarrow{DC}",
            font_size=40, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(rel, buff=0.6)
        self.legende(
            "Coefficient RÉEL : les deux vecteurs sont COLINÉAIRES. Le",
            "signe négatif dit qu'ils pointent en sens opposés — regarde",
            "D, entre les deux flèches.",
        )
        self.pose(3.4)

        self.etape("q3-conclusion")
        droite = Line(plan.n2p(A_AFF), plan.n2p(C_AFF), color=BAC_SUCCESS, stroke_width=2.5)
        self.play(Create(droite))
        self.bring_to_front(a_dot, d_dot, c_dot)
        concl = MathTex(r"A,\ C,\ D\ \text{alignés}", font_size=42, color=BAC_SUCCESS)
        self.ecrit(concl, buff=0.5)
        self.legende(
            "Deux vecteurs colinéaires issus de D : A, C et D sont",
            "ALIGNÉS — la droite passe exactement par les trois",
            "points. 0,25 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(
            FadeOut(
                VGroup(
                    badge, vec_da, vec_dc, lbl_da, lbl_dc,
                    droite, c_dot, c_lbl, d_dot, d_lbl,
                )
            )
        )

    # ── Q3 : la rotation, traduite en écriture complexe ───────────────
    def chapitre_q4(self, plan, a_dot, a_lbl):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q4-enonce")
        txt1 = Text("M(z) et M'(z'), image de M par la rotation R,", font_size=26)
        txt2 = Text("de centre O et d'angle −π/3.", font_size=26)
        intro_grp = VGroup(txt1, txt2).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(intro_grp)
        but = MathTex(r"\text{Vérifier que}\ z' = \dfrac12\,a\,z", font_size=38)
        self.ecrit(but, buff=0.5)
        self.legende(
            "On vérifie une formule qui transforme n'importe quel point :",
            "une rotation de centre O, d'angle −π/3.",
        )
        self.pose(3.4)

        self.etape("q4-sens-rotation")
        m_aff = 1.8 * complex(np.cos(5 * np.pi / 6), np.sin(5 * np.pi / 6))
        mp_aff = m_aff * complex(np.cos(-np.pi / 3), np.sin(-np.pi / 3))
        m_dot = Dot(plan.n2p(m_aff), color=BAC_WARNING, radius=0.07)
        m_lbl = MathTex("M", font_size=30, color=BAC_WARNING).next_to(m_dot, UP, buff=0.1)
        self.play(FadeIn(m_dot, scale=1.6), Write(m_lbl))
        rayon = float(np.linalg.norm(plan.n2p(m_aff) - origine))
        arc = Arc(
            radius=rayon, start_angle=float(np.angle(m_aff)), angle=-PI / 3,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        mp_dot = Dot(plan.n2p(m_aff), color=BAC_WARNING, radius=0.07)
        self.play(Create(arc, run_time=3.0), MoveAlongPath(mp_dot, arc, run_time=3.0))
        mp_lbl = MathTex(r"M'", font_size=30, color=BAC_WARNING).next_to(
            mp_dot, RIGHT, buff=0.12
        )
        self.play(Write(mp_lbl))
        om_r = Line(origine, plan.n2p(m_aff), color=BAC_WARNING, stroke_width=2.5)
        omp_r = Line(origine, plan.n2p(mp_aff), color=BAC_WARNING, stroke_width=2.5)
        # Rotation d'angle NÉGATIF : le secteur non réflexe va de OM' (90°)
        # vers OM (150°) dans le sens trigonométrique — d'où l'ordre inversé.
        ang = Angle(
            omp_r, om_r, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3
        )
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{3}", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.42 * direction
        )
        self.play(Create(om_r), Create(omp_r))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE une rotation ? M tourne autour de O, à distance",
            "constante, d'un angle −π/3 (sens des aiguilles), et arrive",
            "en M'. Le rayon ne change pas : c'est ça, une rotation.",
        )
        self.pose(3.8)

        self.etape("q4-formule")
        step1 = MathTex(r"z' = e^{i\theta}\,z = e^{-i\pi/3}\,z", font_size=40)
        self.ecrit(step1)
        self.legende(
            "La rotation de centre O et d'angle θ = −π/3 s'écrit",
            "z' = e^{iθ} z = e^{−iπ/3} z.",
        )
        self.pose(3.0)

        self.etape("q4-exponentielle")
        step2 = MathTex(
            r"e^{-i\pi/3} = \cos\left(-\tfrac{\pi}{3}\right)+i\sin\left(-\tfrac{\pi}{3}\right)"
            r" = \tfrac12 - \tfrac{\sqrt{3}}{2}\,i",
            font_size=34,
        )
        self.ecrit(step2, buff=0.5)
        self.legende(
            "Forme algébrique de l'exponentielle : cos(−π/3) = 1/2,",
            "sin(−π/3) = −√3/2.",
        )
        self.pose(3.2)

        self.etape("q4-demi-a")
        step3 = MathTex(
            r"\dfrac12\,a = \dfrac12\,(1-i\sqrt{3}) = \dfrac12 - \dfrac{\sqrt{3}}{2}\,i",
            font_size=36,
        )
        self.ecrit(step3, buff=0.5)
        self.legende(
            "Un demi a : mêmes parties réelle et imaginaire que",
            "e puissance moins i pi sur 3.",
        )
        self.pose(3.0)

        self.etape("q4-conclusion")
        step4 = MathTex(
            r"\dfrac12\,a = e^{-i\pi/3} \implies z' = \dfrac12\,a\,z",
            font_size=40, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(step4, buff=0.6)
        self.legende(
            "Les deux nombres coïncident : la formule z' = un demi a z",
            "est VÉRIFIÉE — 0,5 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(
            FadeOut(
                VGroup(
                    badge, m_dot, m_lbl, mp_dot, mp_lbl, arc,
                    om_r, omp_r, ang, ang_lbl, a_dot, a_lbl,
                )
            )
        )

    # ── Q4 a) : h = i p ────────────────────────────────────────────
    def chapitre_q5(self, plan):
        badge = self.bandeau_question("4) a)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q5-enonce")
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=34, color=COL_PT_B).next_to(
            b_dot, UP + RIGHT, buff=0.1
        )
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        txt = Text("H = image de B par R ; P d'affixe p = a − c.", font_size=26)
        self.ecrit(txt)
        but = MathTex(r"\text{Vérifier que } h = i\,p", font_size=38)
        self.ecrit(but, buff=0.5)
        self.legende(
            "On place B. H est l'image de B par la rotation R ; P a pour",
            "affixe a − c. On veut vérifier h = i p.",
        )
        self.pose(3.6)

        self.etape("q5-formule-h")
        f1 = MathTex(r"h = \dfrac12\,a\,b = \dfrac12\,(1-i\sqrt{3})(2+2i)", font_size=36)
        self.ecrit(f1, buff=0.5)
        self.legende(
            "H est l'image de B : on réutilise la formule z' = un demi a z",
            "de la question précédente, avec z = b.",
        )
        self.pose(3.2)

        self.etape("q5-developper")
        f2 = MathTex(
            r"(1-i\sqrt{3})(2+2i) = 2+2i-2i\sqrt{3}-2i^2\sqrt{3}", font_size=32
        )
        self.ecrit(f2, buff=0.5)
        f3 = MathTex(r"= (2+2\sqrt{3}) + i\,(2-2\sqrt{3})", font_size=34)
        self.ecrit(f3, buff=0.4)
        self.legende(
            "On développe le produit, puis on remplace i² par −1 :",
            "le terme −2i²√3 devient +2√3.",
        )
        self.pose(3.4)

        self.etape("q5-h-simplifie-placer")
        f4 = MathTex(
            r"h = (1+\sqrt{3}) + i\,(1-\sqrt{3})", font_size=40, color=BAC_ACCENT_STRONG
        )
        self.ecrit(f4, buff=0.5)
        h_dot = Dot(plan.n2p(H_AFF), color=COL_PT_H, radius=0.08)
        h_lbl = MathTex("H(h)", font_size=34, color=COL_PT_H).next_to(
            h_dot, RIGHT, buff=0.12
        )
        self.play(FadeIn(h_dot, scale=1.6), Write(h_lbl))
        self.legende(
            "On multiplie par un demi : h = (1+√3) + i(1−√3).",
            "Voici H, placé dans le plan.",
        )
        self.pose(3.2)

        self.etape("q5-calcul-p-placer")
        f5 = MathTex(
            r"p = a-c = (1-i\sqrt{3})-(\sqrt{3}+i) = (1-\sqrt{3}) - i\,(1+\sqrt{3})",
            font_size=30,
        )
        self.ecrit(f5, buff=0.5)
        p_dot = Dot(plan.n2p(P_AFF), color=COL_PT_P, radius=0.08)
        # Le segment OP arrive par le haut-droite : l'étiquette va à GAUCHE.
        p_lbl = MathTex("P(p)", font_size=34, color=COL_PT_P).next_to(
            p_dot, LEFT, buff=0.14
        )
        self.play(FadeIn(p_dot, scale=1.6), Write(p_lbl))
        self.legende(
            "p = a − c : on soustrait, ligne par ligne. Voici P — bien",
            "plus bas dans le plan.",
        )
        self.pose(3.4)

        self.etape("q5-verification-ip")
        f6 = MathTex(
            r"i\,p = i\,(1-\sqrt{3}) - i^2(1+\sqrt{3}) = (1+\sqrt{3})+i\,(1-\sqrt{3}) = h",
            font_size=28, color=BAC_SUCCESS,
        )
        self.ecrit(f6, buff=0.5)
        self.legende(
            "i fois p : on développe, i² devient −1, et on retrouve",
            "EXACTEMENT h. L'égalité h = i p est vérifiée.",
        )
        self.pose(3.4)

        self.etape("q5-visuel-quart-tour")
        op = Line(origine, plan.n2p(P_AFF), color=COL_PT_P, stroke_width=3)
        oh = Line(origine, plan.n2p(H_AFF), color=COL_PT_H, stroke_width=3)
        rayon_p = float(np.linalg.norm(plan.n2p(P_AFF) - origine))
        arc_quart = Arc(
            radius=rayon_p, start_angle=float(np.angle(P_AFF)), angle=PI / 2,
            arc_center=origine, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        self.play(Create(op))
        self.play(Create(arc_quart, run_time=2.4))
        self.play(Create(oh))
        self.legende(
            "Multiplier par i, c'est tourner d'un quart de tour : l'arc part",
            "de OP et arrive exactement sur OH — la vérification, en image.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, b_dot, b_lbl)))
        return h_dot, h_lbl, p_dot, p_lbl, op, oh

    # ── Q4 b) : OHP rectangle isocèle en O ────────────────────────────
    def chapitre_q6(self, plan, h_dot, h_lbl, p_dot, p_lbl, op, oh):
        badge = self.bandeau_question("4) b)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q6-enonce")
        goal = MathTex(
            r"\text{Montrer que } OHP \text{ est rectangle et isocèle en } O",
            font_size=32,
        )
        self.ecrit(goal)
        self.legende(
            "On exploite l'égalité h = i p : elle contient DEUX",
            "informations géométriques, sur les longueurs et sur les angles.",
        )
        self.pose(3.2)

        self.etape("q6-module")
        m1 = MathTex(
            r"|h| = |i\,p| = |i|\times|p| = |p|\ \implies\ OH = OP", font_size=32
        )
        self.ecrit(m1, buff=0.5)
        self.play(
            op.animate.set_color(BAC_ACCENT), oh.animate.set_color(BAC_ACCENT), run_time=1.0
        )
        self.legende(
            "|i| = 1 : multiplier par i NE CHANGE PAS la distance à O.",
            "Donc OH = OP — les deux segments, même couleur, même longueur.",
        )
        self.pose(3.6)

        self.etape("q6-argument")
        m2 = MathTex(
            r"\dfrac{h}{p} = i\ \implies\ \arg\dfrac{h}{p} = \dfrac{\pi}{2}"
            r" \equiv \left(\overrightarrow{OP},\overrightarrow{OH}\right)",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        ang = Angle(op, oh, radius=0.5, other_angle=False, color=BAC_WARNING, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=26, color=BAC_WARNING).move_to(
            milieu + 0.4 * direction
        )
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "L'argument du quotient h/p mesure l'angle entre OP et OH :",
            "ici π/2 — un angle DROIT en O.",
        )
        self.pose(3.6)

        self.etape("q6-conclusion")
        hp = Line(plan.n2p(H_AFF), plan.n2p(P_AFF), color=BAC_INK, stroke_width=3)
        concl = MathTex(
            r"OH=OP\ \text{et angle droit en } O\ \implies\ OHP\ \text{rectangle isocèle en } O",
            font_size=26, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.5)
        self.play(Create(hp))
        triangle = VGroup(op, oh, hp)
        self.play(triangle.animate.set_color(BAC_SUCCESS), run_time=1.0)
        self.legende(
            "Isocèle en O (OH = OP) et angle droit en O : le triangle",
            "OHP est RECTANGLE ISOCÈLE EN O. 0,5 point — exercice terminé.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Δ est un détecteur : son signe annonce le type des racines.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Une différence d'affixes est l'affixe du vecteur correspondant.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Coefficient réel entre deux vecteurs ⇒ colinéaires ⇒ alignés.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Rotation de centre O : on MULTIPLIE l'affixe par e^(iθ).",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• |produit| = produit des modules · arg(quotient) = angle entre vecteurs.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Isocèle + angle droit au sommet = triangle rectangle isocèle.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=22, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
