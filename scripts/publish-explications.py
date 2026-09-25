#!/usr/bin/env python3
"""
publish-explications.py — le pont entre les scènes Manim validées et le site.

Ce que fait ce script, dans l'ordre, pour chaque scène `validé` du
manifeste :

  1. RENDU     — `manim render -qm --save_sections` si la sortie manque
                 (un seul rendu à la fois : la course dvisvgm est réelle,
                 cf. DISTRIBUTED-BUILD.md).
  2. AFFICHE   — extrait une image de couverture (poster) à mi-parcours
                 de la première étape de contenu.
  3. TRANSCRIPT— relit le fichier de scène en AST et récupère, étape par
                 étape, les appels `legende(...)` : ce sont déjà les
                 phrases en registre oral écrites par l'auteur. C'est le
                 transcript exigé par l'ADR 0028 (repli
                 `prefers-reduced-motion`), obtenu sans réécrire une
                 seule scène.
  4. TÉLÉVERSE — pousse la vidéo complète, les clips d'étape et le poster
                 dans le bucket Supabase Storage `explications`.
  5. INDEXE    — écrit `animations/published.json`, le SEUL registre de
                 ce qui est réellement en ligne.

**L'index est la garde d'état honnête.** Le site ne lit jamais le
manifeste : il lit `published.json`. Une scène validée mais non
téléversée n'a pas de lecteur sur le site — pas de lecteur cassé, pas de
placeholder. C'est la même discipline que le reste du produit.

## Sécurité — lire avant de lancer

Le mode par défaut est **--dry-run** : rien n'est téléversé, rien n'est
écrit. Le téléversement exige `--confirm` ET les deux variables
d'environnement. C'est délibéré : le bucket vit dans le projet Supabase
de production, et **toute poussée en production est sous porte humaine,
toujours** (CLAUDE.md, non négociable). Ce script ne franchit pas cette
porte tout seul ; il la prépare.

Le bucket lui-même est créé par la migration
`backend/supabase/migrations/051_explications_storage_bucket.sql`, qui
suit la même porte humaine.

## Usage

    # ce qui serait fait, sans rien faire (défaut)
    python3 scripts/publish-explications.py

    # une seule scène, rendu local seulement, pas de réseau
    python3 scripts/publish-explications.py --only bk-2024-n-x2 --render-only

    # le vrai téléversement (porte humaine — session supervisée)
    export SUPABASE_URL=https://<ref>.supabase.co
    export SUPABASE_SERVICE_ROLE_KEY=<clé>
    python3 scripts/publish-explications.py --confirm

`SUPABASE_SERVICE_ROLE_KEY` ne sert QU'ICI, en local, pour écrire dans le
bucket. Elle n'atteint jamais Vercel : le site lit un bucket public avec
la seule URL publique. (CLAUDE.md : service_role n'atteint jamais Vercel.)
"""

from __future__ import annotations

import argparse
import ast
import json
import mimetypes
import os
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

RACINE = Path(__file__).resolve().parents[1]
ANIMATIONS = RACINE / "animations"
MANIFESTE = ANIMATIONS / "manifest.yaml"
INDEX = ANIMATIONS / "published.json"
PUBLIC_DIR = RACINE / "web" / "public" / "explications"
BUCKET = "explications"
QUALITE_DEFAUT = "720p30"  # le rendu final de l'ADR 0028
# qualité → drapeau manim. 720p30 est la qualité de publication ; 480p15
# sert à valider vite la chaîne sans attendre un rendu complet.
DRAPEAU = {"480p15": "-ql", "720p30": "-qm", "1080p60": "-qh"}


# ─────────────────────────── le manifeste ───────────────────────────


def charge_manifeste() -> list[dict]:
    """Les entrées `validé` du manifeste, dans l'ordre du fichier.

    On importe yaml paresseusement : le mode --render-only doit pouvoir
    tourner dans le venv manim, qui n'a pas forcément pyyaml.
    """
    import yaml  # noqa: PLC0415

    data = yaml.safe_load(MANIFESTE.read_text(encoding="utf-8"))
    scenes = []
    for s in data.get("scenes", []):
        statut = str(s.get("statut", ""))
        # `validé` ET le pilote v4 fondateur (statut distinct, déjà
        # approuvé par l'owner — il a droit de cité comme les autres).
        if not (statut.startswith("valid") or "pilote" in statut):
            continue
        bank = s.get("bank", "")
        m = re.match(r"content/(.+)/bank\.yaml$", bank)
        if not m:
            continue
        scenes.append(
            {
                "notion": m.group(1),  # ex. "maths/geometrie-espace"
                "entry": s["entry"],
                "scene_file": ANIMATIONS / s["scene_file"],
            }
        )
    return scenes


# ──────────────────── transcript : AST de la scène ────────────────────


def _dictionnaires_module(arbre: ast.Module) -> dict[str, dict[str, str]]:
    """Les dicts de chaînes déclarés au niveau module (`NARRATION = {...}`).

    23 scènes portent un dict `NARRATION` — la prose de narration complète
    exigée par l'ADR 0028, bien plus riche que la légende affichée. Sans
    ceci, `self.legende(NARRATION["q1a"])` ne résout rien et le transcript
    de ces scènes serait vide.
    """
    tables: dict[str, dict[str, str]] = {}
    for node in arbre.body:
        if not isinstance(node, ast.Assign) or not isinstance(node.value, ast.Dict):
            continue
        for cible in node.targets:
            if not isinstance(cible, ast.Name):
                continue
            table = {}
            for k, v in zip(node.value.keys, node.value.values):
                if (isinstance(k, ast.Constant) and isinstance(k.value, str)
                        and isinstance(v, ast.Constant) and isinstance(v.value, str)):
                    table[k.value] = v.value
            if table:
                tables[cible.id] = table
    return tables


def _texte_litteral(node: ast.AST, tables: dict[str, dict[str, str]] | None = None) -> str | None:
    """La valeur d'une chaîne : littéral direct, ou `TABLE["clé"]` résolu.

    Tout le reste (f-string, variable locale, concaténation) reste None :
    on préfère un transcript incomplet à un transcript inventé.
    """
    if isinstance(node, ast.Constant) and isinstance(node.value, str):
        return node.value
    if tables and isinstance(node, ast.Subscript) and isinstance(node.value, ast.Name):
        cle = node.slice
        if isinstance(cle, ast.Constant) and isinstance(cle.value, str):
            return tables.get(node.value.id, {}).get(cle.value)
    return None


def extrait_etapes(scene_file: Path) -> list[dict]:
    """Étapes de la scène, dans l'ordre, avec leurs légendes.

    Retourne [{"n": 1, "slug": "01-titre", "captions": [...]}, ...].

    On marche l'AST plutôt que le texte : une regex se ferait piéger par
    les légendes multi-lignes, les appels imbriqués et les renvois au dict
    `NARRATION`. `legende()` accepte plusieurs lignes (`*lignes`) — on les
    recolle par un espace, ce qui donne une phrase lisible.
    """
    arbre = ast.parse(scene_file.read_text(encoding="utf-8"), filename=str(scene_file))
    tables = _dictionnaires_module(arbre)
    evenements: list[tuple[tuple[int, int], str, object]] = []

    for node in ast.walk(arbre):
        pos = (getattr(node, "lineno", 0), getattr(node, "col_offset", 0))

        # (a) `self.etape("slug")` — ouvre une étape.
        if (isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                and isinstance(node.func.value, ast.Name) and node.func.value.id == "self"):
            if node.func.attr == "etape":
                evenements.append((pos, "etape", node.args[0] if node.args else None))
                continue
            # (b) `self.legende("…")` — les arguments littéraux. Les
            # arguments qui renvoient au dict de narration sont captés
            # par (c) : les deux sources sont disjointes par construction
            # (un littéral n'est pas un Subscript), donc pas de doublon.
            if node.func.attr == "legende":
                for a in node.args:
                    if isinstance(a, ast.Constant) and isinstance(a.value, str):
                        evenements.append(((a.lineno, a.col_offset), "caption", a))
                continue

        # (c) toute référence `NARRATION["clé"]`, où qu'elle soit. Ces
        # scènes-là n'appellent pas `legende()` : elles construisent le
        # Text() de narration à la main. Le dict n'existe que pour porter
        # la narration, donc y renvoyer EST une narration.
        if isinstance(node, ast.Subscript) and isinstance(node.value, ast.Name):
            if node.value.id in tables and _texte_litteral(node, tables):
                evenements.append((pos, "caption", node))

    # ast.walk ne suit pas l'ordre du source : on trie par position.
    evenements.sort(key=lambda e: e[0])

    resultat: list[dict] = []
    for _pos, genre, node in evenements:
        if genre == "etape":
            slug = _texte_litteral(node, tables) if node is not None else None
            resultat.append({"n": len(resultat) + 1, "slug": slug or f"etape-{len(resultat) + 1}", "captions": []})
        else:
            if not resultat:
                continue  # une légende avant toute étape : hors périmètre
            texte = _texte_litteral(node, tables)
            # Une même clé de narration peut être référencée deux fois
            # dans l'étape (construction puis repositionnement) : on ne
            # la compte qu'une fois.
            if texte and texte not in resultat[-1]["captions"]:
                resultat[-1]["captions"].append(texte)

    return resultat


def libelle(etape: dict) -> str:
    """Le libellé humain d'une étape : sa première légende parlée.

    Repli : le slug déprefixé et rendu lisible. Les auteurs préfixent le
    slug du numéro d'étape (`03-q1-equation-plan`) — on le retire pour ne
    pas afficher « 03 03 Q1 Equation Plan ».
    """
    if etape["captions"]:
        return etape["captions"][0]
    slug = re.sub(r"^\d+-", "", etape["slug"])
    return slug.replace("-", " ").capitalize()


# ─────────────────────────── rendu + poster ───────────────────────────


def dossier_media(notion: str) -> Path:
    """`media/<matière>-<notion>/` — l'isolement par notion.

    Manim indexe ses sorties par nom de fichier ; deux notions peuvent
    porter la même entrée (`bk-2019-n-x2` existe en nc-1 ET nc-2), d'où
    un media_dir par notion. Leçon acquise à la dure.
    """
    return ANIMATIONS / "media" / notion.replace("/", "-")


def rend_si_absent(scene: dict, qualite: str, *, force: bool = False) -> Path | None:
    """Rend la scène si la sortie manque. Retourne le dossier de sortie."""
    media = dossier_media(scene["notion"])
    sortie = media / "videos" / scene["entry"] / qualite
    if sortie.exists() and (sortie / "Explication.mp4").exists() and not force:
        print(f"    rendu déjà présent ({qualite})")
        return sortie

    if not scene["scene_file"].exists():
        print(f"    !! fichier de scène absent : {scene['scene_file']}")
        return None

    if not shutil.which("manim"):
        print("    !! `manim` introuvable sur le PATH — active le venv "
              "(source /root/manim-venv/bin/activate) avant de rendre")
        return None

    rel = scene["scene_file"].relative_to(ANIMATIONS)
    cmd = [
        "manim", "render", DRAPEAU[qualite],
        "--media_dir", str(media.relative_to(ANIMATIONS)),
        str(rel), "Explication", "--save_sections",
    ]
    print(f"    rendu : {' '.join(cmd)}")
    # Un seul rendu à la fois — la course dvisvgm sur les SVG temporaires
    # partagés fait planter les rendus concurrents. Documenté, reproduit
    # deux fois. D'où l'appel bloquant.
    res = subprocess.run(cmd, cwd=ANIMATIONS, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"    !! échec du rendu (code {res.returncode})")
        print("    " + "\n    ".join(res.stdout.strip().splitlines()[-12:]))
        return None
    return sortie if sortie.exists() else None


def duree(fichier: Path) -> float | None:
    res = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "default=noprint_wrappers=1:nokey=1", str(fichier)],
        capture_output=True, text=True,
    )
    try:
        return round(float(res.stdout.strip()), 2)
    except ValueError:
        return None


def fabrique_poster(sections: list[Path], destination: Path) -> Path | None:
    """Image de couverture : mi-parcours de la 2e section (la 1re est le titre).

    Le titre est une carte quasi vide ; la section suivante montre déjà de
    la matière — bien meilleure vignette.
    """
    if not sections:
        return None
    source = sections[1] if len(sections) > 1 else sections[0]
    # (appelé avec une liste d'un seul clip → c'est ce clip, à son milieu)
    d = duree(source) or 2.0
    res = subprocess.run(
        ["ffmpeg", "-y", "-ss", str(d / 2), "-i", str(source),
         "-frames:v", "1", "-update", "1", "-q:v", "3", str(destination)],
        capture_output=True, text=True,
    )
    return destination if res.returncode == 0 and destination.exists() else None


# ──────────────────────── Supabase Storage ────────────────────────


def televerse(local: Path, chemin_distant: str, *, base: str, cle: str) -> bool:
    """PUT dans le bucket (upsert). Stdlib seulement — aucune dépendance.

    On utilise `x-upsert: true` pour que republier une scène corrigée
    remplace l'objet au lieu d'échouer en 409 : un correctif de scène doit
    pouvoir repasser sans purge manuelle.
    """
    url = f"{base}/storage/v1/object/{BUCKET}/{chemin_distant}"
    donnees = local.read_bytes()
    ctype = mimetypes.guess_type(local.name)[0] or "application/octet-stream"
    req = urllib.request.Request(url, data=donnees, method="PUT")
    req.add_header("Authorization", f"Bearer {cle}")
    req.add_header("Content-Type", ctype)
    req.add_header("x-upsert", "true")
    req.add_header("Cache-Control", "public, max-age=31536000, immutable")
    try:
        with urllib.request.urlopen(req) as r:
            return 200 <= r.status < 300
    except urllib.error.HTTPError as e:
        print(f"    !! {chemin_distant} : HTTP {e.code} {e.read()[:200]!r}")
        return False
    except urllib.error.URLError as e:
        print(f"    !! {chemin_distant} : {e.reason}")
        return False


def depose_local(local: Path, chemin_relatif: str) -> bool:
    """Copie le fichier sous `web/public/explications/` (mode « public »).

    Vercel sert ce dossier tel quel : aucune infrastructure, aucune clé,
    visible dès le déploiement de la branche. Réservé au PILOTE — les 54
    scènes pèseraient ~1 Go, ce que ni git ni le bundle ne doivent porter
    (c'est le raisonnement de l'ADR 0029).
    """
    cible = PUBLIC_DIR / chemin_relatif
    cible.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(local, cible)
    return True


# ────────────────────────────── pipeline ──────────────────────────────


def traite(scene: dict, args, creds) -> dict | None:
    notion, entry = scene["notion"], scene["entry"]
    print(f"\n── {notion} :: {entry}")

    etapes_src = extrait_etapes(scene["scene_file"]) if scene["scene_file"].exists() else []
    if not etapes_src:
        print("    !! aucune étape extraite du fichier de scène — ignorée")
        return None
    print(f"    {len(etapes_src)} étapes, {sum(len(e['captions']) for e in etapes_src)} légendes")

    # Un dry-run CONSTATE, il n'exécute pas : rendre prendrait plusieurs
    # minutes par scène, ce qu'un mode « montre-moi ce que tu ferais » ne
    # doit jamais déclencher. Le rendu n'a lieu que si on publie vraiment
    # (--confirm) ou si on le demande explicitement (--render-only).
    media = dossier_media(scene["notion"])
    sortie = media / "videos" / scene["entry"] / args.quality
    if not (args.confirm or args.render_only):
        etat = "rendu présent" if (sortie / "Explication.mp4").exists() else "À RENDRE"
        print(f"    [dry-run] {args.quality} : {etat}")
        return None

    sortie = rend_si_absent(scene, args.quality, force=args.force_render)
    if sortie is None:
        return None

    clips = sorted((sortie / "sections").glob("Explication_*.mp4"))
    complet = sortie / "Explication.mp4"
    if not clips or not complet.exists():
        print("    !! sortie de rendu incomplète — ignorée")
        return None

    # Le nombre de clips doit égaler le nombre d'étapes : sinon l'index
    # mentirait sur le pas-à-pas. On refuse plutôt que de publier un
    # découpage approximatif.
    if len(clips) != len(etapes_src):
        print(f"    !! {len(clips)} clips pour {len(etapes_src)} étapes — désaccord, ignorée")
        return None

    poster_local = sortie / "poster.jpg"
    if not poster_local.exists():
        fabrique_poster(clips, poster_local)

    prefixe = f"{notion}/{entry}"
    etapes_pub, a_pousser = [], []

    for i, (clip, src) in enumerate(zip(clips, etapes_src), start=1):
        distant = f"{prefixe}/steps/{clip.name}"
        # Une affiche PAR étape. Une affiche globale montrerait l'image
        # d'une autre étape que celle annoncée par le transport, et
        # compter sur preload="metadata" pour peindre la première image
        # n'est pas fiable d'un navigateur à l'autre : on fabrique donc
        # l'image, elle est juste partout. ~40 Ko par étape.
        aff_local = clip.with_suffix(".jpg")
        if not aff_local.exists():
            fabrique_poster([clip], aff_local)
        aff_distant = None
        if aff_local.exists():
            aff_distant = f"{prefixe}/steps/{aff_local.name}"
            a_pousser.append((aff_local, aff_distant))

        etapes_pub.append({
            "n": i,
            "slug": src["slug"],
            "label": libelle(src),
            "captions": src["captions"],
            "path": distant,
            "poster": aff_distant,
            "durationS": duree(clip),
        })
        a_pousser.append((clip, distant))

    a_pousser.append((complet, f"{prefixe}/full.mp4"))
    if poster_local.exists():
        a_pousser.append((poster_local, f"{prefixe}/poster.jpg"))

    if args.render_only:
        print(f"    rendu seul — {len(a_pousser)} fichiers prêts, non téléversés")
        return None

    verbe = "copierait" if args.storage == "public" else "téléverserait"
    if not args.confirm:
        print(f"    [dry-run] {verbe} {len(a_pousser)} fichiers sous {prefixe}/")
        octets = sum(f.stat().st_size for f, _ in a_pousser)
        print(f"    [dry-run] {octets / 1e6:.1f} Mo")
        return None

    for local, distant in a_pousser:
        ok = (depose_local(local, distant) if args.storage == "public"
              else televerse(local, distant, base=creds[0], cle=creds[1]))
        if not ok:
            print("    !! publication interrompue — entrée NON indexée")
            return None
    print(f"    ✓ {len(a_pousser)} fichiers publiés ({args.storage})")

    return {
        "notion": notion,
        "entry": entry,
        "quality": args.quality,
        "poster": f"{prefixe}/poster.jpg" if poster_local.exists() else None,
        "full": {"path": f"{prefixe}/full.mp4", "durationS": duree(complet)},
        "steps": etapes_pub,
    }


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--confirm", action="store_true",
                   help="téléverse réellement et réécrit published.json (défaut : dry-run)")
    p.add_argument("--render-only", action="store_true",
                   help="rend localement, ne touche pas au réseau")
    p.add_argument("--force-render", action="store_true", help="re-rend même si la sortie existe")
    p.add_argument("--only", metavar="CIBLE",
                   help="une entrée (`bk-2024-n-x2`) ou, si l'id existe dans "
                        "plusieurs notions, `notion::entrée` "
                        "(ex. `maths/geometrie-espace::bk-2019-n-x1`)")
    p.add_argument("--storage", choices=["public", "supabase"], default="supabase",
                   help="public = actifs statiques web/public/ (pilote, sans infra) ; "
                        "supabase = bucket public (fan-out, porte humaine)")
    p.add_argument("--quality", choices=sorted(DRAPEAU), default=QUALITE_DEFAUT,
                   help=f"qualité de rendu/publication (défaut : {QUALITE_DEFAUT})")
    args = p.parse_args()

    creds = (os.environ.get("SUPABASE_URL", "").rstrip("/"),
             os.environ.get("SUPABASE_SERVICE_ROLE_KEY", ""))

    if args.confirm and args.storage == "supabase" and not args.render_only and not all(creds):
        print("!! --confirm exige SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY", file=sys.stderr)
        return 2

    for outil in ("ffmpeg", "ffprobe"):
        if not shutil.which(outil):
            print(f"!! {outil} introuvable", file=sys.stderr)
            return 2

    scenes = charge_manifeste()
    if args.only:
        if "::" in args.only:
            scenes = [s for s in scenes if f"{s['notion']}::{s['entry']}" == args.only]
        else:
            scenes = [s for s in scenes if s["entry"] == args.only]
            # Le même id d'entrée vit dans plusieurs notions (bk-2019-n-x2
            # existe en nc-1 ET nc-2) : le dire, plutôt que d'en traiter
            # deux en silence.
            if len(scenes) > 1:
                print(f"note : « {args.only} » existe dans {len(scenes)} notions — "
                      f"toutes traitées. Pour n'en viser qu'une : --only notion::entrée")
                for s in scenes:
                    print(f"       {s['notion']}::{s['entry']}")
    if not scenes:
        print("aucune scène à traiter")
        return 1

    mode = "PUBLICATION RÉELLE" if args.confirm else ("RENDU SEUL" if args.render_only else "DRY-RUN")
    print(f"publish-explications — {mode} — stockage={args.storage} — {len(scenes)} scène(s)")

    publies = {}
    for s in scenes:
        r = traite(s, args, creds)
        if r:
            publies[f"{r['notion']}::{r['entry']}"] = r

    if not args.confirm:
        print(f"\n{mode} terminé — published.json inchangé.")
        return 0

    # On FUSIONNE avec l'index existant : publier un lot ne doit pas
    # dépublier ce qui était déjà en ligne.
    ancien = {}
    if INDEX.exists():
        try:
            ancien = json.loads(INDEX.read_text(encoding="utf-8")).get("entries", {})
        except json.JSONDecodeError:
            pass
    ancien.update(publies)

    INDEX.write_text(
        json.dumps({"storage": args.storage, "bucket": BUCKET, "quality": args.quality,
                    "entries": dict(sorted(ancien.items()))},
                   ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"\n✓ {len(publies)} entrée(s) publiée(s) — index : {len(ancien)} au total")
    print(f"  {INDEX.relative_to(RACINE)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
