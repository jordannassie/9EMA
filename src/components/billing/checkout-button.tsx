"use client";

import { useState } from "react";
import { greenButtonClass } from "@/components/site/ui";

export function CheckoutButton({
  label = "Get the indicator",
  product = "indicator",
}: {
  label?: string;
  product?: "indicator" | "book";
}) {
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function startCheckout() {
    setPending(true);
    setMessage(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const body = (await response.json()) as { url?: string; message?: string };
      if (body.url) {
        window.location.href = body.url;
        return;
      }
      setMessage(body.message || "Checkout is not available.");
      setPending(false);
    } catch {
      setMessage("Checkout could not be reached. Try again in a moment.");
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button type="button" className={greenButtonClass} onClick={startCheckout} disabled={pending}>
        {pending ? "Opening checkout…" : label}
        {pending ? null : <span aria-hidden="true">→</span>}
      </button>
      {message ? (
        <p role="status" className="max-w-md text-sm leading-6 text-muted">
          {message}
        </p>
      ) : null}
    </div>
  );
}
