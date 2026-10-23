import type { Metadata } from "next";
import Link from "next/link";
import { AccountForms } from "@/components/billing/account-forms";
import { isPaidStatus, syncCheckoutSession } from "@/lib/billing/subscriptions";

export const metadata: Metadata = { title: "Account" };
export const dynamic = "force-dynamic";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId = "" } = await searchParams;

  if (!sessionId) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <h1 className="font-display text-5xl font-bold uppercase text-white">Account</h1>
        <p className="mt-4 text-lg text-muted">
          This page opens after checkout. Start from the indicator if you still need to subscribe.
        </p>
        <Link href="/indicator" className="mt-6 inline-flex text-neon">
          Get the indicator
        </Link>
      </main>
    );
  }

  let result: Awaited<ReturnType<typeof syncCheckoutSession>> | null = null;
  let failure = "";
  try {
    result = await syncCheckoutSession(sessionId);
    if (result.error) failure = result.error;
  } catch (error) {
    failure = error instanceof Error ? error.message : "Stripe could not be reached.";
  }

  const subscription = result && "subscription" in result ? result.subscription : undefined;
  const saved = result && "saved" in result ? result.saved : undefined;
  const row = result && "row" in result ? result.row : undefined;
  const status = subscription?.status ?? "";
  const paid = status ? isPaidStatus(status) : false;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Account</h1>
      {failure ? <p className="mt-4 text-muted">{failure}</p> : null}
      {status ? (
        <p className="mt-4 text-lg text-muted">
          Stripe subscription status: <span className="text-white">{status}</span>. Access is not marked
          active from the browser redirect. The status above comes from Stripe.
        </p>
      ) : null}
      {saved && !saved.stored ? <p className="mt-3 text-sm text-muted">{saved.message}</p> : null}
      {row ? (
        <p className="mt-3 text-sm text-muted">
          TradingView access: {row.access_status}. A pending status means the invite has not been sent.
        </p>
      ) : null}
      {!paid && status ? (
        <p className="mt-4 text-sm text-muted">
          The TradingView username form stays closed until Stripe reports the subscription as active or trialing.
        </p>
      ) : null}
      <AccountForms
        sessionId={sessionId}
        canSave={paid}
        initialUsername={row?.tradingview_username || ""}
      />
    </main>
  );
}
