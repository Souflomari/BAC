# Banque de sujets — Examens nationaux Physique-Chimie (2ème Bac, filière Sciences Physiques / SPC)

> **Inventaire honnête des sources réellement atteignables** à travers le
> proxy de cet environnement, pour la campagne « sujets de bac PC » qui doit
> alimenter les 25 sommets de leçon sous `content/pc/`.
> Épreuve visée : **Physique-Chimie, 2ème année Bac, Sciences Expérimentales,
> maslak *مسلك العلوم الفيزيائية* (Sciences Physiques, SPC), خيار فرنسية (BIOF) —
> durée 3 h, coefficient 7** (confirmé sur les en-têtes de scans 2018 et 2019).
>
> Statut : **v0.1, foundation pass.** Deux examens intégralement lus et
> transcrits (2018 N, 2019 N) ; le reste de l'inventaire est cartographié et
> vérifié atteignable au niveau du hub. Rien ici n'est « vérifié » au sens du
> protocole (README §Vérification) tant qu'un second agent n'a pas re-fetché et
> diffé.

---

## 1. Contrainte d'environnement — À LIRE EN PREMIER

Deux faits déterminent toute la stratégie de sourcing :

1. **Tous les sujets d'examen national marocains atteignables sont des SCANS**
   (images), pas du texte machine. Testé directement : AlloSchool
   (PDF 2019, 2023, 2024 = « PURE SCAN, NO TEXT » à l'extraction), dyrassa
   (pages `.jpg`), chtoukaphysique (PDF compilé = scan). Les sites qui rendent
   des exercices en **texte HTML/MathJax** (classein.com) **ne portent aucune
   provenance d'examen national** (pas d'année/session) → inutilisables pour une
   banque d'annales à provenance exigée.

2. **Cet environnement n'a ni `poppler-utils` ni OCR** : l'outil `Read` ne peut
   pas *rendre* une page PDF (échec `pdftoppm is not installed`), et `WebFetch`
   ne sait pas lire une image. **Une extraction de texte directe des scans est
   donc impossible.**

### Le pipeline qui fonctionne (et par lequel les transcriptions ont été faites)

AlloSchool sert **chaque page de scan comme un JPG individuel**. Le chemin fiable
est le dossier d'images, pas le PDF :

```
https://www.alloschool.com/assets/documents/course-422/upload-<ID>/0001-big.jpg
                                                        upload-<ID>/0002-big.jpg  ...
```

Pipeline reproductible (utilisé pour 2018 N et 2019 N) :
1. `WebFetch` de la page `element/<n>` → récupérer `upload-<ID>` et le nombre de pages.
2. `WebFetch` de chaque `...-big.jpg` → le binaire est **sauvegardé localement**
   par l'outil (`Binary content (image/jpeg) also saved to <chemin>`).
3. `Read <chemin-local-du-jpg>` → l'outil **rend l'image** ; un lecteur
   multimodal (Opus) la lit visuellement et transcrit.

Les scans AlloSchool testés sont **nets et parfaitement lisibles** à cette
résolution (`-big.jpg`, ~300–400 Ko/page). Là où un scan serait illisible, la
règle de campagne s'applique : marquer `illisible — écarté`, ne rien inventer.

> Conséquence pour l'INDEX : la colonne « format » indique **scanned-PDF**
> partout pour les nationaux, mais avec la mention **[lisible via pipeline JPG]**
> quand le dossier d'images a été confirmé atteignable.

---

## 2. Source primaire : AlloSchool — hub « Examens Nationaux (SPC) »

**Hub :** https://www.alloschool.com/section/4585 (host : `alloschool.com`)
Couverture complète **2008 → 2025**, sessions **normale + rattrapage**, sujets et
(à partir de 2016) corrigés. Watermark « Moutamadris.ma » visible sur certains
scans (2018) — sans incidence : la provenance citée est l'URL AlloSchool.

Chaque entrée ci-dessous = page `https://www.alloschool.com/element/<ID>`.
Format de toutes : **scanned-PDF + JPG par page** (aucun texte machine).

| Année | N-Sujet | N-Corrigé | R-Sujet | R-Corrigé | Vérif. directe |
|------:|:-------:|:---------:|:-------:|:---------:|----------------|
| 2017 | `57711` | `57714` | `57717` | `57720` | listé (non ré-ouvert) |
| 2018 | `57726` | `57729` | `57732` | `57735` | **N-Sujet lu p.1,3–6** (upload-45118, 8 p.) |
| 2019 | `68300` | `68303` | `94419` | `94422` | **N-Sujet lu p.1–7** (upload-54757, 7 p.) |
| 2020 | `109742` | `109745` | `109751` | `109757` | listé (non ré-ouvert) |
| 2021 | `127287` | `136826` | `127290` | `136829` | **N-Sujet couverture lue** (upload-84195, 8 p.) |
| 2022 | `136621` | `136832` | `136624` | `136835` | listé (non ré-ouvert) |
| 2023 | `142476` | `142479` | `142484` | `142487` | N-Sujet PDF testé = scan |
| 2024 | `145763` | `145766` | `145769` | `145772` | N-Sujet PDF testé = scan |
| 2025 | `145796` | — | `145799` | — | listé ; **corrigés non publiés** |

Notes :
- **2025** : sujets normale + rattrapage présents ; **corrigés pas encore
  publiés** au moment du sourcing (2026-07). À re-vérifier.
- Le PDF direct existe aussi (ex. 2019 :
  `assets/documents/course-423/examen-national-physique-chimie-spc-2019-normale-sujet-2.pdf`,
  955 Ko, scan) mais le **dossier `upload-<ID>/*-big.jpg` est la voie fiable**
  pour la transcription. Attention : le n° de `course-` du PDF (423) diffère
  parfois de celui des images (422) — se fier au chemin `element/<n>` pour
  résoudre l'`upload-<ID>`.
- **Piège de fidélité constaté** : les *résumés* que `WebFetch` renvoie sur une
  page `element/` peuvent **se tromper de filière** (le résumé de `57726` a
  annoncé « Sciences Mathématiques B », alors que l'en-tête du scan lu dit
  clairement *مسلك العلوم الفيزيائية* = Sciences Physiques). **L'en-tête du scan
  fait foi**, jamais le résumé du fetcher.

### `upload-<ID>` déjà résolus (bases d'images vérifiées)

| Examen | Base d'images | Pages |
|--------|---------------|------:|
| 2018 Normale — Sujet | `.../course-422/upload-45118/` | 8 |
| 2019 Normale — Sujet | `.../course-422/upload-54757/` | 7 |
| 2021 Normale — Sujet | `.../course-422/upload-84195/` | 8 |

---

## 3. Autres hôtes sondés (statut de reachability + format)

| Hôte | Atteignable ? | Format des nationaux | Verdict |
|------|---------------|----------------------|---------|
| `alloschool.com` | **oui** | scanned-PDF + JPG/page | **source primaire retenue** |
| `dyrassa.com` | oui | pages `.jpg` scannées (2016–2021) | miroir de scans ; secours possible |
| `chtoukaphysique.com` | oui | PDF compilés = scans | secours ; pas de texte |
| `bestcours.ma` | oui | liens Google Drive (PDF) | corrigés récents ; Drive souvent hors d'atteinte |
| `adrarphysic.fr` | oui | liens Google Drive / séries prof | pas d'annales officielles en lien direct |
| `schoolfibers.com` | oui | liens Google Drive (PDF) | idem |
| `classein.com` | oui | **texte HTML + MathJax** | lisible **mais sans provenance nationale** → inutilisable ici |
| `scola.ma` | **non** (403) | — | bloqué (Cloudflare / policy) |
| `profelhamdaoui.com` | **non** (403) | — | bloqué |
| `revisio.ma` | **non** (403) | — | bloqué |
| `moutamadris.info` | **non** (DNS ENOTFOUND) | — | domaine mort (voir `moutamadris.ma`) |
| `moutamadris.ma` | oui (landing) | scans `.jpg` derrière pages catégories | non déroulé en détail |
| GitHub (MCP + recherche) | oui | — | **aucun dataset d'annales marocaines PC** trouvé |
| `al3abkari-pro.com` | oui | Google Drive (PDF) | pas de texte |

Sites **français** (labolycee.org, sujetdebac.fr, annabac.com, groupe-reussite,
pccl.fr) : hors périmètre — ce sont des bacs **français**, pas l'examen national
marocain. Écartés.

---

## 4. Ce qui a été transcrit dans cette passe

Voir les fichiers `docs/sujets/pc/<slug>.md`. Toutes les entrées sont
`Statut: transcrit (non vérifié)`.

| Slug | Entrées | Origine |
|------|--------:|---------|
| `rc-charge` | 2 | 2019 N Ex III (charge) ; 2018 N Ex III-I-2 (décharge, échelon) |
| `rlc-serie` | 2 | 2019 N Ex III-II (oscillations LC) ; 2018 N Ex III-II (RLC pseudopériodique + entretien) |
| `ondes-mecaniques-periodiques` | 1 | 2019 N Ex II-1 (onde sinusoïdale, cuve à ondes) |
| `ondes-mecaniques-progressives` | 1 | 2018 N Ex II (onde ultrasonore, célérité, retard) |
| `decroissance-radioactive` | 1 | 2019 N Ex II-2 (radon 222 ; recoupe `noyaux-masse-energie`) |

---

## 5. Topics les plus durs à sourcer (retour de terrain)

- **Aucun topic n'est « facile » au sens texte-machine** : tout passe par le
  pipeline JPG→Read. C'est faisable mais coûteux (1 fetch + 1 read par page).
- **`rotation-axe-fixe`** : rare dans l'épreuve PC-SPC récente ; peu d'exercices
  d'examen national dédiés. À chercher surtout dans les années 2010–2016.
- **`ondes-em-modulation`** (modulation d'amplitude) : présent (ex. 2021 N Ex IV
  « Modulation d'amplitude d'un signal ») mais souvent en sous-partie d'un
  exercice d'électricité, jamais isolé — attention au découpage.
- **`atome-mecanique-newton`** (quantification, niveaux d'énergie) : apparaît par
  intermittence ; à pister par mots-clés « niveaux d'énergie », « transition ».
- **Distinguer `ondes-mecaniques-progressives` vs `-periodiques`** : beaucoup
  d'exercices mêlent célérité/retard (progressives) ET longueur d'onde/fréquence
  (périodiques). Règle de classement adoptée : onde **sinusoïdale/périodique avec
  λ et N** → `-periodiques` ; **impulsion/retard/célérité sans périodicité
  imposée** → `-progressives`. À arbitrer au cas par cas (voir README).
- **Corrigés** : non transcrits ici (scans aussi). Nécessaires pour les
  solutions/valeurs-réponses ; même pipeline JPG requis.

## 6. Prochaine passe recommandée
1. Dérouler 2020 N, 2021 N (Ex IV : RC + LC + modulation), 2022–2025 pour couvrir
   `propagation-onde-lumineuse`, `ondes-em-modulation`, la chimie
   (`reactions-acido-basiques`, `esterification-hydrolyse`, `piles`,
   `electrolyse`, `suivi-temporel-vitesse`, `etat-equilibre`).
2. Résoudre les `upload-<ID>` manquants (un fetch `element/<n>` chacun).
3. Lancer le protocole de vérification (README) sur les 7 entrées existantes.
