# Casa la Sorpresa

A sunny multilingual direct-booking website for Casa la Sorpresa in Alhaurin de
la Torre, Malaga.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Sanity content hooks
- Supabase booking schema
- Stripe deposit checkout

## Local Development

```bash
npm run dev
```

Visit `http://localhost:3000/en`.

Copy `.env.example` to `.env.local` when connecting live Sanity, Supabase and
Stripe credentials. Without credentials, the booking form runs in demo mode and
returns a validation message instead of creating a payment session.

## Go-Live Checklist

Use this when the site is ready to accept real booking deposits. Stripe checkout
only becomes reachable when `BOOKINGS_ENABLED=true` and Stripe/Supabase env vars
are present. Keep `BOOKINGS_ENABLED=false` until the test checklist passes and
the production domain is connected.

### 1. Test the booking flow in Stripe test mode

1. Deploy a preview with the test Stripe, Supabase, Sanity and email
   environment variables filled in.
2. Set `NEXT_PUBLIC_SITE_URL` to the preview URL so Stripe returns guests to the
   correct site after Checkout.
3. Set `BOOKINGS_ENABLED=true` in the preview environment. This turns on the
   booking form's live checkout route for that deployment.
4. In the Stripe Dashboard test mode payment method settings, make sure
   Bancontact is enabled.
5. Submit a booking from `/en/booking` and confirm that Stripe Checkout offers
   both card and Bancontact. The checkout route already requests
   `["card", "bancontact"]`.
6. Complete a card test payment, then confirm the booking row changes from
   `hold` to `confirmed` and that confirmation emails are sent.
7. Complete a Bancontact test payment through Stripe's hosted redirect flow,
   then confirm the same booking status and email behavior.
8. Cancel a Checkout session and verify the guest returns to
   `/en/booking?status=cancelled`.

The webhook endpoint is `/api/webhooks/stripe`. In test mode, point a Stripe
webhook endpoint at:

```text
https://<preview-domain>/api/webhooks/stripe
```

Listen for:

- `checkout.session.completed`
- `checkout.session.expired`

Copy that webhook signing secret into `STRIPE_WEBHOOK_SECRET` for the same
environment.

### 2. Swap to production Stripe

When test payments work end to end:

1. In Stripe live mode, enable card and Bancontact payment methods.
2. Replace the preview/test Stripe values with live keys:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Create a live Stripe webhook endpoint:

   ```text
   https://www.casalasorpresa.com/api/webhooks/stripe
   ```

4. Select the same webhook events:
   - `checkout.session.completed`
   - `checkout.session.expired`
5. Copy the live webhook signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Keep Stripe test keys out of the production environment. Keep live keys out
   of local `.env*` files unless they are strictly needed for a controlled
   launch test.

### 3. Connect the production domain

1. Add `casalasorpresa.com` and `www.casalasorpresa.com` to the hosting
   provider.
2. Make `www.casalasorpresa.com` the canonical production URL.
3. Update DNS at the domain registrar using the records shown by the hosting
   provider. Wait for SSL/TLS to become active before testing payments.
4. Set production `NEXT_PUBLIC_SITE_URL` to:

   ```text
   https://www.casalasorpresa.com
   ```

5. Redeploy production after setting or changing `NEXT_PUBLIC_*` variables so
   the public values are baked into the build.
6. Visit these production URLs before enabling bookings:
   - `https://www.casalasorpresa.com/en`
   - `https://www.casalasorpresa.com/nl`
   - `https://www.casalasorpresa.com/es`
   - `https://www.casalasorpresa.com/sitemap.xml`

### 4. Final launch switch

Before taking real deposits, set or confirm these production environment
variables:

- `BOOKINGS_ENABLED=true` to enable real booking holds and Stripe Checkout.
- `NEXT_PUBLIC_BOOKINGS_REOPEN_LABEL` updated or no longer user-facing.
- `NEXT_PUBLIC_SITE_URL=https://www.casalasorpresa.com`.
- production Sanity values:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_TOKEN`
- production Supabase values:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- production Stripe values:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- production Resend values:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
- `BOOKING_NOTIFICATION_EMAIL` set to the owner's inbox.
- the live Stripe webhook returning `200` in the Stripe Dashboard
- a small real payment tested with the owner and refunded from Stripe if needed

After launch, watch the first live checkout in Stripe, Supabase and email logs.
If anything fails, set `BOOKINGS_ENABLED=false`, redeploy, and investigate
before accepting more deposits. Setting `BOOKINGS_ENABLED=false` is the fastest
rollback for payments because it blocks `/api/bookings/checkout` before any
Stripe Checkout Session is created.

## Backend Starters

- `supabase/schema.sql` contains the starter booking, blocked date and event
  tables with RLS enabled.
- `sanity/schemaTypes.ts` contains starter content schemas for settings,
  gallery images, rates and amenities.

## Scripts

```bash
npm run lint
npm run build
```
