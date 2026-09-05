/**
 * test-attempt-events.mjs — unit tests for the attempt-event write path's
 * client half: the pure payload builders (`src/lib/events/payload.ts`) and
 * the emitter's wire behavior (`src/lib/events/emitter.ts`).
 *
 * Loaded straight from TypeScript via `jiti` (same pattern as
 * test-learner-model.mjs). The emitter is loaded through a CACHE-DISABLED
 * jiti instance per test so each test gets a fresh module (fresh
 * `tokenGetter` + retry-queue state) under its own
 * `NEXT_PUBLIC_AUTH_MODE` / `NEXT_PUBLIC_SUPABASE_URL` env — the emitter
 * reads env at call time under Node (Next inlines it at build time; the
 * semantics tested here are the same).
 *
 * What the wire-shape tests assert is deliberately the EDGE VALIDATOR's
 * own rules (record-notion-event/index.ts validateBody): action/kind
 * enums, ≤200-char ids, int-or-null indices, bool-or-null correctness,
 * string-array targets — so a payload that passes here is one the edge
 * function will accept, and a drift in either side breaks this file.
 *
 * Run from `web/`:
 *   node --test scripts/test-attempt-events.mjs
 * (wired as `npm run test-attempt-events`)
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import jitiFactory from "jiti";

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jiti = jitiFactory(fileURLToPath(import.meta.url), { interopDefault: true });

const { itemTargets, answerPayload, exerciseRevealPayload } = jiti(
  path.join(WEB, "src/lib/events/payload.ts")
);

/** Fresh, cache-free emitter module (own tokenGetter/retry state). */
function loadFreshEmitter() {
  const freshJiti = jitiFactory(fileURLToPath(import.meta.url), {
    interopDefault: true,
    requireCache: false,
  });
  return freshJiti(path.join(WEB, "src/lib/events/emitter.ts"));
}

/** Await the emitter's async token resolution + fire-and-forget dispatch. */
async function flushAsync() {
  for (let i = 0; i < 5; i++) await new Promise((r) => setTimeout(r, 0));
}

// ── Edge-validator replica (record-notion-event/index.ts validateBody) ────
// Kept as literal rule checks, not an import — the edge function is Deno
// code. If its rules change, update BOTH there and here (this comment is
// the tripwire).
const ANSWER_KINDS = new Set(["item", "checkpoint", "exercise_reveal"]);
function assertEdgeValidatorAccepts(body) {
  assert.ok(body && typeof body === "object", "body is an object");
  assert.ok(["answer", "visit"].includes(body.action), "known action");
  assert.ok(
    typeof body.notion_id === "string" && body.notion_id.length > 0 && body.notion_id.length <= 200,
    "notion_id: non-empty string ≤200"
  );
  if (body.action === "visit") {
    assert.ok(Number.isInteger(body.chapter_index) && body.chapter_index >= 0, "visit chapter_index");
    assert.ok(Number.isInteger(body.chapters_total) && body.chapters_total >= 0, "visit chapters_total");
    return;
  }
  assert.ok(
    typeof body.item_id === "string" && body.item_id.length > 0 && body.item_id.length <= 200,
    "item_id: non-empty string ≤200"
  );
  assert.ok(ANSWER_KINDS.has(body.kind), "known kind");
  assert.ok(body.choice_index === null || Number.isInteger(body.choice_index), "choice_index int|null");
  assert.ok(body.is_correct === null || typeof body.is_correct === "boolean", "is_correct bool|null");
  assert.ok(
    body.misconception_id === null ||
      (typeof body.misconception_id === "string" && body.misconception_id.length <= 200),
    "misconception_id string|null ≤200"
  );
  assert.ok(body.chapter_index === null || Number.isInteger(body.chapter_index), "chapter_index int|null");
  assert.ok(
    Array.isArray(body.item_misconceptions) &&
      body.item_misconceptions.every((s) => typeof s === "string" && s.length <= 200),
    "item_misconceptions string[]"
  );
}

// ── Fixtures ──────────────────────────────────────────────────────────────

/** Authored choices, items.yaml order: B is correct; A and C carry tags
 *  (C duplicates A's tag — targets must dedupe); D untagged wrong. */
const AUTHORED = [
  { id: "A", correct: false, misconception: "mc.x.beta" },
  { id: "B", correct: true, misconception: null },
  { id: "C", correct: false, misconception: "mc.x.alpha" },
  { id: "D", correct: false },
  { id: "E", correct: false, misconception: "mc.x.beta" },
];

// ── itemTargets: exactly build-learner-inputs.mjs's definition ────────────

test("itemTargets — non-null choice tags, deduplicated, sorted", () => {
  assert.deepEqual(itemTargets(AUTHORED), ["mc.x.alpha", "mc.x.beta"]);
});

test("itemTargets — untagged/empty/missing choices give []", () => {
  assert.deepEqual(itemTargets([{ id: "A", correct: true }]), []);
  assert.deepEqual(itemTargets([]), []);
  assert.deepEqual(itemTargets(undefined), []);
  assert.deepEqual(itemTargets(null), []);
  // Empty-string tags are NOT targets (generator: `m.length > 0`).
  assert.deepEqual(itemTargets([{ id: "A", misconception: "" }]), []);
});

// Le corpus écrit AUSSI `misconception: [a, b]` — un distracteur peut
// exhiber deux erreurs nommées à la fois (pc/systemes-oscillants SO-35/D).
// Cette forme a été muette de 2026-07 au 2026-09-05 : `typeof === "string"`
// la rejetait des DEUX côtés (générateur et client), si bien que
// M-OSC-RES-3 stagnait à 2 items dans la carte des planchers alors que le
// décompte écrit à la main dans items.yaml annonçait 4 et « floor_met: true ».
test("itemTargets — la forme LISTE compte, et se déduplique avec la forme chaîne", () => {
  assert.deepEqual(
    itemTargets([
      { id: "A", correct: false, misconception: ["mc.x.beta", "mc.x.alpha"] },
      { id: "B", correct: true },
      { id: "C", correct: false, misconception: "mc.x.alpha" },
    ]),
    ["mc.x.alpha", "mc.x.beta"]
  );
  // Entrées non conformes ignorées, jamais fatales.
  assert.deepEqual(itemTargets([{ id: "A", misconception: ["", null, 3] }]), []);
});

test("answerPayload — un choix à tags multiples rapporte le PREMIER, jamais null", () => {
  const p = answerPayload({
    notionId: "pc/systemes-oscillants",
    itemId: "SO-35",
    kind: "item",
    authoredChoices: [
      { id: "A", correct: false, misconception: "M-OSC-RES-2" },
      { id: "B", correct: true },
      { id: "D", correct: false, misconception: ["M-OSC-RES-3", "M-OSC-RES-2"] },
    ],
    chosenChoiceId: "D",
    chapterIndex: 0,
  });
  assert.equal(p.misconception_id, "M-OSC-RES-3", "le premier tag écrit fait foi");
  assert.deepEqual(p.item_misconceptions, ["M-OSC-RES-2", "M-OSC-RES-3"]);
});

// ── answerPayload: authored index, correctness, tag routing ──────────────

test("answerPayload — wrong choice: authored index, tag carried, targets full", () => {
  const p = answerPayload({
    notionId: "pc/rc-charge",
    itemId: "RC-3",
    kind: "item",
    authoredChoices: AUTHORED,
    chosenChoiceId: "C",
    chapterIndex: 2,
  });
  assert.deepEqual(p, {
    notion_id: "pc/rc-charge",
    item_id: "RC-3",
    kind: "item",
    choice_index: 2, // authored position of C — independent of display shuffle
    is_correct: false,
    misconception_id: "mc.x.alpha",
    chapter_index: 2,
    item_misconceptions: ["mc.x.alpha", "mc.x.beta"],
  });
  assertEdgeValidatorAccepts({ action: "answer", ...p });
});

test("answerPayload — correct choice: is_correct true, no tag, targets still present (clearing candidates)", () => {
  const p = answerPayload({
    notionId: "maths/suites-numeriques",
    itemId: "SN-1",
    kind: "checkpoint",
    authoredChoices: AUTHORED,
    chosenChoiceId: "B",
    chapterIndex: 0,
  });
  assert.equal(p.choice_index, 1);
  assert.equal(p.is_correct, true);
  assert.equal(p.misconception_id, null);
  assert.deepEqual(p.item_misconceptions, ["mc.x.alpha", "mc.x.beta"]);
  assertEdgeValidatorAccepts({ action: "answer", ...p });
});

test("answerPayload — untagged wrong choice: is_correct false, misconception null", () => {
  const p = answerPayload({
    notionId: "svt/soi-non-soi",
    itemId: "SNS-2",
    kind: "item",
    authoredChoices: AUTHORED,
    chosenChoiceId: "D",
    chapterIndex: null,
  });
  assert.equal(p.is_correct, false);
  assert.equal(p.misconception_id, null);
  assert.equal(p.chapter_index, null);
  assertEdgeValidatorAccepts({ action: "answer", ...p });
});

test("answerPayload — unknown choice id: returns null (never fabricates)", () => {
  const p = answerPayload({
    notionId: "pc/rc-charge",
    itemId: "RC-3",
    kind: "item",
    authoredChoices: AUTHORED,
    chosenChoiceId: "Z",
    chapterIndex: 1,
  });
  assert.equal(p, null);
});

test("answerPayload — authored order is the frame even when display is shuffled", () => {
  // Simulate the component situation: the DISPLAY array is a reordered
  // copy (what shuffledChoices produces); the payload must still index
  // into the AUTHORED array.
  const displayOrder = [AUTHORED[3], AUTHORED[0], AUTHORED[4], AUTHORED[1], AUTHORED[2]];
  // Student clicks the display's first option (id "D") —
  const chosen = displayOrder[0];
  const p = answerPayload({
    notionId: "pc/rlc-serie",
    itemId: "RLC-R0-1",
    kind: "item",
    authoredChoices: AUTHORED, // authored, NOT displayOrder
    chosenChoiceId: chosen.id,
    chapterIndex: 0,
  });
  assert.equal(p.choice_index, 3); // D's authored position
});

// ── exerciseRevealPayload ────────────────────────────────────────────────

test("exerciseRevealPayload — composite id, nulls, empty targets", () => {
  const p = exerciseRevealPayload({
    notionId: "pc/rc-charge",
    exerciseId: "r-bac",
    questionId: "q3",
    chapterIndex: 4,
  });
  assert.deepEqual(p, {
    notion_id: "pc/rc-charge",
    item_id: "r-bac:q3",
    kind: "exercise_reveal",
    choice_index: null,
    is_correct: null,
    misconception_id: null,
    chapter_index: 4,
    item_misconceptions: [],
  });
  assertEdgeValidatorAccepts({ action: "answer", ...p });
});

// ── Emitter wire behavior ────────────────────────────────────────────────

test("emitter — live mode + token: one POST, right URL, bearer header, exact body", async () => {
  const prevMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_AUTH_MODE = "live";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";

    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return { ok: true };
    };

    const emitter = loadFreshEmitter();
    emitter.configureEmitter({ getAccessToken: () => "jwt-token-123" });

    const payload = answerPayload({
      notionId: "pc/rc-charge",
      itemId: "RC-3",
      kind: "item",
      authoredChoices: AUTHORED,
      chosenChoiceId: "A",
      chapterIndex: 1,
    });
    emitter.recordAnswerEvent(payload);
    await flushAsync();

    assert.equal(calls.length, 1, "exactly one send");
    assert.equal(
      calls[0].url,
      "https://example-project.supabase.co/functions/v1/record-notion-event"
    );
    assert.equal(calls[0].init.method, "POST");
    assert.equal(calls[0].init.headers.Authorization, "Bearer jwt-token-123");
    assert.equal(calls[0].init.keepalive, true, "fire-and-forget keepalive");

    const body = JSON.parse(calls[0].init.body);
    assert.equal(body.action, "answer");
    assert.equal(body.item_id, "RC-3");
    assert.equal(body.choice_index, 0);
    assert.equal(body.is_correct, false);
    assert.equal(body.misconception_id, "mc.x.beta");
    assertEdgeValidatorAccepts(body);
  } finally {
    process.env.NEXT_PUBLIC_AUTH_MODE = prevMode;
    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    globalThis.fetch = prevFetch;
  }
});

test("emitter — chapter visit: action 'visit' wire shape", async () => {
  const prevMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_AUTH_MODE = "live";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";

    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return { ok: true };
    };

    const emitter = loadFreshEmitter();
    emitter.configureEmitter({ getAccessToken: async () => "jwt-token-456" });
    emitter.recordChapterVisit({
      notion_id: "maths/limites-continuite",
      chapter_index: 3,
      chapters_total: 8,
    });
    await flushAsync();

    assert.equal(calls.length, 1);
    const body = JSON.parse(calls[0].init.body);
    assert.deepEqual(body, {
      action: "visit",
      notion_id: "maths/limites-continuite",
      chapter_index: 3,
      chapters_total: 8,
    });
    assertEdgeValidatorAccepts(body);
  } finally {
    process.env.NEXT_PUBLIC_AUTH_MODE = prevMode;
    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    globalThis.fetch = prevFetch;
  }
});

test("emitter — off mode (default build): zero network traffic", async () => {
  const prevMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevFetch = globalThis.fetch;
  try {
    delete process.env.NEXT_PUBLIC_AUTH_MODE; // absent → resolveMode "off"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";

    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return { ok: true };
    };

    const emitter = loadFreshEmitter();
    // Even fully configured with a valid token — off mode must stay silent.
    emitter.configureEmitter({ getAccessToken: () => "jwt-token-789" });
    emitter.recordAnswerEvent(
      exerciseRevealPayload({
        notionId: "pc/rc-charge",
        exerciseId: "r-bac",
        questionId: "q1",
        chapterIndex: 0,
      })
    );
    emitter.recordChapterVisit({ notion_id: "pc/rc-charge", chapter_index: 0, chapters_total: 5 });
    await flushAsync();

    assert.equal(calls.length, 0, "off mode: emitter is a hard no-op");
  } finally {
    if (prevMode !== undefined) process.env.NEXT_PUBLIC_AUTH_MODE = prevMode;
    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    globalThis.fetch = prevFetch;
  }
});

test("emitter — live mode but no session token: zero network traffic", async () => {
  const prevMode = process.env.NEXT_PUBLIC_AUTH_MODE;
  const prevUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const prevFetch = globalThis.fetch;
  try {
    process.env.NEXT_PUBLIC_AUTH_MODE = "live";
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example-project.supabase.co";

    const calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return { ok: true };
    };

    const emitter = loadFreshEmitter();
    emitter.configureEmitter({ getAccessToken: () => null }); // signed out
    emitter.recordChapterVisit({ notion_id: "pc/piles", chapter_index: 1, chapters_total: 4 });
    await flushAsync();

    assert.equal(calls.length, 0, "no token → no send");
  } finally {
    process.env.NEXT_PUBLIC_AUTH_MODE = prevMode;
    process.env.NEXT_PUBLIC_SUPABASE_URL = prevUrl;
    globalThis.fetch = prevFetch;
  }
});
