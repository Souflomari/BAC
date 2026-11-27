# Banque de sujets PC — Conventions

> Comment cette banque d'annales (examen national, 2ème Bac, filière **Sciences
> Physiques / SPC**, épreuve Physique-Chimie, option française/BIOF) est
> constituée, transcrite et vérifiée. Lire `INDEX.md` pour l'inventaire des
> sources et la contrainte d'environnement (scans + pipeline JPG→Read).

---

## 1. Principe : fidélité avant tout

Le risque n°1 de la campagne est la **fidélité de transcription**. Règles dures :

- **Ne transcrire que ce qu'on lit littéralement** dans le contenu récupéré
  (image de scan rendue, ou texte HTML). Aucune reformulation, aucun « lissage »,
  aucune valeur reconstituée de mémoire.
- **Ne jamais inventer une valeur.** Si un scan (ou une portion) est illisible,
  l'entrée — ou la sous-question concernée — est marquée `illisible — écarté`.
- **Provenance obligatoire** sur chaque entrée : URL + année + session. Pas de
  provenance ⇒ on n'écrit pas.
- **Figures** : décrites textuellement (axes, grandeurs, allure des courbes,
  valeurs remarquables lisibles, éléments de schéma). Toute lecture d'échelle
  incertaine est explicitement **signalée** (`(lecture à confirmer)`), jamais
  affirmée.
- Tout en **français**. Math en LaTeX inline `$...$`.

---

## 2. Format d'une entrée

Chaque fichier `docs/sujets/pc/<slug>.md` regroupe 1+ exercices, chacun sous ce
bloc (l'en-tête des 3 premières lignes est **normatif**) :

```markdown
## <année> — session <normale|rattrapage> — Exercice <n>
Source: <URL de la page element/ AlloSchool (ou hôte)>
Statut: transcrit (non vérifié)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : <ex. NS28F> · Barème de l'exercice : <x points>
- Images lues (reproductibilité) : <...upload-ID/000k-big.jpg, ...>
- Pages du scan : <n° de page dans le document>

**Titre officiel de l'exercice.**

<Énoncé transcrit : contexte, Données, sous-questions numérotées avec leur
barème, description(s) de figure.>
```

Champs :
- **`Source`** = l'URL humaine `element/<n>` (stable, citable). Les URLs
  d'images `-big.jpg` servant à la lecture sont listées dans « Images lues »
  pour que le vérificateur reproduise exactement.
- **`Statut`** ∈ { `transcrit (non vérifié)`, `vérifié`, `illisible — écarté` }.
  Une entrée naît toujours `transcrit (non vérifié)`.
- Conserver **la numérotation d'origine** des questions (1, 1.1, 2.1, …) et le
  **barème** en tête de question quand il est imprimé dans la marge du scan.

---

## 3. Protocole de vérification (un second agent)

Une entrée ne passe à `Statut: vérifié` qu'après **re-fetch indépendant et
diff** par un autre agent que le transcripteur :

1. Ouvrir la `Source` (`element/<n>`), en re-dériver `upload-<ID>` et la liste
   des pages (ne pas réutiliser aveuglément les URLs « Images lues » : les
   re-dériver prouve que la source est toujours celle annoncée).
2. `WebFetch` la/les page(s) `-big.jpg` → `Read` le binaire local rendu.
3. **Diff** caractère par caractère de l'énoncé transcrit vs. l'image :
   - toute divergence de **valeur numérique, unité, indice, exposant** est
     bloquante ;
   - vérifier que la description de figure correspond (axes, valeurs, allure) ;
   - vérifier filière/code sujet/barème sur l'en-tête du scan.
4. Si conforme → passer à `Statut: vérifié` et signer
   (`Vérifié par <agent> le <date>, diff OK`). Sinon → corriger et **laisser en
   `transcrit (non vérifié)`** pour un nouveau tour.

> Rappel INDEX : les résumés textuels renvoyés par `WebFetch` sur une page HTML
> peuvent halluciner (filière erronée observée). **Seule l'image du scan fait
> foi.**

---

## 4. Table de correspondance chapitre `content/pc/<slug>` ↔ thème d'examen

Les **25 slugs** sont ceux des dossiers sous `content/pc/` (relevé exact par
`content/pc/<slug>/lesson.md`). La colonne « thème d'examen national » est une
**correspondance de travail** (expertise du domaine, à valider), pas une
extraction de cadre.

| Slug (`content/pc/`) | Domaine | Thème d'examen national (label FR usuel) |
|----------------------|---------|------------------------------------------|
| `ondes-mecaniques-progressives` | Ondes | Ondes mécaniques progressives (célérité, retard, transversale/longitudinale) |
| `ondes-mecaniques-periodiques` | Ondes | Ondes mécaniques progressives périodiques (période, longueur d'onde, double périodicité) |
| `propagation-onde-lumineuse` | Ondes | Propagation des ondes lumineuses (diffraction, dispersion, indice, λ) |
| `decroissance-radioactive` | Nucléaire | Décroissance radioactive (loi, demi-vie $t_{1/2}$, activité, constante $\lambda$) |
| `noyaux-masse-energie` | Nucléaire | Noyaux, masse et énergie (défaut de masse, énergie de liaison, énergie libérée, fission/fusion) |
| `rc-charge` | Électricité | Dipôle RC — charge/décharge d'un condensateur, constante de temps $\tau=RC$ |
| `dipole-rl` | Électricité | Dipôle RL — établissement/rupture du courant, $\tau=L/R$ |
| `rlc-serie` | Électricité | Oscillations libres du circuit RLC série (régimes, période propre, entretien) |
| `ondes-em-modulation` | Électricité/Ondes | Ondes EM & modulation d'amplitude (RLC forcé/résonance, modulation) |
| `lois-de-newton` | Mécanique | Lois de Newton (2ème loi, référentiels galiléens) |
| `chute-mouvements-plans` | Mécanique | Chutes verticales & mouvements plans (chute libre/frottement fluide, projectile, champs) |
| `rotation-axe-fixe` | Mécanique | Rotation d'un solide autour d'un axe fixe |
| `systemes-oscillants` | Mécanique | Systèmes mécaniques oscillants (pendules élastique/torsion/pesant) |
| `aspects-energetiques` | Mécanique | Aspects énergétiques des oscillateurs / du mouvement |
| `atome-mecanique-newton` | Mécanique/Atome | L'atome et la mécanique de Newton (quantification, niveaux d'énergie) |
| `transformations-lentes-rapides` | Chimie (cinétique) | Transformations rapides et lentes d'un système chimique |
| `suivi-temporel-vitesse` | Chimie (cinétique) | Suivi temporel d'une transformation, vitesse de réaction, temps de demi-réaction |
| `controle-catalyse` | Chimie (cinétique) | Facteurs cinétiques & catalyse |
| `transformations-deux-sens` | Chimie (équilibres) | Transformations s'effectuant dans les deux sens |
| `etat-equilibre` | Chimie (équilibres) | État d'équilibre d'un système ($Q_r$, constante $K$, taux d'avancement) |
| `evolution-spontanee` | Chimie (équilibres) | Sens d'évolution spontanée (critère $Q_r$ vs $K$) |
| `reactions-acido-basiques` | Chimie (acido-base) | Réactions acido-basiques (pH, $pK_A$, dosage, diagramme de prédominance) |
| `esterification-hydrolyse` | Chimie (esters) | Estérification et hydrolyse (rendement, équilibre) |
| `piles` | Chimie (électro.) | Piles & transformations spontanées (f.é.m., pile Daniell) |
| `electrolyse` | Chimie (électro.) | Électrolyse & transformations forcées |

Note de classement ondes : un même exercice mêle souvent progressives et
périodiques. Convention : onde **sinusoïdale avec λ et N imposées** →
`ondes-mecaniques-periodiques` ; **retard/célérité sans périodicité** →
`ondes-mecaniques-progressives`. Un exercice peut être cross-listé (mention en
tête). De même, un exercice « radon/radium » recoupe souvent
`decroissance-radioactive` **et** `noyaux-masse-energie` — le classer par la
question dominante et signaler l'autre.

---

## 5. Fichiers de la banque
- `INDEX.md` — inventaire des sources, contrainte d'environnement, pipeline.
- `README.md` — ce document.
- `<slug>.md` — transcriptions par chapitre (voir table §4).
