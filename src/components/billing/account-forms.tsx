"use client";

import { useState, type FormEvent } from "react";
import { greenButtonClass } from "@/components/site/ui";

export function AccountForms({
  sessionId,
  canSave,
  initialUsername,
}: {
  sessionId: string;
  canSave: boolean;
  initialUsername: string;
}) {
  const [username, setUsername] = useState(initialUsername);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function saveUsername(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/account/tradingview", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, username }),
      });
      const body = (await response.json()) as { message?: string; ok?: boolean };
      setMessage(body.ok ? "TradingView username saved. Access stays pending until an admin grants it." : body.message || "Could not save the username.");
    } catch {
      setMessage("Could not reach the server.");
    } finally {
      setPending(false);
    }
  }

  async function openPortal() {
    setPending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/billing/portal", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const body = (await response.json()) as { url?: string; message?: string };
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      setMessage(body.message || "The billing portal is not available.");
    } catch {
      setMessage("Could not reach the billing portal.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-8 grid gap-6">
      <form onSubmit={saveUsername} className="rounded-2xl border border-line bg-card p-5">
        <label htmlFor="tradingview" className="text-sm font-semibold text-white">
          TradingView username
        </label>
        <input
          id="tradingview"
          name="tradingview"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          disabled={!canSave || pending}
          autoComplete="off"
          className="mt-3 w-full rounded-xl border border-line bg-background px-4 py-3 text-white outline-none focus:border-neon"
          placeholder="your_username"
        />
        <button type="submit" className={`${greenButtonClass} mt-4`} disabled={!canSave || pending}>
          Save username
        </button>
      </form>
      <button type="button" onClick={openPortal} className="text-left text-sm font-semibold text-neon" disabled={pending}>
        Manage or cancel billing
      </button>
      {message ? (
        <p role="status" className="text-sm leading-6 text-muted">
          {message}
        </p>
      ) : null}
    </div>
  );
}
