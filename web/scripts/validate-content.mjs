/**
 * validate-content.mjs — catch render-breaking content before the owner sees it.
 * Loaders are fail-safe (bad YAML → section silently dropped; KaTeX strict:false
 * → red inline error, non-fatal; an unknown [[marker]] → silent null), so the
 * BUILD stays green even with broken content. This validator surfaces what the
 * build hides:
 *   - every $…$ / $$…$$ block parses under KaTeX (throwOnError)
 *   - un bloc $$ multi-lignes se ferme sur une ligne « $$ » SEULE (sinon
 *     remark-math avale le paragraphe suivant — cinq cas vivants le
 *     2026-09-04)
 *   - items.yaml / checkpoints.yaml / exercises.yaml / derivations.yaml parse
 *   - MEDIA MARKERS resolve to a backing asset (the honest-state guard):
 *       [[figure:slug]]  → media/<slug>.svg           MUST exist (else renders nothing)
 *       [[motion:slug]]  → media/<slug>.motion.svg    MUST exist (+ warn if no .motion.json)
 *       [[embed:slug]]   → media/<slug>.json          optional (missing → honest "à venir" placeholder)
 *       [[checkpoint|exercise|derivation:id]] → id present in the matching YAML
 *       [[video:slug]]   → AVERTIT, ne bloque pas — et c'est délibéré depuis le
 *                          2026-09-05, où l'en-tête a été corrigé pour dire ce que le
 *                          code fait. `NotionBody` rend `null` sur ce marqueur (omission
 *                          gracieuse voulue par le brief : jamais de placeholder d'erreur),
 *                          et le corpus en porte UN — le clip « balancement » de
 *                          pc/rlc-serie, précédé d'un commentaire qui l'assume comme slot
 *                          d'amélioration. Échouer casserait le build sur une décision
 *                          prise ; se taire perdrait la trace. On avertit.
 *   - no authoring lexicon leaks in rendered prose (a stray inline `[[`, TODO,
 *     SLOT, À SOURCER … — comments are stripped first)
 *   - STAGED FIGURES (LESSON-EXPERIENCE-SPEC §2.7) — a directory-level scan of
 *     media/, independent of which markers appear in lesson.md:
 *       media/<slug>.stages.json present  → sibling media/<slug>.svg MUST exist,
 *                                            stages.length MUST equal the max
 *                                            id="step-N" in that SVG, every
 *                                            caption MUST be a non-empty string
 *                                            (all hard failures)
 *       media/<slug>.svg has id="step-N" groups but NO .stages.json sidecar →
 *         warning "(migration pending)", except the four already-grouped
 *         legacy figures (rlc-schema, regimes-uc, energy-exchange,
 *         loi-mailles-build) which warn "(legacy occurrence mechanism)"
 *
 *   Summit-conversion campaign additions (KaTeX-in-YAML onward, below) — the
 *   same fail-safe loaders mean a broken sidecar field or an unconverted
 *   lesson can go green in the build while being wrong in the browser; these
 *   checks close that gap for the sidecars, not just lesson.md prose:
 *   - KATEX-IN-YAML: every $…$ / $$…$$ (or, where noted, raw undelimited)
 *     math segment inside the sidecars' string fields parses under the exact
 *     KaTeX options used for lesson.md prose (renderToString, strict:false,
 *     throwOnError:true). Fields checked, per file:
 *       items.yaml / checkpoints.yaml → stem, choices[].text,
 *         choices[].feedback, correct_feedback, solution (all delimited)
 *       exercises.yaml → intro, questions[].stem, questions[].reasoning
 *         (delimited); questions[].steps[].math (RAW KaTeX, no $ delimiters —
 *         the whole string is validated, matching how Derivation wraps it in
 *         `$$…$$` at render time)
 *       derivations.yaml → steps[].math (RAW, same as above), steps[].note
 *         (delimited)
 *     Failures report `file → field path` (hard fail).
 *   - REASONING ON EVERY QUESTION: every exercises.yaml question must carry a
 *     non-empty `reasoning` string — hard fail listing the offending question ids.
 *   - EXACTLY-ONE-CORRECT: every `type: mcq` entry in items.yaml and
 *     checkpoints.yaml must have exactly one `choices[].correct: true` — hard fail.
 *   - SOURCING GATE: every exercises.yaml entry needs a `sourcing.status` of
 *     sourced|unsourced|not-applicable (hard fail if missing/invalid).
 *     `status: sourced` additionally requires `note` to contain a bac year
 *     (19|20)\d{2} AND one of normale|rattrapage (hard fail otherwise —
 *     "sourced" without both is a faked citation, not a real one). Separately,
 *     `required_for_done: true` while `status` isn't yet `sourced` is a
 *     WARNING by default and a HARD FAIL under `--strict` (the flag the
 *     "is this notion actually done" gate should run with).
 *   - CONVERTED-LESSON CONTRACT: if exercises.yaml exists for a notion,
 *     lesson.md MUST contain ≥1 own-line [[exercise:…]] marker (hard fail)
 *     and MUST NOT contain any retired summit-template heading — "### Exercice
 *     travaillé", "**Raisonnement à voix haute.**", or a bare "### À toi" /
 *     "### À toi de jouer" heading (case-sensitive; the latter matched only
 *     at line-start so unrelated prose mentioning "à toi" doesn't false-
 *     positive) — hard fail per distinct heading found.
 *   - ORPHAN CHECKPOINTS (warning only): every checkpoints.yaml id should be
 *     referenced by EXACTLY ONE [[checkpoint:id]] marker in lesson.md; zero
 *     or multiple references are reported as warnings, not failures (a
 *     checkpoint bank entry not yet placed, or placed twice, is a content
 *     smell worth flagging but not a render-breaker).
 *
 * A marker only resolves if it is ALONE on its own line (NotionBody's rule).
 *
 * Usage: node scripts/validate-content.mjs [--strict] <content-dir> [<content-dir> …]
 *        (dirs relative to repo root, e.g. content/pc/dipole-rl)
 *        --strict: promotes the sourcing gate's required_for_done warning to a
 *        hard failure. Parsed out of argv before the dir list; may appear
 *        anywhere among the arguments.
 */
import katex from "katex";
import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

// ── §11.97 — DETTE DÉCLARÉE : les tables qui comptent un barreau SANS chapitre.
//    Ces items visent un code de barreau auquel aucun titre de leçon ne répond :
//    ils sont structurellement inatteignables. Le remède est ÉDITORIAL (à quel
//    chapitre appartiennent-ils ?) et non mécanique — ajouter « R6 — » au titre
//    voisin ferait tomber les signalements à zéro en rangeant trois problèmes de
//    Bayes sous un chapitre « variable aléatoire », et cinq questions de tableau
//    de signes sous un chapitre « fonction réciproque ». Le vert serait acheté là
//    où plus aucun instrument ne regarde (§11.69). Mesuré et daté le 2026-09-19.
//    Retirer une entrée dès que la dette est payée : la porte échoue AUSSI si une
//    entrée ne correspond plus à rien.
const DETTE_BARREAU_FANTOME = new Map([
  ["content/maths/derivabilite-etude-fonctions", ["R6"]],
  ["content/maths/limites-continuite", ["R7"]],
  ["content/maths/probabilites-conditionnelles", ["R6", "R7"]],
]);
const fantomesVus = new Set();

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const rawArgv = process.argv.slice(2);
const strictMode = rawArgv.includes("--strict");
const dirs = rawArgv.filter((a) => a !== "--strict");
if (!dirs.length) { console.error("usage: node scripts/validate-content.mjs [--strict] <dir>…"); process.exit(2); }

// Marker alone on its own line — mirrors NotionBody's MARKER_LINE_RE exactly.
const MARKER_LINE = /^[ \t]*\[\[(figure|motion|embed|checkpoint|video|exercise|derivation):([a-zA-Z0-9_-]+)\]\][ \t]*$/;

function stripCommentsAndFences(md) {
  return md.replace(/<!--[\s\S]*?-->/g, "").replace(/```[\s\S]*?```/g, "");
}

// Strip comments/fences/markers, then pull math spans.
function mathSpans(src) {
  const display = [...src.matchAll(/\$\$([\s\S]*?)\$\$/g)].map((m) => m[1]);
  const stripped = src.replace(/\$\$[\s\S]*?\$\$/g, "");
  const inline = [...stripped.matchAll(/\$([^\n$]+?)\$/g)].map((m) => m[1]);
  return { display, inline };
}

// Authoring-leak lexicon (NOT the media markers, which are handled separately).
const LEXICON = /TODO|FIXME|SLOT D|AMÉLIORATION|[Àà] [Ss]ourcer|À FAIRE|asset-pending|<!--\s*SLOT/;

// Figures already grouped step-N BEFORE the StagedFigure mechanism existed —
// migrating them to a .stages.json sidecar is tracked in the ledger migration
// table, not owed by this validator; they warn distinctly from a plain
// "migration pending" figure so the two backlogs stay legible at a glance.
// (docs/audits/fable-day3-ledger.md §11 migration table.)
const LEGACY_STEP_SLUGS = new Set([
  "rlc-schema",
  "regimes-uc",
  "energy-exchange",
  "loi-mailles-build",
]);

// ── Summit-conversion campaign constants ────────────────────────────────
const SOURCING_STATUSES = new Set(["sourced", "unsourced", "not-applicable"]);
const SOURCE_YEAR_RE = /(19|20)\d{2}/;
const SOURCE_SESSION_RE = /normale|rattrapage/;
// Retired summit-template headings — plain case-sensitive substrings.
const LEGACY_HEADING_SUBSTRINGS = ["### Exercice travaillé", "**Raisonnement à voix haute.**"];

/** Collect every `id:` value anywhere in a parsed YAML tree. */
function collectIds(node, out) {
  if (Array.isArray(node)) { for (const v of node) collectIds(v, out); }
  else if (node && typeof node === "object") {
    if (typeof node.id === "string") out.add(node.id);
    for (const v of Object.values(node)) collectIds(v, out);
  }
  return out;
}

/**
 * Run a string field's math through KaTeX with the exact prose options.
 * rawDisplay=false (default): the field is markdown-ish prose — extract
 * $…$ / $$…$$ spans via mathSpans() and validate each independently.
 * rawDisplay=true: the field IS the KaTeX source with no delimiters (a
 * `steps[].math` value) — validated whole, in display mode (matches how
 * Derivation/AttemptFirstExercise wrap it in `$$…$$` at render time).
 * Returns { checked, fails } — does not print or count; the caller does,
 * so it can prefix the file/field path per the "file → field path" contract.
 */
/**
 * Rend une expression et transforme en ÉCHEC le « No character metrics »
 * de KaTeX.
 *
 * Pourquoi c'est un échec et pas un avertissement : `throwOnError` ne couvre
 * que les erreurs d'ANALYSE. Un caractère que la police n'a pas — un ✔ ou un
 * guillemet français glissé dans un `\text{}` — s'analyse parfaitement, part
 * en `console.warn`, et **se rend chez l'élève en glyphe cassé**. La porte
 * l'imprimait donc sans jamais tomber : six occurrences avaient franchi la
 * porte et vivaient en production au 2026-08-27 (quatre ✔ dans du display
 * math, un couple « » dans un `\text{}` — exactement le piège que les
 * conventions maison nomment déjà).
 */
function rendreOuEchouer(expr, displayMode, fails, mode) {
  const warnOriginal = console.warn;
  const glyphesManquants = [];
  console.warn = (...args) => {
    const msg = args.map(String).join(" ");
    if (msg.includes("No character metrics")) glyphesManquants.push(msg);
    else warnOriginal(...args);
  };
  try {
    katex.renderToString(expr, { displayMode, throwOnError: true, strict: false });
  } catch (err) {
    fails.push({ mode, expr, msg: err.message.split("\n")[0] });
  } finally {
    console.warn = warnOriginal;
  }
  for (const g of glyphesManquants) {
    fails.push({ mode, expr, msg: `${g} — ce caractère se rend en glyphe cassé chez l'élève` });
  }
}

function katexFailures(str, rawDisplay) {
  if (typeof str !== "string" || !str.length) return { checked: 0, fails: [] };
  const fails = [];
  if (rawDisplay) {
    rendreOuEchouer(str, true, fails, "display");
    return { checked: 1, fails };
  }
  const { display, inline } = mathSpans(str);
  for (const e of display) rendreOuEchouer(e, true, fails, "display");
  for (const e of inline) rendreOuEchouer(e, false, fails, "inline");
  return { checked: display.length + inline.length, fails };
}

let failures = 0;
for (const dir of dirs) {
  const abs = path.join(REPO, dir);
  const mediaDir = path.join(abs, "media");
  const lesson = path.join(abs, "lesson.md");
  if (!fs.existsSync(lesson)) { console.error(`✗ ${dir}: no lesson.md`); failures++; continue; }
  const md = fs.readFileSync(lesson, "utf8");
  let dirFail = 0;
  let figN = 0, motN = 0, embN = 0, stgN = 0, itxN = 0, yamlMathN = 0;

  // file/field-path-scoped KaTeX check (summit-conversion campaign) — closes
  // over dir/dirFail/yamlMathN for this iteration.
  function katexField(y, fieldPath, str, rawDisplay = false) {
    const { checked, fails } = katexFailures(str, rawDisplay);
    yamlMathN += checked;
    for (const f of fails) {
      console.error(`  ✗ ${dir}/${y} → ${fieldPath} [${f.mode}] "${f.expr.slice(0, 60)}" → ${f.msg}`);
      dirFail++;
    }
  }

  // ── LES CODES DE BARREAU NE SORTENT PAS DANS LA PROSE NON PLUS ───────────
  //
  // Même porte que celle des figures (plus bas), appliquée au texte que
  // l'élève lit. Un « R3 » désigne une section dont il ne voit JAMAIS le
  // code : LessonRenderer retire le préfixe « R<n> — » des titres, et
  // chapters.ts fait de même pour le rail. Ce qu'il VOIT, c'est le NUMÉRO du
  // chapitre — dans le rail (« 3 · Établir l'équation »), dans la position
  // (« Chapitre 3 / 11 ») et dans l'URL (?chapitre=3).
  //
  // Le mot anglais « rung » tombe sous la même règle : c'est du vocabulaire
  // de rédaction, il ne dit rien à un élève qui lit en français, et le mot
  // juste — celui de l'interface — est « chapitre ».
  //
  // Mesuré le 2026-09-04 avant la campagne : 1 122 codes et 252 « rung » dans
  // la prose visible de 56 leçons. La réécriture (scripts/renvois-barreaux.py)
  // les a tous portés vers un numéro de chapitre CALCULÉ à partir de la leçon
  // elle-même — jamais deviné. Cette porte est ce qui empêche le retour.
  //
  // HORS CHAMP, et c'est voulu : les TITRES `## R<n> — …` (le préfixe porte
  // data-rung et attache les items du chapitre ; il est retiré au rendu), les
  // COMMENTAIRES d'auteur et les blocs de code. C'est là que l'information
  // « ce passage sert le R2 » doit vivre.
  {
    const visible = md
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .split("\n")
      .filter((l) => !/^#{2,6}\s/.test(l))
      .join("\n");
    const codes = [...new Set(visible.match(/\bR\d+\b/g) ?? [])];
    const rungs = visible.match(/\brungs?\b/gi) ?? [];
    if (codes.length || rungs.length) {
      const quoi = [
        codes.length ? `code(s) de barreau ${codes.slice(0, 5).join(", ")}` : null,
        rungs.length ? `${rungs.length} fois le mot « rung »` : null,
      ].filter(Boolean).join(" et ");
      console.error(
        `  ✗ ${dir}: lesson.md → ${quoi} dans la prose visible — ` +
          `l'élève ne voit jamais ces codes ni ce mot. Renvoie au NUMÉRO du chapitre ` +
          `(« au chapitre 4 »), qu'il lit dans le rail et dans « Chapitre n / N ».`
      );
      dirFail++;
    }
  }

  // Parse the YAML sidecars once (also used for marker id-resolution).
  const yamlIds = {}; // filename → Set of ids
  const yamlDocs = {}; // filename → parsed doc (absent if missing/parse-failed)
  for (const y of ["items.yaml", "checkpoints.yaml", "exercises.yaml", "derivations.yaml", "bank.yaml"]) {
    const yp = path.join(abs, y);
    if (fs.existsSync(yp)) {
      const rawYaml = fs.readFileSync(yp, "utf8");
      try {
        const doc = yaml.load(rawYaml);
        yamlIds[y] = collectIds(doc, new Set());
        yamlDocs[y] = doc;
      }
      catch (err) { console.error(`  ✗ ${dir}/${y}: ${err.message.split("\n")[0]}`); dirFail++; yamlIds[y] = new Set(); }
      // Class guard (hunt 07-06): TeX inside a DOUBLE-QUOTED YAML string must
      // be written \\cmd — a single \cmd is eaten by YAML's escape processing
      // and reaches KaTeX mangled (found live: \approx → « pprox », a red
      // .katex-error on every RLC surface). Convention: quoted strings never
      // use single-backslash escapes; literal newlines use block scalars.
      // Only VALUE-POSITION quoted scalars (`key: "…"` / `- "…"`): quotes
      // inside block scalars are literal characters, not YAML delimiters
      // (false positive found live: arithmetique items.yaml:194).
      let lineNo = 0;
      for (const line of rawYaml.split("\n")) {
        lineNo++;
        const m = line.match(/(?::|-)\s*"((?:[^"\\]|\\.)*)"\s*$/);
        if (!m) continue;
        const bad = m[1].match(/(?<!\\)\\[a-zA-Z]\w*/);
        if (bad) {
          console.error(`  ✗ ${dir}/${y}:${lineNo}: single-backslash « ${bad[0]} » in double-quoted string (YAML eats or rejects the escape — write \\\\${bad[0].slice(1)} or use a block scalar)`);
          dirFail++;
        }
      }
    }
  }

  // ── Un tag de misconception doit être DÉCLARÉ (échec, pas avertissement).
  //    `build-learner-inputs.mjs` prend la valeur de `misconception:` TELLE
  //    QUELLE (`targets.add(tag)`) sans la confronter aux `misconceptions:`
  //    déclarées : une valeur non déclarée entre donc dans l'artefact du modèle
  //    apprenant (`item-misconceptions.json` + son porteur `.ts`) comme un
  //    modèle FANTÔME, à côté d'ids réels, et l'élève qui coche ce distracteur
  //    se voit attribuer un état diagnostique qui n'existe nulle part.
  //    Trouvé le 2026-09-12 : `hors_cadre_probe` — une étiquette d'AUTEUR
  //    parfaitement légitime dans `tags:` — employée comme valeur de
  //    `misconception:` sur trois distracteurs de `pc/systemes-oscillants`, et
  //    compilée telle quelle dans les trois artefacts.
  //    C'est un ÉCHEC et non un avertissement parce que la faute ne s'arrête
  //    pas au fichier : elle sort dans un artefact d'exécution.
  {
    const items = yamlDocs["items.yaml"];
    const declarees = new Set(
      (Array.isArray(items?.misconceptions) ? items.misconceptions : [])
        .map((m) => m?.id)
        .filter((x) => typeof x === "string"),
    );
    if (declarees.size) {
      const liste = (x) => (x == null ? [] : Array.isArray(x) ? x : [x]);
      for (const [y, cle] of [["items.yaml", "items"], ["checkpoints.yaml", "checkpoints"]]) {
        const doc = yamlDocs[y];
        if (!doc) continue;
        for (const e of Array.isArray(doc[cle]) ? doc[cle] : []) {
          const id = typeof e?.id === "string" ? e.id : "?";
          const vus = [
            ...liste(e?.primary_misconception).map((v) => [v, "primary_misconception"]),
            ...(Array.isArray(e?.choices) ? e.choices : []).flatMap((c) =>
              liste(c?.misconception).map((v) => [v, `choix ${c?.id ?? "?"}`]),
            ),
          ];
          for (const [v, ou] of vus) {
            if (typeof v !== "string" || declarees.has(v)) continue;
            console.error(
              `  ✗ ${dir}/${y} → ${id} (${ou}) : misconception « ${v} » NON DÉCLARÉE — ` +
                `elle serait compilée telle quelle dans le modèle apprenant ; la déclarer, ` +
                `ou (si c'est une étiquette d'auteur) la laisser dans \`tags:\` seulement`,
            );
            dirFail++;
          }
        }
      }
    }
  }

  // ── Summit-conversion campaign: content checks on the parsed sidecars ──

  // items.yaml / checkpoints.yaml share the same item schema — KaTeX in
  // stem/choices[].text/choices[].feedback/correct_feedback/solution, and
  // exactly-one-correct for every `type: mcq` entry.
  for (const y of ["items.yaml", "checkpoints.yaml"]) {
    const doc = yamlDocs[y];
    if (!doc) continue;
    const arrKey = y === "items.yaml" ? "items" : "checkpoints";
    const arr = Array.isArray(doc[arrKey]) ? doc[arrKey] : [];
    for (const item of arr) {
      const id = typeof item?.id === "string" ? item.id : "?";
      katexField(y, `${id}.stem`, item?.stem);
      const choices = Array.isArray(item?.choices) ? item.choices : [];
      let correctN = 0;
      for (const c of choices) {
        const cid = typeof c?.id === "string" ? c.id : "?";
        katexField(y, `${id}.choices[${cid}].text`, c?.text);
        katexField(y, `${id}.choices[${cid}].feedback`, c?.feedback);
        if (c?.correct === true) correctN++;
      }
      katexField(y, `${id}.correct_feedback`, item?.correct_feedback);
      katexField(y, `${id}.solution`, item?.solution);

      if (item?.type === "mcq" && correctN !== 1) {
        console.error(`  ✗ ${dir}/${y}: ${id} has ${correctN} correct choice(s) (must be exactly 1)`);
        dirFail++;
      }
    }
  }

  // exercises.yaml — KaTeX in intro/questions[].stem/reasoning (delimited)
  // and questions[].steps[].math (raw); reasoning required on every
  // question; the sourcing gate.
  {
    const doc = yamlDocs["exercises.yaml"];
    if (doc) {
      const arr = Array.isArray(doc.exercises) ? doc.exercises : [];
      const missingReasoning = [];
      for (const ex of arr) {
        const exId = typeof ex?.id === "string" ? ex.id : "?";
        katexField("exercises.yaml", `${exId}.intro`, ex?.intro);

        // Sourcing gate — authoring-side only, never rendered (see the
        // header comment on exercises.yaml itself for the "not DONE" rule).
        const sourcing = ex?.sourcing;
        const validStatus = !!sourcing && typeof sourcing === "object" && SOURCING_STATUSES.has(sourcing.status);
        if (!validStatus) {
          console.error(`  ✗ ${dir}/exercises.yaml: ${exId} has no valid sourcing.status (must be sourced|unsourced|not-applicable)`);
          dirFail++;
        } else {
          if (sourcing.status === "sourced") {
            const note = typeof sourcing.note === "string" ? sourcing.note : "";
            if (!SOURCE_YEAR_RE.test(note) || !SOURCE_SESSION_RE.test(note)) {
              console.error(`  ✗ ${dir}/exercises.yaml: ${exId} sourcing.status=sourced but note lacks a bac year (19|20)\\d{2} and/or normale|rattrapage`);
              dirFail++;
            }
          }
          if (sourcing.required_for_done === true && sourcing.status !== "sourced") {
            const msg = `${dir}/exercises.yaml: ${exId} required_for_done=true but status="${sourcing.status}" (not sourced)`;
            if (strictMode) { console.error(`  ✗ ${msg}`); dirFail++; }
            else { console.error(`  ⚠ ${msg}`); }
          } else if (sourcing.status !== "sourced" && sourcing.status !== "not-applicable") {
            // §11.80 Le SECOND SENS de la porte de sourçage.
            //   Jusqu'ici, un exercice non sourcé n'était signalé QUE si
            //   `required_for_done: true`. Autrement dit, le drapeau qui déclare
            //   « cet exercice n'est pas bloquant » ÉTEIGNAIT aussi la seule voix
            //   qui disait qu'il n'est pas sourcé. Un badge vert ne voulait donc
            //   pas dire « tout est sourcé », mais « rien n'a été mesuré ».
            //
            //   Trouvé le 2026-09-12 sur pc/rlc-serie (r8-bac) ; deux notions
            //   seulement portent la combinaison, l'autre étant
            //   pc/atome-mecanique-newton (r-bac).
            //
            //   `required_for_done: false` peut être une décision délibérée du
            //   propriétaire — un exercice non bloquant. On la respecte : ceci
            //   n'échoue JAMAIS, même en --strict. Mais le silence, lui, n'est
            //   plus une option. ADR 0031 : une porte a deux sens quand un seul
            //   se laisse contourner.
            //
            //   SÉVÉRITÉ MESURÉE sur les 62 notions : 52 `sourced`,
            //   44 `not-applicable`, 2 `unsourced`. `not-applicable` est le
            //   statut NORMAL des 44 variations fabriquées — une variation
            //   n'est pas censée venir d'une annale, donc elle est EXEMPTÉE.
            //   Restent exactement les 2 vrais non-sourcés, et zéro faux.
            console.error(
              `  ⚠ ${dir}/exercises.yaml: ${exId} status="${sourcing.status}" (non sourcé) — ` +
                `non bloquant par choix (required_for_done=${sourcing.required_for_done}), mais non mesuré`
            );
          }
        }

        const questions = Array.isArray(ex?.questions) ? ex.questions : [];
        for (const q of questions) {
          const qid = typeof q?.id === "string" ? q.id : "?";
          katexField("exercises.yaml", `${exId}.${qid}.stem`, q?.stem);
          katexField("exercises.yaml", `${exId}.${qid}.reasoning`, q?.reasoning);
          if (typeof q?.reasoning !== "string" || !q.reasoning.trim().length) {
            missingReasoning.push(`${exId}.${qid}`);
          }
          const steps = Array.isArray(q?.steps) ? q.steps : [];
          steps.forEach((s, i) => {
            katexField("exercises.yaml", `${exId}.${qid}.steps[${i}].math`, s?.math, true);
            katexField("exercises.yaml", `${exId}.${qid}.steps[${i}].note`, s?.note);
          });
        }
      }
      if (missingReasoning.length) {
        console.error(`  ✗ ${dir}/exercises.yaml: question(s) missing non-empty "reasoning" → ${missingReasoning.join(", ")}`);
        dirFail += missingReasoning.length;
      }
    }
  }

  // bank.yaml — the « S'entraîner » bank (BANK-SPEC §5). Same question schema
  // and sourcing contract as exercises.yaml (KaTeX-in-YAML on intro/stem/
  // reasoning + raw steps[].math; reasoning required on every question; the
  // --strict sourcing gate), PLUS bank-specific checks: `bk-` id convention,
  // unique entry ids, source.year/session present and CONSISTENT with the
  // sourcing note, and no MCQs (exactly-one-correct is n/a in v1).
  {
    const doc = yamlDocs["bank.yaml"];
    if (doc) {
      // `notion:` DOIT nommer le dossier qui héberge le fichier. Ce champ est
      // porteur depuis le 2026-08-27 : c'est lui qui descend jusqu'à la clé
      // de révélation (`revealKey(notionId, itemId)` dans lib/student-state),
      // parce qu'un `entry_id` n'est unique que dans son propre fichier — 42
      // identifiants du corpus sont partagés entre notions. Un `notion:`
      // faux ne casserait rien de visible au build : il ferait juste pointer
      // les « fait » d'une banque vers une autre notion, silencieusement.
      // Voir BANK-SPEC §4 et known-issues K-7.
      {
        const attendu = dir.replace(/^.*content[/\\]/, "").replace(/[/\\]+$/, "").replace(/\\/g, "/");
        if (typeof doc.notion !== "string" || doc.notion !== attendu) {
          console.error(
            `  ✗ ${dir}/bank.yaml: notion="${doc.notion}" ne nomme pas son dossier (attendu "${attendu}") — la clé « fait » pointerait vers une autre notion`
          );
          dirFail++;
        }
      }
      const arr = Array.isArray(doc.entries) ? doc.entries : [];
      const missingReasoning = [];
      const seenIds = new Set();
      for (const e of arr) {
        const eId = typeof e?.id === "string" ? e.id : "?";

        // L'identifiant DOIT dire la position que le libellé imprime.
        //
        // `bk-<année>-<n|r>-x<position>` encode la place de l'exercice SUR LA
        // COPIE. Quand un exercice se découpe entre plusieurs notions, les
        // morceaux gardent le numéro et se distinguent par un suffixe (x3,
        // x3b, x3c) — la convention existe et le corpus l'emploie. Cinq
        // entrées l'ont manquée : elles ont été nommées « x1 » au sens de
        // « première entrée de cette année dans CETTE notion », ce qui n'est
        // pas ce que l'identifiant veut dire.
        //
        // Rien ne casse aujourd'hui — le tri et le compte d'exercices lisent
        // le LIBELLÉ, pas l'identifiant. Mais un identifiant qui ment sur la
        // position ruine la règle que BANK-SPEC §4 et known-issues K-7
        // viennent d'écrire, et il trompe le prochain lecteur.
        //
        // Les cinq sont nommées ci-dessous plutôt que renommées : renommer
        // un `entry_id` ORPHELINE les lignes de journal déjà écrites dessus
        // (`item_id = "<entry_id>:<question_id>"`). C'est un arbitrage owner,
        // pas une correction mécanique. La porte empêche la dette de croître.
        const POSITIONS_HERITEES = new Set([
          "pc/noyaux-masse-energie|bk-2020-n-x1",   // Exercice III  → bk-2020-n-x3
          "pc/noyaux-masse-energie|bk-2023-n-x1",   // Exercice 2 §2 → bk-2023-n-x2b
          "pc/rc-charge|bk-2022-n-x1",              // Exercice 3    → bk-2022-n-x3
          "pc/rc-charge|bk-2025-n-x1",              // Exercice 3    → bk-2025-n-x3
          "pc/rotation-axe-fixe|bk-2024-n-x1",      // Exercice 5 P2 → bk-2024-n-x5b
        ]);
        {
          const notionCle = dir.replace(/^.*content[/\\]/, "").replace(/[/\\]+$/, "").replace(/\\/g, "/");
          const mId = /^bk-\d{4}-[nr]-x(\d+)/.exec(eId);
          const lab = e?.source?.exercise_label;
          const mLab = typeof lab === "string" ? /Exercice\s+([IVX]+|\d+)/i.exec(lab) : null;
          if (mId && mLab && !POSITIONS_HERITEES.has(`${notionCle}|${eId}`)) {
            const ROM = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6 };
            const brut = mLab[1].toUpperCase();
            const posLab = ROM[brut] ?? (/^\d+$/.test(brut) ? parseInt(brut, 10) : null);
            if (posLab !== null && posLab !== parseInt(mId[1], 10)) {
              console.error(
                `  ✗ ${dir}/bank.yaml: ${eId} annonce la position x${mId[1]} mais son libellé imprime « Exercice ${brut} » — l'identifiant doit dire la position sur la copie (suffixe b/c pour les morceaux d'un même exercice)`
              );
              dirFail++;
            }
          }
        }

        // `duration_min` doit tenir la convention de la maison : ≈ 6 minutes
        // par point de barème (BANK-SPEC §2).
        //
        // Ce n'est PAS le rythme d'examen — le vrai papier tourne à 9 min/pt
        // (PC, 3 h pour /20) et 12 min/pt (SM, 4 h). C'est exactement là que
        // la dérive s'est produite une première fois : onze entrées avaient
        // été écrites au rythme d'examen et ont dû être renormalisées le
        // 2026-08-27, puis trois autres le même jour.
        //
        // Pourquoi une porte plutôt qu'une convention écrite : `duration_min`
        // s'affiche à un élève qui décide quoi attaquer ce soir. Deux cartes
        // équivalentes qui annoncent « 43 min » et « 29 min » n'apprennent
        // rien sur l'exercice et tout sur qui l'a écrit.
        //
        // La fourchette est large (4,5–7,5) à dessein : elle absorbe les
        // arrondis sur les petits barèmes tout en attrapant le seul vrai mode
        // d'échec, l'écriture au rythme d'examen. Le corpus mesuré tient
        // aujourd'hui dans 5,00–7,00, médiane exactement 6,00 sur 183 entrées.
        {
          const bareme = Number(e?.bareme_total);
          const duree = Number(e?.duration_min);
          if (Number.isFinite(bareme) && bareme > 0 && Number.isFinite(duree) && duree > 0) {
            const ratio = duree / bareme;
            if (ratio < 4.5 || ratio > 7.5) {
              console.error(
                `  ✗ ${dir}/bank.yaml: ${eId} duration_min=${duree} pour ${bareme} pts = ${ratio.toFixed(2)} min/pt — hors de la convention 6 min/pt (BANK-SPEC §2) ; attendu ~${Math.round(bareme * 6)} min`
              );
              dirFail++;
            }
          }
        }

        // bk- id convention + uniqueness.
        if (!/^bk-/.test(eId)) {
          console.error(`  ✗ ${dir}/bank.yaml: entry id "${eId}" must follow the bk-<year>-<n|r>-x<pos> convention (start with "bk-")`);
          dirFail++;
        }
        if (seenIds.has(eId)) {
          console.error(`  ✗ ${dir}/bank.yaml: duplicate entry id "${eId}"`);
          dirFail++;
        }
        seenIds.add(eId);

        // source.year + source.session present and well-formed.
        const src = e?.source ?? {};
        const yearOk = typeof src.year === "number" && SOURCE_YEAR_RE.test(String(src.year));
        const sessionOk = typeof src.session === "string" && SOURCE_SESSION_RE.test(src.session);
        if (!yearOk) {
          console.error(`  ✗ ${dir}/bank.yaml: ${eId} source.year missing or not a bac year (19|20)\\d{2}`);
          dirFail++;
        }
        if (!sessionOk) {
          console.error(`  ✗ ${dir}/bank.yaml: ${eId} source.session missing or not normale|rattrapage`);
          dirFail++;
        }

        katexField("bank.yaml", `${eId}.intro`, e?.intro);

        // Sourcing gate — SAME contract as exercises.yaml (authoring-side only,
        // never rendered). "sourced" needs year + session in the note; under
        // --strict, required_for_done while not-sourced is a hard fail.
        const sourcing = e?.sourcing;
        const validStatus = !!sourcing && typeof sourcing === "object" && SOURCING_STATUSES.has(sourcing.status);
        if (!validStatus) {
          console.error(`  ✗ ${dir}/bank.yaml: ${eId} has no valid sourcing.status (must be sourced|unsourced|not-applicable)`);
          dirFail++;
        } else {
          const note = typeof sourcing.note === "string" ? sourcing.note : "";
          if (sourcing.status === "sourced") {
            if (!SOURCE_YEAR_RE.test(note) || !SOURCE_SESSION_RE.test(note)) {
              console.error(`  ✗ ${dir}/bank.yaml: ${eId} sourcing.status=sourced but note lacks a bac year (19|20)\\d{2} and/or normale|rattrapage`);
              dirFail++;
            }
            // source.year/session CONSISTENT with the sourcing note (BANK-SPEC
            // §5) — the note must cite the SAME year and session the badge shows.
            if (yearOk && !note.includes(String(src.year))) {
              console.error(`  ✗ ${dir}/bank.yaml: ${eId} source.year=${src.year} not found in the sourcing note (year/note mismatch)`);
              dirFail++;
            }
            if (sessionOk && !new RegExp(src.session).test(note)) {
              console.error(`  ✗ ${dir}/bank.yaml: ${eId} source.session="${src.session}" not found in the sourcing note (session/note mismatch)`);
              dirFail++;
            }
          }
          if (sourcing.required_for_done === true && sourcing.status !== "sourced") {
            const msg = `${dir}/bank.yaml: ${eId} required_for_done=true but status="${sourcing.status}" (not sourced)`;
            if (strictMode) { console.error(`  ✗ ${msg}`); dirFail++; }
            else { console.error(`  ⚠ ${msg}`); }
          } else if (sourcing.status !== "sourced" && sourcing.status !== "not-applicable") {
            // §11.80, second exemplaire — le JUMEAU de la porte d'exercises.yaml.
            //   En armant le second sens côté exercices, j'avais réparé UNE des
            //   deux occurrences de la même condition. C'est exactement la leçon
            //   du §11.78 qui se répète : un correctif énuméré ne répare que ce
            //   qu'on a pensé à lister. Trouvée en relisant le fichier de portes
            //   lui-même, à la recherche de la MÊME FORME (un contrôle qu'un
            //   drapeau d'adhésion peut éteindre).
            //
            //   SÉVÉRITÉ MESURÉE : les 247 entrées de banque du corpus sont
            //   `sourced`. Cette porte-ci ne cache donc rien AUJOURD'HUI — elle
            //   est armée pour que la banque ne puisse pas devenir muette demain
            //   comme les exercices l'étaient hier. 0 signalement, 0 faux.
            console.error(
              `  ⚠ ${dir}/bank.yaml: ${eId} status="${sourcing.status}" (non sourcé) — ` +
                `non bloquant par choix (required_for_done=${sourcing.required_for_done}), mais non mesuré`
            );
          }
        }

        const questions = Array.isArray(e?.questions) ? e.questions : [];
        for (const q of questions) {
          const qid = typeof q?.id === "string" ? q.id : "?";
          katexField("bank.yaml", `${eId}.${qid}.stem`, q?.stem);
          katexField("bank.yaml", `${eId}.${qid}.reasoning`, q?.reasoning);
          if (typeof q?.reasoning !== "string" || !q.reasoning.trim().length) {
            missingReasoning.push(`${eId}.${qid}`);
          }
          // No MCQs in v1 (BANK-SPEC §5/§7): exactly-one-correct is n/a, and a
          // stray choices[] would mean a mis-typed schema.
          if (Array.isArray(q?.choices)) {
            console.error(`  ✗ ${dir}/bank.yaml: ${eId}.${qid} carries choices[] — the bank has no MCQs in v1`);
            dirFail++;
          }
          const steps = Array.isArray(q?.steps) ? q.steps : [];
          steps.forEach((s, i) => {
            katexField("bank.yaml", `${eId}.${qid}.steps[${i}].math`, s?.math, true);
            katexField("bank.yaml", `${eId}.${qid}.steps[${i}].note`, s?.note);
          });
        }
      }
      if (missingReasoning.length) {
        console.error(`  ✗ ${dir}/bank.yaml: question(s) missing non-empty "reasoning" → ${missingReasoning.join(", ")}`);
        dirFail += missingReasoning.length;
      }
    }
  }

  // derivations.yaml — KaTeX in steps[].math (raw) and steps[].note (delimited).
  {
    const doc = yamlDocs["derivations.yaml"];
    if (doc) {
      const arr = Array.isArray(doc.derivations) ? doc.derivations : [];
      for (const d of arr) {
        const did = typeof d?.id === "string" ? d.id : "?";
        const steps = Array.isArray(d?.steps) ? d.steps : [];
        steps.forEach((s, i) => {
          katexField("derivations.yaml", `${did}.steps[${i}].math`, s?.math, true);
          katexField("derivations.yaml", `${did}.steps[${i}].note`, s?.note);
        });
      }
    }
  }

  // ── Aucun niveau de titre sauté (WCAG 1.3.1) ─────────────────────────────
  //
  // Un lecteur d'écran navigue de titre en titre et annonce le NIVEAU : passer
  // de h2 à h4 lui fait entendre un niveau qui n'existe pas, et lui laisse
  // croire qu'il a manqué une section. Mesuré le 2026-09-04 sur les 68 pages
  // rendues : 79 sauts, tous des `## ` suivis directement d'un `#### `, tous
  // dans les douze leçons de philosophie — une convention d'autorat, pas un
  // accident isolé. 327 titres renivelés (la profondeur dans l'arbre devient
  // le niveau), zéro saut restant. Les ancres ne bougent pas : rehype-slug
  // calcule l'id à partir du TEXTE, pas du niveau.
  {
    let precedent = 0;
    let dansCode = false;
    for (const [i, raw] of md.split("\n").entries()) {
      if (raw.trim().startsWith("```")) { dansCode = !dansCode; continue; }
      if (dansCode) continue;
      const m = raw.match(/^(#{1,6})\s+(.+)$/);
      if (!m) continue;
      const n = m[1].length;
      if (precedent && n > precedent + 1) {
        console.error(
          `  ✗ ${dir}: lesson.md:${i + 1} saut de niveau de titre h${precedent} → h${n} — « ${m[2].slice(0, 46)} »\n` +
          `      un lecteur d'écran annonce le niveau ; sauter h${precedent + 1} lui fait croire qu'il a manqué une section`
        );
        dirFail++;
      }
      precedent = n;
    }
  }

  // Walk lines: resolve own-line markers, keep the rest as prose.
  const proseLines = [];
  let sawExerciseMarker = false;
  const checkpointMarkerCounts = new Map(); // slug → occurrence count
  for (const raw of md.split("\n")) {
    const m = raw.match(MARKER_LINE);
    if (!m) { proseLines.push(raw); continue; }
    const [, type, slug] = m;
    if (type === "figure") {
      figN++;
      if (!fs.existsSync(path.join(mediaDir, `${slug}.svg`))) {
        console.error(`  ✗ ${dir}: [[figure:${slug}]] → media/${slug}.svg MISSING (renders nothing)`); dirFail++;
      }
    } else if (type === "motion") {
      motN++;
      if (!fs.existsSync(path.join(mediaDir, `${slug}.motion.svg`))) {
        console.error(`  ✗ ${dir}: [[motion:${slug}]] → media/${slug}.motion.svg MISSING (renders nothing)`); dirFail++;
      } else if (!fs.existsSync(path.join(mediaDir, `${slug}.motion.json`))) {
        console.error(`  ⚠ ${dir}: [[motion:${slug}]] has no .motion.json — downgrades to the static legacy player`);
      }
    } else if (type === "embed") {
      embN++;
      const j = path.join(mediaDir, `${slug}.json`);
      if (fs.existsSync(j)) {
        try {
          const desc = JSON.parse(fs.readFileSync(j, "utf8"));
          if (!desc.url && !desc.url_base) console.error(`  ⚠ ${dir}: [[embed:${slug}]] has no url — shows the "à venir" placeholder`);
        } catch (err) { console.error(`  ✗ ${dir}: media/${slug}.json invalid JSON → ${err.message.split("\n")[0]}`); dirFail++; }
      } else {
        console.error(`  ⚠ ${dir}: [[embed:${slug}]] has no media/${slug}.json — shows the "à venir" placeholder`);
      }
    } else if (type === "video") {
      console.error(
        `  ⚠ ${dir}: [[video:${slug}]] ne rend RIEN (NotionBody rend null sur tout marqueur vidéo) — ` +
          `slot d'amélioration assumé, à retirer si l'asset ne viendra jamais`
      );
    } else {
      // checkpoint | exercise | derivation → id must exist in the matching YAML
      const file = { checkpoint: "checkpoints.yaml", exercise: "exercises.yaml", derivation: "derivations.yaml" }[type];
      const ids = yamlIds[file];
      if (!ids || !ids.has(slug)) {
        console.error(`  ✗ ${dir}: [[${type}:${slug}]] → id "${slug}" not found in ${file} (renders nothing)`); dirFail++;
      }
      if (type === "exercise") sawExerciseMarker = true;
      if (type === "checkpoint") checkpointMarkerCounts.set(slug, (checkpointMarkerCounts.get(slug) ?? 0) + 1);
    }
  }

  // ── Converted-lesson contract (summit-conversion campaign): a dir that
  // has exercises.yaml is a CONVERTED lesson and must use the new
  // [[exercise:…]] template, never the retired summit headings.
  if (fs.existsSync(path.join(abs, "exercises.yaml"))) {
    if (!sawExerciseMarker) {
      console.error(`  ✗ ${dir}: exercises.yaml exists but lesson.md has no [[exercise:…]] marker`);
      dirFail++;
    }
    const legacyHits = new Set();
    for (const needle of LEGACY_HEADING_SUBSTRINGS) {
      if (md.includes(needle)) legacyHits.add(needle);
    }
    // "### À toi" / "### À toi de jouer" — line-start only, so it also
    // catches "### À toi de jouer" (a substring check alone would double-
    // count the same heading against both patterns).
    //
    // CE QUE CETTE PORTE VEUT DIRE, précisé le 2026-09-04 : « cette leçon se
    // TERMINE encore par la section-sommet de l'ancien gabarit au lieu de
    // servir des exercices ». Le motif seul ne dit pas ça — il attrape aussi
    // une consigne de rédaction légitime placée AU MILIEU d'un chapitre de
    // méthode, ce qui est le cas de quatre leçons de philosophie (elles
    // portent bien leurs `[[exercise:…]]`, 20 à 30 lignes PLUS BAS).
    //
    // Ces quatre-là passaient jusqu'ici par accident : leur titre était en
    // `####`, et le motif exige `### `. Le renivelage des titres (WCAG 1.3.1,
    // même jour) les a promus en `###` et la porte s'est réveillée — sur des
    // faux positifs. On ne l'a pas desserrée, et on n'a pas renommé le
    // contenu pour lui plaire : on lui a donné le critère qu'elle voulait
    // dire. Un sommet légataire n'a AUCUN marqueur d'exercice après lui.
    const lignes = md.split("\n");
    for (const [i, line] of lignes.entries()) {
      if (line !== "### À toi" && !line.startsWith("### À toi ")) continue;
      const suit = lignes.slice(i + 1).some((l) => l.includes("[[exercise:"));
      if (!suit) legacyHits.add(line.trim());
    }
    for (const hit of legacyHits) {
      console.error(`  ✗ ${dir}: lesson.md still carries the legacy summit heading "${hit}" — converted lessons use [[exercise:…]], not the old template`);
      dirFail++;
    }
  }

  // ── Orphan checkpoints (warning only): every checkpoints.yaml id should
  // be placed by exactly one [[checkpoint:id]] marker in lesson.md.
  if (fs.existsSync(path.join(abs, "checkpoints.yaml"))) {
    const cpDoc = yamlDocs["checkpoints.yaml"];
    const cpArr = Array.isArray(cpDoc?.checkpoints) ? cpDoc.checkpoints : [];
    for (const cp of cpArr) {
      const id = typeof cp?.id === "string" ? cp.id : null;
      if (!id) continue;
      const count = checkpointMarkerCounts.get(id) ?? 0;
      if (count === 0) {
        console.error(`  ⚠ ${dir}: checkpoint "${id}" is never referenced by a [[checkpoint:${id}]] marker in lesson.md`);
      } else if (count > 1) {
        console.error(`  ⚠ ${dir}: checkpoint "${id}" is referenced ${count} times in lesson.md (expected exactly 1)`);
      }
    }
  }

  // ── Rung integrity (warning only) — un item/checkpoint `rung: R<n>` doit
  //    nommer un titre de rung qui EXISTE dans lesson.md (« ## R<n> … »). Un
  //    item accroché à un rung absent tombe de tout affichage ordonné par rung
  //    (constat des critiques vague 1, 2026-09-11 : limites-continuite R7,
  //    derivabilite-etude-fonctions R6, probabilites-conditionnelles R6/R7 —
  //    souvent le résidu d'une renumérotation de marche). Avertissement et non
  //    échec parce que le BON rung de rattachement est un choix pédagogique
  //    (re-tag) que la porte ne peut pas faire ; à passer en échec dur une fois
  //    le corpus propre.
  {
    // Les titres reconnus, étiquette COMPLÈTE (« R6 », mais aussi « R-bac ») :
    //    la version antérieure ne capturait que `R(\d+)` des deux côtés, si bien
    //    qu'une étiquette non numérique — il en existe UNE dans tout le corpus,
    //    `rung: "R-bac"` sur `limites-continuite/checkpoints.yaml:378` — passait
    //    sans un mot : pas de titre correspondant, et pas d'avertissement non
    //    plus, puisque le motif ne savait pas la lire. Une porte qui ne sait pas
    //    lire une valeur ne dit pas « conforme », elle ne dit RIEN (§11.69).
    const headingRungs = new Set(
      (md.match(/^#{1,6}[ \t]*(R(?:\d+|-[a-z]+))\b/gm) || []).map((h) => h.match(/(R(?:\d+|-[a-z]+))/)[1]),
    );
    for (const [fname, key] of [["items.yaml", "items"], ["checkpoints.yaml", "checkpoints"]]) {
      const arr = Array.isArray(yamlDocs[fname]?.[key]) ? yamlDocs[fname][key] : [];
      const warned = new Set();
      for (const it of arr) {
        const mr = typeof it?.rung === "string" ? it.rung.match(/^(R(?:\d+|-[a-z]+))$/) : null;
        if (mr && !headingRungs.has(mr[1]) && !warned.has(mr[1])) {
          warned.add(mr[1]);
          console.error(
            `  ⚠ ${dir}: ${fname} accroche des items au rung ${it.rung} mais lesson.md n'a pas de titre « ## ${it.rung} » — re-taguer ou ajouter le rung`,
          );
        }
      }
    }
    // Le résumé de couverture qui compte un barreau SANS titre. Plus grave que
    // l'avertissement ci-dessus : celui-là dit « des items visent un chapitre
    // absent » ; celui-ci dit que le document de couverture AFFIRME couvrir ce
    // chapitre. `maths/probabilites-conditionnelles` compte ainsi R6 (3 items)
    // et R7 (2) alors qu'aucun titre ne porte ces codes — le dénominateur de la
    // couverture inclut deux chapitres qui n'existent pas. La porte
    // `resume-couverture` ne le voit pas : elle vérifie que les compteurs se
    // recomptent depuis les tags, pas que les barreaux comptés EXISTENT.
    // Avertissement et non échec : le remède est éditorial (à quel chapitre ces
    // items appartiennent-ils ?), pas mécanique — voir §11.69.
    //
    //  ── §11.97 — LA TABLE DE BARREAUX DOIT DÉCRIRE LA LEÇON (ÉCHEC) ────────
    //
    //  PORTÉE d'abord, parce que c'est là qu'était le vrai défaut. La version
    //  précédente de ce bloc ne lisait que `coverage_summary.per_rung`. Mesuré
    //  le 2026-09-19 : 57 notions sur 62 écrivent cette table sous le nom
    //  `ramp_coverage`, 4 sous le nom `per_rung`, 1 n'en avait aucune. La porte
    //  ne regardait donc que 4 notions sur 62 et se taisait sur les 57 autres —
    //  un vert qui ne disait pas « conforme » mais « pas regardé » (ADR 0031 :
    //  la PORTÉE d'un mécanisme se mesure séparément de son fonctionnement).
    //  Les deux noms sont désormais lus.
    //
    //  ET ELLE PEUT DEVENIR ROUGE. L'ancienne version n'émettait qu'un ⚠ : elle
    //  ne pouvait, par construction, rien faire échouer. Trois contrôles
    //  échouent maintenant pour de bon :
    //    (a) aucune table, alors que la notion a des items ;
    //    (b) un chapitre `## R<n>` de la leçon ABSENT de la table — un compte
    //        absent n'est pas un compte neutre, il rend le trou invisible ;
    //    (c) un compte déclaré qui ne vaut pas le nombre d'items réellement
    //        tagués à ce barreau.
    //
    //  LE BARREAU FANTÔME (la table compte un barreau sans titre) reste une
    //  DETTE DÉCLARÉE et non un échec : son remède est éditorial, pas mécanique.
    //  La dette est nominative, et le ratchet joue DANS LES DEUX SENS — une
    //  notion hors liste qui se met à déclarer un barreau fantôme échoue, et une
    //  entrée de la liste qui ne correspond plus à rien échoue aussi, pour qu'on
    //  vienne la retirer. Sans ce second sens, la liste deviendrait le tapis
    //  sous lequel glisser les cas neufs.
    {
      const cs = yamlDocs["items.yaml"]?.coverage_summary;
      const tbl = cs?.ramp_coverage ?? cs?.per_rung;
      const items = Array.isArray(yamlDocs["items.yaml"]?.items) ? yamlDocs["items.yaml"].items : [];
      const reel = new Map();
      for (const it of items) {
        const r = typeof it?.rung === "string" ? it.rung.trim() : null;
        if (r) reel.set(r, (reel.get(r) ?? 0) + 1);
      }
      if (items.length && (!tbl || typeof tbl !== "object")) {
        console.error(
          `  ✗ ${dir}: coverage_summary n'a ni ramp_coverage ni per_rung — ${items.length} items, aucune table de barreaux`,
        );
        dirFail++;
      } else if (tbl && typeof tbl === "object") {
        // Cinq notions PC logent une `note:` en prose DANS la table ; ce n'est
        // pas un barreau. Seules les clés en forme de code de barreau sont lues.
        const EST_BARREAU = /^R(?:\d+|-[a-z]+)$/;
        const cles = new Set(Object.keys(tbl).map(String).filter((k) => EST_BARREAU.test(k)));
        for (const r of headingRungs) {
          if (!cles.has(r)) {
            console.error(
              `  ✗ ${dir}: lesson.md a un chapitre « ${r} » que la table de barreaux n'énumère pas ` +
                `(${reel.get(r) ?? 0} item(s) y sont tagués) — un compte absent n'est pas un compte neutre`,
            );
            dirFail++;
          }
        }
        for (const [r, n] of Object.entries(tbl)) {
          if (!EST_BARREAU.test(String(r))) continue;
          if (!headingRungs.has(String(r))) {
            if ((DETTE_BARREAU_FANTOME.get(dir) ?? []).includes(String(r))) {
              fantomesVus.add(`${dir}|${r}`);
            } else {
              console.error(
                `  ✗ ${dir}: la table compte ${n} item(s) au barreau ${r}, mais lesson.md n'a aucun titre « ${r} » — ` +
                  `le résumé annonce la couverture d'un chapitre qui n'existe pas`,
              );
              dirFail++;
            }
            continue;
          }
          const vrai = reel.get(String(r)) ?? 0;
          if (Number(n) !== vrai) {
            console.error(
              `  ✗ ${dir}: la table dit ${n} item(s) au barreau ${r}, les tags rung: en comptent ${vrai}`,
            );
            dirFail++;
          }
        }
      }
    }
  }

  // ── RÉPONSE AU-DESSUS DE LA PORTE D'ESSAI, troisième forme (ÉCHEC) —
  //    l'`intro` d'un exercice se rend HORS du gate (AttemptFirstExercise :
  //    seuls `reasoning` et `steps` sont gardés). Quand elle AFFIRME la valeur
  //    que le premier pas gardé calcule, l'élève a la réponse avant d'essayer.
  //
  //    LA RÈGLE, ET POURQUOI ELLE EST SI ÉTROITE. Une première version ne
  //    comparait que le RÉSULTAT du pas au texte de l'intro : 10 signalements,
  //    dont SIX FAUX — « 1 » était le second membre d'une équation donnée,
  //    « 4 » un numéro de question, « 10 » un exposant de notation
  //    scientifique, « 0 » l'instant initial. Un taux pareil rend une porte
  //    inutilisable : on finit par l'ignorer. La règle retenue exige que
  //    l'intro affirme L'ÉGALITÉ elle-même —
  //      (a) le pas porte au moins deux « = » (c'est un calcul, pas une donnée) ;
  //      (b) son membre gauche fait au moins 3 caractères (« A », « x » ne
  //          discriminent rien) et se retrouve dans l'intro ;
  //      (c) le résultat suit ce membre gauche de moins de 50 caractères,
  //          À N'IMPORTE LAQUELLE de ses occurrences (les intros nomment
  //          souvent la quantité une première fois sans la calculer).
  //
  //    Mesuré le 2026-09-12 : 4 fuites, toutes dans `denombrement/bank.yaml`
  //    (card(Ω) = 120, 120, 21, 84) — exactement les quatre que la critique
  //    pédagogie avait trouvées à la lecture, aucune autre, aucun faux positif.
  //    Corrigées. Vérifié que la porte MORD : rejouée sur la version de
  //    `denombrement/exercises.yaml` antérieure au correctif du jour, elle
  //    nomme r-bac (120) et r-variation (56).
  {
    for (const fname of ["exercises.yaml", "bank.yaml"]) {
      const doc = yamlDocs[fname];
      if (!doc) continue;
      const norm = (s) => s.replace(/\\dfrac/g, "\\frac").replace(/\\left|\\right/g, "").replace(/\s+/g, "");
      for (const cle of ["exercises", "entries"]) {
        for (const e of (Array.isArray(doc?.[cle]) ? doc[cle] : [])) {
          const intro = typeof e?.intro === "string" ? e.intro : "";
          const q0 = Array.isArray(e?.questions) ? e.questions[0] : null;
          const m0 = typeof q0?.steps?.[0]?.math === "string" ? q0.steps[0].math : "";
          if (!intro || !m0 || (m0.match(/=/g) || []).length < 2) continue;
          const bouts = m0.split("=");
          const lhs = norm(bouts[0]);
          const res = bouts[bouts.length - 1].trim();
          if (lhs.length < 3) continue;
          if (!/^[\d\s,.]+$/.test(res.replace(/\\,/g, ""))) continue;
          const ni = norm(intro);
          const rx = new RegExp(`(?<![\\d])${res.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\d])`);
          let i = ni.indexOf(lhs), trouve = false;
          while (i >= 0 && !trouve) {
            if (rx.test(ni.slice(i + lhs.length, i + lhs.length + 50))) trouve = true;
            i = ni.indexOf(lhs, i + 1);
          }
          if (trouve) {
            console.error(
              `  ✗ ${dir}: ${fname} → « ${e.id} » : l'intro, rendue HORS de la porte d'essai, affirme que ` +
                `${bouts[0].trim()} vaut ${res} — c'est le résultat du premier pas GARDÉ. Nomme la quantité sans la calculer.`
            );
            dirFail++;
          }
        }
      }
    }
  }

  // ── Renvoi d'AUTEUR dans un champ RENDU (ÉCHEC) — « voir la SCOPE NOTE en
  //    tête de fichier », servi à l'élève. Les champs listés dans RENDU_TXT
  //    ci-dessous se rendent tous : `reasoning` et `intro` par
  //    AttemptFirstExercise.tsx et EpreuveShell.tsx, `part` comme libellé de
  //    question, `note` sous chaque étape de calcul. Une SCOPE NOTE, elle, est
  //    un commentaire YAML : l'élève ne peut PAS la lire. Le renvoi est donc
  //    mort pour son seul destinataire — ADR 0031, « un renvoi est une
  //    instruction ».
  //
  //    Trouvé le 2026-09-12 en triant `equations-differentielles`, dont un
  //    `reasoning` disait à l'élève que le chapitre 5 n'enseigne pas ce qu'il
  //    venait d'y lire PUIS l'envoyait vers la note invisible. Balayage du
  //    corpus : **25 renvois dans 13 notions** (18 `reasoning`, 3 `intro`,
  //    2 `note`, 1 `stem`, 1 `part`), tous retirés — la phrase porteuse est
  //    conservée, seul le pointeur mort tombe.
  //
  //    HORS CHAMP, et c'est le cœur de la porte : le sous-arbre `sourcing:`.
  //    C'est LÀ que ces notes doivent vivre, et elles y sont légitimes — une
  //    première version de la sonde les comptait avec le reste et annonçait
  //    92 fuites au lieu de 25.
  //
  //    ÉCHEC et non avertissement : contrairement au choix d'un barreau, il
  //    n'y a rien à arbitrer. Un pointeur que le lecteur ne peut pas suivre
  //    n'a aucune lecture correcte.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    // Trois motifs, chacun sans lecture correcte pour un élève :
    //   (a) le renvoi vers une note d'auteur (commentaire YAML, invisible) ;
    //   (b) un CHEMIN DE DÉPÔT — il ne peut ni l'ouvrir ni le chercher ;
    //   (c) le mot « owner » — un rôle de fabrication, pas de son vocabulaire.
    // Mesuré le 2026-09-12 : 25 + 6 + 4 = 35 occurrences, toutes retirées.
    // NON gardé, faute de pouvoir l'être sans faux positif : « drapeau » (3
    // notes d'étape de pc/ondes-em-modulation disaient « drapeau maintenu dans
    // la source »). Le mot a des emplois légitimes ; la porte ne peut pas
    // distinguer, alors elle se tait plutôt que de crier au loup. Les trois
    // occurrences sont corrigées, la classe reste non gardée — et c'est dit.
    // Le renvoi est reconnu par le LABEL de la note d'auteur (SCOPE NOTE,
    // NOTE ÉDITORIALE, NOTE DE PORTÉE, SOURCING GAP) suivi d'un « en tête
    // de … », et NON par « en-tête » seul : « l'en-tête imprimé sur la
    // copie » (maths/arithmetique) parle de la feuille d'examen que l'élève
    // a sous les yeux — c'est de la prose légitime, pas une fuite. La cible
    // du renvoi est indifférente (fichier, bloc, entrée, carte…) : dans tous
    // les cas c'est un commentaire YAML, que le rendu ne charge jamais.
    const RENVOI = new RegExp(
      "(?:SCOPE\\s+NOTE|NOTE\\s+ÉDITORIALE|NOTE\\s+DE\\s+PORTÉE)\\s*\\d?\\s*(?:,\\s*)?(?:voir\\s+)?" +
        "en[\\s-]t[êe]te\\s+d[eu]\\s+(?:ce\\s+|cette\\s+|cet\\s+|l['’])?" +
        "(?:fichier|bloc|entr[ée]e|carte|exercice|section)" +
        "|\\bSOURCING\\s+GAP\\b" +
        "|content\\/(?:maths|pc|svt|philo)\\/[a-z0-9-]+\\/[a-z-]+\\.(?:yaml|md)" +
        "|\\bowner\\b",
      "i"
    );
    const fuites = [];
    const parcours = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) parcours(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        // Auteur par contrat — le rendu ne charge aucun de ces sous-arbres.
        if (k === "sourcing" || k === "coverage_summary" ||
            k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) {
          if (RENVOI.test(v)) fuites.push(`${fichier} → champ « ${k} »`);
        } else parcours(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) parcours(yamlDocs[fname], fname);
    for (const f of [...new Set(fuites)]) {
      console.error(
        `  ✗ ${dir}: ${f} renvoie l'élève à une note d'auteur (« en tête de fichier ») — ` +
          `c'est un commentaire YAML, il ne peut pas la lire. Dis le fait sur place, ou déplace le renvoi dans \`sourcing\`.`
      );
      dirFail++;
    }
  }

  // ── §11.73 un code de barreau R<n> NU dans du texte rendu de YAML ───────
  //    Les campagnes #18 et #24 ont réécrit 1 086 puis 529 renvois « R<n> »
  //    vers le numéro de chapitre, dans la prose de lesson.md et dans les
  //    sidecars de figures. Elles n'ont jamais balayé la prose RENDUE des
  //    YAML. Mesuré le 2026-09-12 : **25 codes y survivaient**, dont 11 en
  //    philo et 6 en maths — où « R3 » ne peut rien vouloir dire d'autre
  //    qu'un barreau. 22 réécrits vers le chapitre, carte position→barreau
  //    recalculée POUR CHAQUE notion (4 leçons de maths ne sont pas à
  //    barreaux purs : le chapitre n'y vaut pas n+1).
  //
  //    L'EXEMPTION, et c'est tout l'intérêt : en PC, `R1`, `R2`, `R0` sont
  //    des ÉTIQUETTES DE COMPOSANT — une résistance, pas un barreau. Les 5
  //    occurrences restantes du corpus sont toutes de ce type et doivent
  //    rester. La porte les reconnaît au vocabulaire de circuit voisin
  //    (résistance, bobine, condensateur, maille, nœud, diode, filtre,
  //    borne, Ohm, C1/L2…, dipôle) dans une fenêtre de 45 caractères.
  //
  //    Ce n'est pas une précaution théorique : la substitution globale de la
  //    campagne #18 a précisément pris le résistor R3 d'un filtre pour le
  //    barreau R3 et écrit « après C3 et le chapitre 4 » dans une note rendue
  //    (pc/ondes-em-modulation) — une phrase que l'élève ne peut pas
  //    comprendre. Restaurée. Une porte sans cette exemption REFERAIT ce
  //    dégât en le déclarant conforme.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    // Pas de sentinelle arrière : une première version excluait « R4 » suivi
    // d'une virgule et masquait ainsi une vraie fuite (« dit R1, est qu'il
    // change », philo/l-etat). L'exemption de circuit suffit à la précision.
    const TOK = /(?<![A-Za-z_\\$])R(\d+)\b/g;
    const CIRC = /r[ée]sist|bobine|condensateur|maille|n[oœ]ud|noeud|diode|filtre|borne|Ohm|\b[CL]_?\d\b|dip[oô]le/i;
    const codes = [];
    const balaye = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) balaye(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (k === "sourcing" || k === "item_source" ||
            k === "coverage_summary" || k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) {
          TOK.lastIndex = 0;
          let m;
          while ((m = TOK.exec(v))) {
            const ctx = v.slice(Math.max(0, m.index - 45), m.index + m[0].length + 45);
            if (!CIRC.test(ctx)) codes.push(`${fichier} → champ « ${k} » : ${m[0]}`);
          }
        } else balaye(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) balaye(yamlDocs[fname], fname);
    for (const f of [...new Set(codes)]) {
      console.error(
        `  ✗ ${dir}: ${f} — un code de barreau, que le rendu n'imprime nulle part. ` +
          `L'élève ne voit que des numéros de CHAPITRE (et en PC, vérifie d'abord que ce n'est pas une étiquette de composant).`
      );
      dirFail++;
    }
  }

  // ── §11.72 le barème qui ne tombe pas sur son propre total ──────────────
  //    `bareme_total` d'une entrée contre la somme des points imprimés dans
  //    les `stem` de ses questions. Mesuré le 2026-09-12 : **247 entrées
  //    vérifiables, 0 écart** — la convention « la somme des questions FAIT le
  //    total » est tenue partout, donc un écart est un défaut, pas un usage.
  //
  //    Le motif tolère « (0 ,5 pt) », avec l'espace avant la virgule : c'est
  //    une coquille du sujet imprimé que `pc/suivi-temporel-vitesse` conserve
  //    DÉLIBÉRÉMENT (son `stem` le dit : « barème tel qu'imprimé »). Un premier
  //    motif strict ne savait pas la lire et annonçait un faux écart de 0,5 —
  //    la seule « anomalie » de tout le corpus était un défaut de ma sonde.
  //
  //    ÉCHEC : le remède est arithmétique, l'un des deux nombres est faux. La
  //    classe est utile parce qu'elle attrape le geste qui l'introduit —
  //    ajouter une question maison en lui collant une étiquette de points
  //    (c'est exactement ce qu'avait fait `systemes-oscillants` q4).
  {
    const PTS = /\((\d+(?:\s*[.,]\s*\d+)?)\s*(?:pt|point)s?\b/g;
    const num = (s) => parseFloat(s.replace(/\s+/g, "").replace(",", "."));
    for (const [fname, cle] of [["bank.yaml", "entries"], ["exercises.yaml", "exercises"]]) {
      for (const e of (Array.isArray(yamlDocs[fname]?.[cle]) ? yamlDocs[fname][cle] : [])) {
        if (e?.bareme_total === undefined || e?.bareme_total === null) continue;
        const total = num(String(e.bareme_total));
        if (!isFinite(total)) continue;
        let somme = 0, n = 0;
        for (const q of (Array.isArray(e?.questions) ? e.questions : [])) {
          PTS.lastIndex = 0;
          let m;
          while ((m = PTS.exec(String(q?.stem ?? "")))) { somme += num(m[1]); n++; }
        }
        if (n === 0) continue;
        if (Math.abs(somme - total) > 0.001) {
          console.error(
            `  ✗ ${dir}: ${fname} → « ${e.id} » déclare bareme_total ${e.bareme_total} mais la somme des ` +
              `points imprimés dans ses ${n} question(s) fait ${Math.round(somme * 100) / 100} — l'un des deux est faux.`
          );
          dirFail++;
        }
      }
    }
  }

  // ── §11.71 `lesson_placement` qui ment sur la position du marqueur ──────
  //    Métadonnée d'AUTEUR (aucun code ne la lit — vérifié par grep sur
  //    web/src et web/scripts), mais c'est un document qui décrit un état qui
  //    n'est pas : exactement la classe que toute cette campagne corrige.
  //
  //    La convention n'est pas décrétée ici, elle est MESURÉE sur le corpus
  //    (2026-09-12, 322 checkpoints placés) : `after_RN` a une médiane de
  //    99 % de la hauteur du chapitre et 226 de ses 255 cas sont à ≥ 90 % ;
  //    `in_RN` a une médiane de 48 % et un seul cas à ≥ 90 %. Le seuil de
  //    90 % sépare donc les deux usages tels qu'ils sont réellement écrits.
  //    30 étiquettes le violaient dans 16 notions ; toutes corrigées.
  //
  //    AVERTISSEMENT et non échec : rien ne casse pour l'élève, et un auteur
  //    peut légitimement vouloir poser un marqueur ailleurs — la porte lui dit
  //    alors de mettre l'étiquette d'accord avec le fichier, pas l'inverse.
  {
    const cps = Array.isArray(yamlDocs["checkpoints.yaml"]?.checkpoints)
      ? yamlDocs["checkpoints.yaml"].checkpoints : [];
    if (cps.length) {
      const hs = [...md.matchAll(/^## (R\d+|R-[a-z]+)\b/gm)].map((m) => [m.index, m[1]]);
      const bornes = {};
      hs.forEach(([pos, code], i) => { bornes[code] = [pos, i + 1 < hs.length ? hs[i + 1][0] : md.length]; });
      for (const cp of cps) {
        const lp = cp?.lesson_placement, cid = cp?.id;
        if (typeof lp !== "string" || typeof cid !== "string") continue;
        const m = lp.match(/^(after|in)_(R\d+|R-[a-z]+)$/);
        if (!m || !bornes[m[2]]) continue;
        const mk = md.indexOf(`[[checkpoint:${cid}]]`);
        if (mk < 0) continue;
        const [deb, fin] = bornes[m[2]];
        if (!(deb < mk && mk < fin)) continue;
        const part = (mk - deb) / (fin - deb);
        const attendu = part >= 0.90 ? "after" : "in";
        if (attendu !== m[1]) {
          console.error(
            `  ⚠ ${dir}: checkpoints.yaml → « ${cid} » déclare « ${lp} » mais son marqueur est à ` +
              `${Math.round(part * 100)} % du chapitre ${m[2]} — l'étiquette attendue est « ${attendu}_${m[2]} »`
          );
        }
      }
    }
  }

  // ── §11.70 « chapitre N et N » — le renvoi qui cite deux fois le même ───
  //    Cinq occurrences trouvées à la main au fil de la campagne :
  //    `chute-mouvements-plans` (« chapitre 2 et 2 », « chapitres 3 et 3 »),
  //    `reactions-acido-basiques` (« chapitre 7 et 7 », « chapitre 3 et 3 »),
  //    `transformations-deux-sens` (« chapitre 1 et 1 »). Toutes nées de la
  //    renumérotation barreau→chapitre : deux barreaux distincts mappés sur le
  //    même numéro, ou un numéro recopié. Le lecteur reçoit un renvoi double
  //    vers un seul endroit, et perd le second — qui était l'information utile.
  //
  //    ÉCHEC, et sans risque de faux positif : citer deux fois le même chapitre
  //    dans « chapitre A et B » n'a aucune lecture correcte. Le correctif, lui,
  //    demande de LIRE (quel est le second chapitre ?) — la porte dit qu'il y a
  //    un défaut, elle ne devine pas le numéro.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    const REPET = /chapitres?\s+(\d+)\s+et\s+(\d+)/gi;
    const doubles = [];
    const scan = (s, fichier) => {
      REPET.lastIndex = 0;
      let m;
      while ((m = REPET.exec(s))) if (m[1] === m[2]) doubles.push(`${fichier} : « ${m[0]} »`);
    };
    const marche = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) marche(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (k === "sourcing" || k === "item_source" ||
            k === "coverage_summary" || k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) scan(v, fichier);
        else marche(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) marche(yamlDocs[fname], fname);
    scan(md, "lesson.md");
    for (const f of [...new Set(doubles)]) {
      console.error(
        `  ✗ ${dir}: ${f} cite deux fois le MÊME chapitre — le second renvoi est perdu. ` +
          `Nomme le chapitre réellement visé (séquelle de la renumérotation barreau→chapitre).`
      );
      dirFail++;
    }
  }

  // ── §11.89 Le renvoi RELATIF qui sort de la leçon ───────────────────────
  //    « chapitre précédent » écrit DANS le premier chapitre, ou « chapitre
  //    suivant » écrit DANS le dernier : le référent n'existe pas. Dans les
  //    douze cas trouvés au balayage du 2026-09-19, l'auteur voulait toujours
  //    dire la LEÇON voisine — mais l'élève lit « chapitre » contre le rail de
  //    la leçon courante, qui affiche « Chapitre n / N ». Deux d'entre eux
  //    étaient la PREMIÈRE phrase que l'élève lit (`fonction-exponentielle`,
  //    `suivi-temporel-vitesse`), un autre un TITRE de section
  //    (`nombres-complexes-1`). Le corpus a déjà la formule juste et l'emploie
  //    ailleurs : « la leçon précédente / suivante ».
  //
  //    ÉCHEC, et sans risque de faux positif possible : la porte ne juge pas le
  //    SENS du renvoi, seulement l'existence de sa cible. Un chapitre 0, ou un
  //    chapitre N+1, n'a aucune lecture correcte.
  //
  //    PORTÉE : `lesson.md` seul. Les sidecars n'ont pas de position dans la
  //    leçon, donc « chapitre suivant » y est déjà ambigu pour une autre
  //    raison — c'est une autre porte, non armée.
  {
    const lignes = md.split("\n");
    let dansComm = false, chap = 0;
    const titres = lignes.filter((l) => l.startsWith("## ")).length;
    const REL = /chapitres?\s+(suivant|pr[ée]c[ée]dent)/gi;
    lignes.forEach((l, i) => {
      // les blocs <!-- … --> de lesson.md sont des notes d'auteur : hors portée
      if (l.includes("<!--")) dansComm = true;
      const finComm = l.includes("-->");
      if (l.startsWith("## ")) chap++;
      if (!dansComm) {
        REL.lastIndex = 0;
        let m;
        while ((m = REL.exec(l))) {
          const vers = m[1].toLowerCase().startsWith("suiv") ? chap + 1 : chap - 1;
          if (vers < 1 || vers > titres) {
            console.error(
              `  ✗ ${dir}: lesson.md:${i + 1} « ${m[0]} » est écrit dans le chapitre ` +
                `${chap}/${titres} — il vise le chapitre ${vers}, qui n'existe pas. ` +
                `Si c'est la LEÇON voisine qui est visée, écris-le : « la leçon ` +
                `précédente » / « la leçon suivante » (l'élève lit « chapitre » ` +
                `contre le rail « Chapitre n / N » de la leçon courante).`
            );
            dirFail++;
          }
        }
      }
      if (finComm) dansComm = false;
    });
  }

  // ── §11.67 L'IDENTIFIANT INTERNE dans un champ rendu ────────────────────
  //    Même famille que la porte ci-dessus, autre objet : au lieu de pointer
  //    une note invisible, le texte pointe une ENTRÉE ou un ITEM par sa clé
  //    de fichier — « contrairement aux autres sujets de cette banque
  //    (bk-2018-n-x1, bk-2019-n-x1, …) », « voir RC-20 ». Ces clés ne sont
  //    imprimées NULLE PART dans le rendu : l'élève lit une référence qu'il
  //    ne peut pas résoudre. Le référent visible existe et il est court —
  //    la session pour une entrée de banque (« le sujet 2019 »), le numéro
  //    de chapitre pour un barreau.
  //
  //    Mesuré le 2026-09-12 : **87 identifiants d'entrée dans 18 notions**
  //    + 3 identifiants d'item dans 2 notions. Tous réécrits. C'est la même
  //    leçon qu'en §11.46 et §11.66 : une campagne de nettoyage du texte
  //    rendu doit énumérer les FAMILLES rendues, pas les fichiers qu'on a en
  //    tête — celle-ci avait balayé la prose, les sidecars et les légendes,
  //    jamais les renvois d'une carte de banque vers une autre.
  //
  //    Les préfixes d'items sont LUS DANS LA NOTION (les `id:` de la forme
  //    ABC-12), jamais devinés : une notion ne peut citer que ses propres
  //    items, et un préfixe inventé ferait crier la porte sur du texte sain.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    const prefixes = new Set();
    const recolte = (n) => {
      if (Array.isArray(n)) { for (const x of n) recolte(x); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (k === "id" && typeof v === "string" && /^[A-Z]{2,5}-\d+$/.test(v)) prefixes.add(v.split("-")[0]);
        else recolte(v);
      }
    };
    for (const fname of Object.keys(yamlDocs)) recolte(yamlDocs[fname]);
    // Un NOM DE FICHIER NU compte aussi : §11.61 n'attrape que le chemin
    // complet — dossier, sous-dossier, puis nom — et laissait donc passer
    // « transcrit sous `etat-equilibre.md` » ou « la leçon (…, lesson.md) ».
    // Mesuré le 2026-09-12 : 2 occurrences dans 2 notions, les deux réécrites.
    const motifs = [/\bbk-\d{4}-[nr]-[a-z0-9]+\b/,
      /(?<![/\w.])[a-z0-9]+(?:-[a-z0-9]+)*\.(?:md|ya?ml|json|svg|mjs|tsx?)\b/];
    if (prefixes.size) motifs.push(new RegExp(`\\b(?:${[...prefixes].join("|")})-\\d+\\b`));
    const ids = [];
    const chasse = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) chasse(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        // Sous-arbres AUTEUR par contrat, que le rendu ne charge jamais :
        // `sourcing` (§11.61), `item_source` (étiquette de fabrication, §11.64),
        // `coverage_summary` et `contradicts_principle`. Sans cette liste la
        // porte criait sur 10 `coverage_summary > note` parfaitement légitimes
        // — un `note` imbriqué dans un sous-arbre auteur reste auteur.
        if (k === "sourcing" || k === "item_source" ||
            k === "coverage_summary" || k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) {
          for (const m of motifs) {
            const h = v.match(m);
            if (h) { ids.push(`${fichier} → champ « ${k} » : ${h[0]}`); break; }
          }
        } else chasse(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) chasse(yamlDocs[fname], fname);
    for (const f of [...new Set(ids)]) {
      console.error(
        `  ✗ ${dir}: ${f} — un identifiant de fichier, que le rendu n'imprime nulle part. ` +
          `Nomme le référent visible : « le sujet 2019 » pour une entrée de banque, le numéro de chapitre pour un barreau.`
      );
      dirFail++;
    }
  }

  // ── §11.75 La PROVENANCE DE TRANSCRIPTION dans un champ rendu ──────────
  //    Troisième membre de la famille §11.61 / §11.67, et le plus large. Les
  //    deux premières portes attrapent un renvoi vers une note invisible et
  //    une clé de fichier ; celle-ci attrape la CHAÎNE D'OUTILLAGE qui a
  //    produit le texte — « mesurée au pixel », « bitmap natif », « re-décrite
  //    depuis l'image », « par la vérification », « Lecture ferme » — et le
  //    vocabulaire de filière qui arbitre entre notions : « CROSS-LIST honoré
  //    ici », « la règle de la maison », « le routage retenu ».
  //
  //    Un élève de 2e bac n'a que faire de savoir qu'il existe un scan, une
  //    résolution native, une chaîne vectorielle et une seconde chaîne au
  //    pixel qui s'accordent à 0,3 % près. Ce qui l'aide, c'est la LECTURE :
  //    « la tangente coupe le palier au droit du premier trait vertical ».
  //    La provenance, elle, a déjà un domicile — le champ `sourcing`, que le
  //    rendu ne charge jamais — et elle y figure mot pour mot.
  //
  //    Mesuré le 2026-09-12 : **125 occurrences dans 18 notions, toutes en
  //    PC** — l'empreinte exacte de la campagne de transcription des sujets.
  //    Le cas qui a décidé de la sévérité : transformations-lentes-rapides
  //    portait, juste sous une réponse encadrée, la consigne d'auteur « à
  //    confirmer en priorité contre le corrigé officiel ou un re-fetch du
  //    scan mesuré au pixel ». L'élève lisait une réponse, puis l'ordre de
  //    aller la vérifier ailleurs.
  //
  //    ÉCARTÉ après lecture, et c'est le point de méthode : « coquille » a
  //    été mesuré (6 occurrences) puis retiré de la sonde. C'est un mot
  //    français ordinaire qui signale une vraie coquille du sujet officiel —
  //    utile à qui a la copie sous les yeux, et dans philo/l-etat il porte
  //    même le fond du propos. Une exclusion ajoutée « par prudence » ne
  //    protège rien ; une exclusion appuyée sur un cas mesuré, si.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    const FILIERE = new RegExp(
      "\\bau\\s+pixel\\b" +
      "|\\bau\\s+vectoriel\\b" +
      "|\\bbitmaps?\\b" +
      "|\\bimage\\s+native\\b" +
      "|re-?d[ée]crite?s?\\s+depuis" +
      "|re-?mesur[ée]e?s?\\s+au\\s+pixel" +
      "|par\\s+la\\s+v[ée]rification" +
      "|\\bLectures?\\s+fermes?\\b" +
      "|\\bre-?fetch\\b" +
      "|\\bdpi\\b" +
      "|point\\s+PostScript" +
      "|g[ée]om[ée]trie\\s+vectorielle" +
      "|\\bCROSS[-\\s]LIST\\b|\\bcross[-\\s]list[ée]?s?\\b" +
      "|la\\s+r[èe]gle\\s+de\\s+la\\s+maison" +
      "|le\\s+routage\\s+retenu",
      "i");
    const fuites = [];
    const chasse = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) chasse(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        // Mêmes sous-arbres AUTEUR qu'en §11.61/§11.67 : la provenance y est
        // à sa place, c'est même le seul endroit où elle doit vivre.
        if (k === "sourcing" || k === "item_source" ||
            k === "coverage_summary" || k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) {
          const h = v.match(FILIERE);
          if (h) fuites.push(`${fichier} → champ « ${k} » : « ${h[0]} »`);
        } else chasse(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) chasse(yamlDocs[fname], fname);
    for (const f of [...new Set(fuites)]) {
      console.error(
        `  ✗ ${dir}: ${f} — provenance de transcription ou vocabulaire de filière dans du texte lu par l'élève. ` +
          `Garde la LECTURE, déplace la provenance vers « sourcing ».`
      );
      dirFail++;
    }
  }

  // ── §11.76 Une NOTE D'ÉTAPE qui contredit son propre `math` ─────────────
  //    `steps[].note` est RENDU (content.ts) : il s'affiche sous la ligne de
  //    calcul qu'il commente. Quand les deux ne disent pas la même chose, ce
  //    n'est pas une nuance — c'est un calcul qui produit 9,2 sous-titré
  //    « ici lu 9,6 ».
  //
  //    Le cas fondateur, trouvé le 2026-09-12 par les deux critiques de
  //    reactions-acido-basiques SÉPARÉMENT : `exercises.yaml` r-variation q5.
  //    Il vient d'une correction DÉCLARÉE APPLIQUÉE la veille, qui avait
  //    atteint l'énoncé et le `math` et manqué la note posée dessous. C'est
  //    ce que cette porte existe pour rattraper : non pas une faute d'auteur,
  //    mais le dernier mètre d'une passe de correction.
  //
  //    LA SÉVÉRITÉ DE LA SONDE A ÉTÉ MESURÉE, pas devinée. Trois versions :
  //      · « la note nomme un nombre absent du résultat du math » → 55
  //        signalements, 22 notions, **tous faux** : une note nomme
  //        légitimement des INTERMÉDIAIRES (« 1 u vaut 931,5 MeV »,
  //        « racine de 4 vaut 2 »). C'est son métier.
  //      · « même symbole, deux valeurs » → 9 signalements, **tous faux** :
  //        « tau << 1 », « chapitre 3 », le 2 de 2π, le 14 de pKe.
  //      · celle-ci — même symbole, ET la note l'AFFIRME (« = », « vaut »,
  //        « lu », « trouvé », « donne »), les renvois de chapitre neutralisés
  //        → 0 sur le corpus, et elle attrape le cas fondateur.
  //    Les deux premières ne sont pas armées : une porte qui crie 55 fois pour
  //    rien apprend à être ignorée.
  {
    const SYMS = "pK_?A|pK_?[eb]|K_?A|\\\\tau|T_0|I_0|U_0|L_0|Q_r|N_0|C_[ab]";
    const AFFIRME = /\b(pK ?A|pKe|KA|tau|T0|I0|U0|L0|Qr|N0)\b[^.;]{0,30}?\b(?:=|vaut|lue?|trouvée?|donne)\s+(-?\d{1,6}(?:[.,]\d{1,6})?)/gi;
    const nombre = (s) => {
      const m = String(s).replace(/\{,\}/g, ",").replace(/\\,/g, "").match(/-?\d{1,6}(?:[.,]\d{1,6})?/);
      return m ? parseFloat(m[0].replace(",", ".")) : null;
    };
    const ecarts = [];
    const chasse = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) chasse(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      if (typeof n.math === "string" && typeof n.note === "string") {
        // Les renvois « chapitre N » sont neutralisés : ce sont des numéros
        // de chapitre, jamais des valeurs (mesuré : 3 faux positifs sans ça).
        const note = n.note.replace(/chapitres?\s+\d+/gi, "");
        const poses = new RegExp(`(${SYMS})\\s*(?:\\\\approx|\\\\simeq|=)\\s*\\\\?\\$?\\s*(-?[\\d{,.}\\\\ ]{1,14})`, "g");
        let m;
        while ((m = poses.exec(n.math)) !== null) {
          const sym = m[1].replace(/\\\\/g, "").replace(/_/g, "").toLowerCase();
          const v1 = nombre(m[2]);
          if (v1 === null || v1 === 0) continue;
          AFFIRME.lastIndex = 0;
          let k;
          while ((k = AFFIRME.exec(note)) !== null) {
            if (k[1].replace(/ /g, "").toLowerCase() !== sym) continue;
            const v2 = nombre(k[2]);
            if (v2 === null) continue;
            if (Math.abs(v1 - v2) / Math.abs(v1) > 0.02)
              ecarts.push(`${fichier} : le calcul pose ${sym} = ${v1}, la note posée dessous dit ${v2}`);
          }
        }
      }
      for (const v of Object.values(n)) chasse(v, fichier);
    };
    for (const fname of Object.keys(yamlDocs)) chasse(yamlDocs[fname], fname);
    for (const f of [...new Set(ecarts)]) {
      console.error(
        `  ✗ ${dir}: ${f} — une note d'étape contredit le calcul qu'elle commente. ` +
          `Les deux se rendent, l'un sous l'autre.`
      );
      dirFail++;
    }
  }

  // ── §11.77 Un « chapitre N » NU qui dépasse la leçon hôte ───────────────
  //    Le corpus renvoie beaucoup au chapitre : **5 516 citations mesurées**
  //    le 2026-09-12, réparties entre renvois internes (« au chapitre 4 ») et
  //    renvois croisés (« le chapitre 8 de "Suites numériques" »). Cette
  //    densité est une force — c'est ce qui fait tenir le décortiquer d'une
  //    notion à l'autre — et c'est exactement pourquoi un renvoi faux coûte :
  //    l'élève qui l'ouvre ne trouve rien, et conclut qu'il a raté quelque
  //    chose. ADR 0031 : un renvoi est une instruction.
  //
  //    Cette porte ne juge QUE le cas qu'elle peut trancher seule : un
  //    « chapitre N » NU — aucune notion nommée avant lui dans le même champ —
  //    dont le numéro dépasse le nombre de « ## » de la leçon hôte. Un renvoi
  //    nu ne peut désigner que la leçon courante ; s'il la dépasse, il ne
  //    désigne rien.
  //
  //    Sur les 5 516, deux dépassaient. Un seul était un défaut : dans un
  //    champ `math` de derivabilite — qui se rend SEUL, en formule détachée —
  //    « (théorème de la limite monotone, chapitre 8) », alors que la leçon
  //    hôte a 7 chapitres et que la cible est « Suites numériques » (12
  //    chapitres, dont le 8e est bien ce théorème). Le `math` VOISIN, lui,
  //    écrivait « chapitre 9 de Suites numériques » : le fichier se
  //    contredisait à une ligne d'intervalle.
  //
  //    L'autre était un faux positif, et il donne l'exemption : « … et par
  //    "Réactions acido-basiques" (chapitre 8, exemple travaillé 2) » — la
  //    cible est nommée juste avant, la parenthèse s'y rapporte. D'où la
  //    règle : si une notion est nommée (« … » ou **gras**) AVANT le renvoi
  //    dans le même champ, on se tait.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    const nbChapitres = (md.match(/^##\s/gm) || []).length;
    const horsBornes = [];
    const examiner = (txt, ou) => {
      const re = /chapitres?\s+(\d+)\b/gi;
      let m;
      while ((m = re.exec(txt)) !== null) {
        const n = parseInt(m[1], 10);
        if (n <= nbChapitres) continue;
        // Une notion nommée AVANT ce renvoi, dans le même champ ? Alors le
        // renvoi lui appartient et cette porte n'a rien à en dire.
        const avant = txt.slice(0, m.index);
        if (/[«"][^»"]{4,70}[»"]|\*\*[^*]{4,70}\*\*/.test(avant)) continue;
        // « chapitre N de <quelque chose> » désigne aussi une autre leçon.
        if (/^\s+d[eu]\s+\S/.test(txt.slice(m.index + m[0].length))) continue;
        horsBornes.push(`${ou} : « ${m[0]} » — cette leçon n'a que ${nbChapitres} chapitres`);
      }
    };
    examiner(md, "lesson.md");
    const chasse = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) chasse(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (k === "sourcing" || k === "item_source" ||
            k === "coverage_summary" || k === "contradicts_principle") continue;
        if (typeof v === "string" && RENDU_TXT.has(k)) examiner(v, `${fichier} → « ${k} »`);
        else chasse(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) chasse(yamlDocs[fname], fname);
    for (const f of [...new Set(horsBornes)]) {
      console.error(
        `  ✗ ${dir}: ${f} — un renvoi nu ne peut désigner que la leçon courante. ` +
          `Nomme la notion visée, ou corrige le numéro.`
      );
      dirFail++;
    }
  }

  // ── §11.78 Un TOTAL ré-additionné à l'un de ses propres termes ─────────
  //    Une leçon qui pose « $X = A + B$ » puis écrit plus loin « $X + B$ »
  //    dit, sous sa propre déclaration, $A + 2B$. Le lecteur attentif se
  //    corrige ; celui qui apprend, non.
  //
  //    Cas fondateur, trouvé le 2026-09-12 par les DEUX critiques de
  //    dipole-rl séparément : la leçon déclare « $R = R_0 + r$ » au
  //    chapitre 3, s'y tient partout (y compris dans son exemple chiffré,
  //    $R = 50 + 10 = 60\ \Omega$), puis écrit « $(R+r)$ » HUIT fois au
  //    chapitre 4. Et ce n'était pas cosmétique : deux clés de point d'arrêt
  //    s'en trouvaient contradictoires — l'une marquait FAUX « $I_{max} =
  //    E/R$, seule la résistance du conducteur compte », l'autre marquait
  //    VRAI « $\tau = L/R$ », les deux montrées au même élève.
  //
  //    LEÇON DE MÉTHODE qui vaut la porte : j'avais d'abord corrigé par
  //    remplacements de chaînes ÉNUMÉRÉS — six sur huit. Les deux dernières
  //    ($\tau = L/(R+r)$, en fin de deux longues lignes) n'ont été trouvées
  //    que par cette sonde. Un correctif énuméré ne répare que ce qu'on a
  //    pensé à lister ; seule une sonde sur le fichier entier dit ce qui
  //    reste.
  //
  //    SÉVÉRITÉ MESURÉE. Version large (tous symboles) : 3 signalements,
  //    2 faux — nombres-complexes-1 déclare « $z = a + bi$ » et emploie
  //    ailleurs « $z + b$ » (la translation) et « $z_1 + z_2$ », où $a$ et
  //    $b$ sont des lettres génériques réemployées. Version armée : au moins
  //    un symbole INDICÉ dans la déclaration — les lettres nues ne portent
  //    pas d'identité stable dans une leçon de maths. 0 sur le corpus.
  {
    const DECL = /\$?\\?([A-Za-z](?:_\{?[A-Za-z0-9]+\}?)?)\s*=\s*([A-Za-z](?:_\{?[A-Za-z0-9]+\}?)?)\s*\+\s*([A-Za-z](?:_\{?[A-Za-z0-9]+\}?)?)\s*\$?/g;
    const vus = new Set();
    let d;
    DECL.lastIndex = 0;
    while ((d = DECL.exec(md)) !== null) {
      const [tot, a, b] = [d[1], d[2], d[3]];
      if (tot === a || tot === b) continue;
      // Sans indice, ce sont des lettres génériques (a, b, z) qu'une leçon de
      // maths réemploie légitimement d'un chapitre à l'autre : 2 faux positifs
      // mesurés sans cette condition, 0 avec.
      if (!(tot + a + b).includes("_")) continue;
      for (const terme of [a, b]) {
        const ech = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`(?<![A-Za-z0-9_\\\\{])${ech(tot)}\\s*\\+\\s*${ech(terme)}(?![A-Za-z0-9_])`, "g");
        let m;
        while ((m = re.exec(md.slice(d.index + d[0].length))) !== null) {
          const cle = `${tot} = ${a} + ${b} → ${m[0]}`;
          if (vus.has(cle)) continue;
          vus.add(cle);
          console.error(
            `  ✗ ${dir}: lesson.md déclare « ${tot} = ${a} + ${b} » puis écrit « ${m[0]} » — ` +
              `sous cette déclaration, cela vaut ${a} + 2${terme === a ? a : b}. Un symbole ne peut pas changer de sens en cours de leçon.`
          );
          dirFail++;
        }
      }
    }
  }

  // ── §11.83 La prose IMPRIME la réponse du point d'arrêt qui suit ────────
  //    Une leçon qui écrit « (Réponse : 22 et 1) » puis pose, deux lignes
  //    plus bas, le point d'arrêt qui demande exactement ces deux nombres,
  //    ne mesure rien. L'élève lit, puis reconnaît. TEMPLATE V2 §A veut un
  //    engagement RÉEL ; ici la porte est franchie d'avance.
  //
  //    D'OÙ ELLE VIENT. Les critiques de pédagogie de deux notions PC ont
  //    signalé, le 2026-09-19 et séparément, la même forme : une porte posée
  //    APRÈS le paragraphe qui révèle (5 fois sur 6 dans l'une d'elles). J'ai
  //    cherché la forme mécanisable de ce défaut.
  //
  //    LA SONDE LARGE A ÉTÉ ABANDONNÉE, chiffres à l'appui. Version 1 —
  //    recouvrement des mots de la bonne réponse avec les 420 caractères de
  //    prose qui précèdent le marqueur : 30 signaux, dont beaucoup de faux,
  //    les points d'arrêt d'ACCROCHE (`cp-r0-predict`) partageant
  //    naturellement leur vocabulaire avec le scénario qu'ils font prédire.
  //    Version 2 — ≥ 8 mots de contenu, ≥ 75 % de recouvrement, hors
  //    accroche : 13 signaux, mais de SÉVÉRITÉ MÊLÉE. Certains sont un
  //    contrôle de lecture légitime, ce qui est un jugement pédagogique, pas
  //    une erreur de fait. Une porte bloquante n'a donc pas lieu d'être, et
  //    les 13 sont consignés en HANDOFF pour le pedagogy-architect.
  //
  //    CE QUI EST ARMÉ est le sous-motif qui ne demande aucun jugement : la
  //    prose imprime littéralement « (Réponse : … ) » dans les 500 caractères
  //    qui précèdent un marqueur de point d'arrêt. Aucune lecture n'est
  //    nécessaire pour trancher : la réponse est écrite.
  //
  //    SÉVÉRITÉ MESURÉE sur les 62 notions : 2 occurrences, toutes deux en
  //    SVT (`genetique-humaine/cp-r1-caryotype`,
  //    `genetique-populations/cp-r3-conditions`), toutes deux corrigées — la
  //    question est conservée, la réponse retirée. 0 faux positif.
  {
    const REPONSE = /\(\s*R[ée]ponse\s*:[^)]{0,160}\)/i;
    for (const m of md.matchAll(/\[\[checkpoint:([a-z0-9-]+)\]\]/g)) {
      const avant = md.slice(Math.max(0, m.index - 500), m.index);
      const hit = avant.match(REPONSE);
      if (!hit) continue;
      console.error(
        `  ✗ ${dir}: la prose imprime « ${hit[0].slice(0, 70)}… » juste avant ` +
          `[[checkpoint:${m[1]}]] — le point d'arrêt ne mesure plus rien`
      );
      dirFail++;
    }
  }

  // ── §11.79 Un renvoi de chapitre MALFORMÉ, ou qui a mangé un symbole ────
  //    Deux formes, une seule cause : la campagne de 2026-09 qui a réécrit
  //    les 1 086 renvois « R<n> » en « chapitre N » (tâches #18 et #24).
  //    Elle a réécrit ce qu'il ne fallait pas.
  //
  //    FORME A — « chapitre 4/4 ». Un renvoi de chapitre ne porte JAMAIS de
  //    barre oblique. Aucun usage légitime ne peut produire cette forme.
  //
  //    FORME B — un SYMBOLE avalé : « deux résistances ici, chapitre 1
  //    (conducteur ohmique ajustable) et r ». Le symbole du composant était
  //    $R_0$ ; la campagne a lu « R0 » comme un code de barreau et l'a
  //    remplacé par un numéro de chapitre. L'élève lit une phrase où un
  //    numéro de chapitre tient la place d'une résistance.
  //
  //    POURQUOI UNE PORTE, ET PAS UN CORRECTIF DE PLUS. C'est la DEUXIÈME
  //    fois. Le 2026-09-11 j'ai corrigé « (chapitre 5/5) » dans
  //    reactions-acido-basiques/exercises.yaml:180 — et je n'ai rien armé.
  //    Le 2026-09-12 la même forme est revenue trois fois dans
  //    rlc-serie/bank.yaml (858, 892, 1886), plus la forme B en 1468. Un
  //    défaut vu deux fois n'est pas un accident : c'est une classe.
  //
  //    SÉVÉRITÉ MESURÉE sur le corpus entier (62 notions), après correctifs :
  //    forme A, 0 ; forme B, 0. Le seul reste est une CITATION de la forme A
  //    dans un fichier REVIEW-*.md, qui documente le défaut — les fichiers
  //    de revue ne sont pas rendus et ne sont pas examinés ici.
  {
    const RENDU_TXT = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math", "caption"]);
    // La barre oblique ET le tiret : « chapitre 4/4 » comme « chapitre 4-4 ».
    // Le tiret n'est retenu que si les DEUX nombres sont ÉGAUX — « chapitre
    // 10-11 » est un intervalle légitime, mesuré une fois dans le corpus.
    const MALFORME = /chapitres?\s+(\d+)\s*(?:\/\s*\d+|-\s*\1(?!\d))/i;
    const SYMBOLE_MANGE =
      /chapitres?\s+\d+\s*\((?:le\s+|la\s+|un\s+|une\s+)?(?:conducteur|résistance|condensateur|bobine|rhéostat|générateur|interrupteur|ampèremètre|voltmètre)\b/i;
    const trouves = [];
    const examiner = (txt, ou) => {
      if (MALFORME.test(txt)) {
        trouves.push(`${ou} : renvoi malformé « ${txt.match(MALFORME)[0]} » — un numéro de chapitre ne se double ni par une barre oblique ni par un tiret`);
      }
      if (SYMBOLE_MANGE.test(txt)) {
        trouves.push(`${ou} : « ${txt.match(SYMBOLE_MANGE)[0]} » — un numéro de chapitre tient la place d'un symbole de composant`);
      }
    };
    examiner(md, "lesson.md");
    const chasse = (n, fichier) => {
      if (Array.isArray(n)) { for (const x of n) chasse(x, fichier); return; }
      if (!n || typeof n !== "object") return;
      for (const [k, v] of Object.entries(n)) {
        if (typeof v === "string" && RENDU_TXT.has(k)) examiner(v, `${fichier} → « ${k} »`);
        else chasse(v, fichier);
      }
    };
    for (const fname of Object.keys(yamlDocs)) chasse(yamlDocs[fname], fname);
    for (const f of [...new Set(trouves)]) {
      console.error(`  ✗ ${dir}: ${f}`);
      dirFail++;
    }
  }

  // ── Rung integrity, SECOND DIRECTION (warning only) — le miroir de la porte
  //    ci-dessus. Celle-là attrape un item qui vise un rung absent ; elle ne
  //    voit RIEN quand c'est le titre qui a perdu son code. Un « ## » qui
  //    enseigne sans porter « R<n> » ne peut recevoir AUCUN item ni checkpoint
  //    (l'accrochage se fait par le code), donc son contenu est structurellement
  //    hors du modèle apprenant et invisible au coverage_summary — sans qu'aucun
  //    compteur ne baisse, puisque le dénominateur ne compte que ce qui a un
  //    rung. ADR 0031 : « une porte a deux sens. »
  //
  //    Mesuré le 2026-09-12 sur les 62 notions : 8 chapitres d'enseignement dans
  //    5 notions, de 74 à 172 lignes chacun — jusqu'à 34,7 % du corps d'une
  //    leçon (nombres-complexes-1 : le second degré dans ℂ et les relations de
  //    Viète) ; structures-algebriques 32,0 % (sous-groupe, anneau intègre — les
  //    deux gestes que le relevé donne dans 8 sujets vérifiés sur 10) ;
  //    derivabilite 30,7 % (fonction réciproque) ; suites-numeriques 20,9 %
  //    (homographiques) ; probabilites-conditionnelles 29,2 % (variable
  //    aléatoire, loi binomiale).
  //
  //    Avertissement et non échec : donner un barreau à un chapitre est une
  //    décision de rampe (elle renumérote tout ce qui suit et déplace le
  //    coverage), pas une correction mécanique. Les titres purement structurels
  //    ne comptent pas — ils n'enseignent rien qui doive être testé.
  {
    const STRUCTUREL = /^(?:décortiquer|la rampe|pour t'entraîner|s'entraîner|synthèse|récapitulatif)\b/i;
    const lignes = md.split("\n");
    const tetes = [];
    lignes.forEach((l, i) => { if (/^## /.test(l)) tetes.push([i, l.slice(3).trim()]); });
    for (let k = 0; k < tetes.length; k++) {
      const [i, titre] = tetes[k];
      if (/^R\d+\b/.test(titre) || STRUCTUREL.test(titre)) continue;
      const fin = k + 1 < tetes.length ? tetes[k + 1][0] : lignes.length;
      const n = fin - i;
      if (n < 25) continue; // un intertitre court n'est pas un chapitre d'enseignement
      const part = ((100 * n) / lignes.length).toFixed(1);
      console.error(
        `  ⚠ ${dir}: le chapitre « ${titre.slice(0, 60)} » (${n} lignes, ${part} % de la leçon) n'a pas de code de barreau — aucun item ni checkpoint ne peut s'y accrocher, il est invisible au modèle apprenant`,
      );
    }
  }

  // ── Rung-code jargon in RENDERED exercise math (warning only) — un « R<n> »
  //    glissé dans un `\text{}` d'un champ rendu de bank/items/exercises/
  //    checkpoints (steps[].math, reasoning, feedback, stem, solution…) se rend
  //    LITTÉRALEMENT à l'élève, qui ne voit jamais le code de barreau : le rail
  //    et chapters.ts affichent « chapitre N » (chapitre N = R(N−1)). C'est la
  //    même faute que la porte figures (codes de barreau dans le texte peint) et
  //    la porte prose (le mot « rung »), mais dans la COUCHE EXERCICES — l'angle
  //    mort exposé par les critiques vague 1 (fonction-logarithme F3 : 12 fuites
  //    sur 5 notions maths ; dipole-rl F16). Le motif `\text{…R\d…}` exige un
  //    chiffre COLLÉ au R : il ne matche donc pas `R_0` (indice de résistance en
  //    PC), d'où 0 faux positif mesuré sur les 62 notions. Avertissement, non
  //    échec — comme les portes sœurs, à durcir une fois le corpus propre.
  //    ÉLARGI 2026-09-12 : le motif `\text{…R\d…}` ne voyait QUE le KaTeX. Un
  //    balayage corpus a trouvé 34 fuites de plus dans de la PROSE rendue, sous
  //    trois formes qu'il ratait : (a) « chapitre R7 » / « rung R4 » / « leçon R2 »
  //    en toutes lettres ; (b) un « (R8) » nu DANS le math, hors \text{} ;
  //    (c) « chapitre chapitre 8 » (mot doublé). La porte suit désormais la CLÉ
  //    YAML propriétaire de chaque ligne : elle n'avertit que pour un champ
  //    RENDU (intro/stem/reasoning/note/text/feedback/solution/math…), jamais
  //    pour une `sourcing.note` ni un `retagged_items` — où l'auteur a le droit
  //    de parler en barreaux. Sans ce filtre, 13 notes d'auteur criaient au loup.
  {
    const RENDERED = new Set(["intro", "stem", "reasoning", "note", "text", "feedback",
      "solution", "correct_feedback", "title", "part", "math"]);
    // clé propriétaire d'une ligne + sa clé parente (remontée à indentation plus faible)
    const ownerOf = (lines, idx) => {
      let key = null, ind = null, parent = null;
      for (let j = idx; j >= 0; j--) {
        const m = lines[j].match(/^(\s*)-?\s*([A-Za-z_][A-Za-z0-9_]*):/);
        if (!m) continue;
        if (key === null) { key = m[2]; ind = m[1].length; continue; }
        if (m[1].length < ind) { parent = m[2]; break; }
      }
      return [key, parent];
    };
    const SHAPES = [
      /\\text\{[^}]*\bR\d[^}]*\}/g,                       // (historique) code dans un \text{}
      /(?:[Cc]hapitres?|[Ll]e[çc]ons?|rung|barreau)\s+R\d\b/g, // « chapitre R7 », « rung R4 »
      /\(R\d\)/g,                                           // « (R8) » nu dans le math
      /\b(chapitre|leçon)\s+\1\b/gi,                         // mot doublé « chapitre chapitre »
    ];
    for (const fname of ["bank.yaml", "items.yaml", "exercises.yaml", "checkpoints.yaml"]) {
      const fp = path.join(abs, fname);
      if (!fs.existsSync(fp)) continue;
      const lines = fs.readFileSync(fp, "utf8").split("\n");
      const hits = new Set();
      for (let i = 0; i < lines.length; i++) {
        if (/^\s*#/.test(lines[i])) continue; // notes d'auteur en commentaire : non rendues
        let found = null;
        for (const re of SHAPES) { re.lastIndex = 0; const m = lines[i].match(re); if (m) { found = m; break; } }
        if (!found) continue;
        const [key, parent] = ownerOf(lines, i);
        if (!RENDERED.has(key) || parent === "sourcing") continue; // champ côté-auteur : non rendu
        for (const h of found) hits.add(h);
      }
      if (hits.size) {
        const shown = [...hits].slice(0, 4).join(" ; ");
        console.error(
          `  ⚠ ${dir}: ${fname} — code de barreau « R<n> » dans un champ RENDU : ${shown}${hits.size > 4 ? " …" : ""} — l'élève lit « chapitre N », pas « R<n> » ; réécrire`,
        );
      }
    }
  }

  // ── Renvoi vers une LEÇON qui n'existe pas (warning only) — ADR 0031 : « un
  //    renvoi est une instruction ». Un « chapitre 8 de « Chute verticale et
  //    mouvements plans » » envoie l'élève chercher un titre que le corpus ne
  //    porte pas — la vraie leçon s'appelle « Chute libre et mouvements plans ».
  //    Mesuré 2026-09-12 : 18 renvois morts sur 9 notions PC, dont UNE leçon
  //    citée sous TROIS noms différents (chute-mouvements-plans) et une autre
  //    sous deux (rc-charge). Le contrôle ne compare que les titres cités entre
  //    guillemets APRÈS une amorce de renvoi (« chapitre N de », « la leçon »,
  //    « la notion ») — une citation libre entre guillemets n'est pas touchée —
  //    et tolère l'inclusion partielle (un titre raccourci reste trouvable).
  {
    if (!globalThis.__lessonTitles) {
      const idx = new Map();
      for (const d of fs.readdirSync(path.join(REPO, "content"))) {
        const sub = path.join(REPO, "content", d);
        if (!fs.statSync(sub).isDirectory()) continue;
        for (const n of fs.readdirSync(sub)) {
          const lp = path.join(sub, n, "lesson.md");
          if (!fs.existsSync(lp)) continue;
          const first = fs.readFileSync(lp, "utf8").split("\n").find((l) => l.startsWith("# "));
          if (first) idx.set(`${d}/${n}`, first.slice(2).trim());
        }
      }
      globalThis.__lessonTitles = idx;
    }
    if (!globalThis.__chapterTitles) {
      // Les titres de CHAPITRE (## …) sont des cibles légitimes : « le chapitre
      // « Sous-groupe » » renvoie à l'intérieur d'une leçon, pas à une leçon.
      const ch = new Set();
      for (const d of fs.readdirSync(path.join(REPO, "content"))) {
        const sub = path.join(REPO, "content", d);
        if (!fs.statSync(sub).isDirectory()) continue;
        for (const n of fs.readdirSync(sub)) {
          const lp = path.join(sub, n, "lesson.md");
          if (!fs.existsSync(lp)) continue;
          for (const l of fs.readFileSync(lp, "utf8").split("\n")) {
            if (!l.startsWith("## ")) continue;
            ch.add(l.slice(3).trim());
            ch.add(l.slice(3).replace(/^R\d+\s*[-—]\s*/, "").trim());
          }
        }
      }
      globalThis.__chapterTitles = ch;
    }
    const norm = (x) => x.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");
    const known = [
      ...[...globalThis.__lessonTitles.values()].map(norm),
      ...[...globalThis.__chapterTitles].map(norm),
    ].filter(Boolean);
    const CUE = /(?:chapitres?(?:\s+\d+)?(?:\s+(?:de|du))?|la\s+(?:leçon|notion)|leçons?|notions?)\s+«\s*([^»]{4,80}?)\s*»/g;
    // Une citation d'OUVRAGE n'est pas un renvoi vers le corpus : en philo,
    // « chapitre « De l'identité et de la diversité » » désigne un chapitre de
    // Locke. Le signe fiable est l'ANNÉE qui précède (« …, 1690, chapitre « … » »).
    // NE PAS y ajouter un motif d'italique : `\*[^*]{8,}\*` attrape aussi le
    // **gras** markdown, qui ouvre la plupart des paragraphes de leçon — testé
    // le 2026-09-12, il rendait la porte aveugle sur tout le corpus.
    const BIBLIO = /(?:1[4-9]\d{2}|20\d{2})/;
    for (const fname of ["lesson.md", "bank.yaml", "items.yaml", "exercises.yaml", "checkpoints.yaml"]) {
      const fp = path.join(abs, fname);
      if (!fs.existsSync(fp)) continue;
      const dead = new Set();
      for (const line of fs.readFileSync(fp, "utf8").split("\n")) {
        if (/^\s*#/.test(line)) continue; // note d'auteur en commentaire : non rendue
        CUE.lastIndex = 0;
        let m;
        while ((m = CUE.exec(line)) !== null) {
          const ref = norm(m[1].replace(/\*/g, ""));
          if (!ref) continue;
          if (known.some((k) => k === ref || k.includes(ref) || ref.includes(k))) continue;
          if (BIBLIO.test(line.slice(0, m.index))) continue;
          dead.add(m[1]);
        }
      }
      if (dead.size) {
        console.error(
          `  ⚠ ${dir}: ${fname} — renvoi vers une leçon INEXISTANTE : ${[...dead].slice(0, 3).map((t) => `« ${t} »`).join(" ; ")}${dead.size > 3 ? " …" : ""} — aucun titre du corpus ne correspond ; corriger le titre cité`,
        );
      }

      // Second détecteur : le QUASI-TITRE. Un titre cité sans amorce reconnue
      // (« domaine « … » », « établie dans « … » », un libellé entre
      // parenthèses) échappait au contrôle ci-dessus. S'il recouvre fortement
      // un titre réel sans lui être égal, c'est un renvoi mal orthographié.
      const mots = (x) =>
        new Set(
          x.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "")
            .match(/[a-z0-9]+/g)?.filter((w) => w.length > 2) ?? [],
        );
      const CUE2 = /(?:le[çc]on|notion|domaine|sous|dans|voir|chapitres?\s+\d+\s+(?:de|du))\s*$/i;
      const titresMots = [...globalThis.__lessonTitles.values()].map((t) => [t, mots(t)]);
      const proches = new Set();
      for (const line of fs.readFileSync(fp, "utf8").split("\n")) {
        if (/^\s*#/.test(line)) continue;
        for (const m of line.matchAll(/«\s*([^»]{6,80}?)\s*»/g)) {
          const cite = m[1];
          if (cite.includes("$") || cite.split(/\s+/).length < 3) continue;
          const ref = norm(cite);
          if (!ref || known.some((k) => k === ref || k.includes(ref) || ref.includes(k))) continue;
          const tc = mots(cite);
          if (!tc.size) continue;
          let best = 0, cible = "";
          for (const [t, tk] of titresMots) {
            const inter = [...tc].filter((w) => tk.has(w)).length;
            const j = inter / (tc.size + tk.size - inter);
            if (j > best) { best = j; cible = t; }
          }
          const amorce = CUE2.test(line.slice(0, m.index).replace(/[\s*,;(]+$/, ""));
          if (best >= 0.6 || (best >= 0.5 && amorce)) proches.add(`${cite} → ${cible}`);
        }
      }
      if (proches.size) {
        console.error(
          `  ⚠ ${dir}: ${fname} — titre de leçon QUASI correct : ${[...proches].slice(0, 3).map((t) => `« ${t} »`).join(" ; ")}${proches.size > 3 ? " …" : ""} — un renvoi doit nommer le titre EXACT`,
        );
      }
    }
  }

  // ── UNE notion, UN `skill_code` (warning only). `skill_code` est une CLÉ DE
  //    JOINTURE : les RPC de la base font `SELECT lesson FROM public.skills
  //    WHERE code = p_skill_code` (migrations 025/026/028), et l'ADR 0008 exige
  //    « verbatim skills.code ». Une notion qui en déclare DEUX en fait porter
  //    un aux items et l'autre aux checkpoints — au câblage, la moitié de la
  //    notion se joint ailleurs, ou nulle part, en silence.
  //    Mesuré 2026-09-12 : SIX notions en portaient deux à la fois —
  //    suites-numeriques (5 items sur 39 en `maths_…` contre `sma_…`) et cinq
  //    notions de philo, où la variante avec article (`philo_le_devoir`)
  //    doublait la variante sans (`philo_devoir`) : 51 lignes au total.
  //    L'arbitrage se lit dans le fichier lui-même : les ids de misconception
  //    (ADR 0011, `mc.<matière>.<code>.<label>`) et les centaines de tags de
  //    distracteurs qui les visent ne citent JAMAIS qu'une des deux variantes —
  //    c'est celle-là que la notion a réellement engagée.
  {
    const vus = new Map(); // code -> [fichiers]
    for (const fname of ["items.yaml", "checkpoints.yaml", "exercises.yaml", "bank.yaml"]) {
      const fp = path.join(abs, fname);
      if (!fs.existsSync(fp)) continue;
      for (const line of fs.readFileSync(fp, "utf8").split("\n")) {
        if (/^\s*#/.test(line)) continue;
        const m = line.match(/^\s*skill_code:\s*([A-Za-z0-9_]+)/);
        if (!m) continue;
        if (!vus.has(m[1])) vus.set(m[1], new Set());
        vus.get(m[1]).add(fname);
      }
    }
    if (vus.size > 1) {
      const detail = [...vus.entries()]
        .map(([c, f]) => `${c} (${[...f].join(", ")})`)
        .join(" vs ");
      console.error(
        `  ⚠ ${dir}: DEUX skill_code dans la même notion — ${detail} — c'est une clé de jointure (ADR 0008) : une seule valeur par notion ; trancher avec le préfixe des ids de misconception`,
      );
    }
  }

  // ── Orphan figure ASSETS (warning only) — le SENS INVERSE du contrôle
  // marqueur→asset plus haut (ADR 0031 : une porte a deux directions, et
  // celle qui ne va que dans un sens finit contournée). Un SVG de media/ que
  // AUCUN marqueur ne place ne se rend à personne : soit il attend son
  // marqueur (figure autorée puis oubliée à une renumérotation de marche),
  // soit il est mort (retiré avec sa marche, ou remplacé par un frère — p. ex.
  // une version .motion). Avertissement et non échec, précisément parce que le
  // second cas est légitime ; le sens marqueur→asset manquant reste, lui, un
  // échec dur, donc la porte peut toujours virer rouge. Les références sont
  // collectées dans TOUS les fichiers texte du dossier (pas seulement
  // lesson.md) : un [[figure:…]] vit aussi dans exercises.yaml,
  // checkpoints.yaml, derivations.yaml et les spec-*.md.
  if (fs.existsSync(mediaDir)) {
    const placedSlugs = new Set();
    const dirTextFiles = fs
      .readdirSync(abs)
      .filter((f) => (/\.(md|ya?ml)$/i.test(f)) && !/^review/i.test(f));
    for (const tf of dirTextFiles) {
      let txt = "";
      try { txt = fs.readFileSync(path.join(abs, tf), "utf8"); } catch { /* skip */ }
      for (const m of txt.matchAll(/\[\[[a-z]+:([^\]]+)\]\]/g)) placedSlugs.add(m[1]);
    }
    for (const f of fs.readdirSync(mediaDir)) {
      if (!f.endsWith(".svg")) continue;
      const base = f.slice(0, -4);
      const cands = [base];
      if (base.endsWith(".motion")) cands.push(base.slice(0, -".motion".length));
      if (!cands.some((c) => placedSlugs.has(c))) {
        console.error(
          `  ⚠ ${dir}: figure asset media/${f} n'est placée par aucun marqueur — la placer, ou supprimer l'asset mort`,
        );
      }
    }
  }

  // ── Staged figures (LESSON-EXPERIENCE-SPEC §2.7) — a directory-level scan
  // of media/, independent of the [[figure:slug]] markers walked above (a
  // sidecar's contract with its SVG holds whether or not the lesson happens
  // to place that figure this revision).
  if (fs.existsSync(mediaDir)) {
    const mediaFiles = fs.readdirSync(mediaDir);
    const svgFiles = mediaFiles.filter((f) => f.endsWith(".svg") && !f.endsWith(".motion.svg"));
    const stagesFiles = mediaFiles.filter((f) => f.endsWith(".stages.json"));
    const stagedSlugs = new Set(stagesFiles.map((f) => f.replace(/\.stages\.json$/, "")));

    // ── LE CONTRAT DE COULEUR DES FIGURES (skill figure-authoring) ──────────
    // « Couleurs UNIQUEMENT var(--figure-…). Jamais hex/currentColor. » La
    // règle était écrite, le grep de contrôle était même prescrit — mais rien
    // ne l'exécutait, et figure-preview.mjs affirmait dans sa docstring que
    // CETTE porte la vérifiait déjà. Elle ne l'a jamais fait. Une exigence
    // sans mécanisme finit ignorée : c'est la leçon des portes, appliquée à
    // la couleur.
    //
    // POURQUOI ÇA COMPTE, concrètement : les jetons basculent entre thèmes
    // (--figure-surface passe de #FFFFFF à #1A1917, --figure-ink de presque
    // noir à presque blanc). Une couleur codée en dur ne bascule pas. Mesuré
    // le 2026-09-03 sur arbre-pondere : en thème sombre, ses boîtes quasi
    // blanches éclataient sur la page et ses étiquettes d'arêtes tombaient
    // à 2:1 de contraste — alors qu'elles portent les probabilités
    // conditionnelles, le sujet même de la figure.
    //
    // L'EXCEPTION EST PRÉVUE, ET ELLE DOIT ÊTRE ARGUMENTÉE DANS LE FICHIER.
    // Certaines couleurs SONT l'information : le spectre d'un prisme, la
    // teinte d'un indicateur coloré. Aucun jeton ne peut les remplacer sans
    // rendre la figure fausse. Une figure dans ce cas déclare, en commentaire
    // XML, `COULEURS SÉMANTIQUES:` suivi de sa raison — sur le modèle des
    // blocs CORRECTION ASSUMÉE des banques. Le précédent existait déjà :
    // lambda-nu-changement-milieu écrivait « Rouge littéral (#C0392B, PAS un
    // token) » bien avant cette porte. On ne supprime pas l'exception, on
    // exige qu'elle soit dite.
    const COULEUR_EN_DUR =
      /(?:fill|stroke|stop-color|color|flood-color|lighting-color)\s*[:=]\s*"?\s*(#[0-9a-fA-F]{3,8}|currentColor)\b/g;
    for (const file of svgFiles) {
      const src = fs.readFileSync(path.join(mediaDir, file), "utf8");
      const trouvees = [...new Set([...src.matchAll(COULEUR_EN_DUR)].map((m) => m[1]))];
      if (!trouvees.length) continue;
      // Deux sorties, et deux seulement. Toutes deux exigent que la raison
      // soit ÉCRITE DANS LE FICHIER, là où le prochain lecteur la trouvera.
      //   · COULEURS SÉMANTIQUES — la couleur EST l'information.
      //   · DETTE OWNER — une figure héritée dont le sort (corriger ou
      //     supprimer) est un arbitrage owner ouvert : la repeindre
      //     reviendrait à décider de la garder. Le marqueur doit nommer
      //     l'arbitrage, faute de quoi il n'est qu'un interrupteur pour
      //     faire taire la porte.
      if (/COULEURS\s+SÉMANTIQUES\s*:/i.test(src)) continue;
      if (/DETTE\s+OWNER\s*:/i.test(src)) continue;
      console.error(
        `  ✗ ${dir}: media/${file} → ${trouvees.length} couleur(s) codée(s) en dur ` +
          `(${trouvees.slice(0, 4).join(", ")}${trouvees.length > 4 ? "…" : ""}) — ` +
          `ces couleurs ne basculent pas avec le thème. Utilise var(--figure-ink|ink-soft|surface|grid|accent), ` +
          `ou, si la couleur EST l'information (spectre, indicateur coloré), déclare-le dans le fichier ` +
          `par un commentaire « COULEURS SÉMANTIQUES: <la raison> ».`
      );
      dirFail++;
    }

    // Corollaire du même contrat : un <style> de SVG inliné n'est PAS scopé —
    // il s'applique au document ENTIER. Une règle nue comme `text { … }`
    // atteint donc les <text> de toutes les AUTRES figures de la page.
    // Démontré le 2026-09-03 : neuf figures déclaraient
    // `text { text-anchor: middle }`, et co-rendre l'une d'elles avec
    // bezout-remontee poussait QUATORZE textes de cette dernière hors de son
    // cadre. Les figures sont inlinées en production (MediaDiagram,
    // dangerouslySetInnerHTML) : la fuite est réelle. Ce qui est propre à
    // une figure se déclare sur SA racine ou par SES classes.
    const SELECTEUR_NU = /^[ \t]*(text|tspan|rect|circle|line|path|polygon|polyline|g|svg)\s*(?:,[^{]*)?\{/gm;
    for (const file of svgFiles) {
      const src = fs.readFileSync(path.join(mediaDir, file), "utf8");
      for (const bloc of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
        const nus = [...new Set([...bloc[1].matchAll(SELECTEUR_NU)].map((m) => m[1]))];
        if (!nus.length) continue;
        console.error(
          `  ✗ ${dir}: media/${file} → sélecteur(s) non scopé(s) dans <style> : ${nus.join(", ")} — ` +
            `un <style> de SVG inliné s'applique à TOUTE la page et déforme les autres figures. ` +
            `Porte la règle sur la racine (style="…") ou sur une classe propre à cette figure.`
        );
        dirFail++;
      }
    }

    // ── LES CODES DE BARREAU NE SORTENT PAS DANS LA FIGURE ─────────────────
    // Un « R3 » désigne un barreau de la leçon. L'élève n'en voit JAMAIS le
    // code : LessonRenderer retire le préfixe « R<n> — » des titres h2/h3 (il
    // ne survit que dans un data-rung invisible) et chapters.ts fait de même
    // pour le libellé du rail. Écrire « (cf. R3) » dans une figure, c'est
    // renvoyer à une étiquette qui n'existe nulle part à l'écran.
    //
    // Ce n'est pas une règle nouvelle : l'audit externe de juillet (5.1) a
    // classé ces renvois comme une FUITE DE TEXTE DE RÉDACTION, et le
    // correctif d'alors a nettoyé les titres h2/h3, les cellules du tableau
    // de barème, les renvois de la prose RLC et les notes « (§0.4) » des cinq
    // SVG de mouvement. La couche des SVG STATIQUES n'a jamais été balayée :
    // 47 occurrences y dormaient encore le 2026-09-04, dont une rangée
    // entière de pastilles « R2 / R1 · R3 · R4 / R5 / R6 » au milieu de la
    // carte de méthode de philo. Le correctif de juillet a été déclaré au
    // niveau de la CLASSE ; il n'a été appliqué qu'aux instances regardées.
    // Cette porte est ce qui manquait pour que la classe tienne.
    //
    // L'EXCEPTION EST RÉELLE ET DOIT ÊTRE DITE : en électricité, R0/R1/R2
    // sont des noms de COMPOSANTS (rl-schema.svg étiquette son résistor R0).
    // Une figure dans ce cas déclare `CODES R LÉGITIMES:` suivi de la raison,
    // comme les blocs COULEURS SÉMANTIQUES ci-dessus.
    const CODE_BARREAU = /\bR\d+\b/g;
    for (const file of svgFiles) {
      const src = fs.readFileSync(path.join(mediaDir, file), "utf8");
      if (/CODES\s+R\s+LÉGITIMES\s*:/i.test(src)) continue;
      // Le texte RENDU seulement : commentaires d'auteur exclus (ils ne
      // sortent pas à l'écran et servent justement à situer la figure dans
      // la leçon), <text>/<title>/<tspan> et l'aria-label de la racine inclus
      // — ce dernier est lu à voix haute, donc il compte.
      const sansCommentaires = src.replace(/<!--[\s\S]*?-->/g, "");
      const morceaux = [];
      for (const m of sansCommentaires.matchAll(/<(text|title)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
        morceaux.push(m[2].replace(/<[^>]+>/g, " "));
      }
      const aria = sansCommentaires.match(/aria-label="([^"]*)"/);
      if (aria) morceaux.push(aria[1]);
      const codes = [...new Set(morceaux.join(" ").match(CODE_BARREAU) ?? [])];
      if (!codes.length) continue;
      console.error(
        `  ✗ ${dir}: media/${file} → code(s) de barreau dans le texte rendu : ${codes.join(", ")} — ` +
          `l'élève ne voit jamais ces codes (LessonRenderer retire le préfixe « R<n> — » des titres). ` +
          `Renvoie à un référent VISIBLE (« vu plus haut », le titre de la section), ou, si R<n> nomme ` +
          `un composant du circuit, déclare-le par un commentaire « CODES R LÉGITIMES: <la raison> ».`
      );
      dirFail++;
    }

    for (const file of stagesFiles) {
      const slug = file.replace(/\.stages\.json$/, "");
      const svgPath = path.join(mediaDir, `${slug}.svg`);
      if (!fs.existsSync(svgPath)) {
        console.error(`  ✗ ${dir}: media/${file} → sibling media/${slug}.svg MISSING`); dirFail++;
        continue;
      }
      let parsed;
      try { parsed = JSON.parse(fs.readFileSync(path.join(mediaDir, file), "utf8")); }
      catch (err) { console.error(`  ✗ ${dir}: media/${file} invalid JSON → ${err.message.split("\n")[0]}`); dirFail++; continue; }

      const stages = Array.isArray(parsed?.stages) ? parsed.stages : null;
      if (!stages) {
        console.error(`  ✗ ${dir}: media/${file} has no "stages" array`); dirFail++; continue;
      }

      const svgSrc = fs.readFileSync(svgPath, "utf8");
      const stepNs = [...svgSrc.matchAll(/\bid="step-(\d+)"/g)].map((m) => parseInt(m[1], 10));
      const maxN = stepNs.length ? Math.max(...stepNs) : 0;
      if (stages.length !== maxN) {
        console.error(`  ✗ ${dir}: media/${file} declares ${stages.length} stage(s) but media/${slug}.svg's max is id="step-${maxN}" — counts must match exactly`);
        dirFail++;
      }

      const badCaption = stages.some((s) => typeof s?.caption !== "string" || s.caption.trim().length === 0);
      if (badCaption) {
        console.error(`  ✗ ${dir}: media/${file} has a non-string or empty stage caption`); dirFail++;
      }
      stgN++;
    }

    // Bespoke-interactive sidecars (INTERACTIVE-FIGURE-SPEC.md §5) — a
    // manipulable figure is ALWAYS staged first (a sibling .stages.json MUST
    // exist), unlockAfterStage MUST equal that sidecar's stages.length, every
    // binding target MUST resolve to a real id in the sibling .svg, and
    // control.domain MUST be a valid [min, max] pair.
    const interactiveFiles = mediaFiles.filter((f) => f.endsWith(".interactive.json"));
    for (const file of interactiveFiles) {
      const slug = file.replace(/\.interactive\.json$/, "");
      let parsed;
      try { parsed = JSON.parse(fs.readFileSync(path.join(mediaDir, file), "utf8")); }
      catch (err) { console.error(`  ✗ ${dir}: media/${file} invalid JSON → ${err.message.split("\n")[0]}`); dirFail++; continue; }

      if (!stagedSlugs.has(slug)) {
        console.error(`  ✗ ${dir}: media/${file} has no sibling media/${slug}.stages.json — a manipulable figure must always be staged first`);
        dirFail++;
        continue;
      }

      const stagesRaw = JSON.parse(fs.readFileSync(path.join(mediaDir, `${slug}.stages.json`), "utf8"));
      const stageCount = Array.isArray(stagesRaw?.stages) ? stagesRaw.stages.length : 0;
      if (parsed?.unlockAfterStage !== stageCount) {
        console.error(`  ✗ ${dir}: media/${file} unlockAfterStage=${parsed?.unlockAfterStage} must equal media/${slug}.stages.json's stages.length=${stageCount}`);
        dirFail++;
      }

      const domain = parsed?.control?.domain;
      if (!Array.isArray(domain) || domain.length !== 2 || typeof domain[0] !== "number" || typeof domain[1] !== "number" || domain[0] >= domain[1]) {
        console.error(`  ✗ ${dir}: media/${file} control.domain must be [min, max] with min < max`);
        dirFail++;
      }

      const svgSrc = fs.readFileSync(path.join(mediaDir, `${slug}.svg`), "utf8");
      const bindings = Array.isArray(parsed?.bindings) ? parsed.bindings : [];
      for (const b of bindings) {
        const target = typeof b?.target === "string" ? b.target : null;
        const idMatch = target && target.match(/^#([a-zA-Z0-9_-]+)$/);
        if (!idMatch) {
          console.error(`  ✗ ${dir}: media/${file} binding target "${target}" is not a plain "#id" selector`);
          dirFail++;
          continue;
        }
        const idRe = new RegExp(`\\bid="${idMatch[1]}"`);
        if (!idRe.test(svgSrc)) {
          console.error(`  ✗ ${dir}: media/${file} binding target "${target}" resolves to no id="${idMatch[1]}" in media/${slug}.svg`);
          dirFail++;
        }
      }

      // Optional one-shot settle pulse (racines-unite pilot) — both fields
      // present together or both absent; settleTarget must resolve too.
      const hasSettleAt = parsed?.settleAt !== undefined;
      const hasSettleTarget = parsed?.settleTarget !== undefined;
      if (hasSettleAt !== hasSettleTarget) {
        console.error(`  ✗ ${dir}: media/${file} settleAt/settleTarget must both be present or both absent`);
        dirFail++;
      } else if (hasSettleTarget) {
        const settleMatch = typeof parsed.settleTarget === "string" ? parsed.settleTarget.match(/^#([a-zA-Z0-9_-]+)$/) : null;
        if (!settleMatch) {
          console.error(`  ✗ ${dir}: media/${file} settleTarget "${parsed.settleTarget}" is not a plain "#id" selector`);
          dirFail++;
        } else if (!new RegExp(`\\bid="${settleMatch[1]}"`).test(svgSrc)) {
          console.error(`  ✗ ${dir}: media/${file} settleTarget "${parsed.settleTarget}" resolves to no id="${settleMatch[1]}" in media/${slug}.svg`);
          dirFail++;
        }
      }

      // The math module — best-effort if the content lane commits ahead of
      // the code lane (warning only); a hard failure once it exists and is
      // missing a named recompute key (the binding pipeline for the final
      // merge).
      const tsPath = path.join(REPO, "web/src/lib/interactive-figures", `${slug}.ts`);
      if (!fs.existsSync(tsPath)) {
        console.error(`  ⚠ ${dir}: media/${file} has no web/src/lib/interactive-figures/${slug}.ts yet (content committed ahead of code)`);
      } else {
        const tsSrc = fs.readFileSync(tsPath, "utf8");
        const recomputeBlockMatch = tsSrc.match(/recompute:\s*\{([\s\S]*?)\n\s*\},/);
        const recomputeKeys = recomputeBlockMatch
          ? [...recomputeBlockMatch[1].matchAll(/^\s*([a-zA-Z0-9_]+)[,:]/gm)].map((m) => m[1])
          : [];
        for (const b of bindings) {
          if (typeof b?.recompute === "string" && !recomputeKeys.includes(b.recompute)) {
            console.error(`  ✗ ${dir}: media/${file} recompute "${b.recompute}" has no matching key in web/src/lib/interactive-figures/${slug}.ts`);
            dirFail++;
          }
        }
      }
      itxN++;
    }

    // An SVG with step-N groups but no sidecar is either awaiting migration
    // (Workflow fan-out, ledger §11 migration table) or one of the four
    // figures grouped BEFORE the sidecar mechanism existed (still driven by
    // NotionBody's STEPPED_FIGURE_MAX_STEPS occurrence allowlist).
    for (const file of svgFiles) {
      const slug = file.replace(/\.svg$/, "");
      if (stagedSlugs.has(slug)) continue; // already validated above
      const svgSrc = fs.readFileSync(path.join(mediaDir, file), "utf8");
      if (/\bid="step-/.test(svgSrc)) {
        const reason = LEGACY_STEP_SLUGS.has(slug) ? "(legacy occurrence mechanism)" : "(migration pending)";
        console.error(`  ⚠ ${dir}: media/${file} has step-N groups but no media/${slug}.stages.json sidecar ${reason}`);
      }
    }
  }

  // KaTeX — on prose with comments/fences/markers removed.
  const proseSrc = stripCommentsAndFences(proseLines.join("\n"));
  const { display, inline } = mathSpans(proseSrc);
  for (const [mode, exprs] of [["display", display], ["inline", inline]]) {
    for (const e of exprs) {
      try { katex.renderToString(e, { displayMode: mode === "display", throwOnError: true, strict: false }); }
      catch (err) { console.error(`  ✗ ${dir} [${mode}] "${e.slice(0, 60)}" → ${err.message.split("\n")[0]}`); dirFail++; }
    }
  }

  // La CLÔTURE d'un bloc $$…$$ multi-lignes doit être sur SA PROPRE LIGNE.
  //
  // Pourquoi cette porte existe (2026-09-04, cinq défauts vivants trouvés en
  // comparant deux rendus) : le contrôle KaTeX juste au-dessus extrait les
  // blocs avec `/\$\$([\s\S]*?)\$\$/` — permissif. `remark-math`, lui, ne
  // ferme un bloc de flux QUE sur une ligne ne contenant que `$$`. Quand la
  // fermeture est collée à la fin de la dernière ligne de formule, le moteur
  // continue de lire : il avale le paragraphe suivant et rend du LaTeX BRUT
  // EN ROUGE à l'élève. Le validateur disait « math ok » ; la page disait le
  // contraire.
  //
  // Cinq leçons en portaient un — equations-differentielles, geometrie-espace,
  // dipole-rl, ondes-mecaniques-progressives, rc-charge. Aucun n'était visible
  // dans la source : la formule y est parfaitement lisible.
  {
    // Sur le fichier BRUT : les numéros de ligne annoncés doivent être ceux
    // que l'auteur voit dans son éditeur, pas ceux d'un tableau filtré.
    const l = md.split("\n");
    for (let i = 0; i < l.length; i++) {
      if (!l[i].startsWith("$$")) continue;
      const seule = l[i].trim() === "$$";
      const complete = !seule && l[i].trimEnd().endsWith("$$") && l[i].trim().length > 3;
      if (complete) continue; // $$…$$ sur une seule ligne : forme valide
      // Bloc ouvrant : la fermeture doit être une ligne « $$ » seule.
      let j = i + 1;
      for (; j < l.length; j++) {
        if (l[j].trim() === "$$") break;
        if (l[j].trimEnd().endsWith("$$")) {
          console.error(
            `  ✗ ${dir}: bloc $$ ouvert ligne ${i + 1} et fermé ligne ${j + 1} EN FIN DE LIGNE — ` +
              `remark-math ne ferme que sur une ligne « $$ » seule ; le paragraphe suivant sera avalé et rendu en LaTeX brut`
          );
          dirFail++;
          break;
        }
      }
      i = j;
    }
  }

  // Authoring-leak check — prose only (comments stripped, valid markers already removed).
  const rendered = proseLines.join("\n").replace(/<!--[\s\S]*?-->/g, "");
  if (LEXICON.test(rendered) && !/[Àà] [Ss]ourcer|SLOT|AMÉLIORATION|TODO|FIXME/.test(rendered)) {
    // "à faire" etc. in ordinary prose is fine — only the authoring forms above are leaks.
  } else if (LEXICON.test(rendered)) {
    console.error(`  ✗ ${dir}: authoring lexicon in prose → ${(rendered.match(LEXICON) || [])[0]}`); dirFail++;
  }
  // A stray `[[` that ISN'T a resolved own-line marker (e.g. inline mid-paragraph) leaks as literal text.
  if (/\[\[/.test(rendered)) {
    console.error(`  ✗ ${dir}: stray "[[" in prose — a marker not alone on its own line renders as literal text`); dirFail++;
  }

  if (dirFail === 0) {
    const media = figN + motN + embN + stgN + itxN ? `, media ${figN}fig ${motN}mot ${embN}emb ${stgN}stg ${itxN}itx ok` : "";
    const yamlMath = yamlMathN ? `, yaml-math ${yamlMathN} ok` : "";
    console.log(`✓ ${dir} — math ${display.length}+${inline.length} ok, yaml ok${yamlMath}${media}`);
  }
  failures += dirFail;
}
// §11.97, second sens du ratchet : une dette payée doit être RETIRÉE de la liste.
for (const [d, rungs] of DETTE_BARREAU_FANTOME) {
  if (!dirs.includes(d)) continue;
  for (const r of rungs) {
    if (!fantomesVus.has(`${d}|${r}`)) {
      console.error(
        `  ✗ ${d}: la dette déclare un barreau fantôme ${r} qui n'existe plus — ` +
          `retire-le de DETTE_BARREAU_FANTOME dans ce fichier, sinon la liste devient un tapis`,
      );
      failures++;
    }
  }
}
console.log(`\n━━ validate-content: ${failures} failure(s) across ${dirs.length} dir(s) ━━`);
process.exit(failures ? 1 : 0);
