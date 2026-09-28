# AUTH-SPEC — Supabase auth dans l'app Next.js

**Statut :** OWNER-DIRECTED (arc persistance) ; décisions marquées
`[LEDGER 14.x]` = FABLE-DECIDED / OWNER-REVIEW-PENDING. **Analyse et
brouillons seulement** : rien ici ne se connecte à un projet vivant ; le
build de cette session tourne en mode `mock` (§5). État vérifié du code :
AUCUNE dépendance `@supabase/*`, aucun `middleware.ts`, aucun `.env*`,
aucune route de compte (scout, `web/package.json`, arborescence).

---

## 1. La méthode — pour des lycéens marocains

**Décision : e-mail + mot de passe comme socle, Google OAuth comme chemin
rapide. PAS de SMS-OTP. PAS de magic-link seul.** `[LEDGER 14.9]`

Raisons :
- **SMS-OTP** : coût par message (Twilio et parents) sur un produit
  gratuit ; fiabilité variable des passerelles vers les opérateurs
  marocains ; et un numéro de téléphone est une donnée plus sensible
  qu'un e-mail pour des mineurs. Écarté.
- **Magic-link seul** : les lycéens ouvrent rarement leur boîte mail sur
  le téléphone où ils travaillent ; la boucle « va chercher le lien »
  casse la session d'étude (anti-§7). Écarté comme UNIQUE méthode ;
  reste disponible comme secours « mot de passe oublié ».
- **Google** : le parc lycéen marocain est massivement Android — un compte
  Google existe déjà ; c'est le chemin à deux tapotements. Mais pas SEUL :
  les comptes scolaires/familiaux partagés existent, et une dépendance
  unique à Google est un risque de verrouillage. Donc : rapide mais pas
  exclusif.
- **E-mail + mot de passe** : fonctionne pour tout le monde, hors ligne
  des politiques d'un tiers, et Supabase le gère nativement avec
  confirmation e-mail optionnelle (v1 : confirmation DÉSACTIVÉE — la
  friction d'un e-mail de confirmation coûte plus que le risque d'un
  compte-jouet sur un produit sans contenu payant ; à réévaluer si l'abus
  apparaît). `[LEDGER 14.10]`

## 2. Le motif de session — SSR par cookies, périmètre dynamique minimal

**Décision : `@supabase/ssr` (cookies httpOnly) + `middleware.ts` scoppé
UNIQUEMENT aux routes authentifiées.** `[LEDGER 14.11]`

- Le site est SSG et doit le rester (61 leçons statiques, dom-truth,
  print). Le middleware Next transforme en dynamique ce qu'il matche :
  son `matcher` ne couvre donc QUE `/moi/:path*` et `/connexion` —
  jamais `/notions/*` ni `/`.
- Client navigateur : `createBrowserClient` (module `web/src/lib/auth/`)
  instancié PARESSEUSEMENT et seulement si `NEXT_PUBLIC_AUTH_MODE=live`
  — l'app sans auth ne charge pas un octet de Supabase.
- Serveur (routes protégées) : `createServerClient` + refresh de session
  dans le middleware (le motif documenté @supabase/ssr).
- La page d'accueil reste STATIQUE : la couche personnalisée s'hydrate
  côté client quand une session existe (progressive enhancement calme) ;
  l'HTML servi est l'état zéro honnête — déjà correct pour tous.

## 3. La carte public / protégé

**Décision** `[LEDGER 14.12]` :

| Surface | Accès | Raison |
|---|---|---|
| `/`, `/matieres/*`, `/notions/*`, options | **Public** | bible : les leçons se partagent, s'impriment, se référencent ; l'app EST utile sans compte (aucun paywall de connaissance) |
| Progression rendue sur `/` (couche session) | Session présente | enhancement, jamais un mur |
| `/moi` (tableau de bord détaillé, diagnostic misconceptions) | **Authentifié** | données personnelles ; le diagnostic A/C/U n'existe que par élève |
| `/connexion` | Public | entrée |
| Écritures (événements, progression) | **service_role via RPC uniquement** | règle 047 — jamais d'écriture directe client |

L'entrée UI : un lien calme « Se connecter » dans le cluster droit du
header (`SiteHeader.tsx:173-199`), rendu UNIQUEMENT si
`NEXT_PUBLIC_AUTH_MODE ≠ off` ; session présente → l'initiale de l'élève,
menu déconnexion. Pas d'avatar tiers, pas de badge.

## 4. La question d'environnement — analysée, PAS exécutée

Options pour la preview `bac-pink` :

| Option | Pour | Contre |
|---|---|---|
| (a) Preview → **auth du projet PROD** (`iwoydyudjondihzzsqay`) | zéro projet en plus | **inacceptable** : des comptes/événements d'essai écriraient dans la base de production — violation frontale de RULES §0 (« nothing touches prod ») ; irréversible côté auth.users |
| (b) Preview → **projet STAGING** (`bac-app-staging`, `miscjaztsputtdalwcjp`) | isolation totale ; le projet existe déjà ; c'est exactement son rôle (ADR 0005) | l'écart historique `on_auth_user_created` (le trigger manque sur staging — ADR 0013:230-241, jamais refermé) DOIT être fermé d'abord, sinon chaque inscription y crée un user sans profil et tout FK échoue |
| (c) Troisième projet neuf | isolation aussi | prolifération ; staging existe déjà ; l'écart 013 resterait ouvert quelque part |

**Recommandation : (b)** — staging pour la preview, MAIS gated : la
fermeture du trigger (`docs/drafts/migrations/050`) et l'évaluation d'état
staging passent par la session de synchronisation supervisée
(`docs/pipeline/production-sync-session.md`) AVANT tout branchement.
Connexion de la preview à prod : jamais ; prod ne rencontre l'auth
qu'après la porte propriétaire complète. `[LEDGER 14.13]`

Vercel (le jour du branchement, pas avant) : `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY` (staging), `NEXT_PUBLIC_AUTH_MODE=live` —
la clé service_role ne va JAMAIS dans Vercel : les écritures passent par
les edge functions Supabase (le motif submit-answer, ADR 0013).

## 5. Les trois modes de build (ce qui rend cette session possible)

`NEXT_PUBLIC_AUTH_MODE = off | mock | live` :
- **off** (défaut absent) : aucune UI d'auth, zéro delta visuel — l'app
  d'aujourd'hui.
- **mock** : toute l'UI rend (connexion, header, états du tableau de
  bord) contre un `MockAuthProvider` en mémoire (aucun réseau, aucune
  dépendance @supabase, un utilisateur factice « Élève Test » activable
  par bouton en dev). C'est le mode de CETTE session et des shots.
- **live** : @supabase/ssr + staging — n'existe qu'après la porte (§4).
La dépendance `@supabase/*` n'entre dans package.json QU'AVEC le mode
live (pas de dépendance dormante). `[LEDGER 14.14]`

## Retraits et corrections

*(néant pour l'instant)*
