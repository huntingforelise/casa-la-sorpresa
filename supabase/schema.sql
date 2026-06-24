create extension if not exists btree_gist;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  arrival date not null,
  departure date not null,
  guests integer not null,
  guest_name text not null,
  guest_email text not null,
  notes text not null default '',
  locale text not null default 'en',
  status text not null,
  quoted_total integer not null,
  deposit_amount integer not null,
  currency text not null default 'eur',
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  hold_expires_at timestamptz,
  confirmed_at timestamptz,
  constraint bookings_departure_after_arrival check (departure > arrival),
  constraint bookings_guests_supported check (guests between 1 and 4),
  constraint bookings_guest_name_length check (char_length(guest_name) between 2 and 120),
  constraint bookings_guest_email_format check (guest_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint bookings_notes_length check (char_length(notes) <= 1200),
  constraint bookings_locale_supported check (locale in ('en', 'nl', 'es')),
  constraint bookings_status_supported check (status in ('hold', 'confirmed', 'cancelled', 'expired')),
  constraint bookings_quoted_total_nonnegative check (quoted_total >= 0),
  constraint bookings_deposit_amount_nonnegative check (deposit_amount >= 0),
  constraint bookings_deposit_not_above_total check (deposit_amount <= quoted_total),
  constraint bookings_currency_eur check (currency = 'eur'),
  constraint bookings_confirmed_at_status check (
    confirmed_at is null or status = 'confirmed'
  )
);

create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  arrival date not null,
  departure date not null,
  reason text not null default 'owner block',
  constraint blocked_dates_reason_length check (char_length(reason) <= 240),
  constraint blocked_dates_departure_after_arrival check (departure > arrival)
);

create table if not exists public.booking_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  event_type text not null,
  constraint booking_events_event_type_length check (char_length(event_type) between 1 and 120),
  payload jsonb not null default '{}'::jsonb
);

alter table public.bookings
  add column if not exists updated_at timestamptz not null default now();

alter table public.blocked_dates
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_departure_after_arrival'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_departure_after_arrival check (departure > arrival);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_guests_supported'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_guests_supported check (guests between 1 and 4);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_guest_name_length'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_guest_name_length
      check (char_length(guest_name) between 2 and 120);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_guest_email_format'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_guest_email_format
      check (guest_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_notes_length'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_notes_length check (char_length(notes) <= 1200);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_locale_supported'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_locale_supported check (locale in ('en', 'nl', 'es'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_status_supported'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_status_supported
      check (status in ('hold', 'confirmed', 'cancelled', 'expired'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_quoted_total_nonnegative'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_quoted_total_nonnegative check (quoted_total >= 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_deposit_amount_nonnegative'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_deposit_amount_nonnegative check (deposit_amount >= 0);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_deposit_not_above_total'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_deposit_not_above_total
      check (deposit_amount <= quoted_total);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_currency_eur'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_currency_eur check (currency = 'eur');
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_stripe_session_id_key'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_stripe_session_id_key unique (stripe_session_id);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_confirmed_at_status'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_confirmed_at_status
      check (confirmed_at is null or status = 'confirmed');
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'blocked_dates_departure_after_arrival'
      and conrelid = 'public.blocked_dates'::regclass
  ) then
    alter table public.blocked_dates
      add constraint blocked_dates_departure_after_arrival check (departure > arrival);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'blocked_dates_reason_length'
      and conrelid = 'public.blocked_dates'::regclass
  ) then
    alter table public.blocked_dates
      add constraint blocked_dates_reason_length check (char_length(reason) <= 240);
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'booking_events_booking_id_required'
      and conrelid = 'public.booking_events'::regclass
  ) then
    alter table public.booking_events
      add constraint booking_events_booking_id_required check (booking_id is not null);
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'booking_events_event_type_length'
      and conrelid = 'public.booking_events'::regclass
  ) then
    alter table public.booking_events
      add constraint booking_events_event_type_length
      check (char_length(event_type) between 1 and 120);
  end if;
end;
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke execute on function public.set_updated_at() from public, anon, authenticated;

drop trigger if exists set_bookings_updated_at on public.bookings;
create trigger set_bookings_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

drop trigger if exists set_blocked_dates_updated_at on public.blocked_dates;
create trigger set_blocked_dates_updated_at
before update on public.blocked_dates
for each row execute function public.set_updated_at();

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_no_active_overlap'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_no_active_overlap
      exclude using gist (
        daterange(arrival, departure, '[)') with &&
      )
      where (status in ('hold', 'confirmed'));
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'blocked_dates_no_overlap'
      and conrelid = 'public.blocked_dates'::regclass
  ) then
    alter table public.blocked_dates
      add constraint blocked_dates_no_overlap
      exclude using gist (
        daterange(arrival, departure, '[)') with &&
      );
  end if;
end;
$$;

alter table public.bookings enable row level security;
alter table public.blocked_dates enable row level security;
alter table public.booking_events enable row level security;

revoke all on table public.bookings from anon, authenticated;
revoke all on table public.blocked_dates from anon, authenticated;
revoke all on table public.booking_events from anon, authenticated;

grant select, insert, update, delete on table public.bookings to service_role;
grant select, insert, update, delete on table public.blocked_dates to service_role;
grant select, insert, update, delete on table public.booking_events to service_role;

create index if not exists bookings_active_range_idx
  on public.bookings using gist (daterange(arrival, departure, '[)'))
  where status in ('hold', 'confirmed');

create index if not exists bookings_status_hold_expires_idx
  on public.bookings (status, hold_expires_at)
  where status = 'hold';

create index if not exists bookings_stripe_session_id_idx
  on public.bookings (stripe_session_id)
  where stripe_session_id is not null;

create index if not exists blocked_dates_range_idx
  on public.blocked_dates using gist (daterange(arrival, departure, '[)'));

create index if not exists booking_events_booking_id_created_at_idx
  on public.booking_events (booking_id, created_at desc);
