import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Category, Direction, Pattern } from "@/lib/playbook/types";

const categories = new Set<Category>(["candlestick", "reversal", "continuation", "setups"]);
const directions = new Set<Direction>(["bullish", "bearish", "neutral"]);

let cached: Pattern[] | null = null;

export function getPatterns() {
  if (cached) return cached;
  const dir = path.join(process.cwd(), "content/playbook");
  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));
  const patterns = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Omit<Pattern, "body">;
    if (!categories.has(data.category) || !directions.has(data.direction) || !data.slug) {
      throw new Error(`Invalid playbook frontmatter in ${file}`);
    }
    return { ...data, body: parsed.content.trim() };
  });
  const slugs = new Set(patterns.map((pattern) => pattern.slug));
  for (const pattern of patterns) {
    for (const related of pattern.related) {
      if (!slugs.has(related)) throw new Error(`${pattern.slug} relates to missing pattern ${related}`);
    }
  }
  cached = patterns.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
  return cached;
}

export function getPattern(slug: string) {
  return getPatterns().find((pattern) => pattern.slug === slug);
}
