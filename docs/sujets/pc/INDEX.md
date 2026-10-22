# Banque de sujets — Examens nationaux Physique-Chimie (2ème Bac, filière Sciences Physiques / SPC)

> **Inventaire honnête des sources réellement atteignables** à travers le
> proxy de cet environnement, pour la campagne « sujets de bac PC » qui doit
> alimenter les 25 sommets de leçon sous `content/pc/`.
> Épreuve visée : **Physique-Chimie, 2ème année Bac, Sciences Expérimentales,
> maslak *مسلك العلوم الفيزيائية* (Sciences Physiques, SPC), خيار فرنسية (BIOF) —
> durée 3 h, coefficient 7** (confirmé sur les en-têtes de scans 2018 et 2019).
>
> Statut : **v0.3, passe cross-sujets (2026-07-13).** Voir le bloc v0.3 ci-dessous.
> État antérieur (**v0.2, passe chimie + physique**) : cinq examens normale lus en
> profondeur (2017, 2018, 2019, 2020, 2021 N) et une vingtaine d'exercices
> transcrits couvrant 18 des 25 slugs (voir §4).
>
> **Passe v0.3 — cross-sujets (2026-07-13).** Sept slugs qui manquaient d'une
> annale dédiée vérifiable ont été traités. **Couvertures (page 1) lues via le
> pipeline JPG→Read pour 21 sessions** : normales 2008→2025 (18) + rattrapage
> 2011/2014/2016 (3). **Six entrées dédiées transcrites** (`Statut: transcrit
> (non vérifié)`, à passer au protocole §3) :
> - `controle-catalyse` ← **2025 N** Ex1 P2 (suivi cinétique estérification :
>   facteurs température + catalyseur $\text{H}_2\text{SO}_4$) ;
> - `etat-equilibre` ← **2015 N** Ex1 (acide benzoïque/eau : $\tau=0{,}072$,
>   $Q_{r,\text{éq}}$, $pK_A$) ;
> - `evolution-spontanee` ← **2012 N** Chimie P2 (pile Cu-Zn, $K=5\cdot10^{36}$,
>   sens d'évolution spontané) ;
> - `transformations-lentes-rapides` ← **2010 N** Chimie P1 (saponification,
>   suivi conductimétrique, $t_{1/2}$) ;
> - `transformations-deux-sens` ← **2012 N** Chimie P1 (acide éthanoïque +
>   ammoniac [réaction limitée] + estérification linalol) ;
> - `rotation-axe-fixe` ← **2011 Rattrapage** Mécanique (grue modélisée par une
>   poulie : R.F.D en rotation, moment d'inertie $J_\Delta$) — **seule** annale
>   PC-SPC dédiée trouvée pour ce thème quasi absent de l'épreuve.
>
> **Un slug reste NON SOURCÉ : `atome-mecanique-newton`.** Absent des 21
> couvertures relevées (chapitre conceptuel, sans exercice national autonome sur
> la période). Candidat au ship `unsourced` — voir `atome-mecanique-newton.md`.
>
> **Passe de vérification (2026-07-11) — FAITE.** Un second agent (vérificateur
> adversarial) a **re-fetché indépendamment** les 5 examens (upload-IDs re-dérivés
> depuis les pages `element/`) et **diffé caractère-par-caractère** les 23 entrées
> `transcrit (non vérifié)` contre les scans. **Résultat : 23/23 conformes → toutes
> passées à `Statut: vérifié`.** Aucune divergence de valeur, unité, indice ou
> barème trouvée ; les descriptions de figure (avec leurs « lecture à confirmer »)
> sont fidèles. Détail des upload-IDs confirmés : 2017 = `upload-45103`,
> 2018 = `upload-45118`, 2019 = `upload-54757`, 2020 = `upload-80870`,
> 2021 = `upload-84195` (tous `course-422`, 7–8 pages).

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
| 2017 | `57711` | `57714` | `57717` | `57720` | **N-Sujet lu p.1,5,6** (upload-45103, 8 p.) |
| 2018 | `57726` | `57729` | `57732` | `57735` | **N-Sujet lu p.1,3–8** (upload-45118, 8 p.) |
| 2019 | `68300` | `68303` | `94419` | `94422` | **N-Sujet lu p.1–7** (upload-54757, 7 p.) |
| 2020 | `109742` | `109745` | `109751` | `109757` | **N-Sujet lu p.1–7** (upload-80870, 7 p.) |
| 2021 | `127287` | `136826` | `127290` | `136829` | **N-Sujet lu p.1–5** (upload-84195, 8 p.) |
| 2022 | `136621` | `136832` | `136624` | `136835` | **N-Sujet lu intégralement p.1–8** (upload-84516, 8 p., 2026-08-06) |
| 2023 | `142476` | `142479` | `142484` | `142487` | **N-Sujet lu intégralement p.1–6** (upload-85304, 6 p., 2026-08-06) |
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
| 2008 Normale — Sujet | `.../course-422/upload-45082/` | 6 |
| 2009 Normale — Sujet | `.../course-422/upload-45088/` | 8 |
| 2010 Normale — Sujet | `.../course-422/upload-70311/` | 6 |
| 2011 **Rattrapage** — Sujet | `.../course-422/upload-70317/` | 7 |
| 2012 Normale — Sujet | `.../course-422/upload-70320/` | 6 |
| 2013 Normale — Sujet | `.../course-422/upload-70326/` | 7 |
| 2014 Normale — Sujet | `.../course-422/upload-70333/` | 7 |
| 2014 **Rattrapage** — Sujet | `.../course-422/upload-70336/` | 7 |
| 2015 Normale — Sujet | `.../course-422/upload-70340/` | 7 |
| 2016 Normale — Sujet | `.../course-422/upload-45091/` | 8 |
| 2016 **Rattrapage** — Sujet | `.../course-422/upload-45097/` | 7 |
| 2017 Normale — Sujet | `.../course-422/upload-45103/` | 8 |
| 2018 Normale — Sujet | `.../course-422/upload-45118/` | 8 |
| 2019 Normale — Sujet | `.../course-422/upload-54757/` | 7 |
| 2020 Normale — Sujet | `.../course-422/upload-80870/` | 7 |
| 2021 Normale — Sujet | `.../course-422/upload-84195/` | 8 |
| 2022 Normale — Sujet | `.../course-422/upload-84516/` | 8 |
| 2023 Normale — Sujet | `.../course-422/upload-85304/` | 6 |
| 2024 Normale — Sujet | `.../course-422/upload-87465/` | 6 |
| 2025 Normale — Sujet | `.../course-422/upload-87489/` | 6 |

> Note : les bases d'images sont toutes sous `course-422`, y compris pour les
> **sessions de rattrapage** (résolues via `element/<n>` : 2011 R = `94449`,
> 2014 R = `94469`, 2016 R = `57705`).

**Carte des exercices par examen (relevée sur les couvertures, page 1) :**

- **2017 N** (NS28F) : Ex I = pile Al-Cu + réactions de l'acide butanoïque · Ex II
  = onde mécanique surface de l'eau · Ex III = dipôle RL échelon + modulation
  d'amplitude · Ex IV = mouvement d'un skieur avec frottements + étude
  énergétique d'un pendule de torsion.
- **2018 N** (NS28F) : Ex I = électrolyse du bromure de plomb + réactions de
  l'acide lactique (dosage + estérification) · Ex II = célérité onde ultrasonore ·
  Ex III = capacité d'un condensateur + RLC série · Ex IV = chute verticale bille +
  oscillateur solide-ressort (énergétique).
- **2019 N** (NS28F) : Ex I = électrolyse iodure de zinc + conductimétrie acide
  benzoïque · Ex II = onde mécanique (cuve) + radon 222 · Ex III = charge/décharge
  condensateur (RC + LC) · Ex IV = mouvement du centre d'inertie (plan incliné +
  tremplin/projectile).
- **2020 N** (NS28F) : Ex I = solution d'ammoniac (dosage) + pile argent-chrome ·
  Ex II = propagation des ondes (QCM + cuve) · Ex III = polonium 210
  (masse-énergie + décroissance) · Ex IV = dipôle RL échelon + RLC
  (amortissement/entretien) · Ex V = chute verticale bille (liquide visqueux).
- **2021 N** (NS28F) : Ex I = cinétique saponification + acide carboxylique
  (dosage + identification) · Ex II = ondes lumineuses (dispersion prisme +
  diffraction) · Ex III = plutonium 238 (décroissance) · Ex IV = RC échelon + LC +
  modulation · Ex V = mouvement d'un parachutiste.
- **2023 N** (NS28F, `element/142476` · `upload-85304`, 6 p., 2026-08-06) :
  barème $7+2{,}5+5+5{,}5=20$ recoupé et conforme à la couverture p.1. Ex 1 =
  réactions de l'acide éthanoïque (eau, ion méthanoate, méthanol) · Ex 2 =
  transformations nucléaires du tritium (désintégration $\beta^-$ + fusion
  avec le deutérium) · Ex 3 = dipôle RL échelon + circuit LC + modulation
  d'amplitude · Ex 4 = chute d'une balle (chute libre + frottement, Euler) +
  mouvement d'une balançoire (pendule pesant). Sujet **intégralement lu**
  (les 6 pages) et **intégralement transcrit** en cette passe.
- **2022 N** (NS 28F, `element/136621` · `upload-84516`, 8 p., 2026-08-06) :
  barème $7+3{,}5+4{,}5+5=20$ recoupé et conforme à la couverture p.1
  (en-tête du scan confirmé SPC/BIOF ; le résumé HTML d'AlloSchool annonce à
  tort « Sciences Mathématiques B », README §3). Ex 1 = chromage d'une
  plaque d'acier par électrolyse (P1) + propriétés d'une solution aqueuse
  d'acide propanoïque, dosage inclus (P2) · Ex 2 = propagation des ondes
  sonores dans l'air, mesure de retard (P1) + désintégration de l'iode 131
  (P2) · Ex 3 = réponse d'un dipôle RC à un échelon de tension (1) +
  oscillations libres dans un circuit RLC série (2) · Ex 4 = chute d'une
  bille dans un liquide visqueux, huile de ricin (P1) + mouvement d'un
  satellite artificiel (P2). Sujet **intégralement lu** (les 8 pages) et
  **intégralement transcrit** en cette passe (8 nouvelles entrées).

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

Voir les fichiers `docs/sujets/pc/<slug>.md`. **Toutes les entrées transcrites ont
été vérifiées le 2026-07-11** (re-fetch AlloSchool + diff indépendant) et portent
désormais `Statut: vérifié`.

**Passe fondation (antérieure) :**

| Slug | Entrées | Origine |
|------|--------:|---------|
| `rc-charge` | 2 | 2019 N Ex III (charge) ; 2018 N Ex III-I-2 (décharge, échelon) |
| `rlc-serie` | 2 | 2019 N Ex III-II (oscillations LC) ; 2018 N Ex III-II (RLC pseudopériodique + entretien) |
| `ondes-mecaniques-periodiques` | 1 | 2019 N Ex II-1 (onde sinusoïdale, cuve à ondes) |
| `ondes-mecaniques-progressives` | 1 | 2018 N Ex II (onde ultrasonore, célérité, retard) |
| `decroissance-radioactive` | 1 | 2019 N Ex II-2 (radon 222 ; recoupe `noyaux-masse-energie`) |

**Passe chimie + physique (celle-ci) — nouveaux fichiers/entrées :**

| Slug | Entrées | Origine |
|------|--------:|---------|
| `electrolyse` | 1 | 2019 N Ex I-P1 (électrolyse iodure de zinc) |
| `reactions-acido-basiques` | 3 | 2019 N Ex I-P2 (conductimétrie acide benzoïque) ; 2021 N Ex I-P2 (dosage pH-métrique + identification acide carboxylique) ; 2020 N Ex I-P1 (dosage ammoniac / base faible) |
| `suivi-temporel-vitesse` | 1 | 2021 N Ex I-P1 (cinétique saponification, conductimétrie) |
| `piles` | 1 | 2020 N Ex I-P2 (pile argent-chrome) |
| `dipole-rl` | 1 | 2020 N Ex IV-I (réponse RL à un échelon) |
| `chute-mouvements-plans` | 1 | 2020 N Ex V (chute verticale bille, liquide visqueux, Euler) |
| `propagation-onde-lumineuse` | 1 | 2021 N Ex II (dispersion prisme + diffraction fente/cheveu) |
| `ondes-em-modulation` | 1 | 2017 N Ex III-II (modulation d'amplitude, multiplieur) |
| `lois-de-newton` | 1 | 2019 N Ex IV-I (plan incliné, 2ème loi, force motrice) |
| `noyaux-masse-energie` | 1 | 2020 N Ex III (polonium 210 : énergie libérée, défaut de masse, diagramme) |
| `esterification-hydrolyse` | 1 | 2018 N Ex I-P2 (acide lactique + méthanol, rendement) |
| `systemes-oscillants` | 1 | 2018 N Ex IV-II (oscillateur solide-ressort, énergétique) |
| `decroissance-radioactive` | +1 | 2021 N Ex III (plutonium 238 : demi-vie, activité) |
| `aspects-energetiques` | cross-list | → `systemes-oscillants` (2018 N Ex IV-II, Q Epe + travail rappel) |
| `etat-equilibre` | cross-list | → `reactions-acido-basiques` (K, Qr, τ : 2019/2020/2021) |
| `transformations-lentes-rapides` | cross-list | → `suivi-temporel-vitesse` (2021 N transformation lente) |
| `controle-catalyse` | cross-list | → `esterification-hydrolyse` (2018 N facteurs cinétiques) |
| `evolution-spontanee` | cross-list | → `piles` (2020 N transformation spontanée) |

**Passe 2026-08-06 — comblement des exercices restants de 2018 N / 2019 N**
(harvest ciblé sur les deux `upload-ID` déjà résolus, aucun nouveau
fetch d'`element/` requis pour 2019). Résultat du grep préalable :
**2019 N (upload-54757) était déjà intégralement transcrit** (4 exercices ×
2 parties, barèmes vérifiés par recoupement — aucune nouvelle entrée). Pour
**2018 N (upload-45118)**, trois trous identifiés et comblés :

| Slug | Entrées | Origine |
|------|--------:|---------|
| `electrolyse` | +1 | 2018 N Ex I-Partie I (électrolyse du bromure de plomb, p.2) |
| `reactions-acido-basiques` | +1 | 2018 N Ex I-Partie 2 sous-partie 1 (dosage pH-métrique acide lactique / NaOH, p.2–3) |
| `rc-charge` | +1 | 2018 N Ex III-I-1 (détermination de $C_2$ par générateur de courant, p.4–5) |

Statut de ces 3 entrées : `transcrit (non vérifié)`, à passer au protocole
README §3. Toutes les autres entrées déjà existantes pour ces deux papiers
(Ex II, Ex IV des deux années ; Ex III-I-2/II de 2018 ; Ex I-P2sp2 de 2018)
restent inchangées.

**Passe 2026-08-06 — harvest complet du 2025 N (NS28F, `element/145796`,
`course-422/upload-87489`, 6 pages).** Sujet sans aucune entrée préexistante
hormis `controle-catalyse.md` (Ex1-P2, déjà `vérifié` depuis la passe v0.3).
Couverture p.1 lue : Exercice 1 Chimie (7 pts, dosage + cinétique), Exercice
2 Transformations nucléaires (2,5 pts), Exercice 3 Électricité (5 pts, RC/RL
+ modulation AM), Exercice 4 Mécanique (5,5 pts, satellite + oscillateur) —
barème $7+2{,}5+5+5{,}5=20$ recoupé et conforme. Toutes les pages (2 à 6)
lues (vision) ; 6 nouvelles entrées `transcrit (non vérifié)` + 4 notes de
cross-list :

| Slug | Entrée | Origine |
|------|--------|---------|
| `reactions-acido-basiques` | +1 | 2025 N Ex1-P1 (dosage hydrogénosulfite de sodium, p.2) |
| `decroissance-radioactive` | +1 | 2025 N Ex2 (désintégration cadmium 107, p.3–4) |
| `rc-charge` | +1 | 2025 N Ex3-P1 (charge par générateur de courant, p.4) |
| `rlc-serie` | +1 | 2025 N Ex3-P2 (décharge dans dipôle RL, pseudopériodique, p.4–5) |
| `ondes-em-modulation` | +1 | 2025 N Ex3-P3 (sélection/démodulation AM, p.5) |
| `chute-mouvements-plans` | +1 | 2025 N Ex4-P1 (satellite artificiel, p.5–6) |
| `systemes-oscillants` | +1 | 2025 N Ex4-P2 (oscillateur solide-ressort, p.6) |
| `etat-equilibre` | cross-list | → `reactions-acido-basiques` (Q1-5, Q1-6) |
| `noyaux-masse-energie` | cross-list | → `decroissance-radioactive` (Q3-3) |
| `aspects-energetiques` | cross-list | → `systemes-oscillants` (Q3) |
| `suivi-temporel-vitesse` | cross-list | → `controle-catalyse` (déjà vérifié) |

**Décision de routage notable, documentée en tête de fichier et dans
`atome-mecanique-newton.md`** : l'exercice 4-Partie 1 (satellite artificiel)
a été classé sous `chute-mouvements-plans.md` et non sous
`atome-mecanique-newton.md`, malgré une heuristique de routage qui aurait pu
suggérer ce dernier — le contenu (gravitation, 3ᵉ loi de Kepler) correspond
au rungs R9–R10 de `content/pc/chute-mouvements-plans/lesson.md`, tandis que
`atome-mecanique-newton` reste une décision `unsourced` verrouillée par le
propriétaire du plan (`content/pc/atome-mecanique-newton/exercises.yaml`).
Toutes les 6 entrées portent `Statut: transcrit (non vérifié)`, à passer au
protocole README §3.

**Passe 2026-08-06 — harvest complet du 2023 N (NS28F, `element/142476`,
`course-422/upload-85304`, 6 pages).** Sujet sans aucune entrée
préexistante (grep préalable sur `2023` et sur « session normale » : seuls
`CENSUS.md`/`INDEX.md` mentionnaient l'année, dans la liste des couvertures
lues en v0.3 — aucun exercice n'était transcrit). En-tête du scan (p.1) lu
directement au pixel et **confirmé** : « شعبة العلوم التجريبية مسلك العلوم
الفيزيائية (خيار فرنسية) » = Sciences Physiques, BIOF, option française ;
« NS 28F » ; 3 h ; coef 7 — *NB : le résumé HTML d'AlloSchool pour
`element/142476` annonce à tort « 2ème BAC Sciences Mathématiques B »,
piège de fidélité connu (§2 ci-dessus), l'image du scan fait foi.*
Couverture p.1 lue : Exercice 1 (7 pts, réactions de l'acide éthanoïque) ·
Exercice 2 (2,5 pts, transformations nucléaires du tritium) · Exercice 3
(5 pts, dipôle RL + circuit LC + modulation d'amplitude) · Exercice 4
(5,5 pts, chute d'une balle + mouvement d'une balançoire) — barème
$7+2{,}5+5+5{,}5=20$ recoupé et conforme. Toutes les pages (2 à 6) lues
(vision) ; **10 nouvelles entrées** `transcrit (non vérifié)` + 3 notes de
cross-list :

| Slug | Entrée | Origine |
|------|--------|---------|
| `etat-equilibre` | +1 | 2023 N Ex1-§1 (acide éthanoïque + eau, $\tau$, $pK_{A1}$, p.2) |
| `reactions-acido-basiques` | +1 | 2023 N Ex1-§2 (acide éthanoïque + ion méthanoate, $Q_{r,\text{éq}}(K_{A1},K_{A2})$, pH, p.2) |
| `esterification-hydrolyse` | +1 | 2023 N Ex1-§3 (acide éthanoïque + méthanol, catalyse, $t_{1/2}$, rendement, K, p.2–3) |
| `decroissance-radioactive` | +1 | 2023 N Ex2-§1 (désintégration $\beta^-$ du tritium, QCM, $t_{1/2}$–$\lambda$, activité, p.3) |
| `noyaux-masse-energie` | +1 | 2023 N Ex2-§2 (fusion tritium + deutérium, énergie de dissociation, $E_{lib}$, p.3) |
| `dipole-rl` | +1 | 2023 N Ex3-§1 (réponse RL à un échelon, p.4) |
| `rlc-serie` | +1 | 2023 N Ex3-§2 (circuit oscillant LC, p.4) |
| `ondes-em-modulation` | +1 | 2023 N Ex3-§3 (modulation d'amplitude, p.4–5) |
| `chute-mouvements-plans` | +1 | 2023 N Ex4-Partie I (chute d'une balle, chute libre + frottement, Euler, p.5–6) |
| `systemes-oscillants` | +1 | 2023 N Ex4-Partie II (balançoire, pendule pesant, p.6) |
| `reactions-acido-basiques` | cross-list | → `etat-equilibre` (Ex1-§2, $Q_{r,\text{éq}}(K_{A1},K_{A2})$) |
| `controle-catalyse` | cross-list | → `esterification-hydrolyse` (Ex1-§3, Q3.2) |
| `suivi-temporel-vitesse` | cross-list | → `esterification-hydrolyse` (Ex1-§3, Q3.4, $t_{1/2}$) |
| `aspects-energetiques` | cross-list | → `systemes-oscillants` (Ex4-Partie II, Q1, $E_{pp}$) |

**Décision de routage notable — Exercice 1 (acide éthanoïque) partitionné
en 3 notions distinctes** (partition discipline, chaque §-partie à son
fichier) : §1 (acide faible + eau, sans dosage) suit le précédent 2015 N
et va sous `etat-equilibre.md` plutôt que `reactions-acido-basiques.md` ;
§2 (réaction entre deux couples acide/base, $K_{A1}/K_{A2}$) va sous
`reactions-acido-basiques.md`, cas non encore rencontré dans la banque
(distinct du cas « acide + eau ») ; §3 (estérification) va sous
`esterification-hydrolyse.md`. **Exercice 2 (tritium) partitionné entre
décroissance et masse-énergie** sur les deux sous-parties explicitement
titrées du scan (« 1- Désintégration » / « 2- Réaction de fusion »).
**Exercice 4-Partie II (balançoire)** classé sous `systemes-oscillants.md`
(pendule pesant, et non `rotation-axe-fixe.md`, réservé aux exercices de
type poulie/grue — R.F.D. en rotation pure, cf. `rotation-axe-fixe.md`).
Toutes les 10 entrées portent `Statut: transcrit (non vérifié)`, à passer
au protocole README §3.

### Couverture par slug (25 slugs `content/pc/`) — état après cette passe

| Slug | Année(s)/session transcrite(s) | Statut |
|------|-------------------------------|--------|
| `ondes-mecaniques-progressives` | 2018 N | vérifié |
| `ondes-mecaniques-periodiques` | 2019 N | vérifié |
| `propagation-onde-lumineuse` | 2021 N | vérifié |
| `decroissance-radioactive` | 2019 N, 2021 N | vérifié + 2 entrées **transcrit (non vérifié)** (2025 N Ex2 ; 2023 N Ex2-§1, 2026-08-06) |
| `noyaux-masse-energie` | 2020 N | vérifié + 1 entrée **transcrit (non vérifié)** (2023 N Ex2-§2, 2026-08-06) (+ cross-list 2025 N Ex2-Q3-3, non dédié) |
| `rc-charge` | 2019 N, 2018 N | vérifié + 2 entrées **transcrit (non vérifié)** (2018 N Ex III-I-1 ; 2025 N Ex3-P1, 2026-08-06) |
| `dipole-rl` | 2020 N | vérifié + 1 entrée **transcrit (non vérifié)** (2023 N Ex3-§1, 2026-08-06) |
| `rlc-serie` | 2019 N, 2018 N | vérifié + 2 entrées **transcrit (non vérifié)** (2025 N Ex3-P2 ; 2023 N Ex3-§2, 2026-08-06) |
| `ondes-em-modulation` | 2017 N | vérifié + 2 entrées **transcrit (non vérifié)** (2025 N Ex3-P3 ; 2023 N Ex3-§3, 2026-08-06) |
| `lois-de-newton` | 2019 N | vérifié |
| `chute-mouvements-plans` | 2020 N | vérifié + 2 entrées **transcrit (non vérifié)** (2025 N Ex4-P1 satellite — voir note de routage dans le fichier, **pas** `atome-mecanique-newton` ; 2023 N Ex4-Partie I, 2026-08-06) |
| `rotation-axe-fixe` | **2011 R** (grue/poulie) | **transcrit (non vérifié)** — dédié |
| `systemes-oscillants` | 2018 N | vérifié + 2 entrées **transcrit (non vérifié)** (2025 N Ex4-P2 ; 2023 N Ex4-Partie II, 2026-08-06) |
| `aspects-energetiques` | (2018 N, 2025 N, 2023 N — cross-list) | cross-list ; entrée autonome à sourcer |
| `atome-mecanique-newton` | — | **NON SOURCÉ** (absent 2008–2025, 21 couvertures ; 2025 N Ex4-P1 confirmé hors périmètre, 2026-08-06) |
| `transformations-lentes-rapides` | **2010 N** (+ 2021 N cross-list) | **transcrit (non vérifié)** — dédié |
| `suivi-temporel-vitesse` | 2021 N | vérifié (+ cross-list 2025 N via `controle-catalyse`, 2023 N via `esterification-hydrolyse`, non dédiés) |
| `controle-catalyse` | **2025 N** (+ 2018 N, 2023 N cross-list) | **vérifié** (2026-07-14) |
| `transformations-deux-sens` | **2012 N** (estérification + réaction limitée) | **transcrit (non vérifié)** — dédié |
| `etat-equilibre` | **2015 N**, **2023 N** (Ex1-§1) (+ 2019/2020/2021/2025 N cross-list) | **transcrit (non vérifié)** — 2 dédiés |
| `evolution-spontanee` | **2012 N** (pile Cu-Zn, $K$) | **transcrit (non vérifié)** — dédié |
| `reactions-acido-basiques` | 2019 N, 2020 N, 2021 N, 2018 N | vérifié + 3 entrées **transcrit (non vérifié)** (2018 N ; 2025 N Ex1-P1 ; 2023 N Ex1-§2, 2026-08-06) |
| `esterification-hydrolyse` | 2018 N | vérifié + 1 entrée **transcrit (non vérifié)** (2023 N Ex1-§3, 2026-08-06) |
| `piles` | 2020 N | vérifié |
| `electrolyse` | 2019 N, 2018 N | vérifié + 1 entrée **transcrit (non vérifié)** (2018 N, 2026-08-06) |

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

## 6. Ce qui N'A PAS été atteint dans cette passe (à faire)

**Slugs prioritaires non sourcés depuis les scans 2017–2021 (probablement
absents de l'épreuve PC-SPC récente) :**

- ~~**`rotation-axe-fixe`**~~ **RÉSOLU (v0.3)** — sourcé via **2011 Rattrapage**
  (« Étude dynamique d'une grue » : poulie en rotation autour d'un axe fixe,
  R.F.D en rotation, moment d'inertie). Confirme qu'il est **absent des
  couvertures normales 2008→2025** ; présent en rattrapage. Voir
  `rotation-axe-fixe.md`.
- **`atome-mecanique-newton`** (niveaux d'énergie, quantification) — **toujours NON
  SOURCÉ (v0.3)** après lecture de **21 couvertures** (normales 2008→2025 +
  rattrapage 2011/2014/2016). Chapitre conceptuel sans exercice national autonome
  sur la période. **Candidat au ship `unsourced`** — note honnête dans
  `atome-mecanique-newton.md`. Pistes résiduelles : rattrapages non lus
  (2008–2010, 2012–2013, 2015, 2017–2025).

**Slugs couverts seulement en cross-list (entrée autonome souhaitable) :**

- **`aspects-energetiques`** — transcrit via `systemes-oscillants` (2018 N,
  solide-ressort). Entrée autonome à tirer du **2017 N Ex IV-II (pendule de
  torsion, énergétique)** — pages ~7–8, upload-45103 (non encore lues).
- **`controle-catalyse`** — seulement les « facteurs cinétiques » (2018 N estér.).
  Un exercice avec **catalyseur** reste à trouver (rarement isolé, cf. §5).
- **`evolution-spontanee`** — pas d'exercice national dédié au critère $Q_r$ vs $K$
  transcrit ; cross-list vers `piles`.
- **`etat-equilibre`**, **`transformations-lentes-rapides`** — cross-list ; un
  exercice national dédié améliorerait la couverture.
- **`transformations-deux-sens`** — non abordé cette passe (recoupe
  `etat-equilibre`).

**Exercices déjà lus mais non transcrits (matière disponible sans re-fetch, pour
étoffer des slugs existants) :**

- 2017 N Ex I (pile Al-Cu → `piles` ; acide butanoïque → acido-basique) — lu
  partiellement (couverture) mais pages 2–3 non lues.
- 2017 N Ex IV-I (skieur → `lois-de-newton`) et Ex IV-II (pendule torsion →
  `aspects-energetiques`) — pages 6 (intro skieur) lue, 7–8 non lues.
- ~~2018 N Ex I-P1 (électrolyse bromure de plomb → `electrolyse`) — page 2 non
  lue.~~ **transcrit 2026-08-06** (page 2, `electrolyse.md`).
- 2019 N Ex IV-II (tremplin + projectile → `chute-mouvements-plans`) — page 7 non
  lue.
- 2020 N Ex IV-II/III (RLC amortissement/entretien → `rlc-serie`) — pages 5–6 lues,
  transcription à ajouter sous `rlc-serie.md`.
- ~~2021 N Ex IV (RC + LC + modulation)~~ **transcrit 2026-08-06** — 3
  entrées (`rc-charge`, `rlc-serie`, `ondes-em-modulation`), pages 5–7. Ex V
  (parachutiste → `chute-mouvements-plans`) déjà transcrit et vérifié.
- ~~2018 N Ex I-P2 sous-partie 1 (dosage pH-métrique acide lactique →
  `reactions-acido-basiques`) — signalée non reprise dans
  `esterification-hydrolyse.md`.~~ **transcrit 2026-08-06** (pages 2–3,
  `reactions-acido-basiques.md`).
- ~~2018 N Ex III-I-1 (détermination de $C_2$ par générateur de courant →
  `rc-charge`) — seule I-2 (décharge) était transcrite.~~ **transcrit
  2026-08-06** (page 5, `rc-charge.md`).

## 7. Prochaine passe recommandée
1. **Années 2008–2016** : résoudre les `upload-<ID>` (fetch `element/<n>`) et lire
   les couvertures pour pister `rotation-axe-fixe` et `atome-mecanique-newton`
   (seule piste restante). Sessions **rattrapage** aussi (souvent d'autres thèmes).
2. Étoffer les slugs existants avec les pages déjà repérées (§6, sans re-fetch
   pour celles en cache) et ajouter les cross-lists manquants (`rlc-serie` 2020).
3. ~~Lancer le **protocole de vérification** (README §3)~~ **FAIT le 2026-07-11** :
   re-fetch indépendant + diff des 23 entrées → 23/23 conformes, toutes `vérifié`
   (voir §Statut en tête). Reste à vérifier de la même façon **toute nouvelle
   entrée** ajoutée lors des passes 2008–2016, et à re-confronter aux **corrigés**
   les valeurs de figure encore marquées « lecture à confirmer » (lues mais non
   chiffrées au dixième près sur certaines courbes).
