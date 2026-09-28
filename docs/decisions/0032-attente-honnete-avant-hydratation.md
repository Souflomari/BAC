# ADR 0032 — L'attente honnête avant l'hydratation

**Date :** 2026-09-11 · **Statut :** accepté (dérivé d'honest-state et du §8.7
du HANDOFF : « une page qui a l'air prête et qui ignore le doigt est la pire
forme de lenteur ») · **Preuves :** `docs/HANDOFF.md` §11.27 et §11.28 ·
**Instruments :** `epreuve-3g`, `lecon-3g`, la vérification « HTML servi »
de `dom-truth`

## Contexte

Tout ce que le produit rend cliquable — le transport de chapitre, les choix
d'un QCM, « J'ai fait ma tentative », « Commencer l'épreuve », la recherche,
les menus — est rendu par le serveur, dans le HTML, avant tout JavaScript.
C'est voulu : la leçon se lit dès le HTML, et un élève sur un réseau lent
voit sa page tôt. Mais le `onClick` de chacune de ces commandes n'existe
qu'à l'hydratation, au bout de ~350 ko de JavaScript sur une leçon, 285 sur
une épreuve. Entre les deux, la commande est visible, a l'air prête, et ne
fait rien.

Personne ne l'avait mesuré sur le RÉSEAU (les §11.20 à 11.26 mesuraient le
processeur). Mesuré le 6 et le 11 septembre, réseau bridé à 400 kb/s et
400 ms, processeur ×4 :

- **épreuve** — « Commencer l'épreuve » visible à 4–7 s, sans effet jusqu'à
  ~17 s, quinze à vingt appuis dans le vide (§11.27) ;
- **leçon** — « Chapitre suivant » visible à 4–8 s, sans effet jusqu'à
  17–28 s, seize à vingt-neuf appuis ; vingt-quatre secondes sur
  `rlc-serie` (§11.28).

Le geste le plus fréquent de la lecture, et le premier geste du bac blanc,
morts pendant un temps que rien ne disait. Un élève n'a aucun moyen de
distinguer « pas encore » de « cassé ».

## Décision

1. **Une commande qui n'existe qu'après l'hydratation se rend `disabled`
   et `aria-busy` jusque-là.** Le mécanisme est un seul crochet,
   `useHydrated()` (`web/src/lib/useHydrated.ts`, `useSyncExternalStore` :
   faux au rendu serveur et pendant l'hydratation, vrai dès que React a pris
   la main — sans écart d'hydratation). Il vit dans les primitives partagées
   (`TransportButton`, `ChoiceButton`) et dans chaque bouton client qui ne
   passe pas par elles ; une nouvelle commande client l'adopte ou n'a pas
   besoin de JavaScript.
2. **La page le dit, une fois, calmement.** `HydrationNotice` — « La page se
   prépare… » — est rendue par le serveur en bas de l'écran et retirée au
   premier rendu après l'hydratation. Invisible 1,5 s par CSS : sur un
   réseau normal, personne ne la voit. `aria-hidden` : les commandes portent
   déjà `aria-busy` ; une région live annoncée à chaque chargement serait du
   bruit. Masquée sous `<noscript>` : sans JavaScript, elle mentirait.
3. **Rien ne clignote.** Une commande en attente garde son apparence
   normale une seconde avant de s'estomper (`globals.css`,
   `commande-en-attente`) : désactivée tout de suite — un appui n'a jamais
   lieu dans le vide — mais visuellement inchangée tant que l'hydratation a
   des chances d'arriver avant.
4. **Ce qui n'a pas besoin de JavaScript n'est pas gardé** — les liens, les
   `<details>`, l'impression — et ce qui n'apparaît qu'après un geste (menus
   ouverts, choix après réponse) n'a pas besoin de l'être.
5. **Une porte lit le HTML SERVI.** `dom-truth` récupère (fetch, pas le DOM
   hydraté) le HTML d'une leçon, de l'accueil, de la liste des épreuves et
   d'une épreuve : tout `<button>` que le serveur rend porte `disabled`.
   Rouge si un composant client oublie le crochet. Testée dans les deux sens
   (rouge sur le HTML du build 7d3f851, verte ensuite).
6. **Ce que l'attente ne fait pas.** Elle ne raccourcit rien : les octets
   sont les mêmes, l'hydratation arrive au même moment. Le levier de vitesse
   est ailleurs — moins de JavaScript, moins de chapitres hydratés pour un
   seul lu (§8.7, §11.26) — et reste au propriétaire. La règle de cet ADR
   est une règle d'honnêteté, pas de performance ; elle vaut d'autant plus
   que le réseau est lent.

## Ce qui est remplacé, ce qui tient

- Remplacé : le bouton « Commencer l'épreuve » actif dans le HTML servi et
  mort jusqu'à l'hydratation ; l'import statique du pipeline markdown/KaTeX
  dans l'épreuve (il se charge après l'hydratation et `commencer` l'exige
  avant la révélation — §11.27).
- Tient : honest-state (ADR 0025) — un état affiché doit être vrai ; le
  contrat de lecteur calme (ADR 0028) — une seule ligne, sans mouvement,
  jamais sur un réseau normal ; les marqueurs `data-sujet-complet` /
  `data-corrige-complet` et le protocole d'ouverture d'une épreuve
  (INSTRUMENTS) ; les instruments, qui cliquent avec Playwright et attendent
  qu'un bouton soit actif — aucun n'a changé.

## Conséquences

- Sur 3G lente, une commande désactivée qui le dit remplace une commande
  morte : sept secondes de « L'épreuve se charge… » au lieu de treize
  secondes de bouton mort ; « Chapitre suivant » désactivé et `aria-busy`
  jusqu'à 17–24 s, puis un seul appui suffit.
- Le HTML servi d'une leçon porte `disabled` sur 256 boutons sur 263, puis
  263 sur 263 une fois le chrome et le bac à sable gardés ; après
  l'hydratation, zéro `aria-busy` et les onze `disabled` légitimes.
- Un composant client nouveau qui rend un bouton sans le crochet fait
  passer `dom-truth` au rouge — c'est le but.
- La portée, mesurée à part (ADR 0031) : les 118 pages que `next build`
  prérend servent 12 790 boutons, 0 actif — après que le balayage complet
  a trouvé les cinq que les témoins ne voyaient pas (§11.28).
- Quand rien ne viendra, le dire tout de suite (§11.29) : un morceau de
  JavaScript perdu révèle le bandeau « Recharger » 0,1–0,3 s après la perte
  (8,3 s avant), et la ligne « se prépare… » se tait — une seule voix. Deux
  détecteurs, parce qu'un échec instantané tire `error` avant que l'écouteur
  existe : l'écouteur en tête, et Resource Timing (une entrée à 0 octet sans
  statut) lue en tête du body — le bandeau suit alors l'arrivée des feuilles
  de style, le premier instant où quoi que ce soit peut se peindre. Sur un
  réseau simplement lent (400 ou 250 kb/s), le bandeau n'apparaît pas ; deux
  visites en cache, 0 faux positif. Et son conseil est presque gratuit :
  « Recharger » coûte 75 ko et 4,2 s sur 3G lente, le cache HTTP faisant le
  reste.
- Ce que ça coûte : une seconde d'apparence inchangée avant l'estompage,
  donc, sur un réseau lent, une seconde pendant laquelle un bouton
  désactivé a l'air actif — l'appui ne fait rien mais ne fait pas de mal,
  et la ligne du bas apparaît une demi-seconde plus tard.

## Retractions and Corrections

- **2026-09-11, plus tard.** La règle a un troisième temps qu'elle ne
  nommait pas : l'attente honnête suppose que quelque chose vient. Quand
  un morceau est perdu, rien ne viendra — et « se prépare… » devient un
  mensonge. La veille d'hydratation (reseau-malade.md, 2026-09-04) le
  disait déjà, mais 8 à 12 s trop tard et par-dessus la ligne. Les deux
  mécanismes sont désormais UN : `VeilleHydratation.tsx`, HANDOFF §11.29.
- **2026-09-11, le soir même.** La première rédaction disait la règle
  « complète pour tout ce que le serveur rend cliquable » sur la foi de
  cinq pages témoins. Le balayage de toutes les pages prérendues a trouvé
  cinq boutons actifs sur deux routes hors témoins (`/commencer`,
  `/atelier`). Corrigés ; la porte lit désormais TOUTES les pages
  prérendues, avec un plancher de 100 pages. Une affirmation de portée
  vaut ce que vaut sa mesure — c'est la leçon de l'ADR 0031, réapprise.
