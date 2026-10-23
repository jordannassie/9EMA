import type { Metadata } from "next";
import { IndicatorCta } from "@/components/playbook/indicator-cta";
import { PlaybookBrowser } from "@/components/playbook/browser";
import { getPatterns } from "@/lib/playbook/load";

export const metadata: Metadata = {
  title: "Pattern playbook",
  description: "Learn candlesticks, chart patterns, and the setups 9 watches.",
};

export default function PlaybookPage() {
  const patterns = getPatterns().map((pattern) => ({
    slug: pattern.slug,
    name: pattern.name,
    category: pattern.category,
    direction: pattern.direction,
    order: pattern.order,
    summary: pattern.summary,
    related: pattern.related,
    diagram: pattern.diagram,
  }));

  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase leading-none text-white sm:text-7xl">Master the patterns.</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">Learn candlesticks, chart patterns, and the setups 9 watches.</p>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
        Candlestick and chart patterns are probabilistic observations, not guaranteed trading signals. None of these
        pages reports a win rate.
      </p>
      <div className="mt-8">
        <PlaybookBrowser patterns={patterns} />
      </div>
      <div className="mt-12">
        <IndicatorCta />
      </div>
    </main>
  );
}
