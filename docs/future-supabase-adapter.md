# Future Supabase Adapter

AuthToolkit Loyalty Passes does not include real Supabase client code in V1. The current repository implementations are in-memory and local-first.

## What A Supabase Adapter Will Do Later

A future Supabase adapter should implement the same repository interfaces used by the services:

- `CustomerRepository`
- `LoyaltyPassRepository`
- `LoyaltyOfferRepository`
- `LoyaltyEventRepository`

It should persist AuthToolkit domain records to Supabase tables such as `loyalty_customers`, `loyalty_passes`, `loyalty_offers`, and `loyalty_events`.

## What It Should Not Do

The Supabase adapter should not:

- issue Apple passes
- issue Google passes
- contain provider credential logic
- decide offer or pass lifecycle rules
- require Supabase for local unit tests
- hide business events inside database triggers before the application model is stable

Provider adapters and persistence adapters should remain separate.

## Environment Variables

When added later, the adapter should read configuration from environment variables or a typed config object. It should not hardcode secrets.

Expected future variables may include:

- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

These are not required today.

## Preserve Local-First Testing

Tests should continue to run with in-memory repositories. Supabase-backed tests should be opt-in integration tests with explicit environment requirements.

Default service constructors should continue to use in-memory repositories unless a Supabase repository is explicitly injected.

## Migrations Later

Migrations should be added only when the Supabase project exists and table ownership is clear. Until then, `docs/future-supabase-schema.md` is the source for proposed table shapes.
