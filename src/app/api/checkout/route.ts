import { NextResponse } from "next/server";
import { getStripe, resolveBookPriceId, resolveMonthlyPriceId, siteOrigin } from "@/lib/billing/stripe";

type Product = "indicator" | "book";

async function readProduct(request: Request): Promise<Product> {
  const text = await request.text();
  if (!text.trim()) return "indicator";
  try {
    const body = JSON.parse(text) as { product?: string };
    return body.product === "book" ? "book" : "indicator";
  } catch {
    return "indicator";
  }
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const product = await readProduct(request);
  if (!stripe) {
    return NextResponse.json(
      {
        message:
          "Checkout is not connected yet. Add STRIPE_SECRET_KEY on the server. Webhook and Supabase keys are also required before an indicator subscription can be stored.",
      },
      { status: 503 },
    );
  }

  try {
    const origin = siteOrigin(request);
    const session =
      product === "book"
        ? await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: [{ price: await resolveBookPriceId(stripe), quantity: 1 }],
            success_url: `${origin}/playbook?book=purchased`,
            cancel_url: `${origin}/#book`,
            allow_promotion_codes: true,
            metadata: { product: "book" },
          })
        : await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: await resolveMonthlyPriceId(stripe), quantity: 1 }],
            success_url: `${origin}/account?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/#indicator`,
            allow_promotion_codes: true,
            metadata: { product: "indicator" },
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
