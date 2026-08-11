# NotebookLM comme vérificateur documentaire à coût zéro

Décision owner 2026-08-07 (ADR 0028, verdicts compagnons) : utiliser
NotebookLM (Google, inclus dans l'abonnement Google Pro de l'owner)
pour interroger les corpus documentaires — cadres de référence,
sujets/corrigés, manuels — **sans brûler de tokens Claude** : c'est
Gemini qui lit, Claude ne reçoit que la réponse sourcée.

## Ce que c'est (et ses limites, dites franchement)

Il n'existe **aucune API officielle** NotebookLM. Le pont est un serveur
MCP communautaire — `notebooklm-mcp` — qui pilote une vraie session
Chrome authentifiée et renvoie des réponses **citées** ancrées dans vos
notebooks. Conséquences :

- Non officiel : peut casser quand Google change l'interface.
- Outillage utile, **jamais autorité** : pour une transcription, le scan
  officiel reste la seule vérité ; NotebookLM sert au recoupement et à
  l'exploration, pas à la certification.
- N'y verser que des documents non sensibles (sujets publics, cadres
  officiels, manuels) — c'est le compte Google de l'owner.

## Installation (poste de l'owner, ~10 minutes)

1. Prérequis : Node.js ≥ 20 et Chrome installés.
2. Ajouter le serveur à la config MCP de l'app Claude du poste
   (Claude Desktop/Cowork → Settings → Developer → Edit Config), bloc à
   fusionner dans `claude_desktop_config.json` :

   ```json
   {
     "mcpServers": {
       "notebooklm": {
         "command": "npx",
         "args": ["-y", "notebooklm-mcp@latest"]
       }
     }
   }
   ```

3. Redémarrer l'app Claude. Au premier appel d'outil `notebooklm`, une
   fenêtre Chrome s'ouvre : se connecter au compte Google (l'auth
   persiste ensuite).
4. Vérifier : demander à Claude « liste mes notebooks NotebookLM ».

Réf. : dépôt `PleasePrompto/notebooklm-mcp` (v2.x) ; alternative CLI :
`jacob-bd/notebooklm-mcp-cli`.

## Les notebooks à créer (sur notebooklm.google.com)

| Notebook | Contenu à verser | Sert à |
|---|---|---|
| `BAC — Cadres officiels` | Cadres de référence PC / Maths / SVT (PDF officiels) | Arbitrages de périmètre (les SCOPE-NOTES en attente), lane SVT |
| `BAC — Sujets & corrigés Maths` | PDF des épreuves + corrigés par année | Recoupement des transcriptions et des corrigés de banque |
| `BAC — Sujets & corrigés PC` | idem PC | idem |
| `BAC — SVT corpus` | Sujets SVT + documents de cours | La future patch SVT (raisonnement sur documents) |

## Règles d'usage (à respecter dans les sessions)

1. **Recoupement, pas certification** : une réponse NotebookLM ne
   promeut jamais un Statut à « vérifié » — seule la lecture du scan le
   fait. Elle peut en revanche *déclencher* une re-lecture ciblée.
2. Toujours exiger les **citations** dans la réponse et les reporter
   dans la trace de la session.
3. Les arbitrages de cadre restent owner-gated : NotebookLM fournit la
   pièce au dossier, l'owner tranche.
4. Si le serveur casse (changement d'UI Google) : le noter dans la
   session, continuer sans — aucune lane n'a le droit d'en dépendre.
