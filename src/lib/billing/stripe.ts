import Stripe from "stripe";
import { siteConfig } from "@/config/site";

let stripeClient: Stripe | null = null;

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  if (!stripeClient) stripeClient = new Stripe(key);
  return stripeClient;
}

export function billingGaps() {
  const gaps: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY?.trim()) gaps.push("STRIPE_SECRET_KEY");
  if (!process.env.STRIPE_WEBHOOK_SECRET?.trim()) gaps.push("STRIPE_WEBHOOK_SECRET");
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()) gaps.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) gaps.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!process.env.ADMIN_SECRET?.trim()) gaps.push("ADMIN_SECRET");
  return gaps;
}

export function siteOrigin(request?: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  const origin = request?.headers.get("origin");
  if (origin) return origin;
  return siteConfig.url.replace(/\/$/, "");
}

export async function resolveMonthlyPriceId(stripe: Stripe) {
  const configured = process.env.STRIPE_PRICE_ID?.trim();
  if (configured) return configured;

  const prices = await stripe.prices.list({ active: true, limit: 100, type: "recurring" });
  const existing = prices.data.find(
    (price) =>
      price.unit_amount === siteConfig.indicator.monthlyPriceCents &&
      price.currency === "usd" &&
      price.recurring?.interval === "month",
  );
  if (existing) return existing.id;

  const created = await stripe.prices.create({
    currency: "usd",
    unit_amount: siteConfig.indicator.monthlyPriceCents,
    recurring: { interval: "month" },
    product_data: { name: siteConfig.indicator.name },
  });
  return created.id;
}

export async function resolveBookPriceId(stripe: Stripe) {
  const configured = process.env.STRIPE_BOOK_PRICE_ID?.trim();
  if (configured) return configured;

  const prices = await stripe.prices.list({ active: true, limit: 100, type: "one_time" });
  const existing = prices.data.find(
    (price) =>
      price.unit_amount === siteConfig.book.priceCents &&
      price.currency === "usd" &&
      price.nickname === "9ema-trading-playbook",
  );
  if (existing) return existing.id;

  const created = await stripe.prices.create({
    currency: "usd",
    unit_amount: siteConfig.book.priceCents,
    nickname: "9ema-trading-playbook",
    product_data: { name: siteConfig.book.name },
  });
  return created.id;
}
