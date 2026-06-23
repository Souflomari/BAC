/**
 * lib/content.ts
 *
 * File-based content loader for notion files.
 *
 * Content lives at: <repo-root>/content/<subject>/<notion-slug>/
 *   lesson.md      — lesson prose (markdown + KaTeX delimiters)
 *   items.yaml     — MCQ items + misconceptions map
 *   media/*.svg    — structural/labelled SVG diagrams
 *   embed.json     — optional embed descriptor (GeoGebra, Desmos, PhET, …)
 *
 * All reads use `fs` against the filesystem; nothing fetches from Supabase.
 * The content/ dir is a sibling of web/, so paths resolve via process.cwd()
 * which Next.js sets to the project root (web/).
 *
 * Tolerates missing pieces: a notion may have a lesson but no items, no
 * media, no embed — callers receive null/empty for absent pieces.
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// ── Path helpers ──────────────────────────────────────────────────────────────

/**
 * Absolute path to the repo-root content/ directory.
 * process.cwd() inside Next.js is the web/ directory, so we go one level up.
 */
function contentRoot(): string {
  return path.join(process.cwd(), "..", "content");
}

/**
 * Absolute path to a specific notion directory.
 */
function notionDir(subject: string, slug: string): string {
  return path.join(contentRoot(), subject, slug);
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NotionMeta {
  /** Unique ID: "<subject>/<slug>", e.g. "maths/probabilites-conditionnelles" */
  id: string;
  subject: string;
  slug: string;
  /** Display title — extracted from the first H1 of lesson.md, or the slug. */
  title: string;
}

export interface NotionChoice {
  id: string;
  text: string;
  correct: boolean;
  misconception?: string | null;
  feedback?: string;
}

export interface NotionItem {
  id: string;
  rung?: string;
  difficulty_level?: number;
  skill_code?: string;
  tags?: string[];
  stem: string;
  type: "mcq" | string;
  choices?: NotionChoice[];
  solution?: string;
}

export interface MisconceptionEntry {
  id: string;
  label: string;
  description: string;
  contradicts_principle: string;
}

export interface NotionItems {
  notion: string;
  skill_code?: string;
  misconceptions: MisconceptionEntry[];
  items: NotionItem[];
}

export interface EmbedDescriptor {
  /** The kind of embed: "geogebra" | "desmos" | "falstad" | "phet" | "custom" */
  type: string;
  /** The URL to embed in an <iframe> (the full ?ctz= share URL for Falstad) */
  url: string;
  /** Accessible title for the iframe */
  title?: string;
  /** Suggested aspect ratio as a fraction, e.g. 0.5625 for 16:9 */
  aspectRatio?: number;
  /** Base URL without query string (Falstad: url_base) */
  urlBase?: string;
  /** French caption displayed below the embed */
  caption?: string;
  /** Raw netlist text — circuit_import_text fallback if URL fails */
  circuitImportText?: string;
}

export interface NotionContent {
  meta: NotionMeta;
  /** Raw lesson markdown — pass to react-markdown with remark-math + rehype-katex */
  lessonMd: string | null;
  /** Parsed items.yaml */
  itemsData: NotionItems | null;
  /** Map of filename → raw SVG string for media/*.svg */
  mediaSvgs: Record<string, string>;
  /**
   * Map of slug → EmbedDescriptor for every media/*.json file.
   * Key is the basename without extension, e.g. "rlc-sandbox".
   * Used by the inline [[embed:slug]] markers.
   */
  mediaEmbeds: Record<string, EmbedDescriptor>;
  /**
   * Parsed embed.json at the notion root, or null if absent.
   * Legacy field — prefer mediaEmbeds for inline markers.
   */
  embed: EmbedDescriptor | null;
}

// ── Safe filesystem helpers ───────────────────────────────────────────────────

function safeReadFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return null;
  }
}

function safeReadDir(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}

function dirExists(dirPath: string): boolean {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

// ── Title extraction ──────────────────────────────────────────────────────────

/**
 * Extract the first H1 heading from lesson markdown as the display title.
 * Falls back to the slug if no H1 is found.
 */
function extractTitle(lessonMd: string | null, slug: string): string {
  if (!lessonMd) return slug;
  const match = lessonMd.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : slug;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * List all available notions by scanning the content/ directory.
 *
 * Returns an empty array (never throws) when:
 * - content/ does not exist
 * - content/ is empty
 * - no subdirectory contains a readable lesson.md or items.yaml
 *
 * A notion is considered present if its directory exists, regardless of
 * which files it contains — the individual loaders handle missing pieces.
 */
export function listNotions(): NotionMeta[] {
  const root = contentRoot();
  if (!dirExists(root)) return [];

  const results: NotionMeta[] = [];

  const subjects = safeReadDir(root).filter(
    (name) => !name.startsWith("_") && !name.startsWith(".")
  );

  for (const subject of subjects) {
    const subjectPath = path.join(root, subject);
    if (!dirExists(subjectPath)) continue;

    const slugs = safeReadDir(subjectPath).filter(
      (name) => !name.startsWith("_") && !name.startsWith(".")
    );

    for (const slug of slugs) {
      const dir = path.join(subjectPath, slug);
      if (!dirExists(dir)) continue;

      const lessonMd = safeReadFile(path.join(dir, "lesson.md"));
      const title = extractTitle(lessonMd, slug);

      results.push({
        id: `${subject}/${slug}`,
        subject,
        slug,
        title,
      });
    }
  }

  return results;
}

/**
 * Load the full content for a single notion by its id ("subject/slug").
 *
 * Returns null if the notion directory does not exist at all.
 * Returns a NotionContent with null/empty fields for any missing pieces —
 * never throws on absent files.
 */
export function loadNotion(id: string): NotionContent | null {
  const parts = id.split("/");
  if (parts.length !== 2) return null;
  const [subject, slug] = parts;

  const dir = notionDir(subject, slug);
  if (!dirExists(dir)) return null;

  // ── lesson.md ──
  const lessonMd = safeReadFile(path.join(dir, "lesson.md"));

  // ── items.yaml ──
  let itemsData: NotionItems | null = null;
  const itemsRaw = safeReadFile(path.join(dir, "items.yaml"));
  if (itemsRaw) {
    try {
      const parsed = yaml.load(itemsRaw);
      if (parsed && typeof parsed === "object") {
        itemsData = parsed as NotionItems;
      }
    } catch {
      // Malformed YAML — treat as absent, never crash the page
      itemsData = null;
    }
  }

  // ── media/*.svg and media/*.json ──
  const mediaSvgs: Record<string, string> = {};
  const mediaEmbeds: Record<string, EmbedDescriptor> = {};
  const mediaDir = path.join(dir, "media");
  if (dirExists(mediaDir)) {
    const files = safeReadDir(mediaDir);

    // SVGs — keyed by filename (e.g. "rlc-schema.svg")
    for (const file of files.filter((f) => f.endsWith(".svg"))) {
      const svg = safeReadFile(path.join(mediaDir, file));
      if (svg) mediaSvgs[file] = svg;
    }

    // JSON embed descriptors — keyed by basename slug (e.g. "rlc-sandbox")
    for (const file of files.filter((f) => f.endsWith(".json"))) {
      const raw = safeReadFile(path.join(mediaDir, file));
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        // Require at least a url field — malformed/missing → skip, never throw
        if (!parsed || typeof parsed.url !== "string") continue;

        const slug_key = file.replace(/\.json$/, "");
        mediaEmbeds[slug_key] = {
          type: parsed.tool ?? parsed.type ?? "custom",
          url: parsed.url,
          title: parsed.title_fr ?? parsed.title ?? undefined,
          aspectRatio: parsed.aspectRatio ?? undefined,
          urlBase: parsed.url_base ?? undefined,
          caption: parsed.caption_fr ?? parsed.caption ?? undefined,
          circuitImportText: parsed.circuit_import_text ?? undefined,
        };
      } catch {
        // Malformed JSON — skip silently, never crash the page
      }
    }
  }

  // ── embed.json (legacy, notion root) ──
  let embed: EmbedDescriptor | null = null;
  const embedRaw = safeReadFile(path.join(dir, "embed.json"));
  if (embedRaw) {
    try {
      const parsed = JSON.parse(embedRaw);
      if (parsed && typeof parsed.url === "string") {
        embed = {
          type: parsed.tool ?? parsed.type ?? "custom",
          url: parsed.url,
          title: parsed.title_fr ?? parsed.title ?? undefined,
          aspectRatio: parsed.aspectRatio ?? undefined,
          urlBase: parsed.url_base ?? undefined,
          caption: parsed.caption_fr ?? parsed.caption ?? undefined,
          circuitImportText: parsed.circuit_import_text ?? undefined,
        };
      }
    } catch {
      embed = null;
    }
  }

  // ── meta ──
  const title = extractTitle(lessonMd, slug);
  const meta: NotionMeta = { id, subject, slug, title };

  return { meta, lessonMd, itemsData, mediaSvgs, mediaEmbeds, embed };
}
