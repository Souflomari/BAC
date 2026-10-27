"""Explication animée v4 — Bac 2021 SExp, session normale, Exercice 1.

Source de vérité : content/maths/limites-continuite/bank.yaml, entrée
bk-2021-n-x1 (vérifiée, AlloSchool NS22F, element/127180, Exercice 1,
2 points). Équation et inéquation avec l'exponentielle, limite en 0 sous
forme indéterminée, existence d'une solution par le théorème des valeurs
intermédiaires (TVI).

Quatre questions : 1a) résoudre e^{2x} - 4e^x + 3 = 0 par changement de
variable t = e^x, réponse S = {0 ; ln 3} (0,5 pt) ; 1b) résoudre
l'inéquation associée e^{2x} - 4e^x + 3 <= 0, réponse S = [0 ; ln 3]
(0,5 pt) ; 1c) calculer lim(x->0) (e^{2x}-4e^x+3)/(e^{2x}-1), forme 0/0
levée par le même changement de variable, réponse -1 (0,5 pt) ; 2) montrer
que e^{2x}+e^x+4x = 0 admet une solution dans [-1, 0], par le corollaire
d'existence du TVI (continuité + signes opposés), sans exigence
d'unicité (0,5 pt). Total : 2 points.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens AVANT chaque calcul — trois
courbes tracées sur des Axes, introduites avant l'algèbre qui les
étudie : (1) la courbe de f(x) = e^{2x}-4e^x+3, ses deux racines en x=0
et x=ln3 marquées AVANT la résolution de l'équation puis de
l'inéquation (le signe de f entre les racines = solution de
l'inéquation) ; (2) un zoom sur la courbe de h(x) = f(x)/(e^{2x}-1),
tracée en DEUX branches de part et d'autre du trou en x=0 (un cercle
creux, jamais un point plein, tant que la valeur n'est pas prouvée),
qui devient un point plein une fois la limite -1 établie par le calcul ;
(3) la courbe de φ(x) = e^{2x}+e^x+4x sur [-1, 0], φ(-1) et φ(0) marqués
comme deux points de signes opposés, un encadrement tracé sur l'axe des
x entre -1 et 0, et la courbe qui croise l'axe au point c garanti par le
TVI — LE geste de sens de cette question.

Curseur R1–R6 (SCOPE NOTE de bank.yaml) : 1a/1b mobilisent l'algèbre de
la fonction exponentielle (changement de variable t = e^x > 0), hors du
corps R1–R6 mais fidèle à la source ; 1c applique le mécanisme de
factorisation du R3 à travers ce même t ; 2 est le cœur R5 (corollaire
du TVI) sans écart. Aucune monotonie n'est démontrée à la question 2 :
l'énoncé ne demande que l'EXISTENCE d'une solution, jamais son unicité —
un piège classique (ajouter une monotonie non demandée, ou l'omettre
quand elle l'est) reçoit sa propre étape rouge. Le piège classique
« forme indéterminée 0/0 » (question 1c) et le piège du sens conservé
par ln UNIQUEMENT parce que exp est croissante (question 1b) reçoivent
chacun leur étape rouge dédiée. La position exacte du croisement c sur
la courbe de φ (question 2) et le tracé complet de la courbe de f/h/φ
au-delà des seuls points cités par la banque sont des choix
d'illustration, signalés comme tels dans les légendes — jamais une
valeur numérique inventée n'apparaît dans le corrigé écrit.

Rendu : ../../render.sh scenes/maths/limites-continuite/bk-2021-n-x1.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Axes,
    Circle,
    Create,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_BG,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable (DESIGN.md §2) : la courbe étudiée (f, puis h,
# puis φ — jamais deux à l'écran en même temps, modèle « replace ») garde
# UNE seule couleur du début à la fin, sarcelle ; t = e^x, l'outil
# transversal des questions 1a/1b/1c, reçoit l'or ; les encadrements
# d'intervalle (le « outil du cours ») le sarcelle clair ; les résultats
# vérifiés dans l'ardoise le sarcelle fort ; la conclusion finale d'une
# limite ou d'une existence, le vert ; un piège, toujours le rouge.
COURBE = BAC_ACCENT
COL_T = BAC_WARNING
COL_BOUND = BAC_ACCENT_LIGHT
COL_CONCL = BAC_ACCENT_STRONG
COL_LIM = BAC_SUCCESS

DOT_R = 0.075

# ── Valeurs exactes de la banque (bk-2021-n-x1) ──────────────────────
LN3 = np.log(3)          # x = ln 3, solution exacte (Q1a/Q1b)
PHI_MOINS1 = -3.497      # valeur approchée de la banque (Q2, étape 3)
PHI_ZERO = 2.0           # φ(0) = 2, exact (Q2, étape 4)

# Position illustrative du croisement de la courbe de φ avec l'axe des x
# — la banque ne demande QUE l'existence d'une solution dans ]-1, 0[,
# jamais sa valeur. Utilisée uniquement pour placer le point sur la
# courbe déjà tracée ; jamais écrite dans un calcul ni citée comme un
# résultat de l'énoncé (signalé en légende à l'écran).
C_TVI_APPROX = -0.315


def _f(x):
    """f(x) = e^{2x} - 4e^x + 3 — membre de gauche de Q1a/Q1b."""
    return np.exp(2 * x) - 4 * np.exp(x) + 3


def _h(x):
    """h(x) = f(x) / (e^{2x} - 1) — quotient de la limite, Q1c."""
    return (np.exp(2 * x) - 4 * np.exp(x) + 3) / (np.exp(2 * x) - 1)


def _phi(x):
    """φ(x) = e^{2x} + e^x + 4x — fonction auxiliaire du TVI, Q2."""
    return np.exp(2 * x) + np.exp(x) + 4 * x


# ── Disposition de la figure (région droite, DESIGN.md §1) ──────────
# Un seul emplacement, réutilisé par les trois courbes successives
# (modèle « replace ») : même centre, même gabarit — seule la fenêtre
# de données change d'une figure à l'autre.
FIG_CENTER = 3.4 * RIGHT + 0.25 * UP
FIG_X_LEN = 4.4
FIG_Y_LEN = 3.1


def _nouvelle_figure(x_range, y_range):
    """Des axes vides, au même emplacement pour les trois figures."""
    return Axes(
        x_range=x_range,
        y_range=y_range,
        x_length=FIG_X_LEN,
        y_length=FIG_Y_LEN,
        axis_config={
            "stroke_color": BAC_INK_MUTED,
            "stroke_width": 2,
            "include_ticks": False,
        },
    ).move_to(FIG_CENTER)


def _point_marque(ax, x, y, couleur, texte, direction, buff=0.14, font_size=26):
    """Un point sur la figure + son étiquette, posée du côté libre."""
    pt = ax.c2p(x, y)
    point = Dot(pt, color=couleur, radius=DOT_R)
    label = MathTex(texte, font_size=font_size, color=couleur).next_to(
        point, direction, buff=buff
    )
    return point, label


def _cercle_creux(ax, x, y, couleur, rayon=DOT_R):
    """Un point CREUX (le trou d'une limite non encore établie) : rempli
    de la couleur de fond, jamais un point plein tant que la valeur
    n'est pas prouvée par le calcul."""
    return Circle(
        radius=rayon, color=couleur, fill_color=BAC_BG, fill_opacity=1,
        stroke_width=2.5,
    ).move_to(ax.c2p(x, y))


NARRATION = {
    "titre": "Exercice un du bac deux mille vingt et un, session "
    "normale, sciences expérimentales : fonctions numériques, sur deux "
    "points. Équation et inéquation avec l'exponentielle, une limite en "
    "zéro, et l'existence d'une solution par le théorème des valeurs "
    "intermédiaires.",
    "intro": "Quatre questions autour de la même fonction, e à la x : "
    "une équation, une inéquation, une limite, et un problème "
    "d'existence. Le changement de variable t égale e x sert d'outil "
    "commun aux trois premières.",
    "plan": "Avant l'algèbre, on regarde la courbe de f, e deux x moins "
    "quatre e x plus trois : où touche-t-elle zéro ?",
    "q1a": "Question un a. On résout l'équation f de x égale zéro, par "
    "le changement de variable t égale e x.",
    "q1b": "Question un b. Même changement de variable, pour "
    "l'inéquation cette fois : où f est-elle négative ou nulle ?",
    "q1c": "Question un c. La limite en zéro tombe sur zéro sur zéro : "
    "une forme indéterminée, levée par le même changement de variable.",
    "q2": "Question deux. On ne demande plus une valeur, mais une "
    "existence : le théorème des valeurs intermédiaires garantit une "
    "solution, sans qu'on ait besoin de la calculer.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        ax_f, racines = self.chapitre_plan()
        self.chapitre_q1a(racines)
        self.chapitre_q1b(ax_f, racines)
        fig_h = self.chapitre_q1c(ax_f, racines)
        self.chapitre_q2(fig_h)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2021 · SESSION NORMALE · SCIENCES EXP.",
            "Fonctions numériques — limites et continuité",
            "Exercice 1 — 2 points · sujet officiel NS22F",
        )

    # ── L'outil commun : le changement de variable t = e^x ───────────
    def chapitre_intro(self):
        self.etape("intro-outil")
        entete = Text(
            "Un même outil revient aux questions 1a, 1b et 1c :",
            font_size=27,
        ).shift(2.3 * UP)
        outil = MathTex(
            r"t = e^x \quad (t>0)", font_size=42, color=COL_T
        ).next_to(entete, DOWN, buff=0.7)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(outil, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "e à la x est TOUJOURS strictement positif — poser t = e x",
            "transforme une expression en e^x en un trinôme ordinaire.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.play(FadeOut(entete))
        self.play(
            outil.animate.scale(0.62).to_edge(LEFT, buff=0.55).to_edge(UP, buff=1.05)
        )
        self.epingle(outil)
        return outil

    # ── La couche de sens : la courbe de f, AVANT l'algèbre ──────────
    def chapitre_plan(self):
        self.etape("plan-figure")
        ax = _nouvelle_figure(x_range=[-0.6, 1.3, 0.5], y_range=[-1.5, 2.0, 0.5])
        courbe = ax.plot(_f, x_range=[-0.6, 1.3], color=COURBE, stroke_width=3.5)
        self.play(Create(ax, run_time=1.6))
        # 0,5 (pas 0 ni ln3≈1,0986) : entre les deux racines qui reçoivent
        # leurs propres étiquettes juste après — jamais sur elles.
        self._graduations(ax, [0.5], [-1, 1])
        self.play(Create(courbe, run_time=2.2))
        self.legende(
            "La courbe de f, avant tout calcul — on cherche d'abord",
            "où elle touche l'axe, et où elle passe en dessous.",
        )
        self.pose(3.4)

        self.etape("plan-racine-0")
        pt0, lbl0 = _point_marque(
            ax, 0, 0, COURBE, "x=0", DOWN + LEFT, buff=0.12, font_size=24
        )
        self.play(FadeIn(pt0, scale=1.6), Write(lbl0))
        self.legende(
            "Un premier endroit où f vaut zéro — un futur candidat de",
            "l'équation qu'on va résoudre.",
        )
        self.pose(2.8)

        self.etape("plan-racine-ln3")
        pt1, lbl1 = _point_marque(
            ax, LN3, 0, COURBE, r"x=\ln 3", DOWN + RIGHT, buff=0.12, font_size=24
        )
        self.play(FadeIn(pt1, scale=1.6), Write(lbl1))
        self.legende(
            "Et un second, plus loin — entre les deux, on le voit,",
            "la courbe plonge sous l'axe : on va le PROUVER.",
        )
        self.pose(3.4)
        self.efface_legende()
        return ax, {
            "courbe": courbe, "pt0": pt0, "lbl0": lbl0, "pt1": pt1, "lbl1": lbl1,
        }

    # ── Q1a : résoudre e^{2x} - 4e^x + 3 = 0 ─────────────────────────
    def chapitre_q1a(self, racines):
        badge = self.bandeau_question("1) a)", "0,5 pt")
        self.ardoise()

        self.etape("q1a-enonce")
        but = MathTex(
            r"\text{Résoudre dans } \mathbb{R} : e^{2x}-4e^x+3=0",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "Une équation qui mélange e à la 2x et e à la x — le",
            "réflexe : un trinôme du second degré déguisé.",
        )
        self.pose(3.0)

        self.etape("q1a-subst")
        m1 = MathTex(r"t = e^x \quad (t>0)", font_size=34, color=COL_T)
        self.ecrit(m1)
        self.legende("On pose t égal e x, l'outil déjà épinglé — toujours positif.")
        self.pose(2.6)

        self.etape("q1a-carre")
        m2 = MathTex(r"e^{2x}-4e^x+3 = t^2-4t+3", font_size=32)
        self.ecrit(m2, buff=0.5)
        self.legende("e à la 2x est le carré de e à la x, donc t au carré.")
        self.pose(2.8)

        self.etape("q1a-factoriser")
        m3 = MathTex(r"t^2-4t+3 = (t-1)(t-3)", font_size=32)
        self.ecrit(m3, buff=0.5)
        self.legende(
            "Trinôme ordinaire, factorisé — racines 1 et 3, somme 4,",
            "produit 3.",
        )
        self.pose(3.0)

        self.etape("q1a-produit-nul")
        m4 = MathTex(
            r"(t-1)(t-3) = 0 \iff t = 1 \ \text{ou}\ t = 3", font_size=28
        )
        self.ecrit(m4, buff=0.5)
        self.legende("Un produit nul : au moins un des deux facteurs est nul.")
        self.pose(2.8)

        self.etape("q1a-retour-x")
        m5a = MathTex(r"t=1 \iff e^x=1 \iff x=0", font_size=28)
        m5b = MathTex(r"t=3 \iff e^x=3 \iff x=\ln 3", font_size=28)
        self.ecrit(
            VGroup(m5a, m5b).arrange(DOWN, aligned_edge=LEFT, buff=0.18), buff=0.55
        )
        self.legende(
            "On revient à x : e x égale t s'inverse par ln — bijection",
            "strictement croissante.",
        )
        self.pose(3.4)

        self.etape("q1a-solution")
        m6 = MathTex(r"S = \{0\,;\ \ln 3\}", font_size=38, color=COL_CONCL)
        self.ecrit(m6, buff=0.55)
        cadre0 = self.entoure(racines["pt0"], COL_CONCL, buff=0.12)
        cadre1 = self.entoure(racines["pt1"], COL_CONCL, buff=0.12)
        self.legende(
            "Exactement les deux points déjà marqués sur la courbe —",
            "là où f touche zéro. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(cadre0), FadeOut(cadre1))
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q1b : résoudre e^{2x} - 4e^x + 3 <= 0 ─────────────────────────
    def chapitre_q1b(self, ax, racines):
        badge = self.bandeau_question("1) b)", "0,5 pt")
        self.ardoise()

        self.etape("q1b-enonce")
        but = MathTex(
            r"\text{Résoudre dans } \mathbb{R} : e^{2x}-4e^x+3\le 0",
            font_size=32,
        )
        self.ecrit(but)
        self.legende(
            "Même expression, cette fois une inéquation — même",
            "changement de variable t = e x.",
        )
        self.pose(3.0)

        self.etape("q1b-meme-t")
        m1a = MathTex(r"e^{2x}-4e^x+3\le 0 \iff t^2-4t+3\le 0", font_size=26)
        m1b = MathTex(r"\iff (t-1)(t-3)\le 0", font_size=26)
        self.ecrit(
            VGroup(m1a, m1b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende("La même factorisation qu'à la question précédente.")
        self.pose(3.0)

        self.etape("q1b-signe-trinome")
        m2 = MathTex(r"(t-1)(t-3)\le 0 \iff 1\le t\le 3", font_size=30)
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Un trinôme à coefficient dominant positif est négatif ou",
            "nul ENTRE ses deux racines.",
        )
        self.pose(3.2)

        self.etape("q1b-retour-x")
        m3 = MathTex(r"1\le e^x\le 3", font_size=32)
        self.ecrit(m3, buff=0.5)
        self.legende("On revient à x avec t = e x.")
        self.pose(2.6)

        self.etape("q1b-piege-croissance")
        piege = VGroup(
            Text("ATTENTION : on applique ln aux trois membres — ça ne",
                 font_size=19, color=BAC_ERROR),
            Text("CONSERVE le sens QUE parce que exp est CROISSANTE.",
                 font_size=19, color=BAC_ERROR),
            Text("Une fonction décroissante inverserait les inégalités.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique du bac : le sens de l'inégalité ne",
            "survit que grâce au sens de variation de exp.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q1b-appliquer-ln")
        m4a = MathTex(r"1\le e^x\le 3 \iff \ln 1\le x\le \ln 3", font_size=27)
        m4b = MathTex(r"\iff 0\le x\le \ln 3", font_size=27)
        self.ecrit(
            VGroup(m4a, m4b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende("exp strictement croissante : elle conserve l'ordre.")
        self.pose(3.0)

        self.etape("q1b-solution")
        m5 = MathTex(r"S = [0,\ \ln 3]", font_size=38, color=COL_CONCL)
        self.ecrit(m5, buff=0.55)
        # Deux courtes marques verticales AUX bornes (jamais un trait
        # horizontal traversant le creux de la courbe, qui plonge à -1
        # entre les deux racines — cela la croiserait deux fois).
        tick0 = Line(ax.c2p(0, 0), ax.c2p(0, -0.28), color=COL_BOUND, stroke_width=5)
        tick1 = Line(ax.c2p(LN3, 0), ax.c2p(LN3, -0.28), color=COL_BOUND, stroke_width=5)
        piste = VGroup(tick0, tick1)
        self.play(Create(piste, run_time=1.4))
        self.legende(
            "Exactement l'intervalle où la courbe plonge sous l'axe —",
            "visible depuis le début. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        racines["piste"] = piste

    # ── Q1c : la limite en 0, forme indéterminée 0/0 ──────────────────
    def chapitre_q1c(self, ax, racines):
        badge = self.bandeau_question("1) c)", "0,5 pt")
        self.ardoise()

        self.etape("q1c-enonce")
        but = MathTex(
            r"\text{Calculer } \lim_{x\to 0} \dfrac{e^{2x}-4e^x+3}{e^{2x}-1}",
            font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "La même expression au numérateur — divisée cette fois",
            "par e à la 2x moins un.",
        )
        self.pose(3.2)

        self.etape("q1c-substitution-directe")
        m1 = MathTex(
            r"\dfrac{e^{2x}-4e^x+3}{e^{2x}-1} \xrightarrow[x\to 0]{}"
            r" \dfrac{1-4+3}{1-1} = \dfrac{0}{0}",
            font_size=25,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Substitution directe en x = 0 : numérateur ET",
            "dénominateur valent tous les deux zéro.",
        )
        self.pose(3.2)

        self.etape("q1c-trap-forme-indet")
        piege = VGroup(
            Text("ATTENTION : 0/0 est une FORME INDÉTERMINÉE — on ne",
                 font_size=19, color=BAC_ERROR),
            Text("peut PAS conclure directement. Il faut retravailler",
                 font_size=19, color=BAC_ERROR),
            Text("l'expression avant de repasser à la limite.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : 0/0 n'est PAS une réponse — c'est",
            "le signal qu'il faut factoriser.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q1c-figure-swap")
        ancien = VGroup(
            ax, racines["courbe"], racines["pt0"], racines["lbl0"],
            racines["pt1"], racines["lbl1"], racines["piste"],
        )
        self.play(FadeOut(ancien))
        ax2 = _nouvelle_figure(x_range=[-0.6, 0.6, 0.3], y_range=[-1.7, -0.25, 0.5])
        gap = 0.05
        branche_g = ax2.plot(_h, x_range=[-0.55, -gap], color=COURBE, stroke_width=3.5)
        branche_d = ax2.plot(_h, x_range=[gap, 0.55], color=COURBE, stroke_width=3.5)
        trou = _cercle_creux(ax2, 0, -1, COURBE)
        self.play(Create(ax2, run_time=1.4))
        # x : ±0,3, jamais 0 (le trou y est). y : −0,5/−1,5, jamais −1
        # (même raison) — le trou reste net, à distance de tout nombre.
        self._graduations(ax2, [-0.3, 0.3], [-1.5, -0.5])
        self.play(Create(branche_g, run_time=1.6), Create(branche_d, run_time=1.6))
        self.play(FadeIn(trou, scale=1.4))
        self.legende(
            "Un zoom : le quotient n'existe pas EN x = 0 (0/0), mais",
            "existe tout autour — un cercle creux marque ce trou.",
        )
        self.pose(3.8)

        self.etape("q1c-refactoriser")
        n1 = MathTex(r"t = e^x", font_size=26)
        n2 = MathTex(r"e^{2x}-4e^x+3 = (t-1)(t-3)", font_size=26)
        n3 = MathTex(r"e^{2x}-1 = t^2-1 = (t-1)(t+1)", font_size=26)
        self.ecrit(
            VGroup(n1, n2, n3).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende(
            "On réutilise t = e x : le numérateur est déjà factorisé",
            "(question 1a), et le dénominateur, une différence de",
            "carrés.",
        )
        self.pose(4.0)

        self.etape("q1c-facteur-commun")
        m2 = MathTex(
            r"\dfrac{e^{2x}-4e^x+3}{e^{2x}-1} = \dfrac{(t-1)(t-3)}{(t-1)(t+1)}",
            font_size=25,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Numérateur et dénominateur partagent le même facteur,",
            "(t moins un) — ils s'annulent tous les deux en t = 1.",
        )
        self.pose(3.4)

        self.etape("q1c-simplifier")
        m3a = MathTex(r"x\ne 0 \implies t=e^x\ne 1", font_size=27)
        m3b = MathTex(
            r"\implies \dfrac{(t-1)(t-3)}{(t-1)(t+1)} = \dfrac{t-3}{t+1}",
            font_size=27,
        )
        self.ecrit(
            VGroup(m3a, m3b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende(
            "Pendant le calcul de la limite, x ne vaut jamais 0 : on a",
            "le droit de simplifier par (t moins un).",
        )
        self.pose(3.8)

        self.etape("q1c-limite-t")
        m4a = MathTex(r"x\to 0 \implies t=e^x\to 1", font_size=27)
        m4b = MathTex(
            r"\implies \dfrac{t-3}{t+1}\to \dfrac{1-3}{1+1} = -1", font_size=27
        )
        self.ecrit(
            VGroup(m4a, m4b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        self.legende(
            "t tend vers un : l'expression simplifiée n'a plus de",
            "problème — on substitue directement.",
        )
        self.pose(3.6)

        self.etape("q1c-conclusion")
        m5 = MathTex(
            r"\lim_{x\to 0} \dfrac{e^{2x}-4e^x+3}{e^{2x}-1} = -1",
            font_size=34, color=COL_LIM,
        )
        self.ecrit(m5, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("Résultat final de la limite : moins un. 0,5 point.")
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()

        self.etape("q1c-figure-confirm")
        self.play(FadeOut(trou))
        plein = Dot(ax2.c2p(0, -1), color=COL_LIM, radius=DOT_R)
        lbl_lim = MathTex("-1", font_size=24, color=COL_LIM).next_to(
            plein, UP, buff=0.22
        )
        self.play(FadeIn(plein, scale=1.6), Write(lbl_lim))
        self.legende(
            "Le trou se comble : la limite, moins un, est exactement",
            "la hauteur où les deux branches se rejoignent.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(badge))
        return {
            "ax2": ax2, "branche_g": branche_g, "branche_d": branche_d,
            "plein": plein, "lbl_lim": lbl_lim,
        }

    # ── Q2 : existence d'une solution par le TVI ──────────────────────
    def chapitre_q2(self, fig_h):
        badge = self.bandeau_question("2)", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but1 = MathTex(r"\text{Montrer que } e^{2x}+e^x+4x=0", font_size=32)
        but2 = MathTex(r"\text{admet une solution dans } [-1,\ 0]", font_size=30)
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "On ne demande plus une valeur, mais une EXISTENCE — un",
            "signal direct du théorème des valeurs intermédiaires.",
        )
        self.pose(3.6)

        self.etape("q2-pose-phi")
        m1 = MathTex(r"\varphi(x) = e^{2x}+e^x+4x", font_size=34)
        self.ecrit(m1)
        self.legende("On pose une fonction auxiliaire φ, pour appliquer le TVI.")
        self.pose(2.8)

        self.etape("q2-figure-swap")
        ancien = VGroup(
            fig_h["ax2"], fig_h["branche_g"], fig_h["branche_d"],
            fig_h["plein"], fig_h["lbl_lim"],
        )
        anims = [FadeOut(ancien)]
        if self._carte_ref is not None:
            anims.append(FadeOut(self._carte_ref))
        self.play(*anims)
        self._carte_ref = None
        ax3 = _nouvelle_figure(x_range=[-1.15, 0.2, 0.5], y_range=[-4.3, 4.0, 1])
        courbe_phi = ax3.plot(_phi, x_range=[-1.15, 0.2], color=COURBE, stroke_width=3.5)
        self.play(Create(ax3, run_time=1.4))
        # Fenêtre étroite : x=-1 et x=0 portent déjà repères+coches, seul
        # -0,5 reste libre. y : -2, à distance de φ(-1)≈-3,497 (label EN
        # DESSOUS) et de φ(0)=2 (label AU-DESSUS) — les deux évités.
        self._graduations(ax3, [-0.5], [-2])
        self.play(Create(courbe_phi, run_time=2.2))
        self.legende(
            "La courbe de φ — contrairement à celle de tout à l'heure,",
            "AUCUN trou ici : un seul trait continu, sans lever le",
            "crayon.",
        )
        self.pose(4.0)

        self.etape("q2-continuite")
        m2a = MathTex(r"\varphi\ \text{est continue sur } \mathbb{R}", font_size=30)
        m2b = MathTex(
            r"\text{(somme : exponentielle + polynôme, toutes deux continues)}",
            font_size=19,
        )
        self.ecrit(
            VGroup(m2a, m2b).arrange(DOWN, aligned_edge=LEFT, buff=0.18), buff=0.5
        )
        self.legende(
            "C'est exactement ce que montre le trait continu : aucun",
            "saut, nulle part.",
        )
        self.pose(3.8)

        self.etape("q2-phi-moins-un")
        m3a = MathTex(r"\varphi(-1) = e^{-2}+e^{-1}-4", font_size=28)
        m3b = MathTex(
            r"\approx 0{,}135+0{,}368-4 \approx -3{,}497 < 0", font_size=25
        )
        self.ecrit(
            VGroup(m3a, m3b).arrange(DOWN, aligned_edge=LEFT, buff=0.15), buff=0.5
        )
        pt_a, lbl_a = _point_marque(
            ax3, -1, PHI_MOINS1, COURBE, r"\varphi(-1)<0", DOWN, buff=0.16, font_size=22
        )
        self.play(FadeIn(pt_a, scale=1.6), Write(lbl_a))
        self.legende("Valeur approchée à la calculatrice : nettement négative.")
        self.pose(3.4)

        self.etape("q2-phi-zero")
        m4 = MathTex(r"\varphi(0) = e^0+e^0+0 = 1+1 = 2 > 0", font_size=27)
        self.ecrit(m4, buff=0.5)
        pt_b, lbl_b = _point_marque(
            ax3, 0, PHI_ZERO, COURBE, r"\varphi(0)>0", UP, buff=0.16, font_size=22
        )
        self.play(FadeIn(pt_b, scale=1.6), Write(lbl_b))
        self.legende("Évaluation directe : e puissance zéro vaut un.")
        self.pose(3.0)

        self.etape("q2-signes-opposes")
        m5 = MathTex(r"\varphi(-1) < 0 < \varphi(0)", font_size=32)
        self.ecrit(m5, buff=0.5)
        # Deux courtes marques verticales aux bornes, jamais un trait
        # horizontal : φ balaie continûment de -3,497 à 2 sur [-1 ; 0],
        # un trait à hauteur fixe croiserait forcément la courbe.
        tick_a = Line(ax3.c2p(-1, 0), ax3.c2p(-1, -0.32), color=COL_BOUND, stroke_width=5)
        tick_b = Line(ax3.c2p(0, 0), ax3.c2p(0, -0.32), color=COL_BOUND, stroke_width=5)
        piste = VGroup(tick_a, tick_b)
        self.play(Create(piste, run_time=1.4))
        self.legende(
            "Les images des deux bornes sont de signes contraires —",
            "l'intervalle [-1 ; 0] est encadré.",
        )
        self.pose(3.6)

        self.etape("q2-trap-hypotheses")
        piege = VGroup(
            Text("ATTENTION : le corollaire du TVI exige TOUJOURS les",
                 font_size=19, color=BAC_ERROR),
            Text("DEUX conditions — continuité ET signes opposés.",
                 font_size=19, color=BAC_ERROR),
            Text("Pas besoin de monotonie ici : seule l'EXISTENCE compte.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : oublier une des deux conditions —",
            "ou ajouter une monotonie que l'énoncé ne demande pas.",
        )
        self.pose(4.2)
        self.nettoie(garder=1)

        self.etape("q2-corollaire")
        m6a = MathTex(
            r"\varphi\ \text{continue sur}\ [-1,0]\ \text{et}"
            r"\ \varphi(-1)\times\varphi(0)<0",
            font_size=22,
        )
        m6b = MathTex(
            r"\implies \exists\, c\in\,]-1,0[,\ \varphi(c)=0",
            font_size=28, color=COL_LIM,
        )
        self.ecrit(
            VGroup(m6a, m6b).arrange(DOWN, aligned_edge=LEFT, buff=0.18), buff=0.55
        )
        self.encadre(couleur=COL_LIM)
        c_pt, c_lbl = _point_marque(
            ax3, C_TVI_APPROX, 0, COL_LIM, "c", UP + LEFT, buff=0.1, font_size=24
        )
        self.play(FadeIn(c_pt, scale=1.8), Write(c_lbl))
        self.legende(
            "Continuité et signes opposés suffisent : la courbe",
            "traverse forcément l'axe, quelque part entre -1 et 0.",
            "0,5 point — position illustrative, non demandée.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• e^{2x} = (e^x)^2 : poser t = e^x transforme une",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  expression en e^x en un trinôme ordinaire, t TOUJOURS > 0.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Passer au logarithme conserve le sens d'une inégalité",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  SEULEMENT parce que exp est strictement croissante.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• 0/0 est une forme indéterminée, jamais une réponse :",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  il faut factoriser puis simplifier avant la limite.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("• Corollaire du TVI : continuité ET signes opposés aux",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  bornes suffisent pour l'EXISTENCE — la monotonie ne",
                 font_size=23, color=BAC_INK_SOFT),
            Text("  sert qu'à démontrer l'UNICITÉ, non demandée ici.",
                 font_size=23, color=BAC_INK_SOFT),
            Text("2 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=21, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
