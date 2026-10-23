import type { Metadata } from "next";
import Link from "next/link";
import { setups } from "@/config/setups";
import { SetupChart } from "@/components/charts/setup-charts";

export const metadata: Metadata = {
  title: "Setups",
  description: "Educational explanations of the setups 9 trades.",
};

export default function SetupsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase leading-none text-white sm:text-6xl">
        Learn the setups 9 trades.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        These pages explain the structure of each setup. They do not report win rates or promise a result.
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {setups.map((setup) => (
          <li key={setup.slug}>
            <Link href={`/setups/${setup.slug}`} className="block overflow-hidden rounded-2xl border border-line bg-card hover:border-neon">
              <div className="h-40">
                <SetupChart name={setup.chart} />
              </div>
              <div className="p-5">
                <h2 className="font-display text-2xl font-bold uppercase">{setup.name}</h2>
                <p className="mt-2 text-sm text-muted">{setup.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
