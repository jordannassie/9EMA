import Image from "next/image";
import Link from "next/link";
import { greenButtonClass } from "@/components/site/ui";

const cards = [
  {
    title: "Zone",
    accent: "bg-neon",
    body: "A marked area on the chart. Traders watch how price behaves around the zone. That is context for a potential setup, not a forecast of the next move.",
  },
  {
    title: "Volume bubble",
    accent: "bg-[#ff5a5a]",
    body: "A bubble printed on a bar. Read it with the zone. The figure in the bubble is a chart label, not a measure of actual exchange bid/ask delta.",
  },
  {
    title: "EMA confirmation",
    accent: "bg-neon",
    body: "The 9 EMA shows the direction being studied. Confirmation means that direction agrees with the zone and the bubble. Price can still turn.",
  },
] as const;

const steps = ["Zone", "Volume Bubble", "EMA Confirmation"] as const;
const levels = ["VWAP", "VAH", "VAL", "50%", "Next Zone"] as const;

function ChartShot() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-card p-3">
      <Image
        src="/images/9-indicator-chart.png"
        alt="TradingView chart example with a zone, volume bubbles, Sell Power, and Buy Power"
        width={366}
        height={504}
        className="h-auto w-full"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
    </div>
  );
}

export function IndicatorGuide() {
  return (
    <section id="indicator-guide" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-neon">THE 9EMA INDICATOR</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            See the zone. Watch the volume. Follow the direction.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            The indicator draws a zone, a volume bubble, and EMA direction on one chart. Traders can study those
            together as a potential setup, then look at a reference level. Sell Power and Buy Power are readings on
            the chart. They do not predict where price will go.
          </p>
        </div>

        <div className="lg:sticky lg:top-24 lg:row-span-2 lg:self-start">
          <ChartShot />
        </div>

        <div>
          <ul className="grid gap-4">
            {cards.map((card) => (
              <li key={card.title} className="rounded-2xl border border-line bg-card p-5">
                <span className={`inline-block h-2 w-10 rounded-full ${card.accent}`} />
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <p className="text-xs font-semibold tracking-[0.22em] text-muted">A POTENTIAL SETUP</p>
            <ol className="mt-4 flex flex-wrap items-center gap-2">
              {steps.map((step, index) => (
                <li key={step} className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line bg-card px-4 py-2 text-sm font-semibold text-white">
                    {step}
                  </span>
                  <span className="px-1 font-display text-xl text-neon" aria-hidden="true">
                    {index === steps.length - 1 ? "→" : "+"}
                  </span>
                </li>
              ))}
              <li>
                <span className="inline-flex rounded-full bg-neon px-4 py-2 text-sm font-bold text-black">
                  Next Reference Level
                </span>
              </li>
            </ol>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              Zone, volume bubble, and EMA confirmation are watched together. The arrow points at the next reference
              level. That level is a place to study, not a promised target.
            </p>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Reference levels">
            {levels.map((level) => (
              <li
                key={level}
                className="rounded-full border border-line px-3 py-1 text-xs font-semibold tracking-wide text-neon"
              >
                {level}
              </li>
            ))}
          </ul>

          <Link href="/indicator" className={`${greenButtonClass} mt-8`}>
            Explore the 9EMA Indicator
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-4 max-w-xl text-xs leading-5 text-muted">
            Educational charting tool. Signals can change; targets are not guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
