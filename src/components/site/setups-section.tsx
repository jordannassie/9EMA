import Link from "next/link";
import { setups } from "@/config/setups";
import { SetupChart } from "@/components/charts/setup-charts";
import { ArrowIcon } from "@/components/site/icons";

export function SetupsSection() {
  return (
    <section id="setups" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
              Learn the setups 9 trades.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Simple trading setups explained with real chart examples.
            </p>
          </div>
          <Link href="/playbook" className="text-sm font-bold uppercase tracking-wide text-neon hover:text-white">
            View all setups →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {setups.map((setup) => (
            <li key={setup.slug}>
              <Link
                href={`/playbook/${setup.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-colors hover:border-neon"
              >
                <div className="h-40 border-b border-line">
                  <SetupChart name={setup.chart} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-2xl font-bold uppercase text-white">{setup.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-muted">{setup.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neon">
                    Learn setup <ArrowIcon className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
