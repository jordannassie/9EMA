import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPaidStatus, syncCheckoutSession } from "@/lib/billing/subscriptions";

const usernamePattern = /^[A-Za-z0-9_]{3,25}$/;

export async function POST(request: Request) {
  const body = (await request.json()) as { sessionId?: string; username?: string };
  const sessionId = body.sessionId?.trim() || "";
  const username = body.username?.trim() || "";

  if (!usernamePattern.test(username)) {
    return NextResponse.json(
      { message: "Use 3 to 25 letters, numbers, or underscores for the TradingView username." },
      { status: 400 },
    );
  }

  const synced = await syncCheckoutSession(sessionId);
  if (synced.error || !("subscription" in synced)) {
    return NextResponse.json({ message: synced.error || "Checkout could not be verified." }, { status: 400 });
  }

  if (!isPaidStatus(synced.subscription.status)) {
    return NextResponse.json(
      { message: "The username is saved only after Stripe confirms an active subscription." },
      { status: 402 },
    );
  }

  const db = createAdminClient();
  if (!db || !synced.saved.stored) {
    return NextResponse.json(
      { message: synced.saved.message || "The subscription database is not configured." },
      { status: 503 },
    );
  }

  const { error } = await db
    .from("indicator_subscriptions")
    .update({ tradingview_username: username, updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", synced.subscription.id);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, username });
}
