#!/usr/bin/env python3
"""Fidélité d'une scène à son entrée de banque (porte 4 du contrat).

Vise LE mode d'échec documenté du travail à haut volume : la
**normalisation silencieuse d'une valeur** — une affixe recopiée depuis
la ligne voisine, un 3/2 devenu 1/2, un signe qui saute. Le pilote de
transcription d'août 2026 a mesuré ~1 erreur substantielle par 3
exercices : elle ne se voit ni au rendu, ni au lint, ni toujours à
l'œil. Elle se voit en comparant les NOMBRES.

    python scripts/bank-fidelity.py content/maths/<notion>/bank.yaml \
        bk-2019-n-x4 animations/scenes/maths/<notion>/bk-2019-n-x4.py

Le contrôle est volontairement asymétrique :
  • tout nombre de la banque doit se retrouver dans la scène → ERREUR ;
  • un nombre de la scène absent de la banque est seulement signalé
    (une scène a le droit d'introduire des valeurs d'illustration, des
    bornes de fenêtre, des tailles de police).

Ce n'est donc pas une preuve d'exactitude : c'est un filet qui attrape
la classe d'erreur la plus coûteuse et la plus silencieuse.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

# Un nombre « de contenu » : entier ou décimal, éventuellement signé.
# On ignore les nombres à un chiffre (0, 1, 2 …) : ils sont partout et
# ne portent pas d'information distinctive.
NOMBRE = re.compile(r"(?<![\w.])(\d+(?:[.,]\d+)?)(?![\w])")

# Bruit à ne pas confondre avec du contenu mathématique.
IGNORE_SCENE = re.compile(
    r"font_size\s*=\s*\d+|"
    r"stroke_width\s*=\s*[\d.]+|"
    r"run_time\s*=\s*[\d.]+|"
    r"buff\s*=\s*[\d.]+|"
    r"radius\s*=\s*[\d.]+|"
    r"\.pose\([\d.]+\)|"
    r"^\s*#.*$",
    re.MULTILINE,
)


def entree_de_banque(banque: Path, ident: str) -> str:
    """Le texte brut de l'entrée `ident`, de son `- id:` au suivant."""
    lignes = banque.read_text(encoding="utf-8").splitlines()
    debut = None
    for i, ligne in enumerate(lignes):
        if re.match(rf"\s*-\s+id:\s*{re.escape(ident)}\s*$", ligne):
            debut = i
            break
    if debut is None:
        raise SystemExit(f"entrée « {ident} » introuvable dans {banque}")
    indentation = len(lignes[debut]) - len(lignes[debut].lstrip())
    for j in range(debut + 1, len(lignes)):
        l = lignes[j]
        if re.match(r"\s*-\s+id:", l) and (len(l) - len(l.lstrip())) <= indentation:
            return "\n".join(lignes[debut:j])
    return "\n".join(lignes[debut:])


# On ne retient d'une banque QUE le contexte mathématique : ce qui vit
# entre deux $ (le corps des énoncés et des raisonnements) et ce qui
# suit un `math:` (les étapes du corrigé). Les nombres de métadonnées —
# année, identifiant d'upload, date de vérification — n'y entrent
# jamais, ce qui évite une liste noire toujours incomplète.
MATHS = re.compile(r"\$[^$]{1,400}\$|^\s*-?\s*math:\s*(.+)$", re.MULTILINE)


def contexte_mathematique(texte: str) -> str:
    return "\n".join(m.group(0) for m in MATHS.finditer(texte))


def nombres(texte: str) -> set[str]:
    """Tous les nombres du texte, chiffres isolés compris.

    On ne filtre PAS les nombres à un chiffre : dans une banque de
    maths, l'essentiel des valeurs vit à l'intérieur de fractions
    (\\dfrac{3}{2}) et vaut donc « 3 » et « 2 ». Les écarter vidait le
    contrôle de sa substance — il passait alors toujours, ce qui est
    pire qu'inutile : c'est une fausse assurance.
    """
    trouves = set()
    for brut in NOMBRE.findall(texte):
        n = brut.replace(",", ".")
        trouves.add(n.rstrip("0").rstrip(".") if "." in n else n)
    return trouves


def main() -> int:
    if len(sys.argv) != 4:
        print(__doc__)
        return 2
    banque, ident, scene = Path(sys.argv[1]), sys.argv[2], Path(sys.argv[3])

    texte_banque = contexte_mathematique(entree_de_banque(banque, ident))
    texte_scene = IGNORE_SCENE.sub(" ", scene.read_text(encoding="utf-8"))

    de_la_banque = nombres(texte_banque)
    de_la_scene = nombres(texte_scene)

    manquants = sorted(de_la_banque - de_la_scene, key=lambda s: (len(s), s))
    ajoutes = sorted(de_la_scene - de_la_banque, key=lambda s: (len(s), s))

    print(f"banque {banque.name} / {ident} : {len(de_la_banque)} valeurs")
    print(f"scène  {scene.name} : {len(de_la_scene)} valeurs")

    if manquants:
        print()
        print(f"✗ {len(manquants)} valeur(s) de la banque ABSENTE(S) de la scène :")
        print("   " + ", ".join(manquants))
        print("   → soit la scène a omis une question, soit une valeur a été")
        print("     recopiée de travers. À justifier une par une.")
    if ajoutes:
        print()
        print(f"· {len(ajoutes)} valeur(s) propre(s) à la scène (illustrations,")
        print("  fenêtres de tracé — normal, à survoler) :")
        print("   " + ", ".join(ajoutes[:40]) + (" …" if len(ajoutes) > 40 else ""))

    print()
    if manquants:
        print("✗ porte 4 NON franchie.")
        return 1
    print("✓ porte 4 franchie : aucune valeur de la banque perdue.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
