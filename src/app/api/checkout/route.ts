import { NextResponse } from "next/server";
import { getStripe, resolveMonthlyPriceId, siteOrigin } from "@/lib/billing/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      {
        message:
          "Checkout is not connected yet. Add STRIPE_SECRET_KEY on the server. Webhook and Supabase keys are also required before a subscription can be stored.",
      },
      { status: 503 },
    );
  }

  try {
    const price = await resolveMonthlyPriceId(stripe);
    const origin = siteOrigin(request);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${origin}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#indicator`,
      allow_promotion_codes: true,
    });

    if (!session.url) {
      return NextResponse.json({ message: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Stripe could not start checkout.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
