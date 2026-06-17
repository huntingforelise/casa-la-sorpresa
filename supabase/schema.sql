create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  arrival date not null,
  departure date not null,
  guests integer not null check (guests between 1 and 4),
  guest_name text not null,
  guest_email text not null,
  notes text not null default '',
  locale text not null default 'en',
  status text not null check (status in ('hold', 'confirmed', 'cancelled', 'expired')),
  quoted_total integer not null,
  deposit_amount integer not null,
  currency text not null default 'eur',
  stripe_session_id text,
  stripe_payment_intent_id text,
  hold_expires_at timestamptz,
  confirmed_at timestamptz
);

create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  arrival date not null,
  departure date not null,
  reason text not null default 'owner block'
);

create table if not exists public.booking_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  booking_id uuid references public.bookings(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb
);

alter table public.bookings enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.booking_events enable row level security;

create index if not exists bookings_date_status_idx
  on public.bookings (arrival, departure, status);

create index if not exists blocked_dates_range_idx
  on public.blocked_dates (arrival, departure);
