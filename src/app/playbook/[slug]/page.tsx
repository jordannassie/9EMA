import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndicatorCta } from "@/components/playbook/indicator-cta";
import { PatternDiagram } from "@/components/playbook/diagram";
import { categoryLabels, directionLabels } from "@/lib/playbook/types";
import { getPattern, getPatterns } from "@/lib/playbook/load";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPatterns().map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPattern(slug);
  return {
    title: pattern ? pattern.name : "Pattern",
    description: pattern?.summary,
  };
}

export default async function PatternPage({ params }: Props) {
  const { slug } = await params;
  const pattern = getPattern(slug);
  if (!pattern) notFound();
  const related = pattern.related
    .map((relatedSlug) => getPattern(relatedSlug))
    .filter((item) => item !== undefined);
  const paragraphs = pattern.body.split(/\n\n+/).filter(Boolean);

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <Link href="/playbook" className="text-sm font-semibold uppercase tracking-wide text-neon">
        All patterns
      </Link>
      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted">
        {categoryLabels[pattern.category]} · {directionLabels[pattern.direction]}
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-white">{pattern.name}</h1>
      <p className="mt-4 text-lg text-muted">{pattern.summary}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-line">
        <div className="h-72">
          <PatternDiagram diagram={pattern.diagram} />
        </div>
      </div>
      <div className="mt-6 grid gap-4 text-base leading-7 text-white">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold uppercase">Identification</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {pattern.identification.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-8 rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">Market context</h2>
        <p className="mt-2 leading-7">{pattern.context}</p>
      </section>
      <section className="mt-4 grid gap-4">
        {[
          ["Entry example", pattern.entry],
          ["Stop-loss example", pattern.stop],
          ["Target example", pattern.target],
        ].map(([label, copy]) => (
          <div key={label} className="rounded-2xl border border-line bg-card p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{label}</h2>
            <p className="mt-2 leading-7">{copy}</p>
          </div>
        ))}
      </section>
      <section className="mt-8">
        <h2 className="font-display text-2xl font-bold uppercase">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          {pattern.mistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <p className="mt-6 text-sm leading-6 text-muted">
        Candlestick and chart patterns are probabilistic observations, not guaranteed trading signals. This page does
        not report a win rate.
      </p>
      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold uppercase">Related patterns</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/playbook/${item.slug}`} className="block rounded-2xl border border-line bg-card p-4 hover:border-neon">
                  <span className="block font-semibold text-white">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">{item.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <div className="mt-10">
        <IndicatorCta />
      </div>
    </main>
  );
}
