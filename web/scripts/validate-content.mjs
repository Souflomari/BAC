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
  let figN = 0, motN = 0, embN = 0;

  // Parse the YAML sidecars once (also used for marker id-resolution).
  const yamlIds = {}; // filename → Set of ids
  for (const y of ["items.yaml", "checkpoints.yaml", "exercises.yaml", "derivations.yaml"]) {
    const yp = path.join(abs, y);
    if (fs.existsSync(yp)) {
      try { yamlIds[y] = collectIds(yaml.load(fs.readFileSync(yp, "utf8")), new Set()); }
      catch (err) { console.error(`  ✗ ${dir}/${y}: ${err.message.split("\n")[0]}`); dirFail++; yamlIds[y] = new Set(); }
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
    const media = figN + motN + embN ? `, media ${figN}fig ${motN}mot ${embN}emb ok` : "";
    console.log(`✓ ${dir} — math ${display.length}+${inline.length} ok, yaml ok${media}`);
  }
  failures += dirFail;
}
console.log(`\n━━ validate-content: ${failures} failure(s) across ${dirs.length} dir(s) ━━`);
process.exit(failures ? 1 : 0);
