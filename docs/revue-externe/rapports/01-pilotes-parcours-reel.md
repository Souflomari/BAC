# Rapport 01 — Parcours réel des trois pilotes (leçons et exercices)

**Date** : 2026-11-22  
**Branche auditée** : `claude/vibrant-fermi-v1lxj5` (`7b461db9`)  
**Périmètre** : `/pilote/logarithme`, `/pilote/radioactivite`, `/pilote/expression-genetique` et leurs pages `/exercices` associées, parcourus de bout en bout dans Chromium comme un élève en difficulté (erreurs volontaires, second essai, indices, retours arrière, fiches-mots, interactions, thèmes clair et sombre, ordinateur `1280×800` / `1366×768`, fenêtre intermédiaire `900–1024 px` et téléphone `390×844`, animations en temps réel sans `prefers-reduced-motion`).

---

## Synthèse (5 lignes)

Le socle des trois pilotes est solide : sur **165 étapes** et **35 exercices** (10 500 tirages vérifiés), aucune erreur JavaScript ni KaTeX n'est apparue, le rythme pédagogique porte vraiment la compréhension et le thème sombre des leçons est très soigné.  
Mais le parcours réel **sur téléphone** se heurte à deux blocages francs : l'en-tête fixe `bac.` recouvre le haut de la scène collée dès qu'on fait défiler (jusqu'à 37 étapes sur 56 en Physique), et `inputMode="decimal"` empêche de saisir les signes `−` et les puissances de 10 dans 11 exercices et à l'étape 38 de Physique.  
Sur **les exercices**, ouvrir « Voir la correction rédigée » après avoir réussi du premier coup dégrade injustement le bilan en « correction consultée », `exercices.css` n'a pas reçu l'adoucissement sombre de la V3, et plusieurs messages renvoient vers un bouton « Un indice » inexistant ou déjà ouvert.  
En **temps réel** (hors `reduced-motion`), 6 étapes en Maths et 19 en SVT étirent leur animation sur 4 à 10 secondes en laissant des phrases invisibles alors que `Suivant →` est déjà actif, sans bouton « Rejouer ».  
Ces angles morts s'expliquent par les limites des scripts de contrôle actuels, qui tournent en mouvement réduit, sans défilement de scène mobile et sans parcours interactif complet des exercices.

---

## Les 5 changements qui auraient le plus d'effet

1. **Corriger la collision `SiteHeader` / `.stage-wrap` sur téléphone (`G-01-001`)** : poser `.stage-wrap { top: 56px }` (hauteur de `SiteHeader`) ou masquer/détacher l'en-tête global sur les routes pilotes mobiles, et ajuster `scroll-margin-top` en conséquence.
2. **Débloquer la saisie mobile sur les exercices négatifs et scientifiques (`G-01-002`, `G-01-011`)** : retirer `inputMode="decimal"` (ou passer à `inputMode="text"`) dès qu'un champ attend un signe `−`, une fraction `/` ou une écriture scientifique `× 10^`, et accepter `10^k` sans mantisse dans `lireNombre`.
3. **Ne plus pénaliser la lecture de la correction rédigée après réussite (`G-01-003`)** : dans `ExercicesPilote.tsx`, ne classer en `corrige` que si l'élève consulte la correction **avant** d'avoir trouvé toutes les réponses (et ajouter un lien « ← Revoir la leçon » dans `.exos-barre`, `G-01-007`).
4. **Rendre visible la progression des phrases synchronisées et offrir un vrai « Rejouer » (`G-01-004`)** : raccourcir les séquences > 5 s ou signaler qu'une phrase arrive, et ajouter un contrôle « Rejouer l'étape » qui relance l'animation et la synchronisation du texte (règle 5 de `02-comprendre-en-profondeur.md`).
5. **Aligner la finition des exercices et des écrans interactifs (`G-01-005`, `G-01-008`, `G-01-009`, `G-01-010`)** : adoucir `.dark .exos` comme `.dark .pilote`, appeler `ctx.voir($('#agfb'))` dans l'atelier SVT, ne plus trahir le décalage par l'absence d'espaces dans l'exercice 8 de SVT, et conditionner la mention « ou demande un indice » à l'existence d'un indice non ouvert.

---

## Ce qui fonctionne déjà très bien (bref état des lieux)

- **Stabilité technique** : `0` erreur console/page et `0` erreur KaTeX sur l'ensemble des 6 routes parcourues dans tous les formats ; `node --no-warnings scripts/pilotes-exercices.mjs` passe ses 10 500 tirages sans défaut.
- **Thème sombre des leçons** : les mélanges de jetons introduits en V3 dans `pilote.css` rendent les scènes SVG (dés, courbes, ribosome, atelier, désintégrations) lisibles et reposantes ; les figures SVG des exercices de Physique (ex. 4 et 11) passent aussi proprement en sombre.
- **Pédagogie active** : le second essai avec pièges ciblés, la différence visuelle nette entre pari et « Vérifie », les fiches-mots ouvrables sans quitter l'étape (qui se calent proprement au-dessus de `.nav` une fois le défilement fluide terminé) et la transparence sur les exercices de séance 2 fonctionnent réellement bien pour un élève qui hésite.

---

## Partie 1 — Faits vérifiables

> Chaque constat ci-dessous a été observé en direct dans Chromium sur le serveur applicatif local et confirmé dans le code source. Les points déjà traités ou explicitement reportés dans `docs/refonte/05-audit-v2-plan-v3.md` ne sont pas repris, sauf lorsqu'une correction V3 échoue en pratique (cas signalé explicitement).

---

### G-01-001 — Téléphone : l'en-tête fixe `bac.` recouvre le haut de la scène collée (échec partiel de la correction V3)
- **Gravité** : BLOQUANT
- **Où** : `web/src/app/pilote/logarithme/pilote.css:245` et `web/src/components/ui/SiteHeader.tsx:501` — routes `/pilote/logarithme`, `/pilote/radioactivite`, `/pilote/expression-genetique` en `390×844`
- **Constat** : La V3 (`05-audit-v2-plan-v3.md` §3.1) a posé `.pilote .stage-wrap { position: sticky; top: 0; z-index: 3; }` pour garder la scène visible sur téléphone. Or `SiteHeader` est lui-même `sticky top-0 z-header` d'une hauteur de `56 px` (avec un `z-index` supérieur). Dès que la page défile de plus d'une centaine de pixels — ce qui arrive automatiquement via `voir()` dès qu'on répond à la question de l'étape 1 ou qu'on ouvre une fiche-mot —, la scène se colle à `top: 0` **sous** `SiteHeader`, qui en masque les `56 px` supérieurs (titres SVG coupés en deux).
- **Preuve** :
  - Reproduction : ouvrir `/pilote/radioactivite` en `390×844`, répondre à l'étape 1 (`sav-test`) ou ouvrir la fiche-mot `noyau`, puis observer le haut de la scène.
  - Mesures automatisées sur le parcours complet `390×844` (`header.bottom - stage.top = 57 px`) : titres SVG coupés sous `SiteHeader` sur **37 étapes sur 56** en Physique (ex. étape 1 « Un atome de carbone 14 », étape 5 « La plaque de Becquerel », étape 38 « Un échantillon d'iode 131 »), **9 étapes sur 55** en Maths (ex. étape 1 « Ce qu'il faut savoir : les puissances », étape 15 « valeur 1,01^k — on multiplie par 1,01 ») et **6 étapes sur 54** en SVT (ex. étape 38 « Atelier : les triplets 1 à 7, comptés depuis le premier montré »).
  - Confirmé visuellement sur les captures `390×844` en thèmes clair et sombre.
- **Proposition** : Sur `@media (max-width: 899px)`, caler `.pilote .stage-wrap { top: var(--header-h, 56px); }` (avec un ajustement de hauteur de scène, par ex. `grid-template-rows: 38vh auto`, et `scroll-margin-top: calc(38vh + 56px + 12px)`), ou rendre `SiteHeader` non-sticky sur les routes pilotes mobiles pour préserver toute la hauteur utile d'écran.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-002 — Téléphone : `inputMode="decimal"` bloque la saisie des nombres négatifs et de l'écriture scientifique
- **Gravité** : BLOQUANT
- **Où** : `web/src/components/pilote/ExercicesPilote.tsx:308` (`inputMode={q.type === "texte" ? "text" : "decimal"}`) et `web/src/components/pilote/radioactivite-moteur.js:588` (`<input id="n0in" type="text" inputmode="decimal" placeholder="par exemple 3,2 × 10^12">`)
- **Constat** : Tous les champs numériques des exercices et le champ `N₀` de l'étape 38 en Physique imposent `inputMode="decimal"`. Sur clavier virtuel mobile (iOS Safari et Android Gboard), `inputMode="decimal"` n'affiche que les chiffres `0–9` et le séparateur décimal : **aucune touche `−`, `e`, `^`, `×`, `*` ou `/`** n'est disponible. Un élève sur téléphone ne peut donc pas taper les réponses attendues.
- **Preuve** :
  - En Physique leçon, étape 38 (`masse`), le `placeholder` indique explicitement `"par exemple 3,2 × 10^12"` et la réponse attendue est `4,6 × 10^15` (ou `4,6e15`), alors que l'attribut DOM mesuré est `inputmode="decimal"`.
  - Sur les 40 tirages testés par exercice dans le catalogue (`web/src/components/pilote/exercices/`), **11 exercices** sur 35 exigent soit un signe moins, soit une écriture scientifique avec `inputMode="decimal"` :
    - **Maths (6 exercices avec réponses négatives)** : ex. 2 (`ln-quotient`, ex. `−1,35`), ex. 3 (`ln-somme`, ex. `−0,74`), ex. 5 (`ln-signe`, ex. `−2`), ex. 6 (`ln-domaine`, ex. `−1`), ex. 7 (`ln-simplifier`, ex. `−1,5`), ex. 13 (`ln-tangente`, ex. `−0,31`).
    - **Physique (5 exercices avec négatif ou écriture scientifique)** : ex. 2 (`equation-desintegration`, `Z = −1`), ex. 5 (`lambda-unites`, ex. `9,08 × 10^8`), ex. 6 (`n0-masse-activite`, ex. `1,67 × 10^16`), ex. 8 (`desintegres-entre-dates`, ex. `4,0 × 10^16`), ex. 11 (`bac-complet`, ex. `3,44 × 10^16`).
- **Proposition** : Utiliser `inputMode="text"` (ou `inputMode="decimal"` uniquement quand la question garantit un positif décimal simple, via une propriété explicite sur la question). Pour les grandeurs en écriture scientifique, proposer en complément un mini-bouton d'insertion `× 10^` (ou deux champs mantisse / exposant) est un plus appréciable sur téléphone.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-003 — Exercices : cliquer « Voir la correction rédigée » après réussite dégrade la note en « correction consultée »
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/ExercicesPilote.tsx:43-49` (`bilan()`) et `:366-368` (`Voir la correction rédigée`)
- **Constat** : Lorsqu'un élève réussit toutes les questions d'un exercice du premier coup, le bouton de bas d'exercice change de libellé et l'invite à cliquer : `Voir la correction rédigée` (pour vérifier la rédaction type bac). Dès qu'il clique dessus, `e.correction` passe à `true` et la fonction `bilan()` renvoie `"corrige"` en priorité absolue (`if (e.correction) return "corrige"`). La pastille passe aussitôt de « réussi du premier coup » (`b-premier`) à « correction consultée » (`b-corrige`), et le bilan final comptabilise l'exercice dans « avec la correction ».
- **Preuve** :
  - Reproduction vérifiée dans Chromium sur `/pilote/logarithme/exercices`, exercice 4 (`Vrai ou faux : les règles de ln`) :
    - Avant clic sur `Voir la correction rédigée` : pastille `class="exos-pastille b-premier on"`, `aria-label="Exercice 4 : Vrai ou faux : les règles de ln — réussi du premier coup"`.
    - Après clic : pastille `class="exos-pastille b-corrige on"`, `aria-label="Exercice 4 : Vrai ou faux : les règles de ln — correction consultée"`, et ligne 4 du bilan final marquée `b-corrige` / `correction consultée`.
  - Code en cause (`ExercicesPilote.tsx:43-45`) : `if (e.correction) return "corrige";` est testé **avant** `if (e.q.every((x) => x.juste))`.
- **Proposition** : Distinguer dans l'état `correctionAvantReussite` (ou ne mettre `corrige` que si la correction a été ouverte alors qu'au moins une question n'était pas encore `juste`). Si toutes les questions sont déjà réussies au moment du clic sur « Voir la correction rédigée », conserver le statut `premier` ou `apres`.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-004 — Temps réel : longues séquences animées (4 à 10 s) cachant des phrases alors que `Suivant →` est déjà cliquable, sans bouton « Rejouer »
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/noyau.js:123-133, 212-216`, `web/src/components/pilote/PiloteCoquille.tsx:131-138`, `logarithme-moteur.js` et `expression-genetique-moteur.js`
- **Constat** : En vitesse réelle (sans `prefers-reduced-motion`), les phrases marquées `a: k` restent invisibles (`.say.later { opacity: 0 }`) jusqu'au passage du temps correspondant de la séquence SVG, mais le bouton `Suivant →` est déjà actif dès le chargement de l'étape (sur les étapes sans pari/contrôle). Aucun indicateur ne signale qu'il reste du texte à apparaître : un élève qui lit la première phrase et clique `Suivant →` au bout de 3 secondes rate les phrases suivantes (y compris des phrases clés marquées `fort: true`). De plus, il n'existe **aucun bouton « Rejouer »**, en écart avec `docs/refonte/02-comprendre-en-profondeur.md` §3.1 et §4.3 règle 5 (« Rejouer l'étape et Précédent, toujours ») ; faire `← Retour` puis `Suivant →` ne rejoue pas la synchronisation du texte car `S.vu[st.k]` est déjà à `true`.
- **Preuve** :
  - Durées mesurées en temps réel (`reducedMotion: "no-preference"`) jusqu'à `S.vu[st.k] === true` :
    - **Maths** : `147,9 s` d'animations au total ; **6 étapes ≥ 7 s** : étape 16 (`gunter`) `9,9 s`, étape 29 (`derivee`) `9,6 s`, étape 6 (`cent-fois`) `9,3 s`, étape 19 (`un-et-deux`) `7,7 s`, étape 12 (`trous-remplis`) `7,6 s`, étape 37 (`croissance`) `7,0 s`. Sur l'étape 16, les phrases 3 et 4 (dont la conclusion en gras « Les longueurs s'ajoutent ; les nombres se multiplient. ») restent invisibles pendant 5 à 9,9 s.
    - **SVT** : `152,3 s` d'animations au total ; **19 étapes ≥ 4 s**, dont étape 2 (`proteine`) `9,9 s`, étape 5 (`gene`) `8,1 s`, étape 4 (`chromosome`) `7,9 s`, étape 15 (`nucleotide`) `7,4 s`, étape 3 (`hemoglobine`) `6,8 s`, étapes 19/26/28 `6,5 s`.
    - **Physique** : `53,6 s` au total, beaucoup mieux calibré (une seule étape ≥ 4 s : étape 31 `expo` à `5,0 s`).
  - `PiloteCoquille.tsx:131-138` ne contient que `← Retour` et `Suivant →`.
- **Proposition** :
  1. Ajouter un discret bouton `↺ Rejouer` (dans `.stage-foot` ou `.nav`) qui remet l'étape à `base`, réinitialise temporairement `S.vu[st.k]` pour cette lecture et relance la séquence synchronisée.
  2. Pendant qu'une séquence révèle encore des phrases `.say.later`, soit afficher un indice discret (ou un clic sur la scène / le texte qui termine instantanément la séquence), soit raccourcir les délais `d`/`w` des étapes > 5 s pour caler le rythme sur celui de la Physique (~2–4 s).
- **Certitude** : certain
- **Effort** : moyen

---

### G-01-005 — Exercices en thème sombre : `exercices.css` n'a pas reçu l'adoucissement `.dark` de la V3
- **Gravité** : IMPORTANT
- **Où** : `web/src/app/pilote/exercices.css` (comparer avec `web/src/app/pilote/logarithme/pilote.css:209-217`) — routes `/pilote/*/exercices` en thème sombre
- **Constat** : Alors que `05-audit-v2-plan-v3.md` §3.1 a adouci `.dark .pilote` (encre à 88–90 %, bouton primaire en gris secondaire `#D4D4D4` au lieu de blanc pur) avec le commentaire « du blanc pur sur du noir éblouit sur une longue séance », `exercices.css` ne contient **aucune règle `.dark`**. En thème sombre, tous les boutons primaires (`Vérifier`, `Exercice suivant →`, `Voir le bilan →`, `Recommencer avec d'autres nombres`) et les pastilles actives affichent de grands aplats `#FFFFFF` pur sur fond `#000000` pur.
- **Preuve** :
  - Vérifié dans le code (`web/src/app/pilote/exercices.css` : 0 occurrence de `.dark`) et visuellement sur les captures `desktop-dark` et `mobile-dark` des 3 pages d'exercices (ex. Maths ex. 14, Physique ex. 4, 11 et bilan).
- **Proposition** : Ajouter à `exercices.css` les mêmes règles `.dark .exos` que `.dark .pilote` (encre légèrement adoucie et `.dark .exos .exos-btn:not(.ghost)` en `var(--color-text-secondary)`).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-006 — Téléphone : le dialogue « Mode d'emploi » (`#whyd`) s'ouvre défilé tout en bas
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/PiloteCoquille.tsx:141-177` et `web/src/components/pilote/noyau.js:263` — les 3 leçons en `390×844`
- **Constat** : Sur téléphone (`390×844`), le dialogue `<dialog id="whyd">` mesure `1196 px` de contenu pour `800 px` visibles. Comme son unique élément focalisable est `<button>Fermer</button>` placé tout en bas du `<form>`, l'appel natif `$('#whyd').showModal()` donne le focus au bouton `Fermer` et fait immédiatement défiler la modale tout en bas : l'élève ne voit ni le titre « Mode d'emploi » ni les 4 premiers points (il arrive directement au milieu de la liste, face au bouton `Fermer`).
- **Preuve** :
  - Mesuré dans Chromium en `390×844` sur `/pilote/logarithme` : `scrollHeight: 1196`, `clientHeight: 800`, et capture visuelle confirmant que la modale s'ouvre coupée au 5e point avec « Fermer » collé en bas.
- **Proposition** : Mettre `tabIndex={-1}` sur `<h2>Mode d'emploi</h2>` (ou ajouter un bouton `×` en haut à droite de la modale) et faire `d.showModal(); d.scrollTop = 0;` dans `surPourquoi` (`noyau.js:263`).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-007 — Exercices : aucun lien pour retourner à la leçon en cours d'exercice
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/ExercicesPilote.tsx:153-190` (`barre`) vs `:245-247` (écran bilan uniquement) — routes `/pilote/*/exercices`
- **Constat** : Dans la barre supérieure des exercices (`.exos-barre`), on trouve la matière, le titre du chapitre, le badge `EXERCICES` et les pastilles numérotées, mais **aucun lien vers la leçon** (ni le titre cliquable, ni un bouton `← Leçon`). Le lien `← Revoir la leçon` n'apparaît qu'une fois arrivé au bilan final (`k === N`). Un élève bloqué à l'exercice 3 qui veut relire la règle dans la leçon ne trouve pas comment y revenir sans utiliser le bouton Précédent du navigateur.
- **Preuve** :
  - Vérifié sur les 3 pages `/pilote/*/exercices` en desktop et mobile (`hasBackToLessonLink = false` sur les 35 exercices) et confirmé dans `ExercicesPilote.tsx:153-190` (seul le bloc bilan ligne 245 rend `<Link href={lecon}>`).
- **Proposition** : Rendre le titre du chapitre dans `.exos-barre` cliquable vers `lecon`, ou ajouter un lien discret `← Leçon` dans `.exos-barre` (en symétrie exacte avec le bouton `Exercices` présent dans `.pilote-barre` côté leçon).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-008 — SVT, étape 38 (`atelier`) : débordement du panneau et message de réussite coupé derrière `.nav`
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/expression-genetique-moteur.js:500-514` (`#agfb`) — `/pilote/expression-genetique`, étape 38 / 54 (`atelier`)
- **Constat** : L'étape 38 est la seule étape des 3 pilotes dont le panneau `.script` déborde en hauteur sur ordinateur (`1280×800` et `1366×768`). Quand l'élève réalise la mutation demandée (`A → T` au triplet 6), `#agfb` se met à jour sans appeler `ctx.voir($('#agfb'))` : la confirmation `Trouvé : un seul nucléotide a suffi.` et la ligne `Déjà obtenus : …` sont **coupées derrière la barre `.nav`** sur ordinateur comme sur téléphone.
- **Preuve** :
  - `panelOverflows = true` uniquement sur cette étape dans les 3 pilotes en `1280×800` (clair et sombre) et `1366×768`.
  - Capture `expression-genetique/desktop-dark/step-38.png` : la dernière ligne visible au-dessus de `.nav` s'arrête net à « C'est l'allèle βS : celui de la drépanocytose. **Trouvé :** », la suite étant masquée sous `.nav`. Même phénomène sur `mobile-dark/step-38.png` (les boutons `Insérer avant`, `Supprimer` et tout `#agfb` restent sous `.nav`).
- **Proposition** : Appeler `ctx.voir($('#agfb'))` dans `sync()` (uniquement sur action de l'élève, pas au montage initial), et compacter légèrement les marges verticales de `.eg-ctl` pour que l'atelier complet tienne sans défilement sur `1280×800`.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-009 — Exercice 8 de SVT (`type-mutation`) : la mise en forme de l'allèle muté trahit le type de mutation avant lecture
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/expression-genetique.js:441` — `/pilote/expression-genetique/exercices`, exercice 8 (« Le type d'une mutation et son effet »)
- **Constat** : L'énoncé affiche l'allèle normal groupé par triplets (`5′-GGA CCC TCC GCG CTA-3′`), mais affiche l'allèle muté **sans aucun espace** dès qu'il s'agit d'une délétion ou d'une insertion (`5′-GGACCCTCCCGCGCTA-3′`), alors qu'il conserve les espaces par triplets pour toute substitution (`decale ? m : groupe(m)`). Un élève repère instantanément, au simple coup d'œil et sans comparer une seule base, s'il s'agit d'un décalage ou d'une substitution.
- **Preuve** :
  - Ligne 441 de `expression-genetique.js` : ``allèle muté : 5′-${decale ? m : groupe(m)}-3′``.
  - Confirmé visuellement dans Chromium sur la capture de l'exercice 8 (`allèle normal : 5′-GGA CCC TCC GCG CTA-3′` / `allèle muté : 5′-GGACCCTCCCGCGCTA-3′`).
- **Proposition** : Utiliser un formatage identique quel que soit le type de mutation — soit grouper par 3 les deux allèles (le dernier groupe ayant 2 ou 4 bases, ou un reste de 1–2 bases, comme sur les vrais sujets du bac où l'élève doit compter les bases), soit afficher les deux séquences en continu sans espaces.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-010 — Exercices : invitations mensongères à « demander un indice » et un indice de Maths qui donne la réponse
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/ExercicesPilote.tsx:121, 134`, `web/src/components/pilote/exercices/expression-genetique.js` (ex. 3, 5, 6, 9, 10) et `web/src/components/pilote/exercices/logarithme.js:696` (ex. 14 q c)
- **Constat** : Trois défauts concrets sur les indices ont été relevés en jouant un élève qui se trompe :
  1. **SVT — 7 questions à saisie sans bouton « Un indice »** (`ex 3 q2`, `ex 5 q2`, `ex 6 q1`, `ex 9 q2`, `ex 10 q1/q2/q3`) affichent malgré tout, en cas de mauvaise réponse, `"Ce n'est pas ça. Reprends lettre par lettre, ou demande un indice."` (ou `"… ou demande un indice."`) alors qu'il n'y a aucun bouton d'indice sur ces questions.
  2. **Les 3 matières — après ouverture de l'indice** : même quand l'élève a déjà cliqué « Un indice » (le bouton a disparu et l'indice est affiché), une erreur suivante continue d'afficher `"… ou demande un indice."`.
  3. **Maths ex. 14 (`ln-etude`), question c)** : l'indice écrit mot pour mot la réponse exacte demandée : `"f'(x) a le signe de 2x − 1 : elle s'annule et change de signe en x = 1/2."` alors que la question est « En quelle valeur de x la fonction f atteint-elle son minimum ? ».
- **Preuve** :
  - `ExercicesPilote.tsx:121` et `:134` : messages codés en dur sans vérifier `q.indice && !s.indice`.
  - Confirmé visuellement sur les captures de SVT ex. 10 (aucun bouton « Un indice », message « ou demande un indice » affiché), Maths ex. 1 et Physique ex. 4 (indice déjà affiché, message « ou demande un indice » toujours affiché), et Maths ex. 14 q c) (`logarithme.js:696` : ``elle s’annule et change de signe en $x = ${fracTex(1, a)}$.``).
- **Proposition** :
  1. Dans `ExercicesPilote.tsx:121,134`, n'ajouter `", ou demande un indice"` que si `q.indice && !s.indice` (sinon terminer par `"."`).
  2. Ajouter des indices courts sur les 7 questions de SVT qui n'en ont pas (en particulier l'exercice 10 au format bac).
  3. Reformuler l'indice de `logarithme.js:696` sans donner la valeur finale : par ex. `"$f'(x)$ a le signe de $${ax} - 1$ : résous $${ax} - 1 = 0$ pour trouver où $f'$ s'annule et change de signe."`.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-011 — Saisie numérique (`nombre.js`) : une puissance de 10 sans mantisse (`10^15`, `10^-7`) est refusée
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/nombre.js:19` — utilisé par tous les exercices numériques et par l'étape 38 de Physique (`#n0in`)
- **Constat** : L'expression régulière de `lireNombre` exige toujours une mantisse suivie d'un séparateur (`1 × 10^15` ou `1e15`). Si un élève tape `10^15` ou `10^-7` (écriture courante au bac quand la mantisse vaut 1 ou lors d'un test d'ordre de grandeur), `lireNombre` renvoie `NaN` et l'interface répond qu'elle ne reconnaît pas le nombre.
- **Preuve** :
  - Test direct de `lireNombre` (`nombre.js:19`) : `lireNombre("10^15") === NaN`, `lireNombre("10^-7") === NaN`, alors que `lireNombre("1e15") === 1e15` et `lireNombre("4,6 × 10^15") === 4.6e15`.
- **Proposition** : Ajouter un cas dans `lireNombre` avant le retour `NaN` : `const p10 = t.match(/^([+-]?)10\^?\(?([+-]?\d+)\)?$/i); if (p10) return (p10[1] === "-" ? -1 : 1) * 10 ** parseInt(p10[2], 10);`.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-012 — Maths, étape 34 (`e`) : le curseur est manipulable avant le pari et dévoile la réponse
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/logarithme-moteur.js:816-819` et `:1037` — `/pilote/logarithme`, étape 34 / 55 (`08 — La courbe de ln`, clé `e`)
- **Constat** : L'étape 34 combine un pari (« Il existe un nombre où l'aire sous 1/x, depuis 1, vaut exactement 1. Où est-il, à ton avis ? ») et le contrôle curseur `#ex`. Dès l'arrivée sur l'étape, le curseur est actif juste sous les 3 choix du pari : un élève qui le fait glisser avant de parier fait apparaître `e ≈ 2,718` et `l'aire vaut 1` sur la scène ainsi que `"Tu l'as : l'aire vaut 1 pour x ≈ 2,718."` dans `#efb`, alors que le pari n'est même pas encore répondu.
- **Preuve** :
  - Reproduction vérifiée dans Chromium (`log-step-34-spoiler.png`) : sans cliquer aucun choix du pari (`Choisis d'abord` toujours désactivé, 3 options ouvertes), glisser `#ex` à `2,718` dévoile immédiatement `e ≈ 2,718` sur la scène et `#efb`.
- **Proposition** : Garder `#ex` désactivé (ou masqué) tant que le pari n'est pas choisi, et le déverrouiller dans le callback de réponse au pari (ou séparer le pari et la manipulation en deux étapes).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-013 — Maths, étape 24 (`gen`) : chevauchement des étiquettes `b` et `a` sur l'axe quand `a ≈ b`
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/logarithme-moteur.js` (scène `aire`, contrôle `gen`) — `/pilote/logarithme`, étape 24 / 55
- **Constat** : Lorsque l'élève approche les curseurs `a` et `b` l'un de l'autre (par exemple `a = 2,10` et `b = 2,05`, autorisé puisque `b` varie entre `1` et `a`), les deux étiquettes SVG `b` et `a` sous l'axe des abscisses se superposent directement.
- **Preuve** :
  - Détecté par l'audit géométrique en `1280×800` et `390×844` et confirmé visuellement sur la capture `step-24.png` (collision `b` / `a` sous la graduation `2`).
- **Proposition** : Quand `Math.abs(X(a) - X(b)) < 24`, fusionner l'étiquette en `b = a` ou décaler légèrement en `y` l'une des deux étiquettes.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-014 — Fenêtre `900–1024 px` : la barre de chapitres `#beats` déborde en interne sans aucun indice de défilement
- **Gravité** : MINEUR
- **Où** : `web/src/app/pilote/logarithme/pilote.css:35-44` et `:221-223` — les 3 leçons à `900 px` et `1024 px` de largeur
- **Constat** : Entre `900 px` et `1024 px` (tablette paysage, écran partagé, petit portable), `#beats` reste sur une seule ligne avec les noms complets des 10 ou 11 chapitres, `overflow-x: auto` et `scrollbar-width: none`. Les derniers chapitres (`Retour`, `Au bac`, `Bilan`) sortent de la zone visible sans barre ni fondu indiquant qu'on peut faire défiler horizontalement.
- **Preuve** :
  - Mesures DOM (`#beats.clientWidth` vs `#beats.scrollWidth`) :
    - **Physique** : `900 px` → `331 / 518` (`+187 px` cachés) ; `1024 px` → `448 / 518` (`+70 px` cachés).
    - **Maths** : `900 px` → `297 / 457` (`+160 px` cachés) ; `1024 px` → `413 / 457` (`+44 px` cachés).
    - **SVT** : `900 px` → `367 / 464` (`+97 px` cachés).
  - À `1100 px` et `1280 px`, aucun débordement (`clientW === scrollW`).
- **Proposition** : Entre `900 px` et `1099 px`, soit passer `#beats` sur la deuxième ligne comme sous `900 px` (en gardant les libellés courts), soit ajouter un fondu latéral (`mask-image`) et un `scrollIntoView` automatique du `.beat.on`.
- **Certitude** : certain
- **Effort** : petit

---

### G-01-015 — SVT, étape 1 (`v-savoir`) : le bouton « Passer à l'énigme → » apparaît même après un premier échec
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/expression-genetique-moteur.js:134` (comparer avec `logarithme-moteur.js` et `radioactivite-moteur.js`) — `/pilote/expression-genetique`, étape 1 / 54
- **Constat** : Dans les pilotes Maths et Physique, le raccourci permettant de sauter le rappel « Ce qu'il faut savoir » n'est affiché que si l'élève répond juste **du premier coup** (`ctx.juste(...) === true`). En SVT, le bouton `<button type="button" class="eg-saut">Passer à l'énigme →</button>` est codé en dur dans le feedback de la bonne option : un élève qui se trompe au premier essai et clique la bonne réponse par élimination au second essai se voit quand même proposer de sauter les 4 prérequis.
- **Preuve** :
  - Testé dans Chromium sur les 3 pilotes (échec essai 1 puis bonne réponse essai 2) :
    - Maths : pas de bouton de saut.
    - Physique : pas de bouton de saut.
    - SVT : affiche `"Le gène, fait d'ADN, est la recette d'une protéine. Tu peux passer à l'énigme, ou revoir les quatre idées (Suivant). Passer à l'énigme →"`.
- **Proposition** : Alignement sur Maths et Physique : déplacer le bouton de saut dans un bloc conditionné à `ctx.juste('v-savoir') === true` (via `apres` ou une classe masquée si `S.essais['v-savoir'] > 1`).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-016 — Exercices de SVT : boutons « Nouveaux nombres » hors sujet et point-virgule `;` orphelin dans « Au programme : »
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/ExercicesPilote.tsx:243, 269-271, 393` — `/pilote/expression-genetique/exercices`
- **Constat** :
  1. Sur la page d'exercices de SVT (séquences ADN, ARNm, codons, mutations — aucun calcul numérique dans 7 exercices sur 10), les boutons de retirage s'appellent `↻ Nouveaux nombres` (ligne 393) et `Recommencer avec d'autres nombres` (ligne 243).
  2. Sur les **10 exercices sur 10** de SVT, la ligne `Au programme :` se termine par un point-virgule `;` brut issu de l'énumération du référentiel (ex. `Au programme : Déduire la signification génétique de la mutation en utilisant le code génétique ;`), alors que Maths et Physique se terminent proprement par un point `.`.
- **Preuve** :
  - Confirmé dans le DOM sur les 10 exercices de SVT (`10/10` finissent par `;`) et visible sur la capture `svt-ex8-draw-1.png`.
- **Proposition** : Remplacer le libellé générique par `↻ Autre tirage` / `Recommencer avec d'autres énoncés` (ou paramétrer le libellé par matière), et normaliser la ponctuation finale dans `ExercicesPilote.tsx:271` (`.replace(/\s*[;,]\s*$/, ".")`).
- **Certitude** : certain
- **Effort** : petit

---

### G-01-017 — Physique, étape 56 (`fin`) : espace avant le point et ligne de score en style grisé `.small`
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/radioactivite-moteur.js:545, 554` — `/pilote/radioactivite`, étape 56 / 56 (`11 — Bilan`)
- **Constat** : Sur l'écran bilan de Physique, la ligne de résultat contient une espace parasite devant le point (`« Vérifie » réussies du premier coup : 0 sur 8 . Tes paris : 15 faits.`) et est rendue dans un `<p class="small">` (`0.875rem`, couleur secondaire atténuée), alors que Maths (`.lg-res`) et SVT (`.eg-res`) affichent la même ligne en `1.0625rem` encre principale, bien plus lisible.
- **Preuve** :
  - `radioactivite-moteur.js:545` : ``<b>${vok.length} sur ${vu.length||V.length}</b> .`` et ligne 554 : ``<p class="small">${pct(ligne)}</p>``.
  - Confirmé visuellement sur `radioactivite/desktop-dark/step-56.png`.
- **Proposition** : Supprimer l'espace avant le point (`</b>.`) et utiliser une classe commune `.pilote .res` dans `pilote.css` (partagée par les 3 pilotes) au lieu de `.small`.
- **Certitude** : certain
- **Effort** : petit

---

## Partie 2 — Avis et ressenti d'usage (distincts des faits vérifiables)

> Les points suivants relèvent d'appréciations ergonomiques ou pédagogiques constatées en se mettant dans la peau d'un élève en difficulté. Ils méritent discussion ou arbitrage plutôt qu'une correction mécanique.

---

### G-01-018 — Maths, étape 42 (`r-quotient`) : la ligne de dérivation révélée apparaît au-dessus du quiz déjà répondu
- **Gravité** : MINEUR *(avis d'ergonomie)*
- **Où** : `web/src/components/pilote/logarithme-moteur.js` (étape 42 `r-quotient`) et `web/src/components/pilote/noyau.js` (ordre de rendu `deriv` avant `pari`)
- **Constat** : C'est la seule étape qui combine `deriv` (2 lignes) et `pari` (« La ligne suivante ? »). Quand l'élève répond au quiz puis clique le bouton en bas `Ligne suivante ↓`, la ligne 2 s'insère **au-dessus** du quiz déjà complété, ce qui décale le bloc de quiz vers le bas et inverse le sens naturel de lecture haut → bas.
- **Preuve** : Observé en direct et confirmé sur la capture `log-step-42-after.png` (ordre DOM `#body`: `.dit`, `ol.deriv` avec ligne 1 + ligne 2, puis `.pari` résolu en dessous).
- **Proposition** : Révéler automatiquement la ligne 2 au moment de la validation du quiz (sans demander un clic supplémentaire `Ligne suivante ↓` qui ouvre au-dessus), ou afficher la conclusion sous le quiz dans `#apres`.
- **Certitude** : probable *(ressenti d'usage)*
- **Effort** : petit

---

### G-01-019 — SVT, étape 38 (`atelier`) : le défi démarre déjà positionné sur le bon nucléotide
- **Gravité** : IDÉE *(avis pédagogique)*
- **Où** : `web/src/components/pilote/expression-genetique-scenes-c.js` (valeur initiale `sel` sur le triplet 6, 2e nucléotide) et `expression-genetique-moteur.js` (étape 38 `atelier`)
- **Constat** : L'énoncé dit « Choisis un nucléotide du brin non transcrit, puis change-le. Défi : remplace l'acide glutamique n° 6 par une valine. » Or, à l'ouverture de l'étape, la sélection est déjà posée sur `triplet 6, 2e nucléotide` — exactement la lettre à muter (`A → T`). Un élève en difficulté peut réussir le défi par simple essai des 4 boutons `A T G C` sans jamais avoir à repérer ni le triplet 6 ni la position du nucléotide dans le codon `GAG → GUG`.
- **Preuve** : Observé en direct sur `/pilote/expression-genetique` étape 38 (sélection par défaut au chargement : `triplet 6, 2e nucléotide`).
- **Proposition** : Démarrer la sélection sur `triplet 1, 1er nucléotide` (ou `triplet 6, 1er nucléotide` si l'on veut aider sans tout mâcher) pour que l'élève utilise réellement les flèches `← →` ou clique sur la séquence pour localiser la base à changer.
- **Certitude** : probable *(choix pédagogique à arbitrer)*
- **Effort** : petit

---

### G-01-020 — Dérivations multi-lignes : `← Retour` quitte toute l'étape au lieu de remonter d'une ligne
- **Gravité** : IDÉE *(avis d'ergonomie)*
- **Où** : `web/src/components/pilote/noyau.js:265` (`const surRetour = () => go(cur - 1)`) — ex. `/pilote/logarithme` étape 14 (`p21-pourquoi`, 4 lignes)
- **Constat** : Sur une étape de dérivation où `Suivant` se transforme en `Ligne suivante ↓`, un élève qui clique un peu vite et appuie sur `← Retour` (ou flèche gauche) s'attend parfois à revenir à la ligne précédente ; or il revient à l'étape précédente (`14 → 13`), et s'il revient sur l'étape 14, ses lignes déjà ouvertes restent affichées.
- **Preuve** : Reproduit sur `/pilote/logarithme` étape 14 (`linesBeforeBack: 2` → clic `← Retour` → `étape 13 / 55` → clic `Suivant →` → `étape 14 / 55` avec `linesAfterReturn: 2`).
- **Proposition** : Comportement acceptable tel quel si le bouton `↺ Rejouer` (`G-01-004`) existe ; sinon, envisager soit de reculer ligne par ligne, soit de garder `← Retour` sur l'étape précédente (puisque les lignes anciennes restent cliquables pour se rouvrir).
- **Certitude** : probable *(préférence UX)*
- **Effort** : petit

---

### G-01-021 — Lisibilité tactile du tableau du code génétique sur téléphone (point reporté en §4.4 de `05-audit-v2-plan-v3.md`)
- **Gravité** : IMPORTANT *(point connu / reporté en V3, mais à fort impact sur le terrain)*
- **Où** : `/pilote/expression-genetique` étape 27 (`table`) en `390×844` — déjà évoqué de façon générale dans `docs/refonte/05-audit-v2-plan-v3.md` §4.4
- **Constat** : Sans répéter l'audit V3 sur la taille des textes SVG mobiles (`minTextH = 6 px`), le parcours réel en `390×844` montre un cas où ce report gêne directement l'interaction : à l'étape 27 de SVT, le tableau des 64 codons tient dans une zone de `390 × 354 px` (`42vh`), avec des cellules d'environ `12 px` de haut et des lettres à `~6 px` — alors que la consigne indique « compose un codon avec les boutons, **ou clique dans le tableau** ». En pratique, sur téléphone, seuls les boutons `1re / 2e / 3e base` sont utilisables ; lire le tableau pour vérifier son choix demande de plisser les yeux.
- **Preuve** : Capture `expression-genetique/mobile-dark/step-27.png` et `minTextH = 6` mesuré sur la scène `table` en `390×844`.
- **Proposition** : Sur téléphone (`< 900 px`), soit proposer un bouton « Agrandir le tableau » plein écran (ou un zoom automatique sur le bloc de la 1re base choisie), soit masquer « ou clique dans le tableau » sur petit écran.
- **Certitude** : certain
- **Effort** : moyen

---

## Partie 3 — Ce que les contrôles automatiques actuels laissent passer

En réponse à la question posée dans `BRIEF.md` §3, voici pourquoi `web/scripts/pilotes-parcours.mjs` et `web/scripts/pilotes-exercices.mjs` restent au vert malgré les défauts ci-dessus :

1. **`reducedMotion: "reduce"` systématique dans `pilotes-parcours.mjs`** : il masque totalement les durées réelles d'animation (148 s en Maths, 152 s en SVT) et le fait que des phrases `.say.later` restent invisibles 5 à 10 s alors que `Suivant →` est déjà cliquable (`G-01-004`).
2. **Absence de test de collision `SiteHeader` / `.stage-wrap` après défilement sur mobile** : le script contrôle les textes SVG à l'intérieur du `<svg>`, mais ne vérifie pas que `header.getBoundingClientRect().bottom` recouvre les `56 px` supérieurs de `.stage-wrap` dès que la page défile (`G-01-001`).
3. **Deux largeurs seulement (`1280×800` et `390×844`) et pas de contrôle interne de `#beats`** : le débordement silencieux de `#beats` entre `900 px` et `1024 px` (`G-01-014`) et le débordement vertical de `#script` sur l'étape 38 de SVT après manipulation (`G-01-008`) passent inaperçus.
4. **Pas de parcours navigateur des pages `/exercices`** : `pilotes-exercices.mjs` vérifie les générateurs en Node pur (maths/JSON), jamais le rendu React/CSS dans un navigateur. Il ne peut donc voir ni le déclassement « Voir la correction rédigée » (`G-01-003`), ni l'absence de thème sombre dans `exercices.css` (`G-01-005`), ni `inputMode="decimal"` (`G-01-002`), ni l'absence de lien retour vers la leçon (`G-01-007`), ni les faux messages « ou demande un indice » (`G-01-010`).
5. **Pas de test d'ouverture du `<dialog id="whyd">`** sur mobile (`G-01-006`), ni d'interactions « hors chemin heureux » (manipuler le curseur avant le pari à l'étape 34 de Maths, `G-01-012` ; rater le premier essai à l'étape 1 de SVT, `G-01-015`).
