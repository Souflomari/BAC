# Antigravity — mode d'emploi pas à pas

Ce document est fait pour être suivi **pendant** le travail, écran à
côté. Il répond à deux questions : comment brancher le dépôt, et quoi
taper exactement à l'agent.

À lire une fois avant de commencer : `docs/ops/DISTRIBUTED-BUILD.md`
(le pourquoi). L'agent, lui, lit `docs/ops/SCENE-CONTRACT.md` (le
comment).

---

## §0. Brancher le dépôt sur GitHub

**Oui, ça marche — et sans rien de spécial.** Antigravity est un
éditeur local (dérivé de VS Code) : il travaille sur un **clone local**
du dépôt. Git y est git. Il n'y a pas de « connecteur GitHub » à
configurer : il y a un dossier, une télécommande, des commits.

### Première fois

```bash
git clone https://github.com/Souflomari/BAC.git
cd BAC
git checkout claude/vibrant-fermi-v1lxj5     # la branche de travail en cours
git pull
```

Puis « Open Folder » sur `BAC` dans Antigravity.

- L'authentification GitHub se fait comme dans VS Code : le panneau
  Source Control propose de se connecter, ou bien on utilise un
  **Personal Access Token** en HTTPS, ou une **clé SSH** déjà en place.
  Si `git push` marche depuis le terminal intégré, tout est bon : c'est
  le seul test qui compte.
- **Reste sur `claude/vibrant-fermi-v1lxj5`.** La PR #2 est ouverte
  dessus ; y pousser fait avancer la même PR, et la CI (`gates.yml`)
  se déclenche toute seule à chaque push.

### Rythme

- `git pull` **avant** de lancer un agent.
- Un commit par bon de travail terminé, puis `git push`.
- Si deux agents ont tourné en parallèle, pousser l'un après l'autre :
  les seuls fichiers partagés sont `animations/manifest.yaml` (une
  ligne par scène) et `work-orders/LEDGER.md` (append-only). Les
  conflits, s'il y en a, se règlent à la main en dix secondes.

---

## §0bis. Sur Windows — régler le shell AVANT toute autre installation

**Rencontré en direct, 2026-08-12 : PowerShell fait tout échouer ici.**
`animations/render.sh` est un script bash (`#!/usr/bin/env bash`), et
toutes les commandes de ce document et des bons de travail utilisent
la syntaxe bash (`VAR=valeur commande`, `$(...)`, `for f in $(ls …)`).
PowerShell ne comprend rien de tout ça — ni `./render.sh` directement,
ni `QUALITY=l ./render.sh …`.

**Le remède : utiliser Git Bash, pas PowerShell**, pour tout ce qui
touche au dépôt. Git Bash est installé automatiquement avec « Git for
Windows » — donc déjà présent, puisque `git clone` a fonctionné.

1. Dans Antigravity : palette de commandes → *Terminal: Select Default
   Profile* → choisir **Git Bash**. Fermer le terminal PowerShell
   ouvert, en rouvrir un neuf : il doit s'ouvrir en Git Bash
   (l'invite ressemble à `soufiane.lomari@MACHINE MINGW64 ~/BAC`).
2. **Faire ça avant de lancer le moindre agent** — les agents héritent
   du terminal par défaut, et chaque commande d'un bon de travail est
   écrite en bash.
3. Si Git Bash n'apparaît pas dans la liste des profils : ouvrir le
   menu Démarrer de Windows, chercher « Git Bash », l'épingler — il
   est installé, juste pas encore proposé par Antigravity tant qu'on
   ne l'a pas ouvert une fois.

**Deux outils supplémentaires à installer, spécifiquement sur
Windows** (ni l'un ni l'autre n'est fourni par Git Bash) :

- **Docker Desktop** — https://docker.com/products/docker-desktop.
  L'installeur propose d'activer WSL2 : accepter, redémarrer si
  demandé. Vérifier ensuite, **dans Git Bash** :
  ```bash
  docker --version
  ```
  Si l'installation de Docker Desktop n'est pas possible (pas de
  droits admin, virtualisation désactivée au BIOS) : la voie native de
  `animations/SETUP.md` reste ouverte, mais LaTeX sur Windows (MiKTeX)
  est un téléchargement de plusieurs gigaoctets — prévoir le temps.
- **ffmpeg** (indispensable : c'est lui qui extrait les images pour
  l'audit) :
  ```bash
  winget install ffmpeg
  ```
  (`winget` est intégré à Windows 10/11 ; sinon, télécharger un build
  sur ffmpeg.org et l'ajouter au PATH). Vérifier : `ffmpeg -version`.

**Une fois Git Bash + Docker + ffmpeg en place**, reprendre le §1
ci-dessous DANS Git Bash — les commandes sont écrites pour lui.

---

## §1. Installation, une seule fois

### 1.1 La chaîne de rendu

C'est le vrai coût d'installation. Deux voies, détaillées dans
`animations/SETUP.md` :

- **Docker (recommandé)** — zéro dépendance à gérer, LaTeX compris :
  ```bash
  docker pull manimcommunity/manim:stable
  ```
  `animations/render.sh` détecte tout seul (`MODE=auto`) et bascule sur
  Docker si `manim` n'est pas installé en natif.
- **Natif** — plus rapide à l'usage, mais il faut Python ≥ 3.10,
  FFmpeg, LaTeX et Cairo/Pango. Voir `SETUP.md` pour la ligne
  d'installation de chaque système.

**Test d'installation** (doit produire une vidéo en moins de deux
minutes) :
```bash
cd animations
QUALITY=l ./render.sh scenes/maths/nombres-complexes-1/bk-2018-n-x2.py
```

### 1.2 Les portes doivent tourner

```bash
python scripts/scene-lint.py --all
python scripts/bank-fidelity.py content/maths/suites-numeriques/bank.yaml \
    bk-2020-n-x1 animations/scenes/maths/suites-numeriques/bk-2020-n-x1.py
```

La première commande doit afficher des erreurs « graduations
manquantes » (c'est normal, c'est le travail `BT-001`) ; la seconde doit
afficher « ✓ porte 4 franchie ». Si ces deux commandes tournent,
l'outillage est en place.

### 1.3 LE test qui décide de tout : l'agent voit-il les images ?

**Toute l'économie du plan repose là-dessus.** La porte 3 — l'audit
image par image — est la seule qui ne peut pas être automatisée. Si
l'agent ne peut pas *regarder* un PNG, il faudra me renvoyer les
audits, et le gain s'effondre.

Fais ce test **avant** de lancer quoi que ce soit d'autre. Rends une
scène déjà validée, extrais une image, et demande à l'agent de la
décrire :

```bash
cd animations
QUALITY=l ./render.sh scenes/maths/suites-numeriques/bk-2020-n-x1.py
cd ..
ffmpeg -sseof -0.15 -i animations/media/maths-suites-numeriques/videos/bk-2020-n-x1/480p15/sections/*_20-*.mp4 \
  -frames:v 1 -y /tmp/test-vision.png
```

Puis, à l'agent :

> Ouvre `/tmp/test-vision.png` et décris précisément ce que tu vois :
> combien de droites graduées, où sont les points et leurs étiquettes,
> et si une étiquette en chevauche une autre.

**S'il décrit correctement l'image** → tout le plan tient, continue.
**S'il ne peut pas l'ouvrir** → dis-le-moi : on bascule la porte 3 sur
Claude (échantillonnée, pas systématique) et on ajuste le budget.

---

## §2. Le préambule permanent

À coller **en tête de chaque agent**, avant le bon de travail. C'est ce
qui tient la qualité.

```
Tu travailles sur le dépôt BAC, une application de préparation au
baccalauréat marocain. Lis d'abord `docs/ops/SCENE-CONTRACT.md` EN
ENTIER : c'est la loi de fabrication, et chacune de ses règles vient
d'un défaut réel constaté à l'écran. Exécute ensuite le bon de travail
que je te donne.

Règles absolues :
- TOUT le contenu produit est en FRANÇAIS : commentaires de code,
  légendes, narration, messages de commit.
- Ne touche à AUCUN fichier que le bon ne nomme pas.
- Ne modifie ni le contrat, ni `animations/bac_scene.py`, ni une scène
  déjà marquée `validé` au manifeste — sauf si le bon le demande
  explicitement.
- La banque (`content/**/bank.yaml`) est la source de vérité et elle
  est VÉRIFIÉE : chaque nombre, chaque formule s'y recopie chiffre pour
  chiffre. Si elle te semble incohérente, ARRÊTE-toi et écris-le dans
  le bloc RÉSULTAT. Ne la corrige jamais.
- Écris le code par tranches d'environ 120 lignes, jamais un fichier
  entier d'un seul coup.
- Franchis les six portes du contrat DANS L'ORDRE et colle la SORTIE
  RÉELLE de chacune dans le bloc RÉSULTAT du bon. Ne déclare jamais
  une porte franchie sans sa sortie.
- Un seul rendu Manim à la fois sur cette machine.

Quand tu as fini, remplis le bloc RÉSULTAT du bon, ajoute une ligne à
`work-orders/LEDGER.md`, et fais UN commit.
```

---

## §3. Les prompts, dans l'ordre

### Étape 1 — `BT-000` : les gardes structurels

> [préambule du §2]
>
> Exécute `work-orders/BT-000-gardes-structurels.md`.

**Pourquoi en premier :** ce bon monte dans la classe de base les deux
remèdes aux défauts les plus coûteux de la campagne. Toutes les scènes
écrites ensuite en héritent gratuitement. Une heure de travail qui en
économise des dizaines.

**Ce que tu vérifies après :** les 16 scènes se chargent toujours, et
un rendu témoin donne toujours 43 sections. Le bon le fait dire à
l'agent — vérifie que la sortie est bien collée.

---

### Étape 2 — `BT-001` : les graduations

> [préambule du §2]
>
> Exécute `work-orders/BT-001-graduations.md`. Travaille notion par
> notion et fais un commit par notion (quatre commits en tout).

**C'est ta remarque sur les axes sans nombres.** Le lint confirme
qu'elle vaut pour les 14 scènes validées.

**Le piège de ce bon :** une graduation qui atterrit sous un point déjà
étiqueté est un défaut, et le lint ne peut pas le voir. L'agent DOIT
regarder les images des étapes où la figure est visible. Si son bloc
RÉSULTAT ne liste aucune collision trouvée sur 14 scènes, demande-lui
de refaire le contrôle visuel.

---

### Étape 3 — `BT-002` : finir les deux scènes en cours

> [préambule du §2]
>
> Exécute `work-orders/BT-002-scenes-en-cours.md`. Commence par la
> partie A (les correctifs de `bk-2019-n-x4`), fais-la valider, puis
> attaque la partie B (finir `bk-2023-n-x4`).

Deux agents ont été tués en plein travail ici ; le bon décrit
exactement ce qui reste. La partie A est du correctif ciblé, la partie
B est de l'écriture.

---

### Étape 4 — le flot normal (à répéter ~35 fois)

C'est le prompt que tu utiliseras le plus. Un bon, un agent.

> [préambule du §2]
>
> Exécute `work-orders/BT-<notion>-<entrée>.md`.

Les bons existent déjà, tous générés :

```bash
ls work-orders/BT-*.md          # 42 scènes en attente
cat work-orders/LEDGER.md       # où on en est
```

**L'ordre conseillé** est celui du manifeste : fonction-exponentielle →
calcul-integral → equations-differentielles → denombrement →
probabilites → arithmetique → structures-algebriques →
geometrie-espace (la 3D en dernier, c'est la plus dure), plus les six
entrées `nombres-complexes-2` restantes.

**Combien en parallèle ?** Deux ou trois agents, sur des bons
différents — mais **un seul rendu à la fois**. En pratique : lance
l'agent B pendant que l'agent A audite ses images (l'audit ne rend
rien).

---

### Étape 5 — quand un agent bloque

**Il signale une incohérence de banque :**
> Ne modifie pas la banque. Écris précisément dans le bloc RÉSULTAT :
> la ligne concernée, ce que dit la banque, ce que tu attendais, et
> pourquoi. Puis passe à la question suivante en laissant celle-là de
> côté, et signale-la dans ton commit.

C'est un point d'arbitrage : il remonte à Claude, pas à l'agent.

**Un rendu échoue bizarrement (erreur dvisvgm, LaTeX, fichier absent) :**
> Relance le rendu SEUL, sans rien changer au code, et dis-moi ce que
> donne la seconde tentative.

Une course entre deux rendus simultanés a déjà fait échouer un rendu
parfaitement sain. **Ne jamais diagnostiquer un échec de rendu avant de
l'avoir relancé seul.**

**Le lint refuse de passer :**
> Corrige la cause, pas le symptôme. N'ajoute jamais d'exception au
> lint et ne modifie pas `scripts/scene-lint.py` : si tu penses que la
> règle elle-même est fausse, arrête-toi et explique pourquoi.

---

## §4. Ton contrôle de 60 secondes, après chaque bon

Tu n'as pas à tout relire. Quatre réflexes :

1. **Le bloc RÉSULTAT contient-il de la vraie sortie de commande**, ou
   des affirmations ? Des phrases sans sortie collée = le travail n'est
   pas fini.
2. **Combien de défauts trouvés à la porte 3 ?** Sur une scène longue,
   *zéro* est suspect : sur 16 scènes auditées, deux seulement étaient
   propres du premier coup. Zéro veut souvent dire « je n'ai pas
   regardé ».
3. **`git diff --stat`** ne touche que la scène et le manifeste ?
4. **Regarde la vidéo finale**, ou au moins trois images au hasard.
   C'est toi le juge : l'élève, c'est ton élève.

Puis, à la fin d'un lot de cinq ou six bons, reviens me voir avec le
`LEDGER.md` : je prends une scène du lot, je la juge à fond, et si elle
tient, le lot passe. Si elle ne tient pas, le lot repart et le contrat
gagne une règle.

---

## §5. Dépannage

| Symptôme | Cause probable | Remède |
|---|---|---|
| `manim: command not found` | chaîne non installée | voie Docker (`SETUP.md`) |
| Erreur LaTeX / `dvisvgm` | course entre deux rendus | relancer le rendu **seul** |
| `np.trapz` introuvable | numpy ≥ 2 | `np.trapezoid` |
| Sections en trop / en moins | noms d'étapes dupliqués | `scripts/scene-lint.py` le dit |
| Rendus qui s'écrasent entre notions | même nom de fichier dans deux notions | toujours `--media_dir media/<matière>-<notion>` |
| Texte qui surimprime tout à partir d'une étape | chapitre sans `nettoie()` | contrat §2.1 (a) |
| Points/flèches qui flottent après un fondu | groupe de figure figé | contrat §2.1 (b) |
| La CI passe au rouge après un push | voir l'onglet Actions de la PR #2 | les flakes connus se relancent ; le reste se corrige |

---

## §6. Ce qui remonte à Claude, toujours

Ces cinq-là ne se délèguent pas :

1. **La vérification adversariale d'une transcription** (lire un scan
   et le retaper) — mode d'échec mesuré : ~1 erreur substantielle par
   3 exercices. Non négociable.
2. **L'arbitrage pédagogique** : une incohérence de banque, un doute
   sur le cadre, un barème qui ne tombe pas juste.
3. **Le contrat, `bac_scene.py`, les ADR** — ce sont les lois ; elles
   se changent délibérément, par un bon dédié.
4. **L'échantillon d'acceptation** par lot.
5. **Tout ce qui touche la production** : migrations, Supabase,
   déploiement. Poussée de production **humaine, toujours**.
