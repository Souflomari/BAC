/**
 * validate-content.mjs — catch render-breaking content before the owner sees it.
 * Loaders are fail-safe (bad YAML → section silently dropped; KaTeX strict:false
 * → red inline error, non-fatal; an unknown [[marker]] → silent null), so the
 * BUILD stays green even with broken content. This validator surfaces what the
 * build hides:
 *   - every $…$ / $$…$$ block parses under KaTeX (throwOnError)
 *   - items.yaml / checkpoints.yaml / exercises.yaml / derivations.yaml parse
 *   - MEDIA MARKERS resolve to a backing asset (the honest-state guard):
 *       [[figure:slug]]  → media/<slug>.svg           MUST exist (else renders nothing)
 *       [[motion:slug]]  → media/<slug>.motion.svg    MUST exist (+ warn if no .motion.json)
 *       [[embed:slug]]   → media/<slug>.json          optional (missing → honest "à venir" placeholder)
 *       [[checkpoint|exercise|derivation:id]] → id present in the matching YAML
 *       [[video:slug]]   → ALWAYS fails (dead marker: NotionBody hard-stubs it to null)
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
function katexFailures(str, rawDisplay) {
  if (typeof str !== "string" || !str.length) return { checked: 0, fails: [] };
  const fails = [];
  if (rawDisplay) {
    try { katex.renderToString(str, { displayMode: true, throwOnError: true, strict: false }); }
    catch (err) { fails.push({ mode: "display", expr: str, msg: err.message.split("\n")[0] }); }
    return { checked: 1, fails };
  }
  const { display, inline } = mathSpans(str);
  for (const e of display) {
    try { katex.renderToString(e, { displayMode: true, throwOnError: true, strict: false }); }
    catch (err) { fails.push({ mode: "display", expr: e, msg: err.message.split("\n")[0] }); }
  }
  for (const e of inline) {
    try { katex.renderToString(e, { displayMode: false, throwOnError: true, strict: false }); }
    catch (err) { fails.push({ mode: "inline", expr: e, msg: err.message.split("\n")[0] }); }
  }
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

  // Parse the YAML sidecars once (also used for marker id-resolution).
  const yamlIds = {}; // filename → Set of ids
  const yamlDocs = {}; // filename → parsed doc (absent if missing/parse-failed)
  for (const y of ["items.yaml", "checkpoints.yaml", "exercises.yaml", "derivations.yaml"]) {
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
      console.error(`  ⚠ ${dir}: [[video:${slug}]] is a DEAD marker (NotionBody hard-stubs it to null) — renders nothing; prefer removing it`);
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
    for (const line of md.split("\n")) {
      if (line === "### À toi" || line.startsWith("### À toi ")) legacyHits.add(line.trim());
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

  // ── Staged figures (LESSON-EXPERIENCE-SPEC §2.7) — a directory-level scan
  // of media/, independent of the [[figure:slug]] markers walked above (a
  // sidecar's contract with its SVG holds whether or not the lesson happens
  // to place that figure this revision).
  if (fs.existsSync(mediaDir)) {
    const mediaFiles = fs.readdirSync(mediaDir);
    const svgFiles = mediaFiles.filter((f) => f.endsWith(".svg") && !f.endsWith(".motion.svg"));
    const stagesFiles = mediaFiles.filter((f) => f.endsWith(".stages.json"));
    const stagedSlugs = new Set(stagesFiles.map((f) => f.replace(/\.stages\.json$/, "")));

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
