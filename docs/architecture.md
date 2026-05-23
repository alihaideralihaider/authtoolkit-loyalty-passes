# Architecture

AuthToolkit Loyalty Passes starts as a local-first, API-first TypeScript foundation. It intentionally avoids production storage and real pass provider credentials until the domain model and contracts are stable.

## Event-Driven Model

Business systems send events such as `checkout_completed`, `order_completed`, `missed_call_recovered`, `offer_redeemed`, or `vip_unlocked`. Services can then update passes, offers, rewards, and membership state.

Events are first-class records because pass state should be explainable and replayable later.

## Loyalty Pass Lifecycle

1. `issued`: pass is created locally and issued through a provider adapter.
2. `active`: pass can receive updates.
3. `suspended`: pass exists but should not receive customer-facing updates.
4. `revoked`: pass is no longer valid.

Provider-specific IDs are stored as provider object references. Real provider payloads will be added behind adapters later.

## Offer Lifecycle

1. `draft`: offer exists but is not active.
2. `active`: offer can be presented or attached to a pass.
3. `redeemed`: customer has used the offer.
4. `expired`: offer is no longer valid.
5. `cancelled`: offer was stopped by the business.

## Pass Provider Abstraction

Provider adapters expose:

- `issuePass()`
- `updatePass()`
- `revokePass()`

The current adapters are mocks:

- `ApplePassMockAdapter`
- `GooglePassMockAdapter`

They return fake success responses and provider object IDs. Real Apple and Google integrations can later implement the same adapter interface.

## API-First Design

The route layer is pure functions, not an Express or Fastify app. This keeps the API contract portable across Node servers, serverless functions, edge runtimes, or future AuthToolkit infrastructure.

Draft API surfaces:

- `POST /v1/passes/issue`
- `POST /v1/passes/update`
- `POST /v1/offers/start`
- `POST /v1/offers/redeem`
- `POST /v1/events`

## Future Supabase Storage Layer

V1 uses in-memory maps. Future storage can use Supabase tables for passes, customers, events, offers, redemptions, and provider objects. The service layer should depend on storage interfaces before any production database is introduced.

No migrations are included yet.

## Future Apple And Google Integrations

Real integrations should live behind provider adapters. Credentials must come from environment variables or secret managers, never hardcoded code paths.

The domain should not depend directly on Apple or Google SDKs.

## Separation From Future Payments Products

AuthToolkit Loyalty Passes is not a payment wallet.

This product covers:

- loyalty cards
- digital passes
- VIP status
- rewards
- offers
- memberships
- customer retention

Future AuthToolkit Payments may cover:

- stored payment methods
- cards
- bank accounts
- payout rails
- payment vault
- transaction authorization
