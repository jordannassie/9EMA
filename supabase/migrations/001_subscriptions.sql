create table if not exists public.indicator_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_status text not null default 'incomplete',
  tradingview_username text,
  access_status text not null default 'pending' check (access_status in ('pending', 'granted', 'revoked')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.indicator_subscriptions enable row level security;
