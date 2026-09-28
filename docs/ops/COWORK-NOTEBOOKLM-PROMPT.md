# Prompt Cowork — installation NotebookLM + notebooks + test vidéo

> Copier-coller le bloc ci-dessous tel quel dans Cowork, ouvert sur le
> dossier de ce dépôt. Rédigé le 2026-08-11 ; compagnon de
> `docs/ops/NOTEBOOKLM-SETUP.md` (le pourquoi et les règles d'usage).

---

You are working in the BAC repo folder (Moroccan baccalauréat prep app).
Your mission: finish the NotebookLM integration end-to-end on this
machine — authentication, notebook registration, source seeding, a
grounded Q&A smoke test, and one video-QA experiment. The repo's
`.mcp.json` already declares the `notebooklm` MCP server (pinned
`notebooklm-mcp@2.0.0`); background and usage rules are in
`docs/ops/NOTEBOOKLM-SETUP.md`. Work step by step and STOP at the
marked pause points until I confirm.

GROUND RULES
- Never ask me for my Google password or any credential. The login
  happens in the Chrome window the tool opens; I type it myself.
- NotebookLM answers are cross-checks (recoupement), never
  certification — do not present them as authoritative over official
  scans, and say so in your final report.
- Do not commit or push anything to git in this task.
- Anything you write for the project uses French typography (decimal
  commas, « — », accents).

STEP 0 — Prerequisites
Check `node --version` (need ≥ 20) and that Google Chrome is installed.
If either is missing, tell me exactly what to install and STOP.

STEP 1 — Authentication
1. Call the `notebooklm` MCP tool `get_health`.
2. If `authenticated: false`: call `setup_auth`. A visible Chrome
   window opens → PAUSE and tell me to complete the Google login in
   that window; wait for my "done".
3. Call `get_health` again and confirm `authenticated: true`. If it
   still fails, run the tool's troubleshooting tip (close Chrome
   instances → `cleanup_data(confirm=true, preserve_library=true)` →
   `setup_auth`) once, then report.

STEP 2 — Create the notebooks (I do the clicks, you guide)
Ask me to create these FIVE notebooks at notebooklm.google.com, with
these exact names, and to paste each notebook's URL back to you:
1. `BAC — Cadres officiels`
2. `BAC — Sujets & corrigés Maths`
3. `BAC — Sujets & corrigés PC`
4. `BAC — SVT corpus`
5. `BAC — Explications animées (QA)`
PAUSE until you have all five URLs.

STEP 3 — Register them
For each URL: `add_notebook`. Then `list_notebooks` and show me the
table (name + id) to confirm all five are registered.

STEP 4 — Seed sources
Into `BAC — Sujets & corrigés Maths`, add these AlloSchool element
pages via `add_source` (one call per URL):
- https://www.alloschool.com/element/94699  (SExp 2018, maths)
- https://www.alloschool.com/element/57970  (SM 2017)
- https://www.alloschool.com/element/65508  (SM 2018)
- https://www.alloschool.com/element/109635 (SM 2020)
- https://www.alloschool.com/element/136604 (SM 2022)
- https://www.alloschool.com/element/145739 (SM 2024)
Into `BAC — Sujets & corrigés PC`:
- https://www.alloschool.com/element/136621 (SPC 2022)
- https://www.alloschool.com/element/142476 (SPC 2023)
- https://www.alloschool.com/element/145763 (SPC 2024)
- https://www.alloschool.com/element/145796 (SPC 2025)
For `BAC — Cadres officiels`: ask me for the official cadre de
référence PDFs (Maths / PC / SVT). If I don't have them at hand, skip —
do NOT substitute unofficial sources; fidelity beats coverage.
Leave `BAC — SVT corpus` empty for now (separate patch).
Wait ~30 s after the last `add_source`, then confirm each notebook's
source count.

STEP 5 — Grounded Q&A smoke test
On `BAC — Sujets & corrigés Maths`, call `ask_question`:
« Dans l'épreuve de mathématiques 2018, session normale, filière
Sciences Expérimentales (code NS 22F) : quelle est la composition des
exercices et leur barème ? Cite tes sources. »
Expected (for your own verification, not to feed the model): 4 parts —
géométrie de l'espace 3 pts, nombres complexes 3 pts, calcul des
probabilités 3 pts, problème d'analyse 11 pts. Keep the `session_id`,
ask one follow-up on the same session, and check citations are present.
Report the answers verbatim with their citations.

STEP 6 — Video-QA experiment (the interesting one)
Context: our Manim pilot video explains the 2018 SExp complexes
exercise. I have the file `explication-2018-complexes-pilote.mp4`
(delivered to me in Claude chat — ask me for its location, or I'll drag
it myself).
1. Ask me to upload that mp4 as a source into
   `BAC — Explications animées (QA)` in the NotebookLM UI (drag & drop
   — the MCP tool only adds text/URLs).
2. Once indexed, `ask_question` on that notebook:
   « Cette vidéo corrige l'exercice suivant, copié verbatim du sujet
   officiel : [PASTE the full énoncé from
   content/maths/nombres-complexes-1/bank.yaml, entry bk-2018-n-x2 —
   read it from the repo]. Vérifie chaque valeur et chaque étape
   affichées dans la vidéo contre cet énoncé : liste toute divergence,
   erreur mathématique ou valeur approximative, avec l'horodatage
   approximatif. Si tout est conforme, dis-le explicitement. »
3. Report NotebookLM's verdict verbatim. This is an EXPERIMENT: we are
   evaluating whether video-QA is reliable enough to join the
   animation pipeline as a standing recoupement step. Note both the
   verdict and your judgment of its quality (did it actually read the
   math, or hallucinate?).

STEP 7 — Final report
Give me a compact summary: auth status, the five notebooks (name, id,
source count), the Q&A answers with citations, the video-QA verdict and
your reliability assessment, and anything that broke (the server is a
community tool driving Chrome — breakage is possible and only needs
reporting, not heroics).

---

> Après exécution : reporter le verdict vidéo-QA dans la session Claude
> Code du dépôt pour qu'il entre au journal du plan (et, s'il est
> concluant, au pipeline d'animation comme étape de recoupement).
