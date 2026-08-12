"""Explication animée v4 — Bac 2021 SExp, session normale, Problème (9 pts).

Source de vérité : content/maths/fonction-logarithme/bank.yaml, entrée
bk-2021-n-x4 (vérifiée, AlloSchool NS22F, element/127180, Problème,
pages 3-4 du scan, 9 points). Fonction f définie sur [0,+∞[ par :

    f(0) = 0  et  f(x) = 2x ln x - 2x  si x > 0

(C) sa courbe représentative dans un repère orthonormé (O, i, j), unité
1 cm. Dix-sept questions, groupées ici dans l'ordre du fichier bank.yaml
(numérotation séquentielle 1→17 propre à CETTE scène — l'énoncé scanné
utilise très probablement une numérotation hiérarchique du type
1),2),3)a)b)c)... non reconstituée ici faute de certitude caractère-par-
caractère sur le libellé exact ; choix d'illustration signalé, jamais
une valeur numérique inventée) :

  1) continuité à droite en 0 (0,5 pt) ; 2) lim(+∞) f(x) = +∞ (0,5 pt) ;
  3) lim(+∞) f(x)/x = +∞, branche parabolique direction (O,j) (0,5 pt) ;
  4) lim(0+) f(x)/x = -∞, demi-tangente verticale en (0,0) (0,75 pt) ;
  5) f'(x) = 2 ln x (0,5 pt) ; 6) tableau de variations, minimum
  f(1) = -2 (0,5 pt) ; 7) f(x)=0 ⟺ x=e, f(x)=x ⟺ x=e^{3/2} (0,5 pt) ;
  8) construction de (C), e^{3/2}≈4,5 (1 pt) ; 9) IPP :
  ∫₁^e x ln x dx = (1+e²)/4 (0,5 pt) ; 10) ∫₁^e f(x) dx = (3-e²)/2
  (0,5 pt) ; 11) minimum de f sur ]0,+∞[ = f(1) = -2 (0,25 pt) ;
  12) ln x ≥ (x-1)/x sur ]0,+∞[ (0,5 pt) ; 13) g = restriction de f à
  [1,+∞[, réciproque g⁻¹ sur J=[-2,+∞[ (0,5 pt) ; 14) courbe de g⁻¹,
  symétrique de celle de g par rapport à (Δ):y=x (0,75 pt) ; 15)
  h(x)=x³+3x si x≤0, h(x)=f(x) si x>0 : continuité en 0 (0,5 pt) ; 16)
  dérivabilité à gauche en 0, demi-tangente de pente 3 (0,5 pt) ; 17) h
  non dérivable en 0, deux demi-tangentes distinctes (0,25 pt). Total :
  9 points.

SCOPE NOTE (voir bank.yaml en tête de fichier) : ce problème déborde très
largement le corps R1–R6 de la leçon fonction-logarithme — question 5
mobilise la dérivée d'un produit (chapitre dérivabilité), questions 9-10
une intégration par parties (chapitre calcul intégral), questions 13-14
le corollaire du théorème des valeurs intermédiaires pour une fonction
réciproque (chapitre dérivabilité et étude de fonctions). Le cœur R1/R4
irrigue tout le problème : le corollaire de croissances comparées
x ln x → 0 en 0+ (R4) rend le prolongement par continuité possible
(question 1) et revient aux questions 2, 3, 4 ; le signe de ln x autour
de 1 (R1) porte le tableau de variations (question 6).

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens AVANT chaque calcul — la courbe
de (C) tracée dès le chapitre « plan », avant toute algèbre, avec un
point NEUTRE (donné, pas encore confirmé raccordé) en (0,0) tant que la
continuité du prolongement n'est pas prouvée (question 1) ; la
demi-tangente verticale en (0,0) dessinée au moment où la limite infinie
est établie (question 4 — convention de l'asymptote pointillée
appliquée ici à une tangente verticale) ; la droite (Δ):y=x et la courbe
de g⁻¹ tracées par un paramétrage EXACT, (g(t), t) (question 14) ; un
second repère resserré près de l'origine pour la fonction par morceaux h
(questions 15-17), montrant les deux demi-tangentes distinctes qui
interdisent la dérivabilité en 0. Pièges rouges dédiés : le facteur qui
NE s'annule PAS dans (2x ln x)' — les deux termes du produit sont
obligatoires (question 5) ; le minimum global de f qui fonde
l'inégalité de la question 12 (glisser vers une inégalité non
justifiée) ; comparer une limite finie à une limite infinie (question
17).

Rendu : ../../render.sh scenes/maths/fonction-logarithme/bk-2021-n-x4.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Arrow,
    Axes,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    ParametricFunction,
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
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable (DESIGN.md §2) : f / (C) = objet nº1, sarcelle ;
# la branche cubique de h (x≤0), un second objet visuel proche mais
# distinct, sarcelle claire (même famille que la courbe g⁻¹ par
# symétrie — jamais affichées ensemble) ; tout outil ADMIS (règle du
# cours, limite de référence R1/R4, formule d'IPP, corollaire du TVI) en
# or ; une conclusion INTERMÉDIAIRE (une solution d'équation, une
# dérivée établie) en sarcelle forte ; une conclusion FINALE (limite,
# minimum, inégalité, domaine J, intégrale) en vert ; un piège, toujours
# en rouge, réservé à ça.
COL_F = BAC_ACCENT
COL_SECOND = BAC_ACCENT_LIGHT
COL_TOOL = BAC_WARNING
COL_CONCL = BAC_ACCENT_STRONG
COL_LIM = BAC_SUCCESS

DOT_R = 0.075

# ── Valeurs exactes, citées de la banque vérifiée (bk-2021-n-x4) ────────
E = float(np.e)                 # x = e, zéro de f (question 7)
E32 = float(np.e ** 1.5)        # x = e^{3/2} ≈ 4,4817, f(x)=x (question 7)
F_MIN = -2.0                    # f(1) = minimum de f (questions 6, 11)


def _f(x):
    """f(x) = 2x ln x - 2x — valable pour x > 0 (énoncé). Ne JAMAIS
    évaluer en x=0 (ln non défini) : f(0)=0 est une valeur DONNÉE par
    hypothèse, pas calculée par cette formule."""
    return 2 * x * np.log(x) - 2 * x


def _h_gauche(x):
    """h(x) = x³ + 3x — branche x ≤ 0 de la fonction par morceaux
    (questions 15-17), un polynôme, défini partout."""
    return x**3 + 3 * x


# Contrôles numériques des valeurs citées dans la banque (aucune valeur
# affichée à l'écran n'est recalculée différemment de ces vérifications).
assert abs(_f(1.0) - F_MIN) < 1e-9  # q6/q11 : f(1) = 2ln1-2 = -2
assert abs(_f(E) - 0.0) < 1e-7  # q7 : f(e) = 2e.1-2e = 0
assert abs(_f(E32) - E32) < 1e-6  # q7 : f(e^{3/2}) = e^{3/2}
assert abs(E32 - 4.4817) < 5e-3  # q8 : cohérent avec l'indication ≈4,5
assert abs(_h_gauche(0.0) - 0.0) < 1e-9  # q15 : h(0) = 0 sur les 2 def.
# q9 (IPP) : ∫₁^e x ln x dx = (1+e²)/4 — contrôle numérique (trapèzes).
_grille9 = np.linspace(1.0, E, 200_000)
assert abs(np.trapezoid(_grille9 * np.log(_grille9), _grille9) - (1 + E**2) / 4) < 1e-4
# q10 : ∫₁^e f(x) dx = (3-e²)/2 — même contrôle, à partir de f directement.
assert abs(np.trapezoid(_f(_grille9), _grille9) - (3 - E**2) / 2) < 1e-4


def _pose_axes(axes, x_ref: float, y_ref: float, x_target: float, y_target: float):
    """Aligne le point de données (x_ref, y_ref) sur le point-cible de la
    scène (x_target, y_target) — indépendant de la convention de centrage
    par défaut de Axes (méthode validée, gabarits limites-continuite)."""
    axes.shift((x_target * RIGHT + y_target * UP) - axes.c2p(x_ref, y_ref))
    return axes


# Configuration commune des systèmes d'axes de cette scène : traits
# discrets, sans graduation ni pointe automatique (valeurs annotées à la
# main — DESIGN.md, moins de bruit visuel).
AXIS_CONFIG = {
    "stroke_color": BAC_INK_MUTED,
    "stroke_width": 2,
    "include_ticks": False,
    "include_tip": False,
}

# Figure A (le repère principal, questions « plan » à 13) : ancre l'
# origine des données en scène à (1.1, 0.2), à l'intérieur de la région
# figure x∈[0,2;7], y∈[−2,4;+3,1] (DESIGN.md §1).
FIG_A_X_RANGE = [-0.6, 5.6, 1]
FIG_A_Y_RANGE = [-3, 8.5, 2]
FIG_A_X_LEN = 4.6
FIG_A_Y_LEN = 3.6
FIG_A_ORIGIN = (1.1, 0.2)


NARRATION = {
    "titre": "Problème du bac deux mille vingt et un, session normale, "
    "sciences expérimentales, sur neuf points : l'étude complète d'une "
    "fonction construite avec un logarithme, prolongée par continuité "
    "en zéro.",
    "intro": "On considère la fonction f, définie sur zéro plus l'infini "
    "fermé : f de zéro égale zéro, et pour x strictement positif, f de x "
    "égale deux x logarithme népérien de x, moins deux x.",
    "plan": "Avant tout calcul, on regarde l'allure de cette courbe — un "
    "point en zéro, donné par l'énoncé, qu'il va falloir raccorder par "
    "le calcul : c'est exactement la première question.",
    "q1": "Question un, zéro virgule cinq point. On montre que f est "
    "continue à droite en zéro, à l'aide du corollaire de croissances "
    "comparées x fois ln x qui tend vers zéro.",
    "q2": "Question deux, zéro virgule cinq point. On calcule la limite "
    "de f en plus l'infini, en mettant deux x en facteur.",
    "q3": "Question trois, zéro virgule cinq point. Le rapport f de x "
    "sur x part lui aussi à l'infini : la courbe admet une branche "
    "parabolique de direction l'axe des ordonnées.",
    "q4": "Question quatre, zéro virgule soixante-quinze point. Le même "
    "rapport, mais en zéro cette fois, est le taux d'accroissement de f "
    "à l'origine : il part vers moins l'infini, signe d'une tangente "
    "verticale.",
    "q5": "Question cinq, zéro virgule cinq point. On calcule la "
    "dérivée de f, terme à terme, avec la règle du produit.",
    "q6": "Question six, zéro virgule cinq point. Le signe de la "
    "dérivée donne le tableau de variations complet de f.",
    "q7": "Question sept, zéro virgule cinq point. On résout f de x "
    "égale zéro, puis f de x égale x, avec la même méthode : un produit "
    "nul.",
    "q8": "Question huit, un point. On rassemble tout ce qui a été "
    "établi pour construire la courbe complète.",
    "q9": "Question neuf, zéro virgule cinq point. Une intégration par "
    "parties, pour calculer l'intégrale de x fois ln x entre un et e.",
    "q10": "Question dix, zéro virgule cinq point. On en déduit "
    "l'intégrale de f elle-même entre un et e, par linéarité.",
    "q11": "Question onze, zéro virgule vingt-cinq point. Le minimum de "
    "f se lit directement sur le tableau de variations.",
    "q12": "Question douze, zéro virgule cinq point. Ce minimum global "
    "fonde une inégalité valable pour tout x strictement positif.",
    "q13": "Question treize, zéro virgule cinq point. On restreint f à "
    "un plus l'infini : cette restriction g admet une fonction "
    "réciproque.",
    "q14": "Question quatorze, zéro virgule soixante-quinze point. On "
    "construit la courbe de cette réciproque, symétrique de celle de g "
    "par rapport à la droite d'équation y égale x.",
    "q15": "Question quinze, zéro virgule cinq point. Une nouvelle "
    "fonction h, définie par deux morceaux : on étudie sa continuité en "
    "zéro.",
    "q16": "Question seize, zéro virgule cinq point. On étudie la "
    "dérivabilité à gauche de h en zéro.",
    "q17": "Question dix-sept, zéro virgule vingt-cinq point. La "
    "fonction h est-elle dérivable en zéro ? Comparer un nombre fini à "
    "l'infini tranche la question.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        defs = self.chapitre_intro()
        fig_c = self.chapitre_plan()
        self.chapitre_q1(fig_c)
        self.chapitre_q2(fig_c)
        self.chapitre_q3(fig_c)
        self.chapitre_q4(fig_c)
        self.chapitre_q5()
        self.chapitre_q6(fig_c)
        self.chapitre_q7(fig_c)
        self.chapitre_q8(fig_c)
        self.chapitre_q9(fig_c)
        self.chapitre_q10(fig_c)
        self.chapitre_q11(fig_c)
        self.chapitre_q12(fig_c)
        self.chapitre_q13(fig_c)
        self.chapitre_q14(fig_c, defs)
        fig_h = self.chapitre_q15()
        self.chapitre_q16(fig_h)
        self.chapitre_q17(fig_h)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2021 · SESSION NORMALE · SCIENCES EXP.",
            "Étude complète d'une fonction logarithme",
            "Problème — 9 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : f et son prolongement en 0 ─────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère f, définie sur [0,+∞[, par :", font_size=27,
        ).shift(2.5 * UP)
        def0 = MathTex(r"f(0) = 0", font_size=36, color=COL_F).next_to(
            entete, DOWN, buff=0.55
        )
        defx = MathTex(
            r"f(x) = 2x\ln x - 2x \quad (x>0)", font_size=36, color=COL_F
        ).next_to(def0, DOWN, buff=0.3)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(def0, shift=0.2 * UP), run_time=1.0)
        self.play(FadeIn(defx, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "Une fonction DÉFINIE PAR MORCEAUX : une valeur donnée en 0,",
            "une formule avec un logarithme partout ailleurs.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.play(FadeOut(entete))
        defs = VGroup(def0, defx)
        self.play(
            defs.animate.scale(0.6).to_edge(LEFT, buff=0.5).to_edge(UP, buff=1.0)
        )
        self.epingle(defs)
        return defs

    # ── La couche de sens : l'allure de (C), AVANT toute algèbre ──────
    def chapitre_plan(self):
        self.etape("plan-axes")
        axes = Axes(
            x_range=FIG_A_X_RANGE, y_range=FIG_A_Y_RANGE,
            x_length=FIG_A_X_LEN, y_length=FIG_A_Y_LEN, axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes, 0, 0, *FIG_A_ORIGIN)
        o_lbl = MathTex("O", font_size=26, color=BAC_INK_SOFT).next_to(
            axes.c2p(0, 0), DOWN + LEFT, buff=0.1
        )
        x_lbl = MathTex("x", font_size=26, color=BAC_INK_MUTED).next_to(
            axes.c2p(5.6, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes, run_time=1.8), FadeIn(o_lbl))
        self.play(FadeIn(x_lbl))
        self.legende(
            "On regarde d'abord l'allure de (C), avant toute preuve —",
            "juste pour VOIR ce qu'on va démontrer.",
        )
        self.pose(3.0)

        self.etape("plan-point-donne")
        pt0 = Dot(axes.c2p(0, 0), color=BAC_INK_MUTED, radius=DOT_R)
        lbl0 = MathTex(
            r"f(0)=0\ (\text{donné})", font_size=20, color=BAC_INK_MUTED
        ).next_to(pt0, RIGHT + UP, buff=0.12)
        self.play(FadeIn(pt0, scale=1.6), Write(lbl0))
        self.legende(
            "Ce point est DONNÉ par l'énoncé — reste à vérifier que la",
            "courbe s'y raccorde bien : exactement la question 1.",
        )
        self.pose(3.4)

        self.etape("plan-courbe")
        branch_dec = axes.plot(_f, x_range=[0.02, 1], color=BAC_INK_MUTED)
        branch_inc = axes.plot(_f, x_range=[1, 5.6], color=BAC_INK_MUTED)
        self.play(Create(branch_dec, run_time=1.6))
        self.play(Create(branch_inc, run_time=1.8))
        self.legende(
            "La courbe : elle plonge depuis 0, touche un minimum, puis",
            "remonte de plus en plus vite.",
        )
        self.pose(3.4)
        self.efface_legende()

        return {
            "axes": axes, "branch_dec": branch_dec, "branch_inc": branch_inc,
            "o_lbl": o_lbl, "x_lbl": x_lbl, "pt0": pt0, "lbl0": lbl0,
            "group": VGroup(
                axes, branch_dec, branch_inc, o_lbl, x_lbl, pt0, lbl0
            ),
        }

    # ── Q1 : continuité à droite en 0 (0,5 pt) ────────────────────────
    def chapitre_q1(self, fig_c):
        badge = self.bandeau_question("Question 1", "0,5 pt")
        self.ardoise()

        self.etape("q1-enonce")
        but = MathTex(
            r"\text{Continue à droite en } 0 \iff \lim_{x\to0^+} f(x) = f(0)",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Il faut montrer que la limite de f, quand x approche 0 par",
            "la droite, retombe exactement sur f(0).",
        )
        self.pose(3.2)

        self.etape("q1-rappel-R4")
        outil = MathTex(
            r"\lim_{x\to0^+} x\ln x = 0 \quad (R4,\ \text{croissances comparées})",
            font_size=21, color=COL_TOOL,
        )
        self.ecrit(outil, buff=0.5)
        self.encadre(couleur=COL_TOOL)
        self.legende(
            "Un résultat de référence, admis : x fois ln x tend vers 0",
            "quand x tend vers 0 par valeurs positives.",
        )
        self.pose(3.6)

        self.etape("q1-calcul")
        m1 = MathTex(
            r"\lim_{x\to0^+} f(x) = \lim_{x\to0^+}\left(2x\ln x - 2x\right)"
            r" = 2\times 0 - 0 = 0",
            font_size=21,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Les deux termes de f(x) tendent chacun vers 0 : leur",
            "différence aussi.",
        )
        self.pose(3.2)

        self.etape("q1-conclusion")
        m2 = MathTex(
            r"\lim_{x\to0^+} f(x) = 0 = f(0) \implies f \text{ continue à droite en } 0",
            font_size=19, color=COL_LIM,
        )
        self.ecrit(m2, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.play(fig_c["pt0"].animate.set_color(COL_LIM))
        nouveau_lbl = MathTex(
            r"f\ \text{continue en } 0", font_size=18, color=COL_LIM
        ).next_to(fig_c["pt0"], RIGHT + UP, buff=0.12)
        ancien_lbl0 = fig_c["lbl0"]
        self.play(FadeOut(ancien_lbl0), Write(nouveau_lbl))
        fig_c["group"].remove(ancien_lbl0)
        fig_c["lbl0"] = nouveau_lbl
        fig_c["group"].add(nouveau_lbl)
        self.legende(
            "La limite vaut exactement f(0) : le point donné se raccorde",
            "bien à la courbe. 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q2 : limite de f en +∞ (0,5 pt) ──────────────────────────────
    def chapitre_q2(self, fig_c):
        badge = self.bandeau_question("Question 2", "0,5 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(r"\text{Calculer } \lim_{x\to+\infty} f(x)", font_size=32)
        self.ecrit(but)
        self.legende(
            "On regarde ce qui se passe très loin à droite — pour cela,",
            "on met x en facteur commun.",
        )
        self.pose(3.0)

        self.etape("q2-factoriser")
        m1 = MathTex(r"f(x) = 2x\ln x - 2x = 2x(\ln x - 1)", font_size=30)
        self.ecrit(m1, buff=0.5)
        self.legende("2x est un facteur commun aux deux termes de f(x).")
        self.pose(2.8)

        self.etape("q2-limites-facteurs")
        m2 = MathTex(
            r"\lim_{x\to+\infty} \ln x = +\infty \ (R4) \implies"
            r" \lim_{x\to+\infty} (\ln x - 1) = +\infty",
            font_size=20,
        )
        m3 = MathTex(r"\lim_{x\to+\infty} 2x = +\infty", font_size=26)
        self.ecrit(m2, buff=0.5)
        self.ecrit(m3, buff=0.35)
        self.legende(
            "Les deux facteurs, 2x et (ln x moins un), partent chacun",
            "vers plus l'infini.",
        )
        self.pose(3.6)

        self.etape("q2-conclusion")
        m4 = MathTex(
            r"\lim_{x\to+\infty} f(x) = \lim_{x\to+\infty} 2x(\ln x-1) = +\infty",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "Un produit de deux quantités qui partent vers plus l'infini",
            "part lui aussi vers plus l'infini. 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3 : limite de f(x)/x, branche parabolique (0,5 pt) ───────────
    def chapitre_q3(self, fig_c):
        badge = self.bandeau_question("Question 3", "0,5 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = MathTex(
            r"\text{Calculer } \lim_{x\to+\infty} \dfrac{f(x)}{x}"
            r"\ \text{puis interpréter géométriquement}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "Un rapport f(x) sur x qui part à l'infini se lit sur la",
            "courbe : c'est ce qu'on va interpréter.",
        )
        self.pose(3.4)

        self.etape("q3-diviser")
        m1 = MathTex(
            r"\dfrac{f(x)}{x} = \dfrac{2x(\ln x-1)}{x} = 2\ln x - 2 \quad (x\ne0)",
            font_size=26,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On divise la forme factorisée de f(x) par x, non nul.")
        self.pose(3.0)

        self.etape("q3-limite")
        m2 = MathTex(
            r"\lim_{x\to+\infty} (2\ln x - 2) = +\infty \quad (R4)",
            font_size=27,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("ln x part vers plus l'infini (R4) : le double aussi.")
        self.pose(2.8)

        self.etape("q3-conclusion")
        m3 = MathTex(
            r"\lim_{x\to+\infty} \dfrac{f(x)}{x} = +\infty \implies"
            r" (C) \text{ admet une branche parabolique}",
            font_size=18, color=COL_LIM,
        )
        m4 = MathTex(
            r"\text{de direction } (O,\vec{j}) \text{ au voisinage de } +\infty",
            font_size=18, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.ecrit(m4, buff=0.2)
        self.encadre(couleur=COL_LIM)
        axes = fig_c["axes"]
        fleche_oj = Arrow(
            axes.c2p(5.3, 5.8), axes.c2p(5.3, 8.2),
            buff=0.05, color=COL_LIM, stroke_width=3,
            max_tip_length_to_length_ratio=0.15,
        )
        lbl_oj = MathTex(r"(O,\vec{j})", font_size=18, color=COL_LIM).next_to(
            fleche_oj, LEFT, buff=0.1
        )
        self.play(Create(fleche_oj, run_time=1.2), FadeIn(lbl_oj))
        fig_c["group"].add(fleche_oj, lbl_oj)
        self.legende(
            "Un rapport infini : la courbe grossit plus vite que TOUTE",
            "droite issue de l'origine — elle devient quasi verticale.",
            "0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q4 : limite de f(x)/x en 0+, tangente verticale (0,75 pt) ─────
    def chapitre_q4(self, fig_c):
        badge = self.bandeau_question("Question 4", "0,75 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but = MathTex(
            r"\text{Calculer } \lim_{x\to0^+} \dfrac{f(x)}{x}"
            r"\ \text{puis interpréter géométriquement}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "Le même rapport que tout à l'heure, mais tout près de 0",
            "cette fois.",
        )
        self.pose(3.0)

        self.etape("q4-sens-taux")
        axes = fig_c["axes"]
        corde = Line(
            axes.c2p(0, 0), axes.c2p(1.5, float(_f(1.5))),
            color=COL_TOOL, stroke_width=3,
        )
        lbl_corde = MathTex(
            r"\text{pente} = \dfrac{f(x)}{x}", font_size=18, color=COL_TOOL
        ).next_to(corde, DOWN, buff=0.12)
        self.play(Create(corde, run_time=1.2), FadeIn(lbl_corde))
        self.legende(
            "Comme f(0)=0, ce rapport EST le taux d'accroissement de f",
            "entre 0 et x — la pente de cette corde (illustration, un x",
            "quelconque).",
        )
        self.pose(4.0)

        self.etape("q4-formule")
        m1 = MathTex(
            r"\dfrac{f(x)}{x} = \dfrac{f(x)-f(0)}{x-0} = 2\ln x - 2 \quad (x>0)",
            font_size=23,
        )
        self.ecrit(m1)
        self.legende("Même calcul de division que la question précédente.")
        self.pose(2.8)

        self.etape("q4-limite")
        m2 = MathTex(
            r"\lim_{x\to0^+} (2\ln x - 2) = -\infty \quad (R4)", font_size=27,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("ln x part vers moins l'infini en 0 par la droite (R4).")
        self.pose(2.8)

        self.etape("q4-conclusion")
        m3 = MathTex(
            r"\lim_{x\to0^+} \dfrac{f(x)}{x} = -\infty \implies"
            r" (C) \text{ admet une demi-tangente}",
            font_size=18, color=COL_LIM,
        )
        m4 = MathTex(
            r"\text{verticale au point } (0,0)", font_size=18, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.ecrit(m4, buff=0.2)
        self.encadre(couleur=COL_LIM)
        self.play(FadeOut(corde), FadeOut(lbl_corde))
        tangente = DashedLine(
            axes.c2p(0, -0.5), axes.c2p(0, 0.9),
            color=COL_LIM, stroke_width=3.5, dash_length=0.1,
        )
        lbl_tang = Text(
            "tangente verticale", font_size=16, color=COL_LIM
        ).next_to(tangente.get_top(), RIGHT, buff=0.1)
        self.play(Create(tangente, run_time=1.4), FadeIn(lbl_tang))
        fig_c["group"].add(tangente, lbl_tang)
        self.legende(
            "Un taux d'accroissement infini : la pente de la corde part",
            "à la verticale quand x se rapproche de 0. 0,75 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 : dérivée f'(x) = 2 ln x (0,5 pt) ─────────────────────────
    def chapitre_q5(self):
        badge = self.bandeau_question("Question 5", "0,5 pt")
        self.ardoise()

        self.etape("q5-enonce")
        but = MathTex(
            r"\text{Calculer } f'(x) \text{ pour tout } x \text{ de } ]0,+\infty[",
            font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "On dérive f(x) = 2x ln x - 2x terme à terme : le second",
            "terme est simple, le premier est un PRODUIT.",
        )
        self.pose(3.4)

        self.etape("q5-rappel-outils")
        outil = MathTex(
            r"(uv)' = u'v + uv', \qquad (\ln x)' = \dfrac1x",
            font_size=24, color=COL_TOOL,
        )
        self.ecrit(outil, buff=0.5)
        self.encadre(couleur=COL_TOOL)
        self.legende(
            "Deux règles admises : la dérivée d'un produit, et celle du",
            "logarithme népérien.",
        )
        self.pose(3.6)

        self.etape("q5-piege-produit")
        piege = VGroup(
            Text("ATTENTION : (2x ln x)' n'est PAS 2 fois (ln x)' — c'est",
                 font_size=19, color=BAC_ERROR),
            Text("un PRODUIT de deux facteurs, 2x et ln x : la règle exige",
                 font_size=19, color=BAC_ERROR),
            Text("DEUX termes, u'v ET uv', jamais un seul.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : oublier l'un des deux termes de la",
            "règle du produit.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q5-appliquer-produit")
        m1 = MathTex(
            r"(2x\ln x)' = (2x)'\times\ln x + 2x\times(\ln x)'",
            font_size=23,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "On applique la règle du produit à u=2x et v=ln x, avec",
            "u'=2.",
        )
        self.pose(3.2)

        self.etape("q5-substituer")
        m2 = MathTex(
            r"(2x\ln x)' = 2\ln x + 2x\times\dfrac1x = 2\ln x + 2",
            font_size=25,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On remplace (ln x)' par 1/x : 2x fois 1/x se simplifie en 2.",
        )
        self.pose(3.2)

        self.etape("q5-conclusion")
        m3 = MathTex(
            r"f'(x) = \left(2\ln x + 2\right) - 2 = 2\ln x",
            font_size=32, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "On retire la dérivée de -2x, qui vaut -2 : il reste",
            "exactement 2 ln x. 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q6 : tableau de variations de f (0,5 pt) ─────────────────────
    def chapitre_q6(self, fig_c):
        badge = self.bandeau_question("Question 6", "0,5 pt")
        self.ardoise()

        self.etape("q6-enonce")
        but = MathTex(
            r"\text{Dresser le tableau de variations de } f \text{ sur } [0,+\infty[",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "Le signe de la dérivée f', trouvée à la question précédente,",
            "donne le sens de variation.",
        )
        self.pose(3.2)

        self.etape("q6-signe-facteur")
        m1 = MathTex(
            r"f'(x) = 2\ln x,\ x>0 \implies \text{signe}(f'(x)) = \text{signe}(\ln x)",
            font_size=18,
        )
        self.ecrit(m1)
        self.legende(
            "Le facteur 2 est strictement positif : il ne change pas le",
            "signe. Il reste à signer ln x.",
        )
        self.pose(3.4)

        self.etape("q6-rappel-R1")
        outil = MathTex(
            r"\ln x < 0 \text{ sur } ]0,1[, \quad \ln 1 = 0, \quad"
            r" \ln x > 0 \text{ sur } ]1,+\infty[",
            font_size=17, color=COL_TOOL,
        )
        self.ecrit(outil, buff=0.5)
        self.encadre(couleur=COL_TOOL)
        self.legende(
            "Résultat de référence, admis (R1) : ln x change de signe",
            "exactement en x = 1.",
        )
        self.pose(3.6)

        self.etape("q6-valeur-min")
        m2 = MathTex(r"f(1) = 2\ln 1 - 2 = -2", font_size=28, color=COL_CONCL)
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=COL_CONCL)
        self.legende("On évalue f au point où la dérivée s'annule : x = 1.")
        self.pose(3.0)

        self.etape("q6-tableau")
        x0, x1, x2 = -2.1, 0.0, 2.3
        ligne_x = Arrow(
            np.array([x0, 0, 0]), np.array([x2 + 0.3, 0, 0]), buff=0,
            color=BAC_INK_SOFT, stroke_width=2.2,
            max_tip_length_to_length_ratio=0.05,
        )
        tick0 = Line(
            np.array([x0, -0.1, 0]), np.array([x0, 0.1, 0]),
            color=BAC_INK_SOFT, stroke_width=2,
        )
        tick1 = Line(
            np.array([x1, -0.12, 0]), np.array([x1, 0.12, 0]),
            color=COL_CONCL, stroke_width=2.5,
        )
        lbl_x0v = MathTex("0", font_size=18).next_to(tick0, DOWN, buff=0.08)
        lbl_x1v = MathTex("1", font_size=18, color=COL_CONCL).next_to(
            tick1, DOWN, buff=0.08
        )
        lbl_xinfv = MathTex(r"+\infty", font_size=18).next_to(
            ligne_x.get_end(), DOWN, buff=0.08
        )
        lbl_row_x = MathTex("x", font_size=20).move_to(np.array([x0 - 0.5, 0, 0]))
        signe_m = MathTex("-", font_size=24).move_to(np.array([x0 / 2, 0.45, 0]))
        signe_0 = MathTex("0", font_size=18, color=COL_CONCL).move_to(
            np.array([x1, 0.45, 0])
        )
        signe_p = MathTex("+", font_size=24, color=COL_LIM).move_to(
            np.array([(x1 + x2) / 2, 0.45, 0])
        )
        lbl_row_signe = MathTex(r"f'(x)", font_size=18).move_to(
            np.array([x0 - 0.5, 0.45, 0])
        )
        ligne_signe = VGroup(
            lbl_row_x, ligne_x, tick0, tick1, lbl_x0v, lbl_x1v, lbl_xinfv,
            lbl_row_signe, signe_m, signe_0, signe_p,
        )
        self.ecrit(ligne_signe, buff=0.55)
        self.legende(
            "Une ligne de signe : f'(x) est négative avant 1, nulle en 1,",
            "positive après.",
        )
        self.pose(3.6)

        p_start = np.array([x0, 0.55, 0])
        p_min = np.array([x1, -0.55, 0])
        p_end = np.array([x2, 0.65, 0])
        fleche1 = Arrow(
            p_start, p_min, buff=0.05, color=COL_F, stroke_width=3,
            max_tip_length_to_length_ratio=0.1,
        )
        fleche2 = Arrow(
            p_min, p_end, buff=0.05, color=COL_F, stroke_width=3,
            max_tip_length_to_length_ratio=0.08,
        )
        lbl_f0 = MathTex("0", font_size=18).next_to(p_start, UP, buff=0.08)
        lbl_fmin = MathTex("-2", font_size=18, color=COL_LIM).next_to(
            p_min, DOWN, buff=0.08
        )
        lbl_finf = MathTex(r"+\infty", font_size=18).next_to(p_end, UP, buff=0.08)
        lbl_row_f = MathTex("f(x)", font_size=20).move_to(np.array([x0 - 0.5, 0, 0]))
        variations = VGroup(
            lbl_row_f, fleche1, fleche2, lbl_f0, lbl_fmin, lbl_finf,
        )
        self.ecrit(variations, buff=0.6)
        self.legende(
            "f décroît de 0 à -2 sur [0,1], puis croît de -2 à plus",
            "l'infini sur [1,+∞[ : le tableau complet.",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q6-courbe-confirmation")
        axes = fig_c["axes"]
        self.play(
            fig_c["branch_dec"].animate.set_color(COL_F),
            fig_c["branch_inc"].animate.set_color(COL_F),
            run_time=1.4,
        )
        min_dot = Dot(axes.c2p(1, F_MIN), color=COL_LIM, radius=DOT_R)
        min_lbl = MathTex(r"(1,-2)", font_size=20, color=COL_LIM).next_to(
            min_dot, DOWN, buff=0.12
        )
        self.play(FadeIn(min_dot, scale=1.6), Write(min_lbl))
        fig_c["min_dot"] = min_dot
        fig_c["min_lbl"] = min_lbl
        fig_c["group"].add(min_dot, min_lbl)
        self.legende(
            "On retrouve, sur la courbe, exactement le creux qu'on vient",
            "de démontrer : le minimum en (1,-2). 0,5 point.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q7 : résoudre f(x)=0 et f(x)=x (0,5 pt) ───────────────────────
    def chapitre_q7(self, fig_c):
        badge = self.bandeau_question("Question 7", "0,5 pt")
        self.ardoise()
        axes = fig_c["axes"]

        self.etape("q7-enonce")
        but = MathTex(
            r"\text{Résoudre dans } ]0,+\infty[ : f(x)=0 \quad \text{puis} \quad f(x)=x",
            font_size=21,
        )
        self.ecrit(but)
        self.legende(
            "Deux équations, résolues avec le même réflexe : ramener à",
            "un produit nul.",
        )
        self.pose(3.2)

        self.etape("q7-resol-fx0")
        m1a = MathTex(
            r"f(x)=0 \iff 2x(\ln x-1)=0 \quad (x\ne0 \text{ sur } ]0,+\infty[)",
            font_size=20,
        )
        m1b = MathTex(
            r"\iff \ln x = 1 \iff x = e", font_size=26, color=COL_CONCL,
        )
        self.ecrit(
            VGroup(m1a, m1b).arrange(DOWN, aligned_edge=LEFT, buff=0.18), buff=0.5
        )
        self.legende(
            "x n'est jamais nul sur ]0,+∞[ : il reste ln x = 1, soit",
            "x = e, par définition de e.",
        )
        self.pose(3.6)

        self.etape("q7-marque-e")
        pt_e = Dot(axes.c2p(E, 0), color=COL_CONCL, radius=DOT_R)
        lbl_e = MathTex("e", font_size=20, color=COL_CONCL).next_to(
            pt_e, DOWN, buff=0.12
        )
        self.play(FadeIn(pt_e, scale=1.6), Write(lbl_e))
        fig_c["group"].add(pt_e, lbl_e)
        self.legende("Exactement le point où la courbe recroise l'axe des x.")
        self.pose(2.8)

        self.etape("q7-resol-fxx")
        m2a = MathTex(
            r"f(x)=x \iff 2x\ln x-3x=0 \iff x(2\ln x-3)=0", font_size=19,
        )
        m2b = MathTex(
            r"\iff \ln x = \dfrac32 \iff x = e^{3/2}", font_size=26, color=COL_CONCL,
        )
        self.ecrit(
            VGroup(m2a, m2b).arrange(DOWN, aligned_edge=LEFT, buff=0.18), buff=0.5
        )
        self.legende(
            "On regroupe les termes en x, on factorise, x non nul : il",
            "reste ln x = 3/2, soit x = e puissance trois demis.",
        )
        self.pose(3.8)

        self.etape("q7-marque-e32-et-droite")
        droite = DashedLine(
            axes.c2p(0, 0), axes.c2p(5.6, 5.6), color=COL_SECOND,
            stroke_width=2, dash_length=0.12,
        )
        lbl_delta = MathTex(
            r"(\Delta):y=x", font_size=18, color=COL_SECOND
        ).next_to(axes.c2p(2.8, 3.1), UP + LEFT, buff=0.08)
        self.play(Create(droite, run_time=1.4), FadeIn(lbl_delta))
        pt_e32 = Dot(axes.c2p(E32, E32), color=COL_CONCL, radius=DOT_R)
        lbl_e32 = MathTex(r"e^{3/2}", font_size=18, color=COL_CONCL).next_to(
            pt_e32, UP + RIGHT, buff=0.1
        )
        self.play(FadeIn(pt_e32, scale=1.6), Write(lbl_e32))
        fig_c["group"].add(droite, lbl_delta, pt_e32, lbl_e32)
        self.legende(
            "Une nouvelle droite, (Δ) d'équation y=x : (C) la croise",
            "exactement au point d'abscisse e puissance trois demis.",
        )
        self.pose(4.0)

        self.etape("q7-conclusion")
        m3 = MathTex(
            r"S_{f(x)=0} = \{e\}, \qquad S_{f(x)=x} = \{e^{3/2}\}",
            font_size=24, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("Les deux ensembles de solutions. 0,5 point.")
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q8 : construction de (C) (1 pt) ──────────────────────────────
    def chapitre_q8(self, fig_c):
        badge = self.bandeau_question("Question 8", "1 pt")
        self.ardoise()

        self.etape("q8-enonce")
        but = MathTex(
            r"\text{Construire } (C) \text{ dans } (O,\vec i,\vec j)"
            r" \quad (e^{3/2}\simeq 4{,}5)",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "On rassemble maintenant tout ce qui a déjà été démontré",
            "pour construire la courbe complète.",
        )
        self.pose(3.4)

        self.etape("q8-recap-ingredients")
        recap = VGroup(
            Text("On reporte tout ce qui a déjà été établi :",
                 font_size=19, color=BAC_INK_SOFT),
            Text("• demi-tangente verticale en (0,0) — question 4",
                 font_size=18, color=BAC_INK_SOFT),
            Text("• minimum en (1,-2) — question 6",
                 font_size=18, color=BAC_INK_SOFT),
            Text("• zéro en (e,0), croisement de (Δ) en (e^(1,5) ; e^(1,5))",
                 font_size=18, color=BAC_INK_SOFT),
            Text("  — question 7",
                 font_size=18, color=BAC_INK_SOFT),
            Text("• branche parabolique de direction (O,j) — question 3",
                 font_size=18, color=BAC_INK_SOFT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.ecrit(recap, buff=0.5)
        self.legende(
            "Rien de nouveau à calculer : construire, c'est assembler",
            "ce qui est déjà prouvé.",
        )
        self.pose(4.2)
        self.nettoie()

        self.etape("q8-construction-finale")
        self.play(
            fig_c["branch_dec"].animate.set_color(COL_LIM),
            fig_c["branch_inc"].animate.set_color(COL_LIM),
            run_time=1.6,
        )
        self.legende(
            "(C) part de (0,0) à la verticale, descend au minimum,",
            "remonte en traversant l'axe en e puis (Δ) en e^(1,5).",
        )
        self.pose(3.8)

        self.etape("q8-conclusion")
        note = VGroup(
            Text("Le tracé au crayon utilise l'approximation e^(1,5) ≈ 4,5",
                 font_size=17, color=BAC_INK_MUTED),
            Text("donnée par l'énoncé ; ici, la position exacte est utilisée.",
                 font_size=17, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(note, buff=0.5)
        self.legende(
            "La courbe (C) est complète et cohérente avec les neuf",
            "premières questions. 1 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q9 : intégration par parties, ∫₁^e x ln x dx (0,5 pt) ─────────
    def chapitre_q9(self, fig_c):
        badge = self.bandeau_question("Question 9", "0,5 pt")
        self.ardoise()

        self.etape("q9-enonce")
        but = MathTex(
            r"\text{Montrer, par IPP, que } \int_1^e x\ln x\,dx = \dfrac{1+e^2}{4}",
            font_size=23,
        )
        self.ecrit(but)
        self.legende(
            "Une technique hors programme de cette leçon : intégrer par",
            "parties. On la construit pas à pas.",
        )
        self.pose(3.6)

        self.etape("q9-sens-aire")
        self.play(FadeOut(fig_c["group"]))
        axes9 = Axes(
            x_range=[0, 3.2, 1], y_range=[-0.5, 3, 1],
            x_length=3.6, y_length=3.0, axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes9, 0, 0, 2.0, 0.3)
        x_lbl9 = MathTex("x", font_size=20, color=BAC_INK_MUTED).next_to(
            axes9.c2p(3.2, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes9, run_time=1.4), FadeIn(x_lbl9))
        curve9 = axes9.plot(
            lambda x: x * np.log(x), x_range=[1, E], color=COL_TOOL, stroke_width=3,
        )
        self.play(Create(curve9, run_time=1.6))
        area9 = axes9.get_area(curve9, x_range=[1, E], color=COL_TOOL, opacity=0.3)
        self.play(FadeIn(area9))
        lbl_1 = MathTex("1", font_size=20).next_to(axes9.c2p(1, 0), DOWN, buff=0.1)
        lbl_e = MathTex("e", font_size=20).next_to(axes9.c2p(E, 0), DOWN, buff=0.1)
        self.play(FadeIn(lbl_1), FadeIn(lbl_e))
        self.legende(
            "L'intégrale, c'est l'AIRE sous la courbe de x fois ln x,",
            "entre 1 et e — avant tout calcul.",
        )
        self.pose(3.8)
        self.efface_legende()

        self.etape("q9-setup-uv")
        outil = MathTex(
            r"\int_a^b u(x)v'(x)\,dx = \Big[u(x)v(x)\Big]_a^b - \int_a^b u'(x)v(x)\,dx",
            font_size=16, color=COL_TOOL,
        )
        self.ecrit(outil)
        self.encadre(couleur=COL_TOOL)
        setup = MathTex(
            r"u=\ln x,\ u'=\dfrac1x\ ; \qquad v'=x,\ v=\dfrac{x^2}{2}",
            font_size=22,
        )
        self.ecrit(setup, buff=0.5)
        self.legende(
            "Formule d'IPP admise, puis un choix : dériver ln x (plus",
            "simple), primitiver x.",
        )
        self.pose(4.0)

        self.etape("q9-applique-formule")
        m1 = MathTex(
            r"\int_1^e x\ln x\,dx = \left[\dfrac{x^2}{2}\ln x\right]_1^e"
            r" - \int_1^e \dfrac{x}{2}\,dx",
            font_size=22,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On applique la formule, avec les choix de u et v.")
        self.pose(3.0)

        self.etape("q9-evalue-crochet")
        m2 = MathTex(
            r"\left[\dfrac{x^2}{2}\ln x\right]_1^e"
            r" = \dfrac{e^2}{2}\times 1 - \dfrac12\times 0 = \dfrac{e^2}{2}",
            font_size=21,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("On évalue le crochet aux bornes : ln e = 1, ln 1 = 0.")
        self.pose(3.2)

        self.etape("q9-evalue-reste")
        m3 = MathTex(
            r"\int_1^e \dfrac{x}{2}\,dx = \left[\dfrac{x^2}{4}\right]_1^e"
            r" = \dfrac{e^2}{4} - \dfrac14",
            font_size=23,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("Une primitive élémentaire de x/2.")
        self.pose(3.0)

        self.etape("q9-conclusion")
        m4 = MathTex(
            r"\int_1^e x\ln x\,dx = \dfrac{e^2}{2} - \left(\dfrac{e^2}{4}-\dfrac14\right)"
            r" = \dfrac{1+e^2}{4}",
            font_size=20, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("On regroupe les deux termes. 0,5 point.")
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(VGroup(axes9, curve9, area9, lbl_1, lbl_e, x_lbl9)))
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q10 : en déduire ∫₁^e f(x) dx (0,5 pt) ────────────────────────
    def chapitre_q10(self, fig_c):
        badge = self.bandeau_question("Question 10", "0,5 pt")
        self.ardoise()

        self.etape("q10-enonce")
        but = MathTex(r"\text{En déduire } \int_1^e f(x)\,dx", font_size=32)
        self.ecrit(but)
        self.legende(
            "On réutilise le résultat de la question précédente, pour f",
            "lui-même cette fois.",
        )
        self.pose(3.0)

        self.etape("q10-figure-reprise")
        self.play(FadeIn(fig_c["group"]))
        axes = fig_c["axes"]
        aire_fc = axes.get_area(
            fig_c["branch_inc"], x_range=[1, E], color=COL_F, opacity=0.3,
        )
        self.play(FadeIn(aire_fc))
        fig_c["group"].add(aire_fc)
        self.legende(
            "L'aire sous (C), entre les deux points déjà marqués : le",
            "minimum en 1, et le zéro en e.",
        )
        self.pose(3.6)
        self.efface_legende()

        self.etape("q10-linearite")
        m1 = MathTex(
            r"\int_1^e f(x)\,dx = 2\int_1^e x\ln x\,dx - 2\int_1^e x\,dx",
            font_size=23,
        )
        self.ecrit(m1)
        self.legende(
            "f(x) = 2x ln x - 2x : on sépare l'intégrale par linéarité.",
        )
        self.pose(3.2)

        self.etape("q10-integrale-x")
        m2 = MathTex(
            r"\int_1^e x\,dx = \left[\dfrac{x^2}{2}\right]_1^e = \dfrac{e^2-1}{2}",
            font_size=27,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("Une primitive élémentaire de x, évaluée entre 1 et e.")
        self.pose(3.0)

        self.etape("q10-substitution")
        m3 = MathTex(
            r"\int_1^e f(x)\,dx = 2\cdot\dfrac{1+e^2}{4} - 2\cdot\dfrac{e^2-1}{2}"
            r" = \dfrac{1+e^2}{2} - (e^2-1)",
            font_size=19,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On réutilise le résultat de la question 9 pour le premier",
            "terme.",
        )
        self.pose(3.4)

        self.etape("q10-conclusion")
        m4 = MathTex(
            r"\int_1^e f(x)\,dx = \dfrac{3-e^2}{2}", font_size=32, color=COL_LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "e² ≈ 7,39 > 3 : cette aire algébrique est négative, cohérent",
            "avec le creux de (C) sous l'axe entre 1 et e. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q11 : minimum de f sur ]0,+∞[ (0,25 pt) ───────────────────────
    def chapitre_q11(self, fig_c):
        badge = self.bandeau_question("Question 11", "0,25 pt")
        self.ardoise()

        self.etape("q11-enonce")
        but = MathTex(
            r"\text{Déterminer le minimum de } f \text{ sur } ]0,+\infty[",
            font_size=26,
        )
        self.ecrit(but)
        self.legende("Une lecture directe du tableau de variations, question 6.")
        self.pose(2.8)

        self.etape("q11-lecture-tableau")
        m1 = MathTex(
            r"f \text{ décroît sur } ]0,1] \text{ puis croît sur } [1,+\infty["
            r" \implies \min_{]0,+\infty[} f = f(1)",
            font_size=17,
        )
        self.ecrit(m1)
        self.legende("Un minimum précédé d'une décroissance, suivi d'une croissance.")
        self.pose(3.2)

        self.etape("q11-valeur")
        m2 = MathTex(r"f(1) = 2\ln 1 - 2 = -2", font_size=28, color=COL_CONCL)
        self.ecrit(m2, buff=0.5)
        self.legende("La même valeur déjà calculée à la question 6.")
        self.pose(2.8)

        self.etape("q11-conclusion")
        m3 = MathTex(
            r"\min_{]0,+\infty[} f = -2", font_size=32, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        halo = self.entoure(fig_c["min_dot"], COL_LIM, buff=0.16)
        self.legende("Le minimum de f sur tout l'intervalle : -2. 0,25 point.")
        self.pose(3.4)
        self.play(FadeOut(halo))
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q12 : ln x ≥ (x-1)/x sur ]0,+∞[ (0,5 pt) ──────────────────────
    def chapitre_q12(self, fig_c):
        badge = self.bandeau_question("Question 12", "0,5 pt")
        self.ardoise()
        axes = fig_c["axes"]

        self.etape("q12-enonce")
        but = MathTex(
            r"\text{En déduire que, pour tout } x>0,\ \ln x \ge \dfrac{x-1}{x}",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "On va exploiter le minimum -2, valable pour tout x, pas",
            "seulement en x = 1.",
        )
        self.pose(3.4)

        self.etape("q12-sens-figure")
        plancher = DashedLine(
            axes.c2p(-0.6, -2), axes.c2p(5.6, -2), color=COL_SECOND,
            stroke_width=2, dash_length=0.12,
        )
        lbl_plancher = Text(
            "f(x) ≥ -2 partout sur ]0,+∞[", font_size=15, color=COL_SECOND
        ).next_to(axes.c2p(3.0, -2), UP, buff=0.08)
        self.play(Create(plancher, run_time=1.2), FadeIn(lbl_plancher))
        fig_c["group"].add(plancher, lbl_plancher)
        self.legende(
            "-2 est un minimum GLOBAL : la courbe ne descend jamais plus",
            "bas, nulle part sur le domaine.",
        )
        self.pose(3.8)
        self.efface_legende()

        self.etape("q12-inegalite-min")
        m1 = MathTex(
            r"\forall x>0,\ f(x)\ge f(1) \iff 2x\ln x - 2x \ge -2",
            font_size=23,
        )
        self.ecrit(m1)
        self.legende(
            "f(1) = -2 est le minimum global (question précédente) :",
            "chaque valeur de f lui est supérieure ou égale.",
        )
        self.pose(3.6)

        self.etape("q12-diviser")
        m2 = MathTex(
            r"2x\ln x - 2x \ge -2 \iff \ln x - 1 \ge -\dfrac1x"
            r" \quad (\text{division par } 2x>0)",
            font_size=19,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On divise par 2x, strictement positif : le sens de",
            "l'inégalité est conservé.",
        )
        self.pose(3.6)

        self.etape("q12-conclusion")
        m3 = MathTex(
            r"\ln x \ge 1 - \dfrac1x = \dfrac{x-1}{x}", font_size=30, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("Exactement l'inégalité demandée. 0,5 point.")
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q13 : g, restriction de f, admet une réciproque (0,5 pt) ──────
    def chapitre_q13(self, fig_c):
        badge = self.bandeau_question("Question 13", "0,5 pt")
        self.ardoise()
        axes = fig_c["axes"]

        self.etape("q13-enonce")
        but1 = MathTex(
            r"g \text{ : restriction de } f \text{ à } [1,+\infty[", font_size=26,
        )
        but2 = MathTex(
            r"\text{Montrer que } g \text{ admet } g^{-1} \text{ définie sur un intervalle } J",
            font_size=21,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "On restreint f à la branche croissante — et on cherche sa",
            "fonction réciproque.",
        )
        self.pose(3.6)

        self.etape("q13-sens-bijection")
        crochet = Line(
            axes.c2p(1, -2.55), axes.c2p(1, -2.3), color=COL_TOOL, stroke_width=4,
        )
        lbl_crochet = Text(
            "domaine de g", font_size=15, color=COL_TOOL
        ).next_to(crochet, DOWN, buff=0.08)
        self.play(Create(crochet, run_time=0.8), FadeIn(lbl_crochet))
        fig_c["group"].add(crochet, lbl_crochet)
        self.legende(
            "Une fonction réciproque « défait » g : elle renvoie chaque",
            "hauteur y vers l'unique x qui lui correspond.",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q13-rappel-corollaire")
        outil1 = MathTex(
            r"g \text{ continue et strictement croissante sur } [1,+\infty[",
            font_size=19, color=COL_TOOL,
        )
        outil2 = MathTex(
            r"\implies g \text{ bijection de } [1,+\infty[ \text{ sur son intervalle image}",
            font_size=17, color=COL_TOOL,
        )
        self.ecrit(outil1)
        self.ecrit(outil2, buff=0.3)
        self.encadre(couleur=COL_TOOL)
        self.legende(
            "Corollaire du TVI, admis, hors socle de cette leçon : une",
            "fonction continue et strictement monotone est une bijection.",
        )
        self.pose(4.2)

        self.etape("q13-bornes-J")
        m1 = MathTex(
            r"g(1) = f(1) = -2 \quad (\text{question } 11)", font_size=24,
        )
        m2 = MathTex(
            r"\lim_{x\to+\infty} g(x) = \lim_{x\to+\infty} f(x) = +\infty"
            r" \quad (\text{question } 2)",
            font_size=20,
        )
        self.ecrit(m1, buff=0.5)
        self.ecrit(m2, buff=0.3)
        self.legende(
            "L'intervalle image se lit aux bornes : g hérite des valeurs",
            "déjà calculées pour f.",
        )
        self.pose(3.8)

        self.etape("q13-conclusion")
        m3 = MathTex(
            r"g \text{ bijection de } [1,+\infty[ \text{ sur } J = [-2,+\infty[",
            font_size=23, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende(
            "g admet donc une réciproque g⁻¹, définie sur J = [-2,+∞[.",
            "0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q14 : construction de la courbe de g⁻¹ (0,75 pt) ──────────────
    def chapitre_q14(self, fig_c, defs):
        badge = self.bandeau_question("Question 14", "0,75 pt")
        self.ardoise()

        self.etape("q14-enonce")
        but = MathTex(
            r"\text{Construire, dans le même repère, la courbe de } g^{-1}",
            font_size=23,
        )
        self.ecrit(but)
        self.legende(
            "La courbe d'une réciproque est le SYMÉTRIQUE de celle de g,",
            "par rapport à la droite (Δ):y=x.",
        )
        self.pose(3.8)

        self.etape("q14-figure-large")
        self.play(FadeOut(fig_c["group"]))
        axes_b = Axes(
            x_range=[-2.3, 6.3, 2], y_range=[-2.3, 6.3, 2],
            x_length=4.0, y_length=4.0, axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes_b, 0, 0, 2.4, 0.1)
        o_lbl_b = MathTex("O", font_size=22, color=BAC_INK_SOFT).next_to(
            axes_b.c2p(0, 0), DOWN + LEFT, buff=0.08
        )
        x_lbl_b = MathTex("x", font_size=22, color=BAC_INK_MUTED).next_to(
            axes_b.c2p(6.3, 0), RIGHT, buff=0.1
        )
        self.play(Create(axes_b, run_time=1.6), FadeIn(o_lbl_b), FadeIn(x_lbl_b))
        droite_b = DashedLine(
            axes_b.c2p(-2.3, -2.3), axes_b.c2p(6.3, 6.3), color=COL_SECOND,
            stroke_width=2, dash_length=0.12,
        )
        lbl_delta_b = MathTex(
            r"(\Delta):y=x", font_size=18, color=COL_SECOND
        ).next_to(axes_b.c2p(5.6, 6.0), LEFT, buff=0.05)
        self.play(Create(droite_b, run_time=1.4), FadeIn(lbl_delta_b))
        courbe_g = axes_b.plot(_f, x_range=[1, 5], color=COL_LIM, stroke_width=3.5)
        self.play(Create(courbe_g, run_time=1.8))
        pt_a = Dot(axes_b.c2p(1, F_MIN), color=COL_LIM, radius=DOT_R)
        lbl_a = MathTex(r"(1,-2)", font_size=16, color=COL_LIM).next_to(
            pt_a, DOWN, buff=0.1
        )
        pt_b = Dot(axes_b.c2p(E, 0), color=COL_LIM, radius=DOT_R)
        lbl_b = MathTex("e", font_size=18, color=COL_LIM).next_to(
            pt_b, DOWN, buff=0.1
        )
        pt_c = Dot(axes_b.c2p(E32, E32), color=COL_CONCL, radius=DOT_R)
        lbl_c = MathTex(r"e^{3/2}", font_size=16, color=COL_CONCL).next_to(
            pt_c, UP + RIGHT, buff=0.08
        )
        self.play(
            FadeIn(pt_a, scale=1.5), FadeIn(pt_b, scale=1.5), FadeIn(pt_c, scale=1.5),
            Write(lbl_a), Write(lbl_b), Write(lbl_c),
        )
        self.legende(
            "La courbe de g, la portion de (C) pour x ≥ 1 : mêmes points",
            "déjà connus. (Δ) sera notre miroir.",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q14-points-cles-reflechis")
        pt_r1 = Dot(axes_b.c2p(-2, 1), color=COL_SECOND, radius=DOT_R)
        lbl_r1 = MathTex(r"(-2,1)", font_size=16, color=COL_SECOND).next_to(
            pt_r1, LEFT, buff=0.1
        )
        pt_r2 = Dot(axes_b.c2p(0, E), color=COL_SECOND, radius=DOT_R)
        lbl_r2 = MathTex(r"(0,e)", font_size=16, color=COL_SECOND).next_to(
            pt_r2, UP + LEFT, buff=0.1
        )
        seg1 = DashedLine(
            axes_b.c2p(1, F_MIN), axes_b.c2p(-2, 1), color=COL_SECOND,
            stroke_width=1.5, dash_length=0.08,
        )
        seg2 = DashedLine(
            axes_b.c2p(E, 0), axes_b.c2p(0, E), color=COL_SECOND,
            stroke_width=1.5, dash_length=0.08,
        )
        self.play(Create(seg1, run_time=1.0), Create(seg2, run_time=1.0))
        self.play(
            FadeIn(pt_r1, scale=1.5), FadeIn(pt_r2, scale=1.5),
            Write(lbl_r1), Write(lbl_r2),
        )
        self.legende(
            "g(1)=-2 se reflète en g⁻¹(-2)=1 ; g(e)=0 se reflète en",
            "g⁻¹(0)=e. Le point d'abscisse e^(1,5), lui, est SUR (Δ) — il",
            "ne bouge pas : point fixe commun aux deux courbes.",
        )
        self.pose(4.4)
        self.efface_legende()

        self.etape("q14-tracer-ginv")
        ginv_curve = ParametricFunction(
            lambda t: axes_b.c2p(float(_f(t)), t), t_range=[1.001, 5, 0.02],
            color=COL_SECOND, stroke_width=3.5,
        )
        self.play(Create(ginv_curve, run_time=2.4))
        self.legende(
            "La courbe complète de g⁻¹ : le symétrique EXACT de celle de",
            "g par rapport à (Δ) — tracée ici point par point, (g(t),t).",
        )
        self.pose(4.2)
        self.efface_legende()

        self.etape("q14-conclusion")
        m1 = MathTex(
            r"g^{-1} \text{ définie sur } J = [-2,+\infty[",
            font_size=26, color=COL_LIM,
        )
        self.ecrit(m1, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.legende("La courbe de g⁻¹ est construite. 0,75 point.")
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        self.play(FadeOut(VGroup(
            axes_b, o_lbl_b, x_lbl_b, droite_b, lbl_delta_b, courbe_g,
            pt_a, lbl_a, pt_b, lbl_b, pt_c, lbl_c, pt_r1, lbl_r1, pt_r2, lbl_r2,
            seg1, seg2, ginv_curve,
        )))
        self.play(FadeOut(defs))

    # ── Q15 : fonction par morceaux h, continuité en 0 (0,5 pt) ───────
    def chapitre_q15(self):
        badge = self.bandeau_question("Question 15", "0,5 pt")
        self.ardoise()

        self.etape("q15-enonce-h")
        titre_h = Text(
            "Une nouvelle fonction, h, définie sur ℝ par :", font_size=25,
        ).shift(2.5 * UP)
        h_def = MathTex(
            r"h(x) = \begin{cases} x^3+3x & \text{si } x\le0 \\"
            r" 2x\ln x-2x & \text{si } x>0 \end{cases}",
            font_size=30, color=COL_F,
        ).next_to(titre_h, DOWN, buff=0.6)
        self.play(Write(titre_h), run_time=1.2)
        self.play(FadeIn(h_def, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "Un polynôme à gauche de 0, la fonction f elle-même à",
            "droite. Étudier h en 0, c'est étudier ce raccord.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(titre_h))
        self.play(
            h_def.animate.scale(0.6).to_edge(LEFT, buff=0.5).to_edge(UP, buff=1.0)
        )
        self.epingle(h_def)

        self.etape("q15-figure-zoom")
        axes_h = Axes(
            x_range=[-0.75, 0.75, 0.25], y_range=[-2.8, 1.0, 1],
            x_length=4.4, y_length=3.4, axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes_h, 0, 0, 3.3, 0.15)
        o_lbl_h = MathTex("O", font_size=20, color=BAC_INK_SOFT).next_to(
            axes_h.c2p(0, 0), DOWN + LEFT, buff=0.1
        )
        self.play(Create(axes_h, run_time=1.4), FadeIn(o_lbl_h))
        branch_left = axes_h.plot(
            _h_gauche, x_range=[-0.75, 0], color=BAC_INK_MUTED, stroke_width=3,
        )
        branch_right = axes_h.plot(
            _f, x_range=[0.015, 0.75], color=BAC_INK_MUTED, stroke_width=3,
        )
        self.play(Create(branch_left, run_time=1.4))
        self.play(Create(branch_right, run_time=1.4))
        pt0h = Dot(axes_h.c2p(0, 0), color=BAC_INK_MUTED, radius=DOT_R)
        self.play(FadeIn(pt0h, scale=1.5))
        self.legende(
            "Zoom près de l'origine : les deux morceaux de h, chacun",
            "dans sa propre couleur neutre — se raccordent-ils ?",
        )
        self.pose(4.0)
        self.efface_legende()

        self.etape("q15-limite-gauche")
        m1 = MathTex(
            r"\lim_{x\to0^-} h(x) = \lim_{x\to0^-} (x^3+3x) = 0 = h(0)",
            font_size=21,
        )
        self.ecrit(m1)
        self.legende(
            "À gauche, h est un polynôme, continu partout : la limite",
            "vaut sa valeur en 0.",
        )
        self.pose(3.4)

        self.etape("q15-limite-droite")
        m2 = MathTex(
            r"\lim_{x\to0^+} h(x) = \lim_{x\to0^+} f(x) = 0"
            r" \quad (\text{question } 1)",
            font_size=20,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "À droite, h EST f : exactement le calcul déjà fait à la",
            "question 1, réutilisé tel quel.",
        )
        self.pose(3.6)

        self.etape("q15-conclusion")
        m3 = MathTex(
            r"\lim_{x\to0^-} h(x) = \lim_{x\to0^+} h(x) = h(0) = 0"
            r" \implies h \text{ continue en } 0",
            font_size=17, color=COL_LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=COL_LIM)
        self.play(pt0h.animate.set_color(COL_LIM))
        self.legende(
            "Les deux limites latérales coïncident avec h(0) : les deux",
            "morceaux se raccordent bien. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

        return {
            "axes": axes_h, "branch_left": branch_left, "branch_right": branch_right,
            "pt0h": pt0h,
            "group": VGroup(axes_h, o_lbl_h, branch_left, branch_right, pt0h),
        }

    # ── Q16 : dérivabilité à gauche de h en 0 (0,5 pt) ────────────────
    def chapitre_q16(self, fig_h):
        badge = self.bandeau_question("Question 16", "0,5 pt")
        self.ardoise()
        axes = fig_h["axes"]

        self.etape("q16-enonce")
        but1 = MathTex(
            r"\text{Étudier la dérivabilité de } h \text{ à gauche en } 0",
            font_size=24,
        )
        but2 = MathTex(
            r"\text{puis interpréter géométriquement le résultat}", font_size=22,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.35)
        self.legende(
            "On calcule la limite à gauche du taux d'accroissement de h",
            "en 0.",
        )
        self.pose(3.4)

        self.etape("q16-taux-accroissement")
        m1 = MathTex(
            r"\dfrac{h(x)-h(0)}{x-0} = \dfrac{x^3+3x}{x} = x^2+3 \quad (x\ne0)",
            font_size=22,
        )
        self.ecrit(m1)
        self.legende("On simplifie par x, la branche polynomiale de h.")
        self.pose(3.0)

        self.etape("q16-limite")
        m2 = MathTex(r"\lim_{x\to0^-} (x^2+3) = 3", font_size=28, color=COL_CONCL)
        self.ecrit(m2, buff=0.5)
        self.legende("Une limite FINIE : x² tend vers 0, il reste 3.")
        self.pose(2.8)

        self.etape("q16-conclusion")
        m3a = MathTex(
            r"h \text{ dérivable à gauche en } 0, \quad h'_g(0) = 3",
            font_size=19, color=COL_LIM,
        )
        m3b = MathTex(
            r"\implies (C_h) \text{ admet en } (0,0) \text{ une demi-tangente}"
            r" \text{ à gauche de pente } 3",
            font_size=15, color=COL_LIM,
        )
        self.ecrit(m3a, buff=0.55)
        self.ecrit(m3b, buff=0.2)
        self.encadre(couleur=COL_LIM)
        tangente_g = Line(
            axes.c2p(-0.45, 3 * -0.45), axes.c2p(0.32, 3 * 0.32),
            color=COL_LIM, stroke_width=3,
        )
        lbl_tang_g = Text(
            "pente 3", font_size=15, color=COL_LIM
        ).next_to(tangente_g.get_end(), RIGHT, buff=0.06)
        self.play(Create(tangente_g, run_time=1.4), FadeIn(lbl_tang_g))
        fig_h["group"].add(tangente_g, lbl_tang_g)
        self.legende(
            "Une limite finie : la demi-tangente à gauche existe, et sa",
            "pente vaut 3. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q17 : h dérivable en 0 ? (0,25 pt) ────────────────────────────
    def chapitre_q17(self, fig_h):
        badge = self.bandeau_question("Question 17", "0,25 pt")
        self.ardoise()
        axes = fig_h["axes"]

        self.etape("q17-enonce")
        but = MathTex(
            r"h \text{ est-elle dérivable en } 0\ ?\ \text{Justifier.}",
            font_size=28,
        )
        self.ecrit(but)
        self.legende(
            "Dérivable en 0 exige que les DEUX demi-dérivées existent ET",
            "coïncident.",
        )
        self.pose(3.4)

        self.etape("q17-rappel-droite")
        m1 = MathTex(
            r"\lim_{x\to0^+} \dfrac{h(x)-h(0)}{x-0} = \lim_{x\to0^+}\dfrac{f(x)}{x}"
            r" = -\infty \quad (\text{question } 4)",
            font_size=16,
        )
        self.ecrit(m1)
        tangente_d = DashedLine(
            axes.c2p(0, -0.9), axes.c2p(0, 0.6), color=COL_TOOL,
            stroke_width=3, dash_length=0.08,
        )
        lbl_tang_d = Text(
            "tangente verticale", font_size=14, color=COL_TOOL
        ).next_to(tangente_d.get_top(), RIGHT, buff=0.06)
        self.play(Create(tangente_d, run_time=1.2), FadeIn(lbl_tang_d))
        fig_h["group"].add(tangente_d, lbl_tang_d)
        self.legende(
            "À droite, h EST f : sa demi-dérivée est déjà connue,",
            "infinie (question 4) — réutilisée telle quelle.",
        )
        self.pose(3.8)

        self.etape("q17-rappel-gauche")
        m2 = MathTex(
            r"\lim_{x\to0^-} \dfrac{h(x)-h(0)}{x-0} = 3 \quad (\text{question } 16)",
            font_size=22,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("À gauche, la demi-dérivée vaut 3 — un nombre fini.")
        self.pose(2.8)

        self.etape("q17-comparaison-piege")
        piege = VGroup(
            Text("ATTENTION : une limite FINIE ne peut JAMAIS égaler une",
                 font_size=19, color=BAC_ERROR),
            Text("limite INFINIE — 3 et moins l'infini sont des demi-",
                 font_size=19, color=BAC_ERROR),
            Text("dérivées qui ne coïncident pas.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : conclure trop vite « ça se raccorde »",
            "sans comparer les deux demi-dérivées.",
        )
        self.pose(4.0)
        self.nettoie(garder=0)

        self.etape("q17-conclusion")
        m3 = MathTex(
            r"h \text{ n'est PAS dérivable en } 0", font_size=27, color=COL_CONCL,
        )
        m4 = MathTex(
            r"\text{mais admet deux demi-tangentes distinctes en } (0,0)",
            font_size=19, color=COL_CONCL,
        )
        self.ecrit(m3, buff=0.55)
        self.ecrit(m4, buff=0.25)
        self.encadre(couleur=COL_CONCL)
        self.legende(
            "Un point anguleux : deux demi-tangentes bien réelles, mais",
            "différentes. 0,25 point — problème terminé, 9 points.",
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
            Text("Ce qu'il faut retenir", font_size=32, color=BAC_INK),
            Text("• Croissances comparées : x ln x → 0 en 0+ (R4) — c'est ce",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  qui permet un prolongement par continuité en 0.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Dérivée d'un produit : (uv)' = u'v + uv' a TOUJOURS deux",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  termes — jamais un seul.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Un minimum GLOBAL fonde une inégalité valable pour",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  TOUTE valeur de x, pas seulement au point du minimum.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Corollaire du TVI : continue + strictement monotone sur",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  un intervalle ⇒ bijection ⇒ réciproque, dont la courbe",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  est le symétrique par rapport à (Δ):y=x.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Dérivable en un point EXIGE que les deux demi-dérivées",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  existent ET coïncident — sinon, un point anguleux, deux",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  demi-tangentes distinctes.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("9 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=19, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        if bilan.width > 12.5:
            bilan.scale_to_fit_width(12.5)
        if bilan.height > 7.2:
            bilan.scale_to_fit_height(7.2)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
