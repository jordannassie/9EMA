import type { Metadata } from "next";
import { monthlyPriceLabel } from "@/config/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  const price = monthlyPriceLabel();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Terms</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
        <p>
          9EMA provides educational market commentary and a chart indicator subscription. Nothing on this
          site is personalized financial, investment, or trading advice.
        </p>
        <p>
          The indicator subscription is {price} per month, billed through Stripe until it is canceled in
          the billing portal. A subscription is active only after Stripe confirms payment. Canceling stops
          future charges. Access already paid for runs through the end of the current period.
        </p>
        <p>
          TradingView access, when offered, is an invite handled by an administrator. Buying a subscription
          does not by itself add the script to a TradingView account.
        </p>
        <p>
          Futures and other leveraged products can lose more than an initial payment to a prop firm. You
          are responsible for every order you place.
        </p>
      </div>
    </main>
  );
}
