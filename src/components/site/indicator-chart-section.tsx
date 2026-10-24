import Image from "next/image";
import Link from "next/link";
import { ChartRotator } from "@/components/site/chart-rotator";
import { greenButtonClass } from "@/components/site/ui";

const cards = [
  { title: "Zone", detail: "A colored area on the chart.", accent: "text-neon" },
  { title: "Volume bubble", detail: "A circle marking activity on the move.", accent: "text-[#ff5a5a]" },
  { title: "EMA confirmation", detail: "Direction checked against the EMA.", accent: "text-neon" },
];

const levels = ["VWAP", "VAH", "VAL", "50%", "Next Zone"];

export function IndicatorChartSection() {
  return (
    <section id="indicator-chart" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <div>
          <Image
            src="/9logo.png"
            alt="9EMA"
            width={720}
            height={480}
            className="h-16 w-auto object-contain sm:h-20"
          />
          <p className="mt-6 text-xs font-semibold tracking-[0.28em] text-neon">THE 9EMA INDICATOR</p>
          <h2 className="mt-4 max-w-xl font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            See the zone. Watch the volume. Follow the direction.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">
            A zone, a volume bubble, and EMA direction can line up. The next mark is a liquidity level, not a forecast.
          </p>
          <div className="mt-8 lg:hidden">
            <ChartRotator />
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
            <span className="text-neon">→</span> Next liquidity level
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
          <ChartRotator />
        </div>
      </div>
    </section>
  );
}
