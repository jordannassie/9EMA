import type Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/billing/stripe";

export type SubscriptionRow = {
  id: string;
  email: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_status: string;
  tradingview_username: string | null;
  access_status: "pending" | "granted" | "revoked";
  created_at: string;
  updated_at: string;
};

const confirmed = new Set(["active", "trialing"]);

export function isPaidStatus(status: string) {
  return confirmed.has(status);
}

export async function upsertSubscription(input: {
  email: string | null;
  customerId: string;
  subscriptionId: string;
  status: string;
}) {
  const db = createAdminClient();
  if (!db) return { stored: false as const, message: "Supabase service role is not configured." };

  const { error } = await db.from("indicator_subscriptions").upsert(
    {
      email: input.email,
      stripe_customer_id: input.customerId,
      stripe_subscription_id: input.subscriptionId,
      stripe_status: input.status,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) return { stored: false as const, message: error.message };
  return { stored: true as const, message: null };
}

export async function findSubscription(subscriptionId: string) {
  const db = createAdminClient();
  if (!db) return null;
  const { data } = await db
    .from("indicator_subscriptions")
    .select("*")
    .eq("stripe_subscription_id", subscriptionId)
    .maybeSingle();
  return (data as SubscriptionRow | null) ?? null;
}

export async function listSubscriptions() {
  const db = createAdminClient();
  if (!db) return { rows: [] as SubscriptionRow[], message: "Supabase service role is not configured." };
  const { data, error } = await db
    .from("indicator_subscriptions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return { rows: [] as SubscriptionRow[], message: error.message };
  return { rows: (data as SubscriptionRow[]) ?? [], message: null };
}

export async function syncCheckoutSession(sessionId: string) {
  const stripe = getStripe();
  if (!stripe) return { error: "Stripe is not configured." as const };
  if (!sessionId.startsWith("cs_")) return { error: "That checkout session is not valid." as const };

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const subscriptionId =
    typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  if (!subscriptionId) {
    return { error: "Stripe has not attached a subscription to this checkout yet." as const };
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  const saved = await upsertSubscription({
    email,
    customerId,
    subscriptionId: subscription.id,
    status: subscription.status,
  });
  const row = await findSubscription(subscription.id);

  return {
    error: null,
    session,
    subscription,
    email,
    customerId,
    saved,
    row,
  };
}

export async function applyStripeSubscription(subscription: Stripe.Subscription, email?: string | null) {
  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id;
  return upsertSubscription({
    email: email ?? null,
    customerId,
    subscriptionId: subscription.id,
    status: subscription.status,
  });
}
