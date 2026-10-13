#!/usr/bin/env bash
set -euo pipefail

: "${DATABASE_URL:?Set DATABASE_URL to an isolated disposable PostgreSQL database}"

# This test intentionally creates and clears its own fixture row. Never point
# DATABASE_URL at production or shared staging data.
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 <<'SQL'
begin;
create schema if not exists auth;
create table if not exists auth.users (
  id uuid primary key
);
insert into auth.users (id)
values ('00000000-0000-4000-8000-000000000123')
on conflict (id) do nothing;
commit;
SQL

psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -c \
  "delete from public.tool_usage_daily where user_id = '00000000-0000-4000-8000-000000000123' and tool_key = 'ci-concurrency-test' and usage_date = current_date" \
  2>/dev/null || true

# Simulate many concurrent requests with a deliberately small daily limit.
# The database RPC must allow exactly five increments and reject the rest.
tmpdir="$(mktemp -d)"
trap 'rm -rf "$tmpdir"' EXIT
for i in $(seq 1 20); do
  (
    psql "$DATABASE_URL" -X -A -t -v ON_ERROR_STOP=1 -c \
      "select allowed from public.consume_tool_usage('00000000-0000-4000-8000-000000000123', 'ci-concurrency-test', current_date, 5)" \
      > "$tmpdir/$i.out"
  ) &
done
wait

allowed_count="$(grep -hxc 't' "$tmpdir"/*.out | awk '{s += $1} END {print s+0}')"
denied_count="$(grep -hxc 'f' "$tmpdir"/*.out | awk '{s += $1} END {print s+0}')"
used_count="$(psql "$DATABASE_URL" -X -A -t -v ON_ERROR_STOP=1 -c \
  "select usage_count from public.tool_usage_daily where user_id = '00000000-0000-4000-8000-000000000123' and tool_key = 'ci-concurrency-test' and usage_date = current_date")"
used_count="$(echo "$used_count" | tr -d '[:space:]')"

if [[ "$allowed_count" != "5" || "$denied_count" != "15" || "$used_count" != "5" ]]; then
  echo "FAIL quota concurrency: allowed=$allowed_count denied=$denied_count stored=$used_count (expected 5/15/5)" >&2
  exit 1
fi

echo "PASS quota concurrency: 20 parallel calls, exactly 5 allowed, 15 denied, stored count remains 5"
