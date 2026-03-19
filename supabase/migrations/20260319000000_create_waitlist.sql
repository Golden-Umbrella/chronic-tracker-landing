-- Waitlist table for Chronic Tracker landing page
create table if not exists waitlist (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null unique,
  condition   text,
  created_at  timestamptz not null default now()
);

-- Index for duplicate-check lookups
create index if not exists waitlist_email_idx on waitlist (email);

-- RLS: no public reads; service role writes only
alter table waitlist enable row level security;

-- Allow anon to insert (form submissions come from the browser via service role in API route)
-- The API route uses service_role_key so this is belt-and-suspenders
create policy "service role only" on waitlist
  for all
  using (false);
