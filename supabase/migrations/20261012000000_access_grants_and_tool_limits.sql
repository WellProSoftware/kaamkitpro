-- Central tool policy, daily usage counters, and admin-issued access grants.
-- Admin grants are separate from paid subscriptions; never fake a payment record.

create table if not exists public.user_access_grants (
  id uuid primary key default gen_random_uuid(),
  target_email text not null,
  access_type text not null check (access_type in ('full_pro', 'pro', 'selected_tools')),
  tool_keys text[] not null default '{}',
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  reason text not null check (reason in ('special_user', 'testing', 'support', 'other')),
  note text,
  granted_by uuid references auth.users(id) on delete set null,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  check (expires_at is null or expires_at > starts_at)
);

alter table public.user_access_grants
  add column if not exists revoked_by uuid references auth.users(id) on delete set null;

create index if not exists user_access_grants_email_active_idx
  on public.user_access_grants (lower(target_email), starts_at, expires_at)
  where revoked_at is null;

create table if not exists public.tool_usage_daily (
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_key text not null,
  usage_date date not null,
  usage_count integer not null default 0 check (usage_count >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, tool_key, usage_date)
);

create index if not exists tool_usage_daily_date_idx
  on public.tool_usage_daily (usage_date);

alter table public.user_access_grants enable row level security;
alter table public.tool_usage_daily enable row level security;

-- No client policies: only server routes using the service-role key may manage grants/usage.
revoke all on public.user_access_grants from anon, authenticated;
revoke all on public.tool_usage_daily from anon, authenticated;

create or replace function public.consume_tool_usage(
  p_user_id uuid,
  p_tool_key text,
  p_usage_date date,
  p_daily_limit integer
)
returns table (allowed boolean, used integer, daily_limit integer)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count integer;
begin
  if p_daily_limit < 1 or length(p_tool_key) < 1 or length(p_tool_key) > 100 then
    raise exception 'Invalid usage policy';
  end if;

  insert into public.tool_usage_daily (user_id, tool_key, usage_date, usage_count)
  values (p_user_id, p_tool_key, p_usage_date, 1)
  on conflict (user_id, tool_key, usage_date)
  do update set usage_count = public.tool_usage_daily.usage_count + 1,
                updated_at = now()
  where public.tool_usage_daily.usage_count < p_daily_limit
  returning usage_count into current_count;

  if found then
    return query select true, current_count, p_daily_limit;
    return;
  end if;

  select u.usage_count into current_count
  from public.tool_usage_daily u
  where u.user_id = p_user_id
    and u.tool_key = p_tool_key
    and u.usage_date = p_usage_date;

  return query select false, coalesce(current_count, 0), p_daily_limit;
end;
$$;

revoke all on function public.consume_tool_usage(uuid, text, date, integer) from public, anon, authenticated;
grant execute on function public.consume_tool_usage(uuid, text, date, integer) to service_role;
