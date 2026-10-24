import Image from "next/image";
import Link from "next/link";
import { greenButtonClass } from "@/components/site/ui";

const cards = [
  { title: "Zone", detail: "A colored area on the chart.", accent: "text-neon" },
  { title: "Volume bubble", detail: "A circle marking activity on the move.", accent: "text-[#ff5a5a]" },
  { title: "EMA confirmation", detail: "Direction checked against the EMA.", accent: "text-neon" },
];

const levels = ["VWAP", "VAH", "VAL", "50%", "Next Zone"];

function ChartShot() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-black">
      <Image
        src="/images/9-indicator-chart.png"
        alt="Chart with zones, volume bubbles, and buy and sell power marks"
        width={366}
        height={504}
        className="h-auto w-full"
      />
    </div>
  );
}

export function IndicatorChartSection() {
  return (
    <section id="indicator-chart" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-neon">THE 9EMA INDICATOR</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            See the zone. Watch the volume. Follow the direction.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">
            A zone, a volume bubble, and EMA direction can line up. The next mark is a reference level, not a forecast.
          </p>
          <div className="mt-8 lg:hidden">
            <ChartShot />
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {cards.map((card) => (
              <li key={card.title} className="rounded-2xl border border-line bg-card p-5">
                <h3 className={`font-display text-2xl font-bold uppercase ${card.accent}`}>{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{card.detail}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-2xl border border-line bg-card px-5 py-4 text-sm font-semibold uppercase tracking-wide text-white sm:text-base">
            Zone <span className="text-neon">+</span> Volume bubble <span className="text-neon">+</span> EMA confirmation{" "}
            <span className="text-neon">→</span> Next reference level
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {levels.map((level) => (
              <li
                key={level}
                className="rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neon"
              >
                {level}
              </li>
            ))}
          </ul>
          <Link href="/indicator" className={`${greenButtonClass} mt-8`}>
            Explore the 9EMA indicator
            <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-4 max-w-xl text-xs leading-5 text-muted">
            Educational charting tool. Signals can change; targets are not guaranteed.
          </p>
        </div>
        <div className="hidden lg:block">
          <ChartShot />
        </div>
      </div>
    </section>
  );
}
