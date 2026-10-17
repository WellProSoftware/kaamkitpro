-- Add an atomic-processing lease to protect against concurrent webhook deliveries.
-- Stale leases are recoverable by the handler after five minutes.
alter table public.payment_events
  add column if not exists processing_started_at timestamptz;

create index if not exists payment_events_processing_started_idx
  on public.payment_events (processing_started_at)
  where processed_at is null;
