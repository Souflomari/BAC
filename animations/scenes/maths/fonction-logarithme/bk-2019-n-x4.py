"""Explication animée v4 — Bac 2019 SN (SExp), Problème (11 points) :
étude d'une fonction avec ln, position par rapport à une droite, aire
par intégration par parties, suite récurrente.

Source de vérité : content/maths/fonction-logarithme/bank.yaml, entrée
bk-2019-n-x4 (vérifiée, AlloSchool NS22F, element/68527, Problème,
pages 3-4 du scan). f est définie sur ]0,+∞[ par :

    f(x) = x + 1/2 - ln x + (1/2)(ln x)^2

et (C) sa courbe dans un repère orthonormé (unité 1 cm). Dix-neuf
questions en deux parties : la PREMIÈRE ÉTUDIE f (limites en 0+ et en
+∞, une branche parabolique de direction (Δ): y=x, dérivée, tableau de
variations, dérivée seconde, point d'inflexion, position de (C) par
rapport à (Δ), construction, une primitive H de ln, une IPP donnant
∫₁^e(ln x)²dx = e−2, puis l'aire entre (C) et (Δ) sur [1,e] égale à
e−5/2 cm² ≈ 0,22 cm²) ; la SECONDE exploite cette étude pour la suite
(u_n) définie par u₀=1, u_{n+1}=f(u_n) (encadrement 1≤u_n≤e par
récurrence, croissance, convergence, puis la limite — qui vaut
exactement e, le point où (C) touche (Δ) : le fil qui referme tout le
problème).

Identité centrale, réutilisée à répétition (Q11, Q17, Q19) :
    f(x) - x = (1/2)(ln x - 1)^2 ≥ 0, égalité ⟺ x = e.
C'est elle qui donne la position de (C) au-dessus de (Δ), l'aire de la
question 15, ET le fait que e est le point fixe vers lequel (u_n)
converge — la suite « grimpe » le long de (C) vers ce contact.

Point de vigilance qui traverse tout le problème (énoncé, cité tel
quel) : ln n'existe que sur ]0,+∞[, et (ln u)' = u'/u ne se lit que là
où u>0 ; hiérarchie des croissances (R4) : x écrase ln x à l'infini.

SCOPE NOTE : le corps R1–R6 de la leçon fonction-logarithme couvre
domaine, limites de référence, dérivée de ln, variations. Cet exercice
déborde largement dans deux autres chapitres, fidèlement à la source :
la dérivée d'un quotient (Q9), la dérivée d'un produit et l'IPP (Q13,
Q14, calcul-integral), et tout l'appareil des suites récurrentes
(Q16–Q19, suites-numeriques). Ces techniques sont introduites comme des
OUTILS ADMIS, rappelés avant emploi, jamais présentées comme acquises
sans le dire.

Standard v4 = DESIGN.md : règle du zéro implicite, couche de sens AVANT
chaque calcul — la courbe de f tracée avant toute algèbre (avec la
borne du domaine x=0 comme asymptote, un geste dédié), le tableau de
variations construit proprement dans la zone figure (Q8), le point
d'inflexion marqué au moment où il est prouvé (Q10), (Δ):y=x introduite
dès la branche parabolique (Q5) puis confirmée par la position relative
(Q11), l'aire ombrée entre (C) et (Δ) au moment de son calcul (Q15), et
— geste central de la seconde partie — un diagramme en escalier
(« toile d'araignée ») entre (C) et (Δ) qui construit u₀, u₁, u₂, u₃
terme par terme sur la figure, AVANT et PENDANT la preuve par
récurrence (Q16), confirmé croissant (Q17) puis convergent vers le
point de contact (e,e) déjà connu (Q19). La limite de référence
ln(t)/t → 0 (croissances comparées, R4) reçoit son propre geste de
courbe (Q4), jamais affirmée sans être nommée. Pièges rouges dédiés :
Q1 (aucune indétermination : chaque terme part vers +∞), Q4 (nommer
la référence des croissances comparées, ne jamais dire « ça se
voit »), Q5 (une branche parabolique exige DEUX conditions — pente ET
écart, pas seulement la pente), Q7 (ne pas oublier le facteur qui
vient de la composée (1/2 u²)'=u'u), Q9 (dérivée d'un QUOTIENT, pas
d'une différence), Q14 (le crochet de l'IPP s'annule aux DEUX bornes —
à vérifier, jamais supposé), Q16 (la monotonie de f ne s'applique QUE
sur l'intervalle où elle est établie, [1,e]⊂[1,+∞[).

Les valeurs u₁, u₂, u₃ de la figure « toile d'araignée » sont calculées
par la même fonction f que le corrigé (donc exactes), mais leur
AFFICHAGE décimal est illustratif — la banque ne demande aucune valeur
numérique de (u_n) au-delà de l'encadrement 1≤u_n≤e — signalé en
légende.

Rendu : ../../render.sh scenes/maths/fonction-logarithme/bk-2019-n-x4.py
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

# Identité visuelle stable (DESIGN.md §2) : (C), la courbe de f, objet
# nº1 (sarcelle) ; (Δ):y=x, objet nº2, outil de comparaison (sarcelle
# claire) ; les outils transversaux (fonction auxiliaire g de Q6,
# rappels de dérivées, la courbe de référence ln t/t, les marches de la
# suite) reçoivent l'or ; un résultat vérifié/encadré en cours de
# calcul, le sarcelle fort ; une conclusion finale (limite, existence,
# convergence), le vert ; un piège, toujours et seulement le rouge.
COURBE = BAC_ACCENT
DELTA = BAC_ACCENT_LIGHT
OUTIL = BAC_WARNING
CONCL = BAC_ACCENT_STRONG
LIM = BAC_SUCCESS

DOT_R = 0.075

# ── Valeurs exactes, citées de la banque vérifiée ───────────────────────


def _f(x):
    """f(x) = x + 1/2 - ln x + (1/2)(ln x)^2 — la fonction étudiée (énoncé)."""
    return x + 0.5 - np.log(x) + 0.5 * np.log(x) ** 2


def _fprime(x):
    """f'(x) = (x - 1 + ln x) / x — question 7."""
    return (x - 1 + np.log(x)) / x


def _fseconde(x):
    """f''(x) = (2 - ln x) / x^2 — question 9."""
    return (2 - np.log(x)) / x**2


def _g_aux(x):
    """g(x) = x - 1 + ln x — fonction auxiliaire de la question 6 :
    c'est EXACTEMENT le numérateur de f'(x)."""
    return x - 1 + np.log(x)


def _ln_t_sur_t(t):
    """ln(t)/t — limite de référence des croissances comparées (R4),
    utilisée à la question 4 via t = racine de x."""
    return np.log(t) / t


E = float(np.e)
E2 = float(np.e**2)
F1 = 1.5              # f(1) = 3/2, exact (Q8)
FE = float(np.e)       # f(e) = e, exact (Q16) — le point fixe de la suite
FE2 = E2 + 0.5         # f(e^2) = e^2 + 1/2, exact (Q10)
AIRE = E - 2.5         # question 15, exact

# Suite (u_n) : calculée par LA MÊME fonction f que le corrigé — donc
# exacte — mais illustrative au-delà de l'encadrement 1 ≤ u_n ≤ e
# demandé par la banque (aucune valeur numérique de u_n n'est au barème).
U0 = 1.0
U1 = _f(U0)
U2 = _f(U1)
U3 = _f(U2)

# ── Contrôles numériques (auto-vérification des valeurs affichées) ──────
assert abs(_f(1) - F1) < 1e-9
assert abs(_f(E) - FE) < 1e-9
assert abs(_f(E2) - FE2) < 1e-9
assert abs(U1 - 1.5) < 1e-9

_h = 1e-6
_x0 = 2.3
assert abs(_fprime(_x0) - (_f(_x0 + _h) - _f(_x0 - _h)) / (2 * _h)) < 1e-4
assert abs(_fseconde(_x0) - (_fprime(_x0 + _h) - _fprime(_x0 - _h)) / (2 * _h)) < 1e-3

_xs = np.linspace(1, E, 20001)
assert abs(np.trapz(_f(_xs) - _xs, _xs) - AIRE) < 1e-4          # question 15
assert abs(np.trapz(np.log(_xs) ** 2, _xs) - (E - 2)) < 1e-4     # question 14
assert abs(np.trapz(np.log(_xs), _xs) - 1) < 1e-4                # outil H

del _xs, _h, _x0


def _pose_axes(axes, x_ref: float, y_ref: float, x_target: float, y_target: float):
    """Aligne le point de données (x_ref, y_ref) sur le point-cible de la
    scène — même procédé robuste que les scènes validées (limites-continuite)."""
    axes.shift((x_target * RIGHT + y_target * UP) - axes.c2p(x_ref, y_ref))
    return axes


AXIS_CONFIG = {
    "stroke_color": BAC_INK_MUTED,
    "stroke_width": 2,
    "include_ticks": False,
    "include_tip": False,
}


def _point_marque(ax, x, y, couleur, texte, direction, buff=0.14, font_size=24):
    """Un point sur la figure + son étiquette, posée du côté libre —
    jamais sur l'axe ni sur le trait de la courbe."""
    pt = ax.c2p(x, y)
    point = Dot(pt, color=couleur, radius=DOT_R)
    label = MathTex(texte, font_size=font_size, color=couleur).next_to(
        point, direction, buff=buff
    )
    return point, label


NARRATION = {
    "titre": "Problème du bac deux mille dix-neuf, session normale, "
    "sciences expérimentales, sur onze points : étude d'une fonction "
    "avec logarithme, position par rapport à une droite, une aire par "
    "intégration par parties, et une suite récurrente.",
    "intro": "On considère la fonction f, définie sur l'intervalle "
    "ouvert zéro plus l'infini, par f de x égale x plus un demi, moins "
    "logarithme népérien de x, plus un demi logarithme népérien de x au "
    "carré. Le logarithme n'existe que pour x strictement positif — ce "
    "point revient à chaque question.",
    "plan": "Avant tout calcul, on regarde l'allure de la courbe : elle "
    "part de plus l'infini le long de l'axe des ordonnées, descend, "
    "atteint un minimum, puis remonte indéfiniment.",
    "q1": "Question un, zéro virgule cinq point. On calcule la limite de "
    "f en zéro, et on interprète le résultat géométriquement.",
    "q2": "Question deux, zéro virgule vingt-cinq point. On vérifie une "
    "écriture équivalente de f, en développant.",
    "q3": "Question trois, zéro virgule cinq point. On en déduit la "
    "limite de f en plus l'infini.",
    "q4": "Question quatre, zéro virgule cinq point. On établit une "
    "égalité, puis on en déduit une limite de croissances comparées.",
    "q5": "Question cinq, zéro virgule soixante-quinze point. On montre "
    "que la courbe admet, en plus l'infini, une branche parabolique de "
    "direction la droite d'équation y égale x.",
    "q6": "Question six, zéro virgule cinq point. On étudie le signe "
    "d'une fonction auxiliaire, qui va donner le signe de la dérivée de "
    "f.",
    "q7": "Question sept, un point. On calcule la dérivée de f, terme à "
    "terme.",
    "q8": "Question huit, zéro virgule cinq point. On dresse le tableau "
    "de variations de f.",
    "q9": "Question neuf, zéro virgule cinq point. On calcule la dérivée "
    "seconde de f.",
    "q10": "Question dix, zéro virgule cinq point. On en déduit que la "
    "courbe admet un point d'inflexion, dont on calcule les coordonnées.",
    "q11": "Question onze, zéro virgule cinq point. On compare f de x et "
    "x, et on en déduit la position de la courbe par rapport à la droite "
    "d'équation y égale x.",
    "q12": "Question douze, un point. On construit la droite et la "
    "courbe dans le même repère, en reportant tout ce qu'on vient "
    "d'établir.",
    "q13": "Question treize, zéro virgule cinq point. On vérifie qu'une "
    "fonction H donnée est une primitive du logarithme népérien.",
    "q14": "Question quatorze, zéro virgule soixante-quinze point. À "
    "l'aide d'une intégration par parties, on calcule une intégrale du "
    "carré du logarithme.",
    "q15": "Question quinze, zéro virgule cinq point. On calcule, en "
    "centimètres carrés, l'aire du domaine compris entre la courbe et la "
    "droite.",
    "q16": "Deuxième partie. On définit une suite par u zéro égale un, "
    "et u indice n plus un égale f de u indice n. Question seize, zéro "
    "virgule cinq point : on montre par récurrence que cette suite reste "
    "encadrée entre un et e.",
    "q17": "Question dix-sept, zéro virgule cinq point. On montre que la "
    "suite est croissante.",
    "q18": "Question dix-huit, zéro virgule cinq point. On en déduit "
    "qu'elle converge.",
    "q19": "Question dix-neuf, zéro virgule soixante-quinze point. On "
    "calcule sa limite — et on retrouve exactement le point où la "
    "courbe touche la droite.",
}


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        f_def = self.chapitre_intro()
        fig = self.chapitre_plan()
        fig = self.chapitre_q1(fig)
        self.chapitre_q2()
        self.chapitre_q3(fig)
        fig = self.chapitre_q4(fig)
        fig = self.chapitre_q5(fig)
        self.chapitre_q6()
        self.chapitre_q7()
        fig = self.chapitre_q8(fig)
        self.chapitre_q9()
        fig = self.chapitre_q10(fig)
        fig = self.chapitre_q11(fig)
        fig = self.chapitre_q12(fig, f_def)
        fig = self.chapitre_q13(fig)
        self.chapitre_q14()
        fig = self.chapitre_q15(fig)
        fig_cw = self.chapitre_q16(fig)
        fig_cw = self.chapitre_q17(fig_cw)
        self.chapitre_q18()
        self.chapitre_q19(fig_cw)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2019 · SESSION NORMALE · SCIENCES EXP.",
            "Fonction logarithme, aire et suite récurrente",
            "Problème — 11 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé : f et son domaine ───────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère f, définie sur ]0,+∞[, par :", font_size=27
        ).shift(2.5 * UP)
        deff = MathTex(
            r"f(x) = x + \dfrac{1}{2} - \ln x + \dfrac{1}{2}(\ln x)^2",
            font_size=38, color=COURBE,
        ).next_to(entete, DOWN, buff=0.6)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(deff, shift=0.2 * UP), run_time=1.2)
        self.legende(
            "Un problème complet, onze points, deux parties — la",
            "seconde s'appuie entièrement sur la première.",
        )
        self.pose(3.2)

        self.etape("intro-vigilance")
        piege = VGroup(
            Text("POINT DE VIGILANCE : ln n'existe QUE sur ]0,+∞[, et",
                 font_size=19, color=BAC_ERROR),
            Text("(ln u)' = u'/u ne se lit que là où u > 0. Ce point",
                 font_size=19, color=BAC_ERROR),
            Text("revient à CHAQUE question de ce problème.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08).next_to(deff, DOWN, buff=0.55)
        self.play(FadeIn(piege, shift=0.15 * UP), run_time=1.0)
        self.legende(
            "Le domaine du logarithme n'est jamais un détail — c'est",
            "la condition qui encadre tout ce qui suit.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.play(FadeOut(entete), FadeOut(piege))
        self.play(
            deff.animate.scale(0.5).to_edge(LEFT, buff=0.5).to_edge(UP, buff=1.0)
        )
        self.epingle(deff)
        return deff

    # ── La couche de sens : la courbe de f, AVANT toute algèbre ────────
    # Fenêtre montrant tout ce que le problème utilise : la borne du
    # domaine (x=0), le minimum futur (x=1), le point de contact avec
    # (Δ) (x=e) et le point d'inflexion futur (x=e²) — sans en affirmer
    # aucun avant sa preuve.
    def chapitre_plan(self):
        self.etape("plan-domaine")
        axes = Axes(
            x_range=[0, 8.8, 2], y_range=[0, 9.6, 2],
            x_length=4.6, y_length=3.6, axis_config=AXIS_CONFIG,
        )
        _pose_axes(axes, 0, 0, 1.0, -1.7)
        o_lbl = MathTex("O", font_size=24, color=BAC_INK_SOFT).next_to(
            axes.c2p(0, 0), DOWN + LEFT, buff=0.1
        )
        x_lbl = MathTex("x", font_size=24, color=BAC_INK_MUTED).next_to(
            axes.c2p(8.8, 0), RIGHT, buff=0.1
        )
        frontiere = DashedLine(
            axes.c2p(0, 0), axes.c2p(0, 9.6), color=BAC_INK_MUTED,
            stroke_width=2.5, dash_length=0.12,
        )
        front_lbl = MathTex("x=0", font_size=20, color=BAC_INK_MUTED).next_to(
            axes.c2p(0, 8.6), RIGHT, buff=0.14
        )
        self.play(Create(axes, run_time=1.6), FadeIn(o_lbl), FadeIn(x_lbl))
        self.play(Create(frontiere, run_time=1.2), FadeIn(front_lbl))
        self.legende(
            "D'abord le domaine : f n'existe QUE pour x strictement",
            "positif — la frontière x = 0, à surveiller.",
        )
        self.pose(3.4)

        self.etape("plan-courbe")
        branch_dec = axes.plot(_f, x_range=[0.04, 1], color=BAC_INK_MUTED, stroke_width=3.5)
        branch_inc = axes.plot(_f, x_range=[1, 8.8], color=BAC_INK_MUTED, stroke_width=3.5)
        self.play(Create(branch_dec, run_time=1.8))
        self.play(Create(branch_inc, run_time=1.8))
        self.legende(
            "L'allure de (C), avant toute preuve : elle plonge près de",
            "x = 0, descend, puis remonte — on va tout DÉMONTRER.",
        )
        self.pose(3.6)
        self.efface_legende()

        return {
            "axes": axes, "o_lbl": o_lbl, "x_lbl": x_lbl,
            "frontiere": frontiere, "front_lbl": front_lbl,
            "branch_dec": branch_dec, "branch_inc": branch_inc,
            "group": VGroup(
                axes, o_lbl, x_lbl, frontiere, front_lbl,
                branch_dec, branch_inc,
            ),
        }

    # ── Q1 : limite en 0+, interprétation géométrique ─────────────────
    def chapitre_q1(self, fig):
        badge = self.bandeau_question("1)", "0,5 pt")
        self.ardoise()

        self.etape("q1-enonce")
        but = MathTex(
            r"\text{Calculer } \lim_{\substack{x\to 0 \\ x>0}} f(x)"
            r" \text{ puis interpréter géométriquement}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On examine chaque morceau de f séparément quand x tend",
            "vers 0 par valeurs positives.",
        )
        self.pose(3.2)

        self.etape("q1-limite-reference")
        m1 = MathTex(
            r"\lim_{x\to 0^+} \ln x = -\infty \implies"
            r" \lim_{x\to 0^+} (\ln x)^2 = +\infty",
            font_size=25,
        )
        self.ecrit(m1)
        self.legende(
            "Limite de référence en zéro plus (R4) : ln x part vers",
            "moins l'infini — au carré, elle part vers plus l'infini.",
        )
        self.pose(3.6)

        self.etape("q1-piege-somme")
        piege = VGroup(
            Text("PAS d'indétermination ici : x tend vers 0 (fini), et",
                 font_size=19, color=BAC_ERROR),
            Text("TOUS les termes qui bougent (-ln x et (ln x)²) partent",
                 font_size=19, color=BAC_ERROR),
            Text("déjà vers +∞ — une somme de termes vers +∞ suit.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un réflexe à corriger : voir une forme indéterminée",
            "partout. Ici, rien ne s'oppose — la somme part vers +∞.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q1-conclusion")
        m2 = MathTex(
            r"\lim_{x\to 0^+} f(x) ="
            r" \lim_{x\to 0^+}\left(x+\tfrac12-\ln x+\tfrac12(\ln x)^2\right)"
            r" = +\infty",
            font_size=20, color=LIM,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=LIM)
        interp = MathTex(
            r"(C) \text{ admet la droite } x=0 \text{ pour asymptote verticale}",
            font_size=21, color=LIM,
        )
        self.ecrit(interp, buff=0.5)
        self.legende(
            "Une limite infinie en une borne finie du domaine se lit",
            "toujours pareil : x = 0 est asymptote verticale. 0,5 point.",
        )
        self.play(
            fig["frontiere"].animate.set_color(LIM),
            fig["front_lbl"].animate.set_color(LIM),
            run_time=1.2,
        )
        asym_lbl = Text("asymptote verticale", font_size=16, color=LIM).next_to(
            fig["axes"].c2p(0, 5.5), RIGHT, buff=0.16
        )
        self.play(FadeIn(asym_lbl), run_time=0.8)
        fig["group"].add(asym_lbl)
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q2 : vérifier une écriture équivalente de f ────────────────────
    def chapitre_q2(self):
        badge = self.bandeau_question("2)", "0,25 pt")
        self.ardoise()

        self.etape("q2-enonce")
        but = MathTex(
            r"\text{Vérifier que } f(x) = x+\dfrac12+\left(\dfrac12\ln x-1\right)\ln x",
            font_size=22,
        )
        self.ecrit(but)
        self.legende(
            "Une vérification se fait dans le sens le plus sûr : on",
            "développe le membre proposé et on retombe sur f.",
        )
        self.pose(3.4)

        self.etape("q2-distribuer")
        m1 = MathTex(
            r"\left(\tfrac12\ln x-1\right)\ln x = \tfrac12(\ln x)^2-\ln x",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On distribue le facteur (un demi ln x moins un) sur ln x.")
        self.pose(3.0)

        self.etape("q2-conclusion")
        m2 = MathTex(
            r"x+\tfrac12+\tfrac12(\ln x)^2-\ln x = x+\tfrac12-\ln x+\tfrac12(\ln x)^2 = f(x)",
            font_size=18, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "On réordonne : c'est exactement f(x) — égalité vérifiée.",
            "0,25 point. On va s'en servir tout de suite.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q3 : limite en +∞, déduite de la question précédente ──────────
    def chapitre_q3(self, fig):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = MathTex(
            r"\text{En déduire que } \lim_{x\to+\infty} f(x) = +\infty",
            font_size=30,
        )
        self.ecrit(but)
        self.legende(
            "La forme factorisée de la question 2 lève l'indétermination",
            "∞ moins ∞ qui apparaîtrait sinon.",
        )
        self.pose(3.4)

        self.etape("q3-facteurs")
        m1 = MathTex(
            r"\lim_{x\to+\infty}\left(\tfrac12\ln x-1\right) = +\infty,"
            r" \qquad \lim_{x\to+\infty}\ln x = +\infty",
            font_size=22,
        )
        self.ecrit(m1)
        self.legende(
            "Les deux facteurs du produit tendent chacun vers +∞",
            "(référence R4 pour ln x).",
        )
        self.pose(3.4)

        self.etape("q3-conclusion")
        m2 = MathTex(
            r"\left(\tfrac12\ln x-1\right)\ln x \xrightarrow[x\to+\infty]{} +\infty"
            r" \implies f(x) = x+\tfrac12+\left(\tfrac12\ln x-1\right)\ln x"
            r" \xrightarrow[x\to+\infty]{} +\infty",
            font_size=15, color=LIM,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=LIM)
        self.legende(
            "Produit de deux facteurs vers +∞, plus x+1/2 vers +∞ :",
            "la somme part vers +∞. 0,5 point.",
        )
        fleche = Arrow(
            fig["axes"].c2p(7.6, 8.2), fig["axes"].c2p(8.7, 9.4),
            buff=0.05, color=LIM, stroke_width=3,
            max_tip_length_to_length_ratio=0.28,
        )
        self.play(Create(fleche), run_time=1.0)
        fig["group"].add(fleche)
        self.pose(3.8)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q4 : une identité, puis une limite de croissances comparées ───
    def chapitre_q4(self, fig):
        badge = self.bandeau_question("4)", "0,5 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but1 = MathTex(
            r"\text{Montrer que } \dfrac{(\ln x)^2}{x} ="
            r" 4\left(\dfrac{\ln\sqrt{x}}{\sqrt{x}}\right)^2",
            font_size=24,
        )
        but2 = MathTex(
            r"\text{puis en déduire } \lim_{x\to+\infty} \dfrac{(\ln x)^2}{x} = 0",
            font_size=24,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "On part du membre de droite : une racine carrée cache le",
            "logarithme, on va la faire apparaître.",
        )
        self.pose(3.6)

        self.etape("q4-racine")
        m1 = MathTex(
            r"\ln\sqrt{x} = \tfrac12\ln x \quad (\text{R2}), \qquad (\sqrt{x})^2 = x",
            font_size=25,
        )
        self.ecrit(m1)
        self.legende(
            "Propriété de la racine carrée (R2) : ln de racine de x",
            "vaut un demi ln x.",
        )
        self.pose(3.2)

        self.etape("q4-combiner")
        m2 = MathTex(
            r"4\left(\dfrac{\ln\sqrt{x}}{\sqrt{x}}\right)^2"
            r" = 4\cdot\dfrac{\frac14(\ln x)^2}{x} = \dfrac{(\ln x)^2}{x}",
            font_size=24, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "Le carré du un demi donne un quart ; le facteur 4 le",
            "compense exactement. Identité établie.",
        )
        self.pose(3.6)
        self.nettoie()

        self.etape("q4-figure-reference")
        self.play(FadeOut(fig["group"]))
        ax_ref = Axes(
            x_range=[1, 32, 10], y_range=[0, 0.42, 0.1],
            x_length=4.4, y_length=3.0, axis_config=AXIS_CONFIG,
        )
        _pose_axes(ax_ref, 1, 0, 0.8, -1.5)
        t_lbl = MathTex("t", font_size=22, color=BAC_INK_MUTED).next_to(
            ax_ref.c2p(32, 0), RIGHT, buff=0.1
        )
        courbe_ref = ax_ref.plot(_ln_t_sur_t, x_range=[1, 32], color=OUTIL, stroke_width=3.5)
        self.play(Create(ax_ref, run_time=1.2), FadeIn(t_lbl))
        self.play(Create(courbe_ref, run_time=1.8))
        asym_ref = DashedLine(
            ax_ref.c2p(1, 0), ax_ref.c2p(32, 0), color=OUTIL,
            stroke_width=2.5, dash_length=0.1,
        )
        lbl_ref = MathTex(
            r"y=\dfrac{\ln t}{t}", font_size=20, color=OUTIL
        ).next_to(ax_ref.c2p(9, _ln_t_sur_t(9)), UP, buff=0.18)
        self.play(Create(asym_ref, run_time=1.2), FadeIn(lbl_ref))
        self.legende(
            "Une limite de référence (R4), hors de f : quand t part vers",
            "+∞, ln t sur t s'aplatit vers zéro — on le NOMME.",
        )
        self.pose(4.0)

        self.etape("q4-substitution")
        m3 = MathTex(
            r"t=\sqrt{x} \xrightarrow[x\to+\infty]{} +\infty, \qquad"
            r" \dfrac{\ln t}{t} \xrightarrow[t\to+\infty]{} 0"
            r" \quad (\text{croissances comparées, R4})",
            font_size=17,
        )
        self.ecrit(m3)
        self.legende(
            "On pose t = racine de x : quand x part vers +∞, t aussi.",
        )
        self.pose(3.6)

        self.etape("q4-piege-nommer")
        piege = VGroup(
            Text("ATTENTION : écrire « croissances comparées » sans le",
                 font_size=19, color=BAC_ERROR),
            Text("changement de variable ET la référence R4 ne suffit",
                 font_size=19, color=BAC_ERROR),
            Text("PAS — le résultat doit être NOMMÉ, jamais juste \"vu\".",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : sauter à la conclusion sans passer",
            "par la référence nommée.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q4-conclusion")
        m4 = MathTex(
            r"\dfrac{(\ln x)^2}{x} = 4\left(\dfrac{\ln t}{t}\right)^2"
            r" \xrightarrow[x\to+\infty]{} 4\times 0^2 = 0",
            font_size=22, color=LIM,
        )
        self.ecrit(m4, buff=0.5)
        self.encadre(couleur=LIM)
        self.legende(
            "L'identité ramène tout au carré de cette référence : la",
            "limite vaut 0. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        self.play(FadeOut(VGroup(ax_ref, t_lbl, courbe_ref, asym_ref, lbl_ref)))
        self.play(FadeIn(fig["group"]))
        return fig

    # ── Q5 : branche parabolique de direction (Δ): y = x ───────────────
    def chapitre_q5(self, fig):
        badge = self.bandeau_question("5)", "0,75 pt")
        self.ardoise()

        self.etape("q5-enonce")
        but = MathTex(
            r"\text{Montrer que } (C) \text{ admet, au voisinage de } +\infty,"
            r" \text{ une branche parabolique}",
            font_size=21,
        )
        but2 = MathTex(
            r"\text{de direction asymptotique la droite } (\Delta): y=x",
            font_size=23,
        )
        self.ecrit(but)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "Deux vérifications : la PENTE de f(x)/x tend vers 1, et",
            "l'ÉCART f(x)-x ne tend PAS vers un réel fini.",
        )
        self.pose(3.8)

        self.etape("q5-pente")
        m1 = MathTex(
            r"\dfrac{f(x)}{x} = 1+\dfrac{1}{2x}-\dfrac{\ln x}{x}+\dfrac{(\ln x)^2}{2x}"
            r" \xrightarrow[x\to+\infty]{} 1",
            font_size=20,
        )
        self.ecrit(m1)
        self.legende(
            "On divise chaque terme par x : ln x sur x (R4) et (ln x)²",
            "sur x (question précédente) tendent vers 0 — reste 1.",
        )
        self.pose(4.0)

        self.etape("q5-ecart")
        m2 = MathTex(
            r"f(x)-x = \tfrac12-\ln x+\tfrac12(\ln x)^2"
            r" \xrightarrow[x\to+\infty]{} +\infty",
            font_size=24, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "Le terme en (ln x)² l'emporte sur -ln x : l'écart part",
            "vers +∞, pas vers un réel — pas d'asymptote oblique.",
        )
        self.pose(4.0)

        self.etape("q5-piege-deux-conditions")
        piege = VGroup(
            Text("ATTENTION : une branche parabolique exige DEUX",
                 font_size=19, color=BAC_ERROR),
            Text("conditions — la pente ET l'écart. Vérifier seulement",
                 font_size=19, color=BAC_ERROR),
            Text("la pente conclurait à tort une asymptote oblique.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : oublier de vérifier que l'écart ne",
            "tend PAS vers un réel fini.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q5-conclusion")
        m3 = MathTex(
            r"\text{pente} \to 1 \ \text{et écart} \to +\infty \implies"
            r" \text{branche parabolique de direction } (\Delta):y=x",
            font_size=17, color=LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=LIM)
        self.legende(
            "0,75 point. On introduit (Δ) sur la figure — la courbe va",
            "s'en écarter de plus en plus, vers le haut.",
        )
        delta = fig["axes"].plot(
            lambda x: x, x_range=[0, 8.8], color=DELTA, stroke_width=2.5
        )
        delta_lbl = MathTex("y=x", font_size=22, color=DELTA).next_to(
            fig["axes"].c2p(8.4, 8.4), UP + LEFT, buff=0.1
        )
        self.play(Create(delta, run_time=1.6), FadeIn(delta_lbl))
        fig["group"].add(delta, delta_lbl)
        fig["delta"] = delta
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q6 : signe de la fonction auxiliaire g(x) = x-1+ln x ───────────
    def chapitre_q6(self):
        badge = self.bandeau_question("6)", "0,5 pt")
        self.ardoise()

        self.etape("q6-enonce")
        but1 = MathTex(
            r"\text{Montrer que, pour tout } x \text{ de } ]0,1],\ (x-1)+\ln x \le 0",
            font_size=21,
        )
        but2 = MathTex(
            r"\text{et pour tout } x \text{ de } [1,+\infty[,\ (x-1)+\ln x \ge 0",
            font_size=21,
        )
        self.ecrit(but1)
        self.ecrit(but2, buff=0.4)
        self.legende(
            "On pose g(x) = x-1+ln x — cette expression va donner le",
            "signe de la dérivée de f dans un instant.",
        )
        self.pose(4.0)

        self.etape("q6-derivee-g")
        m1 = MathTex(
            r"g(x)=x-1+\ln x, \qquad g'(x) = 1+\dfrac1x > 0"
            r" \text{ sur } ]0,+\infty[",
            font_size=22,
        )
        self.ecrit(m1)
        self.legende(
            "g' est une somme de deux termes strictement positifs : g",
            "est strictement croissante sur tout le domaine.",
        )
        self.pose(3.8)

        self.etape("q6-zero-g")
        m2 = MathTex(r"g(1) = 1-1+\ln 1 = 0", font_size=32)
        self.ecrit(m2, buff=0.5)
        self.legende("Un calcul direct : g s'annule exactement en x = 1.")
        self.pose(2.8)

        self.etape("q6-conclusion")
        m3 = MathTex(
            r"x\le 1 \implies g(x)\le g(1)=0 \qquad ; \qquad"
            r" x\ge 1 \implies g(x)\ge g(1)=0",
            font_size=18, color=CONCL,
        )
        self.ecrit(m3, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "Stricte croissance autour du zéro : avant 1, g est en",
            "dessous de 0 ; après 1, au-dessus. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q7 : dérivée f'(x) = (x-1+ln x)/x ──────────────────────────────
    def chapitre_q7(self):
        badge = self.bandeau_question("7)", "1 pt")
        self.ardoise()

        self.etape("q7-enonce")
        but = MathTex(
            r"\text{Montrer que, pour tout } x \text{ de } ]0,+\infty[,\ "
            r"f'(x) = \dfrac{x-1+\ln x}{x}",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On dérive f terme à terme — le troisième terme est une",
            "composée qu'il faut traiter avec soin.",
        )
        self.pose(3.4)

        self.etape("q7-rappel-composee")
        outil = MathTex(
            r"u=\ln x \implies \left(\tfrac12 u^2\right)' = u'u ="
            r" \dfrac1x\times\ln x = \dfrac{\ln x}{x}",
            font_size=22, color=BAC_INK_SOFT,
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        self.legende(
            "Règle admise : la dérivée de un demi u² est u'u — ici",
            "u = ln x, u' = 1/x.",
        )
        self.pose(3.8)

        self.etape("q7-piege-facteur")
        piege = VGroup(
            Text("ATTENTION : le facteur 1/2 ne DISPARAÎT pas au hasard —",
                 font_size=19, color=BAC_ERROR),
            Text("il se simplifie avec le 2 qui descend du carré dérivé.",
                 font_size=19, color=BAC_ERROR),
            Text("Un oubli fréquent : garder le 1/2 devant ln x / x.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : mal gérer le facteur 1/2 de la",
            "dérivée composée.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q7-terme-a-terme")
        m1 = MathTex(
            r"f'(x) = 1 - \dfrac1x + \dfrac{\ln x}{x}",
            font_size=32,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "Dérivée de x (c'est 1), de -1/2 (c'est 0, absorbée dans",
            "le premier terme), de -ln x (c'est -1/x), et du carré.",
        )
        self.pose(3.8)

        self.etape("q7-conclusion")
        m2 = MathTex(
            r"f'(x) = \dfrac{x}{x}-\dfrac1x+\dfrac{\ln x}{x} = \dfrac{x-1+\ln x}{x}",
            font_size=24, color=CONCL,
        )
        self.ecrit(m2, buff=0.55)
        self.encadre(couleur=CONCL)
        self.legende(
            "Même dénominateur x : on retrouve exactement g(x) au",
            "numérateur — la question 6 va servir. 1 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q8 : tableau de variations ──────────────────────────────────
    # Diagramme construit dans la ZONE FIGURE (DESIGN.md), pas dans la
    # colonne de travail : un repère abstrait, pas un Axes de courbe.
    TAB_X0, TAB_X1, TAB_XINF = -1.6, 0.0, 1.6
    TAB_LEFT, TAB_RIGHT = -2.85, 1.9
    TAB_LABELCOL = -2.2
    TAB_TOP, TAB_SEP1, TAB_SEP2, TAB_BOT = 1.4, 0.72, 0.05, -1.65
    TAB_TARGET = 3.7 * RIGHT + 0.15 * UP

    def _tp(self, x, y):
        """Point du tableau : coordonnées locales + décalage fixe vers la
        zone figure — TOUTES les pièces (grille, textes, flèches) passent
        par cette même fonction, donc restent alignées entre elles."""
        return x * RIGHT + y * UP + self.TAB_TARGET

    def _tableau_grille(self):
        p = self._tp
        return VGroup(
            Line(p(self.TAB_LEFT, self.TAB_TOP), p(self.TAB_RIGHT, self.TAB_TOP)),
            Line(p(self.TAB_LEFT, self.TAB_SEP1), p(self.TAB_RIGHT, self.TAB_SEP1)),
            Line(p(self.TAB_LEFT, self.TAB_SEP2), p(self.TAB_RIGHT, self.TAB_SEP2)),
            Line(p(self.TAB_LEFT, self.TAB_BOT), p(self.TAB_RIGHT, self.TAB_BOT)),
            Line(p(self.TAB_LEFT, self.TAB_TOP), p(self.TAB_LEFT, self.TAB_BOT)),
            Line(p(self.TAB_LABELCOL, self.TAB_TOP), p(self.TAB_LABELCOL, self.TAB_BOT)),
            Line(p(self.TAB_RIGHT, self.TAB_TOP), p(self.TAB_RIGHT, self.TAB_BOT)),
            Line(p(self.TAB_X0, self.TAB_TOP), p(self.TAB_X0, self.TAB_BOT)),
            Line(p(self.TAB_X1, self.TAB_TOP), p(self.TAB_X1, self.TAB_BOT)),
            Line(p(self.TAB_XINF, self.TAB_TOP), p(self.TAB_XINF, self.TAB_BOT)),
            stroke_color=BAC_INK_MUTED, stroke_width=1.8,
        )

    def chapitre_q8(self, fig):
        badge = self.bandeau_question("8)", "0,5 pt")
        self.ardoise()

        self.etape("q8-enonce")
        but = MathTex(
            r"\text{Dresser le tableau de variations de } f", font_size=32
        )
        self.ecrit(but)
        self.legende(
            "Le dénominateur de f' est x, positif. Le signe de f' est",
            "donc celui de g, déjà étudié à la question 6.",
        )
        self.pose(3.6)

        self.etape("q8-signe")
        m1 = MathTex(
            r"f'(x) = \dfrac{x-1+\ln x}{x}, \ x>0 \implies"
            r" \text{signe}(f') = \text{signe}(x-1+\ln x)",
            font_size=19,
        )
        self.ecrit(m1)
        self.legende(
            "Négatif sur ]0,1], nul en 1, positif sur [1,+∞[ — repris",
            "directement de la question 6.",
        )
        self.pose(3.8)
        self.nettoie()
        self.play(FadeOut(fig["group"]))

        self.etape("q8-tableau-squelette")
        grille = self._tableau_grille()
        p = self._tp
        lbl_x = MathTex("x", font_size=24).move_to(p(-2.525, 1.06))
        lbl_x0 = MathTex("0", font_size=24).move_to(p(self.TAB_X0, 1.06))
        lbl_x1 = MathTex("1", font_size=24).move_to(p(self.TAB_X1, 1.06))
        lbl_xinf = MathTex(r"+\infty", font_size=22).move_to(p(self.TAB_XINF, 1.06))
        lbl_fprime = MathTex("f'(x)", font_size=22).move_to(p(-2.525, 0.385))
        sgn_moins = MathTex("-", font_size=26, color=BAC_ERROR).move_to(p(-0.8, 0.385))
        sgn_zero = MathTex("0", font_size=22).move_to(p(self.TAB_X1, 0.385))
        sgn_plus = MathTex("+", font_size=26, color=LIM).move_to(p(0.8, 0.385))
        entete = VGroup(lbl_x, lbl_x0, lbl_x1, lbl_xinf, lbl_fprime,
                         sgn_moins, sgn_zero, sgn_plus)
        self.play(Create(grille, run_time=1.8))
        self.play(FadeIn(entete), run_time=1.0)
        self.legende(
            "On reporte 0, 1 et +∞ pour x, et le signe de f' établi",
            "juste au-dessus : moins, zéro, plus.",
        )
        self.pose(4.0)

        self.etape("q8-f1")
        m2 = MathTex(
            r"f(1) = 1+\tfrac12-\ln 1+\tfrac12(\ln 1)^2 = \tfrac32",
            font_size=26,
        )
        self.ecrit(m2)
        self.legende(
            "ln 1 = 0 : les deux derniers termes s'annulent — le",
            "minimum de f vaut trois demis.",
        )
        self.pose(3.6)

        self.etape("q8-fleches")
        lbl_fx = MathTex("f(x)", font_size=22).move_to(p(-2.525, -0.8))
        row_top, row_bot = -0.30, -1.20
        fl_dec = Arrow(
            p(self.TAB_X0, row_top), p(self.TAB_X1, row_bot),
            buff=0.08, color=COURBE, stroke_width=3,
            max_tip_length_to_length_ratio=0.1,
        )
        fl_inc = Arrow(
            p(self.TAB_X1, row_bot), p(self.TAB_XINF, row_top),
            buff=0.08, color=COURBE, stroke_width=3,
            max_tip_length_to_length_ratio=0.1,
        )
        val_inf1 = MathTex(r"+\infty", font_size=20, color=COURBE).move_to(
            p(self.TAB_X0, row_top + 0.16)
        )
        val_inf2 = MathTex(r"+\infty", font_size=20, color=COURBE).move_to(
            p(self.TAB_XINF, row_top + 0.16)
        )
        val_min = MathTex(r"\tfrac32", font_size=22, color=CONCL).move_to(
            p(self.TAB_X1, row_bot - 0.2)
        )
        variation = VGroup(lbl_fx, fl_dec, fl_inc, val_inf1, val_inf2, val_min)
        self.play(FadeIn(lbl_fx), run_time=0.5)
        self.play(Create(fl_dec, run_time=1.2), FadeIn(val_inf1))
        self.play(Create(fl_inc, run_time=1.2), FadeIn(val_inf2))
        self.play(FadeIn(val_min, scale=1.3), run_time=0.7)
        self.encadre(couleur=CONCL)
        self.legende(
            "f décroît de +∞ à 3/2 sur ]0,1], puis croît de 3/2 à",
            "+∞ sur [1,+∞[ — minimum atteint en x=1. 0,5 point.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()

        self.etape("q8-confirmation-courbe")
        tableau_complet = VGroup(grille, entete, variation)
        self.play(FadeOut(tableau_complet))
        self.play(FadeIn(fig["group"]))
        self.play(
            fig["branch_dec"].animate.set_color(COURBE),
            fig["branch_inc"].animate.set_color(COURBE),
            run_time=1.4,
        )
        min_pt, min_lbl = _point_marque(
            fig["axes"], 1, F1, CONCL, r"\left(1,\ \tfrac32\right)",
            DOWN + RIGHT, buff=0.14, font_size=22,
        )
        self.play(FadeIn(min_pt, scale=1.6), Write(min_lbl))
        fig["group"].add(min_pt, min_lbl)
        fig["min_pt"], fig["min_lbl"] = min_pt, min_lbl
        self.legende(
            "Exactement le creux qu'on voyait dès le début — maintenant",
            "prouvé et localisé.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(badge))
        return fig

    # ── Q9 : dérivée seconde f''(x) = (2-ln x)/x² ──────────────────────
    def chapitre_q9(self):
        badge = self.bandeau_question("9)", "0,5 pt")
        self.ardoise()

        self.etape("q9-enonce")
        but = MathTex(
            r"\text{Montrer que } f''(x) = \dfrac{2-\ln x}{x^2}"
            r" \text{ pour tout } x \text{ de } ]0,+\infty[",
            font_size=24,
        )
        self.ecrit(but)
        self.legende(
            "On dérive f'(x) = 1 - 1/x + ln x/x. Le dernier terme est",
            "un QUOTIENT — pas une simple différence de puissances.",
        )
        self.pose(3.8)

        self.etape("q9-rappel-quotient")
        outil = MathTex(
            r"\left(\dfrac{u}{v}\right)' = \dfrac{u'v-uv'}{v^2}, \quad"
            r" u=\ln x,\ v=x \implies \left(\dfrac{\ln x}{x}\right)'"
            r" = \dfrac{\frac1x\cdot x-\ln x\cdot 1}{x^2} = \dfrac{1-\ln x}{x^2}",
            font_size=16, color=BAC_INK_SOFT,
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        self.legende(
            "Règle du quotient admise, hors socle de cette leçon",
            "(chapitre dérivabilité) — appliquée à ln x sur x.",
        )
        self.pose(4.2)

        self.etape("q9-piege-quotient")
        piege = VGroup(
            Text("ATTENTION : la dérivée d'un quotient n'est PAS le",
                 font_size=19, color=BAC_ERROR),
            Text("quotient des dérivées. u'v moins uv', jamais moins",
                 font_size=19, color=BAC_ERROR),
            Text("(u/v)' = u'/v' — piège classique du bac.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : confondre la dérivée d'un quotient",
            "avec un quotient de dérivées.",
        )
        self.pose(3.8)
        self.nettoie(garder=1)

        self.etape("q9-somme")
        m1 = MathTex(
            r"f''(x) = \dfrac{1}{x^2}+\dfrac{1-\ln x}{x^2}",
            font_size=30,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "Dérivée de -1/x (c'est 1/x²), plus la dérivée du quotient",
            "ln x sur x qu'on vient de rappeler.",
        )
        self.pose(3.6)

        self.etape("q9-conclusion")
        m2 = MathTex(
            r"f''(x) = \dfrac{1+1-\ln x}{x^2} = \dfrac{2-\ln x}{x^2}",
            font_size=28, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "On regroupe les numérateurs, même dénominateur x² : c'est",
            "exactement le résultat annoncé. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q10 : point d'inflexion ─────────────────────────────────────
    def chapitre_q10(self, fig):
        badge = self.bandeau_question("10)", "0,5 pt")
        self.ardoise()

        self.etape("q10-enonce")
        but = MathTex(
            r"\text{En déduire que } (C) \text{ admet un point d'inflexion}",
            font_size=28,
        )
        self.ecrit(but)
        self.legende(
            "Un point d'inflexion, c'est là où f'' CHANGE de signe —",
            "le dénominateur x² > 0 ne change jamais, seul compte 2-ln x.",
        )
        self.pose(3.8)

        self.etape("q10-annulation")
        m1 = MathTex(
            r"f''(x) = 0 \iff 2-\ln x = 0 \iff \ln x = 2 \iff x = e^2",
            font_size=25,
        )
        self.ecrit(m1)
        self.legende(
            "f'' change de signe en x = e au carré : positive avant",
            "(convexe), négative après (concave).",
        )
        self.pose(3.8)

        self.etape("q10-ordonnee")
        m2 = MathTex(
            r"f(e^2) = e^2+\tfrac12-2+\tfrac12\times 2^2 = e^2+\tfrac12",
            font_size=25, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "ln(e²) = 2 : on substitue dans f. Point d'inflexion",
            r"I(e², e²+1/2). 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()

        self.etape("q10-marquage")
        pt_i, lbl_i = _point_marque(
            fig["axes"], E2, FE2, CONCL, r"I(e^2,\ e^2+\tfrac12)",
            UP + LEFT, buff=0.14, font_size=20,
        )
        self.play(FadeIn(pt_i, scale=1.8), Write(lbl_i))
        fig["group"].add(pt_i, lbl_i)
        fig["pt_i"], fig["lbl_i"] = pt_i, lbl_i
        self.legende(
            "Avant ce point, (C) est convexe (tournée vers le haut) ;",
            "après, concave — la courbure change exactement là.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(FadeOut(badge))
        return fig

    # ── Q11 : position relative de (C) et (Δ) ──────────────────────
    def chapitre_q11(self, fig):
        badge = self.bandeau_question("11)", "0,5 pt")
        self.ardoise()

        self.etape("q11-enonce")
        but = MathTex(
            r"\text{Montrer que } f(x)-x = \tfrac12(\ln x-1)^2"
            r" \text{ et en déduire la position de } (C) \text{ et } (\Delta)",
            font_size=17,
        )
        self.ecrit(but)
        self.legende(
            "On calcule f(x) moins x, et on y reconnaît une identité",
            "remarquable : un carré.",
        )
        self.pose(3.6)

        self.etape("q11-carre")
        m1 = MathTex(
            r"f(x)-x = \tfrac12-\ln x+\tfrac12(\ln x)^2"
            r" = \tfrac12\left[(\ln x)^2-2\ln x+1\right] = \tfrac12(\ln x-1)^2",
            font_size=17,
        )
        self.ecrit(m1)
        self.legende(
            "(ln x)² moins 2 ln x plus 1, c'est exactement le carré de",
            "(ln x moins 1) — identité remarquable classique.",
        )
        self.pose(3.8)

        self.etape("q11-conclusion")
        m2 = MathTex(
            r"\tfrac12(\ln x-1)^2 \ge 0 \implies f(x)\ge x, \quad"
            r" \text{égalité} \iff \ln x = 1 \iff x=e",
            font_size=22, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "Un carré est toujours positif ou nul : (C) reste AU-DESSUS",
            "de (Δ) partout, en la touchant seulement en x = e. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()

        self.etape("q11-contact")
        pt_e, lbl_e = _point_marque(
            fig["axes"], E, E, CONCL, r"(e,\ e)", DOWN + RIGHT,
            buff=0.26, font_size=20,
        )
        self.play(
            fig["delta"].animate.set_stroke(width=3.5), run_time=0.8
        )
        cadre_delta = self.entoure(fig["delta"], CONCL, buff=0.05)
        self.play(FadeIn(pt_e, scale=1.8), Write(lbl_e))
        fig["group"].add(pt_e, lbl_e)
        self.legende(
            "Le seul point de contact entre (C) et (Δ) — c'est",
            "exactement e, le zéro du carré qu'on vient de trouver.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(FadeOut(cadre_delta))
        self.play(FadeOut(badge))
        return fig

    # ── Q12 : construire (Δ) et (C) — le récapitulatif ─────────────
    def chapitre_q12(self, fig, f_def):
        badge = self.bandeau_question("12)", "1 pt")
        self.ardoise()

        self.etape("q12-enonce")
        but = MathTex(
            r"\text{Construire } (\Delta) \text{ et } (C)"
            r" \text{ dans le même repère } (O,\vec{i},\vec{j})",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "On ne construit pas au hasard : on reporte tout ce qu'on",
            "vient d'établir, un élément après l'autre.",
        )
        self.pose(3.6)

        self.etape("q12-tour-asymptote")
        self.play(fig["frontiere"].animate.set_stroke(width=3.2), run_time=0.9)
        self.legende(
            "L'asymptote verticale x = 0 (question 1) : (C) plonge le",
            "long de cette droite en partant de +∞.",
        )
        self.pose(3.4)
        self.play(fig["frontiere"].animate.set_stroke(width=2.5), run_time=0.6)

        self.etape("q12-tour-minimum-inflexion")
        cadre_min = self.entoure(fig["min_pt"], CONCL, buff=0.14)
        self.legende(
            "Le minimum en (1 ; 3/2) — question 8.",
        )
        self.pose(2.8)
        self.play(FadeOut(cadre_min))
        cadre_i = self.entoure(fig["pt_i"], CONCL, buff=0.14)
        self.legende(
            "Puis, plus loin, le point d'inflexion I où la courbure",
            "bascule — question 10.",
        )
        self.pose(3.4)
        self.play(FadeOut(cadre_i))

        self.etape("q12-tour-delta")
        self.legende(
            "(Δ): y=x — (C) reste entièrement au-dessus, la touchant",
            "SEULEMENT en (e ; e) — question 11.",
        )
        self.pose(3.8)

        self.etape("q12-tour-branche")
        fleche_ecart = Arrow(
            fig["axes"].c2p(6.3, 6.3), fig["axes"].c2p(6.3, 7.5),
            buff=0.05, color=DELTA, stroke_width=3,
            max_tip_length_to_length_ratio=0.15,
        )
        self.play(Create(fleche_ecart), run_time=1.0)
        fig["group"].add(fleche_ecart)
        self.legende(
            "Et cet écart grandit sans fin : la branche parabolique de",
            "direction (Δ) — question 5. La construction est complète.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.play(FadeOut(badge))
        return fig

    # ── Q13 : H est une primitive de h = ln ────────────────────────
    def chapitre_q13(self, fig):
        badge = self.bandeau_question("13)", "0,5 pt")
        self.play(FadeOut(fig["group"]))
        self.ardoise()

        self.etape("q13-enonce")
        but = MathTex(
            r"\text{Montrer que } H:x\mapsto x\ln x-x"
            r" \text{ est une primitive de } h:x\mapsto\ln x \text{ sur } ]0,+\infty[",
            font_size=19,
        )
        self.ecrit(but)
        self.legende(
            "On change de terrain : deux nouvelles fonctions H et h, en",
            "vue du calcul d'aire à venir. Vérifier H' = h suffit.",
        )
        self.pose(4.0)

        self.etape("q13-rappel-produit")
        outil = MathTex(r"(uv)' = u'v+uv'", font_size=30, color=BAC_INK_SOFT)
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        self.legende(
            "On admet la règle du produit — x ln x en est un, avec",
            "u = x et v = ln x.",
        )
        self.pose(3.4)

        self.etape("q13-derivee-produit")
        m1 = MathTex(
            r"(x\ln x)' = 1\times\ln x+x\times\dfrac1x = \ln x+1",
            font_size=27,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "u' = 1, v = ln x, plus u = x fois v' = 1/x — ce dernier",
            "produit vaut exactement 1.",
        )
        self.pose(3.6)

        self.etape("q13-conclusion")
        m2 = MathTex(
            r"H'(x) = (\ln x+1)-1 = \ln x = h(x)",
            font_size=30, color=CONCL,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "La dérivée de -x vaut -1 : elle annule le +1. Il reste",
            "ln x — exactement h. H est une primitive de h. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Q14 : intégration par parties — ∫₁^e (ln x)² dx = e-2 ──────
    def chapitre_q14(self):
        badge = self.bandeau_question("14)", "0,75 pt")
        self.ardoise()

        self.etape("q14-enonce")
        but = MathTex(
            r"\text{À l'aide d'une IPP, montrer que }"
            r" \int_1^e (\ln x)^2\,dx = e-2",
            font_size=26,
        )
        self.ecrit(but)
        self.legende(
            "(ln x)² s'écrit ln x fois ln x — une intégration par",
            "parties (technique du chapitre calcul intégral).",
        )
        self.pose(3.8)

        self.etape("q14-choix-ipp")
        outil = MathTex(
            r"\int_a^b u'v = \big[uv\big]_a^b - \int_a^b uv'",
            font_size=26, color=BAC_INK_SOFT,
        )
        choix = MathTex(
            r"u=\ln x,\ u'=\dfrac1x \quad;\quad v'=\ln x,\ v=H(x)=x\ln x-x",
            font_size=20,
        )
        self.ecrit(outil)
        self.encadre(couleur=BAC_ACCENT)
        self.ecrit(choix, buff=0.5)
        self.legende(
            "On dérive ln x (plus simple), et on primitive l'autre",
            "ln x en H, la primitive établie à la question 13.",
        )
        self.pose(4.2)

        self.etape("q14-formule")
        m1 = MathTex(
            r"\int_1^e(\ln x)^2\,dx ="
            r" \Big[\ln x\,(x\ln x-x)\Big]_1^e - \int_1^e \dfrac1x(x\ln x-x)\,dx",
            font_size=16,
        )
        self.ecrit(m1, buff=0.5)
        self.legende("On applique la formule de l'IPP avec ce choix.")
        self.pose(3.4)

        self.etape("q14-piege-crochet")
        piege = VGroup(
            Text("ATTENTION : le crochet ne s'annule PAS « parce qu'il le",
                 font_size=19, color=BAC_ERROR),
            Text("faut » — on le VÉRIFIE aux deux bornes : en x=1, ln1=0 ;",
                 font_size=19, color=BAC_ERROR),
            Text("en x=e, (e·1-e)=0. Les deux annulent le crochet.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : supposer un crochet nul sans le",
            "vérifier terme par terme, aux DEUX bornes.",
        )
        self.pose(4.2)
        self.nettoie(garder=1)

        self.etape("q14-integrale-restante")
        m2 = MathTex(
            r"\int_1^e(\ln x-1)\,dx = \Big[x\ln x-2x\Big]_1^e"
            r" = (e-2e)-(0-2) = 2-e",
            font_size=19,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Le quotient x fois (ln x -1) sur x se simplifie en ln x",
            "moins 1 — une primitive directe via H.",
        )
        self.pose(3.8)

        self.etape("q14-conclusion")
        m3 = MathTex(
            r"\int_1^e(\ln x)^2\,dx = 0-(2-e) = e-2",
            font_size=28, color=LIM,
        )
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=LIM)
        self.legende(
            "Crochet nul, moins (2 moins e) : il reste e moins 2.",
            "0,75 point — résultat réutilisé à la question suivante.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q15 : aire entre (C) et (Δ) sur [1,e] ───────────────────────
    def chapitre_q15(self, fig):
        badge = self.bandeau_question("15)", "0,5 pt")
        self.ardoise()

        self.etape("q15-enonce")
        but = MathTex(
            r"\text{Calculer, en cm}^2\text{, l'aire du domaine limité par}"
            r" (C), (\Delta), x=1 \text{ et } x=e",
            font_size=18,
        )
        self.ecrit(but)
        self.legende(
            "Sur [1,e], (C) est au-dessus de (Δ) — question 11 — donc",
            "l'aire est l'intégrale de f(x) moins x.",
        )
        self.pose(3.8)

        self.etape("q15-figure-aire")
        self.play(FadeIn(fig["group"]))
        zone = fig["axes"].get_area(
            fig["branch_inc"], x_range=[1, E], color=CONCL,
            opacity=0.4, bounded_graph=fig["delta"],
        )
        self.play(FadeIn(zone))
        fig["group"].add(zone)
        self.legende(
            "La zone ombrée entre 1 et e — repère orthonormé, unité",
            "1 cm : une unité d'aire vaut 1 cm².",
        )
        self.pose(3.8)

        self.etape("q15-formule")
        m1 = MathTex(
            r"\mathcal{A} = \int_1^e\big(f(x)-x\big)\,dx"
            r" = \int_1^e\left(\tfrac12(\ln x)^2-\ln x+\tfrac12\right)dx",
            font_size=19,
        )
        self.ecrit(m1)
        self.legende(
            "On développe f(x) moins x — et on retrouve les deux",
            "intégrales déjà calculées.",
        )
        self.pose(3.8)

        self.etape("q15-outil-lnx")
        m2 = MathTex(
            r"\int_1^e \ln x\,dx = \Big[x\ln x-x\Big]_1^e = (e-e)-(0-1) = 1",
            font_size=21,
        )
        self.ecrit(m2, buff=0.5)
        self.legende("Avec la primitive H : cette intégrale-là vaut exactement 1.")
        self.pose(3.4)

        self.etape("q15-calcul")
        m3 = MathTex(
            r"\mathcal{A} = \tfrac12(e-2)-1+\tfrac12(e-1) = e-\tfrac52",
            font_size=26,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On réutilise ∫(ln x)² = e-2 (question 14) et ∫ln x = 1 :",
            "les deux moitiés de e s'additionnent, le reste se simplifie.",
        )
        self.pose(4.0)

        self.etape("q15-conclusion")
        m4 = MathTex(
            r"\mathcal{A} = \left(e-\tfrac52\right)\text{cm}^2"
            r" \approx 0{,}22\ \text{cm}^2",
            font_size=27, color=LIM,
        )
        self.ecrit(m4, buff=0.55)
        self.encadre(couleur=LIM)
        self.legende(
            "e moins cinq demis — une aire positive, comme attendu.",
            "0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return fig

    # ── Partie 2 : la suite (u_n), u₀=1, u_{n+1}=f(u_n) ────────────
    # Figure « toile d'araignée » : ZOOM dédié, réutilisant (C) et (Δ)
    # déjà établies — remplace la figure de la première partie (modèle
    # « replace », DESIGN.md).
    def _rung(self, ax, u_from, from_axis=False):
        """Une marche de l'escalier : verticale vers (C), horizontale
        vers (Δ). Valeurs calculées par LA MÊME fonction f que le
        corrigé — donc exactes, même si leur affichage est illustratif."""
        u_to = _f(u_from)
        y_start = 0.0 if from_axis else u_from
        vert = Line(
            ax.c2p(u_from, y_start), ax.c2p(u_from, u_to),
            color=OUTIL, stroke_width=2.5,
        )
        horiz = Line(
            ax.c2p(u_from, u_to), ax.c2p(u_to, u_to),
            color=OUTIL, stroke_width=2.5,
        )
        dot = Dot(ax.c2p(u_to, u_to), color=OUTIL, radius=DOT_R * 0.85)
        return vert, horiz, dot, u_to

    def chapitre_q16(self, fig):
        badge = self.bandeau_question("16)", "0,5 pt")
        self.ardoise()

        self.etape("q16-definition")
        defu = MathTex(
            r"u_0 = 1, \qquad u_{n+1} = f(u_n) \ \text{pour tout } n \in \mathbb{N}",
            font_size=28,
        )
        self.ecrit(defu)
        self.legende(
            "Deuxième partie : cette même f construit maintenant une",
            "suite, terme après terme.",
        )
        self.pose(3.6)

        self.etape("q16-enonce")
        but = MathTex(
            r"\text{Montrer par récurrence que } 1\le u_n\le e"
            r" \text{ pour tout } n \in \mathbb{N}",
            font_size=25,
        )
        self.ecrit(but, buff=0.4)
        self.legende(
            "On va d'abord REGARDER la suite se construire sur la",
            "figure, puis le prouver proprement.",
        )
        self.pose(3.6)
        self.nettoie(garder=1)
        self.play(FadeOut(fig["group"]))

        self.etape("q16-figure-cobweb")
        ax_cw = Axes(
            x_range=[0, 3.4, 1], y_range=[0, 3.4, 1],
            x_length=4.2, y_length=4.0, axis_config=AXIS_CONFIG,
        )
        _pose_axes(ax_cw, 0, 0, 0.8, -1.9)
        courbe_cw = ax_cw.plot(_f, x_range=[0.23, 3.4], color=COURBE, stroke_width=3.2)
        delta_cw = ax_cw.plot(lambda x: x, x_range=[0, 3.4], color=DELTA, stroke_width=2.5)
        self.play(Create(ax_cw, run_time=1.2))
        self.play(Create(courbe_cw, run_time=1.6), Create(delta_cw, run_time=1.6))
        pt_e2, lbl_e2 = _point_marque(
            ax_cw, E, E, CONCL, r"(e,e)", UP + LEFT, buff=0.24, font_size=20,
        )
        self.play(FadeIn(pt_e2, scale=1.6), Write(lbl_e2))
        self.legende(
            "On retrouve (C) et (Δ), avec leur point de contact (e,e)",
            "établi à la question 11 — il va jouer un rôle central.",
        )
        self.pose(4.0)

        self.etape("q16-figure-marches")
        u0_pt, u0_lbl = _point_marque(
            ax_cw, U0, 0, OUTIL, "u_0=1", DOWN, buff=0.12, font_size=22
        )
        self.play(FadeIn(u0_pt, scale=1.6), Write(u0_lbl))
        self.pose(1.2)

        v1, h1, d1, _ = self._rung(ax_cw, U0, from_axis=True)
        lbl1 = MathTex(r"u_1=\tfrac32", font_size=20, color=OUTIL).next_to(
            d1, DOWN + RIGHT, buff=0.08
        )
        self.play(Create(v1, run_time=0.9), Create(h1, run_time=0.9))
        self.play(FadeIn(d1, scale=1.5), Write(lbl1))
        self.pose(1.4)

        v2, h2, d2, _ = self._rung(ax_cw, U1)
        u2_str = f"{U2:.2f}".replace(".", "{,}")
        lbl2 = MathTex(r"u_2\approx " + u2_str, font_size=18, color=OUTIL).next_to(
            d2, DOWN + RIGHT, buff=0.08
        )
        self.play(Create(v2, run_time=0.9), Create(h2, run_time=0.9))
        self.play(FadeIn(d2, scale=1.5), Write(lbl2))
        self.pose(1.4)

        v3, h3, d3, _ = self._rung(ax_cw, U2)
        u3_str = f"{U3:.2f}".replace(".", "{,}")
        lbl3 = MathTex(r"u_3\approx " + u3_str, font_size=18, color=OUTIL).next_to(
            d3, DOWN + RIGHT, buff=0.08
        )
        self.play(Create(v3, run_time=0.9), Create(h3, run_time=0.9))
        self.play(FadeIn(d3, scale=1.5), Write(lbl3))
        marches = VGroup(
            u0_pt, u0_lbl, v1, h1, d1, lbl1, v2, h2, d2, lbl2, v3, h3, d3, lbl3,
        )
        self.legende(
            "L'escalier grimpe marche après marche vers (e,e) — valeurs",
            "illustratives (hors barème), toujours calculées par f.",
        )
        self.pose(4.2)
        self.efface_legende()

        self.etape("q16-initialisation")
        m1 = MathTex(
            r"\text{Initialisation : } u_0=1, \quad 1\le 1\le e \ \checkmark",
            font_size=27,
        )
        self.ecrit(m1)
        self.legende("Le rang 0 vérifie bien l'encadrement demandé.")
        self.pose(3.0)

        self.etape("q16-heredite")
        m2 = MathTex(
            r"\text{Hérédité : } 1\le u_n\le e \subset [1,+\infty["
            r" \implies f(1)\le f(u_n)\le f(e)",
            font_size=18,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On suppose l'encadrement vrai au rang n, et on applique",
            "f, croissante sur [1,+∞[ (question 8) — donc sur [1,e].",
        )
        self.pose(4.0)

        self.etape("q16-piege-intervalle")
        piege = VGroup(
            Text("ATTENTION : f est croissante sur [1,+∞[ (question 8) —",
                 font_size=19, color=BAC_ERROR),
            Text("on ne peut appliquer f(1)≤f(u_n)≤f(e) QUE parce que",
                 font_size=19, color=BAC_ERROR),
            Text("[1,e] ⊂ [1,+∞[. Hors de cet intervalle, rien ne le garantit.",
                 font_size=19, color=BAC_ERROR),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.ecrit(piege, buff=0.5)
        self.legende(
            "Un piège classique : appliquer une monotonie en dehors",
            "de l'intervalle où elle a été établie.",
        )
        self.pose(4.0)
        self.nettoie(garder=1)

        self.etape("q16-conclusion")
        m3 = MathTex(
            r"f(1)=\tfrac32, \quad f(e)=e \implies"
            r" 1\le\tfrac32\le u_{n+1}\le e",
            font_size=22, color=CONCL,
        )
        self.ecrit(m3, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "f(e) = e (déjà vu : (e,e) est sur (Δ)). L'encadrement",
            "passe au rang n+1 : la récurrence est établie. 0,5 point.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return {
            "axes": ax_cw, "courbe": courbe_cw, "delta": delta_cw,
            "pt_e": pt_e2, "lbl_e": lbl_e2, "marches": marches,
            "group": VGroup(ax_cw, courbe_cw, delta_cw, pt_e2, lbl_e2, marches),
        }

    # ── Q17 : (u_n) croissante ──────────────────────────────────────
    def chapitre_q17(self, fig_cw):
        badge = self.bandeau_question("17)", "0,5 pt")
        self.ardoise()

        self.etape("q17-enonce")
        but = MathTex(r"\text{Montrer que la suite } (u_n) \text{ est croissante}", font_size=30)
        self.ecrit(but)
        self.legende(
            "On étudie le signe de u_{n+1} moins u_n — exactement",
            "f(u_n) moins u_n.",
        )
        self.pose(3.4)

        self.etape("q17-reutilisation")
        m1 = MathTex(
            r"u_{n+1}-u_n = f(u_n)-u_n = \tfrac12(\ln u_n-1)^2 \ge 0",
            font_size=25, color=CONCL,
        )
        self.ecrit(m1, buff=0.5)
        self.encadre(couleur=CONCL)
        self.legende(
            "C'est exactement l'identité de la question 11, appliquée",
            "à x = u_n : un carré, toujours positif ou nul. 0,5 point.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.nettoie()

        self.etape("q17-confirmation-figure")
        fleche_croiss = Arrow(
            fig_cw["axes"].c2p(1, -0.35), fig_cw["axes"].c2p(E, -0.35),
            buff=0.05, color=CONCL, stroke_width=3,
            max_tip_length_to_length_ratio=0.1,
        )
        lbl_croiss = Text(
            "u₀ < u₁ < u₂ < u₃ < … ", font_size=17, color=CONCL
        ).next_to(fleche_croiss, DOWN, buff=0.08)
        self.play(Create(fleche_croiss), FadeIn(lbl_croiss))
        fig_cw["group"].add(fleche_croiss, lbl_croiss)
        self.legende(
            "Exactement ce que montre l'escalier : chaque marche",
            "avance vers la droite, jamais en arrière.",
        )
        self.pose(3.8)
        self.efface_legende()
        self.play(FadeOut(badge))
        return fig_cw

    # ── Q18 : (u_n) convergente ──────────────────────────────────────
    def chapitre_q18(self):
        badge = self.bandeau_question("18)", "0,5 pt")
        self.ardoise()

        self.etape("q18-enonce")
        but = MathTex(
            r"\text{En déduire que la suite } (u_n) \text{ est convergente}",
            font_size=28,
        )
        self.ecrit(but)
        self.legende(
            "Deux ingrédients déjà en main : croissante, et majorée.",
        )
        self.pose(3.2)

        self.etape("q18-theoreme")
        m1 = MathTex(
            r"(u_n) \text{ croissante (Q17) et majorée par } e \text{ (Q16)}"
            r" \implies (u_n) \text{ converge}",
            font_size=19, color=LIM,
        )
        self.ecrit(m1, buff=0.5)
        self.encadre(couleur=LIM)
        self.legende(
            "Théorème de la convergence monotone (chapitre suites",
            "numériques) : conclusion immédiate. 0,5 point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q19 : calcul de la limite ────────────────────────────────────
    def chapitre_q19(self, fig_cw):
        badge = self.bandeau_question("19)", "0,75 pt")
        self.ardoise()

        self.etape("q19-enonce")
        but = MathTex(r"\text{Calculer la limite de la suite } (u_n)", font_size=30)
        self.ecrit(but)
        self.legende(
            "On note ℓ cette limite, et on exploite deux choses : la",
            "continuité de f, et l'encadrement 1 ≤ u_n ≤ e.",
        )
        self.pose(3.8)

        self.etape("q19-point-fixe")
        m1 = MathTex(
            r"1\le u_n\le e \implies \ell\in[1,e] \ ; \quad"
            r" u_{n+1}=f(u_n),\ f \text{ continue} \implies \ell=f(\ell)",
            font_size=17,
        )
        self.ecrit(m1)
        self.legende(
            "En passant à la limite dans u_{n+1}=f(u_n) : ℓ est un",
            "POINT FIXE de f, quelque part dans [1,e].",
        )
        self.pose(4.0)

        self.etape("q19-resoudre")
        m2 = MathTex(
            r"f(\ell)=\ell \iff \tfrac12(\ln\ell-1)^2=0 \iff \ell=e",
            font_size=26, color=LIM,
        )
        self.ecrit(m2, buff=0.5)
        self.encadre(couleur=LIM)
        self.legende(
            "On réutilise UNE DERNIÈRE FOIS f(x)-x = 1/2(ln x-1)² :",
            "son seul zéro est x = e, qui appartient bien à [1,e].",
        )
        self.pose(4.4)

        self.etape("q19-conclusion")
        m3 = MathTex(r"\lim_{n\to+\infty} u_n = e", font_size=36, color=LIM)
        self.ecrit(m3, buff=0.55)
        self.encadre(couleur=LIM)
        self.legende(
            "0,75 point. Et c'est exactement le point où (C) touche",
            "(Δ) — la boucle du problème se referme.",
        )
        self.pose(4.4)
        self.efface_legende()
        self.nettoie()

        self.etape("q19-figure-limite")
        tick_e = Line(
            fig_cw["axes"].c2p(E, 0), fig_cw["axes"].c2p(E, E),
            color=LIM, stroke_width=2.5,
        )
        self.play(
            fig_cw["pt_e"].animate.set_color(LIM),
            fig_cw["lbl_e"].animate.set_color(LIM),
            run_time=1.0,
        )
        self.play(Create(tick_e), run_time=1.2)
        lim_lbl = Text("lim u_n = e", font_size=18, color=LIM).next_to(
            fig_cw["axes"].c2p(E, 0), DOWN, buff=0.14
        )
        self.play(FadeIn(lim_lbl))
        self.legende(
            "L'escalier grimpe indéfiniment vers ce point de contact —",
            "jamais au-delà, toujours plus près.",
        )
        self.pose(4.2)
        self.efface_legende()
        self.play(FadeOut(badge))
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=32, color=BAC_INK),
            Text("• Domaine du ln : jamais un détail — il encadre chaque",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  limite, chaque dérivée, chaque question de ce problème.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Croissances comparées : ln x/x → 0, (ln x)²/x → 0 — des",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  limites de RÉFÉRENCE à nommer, jamais à affirmer.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• f(x)-x = 1/2(ln x-1)² : UNE identité, réutilisée trois",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  fois — position de (C), croissance de (u_n), et point",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  fixe e — sa limite. Repérer une identité qui revient.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• IPP : le crochet se VÉRIFIE aux deux bornes, jamais",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  supposé nul.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("• Suite u_{n+1}=f(u_n) : encadrement par récurrence via la",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  monotonie de f, croissance par le signe de f(x)-x,",
                 font_size=20, color=BAC_INK_SOFT),
            Text("  limite = point fixe de f dans l'intervalle encadrant.",
                 font_size=20, color=BAC_INK_SOFT),
            Text("11 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=19, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        if bilan.width > 12.5:
            bilan.scale_to_fit_width(12.5)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)