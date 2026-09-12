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
    const headingRungs = new Set(
      (md.match(/^#{1,6}[ \t]*R(\d+)\b/gm) || []).map((h) => h.match(/R(\d+)/)[1]),
    );
    for (const [fname, key] of [["items.yaml", "items"], ["checkpoints.yaml", "checkpoints"]]) {
      const arr = Array.isArray(yamlDocs[fname]?.[key]) ? yamlDocs[fname][key] : [];
      const warned = new Set();
      for (const it of arr) {
        const mr = typeof it?.rung === "string" ? it.rung.match(/^R(\d+)$/) : null;
        if (mr && !headingRungs.has(mr[1]) && !warned.has(mr[1])) {
          warned.add(mr[1]);
          console.error(
            `  ⚠ ${dir}: ${fname} accroche des items au rung ${it.rung} mais lesson.md n'a pas de titre « ## ${it.rung} » — re-taguer ou ajouter le rung`,
          );
        }
      }
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
    const norm = (x) => x.normalize("NFD").toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "");
    const known = [...globalThis.__lessonTitles.values()].map(norm);
    const CUE = /(?:chapitres?\s+\d+\s+(?:de|du)|la\s+(?:leçon|notion)|leçon|notion)\s+«\s*([^»]{4,70}?)\s*»/g;
    for (const fname of ["lesson.md", "bank.yaml", "items.yaml", "exercises.yaml", "checkpoints.yaml"]) {
      const fp = path.join(abs, fname);
      if (!fs.existsSync(fp)) continue;
      const dead = new Set();
      for (const line of fs.readFileSync(fp, "utf8").split("\n")) {
        if (/^\s*#/.test(line)) continue; // note d'auteur en commentaire : non rendue
        CUE.lastIndex = 0;
        let m;
        while ((m = CUE.exec(line)) !== null) {
          const ref = norm(m[1]);
          if (!ref) continue;
          if (known.some((k) => k === ref || k.includes(ref) || ref.includes(k))) continue;
          dead.add(m[1]);
        }
      }
      if (dead.size) {
        console.error(
          `  ⚠ ${dir}: ${fname} — renvoi vers une leçon INEXISTANTE : ${[...dead].slice(0, 3).map((t) => `« ${t} »`).join(" ; ")}${dead.size > 3 ? " …" : ""} — aucun titre du corpus ne correspond ; corriger le titre cité`,
        );
      }
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
console.log(`\n━━ validate-content: ${failures} failure(s) across ${dirs.length} dir(s) ━━`);
process.exit(failures ? 1 : 0);
