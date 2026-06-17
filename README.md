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
