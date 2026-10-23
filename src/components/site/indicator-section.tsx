import Link from "next/link";
import { monthlyPriceLabel, siteConfig } from "@/config/site";
import { SetupChart } from "@/components/charts/setup-charts";
import { CheckoutButton } from "@/components/billing/checkout-button";
import { billingGaps } from "@/lib/billing/stripe";

const featureIcons = ["↕", "◎", "🔔", "⌁", "▦", "↻"];

export function IndicatorSection() {
  const price = monthlyPriceLabel();
  const gaps = billingGaps();

  return (
    <section id="indicator" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.15fr_0.8fr]">
        <div>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            The 9EMA indicator.
          </h2>
          <p className="mt-4 text-lg text-muted">One indicator. Everything you need.</p>
          <p className="mt-8 font-display text-5xl font-bold text-neon">
            {price}
            <span className="text-2xl text-white"> / month</span>
          </p>
          <p className="mt-2 text-sm text-muted">Monthly plan. {price} billed monthly.</p>
          <div className="mt-6">
            <CheckoutButton />
          </div>
          {gaps.length > 0 ? (
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              Card checkout is not connected yet.{" "}
              <Link href="/indicator" className="text-neon underline-offset-2 hover:underline">
                See what is missing
              </Link>
            </p>
          ) : null}
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            TradingView access is recorded for manual invite. This site does not provision the script automatically.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-line bg-card p-3">
          <SetupChart name="indicator" />
        </div>
        <ul className="grid gap-4">
          {siteConfig.features.map((feature, index) => (
            <li key={feature.title} className="flex gap-4">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line text-neon">
                {featureIcons[index]}
              </span>
              <span>
                <span className="block font-semibold text-white">{feature.title}</span>
                <span className="block text-sm text-muted">{feature.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
