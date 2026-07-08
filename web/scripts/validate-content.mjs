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
 * A marker only resolves if it is ALONE on its own line (NotionBody's rule).
 *
 * Usage: node scripts/validate-content.mjs <content-dir> [<content-dir> …]
 *        (dirs relative to repo root, e.g. content/pc/dipole-rl)
 */
import katex from "katex";
import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dirs = process.argv.slice(2);
if (!dirs.length) { console.error("usage: node scripts/validate-content.mjs <dir>…"); process.exit(2); }

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

/** Collect every `id:` value anywhere in a parsed YAML tree. */
function collectIds(node, out) {
  if (Array.isArray(node)) { for (const v of node) collectIds(v, out); }
  else if (node && typeof node === "object") {
    if (typeof node.id === "string") out.add(node.id);
    for (const v of Object.values(node)) collectIds(v, out);
  }
  return out;
}

let failures = 0;
for (const dir of dirs) {
  const abs = path.join(REPO, dir);
  const mediaDir = path.join(abs, "media");
  const lesson = path.join(abs, "lesson.md");
  if (!fs.existsSync(lesson)) { console.error(`✗ ${dir}: no lesson.md`); failures++; continue; }
  const md = fs.readFileSync(lesson, "utf8");
  let dirFail = 0;
  let figN = 0, motN = 0, embN = 0, stgN = 0, itxN = 0;

  // Parse the YAML sidecars once (also used for marker id-resolution).
  const yamlIds = {}; // filename → Set of ids
  for (const y of ["items.yaml", "checkpoints.yaml", "exercises.yaml", "derivations.yaml"]) {
    const yp = path.join(abs, y);
    if (fs.existsSync(yp)) {
      const rawYaml = fs.readFileSync(yp, "utf8");
      try { yamlIds[y] = collectIds(yaml.load(rawYaml), new Set()); }
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

  // Walk lines: resolve own-line markers, keep the rest as prose.
  const proseLines = [];
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
    console.log(`✓ ${dir} — math ${display.length}+${inline.length} ok, yaml ok${media}`);
  }
  failures += dirFail;
}
console.log(`\n━━ validate-content: ${failures} failure(s) across ${dirs.length} dir(s) ━━`);
process.exit(failures ? 1 : 0);
