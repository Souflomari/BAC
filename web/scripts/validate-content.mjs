/**
 * validate-content.mjs — Day-9.5: catch render-breaking content before the
 * owner sees it. Loaders are fail-safe (bad YAML → section silently dropped;
 * KaTeX strict:false → red inline error, non-fatal), so the BUILD stays green
 * even with broken content. This validator surfaces what the build hides:
 *   - every $…$ / $$…$$ block parses under KaTeX (throwOnError)
 *   - items.yaml / checkpoints.yaml / exercises.yaml parse as YAML
 *   - no authoring lexicon leaks in rendered prose (comments are stripped)
 *
 * Usage: node scripts/validate-content.mjs <content-dir> [<content-dir> …]
 *        (dirs relative to repo root, e.g. content/maths/limites-continuite)
 */
import katex from "katex";
import yaml from "js-yaml";
import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(path.dirname(new URL(import.meta.url).pathname), "../..");
const dirs = process.argv.slice(2);
if (!dirs.length) { console.error("usage: node scripts/validate-content.mjs <dir>…"); process.exit(2); }

// Strip HTML comments + fenced code, then pull math spans.
function mathSpans(md) {
  const noComments = md.replace(/<!--[\s\S]*?-->/g, "");
  const display = [...noComments.matchAll(/\$\$([\s\S]*?)\$\$/g)].map((m) => m[1]);
  const stripped = noComments.replace(/\$\$[\s\S]*?\$\$/g, "");
  const inline = [...stripped.matchAll(/\$([^\n$]+?)\$/g)].map((m) => m[1]);
  return { display, inline };
}

const LEXICON = /TODO|FIXME|SLOT D|AMÉLIORATION|[Àà] [Ss]ourcer|À FAIRE|asset-pending|<!--\s*SLOT|\[\[(figure|motion|embed|video):/;

let failures = 0;
for (const dir of dirs) {
  const abs = path.join(REPO, dir);
  const lesson = path.join(abs, "lesson.md");
  if (!fs.existsSync(lesson)) { console.error(`✗ ${dir}: no lesson.md`); failures++; continue; }
  const md = fs.readFileSync(lesson, "utf8");
  const { display, inline } = mathSpans(md);
  let dirFail = 0;
  for (const [mode, exprs] of [["display", display], ["inline", inline]]) {
    for (const e of exprs) {
      try { katex.renderToString(e, { displayMode: mode === "display", throwOnError: true, strict: false }); }
      catch (err) { console.error(`  ✗ ${dir} [${mode}] "${e.slice(0, 60)}" → ${err.message.split("\n")[0]}`); dirFail++; }
    }
  }
  // Lexicon (rendered prose only — comments already stripped inside mathSpans' source is not reused, so strip here)
  const rendered = md.replace(/<!--[\s\S]*?-->/g, "");
  const lex = rendered.match(LEXICON);
  if (lex && !/continue à faire|reste .*à faire|il .*à faire/i.test(rendered)) {
    // "à faire" in ordinary French is fine; only flag the authoring forms.
    if (!/[Àà] [Ss]ourcer|SLOT|AMÉLIORATION|TODO|FIXME|\[\[/.test(rendered)) {
      // no real authoring leak
    } else {
      console.error(`  ✗ ${dir}: authoring lexicon in prose → ${lex[0]}`); dirFail++;
    }
  }
  // YAML files
  for (const y of ["items.yaml", "checkpoints.yaml", "exercises.yaml"]) {
    const yp = path.join(abs, y);
    if (fs.existsSync(yp)) {
      try { yaml.load(fs.readFileSync(yp, "utf8")); }
      catch (err) { console.error(`  ✗ ${dir}/${y}: ${err.message.split("\n")[0]}`); dirFail++; }
    }
  }
  if (dirFail === 0) console.log(`✓ ${dir} — math ${display.length}+${inline.length} ok, yaml ok`);
  failures += dirFail;
}
console.log(`\n━━ validate-content: ${failures} failure(s) across ${dirs.length} dir(s) ━━`);
process.exit(failures ? 1 : 0);
