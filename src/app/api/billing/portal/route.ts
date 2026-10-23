import { NextResponse } from "next/server";
import { getStripe, siteOrigin } from "@/lib/billing/stripe";
import { syncCheckoutSession } from "@/lib/billing/subscriptions";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ message: "Stripe is not configured." }, { status: 503 });
  }

  const body = (await request.json()) as { sessionId?: string };
  const sessionId = body.sessionId?.trim() || "";
  const synced = await syncCheckoutSession(sessionId);
  if (synced.error || !("customerId" in synced)) {
    return NextResponse.json({ message: synced.error || "Checkout session was not found." }, { status: 400 });
  }

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: synced.customerId,
      return_url: `${siteOrigin(request)}/account?session_id=${encodeURIComponent(sessionId)}`,
    });
    return NextResponse.json({ url: portal.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The billing portal is not available.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
