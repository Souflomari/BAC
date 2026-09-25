#!/usr/bin/env python3
"""Lint des scènes d'explication animée (porte 1 du contrat de scène).

Chaque règle ici est née d'un défaut RÉEL trouvé par un audit image par
image de la campagne. Le but est d'attraper mécaniquement, en une
seconde, ce qui a coûté des heures d'inspection visuelle — pour que
l'audit humain (ou l'audit-vision d'un agent) se concentre sur ce qui
ne peut PAS être vérifié statiquement.

    python scripts/scene-lint.py animations/scenes/maths/.../bk-XXXX.py
    python scripts/scene-lint.py --all

Sortie : une ligne par constat, préfixée ERREUR ou ALERTE.
Code de retour : 1 s'il reste au moins une ERREUR, 0 sinon.
Une ALERTE n'est pas bloquante : c'est un point à regarder à l'audit.

Voir docs/ops/SCENE-CONTRACT.md.
"""
from __future__ import annotations

import ast
import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
DOSSIER_SCENES = RACINE / "animations" / "scenes"

# Un identifiant de modèle ne doit jamais atterrir dans le dépôt hors
# .claude/agents/ (voir la porte d'hygiène de la CI).
MODELE = re.compile(r"claude-(opus|sonnet|fable|haiku)")


class Constats:
    def __init__(self, fichier: Path) -> None:
        self.fichier = fichier
        self.erreurs: list[str] = []
        self.alertes: list[str] = []

    def erreur(self, ligne: int, message: str) -> None:
        self.erreurs.append(f"ERREUR {self.fichier.name}:{ligne} — {message}")

    def alerte(self, ligne: int, message: str) -> None:
        self.alertes.append(f"ALERTE {self.fichier.name}:{ligne} — {message}")

    def afficher(self) -> None:
        for m in self.erreurs + self.alertes:
            print(m)


def _appels(noeud: ast.AST) -> list[ast.Call]:
    return [n for n in ast.walk(noeud) if isinstance(n, ast.Call)]


def _nom_appel(appel: ast.Call) -> str:
    """`self.nettoie(...)` -> "nettoie" ; `Axes(...)` -> "Axes"."""
    f = appel.func
    if isinstance(f, ast.Attribute):
        return f.attr
    if isinstance(f, ast.Name):
        return f.id
    return ""


def _chaines(appel: ast.Call) -> list[str]:
    return [
        a.value
        for a in list(appel.args) + [k.value for k in appel.keywords]
        if isinstance(a, ast.Constant) and isinstance(a.value, str)
    ]


def verifier(fichier: Path) -> Constats:
    c = Constats(fichier)
    source = fichier.read_text(encoding="utf-8")
    arbre = ast.parse(source, filename=str(fichier))

    # ── 1. Identifiants de modèle ────────────────────────────────────
    for i, ligne in enumerate(source.splitlines(), 1):
        if MODELE.search(ligne):
            c.erreur(i, "identifiant de modèle interdit dans une scène")

    # ── 2. numpy 2 : np.trapz a disparu ─────────────────────────────
    for i, ligne in enumerate(source.splitlines(), 1):
        if "np.trapz(" in ligne or "numpy.trapz(" in ligne:
            c.erreur(i, "np.trapz supprimé en numpy 2 — utiliser np.trapezoid")

    # ── 3. La classe et les chapitres ────────────────────────────────
    classe = next(
        (n for n in ast.walk(arbre)
         if isinstance(n, ast.ClassDef) and n.name == "Explication"),
        None,
    )
    if classe is None:
        c.erreur(1, "aucune classe Explication trouvée")
        return c

    methodes = {
        n.name: n for n in classe.body if isinstance(n, ast.FunctionDef)
    }
    chapitres = {k: v for k, v in methodes.items() if k.startswith("chapitre")}
    if not chapitres:
        c.erreur(classe.lineno, "aucune méthode chapitre_* trouvée")

    # ── 4. LA RÈGLE CAPITALE : ardoise() ne nettoie pas ─────────────
    # Tout chapitre qui écrit dans la colonne (ecrit) doit la nettoyer
    # avant de rendre la main : sinon sa dernière ligne reste à l'écran
    # pour toujours dès que le chapitre suivant appelle ardoise().
    for nom, methode in chapitres.items():
        noms = [_nom_appel(a) for a in _appels(methode)]
        # Un « fondu général » — FadeOut(m) for m in self.mobjects — vide
        # l'écran entier : le chapitre est en règle même sans nettoie().
        fondu_general = any(
            isinstance(n, ast.Attribute) and n.attr == "mobjects"
            for n in ast.walk(methode)
        )
        if "ecrit" in noms and "nettoie" not in noms and not fondu_general:
            c.erreur(
                methode.lineno,
                f"{nom} écrit dans l'ardoise sans jamais appeler nettoie() — "
                "ligne fantôme garantie (ardoise() ne nettoie PAS)",
            )

    # ── 5. Étapes : unicité des noms, présence d'une légende ────────
    noms_etapes: dict[str, int] = {}
    for methode in chapitres.values():
        for appel in _appels(methode):
            if _nom_appel(appel) == "etape":
                for s in _chaines(appel):
                    if s in noms_etapes:
                        c.erreur(
                            appel.lineno,
                            f"nom d'étape dupliqué « {s} » (déjà ligne "
                            f"{noms_etapes[s]}) — les sections du rendu "
                            "seraient ambiguës",
                        )
                    noms_etapes[s] = appel.lineno

    nb_etapes = len(noms_etapes)
    if nb_etapes == 0:
        c.erreur(classe.lineno, "aucune etape() — la scène n'a pas de sections")

    # ── 6. Graduations numériques sur chaque Axes (exigence owner) ──
    # Portée MODULE ENTIER, pas seulement la classe : une scène a le
    # droit (bon style) de factoriser la construction des Axes dans un
    # helper de niveau module (ex. `_nouvelle_figure()`, réutilisé pour
    # plusieurs figures) — un scan limité à la classe rate alors CES
    # appels-là et sous-compte silencieusement les repères réels.
    axes_crees = sum(
        1 for a in _appels(arbre)
        if _nom_appel(a) in {"Axes", "NumberPlane", "ComplexPlane", "NumberLine"}
    )
    # "graduations" = le nom PUBLIC monté dans BacScene (BT-000) ;
    # "_graduations" son alias historique — les deux comptent.
    graduations = sum(
        1 for a in _appels(arbre)
        if _nom_appel(a) in {"graduations", "_graduations", "add_numbers", "add_coordinates"}
    )
    if axes_crees and graduations == 0:
        c.erreur(
            classe.lineno,
            f"{axes_crees} repère(s) construit(s) et AUCUNE graduation "
            "numérique — voir §1.6 du contrat",
        )
    elif axes_crees > graduations:
        c.alerte(
            classe.lineno,
            f"{axes_crees} repère(s) pour {graduations} pose(s) de "
            "graduations — vérifier que chaque figure porte ses nombres",
        )

    # ── 7. Sens de bombement des arcs ───────────────────────────────
    for appel in _appels(classe):
        if _nom_appel(appel) == "ArcBetweenPoints":
            for k in appel.keywords:
                if k.arg == "angle":
                    txt = ast.unparse(k.value)
                    if txt.startswith("PI") or txt.startswith("np.pi"):
                        c.alerte(
                            appel.lineno,
                            "ArcBetweenPoints(angle=+PI/…) bombe vers le BAS "
                            "sur une corde gauche→droite ; −PI/… pour le haut",
                        )

    # ── 8. Accolades LaTeX déséquilibrées ───────────────────────────
    for appel in _appels(classe):
        if _nom_appel(appel) in {"MathTex", "Tex"}:
            # Manim CONCATÈNE les fragments d'un MathTex à plusieurs
            # arguments : découper « S = \left\{ » / « \right\} » pour
            # pouvoir colorer un morceau est légitime. On vérifie donc
            # l'équilibre sur la CONCATÉNATION, jamais fragment par
            # fragment (sinon le lint crie au loup et on cesse de le
            # croire).
            entier = "".join(_chaines(appel))
            if entier.count("{") != entier.count("}"):
                c.erreur(
                    appel.lineno,
                    "accolades LaTeX déséquilibrées : " f"{entier[:60]!r}",
                )
            if entier.count(r"\left") != entier.count(r"\right"):
                c.erreur(
                    appel.lineno,
                    r"\left sans \right (ou l'inverse) : " f"{entier[:60]!r}",
                )

    # ── 9. LaTeX dans un Text() — il n'est pas interprété ───────────
    for appel in _appels(classe):
        if _nom_appel(appel) in {"Text", "legende"}:
            for s in _chaines(appel):
                if re.search(r"\^\{|\\dfrac|\\sqrt|\\ln|_\{", s):
                    c.alerte(
                        appel.lineno,
                        "syntaxe LaTeX dans un Text()/legende() — elle "
                        f"s'affichera telle quelle : {s[:48]!r}",
                    )

    # ── 10. Tailles de police sous le plancher de lisibilité ────────
    for appel in _appels(classe):
        for k in appel.keywords:
            if k.arg == "font_size" and isinstance(k.value, ast.Constant):
                if isinstance(k.value.value, (int, float)) and k.value.value < 16:
                    c.alerte(
                        appel.lineno,
                        f"font_size={k.value.value} sous le plancher de "
                        "lisibilité (16) — à regarder sur l'image rendue",
                    )

    # ── 11. Légendes : trois lignes, ~60 caractères ─────────────────
    for appel in _appels(classe):
        if _nom_appel(appel) == "legende":
            lignes = _chaines(appel)
            if len(lignes) > 3:
                c.erreur(
                    appel.lineno,
                    f"legende() de {len(lignes)} lignes (maximum 3) — elle "
                    "mordrait la figure",
                )
            for s in lignes:
                if len(s) > 68:
                    c.alerte(
                        appel.lineno,
                        f"ligne de légende de {len(s)} caractères "
                        "(viser ~60) — risque de débordement",
                    )

    # ── 12. La clôture ──────────────────────────────────────────────
    if "chapitre_fin" not in chapitres:
        c.alerte(classe.lineno, "pas de chapitre_fin — la carte bilan manque ?")

    print(f"— {fichier.name} : {nb_etapes} étapes, {axes_crees} repère(s)")
    return c


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2
    if args[0] == "--all":
        fichiers = sorted(DOSSIER_SCENES.rglob("*.py"))
    else:
        fichiers = [Path(a) for a in args]

    total_erreurs = 0
    for f in fichiers:
        if not f.exists():
            print(f"ERREUR fichier introuvable : {f}")
            total_erreurs += 1
            continue
        c = verifier(f)
        c.afficher()
        total_erreurs += len(c.erreurs)

    print()
    if total_erreurs:
        print(f"✗ {total_erreurs} erreur(s) — porte 1 NON franchie.")
        return 1
    print("✓ porte 1 franchie (les alertes restent à regarder à l'audit).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
