import type { Metadata } from "next";
import { CheckoutButton } from "@/components/billing/checkout-button";
import { monthlyPriceLabel, siteConfig } from "@/config/site";
import { billingGaps } from "@/lib/billing/stripe";

export const metadata: Metadata = {
  title: "9EMA Indicator",
  description: "Monthly subscription for the 9EMA indicator at $31.99.",
};

export default function IndicatorPage() {
  const gaps = billingGaps();
  const price = monthlyPriceLabel();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-xs font-semibold tracking-[0.28em] text-neon">MONTHLY PLAN</p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase leading-none text-white sm:text-6xl">
        The 9EMA indicator.
      </h1>
      <p className="mt-4 text-lg text-muted">One indicator. Everything you need.</p>
      <p className="mt-8 font-display text-6xl font-bold text-neon">
        {price}
        <span className="text-2xl text-white"> / month</span>
      </p>
      <p className="mt-2 text-muted">{price} billed monthly until the subscription is canceled.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {siteConfig.features.map((feature) => (
          <li key={feature.title} className="rounded-2xl border border-line bg-card px-4 py-4">
            <p className="font-semibold">{feature.title}</p>
            <p className="mt-1 text-sm text-muted">{feature.detail}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm leading-6 text-muted">
        These are the planned indicator capabilities. They are listed here so the product page matches
        the offer. TradingView access is not granted automatically. After Stripe confirms payment, the
        customer can save a TradingView username for a manual invite.
      </p>
      <div className="mt-8">
        <CheckoutButton />
      </div>
      <section className="mt-10 rounded-2xl border border-line bg-card p-5">
        <h2 className="font-display text-2xl font-bold uppercase">Payment setup</h2>
        {gaps.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Stripe, webhook, database, and admin access are configured.</p>
        ) : (
          <>
            <p className="mt-3 text-sm leading-6 text-muted">
              Checkout cannot mark anyone active until these server values are set. Nothing on this page
              charges a card while Stripe is missing.
            </p>
            <ul className="mt-4 grid gap-2 text-sm">
              {gaps.map((gap) => (
                <li key={gap} className="rounded-xl border border-line px-3 py-2 font-mono text-neon">
                  {gap}
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="mt-4 text-sm leading-6 text-muted">
          Run <span className="font-mono">supabase/migrations/001_subscriptions.sql</span> in the Supabase
          SQL editor before the first paid signup. Point the Stripe webhook at{" "}
          <span className="font-mono">/api/stripe/webhook</span>.
        </p>
      </section>
    </main>
  );
}
