#!/usr/bin/env node
// gemini-vision.mjs — the Gemini first-pass lane for scan transcription drafts.
//
// Owner-sanctioned extension of the roster's Gemini lane (2026-08-07): Gemini
// drafts the VOLUME reading of exam scans; Claude keeps the JUDGMENT (a single
// Opus adversarial verify pass adjudicates every draft against the scan before
// any Statut moves past "transcrit (non vérifié)"). A Gemini draft is NEVER
// committed as vérifié on its own authority.
//
// Usage:
//   node scripts/gemini-vision.mjs --prompt-file p.txt img1.jpg [img2.jpg ...]
//   node scripts/gemini-vision.mjs --prompt "..." --model pro img.jpg
//
// Key comes from GEMINI_API_KEY (env only — same contract as .mcp.json).
// Models: flash (default) = gemini-flash-latest ; pro = gemini-pro-latest.

import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const images = [];
let prompt = null;
let model = "gemini-flash-latest";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--prompt") prompt = args[++i];
  else if (args[i] === "--prompt-file") prompt = readFileSync(args[++i], "utf8");
  else if (args[i] === "--model")
    model = { flash: "gemini-flash-latest", pro: "gemini-pro-latest" }[args[++i]] ?? args[i];
  else images.push(args[i]);
}
if (!prompt || images.length === 0) {
  console.error("usage: gemini-vision.mjs --prompt-file <f>|--prompt <s> [--model flash|pro] <img...>");
  process.exit(2);
}
const key = process.env.GEMINI_API_KEY;
if (!key) { console.error("GEMINI_API_KEY not set"); process.exit(2); }

const parts = images.map((p) => ({
  inline_data: { mime_type: "image/jpeg", data: readFileSync(p).toString("base64") },
}));
parts.push({ text: prompt });

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
  {
    method: "POST",
    headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 16384 },
    }),
  }
);
const body = await res.json();
if (!res.ok || !body.candidates?.length) {
  console.error(`gemini error (${res.status}): ${JSON.stringify(body).slice(0, 500)}`);
  process.exit(1);
}
process.stdout.write(body.candidates[0].content.parts.map((p) => p.text ?? "").join(""));
