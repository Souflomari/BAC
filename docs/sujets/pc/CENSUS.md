# CENSUS — Examens nationaux PC (2ème Bac, SPC/BIOF), 2008–2025, sessions N + R

> **Phase B1 du plan `docs/pipeline/mastery-push-plan.md` (Lane B).** Carte de
> ce qui existe et où, décomposé en exercices mappés sur les 25 slugs de
> `content/pc/`. Ce document est un **recensement**, pas une transcription
> (la transcription = B2, protocole `README.md` §3).
>
> **Honnêteté de cette passe (2026-07-24).** La session de recherche B1 a été
> interrompue par un redémarrage d'infrastructure après ~15 h ; les résultats
> de recherche web non consignés ont été **perdus**. Ce census converge donc
> sur ce qui est **vérifiable depuis le dépôt** (INDEX.md v0.3 + les 29
> entrées vérifiées des fichiers `<slug>.md`). Tout le reste porte un
> marqueur honnête : `non recherché` (jamais atteint dans ce qui a survécu),
> `(?)` (mapping incertain), `carte non consignée` (couverture lue en v0.3
> mais relevé d'exercices non écrit dans INDEX). **Aucune ligne n'est
> inventée.** Aucun sujet n'est marqué `introuvable` : les seuls trous
> restants n'ont pas été cherchés (ou le résultat de la recherche est perdu),
> ce qui n'est pas la même chose qu'une recherche réelle infructueuse.

**Légende statut** ·
`sourcé-confirmé` = URL connue **et** scan ouvert (en-tête/couverture lu, filière SPC confirmée) ·
`sourcé-listé` = URL `element/<n>` relevée sur le hub AlloSchool, page jamais ouverte ·
`non consigné` = trace de lecture en v0.3 mais URL absente de nos notes ·
`non recherché` = jamais atteint.

**Patterns d'URL (AlloSchool, source primaire — INDEX §2)** ·
page sujet : `https://www.alloschool.com/element/<ID>` ·
images de scan : `https://www.alloschool.com/assets/documents/course-422/upload-<ID>/000k-big.jpg` ·
hub : `https://www.alloschool.com/section/4585` (annonce 2008→2025, N+R, complet).

---

## 1. Table par session (36 sujets attendus)

| Année | Session | Code | Source (element / upload, pages) | Statut |
|------:|:-------:|:----:|----------------------------------|--------|
| 2008 | N | — | `upload-45082` (6 p.) | sourcé-confirmé |
| 2008 | R | — | — | non recherché |
| 2009 | N | — | `upload-45088` (8 p.) | sourcé-confirmé |
| 2009 | R | — | — | non recherché |
| 2010 | N | NS28 | `element/94443` · `upload-70311` (6 p.) | **décomposé** (2026-08-27) |
| 2010 | R | — | — | non recherché |
| 2011 | N | — | — (couverture lue en v0.3 selon INDEX, URL non consignée) | non consigné |
| 2011 | R | RS28 | `element/94449` · `upload-70317` (7 p.) | sourcé-confirmé |
| 2012 | N | NS28 | `element/94452` · `course-422/upload-70320` (6 p.) | **décomposé** (2026-08-27) |
| 2012 | R | — | — | non recherché |
| 2013 | N | — | `upload-70326` (7 p.) | sourcé-confirmé |
| 2013 | R | — | — | non recherché |
| 2014 | N | — | `upload-70333` (7 p.) | sourcé-confirmé |
| 2014 | R | — | `element/94469` · `upload-70336` (7 p.) | sourcé-confirmé |
| 2015 | N | NS28 | `element/94472` · `upload-70340` (7 p.) | sourcé-confirmé |
| 2015 | R | — | — | non recherché |
| 2016 | N | — | `upload-45091` (8 p.) | sourcé-confirmé |
| 2016 | R | — | `element/57705` · `upload-45097` (7 p.) | sourcé-confirmé |
| 2017 | N | NS28F | `element/57711` · `upload-45103` (8 p.) | sourcé-confirmé |
| 2017 | R | — | `element/57717` | sourcé-listé |
| 2018 | N | NS28F | `element/57726` · `upload-45118` (8 p.) | sourcé-confirmé |
| 2018 | R | — | `element/57732` | sourcé-listé |
| 2019 | N | NS28F | `element/68300` · `upload-54757` (7 p.) | sourcé-confirmé |
| 2019 | R | — | `element/94419` | sourcé-listé |
| 2020 | N | NS28F | `element/109742` · `upload-80870` (7 p.) | sourcé-confirmé |
| 2020 | R | — | `element/109751` | sourcé-listé |
| 2021 | N | NS28F | `element/127287` · `upload-84195` (8 p.) | sourcé-confirmé |
| 2021 | R | — | `element/127290` | sourcé-listé |
| 2022 | N | NS 28F | `element/136621` · `upload-84516` (8 p.) | sourcé-confirmé |
| 2022 | R | — | `element/136624` | sourcé-listé |
| 2023 | N | — | `element/142476` · `upload-85304` (6 p.) | sourcé-confirmé |
| 2023 | R | — | `element/142484` | sourcé-listé |
| 2024 | N | — | `element/145763` · `upload-87465` (6 p.) | sourcé-confirmé |
| 2024 | R | — | `element/145769` | sourcé-listé |
| 2025 | N | NS28F | `element/145796` · `upload-87489` (6 p.) | sourcé-confirmé |
| 2025 | R | — | `element/145799` | sourcé-listé |

**Bilan : 29/36 sourcés** (20 confirmés + 9 listés) · 1 `non consigné` (2011 N)
· 6 `non recherché` (rattrapages 2008, 2009, 2010, 2012, 2013, 2015 — le hub
AlloSchool les annonce, à résoudre en un fetch chacun).

Corrigés (non recensés en détail ici) : `element/<n>` connus pour 2017–2024
N+R (INDEX §2) ; **2025 : corrigés non publiés** au sourcing 2026-07.

---

## 2. Décomposition par sujet (exercices → slugs)

Mappings issus des entrées **vérifiées** de la banque (fichiers `<slug>.md`)
et des **couvertures p.1** relevées dans INDEX. `(?)` = mapping de couverture
non confirmé par lecture des pages intérieures.

### Sujets à carte complète (7)

**2017 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Pile Al-Cu + réactions de l'acide butanoïque | `piles` + `reactions-acido-basiques` (?) |
| II | Onde mécanique à la surface de l'eau | `ondes-mecaniques-periodiques` (?) |
| III | Dipôle RL (échelon) + modulation d'amplitude | `dipole-rl` + `ondes-em-modulation` ✓ |
| IV | Skieur avec frottements + pendule de torsion (énergétique) | `lois-de-newton` (?) + `aspects-energetiques` (?)/`systemes-oscillants` (?) |

**2018 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Électrolyse PbBr₂ + acide lactique (dosage, estérification) | `electrolyse` ✓ (2026-08-06) + `reactions-acido-basiques` ✓ (2026-08-06) + `esterification-hydrolyse` ✓ (cross `controle-catalyse`) |
| II | Onde ultrasonore (célérité, retard) | `ondes-mecaniques-progressives` ✓ |
| III | Condensateur (charge/décharge) + RLC série | `rc-charge` ✓ (I-1 + I-2 complets, 2026-08-06) + `rlc-serie` ✓ |
| IV | Chute verticale d'une bille + oscillateur solide-ressort | `chute-mouvements-plans` + `systemes-oscillants` ✓ (cross `aspects-energetiques` ✓) |

**2019 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Électrolyse ZnI₂ + conductimétrie acide benzoïque | `electrolyse` ✓ + `reactions-acido-basiques` ✓ (cross `etat-equilibre`) |
| II | Onde à la cuve + radon 222 | `ondes-mecaniques-periodiques` ✓ + `decroissance-radioactive` ✓ (cross `noyaux-masse-energie`) |
| III | Charge/décharge condensateur + oscillations LC | `rc-charge` ✓ + `rlc-serie` ✓ |
| IV | Plan incliné (2ème loi) + tremplin/projectile | `lois-de-newton` ✓ + `chute-mouvements-plans` |
 
**2020 N (NS28F)** — 5 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Dosage ammoniac + pile argent-chrome | `reactions-acido-basiques` ✓ + `piles` ✓ (cross `evolution-spontanee`) |
| II | Propagation des ondes (QCM + cuve) | `ondes-mecaniques-periodiques` ✓ (transcrit non vérifié 2026-08-06 ; cross `ondes-mecaniques-progressives`) |
| III | Polonium 210 (masse-énergie + décroissance) | `noyaux-masse-energie` ✓ (cross `decroissance-radioactive`) |
| IV | Dipôle RL (échelon) + RLC (amortissement, entretien) | `dipole-rl` ✓ + `rlc-serie` (lu p.5–6, transcription à ajouter) |
| V | Chute verticale bille, liquide visqueux (Euler) | `chute-mouvements-plans` ✓ |

**2021 N (NS28F)** — 5 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Cinétique saponification + dosage acide carboxylique | `suivi-temporel-vitesse` ✓ (cross `transformations-lentes-rapides`) + `reactions-acido-basiques` ✓ |
| II | Dispersion prisme + diffraction | `propagation-onde-lumineuse` ✓ |
| III | Plutonium 238 (décroissance, activité) | `decroissance-radioactive` ✓ |
| IV | RC (échelon) + LC + modulation d'amplitude | `rc-charge` + `rlc-serie` + `ondes-em-modulation` — **transcrit (non vérifié) 2026-08-06** (p.5–7, 3 entrées, README §3) |
| V | Mouvement d'un parachutiste | `chute-mouvements-plans` |

**2025 N (NS28F)** — 4 exercices, barème 7+2,5+5+5,5 = 20 (couverture p.1)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Dosage hydrogénosulfite de sodium + suivi cinétique estérification (température/catalyseur) | `reactions-acido-basiques` ✓ (P1, cross `etat-equilibre`) + `controle-catalyse` ✓ (P2, déjà vérifié, cross `suivi-temporel-vitesse`) |
| II | Désintégration du cadmium 107 | `decroissance-radioactive` ✓ (cross `noyaux-masse-energie` pour Q3-3) |
| III | Charge (générateur de courant) + décharge dans dipôle RL (pseudopériodique) + sélection/démodulation AM | `rc-charge` ✓ (P1) + `rlc-serie` ✓ (P2, précédent : même intitulé que 2020 N Ex IV-II) + `ondes-em-modulation` ✓ (P3) |
| IV | Satellite artificiel (gravitation, 3ᵉ loi de Kepler) + oscillateur solide-ressort | `chute-mouvements-plans` ✓ (P1 — **pas** `atome-mecanique-newton`, voir note de routage dans ce fichier) + `systemes-oscillants` ✓ (P2, cross `aspects-energetiques`) |

**Transcrit (non vérifié) le 2026-08-06 : 6 nouvelles entrées** (Ex I-P1, Ex II,
Ex III-P1, Ex III-P2, Ex IV-P1, Ex IV-P2) + 3 notes de cross-list
(`etat-equilibre`, `noyaux-masse-energie`, `aspects-energetiques`) + 1 note de
cross-list vers une entrée déjà existante (`suivi-temporel-vitesse` →
`controle-catalyse`). Ex I-P2 (`controle-catalyse`) était déjà `vérifié`
depuis la passe v0.3 (2026-07-14), non retouché.

**2024 N (NS28F)** — 5 exercices, barème 7+2,5+2+3,5+5 = 20 (couverture p.1,
`element/145763` · `upload-87465`, 6 p. ; en-tête image confirmé SPC/BIOF,
NS28F — le résumé HTML d'AlloSchool annonce à tort « Sciences Mathématiques
B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Suivi temporel dégradation vitamine C (P1) + dosage pH-métrique vitamine C (P2) | `suivi-temporel-vitesse` ✓ (P1) + `reactions-acido-basiques` ✓ (P2, cross `etat-equilibre`) |
| 2 | Propagation d'un signal à la surface de l'eau | `ondes-mecaniques-progressives` ✓ |
| 3 | Désintégration de l'iridium 192 | `decroissance-radioactive` ✓ (pas de volet masse-énergie cette fois) |
| 4 | Décharge d'un condensateur dans un dipôle RL (P1) + réponse d'un dipôle RL à un échelon (P2) | `rlc-serie` ✓ (P1, précédent : même intitulé que 2020 N Ex IV-II / 2025 N Ex III-P2) + `dipole-rl` ✓ (P2) |
| 5 | Chute verticale d'une bille dans un liquide (P1) + mouvement d'un système mécanique : plan incliné + poulie (P2) | `chute-mouvements-plans` ✓ (P1) + `rotation-axe-fixe` ✓ (P2, précédent : même montage que 2011 R) |

**Transcrit (non vérifié) le 2026-08-06 : 8 nouvelles entrées** (Ex1-P1,
Ex1-P2, Ex2, Ex3, Ex4-P1, Ex4-P2, Ex5-P1, Ex5-P2) + 1 note de cross-list
(`etat-equilibre`, depuis Ex1-P2 Q5-4) + correction du header
`rotation-axe-fixe.md` (l'entrée 2011 R n'est plus l'unique annale dédiée
de ce thème). **2024 N passe à carte complète (2026-08-06).**

**2023 N (NS28F)** — 4 exercices, barème 7+2,5+5+5,5 = 20 (couverture p.1,
`element/142476` · `upload-85304`, 6 p. ; en-tête image confirmé SPC/BIOF,
NS 28F — le résumé HTML d'AlloSchool annonce à tort « Sciences
Mathématiques B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Réactions de l'acide éthanoïque (eau §1, ion méthanoate §2, méthanol §3) | `etat-equilibre` ✓ (§1) + `reactions-acido-basiques` ✓ (§2) + `esterification-hydrolyse` ✓ (§3, cross `controle-catalyse`, `suivi-temporel-vitesse`) |
| 2 | Transformations nucléaires du tritium (désintégration §1, fusion §2) | `decroissance-radioactive` ✓ (§1) + `noyaux-masse-energie` ✓ (§2) |
| 3 | Dipôle RL échelon (§1) + circuit LC (§2) + modulation d'amplitude (§3) | `dipole-rl` ✓ (§1) + `rlc-serie` ✓ (§2) + `ondes-em-modulation` ✓ (§3) |
| 4 | Chute d'une balle (Partie I) + mouvement d'une balançoire, pendule pesant (Partie II) | `chute-mouvements-plans` ✓ (P1) + `systemes-oscillants` ✓ (P2, cross `aspects-energetiques`) |

**Transcrit (non vérifié) le 2026-08-06 : 10 nouvelles entrées** (Ex1-§1,
Ex1-§2, Ex1-§3, Ex2-§1, Ex2-§2, Ex3-§1, Ex3-§2, Ex3-§3, Ex4-PI, Ex4-PII) +
4 notes de cross-list (`etat-equilibre`↔`reactions-acido-basiques`,
`controle-catalyse`, `suivi-temporel-vitesse`, `aspects-energetiques`). Sujet
sans aucune entrée préexistante avant cette passe. **2023 N passe à carte
complète (2026-08-06).**

**2022 N (NS 28F)** — 4 exercices, barème 7+3,5+4,5+5 = 20 (couverture p.1,
`element/136621` · `upload-84516`, 8 p. ; en-tête image confirmé SPC/BIOF,
NS 28F — le résumé HTML d'AlloSchool annonce à tort « Sciences
Mathématiques B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Chromage d'une plaque d'acier par électrolyse (P1) + propriétés d'une solution aqueuse d'acide propanoïque, dosage inclus (P2) | `electrolyse` ✓ (P1) + `reactions-acido-basiques` ✓ (P2, cross `etat-equilibre`) |
| 2 | Propagation des ondes sonores dans l'air, mesure de retard (P1) + désintégration de l'iode 131 (P2) | `ondes-mecaniques-progressives` ✓ (P1) + `decroissance-radioactive` ✓ (P2, cross `noyaux-masse-energie`) |
| 3 | Réponse d'un dipôle RC à un échelon de tension (1) + oscillations libres dans un circuit RLC série (2) | `rc-charge` ✓ (§1) + `rlc-serie` ✓ (§2) |
| 4 | Chute d'une bille dans un liquide visqueux, huile de ricin (P1) + mouvement d'un satellite artificiel (P2) | `chute-mouvements-plans` ✓ (P1 et P2 — satellite classé ici et **pas** sous `atome-mecanique-newton`, même raisonnement que 2025 N Ex IV-P1, voir note de routage dans `chute-mouvements-plans.md`) |

**Transcrit (non vérifié) le 2026-08-06 : 8 nouvelles entrées** (Ex1-P1,
Ex1-P2, Ex2-P1, Ex2-P2, Ex3-§1, Ex3-§2, Ex4-P1, Ex4-P2) + 2 notes de
cross-list (`etat-equilibre`, `noyaux-masse-energie`) + 1 addendum à la
« Note de routage » de `chute-mouvements-plans.md` (satellite artificiel,
précédent 2022 N ajouté). Sujet sans aucune entrée préexistante avant cette
passe. **2022 N passe à carte complète (2026-08-06).**

### Sujets à carte partielle (4) — seul l'exercice transcrit est consigné

| Sujet | Exercice consigné | Slug(s) | Reste du sujet |
|-------|-------------------|---------|----------------|
| 2010 N (NS28) | Chimie P1 : saponification, suivi conductimétrique, t½ | `transformations-lentes-rapides` ✓ (cross `suivi-temporel-vitesse` (?)) | carte non consignée — contenu à transcrire |
| 2012 N (NS28) | Chimie P1 : acide éthanoïque + ammoniac (réaction limitée) + estérification linalol ; Chimie P2 : pile Cu-Zn, K, sens spontané | `transformations-deux-sens` ✓ (cross `esterification-hydrolyse` (?)) ; `evolution-spontanee` ✓ (cross `piles` (?)) | **PHYSIQUE TRANSCRITE** le 2026-08-27 (`_incoming/pc-2012-n.md`, NON vérifiée) : nucléaire 3,0 → `decroissance-radioactive` (2,0) + `noyaux-masse-energie` (1,0) · électricité 4,5 → `dipole-rl` (2,5) + `rlc-serie` (2,0) · mécanique 5,5 → `chute-mouvements-plans`. 21 questions, 13,00 pts recomptés par DEUX chemins (coordonnées de la couche PDF + relecture des marges). Cartouche : 7 + 13 = 20 ✔ |
| 2015 N (NS28) | Ex 1 (Chimie), 2e partie : acide benzoïque/eau — τ, Qr,éq, pKA | `etat-equilibre` ✓ (cross `reactions-acido-basiques` (?)) | carte non consignée — à transcrire |
| 2011 R (RS28) | Mécanique, 1ère situation : grue/poulie — R.F.D. rotation, J∆ | `rotation-axe-fixe` ✓ | carte non consignée — à transcrire |

**2025 N (NS28F) est passé à carte complète (2026-08-06)** — voir la table
ci-dessus (§ Sujets à carte complète).

### Sujets sans carte (18 sourcés + 7 hors atteinte)

- **Couverture lue en v0.3, carte non consignée (relevé perdu)** : 2008 N,
  2009 N, 2013 N, 2014 N, 2016 N, 2014 R, 2016 R —
  `contenu à transcrire` (une lecture de couverture chacun suffit pour la
  carte ; pipeline JPG→Read, bases `upload-` connues). **2024 N, 2023 N et
  2022 N en sont sortis (2026-08-06) : carte complète, voir § Sujets à carte
  complète.**
- **Sourcé-listé, jamais ouvert** : 2017 R, 2018 R, 2019 R, 2020 R, 2021 R,
  2022 R, 2023 R, 2024 R, 2025 R — `contenu à transcrire` (confirmer
  l'en-tête SPC à l'ouverture).
- **Non recherché** : 2008 R, 2009 R, 2010 R, 2012 R, 2013 R, 2015 R + URL
  2011 N à re-résoudre.

---

## 3. Rollup par notion (le chiffre qui pilote les vagues B2)

`Dédiés` = exercices/parties mappés fermes (transcrit ✓ ou titre de
couverture univoque). `Cross/(?)` = cross-lists + mappings incertains.

| Slug | Dédiés | Cross/(?) | Années-sessions (dédiés puis cross/?) |
|------|:-----:|:--------:|----------------------------------------|
| `rlc-serie` | 8 | 0 | 2018 N, 2019 N, 2020 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N |
| `chute-mouvements-plans` | 8 | 0 | 2018 N, 2019 N, 2020 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N |
| `rc-charge` | 5 | 0 | 2018 N, 2019 N, 2021 N, 2022 N, 2025 N |
| `reactions-acido-basiques` | 8 | 3 | 2019 N, 2020 N, 2021 N, 2018 N, 2022 N, 2023 N, 2024 N, 2025 N · (?) 2015 N, 2017 N |
| `decroissance-radioactive` | 6 | 1 | 2019 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N · cross 2020 N |
| `dipole-rl` | 4 | 0 | 2017 N, 2020 N, 2023 N, 2024 N |
| `ondes-em-modulation` | 4 | 0 | 2017 N, 2021 N, 2023 N, 2025 N |
| `piles` | 2 | 1 | 2017 N, 2020 N · (?) 2012 N |
| `electrolyse` | 3 | 0 | 2018 N, 2019 N, 2022 N |
| `ondes-mecaniques-periodiques` | 1 | 2 | 2019 N · (?) 2017 N, 2020 N |
| `ondes-mecaniques-progressives` | 3 | 1 | 2018 N, 2022 N, 2024 N · (?) 2020 N |
| `propagation-onde-lumineuse` | 1 | 0 | 2021 N |
| `noyaux-masse-energie` | 2 | 3 | 2020 N, 2023 N · cross 2019 N, 2022 N, 2025 N |
| `lois-de-newton` | 1 | 1 | 2019 N · (?) 2017 N |
| `rotation-axe-fixe` | 2 | 0 | 2011 R, 2024 N (même type de montage : poulie/cylindre + R.F.D. rotation) |
| `systemes-oscillants` | 3 | 1 | 2018 N, 2023 N, 2025 N · (?) 2017 N |
| `suivi-temporel-vitesse` | 2 | 4 | 2021 N, 2024 N · (?) 2010 N, 2025 N · cross 2025 N (via `controle-catalyse`), 2023 N (via `esterification-hydrolyse`) |
| `transformations-lentes-rapides` | 1 | 1 | 2010 N · cross 2021 N |
| `controle-catalyse` | 1 | 2 | 2025 N · cross 2018 N, 2023 N |
| `transformations-deux-sens` | 1 | 0 | 2012 N |
| `etat-equilibre` | 2 | 6 | 2015 N, 2023 N · cross 2019/2020/2021 N, 2022 N, 2024 N, 2025 N |
| `evolution-spontanee` | 1 | 1 | 2012 N · cross 2020 N |
| `esterification-hydrolyse` | 2 | 2 | 2018 N, 2023 N · (?) 2012 N, 2025 N |
| `aspects-energetiques` | 0 | 4 | cross 2018 N, 2023 N, 2025 N · (?) 2017 N (pendule torsion — entrée autonome cible) |
| `atome-mecanique-newton` | 0 | 0 | **NON SOURCÉ** — absent des 21 couvertures lues 2008–2025 (candidat ship `unsourced`) ; 2025 N Ex IV-P1 (satellite) confirmé **hors périmètre**, classé `chute-mouvements-plans` (voir note de routage) |

---

## 4. Résumé de couverture — honnête

- **Sujets sourcés : 29/36** (20 confirmés scan-en-main, 9 listés non
  ouverts) ; 1 `non consigné` (2011 N) ; 6 `non recherché` (R 2008–2015 hors
  2011/2014). Aucun `introuvable` avéré : les trous restants n'ont pas fait
  l'objet d'une recherche qui ait survécu au redémarrage.
- **Exercices énumérés : ≈ 27** (22 sur les 5 cartes complètes 2017–2021 N
  + 5 exercices/parties consignés sur les 5 cartes partielles). Sur les
  ~125 attendus (Lane B sizing) : **≈ 22 % énuméré** — 26 sujets sur 36
  restent sans carte d'exercices.
- **Banque transcrite existante : 29 entrées, toutes `vérifié`**
  (23 passe v0.2 vérifiées 2026-07-11 + 6 passe v0.3 vérifiées 2026-07-14).
  **Ce chiffre est antérieur aux passes du 2026-08-06** (2021 N Ex IV
  `rc-charge`/`rlc-serie`/`ondes-em-modulation`, puis le comblement des trous
  de 2018 N sur `electrolyse`/`reactions-acido-basiques`/`rc-charge` — voir
  `INDEX.md` §4 pour le détail à jour) ; non recompté ici pour ne pas
  fabriquer un total non ré-audité.
- **Notions rares (0–2 dédiés)** : `atome-mecanique-newton` (0 — probable
  `unsourced`), `aspects-energetiques` (0 dédié, cross seulement),
  `rotation-axe-fixe` (1, uniquement en rattrapage), et 14 autres slugs à
  1 dédié. Seuls 4 slugs atteignent ≥ 3. **Le rollup actuel reflète la
  couverture de nos lectures, pas la fréquence réelle au bac** — les slugs
  « chaque année » (RC/RLC, ondes, nucléaire, acide-base) monteront
  mécaniquement quand les 26 cartes manquantes seront relevées.
- **Trous systématiques** : (1) les **rattrapages** — 3 couvertures lues sur
  18, 9 URLs listées jamais ouvertes, 6 jamais cherchés ; (2) l'anomalie
  **2011 N** (INDEX v0.3 revendique 18 couvertures normales lues mais aucune
  URL 2011 N n'est consignée — à re-résoudre) ; (3) les **corrigés 2025**
  non publiés au dernier sourcing. (Les normales 2022–2024, autrefois
  sourcées mais sans carte, sont désormais **toutes trois** à carte
  complète — 2024 N et 2023 N le 2026-08-06, 2022 N la même date, voir §7.)
- **Prochain incrément B1 (avant B2)** : ~35 fetchs suffisent — re-résoudre
  2011 N + 6 rattrapages manquants, ouvrir les 9 R listés, lire les 19
  couvertures sans carte — pour porter l'énumération à ~100 % des sujets
  atteignables.

## 5. Passe 2026-08-06 — harvest complet du 2025 N (NS28F)

**2025 N est passé de carte partielle (1 exercice/partie) à carte
complète : 6 nouvelles entrées `transcrit (non vérifié)` + 4 notes de
cross-list**, sur les 4 exercices/20 points du sujet (barème 7+2,5+5+5,5
recoupé et conforme à la couverture p.1). Détail dans `README.md` §4 (chaque
fichier `<slug>.md`) et dans la table « Sujets à carte complète » ci-dessus.
Point notable : l'exercice IV-Partie 1 (satellite artificiel) a été classé
sous `chute-mouvements-plans` et **pas** sous `atome-mecanique-newton`
malgré une consigne de routage générale qui aurait pu suggérer ce dernier —
`atome-mecanique-newton` reste `unsourced`, décision verrouillée
(`content/pc/atome-mecanique-newton/exercises.yaml`) réaffirmée, pas
contournée ; voir la note de routage dans `chute-mouvements-plans.md` et la
note symétrique dans `atome-mecanique-newton.md`.

## 6. Passe 2026-08-06 — harvest complet du 2023 N (NS28F)

**2023 N est passé de « couverture lue en v0.3, carte non consignée » à
carte complète : 10 nouvelles entrées `transcrit (non vérifié)` + 4 notes
de cross-list**, sur les 4 exercices/20 points du sujet (barème
$7+2{,}5+5+5{,}5=20$ recoupé et conforme à la couverture p.1). Détail dans
`README.md` §4 (chaque fichier `<slug>.md`) et dans la table « Sujets à
carte complète » ci-dessus. Points notables :
- l'exercice 1 (« réactions de l'acide éthanoïque ») a été **partitionné en
  trois notions distinctes** (chaque §-partie à son fichier) : §1
  (acide + eau, sans dosage) → `etat-equilibre.md`, suivant le précédent
  2015 N ; §2 (réaction entre deux couples acide/base, $K_{A1}/K_{A2}$) →
  `reactions-acido-basiques.md`, un cas non encore rencontré dans la
  banque ; §3 (estérification) → `esterification-hydrolyse.md` ;
- l'exercice 2 (« transformations nucléaires du tritium ») a été
  partitionné entre `decroissance-radioactive.md` (§1, désintégration) et
  `noyaux-masse-energie.md` (§2, fusion), sur les deux sous-parties
  explicitement titrées du scan ;
- l'exercice 4-Partie II (« balançoire ») a été classé sous
  `systemes-oscillants.md` (pendule pesant) et **pas** sous
  `rotation-axe-fixe.md`, ce dernier restant réservé aux exercices de type
  poulie/grue (R.F.D. en rotation pure autour d'un axe fixe, sans
  oscillation).
- l'en-tête du scan a été lu directement au pixel et confirme sans
  ambiguïté la filière Sciences Physiques (SPC), BIOF, option française —
  le résumé HTML d'AlloSchool pour `element/142476` annonce à tort « 2ème
  BAC Sciences Mathématiques B » (même piège de fidélité que 2018 N et
  2024 N, README §3).

## 7. Passe 2026-08-06 — harvest complet du 2022 N (NS 28F)

**2022 N est passé de « couverture lue en v0.3, carte non consignée » à
carte complète : 8 nouvelles entrées `transcrit (non vérifié)` + 2 notes
de cross-list**, sur les 4 exercices/20 points du sujet (barème
$7+3{,}5+4{,}5+5=20$ recoupé et conforme à la couverture p.1). Détail dans
`README.md` §4 (chaque fichier `<slug>.md`) et dans la table « Sujets à
carte complète » ci-dessus. Points notables :
- l'exercice 1 (« chromage d'une plaque d'acier par électrolyse » +
  « propriétés d'une solution aqueuse d'acide propanoïque ») a été
  partitionné entre `electrolyse.md` (Partie 1) et
  `reactions-acido-basiques.md` (Partie 2, réaction acide/eau **et** dosage
  pH-métrique regroupés dans la même entrée, comme pour le précédent
  2025 N Ex I-P1) ;
- l'exercice 2 (« ondes sonores » + « désintégration de l'iode 131 ») a été
  partitionné entre `ondes-mecaniques-progressives.md` (Partie 1 — mesure
  de retard/célérité, sans longueur d'onde imposée, classement conforme à
  la note de classement en tête de ce fichier) et
  `decroissance-radioactive.md` (Partie 2, cross `noyaux-masse-energie`
  pour la question d'énergie libérée) ;
- l'exercice 3 (« RC » + « RLC série ») a été partitionné entre
  `rc-charge.md` (section 1) et `rlc-serie.md` (section 2), sur le même
  montage (figure 1) — précédent direct : 2018 N Ex III et 2019 N Ex III ;
- l'exercice 4 (« chute d'une bille dans un liquide visqueux » +
  « mouvement d'un satellite artificiel ») a été transcrit **intégralement
  dans `chute-mouvements-plans.md`** (Partie 1 et Partie 2) : la Partie 2
  (satellite) suit le même raisonnement de routage que 2025 N Ex IV-P1
  (**pas** `atome-mecanique-newton.md` — voir la « Note de routage », dont
  l'en-tête a été complété avec ce nouveau précédent) ;
- l'en-tête du scan a été lu directement au pixel et confirme sans
  ambiguïté la filière Sciences Physiques (SPC), BIOF, option française
  (« شعبة العلوم التجريبية: مسلك العلوم الفيزيائية - خيار فرنسية », NS 28F,
  3 h, coef 7) — le résumé HTML d'AlloSchool pour `element/136621` annonce
  à tort « Sciences Mathématiques B » (même piège de fidélité que 2018 N,
  2023 N et 2024 N, README §3).
