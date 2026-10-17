-- KaamKitPro subscription billing foundation.
-- Prices are proposed only. Plans remain inactive until checkout, paid features,
-- terms, and merchant approval are ready.

create table if not exists public.subscription_plans (
  id text primary key,
  name text not null,
  billing_interval text not null check (billing_interval in ('month', 'year')),
  amount_minor integer not null check (amount_minor >= 0),
  currency text not null default 'INR' check (currency = upper(currency)),
  status text not null default 'planned' check (status in ('planned', 'active', 'retired')),
  provider_plan_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (currency, billing_interval, amount_minor)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_id text not null references public.subscription_plans(id),
  provider text not null default 'razorpay' check (provider in ('razorpay')),
  provider_customer_id text,
  provider_subscription_id text unique,
  status text not null default 'incomplete'
    check (status in ('incomplete', 'trialing', 'active', 'past_due', 'cancelled', 'expired')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_status_idx
  on public.subscriptions (user_id, status);
create index if not exists subscriptions_period_end_idx
  on public.subscriptions (current_period_end);

-- Webhook delivery is at-least-once: provider event IDs must be idempotent.
create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null default 'razorpay' check (provider in ('razorpay')),
  provider_event_id text not null unique,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_error text
);

create index if not exists payment_events_unprocessed_idx
  on public.payment_events (received_at)
  where processed_at is null;

-- Seed proposed prices as planned/inactive. Amounts are in paise.
insert into public.subscription_plans
  (id, name, billing_interval, amount_minor, currency, status)
values
  ('pro-monthly-inr', 'Pro Monthly', 'month', 9900, 'INR', 'planned'),
  ('pro-yearly-inr', 'Pro Yearly', 'year', 69900, 'INR', 'planned')
on conflict (id) do nothing;

alter table public.subscription_plans enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_events enable row level security;

-- Public visitors can see only plans explicitly activated by an administrator.
create policy "Anyone can read active plans"
  on public.subscription_plans for select
  to anon, authenticated
  using (status = 'active');

-- Signed-in customers can read only their own subscription status.
create policy "Users can read own subscriptions"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

-- No client policies are created for writes or payment_events. Mutations and
-- webhook processing must happen server-side using a secret service-role key.
revoke all on public.payment_events from anon, authenticated;
revoke insert, update, delete on public.subscriptions from anon, authenticated;
revoke insert, update, delete on public.subscription_plans from anon, authenticated;
