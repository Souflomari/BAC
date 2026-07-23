/**
 * scripts/build-learner-inputs.mjs
 *
 * Walks content/<subject>/<slug>/{items.yaml,checkpoints.yaml} and emits TWO
 * generated artifacts consumed by the attempt-event pipeline
 * (LEARNER-MODEL-SPEC.md, draft-048/049 migrations):
 *
 *   1. backend/supabase/functions/record-notion-event/item-misconceptions.json
 *      { "<notion_id>": { "<item_id>": ["mc...", ...] } }
 *      An item's targets = the set of non-null `misconception` values found
 *      on its choices. Both items.yaml AND checkpoints.yaml contribute (a
 *      notion's item ids are disjoint between the two files — checkpoints
 *      use their own `cp-*` id family). Consumed by the record-notion-event
 *      edge function's clearing check (§3): it has no other way to learn
 *      what an item's target misconceptions are, since the journal
 *      (user_answer_events) does not store per-event targets.
 *
 *   2. web/src/lib/learner-model-data.json
 *      { "<notion_id>": { "<misconception_id>": <item_count> } }
 *      item_count = number of items.yaml items (END-BANK ONLY — checkpoints
 *      are explicitly NOT counted toward the coverage floor; see
 *      checkpoints.yaml's own "no double-counting" note and
 *      LEARNER-MODEL-SPEC §0.2: "lisible dans items.yaml") whose choices
 *      target that misconception. The read layer's floor_met = count >= 3.
 *
 * Deterministic output: object keys sorted, id arrays sorted — safe to diff
 * in review and safe to regenerate byte-for-byte from unchanged content.
 *
 * REGENERATE WHENEVER items.yaml or checkpoints.yaml CHANGE. This script is
 * not run automatically by `next dev`/`next build` — the orchestrator runs
 * it as a content-pipeline step, same cadence as validate-content.mjs.
 *
 * Usage: node scripts/build-learner-inputs.mjs   (run from web/, no args)
 */
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const WEB_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const REPO_ROOT = path.resolve(WEB_DIR, "..");
const CONTENT_ROOT = path.join(REPO_ROOT, "content");

const ITEM_MISCONCEPTIONS_OUT = path.join(
  REPO_ROOT,
  "backend/supabase/functions/record-notion-event/item-misconceptions.json"
);
const LEARNER_MODEL_DATA_OUT = path.join(WEB_DIR, "src/lib/learner-model-data.json");

/** Parses a YAML file if present; returns null on missing/malformed (never throws). */
function safeLoadYaml(filePath) {
  if (!fs.existsSync(filePath)) return null;
  try {
    return yaml.load(fs.readFileSync(filePath, "utf8"));
  } catch (err) {
    console.error(
      `build-learner-inputs: ${filePath} — malformed YAML (${err.message.split("\n")[0]}) — skipped`
    );
    return null;
  }
}

/**
 * { itemId -> Set<misconceptionId> } from a list of item-shaped objects
 * (items.yaml's `items[]` or checkpoints.yaml's `checkpoints[]` — same
 * choice shape). An item's targets = the non-null `misconception` value on
 * each of its choices (the `also_reveals` field is deliberately NOT
 * consulted here — targets are the direct choice-level tag only).
 */
function targetsFromItems(items) {
  const out = new Map();
  if (!Array.isArray(items)) return out;
  for (const item of items) {
    if (!item || typeof item.id !== "string") continue;
    const targets = new Set();
    const choices = Array.isArray(item.choices) ? item.choices : [];
    for (const choice of choices) {
      const m = choice && choice.misconception;
      if (typeof m === "string" && m.length > 0) targets.add(m);
    }
    out.set(item.id, targets);
  }
  return out;
}

/** Returns a shallow copy of obj with keys sorted lexicographically. */
function sortedObject(obj) {
  const out = {};
  for (const key of Object.keys(obj).sort()) out[key] = obj[key];
  return out;
}

function listSubdirs(dir) {
  return fs
    .readdirSync(dir)
    .filter((name) => !name.startsWith("_") && !name.startsWith("."))
    .filter((name) => fs.statSync(path.join(dir, name)).isDirectory());
}

if (!fs.existsSync(CONTENT_ROOT)) {
  console.error(`build-learner-inputs: no content/ dir at ${CONTENT_ROOT}`);
  process.exit(1);
}

const itemMisconceptions = {}; // notion_id -> { item_id -> [mc...] }
const learnerModelData = {}; // notion_id -> { mc_id -> item_count }

for (const subject of listSubdirs(CONTENT_ROOT).sort()) {
  const subjectDir = path.join(CONTENT_ROOT, subject);

  for (const slug of listSubdirs(subjectDir).sort()) {
    const notionDir = path.join(subjectDir, slug);
    const notionId = `${subject}/${slug}`;

    const itemsRaw = safeLoadYaml(path.join(notionDir, "items.yaml"));
    const checkpointsRaw = safeLoadYaml(path.join(notionDir, "checkpoints.yaml"));

    const itemsList = itemsRaw && Array.isArray(itemsRaw.items) ? itemsRaw.items : [];
    const checkpointsList =
      checkpointsRaw && Array.isArray(checkpointsRaw.checkpoints) ? checkpointsRaw.checkpoints : [];

    if (itemsList.length === 0 && checkpointsList.length === 0) continue;

    const itemTargets = targetsFromItems(itemsList);
    const checkpointTargets = targetsFromItems(checkpointsList);

    // ── artifact 1: item-misconceptions.json (items.yaml + checkpoints.yaml) ──
    const perNotionItemMap = {};
    for (const [itemId, targets] of itemTargets) {
      perNotionItemMap[itemId] = [...targets].sort();
    }
    for (const [itemId, targets] of checkpointTargets) {
      if (Object.prototype.hasOwnProperty.call(perNotionItemMap, itemId)) {
        console.error(
          `build-learner-inputs: ${notionId} — id "${itemId}" collides between items.yaml and checkpoints.yaml — checkpoints entry skipped`
        );
        continue;
      }
      perNotionItemMap[itemId] = [...targets].sort();
    }
    if (Object.keys(perNotionItemMap).length > 0) {
      itemMisconceptions[notionId] = sortedObject(perNotionItemMap);
    }

    // ── artifact 2: learner-model-data.json (END-BANK items.yaml ONLY) ──
    const counts = {};
    // Seed every declared misconception at 0 so a floor-unmet id is still
    // present (an honest "0 items so far", not silent absence).
    const declared = Array.isArray(itemsRaw && itemsRaw.misconceptions) ? itemsRaw.misconceptions : [];
    for (const entry of declared) {
      if (entry && typeof entry.id === "string") counts[entry.id] = 0;
    }
    for (const targets of itemTargets.values()) {
      for (const m of targets) counts[m] = (counts[m] ?? 0) + 1;
    }
    if (Object.keys(counts).length > 0) {
      learnerModelData[notionId] = sortedObject(counts);
    }
  }
}

const sortedItemMisconceptions = sortedObject(itemMisconceptions);
const sortedLearnerModelData = sortedObject(learnerModelData);

fs.mkdirSync(path.dirname(ITEM_MISCONCEPTIONS_OUT), { recursive: true });
fs.writeFileSync(ITEM_MISCONCEPTIONS_OUT, JSON.stringify(sortedItemMisconceptions, null, 2) + "\n");
fs.writeFileSync(LEARNER_MODEL_DATA_OUT, JSON.stringify(sortedLearnerModelData, null, 2) + "\n");

// ── artifact 3: item-misconceptions.ts — the RUNTIME carrier for the edge
// function. The Sitting-2 staging e2e (2026-07-23) proved that a standalone
// .json static file does NOT survive edge-function bundling (the eszip only
// includes the module graph), which silently disabled the clearing check.
// An imported .ts module is always part of the module graph, so the map can
// never be dropped again. The .json above stays as the human-reviewable /
// diffable artifact; BOTH are emitted by this same run, so they cannot drift.
const ITEM_MISCONCEPTIONS_TS_OUT = ITEM_MISCONCEPTIONS_OUT.replace(/\.json$/, ".ts");
fs.writeFileSync(
  ITEM_MISCONCEPTIONS_TS_OUT,
  "// GENERATED by web/scripts/build-learner-inputs.mjs — DO NOT EDIT.\n" +
    "// Same data as item-misconceptions.json; this module form exists so the\n" +
    "// edge-function bundler always ships it (see the generator's comment).\n" +
    "const itemMisconceptions: Record<string, Record<string, string[]>> =\n" +
    JSON.stringify(sortedItemMisconceptions, null, 2) +
    ";\n\nexport default itemMisconceptions;\n"
);

console.log(`build-learner-inputs: wrote ${path.relative(REPO_ROOT, ITEM_MISCONCEPTIONS_OUT)}`);
console.log(`build-learner-inputs: wrote ${path.relative(REPO_ROOT, ITEM_MISCONCEPTIONS_TS_OUT)}`);
console.log(`build-learner-inputs: wrote ${path.relative(REPO_ROOT, LEARNER_MODEL_DATA_OUT)}`);
console.log(
  `build-learner-inputs: ${Object.keys(sortedItemMisconceptions).length} notion(s) with items, ` +
    `${Object.keys(sortedLearnerModelData).length} notion(s) with misconception coverage`
);
