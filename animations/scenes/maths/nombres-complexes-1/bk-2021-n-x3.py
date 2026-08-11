"""Explication animée v4 — Bac 2021 SN (SExp), Exercice 3 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2021-n-x3 (vérifiée, AlloSchool NS22F, Exercice 3 — Composantes
fait autorité pour le numéro, le corps du scan porte une coquille "Exercice
2" ; 5 points).

Dix questions, cinq parties numérotées : 1) équation du second degré ;
2) a) forme algébrique de a = e^{iπ/6} b) vérifier ā b = √3 ; 3) homothétie
de centre O, rapport √3 (B image de A) ; 4) a) rotation de centre A et
d'angle π/2, formule b) D image de C, d = a+1 c) ADIO est un losange ;
5) a) d − b factorisé, argument b) 1 − b forme trigonométrique c) mesure
de l'angle (BI, BD).

a = √3/2 + i/2 (= e^{iπ/6}), b = 3/2 + i√3/2, c = ā = √3/2 − i/2,
d = a + 1, I d'affixe 1.

Standard v4 = DESIGN.md : règle du zéro implicite, couche de sens avant
chaque calcul (exponentielle = point du cercle unité, conjugué = reflet,
homothétie = extension du coefficient réel déjà connu, rotation décentrée
= arc de trajectoire + angle dessiné), signaling dans la formule, zones
d'écran dures. L'homothétie est la notion neuve de ce sujet (SCOPE NOTE
de bank.yaml) : elle reçoit son propre temps de sens, ancré à ce qui est
déjà connu (coefficient réel ⇒ vecteurs colinéaires).

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2021-n-x3.py
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

# Coefficients de l'ÉQUATION de Q1 (forme générale a z² + b z + c = 0) —
# collision de lettres à SIGNALER : les nombres complexes de l'énoncé
# s'appellent AUSSI a et b (DESIGN.md §2 : rouge réservé au piège).
COL_A, COL_B, COL_C = BAC_ACCENT_STRONG, BAC_WARNING, BAC_SUCCESS

# Identité visuelle stable des points de la figure (distincte du triplet
# ci-dessus) : A sarcelle, B sarcelle claire, C gris (conjugué = reflet),
# D sarcelle forte (image par rotation), I or.
COL_PT_A, COL_PT_B, COL_PT_C = BAC_ACCENT, BAC_ACCENT_LIGHT, BAC_INK_MUTED
COL_PT_D, COL_PT_I = BAC_ACCENT_STRONG, BAC_WARNING

NARRATION = {
    "titre": "Exercice trois du bac deux mille vingt et un, session normale, "
    "sciences expérimentales : nombres complexes, sur cinq points. Dix "
    "questions, cinq parties : une équation, une homothétie, une rotation, "
    "un losange, un angle orienté.",
    "q1": "Question un. On identifie les coefficients — y compris le 1 "
    "invisible devant z carré — on calcule le discriminant, et on résout "
    "dans les complexes. La racine à partie imaginaire positive reviendra "
    "sous une autre écriture à la question suivante.",
    "q2a": "Question deux a. a est donné en écriture exponentielle : le "
    "point du cercle unité à l'angle pi sur six. On lit sa forme algébrique "
    "avec les valeurs remarquables du cosinus et du sinus.",
    "q2b": "Question deux b. Le conjugué, c'est le reflet dans l'axe réel. "
    "On vérifie que a barre fois b est un réel pur : racine de trois.",
    "q3": "Question trois. Une homothétie de centre O et de rapport réel k "
    "multiplie l'affixe par k — l'extension directe de l'idée déjà connue : "
    "un coefficient réel rend deux vecteurs colinéaires, ici depuis le "
    "centre lui-même. On montre que b égale racine de trois fois a.",
    "q4a": "Question quatre a. Une rotation de centre A, cette fois, pas "
    "centre O : on tourne autour de A, d'un quart de tour direct. La "
    "formule décentrée : z prime moins a égale e puissance i thêta fois "
    "(z moins a).",
    "q4b": "Question quatre b. On applique la formule au point C : D est "
    "son image par la rotation, et son affixe vaut a plus un.",
    "q4c": "Question quatre c. Deux vecteurs égaux font un parallélogramme ; "
    "deux côtés adjacents égaux en plus en font un losange. A D I O est un "
    "losange.",
    "q5a": "Question cinq a. On vérifie une factorisation de d moins b, "
    "puis on en déduit son argument : un coefficient réel positif ne "
    "change pas l'argument, il suffit de connaître celui de un moins i.",
    "q5b": "Question cinq b. Un moins b, sous forme trigonométrique : "
    "module un, argument moins deux pi sur trois.",
    "q5c": "Question cinq c. L'argument d'un quotient d'affixes-vecteurs "
    "est l'angle entre les deux vecteurs. On soustrait deux arguments déjà "
    "connus pour obtenir l'angle B I, B D.",
}

A_AFF = complex(np.sqrt(3) / 2, 0.5)
B_AFF = complex(1.5, np.sqrt(3) / 2)
C_AFF = A_AFF.conjugate()
D_AFF = A_AFF + 1
I_AFF = complex(1, 0)


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_q1()
        plan, a_dot, a_lbl = self.chapitre_q2()
        c_dot, c_lbl = self.chapitre_q3(plan, a_dot)
        a_lbl2, c_lbl2, b_dot, b_lbl = self.chapitre_q4(plan, a_dot, a_lbl, c_dot, c_lbl)
        d_dot = self.chapitre_q5(plan, a_dot, c_dot)
        d_lbl = self.chapitre_q6(plan, a_dot, c_dot, d_dot)
        i_dot, i_lbl = self.chapitre_q7(plan, a_dot, a_lbl2, d_dot, d_lbl)
        self.chapitre_q8(plan, b_dot, d_dot)
        self.chapitre_q9(plan, b_dot)
        self.chapitre_q10(plan, b_dot, i_dot, d_dot)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2021 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 3 — 5 points · sujet officiel NS22F",
        )

    # ── Q1 : plein écran (pas encore de figure) ───────────────────
    def chapitre_q1(self):
        badge = self.bandeau_question("1)", "0,75 pt")

        self.etape("q1-enonce")
        eq = MathTex("z^2", "-", r"\sqrt{3}", "z", "+", "1", "= 0", font_size=54).shift(
            2.3 * UP
        )
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
        lab_b = MathTex(r"b = -\sqrt{3}", font_size=40, color=COL_B).next_to(
            lab_a, RIGHT, buff=1.3
        )
        lab_c = MathTex("c = 1", font_size=40, color=COL_C).next_to(
            lab_b, RIGHT, buff=1.3
        )
        cadre_bc = self.entoure(VGroup(eq[1], eq[2]), COL_B)
        self.play(FadeIn(lab_b, shift=0.15 * UP))
        fleche_b = self.fleche_vers(cadre_bc, lab_b, COL_B)
        cadre_c = self.entoure(eq[5], COL_C)
        self.play(FadeIn(lab_c, shift=0.15 * UP))
        fleche_c = self.fleche_vers(eq[5], lab_c, COL_C)
        labels = VGroup(lab_a, lab_b, lab_c)
        warn = Text(
            "a, b, c : coefficients de l'équation — les NOMBRES a et b de",
            font_size=18, color=BAC_ERROR,
        ).next_to(labels, DOWN, buff=0.35)
        warn2 = Text(
            "l'énoncé (questions suivantes) sont d'autres objets, même lettre.",
            font_size=18, color=BAC_ERROR,
        ).next_to(warn, DOWN, buff=0.08)
        self.play(FadeIn(warn, shift=0.1 * UP), FadeIn(warn2))
        self.legende(
            "Devant z il y a moins racine de trois, AVEC son signe : c'est b.",
            "Tout seul, il y a 1 : c'est c. Ces a, b, c coefficients ne sont",
            "PAS les nombres a et b qu'on va bientôt rencontrer.",
        )
        self.pose(3.8)

        self.etape("q1-outil-discriminant")
        cadres = VGroup(cadre_a, cadre_bc, cadre_c)
        fleches = VGroup(fleche_a, fleche_b, fleche_c)
        self.play(FadeOut(forme), FadeOut(cadres), FadeOut(fleches), FadeOut(warn), FadeOut(warn2))
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
        c1 = MathTex("b", r"^2 = (-\sqrt{3})^2 = 3", font_size=42)
        c1[0].set_color(COL_B)
        c1.next_to(cadre_outil, RIGHT, buff=1.0).align_to(cadre_outil, UP)
        self.play(Write(c1))
        self.legende(
            "D'abord b au carré : moins racine de trois, au carré,",
            "redevient positif : 3.",
        )
        self.pose(2.8)

        self.etape("q1-calcul-4ac")
        c2 = MathTex(r"4\,", "a", r"\,", "c", r" = 4 \times 1 \times 1 = 4", font_size=42)
        c2[1].set_color(COL_A)
        c2[3].set_color(COL_C)
        c2.next_to(c1, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c2))
        self.legende("Puis 4 a c : 4 fois 1, fois 1, reste 4.")
        self.pose(2.6)

        self.etape("q1-calcul-delta")
        c3 = MathTex(r"\Delta = 3 - 4 = -1", font_size=46, color=BAC_ACCENT_STRONG)
        c3.next_to(c2, DOWN, aligned_edge=LEFT, buff=0.45)
        self.play(Write(c3))
        self.legende(
            "Delta = 3 moins 4 = moins 1. Négatif : deux racines",
            "complexes conjuguées, notre troisième cas.",
        )
        self.pose(3.0)

        self.etape("q1-racine-delta")
        self.play(
            FadeOut(eq), FadeOut(labels), FadeOut(delta_def), FadeOut(cadre_outil),
            FadeOut(c1), FadeOut(c2),
            c3.animate.to_edge(LEFT, buff=0.65).to_edge(UP, buff=1.3),
        )
        c4 = MathTex(
            r"\Delta < 0 \implies \sqrt{\Delta} = i", font_size=42
        ).next_to(c3, DOWN, aligned_edge=LEFT, buff=0.5)
        rappel_i = MathTex(r"i^2 = -1", font_size=34, color=BAC_INK_SOFT).next_to(
            c4, RIGHT, buff=0.9
        )
        cadre_i = SurroundingRectangle(
            rappel_i, color=BAC_INK_MUTED, buff=0.15, corner_radius=0.08
        )
        self.play(Write(c4), FadeIn(rappel_i), Create(cadre_i))
        self.legende(
            "Delta négatif : on écrit sa racine avec i, puisque i² = −1.",
            "Ici racine de moins 1, c'est exactement i.",
        )
        self.pose(3.4)

        self.etape("q1-formule")
        formule = MathTex(
            r"z = \dfrac{-b \pm \sqrt{\Delta}}{2a} = \dfrac{\sqrt{3} \pm i}{2}"
            r" = \dfrac{\sqrt{3}}{2} \pm \dfrac12\,i",
            font_size=40,
        ).next_to(c4, DOWN, aligned_edge=LEFT, buff=0.55)
        self.play(Write(formule))
        self.legende(
            "La formule des racines : (−b ± racine de Delta) sur 2a. On",
            "remplace : −b = racine de trois ; 2a = 2 — déjà réduite.",
        )
        self.pose(3.4)

        self.etape("q1-solutions")
        self.play(FadeOut(c3), FadeOut(c4), FadeOut(rappel_i), FadeOut(cadre_i), FadeOut(formule))
        sols = MathTex(
            r"S = \left\{\,", r"\dfrac{\sqrt3}{2}-\dfrac12 i", r"\ ;\ ",
            r"\dfrac{\sqrt3}{2}+\dfrac12 i", r"\,\right\}",
            font_size=42, color=BAC_ACCENT,
        ).to_edge(LEFT, buff=0.85).shift(0.3 * UP)
        self.play(Write(sols), run_time=1.8)
        self.legende(
            "Deux solutions conjuguées : même partie réelle racine de trois",
            "sur deux, parties imaginaires opposées. 0,75 point.",
        )
        self.pose(3.0)

        self.etape("q1-retenir")
        z1_box = SurroundingRectangle(sols[3], color=BAC_WARNING, buff=0.12, corner_radius=0.08)
        self.play(Create(z1_box))
        self.legende(
            "Retiens la racine à partie imaginaire POSITIVE. Elle reviendra",
            "dans la question suivante, sous une écriture exponentielle.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.play(FadeOut(VGroup(badge, sols, z1_box)))

    # ── Q2 a) : a en forme algébrique + le plan complexe ────────────
    def chapitre_q2(self):
        badge = self.bandeau_question("2) a)", "0,25 pt")
        self.ardoise()

        self.etape("q2-enonce")
        a_def = MathTex(r"a = e^{i\pi/6}", font_size=44)
        self.ecrit(a_def)
        b_def = MathTex(
            r"b = \dfrac32 + i\,\dfrac{\sqrt3}{2}", font_size=34, color=BAC_INK_SOFT
        )
        self.ecrit(b_def, buff=0.5)
        but = Text("Écrire a sous forme algébrique.", font_size=26).next_to(
            b_def, DOWN, buff=0.5
        ).align_to(b_def, LEFT)
        self.play(FadeIn(but, shift=0.15 * UP))
        self.legende(
            "a et b sont deux nombres complexes donnés. a est écrit en",
            "forme EXPONENTIELLE — b servira plus tard.",
        )
        self.pose(3.2)
        self.play(FadeOut(but))

        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-1.3, 2.2, 1],
            y_range=[-1.75, 1.75, 1],
            x_length=5.0,
            y_length=5.0,
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
        ).shift(2.5 * RIGHT + 0.3 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(2.1), DOWN, buff=0.18
        )
        # À DROITE de l'axe : à gauche, l'étiquette envahit la colonne de
        # travail et colle aux rappels d'énoncé (défaut d'audit).
        im_lbl = Text("axe imaginaire", font_size=20, color=BAC_INK_MUTED).next_to(
            plan.n2p(1.6j), RIGHT, buff=0.18
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self.legende(
            "Le plan complexe : l'axe horizontal porte la partie réelle,",
            "l'axe vertical la partie imaginaire.",
        )
        self.pose(2.8)

        self.etape("q2-sens-exponentielle")
        origine = plan.n2p(0)
        r_unit = float(np.linalg.norm(plan.n2p(1) - origine))
        cercle = Circle(radius=r_unit, color=BAC_INK_MUTED, stroke_width=1.5).move_to(origine)
        axe = Line(origine, plan.n2p(1))
        oa = Line(origine, plan.n2p(A_AFF))
        temp_dot = Dot(plan.n2p(A_AFF), color=BAC_INK_MUTED, radius=0.07)
        ang = Angle(axe, oa, radius=0.5, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - origine) / np.linalg.norm(milieu - origine)
        ang_lbl = MathTex(r"\tfrac{\pi}{6}", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.42 * direction
        )
        self.play(Create(cercle))
        self.play(FadeIn(temp_dot, scale=1.6))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE e^{iθ} ? Le POINT DU CERCLE UNITÉ à l'angle θ",
            "depuis l'axe réel. Ici θ = π/6, donné directement dans a.",
        )
        self.pose(3.6)

        self.etape("q2-calcul-valeurs")
        vals = MathTex(
            r"\cos\dfrac{\pi}{6} = \dfrac{\sqrt3}{2}, \quad \sin\dfrac{\pi}{6} = \dfrac12",
            font_size=36,
        )
        self.ecrit(vals, buff=0.5)
        self.legende(
            "Deux valeurs remarquables : cosinus de pi sur six et sinus",
            "de pi sur six.",
        )
        self.pose(3.0)

        self.etape("q2-forme-algebrique")
        a_alg = MathTex(
            r"a = \dfrac{\sqrt3}{2} + \dfrac12\,i", font_size=42, color=BAC_ACCENT_STRONG
        )
        self.ecrit(a_alg, buff=0.55)
        a_dot = temp_dot
        a_lbl = MathTex("a", font_size=32, color=COL_PT_A).next_to(a_dot, UP, buff=0.14)
        self.play(a_dot.animate.set_color(COL_PT_A), Write(a_lbl))
        self.legende(
            "On lit la forme algébrique : racine de trois sur deux, plus",
            "un demi i — EXACTEMENT la racine retenue à la question 1.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cercle, axe, ang, ang_lbl)))
        return plan, a_dot, a_lbl

    # ── Q2 b) : vérifier ā b = √3 ──────────────────────────────────
    def chapitre_q3(self, plan, a_dot):
        badge = self.bandeau_question("2) b)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q3-enonce")
        but = MathTex(r"\overline{a}\;b \overset{?}{=} \sqrt{3}", font_size=42)
        self.ecrit(but)
        self.legende(
            "On vérifie que a barre fois b est un réel : racine de trois.",
        )
        self.pose(2.8)

        self.etape("q3-sens-conjugue")
        miroir = DashedLine(
            plan.n2p(A_AFF), plan.n2p(A_AFF.conjugate()), color=BAC_INK_MUTED, stroke_width=2
        )
        c_dot = Dot(plan.n2p(A_AFF.conjugate()), color=COL_PT_C, radius=0.07)
        c_lbl = MathTex(r"\overline{a}", font_size=30, color=COL_PT_C).next_to(
            c_dot, DOWN + LEFT, buff=0.12
        )
        self.play(Create(miroir))
        self.play(FadeIn(c_dot, scale=1.6), Write(c_lbl))
        self.legende(
            "Que SIGNIFIE le conjugué ? Le REFLET dans l'axe réel : même",
            "partie réelle, partie imaginaire opposée.",
        )
        self.pose(3.4)
        self.play(FadeOut(miroir))

        self.etape("q3-calcul-a-barre")
        ab = MathTex(r"\overline{a} = \dfrac{\sqrt3}{2} - \dfrac12\,i", font_size=38)
        self.ecrit(ab, buff=0.55)
        self.legende("On change le signe de la partie imaginaire : moins un demi i.")
        self.pose(2.8)

        self.etape("q3-developper")
        dev = MathTex(
            r"\overline{a}\,b = \left(\dfrac{\sqrt3}{2}-\dfrac12 i\right)"
            r"\left(\dfrac32+i\dfrac{\sqrt3}{2}\right)"
            r" = \dfrac{3\sqrt3}{4} + i\dfrac34 - i\dfrac34 - i^2\dfrac{\sqrt3}{4}",
            font_size=26,
        )
        self.ecrit(dev, buff=0.5)
        self.legende("On développe le produit, terme à terme.")
        self.pose(3.4)

        self.etape("q3-simplifier")
        simp = MathTex(
            r"\overline{a}\,b = \dfrac{3\sqrt3}{4} + \dfrac{\sqrt3}{4} = \dfrac{4\sqrt3}{4} = \sqrt3",
            font_size=32,
        )
        self.ecrit(simp, buff=0.5)
        self.legende(
            "Les termes en i s'annulent ; on remplace i² par −1 dans le",
            "dernier terme, et on additionne : racine de trois.",
        )
        self.pose(3.4)

        self.etape("q3-conclusion")
        concl = MathTex(r"\overline{a}\,b = \sqrt3 \in \mathbb{R}", font_size=42, color=BAC_SUCCESS)
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Un RÉEL pur — 0,5 point. Cette valeur va tout de suite",
            "resservir pour la question suivante.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return c_dot, c_lbl

    # ── Q3 : l'homothétie de centre O (notion neuve de ce sujet) ───
    def chapitre_q4(self, plan, a_dot, a_lbl, c_dot, c_lbl):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q4-formaliser-points")
        a_lbl2 = MathTex("A(a)", font_size=32, color=COL_PT_A).next_to(a_dot, UP, buff=0.14)
        c_lbl2 = MathTex("C(c)", font_size=32, color=COL_PT_C).next_to(
            c_dot, DOWN + LEFT, buff=0.12
        )
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=32, color=COL_PT_B).next_to(b_dot, RIGHT, buff=0.14)
        self.play(ReplacementTransform(a_lbl, a_lbl2), ReplacementTransform(c_lbl, c_lbl2))
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl))
        self.legende(
            "On nomme officiellement les points : A d'affixe a, B d'affixe",
            "b, C d'affixe c = a barre.",
        )
        self.pose(3.4)

        self.etape("q4-enonce")
        but = Text(
            "Montrer que B est image de A par une homothétie h de centre O.",
            font_size=24,
        )
        self.ecrit(but)
        self.legende("On cherche un réel k tel que b = k a.")
        self.pose(2.8)

        self.etape("q4-sens-homothetie")
        ray = Line(origine, plan.n2p(B_AFF), color=COL_PT_B, stroke_width=3)
        oa_seg = Line(origine, plan.n2p(A_AFF), color=COL_PT_A, stroke_width=5)
        self.play(Create(ray))
        self.play(Create(oa_seg))
        self.legende(
            "Que SIGNIFIE une homothétie de centre O et de rapport k RÉEL ?",
            "Elle MULTIPLIE l'affixe par k — l'extension directe du",
            "coefficient réel qui rend deux vecteurs colinéaires : O, A, B",
            "semblent alignés sur le même rayon.",
        )
        self.pose(4.0)

        self.etape("q4-outil-quotient")
        q1 = MathTex(
            r"\dfrac{b}{a} = \dfrac{b\,\overline a}{a\,\overline a} = \dfrac{\overline a\,b}{|a|^2}",
            font_size=38,
        )
        self.ecrit(q1)
        self.legende(
            "On multiplie haut et bas par a barre — l'outil pour diviser",
            "par un complexe (a fois a barre est réel).",
        )
        self.pose(3.2)

        self.etape("q4-module-a")
        q2 = MathTex(
            r"|a| = \left|e^{i\pi/6}\right| = 1 \implies |a|^2 = 1", font_size=36
        )
        self.ecrit(q2, buff=0.5)
        self.legende("a est sur le cercle unité : son module vaut 1.")
        self.pose(2.8)

        self.etape("q4-calcul-quotient")
        q3 = MathTex(
            r"\dfrac{b}{a} = \dfrac{\overline a\,b}{1} = \sqrt3", font_size=40, color=BAC_ACCENT_STRONG
        )
        self.ecrit(q3, buff=0.55)
        self.legende(
            "On réutilise a barre fois b = racine de trois, établi à la",
            "question précédente — pas de nouveau calcul.",
        )
        self.pose(3.4)

        self.etape("q4-conclusion")
        concl = MathTex(
            r"b = \sqrt3\,a,\ \ \sqrt3 \in \mathbb{R}^{+} \implies B = h(A)",
            font_size=34, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        k_lbl = MathTex(r"k=\sqrt3", font_size=28, color=BAC_ACCENT_STRONG).next_to(
            Line(plan.n2p(A_AFF), plan.n2p(B_AFF)).get_center(), UP, buff=0.12
        )
        self.play(FadeIn(k_lbl, shift=0.1 * UP))
        self.legende(
            "h, homothétie de centre O et de rapport racine de trois.",
            "0,5 point — le rayon RESTE le même, seule la distance change.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, ray, oa_seg, k_lbl)))
        return a_lbl2, c_lbl2, b_dot, b_lbl

    # ── Q4 a) : la rotation de centre A (pas O, cette fois) ─────────
    def chapitre_q5(self, plan, a_dot, c_dot):
        badge = self.bandeau_question("4) a)", "0,5 pt")
        self.ardoise()
        a_pt = plan.n2p(A_AFF)
        c_pt = plan.n2p(C_AFF)

        self.etape("q5-enonce")
        txt = Text(
            "M(z) et M'(z'), image de M par R, rotation de centre A",
            font_size=24,
        )
        txt2 = Text("et d'angle π/2.", font_size=24)
        intro_grp = VGroup(txt, txt2).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(intro_grp)
        but = MathTex(r"\text{Écrire } z' \text{ en fonction de } z \text{ et } a", font_size=34)
        self.ecrit(but, buff=0.5)
        self.legende(
            "On cherche la formule d'une rotation dont le centre n'est",
            "PAS O, mais A.",
        )
        self.pose(3.4)

        self.etape("q5-sens-rotation")
        ac_line = Line(a_pt, c_pt, color=COL_PT_D, stroke_width=3)
        rayon = float(np.linalg.norm(c_pt - a_pt))
        start_angle = float(np.angle(C_AFF - A_AFF))
        arc = Arc(
            radius=rayon, start_angle=start_angle, angle=PI / 2,
            arc_center=a_pt, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        image_dot = Dot(c_pt, color=COL_PT_D, radius=0.08)
        self.play(Create(ac_line))
        self.play(Create(arc, run_time=3.0), MoveAlongPath(image_dot, arc, run_time=3.0))
        ad_line = Line(a_pt, plan.n2p(D_AFF), color=COL_PT_D, stroke_width=3)
        ang = Angle(ac_line, ad_line, radius=0.4, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - a_pt) / np.linalg.norm(milieu - a_pt)
        ang_lbl = MathTex(r"\tfrac{\pi}{2}", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.36 * direction
        )
        self.play(Create(ad_line), Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE cette rotation ? C tourne autour de A — pas O —",
            "d'un quart de tour direct, à distance constante : AC = A-image.",
        )
        self.pose(4.0)

        self.etape("q5-formule")
        f1 = MathTex(r"z' - a = e^{i\theta}(z-a) = e^{i\pi/2}(z-a)", font_size=36)
        self.ecrit(f1)
        self.legende(
            "Rotation de centre A : on retranche a AVANT de tourner,",
            "puis on le rajoute — la version décentrée de z' = e^{iθ}z.",
        )
        self.pose(3.4)

        self.etape("q5-exponentielle")
        f2 = MathTex(
            r"e^{i\pi/2} = \cos\dfrac{\pi}{2}+i\sin\dfrac{\pi}{2} = i", font_size=36
        )
        self.ecrit(f2, buff=0.5)
        self.legende("Angle remarquable π/2 : e puissance i pi sur deux vaut i.")
        self.pose(3.0)

        self.etape("q5-conclusion")
        f3 = MathTex(r"z' = a + i\,(z-a)", font_size=42, color=BAC_ACCENT_STRONG)
        self.ecrit(f3, buff=0.55)
        self.legende(
            "La formule de la rotation de centre A et d'angle π/2 —",
            "0,5 point.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, ac_line, ad_line, ang, ang_lbl, arc)))
        return image_dot

    # ── Q4 b) : D, image de C par R ; d = a + 1 ─────────────────────
    def chapitre_q6(self, plan, a_dot, c_dot, d_dot):
        badge = self.bandeau_question("4) b)", "0,25 pt")
        self.ardoise()

        self.etape("q6-enonce")
        but = MathTex(
            r"D = R(C),\ \text{affixe } d.\ \text{Montrer que } d = a+1", font_size=32
        )
        self.ecrit(but)
        self.legende("On applique la formule de la question précédente à C.")
        self.pose(2.8)

        self.etape("q6-appliquer-formule")
        m1 = MathTex(r"d = a + i\,(\overline a - a)", font_size=38)
        self.ecrit(m1, buff=0.5)
        self.legende(
            "D est l'image de C par R : on remplace z par c, c'est-à-dire",
            "a barre.",
        )
        self.pose(3.0)

        self.etape("q6-calcul-a-barre-moins-a")
        m2 = MathTex(
            r"\overline a - a = \left(\dfrac{\sqrt3}{2}-\dfrac12 i\right)"
            r"-\left(\dfrac{\sqrt3}{2}+\dfrac12 i\right) = -i",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Les parties réelles s'annulent ; il reste l'opposé de la",
            "partie imaginaire doublée : moins i.",
        )
        self.pose(3.2)

        self.etape("q6-appliquer-i")
        m3 = MathTex(r"i\,(\overline a-a) = i\times(-i) = -i^2 = 1", font_size=36)
        self.ecrit(m3, buff=0.5)
        self.legende("i fois moins i : on remplace i carré par −1.")
        self.pose(2.8)

        self.etape("q6-conclusion")
        concl = MathTex(r"d = a+1", font_size=44, color=BAC_ACCENT_STRONG)
        self.ecrit(concl, buff=0.55)
        d_lbl = MathTex("D(d)", font_size=32, color=COL_PT_D).next_to(d_dot, RIGHT, buff=0.14)
        self.play(Write(d_lbl))
        self.legende(
            "On reporte : d = a plus 1. Voici D, l'image de C par la",
            "rotation — 0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return d_lbl

    # ── Q4 c) : ADIO est un losange ─────────────────────────────────
    def chapitre_q7(self, plan, a_dot, a_lbl, d_dot, d_lbl):
        badge = self.bandeau_question("4) c)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)
        a_pt, d_pt = plan.n2p(A_AFF), plan.n2p(D_AFF)
        i_pt = plan.n2p(I_AFF)

        self.etape("q7-enonce")
        i_dot = Dot(i_pt, color=COL_PT_I, radius=0.08)
        i_lbl = MathTex("I(1)", font_size=32, color=COL_PT_I).next_to(
            i_dot, DOWN + RIGHT, buff=0.12
        )
        self.play(FadeIn(i_dot, scale=1.6), Write(i_lbl))
        but = Text("Montrer que ADIO est un losange.", font_size=26)
        self.ecrit(but)
        self.legende(
            "I a pour affixe 1. Il faut montrer deux choses : ADIO est un",
            "parallélogramme, puis deux côtés adjacents sont égaux.",
        )
        self.pose(3.6)

        self.etape("q7-sens-vecteur")
        rappel = MathTex(
            r"z_{\overrightarrow{MN}} = \text{affixe}(N) - \text{affixe}(M)", font_size=32
        )
        self.ecrit(rappel, buff=0.5)
        vec_ad = Line(a_pt, d_pt, color=COL_PT_D, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        vec_oi = Line(origine, i_pt, color=COL_PT_I, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        lbl_ad = MathTex(r"\overrightarrow{AD}", font_size=24, color=COL_PT_D).next_to(
            vec_ad.get_center(), UP, buff=0.12
        )
        lbl_oi = MathTex(r"\overrightarrow{OI}", font_size=24, color=COL_PT_I).next_to(
            vec_oi.get_center(), DOWN, buff=0.12
        )
        self.play(Create(vec_ad), Create(vec_oi))
        self.play(FadeIn(lbl_ad), FadeIn(lbl_oi))
        self.legende(
            "Que SIGNIFIE une différence d'affixes ? L'affixe du VECTEUR :",
            "d − a est l'affixe de AD, 1 − 0 celle de OI.",
        )
        self.pose(3.6)

        self.etape("q7-calcul-AD-OI")
        c1 = MathTex(
            r"z_{\overrightarrow{AD}} = d-a = (a+1)-a = 1, \qquad"
            r" z_{\overrightarrow{OI}} = 1-0 = 1",
            font_size=28,
        )
        self.ecrit(c1, buff=0.5)
        self.legende("Les deux vecteurs ont exactement la même affixe : 1.")
        self.pose(3.0)

        self.etape("q7-parallelogramme")
        concl1 = MathTex(
            r"\overrightarrow{AD} = \overrightarrow{OI} \implies ADIO"
            r"\ \text{est un parallélogramme}", font_size=30, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl1, buff=0.5)
        contour = VGroup(
            Line(a_pt, d_pt), Line(d_pt, i_pt), Line(i_pt, origine), Line(origine, a_pt)
        ).set_stroke(color=BAC_INK_MUTED, width=2)
        self.play(Create(contour))
        self.legende(
            "Un côté égal à son opposé, en vecteurs : c'est un",
            "parallélogramme.",
        )
        self.pose(3.4)

        self.etape("q7-longueurs")
        c2 = MathTex(
            r"AD = |d-a| = |1| = 1, \qquad DI = |1-d| = |-a| = |a| = 1",
            font_size=28,
        )
        self.ecrit(c2, buff=0.5)
        self.legende(
            "Deux côtés adjacents : AD vaut 1 ; DI vaut le module de a,",
            "qui vaut 1 aussi (a est sur le cercle unité).",
        )
        self.pose(3.4)

        self.etape("q7-conclusion")
        concl2 = MathTex(
            r"AD = DI \implies ADIO\ \text{est un losange}", font_size=38, color=BAC_SUCCESS
        )
        self.ecrit(concl2, buff=0.5)
        self.play(contour.animate.set_stroke(color=BAC_SUCCESS, width=3))
        self.legende(
            "Parallélogramme avec deux côtés adjacents égaux : ADIO est",
            "un LOSANGE — 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, vec_ad, vec_oi, lbl_ad, lbl_oi)))
        return i_dot, i_lbl

    # ── Q5 a) : d − b factorisé, puis son argument ──────────────────
    def chapitre_q8(self, plan, b_dot, d_dot):
        badge = self.bandeau_question("5) a)", "0,75 pt")
        self.ardoise()

        self.etape("q8-enonce")
        but = MathTex(
            r"\text{Vérifier que } d-b = \dfrac{\sqrt3-1}{2}\,(1-i)", font_size=34
        )
        self.ecrit(but)
        self.legende(
            "On vérifie une factorisation, puis on en déduira l'argument",
            "de d moins b.",
        )
        self.pose(3.0)

        self.etape("q8-substituer")
        s1 = MathTex(
            r"d-b = (a+1) - \left(\dfrac32+i\dfrac{\sqrt3}{2}\right)"
            r" = \left(\dfrac{\sqrt3}{2}+\dfrac12 i+1\right) - \dfrac32 - i\dfrac{\sqrt3}{2}",
            font_size=24,
        )
        self.ecrit(s1, buff=0.5)
        self.legende("On remplace a par sa forme algébrique et on soustrait b.")
        self.pose(3.4)

        self.etape("q8-regrouper")
        s2 = MathTex(
            r"d-b = \left(\dfrac{\sqrt3}{2}-\dfrac12\right)"
            r" + i\left(\dfrac12-\dfrac{\sqrt3}{2}\right)"
            r" = \dfrac{\sqrt3-1}{2} - i\,\dfrac{\sqrt3-1}{2}",
            font_size=26,
        )
        self.ecrit(s2, buff=0.5)
        self.legende(
            "On regroupe parties réelle et imaginaire : la partie",
            "imaginaire est l'opposée de la partie réelle.",
        )
        self.pose(3.4)

        self.etape("q8-factoriser")
        s3 = MathTex(
            r"d-b = \dfrac{\sqrt3-1}{2}\,(1-i)", font_size=38, color=BAC_ACCENT_STRONG
        )
        self.ecrit(s3, buff=0.5)
        self.legende(
            "On factorise par racine de trois moins un, sur deux :",
            "l'égalité annoncée est vérifiée.",
        )
        self.pose(3.2)

        self.etape("q8-argument")
        s4 = MathTex(
            r"\arg(1-i) = -\dfrac{\pi}{4}, \quad \dfrac{\sqrt3-1}{2}>0"
            r" \implies \arg(d-b) = -\dfrac{\pi}{4}\ [2\pi]",
            font_size=28,
        )
        self.ecrit(s4, buff=0.55)
        self.legende(
            "1 moins i a pour argument moins pi sur quatre — angle",
            "remarquable. Un coefficient réel POSITIF ne le change pas.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 b) : 1 − b sous forme trigonométrique ────────────────────
    def chapitre_q9(self, plan, b_dot):
        badge = self.bandeau_question("5) b)", "0,5 pt")
        self.ardoise()

        self.etape("q9-enonce")
        but = MathTex(r"\text{Écrire } 1-b \text{ sous forme trigonométrique}", font_size=34)
        self.ecrit(but)
        self.legende("Même méthode que partout ailleurs : module, puis argument.")
        self.pose(2.8)

        self.etape("q9-calcul-1-moins-b")
        m1 = MathTex(
            r"1-b = 1-\left(\dfrac32+i\dfrac{\sqrt3}{2}\right) = -\dfrac12 - i\dfrac{\sqrt3}{2}",
            font_size=34,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On soustrait b : partie réelle et imaginaire, chacune.")
        self.pose(3.0)

        self.etape("q9-module")
        m2 = MathTex(
            r"|1-b| = \sqrt{\left(-\tfrac12\right)^2+\left(-\tfrac{\sqrt3}{2}\right)^2}"
            r" = \sqrt{\tfrac14+\tfrac34} = 1",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("Racine de la somme des carrés : un quart plus trois quarts, un.")
        self.pose(3.2)

        self.etape("q9-argument")
        m3 = MathTex(
            r"\cos\theta = -\dfrac12,\ \ \sin\theta = -\dfrac{\sqrt3}{2}"
            r"\ \Longrightarrow\ \theta = -\dfrac{2\pi}{3}",
            font_size=32,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "Parties réelle et imaginaire toutes deux négatives : angle",
            "remarquable moins deux pi sur trois.",
        )
        self.pose(3.4)

        self.etape("q9-forme-trig")
        m4 = MathTex(
            r"1-b = \cos\!\left(-\dfrac{2\pi}{3}\right)+i\sin\!\left(-\dfrac{2\pi}{3}\right)",
            font_size=34, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(m4, buff=0.55)
        self.legende(
            "Forme trigonométrique de 1 moins b, module 1 — 0,5 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 c) : une mesure de l'angle (BI, BD) ──────────────────────
    def chapitre_q10(self, plan, b_dot, i_dot, d_dot):
        badge = self.bandeau_question("5) c)", "0,5 pt")
        self.ardoise()
        b_pt = plan.n2p(B_AFF)
        i_pt = plan.n2p(I_AFF)
        d_pt = plan.n2p(D_AFF)

        self.etape("q10-enonce")
        but = MathTex(
            r"\text{Déduire une mesure de l'angle}"
            r"\ \left(\overrightarrow{BI},\overrightarrow{BD}\right)",
            font_size=32,
        )
        self.ecrit(but)
        self.legende("On combine les deux arguments trouvés juste avant.")
        self.pose(2.8)

        self.etape("q10-sens-argument-quotient")
        bi = Line(b_pt, i_pt, color=COL_PT_I, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        bd = Line(b_pt, d_pt, color=COL_PT_D, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        ang = Angle(bi, bd, radius=0.45, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - b_pt) / np.linalg.norm(milieu - b_pt)
        ang_lbl = MathTex(r"?", font_size=24, color=BAC_ACCENT).move_to(
            milieu + 0.36 * direction
        )
        self.play(Create(bi), Create(bd))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Que SIGNIFIE l'argument d'un quotient d'affixes-vecteurs ?",
            "L'ANGLE entre les deux vecteurs — ici entre BI et BD.",
        )
        self.pose(3.8)

        self.etape("q10-formule")
        f1 = MathTex(
            r"\left(\overrightarrow{BI},\overrightarrow{BD}\right) \equiv"
            r" \arg\!\left(\dfrac{d-b}{1-b}\right) = \arg(d-b) - \arg(1-b)\ [2\pi]",
            font_size=28,
        )
        self.ecrit(f1)
        self.legende(
            "L'angle entre deux vecteurs est l'argument du quotient",
            "de leurs affixes.",
        )
        self.pose(3.4)

        self.etape("q10-substituer")
        f2 = MathTex(
            r"\arg(d-b)-\arg(1-b) = -\dfrac{\pi}{4} - \left(-\dfrac{2\pi}{3}\right)",
            font_size=32,
        )
        self.ecrit(f2, buff=0.5)
        self.legende(
            "On reporte les deux arguments : moins pi sur quatre",
            "(question 5a), moins deux pi sur trois (question 5b).",
        )
        self.pose(3.4)

        self.etape("q10-calcul")
        f3 = MathTex(
            r"= \dfrac{-3\pi+8\pi}{12} = \dfrac{5\pi}{12}", font_size=36
        )
        self.ecrit(f3, buff=0.5)
        self.legende(
            "Même dénominateur douze : moins trois douzièmes plus huit",
            "douzièmes de pi.",
        )
        self.pose(3.2)

        self.etape("q10-conclusion")
        concl = MathTex(
            r"\left(\overrightarrow{BI},\overrightarrow{BD}\right) \equiv"
            r" \dfrac{5\pi}{12}\ [2\pi]",
            font_size=42, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        ang_lbl2 = MathTex(r"\tfrac{5\pi}{12}", font_size=22, color=BAC_SUCCESS).move_to(
            ang_lbl
        )
        self.play(ReplacementTransform(ang_lbl, ang_lbl2), ang.animate.set_color(BAC_SUCCESS))
        self.legende(
            "L'arc porte maintenant sa mesure — 0,5 point. Exercice",
            "terminé, cinq points au total.",
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
                 font_size=23, color=BAC_INK_SOFT),
            Text("• e^{iθ} : le point du cercle unité à l'angle θ.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Conjugué = reflet dans l'axe réel.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Homothétie de centre O, rapport k réel : on MULTIPLIE l'affixe par k.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Rotation de centre Ω : z' − ω = e^{iθ}(z − ω).",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Parallélogramme + deux côtés adjacents égaux = losange.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• arg(quotient d'affixes-vecteurs) = angle entre les deux vecteurs.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("5 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
