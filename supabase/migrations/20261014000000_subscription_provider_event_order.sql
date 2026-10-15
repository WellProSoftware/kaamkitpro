-- Preserve provider event chronology so delayed Razorpay deliveries cannot roll subscription state backward.
alter table public.subscriptions
  add column if not exists last_provider_event_at timestamptz;
