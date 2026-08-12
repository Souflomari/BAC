#!/usr/bin/env python3
"""Fabrique les bons de travail à partir du manifeste et des banques.

On n'écrit pas 35 bons à la main : on les GÉNÈRE, pour qu'ils ne
puissent pas mentir sur les numéros de ligne d'une banque qui bouge.

    python scripts/make-work-order.py            # tout ce qui est a-produire
    python scripts/make-work-order.py bk-2023-n-x4
    python scripts/make-work-order.py --ledger   # régénère seulement le journal

Le bon produit est AUTOPORTANT : un agent qui n'a lu que
docs/ops/SCENE-CONTRACT.md et ce bon a tout ce qu'il lui faut.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
MANIFESTE = RACINE / "animations" / "manifest.yaml"
BONS = RACINE / "work-orders"

# Modèles validés à citer selon la notion — un agent imite mieux qu'il
# n'invente, et ces scènes-là ont passé l'audit.
MODELES = {
    "nombres-complexes": [
        "animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py "
        "(structure, carte épinglée)",
        "animations/scenes/maths/nombres-complexes-1/bk-2022-n-x2.py "
        "(rotations, angles dessinés)",
    ],
    "suites-numeriques": [
        "animations/scenes/maths/suites-numeriques/bk-2020-n-x1.py "
        "(droite graduée, barrières, entassement)",
        "animations/scenes/maths/suites-numeriques/bk-2021-n-x2.py "
        "(suite auxiliaire, sauts ×q, gendarmes)",
    ],
    "limites-continuite": [
        "animations/scenes/maths/limites-continuite/bk-2020-n-x3.py "
        "(Axes, asymptote au bon moment, aires)",
        "animations/scenes/maths/limites-continuite/bk-2021-n-x1.py "
        "(TVI, trou comblable)",
    ],
    "_defaut": [
        "animations/scenes/maths/limites-continuite/bk-2020-n-x3.py "
        "(courbes sur Axes — le gabarit le plus complet)",
        "animations/scenes/maths/nombres-complexes-1/bk-2023-n-x2.py "
        "(structure de chapitres)",
    ],
}

# Pièges à rappeler selon la famille de la notion.
PIEGES = {
    "suites": "récurrence en DEUX temps ; |q|<1 écrit avant q^n→0 ; raison "
              "≠ premier terme ; le sens de variation se PROUVE par un signe",
    "complexes": "le signe de b dans −2(...) ; la racine de Δ quand Δ est "
                 "déjà un carré ; l'ordre des vecteurs dans un quotient",
    "fonction": "forme indéterminée NOMMÉE avant d'être levée ; domaine du "
                "ln vérifié ; (uv)′ en entier ; (u/v)′ ≠ u′/v′ ; croissances "
                "comparées NOMMÉES ; le TVI exige continuité ET signes opposés",
    "integral": "les bornes dans le bon ordre ; le crochet vérifié aux DEUX "
                "bornes ; l'IPP avec le bon choix de u et v",
    "_defaut": "les pièges classiques de la notion, un par étape rouge",
}


def famille(notion: str) -> str:
    for cle in ("suites", "complexes", "integral"):
        if cle in notion:
            return cle
    if "fonction" in notion or "limites" in notion or "equations" in notion:
        return "fonction"
    return "_defaut"


def entrees_du_manifeste() -> list[dict]:
    texte = MANIFESTE.read_text(encoding="utf-8")
    entrees, courant = [], {}
    for ligne in texte.splitlines():
        m = re.match(r"\s*-\s*bank:\s*(\S+)", ligne)
        if m:
            if courant:
                entrees.append(courant)
            courant = {"bank": m.group(1)}
            continue
        for cle in ("entry", "scene_file", "scene_class", "statut"):
            m = re.match(rf"\s*{cle}:\s*(\S+)", ligne)
            if m and courant is not None:
                courant[cle] = m.group(1)
    if courant:
        entrees.append(courant)
    return entrees


def lignes_de_l_entree(banque: Path, ident: str) -> tuple[int, int]:
    lignes = banque.read_text(encoding="utf-8").splitlines()
    debut = None
    for i, ligne in enumerate(lignes, 1):
        if re.match(rf"\s*-\s+id:\s*{re.escape(ident)}\s*$", ligne):
            debut = i
            break
    if debut is None:
        return (0, 0)
    # L'indentation discrimine : une banque contient aussi des `- id:`
    # IMBRIQUÉS (les questions), plus profonds. Sans ce test, la plage
    # s'arrêtait à la première question — tous les bons pointaient vers
    # un extrait tronqué de l'énoncé.
    creux = len(lignes[debut - 1]) - len(lignes[debut - 1].lstrip())
    for j in range(debut, len(lignes)):
        l = lignes[j]
        if re.match(r"\s*-\s+id:", l) and (len(l) - len(l.lstrip())) <= creux:
            return (debut, j)
    return (debut, len(lignes))


def bareme(banque: Path, ident: str) -> str:
    d, f = lignes_de_l_entree(banque, ident)
    if not d:
        return "?"
    bloc = "\n".join(banque.read_text(encoding="utf-8").splitlines()[d - 1:f])
    m = re.search(r"bareme_total:\s*([\d.,]+)", bloc)
    return m.group(1) if m else "?"


def redige(e: dict) -> str:
    banque = RACINE / e["bank"]
    ident = e["entry"]
    scene = e["scene_file"]
    notion = Path(e["bank"]).parent.name
    matiere = Path(e["bank"]).parent.parent.name
    d, f = lignes_de_l_entree(banque, ident)
    cle_mod = next((k for k in MODELES if k != "_defaut" and k in notion), "_defaut")
    modeles = MODELES[cle_mod]
    pieges = PIEGES[famille(notion)]
    media = f"media/{matiere}-{notion}"
    chemin = f"animations/{scene}"

    return f"""# BT — {ident} · {notion}

**Statut : à faire.** Un seul agent, un seul bon, un seul fichier de scène.

## Avant toute chose
Lis **`docs/ops/SCENE-CONTRACT.md` en entier**. Il est la loi : toutes
les règles de fabrication, de mise en écran et de procédure y sont. Ce
bon n'ajoute que ce qui est propre à cet exercice.

## La tâche
Écrire `class Explication(BacScene)` dans **`{chemin}`**,
pour l'entrée **`{ident}`** de **`{e['bank']}`**
(**lignes {d} à {f}**, barème {bareme(banque, ident)} points).

La banque est la source de vérité : chaque nombre, chaque formule,
chaque question, chiffre pour chiffre. **Si elle semble incohérente,
ARRÊTE-toi et écris-le dans le bloc RÉSULTAT — ne la corrige jamais.**

## Modèles à imiter
{chr(10).join('- `' + m + '`' for m in modeles)}

## Pièges à traiter (une étape rouge chacun)
{pieges}

## Rappels qui coûtent cher quand on les oublie
- **`ardoise()` ne nettoie pas** : tout chapitre dont le suivant
  l'appelle doit finir par `self.nettoie()`.
- **Un `FadeOut(groupe)` n'efface que ce que le groupe contient à cet
  instant** : range chaque mobject de figure sous sa propre clé et
  reconstruis le groupe au moment du fondu.
- **Chaque `Axes` porte des graduations numériques** (≈6 par axe,
  taille ~18, côté libre).
- Écriture **incrémentale** : ~120 lignes par appel, jamais le fichier
  d'un coup.
- `np.trapezoid`, jamais `np.trapz`.

## Les six portes — colle la SORTIE RÉELLE de chacune

```bash
# 0 — le module se charge (assertions comprises)
python -c "import importlib.util,sys; sys.path.insert(0,'animations'); \\
  spec=importlib.util.spec_from_file_location('s','{chemin}'); \\
  m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); print('OK')"

# 1 — lint de scène
python scripts/scene-lint.py {chemin}

# 2 — rendu brouillon (nb de sections == nb d'étapes)
cd animations && manim render {scene} Explication -ql \\
  --media_dir {media} --save_sections && cd ..
ls animations/{media}/videos/{ident}/480p15/sections/*.mp4 | wc -l

# 3 — AUDIT : dernière image de chaque section → planches 2×2 → LES LIRE
#     (protocole complet au §4 du contrat ; image au MILIEU de la
#      section pour les gestes transitoires)

# 4 — fidélité à la banque
python scripts/bank-fidelity.py {e['bank']} {ident} {chemin}

# 5 — rendu final, puis statut
cd animations && manim render {scene} Explication -qm \\
  --media_dir {media} --save_sections && cd ..
#     puis passer cette entrée à `statut: validé` dans animations/manifest.yaml
#     avec une note d'audit d'une ligne, et committer.
```

---

## RÉSULTAT — à remplir par l'agent

- **Étapes écrites** : …
- **Porte 0** : `<coller la sortie>`
- **Porte 1** : `<coller la sortie>`
- **Porte 2** : … sections pour … étapes
- **Porte 3 — défauts trouvés puis corrigés** :
  1. …
  *(aucun défaut sur une longue scène est suspect : sur 16 scènes
  auditées, deux seulement étaient propres du premier coup)*
- **Porte 4** : `<coller la sortie>`
- **Porte 5** : rendu final … sections, durée …
- **`git diff --stat`** (doit ne toucher que la scène + le manifeste) :
  `<coller>`
- **Incohérences de banque relevées** (le cas échéant) : …
"""


def journal(entrees: list[dict]) -> str:
    lignes = [
        "# Journal des bons de travail",
        "",
        "Une ligne par bon. **Append-only.** C'est ce que l'orchestrateur",
        "lit pour savoir où on en est sans ouvrir trente-cinq fichiers.",
        "",
        "| Bon | Scène | Statut manifeste | Agent | Date | Notes |",
        "|---|---|---|---|---|---|",
    ]
    for e in entrees:
        if e.get("statut") == "a-produire":
            notion = Path(e["bank"]).parent.name
            lignes.append(
                f"| `BT-{notion}-{e['entry']}.md` | `{notion}/{e['entry']}` "
                "| à produire | | | |"
            )
    lignes += [
        "",
        "## Comment le remplir",
        "",
        "À la fin d'un bon : ajouter le nom de l'agent, la date, et une note",
        "d'une ligne (nombre d'étapes, défauts trouvés à l'audit). Passer le",
        "statut à `validé` seulement si les six portes sont franchies et",
        "collées dans le bon.",
    ]
    return "\n".join(lignes) + "\n"


def main() -> int:
    entrees = entrees_du_manifeste()
    BONS.mkdir(exist_ok=True)
    (BONS / "LEDGER.md").write_text(journal(entrees), encoding="utf-8")

    if "--ledger" in sys.argv:
        print("journal régénéré.")
        return 0

    cible = next((a for a in sys.argv[1:] if not a.startswith("-")), None)
    ecrits = 0
    for e in entrees:
        if not all(k in e for k in ("bank", "entry", "scene_file")):
            continue
        if cible and e["entry"] != cible:
            continue
        if not cible and e.get("statut") != "a-produire":
            continue
        # Le nom porte la NOTION : `bk-2019-n-x2` existe en
        # nombres-complexes-1 ET en -2 (la même collision qui avait
        # pollué les sorties de rendu).
        notion = Path(e["bank"]).parent.name
        chemin = BONS / f"BT-{notion}-{e['entry']}.md"
        chemin.write_text(redige(e), encoding="utf-8")
        ecrits += 1
    print(f"{ecrits} bon(s) écrit(s) dans {BONS.relative_to(RACINE)}/")
    print("journal : work-orders/LEDGER.md")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
