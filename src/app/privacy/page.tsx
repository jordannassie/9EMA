import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Privacy</h1>
      <div className="mt-6 grid gap-4 text-sm leading-7 text-muted">
        <p>
          Checkout is handled by Stripe. 9EMA stores the email Stripe provides, the Stripe customer and
          subscription ids, the subscription status, an optional TradingView username, and whether access
          is pending, granted, or revoked.
        </p>
        <p>
          That record is kept so an administrator can see who has paid and which TradingView username
          should receive a manual invite. The service role key stays on the server. The public site does
          not list subscribers.
        </p>
        <p>
          9EMA does not sell this subscription list. Payment card numbers are entered on Stripe, not on
          this website.
        </p>
      </div>
    </main>
  );
}
