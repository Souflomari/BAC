# ADR 0034 — L'instrument qui ne s'entendait pas crier

**Date :** 2026-09-20 · **Statut :** accepté (prolonge ADR 0031 et ADR 0033,
dont il ne contredit rien) · **Preuves :** `docs/HANDOFF.md` §11.103 à §11.106 ·
**Instruments :** `essai-rouge` (pré-contrôle + `spawnSync`), `essais-rouges`
(la suite et son manifeste), `indice-refus`, `eleve-ruse`

## Contexte

ADR 0031 exige qu'une porte **puisse devenir ROUGE**. ADR 0033 a montré trois
façons pour une porte verte de ne rien garantir : MORTE, AVEUGLE, ou exacte sur
une autre question. `essai-rouge.mjs` a été écrit pour établir la première
propriété sans perdre de travail.

**Il ne l'établissait pas.** Trois essais rouges ont été déclarés, écrits dans
`HANDOFF`, committés et poussés, sur des portes qui n'avaient pas tourné une
seule fois. La journée qui a suivi a servi à comprendre pourquoi — et ce qu'il
faut changer pour que la question « cette porte crie-t-elle encore ? » ait une
réponse dans six mois.

## Décisions

### 1. Un essai rouge ne prouve rien sans le vert d'avant

`execSync` ne distingue pas « la porte a tourné et a échoué » de « la commande
n'a jamais tourné ». Lancé depuis `web/scripts/` au lieu de `web/`, un
`node scripts/<une-porte>.mjs` sort en `ERR_MODULE_NOT_FOUND` — code non nul —
et l'outil annonçait « ✓ la porte est passée ROUGE, elle VOIT ce défaut ».

**Un essai rouge doit d'abord lancer la porte sur l'arbre INTACT et exiger
qu'elle soit VERTE**, avec cette commande-là et depuis ce répertoire-là. Sinon
il n'a rien mesuré et doit le dire. Le vert d'avant fait partie de la mesure ;
il n'en est pas le décor.

C'est le cas MORT d'ADR 0033, tombé à l'intérieur de l'instrument écrit pour le
détecter ailleurs.

### 2. L'échec d'un essai est AMBIGU — diagnostiquer, pas réparer

Un ✗ ne dit pas « la porte est aveugle ». Il dit **« la porte OU l'essai est
faux »**. Sur les six premiers essais de la suite, **la moitié des ✗ venait de
l'essai** : une occurrence sans le chiffre qu'exigeait le motif, une ligne dont
je retirais le mot daté mais qui en gardait un autre.

Sans ce réflexe, on « répare » des portes qui marchent — et on les casse.

### 3. Un seuil anti-bruit appartient à une MESURE, jamais à un CLIQUET

Le second sens du cliquet `indice-refus` surveillait une FIABILITÉ sous garde
`tranche ≥ 4`. Or aucune notion à quatre items qui tirent ou plus n'a de refus
vrai : les dix-neuf sont déjà à 100 %, **au plafond**. La fiabilité ne pouvait
pas monter ; le sens ne pouvait pas crier. Il était armé et inerte.

Un seuil se justifie sur une mesure — un pourcentage sur petit effectif est du
bruit. **Sur un cliquet, qui compare une chose à son propre passé, il n'y a pas
de bruit à filtrer : il y a un changement, ou il n'y en a pas.** Le seuil n'y
protège de rien et y cache tout. Remplacé par un comptage direct, sans seuil.

### 4. Une porte a QUATRE verdicts honnêtes, pas deux

- **ROUGE** — elle fait échouer.
- **AVERTI** — elle reste verte ET son avertissement APPARAÎT. Certaines
  avertissent par dessein. **Un avertissement supposé n'est pas une propriété ;
  un avertissement vu en est une**, et il se vérifie contre le texte émis.
- **VERTE** — ambigu (décision 2).
- **MUET** — le motif de l'essai n'existe plus dans le corpus : rien n'a été
  cassé, donc **rien n'a été mesuré**. Sans ce verdict, un essai périmé se
  confond avec un succès.

Corollaire opérationnel : un instrument qui mesure une porte doit capter
**stdout ET stderr, dans les deux cas**. `execSync` ne rend que stdout quand la
commande réussit — les avertissements, qui vont sur stderr, étaient donc
invisibles précisément dans le cas où ils comptent.

### 5. Les essais rouges sont une SUITE, pas une phrase

« Porte vérifiée rouge » dans un document est un souvenir, pas une propriété :
invérifiable plus tard, et faux le jour même dans trois cas sur trois.

**Toute porte armée est inscrite à `essais-rouges.manifeste.json`** — six lignes
de JSON — et la CI relance les essais à chaque passage. Le bénéfice est la seule
chose qui manquait : **la vérification survit à celui qui l'a faite.**

### 6. Un motif et son prétraitement sont une seule chose

La porte §11.100 (c) ancre sur `\n\n`, une ouverture de paragraphe. La ligne
au-dessus aplatissait le texte avec `/\n\s+/g` — et `\n` est un caractère
d'espacement. **L'aplatissement mangeait l'ancre du motif.** La porte était
armée et aveugle depuis son écriture.

L'aplatissement avait sa raison : deux autres motifs TRAVERSENT un pli YAML et
ne voient rien sans lui. **Aucun texte unique ne convenait aux trois.** Chaque
motif déclare désormais le texte qu'il lit.

**On ne relit pas un motif seul : on relit le motif ET la chaîne qu'on lui
donne.**

### 7. L'union des contournements se mesure à part

Trois instruments mesuraient chacun UNE ficelle de QCM et rapportaient leur
tranche. **Personne n'avait mesuré leur union** — alors qu'un élève ne choisit
pas une ficelle, il les applique toutes. Mesuré : **31,9 % contre 25 % au
hasard**, sept points gagnés sans rien savoir.

Et l'apport propre d'une porte d'union se mesure aussi : une seule casse
(l'écho d'un mot du tronc, à longueur identique) la fait crier pendant que les
trois portes par ficelle restent vertes. **Ce qu'une porte garde EN PLUS des
autres est une mesure, pas un argument.**

### 8. Quand la stratégie ne lit pas la réponse, le hasard est un théorème

`eleve-ruse` arrête un ensemble de finalistes à partir des seuls textes, puis
tire dedans. Il ne lit jamais `correct`. Si la clé était tirée au sort parmi les
n choix, l'espérance vaudrait **exactement 1/n**.

La référence n'est donc pas une convention qu'on pourrait contester : c'est une
conséquence de la construction. **Un écart à une référence démontrée vaut
autrement qu'un écart à une référence supposée** — et quand on peut s'arranger
pour que la référence soit démontrable, il faut le faire.

### 9. Une alerte qui se déclenche quand on travaille est une alerte morte

*(Décision ajoutée en fin de journée : le cas s'est présenté TROIS fois après la
rédaction des huit premières.)*

- Le tampon de build de `dom-truth` comparait deux sha : un commit de
  documentation le faisait rougir sans qu'un pixel change (§11.110).
- Le contrôle de propreté d'`essais-rouges` interrogeait `git status` : un
  fichier porteur de modifications VOULUES et non committées lui faisait
  annoncer « la restauration a échoué » sur un essai parfaitement restauré
  (§11.112) — dans un outil écrit deux heures plus tôt.
- `cibles-tactiles` signalait le lien d'évitement en `sr-only` sur CHAQUE page,
  un faux positif par construction (§11.111).

**Le correctif est le même à chaque fois : faire dire à l'instrument SUR QUOI il
se prononce, pas seulement OUI ou NON.** Le tampon nomme les fichiers qui ont
changé ; la suite compare les octets d'avant et d'après plutôt que l'état vis-à-
vis de git ; l'exemption tactile reconnaît la TECHNIQUE (`clip` sur un élément
de 1×1) et non le libellé.

Le coût d'une fausse alerte n'est pas les trente secondes qu'elle prend. C'est
qu'elle enseigne à ne plus lire — et une porte qu'on ne lit plus ne garde rien,
exactement comme une porte qui ne peut pas crier.

**Corollaire, qui va dans l'autre sens.** Une fausse alerte NOMMÉE reste
préférable à un silence non prouvé. `dom-truth` refuse toujours de valider un
build dont un fichier de `web/scripts/` a bougé, alors que presque rien de ce
répertoire n'entre dans le build — parce que `generate-tokens.mjs` y entre, et
qu'exclure le répertoire en bloc échangerait une alerte lisible contre un
silence. **Sur une porte de déploiement, le doute se dit ; il ne se tait pas.**

### 10. Un fichier généré et committé est une affirmation datée

`build-learner-inputs.mjs` porte en majuscules, depuis toujours, « REGENERATE
WHENEVER items.yaml or checkpoints.yaml CHANGE ». C'est l'endroit le plus
visible possible pour une instruction. **Les trois artefacts avaient dérivé
quand même** — et l'un d'eux déclarait une misconception évaluable (3 items)
quand le corpus n'en avait plus qu'un (§11.113).

ADR 0031 : un renvoi est une instruction. **Une instruction de RÉGÉNÉRATION n'en
est pas moins une, et comme les autres elle ne vaut que si quelque chose la
vérifie.** Tout fichier généré puis committé affirme quelque chose sur sa
source ; sans porte qui recompare, c'est une affirmation datée du jour où on l'a
écrite.

La porte ne se contente pas de dire « ça diffère » : elle nomme le pire écart et
signale s'il FRANCHIT un seuil de décision — ici le plancher de trois, qui
sépare « le produit peut remédier » de « le produit n'a rien pour remédier ».

## Conséquences

- Coût : six lignes de JSON par porte armée, et une exécution de plus dans la
  batterie (15 portes).
- Les portes armées avant ce jour ont été repassées : **douze vérifiées, une
  trouvée armée et aveugle (§11.100 c), une trouvée armée et inerte
  (`indice-refus` second sens), une confirmée AVERTISSEMENT par dessein
  (§11.71).**
- `indice-refus` et `eleve-ruse` entrent dans `gates.yml` et dans
  `batterie-locale`. En fin de journée s'y ajoutent `porte-engagement`,
  `build-learner-inputs --verifie` et le troisième sens d'`indice-absolu` :
  **17 portes, 21 essais rouges inscrits.**

## Rétractations et corrections

- **§11.103, première version — RÉTRACTÉE sur ses essais rouges.** Elle
  annonçait deux sens de cliquet « vérifiés rouge ». Les deux essais n'avaient
  pas eu lieu (décision 1), et refaits, **les deux sens étaient faux** : l'un
  cassait le mauvais item, l'autre était structurellement inerte (décision 3).
  Le fait mesuré de §11.103 — 150 items, le refus est la clé deux fois — n'est
  pas touché : il ne dépendait pas de ces essais.
- **ADR 0033 n'est pas corrigé mais élargi.** Ses trois cas (MORTE, AVEUGLE,
  exacte sur une autre question) tiennent. Ce jour en ajoute un quatrième, qui
  n'est pas un état de la porte mais de sa VÉRIFICATION : **la porte non
  mesurée, dont on croit savoir qu'elle crie parce qu'on l'a écrit une fois.**
