# Ordre de travail post-Fable №1 — finir Lesson Experience v2

**Exécutant visé :** Sonnet (ou Opus), session froide. **Standard :** brief
Day-7 resserré — chaque item porte son contrat, ses fichiers, sa
vérification. **Contrat maître :** `docs/design/LESSON-EXPERIENCE-SPEC.md`
(SHA b761972) — LIS-LE EN ENTIER D'ABORD, puis ledger §11
(`docs/audits/fable-day3-ledger.md`). Livré/vérifié : §§1–2 (commits
9846496, 626fd8a). Restant : ci-dessous, dans l'ordre.

**Invariants de session :** RULES.md tient (jamais de production) ; branche
de travail only ; §13 (« poussé, déploiement non vérifié ») ; honest-state ;
dom-truth AVANT et APRÈS (121+ verts) ; commit par pièce.

**Pièges connus (payés une fois, ne les repaie pas) :**
- `git` s'exécute depuis `/home/user/BAC`, PAS depuis `web/` (le cwd
  persiste entre commandes — des commits ont échoué toute la semaine ainsi).
- `pkill -f "next start"` ne tue PAS `next-server` : trois séries de
  screenshots ont servi un build périmé. Tue par
  `pgrep -f next-server | xargs kill` (code 144 attendu, inoffensif), puis
  VÉRIFIE par curl qu'une chaîne fraîche est servie avant de croire un shot.
- `assembleSvg` (StagedFigure.tsx) ré-insère les groupes step-N juste avant
  `</svg>` : toute figure migrée doit garder ses groupes step-N EN DERNIERS
  enfants du SVG (contenu non-steppé AVANT les groupes), sinon réordre.
- Le compteur d'occurrences des figures est GLOBAL au document, calculé
  avant le découpage en chapitres (NotionBody) — ne le scope jamais.
- Les entrées du rail sont des `<button>` (plus des `<a>`) depuis 626fd8a.

## Item 1 — Zones latérales (spec §3) + M1 au masthead — **FAIT (2026-09-04)**

> Livré : `RetenirZone.tsx`, `lib/retenir.ts` (cartes par chapitre : sidecar
> puis repli sur la première formule `$$` du chapitre, sinon RIEN),
> chargeur `retenir.json` dans `content.ts`, cinquième colonne de grille,
> `content/pc/rlc-serie/retenir.json` (6 entrées), M1 par défaut au
> masthead, 6 contrôles dom-truth (203 verts). **Deux écarts assumés :** le
> palier est **bp-xl (1600px)** et non 1536 — « bp-wide » n'existe pas dans
> `tokens.ts`, contrairement à ce que la spec affirmait ; et la bande de
> notion s'élargit à 1484px à ce palier, faute de quoi la prose tombait de
> 690 à 496 px. Les deux raisons sont écrites dans le code, à l'endroit
> exact où elles s'appliquent. Les notes de marge par chapitre passent par
> le champ `note` du sidecar, comme la spec le prévoit.


Contrat : spec §3 intégral (grille ≥1536, RetenirZone adaptée de
KeyFormulaRail, sidecar `retenir.json` + fallback premier `$$`, notes de
marge, M1 cover-in-band par défaut — OWNER-DIRECTED).
Fichiers : `globals.css` (.notion-page-grid @1536), nouveau
`RetenirZone.tsx`, `content.ts` (chargeur retenir), `NotionPageView.tsx`
(zone + M1 par défaut), `content/pc/rlc-serie/retenir.json` (exemplaire —
une entrée par rung, formule KaTeX + note courte, fidèle à la leçon).
Vérif : build ; dom-truth ; shots 1536/1920 (item 4 d'abord si tu préfères) ;
la zone est VIDE ET SILENCIEUSE quand ni sidecar ni `$$` (honest-state).

## Item 2 — Vérification du sweep pagination — **FAIT (2026-09-04)**

> Fait autrement que demandé, et mieux : une capture prouve qu'une page
> s'affiche, pas qu'UN SEUL chapitre est visible, ni que la flèche gauche au
> chapitre 1 ne descend pas à −1, ni que l'impression déplie tout. Sonde
> `web/scripts/pagination-probe.mjs`, **onze contrôles × cinq leçons = 60
> promesses**, toutes tenues après correctif. **UN DÉFAUT RÉEL TROUVÉ** :
> l'ancre profonde `#titre` n'ouvrait pas son chapitre dès que l'id portait
> un accent — 1 876 des 2 190 titres du corpus (ledger 11.13). Corrigé,
> gardé par dom-truth (205 contrôles). Le « flash du chapitre 1 » sur lien
> profond est mesuré pour la première fois : 250 à 1 265 ms (ledger 11.14),
> et ce qu'on n'a délibérément PAS fait est écrit en 11.15.


La pagination est renderer-level : déjà active partout. Vérifie sur :
`lois-de-newton` (9 ch.), `suites-numeriques` (11 ch. + motion +
StagedFigure à venir), `probabilites-conditionnelles` (la SEULE leçon à
`##` non-rung — ledger 11.11), une leçon SVT et une philo (items/LessonEnd).
Vérif : screenshot chapitre 1 + un `?chapitre=n` profond chacun ; flèches ;
`⌘P`/emulateMedia print = tout déplié. Toute anomalie = fix + ligne ledger.

## Item 3 — Fan-out StagedFigure — **DÉJÀ FAIT (mesuré le 2026-09-04)**

> **« 70 figures restantes » était faux d'un ordre de grandeur.** Compté sur
> le corpus, groupe `step-N` présent ou absent, fichier par fichier :
>
> | matière | staged | total | non staged |
> |---|---|---|---|
> | maths | 72 | 72 | **0** |
> | pc | 128 | 135 | 7 |
> | svt | 37 | 49 | 12 |
> | philo | 1 | 2 | 1 |
> | **total** | **238** | **258** | **20** |
>
> Et **les vingt non-staged portent chacune un refus ÉCRIT dans leur propre
> en-tête** — « figure STATIQUE (choix documenté, pas un oubli) », avec le
> geste qui le motive. Vérifié une par une. C'est exactement l'état que la
> spec appelle légitime (§2.5 : « refus documenté = état légitime, le
> critère décisif est le GESTE, pas le compte de couches »).
>
> **Deux figures manquaient à la table du ledger** (`montage-diffraction-
> ultrasons`, `balancoire-resonance`) : créées APRÈS le census Day-11, elles
> n'y ont jamais été inscrites — mais leurs fichiers déclarent leur refus et
> citent le ledger 11.6. La table est corrigée ; c'est elle qui était en
> retard sur le corpus, pas le corpus sur elle.


Contrat : spec §2.5 (seuil) + §2.8 (stages AUTORÉS). 70 figures restantes
(census ledger §11 : 34 graphes → toujours staged ; 23 schémas + 15 autres
→ jugement « geste d'enseignement », refus documenté légitime).
Par figure : (a) éditer le SVG — envelopper les couches en
`<g id="step-N">` EN DERNIERS enfants, ordre = axes → données → lecture
pour les graphes ; (b) écrire `media/<slug>.stages.json` (captions
prosifiées, PAS de x_y bruts dans le texte visible) ; (c)
`node web/scripts/validate-content.mjs content/<m>/<leçon>` vert.
Procède par vagues de ≤6 leçons, pilote d'abord (une figure vérifiée en
rendu avant le fan-out — discipline D10). Mets à jour la table ledger §11
(done/pending/declined-with-reason) À CHAQUE VAGUE, pas à la fin.
`arbre-pondere` (3 placements, AUCUN groupe) est le cas le plus délicat :
ses 3 placements doivent retrouver leur progression via initialStage.
SVT : NE PAS TOUCHER (gate propriétaire).

## Item 4 — Paliers shots 1536/1920 — **FAIT (2026-09-04)**

> `VIEWPORTS` porte trois paliers de bureau (1280 / 1536 / 1920) + mobile ;
> les deux portes `vpName === "desktop"` sont ouvertes aux trois via
> `PALIERS_BUREAU` ; et un shot par chapitre est pris par `?chapitre=n` —
> avec attente de `data-chapter-active`, pas un délai, parce que le HTML
> statique rend toujours le chapitre 1. Vérifié sur `pc/rlc-serie` : **147
> captures**, dont 33 de chapitres (11 × 3 paliers) et 94 battements
> d'animation, toutes de hauteurs différentes — la preuve que les liens
> profonds ont pris.
>
> **AU PASSAGE, LE HARNAIS ÉTAIT CASSÉ.** Depuis la pagination (Day-11),
> neuf figures sur dix vivent dans un `<section hidden>` :
> `scrollIntoViewIfNeeded` y attendait un élément qui ne deviendrait jamais
> visible, et la passe mourait sur un `TimeoutError`. Personne ne l'avait vu
> — le harnais n'a pas de porte. Les chapitres sont maintenant dépliés avant
> les captures de figures (des captures d'ÉLÉMENT : la composition autour
> n'entre pas dans l'image), et la page est rechargée à chaque thème pour que
> la pleine page suivante ne montre pas la leçon entière.
>
> Le hack thème (classList) reste tel quel — dette connue, ledger 11.12.


Contrat : spec §5. `web/scripts/shots.mjs` : ajouter wide 1536×960 +
ultra 1920×1080 ; ouvrir les gates `vpName === "desktop"` (:167,:182) aux
trois paliers desktop ; un shot par chapitre via `?chapitre=n` sur la leçon
de preuve. Le hack thème (classList) est une dette CONNUE (ledger 11.12) —
ne le corrige que si trivial, sinon laisse.

## Item 5 — Batterie dom-truth §5 complète — **FAIT (2026-09-04)**

Mesuré avant d'écrire quoi que ce soit : **cinq des six assertions étaient
déjà couvertes**, par des balayages écrits depuis. StagedFigure
absence/présence + transport + impression + motion : le balayage
`SWEEP: StagedFigure`. Lien profond `?chapitre=3` actif et affordance
« Chapitre 3 / 11 » : le contrôle de thème sombre les vérifie tous deux au
passage. `RetenirZone` état honnête : son propre balayage (§3.2/§3.3).

**LA SIXIÈME MANQUAIT, ET C'ÉTAIT LA PLUS IMPORTANTE** — « chapitre 2
`hidden` présent dans le DOM ». Elle est armée : les chapitres non actifs
doivent être PRÉSENTS, MASQUÉS et NON VIDES.

Cet invariant fait marcher quatre choses d'un coup : le ⌘F du navigateur
trouve dans toute la leçon, l'impression déplie tout, un lien profond
s'ouvre sans requête, et la leçon reste utilisable quand le réseau tombe
(`docs/audits/hors-ligne.md`). Il a un prix mesuré — 43 000 nœuds, six
secondes d'attente sur un téléphone bon marché
(`docs/audits/poids-et-reactivite.md`) — et l'arbitrage entre les deux
appartient au propriétaire. **C'est justement pourquoi la porte existe :
tant que la décision n'est pas prise, une « optimisation » qui rendrait les
chapitres à la demande casserait les quatre propriétés en silence.**

Testée dans les deux sens, et le premier essai n'a rien prouvé : en ne
rendant QUE le chapitre actif, dom-truth s'écroule avant d'arriver à ce
balayage (dix contrôles antérieurs supposent les autres chapitres). Refait
en gardant les chapitres mais en retirant `hidden` : la porte nomme
exactement le défaut — « 9 chapitre(s) non actifs NON masqués ». Restauré,
251 contrôles, 0 échec.

### Contrat d'origine

Contrat : spec §5. Ajouts : StagedFigure absence/présence après clic
(précédent exact `:133` + le clic de shots.mjs `:190`) ; chapitre 2
`hidden` présent dans le DOM ; deep-link `?chapitre=3` actif ; affordance
`Chapitre 3 /` ; print émulé = chapitres visibles + contrôles masqués ;
RetenirZone honest-state (jamais de contenu fabriqué — vide autorisé).
Vérif : 121+N verts, deux fois de suite (le boot à froid flake parfois).

## Clôture

Chaque item : commit dédié, §13 dans tout langage de déploiement, rapport
final = état de la table §11 + URLs complètes cliquables
(`https://bac-pink.vercel.app/notions/pc/rlc-serie?chapitre=3` est la
preuve type). Ce qui ne tient pas dans ta fenêtre : laisse la table §11
exacte — c'est elle, le handoff.
