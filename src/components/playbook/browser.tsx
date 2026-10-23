"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PatternDiagram } from "@/components/playbook/diagram";
import { categoryLabels, directionLabels, type Category, type Direction, type Pattern } from "@/lib/playbook/types";

type CardPattern = Omit<Pattern, "body" | "identification" | "context" | "entry" | "stop" | "target" | "mistakes" | "description">;

const categories: Array<Category | "all"> = ["all", "candlestick", "reversal", "continuation", "setups"];
const directions: Array<Direction | "all"> = ["all", "bullish", "bearish", "neutral"];

export function PlaybookBrowser({ patterns }: { patterns: CardPattern[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [direction, setDirection] = useState<Direction | "all">("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return patterns.filter((pattern) => {
      if (category !== "all" && pattern.category !== category) return false;
      if (direction !== "all" && pattern.direction !== direction) return false;
      if (!needle) return true;
      return `${pattern.name} ${pattern.summary}`.toLowerCase().includes(needle);
    });
  }, [patterns, query, category, direction]);

  return (
    <div>
      <label className="block">
        <span className="sr-only">Search patterns</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search patterns"
          className="w-full rounded-2xl border border-line bg-card px-4 py-3 text-white outline-none placeholder:text-muted focus:border-neon"
        />
      </label>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Pattern categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={category === item}
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm ${category === item ? "border-neon bg-neon text-black" : "border-line text-muted"}`}
          >
            {categoryLabels[item]}
          </button>
        ))}
      </div>
      <div className="mt-3 flex gap-2" role="group" aria-label="Direction">
        {directions.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={direction === item}
            onClick={() => setDirection(item)}
            className={`rounded-full border px-4 py-2 text-sm ${direction === item ? "border-neon text-neon" : "border-line text-muted"}`}
          >
            {directionLabels[item]}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-8 text-muted">No patterns match that search.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((pattern) => (
            <li key={pattern.slug}>
              <Link href={`/playbook/${pattern.slug}`} className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card hover:border-neon">
                <div className="h-40 border-b border-line">
                  <PatternDiagram diagram={pattern.diagram} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{categoryLabels[pattern.category]}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold uppercase text-white">{pattern.name}</h2>
                  <p className={`mt-2 text-xs font-semibold uppercase tracking-wide ${pattern.direction === "bearish" ? "text-[#ff5a5a]" : pattern.direction === "bullish" ? "text-neon" : "text-muted"}`}>
                    {directionLabels[pattern.direction]}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted">{pattern.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
