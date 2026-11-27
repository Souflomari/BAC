# Mandat UI — refonte complète de l'interface, par Antigravity

> Demande du propriétaire (2026-11-22) : Antigravity ne se contente pas d'auditer l'interface, il
> la **refait** : des retouches partout, une amélioration complète, et la suppression de tout ce qui
> sent le texte et le design générés à la chaîne (« AI slop »). Ce mandat remplace, pour l'UI,
> l'étape « rapport d'abord » du `BRIEF.md` §7 (chantiers 2 et 4) : le rapport est court et sert de
> plan, le travail est dans les PR.

## 1. Le périmètre

Tout ce que voit l'élève :

| Surface | Fichiers |
|---|---|
| En-tête, navigation, pied de page | `web/src/components/ui/` (SiteHeader, PageShell, …), `web/src/app/layout.tsx` |
| Accueil, « commencer », connexion | `web/src/app/page.tsx`, `commencer/`, `connexion/` |
| Matières, notions, leçons de l'ancien format | `web/src/app/matieres/`, `notions/` |
| Examens blancs | `web/src/app/examens/` |
| Erreurs, page introuvable | `error.tsx`, `global-error.tsx`, `not-found.tsx` |
| La coquille des pilotes et les pages d'exercices | `PiloteCoquille.tsx`, `ExercicesPilote.tsx`, `app/pilote/**/*.css`, `exercices.css` |
| Les jetons (couleurs, typographie, espacements, rayons, ombres) | `web/src/lib/tokens.ts` → `tokens.generated.css`, `globals.css` |

Hors périmètre, sauf accord : le **moteur** des pilotes (`noyau.js`, `*-moteur.js`, `*-scenes-*.js`,
à Claude), le **nom et le logo** (chantier 3 : maquettes au propriétaire d'abord, pas de code), et le
**contenu pédagogique** (les phrases des leçons, les énoncés).

## 2. Ce qu'on appelle « AI slop » — à supprimer

Le test pour chaque élément : **qu'est-ce que l'élève en fait ?** S'il n'en fait rien, il part.

**Dans les textes**
- les phrases de marketing creuses (« libère ton potentiel », « une expérience unique », « propulsé
  par l'IA », « révolutionne ta façon d'apprendre ») ;
- les triplets d'adjectifs, les promesses sans preuve, les superlatifs ;
- les tirets cadratins en série, les deux-points dramatiques, les points d'exclamation ;
- les émojis décoratifs, les majuscules de titre à l'anglaise (« Mes Examens Blancs ») ;
- les textes qui décrivent l'interface au lieu de dire quoi faire (« Ici, tu trouveras… ») ;
- les répétitions d'une même idée sur la même page ; le ton de vendeur. Le ton juste est celui d'un
  professeur calme qui tutoie (`DESIGN-BIBLE.md` §0).

**Dans le visuel**
- les dégradés, les lueurs, les ombres lourdes, le verre dépoli ;
- les rangées de trois cartes « fonctionnalités » avec une icône chacune ;
- les cartes dans des cartes, les coins très arrondis partout, les pastilles et badges partout ;
- les icônes et illustrations décoratives qui n'aident à rien ;
- tout centré, tout en gras, tout de la même taille : une hiérarchie plate ;
- les espacements incohérents d'une page à l'autre ;
- les animations d'apparition, les effets au survol qui bougent la mise en page ;
- les états inventés : faux chiffres, fausses progressions, faux « 98 % de réussite »
  (`DESIGN-BIBLE.md`, honest-state).

**Dans la structure**
- les sections qui ne servent pas l'élève, plusieurs appels à l'action concurrents ;
- les pages qui disent la même chose que la précédente ;
- les chemins qui mènent à des impasses (lien vers une page vide, bouton sans effet).

## 3. Ce qu'on veut à la place

Un manuel bien fait plus qu'une appli : une colonne de lecture (65 caractères), une typographie qui
porte la hiérarchie, peu de couleurs, de l'espace, une seule action principale par écran, un
téléphone traité comme l'écran principal (beaucoup d'élèves n'ont que lui), un thème sombre aussi
soigné que le clair. Les pilotes donnent le ton : l'accueil, les matières et les notions doivent
avoir l'air de venir de la même main.

Les règles qui ne bougent pas : `docs/product/DESIGN-BIBLE.md` (§0 cœur calme, §5 mouvement,
§7 une idée par écran, §10 le test du regard), couleurs **uniquement** par les jetons
(`scripts/token-gate.mjs` doit passer), `prefers-reduced-motion` respecté, français d'abord, cibles
tactiles d'au moins 44 px, contraste AA.

**Tu peux contester la bible de design** : si une de ses règles produit une interface plus faible,
dis-le dans le rapport avec captures et raison ; le propriétaire tranche. En attendant, on la suit.

## 4. Comment on procède

1. **Rapport court `04-ui-ux.md`** sur `antigravity/revue` (une journée au plus) : la liste du slop
   trouvé page par page (capture + `fichier:ligne` + ce qui le remplace), la direction proposée (une
   page d'exemple refaite en maquette ou en code, à 1280 et 390 px, clair et sombre), et l'ordre des
   PR. Constats `G-04-<n>` comme d'habitude.
2. **Les jetons d'abord, si tu les changes** : une PR `antigravity/ui-jetons` seule, parce qu'elle
   touche tout. Claude la relit avant tout le reste.
3. **Puis une PR par surface** (`antigravity/ui-entete`, `ui-accueil`, `ui-matieres`, `ui-examens`,
   `ui-exercices`, …), chacune avec captures **avant / après** à 1280 × 800 et 390 × 844, clair et
   sombre, dans la description.
4. Les textes réécrits : liste avant / après dans la PR. Un texte de l'interface peut changer ; une
   phrase de leçon ou un énoncé, non (c'est du contenu, à Claude).
5. Réservations dans `CHANTIERS.md` avant chaque PR, et les contrôles du `BRIEF.md` §6 (batterie,
   build, parcours des pilotes si tu touches leur coquille ou leur CSS).

Claude relit chaque PR et la fusionne ou demande des changements. Une question de goût que nous ne
tranchons pas à deux va au propriétaire, avec les deux versions en capture.
