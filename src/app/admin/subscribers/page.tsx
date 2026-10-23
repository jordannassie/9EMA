import type { Metadata } from "next";
import { isAdmin, loginAdmin, logoutAdmin, setAccessStatus } from "@/app/admin/actions";
import { listSubscriptions } from "@/lib/billing/subscriptions";

export const metadata: Metadata = { title: "Subscribers", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const secretReady = Boolean(process.env.ADMIN_SECRET?.trim());
  const allowed = await isAdmin();

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Subscribers</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
        Active means Stripe has confirmed the subscription. TradingView access is manual: pending, granted,
        or revoked. This page does not send TradingView invites.
      </p>
      {!secretReady ? (
        <p className="mt-6 rounded-2xl border border-line bg-card p-5 text-sm text-muted">
          Set ADMIN_SECRET on the server before this page can be opened.
        </p>
      ) : null}
      {secretReady && !allowed ? (
        <form action={loginAdmin} className="mt-6 max-w-sm rounded-2xl border border-line bg-card p-5">
          <label htmlFor="password" className="text-sm font-semibold">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-3 w-full rounded-xl border border-line bg-background px-4 py-3"
            autoComplete="current-password"
          />
          {params.error ? <p className="mt-3 text-sm text-muted">That password did not match.</p> : null}
          <button type="submit" className="mt-4 rounded-full bg-neon px-5 py-3 text-sm font-bold text-black">
            Open
          </button>
        </form>
      ) : null}
      {allowed ? <SubscriberTable /> : null}
    </main>
  );
}

async function SubscriberTable() {
  const { rows, message } = await listSubscriptions();

  return (
    <div className="mt-8">
      <form action={logoutAdmin}>
        <button type="submit" className="text-sm text-neon">
          Log out
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-muted">{message}</p> : null}
      {rows.length === 0 ? <p className="mt-4 text-sm text-muted">No subscribers stored yet.</p> : null}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="border-b border-line py-3 pr-4">Email</th>
              <th className="border-b border-line py-3 pr-4">Stripe</th>
              <th className="border-b border-line py-3 pr-4">TradingView</th>
              <th className="border-b border-line py-3">Access</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="align-top">
                <td className="border-b border-line py-3 pr-4">{row.email || "—"}</td>
                <td className="border-b border-line py-3 pr-4">{row.stripe_status}</td>
                <td className="border-b border-line py-3 pr-4">{row.tradingview_username || "—"}</td>
                <td className="border-b border-line py-3">
                  <p className="mb-2 uppercase text-neon">{row.access_status}</p>
                  <div className="flex flex-wrap gap-2">
                    {(["pending", "granted", "revoked"] as const).map((status) => (
                      <form key={status} action={setAccessStatus}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="status" value={status} />
                        <button type="submit" className="rounded-full border border-line px-3 py-1 text-xs">
                          {status}
                        </button>
                      </form>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
