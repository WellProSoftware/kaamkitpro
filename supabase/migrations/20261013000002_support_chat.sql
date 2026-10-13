create table if not exists public.support_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  user_email text not null,
  subject text not null default 'Support request',
  status text not null default 'open' check (status in ('open','waiting_user','resolved')),
  language text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.support_conversations(id) on delete cascade,
  sender_role text not null check (sender_role in ('user','admin','assistant')),
  sender_user_id uuid references auth.users(id) on delete set null,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now()
);

create index if not exists support_conversations_user_updated_idx
  on public.support_conversations(user_id, updated_at desc);
create index if not exists support_conversations_status_updated_idx
  on public.support_conversations(status, updated_at desc);
create index if not exists support_messages_conversation_created_idx
  on public.support_messages(conversation_id, created_at asc);

alter table public.support_conversations enable row level security;
alter table public.support_messages enable row level security;

revoke all on public.support_conversations from anon, authenticated;
revoke all on public.support_messages from anon, authenticated;
grant all on public.support_conversations to service_role;
grant all on public.support_messages to service_role;