# ADR 0029 — Publier les explications animées : stockage, index, lecteur

**Date :** 2026-08-14
**Statut :** accepté (le téléversement et la migration restent sous porte humaine)
**Complète :** ADR 0028 (voie de l'explication animée) — dont le §6 laissait
le stockage explicitement différé et sous arbitrage owner.

## Contexte

La campagne d'explications animées est close : 53 bons de travail validés
et vérifiés, plus le pilote v4 fondateur (cf. `work-orders/LEDGER.md`).
Mais les scènes ne se voyaient nulle part sur le site, et pour une raison
simple : **rien ne les y menait**. L'état constaté avant cette décision :

- `animations/media*/` est dans `.gitignore` — **zéro `.mp4` versionné**.
  Chaque rendu vivait dans le conteneur qui l'avait produit, et mourait
  avec lui.
- Aucune étape de téléversement nulle part dans la chaîne.
- `bank.yaml` n'a aucun champ pointant vers une vidéo (ni le schéma de
  `BANK-SPEC.md`, ni les fichiers).
- `web/src` ne contenait **aucune** référence à Manim, aux animations ou
  aux explications : pas de lecteur, pas de récupération, rien.

Ce n'était pas un oubli : l'ADR 0028 §6 avait sciemment gelé le choix de
stockage jusqu'à un arbitrage owner. Cet ADR le tranche et construit le
pont manquant, de bout en bout.

## Décision

### 1. Stockage : Supabase Storage, bucket public `explications`

Retenu contre les deux autres candidats :

- **Versionner les `.mp4`** — écarté. Une explication en 720p30 pèse
  ~10-30 Mo ; 54 scènes ≈ 1 Go de binaire dans l'historique git, à jamais.
- **`web/public/`** — écarté pour la même raison, aggravée : tout passerait
  dans le bundle de déploiement Vercel à chaque build.
- **Supabase Storage** — retenu. C'est déjà le backend du projet (aucun
  fournisseur nouveau, aucune ligne de coût nouvelle), le CDN est inclus,
  et le contenu étant public, **le site n'a besoin d'aucune clé pour
  lire** : l'URL publique suffit.

Le bucket est créé par
`backend/supabase/migrations/051_explications_storage_bucket.sql`, avec
la posture de sécurité écrite dans la migration elle-même :

- **lecture publique**, bornée à ce bucket (jamais un SELECT global) ;
- **écriture service_role uniquement** — aucune politique
  INSERT/UPDATE/DELETE n'est créée, et sous RLS l'absence de politique
  vaut refus. Le bloc VERIFY **assert que ce compte vaut zéro**, pour que
  l'ajout ultérieur d'une politique d'écriture « anodine » fasse échouer
  la migration au lieu de passer inaperçu.

`SUPABASE_SERVICE_ROLE_KEY` ne sert qu'au poste de publication. Elle
n'atteint jamais Vercel — le site ne lit que des URLs publiques.

### 2. L'index publié est la source de vérité du produit — pas le manifeste

`animations/manifest.yaml` dit quelles scènes sont **écrites et validées**.
Cela n'implique pas qu'elles soient **rendues et téléversées**. Confondre
les deux produirait exactement le défaut que ce projet combat : une
interface qui affirme plus que la réalité.

Le site ne lit donc jamais le manifeste. Il lit `animations/published.json`,
écrit par le script de publication **après** un téléversement réussi. Une
scène validée mais non publiée n'a **aucun lecteur** sur sa fiche : pas de
lecteur vide, pas de « bientôt disponible », pas de 404 déguisée. Rien.
C'est la règle d'état honnête, appliquée telle quelle.

L'index est versionné (c'est de la métadonnée, quelques Ko) et fusionné à
chaque publication : publier un lot ne dépublie pas le reste.

### 3. Le transcript est extrait des scènes, pas réécrit

L'ADR 0028 §3 impose un transcript (repli `prefers-reduced-motion`,
accessibilité). Il existait déjà, sans qu'on l'ait vu : les auteurs
écrivent la narration dans les scènes, sous deux formes —
`self.legende("…")` (registre oral, affiché à l'écran) et, pour 23 scènes,
un dict `NARRATION` de prose complète, précisément celui que l'ADR 0028
demandait « dès le premier jour ».

`scripts/publish-explications.py` relit donc chaque scène **en AST** et
récupère, étape par étape, ces deux sources. Mesure sur les 54 scènes :
**1387 étapes, 2280 segments de narration.** Les seules étapes sans
narration sont les cartes de titre et de bilan — qui n'en ont
légitimement pas, et qui retombent sur un libellé dérivé du slug.

Ce choix évite de réécrire 54 scènes pour un transcript qu'elles portaient
déjà. Il refuse aussi d'inventer : une valeur non résoluble (f-string,
variable locale) est laissée vide plutôt que devinée.

### 4. Le lecteur est derrière la garde « tentative d'abord »

**C'est la contrainte qui prime sur toutes les autres.** L'explication
animée EST le corrigé : elle déroule l'exercice entier, question après
question. L'exposer avant la tentative reviendrait à publier le
raisonnement dans le DOM avant le commit — ce que tout le produit
s'interdit.

Le lecteur porte donc sa propre porte, avec la formulation des autres
portes du site (« J'ai fait ma tentative — voir l'explication animée »),
et **rien de la vidéo n'est monté avant le clic** : ni `<video>`, ni URL,
ni transcript. Il est rendu **après** les questions dans la carte, jamais
avant.

Le reste du contrat de lecteur calme de l'ADR 0028 est tenu : aucune
lecture automatique au montage ; un clip par étape qui s'arrête et attend ;
« Étape n / N » avec la grammaire de transport existante
(`TransportButton`, aria-live polite, pas de flèches clavier — elles
appartiennent au transport de chapitre) ; `prefers-reduced-motion` bascule
sur affiche + transcript intégral, sans vidéo ; la vidéo complète reste
offerte en mode secondaire ; `preload="none"` pour ne pas tirer des
mégaoctets sur une carte que l'élève n'ouvrira pas.

**Constat à consigner — la garde attempt-first protège le RENDU, pas la
TRANSMISSION.** En vérifiant le lecteur sur le DOM réel, une sonde a
d'abord signalé une fuite : les URLs des vidéos apparaissent dans la page
avant le commit. Vérification faite, elles sont dans la charge utile RSC
(`<script>`), jamais dans le markup rendu — et **le texte du raisonnement
expert fuit exactement de la même façon**, depuis toujours : le lecteur
est un composant client, ses props sont sérialisées par Next.js, comme
celles de `AttemptFirstExercise`. Le garde-fou dom-truth existant mesure
le DOM rendu, pas la charge utile.

Autrement dit : la garantie réelle du produit est « rien n'est *affiché*
avant la tentative », pas « rien n'est *transmis* ». La vidéo n'y change
rien et n'est pas le maillon faible — une URL est moins exposante que le
corrigé en toutes lettres, déjà présent. Ce n'est donc pas un défaut
introduit ici, et il aurait été incohérent de tenir la vidéo à un
standard plus strict que la réponse elle-même. Mais l'écart n'était écrit
nulle part : il l'est maintenant. S'il faut le fermer un jour, cela
concerne d'abord le raisonnement, et cela se traite en une fois pour
toutes les surfaces (chargement à la demande après commit), pas
lecteur par lecteur.

Nuance assumée sur « aucune lecture automatique » : la lecture ne démarre
que sur un **geste délibéré** de l'élève (le clic sur « Suivant »). Au
montage et à l'ouverture du lecteur, rien ne démarre. Exiger deux clics
par étape (Suivant, puis Lecture) dégraderait l'expérience de pas-à-pas
sans rien protéger — l'interdit visé est la lecture non sollicitée, pas
la continuité d'un geste demandé.

## Ce qui reste sous porte humaine

Rien de ce qui suit n'a été exécuté ; tout est prêt à l'être en session
supervisée :

1. **La migration 051** — comme toute migration, elle ne s'applique pas
   toute seule. La synchronisation prod est par ailleurs **non vérifiée**
   après une longue dormance (CLAUDE.md) : à confirmer avant.
2. **Le téléversement** — `scripts/publish-explications.py` est en
   `--dry-run` par défaut ; le téléversement exige `--confirm` **et** les
   deux variables d'environnement.
3. **Le rendu 720p30 des 54 scènes** — long (plusieurs heures, un rendu à
   la fois : la course dvisvgm est réelle et documentée). À lancer par
   lots.

L'index `published.json` est donc committé **vide**. C'est l'état honnête
et exact : à ce jour, aucune explication n'est en ligne.

## Conséquences

- Le jour où le lot est téléversé, les explications apparaissent sur les
  fiches sans autre changement de code : l'index pilote tout.
- Une scène corrigée se republie sans purge (`x-upsert`).
- Le coût de stockage devient une ligne réelle à surveiller (~1 Go).
- `BANK-SPEC.md` n'a pas bougé : aucun champ vidéo n'a été ajouté à
  `bank.yaml`. Le lien passe par le manifeste puis l'index — le contenu
  reste ce qu'il était.

## Retractions and Corrections

Aucune à ce jour.
