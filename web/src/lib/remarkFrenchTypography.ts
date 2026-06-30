/**
 * remark (mdast) plugin: French-typography normalization for prose.
 *
 * Visits ONLY mdast `text` nodes and rewrites their `value` with
 * {@link frenchTypography}. Because remark-math and remark-gfm have already
 * parsed math and code into their own node types (`inlineMath`, `math`,
 * `inlineCode`, `code`) by the time a remark plugin runs, those nodes are
 * never `text` nodes and are therefore left completely untouched — we never
 * mangle apostrophes inside code or insert narrow spaces into LaTeX.
 *
 * Uses `unist-util-visit` (a transitive dependency already present via
 * react-markdown / the unified ecosystem — see package-lock). No new
 * dependency is added.
 */

import type { Root, Text } from "mdast";
import { visit } from "unist-util-visit";
import { frenchTypography } from "./frenchTypography";

/**
 * A remark transformer plugin. Returns the mutated tree's transformer.
 * Typed as a unified `Plugin<[], Root>`-compatible factory without importing
 * `unified` types directly (keeping the dep surface minimal): it is a
 * function returning a transformer over a `Root` tree.
 */
export default function remarkFrenchTypography(): (tree: Root) => void {
  return (tree: Root): void => {
    visit(tree, "text", (node: Text): void => {
      node.value = frenchTypography(node.value);
    });
  };
}
