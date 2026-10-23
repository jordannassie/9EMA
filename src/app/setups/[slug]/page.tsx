import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SetupChart } from "@/components/charts/setup-charts";
import { getSetup, setups } from "@/config/setups";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return setups.map((setup) => ({ slug: setup.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const setup = getSetup(slug);
  return { title: setup?.name ?? "Setup", description: setup?.summary };
}

export default async function SetupPage({ params }: Props) {
  const { slug } = await params;
  const setup = getSetup(slug);
  if (!setup) notFound();

  const blocks = [
    ["Entry", setup.entry],
    ["Invalidation", setup.invalidation],
    ["Stop", setup.stop],
    ["Target", setup.target],
  ] as const;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <Link href="/setups" className="text-sm font-semibold uppercase tracking-wide text-neon">
        All setups
      </Link>
      <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-none text-white">{setup.name}</h1>
      <p className="mt-4 text-lg text-muted">{setup.summary}</p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-line">
        <SetupChart name={setup.chart} />
      </div>
      <dl className="mt-8 grid gap-4">
        {blocks.map(([label, copy]) => (
          <div key={label} className="rounded-2xl border border-line bg-card p-5">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neon">{label}</dt>
            <dd className="mt-2 leading-7 text-white">{copy}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm leading-6 text-muted">
        This is an educational description of a commonly taught chart structure. It is not a verified
        performance record, and it is not a personal trade recommendation.
      </p>
    </main>
  );
}
