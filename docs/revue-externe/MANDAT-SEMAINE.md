# Mandat de la semaine — ce que Antigravity et Gemini peuvent faire sans Claude

> Décision du propriétaire (2026-11-25) : Claude s'arrête pour la semaine ; le travail continue avec
> Antigravity et les outils Google (Gemini, NotebookLM, Drive). Ce mandat dit quoi leur donner, dans
> quel ordre, et ce qu'ils ne touchent pas. Branche de travail : `claude/vibrant-fermi-v1lxj5`
> (commit de départ : celui qui contient ce fichier). Rien ne va en production : `main` ne bouge pas.

## Où on en est

Douze leçons au format v3 sur l'aperçu (aucune liée depuis l'accueil). Les trois écrites le 2026-11-25
(`/pilote/dipole-rl`, `/pilote/transformations-non-totales`, `/pilote/complexes`) ont été relues par un
critique puis corrigées, mais **pas relues une seconde fois**. Deux plans attendent leur leçon :
[`acides-bases.md`](../refonte/specs/acides-bases.md) et
[`dosage-acido-basique.md`](../refonte/specs/dosage-acido-basique.md). État complet : [`ETAT.md`](../ETAT.md).

La leçon de la journée : **aucun contrôle automatique ne voit une réponse donnée avant la question**
(par un titre de partie, un sous-titre de scène, l'étape précédente, la forme des options), ni un
exercice dont deux réponses sont égales en valeur. Les trois listes du critique sont la grille à
réutiliser : [`rapports/16-relectures-pedagogiques.md`](rapports/16-relectures-pedagogiques.md).

## A. Antigravity — dans l'ordre

Chaque chantier sur sa branche `antigravity/<nom>`, en PR brouillon vers `claude/vibrant-fermi-v1lxj5`.
Avant de pousser, depuis `web/` : `npx next build`, `npx tsc --noEmit`, `node scripts/token-gate.mjs`,
`node scripts/contrast-gate.mjs`, `node scripts/syntaxe-vieux-moteurs.mjs` (« lookbehind dans src/ » à 0) ;
à la racine : `scripts/verif-commit.sh` et `node web/scripts/liens-fichiers.mjs --porte`. Ne citer comme
chemin que des fichiers qui existent. Ne jamais modifier `web/src/components/pilote/noyau.js`.

### A1. Seconde relecture des trois leçons du jour (lecture seule, un rapport)

```
Branche claude/vibrant-fermi-v1lxj5. Tu ne modifies aucune leçon : tu regardes, tu mesures, tu écris.
Lis d'abord docs/revue-externe/rapports/16-relectures-pedagogiques.md : ce sont les défauts trouvés à la
première relecture de trois leçons, tous dits corrigés. Ta tâche est de vérifier, sur l'aperçu et dans
le code, ce qu'il en reste.

Pour /pilote/dipole-rl, /pilote/transformations-non-totales et /pilote/complexes :
1. Reprends chaque point « Bloquant » et « À corriger » de la liste : « corrigé », « toujours là » ou
   « corrigé autrement », avec la clé de l'étape et une capture avant réponse (1280 px clair).
2. Parcours CHAQUE étape à question, à 1280 px et à 390 px, avec une seule question : un élève qui ne
   sait pas peut-il lire la réponse sur cet écran (titre de partie, titre et sous-titre de scène,
   légendes, lectures, figure) ou dans l'étape précédente (texte, note d'après, rétroactions) ?
3. Pour chaque jeu d'options : la bonne réponse est-elle la seule chiffrée, la plus longue, la seule
   justifiée ? un leurre annonce-t-il son erreur ? un leurre est-il contredit par l'écran ?
4. Joue les animations en mouvement réel (pas en mouvement réduit) : la séquence d'entrée, la
   révélation, les curseurs. Elles n'ont été vérifiées que dans leur état final. Signale tout ce qui
   saute, se chevauche ou montre la réponse en cours de route.
5. Fais 30 tirages de chaque exercice de ces trois leçons : deux réponses égales en valeur, énoncé mal
   formé, rétroaction qui ne correspond pas à la réponse choisie.

À rendre : docs/revue-externe/rapports/17-seconde-relecture.md, trié « bloquant / à corriger / à
discuter », avec un décompte par leçon.
```

### A2. Maquettes des trois scènes nouvelles à venir

```
Même cadre que tes maquettes précédentes (un composant par maquette dans
web/src/components/pilote/maquettes/, un onglet de plus dans /pilote/maquettes, aucune leçon touchée,
jetons seulement, clair et sombre, rien ne démarre seul, règles M1 à M9 de
docs/refonte/09-regles-du-mouvement.md).

1. L'axe des pH (plan docs/refonte/specs/acides-bases.md, scène « axe ») : un curseur de pH ; la
   frontière 7 ; un pK_A ; les domaines de prédominance ; le diagramme de distribution ; la zone de
   virage d'un indicateur. Aucune couleur nouvelle : la teinte s'écrit en toutes lettres.
2. Le dosage (plan docs/refonte/specs/dosage-acido-basique.md, scène « dosage ») : le montage, le
   bécher en jetons, le pH-mètre et la courbe pH = f(V_B), tout piloté par le seul volume versé.
3. Trois flacons, un seul K (même plan acides-bases, jeu « trio ») : trois concentrations, trois
   courbes de Q_r qui rejoignent la même valeur.

Pour chacune : l'état est une fonction d'un seul paramètre ; ce que la question demandera reste caché
derrière un paramètre « garde ». À rendre : les trois maquettes et un rapport
docs/revue-externe/rapports/18-maquettes-chimie.md (étape visée par sa clé, captures 1280 et 390,
taille de texte mesurée au téléphone).
```

### A3. La revérification déjà demandée (rapport 15)

Si elle n'est pas rendue : elle reste à faire, sur le commit de départ de ce mandat.

**Ce que Antigravity ne fait pas cette semaine** : écrire une leçon dans `web/src/components/pilote/`.
Les trois leçons écrites aujourd'hui sont sorties avec 7, 9 et 8 défauts bloquants malgré tous les
contrôles ; une leçon écrite sans la relecture qui suit ferait du travail à défaire.

## B. Gemini (conversation) et NotebookLM — vérifier les faits

Charger dans un carnet NotebookLM : les cadres de référence officiels 2025 (ceux recopiés dans
[`docs/referentiel/`](../referentiel/README.md)), les programmes et orientations pédagogiques de
2ème Bac, et les manuels marocains disponibles. Puis poser ces questions, **une par une, en exigeant
la source et la page** ; une réponse sans page citée ne compte pas.

Maths
1. Le théorème « toute suite croissante majorée converge » est-il admis ou démontré au programme ?
2. Quelle définition de exp attend-on en Sciences expérimentales (réciproque de ln, ou autre) ?
3. Complexes, tronc PC/SVT : la factorisation par une racine connue est-elle au programme ?
4. Complexes, SM : chercher δ par x² − y² et 2xy, somme et produit des racines — au programme ?
5. « Multiplier par i, c'est un quart de tour » : dans le chapitre de la forme algébrique, ou dans
   celui de la forme trigonométrique ?

Physique-chimie
6. Dipôle RL, SVT : qu'attend le correcteur pour « l'intérêt d'un montage RL » ?
7. Dipôle RL : sens de la flèche u_L et branchement de l'oscilloscope dans les sujets nationaux.
8. Chimie : les états physiques et le choix de la flèche (→ ou ⇄) sont-ils notés au barème ?
9. Dosage : critère de choix de l'indicateur attendu (« la zone de virage contient pH_E ») ; le
   dosage conductimétrique est-il exigible ?
10. pK_A de l'acide éthanoïque dans les sujets : 4,75, 4,79 ou 4,8 — lequel, quelle année ?

SVT
11. « Tétrade » ou « bivalent » : quel mot les manuels marocains emploient-ils ?

Histoire (sources primaires ou MacTutor, pas Wikipédia seul)
12. Cardan, 1545 : la forme exacte de la formule telle qu'il l'écrit ; le rôle de Bombelli (1572).
13. Wessel (1797/1799) et Argand (1806) : le plan complexe est-il venu après le calcul avec √−1 ?
14. Henry, 1832 : le texte sur l'étincelle de rupture, et son mois de parution.
15. Descroizilles et la burette (1791 ?) ; Brønsted et Lowry, 1923.

Ranger les réponses dans un document Drive « Faits vérifiés — semaine du 25 novembre » : la question,
la réponse en une phrase, la source, la page, une citation courte. C'est ce document que Claude
intégrera à la reprise (les points « à vérifier » de chaque plan).

## C. Le propriétaire, avec Gemini comme secrétaire

- [`docs/bible/QUESTIONS.md`](../bible/QUESTIONS.md) : y répondre, même en dictant ; c'est ce qui fait
  passer la bible de brouillon à référence.
- Décisions en attente (toutes ont un choix par défaut, pris si rien n'est dit) :
  les couleurs des indicateurs colorés (défaut : la teinte écrite, pas peinte) ; un mécanisme du lecteur
  pour retirer des étapes selon la filière (défaut : étapes marquées et sautables) ; le lien
  « Où j'en suis » (défaut : gardé, discret).
- Essayer les douze leçons sur un téléphone, en élève, et noter ce qui gêne : c'est le seul contrôle
  que personne n'a encore fait.

## À la reprise (Claude)

1. Lire les rapports 15, 17, 18 et le document « Faits vérifiés » ; corriger ce qu'ils trouvent.
2. Écrire la leçon acides et bases, puis le dosage, avec la relecture critique obligatoire.
3. Reprendre la série (une cinquantaine de notions restent à l'ancien format).
